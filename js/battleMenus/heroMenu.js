import Menu from './battleMenu.js'

class HeroesMenu extends Menu {

    HeroesMenu (x, y, scene) {
        Menu.call(this, x, y, scene);
    }
}

export default HeroesMenu;
