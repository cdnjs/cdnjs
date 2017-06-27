/*!
 * This is a i18n.locale language object.
 *
 * Spanish
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

    if (exports.es === undefined) {
        exports.es = {
            "mejs.plural-form": 1,

            // me-shim
            "mejs.download-file": "Descargar archivo",

            // mep-feature-contextmenu
            "mejs.fullscreen-off": "Desconectar pantalla completa",
            "mejs.fullscreen-on": "Ir a pantalla completa",
            "mejs.download-video": "Descargar vídeo",

            // mep-feature-fullscreen
            "mejs.fullscreen": "Pantalla completa",

            // mep-feature-jumpforward
            //"mejs.time-jump-forward": "Jump forward %1 second(s)",

            // mep-feature-playpause
            "mejs.play": "Reproducción",
            "mejs.pause": "Pausa",

            // mep-feature-postroll
            "mejs.close": "Cerrar",

            // mep-feature-progress
            "mejs.time-slider": "Control deslizante de tiempo",
            "mejs.time-help-text": "Use las flechas Izquierda/Derecha para avanzar un segundo y las flechas Arriba/Abajo para avanzar diez segundos.",

            // mep-feature-skipback
            "mejs.time-skip-back": ["Rebobinar 1 segundo", "Rebobinar %1 segundos"],

            // mep-feature-tracks
            "mejs.captions-subtitles": "Leyendas/Subtítulos",
            "mejs.none": "Ninguno",

            // mep-feature-volume
            "mejs.mute-toggle": "Alternar silencio",
            "mejs.volume-help-text": "Use las flechas Arriba/Abajo para subir o bajar el volumen.",
            "mejs.unmute": "Reactivar silencio",
            "mejs.mute": "Silencio",
            "mejs.volume-slider": "Control deslizante de volumen",

            // mep-player
            "mejs.video-player": "Reproductor de video",
            "mejs.audio-player": "Reproductor de audio",

            // mep-feature-ads
            "mejs.ad-skip": "Saltar publicidad",
            "mejs.ad-skip-info": ["Saltar 1 segundo", "Saltar %1 segundos"],

            // mep-feature-sourcechooser
            "mejs.source-chooser": "Selector de media"
        };
    }
}(mejs.i18n.locale.strings));
