"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;

exports.__esModule = true;
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

var React = _interopRequireWildcard(require("react"));

var _View = _interopRequireDefault(require("../View"));

var _excluded = ["behavior", "contentContainerStyle", "keyboardVerticalOffset"];

class KeyboardAvoidingView extends React.Component {
  constructor() {
    super(...arguments);
    this.frame = null;

    this.onLayout = event => {
      this.frame = event.nativeEvent.layout;
    };
  }

  relativeKeyboardHeight(keyboardFrame) {
    var frame = this.frame;

    if (!frame || !keyboardFrame) {
      return 0;
    }

    var keyboardY = keyboardFrame.screenY - (this.props.keyboardVerticalOffset || 0);
    return Math.max(frame.y + frame.height - keyboardY, 0);
  }

  onKeyboardChange(event) {}

  render() {
    var _this$props = this.props,
        behavior = _this$props.behavior,
        contentContainerStyle = _this$props.contentContainerStyle,
        keyboardVerticalOffset = _this$props.keyboardVerticalOffset,
        rest = (0, _objectWithoutPropertiesLoose2.default)(_this$props, _excluded);
    return /*#__PURE__*/React.createElement(_View.default, (0, _extends2.default)({
      onLayout: this.onLayout
    }, rest));
  }

}

var _default = KeyboardAvoidingView;
exports.default = _default;
module.exports = exports.default;