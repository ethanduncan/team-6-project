var BootScene = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

    function BootScene ()
    {
        Phaser.Scene.call(this, { key: 'BootScene' });
    },

    preload: function ()
    {
        //tileset
        this.load.image('tileset', 'assets/lvl1_tileset.png');
        //Level 1
        this.load.tilemapCSV('floor', 'assets/map/Level1/lvl1MVP_floor.csv');
        this.load.tilemapCSV('walls_water', 'assets/map/Level1/lvl1MVP_walls_water.csv');
        this.load.tilemapCSV('caveins', 'assets/map/Level1/lvl1MVP_caveins.csv');
        this.load.tilemapCSV('decor', 'assets/map/Level1/lvl1MVP_ground_decor.csv');
        //Boss Room
        this.load.tilemapCSV('forge_floor', 'assets/map/Boss/Borrowgeddon_Forge_floors.csv');
        this.load.tilemapCSV('forge_walls', 'assets/map/Boss/Borrowgeddon_Forge_walls_water.csv');
        this.load.tilemapCSV('forge_g_decor', 'assets/map/Boss/Borrowgeddon_Forge_ground_decor.csv');
        this.load.tilemapCSV('forge_f_decor', 'assets/map/Boss/Borrowgeddon_Forge_foreground_decor.csv');
        this.load.tilemapCSV('forge_blood', 'assets/map/Boss/Borrowgeddon_Forge_blood.csv');
        //sprites
        this.load.spritesheet('player', 'assets/RPG_assets.png', { frameWidth: 16, frameHeight: 16 });
        this.load.image('background', 'assets/map/background.png');
        this.load.image('lever', 'assets/map/Lever.PNG');
        this.load.image("dragonblue", "assets/Monsters/shadow_dragon.png");
        this.load.image("dragonorrange", "assets/dragonorrange.png");
        this.load.image('start', 'assets/map/Newgame.png');
        this.load.image('battle', 'assets/map/battle2.png');
        this.load.image('logo', 'assets/map/logo.png');
        this.load.image('bolt', 'assets/traps/bolt.png');
        this.load.image('dead', 'assets/ya_dead.png');
        this.load.image('infoImage', 'assets/map/Infoscroll.png');
        // this.load.image('dead', 'assets/map/Newgame.png');

        //music
        this.load.audio('theme', 'assets/music/bensound-epic.mp3');
    },

    create: function ()
    {
        var music = this.sound.add('theme');
        music.play();
        this.scene.start('MenuScene');
    }
});

var globalCharHealth = 100;

var MenuScene = new Phaser.Class({

        Extends: Phaser.Scene,

        initialize:

        function MenuScene ()
        {
            Phaser.Scene.call(this, { key: 'MenuScene' });
        },

        preload: function ()
        {

        },

        create: function ()
        {
            this.add.image(640, 320, "background");
            this.add.image(600, 320, "logo").setScale(1.2);
            var start = this.add.image(554, 700, "start").setScale(0.8);
            start.setInteractive();
            start.on("pointerdown",  () => {
                this.menuNumber = 0;
            });

        },
        update: function (time, delta)
        {
            if(this.menuNumber===0){
                //Revert after testing
                //this.scene.start("BattleScene", {pc_texture: "player", pc_type: "Thorvik", pc_attack: 15, pc_special: 50, pc_spCharge: 1, e_texture: "dragonblue", e_type: "Black Dragon", e_hp: 225, e_attack: 20, e_special:10});
                //this.scene.start("BossScene");
                this.scene.start("WorldScene");
            }
        }
    });

