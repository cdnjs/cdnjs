(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('inferno'), require('inferno-create-element')) :
    typeof define === 'function' && define.amd ? define(['exports', 'inferno', 'inferno-create-element'], factory) :
    (factory((global.Inferno = global.Inferno || {}, global.Inferno.TestUtils = {}),global.Inferno,global.Inferno.createElement));
}(this, (function (exports,inferno,createElement) { 'use strict';

    createElement = createElement && createElement.hasOwnProperty('default') ? createElement['default'] : createElement;

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
    // when a components root VNode is also a component, we can run into issues
    // this will recursively look for vNode.parentNode if the VNode is a component
    function updateParentComponentVNodes(vNode, dom) {
        if (vNode.flags & 28 /* Component */) {
            var parentVNode = vNode.parentVNode;
            if (parentVNode) {
                parentVNode.dom = dom;
                updateParentComponentVNodes(parentVNode, dom);
            }
        }
    }
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
            component._pendingState = pending = newState;
        }
        else {
            for (var stateKey in newState) {
                pending[stateKey] = newState[stateKey];
            }
        }
        if (isBrowser && !component._pendingSetState && !component._blockRender) {
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
            if (!isNullOrUndef(callback) && component._blockRender) {
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
            var nextInput = component._updateComponent(prevState, nextState, props, props, context, force, true);
            var didUpdate = true;
            if (isInvalid(nextInput)) {
                nextInput = inferno.createVNode(4096 /* Void */, null);
            }
            else if (nextInput === NO_OP) {
                nextInput = component._lastInput;
                didUpdate = false;
            }
            else if (isStringOrNumber(nextInput)) {
                nextInput = inferno.createVNode(1 /* Text */, null, null, nextInput);
            }
            else if (isArray(nextInput)) {
                {
                    throwError("a valid Inferno VNode (or null) must be returned from a component render. You may have returned an array or an invalid object.");
                }
                throwError();
            }
            var lastInput = component._lastInput;
            var vNode = component._vNode;
            var parentDom = (lastInput.dom && lastInput.dom.parentNode) ||
                (lastInput.dom = vNode.dom);
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
            updateParentComponentVNodes(vNode, dom);
        }
        else {
            component.state = component._pendingState;
            component._pendingState = null;
        }
        if (!isNullOrUndef(callback)) {
            callback.call(component);
        }
    }
    var alreadyWarned = false;
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
        if (this._unmounted || !isBrowser) {
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
    Component.prototype.setStateSync = function setStateSync (newState) {
        {
            if (!alreadyWarned) {
                alreadyWarned = true;
                // tslint:disable-next-line:no-console
                console.warn("Inferno WARNING: setStateSync has been deprecated and will be removed in next release. Use setState instead.");
            }
        }
        this.setState(newState);
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
                    // keep a copy of state before componentWillReceiveProps
                    var beforeState = combineFrom(this.state);
                    this._blockRender = true;
                    this.componentWillReceiveProps(nextProps, context);
                    this._blockRender = false;
                    var afterState = this.state;
                    if (beforeState !== afterState) {
                        // if state changed in componentWillReceiveProps, reassign the beforeState
                        this.state = beforeState;
                        // set the afterState as pending state so the change gets picked up below
                        this._pendingSetState = true;
                        this._pendingState = afterState;
                    }
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
                var render$$1 = this.render(nextProps, nextState, context);
                if (inferno.options.afterRender) {
                    inferno.options.afterRender(this);
                }
                return render$$1;
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
    Component.prototype.render = function render$$1 (nextProps, nextState, nextContext) { };

    /**
     * @module Inferno-Shared
     */ /** TypeDoc Comment */
    var ERROR_MSG$1 = "a runtime error occured! Use Inferno in development environment to find the error.";
    // this is MUCH faster than .constructor === Array and instanceof Array
    // in Node 7 and the later versions of V8, slower in older versions though
    var isArray$1 = Array.isArray;
    function isNullOrUndef$1(o) {
        return isUndefined$1(o) || isNull$1(o);
    }
    function isFunction$1(o) {
        return typeof o === "function";
    }
    function isString(o) {
        return typeof o === "string";
    }
    function isNumber(o) {
        return typeof o === "number";
    }
    function isNull$1(o) {
        return o === null;
    }
    function isUndefined$1(o) {
        return o === void 0;
    }
    function isObject(o) {
        return typeof o === "object";
    }
    function throwError$1(message) {
        if (!message) {
            message = ERROR_MSG$1;
        }
        throw new Error(("Inferno Error: " + message));
    }

    /**
     * @module Inferno-Test-Utils
     */ /** TypeDoc Comment */
    // Jest Snapshot Utilities
    // Jest formats it's snapshots prettily because it knows how to play with the React test renderer.
    // Symbols and algorithm have been reversed from the following file:
    // https://github.com/facebook/react/blob/v15.4.2/src/renderers/testing/ReactTestRenderer.js#L98
    function createSnapshotObject(object) {
        Object.defineProperty(object, "$$typeof", {
            value: Symbol.for("react.test.json")
        });
        return object;
    }
    function vNodeToSnapshot(node) {
        var object;
        var children = [];
        if (isDOMVNode(node)) {
            var props = Object.assign({ className: node.className || undefined }, node.props);
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
        if (isArray$1(node.children)) {
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
        var wrapper = renderIntoDocument(input);
        var vnode = wrapper.props.children;
        if (!isNull$1(wrapper.props)) {
            var snapshot = vNodeToSnapshot(vnode.children);
            delete snapshot.props.children;
            return snapshot;
        }
        return undefined;
    }

    /**
     * @module Inferno-Test-Utils
     */ /** TypeDoc Comment */
    // Type Checkers
    function isVNode(instance) {
        return (Boolean(instance) &&
            isObject(instance) &&
            isNumber(instance.flags) &&
            instance.flags > 0);
    }
    function isVNodeOfType(instance, type) {
        return isVNode(instance) && instance.type === type;
    }
    function isDOMVNode(inst) {
        return !isComponentVNode(inst) && !isTextVNode(inst);
    }
    function isDOMVNodeOfType(instance, type) {
        return isDOMVNode(instance) && instance.type === type;
    }
    function isFunctionalVNode(instance) {
        return (isVNode(instance) && Boolean(instance.flags & 8 /* ComponentFunction */));
    }
    function isFunctionalVNodeOfType(instance, type) {
        return isFunctionalVNode(instance) && instance.type === type;
    }
    function isClassVNode(instance) {
        return (isVNode(instance) && Boolean(instance.flags & 4 /* ComponentClass */));
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
    function isTextVNode(inst) {
        return inst.flags === 1 /* Text */;
    }
    function isDOMElement(instance) {
        return (Boolean(instance) &&
            isObject(instance) &&
            instance.nodeType === 1 &&
            isString(instance.tagName));
    }
    function isDOMElementOfType(instance, type) {
        return (isDOMElement(instance) &&
            isString(type) &&
            instance.tagName.toLowerCase() === type.toLowerCase());
    }
    function isRenderedClassComponent(instance) {
        return (Boolean(instance) &&
            isObject(instance) &&
            isVNode(instance._vNode) &&
            isFunction$1(instance.render) &&
            isFunction$1(instance.setState));
    }
    function isRenderedClassComponentOfType(instance, type) {
        return (isRenderedClassComponent(instance) &&
            isFunction$1(type) &&
            instance._vNode.type === type);
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
        Wrapper.prototype.repaint = function repaint () {
            var this$1 = this;

            return new Promise(function (resolve) { return this$1.setState({}, resolve); });
        };

        return Wrapper;
    }(Component));
    function renderIntoDocument(input) {
        var wrappedInput = createElement(Wrapper, null, input);
        var parent = document.createElement("div");
        document.body.appendChild(parent);
        return inferno.render(wrappedInput, parent);
    }
    // Recursive Finder Functions
    function findAllInRenderedTree(renderedTree, predicate) {
        if (isRenderedClassComponent(renderedTree)) {
            return findAllInVNodeTree(renderedTree._lastInput, predicate);
        }
        else {
            throwError$1("findAllInRenderedTree(renderedTree, predicate) renderedTree must be a rendered class component");
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
            else if (isArray$1(children)) {
                children.forEach((function (child) {
                    result = result.concat(findAllInVNodeTree(child, predicate));
                }));
            }
            return result;
        }
        else {
            throwError$1("findAllInVNodeTree(vNodeTree, predicate) vNodeTree must be a VNode instance");
        }
    }
    // Finder Helpers
    function parseSelector(filter) {
        if (isArray$1(filter)) {
            return filter;
        }
        else if (isString(filter)) {
            return filter.trim().split(/\s+/);
        }
        else {
            return [];
        }
    }
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
    function scryRenderedDOMElementsWithClass(renderedTree, classNames) {
        return findAllInRenderedTree(renderedTree, (function (instance) {
            if (isDOMVNode(instance)) {
                var domClassName = instance.dom.className;
                if (!isString(domClassName) &&
                    !isNullOrUndef$1(instance.dom) &&
                    isFunction$1(instance.dom.getAttribute)) {
                    // SVG || null, probably
                    domClassName = instance.dom.getAttribute("class") || "";
                }
                var domClassList = parseSelector(domClassName);
                return parseSelector(classNames).every((function (className) {
                    return domClassList.indexOf(className) !== -1;
                }));
            }
            return false;
        })).map((function (instance) { return instance.dom; }));
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
        return findOneOf(renderedTree, classNames, "class", scryRenderedDOMElementsWithClass);
    }
    function findRenderedDOMElementWithTag(renderedTree, tagName) {
        return findOneOf(renderedTree, tagName, "tag", scryRenderedDOMElementsWithTag);
    }
    function findRenderedVNodeWithType(renderedTree, type) {
        return findOneOf(renderedTree, type, "component", scryRenderedVNodesWithType);
    }
    function findVNodeWithType(vNodeTree, type) {
        return findOneOf(vNodeTree, type, "VNode", scryVNodesWithType);
    }
    function getTagNameOfVNode(inst) {
        return ((inst && inst.dom && inst.dom.tagName.toLowerCase()) ||
            (inst &&
                inst._vNode &&
                inst._vNode.dom &&
                inst._vNode.dom.tagName.toLowerCase()) ||
            undefined);
    }
    var index = {
        Wrapper: Wrapper,
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
        isTextVNode: isTextVNode,
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
    exports.isTextVNode = isTextVNode;
    exports.isDOMElement = isDOMElement;
    exports.isDOMElementOfType = isDOMElementOfType;
    exports.isRenderedClassComponent = isRenderedClassComponent;
    exports.isRenderedClassComponentOfType = isRenderedClassComponentOfType;
    exports.Wrapper = Wrapper;
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
