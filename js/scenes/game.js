Crafty.defineScene('Game', function() {
    Game.grid.matrix = new Array(Game.grid.rows);
    Game.grid.objectMatrix = new Array(Game.grid.rows);

    for (var y = 0; y < Game.grid.rows; y++) {
        Game.grid.matrix[y] = new Array(Game.grid.cols);
        Game.grid.objectMatrix[y] = new Array(Game.grid.cols);

        for (var x = 0; x < Game.grid.cols; x++) {
            var terrain, from, to, angle = 0, flip = null;
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
                            flip = 'X';
                            break;
                        case CONST_LANDSCAPE_TILE_GRASS_COAST_CORNER_SE:
                            angle = 180;
                            break;
                        case CONST_LANDSCAPE_TILE_GRASS_COAST_CORNER_SW:
                            flip = 'Y';
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
                            flip = 'X';
                            break;
                        case CONST_LANDSCAPE_TILE_WATER_CORNER_SMALL_SE:
                            angle = 180;
                            break;
                        case CONST_LANDSCAPE_TILE_WATER_CORNER_SMALL_SW:
                            flip = 'Y';
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
            // TODO: water => unwalkable
            Game.locateLandscape('landscape', x, y, angle).placeRandomTerrain(terrain, from, to, angle, flip);
        }
    }

    Game.locateItem('hero', 12, 8).setType(Crafty.math.randomElementOfArray(Game.components.hero.type).toString()).stand('right');

    Game.locateItem('treasure-chest', 9, 10);
    Game.locateItem('gem', 10, 10);
    Game.locateItem('gold', 10, 11);
    Game.locateItem('crystal', 11, 11);
    Game.locateItem('mercury', 3, 3);
    Game.locateItem('wood', 4, 4);
    Game.locateItem('ore', 5, 5);
    Game.locateItem('sulphur', 6, 6);

    Game.locateTown(Crafty.math.randomElementOfArray(Game.components.town.type).toString(), 12, 7);

    Game.locateObject('obj1', 15, 7);

    Game.locateCreature('lazure', 6, 8);
});
