"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Epic = void 0;
var _jsxRuntime = require("../../lib/jsxRuntime");
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));
var React = _interopRequireWildcard(require("react"));
var _withAdaptivity = require("../../hoc/withAdaptivity");
var _ScrollSaver = require("./ScrollSaver");
var _getNavId = require("../../lib/getNavId");
var _warnOnce = require("../../lib/warnOnce");
var _AdaptivityProvider = require("../AdaptivityProvider/AdaptivityProvider");
var _excluded = ["activeStory", "tabbar", "children", "viewWidth"];
var warn = (0, _warnOnce.warnOnce)("Epic");
var EpicComponent = function EpicComponent(_ref) {
  var _ref2;
  var activeStory = _ref.activeStory,
    tabbar = _ref.tabbar,
    children = _ref.children,
    viewWidth = _ref.viewWidth,
    restProps = (0, _objectWithoutProperties2.default)(_ref, _excluded);
  var scroll = React.useRef({}).current;
  if (process.env.NODE_ENV === "development" && !tabbar && viewWidth < _withAdaptivity.ViewWidth.SMALL_TABLET) {
    warn("\u041D\u0435 \u0440\u0435\u043A\u043E\u043C\u0435\u043D\u0434\u0443\u0435\u0442\u0441\u044F \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u044C Epic \u0431\u0435\u0437 Tabbar \u043F\u0440\u0438 \u0448\u0438\u0440\u0438\u043D\u0435 \u043E\u043A\u043D\u0430 \u043C\u0435\u043D\u044C\u0448\u0435 ".concat(_AdaptivityProvider.SMALL_TABLET_SIZE, "px"));
  }
  var story = (_ref2 = React.Children.toArray(children).find(function (story) {
    return /*#__PURE__*/React.isValidElement(story) && (0, _getNavId.getNavId)(story.props, warn) === activeStory;
  })) !== null && _ref2 !== void 0 ? _ref2 : null;
  return (0, _jsxRuntime.createScopedElement)("div", (0, _extends2.default)({}, restProps, {
    vkuiClass: "Epic"
  }), (0, _jsxRuntime.createScopedElement)(_ScrollSaver.ScrollSaver, {
    key: activeStory,
    initialScroll: scroll[activeStory] || 0,
    saveScroll: function saveScroll(value) {
      return scroll[activeStory] = value;
    }
  }, story), tabbar);
};

/**
 * @see https://vkcom.github.io/VKUI/#/Epic
 */
var Epic = (0, _withAdaptivity.withAdaptivity)(EpicComponent, {
  viewWidth: true
});
exports.Epic = Epic;
Epic.displayName = "Epic";
//# sourceMappingURL=Epic.js.map