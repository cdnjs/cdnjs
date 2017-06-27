/**!
 * @fileOverview Kickass library to create and place poppers near their reference elements.
 * @version 1.0.4
 * @license
 * Copyright (c) 2016 Federico Zivolo and contributors
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */    
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.Popper = factory());
}(this, (function () { 'use strict';

/**
 * Returns the offset parent of the given element
 * @method
 * @memberof Popper.Utils
 * @argument {Element} element
 * @returns {Element} offset parent
 */
function getOffsetParent(element) {
    // NOTE: 1 DOM access here
    const offsetParent = element.offsetParent;
    const nodeName = offsetParent && offsetParent.nodeName;

    if (!nodeName || nodeName === 'BODY' || nodeName === 'HTML') {
        return window.document.documentElement;
    }

    return offsetParent;
}

/**
 * Get CSS computed property of the given element
 * @method
 * @memberof Popper.Utils
 * @argument {Eement} element
 * @argument {String} property
 */
function getStyleComputedProperty(element, property) {
    if (element.nodeType !== 1) {
        return [];
    }
    // NOTE: 1 DOM access here
    const css = window.getComputedStyle(element, null);
    return property ? css[property] : css;
}

/**
 * Returns the parentNode or the host of the element
 * @method
 * @memberof Popper.Utils
 * @argument {Element} element
 * @returns {Element} parent
 */
function getParentNode(element) {
    if (element.nodeName === 'HTML') {
        return element;
    }
    return element.parentNode || element.host;
}

/**
 * Returns the scrolling parent of the given element
 * @method
 * @memberof Popper.Utils
 * @argument {Element} element
 * @returns {Element} offset parent
 */
function getScrollParent(element) {
    // Return body, `getScroll` will take care to get the correct `scrollTop` from it
    if (!element || ['HTML', 'BODY', '#document'].indexOf(element.nodeName) !== -1) {
        return window.document.body;
    }

    // Firefox want us to check `-x` and `-y` variations as well
    const { overflow, overflowX, overflowY } = getStyleComputedProperty(element);
    if (/(auto|scroll)/.test(overflow + overflowY + overflowX)) {
        return element;
    }

    return getScrollParent(getParentNode(element));
}

function getWindowSizes() {
    const body = window.document.body;
    const html = window.document.documentElement;
    return {
        height: Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight),
        width: Math.max(body.scrollWidth, body.offsetWidth, html.clientWidth, html.scrollWidth, html.offsetWidth)
    };
}

/**
 * Get the position of the given element, relative to its offset parent
 * @method
 * @memberof Popper.Utils
 * @param {Element} element
 * @return {Object} position - Coordinates of the element and its `scrollTop`
 */
function getOffsetRect(element) {
    let elementRect;
    if (element.nodeName === 'HTML') {
        const { width, height } = getWindowSizes();
        elementRect = {
            width,
            height,
            left: 0,
            top: 0
        };
    } else {
        elementRect = {
            width: element.offsetWidth,
            height: element.offsetHeight,
            left: element.offsetLeft,
            top: element.offsetTop
        };
    }

    elementRect.right = elementRect.left + elementRect.width;
    elementRect.bottom = elementRect.top + elementRect.height;

    // position
    return elementRect;
}

/**
 * Check if the given element is fixed or is inside a fixed parent
 * @method
 * @memberof Popper.Utils
 * @argument {Element} element
 * @argument {Element} customContainer
 * @returns {Boolean} answer to "isFixed?"
 */
function isFixed(element) {
    const nodeName = element.nodeName;
    if (nodeName === 'BODY' || nodeName === 'HTML') {
        return false;
    }
    if (getStyleComputedProperty(element, 'position') === 'fixed') {
        return true;
    }
    return isFixed(getParentNode(element));
}

/**
 * Helper used to get the position which will be applied to the popper
 * @method
 * @memberof Popper.Utils
 * @param config {HTMLElement} popper element
 * @returns {HTMLElement} reference element
 */
function getPosition(element) {
  const container = getOffsetParent(element);

  // Decide if the popper will be fixed
  // If the reference element is inside a fixed context, the popper will be fixed as well to allow them to scroll together
  const isParentFixed = isFixed(container);
  return isParentFixed ? 'fixed' : 'absolute';
}

/**
 * Get bounding client rect of given element
 * @method
 * @memberof Popper.Utils
 * @param {HTMLElement} element
 * @return {Object} client rect
 */
function getBoundingClientRect(element) {
    const isIE10 = navigator.appVersion.indexOf('MSIE 10') !== -1;
    let rect;

    // IE10 10 FIX: Please, don't ask, the element isn't
    // considered in DOM in some circumstances...
    // This isn't reproducible in IE10 compatibility mode of IE11
    if (isIE10) {
        try {
            rect = element.getBoundingClientRect();
        } catch (err) {
            rect = {};
        }
    } else {
        rect = element.getBoundingClientRect();
    }

    const result = {
        left: rect.left,
        top: rect.top,
        right: rect.right,
        bottom: rect.bottom,
        width: rect.right - rect.left,
        height: rect.bottom - rect.top
    };

    // IE10 FIX: `getBoundingClientRect`, when executed on `documentElement`
    // will not take in account the `scrollTop` and `scrollLeft`
    if (element.nodeName === 'HTML' && isIE10) {
        const { scrollTop, scrollLeft } = window.document.documentElement;
        result.top -= scrollTop;
        result.bottom -= scrollTop;
        result.left -= scrollLeft;
        result.right -= scrollLeft;
    }

    // subtract scrollbar size from sizes
    let horizScrollbar = rect.width - (element.clientWidth || rect.right - rect.left);
    let vertScrollbar = rect.height - (element.clientHeight || rect.bottom - rect.top);

    // if an hypothetical scrollbar is detected, we must be sure it's not a `border`
    // we make this check conditional for performance reasons
    if (horizScrollbar || vertScrollbar) {
        const styles = getStyleComputedProperty(element);
        horizScrollbar -= Number(styles.borderLeftWidth.split('px')[0]) + Number(styles.borderRightWidth.split('px')[0]);
        vertScrollbar -= Number(styles.borderTopWidth.split('px')[0]) + Number(styles.borderBottomWidth.split('px')[0]);
    }

    result.right -= horizScrollbar;
    result.width -= horizScrollbar;
    result.bottom -= vertScrollbar;
    result.height -= vertScrollbar;

    return result;
}

function getScroll(element, side = 'top') {
    const upperSide = side === 'top' ? 'scrollTop' : 'scrollLeft';
    const nodeName = element.nodeName;

    if (nodeName === 'BODY' || nodeName === 'HTML') {
        const html = window.document.documentElement;
        const scrollingElement = window.document.scrollingElement || html;
        return scrollingElement[upperSide];
    }

    return element[upperSide];
}

/**
 * Given an element and one of its parents, return the offset
 * @method
 * @memberof Popper.Utils
 * @param {HTMLElement} element
 * @param {HTMLElement} parent
 * @return {Object} rect
 */
function getOffsetRectRelativeToCustomParent(element, parent, fixed = false, transformed = false) {
    const scrollParent = getScrollParent(parent);
    const elementRect = getBoundingClientRect(element);
    const parentRect = getBoundingClientRect(parent);

    const rect = {
        top: elementRect.top - parentRect.top,
        left: elementRect.left - parentRect.left,
        bottom: elementRect.top - parentRect.top + elementRect.height,
        right: elementRect.left - parentRect.left + elementRect.width,
        width: elementRect.width,
        height: elementRect.height
    };

    if (fixed && !transformed) {
        const scrollTop = getScroll(scrollParent, 'top');
        const scrollLeft = getScroll(scrollParent, 'left');
        rect.top -= scrollTop;
        rect.bottom -= scrollTop;
        rect.left -= scrollLeft;
        rect.right -= scrollLeft;
    }
    // When a popper doesn't have any positioned or scrollable parents, `offsetParent.contains(scrollParent)`
    // will return a "false positive". This is happening because `getOffsetParent` returns `html` node,
    // and `scrollParent` is the `body` node. Hence the additional check.
    else if (getOffsetParent(element).contains(scrollParent) && scrollParent.nodeName !== 'BODY') {
            const scrollTop = getScroll(parent, 'top');
            const scrollLeft = getScroll(parent, 'left');
            rect.top += scrollTop;
            rect.bottom += scrollTop;
            rect.left += scrollLeft;
            rect.right += scrollLeft;
        }

    // subtract borderTopWidth and borderTopWidth from final result
    const styles = getStyleComputedProperty(parent);
    const borderTopWidth = Number(styles.borderTopWidth.split('px')[0]);
    const borderLeftWidth = Number(styles.borderLeftWidth.split('px')[0]);

    rect.top -= borderTopWidth;
    rect.bottom -= borderTopWidth;
    rect.left -= borderLeftWidth;
    rect.right -= borderLeftWidth;

    return rect;
}

function getTotalScroll(element, side = 'top') {
    const scrollParent = getScrollParent(element);
    const scroll = getScroll(scrollParent, side);

    if (['BODY', 'HTML'].indexOf(scrollParent.nodeName) === -1) {
        return scroll + getTotalScroll(getParentNode(scrollParent), side);
    }
    return scroll;
}

/**
 * Computed the boundaries limits and return them
 * @method
 * @memberof Popper.Utils
 * @param {Object} data - Object containing the property "offsets" generated by `_getOffsets`
 * @param {Number} padding - Boundaries padding
 * @param {Element} boundariesElement - Element used to define the boundaries
 * @returns {Object} Coordinates of the boundaries
 */
function getBoundaries(popper, padding, boundariesElement) {
    // NOTE: 1 DOM access here
    let boundaries = { top: 0, left: 0 };
    const offsetParent = getOffsetParent(popper);

    // Handle viewport case
    if (boundariesElement === 'viewport') {
        const { left, top } = getOffsetRect(offsetParent);
        const { clientWidth: width, clientHeight: height } = window.document.documentElement;

        if (getPosition(popper) === 'fixed') {
            boundaries.right = width;
            boundaries.bottom = height;
        } else {
            const scrollLeft = getTotalScroll(popper, 'left');
            const scrollTop = getTotalScroll(popper, 'top');

            boundaries = {
                top: 0 - top,
                right: width - left + scrollLeft,
                bottom: height - top + scrollTop,
                left: 0 - left
            };
        }
    }
    // Handle other cases based on DOM element used as boundaries
    else {
            let boundariesNode;
            if (boundariesElement === 'scrollParent') {
                boundariesNode = getScrollParent(getParentNode(popper));
            } else if (boundariesElement === 'window') {
                boundariesNode = window.document.body;
            } else {
                boundariesNode = boundariesElement;
            }

            // In case of BODY, we need a different computation
            if (boundariesNode.nodeName === 'BODY') {
                const { height, width } = getWindowSizes();
                boundaries.right = width;
                boundaries.bottom = height;
            }
            // for all the other DOM elements, this one is good
            else {
                    boundaries = getOffsetRectRelativeToCustomParent(boundariesNode, offsetParent, isFixed(popper));
                }
        }

    // Add paddings
    boundaries.left += padding;
    boundaries.top += padding;
    boundaries.right -= padding;
    boundaries.bottom -= padding;

    return boundaries;
}

/**
 * Utility used to transform the `auto` placement to the placement with more
 * available space.
 * @method
 * @memberof Popper.Utils
 * @argument {Object} data - The data object generated by update method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The data object, properly modified
 */
function computeAutoPlacement(placement, refRect, popper) {
    if (placement.indexOf('auto') === -1) {
        return placement;
    }

    const boundaries = getBoundaries(popper, 0, 'scrollParent');

    const sides = {
        top: refRect.top - boundaries.top,
        right: boundaries.right - refRect.right,
        bottom: boundaries.bottom - refRect.bottom,
        left: refRect.left - boundaries.left
    };

    const computedPlacement = Object.keys(sides).sort((a, b) => sides[b] - sides[a])[0];
    const variation = placement.split('-')[1];

    return computedPlacement + (variation ? `-${ variation }` : '');
}

const nativeHints = ['native code', '[object MutationObserverConstructor]' // for mobile safari iOS 9.0
];

/**
 * Determine if a function is implemented natively (as opposed to a polyfill).
 * @argument {Function | undefined} fn the function to check
 * @returns {boolean}
 */
var isNative = (fn => nativeHints.some(hint => (fn || '').toString().indexOf(hint) > -1));

const longerTimeoutBrowsers = ['Edge', 'Trident', 'Firefox'];
let timeoutDuration = 0;
for (let i = 0; i < longerTimeoutBrowsers.length; i += 1) {
    if (navigator.userAgent.indexOf(longerTimeoutBrowsers[i]) >= 0) {
        timeoutDuration = 1;
        break;
    }
}

function microtaskDebounce(fn) {
    let scheduled = false;
    let i = 0;
    let elem = document.createElement('span');

    // MutationObserver provides a mechanism for scheduling microtasks, which
    // are scheduled *before* the next task. This gives us a way to debounce
    // a function but ensure it's called *before* the next paint.
    const observer = new MutationObserver(() => {
        fn();
        scheduled = false;
    });

    observer.observe(elem, { attributes: true });

    return () => {
        if (!scheduled) {
            scheduled = true;
            elem.setAttribute('x-index', i);
            i = i + 1; // don't use compund (+=) because it doesn't get optimized in V8
        }
    };
}

function taskDebounce(fn) {
    let scheduled = false;
    return () => {
        if (!scheduled) {
            scheduled = true;
            setTimeout(() => {
                scheduled = false;
                fn();
            }, timeoutDuration);
        }
    };
}

// It's common for MutationObserver polyfills to be seen in the wild, however
// these rely on Mutation Events which only occur when an element is connected
// to the DOM. The algorithm used in this module does not use a connected element,
// and so we must ensure that a *native* MutationObserver is available.
const supportsNativeMutationObserver = isNative(window.MutationObserver);

/**
* Create a debounced version of a method, that's asynchronously deferred
* but called in the minimum time possible.
*
* @method
* @memberof Popper.Utils
* @argument {Function} fn
* @returns {Function}
*/
var debounce = supportsNativeMutationObserver ? microtaskDebounce : taskDebounce;

/**
 * Mimics the `find` method of Array
 * @method
 * @memberof Popper.Utils
 * @argument {Array} arr
 * @argument prop
 * @argument value
 * @returns index or -1
 */
function findIndex$1(arr, check) {
    // use native find if supported
    if (Array.prototype.find) {
        return arr.find(check);
    }

    // use `filter` to obtain the same behavior of `find`
    return arr.filter(check)[0];
}

/**
 * Return the index of the matching object
 * @method
 * @memberof Popper.Utils
 * @argument {Array} arr
 * @argument prop
 * @argument value
 * @returns index or -1
 */
function findIndex(arr, prop, value) {
    // use native findIndex if supported
    if (Array.prototype.findIndex) {
        return arr.findIndex(cur => cur[prop] === value);
    }

    // use `find` + `indexOf` if `findIndex` isn't supported
    const match = findIndex$1(arr, obj => obj[prop] === value);
    return arr.indexOf(match);
}

var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};

/**
 * Given the popper offsets, generate an output similar to getBoundingClientRect
 * @method
 * @memberof Popper.Utils
 * @argument {Object} popperOffsets
 * @returns {Object} ClientRect like output
 */
function getClientRect(popperOffsets) {
    return _extends({}, popperOffsets, {
        right: popperOffsets.left + popperOffsets.width,
        bottom: popperOffsets.top + popperOffsets.height
    });
}

/**
 * Get the outer sizes of the given element (offset size + margins)
 * @method
 * @memberof Popper.Utils
 * @argument {Element} element
 * @returns {Object} object containing width and height properties
 */
function getOuterSizes(element) {
    const styles = window.getComputedStyle(element);
    const x = parseFloat(styles.marginTop) + parseFloat(styles.marginBottom);
    const y = parseFloat(styles.marginLeft) + parseFloat(styles.marginRight);
    const result = {
        width: element.offsetWidth + y,
        height: element.offsetHeight + x
    };
    return result;
}

/**
 * Get the opposite placement of the given one/
 * @method
 * @memberof Popper.Utils
 * @argument {String} placement
 * @returns {String} flipped placement
 */
function getOppositePlacement(placement) {
  const hash = { left: 'right', right: 'left', bottom: 'top', top: 'bottom' };
  return placement.replace(/left|right|bottom|top/g, matched => hash[matched]);
}

/**
 * Get offsets to the popper
 * @method
 * @memberof Popper.Utils
 * @param {Element} popper - the popper element
 * @param {Element} reference - the reference element (the popper will be relative to this)
 * @returns {Object} An object containing the offsets which will be applied to the popper
 */
function getPopperOffsets(state, popper, referenceOffsets, placement) {
    placement = placement.split('-')[0];

    // Get popper node sizes
    const popperRect = getOuterSizes(popper);

    // Add position, width and height to our offsets object
    const popperOffsets = {
        position: state.position,
        width: popperRect.width,
        height: popperRect.height
    };

    // depending by the popper placement we have to compute its offsets slightly differently
    const isHoriz = ['right', 'left'].indexOf(placement) !== -1;
    const mainSide = isHoriz ? 'top' : 'left';
    const secondarySide = isHoriz ? 'left' : 'top';
    const measurement = isHoriz ? 'height' : 'width';
    const secondaryMeasurement = !isHoriz ? 'height' : 'width';

    popperOffsets[mainSide] = referenceOffsets[mainSide] + referenceOffsets[measurement] / 2 - popperRect[measurement] / 2;
    if (placement === secondarySide) {
        popperOffsets[secondarySide] = referenceOffsets[secondarySide] - popperRect[secondaryMeasurement];
    } else {
        popperOffsets[secondarySide] = referenceOffsets[getOppositePlacement(secondarySide)];
    }

    return popperOffsets;
}

/**
 * Get offsets to the reference element
 * @method
 * @memberof Popper.Utils
 * @param {Object} state
 * @param {Element} popper - the popper element
 * @param {Element} reference - the reference element (the popper will be relative to this)
 * @returns {Object} An object containing the offsets which will be applied to the popper
 */
function getReferenceOffsets(state, popper, reference) {
  const isParentFixed = state.position === 'fixed';
  const isParentTransformed = state.isParentTransformed;
  const offsetParent = getOffsetParent(isParentFixed && isParentTransformed ? reference : popper);

  return getOffsetRectRelativeToCustomParent(reference, offsetParent, isParentFixed, isParentTransformed);
}

/**
 * Get the prefixed supported property name
 * @method
 * @memberof Popper.Utils
 * @argument {String} property (camelCase)
 * @returns {String} prefixed property (camelCase)
 */
function getSupportedPropertyName(property) {
    const prefixes = [false, 'ms', 'webkit', 'moz', 'o'];
    const upperProp = property.charAt(0).toUpperCase() + property.slice(1);

    for (let i = 0; i < prefixes.length - 1; i++) {
        const prefix = prefixes[i];
        const toCheck = prefix ? `${ prefix }${ upperProp }` : property;
        if (typeof window.document.body.style[toCheck] !== 'undefined') {
            return toCheck;
        }
    }
    return null;
}

/**
 * Check if the given variable is a function
 * @method
 * @memberof Popper.Utils
 * @argument {Element} element - Element to check
 * @returns {Boolean} answer to: is a function?
 */
function isFunction(functionToCheck) {
  const getType = {};
  return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
}

/**
 * Helper used to know if the given modifier is enabled.
 * @method
 * @memberof Popper.Utils
 * @returns {Boolean}
 */
function isModifierEnabled(modifiers, modifierName) {
  return modifiers.some(({ name, enabled }) => enabled && name === modifierName);
}

/**
 * Helper used to know if the given modifier depends from another one.
 * It checks if the needed modifier is listed and enabled.
 * @method
 * @memberof Popper.Utils
 * @returns {Boolean}
 */
function isModifierRequired(modifiers, requestingName, requestedName) {
  const requesting = findIndex$1(modifiers, ({ name }) => name === requestingName);

  return !!requesting && modifiers.some(modifier => {
    return modifier.name === requestedName && modifier.enabled && modifier.order < requesting.order;
  });
}

/**
 * Tells if a given input is a number
 * @method
 * @memberof Popper.Utils
 * @param {*} input to check
 * @return {Boolean}
 */
function isNumeric(n) {
  return n !== '' && !isNaN(parseFloat(n)) && isFinite(n);
}

/**
 * Check if the given element has transforms applied to itself or a parent
 * @method
 * @memberof Popper.Utils
 * @param  {Element} element
 * @return {Boolean} answer to "isTransformed?"
 */
function isTransformed(element) {
    if (element.nodeName === 'BODY') {
        return false;
    }
    if (getStyleComputedProperty(element, 'transform') !== 'none') {
        return true;
    }
    return getParentNode(element) ? isTransformed(getParentNode(element)) : element;
}

/**
 * Remove event listeners used to update the popper position
 * @method
 * @memberof Popper.Utils
 * @private
 */
function removeEventListeners(reference, state) {
    // NOTE: 1 DOM access here
    window.removeEventListener('resize', state.updateBound);
    if (state.scrollElement) {
        state.scrollElement.removeEventListener('scroll', state.updateBound);
    }
    state.updateBound = null;
    state.scrollElement = null;
    state.eventsEnabled = false;
    return state;
}

/**
 * Loop trough the list of modifiers and run them in order, each of them will then edit the data object
 * @method
 * @memberof Popper.Utils
 * @param {Object} data
 * @param {Array} modifiers
 * @param {Function} ends
 */
function runModifiers(modifiers, data, ends) {
    const modifiersToRun = ends === undefined ? modifiers : modifiers.slice(0, findIndex(modifiers, 'name', ends));

    modifiersToRun.forEach(modifier => {
        if (modifier.enabled && isFunction(modifier.function)) {
            data = modifier.function(data, modifier);
        }
    });

    return data;
}

/**
 * Set the attributes to the given popper
 * @method
 * @memberof Popper.Utils
 * @argument {Element} element - Element to apply the attributes to
 * @argument {Object} styles - Object with a list of properties and values which will be applied to the element
 */
function setAttributes(element, attributes) {
    Object.keys(attributes).forEach(function (prop) {
        const value = attributes[prop];
        if (value !== false) {
            element.setAttribute(prop, attributes[prop]);
        } else {
            element.removeAttribute(prop);
        }
    });
}

/**
 * Set the style to the given popper
 * @method
 * @memberof Popper.Utils
 * @argument {Element} element - Element to apply the style to
 * @argument {Object} styles - Object with a list of properties and values which will be applied to the element
 */
function setStyles(element, styles) {
    Object.keys(styles).forEach(prop => {
        let unit = '';
        // add unit if the value is numeric and is one of the following
        if (['width', 'height', 'top', 'right', 'bottom', 'left'].indexOf(prop) !== -1 && isNumeric(styles[prop])) {
            unit = 'px';
        }
        element.style[prop] = styles[prop] + unit;
    });
}

/**
 * Setup needed event listeners used to update the popper position
 * @method
 * @memberof Popper.Utils
 * @private
 */
function setupEventListeners(reference, options, state, updateBound) {
    // NOTE: 1 DOM access here
    state.updateBound = updateBound;
    window.addEventListener('resize', state.updateBound, { passive: true });
    let target = getScrollParent(reference);
    if (target.nodeName === 'BODY') {
        target = window;
    }
    target.addEventListener('scroll', state.updateBound, { passive: true });
    state.scrollElement = target;
    state.eventsEnabled = true;

    return state;
}

/** @namespace Popper.Utils */
var Utils = {
    computeAutoPlacement,
    debounce,
    findIndex,
    getBoundaries,
    getBoundingClientRect,
    getClientRect,
    getOffsetParent,
    getOffsetRect,
    getOffsetRectRelativeToCustomParent,
    getOuterSizes,
    getParentNode,
    getPopperOffsets,
    getPosition,
    getReferenceOffsets,
    getScroll,
    getScrollParent,
    getStyleComputedProperty,
    getSupportedPropertyName,
    getTotalScroll,
    getWindowSizes,
    isFixed,
    isFunction,
    isModifierEnabled,
    isModifierRequired,
    isNative,
    isNumeric,
    isTransformed,
    removeEventListeners,
    runModifiers,
    setAttributes,
    setStyles,
    setupEventListeners
};

/**
 * Apply the computed styles to the popper element
 * @method
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by `update` method
 * @argument {Object} data.styles - List of style properties - values to apply to popper element
 * @argument {Object} data.attributes - List of attribute properties - values to apply to popper element
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The same data object
 */
function applyStyle(data, options) {
    // apply the final offsets to the popper
    // NOTE: 1 DOM access here
    const styles = {
        position: data.offsets.popper.position
    };

    const attributes = {
        'x-placement': data.placement
    };

    // round top and left to avoid blurry text
    const left = Math.round(data.offsets.popper.left);
    const top = Math.round(data.offsets.popper.top);

    // if gpuAcceleration is set to true and transform is supported,
    //  we use `translate3d` to apply the position to the popper we
    // automatically use the supported prefixed version if needed
    const prefixedProperty = getSupportedPropertyName('transform');
    if (options.gpuAcceleration && prefixedProperty) {
        styles[prefixedProperty] = 'translate3d(' + left + 'px, ' + top + 'px, 0)';
        styles.top = 0;
        styles.left = 0;
        styles.willChange = 'transform';
    }
    // othwerise, we use the standard `left` and `top` properties
    else {
            styles.left = left;
            styles.top = top;
            styles.willChange = 'top, left';
        }

    // any property present in `data.styles` will be applied to the popper,
    // in this way we can make the 3rd party modifiers add custom styles to it
    // Be aware, modifiers could override the properties defined in the previous
    // lines of this modifier!
    setStyles(data.instance.popper, _extends({}, styles, data.styles));

    // any property present in `data.attributes` will be applied to the popper,
    // they will be set as HTML attributes of the element
    setAttributes(data.instance.popper, _extends({}, attributes, data.attributes));

    // if the arrow style has been computed, apply the arrow style
    if (data.offsets.arrow) {
        setStyles(data.arrowElement, data.offsets.arrow);
    }

    return data;
}

/**
 * Set the x-placement attribute before everything else because it could be used to add margins to the popper
 * margins needs to be calculated to get the correct popper offsets
 * @method
 * @memberof Popper.modifiers
 * @param {HTMLElement} reference - The reference element used to position the popper
 * @param {HTMLElement} popper - The HTML element used as popper.
 * @param {Object} options - Popper.js options
 */
function applyStyleOnLoad(reference, popper, options, modifierOptions, state) {
    // compute reference element offsets
    const referenceOffsets = getReferenceOffsets(state, popper, reference);

    // compute auto placement, store placement inside the data object,
    // modifiers will be able to edit `placement` if needed
    // and refer to originalPlacement to know the original value
    options.placement = computeAutoPlacement(options.placement, referenceOffsets, popper);

    popper.setAttribute('x-placement', options.placement);
    return options;
}

/**
 * Modifier used to move the arrowElements on the edge of the popper to make sure them are always between the popper and the reference element
 * It will use the CSS outer size of the arrowElement element to know how many pixels of conjuction are needed
 * @method
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by update method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The data object, properly modified
 */
function arrow(data, options) {
    // arrow depends on keepTogether in order to work
    if (!isModifierRequired(data.instance.modifiers, 'arrow', 'keepTogether')) {
        console.warn('WARNING: `keepTogether` modifier is required by arrow modifier in order to work, be sure to include it before `arrow`!');
        return data;
    }

    let arrowElement = options.element;

    // if arrowElement is a string, suppose it's a CSS selector
    if (typeof arrowElement === 'string') {
        arrowElement = data.instance.popper.querySelector(arrowElement);

        // if arrowElement is not found, don't run the modifier
        if (!arrowElement) {
            return data;
        }
    } else {
        // if the arrowElement isn't a query selector we must check that the
        // provided DOM node is child of its popper node
        if (!data.instance.popper.contains(arrowElement)) {
            console.warn('WARNING: `arrow.element` must be child of its popper element!');
            return data;
        }
    }

    const placement = data.placement.split('-')[0];
    const popper = getClientRect(data.offsets.popper);
    const reference = data.offsets.reference;
    const isVertical = ['left', 'right'].indexOf(placement) !== -1;

    const len = isVertical ? 'height' : 'width';
    const side = isVertical ? 'top' : 'left';
    const altSide = isVertical ? 'left' : 'top';
    const opSide = isVertical ? 'bottom' : 'right';
    const arrowElementSize = getOuterSizes(arrowElement)[len];

    //
    // extends keepTogether behavior making sure the popper and its reference have enough pixels in conjuction
    //

    // top/left side
    if (reference[opSide] - arrowElementSize < popper[side]) {
        data.offsets.popper[side] -= popper[side] - (reference[opSide] - arrowElementSize);
    }
    // bottom/right side
    if (reference[side] + arrowElementSize > popper[opSide]) {
        data.offsets.popper[side] += reference[side] + arrowElementSize - popper[opSide];
    }

    // compute center of the popper
    const center = reference[side] + reference[len] / 2 - arrowElementSize / 2;

    // Compute the sideValue using the updated popper offsets
    let sideValue = center - getClientRect(data.offsets.popper)[side];

    // prevent arrowElement from being placed not contiguously to its popper
    sideValue = Math.max(Math.min(popper[len] - arrowElementSize, sideValue), 0);

    data.arrowElement = arrowElement;
    data.offsets.arrow = {};
    data.offsets.arrow[side] = sideValue;
    data.offsets.arrow[altSide] = ''; // make sure to unset any eventual altSide value from the DOM node

    return data;
}

/**
 * Get the opposite placement variation of the given one/
 * @method
 * @memberof Popper.Utils
 * @argument {String} placement variation
 * @returns {String} flipped placement variation
 */
function getOppositeVariation(variation) {
    if (variation === 'end') {
        return 'start';
    } else if (variation === 'start') {
        return 'end';
    }
    return variation;
}

/**
 * Modifier used to flip the placement of the popper when the latter is starting overlapping its reference element.
 * Requires the `preventOverflow` modifier before it in order to work.
 * **NOTE:** data.instance modifier will run all its previous modifiers everytime it tries to flip the popper!
 * @method
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by update method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The data object, properly modified
 */
function flip(data, options) {
    // if `inner` modifier is enabled, we can't use the `flip` modifier
    if (isModifierEnabled(data.instance.modifiers, 'inner')) {
        return data;
    }

    if (data.flipped && data.placement === data.originalPlacement) {
        // seems like flip is trying to loop, probably there's not enough space on any of the flippable sides
        return data;
    }

    const boundaries = getBoundaries(data.instance.popper, options.padding, options.boundariesElement);

    let placement = data.placement.split('-')[0];
    let placementOpposite = getOppositePlacement(placement);
    let variation = data.placement.split('-')[1] || '';

    let flipOrder = [];

    if (options.behavior === 'flip') {
        flipOrder = [placement, placementOpposite];
    } else {
        flipOrder = options.behavior;
    }

    flipOrder.forEach((step, index) => {
        if (placement !== step || flipOrder.length === index + 1) {
            return data;
        }

        placement = data.placement.split('-')[0];
        placementOpposite = getOppositePlacement(placement);

        const popperOffsets = getClientRect(data.offsets.popper);
        const refOffsets = data.offsets.reference;

        // using Math.floor because the reference offsets may contain decimals we are not going to consider here
        const overlapsRef = placement === 'left' && Math.floor(popperOffsets.right) > Math.floor(refOffsets.left) || placement === 'right' && Math.floor(popperOffsets.left) < Math.floor(refOffsets.right) || placement === 'top' && Math.floor(popperOffsets.bottom) > Math.floor(refOffsets.top) || placement === 'bottom' && Math.floor(popperOffsets.top) < Math.floor(refOffsets.bottom);

        const overflowsBoundaries = placement === 'left' && Math.floor(popperOffsets.left) < Math.floor(boundaries.left) || placement === 'right' && Math.floor(popperOffsets.right) > Math.floor(boundaries.right) || placement === 'top' && Math.floor(popperOffsets.top) < Math.floor(boundaries.top) || placement === 'bottom' && Math.floor(popperOffsets.bottom) > Math.floor(boundaries.bottom);

        // flip the variation if required
        const isVertical = ['top', 'bottom'].indexOf(placement) !== -1;
        const flippedVariation = !!options.flipVariations && (isVertical && variation === 'start' && Math.floor(popperOffsets.left) < Math.floor(boundaries.left) || isVertical && variation === 'end' && Math.floor(popperOffsets.right) > Math.floor(boundaries.right) || !isVertical && variation === 'start' && Math.floor(popperOffsets.top) < Math.floor(boundaries.top) || !isVertical && variation === 'end' && Math.floor(popperOffsets.bottom) > Math.floor(boundaries.bottom));

        if (overlapsRef || overflowsBoundaries || flippedVariation) {
            // this boolean to detect any flip loop
            data.flipped = true;

            if (overlapsRef || overflowsBoundaries) {
                placement = flipOrder[index + 1];
            }

            if (flippedVariation) {
                variation = getOppositeVariation(variation);
            }

            data.placement = placement + (variation ? '-' + variation : '');
            data.offsets.popper = getPopperOffsets(data.instance.state, data.instance.popper, data.offsets.reference, data.placement);

            data = runModifiers(data.instance.modifiers, data, 'flip');
        }
    });
    return data;
}

/**
 * Modifier used to make sure the popper is always near its reference element
 * It cares only about the first axis, you can still have poppers with margin
 * between the popper and its reference element.
 * @method
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by update method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The data object, properly modified
 */
function keepTogether(data) {
    const popper = getClientRect(data.offsets.popper);
    const reference = data.offsets.reference;
    const placement = data.placement.split('-')[0];
    const floor = Math.floor;

    if (['top', 'bottom'].indexOf(placement) !== -1) {
        if (popper.right < floor(reference.left)) {
            data.offsets.popper.left = floor(reference.left) - popper.width;
        }
        if (popper.left > floor(reference.right)) {
            data.offsets.popper.left = floor(reference.right);
        }
    } else {
        if (popper.bottom < floor(reference.top)) {
            data.offsets.popper.top = floor(reference.top) - popper.height;
        }
        if (popper.top > floor(reference.bottom)) {
            data.offsets.popper.top = floor(reference.bottom);
        }
    }

    return data;
}

/**
 * Modifier used to add an offset to the popper, useful if you more granularity positioning your popper.
 * The offsets will shift the popper on the side of its reference element.
 * @method
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by update method
 * @argument {Object} options - Modifiers configuration and options
 * @argument {Number|String} options.offset=0
 *      Basic usage allows a number used to nudge the popper by the given amount of pixels.
 *      You can pass a percentage value as string (eg. `20%`) to nudge by the given percentage (relative to reference element size)
 *      Other supported units are `vh` and `vw` (relative to viewport)
 *      Additionally, you can pass a pair of values (eg. `10 20` or `2vh 20%`) to nudge the popper
 *      on both axis.
 *      A note about percentage values, if you want to refer a percentage to the popper size instead of the reference element size,
 *      use `%p` instead of `%` (eg: `20%p`). To make it clearer, you can replace `%` with `%r` and use eg.`10%p 25%r`.
 *      > **Heads up!** The order of the axis is relative to the popper placement: `bottom` or `top` are `X,Y`, the other are `Y,X`
 * @returns {Object} The data object, properly modified
 */
function offset(data, options) {
    const placement = data.placement;
    const popper = data.offsets.popper;

    let offsets;
    if (isNumeric(options.offset)) {
        offsets = [options.offset, 0];
    } else {
        // split the offset in case we are providing a pair of offsets separated
        // by a blank space
        offsets = options.offset.split(' ');

        // itherate through each offset to compute them in case they are percentages
        offsets = offsets.map((offset, index) => {
            // separate value from unit
            const split = offset.match(/(\d*\.?\d*)(.*)/);
            const value = +split[1];
            const unit = split[2];

            // use height if placement is left or right and index is 0 otherwise use width
            // in this way the first offset will use an axis and the second one
            // will use the other one
            let useHeight = placement.indexOf('right') !== -1 || placement.indexOf('left') !== -1;

            if (index === 1) {
                useHeight = !useHeight;
            }

            const measurement = useHeight ? 'height' : 'width';

            // if is a percentage, we calculate the value of it using as base the
            // sizes of the reference element
            if (unit === '%' || unit === '%r') {
                const referenceRect = getClientRect(data.offsets.reference);
                let len = referenceRect[measurement];
                return len / 100 * value;
            }
            // if is a percentage relative to the popper, we calculate the value of it using
            // as base the sizes of the popper
            else if (unit === '%p') {
                    const popperRect = getClientRect(data.offsets.popper);
                    let len = popperRect[measurement];
                    return len / 100 * value;
                }
                // if is a vh or vw, we calculate the size based on the viewport
                else if (unit === 'vh' || unit === 'vw') {
                        let size;
                        if (unit === 'vh') {
                            size = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
                        } else {
                            size = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
                        }
                        return size / 100 * value;
                    }
                    // if is an explicit pixel unit, we get rid of the unit and keep the value
                    else if (unit === 'px') {
                            return +value;
                        }
                        // if is an implicit unit, it's px, and we return just the value
                        else {
                                return +offset;
                            }
        });
    }

    if (data.placement.indexOf('left') !== -1) {
        popper.top += offsets[0];
        popper.left -= offsets[1] || 0;
    } else if (data.placement.indexOf('right') !== -1) {
        popper.top += offsets[0];
        popper.left += offsets[1] || 0;
    } else if (data.placement.indexOf('top') !== -1) {
        popper.left += offsets[0];
        popper.top -= offsets[1] || 0;
    } else if (data.placement.indexOf('bottom') !== -1) {
        popper.left += offsets[0];
        popper.top += offsets[1] || 0;
    }
    return data;
}

/**
 * Modifier used to prevent the popper from being positioned outside the boundary.
 *
 * An scenario exists where the reference itself is not within the boundaries. We can
 * say it has "escaped the boundaries" — or just "escaped". In this case we need to
 * decide whether the popper should either:
 *
 * - detach from the reference and remain "trapped" in the boundaries, or
 * - if it should be ignore the boundary and "escape with the reference"
 *
 * When `escapeWithReference` is `true`, and reference is completely outside the
 * boundaries, the popper will overflow (or completely leave) the boundaries in order
 * to remain attached to the edge of the reference.
 *
 * @method
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by `update` method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The data object, properly modified
 */
function preventOverflow(data, options) {
    const boundariesElement = options.boundariesElement || getOffsetParent(data.instance.popper);
    const boundaries = getBoundaries(data.instance.popper, options.padding, boundariesElement);
    options.boundaries = boundaries;

    const order = options.priority;
    let popper = getClientRect(data.offsets.popper);

    const check = {
        left() {
            let left = popper.left;
            if (popper.left < boundaries.left && !shouldOverflowBoundary(data, options, 'left')) {
                left = Math.max(popper.left, boundaries.left);
            }
            return { left };
        },
        right() {
            let left = popper.left;
            if (popper.right > boundaries.right && !shouldOverflowBoundary(data, options, 'right')) {
                left = Math.min(popper.left, boundaries.right - popper.width);
            }
            return { left };
        },
        top() {
            let top = popper.top;
            if (popper.top < boundaries.top && !shouldOverflowBoundary(data, options, 'top')) {
                top = Math.max(popper.top, boundaries.top);
            }
            return { top };
        },
        bottom() {
            let top = popper.top;
            if (popper.bottom > boundaries.bottom && !shouldOverflowBoundary(data, options, 'bottom')) {
                top = Math.min(popper.top, boundaries.bottom - popper.height);
            }
            return { top };
        }
    };

    order.forEach(direction => {
        popper = _extends({}, popper, check[direction]());
    });

    data.offsets.popper = popper;

    return data;
}

/**
 * Determine if the popper should overflow a boundary edge to stay together with the reference.
 */
function shouldOverflowBoundary(data, options, overflowDirection) {
    if (!options.escapeWithReference) {
        return false;
    }

    if (data.flipped && isSameAxis(data.originalPlacement, overflowDirection)) {
        return true;
    }

    if (!isSameAxis(data.originalPlacement, overflowDirection)) {
        return true;
    }

    return true;
}

/**
 * Determine if two placement values are on the same axis.
 */
function isSameAxis(a, b) {
    // placement syntax:
    //
    //     ( "top" | "right" | "bottom" | "left" ) ( "-start" | "" | "-end" )
    //     |------------- Direction -------------|
    //
    const aDirection = a.split('-')[0];
    const bDirection = b.split('-')[0];

    return aDirection === bDirection || aDirection === getOppositePlacement(b);
}

/**
 * Modifier used to shift the popper on the start or end of its reference element side
 * @method
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by `update` method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The data object, properly modified
 */
function shift(data) {
    const placement = data.placement;
    const basePlacement = placement.split('-')[0];
    const shiftvariation = placement.split('-')[1];

    // if shift shiftvariation is specified, run the modifier
    if (shiftvariation) {
        const reference = data.offsets.reference;
        const popper = getClientRect(data.offsets.popper);

        const shiftOffsets = {
            y: {
                start: { top: reference.top },
                end: { top: reference.top + reference.height - popper.height }
            },
            x: {
                start: { left: reference.left },
                end: { left: reference.left + reference.width - popper.width }
            }
        };

        const axis = ['bottom', 'top'].indexOf(basePlacement) !== -1 ? 'x' : 'y';

        data.offsets.popper = _extends({}, popper, shiftOffsets[axis][shiftvariation]);
    }

    return data;
}

/**
 * Modifier used to hide the popper when its reference element is outside of the
 * popper boundaries. It will set an x-hidden attribute which can be used to hide
 * the popper when its reference is out of boundaries.
 * @method
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by update method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The data object, properly modified
 */
function hide(data) {
    if (!isModifierRequired(data.instance.modifiers, 'hide', 'preventOverflow')) {
        console.warn('WARNING: preventOverflow modifier is required by hide modifier in order to work, be sure to include it before hide!');
        return data;
    }

    const refRect = data.offsets.reference;
    const bound = findIndex$1(data.instance.modifiers, modifier => modifier.name === 'preventOverflow').boundaries;

    if (refRect.bottom < bound.top || refRect.left > bound.right || refRect.top > bound.bottom || refRect.right < bound.left) {
        // Avoid unnecessary DOM access if visibility hasn't changed
        if (data.hide === true) {
            return data;
        }

        data.hide = true;
        data.attributes['x-out-of-boundaries'] = '';
    } else {
        // Avoid unnecessary DOM access if visibility hasn't changed
        if (data.hide === false) {
            return data;
        }

        data.hide = false;
        data.attributes['x-out-of-boundaries'] = false;
    }

    return data;
}

/**
 * Modifier used to make the popper flow toward the inner of the reference element.
 * By default, when this modifier is disabled, the popper will be placed outside
 * the reference element.
 * @method
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by `update` method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The data object, properly modified
 */
function inner(data) {
    const placement = data.placement;
    const basePlacement = placement.split('-')[0];
    const popper = getClientRect(data.offsets.popper);
    const reference = getClientRect(data.offsets.reference);
    const isHoriz = ['left', 'right'].indexOf(basePlacement) !== -1;

    const subtractLength = ['top', 'left'].indexOf(basePlacement) === -1;

    popper[isHoriz ? 'left' : 'top'] = reference[placement] - (subtractLength ? popper[isHoriz ? 'width' : 'height'] : 0);

    data.placement = getOppositePlacement(placement);
    data.offsets.popper = getClientRect(popper);

    return data;
}

/**
 * Modifiers are plugins used to alter the behavior of your poppers.
 * Popper.js uses a set of 7 modifiers to provide all the basic functionalities
 * needed by the library.
 *
 * Each modifier is an object containing several properties listed below.
 * @namespace Modifiers
 * @param {Object} modifier - Modifier descriptor
 * @param {Integer} modifier.order
 *      The `order` property defines the execution order of the modifiers.
 *      The built-in modifiers have orders with a gap of 100 units in between,
 *      this allows you to inject additional modifiers between the existing ones
 *      without having to redefine the order of all of them.
 *      The modifiers are executed starting from the one with the lowest order.
 * @param {Boolean} modifier.enabled - When `true`, the modifier will be used.
 * @param {Modifiers~modifier} modifier.function - Modifier function.
 * @param {Modifiers~onLoad} modifier.onLoad - Function executed on popper initalization
 * @return {Object} data - Each modifier must return the modified `data` object.
 */
var modifiers = {
    shift: {
        order: 100,
        enabled: true,
        function: shift
    },
    offset: {
        order: 200,
        enabled: true,
        function: offset,
        // nudges popper from its origin by the given amount of pixels (can be negative)
        offset: 0
    },
    preventOverflow: {
        order: 300,
        enabled: true,
        function: preventOverflow,
        // popper will try to prevent overflow following these priorities
        //  by default, then, it could overflow on the left and on top of the boundariesElement
        priority: ['left', 'right', 'top', 'bottom'],
        // amount of pixel used to define a minimum distance between the boundaries and the popper
        // this makes sure the popper has always a little padding between the edges of its container
        padding: 5,
        boundariesElement: 'scrollParent'
    },
    keepTogether: {
        order: 400,
        enabled: true,
        function: keepTogether
    },
    arrow: {
        order: 500,
        enabled: true,
        function: arrow,
        // selector or node used as arrow
        element: '[x-arrow]'
    },
    flip: {
        order: 600,
        enabled: true,
        function: flip,
        // the behavior used to change the popper's placement
        behavior: 'flip',
        // the popper will flip if it hits the edges of the boundariesElement - padding
        padding: 5,
        boundariesElement: 'viewport'
    },
    inner: {
        order: 700,
        enabled: false,
        function: inner
    },
    hide: {
        order: 800,
        enabled: true,
        function: hide
    },
    applyStyle: {
        order: 900,
        enabled: true,
        // if true, it uses the CSS 3d transformation to position the popper
        gpuAcceleration: true,
        function: applyStyle,
        onLoad: applyStyleOnLoad
    }
};

/**
 * Modifiers can edit the `data` object to change the beheavior of the popper.
 * This object contains all the informations used by Popper.js to compute the
 * popper position.
 * The modifier can edit the data as needed, and then `return` it as result.
 *
 * @callback Modifiers~modifier
 * @param {dataObject} data
 * @return {dataObject} modified data
 */

/**
 * The `dataObject` is an object containing all the informations used by Popper.js
 * this object get passed to modifiers and to the `onCreate` and `onUpdate` callbacks.
 * @name dataObject
 * @property {Object} data.instance The Popper.js instance
 * @property {String} data.placement Placement applied to popper
 * @property {String} data.originalPlacement Placement originally defined on init
 * @property {Boolean} data.flipped True if popper has been flipped by flip modifier
 * @property {Boolean} data.hide True if the reference element is out of boundaries, useful to know when to hide the popper.
 * @property {HTMLElement} data.arrowElement Node used as arrow by arrow modifier
 * @property {Object} data.styles Any CSS property defined here will be applied to the popper, it expects the JavaScript nomenclature (eg. `marginBottom`)
 * @property {Object} data.boundaries Offsets of the popper boundaries
 * @property {Object} data.offsets The measurements of popper, reference and arrow elements.
 * @property {Object} data.offsets.popper `top`, `left`, `width`, `height` values
 * @property {Object} data.offsets.reference `top`, `left`, `width`, `height` values
 * @property {Object} data.offsets.arro] `top` and `left` offsets, only one of them will be different from 0
 */

// Utils
// Modifiers
// default options
const DEFAULTS = {
    // placement of the popper
    placement: 'bottom',

    // whether events (resize, scroll) are initially enabled
    eventsEnabled: true,

    /**
     * Callback called when the popper is created.
     * By default, is set to no-op.
     * Access Popper.js instance with `data.instance`.
     * @callback createCallback
     * @static
     * @param {dataObject} data
     */
    onCreate: () => {},

    /**
     * Callback called when the popper is updated, this callback is not called
     * on the initialization/creation of the popper, but only on subsequent
     * updates.
     * By default, is set to no-op.
     * Access Popper.js instance with `data.instance`.
     * @callback updateCallback
     * @static
     * @param {dataObject} data
     */
    onUpdate: () => {},

    // list of functions used to modify the offsets before they are applied to the popper
    modifiers
};

/**
 * Create a new Popper.js instance
 * @class Popper
 * @param {HTMLElement} reference - The reference element used to position the popper
 * @param {HTMLElement} popper - The HTML element used as popper.
 * @param {Object} options
 * @param {String} options.placement=bottom
 *      Placement of the popper accepted values: `top(-start, -end), right(-start, -end), bottom(-start, -end),
 *      left(-start, -end)`
 *
 * @param {Boolean} options.eventsEnabled=true
 *      Whether events (resize, scroll) are initially enabled
 * @param {Boolean} options.gpuAcceleration=true
 *      When this property is set to true, the popper position will be applied using CSS3 translate3d, allowing the
 *      browser to use the GPU to accelerate the rendering.
 *      If set to false, the popper will be placed using `top` and `left` properties, not using the GPU.
 *
 * @param {Boolean} options.removeOnDestroy=false
 *      Set to true if you want to automatically remove the popper when you call the `destroy` method.
 *
 * @param {Object} options.modifiers
 *      List of functions used to modify the data before they are applied to the popper (see source code for default values)
 *
 * @param {Object} options.modifiers.arrow - Arrow modifier configuration
 * @param {String|HTMLElement} options.modifiers.arrow.element='[x-arrow]'
 *      The DOM Node used as arrow for the popper, or a CSS selector used to get the DOM node. It must be child of
 *      its parent Popper. Popper.js will apply to the given element the style required to align the arrow with its
 *      reference element.
 *      By default, it will look for a child node of the popper with the `x-arrow` attribute.
 *
 * @param {Object} options.modifiers.offset - Offset modifier configuration
 * @param {Number} options.modifiers.offset.offset=0
 *      Amount of pixels the popper will be shifted (can be negative).
 *
 * @param {Object} options.modifiers.preventOverflow - PreventOverflow modifier configuration
 * @param {Array} [options.modifiers.preventOverflow.priority=['left', 'right', 'top', 'bottom']]
 *      Priority used when Popper.js tries to avoid overflows from the boundaries, they will be checked in order,
 *      this means that the last one will never overflow
 * @param {String|HTMLElement} options.modifiers.preventOverflow.boundariesElement='scrollParent'
 *      Boundaries used by the modifier, can be `scrollParent`, `window`, `viewport` or any DOM element.
 * @param {Number} options.modifiers.preventOverflow.padding=5
 *      Amount of pixel used to define a minimum distance between the boundaries and the popper
 *      this makes sure the popper has always a little padding between the edges of its container.
 *
 * @param {Object} options.modifiers.flip - Flip modifier configuration
 * @param {String|Array} options.modifiers.flip.behavior='flip'
 *      The behavior used by the `flip` modifier to change the placement of the popper when the latter is trying to
 *      overlap its reference element. Defining `flip` as value, the placement will be flipped on
 *      its axis (`right - left`, `top - bottom`).
 *      You can even pass an array of placements (eg: `['right', 'left', 'top']` ) to manually specify
 *      how alter the placement when a flip is needed. (eg. in the above example, it would first flip from right to left,
 *      then, if even in its new placement, the popper is overlapping its reference element, it will be moved to top)
 * @param {String|HTMLElement} options.modifiers.flip.boundariesElement='viewport'
 *      The element which will define the boundaries of the popper position, the popper will never be placed outside
 *      of the defined boundaries (except if `keepTogether` is enabled)
 *
 * @param {Object} options.modifiers.inner - Inner modifier configuration
 * @param {Number} options.modifiers.innner.enabled=false
 *      Set to `true` to make the popper flow toward the inner of the reference element.
 *
 * @param {Number} options.modifiers.flip.padding=5
 *      Amount of pixel used to define a minimum distance between the boundaries and the popper
 *      this makes sure the popper has always a little padding between the edges of its container.
 *
 * @param {createCallback} options.onCreate - onCreate callback
 *      Function called after the Popper has been instantiated.
 *
 * @param {updateCallback} options.onUpdate - onUpdate callback
 *      Function called on subsequent updates of Popper.
 *
 * @return {Object} instance - The generated Popper.js instance
 */
class Popper {
    constructor(reference, popper, options = {}) {
        this.scheduleUpdate = () => requestAnimationFrame(this.update);

        // make update() debounced, so that it only runs at most once-per-tick
        this.update = debounce(this.update.bind(this));

        // with {} we create a new object with the options inside it
        this.options = _extends({}, Popper.Defaults, options);

        // init state
        this.state = {
            isDestroyed: false,
            isCreated: false
        };

        // get reference and popper elements (allow jQuery wrappers)
        this.reference = reference.jquery ? reference[0] : reference;
        this.popper = popper.jquery ? popper[0] : popper;

        // refactoring modifiers' list (Object => Array)
        this.modifiers = Object.keys(Popper.Defaults.modifiers).map(name => _extends({ name }, Popper.Defaults.modifiers[name]));

        // assign default values to modifiers, making sure to override them with
        // the ones defined by user
        this.modifiers = this.modifiers.map(defaultConfig => {
            const userConfig = options.modifiers && options.modifiers[defaultConfig.name] || {};
            return _extends({}, defaultConfig, userConfig);
        });

        // add custom modifiers to the modifiers list
        if (options.modifiers) {
            this.options.modifiers = _extends({}, Popper.Defaults.modifiers, options.modifiers);
            Object.keys(options.modifiers).forEach(name => {
                // take in account only custom modifiers
                if (Popper.Defaults.modifiers[name] === undefined) {
                    const modifier = options.modifiers[name];
                    modifier.name = name;
                    this.modifiers.push(modifier);
                }
            });
        }

        // get the popper position type
        this.state.position = getPosition(this.reference);

        // sort the modifiers by order
        this.modifiers = this.modifiers.sort((a, b) => a.order - b.order);

        // modifiers have the ability to execute arbitrary code when Popper.js get inited
        // such code is executed in the same order of its modifier
        // they could add new properties to their options configuration
        // BE AWARE: don't add options to `options.modifiers.name` but to `modifierOptions`!
        this.modifiers.forEach(modifierOptions => {
            if (modifierOptions.enabled && isFunction(modifierOptions.onLoad)) {
                modifierOptions.onLoad(this.reference, this.popper, this.options, modifierOptions, this.state);
            }
        });

        // determine how we should set the origin of offsets
        this.state.isParentTransformed = isTransformed(this.popper.parentNode);

        // fire the first update to position the popper in the right place
        this.update();

        const eventsEnabled = this.options.eventsEnabled;
        if (eventsEnabled) {
            // setup event listeners, they will take care of update the position in specific situations
            this.enableEventListeners();
        }

        this.state.eventsEnabled = eventsEnabled;
    }

    //
    // Methods
    //

    /**
     * Updates the position of the popper, computing the new offsets and applying the new style
     * Prefer `scheduleUpdate` over `update` because of performance reasons
     * @method
     * @memberof Popper
     */
    update() {
        // if popper is destroyed, don't perform any further update
        if (this.state.isDestroyed) {
            return;
        }

        let data = {
            instance: this,
            styles: {},
            attributes: {},
            flipped: false,
            offsets: {}
        };

        // make sure to apply the popper position before any computation
        this.state.position = getPosition(this.reference);
        setStyles(this.popper, { position: this.state.position });

        // compute reference element offsets
        data.offsets.reference = getReferenceOffsets(this.state, this.popper, this.reference);

        // compute auto placement, store placement inside the data object,
        // modifiers will be able to edit `placement` if needed
        // and refer to originalPlacement to know the original value
        data.placement = computeAutoPlacement(this.options.placement, data.offsets.reference, this.popper);

        // store the computed placement inside `originalPlacement`
        data.originalPlacement = this.options.placement;

        // compute the popper offsets
        data.offsets.popper = getPopperOffsets(this.state, this.popper, data.offsets.reference, data.placement);

        // run the modifiers
        data = runModifiers(this.modifiers, data);

        // the first `update` will call `onCreate` callback
        // the other ones will call `onUpdate` callback
        if (!this.state.isCreated) {
            this.state.isCreated = true;
            this.options.onCreate(data);
        } else {
            this.options.onUpdate(data);
        }
    }

    /**
     * Schedule an update, it will run on the next UI update available
     * @method
     * @memberof Popper
     */


    /**
     * Destroy the popper
     * @method
     * @memberof Popper
     */
    destroy() {
        this.state.isDestroyed = true;

        // touch DOM only if `applyStyle` modifier is enabled
        if (isModifierEnabled(this.modifiers, 'applyStyle')) {
            this.popper.removeAttribute('x-placement');
            this.popper.style.left = '';
            this.popper.style.position = '';
            this.popper.style.top = '';
            this.popper.style[getSupportedPropertyName('transform')] = '';
        }

        this.disableEventListeners();

        // remove the popper if user explicity asked for the deletion on destroy
        // do not use `remove` because IE11 doesn't support it
        if (this.options.removeOnDestroy) {
            this.popper.parentNode.removeChild(this.popper);
        }
        return this;
    }

    /**
     * it will add resize/scroll events and start recalculating
     * position of the popper element when they are triggered
     * @method
     * @memberof Popper
     */
    enableEventListeners() {
        if (!this.state.eventsEnabled) {
            this.state = setupEventListeners(this.reference, this.options, this.state, this.scheduleUpdate);
        }
    }

    /**
     * it will remove resize/scroll events and won't recalculate
     * popper position when they are triggered. It also won't trigger onUpdate callback anymore,
     * unless you call 'update' method manually.
     * @method
     * @memberof Popper
     */
    disableEventListeners() {
        if (this.state.eventsEnabled) {
            window.cancelAnimationFrame(this.scheduleUpdate);
            this.state = removeEventListeners(this.reference, this.state);
        }
    }

    /**
     * Collection of utilities useful when writing custom modifiers
     * @memberof Popper
     */


    /**
     * List of accepted placements to use as values of the `placement` option
     * @memberof Popper
     */


    /**
     * Default Popper.js options
     * @memberof Popper
     */
}
Popper.Utils = Utils;
Popper.placements = ['auto', 'auto-start', 'auto-end', 'top', 'top-start', 'top-end', 'right', 'right-start', 'right-end', 'bottom', 'bottom-start', 'bottom-end', 'left', 'left-start', 'left-end'];
Popper.Defaults = DEFAULTS;

return Popper;

})));
//# sourceMappingURL=popper.js.map
