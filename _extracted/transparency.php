<?php

$allFiles = array_filter(scandir(__DIR__), function($v) { return substr(strtolower($v), -4) == '.bmp'; });

$allFilesCount = count($allFiles);

if (!$allFilesCount) {
    echo 'No bmp files were found.', PHP_EOL;
    exit;
}

$imagick = new Imagick();

echo 'process ', $allFilesCount, ' images', PHP_EOL;

$i = 0;

foreach ($allFiles as $filename) {
    $path = __DIR__ . '/' . $filename;

    $imagick->readImage($path);
    $imagick->setimageformat('png');
    $imagick->transparentPaintImage(
        'rgb(0, 255, 255)',
        0.0,
        0,
        false
    );
    $imagick->writeImage(substr($path, 0, -4) . '.png');

    $imagick->clear();

    unlink($path);

    echo 'processed ', ++$i, ' of ', $allFilesCount, ' files...', PHP_EOL;
}

echo 'All files were processed', PHP_EOL;

$imagick->destroy();
