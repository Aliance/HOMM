/**
 * @link http://heroes.thelazy.net/wiki/List_of_all_the_hero_specialties
 * @link http://heroes.thelazy.net/wiki/Hero_specialty
 */
Crafty.c('hero', {
    flipDirection: [
        'sw',
        'w',
        'nw'
    ],

    init: function() {
        this.requires('grid')
            .addComponent('SpriteAnimation, Tween, Collision, MoveTo')
            //.addComponent('SolidHitBox') // DEBUG
            //.addComponent('VisibleMBR') // DEBUG
            .attr({
                w: Game.components.hero.tile.width,
                h: Game.components.hero.tile.height,
                z: 4
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
            x: x * Game.grid.tileSize - Game.grid.tileSize,
            y: y * Game.grid.tileSize - Game.grid.tileSize
        });
        return this;
    },

    /**
     * @returns {{x: *, y: *}}
     */
    getTile: function() {
        return {
            x: Math.floor((this.x + Game.grid.tileSize) / Game.grid.tileSize),
            y: Math.floor((this.y + Game.grid.tileSize) / Game.grid.tileSize)
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
     * @param {String} name
     * @returns {*}
     */
    setName: function(name) {
        this.name = name;
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
                    this.moveIt('w');
                    break;
                case Crafty.keys.RIGHT_ARROW:
                    this.moveIt('e');
                    break;
                case Crafty.keys.UP_ARROW:
                    this.moveIt('n');
                    break;
                case Crafty.keys.DOWN_ARROW:
                    this.moveIt('s');
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
        this.reel('walk_e',  Game.components.hero.moveDuration, Game.components.hero.animation['walk_e'])
            .reel('walk_w',  Game.components.hero.moveDuration, Game.components.hero.animation['walk_w'])
            .reel('walk_s',  Game.components.hero.moveDuration, Game.components.hero.animation['walk_s'])
            .reel('walk_n',  Game.components.hero.moveDuration, Game.components.hero.animation['walk_n'])
            .reel('walk_se', Game.components.hero.moveDuration, Game.components.hero.animation['walk_se'])
            .reel('walk_sw', Game.components.hero.moveDuration, Game.components.hero.animation['walk_sw'])
            .reel('walk_ne', Game.components.hero.moveDuration, Game.components.hero.animation['walk_ne'])
            .reel('walk_nw', Game.components.hero.moveDuration, Game.components.hero.animation['walk_nw'])
        ;

        return this;
    },

    /**
     * Make the character stand
     * @param {String} direction
     * @returns {*}
     */
    stand: function(direction) {
        this.removeComponent(this.type + '--move--n');
        this.removeComponent(this.type + '--move--ne');
        this.removeComponent(this.type + '--move--e');
        this.removeComponent(this.type + '--move--se');
        this.removeComponent(this.type + '--move--s');
        this.removeComponent(this.type + '--move--sw');
        this.removeComponent(this.type + '--move--w');
        this.removeComponent(this.type + '--move--nw');

        this.addComponent(this.type + '--move--' + direction);

        if ($.inArray(direction, this.flipDirection) !== -1) {
            this.flip('X');
        } else {
            this.unflip('X');
        }

        return this;
    },

    /**
     * Make the character move
     * @param {String} direction
     * @returns {*}
     */
    moveIt: function(direction) {
        Crafty('movement').destroy();

        this.stand(direction);

        var t = this,
            tween = {},
            oldPosition = this.getTile(),
            newPosition = this.getTile(),
            movement = Game.components.hero.movement;

        switch (direction) {
            case 'e':
                tween.x = this.x + movement;
                newPosition.x += 1;
                break;
            case 'w':
                tween.x = this.x - movement;
                newPosition.x -= 1;
                break;
            case 's':
                tween.y = this.y + movement;
                newPosition.y += 1;
                break;
            case 'n':
                tween.y = this.y - movement;
                newPosition.y -= 1;
                break;
        }

        // prevent from moving of the edge of the map
        if (newPosition.x < 0 || newPosition.x >= Game.grid.cols || newPosition.y < 0 || newPosition.y >= Game.grid.rows) {
            return;
        }

        console.log('moving from [%d, %d] tile to [%d, %d] tile', oldPosition.x, oldPosition.y, newPosition.x, newPosition.y);

        // the cell we trying to move on is unbridgeable
        if (Game.grid.objectMatrix[newPosition.y][newPosition.x] === CONST_NOT_WALKABLE) {
            return;
        }

        Game.grid.matrix[oldPosition.y][oldPosition.x] = CONST_WALKABLE;
        Game.grid.objectMatrix[oldPosition.y][oldPosition.x] = CONST_WALKABLE;
        Game.grid.matrix[newPosition.y][newPosition.x] = CONST_NOT_WALKABLE;
        Game.grid.objectMatrix[newPosition.y][newPosition.x] = CONST_TEMPORARY_NOT_WALKABLE;

        this.animate('walk_'+ direction)
            .one('AnimationEnd', function() {
                t.stand(direction);
            })
            .tween(tween, Game.components.hero.moveDuration)
        ;
    },

    movePath: function() {
        console.log('movePath: %O', this.path);

        // вырезаем начальную точку, где стоит герой
        this.path.shift();

        // и вызываем рекурсивно функцию движения, передавая ей точку, куда следует идти в след. шаге
        this._move(this.path.shift());
    },

    _move: function(tile) {
        Crafty('movement').get(0).destroy();

        var oldPosition = this.getTile();

        var t = this;
        var direction = '';
        var tween = {};
        var movement = Game.components.hero.movement;

        if (tile[1] > oldPosition.y) {
            direction += 's';
            tween.y = this.y + movement;
        } else if (tile[1] < oldPosition.y) {
            direction += 'n';
            tween.y = this.y - movement;
        }

        if (tile[0] > oldPosition.x) {
            direction += 'e';
            tween.x = this.x + movement;
        } else if (tile[0] < oldPosition.x) {
            direction += 'w';
            tween.x = this.x - movement;
        }

        console.log('moving: ' + direction);

        this.stand(direction)
            .animate('walk_'+ direction)
            .one('AnimationEnd', function() {
                t.stand(direction);

                if (t.path.length) {
                    t._move(t.path.shift());
                } else {
                    Game.activeHero.disregardMouseInput = false;
                }
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
            [Game.grid.tileSize + 1,     Game.grid.tileSize + 1],
            // top right
            [Game.grid.tileSize * 2 - 1, Game.grid.tileSize + 1],
            // bottom right
            [Game.grid.tileSize * 2 - 1, Game.grid.tileSize * 2 - 1],
            // bottom left
            [Game.grid.tileSize + 1,     Game.grid.tileSize * 2 - 1]
        );

        this.collision(polygon);

        return this;
    }
});
