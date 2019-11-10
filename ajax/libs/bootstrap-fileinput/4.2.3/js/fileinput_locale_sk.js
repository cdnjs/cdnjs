/*!
 * FileInput Slovakian Translations
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

    $.fn.fileinputLocales['sk'] = {
        fileSingle: 'súbor',
        filePlural: 'súbory',
        browseLabel: 'Vybrať &hellip;',
        removeLabel: 'Odstrániť',
        removeTitle: 'Vyčistiť vybraté súbory',
        cancelLabel: 'Storno',
        cancelTitle: 'Prerušiť  nahrávanie',
        uploadLabel: 'Nahrať',
        uploadTitle: 'Nahrať vybraté súbory',
        msgSizeTooLarge: 'Súbor "{name}" (<b>{size} KB</b>): prekročenie - maximálna povolená veľkosť <b>{maxSize} KB</b>. Skúste nahrať opäť, prosím!',
        msgFilesTooLess: 'Musíte vybrať najmenej <b>{n}</b> {files} pre nahranie. Skúste nahrať opäť, prosím!',
        msgFilesTooMany: 'Počet vybratých súborov pre nahranie <b>({n})</b>: prekročenie - maximálny povolený limit <b>{m}</b>. Skúste nahrať opäť, prosím!',
        msgFileNotFound: 'Súbor "{name}" nebol nájdený!',
        msgFileSecured: 'Zabezpečenie súboru znemožnilo čítať súbor "{name}".',
        msgFileNotReadable: 'Súbor "{name}" nie je čitateľný.',
        msgFilePreviewAborted: 'Náhľad súboru bol prerušený pre "{name}".',
        msgFilePreviewError: 'Nastala chyba pri načítaní súboru "{name}".',
        msgInvalidFileType: 'Neplatný typ súboru "{name}". Iba "{types}" súborov sú podporované.',
        msgInvalidFileExtension: 'Neplatná extenzia súboru "{name}". Iba "{extensions}" súborov sú podporované.',
        msgValidationError: 'Chyba nahratia súboru.',
        msgLoading: 'Nahrávanie súboru {index} z {files} &hellip;',
        msgProgress: 'Nahrávanie súboru {index} z {files} - {name} - {percent}% dokončené.',
        msgSelected: '{n} {files} vybraté',
        msgFoldersNotAllowed: 'Tiahni a pusť iba súbory! Vynechané {n} pustené prečinok(y).',
        msgImageWidthSmall: 'Šírka image súboru "{name}", musí byť minimálne {size} px.',
        msgImageHeightSmall: 'Výška image súboru "{name}", musí byť minimálne {size} px.',
        msgImageWidthLarge: 'Šírka image súboru "{name}" nemôže presiahnuť {size} px.',
        msgImageHeightLarge: 'Výška súboru obrazu "{name}" nesmie presiahnuť {size} px.',
        dropZoneTitle: 'Tiahni a pusť súbory tu &hellip;'
    };
})(window.jQuery);