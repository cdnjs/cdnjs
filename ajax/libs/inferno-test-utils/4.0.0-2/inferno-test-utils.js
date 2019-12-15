(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('inferno')) :
    typeof define === 'function' && define.amd ? define(['exports', 'inferno'], factory) :
    (factory((global.Inferno = global.Inferno || {}, global.Inferno.TestUtils = {}),global.Inferno));
}(this, (function (exports,inferno) { 'use strict';

    /**
     * @module Inferno-Shared
     */ /** TypeDoc Comment */
    var ERROR_MSG = "a runtime error occured! Use Inferno in development environment to find the error.";
    // This should be boolean and not reference to window.document
    var isBrowser = !!(typeof window !== "undefined" && window.document);
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

    /**
     * @module Inferno-Test-Utils
     */ /** TypeDoc Comment */
    function isVNode$1(instance) {
        return (Boolean(instance) &&
            isObject(instance) &&
            isNumber(instance.flags) &&
            instance.flags > 0);
    }
    function isTextVNode$1(inst) {
        return inst.flags === 1 /* Text */;
    }
    function isFunctionalVNode$1(instance) {
        return (isVNode$1(instance) && Boolean(instance.flags & 8 /* ComponentFunction */));
    }
    function isClassVNode$1(instance) {
        return (isVNode$1(instance) && Boolean(instance.flags & 4 /* ComponentClass */));
    }
    function isComponentVNode$1(inst) {
        return isFunctionalVNode$1(inst) || isClassVNode$1(inst);
    }
    function getTagNameOfVNode$1(inst) {
        return ((inst && inst.dom && inst.dom.tagName.toLowerCase()) ||
            (inst && inst.$V && inst.$V.dom && inst.$V.dom.tagName.toLowerCase()) ||
            undefined);
    }
    function isDOMVNode$1(inst) {
        return !isComponentVNode$1(inst) && !isTextVNode$1(inst);
    }
    var Wrapper$1 = (function (Component$$1) {
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
    }(inferno.Component));
    function renderIntoDocument$1(input) {
        var wrappedInput = inferno.createVNode(4 /* ComponentClass */, Wrapper$1, null, null, { children: input });
        var parent = document.createElement("div");
        document.body.appendChild(parent);
        return inferno.render(wrappedInput, parent);
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
    function vNodeToSnapshot$1(node) {
        var object;
        var children = [];
        if (isDOMVNode$1(node)) {
            var props = Object.assign({ className: node.className || undefined }, node.props);
            // Remove undefined props
            Object.keys(props).forEach(function (propKey) {
                if (props[propKey] === undefined) {
                    delete props[propKey];
                }
            });
            // Create the actual object that Jest will interpret as the snapshot for this VNode
            object = createSnapshotObject({
                props: props,
                type: getTagNameOfVNode$1(node)
            });
        }
        if (isArray(node.children)) {
            node.children.forEach(function (child) {
                var asJSON = vNodeToSnapshot$1(child);
                if (asJSON) {
                    children.push(asJSON);
                }
            });
        }
        else if (isString(node.children)) {
            children.push(node.children);
        }
        else if (isObject(node.children) && !isNull(node.children)) {
            var asJSON = vNodeToSnapshot$1(node.children);
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
    function renderToSnapshot$1(input) {
        var wrapper = renderIntoDocument$1(input);
        var vnode = wrapper.props.children;
        if (!isNull(wrapper.props)) {
            var snapshot = vNodeToSnapshot$1(vnode.children);
            delete snapshot.props.children;
            return snapshot;
        }
        return undefined;
    }

    /**
     * @module Inferno-Test-Utils
     */ /** TypeDoc Comment */
    // Type Checkers
    function isVNodeOfType(instance, type) {
        return isVNode$1(instance) && instance.type === type;
    }
    function isDOMVNodeOfType(instance, type) {
        return isDOMVNode$1(instance) && instance.type === type;
    }
    function isFunctionalVNodeOfType(instance, type) {
        return isFunctionalVNode$1(instance) && instance.type === type;
    }
    function isClassVNodeOfType(instance, type) {
        return isClassVNode$1(instance) && instance.type === type;
    }
    function isComponentVNodeOfType(inst, type) {
        return ((isFunctionalVNode$1(inst) || isClassVNode$1(inst)) && inst.type === type);
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
            isVNode$1(instance.$V) &&
            isFunction(instance.render) &&
            isFunction(instance.setState));
    }
    function isRenderedClassComponentOfType(instance, type) {
        return (isRenderedClassComponent(instance) &&
            isFunction(type) &&
            instance.$V.type === type);
    }
    // Recursive Finder Functions
    function findAllInRenderedTree(renderedTree, predicate) {
        if (isRenderedClassComponent(renderedTree)) {
            return findAllInVNodeTree(renderedTree.$LI, predicate);
        }
        else {
            throwError("findAllInRenderedTree(renderedTree, predicate) renderedTree must be a rendered class component");
        }
    }
    function findAllInVNodeTree(vNodeTree, predicate) {
        if (isVNode$1(vNodeTree)) {
            var result = predicate(vNodeTree) ? [vNodeTree] : [];
            var children = vNodeTree.children;
            if (isRenderedClassComponent(children)) {
                result = result.concat(findAllInVNodeTree(children.$LI, predicate));
            }
            else if (isVNode$1(children)) {
                result = result.concat(findAllInVNodeTree(children, predicate));
            }
            else if (isArray(children)) {
                children.forEach(function (child) {
                    result = result.concat(findAllInVNodeTree(child, predicate));
                });
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
        return findAllInRenderedTree(renderedTree, function (instance) {
            if (isDOMVNode$1(instance)) {
                var domClassName = instance.dom.className;
                if (!isString(domClassName) &&
                    !isNullOrUndef(instance.dom) &&
                    isFunction(instance.dom.getAttribute)) {
                    // SVG || null, probably
                    domClassName = instance.dom.getAttribute("class") || "";
                }
                var domClassList = parseSelector(domClassName);
                return parseSelector(classNames).every(function (className) {
                    return domClassList.indexOf(className) !== -1;
                });
            }
            return false;
        }).map(function (instance) { return instance.dom; });
    }
    function scryRenderedDOMElementsWithTag(renderedTree, tagName) {
        return findAllInRenderedTree(renderedTree, function (instance) {
            return isDOMVNodeOfType(instance, tagName);
        }).map(function (instance) { return instance.dom; });
    }
    function scryRenderedVNodesWithType(renderedTree, type) {
        return findAllInRenderedTree(renderedTree, function (instance) { return isVNodeOfType(instance, type); });
    }
    function scryVNodesWithType(vNodeTree, type) {
        return findAllInVNodeTree(vNodeTree, function (instance) { return isVNodeOfType(instance, type); });
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
    var vNodeToSnapshot$$1 = vNodeToSnapshot$1;
    var renderToSnapshot$$1 = renderToSnapshot$1;
    var getTagNameOfVNode$$1 = getTagNameOfVNode$1;
    var isClassVNode$$1 = isClassVNode$1;
    var isComponentVNode$$1 = isComponentVNode$1;
    var isDOMVNode$$1 = isDOMVNode$1;
    var isFunctionalVNode$$1 = isFunctionalVNode$1;
    var isTextVNode$$1 = isTextVNode$1;
    var isVNode$$1 = isVNode$1;
    var renderIntoDocument$$1 = renderIntoDocument$1;
    var Wrapper$$1 = Wrapper$1;
    var index = {
        Wrapper: Wrapper$1,
        findAllInRenderedTree: findAllInRenderedTree,
        findAllInVNodeTree: findAllInVNodeTree,
        findRenderedDOMElementWithClass: findRenderedDOMElementWithClass,
        findRenderedDOMElementWithTag: findRenderedDOMElementWithTag,
        findRenderedVNodeWithType: findRenderedVNodeWithType,
        findVNodeWithType: findVNodeWithType,
        getTagNameOfVNode: getTagNameOfVNode$1,
        isClassVNode: isClassVNode$1,
        isClassVNodeOfType: isClassVNodeOfType,
        isComponentVNode: isComponentVNode$1,
        isComponentVNodeOfType: isComponentVNodeOfType,
        isDOMElement: isDOMElement,
        isDOMElementOfType: isDOMElementOfType,
        isDOMVNode: isDOMVNode$1,
        isDOMVNodeOfType: isDOMVNodeOfType,
        isFunctionalVNode: isFunctionalVNode$1,
        isFunctionalVNodeOfType: isFunctionalVNodeOfType,
        isRenderedClassComponent: isRenderedClassComponent,
        isRenderedClassComponentOfType: isRenderedClassComponentOfType,
        isTextVNode: isTextVNode$1,
        isVNode: isVNode$1,
        isVNodeOfType: isVNodeOfType,
        renderIntoDocument: renderIntoDocument$1,
        renderToSnapshot: renderToSnapshot$1,
        scryRenderedDOMElementsWithClass: scryRenderedDOMElementsWithClass,
        scryRenderedDOMElementsWithTag: scryRenderedDOMElementsWithTag,
        scryRenderedVNodesWithType: scryRenderedVNodesWithType,
        scryVNodesWithType: scryVNodesWithType,
        vNodeToSnapshot: vNodeToSnapshot$1
    };

    exports.isVNodeOfType = isVNodeOfType;
    exports.isDOMVNodeOfType = isDOMVNodeOfType;
    exports.isFunctionalVNodeOfType = isFunctionalVNodeOfType;
    exports.isClassVNodeOfType = isClassVNodeOfType;
    exports.isComponentVNodeOfType = isComponentVNodeOfType;
    exports.isDOMElement = isDOMElement;
    exports.isDOMElementOfType = isDOMElementOfType;
    exports.isRenderedClassComponent = isRenderedClassComponent;
    exports.isRenderedClassComponentOfType = isRenderedClassComponentOfType;
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
    exports.vNodeToSnapshot = vNodeToSnapshot$$1;
    exports.renderToSnapshot = renderToSnapshot$$1;
    exports.getTagNameOfVNode = getTagNameOfVNode$$1;
    exports.isClassVNode = isClassVNode$$1;
    exports.isComponentVNode = isComponentVNode$$1;
    exports.isDOMVNode = isDOMVNode$$1;
    exports.isFunctionalVNode = isFunctionalVNode$$1;
    exports.isTextVNode = isTextVNode$$1;
    exports.isVNode = isVNode$$1;
    exports.renderIntoDocument = renderIntoDocument$$1;
    exports.Wrapper = Wrapper$$1;
    exports['default'] = index;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
