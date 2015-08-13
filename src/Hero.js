import GameManager from './GameManager.js';
import CursorType from './CursorType.js';
import Terrain from './Terrain.js';
import GameObject from './GameObject.js';
import ObjectType from './ObjectType.js';

export default class Hero extends GameObject {
    constructor() {
        super();

        this.gameManager = GameManager.getInstance();
        this.name = 'Random Hero';
        this.movementMax = 0;
        this.movement = 0;
        this.passMap = [];
        this.lastMoveDirection = '01';
        
        this.x = 0;
        this.y = 0;
    }

    place(x, y) {
        this.x = x;
        this.y = y;
        this.gameManager.map.placeObject(this, 'objects', x, y);
        let displayGroup = this.gameManager.displayGroups['objects'];
        let tileSize = this.gameManager.tileSize;
        
        this.sprite = this.gameManager.game.add.sprite(x * tileSize, y * tileSize, 'hero-' + this.type);
        //this.sprite.animations.add('walk-right', [21, 22, 23, 24, 25, 26, 27, 28]);
        let spriteFrameIndexes = this.sprite.animations.frameData.getFrameIndexes();
        this.sprite.animations.add('walk-n', spriteFrameIndexes.slice(37, 44));
        this.sprite.animations.add('walk-ne', spriteFrameIndexes.slice(29, 36));
        this.sprite.animations.add('walk-e', spriteFrameIndexes.slice(21, 28));
        this.sprite.animations.add('walk-se', spriteFrameIndexes.slice(13, 20));
        this.sprite.animations.add('walk-s', spriteFrameIndexes.slice(5, 12));
        //this.sprite.animations.add('walk-left', [21, 22, 23, 24, 25, 26, 27, 28]);
        
        this.sprite.anchor.x = 0.32;
        this.sprite.anchor.y = 0.5;
        
        this.updatePassabilityMap();

        displayGroup.add(this.sprite);
    }

    moveOne(xOffset, yOffset) {
        this.gameManager.blockedInput = true;
        
        this.sprite.animations.play('walk-right', 20);
        
        let tw = this.gameManager.getGame().add.tween(this.sprite);
        tw.to({
            x: this.sprite.x + xOffset * this.gameManager.tileSize,
            y: this.sprite.y + yOffset * this.gameManager.tileSize
        }, 300);
        tw.onComplete.addOnce(() => {
            this.sprite.animations.stop(null, true);
            this.gameManager.blockedInput = false;
            this.gameManager.displayGroups['objects'].sort('y', Phaser.Group.SORT_ASCENDING);
        }, this);
        tw.start();
        
        let lastX = this.x;
        let lastY = this.y;
        
        this.x += xOffset;
        this.y += yOffset;
        
        this.gameManager.game.add.tween(this.gameManager.getGame().camera).to({
            x: this.gameManager.getGame().camera.x + xOffset * this.gameManager.tileSize,
            y: this.gameManager.getGame().camera.y + yOffset * this.gameManager.tileSize
        }, 500).start();
        
        this.gameManager.map.moveObject(lastX, lastY, this.x, this.y);
    }
    
    movePath(path) {
        this.currentPath = path;
        var step = this.currentPath.shift();
        this.gameManager.game.camera.follow(this.sprite);
        
        this.processMoveStep(step);
    }
    
    processMoveStep(step) {
        let x = step[0] - this.x;
        let y = step[1] - this.y;
        let moveDirection = x + '' + y;
        let diagonalMultiplier = (Math.abs(x) == 1 && Math.abs(y) == 1) ? 1.41 : 1;
        
        let tw = this.gameManager.game.add.tween(this.sprite);
        tw.to({
            x: step[0] * this.gameManager.tileSize,
            y: step[1] * this.gameManager.tileSize
        }, 300 * diagonalMultiplier);
        tw.onComplete.addOnce(() => {
            this.gameManager.displayGroups['objects'].sort('y', Phaser.Group.SORT_ASCENDING);
            if (this.currentPath.length > 0) {
                this.processMoveStep(this.currentPath.shift());
            } else {
                this.sprite.animations.stop(null, true);
                this.updatePassabilityMap();
            }
        }, this);
        
        this.gameManager.map.moveObject('objects', this.x, this.y, step[0], step[1]);
        
        if (x < 0) {
            this.sprite.anchor.x = 1 - 0.32;
            this.sprite.scale.x = -1;
        } else {
            this.sprite.anchor.x = 0.32;
            this.sprite.scale.x = 1;
        }
        
        if (this.lastMoveDirection != moveDirection) {
            this.playAnimationByDirection(moveDirection);
            this.lastMoveDirection = moveDirection;
        }
        
        this.x = step[0];
        this.y = step[1];
        
        this.gameManager.displayGroups['path'].getTop().destroy();
        
        tw.start();
    }
    
    playAnimationByDirection(direction) {
        switch (direction) {
            case '11':
            case '-11':
                this.sprite.animations.play('walk-se', 20, true);
                break;
            case '0-1':
                this.sprite.animations.play('walk-n', 20, true);
                break;
            case '01':
                this.sprite.animations.play('walk-s', 20, true);
                break;
            case '-1-1':
            case '1-1':
                this.sprite.animations.play('walk-ne', 20, true);
                break;
            case '10':
            case '-10':
                this.sprite.animations.play('walk-e', 20, true);
                break;
        }
    }
    
    getMapData() {
        return {
            
        };
    }
    
    updatePassabilityMap() {
        let map = this.gameManager.map;
        this.passMap = [];
        
        for (let y = 0; y < map.height; y++) {
            this.passMap[y] = [];
            for (let x = 0; x < map.width; x++) {
                this.passMap[y][x] = -1;
            }
        }
        for (let y = 0; y < map.height; y++) {
            for (let x = 0; x < map.width; x++) {
                if (this.passMap[y][x] > -1) {
                    continue;
                }
                let obj = map.getObjectAt(x, y);
                if (obj) {
                    let type = obj.getType();
                    if (type == ObjectType.CREATURE) {
                        for (let i = -1; i <= 1; i++) {
                            for (let j = -1; j <= 1; j++) {
                                if (y + i > 0 && y + i < map.height && x + j > 0 && x - j < map.width) {
                                    // let testObj = map.getObjectAt(x + j, y + i);
                                    // if (testObj) {
                                    //     continue;
                                    // }
                                    this.passMap[y + i][x + j] = 0;
                                }
                            }
                        }
                    }
                    this.passMap[y][x] = 0;
                } else {
                    this.passMap[y][x] = Terrain.getTypeBasePenaltyModifier(map.layers['terrain'][y][x][0]);
                }
            }
        }
    }
    
    getCursorType() {
        return CursorType.HERO;
    }
    
    static getHeroTypes() {
        return {
            BARBARIAN: 0
        };
    }
    
    static getHeroInfo() {
        
    }
    
    /**
     * 
     */
    update(game) {
        //game.
    }
}