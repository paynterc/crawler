SCALE = 64;
PLAYER_SPEED = 128;
VIEW_SCALE = 2;
G_VOID=0;
G_FLOOR=1;
G_WALL=2;
var StateMain = {
    preload: function() {



    },
    create: function() {
        //keep this line
        //to tell the game what state we are in!
        model.state = "main";


        game.world.setBounds(0, 0, 6400, 6400);
        this.walls = game.add.group();
        this.doors = game.add.group();
        this.floors = game.add.group();
        this.enemies = game.add.group();

        game.world.bringToTop(this.walls);
        game.world.bringToTop(this.doors);
        game.world.bringToTop(this.enemies);
        this.printMapData();
        var rKey = this.makeKey(model.mapLevel,model.mapRoom);
        var new_room = this.getRoom(rKey);// See if the room already exists
        if(!new_room){
            // Make room
            var a = [3,5,7,9,11,13];
            var w = game.rnd.pick(a);
            var h = game.rnd.pick(a);
            new_room = new this.Room(w, h);
            model.map[rKey]=new_room;
        }
        this.current_room = new_room;
        this.renderRoom(new_room);

        this.player = new Player(new_room.center_x, new_room.y1+new_room.hPx-(SCALE/2));
        this.weapon = new Sword(this.player.x,this.player.y);
        this.player.setWeapon(this.weapon);


        // Place the player outside of the door he just entered through
        if(model.mapNewPx!=0){
            this.player.x = model.mapNewPx;
            this.player.y = model.mapNewPy + 16;
        }

        game.camera.follow(this.player);


    },
    makeKey: function(lvl,rm){
        return lvl.toString() + "-" + rm.toString();
    },
    getRoom: function(key) {
        if(model.map.hasOwnProperty(key)){
            return model.map[key];
        }else{
            return false;
        }
    },
    update: function() {

        game.physics.arcade.collide(this.player, this.walls);
        game.physics.arcade.collide(this.player, this.enemies,  this.enemyHitHandler, this.enemyHitProcess,this);
        game.physics.arcade.collide(this.player, this.doors, this.enterDoor, null, this);
        game.physics.arcade.collide(this.weapon, this.enemies,  this.weaponHitHandler, this.weaponHitProcess,this);


        if(this.player.canMove){
            if(upInputIsActive()){
                this.player.body.velocity.y = -PLAYER_SPEED;
            }else if(downInputIsActive()){
                this.player.body.velocity.y = PLAYER_SPEED;
            }else{
                this.player.body.velocity.y = 0;
            }
            if(leftInputIsActive()){
                this.player.body.velocity.x = -PLAYER_SPEED;
                this.player.scale.x = -1;
            }else if(rightInputIsActive()){
                this.player.body.velocity.x = PLAYER_SPEED;
                this.player.scale.x = 1;
            }else{
                this.player.body.velocity.x = 0;
            }

            if(fireButtonIsActive()){
                this.player.attack();
                this.player.body.velocity.x=0;
                this.player.body.velocity.y=0;
            }

            if(this.player.body.velocity.x!=0 || this.player.body.velocity.y != 0){
                this.player.animations.play('run');
            }else{
                this.player.animations.play('wait');
            }

        }




        //https://phaser.io/examples/v2/sprites/overlap-without-physics
        //http://www.html5gamedevs.com/topic/1974-using-collision-detection-without-physics/

    },
    weaponHitHandler: function(w,e){

        return false;
    },
    weaponHitProcess: function(w,e){

        if(w.firing){
            e.applyDamage(w.damage);
        }
        return false;

    },
    enemyHitHandler: function(p,e){
        console.log('enemyHitHandler');
        return false;
    },
    enemyHitProcess: function(p,e){

        console.log('enemyHitProcess p',p);
        console.log('enemyHitProcess e',e);
        if(e.canDamage){
            e.coolDown();
            this.player.applyDamage(e.damage);
            this.player.applyKnockback(e.x,e.y,1);
        }

        return false;

    },
    enterDoor: function(p,d){

        // Get the index of the door and look up the door in the current room's door data to get the destination level and room.
        var dIdx = d.crwlIdx;
        var door = this.current_room.doorMap[dIdx];

        if(door.toLevel==0){
            return false;
        }else{


            console.log('toLevel', door.toLevel);
            console.log('toRoom', door.toRoom);

            model.mapLastLevel=model.mapLevel;
            model.mapLastRoom=model.mapRoom;
            model.mapLevel = door.toLevel;
            model.mapRoom = door.toRoom;
            model.mapNewPx=door.px;
            model.mapNewPy=door.py;
            model.mapLastPx=this.player.x;
            model.mapLastPy=this.player.y;
            this.printMapData();
            this.restartRoom();
        }


    },
    printMapData: function(){
        console.log('mapLevel', model.mapLevel);
        console.log('mapRoom', model.mapRoom);
        console.log('mapLastLevel', model.mapLastLevel);
        console.log('mapLastRoom', model.mapLastRoom);
        console.log('--- end map data ---');
    },
    restartRoom: function(){

        game.state.start("StateMain",true,false);
        // The first one, true, tells Phaser that you want to keep the cache (i.e. the assets that we have already loaded); the second one, false tells Phaser that we do not want to keep the existing world objects: it will wipe out all the current entities –sprites, texts, images, groups, etc.
    },
    Room: function(w,h){

        var gw=game.world.width/SCALE;//grid width
        var gh=game.world.height/SCALE;//grid height
        this.grid = [];// rows
        for(var r=0;r<gh;r++){
            var col=[];//columns
            for(var c=0;c<gw;c++){
                col.push(G_VOID);
            }
            this.grid.push(col);
        }


        // Find the center of the grid and try to place the room about in the middle of the grid.
        var gCx=Math.floor(this.grid[0].length/2);// Cols/2 rounded down
        var gCy=Math.floor(this.grid.length/2);// Rows/2 rounded down
        var rGx1 = gCx - Math.floor(w/2);// room x1. upper left.
        var rGy1 = gCy - Math.floor(h/2);// room y1. upper left.
        // Fill in the room with floor tags
        for(var r=rGy1;r<rGy1+h;r++){
            for(var c=rGx1;c<rGx1+w;c++){
                this.grid[r][c]=G_FLOOR;
            }
        }
        // Add walls
        for(var r=0;r<this.grid.length;r++){
            for(var c=0;c<this.grid[r].length;c++){
                if(this.grid[r][c]==G_FLOOR){

                    // Corners
                    if(this.grid[r-1][c-1]==G_VOID){
                        this.grid[r-1][c-1]=G_WALL;
                    }
                    if(this.grid[r-1][c+1]==G_VOID){
                        this.grid[r-1][c+1]=G_WALL;
                    }
                    if(this.grid[r+1][c-1]==G_VOID){
                        this.grid[r+1][c-1]=G_WALL;
                    }
                    if(this.grid[r+1][c+1]==G_VOID){
                        this.grid[r+1][c+1]=G_WALL;
                    }

                }
            }
        }


        // For simplicity you could say that x1, and y1 define the top-left
        // corner of the rectangle, while x2, and y2 define the bottom-right
        // corner.
        this.w = w;
        this.h = h;
        this.wPx = w*SCALE;
        this.hPx = h*SCALE;
        this.x1 = rGx1 * SCALE;
        this.y1 = rGy1 * SCALE;
        this.x2 = this.x1 + this.wPx;
        this.y2 = this.y1 + this.hPx;
        this.center_x = (this.x1 + this.x2) / 2;
        this.center_y = (this.y1 + this.y2) / 2;

        var Door = function(x,y,toLevel,toRoom,px,py){
            // toLevel = next level on the map. toRoom = room on that level.
            this.dx1=x;
            this.dy1=y;
            this.toLevel = toLevel;
            this.toRoom = toRoom;
            this.px=px;//where to place the player on room start
            this.py=py;
            this.mapIndex = toLevel.toString() + "-" + toRoom.toString();
        }

        this.doorCount = game.rnd.integerInRange(1,Math.floor(w/2));
        this.doorMap = [];
        var newDoor;
        var doorX=this.center_x;
        var doorC=1;
        if(isOdd(this.doorCount)){
            newDoor = new Door(doorX, this.y1-SCALE,model.mapLevel+1,doorC,0,0);
            this.doorMap.push(newDoor);
            doorC++;
        }
        var doorPlaces = Math.floor(this.doorCount/2);
        for(var d=1;d<=doorPlaces;d++){
            newDoor = new Door(doorX - (SCALE*2*d), this.y1-SCALE,model.mapLevel+1,doorC,0,0);
            this.doorMap.push(newDoor);
            doorC++;
            newDoor = new Door(doorX + (SCALE*2*d), this.y1-SCALE,model.mapLevel+1,doorC,0,0);
            this.doorMap.push(newDoor);
            doorC++;
        }
        // Add one more door at the bottom. This will be to return to the previous room.
        newDoor = new Door(this.center_x, this.y1+this.hPx, model.mapLastLevel, model.mapLastRoom, model.mapLastPx, model.mapLastPy);
        this.doorMap.push(newDoor);

        this.printData = function(){
            console.log('w',this.w);
            console.log('h',this.h);
            console.log('x1',this.x1);
            console.log('y1',this.y1);
            console.log('center_x',this.center_x);
            console.log('center_y',this.center_y);
            console.log('doorCount',this.doorCount);
        }

        this.makePattern = function(){
            var timers=[];
            var actions=[];

            var timerCount = game.rnd.integerInRange(2,5);
            var actionCount = game.rnd.integerInRange(2,5);

            for(var i=0;i<timerCount;i++){
                timers.push(game.rnd.integerInRange(1,3));
            }
            for(var i=0;i<actionCount;i++){
                actions.push(game.rnd.integerInRange(0,4));
            }
            return [timers,actions];
        }

        this.enemies=[];
        this.makeEnemies = function(){
            var eSpan = Math.floor((w+h)/4);
            var numEnemies = game.rnd.between(1,eSpan) * 2;
            var typeEnemy = game.rnd.pick([1]);//1:Ghost, 2:??
            var pattern = this.makePattern();
            this.enemies.push([numEnemies,typeEnemy,pattern]);
        }
        this.makeEnemies();

        // Pillars can not be on the center row or the first or last row. Cannot block doors or enemy placement.
        // Each pillar is just an x,y coord that corresponds to a floor tile.
        this.pillars=[];
        var pCount = game.rnd.between(0,Math.floor(h/4));
        for(var p=0;p<pCount;p++){


            var pRow = game.rnd.between(1,Math.floor(h/2)-1);
            var pCol = game.rnd.between(0,Math.floor(w/2)-1);
            //rGx1,rGy1,h,w

            this.grid[rGy1+pRow][rGx1+pCol]=G_WALL;
            this.grid[rGy1+pRow][rGx1+w-pCol-1]=G_WALL;
            this.grid[rGy1+h-pRow-1][rGx1+pCol]=G_WALL;
            this.grid[rGy1+h-pRow-1][rGx1+w-pCol-1]=G_WALL;


        }


    },
    renderRoom: function(room){
        var walltile, floortile, door;
        var x,y;
        var tileBelow;
        for(var r=0; r<room.grid.length; r++){
            for(var c=0; c<room.grid[r].length; c++){

                var thisTile = room.grid[r][c];
                if(thisTile===G_FLOOR){
                    this.addFloor(c*SCALE,r*SCALE,);
                }else if(thisTile===G_WALL){
                    tileBelow = room.grid[r+1][c];
                    var wallType = "wall1";
                    if(tileBelow === G_WALL){
                        wallType="wall2";

                    }else{
                        wallType="wall1";
                    }
                    this.addWall( c*SCALE, r*SCALE, wallType );
                }
            }
        }

        /****
        for (x = room.x1; x < room.x2; x+=SCALE) {
            for (y = room.y1; y < room.y2; y+=SCALE){
                floortile = game.add.sprite(x, y, "floor");
                this.floors.add(floortile);
            }
        }
        // Instantiate walls
        for (x = room.x1; x < room.x2; x+=SCALE) {
            this.addWall(x, room.y1-SCALE, "wall1");
        }

        for (x = room.x1-SCALE; x < room.x2+SCALE; x+=SCALE) {
            this.addWall(x, room.y1 + room.hPx, "wall1");
        }

        for (y = room.y1-SCALE; y < room.y2; y+=SCALE){
            this.addWall(room.x1-SCALE, y, "wall2");
            this.addWall(room.x1+room.wPx, y, "wall2");
        }
         ****/

        // Add the doors
        var doors = room.doorMap;
        for(var i=0;i<doors.length;i++){
            this.addDoor(doors[i].dx1, doors[i].dy1, doors[i].mapIndex, i);
        }


        // Add enemies
        var eXplc = 1;
        var eYplc = 0;
        var E;
        for(var i=0;i<room.enemies.length;i++){
            var eData = room.enemies[i];
            var eCount = eData[0];
            var eType = eData[1];

            for(var e=0;e<Math.floor(eCount/2);e++){
                var eX = game.rnd.between(1,Math.floor(room.w/2));
                var eY = game.rnd.between(1,Math.floor(room.h/2));
                E = new Ghost(room.center_x - (eX * SCALE * eXplc),room.center_y - (eY*SCALE*eYplc),this.walls,-1,1,1,0,eData[2]);
                this.enemies.add(E);
                E = new Ghost(room.center_x + (eX * SCALE * eXplc),room.center_y - (eY*SCALE*eYplc),this.walls,1,-1,1,0,eData[2]);
                this.enemies.add(E);

            }
        }


    },
    addFloor: function(x,y){
        var floortile = game.add.sprite(x,y, "floor");
        //floortile.anchor.setTo(0.5, 0.5);
        this.floors.add(floortile);
    },
    addWall: function(x,y,type){
        var walltile = game.add.sprite(x, y, type);
        //walltile.anchor.setTo(0.5, 0.5);
        game.physics.enable(walltile, Phaser.Physics.ARCADE);
        walltile.body.immovable = true;
        this.walls.add(walltile);
    },
    addDoor: function(x,y,goLvl,i){
        var door = game.add.sprite(x, y, "door");
        door.anchor.setTo(0.5,0);
        game.physics.enable(door, Phaser.Physics.ARCADE);
        door.body.immovable = true;
        door.body.setSize(64, 72, 0, -4);// Extends about 4 px above and below the door so you can hit it.

        door.crwlIdx = i;// Door index. I added this property.

        this.doors.add(door);
    }



}

