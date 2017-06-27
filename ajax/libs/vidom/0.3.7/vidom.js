/**
 * Vidom
 * @author Filatov Dmitry <dfilatov@inbox.ru>
 * @version 0.3.7
 */
(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.vidom = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

exports.__esModule = true;

var _createComponent = require('./createComponent');

var _createComponent2 = _interopRequireDefault(_createComponent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (0, _createComponent2.default)();

},{"./createComponent":19}],2:[function(require,module,exports){
(function (global){
'use strict';

exports.__esModule = true;
var ua = global.navigator ? global.navigator.userAgent : '';

var isTrident = exports.isTrident = ua.indexOf('Trident') > -1;
var isEdge = exports.isEdge = ua.indexOf('Edge') > -1;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],3:[function(require,module,exports){
(function (global){
'use strict';

exports.__esModule = true;

exports.default = function (attrName) {
    return attrsCfg[attrName] || DEFAULT_ATTR_CFG;
};

var _escapeAttr = require('../utils/escapeAttr');

var _escapeAttr2 = _interopRequireDefault(_escapeAttr);

var _isInArray = require('../utils/isInArray');

var _isInArray2 = _interopRequireDefault(_isInArray);

var _dasherize = require('../utils/dasherize');

var _dasherize2 = _interopRequireDefault(_dasherize);

var _console = require('../utils/console');

var _console2 = _interopRequireDefault(_console);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var doc = global.document;

function setAttr(node, name, val) {
    if (name === 'type' && node.tagName === 'INPUT') {
        var value = node.value; // value will be lost in IE if type is changed
        node.setAttribute(name, '' + val);
        node.value = value;
    } else {
        node.setAttribute(ATTR_NAMES[name] || name, '' + val);
    }
}

function setBooleanAttr(node, name, val) {
    if (val) {
        setAttr(node, name, val);
    } else {
        removeAttr(node, name);
    }
}

function setProp(node, name, val) {
    node[name] = val;
}

function setObjProp(node, name, val) {
    if ("production" !== 'production') {
        var typeOfVal = typeof val;
        if (typeOfVal !== 'object') {
            _console2.default.error('"' + name + '" attribute expects an object as a value, not a ' + typeOfVal);
            return;
        }
    }

    var prop = node[name];
    for (var i in val) {
        prop[i] = val[i] == null ? '' : val[i];
    }
}

function setPropWithCheck(node, name, val) {
    if (name === 'value' && node.tagName === 'SELECT') {
        setSelectValue(node, val);
    } else {
        node[name] !== val && (node[name] = val);
    }
}

function removeAttr(node, name) {
    node.removeAttribute(ATTR_NAMES[name] || name);
}

function removeProp(node, name) {
    if (name === 'style') {
        node[name].cssText = '';
    } else if (name === 'value' && node.tagName === 'SELECT') {
        removeSelectValue(node);
    } else {
        node[name] = getDefaultPropVal(node.tagName, name);
    }
}

function setSelectValue(node, value) {
    var isMultiple = Array.isArray(value),
        options = node.options,
        len = options.length;

    var i = 0,
        optionNode = void 0;

    while (i < len) {
        optionNode = options[i++];
        optionNode.selected = value != null && (isMultiple ? (0, _isInArray2.default)(value, optionNode.value) : optionNode.value == value);
    }
}

function removeSelectValue(node) {
    var options = node.options,
        len = options.length;

    var i = 0;

    while (i < len) {
        options[i++].selected = false;
    }
}

function attrToString(name, value) {
    return (ATTR_NAMES[name] || name) + '="' + (0, _escapeAttr2.default)(value) + '"';
}

function booleanAttrToString(name, value) {
    return value ? name : '';
}

function stylePropToString(name, value) {
    var styles = '';

    for (var i in value) {
        value[i] != null && (styles += (0, _dasherize2.default)(i) + ':' + value[i] + ';');
    }

    return styles ? name + '="' + styles + '"' : styles;
}

var defaultPropVals = {};
function getDefaultPropVal(tag, attrName) {
    var tagAttrs = defaultPropVals[tag] || (defaultPropVals[tag] = {});
    return attrName in tagAttrs ? tagAttrs[attrName] : tagAttrs[attrName] = doc.createElement(tag)[attrName];
}

var ATTR_NAMES = {
    acceptCharset: 'accept-charset',
    className: 'class',
    htmlFor: 'for',
    httpEquiv: 'http-equiv',
    autoCapitalize: 'autocapitalize',
    autoComplete: 'autocomplete',
    autoCorrect: 'autocorrect',
    autoFocus: 'autofocus',
    autoPlay: 'autoplay',
    encType: 'encoding',
    hrefLang: 'hreflang',
    radioGroup: 'radiogroup',
    spellCheck: 'spellcheck',
    srcDoc: 'srcdoc',
    srcSet: 'srcset',
    tabIndex: 'tabindex'
},
    DEFAULT_ATTR_CFG = {
    set: setAttr,
    remove: removeAttr,
    toString: attrToString
},
    BOOLEAN_ATTR_CFG = {
    set: setBooleanAttr,
    remove: removeAttr,
    toString: booleanAttrToString
},
    DEFAULT_PROP_CFG = {
    set: setProp,
    remove: removeProp,
    toString: attrToString
},
    BOOLEAN_PROP_CFG = {
    set: setProp,
    remove: removeProp,
    toString: booleanAttrToString
},
    attrsCfg = {
    checked: BOOLEAN_PROP_CFG,
    controls: DEFAULT_PROP_CFG,
    disabled: BOOLEAN_ATTR_CFG,
    id: DEFAULT_PROP_CFG,
    ismap: BOOLEAN_ATTR_CFG,
    loop: DEFAULT_PROP_CFG,
    multiple: BOOLEAN_PROP_CFG,
    muted: DEFAULT_PROP_CFG,
    open: BOOLEAN_ATTR_CFG,
    readOnly: BOOLEAN_PROP_CFG,
    selected: BOOLEAN_PROP_CFG,
    srcDoc: DEFAULT_PROP_CFG,
    style: {
        set: setObjProp,
        remove: removeProp,
        toString: stylePropToString
    },
    value: {
        set: setPropWithCheck,
        remove: removeProp,
        toString: attrToString
    }
};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../utils/console":32,"../utils/dasherize":33,"../utils/escapeAttr":35,"../utils/isInArray":37}],4:[function(require,module,exports){
'use strict';

exports.__esModule = true;
function append(parent, child) {
    if (Array.isArray(parent)) {
        insertBefore(child, parent[1]);
    } else if (Array.isArray(child)) {
        var currentChild = child[0],
            nextChild = void 0;
        var lastChild = child[1];

        while (currentChild !== lastChild) {
            nextChild = currentChild.nextSibling;
            parent.appendChild(currentChild);
            currentChild = nextChild;
        }

        parent.appendChild(lastChild);
    } else {
        parent.appendChild(child);
    }
}

function remove(child) {
    if (Array.isArray(child)) {
        var currentChild = child[0],
            nextChild = void 0;
        var lastChild = child[1],
            parent = lastChild.parentNode;

        while (currentChild !== lastChild) {
            nextChild = currentChild.nextSibling;
            parent.removeChild(currentChild);
            currentChild = nextChild;
        }

        parent.removeChild(lastChild);
    } else {
        child.parentNode.removeChild(child);
    }
}

function insertBefore(child, beforeChild) {
    Array.isArray(beforeChild) && (beforeChild = beforeChild[0]);

    if (Array.isArray(child)) {
        var currentChild = child[0],
            nextChild = void 0;
        var lastChild = child[1],
            parent = lastChild.parentNode;

        while (currentChild !== lastChild) {
            nextChild = currentChild.nextSibling;
            parent.insertBefore(currentChild, beforeChild);
            currentChild = nextChild;
        }

        parent.insertBefore(lastChild, beforeChild);
    } else {
        beforeChild.parentNode.insertBefore(child, beforeChild);
    }
}

function move(child, toChild, after) {
    if (after) {
        Array.isArray(toChild) && (toChild = toChild[1]);
        var nextSibling = toChild.nextSibling;

        nextSibling ? insertBefore(child, nextSibling) : append(toChild.parentNode, child);
    } else {
        insertBefore(child, toChild);
    }
}

function replace(old, replacement) {
    if (Array.isArray(old)) {
        insertBefore(replacement, old);
        remove(old);
    } else {
        old.parentNode.replaceChild(replacement, old);
    }
}

function removeChildren(from) {
    if (Array.isArray(from)) {
        var currentChild = from[0].nextSibling,
            nextChild = void 0;
        var lastChild = from[1],
            parent = lastChild.parentNode;

        while (currentChild !== lastChild) {
            nextChild = currentChild.nextSibling;
            parent.removeChild(currentChild);
            currentChild = nextChild;
        }
    } else {
        from.innerHTML = '';
    }
}

exports.default = {
    append: append,
    remove: remove,
    insertBefore: insertBefore,
    move: move,
    replace: replace,
    removeChildren: removeChildren
};

},{}],5:[function(require,module,exports){
'use strict';

exports.__esModule = true;
exports.default = {
    onBlur: 'blur',
    onCanPlay: 'canplay',
    onCanPlayThrough: 'canplaythrough',
    onChange: 'change',
    onClick: 'click',
    onComplete: 'complete',
    onContextMenu: 'contextmenu',
    onCopy: 'copy',
    onCut: 'cut',
    onDblClick: 'dblclick',
    onDrag: 'drag',
    onDragEnd: 'dragend',
    onDragEnter: 'dragenter',
    onDragLeave: 'dragleave',
    onDragOver: 'dragover',
    onDragStart: 'dragstart',
    onDrop: 'drop',
    onDurationChange: 'durationchange',
    onEmptied: 'emptied',
    onEnded: 'ended',
    onError: 'error',
    onFocus: 'focus',
    onInput: 'input',
    onKeyDown: 'keydown',
    onKeyPress: 'keypress',
    onKeyUp: 'keyup',
    onLoad: 'load',
    onLoadedData: 'loadeddata',
    onLoadedMetadata: 'loadedmetadata',
    onLoadStart: 'loadstart',
    onMouseDown: 'mousedown',
    onMouseEnter: 'mouseenter',
    onMouseLeave: 'mouseleave',
    onMouseMove: 'mousemove',
    onMouseOut: 'mouseout',
    onMouseOver: 'mouseover',
    onMouseUp: 'mouseup',
    onPaste: 'paste',
    onPause: 'pause',
    onPlay: 'play',
    onPlaying: 'playing',
    onProgress: 'progress',
    onRateChange: 'ratechange',
    onScroll: 'scroll',
    onSeeked: 'seeked',
    onSeeking: 'seeking',
    onStalled: 'stalled',
    onSubmit: 'submit',
    onSuspend: 'suspend',
    onTimeUpdate: 'timeupdate',
    onTouchCancel: 'touchcancel',
    onTouchEnd: 'touchend',
    onTouchMove: 'touchmove',
    onTouchStart: 'touchstart',
    onVolumeChange: 'volumechange',
    onWaiting: 'waiting',
    onWheel: 'wheel'
};

},{}],6:[function(require,module,exports){
"use strict";

exports.__esModule = true;
exports.default = createSyntheticEvent;
function SyntheticEvent(type, nativeEvent) {
    this.type = type;
    this.target = nativeEvent.target;
    this.nativeEvent = nativeEvent;

    this._isPropagationStopped = false;
    this._isDefaultPrevented = false;
    this._isSeized = false;
}

SyntheticEvent.prototype = {
    stopPropagation: function () {
        this._isPropagationStopped = true;

        var nativeEvent = this.nativeEvent;
        nativeEvent.stopPropagation ? nativeEvent.stopPropagation() : nativeEvent.cancelBubble = true;
    },
    isPropagationStopped: function () {
        return this._isPropagationStopped;
    },
    preventDefault: function () {
        this._isDefaultPrevented = true;

        var nativeEvent = this.nativeEvent;
        nativeEvent.preventDefault ? nativeEvent.preventDefault() : nativeEvent.returnValue = false;
    },
    isDefaultPrevented: function () {
        return this._isDefaultPrevented;
    },
    persist: function () {
        this._isPersisted = true;
    }
};

var eventsPool = {};

function createSyntheticEvent(type, nativeEvent) {
    var pooledEvent = eventsPool[type];

    if (pooledEvent && !pooledEvent._isPersisted) {
        pooledEvent.target = nativeEvent.target;
        pooledEvent.nativeEvent = nativeEvent;
        pooledEvent._isPropagationStopped = false;
        pooledEvent._isDefaultPrevented = false;

        return pooledEvent;
    }

    return eventsPool[type] = new SyntheticEvent(type, nativeEvent);
}

},{}],7:[function(require,module,exports){
(function (global){
'use strict';

exports.__esModule = true;
exports.removeListeners = exports.removeListener = exports.addListener = undefined;

var _isEventSupported = require('./isEventSupported');

var _isEventSupported2 = _interopRequireDefault(_isEventSupported);

var _createSyntheticEvent = require('./createSyntheticEvent');

var _createSyntheticEvent2 = _interopRequireDefault(_createSyntheticEvent);

var _getDomNodeId = require('../getDomNodeId');

var _getDomNodeId2 = _interopRequireDefault(_getDomNodeId);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var doc = global.document,
    BUBBLEABLE_NATIVE_EVENTS = ['blur', 'change', 'click', 'contextmenu', 'copy', 'cut', 'dblclick', 'drag', 'dragend', 'dragenter', 'dragleave', 'dragover', 'dragstart', 'drop', 'focus', 'input', 'keydown', 'keypress', 'keyup', 'mousedown', 'mousemove', 'mouseout', 'mouseover', 'mouseup', 'paste', 'submit', 'touchcancel', 'touchend', 'touchmove', 'touchstart', 'wheel'],
    NON_BUBBLEABLE_NATIVE_EVENTS = ['canplay', 'canplaythrough', 'complete', 'durationchange', 'emptied', 'ended', 'error', 'load', 'loadeddata', 'loadedmetadata', 'loadstart', 'mouseenter', 'mouseleave', 'pause', 'play', 'playing', 'progress', 'ratechange', 'scroll', 'seeked', 'seeking', 'stalled', 'suspend', 'timeupdate', 'volumechange', 'waiting'];

var listenersStorage = {},
    eventsCfg = {};

function globalEventListener(e, type) {
    type || (type = e.type);

    var cfg = eventsCfg[type];

    var target = e.target,
        listenersCount = cfg.listenersCounter,
        listeners = void 0,
        listener = void 0,
        listenersToInvoke = void 0,
        domNodeId = void 0;

    while (listenersCount > 0 && target && target !== doc) {
        if (domNodeId = (0, _getDomNodeId2.default)(target, true)) {
            listeners = listenersStorage[domNodeId];
            if (listeners && (listener = listeners[type])) {
                if (listenersToInvoke) {
                    listenersToInvoke.push(listener);
                } else {
                    listenersToInvoke = [listener];
                }
                --listenersCount;
            }
        }

        target = target.parentNode;
    }

    if (listenersToInvoke) {
        var event = (0, _createSyntheticEvent2.default)(type, e),
            len = listenersToInvoke.length;

        var i = 0;

        while (i < len) {
            listenersToInvoke[i++](event);
            if (event.isPropagationStopped()) {
                break;
            }
        }
    }
}

function eventListener(e) {
    listenersStorage[(0, _getDomNodeId2.default)(e.target)][e.type]((0, _createSyntheticEvent2.default)(e.type, e));
}

if (doc) {
    (function () {
        var focusEvents = {
            focus: 'focusin',
            blur: 'focusout'
        };

        var i = 0,
            type = void 0;

        while (i < BUBBLEABLE_NATIVE_EVENTS.length) {
            type = BUBBLEABLE_NATIVE_EVENTS[i++];
            eventsCfg[type] = {
                type: type,
                bubbles: true,
                listenersCounter: 0,
                set: false,
                setup: focusEvents[type] ? (0, _isEventSupported2.default)(focusEvents[type]) ? function () {
                    var type = this.type;
                    doc.addEventListener(focusEvents[type], function (e) {
                        globalEventListener(e, type);
                    });
                } : function () {
                    doc.addEventListener(this.type, globalEventListener, true);
                } : null
            };
        }

        i = 0;
        while (i < NON_BUBBLEABLE_NATIVE_EVENTS.length) {
            eventsCfg[NON_BUBBLEABLE_NATIVE_EVENTS[i++]] = {
                type: type,
                bubbles: false,
                set: false
            };
        }
    })();
}

function addListener(domNode, type, listener) {
    var cfg = eventsCfg[type];
    if (cfg) {
        if (!cfg.set) {
            cfg.setup ? cfg.setup() : cfg.bubbles && doc.addEventListener(type, globalEventListener, false);
            cfg.set = true;
        }

        var domNodeId = (0, _getDomNodeId2.default)(domNode),
            listeners = listenersStorage[domNodeId] || (listenersStorage[domNodeId] = {});

        if (!listeners[type]) {
            cfg.bubbles ? ++cfg.listenersCounter : domNode.addEventListener(type, eventListener, false);
        }

        listeners[type] = listener;
    }
}

function removeListener(domNode, type) {
    var domNodeId = (0, _getDomNodeId2.default)(domNode, true);

    if (domNodeId) {
        var listeners = listenersStorage[domNodeId];

        if (listeners && listeners[type]) {
            listeners[type] = null;

            var cfg = eventsCfg[type];

            if (cfg) {
                cfg.bubbles ? --cfg.listenersCounter : domNode.removeEventListener(type, eventListener);
            }
        }
    }
}

function removeListeners(domNode) {
    var domNodeId = (0, _getDomNodeId2.default)(domNode, true);

    if (domNodeId) {
        var listeners = listenersStorage[domNodeId];

        if (listeners) {
            delete listenersStorage[domNodeId];
            for (var _type in listeners) {
                removeListener(domNode, _type);
            }
        }
    }
}

exports.addListener = addListener;
exports.removeListener = removeListener;
exports.removeListeners = removeListeners;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../getDomNodeId":9,"./createSyntheticEvent":6,"./isEventSupported":8}],8:[function(require,module,exports){
(function (global){
'use strict';

exports.__esModule = true;
var doc = global.document;

function isEventSupported(type) {
    var eventProp = 'on' + type;

    if (eventProp in doc) {
        return true;
    }

    var domNode = doc.createElement('div');

    domNode.setAttribute(eventProp, 'return;');
    if (typeof domNode[eventProp] === 'function') {
        return true;
    }

    return type === 'wheel' && doc.implementation && doc.implementation.hasFeature && doc.implementation.hasFeature('', '') !== true && doc.implementation.hasFeature('Events.wheel', '3.0');
}

exports.default = isEventSupported;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],9:[function(require,module,exports){
'use strict';

exports.__esModule = true;
var ID_PROP = '__vidom__id__';
var counter = 1;

function getDomNodeId(node, onlyGet) {
    return node[ID_PROP] || (onlyGet ? null : node[ID_PROP] = counter++);
}

exports.default = getDomNodeId;

},{}],10:[function(require,module,exports){
'use strict';

exports.__esModule = true;
exports.mountToDom = mountToDom;
exports.mountToDomSync = mountToDomSync;
exports.unmountFromDom = unmountFromDom;
exports.unmountFromDomSync = unmountFromDomSync;
exports.getMountedRootNodes = getMountedRootNodes;

var _getDomNodeId = require('./getDomNodeId');

var _getDomNodeId2 = _interopRequireDefault(_getDomNodeId);

var _rafBatch = require('./rafBatch');

var _rafBatch2 = _interopRequireDefault(_rafBatch);

var _globalHook = require('../globalHook');

var _globalHook2 = _interopRequireDefault(_globalHook);

var _domOps = require('./domOps');

var _domOps2 = _interopRequireDefault(_domOps);

var _ns = require('./utils/ns');

var _TopNode = require('../nodes/TopNode');

var _TopNode2 = _interopRequireDefault(_TopNode);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var mountedNodes = {};
var counter = 0;

function mount(domNode, node, cb, cbCtx, syncMode) {
    var domNodeId = (0, _getDomNodeId2.default)(domNode),
        mounted = mountedNodes[domNodeId],
        mountId = void 0;

    if (mounted && mounted.tree) {
        mountId = ++mounted.id;
        var patchFn = function () {
            if (mountedNodes[domNodeId] && mountedNodes[domNodeId].id === mountId) {
                var prevTree = mounted.tree,
                    newTree = new _TopNode2.default(node, prevTree._ns);

                prevTree.patch(newTree);
                mounted.tree = newTree;

                callCb(cb, cbCtx);
                if ("production" !== 'production') {
                    _globalHook2.default.emit('replace', prevTree, newTree);
                }
            }
        };

        syncMode ? patchFn() : (0, _rafBatch2.default)(patchFn);
    } else {
        mounted = mountedNodes[domNodeId] = { tree: null, id: mountId = ++counter };

        if (domNode.children.length) {
            var tree = mounted.tree = new _TopNode2.default(node, (0, _ns.getNs)(domNode));

            tree.adoptDom(collectTopDomChildren(domNode));
            tree.mount();
            callCb(cb, cbCtx);
            if ("production" !== 'production') {
                _globalHook2.default.emit('mount', tree);
            }
        } else {
            var renderFn = function () {
                var mounted = mountedNodes[domNodeId];

                if (mounted && mounted.id === mountId) {
                    var _tree = mounted.tree = new _TopNode2.default(node, (0, _ns.getNs)(domNode));

                    _domOps2.default.append(domNode, _tree.renderToDom());
                    _tree.mount();
                    callCb(cb, cbCtx);
                    if ("production" !== 'production') {
                        _globalHook2.default.emit('mount', _tree);
                    }
                }
            };

            syncMode ? renderFn() : (0, _rafBatch2.default)(renderFn);
        }
    }
}

function unmount(domNode, cb, cbCtx, syncMode) {
    var domNodeId = (0, _getDomNodeId2.default)(domNode);
    var mounted = mountedNodes[domNodeId];

    if (mounted) {
        (function () {
            var mountId = ++mounted.id,
                unmountFn = function () {
                mounted = mountedNodes[domNodeId];
                if (mounted && mounted.id === mountId) {
                    delete mountedNodes[domNodeId];
                    var tree = mounted.tree;

                    if (tree) {
                        var treeDomNode = tree.getDomNode();

                        tree.unmount();
                        _domOps2.default.remove(treeDomNode);
                    }

                    callCb(cb, cbCtx);
                    if ("production" !== 'production') {
                        tree && _globalHook2.default.emit('unmount', tree);
                    }
                }
            };

            mounted.tree ? syncMode ? unmountFn() : (0, _rafBatch2.default)(unmountFn) : syncMode || callCb(cb, cbCtx);
        })();
    } else if (!syncMode) {
        callCb(cb, cbCtx);
    }
}

function callCb(cb, cbCtx) {
    cb && cb.call(cbCtx || this);
}

function collectTopDomChildren(node) {
    var children = node.childNodes,
        len = children.length,
        res = [];
    var i = 0,
        nodeType = void 0;

    while (i < len) {
        nodeType = children[i].nodeType;

        if (nodeType === Node.ELEMENT_NODE || nodeType === Node.COMMENT_NODE) {
            res.push(children[i]);
        }

        i++;
    }

    return res;
}

function mountToDom(domNode, tree, cb, cbCtx) {
    mount(domNode, tree, cb, cbCtx, false);
}

function mountToDomSync(domNode, tree) {
    mount(domNode, tree, null, null, true);
}

function unmountFromDom(domNode, cb, cbCtx) {
    unmount(domNode, cb, cbCtx, false);
}

function unmountFromDomSync(domNode) {
    unmount(domNode, null, null, true);
}

function getMountedRootNodes() {
    var res = [];
    var mountedNode = void 0;

    for (var id in mountedNodes) {
        mountedNode = mountedNodes[id];
        if (mountedNode.tree) {
            res.push(mountedNode.tree);
        }
    }

    return res;
}

},{"../globalHook":21,"../nodes/TopNode":26,"./domOps":4,"./getDomNodeId":9,"./rafBatch":12,"./utils/ns":15}],11:[function(require,module,exports){
(function (global){
'use strict';

exports.__esModule = true;

var _domAttrs = require('./domAttrs');

var _domAttrs2 = _interopRequireDefault(_domAttrs);

var _domOps = require('./domOps');

var _domOps2 = _interopRequireDefault(_domOps);

var _ns = require('./utils/ns');

var _domEventManager = require('./events/domEventManager');

var _attrsToEvents = require('./events/attrsToEvents');

var _attrsToEvents2 = _interopRequireDefault(_attrsToEvents);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var doc = global.document;

function appendChild(parentNode, childNode) {
    var parentDomNode = parentNode.getDomNode();

    _domOps2.default.append(parentDomNode, childNode.renderToDom((0, _ns.getNs)(parentDomNode)));
    childNode.mount();
}

function insertChild(childNode, beforeChildNode) {
    var beforeChildDomNode = beforeChildNode.getDomNode();

    _domOps2.default.insertBefore(childNode.renderToDom((0, _ns.getParentNs)(beforeChildDomNode)), beforeChildDomNode);
    childNode.mount();
}

function removeChild(childNode) {
    var childDomNode = childNode.getDomNode();

    childNode.unmount();
    _domOps2.default.remove(childDomNode);
}

function moveChild(childNode, toChildNode, after) {
    var activeDomNode = doc.activeElement;

    _domOps2.default.move(childNode.getDomNode(), toChildNode.getDomNode(), after);

    if (doc.activeElement !== activeDomNode) {
        activeDomNode.focus();
    }
}

function removeChildren(parentNode) {
    var parentDomNode = parentNode.getDomNode(),
        childNodes = parentNode._children,
        len = childNodes.length;

    var j = 0;

    while (j < len) {
        childNodes[j++].unmount();
    }

    _domOps2.default.removeChildren(parentDomNode);
}

function replace(oldNode, newNode) {
    var oldDomNode = oldNode.getDomNode();

    oldNode.unmount();
    _domOps2.default.replace(oldDomNode, newNode.renderToDom((0, _ns.getParentNs)(oldDomNode)));
    newNode.mount();
}

function updateAttr(node, attrName, attrVal) {
    var domNode = node.getDomNode();

    _attrsToEvents2.default[attrName] ? (0, _domEventManager.addListener)(domNode, _attrsToEvents2.default[attrName], attrVal) : (0, _domAttrs2.default)(attrName).set(domNode, attrName, attrVal);
}

function removeAttr(node, attrName) {
    var domNode = node.getDomNode();

    _attrsToEvents2.default[attrName] ? (0, _domEventManager.removeListener)(domNode, _attrsToEvents2.default[attrName]) : (0, _domAttrs2.default)(attrName).remove(domNode, attrName);
}

function updateText(node, text, escape) {
    var domNode = node.getDomNode();

    if (escape) {
        var firstChild = domNode.firstChild;

        firstChild ? firstChild.nodeValue = text : domNode.textContent = text;
    } else {
        domNode.innerHTML = text;
    }
}

function removeText(parentNode) {
    parentNode.getDomNode().innerHTML = '';
}

exports.default = {
    appendChild: appendChild,
    insertChild: insertChild,
    removeChild: removeChild,
    moveChild: moveChild,
    removeChildren: removeChildren,
    replace: replace,
    updateAttr: updateAttr,
    removeAttr: removeAttr,
    updateText: updateText,
    removeText: removeText
};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./domAttrs":3,"./domOps":4,"./events/attrsToEvents":5,"./events/domEventManager":7,"./utils/ns":15}],12:[function(require,module,exports){
(function (global){
"use strict";

exports.__esModule = true;
var raf = global.requestAnimationFrame || global.webkitRequestAnimationFrame || global.mozRequestAnimationFrame || function (callback) {
    setTimeout(callback, 1000 / 60);
};

var batch = [];

function applyBatch() {
    var i = 0;

    while (i < batch.length) {
        batch[i++]();
    }

    batch = [];
}

exports.default = function (fn) {
    batch.push(fn) === 1 && raf(applyBatch);
};

exports.applyBatch = applyBatch;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],13:[function(require,module,exports){
(function (global){
'use strict';

exports.__esModule = true;
exports.default = createElement;
var doc = global.document,
    elementProtos = {};

function createElement(tag, ns) {
    var baseElement = void 0;

    if (ns) {
        var key = ns + ':' + tag;

        baseElement = elementProtos[key] || (elementProtos[key] = doc.createElementNS(ns, tag));
    } else {
        baseElement = elementProtos[tag] || (elementProtos[tag] = tag === '!' ? doc.createComment('') : doc.createElement(tag));
    }

    return baseElement.cloneNode();
}

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],14:[function(require,module,exports){
(function (global){
'use strict';

exports.__esModule = true;
exports.default = createElementByHtml;
var doc = global.document,
    TOP_LEVEL_NS_TAGS = {
    'http://www.w3.org/2000/svg': 'svg',
    'http://www.w3.org/1998/Math/MathML': 'math'
};

var helperDomNode = void 0;

function createElementByHtml(html, tag, ns) {
    helperDomNode || (helperDomNode = doc.createElement('div'));

    if (!ns || !TOP_LEVEL_NS_TAGS[ns] || TOP_LEVEL_NS_TAGS[ns] === tag) {
        helperDomNode.innerHTML = html;
        return helperDomNode.removeChild(helperDomNode.firstChild);
    }

    var topLevelTag = TOP_LEVEL_NS_TAGS[ns];
    helperDomNode.innerHTML = '<' + topLevelTag + ' xmlns="' + ns + '">' + html + '</' + topLevelTag + '>';
    return helperDomNode.removeChild(helperDomNode.firstChild).firstChild;
}

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],15:[function(require,module,exports){
'use strict';

exports.__esModule = true;
exports.getNs = getNs;
exports.getParentNs = getParentNs;
var DEFAULT_NS_URI = 'http://www.w3.org/1999/xhtml';

function getNs(domNode) {
    return Array.isArray(domNode) ? getParentNs(domNode) : domNode.namespaceURI === DEFAULT_NS_URI ? null : domNode.namespaceURI;
}

function getParentNs(domNode) {
    return getNs((Array.isArray(domNode) ? domNode[domNode.length - 1] : domNode).parentNode);
}

},{}],16:[function(require,module,exports){
'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createComponent = require('../createComponent');

var _createComponent2 = _interopRequireDefault(_createComponent);

var _TagNode = require('../nodes/TagNode');

var _TagNode2 = _interopRequireDefault(_TagNode);

var _rafBatch = require('../client/rafBatch');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (0, _createComponent2.default)({
    onInit: function () {
        var _this = this;

        this.onInput = function (e) {
            var attrs = _this.getAttrs();

            attrs.onInput && attrs.onInput(e);
            attrs.onChange && attrs.onChange(e);

            (0, _rafBatch.applyBatch)();

            if (_this.isMounted()) {
                // attrs could be changed during applyBatch()
                attrs = _this.getAttrs();
                var control = _this.getDomRef('control');
                if (typeof attrs.value !== 'undefined' && control.value !== attrs.value) {
                    control.value = attrs.value;
                }
            }
        };

        this.onClick = function (e) {
            var attrs = _this.getAttrs();

            attrs.onClick && attrs.onClick(e);
            attrs.onChange && attrs.onChange(e);

            (0, _rafBatch.applyBatch)();

            if (_this.isMounted()) {
                // attrs could be changed during applyBatch()
                attrs = _this.getAttrs();
                var control = _this.getDomRef('control');
                if (typeof attrs.checked !== 'undefined' && control.checked !== attrs.checked) {
                    control.checked = attrs.checked;
                }
            }
        };
    },
    onRender: function (attrs) {
        var controlAttrs = void 0;

        if (attrs.type === 'file') {
            controlAttrs = attrs;
        } else {
            controlAttrs = _extends({}, attrs, { onChange: null });

            if (attrs.type === 'checkbox' || attrs.type === 'radio') {
                controlAttrs.onClick = this.onClick;
            } else {
                controlAttrs.onInput = this.onInput;
            }
        }

        return this.setDomRef('control', new _TagNode2.default('input').attrs(controlAttrs));
    }
});

},{"../client/rafBatch":12,"../createComponent":19,"../nodes/TagNode":25}],17:[function(require,module,exports){
'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createComponent = require('../createComponent');

var _createComponent2 = _interopRequireDefault(_createComponent);

var _TagNode = require('../nodes/TagNode');

var _TagNode2 = _interopRequireDefault(_TagNode);

var _rafBatch = require('../client/rafBatch');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (0, _createComponent2.default)({
    onInit: function () {
        var _this = this;

        this.onChange = function (e) {
            var attrs = _this.getAttrs();

            attrs.onChange && attrs.onChange(e);

            (0, _rafBatch.applyBatch)();

            if (_this.isMounted()) {
                // attrs could be changed during applyBatch()
                attrs = _this.getAttrs();
                var control = _this.getDomRef('control');
                if (typeof attrs.value !== 'undefined' && control.value !== attrs.value) {
                    control.value = attrs.value;
                }
            }
        };
    },
    onRender: function (attrs, children) {
        var controlAttrs = _extends({}, attrs, {
            onChange: this.onChange
        });

        return this.setDomRef('control', new _TagNode2.default('select').attrs(controlAttrs).children(children));
    }
});

},{"../client/rafBatch":12,"../createComponent":19,"../nodes/TagNode":25}],18:[function(require,module,exports){
'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createComponent = require('../createComponent');

var _createComponent2 = _interopRequireDefault(_createComponent);

var _TagNode = require('../nodes/TagNode');

var _TagNode2 = _interopRequireDefault(_TagNode);

var _rafBatch = require('../client/rafBatch');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (0, _createComponent2.default)({
    onInit: function () {
        var _this = this;

        this.onInput = function (e) {
            var attrs = _this.getAttrs();

            attrs.onInput && attrs.onInput(e);
            attrs.onChange && attrs.onChange(e);

            (0, _rafBatch.applyBatch)();

            if (_this.isMounted()) {
                // attrs could be changed during applyBatch()
                attrs = _this.getAttrs();
                var control = _this.getDomRef('control');
                if (typeof attrs.value !== 'undefined' && control.value !== attrs.value) {
                    control.value = attrs.value;
                }
            }
        };
    },
    onRender: function (attrs) {
        var controlAttrs = _extends({}, attrs, {
            onInput: this.onInput,
            onChange: null
        });

        return this.setDomRef('control', new _TagNode2.default('textarea').attrs(controlAttrs));
    }
});

},{"../client/rafBatch":12,"../createComponent":19,"../nodes/TagNode":25}],19:[function(require,module,exports){
'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _noOp = require('./utils/noOp');

var _noOp2 = _interopRequireDefault(_noOp);

var _rafBatch = require('./client/rafBatch');

var _rafBatch2 = _interopRequireDefault(_rafBatch);

var _createNode = require('./createNode');

var _createNode2 = _interopRequireDefault(_createNode);

var _console = require('./utils/console');

var _console2 = _interopRequireDefault(_console);

var _emptyObj = require('./utils/emptyObj');

var _emptyObj2 = _interopRequireDefault(_emptyObj);

var _globalHook = require('./globalHook');

var _globalHook2 = _interopRequireDefault(_globalHook);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function mountComponent() {
    this._isMounted = true;
    this.onMount(this._attrs);
}

function unmountComponent() {
    this._isMounted = false;
    this._domRefs = null;
    this.onUnmount();
}

function patchComponent(attrs, children, ctx) {
    attrs = this._buildAttrs(attrs);

    var prevRootNode = this._rootNode,
        prevAttrs = this._attrs,
        prevChildren = this._children;

    if (prevAttrs !== attrs || prevChildren !== children) {
        this._attrs = attrs;
        if (this.isMounted()) {
            var isUpdating = this._isUpdating;
            this._isUpdating = true;
            this.onAttrsReceive(attrs, prevAttrs, children, prevChildren);
            this._isUpdating = isUpdating;
        }
    }

    this._children = children;
    this._ctx = ctx;

    if (this._isUpdating) {
        return;
    }

    var shouldUpdate = this.shouldUpdate(attrs, prevAttrs, children, prevChildren);

    if ("production" !== 'production') {
        var shouldUpdateResType = typeof shouldUpdate;
        if (shouldUpdateResType !== 'boolean') {
            _console2.default.warn('Component#shouldUpdate() should return boolean instead of ' + shouldUpdateResType);
        }
    }

    if (shouldUpdate) {
        this._rootNode = this.render();
        prevRootNode.patch(this._rootNode);
        this.isMounted() && this.onUpdate(attrs, prevAttrs, children, prevChildren);
    }
}

function shouldComponentUpdate() {
    return true;
}

function renderComponentToDom(parentNs) {
    return this._rootNode.renderToDom(parentNs);
}

function renderComponentToString() {
    return this._rootNode.renderToString();
}

function adoptComponentDom(domNode, domIdx) {
    return this._rootNode.adoptDom(domNode, domIdx);
}

function getComponentDomNode() {
    return this._rootNode.getDomNode();
}

function getComponentAttrs() {
    return this._attrs;
}

function requestChildContext() {
    return _emptyObj2.default;
}

function requestInitialComponentState() {
    return _emptyObj2.default;
}

function setComponentState(state) {
    this._prevState = this._state;
    this._state = _extends({}, this._state, state);

    this.update(updateComponentPrevState);
}

function updateComponentPrevState() {
    this._prevState = this._state;
}

function getComponentState() {
    return this._state;
}

function getComponentPrevState() {
    return this._prevState;
}

function renderComponent() {
    this._domRefs = {};

    var rootNode = this.onRender(this._attrs, this._children) || (0, _createNode2.default)('!');

    if ("production" !== 'production') {
        if (typeof rootNode !== 'object' || Array.isArray(rootNode)) {
            _console2.default.error('Component#onRender must return a single node object on the top level');
        }
    }

    var childCtx = this.onChildContextRequest(this._attrs);

    rootNode.ctx(childCtx === _emptyObj2.default ? this._ctx : this._ctx === _emptyObj2.default ? childCtx : _extends({}, this._ctx, childCtx));

    return rootNode;
}

function updateComponent(cb, cbCtx) {
    var _this = this;

    if (this._isUpdating) {
        cb && (0, _rafBatch2.default)(function () {
            return cb.call(cbCtx || _this);
        });
    } else {
        this._isUpdating = true;
        (0, _rafBatch2.default)(function () {
            if (_this.isMounted()) {
                _this._isUpdating = false;
                var prevRootNode = _this._rootNode;
                _this.patch(_this._attrs, _this._children, _this._ctx);
                cb && cb.call(cbCtx || _this);
                if ("production" !== 'production') {
                    _globalHook2.default.emit('replace', prevRootNode, _this._rootNode);
                }
            }
        });
    }
}

function getComponentRootNode() {
    return this._rootNode;
}

function isComponentMounted() {
    return this._isMounted;
}

function setComponentDomRef(ref, node) {
    return this._domRefs[ref] = node;
}

function getComponentDomRef(ref) {
    return this._domRefs[ref] ? this._domRefs[ref].getDomNode() : null;
}

function getComponentContext() {
    return this._ctx;
}

function getComponentDefaultAttrs() {
    return _emptyObj2.default;
}

function buildComponentAttrs(attrs) {
    if (this._attrs && attrs === this._attrs) {
        return attrs;
    }

    var cons = this.constructor,
        defaultAttrs = cons._defaultAttrs || (cons._defaultAttrs = cons.getDefaultAttrs());

    if (!attrs) {
        return defaultAttrs;
    }

    if (defaultAttrs === _emptyObj2.default) {
        return attrs;
    }

    var res = {};

    for (var i in defaultAttrs) {
        res[i] = defaultAttrs[i];
    }

    for (var _i in attrs) {
        res[_i] = attrs[_i];
    }

    return res;
}

function createComponent(props, staticProps) {
    var res = function (attrs, children, ctx) {
        this._attrs = this._buildAttrs(attrs);
        this._children = children;
        this._ctx = ctx;
        this._domRefs = null;
        this._isMounted = false;
        this._isUpdating = false;
        this._state = this.onInitialStateRequest(this._attrs);
        this._prevState = this._state;
        this.onInit(this._attrs);
        this._rootNode = this.render();
    },
        ptp = {
        constructor: res,
        onInitialStateRequest: requestInitialComponentState,
        onInit: _noOp2.default,
        mount: mountComponent,
        unmount: unmountComponent,
        onMount: _noOp2.default,
        onUnmount: _noOp2.default,
        onAttrsReceive: _noOp2.default,
        shouldUpdate: shouldComponentUpdate,
        onUpdate: _noOp2.default,
        isMounted: isComponentMounted,
        getState: getComponentState,
        getPrevState: getComponentPrevState,
        setState: setComponentState,
        renderToDom: renderComponentToDom,
        renderToString: renderComponentToString,
        adoptDom: adoptComponentDom,
        getDomNode: getComponentDomNode,
        getRootNode: getComponentRootNode,
        render: renderComponent,
        onRender: _noOp2.default,
        update: updateComponent,
        patch: patchComponent,
        getDomRef: getComponentDomRef,
        setDomRef: setComponentDomRef,
        getAttrs: getComponentAttrs,
        onChildContextRequest: requestChildContext,
        getContext: getComponentContext,
        _buildAttrs: buildComponentAttrs
    };

    for (var i in props) {
        ptp[i] = props[i];
    }

    res.prototype = ptp;

    res.getDefaultAttrs = getComponentDefaultAttrs;

    for (var _i2 in staticProps) {
        res[_i2] = staticProps[_i2];
    }

    res['__vidom__component__'] = true;

    return res;
}

exports.default = createComponent;

},{"./client/rafBatch":12,"./createNode":20,"./globalHook":21,"./utils/console":32,"./utils/emptyObj":34,"./utils/noOp":38}],20:[function(require,module,exports){
'use strict';

exports.__esModule = true;

exports.default = function (type) {
    switch (typeof type) {
        case 'string':
            return type === 'fragment' ? new _FragmentNode2.default() : WRAPPER_COMPONENTS[type] ? new _ComponentNode2.default(WRAPPER_COMPONENTS[type]) : new _TagNode2.default(type);

        case 'function':
            return type.__vidom__component__ ? new _ComponentNode2.default(type) : new _FunctionComponentNode2.default(type);

        default:
            if ("production" !== 'production') {
                _console2.default.error('Unsupported type of node');
            }
    }
};

var _TagNode = require('./nodes/TagNode');

var _TagNode2 = _interopRequireDefault(_TagNode);

var _ComponentNode = require('./nodes/ComponentNode');

var _ComponentNode2 = _interopRequireDefault(_ComponentNode);

var _FunctionComponentNode = require('./nodes/FunctionComponentNode');

var _FunctionComponentNode2 = _interopRequireDefault(_FunctionComponentNode);

var _FragmentNode = require('./nodes/FragmentNode');

var _FragmentNode2 = _interopRequireDefault(_FragmentNode);

var _Input = require('./components/Input');

var _Input2 = _interopRequireDefault(_Input);

var _Textarea = require('./components/Textarea');

var _Textarea2 = _interopRequireDefault(_Textarea);

var _Select = require('./components/Select');

var _Select2 = _interopRequireDefault(_Select);

var _console = require('./utils/console');

var _console2 = _interopRequireDefault(_console);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var WRAPPER_COMPONENTS = {
    input: _Input2.default,
    textarea: _Textarea2.default,
    select: _Select2.default
};

},{"./components/Input":16,"./components/Select":17,"./components/Textarea":18,"./nodes/ComponentNode":22,"./nodes/FragmentNode":23,"./nodes/FunctionComponentNode":24,"./nodes/TagNode":25,"./utils/console":32}],21:[function(require,module,exports){
'use strict';

exports.__esModule = true;

var _Emitter = require('./utils/Emitter');

var _Emitter2 = _interopRequireDefault(_Emitter);

var _mounter = require('./client/mounter');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var hook = new _Emitter2.default();

hook.getRootNodes = _mounter.getMountedRootNodes;

if ("production" !== 'production') {
    if (typeof window !== 'undefined') {
        window['__vidom__hook__'] = hook;
    }
}

exports.default = hook;

},{"./client/mounter":10,"./utils/Emitter":31}],22:[function(require,module,exports){
'use strict';

exports.__esModule = true;
exports.default = ComponentNode;

var _emptyObj = require('../utils/emptyObj');

var _emptyObj2 = _interopRequireDefault(_emptyObj);

var _nodeTypes = require('./utils/nodeTypes');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ComponentNode(component) {
    this.type = _nodeTypes.NODE_TYPE_COMPONENT;
    this._component = component;
    this._key = null;
    this._attrs = null;
    this._instance = null;
    this._children = null;
    this._ns = null;
    this._ctx = _emptyObj2.default;
}

ComponentNode.prototype = {
    getDomNode: function () {
        return this._instance.getDomNode();
    },
    key: function (key) {
        this._key = key;
        return this;
    },
    attrs: function (attrs) {
        this._attrs = attrs;
        return this;
    },
    children: function (children) {
        this._children = children;
        return this;
    },
    ctx: function (ctx) {
        this._ctx = ctx;
        return this;
    },
    renderToDom: function (parentNs) {
        return this._getInstance().renderToDom(parentNs);
    },
    renderToString: function () {
        return this._getInstance().renderToString();
    },
    adoptDom: function (domNode, domIdx) {
        return this._getInstance().adoptDom(domNode, domIdx);
    },
    mount: function () {
        this._instance.getRootNode().mount();
        this._instance.mount();
    },
    unmount: function () {
        if (this._instance) {
            this._instance.getRootNode().unmount();
            this._instance.unmount();
            this._instance = null;
        }
    },
    patch: function (node) {
        if (this === node) {
            return;
        }

        var instance = this._getInstance();

        if (this.type === node.type) {
            if (this._component === node._component) {
                instance.patch(node._attrs, node._children, node._ctx);
                node._instance = instance;
            } else {
                instance.unmount();
                var newInstance = node._getInstance();
                instance.getRootNode().patch(newInstance.getRootNode());
                newInstance.mount();
            }
        } else {
            instance.unmount();
            instance.getRootNode().patch(node);
        }
    },
    _getInstance: function () {
        return this._instance || (this._instance = new this._component(this._attrs, this._children, this._ctx));
    }
};

},{"../utils/emptyObj":34,"./utils/nodeTypes":28}],23:[function(require,module,exports){
(function (global){
'use strict';

exports.__esModule = true;
exports.default = FragmentNode;

var _patchOps = require('../client/patchOps');

var _patchOps2 = _interopRequireDefault(_patchOps);

var _createElement = require('../client/utils/createElement');

var _createElement2 = _interopRequireDefault(_createElement);

var _checkChildren = require('./utils/checkChildren');

var _checkChildren2 = _interopRequireDefault(_checkChildren);

var _patchChildren = require('./utils/patchChildren');

var _patchChildren2 = _interopRequireDefault(_patchChildren);

var _console = require('../utils/console');

var _console2 = _interopRequireDefault(_console);

var _emptyObj = require('../utils/emptyObj');

var _emptyObj2 = _interopRequireDefault(_emptyObj);

var _nodeTypes = require('./utils/nodeTypes');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var doc = global.document;

function FragmentNode() {
    this.type = _nodeTypes.NODE_TYPE_FRAGMENT;
    this._domNode = null;
    this._key = null;
    this._children = null;
    this._ctx = _emptyObj2.default;
}

FragmentNode.prototype = {
    getDomNode: function () {
        return this._domNode;
    },
    key: function (key) {
        this._key = key;
        return this;
    },
    children: function (children) {
        if ("production" !== 'production') {
            if (this._children !== null) {
                _console2.default.warn('You\'re trying to set children to fragment more than once.');
            }
        }

        this._children = processChildren(children);
        return this;
    },
    ctx: function (ctx) {
        if (ctx !== _emptyObj2.default) {
            this._ctx = ctx;

            var children = this._children;

            if (children) {
                var len = children.length;
                var i = 0;

                while (i < len) {
                    children[i++].ctx(ctx);
                }
            }
        }

        return this;
    },
    renderToDom: function (parentNs) {
        var children = this._children,
            domNode = [(0, _createElement2.default)('!'), (0, _createElement2.default)('!')],
            domFragment = doc.createDocumentFragment();

        domFragment.appendChild(domNode[0]);

        if (children) {
            var len = children.length;
            var i = 0;

            while (i < len) {
                domFragment.appendChild(children[i++].renderToDom(parentNs));
            }
        }

        domFragment.appendChild(domNode[1]);

        this._domNode = domNode;

        return domFragment;
    },
    renderToString: function () {
        var children = this._children;
        var res = '<!---->';

        if (children) {
            var i = children.length - 1;

            while (i >= 0) {
                res = children[i--].renderToString() + res;
            }
        }

        return '<!---->' + res;
    },
    adoptDom: function (domNodes, domIdx) {
        var domNode = [domNodes[domIdx++]],
            children = this._children,
            len = children.length;
        var i = 0;

        while (i < len) {
            domIdx = children[i++].adoptDom(domNodes, domIdx);
        }

        domNode.push(domNodes[domIdx]);

        this._domNode = domNode;

        return domIdx + 1;
    },
    mount: function () {
        var children = this._children;

        if (children) {
            var i = 0;
            var len = children.length;

            while (i < len) {
                children[i++].mount();
            }
        }
    },
    unmount: function () {
        var children = this._children;

        if (children) {
            var len = children.length;
            var i = 0;

            while (i < len) {
                children[i++].unmount();
            }
        }
    },
    patch: function (node) {
        if (this === node) {
            return;
        }

        switch (node.type) {
            case _nodeTypes.NODE_TYPE_FRAGMENT:
                node._domNode = this._domNode;
                this._patchChildren(node);
                break;

            case _nodeTypes.NODE_TYPE_COMPONENT:
                var instance = node._getInstance();

                this.patch(instance.getRootNode());
                instance.mount();
                break;

            case _nodeTypes.NODE_TYPE_FUNCTION_COMPONENT:
                this.patch(node._getRootNode());
                break;

            default:
                _patchOps2.default.replace(this, node);
        }
    },
    _patchChildren: function (node) {
        var childrenA = this._children,
            childrenB = node._children;

        if (childrenA === childrenB) {
            return;
        }

        if (!childrenB || !childrenB.length) {
            if (childrenA && childrenA.length) {
                _patchOps2.default.removeChildren(this);
            }

            return;
        }

        if (!childrenA || !childrenA.length) {
            var childrenBLen = childrenB.length;
            var iB = 0;

            while (iB < childrenBLen) {
                _patchOps2.default.appendChild(node, childrenB[iB++]);
            }

            return;
        }

        (0, _patchChildren2.default)(this, node);
    }
};

function processChildren(children) {
    if (children == null) {
        return null;
    }

    var res = Array.isArray(children) ? children : [children];

    if ("production" !== 'production') {
        (0, _checkChildren2.default)(res);
    }

    return res;
}

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../client/patchOps":11,"../client/utils/createElement":13,"../utils/console":32,"../utils/emptyObj":34,"./utils/checkChildren":27,"./utils/nodeTypes":28,"./utils/patchChildren":29}],24:[function(require,module,exports){
'use strict';

exports.__esModule = true;
exports.default = FunctionComponentNode;

var _createNode = require('../createNode');

var _createNode2 = _interopRequireDefault(_createNode);

var _emptyObj = require('../utils/emptyObj');

var _emptyObj2 = _interopRequireDefault(_emptyObj);

var _nodeTypes = require('./utils/nodeTypes');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function FunctionComponentNode(component) {
    this.type = _nodeTypes.NODE_TYPE_FUNCTION_COMPONENT;
    this._component = component;
    this._key = null;
    this._attrs = _emptyObj2.default;
    this._rootNode = null;
    this._children = null;
    this._ns = null;
    this._ctx = _emptyObj2.default;
}

FunctionComponentNode.prototype = {
    getDomNode: function () {
        return this._rootNode.getDomNode();
    },
    key: function (key) {
        this._key = key;
        return this;
    },
    attrs: function (attrs) {
        this._attrs = attrs;
        return this;
    },
    children: function (children) {
        this._children = children;
        return this;
    },
    ctx: function (ctx) {
        this._ctx = ctx;
        return this;
    },
    renderToDom: function (parentNs) {
        return this._getRootNode().renderToDom(parentNs);
    },
    renderToString: function () {
        return this._getRootNode().renderToString();
    },
    adoptDom: function (domNode, domIdx) {
        return this._getRootNode().adoptDom(domNode, domIdx);
    },
    mount: function () {
        this._getRootNode().mount();
    },
    unmount: function () {
        if (this._rootNode) {
            this._rootNode.unmount();
            this._rootNode = null;
        }
    },
    patch: function (node) {
        if (this === node) {
            return;
        }

        this._getRootNode().patch(this.type === node.type ? node._getRootNode() : node);
    },
    _getRootNode: function () {
        if (this._rootNode) {
            return this._rootNode;
        }

        var rootNode = this._component(this._attrs, this._children, this._ctx) || (0, _createNode2.default)('!');

        if ("production" !== 'production') {
            if (typeof rootNode !== 'object' || Array.isArray(rootNode)) {
                console.error('Function component must return a single node object on the top level');
            }
        }

        rootNode.ctx(this._ctx);

        return this._rootNode = rootNode;
    }
};

},{"../createNode":20,"../utils/emptyObj":34,"./utils/nodeTypes":28}],25:[function(require,module,exports){
'use strict';

exports.__esModule = true;
exports.default = TagNode;

var _patchOps = require('../client/patchOps');

var _patchOps2 = _interopRequireDefault(_patchOps);

var _domAttrs = require('../client/domAttrs');

var _domAttrs2 = _interopRequireDefault(_domAttrs);

var _checkChildren = require('./utils/checkChildren');

var _checkChildren2 = _interopRequireDefault(_checkChildren);

var _patchChildren = require('./utils/patchChildren');

var _patchChildren2 = _interopRequireDefault(_patchChildren);

var _domEventManager = require('../client/events/domEventManager');

var _attrsToEvents = require('../client/events/attrsToEvents');

var _attrsToEvents2 = _interopRequireDefault(_attrsToEvents);

var _escapeHtml = require('../utils/escapeHtml');

var _escapeHtml2 = _interopRequireDefault(_escapeHtml);

var _isInArray = require('../utils/isInArray');

var _isInArray2 = _interopRequireDefault(_isInArray);

var _console = require('../utils/console');

var _console2 = _interopRequireDefault(_console);

var _emptyObj = require('../utils/emptyObj');

var _emptyObj2 = _interopRequireDefault(_emptyObj);

var _browsers = require('../client/browsers');

var _createElement = require('../client/utils/createElement');

var _createElement2 = _interopRequireDefault(_createElement);

var _createElementByHtml = require('../client/utils/createElementByHtml');

var _createElementByHtml2 = _interopRequireDefault(_createElementByHtml);

var _nodeTypes = require('./utils/nodeTypes');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SHORT_TAGS = {
    area: true,
    base: true,
    br: true,
    col: true,
    command: true,
    embed: true,
    hr: true,
    img: true,
    input: true,
    keygen: true,
    link: true,
    menuitem: true,
    meta: true,
    param: true,
    source: true,
    track: true,
    wbr: true
},
    USE_DOM_STRINGS = _browsers.isTrident || _browsers.isEdge;

function TagNode(tag) {
    this.type = _nodeTypes.NODE_TYPE_TAG;
    this._tag = tag;
    this._domNode = null;
    this._key = null;
    this._ns = null;
    this._attrs = null;
    this._children = null;
    this._escapeChildren = true;
    this._ctx = _emptyObj2.default;
}

TagNode.prototype = {
    getDomNode: function () {
        return this._domNode;
    },
    key: function (key) {
        this._key = key;
        return this;
    },
    ns: function (ns) {
        this._ns = ns;
        return this;
    },
    attrs: function (attrs) {
        this._attrs = attrs;

        if ("production" !== 'production') {
            checkAttrs(attrs);
        }

        return this;
    },
    children: function (children) {
        if ("production" !== 'production') {
            if (this._children !== null) {
                _console2.default.warn('You\'re trying to set children or html more than once or pass both children and html.');
            }
        }

        this._children = processChildren(children);
        return this;
    },
    ctx: function (ctx) {
        if (ctx !== _emptyObj2.default) {
            this._ctx = ctx;

            var children = this._children;

            if (children && typeof children !== 'string') {
                var len = children.length;
                var i = 0;

                while (i < len) {
                    children[i++].ctx(ctx);
                }
            }
        }

        return this;
    },
    html: function (html) {
        if ("production" !== 'production') {
            if (this._children !== null) {
                _console2.default.warn('You\'re trying to set children or html more than once or pass both children and html.');
            }
        }

        this._children = html;
        this._escapeChildren = false;
        return this;
    },
    renderToDom: function (parentNs) {
        var ns = this._ns || parentNs,
            children = this._children;

        if (USE_DOM_STRINGS && children && typeof children !== 'string') {
            var _domNode = (0, _createElementByHtml2.default)(this.renderToString(), this._tag, ns);
            this.adoptDom([_domNode], 0);
            return _domNode;
        }

        var domNode = (0, _createElement2.default)(this._tag, ns),
            attrs = this._attrs;

        if (children) {
            if (typeof children === 'string') {
                this._escapeChildren ? domNode.textContent = children : domNode.innerHTML = children;
            } else {
                var i = 0;
                var len = children.length;

                while (i < len) {
                    domNode.appendChild(children[i++].renderToDom(ns));
                }
            }
        }

        if (attrs) {
            var name = void 0,
                value = void 0;
            for (name in attrs) {
                (value = attrs[name]) != null && (_attrsToEvents2.default[name] ? (0, _domEventManager.addListener)(domNode, _attrsToEvents2.default[name], value) : (0, _domAttrs2.default)(name).set(domNode, name, value));
            }
        }

        return this._domNode = domNode;
    },
    renderToString: function () {
        var tag = this._tag;

        if (tag === '!') {
            return '<!---->';
        }

        var ns = this._ns,
            attrs = this._attrs;
        var children = this._children,
            res = '<' + tag;

        if (ns) {
            res += ' xmlns="' + ns + '"';
        }

        if (attrs) {
            var name = void 0,
                value = void 0,
                attrHtml = void 0;
            for (name in attrs) {
                value = attrs[name];

                if (value != null) {
                    if (name === 'value') {
                        switch (tag) {
                            case 'textarea':
                                children = value;
                                continue;

                            case 'select':
                                this.ctx({ value: value, multiple: attrs.multiple });
                                continue;

                            case 'option':
                                if (this._ctx.multiple ? (0, _isInArray2.default)(this._ctx.value, value) : this._ctx.value === value) {
                                    res += ' ' + (0, _domAttrs2.default)('selected').toString('selected', true);
                                }
                        }
                    }

                    if (!_attrsToEvents2.default[name] && (attrHtml = (0, _domAttrs2.default)(name).toString(name, value))) {
                        res += ' ' + attrHtml;
                    }
                }
            }
        }

        if (SHORT_TAGS[tag]) {
            res += '/>';
        } else {
            res += '>';

            if (children) {
                if (typeof children === 'string') {
                    res += this._escapeChildren ? (0, _escapeHtml2.default)(children) : children;
                } else {
                    var i = 0;
                    var len = children.length;

                    while (i < len) {
                        res += children[i++].renderToString();
                    }
                }
            }

            res += '</' + tag + '>';
        }

        return res;
    },
    adoptDom: function (domNodes, domIdx) {
        var domNode = this._domNode = domNodes[domIdx],
            attrs = this._attrs,
            children = this._children;

        if (attrs) {
            var name = void 0,
                value = void 0;
            for (name in attrs) {
                if ((value = attrs[name]) != null && _attrsToEvents2.default[name]) {
                    (0, _domEventManager.addListener)(domNode, _attrsToEvents2.default[name], value);
                }
            }
        }

        if (children && typeof children !== 'string') {
            var i = 0;
            var len = children.length;

            if (len) {
                var domChildren = domNode.childNodes;
                var domChildIdx = 0;

                while (i < len) {
                    domChildIdx = children[i++].adoptDom(domChildren, domChildIdx);
                }
            }
        }

        return domIdx + 1;
    },
    mount: function () {
        var children = this._children;

        if (children && typeof children !== 'string') {
            var i = 0;
            var len = children.length;

            while (i < len) {
                children[i++].mount();
            }
        }
    },
    unmount: function () {
        var children = this._children;

        if (children && typeof children !== 'string') {
            var i = 0;
            var len = children.length;

            while (i < len) {
                children[i++].unmount();
            }
        }

        (0, _domEventManager.removeListeners)(this._domNode);

        this._domNode = null;
    },
    patch: function (node) {
        if (this === node) {
            return;
        }

        switch (node.type) {
            case _nodeTypes.NODE_TYPE_TAG:
                if (this._tag !== node._tag || this._ns !== node._ns) {
                    _patchOps2.default.replace(this, node);
                } else {
                    node._domNode = this._domNode;
                    this._patchChildren(node);
                    this._patchAttrs(node);
                }
                break;

            case _nodeTypes.NODE_TYPE_COMPONENT:
                var instance = node._getInstance();

                this.patch(instance.getRootNode());
                instance.mount();
                break;

            case _nodeTypes.NODE_TYPE_FUNCTION_COMPONENT:
                this.patch(node._getRootNode());
                break;

            default:
                _patchOps2.default.replace(this, node);
        }
    },
    _patchChildren: function (node) {
        var childrenA = this._children,
            childrenB = node._children;

        if (childrenA === childrenB) {
            return;
        }

        var isChildrenAText = typeof childrenA === 'string',
            isChildrenBText = typeof childrenB === 'string';

        if (isChildrenBText) {
            if (isChildrenAText) {
                _patchOps2.default.updateText(this, childrenB, node._escapeChildren);
                return;
            }

            childrenA && childrenA.length && _patchOps2.default.removeChildren(this);
            childrenB && _patchOps2.default.updateText(this, childrenB, node._escapeChildren);

            return;
        }

        if (!childrenB || !childrenB.length) {
            if (childrenA) {
                isChildrenAText ? _patchOps2.default.removeText(this) : childrenA.length && _patchOps2.default.removeChildren(this);
            }

            return;
        }

        if (isChildrenAText && childrenA) {
            _patchOps2.default.removeText(this);
        }

        if (isChildrenAText || !childrenA || !childrenA.length) {
            var childrenBLen = childrenB.length;
            var iB = 0;

            while (iB < childrenBLen) {
                _patchOps2.default.appendChild(node, childrenB[iB++]);
            }

            return;
        }

        (0, _patchChildren2.default)(this, node);
    },
    _patchAttrs: function (node) {
        var attrsA = this._attrs,
            attrsB = node._attrs;

        if (attrsA === attrsB) {
            return;
        }

        var attrName = void 0,
            attrAVal = void 0,
            attrBVal = void 0,
            isAttrAValArray = void 0,
            isAttrBValArray = void 0;

        if (attrsB) {
            for (attrName in attrsB) {
                attrBVal = attrsB[attrName];
                if (!attrsA || (attrAVal = attrsA[attrName]) == null) {
                    if (attrBVal != null) {
                        _patchOps2.default.updateAttr(this, attrName, attrBVal);
                    }
                } else if (attrBVal == null) {
                    _patchOps2.default.removeAttr(this, attrName);
                } else if (typeof attrBVal === 'object' && typeof attrAVal === 'object') {
                    isAttrBValArray = Array.isArray(attrBVal);
                    isAttrAValArray = Array.isArray(attrAVal);
                    if (isAttrBValArray || isAttrAValArray) {
                        if (isAttrBValArray && isAttrAValArray) {
                            this._patchAttrArr(attrName, attrAVal, attrBVal);
                        } else {
                            _patchOps2.default.updateAttr(this, attrName, attrBVal);
                        }
                    } else {
                        this._patchAttrObj(attrName, attrAVal, attrBVal);
                    }
                } else if (attrAVal !== attrBVal) {
                    _patchOps2.default.updateAttr(this, attrName, attrBVal);
                }
            }
        }

        if (attrsA) {
            for (attrName in attrsA) {
                if ((!attrsB || !(attrName in attrsB)) && (attrAVal = attrsA[attrName]) != null) {
                    _patchOps2.default.removeAttr(this, attrName);
                }
            }
        }
    },
    _patchAttrArr: function (attrName, arrA, arrB) {
        if (arrA === arrB) {
            return;
        }

        var lenA = arrA.length;
        var hasDiff = false;

        if (lenA === arrB.length) {
            var i = 0;
            while (!hasDiff && i < lenA) {
                if (arrA[i] != arrB[i]) {
                    hasDiff = true;
                }
                ++i;
            }
        } else {
            hasDiff = true;
        }

        hasDiff && _patchOps2.default.updateAttr(this, attrName, arrB);
    },
    _patchAttrObj: function (attrName, objA, objB) {
        if (objA === objB) {
            return;
        }

        var hasDiff = false,
            diffObj = {};

        for (var i in objB) {
            if (objA[i] != objB[i]) {
                hasDiff = true;
                diffObj[i] = objB[i];
            }
        }

        for (var _i in objA) {
            if (objA[_i] != null && !(_i in objB)) {
                hasDiff = true;
                diffObj[_i] = null;
            }
        }

        hasDiff && _patchOps2.default.updateAttr(this, attrName, diffObj);
    }
};

function processChildren(children) {
    if (children == null) {
        return null;
    }

    var typeOfChildren = typeof children;

    if (typeOfChildren === 'object') {
        var res = Array.isArray(children) ? children : [children];

        if ("production" !== 'production') {
            (0, _checkChildren2.default)(res);
        }

        return res;
    }

    return typeOfChildren === 'string' ? children : children.toString();
}

function checkAttrs(attrs) {
    for (var name in attrs) {
        if (name.substr(0, 2) === 'on' && !_attrsToEvents2.default[name]) {
            _console2.default.error('You\'re trying to add unsupported event listener "' + name + '".');
        }
    }
}

},{"../client/browsers":2,"../client/domAttrs":3,"../client/events/attrsToEvents":5,"../client/events/domEventManager":7,"../client/patchOps":11,"../client/utils/createElement":13,"../client/utils/createElementByHtml":14,"../utils/console":32,"../utils/emptyObj":34,"../utils/escapeHtml":36,"../utils/isInArray":37,"./utils/checkChildren":27,"./utils/nodeTypes":28,"./utils/patchChildren":29}],26:[function(require,module,exports){
'use strict';

exports.__esModule = true;
exports.default = TopNode;

var _nodeTypes = require('./utils/nodeTypes');

function TopNode(childNode, ns) {
    this.type = _nodeTypes.NODE_TYPE_TOP;
    this._childNode = childNode;
    this._ns = ns;
}

TopNode.prototype = {
    getDomNode: function () {
        return this._childNode.getDomNode();
    },
    renderToDom: function () {
        return this._childNode.renderToDom(this._ns);
    },
    adoptDom: function (domNode) {
        this._childNode.adoptDom(domNode, 0);
    },
    patch: function (node) {
        this._childNode.patch(node._childNode);
    },
    mount: function () {
        this._childNode.mount();
    },
    unmount: function () {
        this._childNode.unmount();
    }
};

},{"./utils/nodeTypes":28}],27:[function(require,module,exports){
'use strict';

exports.__esModule = true;
exports.default = checkChildren;

var _console = require('../../utils/console');

var _console2 = _interopRequireDefault(_console);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function checkChildren(children) {
    var keys = {},
        len = children.length;

    var i = 0,
        child = void 0;

    while (i < len) {
        child = children[i++];

        if (typeof child !== 'object') {
            _console2.default.error('You mustn\'t use simple child in case of multiple children.');
        } else if (child._key != null) {
            if (child._key in keys) {
                _console2.default.error('Childrens\' keys must be unique across the children. Found duplicate of "' + child._key + '" key.');
            } else {
                keys[child._key] = true;
            }
        }
    }
}

},{"../../utils/console":32}],28:[function(require,module,exports){
"use strict";

exports.__esModule = true;
var NODE_TYPE_TOP = exports.NODE_TYPE_TOP = 1;
var NODE_TYPE_TAG = exports.NODE_TYPE_TAG = 2;
var NODE_TYPE_FRAGMENT = exports.NODE_TYPE_FRAGMENT = 3;
var NODE_TYPE_COMPONENT = exports.NODE_TYPE_COMPONENT = 4;
var NODE_TYPE_FUNCTION_COMPONENT = exports.NODE_TYPE_FUNCTION_COMPONENT = 5;

},{}],29:[function(require,module,exports){
'use strict';

exports.__esModule = true;
exports.default = patchChildren;

var _patchOps = require('../../client/patchOps');

var _patchOps2 = _interopRequireDefault(_patchOps);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function patchChildren(nodeA, nodeB) {
    var childrenA = nodeA._children,
        childrenB = nodeB._children,
        childrenALen = childrenA.length,
        childrenBLen = childrenB.length;

    if (childrenALen === 1 && childrenBLen === 1) {
        childrenA[0].patch(childrenB[0]);
        return;
    }

    var leftIdxA = 0,
        rightIdxA = childrenALen - 1,
        leftChildA = childrenA[leftIdxA],
        leftChildAKey = leftChildA._key,
        rightChildA = childrenA[rightIdxA],
        rightChildAKey = rightChildA._key,
        leftIdxB = 0,
        rightIdxB = childrenBLen - 1,
        leftChildB = childrenB[leftIdxB],
        leftChildBKey = leftChildB._key,
        rightChildB = childrenB[rightIdxB],
        rightChildBKey = rightChildB._key,
        updateLeftIdxA = false,
        updateRightIdxA = false,
        updateLeftIdxB = false,
        updateRightIdxB = false,
        childrenAIndicesToSkip = {},
        childrenAKeys = void 0,
        foundAChildIdx = void 0,
        foundAChild = void 0;

    while (leftIdxA <= rightIdxA && leftIdxB <= rightIdxB) {
        if (childrenAIndicesToSkip[leftIdxA]) {
            updateLeftIdxA = true;
        } else if (childrenAIndicesToSkip[rightIdxA]) {
            updateRightIdxA = true;
        } else if (leftChildAKey === leftChildBKey) {
            leftChildA.patch(leftChildB);
            updateLeftIdxA = true;
            updateLeftIdxB = true;
        } else if (rightChildAKey === rightChildBKey) {
            rightChildA.patch(rightChildB);
            updateRightIdxA = true;
            updateRightIdxB = true;
        } else if (leftChildAKey != null && leftChildAKey === rightChildBKey) {
            _patchOps2.default.moveChild(leftChildA, rightChildA, true);
            leftChildA.patch(rightChildB);
            updateLeftIdxA = true;
            updateRightIdxB = true;
        } else if (rightChildAKey != null && rightChildAKey === leftChildBKey) {
            _patchOps2.default.moveChild(rightChildA, leftChildA, false);
            rightChildA.patch(leftChildB);
            updateRightIdxA = true;
            updateLeftIdxB = true;
        } else if (leftChildAKey != null && leftChildBKey == null) {
            _patchOps2.default.insertChild(leftChildB, leftChildA);
            updateLeftIdxB = true;
        } else if (leftChildAKey == null && leftChildBKey != null) {
            _patchOps2.default.removeChild(leftChildA);
            updateLeftIdxA = true;
        } else {
            childrenAKeys || (childrenAKeys = buildKeys(childrenA, leftIdxA, rightIdxA));
            if ((foundAChildIdx = childrenAKeys[leftChildBKey]) == null) {
                _patchOps2.default.insertChild(leftChildB, leftChildA);
            } else {
                foundAChild = childrenA[foundAChildIdx];
                childrenAIndicesToSkip[foundAChildIdx] = true;
                _patchOps2.default.moveChild(foundAChild, leftChildA, false);
                foundAChild.patch(leftChildB);
            }
            updateLeftIdxB = true;
        }

        if (updateLeftIdxA) {
            updateLeftIdxA = false;
            if (++leftIdxA <= rightIdxA) {
                leftChildA = childrenA[leftIdxA];
                leftChildAKey = leftChildA._key;
            }
        }

        if (updateRightIdxA) {
            updateRightIdxA = false;
            if (--rightIdxA >= leftIdxA) {
                rightChildA = childrenA[rightIdxA];
                rightChildAKey = rightChildA._key;
            }
        }

        if (updateLeftIdxB) {
            updateLeftIdxB = false;
            if (++leftIdxB <= rightIdxB) {
                leftChildB = childrenB[leftIdxB];
                leftChildBKey = leftChildB._key;
            }
        }

        if (updateRightIdxB) {
            updateRightIdxB = false;
            if (--rightIdxB >= leftIdxB) {
                rightChildB = childrenB[rightIdxB];
                rightChildBKey = rightChildB._key;
            }
        }
    }

    while (leftIdxA <= rightIdxA) {
        if (!childrenAIndicesToSkip[leftIdxA]) {
            _patchOps2.default.removeChild(childrenA[leftIdxA]);
        }
        ++leftIdxA;
    }

    while (leftIdxB <= rightIdxB) {
        rightIdxB < childrenBLen - 1 ? _patchOps2.default.insertChild(childrenB[leftIdxB], childrenB[rightIdxB + 1]) : _patchOps2.default.appendChild(nodeB, childrenB[leftIdxB]);
        ++leftIdxB;
    }
};

function buildKeys(children, idxFrom, idxTo) {
    var res = {},
        child = void 0;

    while (idxFrom < idxTo) {
        child = children[idxFrom];
        child._key != null && (res[child._key] = idxFrom);
        ++idxFrom;
    }

    return res;
}

},{"../../client/patchOps":11}],30:[function(require,module,exports){
"use strict";

exports.__esModule = true;

exports.default = function (tree) {
  return tree.renderToString();
};

},{}],31:[function(require,module,exports){
"use strict";

exports.__esModule = true;
function Emitter() {
    this._listeners = {};
}

Emitter.prototype = {
    on: function (event, fn) {
        var fnCtx = arguments.length <= 2 || arguments[2] === undefined ? null : arguments[2];

        (this._listeners[event] || (this._listeners[event] = [])).push({ fn: fn, fnCtx: fnCtx });

        return this;
    },
    off: function (event, fn) {
        var fnCtx = arguments.length <= 2 || arguments[2] === undefined ? null : arguments[2];

        var eventListeners = this._listeners[event];

        if (eventListeners) {
            var i = 0,
                eventListener = void 0;

            while (i < eventListeners.length) {
                eventListener = eventListeners[i];
                if (eventListener.fn === fn && eventListener.fnCtx === fnCtx) {
                    eventListeners.splice(i, 1);
                    break;
                }

                i++;
            }
        }

        return this;
    },
    emit: function (event) {
        var eventListeners = this._listeners[event];

        if (eventListeners) {
            var i = 0;

            for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
                args[_key - 1] = arguments[_key];
            }

            while (i < eventListeners.length) {
                var _eventListeners = eventListeners[i++];
                var fn = _eventListeners.fn;
                var fnCtx = _eventListeners.fnCtx;

                fn.call.apply(fn, [fnCtx].concat(args));
            }
        }

        return this;
    }
};

exports.default = Emitter;

},{}],32:[function(require,module,exports){
(function (global){
'use strict';

exports.__esModule = true;

var _noOp = require('./noOp');

var _noOp2 = _interopRequireDefault(_noOp);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var globalConsole = global.console,
    console = {},
    PREFIXES = {
    log: '',
    info: '',
    warn: 'Warning!',
    error: 'Error!'
};

['log', 'info', 'warn', 'error'].forEach(function (name) {
    console[name] = globalConsole ? globalConsole[name] ? function (arg1, arg2, arg3, arg4, arg5) {
        // IE9: console methods aren't functions
        var arg0 = PREFIXES[name];
        switch (arguments.length) {
            case 1:
                globalConsole[name](arg0, arg1);
                break;

            case 2:
                globalConsole[name](arg0, arg1, arg2);
                break;

            case 3:
                globalConsole[name](arg0, arg1, arg2, arg3);
                break;

            case 4:
                globalConsole[name](arg0, arg1, arg2, arg3, arg4);
                break;

            case 5:
                globalConsole[name](arg0, arg1, arg2, arg3, arg4, arg5);
                break;
        }
    } : function () {
        globalConsole.log.apply(globalConsole, arguments);
    } : _noOp2.default;
});

exports.default = console;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./noOp":38}],33:[function(require,module,exports){
'use strict';

exports.__esModule = true;
var DASHERIZE_RE = /([^A-Z]+)([A-Z])/g;

exports.default = function (str) {
  return str.replace(DASHERIZE_RE, '$1-$2').toLowerCase();
};

},{}],34:[function(require,module,exports){
"use strict";

exports.__esModule = true;
exports.default = {};

},{}],35:[function(require,module,exports){
'use strict';

exports.__esModule = true;

exports.default = function (str) {
    return (str + '').replace(/&/g, '&amp;').replace(/"/g, '&quot;');
};

},{}],36:[function(require,module,exports){
'use strict';

exports.__esModule = true;

exports.default = function (str) {
    return (str + '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
};

},{}],37:[function(require,module,exports){
"use strict";

exports.__esModule = true;

exports.default = function (arr, item) {
    var len = arr.length;
    var i = 0;

    while (i < len) {
        if (arr[i++] == item) {
            return true;
        }
    }

    return false;
};

},{}],38:[function(require,module,exports){
"use strict";

exports.__esModule = true;

exports.default = function () {};

},{}],39:[function(require,module,exports){
'use strict';

exports.__esModule = true;

exports.default = function (children) {
    var res = normalizeChildren(children);

    if (res !== null && typeof res === 'object' && !Array.isArray(res)) {
        res = [res];
    }

    return res;
};

var _createNode = require('../createNode');

var _createNode2 = _interopRequireDefault(_createNode);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function normalizeChildren(children) {
    if (children == null) {
        return null;
    }

    var typeOfChildren = typeof children;
    if (typeOfChildren !== 'object') {
        return typeOfChildren === 'string' ? children || null : '' + children;
    }

    if (!Array.isArray(children)) {
        return children;
    }

    if (!children.length) {
        return null;
    }

    var res = children,
        i = 0,
        len = children.length,
        allSkipped = true,
        child = void 0,
        isChildObject = void 0;

    while (i < len) {
        child = normalizeChildren(children[i]);
        if (child === null) {
            if (res !== null) {
                if (allSkipped) {
                    res = null;
                } else if (res === children) {
                    res = children.slice(0, i);
                }
            }
        } else {
            if (res === null) {
                res = child;
            } else if (Array.isArray(child)) {
                res = allSkipped ? child : (res === children ? res.slice(0, i) : Array.isArray(res) ? res : [res]).concat(child);
            } else {
                isChildObject = typeof child === 'object';

                if (isChildObject && children[i] === child) {
                    if (res !== children) {
                        res = join(res, child);
                    }
                } else {
                    if (res === children) {
                        if (allSkipped && isChildObject) {
                            res = child;
                            allSkipped = false;
                            ++i;
                            continue;
                        }

                        res = res.slice(0, i);
                    }

                    res = join(res, child);
                }
            }

            allSkipped = false;
        }

        ++i;
    }

    return res;
}

function toNode(obj) {
    return typeof obj === 'object' ? obj : (0, _createNode2.default)('span').children(obj);
}

function join(objA, objB) {
    if (Array.isArray(objA)) {
        objA.push(toNode(objB));
        return objA;
    }

    return [toNode(objA), toNode(objB)];
}

},{"../createNode":20}],40:[function(require,module,exports){
'use strict';

exports.__esModule = true;
exports.Component = exports.normalizeChildren = exports.renderToString = exports.createComponent = exports.node = undefined;

var _mounter = require('./client/mounter');

Object.keys(_mounter).forEach(function (key) {
    if (key === "default") return;
    Object.defineProperty(exports, key, {
        enumerable: true,
        get: function () {
            return _mounter[key];
        }
    });
});

var _createNode = require('./createNode');

var _createNode2 = _interopRequireDefault(_createNode);

var _createComponent = require('./createComponent');

var _createComponent2 = _interopRequireDefault(_createComponent);

var _renderToString = require('./renderToString');

var _renderToString2 = _interopRequireDefault(_renderToString);

var _normalizeChildren = require('./utils/normalizeChildren');

var _normalizeChildren2 = _interopRequireDefault(_normalizeChildren);

var _Component = require('./Component');

var _Component2 = _interopRequireDefault(_Component);

var _console = require('./utils/console');

var _console2 = _interopRequireDefault(_console);

require('./globalHook');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

if ("production" !== 'production') {
    _console2.default.info('You\'re using dev version of Vidom');
}

exports.node = _createNode2.default;
exports.createComponent = _createComponent2.default;
exports.renderToString = _renderToString2.default;
exports.normalizeChildren = _normalizeChildren2.default;
exports.Component = _Component2.default;

},{"./Component":1,"./client/mounter":10,"./createComponent":19,"./createNode":20,"./globalHook":21,"./renderToString":30,"./utils/console":32,"./utils/normalizeChildren":39}]},{},[40])(40)
});