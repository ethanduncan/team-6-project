import BattleScene from './battleScene.js';
let battleScene = new BattleScene();
let gameScene = new Phaser.Scene('Title');

let config = {
    type: Phaser.AUTO,
    width: 640,
    height: 640,
    zoom:2,
    pixelArt: true,
    physics: {
        default: "arcade",
        arcade: {
            gravity: { y: 0 }
        }
    },
    scene: gameScene
};

let game = new Phaser.Game(config);
game.scene.add('BattleScene', battleScene);
game.scene.start('BattleScene');
