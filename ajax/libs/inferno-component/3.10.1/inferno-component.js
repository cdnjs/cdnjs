(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('inferno')) :
    typeof define === 'function' && define.amd ? define(['inferno'], factory) :
    (global.Inferno = global.Inferno || {}, global.Inferno.Component = factory(global.Inferno));
}(this, (function (inferno) { 'use strict';

    /**
     * @module Inferno-Shared
     */ /** TypeDoc Comment */
    var NO_OP = "$NO_OP";
    var ERROR_MSG = "a runtime error occured! Use Inferno in development environment to find the error.";
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
        while ((listener = listeners.shift())) {
            listener();
        }
    };

    /**
     * @module Inferno-Component
     */ /** TypeDoc Comment */
    // Make sure u use EMPTY_OBJ from 'inferno', otherwise it'll be a different reference
    var noOp = ERROR_MSG;
    {
        noOp =
            "Inferno Error: Can only update a mounted or mounting component. This usually means you called setState() or forceUpdate() on an unmounted component. This is a no-op.";
    }
    var componentCallbackQueue = new Map();
    var resolvedPromise = Promise.resolve();
    function addToQueue(component, force, callback) {
        var queue = componentCallbackQueue.get(component);
        if (queue === void 0) {
            queue = [];
            componentCallbackQueue.set(component, queue);
            resolvedPromise.then((function () {
                componentCallbackQueue.delete(component);
                component._updating = true;
                applyState(component, force, (function () {
                    for (var i = 0, len = queue.length; i < len; i++) {
                        queue[i].call(component);
                    }
                }));
                component._updating = false;
            }));
        }
        if (!isNullOrUndef(callback)) {
            queue.push(callback);
        }
    }
    function queueStateChanges(component, newState, callback) {
        if (isFunction(newState)) {
            newState = newState(component.state, component.props, component.context);
        }
        var pending = component._pendingState;
        if (isNullOrUndef(pending)) {
            component._pendingState = newState;
        }
        else {
            for (var stateKey in newState) {
                pending[stateKey] = newState[stateKey];
            }
        }
        if (!component._pendingSetState && !component._blockRender) {
            if (!component._updating) {
                component._pendingSetState = true;
                component._updating = true;
                applyState(component, false, callback);
                component._updating = false;
            }
            else {
                addToQueue(component, false, callback);
            }
        }
        else {
            component._pendingSetState = true;
            if (isFunction(callback) && component._blockRender) {
                component._lifecycle.addListener(callback.bind(component));
            }
        }
    }
    function applyState(component, force, callback) {
        if (component._unmounted) {
            return;
        }
        if (force || !component._blockRender) {
            component._pendingSetState = false;
            var pendingState = component._pendingState;
            var prevState = component.state;
            var nextState = combineFrom(prevState, pendingState);
            var props = component.props;
            var context = component.context;
            component._pendingState = null;
            var nextInput;
            var renderOutput = component._updateComponent(prevState, nextState, props, props, context, force, true);
            var didUpdate = true;
            if (isInvalid(renderOutput)) {
                nextInput = inferno.createVNode(4096 /* Void */, null);
            }
            else if (renderOutput === NO_OP) {
                nextInput = component._lastInput;
                didUpdate = false;
            }
            else if (isStringOrNumber(renderOutput)) {
                nextInput = inferno.createVNode(1 /* Text */, null, null, renderOutput);
            }
            else if (isArray(renderOutput)) {
                {
                    throwError("a valid Inferno VNode (or null) must be returned from a component render. You may have returned an array or an invalid object.");
                }
                return throwError();
            }
            else {
                nextInput = renderOutput;
            }
            var lastInput = component._lastInput;
            var vNode = component._vNode;
            var parentDom = (lastInput.dom && lastInput.dom.parentNode) ||
                (lastInput.dom = vNode.dom);
            if (nextInput.flags & 28 /* Component */) {
                nextInput.parentVNode = vNode;
            }
            component._lastInput = nextInput;
            if (didUpdate) {
                var childContext;
                if (!isNullOrUndef(component.getChildContext)) {
                    childContext = component.getChildContext();
                }
                if (isNullOrUndef(childContext)) {
                    childContext = component._childContext;
                }
                else {
                    childContext = combineFrom(context, childContext);
                }
                var lifeCycle = component._lifecycle;
                inferno.internal_patch(lastInput, nextInput, parentDom, lifeCycle, childContext, component._isSVG, false);
                // If this component was unmounted by its parent, do nothing. This is no-op
                if (component._unmounted) {
                    return;
                }
                lifeCycle.trigger();
                if (!isNullOrUndef(component.componentDidUpdate)) {
                    component.componentDidUpdate(props, prevState, context);
                }
                if (!isNull(inferno.options.afterUpdate)) {
                    inferno.options.afterUpdate(vNode);
                }
            }
            var dom = (vNode.dom = nextInput.dom);
            if (inferno.options.findDOMNodeEnabled) {
                inferno.internal_DOMNodeMap.set(component, nextInput.dom);
            }
            while (!isNullOrUndef((vNode = vNode.parentVNode))) {
                if ((vNode.flags & 28 /* Component */) > 0) {
                    vNode.dom = dom;
                }
            }
        }
        else {
            component.state = component._pendingState;
            component._pendingState = null;
        }
        if (isFunction(callback)) {
            callback.call(component);
        }
    }
    var Component = function Component(props, context) {
        this.state = null;
        this._blockRender = false;
        this._blockSetState = true;
        this._pendingSetState = false;
        this._pendingState = null;
        this._lastInput = null;
        this._vNode = null;
        this._unmounted = false;
        this._lifecycle = null;
        this._childContext = null;
        this._isSVG = false;
        this._updating = true;
        /** @type {object} */
        this.props = props || inferno.EMPTY_OBJ;
        /** @type {object} */
        this.context = context || inferno.EMPTY_OBJ; // context should not be mutable
    };
    Component.prototype.forceUpdate = function forceUpdate (callback) {
        if (this._unmounted) {
            return;
        }
        applyState(this, true, callback);
    };
    Component.prototype.setState = function setState (newState, callback) {
        if (this._unmounted) {
            return;
        }
        if (!this._blockSetState) {
            queueStateChanges(this, newState, callback);
        }
        else {
            {
                throwError("cannot update state via setState() in componentWillUpdate() or constructor.");
            }
            throwError();
        }
    };
    Component.prototype._updateComponent = function _updateComponent (prevState, nextState, prevProps, nextProps, context, force, fromSetState) {
        if (this._unmounted === true) {
            {
                throwError(noOp);
            }
            throwError();
        }
        if (prevProps !== nextProps ||
            nextProps === inferno.EMPTY_OBJ ||
            prevState !== nextState ||
            force) {
            if (prevProps !== nextProps || nextProps === inferno.EMPTY_OBJ) {
                if (!isNullOrUndef(this.componentWillReceiveProps) && !fromSetState) {
                    this._blockRender = true;
                    this.componentWillReceiveProps(nextProps, context);
                    // If this component was removed during its own update do nothing...
                    if (this._unmounted) {
                        return NO_OP;
                    }
                    this._blockRender = false;
                }
                if (this._pendingSetState) {
                    nextState = combineFrom(nextState, this._pendingState);
                    this._pendingSetState = false;
                    this._pendingState = null;
                }
            }
            /* Update if scu is not defined, or it returns truthy value or force */
            if (force ||
                isNullOrUndef(this.shouldComponentUpdate) ||
                (this.shouldComponentUpdate &&
                    this.shouldComponentUpdate(nextProps, nextState, context))) {
                if (!isNullOrUndef(this.componentWillUpdate)) {
                    this._blockSetState = true;
                    this.componentWillUpdate(nextProps, nextState, context);
                    this._blockSetState = false;
                }
                this.props = nextProps;
                this.state = nextState;
                this.context = context;
                if (inferno.options.beforeRender) {
                    inferno.options.beforeRender(this);
                }
                var render = this.render(nextProps, nextState, context);
                if (inferno.options.afterRender) {
                    inferno.options.afterRender(this);
                }
                return render;
            }
            else {
                this.props = nextProps;
                this.state = nextState;
                this.context = context;
            }
        }
        return NO_OP;
    };
    // tslint:disable-next-line:no-empty
    Component.prototype.render = function render (nextProps, nextState, nextContext) { };

    return Component;

})));
