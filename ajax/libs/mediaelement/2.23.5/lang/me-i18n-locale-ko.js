/*!
 * This is a i18n.locale language object.
 *
 * Korean
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

    if (exports.ko === undefined) {
        exports.ko = {
            "mejs.plural-form": 0,

            // me-shim
            "mejs.download-file": "파일 다운로드",

            // mep-feature-contextmenu
            "mejs.fullscreen-off": "전체화면 해제",
            "mejs.fullscreen-on": "전체화면 가기",
            "mejs.download-video": "비디오 다운로드",

            // mep-feature-fullscreen
            "mejs.fullscreen": "전체화면",

            // mep-feature-jumpforward
            //"mejs.time-jump-forward": "Jump forward %1 second(s)",

            // mep-feature-playpause
            "mejs.play": "작동",
            "mejs.pause": "정지",

            // mep-feature-postroll
            "mejs.close": "종료",

            // mep-feature-progress
            "mejs.time-slider": "시간 슬라이더",
            "mejs.time-help-text": "1초 전진하려면 좌/우측 화살표를 사용하시고 10초 전진하려면 위/아래 화살표를 사용하세요.",

            // mep-feature-skipback
            "mejs.time-skip-back": "1초 % 를 뒤로 건너뛰세요",

            // mep-feature-tracks
            "mejs.captions-subtitles": "캡션/자막",
            "mejs.none": "없음",

            // mep-feature-volume
            "mejs.mute-toggle": "음소거 전환",
            "mejs.volume-help-text": "볼륨을 높이거나 낮추려면 위/아래 화살표를 이용하세요.",
            "mejs.unmute": "음소거 해제",
            "mejs.mute": "말 없는",
            "mejs.volume-slider": "볼륨 슬라이더",

            // mep-player
            "mejs.video-player": "비디오 플레이어",
            "mejs.audio-player": "오디오 플레이어",

            // mep-feature-ads
            //"mejs.ad-skip": "Skip ad",
            //"mejs.ad-skip-info": "Skip in %1 second(s)",

            // mep-feature-sourcechooser
            //"mejs.source-chooser": "Source Chooser"
        };
    }
}(mejs.i18n.locale.strings));
