"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.Epic = void 0;

var _jsxRuntime = require("../../lib/jsxRuntime");

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var React = _interopRequireWildcard(require("react"));

var _getClassName = require("../../helpers/getClassName");

var _usePlatform = require("../../hooks/usePlatform");

var _withAdaptivity = require("../../hoc/withAdaptivity");

var _ScrollSaver = require("./ScrollSaver");

var _getNavId = require("../../lib/getNavId");

var _warnOnce = require("../../lib/warnOnce");

var _excluded = ["activeStory", "tabbar", "children", "viewWidth"];
var warn = (0, _warnOnce.warnOnce)('Epic');

var Epic = function Epic(props) {
  var platform = (0, _usePlatform.usePlatform)();
  var scroll = React.useRef({}).current;
  var activeStory = props.activeStory,
      tabbar = props.tabbar,
      children = props.children,
      viewWidth = props.viewWidth,
      restProps = (0, _objectWithoutProperties2.default)(props, _excluded);

  if (process.env.NODE_ENV === 'development' && !tabbar && viewWidth < _withAdaptivity.ViewWidth.SMALL_TABLET) {
    warn('Using Epic without tabbar is not recommended on mobile');
  }

  var story = React.Children.toArray(children).find(function (story) {
    return (0, _getNavId.getNavId)(story.props, warn) === activeStory;
  }) || null;
  return (0, _jsxRuntime.createScopedElement)("div", (0, _extends2.default)({}, restProps, {
    vkuiClass: (0, _getClassName.getClassName)('Epic', platform)
  }), (0, _jsxRuntime.createScopedElement)(_ScrollSaver.ScrollSaver, {
    key: activeStory,
    initialScroll: scroll[activeStory] || 0,
    saveScroll: function saveScroll(value) {
      return scroll[activeStory] = value;
    }
  }, story), tabbar);
};

exports.Epic = Epic;

var _default = (0, _withAdaptivity.withAdaptivity)(Epic, {
  viewWidth: true
});

exports.default = _default;
//# sourceMappingURL=Epic.js.map