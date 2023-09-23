import {
    context,
    MONSTER_PROJECTILE_HEIGHT,
    MONSTER_PROJECTILE_WIDTH,
} from "./variables.js";
export class MonsterShooting {
    constructor({position, velocity}) {
        this.position = position;
        this.velosity = velocity;

        this.width = MONSTER_PROJECTILE_WIDTH;
        this.height = MONSTER_PROJECTILE_HEIGHT;
    }

    draw() {
        context.fillStyle = 'white';
        context.fillRect(this.position.x, this.position.y, this.width, this.height);
    }

    update() {
        this.draw();
        this.position.x += this.velosity.x;
        this.position.y += this.velosity.y;
    }
}