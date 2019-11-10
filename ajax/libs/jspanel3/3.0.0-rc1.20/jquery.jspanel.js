/* global console, jQuery */
"use strict";
// Object.assign Polyfill - https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Global_Objects/Object/assign - ONLY FOR IE11
if (!Object.assign) {
    Object.defineProperty(Object, 'assign', {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function (target) {
            if (target === undefined || target === null) {
                throw new TypeError('Cannot convert first argument to object');
            }

            var to = Object(target);
            for (var i = 1; i < arguments.length; i++) {
                var nextSource = arguments[i];
                if (nextSource === undefined || nextSource === null) {
                    continue;
                }
                nextSource = Object(nextSource);

                var keysArray = Object.keys(Object(nextSource));
                for (var nextIndex = 0, len = keysArray.length; nextIndex < len; nextIndex++) {
                    var nextKey = keysArray[nextIndex];
                    var desc = Object.getOwnPropertyDescriptor(nextSource, nextKey);
                    if (desc !== undefined && desc.enumerable) {
                        to[nextKey] = nextSource[nextKey];
                    }
                }
            }
            return to;
        }
    });
}
// Array.prototype.find Polyfill - https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Global_Objects/Array/find#Polyfill - ONLY FOR IE11
if (!Array.prototype.find) {
    Array.prototype.find = function(predicate) {
        if (this == null) {
            throw new TypeError('Array.prototype.find called on null or undefined');
        }
        if (typeof predicate !== 'function') {
            throw new TypeError('predicate must be a function');
        }
        var list = Object(this);
        var length = list.length >>> 0;
        var thisArg = arguments[1];
        var value;

        for (var i = 0; i < length; i++) {
            value = list[i];
            if (predicate.call(thisArg, value, i, list)) {
                return value;
            }
        }
        return undefined;
    };
}
// Array.prototype.findIndex Polyfill - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/findIndex#Polyfill - ONLY FOR IE11
if (!Array.prototype.findIndex) {
    Array.prototype.findIndex = function(predicate) {
        if (this === null) {
            throw new TypeError('Array.prototype.findIndex called on null or undefined');
        }
        if (typeof predicate !== 'function') {
            throw new TypeError('predicate must be a function');
        }
        var list = Object(this);
        var length = list.length >>> 0;
        var thisArg = arguments[1];
        var value;

        for (var i = 0; i < length; i++) {
            value = list[i];
            if (predicate.call(thisArg, value, i, list)) {
                return i;
            }
        }
        return -1;
    };
}
// Array.prototype.includes Polyfill - https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Global_Objects/Array/includes#Polyfill - ONLY FOR IE11 & EDGE
if (!Array.prototype.includes) {
    Array.prototype.includes = function(searchElement /*, fromIndex*/ ) {
        var O = Object(this);
        var len = parseInt(O.length) || 0;
        if (len === 0) {
            return false;
        }
        var n = parseInt(arguments[1]) || 0;
        var k;
        if (n >= 0) {
            k = n;
        } else {
            k = len + n;
            if (k < 0) {k = 0;}
        }
        var currentElement;
        while (k < len) {
            currentElement = O[k];
            if (searchElement === currentElement ||
                (searchElement !== searchElement && currentElement !== currentElement)) {
                return true;
            }
            k++;
        }
        return false;
    };
}
// String.prototype.includes Polyfill - https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Global_Objects/String/includes#Polyfill - ONLY FOR IE11
if (!String.prototype.includes) {
    String.prototype.includes = function() {
        return String.prototype.indexOf.apply(this, arguments) !== -1;
    };
}
// String.prototype.endsWith Polyfill - https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Global_Objects/String/endsWith#Polyfill - ONLY FOR IE11
if (!String.prototype.endsWith) {
    String.prototype.endsWith = function(searchString, position) {
        var subjectString = this.toString();
        if (typeof position !== 'number' || !isFinite(position) || Math.floor(position) !== position || position > subjectString.length) {
            position = subjectString.length;
        }
        position -= searchString.length;
        var lastIndex = subjectString.indexOf(searchString, position);
        return lastIndex !== -1 && lastIndex === position;
    };
}

