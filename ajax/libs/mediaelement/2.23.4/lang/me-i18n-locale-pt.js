/*!
 * This is a i18n.locale language object.
 *
 * Portuguese
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

    if (exports.pt === undefined) {
        exports.pt = {
            "mejs.plural-form": 1,

            // me-shim
            "mejs.download-file": "Descarregar o ficheiro",

            // mep-feature-contextmenu
            "mejs.fullscreen-off": "Desligar ecrã completo",
            "mejs.fullscreen-on": "Ir para ecrã completo",
            "mejs.download-video": "Descarregar o vídeo",

            // mep-feature-fullscreen
            "mejs.fullscreen": "Ecrã completo",

            // mep-feature-jumpforward
            //"mejs.time-jump-forward": "Jump forward %1 second(s)",

            // mep-feature-playpause
            "mejs.play": "Reprodução",
            "mejs.pause": "Pausa",

            // mep-feature-postroll
            "mejs.close": "Fechar",

            // mep-feature-progress
            "mejs.time-slider": "Deslizador do tempo",
            "mejs.time-help-text": "Use as teclas das setas para a esquerda/direita para avançar um segundo, e as setas para cima/baixo para avançar dez segundos.",

            // mep-feature-skipback
            "mejs.time-skip-back": "Retroceder %1 segundos",

            // mep-feature-tracks
            "mejs.captions-subtitles": "Legendas",
            "mejs.none": "Nenhum",

            // mep-feature-volume
            "mejs.mute-toggle": "Alternar silêncio",
            "mejs.volume-help-text": "Use as teclas das setas para cima/baixo para aumentar ou diminuir o volume.",
            "mejs.unmute": "Voltar ao som",
            "mejs.mute": "Silêncio",
            "mejs.volume-slider": "Deslizador do volume",

            // mep-player
            "mejs.video-player": "Leitor de vídeo",
            "mejs.audio-player": "Leitor de áudio",

            // mep-feature-ads
            //"mejs.ad-skip": "Skip ad",
            //"mejs.ad-skip-info": "Skip in %1 second(s)",

            // mep-feature-sourcechooser
            //"mejs.source-chooser": "Source Chooser"
        };
    }
}(mejs.i18n.locale.strings));
