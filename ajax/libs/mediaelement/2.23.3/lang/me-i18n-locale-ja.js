/*!
 * This is a i18n.locale language object.
 *
 * Japanese
 *
 * @author
 *   Jalios (Twitter: @Jalios)
 *   Sascha "SoftCreatR" Greuel
 *
 * @see
 *   me-i18n.js
 *
 * @params
 *  - exports - CommonJS, window ..
 */
(function (exports) {
    "use strict";

    if (exports.ja === undefined) {
        exports.ja = {
            "mejs.plural-form": 0,

            // me-shim
            "mejs.download-file": "ファイルをダウンロードする",

            // mep-feature-contextmenu
            "mejs.fullscreen-off": "全画面をオフにする",
            "mejs.fullscreen-on": "全画面にする",
            "mejs.download-video": "動画をダウンロードする",

            // mep-feature-fullscreen
            "mejs.fullscreen": "全画面",

            // mep-feature-jumpforward
            //"mejs.time-jump-forward": "Jump forward %1 second(s)",

            // mep-feature-playpause
            "mejs.play": "再生",
            "mejs.pause": "一時停止",

            // mep-feature-postroll
            "mejs.close": "閉じる",

            // mep-feature-progress
            "mejs.time-slider": "タイムスライダー",
            "mejs.time-help-text": "1秒進めるには左/右矢印をキーを、10秒進めるには上/下矢印を使います。",

            // mep-feature-skipback
            "mejs.time-skip-back": "%1秒スキップバックする",

            // mep-feature-tracks
            "mejs.captions-subtitles": "キャプション/字幕",
            "mejs.none": "なし",

            // mep-feature-volume
            "mejs.mute-toggle": "ミュートトグル",
            "mejs.volume-help-text": "音量を上げたり下げたりするには、上/下矢印を使います。",
            "mejs.unmute": "ミュートを解除",
            "mejs.mute": "ミュート",
            "mejs.volume-slider": "音量スライダー",

            // mep-player
            "mejs.video-player": "ビデオプレーヤー",
            "mejs.audio-player": "オーディオプレーヤー",

            // mep-feature-ads
            //"mejs.ad-skip": "Skip ad",
            //"mejs.ad-skip-info": "Skip in %1 second(s)",

            // mep-feature-sourcechooser
            //"mejs.source-chooser": "Source Chooser"
        };
    }
}(mejs.i18n.locale.strings));
