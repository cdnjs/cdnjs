'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

exports.getNode = getNode;
exports.instEqual = instEqual;
exports.instHasClassName = instHasClassName;
exports.instHasId = instHasId;
exports.instHasType = instHasType;
exports.instHasProperty = instHasProperty;
exports.renderedChildrenOfInst = renderedChildrenOfInst;
exports.childrenOfInstInternal = childrenOfInstInternal;
exports.internalInstanceOrComponent = internalInstanceOrComponent;
exports.childrenOfInst = childrenOfInst;
exports.pathToNode = pathToNode;
exports.parentsOfInst = parentsOfInst;
exports.instMatchesObjectProps = instMatchesObjectProps;
exports.buildInstPredicate = buildInstPredicate;
exports.treeFilter = treeFilter;

var _isEmpty = require('lodash/isEmpty');

var _isEmpty2 = _interopRequireDefault(_isEmpty);

var _isSubset = require('is-subset');

var _isSubset2 = _interopRequireDefault(_isSubset);

var _Utils = require('./Utils');

var _reactCompat = require('./react-compat');

var _version = require('./version');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getNode(inst) {
  if (!inst || inst._store || typeof inst === 'string') {
    return inst;
  }
  if (inst._currentElement) {
    return inst._currentElement;
  }
  if ((0, _Utils.internalInstance)(inst)) {
    return (0, _Utils.internalInstance)(inst)._currentElement;
  }
  if (inst._reactInternalInstance) {
    return inst._reactInternalInstance._currentElement;
  }
  if (inst._reactInternalComponent) {
    return inst._reactInternalComponent._currentElement;
  }
  return inst;
}

function instEqual(a, b) {
  return (0, _Utils.nodeEqual)(getNode(a), getNode(b));
}

function instHasClassName(inst, className) {
  if (!(0, _reactCompat.isDOMComponent)(inst)) {
    return false;
  }
  var classes = (0, _reactCompat.findDOMNode)(inst).className || '';
  return (' ' + String(classes) + ' ').indexOf(' ' + String(className) + ' ') > -1;
}

function instHasId(inst, id) {
  if (!(0, _reactCompat.isDOMComponent)(inst)) return false;
  var instId = (0, _reactCompat.findDOMNode)(inst).id || '';
  return instId === id;
}

function isFunctionalComponentWithType(inst, func) {
  return (0, _Utils.isFunctionalComponent)(inst) && getNode(inst).type === func;
}

function instHasType(inst, type) {
  switch (typeof type === 'undefined' ? 'undefined' : _typeof(type)) {
    case 'string':
      return (0, _Utils.nodeHasType)(getNode(inst), type);
    case 'function':
      return (0, _reactCompat.isCompositeComponentWithType)(inst, type) || isFunctionalComponentWithType(inst, type);
    default:
      return false;
  }
}

function instHasProperty(inst, propKey, stringifiedPropValue) {
  if (!(0, _reactCompat.isDOMComponent)(inst)) return false;
  var node = getNode(inst);
  var nodeProps = (0, _Utils.propsOfNode)(node);
  var descriptor = Object.getOwnPropertyDescriptor(nodeProps, propKey);
  if (descriptor && descriptor.get) {
    return false;
  }
  var nodePropValue = nodeProps[propKey];

  var propValue = (0, _Utils.coercePropValue)(propKey, stringifiedPropValue);

  // intentionally not matching node props that are undefined
  if (nodePropValue === undefined) {
    return false;
  }

  if (propValue) {
    return nodePropValue === propValue;
  }

  return nodeProps.hasOwnProperty(propKey);
}

// called with private inst
function renderedChildrenOfInst(inst) {
  return _version.REACT013 ? inst._renderedComponent._renderedChildren : inst._renderedChildren;
}

// called with a private instance
function childrenOfInstInternal(inst) {
  if (!inst) {
    return [];
  }
  if (!inst.getPublicInstance) {
    var internal = (0, _Utils.internalInstance)(inst);
    return childrenOfInstInternal(internal);
  }

  var publicInst = inst.getPublicInstance();
  var currentElement = inst._currentElement;
  if ((0, _reactCompat.isDOMComponent)(publicInst)) {
    var children = [];
    var renderedChildren = renderedChildrenOfInst(inst);
    var key = void 0;
    for (key in renderedChildren) {
      if (!renderedChildren.hasOwnProperty(key)) {
        continue;
      }
      if (_version.REACT013 && !renderedChildren[key].getPublicInstance) {
        continue;
      }
      if (!_version.REACT013 && typeof renderedChildren[key]._currentElement.type === 'function') {
        children.push(renderedChildren[key]._instance);
        continue;
      }
      children.push(renderedChildren[key].getPublicInstance());
    }
    return children;
  } else if (!_version.REACT013 && (0, _reactCompat.isElement)(currentElement) && typeof currentElement.type === 'function') {
    return childrenOfInstInternal(inst._renderedComponent);
  } else if (_version.REACT013 && (0, _reactCompat.isCompositeComponent)(publicInst)) {
    return childrenOfInstInternal(inst._renderedComponent);
  }
  return [];
}