var WorldScene = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

    function WorldScene ()
    {
        Phaser.Scene.call(this, { key: 'WorldScene' });
        this.levers = 0;
    },

    preload: function ()
    {
        this.scene.launch("LevelUIScene");

    },

    create: function ()
    {
        let bg = this.add.sprite(0, 0, 'background');
        bg.setOrigin(0,0);

        //ground
        const floor = this.make.tilemap({ key: "floor", tileWidth: 32, tileHeight: 32 });
        const floorTiles = floor.addTilesetImage("tileset");
        floor.createStaticLayer(0, floorTiles, 0, 0);

        // //walls
        const walls = this.make.tilemap({ key: "walls_water", tileWidth: 32, tileHeight: 32 });
        const wallsTiles = walls.addTilesetImage("tileset");
        const wallLayer = walls.createStaticLayer(0, wallsTiles, 0, 0);

        // //caveins
        const caveins = this.make.tilemap({ key: "caveins", tileWidth: 32, tileHeight: 32 });
        const CITiles = caveins.addTilesetImage("tileset");
        const CILayer = caveins.createStaticLayer(0, CITiles, 0, 0);

        // //decor
        const decor = this.make.tilemap({ key: "decor", tileWidth: 32, tileHeight: 32 });
        const decorTiles = decor.addTilesetImage("tileset");
        const decorLayer = decor.createStaticLayer(0, decorTiles, 0, 0);

        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('player', { frames: [1, 7, 1, 13]}),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('player', { frames: [1, 7, 1, 13] }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'up',
            frames: this.anims.generateFrameNumbers('player', { frames: [2, 8, 2, 14]}),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'down',
            frames: this.anims.generateFrameNumbers('player', { frames: [ 0, 6, 0, 12 ] }),
            frameRate: 10,
            repeat: -1
        });

        //adding player and lever sprites
        this.player = this.physics.add.sprite(2224,48,'player', 6);
        this.lever1 = this.physics.add.sprite (560,784, 'lever', 5).setScale(0.1);
        this.lever2 = this.physics.add.sprite (2128,2448, 'lever', 5).setScale(0.1);
        this.lever3 = this.physics.add.sprite (208,1872, 'lever', 5).setScale(0.1);

        //spikes
        this.bolt1 = this.physics.add.sprite (944,2192, 'bolt', 5);
        this.bolt2 = this.physics.add.sprite (1136,1008, 'bolt', 5);
        this.bolt3 = this.physics.add.sprite (1168,1104, 'bolt', 5);
        this.bolt4 = this.physics.add.sprite (1040,1328, 'bolt', 5);
        this.bolt5 = this.physics.add.sprite (784,1296, 'bolt', 5);
        this.bolt6 = this.physics.add.sprite (1168,1264, 'bolt', 5);
        this.bolt7 = this.physics.add.sprite (816,1264, 'bolt', 5);
        this.bolt8 = this.physics.add.sprite (1104,1488, 'bolt', 5);

        // this.physics.add.group({
        //     key: 'bolt',
        //     repeat: 11,
        //     setXY: { x: 12, y: 0, stepX: 70 }
        // });

        this.physics.add.overlap(this.player, this.lever1, function() {
            console.log("Hello");
            this.levers = this.levers + 1;
            this.events.emit('addScore');
            this.lever1.disableBody(true,true);
        }, null, this);

        this.physics.add.overlap(this.player, this.lever2, function() {
            console.log("Hello");
            this.levers = this.levers + 1;
            this.events.emit('addScore');
            this.lever2.disableBody(true,true);
        }, null, this);

        this.physics.add.overlap(this.player, this.lever3, function() {
            console.log("Hello");
            this.levers = this.levers + 1;
            this.events.emit('addScore');
            this.lever3.disableBody(true,true);
        }, null, this);

        //add bolts overlap
        this.physics.add.overlap(this.player, this.bolt1, function() {
            this.bolt1.body.enable = false;
            this.events.emit('removeHealth');
            this.time.addEvent({ delay: 2000, callback: this.testFunct1 , callbackScope: this });
            this.cameras.main.shake(150);
        }, null, this);

        this.physics.add.overlap(this.player, this.bolt2, function() {
            this.bolt2.body.enable = false;
            this.events.emit('removeHealth');
            this.time.addEvent({ delay: 2000, callback: this.testFunct2 , callbackScope: this });
            this.cameras.main.shake(150);
        }, null, this);

        this.physics.add.overlap(this.player, this.bolt3, function() {
            this.bolt3.body.enable = false;
            this.events.emit('removeHealth');
            this.time.addEvent({ delay: 2000, callback: this.testFunct3 , callbackScope: this });
            this.cameras.main.shake(150);
        }, null, this);

        this.physics.add.overlap(this.player, this.bolt4, function() {
            this.bolt4.body.enable = false;
            this.events.emit('removeHealth');
            this.time.addEvent({ delay: 2000, callback: this.testFunct4 , callbackScope: this });
            this.cameras.main.shake(150);
        }, null, this);

        this.physics.add.overlap(this.player, this.bolt5, function() {
            this.bolt5.body.enable = false;
            this.events.emit('removeHealth');
            this.time.addEvent({ delay: 2000, callback: this.testFunct5 , callbackScope: this });
            this.cameras.main.shake(150);
        }, null, this);

        this.physics.add.overlap(this.player, this.bolt6, function() {
            this.bolt6.body.enable = false;
            this.events.emit('removeHealth');
            this.time.addEvent({ delay: 2000, callback: this.testFunct6 , callbackScope: this });
            this.cameras.main.shake(150);
        }, null, this);

        this.physics.add.overlap(this.player, this.bolt7, function() {
            this.bolt7.body.enable = false;
            this.events.emit('removeHealth');
            this.time.addEvent({ delay: 2000, callback: this.testFunct7 , callbackScope: this });
            this.cameras.main.shake(150);
        }, null, this);

        this.physics.add.overlap(this.player, this.bolt8, function() {
            this.bolt8.body.enable = false;
            this.events.emit('removeHealth');
            this.time.addEvent({ delay: 2000, callback: this.testFunct8 , callbackScope: this });
            this.cameras.main.shake(150);
        }, null, this);

        this.physics.world.bounds.width = floor.widthInPixels;
        this.physics.world.bounds.height = floor.heightInPixels;
        this.player.setCollideWorldBounds(true);

        wallLayer.setCollisionBetween(0,349);
        CILayer.setCollisionBetween(0, 349);
        decorLayer.setCollisionBetween(0, 349);
        this.physics.add.collider(this.player, wallLayer);
        this.physics.add.collider(this.player, CILayer);
        //this.physics.add.collider(this.player, decorLayer);

        this.cameras.main.setBounds(0, 0, floor.widthInPixels, floor.heightInPixels);
        this.cameras.main.startFollow(this.player);
        this.cameras.main.roundPixels = true;
        this.cameras.main.setZoom(1.5);

        this.cursors = this.input.keyboard.createCursorKeys();

        var image = this.add.image(600,450, "logo").setScale(0.75);
        this.tween2 = this.tweens.add({
            targets: image,
            x: 1000,
            duration: 4000,
            onStart: function () { console.log('onStart'); console.log(arguments); },
            onComplete: function () { image.setVisible(false); },
            onRepeat: function () { console.log('onRepeat'); console.log(arguments); },
        });

        this.key = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

    },
    testFunct1: function () {
        console.log("asd");
        this.bolt1.body.enable = true;
    },

    testFunct2: function () {
        console.log("asd");
        this.bolt2.body.enable = true;
    },

    testFunct3: function () {
        console.log("asd");
        this.bolt3.body.enable = true;
    },

    testFunct4: function () {
        console.log("asd");
        this.bolt4.body.enable = true;
    },

    testFunct5: function () {
        console.log("asd");
        this.bolt5.body.enable = true;
    },

    testFunct6: function () {
        console.log("asd");
        this.bolt6.body.enable = true;
    },

    testFunct7: function () {
        console.log("asd");
        this.bolt7.body.enable = true;
    },

    testFunct8: function () {
        console.log("asd");
        this.bolt8.body.enable = true;
    },

    get testFunct() {
        return this._testFunct;
    },
    set testFunct(value) {
        this._testFunct = value;
    },
    battleSceneChange: function() {
        console.log("asd");
        this.scene.start("BossScene");
    },
    update: function (time, delta)
    {
        this.player.body.setVelocity(0);

        if (this.cursors.left.isDown)
        {
            this.player.body.setVelocityX(-180);
        }
        else if (this.cursors.right.isDown)
        {
            this.player.body.setVelocityX(180);
        }

        if (this.cursors.up.isDown)
        {
            this.player.body.setVelocityY(-180);
        }
        else if (this.cursors.down.isDown)
        {
            this.player.body.setVelocityY(180);
        }

        if (this.cursors.left.isDown)
        {
            this.player.anims.play('left', true);
            this.player.flipX = true;
        }
        else if (this.cursors.right.isDown)
        {
            this.player.anims.play('right', true);
            this.player.flipX = false;
        }
        else if (this.cursors.up.isDown)
        {
            this.player.anims.play('up', true);
        }
        else if (this.cursors.down.isDown)
        {
            this.player.anims.play('down', true);
        }
        else
        {
            this.player.anims.stop();
        }

        if(this.levers == 2){
            this.cameras.main.shake(300);
            this.time.addEvent({ delay: 3000, callback: this.battleSceneChange , callbackScope: this });
        }

        if(globalCharHealth <= 0){
            this.scene.start('DeathScene');
        }

        if(this.key.isDown){
            this.events.emit('removeInfo');
        }
    }

});

