import {context, RADIUS_AIRPLANE_PROJECTILE} from "./variables.js";
export class Shooting {
    constructor({position, velocity}) {
        this.position = position;
        this.velocity = velocity;

        this.radius = RADIUS_AIRPLANE_PROJECTILE;
    }

    draw() {
        context.beginPath();
        context.arc(
            this.position.x,
            this.position.y,
            this.radius,
            0,
            Math.PI * 2
        );
        context.fillStyle = 'red';
        context.fill();
        context.closePath();
    }

    update() {
        this.draw();
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
    }
}