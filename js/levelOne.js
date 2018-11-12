import Player from './Player.js';

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
     this.load.image('lever', 'assets/Lever.png');
     this.load.image('tileset', 'assets/hackTextures.png');
     this.load.tilemapCSV("tileMap", 'assets/Hackmap.csv');
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

      // Load tilemap from tilemap with tile height and width of 32
      const map = this.make.tilemap({ key: "tileMap", tileWidth: 32, tileHeight: 32 });
      //create tileset from tileset images loaded
      const tiles = map.addTilesetImage("tileset");
      //create a static layer as level does not need modifying by user
      const layer = map.createStaticLayer(0, tiles, 0, 0);

      this.lever = this.add.sprite(400, 300, 'lever').setInteractive();
      this.lever.setScale(0.1);

       // player
     this.player = new Player(this);
     // scale down
     this.player.setScale(0.3);
     this.player.body.setBounce(0.2);

    //set collisions between layers 1-50 (0 is grass which we want to walk on)
      layer.setCollisionBetween(1,50);
      //set up collisions
      this.physics.add.collider(this.player, layer);
      //this.player.setCollideWorldBounds(true);

      this.add.text(0,0,this.player.leversPulled); 
      
     this.cursors = this.input.keyboard.createCursorKeys();




    //  this.lever.on('keydown_E', function () {
    //     console.log("asdasd");
    //         });
   
     //this.physics.add.collider(this.player, this.platforms);


   }



   
   update () {
       

    this.button = function(player, lever) {
        
            lever.disableBody(true,true);
            
    }

    this.physics.add.overlap(this.player, this.lever, console.log("!!!!"), null, this);
    

       if (this.player.x > 400)
       {
        this.cameras.main.scrollX = this.player.x - 400;
       }
       if (this.player.y > 400)
       {
        this.cameras.main.scrollY = this.player.y - 400;
       }
       if (this.cursors.left.isDown)
       {
           this.player.body.setVelocityX(-160);
       
       }
       else if (this.cursors.right.isDown)
       {
           this.player.body.setVelocityX(160);
       
       }
       else
       {
           this.player.body.setVelocityX(0);
       
       }
       if (this.cursors.up.isDown)
       {
           this.player.body.setVelocityY(-250);
       }
       else if (this.cursors.down.isDown)
       {
            this.player.body.setVelocityY(250);   
       }
       else 
       {
            this.player.body.setVelocityY(0);
       }

   }


}
 export default LevelOneScene;
   