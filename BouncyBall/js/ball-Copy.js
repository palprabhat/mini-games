function Bird(){
  this.X = width/2.5;
  this.Y = height/2;
  this.acc = 0;
  this.size = 40;
  this.score = 0;

  this.display = function(){
    fill(204,204,0);
    ellipse(this.X, this.Y, this.size, this.size);
  }

  this.update = function(gravity){
    if (this.Y < height - (this.size/2)){
      this.acc += gravity;
      this.Y += this.acc;
    }
  }

  this.fallen = function(){
    if (this.Y >= height-(this.size/2)){
      this.Y = height-(this.size/2);
      return true;
    }
    return false;
  }
}
