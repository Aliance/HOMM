Crafty.c('town', {
    init: function() {
        this.collisionMarginLeft = 80;

        this.isVisited = false;

        this.requires('grid')
            .addComponent('Collision')
            .addComponent('SolidHitBox') // DEBUG
            //.addComponent('VisibleMBR') // DEBUG
            .attr({
                w: Game.components.town.tile.width,
                h: Game.components.town.tile.height,
                z: 3
            })
            .initCollision()
            .onHit('hero', this.onVisit, this.onLeave)
    },

    /**
     * @param {Number} x
     * @param {Number} y
     * @returns {*}
     */
    at: function(x, y) {
        this.attr({
            x: x * Game.grid.tile.size - this.collisionMarginLeft,
            y: y * Game.grid.tile.size - Game.components.town.tile.height + Game.grid.tile.size
        });
        return this;
    },

    /**
     * @returns {*}
     */
    initCollision: function() {
        var polygon = new Crafty.polygon(
            // top left
            [this.collisionMarginLeft,                        Game.components.town.tile.height - Game.grid.tile.height],
            // top right
            [this.collisionMarginLeft + Game.grid.tile.width, Game.components.town.tile.height - Game.grid.tile.height],
            // bottom right
            [this.collisionMarginLeft + Game.grid.tile.width, Game.components.town.tile.height],
            // bottom left
            [this.collisionMarginLeft,                        Game.components.town.tile.height]
        );

        this.collision(polygon);

        return this;
    },

    /**
     * @returns {*}
     */
    onVisit: function() {
        if (this.isVisited) {
            return this;
        }

        if (!this.isVisited) {
            this.isVisited = true;
        }

        console.log('hero visit a town');

        return this;
    },

    /**
     * @returns {*}
     */
    onLeave: function() {
        if (!this.isVisited) {
            console.log('something goes wrong');
        }

        this.isVisited = false;

        console.log('hero leave a town');

        return this;
    }
});
