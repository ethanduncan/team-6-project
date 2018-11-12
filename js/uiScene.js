import HeroesMenu from './battleMenus/heroMenu.js';
//import EnemiesMenu from './battleMenus/enemyMenu.js';
//import ActionsMenu from './battleMenus/actionsMenu.js';

class UIScene extends Phaser.Scene {

    constructor () {
        super({key: "UIScene"});
    }

    create () {
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
    }

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

export default UIScene;
