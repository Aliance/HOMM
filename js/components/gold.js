Crafty.c('gold', {
    init: function() {
        this.requires('resource');
    },

    remove: function(isDestroyed) {
        if (!isDestroyed) return;

        var amount = Crafty.math.randomInt(500, 1000);
        console.log('pick up gold: ' + amount);
    }
});
