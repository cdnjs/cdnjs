/*!
 * FileInput Russian Translations
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

    $.fn.fileinput.locales.ru = {
        fileSingle: 'файл',
        filePlural: 'файлы',
        browseLabel: 'Выбрать &hellip;',
        removeLabel: 'Удалить',
        removeTitle: 'Очистить выбранные файлы',
        cancelLabel: 'Отмена',
        cancelTitle: 'Отменить текущую загрузку',
        uploadLabel: 'Загрузить',
        uploadTitle: 'Загрузить выбранные файлы',
        msgSizeTooLarge: 'Файл "{name}" (<b>{size} KB</b>) превышает максимальный размер <b>{maxSize} KB</b>',
        msgFilesTooLess: 'Вы должны выбрать как минимум <b>{n}</b> {files} для загрузки',
        msgFilesTooMany: 'Количество выбранных файлов <b>({n})</b> превышает максимально допустимое количество <b>{m}</b>',
        msgFileNotFound: 'Файл "{name}" не найден!',
        msgFileSecured: 'Ограничения безопасности запрещают читать файл "{name}".',
        msgFileNotReadable: 'Файл "{name}" невозможно прочитать.',
        msgFilePreviewAborted: 'Предпросмотр отменен для файла "{name}".',
        msgFilePreviewError: 'Произошла ошибка при чтении файла "{name}".',
        msgInvalidFileType: 'Запрещенный тип файла для "{name}". Только "{types}" разрешены.',
        msgInvalidFileExtension: 'Запрещенное расширение для файла "{name}". Только "{extensions}" разрешены.',
        msgValidationError: 'Ошибка при загрузке файла',
        msgLoading: 'Загрузка файла {index} из {files} &hellip;',
        msgProgress: 'Загрузка файла {index} из {files} - {name} - {percent}% завершено.',
        msgSelected: '{n} файл(ов) выбрано',
        msgFoldersNotAllowed: 'Разрешено только перетаскивание файлов! Пропущено {n} папок.',
        dropZoneTitle: 'Перетащите файлы сюда &hellip;'
    };

    $.extend($.fn.fileinput.defaults, $.fn.fileinput.locales.ru);
})(window.jQuery);
