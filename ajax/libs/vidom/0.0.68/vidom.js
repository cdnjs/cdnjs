(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.vidom = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _createComponent = require('./createComponent');

var _createComponent2 = _interopRequireDefault(_createComponent);

exports['default'] = (0, _createComponent2['default'])();
module.exports = exports['default'];

},{"./createComponent":17}],2:[function(require,module,exports){
(function (global){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
var ua = global.navigator ? global.navigator.userAgent : '';

var isTrident = ua.indexOf('Trident') > -1;
exports.isTrident = isTrident;
var isEdge = ua.indexOf('Edge') > -1;
exports.isEdge = isEdge;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],3:[function(require,module,exports){
(function (global){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _utilsEscapeAttr = require('../utils/escapeAttr');

var _utilsEscapeAttr2 = _interopRequireDefault(_utilsEscapeAttr);

var _utilsIsInArray = require('../utils/isInArray');

var _utilsIsInArray2 = _interopRequireDefault(_utilsIsInArray);

var _utilsDasherize = require('../utils/dasherize');

var _utilsDasherize2 = _interopRequireDefault(_utilsDasherize);

var _utilsConsole = require('../utils/console');

var _utilsConsole2 = _interopRequireDefault(_utilsConsole);

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
            _utilsConsole2['default'].error('Error! "' + name + '" attribute expects an object as a value, not a ' + typeOfVal);
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
    if (name === 'value' && node.tagName === 'SELECT') {
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
        optionNode = undefined;

    while (i < len) {
        optionNode = options[i++];
        optionNode.selected = value != null && (isMultiple ? (0, _utilsIsInArray2['default'])(value, optionNode.value) : optionNode.value == value);
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
    return (ATTR_NAMES[name] || name) + '="' + (0, _utilsEscapeAttr2['default'])(value) + '"';
}

function booleanAttrToString(name, value) {
    return value ? name : '';
}

function stylePropToString(name, value) {
    var styles = '';

    for (var i in value) {
        value[i] != null && (styles += (0, _utilsDasherize2['default'])(i) + ':' + value[i] + ';');
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

exports['default'] = function (attrName) {
    return attrsCfg[attrName] || DEFAULT_ATTR_CFG;
};

module.exports = exports['default'];

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../utils/console":23,"../utils/dasherize":24,"../utils/escapeAttr":25,"../utils/isInArray":27}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SyntheticEvent = (function () {
    function SyntheticEvent(type, nativeEvent) {
        _classCallCheck(this, SyntheticEvent);

        this.type = type;
        this.target = nativeEvent.target;
        this.nativeEvent = nativeEvent;

        this._isPropagationStopped = false;
        this._isDefaultPrevented = false;
    }

    _createClass(SyntheticEvent, [{
        key: "stopPropagation",
        value: function stopPropagation() {
            this._isPropagationStopped = true;

            var nativeEvent = this.nativeEvent;
            nativeEvent.stopPropagation ? nativeEvent.stopPropagation() : nativeEvent.cancelBubble = true;
        }
    }, {
        key: "isPropagationStopped",
        value: function isPropagationStopped() {
            return this._isPropagationStopped;
        }
    }, {
        key: "preventDefault",
        value: function preventDefault() {
            this._isDefaultPrevented = true;

            var nativeEvent = this.nativeEvent;
            nativeEvent.preventDefault ? nativeEvent.preventDefault() : nativeEvent.returnValue = false;
        }
    }, {
        key: "isDefaultPrevented",
        value: function isDefaultPrevented() {
            return this._isDefaultPrevented;
        }
    }]);

    return SyntheticEvent;
})();

exports["default"] = SyntheticEvent;
module.exports = exports["default"];

},{}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
exports['default'] = {
    onMouseOver: 'mouseover',
    onMouseMove: 'mousemove',
    onMouseOut: 'mouseout',
    onMouseDown: 'mousedown',
    onMouseUp: 'mouseup',
    onClick: 'click',
    onDblClick: 'dblclick',
    onKeyDown: 'keydown',
    onKeyPress: 'keypress',
    onKeyUp: 'keyup',
    onChange: 'change',
    onInput: 'input',
    onSubmit: 'submit',
    onFocus: 'focus',
    onBlur: 'blur',
    onScroll: 'scroll',
    onLoad: 'load',
    onError: 'error',
    onContextMenu: 'contextmenu',
    onDragStart: 'dragstart',
    onDrag: 'drag',
    onDragEnter: 'dragenter',
    onDragOver: 'dragover',
    onDragLeave: 'dragleave',
    onDragEnd: 'dragend',
    onDrop: 'drop',
    onWheel: 'wheel',
    onCopy: 'copy',
    onCut: 'cut',
    onPaste: 'paste'
};
module.exports = exports['default'];

},{}],6:[function(require,module,exports){
(function (global){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _isEventSupported = require('./isEventSupported');

var _isEventSupported2 = _interopRequireDefault(_isEventSupported);

var _SyntheticEvent = require('./SyntheticEvent');

var _SyntheticEvent2 = _interopRequireDefault(_SyntheticEvent);

var _getDomNodeId = require('../getDomNodeId');

var _getDomNodeId2 = _interopRequireDefault(_getDomNodeId);

var doc = global.document,
    body = doc && doc.body,
    BUBBLEABLE_NATIVE_EVENTS = ['mouseover', 'mousemove', 'mouseout', 'mousedown', 'mouseup', 'click', 'dblclick', 'keydown', 'keypress', 'keyup', 'change', 'input', 'submit', 'focus', 'blur', 'dragstart', 'drag', 'dragenter', 'dragover', 'dragleave', 'dragend', 'drop', 'contextmenu', 'wheel', 'copy', 'cut', 'paste'],
    NON_BUBBLEABLE_NATIVE_EVENTS = ['scroll', 'load', 'error'];

var listenersStorage = {},
    eventsCfg = {};

function globalEventListener(e, type) {
    type || (type = e.type);

    var cfg = eventsCfg[type],
        listenersToInvoke = [];

    var target = e.target,
        listenersCount = cfg.listenersCounter,
        listeners = undefined,
        listener = undefined,
        domNodeId = undefined;

    while (listenersCount > 0 && target !== body) {
        if (domNodeId = (0, _getDomNodeId2['default'])(target, true)) {
            listeners = listenersStorage[domNodeId];
            if (listeners && (listener = listeners[type])) {
                listenersToInvoke.push(listener);
                --listenersCount;
            }
        }

        target = target.parentNode;
    }

    if (listenersToInvoke.length) {
        var _event = new _SyntheticEvent2['default'](type, e),
            len = listenersToInvoke.length;

        var i = 0;

        while (i < len) {
            listenersToInvoke[i++](_event);
            if (_event.isPropagationStopped()) {
                break;
            }
        }
    }
}

function eventListener(e) {
    listenersStorage[(0, _getDomNodeId2['default'])(e.target)][e.type](new _SyntheticEvent2['default'](e.type, e));
}

if (body) {
    (function () {
        var focusEvents = {
            focus: 'focusin',
            blur: 'focusout'
        };

        var i = 0,
            type = undefined;

        while (i < BUBBLEABLE_NATIVE_EVENTS.length) {
            type = BUBBLEABLE_NATIVE_EVENTS[i++];
            eventsCfg[type] = {
                type: type,
                bubbles: true,
                listenersCounter: 0,
                set: false,
                setup: focusEvents[type] ? (0, _isEventSupported2['default'])(focusEvents[type]) ? function () {
                    var type = this.type;
                    body.addEventListener(focusEvents[type], function (e) {
                        globalEventListener(e, type);
                    });
                } : function () {
                    body.addEventListener(this.type, globalEventListener, true);
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
            cfg.setup ? cfg.setup() : cfg.bubbles && body.addEventListener(type, globalEventListener, false);
            cfg.set = true;
        }

        var domNodeId = (0, _getDomNodeId2['default'])(domNode),
            listeners = listenersStorage[domNodeId] || (listenersStorage[domNodeId] = {});

        if (!listeners[type]) {
            cfg.bubbles ? ++cfg.listenersCounter : domNode.addEventListener(type, eventListener, false);
        }

        listeners[type] = listener;
    }
}

function removeListener(domNode, type) {
    var domNodeId = (0, _getDomNodeId2['default'])(domNode, true);

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
    var domNodeId = (0, _getDomNodeId2['default'])(domNode, true);

    if (domNodeId) {
        var listeners = listenersStorage[domNodeId];

        if (listeners) {
            delete listenersStorage[domNodeId];
            for (var type in listeners) {
                removeListener(domNode, type);
            }
        }
    }
}

exports.addListener = addListener;
exports.removeListener = removeListener;
exports.removeListeners = removeListeners;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../getDomNodeId":8,"./SyntheticEvent":4,"./isEventSupported":7}],7:[function(require,module,exports){
(function (global){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
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

exports['default'] = isEventSupported;
module.exports = exports['default'];

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],8:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
var ID_PROP = '__vidom__id__';
var counter = 1;

function getDomNodeId(node, onlyGet) {
    return node[ID_PROP] || (onlyGet ? null : node[ID_PROP] = counter++);
}

exports['default'] = getDomNodeId;
module.exports = exports['default'];

},{}],9:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
exports.mountToDom = mountToDom;
exports.mountToDomSync = mountToDomSync;
exports.unmountFromDom = unmountFromDom;
exports.unmountFromDomSync = unmountFromDomSync;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _getDomNodeId = require('./getDomNodeId');

var _getDomNodeId2 = _interopRequireDefault(_getDomNodeId);

var _rafBatch = require('./rafBatch');

var _rafBatch2 = _interopRequireDefault(_rafBatch);

var mountedNodes = {};
var counter = 0;

function mount(domNode, tree, cb, cbCtx, syncMode) {
    var domNodeId = (0, _getDomNodeId2['default'])(domNode),
        mounted = mountedNodes[domNodeId],
        mountId = undefined;

    if (mounted && mounted.tree) {
        mountId = ++mounted.id;
        var patchFn = function patchFn() {
            if (mountedNodes[domNodeId] && mountedNodes[domNodeId].id === mountId) {
                mounted.tree.patch(tree);
                mounted.tree = tree;
                callCb(cb, cbCtx);
            }
        };
        syncMode ? patchFn() : (0, _rafBatch2['default'])(patchFn);
    } else {
        mountedNodes[domNodeId] = { tree: null, id: mountId = ++counter };

        var existingDom = domNode.firstChild;
        if (existingDom) {
            mountedNodes[domNodeId].tree = tree;
            tree.adoptDom(existingDom);
            tree.mount();
            callCb(cb, cbCtx);
        } else {
            var renderFn = function renderFn() {
                if (mountedNodes[domNodeId] && mountedNodes[domNodeId].id === mountId) {
                    mountedNodes[domNodeId].tree = tree;
                    domNode.appendChild(tree.renderToDom());
                    tree.mount();
                    callCb(cb, cbCtx);
                }
            };

            syncMode ? renderFn() : (0, _rafBatch2['default'])(renderFn);
        }
    }
}

function unmount(domNode, cb, cbCtx, syncMode) {
    var domNodeId = (0, _getDomNodeId2['default'])(domNode);
    var mounted = mountedNodes[domNodeId];

    if (mounted) {
        (function () {
            var mountId = ++mounted.id,
                unmountFn = function unmountFn() {
                mounted = mountedNodes[domNodeId];
                if (mounted && mounted.id === mountId) {
                    mounted.tree && mounted.tree.unmount();
                    delete mountedNodes[domNodeId];
                    domNode.innerHTML = '';
                    callCb(cb, cbCtx);
                }
            };

            mounted.tree ? syncMode ? unmountFn() : (0, _rafBatch2['default'])(unmountFn) : syncMode || callCb(cb, cbCtx);
        })();
    } else if (!syncMode) {
        callCb(cb, cbCtx);
    }
}

function callCb(cb, cbCtx) {
    cb && cb.call(cbCtx || this);
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

},{"./getDomNodeId":8,"./rafBatch":11}],10:[function(require,module,exports){
(function (global){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _domAttrs = require('./domAttrs');

var _domAttrs2 = _interopRequireDefault(_domAttrs);

var _eventsDomEventManager = require('./events/domEventManager');

var _eventsAttrsToEvents = require('./events/attrsToEvents');

var _eventsAttrsToEvents2 = _interopRequireDefault(_eventsAttrsToEvents);

var doc = global.document;

function appendChild(parentNode, childNode) {
    parentNode.getDomNode().appendChild(childNode.renderToDom(parentNode));
    childNode.mount();
}

function insertChild(parentNode, childNode, beforeChildNode) {
    parentNode.getDomNode().insertBefore(childNode.renderToDom(parentNode), beforeChildNode.getDomNode());
    childNode.mount();
}

function removeChild(parentNode, childNode) {
    var childDomNode = childNode.getDomNode();
    childNode.unmount();
    parentNode.getDomNode().removeChild(childDomNode);
}

function moveChild(parentNode, childNode, toChildNode, after) {
    var parentDomNode = parentNode.getDomNode(),
        childDomNode = childNode.getDomNode(),
        toChildDomNode = toChildNode.getDomNode(),
        activeDomNode = doc.activeElement;

    if (after) {
        var nextSiblingDomNode = toChildDomNode.nextSibling;
        nextSiblingDomNode ? parentDomNode.insertBefore(childDomNode, nextSiblingDomNode) : parentDomNode.appendChild(childDomNode);
    } else {
        parentDomNode.insertBefore(childDomNode, toChildDomNode);
    }

    if (doc.activeElement !== activeDomNode) {
        activeDomNode.focus();
    }
}

function removeChildren(parentNode) {
    var childNodes = parentNode._children,
        len = childNodes.length;

    var j = 0;

    while (j < len) {
        childNodes[j++].unmount();
    }

    parentNode.getDomNode().innerHTML = '';
}

function replace(parentNode, oldNode, newNode) {
    var oldDomNode = oldNode.getDomNode();

    oldNode.unmount();
    oldDomNode.parentNode.replaceChild(newNode.renderToDom(parentNode), oldDomNode);
    newNode.mount();
}

function updateAttr(node, attrName, attrVal) {
    var domNode = node.getDomNode();

    _eventsAttrsToEvents2['default'][attrName] ? (0, _eventsDomEventManager.addListener)(domNode, _eventsAttrsToEvents2['default'][attrName], attrVal) : (0, _domAttrs2['default'])(attrName).set(domNode, attrName, attrVal);
}

function removeAttr(node, attrName) {
    var domNode = node.getDomNode();

    _eventsAttrsToEvents2['default'][attrName] ? (0, _eventsDomEventManager.removeListener)(domNode, _eventsAttrsToEvents2['default'][attrName]) : (0, _domAttrs2['default'])(attrName).remove(domNode, attrName);
}

function updateText(node, text, escape) {
    var domNode = node.getDomNode();
    escape ? domNode.textContent = text : domNode.innerHTML = text;
}

function removeText(parentNode) {
    parentNode.getDomNode().innerHTML = '';
}

exports['default'] = {
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
module.exports = exports['default'];

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./domAttrs":3,"./events/attrsToEvents":5,"./events/domEventManager":6}],11:[function(require,module,exports){
(function (global){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
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

exports["default"] = function (fn) {
    batch.push(fn) === 1 && raf(applyBatch);
};

exports.applyBatch = applyBatch;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],12:[function(require,module,exports){
(function (global){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
var doc = global.document,
    elementProtos = {};

function createElement(ns, tag) {
    var baseElement = undefined;
    if (ns) {
        var key = ns + ':' + tag;
        baseElement = elementProtos[key] || (elementProtos[key] = doc.createElementNS(ns, tag));
    } else {
        baseElement = elementProtos[tag] || (elementProtos[tag] = doc.createElement(tag));
    }

    return baseElement.cloneNode();
}

exports['default'] = createElement;
module.exports = exports['default'];

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],13:[function(require,module,exports){
(function (global){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
var doc = global.document,
    TOP_LEVEL_NS_TAGS = {
    'http://www.w3.org/2000/svg': 'svg',
    'http://www.w3.org/1998/Math/MathML': 'math'
};

var helperDomNode = undefined;

function createElementByHtml(html, tag, ns) {
    helperDomNode || (helperDomNode = document.createElement('div'));

    if (!ns || !TOP_LEVEL_NS_TAGS[ns] || TOP_LEVEL_NS_TAGS[ns] === tag) {
        helperDomNode.innerHTML = html;
        return helperDomNode.removeChild(helperDomNode.firstChild);
    }

    var topLevelTag = TOP_LEVEL_NS_TAGS[ns];
    helperDomNode.innerHTML = '<' + topLevelTag + ' xmlns="' + ns + '">' + html + '</' + topLevelTag + '>';
    return helperDomNode.removeChild(helperDomNode.firstChild).firstChild;
}

exports['default'] = createElementByHtml;
module.exports = exports['default'];

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],14:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _createComponent = require('../createComponent');

var _createComponent2 = _interopRequireDefault(_createComponent);

var _nodesTagNode = require('../nodes/TagNode');

var _nodesTagNode2 = _interopRequireDefault(_nodesTagNode);

var _clientRafBatch = require('../client/rafBatch');

exports['default'] = (0, _createComponent2['default'])({
    onInit: function onInit() {
        var _this = this;

        this.onInput = function (e) {
            var attrs = _this.getAttrs();

            attrs.onInput && attrs.onInput(e);
            attrs.onChange && attrs.onChange(e);

            (0, _clientRafBatch.applyBatch)();

            if (_this.isMounted()) {
                // attrs could be changed during applyBatch()
                attrs = _this.getAttrs();
                var control = _this.getDomRef('control');
                if (control.value !== attrs.value) {
                    control.value = attrs.value;
                }
            }
        };

        this.onClick = function (e) {
            var attrs = _this.getAttrs();

            attrs.onClick && attrs.onClick(e);
            attrs.onChange && attrs.onChange(e);

            (0, _clientRafBatch.applyBatch)();

            if (_this.isMounted()) {
                // attrs could be changed during applyBatch()
                attrs = _this.getAttrs();
                var control = _this.getDomRef('control');
                if (control.checked !== attrs.checked) {
                    control.checked = attrs.checked;
                }
            }
        };
    },

    onRender: function onRender(attrs) {
        var controlAttrs = _extends({}, attrs, { onChange: null });

        if (attrs.type === 'checkbox' || attrs.type === 'radio') {
            controlAttrs.onClick = this.onClick;
        } else {
            controlAttrs.onInput = this.onInput;
        }

        return this.setDomRef('control', new _nodesTagNode2['default']('input').attrs(controlAttrs));
    }
});
module.exports = exports['default'];

},{"../client/rafBatch":11,"../createComponent":17,"../nodes/TagNode":20}],15:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _createComponent = require('../createComponent');

var _createComponent2 = _interopRequireDefault(_createComponent);

var _nodesTagNode = require('../nodes/TagNode');

var _nodesTagNode2 = _interopRequireDefault(_nodesTagNode);

var _clientRafBatch = require('../client/rafBatch');

exports['default'] = (0, _createComponent2['default'])({
    onInit: function onInit() {
        var _this = this;

        this.onChange = function (e) {
            var attrs = _this.getAttrs();

            attrs.onChange && attrs.onChange(e);

            (0, _clientRafBatch.applyBatch)();

            if (_this.isMounted()) {
                // attrs could be changed during applyBatch()
                attrs = _this.getAttrs();
                var control = _this.getDomRef('control');
                if (control.value !== attrs.value) {
                    control.value = attrs.value;
                }
            }
        };
    },

    onRender: function onRender(attrs, children) {
        var controlAttrs = _extends({}, attrs, {
            onChange: this.onChange
        });

        return this.setDomRef('control', new _nodesTagNode2['default']('select').attrs(controlAttrs).children(children));
    }
});
module.exports = exports['default'];

},{"../client/rafBatch":11,"../createComponent":17,"../nodes/TagNode":20}],16:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _createComponent = require('../createComponent');

var _createComponent2 = _interopRequireDefault(_createComponent);

var _nodesTagNode = require('../nodes/TagNode');

var _nodesTagNode2 = _interopRequireDefault(_nodesTagNode);

var _clientRafBatch = require('../client/rafBatch');

exports['default'] = (0, _createComponent2['default'])({
    onInit: function onInit() {
        var _this = this;

        this.onInput = function (e) {
            var attrs = _this.getAttrs();

            attrs.onInput && attrs.onInput(e);
            attrs.onChange && attrs.onChange(e);

            (0, _clientRafBatch.applyBatch)();

            if (_this.isMounted()) {
                // attrs could be changed during applyBatch()
                attrs = _this.getAttrs();
                var control = _this.getDomRef('control');
                if (control.value !== attrs.value) {
                    control.value = attrs.value;
                }
            }
        };
    },

    onRender: function onRender(attrs) {
        var controlAttrs = _extends({}, attrs, {
            onInput: this.onInput,
            onChange: null
        });

        return this.setDomRef('control', new _nodesTagNode2['default']('textarea').attrs(controlAttrs));
    }
});
module.exports = exports['default'];

},{"../client/rafBatch":11,"../createComponent":17,"../nodes/TagNode":20}],17:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _utilsNoOp = require('./utils/noOp');

var _utilsNoOp2 = _interopRequireDefault(_utilsNoOp);

var _clientRafBatch = require('./client/rafBatch');

var _clientRafBatch2 = _interopRequireDefault(_clientRafBatch);

var _createNode = require('./createNode');

var _createNode2 = _interopRequireDefault(_createNode);

var _utilsConsole = require('./utils/console');

var _utilsConsole2 = _interopRequireDefault(_utilsConsole);

var emptyAttrs = {};

function mountComponent() {
    this._isMounted = true;
    this.onMount(this._attrs);
}

function unmountComponent() {
    this._isMounted = false;
    this._domRefs = null;
    this.onUnmount();
}

function patchComponent(attrs, children, parentNode) {
    attrs = this._buildAttrs(attrs);

    var prevRootNode = this._rootNode,
        prevAttrs = this._attrs;

    if (prevAttrs !== attrs) {
        this._attrs = attrs;
        if (this.isMounted()) {
            var isUpdating = this._isUpdating;
            this._isUpdating = true;
            this.onAttrsReceive(attrs, prevAttrs);
            this._isUpdating = isUpdating;
        }
    }

    this._children = children;

    if (this._isUpdating) {
        return;
    }

    var shouldUpdate = this.shouldUpdate(attrs, prevAttrs);

    if ("production" !== 'production') {
        var shouldUpdateResType = typeof shouldUpdate;
        if (shouldUpdateResType !== 'boolean') {
            _utilsConsole2['default'].warn('Warning! Component#shouldUpdate() should return boolean instead of ' + shouldUpdateResType);
        }
    }

    if (shouldUpdate) {
        this._rootNode = this.render();
        prevRootNode.patch(this._rootNode, parentNode);
        this.isMounted() && this.onUpdate(attrs, prevAttrs);
    }
}

function shouldComponentUpdate(attrs, prevAttrs) {
    return true;
}

function renderComponentToDom(parentNode) {
    return this._rootNode.renderToDom(parentNode);
}

function renderComponentToString(ctx) {
    return this._rootNode.renderToString(ctx);
}

function adoptComponentDom(domNode, parentNode) {
    this._rootNode.adoptDom(domNode, parentNode);
}

function getComponentDomNode() {
    return this._rootNode.getDomNode();
}

function getComponentAttrs() {
    return this._attrs;
}

function renderComponent() {
    this._domRefs = {};

    var renderRes = this.onRender(this._attrs, this._children) || (0, _createNode2['default'])('noscript');

    if ("production" !== 'production') {
        if (typeof renderRes !== 'object' || Array.isArray(renderRes)) {
            _utilsConsole2['default'].error('Error! Component#onRender must return a single node object on the top level');
        }
    }

    return renderRes;
}

function updateComponent(cb, cbCtx) {
    var _this = this;

    if (this._isUpdating) {
        cb && (0, _clientRafBatch2['default'])(function () {
            return cb.call(cbCtx || _this);
        });
    } else {
        this._isUpdating = true;
        (0, _clientRafBatch2['default'])(function () {
            if (_this.isMounted()) {
                _this._isUpdating = false;
                _this.patch(_this._attrs, _this._children);
                cb && cb.call(cbCtx || _this);
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

function getComponentDefaultAttrs() {
    return emptyAttrs;
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

    if (defaultAttrs === emptyAttrs) {
        return attrs;
    }

    var res = {};

    for (var i in defaultAttrs) {
        res[i] = defaultAttrs[i];
    }

    for (var i in attrs) {
        res[i] = attrs[i];
    }

    return res;
}

function createComponent(props, staticProps) {
    var res = function res(attrs, children) {
        this._attrs = this._buildAttrs(attrs);
        this._children = children;
        this._domRefs = null;
        this._isMounted = false;
        this._isUpdating = false;
        this.onInit(this._attrs);
        this._rootNode = this.render();
    },
        ptp = {
        constructor: res,
        onInit: _utilsNoOp2['default'],
        mount: mountComponent,
        unmount: unmountComponent,
        onMount: _utilsNoOp2['default'],
        onUnmount: _utilsNoOp2['default'],
        onAttrsReceive: _utilsNoOp2['default'],
        shouldUpdate: shouldComponentUpdate,
        onUpdate: _utilsNoOp2['default'],
        isMounted: isComponentMounted,
        renderToDom: renderComponentToDom,
        renderToString: renderComponentToString,
        adoptDom: adoptComponentDom,
        getDomNode: getComponentDomNode,
        getRootNode: getComponentRootNode,
        render: renderComponent,
        onRender: _utilsNoOp2['default'],
        update: updateComponent,
        patch: patchComponent,
        getDomRef: getComponentDomRef,
        setDomRef: setComponentDomRef,
        getAttrs: getComponentAttrs,
        _buildAttrs: buildComponentAttrs
    };

    for (var i in props) {
        ptp[i] = props[i];
    }

    res.prototype = ptp;

    res.getDefaultAttrs = getComponentDefaultAttrs;

    for (var i in staticProps) {
        res[i] = staticProps[i];
    }

    return res;
}

exports['default'] = createComponent;
module.exports = exports['default'];

},{"./client/rafBatch":11,"./createNode":18,"./utils/console":23,"./utils/noOp":28}],18:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _nodesTagNode = require('./nodes/TagNode');

var _nodesTagNode2 = _interopRequireDefault(_nodesTagNode);

var _nodesComponentNode = require('./nodes/ComponentNode');

var _nodesComponentNode2 = _interopRequireDefault(_nodesComponentNode);

var _componentsInput = require('./components/Input');

var _componentsInput2 = _interopRequireDefault(_componentsInput);

var _componentsTextarea = require('./components/Textarea');

var _componentsTextarea2 = _interopRequireDefault(_componentsTextarea);

var _componentsSelect = require('./components/Select');

var _componentsSelect2 = _interopRequireDefault(_componentsSelect);

var WRAPPER_COMPONENTS = {
    input: _componentsInput2['default'],
    textarea: _componentsTextarea2['default'],
    select: _componentsSelect2['default']
};

function createNode(type) {
    switch (typeof type) {
        case 'string':
            return WRAPPER_COMPONENTS[type] ? new _nodesComponentNode2['default'](WRAPPER_COMPONENTS[type]) : new _nodesTagNode2['default'](type);

        case 'function':
            return new _nodesComponentNode2['default'](type);

        default:
            throw Error('unsupported node type: ' + typeof type);
    }
}

exports['default'] = createNode;
module.exports = exports['default'];

},{"./components/Input":14,"./components/Select":15,"./components/Textarea":16,"./nodes/ComponentNode":19,"./nodes/TagNode":20}],19:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ComponentNode = (function () {
    function ComponentNode(component) {
        _classCallCheck(this, ComponentNode);

        this.type = ComponentNode;
        this._component = component;
        this._key = null;
        this._attrs = null;
        this._instance = null;
        this._children = null;
        this._ns = null;
    }

    _createClass(ComponentNode, [{
        key: "getDomNode",
        value: function getDomNode() {
            return this._instance.getDomNode();
        }
    }, {
        key: "key",
        value: function key(_key) {
            this._key = _key;
            return this;
        }
    }, {
        key: "attrs",
        value: function attrs(_attrs) {
            this._attrs = _attrs;
            return this;
        }
    }, {
        key: "children",
        value: function children(_children) {
            this._children = _children;
            return this;
        }
    }, {
        key: "renderToDom",
        value: function renderToDom(parentNode) {
            if (!this._ns && parentNode && parentNode._ns) {
                this._ns = parentNode._ns;
            }

            return this._domNode = this._getInstance().renderToDom(this);
        }
    }, {
        key: "renderToString",
        value: function renderToString(ctx) {
            return this._getInstance().renderToString(ctx);
        }
    }, {
        key: "adoptDom",
        value: function adoptDom(domNode, parentNode) {
            this._getInstance().adoptDom(domNode, parentNode);
        }
    }, {
        key: "mount",
        value: function mount() {
            this._instance.getRootNode().mount();
            this._instance.mount();
        }
    }, {
        key: "unmount",
        value: function unmount() {
            if (this._instance) {
                this._instance.getRootNode().unmount();
                this._instance.unmount();
                this._instance = null;
            }
        }
    }, {
        key: "patch",
        value: function patch(node, parentNode) {
            if (this === node) {
                return;
            }

            if (!node._ns && parentNode && parentNode._ns) {
                node._ns = parentNode._ns;
            }

            var instance = this._getInstance();

            if (this.type === node.type) {
                if (this._component === node._component) {
                    instance.patch(node._attrs, node._children, parentNode);
                    node._instance = instance;
                } else {
                    instance.unmount();
                    var newInstance = node._getInstance();
                    instance.getRootNode().patch(newInstance.getRootNode(), parentNode);
                    newInstance.mount();
                }
            } else {
                instance.unmount();
                instance.getRootNode().patch(node, parentNode);
            }
        }
    }, {
        key: "_getInstance",
        value: function _getInstance() {
            return this._instance || (this._instance = new this._component(this._attrs, this._children));
        }
    }]);

    return ComponentNode;
})();

exports["default"] = ComponentNode;
module.exports = exports["default"];

},{}],20:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _clientPatchOps = require('../client/patchOps');

var _clientPatchOps2 = _interopRequireDefault(_clientPatchOps);

var _clientDomAttrs = require('../client/domAttrs');

var _clientDomAttrs2 = _interopRequireDefault(_clientDomAttrs);

var _clientEventsDomEventManager = require('../client/events/domEventManager');

var _clientEventsAttrsToEvents = require('../client/events/attrsToEvents');

var _clientEventsAttrsToEvents2 = _interopRequireDefault(_clientEventsAttrsToEvents);

var _utilsEscapeHtml = require('../utils/escapeHtml');

var _utilsEscapeHtml2 = _interopRequireDefault(_utilsEscapeHtml);

var _utilsIsInArray = require('../utils/isInArray');

var _utilsIsInArray2 = _interopRequireDefault(_utilsIsInArray);

var _utilsConsole = require('../utils/console');

var _utilsConsole2 = _interopRequireDefault(_utilsConsole);

var _clientBrowsers = require('../client/browsers');

var _clientUtilsCreateElement = require('../client/utils/createElement');

var _clientUtilsCreateElement2 = _interopRequireDefault(_clientUtilsCreateElement);

var _clientUtilsCreateElementByHtml = require('../client/utils/createElementByHtml');

var _clientUtilsCreateElementByHtml2 = _interopRequireDefault(_clientUtilsCreateElementByHtml);

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
    USE_DOM_STRINGS = _clientBrowsers.isTrident || _clientBrowsers.isEdge;

var TagNode = (function () {
    function TagNode(tag) {
        _classCallCheck(this, TagNode);

        this.type = TagNode;
        this._tag = tag;
        this._domNode = null;
        this._key = null;
        this._ns = null;
        this._attrs = null;
        this._children = null;
        this._escapeChildren = true;
    }

    _createClass(TagNode, [{
        key: 'getDomNode',
        value: function getDomNode() {
            return this._domNode;
        }
    }, {
        key: 'key',
        value: function key(_key) {
            this._key = _key;
            return this;
        }
    }, {
        key: 'ns',
        value: function ns(_ns) {
            this._ns = _ns;
            return this;
        }
    }, {
        key: 'attrs',
        value: function attrs(_attrs) {
            this._attrs = _attrs;

            if ("production" !== 'production') {
                checkAttrs(_attrs);
            }

            return this;
        }
    }, {
        key: 'children',
        value: function children(_children) {
            this._children = processChildren(_children);
            return this;
        }
    }, {
        key: 'html',
        value: function html(_html) {
            this._children = _html;
            this._escapeChildren = false;
            return this;
        }
    }, {
        key: 'renderToDom',
        value: function renderToDom(parentNode) {
            if (!this._ns && parentNode && parentNode._ns) {
                this._ns = parentNode._ns;
            }

            var children = this._children;

            if (USE_DOM_STRINGS && children && typeof children !== 'string') {
                var _domNode = (0, _clientUtilsCreateElementByHtml2['default'])(this.renderToString(), this._tag, this._ns);
                this.adoptDom(_domNode, parentNode);
                return _domNode;
            }

            var domNode = (0, _clientUtilsCreateElement2['default'])(this._ns, this._tag),
                attrs = this._attrs;

            if (children) {
                if (typeof children === 'string') {
                    this._escapeChildren ? domNode.textContent = children : domNode.innerHTML = children;
                } else {
                    var i = 0;
                    var len = children.length;

                    while (i < len) {
                        domNode.appendChild(children[i++].renderToDom(this));
                    }
                }
            }

            if (attrs) {
                var _name = undefined,
                    value = undefined;
                for (_name in attrs) {
                    (value = attrs[_name]) != null && (_clientEventsAttrsToEvents2['default'][_name] ? (0, _clientEventsDomEventManager.addListener)(domNode, _clientEventsAttrsToEvents2['default'][_name], value) : (0, _clientDomAttrs2['default'])(_name).set(domNode, _name, value));
                }
            }

            return this._domNode = domNode;
        }
    }, {
        key: 'renderToString',
        value: function renderToString(ctx) {
            var tag = this._tag,
                ns = this._ns,
                attrs = this._attrs;

            var children = this._children,
                res = '<' + tag;

            if (ns) {
                res += ' xmlns="' + ns + '"';
            }

            if (attrs) {
                var _name2 = undefined,
                    value = undefined,
                    attrHtml = undefined;
                for (_name2 in attrs) {
                    value = attrs[_name2];

                    if (value != null) {
                        if (_name2 === 'value') {
                            switch (tag) {
                                case 'textarea':
                                    children = value;
                                    continue;

                                case 'select':
                                    ctx = { value: value, multiple: attrs.multiple };
                                    continue;

                                case 'option':
                                    if (ctx.multiple ? (0, _utilsIsInArray2['default'])(ctx.value, value) : ctx.value === value) {
                                        res += ' ' + (0, _clientDomAttrs2['default'])('selected').toString('selected', true);
                                    }
                            }
                        }

                        if (!_clientEventsAttrsToEvents2['default'][_name2] && (attrHtml = (0, _clientDomAttrs2['default'])(_name2).toString(_name2, value))) {
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
                        res += this._escapeChildren ? (0, _utilsEscapeHtml2['default'])(children) : children;
                    } else {
                        var i = 0;
                        var len = children.length;

                        while (i < len) {
                            res += children[i++].renderToString(ctx);
                        }
                    }
                }

                res += '</' + tag + '>';
            }

            return res;
        }
    }, {
        key: 'adoptDom',
        value: function adoptDom(domNode, parentNode) {
            if (!this._ns && parentNode && parentNode._ns) {
                this._ns = parentNode._ns;
            }

            this._domNode = domNode;

            var attrs = this._attrs,
                children = this._children;

            if (attrs) {
                var _name3 = undefined,
                    value = undefined;
                for (_name3 in attrs) {
                    if ((value = attrs[_name3]) != null && _clientEventsAttrsToEvents2['default'][_name3]) {
                        (0, _clientEventsDomEventManager.addListener)(domNode, _clientEventsAttrsToEvents2['default'][_name3], value);
                    }
                }
            }

            if (children && typeof children !== 'string') {
                var i = 0;
                var len = children.length;

                if (len) {
                    var domChildren = domNode.childNodes;
                    while (i < len) {
                        children[i].adoptDom(domChildren[i], this);
                        ++i;
                    }
                }
            }
        }
    }, {
        key: 'mount',
        value: function mount() {
            var children = this._children;

            if (children && typeof children !== 'string') {
                var i = 0;
                var len = children.length;

                while (i < len) {
                    children[i++].mount();
                }
            }
        }
    }, {
        key: 'unmount',
        value: function unmount() {
            var children = this._children;

            if (children && typeof children !== 'string') {
                var i = 0;
                var len = children.length;

                while (i < len) {
                    children[i++].unmount();
                }
            }

            (0, _clientEventsDomEventManager.removeListeners)(this._domNode);

            this._domNode = null;
        }
    }, {
        key: 'patch',
        value: function patch(node, parentNode) {
            if (this === node) {
                return;
            }

            if (!node._ns && parentNode && parentNode._ns) {
                node._ns = parentNode._ns;
            }

            if (this.type !== node.type || this._tag !== node._tag || this._ns !== node._ns) {
                _clientPatchOps2['default'].replace(parentNode || null, this, node);
                return;
            }

            this._domNode && (node._domNode = this._domNode);

            this._patchChildren(node);
            this._patchAttrs(node);
        }
    }, {
        key: '_patchChildren',
        value: function _patchChildren(node) {
            var childrenA = this._children,
                childrenB = node._children;

            if (childrenA === childrenB) {
                return;
            }

            var isChildrenAText = typeof childrenA === 'string',
                isChildrenBText = typeof childrenB === 'string';

            if (isChildrenBText) {
                if (isChildrenAText) {
                    _clientPatchOps2['default'].updateText(this, childrenB, node._escapeChildren);
                    return;
                }

                childrenA && childrenA.length && _clientPatchOps2['default'].removeChildren(this);
                childrenB && _clientPatchOps2['default'].updateText(this, childrenB, node._escapeChildren);

                return;
            }

            if (!childrenB || !childrenB.length) {
                if (childrenA) {
                    isChildrenAText ? _clientPatchOps2['default'].removeText(this) : childrenA.length && _clientPatchOps2['default'].removeChildren(this);
                }

                return;
            }

            if (isChildrenAText && childrenA) {
                _clientPatchOps2['default'].removeText(this);
            }

            var childrenBLen = childrenB.length;

            if (isChildrenAText || !childrenA || !childrenA.length) {
                var iB = 0;
                while (iB < childrenBLen) {
                    _clientPatchOps2['default'].appendChild(node, childrenB[iB++]);
                }
                return;
            }

            var childrenALen = childrenA.length;

            if (childrenALen === 1 && childrenBLen === 1) {
                childrenA[0].patch(childrenB[0], node);
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
                childrenAKeys = undefined,
                foundAChildIdx = undefined,
                foundAChild = undefined;

            while (leftIdxA <= rightIdxA && leftIdxB <= rightIdxB) {
                if (childrenAIndicesToSkip[leftIdxA]) {
                    updateLeftIdxA = true;
                } else if (childrenAIndicesToSkip[rightIdxA]) {
                    updateRightIdxA = true;
                } else if (leftChildAKey === leftChildBKey) {
                    leftChildA.patch(leftChildB, node);
                    updateLeftIdxA = true;
                    updateLeftIdxB = true;
                } else if (rightChildAKey === rightChildBKey) {
                    rightChildA.patch(rightChildB, node);
                    updateRightIdxA = true;
                    updateRightIdxB = true;
                } else if (leftChildAKey != null && leftChildAKey === rightChildBKey) {
                    _clientPatchOps2['default'].moveChild(node, leftChildA, rightChildA, true);
                    leftChildA.patch(rightChildB, node);
                    updateLeftIdxA = true;
                    updateRightIdxB = true;
                } else if (rightChildAKey != null && rightChildAKey === leftChildBKey) {
                    _clientPatchOps2['default'].moveChild(node, rightChildA, leftChildA, false);
                    rightChildA.patch(leftChildB, node);
                    updateRightIdxA = true;
                    updateLeftIdxB = true;
                } else if (leftChildAKey != null && leftChildBKey == null) {
                    _clientPatchOps2['default'].insertChild(node, leftChildB, leftChildA);
                    updateLeftIdxB = true;
                } else if (leftChildAKey == null && leftChildBKey != null) {
                    _clientPatchOps2['default'].removeChild(node, leftChildA);
                    updateLeftIdxA = true;
                } else {
                    childrenAKeys || (childrenAKeys = buildKeys(childrenA, leftIdxA, rightIdxA));
                    if ((foundAChildIdx = childrenAKeys[leftChildBKey]) != null) {
                        foundAChild = childrenA[foundAChildIdx];
                        childrenAIndicesToSkip[foundAChildIdx] = true;
                        _clientPatchOps2['default'].moveChild(node, foundAChild, leftChildA, false);
                        foundAChild.patch(leftChildB, node);
                    } else {
                        _clientPatchOps2['default'].insertChild(node, leftChildB, leftChildA);
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
                    _clientPatchOps2['default'].removeChild(node, childrenA[leftIdxA]);
                }
                ++leftIdxA;
            }

            while (leftIdxB <= rightIdxB) {
                rightIdxB < childrenBLen - 1 ? _clientPatchOps2['default'].insertChild(node, childrenB[leftIdxB], childrenB[rightIdxB + 1]) : _clientPatchOps2['default'].appendChild(node, childrenB[leftIdxB]);
                ++leftIdxB;
            }
        }
    }, {
        key: '_patchAttrs',
        value: function _patchAttrs(node) {
            var attrsA = this._attrs,
                attrsB = node._attrs;

            if (attrsA === attrsB) {
                return;
            }

            var attrName = undefined,
                attrAVal = undefined,
                attrBVal = undefined,
                isAttrAValArray = undefined,
                isAttrBValArray = undefined;

            if (attrsB) {
                for (attrName in attrsB) {
                    attrBVal = attrsB[attrName];
                    if (!attrsA || (attrAVal = attrsA[attrName]) == null) {
                        if (attrBVal != null) {
                            _clientPatchOps2['default'].updateAttr(this, attrName, attrBVal);
                        }
                    } else if (attrBVal == null) {
                        _clientPatchOps2['default'].removeAttr(this, attrName);
                    } else if (typeof attrBVal === 'object' && typeof attrAVal === 'object') {
                        isAttrBValArray = Array.isArray(attrBVal);
                        isAttrAValArray = Array.isArray(attrAVal);
                        if (isAttrBValArray || isAttrAValArray) {
                            if (isAttrBValArray && isAttrAValArray) {
                                this._patchAttrArr(attrName, attrAVal, attrBVal);
                            } else {
                                _clientPatchOps2['default'].updateAttr(this, attrName, attrBVal);
                            }
                        } else {
                            this._patchAttrObj(attrName, attrAVal, attrBVal);
                        }
                    } else if (attrAVal !== attrBVal) {
                        _clientPatchOps2['default'].updateAttr(this, attrName, attrBVal);
                    }
                }
            }

            if (attrsA) {
                for (attrName in attrsA) {
                    if ((!attrsB || !(attrName in attrsB)) && (attrAVal = attrsA[attrName]) != null) {
                        _clientPatchOps2['default'].removeAttr(this, attrName);
                    }
                }
            }
        }
    }, {
        key: '_patchAttrArr',
        value: function _patchAttrArr(attrName, arrA, arrB) {
            if (arrA === arrB) {
                return;
            }

            var lenA = arrA.length;
            var hasDiff = false;

            if (lenA !== arrB.length) {
                hasDiff = true;
            } else {
                var i = 0;
                while (!hasDiff && i < lenA) {
                    if (arrA[i] != arrB[i]) {
                        hasDiff = true;
                    }
                    ++i;
                }
            }

            hasDiff && _clientPatchOps2['default'].updateAttr(this, attrName, arrB);
        }
    }, {
        key: '_patchAttrObj',
        value: function _patchAttrObj(attrName, objA, objB) {
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

            for (var i in objA) {
                if (objA[i] != null && !(i in objB)) {
                    hasDiff = true;
                    diffObj[i] = null;
                }
            }

            hasDiff && _clientPatchOps2['default'].updateAttr(this, attrName, diffObj);
        }
    }]);

    return TagNode;
})();

exports['default'] = TagNode;

function processChildren(children) {
    if (children == null) {
        return null;
    }

    var typeOfChildren = typeof children;

    if (typeOfChildren === 'object') {
        var res = Array.isArray(children) ? children : [children];

        if ("production" !== 'production') {
            checkChildren(res);
        }

        return res;
    }

    return typeOfChildren === 'string' ? children : children.toString();
}

function checkChildren(children) {
    var keys = {},
        len = children.length;

    var i = 0,
        child = undefined;

    while (i < len) {
        child = children[i++];

        if (typeof child !== 'object') {
            _utilsConsole2['default'].error('Error! You mustn\'t use simple child in case of multiple children.');
        }
        //else if(child._key == null) {
        //    if(len > 1) {
        //        console.warn('Warning! You\'re using children without keys.');
        //    }
        //}
        else if (child._key != null) {
                if (child._key in keys) {
                    _utilsConsole2['default'].error('Error! Childrens\' keys must be unique across the children');
                } else {
                    keys[child._key] = true;
                }
            }
    }
}

function buildKeys(children, idxFrom, idxTo) {
    var res = {},
        child = undefined;

    while (idxFrom < idxTo) {
        child = children[idxFrom];
        child._key != null && (res[child._key] = idxFrom);
        ++idxFrom;
    }

    return res;
}

function checkAttrs(attrs) {
    for (var _name4 in attrs) {
        if (_name4.substr(0, 2) === 'on' && !_clientEventsAttrsToEvents2['default'][_name4]) {
            _utilsConsole2['default'].error('Error! You\'re trying to add unsupported event listener "' + _name4 + '"');
        }
    }
}
module.exports = exports['default'];

},{"../client/browsers":2,"../client/domAttrs":3,"../client/events/attrsToEvents":5,"../client/events/domEventManager":6,"../client/patchOps":10,"../client/utils/createElement":12,"../client/utils/createElementByHtml":13,"../utils/console":23,"../utils/escapeHtml":26,"../utils/isInArray":27}],21:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
exports['default'] = normalizeChildren;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _createNode = require('./createNode');

var _createNode2 = _interopRequireDefault(_createNode);

function normalizeChildren(children) {
    var typeOfChildren = typeof children;
    if (typeOfChildren !== 'object') {
        return children;
    }

    if (!Array.isArray(children)) {
        children = [children];
    }

    var res = [],
        i = 0,
        len = children.length,
        child = undefined;

    while (i < len) {
        child = children[i];
        if (Array.isArray(child)) {
            res = res.concat(normalizeChildren(child));
        } else if (child != null) {
            var typeOfChild = typeof child;
            res.push(typeOfChild === 'object' ? child : (0, _createNode2['default'])('span').children(typeOfChild === 'string' ? child : child.toString()));
        }
        ++i;
    }

    return res;
}

module.exports = exports['default'];

},{"./createNode":18}],22:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports["default"] = function (tree) {
  return tree.renderToString();
};

module.exports = exports["default"];

},{}],23:[function(require,module,exports){
(function (global){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _noOp = require('./noOp');

var _noOp2 = _interopRequireDefault(_noOp);

var globalConsole = global.console,
    console = {};

['log', 'info', 'warn', 'error'].forEach(function (name) {
    console[name] = globalConsole ? globalConsole[name] ? function (arg1, arg2, arg3, arg4, arg5) {
        // IE9: console methods aren't functions
        switch (arguments.length) {
            case 1:
                globalConsole[name](arg1);
                break;

            case 2:
                globalConsole[name](arg1, arg2);
                break;

            case 3:
                globalConsole[name](arg1, arg2, arg3);
                break;

            case 4:
                globalConsole[name](arg1, arg2, arg3, arg4);
                break;

            case 5:
                globalConsole[name](arg1, arg2, arg3, arg4, arg5);
                break;
        }
    } : function () {
        globalConsole.log.apply(globalConsole, arguments);
    } : _noOp2['default'];
});

exports['default'] = console;
module.exports = exports['default'];

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./noOp":28}],24:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
var DASHERIZE_RE = /([^A-Z]+)([A-Z])/g;

exports['default'] = function (str) {
  return str.replace(DASHERIZE_RE, '$1-$2').toLowerCase();
};

module.exports = exports['default'];

},{}],25:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

exports['default'] = function (str) {
    return (str + '').replace(/&/g, '&amp;').replace(/"/g, '&quot;');
};

module.exports = exports['default'];

},{}],26:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

exports['default'] = function (str) {
    return (str + '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
};

module.exports = exports['default'];

},{}],27:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports["default"] = function (arr, item) {
    var len = arr.length;
    var i = 0;

    while (i < len) {
        if (arr[i++] == item) {
            return true;
        }
    }

    return false;
};

module.exports = exports["default"];

},{}],28:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports["default"] = function () {};

module.exports = exports["default"];

},{}],29:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _interopExportWildcard(obj, defaults) { var newObj = defaults({}, obj); delete newObj['default']; return newObj; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _createNode = require('./createNode');

var _createNode2 = _interopRequireDefault(_createNode);

var _createComponent = require('./createComponent');

var _createComponent2 = _interopRequireDefault(_createComponent);

var _renderToString = require('./renderToString');

var _renderToString2 = _interopRequireDefault(_renderToString);

var _normalizeChildren = require('./normalizeChildren');

var _normalizeChildren2 = _interopRequireDefault(_normalizeChildren);

var _Component = require('./Component');

var _Component2 = _interopRequireDefault(_Component);

var _utilsConsole = require('./utils/console');

var _utilsConsole2 = _interopRequireDefault(_utilsConsole);

if ("production" !== 'production') {
    _utilsConsole2['default'].info('You\'re using dev version of Vidom');
}

var _clientMounter = require('./client/mounter');

_defaults(exports, _interopExportWildcard(_clientMounter, _defaults));

exports.node = _createNode2['default'];
exports.createComponent = _createComponent2['default'];
exports.renderToString = _renderToString2['default'];
exports.normalizeChildren = _normalizeChildren2['default'];
exports.Component = _Component2['default'];

},{"./Component":1,"./client/mounter":9,"./createComponent":17,"./createNode":18,"./normalizeChildren":21,"./renderToString":22,"./utils/console":23}]},{},[29])(29)
});