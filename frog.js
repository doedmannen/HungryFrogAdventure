class frog{

  constructor(){
    this.r = itemScale*0.8;
    this.x = this.r+windowWidth*0.1;
    this.y = windowHeight/2-rectH/2;
    this.speed = playerMoveSpeed;
    this.explodeX = 0;
    this.explodeY = 0;

  }

  show(){
    image(i_frog, this.x-this.r, this.y-this.r, this.r*2, this.r*2);
    if(!game){
      image(i_explode, this.explodeX-itemScale, this.explodeY-itemScale, itemScale*5, itemScale*5);
      image(i_frogdead, this.x-this.r, this.y-this.r, this.r*2, this.r*2);
    }
  }

  move(){
    if(this.y-this.r > rectH*0.2 && this.y+this.r < windowHeight-rectH){
      this.y += moveDir*this.speed*levelSpeedPlayer;
      if(this.y-this.r <= rectH*0.2){
        this.y = rectH*0.2+this.r+1;
      } else if(this.y+this.r >= windowHeight-rectH){
        this.y = windowHeight-rectH-this.r-1;
      }
      if(moveDir != 0){
        moveDir = 0;
      }
    }
  }

}
