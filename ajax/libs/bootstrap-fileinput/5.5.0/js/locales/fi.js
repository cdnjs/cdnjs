/*!
 * FileInput Finnish Translations
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

    $.fn.fileinputLocales.fi = {
        sizeUnits: ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'], 
        bitRateUnits: ['B/s', 'KB/s', 'MB/s', 'GB/s', 'TB/s', 'PB/s', 'EB/s', 'ZB/s', 'YB/s'],
        fileSingle: 'tiedosto',
        filePlural: 'tiedostot',
        browseLabel: 'Selaa &hellip;',
        removeLabel: 'Poista',
        removeTitle: 'Tyhj&auml;nn&auml; valitut tiedostot',
        cancelLabel: 'Peruuta',
        cancelTitle: 'Peruuta lataus',
        pauseLabel: 'Pause',
        pauseTitle: 'Pause ongoing upload',
        uploadLabel: 'Lataa',
        uploadTitle: 'Lataa valitut tiedostot',
        msgNoFilesSelected: '',
        msgFileRequired: 'You must select a file to upload.',
        msgSizeTooSmall: 'File "{name}" (<b>{size}</b>) is too small and must be larger than <b>{minSize}</b>.',
        msgSizeTooLarge: 'Tiedosto "{name}" (<b>{size}</b>) ylitt&auml;&auml; suurimman sallitun tiedoston koon, joka on <b>{maxSize}</b>. Yrit&auml; uudelleen!',
        msgFilesTooLess: 'V&auml;hint&auml;&auml;n <b>{n}</b> {files} tiedostoa on valittava ladattavaksi. Ole hyv&auml; ja yrit&auml; uudelleen!',
        msgFilesTooMany: 'Valittujen tiedostojen lukum&auml;&auml;r&auml; <b>({n})</b> ylitt&auml;&auml; suurimman sallitun m&auml;&auml;r&auml;n <b>{m}</b>. Ole hyv&auml; ja yrit&auml; uudelleen!',
        msgTotalFilesTooMany: 'You can upload a maximum of <b>{m}</b> files (<b>{n}</b> files detected).',
        msgFileNotFound: 'Tiedostoa "{name}" ei l&ouml;ydy!',
        msgFileSecured: 'Tietoturvarajoitukset est&auml;v&auml;t tiedoston "{name}" lukemisen.',
        msgFileNotReadable: 'Tiedosto "{name}" ei ole luettavissa.',
        msgFilePreviewAborted: 'Tiedoston "{name}" esikatselu keskeytetty.',
        msgFilePreviewError: 'Virhe on tapahtunut luettaessa tiedostoa "{name}".',
        msgInvalidFileName: 'Invalid or unsupported characters in file name "{name}".',
        msgInvalidFileType: 'Tiedosto "{name}" on v&auml;&auml;r&auml;n tyyppinen. Ainoastaan tiedostot tyyppi&auml; "{types}" ovat tuettuja.',
        msgInvalidFileExtension: 'Tiedoston "{name}" tarkenne on ep&auml;kelpo. Ainoastaan tarkenteet "{extensions}" ovat tuettuja.',
        msgFileTypes: {
            'image': 'Kuva',
            'html': 'HTML',
            'text': 'Teksti',
            'video': 'Video',
            'audio': 'Ääni',
            'flash': 'Flash',
            'pdf': 'PDF',
            'object': 'Olio'
        },
        msgUploadThreshold: 'Käsitellään &hellip;',
        msgUploadBegin: 'Initializing &hellip;',
        msgUploadEnd: 'Done',
        msgUploadResume: 'Resuming upload &hellip;',
        msgUploadEmpty: 'Ei ladattavaa dataa.',
        msgUploadError: 'Upload Error',
        msgDeleteError: 'Delete Error',
        msgProgressError: 'Error',
        msgValidationError: 'Tiedoston latausvirhe',
        msgLoading: 'Ladataan tiedostoa {index} / {files} &hellip;',
        msgProgress: 'Ladataan tiedostoa {index} / {files} - {name} - {percent}% valmistunut.',
        msgSelected: '{n} tiedostoa valittu',
        msgFoldersNotAllowed: 'Raahaa ja pudota ainoastaan tiedostoja! Ohitettu {n} raahattua kansiota.',
        msgAjaxError: 'Something went wrong with the {operation} operation. Please try again later!',
        msgAjaxProgressError: '{operation} failed',
        msgDuplicateFile: 'File "{name}" of same size "{size}" has already been selected earlier. Skipping duplicate selection.',
        msgResumableUploadRetriesExceeded:  'Upload aborted beyond <b>{max}</b> retries for file <b>{file}</b>! Error Details: <pre>{error}</pre>',
        msgPendingTime: '{time} remaining',
        msgCalculatingTime: 'calculating time remaining',
        ajaxOperations: {
            deleteThumb: 'file delete',
            uploadThumb: 'file upload',
            uploadBatch: 'batch file upload',
            uploadExtra: 'form data upload'
        },
        dropZoneTitle: 'Raahaa ja pudota tiedostot t&auml;h&auml;n &hellip;',
        dropZoneClickTitle: '<br>(tai valitse hiirellä {files})',
        fileActionSettings: {
            removeTitle: 'Poista tiedosto',
            uploadTitle: 'Upload file',
            uploadRetryTitle: 'Retry upload',
            downloadTitle: 'Download file',
            rotateTitle: 'Rotate 90 deg. clockwise',
            zoomTitle: 'Yksityiskohdat',
            dragTitle: 'Siirrä / Järjestele',
            indicatorNewTitle: 'Ei ladattu',
            indicatorSuccessTitle: 'Ladattu',
            indicatorErrorTitle: 'Lataus epäonnistui',
            indicatorPausedTitle: 'Upload Paused',
            indicatorLoadingTitle:  'Ladataan &hellip;'
        },
        previewZoomButtonTitles: {
            prev: 'Seuraava tiedosto',
            next: 'Edellinen tiedosto',
            rotate: 'Rotate 90 deg. clockwise',
            toggleheader: 'Näytä otsikko',
            fullscreen: 'Kokonäytön tila',
            borderless: 'Rajaton tila',
            close: 'Sulje esikatselu'
        }
    };

    $.extend($.fn.fileinput.defaults, $.fn.fileinputLocales.fi);
}));
