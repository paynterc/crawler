class Player extends Phaser.Sprite {

    constructor(x,y) {
        super(game,x,y,"player",0);

        game.physics.enable(this, Phaser.Physics.ARCADE);
        this.body.setSize(32, 24, 0, 8);
        this.anchor.setTo(0.35, 0.5);
        this.animations.add('run',[0,1],12,true);
        this.animations.add('attack',[1,2],12,false);
        this.animations.add('wait',[0,2],6,true);
        this.weapon=null;
        this.hp=10;

        this.canMove = true;

        this.init();

        //add to stage right away
        game.add.existing(this);

    }

    // Overwrite this
    init(){
        // Change theimage
        //this.loadTexture('mummy', 0);

    }

    setWeapon(weapon){
        this.weapon = weapon;
        this.updateWeaponPos();
    }

    attack(){
        this.animations.play('attack');
        if(this.weapon!=null){
            this.weapon.attack();
        }

    }

    applyDamage(d) {
        this.hp-=d;
        if(this.hp<0){
            this.weapon.kill();
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

    update() {
        this.updateWeaponPos();
    }

    updateWeaponPos(){
        if(this.weapon!=null){
            this.weapon.scale.x = this.scale.x;
            this.weapon.x=this.x + (16*this.scale.x);
            this.weapon.y=this.y-4;
        }
    }

    applyKnockback(x,y,m){
        // x origin. m magnitude
        this.canMove = false;
        var dirX = x > this.x ? 1 : -1;
        var dirY = y > this.y ? -1 : 1;

        this.body.velocity.x = 256*m*dirX;
        this.body.velocity.y = 256*m*dirY;
        this.kbTimer = game.time.events.add(Phaser.Timer.SECOND * 0.15, this.endKnockback, this);
    }

    endKnockback(){
        game.time.events.remove(this.kbTimer);
        this.body.velocity.x=0;
        this.body.velocity.y=0;
        this.canMove = true;
    }

}