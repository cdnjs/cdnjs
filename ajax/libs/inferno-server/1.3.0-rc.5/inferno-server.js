
/*!
 * inferno-server v1.3.0-rc.5
 * (c) 2017 Dominic Gannaway'
 * Released under the MIT License.
 */

(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('inferno'), require('stream')) :
	typeof define === 'function' && define.amd ? define(['exports', 'inferno', 'stream'], factory) :
	(factory((global['inferno-server'] = global['inferno-server'] || {}),global.Inferno,global.stream));
}(this, (function (exports,inferno,stream) { 'use strict';

var ERROR_MSG = 'a runtime error occured! Use Inferno in development environment to find the error.';


// this is MUCH faster than .constructor === Array and instanceof Array
// in Node 7 and the later versions of V8, slower in older versions though
var isArray = Array.isArray;

function isStringOrNumber(obj) {
    var type = typeof obj;
    return type === 'string' || type === 'number';
}
function isNullOrUndef(obj) {
    return isUndefined(obj) || isNull(obj);
}
function isInvalid(obj) {
    return isNull(obj) || obj === false || isTrue(obj) || isUndefined(obj);
}
function isFunction(obj) {
    return typeof obj === 'function';
}


function isNumber(obj) {
    return typeof obj === 'number';
}
function isNull(obj) {
    return obj === null;
}
function isTrue(obj) {
    return obj === true;
}
function isUndefined(obj) {
    return obj === undefined;
}

function throwError(message) {
    if (!message) {
        message = ERROR_MSG;
    }
    throw new Error(("Inferno Error: " + message));
}


function copyPropsTo(copyFrom, copyTo) {
    for (var prop in copyFrom) {
        if (isUndefined(copyTo[prop])) {
            copyTo[prop] = copyFrom[prop];
        }
    }
}

var ecapeCharacters = {
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    '\'': '&#039;',
    '&': '&amp;'
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
            var px = isNumber(value) && !inferno.internal_isUnitlessNumber[styleName] ? 'px' : '';
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
        // Primitive node doesn't have defaultProps, only Component
        if (!isNullOrUndef(type.defaultProps)) {
            copyPropsTo(type.defaultProps, props);
            vNode.props = props;
        }
        if (isClass) {
            var instance = new type(props, context);
            var childContext = instance.getChildContext();
            if (!isNullOrUndef(childContext)) {
                context = Object.assign({}, context, childContext);
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
        if (!isNull(props)) {
            for (var prop in props) {
                var value = props[prop];
                if (prop === 'dangerouslySetInnerHTML') {
                    html = value.__html;
                }
                else if (prop === 'style') {
                    renderedString += " style=\"" + (renderStylesToString(props.style)) + "\"";
                }
                else if (prop === 'className' && !isNullOrUndef(value)) {
                    renderedString += " class=\"" + (escapeText(value)) + "\"";
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
                else if (prop === 'value' && parent.props && parent.props.value) {
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

function renderStyleToString(style) {
    if (isStringOrNumber(style)) {
        return style;
    }
    else {
        var styles = [];
        for (var styleName in style) {
            var value = style[styleName];
            var px = isNumber(value) && !inferno.internal_isUnitlessNumber[styleName] ? 'px' : '';
            if (!isNullOrUndef(value)) {
                styles.push(((toHyphenCase(styleName)) + ":" + (escapeText(value)) + px + ";"));
            }
        }
        return styles.join();
    }
}
function renderAttributes(props) {
    var outputAttrs = [];
    var propsKeys = (props && Object.keys(props)) || [];
    propsKeys.forEach(function (propKey, i) {
        var value = props[propKey];
        switch (propKey) {
            case 'dangerouslySetInnerHTML':
            case 'className':
            case 'style':
                return;
            default:
                if (isStringOrNumber(value)) {
                    outputAttrs.push(escapeText(propKey) + '="' + escapeText(value) + '"');
                }
                else if (isTrue(value)) {
                    outputAttrs.push(escapeText(propKey));
                }
        }
    });
    return outputAttrs;
}

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
        Promise.resolve().then(function () {
            return this$1.renderNode(this$1.initNode, null, this$1.staticMarkup);
        }).then(function () {
            this$1.push(null);
        }).catch(function (err) {
            this$1.emit('error', err);
        });
    };
    RenderStream.prototype.renderNode = function renderNode (vNode, context, isRoot) {
        if (isInvalid(vNode)) {
            return;
        }
        else {
            var flags = vNode.flags;
            if (flags & 28 /* Component */) {
                return this.renderComponent(vNode, isRoot, context, flags & 4 /* ComponentClass */);
            }
            else if (flags & 3970 /* Element */) {
                return this.renderElement(vNode, isRoot, context);
            }
            else {
                return this.renderText(vNode, isRoot, context);
            }
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
        var childContext = instance.getChildContext();
        if (!isNullOrUndef(childContext)) {
            context = Object.assign({}, context, childContext);
        }
        instance.context = context;
        // Block setting state - we should render only once, using latest state
        instance._pendingSetState = true;
        return Promise.resolve(instance.componentWillMount()).then(function () {
            var node = instance.render();
            instance._pendingSetState = false;
            return this$1.renderNode(node, context, isRoot);
        });
    };
    RenderStream.prototype.renderChildren = function renderChildren (children, context) {
        var this$1 = this;

        if (isStringOrNumber(children)) {
            return this.push(escapeText(children));
        }
        if (!children) {
            return;
        }
        var childrenIsArray = isArray(children);
        if (!childrenIsArray && !isInvalid(children)) {
            return this.renderNode(children, context, false);
        }
        if (!childrenIsArray) {
            throw new Error('invalid component');
        }
        return children.reduce(function (p, child) {
            return p.then(function (insertComment) {
                var isText = isStringOrNumber(child);
                if (isText) {
                    if (insertComment === true) {
                        this$1.push('<!---->');
                    }
                    if (isText) {
                        this$1.push(escapeText(child));
                    }
                    return true;
                }
                else if (isArray(child)) {
                    this$1.push('<!---->');
                    return Promise.resolve(this$1.renderChildren(child)).then(function () {
                        this$1.push('<!--!-->');
                        return true;
                    });
                }
                else if (!isInvalid(child)) {
                    if (child.flags & 1 /* Text */) {
                        if (insertComment) {
                            this$1.push('<!---->');
                        }
                        insertComment = true;
                    }
                    return Promise.resolve(this$1.renderNode(child, context, false))
                        .then(function (_insertComment) {
                        if (child.flags & 1 /* Text */) {
                            return true;
                        }
                        return false;
                    });
                }
            });
        }, Promise.resolve(false));
    };
    RenderStream.prototype.renderText = function renderText (vNode, isRoot, context) {
        var this$1 = this;

        return Promise.resolve().then(function (insertComment) {
            this$1.push(vNode.children);
            return insertComment;
        });
    };
    RenderStream.prototype.renderElement = function renderElement (vElement, isRoot, context) {
        var this$1 = this;

        var tag = vElement.type;
        var props = vElement.props;
        var outputAttrs = renderAttributes(props);
        var html = '';
        if (props) {
            var className = props.className;
            if (!isNullOrUndef(className)) {
                outputAttrs.push('class="' + escapeText(className) + '"');
            }
            var style = props.style;
            if (style) {
                outputAttrs.push('style="' + renderStyleToString(style) + '"');
            }
            if (props.dangerouslySetInnerHTML) {
                html = props.dangerouslySetInnerHTML.__html;
            }
        }
        if (isRoot) {
            outputAttrs.push('data-infernoroot');
        }
        this.push(("<" + tag + (outputAttrs.length > 0 ? ' ' + outputAttrs.join(' ') : '') + ">"));
        if (isVoidElement(tag)) {
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

function renderStylesToString$1(styles) {
    if (isStringOrNumber(styles)) {
        return styles;
    }
    else {
        var renderedString = '';
        for (var styleName in styles) {
            var value = styles[styleName];
            var px = isNumber(value) && !inferno.internal_isUnitlessNumber[styleName] ? 'px' : '';
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
            // Primitive node doesn't have defaultProps, only Component
            if (!isNullOrUndef(type.defaultProps)) {
                copyPropsTo(type.defaultProps, props);
                vNode.props = props;
            }
            // Render the
            if (isClass) {
                var instance = new type(props, context);
                var childContext = instance.getChildContext();
                if (!isNullOrUndef(childContext)) {
                    context = Object.assign({}, context, childContext);
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
                                    instance.props = Object.assign({}, instance.props, dataForContext);
                                }
                                this$1.renderVNodeToQueue(instance.render(instance.props, instance.context), instance.context, true, promisePosition);
                                setTimeout(this$1.pushQueue, 0);
                                return promisePosition;
                            }), position);
                            return;
                        }
                        else {
                            instance.props = Object.assign({}, instance.props, initialProps);
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
            if (!isNull(props)) {
                for (var prop in props) {
                    var value = props[prop];
                    if (prop === 'dangerouslySetInnerHTML') {
                        html = value.__html;
                    }
                    else if (prop === 'style') {
                        renderedString += " style=\"" + (renderStylesToString$1(props.style)) + "\"";
                    }
                    else if (prop === 'className' && !isNullOrUndef(value)) {
                        renderedString += " class=\"" + (escapeText(value)) + "\"";
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
            if (isVoidElement$$1) {
                this.addToQueue(renderedString + ">", position);
                // Regular element with content
            }
            else {
                renderedString += ">";
                // Element has children, build them in
                if (!isInvalid(children)) {
                    if (isArray(children)) {
                        this.addToQueue(renderedString, position);
                        renderedString = '';
                        for (var i = 0, len = children.length; i < len; i++) {
                            var child = children[i];
                            if (isStringOrNumber(child)) {
                                this$1.addToQueue(escapeText(children), position);
                            }
                            else if (!isInvalid(child)) {
                                this$1.renderVNodeToQueue(child, context, i === 0, position);
                            }
                        }
                    }
                    else if (isStringOrNumber(children)) {
                        this.addToQueue(renderedString + escapeText(children) + '</' + type + '>', position);
                        return;
                    }
                    else {
                        this.addToQueue(renderedString, position);
                        this.renderVNodeToQueue(children, context, true, position);
                        this.addToQueue('</' + type + '>', position);
                        return;
                    }
                }
                else if (html) {
                    this.addToQueue(renderedString + html + '</' + type + '>', position);
                    return;
                }
                // Close element if it's not void
                if (!isVoidElement$$1) {
                    this.addToQueue(renderedString + '</' + type + '>', position);
                }
            }
            // Push text directly to queue
        }
        else if (flags & 1 /* Text */) {
            this.addToQueue((firstChild ? '' : '<!---->') + escapeText(children), position);
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
    return new RenderQueueStream(node, false);
}
function streamQueueAsStaticMarkup(node) {
    return new RenderQueueStream(node, true);
}

var index = {
    renderToString: renderToString,
    renderToStaticMarkup: renderToStaticMarkup,
    streamAsString: streamAsString,
    streamAsStaticMarkup: streamAsStaticMarkup,
    RenderStream: RenderStream,
    RenderQueueStream: RenderQueueStream,
    streamQueueAsString: streamQueueAsString,
    streamQueueAsStaticMarkup: streamQueueAsStaticMarkup
};

exports['default'] = index;
exports.renderToString = renderToString;
exports.renderToStaticMarkup = renderToStaticMarkup;
exports.streamAsString = streamAsString;
exports.streamAsStaticMarkup = streamAsStaticMarkup;
exports.RenderStream = RenderStream;
exports.RenderQueueStream = RenderQueueStream;
exports.streamQueueAsString = streamQueueAsString;
exports.streamQueueAsStaticMarkup = streamQueueAsStaticMarkup;

Object.defineProperty(exports, '__esModule', { value: true });

})));
