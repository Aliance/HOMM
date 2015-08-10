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

        var gridComponent = new PF.Grid(Game.grid.cols, Game.grid.rows, Game.grid.matrix);

        var path = Game.finderComponent.findPath(oldPosition.x, oldPosition.y, movement.x, movement.y, gridComponent);

        if (!path.length) {
            return;
        }

        console.log('moving from [%d, %d] tile to [%d, %d] tile', oldPosition.x, oldPosition.y, movement.x, movement.y);

        console.log(path);

        Crafty('movement').destroy();

        // рисуем стрелочки
        for (var i = 1, l = path.length; i < l; i++) {
            var x = path[i][0], y = path[i][1];
            var entity = Crafty.e('movement').at(x, y);

            if (i == l - 1) {
                // рисуем крестик
                entity.addComponent('movement--available--target');
            } else {
                entity.addComponent(this.getMovementEntity(x, path[i - 1][0], y, path[i - 1][1]));
            }
        }
    },

    getMovementEntity: function(x, _x, y, _y) {
        if (x == _x) {
            if (y < _y) {
                return 'movement--available--top';
            } else {
                return 'movement--available--bottom';
            }
        } else if (y == _y) {
            if (x > _x) {
                return 'movement--available--right';
            } else {
                return 'movement--available--left';
            }
        }

        return 'movement--unavailable--target';
    }
});
