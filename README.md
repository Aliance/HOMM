# HOMM

## Сборка проекта

0. Устанавливаем Node `sudo apt-get install node`
1. Если установлена NodeJS и будет вываливаться ошибка о том, что не удалось найти ноду, то делаем симлинк `sudo ln -s /usr/bin/nodejs /usr/bin/node`
2. Запустить `npm install` и установить все зависимости
3. Устанавливаем Bower `npm install -g bower`
4. `npm run dev`

## Как вырезать бирюзовый фон из оригинальных bmp

1. Положить оригинальную картинку(-и) в папку `_extracted`
2. Выполнить в консоле `php pathToExtractedDirectory/transparency.php`
3. Оригинальный файл bmp превратится в png с вырезанным бирюзовым цветом и будет удалён.
4. PROFIT!

## Как имея список картинок png создать из них спрайт

1. Положить все картинки в папку `_extracted`
2. Выполнить в консоле `php pathToExtractedDirectory/sprite.php`
3. Оригинальные файлы png превратятся в png-спрайт, склееный по горизонтали
4. PROFIT!

## Как имея одну png создать спрайт всех четырёх её поворотов

1. Положить оригинальную картинку в папку `_extracted`
2. Выполнить в консоле `php pathToExtractedDirectory/rotator.php pathToImageDirectory/image.png`
3. Оригинальный файл png превратится в png-спрайт со всеми поворотами (углы поворота - 0, 90, 180 и 270 градусов)
4. PROFIT!