var BossScene = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

    function BossScene ()
    {
        Phaser.Scene.call(this, { key: 'BossScene' });
    },

    preload: function ()
    {
        this.scene.launch("LevelUIScene");

    },

    create: function () {
        //Adding Background
        let bg = this.add.sprite(0, 0, 'background');
        bg.setOrigin(0,0);

        //floor layer
        const Bfloor = this.make.tilemap({ key: "forge_floor", tileWidth: 32, tileHeight: 32 });
        const BfloorTiles = Bfloor.addTilesetImage("tileset");
        const BFloorLayer = Bfloor.createStaticLayer(0, BfloorTiles, 0, 0);

        //Walls layer
        const BWalls = this.make.tilemap({ key: "forge_walls", tileWidth: 32, tileHeight: 32 });
        const BWallTiles = BWalls.addTilesetImage("tileset");
        const BWallsLayer = BWalls.createStaticLayer(0, BWallTiles, 0, 0);

        //Ground Decor layer
        const BGDecor = this.make.tilemap({ key: "forge_g_decor", tileWidth: 32, tileHeight: 32 });
        const BDecorTiles = BWalls.addTilesetImage("tileset");
        const BGDecorLayer = BGDecor.createStaticLayer(0, BDecorTiles, 0, 0);

        //Blood layer
        const B_Blood = this.make.tilemap({ key: "forge_blood", tileWidth: 32, tileHeight: 32 });
        const B_BloodTiles = B_Blood.addTilesetImage("tileset");
        const B_BloodyLayer = B_Blood.createStaticLayer(0, B_BloodTiles, 0, 0);

        this.boss = this.add.sprite(500, 200, 'dragonblue', 5);

        //Sprite Spawn (done above foreground layer for layering effect)
        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('player', { frames: [1, 7, 1, 13]}),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('player', { frames: [1, 7, 1, 13] }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'up',
            frames: this.anims.generateFrameNumbers('player', { frames: [2, 8, 2, 14]}),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'down',
            frames: this.anims.generateFrameNumbers('player', { frames: [ 0, 6, 0, 12 ] }),
            frameRate: 10,
            repeat: -1
        });
        this.Bplayer = this.physics.add.sprite(368,944,'player', 6);

        //final Layer Spawn
        const B_F_Decor = this.make.tilemap({ key: "forge_f_decor", tileWidth: 32, tileHeight: 32 });
        const B_FDecorTiles = B_F_Decor.addTilesetImage("tileset");
        const B_F_DecorLayer = B_F_Decor.createStaticLayer(0, B_FDecorTiles, 0, 0);

        //World Bounds
        this.physics.world.bounds.width = Bfloor.widthInPixels;
        this.physics.world.bounds.height = Bfloor.heightInPixels;

        //Collisions
        BWallsLayer.setCollisionBetween(0, 349);
        BGDecorLayer.setCollisionBetween(0, 349);

        this.physics.add.collider(this.Bplayer, BWallsLayer);
        this.physics.add.collider(this.Bplayer, BGDecorLayer);
        this.Bplayer.setCollideWorldBounds(true);

        //Camera Setup
        this.cameras.main.setBounds(0, 0, Bfloor.widthInPixels, Bfloor.heightInPixels);
        this.cameras.main.startFollow(this.Bplayer);
        this.cameras.main.roundPixels = true;
        this.cameras.main.setZoom(1.5);

        // this.physics.add.overlap(this.bPlayer, this.boss, function() {
        // }, null, this);

        this.physics.add.overlap(this.Bplayer, this.boss, this.startBattle, null, this);
        this.time.addEvent({ delay: 10000, callback: this.startBattle, callbackScope: this });


        this.cursors = this.input.keyboard.createCursorKeys();

        this.key = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

    },
    startBattle: function() {
        console.log("starting scene");
        this.scene.start("BattleScene", {pc_texture: "player", pc_type: "Thorvik", pc_attack: 15, pc_special: 50, pc_spCharge: 1, e_texture: "dragonblue", e_type: "Black Dragon", e_hp: 225, e_attack: 20, e_special:10});
    },
    update: function (time, delta)
    {
        this.Bplayer.body.setVelocity(0);

        if (this.cursors.left.isDown)
        {
            this.Bplayer.body.setVelocityX(-120);
        }
        else if (this.cursors.right.isDown)
        {
            this.Bplayer.body.setVelocityX(120);
        }

        if (this.cursors.up.isDown)
        {
            this.Bplayer.body.setVelocityY(-120);
        }
        else if (this.cursors.down.isDown)
        {
            this.Bplayer.body.setVelocityY(120);
        }

        if (this.cursors.left.isDown)
        {
            this.Bplayer.anims.play('left', true);
            this.Bplayer.flipX = true;
        }
        else if (this.cursors.right.isDown)
        {
            this.Bplayer.anims.play('right', true);
            this.Bplayer.flipX = false;
        }
        else if (this.cursors.up.isDown)
        {
            this.Bplayer.anims.play('up', true);
        }
        else if (this.cursors.down.isDown)
        {
            this.Bplayer.anims.play('down', true);
        }
        else
        {
            this.Bplayer.anims.stop();
        }
        if(this.key.isDown){
            this.events.emit('removeInfo');
        }

    }
});

