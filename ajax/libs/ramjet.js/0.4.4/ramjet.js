(function (global, factory) {
            typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
            typeof define === 'function' && define.amd ? define(factory) :
            global.ramjet = factory()
}(this, function () { 'use strict';

            // for the sake of Safari, may it burn in hell
            var BLACKLIST = ['length', 'parentRule'];

            var styleKeys = undefined;

            if (typeof CSS2Properties !== 'undefined') {
            	// why hello Firefox
            	styleKeys = Object.keys(CSS2Properties.prototype);
            } else {
            	styleKeys = Object.keys(document.createElement('div').style).filter(function (k) {
            		return ! ~BLACKLIST.indexOf(k);
            	});
            }

            var utils_styleKeys = styleKeys;

            var svgns = 'http://www.w3.org/2000/svg';
            var svg = document.createElementNS(svgns, 'svg');

            svg.style.position = 'fixed';
            svg.style.top = svg.style.left = '0';
            svg.style.width = svg.style.height = '100%';
            svg.style.overflow = 'visible';
            svg.style.pointerEvents = 'none';
            svg.setAttribute('class', 'mogrify-svg');

            var appendedSvg = false;

            function appendSvg() {
            	document.body.appendChild(svg);
            	appendedSvg = true;
            }

            function cloneNode(node) {
            	var clone = node.cloneNode();

            	var style = undefined;
            	var len = undefined;
            	var i = undefined;

            	var attr = undefined;

            	if (node.nodeType === 1) {
            		style = window.getComputedStyle(node);

            		utils_styleKeys.forEach(function (prop) {
            			clone.style[prop] = style[prop];
            		});

            		len = node.childNodes.length;
            		for (i = 0; i < len; i += 1) {
            			clone.appendChild(cloneNode(node.childNodes[i]));
            		}
            	}

            	return clone;
            }

            function wrapNode(node) {
            	var isSvg = node.namespaceURI === svgns;

            	var _node$getBoundingClientRect = node.getBoundingClientRect();

            	var left = _node$getBoundingClientRect.left;
            	var right = _node$getBoundingClientRect.right;
            	var top = _node$getBoundingClientRect.top;
            	var bottom = _node$getBoundingClientRect.bottom;

            	var style = window.getComputedStyle(node);

            	var clone = cloneNode(node);

            	var wrapper = {
            		node: node, clone: clone, isSvg: isSvg,
            		cx: (left + right) / 2,
            		cy: (top + bottom) / 2,
            		width: right - left,
            		height: bottom - top
            	};

            	if (isSvg) {
            		var ctm = node.getScreenCTM();
            		wrapper.transform = 'matrix(' + [ctm.a, ctm.b, ctm.c, ctm.d, ctm.e, ctm.f].join(',') + ')';

            		svg.appendChild(clone);
            	} else {
            		var offsetParent = node.offsetParent;
            		var offsetParentStyle = window.getComputedStyle(offsetParent);
            		var offsetParentBcr = offsetParent.getBoundingClientRect();

            		clone.style.position = 'absolute';
            		clone.style.top = top - parseInt(style.marginTop, 10) - (offsetParentBcr.top - parseInt(offsetParentStyle.marginTop, 10)) + 'px';
            		clone.style.left = left - parseInt(style.marginLeft, 10) - (offsetParentBcr.left - parseInt(offsetParentStyle.marginLeft, 10)) + 'px';

            		wrapper.transform = ''; // TODO...?
            		node.parentNode.appendChild(clone);
            	}

            	return wrapper;
            }

            function hideNode(node) {
            	node.__ramjetOriginalTransition__ = node.style.transition;
            	node.style.transition = '';

            	node.style.opacity = 0;
            }

            function showNode(node) {
            	node.style.transition = '';
            	node.style.opacity = 1;

            	if (node.__ramjetOriginalTransition__) {
            		setTimeout(function () {
            			node.style.transition = node.__ramjetOriginalTransition__;
            		});
            	}
            }

            var utils_getTransform = getTransform;

            function getTransform(isSvg, cx, cy, dx, dy, dsx, dsy, t) {
            	var transform = isSvg ? "translate(" + cx + " " + cy + ") scale(" + (1 + t * dsx) + " " + (1 + t * dsy) + ") translate(" + -cx + " " + -cy + ") translate(" + t * dx + " " + t * dy + ")" : "translate(" + t * dx + "px," + t * dy + "px) scale(" + (1 + t * dsx) + "," + (1 + t * dsy) + ")";

            	return transform;
            }

            function linear(pos) {
            	return pos;
            }

            function easeIn(pos) {
            	return Math.pow(pos, 3);
            }

            function easeOut(pos) {
            	return Math.pow(pos - 1, 3) + 1;
            }

            function easeInOut(pos) {
            	if ((pos /= 0.5) < 1) {
            		return 0.5 * Math.pow(pos, 3);
            	}

            	return 0.5 * (Math.pow(pos - 2, 3) + 2);
            }

            var rAF = window.requestAnimationFrame || window.webkitRequestAnimationFrame || function (fn) {
                        return setTimeout(fn, 16);
            };

            var utils_rAF = rAF;

            var transformers_TimerTransformer___classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };

            var transformers_TimerTransformer__TimerTransformer = function TimerTransformer(from, to, options) {
            	transformers_TimerTransformer___classCallCheck(this, transformers_TimerTransformer__TimerTransformer);

            	var dx = to.cx - from.cx;
            	var dy = to.cy - from.cy;

            	var dsxf = to.width / from.width - 1;
            	var dsyf = to.height / from.height - 1;

            	var dsxt = from.width / to.width - 1;
            	var dsyt = from.height / to.height - 1;

            	var startTime = Date.now();
            	var duration = options.duration || 400;
            	var easing = options.easing || linear;

            	function tick() {
            		var timeNow = Date.now();
            		var elapsed = timeNow - startTime;

            		if (elapsed > duration) {
            			from.clone.parentNode.removeChild(from.clone);
            			to.clone.parentNode.removeChild(to.clone);

            			if (options.done) {
            				options.done();
            			}

            			return;
            		}

            		var t = easing(elapsed / duration);

            		from.clone.style.opacity = 1 - t;
            		to.clone.style.opacity = t;

            		var cx = from.cx + dx * t;
            		var cy = from.cy + dy * t;

            		var fromTransform = utils_getTransform(from.isSvg, cx, cy, dx, dy, dsxf, dsyf, t) + ' ' + from.transform;
            		var toTransform = utils_getTransform(to.isSvg, cx, cy, -dx, -dy, dsxt, dsyt, 1 - t) + ' ' + to.transform;

            		if (from.isSvg) {
            			from.clone.setAttribute('transform', fromTransform);
            		} else {
            			from.clone.style.transform = from.clone.style.webkitTransform = from.clone.style.msTransform = fromTransform;
            		}

            		if (to.isSvg) {
            			to.clone.setAttribute('transform', toTransform);
            		} else {
            			to.clone.style.transform = to.clone.style.webkitTransform = to.clone.style.msTransform = toTransform;
            		}

            		utils_rAF(tick);
            	}

            	tick();
            };

            var transformers_TimerTransformer = transformers_TimerTransformer__TimerTransformer;

            var div = document.createElement('div');

            var keyframesSupported = true;
            var TRANSFORM = undefined;
            var KEYFRAMES = undefined;
            var ANIMATION_DIRECTION = undefined;
            var ANIMATION_DURATION = undefined;
            var ANIMATION_ITERATION_COUNT = undefined;
            var ANIMATION_NAME = undefined;
            var ANIMATION_TIMING_FUNCTION = undefined;
            var ANIMATION_END = undefined;

            // We have to browser-sniff for IE11, because it was apparently written
            // by a barrel of stoned monkeys - http://jsfiddle.net/rich_harris/oquLu2qL/

            // http://stackoverflow.com/questions/17907445/how-to-detect-ie11
            var isIe11 = !window.ActiveXObject && 'ActiveXObject' in window;

            if (!isIe11 && ('transform' in div.style || 'webkitTransform' in div.style) && ('animation' in div.style || 'webkitAnimation' in div.style)) {
            	keyframesSupported = true;

            	TRANSFORM = 'transform' in div.style ? 'transform' : '-webkit-transform';

            	if ('animation' in div.style) {
            		KEYFRAMES = '@keyframes';

            		ANIMATION_DIRECTION = 'animationDirection';
            		ANIMATION_DURATION = 'animationDuration';
            		ANIMATION_ITERATION_COUNT = 'animationIterationCount';
            		ANIMATION_NAME = 'animationName';
            		ANIMATION_TIMING_FUNCTION = 'animationTimingFunction';

            		ANIMATION_END = 'animationend';
            	} else {
            		KEYFRAMES = '@-webkit-keyframes';

            		ANIMATION_DIRECTION = 'webkitAnimationDirection';
            		ANIMATION_DURATION = 'webkitAnimationDuration';
            		ANIMATION_ITERATION_COUNT = 'webkitAnimationIterationCount';
            		ANIMATION_NAME = 'webkitAnimationName';
            		ANIMATION_TIMING_FUNCTION = 'webkitAnimationTimingFunction';

            		ANIMATION_END = 'webkitAnimationEnd';
            	}
            } else {
            	keyframesSupported = false;
            }

            var transformers_KeyframeTransformer___classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };

            var transformers_KeyframeTransformer__KeyframeTransformer = function KeyframeTransformer(from, to, options) {
            	transformers_KeyframeTransformer___classCallCheck(this, transformers_KeyframeTransformer__KeyframeTransformer);

            	var _getKeyframes = getKeyframes(from, to, options);

            	var fromKeyframes = _getKeyframes.fromKeyframes;
            	var toKeyframes = _getKeyframes.toKeyframes;

            	var fromId = '_' + ~ ~(Math.random() * 1000000);
            	var toId = '_' + ~ ~(Math.random() * 1000000);

            	var css = '' + KEYFRAMES + ' ' + fromId + ' { ' + fromKeyframes + ' } ' + KEYFRAMES + ' ' + toId + ' { ' + toKeyframes + ' }';
            	var dispose = addCss(css);

            	from.clone.style[ANIMATION_DIRECTION] = 'alternate';
            	from.clone.style[ANIMATION_DURATION] = '' + options.duration / 1000 + 's';
            	from.clone.style[ANIMATION_ITERATION_COUNT] = 1;
            	from.clone.style[ANIMATION_NAME] = fromId;
            	from.clone.style[ANIMATION_TIMING_FUNCTION] = 'linear';

            	to.clone.style[ANIMATION_DIRECTION] = 'alternate';
            	to.clone.style[ANIMATION_DURATION] = '' + options.duration / 1000 + 's';
            	to.clone.style[ANIMATION_ITERATION_COUNT] = 1;
            	to.clone.style[ANIMATION_NAME] = toId;
            	to.clone.style[ANIMATION_TIMING_FUNCTION] = 'linear';

            	var fromDone = undefined;
            	var toDone = undefined;

            	function done() {
            		if (fromDone && toDone) {
            			from.clone.parentNode.removeChild(from.clone);
            			to.clone.parentNode.removeChild(to.clone);

            			if (options.done) options.done();

            			dispose();
            		}
            	}

            	from.clone.addEventListener(ANIMATION_END, function () {
            		fromDone = true;
            		done();
            	});

            	to.clone.addEventListener(ANIMATION_END, function () {
            		toDone = true;
            		done();
            	});
            };

            var transformers_KeyframeTransformer = transformers_KeyframeTransformer__KeyframeTransformer;

            function addCss(css) {
            	var styleElement = document.createElement('style');
            	styleElement.type = 'text/css';

            	var head = document.getElementsByTagName('head')[0];

            	// Internet Exploder won't let you use styleSheet.innerHTML - we have to
            	// use styleSheet.cssText instead
            	var styleSheet = styleElement.styleSheet;

            	if (styleSheet) {
            		styleSheet.cssText = css;
            	} else {
            		styleElement.innerHTML = css;
            	}

            	head.appendChild(styleElement);

            	return function () {
            		return head.removeChild(styleElement);
            	};
            }

            function getKeyframes(from, to, options) {
            	var dx = to.cx - from.cx;
            	var dy = to.cy - from.cy;

            	var dsxf = to.width / from.width - 1;
            	var dsyf = to.height / from.height - 1;

            	var dsxt = from.width / to.width - 1;
            	var dsyt = from.height / to.height - 1;

            	var easing = options.easing || linear;

            	var numFrames = options.duration / 50; // one keyframe per 50ms is probably enough... this may prove not to be the case though

            	var fromKeyframes = [];
            	var toKeyframes = [];
            	var i;

            	for (i = 0; i < numFrames; i += 1) {
            		var pc = 100 * (i / numFrames);
            		var t = easing(i / numFrames);

            		var _cx = from.cx + dx * t;
            		var _cy = from.cy + dy * t;

            		var _fromTransform = utils_getTransform(from.isSvg, _cx, _cy, dx, dy, dsxf, dsyf, t) + ' ' + from.transform;
            		var _toTransform = utils_getTransform(to.isSvg, _cx, _cy, -dx, -dy, dsxt, dsyt, 1 - t) + ' ' + to.transform;

            		fromKeyframes.push('' + pc + '% { opacity: ' + (1 - t) + '; ' + TRANSFORM + ': ' + _fromTransform + '; }');
            		toKeyframes.push('' + pc + '% { opacity: ' + t + '; ' + TRANSFORM + ': ' + _toTransform + '; }');
            	}

            	var cx = from.cx + dx;
            	var cy = from.cy + dy;

            	var fromTransform = utils_getTransform(from.isSvg, cx, cy, dx, dy, dsxf, dsyf, 1) + ' ' + from.transform;
            	var toTransform = utils_getTransform(to.isSvg, cx, cy, -dx, -dy, dsxt, dsyt, 0) + ' ' + to.transform;

            	fromKeyframes.push('100% { opacity: 0; ' + TRANSFORM + ': ' + fromTransform + '; }');
            	toKeyframes.push('100% { opacity: 1; ' + TRANSFORM + ': ' + toTransform + '; }');

            	fromKeyframes = fromKeyframes.join('\n');
            	toKeyframes = toKeyframes.join('\n');

            	return { fromKeyframes: fromKeyframes, toKeyframes: toKeyframes };
            }

            var ramjet = {
            	transform: function (fromNode, toNode) {
            		var options = arguments[2] === undefined ? {} : arguments[2];

            		if (typeof options === 'function') {
            			options = { done: options };
            		}

            		if (!('duration' in options)) {
            			options.duration = 400;
            		}

            		var from = wrapNode(fromNode);
            		var to = wrapNode(toNode);

            		if (from.isSvg || to.isSvg && !appendedSvg) {
            			appendSvg();
            		}

            		if (!keyframesSupported || options.useTimer || from.isSvg || to.isSvg) {
            			return new transformers_TimerTransformer(from, to, options);
            		} else {
            			return new transformers_KeyframeTransformer(from, to, options);
            		}
            	},

            	hide: function () {
            		for (var _len = arguments.length, nodes = Array(_len), _key = 0; _key < _len; _key++) {
            			nodes[_key] = arguments[_key];
            		}

            		nodes.forEach(hideNode);
            	},

            	show: function () {
            		for (var _len2 = arguments.length, nodes = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
            			nodes[_key2] = arguments[_key2];
            		}

            		nodes.forEach(showNode);
            	},

            	// expose some basic easing functions
            	linear: linear, easeIn: easeIn, easeOut: easeOut, easeInOut: easeInOut
            };

            return ramjet;

}));