var CONST_MAP_SIZE_S = 36;
var CONST_MAP_SIZE_M = 72;
var CONST_MAP_SIZE_L = 108;
var CONST_MAP_SIZE_XL = 144;

var HOMM = {
    grid: {
        tileSize:  32
    },

    start: function() {
        $container.empty();

        HOMM.size = CONST_MAP_SIZE_S;

        Crafty.init(800, 600, $container.get(0));
    }
};
