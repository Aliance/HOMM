var CONST_WALKABLE = 0;
var CONST_NOT_WALKABLE = 1;
var CONST_TEMPORARY_NOT_WALKABLE = 2;

var Game = {
    grid: {
        rows: 8, // height / y
        cols: 10, // width / x
        tile: {
            size:  32,
            width:  32,
            height: 32
        },
        /**
         * Матрица проходимости для pathfinding. 0 - проходимая, 1 - нет.
         */
        matrix: [],
        /**
         * Матрица размещения объектов. 0 - проходимая, 1 - нет, 2 - временно не проходимая.
         * Клетка может быть временно непроходимой если там находится объект, с которым может быть взаимодействие.
         */
        objectMatrix: []
    },
    gridComponent: {},
    finderComponent: new PF.AStarFinder({
        allowDiagonal: true
    }),
    components: {
        border: {
            tile: {
                width:  32,
                height: 32
            },
            zIndex: 1
        },
        grass: {
            tile: {
                width:  32,
                height: 32
            },
            zIndex: 2
        },
        movement: {
            zIndex: 4,
            map: {
                'movement-available': [0, 0]
            }
        },
        resource: {
            tile: {
                width:  32,
                height: 32
            },
            zIndex: 3,
            animation: [],
            animationDuration: 1500,
            getMap: function() {
                var positions = {};

                positions['shining--gold']           = [0, 0];
                positions['shining--treasure-chest'] = [0, 1];
                positions['shining--sulphur']        = [0, 2];
                positions['shining--mercury']        = [1, 2];
                positions['shining--wood']           = [2, 2];
                positions['shining--ore']            = [3, 2];
                positions['shining--gem']            = [0, 3];
                positions['shining--crystal']        = [0, 4];

                return positions;
            },
            createAnimation: function() {
                var createAnimationMap = function(from, to, y) {
                    var map = [];

                    for (var i = from; i <= to; i++) {
                        map.push([i, y]);
                    }

                    return map;
                };

                Game.components.resource.animation['gold']           = createAnimationMap(0, 7, 0);
                Game.components.resource.animation['treasure-chest'] = createAnimationMap(0, 7, 1);
                Game.components.resource.animation['gem']            = createAnimationMap(0, 7, 3);
                Game.components.resource.animation['crystal']        = createAnimationMap(0, 7, 4);
            }
        },
        treasureChest: {
            tile: {
                width:  32,
                height: 32
            },
            zIndex: 3
        },
        hero: {
            tile: {
                width:  50,
                height: 59
            },
            zIndex: 100,
            movement: 32,
            moveDuration: 500,
            skinPrefix: 'hero_',
            type: [
                //'alchemist',
                //'barbarian',
                //'battle-mage',
                //'beastmaster',
                //'cleric',
                //'death-knight',
                //'demoniac',
                //'druid',
                //'heretic',
                'knight',
                //'necromancer',
                //'overlord',
                //'ranger',
                //'warlock',
                //'witch'
            ],
            animation: [],
            getMap: function(type) {
                var positions = {};

                positions[type + '--move--right']  = [0, 0];
                positions[type + '--move--left']   = [0, 1];
                positions[type + '--move--bottom'] = [0, 2];
                positions[type + '--move--top']    = [0, 3];

                return positions;
            },
            createAnimation: function() {
                var createAnimationMap = function(from, to, y) {
                    var map = [];

                    for (var i = from; i <= to; i++) {
                        map.push([i, y]);
                    }

                    return map;
                };

                Game.components.hero.animation['walk_right']  = createAnimationMap(0, 7, 0);
                Game.components.hero.animation['walk_left']   = createAnimationMap(0, 7, 1);
                Game.components.hero.animation['walk_bottom'] = createAnimationMap(0, 7, 2);
                Game.components.hero.animation['walk_top']    = createAnimationMap(0, 7, 3);
            }
        }
    },

    width: function() {
        return this.grid.cols * this.grid.tile.width;
    },

    height: function() {
        return this.grid.rows * this.grid.tile.height;
    },

    start: function() {
        $container.empty();

        Crafty.init(Game.width(), Game.height(), $container.get(0));

        Crafty.enterScene('Loading');
    },

    locateLandscape: function(entity, x, y) {
        Game.grid.matrix[y][x] = CONST_NOT_WALKABLE;
        Game.grid.objectMatrix[y][x] = CONST_NOT_WALKABLE;

        return this.locateEntity(entity, x, y);
    },

    locateItem: function(entity, x, y) {
        Game.grid.matrix[y][x] = CONST_NOT_WALKABLE;
        Game.grid.objectMatrix[y][x] = CONST_TEMPORARY_NOT_WALKABLE;

        return this.locateEntity(entity, x, y);
    },

    locateTerrain: function(entity, x, y) {
        Game.grid.matrix[y][x] = CONST_WALKABLE;
        Game.grid.objectMatrix[y][x] = CONST_WALKABLE;

        return this.locateEntity(entity, x, y);
    },

    locateEntity: function(entity, x, y) {
        console.log('%s - %s, %s', entity, x, y);

        return Crafty.e(entity).at(x, y);
    }
};
