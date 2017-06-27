(function (global, factory) {
            typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
            typeof define === 'function' && define.amd ? define(['exports'], factory) :
            (factory((global.ramjet = {})));
}(this, function (exports) { 'use strict';

            var babelHelpers = {};

            babelHelpers.classCallCheck = function (instance, Constructor) {
              if (!(instance instanceof Constructor)) {
                throw new TypeError("Cannot call a class as a function");
              }
            };

            babelHelpers;

            var props = /\b(?:position|zIndex|opacity|transform|webkitTransform|mixBlendMode|filter|webkitFilter|isolation)\b/;

            function isFlexItem(node) {
            	var display = getComputedStyle(node.parentNode).display;
            	return display === 'flex' || display === 'inline-flex';
            }

            function createsStackingContext(node) {
            	var style = getComputedStyle(node);

            	// https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Positioning/Understanding_z_index/The_stacking_context
            	if (style.position === 'fixed') return true;
            	if (style.zIndex !== 'auto' && style.position !== 'static' || isFlexItem(node)) return true;
            	if (+style.opacity < 1) return true;
            	if ('transform' in style && style.transform !== 'none') return true;
            	if ('webkitTransform' in style && style.webkitTransform !== 'none') return true;
            	if ('mixBlendMode' in style && style.mixBlendMode !== 'normal') return true;
            	if ('filter' in style && style.filter !== 'none') return true;
            	if ('webkitFilter' in style && style.webkitFilter !== 'none') return true;
            	if ('isolation' in style && style.isolation === 'isolate') return true;
            	if (props.test(style.willChange)) return true;
            	if (style.webkitOverflowScrolling === 'touch') return true;

            	return false;
            }

            function findStackingContext(nodes) {
            	var i = nodes.length;

            	while (i--) {
            		if (createsStackingContext(nodes[i])) return nodes[i];
            	}

            	return null;
            }

            function getAncestors(node) {
            	var ancestors = [];

            	while (node) {
            		ancestors.push(node);
            		node = node.parentNode;
            	}

            	return ancestors; // [ node, ... <body>, <html>, document ]
            }

            function getZIndex(node) {
            	return node && Number(getComputedStyle(node).zIndex) || 0;
            }

            function last(array) {
            	return array[array.length - 1];
            }

            function compare(a, b) {
            	if (a === b) throw new Error('Cannot compare node with itself');

            	var ancestors = {
            		a: getAncestors(a),
            		b: getAncestors(b)
            	};

            	var commonAncestor = undefined;

            	// remove shared ancestors
            	while (last(ancestors.a) === last(ancestors.b)) {
            		a = ancestors.a.pop();
            		b = ancestors.b.pop();

            		commonAncestor = a;
            	}

            	var stackingContexts = {
            		a: findStackingContext(ancestors.a),
            		b: findStackingContext(ancestors.b)
            	};

            	var zIndexes = {
            		a: getZIndex(stackingContexts.a),
            		b: getZIndex(stackingContexts.b)
            	};

            	if (zIndexes.a === zIndexes.b) {
            		var children = commonAncestor.childNodes;

            		var furthestAncestors = {
            			a: last(ancestors.a),
            			b: last(ancestors.b)
            		};

            		var i = children.length;
            		while (i--) {
            			var child = children[i];
            			if (child === furthestAncestors.a) return 1;
            			if (child === furthestAncestors.b) return -1;
            		}
            	}

            	return Math.sign(zIndexes.a - zIndexes.b);
            }

            var svgns = 'http://www.w3.org/2000/svg';

            function hideNode(node) {
            	node.__ramjetOriginalTransition__ = node.style.webkitTransition || node.style.transition;
            	node.__ramjetOriginalOpacity__ = node.style.opacity;

            	node.style.webkitTransition = node.style.transition = '';

            	node.style.opacity = 0;
            }

            function showNode(node) {
            	if ('__ramjetOriginalOpacity__' in node) {
            		node.style.transition = '';
            		node.style.opacity = node.__ramjetOriginalOpacity__;

            		if (node.__ramjetOriginalTransition__) {
            			setTimeout(function () {
            				node.style.transition = node.__ramjetOriginalTransition__;
            			});
            		}
            	}
            }

            function cloneNode(node) {
            	var clone = node.cloneNode();

            	var isSvg = node.parentNode && node.parentNode.namespaceURI === svgns;

            	if (node.nodeType === 1) {
            		var width = node.style.width;
            		var height = node.style.height;

            		clone.setAttribute('style', window.getComputedStyle(node).cssText);

            		if (isSvg) {
            			clone.style.width = width;
            			clone.style.height = height;
            		}

            		var len = node.childNodes.length;
            		var i = undefined;

            		for (i = 0; i < len; i += 1) {
            			clone.appendChild(cloneNode(node.childNodes[i]));
            		}
            	}

            	return clone;
            }

            var bgColorRegexp = /^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d?.\d+))?\)$/;

            function parseColor(str) {
            	var match = bgColorRegexp.exec(str);

            	if (!match) return null;

            	return {
            		r: +match[1],
            		g: +match[2],
            		b: +match[3],
            		alpha: match[4] ? +match[4] : 1
            	};
            }

            var borderRadiusRegex = /^(\d+)px(?: (\d+)px)?$/;

            function parseBorderRadius(str) {
            	var match = borderRadiusRegex.exec(str);

            	return match[2] ? { x: +match[1], y: +match[2] } : { x: +match[1], y: +match[1] };
            }

            function findParentByTagName(node, tagName) {
            	while (node) {
            		if (node.tagName === tagName) {
            			return node;
            		}

            		node = node.parentNode;
            	}
            }

            function findTransformParent(node) {
            	var isSvg = node.namespaceURI === svgns && node.tagName !== 'svg';
            	return isSvg ? findParentByTagName(node, 'svg') : node.parentNode;
            }

            var div = document.createElement('div');

            var keyframesSupported = true;
            var TRANSFORM = undefined;
            var TRANSFORM_ORIGIN = undefined;
            var TRANSFORM_CSS = undefined;
            var KEYFRAMES = undefined;
            var ANIMATION = undefined;
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

            	if ('webkitTransform' in div.style) {
            		TRANSFORM = 'webkitTransform';
            		TRANSFORM_CSS = '-webkit-transform';
            		TRANSFORM_ORIGIN = 'webkitTransformOrigin';
            	} else {
            		TRANSFORM = TRANSFORM_CSS = 'transform';
            		TRANSFORM_ORIGIN = 'transformOrigin';
            	}

            	if ('animation' in div.style) {
            		KEYFRAMES = '@keyframes';

            		ANIMATION = 'animation';
            		ANIMATION_DIRECTION = 'animationDirection';
            		ANIMATION_DURATION = 'animationDuration';
            		ANIMATION_ITERATION_COUNT = 'animationIterationCount';
            		ANIMATION_NAME = 'animationName';
            		ANIMATION_TIMING_FUNCTION = 'animationTimingFunction';

            		ANIMATION_END = 'animationend';
            	} else {
            		KEYFRAMES = '@-webkit-keyframes';

            		ANIMATION = 'webkitAnimation';
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

            var IDENTITY = [1, 0, 0, 1, 0, 0];

            function multiply(_ref, _ref2) {
            	var a1 = _ref[0];
            	var b1 = _ref[1];
            	var c1 = _ref[2];
            	var d1 = _ref[3];
            	var e1 = _ref[4];
            	var f1 = _ref[5];
            	var a2 = _ref2[0];
            	var b2 = _ref2[1];
            	var c2 = _ref2[2];
            	var d2 = _ref2[3];
            	var e2 = _ref2[4];
            	var f2 = _ref2[5];

            	return [a1 * a2 + c1 * b2, // a
            	b1 * a2 + d1 * b2, // b
            	a1 * c2 + c1 * d2, // c
            	b1 * c2 + d1 * d2, // d
            	a1 * e2 + c1 * f2 + e1, // e
            	b1 * e2 + d1 * f2 + f1 // f
            	];
            }

            function invert(_ref3) {
            	var a = _ref3[0];
            	var b = _ref3[1];
            	var c = _ref3[2];
            	var d = _ref3[3];
            	var e = _ref3[4];
            	var f = _ref3[5];

            	var determinant = a * d - c * b;

            	return [d / determinant, b / -determinant, c / -determinant, a / determinant, (c * f - e * d) / determinant, (e * b - a * f) / determinant];
            }

            function pythag(a, b) {
            	return Math.sqrt(a * a + b * b);
            }

            function decompose(_ref4) {
            	var a = _ref4[0];
            	var b = _ref4[1];
            	var c = _ref4[2];
            	var d = _ref4[3];
            	var e = _ref4[4];
            	var f = _ref4[5];

            	// If determinant equals zero (e.g. x scale or y scale equals zero),
            	// the matrix cannot be decomposed
            	if (a * d - b * c === 0) return null;

            	// See https://github.com/Rich-Harris/Neo/blob/master/Neo.js for
            	// an explanation of the following
            	var scaleX = pythag(a, b);
            	a /= scaleX;
            	b /= scaleX;

            	var scaledShear = a * c + b * d;
            	var desheared = [a * -scaledShear + c, b * -scaledShear + d];

            	var scaleY = pythag(desheared[0], desheared[1]);

            	var skewX = scaledShear / scaleY;

            	var rotate = b > 0 ? Math.acos(a) : 2 * Math.PI - Math.acos(a);

            	return {
            		rotate: rotate,
            		scaleX: scaleX,
            		scaleY: scaleY,
            		skewX: skewX,
            		translateX: e,
            		translateY: f
            	};
            }

            function parseMatrixTransformString(transform) {
            	if (transform.slice(0, 7) !== 'matrix(') {
            		throw new Error('Could not parse transform string (' + transform + ')');
            	}

            	return transform.slice(7, -1).split(' ').map(parseFloat);
            }

            function getCumulativeTransformMatrix(node) {
            	if (node.namespaceURI === svgns) {
            		var _node$getCTM = node.getCTM();

            		var a = _node$getCTM.a;
            		var b = _node$getCTM.b;
            		var c = _node$getCTM.c;
            		var d = _node$getCTM.d;
            		var e = _node$getCTM.e;
            		var f = _node$getCTM.f;

            		return [a, b, c, d, e, f];
            	}

            	var matrix = [1, 0, 0, 1, 0, 0];

            	while (node instanceof Element) {
            		var parentMatrix = getTransformMatrix(node);

            		if (parentMatrix) {
            			matrix = multiply(parentMatrix, matrix);
            		}

            		node = findTransformParent(node);
            	}

            	return matrix;
            }

            function getTransformMatrix(node) {
            	if (node.namespaceURI === svgns) {
            		var ctm = getCumulativeTransformMatrix(node);
            		var parentCTM = getCumulativeTransformMatrix(node.parentNode);
            		return multiply(invert(parentCTM), ctm);
            	}

            	var style = getComputedStyle(node);
            	var transform = style[TRANSFORM];

            	if (transform === 'none') {
            		return null;
            	}

            	var origin = style[TRANSFORM_ORIGIN].split(' ').map(parseFloat);

            	var matrix = parseMatrixTransformString(transform);

            	// compensate for the transform origin (we want to express everything in [0,0] terms)
            	matrix = multiply([1, 0, 0, 1, origin[0], origin[1]], matrix);
            	matrix = multiply(matrix, [1, 0, 0, 1, -origin[0], -origin[1]]);

            	// TODO if is SVG, multiply by CTM, to account for viewBox

            	return matrix;
            }

            function getBoundingClientRect(node, invertedParentCTM) {
            	var originalTransformOrigin = node.style[TRANSFORM_ORIGIN];
            	var originalTransform = node.style[TRANSFORM];
            	var originalTransformAttribute = node.getAttribute('transform'); // SVG

            	node.style[TRANSFORM_ORIGIN] = '0 0';
            	node.style[TRANSFORM] = 'matrix(' + invertedParentCTM.join(',') + ')';

            	var bcr = node.getBoundingClientRect();

            	// reset
            	node.style[TRANSFORM_ORIGIN] = originalTransformOrigin;
            	node.style[TRANSFORM] = originalTransform;
            	node.setAttribute('transform', originalTransformAttribute || ''); // TODO remove attribute altogether if null?

            	return bcr;
            }

            var Wrapper = function () {
            	function Wrapper(node, options) {
            		babelHelpers.classCallCheck(this, Wrapper);

            		this.init(node, options);
            	}

            	Wrapper.prototype.init = function init(node) {
            		this._node = node;

            		this._clone = cloneNode(node);

            		var style = window.getComputedStyle(node);
            		this.style = style;

            		// we need to get the 'naked' boundingClientRect, i.e.
            		// without any transforms
            		// TODO what if the node is the root <svg> node?
            		var parentCTM = node.namespaceURI === 'svg' ? node.parentNode.getScreenCTM() : getCumulativeTransformMatrix(node.parentNode);
            		this.invertedParentCTM = invert(parentCTM);
            		this.transform = getTransformMatrix(node) || IDENTITY;
            		this.ctm = multiply(parentCTM, this.transform);

            		var bcr = getBoundingClientRect(node, this.invertedParentCTM);
            		this.bcr = bcr;

            		var opacity = +style.opacity;

            		var rgba = parseColor(style.backgroundColor);

            		// TODO create a flat array? easier to work with later?
            		var borderRadius = {
            			tl: parseBorderRadius(style.borderTopLeftRadius),
            			tr: parseBorderRadius(style.borderTopRightRadius),
            			br: parseBorderRadius(style.borderBottomRightRadius),
            			bl: parseBorderRadius(style.borderBottomLeftRadius)
            		};

            		this.borderRadius = borderRadius;
            		this.opacity = opacity;
            		this.rgba = rgba;

            		this.left = bcr.left;
            		this.top = bcr.top;
            		this.width = bcr.width;
            		this.height = bcr.height;
            	};

            	Wrapper.prototype.insert = function insert() {
            		var bcr = this.bcr;

            		var clone = undefined;
            		var container = undefined;

            		if (this._node.namespaceURI === svgns) {
            			// TODO what if it's the <svg> itself, not a child?
            			var svg = findParentByTagName(this._node, 'svg'); // TODO should be the namespace boundary - could be SVG inside SVG
            			container = findTransformParent(svg);

            			clone = svg.cloneNode(false);
            			clone.appendChild(this._clone); // TODO what about transforms?
            		} else {
            				container = findTransformParent(this._node);
            				clone = this._clone;
            			}

            		var containerStyle = window.getComputedStyle(container);
            		var containerBcr = getBoundingClientRect(container, invert(getCumulativeTransformMatrix(container.parentNode)));

            		clone.style.position = 'absolute';
            		clone.style[TRANSFORM_ORIGIN] = '0 0';
            		clone.style.top = bcr.top - parseInt(this.style.marginTop, 10) - (containerBcr.top - parseInt(containerStyle.marginTop, 10)) + 'px';
            		clone.style.left = bcr.left - parseInt(this.style.marginLeft, 10) - (containerBcr.left - parseInt(containerStyle.marginLeft, 10)) + 'px';

            		container.appendChild(clone);
            	};

            	Wrapper.prototype.detach = function detach() {
            		this._clone.parentNode.removeChild(this._clone);
            	};

            	Wrapper.prototype.setOpacity = function setOpacity(opacity) {
            		this._clone.style.opacity = opacity;
            	};

            	Wrapper.prototype.setTransform = function setTransform(transform) {
            		this._clone.style.transform = this._clone.style.webkitTransform = this._clone.style.msTransform = transform;
            	};

            	Wrapper.prototype.setBackgroundColor = function setBackgroundColor(color) {
            		this._clone.style.backgroundColor = color;
            	};

            	Wrapper.prototype.setBorderRadius = function setBorderRadius(borderRadius) {
            		this._clone.style.borderRadius = borderRadius;
            	};

            	Wrapper.prototype.animateWithKeyframes = function animateWithKeyframes(id, duration) {
            		this._clone.style[ANIMATION_DIRECTION] = 'alternate';
            		this._clone.style[ANIMATION_DURATION] = duration / 1000 + 's';
            		this._clone.style[ANIMATION_ITERATION_COUNT] = 1;
            		this._clone.style[ANIMATION_NAME] = id;
            		this._clone.style[ANIMATION_TIMING_FUNCTION] = 'linear';
            	};

            	Wrapper.prototype.freeze = function freeze() {
            		var computedStyle = getComputedStyle(this._clone);

            		this.setOpacity(computedStyle.opacity);
            		this.setTransform(computedStyle.transform);
            		this.setBackgroundColor(computedStyle.backgroundColor);
            		this.setBorderRadius(computedStyle.borderRadius);

            		this._clone.style[ANIMATION] = 'none';
            	};

            	return Wrapper;
            }();

            function getOpacityInterpolator(from, to, order) {
            	var opacity = {};

            	return function (t) {
            		var targetOpacity = (to - from) * t + from;

            		// Based on the blending formula here. (http://en.wikipedia.org/wiki/Alpha_compositing#Alpha_blending)
            		// This is a quadratic blending function that makes the top layer and bottom layer blend linearly.
            		// However there is an asymptote at target=1 so that needs to be handled with an if else statement.
            		if (targetOpacity === 1) {
            			if (order === 1) {
            				opacity.from = 1 - t;
            				opacity.to = 1;
            			} else {
            				opacity.from = 1;
            				opacity.to = t;
            			}
            		} else {
            			opacity.from = targetOpacity - t * t * targetOpacity;
            			opacity.to = (targetOpacity - opacity.from) / (1 - opacity.from);
            		}

            		return opacity;
            	};
            }

            function getRgbaInterpolator(a, b, order) {
            	if (a.alpha === 1 && b.alpha === 1) {
            		// no need to animate anything
            		return null;
            	}

            	var rgba = {};
            	var opacityAt = getOpacityInterpolator(a.alpha, b.alpha, order);

            	return function (t) {
            		var opacity = opacityAt(t);

            		rgba.from = 'rgba(' + a.r + ',' + a.g + ',' + a.b + ',' + opacity.from + ')';
            		rgba.to = 'rgba(' + b.r + ',' + b.g + ',' + b.b + ',' + opacity.to + ')';

            		return rgba;
            	};
            }

            function interpolateArray(a, b) {
            	var len = a.length;
            	var array = new Array(len);

            	return function (t) {
            		var i = len;
            		while (i--) {
            			array[i] = a[i] + t * (b[i] - a[i]);
            		}

            		return array;
            	};
            }

            // Border radius is given as a string in the following form
            //
            //     tl.x tr.x br.x bl.x / tl.y tr.y br.y bl.y
            //
            // ...where t, r, b and l are top, right, bottom, left, and
            // x and y are self-explanatory. Each value is followed by 'px'

            // TODO it must be possible to do this more simply. Maybe have
            // a flat array from the start?

            function getBorderRadiusInterpolator(a, b) {
            	// TODO fast path - no transition needed

            	var aWidth = a.width;
            	var aHeight = a.height;

            	var bWidth = b.width;
            	var bHeight = b.height;

            	a = a.borderRadius;
            	b = b.borderRadius;

            	var a_x_t0 = [a.tl.x, a.tr.x, a.br.x, a.bl.x];
            	var a_y_t0 = [a.tl.y, a.tr.y, a.br.y, a.bl.y];

            	var b_x_t1 = [b.tl.x, b.tr.x, b.br.x, b.bl.x];
            	var b_y_t1 = [b.tl.y, b.tr.y, b.br.y, b.bl.y];

            	var a_x_t1 = b_x_t1.map(function (x) {
            		return x * aWidth / bWidth;
            	});
            	var a_y_t1 = b_y_t1.map(function (y) {
            		return y * aHeight / bHeight;
            	});

            	var b_x_t0 = a_x_t0.map(function (x) {
            		return x * bWidth / aWidth;
            	});
            	var b_y_t0 = a_y_t0.map(function (y) {
            		return y * bHeight / aHeight;
            	});

            	var ax = interpolateArray(a_x_t0, a_x_t1);
            	var ay = interpolateArray(a_y_t0, a_y_t1);

            	var bx = interpolateArray(b_x_t0, b_x_t1);
            	var by = interpolateArray(b_y_t0, b_y_t1);

            	var borderRadius = {};

            	return function (t) {
            		var x = ax(t);
            		var y = ay(t);

            		borderRadius.from = x.join('px ') + 'px / ' + y.join('px ') + 'px';

            		x = bx(t);
            		y = by(t);

            		borderRadius.to = x.join('px ') + 'px / ' + y.join('px ') + 'px';

            		return borderRadius;
            	};
            }

            function interpolateMatrices(a, b) {
            	var transform = [];

            	return function (t) {
            		var i = a.length;
            		while (i--) {
            			var from = a[i];
            			var to = b[i];
            			transform[i] = from + t * (to - from);
            		}

            		return 'matrix(' + transform.join(',') + ')';
            	};
            }

            function interpolate(a, b) {
            	var d = b - a;
            	return function (t) {
            		return a + t * d;
            	};
            }

            function getRotation(radians) {
            	while (radians > Math.PI) {
            		radians -= Math.PI * 2;
            	}while (radians < -Math.PI) {
            		radians += Math.PI * 2;
            	}return radians;
            }

            function interpolateDecomposedTransforms(a, b) {
            	var rotate = interpolate(getRotation(a.rotate), getRotation(b.rotate));
            	var skewX = interpolate(a.skewX, b.skewX);
            	var scaleX = interpolate(a.scaleX, b.scaleX);
            	var scaleY = interpolate(a.scaleY, b.scaleY);
            	var translateX = interpolate(a.translateX, b.translateX);
            	var translateY = interpolate(a.translateY, b.translateY);

            	return function (t) {
            		var transform = 'translate(' + translateX(t) + 'px, ' + translateY(t) + 'px) rotate(' + rotate(t) + 'rad) skewX(' + skewX(t) + 'rad) scale(' + scaleX(t) + ', ' + scaleY(t) + ')';
            		return transform;
            	};
            }

            function getTransformInterpolator(a, b) {
            	var scale_x = b.width / a.width;
            	var scale_y = b.height / a.height;
            	var d_x = b.left - a.left;
            	var d_y = b.top - a.top;

            	var a_start = a.transform;

            	var move_a_to_b = [1, 0, 0, 1, d_x, d_y];
            	var scale_a_to_b = [scale_x, 0, 0, scale_y, 0, 0];

            	var matrix = IDENTITY;

            	matrix = multiply(matrix, a.invertedParentCTM);
            	matrix = multiply(matrix, move_a_to_b);
            	matrix = multiply(matrix, b.ctm);
            	matrix = multiply(matrix, scale_a_to_b);

            	var decomposed_start = decompose(a_start);
            	var decomposed_end = decompose(matrix);

            	if (!decomposed_start || !decomposed_end) return interpolateMatrices(a_start, matrix);
            	return interpolateDecomposedTransforms(decomposed_start, decomposed_end);
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

            var head = document.getElementsByTagName('head')[0];

            function addCss(css) {
            	var styleElement = document.createElement('style');
            	styleElement.type = 'text/css';

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

            function getKeyframes(from, to, interpolators, easing, remaining, duration) {
            	var numFrames = remaining / 16;

            	var fromKeyframes = '';
            	var toKeyframes = '';

            	function addKeyframes(pc, t) {
            		var opacity = interpolators.opacity(t);
            		var backgroundColor = interpolators.backgroundColor ? interpolators.backgroundColor(t) : null;
            		var borderRadius = interpolators.borderRadius ? interpolators.borderRadius(t) : null;
            		var transformFrom = interpolators.transformFrom(t);
            		var transformTo = interpolators.transformTo(1 - t);

            		fromKeyframes += '\n' + (pc + '% {') + ('opacity: ' + opacity.from + ';') + (TRANSFORM_CSS + ': ' + transformFrom + ';') + (backgroundColor ? 'background-color: ' + backgroundColor.from + ';' : '') + (borderRadius ? 'border-radius: ' + borderRadius.from + ';' : '') + '}';

            		toKeyframes += '\n' + (pc + '% {') + ('opacity: ' + opacity.to + ';') + (TRANSFORM_CSS + ': ' + transformTo + ';') + (backgroundColor ? 'background-color: ' + backgroundColor.to + ';' : '') + (borderRadius ? 'border-radius: ' + borderRadius.to + ';' : '') + '}';
            	}

            	var i = undefined;
            	var startPos = 1 - remaining / duration;

            	for (i = 0; i < numFrames; i += 1) {
            		var relPos = i / numFrames;
            		var absPos = startPos + remaining / duration * relPos;

            		var pc = 100 * relPos;
            		var t = easing(absPos);

            		addKeyframes(pc, t);
            	}

            	addKeyframes(100, 1);

            	return { fromKeyframes: fromKeyframes, toKeyframes: toKeyframes };
            }

            function generateId() {
            	return 'ramjet' + ~ ~(Math.random() * 1000000);
            }

            var rAF = window.requestAnimationFrame || window.webkitRequestAnimationFrame || function (fn) {
                        return setTimeout(fn, 16);
            };

            function transformer(from, to, options) {
            	var duration = options.duration || 400;
            	var easing = options.easing || linear;

            	var useTimer = !keyframesSupported || !!options.useTimer;

            	var order = compare(from._node, to._node);

            	var interpolators = {
            		opacity: getOpacityInterpolator(from.opacity, to.opacity, order),
            		backgroundColor: options.interpolateBackgroundColor ? getRgbaInterpolator(from.rgba, to.rgba, order) : null,
            		borderRadius: options.interpolateBorderRadius ? getBorderRadiusInterpolator(from, to) : null,
            		transformFrom: getTransformInterpolator(from, to),
            		transformTo: getTransformInterpolator(to, from)
            	};

            	var running = undefined;
            	var disposeCss = undefined;
            	var torndown = undefined;

            	var remaining = duration;
            	var endTime = undefined;

            	function tick() {
            		if (!running) return;

            		var timeNow = Date.now();
            		remaining = endTime - timeNow;

            		if (remaining < 0) {
            			transformer.teardown();
            			if (options.done) options.done();

            			return;
            		}

            		var t = easing(1 - remaining / duration);
            		transformer.goto(t);

            		rAF(tick);
            	}

            	var transformer = {
            		teardown: function () {
            			if (torndown) return transformer;

            			running = false;
            			torndown = true;

            			from.detach();
            			to.detach();

            			from = null;
            			to = null;

            			return transformer;
            		},
            		goto: function (pos) {
            			transformer.pause();

            			var t = easing(pos);

            			// opacity
            			var opacity = interpolators.opacity(t);
            			from.setOpacity(opacity.from);
            			to.setOpacity(opacity.to);

            			// transform
            			var transformFrom = interpolators.transformFrom(t);
            			var transformTo = interpolators.transformTo(1 - t);
            			from.setTransform(transformFrom);
            			to.setTransform(transformTo);

            			// background color
            			if (interpolators.backgroundColor) {
            				var backgroundColor = interpolators.backgroundColor(t);
            				from.setBackgroundColor(backgroundColor.from);
            				to.setBackgroundColor(backgroundColor.to);
            			}

            			// border radius
            			if (interpolators.borderRadius) {
            				var borderRadius = interpolators.borderRadius(t);
            				from.setBorderRadius(borderRadius.from);
            				to.setBorderRadius(borderRadius.to);
            			}

            			return transformer;
            		},
            		pause: function () {
            			if (!running) return transformer;
            			running = false;

            			if (!useTimer) {
            				// TODO derive current position somehow, use that rather than
            				// current computed style (from and to get out of sync in
            				// some browsers?)
            				remaining = endTime - Date.now();

            				from.freeze();
            				to.freeze();
            				disposeCss();
            			}

            			return transformer;
            		},
            		play: function () {
            			if (running) return transformer;
            			running = true;

            			endTime = Date.now() + remaining;

            			if (useTimer) {
            				rAF(tick);
            			} else {
            				var _getKeyframes = getKeyframes(from, to, interpolators, options.easing || linear, remaining, duration);

            				var fromKeyframes = _getKeyframes.fromKeyframes;
            				var toKeyframes = _getKeyframes.toKeyframes;

            				var fromId = generateId();
            				var toId = generateId();

            				var css = '\n\t\t\t\t\t' + KEYFRAMES + ' ' + fromId + ' { ' + fromKeyframes + ' }\n\t\t\t\t\t' + KEYFRAMES + ' ' + toId + '   { ' + toKeyframes + ' }';

            				disposeCss = addCss(css);

            				from.animateWithKeyframes(fromId, remaining);
            				to.animateWithKeyframes(toId, remaining);
            			}

            			return transformer;
            		}
            	};

            	// handle animation end
            	if (!useTimer) {
            		(function () {
            			var animating = 2;

            			var done = function () {
            				if (! --animating) {
            					transformer.teardown();

            					if (options.done) options.done();

            					disposeCss();
            				}
            			};

            			from._clone.addEventListener(ANIMATION_END, done);
            			to._clone.addEventListener(ANIMATION_END, done);
            		})();
            	}

            	return transformer.play();
            }

            function transform(fromNode, toNode) {
            	var options = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

            	if (typeof options === 'function') {
            		options = { done: options };
            	}

            	if (!('duration' in options)) {
            		options.duration = 400;
            	}

            	var from = new Wrapper(fromNode, options);
            	var to = new Wrapper(toNode, options);

            	var order = compare(from._node, to._node);

            	from.setOpacity(1);
            	to.setOpacity(0);

            	// in many cases, the stacking order of `from` and `to` is
            	// determined by their relative location in the document –
            	// so we need to preserve it
            	if (order === 1) {
            		to.insert();
            		from.insert();
            	} else {
            		from.insert();
            		to.insert();
            	}

            	return transformer(from, to, options);
            }

            function hide() {
            	for (var _len = arguments.length, nodes = Array(_len), _key = 0; _key < _len; _key++) {
            		nodes[_key] = arguments[_key];
            	}

            	nodes.forEach(hideNode);
            }

            function show() {
            	for (var _len2 = arguments.length, nodes = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
            		nodes[_key2] = arguments[_key2];
            	}

            	nodes.forEach(showNode);
            }

            exports.transform = transform;
            exports.hide = hide;
            exports.show = show;
            exports.linear = linear;
            exports.easeIn = easeIn;
            exports.easeOut = easeOut;
            exports.easeInOut = easeInOut;

}));
//# sourceMappingURL=ramjet.umd.js.map
