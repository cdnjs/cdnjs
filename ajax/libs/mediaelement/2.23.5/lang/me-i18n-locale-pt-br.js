/*!
 * This is a i18n.locale language object.
 *
 * Brazilian (Portuguese)
 *
 * @author
 *   Armando Meziat (Twitter: @odnamrataizem)
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

    if (exports["pt-BR"] === undefined) {
        exports["pt-BR"] = {
            "mejs.plural-form": 2,

            // me-shim
            "mejs.download-file": "Baixar arquivo",

            // mep-feature-contextmenu
            "mejs.fullscreen-off": "Sair da tela inteira",
            "mejs.fullscreen-on": "Ir para tela inteira",
            "mejs.download-video": "Baixar vídeo",

            // mep-feature-fullscreen
            "mejs.fullscreen": "Tela inteira",

            // mep-feature-jumpforward
            //"mejs.time-jump-forward": "Jump forward %1 second(s)",

            // mep-feature-playpause
            //"mejs.play": "Play",
            //"mejs.pause": "Pause",

            // mep-feature-postroll
            "mejs.close": "Fechar",

            // mep-feature-progress
            //"mejs.time-slider": "Time Slider",
            //"mejs.time-help-text": "Use Left/Right Arrow keys to advance one second, Up/Down arrows to advance ten seconds.",

            // mep-feature-skipback
            //"mejs.time-skip-back": "Skip back %1 second(s)",

            // mep-feature-tracks
            "mejs.captions-subtitles": "Legendas",
            "mejs.none": "Sem legendas",

            // mep-feature-volume
            "mejs.mute-toggle": "Alternar silêncio",
            //"mejs.volume-help-text": "Use Up/Down Arrow keys to increase or decrease volume.",
            "mejs.unmute": "Tirar silêncio",
            "mejs.mute": "Silenciar",
            //"mejs.volume-slider": "Volume Slider",

            // mep-player
            //"mejs.video-player": "Video Player",
            //"mejs.audio-player": "Audio Player",

            // mep-feature-ads
            //"mejs.ad-skip": "Skip ad",
            //"mejs.ad-skip-info": "Skip in %1 second(s)",

            // mep-feature-sourcechooser
            //"mejs.source-chooser": "Source Chooser"
        };
    }
}(mejs.i18n.locale.strings));
