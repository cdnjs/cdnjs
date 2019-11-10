(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('inferno')) :
    typeof define === 'function' && define.amd ? define(['inferno'], factory) :
    (global.Inferno = global.Inferno || {}, global.Inferno.Component = factory(global.Inferno));
}(this, (function (inferno) { 'use strict';

    /**
     * @module Inferno-Shared
     */ /** TypeDoc Comment */
    /**
     * @module Inferno-Shared
     */ /** TypeDoc Comment */ var NO_OP = '$NO_OP';
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
     * @module Inferno-Component
     */ /** TypeDoc Comment */
    // Make sure u use EMPTY_OBJ from 'inferno', otherwise it'll be a different reference
    var C = inferno.options.component;
    /* Add ES6 component implementations for Inferno-core to use */
    C.create = createInstance;
    C.patch = patchComponent;
    C.flush = flushQueue;
    var G = (window || global);
    var handleInput = C.handleInput;
    var noOp = ERROR_MSG;
    {
        noOp =
            "Inferno Error: Can only update a mounted or mounting component. This usually means you called setState() or forceUpdate() on an unmounted component. This is a no-op.";
    }
    function queueStateChanges(component, newState, callback) {
        if (isFunction(newState)) {
            newState = newState(component.state, component.props, component.context);
        }
        var pending = component._pendingState;
        if (isNullOrUndef(pending)) {
            component._pendingState = pending = newState;
        }
        else {
            for (var stateKey in newState) {
                pending[stateKey] = newState[stateKey];
            }
        }
        if (isBrowser && !component._pendingSetState && !component._blockRender) {
            queueStateChange(component, false, callback);
        }
        else {
            var state = component.state;
            if (state === null) {
                component.state = pending;
            }
            else {
                for (var key in pending) {
                    state[key] = pending[key];
                }
            }
            component._pendingState = null;
            if (component._blockRender && isFunction(callback)) {
                component._lifecycle.addListener(callback.bind(component));
            }
        }
    }
    function createInstance(parentFiber, vNode, Component, props, context, isSVG, lifecycle) {
        var instance = new Component(props, context);
        // vNode.children = instance as any;
        parentFiber.c = instance;
        instance._blockSetState = false;
        instance.context = context;
        if (instance.props === inferno.EMPTY_OBJ) {
            instance.props = props;
        }
        // setState callbacks must fire after render is done when called from componentWillReceiveProps or componentWillMount
        instance._lifecycle = lifecycle;
        instance._pendingSetState = true;
        instance._isSVG = isSVG;
        if (isFunction(instance.componentWillMount)) {
            instance._blockRender = true;
            instance.componentWillMount();
            instance._blockRender = false;
        }
        var childContext;
        if (isFunction(instance.getChildContext)) {
            childContext = instance.getChildContext();
        }
        if (isNullOrUndef(childContext)) {
            instance._childContext = context;
        }
        else {
            instance._childContext = combineFrom(context, childContext);
        }
        if (isFunction(inferno.options.beforeRender)) {
            inferno.options.beforeRender(instance);
        }
        var renderOutput = instance.render(props, instance.state, context);
        if (isFunction(inferno.options.afterRender)) {
            inferno.options.afterRender(instance);
        }
        instance._pendingSetState = false;
        instance._fiber = parentFiber;
        parentFiber.children = new inferno.Fiber(handleInput(renderOutput), "0");
        return instance;
    }
    function updateComponent(component, prevState, nextState, prevProps, nextProps, context, force, fromSetState) {
        if (component._unmounted === true) {
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
                if (!fromSetState && isFunction(component.componentWillReceiveProps)) {
                    // keep a copy of state before componentWillReceiveProps
                    var beforeState = combineFrom(component.state);
                    component._blockRender = true;
                    component.componentWillReceiveProps(nextProps, context);
                    component._blockRender = false;
                    var afterState = component.state;
                    if (beforeState !== afterState) {
                        // if state changed in componentWillReceiveProps, reassign the beforeState
                        component.state = beforeState;
                        // set the afterState as pending state so the change gets picked up below
                        component._pendingSetState = true;
                        component._pendingState = afterState;
                    }
                }
                if (component._pendingSetState) {
                    nextState = combineFrom(nextState, component._pendingState);
                    component._pendingSetState = false;
                    component._pendingState = null;
                }
            }
            /* Update if scu is not defined, or it returns truthy value or force */
            // When force is true we should not call scu
            var hasSCU = isFunction(component.shouldComponentUpdate);
            if (force ||
                !hasSCU ||
                (hasSCU &&
                    component.shouldComponentUpdate(nextProps, nextState, context) !== false)) {
                if (isFunction(component.componentWillUpdate)) {
                    component._blockSetState = true;
                    component.componentWillUpdate(nextProps, nextState, context);
                    component._blockSetState = false;
                }
                component.props = nextProps;
                component.state = nextState;
                component.context = context;
                if (isFunction(inferno.options.beforeRender)) {
                    inferno.options.beforeRender(component);
                }
                var render = component.render(nextProps, nextState, context);
                if (isFunction(inferno.options.afterRender)) {
                    inferno.options.afterRender(component);
                }
                return render;
            }
            else {
                component.props = nextProps;
                component.state = nextState;
                component.context = context;
            }
        }
        return NO_OP;
    }
    function patchComponent(fiber, nextVNode, parentDom, lifecycle, context, isSVG, isRecycling) {
        var instance = fiber.c;
        instance._fiber = fiber;
        instance._updating = true;
        if (instance._unmounted) {
            return true;
        }
        else {
            fiber.dom = handleUpdate(instance, instance.state, nextVNode.props || inferno.EMPTY_OBJ, context, false, false, isRecycling, isSVG, lifecycle, parentDom);
            // nextVNode.children = instance;
        }
        instance._updating = false;
        return false;
    }
    // const resolvedPromise = Promise.resolve();
    var componentFlushQueue = [];
    // // when a components root IVNode is also a component, we can run into issues
    // // this will recursively look for input.parentNode if the IVNode is a component
    // function updateParentComponentVNodes(vNode: IVNode, dom: Element) {
    // 	if (vNode.flags & VNodeFlags.Component) {
    // 		const parentVNode = vNode.parentVNode;
    //
    // 		if (parentVNode) {
    // 			parentVNode.dom = dom;
    // 			updateParentComponentVNodes(parentVNode, dom);
    // 		}
    // 	}
    // }
    function handleUpdate(component, nextState, nextProps, context, force, fromSetState, isRecycling, isSVG, lifeCycle, parentDom) {
        // let nextInput;
        var hasComponentDidUpdateIsFunction = isFunction(component.componentDidUpdate);
        // When component has componentDidUpdate hook, we need to clone lastState or will be modified by reference during update
        var prevState = hasComponentDidUpdateIsFunction
            ? combineFrom(nextState, null)
            : component.state;
        // const lastInput = component._lastInput as IVNode;
        var prevProps = component.props;
        var renderOutput = updateComponent(component, prevState, nextState, prevProps, nextProps, context, force, fromSetState);
        // const vNode = component._vNode;
        var componentRootFiber = component._fiber.children;
        if (renderOutput !== NO_OP) {
            var nextInput = handleInput(renderOutput);
            var childContext;
            if (isFunction(component.getChildContext)) {
                childContext = component.getChildContext();
            }
            if (isNullOrUndef(childContext)) {
                childContext = component._childContext;
            }
            else {
                childContext = combineFrom(context, childContext);
            }
            // if (nextInput.flags & VNodeFlags.Component) {
            // 	nextInput.parentVNode = vNode;
            // } else if (lastInput.flags & VNodeFlags.Component) {
            // 	lastInput.parentVNode = vNode;
            // }
            // lastVNode: nextVNode: parentDom, lifecycle, context, isSVG, isRecycling
            if (!isInvalid(nextInput)) {
                if (isInvalid(componentRootFiber.input)) {
                    // fiber, input, parentDom, lifecycle, context, isSVG
                    inferno.mount(componentRootFiber, nextInput, parentDom, lifeCycle, childContext, isSVG);
                }
                else {
                    inferno.internal_patch(componentRootFiber, nextInput, parentDom, lifeCycle, childContext, isSVG, isRecycling);
                }
            }
            componentRootFiber.input = nextInput;
            if (fromSetState) {
                lifeCycle.trigger();
            }
            if (hasComponentDidUpdateIsFunction) {
                component.componentDidUpdate(prevProps, prevState, context);
            }
            if (isFunction(inferno.options.afterUpdate)) {
                // options.afterUpdate(vNode);
            }
            if (inferno.options.findDOMNodeEnabled) {
                // internal_DOMNodeMap.set(component, nextInput.dom);
            }
        }
        else {
            // nextInput = lastInput;
        }
        // componentRootFiber.input = nextInput;
        // if (nextInput.flags & VNodeFlags.Component) {
        // 	nextInput.parentVNode = vNode;
        // } else if (lastInput.flags & VNodeFlags.Component) {
        // 	lastInput.parentVNode = vNode;
        // }
        // component._lastInput = nextInput as IVNode;
        // const dom = vNode.dom = (nextInput as IVNode).dom as Element;
        var dom = component._fiber.dom;
        if (inferno.options.findDOMNodeEnabled) {
            inferno.internal_DOMNodeMap.set(component, dom);
        }
        return dom;
    }
    function applyState(component, force) {
        if (component._unmounted) {
            return;
        }
        if (force || !component._blockRender) {
            var pendingState = component._pendingState;
            component._pendingSetState = false;
            component._pendingState = null;
            var fiber = component._fiber;
            handleUpdate(component, combineFrom(component.state, pendingState), component.props, component.context, force, true, false, component._isSVG, component._lifecycle, fiber.dom);
        }
        else {
            component.state = component._pendingState;
            component._pendingState = null;
        }
    }
    // let globalFlushPending = false;
    function flushQueue() {
        var length = componentFlushQueue.length;
        if (length > 0) {
            for (var i = 0; i < length; i++) {
                var component = componentFlushQueue[i];
                applyState(component, false);
                var callbacks = component.__FCB;
                if (callbacks !== null) {
                    for (var j = 0, len = callbacks.length; j < len; j++) {
                        callbacks[i].call(component);
                    }
                    component.__FCB = null;
                }
                component.__FP = false; // Flush no longer pending for this component
            }
            componentFlushQueue = [];
        }
    }
    function queueStateChange(component, force, callback) {
        if (G.INFRender) {
            // When more setStates stack up, we queue them
            if (!component.__FP) {
                component.__FP = true;
                componentFlushQueue.push(component);
            }
            if (isFunction(callback)) {
                var callbacks = component.__FCB;
                if (callbacks === null) {
                    component.__FCB = [callback];
                }
                else {
                    callbacks.push(callback);
                }
            }
        }
        else {
            // Main setState loop
            G.INFRender = true;
            applyState(component, force);
            flushQueue();
            G.INFRender = false;
            if (isFunction(callback)) {
                callback.call(component);
            }
        }
    }
    var Component = function Component(props, context) {
        this.state = null;
        this._blockRender = false;
        this._blockSetState = true;
        this._pendingSetState = false;
        this._pendingState = null;
        this._unmounted = false;
        this._childContext = null;
        this._isSVG = false;
        this._updating = true;
        this.__FP = false; // Flush Pending
        this.__FCB = null; // Flush callbacks for this component
        /** @type {object} */
        this.props = props || inferno.EMPTY_OBJ;
        /** @type {object} */
        this.context = context || inferno.EMPTY_OBJ; // context should not be mutable
    };
    Component.prototype.forceUpdate = function forceUpdate (callback) {
        if (this._unmounted || this._updating || !isBrowser) {
            return;
        }
        queueStateChange(this, true, callback);
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
    // tslint:disable-next-line:no-empty
    Component.prototype.render = function render (nextProps, nextState, nextContext) { };

    return Component;

})));
