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
        sizeUnits: ['t', 'Kt', 'Mt', 'Gt', 'Tt', 'Pt', 'Et', 'Zt', 'Yt'], 
        bitRateUnits: ['t/s', 'Kt/s', 'Mt/s', 'Gt/s', 'Tt/s', 'Pt/s', 'Et/s', 'Zt/s', 'Yt/s'],
        fileSingle: 'tiedosto',
        filePlural: 'tiedostot',
        browseLabel: 'Selaa &hellip;',
        removeLabel: 'Poista',
        removeTitle: 'Tyhjenn&auml; valitut tiedostot',
        cancelLabel: 'Peruuta',
        cancelTitle: 'Peruuta lataus',
        pauseLabel: 'Keskeyt&auml;',
        pauseTitle: 'Keskeyt&auml; k&auml;ynniss&auml; oleva siirto',
        uploadLabel: 'Lataa',
        uploadTitle: 'Lataa valitut tiedostot',
        msgNo: 'Ei',
        msgNoFilesSelected: 'Ei valittuja tiedostoja',
        msgPaused: 'Keskeytetty',
        msgCancelled: 'Peruttu',
        msgPlaceholder: 'Valitse {files} &hellip;',
        msgZoomModalHeading: 'Yksityiskohtainen tarkastelu',
        msgFileRequired: 'Valitse siirrett&auml;v&auml; tiedosto.',
        msgSizeTooSmall: 'Tiedosto "{name}" (<b>{size}</b>) alittaa pienimm&auml;n sallitun tiedoston koon, joka on <b>{minSize}</b>. Yrit&auml; uudelleen!',
        msgSizeTooLarge: 'Tiedosto "{name}" (<b>{size}</b>) ylitt&auml;&auml; suurimman sallitun tiedoston koon, joka on <b>{maxSize}</b>. Yrit&auml; uudelleen!',
        msgMultipleSizeTooLarge: 'Tiedostoa "{name}" (<b>{size}</b>) ylitt&auml;&auml; suurimman sallitun tiedoston koon, joka on <b>{maxSize}</b>. Yrit&auml; uudelleen!',
        msgFilesTooLess: 'V&auml;hint&auml;&auml;n <b>{n}</b> {files} tiedostoa on valittava ladattavaksi. Ole hyv&auml; ja yrit&auml; uudelleen!',
        msgFilesTooMany: 'Valittujen tiedostojen lukum&auml;&auml;r&auml; <b>({n})</b> ylitt&auml;&auml; suurimman sallitun m&auml;&auml;r&auml;n <b>{m}</b>. Ole hyv&auml; ja yrit&auml; uudelleen!',
        msgTotalFilesTooMany: 'Korkeintaan <b>{m}</b> tiedostoa voidaan l&auml;hett&auml;&auml; (yritettiin <b>{n}</b> tiedostoa).',
        msgFileNotFound: 'Tiedostoa "{name}" ei l&ouml;ydy!',
        msgFileSecured: 'Tietoturvarajoitukset est&auml;v&auml;t tiedoston "{name}" lukemisen.',
        msgFileNotReadable: 'Tiedosto "{name}" ei ole luettavissa.',
        msgFilePreviewAborted: 'Tiedoston "{name}" esikatselu keskeytetty.',
        msgFilePreviewError: 'Virhe on tapahtunut luettaessa tiedostoa "{name}".',
        msgInvalidFileName: 'Tiedostonimi "{name}" sis&auml;lt&auml;&auml; ep&auml;kelpoja merkkej&auml;.',
        msgInvalidFileType: 'Tiedosto "{name}" on v&auml;&auml;r&auml;n tyyppinen. Ainoastaan tiedostot tyyppi&auml; "{types}" ovat tuettuja.',
        msgInvalidFileExtension: 'Tiedoston "{name}" tarkenne on ep&auml;kelpo. Ainoastaan tarkenteet "{extensions}" ovat tuettuja.',
        msgFileTypes: {
            'image': 'kuva',
            'html': 'HTML',
            'text': 'teksti',
            'video': 'video',
            'audio': '&auml;&auml;ni',
            'flash': 'flash',
            'pdf': 'PDF',
            'object': 'kohde'
        },
        msgUploadAborted: 'Tiedoston siirto peruttiin',
        msgUploadThreshold: 'K&auml;sitell&auml;&auml;n &hellip;',
        msgUploadBegin: 'Valmistellaan &hellip;',
        msgUploadEnd: 'Valmis',
        msgUploadResume: 'Jatketaan siirtoa &hellip;',
        msgUploadEmpty: 'Ei siirrett&auml;vi&auml; tietoja.',
        msgUploadError: 'Virhe siirrett&auml;ess&auml;',
        msgDeleteError: 'Virhe poistettaessa',
        msgProgressError: 'Virhe',
        msgValidationError: 'Tiedoston latausvirhe',
        msgLoading: 'Ladataan tiedostoa {index} / {files} &hellip;',
        msgProgress: 'Ladataan tiedostoa {index} / {files} - {name} - {percent}% valmistunut.',
        msgSelected: '{n} tiedostoa valittu',
        msgProcessing: 'K&auml;sitell&auml;&auml;n &hellip;',
        msgFoldersNotAllowed: 'Raahaa ja pudota ainoastaan tiedostoja! Ohitettu {n} raahattua kansiota.',
        msgImageWidthSmall: 'Kuvan "{name}" leveyden tulee olla v&auml;hint&auml;&auml;n <b>{size} px</b> (nyt <b>{dimension} px</b>).',
        msgImageHeightSmall: 'Kuvan "{name}" korkeuden tulee olla v&auml;hint&auml;&auml;n <b>{size} px</b> (nyt <b>{dimension} px</b>).',
        msgImageWidthLarge: 'Kuvan "{name}" leveys ei voi ylitt&auml;&auml; <b>{size} px</b> (nyt <b>{dimension} px</b>).',
        msgImageHeightLarge: 'Kuvan "{name}" korkeus ei voi ylitt&auml;&auml; <b>{size} px</b> (nyt <b>{dimension} px</b>).',
        msgImageResizeError: 'Kuvan pikselikokoa ei voitu m&auml;&auml;ritt&auml;&auml;',
        msgImageResizeException: 'Virhe muutettaessa kokoa.<pre>{errors}</pre>',
        msgAjaxError: 'Ajax-pyynt&ouml; {operation} ep&auml;onnistui. Ole hyv&auml; ja yrit&auml; uudelleen!',
        msgAjaxProgressError: '{operation} ep&auml;onnistui',
        msgDuplicateFile: 'Tiedosto "{name}" t&auml;sm&auml;&auml;v&auml;ss&auml; koossa "{size}" on jo valittu. Ohitetaan kaksoiskappale.',
        msgResumableUploadRetriesExceeded:  'Siirto peruutettiin <b>{max}</b> yrityksen j&auml;lkeen tiedostolle <b>{file}</b>! Virhetiedot: <pre>{error}</pre>',
        msgPendingTime: '{time} j&auml;ljell&auml;',
        msgCalculatingTime: 'lasketaan j&auml;ljell&auml; olevaa aikaa',
        ajaxOperations: {
            deleteThumb: 'tiedoston poisto',
            uploadThumb: 'tiedoston siirto',
            uploadBatch: 'tiedostojoukon siirto',
            uploadExtra: 'lomakedatan siirto'
        },
        dropZoneTitle: 'Raahaa ja pudota tiedostot t&auml;h&auml;n &hellip;',
        dropZoneClickTitle: '<br>(tai valitse hiirell&auml; {files})',
        fileActionSettings: {
            removeTitle: 'Poista tiedosto',
            uploadTitle: 'Siirr&auml; tiedosto',
            uploadRetryTitle: 'Yrit&auml; siirtoa uudelleen',
            downloadTitle: 'Lataa tiedosto',
            rotateTitle: 'K&auml;&auml;nn&auml; 90 astetta my&ouml;t&auml;p&auml;iv&auml;&auml;n',
            zoomTitle: 'Yksityiskohdat',
            dragTitle: 'Siirr&auml; / J&auml;rjestele',
            indicatorNewTitle: 'Ei ladattu',
            indicatorSuccessTitle: 'Ladattu',
            indicatorErrorTitle: 'Lataus ep&auml;onnistui',
            indicatorPausedTitle: 'Siirto tauolla',
            indicatorLoadingTitle:  'Ladataan &hellip;'
        },
        previewZoomButtonTitles: {
            prev: 'Seuraava tiedosto',
            next: 'Edellinen tiedosto',
            rotate: 'K&auml;&auml;nn&auml; 90 astetta my&ouml;t&auml;p&auml;iv&auml;&auml;n',
            toggleheader: 'N&auml;yt&auml; otsikko',
            fullscreen: 'Koko ruudun tila',
            borderless: 'Rajaton tila',
            close: 'Sulje esikatselu'
        }
    };
}));
