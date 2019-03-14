class Weapon extends Phaser.Sprite {

    constructor(x,y) {
        super(game,x,y,"sword1",0);

        game.physics.enable(this, Phaser.Physics.ARCADE);

        this.firing = false;
        this.damage = 1;

        this.init();

        //add to stage right away
        game.add.existing(this);

    }

    // Overwrite this
    init(){
        // Change theimage
        //this.loadTexture('mummy', 0);
    }

    attack(){
        // overwrite
    }

    update() {

    }

}