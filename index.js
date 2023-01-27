// import Sprite from "./classes.js";
// import {hit, decreaseTime, winner} from "./utils.js"

const canvas = document.querySelector("canvas")
const cst = canvas.getContext("2d")

const playerHealth = document.getElementById("health1");
const enemyHealth = document.getElementById("health2");

const SPRITE_HEIGHT = 150;
const SPRITE_WIDTH = 50;

canvas.width = 1024;
canvas.height = 576;

cst.fillStyle = "skyblue";
cst.fillRect(0,0,canvas.width, canvas.height);

const player = new Sprite({
    position: {x: 100, y:200},
    velocity: {x: 0, y: -19.6},
    color: "green",
    offset: {x: 50, y: 50}
});
const enemy = new Sprite({
    position: {x: canvas.width - (100 + SPRITE_WIDTH), y: 200},
    velocity: {x: 0, y: -19.6},
    color: "red",
    offset: {x: -80, y: 50}
});

// player.draw("black");
// enemy.draw("red");

// console.log(player);
// console.log(enemy);

const pressed = {
    aR: false,
    aL: false,
    a: false,
    d: false
}

function anime(){
    window.requestAnimationFrame(anime);
    cst.fillStyle = "skyblue";
    cst.fillRect(0,0,canvas.width, canvas.height);
    player.update();
    enemy.update();

    player.velocity.x = 0;
    enemy.velocity.x = 0;
    if(pressed.d && player.lastKey == "d"){
        player.velocity.x += 6;
    }else if(pressed.a && player.lastKey == "a"){
        player.velocity.x -= 6;
    }
    if(pressed.aR && enemy.lastKey == "aR"){
        enemy.velocity.x += 6;
    }else if(pressed.aL && enemy.lastKey == "aL"){
        enemy.velocity.x -= 6;
    }

    if(hit(player, enemy)){
        enemy.health -= 5;
        player.isAttacking = false;
        console.log("enemy hit");
        console.log(enemy.health);
        document.getElementById("health2").style.width = `${enemy.health}%`;
    }
    if(hit(enemy, player)){
        player.health -= 5;
        enemy.isAttacking = false;
        console.log("player hit");
        console.log(player.health);
        document.getElementById("health1").style.width = `${player.health}%`;
    }
    if(player.health <= 0|| enemy.health <= 0){
        document.getElementById("wintext").innerHTML = winner(player, enemy, timeId);
        document.getElementById("wintext").style.display = "flex";
    }

};
anime();

document.addEventListener("keydown", (event) => {
    console.log(event);
    switch(event.key){
        case "ArrowUp":
            if(enemy.velocity.y == 0){
                enemy.velocity.y = -25;
            }
            break;
        case "s":
            if(player.velocity.y == 0){
                player.velocity.y = -25;
            }
            break;
        case "ArrowRight":
            pressed.aR = true;
            enemy.lastKey = "aR";
            break;
        case "ArrowLeft":
            pressed.aL = true;
            enemy.lastKey = "aL";
            break;
        case "ArrowDown":
            enemy.attack();
            break;
        case "a":
            pressed.a = true;
            player.lastKey = "a";
            break;
        case "d":
            pressed.d = true;
            player.lastKey = "d";
            break;
        case "f":
            player.attack();
            break;
        default:
            break;
    }
})

document.addEventListener("keyup", (event) => {
    switch(event.key){
        case "ArrowRight":
            pressed.aR = false;
            break;
        case "ArrowLeft":
            pressed.aL = false;
            break;
        case "a":
            pressed.a = false;
            break;
        case "d":
            pressed.d = false;
            break;
        default:
            break;
    }
}
)

decreaseTime();