(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (factory((global.Inferno = global.Inferno || {})));
}(this, (function (exports) { 'use strict';

    /**
     * @module Inferno-Shared
     */ /** TypeDoc Comment */
    /**
     * @module Inferno-Shared
     */ /** TypeDoc Comment */ var NO_OP = '$NO_OP';
    var ERROR_MSG = 'a runtime error occured! Use Inferno in development environment to find the error.';
    // This should be boolean and not reference to window.document
    var isBrowser = !!(typeof window !== 'undefined' && window.document);
    // this is MUCH faster than .constructor === Array and instanceof Array
    // in Node 7 and the later versions of V8, slower in older versions though
    var isArray = Array.isArray;
    function isStatefulComponent(o) {
        return !isUndefined(o.prototype) && !isUndefined(o.prototype.render);
    }
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
        console.warn(message);
    }
    function Lifecycle() {
        this.listeners = [];
    }
    Lifecycle.prototype.addListener = function addListener(callback) {
        this.listeners.push(callback);
    };
    Lifecycle.prototype.trigger = function trigger() {
        var listeners = this.listeners;
        var listener;
        // We need to remove current listener from array when calling it, because more listeners might be added
        // TODO: Performance - Check if this can be converted to for loop
        while (listener = listeners.shift()) {
            listener();
        }
    };

    // FiberFLags are used to describe shape of its vNode
    // Flags are used for internal optimizations
    // TODO: Implement this to reduce diffing overhead
    var FiberFlags;
    (function (FiberFlags) {
        FiberFlags[FiberFlags["Text"] = 1] = "Text";
        FiberFlags[FiberFlags["HasNoChildren"] = 2] = "HasNoChildren";
        FiberFlags[FiberFlags["HasKeyedChildren"] = 4] = "HasKeyedChildren";
        FiberFlags[FiberFlags["HasNonKeydChildren"] = 8] = "HasNonKeydChildren";
        FiberFlags[FiberFlags["HasSingleChildren"] = 16] = "HasSingleChildren";
        FiberFlags[FiberFlags["hasEvents"] = 32] = "hasEvents";
    })(FiberFlags || (FiberFlags = {}));
    /**
     * Fiber represents internal vNode tree, which holds the reference to actual DOM.
     * This way user land virtual nodes become stateless and can be moved / hoisted / swapped freely at application level
     * @param {object|string|number} input reference to vNode or string of this Fiber
     * @param {string} i location of current Fiber in fiber tree
     * @constructor
     */
    function Fiber(input, i) {
        this.input = input;
        this.dom = null;
        this.children = null; // This value is null for Fibers that hold text nodes
        this.childrenKeys = null;
        this.lifeCycle = null;
        this.i = i;
        this.c = null;
        this.flags = 0;
    }

    function getFlagsForElementVnode(type) {
        if (type === 'svg') {
            return 64 /* SvgElement */;
        }
        else if (type === 'input') {
            return 256 /* InputElement */;
        }
        else if (type === 'select') {
            return 1024 /* SelectElement */;
        }
        else if (type === 'textarea') {
            return 512 /* TextareaElement */;
        }
        else if (type === 'media') {
            return 128 /* MediaElement */;
        }
        return 1 /* HtmlElement */;
    }
    // tslint:disable-next-line
    var validateChildren = function () { };
    {
        validateChildren = function validateChildren(vNode, children) {
            if (vNode.flags & 256 /* InputElement */) {
                throw new Error('Failed to set children, input elements can\'t have children.');
            }
            if (vNode.flags & 128 /* MediaElement */) {
                throw new Error('Failed to set children, media elements can\'t have children.');
            }
            if (vNode.flags === 0 || vNode.flags & 2048 /* Void */) {
                throw new Error("Failed to set children, Void elements can't have children.");
            }
        };
    }
    function normalize(vNode) {
        var props = vNode.props;
        var children = vNode.children;
        // convert a wrongly created type back to element
        // Primitive node doesn't have defaultProps, only Component
        if (vNode.flags & 14 /* Component */) {
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
        {
            if (props) {
                // TODO: Add validation for ref / key in props className in props
                // TODO: + children being in props if element
                if (!isInvalid(props.children)) {
                    {
                        validateChildren(vNode, props.children);
                    }
                }
            }
            if (!isInvalid(children)) {
                {
                    validateChildren(vNode, children);
                }
            }
            // This code will be stripped out from production CODE
            // It helps users to track errors in their applications.
            var vNodeChildren = vNode.children;
            if (vNodeChildren && Array.isArray(vNodeChildren)) {
                // TODO: ADD VAlidations for these cases:
                // - When there is invalid children of any kind - dont allow keys
                // - When there are no invalid children, verify keys are unique
                //
                // let hasAnyInvalidValue = false;
                //
                // const nullIndex = vNodeChildren.indexOf(null);
                // const falseIndex = vNodeChildren.indexOf(false);
                // const trueIndex = vNodeChildren.indexOf(true);
                // const undefIndex = vNodeChildren.indexOf(void 0);
                //
                // hasAnyInvalidValue = nullIndex >= 0 || falseIndex >= 0 || trueIndex >= 0 || undefIndex >= 0;
                //
                // if (hasAnyInvalidValue) {
                // 	const result = [];
                // 	let item;
                // 	while (vNodeChildren.length > 0) {
                // 		item = array.shift();
                // 		if (!Array.isArray(item)){
                // 			result.push(item);
                // 		} else {
                // 			array = item.concat(array);
                // 		}
                // 	}
                //
                // 	// There should not be any keys
                // 	throwError();
                // } else {
                // 	throwError();
                // }
                //
                // const keyValues = vNodeChildren.map(function(vnode) {
                // 	return vnode.key;
                // });
                // keyValues.some(function(item, idx) {
                // 	const hasDuplicate = keyValues.indexOf(item) !== idx;
                //
                // 	if (hasDuplicate) {
                // 		warning('Inferno normalisation(...): Encountered two children with same key, all keys must be unique within its siblings. Duplicated key is:' + item);
                // 	}
                //
                // 	return hasDuplicate;
                // });
            }
        }
    }

    var options = {
        afterMount: null,
        afterRender: null,
        afterUpdate: null,
        beforeRender: null,
        beforeUnmount: null,
        component: {
            create: null,
            flush: null,
            handleInput: null,
            patch: null,
            rendering: false
        },
        createVNode: null,
        findDOMNodeEnabled: false,
        recyclingEnabled: false,
        roots: new Map()
    };

    function VNode(children, className, flags, key, props, ref, type) {
        this.children = children;
        this.className = className;
        this.flags = flags;
        this.key = key;
        this.props = props;
        this.ref = ref;
        this.type = type;
    }
    /**
     * Creates virtual node
     * @param {number} flags
     * @param {string|Function|null} type
     * @param {string|null=} className
     * @param {object=} children
     * @param {object=} props
     * @param {*=} key
     * @param {object|Function=} ref
     * @returns {VNode} returns new virtual node
     */
    function createVNode(flags, type, className, children, props, key, ref) {
        if (flags & 8 /* ComponentUnknown */) {
            flags = isStatefulComponent(type) ? 2 /* ComponentClass */ : 4 /* ComponentFunction */;
        }
        var vNode = new VNode(children === void 0 ? null : children, className === void 0 ? null : className, flags, key === void 0 ? null : key, props === void 0 ? null : props, ref === void 0 ? null : ref, type);
        normalize(vNode);
        if (options.createVNode !== null) {
            options.createVNode(vNode);
        }
        return vNode;
    }
    function isVNode(o) {
        return !!o.flags;
    }

    /**
     * @module Inferno
     */ /** TypeDoc Comment */
    /**
     * @module Inferno
     */ /** TypeDoc Comment */ var xlinkNS = "http://www.w3.org/1999/xlink";
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
    delegatedEvents.add("onSubmit");
    delegatedEvents.add("onDblClick");
    delegatedEvents.add("onKeyDown");
    delegatedEvents.add("onKeyUp");
    delegatedEvents.add("onKeyPress");

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

    var Pools = function Pools() {
        this.nonKeyed = [];
        this.keyed = new Map();
    };
    var componentPools = new Map();
    var elementPools = new Map();
    // function recycle(tagPools: Map<any, Pools>, vNode): IVNode|undefined {
    // 	const pools = tagPools.get(vNode.type);
    //
    // 	if (!isUndefined(pools)) {
    // 		const key = vNode.key;
    // 		const pool = key === null ? pools.nonKeyed : pools.keyed.get(key);
    //
    // 		if (!isUndefined(pool)) {
    // 			return pool.pop();
    // 		}
    // 	}
    // 	return void 0;
    // }
    function recycleElement(vNode, lifecycle, context, isSVG) {
        // const recycledVNode = recycle(elementPools, vNode);
        // if (recycledVNode !== void 0) {
        // 	patchElement(recycledVNode, vNode, null, lifecycle, context, isSVG, true);
        // 	return vNode.dom;
        // }
        return null;
    }
    function recycleComponent(vNode, lifecycle, context, isSVG) {
        // const recycledVNode = recycle(componentPools, vNode);
        // if (recycledVNode !== void 0) {
        // 	const flags = vNode.flags;
        // 	const failed = patchComponent(
        // 		recycledVNode,
        // 		vNode,
        // 		null,
        // 		lifecycle,
        // 		context,
        // 		isSVG,
        // 		(flags & VNodeFlags.ComponentClass) > 0,
        // 		true
        // 	);
        //
        // 	if (!failed) {
        // 		return vNode.dom;
        // 	}
        // }
        //
        return null;
    }
    function pool(vNode, tagPools) {
        var tag = vNode.type;
        var key = vNode.key;
        var pools = tagPools.get(tag);
        if (isUndefined(pools)) {
            pools = new Pools();
            tagPools.set(tag, pools);
        }
        if (isNull(key)) {
            pools.nonKeyed.push(vNode);
        }
        else {
            var pool = pools.keyed.get(key);
            if (isUndefined(pool)) {
                pool = [];
                pools.keyed.set(key, pool);
            }
            pool.push(vNode);
        }
    }

    function isCheckedType(type) {
        return type === 'checkbox' || type === 'radio';
    }
    var C$3 = options.component;
    function onTextInputChange(e) {
        G.INFRender = true;
        var vNode = this.input;
        var props = vNode.props || EMPTY_OBJ;
        var dom = vNode.dom;
        var previousValue = props.value;
        if (props.onInput) {
            var event = props.onInput;
            if (event.event) {
                event.event(event.data, e);
            }
            else {
                event(e);
            }
        }
        else if (props.oninput) {
            props.oninput(e);
        }
        // the user may have updated the input from the above onInput events syncronously
        // so we need to get it from the context of `this` again
        var newVNode = this.input;
        var newProps = newVNode.props || EMPTY_OBJ;
        // If render is going async there is no value change yet, it will come back to process input soon
        if (previousValue !== newProps.value) {
            // When this happens we need to store current cursor position and restore it, to avoid jumping
            applyValue(newProps, dom);
        }
        if (isFunction(C$3.flush)) {
            C$3.flush();
        }
        G.INFRender = false;
    }
    function wrappedOnChange(e) {
        G.INFRender = true;
        var props = this.input.props || EMPTY_OBJ;
        var event = props.onChange;
        if (event.event) {
            event.event(event.data, e);
        }
        else {
            event(e);
        }
        if (isFunction(C$3.flush)) {
            C$3.flush();
        }
        G.INFRender = false;
    }
    function onCheckboxChange(e) {
        G.INFRender = true;
        e.stopPropagation(); // This click should not propagate its for internal use
        var vNode = this.input;
        var props = vNode.props || EMPTY_OBJ;
        var dom = vNode.dom;
        if (props.onClick) {
            var event = props.onClick;
            if (event.event) {
                event.event(event.data, e);
            }
            else {
                event(e);
            }
        }
        else if (props.onclick) {
            props.onclick(e);
        }
        // the user may have updated the input from the above onInput events syncronously
        // so we need to get it from the context of `this` again
        var newVNode = this.input;
        var newProps = newVNode.props || EMPTY_OBJ;
        // If render is going async there is no value change yet, it will come back to process input soon
        applyValue(newProps, dom);
        if (isFunction(C$3.flush)) {
            C$3.flush();
        }
        G.INFRender = false;
    }
    function processInput(vNode, dom, nextPropsOrEmpty, mounting, isControlled) {
        applyValue(nextPropsOrEmpty, dom);
        if (isControlled) {
            dom.input = vNode; // TODO: Remove this when implementing Fiber's
            if (mounting) {
                if (isCheckedType(nextPropsOrEmpty.type)) {
                    dom.onclick = onCheckboxChange;
                    dom.onclick.wrapped = true;
                }
                else {
                    dom.oninput = onTextInputChange;
                    dom.oninput.wrapped = true;
                }
                if (nextPropsOrEmpty.onChange) {
                    dom.onchange = wrappedOnChange;
                    dom.onchange.wrapped = true;
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
        if (multiple && multiple !== dom.multiple) {
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
        if ((isArray(value) && value.indexOf(props.value) !== -1) || props.value === value) {
            dom.selected = true;
        }
        else if (!isNullOrUndef(value) || !isNullOrUndef(props.selected)) {
            dom.selected = props.selected || false;
        }
    }
    function onSelectChange(e) {
        var vNode = this.input;
        var props = vNode.props || EMPTY_OBJ;
        var dom = vNode.dom;
        var previousValue = props.value;
        if (props.onChange) {
            var event = props.onChange;
            if (event.event) {
                event.event(event.data, e);
            }
            else {
                event(e);
            }
        }
        else if (props.onchange) {
            props.onchange(e);
        }
        // the user may have updated the input from the above onInput events syncronously
        // so we need to get it from the context of `this` again
        var newVNode = this.input;
        var newProps = newVNode.props || EMPTY_OBJ;
        // If render is going async there is no value change yet, it will come back to process input soon
        if (previousValue !== newProps.value) {
            // When this happens we need to store current cursor position and restore it, to avoid jumping
            applyValue$1(newVNode, dom, newProps, false);
        }
    }
    function processSelect(vNode, dom, nextPropsOrEmpty, mounting, isControlled) {
        applyValue$1(vNode, dom, nextPropsOrEmpty, mounting);
        if (isControlled) {
            dom.input = vNode; // TODO: Remove this when implementing Fiber's
            if (mounting) {
                dom.onchange = onSelectChange;
                dom.onchange.wrapped = true;
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
    function wrappedOnChange$1(e) {
        var props = this.input.props || EMPTY_OBJ;
        var event = props.onChange;
        if (event.event) {
            event.event(event.data, e);
        }
        else {
            event(e);
        }
    }
    function onTextareaInputChange(e) {
        var vNode = this.input;
        var props = vNode.props || EMPTY_OBJ;
        var previousValue = props.value;
        if (props.onInput) {
            var event = props.onInput;
            if (event.event) {
                event.event(event.data, e);
            }
            else {
                event(e);
            }
        }
        else if (props.oninput) {
            props.oninput(e);
        }
        // the user may have updated the input from the above onInput events syncronously
        // so we need to get it from the context of `this` again
        var newVNode = this.input;
        var newProps = newVNode.props || EMPTY_OBJ;
        // If render is going async there is no value change yet, it will come back to process input soon
        if (previousValue !== newProps.value) {
            // When this happens we need to store current cursor position and restore it, to avoid jumping
            applyValue$2(newVNode, vNode.dom, false);
        }
    }
    function processTextarea(vNode, dom, nextPropsOrEmpty, mounting, isControlled) {
        applyValue$2(nextPropsOrEmpty, dom, mounting);
        if (isControlled) {
            dom.input = vNode; // TODO: Remove this when implementing Fiber's
            if (mounting) {
                dom.oninput = onTextareaInputChange;
                dom.oninput.wrapped = true;
                if (nextPropsOrEmpty.onChange) {
                    dom.onchange = wrappedOnChange$1;
                    dom.onchange.wrapped = true;
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
                else if (domValue !== '') {
                    dom.defaultValue = '';
                    dom.value = '';
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
        if (flags & 256 /* InputElement */) {
            processInput(vNode, dom, nextPropsOrEmpty, mounting, isControlled);
        }
        if (flags & 1024 /* SelectElement */) {
            processSelect(vNode, dom, nextPropsOrEmpty, mounting, isControlled);
        }
        if (flags & 512 /* TextareaElement */) {
            processTextarea(vNode, dom, nextPropsOrEmpty, mounting, isControlled);
        }
    }
    function isControlledFormElement(nextPropsOrEmpty) {
        return (nextPropsOrEmpty.type && isCheckedType(nextPropsOrEmpty.type)) ? !isNullOrUndef(nextPropsOrEmpty.checked) : !isNullOrUndef(nextPropsOrEmpty.value);
    }

    function unmount(fiber, parentDom, lifecycle, canRecycle, isRecycling) {
        var input = fiber.input;
        if (isStringOrNumber(input)) {
            if (!isNull(parentDom)) {
                removeChild(parentDom, fiber.dom);
            }
        }
        else {
            // It's vNode
            var flags = input.flags;
            if (flags & 1985 /* Element */) {
                unmountElement(fiber, parentDom, lifecycle, canRecycle, isRecycling);
            }
            else if (flags & 14 /* Component */) {
                unmountComponent(fiber, parentDom, lifecycle, canRecycle, isRecycling);
            }
        }
    }
    function unmountComponent(fiber, parentDom, lifecycle, canRecycle, isRecycling) {
        var vNode = fiber.input;
        // const instance = vNode.children as any;
        var instance = fiber.c;
        var flags = vNode.flags;
        var isStatefulComponent$$1 = (flags & 2 /* ComponentClass */) > 0;
        var ref = vNode.ref;
        var dom = fiber.dom;
        var childFiber = fiber.children;
        if (!isRecycling) {
            if (isStatefulComponent$$1) {
                if (!instance._unmounted) {
                    if (isFunction(options.beforeUnmount)) {
                        options.beforeUnmount(vNode);
                    }
                    if (isFunction(instance.componentWillUnmount)) {
                        instance.componentWillUnmount();
                    }
                    if (isFunction(ref) && !isRecycling) {
                        ref(null);
                    }
                    instance._unmounted = true;
                    if (options.findDOMNodeEnabled) {
                        componentToDOMNodeMap.delete(instance);
                    }
                    if (!isNull(childFiber)) {
                        unmount(childFiber, null, instance._lifecycle, false, isRecycling);
                    }
                }
            }
            else {
                if (!isNullOrUndef(ref)) {
                    if (isFunction(ref.onComponentWillUnmount)) {
                        ref.onComponentWillUnmount(dom);
                    }
                }
                if (!isNull(childFiber)) {
                    unmount(childFiber, null, lifecycle, false, isRecycling);
                }
            }
        }
        fiber.children = null;
        if (parentDom && !isNull(dom)) {
            // let lastInput = instance._lastInput;
            //
            // if (isNullOrUndef(lastInput)) {
            // 	lastInput = instance;
            // }
            removeChild(parentDom, dom);
        }
        if (options.recyclingEnabled && !isStatefulComponent$$1 && (parentDom || canRecycle)) {
            var hooks = ref;
            if (hooks && (hooks.onComponentWillMount ||
                hooks.onComponentWillUnmount ||
                hooks.onComponentDidMount ||
                hooks.onComponentWillUpdate ||
                hooks.onComponentDidUpdate)) {
                return;
            }
            pool(vNode, componentPools);
        }
    }
    function unmountElement(fiber, parentDom, lifecycle, canRecycle, isRecycling) {
        var dom = fiber.dom;
        var vNode = fiber.input;
        var ref = vNode.ref;
        var props = vNode.props;
        if (ref && !isRecycling) {
            unmountRef(ref);
        }
        var childFibers = fiber.children;
        if (childFibers !== null) {
            if (isArray(childFibers)) {
                for (var i = 0, len = childFibers.length; i < len; i++) {
                    unmount(childFibers[i], null, lifecycle, false, isRecycling);
                }
            }
            else {
                unmount(childFibers, null, lifecycle, false, isRecycling);
            }
        }
        // TODO: Optimize this for performance, use Fibers to store mounted events
        if (!isNull(props)) {
            for (var name in props) {
                // do not add a hasOwnProperty check here, it affects performance
                if (props[name] !== null && isAttrAnEvent(name)) {
                    patchEvent(name, props[name], null, dom);
                    // We need to set this null, because same props otherwise come back if SCU returns false and we are recyling
                    props[name] = null;
                }
            }
        }
        if (!isNull(parentDom)) {
            removeChild(parentDom, dom);
        }
        fiber.children = null;
        if (options.recyclingEnabled && (parentDom || canRecycle)) {
            pool(vNode, elementPools);
        }
    }
    function unmountRef(ref) {
        if (isFunction(ref)) {
            ref(null);
        }
        else {
            if (isInvalid(ref)) {
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
    var C$5 = options.component;
    function hydrateComponent(fiber, vNode, dom, lifecycle, context, isSVG, isClass) {
        var type = vNode.type;
        var ref = vNode.ref;
        fiber.dom = dom;
        var props = vNode.props || EMPTY_OBJ;
        if (isClass) {
            var _isSVG = dom.namespaceURI === svgNS;
            var instance = C$5.create(fiber, vNode, type, props, context, isSVG, lifecycle);
            fiber.c = instance;
            instance._vNode = vNode;
            var childFiber = fiber.children;
            if (!isInvalid(childFiber.input)) {
                // TODO: Can input be string?
                childFiber.dom = hydrate(childFiber, childFiber.input, dom, lifecycle, instance._childContext, _isSVG);
            }
            mountClassComponentCallbacks(vNode, ref, instance, lifecycle);
            instance._updating = false; // Mount finished allow going sync
            if (options.findDOMNodeEnabled) {
                componentToDOMNodeMap.set(instance, dom);
            }
        }
        else {
            var renderOutput = type(props, context);
            var input = handleComponentInput(renderOutput);
            if (!isInvalid(input)) {
                var childFiber$1 = new Fiber(input, '0');
                fiber.children = childFiber$1;
                childFiber$1.dom = hydrate(childFiber$1, input, dom, lifecycle, context, isSVG);
            }
            // fiber.c = 'stateless';
            fiber.dom = dom;
            mountFunctionalComponentCallbacks(ref, dom, lifecycle);
        }
        return dom;
    }
    function hydrateElement(fiber, vNode, dom, lifecycle, context, isSVG) {
        var children = vNode.children;
        var props = vNode.props;
        var className = vNode.className;
        var flags = vNode.flags;
        var ref = vNode.ref;
        isSVG = isSVG || (flags & 64 /* SvgElement */) > 0;
        if (dom.nodeType !== 1 || dom.tagName.toLowerCase() !== vNode.type) {
            {
                warning("Inferno hydration: Server-side markup doesn't match client-side markup or Initial render target is not empty");
            }
            var newDom = mountElement(fiber, vNode, null, lifecycle, context, isSVG);
            fiber.dom = newDom;
            replaceChild(dom.parentNode, newDom, dom);
            return newDom;
        }
        fiber.dom = dom;
        if (children) {
            hydrateChildren(fiber, children, dom, lifecycle, context, isSVG);
        }
        else if (dom.firstChild !== null) {
            dom.textContent = ""; // dom has content, but VNode has no children remove everything from DOM
        }
        if (props) {
            var hasControlledValue = false;
            var isFormElement = (flags & 1792 /* FormElement */) > 0;
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
        return dom;
    }
    // TODO: Remove recursion
    function hydrateArrayChildren(dom, parentFiber, children, parentDOM, lifecycle, context, isSVG, prefix, isKeyed$$1, counter) {
        for (var i = 0, len = children.length; i < len; i++) {
            var child = children[i];
            if (!isInvalid(child)) {
                if (isArray(child)) {
                    // TODO: Add warning about nested arrays?
                    dom = hydrateArrayChildren(dom, parentFiber, child, parentDOM, lifecycle, context, isSVG, isKeyed$$1 ? '' : prefix + (i + 1) + '.', isKeyed$$1, counter);
                }
                else {
                    if (parentFiber.children === null) {
                        parentFiber.children = [];
                        isKeyed$$1 = isObject(child) ? !isNullOrUndef(child.key) : false;
                        parentFiber.flags = (isKeyed$$1 ? 4 /* HasKeyedChildren */ : 8 /* HasNonKeydChildren */);
                        if (isKeyed$$1) {
                            parentFiber.childrenKeys = new Map();
                        }
                    }
                    var childFiber = new Fiber(child, isKeyed$$1 ? child.key : prefix + (i + 1));
                    parentFiber.children.push(childFiber);
                    if (isKeyed$$1) {
                        parentFiber.childrenKeys.set(child.key, counter++);
                    }
                    if (isNull(dom)) {
                        mount(childFiber, child, parentDOM, lifecycle, context, isSVG);
                    }
                    else {
                        var nextSibling = dom.nextSibling;
                        hydrate(childFiber, child, dom, lifecycle, context, isSVG);
                        dom = nextSibling;
                    }
                }
            }
        }
        return dom;
    }
    function hydrateChildren(parentFiber, children, parentDom, lifecycle, context, isSVG) {
        normalizeChildNodes(parentDom);
        var dom = parentDom.firstChild;
        if (isStringOrNumber(children)) {
            if (!isNull(dom) && dom.nodeType === 3) {
                if (dom.nodeValue !== children) {
                    dom.nodeValue = children;
                }
            }
            else if (children) {
                parentDom.textContent = children;
            }
            if (!isNull(dom)) {
                dom = dom.nextSibling;
            }
        }
        else if (isArray(children)) {
            dom = hydrateArrayChildren(dom, parentFiber, children, parentDom, lifecycle, context, isSVG, '', (parentFiber.flags & 4 /* HasKeyedChildren */) > 0, 0);
        }
        else {
            // It's VNode
            if (!isNull(dom)) {
                hydrate(parentFiber, children, dom, lifecycle, context, isSVG);
                dom = dom.nextSibling;
            }
            else {
                mount(parentFiber, children, parentDom, lifecycle, context, isSVG);
            }
        }
        // clear any other DOM nodes, there should be only a single entry for the root
        while (dom) {
            var nextSibling = dom.nextSibling;
            parentDom.removeChild(dom);
            dom = nextSibling;
        }
    }
    function hydrateText(fiber, text, dom) {
        if (dom.nodeType !== 3) {
            var newDom = mountText(fiber, text, null);
            fiber.dom = newDom;
            replaceChild(dom.parentNode, newDom, dom);
            return newDom;
        }
        if (dom.nodeValue !== text) {
            dom.nodeValue = text;
        }
        fiber.dom = dom;
        return dom;
    }
    function hydrate(parentFiber, input, dom, lifecycle, context, isSVG) {
        if (isStringOrNumber(input)) {
            return hydrateText(parentFiber, input, dom);
        }
        else {
            // It's VNode
            var flags = input.flags;
            if (flags & 14 /* Component */) {
                return hydrateComponent(parentFiber, input, dom, lifecycle, context, isSVG, (flags & 2 /* ComponentClass */) > 0);
            }
            else if (flags & 1985 /* Element */) {
                return hydrateElement(parentFiber, input, dom, lifecycle, context, isSVG);
            }
            else {
                {
                    throwError(("hydrate() expects a valid VNode, instead it received an object with the type \"" + (typeof input) + "\"."));
                }
                throwError();
            }
        }
    }
    function hydrateRoot(rootFiber, input, parentDom, lifecycle) {
        if (!isNull(parentDom)) {
            var dom = parentDom.firstChild;
            if (!isNull(dom)) {
                hydrate(rootFiber, input, dom, lifecycle, EMPTY_OBJ, false);
                dom = parentDom.firstChild;
                // clear any other DOM nodes, there should be only a single entry for the root
                while ((dom = dom.nextSibling)) {
                    parentDom.removeChild(dom);
                }
                return true;
            }
        }
        return false;
    }

    // import { hydrateRoot } from './hydration';
    // rather than use a Map, like we did before, we can use an array here
    // given there shouldn't be THAT many roots on the page, the difference
    // in performance is huge: https://esbench.com/bench/5802a691330ab09900a1a2da
    var componentToDOMNodeMap = new Map();
    var C$4 = options.component;
    var roots = options.roots;
    /**
     * When inferno.options.findDOMNOdeEnabled is true, this function will return DOM Node by component instance
     * @param ref Component instance
     * @returns {*|null} returns dom node
     */
    function findDOMNode(ref) {
        if (!options.findDOMNodeEnabled) {
            {
                throwError('findDOMNode() has been disabled, use Inferno.options.findDOMNodeEnabled = true; enabled findDOMNode(). Warning this can significantly impact performance!');
            }
            throwError();
        }
        var dom = ref && ref.nodeType ? ref : null;
        return componentToDOMNodeMap.get(ref) || dom;
    }
    // function getRoot(dom): Root | null {
    // 	for (let i = 0, len = roots.length; i < len; i++) {
    // 		const root = roots[ i ];
    //
    // 		if (root.dom === dom) {
    // 			return root;
    // 		}
    // 	}
    // 	return null;
    // }
    //
    // function setRoot(dom: Element | SVGAElement, input: InfernoInput, lifecycle: LifecycleClass): Root {
    // 	const root: Root = {
    // 		dom,
    // 		input,
    // 		lifecycle
    // 	};
    //
    // 	roots.push(root);
    // 	return root;
    // }
    // function removeRoot(root: Root): void {
    // 	for (let i = 0, len = roots.length; i < len; i++) {
    // 		if (roots[ i ] === root) {
    // 			roots.splice(i, 1);
    // 			return;
    // 		}
    // 	}
    // }
    {
        if (isBrowser && document.body === null) {
            warning('Inferno warning: you cannot initialize inferno without "document.body". Wait on "DOMContentLoaded" event, add script to bottom of body, or use async/defer attributes on script tag.');
        }
    }
    var documentBody = isBrowser ? document.body : null;
    /**
     * Renders virtual node tree into parent node.
     * @param {IVNode | null | string | number} input input to be rendered
     * @param {*} parentDom DOM node which content will be replaced by virtual node
     * @param {Function?} callback Callback to be called after rendering has finished
     * @returns {InfernoChildren} rendered virtual node
     */
    function render(input, parentDom, callback) {
        if (documentBody === parentDom) {
            {
                throwError('you cannot render() to the "document.body". Use an empty element as a container instead.');
            }
            throwError();
        }
        if (input === NO_OP) {
            return;
        }
        G.INFRender = true;
        var rootFiber = roots.get(parentDom);
        var lifecycle;
        if (rootFiber === undefined) {
            if (isInvalid(input)) {
                return;
            }
            rootFiber = new Fiber(input, '0'); // Stupid typescript... why casting needed???
            rootFiber.lifeCycle = lifecycle = new Lifecycle();
            if (!hydrateRoot(rootFiber, input, parentDom, lifecycle)) {
                mount(rootFiber, input, parentDom, lifecycle, EMPTY_OBJ, false);
            }
            // rootFiber = setRoot(parentDom as any, input, lifecycle);
            roots.set(parentDom, rootFiber);
            lifecycle.trigger();
        }
        else {
            lifecycle = rootFiber.lifeCycle;
            lifecycle.listeners = [];
            if (isNullOrUndef(input) && !isInvalid(rootFiber.input)) {
                unmount(rootFiber, parentDom, lifecycle, false, false);
                roots.delete(parentDom);
            }
            else {
                patch(rootFiber, input, parentDom, lifecycle, EMPTY_OBJ, false, false);
            }
        }
        lifecycle.trigger();
        if (!isNullOrUndef(callback)) {
            callback();
        }
        if (isFunction(C$4.flush)) {
            C$4.flush();
        }
        G.INFRender = false;
        if (rootFiber) {
            var rootInput = rootFiber.input;
            if (rootInput && (rootInput.flags & 14 /* Component */)) {
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

    function mount(fiber, input, parentDom, lifecycle, context, isSVG) {
        // Text - Number
        if (isStringOrNumber(input)) {
            return mountText(fiber, input, parentDom);
        }
        else {
            // VNode
            var flags = input.flags;
            if (flags & 1985 /* Element */) {
                return mountElement(fiber, input, parentDom, lifecycle, context, isSVG);
            }
            else if (flags & 14 /* Component */) {
                return mountComponent(fiber, input, parentDom, lifecycle, context, isSVG, (flags & 2 /* ComponentClass */) > 0);
            }
            else {
                {
                    if (typeof input === 'object') {
                        throwError(("mount() received an object that's not a valid VNode, you should stringify it first. Object: \"" + (JSON.stringify(input)) + "\"."));
                    }
                    else {
                        throwError(("mount() expects a valid VNode, instead it received an object with the type \"" + (typeof input) + "\"."));
                    }
                }
                throwError();
            }
        }
    }
    function mountText(fiber, text, parentDom) {
        var dom = document.createTextNode(text);
        if (!isNull(parentDom)) {
            fiber.dom = dom;
            appendChild(parentDom, dom);
        }
        return dom;
    }
    function mountElement(fiber, vNode, parentDom, lifecycle, context, isSVG) {
        if (options.recyclingEnabled) {
            var dom$1 = recycleElement(vNode, lifecycle, context, isSVG);
            if (!isNull(dom$1)) {
                if (!isNull(parentDom)) {
                    appendChild(parentDom, dom$1);
                }
                return dom$1;
            }
        }
        var flags = vNode.flags;
        isSVG = isSVG || (flags & 64 /* SvgElement */) > 0;
        var dom = documentCreateElement(vNode.type, isSVG);
        var children = vNode.children;
        var props = vNode.props;
        var className = vNode.className;
        var ref = vNode.ref;
        if (!isInvalid(children)) {
            if (isStringOrNumber(children)) {
                // Text
                setTextContent(dom, children);
            }
            else {
                var childrenIsSVG = isSVG === true && vNode.type !== 'foreignObject';
                if (isArray(children)) {
                    // Array
                    mountArrayChildren(fiber, children, dom, lifecycle, context, childrenIsSVG, '', false, 0);
                }
                else {
                    // VNode
                    var childFiber = new Fiber(children, '0');
                    fiber.children = childFiber;
                    mount(childFiber, children, dom, lifecycle, context, childrenIsSVG);
                }
            }
        }
        if (!isNull(props)) {
            var hasControlledValue = false;
            var isFormElement = (flags & 1792 /* FormElement */) > 0;
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
                dom.setAttribute('class', className);
            }
            else {
                dom.className = className;
            }
        }
        if (!isNull(ref)) {
            mountRef(dom, ref, lifecycle);
        }
        if (!isNull(parentDom)) {
            fiber.dom = dom;
            appendChild(parentDom, dom);
        }
        return dom;
    }
    // TODO: Remove recursion
    function mountArrayChildren(fiber, children, dom, lifecycle, context, isSVG, prefix, isKeyed$$1, counter) {
        for (var i = 0, len = children.length; i < len; i++) {
            var child = children[i];
            if (!isInvalid(child)) {
                if (isArray(child)) {
                    // TODO: Add warning about nested arrays?
                    mountArrayChildren(fiber, child, dom, lifecycle, context, isSVG, isKeyed$$1 ? '' : prefix + (i + 1) + '.', isKeyed$$1, counter);
                }
                else {
                    if (fiber.children === null) {
                        fiber.children = [];
                        isKeyed$$1 = isObject(child) ? !isNullOrUndef(child.key) : false;
                        fiber.flags |= (isKeyed$$1 ? 4 /* HasKeyedChildren */ : 8 /* HasNonKeydChildren */);
                        if (isKeyed$$1) {
                            fiber.childrenKeys = new Map();
                        }
                    }
                    var childFiber = new Fiber(child, isKeyed$$1 ? child.key : prefix + (i + 1));
                    fiber.children.push(childFiber);
                    if (isKeyed$$1) {
                        fiber.childrenKeys.set(child.key, counter++);
                    }
                    mount(childFiber, child, dom, lifecycle, context, isSVG);
                }
            }
        }
    }
    var C$2 = options.component;
    function mountComponent(fiber, vNode, parentDom, lifecycle, context, isSVG, isClass) {
        var dom = null;
        if (options.recyclingEnabled) {
            dom = recycleComponent(vNode, lifecycle, context, isSVG);
            if (!isNull(dom)) {
                if (!isNull(parentDom)) {
                    appendChild(parentDom, dom);
                }
                return dom;
            }
        }
        var type = vNode.type;
        var props = vNode.props || EMPTY_OBJ;
        var ref = vNode.ref;
        // let childFiber;
        if (isClass) {
            // childFiber = fiber.children = new Fiber(child, '0');
            var instance = C$2.create(fiber, vNode, type, props, context, isSVG, lifecycle);
            // const input = instance._lastInput;
            fiber.c = instance;
            var childFiber = fiber.children;
            if (!isInvalid(childFiber.input)) {
                fiber.dom = childFiber.dom = dom = mount(childFiber, childFiber.input, null, lifecycle, instance._childContext, isSVG);
                if (!isNull(parentDom) && !isNull(dom)) {
                    appendChild(parentDom, dom);
                }
            }
            mountClassComponentCallbacks(vNode, ref, instance, lifecycle);
            instance._updating = false;
            if (options.findDOMNodeEnabled) {
                componentToDOMNodeMap.set(instance, dom);
            }
        }
        else {
            var renderOutput = type(props, context);
            var input = handleComponentInput(renderOutput);
            if (!isInvalid(input)) {
                var childFiber$1 = new Fiber(input, '0');
                fiber.children = childFiber$1;
                childFiber$1.dom = dom = mount(childFiber$1, input, null, lifecycle, context, isSVG);
            }
            // fiber.c = 'stateless';
            fiber.dom = dom;
            // fiber.input = input;
            mountFunctionalComponentCallbacks(ref, dom, lifecycle);
            if (!isNull(parentDom) && !isNull(dom)) {
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
                    else if (isObject(ref) && (vNode.flags & 2 /* ComponentClass */)) {
                        throwError('functional component lifecycle events are not supported on ES2015 class components.');
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
            lifecycle.addListener((function () {
                instance._updating = true;
                if (afterMount) {
                    afterMount(vNode);
                }
                if (hasDidMount) {
                    instance.componentDidMount();
                }
                instance._updating = false;
            }));
        }
    }
    function mountFunctionalComponentCallbacks(ref, dom, lifecycle) {
        if (ref) {
            if (!isNullOrUndef(ref.onComponentWillMount)) {
                ref.onComponentWillMount();
            }
            if (!isNullOrUndef(ref.onComponentDidMount)) {
                lifecycle.addListener((function () { return ref.onComponentDidMount(dom); }));
            }
        }
    }
    function mountRef(dom, value, lifecycle) {
        if (isFunction(value)) {
            lifecycle.addListener((function () { return value(dom); }));
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

    // We need EMPTY_OBJ defined in one place.
    // Its used for comparison so we cant inline it into shared
    var EMPTY_OBJ = {};
    {
        Object.freeze(EMPTY_OBJ);
    }
    // export function replaceLastChildAndUnmount(lastInput, nextInput, parentDom, lifecycle: LifecycleClass, context: Object, isSVG: boolean, isRecycling: boolean) {
    // 	replaceDOM(parentDom, mount(nextInput, null, lifecycle, context, isSVG), lastInput, lifecycle, isRecycling);
    // }
    function replaceDOM(fiber, parentDom, newDOM, lifecycle, isRecycling) {
        unmount(fiber, null, lifecycle, false, isRecycling);
        replaceChild(parentDom, newDOM, fiber.dom);
        fiber.dom = newDOM;
    }
    function handleComponentInput(input) {
        var out;
        // if (isInvalid(input)) {
        // 	// out = createVoidVNode();
        // } else if (isStringOrNumber(input)) {
        // 	// out = createTextVNode(input, null);
        // } else
        if (isArray(input)) {
            {
                throwError('a valid Inferno IVNode (or null) must be returned from a component render. You may have returned an array or an invalid object.');
            }
            throwError();
        }
        else {
            // It's input
            out = input;
            // if ((out.flags & VNodeFlags.Component) > 0) {
            // 	// if we have an input that is also a component, we run into a tricky situation
            // 	// where the root input needs to always have the correct DOM entry
            // 	// so we break monomorphism on our input and supply it our input as parentVNode
            // 	// we can optimise this in the future, but this gets us out of a lot of issues
            // 	out.parentVNode = parentVNode;
            // }
        }
        return out;
    }
    function setTextContent(dom, text) {
        if (text !== '') {
            dom.textContent = text;
        }
        else {
            dom.appendChild(document.createTextNode(''));
        }
    }
    function updateTextContent(dom, text) {
        dom.firstChild.nodeValue = text;
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
    function replaceWithNewNode(fiber, nextNode, parentDom, lifecycle, context, isSVG, isRecycling) {
        var oldNode = fiber.dom;
        unmount(fiber, null, lifecycle, false, isRecycling);
        // fiber.children = null;
        var newDom = mount(fiber, nextNode, null, lifecycle, context, isSVG);
        replaceChild(parentDom, newDom, oldNode);
        fiber.dom = newDom;
    }
    function replaceChild(parentDom, nextDom, lastDom) {
        if (!parentDom) {
            parentDom = lastDom.parentNode;
        }
        parentDom.replaceChild(nextDom, lastDom);
    }
    function removeChild(parentDom, dom) {
        parentDom.removeChild(dom);
    }
    function removeAllChildren(dom, children, lifecycle, isRecycling) {
        if (!options.recyclingEnabled || (options.recyclingEnabled && !isRecycling)) {
            removeChildren(null, children, lifecycle, isRecycling);
        }
        dom.textContent = '';
    }
    function removeChildren(dom, children, lifecycle, isRecycling) {
        for (var i = 0, len = children.length; i < len; i++) {
            var child = children[i];
            if (!isInvalid(child)) {
                unmount(child, dom, lifecycle, true, isRecycling);
            }
        }
    }
    // Reference to global object, rendering was moved there because v8 Chrome 59/60/61 crashed continously
    // to "Oh snap" when using object literal...
    var G = (window || global);
    Object.defineProperty(G, 'INFRender', {
        configurable: false,
        enumerable: false,
        value: false,
        writable: true
    });
    function isKeyed(nextChildren) {
        return nextChildren.length > 0 && !isNullOrUndef(nextChildren[0]) && !isNullOrUndef(nextChildren[0].key);
    }

    var isiOS = isBrowser && !!navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform);
    var delegatedEvents$1 = new Map();
    var C$1 = options.component;
    function handleEvent(name, lastEvent, nextEvent, dom) {
        var delegatedRoots = delegatedEvents$1.get(name);
        if (nextEvent) {
            if (!delegatedRoots) {
                delegatedRoots = { items: new Map(), docEvent: null };
                delegatedRoots.docEvent = attachEventToDocument(name, delegatedRoots);
                delegatedEvents$1.set(name, delegatedRoots);
            }
            if (!lastEvent) {
                if (isiOS && name === 'onClick') {
                    trapClickOnNonInteractiveElement(dom);
                }
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
    function dispatchEvent(event, target, items, count, isClick, eventData) {
        var eventsToTrigger = items.get(target);
        if (eventsToTrigger) {
            count--;
            // linkEvent object
            eventData.dom = target;
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
        if (count > 0) {
            var parentDom = target.parentNode;
            // Html Nodes can be nested fe: span inside button in that scenario browser does not handle disabled attribute on parent,
            // because the event listener is on document.body
            // Don't process clicks on disabled elements
            if (parentDom === null || (isClick && parentDom.nodeType === 1 && parentDom.disabled)) {
                return;
            }
            dispatchEvent(event, parentDom, items, count, isClick, eventData);
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
            G.INFRender = true;
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
                catch (e) { }
                dispatchEvent(event, event.target, delegatedRoots.items, count, event.type === 'click', eventData);
            }
            if (isFunction(C$1.flush)) {
                C$1.flush();
            }
            G.INFRender = false;
        };
        document.addEventListener(normalizeEventName(name), docEvent);
        return docEvent;
    }
    // tslint:disable-next-line:no-empty
    function emptyFn() { }
    function trapClickOnNonInteractiveElement(dom) {
        // Mobile Safari does not fire properly bubble click events on
        // non-interactive elements, which means delegated click listeners do not
        // fire. The workaround for this bug involves attaching an empty click
        // listener on the target node.
        // http://www.quirksmode.org/blog/archives/2010/09/click_event_del.html
        // Just set it using the onclick property so that we don't have to manage any
        // bookkeeping for it. Not sure if we need to clear it when the listener is
        // removed.
        // TODO: Only do this for the relevant Safaris maybe?
        dom.onclick = emptyFn;
    }

    function patch(fiber, nextInput, parentDom, lifecycle, context, isSVG, isRecycling) {
        // LastInput cannot be null or undef or invalid, because they have been filtered out
        var lastInput = fiber.input;
        // Next should never come here being invalid, filter outside
        if (lastInput !== nextInput) {
            if (isStringOrNumber(nextInput)) {
                if (isStringOrNumber(lastInput)) {
                    patchText(fiber, nextInput);
                }
                else {
                    replaceDOM(fiber, parentDom, mountText(fiber, nextInput, null), lifecycle, isRecycling);
                }
            }
            else if (isStringOrNumber(lastInput)) {
                replaceDOM(fiber, parentDom, mount(fiber, nextInput, null, lifecycle, context, isSVG), lifecycle, isRecycling);
            }
            else {
                var lastFlags = lastInput.flags;
                var nextFlags = nextInput.flags;
                if (nextFlags & 1985 /* Element */) {
                    if (lastFlags & 1985 /* Element */) {
                        patchElement(fiber, lastInput, nextInput, parentDom, lifecycle, context, isSVG, isRecycling);
                    }
                    else {
                        fiber.children = null;
                        replaceDOM(fiber, parentDom, mountElement(fiber, nextInput, null, lifecycle, context, isSVG), lifecycle, isRecycling);
                    }
                }
                else if (nextFlags & 14 /* Component */) {
                    var isClass = (nextFlags & 2 /* ComponentClass */) > 0;
                    if (lastFlags & 14 /* Component */) {
                        patchComponent(fiber, lastInput, nextInput, parentDom, lifecycle, context, isSVG, isClass, isRecycling);
                    }
                    else {
                        replaceDOM(fiber, parentDom, mountComponent(fiber, nextInput, null, lifecycle, context, isSVG, isClass), lifecycle, isRecycling);
                    }
                }
            }
        }
        fiber.input = nextInput;
    }
    function unmountChildren(fiber, children, dom, lifecycle, isRecycling) {
        // TODO: Check this, we could add Fiber flags to optimize this
        if (children === null) {
            dom.textContent = "";
        }
        else if (children.input && children.input.flags > 0) {
            unmount(children, dom, lifecycle, true, isRecycling);
        }
        else if (isArray(children)) {
            removeAllChildren(dom, children, lifecycle, isRecycling);
        }
        fiber.children = null;
    }
    function patchElement(fiber, lastVNode, nextVNode, parentDom, lifecycle, context, isSVG, isRecycling) {
        var nextTag = nextVNode.type;
        var lastTag = lastVNode.type;
        if (lastTag !== nextTag) {
            replaceWithNewNode(fiber, nextVNode, parentDom, lifecycle, context, isSVG, isRecycling);
        }
        else {
            var dom = fiber.dom;
            var lastProps = lastVNode.props;
            var nextProps = nextVNode.props;
            var lastChildren = lastVNode.children;
            var nextChildren = nextVNode.children;
            var nextFlags = nextVNode.flags;
            var nextRef = nextVNode.ref;
            var lastClassName = lastVNode.className;
            var nextClassName = nextVNode.className;
            isSVG = isSVG || (nextFlags & 64 /* SvgElement */) > 0;
            if (lastChildren !== nextChildren) {
                var childrenIsSVG = isSVG === true && nextVNode.type !== "foreignObject";
                patchChildren(fiber, nextFlags, fiber.children, nextChildren, dom, lifecycle, context, childrenIsSVG, isRecycling);
            }
            // inlined patchProps  -- starts --
            if (lastProps !== nextProps) {
                var lastPropsOrEmpty = lastProps || EMPTY_OBJ;
                var nextPropsOrEmpty = nextProps || EMPTY_OBJ;
                var hasControlledValue = false;
                if (nextPropsOrEmpty !== EMPTY_OBJ) {
                    var isFormElement = (nextFlags & 1792 /* FormElement */) > 0;
                    if (isFormElement) {
                        hasControlledValue = isControlledFormElement(nextPropsOrEmpty);
                    }
                    for (var prop in nextPropsOrEmpty) {
                        // do not add a hasOwnProperty check here, it affects performance
                        var nextValue = nextPropsOrEmpty[prop];
                        var lastValue = lastPropsOrEmpty[prop];
                        patchProp(prop, lastValue, nextValue, dom, isSVG, hasControlledValue);
                    }
                    if (isFormElement) {
                        // When inferno is recycling form element, we need to process it like it would be mounting
                        processElement(nextFlags, nextVNode, dom, nextPropsOrEmpty, isRecycling, hasControlledValue);
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
            if (nextRef) {
                if (lastVNode.ref !== nextRef || isRecycling) {
                    mountRef(dom, nextRef, lifecycle);
                }
            }
        }
    }
    function patchChildren(fiber, nextFlags, lastChildFibers, nextChildren, dom, lifecycle, context, isSVG, isRecycling) {
        var patchArray = false;
        var patchKeyed = false;
        if (nextFlags & 32 /* HasNonKeyedChildren */) {
            patchArray = true;
        }
        else if (fiber.flags & 4 /* HasKeyedChildren */ &&
            (nextFlags & 16 /* HasKeyedChildren */) > 0) {
            patchKeyed = true;
            patchArray = true;
        }
        else if (isInvalid(nextChildren)) {
            unmountChildren(fiber, lastChildFibers, dom, lifecycle, isRecycling);
        }
        else if (lastChildFibers === null) {
            // If there was nothing previously, then just mount
            if (isStringOrNumber(nextChildren)) {
                setTextContent(dom, nextChildren);
            }
            else {
                fiber.dom.textContent = "";
                if (isArray(nextChildren)) {
                    mountArrayChildren(fiber, nextChildren, dom, lifecycle, context, isSVG, "", false, 0);
                }
                else {
                    fiber.children = new Fiber(nextChildren, "0");
                    mount(fiber.children, nextChildren, dom, lifecycle, context, isSVG);
                }
            }
        }
        else if (isStringOrNumber(nextChildren)) {
            if (isStringOrNumber(lastChildFibers)) {
                updateTextContent(dom, nextChildren);
            }
            else {
                unmountChildren(fiber, lastChildFibers, dom, lifecycle, isRecycling);
                setTextContent(dom, nextChildren);
            }
        }
        else if (isArray(nextChildren)) {
            if (isArray(lastChildFibers)) {
                patchArray = true;
                if (fiber.flags & 4 /* HasKeyedChildren */ && isKeyed(nextChildren)) {
                    patchKeyed = true;
                }
            }
            else {
                unmountChildren(fiber, lastChildFibers, dom, lifecycle, isRecycling);
                mountArrayChildren(fiber, nextChildren, dom, lifecycle, context, isSVG, "", false, 0);
            }
        }
        else if (isArray(lastChildFibers)) {
            removeAllChildren(dom, lastChildFibers, lifecycle, isRecycling);
            fiber.children = new Fiber(nextChildren, "0");
            mount(fiber.children, nextChildren, dom, lifecycle, context, isSVG);
        }
        else {
            // next is input, last is input
            patch(lastChildFibers, nextChildren, dom, lifecycle, context, isSVG, isRecycling);
        }
        if (patchArray) {
            // Common optimizations for arrays
            var lastLength = fiber.children !== null
                ? fiber.children.length
                : 0;
            var nextLength = nextChildren.length;
            if (lastLength === 0) {
                if (nextLength > 0) {
                    mountArrayChildren(fiber, nextChildren, dom, lifecycle, context, isSVG, "", false, 0);
                }
                return;
            }
            else if (nextLength === 0) {
                removeAllChildren(dom, lastChildFibers, lifecycle, isRecycling);
                fiber.children = null; // TODO: Optimize with Fiber flags
                return;
            }
            if (patchKeyed) {
                patchKeyedChildren(fiber, lastChildFibers, nextChildren, dom, lifecycle, context, isSVG, isRecycling, lastLength, nextLength);
            }
            else {
                patchNonKeyedChildren(lastChildFibers, nextChildren, dom, lifecycle, context, isSVG, isRecycling, lastLength);
            }
        }
    }
    var C = options.component;
    function patchComponent(fiber, lastVNode, nextVNode, parentDom, lifecycle, context, isSVG, isClass, isRecycling) {
        var lastType = lastVNode.type;
        var nextType = nextVNode.type;
        var lastKey = lastVNode.key;
        var nextKey = nextVNode.key;
        if (lastType !== nextType || lastKey !== nextKey) {
            replaceWithNewNode(fiber, nextVNode, parentDom, lifecycle, context, isSVG, isRecycling);
            return false;
        }
        else {
            var nextProps = nextVNode.props || EMPTY_OBJ;
            if (isClass) {
                if (C.patch(fiber, nextVNode, parentDom, lifecycle, context, isSVG, isRecycling)) {
                    if (isNull(parentDom)) {
                        return true;
                    }
                    var lastDOM = fiber.dom;
                    replaceChild(parentDom, mountComponent(fiber, nextVNode, null, lifecycle, context, isSVG, (nextVNode.flags & 2 /* ComponentClass */) > 0), lastDOM);
                }
            }
            else {
                var shouldUpdate = true;
                var lastProps = lastVNode.props;
                var nextHooks = nextVNode.ref;
                var nextHooksDefined = !isNullOrUndef(nextHooks);
                // const lastInput = lastVNode.children;
                // let nextInput = lastInput;
                // nextVNode.children = lastInput;
                if (lastKey !== nextKey) {
                    shouldUpdate = true;
                }
                else {
                    if (nextHooksDefined &&
                        !isNullOrUndef(nextHooks.onComponentShouldUpdate)) {
                        shouldUpdate = nextHooks.onComponentShouldUpdate(lastProps, nextProps);
                    }
                }
                if (shouldUpdate !== false) {
                    if (nextHooksDefined &&
                        !isNullOrUndef(nextHooks.onComponentWillUpdate)) {
                        nextHooks.onComponentWillUpdate(lastProps, nextProps);
                    }
                    var nextInput = nextType(nextProps, context);
                    // if (isInvalid(componentRootFiber.input)) {
                    //
                    // }
                    // let nextInput;
                    if (isArray(nextInput)) {
                        {
                            throwError("a valid Inferno IVNode (or null) must be returned from a component render. You may have returned an array or an invalid object.");
                        }
                        throwError();
                    }
                    if (!isInvalid(nextInput)) {
                        if (nextInput !== NO_OP) {
                            if (isInvalid(fiber.children.input)) {
                                mount(fiber.children, nextInput, parentDom, lifecycle, context, isSVG);
                            }
                            else {
                                patch(fiber.children, nextInput, parentDom, lifecycle, context, isSVG, isRecycling);
                            }
                            // fiber.children.input = nextInput;
                            if (nextHooksDefined &&
                                !isNullOrUndef(nextHooks.onComponentDidUpdate)) {
                                nextHooks.onComponentDidUpdate(lastProps, nextProps);
                            }
                        }
                    }
                }
                // if (nextInput.flags & VNodeFlags.Component) {
                // 	nextInput.parentVNode = nextVNode;
                // } else if (lastInput.flags & VNodeFlags.Component) {
                // 	lastInput.parentVNode = nextVNode;
                // }
            }
        }
        return false;
    }
    function patchText(fiber, text) {
        fiber.dom.nodeValue = text;
    }
    // TODO: Optimize this.
    function patchNonKeyedChildren(childFibers, nextChildren, dom, lifecycle, context, isSVG, isRecycling, lastFibersLength) {
        var fiberX = 0;
        var fiberY = 0;
        var prefix = "";
        var child = null;
        var fiberCnt = 0;
        var fiber;
        var previousX;
        var iteratedChildren = nextChildren;
        var previousChildren;
        var previousPrefix;
        var nextFiber;
        var tmp;
        var len = iteratedChildren.length;
        do {
            while (len > fiberX) {
                child = iteratedChildren[fiberX++];
                if (!isInvalid(child)) {
                    if (isStringOrNumber(child) || isVNode(child)) {
                        var fiberKey = prefix + fiberX;
                        do {
                            if (lastFibersLength <= fiberCnt) {
                                // Always mount and add to end
                                fiber = new Fiber(child, fiberKey);
                                mount(fiber, child, dom, lifecycle, context, isSVG);
                                childFibers.push(fiber);
                            }
                            else {
                                fiber = childFibers[fiberCnt++];
                                if (fiberKey === fiber.i) {
                                    patch(fiber, child, dom, lifecycle, context, isSVG, isRecycling);
                                }
                                else if (fiberKey > fiber.i) {
                                    // this fiber is dead, remove it, and reduce counters
                                    unmount(fiber, dom, lifecycle, true, isRecycling);
                                    childFibers.splice(fiberCnt - 1, 1);
                                    lastFibersLength--;
                                    fiberCnt--;
                                }
                                else {
                                    fiber = new Fiber(child, fiberKey);
                                    mount(fiber, child, dom, lifecycle, context, isSVG);
                                    tmp = fiberCnt - 1;
                                    nextFiber = tmp < lastFibersLength ? childFibers[tmp] : null;
                                    insertOrAppend(dom, fiber.dom, nextFiber.dom);
                                    childFibers.splice(tmp, 0, fiber);
                                    lastFibersLength++;
                                    // fiberCnt++;
                                }
                            }
                        } while (fiberKey > fiber.i);
                    }
                    else {
                        // Nested arrays => no recursion, no new arrays
                        previousPrefix = prefix;
                        prefix += fiberX + ".";
                        previousChildren = iteratedChildren;
                        iteratedChildren = child;
                        fiberY++;
                        previousX = fiberX;
                        fiberX = 0;
                        len = iteratedChildren.length;
                    }
                }
            }
            if (fiberY > 0 && len === fiberX) {
                iteratedChildren = previousChildren;
                fiberY--;
                fiberX = previousX;
                prefix = previousPrefix;
                len = iteratedChildren.length;
            }
        } while (fiberY !== 0 || len > fiberX);
        if (fiberCnt < lastFibersLength) {
            var firstIndex = fiberCnt;
            for (; fiberCnt < lastFibersLength; fiberCnt++) {
                unmount(childFibers[fiberCnt], dom, lifecycle, false, isRecycling);
            }
            childFibers.splice(firstIndex, lastFibersLength - firstIndex); // Remove dead Fibers
        }
    }
    function patchKeyedChildren(parentFiber, childFibers, nextChildren, dom, lifecycle, context, isSVG, isRecycling, lastFibersLength, nextChildrenLength) {
        var prevChildrenMap = parentFiber.childrenKeys;
        var referenceFiber = childFibers[0];
        var referenceKey = referenceFiber.i;
        var referenceNode = referenceFiber.dom;
        var patchCount = 0;
        var newChildren = [];
        var newChildrenKeysMap = new Map();
        var iteratedFiber;
        var lastFiber;
        var requiresMoving = true;
        var processedFibers = 0;
        for (var newIndex = 0; newIndex < nextChildrenLength; newIndex++) {
            var nextChild = nextChildren[newIndex];
            var nextKey = nextChild.key;
            var oldIndex = prevChildrenMap.get(nextKey);
            if (oldIndex === void 0 || referenceKey === null) {
                iteratedFiber = new Fiber(nextChild, nextKey);
                var newDom = mount(iteratedFiber, nextChild, null, lifecycle, context, isSVG);
                iteratedFiber.dom = newDom;
                insertOrAppend(dom, newDom, referenceNode);
            }
            else {
                iteratedFiber = childFibers[oldIndex];
                patch(iteratedFiber, nextChild, dom, lifecycle, context, isSVG, isRecycling);
                if (referenceKey === nextKey) {
                    requiresMoving = false;
                    processedFibers++;
                    var found = false;
                    // Continue iteration from previous position
                    if (processedFibers < lastFibersLength) {
                        for (; processedFibers < lastFibersLength; processedFibers++) {
                            lastFiber = childFibers[processedFibers];
                            if (!newChildrenKeysMap.has(lastFiber.i)) {
                                referenceKey = lastFiber.i;
                                referenceNode = lastFiber.dom;
                                found = true;
                                break;
                            }
                        }
                    }
                    if (!found) {
                        referenceKey = null;
                        referenceNode = null;
                    }
                }
                else {
                    requiresMoving = true;
                }
                if (requiresMoving) {
                    dom.insertBefore(iteratedFiber.dom, referenceNode);
                }
                patchCount++;
            }
            newChildrenKeysMap.set(nextKey, newIndex);
            newChildren.push(iteratedFiber);
        }
        for (var i = 0; patchCount < lastFibersLength; i++) {
            var prevFiber = childFibers[i];
            if (!newChildrenKeysMap.has(prevFiber.i)) {
                patchCount++;
                unmount(prevFiber, dom, lifecycle, false, isRecycling);
            }
        }
        parentFiber.flags = 4 /* HasKeyedChildren */;
        parentFiber.childrenKeys = newChildrenKeysMap;
        parentFiber.children = newChildren;
    }
    // TODO: Should compare fibers by key
    // export function patchKeyedChildren(a: IFiber[], b: IVNode[], parentDOM, lifecycle: LifecycleClass, context, isSVG: boolean, isRecycling: boolean, aLength: number, bLength: number) {
    // 	let aEnd = aLength - 1;
    // 	let bEnd = bLength - 1;
    // 	let aStart = 0;
    // 	let bStart = 0;
    // 	let i;
    // 	let j;
    // 	let aNode;
    // 	let bNode;
    // 	let nextNode;
    // 	let nextPos;
    // 	let node;
    // 	let aStartNode = a[aStart];
    // 	let bStartNode = b[bStart];
    // 	let aEndNode = a[aEnd];
    // 	let bEndNode = b[bEnd];
    //
    // 	// Step 1
    // 	/* eslint no-constant-condition: 0 */
    // 	outer: while (true) {
    // 		// Sync nodes with the same key at the beginning.
    // 		while (aStartNode.i === bStartNode.key) {
    // 			patch(aStartNode, bStartNode, parentDOM, lifecycle, context, isSVG, isRecycling);
    // 			aStart++;
    // 			bStart++;
    // 			if (aStart > aEnd || bStart > bEnd) {
    // 				break outer;
    // 			}
    // 			aStartNode = a[aStart];
    // 			bStartNode = b[bStart];
    // 		}
    //
    // 		// Sync nodes with the same key at the end.
    // 		while (aEndNode.i === bEndNode.key) {
    // 			patch(aEndNode, bEndNode, parentDOM, lifecycle, context, isSVG, isRecycling);
    // 			aEnd--;
    // 			bEnd--;
    // 			if (aStart > aEnd || bStart > bEnd) {
    // 				break outer;
    // 			}
    // 			aEndNode = a[aEnd];
    // 			bEndNode = b[bEnd];
    // 		}
    //
    // 		// Move and sync nodes from right to left.
    // 		if (aEndNode.i === bStartNode.key) {
    // 			patch(aEndNode, bStartNode, parentDOM, lifecycle, context, isSVG, isRecycling);
    // 			insertOrAppend(parentDOM, aEndNode.dom, aStartNode.dom);
    // 			aEnd--;
    // 			bStart++;
    // 			aEndNode = a[aEnd];
    // 			bStartNode = b[bStart];
    // 			continue;
    // 		}
    //
    // 		// Move and sync nodes from left to right.
    // 		if (aStartNode.i === bEndNode.key) {
    // 			patch(aStartNode, bEndNode, parentDOM, lifecycle, context, isSVG, isRecycling);
    // 			nextPos = bEnd + 1;
    // 			nextNode = nextPos < bLength ? b[nextPos].dom : null;
    // 			insertOrAppend(parentDOM, aStartNode.dom, nextNode);
    // 			aStart++;
    // 			bEnd--;
    // 			aStartNode = a[aStart];
    // 			bEndNode = b[bEnd];
    // 			continue;
    // 		}
    // 		break;
    // 	}
    //
    // 	if (aStart > aEnd) {
    // 		if (bStart <= bEnd) {
    // 			nextPos = bEnd + 1;
    // 			nextNode = nextPos < bLength ? b[nextPos].dom : null;
    // 			while (bStart <= bEnd) {
    // 				node = b[bStart];
    // 				bStart++;
    // 				insertOrAppend(parentDOM, mount(node, null, lifecycle, context, isSVG), nextNode);
    // 			}
    // 		}
    // 	} else if (bStart > bEnd) {
    // 		while (aStart <= aEnd) {
    // 			unmount(a[aStart++], parentDOM, lifecycle, false, isRecycling);
    // 		}
    // 	} else {
    // 		aLength = aEnd - aStart + 1;
    // 		bLength = bEnd - bStart + 1;
    // 		const sources = new Array(bLength);
    //
    // 		// Mark all nodes as inserted.
    // 		for (i = 0; i < bLength; i++) {
    // 			sources[i] = -1;
    // 		}
    // 		let moved = false;
    // 		let pos = 0;
    // 		let patched = 0;
    //
    // 		// When sizes are small, just loop them through
    // 		if ((bLength <= 4) || (aLength * bLength <= 16)) {
    // 			for (i = aStart; i <= aEnd; i++) {
    // 				aNode = a[i];
    // 				if (patched < bLength) {
    // 					for (j = bStart; j <= bEnd; j++) {
    // 						bNode = b[j];
    // 						if (aNode.key === bNode.key) {
    // 							sources[j - bStart] = i;
    //
    // 							if (pos > j) {
    // 								moved = true;
    // 							} else {
    // 								pos = j;
    // 							}
    // 							patch(aNode, bNode, parentDOM, lifecycle, context, isSVG, isRecycling);
    // 							patched++;
    // 							a[i] = null as any;
    // 							break;
    // 						}
    // 					}
    // 				}
    // 			}
    // 		} else {
    // 			const keyIndex = new Map();
    //
    // 			// Map keys by their index in array
    // 			for (i = bStart; i <= bEnd; i++) {
    // 				keyIndex.set(b[i].key, i);
    // 			}
    //
    // 			// Try to patch same keys
    // 			for (i = aStart; i <= aEnd; i++) {
    // 				aNode = a[i];
    //
    // 				if (patched < bLength) {
    // 					j = keyIndex.get(aNode.key);
    //
    // 					if (j !== void 0) {
    // 						bNode = b[j];
    // 						sources[j - bStart] = i;
    // 						if (pos > j) {
    // 							moved = true;
    // 						} else {
    // 							pos = j;
    // 						}
    // 						patch(aNode, bNode, parentDOM, lifecycle, context, isSVG, isRecycling);
    // 						patched++;
    // 						a[i] = null as any;
    // 					}
    // 				}
    // 			}
    // 		}
    // 		// fast-path: if nothing patched remove all old and add all new
    // 		if (aLength === a.length && patched === 0) {
    // 			removeAllChildren(parentDOM, a, lifecycle, isRecycling);
    // 			while (bStart < bLength) {
    // 				node = b[bStart];
    // 				bStart++;
    // 				insertOrAppend(parentDOM, mount(node, null, lifecycle, context, isSVG), null);
    // 			}
    // 		} else {
    // 			i = aLength - patched;
    // 			while (i > 0) {
    // 				aNode = a[aStart++];
    // 				if (!isNull(aNode)) {
    // 					unmount(aNode, parentDOM, lifecycle, true, isRecycling);
    // 					i--;
    // 				}
    // 			}
    // 			if (moved) {
    // 				const seq = lis_algorithm(sources);
    // 				j = seq.length - 1;
    // 				for (i = bLength - 1; i >= 0; i--) {
    // 					if (sources[i] === -1) {
    // 						pos = i + bStart;
    // 						node = b[pos];
    // 						nextPos = pos + 1;
    // 						nextNode = nextPos < bLength ? b[nextPos].dom : null;
    // 						insertOrAppend(parentDOM, mount(node, parentDOM, lifecycle, context, isSVG), nextNode);
    // 					} else {
    // 						if (j < 0 || i !== seq[j]) {
    // 							pos = i + bStart;
    // 							node = b[pos];
    // 							nextPos = pos + 1;
    // 							nextNode = nextPos < bLength ? b[nextPos].dom : null;
    // 							insertOrAppend(parentDOM, node.dom, nextNode);
    // 						} else {
    // 							j--;
    // 						}
    // 					}
    // 				}
    // 			} else if (patched !== bLength) {
    // 				// when patched count doesn't match b length we need to insert those new ones
    // 				// loop backwards so we can use insertBefore
    // 				for (i = bLength - 1; i >= 0; i--) {
    // 					if (sources[i] === -1) {
    // 						pos = i + bStart;
    // 						node = b[pos];
    // 						nextPos = pos + 1;
    // 						nextNode = nextPos < bLength ? b[nextPos].dom : null;
    // 						insertOrAppend(parentDOM, mount(node, null, lifecycle, context, isSVG), nextNode);
    // 					}
    // 				}
    // 			}
    // 		}
    // 	}
    // }
    //
    // // // // https://en.wikipedia.org/wiki/Longest_increasing_subsequence
    // function lis_algorithm(arr: number[]): number[] {
    // 	const p = arr.slice(0);
    // 	const result: number[] = [0];
    // 	let i;
    // 	let j;
    // 	let u;
    // 	let v;
    // 	let c;
    // 	const len = arr.length;
    //
    // 	for (i = 0; i < len; i++) {
    // 		const arrI = arr[i];
    //
    // 		if (arrI === -1) {
    // 			continue;
    // 		}
    //
    // 		j = result[result.length - 1];
    // 		if (arr[j] < arrI) {
    // 			p[i] = j;
    // 			result.push(i);
    // 			continue;
    // 		}
    //
    // 		u = 0;
    // 		v = result.length - 1;
    //
    // 		while (u < v) {
    // 			c = ((u + v) / 2) | 0;
    // 			if (arr[result[c]] < arrI) {
    // 				u = c + 1;
    // 			} else {
    // 				v = c;
    // 			}
    // 		}
    //
    // 		if (arrI < arr[result[u]]) {
    // 			if (u > 0) {
    // 				p[i] = result[u - 1];
    // 			}
    // 			result[u] = i;
    // 		}
    // 	}
    //
    // 	u = result.length;
    // 	v = result[u - 1];
    //
    // 	while (u-- > 0) {
    // 		result[u] = v;
    // 		v = p[v];
    // 	}
    //
    // 	return result;
    // }
    function isAttrAnEvent(attr) {
        return attr[0] === "o" && attr[1] === "n";
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
                    if (!isNullOrUndef(nextHtml)) {
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
    function patchEvent(name, lastValue, nextValue, dom) {
        if (lastValue !== nextValue) {
            if (delegatedEvents.has(name)) {
                handleEvent(name, lastValue, nextValue, dom);
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
                            G.INFRender = true;
                            linkEvent(nextValue.data, e);
                            if (isFunction(C.flush)) {
                                C.flush();
                            }
                            G.INFRender = false;
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
                    dom[nameLowerCase] = function (event) {
                        G.INFRender = true;
                        nextValue(event);
                        if (isFunction(C.flush)) {
                            C.flush();
                        }
                        G.INFRender = false;
                    };
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
                    domStyle[style] = !isNumber(value) || isUnitlessNumber.has(style)
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
                domStyle[style] = !isNumber(value) || isUnitlessNumber.has(style)
                    ? value
                    : value + "px";
            }
        }
    }
    function removeProp(prop, lastValue, dom, nextFlags) {
        if (prop === "value") {
            // When removing value of select element, it needs to be set to null instead empty string, because empty string is valid value for option which makes that option selected
            // MS IE/Edge don't follow html spec for textArea and input elements and we need to set empty string to value in those cases to avoid "null" and "undefined" texts
            dom.value = nextFlags & 1024 /* SelectElement */ ? null : "";
        }
        else if (prop === "style") {
            dom.removeAttribute("style");
        }
        else if (isAttrAnEvent(prop)) {
            handleEvent(prop, lastValue, null, dom);
        }
        else {
            dom.removeAttribute(prop);
        }
    }

    /* tslint:disable:object-literal-sort-keys */
    {
        /* tslint:disable-next-line:no-empty */
        var testFunc = function testFn() { };
        if ((testFunc.name || testFunc.toString()).indexOf('testFn') === -1) {
            warning(('It looks like you\'re using a minified copy of the development build ' +
                'of Inferno. When deploying Inferno apps to production, make sure to use ' +
                'the production build which skips development warnings and is faster. ' +
                'See http://infernojs.org for more details.'));
        }
    }
    var version = '4.0.0';
    options.component.handleInput = handleComponentInput;

    exports.EMPTY_OBJ = EMPTY_OBJ;
    exports.Fiber = Fiber;
    exports.NO_OP = NO_OP;
    exports.createRenderer = createRenderer;
    exports.createVNode = createVNode;
    exports.findDOMNode = findDOMNode;
    exports.getFlagsForElementVnode = getFlagsForElementVnode;
    exports.internal_DOMNodeMap = componentToDOMNodeMap;
    exports.internal_isUnitlessNumber = isUnitlessNumber;
    exports.internal_normalize = normalize;
    exports.internal_patch = patch;
    exports.linkEvent = linkEvent;
    exports.mount = mount;
    exports.options = options;
    exports.render = render;
    exports.version = version;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
