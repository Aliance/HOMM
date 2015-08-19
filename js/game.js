var CONST_WALKABLE = 0;
var CONST_NOT_WALKABLE = 1;
var CONST_TEMPORARY_NOT_WALKABLE = 2;

var createComponentMap = function(prefix, to, _y) {
    var map = {};
    var y = _y || 0;

    for (var i = 1; i <= to; i++) {
        map[prefix + '-' + i] = [i - 1, y];
    }

    return map;
};

var extend = function() {
    var ret = {};
    var len = arguments.length;
    for (var i = 0; i < len; i++) {
        for (var p in arguments[i]) if (arguments[i].hasOwnProperty(p)) {
            ret[p] = arguments[i][p];
        }
    }

    return ret;
};

var Game = {
    grid: {
        /**
         *  S: 36*36
         *  M: 72*72
         *  L: 108*108
         * XL: 144*144
         */
        rows: 36, // height / y
        cols: 36, // width / x
        tileSize:  32,
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
    color: null,
    heroes: [],
    activeHero: null,
    towns: [],
    activeTown: null,
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
        road: {
            type: [
                'cobblestone',
                'gravel',
                'dirt'
            ],
            map: extend(
                createComponentMap('road--cobblestone', 17, 0),
                createComponentMap('road--gravel', 17, 1),
                createComponentMap('road--dirt', 17, 2)
            )
        },
        river: {
            type: [
                'icy',
                'lava',
                'dirty'
            ],
            map: extend(
                createComponentMap('river--icy', 13, 0),
                createComponentMap('river--lava', 13, 1),
                createComponentMap('river--dirty', 13, 2)
            )
        },
        movement: {
            map: {
                'movement--available--target'                      : [0 , 0],
                'movement--available--top-right--top'              : [1 , 0],
                'movement--available--right--top-right'            : [2 , 0],
                'movement--available--bottom-right--top-right'     : [2 , 0], // hack
                'movement--available--bottom-right--right'         : [3 , 0],
                'movement--available--bottom--bottom-right'        : [4 , 0],
                'movement--available--bottom-left--bottom-right'   : [4 , 0], // hack
                'movement--available--bottom-left--bottom'         : [5 , 0],
                'movement--available--left--bottom-left'           : [6 , 0],
                'movement--available--top-left--bottom-left'       : [6 , 0], // hack
                'movement--available--top-left--left'              : [7 , 0],
                'movement--available--top--top-left'               : [8 , 0],
                'movement--available--top-right--top-left'         : [8 , 0], // hack
                'movement--available--top'                         : [9 , 0],
                'movement--available--top-right'                   : [10, 0],
                'movement--available--right'                       : [11, 0],
                'movement--available--bottom-right'                : [12, 0],
                'movement--available--bottom'                      : [13, 0],
                'movement--available--bottom-left'                 : [14, 0],
                'movement--available--left'                        : [15, 0],
                'movement--available--top-left'                    : [16, 0],
                'movement--available--top-left--top'               : [17, 0],
                'movement--available--top--top-right'              : [18, 0],
                'movement--available--top-left--top-right'         : [18, 0], // hack
                'movement--available--top-right--right'            : [19, 0],
                'movement--available--right--bottom-right'         : [20, 0],
                'movement--available--top-right--bottom-right'     : [20, 0], // hack
                'movement--available--bottom-right--bottom'        : [21, 0],
                'movement--available--bottom--bottom-left'         : [22, 0],
                'movement--available--bottom-right--bottom-left'   : [22, 0], // hack
                'movement--available--bottom-left--left'           : [23, 0],
                'movement--available--left--top-left'              : [24, 0],
                'movement--available--bottom-left--top-left'       : [24, 0], // hack
                'movement--unavailable--target'                    : [25, 0],
                'movement--unavailable--top-right--top'            : [26, 0],
                'movement--unavailable--right--top-right'          : [27, 0],
                'movement--unavailable--bottom-right--top-right'   : [27, 0], // hack
                'movement--unavailable--bottom-right--right'       : [28, 0],
                'movement--unavailable--bottom--bottom-right'      : [29, 0],
                'movement--unavailable--bottom-left--bottom-right' : [29, 0], // hack
                'movement--unavailable--bottom-left--bottom'       : [30, 0],
                'movement--unavailable--left--bottom-left'         : [31, 0],
                'movement--unavailable--top-left--left'            : [32, 0],
                'movement--unavailable--top--top-left'             : [33, 0],
                'movement--unavailable--top-right--top-left'       : [33, 0], // hack
                'movement--unavailable--top'                       : [34, 0]
            }
        },
        mine: {
            tile: {
                width:  68,
                height: 54
            },
            type: [
                'crystal',
                'gem',
                'gold',
                'mercury',
                'ore',
                'sulphur',
                'wood'
            ],
            map: {
                'mine--crystal' : [0, 0],
                'mine--gem'     : [1, 0],
                'mine--gold'    : [2, 0],
                'mine--mercury' : [3, 0],
                'mine--ore'     : [4, 0],
                'mine--sulphur' : [5, 0],
                'mine--wood'    : [6, 0]
            }
        },
        resource: {
            tile: {
                width:  64,
                height: 32
            },
            animation: [],
            animationDuration: 1500,
            map: {
                'shining--mercury' : [0, 0],
                'shining--ore'     : [0, 1],
                'shining--sulphur' : [0, 2],
                'shining--wood'    : [0, 3],
                'shining--chest'   : [0, 4],
                'shining--crystal' : [0, 5],
                'shining--gem'     : [0, 6],
                'shining--gold'    : [0, 7]
            },
            createAnimation: function() {
                var createAnimationMap = function(from, to, y) {
                    var map = [];

                    for (var i = from; i <= to; i++) {
                        map.push([i, y]);
                    }

                    return map;
                };

                Game.components.resource.animation['chest']   = createAnimationMap(0, 7, 4);
                Game.components.resource.animation['crystal'] = createAnimationMap(0, 7, 5);
                Game.components.resource.animation['gem']     = createAnimationMap(0, 7, 6);
                Game.components.resource.animation['gold']    = createAnimationMap(0, 7, 7);
            }
        },
        hero: {
            tile: {
                width:  96,
                height: 64
            },
            movement: 32,
            moveDuration: 500,
            skinPrefix: 'hero_',
            type: [
                'alchemist',
                //'barbarian',
                //'battle-mage',
                //'beastmaster',
                'cleric',
                //'death-knight',
                'demoniac',
                'druid',
                'heretic',
                'knight',
                //'necromancer',
                //'overlord',
                'ranger',
                //'warlock',
                //'witch'
            ],
            animation: [],
            getMap: function(type) {
                var positions = {};

                positions[type + '--move--e']  = [0, 0]; // →
                positions[type + '--move--w']  = [0, 0]; // ←
                positions[type + '--move--s']  = [0, 1]; // ↓
                positions[type + '--move--n']  = [0, 2]; // ↑
                positions[type + '--move--se'] = [0, 3]; // ↘
                positions[type + '--move--sw'] = [0, 3]; // ↙
                positions[type + '--move--ne'] = [0, 4]; // ↗
                positions[type + '--move--nw'] = [0, 4]; // ↖

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

                Game.components.hero.animation['walk_e']  = createAnimationMap(0, 8, 0); // →
                Game.components.hero.animation['walk_w']  = createAnimationMap(0, 8, 0); // ←
                Game.components.hero.animation['walk_s']  = createAnimationMap(0, 8, 1); // ↓
                Game.components.hero.animation['walk_n']  = createAnimationMap(0, 8, 2); // ↑
                Game.components.hero.animation['walk_se'] = createAnimationMap(0, 8, 3); // ↘
                Game.components.hero.animation['walk_sw'] = createAnimationMap(0, 8, 3); // ↙
                Game.components.hero.animation['walk_ne'] = createAnimationMap(0, 8, 4); // ↗
                Game.components.hero.animation['walk_nw'] = createAnimationMap(0, 8, 4); // ↖
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
                'fortress',
                'conflux'
            ],
            map: {
                'castle-village'    : [0, 0],
                'rampart-village'   : [0, 1],
                'tower-village'     : [0, 2],
                'inferno-village'   : [0, 3],
                'necropolis-village': [0, 4],
                'dungeon-village'   : [0, 5],
                'stronghold-village': [0, 6],
                'fortress-village'  : [0, 7],
                'conflux-village'   : [0, 8],
                'castle'    : [1, 0],
                'rampart'   : [1, 1],
                'tower'     : [1, 2],
                'inferno'   : [1, 3],
                'necropolis': [1, 4],
                'dungeon'   : [1, 5],
                'stronghold': [1, 6],
                'fortress'  : [1, 7],
                'conflux'   : [1, 8],
                'castle-capital'    : [2, 0],
                'rampart-capital'   : [2, 1],
                'tower-capital'     : [2, 2],
                'inferno-capital'   : [2, 3],
                'necropolis-capital': [2, 4],
                'dungeon-capital'   : [2, 5],
                'stronghold-capital': [2, 6],
                'fortress-capital'  : [2, 7],
                'conflux-capital'   : [2, 8]
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
        return this.grid.cols * this.grid.tileSize;
    },

    height: function() {
        return this.grid.rows * this.grid.tileSize;
    },

    start: function() {
        $container.empty();

        Crafty.init(Game.width(), Game.height(), $container.get(0));
        Crafty.viewport.clampToEntities = false;
        //Crafty.viewport.bounds = {min:{x:0, y:0}, max:{x:320, y:320}};
        //Crafty.viewport.init(320, 320);

        Crafty.enterScene('Loading');
    },

    locateCreature: function(entityType, x, y) {
        for (var _x = x - 1; _x <= x + 1; _x++) {
            for (var _y = y - 1; _y <= y + 1; _y++) {
                Game.markTileTemporaryUnwalkable(_x, _y);
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

    locateMine: function(entity, x, y) {
        // TODO: Game.markTileUnwalkable(x + 1, y);

        console.log('mine: %s', entity);

        return this.locateEntity('mine', x, y).addComponent('mine--' + entity);
    },

    locateRoad: function(entity, x, y) {
        console.log('road: %s', entity);

        return this.locateEntity('road', x, y);
    },

    locateRiver: function(entity, x, y) {
        console.log('river: %s', entity);

        return this.locateEntity('river', x, y);
    },

    locateObject: function(entity, x, y) {
        Game.markTileUnwalkable(x, y);
        Game.markTileUnwalkable(x + 1, y);

        console.log('object: %s', entity);

        return this.locateEntity('object', x, y).addComponent(entity);
    },

    locateHero: function(entity, x, y) {
        Game.grid.matrix[y][x] = CONST_NOT_WALKABLE;
        Game.grid.objectMatrix[y][x] = CONST_TEMPORARY_NOT_WALKABLE;

        console.log('hero: %s', entity);

        return this.locateEntity('hero', x, y).setType(entity).stand('e');
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
        //console.log('%s - %s, %s', entity, x, y);

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
