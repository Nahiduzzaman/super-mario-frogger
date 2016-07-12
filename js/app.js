/**
 * Canvas bounds
 */
var bounds = {
    top: 121,
    bottom: 625,
    left: 10,
    right: 763
};
/**
 * Height of a row (wheight of background image unit)
 */
var rowHeight = 101;
/**
 * Width of a column (width of background image unit)
 */
var colWidth = 101;
/**
 * Number of rows of the game canvas
 */
var numRows = 8;
/**
 * Number of columns of the game canvas
 */
var numCols = 8;
/**
 * Player vertical and horizontal steps
 */
var playerSteps = {
    x: 25,
    y: 101
};
/**
 * Speed ratio of the enemy. Offers more control to tweak their speed.
 */
var speedRatio = 10;

var collisionTolerance = {
    x: 35,
    y: 30
};
var Enemy = function(x, y, speed) {
    this.x = x;
    this.y = (y * rowHeight) + (0.5 * rowHeight) + 73;
    this.speed = speed * speedRatio;
    this.sprite = 'images/goomba.png';
};

Enemy.prototype.update = function(dt) {
    this.x += this.speed * dt;
    if (this.x > (bounds.right + 100)) {
        this.x = bounds.left;
    }
};

Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

var Player = function() {
    this.y = bounds.bottom;
    this.x = bounds.right / 2;
    this.sprite = 'images/mario-right.png';
};

Player.prototype.update = function(dt) {
    if (this.x > bounds.right) {
        this.x = bounds.right;
    }
    if (this.x < bounds.left) {
        this.x = bounds.left;
    }
    if (this.y > bounds.bottom) {
        this.y = bounds.bottom;
    }
    if (this.y < bounds.top) {
        this.y = bounds.top;
    }
};

Player.prototype.handleInputKey = function(keyCode) {
    switch (keyCode) {

        case 'up':
            this.y -= playerSteps.y;
            break;

        case 'down':
            this.y += playerSteps.y;
            break;

        case 'left':
            this.x -= playerSteps.x;
            this.sprite = 'images/mario-left.png';
            break;

        case 'right':
            this.x += playerSteps.x;
            this.sprite = 'images/mario-right.png';
            break;
    }
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


var Cloud = function(x, y, speed) {
    this.x = x;
    this.y = (y * rowHeight) + (0.5 * rowHeight) - 50;
    this.speed = speed * speedRatio;
    this.sprite = Math.random() < 0.5 ? 'images/small-cloud.png' : 'images/big-cloud.png';
};

Cloud.prototype.update = function(dt) {
    this.x += this.speed * dt;
    if (this.x > (bounds.right + 100)) {
        this.x = bounds.left;
    }
};

Cloud.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


var Coin = function(x, y) {
    this.x = (x * colWidth) + (0.5 * colWidth) - 10;
    this.y = (y * rowHeight) + (0.5 * rowHeight) + 73;
    this.sprite = 'images/coin.png';
};

Coin.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

var allEnemies = [
    new Enemy(-100, 1, 8),
    new Enemy(-100, 2, 12),
    new Enemy(-800, 3, 11),
    new Enemy(-700, 4, 15),
    new Enemy(-300, 4, 9),
    new Enemy(-500, 1, 10)
];
var allClouds = [
    new Cloud(0, 2, 1),
    new Cloud(-800, 3, 2),
    new Cloud(-600, 1, 3),
    new Cloud(-100, 4, 5),
    new Cloud(-100, 2, 1),
    new Cloud(0, 1, 1),
    new Cloud(-400, 2, 2),
    new Cloud(-300, 3, 3),
    new Cloud(-50, 1, 5),
    new Cloud(-250, 1, 1)
];

var allCoins = (function(){
  var coins=[];
  for(var i = 0 ; i < numRows ; i++){
    console.log(i);
    for( var j = 0 ; j < (numCols -2) ; j++){
      coins.push(new Coin(i,j));
    }
  }
  return coins;
})();
console.log(allCoins);
var player = new Player();

document.addEventListener('keyup', function(e) {
    var keys = {
        38: 'up',
        40: 'down',
        37: 'left',
        39: 'right'
    };
    player.handleInputKey(keys[e.keyCode]);
});
