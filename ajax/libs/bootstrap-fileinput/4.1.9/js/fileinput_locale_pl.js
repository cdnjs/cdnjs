/*!
 * FileInput Polish Translations
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

    $.fn.fileinput.locales.pl = {
        fileSingle: 'plik',
        filePlural: 'pliki',
        browseLabel: 'Przeglądaj &hellip;',
        removeLabel: 'Usuń',
        removeTitle: 'Usuń zaznaczone pliki',
        cancelLabel: 'Przerwij',
        cancelTitle: 'Anuluj wysyłanie',
        uploadLabel: 'Wgraj',
        uploadTitle: 'Wgraj zaznaczone pliki',
        msgSizeTooLarge: 'Plik o nazwie "{name}" (<b>{size} KB</b>) przekroczył maksymalną dopuszczalną wielkość pliku wynoszącą <b>{maxSize} KB</b>. Proszę ponowić próbę wysłania pliku!',
        msgFilesTooLess: 'Musisz wybrać przynajmniej <b>{n}</b> {files} do wgrania. Proszę spróbować jeszcze raz wgrać pliki!',
        msgFilesTooMany: 'Liczba plików wybranych do wgrania w liczbie <b>({n})</b>, przekracza maksymalny dozwolony limit wynoszący <b>{m}</b>. Proszę spróbować ponownie!',
        msgFileNotFound: 'Plik "{name}" nie istnieje!',
        msgFileSecured: 'Ustawienia zabezpieczeń uniemożliwiają odczyt pliku "{name}".',
        msgFileNotReadable: 'Plik "{name}" nie jest plikiem do odczytu.',
        msgFilePreviewAborted: 'Podgląd pliku "{name}" został przerwany.',
        msgFilePreviewError: 'Wystąpił błąd w czasie odczytu pliku "{name}".',
        msgInvalidFileType: 'Nieznny typ pliku "{name}". Tylko następujące rodzaje plików "{types}", są obsługiwane.',
        msgInvalidFileExtension: 'Złe rozszerzenie dla pliku "{name}". Tylko następujące rozszerzenia plików "{extensions}", są obsługiwane.',
        msgValidationError: 'Błąd podczas przesyłania pliku.',
        msgLoading: 'Wczytywanie pliku {index} z {files} &hellip;',
        msgProgress: 'Wczytywanie pliku {index} z {files} - {name} - {percent}% zakończone.',
        msgSelected: '{n} {files} zaznaczonych',
        msgFoldersNotAllowed: 'Metodą przeciągnij i upuść, można przenosić tylko pliki. Pominięto {n} katalogów.',
        dropZoneTitle: 'Przeciągnij i upuść pliki tu &hellip;'
    };

    $.extend($.fn.fileinput.defaults, $.fn.fileinput.locales.pl);
})(window.jQuery);