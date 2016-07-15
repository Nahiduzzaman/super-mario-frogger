/**
 * The Engine.js provides the loop functionality by updating and rendering. it draws the gameboard
 *  on the screen, the calls the render and update methods on all the elements of the game.
 */
var Engine = (function(global) {
    /**
     * Predefine the variables used within the scope
     * and adds the canvas element to the DOM
     */
    var doc = global.document,
        win = global.window,
        can = doc.createElement('canvas'),
        ctx = can.getContext('2d'),
        lastTime;

    can.width = 808;
    can.height = 808;
    doc.body.appendChild(can);

    /**
     * The entry point of the game loop, it calls both update and render methods
     */
    function main() {
        /**
         * Calculate the time delta to allow smooth animation independently of processing power of
         *  the user's device
         */
        var now = Date.now(),
            dt = (now - lastTime) / 1000.0;
        /**
         * Call the update and render methods
         */
        update(dt);
        render();
        /**
         * Set the value of lastTime to now after the render and update are called, to calculate the
         * time delta dt at the next call of main
         */
        lastTime = now;
        /**
         * literally asking the browser to recursively run main wheneever it is possible :)
         */
        win.requestAnimationFrame(main);
    }

    /**
    * initial setup of the lasTime value, can be used to intialize the game loop
    */
    function init() {
        lastTime = Date.now();
        main();
    }

    /**
     * Called by the function main to update the game elemets data and to check for collisions
     * between the player and other entities
     */
    function update(dt) {
        updateEntities(dt);
        checkCollisions();
    }

    /**
     * Use the function collided to detect collisions and then updates the elements data
     */
    function checkCollisions() {
        allEnemies.forEach(function(enemy) {
            if (collided(player, enemy)) {
                // Send the player to the predefined bottom bound in case of collision with an enemy
                player.y = bounds.bottom;
            }
        });
        allCoins.forEach(function(coin) {
            if (collided(player, coin)) {
                // Remove the coin object froom the coins array in case of collision with the player
                allCoins.splice(allCoins.indexOf(coin), 1);
                //
                dash.coins++;
                // Increment with 100 the score value of the game board
                dash.score += 100;
            }
        });
    }

    /**
     * Check if two elements exist at the same place at the same time to detect collision
     */
    function collided(player, entity) {
        var collided = false;
        if (Math.abs(player.x - entity.x) < collisionTolerance.x) {
            if (Math.abs(player.y - entity.y) < collisionTolerance.y) {
                collided = true;
            }
        }
        return collided;
    }

    /**
     * Call the update method on all game elements to update their data
     */
    function updateEntities(dt) {
        allClouds.forEach(function(cloud) {
            cloud.update(dt);
        });
        allEnemies.forEach(function(enemy) {
            enemy.update(dt);
        });
        player.update();
    }

    /**
     * Draw the game board elements and call the render method on the game elements
     */
    function render() {
        /**
         * Array representing a single column of the game board
         */
        var rowImages = [
                'images/plain-sky-block.png',
                'images/bridge-block.png',
                'images/bridge-block.png',
                'images/bridge-block.png',
                'images/bridge-block.png',
                'images/bridge-block.png',
                'images/ground-block.png',
                'images/plain-ground-block.png',
                'images/cloud.png'
            ],
            // Number of rows of the game board
            rows = numRows,
            // Number of columns of the game board
            cols = numCols,
            // Rows and columns counters used to loop through the number of rows and columns
            row, col;

        /**
         * Loop through the rows and columns, and draw the correspondig image of each grid element        */
        for (row = 0; row < rows; row++) {
            for (col = 0; col < cols; col++) {
                ctx.drawImage(Resources.get(rowImages[row]), col * colWidth, row * rowHeight);
            }
        }

        /**
         * Render the game dash
         */
        dash.render();
        /**
         * Render the player and other game elements
         */
        renderEntities();
    }

    function renderEntities() {
        /**
         * Loop through the clouds objects array and call render method on each of them
         */
        allClouds.forEach(function(cloud) {
            cloud.render();
        });
        /**
         * Loop through the coins objects array and call render method on each of them
         */
        allCoins.forEach(function(coin) {
            coin.render();
        });
        /**
         * Loop through the enemies objects array and call render method on each of them
         */
        allEnemies.forEach(function(enemy) {
            enemy.render();
        });
        /**
         * Render the player
         */
        player.render();

    }

    /**
     * Load the images required by the game engine before initializing the game to make sure they
     * properly loaded and cached for future uses
     * Check the resources.js file for more details about the mechanism
     */
    Resources.load([
        'images/plain-sky-block.png',
        'images/sky-block.png',
        'images/bridge-block.png',
        'images/ground-block.png',
        'images/plain-ground-block.png',
        'images/goomba.png',
        'images/mario-right.png',
        'images/mario-left.png',
        'images/small-cloud.png',
        'images/big-cloud.png',
        'images/big-coin.png',
        'images/small-coin.png'
    ]);
    Resources.onReady(init);
    /**
     * Assign the context variable to the global object in order to use it within app.js
     */
    global.ctx = ctx;
})(this);
