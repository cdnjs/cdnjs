/*!
 * FileInput Romanian Translations
 *
 * This file must be loaded after 'fileinput.js'. Patterns in braces '{}', or
 * any HTML markup tags in the messages must not be converted or translated.
 *
 * @see http://github.com/kartik-v/bootstrap-fileinput
 * @author Ciprian Voicu <pictoru@autoportret.ro>
 *
 * NOTE: this file must be saved in UTF-8 encoding.
 */
(function ($) {
    "use strict";

    $.fn.fileinputLocales['ro'] = {
        fileSingle: 'fișier',
        filePlural: 'fișiere',
        browseLabel: 'Răsfoiește &hellip;',
        removeLabel: 'Șterge',
        removeTitle: 'Curăță fișierele selectate',
        cancelLabel: 'Renunță',
        cancelTitle: 'Anulează încărcarea curentă',
        uploadLabel: 'Încarcă',
        uploadTitle: 'Încarcă fișierele selectate',
        msgSizeTooLarge: 'Fișierul "{name}" (<b>{size} KB</b>) depășește limita maximă de încărcare de <b>{maxSize} KB</b>. Te rugăm reîncearcă!',
        msgFilesTooLess: 'Trebuie să selectezi cel puțin <b>{n}</b> {files} pentru a încărca. Te rugăm reîncearcă!',
        msgFilesTooMany: 'Numărul fișierelor pentru încărcare <b>({n})</b> depășește limita maximă de <b>{m}</b>. Te rugăm reîncearcă!',
        msgFileNotFound: 'Fișierul "{name}" nu a fost găsit!',
        msgFileSecured: 'Restricții de securitate previn citirea fișierului "{name}".',
        msgFileNotReadable: 'Fișierul "{name}" nu se poate citi.',
        msgFilePreviewAborted: 'Fișierului "{name}" nu poate fi previzualizat.',
        msgFilePreviewError: 'A intervenit o eroare în încercarea de citire a fișierului "{name}".',
        msgInvalidFileType: 'Tip de fișier incorect pentru "{name}". Sunt suportate doar fișiere de tipurile "{types}".',
        msgInvalidFileExtension: 'Extensie incorectă pentru "{name}". Sunt suportate doar extensiile "{extensions}".',
        msgValidationError: 'Eroare de încărcare',
        msgLoading: 'Se încarcă fișierul {index} din {files} &hellip;',
        msgProgress: 'Se încarcă fișierul {index} din {files} - {name} - {percent}% încărcat.',
        msgSelected: '{n} {files} încărcate',
        msgFoldersNotAllowed: 'Se poate doar trăgând fișierele! Se renunță la {n} dosar(e).',
        msgImageWidthSmall: 'Lățimea de fișier de imagine "{name}" trebuie să fie de cel puțin {size px.',
        msgImageHeightSmall: 'Înălțimea fișier imagine "{name}" trebuie să fie de cel puțin {size} px.',
        msgImageWidthLarge: 'Lățimea de fișier de imagine "{name}" nu poate depăși {size} px.',
        msgImageHeightLarge: 'Înălțimea fișier imagine "{name}" nu poate depăși {size} px.',
        dropZoneTitle: 'Trage fișierele aici &hellip;'
    };
})(window.jQuery);
