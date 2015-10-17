/*!
 * FileInput Dutch Translations
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

    $.fn.fileinput.locales.nl = {
        fileSingle: 'bestand',
        filePlural: 'bestanden',
        browseLabel: 'Zoek &hellip;',
        removeLabel: 'Verwijder',
        removeTitle: 'Verwijder geselecteerde bestanden',
        cancelLabel: 'Annuleren',
        cancelTitle: 'Annuleer gaande upload',
        uploadLabel: 'Upload',
        uploadTitle: 'Upload geselecteerde bestanden',
        msgSizeTooLarge: 'Bestand "{name}" (<b>{size} KB</b>) is groter dan de toegestaande <b>{maxSize} KB</b>. Probeer opnieuw!',
        msgFilesTooLess: 'U moet minstens <b>{n}</b> {files} selecteren om te uploaden. Probeer opnieuw!',
        msgFilesTooMany: 'Aantal geselecteerde bestanden <b>({n})</b> is meer dan de toegestaande <b>{m}</b>. Probeer opnieuw!',
        msgFileNotFound: 'Bestand "{name}" niet gevonden!',
        msgFileSecured: 'Bestand kan niet gelezen worden in verband met beveiligings redenen "{name}".',
        msgFileNotReadable: 'Bestand "{name}" is niet leesbaar.',
        msgFilePreviewAborted: 'Bestand weergaven geannuleerd voor "{name}".',
        msgFilePreviewError: 'Er is een fout opgetreden met lezen van "{name}".',
        msgInvalidFileType: 'Geen geldig bestand "{name}". Alleen "{types}" zijn toegestaan.',
        msgInvalidFileExtension: 'Geen geldige extensie "{name}". Alleen "{extensions}" zijn toegestaan.',
        msgValidationError: 'Bestand upload fout',
        msgLoading: 'Bestanden laden {index} van de {files} &hellip;',
        msgProgress: 'Bestanden laden {index} van de {files} - {name} - {percent}% compleet.',
        msgSelected: '{n} {files} geselecteerd',
        msgFoldersNotAllowed: 'Drag & drop bestanden alleen! overgeslagen {n} mappen(s).',
        dropZoneTitle: 'Drag & drop bestanden hier &hellip;'
    };

    $.extend($.fn.fileinput.defaults, $.fn.fileinput.locales.nl);
})(window.jQuery);