var DeathScene = new Phaser.Class({

        Extends: Phaser.Scene,

        initialize:

        function DeathScene ()
        {
            Phaser.Scene.call(this, {key: "DeathScene"});
        },

        create: function ()
        {
            this.cameras.main.setBackgroundColor("rgba(0, 0, 0, 0.5)");
            this.add.image(560, 600, "dead");
            this.add.image(570, 320, "logo").setScale(1);
        }
    });

var WinScene = new Phaser.Class({

        Extends: Phaser.Scene,

        initialize:

        function WinScene ()
        {
            Phaser.Scene.call(this, {key: "WinScene"});
        },

        create: function ()
        {
            this.cameras.main.setBackgroundColor("rgba(0, 0, 0, 0.5)");
            this.add.image(570, 320, "logo").setScale(1);
        }
    });

var LevelUIScene = new Phaser.Class({

        Extends: Phaser.Scene,

        initialize:

        function LevelUIScene ()
        {
            Phaser.Scene.call(this, { key: 'LevelUIScene' });

            this.score = 0;
        },

        create: function ()
        {
            //  Our Text object to display the Score

            var info = this.add.text(875, 800, 'Levers Found: 0', { font: '24px Arial', fill: '#FFFFFF' });
            var life = this.add.text(50, 800, 'Health: ' + globalCharHealth , { font: '24px Arial', fill: '#FFFFFF' });

            var infoImage = this.add.image(554, 450, "infoImage").setScale(1);

            //  Grab a reference to the Game Scene
            var ourGame = this.scene.get('WorldScene');
            var bossGame = this.scene.get('BossScene');

            this.message = new Message(this,ourGame.events, 552, 600, 475, 151);
            this.add.existing(this.message);


            //  Listen for events from it
            ourGame.events.on('addScore', function () {

                this.score += 1;

                info.setText('Levers Found: ' + this.score);

            }, this);

            ourGame.events.on('removeHealth', function () {

                globalCharHealth -= 5;

                console.log(1);

                ourGame.events.emit("Message", "-5 Health");

                life.setText('Health: ' + globalCharHealth);

            }, this);


            ourGame.events.on('removeInfo', function () {

                infoImage.destroy();

            }, this);

            bossGame.events.on('removeInfo', function () {

                infoImage.destroy();

            }, this);

            this.image = this.add.image(350,220, "logo").setScale(0.75).setVisible(false);

            this.key = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.M);



        },
        update: function()
        {
            if (this.key.isDown) {
                if(this.image.visible){
                    this.image.setVisible(false);
                }else{
                    this.image.setVisible(true);
                }
              }
        }

});

