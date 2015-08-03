Crafty.c('gold', {
    init: function() {
        this.requires('resource')
            .addComponent('SpriteAnimation, shining--gold')
            .reel('shining', Game.components.resource.animationDuration, Game.components.resource.animation['gold'])
            .animate('shining', -1)
        ;
    },

    remove: function(isDestroyed) {
        if (!isDestroyed) return;

        var availableAmounts = [
            500, 550, 600, 650,
            700, 750, 800, 850,
            900, 950, 1000
        ];
        var amount = Crafty.math.randomElementOfArray(availableAmounts);
        console.log('pick up gold: ' + amount);
    }
});
