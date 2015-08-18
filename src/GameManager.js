import GameMap from './GameMap.js';
import Hero from './Hero.js';
import Chest from './map_object/Chest.js';
import Dwarf from './creature/Dwarf.js';
import CursorType from './CursorType.js';
import Terrain from './Terrain.js';
import PF from './pf/PathFinding.js';
import ObjectType from './ObjectType.js';

export default class GameManager {
    init(container) {
        this.container = container;
        this.tileSize = 32;
        
        this.map = new GameMap(50, 50);
        
        this.selectedHero = null;
        this.blockedInput = false;
        this.lastPath = [];
        this.displayGroups = {};
        
        this.BootState = {
            name: 'Boot',

            /**
             * @param {Phaser.Game} game
             */
            preload: (game) => {
                game.load.spritesheet('terrain-g', require('file!images/tiles/grass.bmp'), this.tileSize, this.tileSize, 10, null, 1);
                game.load.spritesheet('terrain-d', require('file!images/tiles/dirt.bmp'), this.tileSize, this.tileSize, 10, null, 1);
                game.load.spritesheet('path', require('file!images/movement.png'), this.tileSize, this.tileSize);
                game.load.spritesheet('hero-planeswalker', require('file!images/heroes/planeswalker.png'), 96, 64);
                game.load.spritesheet('creature-dwarf', require('file!images/creatures/dwarf.png'), 64, 64);
                game.load.spritesheet('map-chest', require('file!images/resources/chest.png'), 64, 32);
                game.load.spritesheet('test', require('file!images/grass.png'), this.tileSize, this.tileSize, 1, null, 1);
            },

            /**
             * @param {Phaser.Game} game
             */
            create: (game) => {
                game.state.start(this.GameState.name);
            }
        };
        this.GameState = {
            name: 'Game',

            /**
             * @param {Phaser.Game} game
             */
            preload: (game) => {
                //this.map.load('test-map.json');
                game.load.json('map', 'test-map.json');
            },

            /**
             * @param {Phaser.Game} game
             */
            create: (game) => {
                this.map.processMap(game.cache.getJSON('map'));
                
                this.displayGroups.terrain = game.add.group();
                this.displayGroups.heroes = game.add.group();
                this.displayGroups.objects = game.add.group();
                this.displayGroups.path = game.add.group();
                this.displayGroups.cursor = game.add.group();
                
                //this.cursorSprite = game.add.image(0, 0, 'cursors');
                
                game.world.setBounds(0, 0, this.tileSize * this.map.width, this.tileSize * this.map.height);
                game.input.keyboard.addCallbacks(this, null, (e) =>  {
                    if (this.selectedHero && !this.blockedInput) {
                        this.displayGroups.path.removeAll();
                        
                        switch (e.keyCode) {
                            case 39:
                                if (this.map.isTilePassable(this.selectedHero.x + 1, this.selectedHero.y)) {
                                    this.selectedHero.moveOne(1, 0);
                                }
                                break;
                            case 37:
                                if (this.map.isTilePassable(this.selectedHero.x - 1, this.selectedHero.y)) {
                                    this.selectedHero.moveOne(-1, 0);
                                }
                                break;
                            case 38:
                                if (this.map.isTilePassable(this.selectedHero.x, this.selectedHero.y -1 )) {
                                    this.selectedHero.moveOne(0, -1);
                                }
                                break;
                            case 40:
                                if (this.map.isTilePassable(this.selectedHero.x, this.selectedHero.y + 1)) {
                                    this.selectedHero.moveOne(0, 1);
                                }
                                break;
                        }
                    }
                });
                
                // Меняем курсор
                game.input.addMoveCallback((e) => {
                    if (!this.selectedHero) {
                        return;
                    }
                    let mapX = (e.x + game.camera.x) / this.tileSize | 0;
                    let mapY = (e.y + game.camera.y) / this.tileSize | 0;
                    
                    let path = this.getPathTo(mapX, mapY);
                    let cursor = CursorType.NORMAL;
                    
                    if (path.length > 0) {
                        let mapObject = this.map.getObjectAt(mapX, mapY);
                        
                        if (mapObject) {
                            cursor = mapObject.getCursorType();
                        } else {
                            cursor = CursorType.MOVE;
                        }
                    }
                    
                    this.setCursor(cursor);
                }, this);
                
                game.input.mouse.mouseDownCallback = (e) => {
                    let tx = (e.x + game.camera.x) / this.tileSize | 0;
                    let ty = (e.y + game.camera.y) / this.tileSize | 0;
                    let lastStep = this.lastPath[this.lastPath.length - 1];
                    
                    if (this.lastPath.length == 0 || lastStep[0] != tx || lastStep[1] != ty) {
                        this.lastPath = this.buildPathTo(tx, ty);
                    } else {
                        this.lastPath.shift();
                        this.selectedHero.movePath(this.lastPath);
                    }
                };
                
                for (let y = 0; y < this.map.height; y++) {
                    for (let x = 0; x < this.map.width; x++) {
                        let tile = this.map.getTileAt('terrain', x, y);
                        if (tile) {
                            this.displayGroups.terrain.add(game.add.image(x * this.tileSize, y * this.tileSize, 'terrain-' + tile.type, tile.index));
                        }
                    }
                }
                
                let hero = new Hero(this);
                hero.type = 'planeswalker';
                hero.place(1, 1);
                this.selectedHero = hero;
                
                let chest = new Chest();
                chest.placeOnMap('objects', 2, 2);
                
                for (let i = 0; i < 5; i++) {
                    let chest = new Chest();
                    chest.placeOnMap('objects', 4 + i, 2);
                }
                
                let dwarf = new Dwarf();
                dwarf.placeOnMap('objects', 3, 3);
                
                hero.updatePassabilityMap();
                
                // this.hero = game.add.sprite(3 * 32, 2 * 32, 'hero-planeswalker', 0);
                // this.hero.anchor.x = 0.32;
                // this.hero.anchor.y = 0.5;
            },

            /**
             * @param {Phaser.Game} game
             */
            update: (game) => {
                // game.world.removeAll();
                
                // let cameraBounds = this.getCameraBounds();
                // for (let ty = cameraBounds.topLeft[1], y = -cameraBounds.offset[1]; y <= this.camera.height; ty++, y += this.tileSize) {
                //     if (ty < 0 || ty > this.map.height) {
                //         continue;
                //     }
                //     for (let tx = cameraBounds.topLeft[0], x = -cameraBounds.offset[0]; x <= this.camera.width; tx++, x += this.tileSize) {
                //         if (tx < 0 || tx > this.map.width) {
                //             //game.add.image(x, y, 'test', 0);
                //             continue;
                //         }
                //         let tile = this.map.getTileAt('terrain', tx, ty);
                //         if (tile) {
                //             game.add.image(x, y, 'terrain-' + tile.type, tile.index);
                //         }
                //     }
                // }
            }
        };

        this.game = new Phaser.Game(800, 600, Phaser.AUTO, this.container);
        this.game.state.add(this.BootState.name, this.BootState);
        this.game.state.add(this.GameState.name, this.GameState);
        
        this.setCursor(CursorType.NORMAL);

        this.game.state.start(this.BootState.name);
    }
    
