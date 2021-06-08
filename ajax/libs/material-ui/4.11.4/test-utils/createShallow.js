"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createShallow;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _enzyme = require("enzyme");

var _until = _interopRequireDefault(require("./until"));

// Generate an enhanced shallow function.
function createShallow() {
  var options1 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var _options1$shallow = options1.shallow,
      shallow = _options1$shallow === void 0 ? _enzyme.shallow : _options1$shallow,
      _options1$dive = options1.dive,
      dive = _options1$dive === void 0 ? false : _options1$dive,
      _options1$untilSelect = options1.untilSelector,
      untilSelector = _options1$untilSelect === void 0 ? false : _options1$untilSelect,
      other1 = (0, _objectWithoutProperties2.default)(options1, ["shallow", "dive", "untilSelector"]);

  var shallowWithContext = function shallowWithContext(node) {
    var options2 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var options = (0, _extends2.default)({}, other1, options2, {
      context: (0, _extends2.default)({}, other1.context, options2.context)
    });
    var wrapper = shallow(node, options);

    if (dive) {
      return wrapper.dive();
    }

    if (untilSelector) {
      return _until.default.call(wrapper, untilSelector, options);
    }

    return wrapper;
  };

  return shallowWithContext;
}