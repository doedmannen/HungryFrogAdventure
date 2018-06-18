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
  i_bomb = loadImage("img/bomb.png");
  i_explode = loadImage("img/explode.png");


  i_frog = loadImage("img/frog.png");
  i_frogdead = loadImage("img/frogdead.png");
  i_cloud = loadImage("img/cloud.png");

  i_up = loadImage("img/up.png");
  i_down = loadImage("img/down.png");
  i_pause = loadImage("img/pause.png");

  gameFont = loadFont('font/AgencyFBBoldCondensed.ttf')
}

function setup() {
  var cnv = createCanvas(windowWidth, windowHeight); // Set "fullscreen"
  cnv.style('display', 'block');                     // No scrollbars

  rectH = windowHeight*0.2;              // Set scale for bar
  itemScale = windowHeight*0.05;  	     // Set scale for items
  speedScale = windowWidth/1500;         // Set scale for speed
  // Set scale for playerspeed
  playerMoveSpeed = (windowHeight-rectH*0.2-rectH)/120;

  frameRate(100);                        // Probably not going to do 100fps

  pixelDensity(1);                       // Trying to get better quality
  displayDensity(1);                    // Trying to get better quality

  // noCursor();                           // Hide the mouse inside canvas

  textFont(gameFont);
  strokeJoin(ROUND);
  textAlign(CENTER);

  largeText = 1*(rectH*0.6).toFixed(0);
  mediumText = 1*(rectH*0.4).toFixed(0);
  smallText = 1*(rectH*0.2).toFixed(0);

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
  playerMoveSpeed = (windowHeight-rectH*0.2-rectH)/120;

  largeText = 1*(height/10).toFixed(0);
  mediumText = 1*(height/15).toFixed(0);
  smallText = 1*(height/20).toFixed(0);

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
    count++;
    if(count > 249){
      if(levelSpeedItem < 6){
        levelSpeedItem = 1*(levelSpeedItem+0.1).toFixed(2);
      }
      if(levelSpeedPlayer < 3){
        levelSpeedPlayer = 1*(levelSpeedPlayer+0.05).toFixed(2);
      }
      count = 0;
    }


    /*
    Öka levelSpeedItem och levelSpeedPlayer var % 5000
    Item bör öka mer än player.
    Öka tills hastigheten på player motsvarar värdet*2
    och item.speed = 25. Stanna därefter.
    Undersök när i count detta inträffar och nollställ count varje gång
    ett sånt helvarv inträffar, så att vi inte råkar på en maxvalue-bug.
    */

    if(count % 250 == 0){
      itemCount++;
      if(itemCount > 10){
        itemCount = 1;
      }
      if(itemCount == 10){
        items[items.length] = new item("SODA");
      } else if(itemCount == 3 || itemCount == 6 || itemCount == 9){
        items[items.length] = new item("FRIES");
      } else {
        items[items.length] = new item("BURGER");
      }
    }
    if(levelSpeedItem < 2 && count % 100 == 0 && count % 250 != 0){
      items[items.length] = new item();
    }
    if(levelSpeedItem >= 2 && levelSpeedItem < 4 &&
      count % 50 == 0 && count % 250 != 0){
      items[items.length] = new item();
    }
    if(levelSpeedItem >= 4 && count % 25 == 0 && count % 250 != 0){
      items[items.length] = new item();
    }

    // Controlls for mobile game
    if(game && mouseIsPressed){
      moveCheck();
    }

    // Controlls for computer-testing
    if(game && keyIsDown(40)){
      moveDir = +1;
    }
    if(game && keyIsDown(38)){
      moveDir = -1;
    }

    clouds.show();
    clouds.move();



    fill(0);
    noStroke();
    rect(0, windowHeight-rectH, windowWidth, rectH);
    rect(0, 0, windowWidth, rectH*0.2);

    image(i_down, windowWidth*0.2, windowHeight-rectH+itemScale, itemScale*2, itemScale*2);
    image(i_up, windowWidth*0.7, windowHeight-rectH+itemScale, itemScale*2, itemScale*2);

    fill(255);
    textSize(smallText);
    textStyle(BOLD);

    text("Score: " + score, width/2, rectH*0.2-1);
    // text("Speed: " + levelSpeedItem, 100, rectH*0.2-5);


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
      strokeWeight(1*(largeText/20).toFixed(0));
      text("P A U S E D", width/2, height/2-rectH*0.6);

    }
  } else {
    gameMenu();
  }

  if(!game){
    gameOver();
  }


}
