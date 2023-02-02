const GRAVITY = 9.8;
var time = 60;

function gravity(vel){
    return vel + GRAVITY * 0.1;
}
var timeId;

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
