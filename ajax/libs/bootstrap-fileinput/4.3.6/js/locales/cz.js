/*!
 * FileInput Czech Translations
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

    $.fn.fileinputLocales['cz'] = {
        fileSingle: 'soubor',
        filePlural: 'soubory',
        browseLabel: 'Vybrat &hellip;',
        removeLabel: 'Odstranit',
        removeTitle: 'Vyčistit vybrané soubory',
        cancelLabel: 'Storno',
        cancelTitle: 'Přerušit  nahrávání',
        uploadLabel: 'Nahrát',
        uploadTitle: 'Nahrát vybrané soubory',
        msgNo: 'Ne',
        msgNoFilesSelected: '',
        msgCancelled: 'Zrušeno',
        msgZoomModalHeading: 'Detailní náhled',
        msgSizeTooSmall: 'File "{name}" (<b>{size} KB</b>) is too small and must be larger than <b>{minSize} KB</b>.',
        msgSizeTooLarge: 'Soubor "{name}" (<b>{size} KB</b>): překročení - maximální povolená velikost <b>{maxSize} KB</b>.',
        msgFilesTooLess: 'Musíte vybrat nejméně <b>{n}</b> {files} pro nahrání.',
        msgFilesTooMany: 'Počet vybraných souborů pro nahrání <b>({n})</b>: překročení - maximální povolený limit <b>{m}</b>.',
        msgFileNotFound: 'Soubor "{name}" nebyl nalezen!',
        msgFileSecured: 'Zabezpečení souboru znemožnilo číst soubor "{name}".',
        msgFileNotReadable: 'Soubor "{name}" není čitelný.',
        msgFilePreviewAborted: 'Náhled souboru byl přerušen pro "{name}".',
        msgFilePreviewError: 'Nastala chyba při načtení souboru "{name}".',
        msgInvalidFileName: 'Invalid or unsupported characters in file name "{name}".',
        msgInvalidFileType: 'Neplatný typ souboru "{name}". Pouze "{types}" souborů jsou podporovány.',
        msgInvalidFileExtension: 'Neplatná extenze souboru "{name}". Pouze "{extensions}" souborů jsou podporovány.',
        msgUploadAborted: 'Soubor nahrávání byl přerušen',
        msgUploadThreshold: 'Processing...',
        msgValidationError: 'Chyba ověření',
        msgLoading: 'Nahrávání souboru {index} z {files} &hellip;',
        msgProgress: 'Nahrávání souboru {index} z {files} - {name} - {percent}% dokončeno.',
        msgSelected: '{n} {files} vybrano',
        msgFoldersNotAllowed: 'Táhni a pusť pouze soubory! Vynechané {n} pustěné složk(y).',
        msgImageWidthSmall: 'Šířka image soubor "{name}", musí být alespoň {size} px.',
        msgImageHeightSmall: 'Výška image soubor "{name}", musí být alespoň {size} px.',
        msgImageWidthLarge: 'Šířka obrazového souboru "{name}" nelze překročit {size} px.',
        msgImageHeightLarge: 'Výška obrazového souboru "{name}" nelze překročit {size} px.',
        msgImageResizeError: 'Nelze získat rozměry obrázku změnit velikost.',
        msgImageResizeException: 'Chyba při změně velikosti obrázku.<pre>{errors}</pre>',
        dropZoneTitle: 'Táhni a pusť soubory sem &hellip;',
        dropZoneClickTitle: '<br>(or click to select {files})',
        fileActionSettings: {
            removeTitle: 'Odstranit soubor',
            uploadTitle: 'nahrát soubor',
            zoomTitle: 'zobrazit podrobnosti',
            dragTitle: 'Move / Rearrange',
            indicatorNewTitle: 'Ještě nenahrál',
            indicatorSuccessTitle: 'Nahraný',
            indicatorErrorTitle: 'Nahrát Chyba',
            indicatorLoadingTitle: 'Nahrávání ...'
        },
        previewZoomButtonTitles: {
            prev: 'View previous file',
            next: 'View next file',
            toggleheader: 'Toggle header',
            fullscreen: 'Toggle full screen',
            borderless: 'Toggle borderless mode',
            close: 'Close detailed preview'
        }
    };
})(window.jQuery);