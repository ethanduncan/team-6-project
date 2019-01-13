var ms = new Phaser.Class({

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
            this.scene.start("InfoScene");
            //this.scene.start("BossScene");
        }
    }
});

export { ms };
