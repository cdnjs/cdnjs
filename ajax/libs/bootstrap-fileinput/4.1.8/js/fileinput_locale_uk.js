/*!
 * FileInput Ukrainian Translations
 *
 * This file must be loaded after 'fileinput.js'. Patterns in braces '{}', or
 * any HTML markup tags in the messages must not be converted or translated.
 *
 * @see http://github.com/kartik-v/bootstrap-fileinput
 * @author CyanoFresh <cyanofresh@gmail.com>
 *
 * NOTE: this file must be saved in UTF-8 encoding.
 */
(function ($) {
    "use strict";

    $.fn.fileinput.locales.uk = {
        fileSingle: 'файл',
        filePlural: 'файли',
        browseLabel: 'Вибрати &hellip;',
        removeLabel: 'Видалити',
        removeTitle: 'Видалити вибрані файли',
        cancelLabel: 'Скасувати',
        cancelTitle: 'Скасувати поточну загрузку',
        uploadLabel: 'Загрузити',
        uploadTitle: 'Загрузити вибрані файли',
        msgSizeTooLarge: 'Файл "{name}" (<b>{size} KB</b>) перевищує максимальний розмыр <b>{maxSize} KB</b>',
        msgFilesTooLess: 'Ви повинні вибрати як мінімум <b>{n}</b> {files} для загрузки',
        msgFilesTooMany: 'Кількість вибраних файлів <b>({n})</b> перевищує максимально допустиму кількість <b>{m}</b>',
        msgFileNotFound: 'Файл "{name}" не знайдено!',
        msgFileSecured: 'Обмеження безпеки перешкоджають читанню файла "{name}".',
        msgFileNotReadable: 'Файл "{name}" неможливо прочитати.',
        msgFilePreviewAborted: 'Перегляд скасований для файла "{name}".',
        msgFilePreviewError: 'Сталася помилка під час читання файла "{name}".',
        msgInvalidFileType: 'Заборонений тип файла для "{name}". Тільки "{types}" дозволені.',
        msgInvalidFileExtension: 'Заборонене розширення для файла "{name}". Тільки "{extensions}" дозволені.',
        msgValidationError: 'Помилка під час загрузки файла',
        msgLoading: 'Загрузка файла {index} із {files} &hellip;',
        msgProgress: 'Загрузка файла {index} із {files} - {name} - {percent}% завершено.',
        msgSelected: '{n} файл(ів) вибрано',
        msgFoldersNotAllowed: 'Дозволено перетягувати тільки файли! Пропущено {n} папок.',
        dropZoneTitle: 'Перетяніть файли сюди &hellip;'
    };

    $.extend($.fn.fileinput.defaults, $.fn.fileinput.locales.uk);
})(window.jQuery);
