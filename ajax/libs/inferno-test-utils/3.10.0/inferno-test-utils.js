(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('inferno'), require('inferno-component')) :
    typeof define === 'function' && define.amd ? define(['exports', 'inferno', 'inferno-component'], factory) :
    (factory((global.Inferno = global.Inferno || {}, global.Inferno.TestUtils = {}),global.Inferno,global.Inferno.Component));
}(this, (function (exports,inferno,Component) { 'use strict';

    Component = Component && Component.hasOwnProperty('default') ? Component['default'] : Component;

    /**
     * @module Inferno-Shared
     */ /** TypeDoc Comment */
    var ERROR_MSG = "a runtime error occured! Use Inferno in development environment to find the error.";
    // this is MUCH faster than .constructor === Array and instanceof Array
    // in Node 7 and the later versions of V8, slower in older versions though
    var isArray = Array.isArray;
    function isNullOrUndef(o) {
        return isUndefined(o) || isNull(o);
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
    function isUndefined(o) {
        return o === void 0;
    }
    function isObject(o) {
        return typeof o === "object";
    }
    function throwError(message) {
        if (!message) {
            message = ERROR_MSG;
        }
        throw new Error(("Inferno Error: " + message));
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
        else if (isObject(node.children) && !isNull(node.children)) {
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
        if (!isNull(wrapper.props)) {
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
            isFunction(instance.render) &&
            isFunction(instance.setState));
    }
    function isRenderedClassComponentOfType(instance, type) {
        return (isRenderedClassComponent(instance) &&
            isFunction(type) &&
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
        var wrappedInput = inferno.createVNode(4 /* ComponentClass */, Wrapper, null, null, { children: input });
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
            throwError("findAllInRenderedTree(renderedTree, predicate) renderedTree must be a rendered class component");
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
            throwError("findAllInVNodeTree(vNodeTree, predicate) vNodeTree must be a VNode instance");
        }
    }
    // Finder Helpers
    function parseSelector(filter) {
        if (isArray(filter)) {
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
            throwError(("Did not find exactly one match (found " + (all.length) + ") for " + name + ": " + filter));
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
                    !isNullOrUndef(instance.dom) &&
                    isFunction(instance.dom.getAttribute)) {
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
