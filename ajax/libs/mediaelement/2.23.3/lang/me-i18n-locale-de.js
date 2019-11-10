/*!
 * This is a i18n.locale language object.
 *
 * German
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

    if (exports.de === undefined) {
        exports.de = {
            "mejs.plural-form": 1,

            // me-shim
            "mejs.download-file": "Datei herunterladen",

            // mep-feature-contextmenu
            "mejs.fullscreen-off": "Vollbildmodus beenden",
            "mejs.fullscreen-on": "Vollbild",
            "mejs.download-video": "Video herunterladen",

            // mep-feature-fullscreen
            "mejs.fullscreen": "Vollbild",

            // mep-feature-jumpforward
            "mejs.time-jump-forward": ["1 Sekunde vorspulen", "%1 Sekunden vorspulen"],

            // mep-feature-playpause
            "mejs.play": "Abspielen",
            "mejs.pause": "Pause",

            // mep-feature-postroll
            "mejs.close": "Schließen",

            // mep-feature-progress
            "mejs.time-slider": "Zeitschieberegler",
            "mejs.time-help-text": "Verwende die Pfeiltaste nach links/rechts, um eine Sekunde zu spulen, hoch/runter um zehn Sekunden zu spulen.",

            // mep-feature-skipback
            "mejs.time-skip-back": ["1 Sekunde zurückspulen", "%1 Sekunden zurückspulen"],

            // mep-feature-tracks
            "mejs.captions-subtitles": "Überschriften/Untertitel",
            "mejs.none": "Keine",

            // mep-feature-volume
            "mejs.mute-toggle": "Stummschaltung umschalten",
            "mejs.volume-help-text": "Verwende die Pfeiltaste nach oben/nach unten um die Lautstärke zu erhöhen oder zu verringern.",
            "mejs.unmute": "Stummschaltung aufheben",
            "mejs.mute": "Stummschalten",
            "mejs.volume-slider": "Lautstärkeregler",

            // mep-player
            "mejs.video-player": "Video-Player",
            "mejs.audio-player": "Audio-Player",

            // mep-feature-ads
            "mejs.ad-skip": "Werbung überspringen",
            "mejs.ad-skip-info": ["Überspringen in 1 Sekunde", "Überspringen in %1 Sekunden"],

            // mep-feature-sourcechooser
            "mejs.source-chooser": "Quellenauswahl"
        };
    }
}(mejs.i18n.locale.strings));
