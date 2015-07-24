Crafty.defineScene('Error', function() {
    Crafty.e('2D, DOM, Text')
        .text('Loading error. Please try again later.')
        .attr({x: 0, y: Game.height() / 2 - 25, w: Game.width()})
        .textFont({'size': '25px', 'family': 'Verdana'})
        .css({'text-align': 'center'})
        .textColor('#444');
    Crafty.background('#ccc');
});
