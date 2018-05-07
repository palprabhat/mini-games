function Ground(s, tile, x){
  this.height = 75;
  this.X = x;

  this.update = function(){
    this.X -= 1.5;
  }

  this.display = function(){
    s.image(tile, this.X, s.height - this.height, 18, tile.height);
  }
}