var BattleScene = new Phaser.Class({

        Extends: Phaser.Scene,

        initialize:

        function BattleScene ()
        {
            Phaser.Scene.call(this, { key: "BattleScene" })
        },
        init: function (data)
        {
            this.pc_texture = data.pc_texture;
            this.pc_type = data.pc_type;
            this.pc_attack = data.pc_attack;
            this.pc_special = data.pc_special;
            this.pc_spCharge = data.pc_spCharge;
            this.e_texture = data.e_texture;
            this.e_type = data.e_type;
            this.e_hp = data.e_hp;
            this.e_attack = data.e_attack;
            this.e_special = data.e_special;
        },
        create: function ()
        {

            // change the background to green
            this.cameras.main.setBackgroundColor("rgba(220, 220, 220, 0.5)");

            // player character - warrior
            //scene, x, y, texture, frame, type, hp, damage, specialDamage, specialCharge, hpx, hpy
            // var warrior = new PlayerCharacter(this, 95, 350, "player", 1, "Thorvik", 100, 35, 100, 1, 184, 445);
            var hero = new PlayerCharacter(this, 95, 350, this.pc_texture, 1, this.pc_type, globalCharHealth, this.pc_attack, this.pc_special, this.pc_spCharge, 3, 160);
            this.add.existing(hero);

            var enemy = new Enemy(this, 932, 350, this.e_texture, 2, this.e_type, this.e_hp, this.e_attack, this.e_special, 4, 932, 160);
            this.add.existing(enemy);

            // array with character
            this.heroes = [ hero ];
            // array with enemies
            this.enemies = [ enemy ];
            // array with both parties, who will attack
            this.units = this.heroes.concat(this.enemies);

            // Run UI Scene at the same time
            this.scene.launch("UIScene");
            this.scene.stop("LevelUIScene");
            this.index = -1;
        },
        nextTurn: function() {
            this.index++;
            // if there are no more units, we start again from the first one
            if(this.index >= this.units.length) {
                this.index = 0;
            }
            if(this.units[this.index]) {
                if(this.units[this.index].alive) {
                    // if its player hero
                    if(this.units[this.index] instanceof PlayerCharacter) {
                        this.events.emit("PlayerSelect", this.index);
                    } else { // else if it's an enemy unit
                        // pick random hero
                        var r = Math.floor(Math.random() * this.heroes.length);
                        // call the enemy"s attack function
                        this.units[this.index].attack(this.heroes[r]);

                        // add timer for the next turn, so will have smooth gameplay
                        this.time.addEvent({ delay: 3000, callback: this.nextTurn, callbackScope: this });
                    }
                } else {
                    this.scene.remove("UIScene");
                    this.scene.start("WinScene");
                    //this.time.addEvent({ callback: this.nextTurn, callbackScope: this });
                }
            }
        },
        // when the player have selected the enemy to be attacked
        receivePlayerSelection: function(action, target) {
            if(action == "attack") {
                this.units[this.index].attack(this.enemies[target]);
            }
            else if(action == "special") {
                this.units[this.index].special(this.enemies[target]);
            }
            else if(action == "heal") {
                this.units[this.index].heal(this.heroes[target]);
            }
            // next turn in 3 seconds
            this.time.addEvent({ delay: 3000, callback: this.nextTurn, callbackScope: this });
        }

    });

