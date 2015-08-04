Crafty.c('hero', {
    init: function() {
        this.marginLeft = 6;

        this.requires('grid')
            .addComponent('SpriteAnimation, Tween, Collision, MoveTo')
            .addComponent('SolidHitBox')
            .attr({
                w: Game.components.hero.tile.width,
                h: Game.components.hero.tile.height,
                z: Game.components.hero.zIndex
            })
            .initReels()
            .enableKeyboard()
            .initCollision()
        ;

        this.origin('center');
    },

    /**
     * @param {Number} x
     * @param {Number} y
     * @returns {*}
     */
    at: function(x, y) {
        this.attr({
            x: x * Game.grid.tile.width - this.marginLeft,
            y: y * Game.grid.tile.height - Game.components.hero.tile.height + Game.grid.tile.height
        });
        return this;
    },

    /**
     * @returns {{x: *, y: *}}
     */
    getTile: function() {
        return {
            x: Math.floor((this.x + this.marginLeft) / Game.grid.tile.width),
            y: Math.floor((this.y + Game.components.hero.tile.height - Game.grid.tile.height) / Game.grid.tile.height)
        };
    },

    /**
     * @param {String} type
     * @returns {*}
     */
    setType: function(type) {
        this.type = type;
        return this;
    },

    /**
     * Enable keyboard commands.
     * @returns {*}
     */
    enableKeyboard: function() {
        this.unbind('KeyDown');

        this.bind('KeyDown', function(e) {
            if (this.isPlaying()) {
                return;
            }

            switch (e.key) {
                case Crafty.keys.LEFT_ARROW:
                    this.moveIt('left');
                    break;
                case Crafty.keys.RIGHT_ARROW:
                    this.moveIt('right');
                    break;
                case Crafty.keys.UP_ARROW:
                    this.moveIt('top');
                    break;
                case Crafty.keys.DOWN_ARROW:
                    this.moveIt('bottom');
                    break;
            }
        });

        return this;
    },

    /**
     * Define reels for the character
     * @returns {*}
     */
    initReels: function() {
        this.reel('walk_right',  Game.components.hero.moveDuration, Game.components.hero.animation['walk_right'])
            .reel('walk_left',   Game.components.hero.moveDuration, Game.components.hero.animation['walk_left'])
            .reel('walk_bottom', Game.components.hero.moveDuration, Game.components.hero.animation['walk_bottom'])
            .reel('walk_top',    Game.components.hero.moveDuration, Game.components.hero.animation['walk_top']);

        return this;
    },

    /**
     * Make the character stand
     * @param {String} orientation
     * @returns {*}
     */
    stand: function(orientation) {
        this.removeComponent(this.type + '--move--right');
        this.removeComponent(this.type + '--move--left');
        this.removeComponent(this.type + '--move--top');
        this.removeComponent(this.type + '--move--bottom');

        this.addComponent(this.type + '--move--' + orientation);

        return this;
    },

    /**
     * Make the character move
     * @param {String} orientation
     * @returns {*}
     */
    moveIt: function(orientation) {
        this.stand(orientation);

        var t = this,
            tween = {},
            newPosition = this.getTile(),
            movement = Game.components.hero.movement;

        switch (orientation) {
            case 'right':
                tween.x = this.x + movement;
                newPosition.x += 1;
                break;
            case 'left':
                tween.x = this.x - movement;
                newPosition.x -= 1;
                break;
            case 'bottom':
                tween.y = this.y + movement;
                newPosition.y += 1;
                break;
            case 'top':
                tween.y = this.y - movement;
                newPosition.y -= 1;
                break;
        }

        // the cell we trying to move on is unbridgeable
        if (Game.grid.cells[newPosition.x][newPosition.y] === 1) {
            return;
        }

        this.animate('walk_'+ orientation)
            .bind('AnimationEnd', function() {
                t.stand(orientation).unbind('AnimationEnd');
            })
            .tween(tween, Game.components.hero.moveDuration)
        ;
    },

    /**
     * @returns {*}
     */
    initCollision: function() {
        var polygon = new Crafty.polygon(
            // top left
            [this.marginLeft + 1,                        Game.components.hero.tile.height - Game.grid.tile.height + 1],
            // top right
            [this.marginLeft + Game.grid.tile.width - 1, Game.components.hero.tile.height - Game.grid.tile.height + 1],
            // bottom right
            [this.marginLeft + Game.grid.tile.width - 1, Game.components.hero.tile.height - 1],
            // bottom left
            [this.marginLeft + 1,                        Game.components.hero.tile.height - 1]
        );

        this.collision(polygon);

        return this;
    }
});
