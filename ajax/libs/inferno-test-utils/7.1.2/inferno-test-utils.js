(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('inferno')) :
    typeof define === 'function' && define.amd ? define(['exports', 'inferno'], factory) :
    (global = global || self, factory((global.Inferno = global.Inferno || {}, global.Inferno.TestUtils = global.Inferno.TestUtils || {}), global.Inferno));
}(this, function (exports, inferno) { 'use strict';

    var ERROR_MSG = 'a runtime error occured! Use Inferno in development environment to find the error.';
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

    function isVNode(inst) {
        return Boolean(inst) && isObject(inst) && isNumber(inst.flags) && inst.flags > 0;
    }
    function isTextVNode(inst) {
        return (inst.flags & 16 /* Text */) > 0;
    }
    function isFunctionalVNode(inst) {
        return isVNode(inst) && (inst.flags & 8 /* ComponentFunction */) > 0;
    }
    function isClassVNode(inst) {
        return isVNode(inst) && (inst.flags & 4 /* ComponentClass */) > 0;
    }
    function isComponentVNode(inst) {
        return isFunctionalVNode(inst) || isClassVNode(inst);
    }
    function getTagNameOfVNode(vNode) {
        return (vNode && vNode.dom && vNode.dom.tagName.toLowerCase()) || undefined;
    }
    function isDOMVNode(vNode) {
        return !isComponentVNode(vNode) && !isTextVNode(vNode) && (vNode.flags & 481 /* Element */) > 0;
    }
    var Wrapper = /*@__PURE__*/(function (Component) {
        function Wrapper () {
            Component.apply(this, arguments);
        }

        if ( Component ) Wrapper.__proto__ = Component;
        Wrapper.prototype = Object.create( Component && Component.prototype );
        Wrapper.prototype.constructor = Wrapper;

        Wrapper.prototype.render = function render () {
            return this.props.children;
        };

        return Wrapper;
    }(inferno.Component));

    // Jest Snapshot Utilities
    // Jest formats it's snapshots prettily because it knows how to play with the React test renderer.
    // Symbols and algorithm have been reversed from the following file:
    // https://github.com/facebook/react/blob/v15.4.2/src/renderers/testing/ReactTestRenderer.js#L98
    var symbolValue = typeof Symbol === 'undefined' ? 'react.test.json' : Symbol.for('react.test.json');
    function createSnapshotObject(object) {
        Object.defineProperty(object, '$$typeof', {
            value: symbolValue
        });
        return object;
    }
    function buildVNodeSnapshot(vNode) {
        var flags = vNode.flags;
        var children = vNode.children;
        var childVNode;
        if (flags & 4 /* ComponentClass */) {
            childVNode = buildVNodeSnapshot(children.$LI);
        }
        else if (flags & 8 /* ComponentFunction */) {
            childVNode = buildVNodeSnapshot(children);
        }
        if (vNode.childFlags === 2 /* HasVNodeChildren */) {
            childVNode = buildVNodeSnapshot(children);
        }
        else if (vNode.childFlags & 12 /* MultipleChildren */) {
            childVNode = [];
            for (var i = 0, len = children.length; i < len; ++i) {
                childVNode.push(buildVNodeSnapshot(children[i]));
            }
        }
        else if (vNode.childFlags & 16 /* HasTextChildren */) {
            childVNode = vNode.children + '';
        }
        if (flags & 481 /* Element */) {
            var snapShotProps = {};
            var props = vNode.props;
            if (props) {
                var keys = Object.keys(props);
                for (var i$1 = 0; i$1 < keys.length; ++i$1) {
                    var key = keys[i$1];
                    var value = props[key];
                    if (value !== undefined) {
                        snapShotProps[key] = value;
                    }
                }
            }
            if (!isNullOrUndef(vNode.className)) {
                snapShotProps.className = vNode.className;
            }
            // Jest expects children to always be array
            if (childVNode && !isArray(childVNode)) {
                childVNode = [childVNode];
            }
            return createSnapshotObject({
                children: childVNode,
                props: snapShotProps,
                type: getTagNameOfVNode(vNode)
            });
        }
        else if (flags & 16 /* Text */) {
            childVNode = vNode.children + '';
        }
        return childVNode;
    }
    function vNodeToSnapshot(vNode) {
        return buildVNodeSnapshot(vNode);
    }
    function renderToSnapshot(input) {
        inferno.render(input, document.createElement('div'));
        inferno.rerender(); // Flush all pending set state calls
        var snapshot = vNodeToSnapshot(input);
        if (isArray(snapshot)) {
            for (var i = 0; i < snapshot.length; ++i) {
                var _snapshot = snapshot[i];
                if (typeof _snapshot === 'object' && _snapshot.props) {
                    delete _snapshot.props.children;
                }
            }
        }
        else if (typeof snapshot === 'object' && snapshot.props) {
            delete snapshot.props.children;
        }
        return snapshot;
    }

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
        return (isFunctionalVNode(inst) || isClassVNode(inst)) && inst.type === type;
    }
    function isDOMElement(instance) {
        return Boolean(instance) && isObject(instance) && instance.nodeType === 1 && isString(instance.tagName);
    }
    function isDOMElementOfType(instance, type) {
        return isDOMElement(instance) && isString(type) && instance.tagName.toLowerCase() === type.toLowerCase();
    }
    function isRenderedClassComponent(instance) {
        return (Boolean(instance) && isObject(instance) && isVNode(instance.$LI) && isFunction(instance.render) && isFunction(instance.setState));
    }
    function isRenderedClassComponentOfType(instance, type) {
        return isRenderedClassComponent(instance) && isFunction(type) && instance.constructor === type;
    }
    // Recursive Finder Functions
    function findAllInRenderedTree(renderedTree, predicate) {
        if (isRenderedClassComponent(renderedTree)) {
            return findAllInVNodeTree(renderedTree.$LI, predicate);
        }
        else {
            return findAllInVNodeTree(renderedTree, predicate);
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
                if (!isString(domClassName) && !isNullOrUndef(instance.dom) && isFunction(instance.dom.getAttribute)) {
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
    function renderIntoContainer(input) {
        var container = document.createElement('div');
        inferno.render(input, container);
        var rootInput = container.$V;
        if (rootInput && rootInput.flags & 14 /* Component */) {
            return rootInput.children;
        }
        return rootInput;
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
    exports.renderIntoContainer = renderIntoContainer;
    exports.vNodeToSnapshot = vNodeToSnapshot$1;
    exports.renderToSnapshot = renderToSnapshot$1;
    exports.getTagNameOfVNode = getTagNameOfVNode$1;
    exports.isClassVNode = isClassVNode$1;
    exports.isComponentVNode = isComponentVNode$1;
    exports.isDOMVNode = isDOMVNode$1;
    exports.isFunctionalVNode = isFunctionalVNode$1;
    exports.isTextVNode = isTextVNode$1;
    exports.isVNode = isVNode$1;
    exports.Wrapper = Wrapper$1;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
