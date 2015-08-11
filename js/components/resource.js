Crafty.c('resource', {
    init: function() {
        this.requires('grid')
            .addComponent('Collision')
            //.addComponent('SolidHitBox') // DEBUG
            .onHit('hero', this.destroy)
            .attr({
                w: Game.grid.tileSize,
                h: Game.grid.tileSize,
                z: 2
            })
    },

    /**
     * @param {Number} x
     * @param {Number} y
     * @returns {*}
     */
    at: function(x, y) {
        this.attr({
            x: x * Game.grid.tileSize,
            y: y * Game.grid.tileSize
        });
        return this;
    }
});
