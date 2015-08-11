var CONST_WALKABLE = 0;
var CONST_NOT_WALKABLE = 1;
var CONST_TEMPORARY_NOT_WALKABLE = 2;

var createComponentMap = function(prefix, to) {
    var map = {};

    for (var i = 1; i <= to; i++) {
        map[prefix + '-' + i] = [i - 1, 0];
    }

    return map;
};

var Game = {
    grid: {
        /**
         *  S: 36*36
         *  M: 72*72
         *  L: 108*108
         * XL: 144*144
         */
        rows: 14, // height / y
        cols: 20, // width / x
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
        dirt: {
            map: createComponentMap('dirt', 46)
        },
        grass: {
            map: createComponentMap('grass', 79)
        },
        lava: {
            map: createComponentMap('lava', 79)
        },
        rock: {
            map: createComponentMap('rock', 48)
        },
        rough: {
            map: createComponentMap('rough', 79)
        },
        sand: {
            map: createComponentMap('sand', 24)
        },
        snow: {
            map: createComponentMap('snow', 79)
        },
        subbtl: {
            map: createComponentMap('subbtl', 79)
        },
        swamp: {
            map: createComponentMap('swamp', 79)
        },
        water: {
            map: createComponentMap('water', 33)
        },
        movement: {
            map: {
                'movement--available--target'                 : [0 , 0],
                'movement--available--top-right--top'         : [1 , 0],
                'movement--available--right--top-right'       : [2 , 0],
                'movement--available--bottom-right--right'    : [3 , 0],
                'movement--available--bottom--bottom-right'   : [4 , 0],
                'movement--available--bottom-left--bottom'    : [5 , 0],
                'movement--available--left--bottom-left'      : [6 , 0],
                'movement--available--top-left--left'         : [7 , 0],
                'movement--available--top--top-left'          : [8 , 0],
                'movement--available--top-right--top-left'    : [1 , 0], // hack
                'movement--available--top'                    : [9 , 0],
                'movement--available--top-right'              : [10, 0],
                'movement--available--right'                  : [11, 0],
                'movement--available--bottom-right'           : [12, 0],
                'movement--available--bottom'                 : [13, 0],
                'movement--available--bottom-left'            : [14, 0],
                'movement--available--left'                   : [15, 0],
                'movement--available--top-left'               : [16, 0],
                'movement--available--top-left--top'          : [17, 0],
                'movement--available--top--top-right'         : [18, 0],
                'movement--available--top-right--right'       : [19, 0],
                'movement--available--right--bottom-right'    : [20, 0],
                'movement--available--bottom-right--bottom'   : [21, 0],
                'movement--available--bottom--bottom-left'    : [22, 0],
                'movement--available--bottom-left--left'      : [23, 0],
                'movement--available--left--top-left'         : [24, 0],
                'movement--unavailable--target'               : [25, 0],
                'movement--unavailable--top-right--top'       : [26, 0],
                'movement--unavailable--right--top-right'     : [27, 0],
                'movement--unavailable--bottom-right--right'  : [28, 0],
                'movement--unavailable--bottom--bottom-right' : [29, 0],
                'movement--unavailable--bottom-left--bottom'  : [30, 0],
                'movement--unavailable--left--bottom-left'    : [31, 0],
                'movement--unavailable--top-left--left'       : [32, 0],
                'movement--unavailable--top--top-left'        : [33, 0],
                'movement--unavailable--top'                  : [34, 0]
            }
        },
        resource: {
            animation: [],
            animationDuration: 1500,
            map: {
                'shining--gold'          : [0, 0],
                'shining--treasure-chest': [0, 1],
                'shining--sulphur'       : [0, 2],
                'shining--mercury'       : [1, 2],
                'shining--wood'          : [2, 2],
                'shining--ore'           : [3, 2],
                'shining--gem'           : [0, 3],
                'shining--crystal'       : [0, 4]
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
        hero: {
            tile: {
                width:  50,
                height: 59
            },
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
        },
        town: {
            tile: {
                width:  192,
                height: 192
            },
            type: [
                'castle',
                'rampart',
                'tower',
                'inferno',
                'necropolis',
                'dungeon',
                'stronghold',
                'fortress'
            ],
            map: {
                'castle'    : [0, 0],
                'rampart'   : [1, 0],
                'tower'     : [2, 0],
                'inferno'   : [3, 0],
                'necropolis': [4, 0],
                'dungeon'   : [5, 0],
                'stronghold': [6, 0],
                'fortress'  : [7, 0],
                'castle-village'    : [0, 1],
                'rampart-village'   : [1, 1],
                'tower-village'     : [2, 1],
                'inferno-village'   : [3, 1],
                'necropolis-village': [4, 1],
                'dungeon-village'   : [5, 1],
                'stronghold-village': [6, 1],
                'fortress-village'  : [7, 1]
            }
        },
        creatures: {
            tile: {
                width:  40,
                height: 50
            },
            map: {
                'lazure': [0, 0]
            },
            animationDuration: 1500,
            animation: [],
            createAnimation: function() {
                var createAnimationMap = function(from, to, y) {
                    var map = [];

                    for (var i = from; i < to; i++) {
                        map.push([i, y]);
                    }

                    for (var i = to; i <= from; i++) {
                        map.push([i, y]);
                    }

                    return map;
                };

                Game.components.creatures.animation['motion--lazure']  = createAnimationMap(0, 5, 0);
            }
        },
        object: {
            tile: {
                width:  64,
                height: 32
            },
            map: {
                'obj1': [0, 0]
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

    locateCreature: function(entityType, x, y) {
        for (var _x = x - 1; _x <= x + 1; _x++) {
            for (var _y = y - 1; _y <= y + 1; _y++) {
                Game.markTileTemporaryUnwalkable(_x, y);
            }
        }

        var entity = this.locateEntity('creature', x, y).addComponent(entityType);

        entity.addComponent('SpriteAnimation')
              .reel('motion', Game.components.creatures.animationDuration, Game.components.creatures.animation['motion--' + entityType])
              .animate('motion', -1);

        return entity;
    },

    locateTown: function(entity, x, y) {
        Game.markTileUnwalkable(x-1, y-2);
        Game.markTileUnwalkable(x,   y-2);
        Game.markTileUnwalkable(x+1, y-2);

        Game.markTileUnwalkable(x-2, y-1);
        Game.markTileUnwalkable(x-1, y-1);
        Game.markTileUnwalkable(x,   y-1);
        Game.markTileUnwalkable(x+1, y-1);
        Game.markTileUnwalkable(x+2, y-1);

        Game.markTileUnwalkable(x-2, y);
        Game.markTileUnwalkable(x-1, y);
        Game.markTileUnwalkable(x+1, y);
        Game.markTileUnwalkable(x+2, y);

        console.log('town: %s', entity);

        return this.locateEntity('town', x, y).addComponent(entity);
    },

    locateObject: function(entity, x, y) {
        Game.markTileUnwalkable(x, y);
        Game.markTileUnwalkable(x + 1, y);

        console.log('object: %s', entity);

        return this.locateEntity('object', x, y).addComponent(entity);
    },

    locateItem: function(entity, x, y) {
        Game.grid.matrix[y][x] = CONST_NOT_WALKABLE;
        Game.grid.objectMatrix[y][x] = CONST_TEMPORARY_NOT_WALKABLE;

        return this.locateEntity(entity, x, y);
    },

    locateLandscape: function(entity, x, y, angle) {
        Game.grid.matrix[y][x] = CONST_WALKABLE;
        Game.grid.objectMatrix[y][x] = CONST_WALKABLE;

        return this.locateEntity(entity, x, y, angle);
    },

    locateEntity: function(entity, x, y, angle) {
        console.log('%s - %s, %s', entity, x, y);

        switch (angle) {
            case 90:
                x += 1;
                break;
            case 180:
                x += 1;
                y += 1;
                break;
            case 270:
                y += 1;
                break;
        }

        return Crafty.e(entity).at(x, y);
    },

    markTileUnwalkable: function(x, y) {
        Game.grid.matrix[y][x] = CONST_NOT_WALKABLE;
        Game.grid.objectMatrix[y][x] = CONST_NOT_WALKABLE;
    },

    markTileTemporaryUnwalkable: function(x, y) {
        Game.grid.matrix[y][x] = CONST_NOT_WALKABLE;
        Game.grid.objectMatrix[y][x] = CONST_TEMPORARY_NOT_WALKABLE;
    }
};
