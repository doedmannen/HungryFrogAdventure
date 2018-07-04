// Is user is on mobile or computer
let mobile = checkMobile();

// Player variables
let player;
let moveDir = 0;
let playerMoveSpeed;
let score = 0;
let highscore = 0;

// Game variables
let game = false;
let coin = false;
let rectH;
let itemScale;
let speedScale;
let clouds;
let count = 0;
let levelSpeedItem = 1;
let levelSpeedPlayer =  1;
let pause = false;

// Item variables
let items = [];
let itemCount = 0;


// Image variables
let i_soda;
let i_burger;
let i_fries;
let i_rocket;

let i_bomb;
let i_explode;

let i_frog;
let i_frogdead;

// Text variables
let gameFont;
let largeText;
let mediumText;
let smallText;
let textPlacement = 0;

function preload(){
  i_soda = loadImage("img/soda.png");
  i_burger = loadImage("img/burger.png");
  i_fries = loadImage("img/fries.png");
  i_rocket = loadImage("img/rocket.png");
  i_bomb = loadImage("img/bomb.png");
  i_explode = loadImage("img/explode.png");


  i_frog = loadImage("img/frog.png");
  i_frogdead = loadImage("img/frogdead.png");
  i_frogboost = loadImage("img/frogboost.png");
  i_cloud = loadImage("img/cloud.png");

  i_up = loadImage("img/up.png");
  i_down = loadImage("img/down.png");

  gameFont = loadFont('font/Anton-Regular.ttf')
}

function functionName() {

}

function setup() {
  var cnv = createCanvas(windowWidth, windowHeight); // Set "fullscreen"
  cnv.style('display', 'block');                     // No scrollbars

  rectH = windowHeight*0.2;              // Set scale for bar
  itemScale = windowHeight*0.05;  	     // Set scale for items
  speedScale = windowWidth/1500;         // Set scale for speed
  // Set scale for playerspeed
  playerMoveSpeed = (windowHeight-rectH*0.2-rectH)/90;

  frameRate(100);                        // Probably not going to do 100fps

  pixelDensity(1);                       // Trying to get better quality
  displayDensity(1);                    // Trying to get better quality

  // noCursor();                           // Hide the mouse inside canvas

  textFont(gameFont);
  strokeJoin(ROUND);
  textAlign(CENTER);

  largeText = 1*(rectH*0.5).toFixed(0);
  mediumText = 1*(rectH*0.3).toFixed(0);
  smallText = 1*(rectH*0.18).toFixed(0);

}


/*
If the user flips the mobile device, or the window is resized for some other
reason, do this.
The speed is changed according to the width of the window. The more space
you have to see objects coming in, the faster they should come towards
your position.
The size of the black rectangles above and below the playfield should
be scaled according to the height of the window.
If the player is placed outside of the playfield while resizing the
window, the controller will not work. We need to make sure that
the player stays within the playfield.

¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤
¤ We should also check if the objects are inside the playfield if resized  ¤
#¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤

*/
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  rectH = windowHeight*0.2;              // Set scale for bar
  itemScale = windowHeight*0.05;  	     // Set scale for items
  speedScale = windowWidth/1500;         // Set scale for speed
  playerMoveSpeed = (windowHeight-rectH*0.2-rectH)/90;

  largeText = 1*(rectH*0.5).toFixed(0);
  mediumText = 1*(rectH*0.3).toFixed(0);
  smallText = 1*(rectH*0.18).toFixed(0);

  player.r = itemScale;
  player.speed = playerMoveSpeed;
  player.x = player.r+windowWidth*0.1;

  if(player.y-player.r <= rectH*0.2){
    player.y = rectH*0.2+player.r+1;
    moveDir = 0;
  } else if(player.y+player.r >= windowHeight-rectH){
    player.y = windowHeight-rectH-player.r-1;
    moveDir = 0;
  }

  for(let it of items){
    it.r = itemScale;
    if(it.y+it.r > windowHeight-rectH){
      it.y = windowHeight-rectH-it.r;
    }
  }
}






function draw(){
  background(100, 180, 255);



  if(coin){

    clouds.show();
    clouds.move();

    count++;
    if(count > 249){
      if((levelSpeedItem < 3 || levelSpeedPlayer < 3) && player.rocketTimer < 1){
        levelSpeedItem = 1*(levelSpeedItem+0.1).toFixed(2);
        levelSpeedPlayer = 1*(levelSpeedPlayer+0.1).toFixed(2);
      }
      count = 0;
    }

    if(player.rocketTimer > 0){
      background(50, 50, 150);
      clouds.show();
      clouds.move();
    }

    if(player.rocket > 0){
      textSize(mediumText);
      strokeWeight(mediumText/20);
      stroke(0);
      fill(255);
      text("USE ROCKET BOOSTER", windowWidth/2, windowHeight-rectH*1.1);
    }

    if(count % 250 == 0){
      itemCount++;
      if(itemCount > 14){
        itemCount = 1;
      }
      if(itemCount == 8){
        items[items.length] = new item("ROCKET");
      } else if(itemCount == 10){
        items[items.length] = new item("SODA");
      } else if(itemCount == 2 || itemCount == 5 || itemCount == 11 || itemCount == 14){
        items[items.length] = new item("FRIES");
      } else {
        items[items.length] = new item("BURGER");
      }
    }
    if(levelSpeedItem < 2 && count % 100 == 0 && count % 250 != 0){
      items[items.length] = new item();
    }
    if(levelSpeedItem >= 2 && levelSpeedItem < 3 &&
      count % 50 == 0 && count % 250 != 0){
      items[items.length] = new item();
      items[items.length] = new item();
    }
    if(levelSpeedItem >= 3 && count % 25 == 0 && count % 250 != 0){
      items[items.length] = new item();
      if(count > 150){
        items[items.length] = new item();
      }
    }



    // Controlls for computer-testing
    if(game && keyIsDown(81)){
      moveDir = +1;
    }
    if(game && keyIsDown(80)){
      moveDir = -1;
    }






    // Move and draw our items
    for(var i = items.length; i > 0; i--){
      items[i-1].move();
      items[i-1].show();
      if(items[i-1].y < 0){
        items.splice(i-1, 1);
      }
    }


    player.move();
    player.show();



    if(pause){
      textSize(largeText);
      stroke(0);
      fill(255);
      strokeWeight(largeText/20);
      text("P A U S E D", width/2, height/2-rectH*0.6);

    }

    if(!game){
      gameOver();
    }

    fill(0);
    noStroke();
    rect(0, windowHeight-rectH, windowWidth, rectH);
    rect(0, 0, windowWidth, rectH*0.2);

    if(mobile){
      image(i_down, windowWidth*0.2, windowHeight-rectH+itemScale, itemScale*2, itemScale*2);
      image(i_up, windowWidth*0.7, windowHeight-rectH+itemScale, itemScale*2, itemScale*2);
    } else {
      textSize(mediumText);
      fill(255,255,0);
      text("Q = DOWN", windowWidth*0.1, windowHeight-largeText*0.5);
      text("P = UP", windowWidth*0.9, windowHeight-largeText*0.5);
      if(player.rocket > 0){
        text("SPACE = ROCKET", windowWidth/2, windowHeight-largeText*0.5);
      }
    }


    fill(255);
    textSize(smallText);
    textStyle(BOLD);

    text("Score: " + score, width/2, rectH*0.2-1);


  } else {
    gameMenu();
  }




}
