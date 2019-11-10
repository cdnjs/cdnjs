/*
 *  tabellajs - v0.4.1
 *  2016-11-09
 *
 *  https://github.com/iliketomatoes/tabellajs
 */

/*
 *  Copyright (C) 2014-2016  Interpromotion <info@interpromotion.com>
 *  Copyright (C) 2014-2016  Giancarlo Soverini <giancarlosoverini@gmail.com>
 *
 *  This file is part of Tabellajs.
 *
 *  Tabellajs is free software: you can redistribute it and/or modify
 *  it under the terms of the GNU Affero General Public License as
 *  published by the Free Software Foundation, either version 3 of the
 *  License, or (at your option) any later version.
 *
 *  Tabellajs is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU Affero General Public License for more details.
 *
 *  You should have received a copy of the GNU Affero General Public License
 *  along with this program.  If not, see <http://www.gnu.org/licenses/>
 */

(function(tabella, window, document) {

		'use strict';

    if (typeof define === 'function' && define.amd) {
        // Register Tabella as an AMD module
        define(tabella);
    } else {
        // Register Tabella on window
        window.Tabella = tabella();
    }

})(function() {

        'use strict';

function classReg(className) {
    return new RegExp("(^|\\s+)" + className + "(\\s+|$)");
}

// classList support for class management
// altho to be fair, the api sucks because it won't accept multiple classes at once
var hasClass, addClass, removeClass;

if ('classList' in document.documentElement) {
    hasClass = function(elem, c) {
        return elem.classList.contains(c);
    };
    addClass = function(elem, c) {
        elem.classList.add(c);
    };
    removeClass = function(elem, c) {
        elem.classList.remove(c);
    };
} else {
    hasClass = function(elem, c) {
        return classReg(c).test(elem.className);
    };
    addClass = function(elem, c) {
        if (!hasClass(elem, c)) {
            elem.className = elem.className + ' ' + c;
        }
    };
    removeClass = function(elem, c) {
        elem.className = elem.className.replace(classReg(c), ' ');
    };
}

function toggleClass(elem, c) {
    var fn = hasClass(elem, c) ? removeClass : addClass;
    fn(elem, c);
}

var classie = {
    // full names
    hasClass: hasClass,
    addClass: addClass,
    removeClass: removeClass,
    toggleClass: toggleClass,
    // short names
    has: hasClass,
    add: addClass,
    remove: removeClass,
    toggle: toggleClass
};

function extend(a, b) {
    for (var key in b) {
        if (b.hasOwnProperty(key)) {
            a[key] = b[key];
        }
    }
    return a;
}

//http://stackoverflow.com/questions/7212102/detect-with-javascript-or-jquery-if-css-transform-2d-is-available
function getSupportedTransform() {
    var prefixes = 'transform WebkitTransform MozTransform OTransform msTransform'.split(' ');
    for (var i = 0; i < prefixes.length; i++) {
        if (document.createElement('div').style[prefixes[i]] !== undefined) {
            return prefixes[i];
        }
    }
    return false;
}

function createHTMLEl(htmlEl, className, parent, htmlContent) {
    var el = document.createElement(htmlEl);
    el.className = className;
    if (!!htmlContent) el.innerHTML = htmlContent;
    parent.appendChild(el);
    return el;
}

function getArray(nodeList) {
    return Array.prototype.slice.call(nodeList, 0);
}

function setListener(elm, events, callback) {
    var eventsArray = events.split(' '),
        i = eventsArray.length;

    while (i--) {
        elm.addEventListener(eventsArray[i], callback, false);
    }
}

function invokeCallback(cb, cbContext) {
    var context = cbContext || null,
        params = Array.prototype.slice.call(arguments, 2);
    return cb.apply(context, params);
}

function getReboundTime(space, speed) {
    return Math.round((Math.abs(space) / speed) * 1000);
}

/**
 * Determine if an element is partially in the viewport
 *
 * @param {HTMLElement} el
 */
function isElementPartiallyInViewport(el, bottomThreshold) {

    var rect = el.getBoundingClientRect(),
        threshold = bottomThreshold || 0;

    return (rect.top <= 0 && rect.bottom >= threshold);
}

/**
 * Determine if an element is completely in the viewport
 *
 * @param {HTMLElement} el
 */
function isElementCompletelyInViewport(el) {

    var rect = el.getBoundingClientRect();

    return (rect.top >= 0 && rect.top <= (window.innerHeight || document.documentElement.clientHeight) && rect.bottom >= 0 && rect.bottom <= (window.innerHeight || document.documentElement.clientHeight));
}

function TabellaException(value) {
	    this.value = value;
	    this.message = "Tabella.js error: ";
	    this.toString = function() {
	        return this.message + this.value;
	    };
	}

//Check the supported vendor prefix for transformations
var vendorTransform = getSupportedTransform();

//from http://easeings.net/
var easeingObj = {
    easeInSine: [0.47, 0, 0.745, 0.715],
    easeOutSine: [0.39, 0.575, 0.565, 1],
    easeInOutSine: [0.445, 0.05, 0.55, 0.95],
    easeInQuad: [0.55, 0.085, 0.68, 0.53],
    easeOutQuad: [0.25, 0.46, 0.45, 0.94],
    easeInOutQuad: [0.455, 0.03, 0.515, 0.955],
    easeInCubic: [0.55, 0.055, 0.675, 0.19],
    easeOutCubic: [0.215, 0.61, 0.355, 1],
    easeInOutCubic: [0.645, 0.045, 0.355, 1],
    easeInQuart: [0.895, 0.03, 0.685, 0.22],
    easeOutQuart: [0.165, 0.84, 0.44, 1],
    easeInOutQuart: [0.77, 0, 0.175, 1],
    easeInQuint: [0.755, 0.05, 0.855, 0.06],
    easeOutQuint: [0.23, 1, 0.32, 1],
    easeInOutQuint: [0.86, 0, 0.07, 1],
    easeInExpo: [0.95, 0.05, 0.795, 0.035],
    easeOutExpo: [0.19, 1, 0.22, 1],
    easeInOutExpo: [1, 0, 0, 1],
    easeInCirc: [0.6, 0.04, 0.98, 0.335],
    easeOutCirc: [0.075, 0.82, 0.165, 1],
    easeInOutCirc: [0.785, 0.135, 0.15, 0.86],
    easeInBack: [0.6, -0.28, 0.735, 0.045],
    easeOutBack: [0.175, 0.885, 0.32, 1.275],
    easeInOutBack: [0.68, -0.55, 0.265, 1.55],
};

var lastTime = 0;

//rAF polyfill
if (!window.requestAnimationFrame)
    window.requestAnimationFrame = function(callback) {
        var currTime = new Date().getTime();
        var timeToCall = Math.max(0, 16 - (currTime - lastTime));
        var id = window.setTimeout(function() {
                callback(currTime + timeToCall);
            },
            timeToCall);
        lastTime = currTime + timeToCall;
        return id;
    };

if (!window.cancelAnimationFrame)
    window.cancelAnimationFrame = function(id) {
        clearTimeout(id);
    };

var requestAnimationFrame = window.mozRequestAnimationFrame ||
    window.webkitRequestAnimationFrame || window.oRequestAnimationFrame || window.requestAnimationFrame;

var cancelAnimationFrame = window.mozCancelAnimationFrame || window.cancelAnimationFrame;

var Animator = {
    easeing: 'easeInOutSine',

    animated: false,

    dragged: null,

    getAnimationCurve: function(duration, easeing) {
        var epsilon = (1000 / 60 / duration) / 4;

        return getBezier(easeing, epsilon);
    },

    actualAnimation: function(el, offset, duration, animationCurve, startingOffset, lastElement) {

        var self = this,
            targetOffset = startingOffset - offset,
            start = null,
            myReq;

        function animationStep(timestamp) {

            if (start === null) start = timestamp;

            var timePassed = (timestamp - start);
            var progress = timePassed / duration;

            if (progress >= 1) progress = 1;

            var delta = animationCurve(progress).toFixed(2);

            self.step(el, delta, startingOffset, targetOffset);

            if (progress === 1) {
                cancelAnimationFrame(myReq);
                start = null;
                if (lastElement) self.animated = false;
            } else {
                requestAnimationFrame(animationStep);
            }

        }

        myReq = requestAnimationFrame(animationStep);

    },

    step: function(el, delta, startingOffset, targetOffset) {
        this.offset(el, parseInt(startingOffset) + parseInt((targetOffset - startingOffset) * delta));
    },

    offset: function(elem, length) {

        if (typeof length === 'undefined') {

            if (vendorTransform) {
                /**
                 * @return {Number} the x offset of the translation
                 */
                var parsedXOffset = elem.style[vendorTransform] ? elem.style[vendorTransform].match(/-?\d+/g)[0] : 0;

                return parsedXOffset;
            } else {
                return elem.style.left;
            }

        } else {
            if (vendorTransform) {
                elem.style[vendorTransform] = 'translate(' + length + 'px, 0px)';
            } else {
                elem.style.left = length + 'px';
            }
        }
    },

    animate: function(target, offset, duration, easeing) {

        var self = this,
            easeingVar = easeing || self.easeing;

        var actualEaseing = getEaseing(easeingVar);

        if (self.animated) return false;
        self.animated = true;

        var animationCurve = self.getAnimationCurve(duration, actualEaseing);

        target.forEach(function(el, index, array) {

            if (index + 1 === array.length) {
                self.actualAnimation(el, offset, duration, animationCurve, self.offset(el), true);
            } else {
                self.actualAnimation(el, offset, duration, animationCurve, self.offset(el));
            }

        });

        return true;

    },

    resetRows: function(target) {
        var self = this;

        target.forEach(function(el) {
            self.offset(el, 0);
        });

        self.animated = false;

        return true;
    },

    drag: function(target, length) {
        var self = this;

        if (self.animated) return false;

        target.forEach(function(el) {
            self.dragged = requestAnimationFrame(function() {
                self.offset(el, length);
            });
        });

    },

    stopDragging: function() {
        var self = this;
        cancelAnimationFrame(self.dragged);
    }

};


/*
====================================================
FUNCTIONS DEALING WITH THE ACTUAL SLIDING ANIMATION
====================================================*/
function getEaseing(easeing) {
    return easeingObj.hasOwnProperty(easeing) ? easeingObj[easeing] : easeingObj.easeInOutSine;
}

function getBezier(easeingArr, epsilon) {
    return bezier(easeingArr[0], easeingArr[1], easeingArr[2], easeingArr[3], epsilon);
}

// from https://github.com/arian/cubic-bezier
function bezier(x1, y1, x2, y2, epsilon) {

    var curveX = function(t) {
        var v = 1 - t;
        return 3 * v * v * t * x1 + 3 * v * t * t * x2 + t * t * t;
    };

    var curveY = function(t) {
        var v = 1 - t;
        return 3 * v * v * t * y1 + 3 * v * t * t * y2 + t * t * t;
    };

    var derivativeCurveX = function(t) {
        var v = 1 - t;
        return 3 * (2 * (t - 1) * t + v * v) * x1 + 3 * (-t * t * t + 2 * v * t) * x2;
    };

    return function(t) {
        var x = t,
            t0, t1, t2, x2, d2, i;

        // First try a few iterations of Newton's method -- normally very fast.
        for (t2 = x, i = 0; i < 8; i++) {
            x2 = curveX(t2) - x;
            if (Math.abs(x2) < epsilon) return curveY(t2);
            d2 = derivativeCurveX(t2);
            if (Math.abs(d2) < 1e-6) break;
            t2 = t2 - x2 / d2;
        }

        t0 = 0;
        t1 = 1;
        t2 = x;

        if (t2 < t0) return curveY(t0);
        if (t2 > t1) return curveY(t1);
        // Fallback to the bisection method for reliability.
        while (t0 < t1) {
            x2 = curveX(t2);
            if (Math.abs(x2 - x) < epsilon) return curveY(t2);
            if (x > x2) t0 = t2;
            else t1 = t2;
            t2 = (t1 - t0) * 0.5 + t0;
        }
        // Failure
        return curveY(t2);
    };
}

var msEventType = function(type) {
        var lo = type.toLowerCase(),
            ms = 'MS' + type;
        return window.navigator.msPointerEnabled ? ms : lo;
    },
    touchEvents = {
        start: msEventType('PointerDown') + ' touchstart mousedown',
        end: msEventType('PointerUp') + ' touchend mouseup',
        move: msEventType('PointerMove') + ' touchmove mousemove'
    },
    getPointerEvent = function(event) {
        return event.targetTouches ? event.targetTouches[0] : event;
    };

var Toucher = {

    points: {
        cachedX: null,
        cachedY: null,
        currX: null,
        currY: null
    },

    touchStarted: false,

    touchEvents: touchEvents,

    getPointerEvent: getPointerEvent,

    onTouchStart: function(e) {

        var self = this,
            pointer = self.getPointerEvent(e);

        // caching the current x
        self.points.cachedX = self.points.currX = pointer.pageX;
        // caching the current y
        self.points.cachedY = self.points.currY = pointer.pageY;
        // a touch event is detected
        self.touchStarted = true;

        return self.points;

    },

    onTouchEnd: function() {

        var self = this,
            deltaY = self.points.cachedY - self.points.currY,
            deltaX = self.points.cachedX - self.points.currX;

        self.touchStarted = false;

        return {
            deltaX: deltaX,
            deltaY: deltaY
        };

    },

    onTouchMove: function(e) {
        var self = this;

        if (self.touchStarted === false) return false;

        var pointer = self.getPointerEvent(e);

        self.points.currX = pointer.pageX;
        self.points.currY = pointer.pageY;

        //We just want horizontal movements
        if (Math.abs(self.points.cachedY - self.points.currY) >= (Math.abs(self.points.cachedX - self.points.currX) / 2)) return false;

        return self.points;
    }
};

/*
	SCHEMA:

	*---------------------------------------------------------------------------------------------*
	| container                                                                                   |
	| *-----------------------------------------------------------------------------------------* |
	| | .t-row   /// first row has: .t-first-row                                                | |
	| | *-------------------------------------------------------------------------------------* | |
	| | | .t-row-header /// OPTIONAL                                                          | | |
	| | *-------------------------------------------------------------------------------------* | |
	| |	*-------------------------------------------------------------------------------------* | |
	| | | .t-row-content-wrapper  /// Overflow : hidden                                       | | |
	| | | *---------------------------------------------------------------------------------* | | |
	| | | | .t-row-content                                                                  | | | |
	| | | | *------------------------* *--------------------------------------------------* | | | |
	| | | | | .t-row-desc            | | .t-row-values                                    | | | | |
	| | | | | *--------------------* | | *----------------------------------------------* | | | | |
	| | | |	| | .t-element	       | | | |  .t-sliding-row   <<<<<< SLIDING PART >>>>>> | | | | | |
	| | | | | | *----------------* | | | | *------------------------------------------* | | | | | |
	| | | | | |	| .t-cell-desc-l | | | | | | .t-row-cell                              | | | | | | |
	| | | | | |	*----------------* | | | | | *--------------------------------------* | | | | | | |
	| | | | | *--------------------* | | | | | .t-element                           | | | | | | | |
	| | | | |					               | | | | | *----------------* *---------------* | | | | | | | |
	| | | | | 					             | | | | | |.t-cell-desc-s  | | .t-cell-value | | | | | | | | |
	| | | | |  						           | | | | | *----------------* *---------------* | | | | | | | |
	| | | | |						             | | | | *--------------------------------------* | | | | | | |
	| | | | |                     	 | | | *------------------------------------------* | | | | | |
	| | | | |                        | | *----------------------------------------------* | | | | |
	| | | | *------------------------* *--------------------------------------------------* | | | |
	| | | *---------------------------------------------------------------------------------* | | |
	| | *-------------------------------------------------------------------------------------* | |
	| *-----------------------------------------------------------------------------------------* |
	*---------------------------------------------------------------------------------------------*

	*/

	var TabellaBuilder = {

	    setUpTableHeader: function(el, options) {

	        var tableHeader = options.tableHeader,
	            docfrag = document.createDocumentFragment(),
	            tRow,
							tRowDesc,
							tEl;

	        try {

	            if (tableHeader instanceof Array && tableHeader.length) {

	                //Table header row's container
	                var fixedHeader = createHTMLEl('div', 't-fixed-header', docfrag);

	                tRow = createHTMLEl('div', 't-row t-first-row', fixedHeader);

	                var tRowContentWrapper = createHTMLEl('div', 't-row-content-wrapper', tRow);

	                var tRowContent = createHTMLEl('div', 't-row-content', tRowContentWrapper);

	                var tRowDescHTML = '<div class="t-element">';
	                tRowDescHTML += '<div class="t-cell-desc-l">';
	                tRowDescHTML += options.from;

	                if (typeof tableHeader[0][1] !== 'undefined') {
	                    tRowDescHTML += '<span class="t-header-devider">' + options.headerRowDevider + '</span>';
	                    tRowDescHTML += options.to;
	                }

	                tRowDescHTML += '</div>';
	                tRowDescHTML += '</div>';

	                tRowDesc = createHTMLEl('div', 't-row-desc', tRowContent, tRowDescHTML);

	                var tRowValues = createHTMLEl('div', 't-row-values', tRowContent);

	                var tSlidingRow = createHTMLEl('div', 't-sliding-row', tRowValues);

	                for (var i = 0; i < tableHeader.length; i++) {

	                    var tRowCell = document.createElement('div');
	                    tRowCell.className = 't-row-cell';

	                    //From - to Div
	                    var tableHeaderCellHTML = '<div class="t-cell-desc-s">';
	                    tableHeaderCellHTML += options.from;
	                    if (typeof tableHeader[i][1] !== 'undefined') {
	                        tableHeaderCellHTML += '<span class="t-header-devider">' + options.headerRowDevider + '</span>';
	                        tableHeaderCellHTML += options.to;
	                    }
	                    tableHeaderCellHTML += '</div>';

	                    //Table headr cell actual value
	                    tableHeaderCellHTML += '<div class="t-cell-value t-bold">';
	                    tableHeaderCellHTML += typeof tableHeader[i][0] !== 'undefined' ? tableHeader[i][0] : 'not set';
	                    if (typeof tableHeader[i][1] !== 'undefined') {
	                        tableHeaderCellHTML += '<span class="t-header-devider">' + options.headerRowDevider + '</span>';
	                        tableHeaderCellHTML += tableHeader[i][1];
	                    }
	                    tableHeaderCellHTML += '</div>';

	                    tEl = createHTMLEl('div', 't-element', tRowCell, tableHeaderCellHTML);

	                    tSlidingRow.appendChild(tRowCell);

	                }

	                el.appendChild(docfrag);


	            } else {
	                throw new TabellaException('tableHeader is not an Array');
	            }

	        } catch (err) {

	            tRow = false;
	            console.error(err.toString());

	        } finally {
	            return tRow;
	        }
	    },

	    setUpRows: function(el, options) {

	        var tableHeader = options.tableHeader,
	            rows = options.rows,
	            numberOfRows = rows.length,
							tHeader,
							tRowDesc,
							tEl;

	        var docfrag = document.createDocumentFragment();

	        if (numberOfRows > 0) {

	            for (var i = 0; i < numberOfRows; i++) {

	                var tRow = createHTMLEl('div', 't-row', docfrag);

	                if (!!rows[i].rowHeader) {
	                    tHeader = createHTMLEl('section', 't-row-header', tRow, rows[i].rowHeader);
	                }

	                if (!!rows[i].rowVal) {

	                    for (var j = 0; j < rows[i].rowVal.length; j++) {

	                        var tRowContentWrapper = createHTMLEl('div', 't-row-content-wrapper', tRow);

	                        var tRowContent = createHTMLEl('div', 't-row-content', tRowContentWrapper);

	                        var tRowDescHTML = '<div class="t-element">';
	                        tRowDescHTML += '<div class="t-cell-desc-l">';
	                        tRowDescHTML += (typeof rows[i].rowDesc !== 'undefined' && !!rows[i].rowDesc[j]) ? rows[i].rowDesc[j] : '';
	                        tRowDescHTML += '</div>';
	                        tRowDescHTML += '</div>';

	                        var descClass = 't-row-desc';
	                        if (j >= 1) descClass += ' t-cell-border-top';

	                        tRowDesc = createHTMLEl('div', descClass, tRowContent, tRowDescHTML);


	                        var tRowValues = createHTMLEl('div', 't-row-values', tRowContent);

	                        var tSlidingRow = createHTMLEl('div', 't-sliding-row', tRowValues);

	                        for (var k = 0; k < tableHeader.length; k++) {

	                            var tRowCell = document.createElement('div');

	                            var cellClass = 't-row-cell';
	                            if (j >= 1) cellClass += ' t-cell-border-top';

	                            tRowCell.className = cellClass;

	                            var cellHTML = '';

	                            //Cell description
	                            if (typeof rows[i].rowDesc !== 'undefined' && !!rows[i].rowDesc[j]) {

	                                cellHTML += '<div class="t-cell-desc-s">';

	                                cellHTML += rows[i].rowDesc[j];

	                                cellHTML += '</div>';
	                            }

	                            //Item current value
	                            cellHTML += '<div class="t-cell-value">';

	                            if (typeof rows[i].rowVal[j][k] !== 'undefined') {

	                                cellHTML += rows[i].rowVal[j][k];

	                                //If it's a number we add the currency
	                                if (!isNaN(rows[i].rowVal[j][k])) {
	                                    cellHTML += ' ' + options.currency;
	                                }

	                            } else {
	                                cellHTML += options.emptyCell;
	                            }
	                            cellHTML += '</div>';


	                            tEl = createHTMLEl('div', 't-element', tRowCell, cellHTML);

	                            tSlidingRow.appendChild(tRowCell);
	                        }
	                    }
	                }
	            }

	            el.appendChild(docfrag);

	            return numberOfRows;

	        } else {

	            return false;

	        }

	    },

	    setUpArrows: function(tableHeaderRow) {

	        // create svg
	        var svgURI = 'http://www.w3.org/2000/svg';
	        var svgLeft = document.createElementNS(svgURI, 'svg');
	        // SVG attributes, like viewBox, are camelCased. That threw me for a loop
	        svgLeft.setAttribute('viewBox', '0 0 100 100');
	        // create arrow
	        var pathLeft = document.createElementNS(svgURI, 'path');
	        pathLeft.setAttribute('d', 'M 50,0 L 60,10 L 20,50 L 60,90 L 50,100 L 0,50 Z');
	        pathLeft.setAttribute('transform', 'translate(15,0)');
	        // add class so it can be styled with CSS
	        pathLeft.setAttribute('class', 't-svg-arrow');
	        svgLeft.appendChild(pathLeft);
	        // add svg to page
	        var svgRight = document.createElementNS(svgURI, 'svg');
	        // SVG attributes, like viewBox, are camelCased. That threw me for a loop
	        svgRight.setAttribute('viewBox', '0 0 100 100');
	        // create arrow
	        var pathRight = document.createElementNS(svgURI, 'path');
	        pathRight.setAttribute('d', 'M 50,0 L 60,10 L 20,50 L 60,90 L 50,100 L 0,50 Z');
	        // add class so it can be styled with CSS
	        pathRight.setAttribute('class', 't-svg-arrow');
	        pathRight.setAttribute('transform', 'translate(85,100) rotate(180)');
	        svgRight.appendChild(pathRight);

	        var arrowRight = createHTMLEl('div', 't-arr-right t-hide', tableHeaderRow);

	        var arrowLeft = createHTMLEl('div', 't-arr-left t-hide', tableHeaderRow);

	        arrowRight.appendChild(svgRight);

	        arrowLeft.appendChild(svgLeft);

	        return {
	            arrowRight: arrowRight,

	            arrowLeft: arrowLeft
	        };

	    }

	};

function Tabella(el, options) {
    var self = this;

    var defaults = {
        tableHeader: null,
        rows: null,
        /**
         * BREAKPOINTS :
         * 1st element in array is the row width,
         * the 2nd is the number of cells to be shown
         * Default breakpoint is from [0,1], just one element is shown
         */
        cellBreakpoints: {
            default: [0, 1],
            small: [360, 2],
            medium: [640, 3],
            large: [820, 4],
            xlarge: [1080, 5]
        },
        /**
         * DESCRIPTION BREAKPOINTS :
         * 1st element in array is the row width,
         * the 2nd is the description cell width,
         * Default breakpoint is from [0,0]
         */
        descBreakpoints: {
            default: [0, 0],
            medium: [460, 160],
            large: [900, 200]
        },
        from: 'from',
        to: 'to',
        currency: '&euro;',
        easing: 'easeInOutSine',
        duration: 600,
        reboundSpeed: 300,
        edgeThreshold: 150,
        swipeThreshold: 60,
        swipeSingleTick: true,
        onRefreshSize: false,
        headerRowDevider: '-',
        emptyCell: 'not set',
        fixedHeader: true,
        fixedHeaderBottomThreshold: 80,
        fixedHeaderTop: '0'
    };

    try {

        if (typeof el !== 'undefined') {

            if (typeof options !== 'undefined') {

                self.options = extend(defaults, options);

                if (!self.options.tableHeader || !self.options.rows) {
                    throw new TabellaException('tableHeader or rows are undefined or null');
                }

            } else {

                throw new TabellaException('You did not pass any options to the constructor');
            }

        } else {
            throw new TabellaException('You did not pass a valid target element to the constructor');
        }

    } catch (err) {
        console.error(err.toString());
        return false;
    }

    self.tableHeaderRow = null;
    self.slidingRows = null;
    self.arrows = null;
    self.pointer = 0;
    //An object that has to hold the cellBreakpoint and descBreakpoint
    self.currentBreakpoint = {};
    self.currentCellWidth = 0;
    self.currentWindowWidth = window.innerWidth;

    self.el = el;

    self.tableHeaderRow = TabellaBuilder.setUpTableHeader(self.el, self.options);

    if (self.tableHeaderRow) {

        try {

            if (TabellaBuilder.setUpRows(self.el, self.options)) {

                self.arrows = TabellaBuilder.setUpArrows(self.tableHeaderRow);
                self.slidingRows = getArray(self.el.querySelectorAll('.t-sliding-row'));
                // Returns a function, that, as long as it continues to be invoked, will not
                // be triggered. The function will be called after it stops being called for
                // N milliseconds. If `immediate` is passed, trigger the function on the
                // leading edge, instead of the trailing.
                var debounce = function(func, wait, immediate) {
                    var timeout;

                    return function() {
                        var args = arguments;
                        var later = function() {
                            timeout = null;
                            if (!immediate) func.apply(self, args);
                        };
                        var callNow = immediate && !timeout;
                        clearTimeout(timeout);
                        timeout = setTimeout(later, wait);
                        if (callNow) func.apply(self, args);
                    };
                };

                var firstSet = function() {
                    self.currentBreakpoint = self.getBreakpoint();
                    self.currentCellWidth = self.getCellWidth(self.currentBreakpoint);
                    self.refreshSize();
                };

                if (typeof define === 'function' && define.amd) {
                    firstSet();
                } else {
                    window.addEventListener('load', debounce(firstSet, 50));
                }

                window.addEventListener('resize', debounce(self.refreshSize, 250));

                self.attachEvents();

            } else {
                throw new TabellaException('Number of rows is zero');
            }

        } catch (err) {
            console.error(err.toString());
            return false;
        }

    }

}

Tabella.prototype.attachEvents = function() {

    var self = this;

    Animator.easing = self.options.easing;

    self.arrows.arrowLeft.addEventListener('click', function() {
        self.move('left');
    });
    self.arrows.arrowRight.addEventListener('click', function() {
        self.move('right');
    });

    var position,
        cachedPosition,
        startingOffset,
        tableHeaderLength = self.options.tableHeader.length,
        slidingTableHeader = self.tableHeaderRow.querySelector('.t-sliding-row'),
        legalPosition = true,
        delta,
        currentCellWidth,
        tick = 0,
        startingPointer;

    self.slidingRows.forEach(function(el) {

        //setting the events listeners
        setListener(el, Toucher.touchEvents.start, function(e) {

            startingOffset = Animator.offset(slidingTableHeader);
            cachedPosition = Toucher.onTouchStart(e);
            currentCellWidth = parseInt(self.currentCellWidth);
            tick = 0;
            startingPointer = self.pointer;
        });

        setListener(el, Toucher.touchEvents.move, function(e) {

            position = Toucher.onTouchMove(e);

            if (position && legalPosition) {

                delta = position.currX - cachedPosition.cachedX;

                //Let's drag the sliding rows around
                Animator.drag(self.slidingRows, (delta + parseInt(startingOffset)));

                tick = Math.abs(Math.floor(delta / self.options.swipeThreshold));

                if (self.options.swipeSingleTick && tick >= 1) tick = 1;

                //Swipe right
                if (delta >= 0) {

                    if (self.pointer === 0) {

                        if (parseInt(Animator.offset(slidingTableHeader)) >= self.options.edgeThreshold) {
                            legalPosition = false;
                        }

                    } else {
                        self.pointer = startingPointer - tick;
                    }

                    //Swipe left
                } else {

                    if (self.pointer === tableHeaderLength - self.currentBreakpoint.cellBreakpoint[1] || tableHeaderLength < self.currentBreakpoint.cellBreakpoint[1]) {

                        var offset = Math.abs(parseInt(Animator.offset(slidingTableHeader)));

                        if (offset >= self.options.edgeThreshold + (currentCellWidth * self.pointer)) {
                            legalPosition = false;
                        }
                    } else {
                        self.pointer = startingPointer + tick;
                    }
                }
                cachedPosition = position;
            }
        });

        setListener(el, Toucher.touchEvents.end, function() {

            Toucher.onTouchEnd();
            startingOffset = 0;
            var offset = parseInt(Animator.offset(slidingTableHeader));
            self.resetDragging(parseInt(offset + self.pointer * currentCellWidth));
            legalPosition = true;
            self.updateArrows();
        });

    });


    /**
     * Handling scroll event for fixed header
     */

    if (self.options.fixedHeader) {
        setListener(window, 'scroll', function() {

            if (isElementCompletelyInViewport(self.el) && self.tableHeaderRow.getAttribute('data-position') === 'relative') {
                return false;
            }

            if (isElementCompletelyInViewport(self.el)) {
                self.unsetFixedHeader();
                return false;
            }

            if (isElementPartiallyInViewport(self.el, self.options.fixedHeaderBottomThreshold)) {

                //If the table is partially in the viewport we set the tableHeaderRow to fixed position
                self.setFixedHeader();

            } else {

                /**
                 * If table is out of viewport and tableHeaderRow isn't in fixed position we don't do anything.
                 * Otherwise we unset the tableHeaderRow
                 */
                if (self.tableHeaderRow.getAttribute('data-position') === 'relative') return false;

                self.unsetFixedHeader();
            }

        });
    }


};


Tabella.prototype.resetDragging = function(offset) {
    var self = this;
    Animator.stopDragging();
    Animator.animate(self.slidingRows, offset, getReboundTime(offset, self.options.reboundSpeed), 'easeOutBack');
};


/**
 * Setting fixed header
 */

Tabella.prototype.setFixedHeader = function() {

    var self = this;

    var fixedHeaderCtr = self.tableHeaderRow.parentElement;

    fixedHeaderCtr.style.width = fixedHeaderCtr.clientWidth + 'px';
    fixedHeaderCtr.style.height = fixedHeaderCtr.clientHeight + 'px';

    self.tableHeaderRow.style.top = self.options.fixedHeaderTop;
    self.tableHeaderRow.style.marginTop = 0;
    self.tableHeaderRow.style.width = fixedHeaderCtr.clientWidth + 'px';
    self.tableHeaderRow.style.height = fixedHeaderCtr.clientHeight + 'px';

    classie.add(self.tableHeaderRow, 't-shadow');

    self.tableHeaderRow.style.position = 'fixed';
    self.tableHeaderRow.setAttribute('data-position', 'fixed');
};


/**
 * Unsetting fixed header
 */

Tabella.prototype.unsetFixedHeader = function() {
    var self = this;

    self.tableHeaderRow.style.position = 'relative';
    self.tableHeaderRow.setAttribute('data-position', 'relative');

    classie.remove(self.tableHeaderRow, 't-shadow');

    var fixedHeaderCtr = self.tableHeaderRow.parentElement;

    fixedHeaderCtr.style.width = 'auto';
    fixedHeaderCtr.style.height = 'auto';

    self.tableHeaderRow.style.top = '';
    self.tableHeaderRow.style.marginTop = '';
    self.tableHeaderRow.style.width = 'auto';
    self.tableHeaderRow.style.height = 'auto';

};

Tabella.prototype.refreshSize = function() {
    var self = this,
        oldBreakpoint = self.currentBreakpoint,
        breakpoint = self.currentBreakpoint = self.getBreakpoint();

    var oldWindowdWidth = self.currentWindowWidth;
    self.currentWindowWidth = window.innerWidth;

    var oldCellWidth = self.currentCellWidth,
        cellWidth = self.currentCellWidth = self.getCellWidth(breakpoint),
        descWidth = breakpoint.descBreakpoint[1],
        tableHeaderLength = self.options.tableHeader.length;

    self.refreshArrowPosition(descWidth);

    //Unset fixed header before resizing everything
    if (self.options.fixedHeader && oldWindowdWidth !== self.currentWindowWidth) self.unsetFixedHeader();

    var rows = getArray(self.el.querySelectorAll('.t-row'));

    rows.forEach(function(el) {

        var tContent = getArray(el.querySelectorAll('.t-row-content'));

        if (breakpoint.descBreakpoint[1] > 0) {

            tContent.forEach(function(el) {

                el.style.width = descWidth + (tableHeaderLength * cellWidth) + 'px';

                var tDescL = el.querySelector('.t-row-desc');

                tDescL.style.width = descWidth + 'px';

                classie.remove(tDescL, 't-hide');

                getArray(el.querySelectorAll('.t-row-cell')).forEach(function(el) {
                    el.style.width = cellWidth + 'px';
                });

                getArray(el.querySelectorAll('.t-cell-desc-s')).forEach(function(innerEl) {
                    classie.add(innerEl, 't-hide');
                });

            });

        } else {

            tContent.forEach(function(el) {

                el.style.width = (tableHeaderLength * cellWidth) + 'px';

                classie.add(el.querySelector('.t-row-desc'), 't-hide');

                getArray(el.querySelectorAll('.t-row-cell')).forEach(function(el) {
                    el.style.width = cellWidth + 'px';
                });

                getArray(el.querySelectorAll('.t-cell-desc-s')).forEach(function(innerEl) {
                    classie.remove(innerEl, 't-hide');
                });

            });

        }

    });

    if (self.pointer > 0) {
        if (oldBreakpoint.cellBreakpoint[0] != breakpoint.cellBreakpoint[0] ||
            oldBreakpoint.descBreakpoint[1] != breakpoint.descBreakpoint[1]) {
            self.move();
        } else {
            if (oldCellWidth != cellWidth) {
                self.move(parseInt(cellWidth - oldCellWidth) * parseInt(self.pointer));
            }
        }
    }

    if (typeof self.options.onRefreshSize === 'function') {
        invokeCallback(self.options.onRefreshSize, self);
    }

    /**
     * Vertical centering the arrows
     */
    self.arrowsCentering();

};

Tabella.prototype.getCellWidth = function(breakpoint) {
    var self = this,
        numberOfCells = self.options.tableHeader.length,
        cellBreakpoint = breakpoint.cellBreakpoint,
        descBreakpoint = breakpoint.descBreakpoint,
        cellWidth;

    if (cellBreakpoint[1] > numberOfCells) {
        cellWidth = (self.el.clientWidth - descBreakpoint[1]) / numberOfCells;
    } else {
        cellWidth = (self.el.clientWidth - descBreakpoint[1]) / cellBreakpoint[1];
    }

    return Math.round(cellWidth);
};

Tabella.prototype.getBreakpoint = function() {

    var self = this,
        minWidth = 0,
        containerWidth = self.el.clientWidth,
        cellBreakpoints = self.options.cellBreakpoints,
        descBreakpoints = self.options.descBreakpoints;

    var cellBreakpoint = [0, 1],
        descBreakpoint = [0, 0];

    for (var cbp in cellBreakpoints) {

        var cbpWidth = cellBreakpoints[cbp][0];

        if (typeof cbpWidth === 'number' && cbpWidth > 0 && cbpWidth <= containerWidth) {

            if (Math.abs(containerWidth - cbpWidth) < Math.abs(containerWidth - minWidth)) {
                minWidth = cbpWidth;
                cellBreakpoint = cellBreakpoints[cbp];
            }

        }

    }

    minWidth = 0;

    for (var dbp in descBreakpoints) {

        var dbpWidth = descBreakpoints[dbp][0];

        if (typeof dbpWidth === 'number' && dbpWidth > 0 && dbpWidth <= containerWidth) {

            if (Math.abs(containerWidth - dbpWidth) < Math.abs(containerWidth - minWidth)) {
                minWidth = dbpWidth;
                descBreakpoint = descBreakpoints[dbp];
            }

        }

    }

    return {
        cellBreakpoint: cellBreakpoint,
        descBreakpoint: descBreakpoint
    };
};

Tabella.prototype.refreshArrowPosition = function(descriptionWidth) {

    var self = this,
        descWidth = descriptionWidth || self.currentBreakpoint.descBreakpoint[1];

    self.arrows.arrowLeft.style.left = descWidth + 'px';
    self.updateArrows();
};

Tabella.prototype.updateArrows = function() {

    var self = this,
        breakpoint = self.currentBreakpoint || self.getBreakpoint(),
        tableHeaderLength = self.options.tableHeader.length;

    if (tableHeaderLength > breakpoint.cellBreakpoint[1]) {

        if (self.pointer === 0) {
            classie.add(self.arrows.arrowLeft, 't-hide');
            classie.remove(self.arrows.arrowRight, 't-hide');
        } else {
            if (self.pointer === tableHeaderLength - breakpoint.cellBreakpoint[1]) {
                classie.remove(self.arrows.arrowLeft, 't-hide');
                classie.add(self.arrows.arrowRight, 't-hide');
            } else {
                classie.remove(self.arrows.arrowLeft, 't-hide');
                classie.remove(self.arrows.arrowRight, 't-hide');
            }
        }

    } else {
        classie.add(self.arrows.arrowLeft, 't-hide');
        classie.add(self.arrows.arrowRight, 't-hide');
    }
};

Tabella.prototype.move = function(x) {

    var self = this,
        cellWidth = self.getCellWidth(self.currentBreakpoint);
    if (x === 'right') {
        if (Animator.animate(self.slidingRows, cellWidth, self.options.duration)) self.pointer++;
    } else {
        if (x === 'left') {
            if (Animator.animate(self.slidingRows, -cellWidth, self.options.duration)) self.pointer--;
        } else {

            if (typeof x === 'number') {
                if (Animator.animate(self.slidingRows, x, getReboundTime(x, self.options.reboundSpeed))) self.pointer = x;
            } else {
                Animator.resetRows(self.slidingRows);
                self.pointer = 0;
            }

        }
    }

    self.updateArrows();
};


Tabella.prototype.setSingleTick = function(trueOrFalse) {
    this.options.swipeSingleTick = !!trueOrFalse;
};

Tabella.prototype.getCurrentBreakPoint = function() {
    return this.currentBreakpoint;
};

Tabella.prototype.arrowsCentering = function() {
    var self = this,
        parentHeight = self.tableHeaderRow.offsetHeight,
        arrowsHeight = self.arrows.arrowRight.offsetHeight;

    if (arrowsHeight && parentHeight > arrowsHeight) {

        // -1 because of the box-shadow
        var verticalMargin = parseInt(((parentHeight - arrowsHeight) / 2) - 1);

        self.arrows.arrowRight.style.marginTop = verticalMargin + 'px';
        self.arrows.arrowLeft.style.marginTop = verticalMargin + 'px';
    }
};

return Tabella;

}, window, document);
