Crafty.c('gem', {
    init: function() {
        this.requires('resource')
            .addComponent('SpriteAnimation, shining--gem')
            .reel('shining', Game.components.resource.animationDuration, Game.components.resource.animation['gem'])
            .animate('shining', -1)
        ;
    },

    remove: function(isDestroyed) {
        if (!isDestroyed) return;

        var amount = Crafty.math.randomInt(3, 6);
        console.log('pick up gem: ' + amount);
    }
});
