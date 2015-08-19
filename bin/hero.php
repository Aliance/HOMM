<?php

if (!isset($argv[1])) {
    echo 'Directory argument was not passed.', PHP_EOL;
    exit;
}

$dir = __DIR__ . '/_data/hero/' . $argv[1];

if (!is_dir($dir)) {
    echo 'Wrong directory name passed.', PHP_EOL;
    exit;
}

$allFiles = array_filter(scandir($dir), function($v) { return substr(strtolower($v), -4) == '.png'; });

$allFilesCount = count($allFiles);

if (!$allFilesCount) {
    echo 'No png files were found.', PHP_EOL;
    exit;
}

$directions = [
    'e'  => ['03', '24', '25', '26', '28', '29', '30', '31', '32'],
    's'  => ['01', '06', '07', '08', '09', '11', '12', '13', '14'],
    'n'  => ['05', '42', '43', '44', '45', '46', '47', '48', '50'],
    'se' => ['02', '16', '17', '18', '19', '20', '21', '22', '23'],
    'ne' => ['04', '33', '34', '35', '36', '37', '39', '40', '41'],
];

$resultImages = [];

foreach ($directions as $direction => $frames) {
    $resultImage = new Imagick();

    foreach ($allFiles as $filename) {
        $tileNumber = substr($filename, 5, 2);

        if (!in_array($tileNumber, $frames)) {
            continue;
        }

        $path = $dir . '/' . $filename;

        $originalImage = new Imagick($path);

        $resultImage->addimage($originalImage);

        $originalImage->clear();
        $originalImage->destroy();
    }

    $resultImages[$direction] = $resultImage;
}

$image = new Imagick();

foreach ($resultImages as $resultImage) { /** @var Imagick $resultImage */
    $resultImage->resetIterator();

    $sprite = $resultImage->appendImages(false);

    $resultImage->clear();
    $resultImage->destroy();

    $sprite->setImageFormat('png');

    $image->addImage($sprite);

    $sprites[] = $sprite;
}

$image->resetIterator();

$response = $image->appendImages(true);

$image->clear();
$image->destroy();

$response->setImageFormat('png');

$response->writeImage(__DIR__ . '/' . $argv[1] .'.png');

$response->clear();
$response->destroy();

echo 'All files were processed', PHP_EOL;
