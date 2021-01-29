"use strict";

exports.__esModule = true;
exports.default = void 0;

var _View = _interopRequireDefault(require("../../exports/View"));

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

/**
 * Common implementation for a simple stubbed view.
 */
var UnimplementedView =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(UnimplementedView, _React$Component);

  function UnimplementedView() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = UnimplementedView.prototype;

  _proto.setNativeProps = function setNativeProps() {// Do nothing.
  };

  _proto.render = function render() {
    return _react.default.createElement(_View.default, {
      style: [unimplementedViewStyles, this.props.style]
    }, this.props.children);
  };

  return UnimplementedView;
}(_react.default.Component);

var unimplementedViewStyles = process.env.NODE_ENV !== 'production' ? {
  alignSelf: 'flex-start',
  borderColor: 'red',
  borderWidth: 1
} : {};
var _default = UnimplementedView;
exports.default = _default;
module.exports = exports.default;