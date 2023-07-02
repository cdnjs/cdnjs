var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/* eslint max-lines: 0 */

import { isWindowClosed, linkFrameWindow } from 'cross-domain-utils/src';
import { ZalgoPromise } from 'zalgo-promise/src';
import { WeakMap } from 'cross-domain-safe-weakmap/src';

import { PopupOpenError } from '../error';


import { once, memoize, debounce } from './fn';
import { extend, safeInterval, urlEncode, capitalizeFirstLetter, stringify } from './util';

export function appendChild(container, child) {
    container.appendChild(child);
}

function isElement(element) {

    if (element instanceof window.Element) {
        return true;
    }

    if (element !== null && (typeof element === 'undefined' ? 'undefined' : _typeof(element)) === 'object' && element.nodeType === 1 && _typeof(element.style) === 'object' && _typeof(element.ownerDocument) === 'object') {
        return true;
    }

    return false;
}

export function querySelectorAll(el, selector) {
    return Array.prototype.slice.call(el.querySelectorAll(selector));
}

/*  Get Element
    -----------

    Gets an element based on

    - Element id
    - CSS Query selector
*/

export function getElementSafe(id) {

    if (isElement(id)) {
        // $FlowFixMe
        return id;
    }

    if (typeof id === 'string') {
        var element = document.getElementById(id);

        if (element) {
            return element;
        }

        if (document.querySelector) {
            element = document.querySelector(id);
        }

        if (element) {
            return element;
        }
    }
}

export function getElement(id) {

    var element = getElementSafe(id);

    if (element) {
        return element;
    }

    throw new Error('Can not find element: ' + stringify(id));
}

export var documentReady = new ZalgoPromise(function (resolve) {

    if (window.document.readyState === 'complete') {
        return resolve(window.document);
    }

    var interval = setInterval(function () {
        if (window.document.readyState === 'complete') {
            clearInterval(interval);
            return resolve(window.document);
        }
    }, 10);
});

export function isDocumentReady() {
    return window.document.readyState === 'complete';
}

export function elementReady(id) {
    return new ZalgoPromise(function (resolve, reject) {

        var name = stringify(id);
        var el = getElementSafe(id);

        if (el) {
            return resolve(el);
        }

        if (isDocumentReady()) {
            return reject(new Error('Document is ready and element ' + name + ' does not exist'));
        }

        var interval = setInterval(function () {

            el = getElementSafe(id);

            if (el) {
                clearInterval(interval);
                return resolve(el);
            }

            if (isDocumentReady()) {
                clearInterval(interval);
                return reject(new Error('Document is ready and element ' + name + ' does not exist'));
            }
        }, 10);
    });
}

/*  Popup
    -----

    Open a popup window with the specified option map
*/

export function popup(url, options) {

    // eslint-disable-next-line array-callback-return
    var params = Object.keys(options).map(function (key) {
        if (options[key]) {
            return key + '=' + stringify(options[key]);
        }
    }).filter(Boolean).join(',');

    var win = void 0;

    try {
        win = window.open(url, options.name, params, true);
    } catch (err) {
        throw new PopupOpenError('Can not open popup window - ' + (err.stack || err.message));
    }

    if (isWindowClosed(win)) {
        var err = new PopupOpenError('Can not open popup window - blocked');
        throw err;
    }

    return win;
}

export function writeToWindow(win, html) {
    try {
        win.document.open();
        win.document.write(html);
        win.document.close();
    } catch (err) {
        try {
            win.location = 'javascript: document.open(); document.write(' + JSON.stringify(html) + '); document.close();';
        } catch (err2) {
            // pass
        }
    }
}

export function writeElementToWindow(win, el) {

    var tag = el.tagName.toLowerCase();

    if (tag !== 'html') {
        throw new Error('Expected element to be html, got ' + tag);
    }

    var documentElement = win.document.documentElement;

    while (documentElement.children && documentElement.children.length) {
        documentElement.removeChild(documentElement.children[0]);
    }

    while (el.children.length) {
        documentElement.appendChild(el.children[0]);
    }
}