    static getInstance() {
        if (!this.instance) {
            this.instance = new GameManager();
        }
        
        return this.instance;
    }
    
    getMap() {
        return this.map;
    }
    
    getGame() {
        return this.game;
    }
    
    getPathTo(x, y) {
        let grid = new PF.Grid(this.selectedHero.passMap);
        let objUnderCursor = this.map.getObjectAt(x, y);
        if (objUnderCursor && objUnderCursor.getType() == ObjectType.RESOURCE) {
            grid.setWalkableAt(x, y, true);
            //grid.setCostAt(x, y, );
        }
        let finder = new PF.AStarFinder({
            allowDiagonal: true
        });
        
        return finder.findPath(this.selectedHero.x, this.selectedHero.y, x, y, grid);
    }
    
    buildPathTo(x, y) {
        this.displayGroups.path.removeAll();
        
        let path = this.getPathTo(x, y);
        
        if (path.length > 0) {
            for (let i = path.length - 1; i > 0; i--) {
                let step = path[i];
                let pathFrame = 0;
                if (i > 0 && i < path.length - 1) {
                    let prev = this.getPathStepKey(path[i - 1], step);
                    let next = this.getPathStepKey(path[i + 1], step);
                    let str = prev + '' + next;
                    
                    switch (str) {
                        case '13':
                        case '43':
                            pathFrame = 20;
                            break;
                        case '16':
                            pathFrame = 19;
                            break;
                        case '19':
                            pathFrame = 10;
                            break;
                        case '18':
                            pathFrame = 1;
                            break;
                        case '17':
                        case '27':
                            pathFrame = 8;
                            break;
                        case '28':
                            pathFrame = 9;
                            break;
                        case '29':
                        case '39':
                            pathFrame = 18;
                            break;
                        case '38':
                            pathFrame = 17;
                            break;
                        case '37':
                            pathFrame = 16;
                            break;
                        case '34':
                            pathFrame = 7;
                            break;
                        case '31':
                        case '61':
                            pathFrame = 6;
                            break;
                        case '64':
                            pathFrame = 15;
                            break;
                        case '67':
                        case '97':
                            pathFrame = 24;
                            break;
                        case '94':
                            pathFrame = 23;
                            break;
                        case '91':
                            pathFrame = 14;
                            break;
                        case '92':
                            pathFrame = 5;
                            break;
                        case '93':
                        case '83':
                            pathFrame = 4;
                            break;
                        case '82':
                            pathFrame = 13;
                            break;
                        case '81':
                        case '71':
                            pathFrame = 22;
                            break;
                        case '72':
                            pathFrame = 21;
                            break;
                        case '73':
                            pathFrame = 12;
                            break;
                        case '76':
                            pathFrame = 3;
                            break;
                        case '79':
                        case '49':
                            pathFrame = 2;
                            break;
                        case '46':
                            pathFrame = 11;
                            break;
                    }
                }
                
                let image = this.game.add.image(step[0] * this.tileSize, step[1] * this.tileSize, 'path', pathFrame);
                this.displayGroups.path.add(image);
            }
        }
        
        return path;
    }
    
