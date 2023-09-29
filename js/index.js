import {Airplane} from './airplane.js'
import {Shooting} from './shooting.js'
import {Explosion} from './explosion.js'
import {CreatingMonster} from "./creatingMonster.js";
import {
    canvas,
    scoreEl,
    context,
    CANVAS_HEIGHT,
    CANVAS_WIDTH,
    ROTATION_AIRPLANE,
    VELOCITY_AIRPLANE_X,
    VELOCITY_AIRPLANE_PROJECTILE,
    playButton,
    modalEl,
    MUSIC,
    MUTED_AUDIO_SHOOTING,
    mutedButton,
    MUSIC_LOSE,
    background,
    AIRPLANE_RELOAD_TIME,
    pauseButton
} from "./variables.js";


canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;

let VOLUME = 0.5;

let airplane = new Airplane();
let projectiles = [];
let groupMonsters = [new CreatingMonster()];
let monsterProjectiles = [];
let particles = [];

let keys = {
    a: {
        pressed: false
    },
    d: {
        pressed: false
    },
    space: {
        pressed: false
    }
}

let frames = 1;
let randomInterval = Math.floor((Math.random() * 500) + 200);
let game = {
    over: false,
    active: true,
    pause: false,
}
let score = 0;

function init() {
    airplane = new Airplane();
    projectiles = [];
    groupMonsters = [new CreatingMonster()];
    monsterProjectiles = [];
    particles = [];

    keys = {
        a: {
            pressed: false
        },
        d: {
            pressed: false
        },
        space: {
            pressed: false
        }
    }

    frames = 1;
    randomInterval = Math.floor((Math.random() * 500) + 200);
    game = {
        over: false,
        active: true,
        pause: false,
    }
    score = 0;
    scoreEl.innerHTML = score;

    for (let i = 0; i < 100; i++) {
        particles.push(new Explosion({
            position: {
                x: Math.random() * CANVAS_WIDTH,
                y: Math.random() * CANVAS_HEIGHT
            },
            velocity: {
                x: 0,
                y: 1
            },
            radius: Math.random(),
            color: 'white'
        }))
    }
}


function audioShooting() {
        let AUDIO_SHOOTING = new Audio('./audio/shootingAirplane.wav');
        AUDIO_SHOOTING.play();
        AUDIO_SHOOTING.volume = VOLUME;

}

function audioHit() {
    let HIT = new Audio('./audio/hit.wav');
    HIT.play();
    HIT.volume = VOLUME;
}


function createParticles({object, color, fades}) {
    for (let i = 0; i < 15; i++) {
        particles.push(new Explosion({
            position: {
                x: object.position.x + object.width / 2,
                y: object.position.y + object.height / 2
            },
            velocity: {
                x: (Math.random() - 0.5) * 2,
                y: (Math.random() - 0.5) * 2
            },
            radius: Math.random(),
            color: color || 'yellow',
            fades: true
        }))
    }
}

