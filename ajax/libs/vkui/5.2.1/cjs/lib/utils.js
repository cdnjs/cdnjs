"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.debounce = debounce;
exports.getTitleFromChildren = getTitleFromChildren;
exports.multiRef = multiRef;
exports.setRef = setRef;
exports.stopPropagation = void 0;
var React = _interopRequireWildcard(require("react"));
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
function setRef(element, ref) {
  if (ref) {
    if (typeof ref === 'function') {
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
}
function getTitleFromChildren(children) {
  var label = '';
  React.Children.map(children, function (child) {
    if (typeof child === 'string') {
      label += child;
    }
  });
  return label;
}
var stopPropagation = function stopPropagation(event) {
  return event.stopPropagation();
};
exports.stopPropagation = stopPropagation;
//# sourceMappingURL=utils.js.map