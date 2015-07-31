Crafty.c('crystal', {
    init: function() {
        this.requires('resource')
            .addComponent('SpriteAnimation, shining--crystal')
            .reel('shining', Game.components.resource.animationDuration, Game.components.resource.animation['crystal'])
            .animate('shining', -1)
        ;
    },

    remove: function(isDestroyed) {
        if (!isDestroyed) return;

        var amount = Crafty.math.randomInt(3, 6);
        console.log('pick up crystal: ' + amount);
    }
});
