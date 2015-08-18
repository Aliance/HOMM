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
                tile: Game.grid.tileSize,
                tileh: Game.grid.tileSize,
                map: Game.components.dirt.map,
                paddingX: 1
            },
            './images/landscape/grass.png': {
                tile: Game.grid.tileSize,
                tileh: Game.grid.tileSize,
                map: Game.components.grass.map,
                paddingX: 1
            },
            './images/landscape/lava.png': {
                tile: Game.grid.tileSize,
                tileh: Game.grid.tileSize,
                map: Game.components.lava.map,
                paddingX: 1
            },
            './images/landscape/rock.png': {
                tile: Game.grid.tileSize,
                tileh: Game.grid.tileSize,
                map: Game.components.rock.map,
                paddingX: 1
            },
            './images/landscape/rough.png': {
                tile: Game.grid.tileSize,
                tileh: Game.grid.tileSize,
                map: Game.components.rough.map,
                paddingX: 1
            },
            './images/landscape/sand.png': {
                tile: Game.grid.tileSize,
                tileh: Game.grid.tileSize,
                map: Game.components.sand.map,
                paddingX: 1
            },
            './images/landscape/snow.png': {
                tile: Game.grid.tileSize,
                tileh: Game.grid.tileSize,
                map: Game.components.snow.map,
                paddingX: 1
            },
            './images/landscape/subbtl.png': {
                tile: Game.grid.tileSize,
                tileh: Game.grid.tileSize,
                map: Game.components.subbtl.map,
                paddingX: 1
            },
            './images/landscape/swamp.png': {
                tile: Game.grid.tileSize,
                tileh: Game.grid.tileSize,
                map: Game.components.swamp.map,
                paddingX: 1
            },
            './images/landscape/water.png': {
                tile: Game.grid.tileSize,
                tileh: Game.grid.tileSize,
                map: Game.components.water.map,
                paddingX: 1
            },
            './images/sprites/movement.png': {
                tile: Game.grid.tileSize,
                tileh: Game.grid.tileSize,
                map: Game.components.movement.map
            },
            './images/creatures/lazure.png': {
                tile: Game.components.creatures.tile.width,
                tileh: Game.components.creatures.tile.height,
                map: Game.components.creatures.map
            },
            './images/objects/terrain/AVLctrg0.png': {
                tile: Game.components.object.tile.width,
                tileh: Game.components.object.tile.height,
                map: Game.components.object.map
            },
            /* MINES */
            './images/sprites/mines.png': {
                tile: Game.components.mine.tile.width,
                tileh: Game.components.mine.tile.height,
                map: Game.components.mine.map
            },
            /* RESOURCES */
            './images/sprites/resources.png': {
                tile: Game.components.resource.tile.width,
                tileh: Game.components.resource.tile.height,
                map: Game.components.resource.map
            },
            /* TOWNS */
            './images/sprites/towns.png': {
                tile: Game.components.town.tile.width,
                tileh: Game.components.town.tile.height,
                map: Game.components.town.map
            },
            /* HEROES */
            './images/heroes/alchemist.png': {
                tile: Game.components.hero.tile.width,
                tileh: Game.components.hero.tile.height,
                map: Game.components.hero.getMap('alchemist')
            },
            './images/heroes/cleric.png': {
                tile: Game.components.hero.tile.width,
                tileh: Game.components.hero.tile.height,
                map: Game.components.hero.getMap('cleric')
            },
            './images/heroes/death-knight.png': {
                tile: Game.components.hero.tile.width,
                tileh: Game.components.hero.tile.height,
                map: Game.components.hero.getMap('death-knight')
            },
            './images/heroes/demoniac.png': {
                tile: Game.components.hero.tile.width,
                tileh: Game.components.hero.tile.height,
                map: Game.components.hero.getMap('demoniac')
            },
            './images/heroes/druid.png': {
                tile: Game.components.hero.tile.width,
                tileh: Game.components.hero.tile.height,
                map: Game.components.hero.getMap('druid')
            },
            './images/heroes/heretic.png': {
                tile: Game.components.hero.tile.width,
                tileh: Game.components.hero.tile.height,
                map: Game.components.hero.getMap('heretic')
            },
            './images/heroes/knight.png': {
                tile: Game.components.hero.tile.width,
                tileh: Game.components.hero.tile.height,
                map: Game.components.hero.getMap('knight')
            },
            './images/heroes/ranger.png': {
                tile: Game.components.hero.tile.width,
                tileh: Game.components.hero.tile.height,
                map: Game.components.hero.getMap('ranger')
            },
            './images/heroes/wizard.png': {
                tile: Game.components.hero.tile.width,
                tileh: Game.components.hero.tile.height,
                map: Game.components.hero.getMap('wizard')
            }
        }
    };

    Crafty.load(
        assets,
        function() {
            Game.components.hero.createAnimation();
            Game.components.resource.createAnimation();
            Game.components.creatures.createAnimation();

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
