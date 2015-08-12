import GameObject from '../GameObject.js';
import CursorType from '../CursorType.js';
import ObjectType from '../ObjectType.js';

export default class Chest extends GameObject {
    constructor() {
        super();

        this.experience = 100;
        this.gold = 1000;
    }
    
    getSpriteName() {
        return 'map-chest';
    }
    
    addSprite(x, y) {
        super.addSprite(x, y);
        this.sprite.anchor.x = 0.5;
    }
    
    createAnimation() {
        this.sprite.animations.add('shine');
    }
    
    getCursorType() {
        return CursorType.ACTION;
    }
    
    getType() {
        return ObjectType.RESOURCE;
    }
}