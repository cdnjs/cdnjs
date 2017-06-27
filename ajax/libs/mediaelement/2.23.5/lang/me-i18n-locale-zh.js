/*!
 * This is a i18n.locale language object.
 *
 * Chinese (Traditional)
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

    if (exports.zh === undefined) {
        exports.zh = {
            "mejs.plural-form": 0,

            // me-shim
            "mejs.download-file": "下載文件",

            // mep-feature-contextmenu
            "mejs.fullscreen-off": "關閉全屏",
            "mejs.fullscreen-on": "轉向全屏",
            "mejs.download-video": "下載視頻",

            // mep-feature-fullscreen
            "mejs.fullscreen": "全屏",

            // mep-feature-jumpforward
            //"mejs.time-jump-forward": "Jump forward %1 second(s)",

            // mep-feature-playpause
            "mejs.play": "播放",
            "mejs.pause": "暫停",

            // mep-feature-postroll
            "mejs.close": "關閉",

            // mep-feature-progress
            "mejs.time-slider": "時間滑動棒",
            "mejs.time-help-text": "使用左/右箭頭快進1秒，上/下箭頭快進10秒。",

            // mep-feature-skipback
            "mejs.time-skip-back": "跳躍式迴繞%1秒",

            // mep-feature-tracks
            "mejs.captions-subtitles": "字幕/標題",
            "mejs.none": "沒有",

            // mep-feature-volume
            "mejs.mute-toggle": "靜音切換",
            "mejs.volume-help-text": "使用上/下箭頭提高或降低音量。",
            "mejs.unmute": "取消靜音",
            "mejs.mute": "靜音",
            "mejs.volume-slider": "音量控制鍵",

            // mep-player
            "mejs.video-player": "視頻播放器",
            "mejs.audio-player": "音頻播放器",

            // mep-feature-ads
            //"mejs.ad-skip": "Skip ad",
            //"mejs.ad-skip-info": "Skip in %1 second(s)",

            // mep-feature-sourcechooser
            //"mejs.source-chooser": "Source Chooser"
        };
    }
}(mejs.i18n.locale.strings));
