// create a new scene named "Game"
let gameScene = new Phaser.Scene('Game');

// load asset files for our game
gameScene.preload = function() {
 
  // load images
  this.load.image('background', 'assets/background.png');
  this.load.image('player', 'assets/player.png');
  this.load.image('platform', 'assets/platform.png');
};

gameScene.init = function() {
    this.playerSpeed = 1.5;
    this.enemyMaxY = 280;
    this.enemyMinY = 80;
  }
 
// executed once, after assets were loaded
gameScene.create = function() {
   // background
   let bg = this.add.sprite(0, 0, 'background');
   bg.setOrigin(0,0);
   // player
  player = this.physics.add.sprite(40, this.sys.game.config.height / 2, 'player');
  
   // scale down
  player.setScale(0.5);
  player.setBounce(0.2);
  player.setCollideWorldBounds(true);

  
// this.anims.create({
//     key: 'left',
//     frames: this.anims.generateFrameNumbers('player', { start: 0, end: 3 }),
//     frameRate: 10,
//     repeat: -1
// });

// this.anims.create({
//     key: 'turn',
//     frames: [ { key: 'player', frame: 4 } ],
//     frameRate: 20
// });

// this.anims.create({
//     key: 'right',
//     frames: this.anims.generateFrameNumbers('player', { start: 5, end: 8 }),
//     frameRate: 10,
//     repeat: -1
// });

  platforms = this.physics.add.staticGroup();
  platforms.create(400, 568, 'platform').setScale(2).refreshBody();
  platforms.create(10, 300, 'platform');
  platforms.create(300, 250, 'platform');
  platforms.create(750, 220, 'platform');

  cursors = this.input.keyboard.createCursorKeys();

  this.physics.add.collider(player, platforms);
}

gameScene.update = function() {
    if (cursors.left.isDown)
    {
        player.setVelocityX(-160);
    
    }
    else if (cursors.right.isDown)
    {
        player.setVelocityX(160);
    
    }
    else
    {
        player.setVelocityX(0);
    
    }
    if (cursors.up.isDown && player.body.touching.down)
    {
        player.setVelocityY(-250);
    }
}

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