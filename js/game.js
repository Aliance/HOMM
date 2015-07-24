Game = {
    grid: {
        rows: 20,
        cols: 10,
        tile: {
            width:  32,
            height: 32
        }
    },
    components: {
        hero: {
            tile: {
                width:  50,
                height: 59
            },
            zIndex: 100,
            moveDuration: 500,
            skinPrefix: 'hero',
            animation: [],
            getMap: function() {
                var positions = {};

                positions[Game.components.hero.skinPrefix + '_r'] = [0, 0];
                positions[Game.components.hero.skinPrefix + '_l'] = [0, 1];
                positions[Game.components.hero.skinPrefix + '_b'] = [0, 2];
                positions[Game.components.hero.skinPrefix + '_t'] = [0, 3];

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

                Game.components.hero.animation[Game.components.hero.skinPrefix + '_walk_r'] = createAnimationMap(0, 7, 0);
                // TODO: поменять второй аргумент, когда дорисую спрайты
                Game.components.hero.animation[Game.components.hero.skinPrefix + '_walk_l'] = createAnimationMap(0, 0, 1);
                Game.components.hero.animation[Game.components.hero.skinPrefix + '_walk_b'] = createAnimationMap(0, 0, 2);
                Game.components.hero.animation[Game.components.hero.skinPrefix + '_walk_t'] = createAnimationMap(0, 0, 3);
            }
        }
    },

    width: function() {
        return this.grid.rows * this.grid.tile.width;
    },

    height: function() {
        return this.grid.cols * this.grid.tile.height;
    },

    start: function() {
        $container.empty();

        Crafty.init(Game.width(), Game.height(), $container.get(0));

        Crafty.enterScene('Loading');
    }
};
