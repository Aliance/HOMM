var
    CONST_RIVER_TILE_CORNER            = 1 << 0, // 1-4
    CONST_RIVER_TILE_CROSS             = 1 << 1, // 5
    CONST_RIVER_TILE_HORIZONTAL_CORNER = 1 << 2, // 6-7
    CONST_RIVER_TILE_VERTICAL_CORNER   = 1 << 3, // 8-9
    CONST_RIVER_TILE_VERTICAL          = 1 << 4, // 10-11
    CONST_RIVER_TILE_HORIZONTAL        = 1 << 5, // 12-13

    CONST_RIVER_TYPE_NORMAL = 1 << 6,  // обычная
    CONST_RIVER_TYPE_ICY    = 1 << 7, // леденая
    CONST_RIVER_TYPE_LAVA   = 1 << 8, // лава
    CONST_RIVER_TYPE_DIRTY  = 1 << 9, // грязевая

    CONST_RIVER_FLIP_X = 1 << 10, // flipX
    CONST_RIVER_FLIP_Y = 1 << 11; // flipY

Crafty.c('river', {
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
        this.addComponent('river--' + roadType + '-' + roadTile);
        for (var i = 0, l = flip.length; i < l; i++) {
            this.flip(flip[i]);
        }
        return this;
    }
});
