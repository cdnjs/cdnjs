(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('inferno'), require('stream')) :
    typeof define === 'function' && define.amd ? define(['exports', 'inferno', 'stream'], factory) :
    (global = global || self, factory((global.Inferno = global.Inferno || {}, global.Inferno.Server = global.Inferno.Server || {}), global.Inferno, global.stream));
}(this, (function (exports, inferno, stream) { 'use strict';

    var ERROR_MSG = 'a runtime error occured! Use Inferno in development environment to find the error.';
    var isArray = Array.isArray;
    function isStringOrNumber(o) {
        var type = typeof o;
        return type === 'string' || type === 'number';
    }
    function isNullOrUndef(o) {
        return o === void 0 || o === null;
    }
    function isInvalid(o) {
        return o === null || o === false || o === true || o === void 0;
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

    function renderStylesToString(styles) {
        if (isString(styles)) {
            return styles;
        }
        else {
            var renderedString = '';
            for (var styleName in styles) {
                var value = styles[styleName];
                if (isStringOrNumber(value)) {
                    renderedString += styleName + ":" + value + ";";
                }
            }
            return renderedString;
        }
    }

    var rxUnescaped = new RegExp(/["'&<>]/);
    function escapeText(text) {
        /* Much faster when there is no unescaped characters */
        if (!rxUnescaped.test(text)) {
            return text;
        }
        var result = '';
        var escape = '';
        var start = 0;
        var i;
        for (i = 0; i < text.length; ++i) {
            switch (text.charCodeAt(i)) {
                case 34: // "
                    escape = '&quot;';
                    break;
                case 39: // '
                    escape = '&#039;';
                    break;
                case 38: // &
                    escape = '&amp;';
                    break;
                case 60: // <
                    escape = '&lt;';
                    break;
                case 62: // >
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
    var ATTRIBUTE_NAME_START_CHAR = ':A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD';
    var ATTRIBUTE_NAME_CHAR = ATTRIBUTE_NAME_START_CHAR + '\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040';
    var VALID_ATTRIBUTE_NAME_REGEX = new RegExp('^[' + ATTRIBUTE_NAME_START_CHAR + '][' + ATTRIBUTE_NAME_CHAR + ']*$');
    var illegalAttributeNameCache = {};
    var validatedAttributeNameCache = {};
    function isAttributeNameSafe(attributeName) {
        if (validatedAttributeNameCache[attributeName] !== void 0) {
            return true;
        }
        if (illegalAttributeNameCache[attributeName] !== void 0) {
            return false;
        }
        if (VALID_ATTRIBUTE_NAME_REGEX.test(attributeName)) {
            validatedAttributeNameCache[attributeName] = true;
            return true;
        }
        illegalAttributeNameCache[attributeName] = true;
        {
            // tslint:disable-next-line:no-console
            console.log('Invalid attribute name: ' + attributeName);
        }
        return false;
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
    function createDerivedState(instance, nextProps, state) {
        if (instance.constructor.getDerivedStateFromProps) {
            return combineFrom(state, instance.constructor.getDerivedStateFromProps(nextProps, state));
        }
        return state;
    }

    function renderVNodeToString(vNode, parent, context) {
        var flags = vNode.flags;
        var type = vNode.type;
        var props = vNode.props || inferno.EMPTY_OBJ;
        var children = vNode.children;
        if ((flags & 14 /* Component */) !== 0) {
            var isClass = flags & 4 /* ComponentClass */;
            if (isClass) {
                var instance = new type(props, context);
                var hasNewAPI = Boolean(type.getDerivedStateFromProps);
                instance.$BS = false;
                instance.$SSR = true;
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
                if (!hasNewAPI && isFunction(instance.componentWillMount)) {
                    instance.$BR = true;
                    instance.componentWillMount();
                    instance.$BR = false;
                    var pending = instance.$PS;
                    if (pending) {
                        var state = instance.state;
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
                }
                if (hasNewAPI) {
                    instance.state = createDerivedState(instance, props, instance.state);
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
                return renderVNodeToString(renderOutput, vNode, childContext);
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
                return renderVNodeToString(renderOutput$1, vNode, context);
            }
        }
        else if ((flags & 481 /* Element */) !== 0) {
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
                    switch (prop) {
                        case 'dangerouslySetInnerHTML':
                            html = value.__html;
                            break;
                        case 'style':
                            if (!isNullOrUndef(props.style)) {
                                renderedString += " style=\"" + (renderStylesToString(props.style)) + "\"";
                            }
                            break;
                        case 'children':
                        case 'className':
                            // Ignore
                            break;
                        case 'defaultValue':
                            // Use default values if normal values are not present
                            if (!props.value) {
                                renderedString += " value=\"" + (isString(value) ? escapeText(value) : value) + "\"";
                            }
                            break;
                        case 'defaultChecked':
                            // Use default values if normal values are not present
                            if (!props.checked) {
                                renderedString += " checked=\"" + value + "\"";
                            }
                            break;
                        default:
                            if (isAttributeNameSafe(prop)) {
                                if (isString(value)) {
                                    renderedString += " " + prop + "=\"" + (escapeText(value)) + "\"";
                                }
                                else if (isNumber(value)) {
                                    renderedString += " " + prop + "=\"" + value + "\"";
                                }
                                else if (value === true) {
                                    renderedString += " " + prop;
                                }
                            }
                            break;
                    }
                }
                if (type === 'option' && typeof props.value !== 'undefined' && props.value === parent.props.value) {
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
                if (childFlags === 2 /* HasVNodeChildren */) {
                    renderedString += renderVNodeToString(children, vNode, context);
                }
                else if (childFlags & 12 /* MultipleChildren */) {
                    for (var i = 0, len = children.length; i < len; ++i) {
                        renderedString += renderVNodeToString(children[i], vNode, context);
                    }
                }
                else if (childFlags === 16 /* HasTextChildren */) {
                    renderedString += children === '' ? ' ' : escapeText(children);
                }
                else if (html) {
                    renderedString += html;
                }
                if (!isVoidElement) {
                    renderedString += "</" + type + ">";
                }
            }
            if (String(type).match(/[\s\n\/='"\0<>]/)) {
                throw renderedString;
            }
            return renderedString;
        }
        else if ((flags & 16 /* Text */) !== 0) {
            return children === '' ? ' ' : escapeText(children);
        }
        else if (isArray(vNode) || (flags & 8192 /* Fragment */) !== 0) {
            var childFlags$1 = vNode.childFlags;
            if (childFlags$1 === 2 /* HasVNodeChildren */ || (isArray(vNode) && vNode.length === 0)) {
                return '<!--!-->';
            }
            else if (childFlags$1 & 12 /* MultipleChildren */ || isArray(vNode)) {
                var tmpNodes = isArray(vNode) ? vNode : children;
                var renderedString$1 = '';
                for (var i$1 = 0, len$1 = tmpNodes.length; i$1 < len$1; ++i$1) {
                    renderedString$1 += renderVNodeToString(tmpNodes[i$1], vNode, context);
                }
                return renderedString$1;
            }
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
        return '';
    }
    function renderToString(input) {
        return renderVNodeToString(input, {}, {});
    }

    var RenderQueueStream = /*@__PURE__*/(function (Readable) {
        function RenderQueueStream(initNode) {
            Readable.call(this);
            this.collector = [Infinity]; // Infinity marks the end of the stream
            this.promises = [];
            this.pushQueue = this.pushQueue.bind(this);
            if (initNode) {
                this.renderVNodeToQueue(initNode, null, null);
            }
        }

        if ( Readable ) RenderQueueStream.__proto__ = Readable;
        RenderQueueStream.prototype = Object.create( Readable && Readable.prototype );
        RenderQueueStream.prototype.constructor = RenderQueueStream;
        RenderQueueStream.prototype._read = function _read () {
            setTimeout(this.pushQueue, 0);
        };
        RenderQueueStream.prototype.addToQueue = function addToQueue (node, position) {
            // Positioning defined, stack it
            if (!isNullOrUndef(position)) {
                var lastSlot = this.promises[position].length - 1;
                // Combine as array or push into promise collector
                if (typeof this.promises[position][lastSlot] === 'string' && typeof node === 'string') {
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
            else if (typeof node === 'string' && typeof this.collector[this.collector.length - 2] === 'string') {
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
            else if (!!chunk && (typeof chunk === 'object' || isFunction(chunk)) && isFunction(chunk.then)) {
                var self = this;
                chunk.then(function (index) {
                    var ref;

                    (ref = self.collector).splice.apply(ref, [ 0, 1 ].concat( self.promises[index] ));
                    self.promises[index] = null;
                    setTimeout(self.pushQueue, 0);
                });
                this.collector[0] = null;
                // End of content
            }
            else if (chunk === Infinity) {
                this.emit('end');
            }
        };
        RenderQueueStream.prototype.renderVNodeToQueue = function renderVNodeToQueue (vNode, context, position) {
            var this$1 = this;

            var flags = vNode.flags;
            var type = vNode.type;
            var props = vNode.props || inferno.EMPTY_OBJ;
            var children = vNode.children;
            // Handles a component render
            if ((flags & 14 /* Component */) > 0) {
                var isClass = flags & 4 /* ComponentClass */;
                // Render the
                if (isClass) {
                    var instance = new type(props, context);
                    var hasNewAPI = Boolean(type.getDerivedStateFromProps);
                    instance.$BS = false;
                    instance.$SSR = true;
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
                    // Trigger lifecycle hook
                    if (!hasNewAPI && isFunction(instance.componentWillMount)) {
                        instance.$BR = true;
                        instance.componentWillMount();
                        var pending = instance.$PS;
                        if (pending) {
                            var state = instance.state;
                            if (state === null) {
                                instance.state = pending;
                            }
                            else {
                                for (var key in pending) {
                                    state[key] = pending[key];
                                }
                            }
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
                                        this$1.renderVNodeToQueue(renderOut, instance.context, promisePosition);
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
                    if (hasNewAPI) {
                        instance.state = createDerivedState(instance, props, instance.state);
                    }
                    var renderOutput = instance.render(instance.props, instance.state, instance.context);
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
                        this.renderVNodeToQueue(renderOutput, context, position);
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
                        this.renderVNodeToQueue(renderOutput$1, context, position);
                    }
                }
                // If an element
            }
            else if ((flags & 481 /* Element */) > 0) {
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
                        switch (prop) {
                            case 'dangerouslySetInnerHTML':
                                html = value.__html;
                                break;
                            case 'style':
                                if (!isNullOrUndef(props.style)) {
                                    renderedString += " style=\"" + (renderStylesToString(props.style)) + "\"";
                                }
                                break;
                            case 'children':
                            case 'className':
                                // Ignore
                                break;
                            case 'defaultValue':
                                // Use default values if normal values are not present
                                if (!props.value) {
                                    renderedString += " value=\"" + (isString(value) ? escapeText(value) : value) + "\"";
                                }
                                break;
                            case 'defaultChecked':
                                // Use default values if normal values are not present
                                if (!props.checked) {
                                    renderedString += " checked=\"" + value + "\"";
                                }
                                break;
                            default:
                                if (isAttributeNameSafe(prop)) {
                                    if (isString(value)) {
                                        renderedString += " " + prop + "=\"" + (escapeText(value)) + "\"";
                                    }
                                    else if (isNumber(value)) {
                                        renderedString += " " + prop + "=\"" + value + "\"";
                                    }
                                    else if (value === true) {
                                        renderedString += " " + prop;
                                    }
                                }
                                break;
                        }
                    }
                }
                renderedString += ">";
                if (String(type).match(/[\s\n\/='"\0<>]/)) {
                    throw renderedString;
                }
                // Voided element, push directly to queue
                if (isVoidElement) {
                    this.addToQueue(renderedString, position);
                    // Regular element with content
                }
                else {
                    // Element has children, build them in
                    var childFlags = vNode.childFlags;
                    if (childFlags === 2 /* HasVNodeChildren */) {
                        this.addToQueue(renderedString, position);
                        this.renderVNodeToQueue(children, context, position);
                        this.addToQueue('</' + type + '>', position);
                        return;
                    }
                    else if (childFlags === 16 /* HasTextChildren */) {
                        this.addToQueue(renderedString, position);
                        this.addToQueue(children === '' ? ' ' : escapeText(children + ''), position);
                        this.addToQueue('</' + type + '>', position);
                        return;
                    }
                    else if (childFlags & 12 /* MultipleChildren */) {
                        this.addToQueue(renderedString, position);
                        for (var i = 0, len = children.length; i < len; ++i) {
                            this.renderVNodeToQueue(children[i], context, position);
                        }
                        this.addToQueue('</' + type + '>', position);
                        return;
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
                this.addToQueue(children === '' ? ' ' : escapeText(children), position);
                // Handle fragments and arrays
            }
            else if (isArray(vNode) || (flags & 8192 /* Fragment */) !== 0) {
                var childFlags$1 = vNode.childFlags;
                if (childFlags$1 === 2 /* HasVNodeChildren */ || (isArray(vNode) && vNode.length === 0)) {
                    this.addToQueue('<!--!-->', position);
                }
                else if (childFlags$1 & 12 /* MultipleChildren */ || isArray(vNode)) {
                    var tmpChildren = isArray(vNode) ? vNode : vNode.children;
                    for (var i$1 = 0, len$1 = tmpChildren.length; i$1 < len$1; ++i$1) {
                        this.renderVNodeToQueue(tmpChildren[i$1], context, position);
                    }
                    return;
                }
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

    var resolvedPromise = Promise.resolve();
    var RenderStream = /*@__PURE__*/(function (Readable) {
        function RenderStream(initNode) {
            Readable.call(this);
            this.started = false;
            this.initNode = initNode;
        }

        if ( Readable ) RenderStream.__proto__ = Readable;
        RenderStream.prototype = Object.create( Readable && Readable.prototype );
        RenderStream.prototype.constructor = RenderStream;
        RenderStream.prototype._read = function _read () {
            var this$1 = this;

            if (this.started) {
                return;
            }
            this.started = true;
            resolvedPromise
                .then(function () {
                return this$1.renderNode(this$1.initNode, null);
            })
                .then(function () {
                this$1.push(null);
            })
                .catch(function (err) {
                this$1.emit('error', err);
            });
        };
        RenderStream.prototype.renderNode = function renderNode (vNode, context) {
            var flags = vNode.flags;
            if ((flags & 14 /* Component */) > 0) {
                return this.renderComponent(vNode, context, flags & 4 /* ComponentClass */);
            }
            if ((flags & 481 /* Element */) > 0) {
                return this.renderElement(vNode, context);
            }
            if (isArray(vNode) || (flags & 8192 /* Fragment */) !== 0) {
                return this.renderArrayOrFragment(vNode, context);
            }
            return this.renderText(vNode);
        };
        RenderStream.prototype.renderArrayOrFragment = function renderArrayOrFragment (vNode, context) {
            var this$1 = this;

            var childFlags = vNode.childFlags;
            if (childFlags === 2 /* HasVNodeChildren */ || (isArray(vNode) && vNode.length === 0)) {
                return this.push('<!--!-->');
            }
            else if (childFlags & 12 /* MultipleChildren */ || isArray(vNode)) {
                var children = isArray(vNode) ? vNode : vNode.children;
                return children.reduce(function (p, child) {
                    return p.then(function () {
                        return Promise.resolve(this$1.renderNode(child, context)).then(function () { return !!(child.flags & 16 /* Text */); });
                    });
                }, Promise.resolve(false));
            }
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
                return this.renderNode(renderOutput, context);
            }
            var instance = new type(props, context);
            var hasNewAPI = Boolean(type.getDerivedStateFromProps);
            instance.$BS = false;
            instance.$SSR = true;
            var childContext;
            if (isFunction(instance.getChildContext)) {
                childContext = instance.getChildContext();
            }
            if (!isNullOrUndef(childContext)) {
                context = combineFrom(context, childContext);
            }
            instance.context = context;
            instance.$BR = true;
            return Promise.resolve(!hasNewAPI && instance.componentWillMount && instance.componentWillMount()).then(function () {
                var pending = instance.$PS;
                if (pending) {
                    var state = instance.state;
                    if (state === null) {
                        instance.state = pending;
                    }
                    else {
                        for (var key in pending) {
                            state[key] = pending[key];
                        }
                    }
                    instance.$PS = null;
                }
                instance.$BR = false;
                if (hasNewAPI) {
                    instance.state = createDerivedState(instance, props, instance.state);
                }
                var renderOutput = instance.render(instance.props, instance.state, instance.context);
                if (isInvalid(renderOutput)) {
                    return this$1.push('<!--!-->');
                }
                if (isString(renderOutput)) {
                    return this$1.push(escapeText(renderOutput));
                }
                if (isNumber(renderOutput)) {
                    return this$1.push(renderOutput + '');
                }
                return this$1.renderNode(renderOutput, context);
            });
        };
        RenderStream.prototype.renderChildren = function renderChildren (children, context, childFlags) {
            var this$1 = this;

            if (childFlags === 2 /* HasVNodeChildren */) {
                return this.renderNode(children, context);
            }
            if (childFlags === 16 /* HasTextChildren */) {
                return this.push(children === '' ? ' ' : escapeText(children + ''));
            }
            if (childFlags & 12 /* MultipleChildren */) {
                return children.reduce(function (p, child) {
                    return p.then(function () {
                        return Promise.resolve(this$1.renderNode(child, context)).then(function () { return !!(child.flags & 16 /* Text */); });
                    });
                }, Promise.resolve(false));
            }
        };
        RenderStream.prototype.renderText = function renderText (vNode) {
            this.push(vNode.children === '' ? ' ' : escapeText(vNode.children));
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
                    switch (prop) {
                        case 'dangerouslySetInnerHTML':
                            html = value.__html;
                            break;
                        case 'style':
                            if (!isNullOrUndef(props.style)) {
                                renderedString += " style=\"" + (renderStylesToString(props.style)) + "\"";
                            }
                            break;
                        case 'children':
                        case 'className':
                            // Ignore
                            break;
                        case 'defaultValue':
                            // Use default values if normal values are not present
                            if (!props.value) {
                                renderedString += " value=\"" + (isString(value) ? escapeText(value) : value) + "\"";
                            }
                            break;
                        case 'defaultChecked':
                            // Use default values if normal values are not present
                            if (!props.checked) {
                                renderedString += " checked=\"" + value + "\"";
                            }
                            break;
                        default:
                            if (isAttributeNameSafe(prop)) {
                                if (isString(value)) {
                                    renderedString += " " + prop + "=\"" + (escapeText(value)) + "\"";
                                }
                                else if (isNumber(value)) {
                                    renderedString += " " + prop + "=\"" + value + "\"";
                                }
                                else if (value === true) {
                                    renderedString += " " + prop;
                                }
                                break;
                            }
                    }
                }
            }
            renderedString += ">";
            this.push(renderedString);
            if (String(type).match(/[\s\n\/='"\0<>]/)) {
                throw renderedString;
            }
            if (isVoidElement) {
                return;
            }
            else {
                if (html) {
                    this.push(html);
                    this.push(("</" + type + ">"));
                    return;
                }
            }
            var childFlags = vNode.childFlags;
            if (childFlags === 1 /* HasInvalidChildren */) {
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
