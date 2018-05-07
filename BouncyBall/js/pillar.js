function Pillar(s, groundHeight){
  this.top = s.random(50, s.height-groundHeight-250);
  this.w = 80;
  this.space = 170;
  this.speed = 1.5;
  this.X = s.width;

  this.display = function(){
    s.fill(50,205,50);
    s.rect(this.X, -4, this.w, this.top);
    s.rect(this.X, this.top+this.space, this.w, s.height);
  }

  this.update = function(slide){
    if(slide){
      this.X -= this.speed;
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
