Crafty.defineScene('Game', function() {
    for (var x = 0; x < Game.grid.cols; x++) {
        for (var y = 0; y < Game.grid.rows; y++) {
            if (x == 0 || x == Game.grid.cols - 1 || y == 0 || y == Game.grid.rows - 1) {
                Crafty.e('border')
                    .at(x, y)
                    // TODO: debug
                    .text(x+', '+y)
                    ;
            } else {
                Crafty.e('grass')
                    .at(x, y)
                    // TODO: debug
                    .text(x+', '+y)
                ;
            }
        }
    }

    // TODO: сделать спрайты всех героев
    var availableHeroTypes = [
        //'alchemist',
        //'barbarian',
        //'battle-mage',
        //'beastmaster',
        //'cleric',
        'death-knight',
        //'demoniac',
        //'druid',
        //'heretic',
        //'knight',
        //'necromancer',
        //'overlord',
        //'ranger',
        //'warlock',
        //'witch'
    ];

    Crafty.e(Crafty.math.randomElementOfArray(availableHeroTypes))
        .at(Crafty.math.randomInt(2, Game.grid.cols-2), Crafty.math.randomInt(2, Game.grid.rows-3))
        .at(2, 2);
});
