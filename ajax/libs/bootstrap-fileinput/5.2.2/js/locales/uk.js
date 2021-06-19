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

    $.fn.fileinputLocales['uk'] = {
        fileSingle: 'файл',
        filePlural: 'файли',
        browseLabel: 'Обрати &hellip;',
        removeLabel: 'Видалити',
        removeTitle: 'Видалити вибрані файли',
        cancelLabel: 'Скасувати',
        cancelTitle: 'Скасувати поточне відвантаження',
        pauseLabel: 'Призупинити',
        pauseTitle: 'Призупинити поточне відвантаження',
        uploadLabel: 'Відвантажити',
        uploadTitle: 'Відвантажити обрані файли',
        msgNo: 'Немає',
        msgNoFilesSelected: '',
        msgPaused: 'Призупинено',
        msgCancelled: 'Скасовано',
        msgPlaceholder: 'Оберіть {files} ...',
        msgZoomModalHeading: 'Детальний перегляд',
        msgFileRequired: 'Ви повинні обрати файл для завантаження.',
        msgSizeTooSmall: 'Файл "{name}" (<b>{size} KB</b>) занадто малий і повинен бути більший, ніж <b>{minSize} KB</b>.',
        msgSizeTooLarge: 'Файл "{name}" (<b>{size} KB</b>) перевищує максимальний розмір <b>{maxSize} KB</b>.',
        msgFilesTooLess: 'Ви повинні обрати як мінімум <b>{n}</b> {files} для відвантаження.',
        msgFilesTooMany: 'Кількість обраних файлів <b>({n})</b> перевищує максимально допустиму кількість <b>{m}</b>.',
        msgTotalFilesTooMany: 'Ви можете відвантажити максимум <b>{m}</b> файл(ів) (<b>{n}</b> файл(ів) обрано).',
        msgFileNotFound: 'Файл "{name}" не знайдено!',
        msgFileSecured: 'Обмеження безпеки перешкоджають читанню файла "{name}".',
        msgFileNotReadable: 'Файл "{name}" неможливо прочитати.',
        msgFilePreviewAborted: 'Перегляд скасований для файла "{name}".',
        msgFilePreviewError: 'Сталася помилка під час читання файла "{name}".',
        msgInvalidFileName: 'Недійсні чи непідтримувані символи в імені файлу "{name}".',
        msgInvalidFileType: 'Заборонений тип файла для "{name}". Тільки "{types}" дозволені.',
        msgInvalidFileExtension: 'Заборонене розширення для файла "{name}". Тільки "{extensions}" дозволені.',
        msgFileTypes: {
            'image': 'image',
            'html': 'HTML',
            'text': 'text',
            'video': 'video',
            'audio': 'audio',
            'flash': 'flash',
            'pdf': 'PDF',
            'object': 'object'
        },
        msgUploadAborted: 'Вивантаження файлу перервано',
        msgUploadThreshold: 'Обробка &hellip;',
        msgUploadBegin: 'Ініціалізація &hellip;',
        msgUploadEnd: 'Готово',
        msgUploadResume: 'Продовжити відвантаження &hellip;',
        msgUploadEmpty: 'Немає доступних даних для відвантаження.',
        msgUploadError: 'Помилка відвантаження',
        msgDeleteError: 'Помилка видалення',
        msgProgressError: 'Помилка',
        msgValidationError: 'Помилка перевірки',
        msgLoading: 'Відвантаження файла {index} із {files} &hellip;',
        msgProgress: 'Відвантаження файла {index} із {files} - {name} - {percent}% завершено.',
        msgSelected: '{n} {files} обрано',
        msgProcessing: 'Processing ...',
        msgFoldersNotAllowed: 'Дозволено перетягувати тільки файли! Пропущено {n} тек.',
        msgImageWidthSmall: 'Ширина зображення "{name}" повинна бути не менше {size} px.',
        msgImageHeightSmall: 'Висота зображення "{name}" повинна бути не менше {size} px.',
        msgImageWidthLarge: 'Ширина зображення "{name}" не може перевищувати {size} px.',
        msgImageHeightLarge: 'Висота зображення "{name}" не може перевищувати {size} px.',
        msgImageResizeError: 'Не вдалося отримати розміри зображення, щоб змінити розмір.',
        msgImageResizeException: 'Помилка при зміні розміру зображення.<pre>{errors}</pre>',
        msgAjaxError: 'Щось не так з операцією {operation}. Будь ласка, спробуйте пізніше!',
        msgAjaxProgressError: 'помилка {operation}',
        msgDuplicateFile: 'Файл "{name}" з розміром "{size} KB" вже був обраний раніше. Пропуск повторюваного вибору.',
        msgResumableUploadRetriesExceeded:  'Відвантаження перерване після <b>{max}</b> спроб для файлу <b>{file}</b>! Інформація про помилку: <pre>{error}</pre>',
        msgPendingTime: '{time} залишилося',
        msgCalculatingTime: 'розрахунок часу, який залишився',
        ajaxOperations: {
            deleteThumb: 'видалення файла',
            uploadThumb: 'відвантаження файла',
            uploadBatch: 'пакетне відвантаження файлів',
            uploadExtra: 'відвантаження даних з форми'
        },
        dropZoneTitle: 'Перетягніть файли сюди &hellip;',
        dropZoneClickTitle: '<br>(або натисніть та оберіть {files})',
        fileActionSettings: {
            removeTitle: 'Видалити файл',
            uploadTitle: 'Відвантажити файл',
            uploadRetryTitle: 'Повторити відвантаження',
            downloadTitle: 'Завантажити файл',
            zoomTitle: 'Подивитися деталі',
            dragTitle: 'Перенести / Переставити',
            indicatorNewTitle: 'Ще не відвантажено',
            indicatorSuccessTitle: 'Відвантажено',
            indicatorErrorTitle: 'Помилка при відвантаженні',
            indicatorPausedTitle: 'Відвантаження призупинено',
            indicatorLoadingTitle:  'Завантаження &hellip;'
        },
        previewZoomButtonTitles: {
            prev: 'Переглянути попередній файл',
            next: 'Переглянути наступний файл',
            toggleheader: 'Перемкнути заголовок',
            fullscreen: 'Перемкнути повноекранний режим',
            borderless: 'Перемкнути режим без полів',
            close: 'Закрити детальний перегляд'
        }
    };
})(window.jQuery);
