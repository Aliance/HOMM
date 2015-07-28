Crafty.c('border', {
    init: function() {
        this.requires('grid')
            .addComponent('Color, Collision')
            // TODO: debug
            .addComponent('Text')
            .attr({
                w: Game.components.border.tile.width,
                h: Game.components.border.tile.height,
                z: Game.components.border.zIndex
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
