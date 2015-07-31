Crafty.c('wood', {
    init: function() {
        this.requires('resource')
            .addComponent('shining--wood')
        ;
    },

    remove: function(isDestroyed) {
        if (!isDestroyed) return;

        var amount = Crafty.math.randomInt(5, 10);
        console.log('pick up wood: ' + amount);
    }
});
