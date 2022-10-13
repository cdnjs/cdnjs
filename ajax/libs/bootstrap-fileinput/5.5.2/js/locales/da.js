/*!
 * FileInput Danish Translations
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
}(function($) {
    "use strict";

    $.fn.fileinputLocales['da'] = {
        sizeUnits: ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'], 
        bitRateUnits: ['B/s', 'KB/s', 'MB/s', 'GB/s', 'TB/s', 'PB/s', 'EB/s', 'ZB/s', 'YB/s'],
        fileSingle: 'fil',
        filePlural: 'filer',
        browseLabel: 'Browse &hellip;',
        removeLabel: 'Fjern',
        removeTitle: 'Fjern valgte filer',
        cancelLabel: 'Fortryd',
        cancelTitle: 'Afbryd nuværende upload',
        pauseLabel: 'Pause',
        pauseTitle: 'Pause ongoing upload',
        uploadLabel: 'Upload',
        uploadTitle: 'Upload valgte filer',
        msgNo: 'Ingen',
        msgNoFilesSelected: '',
        msgPaused: 'Paused',
        msgCancelled: 'aflyst',
        msgPlaceholder: 'Vælg {files} ...',
        msgZoomModalHeading: 'Detaljeret visning',
        msgFileRequired: 'Du skal vælge en fil at uploade.',
        msgSizeTooSmall: 'Fil "{name}" (<b>{size}</b>) er for lille og skal være større end <b>{minSize}</b>.',
        msgSizeTooLarge: 'Fil "{name}" (<b>{size}</b>) er større end de tilladte <b>{maxSize}</b>.',
        msgFilesTooLess: 'Du skal mindst vælge <b>{n}</b> {files} til upload.',
        msgFilesTooMany: '<b>({n})</b> filer valgt til upload, men maks. <b>{m}</b> er tilladt.',
        msgTotalFilesTooMany: 'You can upload a maximum of <b>{m}</b> files (<b>{n}</b> files detected).',
        msgFileNotFound: 'Filen "{name}" blev ikke fundet!',
        msgFileSecured: 'Sikkerhedsrestriktioner forhindrer læsning af "{name}".',
        msgFileNotReadable: 'Filen "{name}" kan ikke indlæses.',
        msgFilePreviewAborted: 'Filgennemsyn annulleret for "{name}".',
        msgFilePreviewError: 'Der skete en fejl under læsningen af filen "{name}".',
        msgInvalidFileName: 'Ugyldige eller ikke-understøttede tegn i filnavn "{name}".',
        msgInvalidFileType: 'Ukendt type for filen "{name}". Kun "{types}" kan bruges.',
        msgInvalidFileExtension: 'Ukendt filtype for filen "{name}". Kun "{extensions}" filer kan bruges.',
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
        msgUploadAborted: 'Filupload annulleret',
        msgUploadThreshold: 'Arbejder &hellip;',
        msgUploadBegin: 'Initialiserer &hellip;',
        msgUploadEnd: 'Udført',
        msgUploadResume: 'Genoptager upload &hellip;',
        msgUploadEmpty: 'Ingen gyldig data tilgængelig til upload.',
        msgUploadError: 'Upload fejl',
        msgDeleteError: 'Sletnings fejl',
        msgProgressError: 'Fejl',
        msgValidationError: 'Valideringsfejl',
        msgLoading: 'Henter fil {index} af {files} &hellip;',
        msgProgress: 'Henter fil {index} af {files} - {name} - {percent}% færdiggjort.',
        msgSelected: '{n} {files} valgt',
        msgProcessing: 'Processing ...',
        msgFoldersNotAllowed: 'Drag & drop kun filer! {n} mappe(r) sprunget over.',
        msgImageWidthSmall: 'Bredden af billedet "{name}" skal være på mindst <b>{size} px</b> (detected <b>{dimension} px</b>).',
        msgImageHeightSmall: 'Højden af billedet "{name}" skal være på mindst <b>{size} px</b> (detected <b>{dimension} px</b>).',
        msgImageWidthLarge: 'Bredden af billedet "{name}" må ikke være over <b>{size} px</b> (detected <b>{dimension} px</b>).',
        msgImageHeightLarge: 'Højden af billedet "{name}" må ikke være over <b>{size} px</b> (detected <b>{dimension} px</b>).',
        msgImageResizeError: 'Kunne ikke få billedets dimensioner for at ændre størrelsen.',
        msgImageResizeException: 'Fejl ved at ændre størrelsen på billedet.<pre>{errors}</pre>',
        msgAjaxError: 'Noget gik galt med {operation} operationen. Forsøg venligst senere!',
        msgAjaxProgressError: '{operation} fejlede',
        msgDuplicateFile: 'File "{name}" af samme størrelse "{size}" er allerede valgt tidligere. Springer over duplikat valg.',
        msgResumableUploadRetriesExceeded: 'Upload afbrudt ud over <b> {max} </b> forsøger igen for fil <b> {fil} </b>! Fejloplysninger: <pre> {error} </pre>',
        msgPendingTime: '{time} tilbage',
        msgCalculatingTime: 'beregner resterende tid',
        ajaxOperations: {
            deleteThumb: 'fil slet',
            uploadThumb: 'fil upload',
            uploadBatch: 'batchfil upload',
            uploadExtra: 'form data upload'
        },
        dropZoneTitle: 'Drag & drop filer her &hellip;',
        dropZoneClickTitle: '<br>(eller klik for at vælge {files})',
        fileActionSettings: {
            removeTitle: 'Fjern fil',
            uploadTitle: 'Upload fil',
            uploadRetryTitle: 'Forsøg upload igen',
            downloadTitle: 'Download fil',
            rotateTitle: 'Rotate 90 deg. clockwise',
            zoomTitle: 'Se detaljer',
            dragTitle: 'Flyt / Omarranger',
            indicatorNewTitle: 'Ikke uploadet endnu',
            indicatorSuccessTitle: 'Uploadet',
            indicatorErrorTitle: 'Upload fejl',
            indicatorPausedTitle: 'Upload Paused',
            indicatorLoadingTitle: 'Uploader &hellip;'
        },
        previewZoomButtonTitles: {
            prev: 'Se forrige fil',
            next: 'Se næste fil',
            rotate: 'Rotate 90 deg. clockwise',
            toggleheader: 'Skift titel',
            fullscreen: 'Skift fuld skærm',
            borderless: 'Skift grænseløs mode',
            close: 'Luk detaljeret visning'
        }
    };
}));