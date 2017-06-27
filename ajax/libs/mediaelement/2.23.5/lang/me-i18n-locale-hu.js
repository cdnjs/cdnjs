/*!
 * This is a i18n.locale language object.
 *
 * Hungarian
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

    if (exports.hu === undefined) {
        exports.hu = {
            "mejs.plural-form": 1,

            // me-shim
            "mejs.download-file": "Fájl letöltése",

            // mep-feature-contextmenu
            "mejs.fullscreen-off": "Teljes képernyő kikapcsolása",
            "mejs.fullscreen-on": "Átlépés teljes képernyős módra",
            "mejs.download-video": "Videó letöltése",

            // mep-feature-fullscreen
            "mejs.fullscreen": "Teljes képernyő",

            // mep-feature-jumpforward
            //"mejs.time-jump-forward": "Jump forward %1 second(s)",

            // mep-feature-playpause
            "mejs.play": "Lejátszás",
            "mejs.pause": "Szünet",

            // mep-feature-postroll
            "mejs.close": "Bezárás",

            // mep-feature-progress
            "mejs.time-slider": "Idő csúszka",
            "mejs.time-help-text": "Használja a Bal/Jobb nyíl gombokat az egy másodperces léptetéshez, a Fel/Le nyíl gombokat a tíz másodperces léptetéshez.",

            // mep-feature-skipback
            "mejs.time-skip-back": "Ugrás vissza %1 másodperccel",

            // mep-feature-tracks
            "mejs.captions-subtitles": "Képaláírás/Feliratok",
            "mejs.none": "Nincs",

            // mep-feature-volume
            "mejs.mute-toggle": "Némítás kapcsolója",
            "mejs.volume-help-text": "Használja a Fel/Le nyíl gombokat a hangerő növeléséhez vagy csökkentéséhez.",
            "mejs.unmute": "Némítás feloldása",
            "mejs.mute": "Némítás",
            "mejs.volume-slider": "Hangerőcsúszka",

            // mep-player
            "mejs.video-player": "Videolejátszó",
            "mejs.audio-player": "Audiolejátszó",

            // mep-feature-ads
            //"mejs.ad-skip": "Skip ad",
            //"mejs.ad-skip-info": "Skip in %1 second(s)",

            // mep-feature-sourcechooser
            //"mejs.source-chooser": "Source Chooser"
        };
    }
}(mejs.i18n.locale.strings));
