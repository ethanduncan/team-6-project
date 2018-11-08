import Menu from './battleMenu.js'

class ActionsMenu extends Menu {

    ActionsMenu (x, y, scene) {
        Menu.call(this, x, y, scene);
        this.addMenuItem("Attack");
        this.addMenuItem("Special");
    }

    confirm () {
        this.scene.events.emit("SelectEnemies");
    }
}

export default ActionsMenu;
