/*!
 * This is a i18n.locale language object.
 *
 * German
 *
 * @author
 *   Sascha "SoftCreatR" Greuel
 *
 * @see
 *   me-i18n.js
 *
 * @params
 *  - exports - CommonJS, window ..
 */
;(function(exports, undefined) {

    "use strict";

    if (typeof exports.de === 'undefined') {
        exports.de = {
            // me-shim
            'mejs.download-file': 'Datei herunterladen',

            // mep-feature-contextmenu
            'mejs.fullscreen-off': 'Vollbildmodus beenden',
            'mejs.fullscreen-on' : 'Vollbild',
            'mejs.download-video' : 'Video herunterladen',

            // mep-feature-fullscreen
            'mejs.fullscreen' : 'Vollbild',

            // mep-feature-jumpforward
            'mejs.time-jump-forward': '%1 Sekunde(n) vorspulen',

            // mep-feature-playpause
            'mejs.play': 'Abspielen',
            'mejs.pause': 'Pause',

            // mep-feature-postroll
            'mejs.close' : 'Schließen',

            // mep-feature-progress
            'mejs.time-slider': 'Zeitschieberegler',
            'mejs.time-help-text': 'Verwende die Pfeiltaste nach links/rechts, um eine Sekunde zu spulen, hoch/runter um zehn Sekunden zu spulen.',

            // mep-feature-skipback
            'mejs.time-skip-back': '%1 Sekunde(n) zurückspulen',

            // mep-feature-tracks
            'mejs.captions-subtitles' : 'Überschriften/Untertitel',
            'mejs.none' : 'Keine',

            // mep-feature-volume
            'mejs.mute-toggle' : 'Stummschaltung umschalten',
            'mejs.volume-help-text': 'Verwende die Pfeiltaste nach oben/nach unten um die Lautstärke zu erhöhen oder zu verringern.',
            'mejs.unmute' : 'Stummschaltung aufheben',
            'mejs.mute' : 'Stummschalten',
            'mejs.volume-slider': 'Lautstärkeregler',

            // mep-player
            'mejs.video-player': 'Video-Player',
            'mejs.audio-player': 'Audio-Player',
            	
            // mep-feature-ads
            'mejs.ad-skip': 'Werbung überspringen',
            'mejs.ad-skip-info': 'Überspringen in %1 Sekunde(n)',
        };
    }

}(mejs.i18n.locale.strings));