// animate
function animate() {
    if (game.active && !game.pause) {
        requestAnimationFrame(animate)
        context.fillStyle = 'black';
        context.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        airplane.update();
        particles.forEach((particle, i) => {
            if (particle.position.y - particle.radius >= CANVAS_HEIGHT) {
                particle.position.x = Math.random() * CANVAS_WIDTH;
                particle.position.y = -particle.radius;
            }

            if (particle.opacity <= 0) {
                setTimeout(() => {
                    particles.splice(i, 1);
                }, 0);
            } else {
                particle.update();
            }
        });
        monsterProjectiles.forEach((monsterProjectile, index) => {
            if (monsterProjectile.position.y + monsterProjectile.height >= CANVAS_HEIGHT) {
                setTimeout(() => {
                    monsterProjectiles.splice(index, 1)
                }, 0)
            } else {
                monsterProjectile.update();
            }

            // monster hit airplane
            if (monsterProjectile.position.y + monsterProjectile.height >= airplane.position.y &&
                monsterProjectile.position.x + monsterProjectile.width >= airplane.position.x &&
                monsterProjectile.position.x <= airplane.position.x + airplane.width
            ) {
                setTimeout(() => {
                    monsterProjectiles.splice(index, 1);
                    airplane.opacity = 0;
                    game.over = true;
                    MUSIC_LOSE.volume = VOLUME;
                    MUSIC_LOSE.play();
                }, 0)

                setTimeout(() => {
                    game.active = false;
                }, 2000)

                createParticles({
                    object: airplane,
                    color: 'white',
                    fades: true,
                });
            }

            monsterProjectile.update();
        })

        // airplane hit monster
        projectiles.forEach((projectile, index) => {
            if (projectile.position.y + projectile.radius <= 0) {
                setTimeout(() => {
                    projectiles.splice(index, 1);
                }, 0)
            } else {
                projectile.update();
            }
        });

        groupMonsters.forEach((groupMonster, groupMonsterIndex) => {
            groupMonster.update();

            if (frames % 100 === 0 && groupMonster.monsters.length > 0) {
                groupMonster.monsters[Math.floor(Math.random() * groupMonster.monsters.length)].shoot(monsterProjectiles);
            }

            groupMonster.monsters.forEach((monster, i) => {
                monster.update({velocity: groupMonster.velocity});

                projectiles.forEach((projectile, j) => {
                    if (projectile.position.y - projectile.radius <= monster.position.y + monster.height &&
                        projectile.position.x + projectile.radius >= monster.position.x &&
                        projectile.position.x - projectile.radius <= monster.position.x + monster.width &&
                        projectile.position.y + projectile.radius >= monster.position.y
                    ) {
                        setTimeout(() => {
                            const monsterFound = groupMonster.monsters.find((monster2) => monster2 === monster)
                            const projectileFound = projectiles.find((projectile2) => projectile2 === projectile)

                            // remove monster and projectile
                            if (monsterFound && projectileFound) {
                                audioHit();
                                score += 10;
                                scoreEl.innerHTML = score;
                                createParticles({
                                    object: monster,
                                    fades: true,
                                });

                                groupMonster.monsters.splice(i, 1);
                                projectiles.splice(j, 1);

                                if (groupMonster.monsters.length > 0) {
                                    const firstInvader = groupMonster.monsters[0];
                                    const lastInvader = groupMonster.monsters[groupMonster.monsters.length - 1];

                                    groupMonster.width = lastInvader.position.x - firstInvader.position.x + lastInvader.width;
                                    groupMonster.position.x = firstInvader.position.x;
                                } else {
                                    groupMonsters.splice(groupMonsterIndex, 1);
                                }
                            }
                        }, 0)
                    }
                })
            })
        })

        if (keys.a.pressed && airplane.position.x >= 0) {
            airplane.velocity.x = -VELOCITY_AIRPLANE_X;
            airplane.rotation = -ROTATION_AIRPLANE;
        } else if (keys.d.pressed && airplane.position.x + airplane.width <= canvas.width) {
            airplane.velocity.x = VELOCITY_AIRPLANE_X;
            airplane.rotation = ROTATION_AIRPLANE;
        } else {
            airplane.velocity.x = 0;
            airplane.rotation = 0;
        }

        if (frames % randomInterval === 0) {
            groupMonsters.push(new CreatingMonster());
        }

        frames++;

    }
    if (!game.active) {
        modalEl.style.display = 'block';
    }
}


let lastShootTime = 0;

// shooting
function spawnAirplaneProjectile() {
    projectiles.push(new Shooting({
        position: {
            x: airplane.position.x + airplane.width / 2,
            y: airplane.position.y
        },
        velocity: {
            x: 0,
            y: -VELOCITY_AIRPLANE_PROJECTILE
        }
    }))
}

// controller keydown
addEventListener('keydown', ({key}) => {
    if (game.over) {
        return;
    }

    switch (key) {
        case 'a':
            keys.a.pressed = true;
            break;
        case 'd':
            keys.d.pressed = true;
            break;
        case ' ':
            let time = new Date().getTime();
            if (time - lastShootTime < AIRPLANE_RELOAD_TIME) {
                break;
            }
            if (MUTED_AUDIO_SHOOTING === false && !game.pause) {
                audioShooting();
            }

            lastShootTime = time;
            spawnAirplaneProjectile();
            break;
    }
})

// controller keyup
addEventListener('keyup', ({key}) => {
    if (game.over) {
        return;
    }

    switch (key) {
        case 'a':
            keys.a.pressed = false;
            break;
        case 'd':
            keys.d.pressed = false;
            break;
        case ' ':
            let time = new Date().getTime();
            if (time - lastShootTime < AIRPLANE_RELOAD_TIME) {
                break;
            }
            if (MUTED_AUDIO_SHOOTING === false && !game.pause) {
                audioShooting();
            }

            lastShootTime = time;
            spawnAirplaneProjectile();
            break;
    }
})

// mute or unmute
mutedButton.addEventListener('mousedown', () => {

    if (VOLUME === 0.5) {
        mutedButton.textContent = 'Unmute';
        VOLUME = 0.0;
    } else if (VOLUME === 0.0){
        mutedButton.textContent = 'Mute';
        VOLUME = 0.5;
    }


    MUSIC.muted = !MUSIC.muted;
})

// pause or unpause
pauseButton.addEventListener('mousedown', () => {
    game.pause = !game.pause;
    animate();
})

// start game or restart game
playButton.addEventListener('click', () => {
    init();
    game.active = true;
    background.style.background = 'none';
    MUSIC.play();
    MUSIC.loop = true;
    MUSIC.volume = 0.5;
    animate();
    modalEl.style.display = 'none';
})