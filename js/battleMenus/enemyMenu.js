import Menu from './battleMenu.js'

class EnemiesMenu extends Menu {

    EnemiesMenu (x, y, scene) {
        //Menu.call(x, y, scene);
    }

    confirm () {
        this.scene.events.emit("Enemy", this.menuItemIndex);
    }
}

export default EnemiesMenu;
