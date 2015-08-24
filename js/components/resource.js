var
    CONST_RESOURCE_TYPE_CHEST   = 1 << 0,
    CONST_RESOURCE_TYPE_GOLD    = 1 << 1,
    CONST_RESOURCE_TYPE_WOOD    = 1 << 2,
    CONST_RESOURCE_TYPE_ORE     = 1 << 3,
    CONST_RESOURCE_TYPE_GEM     = 1 << 4,
    CONST_RESOURCE_TYPE_CRYSTAL = 1 << 5,
    CONST_RESOURCE_TYPE_MERCURY = 1 << 6,
    CONST_RESOURCE_TYPE_SULPHUR = 1 << 7
;

Crafty.c('resource', {
    init: function() {
        this.requires('grid')
            .addComponent('Collision')
            //.addComponent('SolidHitBox') // DEBUG
            //.addComponent('VisibleMBR') // DEBUG
            .onHit('hero', this.destroy)
            .attr({
                w: Game.components.resource.tile.width,
                h: Game.components.resource.tile.height,
                z: 2
            })
            .initCollision()
        ;
    },

    /**
     * @param {Number} x
     * @param {Number} y
     * @returns {*}
     */
    at: function(x, y) {
        this.attr({
            x: x * Game.grid.tileSize - Game.grid.tileSize,
            y: y * Game.grid.tileSize
        });
        return this;
    },

    /**
     * @returns {*}
     */
    initCollision: function() {
        var polygon = new Crafty.polygon(
            // top left
            [Game.grid.tileSize,     0],
            // top right
            [Game.grid.tileSize * 2, 0],
            // bottom right
            [Game.grid.tileSize * 2, Game.grid.tileSize],
            // bottom left
            [Game.grid.tileSize,     Game.grid.tileSize]
        );

        this.collision(polygon);

        return this;
    }
});
