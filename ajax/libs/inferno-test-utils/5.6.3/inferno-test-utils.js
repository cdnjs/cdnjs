(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('inferno')) :
    typeof define === 'function' && define.amd ? define(['exports', 'inferno'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.Inferno = global.Inferno || {}, global.Inferno.TestUtils = global.Inferno.TestUtils || {}), global.Inferno));
})(this, (function (exports, inferno) { 'use strict';

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
      throw new Error("Inferno Error: " + message);
    }

    function _inheritsLoose(t, o) { t.prototype = Object.create(o.prototype), t.prototype.constructor = t, _setPrototypeOf(t, o); }
    function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
    function isVNode$1(instance) {
      return Boolean(instance) && isObject(instance) && isNumber(instance.flags) && instance.flags > 0;
    }
    function isTextVNode$1(inst) {
      return (inst.flags & 16 /* VNodeFlags.Text */) > 0;
    }
    function isFunctionalVNode$1(instance) {
      return isVNode$1(instance) && (instance.flags & 8 /* VNodeFlags.ComponentFunction */) > 0;
    }
    function isClassVNode$1(instance) {
      return isVNode$1(instance) && (instance.flags & 4 /* VNodeFlags.ComponentClass */) > 0;
    }
    function isComponentVNode$1(inst) {
      return isFunctionalVNode$1(inst) || isClassVNode$1(inst);
    }
    function getTagNameOfVNode$1(vNode) {
      return vNode && vNode.dom && vNode.dom.tagName.toLowerCase() || undefined;
    }
    function isDOMVNode$1(vNode) {
      return !isComponentVNode$1(vNode) && !isTextVNode$1(vNode) && (vNode.flags & 481 /* VNodeFlags.Element */) > 0;
    }
    var Wrapper$1 = /*#__PURE__*/function (_Component) {
      function Wrapper() {
        return _Component.apply(this, arguments) || this;
      }
      _inheritsLoose(Wrapper, _Component);
      var _proto = Wrapper.prototype;
      _proto.render = function render() {
        return this.props.children;
      };
      return Wrapper;
    }(inferno.Component);

    // Jest Snapshot Utilities
    // Jest formats it's snapshots prettily because it knows how to play with the React test renderer.
    // Symbols and algorithm have been reversed from the following file:
    // https://github.com/facebook/react/blob/v15.4.2/src/renderers/testing/ReactTestRenderer.js#L98
    var symbolValue = typeof Symbol === 'undefined' ? 'react.test.json' : Symbol["for"]('react.test.json');
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
      if (flags & 4 /* VNodeFlags.ComponentClass */) {
        childVNode = buildVNodeSnapshot(children.$LI);
      } else if (flags & 8 /* VNodeFlags.ComponentFunction */) {
        childVNode = buildVNodeSnapshot(children);
      }
      if (vNode.childFlags === 2 /* ChildFlags.HasVNodeChildren */) {
        childVNode = buildVNodeSnapshot(children);
      } else if (vNode.childFlags & 12 /* ChildFlags.MultipleChildren */) {
        childVNode = [];
        for (var i = 0, len = children.length; i < len; i++) {
          childVNode.push(buildVNodeSnapshot(children[i]));
        }
      }
      if (flags & 481 /* VNodeFlags.Element */) {
        var snapShotProps = {};
        var props = vNode.props;
        if (props) {
          var keys = Object.keys(props);
          for (var _i = 0; _i < keys.length; _i++) {
            var key = keys[_i];
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
          type: getTagNameOfVNode$1(vNode)
        });
      } else if (flags & 16 /* VNodeFlags.Text */) {
        childVNode = vNode.children + '';
      }
      return childVNode;
    }
    function vNodeToSnapshot$1(vNode) {
      return buildVNodeSnapshot(vNode);
    }
    function renderToSnapshot$1(input) {
      inferno.render(input, document.createElement('div'));
      var snapshot = vNodeToSnapshot$1(input);
      delete snapshot.props.children;
      return snapshot;
    }

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
      return (isFunctionalVNode$1(inst) || isClassVNode$1(inst)) && inst.type === type;
    }
    function isDOMElement(instance) {
      return Boolean(instance) && isObject(instance) && instance.nodeType === 1 && isString(instance.tagName);
    }
    function isDOMElementOfType(instance, type) {
      return isDOMElement(instance) && isString(type) && instance.tagName.toLowerCase() === type.toLowerCase();
    }
    function isRenderedClassComponent(instance) {
      return Boolean(instance) && isObject(instance) && isVNode$1(instance.$V) && isFunction(instance.render) && isFunction(instance.setState);
    }
    function isRenderedClassComponentOfType(instance, type) {
      return isRenderedClassComponent(instance) && isFunction(type) && instance.$V.type === type;
    }
    // Recursive Finder Functions
    function findAllInRenderedTree(renderedTree, predicate) {
      if (isRenderedClassComponent(renderedTree)) {
        return findAllInVNodeTree(renderedTree.$LI, predicate);
      } else {
        return findAllInVNodeTree(renderedTree, predicate);
      }
    }
    function findAllInVNodeTree(vNodeTree, predicate) {
      if (isVNode$1(vNodeTree)) {
        var result = predicate(vNodeTree) ? [vNodeTree] : [];
        var children = vNodeTree.children;
        if (isRenderedClassComponent(children)) {
          result = result.concat(findAllInVNodeTree(children.$LI, predicate));
        } else if (isVNode$1(children)) {
          result = result.concat(findAllInVNodeTree(children, predicate));
        } else if (isArray(children)) {
          children.forEach(function (child) {
            if (!isInvalid(child)) {
              result = result.concat(findAllInVNodeTree(child, predicate));
            }
          });
        }
        return result;
      } else {
        throwError('findAllInVNodeTree(vNodeTree, predicate) vNodeTree must be a VNode instance');
      }
    }
    // Finder Helpers
    function parseSelector(filter) {
      if (isArray(filter)) {
        return filter;
      } else if (isString(filter)) {
        return filter.trim().split(/\s+/);
      } else {
        return [];
      }
    }
    function findOneOf(tree, filter, name, finder) {
      var all = finder(tree, filter);
      if (all.length > 1) {
        throwError("Did not find exactly one match (found " + all.length + ") for " + name + ": " + filter);
      } else {
        return all[0];
      }
    }
    // Scry Utilities
    function scryRenderedDOMElementsWithClass(renderedTree, classNames) {
      return findAllInRenderedTree(renderedTree, function (instance) {
        if (isDOMVNode$1(instance)) {
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
      }).map(function (instance) {
        return instance.dom;
      });
    }
    function scryRenderedDOMElementsWithTag(renderedTree, tagName) {
      return findAllInRenderedTree(renderedTree, function (instance) {
        return isDOMVNodeOfType(instance, tagName);
      }).map(function (instance) {
        return instance.dom;
      });
    }
    function scryRenderedVNodesWithType(renderedTree, type) {
      return findAllInRenderedTree(renderedTree, function (instance) {
        return isVNodeOfType(instance, type);
      });
    }
    function scryVNodesWithType(vNodeTree, type) {
      return findAllInVNodeTree(vNodeTree, function (instance) {
        return isVNodeOfType(instance, type);
      });
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
    var vNodeToSnapshot = vNodeToSnapshot$1;
    var renderToSnapshot = renderToSnapshot$1;
    var getTagNameOfVNode = getTagNameOfVNode$1;
    var isClassVNode = isClassVNode$1;
    var isComponentVNode = isComponentVNode$1;
    var isDOMVNode = isDOMVNode$1;
    var isFunctionalVNode = isFunctionalVNode$1;
    var isTextVNode = isTextVNode$1;
    var isVNode = isVNode$1;
    var Wrapper = Wrapper$1;

    exports.Wrapper = Wrapper;
    exports.findAllInRenderedTree = findAllInRenderedTree;
    exports.findAllInVNodeTree = findAllInVNodeTree;
    exports.findRenderedDOMElementWithClass = findRenderedDOMElementWithClass;
    exports.findRenderedDOMElementWithTag = findRenderedDOMElementWithTag;
    exports.findRenderedVNodeWithType = findRenderedVNodeWithType;
    exports.findVNodeWithType = findVNodeWithType;
    exports.getTagNameOfVNode = getTagNameOfVNode;
    exports.isClassVNode = isClassVNode;
    exports.isClassVNodeOfType = isClassVNodeOfType;
    exports.isComponentVNode = isComponentVNode;
    exports.isComponentVNodeOfType = isComponentVNodeOfType;
    exports.isDOMElement = isDOMElement;
    exports.isDOMElementOfType = isDOMElementOfType;
    exports.isDOMVNode = isDOMVNode;
    exports.isDOMVNodeOfType = isDOMVNodeOfType;
    exports.isFunctionalVNode = isFunctionalVNode;
    exports.isFunctionalVNodeOfType = isFunctionalVNodeOfType;
    exports.isRenderedClassComponent = isRenderedClassComponent;
    exports.isRenderedClassComponentOfType = isRenderedClassComponentOfType;
    exports.isTextVNode = isTextVNode;
    exports.isVNode = isVNode;
    exports.isVNodeOfType = isVNodeOfType;
    exports.renderToSnapshot = renderToSnapshot;
    exports.scryRenderedDOMElementsWithClass = scryRenderedDOMElementsWithClass;
    exports.scryRenderedDOMElementsWithTag = scryRenderedDOMElementsWithTag;
    exports.scryRenderedVNodesWithType = scryRenderedVNodesWithType;
    exports.scryVNodesWithType = scryVNodesWithType;
    exports.vNodeToSnapshot = vNodeToSnapshot;

}));
