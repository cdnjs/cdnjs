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
var warn = (0, _warnOnce.warnOnce)("Epic");
/**
 * @see https://vkcom.github.io/VKUI/#/Epic
 */

var Epic = function Epic(props) {
  var _ref;

  var platform = (0, _usePlatform.usePlatform)();
  var scroll = React.useRef({}).current;
  var activeStory = props.activeStory,
      tabbar = props.tabbar,
      children = props.children,
      viewWidth = props.viewWidth,
      restProps = (0, _objectWithoutProperties2.default)(props, _excluded);

  if (process.env.NODE_ENV === "development" && !tabbar && viewWidth < _withAdaptivity.ViewWidth.SMALL_TABLET) {
    warn("\u041D\u0435 \u0440\u0435\u043A\u043E\u043C\u0435\u043D\u0434\u0443\u0435\u0442\u0441\u044F \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u044C Epic \u0431\u0435\u0437 Tabbar \u043F\u0440\u0438 \u0448\u0438\u0440\u0438\u043D\u0435 \u043E\u043A\u043D\u0430 \u043C\u0435\u043D\u044C\u0448\u0435 ".concat(_withAdaptivity.ViewWidth.SMALL_TABLET, "px"));
  }

  var story = (_ref = React.Children.toArray(children).find(function (story) {
    return /*#__PURE__*/React.isValidElement(story) && (0, _getNavId.getNavId)(story.props, warn) === activeStory;
  })) !== null && _ref !== void 0 ? _ref : null;
  return (0, _jsxRuntime.createScopedElement)("div", (0, _extends2.default)({}, restProps, {
    vkuiClass: (0, _getClassName.getClassName)("Epic", platform)
  }), (0, _jsxRuntime.createScopedElement)(_ScrollSaver.ScrollSaver, {
    key: activeStory,
    initialScroll: scroll[activeStory] || 0,
    saveScroll: function saveScroll(value) {
      return scroll[activeStory] = value;
    }
  }, story), tabbar);
}; // eslint-disable-next-line import/no-default-export


exports.Epic = Epic;

var _default = (0, _withAdaptivity.withAdaptivity)(Epic, {
  viewWidth: true
});

exports.default = _default;
//# sourceMappingURL=Epic.js.map