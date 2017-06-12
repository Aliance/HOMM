Crafty.c('grid', {
    init: function() {
        this.requires('2D, Canvas');
        //this.requires('2D, DOM'); // DEBUG
    },

    getPosition: function() {
        return {x: this.x / Game.grid.tileSize, y: this.y / Game.grid.tileSize};
    }
});
