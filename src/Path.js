import PF from './pf/PathFinding.js';

export default class {
    constructor(grid) {
        this.grid = grid;
    }
    
    getPathTo(x0, y0, x1, y1) {
        let grid = new PF.Grid(this.grid);
        let finder = new PF.AStarFinder({
            allowDiagonal: true
        });
        
        let path = finder.findPath(x0, y0, x1, y1, grid);
        
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
    }
}