(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (factory((global.Inferno = global.Inferno || {})));
}(this, (function (exports) { 'use strict';

    /**
     * @module Inferno-Shared
     */ /** TypeDoc Comment */
    var NO_OP = '$NO_OP';
    var ERROR_MSG = 'a runtime error occured! Use Inferno in development environment to find the error.';
    // This should be boolean and not reference to window.document
    var isBrowser = !!(typeof window !== 'undefined' && window.document);
    // this is MUCH faster than .constructor === Array and instanceof Array
    // in Node 7 and the later versions of V8, slower in older versions though
    var isArray = Array.isArray;
    function isStringOrNumber(o) {
        var type = typeof o;
        return type === 'string' || type === 'number';
    }
    function isNullOrUndef(o) {
        return isUndefined(o) || isNull(o);
    }
    function isInvalid(o) {
        return isNull(o) || o === false || isTrue(o) || isUndefined(o);
    }
    function isFunction(o) {
        return typeof o === 'function';
    }
    function isString(o) {
        return typeof o === 'string';
    }
    function isNumber(o) {
        return typeof o === 'number';
    }
    function isNull(o) {
        return o === null;
    }
    function isTrue(o) {
        return o === true;
    }
    function isUndefined(o) {
        return o === void 0;
    }
    function isObject(o) {
        return typeof o === 'object';
    }
    function throwError(message) {
        if (!message) {
            message = ERROR_MSG;
        }
        throw new Error(("Inferno Error: " + message));
    }
    function warning(message) {
        // tslint:disable-next-line:no-console
        console.error(message);
    }
    function combineFrom(first, second) {
        var out = {};
        if (first) {
            for (var key in first) {
                out[key] = first[key];
            }
        }
        if (second) {
            for (var key$1 in second) {
                out[key$1] = second[key$1];
            }
        }
        return out;
    }

    function getTagName(vNode) {
        var flags = vNode.flags;
        var tagName;
        if (flags & 481 /* Element */) {
            tagName = "<" + (vNode.type) + (vNode.className ? ' class="' + vNode.className + '"' : '') + ">";
        }
        else if (flags & 16 /* Text */) {
            tagName = "Text(" + (vNode.children) + ")";
        }
        else if (flags & 1024 /* Portal */) {
            tagName = "Portal*";
        }
        else {
            var componentName = vNode.type.name || vNode.type.displayName || vNode.type.constructor.name;
            tagName = "<" + componentName + " />";
        }
        return tagName;
    }
    function DEV_ValidateKeys(vNodeTree, vNode, forceKeyed) {
        var foundKeys = new Set();
        for (var i = 0, len = vNodeTree.length; i < len; i++) {
            var childNode = vNodeTree[i];
            if (isArray(childNode)) {
                return ('Encountered ARRAY in mount, array must be flattened, or normalize used. Location: ' +
                    getTagName(childNode));
            }
            if (isInvalid(childNode)) {
                if (forceKeyed) {
                    return ('Encountered invalid node when preparing to keyed algorithm. Location: ' +
                        getTagName(childNode));
                }
                else if (foundKeys.size !== 0) {
                    return ('Encountered invalid node with mixed keys. Location: ' +
                        getTagName(childNode));
                }
                continue;
            }
            var key = childNode.key;
            var children = childNode.children;
            var childFlags = childNode.childFlags;
            if (!isInvalid(children)) {
                var val = (void 0);
                if (childFlags & 12 /* MultipleChildren */) {
                    val = DEV_ValidateKeys(children, childNode, childNode.childFlags & 8 /* HasKeyedChildren */);
                }
                else if (childFlags & 2 /* HasVNodeChildren */) {
                    val = DEV_ValidateKeys([children], childNode, childNode.childFlags & 8 /* HasKeyedChildren */);
                }
                if (val) {
                    val += ' :: ' + getTagName(childNode);
                    return val;
                }
            }
            if (forceKeyed && isNullOrUndef(key)) {
                return ('Encountered child vNode without key during keyed algorithm. Location: ' +
                    getTagName(childNode));
            }
            else if (!forceKeyed && isNullOrUndef(key)) {
                if (foundKeys.size !== 0) {
                    return ('Encountered children with key missing. Location: ' +
                        getTagName(childNode));
                }
                continue;
            }
            if (foundKeys.has(key)) {
                return ('Encountered two children with same key: {' +
                    key +
                    '}. Location: ' +
                    getTagName(childNode));
            }
            foundKeys.add(key);
        }
    }
    function validateVNodeElementChildren(vNode) {
        {
            if (vNode.childFlags & 1 /* HasInvalidChildren */) {
                return;
            }
            if (vNode.flags & 64 /* InputElement */) {
                throwError("input elements can't have children.");
            }
            if (vNode.flags & 128 /* TextareaElement */) {
                throwError("textarea elements can't have children.");
            }
            if (vNode.flags & 481 /* Element */) {
                var voidTypes = [
                    'area',
                    'base',
                    'br',
                    'col',
                    'command',
                    'embed',
                    'hr',
                    'img',
                    'input',
                    'keygen',
                    'link',
                    'meta',
                    'param',
                    'source',
                    'track',
                    'wbr'
                ];
                var tag = vNode.type.toLowerCase();
                if (tag === 'media') {
                    throwError("media elements can't have children.");
                }
                var idx = voidTypes.indexOf(tag);
                if (idx !== -1) {
                    throwError(((voidTypes[idx]) + " elements can't have children."));
                }
            }
        }
    }
    function validateKeys(vNode, forceKeyed) {
        {
            // Checks if there is any key missing or duplicate keys
            if (vNode.children && vNode.flags & 481 /* Element */) {
                var error = DEV_ValidateKeys(vNode.children, vNode, forceKeyed);
                if (error) {
                    throwError(error + ' :: ' + getTagName(vNode));
                }
            }
        }
    }

    /**
     * @module Inferno
     */ /** TypeDoc Comment */
    var keyPrefix = '$';
    function getVNode(childFlags, children, className, flags, key, props, ref, type) {
        return {
            childFlags: childFlags,
            children: children,
            className: className,
            dom: null,
            flags: flags,
            key: key === void 0 ? null : key,
            parentVNode: null,
            props: props === void 0 ? null : props,
            ref: ref === void 0 ? null : ref,
            type: type
        };
    }
    function createVNode(flags, type, className, children, childFlags, props, key, ref) {
        {
            if (flags & 14 /* Component */) {
                throwError('Creating Component vNodes using createVNode is not allowed. Use Inferno.createComponentVNode method.');
            }
        }
        var vNode = getVNode(childFlags === void 0 ? 1 /* HasInvalidChildren */ : childFlags, children, className, flags, key, props, ref, type);
        {
            validateVNodeElementChildren(vNode);
        }
        var optsVNode = options.createVNode;
        if (isFunction(optsVNode)) {
            optsVNode(vNode);
        }
        return vNode;
    }
    function createComponentVNode(flags, type, props, key, ref) {
        {
            if (flags & 1 /* HtmlElement */) {
                throwError('Creating element vNodes using createComponentVNode is not allowed. Use Inferno.createVNode method.');
            }
        }
        if ((flags & 2 /* ComponentUnknown */) > 0) {
            flags =
                !isUndefined(type.prototype) && isFunction(type.prototype.render)
                    ? 4 /* ComponentClass */
                    : 8 /* ComponentFunction */;
        }
        // set default props
        var defaultProps = type.defaultProps;
        if (!isNullOrUndef(defaultProps)) {
            if (!props) {
                props = {}; // Props can be referenced and modified at application level so always create new object
            }
            for (var prop in defaultProps) {
                if (isUndefined(props[prop])) {
                    props[prop] = defaultProps[prop];
                }
            }
        }
        if ((flags & 8 /* ComponentFunction */) > 0) {
            var defaultHooks = type.defaultHooks;
            if (!isNullOrUndef(defaultHooks)) {
                if (!ref) {
                    // As ref cannot be referenced from application level, we can use the same refs object
                    ref = defaultHooks;
                }
                else {
                    for (var prop$1 in defaultHooks) {
                        if (isUndefined(ref[prop$1])) {
                            ref[prop$1] = defaultHooks[prop$1];
                        }
                    }
                }
            }
        }
        var vNode = getVNode(1 /* HasInvalidChildren */, null, null, flags, key, props, ref, type);
        var optsVNode = options.createVNode;
        if (isFunction(optsVNode)) {
            optsVNode(vNode);
        }
        return vNode;
    }
    function createTextVNode(text, key) {
        return getVNode(1 /* HasInvalidChildren */, isNullOrUndef(text) ? '' : text, null, 16 /* Text */, key, null, null, null);
    }
    function normalizeProps(vNode) {
        var props = vNode.props;
        if (props) {
            if (vNode.flags & 481 /* Element */) {
                if (!isUndefined(props.children) && isNullOrUndef(vNode.children)) {
                    normalizeChildren(vNode, props.children);
                }
                if (!isUndefined(props.className)) {
                    vNode.className = props.className || null;
                    props.className = undefined;
                }
            }
            if (!isUndefined(props.key)) {
                vNode.key = props.key;
                props.key = undefined;
            }
            if (!isUndefined(props.ref)) {
                vNode.ref = props.ref;
                props.ref = undefined;
            }
        }
        return vNode;
    }
    function directClone(vNodeToClone) {
        var newVNode;
        var flags = vNodeToClone.flags;
        if (flags & 14 /* Component */) {
            var props;
            var propsToClone = vNodeToClone.props;
            if (!isNull(propsToClone)) {
                props = {};
                for (var key in propsToClone) {
                    props[key] = propsToClone[key];
                }
            }
            newVNode = createComponentVNode(flags, vNodeToClone.type, props, vNodeToClone.key, vNodeToClone.ref);
        }
        else if (flags & 481 /* Element */) {
            var children = vNodeToClone.children;
            newVNode = normalizeChildren(createVNode(flags, vNodeToClone.type, vNodeToClone.className, null, 0, vNodeToClone.props, vNodeToClone.key, vNodeToClone.ref), children);
        }
        else if (flags & 16 /* Text */) {
            newVNode = createTextVNode(vNodeToClone.children, vNodeToClone.key);
        }
        else if (flags & 1024 /* Portal */) {
            newVNode = vNodeToClone;
        }
        return newVNode;
    }
    function createVoidVNode() {
        return getVNode(1 /* HasInvalidChildren */, '', null, 512 /* Void */, null, null, null, null);
    }
    function _normalizeVNodes(nodes, result, index, currentKey) {
        for (var len = nodes.length; index < len; index++) {
            var n = nodes[index];
            if (!isInvalid(n)) {
                var newKey = currentKey + keyPrefix + index;
                if (isArray(n)) {
                    _normalizeVNodes(n, result, 0, newKey);
                }
                else {
                    if (isStringOrNumber(n)) {
                        n = createTextVNode(n, newKey);
                    }
                    else {
                        var oldKey = n.key;
                        var isPrefixedKey = isString(oldKey) && oldKey[0] === keyPrefix;
                        if (!isNull(n.dom) || isPrefixedKey) {
                            n = directClone(n);
                        }
                        if (isNull(oldKey) || isPrefixedKey) {
                            n.key = newKey;
                        }
                        else {
                            n.key = currentKey + oldKey;
                        }
                    }
                    result.push(n);
                }
            }
        }
    }
    function getFlagsForElementVnode(type) {
        if (type === 'svg') {
            return 32 /* SvgElement */;
        }
        if (type === 'input') {
            return 64 /* InputElement */;
        }
        if (type === 'select') {
            return 256 /* SelectElement */;
        }
        if (type === 'textarea') {
            return 128 /* TextareaElement */;
        }
        return 1 /* HtmlElement */;
    }
    function normalizeChildren(vNode, children) {
        var newChildren;
        var newChildFlags;
        // Don't change children to match strict equal (===) true in patching
        if (isInvalid(children)) {
            newChildFlags = 1 /* HasInvalidChildren */;
            newChildren = children;
        }
        else if (isString(children)) {
            newChildFlags = 2 /* HasVNodeChildren */;
            newChildren = createTextVNode(children);
        }
        else if (isNumber(children)) {
            newChildFlags = 2 /* HasVNodeChildren */;
            newChildren = createTextVNode(children + '');
        }
        else if (isArray(children)) {
            var len = children.length;
            if (len === 0) {
                newChildren = null;
                newChildFlags = 1 /* HasInvalidChildren */;
            }
            else {
                // we assign $ which basically means we've flagged this array for future note
                // if it comes back again, we need to clone it, as people are using it
                // in an immutable way
                // tslint:disable-next-line
                if (Object.isFrozen(children) || children['$'] === true) {
                    children = children.slice();
                }
                newChildFlags = 8 /* HasKeyedChildren */;
                for (var i = 0; i < len; i++) {
                    var n = children[i];
                    if (isInvalid(n) || isArray(n)) {
                        newChildren = newChildren || children.slice(0, i);
                        _normalizeVNodes(children, newChildren, i, '');
                        break;
                    }
                    else if (isStringOrNumber(n)) {
                        newChildren = newChildren || children.slice(0, i);
                        newChildren.push(createTextVNode(n, keyPrefix + i));
                    }
                    else {
                        var key = n.key;
                        var isNullDom = isNull(n.dom);
                        var isNullKey = isNull(key);
                        var isPrefixed = !isNullKey && key[0] === keyPrefix;
                        if (!isNullDom || isNullKey || isPrefixed) {
                            newChildren = newChildren || children.slice(0, i);
                            if (!isNullDom || isPrefixed) {
                                n = directClone(n);
                            }
                            if (isNullKey || isPrefixed) {
                                n.key = keyPrefix + i;
                            }
                            newChildren.push(n);
                        }
                        else if (newChildren) {
                            newChildren.push(n);
                        }
                    }
                }
                newChildren = newChildren || children;
                newChildren.$ = true;
            }
        }
        else {
            newChildren = children;
            if (!isNull(children.dom)) {
                newChildren = directClone(children);
            }
            newChildFlags = 2 /* HasVNodeChildren */;
        }
        vNode.children = newChildren;
        vNode.childFlags = newChildFlags;
        {
            validateVNodeElementChildren(vNode);
        }
        return vNode;
    }
    var options = {
        afterMount: null,
        afterRender: null,
        afterUpdate: null,
        beforeRender: null,
        beforeUnmount: null,
        createVNode: null,
        findDOMNodeEnabled: false,
        roots: new Map()
    };

    /**
     * @module Inferno
     */ /** TypeDoc Comment */
    var xlinkNS = 'http://www.w3.org/1999/xlink';
    var xmlNS = 'http://www.w3.org/XML/1998/namespace';
    var svgNS = 'http://www.w3.org/2000/svg';
    var strictProps = new Set();
    strictProps.add('volume');
    strictProps.add('defaultChecked');
    strictProps.add('value');
    var booleanProps = new Set();
    booleanProps.add('muted');
    booleanProps.add('scoped');
    booleanProps.add('loop');
    booleanProps.add('open');
    booleanProps.add('checked');
    booleanProps.add('default');
    booleanProps.add('capture');
    booleanProps.add('disabled');
    booleanProps.add('readOnly');
    booleanProps.add('required');
    booleanProps.add('autoplay');
    booleanProps.add('controls');
    booleanProps.add('seamless');
    booleanProps.add('reversed');
    booleanProps.add('allowfullscreen');
    booleanProps.add('novalidate');
    booleanProps.add('hidden');
    booleanProps.add('autoFocus');
    booleanProps.add('selected');
    booleanProps.add('indeterminate');
    // TODO: MathML namespace
    var namespaces = new Map();
    namespaces.set('xlink:href', xlinkNS);
    namespaces.set('xlink:arcrole', xlinkNS);
    namespaces.set('xlink:actuate', xlinkNS);
    namespaces.set('xlink:show', xlinkNS);
    namespaces.set('xlink:role', xlinkNS);
    namespaces.set('xlink:title', xlinkNS);
    namespaces.set('xlink:type', xlinkNS);
    namespaces.set('xml:base', xmlNS);
    namespaces.set('xml:lang', xmlNS);
    namespaces.set('xml:space', xmlNS);
    var isUnitlessNumber = new Set();
    isUnitlessNumber.add('animationIterationCount');
    isUnitlessNumber.add('borderImageOutset');
    isUnitlessNumber.add('borderImageSlice');
    isUnitlessNumber.add('borderImageWidth');
    isUnitlessNumber.add('boxFlex');
    isUnitlessNumber.add('boxFlexGroup');
    isUnitlessNumber.add('boxOrdinalGroup');
    isUnitlessNumber.add('columnCount');
    isUnitlessNumber.add('flex');
    isUnitlessNumber.add('flexGrow');
    isUnitlessNumber.add('flexPositive');
    isUnitlessNumber.add('flexShrink');
    isUnitlessNumber.add('flexNegative');
    isUnitlessNumber.add('flexOrder');
    isUnitlessNumber.add('gridRow');
    isUnitlessNumber.add('gridColumn');
    isUnitlessNumber.add('fontWeight');
    isUnitlessNumber.add('lineClamp');
    isUnitlessNumber.add('lineHeight');
    isUnitlessNumber.add('opacity');
    isUnitlessNumber.add('order');
    isUnitlessNumber.add('orphans');
    isUnitlessNumber.add('tabSize');
    isUnitlessNumber.add('widows');
    isUnitlessNumber.add('zIndex');
    isUnitlessNumber.add('zoom');
    isUnitlessNumber.add('fillOpacity');
    isUnitlessNumber.add('floodOpacity');
    isUnitlessNumber.add('stopOpacity');
    isUnitlessNumber.add('strokeDasharray');
    isUnitlessNumber.add('strokeDashoffset');
    isUnitlessNumber.add('strokeMiterlimit');
    isUnitlessNumber.add('strokeOpacity');
    isUnitlessNumber.add('strokeWidth');
    var skipProps = new Set();
    skipProps.add('children');
    skipProps.add('childrenType');
    skipProps.add('className');
    skipProps.add('defaultValue');
    skipProps.add('ref');
    skipProps.add('key');
    skipProps.add('checked');
    skipProps.add('multiple');
    var delegatedEvents = new Set();
    delegatedEvents.add('onClick');
    delegatedEvents.add('onMouseDown');
    delegatedEvents.add('onMouseUp');
    delegatedEvents.add('onMouseMove');
    delegatedEvents.add('onTouchStart');
    delegatedEvents.add('onTouchEnd');
    delegatedEvents.add('onTouchMove');
    delegatedEvents.add('onSubmit');
    delegatedEvents.add('onDblClick');
    delegatedEvents.add('onKeyDown');
    delegatedEvents.add('onKeyUp');
    delegatedEvents.add('onKeyPress');
    delegatedEvents.add('onFocusIn');
    delegatedEvents.add('onFocusOut');

    /**
     * @module Inferno
     */ /** TypeDoc Comment */
    /**
     * Links given data to event as first parameter
     * @param {*} data data to be linked, it will be available in function as first parameter
     * @param {Function} event Function to be called when event occurs
     * @returns {{data: *, event: Function}}
     */
    function linkEvent(data, event) {
        if (isFunction(event)) {
            return { data: data, event: event };
        }
        return null; // Return null when event is invalid, to avoid creating unnecessary event handlers
    }

    /**
     * @module Inferno
     */ /** TypeDoc Comment */
    // We need EMPTY_OBJ defined in one place.
    // Its used for comparison so we cant inline it into shared
    var EMPTY_OBJ = {};
    {
        Object.freeze(EMPTY_OBJ);
    }
    function appendChild(parentDom, dom) {
        parentDom.appendChild(dom);
    }
    function insertOrAppend(parentDom, newNode, nextNode) {
        if (isNullOrUndef(nextNode)) {
            appendChild(parentDom, newNode);
        }
        else {
            parentDom.insertBefore(newNode, nextNode);
        }
    }
    function documentCreateElement(tag, isSVG) {
        if (isSVG === true) {
            return document.createElementNS(svgNS, tag);
        }
        return document.createElement(tag);
    }
    function replaceChild(parentDom, newDom, lastDom) {
        parentDom.replaceChild(newDom, lastDom);
    }
    function removeChild(parentDom, dom) {
        parentDom.removeChild(dom);
    }
    function callAll(arrayFn) {
        var listener;
        while (!isUndefined((listener = arrayFn.shift()))) {
            listener();
        }
    }

    /**
     * @module Inferno
     */ /** TypeDoc Comment */
    var delegatedEvents$1 = new Map();
    function handleEvent(name, nextEvent, dom) {
        var delegatedRoots = delegatedEvents$1.get(name);
        if (nextEvent) {
            if (!delegatedRoots) {
                delegatedRoots = { items: new Map(), docEvent: null };
                delegatedRoots.docEvent = attachEventToDocument(name, delegatedRoots);
                delegatedEvents$1.set(name, delegatedRoots);
            }
            delegatedRoots.items.set(dom, nextEvent);
        }
        else if (delegatedRoots) {
            var items = delegatedRoots.items;
            if (items.delete(dom)) {
                // If any items were deleted, check if listener need to be removed
                if (items.size === 0) {
                    document.removeEventListener(normalizeEventName(name), delegatedRoots.docEvent);
                    delegatedEvents$1.delete(name);
                }
            }
        }
    }
    function dispatchEvents(event, target, items, count, isClick, eventData) {
        var dom = target;
        while (count > 0 && !isNull(dom)) {
            // Html Nodes can be nested fe: span inside button in that scenario browser does not handle disabled attribute on parent,
            // because the event listener is on document.body
            // Don't process clicks on disabled elements
            if (isClick && dom.disabled) {
                return;
            }
            var eventsToTrigger = items.get(dom);
            if (eventsToTrigger) {
                count--;
                // linkEvent object
                eventData.dom = dom;
                if (eventsToTrigger.event) {
                    eventsToTrigger.event(eventsToTrigger.data, event);
                }
                else {
                    eventsToTrigger(event);
                }
                if (event.cancelBubble) {
                    return;
                }
            }
            dom = dom.parentNode;
        }
    }
    function normalizeEventName(name) {
        return name.substr(2).toLowerCase();
    }
    function stopPropagation() {
        this.cancelBubble = true;
        this.stopImmediatePropagation();
    }
    function attachEventToDocument(name, delegatedRoots) {
        var docEvent = function (event) {
            var count = delegatedRoots.items.size;
            if (count > 0) {
                event.stopPropagation = stopPropagation;
                // Event data needs to be object to save reference to currentTarget getter
                var eventData = {
                    dom: document
                };
                try {
                    Object.defineProperty(event, 'currentTarget', {
                        configurable: true,
                        get: function get() {
                            return eventData.dom;
                        }
                    });
                }
                catch (e) {
                    /* safari7 and phantomJS will crash */
                }
                dispatchEvents(event, event.target, delegatedRoots.items, count, event.type === 'click', eventData);
            }
        };
        document.addEventListener(normalizeEventName(name), docEvent);
        return docEvent;
    }

    /**
     * @module Inferno
     */ /** TypeDoc Comment */
    function isSameInnerHTML(dom, innerHTML) {
        var tempdom = document.createElement('i');
        tempdom.innerHTML = innerHTML;
        return tempdom.innerHTML === dom.innerHTML;
    }
    function isSamePropsInnerHTML(dom, props) {
        return Boolean(props &&
            props.dangerouslySetInnerHTML &&
            props.dangerouslySetInnerHTML.__html &&
            isSameInnerHTML(dom, props.dangerouslySetInnerHTML.__html));
    }

    function createWrappedFunction(methodName, applyValue) {
        var fnMethod = function (e) {
            e.stopPropagation();
            var vNode = this.vNode;
            // If vNode is gone by the time event fires, no-op
            if (!vNode) {
                return;
            }
            var props = vNode.props || EMPTY_OBJ;
            var dom = vNode.dom;
            if (props[methodName]) {
                var listener = props[methodName];
                if (listener.event) {
                    listener.event(listener.data, e);
                }
                else {
                    listener(e);
                }
            }
            else {
                var nativeListenerName = methodName.toLowerCase();
                if (props[nativeListenerName]) {
                    props[nativeListenerName](e);
                }
            }
            if (isFunction(applyValue)) {
                var newVNode = this.vNode;
                var newProps = newVNode.props || EMPTY_OBJ;
                applyValue(newProps, dom, false, newVNode);
            }
        };
        Object.defineProperty(fnMethod, 'wrapped', {
            configurable: false,
            enumerable: false,
            value: true,
            writable: false
        });
        return fnMethod;
    }

    /**
     * @module Inferno
     */ /** TypeDoc Comment */
    function isCheckedType(type) {
        return type === 'checkbox' || type === 'radio';
    }
    var onTextInputChange = createWrappedFunction('onInput', applyValue);
    var wrappedOnChange = createWrappedFunction('onChange', applyValue);
    var onCheckboxChange = createWrappedFunction('onClick');
    function processInput(vNode, dom, nextPropsOrEmpty, mounting, isControlled) {
        applyValue(nextPropsOrEmpty, dom);
        if (isControlled) {
            dom.vNode = vNode;
            if (mounting) {
                if (isCheckedType(nextPropsOrEmpty.type)) {
                    dom.onchange = wrappedOnChange;
                }
                else {
                    dom.oninput = onTextInputChange;
                }
                if (nextPropsOrEmpty.onClick) {
                    dom.onclick = onCheckboxChange;
                }
            }
        }
    }
    function applyValue(nextPropsOrEmpty, dom) {
        var type = nextPropsOrEmpty.type;
        var value = nextPropsOrEmpty.value;
        var checked = nextPropsOrEmpty.checked;
        var multiple = nextPropsOrEmpty.multiple;
        var defaultValue = nextPropsOrEmpty.defaultValue;
        var hasValue = !isNullOrUndef(value);
        if (type && type !== dom.type) {
            dom.setAttribute('type', type);
        }
        if (!isNullOrUndef(multiple) && multiple !== dom.multiple) {
            dom.multiple = multiple;
        }
        if (!isNullOrUndef(defaultValue) && !hasValue) {
            dom.defaultValue = defaultValue + '';
        }
        if (isCheckedType(type)) {
            if (hasValue) {
                dom.value = value;
            }
            if (!isNullOrUndef(checked)) {
                dom.checked = checked;
            }
        }
        else {
            if (hasValue && dom.value !== value) {
                dom.defaultValue = value;
                dom.value = value;
            }
            else if (!isNullOrUndef(checked)) {
                dom.checked = checked;
            }
        }
    }

    /**
     * @module Inferno
     */ /** TypeDoc Comment */
    function updateChildOptionGroup(vNode, value) {
        var type = vNode.type;
        if (type === 'optgroup') {
            var children = vNode.children;
            var childFlags = vNode.childFlags;
            if (childFlags & 12 /* MultipleChildren */) {
                for (var i = 0, len = children.length; i < len; i++) {
                    updateChildOption(children[i], value);
                }
            }
            else if (childFlags & 2 /* HasVNodeChildren */) {
                updateChildOption(children, value);
            }
        }
        else {
            updateChildOption(vNode, value);
        }
    }
    function updateChildOption(vNode, value) {
        var props = vNode.props || EMPTY_OBJ;
        var dom = vNode.dom;
        // we do this as multiple may have changed
        dom.value = props.value;
        if ((isArray(value) && value.indexOf(props.value) !== -1) ||
            props.value === value) {
            dom.selected = true;
        }
        else if (!isNullOrUndef(value) || !isNullOrUndef(props.selected)) {
            dom.selected = props.selected || false;
        }
    }
    var onSelectChange = createWrappedFunction('onChange', applyValue$1);
    function processSelect(vNode, dom, nextPropsOrEmpty, mounting, isControlled) {
        applyValue$1(nextPropsOrEmpty, dom, mounting, vNode);
        if (isControlled) {
            dom.vNode = vNode;
            if (mounting) {
                dom.onchange = onSelectChange;
            }
        }
    }
    function applyValue$1(nextPropsOrEmpty, dom, mounting, vNode) {
        if (!isNullOrUndef(nextPropsOrEmpty.multiple) &&
            nextPropsOrEmpty.multiple !== dom.multiple) {
            dom.multiple = nextPropsOrEmpty.multiple;
        }
        var childFlags = vNode.childFlags;
        if ((childFlags & 1 /* HasInvalidChildren */) === 0) {
            var children = vNode.children;
            var value = nextPropsOrEmpty.value;
            if (mounting && isNullOrUndef(value)) {
                value = nextPropsOrEmpty.defaultValue;
            }
            if (childFlags & 12 /* MultipleChildren */) {
                for (var i = 0, len = children.length; i < len; i++) {
                    updateChildOptionGroup(children[i], value);
                }
            }
            else if (childFlags & 2 /* HasVNodeChildren */) {
                updateChildOptionGroup(children, value);
            }
        }
    }

    /**
     * @module Inferno
     */ /** TypeDoc Comment */
    var onTextareaInputChange = createWrappedFunction('onInput', applyValue$2);
    var wrappedOnChange$1 = createWrappedFunction('onChange');
    function processTextarea(vNode, dom, nextPropsOrEmpty, mounting, isControlled) {
        applyValue$2(nextPropsOrEmpty, dom, mounting);
        if (isControlled) {
            dom.vNode = vNode;
            if (mounting) {
                dom.oninput = onTextareaInputChange;
                if (nextPropsOrEmpty.onChange) {
                    dom.onchange = wrappedOnChange$1;
                }
            }
        }
    }
    function applyValue$2(nextPropsOrEmpty, dom, mounting) {
        var value = nextPropsOrEmpty.value;
        var domValue = dom.value;
        if (isNullOrUndef(value)) {
            if (mounting) {
                var defaultValue = nextPropsOrEmpty.defaultValue;
                if (!isNullOrUndef(defaultValue) && defaultValue !== domValue) {
                    dom.defaultValue = defaultValue;
                    dom.value = defaultValue;
                }
            }
        }
        else if (domValue !== value) {
            /* There is value so keep it controlled */
            dom.defaultValue = value;
            dom.value = value;
        }
    }

    /**
     * @module Inferno
     */ /** TypeDoc Comment */
    /**
     * There is currently no support for switching same input between controlled and nonControlled
     * If that ever becomes a real issue, then re design controlled elements
     * Currently user must choose either controlled or non-controlled and stick with that
     */
    function processElement(flags, vNode, dom, nextPropsOrEmpty, mounting, isControlled) {
        if (flags & 64 /* InputElement */) {
            processInput(vNode, dom, nextPropsOrEmpty, mounting, isControlled);
        }
        else if (flags & 256 /* SelectElement */) {
            processSelect(vNode, dom, nextPropsOrEmpty, mounting, isControlled);
        }
        else if (flags & 128 /* TextareaElement */) {
            processTextarea(vNode, dom, nextPropsOrEmpty, mounting, isControlled);
        }
    }
    function isControlledFormElement(nextPropsOrEmpty) {
        return nextPropsOrEmpty.type && isCheckedType(nextPropsOrEmpty.type)
            ? !isNullOrUndef(nextPropsOrEmpty.checked)
            : !isNullOrUndef(nextPropsOrEmpty.value);
    }

    /**
     * @module Inferno
     */ /** TypeDoc Comment */
    function remove(vNode, parentDom) {
        unmount(vNode);
        if (!isNull(parentDom)) {
            removeChild(parentDom, vNode.dom);
            // Let carbage collector free memory
            vNode.dom = null;
        }
    }
    function unmount(vNode) {
        var flags = vNode.flags;
        if (flags & 481 /* Element */) {
            var ref = vNode.ref;
            var props = vNode.props;
            if (isFunction(ref)) {
                ref(null);
            }
            var children = vNode.children;
            var childFlags = vNode.childFlags;
            if (childFlags & 12 /* MultipleChildren */) {
                unmountAllChildren(children);
            }
            else if (childFlags & 2 /* HasVNodeChildren */) {
                unmount(children);
            }
            if (!isNull(props)) {
                for (var name in props) {
                    // Remove all delegated events, regular events die with dom node
                    if (delegatedEvents.has(name)) {
                        handleEvent(name, null, vNode.dom);
                    }
                }
            }
        }
        else if (flags & 14 /* Component */) {
            var instance = vNode.children;
            var ref$1 = vNode.ref;
            if (flags & 4 /* ComponentClass */) {
                if (isFunction(options.beforeUnmount)) {
                    options.beforeUnmount(vNode);
                }
                if (isFunction(instance.componentWillUnmount)) {
                    instance.componentWillUnmount();
                }
                if (isFunction(ref$1)) {
                    ref$1(null);
                }
                instance.$UN = true;
                unmount(instance.$LI);
            }
            else {
                if (!isNullOrUndef(ref$1) && isFunction(ref$1.onComponentWillUnmount)) {
                    ref$1.onComponentWillUnmount(vNode.dom, vNode.props || EMPTY_OBJ);
                }
                unmount(instance);
            }
        }
        else if (flags & 1024 /* Portal */) {
            var children$1 = vNode.children;
            if (!isNull(children$1) && isObject(children$1)) {
                remove(children$1, vNode.type);
            }
        }
    }
    function unmountAllChildren(children) {
        for (var i = 0, len = children.length; i < len; i++) {
            unmount(children[i]);
        }
    }
    function removeAllChildren(dom, children) {
        unmountAllChildren(children);
        dom.textContent = '';
    }

    /**
     * @module Inferno
     */ /** TypeDoc Comment */
    function isAttrAnEvent(attr) {
        return attr[0] === 'o' && attr[1] === 'n';
    }
    function createLinkEvent(linkEvent, nextValue) {
        return function (e) {
            linkEvent(nextValue.data, e);
        };
    }
    function patchEvent(name, lastValue, nextValue, dom) {
        var nameLowerCase = name.toLowerCase();
        if (!isFunction(nextValue) && !isNullOrUndef(nextValue)) {
            var linkEvent = nextValue.event;
            if (linkEvent && isFunction(linkEvent)) {
                dom[nameLowerCase] = createLinkEvent(linkEvent, nextValue);
            }
            else {
                // Development warning
                {
                    throwError(("an event on a VNode \"" + name + "\". was not a function or a valid linkEvent."));
                }
            }
        }
        else {
            var domEvent = dom[nameLowerCase];
            // if the function is wrapped, that means it's been controlled by a wrapper
            if (!domEvent || !domEvent.wrapped) {
                dom[nameLowerCase] = nextValue;
            }
        }
    }
    // We are assuming here that we come from patchProp routine
    // -nextAttrValue cannot be null or undefined
    function patchStyle(lastAttrValue, nextAttrValue, dom) {
        var domStyle = dom.style;
        var style;
        var value;
        if (isString(nextAttrValue)) {
            domStyle.cssText = nextAttrValue;
            return;
        }
        if (!isNullOrUndef(lastAttrValue) && !isString(lastAttrValue)) {
            for (style in nextAttrValue) {
                // do not add a hasOwnProperty check here, it affects performance
                value = nextAttrValue[style];
                if (value !== lastAttrValue[style]) {
                    domStyle[style] =
                        !isNumber(value) || isUnitlessNumber.has(style)
                            ? value
                            : value + 'px';
                }
            }
            for (style in lastAttrValue) {
                if (isNullOrUndef(nextAttrValue[style])) {
                    domStyle[style] = '';
                }
            }
        }
        else {
            for (style in nextAttrValue) {
                value = nextAttrValue[style];
                domStyle[style] =
                    !isNumber(value) || isUnitlessNumber.has(style) ? value : value + 'px';
            }
        }
    }
    function patchProp(prop, lastValue, nextValue, dom, isSVG, hasControlledValue, lastVNode) {
        if (lastValue !== nextValue) {
            if (delegatedEvents.has(prop)) {
                handleEvent(prop, nextValue, dom);
            }
            else if (skipProps.has(prop) || (hasControlledValue && prop === 'value')) {
                return;
            }
            else if (booleanProps.has(prop)) {
                prop = prop === 'autoFocus' ? prop.toLowerCase() : prop;
                dom[prop] = !!nextValue;
            }
            else if (strictProps.has(prop)) {
                var value = isNullOrUndef(nextValue) ? '' : nextValue;
                if (dom[prop] !== value) {
                    dom[prop] = value;
                }
            }
            else if (isAttrAnEvent(prop)) {
                patchEvent(prop, lastValue, nextValue, dom);
            }
            else if (isNullOrUndef(nextValue)) {
                dom.removeAttribute(prop);
            }
            else if (prop === 'style') {
                patchStyle(lastValue, nextValue, dom);
            }
            else if (prop === 'dangerouslySetInnerHTML') {
                var lastHtml = (lastValue && lastValue.__html) || '';
                var nextHtml = (nextValue && nextValue.__html) || '';
                if (lastHtml !== nextHtml) {
                    if (!isNullOrUndef(nextHtml) && !isSameInnerHTML(dom, nextHtml)) {
                        if (!isNull(lastVNode)) {
                            if (lastVNode.childFlags & 12 /* MultipleChildren */) {
                                unmountAllChildren(lastVNode.children);
                            }
                            else if (lastVNode.childFlags & 2 /* HasVNodeChildren */) {
                                unmount(lastVNode.children);
                            }
                            lastVNode.children = null;
                            lastVNode.childFlags = 1 /* HasInvalidChildren */;
                        }
                        dom.innerHTML = nextHtml;
                    }
                }
            }
            else if (isSVG && namespaces.has(prop)) {
                // We optimize for NS being boolean. Its 99.9% time false
                // If we end up in this path we can read property again
                dom.setAttributeNS(namespaces.get(prop), prop, nextValue);
            }
            else {
                dom.setAttribute(prop, nextValue);
            }
        }
    }
    function mountProps(vNode, flags, props, dom, isSVG) {
        var hasControlledValue = false;
        var isFormElement = (flags & 448 /* FormElement */) > 0;
        if (isFormElement) {
            hasControlledValue = isControlledFormElement(props);
        }
        for (var prop in props) {
            // do not add a hasOwnProperty check here, it affects performance
            patchProp(prop, null, props[prop], dom, isSVG, hasControlledValue, null);
        }
        if (isFormElement) {
            processElement(flags, vNode, dom, props, true, hasControlledValue);
        }
    }

    /**
     * @module Inferno
     */ /** TypeDoc Comment */
    function createClassComponentInstance(vNode, Component, props, context, lifecycle) {
        var instance = new Component(props, context);
        vNode.children = instance;
        instance.$V = vNode;
        instance.$BS = false;
        instance.context = context;
        if (instance.props === EMPTY_OBJ) {
            instance.props = props;
        }
        // setState callbacks must fire after render is done when called from componentWillReceiveProps or componentWillMount
        instance._lifecycle = lifecycle;
        instance.$UN = false;
        if (isFunction(instance.componentWillMount)) {
            instance.$BR = true;
            instance.componentWillMount();
            if (instance.$PSS) {
                var state = instance.state;
                var pending = instance.$PS;
                if (isNull(state)) {
                    instance.state = pending;
                }
                else {
                    for (var key in pending) {
                        state[key] = pending[key];
                    }
                }
                instance.$PSS = false;
                instance.$PS = null;
            }
            instance.$BR = false;
        }
        if (isFunction(options.beforeRender)) {
            options.beforeRender(instance);
        }
        var input = handleComponentInput(instance.render(props, instance.state, context), vNode);
        var childContext;
        if (isFunction(instance.getChildContext)) {
            childContext = instance.getChildContext();
        }
        if (isNullOrUndef(childContext)) {
            instance.$CX = context;
        }
        else {
            instance.$CX = combineFrom(context, childContext);
        }
        if (isFunction(options.afterRender)) {
            options.afterRender(instance);
        }
        instance.$LI = input;
        return instance;
    }
    function handleComponentInput(input, componentVNode) {
        // Development validation
        {
            if (isArray(input)) {
                throwError('a valid Inferno VNode (or null) must be returned from a component render. You may have returned an array or an invalid object.');
            }
        }
        if (isInvalid(input)) {
            input = createVoidVNode();
        }
        else if (isStringOrNumber(input)) {
            input = createTextVNode(input, null);
        }
        else {
            if (input.dom) {
                input = directClone(input);
            }
            if (input.flags & 14 /* Component */) {
                // if we have an input that is also a component, we run into a tricky situation
                // where the root vNode needs to always have the correct DOM entry
                // we can optimise this in the future, but this gets us out of a lot of issues
                input.parentVNode = componentVNode;
            }
        }
        return input;
    }

    /**
     * @module Inferno
     */ /** TypeDoc Comment */
    function mount(vNode, parentDom, lifecycle, context, isSVG) {
        var flags = vNode.flags;
        {
            validateKeys(vNode, false);
        }
        if (flags & 481 /* Element */) {
            return mountElement(vNode, parentDom, lifecycle, context, isSVG);
        }
        if (flags & 14 /* Component */) {
            return mountComponent(vNode, parentDom, lifecycle, context, isSVG, (flags & 4 /* ComponentClass */) > 0);
        }
        if (flags & 512 /* Void */ || flags & 16 /* Text */) {
            return mountText(vNode, parentDom);
        }
        if (flags & 1024 /* Portal */) {
            mount(vNode.children, vNode.type, lifecycle, context, false);
            return (vNode.dom = mountText(createVoidVNode(), parentDom));
        }
        // Development validation, in production we don't need to throw because it crashes anyway
        {
            if (typeof vNode === 'object') {
                throwError(("mount() received an object that's not a valid VNode, you should stringify it first, fix createVNode flags or call normalizeChildren. Object: \"" + (JSON.stringify(vNode)) + "\"."));
            }
            else {
                throwError(("mount() expects a valid VNode, instead it received an object with the type \"" + (typeof vNode) + "\"."));
            }
        }
    }
    function mountText(vNode, parentDom) {
        var dom = (vNode.dom = document.createTextNode(vNode.children));
        if (!isNull(parentDom)) {
            appendChild(parentDom, dom);
        }
        return dom;
    }
    function mountElement(vNode, parentDom, lifecycle, context, isSVG) {
        var flags = vNode.flags;
        var children = vNode.children;
        var props = vNode.props;
        var className = vNode.className;
        var ref = vNode.ref;
        var childFlags = vNode.childFlags;
        isSVG = isSVG || (flags & 32 /* SvgElement */) > 0;
        var dom = documentCreateElement(vNode.type, isSVG);
        vNode.dom = dom;
        if (!isNullOrUndef(className) && className !== '') {
            if (isSVG) {
                dom.setAttribute('class', className);
            }
            else {
                dom.className = className;
            }
        }
        if (!isNull(parentDom)) {
            appendChild(parentDom, dom);
        }
        if ((childFlags & 1 /* HasInvalidChildren */) === 0) {
            var childrenIsSVG = isSVG === true && vNode.type !== 'foreignObject';
            if (childFlags & 2 /* HasVNodeChildren */) {
                mount(children, dom, lifecycle, context, childrenIsSVG);
            }
            else if (childFlags & 12 /* MultipleChildren */) {
                mountArrayChildren(children, dom, lifecycle, context, childrenIsSVG);
            }
        }
        if (!isNull(props)) {
            mountProps(vNode, flags, props, dom, isSVG);
        }
        {
            if (isString(ref)) {
                throwError('string "refs" are not supported in Inferno 1.0. Use callback "refs" instead.');
            }
        }
        if (isFunction(ref)) {
            mountRef(dom, ref, lifecycle);
        }
        return dom;
    }
    function mountArrayChildren(children, dom, lifecycle, context, isSVG) {
        for (var i = 0, len = children.length; i < len; i++) {
            var child = children[i];
            if (!isNull(child.dom)) {
                children[i] = child = directClone(child);
            }
            mount(child, dom, lifecycle, context, isSVG);
        }
    }
    function mountComponent(vNode, parentDom, lifecycle, context, isSVG, isClass) {
        var dom;
        var type = vNode.type;
        var props = vNode.props || EMPTY_OBJ;
        var ref = vNode.ref;
        if (isClass) {
            var instance = createClassComponentInstance(vNode, type, props, context, lifecycle);
            var input = instance.$LI;
            vNode.dom = dom = mount(input, null, lifecycle, instance.$CX, isSVG);
            mountClassComponentCallbacks(vNode, ref, instance, lifecycle);
            instance.$UPD = false;
        }
        else {
            var input$1 = handleComponentInput(type(props, context), vNode);
            vNode.dom = dom = mount(input$1, null, lifecycle, context, isSVG);
            vNode.children = input$1;
            mountFunctionalComponentCallbacks(props, ref, dom, lifecycle);
        }
        if (!isNull(parentDom)) {
            appendChild(parentDom, dom);
        }
        return dom;
    }
    function createClassMountCallback(instance, hasAfterMount, afterMount, vNode, hasDidMount) {
        return function () {
            instance.$UPD = true;
            if (hasAfterMount) {
                afterMount(vNode);
            }
            if (hasDidMount) {
                instance.componentDidMount();
            }
            instance.$UPD = false;
        };
    }
    function mountClassComponentCallbacks(vNode, ref, instance, lifecycle) {
        if (isFunction(ref)) {
            ref(instance);
        }
        else {
            {
                if (isStringOrNumber(ref)) {
                    throwError('string "refs" are not supported in Inferno 1.0. Use callback "refs" instead.');
                }
                else if (!isNullOrUndef(ref) &&
                    isObject(ref) &&
                    vNode.flags & 4 /* ComponentClass */) {
                    throwError('functional component lifecycle events are not supported on ES2015 class components.');
                }
            }
        }
        var hasDidMount = isFunction(instance.componentDidMount);
        var afterMount = options.afterMount;
        var hasAfterMount = isFunction(afterMount);
        if (hasDidMount || hasAfterMount) {
            lifecycle.push(createClassMountCallback(instance, hasAfterMount, afterMount, vNode, hasDidMount));
        }
    }
    // Create did mount callback lazily to avoid creating function context if not needed
    function createOnMountCallback(ref, dom, props) {
        return function () { return ref.onComponentDidMount(dom, props); };
    }
    function mountFunctionalComponentCallbacks(props, ref, dom, lifecycle) {
        if (!isNullOrUndef(ref)) {
            if (isFunction(ref.onComponentWillMount)) {
                ref.onComponentWillMount(props);
            }
            if (isFunction(ref.onComponentDidMount)) {
                lifecycle.push(createOnMountCallback(ref, dom, props));
            }
        }
    }
    function mountRef(dom, value, lifecycle) {
        lifecycle.push(function () { return value(dom); });
    }

    /**
     * @module Inferno
     */ /** TypeDoc Comment */
    function hydrateComponent(vNode, dom, lifecycle, context, isSVG, isClass) {
        var type = vNode.type;
        var ref = vNode.ref;
        var props = vNode.props || EMPTY_OBJ;
        if (isClass) {
            var instance = createClassComponentInstance(vNode, type, props, context, lifecycle);
            var input = instance.$LI;
            hydrate(input, dom, lifecycle, instance.$CX, isSVG);
            vNode.dom = input.dom;
            mountClassComponentCallbacks(vNode, ref, instance, lifecycle);
            instance.$UPD = false; // Mount finished allow going sync
        }
        else {
            var input$1 = handleComponentInput(type(props, context), vNode);
            hydrate(input$1, dom, lifecycle, context, isSVG);
            vNode.children = input$1;
            vNode.dom = input$1.dom;
            mountFunctionalComponentCallbacks(props, ref, dom, lifecycle);
        }
    }
    function hydrateElement(vNode, dom, lifecycle, context, isSVG) {
        var children = vNode.children;
        var props = vNode.props;
        var className = vNode.className;
        var flags = vNode.flags;
        var ref = vNode.ref;
        isSVG = isSVG || (flags & 32 /* SvgElement */) > 0;
        if (dom.nodeType !== 1 || dom.tagName.toLowerCase() !== vNode.type) {
            {
                warning("Inferno hydration: Server-side markup doesn't match client-side markup or Initial render target is not empty");
            }
            var newDom = mountElement(vNode, null, lifecycle, context, isSVG);
            vNode.dom = newDom;
            replaceChild(dom.parentNode, newDom, dom);
        }
        else {
            vNode.dom = dom;
            var childNode = dom.firstChild;
            var childFlags = vNode.childFlags;
            if ((childFlags & 1 /* HasInvalidChildren */) === 0) {
                while (childNode) {
                    if (childNode.nodeType === 8) {
                        if (childNode.data === '!') {
                            var placeholder = document.createTextNode('');
                            dom.replaceChild(placeholder, childNode);
                            childNode = childNode.nextSibling;
                        }
                        else {
                            var lastDom = childNode.previousSibling;
                            dom.removeChild(childNode);
                            childNode = lastDom || dom.firstChild;
                        }
                    }
                    else {
                        childNode = childNode.nextSibling;
                    }
                }
                childNode = dom.firstChild;
                if (childFlags & 2 /* HasVNodeChildren */) {
                    if (isNull(childNode)) {
                        mount(children, dom, lifecycle, context, isSVG);
                    }
                    else {
                        var nextSibling = childNode.nextSibling;
                        hydrate(children, childNode, lifecycle, context, isSVG);
                        childNode = nextSibling;
                    }
                }
                else if (childFlags & 12 /* MultipleChildren */) {
                    for (var i = 0, len = children.length; i < len; i++) {
                        var child = children[i];
                        if (isNull(childNode)) {
                            mount(child, dom, lifecycle, context, isSVG);
                        }
                        else {
                            var nextSibling$1 = childNode.nextSibling;
                            hydrate(child, childNode, lifecycle, context, isSVG);
                            childNode = nextSibling$1;
                        }
                    }
                }
                // clear any other DOM nodes, there should be only a single entry for the root
                while (childNode) {
                    var nextSibling$2 = childNode.nextSibling;
                    dom.removeChild(childNode);
                    childNode = nextSibling$2;
                }
            }
            else if (!isNull(dom.firstChild) && !isSamePropsInnerHTML(dom, props)) {
                dom.textContent = ''; // dom has content, but VNode has no children remove everything from DOM
            }
            if (!isNull(props)) {
                mountProps(vNode, flags, props, dom, isSVG);
            }
            if (isNullOrUndef(className)) {
                if (dom.className !== '') {
                    dom.removeAttribute('class');
                }
            }
            else if (isSVG) {
                dom.setAttribute('class', className);
            }
            else {
                dom.className = className;
            }
            if (isFunction(ref)) {
                mountRef(dom, ref, lifecycle);
            }
            else {
                {
                    if (isString(ref)) {
                        throwError('string "refs" are not supported in Inferno 1.0. Use callback "refs" instead.');
                    }
                }
            }
        }
    }
    function hydrateText(vNode, dom) {
        if (dom.nodeType !== 3) {
            var newDom = mountText(vNode, null);
            vNode.dom = newDom;
            replaceChild(dom.parentNode, newDom, dom);
        }
        else {
            var text = vNode.children;
            if (dom.nodeValue !== text) {
                dom.nodeValue = text;
            }
            vNode.dom = dom;
        }
    }
    function hydrate(vNode, dom, lifecycle, context, isSVG) {
        var flags = vNode.flags;
        if (flags & 14 /* Component */) {
            hydrateComponent(vNode, dom, lifecycle, context, isSVG, (flags & 4 /* ComponentClass */) > 0);
        }
        else if (flags & 481 /* Element */) {
            hydrateElement(vNode, dom, lifecycle, context, isSVG);
        }
        else if (flags & 16 /* Text */) {
            hydrateText(vNode, dom);
        }
        else if (flags & 512 /* Void */) {
            vNode.dom = dom;
        }
        else {
            {
                throwError(("hydrate() expects a valid VNode, instead it received an object with the type \"" + (typeof vNode) + "\"."));
            }
            throwError();
        }
    }
    function hydrateRoot(input, parentDom, lifecycle) {
        var dom = parentDom.firstChild;
        if (!isNull(dom)) {
            hydrate(input, dom, lifecycle, EMPTY_OBJ, false);
            dom = parentDom.firstChild;
            // clear any other DOM nodes, there should be only a single entry for the root
            while ((dom = dom.nextSibling)) {
                parentDom.removeChild(dom);
            }
            return true;
        }
        return false;
    }

    /**
     * @module Inferno
     */
    /** TypeDoc Comment */
    function replaceWithNewNode(lastNode, nextNode, parentDom, lifecycle, context, isSVG) {
        unmount(lastNode);
        replaceChild(parentDom, mount(nextNode, null, lifecycle, context, isSVG), lastNode.dom);
    }
    function patch(lastVNode, nextVNode, parentDom, lifecycle, context, isSVG) {
        if (lastVNode !== nextVNode) {
            var nextFlags = nextVNode.flags;
            if (lastVNode.flags !== nextFlags || nextFlags & 2048 /* ReCreate */) {
                replaceWithNewNode(lastVNode, nextVNode, parentDom, lifecycle, context, isSVG);
            }
            else if (nextFlags & 481 /* Element */) {
                patchElement(lastVNode, nextVNode, parentDom, lifecycle, context, isSVG);
            }
            else if (nextFlags & 14 /* Component */) {
                patchComponent(lastVNode, nextVNode, parentDom, lifecycle, context, isSVG, (nextFlags & 4 /* ComponentClass */) > 0);
            }
            else if (nextFlags & 16 /* Text */) {
                patchText(lastVNode, nextVNode, parentDom);
            }
            else if (nextFlags & 512 /* Void */) {
                nextVNode.dom = lastVNode.dom;
            }
            else {
                // Portal
                patchPortal(lastVNode, nextVNode, lifecycle, context);
            }
        }
    }
    function patchPortal(lastVNode, nextVNode, lifecycle, context) {
        var lastContainer = lastVNode.type;
        var nextContainer = nextVNode.type;
        var nextChildren = nextVNode.children;
        patchChildren(lastVNode.childFlags, nextVNode.childFlags, lastVNode.children, nextChildren, lastContainer, lifecycle, context, false);
        nextVNode.dom = lastVNode.dom;
        if (lastContainer !== nextContainer && !isInvalid(nextChildren)) {
            var node = nextChildren.dom;
            lastContainer.removeChild(node);
            nextContainer.appendChild(node);
        }
    }
    function patchElement(lastVNode, nextVNode, parentDom, lifecycle, context, isSVG) {
        var nextTag = nextVNode.type;
        if (lastVNode.type !== nextTag) {
            replaceWithNewNode(lastVNode, nextVNode, parentDom, lifecycle, context, isSVG);
        }
        else {
            var dom = lastVNode.dom;
            var nextFlags = nextVNode.flags;
            var lastProps = lastVNode.props;
            var nextProps = nextVNode.props;
            var isFormElement = false;
            var hasControlledValue = false;
            var nextPropsOrEmpty;
            nextVNode.dom = dom;
            isSVG = isSVG || (nextFlags & 32 /* SvgElement */) > 0;
            // inlined patchProps  -- starts --
            if (lastProps !== nextProps) {
                var lastPropsOrEmpty = lastProps || EMPTY_OBJ;
                nextPropsOrEmpty = nextProps || EMPTY_OBJ;
                if (nextPropsOrEmpty !== EMPTY_OBJ) {
                    isFormElement = (nextFlags & 448 /* FormElement */) > 0;
                    if (isFormElement) {
                        hasControlledValue = isControlledFormElement(nextPropsOrEmpty);
                    }
                    for (var prop in nextPropsOrEmpty) {
                        patchProp(prop, lastPropsOrEmpty[prop], nextPropsOrEmpty[prop], dom, isSVG, hasControlledValue, lastVNode);
                    }
                }
                if (lastPropsOrEmpty !== EMPTY_OBJ) {
                    for (var prop$1 in lastPropsOrEmpty) {
                        // do not add a hasOwnProperty check here, it affects performance
                        if (!nextPropsOrEmpty.hasOwnProperty(prop$1) &&
                            !isNullOrUndef(lastPropsOrEmpty[prop$1])) {
                            if (strictProps.has(prop$1)) {
                                // When removing value of select element, it needs to be set to null instead empty string, because empty string is valid value for option which makes that option selected
                                // MS IE/Edge don't follow html spec for textArea and input elements and we need to set empty string to value in those cases to avoid "null" and "undefined" texts
                                dom[prop$1] = nextFlags & 256 /* SelectElement */ ? null : '';
                            }
                            else if (prop$1 === 'style') {
                                dom.removeAttribute('style');
                            }
                            else if (delegatedEvents.has(prop$1)) {
                                handleEvent(prop$1, null, dom);
                            }
                            else if (isAttrAnEvent(prop$1)) {
                                patchEvent(prop$1, lastPropsOrEmpty[prop$1], null, dom);
                            }
                            else if (prop$1 === 'dangerouslySetInnerHTML') {
                                dom.textContent = '';
                            }
                            else {
                                dom.removeAttribute(prop$1);
                            }
                        }
                    }
                }
            }
            var lastChildren = lastVNode.children;
            var nextChildren = nextVNode.children;
            var nextRef = nextVNode.ref;
            var lastClassName = lastVNode.className;
            var nextClassName = nextVNode.className;
            if (lastChildren !== nextChildren) {
                {
                    validateKeys(nextVNode, nextVNode.childFlags & 8 /* HasKeyedChildren */);
                }
                patchChildren(lastVNode.childFlags, nextVNode.childFlags, lastChildren, nextChildren, dom, lifecycle, context, isSVG && nextTag !== 'foreignObject');
            }
            if (isFormElement) {
                processElement(nextFlags, nextVNode, dom, nextPropsOrEmpty, false, hasControlledValue);
            }
            // inlined patchProps  -- ends --
            if (lastClassName !== nextClassName) {
                if (isNullOrUndef(nextClassName)) {
                    dom.removeAttribute('class');
                }
                else if (isSVG) {
                    dom.setAttribute('class', nextClassName);
                }
                else {
                    dom.className = nextClassName;
                }
            }
            if (isFunction(nextRef) && lastVNode.ref !== nextRef) {
                mountRef(dom, nextRef, lifecycle);
            }
            else {
                {
                    if (isString(nextRef)) {
                        throwError('string "refs" are not supported in Inferno 1.0. Use callback "refs" instead.');
                    }
                }
            }
        }
    }
    function patchChildren(lastChildFlags, nextChildFlags, lastChildren, nextChildren, parentDOM, lifecycle, context, isSVG) {
        if (lastChildFlags & 2 /* HasVNodeChildren */) {
            if (nextChildFlags & 2 /* HasVNodeChildren */) {
                patch(lastChildren, nextChildren, parentDOM, lifecycle, context, isSVG);
            }
            else if (nextChildFlags & 1 /* HasInvalidChildren */) {
                remove(lastChildren, parentDOM);
            }
            else {
                remove(lastChildren, parentDOM);
                mountArrayChildren(nextChildren, parentDOM, lifecycle, context, isSVG);
            }
        }
        else if (lastChildFlags & 1 /* HasInvalidChildren */) {
            if (nextChildFlags & 1 /* HasInvalidChildren */) {
                return;
            }
            if (nextChildFlags & 2 /* HasVNodeChildren */) {
                mount(nextChildren, parentDOM, lifecycle, context, isSVG);
            }
            else {
                mountArrayChildren(nextChildren, parentDOM, lifecycle, context, isSVG);
            }
        }
        else {
            if (nextChildFlags & 12 /* MultipleChildren */) {
                var lastLength = lastChildren.length;
                var nextLength = nextChildren.length;
                // Fast path's for both algorithms
                if (lastLength === 0) {
                    if (nextLength > 0) {
                        mountArrayChildren(nextChildren, parentDOM, lifecycle, context, isSVG);
                    }
                }
                else if (nextLength === 0) {
                    removeAllChildren(parentDOM, lastChildren);
                }
                else {
                    if (nextChildFlags & 8 /* HasKeyedChildren */ &&
                        lastChildFlags & 8 /* HasKeyedChildren */) {
                        patchKeyedChildren(lastChildren, nextChildren, parentDOM, lifecycle, context, isSVG, lastLength, nextLength);
                    }
                    else {
                        patchNonKeyedChildren(lastChildren, nextChildren, parentDOM, lifecycle, context, isSVG, lastLength, nextLength);
                    }
                }
            }
            else if (nextChildFlags & 1 /* HasInvalidChildren */) {
                removeAllChildren(parentDOM, lastChildren);
            }
            else {
                removeAllChildren(parentDOM, lastChildren);
                mount(nextChildren, parentDOM, lifecycle, context, isSVG);
            }
        }
    }
    function updateClassComponent(instance, nextState, nextVNode, nextProps, parentDom, lifecycle, context, isSVG, force, fromSetState) {
        var lastState = instance.state;
        var lastProps = instance.props;
        nextVNode.children = instance;
        var lastInput = instance.$LI;
        var renderOutput;
        if (instance.$UN) {
            {
                throwError('Inferno Error: Can only update a mounted or mounting component. This usually means you called setState() or forceUpdate() on an unmounted component. This is a no-op.');
            }
            return;
        }
        if (lastProps !== nextProps || nextProps === EMPTY_OBJ) {
            if (!fromSetState && isFunction(instance.componentWillReceiveProps)) {
                instance.$BR = true;
                instance.componentWillReceiveProps(nextProps, context);
                // If instance component was removed during its own update do nothing...
                if (instance.$UN) {
                    return;
                }
                instance.$BR = false;
            }
            if (instance.$PSS) {
                nextState = combineFrom(nextState, instance.$PS);
                instance.$PSS = false;
                instance.$PS = null;
            }
        }
        /* Update if scu is not defined, or it returns truthy value or force */
        var hasSCU = isFunction(instance.shouldComponentUpdate);
        if (force ||
            !hasSCU ||
            (hasSCU &&
                instance.shouldComponentUpdate(nextProps, nextState, context))) {
            if (isFunction(instance.componentWillUpdate)) {
                instance.$BS = true;
                instance.componentWillUpdate(nextProps, nextState, context);
                instance.$BS = false;
            }
            instance.props = nextProps;
            instance.state = nextState;
            instance.context = context;
            if (isFunction(options.beforeRender)) {
                options.beforeRender(instance);
            }
            renderOutput = instance.render(nextProps, nextState, context);
            if (isFunction(options.afterRender)) {
                options.afterRender(instance);
            }
            var didUpdate = renderOutput !== NO_OP;
            var childContext;
            if (isFunction(instance.getChildContext)) {
                childContext = instance.getChildContext();
            }
            if (isNullOrUndef(childContext)) {
                childContext = context;
            }
            else {
                childContext = combineFrom(context, childContext);
            }
            instance.$CX = childContext;
            if (didUpdate) {
                var nextInput = (instance.$LI = handleComponentInput(renderOutput, nextVNode));
                patch(lastInput, nextInput, parentDom, lifecycle, childContext, isSVG);
                if (isFunction(instance.componentDidUpdate)) {
                    instance.componentDidUpdate(lastProps, lastState);
                }
                if (isFunction(options.afterUpdate)) {
                    options.afterUpdate(nextVNode);
                }
            }
        }
        else {
            instance.props = nextProps;
            instance.state = nextState;
            instance.context = context;
        }
        nextVNode.dom = instance.$LI.dom;
    }
    function patchComponent(lastVNode, nextVNode, parentDom, lifecycle, context, isSVG, isClass) {
        var nextType = nextVNode.type;
        var lastKey = lastVNode.key;
        var nextKey = nextVNode.key;
        if (lastVNode.type !== nextType || lastKey !== nextKey) {
            replaceWithNewNode(lastVNode, nextVNode, parentDom, lifecycle, context, isSVG);
        }
        else {
            var nextProps = nextVNode.props || EMPTY_OBJ;
            if (isClass) {
                var instance = lastVNode.children;
                instance.$UPD = true;
                updateClassComponent(instance, instance.state, nextVNode, nextProps, parentDom, lifecycle, context, isSVG, false, false);
                instance.$V = nextVNode;
                instance.$UPD = false;
            }
            else {
                var shouldUpdate = true;
                var lastProps = lastVNode.props;
                var nextHooks = nextVNode.ref;
                var nextHooksDefined = !isNullOrUndef(nextHooks);
                var lastInput = lastVNode.children;
                nextVNode.dom = lastVNode.dom;
                nextVNode.children = lastInput;
                if (nextHooksDefined && isFunction(nextHooks.onComponentShouldUpdate)) {
                    shouldUpdate = nextHooks.onComponentShouldUpdate(lastProps, nextProps);
                }
                if (shouldUpdate !== false) {
                    if (nextHooksDefined && isFunction(nextHooks.onComponentWillUpdate)) {
                        nextHooks.onComponentWillUpdate(lastProps, nextProps);
                    }
                    var nextInput = nextType(nextProps, context);
                    if (nextInput !== NO_OP) {
                        nextInput = handleComponentInput(nextInput, nextVNode);
                        patch(lastInput, nextInput, parentDom, lifecycle, context, isSVG);
                        nextVNode.children = nextInput;
                        nextVNode.dom = nextInput.dom;
                        if (nextHooksDefined && isFunction(nextHooks.onComponentDidUpdate)) {
                            nextHooks.onComponentDidUpdate(lastProps, nextProps);
                        }
                    }
                }
                else if (lastInput.flags & 14 /* Component */) {
                    lastInput.parentVNode = nextVNode;
                }
            }
        }
    }
    function patchText(lastVNode, nextVNode, parentDom) {
        var nextText = nextVNode.children;
        var textNode = parentDom.firstChild;
        var dom;
        // Guard against external change on DOM node.
        if (isNull(textNode)) {
            parentDom.textContent = nextText;
            dom = parentDom.firstChild;
        }
        else {
            dom = lastVNode.dom;
            if (nextText !== lastVNode.children) {
                dom.nodeValue = nextText;
            }
        }
        nextVNode.dom = dom;
    }
    function patchNonKeyedChildren(lastChildren, nextChildren, dom, lifecycle, context, isSVG, lastChildrenLength, nextChildrenLength) {
        var commonLength = lastChildrenLength > nextChildrenLength
            ? nextChildrenLength
            : lastChildrenLength;
        var i = 0;
        for (; i < commonLength; i++) {
            var nextChild = nextChildren[i];
            if (nextChild.dom) {
                nextChild = nextChildren[i] = directClone(nextChild);
            }
            patch(lastChildren[i], nextChild, dom, lifecycle, context, isSVG);
        }
        if (lastChildrenLength < nextChildrenLength) {
            for (i = commonLength; i < nextChildrenLength; i++) {
                var nextChild$1 = nextChildren[i];
                if (nextChild$1.dom) {
                    nextChild$1 = nextChildren[i] = directClone(nextChild$1);
                }
                appendChild(dom, mount(nextChild$1, null, lifecycle, context, isSVG));
            }
        }
        else if (lastChildrenLength > nextChildrenLength) {
            for (i = commonLength; i < lastChildrenLength; i++) {
                remove(lastChildren[i], dom);
            }
        }
    }
    function patchKeyedChildren(a, b, dom, lifecycle, context, isSVG, aLength, bLength) {
        var aEnd = aLength - 1;
        var bEnd = bLength - 1;
        var aStart = 0;
        var bStart = 0;
        var i;
        var j;
        var aNode;
        var bNode;
        var nextNode;
        var nextPos;
        var node;
        var aStartNode = a[aStart];
        var bStartNode = b[bStart];
        var aEndNode = a[aEnd];
        var bEndNode = b[bEnd];
        if (bStartNode.dom) {
            b[bStart] = bStartNode = directClone(bStartNode);
        }
        if (bEndNode.dom) {
            b[bEnd] = bEndNode = directClone(bEndNode);
        }
        // Step 1
        // tslint:disable-next-line
        outer: {
            // Sync nodes with the same key at the beginning.
            while (aStartNode.key === bStartNode.key) {
                patch(aStartNode, bStartNode, dom, lifecycle, context, isSVG);
                aStart++;
                bStart++;
                if (aStart > aEnd || bStart > bEnd) {
                    break outer;
                }
                aStartNode = a[aStart];
                bStartNode = b[bStart];
                if (bStartNode.dom) {
                    b[bStart] = bStartNode = directClone(bStartNode);
                }
            }
            // Sync nodes with the same key at the end.
            while (aEndNode.key === bEndNode.key) {
                patch(aEndNode, bEndNode, dom, lifecycle, context, isSVG);
                aEnd--;
                bEnd--;
                if (aStart > aEnd || bStart > bEnd) {
                    break outer;
                }
                aEndNode = a[aEnd];
                bEndNode = b[bEnd];
                if (bEndNode.dom) {
                    b[bEnd] = bEndNode = directClone(bEndNode);
                }
            }
        }
        if (aStart > aEnd) {
            if (bStart <= bEnd) {
                nextPos = bEnd + 1;
                nextNode = nextPos < bLength ? b[nextPos].dom : null;
                while (bStart <= bEnd) {
                    node = b[bStart];
                    if (node.dom) {
                        b[bStart] = node = directClone(node);
                    }
                    bStart++;
                    insertOrAppend(dom, mount(node, null, lifecycle, context, isSVG), nextNode);
                }
            }
        }
        else if (bStart > bEnd) {
            while (aStart <= aEnd) {
                remove(a[aStart++], dom);
            }
        }
        else {
            var aLeft = aEnd - aStart + 1;
            var bLeft = bEnd - bStart + 1;
            var sources = new Array(bLeft).fill(-1);
            var moved = false;
            var pos = 0;
            var patched = 0;
            // When sizes are small, just loop them through
            if (bLeft <= 4 || aLeft * bLeft <= 16) {
                for (i = aStart; i <= aEnd; i++) {
                    aNode = a[i];
                    if (patched < bLeft) {
                        for (j = bStart; j <= bEnd; j++) {
                            bNode = b[j];
                            if (aNode.key === bNode.key) {
                                sources[j - bStart] = i;
                                if (pos > j) {
                                    moved = true;
                                }
                                else {
                                    pos = j;
                                }
                                if (bNode.dom) {
                                    b[j] = bNode = directClone(bNode);
                                }
                                patch(aNode, bNode, dom, lifecycle, context, isSVG);
                                patched++;
                                a[i] = null;
                                break;
                            }
                        }
                    }
                }
            }
            else {
                var keyIndex = new Map();
                // Map keys by their index in array
                for (i = bStart; i <= bEnd; i++) {
                    keyIndex.set(b[i].key, i);
                }
                // Try to patch same keys
                for (i = aStart; i <= aEnd; i++) {
                    aNode = a[i];
                    if (patched < bLeft) {
                        j = keyIndex.get(aNode.key);
                        if (!isUndefined(j)) {
                            bNode = b[j];
                            sources[j - bStart] = i;
                            if (pos > j) {
                                moved = true;
                            }
                            else {
                                pos = j;
                            }
                            if (bNode.dom) {
                                b[j] = bNode = directClone(bNode);
                            }
                            patch(aNode, bNode, dom, lifecycle, context, isSVG);
                            patched++;
                            a[i] = null;
                        }
                    }
                }
            }
            // fast-path: if nothing patched remove all old and add all new
            if (aLeft === aLength && patched === 0) {
                removeAllChildren(dom, a);
                mountArrayChildren(b, dom, lifecycle, context, isSVG);
            }
            else {
                i = aLeft - patched;
                while (i > 0) {
                    aNode = a[aStart++];
                    if (!isNull(aNode)) {
                        remove(aNode, dom);
                        i--;
                    }
                }
                if (moved) {
                    var seq = lis_algorithm(sources);
                    j = seq.length - 1;
                    for (i = bLeft - 1; i >= 0; i--) {
                        if (sources[i] === -1) {
                            pos = i + bStart;
                            node = b[pos];
                            if (node.dom) {
                                b[pos] = node = directClone(node);
                            }
                            nextPos = pos + 1;
                            insertOrAppend(dom, mount(node, null, lifecycle, context, isSVG), nextPos < bLength ? b[nextPos].dom : null);
                        }
                        else if (j < 0 || i !== seq[j]) {
                            pos = i + bStart;
                            node = b[pos];
                            nextPos = pos + 1;
                            insertOrAppend(dom, node.dom, nextPos < bLength ? b[nextPos].dom : null);
                        }
                        else {
                            j--;
                        }
                    }
                }
                else if (patched !== bLeft) {
                    // when patched count doesn't match b length we need to insert those new ones
                    // loop backwards so we can use insertBefore
                    for (i = bLeft - 1; i >= 0; i--) {
                        if (sources[i] === -1) {
                            pos = i + bStart;
                            node = b[pos];
                            if (node.dom) {
                                b[pos] = node = directClone(node);
                            }
                            nextPos = pos + 1;
                            insertOrAppend(dom, mount(node, null, lifecycle, context, isSVG), nextPos < bLength ? b[nextPos].dom : null);
                        }
                    }
                }
            }
        }
    }
    // // https://en.wikipedia.org/wiki/Longest_increasing_subsequence
    function lis_algorithm(arr) {
        var p = arr.slice();
        var result = [0];
        var i;
        var j;
        var u;
        var v;
        var c;
        var len = arr.length;
        for (i = 0; i < len; i++) {
            var arrI = arr[i];
            if (arrI !== -1) {
                j = result[result.length - 1];
                if (arr[j] < arrI) {
                    p[i] = j;
                    result.push(i);
                    continue;
                }
                u = 0;
                v = result.length - 1;
                while (u < v) {
                    c = ((u + v) / 2) | 0;
                    if (arr[result[c]] < arrI) {
                        u = c + 1;
                    }
                    else {
                        v = c;
                    }
                }
                if (arrI < arr[result[u]]) {
                    if (u > 0) {
                        p[i] = result[u - 1];
                    }
                    result[u] = i;
                }
            }
        }
        u = result.length;
        v = result[u - 1];
        while (u-- > 0) {
            result[u] = v;
            v = p[v];
        }
        return result;
    }

    /**
     * @module Inferno
     */ /** TypeDoc Comment */
    var roots = options.roots;
    {
        if (isBrowser && document.body === null) {
            warning('Inferno warning: you cannot initialize inferno without "document.body". Wait on "DOMContentLoaded" event, add script to bottom of body, or use async/defer attributes on script tag.');
        }
    }
    var documentBody = isBrowser ? document.body : null;
    function render(input, parentDom, callback) {
        // Development warning
        {
            if (documentBody === parentDom) {
                throwError('you cannot render() to the "document.body". Use an empty element as a container instead.');
            }
        }
        if (input === NO_OP) {
            return;
        }
        var lifecycle = [];
        var rootInput = roots.get(parentDom);
        if (isUndefined(rootInput)) {
            if (!isInvalid(input)) {
                if (input.dom) {
                    input = directClone(input);
                }
                if (!hydrateRoot(input, parentDom, lifecycle)) {
                    mount(input, parentDom, lifecycle, EMPTY_OBJ, false);
                }
                roots.set(parentDom, input);
                rootInput = input;
            }
        }
        else {
            if (isNullOrUndef(input)) {
                remove(rootInput, parentDom);
                roots.delete(parentDom);
            }
            else {
                if (input.dom) {
                    input = directClone(input);
                }
                patch(rootInput, input, parentDom, lifecycle, EMPTY_OBJ, false);
                roots.set(parentDom, input);
                rootInput = input;
            }
        }
        if (lifecycle.length > 0) {
            callAll(lifecycle);
        }
        if (isFunction(callback)) {
            callback();
        }
        if (rootInput && rootInput.flags & 14 /* Component */) {
            return rootInput.children;
        }
    }
    function createRenderer(parentDom) {
        return function renderer(lastInput, nextInput) {
            if (!parentDom) {
                parentDom = lastInput;
            }
            render(nextInput, parentDom);
        };
    }
    function createPortal(children, container) {
        return normalizeChildren(createVNode(1024 /* Portal */, container, null, null, 0, null, isInvalid(children) ? null : children.key, null), children);
    }

    /**
     * @module Inferno
     */
    /** TypeDoc Comment */
    var resolvedPromise = Promise.resolve();
    function queueStateChanges(component, newState, callback) {
        if (isFunction(newState)) {
            newState = newState(component.state, component.props, component.context);
        }
        var pending = component.$PS;
        if (isNullOrUndef(pending)) {
            component.$PS = newState;
        }
        else {
            for (var stateKey in newState) {
                pending[stateKey] = newState[stateKey];
            }
        }
        if (!component.$PSS && !component.$BR) {
            if (!component.$UPD) {
                component.$PSS = true;
                component.$UPD = true;
                applyState(component, false, callback);
                component.$UPD = false;
            }
            else {
                // Async
                var queue = component.$QU;
                if (isNull(queue)) {
                    queue = component.$QU = [];
                    resolvedPromise.then(promiseCallback(component, queue));
                }
                if (isFunction(callback)) {
                    queue.push(callback);
                }
            }
        }
        else {
            component.$PSS = true;
            if (component.$BR && isFunction(callback)) {
                component._lifecycle.push(callback.bind(component));
            }
        }
    }
    function promiseCallback(component, queue) {
        return function () {
            component.$QU = null;
            component.$UPD = true;
            applyState(component, false, function () {
                for (var i = 0, len = queue.length; i < len; i++) {
                    queue[i].call(component);
                }
            });
            component.$UPD = false;
        };
    }
    function applyState(component, force, callback) {
        if (component.$UN) {
            return;
        }
        if (force || !component.$BR) {
            component.$PSS = false;
            var pendingState = component.$PS;
            var prevState = component.state;
            var nextState = combineFrom(prevState, pendingState);
            var props = component.props;
            var context = component.context;
            component.$PS = null;
            var vNode = component.$V;
            var lastInput = component.$LI;
            var parentDom = lastInput.dom && lastInput.dom.parentNode;
            updateClassComponent(component, nextState, vNode, props, parentDom, component._lifecycle, context, (vNode.flags & 32 /* SvgElement */) > 0, force, true);
            if (component.$UN) {
                return;
            }
            if ((component.$LI.flags & 1024 /* Portal */) === 0) {
                var dom = component.$LI.dom;
                while (!isNull((vNode = vNode.parentVNode))) {
                    if ((vNode.flags & 14 /* Component */) > 0) {
                        vNode.dom = dom;
                    }
                }
            }
            if (component._lifecycle.length > 0) {
                callAll(component._lifecycle);
            }
        }
        else {
            component.state = component.$PS;
            component.$PS = null;
        }
        if (isFunction(callback)) {
            callback.call(component);
        }
    }
    var Component = function Component(props, context) {
        this.state = null;
        // Internal properties
        this.$BR = false; // BLOCK RENDER
        this.$BS = true; // BLOCK STATE
        this.$PSS = false; // PENDING SET STATE
        this.$PS = null; // PENDING STATE (PARTIAL or FULL)
        this.$LI = null; // LAST INPUT
        this.$V = null; // VNODE
        this.$UN = false; // UNMOUNTED
        this._lifecycle = null; // TODO: Remove this from here, lifecycle should be pure.
        this.$CX = null; // CHILDCONTEXT
        this.$UPD = true; // UPDATING
        this.$QU = null; // QUEUE
        /** @type {object} */
        this.props = props || EMPTY_OBJ;
        /** @type {object} */
        this.context = context || EMPTY_OBJ; // context should not be mutable
    };
    Component.prototype.forceUpdate = function forceUpdate (callback) {
        if (this.$UN) {
            return;
        }
        applyState(this, true, callback);
    };
    Component.prototype.setState = function setState (newState, callback) {
        if (this.$UN) {
            return;
        }
        if (!this.$BS) {
            queueStateChanges(this, newState, callback);
        }
        else {
            // Development warning
            {
                throwError('cannot update state via setState() in componentWillUpdate() or constructor.');
            }
            return;
        }
    };
    // tslint:disable-next-line:no-empty
    Component.prototype.render = function render (nextProps, nextState, nextContext) { };
    // Public
    Component.defaultProps = null;

    /**
     * @module Inferno
     */
    /** TypeDoc Comment */
    /* tslint:disable:object-literal-sort-keys */
    {
        /* tslint:disable-next-line:no-empty */
        var testFunc = function testFn() { };
        if ((testFunc.name || testFunc.toString()).indexOf('testFn') ===
            -1) {
            warning("It looks like you're using a minified copy of the development build " +
                'of Inferno. When deploying Inferno apps to production, make sure to use ' +
                'the production build which skips development warnings and is faster. ' +
                'See http://infernojs.org for more details.');
        }
    }
    var version = "4.0.0-16";

    exports.Component = Component;
    exports.EMPTY_OBJ = EMPTY_OBJ;
    exports.NO_OP = NO_OP;
    exports.createComponentVNode = createComponentVNode;
    exports.createPortal = createPortal;
    exports.createRenderer = createRenderer;
    exports.createTextVNode = createTextVNode;
    exports.createVNode = createVNode;
    exports.directClone = directClone;
    exports.getFlagsForElementVnode = getFlagsForElementVnode;
    exports.isUnitlessNumber = isUnitlessNumber;
    exports.linkEvent = linkEvent;
    exports.normalizeChildren = normalizeChildren;
    exports.normalizeProps = normalizeProps;
    exports.options = options;
    exports.render = render;
    exports.version = version;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
