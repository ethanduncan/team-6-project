class MenuScene extends Phaser.Scene {
    
constructor() {
    super({key: "MenuScene"});
    this.menuNumber = -1;
}
// load asset files for our game
preload () {
 
  // load images
  this.load.image('background', 'assets/background.png');
  this.load.image('start', 'assets/play.png');
  this.load.image('battle', 'assets/battle2.png');  
  this.load.image('logo', 'assets/logo.png');
};

create () {
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
};

update () {
    if(this.menuNumber===0){
        this.scene.start("LevelOneScene");
    }else if(this.menuNumber===1){
        this.openWindow();
    }
};

openWindow() {
    //temp until battle code can be properly decoupled.
    var result = window.open('http://turn-based.s3-website.eu-west-2.amazonaws.com/',"_self");
    this.menuNumber = -1;
  };
}

export default MenuScene;
