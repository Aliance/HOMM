Crafty.c('mine', {
    init: function() {
        this.requires('grid')
            //.addComponent('SolidHitBox') // DEBUG
            //.addComponent('VisibleMBR') // DEBUG
            .attr({
                w: Game.components.mine.tile.width,
                h: Game.components.mine.tile.height,
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
