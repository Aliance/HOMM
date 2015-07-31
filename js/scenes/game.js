Crafty.defineScene('Game', function() {
    Crafty.e('treasure-chest').at(4, 2);

    Crafty.e('gold').at(2, 4);
    Crafty.e('wood').at(2, 6);
    Crafty.e('ore').at(4, 6);
    Crafty.e('gem').at(4, 4);
    Crafty.e('crystal').at(6, 4);
    Crafty.e('sulphur').at(6, 2);
    Crafty.e('mercury').at(6, 6);

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

    Crafty.e(Crafty.math.randomElementOfArray(availableHeroTypes)).at(2, 2);

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
});
