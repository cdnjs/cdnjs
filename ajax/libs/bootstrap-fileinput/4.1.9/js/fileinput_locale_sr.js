/*!
 * FileInput Serbian Translations
 *
 * This file must be loaded after 'fileinput.js'. Patterns in braces '{}', or
 * any HTML markup tags in the messages must not be converted or translated.
 *
 * @see http://github.com/kartik-v/bootstrap-fileinput
 * @author Milos Stojanovic <stojanovic.loshmi@gmail.com>
 *
 * NOTE: this file must be saved in UTF-8 encoding.
 */
(function ($) {
    "use strict";

    $.fn.fileinput.locales.sr = {
        fileSingle: 'datoteka',
        filePlural: 'datoteke',
        browseLabel: 'Izaberi &hellip;',
        removeLabel: 'Ukloni',
        removeTitle: 'Ukloni označene datoteke',
        cancelLabel: 'Odustani',
        cancelTitle: 'Prekini trenutno otpremanje',
        uploadLabel: 'Otpremi',
        uploadTitle: 'Otpremi označene datoteke',
        msgSizeTooLarge: 'Datoteka "{name}" (<b>{size} KB</b>) prekoračuje maksimalnu dozvoljenu veličinu datoteke od <b>{maxSize} KB</b>. Molimo pokušajte ponovo!',
        msgFilesTooLess: 'Morate odabrati najmanje <b>{n}</b> {files} za otpremanje. Molimo pokušajte ponovo!',
        msgFilesTooMany: 'Broj datoteka označenih za otpremanje <b>({n})</b> prekoračuje maksimalni dozvoljeni limit od <b>{m}</b>. Molimo pokušajte ponovo!',
        msgFileNotFound: 'Datoteka "{name}" nije pronađena!',
        msgFileSecured: 'Datoteku "{name}" nije moguće pročitati zbog bezbednosnih ograničenja.',
        msgFileNotReadable: 'Datoteku "{name}" nije moguće pročitati.',
        msgFilePreviewAborted: 'Generisanje prikaza nije moguće za "{name}".',
        msgFilePreviewError: 'Došlo je do greške prilikom čitanja datoteke "{name}".',
        msgInvalidFileType: 'Datoteka "{name}" je pogrešnog formata. Dozvoljeni formati su "{types}".',
        msgInvalidFileExtension: 'Ekstenzija datoteke "{name}" nije dozvoljena. Dozvoljene ekstenzije su "{extensions}".',
        msgValidationError: 'Greška prilikom otpremanja fajla',
        msgLoading: 'Učitavanje datoteke {index} od {files} &hellip;',
        msgProgress: 'Učitavanje datoteke {index} od {files} - {name} - {percent}% završeno.',
        msgSelected: '{n} {files} je označeno',
        msgFoldersNotAllowed: 'Moguće je prevlačiti samo datoteke! Preskočeno je {n} fascikla.',
        dropZoneTitle: 'Prevucite datoteke ovde &hellip;'
    };

    $.extend($.fn.fileinput.defaults, $.fn.fileinput.locales.sr);
})(window.jQuery);
