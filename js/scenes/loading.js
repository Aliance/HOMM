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
            './images/landscape/dirt.png': {
                tile: Game.grid.tile.size,
                tileh: Game.grid.tile.size,
                map: Game.components.dirt.map,
                paddingX: 1
            },
            './images/landscape/grass.png': {
                tile: Game.grid.tile.size,
                tileh: Game.grid.tile.size,
                map: Game.components.grass.map,
                paddingX: 1
            },
            './images/landscape/lava.png': {
                tile: Game.grid.tile.size,
                tileh: Game.grid.tile.size,
                map: Game.components.lava.map,
                paddingX: 1
            },
            './images/landscape/rock.png': {
                tile: Game.grid.tile.size,
                tileh: Game.grid.tile.size,
                map: Game.components.rock.map,
                paddingX: 1
            },
            './images/landscape/rough.png': {
                tile: Game.grid.tile.size,
                tileh: Game.grid.tile.size,
                map: Game.components.rough.map,
                paddingX: 1
            },
            './images/landscape/sand.png': {
                tile: Game.grid.tile.size,
                tileh: Game.grid.tile.size,
                map: Game.components.sand.map,
                paddingX: 1
            },
            './images/landscape/snow.png': {
                tile: Game.grid.tile.size,
                tileh: Game.grid.tile.size,
                map: Game.components.snow.map,
                paddingX: 1
            },
            './images/landscape/subbtl.png': {
                tile: Game.grid.tile.size,
                tileh: Game.grid.tile.size,
                map: Game.components.subbtl.map,
                paddingX: 1
            },
            './images/landscape/swamp.png': {
                tile: Game.grid.tile.size,
                tileh: Game.grid.tile.size,
                map: Game.components.swamp.map,
                paddingX: 1
            },
            './images/landscape/water.png': {
                tile: Game.grid.tile.size,
                tileh: Game.grid.tile.size,
                map: Game.components.water.map,
                paddingX: 1
            },
            './images/resources/tiles.png': {
                tile: Game.grid.tile.size,
                tileh: Game.grid.tile.size,
                map: Game.components.resource.getMap()
            },
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
            './images/movement.png': {
                tile: Game.grid.tile.size,
                tileh: Game.grid.tile.size,
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