// base class for heroes and enemies
var Unit = new Phaser.Class({
    Extends: Phaser.GameObjects.Sprite,

    initialize:

    function Unit(scene, x, y, texture, frame, type, hp, damage, specialDamage, specialCharge, hpx, hpy) {
        Phaser.GameObjects.Sprite.call(this, scene, x, y, texture, frame)
        this.type = type;
        this.hp = new HealthBar(scene, hpx, hpy);
        this.damage = damage; // default damage
        this.specialDamage = specialDamage; //special attack damage
        this.alive = true;
        this.specialCharge = specialCharge;
        this.specialCooldown = specialCharge;
    },
    attack: function(target) {
        target.takeDamage(this.damage);
        this.chargeSpecial();
        this.scene.events.emit("Message", this.type + " attacks " + target.type + " for " + this.damage + " damage");
    },
    special: function(target) {
        if(this.specialCharge == 0) {
            target.takeDamage(this.specialDamage);
            this.specialCharge = this.specialCooldown;
            this.scene.events.emit("Message", this.type + " special attacks " + target.type + " for " + this.specialDamage + " damage");
        } else {
            this.scene.events.emit("Message", "Special attack isn't ready. Attack " + this.specialCharge + " more times.");
        }
    },
    takeDamage: function(damage) {

        if(this.hp.decrease(damage)) {
            this.hp = 0;
            this.alive = false;
            this.destroy();
        }
    },
    heal: function(target) {
        this.hp.increase(25, this.maxHp);
        this.scene.events.emit("Message", this.type + " heals 25 hp");
    },
    chargeSpecial: function() {
        this.specialCharge -= 1;
        if(this.specialCharge < 0) {
            this.specialCharge = 0;
        }
    }
});

var Enemy = new Phaser.Class({
    Extends: Unit,

    initialize:
    function Enemy(scene, x, y, texture, frame, type, hp, damage, specialDamage, specialCharge, hpx, hpy) {
        Unit.call(this, scene, x, y, texture, frame, type, hp, damage, specialDamage, specialCharge, hpx, hpy);

        this.setScale(8);
    }
});

var PlayerCharacter = new Phaser.Class({
    Extends: Unit,

    initialize:
    function PlayerCharacter(scene, x, y, texture, frame, type, hp, damage, specialDamage, specialCharge, hpx, hpy) {
        Unit.call(this, scene, x, y, texture, frame, type, hp, damage, specialDamage, specialCharge, hpx, hpy);
        // flip the image so I don"t have to edit it manually

        this.setScale(6);
    }
});

var HealthBar = new Phaser.Class({

    Extends: Phaser.Class,

    initialize:
    function HealthBar (scene, x, y) {
        this.bar = new Phaser.GameObjects.Graphics(scene);
        this.x = x;
        this.y = y;
        this.value = 100;
        this.p = 164 / 100;

        this.draw();

        scene.add.existing(this.bar);
    },

    decrease: function(amount) {
        this.value -= amount;

        if (this.value < 0)
        {
            this.value = 0;
        }

        this.draw();

        return (this.value === 0);
    },

    increase: function(amount, maxHp) {
        this.value += amount;

        if (this.value > 100)
        {
            this.value = 100;
        }

        this.draw();

        return (this.value === 0);

    },

    draw: function() {
        this.bar.clear();

        //  BG
        this.bar.fillStyle(0x000000);
        this.bar.fillRect(this.x, this.y, 170, 20);

        //  Health

        this.bar.fillStyle(0xffffff);
        this.bar.fillRect(this.x + 3, this.y + 3, 164, 14);

        if (this.value < 30)
        {
            this.bar.fillStyle(0xff0000);
        }
        else
        {
            this.bar.fillStyle(0x00ff00);
        }

        var d = Math.floor(this.p * this.value);

        this.bar.fillRect(this.x + 3, this.y + 3, d, 14);
    }

});

