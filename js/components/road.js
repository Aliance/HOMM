var
    CONST_ROAD_TILE_CORNER            = 1 << 0, // 1-2
    CONST_ROAD_TILE_DIAGONAL          = 1 << 1, // 3-6
    CONST_ROAD_TILE_VERTICAL_CORNER   = 1 << 2, // 7-8
    CONST_ROAD_TILE_HORIZONTAL_CORNER = 1 << 3, // 9-10
    CONST_ROAD_TILE_VERTICAL          = 1 << 4, // 11-12
    CONST_ROAD_TILE_HORIZONTAL        = 1 << 5, // 13-14
    CONST_ROAD_TILE_VERTICAL_END      = 1 << 6, // 15
    CONST_ROAD_TILE_HORIZONTAL_END    = 1 << 7, // 16
    CONST_ROAD_TILE_CROSS             = 1 << 8, // 17

    CONST_ROAD_TYPE_COBBLESTONE = 1 << 9,  // мощённая
    CONST_ROAD_TYPE_GRAVEL      = 1 << 10, // гравиевая
    CONST_ROAD_TYPE_DIRT        = 1 << 11, // грязевая

    CONST_ROAD_FLIP_X = 1 << 12, // flipX
    CONST_ROAD_FLIP_Y = 1 << 13; // flipY

Crafty.c('road', {
    init: function() {
        this.requires('grid')
            .attr({
                w: Game.grid.tileSize,
                h: Game.grid.tileSize,
                z: 2
            })
        ;
    },

    at: function(x, y) {
        this.attr({
            x: x * Game.grid.tileSize,
            y: y * Game.grid.tileSize
        });
        return this;
    },

    placeRandomTile: function(roadType, roadTile, flip) {
        this.addComponent('road--' + roadType + '-' + roadTile);
        for (var i = 0, l = flip.length; i < l; i++) {
            this.flip(flip[i]);
        }
        return this;
    }
});
