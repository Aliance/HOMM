Crafty.c('MoveTo', {
    init: function () {
        this.requires('Mouse');

        // TODO: mb bind this event not to all the map, but only for movable objects like grass?
        Crafty.addEvent(this, Crafty.stage.elem, 'mousedown', this._onmousedown);
    },

    _onmousedown: function (e) {
        if (this.disregardMouseInput) {
            return;
        }

        var movement = {
            x: Math.floor(e.realX / Game.grid.tile.size),
            y: Math.floor(e.realY / Game.grid.tile.size)
        };

        if (Game.grid.objectMatrix[movement.y][movement.x] === CONST_NOT_WALKABLE) {
            return;
        }

        var oldPosition = this.getTile();

        console.log('moving from [%d, %d] tile to [%d, %d] tile', oldPosition.x, oldPosition.y, movement.x, movement.y);

        var gridComponent = new PF.Grid(Game.grid.cols, Game.grid.rows, Game.grid.matrix);

        var path = Game.finderComponent.findPath(oldPosition.x, oldPosition.y, movement.x, movement.y, gridComponent);

        console.log(path);

        Crafty('movement').destroy();
        for (var i in path) {
            Crafty.e('movement').at(path[i][0], path[i][1]);
        }
    }
});
