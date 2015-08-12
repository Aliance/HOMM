<?php

$allFiles = array_filter(scandir(__DIR__), function($v) { return substr(strtolower($v), -4) == '.bmp'; });

foreach ($allFiles as $filename) {
    $path = __DIR__ . '/' . $filename;

    $imagick = new Imagick();
    $imagick->readImage($path);
    $imagick->setimageformat('png');
    $imagick->transparentPaintImage(
        'rgb(0, 255, 255)',
        0.0,
        0,
        false
    );
    $imagick->writeImage(substr($path, 0, -4) . '.png');
    unlink($path);
}

?>
