
/**
 * Canvas bounds
 */
 var bounds = {
  top: -35,
  bottom: 380,
  left: -2,
  right: 402
};
/**
 * Height of a row (wheight of background image unit)
 */
var rowHeight = 81;
/**
 * Width of a column (width of background image unit)
 */
var colWidth = 101;
/**
 * Number of rows of the game canvas
 */
var numRows = 6;
/**
 * Number of columns of the game canvas
 */
var numCols = 5;
/**
 * Player vertical and horizontal steps
 */
var playerSteps = {
  x: 101,
  y: 83
};
/**
 * Speed ratio of the enemy. Offers more control to tweak their speed.
 */
var speedRatio = 10;

var collisionTolerance = {
  x: 60,
  y: 30
};

var Enemy = function(x, y, speed){
  this.x = x;
  this.y = (y * rowHeight) + (0.7 * rowHeight);
  this.speed = speed * speedRatio;
  this.sprite = 'images/enemy-bug.png';
};

Enemy.prototype.update = function(dt){
  this.x += this.speed  * dt;
  if (this.x > (bounds.right + 100)){
    this.x = bounds.left;
  }
};

Enemy.prototype.render = function(){
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

var Player = function(){
  this.y = bounds.bottom;
  this.x = bounds.right/2;
  this.sprite = 'images/char-boy.png';
};

Player.prototype.update = function(dt){
  if (this.x>bounds.right) { this.x = bounds.right;}
  if (this.x<bounds.left) { this.x = bounds.left;}
  if (this.y>bounds.bottom) { this.y = bounds.bottom;}
  if (this.y<bounds.top) { this.y = bounds.bottom;}
};

Player.prototype.handleInputKey = function(keyCode){
  switch(keyCode){

    case 'up':
    this.y -= playerSteps.y;
    break;

    case 'down':
    this.y += playerSteps.y;
    break;

    case 'left':
    this.x -= playerSteps.x;
    break;

    case 'right':
    this.x += playerSteps.x;
    break;
  }
};

Player.prototype.render = function(){
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

var allEnemies = [
    new Enemy(-100, 1, 12),
    new Enemy(-800, 2, 11),
    new Enemy(-700, 0, 15),
    new Enemy(-300, 2, 9),
];
var player = new Player();

document.addEventListener('keyup', function(e){
  var keys = {
    38: 'up',
    40: 'down',
    37: 'left',
    39: 'right'
  };
  player.handleInputKey(keys[e.keyCode]);
});
