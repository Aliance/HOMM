Crafty.defineScene('Loading', function() {
    var loading = Crafty.e('2D, DOM, Text')
        .text('Loading: 0%')
        .attr({x: 0, y: Game.height() / 2 - 25, w: Game.width()})
        .textFont({'size': '25px', 'family': 'Verdana'})
        .css({'text-align': 'center'})
        .textColor('#444');
    Crafty.background('#ccc');

    var assets = {
        'sprites': {
            './images/heroes/death-knight.png': {
                tile: Game.components.hero.tile.width,
                tileh: Game.components.hero.tile.height,
                map: Game.components.hero.getMap()
            },
            './images/resources/tiles.png': {
                tile: Game.components.resource.tile.width,
                tileh: Game.components.resource.tile.height,
                map: Game.components.resource.getMap()
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
