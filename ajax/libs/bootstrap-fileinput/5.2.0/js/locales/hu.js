/*!
 * FileInput Hungarian Translations
 *
 * This file must be loaded after 'fileinput.js'. Patterns in braces '{}', or
 * any HTML markup tags in the messages must not be converted or translated.
 *
 * @see http://github.com/kartik-v/bootstrap-fileinput
 *
 * NOTE: this file must be saved in UTF-8 encoding.
 */
(function ($) {
    "use strict";

    $.fn.fileinputLocales['hu'] = {
        fileSingle: 'fájl',
        filePlural: 'fájlok',
        browseLabel: 'Tallózás&hellip;',
        removeLabel: 'Eltávolítás',
        removeTitle: 'Kijelölt fájlok törlése',
        cancelLabel: 'Mégse',
        cancelTitle: 'Feltöltés megszakítása',
        pauseLabel: 'Szünet',
        pauseTitle: 'A folyamatban lévő feltöltés szüneteltetése',
        uploadLabel: 'Feltöltés',
        uploadTitle: 'Kijelölt fájlok feltöltése',
        msgNo: 'Nem',
        msgNoFilesSelected: 'Nincs fájl kiválasztva',
        msgPaused: 'Szünetel',
        msgCancelled: 'Megszakítva',
        msgPlaceholder: '{files} kiválasztása...',
        msgZoomModalHeading: 'Részletes Előnézet',
        msgFileRequired: 'Kötelező fájlt kiválasztani a feltöltéshez.',
        msgSizeTooSmall: '"{name}" fájl (<b>{size} KB</b>) mérete túl kicsi, nagyobbnak kell lennie, mint <b>{minSize} KB</b>.',
        msgSizeTooLarge: '"{name}" fájl (<b>{size} KB</b>) mérete nagyobb a megengedettnél <b>{maxSize} KB</b>.',
        msgFilesTooLess: 'Legalább <b>{n}</b> fájl kiválasztására van szükség a feltöltéshez.',
        msgFilesTooMany: 'A feltölteni kívánt fájlok száma <b>({n})</b> elérte a megengedett maximumot <b>{m}</b>.',
        msgTotalFilesTooMany: 'Legfeljebb <b>{m}</b> fájlt tölthet fel (<b>{n}</b> fájl észlelve).',
        msgFileNotFound: '"{name}" fájl nem található!',
        msgFileSecured: 'Biztonsági beállítások nem engedik olvasni a fájlt: "{name}"',
        msgFileNotReadable: '"{name}" fájl nem olvasható.',
        msgFilePreviewAborted: '"{name}" fájl feltöltése megszakítva.',
        msgFilePreviewError: '"{name}" fájl olvasása közben hiba lépett fel.',
        msgInvalidFileName: '"{name}" fájlnév hibás vagy nem támogatott karaktereket tartalmaz.',
        msgInvalidFileType: '"{name}" fájl típusa nem megengedett. Csak a következő fájltípusok támogatottak: "{types}"',
        msgInvalidFileExtension: '"{name}" fájl kiterjesztése nem megengedett. Csak a következő kiterjesztések támogatottak: "{extensions}"',
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
        msgUploadAborted: 'A fájl feltöltés megszakítva',
        msgUploadThreshold: 'Feldolgozás&hellip;',
        msgUploadBegin: 'Inicializálás &hellip;',
        msgUploadEnd: 'Kész',
        msgUploadResume: 'Feltöltés folytatása &hellip;',
        msgUploadEmpty: 'Nincs érvényes adat a feltöltéshez.',
        msgUploadError: 'Feltöltési hiba',
        msgDeleteError: 'Törlési hiba',
        msgProgressError: 'Hiba',
        msgValidationError: 'Érvényesítési hiba',
        msgLoading: '{index}. fájl töltése&hellip;',
        msgProgress: '{index}. fájl töltése&hellip; - {name} - {percent}% kész.',
        msgSelected: '{n} fájl kiválasztva',
        msgFoldersNotAllowed: 'Csak fájlokat húzzon ide! Kihagyva {n} könyvtár.',
        msgImageWidthSmall: '"{name}" kép szélességének legalább {size} pixelnek kell lennie.',
        msgImageHeightSmall: '"{name}" kép magasságának legalább {size} pixelnek kell lennie.',
        msgImageWidthLarge: '"{name}" kép szélessége nem haladhatja meg a {size} pixelt.',
        msgImageHeightLarge: '"{name}" kép magassága nem haladhatja meg a {size} pixelt.',
        msgImageResizeError: 'Nem lehet megállapítani a kép méreteit az átméretezéshez.',
        msgImageResizeException: 'Hiba történt a méretezés közben.<pre>{errors}</pre>',
        msgAjaxError: 'Hiba történt a művelet közben ({operation}). Kérjük, próbálja újra később!',
        msgAjaxProgressError: '{operation} sikertelen',
        msgDuplicateFile: '"{name}" fájl azonos mérettel "{size} KB" már korábban kiválasztva. Az ismételt kiválasztás kihagyása.',
        msgResumableUploadRetriesExceeded: '<b>{file}</b> fájl feltöltése megszakítva <b>{max}</b> próbálkozás után! Hiba részletei: <pre>{error}</pre>',
        msgPendingTime: '{time} van hátra',
        msgCalculatingTime: 'hátralévő idő kiszámítása',
        ajaxOperations: {
            deleteThumb: 'fájl törlés',
            uploadThumb: 'fájl feltöltés',
            uploadBatch: 'csoportos fájl feltöltés',
            uploadExtra: 'űrlap adat feltöltés'
        },
        dropZoneTitle: 'Húzzon ide fájlokat &hellip;',
        dropZoneClickTitle: '<br>(vagy kattintson ide a {files} tallózásához &hellip;)',
        fileActionSettings: {
            removeTitle: 'A fájl eltávolítása',
            uploadTitle: 'Fájl feltöltése',
            uploadRetryTitle: 'Feltöltés újból',
            downloadTitle: 'Fájl letöltése',
            zoomTitle: 'Részletek megtekintése',
            dragTitle: 'Mozgatás / Átrendezés',
            indicatorNewTitle: 'Még fel nem töltött',
            indicatorSuccessTitle: 'Feltöltött',
            indicatorErrorTitle: 'Feltöltés hiba',
            indicatorPausedTitle: 'Feltöltés szüneteltetve',
            indicatorLoadingTitle:  'Feltöltés &hellip;'
        },
        previewZoomButtonTitles: {
            prev: 'Előző fájl megnézése',
            next: 'Következő fájl megnézése',
            toggleheader: 'Fejléc mutatása',
            fullscreen: 'Teljes képernyős mód bekapcsolása',
            borderless: 'Keret nélküli ablak mód bekapcsolása',
            close: 'Részletes előnézet bezárása'
        }
    };
})(window.jQuery);
