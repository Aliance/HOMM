var
    CONST_HERO_TYPE_KNIGHT       = 1 << 0, // castle
    CONST_HERO_TYPE_CLERIC       = 1 << 1, // castle
    CONST_HERO_TYPE_RANGER       = 1 << 2, // rampart
    CONST_HERO_TYPE_DRUID        = 1 << 3, // rampart
    CONST_HERO_TYPE_ALCHEMIST    = 1 << 4, // tower
    CONST_HERO_TYPE_WIZARD       = 1 << 5, // tower
    CONST_HERO_TYPE_HERETIC      = 1 << 6, // inferno
    CONST_HERO_TYPE_DEMONIAC     = 1 << 7, // inferno
    CONST_HERO_TYPE_DEATH_KNIGHT = 1 << 8, // necropolis
    CONST_HERO_TYPE_NECROMANCER  = 1 << 9, // necropolis
    CONST_HERO_TYPE_OVERLORD     = 1 << 10, // dungeon
    CONST_HERO_TYPE_WARLOCK      = 1 << 11, // dungeon
    CONST_HERO_TYPE_BARBARIAN    = 1 << 12, // stronghold
    CONST_HERO_TYPE_BATTLE_MAGE  = 1 << 13, // stronghold
    CONST_HERO_TYPE_BEASTMASTER  = 1 << 14, // fortress
    CONST_HERO_TYPE_WITCH        = 1 << 15, // fortress
    CONST_HERO_TYPE_ELEMENTALIST = 1 << 16, // conflux
    CONST_HERO_TYPE_PLANESWALKER = 1 << 17 // conflux
    ;

var CONST_HERO_EDRIC         = 1,
    CONST_HERO_LORD_HAART    = 2,
    CONST_HERO_ORRIN         = 3,
    CONST_HERO_SIR_CHRISTIAN = 4,
    CONST_HERO_SORSHA        = 5,
    CONST_HERO_SYLVIA        = 6,
    CONST_HERO_TYRIS         = 7,
    CONST_HERO_VALESKA       = 8,
    CONST_HERO_ADELA         = 9,
    CONST_HERO_ADELAIDE      = 10,
    CONST_HERO_CAITLIN       = 11,
    CONST_HERO_CUTHBERT      = 12,
    CONST_HERO_INGHAM        = 13,
    CONST_HERO_LOYNIS        = 14,
    CONST_HERO_RION          = 15,
    CONST_HERO_SANYA         = 16,
    CONST_HERO_CLANCY        = 17,
    CONST_HERO_IVOR          = 18,
    CONST_HERO_JENOVA        = 19,
    CONST_HERO_KYRRE         = 20,
    CONST_HERO_MEPHALA       = 21,
    CONST_HERO_RYLAND        = 22,
    CONST_HERO_THORGRIM      = 23,
    CONST_HERO_UFRETIN       = 24,
    CONST_HERO_AERIS         = 25,
    CONST_HERO_ALAGAR        = 26,
    CONST_HERO_CORONIUS      = 27,
    CONST_HERO_ELLESHAR      = 28,
    CONST_HERO_GEM           = 29,
    CONST_HERO_MALCOM        = 30,
    CONST_HERO_MELODIA       = 31,
    CONST_HERO_ULAND         = 32,
    CONST_HERO_FAFNER        = 33,
    CONST_HERO_IONA          = 34,
    CONST_HERO_JOSEPHINE     = 35,
    CONST_HERO_NEELA         = 36,
    CONST_HERO_PIQUEDRAM     = 37,
    CONST_HERO_RISSA         = 38,
    CONST_HERO_THANE         = 39,
    CONST_HERO_TOROSAR       = 40,
    CONST_HERO_AINE          = 41,
    CONST_HERO_ASTRAL        = 42,
    CONST_HERO_CYRA          = 43,
    CONST_HERO_DAREMYTH      = 44,
    CONST_HERO_HALON         = 45,
    CONST_HERO_SERENA        = 46,
    CONST_HERO_SOLMYR        = 47,
    CONST_HERO_THEODORUS     = 48,
    CONST_HERO_              = 49;
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

        var oldPosition = this.getTile(),
            newPosition = this.getTile()
            ;

        var t = this;
        var direction = '';
        var tween = {};
        var movement = Game.components.hero.movement;

        if (tile[1] > oldPosition.y) {
            direction += 's';
            tween.y = this.y + movement;
            newPosition.y += 1;
        } else if (tile[1] < oldPosition.y) {
            direction += 'n';
            tween.y = this.y - movement;
            newPosition.y -= 1;
        }

        if (tile[0] > oldPosition.x) {
            direction += 'e';
            tween.x = this.x + movement;
            newPosition.x += 1;
        } else if (tile[0] < oldPosition.x) {
            direction += 'w';
            tween.x = this.x - movement;
            newPosition.x -= 1;
        }

        console.log('moving: ' + direction);

        Game.grid.matrix[oldPosition.y][oldPosition.x] = CONST_WALKABLE;
        Game.grid.objectMatrix[oldPosition.y][oldPosition.x] = CONST_WALKABLE;
        Game.grid.matrix[newPosition.y][newPosition.x] = CONST_NOT_WALKABLE;
        Game.grid.objectMatrix[newPosition.y][newPosition.x] = CONST_TEMPORARY_NOT_WALKABLE;

        mapData.heroes[newPosition.x][newPosition.y] = mapData.heroes[oldPosition.x][oldPosition.y];
        delete mapData.heroes[oldPosition.x][oldPosition.y];

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
