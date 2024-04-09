/*!
 * FileInput German Translations
 *
 * This file must be loaded after 'fileinput.js'. Patterns in braces '{}', or
 * any HTML markup tags in the messages must not be converted or translated.
 *
 * @see http://github.com/kartik-v/bootstrap-fileinput
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

    $.fn.fileinputLocales['de'] = {
        sizeUnits: ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
        bitRateUnits: ['B/s', 'KB/s', 'MB/s', 'GB/s', 'TB/s', 'PB/s', 'EB/s', 'ZB/s', 'YB/s'],
        fileSingle: 'Datei',
        filePlural: 'Dateien',
        browseLabel: 'Auswählen&hellip;',
        removeLabel: 'Entfernen',
        removeTitle: 'Ausgewählte Dateien entfernen',
        cancelLabel: 'Abbrechen',
        cancelTitle: 'Upload abbrechen',
        pauseLabel: 'Pausieren',
        pauseTitle: 'Upload pausieren',
        uploadLabel: 'Hochladen',
        uploadTitle: 'Ausgewählte Dateien hochladen',
        msgNo: 'Keine',
        msgNoFilesSelected: 'Keine Dateien ausgewählt',
        msgPaused: 'Pausiert',
        msgCancelled: 'Abgebrochen',
        msgPlaceholder: '{files} auswählen...',
        msgZoomModalHeading: 'ausführliche Vorschau',
        msgFileRequired: 'Sie müssen eine Datei zum Hochladen auswählen.',
        msgSizeTooSmall: 'Datei "{name}" (<b>{size}</b>) unterschreitet mindestens notwendige Upload-Größe von <b>{minSize}</b>.',
        msgSizeTooLarge: 'Datei "{name}" (<b>{size}</b>) überschreitet maximal zulässige Upload-Größe von <b>{maxSize}</b>.',
        msgMultipleSizeTooLarge: 'Dateien "{name}" (<b>{size}</b>) überschreitet maximal zulässige Upload-Größe von <b>{maxSize}</b>.',
        msgFilesTooLess: 'Sie müssen mindestens <b>{n}</b> {files} zum Hochladen auswählen.',
        msgFilesTooMany: 'Anzahl der zum Hochladen ausgewählten Dateien <b>({n})</b> überschreitet maximal zulässige Grenze von <b>{m}</b> Dateien.',
        msgTotalFilesTooMany: 'Anzahl der insgesamt zum Hochladen ausgewählten Dateien <b>({n})</b> überschreitet maximal zulässige Grenze von <b>{m}</b> Dateien.',
        msgFileNotFound: 'Datei "{name}" wurde nicht gefunden.',
        msgFileSecured: 'Sicherheitseinstellungen verhindern das Lesen der Datei "{name}".',
        msgFileNotReadable: 'Die Datei "{name}" ist nicht lesbar.',
        msgFilePreviewAborted: 'Dateivorschau abgebrochen für "{name}".',
        msgFilePreviewError: 'Beim Lesen der Datei "{name}" ist ein Fehler aufgetreten.',
        msgInvalidFileName: 'Ungültige oder nicht unterstützte Zeichen im Dateinamen "{name}".',
        msgInvalidFileType: 'Ungültiger Typ für Datei "{name}". Folgende Typen werden unterstützt: "{types}"',
        msgInvalidFileExtension: 'Ungültige Erweiterung für Datei "{name}". Folgende Endungen werden unterstützt: "{extensions}"',
        msgFileTypes: {
            'image': 'Bild',
            'html': 'HTML',
            'text': 'Text',
            'video': 'Video',
            'audio': 'Audio',
            'flash': 'Flash',
            'pdf': 'PDF',
            'object': 'Objekt'
        },
        msgUploadAborted: 'Der Upload wurde abgebrochen',
        msgUploadThreshold: 'Wird verarbeitet&hellip;',
        msgUploadBegin: 'Upload wird initialisiert&hellip;',
        msgUploadEnd: 'Abgeschlossen',
        msgUploadResume: 'Nehme Upload wieder auf&hellip;',
        msgUploadEmpty: 'Keine gültigen Daten zum Hochladen verfügbar.',
        msgUploadError: 'Uploadfehler',
        msgDeleteError: 'Fehler beim Löschen',
        msgProgressError: 'Fehler',
        msgValidationError: 'Validierungsfehler',
        msgLoading: 'Lade Datei {index} von {files} hoch&hellip;',
        msgProgress: 'Datei {index} von {files} - {name} - zu {percent}&#x202F;% fertiggestellt.',
        msgSelected: '{n} {files} ausgewählt',
        msgProcessing: 'Verarbeite&hellip;',
        msgFoldersNotAllowed: 'Drag-and-Drop funktioniert nur bei Dateien. {n} Ordner übersprungen.',
        msgImageWidthSmall: 'Breite der Bilddatei "{name}" muss mindestens <b>{size}&#x202F;px</b> betragen (erkannt: <b>{dimension}&#x202F;px</b>).',
        msgImageHeightSmall: 'Höhe der Bilddatei "{name}" muss mindestens <b>{size}&#x202F;px</b> betragen (erkannt: <b>{dimension}&#x202F;px</b>).',
        msgImageWidthLarge: 'Breite der Bilddatei "{name}" darf <b>{size}&#x202F;px</b> nicht überschreiten (erkannt: <b>{dimension}&#x202F;px</b>).',
        msgImageHeightLarge: 'Höhe der Bilddatei "{name}" darf <b>{size}&#x202F;px</b> nicht überschreiten (erkannt: <b>{dimension}&#x202F;px</b>).',
        msgImageResizeError: 'Konnte die Bildgröße nicht ändern.',
        msgImageResizeException: 'Fehler beim Ändern der Bildgröße.<pre>{errors}</pre>',
        msgAjaxError: 'Bei der Aktion "{operation}" ist ein Fehler aufgetreten. Bitte versuchen Sie es später noch einmal.',
        msgAjaxProgressError: '{operation} fehlgeschlagen',
        msgDuplicateFile: 'Die Datei "{name}" mit der Größe "{size}" ist bereits ausgewählt worden.',
        msgResumableUploadRetriesExceeded: 'Upload der Datei <b>{file}</b> nach <b>{max}</b> Versuchen abgebrochen. Fehler: <pre>{error}</pre>',
        msgPendingTime: '{time} verbleibend',
        msgCalculatingTime: 'Berechne verbleibende Dauer',
        ajaxOperations: {
            deleteThumb: 'Datei löschen',
            uploadThumb: 'Datei hochladen',
            uploadBatch: 'Datei-Batchupload',
            uploadExtra: 'Formulardaten-Upload'
        },
        dropZoneTitle: 'Dateien hierher ziehen&hellip;',
        dropZoneClickTitle: '<br>(oder klicken, um {files} auszuwählen)',
        fileActionSettings: {
            removeTitle: 'Datei entfernen',
            uploadTitle: 'Datei hochladen',
            uploadRetryTitle: 'Upload erneut versuchen',
            downloadTitle: 'Datei herunterladen',
            rotateTitle: 'Um 90 Grad im Uhrzeigersinn drehen',
            zoomTitle: 'Details anzeigen',
            dragTitle: 'Verschieben',
            indicatorNewTitle: 'Noch nicht hochgeladen',
            indicatorSuccessTitle: 'Hochgeladen',
            indicatorErrorTitle: 'Uploadfehler',
            indicatorPausedTitle: 'Upload pausiert',
            indicatorLoadingTitle:  'Lade hoch...'
        },
        previewZoomButtonTitles: {
            prev: 'Vorherige Datei anzeigen',
            next: 'Nächste Datei anzeigen',
            rotate: 'Um 90 Grad im Uhrzeigersinn drehen',
            toggleheader: 'Kopfzeile umschalten',
            fullscreen: 'Vollbildmodus umschalten',
            borderless: 'Randlosen Modus umschalten',
            close: 'Detailansicht schließen'
        }
    };
}));
