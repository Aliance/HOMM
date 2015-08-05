Crafty.defineScene('Game', function() {
    Game.grid.matrix = new Array(Game.grid.rows);
    Game.grid.objectMatrix = new Array(Game.grid.rows);

    for (var y = 0; y < Game.grid.rows; y++) {
        Game.grid.matrix[y] = new Array(Game.grid.cols);
        Game.grid.objectMatrix[y] = new Array(Game.grid.cols);

        for (var x = 0; x < Game.grid.cols; x++) {
            if (x == 0 || x == Game.grid.cols - 1 || y == 0 || y == Game.grid.rows - 1) {
                Game.locateLandscape('border', x, y).text(x+', '+y);
            } else {
                Game.locateTerrain('grass', x, y).text(x+', '+y);
            }
        }
    }

    Game.locateItem('treasure-chest', 4, 2);
    Game.locateItem('gold', 2, 4);
    Game.locateItem('wood', 2, 6);
    Game.locateItem('ore', 4, 6);
    Game.locateItem('gem', 4, 4);
    Game.locateItem('crystal', 6, 4);
    Game.locateItem('sulphur', 6, 2);
    Game.locateItem('mercury', 6, 6);
    Game.locateItem('hero', 2, 2).setType(Crafty.math.randomElementOfArray(Game.components.hero.type)).stand('right');
});
