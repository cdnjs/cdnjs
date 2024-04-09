/*!
 * FileInput Basque Translations
 *
 * This file must be loaded after 'fileinput.js'. Patterns in braces '{}', or
 * any HTML markup tags in the messages must not be converted or translated.
 *
 * @see http://github.com/kartik-v/bootstrap-fileinput
 *
 * NOTE: this file must be saved in UTF-8 encoding.
 */
(function (factory) {
    'use strict';
    if (typeof define === 'function' && define.amd) {
        define(['jquery'], factory);
    } else if (typeof module === 'object' && typeof module.exports === 'object') {
        factory(require('jquery'));
    } else {
        factory(window.jQuery);
    }
}(function ($) {
    "use strict";

    $.fn.fileinputLocales['eu'] = {
        sizeUnits: ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
        bitRateUnits: ['B/s', 'KB/s', 'MB/s', 'GB/s', 'TB/s', 'PB/s', 'EB/s', 'ZB/s', 'YB/s'],
        fileSingle: 'fitxategia',
        filePlural: 'fitxategiak',
        browseLabel: 'Aztertu &hellip;',
        removeLabel: 'Kendu',
        removeTitle: 'Kendu hautatutako fitxategiak',
        cancelLabel: 'Utzi',
        cancelTitle: 'Utzi abian den kargatzea',
        pauseLabel: 'Pausa',
        pauseTitle: 'Eten kargatzen ari den',
        uploadLabel: 'Kargatu fitxategia',
        uploadTitle: 'Kargatu hautatutako fitxategiak',
        msgNo: 'Ez',
        msgNoFilesSelected: 'Ez da fitxategirik hautatu',
        msgPaused: 'Astiro',
        msgCancelled: 'Bertan behera utzita',
        msgPlaceholder: 'Hautatu {files} ...',
        msgZoomModalHeading: 'Aurrebista zehatza',
        msgFileRequired: 'Kargatzeko fitxategi bat hautatu behar duzu.',
        msgSizeTooSmall: '"{name}" fitxategia (<b>{size}</b>) txikiegia da eta <b>{minSize}</b> baino handiagoa izan behar du.',
        msgSizeTooLarge: '"{name}" fitxategiak (<b>{size}</b>) <b>{maxSize}</b>-ren gehienezko tamaina gainditzen du.',
        msgMultipleSizeTooLarge: '"{name}" fitxategi (<b>{size}</b>) <b>{maxSize}</b>-ren gehienezko tamaina gainditzen du.',
        msgFilesTooLess: 'Kargatzeko, gutxienez <b>{n}</b> {files} hautatu behar dituzu.',
        msgFilesTooMany: '<b>({n})</b> kargatzeko hautatutako fitxategi kopuruak <b>{m}</b>-ren gehienezko muga gainditzen du.',
        msgTotalFilesTooMany: 'Gehienez <b>{m}</b> fitxategi karga ditzakezu (detektatu diren <b>{n}</b> fitxategi).',
        msgFileNotFound: 'Ez da aurkitu "{name}" fitxategia.',
        msgFileSecured: '"{name}" fitxategira ezin da sartu beste aplikazio batek erabiltzen ari delako edo ez duelako irakurtzeko baimenik.',
        msgFileNotReadable: 'Ezin da "{name}" fitxategira sartu.',
        msgFilePreviewAborted: '"{name}" fitxategiaren aurrebista bertan behera utzi da.',
        msgFilePreviewError: 'Errore bat gertatu da "{name}" fitxategia irakurtzean.',
        msgInvalidFileName: '"{name}" fitxategi-izeneko karaktere baliogabeak edo onartzen ez direnak.',
        msgInvalidFileType: '"{name}"-ren fitxategi mota baliogabea. "{types}" motako fitxategiak soilik onartzen dira.',
        msgInvalidFileExtension: '"{name}"-ren fitxategi-luzapen baliogabea. "{extensions}" fitxategiak soilik onartzen dira.',
        msgFileTypes: {
            'image': 'irudia',
            'html': 'HTML',
            'text': 'testua',
            'video': 'bideoa',
            'audio': 'audioa',
            'flash': 'flash',
            'pdf': 'PDF',
            'object': 'objektuak'
        },
        msgUploadAborted: 'Fitxategiak kargatzea bertan behera utzi da',
        msgUploadThreshold: 'Prozesatzea &hellip;',
        msgUploadBegin: 'Hasieratzen &hellip;',
        msgUploadEnd: 'Egina',
        msgUploadResume: 'Kargatzen hasten da &hellip;',
        msgUploadEmpty: 'Ez dago bidalketarako baliozko daturik.',
        msgUploadError: 'Errore bat gertatu da kargatzean',
        msgDeleteError: 'Ezabatu errorea',
        msgProgressError: 'Akatsa',
        msgValidationError: 'Balioztatze-errorea',
        msgLoading: '{index} fitxategia {files} kargatzen &hellip;',
        msgProgress: '{index} fitxategia {files} kargatzen - {name} - {percent}% beteta.',
        msgSelected: '{n} {files} hautatua(k)',
        msgProcessing: 'Prozesatzea ...',
        msgFoldersNotAllowed: 'Arrastatu eta jaregin fitxategiak soilik. {n} karpeta baztertu dira.',
        msgImageWidthSmall: '"{name}" irudiaren zabalerak <b>{size} px</b> izan behar du gutxienez (<b>{dimension} px</b> detektatuta).',
        msgImageHeightSmall: '"{name}" irudiaren altuerak <b>{size} px</b> izan behar du gutxienez (<b>{dimension} px</b> detektatuta).',
        msgImageWidthLarge: '"{name}" irudiaren zabalerak ezin du <b>{size} px</b> baino gehiago (<b>{dimension} px</b> detektatuta).',
        msgImageHeightLarge: '"{name}" irudiaren altuerak ezin du <b>{size} px</b> gainditu (<b>{dimension} px</b> detektatu dira).',
        msgImageResizeError: 'Ezin izan dira lortu irudiaren neurriak tamaina aldatzeko.',
        msgImageResizeException: 'Errore bat gertatu da irudiaren tamaina aldatzean.<pre>{errors}</pre>',
        msgAjaxError: 'Arazoren bat izan da {operation} eragiketarekin. Saiatu berriro geroago.',
        msgAjaxProgressError: '{operation} eragiketak huts egin du',
        msgDuplicateFile: 'Dagoeneko "{size}" tamaina bereko "{name}" fitxategia hautatu da goian. Saltatu aukeraketa bikoiztua.',
        msgResumableUploadRetriesExceeded:  'Kargatzea bertan behera utzi da <b>{max}</b> saiakera baino gehiago <b>{file}</b> fitxategirako! Errorearen xehetasunak: <pre>{error}</pre>',
        msgPendingTime: '{time} falta da',
        msgCalculatingTime: 'geratzen den denbora kalkulatuz',
        ajaxOperations: {
            deleteThumb: 'Ezabatutako fitxategia',
            uploadThumb: 'Kargatu da fitxategia',
            uploadBatch: 'Loteka kargatutako datuak',
            uploadExtra: 'Inprimakiaren datuak kargatu dira'
        },
        dropZoneTitle: 'Arrastatu eta jaregin fitxategiak hemen &hellip;',
        dropZoneClickTitle: '<br>(edo egin klik {files} hautatzeko)',
        fileActionSettings: {
            removeTitle: 'Ezabatu fitxategia',
            uploadTitle: 'Kargatu fitxategia',
            uploadRetryTitle: 'Saiatu berriro kargatzen',
            downloadTitle: 'Deskargatu fitxategia',
            rotateTitle: 'Biratu erlojuaren orratzen noranzkoan 90º',
            zoomTitle: 'Ikusi xehetasunak',
            dragTitle: 'Mugitu/Berrantolatu',
            indicatorNewTitle: 'Oraindik ez da kargatu',
            indicatorSuccessTitle: 'Kargatu da',
            indicatorErrorTitle: 'Errore bat gertatu da kargatzean',
            indicatorPausedTitle: 'Igoera motela',
            indicatorLoadingTitle:  'Igotzen &hellip;'
        },
        previewZoomButtonTitles: {
            prev: 'Lehengoa',
            next: 'Jarraian',
            rotate: 'Biratu erlojuaren orratzen noranzkoan 90º',
            toggleheader: 'Erakutsi goiburua',
            fullscreen: 'Pantaila osoa',
            borderless: 'Mugarik gabeko modua',
            close: 'Itxi ikuspegi xehatua'
        }
    };
}));
