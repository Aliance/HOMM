Crafty.c('hero', {
    init: function(){
        this.addComponent('2D, DOM, SpriteAnimation, Tween')
            .attr({
                w: Game.components.hero.tile.width,
                h: Game.components.hero.tile.height,
                z: Game.components.hero.zIndex
            });

        this.origin('center');

        this._skin = null;
    },

    at: function(x, y) {
        this.attr({
            x: x * Game.grid.tile.width - 6,
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
     * Set a skin for the character
     * @param skin
     * @returns {*}
     */
    skin: function(skin) {
        this._skin = skin;

        this.reel('walk_r', Game.components.hero.moveDuration, Game.components.hero.animation[skin+'_walk_r'])
            .reel('walk_l', Game.components.hero.moveDuration, Game.components.hero.animation[skin+'_walk_l'])
            .reel('walk_b', Game.components.hero.moveDuration, Game.components.hero.animation[skin+'_walk_b'])
            .reel('walk_t', Game.components.hero.moveDuration, Game.components.hero.animation[skin+'_walk_t']);

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
        var tween = {};

        switch (o) {
            case 'r':
                tween.x = this.x + Game.grid.tile.width;
                break;
            case 'l':
                tween.x = this.x - Game.grid.tile.width;
                break;
            case 'b':
                tween.y = this.y + Game.grid.tile.height;
                break;
            case 't':
                tween.y = this.y - Game.grid.tile.height;
                break;
        }

        this.animate('walk_'+ o)
            .bind('AnimationEnd', function() {
                this.stand(o);
                this.unbind('AnimationEnd');
            })
            .tween(tween, Game.components.hero.moveDuration);
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
