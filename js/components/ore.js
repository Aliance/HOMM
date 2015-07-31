Crafty.c('ore', {
    init: function() {
        this.requires('resource')
            .addComponent('shining--ore')
        ;
    },

    remove: function(isDestroyed) {
        if (!isDestroyed) return;

        var amount = Crafty.math.randomInt(5, 10);
        console.log('pick up ore: ' + amount);
    }
});
