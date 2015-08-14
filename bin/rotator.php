<?php

if (!isset($argv[1])) {
    echo 'filename required', PHP_EOL;
    exit;
}

$filename = $argv[1];

if (!file_exists($filename)) {
    echo 'file not exists', PHP_EOL;
    exit;
}

echo 'starting to rotate file: ', $filename, PHP_EOL;

$resultImage = new Imagick();


foreach ([0, 90, 180, 270] as $angle) {
    $originalImage = new Imagick($filename);
    $originalImage->rotateImage(new ImagickPixel(), $angle);

    $resultImage->addimage($originalImage);

    $originalImage->clear();
    $originalImage->destroy();
}

$resultImage->resetIterator();

$combinedImage = $resultImage->appendImages(false);

$resultImage->clear();
$resultImage->destroy();

$combinedImage->setImageFormat('png');

$combinedImage->writeImage($filename.'.'.time());

$combinedImage->clear();
$combinedImage->destroy();
