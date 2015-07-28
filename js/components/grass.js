Crafty.c('grass', {
    init: function() {
        this.requires('grid')
            .addComponent('Color')
            // TODO: debug
            .addComponent('Text')
            .attr({
                w: Game.components.grass.tile.width,
                h: Game.components.grass.tile.height,
                z: Game.components.grass.zIndex
            })
    },

    at: function(x, y) {
        this.attr({
            x: x * Game.grid.tile.width,
            y: y * Game.grid.tile.height
        });
        return this;
    }
});
