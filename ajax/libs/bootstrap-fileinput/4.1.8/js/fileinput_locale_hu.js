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

    $.fn.fileinput.locales.hu = {
        fileSingle: 'fájl',
        filePlural: 'fájlok',
        browseLabel: 'Böngész &hellip;',
        removeLabel: 'Eltávolít',
        removeTitle: 'Kijelölt fájlok törlése',
        cancelLabel: 'Mégse',
        cancelTitle: 'Feltöltés megszakítása',
        uploadLabel: 'Feltöltés',
        uploadTitle: 'Kijelölt fájlok feltöltése',
        msgSizeTooLarge: '"{name}" fájl (<b>{size} KB</b>) mérete nagyobb a megengedettnél <b>{maxSize} KB</b>. Kérjük próbálja újra!',
        msgFilesTooLess: 'Legalább <b>{n}</b> {files} ki kell választania a feltöltéshez. Kérjük próbálja újra!',
        msgFilesTooMany: 'A feltölteni kívánt fájlok száma <b>({n})</b> elérte a megengedett maximumot <b>{m}</b>. Kérjük próbálja újra!',
        msgFileNotFound: '"{name}" fájl nem található!',
        msgFileSecured: 'Biztonsági beállítások nem engedik olvasni a fájlt "{name}".',
        msgFileNotReadable: '"{name}" fájl nem olvasható',
        msgFilePreviewAborted: '"{name}" fájl feltöltése megszakítva.',
        msgFilePreviewError: 'Hiba lépett fel a "{name}" fájl olvasása közben.',
        msgInvalidFileType: 'Nem megengedett fájl "{name}". Csak a "{types}" fájl típusok támogatottak.',
        msgInvalidFileExtension: 'Nem megengedett kiterjesztés / fájltípus "{name}". Csak a "{extensions}" kiterjesztés(ek) / fájltípus(ok) támogatottak.',
        msgValidationError: 'Fájl ellenörzési hiba.',
        msgLoading: '{index} / {files} töltése &hellip;',
        msgProgress: 'Feltöltés: {index} / {files} - {name} - {percent}% kész.',
        msgSelected: '{n} fájl kiválasztva.',
        msgFoldersNotAllowed: 'Csak fájlokat húzzon ide! Kihagyva {n} könyvtár.',
        dropZoneTitle: 'Fájlok húzása ide &hellip;'
    };

    $.extend($.fn.fileinput.defaults, $.fn.fileinput.locales.hu);
})(window.jQuery);