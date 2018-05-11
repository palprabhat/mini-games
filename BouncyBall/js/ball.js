// Bouncy Ball
// Prabhat Pal (www.prabhatpal.com)

/**
 * [Define all the actions of ball]
 * @param {[Object]} s [p5 canvas object]
 */
function Ball(s){
  this.X = s.width/2.5;
  this.Y = s.height/2;
  this.acc = 0;
  this.size = 40;
  this.score = 0;

  this.display = function(){
    s.fill(204,204,0);
    s.ellipse(this.X, this.Y, this.size, this.size);
  }

  //update the height of ball based on its velocity and gravity
  this.update = function(gravity, groundHeight){
    if (this.Y < s.height - (this.size/2) - groundHeight){
      this.acc += gravity;
      this.Y += this.acc;
    }
  }

  //did the ball hit the ground? return true if yes else false
  this.fallen = function(groundHeight){
    if (this.Y >= s.height - (this.size/2) - groundHeight){
      this.Y = s.height - (this.size/2) - groundHeight;
      return true;
    }
    return false;
  }

  //jump the ball by applying a force to it
  this.applyForce = function(force){
    this.acc += force;
    if (this.acc < -10){
      this.acc = -10;
    }
  }

  //wobble the ball slowly
  this.wobble = function(){
    if(this.Y >= s.height/2){
      this.applyForce(-3);
    }
    this.update(0.3,0);
  }
}
