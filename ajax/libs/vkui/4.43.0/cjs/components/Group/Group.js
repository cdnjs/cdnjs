"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Group = void 0;
var _jsxRuntime = require("../../lib/jsxRuntime");
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));
var React = _interopRequireWildcard(require("react"));
var _platform = require("../../lib/platform");
var _classNames = require("../../lib/classNames");
var _usePlatform = require("../../hooks/usePlatform");
var _Spacing = require("../Spacing/Spacing");
var _Separator = require("../Separator/Separator");
var _utils = require("../../lib/utils");
var _Caption = require("../Typography/Caption/Caption");
var _warnOnce = require("../../lib/warnOnce");
var _withAdaptivity = require("../../hoc/withAdaptivity");
var _ModalRootContext = require("../ModalRoot/ModalRootContext");
var _excluded = ["header", "description", "children", "separator", "getRootRef", "mode", "padding", "sizeX", "tabIndex"];
var warn = (0, _warnOnce.warnOnce)("TabsItem");
var GroupComponent = function GroupComponent(_ref) {
  var header = _ref.header,
    description = _ref.description,
    children = _ref.children,
    _ref$separator = _ref.separator,
    separator = _ref$separator === void 0 ? "auto" : _ref$separator,
    getRootRef = _ref.getRootRef,
    mode = _ref.mode,
    _ref$padding = _ref.padding,
    padding = _ref$padding === void 0 ? "m" : _ref$padding,
    sizeX = _ref.sizeX,
    tabIndexProp = _ref.tabIndex,
    restProps = (0, _objectWithoutProperties2.default)(_ref, _excluded);
  var _React$useContext = React.useContext(_ModalRootContext.ModalRootContext),
    isInsideModal = _React$useContext.isInsideModal;
  var platform = (0, _usePlatform.usePlatform)();
  var computedMode = mode;
  if (!mode) {
    computedMode = sizeX === _withAdaptivity.SizeType.COMPACT || isInsideModal ? "plain" : "card";
  }
  var isTabPanel = restProps.role === "tabpanel";
  if (process.env.NODE_ENV === "development" && isTabPanel && (!restProps["aria-controls"] || !restProps["id"])) {
    warn('При использовании роли "tabpanel" необходимо задать значение свойств "aria-controls" и "id"');
  }
  var tabIndex = isTabPanel && tabIndexProp === undefined ? 0 : tabIndexProp;
  var separatorElement = null;
  if (separator !== "hide") {
    var separatorClassName = (0, _classNames.classNames)("Group__separator", separator === "show" && "Group__separator--force");
    separatorElement = computedMode === "card" ? (0, _jsxRuntime.createScopedElement)(_Spacing.Spacing, {
      vkuiClass: separatorClassName,
      size: 16
    }) : (0, _jsxRuntime.createScopedElement)(_Separator.Separator, {
      vkuiClass: separatorClassName
    });
  }
  return (0, _jsxRuntime.createScopedElement)(React.Fragment, null, (0, _jsxRuntime.createScopedElement)("section", (0, _extends2.default)({}, restProps, {
    tabIndex: tabIndex,
    ref: getRootRef,
    vkuiClass: (0, _classNames.classNames)("Group", platform === _platform.IOS && "Group--ios", // TODO v5.0.0 Новая адаптивность
    "Group--sizeX-".concat(sizeX), "Group--".concat(computedMode), "Group--padding-".concat(padding))
  }), header, children, (0, _utils.hasReactNode)(description) && (0, _jsxRuntime.createScopedElement)(_Caption.Caption, {
    vkuiClass: "Group__description"
  }, description)), separatorElement);
};

/**
 * @see https://vkcom.github.io/VKUI/#/Group
 */
var Group = (0, _withAdaptivity.withAdaptivity)(GroupComponent, {
  sizeX: true
});
exports.Group = Group;
Group.displayName = "Group";
//# sourceMappingURL=Group.js.map