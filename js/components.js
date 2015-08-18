Crafty.c('Grid', {
    init: function() {
        this.attr({
            w: Game.map_grid.tile.width,
            h: Game.map_grid.tile.height
        });
    },

    at: function(x, y, z) {
        var zIndex = z || 1;

        this.attr({x: x * Game.map_grid.tile.width, y: y * Game.map_grid.tile.height, z: zIndex});
        return this;
    }
});

Crafty.c('item', {
    init: function() {
        this.requires('2D, DOM, Grid');
    }
});

Crafty.c('tile', {
    init: function() {
        this.requires('item');
    }
});

Crafty.c('water', {
    init: function() {
        var tileTypes = [
            'tile--water--20',
            'tile--water--21',
            'tile--water--22',
            'tile--water--23'
        ];
        var tileType = tileTypes[random(0, tileTypes.length - 1)];
        this.requires('tile, ' + tileType);
    }
});

Crafty.c('water--inner-corner', {
    init: function() {
        var tileTypes = [
            'water--inner-corner--1',
            'water--inner-corner--2',
            'water--inner-corner--3',
            'water--inner-corner--4'
        ];
        var tileType = tileTypes[random(0, tileTypes.length - 1)];
        this.requires('tile, ' + tileType);
    }
});

Crafty.c('water--vert', {
    init: function() {
        var tileTypes = [
            'water--vert--1',
            'water--vert--2',
            'water--vert--3',
            'water--vert--4'
        ];
        var tileType = tileTypes[random(0, tileTypes.length - 1)];
        this.requires('tile, ' + tileType);
    }
});

Crafty.c('water--hor', {
    init: function() {
        var tileTypes = [
            'water--hor--1',
            'water--hor--2',
            'water--hor--3',
            'water--hor--4'
        ];
        var tileType = tileTypes[random(0, tileTypes.length - 1)];
        this.requires('tile, ' + tileType);
    }
});

Crafty.c('water--small-corner', {
    init: function() {
        var tileTypes = [
            'water--small-corner--1',
            'water--small-corner--2',
            'water--small-corner--3',
            'water--small-corner--4'
        ];
        var tileType = tileTypes[random(0, tileTypes.length - 1)];
        this.requires('tile, ' + tileType);
    }
});

Crafty.c('water--corner', {
    init: function() {
        var tileTypes = [
            'water--corner--1',
            'water--corner--2',
            'water--corner--3',
            'water--corner--4'
        ];
        var tileType = tileTypes[random(0, tileTypes.length - 1)];
        this.requires('tile, ' + tileType);
    }
});

Crafty.c('object', {
    init: function() {
        this.requires('item');
    }
});

/*
Crafty.c('PlayerCharacter', {
    init: function() {
        this.requires('object, Fourway, Collision, spr_player, SpriteAnimation')
            .fourway(2)
            .stopOnSolids()
            .onHit('Village', this.visitVillage)
            .reel('PlayerMovingRight', 1000, [[0, 1], [1, 1], [2, 1], [3, 1], [4, 1], [5, 1], [6, 1], [7, 1]])
            .reel('PlayerMovingLeft',  1000, [[0, 0], [1, 0], [2, 0], [3, 0], [4, 0], [5, 0], [6, 0], [7, 0]])
            // TODO
            .reel('PlayerMovingUp',    1000, [[0, 0], [1, 0], [2, 0], [3, 0], [4, 0], [5, 0], [6, 0], [7, 0]])
            .reel('PlayerMovingDown',  1000, [[0, 0], [1, 0], [2, 0], [3, 0], [4, 0], [5, 0], [6, 0], [7, 0]])
        ;

        // Watch for a change of direction and switch animations accordingly
        var animation_speed = 4;
        this.bind('NewDirection', function(data) {
            if (data.x > 0) {
                this.animate('PlayerMovingRight', -1);
            } else if (data.x < 0) {
                this.animate('PlayerMovingLeft', -1);
            } else if (data.y > 0) {
                this.animate('PlayerMovingDown', -1);
            } else if (data.y < 0) {
                this.animate('PlayerMovingUp', -1);
            } else {
                this.pauseAnimation();
            }
        });
    },

    // Registers a stop-movement function to be called when
    //  this entity hits an entity with the 'Solid' component
    stopOnSolids: function() {
        this.onHit('Solid', this.stopMovement);

        return this;
    },

    // Stops the movement
    stopMovement: function() {
        this._speed = 0;
        if (this._movement) {
            this.x -= this._movement.x;
            this.y -= this._movement.y;
        }
    },

    // Respond to this player visiting a village
    visitVillage: function(data) {
        var village = data[0].obj;
        village.visit();
    }
});
*/

/*
Crafty.c('Village', {
    init: function() {
        this.requires('tile, spr_village');
    },

    // Process a visitation with this village
    visit: function() {
        this.destroy();
        //Crafty.audio.play('knock');
        Crafty.trigger('VillageVisited', this);
        console.log('VillageVisited');
    }
});
*/
