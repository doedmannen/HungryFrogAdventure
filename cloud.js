class cloud{

  constructor(){
    this.r = itemScale*4;
    this.x = random(0, windowWidth);
    this.y = random(rectH*0.2, windowHeight-rectH-this.r);

  }

  show(){
      image(i_cloud, this.x, this.y, this.r*2, this.r);
  }

  move(){
    this.x -= 2*speedScale*levelSpeedItem*player.rocketSpeed;
    if(this.x < -this.r*2){
        this.x = windowWidth+this.r;
        this.y = random(rectH*0.2, windowHeight-rectH-this.r);
      }
  }

}
