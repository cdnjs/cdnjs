/*!
 * This is a i18n.locale language object.
 *
 * Czech
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

    if (exports.cs === undefined) {
        exports.cs = {
            "mejs.plural-form": 8,

            // me-shim
            "mejs.download-file": "Stáhnout soubor",

            // mep-feature-contextmenu
            "mejs.fullscreen-off": "Vypnout režim celá obrazovka",
            "mejs.fullscreen-on": "Na celou obrazovku",
            "mejs.download-video": "Stáhnout video",

            // mep-feature-fullscreen
            "mejs.fullscreen": "Celá obrazovka",

            // mep-feature-jumpforward
            //"mejs.time-jump-forward": "Jump forward %1 second(s)",

            // mep-feature-playpause
            "mejs.play": "Přehrát",
            "mejs.pause": "Pozastavit",

            // mep-feature-postroll
            "mejs.close": "Zavřít",

            // mep-feature-progress
            "mejs.time-slider": "Posuvný běžec nastavení času",
            "mejs.time-help-text": "Použijte tlačítka se šipkami doleva / doprava pro posun o jednu vteřinu, tlačítka se šipkami nahoru / dolů pro posun o deset vteřin.",

            // mep-feature-skipback
            "mejs.time-skip-back": "Zpět o %1 vteřin",

            // mep-feature-tracks
            "mejs.captions-subtitles": "Titulky",
            "mejs.none": "Žádný",

            // mep-feature-volume
            "mejs.mute-toggle": "Vypnout/zapnout zvuk",
            "mejs.volume-help-text": "Použijte tlačítka se šipkami nahoru / dolů pro zesílení nebo zeslabení hlasitosti.",
            "mejs.unmute": "Zapnout zvuk",
            "mejs.mute": "Vypnout zvuk",
            "mejs.volume-slider": "Posuvný běžec nastavení hlasitosti",

            // mep-player
            "mejs.video-player": "Přehrávač videa",
            "mejs.audio-player": "Přehrávač hudby",

            // mep-feature-ads
            //"mejs.ad-skip": "Skip ad",
            //"mejs.ad-skip-info": "Skip in %1 second(s)",

            // mep-feature-sourcechooser
            //"mejs.source-chooser": "Source Chooser"
        };
    }
}(mejs.i18n.locale.strings));
