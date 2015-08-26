var
    CONST_CREATURE_LEVEL_1 = 1 << 0,
    CONST_CREATURE_LEVEL_2 = 1 << 1,
    CONST_CREATURE_LEVEL_3 = 1 << 2,
    CONST_CREATURE_LEVEL_4 = 1 << 3,
    CONST_CREATURE_LEVEL_5 = 1 << 4,
    CONST_CREATURE_LEVEL_6 = 1 << 5,
    CONST_CREATURE_LEVEL_7 = 1 << 6,

    CONST_CREATURE_UPGRADED = 1 << 7, // upgraded?

    CONST_CREATURE_TYPE_NEUTRAL    = 1 << 8,
    CONST_CREATURE_TYPE_CASTLE     = 1 << 9, // castle
    CONST_CREATURE_TYPE_RAMPART    = 1 << 10, // rampart
    CONST_CREATURE_TYPE_TOWER      = 1 << 11, // tower
    CONST_CREATURE_TYPE_INFERNO    = 1 << 12, // inferno
    CONST_CREATURE_TYPE_NECROPOLIS = 1 << 13, // necropolis
    CONST_CREATURE_TYPE_DUNGEON    = 1 << 14, // dungeon
    CONST_CREATURE_TYPE_STRONGHOLD = 1 << 15, // stronghold
    CONST_CREATURE_TYPE_FORTRESS   = 1 << 16, // fortress
    CONST_CREATURE_TYPE_CONFLUX    = 1 << 17, // conflux

    CONST_CREATURE_SPECIAL_AZURE_DRAGON = 1 << 18
    ;

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
