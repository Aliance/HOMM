export default class Map {
    constructor(width, height) {
        this.width = width;
        this.height = height;
        this.levels = [];
        this.passabilityMap = [];

        for (let y = 0; y < height; y++) {
            this.passabilityMap[y] = [];
            for (let x = 0; x < height; x++) {
                /**
                 * Заполняем карту проходимости
                 * 0 - непроходимо. Все остльное - проходимо
                 * Чем больше 1, тем сложнее пройти. Можно float
                 */
                this.passabilityMap[y][x] = 1;
            }
        }
    }
}
