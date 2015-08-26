Crafty.defineScene('Game', function() {
    $container.empty();

    Crafty.viewport.init(Game.grid.tileSize * 17, Game.grid.tileSize * 17, $container.get(0));
    Crafty.canvas.init(Game.width(), Game.height());

    Crafty.background('#000');

    Game.towns = [];
    Game.activeTown = null;
    Game.heroes = [];
    Game.activeHero = null;

    Game.grid.matrix = new Array(Game.grid.rows);
    Game.grid.objectMatrix = new Array(Game.grid.rows);

    for (var y = 0; y < Game.grid.rows; y++) {
        Game.grid.matrix[y] = new Array(Game.grid.cols);
        Game.grid.objectMatrix[y] = new Array(Game.grid.cols);
    }

    for (var y = 0; y < Game.grid.rows; y++) {
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

            // OBJECTS
            if (typeof mapData.landscape.objects[x] !== 'undefined' && typeof mapData.landscape.objects[x][y] !== 'undefined') {
                Game.locateObject(mapData.landscape.objects[x][y], x, y);
            }

            // TOWNS
            if (typeof mapData.towns[x] !== 'undefined' && typeof mapData.towns[x][y] !== 'undefined') {
                var townData = mapData.towns[x][y],
                    townType = null;

                if (townData & CONST_TOWN_TYPE_CASTLE) {
                    townType = 'castle';
                } else if (townData & CONST_TOWN_TYPE_RAMPART) {
                    townType = 'rampart';
                } else if (townData & CONST_TOWN_TYPE_TOWER) {
                    townType = 'tower';
                } else if (townData & CONST_TOWN_TYPE_INFERNO) {
                    townType = 'inferno';
                } else if (townData & CONST_TOWN_TYPE_NECROPOLIS) {
                    townType = 'necropolis';
                } else if (townData & CONST_TOWN_TYPE_DUNGEON) {
                    townType = 'dungeon';
                } else if (townData & CONST_TOWN_TYPE_STRONGHOLD) {
                    townType = 'stronghold';
                } else if (townData & CONST_TOWN_TYPE_FORTRESS) {
                    townType = 'fortress';
                } else if (townData & CONST_TOWN_TYPE_CONFLUX) {
                    townType = 'conflux';
                } else {
                    console.log('town type not found at %d, %d', x, y);
                    Crafty.enterScene('Error');
                    throw new Error('town error');
                }

                var town = Game.locateTown(townType, x, y);

                if (townData & CONST_TOWN_BUILDINGS_FORT) {
                    town.buildFort();

                    if (townData & CONST_TOWN_BUILDINGS_CAPITOL) {
                        town.buildCapitol();
                    }
                }
            }

            // HEROES
            if (typeof mapData.heroes[x] !== 'undefined' && typeof mapData.heroes[x][y] !== 'undefined') {
                var heroData = mapData.heroes[x][y],
                    heroSkin = null,
                    heroType = null;

                if (heroData & CONST_HERO_VALESKA) {
                    heroSkin = 'valeska';
                    heroType = 'knight';
                }/* else if (heroData & CONST_HERO_TYPE_CLERIC) {
                    heroType = 'cleric';
                } else if (heroData & CONST_HERO_TYPE_RANGER) {
                    heroType = 'ranger';
                } else if (heroData & CONST_HERO_TYPE_DRUID) {
                    heroType = 'druid';
                } else if (heroData & CONST_HERO_TYPE_ALCHEMIST) {
                    heroType = 'alchemist';
                } else if (heroData & CONST_HERO_TYPE_WIZARD) {
                    heroType = 'wizard';
                } else if (heroData & CONST_HERO_TYPE_HERETIC) {
                    heroType = 'heretic';
                } else if (heroData & CONST_HERO_TYPE_DEMONIAC) {
                    heroType = 'demoniac';
                } else if (heroData & CONST_HERO_TYPE_DEATH_KNIGHT) {
                    heroType = 'death-knight';
                } else if (heroData & CONST_HERO_TYPE_NECROMANCER) {
                    heroType = 'necromancer';
                } else if (heroData & CONST_HERO_TYPE_OVERLORD) {
                    heroType = 'overlord';
                } else if (heroData & CONST_HERO_TYPE_WARLOCK) {
                    heroType = 'warlock';
                } else if (heroData & CONST_HERO_TYPE_BARBARIAN) {
                    heroType = 'barbarian';
                } else if (heroData & CONST_HERO_TYPE_BATTLE_MAGE) {
                    heroType = 'battle_mage';
                } else if (heroData & CONST_HERO_TYPE_BEASTMASTER) {
                    heroType = 'beastmaster';
                } else if (heroData & CONST_HERO_TYPE_WITCH) {
                    heroType = 'witch';
                } else if (heroData & CONST_HERO_TYPE_ELEMENTALIST) {
                    heroType = 'elementalist';
                } else if (heroData & CONST_HERO_TYPE_PLANESWALKER) {
                    heroType = 'planeswalker';
                }*/ else {
                    console.log('hero type not found at %d, %d', x, y);
                    Crafty.enterScene('Error');
                    throw new Error('hero error');
                }

                Game.locateHero(heroSkin, heroType, x, y);
            }

            // RESOURCES
            if (typeof mapData.resources[x] !== 'undefined' && typeof mapData.resources[x][y] !== 'undefined') {
                var resourceData = mapData.resources[x][y],
                    resourceType = null;

                if (resourceData & CONST_RESOURCE_TYPE_CHEST) {
                    resourceType = 'chest';
                } else if (resourceData & CONST_RESOURCE_TYPE_GOLD) {
                    resourceType = 'gold';
                } else if (resourceData & CONST_RESOURCE_TYPE_WOOD) {
                    resourceType = 'wood';
                } else if (resourceData & CONST_RESOURCE_TYPE_ORE) {
                    resourceType = 'ore';
                } else if (resourceData & CONST_RESOURCE_TYPE_GEM) {
                    resourceType = 'gem';
                } else if (resourceData & CONST_RESOURCE_TYPE_CRYSTAL) {
                    resourceType = 'crystal';
                } else if (resourceData & CONST_RESOURCE_TYPE_MERCURY) {
                    resourceType = 'mercury';
                } else if (resourceData & CONST_RESOURCE_TYPE_SULPHUR) {
                    resourceType = 'sulphur';
                } else {
                    console.log('resource type not found at %d, %d', x, y);
                    Crafty.enterScene('Error');
                    throw new Error('resource error');
                }

                Game.locateItem(resourceType, x, y);
            }

            // CREATURES
            if (typeof mapData.creatures[x] !== 'undefined' && typeof mapData.creatures[x][y] !== 'undefined') {
                var creatureData = mapData.creatures[x][y],
                    creatureType = null;

                if (creatureData & CONST_CREATURE_SPECIAL_AZURE_DRAGON) {
                    creatureType = 'azure-dragon';
                }/* else if (creatureData & CONST_CREATURE_SPECIAL_AZURE_DRAGON) {
                    creatureType = '';
                }*/ else {
                    console.log('creature type not found at %d, %d', x, y);
                    Crafty.enterScene('Error');
                    throw new Error('creature error');
                }

                Game.locateCreature(creatureType, x, y);
            }
        }
    }

    //Game.locateMine(Crafty.math.randomElementOfArray(Game.components.mine.type), 8, 3);
});
