/*!
 * FileInput German Translations
 *
 * This file must be loaded after 'fileinput.js'. Patterns in braces '{}', or
 * any HTML markup tags in the messages must not be converted or translated.
 *
 * @see http://github.com/kartik-v/bootstrap-fileinput
 */
(function ($) {
    "use strict";

    $.fn.fileinput.locales.de = {
        fileSingle: 'Datei',
        filePlural: 'Dateien',
        browseLabel: 'Blättern &hellip;',
        removeLabel: 'Entfernen',
        removeTitle: 'Klar ausgewählten Dateien',
        cancelLabel: 'Laden',
        cancelTitle: 'Abbruch laufenden Hochladen',
        uploadLabel: 'Hochladen',
        uploadTitle: 'Hochladen ausgewählten Dateien',
        msgSizeTooLarge: 'Datei "{name}" (<b>{size} KB</b>) überschreitet maximal zulässige Upload-Größe von <b>{maxSize} KB</b>. Bitte versuchen Sie Ihr Hochladen!',
        msgFilesTooLess: 'Sie müssen mindestens <b>{n}</b> {files} zum Hochladen auswählen. Bitte versuchen Sie Ihr Hochladen!',
        msgFilesTooMany: 'Anzahl der Dateien für den Upload ausgewählt <b>({n})</b> überschreitet maximal zulässige Grenze von <b>{m}</b>. Bitte versuchen Sie Ihr Hochladen!',
        msgFileNotFound: 'Datei "{name}" wurde nicht gefunden!',
        msgFileSecured: 'Sicherheitseinschränkungen verhindern Lesen der Datei "{name}".',
        msgFileNotReadable: 'Datei "{name}" ist nicht lesbar.',
        msgFilePreviewAborted: 'Dateivorschau abgebrochen für "{name}".',
        msgFilePreviewError: 'Beim Lesen der Datei "{name}" ein Fehler aufgetreten.',
        msgInvalidFileType: 'Ungültiger Typ für Datei "{name}". Nur "{types}" Dateien werden unterstützt.',
        msgInvalidFileExtension: 'Ungültige Erweiterung für Datei "{name}". Nur "{extensions}" Dateien werden unterstützt.',
        msgValidationError: 'Dateifehler hochladen',
        msgLoading: 'Wird Geladen Datei {index} von {files} &hellip;',
        msgProgress: 'Wird Geladen Datei {index} von {files} - {name} - {percent}% fertiggestellt.',
        msgSelected: '{n} Dateien ausgewählt',
        msgFoldersNotAllowed: 'Drag & Drop Dateien nur! Sprungen {n} gesunken Ordner.',
        dropZoneTitle: 'Drag & Drop Dateien hier &hellip;'
    };

    $.extend($.fn.fileinput.defaults, $.fn.fileinput.locales.de);
})(window.jQuery);