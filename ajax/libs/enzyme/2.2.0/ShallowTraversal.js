'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

exports.childrenOfNode = childrenOfNode;
exports.hasClassName = hasClassName;
exports.treeForEach = treeForEach;
exports.treeFilter = treeFilter;
exports.pathToNode = pathToNode;
exports.parentsOfNode = parentsOfNode;
exports.nodeHasId = nodeHasId;
exports.nodeHasProperty = nodeHasProperty;
exports.nodeMatchesObjectProps = nodeMatchesObjectProps;
exports.buildPredicate = buildPredicate;
exports.getTextFromNode = getTextFromNode;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _isEmpty = require('lodash/isEmpty');

var _isEmpty2 = _interopRequireDefault(_isEmpty);

var _isSubset = require('is-subset');

var _isSubset2 = _interopRequireDefault(_isSubset);

var _Utils = require('./Utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function childrenOfNode(node) {
  if (!node) return [];
  var maybeArray = (0, _Utils.propsOfNode)(node).children;
  var result = [];
  _react2['default'].Children.forEach(maybeArray, function (child) {
    if (child !== null && child !== false && typeof child !== 'undefined') {
      result.push(child);
    }
  });
  return result;
}

function hasClassName(node, className) {
  var classes = (0, _Utils.propsOfNode)(node).className || '';
  return (' ' + String(classes) + ' ').indexOf(' ' + String(className) + ' ') > -1;
}

function treeForEach(tree, fn) {
  if (tree !== null && tree !== false && typeof tree !== 'undefined') {
    fn(tree);
  }
  childrenOfNode(tree).forEach(function (node) {
    return treeForEach(node, fn);
  });
}

function treeFilter(tree, fn) {
  var results = [];
  treeForEach(tree, function (node) {
    if (fn(node)) {
      results.push(node);
    }
  });
  return results;
}

function pathToNode(node, root) {
  var queue = [root];
  var path = [];

  while (queue.length) {
    var current = queue.pop();
    var children = childrenOfNode(current);

    if (current === node) return path;

    path.push(current);

    if (children.length === 0) {
      // leaf node. if it isn't the node we are looking for, we pop.
      path.pop();
    }
    queue.push.apply(queue, children);
  }

  return null;
}

function parentsOfNode(node, root) {
  return pathToNode(node, root).reverse();
}

function nodeHasId(node, id) {
  return (0, _Utils.propsOfNode)(node).id === id;
}

function nodeHasProperty(node, propKey, stringifiedPropValue) {
  var nodeProps = (0, _Utils.propsOfNode)(node);
  var propValue = (0, _Utils.coercePropValue)(propKey, stringifiedPropValue);
  var descriptor = Object.getOwnPropertyDescriptor(nodeProps, propKey);
  if (descriptor && descriptor.get) {
    return false;
  }
  var nodePropValue = nodeProps[propKey];

  if (nodePropValue === undefined) {
    return false;
  }

  if (propValue) {
    return nodePropValue === propValue;
  }

  return nodeProps.hasOwnProperty(propKey);
}

function nodeMatchesObjectProps(node, props) {
  return (0, _isSubset2['default'])((0, _Utils.propsOfNode)(node), props);
}

function buildPredicate(selector) {
  switch (typeof selector === 'undefined' ? 'undefined' : _typeof(selector)) {
    case 'function':
      // selector is a component constructor
      return function (node) {
        return node && node.type === selector;
      };

    case 'string':
      if (!(0, _Utils.isSimpleSelector)(selector)) {
        throw (0, _Utils.selectorError)(selector);
      }
      if (_Utils.isCompoundSelector.test(selector)) {
        return (0, _Utils.AND)((0, _Utils.splitSelector)(selector).map(buildPredicate));
      }

      switch ((0, _Utils.selectorType)(selector)) {
        case _Utils.SELECTOR.CLASS_TYPE:
          return function (node) {
            return hasClassName(node, selector.substr(1));
          };

        case _Utils.SELECTOR.ID_TYPE:
          return function (node) {
            return nodeHasId(node, selector.substr(1));
          };

        case _Utils.SELECTOR.PROP_TYPE:
          {
            var _ret = function () {
              var propKey = selector.split(/\[([a-zA-Z\-]*?)(=|\])/)[1];
              var propValue = selector.split(/=(.*?)\]/)[1];

              return {
                v: function () {
                  function v(node) {
                    return nodeHasProperty(node, propKey, propValue);
                  }

                  return v;
                }()
              };
            }();

            if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
          }
        default:
          // selector is a string. match to DOM tag or constructor displayName
          return function (node) {
            return (0, _Utils.nodeHasType)(node, selector);
          };
      }

    case 'object':
      if (!Array.isArray(selector) && selector !== null && !(0, _isEmpty2['default'])(selector)) {
        return function (node) {
          return nodeMatchesObjectProps(node, selector);
        };
      }
      throw new TypeError('Enzyme::Selector does not support an array, null, or empty object as a selector');

    default:
      throw new TypeError('Enzyme::Selector expects a string, object, or Component Constructor');
  }
}

function getTextFromNode(node) {
  if (node === null || node === undefined) {
    return '';
  }

  if (typeof node === 'string' || typeof node === 'number') {
    return String(node);
  }

  if (node.type && typeof node.type === 'function') {
    return '<' + String(node.type.name || node.type.displayName) + ' />';
  }

  return childrenOfNode(node).map(getTextFromNode).join('').replace(/\s+/, ' ');
}