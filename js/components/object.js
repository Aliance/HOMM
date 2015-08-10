Crafty.c('object', {
    init: function() {
        this.requires('grid')
            //.addComponent('SolidHitBox') // DEBUG
            .attr({
                w: Game.components.object.tile.width,
                h: Game.components.object.tile.height,
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
