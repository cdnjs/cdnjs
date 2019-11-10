this.just = this.just || {};
(function (exports) {
'use strict';

var isInitialized;
var scrubberControl;
var scrubberValue;
var play;
var pause;
var reverse;
var timeline;
var controlTemplate = "<div id=\"ja-controls\">\n   <div id=\"ja-play\">\n      <svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\">\n         <path d=\"M3 22v-20l18 10-18 10z\"/>\n      </svg>\n   </div>\n   <div id=\"ja-pause\">\n      <svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\">\n         <path d=\"M11 22h-4v-20h4v20zm6-20h-4v20h4v-20z\"/>\n      </svg>\n   </div>\n   <div id=\"ja-reverse\">\n      <svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\">\n         <path d=\"M6 13v4l-6-5 6-5v4h3v2h-3zm9-2v2h3v4l6-5-6-5v4h-3zm-4-6v14h2v-14h-2z\"/>\n      </svg>\n   </div>\n   <input id=\"ja-scrubber\" type=\"range\" min=\"0\" step=\"1\" max=\"1000\" value=\"0\" />\n   <input id=\"ja-seek\" type=\"number\" placeholder=\"0ms\" />\n   <button data-ja-rate value=\".1\">10%</button>\n   <button data-ja-rate value=\".5\">50%</button>\n   <button data-ja-rate value=\"1\" class=\"active\">100%</button>\n</div>";
var stylesTemplate = "<style style=\"display:none\">\n#ja-controls { \n   position: fixed;\n   bottom: 10px;\n   right: 10px;\n   background-color: rgba(0, 0, 0, .8);\n   border: solid thin rgba(255, 255, 255, .4);\n   border-radius: 5px;\n   padding: 0;\n}\n\n#ja-controls > * { \n   vertical-align: middle;\n   display: inline-block;\n   padding: 5px 8px;\n}\n\n#ja-controls * { \n   font-family: Arial;\n   font-size: 12pt;\n   color: white; \n}\n\n#ja-controls > button[data-ja-rate] { \n   font-size: .8em;\n}\n\nbutton[data-ja-rate] {\n   background: none;\n   border: solid thin rgb(175, 173, 173);\n   border-radius: 4px;\n   cursor: pointer;\n}\n\nbutton[data-ja-rate]:hover {\n   background-color: black;\n}\n\nbutton[data-ja-rate].active {\n   background-color: rgb(101, 101, 101); \n}\n\n#ja-controls path {\n    fill: currentColor;\n}\n\n#ja-play, #ja-pause, #ja-reverse {\n   height: 1em;\n   width: 1em;\n   cursor: pointer;\n}\n\n#ja-seek {\n   width: 50px;\n   text-align: right; \n   font-size: .8em;\n   color: white;\n   background-color: transparent;\n   border: none;\n}\n</style>";
function id(identifier) {
    return document.getElementById(identifier);
}
function on(element, event, listener) {
    element.addEventListener(event, listener);
}
function onValueChanged(value) {
    scrubberValue.value = Math.floor(value) + '';
}
function updateScrubber(time) {
    var value = Math.round(+time);
    scrubberControl.value = String(value);
    onValueChanged(value);
}
function init() {
    var $wrapper = document.createElement('div');
    $wrapper.id = 'ja-controls';
    $wrapper.innerHTML = stylesTemplate + controlTemplate;
    document.body.appendChild($wrapper);
    scrubberControl = id('ja-scrubber');
    scrubberValue = id('ja-seek');
    play = id('ja-play');
    pause = id('ja-pause');
    reverse = id('ja-reverse');
    scrubberValue.value = '0';
    on(scrubberControl, 'input', function (evt) {
        var value = +evt.currentTarget.value;
        timeline.currentTime = value;
        onValueChanged(value);
    });
    on(scrubberValue, 'input', function (evt) {
        var value = +evt.currentTarget.value;
        timeline.currentTime = value;
        onValueChanged(value);
    });
    on(play, 'click', function () {
        if (timeline) {
            timeline.play();
        }
    });
    on(pause, 'click', function () {
        if (timeline) {
            timeline.pause();
        }
    });
    on(reverse, 'click', function () {
        if (timeline) {
            timeline.reverse();
        }
    });
    var rates = [].slice.call(document.querySelectorAll('#ja-controls [data-ja-rate]'));
    rates.forEach(function (rate) {
        on(rate, 'click', function () {
            rates.forEach(function (rate2) { return rate2.classList.remove('active'); });
            rate.classList.add('active');
            if (timeline) {
                var sign = timeline.playbackRate < 0 ? -1 : 1;
                console.log(sign);
                timeline.playbackRate = (+rate.value) * sign;
            }
        });
    });
}
function player(timeline2) {
    if (!isInitialized) {
        init();
        isInitialized = true;
    }
    if (timeline) {
        timeline.off('update', updateScrubber);
    }
    scrubberControl.setAttribute('max', String(timeline2.duration));
    scrubberControl.value = String(timeline2.currentTime);
    timeline2.on('update', updateScrubber);
    timeline = timeline2;
}

exports.player = player;

}((this.just.tools = this.just.tools || {})));