function internalInstanceOrComponent(node) {
  if (_version.REACT013) {
    return node;
  } else if (node._reactInternalComponent) {
    return node._reactInternalComponent;
  } else if (node._reactInternalInstance) {
    return node._reactInternalInstance;
  }
  return node;
}

function childrenOfInst(node) {
  return childrenOfInstInternal(internalInstanceOrComponent(node));
}

function pathToNode(node, root) {
  var queue = [root];
  var path = [];

  while (queue.length) {
    var current = queue.pop();
    var children = childrenOfInst(current);

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

function parentsOfInst(inst, root) {
  return pathToNode(inst, root).reverse();
}

function instMatchesObjectProps(inst, props) {
  if (!(0, _reactCompat.isDOMComponent)(inst)) return false;
  var node = getNode(inst);
  return (0, _isSubset2['default'])((0, _Utils.propsOfNode)(node), props);
}

function buildInstPredicate(selector) {
  switch (typeof selector === 'undefined' ? 'undefined' : _typeof(selector)) {
    case 'function':
      // selector is a component constructor
      return function (inst) {
        return instHasType(inst, selector);
      };

    case 'string':
      if (!(0, _Utils.isSimpleSelector)(selector)) {
        throw (0, _Utils.selectorError)(selector);
      }
      if (_Utils.isCompoundSelector.test(selector)) {
        return (0, _Utils.AND)((0, _Utils.splitSelector)(selector).map(buildInstPredicate));
      }

      switch ((0, _Utils.selectorType)(selector)) {
        case _Utils.SELECTOR.CLASS_TYPE:
          return function (inst) {
            return instHasClassName(inst, selector.substr(1));
          };
        case _Utils.SELECTOR.ID_TYPE:
          return function (inst) {
            return instHasId(inst, selector.substr(1));
          };
        case _Utils.SELECTOR.PROP_TYPE:
          {
            var _ret = function () {
              var propKey = selector.split(/\[([a-zA-Z\-\:]*?)(=|\])/)[1];
              var propValue = selector.split(/=(.*?)]/)[1];

              return {
                v: function () {
                  function v(node) {
                    return instHasProperty(node, propKey, propValue);
                  }

                  return v;
                }()
              };
            }();

            if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
          }
        default:
          // selector is a string. match to DOM tag or constructor displayName
          return function (inst) {
            return instHasType(inst, selector);
          };
      }

    case 'object':
      if (!Array.isArray(selector) && selector !== null && !(0, _isEmpty2['default'])(selector)) {
        return function (node) {
          return instMatchesObjectProps(node, selector);
        };
      }
      throw new TypeError('Enzyme::Selector does not support an array, null, or empty object as a selector');

    default:
      throw new TypeError('Enzyme::Selector expects a string, object, or Component Constructor');
  }
}

// This function should be called with an "internal instance". Nevertheless, if it is
// called with a "public instance" instead, the function will call itself with the
// internal instance and return the proper result.
function findAllInRenderedTreeInternal(inst, test) {
  if (!inst) {
    return [];
  }

  if (!inst.getPublicInstance) {
    var internal = (0, _Utils.internalInstance)(inst);
    return findAllInRenderedTreeInternal(internal, test);
  }
  var publicInst = inst.getPublicInstance() || inst._instance;
  var ret = test(publicInst) ? [publicInst] : [];
  var currentElement = inst._currentElement;
  if ((0, _reactCompat.isDOMComponent)(publicInst)) {
    var renderedChildren = renderedChildrenOfInst(inst);
    var key = void 0;
    for (key in renderedChildren) {
      if (!renderedChildren.hasOwnProperty(key)) {
        continue;
      }
      if (_version.REACT013 && !renderedChildren[key].getPublicInstance) {
        continue;
      }
      ret = ret.concat(findAllInRenderedTreeInternal(renderedChildren[key], test));
    }
  } else if (!_version.REACT013 && (0, _reactCompat.isElement)(currentElement) && typeof currentElement.type === 'function') {
    ret = ret.concat(findAllInRenderedTreeInternal(inst._renderedComponent, test));
  } else if (_version.REACT013 && (0, _reactCompat.isCompositeComponent)(publicInst)) {
    ret = ret.concat(findAllInRenderedTreeInternal(inst._renderedComponent, test));
  }
  return ret;
}

// This function could be called with a number of different things technically, so we need to
// pass the *right* thing to our internal helper.
function treeFilter(node, test) {
  return findAllInRenderedTreeInternal(internalInstanceOrComponent(node), test);
}