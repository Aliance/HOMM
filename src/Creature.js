import GameObject from './GameObject.js';
import ObjectType from './ObjectType.js';

export default class extends GameObject {
    getType() {
        return ObjectType.CREATURE;
    }
}