Crafty.c('MoveTo', {
    bits: {
        top   : 1 << 0, // 0001 == 1
        bottom: 1 << 1, // 0010 == 2
        right : 1 << 2, // 0100 == 4
        left  : 1 << 3  // 1000 == 8
    },

    init: function () {
        this.requires('Mouse');

        this.path = [];
        this.from = {x:0, y:0};
        this.to = {x:0, y:0};

        // TODO: mb bind this event not to all the map, but only for movable objects like grass?
        Crafty.addEvent(this, Crafty.stage.elem, 'mousedown', this._onmousedown);
    },

    /**
     * @param {Object} e
     * @private
     */
    _onmousedown: function (e) {
        if (this.disregardMouseInput) {
            return;
        }

        this.to = {
            x: Math.floor(e.realX / Game.grid.tileSize),
            y: Math.floor(e.realY / Game.grid.tileSize)
        };

        if (Game.grid.objectMatrix[this.to.y][this.to.x] === CONST_NOT_WALKABLE) {
            return;
        }

        this.from = this.getTile();

        var gridComponent = new PF.Grid(Game.grid.cols, Game.grid.rows, Game.grid.matrix);

        this.path = Game.finderComponent.findPath(this.from.x, this.from.y, this.to.x, this.to.y, gridComponent);

        if (!this.path.length) {
            return;
        }

        console.log('moving from [%d, %d] tile to [%d, %d] tile', this.from.x, this.from.y, this.to.x, this.to.y);

        console.log(this.path);

        Crafty('movement').destroy();

        var bits = [];

        // высчитываем направление движение с помощью битовой арифметики
        for (var i = 1, l = this.path.length; i < l; i++) {
            var x = this.path[i][0], y = this.path[i][1];

            bits[i] = this._getMovementBits(x, this.path[i - 1][0], y, this.path[i - 1][1]);
        }

        for (var i = 1, l = this.path.length; i < l; i++) {
            var x = this.path[i][0], y = this.path[i][1];
            var entity = Crafty.e('movement').at(x, y);

            if (i == l - 1) {
                // рисуем крестик
                entity.availableTarget();
            } else {
                // рисуем стрелочки
                entity.addComponent(this._getMovementEntity(bits[i], bits[i + 1]));
            }
        }
    },

    /**
     * @param {Number} x  - координата x куда герой идёт
     * @param {Number} _x - координата x откуда герой идёт
     * @param {Number} y - координата y куда герой идёт
     * @param {Number} _y - координата y откуда герой идёт
     * @returns {Number}
     * @private
     */
    _getMovementBits: function(x, _x, y, _y) {
        var bits = 0;

        if (y < _y) {
            bits |= this.bits.top;
        } else if (y > _y) {
            bits |= this.bits.bottom;
        }

        if (x > _x) {
            bits |= this.bits.right;
        } else if (x < _x) {
            bits |= this.bits.left;
        }

        return bits;
    },

    /**
     * @param {Number} bits
     * @param {Number} nextBits
     * @returns {String}
     * @private
     */
    _getMovementEntity: function(bits, nextBits) {
        var entity = 'movement--available-';

        if (bits & this.bits.top) {
            entity += '-top';
        } else if (bits & this.bits.bottom) {
            entity += '-bottom';
        }

        if (bits & this.bits.right) {
            entity += '-right';
        } else if (bits & this.bits.left) {
            entity += '-left';
        }

        if (nextBits !== bits) {
            entity += '-';

            if (nextBits & this.bits.top) {
                entity += '-top';
            } else if (nextBits & this.bits.bottom) {
                entity += '-bottom';
            }

            if (nextBits & this.bits.right) {
                entity += '-right';
            } else if (nextBits & this.bits.left) {
                entity += '-left';
            }
        }

        console.log(entity);

        return entity;
    }
});
