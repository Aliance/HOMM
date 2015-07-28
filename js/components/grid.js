Crafty.c('grid', {
    init: function(){
        // TODO: раскомментировать канвас для прода
        //this.requires('2D, Canvas');
        this.requires('2D, DOM');
    },

    getPosition: function() {
        return {x: this.x / Game.grid.tile.width, y: this.y / Game.grid.tile.height};
    }
});
