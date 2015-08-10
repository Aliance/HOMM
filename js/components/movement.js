Crafty.c('movement', {
    init: function() {
        this.requires('grid')
            .addComponent('movement-available')
            //.addComponent('VisibleMBR') // DEBUG
            .attr({
                w: Game.grid.tile.size,
                h: Game.grid.tile.size,
                z: 30
            })
    },

    at: function(x, y) {
        this.attr({
            x: x * Game.grid.tile.size,
            y: y * Game.grid.tile.size
        });
        return this;
    }
});
