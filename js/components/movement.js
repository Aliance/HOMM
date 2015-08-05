Crafty.c('movement', {
    init: function() {
        this.requires('grid')
            .addComponent('movement-available')
            //.addComponent('VisibleMBR')
            .attr({
                w: Game.grid.tile.size,
                h: Game.grid.tile.size,
                z: Game.components.movement.zIndex
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