export function setStyle(el, styleText) {
    var doc = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : window.document;

    // $FlowFixMe
    if (el.styleSheet) {
        // $FlowFixMe
        el.styleSheet.cssText = styleText;
    } else {
        el.appendChild(doc.createTextNode(styleText));
    }
}

/*  Create Element
    --------------

    Create an element with style, html, classes, attributes etc. and append it to the specified container
*/

export function createElement() {
    var tag = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'div';
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var container = arguments[2];


    tag = tag.toLowerCase();
    var element = document.createElement(tag);

    if (options.style) {
        extend(element.style, options.style);
    }

    if (options['class']) {
        element.className = options['class'].join(' ');
    }

    if (options.attributes) {
        for (var _i2 = 0, _Object$keys2 = Object.keys(options.attributes), _length2 = _Object$keys2 == null ? 0 : _Object$keys2.length; _i2 < _length2; _i2++) {
            var key = _Object$keys2[_i2];
            element.setAttribute(key, options.attributes[key]);
        }
    }

    if (options.styleSheet) {
        setStyle(element, options.styleSheet);
    }

    if (container) {
        appendChild(container, element);
    }

    if (options.html) {
        if (tag === 'iframe') {
            // $FlowFixMe
            if (!container || !element.contentWindow) {
                throw new Error('Iframe html can not be written unless container provided and iframe in DOM');
            }

            // $FlowFixMe
            writeToWindow(element.contentWindow, options.html);
        } else {
            element.innerHTML = options.html;
        }
    }

    return element;
}

var awaitFrameLoadPromises = new WeakMap();

export function awaitFrameLoad(frame) {

    if (awaitFrameLoadPromises.has(frame)) {
        var _promise = awaitFrameLoadPromises.get(frame);
        if (_promise) {
            return _promise;
        }
    }

    var promise = new ZalgoPromise(function (resolve, reject) {
        frame.addEventListener('load', function () {
            linkFrameWindow(frame);
            resolve(frame);
        });

        frame.addEventListener('error', function (err) {
            if (frame.contentWindow) {
                resolve(frame);
            } else {
                reject(err);
            }
        });
    });

    awaitFrameLoadPromises.set(frame, promise);

    return promise;
}

export function awaitFrameWindow(frame) {

    if (frame.contentWindow) {
        return ZalgoPromise.resolve(frame.contentWindow);
    }

    return awaitFrameLoad(frame).then(function (loadedFrame) {

        if (!loadedFrame.contentWindow) {
            throw new Error('Could not find window in iframe');
        }

        return loadedFrame.contentWindow;
    });
}

/*  Iframe
    ------

    Open an iframe with the specified container, url, and option property map
*/

export function iframe() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var container = arguments[1];


    var el = getElement(container);

    var attributes = options.attributes || {};
    var style = options.style || {};

    var frame = createElement('iframe', {
        attributes: _extends({
            frameBorder: '0',
            allowTransparency: 'true'
        }, attributes),
        style: _extends({
            backgroundColor: 'transparent'
        }, style),
        html: options.html,
        'class': options['class']
    });

    // $FlowFixMe
    awaitFrameLoad(frame);

    el.appendChild(frame);

    if (options.url || window.navigator.userAgent.match(/MSIE|Edge/i)) {
        frame.setAttribute('src', options.url || 'about:blank');
    }

    // $FlowFixMe
    return frame;
}

/*  Add Event Listener
    ------------------

    Add DOM Event listener with cancel
*/

export function addEventListener(obj, event, handler) {
    obj.addEventListener(event, handler);
    return {
        cancel: function cancel() {
            obj.removeEventListener(event, handler);
        }
    };
}

/*  Scan For Javascript
    -------------------

    Check if the string contains anything which could conceivably be run as javascript if the string is set to innerHTML
*/

