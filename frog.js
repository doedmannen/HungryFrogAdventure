class frog{

  constructor(){
    this.r = itemScale*0.8;
    this.x = this.r+windowWidth*0.1;
    this.y = windowHeight/2-rectH/2;
    this.speed = playerMoveSpeed;
    this.explodeX = 0;
    this.explodeY = 0;
    this.lastP = 0;
    this.lastPC = 0;
    this.rocket = 0;
    this.rocketSpeed = 1;
    this.rocketTimer = 0;

  }

  show(){

    if(game){
      if(this.rocketTimer > 0){
        this.rocketTimer--;
        if(this.rocketTimer % 20 == 0){
          score += 10;
        }
        if(this.rocketTimer == 0){
          this.rocketSpeed = 1;
        }
      }
      if(this.rocketTimer > 0){
        image(i_frogboost, this.x-this.r*3, this.y-this.r, this.r*4, this.r*2);
      } else {
        image(i_frog, this.x-this.r, this.y-this.r, this.r*2, this.r*2);
      }
      if(this.lastPC > 0){
        textSize(smallText);
        fill(255);
        stroke(0);
        strokeWeight(smallText/10);
        text(this.lastP, width/2, height/2-rectH);
        this.lastPC--;
      }
    }

  }

  move(){
    if(this.y-this.r > rectH*0.2 && this.y+this.r < windowHeight-rectH){
      this.y += moveDir*this.speed*levelSpeedPlayer*this.rocketSpeed;
      if(this.y-this.r <= rectH*0.2){
        this.y = rectH*0.2+this.r+1;
      } else if(this.y+this.r >= windowHeight-rectH){
        this.y = windowHeight-rectH-this.r-1;
      }
      if(!mobile && moveDir != 0){
          moveDir = 0;
      }
    }
  }

}