var MenuItem = new Phaser.Class({
    Extends: Phaser.GameObjects.Text,

    initialize:

    function MenuItem(x, y, text, scene) {
        Phaser.GameObjects.Text.call(this, scene, x, y, text, { color: "#ffffff", align: "left", fontSize: 20});
    },

    select: function() {
        this.setColor("#f8ff38");
    },

    deselect: function() {
        this.setColor("#ffffff");
    }

});

var Menu = new Phaser.Class({
    Extends: Phaser.GameObjects.Container,

    initialize:

    function Menu(x, y, scene, heroes) {
        Phaser.GameObjects.Container.call(this, scene, x, y);
        this.menuItems = [];
        this.menuItemIndex = 0;
        this.heroes = heroes;
        this.x = x;
        this.y = y;
    },
    addMenuItem: function(unit) {
        var menuItem = new MenuItem(0, this.menuItems.length * 20, unit, this.scene);
        this.menuItems.push(menuItem);
        this.add(menuItem);
    },
    moveSelectionUp: function() {
        this.menuItems[this.menuItemIndex].deselect();
        this.menuItemIndex--;
        if(this.menuItemIndex < 0)
            this.menuItemIndex = this.menuItems.length - 1;
        this.menuItems[this.menuItemIndex].select();
    },
    moveSelectionDown: function() {
        this.menuItems[this.menuItemIndex].deselect();
        this.menuItemIndex++;
        if(this.menuItemIndex >= this.menuItems.length)
            this.menuItemIndex = 0;
        this.menuItems[this.menuItemIndex].select();
    },
    // select the menu as a whole and an element with index from it
    select: function(index) {
        if(!index)
            index = 0;
        this.menuItems[this.menuItemIndex].deselect();
        this.menuItemIndex = index;
        this.menuItems[this.menuItemIndex].select();
    },
    // deselect this menu
    deselect: function() {
        this.menuItems[this.menuItemIndex].deselect();
        this.menuItemIndex = 0;
    },
    confirm: function() {
        // when the player confirms his selection, do the action
    },
    clear: function() {
        for(var i = 0; i < this.menuItems.length; i++) {
            this.menuItems[i].destroy();
        }
        this.menuItems.length = 0;
        this.menuItemIndex = 0;
    },
    remap: function(units) {
        this.clear();
        for(var i = 0; i < units.length; i++) {
            var unit = units[i];
            this.addMenuItem(unit.type);
        }
    }
});

var HeroesMenu = new Phaser.Class({
    Extends: Menu,

    initialize:

    function HeroesMenu(x, y, scene) {
        Menu.call(this, x, y, scene);
    }
});

var ActionsMenu = new Phaser.Class({
    Extends: Menu,

    initialize:

    function ActionsMenu(x, y, scene) {
        Menu.call(this, x, y, scene);
        this.addMenuItem("Attack");
        this.addMenuItem("Special");
        this.addMenuItem("Heal");
    },
    confirm: function() {

        if (this.menuItemIndex==0) {
            this.scene.events.emit("SelectEnemies", "attack");
        } else if (this.menuItemIndex==1) {
            this.scene.events.emit("SelectEnemies", "special");
        } else if (this.menuItemIndex==2) {
            this.scene.events.emit("Heal");
        }
    }

});

var EnemiesMenu = new Phaser.Class({
    Extends: Menu,

    initialize:

    function EnemiesMenu(x, y, scene) {
        Menu.call(this, x, y, scene);
    },
    setAttack: function(attackType) {
        this.attackType = attackType;
    },
    confirm: function() {
        this.scene.events.emit("Enemy", this.menuItemIndex, this.attackType);
    }
});

