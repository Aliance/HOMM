Crafty.defineScene('Game', function() {
    // TODO: рисовать реальный ландшафт
    Crafty.background("url(./images/grass.png)");

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
        .at(Crafty.math.randomInt(0, Game.grid.rows-1), Crafty.math.randomInt(0, Game.grid.cols-1))
        .skin(Game.components.hero.skinPrefix)
        .stand('r')
        .enableKeyboard();
});
