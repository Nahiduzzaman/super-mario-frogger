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
 * Height of a row (height of background image unit)
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
/*
 * Collision area dimensions
 */
var collisionTolerance = {
    x: 35,
    y: 30
};
/*
 * Enemy pseudoclass representing objects the player should avoid
 */
var Enemy = function(x, y, speed) {
    this.x = x;
    this.y = (y * rowHeight) + (0.5 * rowHeight) + 73;
    this.speed = speed * speedRatio;
    this.sprite = 'images/goomba.png';
};
/*
 * Move the enemy objects back to the left edge once they travel the screen
 */
Enemy.prototype.update = function(dt) {
    this.x += this.speed * dt;
    if (this.x > (bounds.right + 100)) {
        this.x = bounds.left;
    }
};
/*
 * Draw an enemy object sprite using canvas drawImage
 */
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
/*
 *  Player pseudoclass
 */
var Player = function() {
    this.y = bounds.bottom;
    this.x = bounds.right / 2;
    this.sprite = 'images/mario-right.png';
};
/*
 * Update the player location: not allowing to go out of canvas
 */
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
/*
 * Change the player location depending on the keyboard input key
 */
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
            this.sprite = 'images/mario-left.png'; // Load the left oriented mario sprite
            break;
        case 'right':
            this.x += playerSteps.x;
            this.sprite = 'images/mario-right.png'; // Load the right oriented mario sprite
            break;
    }
};
/*
 * Draw a player object using canvas drawImage
 */
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
/*
 * Clouds pseudoclass
 */
var Cloud = function(x, y, speed) {
    this.x = x;
    this.y = (y * rowHeight) + (0.5 * rowHeight) - 50;
    this.speed = speed * speedRatio;
    // Randomly assign a big cloud or small cloud to the sprite property of the cloud object
    this.sprite = Math.random() < 0.5 ? 'images/small-cloud.png' : 'images/big-cloud.png';
};
/*
* Move the cloud objects back to the left edge once they travel the screen
*/
Cloud.prototype.update = function(dt) {
    this.x += this.speed * dt;
    if (this.x > (bounds.right + 100)) {
        this.x = bounds.left;
    }
};
/*
* Draw a cloud object using canvas drawImage
*/
Cloud.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
/*
* Coin pseudoclass representing objects the player has to collect
*/
var Coin = function(x, y) {
    this.x = (x * colWidth) + (0.5 * colWidth) - 10;
    this.y = (y * rowHeight) + (0.5 * rowHeight) + 73;
    this.sprite = 'images/big-coin.png';
};
/*
* Draw a coin object using canvas drawImage
*/
Coin.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
/*
* Dash pseudoclass representing the score board
*/
var Dash = function(time) {
    this.score = 0;
    this.time = time;
    this.coins = 0;
    this.sprite = 'images/small-coin.png';
};
/*
* Draw the score board elements
*/
Dash.prototype.render = function() {
    // Center-align the canvas context
    ctx.textAlign = 'center';
    // Set the context font style
    ctx.font = "12px pixel-emulator";
    // Set the text color
    ctx.fillStyle = "#e4fffa";
    // Draw the dash elements
    ctx.fillText("MARIO", 50, 25);
    ctx.fillText(this.score, 50, 40);
    ctx.drawImage(Resources.get(this.sprite), 354, 29);
    ctx.fillText('x', 374, 40);
    ctx.fillText(this.coins, 390, 40);
    ctx.fillText("WORLD", 758, 25);
    ctx.fillText("F-1", 758, 40);
};
/*
* Array of instantiated enemies objects
*/
var allEnemies = [
    new Enemy(-100, 1, 8),
    new Enemy(-100, 2, 12),
    new Enemy(-800, 3, 11),
    new Enemy(-700, 4, 15),
    new Enemy(-300, 4, 9),
    new Enemy(-500, 1, 10)
];
/*
* Array of instantiated clouds objects
*/
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
/*
* Array of instantiated coins objects
*/
var allCoins = (function() {
    var coins = [];
    for (var i = 0; i < numRows; i++) {
        console.log(i);
        for (var j = 0; j < (numCols - 2); j++) {
            coins.push(new Coin(i, j));
        }
    }
    return coins;
})();
// Instantiate a new player object
var player = new Player();
// Instantiate a new Dash object
var dash = new Dash();
/*
* Helper function to map the keyCode returned by the event Listener to their respective
* string representations
*/
document.addEventListener('keyup', function(e) {
    var keys = {
        38: 'up',
        40: 'down',
        37: 'left',
        39: 'right'
    };
    player.handleInputKey(keys[e.keyCode]);
});