var jsPanel = {
    version: '3.0.0 RC1.20',
    date:    '2016-05-29 18:36',
    id: 0,                  // counter to add to automatically generated id attribute
    ziBase: 100,            // the lowest z-index a jsPanel may have
    zi: 100,                // z-index counter, has initially to be the same as ziBase
    modalcount: 0,          // counter to set modal background and modal jsPanel z-index
    autopositionSpacing: 5, // sets spacing between autopositioned jsPanels
    pbTreshold: 0.556,      // perceived brightness threshold to switch between white or black font color
    lastbeforeclose: false, // used in the handlers to reposition autopositioned panels
    template: `<div class="jsPanel">
                <div class="jsPanel-hdr">
                    <div class="jsPanel-headerbar">
                        <div class="jsPanel-titlebar">
                            <h3 class="jsPanel-title"></h3>
                        </div>
                        <div class="jsPanel-controlbar">
                            <div class="jsPanel-btn jsPanel-btn-smallify"><span class="jsglyph jsglyph-chevron-up"></span></div>
                            <div class="jsPanel-btn jsPanel-btn-smallifyrev"><span class="jsglyph jsglyph-chevron-down"></span></div>
                            <div class="jsPanel-btn jsPanel-btn-minimize"><span class="jsglyph jsglyph-minimize"></span></div>
                            <div class="jsPanel-btn jsPanel-btn-normalize"><span class="jsglyph jsglyph-normalize"></span></div>
                            <div class="jsPanel-btn jsPanel-btn-maximize"><span class="jsglyph jsglyph-maximize"></span></div>
                            <div class="jsPanel-btn jsPanel-btn-close"><span class="jsglyph jsglyph-close"></span></div>
                        </div>
                    </div>
                    <div class="jsPanel-hdr-toolbar"></div>
                </div>
                <div class="jsPanel-content"></div>
                <div class="jsPanel-ftr"></div>
               </div>`,
    replacementTemplate: `<div class="jsPanel-replacement">
                            <div class="jsPanel-hdr">
                                <div class="jsPanel-headerbar">
                                    <div class="jsPanel-titlebar">
                                        <h3 class="jsPanel-title"></h3>
                                    </div>
                                    <div class="jsPanel-controlbar">
                                        <div class="jsPanel-btn jsPanel-btn-normalize"><span class="jsglyph jsglyph-normalize"></span></div>
                                        <div class="jsPanel-btn jsPanel-btn-maximize"><span class="jsglyph jsglyph-maximize"></span></div>
                                        <div class="jsPanel-btn jsPanel-btn-close"><span class="jsglyph jsglyph-close"></span></div>
                                    </div>
                                </div>
                            </div>
                          </div>`,
    themes: ['default', 'primary', 'info', 'success', 'warning', 'danger'],
    tplHeaderOnly: `<div class="jsPanel">
                        <div class="jsPanel-hdr">
                            <div class="jsPanel-headerbar">
                                <div class="jsPanel-titlebar">
                                    <h3 class="jsPanel-title"></h3>
                                </div>
                                <div class="jsPanel-controlbar">
                                    <div class="jsPanel-btn jsPanel-btn-close"><span class="jsglyph jsglyph-close"></span></div>
                                </div>
                            </div>
                            <div class="jsPanel-hdr-toolbar"></div>
                        </div>
                    </div>`,
    tplContentOnly: `<div class="jsPanel">
                        <div class="jsPanel-content jsPanel-content-noheader jsPanel-content-nofooter"></div>
                     </div>`,
    activePanels: {
        list: [],
        getPanel(arg) {
            return typeof arg === 'string' ? document.getElementById(arg).jspanel.noop() : document.getElementById(this.list[arg]).jspanel.noop();
        }
        // example: jsPanel.activePanels.getPanel(0).resize(600,250).reposition().css('background','yellow');
        // or:      jsPanel.activePanels.getPanel('jsPanel-1').resize(600,250).reposition().css('background','yellow');
    },

    position(elmt, options) {
        /*
         elmt:    string selector or element object, default false
         options object {
         my:      string
         at:      string
         of:      string selector, defaults to 'window'
         offsetX: number, %-value, function
         offsetY: number, %-value, function
         modify:  function, default false
         fixed:   boolean, default true (effects only elmt appended to body when positioned relative to window
         autoposition: string, default false, can be one of 'DOWN', 'RIGHT', 'UP', 'LEFT'
         }
         options can also be a shorthandstring like "right-top 10 50 DOWN"

         return value: the positioned element

         NOTES:
         + when positioning an element appended to a parent other than body it's mandatory that the parent element is positioned somehow
         + border width of parent elmt is taken into account when calculating position
         + trying to position an elmt that is appended to some elmt other than body relative to window doesn't have an effect
         + when elmt is NOT appended to 'body' options.of has to be set with something other than 'window'
         */

        let elmtToPosition,
            elmtData,
            option,
            parentElmt,
            leftOffset = 0,
            topOffset = 0,
            newCoords,
            newCoordsLeft,
            newCoordsTop,
            leftArray = ['left-top', 'left-center', 'left-bottom'],
            centerVerticalArray = ['center-top', 'center', 'center-bottom'],
            rightArray = ['right-top', 'right-center', 'right-bottom'],
            topArray = ['left-top', 'center-top', 'right-top'],
            centerHorizontalArray = ['left-center', 'center', 'right-center'],
            bottomArray = ['left-bottom', 'center-bottom', 'right-bottom'],
            optionDefaults = {
                my: 'center',
                at: 'center',
                offsetX: 0,
                offsetY: 0,
                modify: false,
                fixed: 'true'
            };

        // returns computed css style - https://gist.github.com/cms/369133
        function getStyle(el, styleProp) {
            var value, defaultView = el.ownerDocument.defaultView;
            // W3C standard way:
            if (defaultView && defaultView.getComputedStyle) {
                // sanitize property name to css notation (hypen separated words eg. font-Size)
                styleProp = styleProp.replace(/([A-Z])/g, "-$1").toLowerCase();
                return defaultView.getComputedStyle(el, null).getPropertyValue(styleProp);
            } else if (el.currentStyle) { // IE
                // sanitize property name to camelCase
                styleProp = styleProp.replace(/\-(\w)/g, function(str, letter) {
                    return letter.toUpperCase();
                });
                value = el.currentStyle[styleProp];
                // convert other units to pixels on IE
                if (/^\d+(em|pt|%|ex)?$/i.test(value)) {
                    return (function(value) {
                        var oldLeft = el.style.left, oldRsLeft = el.runtimeStyle.left;
                        el.runtimeStyle.left = el.currentStyle.left;
                        el.style.left = value || 0;
                        value = el.style.pixelLeft + "px";
                        el.style.left = oldLeft;
                        el.runtimeStyle.left = oldRsLeft;
                        return value;
                    })(value);
                }
                return value;
            }
        }

        // returns coordinates for a number of standard window positions relative to document
        function getWindowCoords(pos) {

            let coords = {};

            if (leftArray.includes(pos)) {

                coords.left = window.pageXOffset;

            } else if (centerVerticalArray.includes(pos)) {

                coords.left = window.pageXOffset + (document.documentElement.clientWidth/2);

            } else if (rightArray.includes(pos)) {

                coords.left = window.pageXOffset + (document.documentElement.clientWidth);

            } else {

                coords.left = window.pageXOffset;

            }

            if (topArray.includes(pos)) {

                coords.top = window.pageYOffset;

            } else if (centerHorizontalArray.includes(pos)) {

                coords.top = window.pageYOffset + (window.innerHeight/2);

            } else if (bottomArray.includes(pos)) {

                coords.top = window.pageYOffset + (window.innerHeight);

            } else {

                coords.top = window.pageYOffset;

            }

            return coords;

        }

        // returns coordinates for a number of standard element positions relative to document
        function getElmtAgainstCoords(pos) {

            let coords = {},
                elmtAgainstData = getElementData(option.of);

            if (leftArray.includes(pos)) {

                coords.left = elmtAgainstData.left;

            } else if (centerVerticalArray.includes(pos)) {

                coords.left = elmtAgainstData.left + elmtAgainstData.width/2;

            } else if (rightArray.includes(pos)) {

                coords.left = elmtAgainstData.left + elmtAgainstData.width;

            } else {

                coords.left = elmtAgainstData.left;

            }

            if (topArray.includes(pos)) {

                coords.top = elmtAgainstData.top;

            } else if (centerHorizontalArray.includes(pos)) {

                coords.top = elmtAgainstData.top + elmtAgainstData.height/2;

            } else if (bottomArray.includes(pos)) {

                coords.top = elmtAgainstData.top + elmtAgainstData.height;

            } else {

                coords.top = elmtAgainstData.top;

            }

            return coords;

        }

        // returns coordinates for a number of standard positions inside an element with left:0 top:0 as starting point
        function getParentCoords(pos) {

            let coords = {},
                parentElmtData = parentElmt.getBoundingClientRect();

            if (leftArray.includes(pos)) {

                coords.left = 0;

            } else if (centerVerticalArray.includes(pos)) {

                coords.left = parentElmtData.width/2;

            } else if (rightArray.includes(pos)) {

                coords.left = parentElmtData.width;

            } else {

                coords.left = 0;

            }

            if (topArray.includes(pos)) {

                coords.top = 0;

            } else if (centerHorizontalArray.includes(pos)) {

                coords.top = parentElmtData.height/2;

            } else if (bottomArray.includes(pos)) {

                coords.top = parentElmtData.height;

            } else {

                coords.top = 0;

            }

            return coords;

        }

        // returns coordinates for a number of standard positions inside an element with position of element relative to parent as starting point
        function getElementCoords(pos) {

            let coords = {},
                parentData = parentElmt.getBoundingClientRect(),
                againstData = document.querySelector(option.of).getBoundingClientRect(),
                baseLeft = againstData.left - parentData.left,
                baseTop = againstData.top - parentData.top;

            if (leftArray.includes(pos)) {

                coords.left = baseLeft;

            } else if (centerVerticalArray.includes(pos)) {

                coords.left = baseLeft + againstData.width/2;

            } else if (rightArray.includes(pos)) {

                coords.left = baseLeft + againstData.width;

            } else {

                coords.left = baseLeft;

            }

            if (topArray.includes(pos)) {

                coords.top = baseTop;

            } else if (centerHorizontalArray.includes(pos)) {

                coords.top = baseTop + againstData.height/2;

            } else if (bottomArray.includes(pos)) {

                coords.top = baseTop + againstData.height;

            } else {

                coords.top = baseTop;

            }

            return coords;

        }

        // returns some data of argument elt
        function getElementData(elt) {
            // elt: string selector or element reference
            let elData;

            if (elt.jquery) {

                elData = elt[0].getBoundingClientRect();

            } else if (typeof elt === 'string') {

                elData = document.querySelector(elt).getBoundingClientRect();

            } else {

                elData = elt.getBoundingClientRect();

            }

            return {
                width: Math.round(elData.width),                       // width of elt (includes border)
                height: Math.round(elData.height),                     // height of elt (includes border)
                left: Math.round(elData.left + window.pageXOffset),    // left value of elt option.of RELATIVE TO DOCUMENT
                top: Math.round(elData.top + window.pageYOffset)       // top value of elt option.of RELATIVE TO DOCUMENT
            };

        }

        // normalize string shorthand values of config.position
        if (typeof options === 'string') {

            let rxpos = /\b[a-z]{4,6}-{1}[a-z]{3,6}\b/,
                rxautopos = /DOWN|UP|RIGHT|LEFT/,
                rxoffset = /[+-]?\d+\.?\d*%?/g,
                posValue = options.match(rxpos),
                autoposValue = options.match(rxautopos),
                offsetValue = options.match(rxoffset);

            if ($.isArray(posValue)) {

                options = {my: posValue[0], at: posValue[0]};

            } else {

                options = {my: 'center', at: 'center'};

            }

            if ($.isArray(autoposValue)) {

                options.autoposition = autoposValue[0];

            }

            if ($.isArray(offsetValue)) {

                options.offsetX = offsetValue[0];

                if (offsetValue.length === 2) {

                    options.offsetY = offsetValue[1];

                }

            }

        }

        // merge option defaults with passed options
        option = Object.assign(optionDefaults, options);

        if (typeof elmt === 'string') {

            elmtToPosition = document.querySelector(elmt);

        } else if (elmt.jquery) {

            elmtToPosition = elmt[0];

        } else {

            elmtToPosition = elmt;

        }

        parentElmt = elmtToPosition.parentElement;

        // set option.of defaults
        if (!option.of) {

            parentElmt === document.body ? option.of = 'window' : option.of = parentElmt;

        }

        elmtData = getElementData(elmtToPosition);

        // convert strings/%-values of option.offset to useful numbers
        if (typeof option.offsetX === 'string' && option.offsetX.slice(-1) === '%') {

            if (option.of === 'window') {

                option.offsetX = window.innerWidth * (parseInt(option.offsetX, 10)/100);

            } else {

                option.offsetX = parentElmt.clientWidth * (parseInt(option.offsetX, 10)/100);

            }

        } else if (typeof option.offsetX === 'string') {

            option.offsetX = parseFloat(option.offsetX);

        } else if ($.isFunction(option.offsetX)) {

            option.offsetX = parseInt(option.offsetX.call(elmt, elmt));

        }

        if (typeof option.offsetY === 'string' && option.offsetY.slice(-1) === '%') {

            if (option.of === 'window') {

                option.offsetY = window.innerHeight * (parseInt(option.offsetY, 10)/100);

            } else {

                option.offsetY = parentElmt.clientHeight * (parseInt(option.offsetY, 10)/100);

            }

        } else if (typeof option.offsetY === 'string') {

            option.offsetY = parseFloat(option.offsetY);

        } else if ($.isFunction(option.offsetY)) {

            option.offsetY = parseInt(option.offsetY.call(elmt, elmt));

        }

        // calculate horizontal correction of element to position
        let borderLeftCorrection = parseInt(getStyle(parentElmt, 'border-left-width'));

        if (leftArray.includes(option.my)) {

            leftOffset = borderLeftCorrection;

        } else if (centerVerticalArray.includes(option.my)) {

            leftOffset = elmtData.width/2 + borderLeftCorrection;

        } else if (rightArray.includes(option.my)) {

            leftOffset = elmtData.width + borderLeftCorrection;

        }

        // calculate vertical correction of element to position
        let borderTopCorrection = parseInt(getStyle(parentElmt, 'border-top-width'));

        if (topArray.includes(option.my)) {

            topOffset = borderTopCorrection;

        } else if (centerHorizontalArray.includes(option.my)) {

            topOffset = elmtData.height/2 + borderTopCorrection;

        } else if (bottomArray.includes(option.my)) {

            topOffset = elmtData.height + borderTopCorrection;

        }

        // calculate final position values of elmt ...
        if (elmtToPosition.parentElement === document.body) {

            // ... appended to body element ...
            if (option.of === 'window') {

                // ... against window
                let windowCoords = getWindowCoords(option.at);

                if (option.fixed) {

                    newCoordsLeft = windowCoords.left - leftOffset + option.offsetX - window.pageXOffset;
                    newCoordsTop = windowCoords.top - topOffset + option.offsetY - window.pageYOffset;

                } else {

                    newCoordsLeft = windowCoords.left - leftOffset + option.offsetX;
                    newCoordsTop = windowCoords.top - topOffset + option.offsetY;

                }

            } else {
                // ... against other element than window
                let elmtAgainstCoords = getElmtAgainstCoords(option.at);

                // calculate position values for element to position relative to element other than window
                newCoordsLeft = elmtAgainstCoords.left - leftOffset + option.offsetX;
                newCoordsTop = elmtAgainstCoords.top - topOffset + option.offsetY;

            }

        } else {

            let targetCoords, optionOf;

            if (typeof option.of === 'string') {

                optionOf = document.querySelector(option.of);

            } else if (option.of.jquery) {

                optionOf = option.of[0];

            } else {

                optionOf = option.of;

            }

            if (parentElmt === optionOf) {

                // ... appended to other element than body AND positioning against parent!
                targetCoords = getParentCoords(option.at);

                // calculate position values for element with parent other than body
                newCoordsLeft = targetCoords.left - leftOffset + option.offsetX;
                newCoordsTop = targetCoords.top - topOffset + option.offsetY;

            } else {

                // ... appended to other element than body AND positioning against other element than parent!
                targetCoords = getElementCoords(option.at);

                // calculate position values for element
                newCoordsLeft = targetCoords.left - leftOffset + option.offsetX;
                newCoordsTop = targetCoords.top - topOffset + option.offsetY;

            }

        }

        // optionally autoposition elmts
        if (option.autoposition) {

            let newClass, list, allNewClass = [],
                spacing = this.autopositionSpacing;

            // add a class to recognize panels for autoposition
            if (option.my === option.at) {

                newClass = option.my;

            }

            // store option.position.autoposition and more value in data attr
            // needed for reposition function of MutationObserver
            elmtToPosition.setAttribute('data-autoposition', option.autoposition);

            if (!$.isFunction(option.offsetX)) {

                elmtToPosition.setAttribute('data-offsetx', option.offsetX);

            }

            if (!$.isFunction(option.offsetY)) {

                elmtToPosition.setAttribute('data-offsety', option.offsetY);

            }

            elmtToPosition.classList.add(newClass); // IE9 doesn't support classList

            // get all elmts with 'newClass' within parent of elmtToPosition
            list = document.getElementsByClassName(newClass);

            for (let i = 0; i < list.length; i++) {

                if (list[i].parentElement === parentElmt) {

                    allNewClass.push(list[i]);

                }

            }
            /* Although supported by Babel it's not handled in a way most browsers can deal with
             for (i of list) {
                 if (i.parentElement === parentElmt) {
                     allNewClass.push(i);
                 }
             }
             */

            if (option.autoposition === 'DOWN') {

                // collect heights of all elmts to calc new top position
                for(let i = 0; i < allNewClass.length - 1; i++) {

                    newCoordsTop += allNewClass[i].getBoundingClientRect().height + spacing;

                }

            } else if (option.autoposition === 'UP') {

                for(let i = 0; i < allNewClass.length - 1; i++) {

                    newCoordsTop -= allNewClass[i].getBoundingClientRect().height + spacing;

                }

            } else if (option.autoposition === 'RIGHT') {

                // collect widths of all elmts to calc new left position
                for(let i = 0; i < allNewClass.length - 1; i++) {

                    newCoordsLeft += allNewClass[i].getBoundingClientRect().width + spacing;

                }

            } else if (option.autoposition === 'LEFT') {

                for(let i = 0; i < allNewClass.length - 1; i++) {

                    newCoordsLeft -= allNewClass[i].getBoundingClientRect().width + spacing;

                }

            }

        }

        newCoords = {left: newCoordsLeft, top: newCoordsTop};

        if (typeof option.modify === 'function') {

            newCoords = option.modify.call(newCoords, newCoords);
            // inside the function 'this' refers to the object 'newCoords'
            // option.modify is optional. If present has to be a function returning an object with the keys 'left' and 'top'

        }

        // finally position elmt ...
        elmtToPosition.style.position = 'absolute';
        elmtToPosition.style.left = newCoords.left + 'px'; // seems not to work with integers
        elmtToPosition.style.top = newCoords.top + 'px';   // seems not to work with integers

        elmtToPosition.style.opacity = 1;

        // ... and fix position if ...
        if (option.of === 'window' && option.fixed && parentElmt === document.body) {

            elmtToPosition.style.position = 'fixed';

        }

        return elmtToPosition;

    },

    // reposition existing panel
    reposition(panel, position = panel.option.position) {
        // reposition of tooltips is experimental (position.of has to be set when repositioning tooltips)

        if (panel.data('status') !== "minimized") {

            // remove tooltip connector if present
            if ($('.jsPanel-connector', panel).length > 0) {

                $('.jsPanel-connector', panel).remove();

            }

            this.position(panel, position);
            panel.option.position = position;

        }

        return panel;

    },

/* theme specific functions ---------------------------------------------------------------------- */
    addCustomTheme(theme) {

        if (!this.themes.includes(theme)) {this.themes.push(theme);}

    },

    // https://gist.github.com/mjackson/5311256
    hslToRgb(h, s, l){
        // h, s and l must be values between 0 and 1
        var r, g, b;
        if(s === 0){
            r = g = b = l; // achromatic
        }else{
            var hue2rgb = function hue2rgb(p, q, t){
                if(t < 0) {t += 1;}
                if(t > 1) {t -= 1;}
                if(t < 1/6) {return p + (q - p) * 6 * t;}
                if(t < 1/2) {return q;}
                if(t < 2/3) {return p + (q - p) * (2/3 - t) * 6;}
                return p;
            };
            var q = l < 0.5 ? l * (1 + s) : l + s - l * s,
                p = 2 * l - q;
            r = hue2rgb(p, q, h + 1/3);
            g = hue2rgb(p, q, h);
            b = hue2rgb(p, q, h - 1/3);
        }
        return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
    },

    // https://gist.github.com/mjackson/5311256
    rgbToHsl(r, g, b) {
        r /= 255, g /= 255, b /= 255;
        var max = Math.max(r, g, b), min = Math.min(r, g, b),
            h, s, l = (max + min) / 2;
        if (max === min) {
            h = s = 0; // achromatic
        } else {
            var d = max - min;
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

            switch (max) {
                case r: h = (g - b) / d + (g < b ? 6 : 0); break;
                case g: h = (b - r) / d + 2; break;
                case b: h = (r - g) / d + 4; break;
            }
            h /= 6;
        }
        //return [ h, s, l ];
        h = h*360;
        s = s*100+'%';
        l = l*100+'%';
        return {css: 'hsl('+h+','+s+','+l+')', h: h, s: s, l: l};
    },

    rgbToHex(r, g, b) {

        let red,green,blue;

        red = Number(r).toString(16);
        if (red.length === 1) {red = '0'+red;}

        green = Number(g).toString(16);
        if (green.length === 1) {green = '0'+green;}

        blue = Number(b).toString(16);
        if (blue.length === 1) {blue = '0'+blue;}

        return '#'+red+green+blue;

    },

    perceivedBrightness(val) {
        let rgb = this.color(val).rgb;
        // return value is in the range 0 - 1 and input rgb values must also be in the range 0 - 1
        // algorithm from: https://en.wikipedia.org/wiki/Rec._2020
        return ( (rgb.r/255 * 0.2627) + (rgb.g/255 * 0.6780) + (rgb.b/255 * 0.0593) );
    },

    lighten(val, amount) {
        // amount is value between 0 and 1
        let hsl = this.color(val).hsl,
            l = parseFloat(hsl.l),
            lnew = (l + ((100 - l) * amount)) + '%';
        return 'hsl(' + hsl.h + ',' + hsl.s + ',' + lnew + ')';
    },

    darken(val, amount) {
        // amount is value between 0 and 1
        let hsl = this.color(val).hsl,
            l = parseFloat(hsl.l),
            lnew = l - (l * amount) + '%';
        return 'hsl(' + hsl.h + ',' + hsl.s + ',' + lnew + ')';
    },

    color(val) {

        let color = val.toLowerCase(),
            r, g, b, h, s, l, match, channels, hsl, result = {},
            hexPattern  = /^#?([0-9a-f]{3}|[0-9a-f]{6})$/gi, // matches "#123" or "#f05a78" with or without "#"
            RGBAPattern =  /^rgba?\(([0-9]{1,3}),([0-9]{1,3}),([0-9]{1,3}),?(0|1|0\.[0-9]{1,2}|\.[0-9]{1,2})?\)$/gi, // matches rgb/rgba color values, whitespace allowed
            HSLAPattern  = /^hsla?\(([0-9]{1,3}),([0-9]{1,3}\%),([0-9]{1,3}\%),?(0|1|0\.[0-9]{1,2}|\.[0-9]{1,2})?\)$/gi,
            namedColors = {
            aliceblue: 'f0f8ff',
            antiquewhite: 'faebd7',
            aqua: '0ff',
            aquamarine: '7fffd4',
            azure: 'f0ffff',
            beige: 'f5f5dc',
            bisque: 'ffe4c4',
            black: '000',
            blanchedalmond: 'ffebcd',
            blue: '00f',
            blueviolet: '8a2be2',
            brown: 'a52a2a',
            burlywood: 'deb887',
            cadetblue: '5f9ea0',
            chartreuse: '7fff00',
            chocolate: 'd2691e',
            coral: 'ff7f50',
            cornflowerblue: '6495ed',
            cornsilk: 'fff8dc',
            crimson: 'dc143c',
            cyan: '0ff',
            darkblue: '00008b',
            darkcyan: '008b8b',
            darkgoldenrod: 'b8860b',
            darkgray: 'a9a9a9',
            darkgrey: 'a9a9a9',
            darkgreen: '006400',
            darkkhaki: 'bdb76b',
            darkmagenta: '8b008b',
            darkolivegreen: '556b2f',
            darkorange: 'ff8c00',
            darkorchid: '9932cc',
            darkred: '8b0000',
            darksalmon: 'e9967a',
            darkseagreen: '8fbc8f',
            darkslateblue: '483d8b',
            darkslategray: '2f4f4f',
            darkslategrey: '2f4f4f',
            darkturquoise: '00ced1',
            darkviolet: '9400d3',
            deeppink: 'ff1493',
            deepskyblue: '00bfff',
            dimgray: '696969',
            dimgrey: '696969',
            dodgerblue: '1e90ff',
            firebrick: 'b22222',
            floralwhite: 'fffaf0',
            forestgreen: '228b22',
            fuchsia: 'f0f',
            gainsboro: 'dcdcdc',
            ghostwhite: 'f8f8ff',
            gold: 'ffd700',
            goldenrod: 'daa520',
            gray: '808080',
            grey: '808080',
            green: '008000',
            greenyellow: 'adff2f',
            honeydew: 'f0fff0',
            hotpink: 'ff69b4',
            indianred: 'cd5c5c',
            indigo: '4b0082',
            ivory: 'fffff0',
            khaki: 'f0e68c',
            lavender: 'e6e6fa',
            lavenderblush: 'fff0f5',
            lawngreen: '7cfc00',
            lemonchiffon: 'fffacd',
            lightblue: 'add8e6',
            lightcoral: 'f08080',
            lightcyan: 'e0ffff',
            lightgoldenrodyellow: 'fafad2',
            lightgray: 'd3d3d3',
            lightgrey: 'd3d3d3',
            lightgreen: '90ee90',
            lightpink: 'ffb6c1',
            lightsalmon: 'ffa07a',
            lightseagreen: '20b2aa',
            lightskyblue: '87cefa',
            lightslategray: '789',
            lightslategrey: '789',
            lightsteelblue: 'b0c4de',
            lightyellow: 'ffffe0',
            lime: '0f0',
            limegreen: '32cd32',
            linen: 'faf0e6',
            magenta: 'f0f',
            maroon: '800000',
            mediumaquamarine: '66cdaa',
            mediumblue: '0000cd',
            mediumorchid: 'ba55d3',
            mediumpurple: '9370d8',
            mediumseagreen: '3cb371',
            mediumslateblue: '7b68ee',
            mediumspringgreen: '00fa9a',
            mediumturquoise: '48d1cc',
            mediumvioletred: 'c71585',
            midnightblue: '191970',
            mintcream: 'f5fffa',
            mistyrose: 'ffe4e1',
            moccasin: 'ffe4b5',
            navajowhite: 'ffdead',
            navy: '000080',
            oldlace: 'fdf5e6',
            olive: '808000',
            olivedrab: '6b8e23',
            orange: 'ffa500',
            orangered: 'ff4500',
            orchid: 'da70d6',
            palegoldenrod: 'eee8aa',
            palegreen: '98fb98',
            paleturquoise: 'afeeee',
            palevioletred: 'd87093',
            papayawhip: 'ffefd5',
            peachpuff: 'ffdab9',
            peru: 'cd853f',
            pink: 'ffc0cb',
            plum: 'dda0dd',
            powderblue: 'b0e0e6',
            purple: '800080',
            rebeccapurple: '639',
            red: 'f00',
            rosybrown: 'bc8f8f',
            royalblue: '4169e1',
            saddlebrown: '8b4513',
            salmon: 'fa8072',
            sandybrown: 'f4a460',
            seagreen: '2e8b57',
            seashell: 'fff5ee',
            sienna: 'a0522d',
            silver: 'c0c0c0',
            skyblue: '87ceeb',
            slateblue: '6a5acd',
            slategray: '708090',
            slategrey: '708090',
            snow: 'fffafa',
            springgreen: '00ff7f',
            steelblue: '4682b4',
            tan: 'd2b48c',
            teal: '008080',
            thistle: 'd8bfd8',
            tomato: 'ff6347',
            turquoise: '40e0d0',
            violet: 'ee82ee',
            wheat: 'f5deb3',
            white: 'fff',
            whitesmoke: 'f5f5f5',
            yellow: 'ff0',
            yellowgreen: '9acd32'
        };

        // change named color to corresponding hex value
        if (namedColors[color]) {color = namedColors[color];}

        // check val for hex color
        if (color.match(hexPattern) !== null) {

            // '#' entfernen wenn vorhanden
            color = color.replace('#', '');

            // color has either 3 or 6 characters
            if (color.length % 2 === 1 ) {

                // color has 3 char -> convert to 6 char
                r = color.substr(0,1).repeat(2);
                g = color.substr(1,1).repeat(2);
                b = color.substr(2,1).repeat(2);

                result.rgb = {
                    r: parseInt(r, 16),
                    g: parseInt(g, 16),
                    b: parseInt(b, 16)
                };

                result.hex = '#'+r+g+b;

            } else {

                // color has 6 char
                result.rgb = {
                    r: parseInt(color.substr(0,2), 16),
                    g: parseInt(color.substr(2,2), 16),
                    b: parseInt(color.substr(4,2), 16)
                };

                result.hex = '#'+color;

            }

            hsl = this.rgbToHsl(result.rgb.r,result.rgb.g, result.rgb.b);
            result.hsl = hsl;
            result.rgb.css = 'rgb('+result.rgb.r+','+result.rgb.g+','+result.rgb.b+')';

        }
        // check val for rgb/rgba color
        else if (color.match(RGBAPattern)) {

            match = RGBAPattern.exec(color);
            result.rgb = {css: color, r: match[1], g: match[2], b: match[3]};
            result.hex = this.rgbToHex(match[1], match[2], match[3]);
            hsl = this.rgbToHsl(match[1], match[2], match[3]);
            result.hsl = hsl;

        }
        // check val for hsl/hsla color
        else if (color.match(HSLAPattern)) {

            match = HSLAPattern.exec(color);

            h = match[1] / 360;
            s = match[2].substr(0, match[2].length - 1) / 100;
            l = match[3].substr(0, match[3].length - 1) / 100;

            channels = this.hslToRgb(h, s, l);

            result.rgb = {css: 'rgb('+channels[0]+','+channels[1]+','+channels[2]+')', r: channels[0], g: channels[1], b: channels[2]};
            result.hex = this.rgbToHex(result.rgb.r, result.rgb.g, result.rgb.b);
            result.hsl = {css: 'hsl('+match[1]+','+match[2]+','+match[3]+')', h: match[1], s: match[2], l: match[3]};

        }

        // or return #f5f5f5
        else {
            result.hex = '#f5f5f5';
            result.rgb = {css: 'rgb(245,245,245)', r: 245, g: 245, b: 245};
            result.hsl = {css: 'hsl(0,0%,96.08%)', h: 0, s: '0%', l: '96.08%'};
        }

        return result;

    },

    calcColors(primaryColor) {

        let primeColor = this.color(primaryColor),
            secondColor = this.lighten(primaryColor, 0.81),
            thirdColor = this.darken(primaryColor, 0.5),
            fontColorForPrimary, fontColorForSecond, fontColorForThird;

        // calculate perceived brightness
        this.perceivedBrightness(primaryColor) <= this.pbTreshold ? fontColorForPrimary = '#ffffff' : fontColorForPrimary = '#000000';
        this.perceivedBrightness(secondColor) <= this.pbTreshold ? fontColorForSecond = '#ffffff' : fontColorForSecond = '#000000';
        this.perceivedBrightness(thirdColor) <= this.pbTreshold ? fontColorForThird = '#000000' : fontColorForThird = '#ffffff';

        return [primeColor.hsl.css, secondColor, thirdColor, fontColorForPrimary, fontColorForSecond, fontColorForThird];

    },
/* ----------------------------------------------------------------------------------------------- */

/* modal specific functions ---------------------------------------------------------------------- */
    insertModalBackdrop(panel) {
        // inserts an individual modal backdrop for a modal jsPanel
        let backdrop, backdropBG,
            backdropCount = $('.jsPanel-modal-backdrop').length;
        backdropCount === 0 ? backdropBG = 'rgba(0,0,0,0.65)' : backdropBG = 'rgba(0,0,0,0.15)';
        if (panel) {
            backdrop = `<div id="jsPanel-modal-backdrop-${panel.attr('id')}" class="jsPanel-modal-backdrop" style="background:${backdropBG};z-index:${this.modalcount+9999}"></div>`;
        } else {
            backdrop = `<div id="jsPanel-modal-backdrop" class="jsPanel-modal-backdrop" style="background:${backdropBG};z-index:${this.modalcount+9999}"></div>`;
        }
        $('body').append(backdrop);
        this.modalcount += 1;
    },
/* ----------------------------------------------------------------------------------------------- */

/* tooltip specific functions -------------------------------------------------------------------- */
    // adds connector/corner to tooltips
    addConnector(panel) {

        let bgColor = panel.option.paneltype.connectorBG || null,
            bgColor_content = panel.content.css('background-color'),
            bgColor_ftr = panel.footer.css('background-color'),
            bgColor_panel = panel.css('background-color');

        function calcConnectorBgTop (connector) {

            if (connector.match(/top|topleft|topright|lefttopcorner|righttopcorner|leftbottom|rightbottom/)) {

                if (panel.footer.css('display') !== 'none') {

                    return bgColor_ftr;

                } else if (parseFloat(panel.option.contentSize.height) > 0) {

                    return bgColor_content;

                }

                return bgColor_panel;

            }

        }

        function calcConnectorBgBottom (connector) {

            if (connector.match(/bottom|bottomleft|bottomright|leftbottomcorner|rightbottomcorner/)) {

                if (!panel.option.headerRemove) {return bgColor_panel;}

                if (parseFloat(panel.option.contentSize.height) > 0) {return bgColor_content;}

                if (panel.footer.css('display') !== 'none') {return bgColor_ftr;}

            }

        }

        function calcConnectorBgLeftRightTop (connector) {

            if (connector.match(/lefttop|righttop/)) {

                if (!panel.option.headerRemove) {return bgColor_panel;}

                return bgColor_content;

            }

        }

        function calcConnectorBgLeftRight (connector) {

            if (connector.match(/left|right/)) {

                if (parseFloat(panel.option.contentSize.height) > 0) {return bgColor_content;}

                if (!panel.option.headerRemove) {return bgColor_panel;}

                if (panel.footer.css('display') !== 'none') {return bgColor_ftr;}

            }

        }

        if (panel.hasClass('jsPanel-tooltip-top')) {
            panel.append("<div class='jsPanel-connector jsPanel-connector-top'>");
            $('.jsPanel-connector-top', panel).css('border-top-color', bgColor || calcConnectorBgTop('top'));
            panel.option.position.offsetY = panel.option.position.offsetY - 10 || -10;

        } else if (panel.hasClass('jsPanel-tooltip-bottom')) {
            panel.append("<div class='jsPanel-connector jsPanel-connector-bottom'>");
            $('.jsPanel-connector-bottom', panel).css('border-bottom-color', bgColor || calcConnectorBgBottom('bottom'));
            panel.option.position.offsetY = panel.option.position.offsetY + 10 || 10;

        } else if (panel.hasClass('jsPanel-tooltip-left')) {
            panel.append("<div class='jsPanel-connector jsPanel-connector-left'>");
            $('.jsPanel-connector-left', panel).css('border-left-color', bgColor || calcConnectorBgLeftRight('left'));
            panel.option.position.offsetX = panel.option.position.offsetX - 12 || -12;

        } else if (panel.hasClass('jsPanel-tooltip-right')) {
            panel.append("<div class='jsPanel-connector jsPanel-connector-right'>");
            $('.jsPanel-connector-right', panel).css('border-right-color', bgColor || calcConnectorBgLeftRight('right'));
            panel.option.position.offsetX = panel.option.position.offsetX + 12 || 12;

        } else if (panel.hasClass('jsPanel-tooltip-lefttopcorner')) {
            panel.append("<div class='jsPanel-connector jsPanel-connector-lefttopcorner'>");
            $('.jsPanel-connector-lefttopcorner', panel).css('background-color', bgColor || calcConnectorBgTop('lefttopcorner'));

        } else if (panel.hasClass('jsPanel-tooltip-righttopcorner')) {
            panel.append("<div class='jsPanel-connector jsPanel-connector-righttopcorner'>");
            $('.jsPanel-connector-righttopcorner', panel).css('background-color', bgColor || calcConnectorBgTop('righttopcorner'));

        } else if (panel.hasClass('jsPanel-tooltip-rightbottomcorner')) {
            panel.append("<div class='jsPanel-connector jsPanel-connector-rightbottomcorner'>");
            $('.jsPanel-connector-rightbottomcorner', panel).css('background-color', bgColor || calcConnectorBgBottom('rightbottomcorner'));

        } else if (panel.hasClass('jsPanel-tooltip-leftbottomcorner')) {
            panel.append("<div class='jsPanel-connector jsPanel-connector-leftbottomcorner'>");
            $('.jsPanel-connector-leftbottomcorner', panel).css('background-color', bgColor || calcConnectorBgBottom('leftbottomcorner'));

        } else if (panel.hasClass('jsPanel-tooltip-lefttop')) {
            panel.append("<div class='jsPanel-connector jsPanel-connector-lefttop'>");
            $('.jsPanel-connector-lefttop', panel).css('border-left-color', bgColor || calcConnectorBgLeftRightTop('lefttop'));
            panel.option.position.offsetX = panel.option.position.offsetX - 12 || -12;

        } else if (panel.hasClass('jsPanel-tooltip-leftbottom')) {
            panel.append("<div class='jsPanel-connector jsPanel-connector-leftbottom'>");
            $('.jsPanel-connector-leftbottom', panel).css('border-left-color', bgColor || calcConnectorBgTop('leftbottom'));
            panel.option.position.offsetX = panel.option.position.offsetX - 12 || -12;
        } else if (panel.hasClass('jsPanel-tooltip-topleft')) {
            panel.append("<div class='jsPanel-connector jsPanel-connector-topleft'>");
            $('.jsPanel-connector-topleft', panel).css('border-top-color', bgColor || calcConnectorBgTop('topleft'));
            panel.option.position.offsetY = panel.option.position.offsetY - 10 || -10;

        } else if (panel.hasClass('jsPanel-tooltip-topright')) {
            panel.append("<div class='jsPanel-connector jsPanel-connector-topright'>");
            $('.jsPanel-connector-topright', panel).css('border-top-color', bgColor || calcConnectorBgTop('topright'));
            panel.option.position.offsetY = panel.option.position.offsetY - 10 || -10;

        } else if (panel.hasClass('jsPanel-tooltip-righttop')) {
            panel.append("<div class='jsPanel-connector jsPanel-connector-righttop'>");
            $('.jsPanel-connector-righttop', panel).css('border-right-color', bgColor || calcConnectorBgLeftRightTop('righttop'));
            panel.option.position.offsetX = panel.option.position.offsetX + 12 || 12;

        } else if (panel.hasClass('jsPanel-tooltip-rightbottom')) {
            panel.append("<div class='jsPanel-connector jsPanel-connector-rightbottom'>");
            $('.jsPanel-connector-rightbottom', panel).css('border-right-color', bgColor || calcConnectorBgTop('rightbottom'));
            panel.option.position.offsetX = panel.option.position.offsetX + 12 || 12;

        } else if (panel.hasClass('jsPanel-tooltip-bottomleft')) {
            panel.append("<div class='jsPanel-connector jsPanel-connector-bottomleft'>");
            $('.jsPanel-connector-bottomleft', panel).css('border-bottom-color', bgColor || calcConnectorBgBottom('bottomleft'));
            panel.option.position.offsetY = panel.option.position.offsetY + 10 || 10;

        } else if (panel.hasClass('jsPanel-tooltip-bottomright')) {
            panel.append("<div class='jsPanel-connector jsPanel-connector-bottomright'>");
            $('.jsPanel-connector-bottomright', panel).css('border-bottom-color', bgColor || calcConnectorBgBottom('bottomright'));
            panel.option.position.offsetY = panel.option.position.offsetY + 10 || 10;

        }

    },

    // returns elmt reference to elmt triggering the tooltip
    setTrigger(pos) {

        // pos = jsP.option.position.of used as trigger of the tooltip
        if (typeof pos.of === 'string') {

            return document.querySelector(pos.of);

        } else if (pos.of.jquery) {

            return pos.of[0];

        } else {

            return pos.of;

        }

    },

    closeTooltips() {
        $('.jsPanel-tooltip').each( (index, elmt) => {
            if (elmt.jspanel) elmt.jspanel.close();
        });
    },

    // add class depending on position
    setTooltipClass(panel) {

        let pos = panel.option.position;

        if (pos.my === 'center-bottom' && pos.at === 'center-top') {

            panel.addClass('jsPanel-tooltip-top');

        } else if (pos.my === 'left-bottom' && pos.at === 'right-top') {

            panel.addClass('jsPanel-tooltip-righttopcorner');

        } else if (pos.my === 'left-center' && pos.at === 'right-center') {

            panel.addClass('jsPanel-tooltip-right');

        } else if (pos.my === 'left-top' && pos.at === 'right-bottom') {

            panel.addClass('jsPanel-tooltip-rightbottomcorner');

        } else if (pos.my === 'center-top' && pos.at === 'center-bottom') {

            panel.addClass('jsPanel-tooltip-bottom');

        } else if (pos.my === 'right-top' && pos.at === 'left-bottom') {

            panel.addClass('jsPanel-tooltip-leftbottomcorner');

        } else if (pos.my === 'right-center' && pos.at === 'left-center') {

            panel.addClass('jsPanel-tooltip-left');

        } else if (pos.my === 'right-bottom' && pos.at === 'left-top') {

            panel.addClass('jsPanel-tooltip-lefttopcorner');

        } else if (pos.my === 'center' && pos.at === 'center') {

            panel.addClass('jsPanel-tooltip-center');

        } else if (pos.my === 'right-top' && pos.at === 'left-top') {

            panel.addClass('jsPanel-tooltip-lefttop');

        } else if (pos.my === 'right-bottom' && pos.at === 'left-bottom') {

            panel.addClass('jsPanel-tooltip-leftbottom');

        } else if (pos.my === 'left-bottom' && pos.at === 'left-top') {

            panel.addClass('jsPanel-tooltip-topleft');

        } else if (pos.my === 'right-bottom' && pos.at === 'right-top') {

            panel.addClass('jsPanel-tooltip-topright');

        } else if (pos.my === 'left-top' && pos.at === 'right-top') {

            panel.addClass('jsPanel-tooltip-righttop');

        } else if (pos.my === 'left-bottom' && pos.at === 'right-bottom') {

            panel.addClass('jsPanel-tooltip-rightbottom');

        } else if (pos.my === 'left-top' && pos.at === 'left-bottom') {

            panel.addClass('jsPanel-tooltip-bottomleft');

        } else if (pos.my === 'right-top' && pos.at === 'right-bottom') {

            panel.addClass('jsPanel-tooltip-bottomright');

        }

    },

    setTooltipMode(panel, trigger) {

        if (panel.option.paneltype.mode === 'semisticky') {

            panel.hover(

                () => $.noop(),

                () => {
                    panel.close();
                    $(trigger).removeClass('hasTooltip');
                }

            );

        } else if (panel.option.paneltype.mode === 'sticky') {

            // tooltip remains in the DOM until closed manually
            $.noop();

        } else {

            // tooltip will be removed whenever mouse leaves trigger
            $(trigger).mouseout( () => {
                panel.close();
                $(trigger).removeClass('hasTooltip');
            });

        }

    },
/* ----------------------------------------------------------------------------------------------- */

/* content specific functions -------------------------------------------------------------------- */
    // loads content using jQuery.ajax();
    ajax(panel) {

        let oAjax = panel.option.contentAjax;

        $.ajax(oAjax)
            .done( (data, textStatus, jqXHR) => {

                if (oAjax.autoload) {panel.content.append(data);}
                if ($.isFunction(oAjax.done)) {oAjax.done.call(panel, data, textStatus, jqXHR, panel);}

            })
            .fail( (jqXHR, textStatus, errorThrown) => {

                if ($.isFunction(oAjax.fail)) {oAjax.fail.call(panel, jqXHR, textStatus, errorThrown, panel);}

            })
            .always( (arg1, textStatus, arg3) => {

                if ($.isFunction(oAjax.always)) {oAjax.always.call(panel, arg1, textStatus, arg3, panel);}

            })
            .then( (data, textStatus, jqXHR) => {

                if (oAjax.then && $.isArray(oAjax.then)) {

                    if ($.isFunction(oAjax.then[0])) {oAjax.then[0].call(panel, data, textStatus, jqXHR, panel);}

                }

            }, (jqXHR, textStatus, errorThrown) => {

                if ($.isArray(oAjax.then)) {

                    if ($.isFunction(oAjax.then[1])) {oAjax.then[1].call(panel, jqXHR, textStatus, errorThrown, panel);}

                }

            }

        );

        panel.data("ajaxURL", oAjax.url); // needed for exportPanels()

    },

    // loads content in an iFrame
    iframe(panel) {

        let iFrame = $("<iframe></iframe>"),
            poi = panel.option.contentIframe;

        // iframe content
        if (poi.srcdoc) {
            iFrame.prop("srcdoc", poi.srcdoc);
            panel.data("iframeDOC", poi.srcdoc); // needed for exportPanels()
        }

        if (poi.src) {
            iFrame.prop("src", poi.src);
            panel.data("iframeSRC", poi.src); // needed for exportPanels()
        }

        //iframe size
        (panel.option.contentSize.width  !== "auto" && !poi.width)  ? iFrame.css("width", "100%")  : iFrame.prop("width", poi.width);
        (panel.option.contentSize.height !== "auto" && !poi.height) ? iFrame.css("height", "100%") : iFrame.prop("height", poi.height);

        //iframe name
        if (poi.name) {iFrame.prop("name", poi.name);}

        //iframe sandbox
        if (poi.sandbox) {iFrame.prop("sandox", poi.sandbox);}

        //iframe id
        if (poi.id) {iFrame.prop("id", poi.id);}

        //iframe style
        if ($.isPlainObject(poi.style)) {iFrame.css(poi.style);}

        //iframe css classes
        if (typeof poi.classname === 'string') {

            iFrame.addClass(poi.classname);

        } else if ($.isFunction(poi.classname)) {

            iFrame.addClass(poi.classname());

        }

        panel.content.append(iFrame);

    },

    contentReload(panel) {

        if (panel.option.content) {

            panel.content.empty().append(panel.option.content);

        } else if (panel.option.contentAjax) {

            panel.content.empty();
            this.ajax(panel);

        } else if (panel.option.contentIframe) {

            panel.content.empty();
            this.iframe(panel);

        }

        return panel;

    },

    contentResize(panel) {

        let hdrftr,
            borderWidth = parseInt(panel.css('border-top-width'), 10) + parseInt(panel.css('border-bottom-width'), 10);

        panel.footer.hasClass('active') ? hdrftr = panel.header.outerHeight() + panel.footer.outerHeight() : hdrftr = panel.header.outerHeight();
        panel.content.css({ height: (panel.outerHeight() - hdrftr - borderWidth) });
        return panel;

    },
/* ----------------------------------------------------------------------------------------------- */

/* controls, iconfont and title specific functions ----------------------------------------------- */
    configIconfont(panel) {

        let controlsArray = ["close", "maximize", "normalize", "minimize", "smallify", "smallifyrev"],
            bootstrapArray = ["remove", "fullscreen", "resize-full", "minus", "chevron-up", "chevron-down"],
            fontawesomeArray = ["times", "arrows-alt", "expand", "minus", "chevron-up", "chevron-down"],
            optIconfont = panel.option.headerControls.iconfont,
            controls = panel.header.headerbar;

        // set icons
        if (optIconfont === 'bootstrap' || optIconfont === 'glyphicon') {

            controlsArray.forEach((item, i) => {

                $('.jsPanel-btn-' + item + ' span', controls).removeClass().addClass('glyphicon glyphicon-' + bootstrapArray[i]);

            });

            $('.jsPanel-headerbar .jsPanel-btn', panel).css('padding-top', '4px');

        } else if (optIconfont === 'font-awesome') {

            controlsArray.forEach((item, i) => {

                $('.jsPanel-btn-' + item + ' span', controls).removeClass().addClass('fa fa-' + fontawesomeArray[i]);

            });

        }

    },

    // disable/enable individual controls
    headerControl(panel, ctrl, action) {
        // within the jsPanel method headerControl parameter action default is set to 'enable'
        let controls = panel.header.headerbar,
            p = panel[0];

        if (action === 'disable') {

            if (p.getAttribute('data-btn'+ctrl) !== 'removed') {

                p.setAttribute('data-btn'+ctrl, 'disabled');
                // unbind handler and set styles // pointer events not supported by IE10 !!
                $('.jsPanel-btn-'+ctrl, controls).css({pointerEvents: 'none', opacity:0.4, cursor: 'default'});

            }

        } else if (action === 'enable') {

            if (p.getAttribute('data-btn'+ctrl) !== 'removed') {

                p.setAttribute('data-btn'+ctrl, 'enabled');
                // enable control and reset styles // pointer events not supported by IE10 !!
                $('.jsPanel-btn-'+ctrl, controls).css({pointerEvents: 'auto', opacity:1, cursor: 'pointer'});

            }

        } else if (action === 'remove') {

            if (ctrl !== 'close') {
                p.setAttribute('data-btn'+ctrl, 'removed');
                // remove control
                $('.jsPanel-btn-'+ctrl, controls).remove();
            }

        }

        return panel;

    },

    hideControls(sel, panel) {

        let controls = panel.header.headerbar;
        $("div", controls).css('display', 'flex');
        $(sel, controls).css('display', 'none');

    },

    headerTitle(panel, text) {

        if (text) {
            panel.header.title.empty().append(text);
            return panel;
        }

        return panel.header.title.html();

    },
/* ----------------------------------------------------------------------------------------------- */

/* toolbar specific functions -------------------------------------------------------------------- */
    // builds toolbar
    configToolbar(toolbaritems, toolbarplace, panel) {

        let el, elEvent;

        toolbaritems.forEach( item => {

            if(typeof item === "object") {

                el = $(item.item);

                // add text to button
                if (typeof item.btntext === 'string') {el.append(item.btntext);}

                // add class to button
                if (typeof item.btnclass === 'string') {el.addClass(item.btnclass);}
                
                toolbarplace.append(el);

                // bind handler to the item
                if ($.isFunction(item.callback)) {

                    elEvent = item.event || 'click';
                    el.on(elEvent, panel, item.callback);
                    // jsP is accessible in the handler as "event.data"

                }

            }

        });

    },

    // add a toolbar to either header or footer - used by option & method
    toolbar(panel, place, items) {

        if (place === 'header') {

            panel.header.toolbar.addClass('active');

            if ($.isArray(items)) {

                this.configToolbar(items, panel.header.toolbar, panel);

            } else if ($.isFunction(items)) {

                panel.header.toolbar.append(items(panel.header));

            } else {

                panel.header.toolbar.append(items);

            }

        } else if (place === 'footer') {

            panel.content.removeClass('jsPanel-content-nofooter');
            panel.footer.addClass('active');

            if ($.isArray(items)) {

                this.configToolbar(items, panel.footer, panel);

            } else if ($.isFunction(items)) {

                panel.footer.append(items(panel.footer));

            } else {

                panel.footer.append(items);

            }

        }

        this.contentResize(panel);

        return panel;

    },
/* ----------------------------------------------------------------------------------------------- */

    closeChildpanels(panel) {

        $('.jsPanel', panel).each( (index, elmt) => {
            // jspanel is not the global object jsPanel but the extension for the individual panel elmt
            elmt.jspanel.close();
        } );

        return panel;

    },

    // helper function for the doubleclick handlers (title, content, footer)
    dblclickhelper(odcs, panel) {

        if (typeof odcs === 'string') {

            if (odcs === "maximize" || odcs === "normalize") {

                panel.data('status') === "normalized" ? panel.maximize() : panel.normalize();

            } else if (odcs === "minimize" || odcs === "smallify" || odcs === "close") {

                panel[odcs]();

            }

        }

    },

    // export a panel layout to localStorage and returns array with an object for each panel
    exportPanels(selector = '.jsPanel', name = 'jspanels') {
        // only panels that match the passed selector are exported

        let elmtOffset, elmtPosition, elmtTop, elmtLeft, elmtWidth, elmtHeight, elmtStatus, panelParent,
            panelArr = [], exportedPanel,
            panels = $(".jsPanel").not(".jsPanel-tooltip, .jsPanel-hint, .jsPanel-modal").filter(selector);

        // normalize minimized/maximized panels before export
        // status to restore is saved in exportedPanel.status
        panels.each( (index, elmt) => {
            if ($(elmt).data("status") !== "normalized") {

                $(".jsPanel-btn-normalize", elmt).trigger("click");

            }
        });

        panels.each( (index, elmt) => {
            // normalize minimized/maximized panels before export
            // status to restore is saved in exportedPanel.status
            //if ($(elmt).data("status") !== "normalized") {
            //    $(".jsPanel-btn-normalize", elmt).trigger("click");
            //}

            panelParent = $(elmt).data("container");
            elmtOffset = $(elmt).offset();
            elmtPosition = $(elmt).position();

            if (elmtStatus === "minimized") {

                if (panelParent.toLowerCase() === "body") {

                    elmtTop = $(elmt).data("paneltop") - $(window).scrollTop();
                    elmtLeft = $(elmt).data("panelleft") - $(window).scrollLeft();

                } else {

                    elmtTop = $(elmt).data("paneltop");
                    elmtLeft = $(elmt).data("panelleft");

                }

                elmtWidth = $(elmt).data("panelwidth");
                elmtHeight = $(elmt).data("panelheight");

            } else {

                if (panelParent.toLowerCase() === "body") {

                    elmtTop = Math.floor(elmtOffset.top - $(window).scrollTop());
                    elmtLeft = Math.floor(elmtOffset.left - $(window).scrollLeft());

                } else {

                    elmtTop = Math.floor(elmtPosition.top);
                    elmtLeft = Math.floor(elmtPosition.left);

                }

                elmtWidth = $(elmt).css("width");
                elmtHeight = $(".jsPanel-content", elmt).css("height");

            }

            exportedPanel = {
                status:      $(elmt).data("status"),
                id:          $(elmt).prop("id"),
                headerTitle: $(".jsPanel-title", elmt).html(),
                custom:      $(elmt).data("custom"),
                content:     $(elmt).data("content"),
                contentSize: { width: elmtWidth, height: elmtHeight },
                position:    { my: 'left-top', at: 'left-top', offsetX: elmtLeft, offsetY: elmtTop }
            };

            if ($(elmt).data("ajaxURL")) {

                exportedPanel.contentAjax = {
                    url: $(elmt).data("ajaxURL"),
                    autoload: true
                };

            }

            if ($(elmt).data("iframeDOC") || $(elmt).data("iframeSRC")) {

                exportedPanel.contentIframe = {
                    src:    $(elmt).data("iframeSRC") || '',
                    srcdoc: $(elmt).data("iframeDOC") || ''
                };

            }

            panelArr.push(exportedPanel);

            // restore status that is saved
            switch (exportedPanel.status) {

                case "minimized":
                    $(".jsPanel-btn-minimize", elmt).trigger("click");
                    break;

                case "maximized":
                    $(".jsPanel-btn-maximize", elmt).trigger("click");
                    break;

                case "smallified":
                    $(".jsPanel-btn-smallify", elmt).trigger("click");
                    break;

                case "smallifiedMax":
                    $(".jsPanel-btn-smallify", elmt).trigger("click");
                    break;

            }

        });

        window.localStorage.setItem(name, JSON.stringify(panelArr));

        return panelArr;

    },

    // imports panel layout from localStorage.jspanels and restores panels
    importPanels(predefinedConfigs, name = 'jspanels') {
        /* panelConfig needs to be an object with predefined configs.
         * A config named "default" will be applied to ALL panels
         *
         *       panelConfig = { default: { } [, config1 [, config2 [, configN ]]] };
         */

        let savedPanels = JSON.parse(localStorage[name]),
            defaultConfig = predefinedConfigs["default"] || {},
            restoredConfig;

        savedPanels.forEach( (savedconfig) => {

            // savedconfig represents one item in savedPanels
            if (typeof savedconfig.custom.config === "string") {

                restoredConfig = $.extend(true, {}, defaultConfig, predefinedConfigs[savedconfig.custom.config], savedconfig);

            } else {

                restoredConfig = $.extend(true, {}, defaultConfig, savedconfig);

            }

            // restore panel
            $.jsPanel(restoredConfig);

        });

    },

    // resize existing jsPanel; resizes the full panel (not content section only)
    resize(panel, width, height) {

        if (panel.data('status') !== "minimized") {

            // callback to execute before a panel is resized
            if ($.isFunction(panel.option.onbeforeresize)) {
                if (panel.option.onbeforeresize.call(panel, panel) === false) {return panel;}
            }

            if(width && width !== null) {

                panel.css("width", width);

            } else {

                let newWidth = panel.content.css("width") + panel.content.css('border-left-width');
                panel.css("width", newWidth);

            }

            if(height && height !== null) {panel.css("height", height);}

            panel.contentResize();
            //panel.trigger("resizestop");

            // callback to execute after a panel was resized
            if ($.isFunction(panel.option.onresized)) {
                if (panel.option.onresized.call(panel, panel) === false) {return panel;}
            }

        }

        return panel;

    },

    // returns a z-index value for a panel in order to have it on top
    setZi(panel) {

        if (!panel.hasClass('jsPanel-modal')) {

            if ((this.zi += 1) > panel.css('z-index')) {
                panel.css('z-index', this.zi);
            }

        }

    },

    // reset all z-index values for non-modal jsPanels
    resetZis() {

        let array = [],
            panels = $('.jsPanel:not(.jsPanel-modal):not(.jsPanel-hint)');

        panels.each(function(index,item){
            array.push(item);
        });

        array.sort(function(a, b) {

            return $(a).css('z-index') - $(b).css('z-index');

        }).forEach(function(item, index) {

            if ((jsPanel.zi += 1) > $(item).css('z-index')) {

                $(item).css('z-index', jsPanel.ziBase + index);

            }

        });

        this.zi = (this.ziBase - 1) + array.length;

    },

    updateCachedData(panel) {
        let styles = window.getComputedStyle(panel[0],null);
        panel.cachedData.top = styles.getPropertyValue('top');
        panel.cachedData.left = styles.getPropertyValue('left');
        panel.cachedData.width = styles.getPropertyValue('width');
        panel.cachedData.height = styles.getPropertyValue('height');
    }

};


