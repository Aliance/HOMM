Crafty.c('creature', {
    init: function() {
        this.collisionMarginLeft = 4;

        this.isInBattle = false;

        this.requires('grid')
            .addComponent('Collision') // DEBUG
            //.addComponent('SolidHitBox') // DEBUG
            //.addComponent('VisibleMBR') // DEBUG
            .attr({
                w: Game.components.creatures.tile.width,
                h: Game.components.creatures.tile.height,
                z: 3
            })
            .initCollision()
            .onHit('hero', this.onFightStart, this.onFightEnd)
        ;
    },

    /**
     * @param {Number} x
     * @param {Number} y
     * @returns {*}
     */
    at: function(x, y) {
        this.attr({
            x: x * Game.grid.tileSize - this.collisionMarginLeft,
            y: y * Game.grid.tileSize - Game.components.creatures.tile.height + Game.grid.tileSize
        });
        return this;
    },

    /**
     * @returns {*}
     */
    initCollision: function() {
        var polygon = new Crafty.polygon(
            // top left
            [this.collisionMarginLeft,                      Game.components.creatures.tile.height - Game.grid.tileSize],
            // top right
            [this.collisionMarginLeft + Game.grid.tileSize, Game.components.creatures.tile.height - Game.grid.tileSize],
            // bottom right
            [this.collisionMarginLeft + Game.grid.tileSize, Game.components.creatures.tile.height],
            // bottom left
            [this.collisionMarginLeft,                      Game.components.creatures.tile.height]
        );

        this.collision(polygon);

        return this;
    },

    /**
     * @returns {*}
     */
    onFightStart: function() {
        if (this.isInBattle) {
            return this;
        }

        if (!this.isInBattle) {
            this.isInBattle = true;
        }

        console.log('hero started a fight with the creature');

        return this;
    },

    /**
     * @returns {*}
     */
    onFightEnd: function() {
        if (!this.isInBattle) {
            console.log('something goes wrong');
        }

        this.isInBattle = false;

        console.log('hero finish battle with the creature');

        return this;
    }
});
