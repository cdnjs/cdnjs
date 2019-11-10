
/*!
 * inferno-test-utils v1.3.0-rc.1
 * (c) 2017 Dominic Gannaway'
 * Released under the MIT License.
 */

(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('inferno'), require('inferno-create-class'), require('inferno-create-element')) :
	typeof define === 'function' && define.amd ? define(['exports', 'inferno', 'inferno-create-class', 'inferno-create-element'], factory) :
	(factory((global['inferno-test-utils'] = global['inferno-test-utils'] || {}),global.Inferno,global.createClass,global.Inferno.createElement));
}(this, (function (exports,inferno,createClass,createElement) { 'use strict';

createClass = 'default' in createClass ? createClass['default'] : createClass;
createElement = 'default' in createElement ? createElement['default'] : createElement;

var ERROR_MSG = 'a runtime error occured! Use Inferno in development environment to find the error.';


// this is MUCH faster than .constructor === Array and instanceof Array
// in Node 7 and the later versions of V8, slower in older versions though
var isArray = Array.isArray;




function isFunction(obj) {
    return typeof obj === 'function';
}

function isString(obj) {
    return typeof obj === 'string';
}
function isNumber(obj) {
    return typeof obj === 'number';
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

var EMPTY_OBJ = {};
{
    Object.freeze(EMPTY_OBJ);
}

// Type Checkers
function isVNode(inst) {
    return Boolean(inst) && isObject(inst) && isNumber(inst.flags) &&
        (inst.flags & (28 /* Component */ | 3970 /* Element */)) > 0;
}
function isVNodeOfType(inst, type) {
    return isVNode(inst) && inst.type === type;
}
function isDOMVNode(inst) {
    return isVNode(inst) && isString(inst.type);
}
function isDOMVNodeOfType(inst, type) {
    return isDOMVNode(inst) && inst.type === type;
}
function isFunctionalVNode(inst) {
    return isVNode(inst) && Boolean(inst.flags & 8 /* ComponentFunction */);
}
function isFunctionalVNodeOfType(inst, type) {
    return isFunctionalVNode(inst) && inst.type === type;
}
function isClassVNode(inst) {
    return isVNode(inst) && Boolean(inst.flags & 4 /* ComponentClass */);
}
function isClassVNodeOfType(inst, type) {
    return isClassVNode(inst) && inst.type === type;
}
function isDOMElement(inst) {
    return Boolean(inst) && isObject(inst) &&
        inst.nodeType === 1 && isString(inst.tagName);
}
function isDOMElementOfType(inst, type) {
    return isDOMElement(inst) && isString(type) &&
        inst.tagName.toLowerCase() === type.toLowerCase();
}
function isRenderedClassComponent(inst) {
    return Boolean(inst) && isObject(inst) && isVNode(inst._vNode) &&
        isFunction(inst.render) && isFunction(inst.setState);
}
function isRenderedClassComponentOfType(inst, type) {
    return isRenderedClassComponent(inst) &&
        isFunction(type) && inst._vNode.type === type;
}
// Render Utilities
var Wrapper = createClass({
    render: function render$$1() {
        return this.props.children;
    }
});
function renderIntoDocument(input) {
    var wrappedInput = createElement(Wrapper, null, input);
    var parent = document.createElement('div');
    return inferno.render(wrappedInput, parent);
}
// Recursive Finder Functions
function findAllInRenderedTree(tree, predicate) {
    if (isRenderedClassComponent(tree)) {
        return findAllInVNodeTree(tree._lastInput, predicate);
    }
    else {
        throwError('findAllInRenderedTree(...) instance must be a rendered class component');
    }
}
function findAllInVNodeTree(tree, predicate) {
    if (isVNode(tree)) {
        var result = predicate(tree) ? [tree] : [];
        var children = tree.children;
        if (isRenderedClassComponent(children)) {
            result = result.concat(findAllInVNodeTree(children._lastInput, predicate));
        }
        else if (isVNode(children)) {
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
        throwError('findAllInVNodeTree(...) instance must be a VNode');
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
function scryRenderedDOMElementsWithClass(tree, classNames) {
    return findAllInRenderedTree(tree, function (inst) {
        if (isDOMVNode(inst)) {
            var domClassName = inst.dom.className;
            if (!isString(domClassName)) {
                domClassName = inst.dom.getAttribute('class') || '';
            }
            var domClassList = parseSelector(domClassName);
            return parseSelector(classNames).every(function (className) {
                return domClassList.indexOf(className) !== -1;
            });
        }
        return false;
    }).map(function (inst) { return inst.dom; });
}
function scryRenderedDOMElementsWithTag(tree, tagName) {
    return findAllInRenderedTree(tree, function (inst) {
        return isDOMVNodeOfType(inst, tagName);
    }).map(function (inst) { return inst.dom; });
}
function scryRenderedVNodesWithType(tree, type) {
    return findAllInRenderedTree(tree, function (inst) { return isVNodeOfType(inst, type); });
}
function scryVNodesWithType(tree, type) {
    return findAllInVNodeTree(tree, function (inst) { return isVNodeOfType(inst, type); });
}
// Find Utilities
function findRenderedDOMElementWithClass(tree, classNames) {
    return findOneOf(tree, classNames, 'class', scryRenderedDOMElementsWithClass);
}
function findRenderedDOMElementWithTag(tree, tagName) {
    return findOneOf(tree, tagName, 'tag', scryRenderedDOMElementsWithTag);
}
function findRenderedVNodeWithType(tree, type) {
    return findOneOf(tree, type, 'component', scryRenderedVNodesWithType);
}
function findVNodeWithType(tree, type) {
    return findOneOf(tree, type, 'VNode', scryVNodesWithType);
}
var index = {
    isVNode: isVNode,
    isVNodeOfType: isVNodeOfType,
    isDOMVNode: isDOMVNode,
    isDOMVNodeOfType: isDOMVNodeOfType,
    isFunctionalVNode: isFunctionalVNode,
    isFunctionalVNodeOfType: isFunctionalVNodeOfType,
    isClassVNode: isClassVNode,
    isClassVNodeOfType: isClassVNodeOfType,
    isDOMElement: isDOMElement,
    isDOMElementOfType: isDOMElementOfType,
    isRenderedClassComponent: isRenderedClassComponent,
    isRenderedClassComponentOfType: isRenderedClassComponentOfType,
    renderIntoDocument: renderIntoDocument,
    findAllInRenderedTree: findAllInRenderedTree,
    findAllInVNodeTree: findAllInVNodeTree,
    scryRenderedDOMElementsWithClass: scryRenderedDOMElementsWithClass,
    findRenderedDOMElementWithClass: findRenderedDOMElementWithClass,
    scryRenderedDOMElementsWithTag: scryRenderedDOMElementsWithTag,
    findRenderedDOMElementWithTag: findRenderedDOMElementWithTag,
    scryRenderedVNodesWithType: scryRenderedVNodesWithType,
    findRenderedVNodeWithType: findRenderedVNodeWithType,
    scryVNodesWithType: scryVNodesWithType,
    findVNodeWithType: findVNodeWithType
};

exports.isVNode = isVNode;
exports.isVNodeOfType = isVNodeOfType;
exports.isDOMVNode = isDOMVNode;
exports.isDOMVNodeOfType = isDOMVNodeOfType;
exports.isFunctionalVNode = isFunctionalVNode;
exports.isFunctionalVNodeOfType = isFunctionalVNodeOfType;
exports.isClassVNode = isClassVNode;
exports.isClassVNodeOfType = isClassVNodeOfType;
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
exports['default'] = index;

Object.defineProperty(exports, '__esModule', { value: true });

})));
