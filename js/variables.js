export const scoreEl = document.querySelector('#scoreEl');
export const canvas = document.querySelector('canvas');
export const context = canvas.getContext('2d');
export const playButton = document.querySelector('#playButton');
export const modalEl = document.querySelector('#modalEl')
export const mutedButton = document.querySelector('#mutedButton');
export const pauseButton = document.querySelector('#pauseButton');
export const background = document.querySelector('#block');


export const SCALE_MONSTER = 0.05;
export const SCALE_AIRPLANE = 0.10;
export const CANVAS_WIDTH = 1280;
export const CANVAS_HEIGHT = 720;
export const VELOCITY_AIRPLANE_X = 10;
export const ROTATION_AIRPLANE = 0.15;
export const VELOCITY_AIRPLANE_PROJECTILE = 20;
export const VELOCITY_MONSTER_PROJECTILE = 10;
export const RADIUS_AIRPLANE_PROJECTILE = 3;
export const MONSTER_PROJECTILE_WIDTH = 3;
export const MONSTER_PROJECTILE_HEIGHT = 6;
export const INTERVAL_MONSTER = 60;
export const VELOCITY_MONSTER_X = 5;
export const VELOCITY_MONSTER_Y = 0.1;
export const MONSTER_WIDTH = 26;
export const MUSIC = new Audio('./audio/music.wav');
export const MUSIC_LOSE = new Audio('./audio/lose.wav');
export let MUTED_AUDIO_SHOOTING = false;
export const AIRPLANE_RELOAD_TIME = 100;
