var game;
var model;
var controller;
var eventDispatcher;
var mediaManager;
var levelManager;
// 640x480
//
var defaultW = 1280;
var defaultH = 960;
var useLandscape = true;
window.onload = function() {
    isMobile = navigator.userAgent.indexOf("Mobile");
    isMobile = (isMobile != -1) ? true : false;
    if (isMobile == false) {
        if (useLandscape == true) {
            game = new Phaser.Game(defaultW, defaultH, Phaser.AUTO, "ph_game");
        } else {
            game = new Phaser.Game(defaultH, defaultW, Phaser.AUTO, "ph_game");
        }
    } else {
        game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.AUTO, "ph_game");
        if (useLandscape == true) {
            wrongTag = "wrongWayLandscape";
        } else {
            wrongTag = "wrongWayPortrait";
        }
    }
    G = new GameConstants();
    eventDispatcher = new Phaser.Signal();
    model = new Model();
    controller = new Controller();
    mediaManager = new MediaManager();
    model.devMode = true;
    //
    //
    //
    game.state.add("StateInit", StateInit);
    game.state.add("StateLoad", StateLoad);
    game.state.add("StateMain", StateMain);
    game.state.add("StateTitle", StateTitle);
    game.state.add("StateOver", StateOver);
    game.state.start("StateInit");
}