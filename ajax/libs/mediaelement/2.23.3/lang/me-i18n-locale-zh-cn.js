/*!
 * This is a i18n.locale language object.
 *
 * Chinese (Simplified)
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

    if (exports["zh-CN"] === undefined) {
        exports["zh-CN"] = {
            "mejs.plural-form": 0,

            // me-shim
            "mejs.download-file": "下载文件",

            // mep-feature-contextmenu
            "mejs.fullscreen-off": "关闭全屏",
            "mejs.fullscreen-on": "转向全屏",
            "mejs.download-video": "下载视频",

            // mep-feature-fullscreen
            "mejs.fullscreen": "全屏",

            // mep-feature-jumpforward
            //"mejs.time-jump-forward": "Jump forward %1 second(s)",

            // mep-feature-playpause
            "mejs.play": "播放",
            "mejs.pause": "暂停",

            // mep-feature-postroll
            "mejs.close": "关闭",

            // mep-feature-progress
            "mejs.time-slider": "时间滑动棒",
            "mejs.time-help-text": "使用作/右箭头快进1秒，使用上/下箭头快进10秒。",

            // mep-feature-skipback
            "mejs.time-skip-back": "后退%1秒",

            // mep-feature-tracks
            "mejs.captions-subtitles": "字幕/标题",
            "mejs.none": "无",

            // mep-feature-volume
            "mejs.mute-toggle": "静音切换",
            "mejs.volume-help-text": "使用上/下箭头提高或降低音量。",
            "mejs.unmute": "取消静音",
            "mejs.mute": "静音",
            "mejs.volume-slider": "音量选择键",

            // mep-player
            "mejs.video-player": "视频播放器",
            "mejs.audio-player": "音频播放器",

            // mep-feature-ads
            //"mejs.ad-skip": "Skip ad",
            //"mejs.ad-skip-info": "Skip in %1 second(s)",

            // mep-feature-sourcechooser
            //"mejs.source-chooser": "Source Chooser"
        };
    }
}(mejs.i18n.locale.strings));
