var BootScene = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

    function BootScene ()
    {
        Phaser.Scene.call(this, { key: 'BootScene' });
    },

    preload: function ()
    {
        this.load.image('tiles', 'assets/map/spritesheet.png'); 
        this.load.tilemapCSV('map', 'assets/map/HackMap.csv');
        this.load.spritesheet('player', 'assets/RPG_assets.png', { frameWidth: 16, frameHeight: 16 });
        this.load.image('background', 'assets/map/background.png');
        this.load.image('lever', 'assets/map/Lever.png');
        this.load.image('tileset', 'assets/map/hackTextures.png');
        this.load.tilemapCSV("tileMap", 'assets/map/Hackmap.csv');
        this.load.image("dragonblue", "assets/dragonblue.png");
        this.load.image("dragonorrange", "assets/dragonorrange.png");
        this.load.image('start', 'assets/map/play.png');
        this.load.image('battle', 'assets/map/battle2.png');  
        this.load.image('logo', 'assets/map/logo.png');
    },

    create: function ()
    {
        this.scene.start('MenuScene');
    }
});

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
            // this.add.text(70,100, 'Labyrinths of Corcoran',{ fontSize: '45px', color: 'red'}).setFontFamily('font1');
            this.add.image(350,220, "logo").setScale(0.75);
            var start = this.add.image(120, 500, "start").setScale(0.25);
            start.setInteractive();
            start.on("pointerdown",  () => {
                this.menuNumber = 0;
            });
        
            var battle = this.add.image(520, 500, "battle").setScale(0.65);
            battle.setInteractive();
            battle.on("pointerdown",  () => {
                this.menuNumber = 1;
        });
        },
        update: function (time, delta)
        {
            if(this.menuNumber===0){
                this.scene.start("WorldScene");
            }else if(this.menuNumber===1){
                this.scene.start("BattleScene");
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
        
    },

    create: function ()
    {
        let bg = this.add.sprite(0, 0, 'background');
        bg.setOrigin(0,0);
  
        const map = this.make.tilemap({ key: "tileMap", tileWidth: 32, tileHeight: 32 });
        const tiles = map.addTilesetImage("tileset");
        const layer = map.createStaticLayer(0, tiles, 0, 0);
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
        this.player = this.physics.add.sprite(176,48,'player', 6);
        this.lever1 = this.physics.add.sprite (176,50, 'lever', 5).setScale(0.1);

        this.physics.add.overlap(this.player, this.lever1, this.onEvent(this.lever1), null, this);

        this.physics.world.bounds.width = map.widthInPixels;
        this.physics.world.bounds.height = map.heightInPixels;
        this.player.setCollideWorldBounds(true);

        this.add.text(50,50, this.levers);

        layer.setCollisionBetween(1,50);
        this.physics.add.collider(this.player, layer);

        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
        this.cameras.main.startFollow(this.player);
        this.cameras.main.roundPixels = true;
    
        this.cursors = this.input.keyboard.createCursorKeys();
        
        // timedEvent = this.time.addEvent({
        //     delay: 200000,
        //     callback: this.scene.start('WorldScene'),
        //     callbackScope: this
        // });
    },
    onEvent: function(lever) {
        console.log("Hello");
        // uncomment this to destroy.
        // lever.disableBody(true,true);
    },
    update: function (time, delta)
    {
        this.player.body.setVelocity(0);

        if (this.cursors.left.isDown)
        {
            this.player.body.setVelocityX(-80);
        }
        else if (this.cursors.right.isDown)
        {
            this.player.body.setVelocityX(80);
        }

        if (this.cursors.up.isDown)
        {
            this.player.body.setVelocityY(-80);
        }
        else if (this.cursors.down.isDown)
        {
            this.player.body.setVelocityY(80);
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

       // this.physics.arcade.overlap(player, lever1, leverCollect(lever1), null, this);
    },

    //leverCollect: function(sprite) {
    //    this.levers = this.levers + 1;
    //    sprite.destroy();
//
    //}
    
});

