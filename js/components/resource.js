Crafty.c('resource', {
    init: function() {
        this.requires('grid')
            .addComponent('Collision')
            .addComponent('SolidHitBox') // DEBUG
            .onHit('hero', this.destroy)
            .attr({
                w: Game.grid.tile.size,
                h: Game.grid.tile.size,
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
            x: x * Game.grid.tile.size,
            y: y * Game.grid.tile.size
        });
        return this;
    }
});
