/**
 * 32% chance for 1000 Gold or 500 experience;
 * 32% chance for 1500 Gold or 1000 experience;
 * 31% chance for 2000 Gold or 1500 experience;
 * 5% chance for random Treasure Artifact. If backpack is full, get choice of 1000 Gold or 500 experience;
 */
Crafty.c('chest', {
    init: function() {
        this.requires('grid')
            .addComponent('SpriteAnimation, shining--chest')
            .reel('shining', Game.components.resource.animationDuration, Game.components.resource.animation['chest'])
            .animate('shining', -1)
            .addComponent('Collision')
            //.addComponent('SolidHitBox') // DEBUG
            //.addComponent('VisibleMBR') // DEBUG
            .onHit('hero', this.pickUp)
            .attr({
                w: Game.components.resource.tile.width,
                h: Game.components.resource.tile.height,
                z: 2
            })
            .initCollision()
        ;
    },

    at: function(x, y) {
        this.attr({
            x: x * Game.grid.tileSize - Game.grid.tileSize,
            y: y * Game.grid.tileSize
        });
        return this;
    },

    pickUp: function() {
        var chance = Crafty.math.randomInt(1, 100);

        if (chance <= 5) {
            console.log('chance: %d [1-5]', chance);
            console.log('5% chance for random Treasure Artifact. If backpack is full, get choice of 1000 Gold or 500 experience');
        } else if (chance <= 36) {
            console.log('chance: %d [6-36]', chance);
            console.log('31% chance for 2000 Gold or 1500 experience');
        } else if (chance <= 68) {
            console.log('chance: %d [37-68]', chance);
            console.log('32% chance for 1500 Gold or 1000 experience');
        } else {
            console.log('chance: %d [69-100]', chance);
            console.log('32% chance for 1000 Gold or 500 experience');
        }

        this.destroy();
    },

    /**
     * @returns {*}
     */
    initCollision: function() {
        var polygon = new Crafty.polygon(
            // top left
            [Game.grid.tileSize,     0],
            // top right
            [Game.grid.tileSize * 2, 0],
            // bottom right
            [Game.grid.tileSize * 2, Game.grid.tileSize],
            // bottom left
            [Game.grid.tileSize,     Game.grid.tileSize]
        );

        this.collision(polygon);

        return this;
    }
});
