"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createScopedElement = void 0;

var React = _interopRequireWildcard(require("react"));

var _prefixClass = require("./prefixClass");

function processProps(props) {
  var newProps = {};

  for (var key in props) {
    if (Object.prototype.hasOwnProperty.call(props, key) && key !== 'vkuiClass') {
      newProps[key] = props[key];
    }
  }

  if (props.vkuiClass) {
    var className = props.className;
    var resolved = (0, _prefixClass.prefixClass)(props.vkuiClass);
    newProps.className = className ? className + ' ' + resolved : resolved;
  }

  return newProps;
}

function _createScopedElement(_type, props) {
  var args = arguments;

  if (!props || !('vkuiClass' in props)) {
    return React.createElement.apply(undefined, args);
  }

  var argsLength = args.length;
  var createElementArgArray = new Array(argsLength);
  createElementArgArray[0] = args[0];
  createElementArgArray[1] = processProps(props);

  for (var i = 2; i < argsLength; i++) {
    createElementArgArray[i] = args[i];
  }

  return React.createElement.apply(null, createElementArgArray);
}

_createScopedElement.Fragment = React.Fragment;
var createScopedElement = _createScopedElement;
exports.createScopedElement = createScopedElement;
//# sourceMappingURL=jsxRuntime.js.map