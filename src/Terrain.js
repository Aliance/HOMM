export default {
    WATER: 'w',
    GRASS: 'g',
    DIRT: 'd',
    LAVA: 'l',
    SUBTERRANEAN: 's', // Подземелье
    ROUGH: 'r', // Каместистая
    SAND: 'a',
    SNOW: 'n',
    SWAMP: 'w',
    
    getTypeBasePenaltyModifier(type) {
        switch (type) {
            case this.ROUGH:
                return 1.25;
            case this.SAND:
            case this.SNOW:
                return 1.5;
            case this.SWAMP:
                return 1.75;
            default:
                return 1;
        }
    }
};