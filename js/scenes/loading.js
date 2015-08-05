Crafty.defineScene('Loading', function() {
    var loading = Crafty.e('2D, DOM, Text')
        .text('Loading: 0%')
        .attr({x: 0, y: Game.height() / 2 - 25, w: Game.width()})
        .textFont({'size': '25px', 'family': 'Verdana'})
        .css({'text-align': 'center'})
        .textColor('#444');
    Crafty.background('#ccc');

    var assets = {
        'images': [
            './images/grass.png',
            './images/border.png'
        ],
        'sprites': {
            './images/heroes/knight.png': {
                tile: Game.components.hero.tile.width,
                tileh: Game.components.hero.tile.height,
                map: Game.components.hero.getMap('knight')
            },
            './images/heroes/death-knight.png': {
                tile: Game.components.hero.tile.width,
                tileh: Game.components.hero.tile.height,
                map: Game.components.hero.getMap('death-knight')
            },
            './images/resources/tiles.png': {
                tile: Game.components.resource.tile.width,
                tileh: Game.components.resource.tile.height,
                map: Game.components.resource.getMap()
            },
            './images/movement.png': {
                tile: Game.grid.size,
                tileh: Game.grid.size,
                map: Game.components.movement.map
            }
        }
    };

    Crafty.load(
        assets,
        function() {
            Game.components.hero.createAnimation();
            Game.components.resource.createAnimation();

            Crafty.enterScene('Game');
        },
        function (e) {
            loading.text('Loading: ' + e.percent.toFixed(0) + '%');
        },
        function (e) {
            Crafty.enterScene('Error');

            var src = e.src || '';
            throw new Error('Error on loading asset: ' + src.substr(src.lastIndexOf('/') + 1).toLowerCase());
        }
    );
});
