(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('inferno')) :
    typeof define === 'function' && define.amd ? define(['exports', 'inferno'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.Inferno = global.Inferno || {}, global.Inferno.TestUtils = global.Inferno.TestUtils || {}), global.Inferno));
})(this, (function (exports, inferno) { 'use strict';

    var ERROR_MSG = 'a runtime error occured! Use Inferno in development environment to find the error.';
    var isArray = Array.isArray;
    function isNullOrUndef(o) {
      return o === void 0 || o === null;
    }
    function isInvalid(o) {
      return o === null || o === false || o === true || o === void 0;
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
    function throwError(message) {
      if (!message) {
        message = ERROR_MSG;
      }
      throw new Error("Inferno Error: " + message);
    }

    function _inheritsLoose(t, o) { t.prototype = Object.create(o.prototype), t.prototype.constructor = t, _setPrototypeOf(t, o); }
    function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
    function isVNode$1(obj) {
      return Boolean(obj) && typeof obj === 'object' && isNumber(obj.flags) && obj.flags > 0;
    }
    function isTextVNode$1(obj) {
      return (obj.flags & 16 /* VNodeFlags.Text */) > 0;
    }
    function isFunctionalVNode$1(obj) {
      return isVNode$1(obj) && (obj.flags & 8 /* VNodeFlags.ComponentFunction */) > 0;
    }
    function isClassVNode$1(obj) {
      return isVNode$1(obj) && (obj.flags & 4 /* VNodeFlags.ComponentClass */) > 0;
    }
    function isComponentVNode$1(obj) {
      return isFunctionalVNode$1(obj) || isClassVNode$1(obj);
    }
    function getTagNameOfVNode$1(vNode) {
      var _vNode$dom;
      return vNode == null || (_vNode$dom = vNode.dom) == null ? void 0 : _vNode$dom.tagName.toLowerCase();
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

    var symbolValue = typeof Symbol === 'undefined' ? 'react.test.json' : Symbol["for"]('react.test.json');
    function createSnapshotObject(object) {
      Object.defineProperty(object, '$$typeof', {
        value: symbolValue
      });
      return object;
    }
    function removeChildren(item) {
      if (Array.isArray(item)) {
        for (var i = 0; i < item.length; ++i) {
          removeChildren(item[i]);
        }
      } else if (item != null && item.props) {
        if (Object.prototype.hasOwnProperty.call(item.props, 'children')) {
          delete item.props.children;
        }
        removeChildren(item.children);
      }
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
        for (var i = 0, len = children.length; i < len; ++i) {
          childVNode.push(buildVNodeSnapshot(children[i]));
        }
      } else if (vNode.childFlags & 16 /* ChildFlags.HasTextChildren */) {
        childVNode = vNode.children + '';
      }
      if (flags & 481 /* VNodeFlags.Element */) {
        var snapShotProps = {};
        var props = vNode.props;
        if (props) {
          var keys = Object.keys(props);
          for (var _i = 0; _i < keys.length; ++_i) {
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
        // Jest expects children to always be an array
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
      inferno.rerender(); // Flush all pending set state calls
      var snapshot = vNodeToSnapshot$1(input);
      removeChildren(snapshot);
      return snapshot;
    }

    function _createForOfIteratorHelperLoose(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (t) return (t = t.call(r)).next.bind(t); if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e) { t && (r = t); var o = 0; return function () { return o >= r.length ? { done: true } : { done: false, value: r[o++] }; }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
    function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
    function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
    // Type Checkers
    function isVNodeOfType(obj, type) {
      return isVNode$1(obj) && obj.type === type;
    }
    function isDOMVNodeOfType(obj, type) {
      return isDOMVNode$1(obj) && obj.type === type;
    }
    function isFunctionalVNodeOfType(obj, type) {
      return isFunctionalVNode$1(obj) && obj.type === type;
    }
    function isClassVNodeOfType(obj, type) {
      return isClassVNode$1(obj) && obj.type === type;
    }
    function isComponentVNodeOfType(obj, type) {
      return (isFunctionalVNode$1(obj) || isClassVNode$1(obj)) && obj.type === type;
    }
    function isDOMElement(obj) {
      return Boolean(obj) && typeof obj === 'object' && obj.nodeType === 1 && isString(obj.tagName);
    }
    function isDOMElementOfType(obj, type) {
      return isDOMElement(obj) && isString(type) && obj.tagName.toLowerCase() === type.toLowerCase();
    }
    function isRenderedClassComponent(obj) {
      return Boolean(obj) && typeof obj === 'object' && isVNode$1(obj.$LI) && isFunction(obj.render) && isFunction(obj.setState);
    }
    function isRenderedClassComponentOfType(obj, type) {
      return isRenderedClassComponent(obj) && isFunction(type) && obj.constructor === type;
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
          for (var _iterator = _createForOfIteratorHelperLoose(children), _step; !(_step = _iterator()).done;) {
            var child = _step.value;
            if (!isInvalid(child)) {
              result = result.concat(findAllInVNodeTree(child, predicate));
            }
          }
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
      }
      return all[0];
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
            return domClassList.includes(className);
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
    function renderIntoContainer(input) {
      var container = document.createElement('div');
      inferno.render(input, container);
      var rootInput = container.$V;
      if (rootInput && rootInput.flags & 14 /* VNodeFlags.Component */) {
        return rootInput.children;
      }
      return rootInput;
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
    exports.renderIntoContainer = renderIntoContainer;
    exports.renderToSnapshot = renderToSnapshot;
    exports.scryRenderedDOMElementsWithClass = scryRenderedDOMElementsWithClass;
    exports.scryRenderedDOMElementsWithTag = scryRenderedDOMElementsWithTag;
    exports.scryRenderedVNodesWithType = scryRenderedVNodesWithType;
    exports.scryVNodesWithType = scryVNodesWithType;
    exports.vNodeToSnapshot = vNodeToSnapshot;

}));
