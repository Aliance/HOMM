Crafty.c('crystal', {
    init: function() {
        this.requires('resource');
    },

    remove: function(isDestroyed) {
        if (!isDestroyed) return;

        var amount = Crafty.math.randomInt(3, 6);
        console.log('pick up crystal: ' + amount);
    }
});
