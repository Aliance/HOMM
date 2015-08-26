var
    CONST_WALKABLE               = 0,
    CONST_NOT_WALKABLE           = 1,
    CONST_TEMPORARY_NOT_WALKABLE = 2
    ;

var createComponentMap = function(prefix, to, _y) {
    var map = {};
    var y = _y || 0;

    for (var i = 1; i <= to; i++) {
        map[prefix + '-' + i] = [i - 1, y];
    }

    return map;
};

var extend = function() {
    var
        ret = {},
        i = 0,
        len = arguments.length
        ;

    for (; i < len; i++) {
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
            map: extend(
                createComponentMap('road--cobblestone', 17, 0),
                createComponentMap('road--gravel', 17, 1),
                createComponentMap('road--dirt', 17, 2)
            )
        },
        river: {
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
        heroPortraitBig: {
            tile: {
                width:  58,
                height: 64
            },
            map: {
                'orrin'         : [0, 0],
                'valeska'       : [1, 0],
                'edric'         : [2, 0],
                'sylvia'        : [3, 0],
                'lord-haart'    : [4, 0],
                'sorsha'        : [5, 0],
                'sir-christian' : [6, 0],
                'tyris'         : [7, 0],
                'rion'     : [0, 1],
                'adela'    : [1, 1],
                'cuthbert' : [2, 1],
                'adelaide' : [3, 1],
                'ingham'   : [4, 1],
                'sanya'    : [5, 1],
                'loynis'   : [6, 1],
                'caitlin'  : [7, 1],
                'mephala'  : [0, 2],
                'ufretin'  : [1, 2],
                'jenova'   : [2, 2],
                'ryland'   : [3, 2],
                'thorgrim' : [4, 2],
                'ivor'     : [5, 2],
                'clancy'   : [6, 2],
                'kyrre'    : [7, 2],
                'coronius' : [0, 3],
                'uland'    : [1, 3],
                'elleshar' : [2, 3],
              //'gem'      : [3, 3], TODO: rename resource gem
                'malcom'   : [4, 3],
                'melodia'  : [5, 3],
                'alagar'   : [6, 3],
                'aeris'    : [7, 3],
                'piquedram' : [0, 4],
                'thane'     : [1, 4],
                'josephine' : [2, 4],
                'neela'     : [3, 4],
                'torosar'   : [4, 4],
                'fafner'    : [5, 4],
                'rissa'     : [6, 4],
                'iona'      : [7, 4],
                'astral'    : [0, 5],
                'halon'     : [1, 5],
                'serena'    : [2, 5],
                'daremyth'  : [3, 5],
                'theodorus' : [4, 5],
                'solmyr'    : [5, 5],
                'cyra'      : [6, 5],
                'aine'      : [7, 5],
                'fiona'    : [0, 6],
                'rashka'   : [1, 6],
                'marius'   : [2, 6],
                'ignatius' : [3, 6],
                'octavia'  : [4, 6],
                'calh'     : [5, 6],
                'pyre'     : [6, 6],
                'nymus'    : [7, 6],
                'ayden'  : [0, 7],
                'xyron'  : [1, 7],
                'axsis'  : [2, 7],
                'olema'  : [3, 7],
                'calid'  : [4, 7],
                'ash'    : [5, 7],
                'zydar'  : [6, 7],
                'xarfax' : [7, 7],
                'straker'  : [0, 8],
                'vokial'   : [1, 8],
                'moandor'  : [2, 8],
                'charna'   : [3, 8],
                'tamika'   : [4, 8],
                'isra'     : [5, 8],
                'clavius'  : [6, 8],
                'galthran' : [7, 8],
                'septienna' : [0, 9],
                'aislinn'   : [1, 9],
                'sandro'    : [2, 9],
                'nimbus'    : [3, 9],
                'thant'     : [4, 9],
                'xsi'       : [5, 9],
                'vidomina'  : [6, 9],
                'nagash'    : [7, 9],
                'lorelei' : [0, 10],
                'arlach'  : [1, 10],
                'dace'    : [2, 10],
                'ajit'    : [3, 10],
                'damacon' : [4, 10],
                'gunnar'  : [5, 10],
                'synca'   : [6, 10],
                'shakti'  : [7, 10],
                'alamar'     : [0, 11],
                'jaegar'     : [1, 11],
                'malekith'   : [2, 11],
                'jeddite'    : [3, 11],
                'geon'       : [4, 11],
                'deemer'     : [5, 11],
                'sephinroth' : [6, 11],
                'darkstorn'  : [7, 11],
                'yog'       : [0, 12],
                'gurnisson' : [1, 12],
                'jabarkas'  : [2, 12],
                'shiva'     : [3, 12],
                'gretchin'  : [4, 12],
                'krellion'  : [5, 12],
                'crag-hack' : [6, 12],
                'tyraxor'   : [7, 12],
                'gird'    : [0, 13],
                'vey'     : [1, 13],
                'dessa'   : [2, 13],
                'terek'   : [3, 13],
                'zubin'   : [4, 13],
                'gundula' : [5, 13],
                'oris'    : [6, 13],
                'saurug'  : [7, 13],
                'bron'     : [0, 14],
                'drakon'   : [1, 14],
                'wystan'   : [2, 14],
                'tazar'    : [3, 14],
                'alkin'    : [4, 14],
                'korbac'   : [5, 14],
                'gerwulf'  : [6, 14],
                'broghild' : [7, 14],
                'mirlanda' : [0, 15],
                'rosic'    : [1, 15],
                'voy'      : [2, 15],
                'verdish'  : [3, 15],
                'merist'   : [4, 15],
                'styg'     : [5, 15],
                'andra'    : [6, 15],
                'tiva'     : [7, 15],
                'luna'    : [0, 16],
                'brissa'  : [1, 16],
                'ciele'   : [2, 16],
                'labetha' : [3, 16],
                'inteus'  : [4, 16],
                'aenain'  : [5, 16],
                'gelare'  : [6, 16],
                'grindan' : [7, 16],
                'pasis'   : [0, 17],
                'thunar'  : [1, 17],
                'ignissa' : [2, 17],
                'lacus'   : [3, 17],
                'monere'  : [4, 17],
                'erdamon' : [5, 17],
                'fiur'    : [6, 17],
                'kalt'    : [7, 17]
                /*
                'adrienne'      : [0, 18], // witch
                'boragus'       : [1, 18], // barbarian
                'sir-christian' : [2, 18],
                'dracon'        : [3, 18], // wizard
                'gelu'          : [4, 18], // ranger
                'kilgor'        : [5, 18], // barbarian
                'lord-haart'    : [6, 18], // death knight
                'mutare'        : [7, 18], // overlord
                'queen-catherine-ironfist' : [0, 19], // knight
                ''                         : [1, 19],
                'xeron'                    : [2, 19], // demoniac
                'ordwald'                  : [3, 19], // overlord
                'finneas'                  : [4, 19], // necromancer
                'gem'                      : [5, 19], // druid
                'sandro'                   : [6, 19], // necromancer
                'yog'                      : [7, 19], // wizard
                'mutare-drake' : [0, 20], // overlord
                ''             : [0, 20],
                ''             : [1, 20]
                */
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
        townBackground: {
            tile: {
                width:  800,
                height: 374
            },
            map: {
                'town--background--castle'    : [0, 0],
                'town--background--rampart'   : [0, 1],
                'town--background--tower'     : [0, 2],
                'town--background--inferno'   : [0, 3],
                'town--background--necropolis': [0, 4],
                'town--background--dungeon'   : [0, 5],
                'town--background--stronghold': [0, 6],
                'town--background--fortress'  : [0, 7],
                'town--background--conflux'   : [0, 8]
            }
        },
        townIcon: {
            tile: {
                width:  58,
                height: 64
            },
            map: {
                'town--icon--castle'    : [0, 0],
                'town--icon--rampart'   : [0, 1],
                'town--icon--tower'     : [0, 2],
                'town--icon--inferno'   : [0, 3],
                'town--icon--necropolis': [0, 4],
                'town--icon--dungeon'   : [0, 5],
                'town--icon--stronghold': [0, 6],
                'town--icon--fortress'  : [0, 7],
                'town--icon--conflux'   : [0, 8],
                'town--icon--built--castle'    : [1, 0],
                'town--icon--built--rampart'   : [1, 1],
                'town--icon--built--tower'     : [1, 2],
                'town--icon--built--inferno'   : [1, 3],
                'town--icon--built--necropolis': [1, 4],
                'town--icon--built--dungeon'   : [1, 5],
                'town--icon--built--stronghold': [1, 6],
                'town--icon--built--fortress'  : [1, 7],
                'town--icon--built--conflux'   : [1, 8],
                'town--icon--village--castle'    : [2, 0],
                'town--icon--village--rampart'   : [2, 1],
                'town--icon--village--tower'     : [2, 2],
                'town--icon--village--inferno'   : [2, 3],
                'town--icon--village--necropolis': [2, 4],
                'town--icon--village--dungeon'   : [2, 5],
                'town--icon--village--stronghold': [2, 6],
                'town--icon--village--fortress'  : [2, 7],
                'town--icon--village--conflux'   : [2, 8],
                'town--icon--village--built--castle'    : [3, 0],
                'town--icon--village--built--rampart'   : [3, 1],
                'town--icon--village--built--tower'     : [3, 2],
                'town--icon--village--built--inferno'   : [3, 3],
                'town--icon--village--built--necropolis': [3, 4],
                'town--icon--village--built--dungeon'   : [3, 5],
                'town--icon--village--built--stronghold': [3, 6],
                'town--icon--village--built--fortress'  : [3, 7],
                'town--icon--village--built--conflux'   : [3, 8]
            }
        },
        townChoose: {
            tile: {
                width:  48,
                height: 32
            },
            map: {
                'town--choose--castle'    : [0, 0],
                'town--choose--rampart'   : [0, 1],
                'town--choose--tower'     : [0, 2],
                'town--choose--inferno'   : [0, 3],
                'town--choose--necropolis': [0, 4],
                'town--choose--dungeon'   : [0, 5],
                'town--choose--stronghold': [0, 6],
                'town--choose--fortress'  : [0, 7],
                'town--choose--conflux'   : [0, 8],
                'town--choose--built--castle'    : [1, 0],
                'town--choose--built--rampart'   : [1, 1],
                'town--choose--built--tower'     : [1, 2],
                'town--choose--built--inferno'   : [1, 3],
                'town--choose--built--necropolis': [1, 4],
                'town--choose--built--dungeon'   : [1, 5],
                'town--choose--built--stronghold': [1, 6],
                'town--choose--built--fortress'  : [1, 7],
                'town--choose--built--conflux'   : [1, 8],
                'town--choose--village--castle'    : [2, 0],
                'town--choose--village--rampart'   : [2, 1],
                'town--choose--village--tower'     : [2, 2],
                'town--choose--village--inferno'   : [2, 3],
                'town--choose--village--necropolis': [2, 4],
                'town--choose--village--dungeon'   : [2, 5],
                'town--choose--village--stronghold': [2, 6],
                'town--choose--village--fortress'  : [2, 7],
                'town--choose--village--conflux'   : [2, 8],
                'town--choose--village--built--castle'    : [3, 0],
                'town--choose--village--built--rampart'   : [3, 1],
                'town--choose--village--built--tower'     : [3, 2],
                'town--choose--village--built--inferno'   : [3, 3],
                'town--choose--village--built--necropolis': [3, 4],
                'town--choose--village--built--dungeon'   : [3, 5],
                'town--choose--village--built--stronghold': [3, 6],
                'town--choose--village--built--fortress'  : [3, 7],
                'town--choose--village--built--conflux'   : [3, 8],
                'town--choose--none'      : [0, 9],
                'town--choose--random'    : [1, 9],
                'town--choose--highlight' : [2, 9]
            }
        },
        townBuildingIcon: {
            tile: {
                width:  38,
                height: 38
            },
            map: {
                'town--building--icon--fort'         : [0, 0],
                'town--building--icon--citadel'      : [1, 0],
                'town--building--icon--castle'       : [2, 0],
                'town--building--icon--none'         : [3, 0],
                'town--building--icon--village-hall' : [0, 1],
                'town--building--icon--town-hall'    : [1, 1],
                'town--building--icon--city-hall'    : [2, 1],
                'town--building--icon--capitol'      : [3, 1]
            }
        },
        creatures: {
            tile: {
                width:  40,
                height: 50
            },
            map: {
                'azure-dragon': [0, 0]
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

                Game.components.creatures.animation['motion--azure-dragon']  = createAnimationMap(0, 5, 0);
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
        return 800;//this.grid.cols * this.grid.tileSize;
    },

    height: function() {
        return 600;//this.grid.rows * this.grid.tileSize;
    },

    start: function() {
        $container.empty();

        Crafty.init(Game.width(), Game.height(), $container.get(0));
        Crafty.viewport.clampToEntities = false;

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
    },

    locateTown: function(type, x, y) {
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

        console.log('town: %s', type);

        var town = this.locateEntity('town', x, y);

        town.setTitle('Название города').setType(type);

        Game.towns.push(town);

        return town;
    },

    locateMine: function(entity, x, y) {
        // TODO: Game.markTileUnwalkable(x + 1, y);

        console.log('mine: %s', entity);

        this.locateEntity('mine', x, y).addComponent('mine--' + entity);
    },

    locateRoad: function(entity, x, y) {
        //console.log('road: %s', entity);

        return this.locateEntity('road', x, y);
    },

    locateRiver: function(entity, x, y) {
        //console.log('river: %s', entity);

        return this.locateEntity('river', x, y);
    },

    locateObject: function(entity, x, y) {
        Game.markTileUnwalkable(x, y);
        Game.markTileUnwalkable(x + 1, y);

        //console.log('object: %s', entity);

        this.locateEntity('object', x, y).addComponent(entity);
    },

    locateHero: function(skin, entity, x, y) {
        Game.grid.matrix[y][x] = CONST_NOT_WALKABLE;
        Game.grid.objectMatrix[y][x] = CONST_TEMPORARY_NOT_WALKABLE;

        console.log('hero: %s %s', skin, entity);

        var hero = this.locateEntity('hero', x, y).setType(entity).setName(skin).stand('e');

        Game.heroes.push(hero);
        Game.activeHero = hero;
        Crafty.viewport.follow(hero, 0, 0);
    },

    locateItem: function(entity, x, y) {
        this.markTileTemporaryUnwalkable(x, y);

        this.locateEntity(entity, x, y);
    },

    locateLandscape: function(entity, x, y, angle) {
        this.markTileWalkable(x, y);

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

    markTileWalkable: function(x, y) {
        if (Game.grid.matrix[y][x] !== null) {
            return;
        }

        Game.grid.matrix[y][x] = CONST_WALKABLE;
        Game.grid.objectMatrix[y][x] = CONST_WALKABLE;
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
