
/**
 * Canvas bounds
 */
 var bounds = {
  top: 0,
  bottom: 0,
  left: 0,
  right: 0
};
/**
 * Height of a row (wheight of background image unit)
 */
var rowHeight = 0;
/**
 * Width of a column (width of background image unit)
 */
var colWidth = 0;
/**
 * Number of rows of the game canvas
 */
var numRows = 0;
/**
 * Number of columns of the game canvas
 */
var numCols = 0;
/**
 * Player vertical and horizontal steps
 */
var playerSteps = {
  x: 0,
  y: 0
};
/**
 * Speed ratio of the enemy. Offers more control to tweak their speed.
 */
var speedRatio = 0;

var Enemy = function(x, y, speed){
  this. x = x;
  this.y = y;
  this.speed = speed * speedRatio;
  this.sprite = 'images/enemy-bug.png';
};

Enemy.prototype.update = function(dt){
  this.x += this.speed  * dt;
  if (this.x > bounds.right){
    this.x = bounds.left;
  }
};

Enemy.prototype.render = function(){
  ctx.drawImage(Resources.load(this.sprite), this.x, this.y);
};

var Player = function(){
  this.x = bounds.bottom;
  this.y = ctx.width/2;
  this.sprite = 'images/char-boy.png';
};

Player.prototype.update = function(dt){
  if (this.x>bounds.right) { this.x = bounds.right;}
  if (this.x<bounds.left) { this.x = bounds.left;}
  if (this.y>bounds.bottom) { this.y = bounds.bottom;}
  if (this.y<bounds.top) { this.y = bounds.top;}
};

Player.prototype.handleInputKey = function(keyCode){
  switch(keyCode){

    case 'up':
    this.y -= steps.y;
    break;

    case 'down':
    this.x += steps.y;
    break;

    case 'left':
    this.x -= steps.x;
    break;

    case 'right':
    this.x += steps.x;
    break;
  }
};

Player.prototype.render = function(){
  ctx.drawImage(Resources.load(this.sprite), this.x, this.y);
};

document.addEvenListener('keyup', function(e){
  var keys = {
    38: 'up',
    40: 'down',
    37: 'left',
    39: 'right'
  };
  Player.handleInputKey(keys[e.keyCode]);
});
