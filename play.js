/*
Setup for moving around in the game and the menu.
*/
function checkMobile(){
  if (typeof window.orientation !== 'undefined') {
    return true;
  }
  return false;
}

function touchEnded(){
  moveDir = 0;
  return false;
}

function touchStarted(){
    if(game && mouseY > windowHeight-rectH*3 && mouseY < windowHeight-rectH){
      checkRocket();
    }
    if(game && mouseY < windowHeight-rectH*3){
      if(!pause){
        pause = true;
        noLoop();
      } else {
        pause = false;
        loop();
      }
    }
    if(!game){
      if(coin && mouseY < height-rectH &&
        mouseY > rectH*0.2+largeText*1.2+mediumText*4.8){
        newGame();
      } else if(!coin && mouseY > largeText*2+mediumText*6.3){
        newGame();
      }

    }
    if(mouseY > windowHeight-rectH && mouseY < windowHeight){
      if(mouseX < windowWidth/2 && mouseX > 0){

        moveDir = +1;

      } else if (mouseX > windowWidth/2 && mouseX < windowWidth){

        moveDir = -1;

      }
    }
  return false;
}

function gameOver(){
  if(coin){
    background(50, 90, 130);
    image(i_explode, player.explodeX-itemScale, player.explodeY-itemScale,
      itemScale*5, itemScale*5);
    image(i_frogdead, player.x-player.r, player.y-player.r, player.r*2, player.r*2);
    fill(255);
    stroke(0);
    textSize(largeText);
    strokeWeight(largeText/20);
    textPlacement += rectH*0.2+largeText*1.2;
    text("GAME OVER", width/2, textPlacement);
    textSize(mediumText);
    strokeWeight(mediumText/20);
    textPlacement += mediumText*1.2;
    text("SCORE:", width/2, textPlacement);
    textPlacement += mediumText*1.2;
    text(score, width/2, textPlacement);
    textPlacement += mediumText*1.2;
    text("HIGHSCORE:", width/2, textPlacement);
    textPlacement += mediumText*1.2;
    text(highscore, width/2, textPlacement);
    textPlacement += (mediumText*1.2/2);
    if(mobile){
      text("\nSTART A NEW GAME", width/2, textPlacement);
    }else {
      text("\nPRESS SPACE FOR NEW GAME", width/2, textPlacement);
    }
    textPlacement = 0;
    noLoop();
  }
}


function keyPressed(){
  console.log("Key is pressed");
  if(!game && keyCode === 32){
    newGame();
  } else if(game && keyCode === 32){
    checkRocket();
  }
}

function checkRocket(){
  if(player.rocket > 0){
    player.rocket = 0;
    player.rocketSpeed = 2;
    player.rocketTimer += 1000;
  }
}

function gameMenu(){
  fill(0, 255, 50);
  stroke(0);
  textSize(largeText);
  strokeWeight(largeText/20);
  textPlacement += largeText;
  text("HUNGRY FROG", width/2, textPlacement);
  textPlacement += largeText;
  text("ADVENTURE TIME", width/2, textPlacement);
  textSize(mediumText);
  fill(255, 255, 50);
  strokeWeight(mediumText/20);textPlacement += mediumText*1.2;
  text("FAST NATION FOOD INVASION", width/2, textPlacement);
  fill(255, 75, 255);
  textPlacement += mediumText*1.5;
  text("BURGER = 20 POINTS", width/2, textPlacement);
  textPlacement += mediumText*1.2;
  text("FRIES = 50 POINTS", width/2, textPlacement);
  textPlacement += mediumText*1.2;
  text("SODA = 100 POINTS", width/2, textPlacement);
  textPlacement += smallText*1.3;
  textSize(smallText);
  text("ROCKETS = 2X SPEED + 5X POINTS", width/2, textPlacement);
  textPlacement += smallText*1.2;
  text("YOU GAIN POINTS DURING ROCKET BOOSTING", width/2, textPlacement);
  textPlacement += smallText*1.2;
  text("ROCKETS DO NOT STACK", width/2, textPlacement);
  textSize(mediumText);
  textPlacement += mediumText*1.4;
  fill(255, 50, 50);
  text("BOMBS ARE UNHEALTHY", width/2, textPlacement);
  textPlacement += (mediumText*1.2/2);
  fill(255);
  if(mobile){
    text("\nSTART A NEW GAME", width/2, textPlacement);
  }else {
    text("\nPRESS SPACE TO START", width/2, textPlacement);
  }
  textPlacement = 0;
  noLoop();
}

function newGame(){

  game = true;
  coin = true;
  player = new frog();
  clouds = new cloud();
  items = [];
  itemCount =[];
  score = 0;
  count = 0;
  itemCount = 0;
  levelSpeedItem = 1;
  levelSpeedPlayer = 1;
  loop();

}
