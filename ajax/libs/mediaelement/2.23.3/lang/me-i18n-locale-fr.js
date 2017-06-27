/*!
 * This is a i18n.locale language object.
 *
 * French
 *
 * @author
 *   Luc Poupard (Twitter: @klohFR)
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

    if (exports.fr === undefined) {
        exports.fr = {
            "mejs.plural-form": 2,

            // me-shim
            "mejs.download-file": "Télécharger le fichier",

            // mep-feature-contextmenu
            "mejs.fullscreen-off": "Quitter le mode plein écran",
            "mejs.fullscreen-on": "Afficher en plein écran",
            "mejs.download-video": "Télécharger la vidéo",

            // mep-feature-fullscreen
            "mejs.fullscreen": "Plein écran",

            // mep-feature-jumpforward
            "mejs.time-jump-forward": "Avancer de %1 secondes",

            // mep-feature-playpause
            "mejs.play": "Lecture",
            "mejs.pause": "Pause",

            // mep-feature-postroll
            "mejs.close": "Fermer",

            // mep-feature-progress
            "mejs.time-slider": "Curseur temporel",
            "mejs.time-help-text": "Utilisez les flèches Gauche/Droite du clavier pour avancer d'une seconde, les flèches Haut/Bas pour avancer de 10 secondes.",

            // mep-feature-skipback
            "mejs.time-skip-back": "Reculer de %1 secondes",

            // mep-feature-tracks
            "mejs.captions-subtitles": "Sous-titres",
            "mejs.none": "Aucun",

            // mep-feature-volume
            "mejs.mute-toggle": "Activer/désactiver le son",
            "mejs.volume-help-text": "Utilisez les flèches Haut/Bas du clavier pour augmenter ou diminuer le volume.",
            "mejs.unmute": "Activer le son",
            "mejs.mute": "Désactiver le son",
            "mejs.volume-slider": "Volume",

            // mep-player
            "mejs.video-player": "Lecteur Vidéo",
            "mejs.audio-player": "Lecteur Audio",

            // mep-feature-ads
            "mejs.ad-skip": "Passer la publicité",
            "mejs.ad-skip-info": "Passer la publicité dans %1 secondes",

            // mep-feature-sourcechooser
            "mejs.source-chooser": "Sélecteur de média"
        };
    }
}(mejs.i18n.locale.strings));
