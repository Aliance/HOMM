var phaserSrc = require('file!bower_components/phaser/build/phaser.min.js');
import GameManager from './GameManager.js';

document.addEventListener('DOMContentLoaded', function() {
    var phaserElement = document.createElement('script');
    phaserElement.src = phaserSrc;
    document.body.appendChild(phaserElement);

    phaserElement.onload = function() {
        var container = document.getElementById('container');
        container.innerHTML = '';

        let gameManager = GameManager.getInstance();
        gameManager.init(container);
    };
});
