(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('inferno'), require('inferno-create-element')) :
    typeof define === 'function' && define.amd ? define(['exports', 'inferno', 'inferno-create-element'], factory) :
    (factory((global.Inferno = global.Inferno || {}, global.Inferno.TestUtils = global.Inferno.TestUtils || {}),global.Inferno,global.Inferno.createElement));
}(this, (function (exports,inferno,createElement) { 'use strict';

    createElement = createElement && 'default' in createElement ? createElement['default'] : createElement;

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
                var render$$1 = component.render(nextProps, nextState, context);
                if (isFunction(inferno.options.afterRender)) {
                    inferno.options.afterRender(component);
                }
                return render$$1;
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
    Component.prototype.render = function render$$1 (nextProps, nextState, nextContext) { };

    /**
     * @module Inferno-Shared
     */ /** TypeDoc Comment */
    /**
     * @module Inferno-Shared
     */ /** TypeDoc Comment */ var ERROR_MSG$1 = 'a runtime error occured! Use Inferno in development environment to find the error.';
    // this is MUCH faster than .constructor === Array and instanceof Array
    // in Node 7 and the later versions of V8, slower in older versions though
    var isArray = Array.isArray;
    function isFunction$1(o) {
        return typeof o === 'function';
    }
    function isString(o) {
        return typeof o === 'string';
    }
    function isNumber(o) {
        return typeof o === 'number';
    }
    function isNull$1(o) {
        return o === null;
    }
    function isObject(o) {
        return typeof o === 'object';
    }
    function throwError$1(message) {
        if (!message) {
            message = ERROR_MSG$1;
        }
        throw new Error(("Inferno Error: " + message));
    }

    // Jest Snapshot Utilities
    // Jest formats it's snapshots prettily because it knows how to play with the React test renderer.
    // Symbols and algorithm have been reversed from the following file:
    // https://github.com/facebook/react/blob/v15.4.2/src/renderers/testing/ReactTestRenderer.js#L98
    function createSnapshotObject(object) {
        Object.defineProperty(object, '$$typeof', {
            value: Symbol.for('react.test.json')
        });
        return object;
    }
    function vNodeToSnapshot(node) {
        var object;
        var children = [];
        if (isDOMVNode(node)) {
            var props = Object.assign({}, node.props);
            // Remove undefined props
            Object.keys(props).forEach((function (propKey) {
                if (props[propKey] === undefined) {
                    delete props[propKey];
                }
            }));
            // Create the actual object that Jest will interpret as the snapshot for this VNode
            object = createSnapshotObject({
                props: props,
                type: getTagNameOfVNode(node)
            });
        }
        if (isArray(node.children)) {
            node.children.forEach((function (child) {
                var asJSON = vNodeToSnapshot(child);
                if (asJSON) {
                    children.push(asJSON);
                }
            }));
        }
        else if (isString(node.children)) {
            children.push(node.children);
        }
        else if (isObject(node.children) && !isNull$1(node.children)) {
            var asJSON = vNodeToSnapshot(node.children);
            if (asJSON) {
                children.push(asJSON);
            }
        }
        if (object) {
            object.children = children.length ? children : null;
            return object;
        }
        if (children.length > 1) {
            return children;
        }
        else if (children.length === 1) {
            return children[0];
        }
        return object;
    }
    function renderToSnapshot(input) {
        var vnode = renderIntoDocument(input);
        if (!isNull$1(vnode.props)) {
            var snapshot = vNodeToSnapshot(vnode.props.children);
            delete snapshot.props.children;
            return snapshot;
        }
        return undefined;
    }

    // Type Checkers
    function isVNode(instance) {
        return Boolean(instance) && isObject(instance) &&
            isNumber(instance.flags) && instance.flags > 0;
    }
    function isVNodeOfType(instance, type) {
        return isVNode(instance) && instance.type === type;
    }
    function isDOMVNode(inst) {
        return !isComponentVNode(inst);
    }
    function isDOMVNodeOfType(instance, type) {
        return isDOMVNode(instance) && instance.type === type;
    }
    function isFunctionalVNode(instance) {
        return isVNode(instance) && Boolean(instance.flags & 4 /* ComponentFunction */);
    }
    function isFunctionalVNodeOfType(instance, type) {
        return isFunctionalVNode(instance) && instance.type === type;
    }
    function isClassVNode(instance) {
        return isVNode(instance) && Boolean(instance.flags & 2 /* ComponentClass */);
    }
    function isClassVNodeOfType(instance, type) {
        return isClassVNode(instance) && instance.type === type;
    }
    function isComponentVNode(inst) {
        return isFunctionalVNode(inst) || isClassVNode(inst);
    }
    function isComponentVNodeOfType(inst, type) {
        return (isFunctionalVNode(inst) || isClassVNode(inst)) && inst.type === type;
    }
    function isDOMElement(instance) {
        return Boolean(instance) && isObject(instance) &&
            instance.nodeType === 1 && isString(instance.tagName);
    }
    function isDOMElementOfType(instance, type) {
        return isDOMElement(instance) && isString(type) &&
            instance.tagName.toLowerCase() === type.toLowerCase();
    }
    function isRenderedClassComponent(instance) {
        return Boolean(instance) && isObject(instance) && isVNode(instance._vNode) &&
            isFunction$1(instance.render) && isFunction$1(instance.setState);
    }
    function isRenderedClassComponentOfType(instance, type) {
        return isRenderedClassComponent(instance) &&
            isFunction$1(type) && instance._vNode.type === type;
    }
    // Render Utilities
    var Wrapper = (function (Component$$1) {
        function Wrapper () {
            Component$$1.apply(this, arguments);
        }

        if ( Component$$1 ) Wrapper.__proto__ = Component$$1;
        Wrapper.prototype = Object.create( Component$$1 && Component$$1.prototype );
        Wrapper.prototype.constructor = Wrapper;

        Wrapper.prototype.render = function render$$1 () {
            return this.props.children;
        };

        return Wrapper;
    }(Component));
    function renderIntoDocument(input) {
        var wrappedInput = createElement(Wrapper, null, input);
        var parent = document.createElement('div');
        document.body.appendChild(parent);
        return inferno.render(wrappedInput, parent);
    }
    // Recursive Finder Functions
    function findAllInRenderedTree(renderedTree, predicate) {
        if (isRenderedClassComponent(renderedTree)) {
            return findAllInVNodeTree(renderedTree._lastInput, predicate);
        }
        else {
            throwError$1('findAllInRenderedTree(renderedTree, predicate) renderedTree must be a rendered class component');
        }
    }
    function findAllInVNodeTree(vNodeTree, predicate) {
        if (isVNode(vNodeTree)) {
            var result = predicate(vNodeTree) ? [vNodeTree] : [];
            var children = vNodeTree.children;
            if (isRenderedClassComponent(children)) {
                result = result.concat(findAllInVNodeTree(children._lastInput, predicate));
            }
            else if (isVNode(children)) {
                result = result.concat(findAllInVNodeTree(children, predicate));
            }
            else if (isArray(children)) {
                children.forEach((function (child) {
                    result = result.concat(findAllInVNodeTree(child, predicate));
                }));
            }
            return result;
        }
        else {
            throwError$1('findAllInVNodeTree(vNodeTree, predicate) vNodeTree must be a VNode instance');
        }
    }
    // Finder Helpers
    // function parseSelector(filter) {
    // 	if (isArray(filter)) {
    // 		return filter;
    // 	} else if (isString(filter)) {
    // 		return filter.trim().split(/\s+/);
    // 	} else {
    // 		return [];
    // 	}
    // }
    function findOneOf(tree, filter, name, finder) {
        var all = finder(tree, filter);
        if (all.length > 1) {
            throwError$1(("Did not find exactly one match (found " + (all.length) + ") for " + name + ": " + filter));
        }
        else {
            return all[0];
        }
    }
    // Scry Utilities
    // export function scryRenderedDOMElementsWithClass(renderedTree: any, classNames: string | string[]): Element[] {
    //   // TODO: How to do this with Fibers?
    // 	// return findAllInRenderedTree(renderedTree, (instance) => {
    // 	// 	if (isDOMVNode(instance)) {
    // 	// 		let domClassName = (instance.dom as Element).className;
    // 	// 		if (
    // 	// 			!isString(domClassName) &&
    // 	// 			!isNullOrUndef(instance.dom) &&
    // 	// 			isFunction(instance.dom.getAttribute)
    // 	// 		) { // SVG || null, probably
    // 	// 			domClassName = (instance.dom as Element).getAttribute('class') || '';
    // 	// 		}
    // 	// 		const domClassList = parseSelector(domClassName);
    // 	// 		return parseSelector(classNames).every((className) => {
    // 	// 			return domClassList.indexOf(className) !== -1;
    // 	// 		});
    // 	// 	}
    // 	// 	return false;
    // 	// }).map((instance) => instance.dom);
    // }
    function scryRenderedDOMElementsWithClass() {
    }
    function scryRenderedDOMElementsWithTag(renderedTree, tagName) {
        return findAllInRenderedTree(renderedTree, (function (instance) {
            return isDOMVNodeOfType(instance, tagName);
        })).map((function (instance) { return instance.dom; }));
    }
    function scryRenderedVNodesWithType(renderedTree, type) {
        return findAllInRenderedTree(renderedTree, (function (instance) { return isVNodeOfType(instance, type); }));
    }
    function scryVNodesWithType(vNodeTree, type) {
        return findAllInVNodeTree(vNodeTree, (function (instance) { return isVNodeOfType(instance, type); }));
    }
    // Find Utilities
    function findRenderedDOMElementWithClass(renderedTree, classNames) {
        return findOneOf(renderedTree, classNames, 'class', scryRenderedDOMElementsWithClass);
    }
    function findRenderedDOMElementWithTag(renderedTree, tagName) {
        return findOneOf(renderedTree, tagName, 'tag', scryRenderedDOMElementsWithTag);
    }
    function findRenderedVNodeWithType(renderedTree, type) {
        return findOneOf(renderedTree, type, 'component', scryRenderedVNodesWithType);
    }
    function findVNodeWithType(vNodeTree, type) {
        return findOneOf(vNodeTree, type, 'VNode', scryVNodesWithType);
    }
    function getTagNameOfVNode(inst) {
        return (inst && inst.dom && inst.dom.tagName.toLowerCase()) ||
            (inst && inst._vNode && inst._vNode.dom && inst._vNode.dom.tagName.toLowerCase()) ||
            undefined;
    }
    var index = {
        findAllInRenderedTree: findAllInRenderedTree,
        findAllInVNodeTree: findAllInVNodeTree,
        findRenderedDOMElementWithClass: findRenderedDOMElementWithClass,
        findRenderedDOMElementWithTag: findRenderedDOMElementWithTag,
        findRenderedVNodeWithType: findRenderedVNodeWithType,
        findVNodeWithType: findVNodeWithType,
        getTagNameOfVNode: getTagNameOfVNode,
        isClassVNode: isClassVNode,
        isClassVNodeOfType: isClassVNodeOfType,
        isComponentVNode: isComponentVNode,
        isComponentVNodeOfType: isComponentVNodeOfType,
        isDOMElement: isDOMElement,
        isDOMElementOfType: isDOMElementOfType,
        isDOMVNode: isDOMVNode,
        isDOMVNodeOfType: isDOMVNodeOfType,
        isFunctionalVNode: isFunctionalVNode,
        isFunctionalVNodeOfType: isFunctionalVNodeOfType,
        isRenderedClassComponent: isRenderedClassComponent,
        isRenderedClassComponentOfType: isRenderedClassComponentOfType,
        isVNode: isVNode,
        isVNodeOfType: isVNodeOfType,
        renderIntoDocument: renderIntoDocument,
        renderToSnapshot: renderToSnapshot,
        scryRenderedDOMElementsWithClass: scryRenderedDOMElementsWithClass,
        scryRenderedDOMElementsWithTag: scryRenderedDOMElementsWithTag,
        scryRenderedVNodesWithType: scryRenderedVNodesWithType,
        scryVNodesWithType: scryVNodesWithType,
        vNodeToSnapshot: vNodeToSnapshot
    };

    exports.isVNode = isVNode;
    exports.isVNodeOfType = isVNodeOfType;
    exports.isDOMVNode = isDOMVNode;
    exports.isDOMVNodeOfType = isDOMVNodeOfType;
    exports.isFunctionalVNode = isFunctionalVNode;
    exports.isFunctionalVNodeOfType = isFunctionalVNodeOfType;
    exports.isClassVNode = isClassVNode;
    exports.isClassVNodeOfType = isClassVNodeOfType;
    exports.isComponentVNode = isComponentVNode;
    exports.isComponentVNodeOfType = isComponentVNodeOfType;
    exports.isDOMElement = isDOMElement;
    exports.isDOMElementOfType = isDOMElementOfType;
    exports.isRenderedClassComponent = isRenderedClassComponent;
    exports.isRenderedClassComponentOfType = isRenderedClassComponentOfType;
    exports.renderIntoDocument = renderIntoDocument;
    exports.findAllInRenderedTree = findAllInRenderedTree;
    exports.findAllInVNodeTree = findAllInVNodeTree;
    exports.scryRenderedDOMElementsWithClass = scryRenderedDOMElementsWithClass;
    exports.scryRenderedDOMElementsWithTag = scryRenderedDOMElementsWithTag;
    exports.scryRenderedVNodesWithType = scryRenderedVNodesWithType;
    exports.scryVNodesWithType = scryVNodesWithType;
    exports.findRenderedDOMElementWithClass = findRenderedDOMElementWithClass;
    exports.findRenderedDOMElementWithTag = findRenderedDOMElementWithTag;
    exports.findRenderedVNodeWithType = findRenderedVNodeWithType;
    exports.findVNodeWithType = findVNodeWithType;
    exports.getTagNameOfVNode = getTagNameOfVNode;
    exports['default'] = index;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
