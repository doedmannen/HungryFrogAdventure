/*
Setup for moving around in the game and the menu.
*/



function moveCheck(){
  if(mouseY > windowHeight-rectH && mouseY < windowHeight){
    if(mouseX < windowWidth/2 && mouseX > 0){

      moveDir = +1;

    } else if (mouseX > windowWidth/2 && mouseX < windowWidth){

      moveDir = -1;

    }
  }
}

function gameOver(){
  if(coin){
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
    text("\nSTART A NEW GAME", width/2, textPlacement);
    textPlacement = 0;
    noLoop();
  }
}

function mouseClicked(){
  if(game && mouseY < windowHeight-rectH*1.2){
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
  return false;               // prevent default
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
  text("BURGER = 10 POINTS", width/2, textPlacement);
  textPlacement += mediumText*1.2;
  text("FRIES = 50 POINTS", width/2, textPlacement);
  textPlacement += mediumText*1.2;
  text("SODA = 2X POINTS", width/2, textPlacement);
  textPlacement += mediumText*1.2;
  fill(255, 50, 50);
  text("BOMBS ARE UNHEALTHY", width/2, textPlacement);
  textPlacement += (mediumText*1.2/2);
  fill(255);
  text("\nSTART A NEW GAME", width/2, textPlacement);
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