export function scanForJavascript(str) {

    if (!str) {
        return str;
    }

    if (str.match(/<script|on\w+\s*=|javascript:|expression\s*\(|eval\(|new\s*Function/)) {
        throw new Error('HTML contains potential javascript: ' + str);
    }

    return str;
}

export var parseQuery = memoize(function (queryString) {

    var params = {};

    if (!queryString) {
        return params;
    }

    if (queryString.indexOf('=') === -1) {
        throw new Error('Can not parse query string params: ' + queryString);
    }

    for (var _i4 = 0, _queryString$split2 = queryString.split('&'), _length4 = _queryString$split2 == null ? 0 : _queryString$split2.length; _i4 < _length4; _i4++) {
        var pair = _queryString$split2[_i4];
        pair = pair.split('=');

        if (pair[0] && pair[1]) {
            params[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1]);
        }
    }

    return params;
});

export function getQueryParam(name) {
    return parseQuery(window.location.search.slice(1))[name];
}

export function formatQuery() {
    var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};


    return Object.keys(obj).filter(function (key) {
        return typeof obj[key] === 'string';
    }).map(function (key) {
        return urlEncode(key) + '=' + urlEncode(obj[key]);
    }).join('&');
}

export function extendQuery(originalQuery) {
    var props = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};


    if (!props || !Object.keys(props).length) {
        return originalQuery;
    }

    return formatQuery(_extends({}, parseQuery(originalQuery), props));
}

export function extendUrl(url) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};


    var query = options.query || {};
    var hash = options.hash || {};

    var originalUrl = void 0;
    var originalQuery = void 0;
    var originalHash = void 0;

    var _url$split = url.split('#');

    originalUrl = _url$split[0];
    originalHash = _url$split[1];

    var _originalUrl$split = originalUrl.split('?');

    originalUrl = _originalUrl$split[0];
    originalQuery = _originalUrl$split[1];


    var queryString = extendQuery(originalQuery, query);
    var hashString = extendQuery(originalHash, hash);

    if (queryString) {
        originalUrl = originalUrl + '?' + queryString;
    }

    if (hashString) {
        originalUrl = originalUrl + '#' + hashString;
    }

    return originalUrl;
}

export function elementStoppedMoving(element) {
    var timeout = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 5000;

    return new ZalgoPromise(function (resolve, reject) {
        var el = getElement(element);

        var start = el.getBoundingClientRect();

        var interval = void 0;
        var timer = void 0;

        interval = setInterval(function () {
            var end = el.getBoundingClientRect();

            if (start.top === end.top && start.bottom === end.bottom && start.left === end.left && start.right === end.right && start.width === end.width && start.height === end.height) {
                clearTimeout(timer);
                clearInterval(interval);
                return resolve();
            }

            start = end;
        }, 50);

        timer = setTimeout(function () {
            clearInterval(interval);
            reject(new Error('Timed out waiting for element to stop animating after ' + timeout + 'ms'));
        }, timeout);
    });
}

export function getCurrentDimensions(el) {
    return {
        width: el.offsetWidth,
        height: el.offsetHeight
    };
}

export function changeStyle(el, styles) {
    return new ZalgoPromise(function (resolve) {
        for (var _i6 = 0, _Object$keys4 = Object.keys(styles), _length6 = _Object$keys4 == null ? 0 : _Object$keys4.length; _i6 < _length6; _i6++) {
            var key = _Object$keys4[_i6];
            // $FlowFixMe
            el.style[key] = styles[key];
        }

        setTimeout(resolve, 1);
    });
}

export function setOverflow(el) {
    var value = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'auto';
    var _el$style = el.style,
        overflow = _el$style.overflow,
        overflowX = _el$style.overflowX,
        overflowY = _el$style.overflowY;


    el.style.overflow = el.style.overflowX = el.style.overflowY = value;

    return {
        reset: function reset() {
            el.style.overflow = overflow;
            el.style.overflowX = overflowX;
            el.style.overflowY = overflowY;
        }
    };
}

function dimensionsDiff(one, two, _ref) {
    var _ref$width = _ref.width,
        width = _ref$width === undefined ? true : _ref$width,
        _ref$height = _ref.height,
        height = _ref$height === undefined ? true : _ref$height,
        _ref$threshold = _ref.threshold,
        threshold = _ref$threshold === undefined ? 0 : _ref$threshold;


    if (width && Math.abs(one.width - two.width) > threshold) {
        return true;
    }

    if (height && Math.abs(one.height - two.height) > threshold) {
        return true;
    }

    return false;
}

