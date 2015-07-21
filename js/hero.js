function Hero(type) {
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
