/**
 * Vidom
 * @author Filatov Dmitry <dfilatov@inbox.ru>
 * @version 0.8.4
 */
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(factory((global.vidom = global.vidom || {})));
}(this, (function (exports) { 'use strict';

var AMP_RE = /&/g;
var QUOT_RE = /"/g;

function escapeAttr(str) {
    str = str + '';

    var i = str.length,
        escapes = 0; // 1 — escape '&', 2 — escape '"'

    while (i--) {
        switch (str[i]) {
            case '&':
                escapes |= 1;
                break;

            case '"':
                escapes |= 2;
                break;
        }
    }

    if (escapes & 1) {
        str = str.replace(AMP_RE, '&amp;');
    }

    if (escapes & 2) {
        str = str.replace(QUOT_RE, '&quot;');
    }

    return str;
}

function isInArray(arr, item) {
    var len = arr.length;
    var i = 0;

    while (i < len) {
        if (arr[i++] == item) {
            return true;
        }
    }

    return false;
}

var DASHERIZE_RE = /([^A-Z]+)([A-Z])/g;

function dasherize(str) {
    return str.replace(DASHERIZE_RE, '$1-$2').toLowerCase();
}

/** @const */
var IS_DEBUG = !'development' || 'development' === 'development';

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
        removeAttr$1(node, name);
    }
}

function setProp(node, name, val) {
    node[name] = val;
}

function setObjProp(node, name, val) {
    if (IS_DEBUG) {
        var typeOfVal = typeof val;

        if (typeOfVal !== 'object') {
            throw TypeError('vidom: "' + name + '" attribute value must be an object, not a ' + typeOfVal);
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

function removeAttr$1(node, name) {
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
    var isMultiple = Array.isArray(value);

    if (isMultiple) {
        var options = node.options,
            len = options.length;

        var i = 0,
            optionNode = void 0;

        while (i < len) {
            optionNode = options[i++];
            optionNode.selected = value != null && isInArray(value, optionNode.value);
        }
    } else {
        node.value = value;
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
    return value === false ? '' : (ATTR_NAMES[name] || name) + (value === true ? '' : '="' + escapeAttr(value) + '"');
}

function booleanAttrToString(name, value) {
    return value ? name : '';
}

function stylePropToString(name, value) {
    var styles = '',
        i = void 0;

    for (i in value) {
        if (value[i] != null) {
            styles += dasherize(i) + ':' + value[i] + ';';
        }
    }

    return styles ? name + '="' + styles + '"' : styles;
}

var defaultPropVals = {};

function getDefaultPropVal(tag, attrName) {
    var tagAttrs = defaultPropVals[tag] || (defaultPropVals[tag] = {});

    return attrName in tagAttrs ? tagAttrs[attrName] : tagAttrs[attrName] = document.createElement(tag)[attrName];
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
};
var DEFAULT_ATTR_CFG = {
    set: setAttr,
    remove: removeAttr$1,
    toString: attrToString
};
var BOOLEAN_ATTR_CFG = {
    set: setBooleanAttr,
    remove: removeAttr$1,
    toString: booleanAttrToString
};
var DEFAULT_PROP_CFG = {
    set: setProp,
    remove: removeProp,
    toString: attrToString
};
var BOOLEAN_PROP_CFG = {
    set: setProp,
    remove: removeProp,
    toString: booleanAttrToString
};
var attrsCfg = {
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

var domAttrs = function (attrName) {
    return attrsCfg[attrName] || DEFAULT_ATTR_CFG;
};

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

function replace$1(old, replacement) {
    if (Array.isArray(old)) {
        insertBefore(replacement, old);
        remove(old);
    } else {
        old.parentNode.replaceChild(replacement, old);
    }
}

function removeChildren$1(from) {
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
        from.textContent = '';
    }
}

function updateText$1(node, text, escape) {
    if (Array.isArray(node)) {
        var beforeChild = node[1],
            previousChild = beforeChild.previousSibling;

        if (previousChild === node[0]) {
            beforeChild.parentNode.insertBefore(document.createTextNode(text), beforeChild);
        } else {
            previousChild.nodeValue = text;
        }
    } else if (escape) {
        var firstChild = node.firstChild;

        firstChild ? firstChild.nodeValue = text : node.textContent = text;
    } else {
        node.innerHTML = text;
    }
}

function removeText$1(from) {
    if (Array.isArray(from)) {
        var child = from[0].nextSibling;

        child.parentNode.removeChild(child);
    } else {
        from.textContent = '';
    }
}

var domOps = {
    append: append,
    remove: remove,
    insertBefore: insertBefore,
    move: move,
    replace: replace$1,
    removeChildren: removeChildren$1,
    updateText: updateText$1,
    removeText: removeText$1
};

function isEventSupported(type) {
    var eventProp = 'on' + type;

    if (eventProp in document) {
        return true;
    }

    var domNode = document.createElement('div');

    domNode.setAttribute(eventProp, 'return;');
    if (typeof domNode[eventProp] === 'function') {
        return true;
    }

    return type === 'wheel' && document.implementation && document.implementation.hasFeature && document.implementation.hasFeature('', '') !== true && document.implementation.hasFeature('Events.wheel', '3.0');
}

function SyntheticEvent(type, nativeEvent) {
    this.type = type;
    this.target = nativeEvent.target;
    this.nativeEvent = nativeEvent;

    this._isPropagationStopped = false;
    this._isDefaultPrevented = false;
    this._isPersisted = false;
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

var ID_PROP = '__vidom__id__';
var counter = 1;

function getDomNodeId(node, onlyGet) {
    return node[ID_PROP] || (onlyGet ? null : node[ID_PROP] = counter++);
}

var SimpleMap = void 0;

if (typeof Map === 'undefined') {
    SimpleMap = function () {
        this._storage = {};
    };

    SimpleMap.prototype = {
        has: function (key) {
            return key in this._storage;
        },
        get: function (key) {
            return this._storage[key];
        },
        set: function (key, value) {
            this._storage[key] = value;
            return this;
        },
        delete: function (key) {
            return delete this._storage[key];
        },
        forEach: function (callback, thisArg) {
            var storage = this._storage;

            for (var key in storage) {
                callback.call(thisArg, storage[key], key, this);
            }
        }
    };
} else {
    SimpleMap = Map;
}

var SimpleMap$1 = SimpleMap;

var ua = typeof navigator === 'undefined' ? '' : navigator.userAgent;

var isTrident = ua.indexOf('Trident') > -1;
var isEdge = ua.indexOf('Edge') > -1;
var isIos = /iPad|iPhone|iPod/.test(ua) && typeof MSStream === 'undefined';

var MOUSE_NATIVE_EVENTS = ['click', 'mousedown', 'mousemove', 'mouseout', 'mouseover', 'mouseup'];
var BUBBLEABLE_NATIVE_EVENTS = ['blur', 'change', 'contextmenu', 'copy', 'cut', 'dblclick', 'drag', 'dragend', 'dragenter', 'dragleave', 'dragover', 'dragstart', 'drop', 'focus', 'input', 'keydown', 'keypress', 'keyup', 'paste', 'submit', 'touchcancel', 'touchend', 'touchmove', 'touchstart', 'wheel'];
var NON_BUBBLEABLE_NATIVE_EVENTS = ['canplay', 'canplaythrough', 'complete', 'durationchange', 'emptied', 'ended', 'error', 'load', 'loadeddata', 'loadedmetadata', 'loadstart', 'mouseenter', 'mouseleave', 'pause', 'play', 'playing', 'progress', 'ratechange', 'scroll', 'seeked', 'seeking', 'select', 'stalled', 'suspend', 'timeupdate', 'volumechange', 'waiting'];

if (isIos) {
    NON_BUBBLEABLE_NATIVE_EVENTS = [].concat(NON_BUBBLEABLE_NATIVE_EVENTS, MOUSE_NATIVE_EVENTS);
} else {
    BUBBLEABLE_NATIVE_EVENTS = [].concat(BUBBLEABLE_NATIVE_EVENTS, MOUSE_NATIVE_EVENTS);
}

var listenersStorage = new SimpleMap$1();
var eventsCfg = {};
var areListenersEnabled = true;

function globalEventListener(e) {
    var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : e.type;

    if (!areListenersEnabled) {
        return;
    }

    var target = e.target,
        listenersCount = eventsCfg[type].listenersCount,
        listeners = void 0,
        listener = void 0,
        domNodeId = void 0,
        syntheticEvent = void 0;


    while (listenersCount && target && target !== document) {
        // need to check target for detached dom
        if (domNodeId = getDomNodeId(target, true)) {
            listeners = listenersStorage.get(domNodeId);
            if (listeners && (listener = listeners[type])) {
                listener(syntheticEvent || (syntheticEvent = createSyntheticEvent(type, e)));
                if (! --listenersCount || syntheticEvent.isPropagationStopped()) {
                    return;
                }
            }
        }

        target = target.parentNode;
    }
}

function eventListener(e) {
    if (areListenersEnabled) {
        listenersStorage.get(getDomNodeId(e.currentTarget))[e.type](createSyntheticEvent(e.type, e));
    }
}

if (typeof document !== 'undefined') {
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
                listenersCount: 0,
                set: false,
                setup: focusEvents[type] ? isEventSupported(focusEvents[type]) ? function () {
                    var type = this.type;
                    document.addEventListener(focusEvents[type], function (e) {
                        globalEventListener(e, type);
                    });
                } : function () {
                    document.addEventListener(this.type, globalEventListener, true);
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
            cfg.setup ? cfg.setup() : cfg.bubbles && document.addEventListener(type, globalEventListener, false);
            cfg.set = true;
        }

        var domNodeId = getDomNodeId(domNode);
        var listeners = listenersStorage.get(domNodeId);

        if (!listeners) {
            listenersStorage.set(domNodeId, listeners = {});
        }

        if (!listeners[type]) {
            cfg.bubbles ? ++cfg.listenersCount : domNode.addEventListener(type, eventListener, false);
        }

        listeners[type] = listener;
    }
}

function doRemoveListener(domNode, type) {
    var cfg = eventsCfg[type];

    if (cfg) {
        if (cfg.bubbles) {
            --cfg.listenersCount;
        } else {
            domNode.removeEventListener(type, eventListener);
        }
    }
}

function removeListener(domNode, type) {
    var domNodeId = getDomNodeId(domNode, true);

    if (domNodeId) {
        var listeners = listenersStorage.get(domNodeId);

        if (listeners && listeners[type]) {
            listeners[type] = null;
            doRemoveListener(domNode, type);
        }
    }
}

function removeListeners(domNode) {
    var domNodeId = getDomNodeId(domNode, true);

    if (domNodeId) {
        var listeners = listenersStorage.get(domNodeId);

        if (listeners) {
            for (var type in listeners) {
                if (listeners[type]) {
                    doRemoveListener(domNode, type);
                }
            }

            listenersStorage.delete(domNodeId);
        }
    }
}

function disableListeners() {
    areListenersEnabled = false;
}

function enableListeners() {
    areListenersEnabled = true;
}

var DEFAULT_NS_URI = 'http://www.w3.org/1999/xhtml';

function getNs(domNode) {
    return Array.isArray(domNode) ? getParentNs(domNode) : domNode.namespaceURI === DEFAULT_NS_URI ? null : domNode.namespaceURI;
}

function getParentNs(domNode) {
    return getNs((Array.isArray(domNode) ? domNode[domNode.length - 1] : domNode).parentNode);
}

var ATTRS_TO_EVENTS = {
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
    onSelect: 'select',
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

function appendChild(parentNode, childNode) {
    var parentDomNode = parentNode.getDomNode();

    domOps.append(parentDomNode, childNode.renderToDom(getNs(parentDomNode)));
    childNode.mount();
}

function insertChild(childNode, beforeChildNode) {
    var beforeChildDomNode = beforeChildNode.getDomNode();

    domOps.insertBefore(childNode.renderToDom(getParentNs(beforeChildDomNode)), beforeChildDomNode);
    childNode.mount();
}

function removeChild(childNode) {
    var childDomNode = childNode.getDomNode();

    childNode.unmount();
    domOps.remove(childDomNode);
}

function moveChild(childNode, toChildNode, after) {
    var activeDomNode = document.activeElement;

    disableListeners();

    domOps.move(childNode.getDomNode(), toChildNode.getDomNode(), after);

    if (document.activeElement !== activeDomNode) {
        activeDomNode.focus();
    }

    enableListeners();
}

function removeChildren(parentNode) {
    var parentDomNode = parentNode.getDomNode(),
        childNodes = parentNode.children,
        len = childNodes.length;

    var j = 0;

    while (j < len) {
        childNodes[j++].unmount();
    }

    domOps.removeChildren(parentDomNode);
}

function replace(oldNode, newNode) {
    var oldDomNode = oldNode.getDomNode();

    oldNode.unmount();
    domOps.replace(oldDomNode, newNode.renderToDom(getParentNs(oldDomNode)));
    newNode.mount();
}

function updateAttr(node, attrName, attrVal) {
    var domNode = node.getDomNode();

    ATTRS_TO_EVENTS[attrName] ? addListener(domNode, ATTRS_TO_EVENTS[attrName], attrVal) : domAttrs(attrName).set(domNode, attrName, attrVal);
}

function removeAttr(node, attrName) {
    var domNode = node.getDomNode();

    ATTRS_TO_EVENTS[attrName] ? removeListener(domNode, ATTRS_TO_EVENTS[attrName]) : domAttrs(attrName).remove(domNode, attrName);
}

function updateText(node, text, escape) {
    domOps.updateText(node.getDomNode(), text, escape);
}

function removeText(node) {
    domOps.removeText(node.getDomNode());
}

var patchOps = {
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

function checkReuse(node, name) {
    if (node.getDomNode()) {
        throw Error("vidom: Detected unexpected attempt to reuse the same node \"" + name + "\".");
    }
}

var elementProtos = {};

function createElement(tag, ns) {
    var baseElement = void 0;

    if (ns) {
        var key = ns + ':' + tag;

        baseElement = elementProtos[key] || (elementProtos[key] = document.createElementNS(ns, tag));
    } else {
        baseElement = elementProtos[tag] || (elementProtos[tag] = tag === '!' ? document.createComment('') : document.createElement(tag));
    }

    return baseElement.cloneNode();
}

function patchChildren(nodeA, nodeB) {
    var childrenA = nodeA.children,
        childrenB = nodeB.children,
        childrenALen = childrenA.length,
        childrenBLen = childrenB.length;

    if (childrenALen === 1 && childrenBLen === 1) {
        childrenA[0].patch(childrenB[0]);
        return;
    }

    var leftIdxA = 0,
        rightIdxA = childrenALen - 1,
        leftChildA = childrenA[leftIdxA],
        leftChildAKey = leftChildA.key,
        rightChildA = childrenA[rightIdxA],
        rightChildAKey = rightChildA.key,
        leftIdxB = 0,
        rightIdxB = childrenBLen - 1,
        leftChildB = childrenB[leftIdxB],
        leftChildBKey = leftChildB.key,
        rightChildB = childrenB[rightIdxB],
        rightChildBKey = rightChildB.key,
        updateLeftIdxA = false,
        updateRightIdxA = false,
        updateLeftIdxB = false,
        updateRightIdxB = false,
        childrenAKeys = void 0,
        foundAChildIdx = void 0,
        foundAChild = void 0;
    var childrenAIndicesToSkip = {};

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
            patchOps.moveChild(leftChildA, rightChildA, true);
            leftChildA.patch(rightChildB);
            updateLeftIdxA = true;
            updateRightIdxB = true;
        } else if (rightChildAKey != null && rightChildAKey === leftChildBKey) {
            patchOps.moveChild(rightChildA, leftChildA, false);
            rightChildA.patch(leftChildB);
            updateRightIdxA = true;
            updateLeftIdxB = true;
        } else if (leftChildAKey != null && leftChildBKey == null) {
            patchOps.insertChild(leftChildB, leftChildA);
            updateLeftIdxB = true;
        } else if (leftChildAKey == null && leftChildBKey != null) {
            patchOps.removeChild(leftChildA);
            updateLeftIdxA = true;
        } else {
            childrenAKeys || (childrenAKeys = buildKeys(childrenA, leftIdxA, rightIdxA));
            if ((foundAChildIdx = childrenAKeys[leftChildBKey]) == null) {
                patchOps.insertChild(leftChildB, leftChildA);
            } else {
                foundAChild = childrenA[foundAChildIdx];
                childrenAIndicesToSkip[foundAChildIdx] = true;
                patchOps.moveChild(foundAChild, leftChildA, false);
                foundAChild.patch(leftChildB);
            }
            updateLeftIdxB = true;
        }

        if (updateLeftIdxA) {
            updateLeftIdxA = false;
            if (++leftIdxA <= rightIdxA) {
                leftChildA = childrenA[leftIdxA];
                leftChildAKey = leftChildA.key;
            }
        }

        if (updateRightIdxA) {
            updateRightIdxA = false;
            if (--rightIdxA >= leftIdxA) {
                rightChildA = childrenA[rightIdxA];
                rightChildAKey = rightChildA.key;
            }
        }

        if (updateLeftIdxB) {
            updateLeftIdxB = false;
            if (++leftIdxB <= rightIdxB) {
                leftChildB = childrenB[leftIdxB];
                leftChildBKey = leftChildB.key;
            }
        }

        if (updateRightIdxB) {
            updateRightIdxB = false;
            if (--rightIdxB >= leftIdxB) {
                rightChildB = childrenB[rightIdxB];
                rightChildBKey = rightChildB.key;
            }
        }
    }

    while (leftIdxA <= rightIdxA) {
        if (!childrenAIndicesToSkip[leftIdxA]) {
            patchOps.removeChild(childrenA[leftIdxA]);
        }
        ++leftIdxA;
    }

    while (leftIdxB <= rightIdxB) {
        rightIdxB < childrenBLen - 1 ? patchOps.insertChild(childrenB[leftIdxB], childrenB[rightIdxB + 1]) : patchOps.appendChild(nodeB, childrenB[leftIdxB]);
        ++leftIdxB;
    }
}

function buildKeys(children, idxFrom, idxTo) {
    var res = {};
    var child = void 0;

    while (idxFrom < idxTo) {
        child = children[idxFrom];
        child.key != null && (res[child.key] = idxFrom);
        ++idxFrom;
    }

    return res;
}

var obj = {};

if (IS_DEBUG) {
    Object.freeze(obj);
}

function noOp() {}

var globalConsole = typeof console == 'undefined' ? null : console;
var consoleWrapper = {};
var PREFIXES = {
    log: '',
    info: '',
    warn: 'Warning!',
    error: 'Error!'
};

['log', 'info', 'warn', 'error'].forEach(function (name) {
    consoleWrapper[name] = globalConsole ? globalConsole[name] ? function (arg1, arg2, arg3, arg4, arg5) {
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
    } : noOp;
});

function restrictObjProp(obj, prop) {
    var hiddenProp = "__" + prop + "__";

    Object.defineProperty(obj, prop, {
        get: function () {
            return obj[hiddenProp];
        },
        set: function (value) {
            if (obj.__isFrozen) {
                throw TypeError("vidom: " + prop + " is readonly");
            }

            obj[hiddenProp] = value;
        }
    });
}

var NODE_TYPE_TOP = 1;
var NODE_TYPE_TAG = 2;
var NODE_TYPE_TEXT = 3;
var NODE_TYPE_FRAGMENT = 4;
var NODE_TYPE_COMPONENT = 5;
var NODE_TYPE_FUNCTION_COMPONENT = 6;

var KEY_SET = 1;
var REF_SET = 2;

function setKey(key) {
    if (IS_DEBUG) {
        if (this._sets & KEY_SET) {
            console.warn('Key is already set and shouldn\'t be set again');
        }

        this.__isFrozen = false;
    }

    this.key = key;

    if (IS_DEBUG) {
        this._sets |= KEY_SET;
        this.__isFrozen = true;
    }

    return this;
}

function setRef(ref) {
    if (IS_DEBUG) {
        if (this._sets & REF_SET) {
            console.warn('Ref is already set and shouldn\'t be set again.');
        }
    }

    this._ref = ref;

    if (IS_DEBUG) {
        this._sets |= REF_SET;
    }

    return this;
}

var CHILDREN_SET$1 = 8;

function FragmentNode() {
    if (IS_DEBUG) {
        restrictObjProp(this, 'type');
        restrictObjProp(this, 'key');
        restrictObjProp(this, 'children');

        this.__isFrozen = false;
    }

    this.type = NODE_TYPE_FRAGMENT;
    this.key = null;
    this.children = null;

    if (IS_DEBUG) {
        this.__isFrozen = true;
        this._sets = 0;
    }

    this._domNode = null;
    this._ctx = obj;
}

FragmentNode.prototype = {
    getDomNode: function () {
        return this._domNode;
    },


    setKey: setKey,

    setChildren: function (children) {
        if (IS_DEBUG) {
            if (this._sets & CHILDREN_SET$1) {
                consoleWrapper.warn('Children are already set and shouldn\'t be set again.');
            }

            this.__isFrozen = false;
        }

        this.children = processChildren$1(children);

        if (IS_DEBUG) {
            if (Array.isArray(this.children)) {
                Object.freeze(this.children);
            }

            this._sets |= CHILDREN_SET$1;
            this.__isFrozen = true;
        }

        return this;
    },
    setCtx: function (ctx) {
        if (ctx !== obj) {
            this._ctx = ctx;

            var children = this.children;


            if (children) {
                var len = children.length;
                var i = 0;

                while (i < len) {
                    children[i++].setCtx(ctx);
                }
            }
        }

        return this;
    },
    renderToDom: function (parentNs) {
        if (IS_DEBUG) {
            checkReuse(this, 'fragment');
        }

        var children = this.children,
            domNode = [createElement('!'), createElement('!')],
            domFragment = document.createDocumentFragment();


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
        var children = this.children;

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
        if (IS_DEBUG) {
            checkReuse(this, 'fragment');
        }

        var domNode = [domNodes[domIdx++]],
            children = this.children;


        if (children) {
            var len = children.length;
            var i = 0;

            while (i < len) {
                domIdx = children[i++].adoptDom(domNodes, domIdx);
            }
        }

        domNode.push(domNodes[domIdx]);

        this._domNode = domNode;

        return domIdx + 1;
    },
    mount: function () {
        var children = this.children;


        if (children) {
            var i = 0;
            var len = children.length;

            while (i < len) {
                children[i++].mount();
            }
        }
    },
    unmount: function () {
        var children = this.children;


        if (children) {
            var len = children.length;
            var i = 0;

            while (i < len) {
                children[i++].unmount();
            }
        }
    },
    clone: function () {
        var res = new FragmentNode();

        if (IS_DEBUG) {
            res.__isFrozen = false;
        }

        res.key = this.key;
        res.children = this.children;

        if (IS_DEBUG) {
            res.__isFrozen = true;
        }

        res._ctx = this._ctx;

        return res;
    },
    patch: function (node) {
        if (this === node) {
            this._patchChildren(node);
        } else if (this.type === node.type) {
            node._domNode = this._domNode;
            this._patchChildren(node);
        } else {
            patchOps.replace(this, node);
        }
    },
    _patchChildren: function (node) {
        var childrenA = this.children,
            childrenB = node.children;

        if (!childrenA && !childrenB) {
            return;
        }

        if (!childrenB || !childrenB.length) {
            if (childrenA && childrenA.length) {
                patchOps.removeChildren(this);
            }

            return;
        }

        if (!childrenA || !childrenA.length) {
            var childrenBLen = childrenB.length;
            var iB = 0;

            while (iB < childrenBLen) {
                patchOps.appendChild(node, childrenB[iB++]);
            }

            return;
        }

        patchChildren(this, node);
    }
};

if (IS_DEBUG) {
    FragmentNode.prototype.setRef = function () {
        throw Error('vidom: Fragment nodes don\'t support refs.');
    };
}

function processChildren$1(children) {
    if (children == null) {
        return null;
    }

    var res = Array.isArray(children) ? children : [children];

    if (IS_DEBUG) {
        checkChildren(res);
    }

    return res;
}

function merge(source1, source2) {
    var res = {};

    for (var key in source1) {
        res[key] = source1[key];
    }

    for (var _key in source2) {
        res[_key] = source2[_key];
    }

    return res;
}

var ATTRS_SET$1 = 4;
var CHILDREN_SET$2 = 8;

function FunctionComponentNode(component) {
    if (IS_DEBUG) {
        restrictObjProp(this, 'type');
        restrictObjProp(this, 'key');
        restrictObjProp(this, 'attrs');
        restrictObjProp(this, 'children');

        this.__isFrozen = false;
    }

    this.type = NODE_TYPE_FUNCTION_COMPONENT;
    this.key = null;
    this.attrs = obj;
    this.children = null;

    if (IS_DEBUG) {
        this.__isFrozen = true;
        this._sets = 0;
    }

    this._component = component;
    this._rootNode = null;
    this._ctx = obj;
}

FunctionComponentNode.prototype = {
    getDomNode: function () {
        return this._rootNode && this._rootNode.getDomNode();
    },


    setKey: setKey,

    setAttrs: function (attrs) {
        if (IS_DEBUG) {
            if (this._sets & ATTRS_SET$1) {
                consoleWrapper.warn('Attrs are already set and shouldn\'t be set again.');
            }

            this.__isFrozen = false;
        }

        this.attrs = this.attrs === obj ? attrs : merge(this.attrs, attrs);

        if (IS_DEBUG) {
            Object.freeze(this.attrs);
            this._sets |= ATTRS_SET$1;
            this.__isFrozen = true;
        }

        return this;
    },
    setChildren: function (children) {
        if (IS_DEBUG) {
            if (this._sets & CHILDREN_SET$2) {
                consoleWrapper.warn('Children are already set and shouldn\'t be set again.');
            }

            this.__isFrozen = false;
        }

        this.children = children;

        if (IS_DEBUG) {
            this._sets |= CHILDREN_SET$2;
            this.__isFrozen = true;
        }

        return this;
    },
    setCtx: function (ctx) {
        this._ctx = ctx;
        return this;
    },
    renderToDom: function (parentNs) {
        if (IS_DEBUG) {
            checkReuse(this, this._component.name || 'Anonymous');
        }

        return this._getRootNode().renderToDom(parentNs);
    },
    renderToString: function () {
        return this._getRootNode().renderToString();
    },
    adoptDom: function (domNode, domIdx) {
        if (IS_DEBUG) {
            checkReuse(this, this._component.name || 'Anonymous');
        }

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
    clone: function () {
        var res = new FunctionComponentNode(this._component);

        if (IS_DEBUG) {
            res.__isFrozen = false;
        }

        res.key = this.key;
        res.attrs = this.attrs;
        res.children = this.children;

        if (IS_DEBUG) {
            res.__isFrozen = true;
        }

        res._ctx = this._ctx;

        return res;
    },
    patch: function (node) {
        if (this === node) {
            var prevRootNode = this._getRootNode();

            this._rootNode = null;
            prevRootNode.patch(this._getRootNode());
        } else if (this.type === node.type && this._component === node._component) {
            this._getRootNode().patch(node._getRootNode());
            this._rootNode = null;
        } else {
            patchOps.replace(this, node);
            this._rootNode = null;
        }
    },
    _getRootNode: function () {
        if (this._rootNode) {
            return this._rootNode;
        }

        var rootNode = this._component(this.attrs, this.children, this._ctx) || createNode('!');

        if (IS_DEBUG) {
            if (typeof rootNode !== 'object' || Array.isArray(rootNode)) {
                throw Error('vidom: Function component must return a single node on the top level.');
            }
        }

        rootNode.setCtx(this._ctx);

        return this._rootNode = rootNode;
    }
};

if (IS_DEBUG) {
    FunctionComponentNode.prototype.setRef = function () {
        throw Error('vidom: Function component nodes don\'t support refs.');
    };
}

var CHILDREN_SET$3 = 8;

function TextNode() {
    if (IS_DEBUG) {
        restrictObjProp(this, 'type');
        restrictObjProp(this, 'key');
        restrictObjProp(this, 'children');

        this.__isFrozen = false;
    }

    this.type = NODE_TYPE_TEXT;
    this.key = null;
    this.children = null;

    if (IS_DEBUG) {
        this.__isFrozen = true;
    }

    this._domNode = null;
}

TextNode.prototype = {
    getDomNode: function () {
        return this._domNode;
    },


    setKey: setKey,

    setChildren: function (children) {
        if (IS_DEBUG) {
            if (this._sets & CHILDREN_SET$3) {
                console.warn('Children are already set and shouldn\'t be set again.');
            }

            this.__isFrozen = false;
        }

        this.children = processChildren$2(children);

        if (IS_DEBUG) {
            this._sets |= CHILDREN_SET$3;
            this.__isFrozen = true;
        }

        return this;
    },
    setCtx: function () {
        return this;
    },
    renderToDom: function () {
        if (IS_DEBUG) {
            checkReuse(this, 'text');
        }

        var domFragment = document.createDocumentFragment(),
            domNode = [createElement('!'), createElement('!')],
            children = this.children;


        domFragment.appendChild(domNode[0]);

        if (children) {
            domFragment.appendChild(document.createTextNode(children));
        }

        domFragment.appendChild(domNode[1]);

        this._domNode = domNode;

        return domFragment;
    },
    renderToString: function () {
        return '<!---->' + (this.children || '') + '<!---->';
    },
    adoptDom: function (domNodes, domIdx) {
        if (IS_DEBUG) {
            checkReuse(this, 'text');
        }

        var domNode = [domNodes[domIdx++]];

        if (this.children) {
            domIdx++;
        }

        domNode.push(domNodes[domIdx++]);

        this._domNode = domNode;

        return domIdx;
    },


    mount: noOp,

    unmount: noOp,

    clone: function () {
        var res = new TextNode();

        if (IS_DEBUG) {
            res.__isFrozen = false;
        }

        res.key = this.key;
        res.children = this.children;

        if (IS_DEBUG) {
            res.__isFrozen = true;
        }

        return res;
    },
    patch: function (node) {
        if (this !== node) {
            if (this.type === node.type) {
                node._domNode = this._domNode;
                this._patchChildren(node);
            } else {
                patchOps.replace(this, node);
            }
        }
    },
    _patchChildren: function (node) {
        var childrenA = this.children,
            childrenB = node.children;

        if (childrenA !== childrenB) {
            if (childrenB) {
                patchOps.updateText(this, childrenB, false);
            } else if (childrenA) {
                patchOps.removeText(this);
            }
        }
    }
};

if (IS_DEBUG) {
    TextNode.prototype.setRef = function () {
        throw Error('vidom: Text nodes don\'t support refs.');
    };
}

function processChildren$2(children) {
    return children == null || typeof children === 'string' ? children : children.toString();
}

var raf = typeof window !== 'undefined' && (window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame) || function (callback) {
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

function rafBatch(fn) {
    batch.push(fn) === 1 && raf(applyBatch);
}

function Emitter() {
    this._listeners = {};
}

Emitter.prototype = {
    on: function (event, fn) {
        var fnCtx = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

        (this._listeners[event] || (this._listeners[event] = [])).push({ fn: fn, fnCtx: fnCtx });

        return this;
    },
    off: function (event, fn) {
        var fnCtx = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

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
                var _eventListeners = eventListeners[i++],
                    fn = _eventListeners.fn,
                    fnCtx = _eventListeners.fnCtx;

                fn.call.apply(fn, [fnCtx].concat(args));
            }
        }

        return this;
    }
};

function TopNode(childNode) {
    this.type = NODE_TYPE_TOP;
    this._childNode = childNode;
    this._ns = null;
}

TopNode.prototype = {
    getDomNode: function () {
        return this._childNode.getDomNode();
    },
    setNs: function (ns) {
        if (ns) {
            this._ns = ns;
        }

        return this;
    },
    setCtx: function (ctx) {
        if (ctx) {
            this._childNode.setCtx(ctx);
        }

        return this;
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

var mountedNodes = new SimpleMap$1();
var counter$1 = 0;

function mountToDomNode(domNode, node, ctx, cb, syncMode) {
    if (IS_DEBUG) {
        if (!isNode(node)) {
            throw TypeError('vidom: Unexpected type of node is passed to mount.');
        }
    }

    var domNodeId = getDomNodeId(domNode);
    var mounted = mountedNodes.get(domNodeId),
        mountId = void 0;

    if (mounted && mounted.tree) {
        mountId = ++mounted.id;
        var patchFn = function () {
            mounted = mountedNodes.get(domNodeId);
            if (mounted && mounted.id === mountId) {
                var prevTree = mounted.tree,
                    newTree = new TopNode(node);

                newTree.setNs(prevTree._ns).setCtx(ctx);

                prevTree.patch(newTree);
                mounted.tree = newTree;

                callCb(cb);
                if (IS_DEBUG) {
                    hook.emit('replace', prevTree, newTree);
                }
            }
        };

        syncMode ? patchFn() : rafBatch(patchFn);
    } else {
        mountedNodes.set(domNodeId, mounted = { tree: null, id: mountId = ++counter$1 });

        if (domNode.childNodes.length) {
            var topDomChildNodes = collectTopDomChildNodes(domNode);

            if (topDomChildNodes) {
                var tree = mounted.tree = new TopNode(node);

                tree.setNs(getNs(domNode)).setCtx(ctx);

                tree.adoptDom(topDomChildNodes);
                tree.mount();
                callCb(cb);

                if (IS_DEBUG) {
                    hook.emit('mount', tree);
                }

                return;
            } else {
                domNode.textContent = '';
            }
        }

        var renderFn = function () {
            var mounted = mountedNodes.get(domNodeId);

            if (mounted && mounted.id === mountId) {
                var _tree = mounted.tree = new TopNode(node);

                _tree.setNs(getNs(domNode)).setCtx(ctx);

                domOps.append(domNode, _tree.renderToDom());
                _tree.mount();
                callCb(cb);
                if (IS_DEBUG) {
                    hook.emit('mount', _tree);
                }
            }
        };

        syncMode ? renderFn() : rafBatch(renderFn);
    }
}

function unmountFromDomNode(domNode, cb, syncMode) {
    var domNodeId = getDomNodeId(domNode);
    var mounted = mountedNodes.get(domNodeId);

    if (mounted) {
        (function () {
            var mountId = ++mounted.id,
                unmountFn = function () {
                mounted = mountedNodes.get(domNodeId);
                if (mounted && mounted.id === mountId) {
                    mountedNodes.delete(domNodeId);
                    var tree = mounted.tree;

                    if (tree) {
                        var treeDomNode = tree.getDomNode();

                        tree.unmount();
                        domOps.remove(treeDomNode);
                    }

                    callCb(cb);
                    if (IS_DEBUG) {
                        tree && hook.emit('unmount', tree);
                    }
                }
            };

            mounted.tree ? syncMode ? unmountFn() : rafBatch(unmountFn) : syncMode || callCb(cb);
        })();
    } else if (!syncMode) {
        callCb(cb);
    }
}

function callCb(cb) {
    cb && cb();
}

function collectTopDomChildNodes(node) {
    var childNodes = node.childNodes,
        len = childNodes.length;
    var i = 0,
        res = void 0,
        childNode = void 0;

    while (i < len) {
        childNode = childNodes[i++];

        if (res) {
            res.push(childNode);
        } else if (childNode.nodeType === Node.COMMENT_NODE && childNode.textContent === 'vidom') {
            res = [];
        }
    }

    return res;
}

function mount(domNode, tree, ctx, cb) {
    if (typeof ctx === 'function') {
        cb = ctx;
        ctx = this;
    }

    mountToDomNode(domNode, tree, ctx, cb, false);
}

function mountSync(domNode, tree, ctx) {
    mountToDomNode(domNode, tree, ctx, null, true);
}

function unmount(domNode, cb) {
    unmountFromDomNode(domNode, cb, false);
}

function unmountSync(domNode) {
    unmountFromDomNode(domNode, null, true);
}

function getMountedRootNodes() {
    var res = [];

    mountedNodes.forEach(function (_ref) {
        var tree = _ref.tree;

        if (tree) {
            res.push(tree);
        }
    });

    return res;
}

var hook = new Emitter();

hook.getRootNodes = getMountedRootNodes;

if (IS_DEBUG) {
    if (typeof window !== 'undefined') {
        window['__vidom__hook__'] = hook;
    }
}

function mountComponent() {
    this.__isMounted = true;
    this.onMount();
}

function unmountComponent() {
    this.__isMounted = false;
    this.onUnmount();
}

function patchComponent(nextAttrs, nextChildren, nextContext) {
    if (!this.isMounted()) {
        return;
    }

    nextAttrs = this.__buildAttrs(nextAttrs);

    var prevAttrs = this.attrs,
        prevChildren = this.children;

    if (prevAttrs !== nextAttrs || prevChildren !== nextChildren) {
        var isUpdating = this.__isUpdating;

        this.__isUpdating = true;

        if (prevAttrs !== nextAttrs) {
            if (IS_DEBUG) {
                this.__isFrozen = false;
            }

            this.attrs = nextAttrs;

            if (IS_DEBUG) {
                this.__isFrozen = true;
            }

            this.onAttrsChange(prevAttrs);
        }

        if (prevChildren !== nextChildren) {
            if (IS_DEBUG) {
                this.__isFrozen = false;
            }

            this.children = nextChildren;

            if (IS_DEBUG) {
                this.__isFrozen = true;
            }

            this.onChildrenChange(prevChildren);
        }

        this.__isUpdating = isUpdating;
    }

    if (this.context !== nextContext) {
        if (IS_DEBUG) {
            this.__isFrozen = false;
        }

        this.context = nextContext;

        if (IS_DEBUG) {
            Object.freeze(this.context);
            this.__isFrozen = true;
        }
    }

    if (this.__isUpdating) {
        return;
    }

    var shouldUpdate = this.shouldUpdate(prevAttrs, prevChildren, this.__prevState);

    if (IS_DEBUG) {
        var shouldUpdateResType = typeof shouldUpdate;

        if (shouldUpdateResType !== 'boolean') {
            consoleWrapper.warn('Component#shouldUpdate() should return boolean instead of ' + shouldUpdateResType);
        }
    }

    if (shouldUpdate) {
        var prevRootNode = this.__rootNode;

        this.__rootNode = this.render();
        prevRootNode.patch(this.__rootNode);
        this.onUpdate(prevAttrs, prevChildren, this.__prevState);
    }
}

function shouldComponentUpdate() {
    return true;
}

function renderComponentToDom(parentNs) {
    return this.__rootNode.renderToDom(parentNs);
}

function renderComponentToString() {
    return this.__rootNode.renderToString();
}

function adoptComponentDom(domNode, domIdx) {
    return this.__rootNode.adoptDom(domNode, domIdx);
}

function getComponentDomNode() {
    return this.__rootNode.getDomNode();
}

function requestChildContext() {
    return obj;
}

function setComponentState(state) {
    var nextState = void 0;

    if (this.__rootNode) {
        // was inited
        this.update(this.state === this.__prevState ? updateComponentPrevState : null);
        nextState = merge(this.state, state);
    } else {
        nextState = state === obj ? state : merge(this.state, state);
    }

    if (IS_DEBUG) {
        this.__isFrozen = false;
    }

    this.state = nextState;

    if (IS_DEBUG) {
        Object.freeze(this.state);
        this.__isFrozen = true;
    }
}

function updateComponentPrevState() {
    this.__prevState = this.state;
}

function renderComponent() {
    var rootNode = this.onRender() || createNode('!');

    if (IS_DEBUG) {
        if (typeof rootNode !== 'object' || Array.isArray(rootNode)) {
            throw TypeError('vidom: Component#onRender must return a single node on the top level.');
        }
    }

    var childCtx = this.onChildContextRequest(),
        rootNodeCtx = childCtx === obj ? this.context : this.context === obj ? childCtx : merge(this.context, childCtx);

    if (IS_DEBUG) {
        Object.freeze(rootNodeCtx);
    }

    rootNode.setCtx(rootNodeCtx);

    return rootNode;
}

function updateComponent(cb) {
    var _this = this;

    if (this.__isUpdating) {
        cb && rafBatch(function () {
            return cb.call(_this);
        });
    } else {
        this.__isUpdating = true;
        rafBatch(function () {
            if (_this.isMounted()) {
                _this.__isUpdating = false;
                var prevRootNode = _this.__rootNode;

                _this.patch(_this.attrs, _this.children, _this.context);
                cb && cb.call(_this);
                if (IS_DEBUG) {
                    hook.emit('replace', prevRootNode, _this.__rootNode);
                }
            }
        });
    }
}

function getComponentRootNode() {
    return this.__rootNode;
}

function isComponentMounted() {
    return this.__isMounted;
}

function onComponentRefRequest() {
    return this;
}

function buildComponentAttrs(attrs) {
    if (attrs === this.attrs) {
        return attrs;
    }

    var defaultAttrs = this.constructor.defaultAttrs,
        resAttrs = attrs === obj ? defaultAttrs || attrs : defaultAttrs ? merge(defaultAttrs, attrs) : attrs;


    if (IS_DEBUG) {
        Object.freeze(resAttrs);
    }

    return resAttrs;
}

function createComponent(props, staticProps) {
    var res = function (attrs, children, ctx) {
        if (IS_DEBUG) {
            restrictObjProp(this, 'attrs');
            restrictObjProp(this, 'children');
            restrictObjProp(this, 'state');
            restrictObjProp(this, 'context');

            this.__isFrozen = false;
        }

        this.attrs = this.__buildAttrs(attrs);
        this.children = children;
        this.state = obj;
        this.context = ctx;

        if (IS_DEBUG) {
            this.__isFrozen = true;
        }

        this.__isMounted = false;
        this.__isUpdating = false;

        this.onInit();

        this.__prevState = this.state;
        this.__rootNode = this.render();
    },
        ptp = {
        constructor: res,
        onInit: noOp,
        mount: mountComponent,
        unmount: unmountComponent,
        onMount: noOp,
        onUnmount: noOp,
        onAttrsChange: noOp,
        onChildrenChange: noOp,
        shouldUpdate: shouldComponentUpdate,
        onUpdate: noOp,
        isMounted: isComponentMounted,
        setState: setComponentState,
        renderToDom: renderComponentToDom,
        renderToString: renderComponentToString,
        adoptDom: adoptComponentDom,
        getDomNode: getComponentDomNode,
        getRootNode: getComponentRootNode,
        render: renderComponent,
        onRender: noOp,
        update: updateComponent,
        patch: patchComponent,
        onChildContextRequest: requestChildContext,
        onRefRequest: onComponentRefRequest,
        __buildAttrs: buildComponentAttrs
    };

    for (var i in props) {
        ptp[i] = props[i];
    }

    res.prototype = ptp;

    for (var _i in staticProps) {
        res[_i] = staticProps[_i];
    }

    res['__vidom__component__'] = true;

    return res;
}

var Input = createComponent({
    onInit: function () {
        var _this = this;

        this._addAttrs = {
            onChange: null,
            onInput: function (e) {
                _this.onInput(e);
            }
        };
    },
    onRender: function () {
        return new TagNode('input').setAttrs(merge(this.attrs, this._addAttrs));
    },
    onInput: function (e) {
        var onChange = this.attrs.onChange;


        onChange && onChange(e);

        applyBatch();

        if (this.isMounted()) {
            var control = this.getDomNode(),
                value = this.attrs.value; // attrs could be changed during applyBatch()

            if (typeof value !== 'undefined' && control.value !== value) {
                control.value = value;
            }
        }
    },
    onRefRequest: function () {
        return this.getDomNode();
    }
});

var namedRadioInputs = new SimpleMap$1();

var Radio = createComponent({
    onInit: function () {
        var _this = this;

        this._addAttrs = {
            onChange: function (e) {
                _this.onChange(e);
            }
        };
    },
    onRender: function () {
        return new TagNode('input').setAttrs(merge(this.attrs, this._addAttrs));
    },
    onMount: function () {
        var name = this.attrs.name;


        if (name) {
            addToNamedRadioInputs(name, this);
        }
    },
    onUpdate: function (_ref) {
        var prevName = _ref.name;
        var name = this.attrs.name;


        if (name !== prevName) {
            if (prevName) {
                removeFromNamedRadioInputs(prevName, this);
            }

            if (name) {
                addToNamedRadioInputs(name, this);
            }
        }
    },
    onUnmount: function () {
        var name = this.attrs.name;


        if (name) {
            removeFromNamedRadioInputs(name, this);
        }
    },
    onChange: function (e) {
        var onChange = this.attrs.onChange;


        onChange && onChange(e);

        applyBatch();

        if (this.isMounted()) {
            var control = this.getDomNode(),
                _attrs = this.attrs,
                name = _attrs.name,
                checked = _attrs.checked; // attrs could be changed during applyBatch()

            if (typeof checked !== 'undefined' && control.checked !== checked) {
                if (name) {
                    var radioInputs = namedRadioInputs.get(name),
                        len = radioInputs.length;
                    var i = 0,
                        radioInput = void 0,
                        _checked = void 0;

                    while (i < len) {
                        radioInput = radioInputs[i++];
                        _checked = radioInput.attrs.checked;

                        if (typeof _checked !== 'undefined') {
                            var radioControl = radioInput.getDomNode();

                            if (_checked !== radioControl.checked) {
                                radioControl.checked = _checked;
                            }
                        }
                    }
                } else {
                    control.checked = checked;
                }
            }
        }
    },
    onRefRequest: function () {
        return this.getDomNode();
    }
});

function addToNamedRadioInputs(name, input) {
    var radioInputs = namedRadioInputs.get(name);

    if (radioInputs) {
        radioInputs.push(input);
    } else {
        namedRadioInputs.set(name, [input]);
    }
}

function removeFromNamedRadioInputs(name, input) {
    var radioInputs = namedRadioInputs.get(name),
        len = radioInputs.length;
    var i = 0;

    while (i < len) {
        if (radioInputs[i] === input) {
            if (len === 1) {
                namedRadioInputs.delete(name);
            } else {
                radioInputs.splice(i, 1);
            }

            return;
        }

        i++;
    }
}

var CheckBox = createComponent({
    onInit: function () {
        var _this = this;

        this._addAttrs = {
            onChange: function (e) {
                _this.onChange(e);
            }
        };
    },
    onRender: function () {
        return new TagNode('input').setAttrs(merge(this.attrs, this._addAttrs));
    },
    onChange: function (e) {
        var onChange = this.attrs.onChange;


        onChange && onChange(e);

        applyBatch();

        if (this.isMounted()) {
            var control = this.getDomNode(),
                checked = this.attrs.checked; // attrs could be changed during applyBatch()

            if (typeof checked !== 'undefined' && control.checked !== checked) {
                control.checked = checked;
            }
        }
    },
    onRefRequest: function () {
        return this.getDomNode();
    }
});

var File = createComponent({
    onRender: function () {
        return new TagNode('input').setAttrs(this.attrs);
    },
    onRefRequest: function () {
        return this.getDomNode();
    }
});

var ATTRS_SET$2 = 4;
var CHILDREN_SET$4 = 8;

function ComponentNode(component) {
    if (IS_DEBUG) {
        restrictObjProp(this, 'type');
        restrictObjProp(this, 'key');
        restrictObjProp(this, 'attrs');
        restrictObjProp(this, 'children');

        this.__isFrozen = false;
    }

    this.type = NODE_TYPE_COMPONENT;
    this.key = null;
    this.attrs = obj;
    this.children = null;

    if (IS_DEBUG) {
        this.__isFrozen = true;
        this._sets = 0;
    }

    this._component = component;
    this._instance = null;
    this._ctx = obj;
    this._ref = null;
}

ComponentNode.prototype = {
    getDomNode: function () {
        return this._instance && this._instance.getDomNode();
    },


    setKey: setKey,

    setRef: setRef,

    setAttrs: function (attrs) {
        if (IS_DEBUG) {
            if (this._sets & ATTRS_SET$2) {
                console.warn('Attrs are already set and shouldn\'t be set again.');
            }

            this.__isFrozen = false;
        }

        this.attrs = this.attrs === obj ? attrs : merge(this.attrs, attrs);

        if (IS_DEBUG) {
            Object.freeze(this.attrs);
            this._sets |= ATTRS_SET$2;
            this.__isFrozen = true;
        }

        if (this._component === Input) {
            switch (this.attrs.type) {
                case 'radio':
                    this._component = Radio;
                    break;

                case 'checkbox':
                    this._component = CheckBox;
                    break;

                case 'file':
                    this._component = File;
                    break;
            }
        }

        return this;
    },
    setChildren: function (children) {
        if (IS_DEBUG) {
            if (this._sets & CHILDREN_SET$4) {
                console.warn('Children are already set and shouldn\'t be set again.');
            }

            this.__isFrozen = false;
        }

        this.children = children;

        if (IS_DEBUG) {
            this._sets |= CHILDREN_SET$4;
            this.__isFrozen = true;
        }

        return this;
    },
    setCtx: function (ctx) {
        this._ctx = ctx;
        return this;
    },
    renderToDom: function (parentNs) {
        if (IS_DEBUG) {
            checkReuse(this, this._component.name || 'Anonymous');
        }

        return this._getInstance().renderToDom(parentNs);
    },
    renderToString: function () {
        return this._getInstance().renderToString();
    },
    adoptDom: function (domNode, domIdx) {
        if (IS_DEBUG) {
            checkReuse(this, this._component.name || 'Anonymous');
        }

        return this._getInstance().adoptDom(domNode, domIdx);
    },
    mount: function () {
        this._instance.getRootNode().mount();
        this._instance.mount();
        this._ref && this._ref(this._instance.onRefRequest());
    },
    unmount: function () {
        if (this._instance) {
            this._instance.getRootNode().unmount();
            this._instance.unmount();
            this._instance = null;
            this._ref && this._ref(null);
        }
    },
    clone: function () {
        var res = new ComponentNode(this._component);

        if (IS_DEBUG) {
            res.__isFrozen = false;
        }

        res.key = this.key;
        res.attrs = this.attrs;
        res.children = this.children;

        if (IS_DEBUG) {
            res.__isFrozen = true;
        }

        res._ctx = this._ctx;
        res._ref = this._ref;

        return res;
    },
    patch: function (node) {
        var instance = this._getInstance();

        if (this === node) {
            instance.patch(node.attrs, node.children, node._ctx);
        } else if (this.type === node.type && this._component === node._component) {
            instance.patch(node.attrs, node.children, node._ctx);
            node._instance = instance;
            this._patchRef(node);
        } else {
            patchOps.replace(this, node);
            this._instance = null;
        }
    },
    _patchRef: function (node) {
        if (this._ref) {
            if (this._ref !== node._ref) {
                this._ref(null);

                if (node._ref) {
                    node._ref(node._instance.onRefRequest());
                }
            }
        } else if (node._ref) {
            node._ref(node._instance.onRefRequest());
        }
    },
    _getInstance: function () {
        return this._instance || (this._instance = new this._component(this.attrs, this.children, this._ctx));
    }
};

function isNode(obj) {
    return obj instanceof ComponentNode || obj instanceof FragmentNode || obj instanceof FunctionComponentNode || obj instanceof TagNode || obj instanceof TextNode;
}

function checkChildren(children) {
    var keys = {},
        len = children.length;

    var i = 0,
        child = void 0;

    while (i < len) {
        child = children[i++];

        if (!isNode(child)) {
            throw TypeError('vidom: Unexpected type of child. Only a node is expected to be here.');
        }

        if (child.key != null) {
            if (child.key in keys) {
                throw Error('vidom: Childrens\' keys must be unique across the children. ' + ('Found duplicate of "' + child._key + '" key.'));
            } else {
                keys[child.key] = true;
            }
        }
    }
}

var AMP_RE$1 = /&/g;
var LT_RE = /</g;
var GT_RE = />/g;

function escapeHtml(str) {
    str = str + '';

    var i = str.length,
        escapes = 0; // 1 — escape '&', 2 — escape '<', 4 — escape '>'

    while (i--) {
        switch (str[i]) {
            case '&':
                escapes |= 1;
                break;

            case '<':
                escapes |= 2;
                break;

            case '>':
                escapes |= 4;
                break;
        }
    }

    if (escapes & 1) {
        str = str.replace(AMP_RE$1, '&amp;');
    }

    if (escapes & 2) {
        str = str.replace(LT_RE, '&lt;');
    }

    if (escapes & 4) {
        str = str.replace(GT_RE, '&gt;');
    }

    return str;
}

var TOP_LEVEL_NS_TAGS = {
    'http://www.w3.org/2000/svg': 'svg',
    'http://www.w3.org/1998/Math/MathML': 'math'
};
var parentTags = {
    thead: 'table',
    tbody: 'table',
    tfoot: 'table',
    tr: 'tbody',
    td: 'tr'
};
var helperDomNodes = {};

function createElementByHtml(html, tag, ns) {
    var parentTag = parentTags[tag] || 'div',
        helperDomNode = helperDomNodes[parentTag] || (helperDomNodes[parentTag] = document.createElement(parentTag));

    if (!ns || !TOP_LEVEL_NS_TAGS[ns] || TOP_LEVEL_NS_TAGS[ns] === tag) {
        helperDomNode.innerHTML = html;
        return helperDomNode.removeChild(helperDomNode.firstChild);
    }

    var topLevelTag = TOP_LEVEL_NS_TAGS[ns];
    helperDomNode.innerHTML = '<' + topLevelTag + ' xmlns="' + ns + '">' + html + '</' + topLevelTag + '>';
    return helperDomNode.removeChild(helperDomNode.firstChild).firstChild;
}

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
};
var USE_DOM_STRINGS = isTrident || isEdge;
var ATTRS_SET = 4;
var CHILDREN_SET = 8;
var NS_SET = 16;

function TagNode(tag) {
    if (IS_DEBUG) {
        restrictObjProp(this, 'type');
        restrictObjProp(this, 'tag');
        restrictObjProp(this, 'key');
        restrictObjProp(this, 'attrs');
        restrictObjProp(this, 'children');

        this.__isFrozen = false;
    }

    this.type = NODE_TYPE_TAG;
    this.tag = tag;
    this.key = null;
    this.attrs = obj;
    this.children = null;

    if (IS_DEBUG) {
        this.__isFrozen = true;
        this._sets = 0;
    }

    this._domNode = null;
    this._ns = null;
    this._escapeChildren = true;
    this._ctx = obj;
    this._ref = null;
}

TagNode.prototype = {
    getDomNode: function () {
        return this._domNode;
    },


    setKey: setKey,

    setRef: setRef,

    setNs: function (ns) {
        if (IS_DEBUG) {
            if (this._sets & NS_SET) {
                consoleWrapper.warn('Namespace is already set and shouldn\'t be set again.');
            }
        }

        this._ns = ns;

        if (IS_DEBUG) {
            this._sets |= NS_SET;
        }

        return this;
    },
    setAttrs: function (attrs) {
        if (IS_DEBUG) {
            if (this._sets & ATTRS_SET) {
                consoleWrapper.warn('Attrs are already set and shouldn\'t be set again.');
            }

            checkAttrs(attrs);
            this.__isFrozen = false;
        }

        this.attrs = this.attrs === obj ? attrs : merge(this.attrs, attrs);

        if (IS_DEBUG) {
            Object.freeze(this.attrs);
            this._sets |= ATTRS_SET;
            this.__isFrozen = true;
        }

        return this;
    },
    setChildren: function (children) {
        if (IS_DEBUG) {
            if (this._sets & CHILDREN_SET) {
                consoleWrapper.warn('Children are already set and shouldn\'t be set again.');
            }

            this.__isFrozen = false;
        }

        this.children = processChildren(children);

        if (IS_DEBUG) {
            if (Array.isArray(this.children)) {
                Object.freeze(this.children);
            }

            this._sets |= CHILDREN_SET;
            this.__isFrozen = true;
        }

        return this;
    },
    setHtml: function (html) {
        if (IS_DEBUG) {
            if (this._sets & CHILDREN_SET) {
                consoleWrapper.warn('Children are already set and shouldn\'t be set again.');
            }

            this.__isFrozen = false;
        }

        this.children = html;

        if (IS_DEBUG) {
            this._sets |= CHILDREN_SET;
            this.__isFrozen = true;
        }

        this._escapeChildren = false;
        return this;
    },
    setCtx: function (ctx) {
        if (ctx !== obj) {
            this._ctx = ctx;

            var children = this.children;


            if (children && typeof children !== 'string') {
                var len = children.length;
                var i = 0;

                while (i < len) {
                    children[i++].setCtx(ctx);
                }
            }
        }

        return this;
    },
    renderToDom: function (parentNs) {
        if (IS_DEBUG) {
            checkReuse(this, this.tag);
        }

        var tag = this.tag,
            children = this.children,
            ns = this._ns || parentNs;


        if (USE_DOM_STRINGS && children && typeof children !== 'string') {
            var _domNode = createElementByHtml(this.renderToString(), tag, ns);
            this.adoptDom([_domNode], 0);
            return _domNode;
        }

        var domNode = this._domNode = createElement(tag, ns),
            attrs = this.attrs;


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

        if (attrs !== obj) {
            var name = void 0,
                value = void 0;
            for (name in attrs) {
                if ((value = attrs[name]) != null) {
                    if (ATTRS_TO_EVENTS[name]) {
                        addListener(domNode, ATTRS_TO_EVENTS[name], value);
                    } else {
                        domAttrs(name).set(domNode, name, value);
                    }
                }
            }
        }

        return domNode;
    },
    renderToString: function () {
        var tag = this.tag;


        if (tag === '!') {
            return '<!---->';
        }

        var ns = this._ns,
            attrs = this.attrs;
        var children = this.children,
            res = '<' + tag;


        if (ns) {
            res += ' xmlns="' + ns + '"';
        }

        if (attrs !== obj) {
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
                                this.setCtx({ value: value, multiple: attrs.multiple });
                                continue;

                            case 'option':
                                var ctx = this._ctx;

                                if (ctx.multiple ? isInArray(ctx.value, value) : ctx.value === value) {
                                    res += ' ' + domAttrs('selected').toString('selected', true);
                                }
                        }
                    }

                    if (!ATTRS_TO_EVENTS[name] && (attrHtml = domAttrs(name).toString(name, value))) {
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
                    res += this._escapeChildren ? escapeHtml(children) : children;
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
        if (IS_DEBUG) {
            checkReuse(this, this.tag);
        }

        var domNode = this._domNode = domNodes[domIdx],
            attrs = this.attrs,
            children = this.children;


        if (attrs !== obj) {
            var name = void 0,
                value = void 0;
            for (name in attrs) {
                if ((value = attrs[name]) != null && ATTRS_TO_EVENTS[name]) {
                    addListener(domNode, ATTRS_TO_EVENTS[name], value);
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
        var children = this.children;


        if (children && typeof children !== 'string') {
            var i = 0;
            var len = children.length;

            while (i < len) {
                children[i++].mount();
            }
        }

        this._ref && this._ref(this._domNode);
    },
    unmount: function () {
        var children = this.children;


        if (children && typeof children !== 'string') {
            var i = 0;
            var len = children.length;

            while (i < len) {
                children[i++].unmount();
            }
        }

        removeListeners(this._domNode);

        this._domNode = null;

        this._ref && this._ref(null);
    },
    clone: function () {
        var res = new TagNode(this.tag);

        if (IS_DEBUG) {
            res.__isFrozen = false;
        }

        res.key = this.key;
        res.attrs = this.attrs;
        res.children = this.children;

        if (IS_DEBUG) {
            res.__isFrozen = true;
        }

        res._sets = NS_SET;
        res._ns = this._ns;
        res._escapeChildren = this._escapeChildren;
        res._ctx = this._ctx;
        res._ref = this._ref;

        return res;
    },
    patch: function (node) {
        if (this === node) {
            this._patchChildren(node);
        } else if (this.type === node.type && this.tag === node.tag && this._ns === node._ns) {
            node._domNode = this._domNode;
            this._patchChildren(node);
            this._patchAttrs(node);
            this._patchRef(node);
        } else {
            patchOps.replace(this, node);
        }
    },
    _patchChildren: function (node) {
        var childrenA = this.children,
            childrenB = node.children;

        if (!childrenA && !childrenB) {
            return;
        }

        var isChildrenAText = typeof childrenA === 'string',
            isChildrenBText = typeof childrenB === 'string';

        if (isChildrenBText) {
            if (isChildrenAText) {
                if (childrenA !== childrenB) {
                    patchOps.updateText(this, childrenB, node._escapeChildren);
                }
                return;
            }

            childrenA && childrenA.length && patchOps.removeChildren(this);
            childrenB && patchOps.updateText(this, childrenB, node._escapeChildren);

            return;
        }

        if (!childrenB || !childrenB.length) {
            if (childrenA) {
                isChildrenAText ? patchOps.removeText(this) : childrenA.length && patchOps.removeChildren(this);
            }

            return;
        }

        if (isChildrenAText && childrenA) {
            patchOps.removeText(this);
        }

        if (isChildrenAText || !childrenA || !childrenA.length) {
            var childrenBLen = childrenB.length;
            var iB = 0;

            while (iB < childrenBLen) {
                patchOps.appendChild(node, childrenB[iB++]);
            }

            return;
        }

        patchChildren(this, node);
    },
    _patchAttrs: function (node) {
        var attrsA = this.attrs,
            attrsB = node.attrs;

        if (attrsA === attrsB) {
            return;
        }

        var attrName = void 0;

        if (attrsB !== obj) {
            var attrAVal = void 0,
                attrBVal = void 0,
                isAttrAValArray = void 0,
                isAttrBValArray = void 0;

            for (attrName in attrsB) {
                attrBVal = attrsB[attrName];
                if (attrsA === obj || (attrAVal = attrsA[attrName]) == null) {
                    if (attrBVal != null) {
                        patchOps.updateAttr(this, attrName, attrBVal);
                    }
                } else if (attrBVal == null) {
                    patchOps.removeAttr(this, attrName);
                } else if (typeof attrBVal === 'object' && typeof attrAVal === 'object') {
                    isAttrBValArray = Array.isArray(attrBVal);
                    isAttrAValArray = Array.isArray(attrAVal);
                    if (isAttrBValArray || isAttrAValArray) {
                        if (isAttrBValArray && isAttrAValArray) {
                            this._patchAttrArr(attrName, attrAVal, attrBVal);
                        } else {
                            patchOps.updateAttr(this, attrName, attrBVal);
                        }
                    } else {
                        this._patchAttrObj(attrName, attrAVal, attrBVal);
                    }
                } else if (attrAVal !== attrBVal) {
                    patchOps.updateAttr(this, attrName, attrBVal);
                }
            }
        }

        if (attrsA !== obj) {
            for (attrName in attrsA) {
                if ((attrsB === obj || !(attrName in attrsB)) && attrsA[attrName] != null) {
                    patchOps.removeAttr(this, attrName);
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

        hasDiff && patchOps.updateAttr(this, attrName, arrB);
    },
    _patchAttrObj: function (attrName, objA, objB) {
        if (objA === objB) {
            return;
        }

        var diffObj = {};
        var hasDiff = false;

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

        hasDiff && patchOps.updateAttr(this, attrName, diffObj);
    },
    _patchRef: function (node) {
        if (this._ref) {
            if (this._ref !== node._ref) {
                this._ref(null);

                if (node._ref) {
                    node._ref(node._domNode);
                }
            }
        } else if (node._ref) {
            node._ref(node._domNode);
        }
    }
};

function processChildren(children) {
    if (children == null) {
        return null;
    }

    var typeOfChildren = typeof children;

    if (typeOfChildren === 'object') {
        var res = Array.isArray(children) ? children : [children];

        if (IS_DEBUG) {
            checkChildren(res);
        }

        return res;
    }

    return typeOfChildren === 'string' ? children : children.toString();
}

function checkAttrs(attrs) {
    for (var name in attrs) {
        if (name.substr(0, 2) === 'on' && !ATTRS_TO_EVENTS[name]) {
            throw Error('vidom: Unsupported type of dom event listener "' + name + '".');
        }
    }
}

var TextArea = createComponent({
    onInit: function () {
        var _this = this;

        this._addAttrs = {
            onChange: null,
            onInput: function (e) {
                _this.onInput(e);
            }
        };
    },
    onRender: function () {
        return new TagNode('textarea').setAttrs(merge(this.attrs, this._addAttrs));
    },
    onInput: function (e) {
        var onChange = this.attrs.onChange;


        onChange && onChange(e);

        applyBatch();

        if (this.isMounted()) {
            var control = this.getDomNode(),
                value = this.attrs.value; // attrs could be changed during applyBatch()

            if (typeof value !== 'undefined' && control.value !== value) {
                control.value = value;
            }
        }
    },
    onRefRequest: function () {
        return this.getDomNode();
    }
});

var Select = createComponent({
    onInit: function () {
        var _this = this;

        this._addAttrs = {
            onChange: function (e) {
                _this.onChange(e);
            }
        };
    },
    onRender: function () {
        return new TagNode('select').setAttrs(merge(this.attrs, this._addAttrs)).setChildren(this.children);
    },
    onChange: function (e) {
        var target = e.target,
            _attrs = this.attrs,
            onChange = _attrs.onChange,
            multiple = _attrs.multiple;


        if (onChange) {
            if (multiple) {
                var newValue = [],
                    options = target.options,
                    len = options.length;

                var i = 0,
                    option = void 0;

                while (i < len) {
                    option = options[i++];
                    if (option.selected) {
                        newValue.push(option.value);
                    }
                }

                onChange(e, newValue);
            } else {
                onChange(e);
            }
        }

        applyBatch();

        if (this.isMounted()) {
            var _attrs2 = this.attrs,
                value = _attrs2.value,
                _multiple = _attrs2.multiple; // attrs could be changed during applyBatch()

            if (typeof value !== 'undefined') {
                if (_multiple) {
                    var _options = target.options,
                        _len = _options.length;

                    var _i = 0,
                        _option = void 0;

                    while (_i < _len) {
                        _option = _options[_i++];
                        _option.selected = isInArray(value, _option.value);
                    }
                } else if (target.value != value) {
                    target.value = value;
                }
            }
        }
    },
    onRefRequest: function () {
        return this.getDomNode();
    }
});

function createNode(type) {
    switch (typeof type) {
        case 'string':
            switch (type) {
                case 'fragment':
                    return new FragmentNode();

                case 'text':
                    return new TextNode();

                case 'input':
                    return new ComponentNode(Input);

                case 'textarea':
                    return new ComponentNode(TextArea);

                case 'select':
                    return new ComponentNode(Select);

                default:
                    return new TagNode(type);
            }

        case 'function':
            return type.__vidom__component__ ? new ComponentNode(type) : new FunctionComponentNode(type);

        default:
            if (IS_DEBUG) {
                throw TypeError('vidom: Unexpected type of node is passed to the node factory.');
            }
    }
}

function renderToString(tree) {
    return '<!--vidom-->' + tree.renderToString();
}

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
        hasContentBefore = false,
        child = void 0;
    var len = children.length,
        alreadyNormalizeChildren = {};

    while (i < len) {
        child = i in alreadyNormalizeChildren ? alreadyNormalizeChildren[i] : normalizeChildren(children[i]);

        if (child === null) {
            if (res !== null) {
                if (!hasContentBefore) {
                    res = null;
                } else if (res === children) {
                    res = children.slice(0, i);
                }
            }
        } else if (typeof child === 'object') {
            if (Array.isArray(child)) {
                res = hasContentBefore ? (res === children ? res.slice(0, i) : Array.isArray(res) ? res : [toNode(res)]).concat(child) : child;
            } else if (res !== children) {
                if (!hasContentBefore) {
                    res = child;
                } else if (Array.isArray(res)) {
                    res.push(child);
                } else {
                    res = [toNode(res), child];
                }
            } else if (child !== children[i]) {
                if (hasContentBefore) {
                    res = res.slice(0, i);
                    res.push(child);
                } else {
                    res = child;
                }
            }

            hasContentBefore = true;
        } else {
            var nextChild = void 0,
                j = i;

            // join all next text nodes
            while (++j < len) {
                nextChild = alreadyNormalizeChildren[j] = normalizeChildren(children[j]);

                if (typeof nextChild === 'string') {
                    child += nextChild;
                } else if (nextChild !== null) {
                    break;
                }
            }

            if (hasContentBefore) {
                if (Array.isArray(res)) {
                    if (res === children) {
                        res = res.slice(0, i);
                    }

                    res.push(toNode(child));
                } else {
                    res = [res, toNode(child)];
                }
            } else {
                res = '' + child;
            }

            i = j - 1;

            hasContentBefore = true;
        }

        ++i;
    }

    return res;
}

function toNode(obj) {
    return typeof obj === 'object' ? obj : createNode('text').setChildren(obj);
}

var Component = createComponent();

exports.node = createNode;
exports.createComponent = createComponent;
exports.renderToString = renderToString;
exports.normalizeChildren = normalizeChildren;
exports.IS_DEBUG = IS_DEBUG;
exports.console = consoleWrapper;
exports.Component = Component;
exports.mount = mount;
exports.mountSync = mountSync;
exports.unmount = unmount;
exports.unmountSync = unmountSync;
exports.getMountedRootNodes = getMountedRootNodes;

Object.defineProperty(exports, '__esModule', { value: true });

})));
