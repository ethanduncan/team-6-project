import Unit from './unit.js'

class PlayerCharacter extends Unit {

    PlayerCharacter (scene, x, y, texture, frame, type, hp, damage, specialDamage) {
        Unit.call(this, scene, x, y, texture, frame, type, hp, damage, specialDamage);
        // flip the image so I don"t have to edit it manually

        this.setScale(4);
    }
}

export default PlayerCharacter;
