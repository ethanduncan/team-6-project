import Unit from './unit.js'

class Enemy extends Unit {

    Enemy (scene, x, y, texture, frame, type, hp, damage, specialDamage) {
        Unit.call(this, scene, x, y, texture, frame, type, hp, damage, specialDamage);

        this.flipX = true;

        this.setScale(4);
    }
}

export default Enemy;
