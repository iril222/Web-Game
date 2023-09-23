import {canvas, context, SCALE_AIRPLANE} from "./variables.js";

export class Airplane {
    constructor() {
        this.velocity = {
            x: 0,
            y: 0,
        }

        this.rotation = 0;
        this.opacity = 1;

        const image = new Image();
        image.src = './img/airplane0.png';
        image.onload = () => {

            this.image = image;
            this.width = image.width * SCALE_AIRPLANE;
            this.height = image.height * SCALE_AIRPLANE;
            this.position = {
                x: canvas.width / 2 - this.width / 2,
                y: canvas.height - this.height - 20,
            }

        }


    }

    draw() {
        context.save();
        context.globalAlpha = this.opacity;
        context.translate(
            this.position.x + this.width / 2,
            this.position.y + this.height / 2
        );
        context.rotate(this.rotation);

        context.translate(
            -this.position.x - this.width / 2,
            -this.position.y - this.height / 2
        );

        context.drawImage(
            this.image,
            this.position.x,
            this.position.y,
            this.width,
            this.height
        );
        context.restore();
    }

    update() {
        if (this.image) {
            this.draw();
            this.position.x += this.velocity.x;
        }
    }
}