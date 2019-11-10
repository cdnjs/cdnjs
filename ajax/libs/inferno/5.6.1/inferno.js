(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (factory((global.Inferno = global.Inferno || {})));
}(this, (function (exports) { 'use strict';

    var NO_OP = '$NO_OP';
    var ERROR_MSG = 'a runtime error occured! Use Inferno in development environment to find the error.';
    var isBrowser = !!(typeof window !== 'undefined' && window.document);
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

    function getTagName(input) {
        var tagName;
        if (isArray(input)) {
            var arrayText = input.length > 3 ? input.slice(0, 3).toString() + ',...' : input.toString();
            tagName = 'Array(' + arrayText + ')';
        }
        else if (isStringOrNumber(input)) {
            tagName = 'Text(' + input + ')';
        }
        else if (isInvalid(input)) {
            tagName = 'InvalidVNode(' + input + ')';
        }
        else {
            var flags = input.flags;
            if (flags & 481 /* Element */) {
                tagName = "<" + (input.type) + (input.className ? ' class="' + input.className + '"' : '') + ">";
            }
            else if (flags & 16 /* Text */) {
                tagName = "Text(" + (input.children) + ")";
            }
            else if (flags & 1024 /* Portal */) {
                tagName = "Portal*";
            }
            else {
                var type = input.type;
                // Fallback for IE
                var componentName = type.name || type.displayName || type.constructor.name || (type.toString().match(/^function\s*([^\s(]+)/) || [])[1];
                tagName = "<" + componentName + " />";
            }
        }
        return '>> ' + tagName + '\n';
    }
    function DEV_ValidateKeys(vNodeTree, forceKeyed) {
        var foundKeys = {};
        for (var i = 0, len = vNodeTree.length; i < len; i++) {
            var childNode = vNodeTree[i];
            if (isArray(childNode)) {
                return 'Encountered ARRAY in mount, array must be flattened, or normalize used. Location: \n' + getTagName(childNode);
            }
            if (isInvalid(childNode)) {
                if (forceKeyed) {
                    return 'Encountered invalid node when preparing to keyed algorithm. Location: \n' + getTagName(childNode);
                }
                else if (Object.keys(foundKeys).length !== 0) {
                    return 'Encountered invalid node with mixed keys. Location: \n' + getTagName(childNode);
                }
                continue;
            }
            if (typeof childNode === 'object') {
                childNode.isValidated = true;
            }
            // Key can be undefined, null too. But typescript complains for no real reason
            var key = childNode.key;
            if (!isNullOrUndef(key) && !isStringOrNumber(key)) {
                return 'Encountered child vNode where key property is not string or number. Location: \n' + getTagName(childNode);
            }
            var children = childNode.children;
            var childFlags = childNode.childFlags;
            if (!isInvalid(children)) {
                var val = (void 0);
                if (childFlags & 12 /* MultipleChildren */) {
                    val = DEV_ValidateKeys(children, childNode.childFlags & 8 /* HasKeyedChildren */);
                }
                else if (childFlags === 2 /* HasVNodeChildren */) {
                    val = DEV_ValidateKeys([children], childNode.childFlags & 8 /* HasKeyedChildren */);
                }
                if (val) {
                    val += getTagName(childNode);
                    return val;
                }
            }
            if (forceKeyed && isNullOrUndef(key)) {
                return ('Encountered child without key during keyed algorithm. If this error points to Array make sure children is flat list. Location: \n' +
                    getTagName(childNode));
            }
            else if (!forceKeyed && isNullOrUndef(key)) {
                if (Object.keys(foundKeys).length !== 0) {
                    return 'Encountered children with key missing. Location: \n' + getTagName(childNode);
                }
                continue;
            }
            if (foundKeys[key]) {
                return 'Encountered two children with same key: {' + key + '}. Location: \n' + getTagName(childNode);
            }
            foundKeys[key] = true;
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
                var voidTypes = ['area', 'base', 'br', 'col', 'command', 'embed', 'hr', 'img', 'input', 'keygen', 'link', 'meta', 'param', 'source', 'track', 'wbr'];
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
    function validateKeys(vNode) {
        {
            // Checks if there is any key missing or duplicate keys
            if (vNode.isValidated === false && vNode.children && vNode.flags & 481 /* Element */) {
                var error = DEV_ValidateKeys(Array.isArray(vNode.children) ? vNode.children : [vNode.children], (vNode.childFlags & 8 /* HasKeyedChildren */) > 0);
                if (error) {
                    throwError(error + getTagName(vNode));
                }
            }
            vNode.isValidated = true;
        }
    }

    var keyPrefix = '$';
    function getVNode(childFlags, children, className, flags, key, props, ref, type) {
        {
            return {
                childFlags: childFlags,
                children: children,
                className: className,
                dom: null,
                flags: flags,
                isValidated: false,
                key: key === void 0 ? null : key,
                parentVNode: null,
                props: props === void 0 ? null : props,
                ref: ref === void 0 ? null : ref,
                type: type
            };
        }
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
        var childFlag = childFlags === void 0 ? 1 /* HasInvalidChildren */ : childFlags;
        var vNode = getVNode(childFlag, children, className, flags, key, props, ref, type);
        var optsVNode = options.createVNode;
        if (typeof optsVNode === 'function') {
            optsVNode(vNode);
        }
        if (childFlag === 0 /* UnknownChildren */) {
            normalizeChildren(vNode, vNode.children);
        }
        {
            validateVNodeElementChildren(vNode);
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
            flags = type.prototype && isFunction(type.prototype.render) ? 4 /* ComponentClass */ : 8 /* ComponentFunction */;
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
            var flags = vNode.flags;
            if (flags & 481 /* Element */) {
                if (props.children !== void 0 && isNullOrUndef(vNode.children)) {
                    normalizeChildren(vNode, props.children);
                }
                if (props.className !== void 0) {
                    vNode.className = props.className || null;
                    props.className = undefined;
                }
            }
            if (props.key !== void 0) {
                vNode.key = props.key;
                props.key = undefined;
            }
            if (props.ref !== void 0) {
                if (flags & 8 /* ComponentFunction */) {
                    vNode.ref = combineFrom(vNode.ref, props.ref);
                }
                else {
                    vNode.ref = props.ref;
                }
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
            newVNode = createVNode(flags, vNodeToClone.type, vNodeToClone.className, vNodeToClone.children, vNodeToClone.childFlags, vNodeToClone.props, vNodeToClone.key, vNodeToClone.ref);
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
        return createTextVNode('', null);
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
        var newChildFlags = 1 /* HasInvalidChildren */;
        // Don't change children to match strict equal (===) true in patching
        if (isInvalid(children)) {
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
                        var isPrefixed = !isNullKey && isString(key) && key[0] === keyPrefix;
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
        afterRender: null,
        beforeRender: null,
        createVNode: null,
        renderComplete: null
    };

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

    var xlinkNS = 'http://www.w3.org/1999/xlink';
    var xmlNS = 'http://www.w3.org/XML/1998/namespace';
    var svgNS = 'http://www.w3.org/2000/svg';
    var namespaces = {
        'xlink:actuate': xlinkNS,
        'xlink:arcrole': xlinkNS,
        'xlink:href': xlinkNS,
        'xlink:role': xlinkNS,
        'xlink:show': xlinkNS,
        'xlink:title': xlinkNS,
        'xlink:type': xlinkNS,
        'xml:base': xmlNS,
        'xml:lang': xmlNS,
        'xml:space': xmlNS
    };

    // We need EMPTY_OBJ defined in one place.
    // Its used for comparison so we cant inline it into shared
    var EMPTY_OBJ = {};
    var LIFECYCLE = [];
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
        if (isSVG) {
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
        while ((listener = arrayFn.shift()) !== undefined) {
            listener();
        }
    }

    var attachedEventCounts = {};
    var attachedEvents = {};
    function handleEvent(name, nextEvent, dom) {
        var eventsLeft = attachedEventCounts[name];
        var eventsObject = dom.$EV;
        if (nextEvent) {
            if (!eventsLeft) {
                attachedEvents[name] = attachEventToDocument(name);
                attachedEventCounts[name] = 0;
            }
            if (!eventsObject) {
                eventsObject = dom.$EV = {};
            }
            if (!eventsObject[name]) {
                attachedEventCounts[name]++;
            }
            eventsObject[name] = nextEvent;
        }
        else if (eventsObject && eventsObject[name]) {
            attachedEventCounts[name]--;
            if (eventsLeft === 1) {
                document.removeEventListener(normalizeEventName(name), attachedEvents[name]);
                attachedEvents[name] = null;
            }
            eventsObject[name] = nextEvent;
        }
    }
    function dispatchEvents(event, target, isClick, name, eventData) {
        var dom = target;
        while (!isNull(dom)) {
            // Html Nodes can be nested fe: span inside button in that scenario browser does not handle disabled attribute on parent,
            // because the event listener is on document.body
            // Don't process clicks on disabled elements
            if (isClick && dom.disabled) {
                return;
            }
            var eventsObject = dom.$EV;
            if (eventsObject) {
                var currentEvent = eventsObject[name];
                if (currentEvent) {
                    // linkEvent object
                    eventData.dom = dom;
                    if (currentEvent.event) {
                        currentEvent.event(currentEvent.data, event);
                    }
                    else {
                        currentEvent(event);
                    }
                    if (event.cancelBubble) {
                        return;
                    }
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
        if (!this.immediatePropagationStopped) {
            this.stopImmediatePropagation();
        }
    }
    function attachEventToDocument(name) {
        var docEvent = function (event) {
            var type = event.type;
            var isClick = type === 'click' || type === 'dblclick';
            if (isClick && event.button !== 0) {
                // Firefox incorrectly triggers click event for mid/right mouse buttons.
                // This bug has been active for 12 years.
                // https://bugzilla.mozilla.org/show_bug.cgi?id=184051
                event.stopPropagation();
                return false;
            }
            event.stopPropagation = stopPropagation;
            // Event data needs to be object to save reference to currentTarget getter
            var eventData = {
                dom: document
            };
            Object.defineProperty(event, 'currentTarget', {
                configurable: true,
                get: function get() {
                    return eventData.dom;
                }
            });
            dispatchEvents(event, event.target, isClick, name, eventData);
            return;
        };
        document.addEventListener(normalizeEventName(name), docEvent);
        return docEvent;
    }

    function isSameInnerHTML(dom, innerHTML) {
        var tempdom = document.createElement('i');
        tempdom.innerHTML = innerHTML;
        return tempdom.innerHTML === dom.innerHTML;
    }
    function isSamePropsInnerHTML(dom, props) {
        return Boolean(props && props.dangerouslySetInnerHTML && props.dangerouslySetInnerHTML.__html && isSameInnerHTML(dom, props.dangerouslySetInnerHTML.__html));
    }

    function triggerEventListener(props, methodName, e) {
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
    }
    function createWrappedFunction(methodName, applyValue) {
        var fnMethod = function (e) {
            e.stopPropagation();
            var vNode = this.$V;
            // If vNode is gone by the time event fires, no-op
            if (!vNode) {
                return;
            }
            var props = vNode.props || EMPTY_OBJ;
            var dom = vNode.dom;
            if (isString(methodName)) {
                triggerEventListener(props, methodName, e);
            }
            else {
                for (var i = 0; i < methodName.length; i++) {
                    triggerEventListener(props, methodName[i], e);
                }
            }
            if (isFunction(applyValue)) {
                var newVNode = this.$V;
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

    function isCheckedType(type) {
        return type === 'checkbox' || type === 'radio';
    }
    var onTextInputChange = createWrappedFunction('onInput', applyValueInput);
    var wrappedOnChange = createWrappedFunction(['onClick', 'onChange'], applyValueInput);
    /* tslint:disable-next-line:no-empty */
    function emptywrapper(event) {
        event.stopPropagation();
    }
    emptywrapper.wrapped = true;
    function inputEvents(dom, nextPropsOrEmpty) {
        if (isCheckedType(nextPropsOrEmpty.type)) {
            dom.onchange = wrappedOnChange;
            dom.onclick = emptywrapper;
        }
        else {
            dom.oninput = onTextInputChange;
        }
    }
    function applyValueInput(nextPropsOrEmpty, dom) {
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
            else if (childFlags === 2 /* HasVNodeChildren */) {
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
        if ((isArray(value) && value.indexOf(props.value) !== -1) || props.value === value) {
            dom.selected = true;
        }
        else if (!isNullOrUndef(value) || !isNullOrUndef(props.selected)) {
            dom.selected = props.selected || false;
        }
    }
    var onSelectChange = createWrappedFunction('onChange', applyValueSelect);
    function selectEvents(dom) {
        dom.onchange = onSelectChange;
    }
    function applyValueSelect(nextPropsOrEmpty, dom, mounting, vNode) {
        var multiplePropInBoolean = Boolean(nextPropsOrEmpty.multiple);
        if (!isNullOrUndef(nextPropsOrEmpty.multiple) && multiplePropInBoolean !== dom.multiple) {
            dom.multiple = multiplePropInBoolean;
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
            else if (childFlags === 2 /* HasVNodeChildren */) {
                updateChildOptionGroup(children, value);
            }
        }
    }

    var onTextareaInputChange = createWrappedFunction('onInput', applyValueTextArea);
    var wrappedOnChange$1 = createWrappedFunction('onChange');
    function textAreaEvents(dom, nextPropsOrEmpty) {
        dom.oninput = onTextareaInputChange;
        if (nextPropsOrEmpty.onChange) {
            dom.onchange = wrappedOnChange$1;
        }
    }
    function applyValueTextArea(nextPropsOrEmpty, dom, mounting) {
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
     * There is currently no support for switching same input between controlled and nonControlled
     * If that ever becomes a real issue, then re design controlled elements
     * Currently user must choose either controlled or non-controlled and stick with that
     */
    function processElement(flags, vNode, dom, nextPropsOrEmpty, mounting, isControlled) {
        if (flags & 64 /* InputElement */) {
            applyValueInput(nextPropsOrEmpty, dom);
        }
        else if (flags & 256 /* SelectElement */) {
            applyValueSelect(nextPropsOrEmpty, dom, mounting, vNode);
        }
        else if (flags & 128 /* TextareaElement */) {
            applyValueTextArea(nextPropsOrEmpty, dom, mounting);
        }
        if (isControlled) {
            dom.$V = vNode;
        }
    }
    function addFormElementEventHandlers(flags, dom, nextPropsOrEmpty) {
        if (flags & 64 /* InputElement */) {
            inputEvents(dom, nextPropsOrEmpty);
        }
        else if (flags & 256 /* SelectElement */) {
            selectEvents(dom);
        }
        else if (flags & 128 /* TextareaElement */) {
            textAreaEvents(dom, nextPropsOrEmpty);
        }
    }
    function isControlledFormElement(nextPropsOrEmpty) {
        return nextPropsOrEmpty.type && isCheckedType(nextPropsOrEmpty.type) ? !isNullOrUndef(nextPropsOrEmpty.checked) : !isNullOrUndef(nextPropsOrEmpty.value);
    }

    function remove(vNode, parentDom) {
        unmount(vNode);
        if (parentDom && vNode.dom) {
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
            else if (childFlags === 2 /* HasVNodeChildren */) {
                unmount(children);
            }
            if (!isNull(props)) {
                for (var name in props) {
                    switch (name) {
                        case 'onClick':
                        case 'onDblClick':
                        case 'onFocusIn':
                        case 'onFocusOut':
                        case 'onKeyDown':
                        case 'onKeyPress':
                        case 'onKeyUp':
                        case 'onMouseDown':
                        case 'onMouseMove':
                        case 'onMouseUp':
                        case 'onSubmit':
                        case 'onTouchEnd':
                        case 'onTouchMove':
                        case 'onTouchStart':
                            handleEvent(name, null, vNode.dom);
                            break;
                        default:
                            break;
                    }
                }
            }
        }
        else {
            var children$1 = vNode.children;
            // Safe guard for crashed VNode
            if (children$1) {
                if (flags & 14 /* Component */) {
                    var ref$1 = vNode.ref;
                    if (flags & 4 /* ComponentClass */) {
                        if (isFunction(children$1.componentWillUnmount)) {
                            children$1.componentWillUnmount();
                        }
                        if (isFunction(ref$1)) {
                            ref$1(null);
                        }
                        children$1.$UN = true;
                        if (children$1.$LI) {
                            unmount(children$1.$LI);
                        }
                    }
                    else {
                        if (!isNullOrUndef(ref$1) && isFunction(ref$1.onComponentWillUnmount)) {
                            ref$1.onComponentWillUnmount(vNode.dom, vNode.props || EMPTY_OBJ);
                        }
                        unmount(children$1);
                    }
                }
                else if (flags & 1024 /* Portal */) {
                    remove(children$1, vNode.type);
                }
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

    function createLinkEvent(linkEvent, nextValue) {
        return function (e) {
            linkEvent(nextValue.data, e);
        };
    }
    function patchEvent(name, nextValue, dom) {
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
    function getNumberStyleValue(style, value) {
        switch (style) {
            case 'animationIterationCount':
            case 'borderImageOutset':
            case 'borderImageSlice':
            case 'borderImageWidth':
            case 'boxFlex':
            case 'boxFlexGroup':
            case 'boxOrdinalGroup':
            case 'columnCount':
            case 'fillOpacity':
            case 'flex':
            case 'flexGrow':
            case 'flexNegative':
            case 'flexOrder':
            case 'flexPositive':
            case 'flexShrink':
            case 'floodOpacity':
            case 'fontWeight':
            case 'gridColumn':
            case 'gridRow':
            case 'lineClamp':
            case 'lineHeight':
            case 'opacity':
            case 'order':
            case 'orphans':
            case 'stopOpacity':
            case 'strokeDasharray':
            case 'strokeDashoffset':
            case 'strokeMiterlimit':
            case 'strokeOpacity':
            case 'strokeWidth':
            case 'tabSize':
            case 'widows':
            case 'zIndex':
            case 'zoom':
                return value;
            default:
                return value + 'px';
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
                    domStyle[style] = isNumber(value) ? getNumberStyleValue(style, value) : value;
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
                domStyle[style] = isNumber(value) ? getNumberStyleValue(style, value) : value;
            }
        }
    }
    function patchProp(prop, lastValue, nextValue, dom, isSVG, hasControlledValue, lastVNode) {
        switch (prop) {
            case 'onClick':
            case 'onDblClick':
            case 'onFocusIn':
            case 'onFocusOut':
            case 'onKeyDown':
            case 'onKeyPress':
            case 'onKeyUp':
            case 'onMouseDown':
            case 'onMouseMove':
            case 'onMouseUp':
            case 'onSubmit':
            case 'onTouchEnd':
            case 'onTouchMove':
            case 'onTouchStart':
                handleEvent(prop, nextValue, dom);
                break;
            case 'children':
            case 'childrenType':
            case 'className':
            case 'defaultValue':
            case 'key':
            case 'multiple':
            case 'ref':
                break;
            case 'autoFocus':
                dom.autofocus = !!nextValue;
                break;
            case 'allowfullscreen':
            case 'autoplay':
            case 'capture':
            case 'checked':
            case 'controls':
            case 'default':
            case 'disabled':
            case 'hidden':
            case 'indeterminate':
            case 'loop':
            case 'muted':
            case 'novalidate':
            case 'open':
            case 'readOnly':
            case 'required':
            case 'reversed':
            case 'scoped':
            case 'seamless':
            case 'selected':
                dom[prop] = !!nextValue;
                break;
            case 'defaultChecked':
            case 'value':
            case 'volume':
                if (hasControlledValue && prop === 'value') {
                    return;
                }
                var value = isNullOrUndef(nextValue) ? '' : nextValue;
                if (dom[prop] !== value) {
                    dom[prop] = value;
                }
                break;
            case 'dangerouslySetInnerHTML':
                var lastHtml = (lastValue && lastValue.__html) || '';
                var nextHtml = (nextValue && nextValue.__html) || '';
                if (lastHtml !== nextHtml) {
                    if (!isNullOrUndef(nextHtml) && !isSameInnerHTML(dom, nextHtml)) {
                        if (!isNull(lastVNode)) {
                            if (lastVNode.childFlags & 12 /* MultipleChildren */) {
                                unmountAllChildren(lastVNode.children);
                            }
                            else if (lastVNode.childFlags === 2 /* HasVNodeChildren */) {
                                unmount(lastVNode.children);
                            }
                            lastVNode.children = null;
                            lastVNode.childFlags = 1 /* HasInvalidChildren */;
                        }
                        dom.innerHTML = nextHtml;
                    }
                }
                break;
            default:
                if (prop[0] === 'o' && prop[1] === 'n') {
                    patchEvent(prop, nextValue, dom);
                }
                else if (isNullOrUndef(nextValue)) {
                    dom.removeAttribute(prop);
                }
                else if (prop === 'style') {
                    patchStyle(lastValue, nextValue, dom);
                }
                else if (isSVG && namespaces[prop]) {
                    // We optimize for isSVG being false
                    // If we end up in this path we can read property again
                    dom.setAttributeNS(namespaces[prop], prop, nextValue);
                }
                else {
                    dom.setAttribute(prop, nextValue);
                }
                break;
        }
    }
    function mountProps(vNode, flags, props, dom, isSVG) {
        var hasControlledValue = false;
        var isFormElement = (flags & 448 /* FormElement */) > 0;
        if (isFormElement) {
            hasControlledValue = isControlledFormElement(props);
            if (hasControlledValue) {
                addFormElementEventHandlers(flags, dom, props);
            }
        }
        for (var prop in props) {
            // do not add a hasOwnProperty check here, it affects performance
            patchProp(prop, null, props[prop], dom, isSVG, hasControlledValue, null);
        }
        if (isFormElement) {
            processElement(flags, vNode, dom, props, true, hasControlledValue);
        }
    }

    function createClassComponentInstance(vNode, Component, props, context) {
        var instance = new Component(props, context);
        vNode.children = instance;
        instance.$V = vNode;
        instance.$BS = false;
        instance.context = context;
        if (instance.props === EMPTY_OBJ) {
            instance.props = props;
        }
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

    function mount(vNode, parentDom, context, isSVG) {
        var flags = vNode.flags;
        if (flags & 481 /* Element */) {
            return mountElement(vNode, parentDom, context, isSVG);
        }
        if (flags & 14 /* Component */) {
            return mountComponent(vNode, parentDom, context, isSVG, (flags & 4 /* ComponentClass */) > 0);
        }
        if (flags & 512 /* Void */ || flags & 16 /* Text */) {
            return mountText(vNode, parentDom);
        }
        if (flags & 1024 /* Portal */) {
            mount(vNode.children, vNode.type, context, false);
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
    function mountElement(vNode, parentDom, context, isSVG) {
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
        {
            validateKeys(vNode);
        }
        if (!isNull(parentDom)) {
            appendChild(parentDom, dom);
        }
        if ((childFlags & 1 /* HasInvalidChildren */) === 0) {
            var childrenIsSVG = isSVG === true && vNode.type !== 'foreignObject';
            if (childFlags === 2 /* HasVNodeChildren */) {
                mount(children, dom, context, childrenIsSVG);
            }
            else if (childFlags & 12 /* MultipleChildren */) {
                mountArrayChildren(children, dom, context, childrenIsSVG);
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
            mountRef(dom, ref);
        }
        return dom;
    }
    function mountArrayChildren(children, dom, context, isSVG) {
        for (var i = 0, len = children.length; i < len; i++) {
            var child = children[i];
            if (!isNull(child.dom)) {
                children[i] = child = directClone(child);
            }
            mount(child, dom, context, isSVG);
        }
    }
    function mountComponent(vNode, parentDom, context, isSVG, isClass) {
        var dom;
        var type = vNode.type;
        var props = vNode.props || EMPTY_OBJ;
        var ref = vNode.ref;
        if (isClass) {
            var instance = createClassComponentInstance(vNode, type, props, context);
            vNode.dom = dom = mount(instance.$LI, null, instance.$CX, isSVG);
            mountClassComponentCallbacks(vNode, ref, instance);
            instance.$UPD = false;
        }
        else {
            var input = handleComponentInput(type(props, context), vNode);
            vNode.children = input;
            vNode.dom = dom = mount(input, null, context, isSVG);
            mountFunctionalComponentCallbacks(props, ref, dom);
        }
        if (!isNull(parentDom)) {
            appendChild(parentDom, dom);
        }
        return dom;
    }
    function createClassMountCallback(instance) {
        return function () {
            instance.$UPD = true;
            instance.componentDidMount();
            instance.$UPD = false;
        };
    }
    function mountClassComponentCallbacks(vNode, ref, instance) {
        if (isFunction(ref)) {
            ref(instance);
        }
        else {
            {
                if (isStringOrNumber(ref)) {
                    throwError('string "refs" are not supported in Inferno 1.0. Use callback "refs" instead.');
                }
                else if (!isNullOrUndef(ref) && isObject(ref) && vNode.flags & 4 /* ComponentClass */) {
                    throwError('functional component lifecycle events are not supported on ES2015 class components.');
                }
            }
        }
        if (isFunction(instance.componentDidMount)) {
            LIFECYCLE.push(createClassMountCallback(instance));
        }
    }
    function createOnMountCallback(ref, dom, props) {
        return function () { return ref.onComponentDidMount(dom, props); };
    }
    function mountFunctionalComponentCallbacks(props, ref, dom) {
        if (!isNullOrUndef(ref)) {
            if (isFunction(ref.onComponentWillMount)) {
                ref.onComponentWillMount(props);
            }
            if (isFunction(ref.onComponentDidMount)) {
                LIFECYCLE.push(createOnMountCallback(ref, dom, props));
            }
        }
    }
    function mountRef(dom, value) {
        LIFECYCLE.push(function () { return value(dom); });
    }

    function hydrateComponent(vNode, dom, context, isSVG, isClass) {
        var type = vNode.type;
        var ref = vNode.ref;
        var props = vNode.props || EMPTY_OBJ;
        if (isClass) {
            var instance = createClassComponentInstance(vNode, type, props, context);
            var input = instance.$LI;
            hydrateVNode(input, dom, instance.$CX, isSVG);
            vNode.dom = input.dom;
            mountClassComponentCallbacks(vNode, ref, instance);
            instance.$UPD = false; // Mount finished allow going sync
        }
        else {
            var input$1 = handleComponentInput(type(props, context), vNode);
            hydrateVNode(input$1, dom, context, isSVG);
            vNode.children = input$1;
            vNode.dom = input$1.dom;
            mountFunctionalComponentCallbacks(props, ref, dom);
        }
    }
    function hydrateElement(vNode, dom, context, isSVG) {
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
            var newDom = mountElement(vNode, null, context, isSVG);
            vNode.dom = newDom;
            replaceChild(dom.parentNode, newDom, dom);
        }
        else {
            vNode.dom = dom;
            var childNode = dom.firstChild;
            var childFlags = vNode.childFlags;
            if ((childFlags & 1 /* HasInvalidChildren */) === 0) {
                var nextSibling = null;
                while (childNode) {
                    nextSibling = childNode.nextSibling;
                    if (childNode.nodeType === 8) {
                        if (childNode.data === '!') {
                            dom.replaceChild(document.createTextNode(''), childNode);
                        }
                        else {
                            dom.removeChild(childNode);
                        }
                    }
                    childNode = nextSibling;
                }
                childNode = dom.firstChild;
                if (childFlags === 2 /* HasVNodeChildren */) {
                    if (isNull(childNode)) {
                        mount(children, dom, context, isSVG);
                    }
                    else {
                        nextSibling = childNode.nextSibling;
                        hydrateVNode(children, childNode, context, isSVG);
                        childNode = nextSibling;
                    }
                }
                else if (childFlags & 12 /* MultipleChildren */) {
                    for (var i = 0, len = children.length; i < len; i++) {
                        var child = children[i];
                        if (isNull(childNode)) {
                            mount(child, dom, context, isSVG);
                        }
                        else {
                            nextSibling = childNode.nextSibling;
                            hydrateVNode(child, childNode, context, isSVG);
                            childNode = nextSibling;
                        }
                    }
                }
                // clear any other DOM nodes, there should be only a single entry for the root
                while (childNode) {
                    nextSibling = childNode.nextSibling;
                    dom.removeChild(childNode);
                    childNode = nextSibling;
                }
            }
            else if (!isNull(dom.firstChild) && !isSamePropsInnerHTML(dom, props)) {
                dom.textContent = ''; // dom has content, but VNode has no children remove everything from DOM
                if (flags & 448 /* FormElement */) {
                    // If element is form element, we need to clear defaultValue also
                    dom.defaultValue = '';
                }
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
                mountRef(dom, ref);
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
    function hydrateVNode(vNode, dom, context, isSVG) {
        var flags = vNode.flags;
        if (flags & 14 /* Component */) {
            hydrateComponent(vNode, dom, context, isSVG, (flags & 4 /* ComponentClass */) > 0);
        }
        else if (flags & 481 /* Element */) {
            hydrateElement(vNode, dom, context, isSVG);
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
    function hydrate(input, parentDom, callback) {
        var dom = parentDom.firstChild;
        if (!isNull(dom)) {
            if (!isInvalid(input)) {
                hydrateVNode(input, dom, EMPTY_OBJ, false);
            }
            dom = parentDom.firstChild;
            // clear any other DOM nodes, there should be only a single entry for the root
            while ((dom = dom.nextSibling)) {
                parentDom.removeChild(dom);
            }
        }
        if (LIFECYCLE.length > 0) {
            callAll(LIFECYCLE);
        }
        parentDom.$V = input;
        if (isFunction(callback)) {
            callback();
        }
    }

    function replaceWithNewNode(lastNode, nextNode, parentDom, context, isSVG) {
        unmount(lastNode);
        replaceChild(parentDom, mount(nextNode, null, context, isSVG), lastNode.dom);
    }
    function patch(lastVNode, nextVNode, parentDom, context, isSVG) {
        var nextFlags = nextVNode.flags | 0;
        if (lastVNode.flags !== nextFlags || nextFlags & 2048 /* ReCreate */) {
            replaceWithNewNode(lastVNode, nextVNode, parentDom, context, isSVG);
        }
        else if (nextFlags & 481 /* Element */) {
            patchElement(lastVNode, nextVNode, parentDom, context, isSVG, nextFlags);
        }
        else if (nextFlags & 14 /* Component */) {
            patchComponent(lastVNode, nextVNode, parentDom, context, isSVG, (nextFlags & 4 /* ComponentClass */) > 0);
        }
        else if (nextFlags & 16 /* Text */) {
            patchText(lastVNode, nextVNode);
        }
        else if (nextFlags & 512 /* Void */) {
            nextVNode.dom = lastVNode.dom;
        }
        else {
            patchPortal(lastVNode, nextVNode, context);
        }
    }
    function patchContentEditableChildren(dom, nextVNode) {
        if (dom.textContent !== nextVNode.children) {
            dom.textContent = nextVNode.children;
        }
    }
    function patchPortal(lastVNode, nextVNode, context) {
        var lastContainer = lastVNode.type;
        var nextContainer = nextVNode.type;
        var nextChildren = nextVNode.children;
        patchChildren(lastVNode.childFlags, nextVNode.childFlags, lastVNode.children, nextChildren, lastContainer, context, false);
        nextVNode.dom = lastVNode.dom;
        if (lastContainer !== nextContainer && !isInvalid(nextChildren)) {
            var node = nextChildren.dom;
            lastContainer.removeChild(node);
            nextContainer.appendChild(node);
        }
    }
    function patchElement(lastVNode, nextVNode, parentDom, context, isSVG, nextFlags) {
        var nextTag = nextVNode.type;
        if (lastVNode.type !== nextTag) {
            replaceWithNewNode(lastVNode, nextVNode, parentDom, context, isSVG);
        }
        else {
            var dom = lastVNode.dom;
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
                        var lastValue = lastPropsOrEmpty[prop];
                        var nextValue = nextPropsOrEmpty[prop];
                        if (lastValue !== nextValue) {
                            patchProp(prop, lastValue, nextValue, dom, isSVG, hasControlledValue, lastVNode);
                        }
                    }
                }
                if (lastPropsOrEmpty !== EMPTY_OBJ) {
                    for (var prop$1 in lastPropsOrEmpty) {
                        if (!nextPropsOrEmpty.hasOwnProperty(prop$1) && !isNullOrUndef(lastPropsOrEmpty[prop$1])) {
                            patchProp(prop$1, lastPropsOrEmpty[prop$1], null, dom, isSVG, hasControlledValue, lastVNode);
                        }
                    }
                }
            }
            var lastChildren = lastVNode.children;
            var nextChildren = nextVNode.children;
            var nextRef = nextVNode.ref;
            var lastClassName = lastVNode.className;
            var nextClassName = nextVNode.className;
            {
                validateKeys(nextVNode);
            }
            if (nextFlags & 4096 /* ContentEditable */) {
                patchContentEditableChildren(dom, nextChildren);
            }
            else {
                patchChildren(lastVNode.childFlags, nextVNode.childFlags, lastChildren, nextChildren, dom, context, isSVG && nextTag !== 'foreignObject');
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
                mountRef(dom, nextRef);
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
    function patchChildren(lastChildFlags, nextChildFlags, lastChildren, nextChildren, parentDOM, context, isSVG) {
        switch (lastChildFlags) {
            case 2 /* HasVNodeChildren */:
                switch (nextChildFlags) {
                    case 2 /* HasVNodeChildren */:
                        patch(lastChildren, nextChildren, parentDOM, context, isSVG);
                        break;
                    case 1 /* HasInvalidChildren */:
                        remove(lastChildren, parentDOM);
                        break;
                    default:
                        remove(lastChildren, parentDOM);
                        mountArrayChildren(nextChildren, parentDOM, context, isSVG);
                        break;
                }
                break;
            case 1 /* HasInvalidChildren */:
                switch (nextChildFlags) {
                    case 2 /* HasVNodeChildren */:
                        mount(nextChildren, parentDOM, context, isSVG);
                        break;
                    case 1 /* HasInvalidChildren */:
                        break;
                    default:
                        mountArrayChildren(nextChildren, parentDOM, context, isSVG);
                        break;
                }
                break;
            default:
                if (nextChildFlags & 12 /* MultipleChildren */) {
                    var lastLength = lastChildren.length;
                    var nextLength = nextChildren.length;
                    // Fast path's for both algorithms
                    if (lastLength === 0) {
                        if (nextLength > 0) {
                            mountArrayChildren(nextChildren, parentDOM, context, isSVG);
                        }
                    }
                    else if (nextLength === 0) {
                        removeAllChildren(parentDOM, lastChildren);
                    }
                    else if (nextChildFlags === 8 /* HasKeyedChildren */ && lastChildFlags === 8 /* HasKeyedChildren */) {
                        patchKeyedChildren(lastChildren, nextChildren, parentDOM, context, isSVG, lastLength, nextLength);
                    }
                    else {
                        patchNonKeyedChildren(lastChildren, nextChildren, parentDOM, context, isSVG, lastLength, nextLength);
                    }
                }
                else if (nextChildFlags === 1 /* HasInvalidChildren */) {
                    removeAllChildren(parentDOM, lastChildren);
                }
                else if (nextChildFlags === 2 /* HasVNodeChildren */) {
                    removeAllChildren(parentDOM, lastChildren);
                    mount(nextChildren, parentDOM, context, isSVG);
                }
                break;
        }
    }
    function updateClassComponent(instance, nextState, nextVNode, nextProps, parentDom, context, isSVG, force, fromSetState) {
        var lastState = instance.state;
        var lastProps = instance.props;
        nextVNode.children = instance;
        var renderOutput;
        if (instance.$UN) {
            {
                warning('Inferno Error: Can only update a mounted or mounting component. This usually means you called setState() or forceUpdate() on an unmounted component. This is a no-op.');
            }
            return;
        }
        if (lastProps !== nextProps || nextProps === EMPTY_OBJ) {
            if (!fromSetState && isFunction(instance.componentWillReceiveProps)) {
                instance.$BR = true;
                instance.componentWillReceiveProps(nextProps, context);
                // If instance component was removed during its own update do nothing.
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
        var hasSCU = Boolean(instance.shouldComponentUpdate);
        if (force || !hasSCU || (hasSCU && instance.shouldComponentUpdate(nextProps, nextState, context))) {
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
                var lastInput = instance.$LI;
                var nextInput = handleComponentInput(renderOutput, nextVNode);
                patch(lastInput, nextInput, parentDom, childContext, isSVG);
                instance.$LI = nextInput;
                if (isFunction(instance.componentDidUpdate)) {
                    instance.componentDidUpdate(lastProps, lastState);
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
    function patchComponent(lastVNode, nextVNode, parentDom, context, isSVG, isClass) {
        var nextType = nextVNode.type;
        var lastKey = lastVNode.key;
        var nextKey = nextVNode.key;
        if (lastVNode.type !== nextType || lastKey !== nextKey) {
            replaceWithNewNode(lastVNode, nextVNode, parentDom, context, isSVG);
        }
        else {
            var nextProps = nextVNode.props || EMPTY_OBJ;
            if (isClass) {
                var instance = lastVNode.children;
                instance.$UPD = true;
                instance.$V = nextVNode;
                updateClassComponent(instance, instance.state, nextVNode, nextProps, parentDom, context, isSVG, false, false);
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
                        patch(lastInput, nextInput, parentDom, context, isSVG);
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
    function patchText(lastVNode, nextVNode) {
        var nextText = nextVNode.children;
        var dom = lastVNode.dom;
        if (nextText !== lastVNode.children) {
            dom.nodeValue = nextText;
        }
        nextVNode.dom = dom;
    }
    function patchNonKeyedChildren(lastChildren, nextChildren, dom, context, isSVG, lastChildrenLength, nextChildrenLength) {
        var commonLength = lastChildrenLength > nextChildrenLength ? nextChildrenLength : lastChildrenLength;
        var i = 0;
        var nextChild;
        var lastChild;
        for (; i < commonLength; i++) {
            nextChild = nextChildren[i];
            lastChild = lastChildren[i];
            if (nextChild.dom) {
                nextChild = nextChildren[i] = directClone(nextChild);
            }
            patch(lastChild, nextChild, dom, context, isSVG);
            lastChildren[i] = nextChild;
        }
        if (lastChildrenLength < nextChildrenLength) {
            for (i = commonLength; i < nextChildrenLength; i++) {
                nextChild = nextChildren[i];
                if (nextChild.dom) {
                    nextChild = nextChildren[i] = directClone(nextChild);
                }
                mount(nextChild, dom, context, isSVG);
            }
        }
        else if (lastChildrenLength > nextChildrenLength) {
            for (i = commonLength; i < lastChildrenLength; i++) {
                remove(lastChildren[i], dom);
            }
        }
    }
    function patchKeyedChildren(a, b, dom, context, isSVG, aLength, bLength) {
        var aEnd = aLength - 1;
        var bEnd = bLength - 1;
        var i;
        var j = 0;
        var aNode = a[j];
        var bNode = b[j];
        var nextPos;
        // Step 1
        // tslint:disable-next-line
        outer: {
            // Sync nodes with the same key at the beginning.
            while (aNode.key === bNode.key) {
                if (bNode.dom) {
                    b[j] = bNode = directClone(bNode);
                }
                patch(aNode, bNode, dom, context, isSVG);
                a[j] = bNode;
                j++;
                if (j > aEnd || j > bEnd) {
                    break outer;
                }
                aNode = a[j];
                bNode = b[j];
            }
            aNode = a[aEnd];
            bNode = b[bEnd];
            // Sync nodes with the same key at the end.
            while (aNode.key === bNode.key) {
                if (bNode.dom) {
                    b[bEnd] = bNode = directClone(bNode);
                }
                patch(aNode, bNode, dom, context, isSVG);
                a[aEnd] = bNode;
                aEnd--;
                bEnd--;
                if (j > aEnd || j > bEnd) {
                    break outer;
                }
                aNode = a[aEnd];
                bNode = b[bEnd];
            }
        }
        if (j > aEnd) {
            if (j <= bEnd) {
                nextPos = bEnd + 1;
                var nextNode = nextPos < bLength ? b[nextPos].dom : null;
                while (j <= bEnd) {
                    bNode = b[j];
                    if (bNode.dom) {
                        b[j] = bNode = directClone(bNode);
                    }
                    j++;
                    insertOrAppend(dom, mount(bNode, null, context, isSVG), nextNode);
                }
            }
        }
        else if (j > bEnd) {
            while (j <= aEnd) {
                remove(a[j++], dom);
            }
        }
        else {
            var aStart = j;
            var bStart = j;
            var aLeft = aEnd - j + 1;
            var bLeft = bEnd - j + 1;
            var sources = [];
            for (i = 0; i < bLeft; i++) {
                sources.push(0);
            }
            // Keep track if its possible to remove whole DOM using textContent = '';
            var canRemoveWholeContent = aLeft === aLength;
            var moved = false;
            var pos = 0;
            var patched = 0;
            // When sizes are small, just loop them through
            if (bLength < 4 || (aLeft | bLeft) < 32) {
                for (i = aStart; i <= aEnd; i++) {
                    aNode = a[i];
                    if (patched < bLeft) {
                        for (j = bStart; j <= bEnd; j++) {
                            bNode = b[j];
                            if (aNode.key === bNode.key) {
                                sources[j - bStart] = i + 1;
                                if (canRemoveWholeContent) {
                                    canRemoveWholeContent = false;
                                    while (i > aStart) {
                                        remove(a[aStart++], dom);
                                    }
                                }
                                if (pos > j) {
                                    moved = true;
                                }
                                else {
                                    pos = j;
                                }
                                if (bNode.dom) {
                                    b[j] = bNode = directClone(bNode);
                                }
                                patch(aNode, bNode, dom, context, isSVG);
                                patched++;
                                break;
                            }
                        }
                        if (!canRemoveWholeContent && j > bEnd) {
                            remove(aNode, dom);
                        }
                    }
                    else if (!canRemoveWholeContent) {
                        remove(aNode, dom);
                    }
                }
            }
            else {
                var keyIndex = {};
                // Map keys by their index
                for (i = bStart; i <= bEnd; i++) {
                    keyIndex[b[i].key] = i;
                }
                // Try to patch same keys
                for (i = aStart; i <= aEnd; i++) {
                    aNode = a[i];
                    if (patched < bLeft) {
                        j = keyIndex[aNode.key];
                        if (j !== void 0) {
                            if (canRemoveWholeContent) {
                                canRemoveWholeContent = false;
                                while (i > aStart) {
                                    remove(a[aStart++], dom);
                                }
                            }
                            bNode = b[j];
                            sources[j - bStart] = i + 1;
                            if (pos > j) {
                                moved = true;
                            }
                            else {
                                pos = j;
                            }
                            if (bNode.dom) {
                                b[j] = bNode = directClone(bNode);
                            }
                            patch(aNode, bNode, dom, context, isSVG);
                            patched++;
                        }
                        else if (!canRemoveWholeContent) {
                            remove(aNode, dom);
                        }
                    }
                    else if (!canRemoveWholeContent) {
                        remove(aNode, dom);
                    }
                }
            }
            // fast-path: if nothing patched remove all old and add all new
            if (canRemoveWholeContent) {
                removeAllChildren(dom, a);
                mountArrayChildren(b, dom, context, isSVG);
            }
            else {
                if (moved) {
                    var seq = lis_algorithm(sources);
                    j = seq.length - 1;
                    for (i = bLeft - 1; i >= 0; i--) {
                        if (sources[i] === 0) {
                            pos = i + bStart;
                            bNode = b[pos];
                            if (bNode.dom) {
                                b[pos] = bNode = directClone(bNode);
                            }
                            nextPos = pos + 1;
                            insertOrAppend(dom, mount(bNode, null, context, isSVG), nextPos < bLength ? b[nextPos].dom : null);
                        }
                        else if (j < 0 || i !== seq[j]) {
                            pos = i + bStart;
                            bNode = b[pos];
                            nextPos = pos + 1;
                            insertOrAppend(dom, bNode.dom, nextPos < bLength ? b[nextPos].dom : null);
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
                        if (sources[i] === 0) {
                            pos = i + bStart;
                            bNode = b[pos];
                            if (bNode.dom) {
                                b[pos] = bNode = directClone(bNode);
                            }
                            nextPos = pos + 1;
                            insertOrAppend(dom, mount(bNode, null, context, isSVG), nextPos < bLength ? b[nextPos].dom : null);
                        }
                    }
                }
            }
        }
    }
    // https://en.wikipedia.org/wiki/Longest_increasing_subsequence
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
            if (arrI !== 0) {
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
        var rootInput = parentDom.$V;
        if (isNullOrUndef(rootInput)) {
            if (!isInvalid(input)) {
                if (input.dom) {
                    input = directClone(input);
                }
                if (isNull(parentDom.firstChild)) {
                    mount(input, parentDom, EMPTY_OBJ, false);
                    parentDom.$V = input;
                }
                else {
                    hydrate(input, parentDom);
                }
                rootInput = input;
            }
        }
        else {
            if (isNullOrUndef(input)) {
                remove(rootInput, parentDom);
                parentDom.$V = null;
            }
            else {
                if (input.dom) {
                    input = directClone(input);
                }
                patch(rootInput, input, parentDom, EMPTY_OBJ, false);
                rootInput = parentDom.$V = input;
            }
        }
        if (LIFECYCLE.length > 0) {
            callAll(LIFECYCLE);
        }
        if (isFunction(callback)) {
            callback();
        }
        if (isFunction(options.renderComplete)) {
            options.renderComplete(rootInput);
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
        return createVNode(1024 /* Portal */, container, null, children, 0 /* UnknownChildren */, null, isInvalid(children) ? null : children.key, null);
    }

    var resolvedPromise = typeof Promise === 'undefined' ? null : Promise.resolve();
    // raf.bind(window) is needed to work around bug in IE10-IE11 strict mode (TypeError: Invalid calling object)
    var fallbackMethod = typeof requestAnimationFrame === 'undefined' ? setTimeout : requestAnimationFrame.bind(window);
    function nextTick(fn) {
        if (resolvedPromise) {
            return resolvedPromise.then(fn);
        }
        return fallbackMethod(fn);
    }
    function queueStateChanges(component, newState, callback, force) {
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
                applyState(component, force, callback);
                component.$UPD = false;
            }
            else {
                // Async
                var queue = component.$QU;
                if (isNull(queue)) {
                    queue = component.$QU = [];
                    nextTick(promiseCallback(component, queue));
                }
                if (isFunction(callback)) {
                    queue.push(callback);
                }
            }
        }
        else {
            component.$PSS = true;
            if (component.$BR && isFunction(callback)) {
                LIFECYCLE.push(callback.bind(component));
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
            updateClassComponent(component, nextState, vNode, props, parentDom, context, (vNode.flags & 32 /* SvgElement */) > 0, force, true);
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
            if (LIFECYCLE.length > 0) {
                callAll(LIFECYCLE);
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
        // Do not allow double render during force update
        queueStateChanges(this, {}, callback, true);
    };
    Component.prototype.setState = function setState (newState, callback) {
        if (this.$UN) {
            return;
        }
        if (!this.$BS) {
            queueStateChanges(this, newState, callback, false);
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
    Component.prototype.render = function render (_nextProps, _nextState, _nextContext) { };



    var JSX = /*#__PURE__*/Object.freeze({

    });

    {
        /* tslint:disable-next-line:no-empty */
        var testFunc = function testFn() { };
        /* tslint:disable-next-line*/
        console.info('Inferno is in development mode.');
        if ((testFunc.name || testFunc.toString()).indexOf('testFn') === -1) {
            warning("It looks like you're using a minified copy of the development build " +
                'of Inferno. When deploying Inferno apps to production, make sure to use ' +
                'the production build which skips development warnings and is faster. ' +
                'See http://infernojs.org for more details.');
        }
    }
    var version = "5.6.1";

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
    exports.getNumberStyleValue = getNumberStyleValue;
    exports.hydrate = hydrate;
    exports.linkEvent = linkEvent;
    exports.normalizeProps = normalizeProps;
    exports.options = options;
    exports.render = render;
    exports.version = version;
    exports.JSX = JSX;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