export function trackDimensions(el, _ref2) {
    var _ref2$width = _ref2.width,
        width = _ref2$width === undefined ? true : _ref2$width,
        _ref2$height = _ref2.height,
        height = _ref2$height === undefined ? true : _ref2$height,
        _ref2$threshold = _ref2.threshold,
        threshold = _ref2$threshold === undefined ? 0 : _ref2$threshold;


    var currentDimensions = getCurrentDimensions(el);

    return {
        check: function check() {
            var newDimensions = getCurrentDimensions(el);

            return {
                changed: dimensionsDiff(currentDimensions, newDimensions, { width: width, height: height, threshold: threshold }),
                dimensions: newDimensions
            };
        },
        reset: function reset() {
            currentDimensions = getCurrentDimensions(el);
        }
    };
}

export function onDimensionsChange(el, _ref3) {
    var _ref3$width = _ref3.width,
        width = _ref3$width === undefined ? true : _ref3$width,
        _ref3$height = _ref3.height,
        height = _ref3$height === undefined ? true : _ref3$height,
        _ref3$delay = _ref3.delay,
        delay = _ref3$delay === undefined ? 50 : _ref3$delay,
        _ref3$threshold = _ref3.threshold,
        threshold = _ref3$threshold === undefined ? 0 : _ref3$threshold;


    return new ZalgoPromise(function (resolve) {

        var tracker = trackDimensions(el, { width: width, height: height, threshold: threshold });

        var interval = void 0;

        var resolver = debounce(function (dimensions) {
            clearInterval(interval);
            return resolve(dimensions);
        }, delay * 4);

        interval = setInterval(function () {
            var _tracker$check = tracker.check(),
                changed = _tracker$check.changed,
                dimensions = _tracker$check.dimensions;

            if (changed) {
                tracker.reset();
                return resolver(dimensions);
            }
        }, delay);

        function onWindowResize() {
            var _tracker$check2 = tracker.check(),
                changed = _tracker$check2.changed,
                dimensions = _tracker$check2.dimensions;

            if (changed) {
                tracker.reset();
                window.removeEventListener('resize', onWindowResize);
                resolver(dimensions);
            }
        }

        window.addEventListener('resize', onWindowResize);
    });
}

export function dimensionsMatchViewport(el, _ref4) {
    var width = _ref4.width,
        height = _ref4.height;


    var dimensions = getCurrentDimensions(el);

    if (width && dimensions.width !== window.innerWidth) {
        return false;
    }

    if (height && dimensions.height !== window.innerHeight) {
        return false;
    }

    return true;
}

export function bindEvents(element, eventNames, handler) {

    handler = once(handler);

    for (var _i8 = 0, _length8 = eventNames == null ? 0 : eventNames.length; _i8 < _length8; _i8++) {
        var eventName = eventNames[_i8];
        element.addEventListener(eventName, handler);
    }

    return {
        cancel: once(function () {
            for (var _i10 = 0, _length10 = eventNames == null ? 0 : eventNames.length; _i10 < _length10; _i10++) {
                var _eventName = eventNames[_i10];
                element.removeEventListener(_eventName, handler);
            }
        })
    };
}

var VENDOR_PREFIXES = ['webkit', 'moz', 'ms', 'o'];

export function setVendorCSS(element, name, value) {

    // $FlowFixMe
    element.style[name] = value;

    var capitalizedName = capitalizeFirstLetter(name);

    for (var _i12 = 0, _length12 = VENDOR_PREFIXES == null ? 0 : VENDOR_PREFIXES.length; _i12 < _length12; _i12++) {
        var prefix = VENDOR_PREFIXES[_i12];
        // $FlowFixMe
        element.style['' + prefix + capitalizedName] = value;
    }
}

var CSSRule = window.CSSRule;

var KEYFRAMES_RULE = CSSRule.KEYFRAMES_RULE || CSSRule.WEBKIT_KEYFRAMES_RULE || CSSRule.MOZ_KEYFRAMES_RULE || CSSRule.O_KEYFRAMES_RULE || CSSRule.MS_KEYFRAMES_RULE;

