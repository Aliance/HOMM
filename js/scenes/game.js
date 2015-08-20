Crafty.defineScene('Game', function() {
    Game.grid.matrix = new Array(Game.grid.rows);
    Game.grid.objectMatrix = new Array(Game.grid.rows);

    for (var y = 0; y < Game.grid.rows; y++) {
        Game.grid.matrix[y] = new Array(Game.grid.cols);
        Game.grid.objectMatrix[y] = new Array(Game.grid.cols);

        for (var x = 0; x < Game.grid.cols; x++) {
            var terrain, from, to, angle = 0, flip = null;

            if (typeof mapData.landscape.terrain[y] === 'undefined') {
                mapData.landscape.terrain[y] = new Array(x);
            }

            if (typeof mapData.landscape.terrain[y][x] === 'undefined') {
                mapData.landscape.terrain[y][x] = CONST_LANDSCAPE_TILE_WATER;
            }

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

            // RIVERS


            if (typeof mapData.landscape.rivers[x] !== 'undefined' && typeof mapData.landscape.rivers[x][y] !== 'undefined') {
                var river = mapData.landscape.rivers[x][y],
                    riverType = null,
                    riverTile = 0,
                    riverFlip = [];

                if (river & CONST_RIVER_TYPE_NORMAL) {
                    riverType = 'normal';
                } else if (river & CONST_RIVER_TYPE_ICY) {
                    riverType = 'icy';
                } else if (river & CONST_RIVER_TYPE_LAVA) {
                    riverType = 'lava';
                } else if (river & CONST_RIVER_TYPE_DIRTY) {
                    riverType = 'dirty';
                } else {
                    console.log('river type not found at %d, %d', x, y);
                    Crafty.enterScene('Error');
                    throw new Error('river landscape error');
                }

                if (river & CONST_RIVER_FLIP_X) {
                    riverFlip.push('X');
                }
                if (river & CONST_RIVER_FLIP_Y) {
                    riverFlip.push('Y');
                }

                if (river & CONST_RIVER_TILE_CORNER) {
                    riverTile = Crafty.math.randomInt(1, 4);
                } else if (river & CONST_RIVER_TILE_CROSS) {
                    riverTile = 5;
                } else if (river & CONST_RIVER_TILE_HORIZONTAL_CORNER) {
                    riverTile = Crafty.math.randomInt(6, 7);
                } else if (river & CONST_RIVER_TILE_VERTICAL_CORNER) {
                    riverTile = Crafty.math.randomInt(8, 9);
                } else if (river & CONST_RIVER_TILE_VERTICAL) {
                    riverTile = Crafty.math.randomInt(10, 11);
                } else if (river & CONST_RIVER_TILE_HORIZONTAL) {
                    riverTile = Crafty.math.randomInt(12, 13);
                }

                Game.locateRiver(riverType, x, y).placeRandomTile(riverType, riverTile, riverFlip);
            }

            // ROADS
            if (typeof mapData.landscape.roads[x] !== 'undefined' && typeof mapData.landscape.roads[x][y] !== 'undefined') {
                var road = mapData.landscape.roads[x][y],
                    roadType = null,
                    roadTile = 0,
                    roadFlip = [];

                if (road & CONST_ROAD_TYPE_COBBLESTONE) {
                    roadType = 'cobblestone';
                } else if (road & CONST_ROAD_TYPE_GRAVEL) {
                    roadType = 'gravel';
                } else if (road & CONST_ROAD_TYPE_DIRT) {
                    roadType = 'dirt';
                } else {
                    console.log('road type not found at %d, %d', x, y);
                    Crafty.enterScene('Error');
                    throw new Error('road landscape error');
                }

                if (road & CONST_ROAD_FLIP_X) {
                    roadFlip.push('X');
                }
                if (road & CONST_ROAD_FLIP_Y) {
                    roadFlip.push('Y');
                }

                if (road & CONST_ROAD_TILE_CORNER) {
                    roadTile = Crafty.math.randomInt(1, 2);
                } else if (road & CONST_ROAD_TILE_DIAGONAL) {
                    roadTile = Crafty.math.randomInt(3, 6);
                } else if (road & CONST_ROAD_TILE_VERTICAL_CORNER) {
                    roadTile = Crafty.math.randomInt(7, 8);
                } else if (road & CONST_ROAD_TILE_HORIZONTAL_CORNER) {
                    roadTile = Crafty.math.randomInt(9, 10);
                } else if (road & CONST_ROAD_TILE_VERTICAL) {
                    roadTile = Crafty.math.randomInt(11, 12);
                } else if (road & CONST_ROAD_TILE_HORIZONTAL) {
                    roadTile = Crafty.math.randomInt(13, 14);
                } else if (road & CONST_ROAD_TILE_VERTICAL_END) {
                    roadTile = 15;
                } else if (road & CONST_ROAD_TILE_HORIZONTAL_END) {
                    roadTile = 16;
                } else if (road & CONST_ROAD_TILE_CROSS) {
                    roadTile = 17;
                }

                Game.locateRoad(roadType, x, y).placeRandomTile(roadType, roadTile, roadFlip);
            }
        }
    }

    Game.locateHero(Crafty.math.randomElementOfArray(Game.components.hero.type), 12, 8);

    Game.locateItem('crystal', 11, 11);
    Game.locateItem('gold', 10, 11);
    Game.locateItem('gem', 10, 10);
    Game.locateItem('chest', 9, 10);
    Game.locateItem('sulphur', 10, 5);
    Game.locateItem('ore', 10, 2);
    Game.locateItem('wood', 10, 4);
    Game.locateItem('mercury', 10, 3);

    var townType = Crafty.math.randomElementOfArray(Game.components.town.type);
    Game.locateTown(townType, 12, 7);

    var townType = Crafty.math.randomElementOfArray(Game.components.town.type);
    Game.locateTown(townType, 4, 6);

    Game.locateObject('obj1', 15, 7);

    //Game.locateMine(Crafty.math.randomElementOfArray(Game.components.mine.type), 8, 3);

    Game.locateCreature('lazure', 6, 8);
});
