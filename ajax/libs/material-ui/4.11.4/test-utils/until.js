"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = until;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

function shallowRecursively(wrapper, selector, _ref) {
  var context = _ref.context,
      other = (0, _objectWithoutProperties2.default)(_ref, ["context"]);

  if (wrapper.isEmptyRender() || typeof wrapper.getElement().type === 'string') {
    return wrapper;
  }

  var newContext = context;
  var instance = wrapper.root().instance(); // The instance can be null with a stateless functional component and react >= 16.

  if (instance && instance.getChildContext) {
    newContext = (0, _extends2.default)({}, context, instance.getChildContext());
  }

  var nextWrapper = wrapper.shallow((0, _extends2.default)({
    context: newContext
  }, other));

  if (selector && wrapper.is(selector)) {
    return nextWrapper;
  }

  return shallowRecursively(nextWrapper, selector, {
    context: newContext
  });
}

function until(selector) {
  var _this = this;

  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return this.single('until', function () {
    return shallowRecursively(_this, selector, options);
  });
}