// create a new scene named "Game"
import MenuScene from './menu.js';
import LevelOneScene from './levelOne.js';
let menuScene = new MenuScene();
let levelOneScene = new LevelOneScene();
let gameScene = new Phaser.Scene('Title');

// our game's configuration
let config = {
 type: Phaser.AUTO,  //Phaser will decide how to render our game (WebGL or Canvas)
 width: 640, // game width
 height: 360, // game height
 physics: {
    default: 'arcade',
    arcade: {
        gravity: { y: 300 },
        debug: false
    }
},
 scene: gameScene // our newly created scene
};

// create the game, and pass it the configuration
let game = new Phaser.Game(config);
game.scene.add('MenuScene',menuScene);
game.scene.add('LevelOneScene',levelOneScene);
game.scene.start('MenuScene');