class Sword extends Weapon {


    // Overwrite this
    init(){
        // Change theimage
        this.attackSpeed = 12;
        this.damage = 1;

        this.loadTexture('sword1', 0);
        this.animations.add('swing',[1,0],this.attackSpeed,false);
        this.anchor.setTo(0, 0.85);

    }

    attack(){
        // overwrite
        if(!this.firing){
            this.firing=true;
            this.animations.play('swing');
            this.actionTimer = game.time.events.add(Phaser.Timer.SECOND / this.attackSpeed, this.resetAttackTimer, this);
        }

    }

    resetAttackTimer(){
        game.time.events.remove(this.actionTimer);
        this.firing=false;
    }

    update() {

    }

}