var WinScene = new Phaser.Class({
    
        Extends: Phaser.Scene,
    
        initialize:
    
        function WinScene ()
        {
            Phaser.Scene.call(this, {key: "BattleScene"});
        },
    
        create: function ()
        {
            this.cameras.main.setBackgroundColor("rgba(0, 0, 0, 0.5)");
        }
    });
    
    var BattleScene = new Phaser.Class({
    
        Extends: Phaser.Scene,
    
        initialize:
    
        function BattleScene ()
        {
            Phaser.Scene.call(this, { key: "BattleScene" });
        },
        create: function ()
        {
            this.cameras.main.setBackgroundColor("rgba(0, 200, 0, 0.5)");
    
            var warrior = new PlayerCharacter(this, 50, 150, "player", 1, "Thorvik", 100, 35, 100);
            this.add.existing(warrior);
    
            var dragonblue = new Enemy(this, 350, 70, "dragonblue", 2, "Blue Dragon", 80, 13, 10);
            this.add.existing(dragonblue);
    
            this.heroes = [ warrior ];
            this.enemies = [ dragonblue ];
            this.units = this.heroes.concat(this.enemies);
            this.scene.launch("UIScene");
    
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
            if(action == "special") {
                this.units[this.index].special(this.enemies[target]);
            }
            // next turn in 3 seconds
            this.time.addEvent({ delay: 3000, callback: this.nextTurn, callbackScope: this });
        }
    
    });
    
    // base class for heroes and enemies
    var Unit = new Phaser.Class({
        Extends: Phaser.GameObjects.Sprite,
    
        initialize:
    
        function Unit(scene, x, y, texture, frame, type, hp, damage, specialDamage) {
            Phaser.GameObjects.Sprite.call(this, scene, x, y, texture, frame)
            this.type = type;
            this.maxHp = this.hp = hp;
            this.damage = damage; // default damage
            this.specialDamage = specialDamage; //special attack damage
            this.alive = true;
        },
        attack: function(target) {
            target.takeDamage(this.damage);
            this.scene.events.emit("Message", this.type + " attacks " + target.type + " for " + this.damage + " damage");
        },
        takeDamage: function(damage) {
            this.hp -= damage;
            if(this.hp <= 0) {
                this.hp = 0;
                this.scene.events.emit("Message", this.type + "has died!");
                this.alive = false;
                this.destroy();
            }
        },
        special: function(target) {
            target.takeDamage(this.specialDamage);
            this.scene.events.emit("Message", this.type + " special attacks " + target.type + " for " + this.specialDamage + " damage")
        }
    });
    
    var Enemy = new Phaser.Class({
        Extends: Unit,
    
        initialize:
        function Enemy(scene, x, y, texture, frame, type, hp, damage, specialDamage) {
            Unit.call(this, scene, x, y, texture, frame, type, hp, damage, specialDamage);
    
            this.flipX = true;
    
            this.setScale(4);
        }
    });
    
    var PlayerCharacter = new Phaser.Class({
        Extends: Unit,
    
        initialize:
        function PlayerCharacter(scene, x, y, texture, frame, type, hp, damage, specialDamage) {
            Unit.call(this, scene, x, y, texture, frame, type, hp, damage, specialDamage);
            // flip the image so I don"t have to edit it manually
    
            this.setScale(4);
        }
    });
    
    var MenuItem = new Phaser.Class({
        Extends: Phaser.GameObjects.Text,
    
        initialize:
    
        function MenuItem(x, y, text, scene) {
            Phaser.GameObjects.Text.call(this, scene, x, y, text, { color: "#ffffff", align: "left", fontSize: 15});
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
        },
        confirm: function() {
            this.scene.events.emit("SelectEnemies");
        }
    
    });
    
    var EnemiesMenu = new Phaser.Class({
        Extends: Menu,
    
        initialize:
    
        function EnemiesMenu(x, y, scene) {
            Menu.call(this, x, y, scene);
        },
        confirm: function() {
            this.scene.events.emit("Enemy", this.menuItemIndex);
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
    
            // background for enemy menu
            this.graphics.strokeRect(2, 238, 310, 100);
            this.graphics.fillRect(2, 238, 310, 100);
    
            // background for action menu
            this.graphics.strokeRect(315, 238, 103, 100);
            this.graphics.fillRect(315, 238, 103, 100);
    
            // background for hero menu
            this.graphics.strokeRect(248, 185, 170, 50);
            this.graphics.fillRect(248, 185, 170, 50);
    
            // basic container to hold all menus
            this.menus = this.add.container();
    
            // offset the actual text menu by 3
            this.heroesMenu = new HeroesMenu(250, 187, this);
            this.actionsMenu = new ActionsMenu(318, 241, this);
            this.enemiesMenu = new EnemiesMenu(5, 241, this);
    
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
    
            this.message = new Message(this, this.battleScene.events);
            this.add.existing(this.message);
    
            this.battleScene.nextTurn();
        },
        onEnemy: function(index) {
            this.heroesMenu.deselect();
            this.actionsMenu.deselect();
            this.enemiesMenu.deselect();
            this.currentMenu = null;
            this.battleScene.receivePlayerSelection("attack", index);
        },
        onPlayerSelect: function(id) {
            this.heroesMenu.select(id);
            this.actionsMenu.select(0);
            this.currentMenu = this.actionsMenu;
        },
        onSelectEnemies: function() {
            this.currentMenu = this.enemiesMenu;
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
        function Message(scene, events) {
            Phaser.GameObjects.Container.call(this, scene, 160, 30);
            var graphics = this.scene.add.graphics();
            this.add(graphics);
            graphics.lineStyle(1, 0xffffff, 0.8);
            graphics.fillStyle(0x031f4c, 0.3);
            graphics.strokeRect(-110, -15, 220, 40);
            graphics.fillRect(-110, -15, 220, 40);
            this.text = new Phaser.GameObjects.Text(scene, 0, 0, "", { color: "#ffffff", align: "center", fontSize: 13, wordWrap: { width: 220, useAdvancedWrap: true }});
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
    width: 640,
    height: 640,
    // zoom: 2,
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
        BattleScene,
        UIScene,
        MenuScene
    ]
};
var game = new Phaser.Game(config);