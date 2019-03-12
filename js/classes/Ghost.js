class Ghost extends Enemy {


    // Overwrite this
    init(){
        // Change theimage
        this.loadTexture('ghost');

        this.animations.add('run',[0,1],12,true);
        this.animations.play('run');
        this.body.velocity.x = this.curSpeed * this.orX * this.dirX;
        this.body.velocity.y = this.curSpeed * this.orY * this.dirY;
        this.scale.x *= this.orX;
    }

    onWallCollision(obj,wall) {
        this.curSpeed *= -1;
        this.updateMovement();

    }

}