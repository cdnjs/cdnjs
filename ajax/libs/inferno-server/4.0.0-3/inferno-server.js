(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('inferno'), require('stream')) :
    typeof define === 'function' && define.amd ? define(['exports', 'inferno', 'stream'], factory) :
    (factory((global.Inferno = global.Inferno || {}, global.Inferno.Server = global.Inferno.Server || {}),global.Inferno,global.stream));
}(this, (function (exports,inferno,stream) { 'use strict';

    /**
     * @module Inferno-Shared
     */ /** TypeDoc Comment */
    var ERROR_MSG = "a runtime error occured! Use Inferno in development environment to find the error.";
    // This should be boolean and not reference to window.document
    var isBrowser = !!(typeof window !== "undefined" && window.document);
    // this is MUCH faster than .constructor === Array and instanceof Array
    // in Node 7 and the later versions of V8, slower in older versions though
    var isArray = Array.isArray;
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
    function throwError(message) {
        if (!message) {
            message = ERROR_MSG;
        }
        throw new Error(("Inferno Error: " + message));
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
     * @module Inferno-Server
     */ /** TypeDoc Comment */
    var rxUnescaped = /["'&<>]/;
    function escapeText(text) {
        /* Much faster when there is no unescaped characters */
        if (!rxUnescaped.test(text)) {
            return text;
        }
        var result = "";
        var escape = "";
        var start = 0;
        var i;
        for (i = 0; i < text.length; i++) {
            switch (text.charCodeAt(i)) {
                case 34:// "
                    escape = "&quot;";
                    break;
                case 39:// '
                    escape = "&#039;";
                    break;
                case 38:// &
                    escape = "&amp;";
                    break;
                case 60:// <
                    escape = "&lt;";
                    break;
                case 62:// >
                    escape = "&gt;";
                    break;
                default:
                    continue;
            }
            if (i > start) {
                result += text.slice(start, i);
            }
            result += escape;
            start = i + 1;
        }
        return result + text.slice(start, i);
    }
    var uppercasePattern = /[A-Z]/g;
    var CssPropCache = {};
    function getCssPropertyName(str) {
        if (CssPropCache.hasOwnProperty(str)) {
            return CssPropCache[str];
        }
        return (CssPropCache[str] =
            str.replace(uppercasePattern, "-$&").toLowerCase() + ":");
    }
    var voidElements = new Set([
        "area",
        "base",
        "br",
        "col",
        "command",
        "embed",
        "hr",
        "img",
        "input",
        "keygen",
        "link",
        "meta",
        "param",
        "source",
        "track",
        "wbr"
    ]);

    /**
     * @module Inferno-Server
     */ /** TypeDoc Comment */
    function renderStylesToString(styles) {
        if (isString(styles)) {
            return styles;
        }
        else {
            var renderedString = "";
            for (var styleName in styles) {
                var value = styles[styleName];
                if (isString(value)) {
                    renderedString += "" + (getCssPropertyName(styleName)) + value + ";";
                }
                else if (isNumber(value)) {
                    renderedString += "" + (getCssPropertyName(styleName)) + value + (inferno.internal_isUnitlessNumber.has(styleName) ? "" : "px") + ";";
                }
            }
            return renderedString;
        }
    }
    function renderAttributes(props) {
        var outputAttrs = [];
        var propsKeys = (props && Object.keys(props)) || [];
        for (var i = 0, len = propsKeys.length; i < len; i++) {
            var prop = propsKeys[i];
            if (prop !== "children" &&
                prop !== "dangerouslySetInnerHTML" &&
                prop !== "style") {
                var value = props[prop];
                if (isString(value)) {
                    outputAttrs.push(prop + '="' + escapeText(value) + '"');
                }
                else if (isNumber(value)) {
                    outputAttrs.push(prop + '="' + value + '"');
                }
                else if (isTrue(value)) {
                    outputAttrs.push(prop);
                }
            }
        }
        return outputAttrs;
    }

    /**
     * @module Inferno-Server
     */
    /** TypeDoc Comment */
    function renderVNodeToString(vNode, parent, context, firstChild) {
        var flags = vNode.flags;
        var type = vNode.type;
        var props = vNode.props || inferno.EMPTY_OBJ;
        var children = vNode.children;
        if ((flags & 28 /* Component */) > 0) {
            var isClass = flags & 4;
            if (isClass) {
                var instance = new type(props, context);
                instance.$BS = false;
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
                if (instance.props === inferno.EMPTY_OBJ) {
                    instance.props = props;
                }
                instance.context = context;
                instance.$UN = false;
                if (isFunction(instance.componentWillMount)) {
                    instance.$BR = true;
                    instance.componentWillMount();
                    instance.$BR = false;
                }
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
                var nextVNode = instance.render(props, instance.state, instance.context);
                // In case render returns invalid stuff
                if (isInvalid(nextVNode)) {
                    return "<!--!-->";
                }
                return renderVNodeToString(nextVNode, vNode, childContext, true);
            }
            else {
                var nextVNode$1 = type(props, context);
                if (isInvalid(nextVNode$1)) {
                    return "<!--!-->";
                }
                return renderVNodeToString(nextVNode$1, vNode, context, true);
            }
        }
        else if ((flags & 3970 /* Element */) > 0) {
            var renderedString = "<" + type;
            var html;
            var isVoidElement = voidElements.has(type);
            var className = vNode.className;
            if (isString(className)) {
                renderedString += " class=\"" + (escapeText(className)) + "\"";
            }
            else if (isNumber(className)) {
                renderedString += " class=\"" + className + "\"";
            }
            if (!isNull(props)) {
                for (var prop in props) {
                    var value = props[prop];
                    if (prop === "dangerouslySetInnerHTML") {
                        html = value.__html;
                    }
                    else if (prop === "style") {
                        renderedString += " style=\"" + (renderStylesToString(props.style)) + "\"";
                    }
                    else if (prop === "children") {
                        // Ignore children as prop.
                    }
                    else if (prop === "defaultValue") {
                        // Use default values if normal values are not present
                        if (!props.value) {
                            renderedString += " value=\"" + (isString(value) ? escapeText(value) : value) + "\"";
                        }
                    }
                    else if (prop === "defaultChecked") {
                        // Use default values if normal values are not present
                        if (!props.checked) {
                            renderedString += " checked=\"" + value + "\"";
                        }
                    }
                    else {
                        if (isString(value)) {
                            renderedString += " " + prop + "=\"" + (escapeText(value)) + "\"";
                        }
                        else if (isNumber(value)) {
                            renderedString += " " + prop + "=\"" + value + "\"";
                        }
                        else if (isTrue(value)) {
                            renderedString += " " + prop;
                        }
                    }
                }
                if (type === "option" &&
                    typeof props.value !== "undefined" &&
                    props.value === parent.props.value) {
                    // Parent value sets children value
                    renderedString += " selected";
                }
            }
            if (isVoidElement) {
                renderedString += ">";
            }
            else {
                renderedString += ">";
                if (!isInvalid(children)) {
                    if (isString(children)) {
                        renderedString += children === "" ? " " : escapeText(children);
                    }
                    else if (isNumber(children)) {
                        renderedString += children + "";
                    }
                    else if (isArray(children)) {
                        for (var i = 0, len = children.length; i < len; i++) {
                            var child = children[i];
                            if (isString(child)) {
                                renderedString += child === "" ? " " : escapeText(child);
                            }
                            else if (isNumber(child)) {
                                renderedString += child;
                            }
                            else if (!isInvalid(child)) {
                                renderedString += renderVNodeToString(child, vNode, context, i === 0);
                            }
                        }
                    }
                    else {
                        renderedString += renderVNodeToString(children, vNode, context, true);
                    }
                }
                else if (html) {
                    renderedString += html;
                }
                if (!isVoidElement) {
                    renderedString += "</" + type + ">";
                }
            }
            return renderedString;
        }
        else if ((flags & 1 /* Text */) > 0) {
            return ((firstChild ? "" : "<!---->") +
                (children === "" ? " " : escapeText(children)));
        }
        else {
            {
                if (typeof vNode === "object") {
                    throwError(("renderToString() received an object that's not a valid VNode, you should stringify it first. Object: \"" + (JSON.stringify(vNode)) + "\"."));
                }
                else {
                    throwError(("renderToString() expects a valid VNode, instead it received an object with the type \"" + (typeof vNode) + "\"."));
                }
            }
            throwError();
        }
    }
    function renderToString(input) {
        return renderVNodeToString(input, {}, {}, true);
    }
    function renderToStaticMarkup(input) {
        return renderVNodeToString(input, {}, {}, true);
    }

    /**
     * @module Inferno-Server
     */ /** TypeDoc Comment */
    var RenderQueueStream = (function (Readable$$1) {
        function RenderQueueStream(initNode, staticMarkup) {
            Readable$$1.call(this);
            this.collector = [Infinity]; // Infinity marks the end of the stream
            this.promises = [];
            this.pushQueue = this.pushQueue.bind(this);
            if (initNode) {
                this.renderVNodeToQueue(initNode, null, staticMarkup, null);
            }
        }

        if ( Readable$$1 ) RenderQueueStream.__proto__ = Readable$$1;
        RenderQueueStream.prototype = Object.create( Readable$$1 && Readable$$1.prototype );
        RenderQueueStream.prototype.constructor = RenderQueueStream;
        RenderQueueStream.prototype._read = function _read () {
            setTimeout(this.pushQueue, 0);
        };
        RenderQueueStream.prototype.addToQueue = function addToQueue (node, position) {
            // Positioning defined, stack it
            if (!isNullOrUndef(position)) {
                var lastSlot = this.promises[position].length - 1;
                // Combine as array or push into promise collector
                if (typeof this.promises[position][lastSlot] === "string" &&
                    typeof node === "string") {
                    this.promises[position][lastSlot] += node;
                }
                else {
                    this.promises[position].push(node);
                }
                // Collector is empty push to stream
            }
            else if (typeof node === "string" && this.collector.length - 1 === 0) {
                this.push(node);
                // Last element in collector and incoming are same then concat
            }
            else if (typeof node === "string" &&
                typeof this.collector[this.collector.length - 2] === "string") {
                this.collector[this.collector.length - 2] += node;
                // Push the element to collector (before Infinity)
            }
            else {
                this.collector.splice(-1, 0, node);
            }
        };
        RenderQueueStream.prototype.pushQueue = function pushQueue () {
            var chunk = this.collector[0];
            // Output strings directly
            if (typeof chunk === "string") {
                this.push(chunk);
                this.collector.shift();
                // For fulfilled promises, merge into collector
            }
            else if (!!chunk &&
                (typeof chunk === "object" || isFunction(chunk)) &&
                isFunction(chunk.then)) {
                var self = this;
                chunk.then(function (index) {
                    (ref = self.collector).splice.apply(ref, [ 0, 1 ].concat( self.promises[index] ));
                    self.promises[index] = null;
                    setTimeout(self.pushQueue, 0);
                    var ref;
                });
                this.collector[0] = null;
                // End of content
            }
            else if (chunk === Infinity) {
                this.emit("end");
            }
        };
        RenderQueueStream.prototype.renderVNodeToQueue = function renderVNodeToQueue (vNode, context, firstChild, position) {
            var this$1 = this;

            // In case render returns invalid stuff
            if (isInvalid(vNode)) {
                this.addToQueue("<!--!-->", position);
                return;
            }
            var flags = vNode.flags;
            var type = vNode.type;
            var props = vNode.props || inferno.EMPTY_OBJ;
            var children = vNode.children;
            // Handles a component render
            if ((flags & 28 /* Component */) > 0) {
                var isClass = flags & 4;
                // Render the
                if (isClass) {
                    var instance = new type(props, context);
                    instance.$BS = false;
                    var childContext;
                    if (!isUndefined(instance.getChildContext)) {
                        childContext = instance.getChildContext();
                    }
                    if (!isNullOrUndef(childContext)) {
                        context = combineFrom(context, childContext);
                    }
                    if (instance.props === inferno.EMPTY_OBJ) {
                        instance.props = props;
                    }
                    instance.context = context;
                    instance.$UN = false;
                    // Trigger lifecycle hook
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
                    // Trigger extra promise-based lifecycle hook
                    if (isFunction(instance.getInitialProps)) {
                        var initialProps = instance.getInitialProps(instance.props, instance.context);
                        if (initialProps) {
                            if (Promise.resolve(initialProps) === initialProps) {
                                var promisePosition = this.promises.push([]) - 1;
                                this.addToQueue(initialProps.then(function (dataForContext) {
                                    instance.$PSS = false;
                                    if (typeof dataForContext === "object") {
                                        instance.props = combineFrom(instance.props, dataForContext);
                                    }
                                    this$1.renderVNodeToQueue(instance.render(instance.props, instance.state, instance.context), instance.context, true, promisePosition);
                                    setTimeout(this$1.pushQueue, 0);
                                    return promisePosition;
                                }), position);
                                return;
                            }
                            else {
                                instance.props = combineFrom(instance.props, initialProps);
                            }
                        }
                    }
                    var nextVNode = instance.render(props, instance.state, vNode.context);
                    instance.$PSS = false;
                    this.renderVNodeToQueue(nextVNode, context, true, position);
                }
                else {
                    var nextVNode$1 = type(props, context);
                    this.renderVNodeToQueue(nextVNode$1, context, true, position);
                }
                // If an element
            }
            else if ((flags & 3970 /* Element */) > 0) {
                var renderedString = "<" + type;
                var html;
                var isVoidElement = voidElements.has(type);
                var className = vNode.className;
                if (isString(className)) {
                    renderedString += " class=\"" + (escapeText(className)) + "\"";
                }
                else if (isNumber(className)) {
                    renderedString += " class=\"" + className + "\"";
                }
                if (!isNull(props)) {
                    for (var prop in props) {
                        var value = props[prop];
                        if (prop === "dangerouslySetInnerHTML") {
                            html = value.__html;
                        }
                        else if (prop === "style") {
                            renderedString += " style=\"" + (renderStylesToString(props.style)) + "\"";
                        }
                        else if (prop === "children") {
                            // Ignore children as prop.
                        }
                        else if (prop === "defaultValue") {
                            // Use default values if normal values are not present
                            if (!props.value) {
                                renderedString += " value=\"" + (isString(value) ? escapeText(value) : value) + "\"";
                            }
                        }
                        else if (prop === "defaultChecked") {
                            // Use default values if normal values are not present
                            if (!props.checked) {
                                renderedString += " checked=\"" + value + "\"";
                            }
                        }
                        else {
                            if (isString(value)) {
                                renderedString += " " + prop + "=\"" + (escapeText(value)) + "\"";
                            }
                            else if (isNumber(value)) {
                                renderedString += " " + prop + "=\"" + value + "\"";
                            }
                            else if (isTrue(value)) {
                                renderedString += " " + prop;
                            }
                        }
                    }
                }
                // Voided element, push directly to queue
                if (isVoidElement) {
                    this.addToQueue(renderedString + ">", position);
                    // Regular element with content
                }
                else {
                    renderedString += ">";
                    // Element has children, build them in
                    if (!isInvalid(children)) {
                        if (isArray(children)) {
                            this.addToQueue(renderedString, position);
                            renderedString = "";
                            for (var i = 0, len = children.length; i < len; i++) {
                                var child = children[i];
                                if (isString(child)) {
                                    this$1.addToQueue(escapeText(child), position);
                                }
                                else if (isNumber(child)) {
                                    this$1.addToQueue(child + "", position);
                                }
                                else if (!isInvalid(child)) {
                                    this$1.renderVNodeToQueue(child, context, i === 0, position);
                                }
                            }
                        }
                        else if (isString(children)) {
                            this.addToQueue(renderedString + escapeText(children) + "</" + type + ">", position);
                            return;
                        }
                        else if (isNumber(children)) {
                            this.addToQueue(renderedString + children + "</" + type + ">", position);
                            return;
                        }
                        else {
                            this.addToQueue(renderedString, position);
                            this.renderVNodeToQueue(children, context, true, position);
                            this.addToQueue("</" + type + ">", position);
                            return;
                        }
                    }
                    else if (html) {
                        this.addToQueue(renderedString + html + "</" + type + ">", position);
                        return;
                    }
                    // Close element if it's not void
                    if (!isVoidElement) {
                        this.addToQueue(renderedString + "</" + type + ">", position);
                    }
                }
                // Push text directly to queue
            }
            else if ((flags & 1 /* Text */) > 0) {
                this.addToQueue((firstChild ? "" : "<!---->") + escapeText(children), position);
                // Handle errors
            }
            else {
                {
                    if (typeof vNode === "object") {
                        throwError(("renderToString() received an object that's not a valid VNode, you should stringify it first. Object: \"" + (JSON.stringify(vNode)) + "\"."));
                    }
                    else {
                        throwError(("renderToString() expects a valid VNode, instead it received an object with the type \"" + (typeof vNode) + "\"."));
                    }
                }
                throwError();
            }
        };

        return RenderQueueStream;
    }(stream.Readable));
    function streamQueueAsString(node) {
        return new RenderQueueStream(node, false);
    }
    function streamQueueAsStaticMarkup(node) {
        return new RenderQueueStream(node, true);
    }

    /**
     * @module Inferno-Server
     */ /** TypeDoc Comment */
    var resolvedPromise = Promise.resolve();
    var RenderStream = (function (Readable$$1) {
        function RenderStream(initNode, staticMarkup) {
            Readable$$1.call(this);
            this.started = false;
            this.initNode = initNode;
            this.staticMarkup = staticMarkup;
        }

        if ( Readable$$1 ) RenderStream.__proto__ = Readable$$1;
        RenderStream.prototype = Object.create( Readable$$1 && Readable$$1.prototype );
        RenderStream.prototype.constructor = RenderStream;
        RenderStream.prototype._read = function _read () {
            var this$1 = this;

            if (this.started) {
                return;
            }
            this.started = true;
            resolvedPromise
                .then(function () {
                return this$1.renderNode(this$1.initNode, null, this$1.staticMarkup);
            })
                .then(function () {
                this$1.push(null);
            })
                .catch(function (err) {
                this$1.emit("error", err);
            });
        };
        RenderStream.prototype.renderNode = function renderNode (vNode, context, isRoot) {
            if (isInvalid(vNode)) {
                return;
            }
            else {
                var flags = vNode.flags;
                if ((flags & 28 /* Component */) > 0) {
                    return this.renderComponent(vNode, isRoot, context, flags & 4 /* ComponentClass */);
                }
                if ((flags & 3970 /* Element */) > 0) {
                    return this.renderElement(vNode, isRoot, context);
                }
                return this.renderText(vNode);
            }
        };
        RenderStream.prototype.renderComponent = function renderComponent (vComponent, isRoot, context, isClass) {
            var this$1 = this;

            var type = vComponent.type;
            var props = vComponent.props;
            if (!isClass) {
                return this.renderNode(type(props), context, isRoot);
            }
            var instance = new type(props);
            instance.$BS = false;
            var childContext;
            if (isFunction(instance.getChildContext)) {
                childContext = instance.getChildContext();
            }
            if (!isNullOrUndef(childContext)) {
                context = combineFrom(context, childContext);
            }
            instance.context = context;
            instance.$BR = true;
            return Promise.resolve(instance.componentWillMount && instance.componentWillMount()).then(function () {
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
                var node = instance.render(instance.props, instance.state, instance.context);
                instance.$PSS = false;
                return this$1.renderNode(node, context, isRoot);
            });
        };
        RenderStream.prototype.renderChildren = function renderChildren (children, context) {
            var this$1 = this;

            if (isString(children)) {
                return this.push(escapeText(children));
            }
            if (isNumber(children)) {
                return this.push(children + "");
            }
            if (!children) {
                return;
            }
            var childrenIsArray = isArray(children);
            if (!childrenIsArray && !isInvalid(children)) {
                return this.renderNode(children, context, false);
            }
            if (!childrenIsArray) {
                throw new Error("invalid component");
            }
            return children.reduce(function (p, child) {
                return p.then(function (insertComment) {
                    var isTextOrNumber = isStringOrNumber(child);
                    if (isTextOrNumber) {
                        if (insertComment === true) {
                            this$1.push("<!---->");
                        }
                        if (isString(child)) {
                            this$1.push(escapeText(child));
                        }
                        else {
                            this$1.push(child + "");
                        }
                        return true;
                    }
                    else if (isArray(child)) {
                        this$1.push("<!---->");
                        return Promise.resolve(this$1.renderChildren(child)).then(function () {
                            this$1.push("<!--!-->");
                            return true;
                        });
                    }
                    else if (!isInvalid(child)) {
                        if ((child.flags & 1 /* Text */) > 0) {
                            if (insertComment) {
                                this$1.push("<!---->");
                            }
                        }
                        return Promise.resolve(this$1.renderNode(child, context, false)).then(function () { return !!(child.flags & 1 /* Text */); });
                    }
                });
            }, Promise.resolve(false));
        };
        RenderStream.prototype.renderText = function renderText (vNode) {
            var this$1 = this;

            return resolvedPromise.then(function (insertComment) {
                this$1.push(escapeText(vNode.children));
                return insertComment;
            });
        };
        RenderStream.prototype.renderElement = function renderElement (vElement, isRoot, context) {
            var this$1 = this;

            var tag = vElement.type;
            var props = vElement.props;
            var outputAttrs = renderAttributes(props);
            var html = "";
            var className = vElement.className;
            if (isString(className)) {
                outputAttrs.push(("class=\"" + (escapeText(className)) + "\""));
            }
            else if (isNumber(className)) {
                outputAttrs.push(("class=\"" + className + "\""));
            }
            if (props) {
                var style = props.style;
                if (style) {
                    outputAttrs.push('style="' + renderStylesToString(style) + '"');
                }
                if (props.dangerouslySetInnerHTML) {
                    html = props.dangerouslySetInnerHTML.__html;
                }
            }
            if (isRoot) {
                outputAttrs.push("data-infernoroot");
            }
            this.push(("<" + tag + (outputAttrs.length > 0 ? " " + outputAttrs.join(" ") : "") + ">"));
            if (voidElements.has(tag)) {
                return;
            }
            if (html) {
                this.push(html);
                this.push(("</" + tag + ">"));
                return;
            }
            return Promise.resolve(this.renderChildren(vElement.children, context)).then(function () {
                this$1.push(("</" + tag + ">"));
            });
        };

        return RenderStream;
    }(stream.Readable));
    function streamAsString(node) {
        return new RenderStream(node, false);
    }
    function streamAsStaticMarkup(node) {
        return new RenderStream(node, true);
    }

    /**
     * @module Inferno-Server
     */ /** TypeDoc Comment */

    exports.RenderQueueStream = RenderQueueStream;
    exports.RenderStream = RenderStream;
    exports.renderToStaticMarkup = renderToStaticMarkup;
    exports.renderToString = renderToString;
    exports.streamAsStaticMarkup = streamAsStaticMarkup;
    exports.streamAsString = streamAsString;
    exports.streamQueueAsStaticMarkup = streamQueueAsStaticMarkup;
    exports.streamQueueAsString = streamQueueAsString;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
