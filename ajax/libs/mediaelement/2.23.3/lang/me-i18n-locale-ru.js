/*!
 * This is a i18n.locale language object.
 *
 * Russian
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

    if (exports.ru === undefined) {
        exports.ru = {
            "mejs.plural-form": 7,

            // me-shim
            "mejs.download-file": "Скачать файл",

            // mep-feature-contextmenu
            "mejs.fullscreen-off": "Выключить широкий экран",
            "mejs.fullscreen-on": "Перейти к широкому экрану",
            "mejs.download-video": "Скачать видео",

            // mep-feature-fullscreen
            "mejs.fullscreen": "Широкий экран",

            // mep-feature-jumpforward
            //"mejs.time-jump-forward": "Jump forward %1 second(s)",

            // mep-feature-playpause
            "mejs.play": "Воспроизвести",
            "mejs.pause": "Пауза",

            // mep-feature-postroll
            "mejs.close": "Закрыть",

            // mep-feature-progress
            "mejs.time-slider": "Слайдер времени",
            "mejs.time-help-text": "Используйте Левую/Правую клавиши со стрелками, чтобы продвинуться на одну секунду, клавиши со стрелками Вверх/Вниз, чтобы продвинуться на десять секунд.",

            // mep-feature-skipback
            "mejs.time-skip-back": "Пропустить назад %1 секунд",

            // mep-feature-tracks
            "mejs.captions-subtitles": "Титры/Субтитры",
            "mejs.none": "Нет",

            // mep-feature-volume
            "mejs.mute-toggle": "Без звука",
            "mejs.volume-help-text": "Используйте клавиши со стрелками Вверх/Вниз, чтобы увеличить или уменьшить громкость.",
            "mejs.unmute": "Отменить выключение звука",
            "mejs.mute": "Отключить звук",
            "mejs.volume-slider": "Слайдер громкости",

            // mep-player
            "mejs.video-player": "Видеоплеер",
            "mejs.audio-player": "Аудиоплеер",

            // mep-feature-ads
            //"mejs.ad-skip": "Skip ad",
            //"mejs.ad-skip-info": "Skip in %1 second(s)",

            // mep-feature-sourcechooser
            //"mejs.source-chooser": "Source Chooser"
        };
    }
}(mejs.i18n.locale.strings));