var UIScene = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

    function UIScene ()
    {
        Phaser.Scene.call(this, { key: "UIScene" });
    },

    create: function ()
    {
        this.graphics = this.add.graphics();
        this.graphics.lineStyle(1, 0xffffff);
        this.graphics.fillStyle(0x031f4c, 1);

        this.graphics1 = this.add.graphics();
        this.graphics1.fillStyle(0x000000, 1);
        this.graphics1.fillRect(0, 0, 1105, 100);
        this.graphics1.fillRect(0, 744, 1105, 100);

        // background for enemy menu
        this.graphics.strokeRect(932, 103, 171, 51);
        this.graphics.fillRect(932, 104, 170, 50);

        // background for message menu
        this.graphics.strokeRect(213, 584, 890, 151);
        this.graphics.fillRect(213, 585, 889, 150);

        // background for action menu
        this.graphics.strokeRect(3, 584, 206, 151);
        this.graphics.fillRect(3, 585, 205, 150);

        // background for hero menu
        this.graphics.strokeRect(3, 103, 171, 51);
        this.graphics.fillRect(3, 104, 170, 50);

        // basic container to hold all menus
        this.menus = this.add.container();

        // offset the actual text menu by 3
        this.heroesMenu = new HeroesMenu(9, 111, this);
        this.actionsMenu = new ActionsMenu(9, 590, this);
        this.enemiesMenu = new EnemiesMenu(938, 111, this);

        // the currently selected menu
        this.currentMenu = this.actionsMenu;

        // add menus to the container
        this.menus.add(this.heroesMenu);
        this.menus.add(this.actionsMenu);
        this.menus.add(this.enemiesMenu);

        this.battleScene = this.scene.get("BattleScene");

        this.remapHeroes();
        this.remapEnemies();

        this.input.keyboard.on("keydown", this.onKeyInput, this);

        this.battleScene.events.on("PlayerSelect", this.onPlayerSelect, this);

        this.events.on("SelectEnemies", this.onSelectEnemies, this);

        this.events.on("Enemy", this.onEnemy, this);
        this.events.on("Heal", this.onHeal, this);

        this.message = new Message(this, this.battleScene.events, 453, 584, 890, 151);
        this.add.existing(this.message);

        this.battleScene.nextTurn();
    },
    onEnemy: function(index, attackType) {
        this.heroesMenu.deselect();
        this.actionsMenu.deselect();
        this.enemiesMenu.deselect();
        this.currentMenu = null;
        this.battleScene.receivePlayerSelection(attackType, index);
    },
    onHeal: function() {
        this.heroesMenu.deselect();
        this.currentMenu = null;
        this.battleScene.receivePlayerSelection("heal", 0);
    },
    onPlayerSelect: function(id) {
        this.heroesMenu.select(id);
        this.actionsMenu.select(0);
        this.currentMenu = this.actionsMenu;
    },
    onSelectEnemies: function(attackType) {
        this.currentMenu = this.enemiesMenu;
        this.enemiesMenu.setAttack(attackType);
        this.enemiesMenu.select(0);
    },
    remapHeroes: function() {
        var heroes = this.battleScene.heroes;
        this.heroesMenu.remap(heroes);
    },
    remapEnemies: function() {
        var enemies = this.battleScene.enemies;
        this.enemiesMenu.remap(enemies);
    },
    onKeyInput: function(event) {
        if(this.currentMenu) {
            if(event.code === "ArrowUp") {
                this.currentMenu.moveSelectionUp();
            } else if(event.code === "ArrowDown") {
                this.currentMenu.moveSelectionDown();
            } else if(event.code === "ArrowRight" || event.code === "Shift") {

            } else if(event.code === "Space" || event.code === "ArrowLeft") {
                this.currentMenu.confirm();
            }
        }
    },
});

var Message = new Phaser.Class({

    Extends: Phaser.GameObjects.Container,

    initialize:
    function Message(scene, events, x, y, width, height) {

        Phaser.GameObjects.Container.call(this, scene, x, y);
        var graphics = this.scene.add.graphics();
        this.add(graphics);
        graphics.lineStyle(1, 0xffffff, 0.8);
        graphics.fillStyle(0x031f4c, 0.3);
        graphics.strokeRect(x, y, width, height);
        graphics.fillRect(x, y, (width-1), (height-1));
        this.text = new Phaser.GameObjects.Text(scene, 200, 75, "", { color: "#ffffff", align: "center", fontSize: 24, wordWrap: { width: 889, useAdvancedWrap: true }});
        this.add(this.text);
        this.text.setOrigin(0.5);
        events.on("Message", this.showMessage, this);
        this.visible = false;
    },

    showMessage: function(text) {
        this.text.setText(text);
        this.visible = true;
        if(this.hideEvent)
            this.hideEvent.remove(false);
        this.hideEvent = this.scene.time.addEvent({ delay: 2000, callback: this.hideMessage, callbackScope: this });
    },

    hideMessage: function() {
        this.hideEvent = null;
        this.visible = false;
    }
});

var config = {
    type: Phaser.AUTO,
    parent: 'content',
    width: 1104,
    height: 844,
    zoom: 2,
    pixelArt: true,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    },
    scene: [
        BootScene,
        WorldScene,
        BossScene,
        BattleScene,
        UIScene,
        MenuScene,
        LevelUIScene,
        DeathScene,
        WinScene
    ]
};
var game = new Phaser.Game(config);
