(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (factory((global.Inferno = {})));
}(this, (function (exports) { 'use strict';

    /**
     * @module Inferno-Shared
     */ /** TypeDoc Comment */
    var NO_OP = "$NO_OP";
    var ERROR_MSG = "a runtime error occured! Use Inferno in development environment to find the error.";
    // This should be boolean and not reference to window.document
    var isBrowser = !!(typeof window !== "undefined" && window.document);
    // this is MUCH faster than .constructor === Array and instanceof Array
    // in Node 7 and the later versions of V8, slower in older versions though
    var isArray = Array.isArray;
    function isStatefulComponent(o) {
        return !isUndefined(o.prototype) && isFunction(o.prototype.render);
    }
    function isStringOrNumber(o) {
        var type = typeof o;
        return type === "string" || type === "number";
    }
    function isNullOrUndef(o) {
        return isUndefined(o) || isNull(o);
    }
    function isInvalid(o) {
        return isNull(o) || o === false || isTrue(o) || isUndefined(o);
    }
    function isFunction(o) {
        return typeof o === "function";
    }
    function isString(o) {
        return typeof o === "string";
    }
    function isNumber(o) {
        return typeof o === "number";
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
        return typeof o === "object";
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

    /**
     * @module Inferno
     */ /** TypeDoc Comment */
    var xlinkNS = "http://www.w3.org/1999/xlink";
    var xmlNS = "http://www.w3.org/XML/1998/namespace";
    var svgNS = "http://www.w3.org/2000/svg";
    var strictProps = new Set();
    strictProps.add("volume");
    strictProps.add("defaultChecked");
    var booleanProps = new Set();
    booleanProps.add("muted");
    booleanProps.add("scoped");
    booleanProps.add("loop");
    booleanProps.add("open");
    booleanProps.add("checked");
    booleanProps.add("default");
    booleanProps.add("capture");
    booleanProps.add("disabled");
    booleanProps.add("readOnly");
    booleanProps.add("required");
    booleanProps.add("autoplay");
    booleanProps.add("controls");
    booleanProps.add("seamless");
    booleanProps.add("reversed");
    booleanProps.add("allowfullscreen");
    booleanProps.add("novalidate");
    booleanProps.add("hidden");
    booleanProps.add("autoFocus");
    booleanProps.add("selected");
    booleanProps.add("indeterminate");
    // TODO: MathML namespace
    var namespaces = new Map();
    namespaces.set("xlink:href", xlinkNS);
    namespaces.set("xlink:arcrole", xlinkNS);
    namespaces.set("xlink:actuate", xlinkNS);
    namespaces.set("xlink:show", xlinkNS);
    namespaces.set("xlink:role", xlinkNS);
    namespaces.set("xlink:title", xlinkNS);
    namespaces.set("xlink:type", xlinkNS);
    namespaces.set("xml:base", xmlNS);
    namespaces.set("xml:lang", xmlNS);
    namespaces.set("xml:space", xmlNS);
    var isUnitlessNumber = new Set();
    isUnitlessNumber.add("animationIterationCount");
    isUnitlessNumber.add("borderImageOutset");
    isUnitlessNumber.add("borderImageSlice");
    isUnitlessNumber.add("borderImageWidth");
    isUnitlessNumber.add("boxFlex");
    isUnitlessNumber.add("boxFlexGroup");
    isUnitlessNumber.add("boxOrdinalGroup");
    isUnitlessNumber.add("columnCount");
    isUnitlessNumber.add("flex");
    isUnitlessNumber.add("flexGrow");
    isUnitlessNumber.add("flexPositive");
    isUnitlessNumber.add("flexShrink");
    isUnitlessNumber.add("flexNegative");
    isUnitlessNumber.add("flexOrder");
    isUnitlessNumber.add("gridRow");
    isUnitlessNumber.add("gridColumn");
    isUnitlessNumber.add("fontWeight");
    isUnitlessNumber.add("lineClamp");
    isUnitlessNumber.add("lineHeight");
    isUnitlessNumber.add("opacity");
    isUnitlessNumber.add("order");
    isUnitlessNumber.add("orphans");
    isUnitlessNumber.add("tabSize");
    isUnitlessNumber.add("widows");
    isUnitlessNumber.add("zIndex");
    isUnitlessNumber.add("zoom");
    isUnitlessNumber.add("fillOpacity");
    isUnitlessNumber.add("floodOpacity");
    isUnitlessNumber.add("stopOpacity");
    isUnitlessNumber.add("strokeDasharray");
    isUnitlessNumber.add("strokeDashoffset");
    isUnitlessNumber.add("strokeMiterlimit");
    isUnitlessNumber.add("strokeOpacity");
    isUnitlessNumber.add("strokeWidth");
    var skipProps = new Set();
    skipProps.add("children");
    skipProps.add("childrenType");
    skipProps.add("defaultValue");
    skipProps.add("ref");
    skipProps.add("key");
    skipProps.add("checked");
    skipProps.add("multiple");
    var delegatedEvents = new Set();
    delegatedEvents.add("onClick");
    delegatedEvents.add("onMouseDown");
    delegatedEvents.add("onMouseUp");
    delegatedEvents.add("onMouseMove");
    delegatedEvents.add("onTouchStart");
    delegatedEvents.add("onTouchEnd");
    delegatedEvents.add("onTouchMove");
    delegatedEvents.add("onSubmit");
    delegatedEvents.add("onDblClick");
    delegatedEvents.add("onKeyDown");
    delegatedEvents.add("onKeyUp");
    delegatedEvents.add("onKeyPress");
    delegatedEvents.add("onFocusIn");
    delegatedEvents.add("onFocusOut");

    /**
     * @module Inferno
     */ /** TypeDoc Comment */
    // We need EMPTY_OBJ defined in one place.
    // Its used for comparison so we cant inline it into shared
    var EMPTY_OBJ = {};
    {
        Object.freeze(EMPTY_OBJ);
    }
    function setTextContent(dom, text) {
        if (text !== "") {
            dom.textContent = text;
        }
        else {
            dom.appendChild(document.createTextNode(""));
        }
    }
    function updateTextContent(dom, text) {
        var textNode = dom.firstChild;
        // Guard against external change on DOM node.
        if (isNull(textNode)) {
            setTextContent(dom, text);
        }
        else {
            textNode.nodeValue = text;
        }
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
        else {
            return document.createElement(tag);
        }
    }
    function replaceChild(parentDom, newDom, lastDom) {
        parentDom.replaceChild(newDom, lastDom);
    }
    function removeChild(parentDom, dom) {
        parentDom.removeChild(dom);
    }
    function isKeyed(lastChildren, nextChildren) {
        return (!isNullOrUndef(nextChildren[0]) &&
            !isNullOrUndef(nextChildren[0].key) &&
            !isNullOrUndef(lastChildren[0]) &&
            !isNullOrUndef(lastChildren[0].key));
    }
    var componentToDOMNodeMap = new Map();
    function callAll(arrayFn) {
        var listener;
        while ((listener = arrayFn.shift()) !== undefined) {
            listener();
        }
    }

    /**
     * @module Inferno
     */ /** TypeDoc Comment */
    function createVNode(flags, type, className, children, props, key, ref, noNormalise) {
        if ((flags & 16 /* ComponentUnknown */) > 0) {
            flags = isStatefulComponent(type)
                ? 4 /* ComponentClass */
                : 8 /* ComponentFunction */;
        }
        var vNode = {
            children: children === void 0 ? null : children,
            className: className === void 0 ? null : className,
            dom: null,
            flags: flags,
            key: key === void 0 ? null : key,
            parentVNode: null,
            props: props === void 0 ? null : props,
            ref: ref === void 0 ? null : ref,
            type: type
        };
        if (noNormalise !== true) {
            normalize(vNode);
        }
        if (options.createVNode !== null) {
            options.createVNode(vNode);
        }
        return vNode;
    }
    function directClone(vNodeToClone) {
        var newVNode;
        var flags = vNodeToClone.flags;
        if (flags & 28 /* Component */) {
            var props;
            var propsToClone = vNodeToClone.props;
            if (isNull(propsToClone)) {
                props = EMPTY_OBJ;
            }
            else {
                props = {};
                for (var key in propsToClone) {
                    props[key] = propsToClone[key];
                }
            }
            newVNode = createVNode(flags, vNodeToClone.type, null, null, props, vNodeToClone.key, vNodeToClone.ref, true);
            var newProps = newVNode.props;
            var newChildren = newProps.children;
            // we need to also clone component children that are in props
            // as the children may also have been hoisted
            if (newChildren) {
                if (isArray(newChildren)) {
                    var len = newChildren.length;
                    if (len > 0) {
                        var tmpArray = [];
                        for (var i = 0; i < len; i++) {
                            var child = newChildren[i];
                            if (isStringOrNumber(child)) {
                                tmpArray.push(child);
                            }
                            else if (!isInvalid(child) && isVNode(child)) {
                                tmpArray.push(directClone(child));
                            }
                        }
                        newProps.children = tmpArray;
                    }
                }
                else if (isVNode(newChildren)) {
                    newProps.children = directClone(newChildren);
                }
            }
            newVNode.children = null;
        }
        else if (flags & 3970 /* Element */) {
            var children = vNodeToClone.children;
            var props$1;
            var propsToClone$1 = vNodeToClone.props;
            if (propsToClone$1 === null) {
                props$1 = EMPTY_OBJ;
            }
            else {
                props$1 = {};
                for (var key$1 in propsToClone$1) {
                    props$1[key$1] = propsToClone$1[key$1];
                }
            }
            newVNode = createVNode(flags, vNodeToClone.type, vNodeToClone.className, children, props$1, vNodeToClone.key, vNodeToClone.ref, !children);
        }
        else if (flags & 1 /* Text */) {
            newVNode = createTextVNode(vNodeToClone.children, vNodeToClone.key);
        }
        else if (flags & 8192 /* Portal */) {
            newVNode = vNodeToClone;
        }
        return newVNode;
    }
    /*
     directClone is preferred over cloneVNode and used internally also.
     This function makes Inferno backwards compatible.
     And can be tree-shaked by modern bundlers

     Would be nice to combine this with directClone but could not do it without breaking change
     */
    /**
     * Clones given virtual node by creating new instance of it
     * @param {VNode} vNodeToClone virtual node to be cloned
     * @param {Props=} props additional props for new virtual node
     * @param {...*} _children new children for new virtual node
     * @returns {VNode} new virtual node
     */
    function cloneVNode(vNodeToClone, props) {
        var _children = [], len$2 = arguments.length - 2;
        while ( len$2-- > 0 ) _children[ len$2 ] = arguments[ len$2 + 2 ];

        var children = _children;
        var childrenLen = _children.length;
        if (childrenLen > 0 && !isUndefined(_children[0])) {
            if (!props) {
                props = {};
            }
            if (childrenLen === 1) {
                children = _children[0];
            }
            if (!isUndefined(children)) {
                props.children = children;
            }
        }
        var newVNode;
        if (isArray(vNodeToClone)) {
            var tmpArray = [];
            for (var i = 0, len = vNodeToClone.length; i < len; i++) {
                tmpArray.push(directClone(vNodeToClone[i]));
            }
            newVNode = tmpArray;
        }
        else {
            var flags = vNodeToClone.flags;
            var className = vNodeToClone.className;
            var key = vNodeToClone.key;
            var ref = vNodeToClone.ref;
            if (props) {
                if (props.hasOwnProperty("className")) {
                    className = props.className;
                }
                if (props.hasOwnProperty("ref")) {
                    ref = props.ref;
                }
                if (props.hasOwnProperty("key")) {
                    key = props.key;
                }
            }
            if (flags & 28 /* Component */) {
                newVNode = createVNode(flags, vNodeToClone.type, className, null, !vNodeToClone.props && !props
                    ? EMPTY_OBJ
                    : combineFrom(vNodeToClone.props, props), key, ref, true);
                var newProps = newVNode.props;
                if (newProps) {
                    var newChildren = newProps.children;
                    // we need to also clone component children that are in props
                    // as the children may also have been hoisted
                    if (newChildren) {
                        if (isArray(newChildren)) {
                            var len$1 = newChildren.length;
                            if (len$1 > 0) {
                                var tmpArray$1 = [];
                                for (var i$1 = 0; i$1 < len$1; i$1++) {
                                    var child = newChildren[i$1];
                                    if (isStringOrNumber(child)) {
                                        tmpArray$1.push(child);
                                    }
                                    else if (!isInvalid(child) && isVNode(child)) {
                                        tmpArray$1.push(directClone(child));
                                    }
                                }
                                newProps.children = tmpArray$1;
                            }
                        }
                        else if (isVNode(newChildren)) {
                            newProps.children = directClone(newChildren);
                        }
                    }
                }
                newVNode.children = null;
            }
            else if (flags & 3970 /* Element */) {
                children =
                    props && !isUndefined(props.children)
                        ? props.children
                        : vNodeToClone.children;
                newVNode = createVNode(flags, vNodeToClone.type, className, children, !vNodeToClone.props && !props
                    ? EMPTY_OBJ
                    : combineFrom(vNodeToClone.props, props), key, ref, false);
            }
            else if (flags & 1 /* Text */) {
                newVNode = createTextVNode(vNodeToClone.children, key);
            }
        }
        return newVNode;
    }
    function createVoidVNode() {
        return createVNode(4096 /* Void */, null, null, "", null, null, null, true);
    }
    function createTextVNode(text, key) {
        return createVNode(1 /* Text */, null, null, text, null, key, null, true);
    }
    function isVNode(o) {
        return !!o.flags;
    }
    function applyKey(key, vNode) {
        vNode.key = key;
        return vNode;
    }
    function applyKeyIfMissing(key, vNode) {
        if (isNumber(key)) {
            key = "." + key;
        }
        if (isNull(vNode.key) || vNode.key[0] === ".") {
            return applyKey(key, vNode);
        }
        return vNode;
    }
    function applyKeyPrefix(key, vNode) {
        vNode.key = key + vNode.key;
        return vNode;
    }
    function _normalizeVNodes(nodes, result, index, currentKey) {
        for (var len = nodes.length; index < len; index++) {
            var n = nodes[index];
            var key = currentKey + "." + index;
            if (!isInvalid(n)) {
                if (isArray(n)) {
                    _normalizeVNodes(n, result, 0, key);
                }
                else {
                    if (isStringOrNumber(n)) {
                        n = createTextVNode(n, null);
                    }
                    else if ((isVNode(n) && n.dom) || (n.key && n.key[0] === ".")) {
                        n = directClone(n);
                    }
                    if (isNull(n.key) || n.key[0] === ".") {
                        n = applyKey(key, n);
                    }
                    else {
                        n = applyKeyPrefix(currentKey, n);
                    }
                    result.push(n);
                }
            }
        }
    }
    function normalizeVNodes(nodes) {
        var newNodes;
        // we assign $ which basically means we've flagged this array for future note
        // if it comes back again, we need to clone it, as people are using it
        // in an immutable way
        // tslint:disable
        if (nodes["$"] === true) {
            nodes = nodes.slice();
        }
        else {
            nodes["$"] = true;
        }
        // tslint:enable
        for (var i = 0, len = nodes.length; i < len; i++) {
            var n = nodes[i];
            if (isInvalid(n) || isArray(n)) {
                var result = (newNodes || nodes).slice(0, i);
                _normalizeVNodes(nodes, result, i, "");
                return result;
            }
            else if (isStringOrNumber(n)) {
                if (!newNodes) {
                    newNodes = nodes.slice(0, i);
                }
                newNodes.push(applyKeyIfMissing(i, createTextVNode(n, null)));
            }
            else if ((isVNode(n) && n.dom !== null) ||
                (isNull(n.key) && (n.flags & 64 /* HasNonKeyedChildren */) === 0)) {
                if (!newNodes) {
                    newNodes = nodes.slice(0, i);
                }
                newNodes.push(applyKeyIfMissing(i, directClone(n)));
            }
            else if (newNodes) {
                newNodes.push(applyKeyIfMissing(i, directClone(n)));
            }
        }
        return newNodes || nodes;
    }
    function normalizeChildren(children) {
        if (isArray(children)) {
            return normalizeVNodes(children);
        }
        else if (isVNode(children) && children.dom !== null) {
            return directClone(children);
        }
        return children;
    }
    function normalizeProps(vNode, props, children) {
        if (vNode.flags & 3970 /* Element */) {
            if (isNullOrUndef(children) && props.hasOwnProperty("children")) {
                vNode.children = props.children;
            }
            if (props.hasOwnProperty("className")) {
                vNode.className = props.className || null;
                delete props.className;
            }
        }
        if (props.hasOwnProperty("ref")) {
            vNode.ref = props.ref;
            delete props.ref;
        }
        if (props.hasOwnProperty("key")) {
            vNode.key = props.key;
            delete props.key;
        }
    }
    function getFlagsForElementVnode(type) {
        if (type === "svg") {
            return 128 /* SvgElement */;
        }
        if (type === "input") {
            return 512 /* InputElement */;
        }
        if (type === "select") {
            return 2048 /* SelectElement */;
        }
        if (type === "textarea") {
            return 1024 /* TextareaElement */;
        }
        if (type === "media") {
            return 256 /* MediaElement */;
        }
        return 2 /* HtmlElement */;
    }
    function normalize(vNode) {
        var props = vNode.props;
        var children = vNode.children;
        // convert a wrongly created type back to element
        // Primitive node doesn't have defaultProps, only Component
        if (vNode.flags & 28 /* Component */) {
            // set default props
            var type = vNode.type;
            var defaultProps = type.defaultProps;
            if (!isNullOrUndef(defaultProps)) {
                if (!props) {
                    props = vNode.props = defaultProps; // Create new object if only defaultProps given
                }
                else {
                    for (var prop in defaultProps) {
                        if (isUndefined(props[prop])) {
                            props[prop] = defaultProps[prop];
                        }
                    }
                }
            }
            if (isString(type)) {
                vNode.flags = getFlagsForElementVnode(type);
                if (props && props.children) {
                    vNode.children = props.children;
                    children = props.children;
                }
            }
        }
        if (props) {
            normalizeProps(vNode, props, children);
            if (!isInvalid(props.children)) {
                props.children = normalizeChildren(props.children);
            }
        }
        if (!isInvalid(children)) {
            vNode.children = normalizeChildren(children);
        }
        {
            // This code will be stripped out from production CODE
            // It helps users to track errors in their applications.
            var verifyKeys = function (vNodes) {
                var keyValues = vNodes.map((function (vnode) {
                    return vnode.key;
                }));
                keyValues.some((function (item, idx) {
                    var hasDuplicate = keyValues.indexOf(item) !== idx;
                    if (hasDuplicate) {
                        warning("Inferno normalisation(...): Encountered two children with same key, all keys must be unique within its siblings. Duplicated key is:" +
                            item);
                    }
                    return hasDuplicate;
                }));
            };
            if (vNode.children && Array.isArray(vNode.children)) {
                verifyKeys(vNode.children);
            }
        }
    }
    var options = {
        afterMount: null,
        afterRender: null,
        afterUpdate: null,
        beforeRender: null,
        beforeUnmount: null,
        createVNode: null,
        findDOMNodeEnabled: false,
        roots: []
    };

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

    function createWrappedFunction(methodName, applyValue) {
        var fnMethod = function (e) {
            e.stopPropagation();
            var vNode = this.vNode;
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
                applyValue(newProps, dom);
            }
        };
        Object.defineProperty(fnMethod, "wrapped", {
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
        return type === "checkbox" || type === "radio";
    }
    var onTextInputChange = createWrappedFunction("onInput", applyValue);
    var wrappedOnChange = createWrappedFunction("onChange", applyValue);
    var onCheckboxChange = createWrappedFunction("onClick");
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
            dom.setAttribute("type", type);
        }
        if (multiple && multiple !== dom.multiple) {
            dom.multiple = multiple;
        }
        if (!isNullOrUndef(defaultValue) && !hasValue) {
            dom.defaultValue = defaultValue + "";
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
        if (type === "optgroup") {
            var children = vNode.children;
            if (isArray(children)) {
                for (var i = 0, len = children.length; i < len; i++) {
                    updateChildOption(children[i], value);
                }
            }
            else if (isVNode(children)) {
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
    var onSelectChange = createWrappedFunction("onChange", applyValue$1);
    function processSelect(vNode, dom, nextPropsOrEmpty, mounting, isControlled) {
        applyValue$1(vNode, dom, nextPropsOrEmpty, mounting);
        if (isControlled) {
            dom.vNode = vNode;
            if (mounting) {
                dom.onchange = onSelectChange;
            }
        }
    }
    function applyValue$1(vNode, dom, nextPropsOrEmpty, mounting) {
        if (nextPropsOrEmpty.multiple !== dom.multiple) {
            dom.multiple = nextPropsOrEmpty.multiple;
        }
        var children = vNode.children;
        if (!isInvalid(children)) {
            var value = nextPropsOrEmpty.value;
            if (mounting && isNullOrUndef(value)) {
                value = nextPropsOrEmpty.defaultValue;
            }
            if (isArray(children)) {
                for (var i = 0, len = children.length; i < len; i++) {
                    updateChildOptionGroup(children[i], value);
                }
            }
            else if (isVNode(children)) {
                updateChildOptionGroup(children, value);
            }
        }
    }

    /**
     * @module Inferno
     */ /** TypeDoc Comment */
    var onTextareaInputChange = createWrappedFunction("onInput", applyValue$2);
    var wrappedOnChange$1 = createWrappedFunction("onChange");
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
                if (!isNullOrUndef(defaultValue)) {
                    if (defaultValue !== domValue) {
                        dom.defaultValue = defaultValue;
                        dom.value = defaultValue;
                    }
                }
                else if (domValue !== "") {
                    dom.defaultValue = "";
                    dom.value = "";
                }
            }
        }
        else {
            /* There is value so keep it controlled */
            if (domValue !== value) {
                dom.defaultValue = value;
                dom.value = value;
            }
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
        if ((flags & 512 /* InputElement */) > 0) {
            processInput(vNode, dom, nextPropsOrEmpty, mounting, isControlled);
        }
        else if ((flags & 2048 /* SelectElement */) > 0) {
            processSelect(vNode, dom, nextPropsOrEmpty, mounting, isControlled);
        }
        else if ((flags & 1024 /* TextareaElement */) > 0) {
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
                    Object.defineProperty(event, "currentTarget", {
                        configurable: true,
                        get: function get() {
                            return eventData.dom;
                        }
                    });
                }
                catch (e) {
                    /* safari7 and phantomJS will crash */
                }
                dispatchEvents(event, event.target, delegatedRoots.items, count, event.type === "click", eventData);
            }
        };
        document.addEventListener(normalizeEventName(name), docEvent);
        return docEvent;
    }

    /**
     * @module Inferno
     */ /** TypeDoc Comment */
    function isSameInnerHTML(dom, innerHTML) {
        var tempdom = document.createElement("i");
        tempdom.innerHTML = innerHTML;
        return tempdom.innerHTML === dom.innerHTML;
    }
    function isSamePropsInnerHTML(dom, props) {
        return Boolean(props &&
            props.dangerouslySetInnerHTML &&
            props.dangerouslySetInnerHTML.__html &&
            isSameInnerHTML(dom, props.dangerouslySetInnerHTML.__html));
    }

    /**
     * @module Inferno
     */ /** TypeDoc Comment */
    function isAttrAnEvent(attr) {
        return attr[0] === "o" && attr[1] === "n";
    }
    function patchEvent(name, lastValue, nextValue, dom) {
        if (lastValue !== nextValue) {
            if (delegatedEvents.has(name)) {
                handleEvent(name, nextValue, dom);
            }
            else {
                var nameLowerCase = name.toLowerCase();
                var domEvent = dom[nameLowerCase];
                // if the function is wrapped, that means it's been controlled by a wrapper
                if (domEvent && domEvent.wrapped) {
                    return;
                }
                if (!isFunction(nextValue) && !isNullOrUndef(nextValue)) {
                    var linkEvent = nextValue.event;
                    if (linkEvent && isFunction(linkEvent)) {
                        dom[nameLowerCase] = function (e) {
                            linkEvent(nextValue.data, e);
                        };
                    }
                    else {
                        {
                            throwError(("an event on a VNode \"" + name + "\". was not a function or a valid linkEvent."));
                        }
                        throwError();
                    }
                }
                else {
                    dom[nameLowerCase] = nextValue;
                }
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
                            : value + "px";
                }
            }
            for (style in lastAttrValue) {
                if (isNullOrUndef(nextAttrValue[style])) {
                    domStyle[style] = "";
                }
            }
        }
        else {
            for (style in nextAttrValue) {
                value = nextAttrValue[style];
                domStyle[style] =
                    !isNumber(value) || isUnitlessNumber.has(style) ? value : value + "px";
            }
        }
    }
    function removeProp(prop, lastValue, dom, nextFlags) {
        if (prop === "value") {
            // When removing value of select element, it needs to be set to null instead empty string, because empty string is valid value for option which makes that option selected
            // MS IE/Edge don't follow html spec for textArea and input elements and we need to set empty string to value in those cases to avoid "null" and "undefined" texts
            dom.value = nextFlags & 2048 /* SelectElement */ ? null : "";
        }
        else if (prop === "style") {
            dom.removeAttribute("style");
        }
        else if (isAttrAnEvent(prop)) {
            handleEvent(prop, null, dom);
        }
        else {
            dom.removeAttribute(prop);
        }
    }
    function patchProp(prop, lastValue, nextValue, dom, isSVG, hasControlledValue) {
        if (lastValue !== nextValue) {
            if (skipProps.has(prop) || (hasControlledValue && prop === "value")) {
                return;
            }
            else if (booleanProps.has(prop)) {
                prop = prop === "autoFocus" ? prop.toLowerCase() : prop;
                dom[prop] = !!nextValue;
            }
            else if (strictProps.has(prop)) {
                var value = isNullOrUndef(nextValue) ? "" : nextValue;
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
            else if (prop === "style") {
                patchStyle(lastValue, nextValue, dom);
            }
            else if (prop === "dangerouslySetInnerHTML") {
                var lastHtml = lastValue && lastValue.__html;
                var nextHtml = nextValue && nextValue.__html;
                if (lastHtml !== nextHtml) {
                    if (!isNullOrUndef(nextHtml) && !isSameInnerHTML(dom, nextHtml)) {
                        dom.innerHTML = nextHtml;
                    }
                }
            }
            else {
                // We optimize for NS being boolean. Its 99.9% time false
                if (isSVG && namespaces.has(prop)) {
                    // If we end up in this path we can read property again
                    dom.setAttributeNS(namespaces.get(prop), prop, nextValue);
                }
                else {
                    dom.setAttribute(prop, nextValue);
                }
            }
        }
    }

    /**
     * @module Inferno
     */ /** TypeDoc Comment */
    function createClassComponentInstance(vNode, Component, props, context, lifecycle) {
        if (isUndefined(context)) {
            context = EMPTY_OBJ; // Context should not be mutable
        }
        var instance = new Component(props, context);
        vNode.children = instance;
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
                if (state === null) {
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
        if (isFunction(options.beforeRender)) {
            options.beforeRender(instance);
        }
        var input = handleComponentInput(instance.render(props, instance.state, context), vNode);
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
                throwError("a valid Inferno VNode (or null) must be returned from a component render. You may have returned an array or an invalid object.");
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
            if ((input.flags & 28 /* Component */) > 0) {
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
        if ((flags & 3970 /* Element */) > 0) {
            return mountElement(vNode, parentDom, lifecycle, context, isSVG);
        }
        if ((flags & 28 /* Component */) > 0) {
            return mountComponent(vNode, parentDom, lifecycle, context, isSVG, (flags & 4 /* ComponentClass */) > 0);
        }
        if ((flags & 4096 /* Void */) > 0) {
            return mountVoid(vNode, parentDom);
        }
        if ((flags & 1 /* Text */) > 0) {
            return mountText(vNode, parentDom);
        }
        if ((flags & 8192 /* Portal */) > 0) {
            return mountPortal(vNode, parentDom, lifecycle, context);
        }
        // Development validation, in production we don't need to throw because it crashes anyway
        {
            if (typeof vNode === "object") {
                throwError(("mount() received an object that's not a valid VNode, you should stringify it first. Object: \"" + (JSON.stringify(vNode)) + "\"."));
            }
            else {
                throwError(("mount() expects a valid VNode, instead it received an object with the type \"" + (typeof vNode) + "\"."));
            }
        }
    }
    function mountText(vNode, parentDom) {
        var dom = document.createTextNode(vNode.children);
        vNode.dom = dom;
        if (!isNull(parentDom)) {
            appendChild(parentDom, dom);
        }
        return dom;
    }
    function mountPortal(vNode, parentDom, lifecycle, context) {
        mount(vNode.children, vNode.type, lifecycle, context, false);
        return (vNode.dom = mountVoid(createVoidVNode(), parentDom));
    }
    function mountVoid(vNode, parentDom) {
        return mountText(vNode, parentDom);
    }
    function mountElement(vNode, parentDom, lifecycle, context, isSVG) {
        var dom;
        var flags = vNode.flags;
        isSVG = isSVG || (flags & 128 /* SvgElement */) > 0;
        dom = documentCreateElement(vNode.type, isSVG);
        var children = vNode.children;
        var props = vNode.props;
        var className = vNode.className;
        var ref = vNode.ref;
        vNode.dom = dom;
        if (!isInvalid(children)) {
            if (isStringOrNumber(children)) {
                setTextContent(dom, children);
            }
            else {
                var childrenIsSVG = isSVG === true && vNode.type !== "foreignObject";
                if (isArray(children)) {
                    mountArrayChildren(children, dom, lifecycle, context, childrenIsSVG);
                }
                else if (isVNode(children)) {
                    mount(children, dom, lifecycle, context, childrenIsSVG);
                }
            }
        }
        if (!isNull(props)) {
            var hasControlledValue = false;
            var isFormElement = (flags & 3584 /* FormElement */) > 0;
            if (isFormElement) {
                hasControlledValue = isControlledFormElement(props);
            }
            for (var prop in props) {
                // do not add a hasOwnProperty check here, it affects performance
                patchProp(prop, null, props[prop], dom, isSVG, hasControlledValue);
            }
            if (isFormElement) {
                processElement(flags, vNode, dom, props, true, hasControlledValue);
            }
        }
        if (className !== null) {
            if (isSVG) {
                dom.setAttribute("class", className);
            }
            else {
                dom.className = className;
            }
        }
        if (!isNull(ref)) {
            mountRef(dom, ref, lifecycle);
        }
        if (!isNull(parentDom)) {
            appendChild(parentDom, dom);
        }
        return dom;
    }
    function mountArrayChildren(children, dom, lifecycle, context, isSVG) {
        for (var i = 0, len = children.length; i < len; i++) {
            var child = children[i];
            // Verify can string/number be here. might cause de-opt. - Normalization takes care of it.
            if (!isInvalid(child)) {
                if (child.dom) {
                    children[i] = child = directClone(child);
                }
                mount(children[i], dom, lifecycle, context, isSVG);
            }
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
            instance.$V = vNode;
            vNode.dom = dom = mount(input, null, lifecycle, instance.$CX, isSVG);
            if (!isNull(parentDom)) {
                appendChild(parentDom, dom);
            }
            mountClassComponentCallbacks(vNode, ref, instance, lifecycle);
            instance.$UPD = false;
            if (options.findDOMNodeEnabled) {
                componentToDOMNodeMap.set(instance, dom);
            }
        }
        else {
            var input$1 = handleComponentInput(type(props, context), vNode);
            vNode.dom = dom = mount(input$1, null, lifecycle, context, isSVG);
            vNode.children = input$1;
            mountFunctionalComponentCallbacks(props, ref, dom, lifecycle);
            if (!isNull(parentDom)) {
                appendChild(parentDom, dom);
            }
        }
        return dom;
    }
    function mountClassComponentCallbacks(vNode, ref, instance, lifecycle) {
        if (ref) {
            if (isFunction(ref)) {
                ref(instance);
            }
            else {
                {
                    if (isStringOrNumber(ref)) {
                        throwError('string "refs" are not supported in Inferno 1.0. Use callback "refs" instead.');
                    }
                    else if (isObject(ref) && vNode.flags & 4 /* ComponentClass */) {
                        throwError("functional component lifecycle events are not supported on ES2015 class components.");
                    }
                    else {
                        throwError(("a bad value for \"ref\" was used on component: \"" + (JSON.stringify(ref)) + "\""));
                    }
                }
                throwError();
            }
        }
        var hasDidMount = !isUndefined(instance.componentDidMount);
        var afterMount = options.afterMount;
        if (hasDidMount || !isNull(afterMount)) {
            lifecycle.push((function () {
                instance.$UPD = true;
                if (afterMount) {
                    afterMount(vNode);
                }
                if (hasDidMount) {
                    instance.componentDidMount();
                }
                instance.$UPD = false;
            }));
        }
    }
    function mountFunctionalComponentCallbacks(props, ref, dom, lifecycle) {
        if (ref) {
            if (!isNullOrUndef(ref.onComponentWillMount)) {
                ref.onComponentWillMount(props);
            }
            if (!isNullOrUndef(ref.onComponentDidMount)) {
                lifecycle.push((function () { return ref.onComponentDidMount(dom, props); }));
            }
        }
    }
    function mountRef(dom, value, lifecycle) {
        if (isFunction(value)) {
            lifecycle.push((function () { return value(dom); }));
        }
        else {
            if (isInvalid(value)) {
                return;
            }
            {
                throwError('string "refs" are not supported in Inferno 1.0. Use callback "refs" instead.');
            }
            throwError();
        }
    }

    /**
     * @module Inferno
     */ /** TypeDoc Comment */
    function unmount(vNode, parentDom) {
        var flags = vNode.flags;
        var dom = vNode.dom;
        if ((flags & 28 /* Component */) > 0) {
            var instance = vNode.children;
            var isStatefulComponent$$1 = (flags & 4 /* ComponentClass */) > 0;
            var props = vNode.props || EMPTY_OBJ;
            var ref = vNode.ref;
            if (isStatefulComponent$$1) {
                if (!instance.$UN) {
                    if (isFunction(options.beforeUnmount)) {
                        options.beforeUnmount(vNode);
                    }
                    if (isFunction(instance.componentWillUnmount)) {
                        instance.componentWillUnmount();
                    }
                    if (isFunction(ref)) {
                        ref(null);
                    }
                    instance.$UN = true;
                    if (options.findDOMNodeEnabled) {
                        componentToDOMNodeMap.delete(instance);
                    }
                    unmount(instance.$LI, null);
                }
            }
            else {
                if (!isNullOrUndef(ref)) {
                    if (isFunction(ref.onComponentWillUnmount)) {
                        ref.onComponentWillUnmount(dom, props);
                    }
                }
                unmount(instance, null);
            }
        }
        else if ((flags & 3970 /* Element */) > 0) {
            var ref$1 = vNode.ref;
            var props$1 = vNode.props;
            if (isFunction(ref$1)) {
                ref$1(null);
            }
            var children = vNode.children;
            if (!isNullOrUndef(children)) {
                if (isArray(children)) {
                    for (var i = 0, len = children.length; i < len; i++) {
                        var child = children[i];
                        if (!isInvalid(child) && isObject(child)) {
                            unmount(child, null);
                        }
                    }
                }
                else if (isObject(children)) {
                    unmount(children, null);
                }
            }
            if (!isNull(props$1)) {
                for (var name in props$1) {
                    // Remove all delegated events, regular events die with dom node
                    if (delegatedEvents.has(name)) {
                        handleEvent(name, null, dom);
                    }
                }
            }
        }
        else if ((flags & 8192 /* Portal */) > 0) {
            var children$1 = vNode.children;
            if (!isInvalid(children$1) && isObject(children$1)) {
                unmount(children$1, vNode.type);
            }
        }
        if (!isNull(parentDom)) {
            removeChild(parentDom, dom);
        }
    }

    /**
     * @module Inferno
     */
    /** TypeDoc Comment */
    function replaceVNode(parentDom, dom, vNode) {
        unmount(vNode, null);
        if (!isNull(dom)) {
            replaceChild(parentDom, dom, vNode.dom);
        }
        else {
            removeChild(parentDom, vNode.dom);
        }
    }
    function removeAllChildren(dom, children) {
        for (var i = 0, len = children.length; i < len; i++) {
            var child = children[i];
            if (!isInvalid(child)) {
                unmount(child, null);
            }
        }
        dom.textContent = "";
    }
    function replaceWithNewNode(lastNode, nextNode, parentDom, lifecycle, context, isSVG) {
        unmount(lastNode, null);
        replaceChild(parentDom, mount(nextNode, null, lifecycle, context, isSVG), lastNode.dom);
    }
    function patch(lastVNode, nextVNode, parentDom, lifecycle, context, isSVG) {
        if (lastVNode !== nextVNode) {
            var lastFlags = lastVNode.flags;
            var nextFlags = nextVNode.flags;
            if (lastFlags & 8192 /* Portal */) {
                if (nextFlags & 8192 /* Portal */) {
                    patchPortal(lastVNode, nextVNode, lifecycle, context);
                }
                else {
                    replaceVNode(parentDom, mount(nextVNode, null, lifecycle, context, isSVG), lastVNode);
                }
            }
            else if (nextFlags & 28 /* Component */) {
                var isClass = (nextFlags & 4 /* ComponentClass */) > 0;
                if (lastFlags & 28 /* Component */) {
                    patchComponent(lastVNode, nextVNode, parentDom, lifecycle, context, isSVG, isClass);
                }
                else {
                    replaceVNode(parentDom, mountComponent(nextVNode, null, lifecycle, context, isSVG, isClass), lastVNode);
                }
            }
            else if (nextFlags & 3970 /* Element */) {
                if (lastFlags & 3970 /* Element */) {
                    patchElement(lastVNode, nextVNode, parentDom, lifecycle, context, isSVG);
                }
                else {
                    replaceVNode(parentDom, mountElement(nextVNode, null, lifecycle, context, isSVG), lastVNode);
                }
            }
            else if (nextFlags & 1 /* Text */) {
                if (lastFlags & 1 /* Text */) {
                    patchText(lastVNode, nextVNode);
                }
                else {
                    replaceVNode(parentDom, mountText(nextVNode, null), lastVNode);
                }
            }
            else if (nextFlags & 4096 /* Void */) {
                if (lastFlags & 4096 /* Void */) {
                    patchVoid(lastVNode, nextVNode);
                }
                else {
                    replaceVNode(parentDom, mountVoid(nextVNode, null), lastVNode);
                }
            }
            else if (nextFlags & 8192 /* Portal */) {
                replaceVNode(parentDom, mount(nextVNode, null, lifecycle, context, isSVG), lastVNode);
            }
            else {
                // Error case: mount new one replacing old one
                replaceVNode(parentDom, mount(nextVNode, null, lifecycle, context, isSVG), lastVNode);
            }
        }
    }
    function patchPortal(lastVNode, nextVNode, lifecycle, context) {
        var lastContainer = lastVNode.type;
        var nextContainer = nextVNode.type;
        var nextChildren = nextVNode.children;
        patchChildren(0, 0, lastVNode.children, nextChildren, lastContainer, lifecycle, context, false);
        nextVNode.dom = lastVNode.dom;
        if (lastContainer !== nextContainer && !isInvalid(nextChildren)) {
            var node = nextChildren.dom;
            lastContainer.removeChild(node);
            nextContainer.appendChild(node);
        }
    }
    function unmountChildren(children, dom) {
        if (isVNode(children)) {
            unmount(children, dom);
        }
        else if (isArray(children)) {
            removeAllChildren(dom, children);
        }
        else {
            dom.textContent = "";
        }
    }
    function patchElement(lastVNode, nextVNode, parentDom, lifecycle, context, isSVG) {
        var nextTag = nextVNode.type;
        if (lastVNode.type !== nextTag) {
            replaceWithNewNode(lastVNode, nextVNode, parentDom, lifecycle, context, isSVG);
        }
        else {
            var dom = lastVNode.dom;
            var lastProps = lastVNode.props;
            var nextProps = nextVNode.props;
            var lastChildren = lastVNode.children;
            var nextChildren = nextVNode.children;
            var lastFlags = lastVNode.flags;
            var nextFlags = nextVNode.flags;
            var nextRef = nextVNode.ref;
            var lastClassName = lastVNode.className;
            var nextClassName = nextVNode.className;
            nextVNode.dom = dom;
            isSVG = isSVG || (nextFlags & 128 /* SvgElement */) > 0;
            if (lastChildren !== nextChildren) {
                patchChildren(lastFlags, nextFlags, lastChildren, nextChildren, dom, lifecycle, context, isSVG && nextTag !== "foreignObject");
            }
            // inlined patchProps  -- starts --
            if (lastProps !== nextProps) {
                var lastPropsOrEmpty = lastProps || EMPTY_OBJ;
                var nextPropsOrEmpty = nextProps || EMPTY_OBJ;
                var hasControlledValue = false;
                if (nextPropsOrEmpty !== EMPTY_OBJ) {
                    var isFormElement = (nextFlags & 3584 /* FormElement */) > 0;
                    if (isFormElement) {
                        hasControlledValue = isControlledFormElement(nextPropsOrEmpty);
                    }
                    for (var prop in nextPropsOrEmpty) {
                        patchProp(prop, lastPropsOrEmpty[prop], nextPropsOrEmpty[prop], dom, isSVG, hasControlledValue);
                    }
                    if (isFormElement) {
                        processElement(nextFlags, nextVNode, dom, nextPropsOrEmpty, false, hasControlledValue);
                    }
                }
                if (lastPropsOrEmpty !== EMPTY_OBJ) {
                    for (var prop$1 in lastPropsOrEmpty) {
                        // do not add a hasOwnProperty check here, it affects performance
                        if (isNullOrUndef(nextPropsOrEmpty[prop$1]) &&
                            !isNullOrUndef(lastPropsOrEmpty[prop$1])) {
                            removeProp(prop$1, lastPropsOrEmpty[prop$1], dom, nextFlags);
                        }
                    }
                }
            }
            // inlined patchProps  -- ends --
            if (lastClassName !== nextClassName) {
                if (isNullOrUndef(nextClassName)) {
                    dom.removeAttribute("class");
                }
                else {
                    if (isSVG) {
                        dom.setAttribute("class", nextClassName);
                    }
                    else {
                        dom.className = nextClassName;
                    }
                }
            }
            if (nextRef && (lastVNode.ref !== nextRef)) {
                mountRef(dom, nextRef, lifecycle);
            }
        }
    }
    function patchChildren(lastFlags, nextFlags, lastChildren, nextChildren, dom, lifecycle, context, isSVG) {
        var patchArray = false;
        if ((nextFlags & 96 /* MultipleChildren */) && (lastFlags & 96 /* MultipleChildren */)) {
            patchArray = true;
        }
        else if (isInvalid(nextChildren)) {
            unmountChildren(lastChildren, dom);
        }
        else if (isInvalid(lastChildren)) {
            if (isStringOrNumber(nextChildren)) {
                setTextContent(dom, nextChildren);
            }
            else {
                if (isArray(nextChildren)) {
                    mountArrayChildren(nextChildren, dom, lifecycle, context, isSVG);
                }
                else {
                    mount(nextChildren, dom, lifecycle, context, isSVG);
                }
            }
        }
        else if (isStringOrNumber(nextChildren)) {
            if (isStringOrNumber(lastChildren)) {
                updateTextContent(dom, nextChildren);
            }
            else {
                unmountChildren(lastChildren, dom);
                setTextContent(dom, nextChildren);
            }
        }
        else if (isArray(nextChildren)) {
            if (isArray(lastChildren)) {
                patchArray = true;
            }
            else {
                unmountChildren(lastChildren, dom);
                mountArrayChildren(nextChildren, dom, lifecycle, context, isSVG);
            }
        }
        else if (isArray(lastChildren)) {
            removeAllChildren(dom, lastChildren);
            mount(nextChildren, dom, lifecycle, context, isSVG);
        }
        else if (isVNode(nextChildren)) {
            if (isVNode(lastChildren)) {
                patch(lastChildren, nextChildren, dom, lifecycle, context, isSVG);
            }
            else {
                unmountChildren(lastChildren, dom);
                mount(nextChildren, dom, lifecycle, context, isSVG);
            }
        }
        if (patchArray) {
            var lastLength = lastChildren.length;
            var nextLength = nextChildren.length;
            // Fast path's for both algorithms
            if (lastLength === 0) {
                if (nextLength > 0) {
                    mountArrayChildren(nextChildren, dom, lifecycle, context, isSVG);
                }
            }
            else if (nextLength === 0) {
                removeAllChildren(dom, lastChildren);
            }
            else {
                if (((nextFlags & 32 /* HasKeyedChildren */) &&
                    (lastFlags & 32 /* HasKeyedChildren */))
                    || isKeyed(lastChildren, nextChildren)) {
                    patchKeyedChildren(lastChildren, nextChildren, dom, lifecycle, context, isSVG, lastLength, nextLength);
                }
                else {
                    patchNonKeyedChildren(lastChildren, nextChildren, dom, lifecycle, context, isSVG, lastLength, nextLength);
                }
            }
        }
    }
    function updateClassComponent(instance, nextState, nextVNode, nextProps, parentDom, lifecycle, context, isSVG, force, fromSetState) {
        var hasComponentDidUpdate = isFunction(instance.componentDidUpdate);
        // When component has componentDidUpdate hook, we need to clone lastState or will be modified by reference during update
        var lastState = instance.state;
        var lastProps = instance.props;
        nextVNode.children = instance;
        var lastInput = instance.$LI;
        var renderOutput;
        if (instance.$UN) {
            {
                throwError("Inferno Error: Can only update a mounted or mounting component. This usually means you called setState() or forceUpdate() on an unmounted component. This is a no-op.");
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
            // Update component before getting child context
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
                if (hasComponentDidUpdate) {
                    instance.componentDidUpdate(lastProps, lastState);
                }
                if (isFunction(options.afterUpdate)) {
                    options.afterUpdate(nextVNode);
                }
                if (options.findDOMNodeEnabled) {
                    componentToDOMNodeMap.set(instance, nextInput.dom);
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
                if (lastKey !== nextKey) {
                    shouldUpdate = true;
                }
                else {
                    if (nextHooksDefined && isFunction(nextHooks.onComponentShouldUpdate)) {
                        shouldUpdate = nextHooks.onComponentShouldUpdate(lastProps, nextProps);
                    }
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
                else if ((lastInput.flags & 28 /* Component */) > 0) {
                    lastInput.parentVNode = nextVNode;
                }
            }
        }
    }
    function patchText(lastVNode, nextVNode) {
        var nextText = nextVNode.children;
        var dom = lastVNode.dom;
        nextVNode.dom = dom;
        if (lastVNode.children !== nextText) {
            dom.nodeValue = nextText;
        }
    }
    function patchVoid(lastVNode, nextVNode) {
        nextVNode.dom = lastVNode.dom;
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
                unmount(lastChildren[i], dom);
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
                unmount(a[aStart++], dom);
            }
        }
        else {
            var aLeft = aEnd - aStart + 1;
            var bLeft = bEnd - bStart + 1;
            var sources = new Array(bLeft);
            // Mark all nodes as inserted.
            for (i = 0; i < bLeft; i++) {
                sources[i] = -1;
            }
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
                while (bStart < bLeft) {
                    node = b[bStart];
                    if (node.dom) {
                        b[bStart] = node = directClone(node);
                    }
                    bStart++;
                    insertOrAppend(dom, mount(node, null, lifecycle, context, isSVG), null);
                }
            }
            else {
                i = aLeft - patched;
                while (i > 0) {
                    aNode = a[aStart++];
                    if (!isNull(aNode)) {
                        unmount(aNode, dom);
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
                        else {
                            if (j < 0 || i !== seq[j]) {
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
        var p = arr.slice(0);
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
    function normalizeChildNodes(parentDom) {
        var dom = parentDom.firstChild;
        while (dom) {
            if (dom.nodeType === 8) {
                if (dom.data === "!") {
                    var placeholder = document.createTextNode("");
                    parentDom.replaceChild(placeholder, dom);
                    dom = dom.nextSibling;
                }
                else {
                    var lastDom = dom.previousSibling;
                    parentDom.removeChild(dom);
                    dom = lastDom || parentDom.firstChild;
                }
            }
            else {
                dom = dom.nextSibling;
            }
        }
    }
    function hydrateComponent(vNode, dom, lifecycle, context, isSVG, isClass) {
        var type = vNode.type;
        var ref = vNode.ref;
        var props = vNode.props || EMPTY_OBJ;
        if (isClass) {
            var instance = createClassComponentInstance(vNode, type, props, context, lifecycle);
            var input = instance.$LI;
            instance.$V = vNode;
            hydrate(input, dom, lifecycle, instance.$CX, isSVG);
            vNode.dom = input.dom;
            mountClassComponentCallbacks(vNode, ref, instance, lifecycle);
            instance.$UPD = false; // Mount finished allow going sync
            if (options.findDOMNodeEnabled) {
                componentToDOMNodeMap.set(instance, dom);
            }
        }
        else {
            var input$1 = handleComponentInput(type(props, context), vNode);
            hydrate(input$1, dom, lifecycle, context, isSVG);
            vNode.children = input$1;
            vNode.dom = input$1.dom;
            mountFunctionalComponentCallbacks(props, ref, dom, lifecycle);
        }
        return dom;
    }
    function hydrateElement(vNode, dom, lifecycle, context, isSVG) {
        var children = vNode.children;
        var props = vNode.props;
        var className = vNode.className;
        var flags = vNode.flags;
        var ref = vNode.ref;
        isSVG = isSVG || (flags & 128 /* SvgElement */) > 0;
        if (dom.nodeType !== 1 || dom.tagName.toLowerCase() !== vNode.type) {
            {
                warning("Inferno hydration: Server-side markup doesn't match client-side markup or Initial render target is not empty");
            }
            var newDom = mountElement(vNode, null, lifecycle, context, isSVG);
            vNode.dom = newDom;
            replaceChild(dom.parentNode, newDom, dom);
            return newDom;
        }
        vNode.dom = dom;
        if (!isInvalid(children)) {
            hydrateChildren(children, dom, lifecycle, context, isSVG);
        }
        else if (dom.firstChild !== null && !isSamePropsInnerHTML(dom, props)) {
            dom.textContent = ""; // dom has content, but VNode has no children remove everything from DOM
        }
        if (props) {
            var hasControlledValue = false;
            var isFormElement = (flags & 3584 /* FormElement */) > 0;
            if (isFormElement) {
                hasControlledValue = isControlledFormElement(props);
            }
            for (var prop in props) {
                // do not add a hasOwnProperty check here, it affects performance
                patchProp(prop, null, props[prop], dom, isSVG, hasControlledValue);
            }
            if (isFormElement) {
                processElement(flags, vNode, dom, props, true, hasControlledValue);
            }
        }
        if (!isNullOrUndef(className)) {
            if (isSVG) {
                dom.setAttribute("class", className);
            }
            else {
                dom.className = className;
            }
        }
        else {
            if (dom.className !== "") {
                dom.removeAttribute("class");
            }
        }
        if (ref) {
            mountRef(dom, ref, lifecycle);
        }
    }
    function hydrateChildren(children, parentDom, lifecycle, context, isSVG) {
        normalizeChildNodes(parentDom);
        var dom = parentDom.firstChild;
        if (isStringOrNumber(children)) {
            if (!isNull(dom) && dom.nodeType === 3) {
                if (dom.nodeValue !== children) {
                    dom.nodeValue = children;
                }
            }
            else if (children === "") {
                parentDom.appendChild(document.createTextNode(""));
            }
            else {
                parentDom.textContent = children;
            }
            if (!isNull(dom)) {
                dom = dom.nextSibling;
            }
        }
        else if (isArray(children)) {
            for (var i = 0, len = children.length; i < len; i++) {
                var child = children[i];
                if (!isNull(child) && isObject(child)) {
                    if (!isNull(dom)) {
                        var nextSibling = dom.nextSibling;
                        hydrate(child, dom, lifecycle, context, isSVG);
                        dom = nextSibling;
                    }
                    else {
                        mount(child, parentDom, lifecycle, context, isSVG);
                    }
                }
            }
        }
        else {
            // It's VNode
            if (!isNull(dom)) {
                hydrate(children, dom, lifecycle, context, isSVG);
                dom = dom.nextSibling;
            }
            else {
                mount(children, parentDom, lifecycle, context, isSVG);
            }
        }
        // clear any other DOM nodes, there should be only a single entry for the root
        while (dom) {
            var nextSibling$1 = dom.nextSibling;
            parentDom.removeChild(dom);
            dom = nextSibling$1;
        }
    }
    function hydrateText(vNode, dom) {
        if (dom.nodeType !== 3) {
            var newDom = mountText(vNode, null);
            vNode.dom = newDom;
            replaceChild(dom.parentNode, newDom, dom);
            return newDom;
        }
        var text = vNode.children;
        if (dom.nodeValue !== text) {
            dom.nodeValue = text;
        }
        vNode.dom = dom;
    }
    function hydrate(vNode, dom, lifecycle, context, isSVG) {
        var flags = vNode.flags;
        if (flags & 28 /* Component */) {
            hydrateComponent(vNode, dom, lifecycle, context, isSVG, (flags & 4 /* ComponentClass */) > 0);
        }
        else if (flags & 3970 /* Element */) {
            hydrateElement(vNode, dom, lifecycle, context, isSVG);
        }
        else if (flags & 1 /* Text */) {
            hydrateText(vNode, dom);
        }
        else if (flags & 4096 /* Void */) {
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
     */ /** TypeDoc Comment */
    var roots = options.roots;
    function findDOMNode(ref) {
        if (!options.findDOMNodeEnabled) {
            {
                throwError("findDOMNode() has been disabled, use Inferno.options.findDOMNodeEnabled = true; enabled findDOMNode(). Warning this can significantly impact performance!");
            }
            throwError();
        }
        var dom = ref && ref.nodeType ? ref : null;
        return componentToDOMNodeMap.get(ref) || dom;
    }
    function getRoot(dom) {
        for (var i = 0, len = roots.length; i < len; i++) {
            var root = roots[i];
            if (root.dom === dom) {
                return root;
            }
        }
        return null;
    }
    function setRoot(dom, input) {
        var root = {
            dom: dom,
            input: input
        };
        roots.push(root);
        return root;
    }
    function removeRoot(root) {
        for (var i = 0, len = roots.length; i < len; i++) {
            if (roots[i] === root) {
                roots.splice(i, 1);
                return;
            }
        }
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
        var lifecycle = [];
        var root = getRoot(parentDom);
        if (isNull(root)) {
            if (!isInvalid(input)) {
                if (input.dom) {
                    input = directClone(input);
                }
                if (!hydrateRoot(input, parentDom, lifecycle)) {
                    mount(input, parentDom, lifecycle, EMPTY_OBJ, false);
                }
                root = setRoot(parentDom, input);
            }
        }
        else {
            if (isNullOrUndef(input)) {
                unmount(root.input, parentDom);
                removeRoot(root);
            }
            else {
                if (input.dom) {
                    input = directClone(input);
                }
                patch(root.input, input, parentDom, lifecycle, EMPTY_OBJ, false);
                root.input = input;
            }
        }
        callAll(lifecycle);
        if (isFunction(callback)) {
            callback();
        }
        if (root) {
            var rootInput = root.input;
            if (rootInput && rootInput.flags & 28 /* Component */) {
                return rootInput.children;
            }
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
        return createVNode(8192 /* Portal */, container, null, children, null, isInvalid(children) ? null : children.key, null, true);
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
                    resolvedPromise.then((function () {
                        component.$QU = null;
                        component.$UPD = true;
                        applyState(component, false, (function () {
                            for (var i = 0, len = queue.length; i < len; i++) {
                                queue[i].call(component);
                            }
                        }));
                        component.$UPD = false;
                    }));
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
            // const parentDom = vNode.dom;
            // TODO: This is unreliable and bad code, refactor it away
            var lastInput = component.$LI;
            var parentDom = lastInput.dom && lastInput.dom.parentNode;
            updateClassComponent(component, nextState, vNode, props, parentDom, component._lifecycle, context, (vNode.flags & 128 /* SvgElement */) > 0, force, true);
            if (component.$UN) {
                return;
            }
            if ((component.$LI.flags & 8192 /* Portal */) === 0) {
                var dom = component.$LI.dom;
                while (!isNull((vNode = vNode.parentVNode))) {
                    if ((vNode.flags & 28 /* Component */) > 0) {
                        vNode.dom = dom;
                    }
                }
            }
            callAll(component._lifecycle);
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
                throwError("cannot update state via setState() in componentWillUpdate() or constructor.");
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
        if ((testFunc.name || testFunc.toString()).indexOf("testFn") ===
            -1) {
            warning("It looks like you're using a minified copy of the development build " +
                "of Inferno. When deploying Inferno apps to production, make sure to use " +
                "the production build which skips development warnings and is faster. " +
                "See http://infernojs.org for more details.");
        }
    }
    var version = "4.0.0-0";
    // we duplicate it so it plays nicely with different module loading systems
    var index = {
        EMPTY_OBJ: EMPTY_OBJ,
        NO_OP: NO_OP,
        Component: Component,
        cloneVNode: cloneVNode,
        createPortal: createPortal,
        createRenderer: createRenderer,
        createVNode: createVNode,
        findDOMNode: findDOMNode,
        getFlagsForElementVnode: getFlagsForElementVnode,
        internal_DOMNodeMap: componentToDOMNodeMap,
        internal_isUnitlessNumber: isUnitlessNumber,
        internal_normalize: normalize,
        internal_patch: patch,
        linkEvent: linkEvent,
        options: options,
        render: render,
        version: version
    };

    exports['default'] = index;
    exports.Component = Component;
    exports.EMPTY_OBJ = EMPTY_OBJ;
    exports.NO_OP = NO_OP;
    exports.cloneVNode = cloneVNode;
    exports.createPortal = createPortal;
    exports.createRenderer = createRenderer;
    exports.createVNode = createVNode;
    exports.findDOMNode = findDOMNode;
    exports.getFlagsForElementVnode = getFlagsForElementVnode;
    exports.internal_DOMNodeMap = componentToDOMNodeMap;
    exports.internal_isUnitlessNumber = isUnitlessNumber;
    exports.internal_normalize = normalize;
    exports.internal_patch = patch;
    exports.linkEvent = linkEvent;
    exports.options = options;
    exports.render = render;
    exports.version = version;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
