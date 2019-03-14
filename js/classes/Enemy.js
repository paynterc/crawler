class Enemy extends Phaser.Sprite {

    constructor(x,y,walls,orX,orY,dirX,dirY,pattern) {
        super(game,x,y,"enemy1",0);

        game.physics.enable(this, Phaser.Physics.ARCADE);
        this.body.setSize(32, 24, 0, 8);
        this.anchor.setTo(0.5, 0.5);
        //this.body.immovable=true;

        this.hp=50;
        this.attackSpeed = 2;
        this.damage = 1;

        this.canDamage=true;

        this.walls=walls;
        this.runSpeed = 128;
        this.curSpeed = this.runSpeed;
        this.orX=orX;//1 or -1. x orientation and y orientation. used to mirror-image enemies.
        this.orY=orY;
        this.dirX=dirX;//1 or 0. Set to 1 if moving on horizontal axis.
        this.dirY=dirY;//1 or 0. set to 1 if moving on vertical axis.
        this.scale.x *= this.orX;

        this.timers = pattern[0];// pattern is an array of timers and actions. 0 is timers, 1 is actions
        this.actions = pattern[1];
        this.timerPointer=0;
        this.actionPointer=0;

        this.init();

        //add to stage right away
        game.add.existing(this);
        var timer = this.timers[this.timerPointer];
        this.actionTimer = game.time.events.add(Phaser.Timer.SECOND * timer, this.nextAction, this);
    }

    // Overwrite this
    init(){
        // Change theimage
        //this.loadTexture('mummy', 0);

    }

    coolDown(){
        this.canDamage=false;
        this.coolDownTimer = game.time.events.add(Phaser.Timer.SECOND / this.attackSpeed, this.endCoolDown, this);
    }

    endCoolDown(){
        game.time.events.remove(this.coolDownTimer);
        this.canDamage=true;
    }

    nextAction(){
        game.time.events.remove(this.actionTimer);
        var nextAct = this.actions[this.actionPointer];
        this.callAction(nextAct);
        this.actionPointer+=1;
        this.timerPointer+=1;
        if(this.actionPointer>=this.actions.length){
            this.actionPointer=0;
        }
        if(this.timerPointer>=this.timers.length){
            this.timerPointer=0;
        }
        var timer = this.timers[this.timerPointer];
        this.actionTimer = game.time.events.add(Phaser.Timer.SECOND * timer, this.nextAction, this);
    }

    callAction(a){
        if(a==0){
            this.stop();
        }else if(a==1){
            this.switchDir();
        }else if(a==2){
            this.switchOrientation();
        }else if(a==3){
            this.special1();
        }else if(a==4){
            this.special2();
        }
    }

    update() {
        // The update function will run every frame, even if you don't call it.
        //this.angle += .5;
        // Run into walls
        game.physics.arcade.collide(this, this.walls, this.onWallCollision, null, this);


    }

    applyDamage(d) {
        this.hp-=d;
        if(this.hp<0){
            this.kill();
        }else{
            this.tint = 0xff0000;
            this.flashTimer = game.time.events.add(Phaser.Timer.SECOND * 0.10, this.flashOff, this);
        }

    }

    flashOff(){
        game.time.events.remove(this.flashTimer);
        this.tint = 0xffffff;
    }

    onWallCollision(obj,wall) {
        // overwrite this
        this.curSpeed *= -1;
        this.updateMovement();
    }

    updateMovement(){
        // dirX and dirY will be 1 or zero. If zero, it will cancel out movement on that axis.
        this.body.velocity.x = this.curSpeed * this.orX * this.dirX;
        this.body.velocity.y = this.curSpeed * this.orY * this.dirY;

        if(this.dirX!=0){
            if(this.body.velocity.x>0){
                this.scale.x = 1;
            }else{
                this.scale.x = -1;
            }
        }

    }

    stop(){
        this.body.velocity.x = 0;
        this.body.velocity.y = 0;
    }

    switchDir(){
        this.curSpeed *= -1;
        this.updateMovement();
    }

    switchOrientation(){
        if(this.dirX==1){
            this.moveVertical();
        }else{
            this.moveHorizontal();
        }
    }

    moveHorizontal(){
        this.dirX=1;
        this.dirY=0;
        this.updateMovement();
    }

    moveVertical(){
        this.dirX=0;
        this.dirY=1;
        this.updateMovement();
    }

    special1(){
        //Overwrite
    }

    special2(){

    }
}