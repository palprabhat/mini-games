  function Bird(s){
  this.X = s.width/2.5;
  this.Y = s.height/2;
  this.acc = 0;
  this.size = 40;
  this.score = 0;

  this.display = function(){
    s.fill(204,204,0);
    s.ellipse(this.X, this.Y, this.size, this.size);
  }

  this.update = function(gravity, groundHeight){
    if (this.Y < s.height - (this.size/2) - groundHeight){
      this.acc += gravity;
      this.Y += this.acc;
    }
  }

  this.fallen = function(groundHeight){
    if (this.Y >= s.height - (this.size/2) - groundHeight){
      this.Y = s.height - (this.size/2) - groundHeight;
      return true;
    }
    return false;
  }

  this.applyForce = function(force){
    this.acc += force;
    if (this.acc < -10){
      this.acc = -10;
    }
  }

  this.wobble = function(){
    if(this.Y >= s.height/2){
      this.applyForce(-3);
    }
    this.update(0.3,0);
  }
}
