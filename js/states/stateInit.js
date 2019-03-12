var StateInit = {
    preload: function() {
        //
        //This file sets up the preloader
        //
        //
        //
        game.load.image("loadingEmpty", "images/loading/progress_none.png");
        game.load.image("loadingFull", "images/loading/progress_all.png");
        if (isMobile == true) {
            if (useLandscape == true) {
                game.scale.forceOrientation(true, false);
            } else {
                game.scale.forceOrientation(false, true);
            }
            game.scale.enterIncorrectOrientation.add(this.wrongWay, this);
            game.scale.leaveIncorrectOrientation.add(this.rightWay, this);
        }
    },
    create: function() {
        game.state.start("StateLoad");
        game.input.keyboard.addKeyCapture([
            Phaser.Keyboard.W,
            Phaser.Keyboard.D,
            Phaser.Keyboard.A,
            Phaser.Keyboard.S,
            Phaser.Keyboard.SPACEBAR
        ]);
        model.map['a']=1;

    },
    update: function() {},
    rightWay: function() {
        if (model.state != "main") {
            location.reload();
        }
        document.getElementById(wrongTag).style.display = "none";
    },
    wrongWay: function() {
        document.getElementById(wrongTag).style.display = "block";
    }
}
function isOdd(num) { return num % 2;}

function upInputIsActive(){

    var isActive = false;
    isActive = game.input.keyboard.isDown(Phaser.Keyboard.W);

    return isActive;
}

function downInputIsActive(){

    var isActive = false;
    isActive = game.input.keyboard.isDown(Phaser.Keyboard.S);

    return isActive;
}

function rightInputIsActive(){
    var isActive = false;
    isActive = game.input.keyboard.isDown(Phaser.Keyboard.D);

    return isActive;
}

function leftInputIsActive(){
    var isActive = false;

    isActive = game.input.keyboard.isDown(Phaser.Keyboard.A);

    return isActive;
}

function fireButtonIsActive(){
    var isActive = false;

    isActive = game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR);

    return isActive;
}

function makeArray(start,end) {
    var myArray=[];
    for (var i = start; i < end; i++) {
        myArray.push(i);
    }
    return myArray;
}