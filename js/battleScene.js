import PlayerCharacter from './playerCharacter.js';
import Enemy from './enemy.js';
import UIScene from './uiScene.js';
import Message from './message.js';

let uiScene = new UIScene();

class BattleScene extends Phaser.Scene {

    constructor () {
        super({key: "BattleScene"});
    }

    preload () {
        // load resources
        this.load.spritesheet("player", "assets_battle/RPG_assets.png", { frameWidth: 16, frameHeight: 16 });
        this.load.image("dragonblue", "assets_battle/dragonblue.png");
        this.load.image('start', 'assets/play.png');
        this.load.image('battle', 'assets/battle2.png');
    };

    create () {
        // change the background to green
        this.cameras.main.setBackgroundColor("rgba(0, 200, 0, 0.5)");

        // player character - warrior
        //scene, x, y, texture, frame, type, hp, damage, specialDamage
        var warrior = new PlayerCharacter(this, 50, 150, "player", 1, "Thorvik", 100, 35, 100);
        this.add.existing(warrior);

        var dragonblue = new Enemy(this, 350, 70, "dragonblue", 2, "Blue Dragon", 80, 13, 10);
        this.add.existing(dragonblue);

        // array with character
        this.heroes = [ warrior ];
        // array with enemies
        this.enemies = [ dragonblue ];
        // array with both parties, who will attack
        this.units = this.heroes.concat(this.enemies);

        // Run UI Scene at the same time
        this.scene.add('UIScene', uiScene);
        this.scene.start("UIScene");
        this.index = -1;
    };

    update () {
        if(this.menuNumber===0){
            this.scene.start("LevelOneScene");
        }else if(this.menuNumber===1){
            this.openWindow();
        }
    };

    nextTurn () {
        this.index++;
        // if there are no more units, we start again from the first one
        if(this.index >= this.units.length) {
            this.index = 0;
        }
        if(this.units[this.index]) {
            if(this.units[this.index].alive) {
                // if its player hero
                if(this.units[this.index] instanceof PlayerCharacter) {
                    start.on("pointerdown",  () => {
                        this.menuNumber = 0;
                    });
                } else { // else if it's an enemy unit
                    // pick random hero
                    var r = Math.floor(Math.random() * this.heroes.length);
                    // call the enemy"s attack function
                    this.units[this.index].attack(this.heroes[r]);
                    // add timer for the next turn, so will have smooth gameplay
                    this.time.addEvent({ delay: 3000, callback: this.nextTurn, callbackScope: this });
                }
            } else {
                this.scene.start("WinScene");
                //this.time.addEvent({ callback: this.nextTurn, callbackScope: this });
            }
        }
    };

    // when the player have selected the enemy to be attacked
    receivePlayerSelection (action, target) {
        if(action == "attack") {
            this.units[this.index].attack(this.enemies[target]);
        }
        if(action == "special") {
            this.units[this.index].special(this.enemies[target]);
        }
        // next turn in 3 seconds
        this.time.addEvent({ delay: 3000, callback: this.nextTurn, callbackScope: this });
    };
}

export default BattleScene;
