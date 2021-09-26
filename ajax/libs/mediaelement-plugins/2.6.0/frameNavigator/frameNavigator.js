/*!
 * MediaElement.js
 * http://www.mediaelementjs.com/
 *
 * Wrapper that mimics native HTML5 MediaElement (audio and video)
 * using a variety of technologies (pure JavaScript, Flash, iframe)
 *
 * Copyright 2010-2017, John Dyer (http://j.hn/)
 * License: MIT
 *
 *//*!
 * MediaElement.js
 * http://www.mediaelementjs.com/
 *
 * Wrapper that mimics native HTML5 MediaElement (audio and video)
 * using a variety of technologies (pure JavaScript, Flash, iframe)
 *
 * Copyright 2010-2017, John Dyer (http://j.hn/)
 * License: MIT
 *
 *//*!
 * MediaElement.js
 * http://www.mediaelementjs.com/
 *
 * Wrapper that mimics native HTML5 MediaElement (audio and video)
 * using a variety of technologies (pure JavaScript, Flash, iframe)
 *
 * Copyright 2010-2017, John Dyer (http://j.hn/)
 * License: MIT
 *
 *//*!
 * MediaElement.js
 * http://www.mediaelementjs.com/
 *
 * Wrapper that mimics native HTML5 MediaElement (audio and video)
 * using a variety of technologies (pure JavaScript, Flash, iframe)
 *
 * Copyright 2010-2017, John Dyer (http://j.hn/)
 * License: MIT
 *
 */(function e(t, n, r) { function s(o, u) { if (!n[o]) { if (!t[o]) { var a = typeof require == "function" && require; if (!u && a) return a(o, !0); if (i) return i(o, !0); var f = new Error("Cannot find module '" + o + "'"); throw f.code = "MODULE_NOT_FOUND", f } var l = n[o] = { exports: {} }; t[o][0].call(l.exports, function (e) { var n = t[o][1][e]; return s(n ? n : e) }, l, l.exports, e, t, n, r) } return n[o].exports } var i = typeof require == "function" && require; for (var o = 0; o < r.length; o++)s(r[o]); return s })({
    1: [function (_dereq_, module, exports) {
        "use strict";

        /**
         * Frame Navigation
         *
         * This feature allows for frame by frame navigation and creates a button to select video fps and step through frames.
         */

        // Translations (English required)

        mejs.i18n.en["mejs.frame-rate"] = "Media frame rate (select according to your video source)";
        mejs.i18n.en["mejs.step-fwd"] = "Step forward";
        mejs.i18n.en["mejs.step-back"] = "Step back";

        // Feature configuration
        Object.assign(mejs.MepDefaults, {
            /**
              * The FPS media can be
              *
              * Supports an array of float values
              * @type {Object[]}
              */
            frameRates: [30, 60],
            /**
              * @type {Number}
              */
            fps: null,
            /**
              * @type {Number}
              */
            defaultFps: 30,
            /**
              * @type {String}
              */
            fpsLabel: "FPS"
        });

        Object.assign(MediaElementPlayer.prototype, {
            /**
          * Feature constructor.
          *
          * Always has to be prefixed with `build` and the name that will be used in MepDefaults.features list
          * @param {MediaElementPlayer} player
          * @param {HTMLElement} controls
          * @param {HTMLElement} layers
          * @param {HTMLElement} media
          */
            buildframeNavigator: function frameNavigator(player, controls, layers, media) {
                var t = this,
                    isVideo = (player && player.isVideo);

                if (!isVideo) {
                    return;
                }



                var frameRates = [],
                    fpsTitle = mejs.i18n.t('mejs.frame-rate'),
                    getFrameRateNameFromValue = function getFrameRateNameFromValue(value) {
                        for (var i = 0, total = frameRates.length; i < total; i++) {
                            if (frameRates[i].value === value) {
                                return frameRates[i].name;
                            }
                        }
                    },
                    step = function step(action) {
                        var interval = 1 / t.options.fps
                        var duration = !isNaN(media.duration) ? media.duration : interval;
                        if (duration) {
                            var current = media.currentTime === Infinity ? 0 : media.currentTime;
                            var newTime = action === 'back' ? current - interval : current + interval;
                            if (!media.paused) {
                                media.pause();
                            }
                            media.setCurrentTime(Math.min(newTime, duration));
                        }
                    },

                    fwdTitle = mejs.i18n.t('mejs.step-fwd'),
                    fwdButton = document.createElement('div'),

                    backTitle = mejs.i18n.t('mejs.step-back'),
                    backButton = document.createElement('div');

                backButton.className = t.options.classPrefix + "button " + t.options.classPrefix + "skip-back-button";
                backButton.innerHTML = '<button type="button" aria-controls="' + t.id + '" title="' + backTitle + '" aria-label="' + backTitle + '" tabindex="0"></button>';

                backButton.addEventListener('click', function () {
                    step("back");
                });

                fwdButton.className = t.options.classPrefix + "button " + t.options.classPrefix + "jump-forward-button";
                fwdButton.innerHTML = '<button type="button" aria-controls="' + t.id + '" title="' + fwdTitle + '" aria-label="' + fwdTitle + '" tabindex="0"></button>';

                fwdButton.addEventListener('click', function () {
                    step("fwd");
                });

                var fps = void 0,
                    defaultInArray = false;

                for (var i = 0, total = t.options.frameRates.length; i < total; i++) {
                    var frameRate = t.options.frameRates[i];

                    if (typeof frameRate === 'number') {
                        frameRates.push({
                            name: "" + frameRate + t.options.fpsLabel,
                            value: frameRate
                        });

                        if (frameRate === t.options.defaultFps) {
                            defaultInArray = true;
                        }
                    } else {
                        frameRates.push(frameRate);
                        if (frameRate.value === t.options.defaultFps) {
                            defaultInArray = true;
                        }
                    }
                }

                if (!defaultInArray) {
                    frameRates.push({
                        name: t.options.defaultFps + t.options.fpsLabel,
                        value: t.options.defaultFps
                    });
                }

                t.options.fps = t.options.defaultFps;

                frameRates.sort(function (a, b) {
                    return b.value - a.value;
                });

                t.cleanframeNavigator(player);

                player.fpsButton = document.createElement('div');
                player.fpsButton.className = t.options.classPrefix + "button " + t.options.classPrefix + "fps-button";
                player.fpsButton.innerHTML = "<button type=\"button\" aria-controls=\"" + t.id +
                    "\" title=\"" + fpsTitle + "\" " +
                    ("aria-label=\"" + fpsTitle +
                        "\" tabindex=\"0\">" + getFrameRateNameFromValue(t.options.defaultFps) + "</button>") +
                    ("<div class=\"" + t.options.classPrefix + "fps-selector " + t.options.classPrefix + "offscreen\">") +
                    ("<ul class=\"" + t.options.classPrefix + "fps-selector-list\"></ul>") + "</div>";

                t.addControlElement(player.fpsButton, "frameNavigator");
                t.addControlElement(fwdButton, "frameNavigator");
                t.addControlElement(backButton, "frameNavigator");

                for (var j = 0, totalFrameRates = frameRates.length; j < totalFrameRates; j++) {
                    var inputId = t.id + "-fps-" + frameRates[j].value;
                    player.fpsButton.querySelector('ul').innerHTML += "<li class=\"" + t.options.classPrefix + "fps-selector-list-item\">" +
                        ("<span><input class=\"" + t.options.classPrefix + "fps-selector-input\" type=\"radio\" name=\"" + t.id + "_frameNavigator\"") +
                        ("disabled=\"disabled\" value=\"" + frameRates[j].value + "\" id=\"" + inputId + "\"  ") +
                        ((frameRates[j].value === t.options.defaultFps ? ' checked="checked"' : '') + "/></span>") +
                        ("<label for=\"" + inputId + "\" class=\"" + t.options.classPrefix + "fps-selector-label") +
                        ((frameRates[j].value === t.options.defaultFps ? " " + t.options.classPrefix + "fps-selected" : '') + "\">") +
                        (frameRates[j].name + "</label>") + "</li>";
                }

                fps = t.options.defaultFps;

                player.fpsSelector = player.fpsButton.querySelector("." + t.options.classPrefix + "fps-selector");

                var inEvents = ['mouseenter', 'focusin'],
                    outEvents = ['mouseleave', 'focusout'],

                    // Enable inputs after they have been appended to controls to avoid tab and up/down arrow focus issues
                    radios = player.fpsButton.querySelectorAll('input[type="radio"]'),
                    labels = player.fpsButton.querySelectorAll("." + t.options.classPrefix + "fps-selector-label");

                // hover or keyboard focus
                for (var _i2 = 0, _total2 = inEvents.length; _i2 < _total2; _i2++) {
                    player.fpsButton.addEventListener(inEvents[_i2], function () {
                        mejs.Utils.removeClass(player.fpsSelector, t.options.classPrefix + "offscreen");
                        player.fpsSelector.style.height = player.fpsSelector.querySelector('ul').offsetHeight;
                        player.fpsSelector.style.top = -1 * parseFloat(player.fpsSelector.offsetHeight) + "px";
                    });
                }

                for (var _i3 = 0, _total3 = outEvents.length; _i3 < _total3; _i3++) {
                    player.fpsSelector.addEventListener(outEvents[_i3], function () {
                        mejs.Utils.addClass(this, t.options.classPrefix + "offscreen");
                    });
                }

                for (var _i4 = 0, _total4 = radios.length; _i4 < _total4; _i4++) {
                    var radio = radios[_i4];
                    radio.disabled = false;
                    radio.addEventListener('click', function () {
                        var self = this,
                            newFps = parseFloat(self.value);

                        fps = newFps;
                        t.options.fps = parseFloat(newFps);
                        player.fpsButton.querySelector('button').innerHTML = getFrameRateNameFromValue(newFps);
                        var selected = player.fpsButton.querySelectorAll("." + t.options.classPrefix + "fps-selected");
                        for (var _i5 = 0, _total5 = selected.length; _i5 < _total5; _i5++) {
                            mejs.Utils.removeClass(selected[_i5], t.options.classPrefix + "fps-selected");
                        }

                        self.checked = true;
                        var siblings = mejs.Utils.siblings($(self).parent()[0], function (el) {
                            return mejs.Utils.hasClass(el, t.options.classPrefix + "fps-selector-label");
                        });
                        for (var j = 0, _total6 = siblings.length; j < _total6; j++) {
                            mejs.Utils.addClass(siblings[j], t.options.classPrefix + "fps-selected");
                        }
                    });
                }

                for (var _i6 = 0, _total7 = labels.length; _i6 < _total7; _i6++) {
                    labels[_i6].addEventListener('click', function () {
                        var radio = mejs.Utils.siblings(this, function (el) {
                            return el.querySelector('input');
                        })[0],
                            event = mejs.Utils.createEvent('click', radio);
                    });
                }

                //Allow up/down arrow to change the selected radio without changing the volume.
                player.fpsSelector.addEventListener('keydown', function (e) {
                    e.stopPropagation();
                });
            },

            /**
          * Feature destructor.
          *
          * Always has to be prefixed with `clean` and the name that was used in MepDefaults.features list
          * @param {MediaElementPlayer} player
          */
            cleanframeNavigator: function cleanframeNavigator(player) {
                if (player) {
                    if (player.fpsButton) {
                        player.fpsButton.parentNode.removeChild(player.fpsButton);
                    }
                    if (player.fpsSelector) {
                        player.fpsSelector.parentNode.removeChild(player.fpsSelector);
                    }
                    if (player.fwdButton) {
                        player.fwdButton.parentNode.removeChild(player.fwdButton);
                    }
                    if (player.backButton) {
                        player.backButton.parentNode.removeChild(player.backButton);
                    }
                }
            }
        });
    }, {}]
}, {}, [1]);