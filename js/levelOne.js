class LevelOneScene extends Phaser.Scene{
    constructor() {
        super({key: 'LevelOneScene'})
        // this.player;
    }

    // load asset files for our game
    preload () {
    
     // load images
     this.load.image('background', 'assets/background.png');
     this.load.image('player', 'assets/player.png');
     this.load.image('platform', 'assets/platform.png');
   };
   
   init () {
       this.playerSpeed = 1.5;
       this.enemyMaxY = 280;
       this.enemyMinY = 80;
     }
    
   // executed once, after assets were loaded
   create () {
      // background
      let bg = this.add.sprite(0, 0, 'background');
      bg.setOrigin(0,0);
      // player
     var player = this.physics.add.sprite(40, this.sys.game.config.height / 2, 'player');
     
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
   
     var platforms = this.physics.add.staticGroup();
     platforms.create(400, 568, 'platform').setScale(2).refreshBody();
     platforms.create(10, 300, 'platform');
     platforms.create(300, 250, 'platform');
     platforms.create(750, 220, 'platform');
   
     var cursors = this.input.keyboard.createCursorKeys();
   
     this.physics.add.collider(player, platforms);
   }
   
   update () {
       if (this.cursors.left.isDown)
       {
           player.setVelocityX(-160);
       
       }
       else if (this.cursors.right.isDown)
       {
           player.setVelocityX(160);
       
       }
       else
       {
           player.setVelocityX(0);
       
       }
       if (this.cursors.up.isDown && this.player.body.touching.down)
       {
           player.setVelocityY(-250);
       }
   }
}
 export default LevelOneScene;
   