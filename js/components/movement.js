Crafty.c('movement', {
    init: function() {
        this.requires('grid')
            //.addComponent('VisibleMBR') // DEBUG
            .attr({
                w: Game.grid.tileSize,
                h: Game.grid.tileSize,
                z: 30
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

    availableTarget: function() {
        this.requires('Mouse')
            .addComponent('movement--available--target')
            .one('MouseDown', this._move);
        return this;
    },

    /**
     * @param {MouseEvent} e
     * @private
     */
    _move: function(e) {
        Game.activeHero.disregardMouseInput = true;
        Game.activeHero.movePath();
    }
});
