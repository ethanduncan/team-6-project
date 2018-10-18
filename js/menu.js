class MenuScene extends Phaser.Scene {
    
constructor() {
    super({key: "MenuScene"});
    this.menuNumber = -1;
}
// load asset files for our game
preload () {
 
  // load images
  this.load.image('background', 'assets/background.png');
  this.load.image('start', 'assets/start.png');
};

 
// executed once, after assets were loaded
create () {
    this.add.image(640, 320, "background");

    var start = this.add.image(350, 200, "start").setScale(0.5);
    start.setInteractive();
    start.on("pointerdown",  () => {
        this.menuNumber = 0;
    });
}

update () {
    if(this.menuNumber===0){
        this.scene.start("LevelOneScene");
    }
}
}
export default MenuScene;
