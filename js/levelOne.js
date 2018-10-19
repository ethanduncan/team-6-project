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
     this.player = this.physics.add.sprite(40, this.sys.game.config.height / 2, 'player');
     
      // scale down
     this.player.setScale(0.5);
     this.player.setBounce(0.2);
     this.player.setCollideWorldBounds(true);
   
     this.platforms = this.physics.add.staticGroup();
     this.platforms.create(400, 568, 'platform').setScale(2).refreshBody();
     this.platforms.create(10, 300, 'platform');
     this.platforms.create(300, 250, 'platform');
     this.platforms.create(750, 220, 'platform');
   
     this.cursors = this.input.keyboard.createCursorKeys();
   
     this.physics.add.collider(this.player, this.platforms);
   }
   
   update () {
       if (this.cursors.left.isDown)
       {
           this.player.setVelocityX(-160);
       
       }
       else if (this.cursors.right.isDown)
       {
           this.player.setVelocityX(160);
       
       }
       else
       {
           this.player.setVelocityX(0);
       
       }
       if (this.cursors.up.isDown && this.player.body.touching.down)
       {
           this.player.setVelocityY(-250);
       }
   }
}
 export default LevelOneScene;
   