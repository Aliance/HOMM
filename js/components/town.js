Crafty.c('town', {
    init: function() {
        this.collisionMarginLeft = 96;

        this.title = '';

        this.type = null;

        this.isVisited = false;

        this._wasBuiltToday = false;

        this.buildings = new TownBuildings(this);

        this.creatures = [];

        this.requires('grid')
            .addComponent('Collision')
            //.addComponent('SolidHitBox') // DEBUG
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
            x: x * Game.grid.tileSize - this.collisionMarginLeft,
            y: y * Game.grid.tileSize - Game.components.town.tile.height + Game.grid.tileSize
        });
        return this;
    },

    /**
     * @returns {*}
     */
    initCollision: function() {
        var polygon = new Crafty.polygon(
            // top left
            [this.collisionMarginLeft,                      Game.components.town.tile.height - Game.grid.tileSize],
            // top right
            [this.collisionMarginLeft + Game.grid.tileSize, Game.components.town.tile.height - Game.grid.tileSize],
            // bottom right
            [this.collisionMarginLeft + Game.grid.tileSize, Game.components.town.tile.height],
            // bottom left
            [this.collisionMarginLeft,                      Game.components.town.tile.height]
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

        Game.activeTown = this;

        Crafty.enterScene('Town');

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

        Game.activeTown = null;

        console.log('hero leave a town');

        return this;
    },

    setTitle: function(title) {
        this.title = title;
        return this;
    },

    getTitle: function() {
        return this.title;
    },

    setType: function(type) {
        this.type = type;

        if (!this.hasFort()) {
            type += '-village';
        }

        if (this.hasCapitol()) {
            type += '-capital';
        }

        this.addComponent(type);

        return this;
    },

    getType: function() {
        return this.type;
    },

    wasBuiltToday: function() {
        return this._wasBuiltToday;
    },

    hasTownHall: function() {
        return this.buildings.hasTownHall();
    },

    hasCityHall: function() {
        return this.buildings.hasCityHall();
    },

    hasCapitol: function() {
        return this.buildings.hasCapitol();
    },

    hasFort: function() {
        return this.buildings.hasFort();
    },

    hasCitadel: function() {
        return this.buildings.hasCitadel();
    },

    hasCastle: function() {
        return this.buildings.hasCastle();
    },

    buildFort: function() {
        this.removeComponent(this.type + '-village');
        this.buildings.buildFort();
        this.addComponent(this.type);
    }
});
