Crafty.c('movement', {
    init: function() {
        this.requires('grid')
            //.addComponent('movement-available')
            //.addComponent('VisibleMBR') // DEBUG
            .attr({
                w: Game.grid.tileSize,
                h: Game.grid.tileSize,
                z: 30
            })
    },

    at: function(x, y) {
        this.attr({
            x: x * Game.grid.tileSize,
            y: y * Game.grid.tileSize
        });
        return this;
    }
});
