(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('inferno'), require('stream')) :
    typeof define === 'function' && define.amd ? define(['exports', 'inferno', 'stream'], factory) :
    (factory((global.Inferno = global.Inferno || {}, global.Inferno.Server = global.Inferno.Server || {}),global.Inferno,global.stream));
}(this, (function (exports,inferno,stream) { 'use strict';

    /**
     * @module Inferno-Shared
     */ /** TypeDoc Comment */
    var ERROR_MSG = 'a runtime error occured! Use Inferno in development environment to find the error.';
    // This should be boolean and not reference to window.document
    var isBrowser = !!(typeof window !== 'undefined' && window.document);
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
        var result = '';
        var escape = '';
        var start = 0;
        var i;
        for (i = 0; i < text.length; i++) {
            switch (text.charCodeAt(i)) {
                case 34:// "
                    escape = '&quot;';
                    break;
                case 39:// '
                    escape = '&#039;';
                    break;
                case 38:// &
                    escape = '&amp;';
                    break;
                case 60:// <
                    escape = '&lt;';
                    break;
                case 62:// >
                    escape = '&gt;';
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
        if (CssPropCache[str] !== void 0) {
            return CssPropCache[str];
        }
        return (CssPropCache[str] =
            str.replace(uppercasePattern, '-$&').toLowerCase() + ':');
    }
    var voidElements = new Set([
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
    ]);

    /**
     * @module Inferno-Server
     */ /** TypeDoc Comment */
    function renderStylesToString(styles) {
        if (isString(styles)) {
            return styles;
        }
        else {
            var renderedString = '';
            for (var styleName in styles) {
                var value = styles[styleName];
                if (isString(value)) {
                    renderedString += "" + (getCssPropertyName(styleName)) + value + ";";
                }
                else if (isNumber(value)) {
                    renderedString += "" + (getCssPropertyName(styleName)) + value + (inferno.isUnitlessNumber.has(styleName) ? '' : 'px') + ";";
                }
            }
            return renderedString;
        }
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
        if ((flags & 14 /* Component */) > 0) {
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
                var renderOutput = instance.render(props, instance.state, instance.context);
                // In case render returns invalid stuff
                if (isInvalid(renderOutput)) {
                    return '<!--!-->';
                }
                if (isString(renderOutput)) {
                    return escapeText(renderOutput);
                }
                if (isNumber(renderOutput)) {
                    return renderOutput + '';
                }
                return renderVNodeToString(renderOutput, vNode, childContext, true);
            }
            else {
                var renderOutput$1 = type(props, context);
                if (isInvalid(renderOutput$1)) {
                    return '<!--!-->';
                }
                if (isString(renderOutput$1)) {
                    return escapeText(renderOutput$1);
                }
                if (isNumber(renderOutput$1)) {
                    return renderOutput$1 + '';
                }
                return renderVNodeToString(renderOutput$1, vNode, context, true);
            }
        }
        else if ((flags & 993 /* Element */) > 0) {
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
                    if (prop === 'dangerouslySetInnerHTML') {
                        html = value.__html;
                    }
                    else if (prop === 'style') {
                        renderedString += " style=\"" + (renderStylesToString(props.style)) + "\"";
                    }
                    else if (prop === 'children') {
                        // Ignore children as prop.
                    }
                    else if (prop === 'defaultValue') {
                        // Use default values if normal values are not present
                        if (!props.value) {
                            renderedString += " value=\"" + (isString(value) ? escapeText(value) : value) + "\"";
                        }
                    }
                    else if (prop === 'defaultChecked') {
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
                if (type === 'option' &&
                    typeof props.value !== 'undefined' &&
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
                var childFlags = vNode.childFlags;
                if (childFlags & 2 /* HasVNodeChildren */) {
                    renderedString += renderVNodeToString(children, vNode, context, true);
                }
                else if (childFlags & 12 /* MultipleChildren */) {
                    for (var i = 0, len = children.length; i < len; i++) {
                        renderedString += renderVNodeToString(children[i], vNode, context, i === 0);
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
        else if ((flags & 16 /* Text */) > 0) {
            return ((firstChild ? '' : '<!---->') +
                (children === '' ? ' ' : escapeText(children)));
        }
        else {
            {
                if (typeof vNode === 'object') {
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

    /**
     * @module Inferno-Server
     */
    /** TypeDoc Comment */
    var RenderQueueStream = (function (Readable$$1) {
        function RenderQueueStream(initNode) {
            Readable$$1.call(this);
            this.collector = [Infinity]; // Infinity marks the end of the stream
            this.promises = [];
            this.pushQueue = this.pushQueue.bind(this);
            if (initNode) {
                this.renderVNodeToQueue(initNode, null, false, null);
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
                if (typeof this.promises[position][lastSlot] === 'string' &&
                    typeof node === 'string') {
                    this.promises[position][lastSlot] += node;
                }
                else {
                    this.promises[position].push(node);
                }
                // Collector is empty push to stream
            }
            else if (typeof node === 'string' && this.collector.length - 1 === 0) {
                this.push(node);
                // Last element in collector and incoming are same then concat
            }
            else if (typeof node === 'string' &&
                typeof this.collector[this.collector.length - 2] === 'string') {
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
            if (typeof chunk === 'string') {
                this.push(chunk);
                this.collector.shift();
                // For fulfilled promises, merge into collector
            }
            else if (!!chunk &&
                (typeof chunk === 'object' || isFunction(chunk)) &&
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
                this.emit('end');
            }
        };
        RenderQueueStream.prototype.renderVNodeToQueue = function renderVNodeToQueue (vNode, context, firstChild, position) {
            var this$1 = this;

            var flags = vNode.flags;
            var type = vNode.type;
            var props = vNode.props || inferno.EMPTY_OBJ;
            var children = vNode.children;
            // Handles a component render
            if ((flags & 14 /* Component */) > 0) {
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
                                    if (typeof dataForContext === 'object') {
                                        instance.props = combineFrom(instance.props, dataForContext);
                                    }
                                    var renderOut = instance.render(instance.props, instance.state, instance.context);
                                    if (isInvalid(renderOut)) {
                                        this$1.addToQueue('<!--!-->', promisePosition);
                                    }
                                    else if (isString(renderOut)) {
                                        this$1.addToQueue(escapeText(renderOut), promisePosition);
                                    }
                                    else if (isNumber(renderOut)) {
                                        this$1.addToQueue(renderOut + '', promisePosition);
                                    }
                                    else {
                                        this$1.renderVNodeToQueue(renderOut, instance.context, true, promisePosition);
                                    }
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
                    var renderOutput = instance.render(instance.props, instance.state, instance.context);
                    instance.$PSS = false;
                    if (isInvalid(renderOutput)) {
                        this.addToQueue('<!--!-->', position);
                    }
                    else if (isString(renderOutput)) {
                        this.addToQueue(escapeText(renderOutput), position);
                    }
                    else if (isNumber(renderOutput)) {
                        this.addToQueue(renderOutput + '', position);
                    }
                    else {
                        this.renderVNodeToQueue(renderOutput, context, true, position);
                    }
                }
                else {
                    var renderOutput$1 = type(props, context);
                    if (isInvalid(renderOutput$1)) {
                        this.addToQueue('<!--!-->', position);
                    }
                    else if (isString(renderOutput$1)) {
                        this.addToQueue(escapeText(renderOutput$1), position);
                    }
                    else if (isNumber(renderOutput$1)) {
                        this.addToQueue(renderOutput$1 + '', position);
                    }
                    else {
                        this.renderVNodeToQueue(renderOutput$1, context, true, position);
                    }
                }
                // If an element
            }
            else if ((flags & 993 /* Element */) > 0) {
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
                        if (prop === 'dangerouslySetInnerHTML') {
                            html = value.__html;
                        }
                        else if (prop === 'style') {
                            renderedString += " style=\"" + (renderStylesToString(props.style)) + "\"";
                        }
                        else if (prop === 'children') {
                            // Ignore children as prop.
                        }
                        else if (prop === 'defaultValue') {
                            // Use default values if normal values are not present
                            if (!props.value) {
                                renderedString += " value=\"" + (isString(value) ? escapeText(value) : value) + "\"";
                            }
                        }
                        else if (prop === 'defaultChecked') {
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
                    var childFlags = vNode.childFlags;
                    if (childFlags & 2 /* HasVNodeChildren */) {
                        this.addToQueue(renderedString, position);
                        this.renderVNodeToQueue(children, context, true, position);
                        this.addToQueue('</' + type + '>', position);
                        return;
                    }
                    else if (childFlags & 12 /* MultipleChildren */) {
                        this.addToQueue(renderedString, position);
                        renderedString = '';
                        for (var i = 0, len = children.length; i < len; i++) {
                            this$1.renderVNodeToQueue(children[i], context, i === 0, position);
                        }
                    }
                    if (html) {
                        this.addToQueue(renderedString + html + '</' + type + '>', position);
                        return;
                    }
                    // Close element if it's not void
                    if (!isVoidElement) {
                        this.addToQueue(renderedString + '</' + type + '>', position);
                    }
                }
                // Push text directly to queue
            }
            else if ((flags & 16 /* Text */) > 0) {
                this.addToQueue((firstChild ? '' : '<!---->') +
                    (children === '' ? ' ' : escapeText(children)), position);
                // Handle errors
            }
            else {
                {
                    if (typeof vNode === 'object') {
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
        return new RenderQueueStream(node);
    }

    /**
     * @module Inferno-Server
     */ /** TypeDoc Comment */
    var resolvedPromise = Promise.resolve();
    var RenderStream = (function (Readable$$1) {
        function RenderStream(initNode) {
            Readable$$1.call(this);
            this.started = false;
            this.initNode = initNode;
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
                return this$1.renderNode(this$1.initNode, null, false);
            })
                .then(function () {
                this$1.push(null);
            })
                .catch(function (err) {
                this$1.emit('error', err);
            });
        };
        RenderStream.prototype.renderNode = function renderNode (vNode, context, insertComment) {
            var flags = vNode.flags;
            if ((flags & 14 /* Component */) > 0) {
                return this.renderComponent(vNode, context, flags & 4 /* ComponentClass */);
            }
            if ((flags & 993 /* Element */) > 0) {
                return this.renderElement(vNode, context);
            }
            return this.renderText(vNode, insertComment);
        };
        RenderStream.prototype.renderComponent = function renderComponent (vComponent, context, isClass) {
            var this$1 = this;

            var type = vComponent.type;
            var props = vComponent.props;
            if (!isClass) {
                var renderOutput = type(props, context);
                if (isInvalid(renderOutput)) {
                    return this.push('<!--!-->');
                }
                if (isString(renderOutput)) {
                    return this.push(escapeText(renderOutput));
                }
                if (isNumber(renderOutput)) {
                    return this.push(renderOutput + '');
                }
                return this.renderNode(renderOutput, context, false);
            }
            var instance = new type(props, context);
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
                var renderOutput = instance.render(instance.props, instance.state, instance.context);
                instance.$PSS = false;
                if (isInvalid(renderOutput)) {
                    return this$1.push('<!--!-->');
                }
                if (isString(renderOutput)) {
                    return this$1.push(escapeText(renderOutput));
                }
                if (isNumber(renderOutput)) {
                    return this$1.push(renderOutput + '');
                }
                return this$1.renderNode(renderOutput, context, false);
            });
        };
        RenderStream.prototype.renderChildren = function renderChildren (children, context, childFlags) {
            var this$1 = this;

            if (childFlags & 2 /* HasVNodeChildren */) {
                return this.renderNode(children, context, false);
            }
            if (childFlags & 12 /* MultipleChildren */) {
                return children.reduce(function (p, child) {
                    return p.then(function (insertComment) {
                        if ((child.flags & 16 /* Text */) > 0) {
                            if (insertComment) {
                                this$1.push('<!---->');
                            }
                        }
                        return Promise.resolve(this$1.renderNode(child, context, false)).then(function () { return !!(child.flags & 16 /* Text */); });
                    });
                }, Promise.resolve(false));
            }
        };
        RenderStream.prototype.renderText = function renderText (vNode, insertComment) {
            this.push((insertComment ? '<!---->' : '') +
                (vNode.children === '' ? ' ' : escapeText(vNode.children)));
        };
        RenderStream.prototype.renderElement = function renderElement (vNode, context) {
            var this$1 = this;

            var type = vNode.type;
            var props = vNode.props;
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
                    if (prop === 'dangerouslySetInnerHTML') {
                        html = value.__html;
                    }
                    else if (prop === 'style') {
                        renderedString += " style=\"" + (renderStylesToString(props.style)) + "\"";
                    }
                    else if (prop === 'children') {
                        // Ignore children as prop.
                    }
                    else if (prop === 'defaultValue') {
                        // Use default values if normal values are not present
                        if (!props.value) {
                            renderedString += " value=\"" + (isString(value) ? escapeText(value) : value) + "\"";
                        }
                    }
                    else if (prop === 'defaultChecked') {
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
            if (isVoidElement) {
                renderedString += ">";
                this.push(renderedString);
                return;
            }
            else {
                renderedString += ">";
                this.push(renderedString);
                if (html) {
                    this.push(html);
                    this.push(("</" + type + ">"));
                    return;
                }
            }
            var childFlags = vNode.childFlags;
            if (childFlags & 1 /* HasInvalidChildren */) {
                this.push(("</" + type + ">"));
                return;
            }
            return Promise.resolve(this.renderChildren(vNode.children, context, childFlags)).then(function () {
                this$1.push(("</" + type + ">"));
            });
        };

        return RenderStream;
    }(stream.Readable));
    function streamAsString(node) {
        return new RenderStream(node);
    }

    /**
     * @module Inferno-Server
     */ /** TypeDoc Comment */

    exports.RenderQueueStream = RenderQueueStream;
    exports.RenderStream = RenderStream;
    exports.renderToStaticMarkup = renderToString;
    exports.renderToString = renderToString;
    exports.streamAsStaticMarkup = streamAsString;
    exports.streamAsString = streamAsString;
    exports.streamQueueAsStaticMarkup = streamQueueAsString;
    exports.streamQueueAsString = streamQueueAsString;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
