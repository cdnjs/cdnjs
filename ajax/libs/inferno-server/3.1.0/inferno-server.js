
/*!
 * Inferno.Server v3.1.0
 * (c) 2017 Dominic Gannaway'
 * Released under the MIT License.
 */

(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('inferno'), require('stream')) :
	typeof define === 'function' && define.amd ? define(['exports', 'inferno', 'stream'], factory) :
	(factory((global.Inferno = global.Inferno || {}, global.Inferno.Server = global.Inferno.Server || {}),global.Inferno,global.stream));
}(this, (function (exports,inferno,stream) { 'use strict';

var ERROR_MSG = 'a runtime error occured! Use Inferno in development environment to find the error.';
// This should be boolean and not reference to window.document


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

var ecapeCharacters = {
    '"': '&quot;',
    '&': '&amp;',
    '\'': '&#039;',
    '<': '&lt;',
    '>': '&gt;'
};
var escapeChar = function (char) { return ecapeCharacters[char] || char; };
function escapeText(text) {
    return String(text).replace(/[<>"'&]/g, escapeChar);
}
var uppercasePattern = /[A-Z]/g;
var msPattern = /^ms-/;
function toHyphenCase(str) {
    return str.replace(uppercasePattern, '-$&').toLowerCase().replace(msPattern, '-ms-');
}
var voidElements = {
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
    meta: true,
    param: true,
    source: true,
    track: true,
    wbr: true
};
function isVoidElement(str) {
    return !!voidElements[str];
}

function renderStylesToString(styles) {
    if (isStringOrNumber(styles)) {
        return styles;
    }
    else {
        var renderedString = '';
        for (var styleName in styles) {
            var value = styles[styleName];
            var px = isNumber(value) && !inferno.internal_isUnitlessNumber.has(styleName) ? 'px' : '';
            if (!isNullOrUndef(value)) {
                renderedString += (toHyphenCase(styleName)) + ":" + (escapeText(value)) + px + ";";
            }
        }
        return renderedString;
    }
}
function renderVNodeToString(vNode, parent, context, firstChild) {
    var flags = vNode.flags;
    var type = vNode.type;
    var props = vNode.props || inferno.EMPTY_OBJ;
    var children = vNode.children;
    if (flags & 28 /* Component */) {
        var isClass = flags & 4;
        if (isClass) {
            var instance = new type(props, context);
            instance._blockSetState = false;
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
            instance._pendingSetState = true;
            instance._unmounted = false;
            if (isFunction(instance.componentWillMount)) {
                instance.componentWillMount();
            }
            var nextVNode = instance.render(props, vNode.context);
            instance._pendingSetState = false;
            // In case render returns invalid stuff
            if (isInvalid(nextVNode)) {
                return '<!--!-->';
            }
            return renderVNodeToString(nextVNode, vNode, context, true);
        }
        else {
            var nextVNode$1 = type(props, context);
            if (isInvalid(nextVNode$1)) {
                return '<!--!-->';
            }
            return renderVNodeToString(nextVNode$1, vNode, context, true);
        }
    }
    else if (flags & 3970 /* Element */) {
        var renderedString = "<" + type;
        var html;
        var isVoidElement$$1 = isVoidElement(type);
        if (!isNullOrUndef(vNode.className)) {
            renderedString += " class=\"" + (escapeText(vNode.className)) + "\"";
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
                        renderedString += " value=\"" + (escapeText(value)) + "\"";
                    }
                }
                else if (prop === 'defaultChecked') {
                    // Use default values if normal values are not present
                    if (!props.checked) {
                        renderedString += " checked=\"" + value + "\"";
                    }
                }
                else if (type === 'option' && prop === 'value') {
                    // Parent value sets children value
                    if (value === parent.props.value) {
                        renderedString += " selected";
                    }
                }
                else {
                    if (isStringOrNumber(value)) {
                        renderedString += " " + prop + "=\"" + (escapeText(value)) + "\"";
                    }
                    else if (isTrue(value)) {
                        renderedString += " " + prop;
                    }
                }
            }
        }
        if (isVoidElement$$1) {
            renderedString += ">";
        }
        else {
            renderedString += ">";
            if (!isInvalid(children)) {
                if (isArray(children)) {
                    for (var i = 0, len = children.length; i < len; i++) {
                        var child = children[i];
                        if (isStringOrNumber(child)) {
                            renderedString += (child === '' ? ' ' : escapeText(child));
                        }
                        else if (!isInvalid(child)) {
                            renderedString += renderVNodeToString(child, vNode, context, i === 0);
                        }
                    }
                }
                else if (isStringOrNumber(children)) {
                    renderedString += (children === '' ? ' ' : escapeText(children));
                }
                else {
                    renderedString += renderVNodeToString(children, vNode, context, true);
                }
            }
            else if (html) {
                renderedString += html;
            }
            if (!isVoidElement$$1) {
                renderedString += "</" + type + ">";
            }
        }
        return renderedString;
    }
    else if (flags & 1 /* Text */) {
        return (firstChild ? '' : '<!---->') + (children === '' ? ' ' : escapeText(children));
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
function renderToStaticMarkup(input) {
    return renderVNodeToString(input, {}, {}, true);
}

function renderStylesToString$1(styles) {
    if (isStringOrNumber(styles)) {
        return styles;
    }
    else {
        var renderedString = '';
        for (var styleName in styles) {
            var value = styles[styleName];
            var px = isNumber(value) && !inferno.internal_isUnitlessNumber.has(styleName) ? 'px' : '';
            if (!isNullOrUndef(value)) {
                renderedString += (toHyphenCase(styleName)) + ":" + (escapeText(value)) + px + ";";
            }
        }
        return renderedString;
    }
}
var RenderQueueStream = (function (Readable$$1) {
    function RenderQueueStream(initNode, staticMarkup) {
        Readable$$1.call(this);
        this.started = false;
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
            if (typeof this.promises[position][lastSlot] === 'string' &&
                typeof node === 'string') {
                this.promises[position][lastSlot] += node;
            }
            else {
                this.promises[position].push(node);
            }
            // Collector is empty push to stream
        }
        else if (typeof node === 'string' &&
            (this.collector.length - 1) === 0) {
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

        // In case render returns invalid stuff
        if (isInvalid(vNode)) {
            this.addToQueue('<!--!-->', position);
            return;
        }
        var flags = vNode.flags;
        var type = vNode.type;
        var props = vNode.props || inferno.EMPTY_OBJ;
        var children = vNode.children;
        // Handles a component render
        if (flags & 28 /* Component */) {
            var isClass = flags & 4;
            // Render the
            if (isClass) {
                var instance = new type(props, context);
                instance._blockSetState = false;
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
                instance._pendingSetState = true;
                instance._unmounted = false;
                // Trigger lifecycle hook
                if (isFunction(instance.componentWillMount)) {
                    instance.componentWillMount();
                }
                // Trigger extra promise-based lifecycle hook
                if (isFunction(instance.getInitialProps)) {
                    var initialProps = instance.getInitialProps(instance.props, instance.context);
                    if (initialProps) {
                        if (Promise.resolve(initialProps) === initialProps) {
                            var promisePosition = this.promises.push([]) - 1;
                            this.addToQueue(initialProps.then(function (dataForContext) {
                                instance._pendingSetState = false;
                                if (typeof dataForContext === 'object') {
                                    instance.props = combineFrom(instance.props, dataForContext);
                                }
                                this$1.renderVNodeToQueue(instance.render(instance.props, instance.context), instance.context, true, promisePosition);
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
                var nextVNode = instance.render(props, vNode.context);
                instance._pendingSetState = false;
                this.renderVNodeToQueue(nextVNode, context, true, position);
            }
            else {
                var nextVNode$1 = type(props, context);
                this.renderVNodeToQueue(nextVNode$1, context, true, position);
            }
            // If an element
        }
        else if (flags & 3970 /* Element */) {
            var renderedString = "<" + type;
            var html;
            var isVoidElement$$1 = isVoidElement(type);
            if (!isNullOrUndef(vNode.className)) {
                renderedString += " class=\"" + (escapeText(vNode.className)) + "\"";
            }
            if (!isNull(props)) {
                for (var prop in props) {
                    var value = props[prop];
                    if (prop === 'dangerouslySetInnerHTML') {
                        html = value.__html;
                    }
                    else if (prop === 'style') {
                        renderedString += " style=\"" + (renderStylesToString$1(props.style)) + "\"";
                    }
                    else if (prop === 'children') {
                        // Ignore children as prop.
                    }
                    else if (prop === 'defaultValue') {
                        // Use default values if normal values are not present
                        if (!props.value) {
                            renderedString += " value=\"" + (escapeText(value)) + "\"";
                        }
                    }
                    else if (prop === 'defaultChecked') {
                        // Use default values if normal values are not present
                        if (!props.checked) {
                            renderedString += " checked=\"" + value + "\"";
                        }
                    }
                    else {
                        if (isStringOrNumber(value)) {
                            renderedString += " " + prop + "=\"" + (escapeText(value)) + "\"";
                        }
                        else if (isTrue(value)) {
                            renderedString += " " + prop;
                        }
                    }
                }
            }
            // Voided element, push directly to queue
            if (isVoidElem