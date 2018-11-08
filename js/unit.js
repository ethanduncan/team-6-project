// base class for heroes and enemies
class Unit extends Phaser.GameObjects.Sprite {


    Unit (scene, x, y, texture, frame, type, hp, damage, specialDamage) {
        Phaser.GameObjects.Sprite.call(this, scene, x, y, texture, frame)
        this.type = type;
        this.maxHp = this.hp = hp;
        this.damage = damage; // default damage
        this.specialDamage = specialDamage; //special attack damage
        this.alive = true;
    }

    attack (target) {
        target.takeDamage(this.damage);
        this.scene.events.emit("Message", this.type + " attacks " + target.type + " for " + this.damage + " damage");
    }

    takeDamage (damage) {
        this.hp -= damage;
        if(this.hp <= 0) {
            this.hp = 0;
            this.scene.events.emit("Message", this.type + "has died!");
            this.alive = false;
            this.destroy();
        }
    }

    special (target) {
        target.takeDamage(this.specialDamage);
        this.scene.events.emit("Message", this.type + " special attacks " + target.type + " for " + this.specialDamage + " damage")
    }
}

export default Unit;
