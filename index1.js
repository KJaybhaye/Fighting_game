const canvas = document.querySelector("canvas")
const cst = canvas.getContext("2d")

const playerHealth = document.getElementById("health1");
const enemyHealth = document.getElementById("health2");

const SPRITE_HEIGHT = 150;
const SPRITE_WIDTH = 50;

const GRAVITY = 9.8;

var time = 25;

// const hell = document.querySelector("p");
// hell.style.color = "red";

canvas.width = 1024;
canvas.height = 576;

cst.fillStyle = "skyblue";
cst.fillRect(0,0,canvas.width, canvas.height);

class Sprite{
    constructor({position, velocity, color, offset}){
        this.position = position;
        this.velocity = velocity;
        this.lastKey;
        this.height = 150;
        this.width = 50;
        this.color = color;
        this.health = 100;
        this.offset = offset;
        this.isAttacking = false;
        this.attack_box = {
            x: position.x + offset.x, 
            y: position.y + offset.y, 
            w: 80, 
            h: 40};
        
    }

    draw(){
        cst.fillStyle = this.color;
        cst.fillRect(this.position.x, this.position.y, this.width, this.height);
        if (this.isAttacking){
            cst.fillRect(this.attack_box.x , this.attack_box.y, 
            this.attack_box.w, this.attack_box.h)
        }
    }

    update(){
        this.attack_box.x = this.position.x + this.offset.x;
        this.attack_box.y = this.position.y + this.offset.y;
        this.draw(this.color);
        this.position.x += this.velocity.x;
        this.velocity.y = gravity(this.velocity.y);
        this.position.y += this.velocity.y;
        if(this.position.x >= canvas.width - this.width){
            this.position.x = canvas.width - this.width;
        }
        else if(this.position.x <0){
            this.position.x = 0;
        }
        if(this.position.y >= canvas.height - this.height){
            this.position.y = canvas.height - this.height;
            this.velocity.y = 0;
        }
        else if(this.position.y < 0){
            this.position.y = 0;
            this.velocity.y = 0;
        }
    }

    attack(){
        this.isAttacking = true;
        setTimeout(() => {
            this.isAttacking = false;
        }, 5);
    }
}

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

player.draw("black");
enemy.draw("red");

console.log(player);
console.log(enemy);

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

function gravity(vel){
    return vel + GRAVITY * 0.1;
}

function hit(player1, player2){
    let x = false;
    let y = false;
    if(player1.attack_box.x + player1.attack_box.w >= player2.position.x &&
       player1.attack_box.x  <= player2.position.x + player2.width){
        x = true;
    }
    if(player1.attack_box.y + player1.attack_box.h >= player2.position.y &&
        player1.attack_box.y  <= player2.position.y + player2.height){
         y = true;
    }
    if(player1.isAttacking && x && y){
        return true;
    }
    return false;
}
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
// document.getElementById("timer").innerHTML = time;
var timeId;
function decreaseTime(){
    timeId = setTimeout(decreaseTime, 1000);
    if(time > 0){
        time--;
        document.getElementById("timer").innerHTML = time; 
    }
    if(time == 0){
        document.getElementById("wintext").innerHTML = winner(player, enemy, timeId);
        document.getElementById("wintext").style.display = "flex";
    }
}

function winner(player, enemy, timeid){
    clearInterval(timeid);
    if(player.health === enemy.health){
        return "Tie!";
    } else if(player.health > enemy.health){
        return "Player-1 wins!";
    } else{
        return "Player-2 wins!";
    }
}
decreaseTime();