var CONST_LANDSCAPE_TILE_GRASS = 1,
    CONST_LANDSCAPE_TILE_GRASS_COAST_CORNER_NW = 2,
    CONST_LANDSCAPE_TILE_GRASS_COAST_CORNER_NE = 3,
    CONST_LANDSCAPE_TILE_GRASS_COAST_CORNER_SE = 4,
    CONST_LANDSCAPE_TILE_GRASS_COAST_CORNER_SW = 5,
    CONST_LANDSCAPE_TILE_GRASS_HORIZONTAL_COAST = 6,
    CONST_LANDSCAPE_TILE_GRASS_HORIZONTAL_COAST_DOWN = 7,
    CONST_LANDSCAPE_TILE_GRASS_VERTICAL_COAST = 8,
    CONST_LANDSCAPE_TILE_GRASS_VERTICAL_COAST_RIGHT = 9,
    CONST_LANDSCAPE_TILE_WATER = 10,
    CONST_LANDSCAPE_TILE_WATER_HORIZONTAL_COAST = 11,
    CONST_LANDSCAPE_TILE_WATER_HORIZONTAL_COAST_DOWN = 12,
    CONST_LANDSCAPE_TILE_WATER_VERTICAL_COAST = 13,
    CONST_LANDSCAPE_TILE_WATER_VERTICAL_COAST_RIGHT = 14,
    CONST_LANDSCAPE_TILE_WATER_CORNER_SMALL_NW = 15,
    CONST_LANDSCAPE_TILE_WATER_CORNER_SMALL_NE = 16,
    CONST_LANDSCAPE_TILE_WATER_CORNER_SMALL_SE = 17,
    CONST_LANDSCAPE_TILE_WATER_CORNER_SMALL_SW = 18
    ;

Crafty.c('landscape', {
    init: function() {
        this.requires('grid')
            .attr({
                w: Game.grid.tile.size,
                h: Game.grid.tile.size,
                z: 1
            })
        ;
    },

    at: function(x, y) {
        this.attr({
            x: x * Game.grid.tile.size,
            y: y * Game.grid.tile.size
        });
        return this;
    },

    placeRandomTerrain: function(prefix, from, to, angle, flip) {
        this.addComponent(prefix + '-' + Crafty.math.randomInt(from, to));
        this.rotation = angle;
        if (flip) {
            this.flip(flip);
        }
        return this;
    }
});
