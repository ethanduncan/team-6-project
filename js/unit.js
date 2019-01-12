var unit = new Phaser.Class({
    Extends: Phaser.GameObjects.Sprite,

    initialize:

    function Unit(scene, x, y, texture, frame, type, hp, damage, specialDamage, specialCharge, hpx, hpy) {
        Phaser.GameObjects.Sprite.call(this, scene, x, y, texture, frame)
        this.type = type;
        this.hp = new HealthBar(scene, hpx, hpy);
        this.damage = damage; // default damage
        this.specialDamage = specialDamage; //special attack damage
        this.alive = true;
        this.specialCharge = specialCharge;
        this.specialCooldown = specialCharge;
    },
    attack: function(target) {
        target.takeDamage(this.damage);
        this.chargeSpecial();
        this.scene.events.emit("Message", this.type + " attacks " + target.type + " for " + this.damage + " damage");
    },
    special: function(target) {
        if(this.specialCharge == 0) {
            target.takeDamage(this.specialDamage);
            this.specialCharge = this.specialCooldown;
            this.scene.events.emit("Message", this.type + " special attacks " + target.type + " for " + this.specialDamage + " damage");
        } else {
            this.scene.events.emit("Message", "Special attack isn't ready. Attack " + this.specialCharge + " more times.");
        }
    },
    takeDamage: function(damage) {

        if(this.hp.decrease(damage)) {
            this.hp = 0;
            this.alive = false;
            this.destroy();
        }
    },
    heal: function(target) {
        this.hp.increase(25, this.maxHp);
        this.scene.events.emit("Message", this.type + " heals 25 hp");
    },
    chargeSpecial: function() {
        this.specialCharge -= 1;
        if(this.specialCharge < 0) {
            this.specialCharge = 0;
        }
    }
});

    var Menu = new Phaser.Class({
        Extends: Phaser.GameObjects.Container,

        initialize:

        function Menu(x, y, scene, heroes) {
            Phaser.GameObjects.Container.call(this, scene, x, y);
            this.menuItems = [];
            this.menuItemIndex = 0;
            this.heroes = heroes;
            this.x = x;
            this.y = y;
            // scene.cameras.main.setZoom(2);
        },
        addMenuItem: function(unit) {
            var menuItem = new MenuItem(0, this.menuItems.length * 20, unit, this.scene);
            this.menuItems.push(menuItem);
            this.add(menuItem);
        },
        moveSelectionUp: function() {
            this.menuItems[this.menuItemIndex].deselect();
            this.menuItemIndex--;
            if(this.menuItemIndex < 0)
                this.menuItemIndex = this.menuItems.length - 1;
            this.menuItems[this.menuItemIndex].select();
        },
        moveSelectionDown: function() {
            this.menuItems[this.menuItemIndex].deselect();
            this.menuItemIndex++;
            if(this.menuItemIndex >= this.menuItems.length)
                this.menuItemIndex = 0;
            this.menuItems[this.menuItemIndex].select();
        },
        // select the menu as a whole and an element with index from it
        select: function(index) {
            if(!index)
                index = 0;
            this.menuItems[this.menuItemIndex].deselect();
            this.menuItemIndex = index;
            this.menuItems[this.menuItemIndex].select();
        },
        // deselect this menu
        deselect: function() {
            this.menuItems[this.menuItemIndex].deselect();
            this.menuItemIndex = 0;
        },
        confirm: function() {
            // when the player confirms his selection, do the action
        },
        clear: function() {
            for(var i = 0; i < this.menuItems.length; i++) {
                this.menuItems[i].destroy();
            }
            this.menuItems.length = 0;
            this.menuItemIndex = 0;
        },
        remap: function(units) {
            this.clear();
            for(var i = 0; i < units.length; i++) {
                var unit = units[i];
                this.addMenuItem(unit.type);
            }
    },
    takeDamage: function(damage) {

        if(this.hp.decrease(damage)) {
            this.hp = 0;
            this.alive = false;
            this.destroy();
        }
    },
    heal: function(target) {
        this.hp.increase(25, 100);
        this.scene.events.emit("Message", this.type + " heals 25 hp");
    },
    chargeSpecial: function() {
        this.specialCharge -= 1;
        if(this.specialCharge < 0) {
            this.specialCharge = 0;
        }
    }
});

export { unit };