import {Monster} from "./monster.js";
import { CANVAS_WIDTH, INTERVAL_MONSTER, VELOCITY_MONSTER_X, VELOCITY_MONSTER_Y } from "./variables.js";
import {SecondMonster} from "./secondMonster.js";
export class CreatingMonster {
    constructor() {
        this.position = {
            x: 0,
            y: 0
        }

        this.velocity = {
            x: VELOCITY_MONSTER_X,
            y: VELOCITY_MONSTER_Y
        }

        this.monsters = [];

        let randLevel = Math.round(Math.random());

        if (randLevel === 0) {
            const rows1 = Math.floor(Math.random() * 5 + 2)
            const columns1 = Math.floor(Math.random() * 5 + 2)

            this.width = (columns1 - 1) * INTERVAL_MONSTER;

            for (let i = 0; i < columns1; i++) {
                for (let j = 0; j < rows1; j++) {
                    this.monsters.push(
                        new Monster({
                            position: {
                                x: i * INTERVAL_MONSTER,
                                y: j * INTERVAL_MONSTER
                            }
                        }));
                }
            }
        }
        if (randLevel === 1) {
            const rows2 = Math.floor(Math.random() * 5 + 2)
            const columns2 = Math.floor(Math.random() * 5 + 2)

            this.width = (columns2 - 1) * INTERVAL_MONSTER;

            for (let i = 0; i < columns2; i++) {
                for (let j = 0; j < rows2; j++) {
                    this.monsters.push(
                        new SecondMonster({
                            position: {
                                x: i * INTERVAL_MONSTER,
                                y: j * INTERVAL_MONSTER
                            }
                        }));
                }
            }
        }
    }

    update() {
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;

        if (this.position.x + this.width >= CANVAS_WIDTH || this.position.x <= 0) {
            this.velocity.x = -this.velocity.x;
        }
    }
}