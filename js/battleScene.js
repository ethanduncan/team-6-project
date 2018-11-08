import PlayerCharacter from './playerCharacter.js';
import Enemy from './enemy.js';
import HeroesMenu from './battleMenus/heroMenu.js';
import ActionsMenu from './battleMenus/actionsMenu.js';
import EnemiesMenu from './battleMenus/enemyMenu.js';

class BattleScene extends Phaser.Scene {

    constructor () {
        super({key: "BattleScene"});
    }

    preload () {
        // load resources
        this.load.spritesheet("player", "assets_battle/RPG_assets.png", { frameWidth: 16, frameHeight: 16 });
        this.load.image("dragonblue", "assets_battle/dragonblue.png");
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

        // array with character
        this.heroes = [ warrior ];
        // array with enemies
        this.enemies = [ dragonblue ];
        // array with both parties, who will attack
        this.units = this.heroes.concat(this.enemies);

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

        this.remapHeroes();
        this.remapEnemies();

        this.input.keyboard.on("keydown", this.onKeyInput, this);

        this.battleScene.events.on("PlayerSelect", this.onPlayerSelect, this);

        this.events.on("SelectEnemies", this.onSelectEnemies, this);

        this.events.on("Enemy", this.onEnemy, this);

        this.message = new Message(this, this.battleScene.events);
        this.add.existing(this.message);

        this.battleScene.nextTurn();

        this.index = -1;
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

        onEnemy (index) {
        this.heroesMenu.deselect();
        this.actionsMenu.deselect();
        this.enemiesMenu.deselect();
        this.currentMenu = null;
        this.battleScene.receivePlayerSelection("attack", index);
    }

    onPlayerSelect (id) {
        this.heroesMenu.select(id);
        this.actionsMenu.select(0);
        this.currentMenu = this.actionsMenu;
    }

    onSelectEnemies () {
        this.currentMenu = this.enemiesMenu;
        this.enemiesMenu.select(0);
    }

    remapHeroes () {
        var heroes = this.battleScene.heroes;
        this.heroesMenu.remap(heroes);
    }

    remapEnemies () {
        var enemies = this.battleScene.enemies;
        this.enemiesMenu.remap(enemies);
    }

    onKeyInput (event) {
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
    }

}

export default BattleScene;
