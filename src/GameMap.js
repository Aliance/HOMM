export default class {
    constructor() {
        this.width = 0;
        this.height = 0;
        this.layers = {};
        this.passabilityMap = [];
        this.mapObjects = new Map();
        this.mapObjectsCounter = 0;
    }
    
    load(url) {
        $.getJSON(url, (data) => {
            this.processMap(data);
        });
    }
    
    processMap(mapData) {
        this.width = mapData.layers.terrain[0].length;
        this.height = mapData.layers.terrain.length;
        this.layers = mapData.layers;
        
        for (let y = 0; y < this.height; y++) {
            this.passabilityMap[y] = [];
            for (let x = 0; x < this.height; x++) {
                /**
                 * Заполняем карту проходимости
                 * 0 - непроходимо. Все остльное - проходимо
                 * Чем больше 1, тем сложнее пройти. Можно float
                 * Трава = 100. Не может быть от 0 до 1
                 */
                this.passabilityMap[y][x] = 100;
            }
        }
    }
    
    getTileAt(layer, x, y) {
        let row = this.layers[layer][y];
        if (!row) {
            return null;
        }
        
        let tile = row[x];
        if (tile == undefined) {
            return null;
        }
        
        return {
            type: tile[0],
            index: parseInt(tile.substr(1), 10)
        };
    }
    
    getObjectAt(x, y) {
        let row = this.layers['objects'][y];
        if (!row) {
            return null;
        }
        
        let tile = row[x];

        if (tile == undefined) {
            return null;
        }
        
        return this.mapObjects.get(tile);
    }
    
    placeObject(obj, layer, x, y) {
        this.mapObjects.set(this.mapObjectsCounter, obj);
        
        if (!this.layers[layer][y]) {
            this.layers[layer][y] = [];
        }
        
        this.layers[layer][y][x] = this.mapObjectsCounter;
        this.mapObjectsCounter++;
        //this.passabilityMap[y][x] = 0;
    }
    
    moveObject(layer, oldX, oldY, newX, newY) {
        let objId = this.layers[layer][oldY][oldX];
        this.layers[layer][oldY][oldX] = null;
        
        if (!this.layers[layer][newY]) {
            this.layers[layer][newY] = [];
        }
        this.layers[layer][newY][newX] = objId;
        
        //this.passabilityMap[newY][newX] = this.passabilityMap[oldY][oldX];
    }
    
    isTilePassable(x, y) {
        return this.passabilityMap[y][x] != 0;
    }
}