(function($){

    $.jsPanel = function (config) {

        let id,
            panelconfig = config || {},
            optConfig = panelconfig.config || {},
            passedconfig = $.extend(true, {}, optConfig, panelconfig),
            template = panelconfig.template || jsPanel.template,
            jsP = $(template),
            trigger, // elmt triggering the tooltip
            oH, oW;

        // enable paneltype: 'tooltip' for default tooltips
        if (passedconfig.paneltype === "tooltip") {passedconfig.paneltype = {tooltip: true};}

        // Extend our default config with those provided. Note that the first arg to extend is an empty object - this is to keep from overriding our "defaults" object.
        if (!passedconfig.paneltype) {

            // if option.paneltype is not set in passed config simply merge passed config with defaults
            jsP.option = $.extend(true, {}, $.jsPanel.defaults, passedconfig);

        } else if (passedconfig.paneltype === 'modal') {

            // if panel to create is a modal first merge passed config with modal defaults and then with defaults
            jsP.option = $.extend(true, {}, $.jsPanel.defaults, $.jsPanel.modaldefaults, passedconfig);

        } else if (passedconfig.paneltype.tooltip) {

            // if panel to create is a tooltip first merge passed config with tooltip defaults and then with defaults
            jsP.option = $.extend(true, {}, $.jsPanel.defaults, $.jsPanel.tooltipdefaults, passedconfig);

        } else if (passedconfig.paneltype === 'hint') {

            // if panel to create is a hint first merge passed config with hint defaults and then with defaults
            jsP.option = $.extend(true, {}, $.jsPanel.defaults, $.jsPanel.hintdefaults, passedconfig);

        }

        // check whether panel to create is tooltip
        if (jsP.option.paneltype.tooltip) {

            // the elmt triggering the tooltip
            trigger = jsPanel.setTrigger(jsP.option.position);

            // if panel to create is a tooltip and the trigger already has a tooltip exit jsPanel()
            if ($(trigger).hasClass('hasTooltip')) {return false;}

        }

        /* to ease migrating from version 2.5.x to version 3.x ------------------------------------------------------ */
        let newOptions = ['container', 'contentAjax', 'contentIframe', 'contentOverflow', 'contentSize', 'footerToolbar', 'headerControls', 'headerRemove', 'headerTitle', 'headerToolbar'],
            oldOptions = ['selector',  'ajax',        'iframe',        'overflow',        'size',        'toolbarFooter', 'controls',       'removeHeader', 'title',       'toolbarHeader'];
        // map oldOptions to newOptions
        oldOptions.forEach(function (value, index) {
            if (jsP.option[value]) {
                jsP.option[newOptions[index]] = jsP.option[value];
            }
        });
        // map old themes to new ones
        switch (jsP.option.theme) {
            case "light":
                jsP.option.theme = 'gainsboro';
                break;
            case "medium":
                jsP.option.theme = 'silver';
                break;
            case "dark":
                jsP.option.theme = 'gray';
                break;
            case "autumngreen":
                jsP.option.theme = '#5A521B';
                break;
            case "autumnbrown":
                jsP.option.theme = '#823E1D';
                break;
            case "autumnred":
                jsP.option.theme = '#852228';
                break;
        }
        // map old bootstrap themes to new ones
        if (jsP.option.bootstrap) {
            switch (jsP.option.bootstrap) {
                case "default":
                    jsP.option.theme = "bootstrap-default";
                    break;
                case "primary":
                    jsP.option.theme = "bootstrap-primary";
                    break;
                case "info":
                    jsP.option.theme = "bootstrap-info";
                    break;
                case "success":
                    jsP.option.theme = "bootstrap-success";
                    break;
                case "warning":
                    jsP.option.theme = "bootstrap-warning";
                    break;
                case "danger":
                    jsP.option.theme = "bootstrap-danger";
                    break;
            }
        }
        // map old option load to current option contentAjax
        if (jsP.option.load.url) {
            jsP.option.contentAjax = {
                url: jsP.option.load.url,
                autoload: true,
                data: jsP.option.load.data || undefined,
                done: jsP.option.load.complete || undefined
            };
        }
        // map old panelstatus values to new option.panelstatus
        if (jsP.option.panelstatus) {
            jsP.option.panelstatus === 'smallifiedMax' ? jsP.option.setstatus = 'maximize smallify' : jsP.option.setstatus = jsP.option.panelstatus;
        }
        if (jsP.option.headerControls.buttons) {
            jsP.option.headerControls.controls = jsP.option.headerControls.buttons;
        }
        /* ---------------------------------------------------------------------------------------------------------- */

        // option.id ---------------------------------------------------------------------------------------------------
        if (typeof jsP.option.id === "string") {

            id = jsP.option.id;

        } else if ($.isFunction(jsP.option.id)) {

            jsP.option.id = id = jsP.option.id();

        }

        // check whether id already exists in document
        if ($("#" + id).length > 0) {

            console.warn("jsPanel Error: No jsPanel created - id attribute passed with option.id already exists in document");
            return false;

        } else {

            jsP.attr("id", id);

        }

        jsP.data("custom", jsP.option.custom);

        // panel properties
        jsP.header = $('.jsPanel-hdr', jsP);
        jsP.header.headerbar = $('.jsPanel-headerbar', jsP.header);
        jsP.header.title = $('.jsPanel-title', jsP.header.headerbar);
        jsP.header.controls = $('.jsPanel-controlbar', jsP.header.headerbar);
        jsP.header.toolbar = $('.jsPanel-hdr-toolbar', jsP.header);
        jsP.content = $('.jsPanel-content', jsP);
        jsP.footer = $('.jsPanel-ftr', jsP);
        jsP.data('status', 'initialized');
        jsP.cachedData = {};

        // panel methods
        jsP.toolbarAdd = (place = 'header', items = []) => jsPanel.toolbar(jsP, place, items);

        jsP.close = () => {

            $(document).trigger('jspanelbeforeclose', id);

            if ($.isFunction(jsP.option.onbeforeclose)) {

                // do not close panel if onbeforeclose callback returns false
                if (jsP.option.onbeforeclose.call(jsP, jsP) === false) {return jsP;}

            }

            // this code block is only relevant if panel uses autoposition ------------------------------
            let jsPop = jsP.option.position;
            if (jsPop.autoposition || ( typeof jsPop === 'string' && jsPop.match(/DOWN|RIGHT|UP|LEFT/))) {

                let regex = /left-top|center-top|right-top|left-center|center|right-center|left-bottom|center-bottom|right-bottom/,
                    parent = $('#' + id).parent(),
                    match = document.getElementById(id).className.match(regex);

                if (match) {
                    jsPanel.lastbeforeclose = {
                        parent: parent,
                        class: match[0]
                    };
                }

            }
            // ------------------------------------------------------------------------------------------

            // close all childpanels and then the panel itself
            jsP.closeChildpanels().remove();

            // remove id from activePanels.list
            let index = jsPanel.activePanels.list.findIndex(function(element) { return element === id; });
            if (index > -1) { jsPanel.activePanels.list.splice(index, 1); }

            // remove replacement if present
            $('#'+id+'-min').remove();

            // remove modal backdrop of corresponding modal jsPanel
            if (jsP.option.paneltype === 'modal') {$('#jsPanel-modal-backdrop-' + jsP.attr('id')).remove();}

            // remove class hasTooltip from tooltip trigger if panel to close is tooltip
            if (jsP.option.paneltype.tooltip) {$(trigger).removeClass('hasTooltip');}

            $(document).trigger('jspanelclosed', id);
            $(document).trigger('jspanelstatuschange', id);

            // this code block is only relevant if panel uses autoposition ------------------------------
            let container, panels, pos;
            if (jsPanel.lastbeforeclose) {
                container = jsPanel.lastbeforeclose.parent;
                panels = $('.' + jsPanel.lastbeforeclose.class, container);
                pos = jsPanel.lastbeforeclose.class;
            }

            // than reposition all elmts
            if (panels) {

                // remove classname from all panels
                panels.each(function(index, elmt) {

                    $(elmt).removeClass(pos);

                });

                // reposition remaining autopositioned panels
                panels.each(function(index, elmt) {

                    var direction = elmt.getAttribute('data-autoposition'),
                        oX = elmt.getAttribute('data-offsetx'),
                        oY = elmt.getAttribute('data-offsety');

                    jsPanel.position(elmt, {
                        my: pos,
                        at: pos,
                        autoposition: direction,
                        offsetX: oX,
                        offsetY: oY
                    });

                });

            }

            jsPanel.lastbeforeclose = false;
            // -----------------------------------------------------------------------------------------------

            // call onclosed callback of panel to close
            if ($.isFunction(jsP.option.onclosed)) {jsP.option.onclosed.call(jsP, jsP);}

            jsPanel.resetZis();

        };

        jsP.closeChildpanels = () => jsPanel.closeChildpanels(jsP);

        jsP.contentReload = () => jsPanel.contentReload(jsP);

        jsP.contentResize = () => jsPanel.contentResize(jsP);

        jsP.headerControl = (ctrl, action = 'enable') => {

            if (ctrl) {

                jsPanel.headerControl(jsP, ctrl, action);

            } else {

                ['close','maximize','minimize','normalize','smallify'].forEach(function(value) {

                    jsPanel.headerControl(jsP, value, action);

                });

            }

            return jsP;

        };

        jsP.headerTitle = text => jsPanel.headerTitle(jsP, text);

        jsP.front = (target) => {

            if ($(target).hasClass('jsglyph-close') || $(target).hasClass('jsglyph-minimize')) { return; }

            jsP.css('z-index', jsPanel.setZi(jsP));
            jsPanel.resetZis();
            $(document).trigger('jspanelfronted', id);

            if ($.isFunction(jsP.option.onfronted)) {

                // do not close panel if onfronted callback returns false
                if (jsP.option.onfronted.call(jsP, jsP) === false) {
                    return jsP;
                } else {
                    jsP.option.onfronted.call(jsP, jsP);
                }

            }

            return jsP;

        };

        jsP.normalize = () => {

            if (jsP.data('status') === 'normalized') {return jsP;}

            $(document).trigger('jspanelbeforenormalize', id);

            if ($.isFunction(jsP.option.onbeforenormalize)) {

                // do not normalize panel if onbeforenormalize callback returns false
                if (jsP.option.onbeforenormalize.call(jsP, jsP) === false) {return jsP;}

            }

            jsP.css({

                left: jsP.cachedData.left,
                top: jsP.cachedData.top,
                width: jsP.cachedData.width,
                height: jsP.cachedData.height,
                zIndex: function(){jsPanel.setZi(jsP);}

            }).data('status', 'normalized')
              .contentResize();

            jsPanel.hideControls(".jsPanel-btn-normalize, .jsPanel-btn-smallifyrev", jsP);

            // remove replacement
            $('#' + jsP.prop('id') + '-min').remove();

            $(document).trigger('jspanelnormalized', id);
            $(document).trigger('jspanelstatuschange', id);

            // call onnormalized callback
            if ($.isFunction(jsP.option.onnormalized)) {jsP.option.onnormalized.call(jsP, jsP);}

            return jsP;

        };

        jsP.maximize = () => {

            let margins = jsP.option.maximizedMargin,
                pnt = jsP[0].parentNode;

            if (jsP.data('status') === 'maximized') {return jsP;}

            // cache panel data like size and position etc. for later use
            if (jsP.data('status') === 'normalized') {jsPanel.updateCachedData(jsP);}

            $(document).trigger('jspanelbeforemaximize', id);

            if ($.isFunction(jsP.option.onbeforemaximize)) {

                // do not maximize panel if onbeforemaximize callback returns false
                if (jsP.option.onbeforemaximize.call(jsP, jsP) === false) {return jsP;}

            }

            if (pnt === document.body) {
                // maximize within window
                jsP.css({

                    width:  (document.documentElement.clientWidth - margins.left - margins.right) + 'px',
                    height: (document.documentElement.clientHeight - margins.top - margins.bottom) + 'px',
                    left:   margins.left + 'px',
                    top:    margins.top + 'px'

                });

                if (jsP.option.position.fixed === false) {

                    jsP.css({

                        left: (window.pageXOffset + margins.left) + 'px',
                        top:  (window.pageYOffset + margins.top) + 'px'

                    });

                }

            } else {
                // maximize within parentNode
                jsP.css({

                    width:  (pnt.clientWidth - margins.left - margins.right) + 'px',
                    height: (pnt.clientHeight - margins.top - margins.bottom) + 'px',
                    left:   margins.left + 'px',
                    top:    margins.top + 'px'

                });

            }

            // update current panel data like size and position etc. for later use
            jsP.contentResize()
               .data('status', 'maximized')
               .css('z-index', jsPanel.setZi(jsP));

            jsPanel.hideControls(".jsPanel-btn-maximize, .jsPanel-btn-smallifyrev", jsP);

            // remove replacement
            $('#' + jsP.prop('id') + '-min').remove();

            $(document).trigger('jspanelmaximized', id);
            $(document).trigger('jspanelstatuschange', id);

            // call onmximized callback
            if ($.isFunction(jsP.option.onmaximized)) {jsP.option.onmaximized.call(jsP, jsP);}

            return jsP;

        };

        jsP.minimize = () => {

            if (jsP.data('status') === 'minimized') {return jsP;}

            $(document).trigger('jspanelbeforeminimize', id);

            if ($.isFunction(jsP.option.onbeforeminimize)) {

                // do not minimize panel if onbeforeminimize callback returns false
                if (jsP.option.onbeforeminimize.call(jsP, jsP) === false) {return jsP;}

            }

            let fontColor = jsP.header.headerbar.css('color'),
                bgColor;

            if (!jsP.hasClass('panel')) {
                // if not a bootstrap theme
                bgColor = jsP.css('background-color');

            } else {

                if (jsP.header.css('background-color') === 'transparent') {

                    bgColor = jsP.css('background-color');

                } else {

                    bgColor = jsP.header.css('background-color');

                }
            }

            // cache panel data like size and position etc. for later use
            if (jsP.data('status') === 'normalized') {jsPanel.updateCachedData(jsP);}

            // create the replacement elmt
            let replacement = $(jsPanel.replacementTemplate);

            // safe current css.left of jsPanel
            replacement.left = jsP.css('left');

            // move jsPanel off screen
            jsP.css('left', '-9999px')
               .data('status', 'minimized');

            // set replacement colors
            replacement.css({backgroundColor: bgColor})
                       .prop('id', jsP.prop('id') + '-min')
                       .find('h3').css({color: fontColor})
                       .html(jsP.headerTitle());

            $('.jsPanel-btn', replacement).css({color: fontColor});

            // append replacement
            // cont has a positive length if option.container is .jsPanel-content or descendant of .jsPanel-content
            // so childpanels are minimized to their parent panel
            let cont = $(jsP.option.container).closest('.jsPanel-content');
            if (!cont.length) {
                $('#jsPanel-replacement-container').append(replacement);
            } else {
                if (!$('.jsPanel-minimized-box').length) {
                    $(cont[0]).append("<div class='jsPanel-minimized-box'>");
                }
                $('.jsPanel-minimized-box').append(replacement);
            }

            $(document).trigger('jspanelminimized', id);
            $(document).trigger('jspanelstatuschange', id);

            // call onminimized callback
            if ($.isFunction(jsP.option.onminimized)) {jsP.option.onminimized.call(jsP, jsP);}

            // set handlers for replacement controls and disable replacement control if needed
            $('.jsPanel-btn-normalize', replacement).css('display', 'block').click(function(){

                jsP.css('left', replacement.left);
                replacement.remove();
                $('.jsPanel-btn-normalize', jsP).trigger('click');

            });

            if(jsP[0].dataset.btnnormalize === 'disabled'){

                $('.jsPanel-btn-normalize', replacement).css({pointerEvents: 'none', opacity: 0.5, cursor: 'default'});

            } else if (jsP[0].dataset.btnnormalize === 'removed') {

                $('.jsPanel-btn-normalize', replacement).remove();

            }

            $('.jsPanel-btn-maximize', replacement).click(function () {

                jsP.css('left', replacement.left);
                replacement.remove();
                $('.jsPanel-btn-maximize', jsP).trigger('click');

            });

            if(jsP[0].dataset.btnmaximize === 'disabled'){

                $('.jsPanel-btn-maximize', replacement).css({pointerEvents: 'none', opacity: 0.5, cursor: 'default'});

            } else if (jsP[0].dataset.btnmaximize === 'removed') {

                $('.jsPanel-btn-maximize', replacement).remove();

            }

            $('.jsPanel-btn-close', replacement).click(function(){

                replacement.remove();
                jsP.close();

            });

            if(jsP[0].dataset.btnclose === 'disabled'){

                $('.jsPanel-btn-close', replacement).css({pointerEvents: 'none', opacity: 0.5, cursor: 'default'});

            }

            return jsP;

        };

        jsP.reposition = position => jsPanel.reposition(jsP, position);

        jsP.resize = (width, height) => jsPanel.resize(jsP, width, height);
        
        jsP.smallify = () => {

            if (jsP.data('status') === "normalized" || jsP.data('status') === "maximized") {

                if (jsP.data('status') !== "smallified" && jsP.data('status') !== "smallifiedMax") {

                    // store jsP height in function property
                    jsP.smallify.height = jsP.outerHeight();

                    jsP.animate({

                        height: jsP.header.headerbar.outerHeight() + 'px'

                    });

                    if (jsP.data('status') === 'maximized') {

                        jsPanel.hideControls(".jsPanel-btn-maximize, .jsPanel-btn-smallify", jsP);
                        jsP.data('status', 'smallifiedMax');
                        $(document).trigger('jspanelsmallifiedmax', id);
                        if ($.isFunction(jsP.option.onsmallified)) {jsP.option.onsmallified.call(jsP, jsP);}

                    } else {

                        jsPanel.hideControls(".jsPanel-btn-normalize, .jsPanel-btn-smallify", jsP);
                        jsP.data('status', 'smallified');
                        $(document).trigger('jspanelsmallified', id);

                    }

                    $(document).trigger('jspanelstatuschange', id);

                    if ($.isFunction(jsP.option.onsmallified)) {jsP.option.onsmallified.call(jsP, jsP);}

                }

            } else if (jsP.data('status') !== "minimized") {

                jsP.animate({ height: jsP.smallify.height });

                if (jsP.data('status') === 'smallified') {

                    jsPanel.hideControls(".jsPanel-btn-normalize, .jsPanel-btn-smallifyrev", jsP);
                    jsP.data('status', 'normalized');
                    $(document).trigger('jspanelnormalized', id);
                    $(document).trigger('jspanelstatuschange', id);
                    if ($.isFunction(jsP.option.onnormalized)) {jsP.option.onnormalized.call(jsP, jsP);}

                } else {

                    jsPanel.hideControls(".jsPanel-btn-maximize, .jsPanel-btn-smallifyrev", jsP);
                    jsP.data('status', 'maximized');
                    $(document).trigger('jspanelmaximized', id);
                    $(document).trigger('jspanelstatuschange', id);
                    if ($.isFunction(jsP.option.onmaximized)) {jsP.option.onmaximized.call(jsP, jsP);}

                }

                if ($.isFunction(jsP.option.onunsmallified)) {jsP.option.onunsmallified.call(jsP, jsP);}

            }

            jsP.css('z-index', jsPanel.setZi(jsP));
            return jsP;

        };

        jsP.setTheme = (passedtheme = jsP.option.theme.toLowerCase().replace(/ /g, ""), callback) => {
            // remove all whitespace from passedtheme
            passedtheme = passedtheme.toLowerCase().replace(/ /g, "");
            let theme = [], bs, bstheme, colors, pColor, bsColors, bordervalues;

            // first remove all theme related syles
            jsPanel.themes.forEach(function (value, index, array) {
                jsP.removeClass('panel card card-inverse jsPanel-theme-' + value + '  panel-' + value + ' card-' + value);
            });
            jsP.header.removeClass('panel-heading').title.removeClass('panel-title');
            jsP.content.removeClass('panel-body').css('border-top-color', '');
            jsP.footer.removeClass('panel-footer card-footer');
            jsP.css('background', '').content.css({borderTop:'', backgroundColor: '', color:''});
            jsP.css({borderWidth: '', borderStyle: '', borderColor: ''});
            $('.jsPanel-hdr *', jsP).css({color: ''});
            jsP.header.toolbar.css({boxShadow:'', width: '', marginLeft: ''});

            if (passedtheme.endsWith('filled')) {
                theme[1] = 'filled';
                theme[0] = passedtheme.substr(0, passedtheme.length - 6);
            } else if (passedtheme.endsWith('filledlight')) {
                theme[1] = 'filledlight';
                theme[0] = passedtheme.substr(0, passedtheme.length - 11);
            } else {
                theme[1] = "";
                theme[0] = passedtheme; // theme[0] is the primary color
            }

            // if first part of theme includes a "-" it's assumed to be a bootstrap theme
            if (theme[0].match('-')) {
                bs = theme[0].split('-');
                bstheme = true;
            }

            if (!bstheme) {

                if (jsPanel.themes.includes(theme[0])) {

                    jsP.addClass('jsPanel-theme-' + theme[0]);

                    // optionally set theme style
                    if (theme[1] === 'filled') {
                        jsP.content.css('background', '').addClass('jsPanel-content-filled');
                    } else if (theme[1] === 'filledlight') {
                        jsP.content.css('background', '').addClass('jsPanel-content-filledlight');
                    }

                    if (!jsP.option.headerToolbar) {jsP.content.css({borderTop:'1px solid ' + jsP.header.title.css('color')});}

                } else {

                    // arbitrary colors themes
                    colors = jsPanel.calcColors(theme[0]); // colors: [primeColor, secondColor, fontColorForPrimary]
                    jsP.css('background-color', colors[0]);
                    $('.jsPanel-hdr *', jsP).css({color: colors[3]});

                    if (jsP.option.headerToolbar) {

                        jsP.header.toolbar.css({boxShadow:'0 0 1px ' + colors[3] + ' inset', width: 'calc(100% + 4px)', marginLeft: '-2px'});

                    } else  {

                        jsP.content.css({borderTop:'1px solid ' + colors[3]});

                    }

                    if (theme[1] === 'filled') {

                        jsP.content.css({'background-color': colors[0], color: colors[3]});

                    } else if (theme[1] === 'filledlight') {

                        jsP.content.css({'background-color': colors[1]});

                    }

                }

            } else {

                // bootstrap themes
                jsP.addClass('panel panel-' + bs[1])
                    .addClass('card card-inverse card-' + bs[1])
                    .header.addClass('panel-heading')
                    .title.addClass('panel-title');

                jsP.content.addClass('panel-body')
                    // fix css problems for panels nested in other bootstrap panels
                    .css('border-top-color', () => { return jsP.header.css('border-top-color'); });

                jsP.footer.addClass('panel-footer card-footer');

                // optional !!!!!! produces error when using panel with headerRemove: true
                if ($('.panel-heading', jsP).css('background-color') === 'transparent') {
                    pColor = jsP.css('background-color').replace(/\s+/g, '');
                } else {
                    pColor = $('.panel-heading', jsP).css('background-color').replace(/\s+/g, '');
                }

                bsColors = jsPanel.calcColors(pColor);
                $('*', jsP.header).css('color', bsColors[3]);

                if (jsP.option.headerToolbar) {
                    jsP.header.toolbar.css({boxShadow:'0 0 1px ' + bsColors[3] + ' inset', width: 'calc(100% + 4px)', marginLeft: '-2px'});
                } else  {
                    jsP.content.css({borderTop:'1px solid ' + bsColors[3]});
                }

                if (theme[1] === 'filled') {
                    jsP.content.css({backgroundColor: pColor, color: bsColors[3]});
                } else if (theme[1] === 'filledlight') {
                    jsP.content.css({backgroundColor: bsColors[1], color: '#000000'});
                }

            }

            if (jsP.option.border) {
                bordervalues = jsP.option.border.split(' ');
                jsP.css({'border-width': bordervalues[0], 'border-style': bordervalues[1]});

                if (!bstheme) {
                    if (!jsPanel.themes.includes(theme[0])) {
                        // arbitrary themes only (for built-in themes it's taken from the css file)
                        jsP.css('border-color', colors[0]);
                    }
                } else {
                    // bootstrap
                    jsP.css('border-color', pColor);
                }

            } else {
                jsP.css({borderWidth: '', borderStyle: '', borderColor: ''});
            }

            if (callback && $.isFunction(callback)) {callback.call(jsP, jsP);}

            return jsP;

        };


        /* to ease migrating from version 2.5.x to version 3.x ------------------------------------------------------ */
        jsP.addToolbar = jsP.toolbarAdd;
        jsP.reloadContent = jsP.contentReload;
        jsP.resizeContent = jsP.contentResize;
        jsP.control = jsP.headerControl;
        jsP.title = jsP.headerTitle;
        /* ---------------------------------------------------------------------------------------------------------- */

        // jsPanel close
        $('.jsPanel-btn-close', jsP).on('click', e => {
            e.preventDefault();
            jsP.close();
        });

        // jsPanel minimize
        $('.jsPanel-btn-minimize', jsP).on('click', e => {
            e.preventDefault();
            jsP.minimize();
        });

        // jsPanel maximize
        $('.jsPanel-btn-maximize', jsP).on('click', e => {
            e.preventDefault();
            jsP.maximize();
        });

        // jsPanel normalize
        $('.jsPanel-btn-normalize', jsP).on('click', e => {
            e.preventDefault();
            jsP.normalize();
        });

        // jsPanel smallify
        $('.jsPanel-btn-smallify, .jsPanel-btn-smallifyrev', jsP).on('click', e => {
            e.preventDefault();
            jsP.smallify();
        });


        /* option.container ----------------------------------------------------------------------------------------- */
        jsP.appendTo(jsP.option.container);
        jsPanel.activePanels.list.push(id);
        $(document).trigger('jspanelloaded', id);
        jsP.data('container', jsP.option.container);

        /* option.theme now includes bootstrap ---------------------------------------------------------------------- */
        jsP.setTheme();

        /* option.headerRemove,
           option.headerControls (controls in header right) ------------------------------------- */
        if (!jsP.option.headerRemove) {

            if (jsP.option.headerControls.controls === 'closeonly') {

                $(".jsPanel-btn:not(.jsPanel-btn-close)", jsP.header.headerbar).remove();
                ["maximize", "minimize", "normalize", "smallify"].forEach( ctrl => {
                    jsP[0].setAttribute('data-btn' + ctrl, 'removed');
                });
                jsP[0].setAttribute('data-btn-close', 'enabled');

            } else if (jsP.option.headerControls.controls === 'none') {

                $(jsP.header.controls).remove();
                ["close", "maximize", "minimize", "normalize", "smallify"].forEach( ctrl => {
                    jsP[0].setAttribute('data-btn' + ctrl, 'removed');
                });

            } else {

                // disable controls individually
                ["close", "maximize", "minimize", "normalize", "smallify"].forEach( ctrl => {

                    if (jsP.option.headerControls[ctrl] === 'disable') {

                        // disable individual control btn and store btn status in data attr
                        jsP.headerControl(ctrl, 'disable');

                    } else if (jsP.option.headerControls[ctrl] === 'remove') {

                        jsP.headerControl(ctrl, 'remove');

                    } else {

                        jsP[0].setAttribute('data-btn' + ctrl, 'enabled');

                    }

                });

            }

        } else {

            jsP.header.remove();
            jsP.content.addClass('jsPanel-content-noheader');
            ["close", "maximize", "minimize", "normalize", "smallify"].forEach( ctrl => {
                jsP[0].setAttribute('data-btn' + ctrl, 'removed');
            });

        }
        /* corrections for a removed header */
        if (jsP.option.headerRemove || $('.jsPanel-hdr').length < 1 ) {jsP.content.css('border', 'none');}

        /* insert iconfonts if option.headerControls.iconfont set (default is "jsglyph") ---------------------------- */
        jsPanel.configIconfont(jsP);

        /* option.paneltype ----------------------------------------------------------------------------------------- */
        if (jsP.option.paneltype === "modal") {

            jsPanel.insertModalBackdrop(jsP);
            jsP.addClass('jsPanel-modal').css('z-index', jsPanel.modalcount + 9999);

        } else if (jsP.option.paneltype === 'hint') {

            jsP.addClass('jsPanel-hint').css('z-index', 10000);

        } else if (jsP.option.paneltype.tooltip) {

            trigger = jsPanel.setTrigger(jsP.option.position); // elmt triggering the tooltip

            jsP.addClass('jsPanel-tooltip');

            jsPanel.setTooltipClass(jsP);

            if (jsP.option.paneltype.solo) {jsPanel.closeTooltips();}

            jsPanel.setTooltipMode(jsP, trigger);

        }

        if (jsP.option.paneltype.tooltip) {$(trigger).addClass('hasTooltip');}

        /* option.headerToolbar | default: false -------------------------------------------------------------------- */
        if (jsP.option.headerToolbar && !jsP.option.headerRemove) {jsPanel.toolbar(jsP, 'header', jsP.option.headerToolbar);}

        /* option.footerToolbar | default: false -------------------------------------------------------------------- */
        if (jsP.option.footerToolbar) {jsPanel.toolbar(jsP, 'footer', jsP.option.footerToolbar);}

        /* option.content ------------------------------------------------------------------------------------------- */
        if (jsP.option.content) {
            jsP.content.append(jsP.option.content);
            jsP.data("content", jsP.option.content);
        }

        /* option.contentAjax --------------------------------------------------------------------------------------- */
        if (typeof jsP.option.contentAjax === 'string') {

            jsP.option.contentAjax = {
                url: jsP.option.contentAjax,
                autoload: true
            };
            jsPanel.ajax(jsP);

        } else if ($.isPlainObject(jsP.option.contentAjax)) {

            jsPanel.ajax(jsP);

        }

        /* option.contentIframe ------------------------------------------------------------------------------------- */
        if ($.isPlainObject(jsP.option.contentIframe) && (jsP.option.contentIframe.src || jsP.option.contentIframe.srcdoc)) {jsPanel.iframe(jsP);}

        /* tooltips continued --------------------------------------------------------------------------------------- */
        /* jquery.css() doesn't work properly if jsPanel isn't in the DOM yet, so the code for the tooltip connectors
           is placed after the jsPanel is appended to the DOM !!! */
        if (jsP.option.paneltype.connector) {jsPanel.addConnector(jsP);}

        /* option.contentSize - needs to be set before option.position and should be after option.content ------------------ */
        if (typeof jsP.option.contentSize === 'string') {

            let sizes = jsP.option.contentSize.trim().split(' '),
                sizesLength = sizes.length;

            jsP.option.contentSize = {
                width: sizes[0],
                height: sizes[--sizesLength]
            };

        }

        if (jsP.option.contentSize.height === 0) {jsP.option.contentSize.height = '0';}

        jsP.content.css({
            width: jsP.option.contentSize.width || $.jsPanel.defaults.contentSize.width,
            height: jsP.option.contentSize.height || $.jsPanel.defaults.contentSize.height
        });

        jsP.css({
            // necessary if title text exceeds content width & correction for panel padding
            // or if content section is removed prior positioning
            //width: jsP.content.outerWidth() + 'px',
            width: function() {

                if ($('.jsPanel-content', jsP).length > 0) {

                    return jsP.content.outerWidth() + 'px';

                } else {

                    return jsP.option.contentSize.width || $.jsPanel.defaults.contentSize.width;

                }

            },

            zIndex: function(){jsPanel.setZi(jsP);} // set z-index to get new panel to front;

        });

        // after content width is set and jsP width is set accordingly set content width to 100%
        jsP.content.css('width', '100%');

        /* option.position ------------------------------------------------------------------------------------------ */
        jsPanel.position(jsP, jsP.option.position);

        jsP.data('status', 'normalized');
        $(document).trigger('jspanelstatuschange', id);

        // handlers for doubleclicks -----------------------------------------------------------------------------------
        // dblclicks disabled for normal modals, hints and tooltips
        if (!jsP.option.paneltype) {

            if (jsP.option.dblclicks) {

                if (jsP.option.dblclicks.title) {

                    jsP.header.headerbar.on('dblclick', e => {
                        e.preventDefault();
                        jsPanel.dblclickhelper(jsP.option.dblclicks.title, jsP);
                    });

                }

                if (jsP.option.dblclicks.content) {

                    jsP.content.on('dblclick', e => {
                        e.preventDefault();
                        jsPanel.dblclickhelper(jsP.option.dblclicks.content, jsP);
                    });

                }

                if (jsP.option.dblclicks.footer) {

                    jsP.footer.on('dblclick', e => {
                        e.preventDefault();
                        jsPanel.dblclickhelper(jsP.option.dblclicks.footer, jsP);
                    });

                }

            }

        }

        /* option.contentOverflow  | default: 'hidden' -------------------------------------------------------------- */
        if (typeof jsP.option.contentOverflow === 'string') {

            jsP.content.css('overflow', jsP.option.contentOverflow);

        } else if ($.isPlainObject(jsP.option.contentOverflow)) {

            jsP.content.css({
                'overflow-y': jsP.option.contentOverflow.vertical || jsP.option.contentOverflow['overflow-y'],
                'overflow-x': jsP.option.contentOverflow.horizontal || jsP.option.contentOverflow['overflow-x']
            });

        }

        /* option.draggable ----------------------------------------------------------------------------------------- */
        if ($.isPlainObject(jsP.option.draggable)) {

            jsP.draggable(jsP.option.draggable);

        } else if (jsP.option.draggable === 'disabled') {

            // reset cursor, draggable deactivated
            $('.jsPanel-hdr, .jsPanel-ftr', jsP).css('cursor', 'default');
            // jquery ui draggable initialize disabled to allow to query status
            jsP.draggable({disabled: true});

        } else {
            // draggable is not even initialised
            $('.jsPanel-hdr, .jsPanel-ftr', jsP).css('cursor', 'default');
        }

        /* option.resizable ----------------------------------------------------------------------------------------- */
        if ($.isPlainObject(jsP.option.resizable)) {

            jsP.resizable(jsP.option.resizable);

        } else if (jsP.option.resizable === 'disabled') {

            // jquery ui resizable initialize disabled to allow to query status
            jsP.resizable({ disabled: true });
            $('.ui-icon-gripsmall-diagonal-se, .ui-resizable-handle.ui-resizable-sw', jsP).css({'background-image': 'none', 'text-indent': -9999});
            $('.ui-resizable-handle', jsP).css({'cursor': 'inherit'});

        }

        jsP.on("resize", () => jsP.contentResize() );

        /* option.rtl | default: false - needs to be after option.resizable ----------------------------------------- */
        if (jsP.option.rtl.rtl === true) {

            $('.jsPanel-hdr, .jsPanel-headerbar, .jsPanel-titlebar, .jsPanel-controlbar, .jsPanel-hdr-toolbar, .jsPanel-ftr', jsP).addClass('jsPanel-rtl');

            [ jsP.header.title, jsP.content, $("*", jsP.header.toolbar), $("*", jsP.footer) ].forEach( item => {

                item.prop('dir', 'rtl');
                if (jsP.option.rtl.lang) {item.prop('lang', jsP.option.rtl.lang);}

            });

            $('.ui-icon-gripsmall-diagonal-se', jsP).css({backgroundImage: 'none', textIndent: -9999});

        }

        /* option.show ---------------------------------------------------------------------------------------------- */
        if (typeof jsP.option.show === "string") {jsP.addClass(jsP.option.show).css('opacity', 1);} //extra call to jQuery.css() needed for EDGE

        /* option.headerTitle | needs to be late in the file! ------------------------------------------------------- */
        jsP.header.title.empty().prepend(jsP.option.headerTitle);

        /* VARIOUS EVENT HANDLERS ----------------------------------------------------------------------------------- */
        // handler to move panel to foreground
        jsP[0].addEventListener('mousedown', (e) => {

            let zi = $(e.target).closest('.jsPanel').css('z-index');

            if (!jsP.hasClass("jsPanel-modal") && zi <= jsPanel.zi) { jsP.front(e.target); }

        }, false);

        jsPanel.updateCachedData(jsP);

        /* option.setstatus ----------------------------------------------------------------------------------------- */
        if (typeof jsP.option.setstatus === 'string') {

            (jsP.option.setstatus === 'maximize smallify') ? jsP.maximize().smallify() : jsP[jsP.option.setstatus]();

        }

        /* option.autoclose | default: false ------------------------------------------------------------------------ */
        if (typeof jsP.option.autoclose === 'number' && jsP.option.autoclose > 0) {

            window.setTimeout(() => {

                if (jsP) {jsP.close();}

            }, jsP.option.autoclose);

        }

        // handlers to normalize a panel and reset controls when resizing a smallified panel with mouse
        jsP.on("resizestart", function () {
            oW = jsP.outerWidth();
            oH = jsP.outerHeight();
        });
        // but only when panel height changed (it's possible to resize only width of smallified panel)
        jsP.on("resizestop", function () {
            if (jsP.outerWidth() !== oW && jsP.outerHeight() === oH) {
                jsPanel.hideControls(".jsPanel-btn-maximize, .jsPanel-btn-smallify", jsP);
                jsP.data('status', 'smallified');
                $(document).trigger('jspanelsmallified', id);
                $(document).trigger('jspanelstatuschange', id);
                if ($.isFunction(jsP.option.onsmallified)) {jsP.option.onsmallified.call(jsP, jsP);}
            } else if (jsP.outerHeight() !== oH) {
                jsPanel.hideControls(".jsPanel-btn-normalize, .jsPanel-btn-smallifyrev", jsP);
                jsP.data('status', 'normalized');
                $(document).trigger('jspanelnormalized', id);
                $(document).trigger('jspanelstatuschange', id);
                if ($.isFunction(jsP.option.onnormalized)) {jsP.option.onnormalized.call(jsP, jsP);}
            }
        });

        /* adding a few methods/props directly to the HTMLElement --------------------------------------------------- */
        jsP[0].jspanel = {
            options: jsP.option,
            close() { jsP.close(); },
            normalize() {
                jsP.normalize();
                return jsP;
            },
            maximize() {
                jsP.maximize();
                return jsP;
            },
            minimize() {
                jsP.minimize();
                return jsP;
            },
            smallify() {
                jsP.smallify();
                return jsP;
            },
            front(target) {jsP.front(target);
                return jsP;
            },
            closeChildpanels() {
                jsP.closeChildpanels();
                return jsP;
            },
            reposition(pos) {
                jsP.reposition(pos);
                return jsP;
            },
            resize(w,h) {
                jsP.resize(w,h);
                return jsP;
            },
            contentResize() {jsP.contentResize();
                return jsP;
            },
            contentReload() {
                jsP.contentReload();
                return jsP;
            },
            headerTitle(text) {
                jsP.headerTitle(text);
                return jsP;
            },
            headerControl(ctrl, action) {
                jsP.headerControl(ctrl, action);
                return jsP;
            },
            toolbarAdd(place, tb) {
                jsP.toolbarAdd(place, tb);
                return jsP;
            },
            setTheme(theme) {
                jsP.setTheme(theme);
                return jsP;
            },
            noop() {
                return jsP; // used in jsPanel.activePanels.getPanel()
            }
        };
        // sample:          document.getElementById('jsPanel-1').jspanel.close();
        // or:              document.querySelector('#jsPanel-1').jspanel.close();
        // or using jquery: $('#jsPanel-1')[0].jspanel.close();

        /* jsP.option.callback -------------------------------------------------------------------------------------- */
        if (jsP.option.callback && $.isFunction(jsP.option.callback)) {

            jsP.option.callback.call(jsP, jsP);

        } else if ($.isArray(jsP.option.callback)) {

            jsP.option.callback.forEach(item => {

                if ($.isFunction(item)) {item.call(jsP, jsP);}

            });

        }

        return jsP;

    };

    $.jsPanel.defaults = {
        "autoclose": false,
        "border": false,
        "callback": false,
        "container": 'body',
        "content": false,
        "contentAjax": false,
        "contentIframe": false,
        "contentOverflow": 'hidden',
        "contentSize": {
            width: 400,
            height: 200
        },
        "custom": false,
        "dblclicks": false,
        "draggable": {
            handle: 'div.jsPanel-hdr, div.jsPanel-ftr',
            opacity: 0.8
        },
        "footerToolbar": false,
        "headerControls": {
            close: false,
            maximize: false,
            minimize: false,
            normalize: false,
            smallify: false,
            controls: 'all',
            iconfont: 'jsglyph'
        },
        "headerRemove": false,
        "headerTitle": 'jsPanel',
        "headerToolbar": false,
        "id": () => `jsPanel-${jsPanel.id += 1}`,
        "load": false,
        "maximizedMargin": {
            top: 5,
            right: 5,
            bottom: 5,
            left: 5
        },
        "onbeforeclose": false,
        "onbeforemaximize": false,
        "onbeforeminimize": false,
        "onbeforenormalize": false,
        "onclosed": false,
        "onmaximized": false,
        "onminimized": false,
        "onnormalized": false,
        "onbeforeresize": false,
        "onresized": false,
        "onsmallified": false,
        "onunsmallified": false,
        "onfronted": false,
        "paneltype": false,
        "position": {
            my: 'center',
            at: 'center'
            // all other defaults are set in jsPanel.position()
        },
        "resizable": {
            handles: 'n, e, s, w, ne, se, sw, nw',
            autoHide: false,
            minWidth: 40,
            minHeight: 40
        },
        "rtl": false,
        "setstatus": false,
        "show": false,
        "template": false,
        "theme": 'default'
    };

    $.jsPanel.modaldefaults = {
        "draggable": 'disabled',
        "headerControls": {controls: "closeonly"},
        "position": {
            my: 'center',
            at: 'center'
        },
        "resizable": 'disabled'
    };

    $.jsPanel.tooltipdefaults = {
        "draggable": false,
        "headerControls": {controls: "closeonly"},
        "position": {fixed: false},
        "resizable": false
    };

    $.jsPanel.hintdefaults = {
        "autoclose": 8000,
        "draggable": false,
        "headerControls": {controls: "closeonly"},
        "resizable": false
    };

    /* body click handler: remove all tooltips on click in body except click is inside a jsPanel or trigger of tooltip */
    $(document).ready(function () {

        document.body.addEventListener('click', e => {
            let isTT = $(e.target).closest('.jsPanel').length;
            if (isTT < 1 && !$(e.target).hasClass('hasTooltip')) {
                jsPanel.closeTooltips();
                $('.hasTooltip').removeClass('hasTooltip');
            }
        }, false);

        $(document.body).append("<div id='jsPanel-replacement-container'>");

    });

}(jQuery));
