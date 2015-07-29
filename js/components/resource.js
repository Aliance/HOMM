Crafty.c('resource', {
    init: function() {
        this.requires('grid')
            .addComponent('Collision')
            .onHit('hero', this.destroy)
            .attr({
                w: Game.components.resource.tile.width,
                h: Game.components.resource.tile.height,
                z: Game.components.resource.zIndex
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
