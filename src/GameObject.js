import GameManager from './GameManager.js';
import CursorType from './CursorType.js';
import ObjectType from './ObjectType.js';

export default class GameObject {
    constructor() {
        this.sprite = null;
        this.x = 0;
        this.y = 0;
        this.layer = '';
        this.spriteName = '';
        this.gameManager = GameManager.getInstance();
    }
    
    placeOnMap(layer, x, y) {
        this.layer = layer;
        this.x = x;
        this.y = y;
        this.gameManager.map.placeObject(this, layer, x, y);
        this.addSprite(x, y);
        
        let displayGroup = this.gameManager.displayGroups[layer];
        displayGroup.add(this.sprite);

        this.afterPlaceOnMap();
    }
    
    addSprite(x, y) {
        let tileSize = this.gameManager.tileSize;
        this.sprite = this.gameManager.game.add.sprite(x * tileSize, y * tileSize, this.getSpriteName());
        
        this.createAnimation();
    }
    
    removeFromMap() {
        
    }
    
    getSpriteName() { }
    createAnimation() { }
    afterPlaceOnMap() { }
    
    getCursorType() {
        return CursorType.NORMAL;
    }
    
    getType() {
        return ObjectType.UNKNOWN;
    }
    
    getMapData() {
        return {};
    }
}