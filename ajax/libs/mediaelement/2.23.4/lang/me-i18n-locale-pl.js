/*!
 * This is a i18n.locale language object.
 *
 * Polish
 *
 * @author
 *   Jalios (Twitter: @Jalios)
 *   Sascha Greuel (Twitter: @SoftCreatR)
 *
 * @see
 *   me-i18n.js
 *
 * @params
 *  - exports - CommonJS, window ..
 */
(function (exports) {
    "use strict";

    if (exports.pl === undefined) {
        exports.pl = {
            "mejs.plural-form": 9,

            // me-shim
            "mejs.download-file": "Pobierz plik",

            // mep-feature-contextmenu
            "mejs.fullscreen-off": "Wyłącz pełny ekran",
            "mejs.fullscreen-on": "Przejdź na pełny ekran",
            "mejs.download-video": "Pobierz wideo",

            // mep-feature-fullscreen
            "mejs.fullscreen": "Pełny ekran",

            // mep-feature-jumpforward
            //"mejs.time-jump-forward": "Jump forward %1 second(s)",

            // mep-feature-playpause
            "mejs.play": "Odtwarzaj",
            "mejs.pause": "Wstrzymaj",

            // mep-feature-postroll
            "mejs.close": "Zamknij",

            // mep-feature-progress
            "mejs.time-slider": "Suwak czasu",
            "mejs.time-help-text": "Strzałki w lewo/w prawo powodują przewijanie o sekundę, strzałki w górę/w dół o dziesięć sekund.",

            // mep-feature-skipback
            "mejs.time-skip-back": "Cofnij o %1 sek.",

            // mep-feature-tracks
            "mejs.captions-subtitles": "Podpisy/napisy",
            "mejs.none": "Brak",

            // mep-feature-volume
            "mejs.mute-toggle": "Przełączanie wyciszania",
            "mejs.volume-help-text": "Aby zwiększyć lub zmniejszyć głośność, użyj strzałek w górę/w dół.",
            "mejs.unmute": "Wyłącz wyciszenie",
            "mejs.mute": "Wycisz",
            "mejs.volume-slider": "Suwak głośności",

            // mep-player
            "mejs.video-player": "Odtwarzacz wideo",
            "mejs.audio-player": "Odtwarzacz audio",

            // mep-feature-ads
            //"mejs.ad-skip": "Skip ad",
            //"mejs.ad-skip-info": "Skip in %1 second(s)",

            // mep-feature-sourcechooser
            //"mejs.source-chooser": "Source Chooser"
        };
    }
}(mejs.i18n.locale.strings));
