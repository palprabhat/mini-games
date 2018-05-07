function Pillar(){
  this.top = random(50, height-250);
  this.w = 80;
  this.space = 150;
  this.speed = -1.5;
  this.X = width;

  this.display = function(){
    fill(50,205,50);
    rect(this.X, -4, this.w, this.top);
    rect(this.X, this.top + this.space, this.w, height);
  }

  this.update = function(slide){
    if(slide){
      this.X += this.speed;
    }
  }

  this.checkCollision = function(flappy){
    if((flappy.Y - (flappy.size/2) <= this.top || flappy.Y + (flappy.size/2) >= this.top + this.space) &&
    (flappy.X + (flappy.size/2) >= this.X &&  flappy.X - (flappy.size/2) <= this.X + this.w)){
      return true;
    }
    return false;
  }
}
