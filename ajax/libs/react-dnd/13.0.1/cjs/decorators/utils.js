"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getDecoratedComponent = getDecoratedComponent;
exports.isClassComponent = isClassComponent;
exports.isRefForwardingComponent = isRefForwardingComponent;
exports.isRefable = isRefable;
exports.checkDecoratorArguments = checkDecoratorArguments;
exports.isFunction = isFunction;
exports.noop = noop;
exports.isPlainObject = isPlainObject;
exports.isValidType = isValidType;

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function getDecoratedComponent(instanceRef) {
  var currentRef = instanceRef.current;

  if (currentRef == null) {
    return null;
  } else if (currentRef.decoratedRef) {
    // go through the private field in decorateHandler to avoid the invariant hit
    return currentRef.decoratedRef.current;
  } else {
    return currentRef;
  }
}

function isClassComponent(Component) {
  return Component && Component.prototype && typeof Component.prototype.render === 'function';
}

function isRefForwardingComponent(C) {
  var _item$$$typeof;

  var item = C;
  return (item === null || item === void 0 ? void 0 : (_item$$$typeof = item.$$typeof) === null || _item$$$typeof === void 0 ? void 0 : _item$$$typeof.toString()) === 'Symbol(react.forward_ref)';
}

function isRefable(C) {
  return isClassComponent(C) || isRefForwardingComponent(C);
}

function checkDecoratorArguments(functionName, signature) {
  if (process.env.NODE_ENV !== 'production') {
    for (var i = 0; i < (arguments.length <= 2 ? 0 : arguments.length - 2); i++) {
      var arg = i + 2 < 2 || arguments.length <= i + 2 ? undefined : arguments[i + 2];

      if (arg && arg.prototype && arg.prototype.render) {
        // eslint-disable-next-line no-console
        console.error('You seem to be applying the arguments in the wrong order. ' + "It should be ".concat(functionName, "(").concat(signature, ")(Component), not the other way around. ") + 'Read more: http://react-dnd.github.io/react-dnd/docs/troubleshooting#you-seem-to-be-applying-the-arguments-in-the-wrong-order');
        return;
      }
    }
  }
}

function isFunction(input) {
  return typeof input === 'function';
}

function noop() {// noop
}

function isObjectLike(input) {
  return _typeof(input) === 'object' && input !== null;
}

function isPlainObject(input) {
  if (!isObjectLike(input)) {
    return false;
  }

  if (Object.getPrototypeOf(input) === null) {
    return true;
  }

  var proto = input;

  while (Object.getPrototypeOf(proto) !== null) {
    proto = Object.getPrototypeOf(proto);
  }

  return Object.getPrototypeOf(input) === proto;
}

function isValidType(type, allowArray) {
  return typeof type === 'string' || _typeof(type) === 'symbol' || !!allowArray && Array.isArray(type) && type.every(function (t) {
    return isValidType(t, false);
  });
}