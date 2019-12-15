(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('inferno')) :
    typeof define === 'function' && define.amd ? define(['exports', 'inferno'], factory) :
    (factory((global.Inferno = global.Inferno || {}, global.Inferno.TestUtils = global.Inferno.TestUtils || {}),global.Inferno));
}(this, (function (exports,inferno) { 'use strict';

    /**
     * @module Inferno-Shared
     */ /** TypeDoc Comment */
    var ERROR_MSG = 'a runtime error occured! Use Inferno in development environment to find the error.';
    // This should be boolean and not reference to window.document
    var isBrowser = !!(typeof window !== 'undefined' && window.document);
    // this is MUCH faster than .constructor === Array and instanceof Array
    // in Node 7 and the later versions of V8, slower in older versions though
    var isArray = Array.isArray;
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
    function isObject(o) {
        return typeof o === 'object';
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
    function isVNode(instance) {
        return (Boolean(instance) &&
            isObject(instance) &&
            isNumber(instance.flags) &&
            instance.flags > 0);
    }
    function isTextVNode(inst) {
        return inst.flags === 16 /* Text */;
    }
    function isFunctionalVNode(instance) {
        return (isVNode(instance) && Boolean(instance.flags & 8 /* ComponentFunction */));
    }
    function isClassVNode(instance) {
        return (isVNode(instance) && Boolean(instance.flags & 4 /* ComponentClass */));
    }
    function isComponentVNode(inst) {
        return isFunctionalVNode(inst) || isClassVNode(inst);
    }
    function getTagNameOfVNode(inst) {
        return ((inst && inst.dom && inst.dom.tagName.toLowerCase()) ||
            (inst && inst.$V && inst.$V.dom && inst.$V.dom.tagName.toLowerCase()) ||
            undefined);
    }
    function isDOMVNode(inst) {
        return !isComponentVNode(inst) && !isTextVNode(inst);
    }
    var Wrapper = (function (Component) {
        function Wrapper () {
            Component.apply(this, arguments);
        }

        if ( Component ) Wrapper.__proto__ = Component;
        Wrapper.prototype = Object.create( Component && Component.prototype );
        Wrapper.prototype.constructor = Wrapper;

        Wrapper.prototype.render = function render () {
            return this.props.children;
        };
        Wrapper.prototype.repaint = function repaint () {
            var this$1 = this;

            return new Promise(function (resolve) { return this$1.setState({}, resolve); });
        };

        return Wrapper;
    }(inferno.Component));
    function renderIntoDocument(input) {
        var wrappedInput = inferno.createComponentVNode(4 /* ComponentClass */, Wrapper, { children: input });
        var parent = document.createElement('div');
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
        Object.defineProperty(object, '$$typeof', {
            value: Symbol.for('react.test.json')
        });
        return object;
    }
    function vNodeToSnapshot(node) {
        var object;
        var children = [];
        if (isDOMVNode(node)) {
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
                type: getTagNameOfVNode(node)
            });
        }
        if (isArray(node.children)) {
            node.children.forEach(function (child) {
                var asJSON = vNodeToSnapshot(child);
                if (asJSON) {
                    children.push(asJSON);
                }
            });
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
    function isVNodeOfType(instance, type) {
        return isVNode(instance) && instance.type === type;
    }
    function isDOMVNodeOfType(instance, type) {
        return isDOMVNode(instance) && instance.type === type;
    }
    function isFunctionalVNodeOfType(instance, type) {
        return isFunctionalVNode(instance) && instance.type === type;
    }
    function isClassVNodeOfType(instance, type) {
        return isClassVNode(instance) && instance.type === type;
    }
    function isComponentVNodeOfType(inst, type) {
        return ((isFunctionalVNode(inst) || isClassVNode(inst)) && inst.type === type);
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
            isVNode(instance.$V) &&
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
            throwError('findAllInRenderedTree(renderedTree, predicate) renderedTree must be a rendered class component');
        }
    }
    function findAllInVNodeTree(vNodeTree, predicate) {
        if (isVNode(vNodeTree)) {
            var result = predicate(vNodeTree) ? [vNodeTree] : [];
            var children = vNodeTree.children;
            if (isRenderedClassComponent(children)) {
                result = result.concat(findAllInVNodeTree(children.$LI, predicate));
            }
            else if (isVNode(children)) {
                result = result.concat(findAllInVNodeTree(children, predicate));
            }
            else if (isArray(children)) {
                children.forEach(function (child) {
                    if (!isInvalid(child)) {
                        result = result.concat(findAllInVNodeTree(child, predicate));
                    }
                });
            }
            return result;
        }
        else {
            throwError('findAllInVNodeTree(vNodeTree, predicate) vNodeTree must be a VNode instance');
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
            if (isDOMVNode(instance)) {
                var domClassName = !isNullOrUndef(instance.dom) ? instance.dom.className : '';
                if (!isString(domClassName) &&
                    !isNullOrUndef(instance.dom) &&
                    isFunction(instance.dom.getAttribute)) {
                    // SVG || null, probably
                    domClassName = instance.dom.getAttribute('class') || '';
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
    var vNodeToSnapshot$1 = vNodeToSnapshot;
    var renderToSnapshot$1 = renderToSnapshot;
    var getTagNameOfVNode$1 = getTagNameOfVNode;
    var isClassVNode$1 = isClassVNode;
    var isComponentVNode$1 = isComponentVNode;
    var isDOMVNode$1 = isDOMVNode;
    var isFunctionalVNode$1 = isFunctionalVNode;
    var isTextVNode$1 = isTextVNode;
    var isVNode$1 = isVNode;
    var renderIntoDocument$1 = renderIntoDocument;
    var Wrapper$1 = Wrapper;

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
    exports.vNodeToSnapshot = vNodeToSnapshot$1;
    exports.renderToSnapshot = renderToSnapshot$1;
    exports.getTagNameOfVNode = getTagNameOfVNode$1;
    exports.isClassVNode = isClassVNode$1;
    exports.isComponentVNode = isComponentVNode$1;
    exports.isDOMVNode = isDOMVNode$1;
    exports.isFunctionalVNode = isFunctionalVNode$1;
    exports.isTextVNode = isTextVNode$1;
    exports.isVNode = isVNode$1;
    exports.renderIntoDocument = renderIntoDocument$1;
    exports.Wrapper = Wrapper$1;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
