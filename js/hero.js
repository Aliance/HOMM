function Hero(type) {
    var availableTypes = [
        'alchemist',
        'barbarian',
        'battle-mage',
        'beastmaster',
        'cleric',
        'death-knight',
        'demoniac',
        'druid',
        'heretic',
        'knight',
        'necromancer',
        'overlord',
        'ranger',
        'warlock',
        'witch'
    ];

    if ($.inArray(type, availableTypes) === -1) {
        throw new Error('Unknown hero type "' + type + '"');
    }

    this.type = type;

    this.draw = function() {
        $('<div>')
            .addClass('object object--hero object--hero--' + this.type)
            .css({
                left: random(150, 750) + 'px',
                top: random(100, 400) + 'px'
            })
            .appendTo($container);
    };
}
