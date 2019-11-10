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
var pausedForScrubbing = false;
var controlTemplate = "<div id=\"ja-controls\">\n   <div id=\"ja-play\">\n      <svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\">\n         <path d=\"M3 22v-20l18 10-18 10z\"/>\n      </svg>\n   </div>\n   <div id=\"ja-pause\">\n      <svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\">\n         <path d=\"M11 22h-4v-20h4v20zm6-20h-4v20h4v-20z\"/>\n      </svg>\n   </div>\n   <div id=\"ja-reverse\">\n      <svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\">\n         <path d=\"M6 13v4l-6-5 6-5v4h3v2h-3zm9-2v2h3v4l6-5-6-5v4h-3zm-4-6v14h2v-14h-2z\"/>\n      </svg>\n   </div>\n   <input id=\"ja-scrubber\" type=\"range\" min=\"0\" step=\"1\" max=\"1000\" value=\"0\" />\n   <input id=\"ja-seek\" type=\"number\" placeholder=\"0ms\" />\n   <div>\n      <button data-ja-rate value=\".1\">10%</button>\n      <button data-ja-rate value=\".5\">50%</button>\n      <button data-ja-rate value=\"1\" class=\"active\">100%</button>\n   </div>\n</div>";
var colorFillLower = '#2a6495';
var colorFillUpper = '#7AC7C4';
var boxShadow1 = '1px 1px 1px #000000, 0px 0px 1px #0d0d0d';
var thumbHeight = '24px';
var thumbWidth = '4px';
var trackHeight = '4px';
var thumbColor = '#9ba6c0';
var border = '0.2px solid #010101';
var stylesTemplate = "<style style=\"display:none\">\n#ja-controls { \n   position: fixed;\n   bottom: 10px;\n   right: 10px;\n   background-color: rgba(0, 0, 0, .8);\n   border: solid thin rgba(255, 255, 255, .4);\n   border-radius: 5px;\n   padding: 0;\n}\n\n#ja-controls > * { \n   vertical-align: middle;\n   display: inline-block;\n   padding: 2px 5px;\n}\n\n#ja-controls button[data-ja-rate] {\n   background: none;\n   border: solid thin rgb(175, 173, 173);\n   font-size: .8em;\n   border-radius: 4px;\n   cursor: pointer;\n}\n\n#ja-controls button[data-ja-rate]:hover {\n   background-color: black;\n}\n\n#ja-controls button[data-ja-rate].active {\n   background-color: #4f5d7d; \n}\n#ja-controls path {\n    fill: currentColor;\n}\n#ja-play, #ja-pause, #ja-reverse {\n   height: 1em;\n   width: 1em;\n   cursor: pointer;\n}\n#ja-seek {\n   width: 50px;\n   text-align: right; \n   font-size: .8em;\n   color: white;\n   background-color: transparent;\n   border: none;\n   -moz-appearance: textfield;\n} \n\n#ja-seek::-webkit-inner-spin-button, \n#ja-seek::-webkit-outer-spin-button { \n  -webkit-appearance: none; \n  margin: 0; \n}\n\n#ja-controls * { \n   font-family: Arial;\n   font-size: 12pt;\n   color: white; \n}\n#ja-controls > button[data-ja-rate] { \n   font-size: .8em;\n}\n\n#ja-controls > input[type=range] {\n  -webkit-appearance: none;\n  padding: 0;\n  height: 30px;\n  background-color: transparent;\n}\n#ja-controls > input[type=range]:focus {\n  outline: none;\n}\n#ja-controls > input[type=range]::-webkit-slider-runnable-track {\n  width: 100%;\n  height: " + trackHeight + ";\n  cursor: pointer;\n  animate: 0.2s;\n  box-shadow: " + boxShadow1 + ";\n  background: " + colorFillUpper + ";\n  border-radius: 1.3px;\n  border: " + border + ";\n}\n#ja-controls > input[type=range]::-webkit-slider-thumb {\n  box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;\n  border: " + border + ";\n  height: " + thumbHeight + ";\n  width: " + thumbWidth + ";\n  border-radius: 3px;\n  background: " + thumbColor + ";\n  cursor: pointer;\n  -webkit-appearance: none;\n  margin-top: -10px;\n}\n#ja-controls > input[type=range]:focus::-webkit-slider-runnable-track {\n  background: " + colorFillUpper + ";\n}\n#ja-controls > input[type=range]::-moz-range-track {\n  width: 100%;\n  height: " + trackHeight + ";\n  cursor: pointer;\n  animate: 0.2s;\n  box-shadow:  " + boxShadow1 + ";\n  background: " + colorFillUpper + ";\n  border-radius: 1.3px;\n  border: " + border + ";\n}\n#ja-controls > input[type=range]::-moz-range-thumb {\n  box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;\n  border: " + border + ";\n  height: " + thumbHeight + ";\n  width: " + thumbWidth + ";\n  border-radius: 3px;\n  background: " + thumbColor + ";\n  cursor: pointer;\n}\n#ja-controls > input[type=range]::-ms-track {\n  width: 100%;\n  height: " + trackHeight + ";\n  cursor: pointer; \n  background: transparent;\n  border-color: transparent;\n  border-width: 16px 0;\n  color: transparent;\n}\n#ja-controls > input[type=range]::-ms-fill-lower {\n  background: " + colorFillLower + ";\n  border: " + border + ";\n  border-radius: 2.6px;\n  box-shadow: " + boxShadow1 + ";\n}\n#ja-controls > input[type=range]::-ms-fill-upper {\n  background: " + colorFillUpper + ";\n  border: " + border + ";\n  border-radius: 2.6px;\n  box-shadow:  " + boxShadow1 + ";\n}\n#ja-controls > input[type=range]::-ms-thumb {\n  box-shadow: " + boxShadow1 + ";\n  border: " + border + ";\n  height: " + thumbHeight + ";\n  width: " + thumbWidth + ";\n  margin-top: 1px;\n  border-radius: 3px;\n  background: #ffffff;\n  cursor: pointer;\n}\n#ja-controls > input[type=range]:focus::-ms-fill-lower {\n  background: " + colorFillUpper + ";\n}\n#ja-controls > input[type=range]:focus::-ms-fill-upper {\n  background: " + colorFillUpper + ";\n}\n\n</style>";
function id(identifier) {
    return document.getElementById(identifier);
}
function on(element, event, listener) {
    element.addEventListener(event, listener);
}
function onValueChanged(value) {
    value = Math.floor(+value);
    scrubberValue.value = value + '';
    scrubberControl.value = value + '';
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
    var scrubberChanged = function (evt) {
        var value = +evt.currentTarget.value;
        timeline.currentTime = value;
        onValueChanged(value);
    };
    on(scrubberControl, 'input', scrubberChanged);
    on(scrubberControl, 'change', scrubberChanged);
    on(scrubberValue, 'mousedown', function () {
        if (timeline) {
            timeline.pause();
        }
    });
    on(scrubberControl, 'mousedown', function () {
        if (timeline) {
            if (timeline.state === 3) {
                pausedForScrubbing = true;
            }
            timeline.pause();
        }
    });
    on(scrubberControl, 'mouseup', function () {
        if (timeline && pausedForScrubbing) {
            pausedForScrubbing = false;
            timeline.play();
        }
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
                timeline.playbackRate = +rate.value * sign;
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
        timeline.off('update', onValueChanged);
    }
    scrubberControl.setAttribute('max', String(timeline2.duration));
    scrubberControl.value = String(timeline2.currentTime);
    timeline2.on('update', onValueChanged);
    timeline2.on('config', function () {
        scrubberControl.setAttribute('max', String(timeline2.duration));
    });
    timeline = timeline2;
}

exports.player = player;

}((this.just.tools = this.just.tools || {})));
