/*!
 * This is a i18n.locale language object.
 *
 * Italian
 *
 * @author
 *   Jalios (Twitter: @Jalios)
 *   Sascha "SoftCreatR" Greuel
 *
 * @see
 *   me-i18n.js
 *
 * @params
 *  - exports - CommonJS, window ..
 */
(function (exports) {
    "use strict";

    if (exports.it === undefined) {
        exports.it = {
            "mejs.plural-form": 1,

            // me-shim
            "mejs.download-file": "Scaricare il file",

            // mep-feature-contextmenu
            "mejs.fullscreen-off": "Disattivare lo schermo intero",
            "mejs.fullscreen-on": "Attivare lo schermo intero",
            "mejs.download-video": "Scaricare il video",

             // mep-feature-fullscreen
            "mejs.fullscreen": "Schermo intero",

            // mep-feature-jumpforward
            //"mejs.time-jump-forward": "Jump forward %1 second(s)",

            // mep-feature-playpause
            "mejs.play": "Eseguire",
            "mejs.pause": "Pausa",

            // mep-feature-postroll
            "mejs.close": "Chiudere",

            // mep-feature-progress
            "mejs.time-slider": "Barra di scorrimento",
            "mejs.time-help-text": "Utilizzare i tasti Freccia sinistra/Freccia destra per avanzare di un secondo, Freccia Su/Giù per avanzare dieci secondi.",

            // mep-feature-skipback
            "mejs.time-skip-back": "Riavvolgere %1 secondi",

            // mep-feature-tracks
            "mejs.captions-subtitles": "Acquisizioni/sottotitoli",
            "mejs.none": "Nessuno",

            // mep-feature-volume
            "mejs.mute-toggle": "Toggle muto",
            "mejs.volume-help-text": "Utilizzare i tasti Freccia Su/Giù per aumentare o diminuire il volume.",
            "mejs.unmute": "Disattivare muto",
            "mejs.mute": "Muto",
            "mejs.volume-slider": "Barra del volume",

            // mep-player
            "mejs.video-player": "Lettore Video",
            "mejs.audio-player": "Lettore Audio",

            // mep-feature-ads
            //"mejs.ad-skip": "Skip ad",
            //"mejs.ad-skip-info": "Skip in %1 second(s)",

            // mep-feature-sourcechooser
            //"mejs.source-chooser": "Source Chooser"
        };
    }
}(mejs.i18n.locale.strings));
