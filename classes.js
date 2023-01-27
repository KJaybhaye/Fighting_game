// import gravity from "./utils.js"

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
