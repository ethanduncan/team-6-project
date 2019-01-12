var bs = new Phaser.Class({
    
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

export { bs };