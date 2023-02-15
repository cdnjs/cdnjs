"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Group = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));
var React = _interopRequireWildcard(require("react"));
var _platform = require("../../lib/platform");
var _vkjs = require("@vkontakte/vkjs");
var _usePlatform = require("../../hooks/usePlatform");
var _Spacing = require("../Spacing/Spacing");
var _Separator = require("../Separator/Separator");
var _Footnote = require("../Typography/Footnote/Footnote");
var _warnOnce = require("../../lib/warnOnce");
var _ModalRootContext = require("../ModalRoot/ModalRootContext");
var _useAdaptivity2 = require("../../hooks/useAdaptivity");
var _getSizeXClassName = require("../../helpers/getSizeXClassName");
var _excluded = ["header", "description", "children", "separator", "getRootRef", "mode", "padding", "className", "tabIndex"];
var warn = (0, _warnOnce.warnOnce)('TabsItem');
var Group = function Group(_ref) {
  var header = _ref.header,
    description = _ref.description,
    children = _ref.children,
    _ref$separator = _ref.separator,
    separator = _ref$separator === void 0 ? 'auto' : _ref$separator,
    getRootRef = _ref.getRootRef,
    modeProps = _ref.mode,
    _ref$padding = _ref.padding,
    padding = _ref$padding === void 0 ? 'm' : _ref$padding,
    className = _ref.className,
    tabIndexProp = _ref.tabIndex,
    restProps = (0, _objectWithoutProperties2.default)(_ref, _excluded);
  var _React$useContext = React.useContext(_ModalRootContext.ModalRootContext),
    isInsideModal = _React$useContext.isInsideModal;
  var platform = (0, _usePlatform.usePlatform)();
  var _useAdaptivity = (0, _useAdaptivity2.useAdaptivity)(),
    sizeX = _useAdaptivity.sizeX;
  var mode = modeProps;
  if (!modeProps) {
    // Подробнее в "none" можно прочитать в ADAPTIVITY_GUIDE.md
    mode = isInsideModal ? 'plain' : 'none';
  }
  var isTabPanel = restProps.role === 'tabpanel';
  if (process.env.NODE_ENV === 'development' && isTabPanel && (!restProps['aria-controls'] || !restProps['id'])) {
    warn('При использовании роли "tabpanel" необходимо задать значение свойств "aria-controls" и "id"');
  }
  var tabIndex = isTabPanel && tabIndexProp === undefined ? 0 : tabIndexProp;
  var separatorClassName = (0, _vkjs.classNames)("vkuiGroup__separator", separator === 'show' && "vkuiGroup__separator--force");
  return /*#__PURE__*/React.createElement("section", (0, _extends2.default)({}, restProps, {
    tabIndex: tabIndex,
    ref: getRootRef,
    className: (0, _vkjs.classNames)("vkuiGroup", platform === _platform.Platform.IOS && "vkuiGroup--ios", (0, _getSizeXClassName.getSizeXClassName)("vkuiGroup", sizeX), mode && styles["Group--mode-".concat(mode)], styles["Group--padding-".concat(padding)], className)
  }), /*#__PURE__*/React.createElement("div", {
    className: "vkuiGroup__inner"
  }, header, children, (0, _vkjs.hasReactNode)(description) && /*#__PURE__*/React.createElement(_Footnote.Footnote, {
    className: "vkuiGroup__description"
  }, description)), separator !== 'hide' && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(_Spacing.Spacing, {
    className: (0, _vkjs.classNames)(separatorClassName, "vkuiGroup__separator--spacing"),
    size: 16
  }), /*#__PURE__*/React.createElement(_Separator.Separator, {
    className: (0, _vkjs.classNames)(separatorClassName, "vkuiGroup__separator--separator")
  })));
};
exports.Group = Group;
var styles = {
  "Group--mode-plain": "vkuiGroup--mode-plain",
  "Group--mode-none": "vkuiGroup--mode-none",
  "Group--mode-card": "vkuiGroup--mode-card",
  "Group--padding-s": "vkuiGroup--padding-s",
  "Group--padding-m": "vkuiGroup--padding-m"
};
//# sourceMappingURL=Group.js.map