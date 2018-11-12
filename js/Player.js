export default class Player extends Phaser.GameObjects.Sprite {
    constructor(game) {
        super(game,176,48,'player');

        game.physics.world.enable(this);
        game.add.existing(this);

        this.acceleration = 600;

        this.leversPulled = 4;
    }

    update() {

    }
}