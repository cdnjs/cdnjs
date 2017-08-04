'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

exports.typeName = typeName;
exports.spaces = spaces;
exports.indent = indent;
exports.debugNode = debugNode;
exports.debugNodes = debugNodes;
exports.debugInst = debugInst;
exports.debugInsts = debugInsts;

var _ShallowTraversal = require('./ShallowTraversal');

var _MountedTraversal = require('./MountedTraversal');

var _reactCompat = require('./react-compat');

var _Utils = require('./Utils');

var _without = require('lodash/without');

var _without2 = _interopRequireDefault(_without);

var _escape = require('lodash/escape');

var _escape2 = _interopRequireDefault(_escape);

var _compact = require('lodash/compact');

var _compact2 = _interopRequireDefault(_compact);

var _version = require('./version');

var _object = require('object.values');

var _object2 = _interopRequireDefault(_object);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function typeName(node) {
  return typeof node.type === 'function' ? node.type.displayName || node.type.name || 'Component' : node.type;
}

function spaces(n) {
  return Array(n + 1).join(' ');
}

function indent(depth, string) {
  return string.split('\n').map(function (x) {
    return '' + String(spaces(depth)) + String(x);
  }).join('\n');
}

function propString(prop) {
  switch (typeof prop === 'undefined' ? 'undefined' : _typeof(prop)) {
    case 'function':
      return '{[Function]}';
    case 'string':
      return '"' + String(prop) + '"';
    case 'number':
    case 'boolean':
      return '{' + String(prop) + '}';
    case 'object':
      return '{{...}}';
    default:
      return '{[' + (typeof prop === 'undefined' ? 'undefined' : _typeof(prop)) + ']}';
  }
}

function propsString(node) {
  var props = (0, _Utils.propsOfNode)(node);
  var keys = (0, _without2['default'])(Object.keys(props), 'children');
  return keys.map(function (key) {
    return String(key) + '=' + String(propString(props[key]));
  }).join(' ');
}

function debugNode(node) {
  var indentLength = arguments.length <= 1 || arguments[1] === undefined ? 2 : arguments[1];

  if (typeof node === 'string' || typeof node === 'number') return (0, _escape2['default'])(node);
  if (!node) return '';

  var children = (0, _compact2['default'])((0, _ShallowTraversal.childrenOfNode)(node).map(function (n) {
    return debugNode(n, indentLength);
  }));
  var type = typeName(node);
  var props = propsString(node);
  var beforeProps = props ? ' ' : '';
  var nodeClose = children.length ? '</' + String(type) + '>' : '/>';
  var afterProps = children.length ? '>' : ' ';
  var childrenIndented = children.length ? '\n' + String(children.map(function (x) {
    return indent(indentLength, x);
  }).join('\n')) + '\n' : '';
  return '<' + String(type) + beforeProps + String(props) + afterProps + childrenIndented + nodeClose;
}

function debugNodes(nodes) {
  return nodes.map(debugNode).join('\n\n\n');
}

function debugInst(inst) {
  var indentLength = arguments.length <= 1 || arguments[1] === undefined ? 2 : arguments[1];

  if (typeof inst === 'string' || typeof inst === 'number') return (0, _escape2['default'])(inst);
  if (!inst) return '';

  if (!inst.getPublicInstance) {
    var internal = (0, _Utils.internalInstance)(inst);
    return debugInst(internal, indentLength);
  }
  var publicInst = inst.getPublicInstance();

  if (typeof publicInst === 'string' || typeof publicInst === 'number') return (0, _escape2['default'])(publicInst);
  if (!publicInst && !inst._renderedComponent) return '';

  // do stuff with publicInst
  var currentElement = inst._currentElement;
  var type = typeName(currentElement);
  var props = propsString(currentElement);
  var children = [];
  if ((0, _reactCompat.isDOMComponent)(publicInst)) {
    var renderedChildren = (0, _MountedTraversal.renderedChildrenOfInst)(inst);
    if (!renderedChildren) {
      children.push.apply(children, _toConsumableArray((0, _ShallowTraversal.childrenOfNode)(currentElement)));
    } else {
      children.push.apply(children, _toConsumableArray((0, _object2['default'])(renderedChildren)));
    }
  } else if (!_version.REACT013 && (0, _reactCompat.isElement)(currentElement) && typeof currentElement.type === 'function') {
    children.push(inst._renderedComponent);
  } else if (_version.REACT013 && (0, _reactCompat.isCompositeComponent)(publicInst)) {
    children.push(inst._renderedComponent);
  }

  var childrenStrs = (0, _compact2['default'])(children.map(function (n) {
    return debugInst(n, indentLength);
  }));

  var beforeProps = props ? ' ' : '';
  var nodeClose = childrenStrs.length ? '</' + String(type) + '>' : '/>';
  var afterProps = childrenStrs.length ? '>' : ' ';
  var childrenIndented = childrenStrs.length ? '\n' + String(childrenStrs.map(function (x) {
    return indent(indentLength + 2, x);
  }).join('\n')) + '\n' : '';
  return '<' + String(type) + beforeProps + String(props) + afterProps + childrenIndented + nodeClose;
}

function debugInsts(insts) {
  return insts.map(debugInst).join('\n\n\n');
}