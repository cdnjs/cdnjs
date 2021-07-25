/*!
 * FileInput Uzbek Cyrillic Translations
 *
 * This file must be loaded after 'fileinput.js'. Patterns in braces '{}', or
 * any HTML markup tags in the messages must not be converted or translated.
 *
 * @see http://github.com/kartik-v/bootstrap-fileinput
 * @author CyanoFresh <cyanofresh@gmail.com>
 */
(function ($) {
    "use strict";

    $.fn.fileinputLocales['uz-cyrl'] = {
        sizeUnits: ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'], 
        bitRateUnits: ['B/s', 'KB/s', 'MB/s', 'GB/s', 'TB/s', 'PB/s', 'EB/s', 'ZB/s', 'YB/s'],
        fileSingle: 'файл',
        filePlural: 'файллар',
        browseLabel: 'Танлаш &hellip;',
        removeLabel: 'Ўчириш',
        removeTitle: 'Танланган файлларни тозалаш',
        cancelLabel: 'Бекор қилиш',
        cancelTitle: 'Юклашни бекор қилиш',
        pauseLabel: 'Тўхтатиш',
        pauseTitle: 'Юклашни тўхтатиб туриш',
        uploadLabel: 'Юклаб олиш',
        uploadTitle: 'Танланган файлларни юклаш',
        msgNo: 'Йўқ',
        msgNoFilesSelected: 'Ҳеч қандай файл танланмаган',
        msgPaused: 'Вақтинча тўхтатилди',
        msgCancelled: 'Бекор қилинди',
        msgPlaceholder: '{files} танлаш ...',
        msgZoomModalHeading: 'Батафсил кўриб чиқиш',
        msgFileRequired: 'Юклаш учун файлни танлашингиз керак.',
        msgSizeTooSmall: 'Сиз танлаган файл ҳажми:"{name}" (<b>{size} KB</b>). Танланган файл ҳажми <b>{minSize} KB</b> дан катта бўлиши лозим. Кўрсатилган ҳажмдан каттароқ файл юклашга уриниб кўринг',
        msgSizeTooLarge: '"{name}" файл (<b>{size} KB</b>) рухсат этилган максимал юклаш ҳажм: <b>{maxSize} KB</b> дан катта. Кичикроқ файл юклашга уриниб кўринг!',
        msgFilesTooLess: 'Yuklash uchun kamida <b>{n}</b> {files} tanlashingiz kerak. Yuklashga qaytadan urinib ko‘ring!',
        msgFilesTooMany: 'Сиз танлаган файллар миқдори : <b>({n})</b>, рухсат берилган максимал миқдор: <b>{m}</b> тадан ортиқ. Кўрсатилган миқдордан камроқ файл танлаб, юклашга қайтадан уриниб кўринг!',
        msgTotalFilesTooMany: 'Сиз максимум <b>{m}</b> та файл юклай оласиз (<b>{n}</b> та файл топилди).',
        msgFileNotFound: '"{name}" файл топилмади!',
        msgFileSecured: '"{name}" файлни ўқишга хавфсизлик чеклови рухсат бермайди.',
        msgFileNotReadable: '"{name}" файлни ўқиб бўлмайди.',
        msgFilePreviewAborted: '"{name}" Файлни олдиндан кўриш жараёни тўхтатилди.',
        msgFilePreviewError: '"{name}" файлни ўқиш пайтида хатолик юз берди.',
        msgInvalidFileName: '"{name}" файл номида нотўғри ёки қўллаб қувватланмайдиган белгилар мавжуд.',
        msgInvalidFileType: '"{name}" файл учун яроқсиз тур. Фақат "{types}" файллари қабул қилинади.',
        msgInvalidFileExtension: '"{name}" файл учун нотўғри кенгайтма. Фақат "{extensions}" файллари қабул қилинади.',
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
        msgUploadAborted: 'Файл юкланиши бекор қилинди',
        msgUploadThreshold: 'Қайта ишланмоқда &hellip;',
        msgUploadBegin: 'Ишга туширилмоқда &hellip;',
        msgUploadEnd: 'Бажарилди',
        msgUploadResume: 'Юклаш давом этмоқда &hellip;',
        msgUploadEmpty: 'Юклаш учун яроқли ма‘лумотлар мавжуд эмас.',
        msgUploadError: 'Юклашда хатолик',
        msgDeleteError: 'Хатоликни ўчириш',
        msgProgressError: 'Хато',
        msgValidationError: 'Тасдиқлашда хатолик',
        msgLoading: '{Files} дан {index} файлини юклаш &hellip;',
        msgProgress: '{Files} дан {index}{name} файлини юклашда  - {percent}% тугалланди.',
        msgSelected: '{n} {files} танланган',
        msgProcessing: 'Processing ...',
        msgFoldersNotAllowed: 'Фақат тортиб қўйиладон файллар! {n} та папка(lar) ўтказиб юборилди.',
        msgImageWidthSmall: '"{name}" файл эни камида {size} px бўлиши лозим.',
        msgImageHeightSmall: '"{name}" файл бўйи камида {size} px бўлиши лозим.',
        msgImageWidthLarge: '"{name}" файл эни {size} px дан ошмаслиги лозим.',
        msgImageHeightLarge: '"{name}" файл бўйи {size} px дан ошмаслиги лозим.',
        msgImageResizeError: 'Расм ўлчамини ўзгартириб бўлмади.',
        msgImageResizeException: 'Расм ҳажмини ўзгартиришда хато.<pre>{errors}</pre>',
        msgAjaxError: '{operation} амалиётида хатолик юз берди. Илтимос кейинроқ қайта уриниб кўринг!',
        msgAjaxProgressError: '{operation} бажарилмади',
        msgDuplicateFile: '"{name}" номли "{size} KB" ҳажмдаги файл олдин танланган. Бошқа файлни танлашга уриниб кўринг.',
        msgResumableUploadRetriesExceeded:  '<b>{file}</b> файлини юклаш учун <b>{max}</b> марта уриниш бекор қилинди! Хато тафсилотлари: <pre>{error}</pre>',
        msgPendingTime: '{time} қолган',
        msgCalculatingTime: 'қолган вақтни ҳисоблаш',
        ajaxOperations: {
            deleteThumb: 'файлни ўчириш',
            uploadThumb: 'файл юклаш',
            uploadBatch: 'барча файлларни юклаш',
            uploadExtra: 'форм ма‘лумотларини юклаш'
        },
        dropZoneTitle: 'Файлларни бу ерга тортиб қўйинг &hellip;',
        dropZoneClickTitle: '<br>(ёки {files} ни танлаш учун босинг)',
        fileActionSettings: {
            removeTitle: 'Файлни олиб ташлаш',
            uploadTitle: 'Файлни юклаш',
            uploadRetryTitle: 'Қайта уруниш',
            downloadTitle: 'Файлни юклаб олиш',
            zoomTitle: 'Тафсилотларни кўриш',
            dragTitle: 'Кўчириш / қайта тартиблаш',
            indicatorNewTitle: 'Ҳали юкланмади',
            indicatorSuccessTitle: 'Юкланди',
            indicatorErrorTitle: 'Юклашда хатолик',
            indicatorPausedTitle: 'Юклаш тўхтатилди',
            indicatorLoadingTitle:  'Юкланмоқда &hellip;'
        },
        previewZoomButtonTitles: {
            prev: 'Олдинги файлни кўриш',
            next: 'Кейинги файлни кўриш',
            toggleheader: 'Сарлавҳани яшириш',
            fullscreen: 'Тўлиқ экранга ўтиш',
            borderless: 'Чегарасиз режимга ўтиш',
            close: 'Батафсил кўришни ёпиш'
        }
    };
})(window.jQuery);