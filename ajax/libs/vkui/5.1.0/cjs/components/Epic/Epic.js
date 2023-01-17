"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Epic = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));
var React = _interopRequireWildcard(require("react"));
var _vkjs = require("@vkontakte/vkjs");
var _ScrollSaver = require("./ScrollSaver");
var _getNavId = require("../../lib/getNavId");
var _warnOnce = require("../../lib/warnOnce");
var _excluded = ["activeStory", "tabbar", "children", "className"];
var warn = (0, _warnOnce.warnOnce)('Epic');

/**
 * @see https://vkcom.github.io/VKUI/#/Epic
 */
var Epic = function Epic(props) {
  var _ref;
  var scroll = React.useRef({}).current;
  var activeStory = props.activeStory,
    tabbar = props.tabbar,
    children = props.children,
    className = props.className,
    restProps = (0, _objectWithoutProperties2.default)(props, _excluded);
  var story = (_ref = React.Children.toArray(children).find(function (story) {
    return /*#__PURE__*/React.isValidElement(story) && (0, _getNavId.getNavId)(story.props, warn) === activeStory;
  })) !== null && _ref !== void 0 ? _ref : null;
  return /*#__PURE__*/React.createElement("div", (0, _extends2.default)({}, restProps, {
    className: (0, _vkjs.classNames)("vkuiEpic", className)
  }), /*#__PURE__*/React.createElement(_ScrollSaver.ScrollSaver, {
    key: activeStory,
    initialScroll: scroll[activeStory] || 0,
    saveScroll: function saveScroll(value) {
      return scroll[activeStory] = value;
    }
  }, story), tabbar);
};
exports.Epic = Epic;
//# sourceMappingURL=Epic.js.map