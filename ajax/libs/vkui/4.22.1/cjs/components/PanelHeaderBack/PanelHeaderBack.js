"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _jsxRuntime = require("../../lib/jsxRuntime");

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var React = _interopRequireWildcard(require("react"));

var _icons = require("@vkontakte/icons");

var _PanelHeaderButton = require("../PanelHeaderButton/PanelHeaderButton");

var _platform = require("../../lib/platform");

var _usePlatform = require("../../hooks/usePlatform");

var _withAdaptivity = require("../../hoc/withAdaptivity");

var _getClassName = require("../../helpers/getClassName");

var _classNames = require("../../lib/classNames");

var _excluded = ["label", "sizeX"];

var PanelHeaderBack = function PanelHeaderBack(_ref) {
  var label = _ref.label,
      sizeX = _ref.sizeX,
      restProps = (0, _objectWithoutProperties2.default)(_ref, _excluded);
  var platform = (0, _usePlatform.usePlatform)();
  var showLabel = platform === _platform.VKCOM || platform === _platform.IOS && sizeX === _withAdaptivity.SizeType.REGULAR;
  return (0, _jsxRuntime.createScopedElement)(_PanelHeaderButton.PanelHeaderButton, (0, _extends2.default)({}, restProps, {
    vkuiClass: (0, _classNames.classNames)((0, _getClassName.getClassName)('PanelHeaderBack', platform), {
      'PanelHeaderBack--has-label': showLabel && !!label
    }),
    label: showLabel && label
  }), platform === _platform.ANDROID && (0, _jsxRuntime.createScopedElement)(_icons.Icon28ArrowLeftOutline, null), platform === _platform.VKCOM && (0, _jsxRuntime.createScopedElement)(_icons.Icon28ChevronLeftOutline, null), platform === _platform.IOS && (0, _jsxRuntime.createScopedElement)(_icons.Icon28ChevronBack, null));
};

PanelHeaderBack.defaultProps = {
  'aria-label': 'Назад'
};

var _default = /*#__PURE__*/React.memo((0, _withAdaptivity.withAdaptivity)(PanelHeaderBack, {
  sizeX: true
}));

exports.default = _default;
//# sourceMappingURL=PanelHeaderBack.js.map