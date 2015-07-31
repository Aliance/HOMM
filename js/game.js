Game = {
    grid: {
        rows: 8,//10,
        cols: 10,//20,
        tile: {
            width:  32,
            height: 32
        }
    },
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

                positions['shining--gold']    = [0, 0];
                positions['shining--mercury'] = [0, 1];
                positions['shining--sulphur'] = [0, 2];
                positions['shining--gem']     = [0, 3];
                positions['shining--crystal'] = [0, 4];
                positions['shining--wood']    = [0, 5];
                positions['shining--ore']     = [0, 6];

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

                Game.components.resource.animation['gold']    = createAnimationMap(0, 7, 0);
                Game.components.resource.animation['mercury'] = createAnimationMap(0, 0, 1);
                Game.components.resource.animation['sulphur'] = createAnimationMap(0, 0, 2);
                Game.components.resource.animation['gem']     = createAnimationMap(0, 7, 3);
                Game.components.resource.animation['crystal'] = createAnimationMap(0, 7, 4);
                Game.components.resource.animation['wood']    = createAnimationMap(0, 0, 5);
                Game.components.resource.animation['ore']     = createAnimationMap(0, 0, 6);
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
            animation: [],
            getMap: function() {
                var positions = {};

                positions[Game.components.hero.skinPrefix + 'r'] = [0, 0];
                positions[Game.components.hero.skinPrefix + 'l'] = [0, 1];
                positions[Game.components.hero.skinPrefix + 'b'] = [0, 2];
                positions[Game.components.hero.skinPrefix + 't'] = [0, 3];

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

                Game.components.hero.animation[Game.components.hero.skinPrefix + 'walk_r'] = createAnimationMap(0, 7, 0);
                // TODO: поменять второй аргумент, когда дорисую спрайты
                Game.components.hero.animation[Game.components.hero.skinPrefix + 'walk_l'] = createAnimationMap(0, 0, 1);
                Game.components.hero.animation[Game.components.hero.skinPrefix + 'walk_b'] = createAnimationMap(0, 0, 2);
                Game.components.hero.animation[Game.components.hero.skinPrefix + 'walk_t'] = createAnimationMap(0, 0, 3);
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
    }
};
