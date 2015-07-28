Crafty.c('hero', {
    init: function() {
        this._skin = 'hero';
        this.marginLeft = 6;

        this.requires('grid')
            .addComponent('SpriteAnimation, Tween, Collision')
            // TODO: debug
            //.addComponent('VisibleMBR')
            .addComponent('SolidHitBox')
            .attr({
                w: Game.components.hero.tile.width,
                h: Game.components.hero.tile.height,
                z: Game.components.hero.zIndex
            })
            .stand('r')
            .initReels()
            .enableKeyboard()
            .initCollision()
        ;

        this.origin('center');
    },

    at: function(x, y) {
        this.attr({
            x: x * Game.grid.tile.width - this.marginLeft,
            y: y * Game.grid.tile.height - Game.components.hero.tile.height + Game.grid.tile.height
        });
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
                    this.moveIt('l');
                    break;
                case Crafty.keys.RIGHT_ARROW:
                    this.moveIt('r');
                    break;
                case Crafty.keys.UP_ARROW:
                    this.moveIt('t');
                    break;
                case Crafty.keys.DOWN_ARROW:
                    this.moveIt('b');
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
        this.reel('walk_r', Game.components.hero.moveDuration, Game.components.hero.animation[Game.components.hero.skinPrefix + 'walk_r'])
            .reel('walk_l', Game.components.hero.moveDuration, Game.components.hero.animation[Game.components.hero.skinPrefix + 'walk_l'])
            .reel('walk_b', Game.components.hero.moveDuration, Game.components.hero.animation[Game.components.hero.skinPrefix + 'walk_b'])
            .reel('walk_t', Game.components.hero.moveDuration, Game.components.hero.animation[Game.components.hero.skinPrefix + 'walk_t']);

        return this;
    },

    /**
     * Make the character stand
     * @param o
     * @returns {*}
     */
    stand: function(o) {
        if (!o) {
            o = this._orientation;
        } else {
            this._orientation = o;
        }

        for (var comp in this.__c) if (this.__c.hasOwnProperty(comp)) {
            if (comp.indexOf(Game.components.hero.skinPrefix) == 0) {
                this.removeComponent(comp);
            }
        }

        this.addComponent(this._skin + '_' + o);

        return this;
    },

    /**
     * Make the character move
     * @param o
     * @returns {*}
     */
    moveIt: function(o) {
        this.stand(o);

        var tween = {};

        var movement = Game.components.hero.movement;

        switch (o) {
            case 'r':
                tween.x = this.x + movement;
                break;
            case 'l':
                tween.x = this.x - movement;
                break;
            case 'b':
                tween.y = this.y + movement;
                break;
            case 't':
                tween.y = this.y - movement;
                break;
        }

        this.animate('walk_'+ o)
            .bind('AnimationEnd', function() {
                this.unbind('AnimationEnd');
            })
            .tween(tween, Game.components.hero.moveDuration)
        ;
    },

    /**
     * @returns {*}
     */
    initCollision: function() {
        var polygon = new Crafty.polygon(
            [this.marginLeft + 1,                        Game.components.hero.tile.height - Game.grid.tile.height + 1],
            [this.marginLeft + 1,                        Game.components.hero.tile.height - 1],
            [this.marginLeft + Game.grid.tile.width - 1, Game.components.hero.tile.height - 1],
            [this.marginLeft + Game.grid.tile.width - 1, Game.components.hero.tile.height - Game.grid.tile.height + 1]
        );

        this.collision(polygon)
            .onHit('border', this.stopMovement)
        ;

        return this;
    },

    /**
     * @param hitData
     */
    stopMovement: function(hitData) {
        console.log('[hit] %O', hitData[0].obj);

        this.cancelTween(this);

        console.log('orientation: ', this._orientation);
        console.log('hero: %O', this);

        var movement = Game.components.hero.movement;
        var movement = 1;

        switch (this._orientation) {
            case 'r':
                this.x -= movement;
                break;
            case 'l':
                this.x += movement;
                break;
            case 'b':
                this.y -= movement;
                break;
            case 't':
                this.y += movement;
                break;
        }

        //this._isPlaying = true;
    }
});

Crafty.c('alchemist', {
    init: function() {
        this.requires('hero');
    }
});
Crafty.c('barbarian', {
    init: function() {
        this.requires('hero');
    }
});
Crafty.c('battle-mage', {
    init: function() {
        this.requires('hero');
    }
});
Crafty.c('beastmaster', {
    init: function() {
        this.requires('hero');
    }
});
Crafty.c('cleric', {
    init: function() {
        this.requires('hero');
    }
});
Crafty.c('death-knight', {
    init: function() {
        this.requires('hero');
    }
});
Crafty.c('demoniac', {
    init: function() {
        this.requires('hero');
    }
});
Crafty.c('druid', {
    init: function() {
        this.requires('hero');
    }
});
Crafty.c('heretic', {
    init: function() {
        this.requires('hero');
    }
});
Crafty.c('knight', {
    init: function() {
        this.requires('hero');
    }
});
Crafty.c('necromancer', {
    init: function() {
        this.requires('hero');
    }
});
Crafty.c('overlord', {
    init: function() {
        this.requires('hero');
    }
});
Crafty.c('ranger', {
    init: function() {
        this.requires('hero');
    }
});
Crafty.c('warlock', {
    init: function() {
        this.requires('hero');
    }
});
Crafty.c('witch', {
    init: function() {
        this.requires('hero');
    }
});
