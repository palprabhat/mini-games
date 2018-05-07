var flappy;
var pillar = [2];

function setup(){
  createCanvas(400,600);
  strokeWeight(4);
  initialize();
}

function draw(){
  background(105);

  if(paused){
    flappy.display();
  }

  if(!paused && !gameover){
    generatePillars();
    playGame(true);

    if(pillar[index_pillar].checkCollision(flappy)){
      gameover = true;
    }

    updateScore();
  }
  else if(gameover){
    playGame(false);
  }

  if (flappy.fallen()){
    gameover = true;
    paused = true;
    scoreBoard();
  }
}

function initialize(){
  gravity = 0.5;
  force = -15;
  index = 0;
  index_score = 0;
  index_pillar = 0;
  gameover = false;
  paused = true;
  hiScore = 0;

  flappy = new Bird();
  pillar[index] = new Pillar();
  pillar[index].X = 600;

  if($.cookie("hiScore")) {
  	hiScore = $.cookie("hiScore");
  }
}

function keyPressed(){
  if (key==' '){
    if(!gameover){
      applyForce();
    }
  }
  if(paused){
    if (key==' '){
      startGame();
      applyForce();
    }
  }
}

function mousePressed(){
  if(!gameover){
    applyForce();
  }
  if(paused){
    startGame();
    applyForce();
  }
}

function applyForce(){
  flappy.acc += force;
  if (flappy.acc < -10){
    flappy.acc = -10;
  }
}

function generatePillars(){
  if(pillar[index].X <= 160){
    index = (index + 1) % 2
    pillar[index] = new Pillar(canvas);
  }
}

function startGame() {
  pillar = [2];
  initialize();
  pillar[index]
  paused = false;
}

function playGame(flag){
  for(var p in pillar){
    pillar[p].update(flag);
    pillar[p].display();
  }

  flappy.update(gravity);
  flappy.display();
}

function updateScore(){
  if(pillar[index_score].X + pillar[index_score].w - 2*flappy.size <= flappy.X){
    index_score = (index_score + 1) % 2;
    flappy.score++;
    if(flappy.score > hiScore){
      hiScore = flappy.score;
      $.cookie("hiScore",hiScore, {expires: 365, path: '/'});
    }
  }

  if(pillar[index_pillar].X + pillar[index_pillar].w  <= flappy.X-flappy.size){
    index_pillar = (index_pillar + 1) % 2;
  }

  textSize(64);
  fill(255);
  stroke(0);
  text(flappy.score, (width/2)-16, height/8);
}

function scoreBoard(){
  fill(210, 180, 140);
  rect(50,200,300,200);

  fill(255);
  textSize(58);
  text(flappy.score, (width/2)-16, 255);

  fill(188, 143, 143);
  textSize(32);
  text("Score", (width/2)-40, 290);

  fill(255);
  textSize(58);
  text(hiScore, (width/2)-16, 355);

  fill(188, 143, 143);
  textSize(32);
  text("Hi-Score", (width/2)-60, 390);
}
