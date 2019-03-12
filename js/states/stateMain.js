SCALE = 64;
PLAYER_SPEED = 128;
VIEW_SCALE = 2;
var StateMain = {
    preload: function() {
        game.load.image('floor','data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAr0lEQVR4Xu3YQQ3AIBAEQNBBUhU8KhADaENEZbQJj6bVsIMDNndwN/Va6y7Bp8YHMMfYFXD2HlUHR2v7vlUAKkALeAM8gn4B36A5wCBkEjQK2wWSErAM2QatwzwAiBAhJMYEoSgVpsJUmApTYSpMhakwFabCVDjJRAsUhaJQFIpCUSgKRaEoFIWiUBSKQlEoCkWhKBSFolAUikLRpASoMBWmwn8VTur/711fEUoN4AEQ1+FZiO8S4QAAAABJRU5ErkJggg==');

        game.load.image('wall1','data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAABfUlEQVR4Xu2bMQ7CMAxF2xPAjAQIiUMwcRYEYmBnYEGMMHAqJg7BwklAKg1qq0akkm0CeczINj/f3x+nzbMse2QJf3IAKBlwum2T4sFuei5+75sBAFAywCGjTYcm4NZ5vQywLsQBbZ33IwCrzbKo7XDci5Jh1J8U8XwMsMoLAD4RdMi4k1jvFiIMGPSGRZxQBmjnDWaAdiFNDbACHgBoAY8RQgNKalj1IhpQImDNPEQQEUQE2/8OW/ciIogIvhCwZh5TgCnAFGAKtG6FrcUo+jEosg6q7BZDN0LaeYOngHYhPgZo5/0IgFQBvjjcCzSu4qK5F9A++VjiczfYdIKxnIx1HTwf4B6QuN4v1uB/Nd9sPK9bYQCAAbSASE+63oq9pdQ0IHkARGhkEESNAQa1i6RIBgBfSwIARggniBWubYVjNy4i0l8JkowI+oADAKYAU4ApwBSovjLDGGQlxkpM2mxFHS/YCP3Kiqsr2gCAE8QJ1p1g1x76l+8nfzv8BAGcIB//GDLSAAAAAElFTkSuQmCC');

        game.load.image('wall2','data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAABaklEQVR4Xu2bQQoCMQxFOyfQtaAgeDBRXLh3MRtxqQuP6F0UaqtSpraLJgT65gBN5vc3SfPTwTn3dB1/AwAEBtwep654MG7u/n8/DACAwICIjDQdUsC17WYZoO1IBFrbbhGA/XHnfbtcz03JsJqv/Xo5BmjZBYBcEIzIxJ04jNsmDFjMln6dWgZI261mgLQjaQzQAh4AOAKZQogYEKihdRaJAQEBbeYRBAmCBMHp67D2WSQIEgTfCGgzjyxAFiALkAUmu8Lawch8GmzSDvrpLdZ2hKTtVmcBaUdyDJC2WwSglQO5ddAFEinOjC4gvfNW1kcbRBxFHf5fCUqfVbKA1SyQlsKow73L44ijyOPMBzTJiAxIMCHCiAwzQgxJMSXGmBxzgrVtcekSvNgVZkgqDEtL74R5ZQgAuA1yG+z7Ntjk71GHv09vausAaeCLdUArB1CHMwiYFUakd97K+qjDqTpsZWe0/ej+9fgLQA00Ln4/YPMAAAAASUVORK5CYII=');


        game.load.spritesheet('player', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAABAUlEQVRYR+2XQQ4CIQxF6UHceR8X3sPEC7jwAibew4X3cTcHqQEHpsPQMg2MibEsoZTXT2kDuPJAZl4zDYLvtCYZaQ4r2ZZ808DCugiALz0D7NOe3Hc4HBEdwCTANxVAf3gcI8SEksW6RQ7oAXC4q+8AdqcUZB6UWgEDoAp4aTlF6JpdQYsCi6fXmIT0NbDPmhaiYPS4oTueP9MtAMTP4oyRLJXiGd0GAFwt+R+AUlOatWM2QVpygOjONbxg4hd7NB6pZ+gALgd016e4p9qgMh9VgOgwKOE39xgkCAMwBUwBnQI9nmDm43cAZgVJ+DXVRIqVbFU5lf5vqxwUaAxApcAbdyysIFex0rQAAAAASUVORK5CYII=',32,32);

        game.load.spritesheet('door','data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAACfklEQVR4Xu2bTU7DMBCFkxPAskIChMQNqkqsuEDVOyAQC/YgdYPoDgTsWcEtegFWHAIJwapLbhDUKGO5zjiZ+Gdwk2EJydj+/ObN2BF5lmVFNuCfXABUCnj4vB6UDubHz+V6lQIEQKUAIBNbDiZw7nGtCuCeCIDmHrcVwMXVeTm3u/vboGI42D0q49kUwDWuALCZIJCBnbicnwVRwN7OfhmHqoDY45IVEHsipgdwgRcAkgKWRkg8oJIGVy6KB1QEuJUnJigmSDDB15e3IE0QFoTrMPTz+4U2YKQUEACVArbxrgB2OIgCBADzZYmP8cBmRVEA16VF8gCKxcJnjurdvIoTIh7EYlFAMZ36A5hMMgXAN54WSwAYfhW0CoAHpKSAp9Uqu5nNlJoGp4BoAPQkN6lukwJMszLXUvsyhJW6QQFosvcUPaCcL1IF2sqU07fBXgNoI6b/PSUPMBXQZR0bX4e7vNhLAB/f760MTg5Py2dSBkBZx3oNsBZVBSgvCgCLAspmZDRqVdDGA5HOApSNFAVICogHhDFBp9wHI+iDBwgAxP3z5bJWDdC+gaAAl1hmFYDSbfu9Vx+AKcBl0rbGyiVWMgDWi4IF+CqgSyzWPsBUALZjkA81CC0p4BpLABDONNE6QUzy1jQgKkBXDiUWqwJMuxcASAmM6QHKgzQ1JaEA7FjYOxP06gKNi0zvC5b/UMCgATyOx90vQMy8ILTC5BsWbgUIAEQBnVNimxWAmRYngNpY3CngAwCr3Xq8ziCNihK8D9DP003X4vrEmxYREgBLI9QEwGW3XAFggFkA6KXIVIALABXPwwRh3GQAkCQfsA+IAoDcdPTswcH/9/gfuZg5PbPZMrAAAAAASUVORK5CYII=');

        game.load.spritesheet('enemy1', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAhUlEQVRYR+2XSw6AIAxEp/c/NMZFDTF+ZohKTYZ1oY8HtCEANEwcUQagtW9FRKx7BzYDBrABGyhtIN8sC8nES3WAWbCv5ky8BPBGqzCADdjAvwwkrVoPrionbWA0ecKeQVAAfXK2D2Tiu7kSgJp8D3E0nwJQz1yJN4AN1DOg3OAnY6f/jhdB6pIB3FepFAAAAABJRU5ErkJggg==',32,32);
        game.load.spritesheet('ghost', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAABACAYAAAB7jnWuAAABQ0lEQVRoQ+1Y2Q7DIAwb///RnYZGxxGIA15R1eyp64GNE3KFF+93dJYKI4jhQ5BbD7j+XMRaJXCCH4fMI4QCosFbIRARe8DN9n9ExowssqPgac1MjZPEjAKmnWtK3I7A0u4lU1gV2EqAAl6pUB5S5QRABJKn1yekvp/+W0ywlQAEDsaQ+JpVASegJh2L/G6CaQUs6VcziZ+CKQXcBNYSbFiOf/Mgmoy2hWJ6BKyrop4CTZHPlB8JRAUBNrhGgG5vyRl7cUAF/3yYFLFe50SGBLQ4znxeOyHa6bI4mKpiFmixDhqI/gIeTwNxZZ+QiGL6hEQKPrnvzTihGi2ROiCRuB2Bpd37hERwSFMugOT3CQmaW7wzmlKAWR1PEfDm1E2wXYFHEnjefEBsLpi2lyYkl4H22nOo0MiZs+cDV7fkTXe8lcAb6jQWJzgd+uYAAAAASUVORK5CYII=',32,32);




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
        this.renderRoom();


        this.player = game.add.sprite(new_room.center_x, new_room.y1+new_room.hPx-(SCALE/2), 'player');
        game.physics.enable(this.player, Phaser.Physics.ARCADE);
        this.player.body.setSize(32, 24, 0, 8);
        this.player.anchor.setTo(0.5, 0.5);



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
    makePattern: function(){
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
        //game.physics.arcade.collide(this.player, this.enemies);
        game.physics.arcade.collide(this.player, this.doors, this.enterDoor, null, this);

        if(upInputIsActive()){
            this.player.body.velocity.y = -PLAYER_SPEED;
        }else if(downInputIsActive()){
            this.player.body.velocity.y = PLAYER_SPEED;
        }else{
            this.player.body.velocity.y = 0;
        }
        if(leftInputIsActive()){
            this.player.body.velocity.x = -PLAYER_SPEED;
        }else if(rightInputIsActive()){
            this.player.body.velocity.x = PLAYER_SPEED;
        }else{
            this.player.body.velocity.x = 0;
        }

        //https://phaser.io/examples/v2/sprites/overlap-without-physics
        //http://www.html5gamedevs.com/topic/1974-using-collision-detection-without-physics/

    },
    enterDoor: function(ent,d){



        // Get the index of the door and look up the door in the current room's door data to get the destination level and room.
        var dIdx = d.crwlIdx;
        var door = this.current_room.doorMap[dIdx];

        if(door.toLevel==0){
            return false;
        }else{
            model.mapLastLevel=model.mapLevel;
            model.mapLastRoom=model.mapRoom;
            model.mapLevel = door.toLevel;
            model.mapRoom = door.toRoom;
            model.mapNewPx=door.px;
            model.mapNewPy=door.py;
            model.mapLastPx=this.player.x;
            model.mapLastPy=this.player.y;

            this.restartRoom();
        }


    },
    restartRoom: function(){

        game.state.start("StateMain",true,false);
        // The first one, true, tells Phaser that you want to keep the cache (i.e. the assets that we have already loaded); the second one, false tells Phaser that we do not want to keep the existing world objects: it will wipe out all the current entities –sprites, texts, images, groups, etc.
    },
    Room: function(w,h){
        // For simplicity you could say that x1, and y1 define the top-left
        // corner of the rectangle, while x2, and y2 define the bottom-right
        // corner.
        this.w = w;
        this.h = h;
        this.wPx = w*SCALE;
        this.hPx = h*SCALE;
        this.x1 = (game.world.width/2) - (this.wPx/2);
        this.y1 = (game.world.height/2) - (this.hPx/2);
        this.x2 = this.x1 + this.wPx;
        this.y2 = this.y1 + this.hPx;


        // We create this array which holds the center x and center y
        // coordinates with [0] being x and [1] being y. We'll use these
        // later when configuring out tunnels
        this.center_coords = [];
        this.center_x = (this.x1 + this.x2) / 2;
        this.center_y = (this.y1 + this.y2) / 2;
        this.center_coords.push(this.center_x);
        this.center_coords.push(this.center_y);

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
            console.log('eSpan',eSpan);
            var numEnemies = game.rnd.between(1,eSpan) * 2;
            console.log('numEnemies',numEnemies);

            var typeEnemy = game.rnd.pick([1]);//1:Ghost, 2:??
            var pattern = this.makePattern();
            this.enemies.push([numEnemies,typeEnemy,pattern]);
        }
        this.makeEnemies();

        // Pillars can not be on the center row or the first or last row. Cannot block doors or enemey placement.
        // Each pillar is just an x,y coord that corresponds to a floor tile.
        this.pillars=[];
        var pCount = game.rnd.between(0,Math.floor(h/4));
        for(var p=0;p<pCount;p++){
            this.pillars.push([game.rnd.between(1,Math.floor(w/2)),game.rnd.between(1,Math.floor(h/2)-1)]);
        }


    },
    renderRoom: function(){
        var walltile, floortile, door;
        var x,y;
        var room = this.current_room;
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

        // Add the doors
        var doors = room.doorMap;
        for(var i=0;i<doors.length;i++){
            this.addDoor(doors[i].dx1, doors[i].dy1, doors[i].mapIndex, i);
        }

        // Add pillars

        for(var i=0;i<room.pillars.length;i++){
            var P=room.pillars[i];
            var cx = room.center_x - (SCALE/2);//upper left corner of center tile
            var cy = room.center_y - (SCALE/2);
            this.addWall( cx - (P[0]*SCALE ), cy - (P[1]*SCALE), "wall1");
            this.addWall( cx + (P[0]*SCALE ), cy - (P[1]*SCALE), "wall1");
            this.addWall( cx - (P[0]*SCALE ), cy + (P[1]*SCALE), "wall1");
            this.addWall(  cx + (P[0]*SCALE ), cy + (P[1]*SCALE), "wall1");
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
                console.log('eX',eX);
                console.log('eY',eY);

                E = new Ghost(room.center_x - (eX * SCALE * eXplc),room.center_y - (eY*SCALE*eYplc),this.walls,-1,1,1,0,eData[2]);
                this.enemies.add(E);
                E = new Ghost(room.center_x + (eX * SCALE * eXplc),room.center_y - (eY*SCALE*eYplc),this.walls,1,-1,1,0,eData[2]);
                this.enemies.add(E);

            }
        }


    },
    addWall: function(x,y,type){
        var walltile = game.add.sprite(x, y, type);
        game.physics.enable(walltile, Phaser.Physics.ARCADE);
        walltile.body.immovable = true;
        walltile.bringToTop();
        this.walls.add(walltile);
    },
    addDoor: function(x,y,goLvl,i){
        var door = game.add.sprite(x, y, "door");
        door.anchor.setTo(0.5, 0);
        game.physics.enable(door, Phaser.Physics.ARCADE);
        door.body.immovable = true;
        door.body.setSize(64, 72, 0, -4);// Extends about 4 px above and below the door so you can hit it.

        door.crwlIdx = i;// Door index. I added this property.

        this.doors.add(door);
    }



}

