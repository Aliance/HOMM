Crafty.defineScene('Town', function() {
    // нижняя плашка
    Crafty.e('2D, Canvas, Image')
        .image('./images/interface/town/footer.png')
        .attr({
            x: 0,
            y: 374
        });

    // задний фон
    Crafty.e('2D, Canvas').addComponent('town--background--' + Game.activeTown.getType());

    // иконка города
    var icon = 'town--icon--';

    if (!Game.activeTown.hasFort()) {
        icon += 'village--';
    }

    if (Game.activeTown.wasBuiltToday()) {
        icon += 'built--';
    }

    icon += Game.activeTown.getType();

    Crafty.e('2D, DOM')
        .addComponent(icon)
        .attr({
            w: 56,
            h: 62,
            z: 2,
            x: 16,
            y: 388
        });

    // название города
    Crafty.e('2D, DOM, Text')
        .text(Game.activeTown.getTitle())
        .textColor('white')
        .textFont({
            lineHeight: '17px',
            weight: 'bold',
            family: 'Arial'
        })
        .attr({
            w: 144,
            h: 17,
            z: 2,
            x: 85,
            y: 388
        });

    // иконка холла
    var hallIcon = 'village-hall';

    if (Game.activeTown.hasTownHall()) {
        hallIcon = 'town-hall';
    }

    if (Game.activeTown.hasCityHall()) {
        hallIcon = 'city-hall';
    }

    if (Game.activeTown.hasCapitol()) {
        hallIcon = 'capitol';
    }

    Crafty.e('2D, Canvas')
        .addComponent('town--building--icon--' + hallIcon)
        .attr({
            z: 2,
            x: 80,
            y: 413
        });

    // иконка замка
    var castleIcon = 'none';

    if (Game.activeTown.hasFort()) {
        castleIcon = 'fort';
    }

    if (Game.activeTown.hasCitadel()) {
        castleIcon = 'citadel';
    }

    if (Game.activeTown.hasCastle()) {
        castleIcon = 'castle';
    }

    Crafty.e('2D, Canvas')
        .addComponent('town--building--icon--' + castleIcon)
        .attr({
            z: 2,
            x: 122,
            y: 413
        });

    // ежедневный доход
    var income = 500;

    if (Game.activeTown.hasTownHall()) {
        income = 1000;
    }

    if (Game.activeTown.hasCityHall()) {
        income = 2000;
    }

    if (Game.activeTown.hasCapitol()) {
        income = 4000;
    }

    Crafty.e('2D, DOM, Text')
        .text(income)
        .textColor('white')
        .textFont({
            lineHeight: '17px',
            weight: 'bold',
            family: 'Arial'
        })
        .css('text-align', 'center')
        .attr({
            w: 60,
            h: 17,
            z: 2,
            x: 164,
            y: 434
        });

    // значки выбора городов справа
    for (var i = 0, l = Game.towns.length; i < l; i++) {
        var town = Game.towns[i];

        var icon = 'town--choose--';
        if (!town.hasFort()) {
            icon += 'village--';
        }
        if (town.wasBuiltToday()) {
            icon += 'built--';
        }
        icon += town.getType();

        Crafty.e('2D, Canvas')
            .addComponent(icon)
            .attr({
                z: 2,
                x: 744,
                y: 430 + i * 32
            });

        // подсветку для текущего выбранного
        if (town[0] === Game.activeTown[0]) {
            Crafty.e('2D, Canvas')
                .addComponent('town--choose--highlight')
                .attr({
                    z: 3,
                    x: 744,
                    y: 430 + i * 32
                });
        }
    }
});
