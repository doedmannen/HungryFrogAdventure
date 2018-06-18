class item{

  constructor(type="BOMB"){
    this.img = i_bomb;
    this.type = type;
    this.r = itemScale;
    this.x = windowWidth+this.r*2;
    this.y = random(rectH*0.2+this.r, windowHeight-rectH-this.r);
    this.speed = 5;
    if(this.type == "SODA"){
      this.img = i_soda;
    } else if(this.type == "FRIES"){
      this.img = i_fries;
    } else if(this.type == "BURGER"){
      this.img = i_burger;
    }


  }

  intersects(){
    return (dist(this.x, this.y, player.x, player.y) < this.r + player.r);
  }

  checkType(){
    if(this.type == "BURGER"){
      score += 10;
    } else if (this.type == "FRIES"){
      score += 50;
    } else if (this.type == "SODA"){
      score *=2;
    } else {
      player.explodeX = this.x-this.r*1.5;
      player.explodeY = this.y-this.r;
      game = false;
    }
    if (score > highscore){
      highscore = score;
    }
  }



  show(){
    if(this.type == "BOMB"){
      image(this.img, this.x-this.r*1.08, this.y-this.r*1.25, this.r*2.39, this.r*2.39);
    } else {
      image(this.img, this.x-this.r, this.y-this.r, this.r*2, this.r*2);
    }
  }

  move(){
    this.x -= this.speed*speedScale*levelSpeedItem;
    if(this.intersects()){
      this.checkType();
      this.y = -100;
    }

    // If the object has passed us, remove it.
    if(this.x < -this.r){
      this.y = -100;
    }
  }

}
