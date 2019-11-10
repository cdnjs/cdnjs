/*!
 * This is a i18n.locale language object.
 *
 * Slovak
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

    if (exports.sk === undefined) {
        exports.sk = {
            "mejs.plural-form": 8,

            // me-shim
            "mejs.download-file": "Prevziať súbor",

            // mep-feature-contextmenu
            "mejs.fullscreen-off": "Vypnúť celú obrazovku",
            "mejs.fullscreen-on": "Prejsť na celú obrazovku",
            "mejs.download-video": "Prevziať video",

            // mep-feature-fullscreen
            "mejs.fullscreen": "Celá obrazovka",

            // mep-feature-jumpforward
            //"mejs.time-jump-forward": "Jump forward %1 second(s)",

            // mep-feature-playpause
            "mejs.play": "Prehrať",
            "mejs.pause": "Pozastaviť",

            // mep-feature-postroll
            "mejs.close": "Zavrieť",

            // mep-feature-progress
            "mejs.time-slider": "Posúvač času",
            "mejs.time-help-text": "Klávesmi so šípkou doľava/doprava posuniete o jednu sekundu, šípkami nahor/ nadol posuniete o desať sekúnd.",

            // mep-feature-skipback
            "mejs.time-skip-back": "Preskočiť dozadu o %1 s.",

            // mep-feature-tracks
            "mejs.captions-subtitles": "Skryté titulky/Titulky",
            "mejs.none": "Žiadne",

            // mep-feature-volume
            "mejs.mute-toggle": "Prepínač stlmenia",
            "mejs.volume-help-text": "Klávesmi so šípkou nahor/nadol zvýšite alebo znížite hlasitosť.",
            "mejs.unmute": "Zrušiť stlmenie",
            "mejs.mute": "Stlmiť",
            "mejs.volume-slider": "Posúvač hlasitosti",

            // mep-player
            "mejs.video-player": "Prehrávač videa",
            "mejs.audio-player": "Prehrávač zvuku",

            // mep-feature-ads
            //"mejs.ad-skip": "Skip ad",
            //"mejs.ad-skip-info": "Skip in %1 second(s)",

            // mep-feature-sourcechooser
            //"mejs.source-chooser": "Source Chooser"
        };
    }
}(mejs.i18n.locale.strings));