function isValidAnimation(element, name) {

    var stylesheets = element.ownerDocument.styleSheets;

    try {
        for (var i = 0; i < stylesheets.length; i++) {

            // $FlowFixMe
            var cssRules = stylesheets[i].cssRules;

            if (!cssRules) {
                continue;
            }

            for (var j = 0; j < cssRules.length; j++) {

                var cssRule = cssRules[j];

                if (!cssRule) {
                    continue;
                }

                if (cssRule.type === KEYFRAMES_RULE && cssRule.name === name) {
                    return true;
                }
            }
        }
    } catch (err) {

        return false;
    }

    return false;
}

var ANIMATION_START_EVENTS = ['animationstart', 'webkitAnimationStart', 'oAnimationStart', 'MSAnimationStart'];
var ANIMATION_END_EVENTS = ['animationend', 'webkitAnimationEnd', 'oAnimationEnd', 'MSAnimationEnd'];

export function animate(element, name, clean) {
    var timeout = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 1000;

    return new ZalgoPromise(function (resolve, reject) {

        var el = getElement(element);

        if (!el || !isValidAnimation(el, name)) {
            return resolve();
        }

        var hasStarted = false;

        var startTimeout = void 0;
        var endTimeout = void 0;
        var startEvent = void 0;
        var endEvent = void 0;

        function cleanUp() {
            setVendorCSS(el, 'animationName', '');
            clearTimeout(startTimeout);
            clearTimeout(endTimeout);
            startEvent.cancel();
            endEvent.cancel();
        }

        startEvent = bindEvents(el, ANIMATION_START_EVENTS, function (event) {

            // $FlowFixMe
            if (event.target !== el || event.animationName !== name) {
                return;
            }

            clearTimeout(startTimeout);

            event.stopPropagation();

            startEvent.cancel();
            hasStarted = true;

            endTimeout = setTimeout(function () {
                cleanUp();
                resolve();
            }, timeout);
        });

        endEvent = bindEvents(el, ANIMATION_END_EVENTS, function (event) {

            // $FlowFixMe
            if (event.target !== el || event.animationName !== name) {
                return;
            }

            cleanUp();

            // $FlowFixMe
            if (typeof event.animationName === 'string' && event.animationName !== name) {
                return reject('Expected animation name to be ' + name + ', found ' + event.animationName);
            }

            return resolve();
        });

        setVendorCSS(el, 'animationName', name);

        startTimeout = setTimeout(function () {
            if (!hasStarted) {
                cleanUp();
                return resolve();
            }
        }, 200);

        if (clean) {
            clean(cleanUp);
        }
    });
}

var STYLE = {

    DISPLAY: {
        NONE: 'none',
        BLOCK: 'block'
    },

    VISIBILITY: {
        VISIBLE: 'visible',
        HIDDEN: 'hidden'
    },

    IMPORTANT: 'important'
};

export function makeElementVisible(element) {
    element.style.setProperty('visibility', '');
}

export function makeElementInvisible(element) {
    element.style.setProperty('visibility', STYLE.VISIBILITY.HIDDEN, STYLE.IMPORTANT);
}

export function showElement(element) {
    element.style.setProperty('display', '');
}

export function hideElement(element) {
    element.style.setProperty('display', STYLE.DISPLAY.NONE, STYLE.IMPORTANT);
}

export function destroyElement(element) {
    if (element.parentNode) {
        element.parentNode.removeChild(element);
    }
}

export function showAndAnimate(element, name, clean) {
    var animation = animate(element, name, clean);
    showElement(element);
    return animation;
}

export function animateAndHide(element, name, clean) {
    return animate(element, name, clean).then(function () {
        hideElement(element);
    });
}

export function addClass(element, name) {
    if (element.classList) {
        element.classList.add(name);
    } else if (element.className.split(/\s+/).indexOf(name) === -1) {
        element.className += ' ' + name;
    }
}

export function removeClass(element, name) {
    if (element.classList) {
        element.classList.remove(name);
    } else if (element.className.split(/\s+/).indexOf(name) !== -1) {
        element.className = element.className.replace(name, '');
    }
}

export function getCurrentScriptDir() {
    // eslint-disable-next-line no-console
    console.warn('Do not use zoid.getCurrentScriptDir() in production -- browser support is limited');

    // eslint-disable-next-line compat/compat
    if (document.currentScript) {
        // eslint-disable-next-line compat/compat
        return document.currentScript.src.split('/').slice(0, -1).join('/');
    }

    return '.';
}

