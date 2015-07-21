var $container;

function random(min, max) {
    return Math.round(Math.random() * (max - min)) + min;
}

$(function() {
    $container = $('#container');
});
