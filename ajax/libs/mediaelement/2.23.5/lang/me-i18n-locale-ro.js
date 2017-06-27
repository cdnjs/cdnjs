/*!
 * This is a i18n.locale language object.
 *
 * Romanian
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

    if (exports.ro === undefined) {
        exports.ro = {
            "mejs.plural-form": 5,

            // me-shim
            "mejs.download-file": "Descarcă fişierul",

            // mep-feature-contextmenu
            "mejs.fullscreen-off": "Opreşte ecranul complet",
            "mejs.fullscreen-on": "Treci la ecran complet",
            "mejs.download-video": "Descarcă fişierul video",

            // mep-feature-fullscreen
            "mejs.fullscreen": "Ecran complet",

            // mep-feature-jumpforward
            //"mejs.time-jump-forward": "Jump forward %1 second(s)",

            // mep-feature-playpause
            "mejs.play": "Redare",
            "mejs.pause": "Pauză",

            // mep-feature-postroll
            "mejs.close": "Închide",

            // mep-feature-progress
            "mejs.time-slider": "Cursor timp",
            "mejs.time-help-text": "Utilizează tastele săgeată Stânga/Dreapta pentru a avansa o secundă şi săgeţile Sus/Jos pentru a avansa zece secunde.",

            // mep-feature-skipback
            "mejs.time-skip-back": "Sari înapoi %1 secunde",

            // mep-feature-tracks
            "mejs.captions-subtitles": "Legende/Subtitrări",
            "mejs.none": "Niciunul",

            // mep-feature-volume
            "mejs.mute-toggle": "Comutare dezactivare sunet",
            "mejs.volume-help-text": "Utilizează tastele de săgeată Sus/Jos pentru a creşte/micşora volumul",
            "mejs.unmute": "Cu sunet",
            "mejs.mute": "Fără sunet",
            "mejs.volume-slider": "Cursor volum",

            // mep-player
            "mejs.video-player": "Player video",
            "mejs.audio-player": "Player audio",

            // mep-feature-ads
            //"mejs.ad-skip": "Skip ad",
            //"mejs.ad-skip-info": "Skip in %1 second(s)",

            // mep-feature-sourcechooser
            //"mejs.source-chooser": "Source Chooser"
        };
    }
}(mejs.i18n.locale.strings));