export function getElementName(element) {

    if (typeof element === 'string') {
        return element;
    }

    if (!element || !element.tagName) {
        return '<unknown>';
    }

    var name = element.tagName.toLowerCase();

    if (element.id) {
        name += '#' + element.id;
    } else if (element.className) {
        name += '.' + element.className.split(' ').join('.');
    }

    return name;
}

export function isElementClosed(el) {
    if (!el || !el.parentNode) {
        return true;
    }
    return false;
}

export function watchElementForClose(element, handler) {
    handler = once(handler);

    var interval = void 0;

    if (isElementClosed(element)) {
        handler();
    } else {
        interval = safeInterval(function () {
            if (isElementClosed(element)) {
                interval.cancel();
                handler();
            }
        }, 50);
    }

    return {
        cancel: function cancel() {
            if (interval) {
                interval.cancel();
            }
        }
    };
}

export function getHttpType(contentType, url) {
    return new ZalgoPromise(function (resolve, reject) {

        var req = new window.XMLHttpRequest();

        req.open('GET', url);
        req.setRequestHeader('Accept', contentType);
        req.send(null);

        req.onload = function () {
            resolve(req.responseText);
        };

        req.onerror = function () {
            return reject(new Error('prefetch failed'));
        };
    });
}

export function getHTML(url) {
    return getHttpType('text/html', url);
}

export function getCSS(url) {
    return getHttpType('text/css', url);
}

export function getScript(url) {
    return getHttpType('*/*', url);
}

export function prefetchPage(url) {
    return getHTML(url);
}

var JSX_EVENTS = {
    onClick: 'click'
};

export function fixScripts(el) {
    var doc = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : window.document;

    for (var _i14 = 0, _querySelectorAll2 = querySelectorAll(el, 'script'), _length14 = _querySelectorAll2 == null ? 0 : _querySelectorAll2.length; _i14 < _length14; _i14++) {
        var script = _querySelectorAll2[_i14];
        var newScript = doc.createElement('script');
        newScript.text = script.textContent;
        script.parentNode.replaceChild(newScript, script);
    }
}

export function jsxDom(name, props, content) {

    name = name.toLowerCase();

    var doc = this && this.createElement ? this : window.document;

    var el = doc.createElement(name);

    for (var prop in props) {
        if (prop in JSX_EVENTS) {
            el.addEventListener(JSX_EVENTS[prop], props[prop]);
        } else if (prop === 'innerHTML') {
            el.innerHTML = props[prop];
            fixScripts(el, doc);
        } else {
            el.setAttribute(prop, props[prop]);
        }
    }

    if (name === 'style') {

        if (typeof content !== 'string') {
            throw new TypeError('Expected ' + name + ' tag content to be string, got ' + (typeof content === 'undefined' ? 'undefined' : _typeof(content)));
        }

        if (arguments.length > 3) {
            throw new Error('Expected only text content for ' + name + ' tag');
        }

        setStyle(el, content, doc);
    } else if (name === 'iframe') {

        if (arguments.length > 3) {
            throw new Error('Expected only single child node for iframe');
        }

        el.addEventListener('load', function () {
            var win = el.contentWindow;

            if (!win) {
                throw new Error('Expected frame to have contentWindow');
            }

            if (typeof content === 'string') {
                writeToWindow(win, content);
            } else {
                writeElementToWindow(win, content);
            }
        });
    } else if (name === 'script') {

        if (typeof content !== 'string') {
            throw new TypeError('Expected ' + name + ' tag content to be string, got ' + (typeof content === 'undefined' ? 'undefined' : _typeof(content)));
        }

        if (arguments.length > 3) {
            throw new Error('Expected only text content for ' + name + ' tag');
        }

        el.text = content;
    } else {
        for (var i = 2; i < arguments.length; i++) {
            if (typeof arguments[i] === 'string') {
                var textNode = doc.createTextNode(arguments[i]);
                appendChild(el, textNode);
            } else {
                appendChild(el, arguments[i]);
            }
        }
    }

    return el;
}