    getPathStepKey(step, midStep) {
        let x = step[0] - midStep[0];
        let y = step[1] - midStep[1];
        let str = x + '' + y;
        
        switch (str) {
            case '-1-1':
                return 7;
            case '0-1':
                return 8;
            case '1-1':
                return 9;
            case '-10':
                return 4;
            case '10':
                return 6;
            case '-11':
                return 1;
            case '01':
                return 2;
            case '11':
                return 3;
        }
    }
    
    setCursor(type) {
        $(this.container).css({cursor: 'auto'});
        let offset = '0 0';
        if (type != CursorType.NORMAL) {
            offset = '10 10';
        }
        $(this.container).css({cursor: 'url(' + require('file!images/cursors/' + type + '.png') + ') ' + offset + ', auto'});
    }
    
    getCameraBounds() {
        let leftX = this.camera.x - this.camera.width / 2;
        let topY = this.camera.y - this.camera.height / 2;
        
        let minX = (leftX / this.tileSize) | 0;
        let minY = (topY / this.tileSize) | 0;
        let maxX = ((this.camera.width / this.tileSize) | 0) + minX;
        let maxY = ((this.camera.height / this.tileSize) | 0) + minY;
        
        return {
            topLeft: [minX, minY],
            bottomRight: [maxX + 2, maxY + 2],
            offset: [
                Math.abs(leftX % 32) + this.tileSize / 2,
                Math.abs(topY % 32) + this.tileSize / 2
            ]
        };
    }
}
