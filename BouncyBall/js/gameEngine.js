// Bouncy Ball
// Prabhat Pal (www.prabhatpal.com)

//global variables
var ball, lift, coin, hit, tile, groundTiles;
var ground = [];
var clouds = [];
var pillar = [2];
var gameover = false;
var paused = true;
var tileWidth = 18;
var index = 0;
var index_score = 0;
var index_pillar = 0;
var hiScore = 0;
var gravity = 0.5;
var force = -15;
var wd = ($(window).width()<768) ? $(window).width() : 450;
var ht = wd * 1.35;


/**
 * [Initialize game parameter, set action for key or mouse pressed, provide game flow]
 * @param  {[String]} game [id of the HTML div where the canvas will be rendered]
 * @return {[Object]}      [p5 object]
 */
var gameWindow = function(game) {
  game.preload = function() {
    game.soundFormats('mp3', 'ogg');
    lift = game.loadSound('sounds/zapsplat_swipe_in_air.ogg');
    coin = game.loadSound('sounds/zapsplat_collect_coin.ogg');
    hit = game.loadSound('sounds/zapsplat_impact.ogg');
    tile = game.loadImage("images/ground.png");
    title = game.loadImage("images/bouncy-ball.png");
    cloud = game.loadImage("images/cloud.png");
  };

  game.setup = function() {
    cnv = game.createCanvas(wd, ht);
    cnv.mousePressed(mousePressedOnCanvas);
    lift.setVolume(0.1);
    coin.setVolume(0.2);
    hit.setVolume(0.3);
    game.strokeWeight(4);
    game.stroke(84, 56, 71);
    createCloud();
    initialize();
  };

  game.draw = function() {
    game.background(135, 206, 235);

    for(var c in clouds){
      clouds[c].display();
    }
    if(paused && !gameover){
      game.image(title, game.width/6, 100, title.width/1.5, title.height/1.5);
      ball.display();
      ball.wobble();
    }

    if(!paused && !gameover){
      generatePillars();
      playGame(true);

      if(pillar[index_pillar].checkCollision(ball)){
        gameover = true;
        hit.play();
      }

      updateScore();
    }
    else if(gameover){
      playGame(false);
    }

    if (!paused && ball.fallen(ground[0].height)){
      if(!gameover){
        hit.play();
      }
      gameover = true;
      paused = true;
    }

    if(paused && gameover){
      scoreBoard();
    }

    if(!gameover){
      moveGround();
      moveCloud();
    }
    for(var t in ground){
      ground[t].display();
    }
  };

  game.keyPressed = function(){
    if (game.key==' '){
      if(paused && !gameover){
        startGame();
        applyForce();
      }
      else if(paused && gameover){
        startGame();
        paused = true;
      }
      else if(!gameover){
        applyForce();
      }
    }
  };
};
var canvas = new p5(gameWindow, 'gameWindow');

//initialize paramaters
function initialize(){
  index = 0;
  index_score = 0;
  index_pillar = 0;
  gameover = false;
  paused = true;
  hiScore = 0;
  groundTiles = canvas.width/tileWidth + 2;

  createGround();

  ball = new Ball(canvas);
  pillar[index] = new Pillar(canvas, ground[0].height);
  pillar[index].X = 600;

  if(Cookies.get("hiScore")) {
  	hiScore = Cookies.get("hiScore");
  }
  else{
  	Cookies.set("hiScore", 0, {expires: 365, path: ''});
  }
}

//start the game
function startGame() {
  pillar = [2];
  initialize();
  pillar[index]
  paused = false;
}

//update ball and pillar position and display them during the game is played 
function playGame(flag){
  for(var p in pillar){
    pillar[p].update(flag);
    pillar[p].display();
  }

  ball.update(gravity, ground[0].height);
  ball.display();
}

//apply fixed force to the ball
function applyForce(){
  ball.applyForce(force);
  lift.play();
}

//trigger this event only when mouse is pressed on the canvas
function mousePressedOnCanvas(){
  if(paused && !gameover){
    startGame();
    applyForce();
  }
  else if(paused && gameover){
    startGame();
    paused = true;
  }
  else if(!gameover){
    applyForce();
  }
}

//create new pillars and destroy the pillars which are outside the frame
function generatePillars(){
  if(pillar[index].X <= wd*0.4){
    index = (index + 1) % 2
    pillar[index] = new Pillar(canvas, ground[0].height);
  }
}

//create ground of size of the game window
function createGround(){
  for(i = 0; i < groundTiles; i++){
    ground[i] = new Ground(canvas, tile, i*tileWidth);
  }
}

//move the ground during the game play
function moveGround(){
  for(var t in ground){
    ground[t].update();
    if(ground[t].X <= -tileWidth){
      ground[t] = new Ground(canvas, tile, canvas.width);
    }
  }
}

//create clouds
function createCloud(){
  for(i = 0; i < 5; i++){
    clouds[i] = new Cloud(canvas, cloud);
  }
}

//move clouds
function moveCloud(){
  for(var c in clouds){
    clouds[c].update();
    if(clouds[c].X + clouds[c].width  <= 0){
      clouds[c] = new Cloud(canvas, cloud);
    }
  }
}

//update score
function updateScore(){
  if(pillar[index_score].X + pillar[index_score].w - 2*ball.size <= ball.X){
    ball.score++;
    if(ball.score >= parseInt(Cookies.get('hiScore'))){
      hiScore = ball.score;
      Cookies.set("hiScore", hiScore, {expires: 365, path: ''});
    }
    coin.play();
    index_score = (index_score + 1) % 2;
  }

  if(pillar[index_pillar].X + pillar[index_pillar].w  <= ball.X-ball.size){
    index_pillar = (index_pillar + 1) % 2;
  }

  canvas.textSize(64);
  canvas.fill(255);
  canvas.text(ball.score, (canvas.width/2)-(ball.score.toString().length*16), canvas.height/8);
}

//display score
function scoreBoard(){
  canvas.fill(210, 180, 140);
  canvas.rect(wd*0.125,200,wd*0.75,200);

  canvas.fill(255);
  canvas.textSize(58);
  canvas.text(ball.score, (canvas.width/2)-(ball.score.toString().length*16), 255);

  canvas.fill(188, 143, 143);
  canvas.textSize(32);
  canvas.text("Score", (canvas.width/2)-40, 290);

  canvas.fill(255);
  canvas.textSize(58);
  canvas.text(hiScore, (canvas.width/2)-(hiScore.toString().length*16), 355);

  canvas.fill(188, 150, 143);
  canvas.textSize(32);
  canvas.text("Hi-Score", (canvas.width/2)-60, 390);
}
