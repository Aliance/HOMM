Crafty.c('mercury', {
    init: function() {
        this.requires('resource')
            .addComponent('shining--mercury')
        ;
    },

    remove: function(isDestroyed) {
        if (!isDestroyed) return;

        var amount = Crafty.math.randomInt(3, 6);
        console.log('pick up mercury: ' + amount);
    }
});
