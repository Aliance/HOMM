Crafty.defineScene('Game', function() {
    Game.grid.matrix = new Array(Game.grid.rows);
    Game.grid.objectMatrix = new Array(Game.grid.rows);

    for (var y = 0; y < Game.grid.rows; y++) {
        Game.grid.matrix[y] = new Array(Game.grid.cols);
        Game.grid.objectMatrix[y] = new Array(Game.grid.cols);

        for (var x = 0; x < Game.grid.cols; x++) {
            var terrain, from, to, angle = 0;
            switch (mapData.landscape.terrain[y][x]) {
                // 1 - 24
                case CONST_LANDSCAPE_TILE_GRASS:
                    terrain = 'grass';
                    from = 1;
                    to = 24;
                    break;
                // 25 - 59
                // 60 - 63
                case CONST_LANDSCAPE_TILE_GRASS_COAST_CORNER_NW:
                case CONST_LANDSCAPE_TILE_GRASS_COAST_CORNER_NE:
                case CONST_LANDSCAPE_TILE_GRASS_COAST_CORNER_SE:
                case CONST_LANDSCAPE_TILE_GRASS_COAST_CORNER_SW:
                    terrain = 'grass';
                    from = 60;
                    to = 63;
                    switch (mapData.landscape.terrain[y][x]) {
                        case CONST_LANDSCAPE_TILE_GRASS_COAST_CORNER_NW:
                            angle = 0;
                            break;
                        case CONST_LANDSCAPE_TILE_GRASS_COAST_CORNER_NE:
                            angle = 90;
                            break;
                        case CONST_LANDSCAPE_TILE_GRASS_COAST_CORNER_SE:
                            angle = 180;
                            break;
                        case CONST_LANDSCAPE_TILE_GRASS_COAST_CORNER_SW:
                            angle = 270;
                            break;
                    }
                    break;
                // 64 - 67
                case CONST_LANDSCAPE_TILE_GRASS_VERTICAL_COAST:
                case CONST_LANDSCAPE_TILE_GRASS_VERTICAL_COAST_RIGHT:
                    terrain = 'grass';
                    from = 64;
                    to = 67;
                    angle = mapData.landscape.terrain[y][x] == CONST_LANDSCAPE_TILE_GRASS_VERTICAL_COAST_RIGHT ? 180 : 0;
                    break;
                // 68 - 71
                case CONST_LANDSCAPE_TILE_GRASS_HORIZONTAL_COAST:
                case CONST_LANDSCAPE_TILE_GRASS_HORIZONTAL_COAST_DOWN:
                    terrain = 'grass';
                    from = 68;
                    to = 71;
                    angle = mapData.landscape.terrain[y][x] == CONST_LANDSCAPE_TILE_GRASS_HORIZONTAL_COAST_DOWN ? 180 : 0;
                    break;
                case CONST_LANDSCAPE_TILE_WATER_VERTICAL_COAST:
                case CONST_LANDSCAPE_TILE_WATER_VERTICAL_COAST_RIGHT:
                    terrain = 'water';
                    from = 5;
                    to = 8;
                    angle = mapData.landscape.terrain[y][x] == CONST_LANDSCAPE_TILE_WATER_VERTICAL_COAST_RIGHT ? 180 : 0;
                    break;
                // 9 - 12
                case CONST_LANDSCAPE_TILE_WATER_HORIZONTAL_COAST:
                case CONST_LANDSCAPE_TILE_WATER_HORIZONTAL_COAST_DOWN:
                    terrain = 'water';
                    from = 9;
                    to = 12;
                    angle = mapData.landscape.terrain[y][x] == CONST_LANDSCAPE_TILE_WATER_HORIZONTAL_COAST_DOWN ? 180 : 0;
                    break;
                // 13 - 16
                case CONST_LANDSCAPE_TILE_WATER_CORNER_SMALL_NW:
                case CONST_LANDSCAPE_TILE_WATER_CORNER_SMALL_NE:
                case CONST_LANDSCAPE_TILE_WATER_CORNER_SMALL_SE:
                case CONST_LANDSCAPE_TILE_WATER_CORNER_SMALL_SW:
                    terrain = 'water';
                    from = 13;
                    to = 16;
                    switch (mapData.landscape.terrain[y][x]) {
                        case CONST_LANDSCAPE_TILE_WATER_CORNER_SMALL_NW:
                            angle = 0;
                            break;
                        case CONST_LANDSCAPE_TILE_WATER_CORNER_SMALL_NE:
                            angle = 90;
                            break;
                        case CONST_LANDSCAPE_TILE_WATER_CORNER_SMALL_SE:
                            angle = 180;
                            break;
                        case CONST_LANDSCAPE_TILE_WATER_CORNER_SMALL_SW:
                            angle = 270;
                            break;
                    }
                    break;
                // 17 - 18
                /*case CONST_LANDSCAPE_TILE_WATER_CORNER_BIG:
                    terrain = 'water';
                    from = 17;
                    to = 18;
                    break;
                // 19 - 20
                case CONST_LANDSCAPE_TILE_WATER_CORNER_BIG_SMALL:
                    terrain = 'water';
                    from = 19;
                    to = 20;
                    break;
                */
                // 21 - 33
                case CONST_LANDSCAPE_TILE_WATER:
                    terrain = 'water';
                    from = 21;
                    to = 33;
                    break;
                default:
                    console.log('landscape not found at %d, %d', x, y);
                    Crafty.enterScene('Error');
                    throw new Error('map landscape error');
            }
            Game.locateLandscape('landscape', x, y, angle).placeRandomTerrain(terrain, from, to, angle);
        }
    }

    Game.locateItem('hero', 4, 2).setType(Crafty.math.randomElementOfArray(Game.components.hero.type).toString()).stand('right');
    Game.locateItem('treasure-chest', 6, 2);
    Game.locateItem('gold', 8, 2);

    Game.locateItem('gem', 4, 4);
    Game.locateItem('crystal', 6, 4);
    Game.locateItem('sulphur', 8, 4);

    Game.locateItem('mercury', 4, 6);
    Game.locateItem('wood', 6, 6);
    Game.locateItem('ore', 8, 6);
});
