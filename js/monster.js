import {
    context,
    SCALE_MONSTER,
    VELOCITY_MONSTER_PROJECTILE,
} from "./variables.js";
import { MonsterShooting } from "./monsterShooting.js";
export class Monster {
    constructor({position}) {
        this.velocity = {
            x: 0,
            y: 0
        }

        const image = new Image();
        image.src = './img/monster1.png';
        image.onload = () => {
            this.image = image;
            this.width = image.width * SCALE_MONSTER;
            this.height = image.height * SCALE_MONSTER;
            this.position = {
                x: position.x,
                y: position.y
            }
        }
    }

    draw() {
        context.drawImage(
            this.image,
            this.position.x,
            this.position.y,
            this.width,
            this.height
        );
    }

    update({velocity}) {
        if (this.image) {
            this.draw();
            this.position.x += velocity.x;
            this.position.y += velocity.y;
        }
    }

    shoot(monsterShooting) {
        monsterShooting.push(new MonsterShooting({
            position: {
                x: this.position.x + this.width / 2,
                y: this.position.y + this.height
            },
            velocity: {
                x: 0,
                y: VELOCITY_MONSTER_PROJECTILE
            }
        }))
    }
}