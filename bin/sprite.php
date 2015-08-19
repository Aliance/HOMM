<?php

$vertically = false;

if (isset($argv[1]) && $argv[1] == '-v') {
    $vertically = true;
}

$allFiles = array_filter(scandir(__DIR__), function($v) { return substr(strtolower($v), -4) == '.png'; });

$allFilesCount = count($allFiles);

if (!$allFilesCount) {
    echo 'No png files were found.', PHP_EOL;
    exit;
}

$resultImage = new Imagick();

echo 'process ', $allFilesCount, ' images', PHP_EOL;

$i = 0;

foreach ($allFiles as $filename) {
    $path = __DIR__ . '/' . $filename;

    $originalImage = new Imagick($path);

    $resultImage->addimage($originalImage);

    $originalImage->clear();
    $originalImage->destroy();

    //unlink($path);

    echo 'processed ', ++$i, ' of ', $allFilesCount, ' files...', PHP_EOL;
}

echo 'All files were processed', PHP_EOL;

$resultImage->resetIterator();

$combinedImage = $resultImage->appendImages($vertically);

$resultImage->clear();
$resultImage->destroy();

$combinedImage->setImageFormat('png');

$combinedImage->writeImage(__DIR__ . '/sprite--'.time().'.png');

$combinedImage->clear();
$combinedImage->destroy();
