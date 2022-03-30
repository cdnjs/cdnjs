"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.debounce = debounce;
exports.generateRandomId = void 0;
exports.getTitleFromChildren = getTitleFromChildren;
exports.hasReactNode = hasReactNode;
exports.isFunction = isFunction;
exports.isNumeric = isNumeric;
exports.isPrimitiveReactNode = isPrimitiveReactNode;
exports.leadingZero = leadingZero;
exports.multiRef = multiRef;
exports.noop = void 0;
exports.setRef = setRef;
exports.stopPropagation = void 0;

var React = _interopRequireWildcard(require("react"));

// Является ли переданное значение числовым
function isNumeric(value) {
  return !isNaN(parseFloat(value)) && isFinite(value);
} // Является ли переданное значение функцией


function isFunction(value) {
  return typeof value === "function";
}

function debounce(fn, delay) {
  var timeout;
  return function () {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    clearTimeout(timeout);
    timeout = setTimeout(function () {
      return fn.apply(void 0, args);
    }, delay);
  };
}

function leadingZero(val) {
  var strVal = val.toFixed();

  if (strVal.length === 1) {
    return "0" + strVal;
  }

  return strVal;
}

function hasReactNode(value) {
  return value !== undefined && value !== false && value !== null && value !== "";
}

function isPrimitiveReactNode(node) {
  return typeof node === "string" || typeof node === "number";
}

function setRef(element, ref) {
  if (ref) {
    if (typeof ref === "function") {
      ref(element);
    } else {
      ref.current = element;
    }
  }
}

function multiRef() {
  for (var _len2 = arguments.length, refs = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    refs[_key2] = arguments[_key2];
  }

  var current = null;
  return {
    get current() {
      return current;
    },

    set current(element) {
      current = element;
      refs.forEach(function (ref) {
        return ref && setRef(element, ref);
      });
    }

  };
} // eslint-disable-next-line


var noop = function noop() {};

exports.noop = noop;

function getTitleFromChildren(children) {
  var label = "";
  React.Children.map(children, function (child) {
    if (typeof child === "string") {
      label += child;
    }
  });
  return label;
}

var generateRandomId = function generateRandomId() {
  return Math.random().toString(36).replace(/[^a-z]+/g, "");
};

exports.generateRandomId = generateRandomId;

var stopPropagation = function stopPropagation(event) {
  return event.stopPropagation();
};

exports.stopPropagation = stopPropagation;
//# sourceMappingURL=utils.js.map