var tiles = [];

// generate a random water map
(function() {
    for (var i = 20; --i;) {
        var tileContainer = [];
        for (var j = 30; --j;) {
            tileContainer.push('tile--water tile--' + random(20, 32));
        }
        tiles.push(tileContainer);
    }

    // левый верхний угол
    tiles[3][4] = 'tile--water tile--18';
    tiles[4][4] = 'tile--water tile--17 tile--position-2';
    tiles[4][3] = 'tile--water tile--18';

    // правый верхний угол
    tiles[3][24] = 'tile--water tile--18 tile--position-1';
    tiles[4][24] = 'tile--water tile--17 tile--position-3';
    tiles[4][25] = 'tile--water tile--18 tile--position-1';

    // левый нижний угол
    tiles[14][3] = 'tile--water tile--19 tile--position-3';
    tiles[14][4] = 'tile--water tile--17 tile--position-1';
    tiles[15][4] = 'tile--water tile--19 tile--position-3';

    // правый нижний угол
    tiles[14][25] = 'tile--water tile--19 tile--position-2';
    tiles[14][24] = 'tile--water tile--17';
    tiles[15][24] = 'tile--water tile--19 tile--position-2';

    // верхний берег
    tiles[3][5]  = 'tile--water tile--' + random(8, 11) + ' tile--position-2';
    tiles[3][6]  = 'tile--water tile--' + random(8, 11) + ' tile--position-2';
    tiles[3][7]  = 'tile--water tile--' + random(8, 11) + ' tile--position-2';
    tiles[3][8]  = 'tile--water tile--' + random(8, 11) + ' tile--position-2';
    tiles[3][9]  = 'tile--water tile--' + random(8, 11) + ' tile--position-2';
    tiles[3][10] = 'tile--water tile--' + random(8, 11) + ' tile--position-2';
    tiles[3][11] = 'tile--water tile--' + random(8, 11) + ' tile--position-2';
    tiles[3][12] = 'tile--water tile--' + random(8, 11) + ' tile--position-2';
    tiles[3][13] = 'tile--water tile--' + random(8, 11) + ' tile--position-2';
    tiles[3][14] = 'tile--water tile--' + random(8, 11) + ' tile--position-2';
    tiles[3][15] = 'tile--water tile--' + random(8, 11) + ' tile--position-2';
    tiles[3][16] = 'tile--water tile--' + random(8, 11) + ' tile--position-2';
    tiles[3][17] = 'tile--water tile--' + random(8, 11) + ' tile--position-2';
    tiles[3][18] = 'tile--water tile--' + random(8, 11) + ' tile--position-2';
    tiles[3][19] = 'tile--water tile--' + random(8, 11) + ' tile--position-2';
    tiles[3][20] = 'tile--water tile--' + random(8, 11) + ' tile--position-2';
    tiles[3][21] = 'tile--water tile--' + random(8, 11) + ' tile--position-2';
    tiles[3][22] = 'tile--water tile--' + random(8, 11) + ' tile--position-2';
    tiles[3][23] = 'tile--water tile--' + random(8, 11) + ' tile--position-2';

    // нижний берег
    tiles[15][5]  = 'tile--water tile--' + random(8, 11);
    tiles[15][6]  = 'tile--water tile--' + random(8, 11);
    tiles[15][7]  = 'tile--water tile--' + random(8, 11);
    tiles[15][8]  = 'tile--water tile--' + random(8, 11);
    tiles[15][9]  = 'tile--water tile--' + random(8, 11);
    tiles[15][10] = 'tile--water tile--' + random(8, 11);
    tiles[15][11] = 'tile--water tile--' + random(8, 11);
    tiles[15][12] = 'tile--water tile--' + random(8, 11);
    tiles[15][13] = 'tile--water tile--' + random(8, 11);
    tiles[15][14] = 'tile--water tile--' + random(8, 11);
    tiles[15][15] = 'tile--water tile--' + random(8, 11);
    tiles[15][16] = 'tile--water tile--' + random(8, 11);
    tiles[15][17] = 'tile--water tile--' + random(8, 11);
    tiles[15][18] = 'tile--water tile--' + random(8, 11);
    tiles[15][19] = 'tile--water tile--' + random(8, 11);
    tiles[15][20] = 'tile--water tile--' + random(8, 11);
    tiles[15][21] = 'tile--water tile--' + random(8, 11);
    tiles[15][22] = 'tile--water tile--' + random(8, 11);
    tiles[15][23] = 'tile--water tile--' + random(8, 11);

    // левый берег
    tiles[5][3]  = 'tile--water tile--' + random(4, 7) + ' tile--position-2';
    tiles[6][3]  = 'tile--water tile--' + random(4, 7) + ' tile--position-2';
    tiles[7][3]  = 'tile--water tile--' + random(4, 7) + ' tile--position-2';
    tiles[8][3]  = 'tile--water tile--' + random(4, 7) + ' tile--position-2';
    tiles[9][3]  = 'tile--water tile--' + random(4, 7) + ' tile--position-2';
    tiles[10][3] = 'tile--water tile--' + random(4, 7) + ' tile--position-2';
    tiles[11][3] = 'tile--water tile--' + random(4, 7) + ' tile--position-2';
    tiles[12][3] = 'tile--water tile--' + random(4, 7) + ' tile--position-2';
    tiles[13][3] = 'tile--water tile--' + random(4, 7) + ' tile--position-2';

    // правый берег
    tiles[5][25]  = 'tile--water tile--' + random(4, 7);
    tiles[6][25]  = 'tile--water tile--' + random(4, 7);
    tiles[7][25]  = 'tile--water tile--' + random(4, 7);
    tiles[8][25]  = 'tile--water tile--' + random(4, 7);
    tiles[9][25]  = 'tile--water tile--' + random(4, 7);
    tiles[10][25] = 'tile--water tile--' + random(4, 7);
    tiles[11][25] = 'tile--water tile--' + random(4, 7);
    tiles[12][25] = 'tile--water tile--' + random(4, 7);
    tiles[13][25] = 'tile--water tile--' + random(4, 7);

    // остров
    for (var k = 5; k < 14; k++) {
        for (var i = 5; i < 24; i++) {
            tiles[k][i] = 'tile--grass tile--' + random(1, 20);
        }
    }

    // внутренние углы
    tiles[5][5]   = 'tile--grass tile--' + random(77, 78) + ' tile--position-2';
    tiles[5][23]  = 'tile--grass tile--' + random(77, 78) + ' tile--position-3';
    tiles[13][5]  = 'tile--grass tile--' + random(77, 78) + ' tile--position-1';
    tiles[13][23] = 'tile--grass tile--' + random(71, 74);

    // верхняя береговая линяя острова
    tiles[4][5]  = 'tile--grass tile--' + random(59, 62);
    tiles[4][6]  = 'tile--grass tile--' + random(67, 70);
    tiles[4][7]  = 'tile--grass tile--' + random(67, 70);
    tiles[4][8]  = 'tile--grass tile--' + random(67, 70);
    tiles[4][9]  = 'tile--grass tile--' + random(67, 70);
    tiles[4][10] = 'tile--grass tile--' + random(67, 70);
    tiles[4][11] = 'tile--grass tile--' + random(67, 70);
    tiles[4][12] = 'tile--grass tile--' + random(67, 70);
    tiles[4][13] = 'tile--grass tile--' + random(67, 70);
    tiles[4][14] = 'tile--grass tile--' + random(67, 70);
    tiles[4][15] = 'tile--grass tile--' + random(67, 70);
    tiles[4][16] = 'tile--grass tile--' + random(67, 70);
    tiles[4][17] = 'tile--grass tile--' + random(67, 70);
    tiles[4][18] = 'tile--grass tile--' + random(67, 70);
    tiles[4][19] = 'tile--grass tile--' + random(67, 70);
    tiles[4][20] = 'tile--grass tile--' + random(67, 70);
    tiles[4][21] = 'tile--grass tile--' + random(67, 70);
    tiles[4][22] = 'tile--grass tile--' + random(67, 70);
    tiles[4][23] = 'tile--grass tile--' + random(59, 62) + ' tile--position-1';

    // нижняя береговая линяя острова
    tiles[14][5]  = 'tile--grass tile--' + random(59, 62) + ' tile--position-3';
    tiles[14][6]  = 'tile--grass tile--' + random(67, 70) + ' tile--position-2';
    tiles[14][7]  = 'tile--grass tile--' + random(67, 70) + ' tile--position-2';
    tiles[14][8]  = 'tile--grass tile--' + random(67, 70) + ' tile--position-2';
    tiles[14][9]  = 'tile--grass tile--' + random(67, 70) + ' tile--position-2';
    tiles[14][10] = 'tile--grass tile--' + random(67, 70) + ' tile--position-2';
    tiles[14][11] = 'tile--grass tile--' + random(67, 70) + ' tile--position-2';
    tiles[14][12] = 'tile--grass tile--' + random(67, 70) + ' tile--position-2';
    tiles[14][13] = 'tile--grass tile--' + random(67, 70) + ' tile--position-2';
    tiles[14][14] = 'tile--grass tile--' + random(67, 70) + ' tile--position-2';
    tiles[14][15] = 'tile--grass tile--' + random(67, 70) + ' tile--position-2';
    tiles[14][16] = 'tile--grass tile--' + random(67, 70) + ' tile--position-2';
    tiles[14][17] = 'tile--grass tile--' + random(67, 70) + ' tile--position-2';
    tiles[14][18] = 'tile--grass tile--' + random(67, 70) + ' tile--position-2';
    tiles[14][19] = 'tile--grass tile--' + random(67, 70) + ' tile--position-2';
    tiles[14][20] = 'tile--grass tile--' + random(67, 70) + ' tile--position-2';
    tiles[14][21] = 'tile--grass tile--' + random(67, 70) + ' tile--position-2';
    tiles[14][22] = 'tile--grass tile--' + random(67, 70) + ' tile--position-2';
    tiles[14][23] = 'tile--grass tile--' + random(59, 62) + ' tile--position-2';

    // левая береговая линяя острова
    tiles[5][4]  = 'tile--grass tile--' + random(59, 62);
    tiles[6][4]  = 'tile--grass tile--' + random(63, 66);
    tiles[7][4]  = 'tile--grass tile--' + random(63, 66);
    tiles[8][4]  = 'tile--grass tile--' + random(63, 66);
    tiles[9][4]  = 'tile--grass tile--' + random(63, 66);
    tiles[10][4] = 'tile--grass tile--' + random(63, 66);
    tiles[11][4] = 'tile--grass tile--' + random(63, 66);
    tiles[12][4] = 'tile--grass tile--' + random(63, 66);
    tiles[13][4] = 'tile--grass tile--' + random(59, 62) + ' tile--position-3';

    // правая береговая линяя острова
    tiles[5][24]  = 'tile--grass tile--' + random(59, 62) + ' tile--position-1';
    tiles[6][24]  = 'tile--grass tile--' + random(63, 66) + ' tile--position-2';
    tiles[7][24]  = 'tile--grass tile--' + random(63, 66) + ' tile--position-2';
    tiles[8][24]  = 'tile--grass tile--' + random(63, 66) + ' tile--position-2';
    tiles[9][24]  = 'tile--grass tile--' + random(63, 66) + ' tile--position-2';
    tiles[10][24] = 'tile--grass tile--' + random(63, 66) + ' tile--position-2';
    tiles[11][24] = 'tile--grass tile--' + random(63, 66) + ' tile--position-2';
    tiles[12][24] = 'tile--grass tile--' + random(63, 66) + ' tile--position-2';
    tiles[13][24]  = 'tile--grass tile--' + random(59, 62) + ' tile--position-2';

    // 9 15
})();

$(function() {
    $container.empty();
    for (var i = 0, l = tiles.length; i < l; i++) {
        var $tileContainer = $('<div>');

        for (var j = 0, _l = tiles[i].length; j < _l; j++) {
            var $tile = $('<div>');
            $tile
                .addClass('tile')
                .addClass(tiles[i][j])
                //.text(i+'/'+j)
                .appendTo($tileContainer)
            ;
        }

        $tileContainer.addClass('tile-container').appendTo($container);
    }

    var Overlord = new Hero('overlord');
    Overlord.draw();
});
