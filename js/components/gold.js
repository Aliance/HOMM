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

        var amount = Crafty.math.randomInt(500, 1000);
        console.log('pick up gold: ' + amount);
    }
});
