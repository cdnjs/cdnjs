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

var _Footnote = require("../Typography/Footnote/Footnote");

var _ModalRootContext = require("../ModalRoot/ModalRootContext");

var _useAdaptivity2 = require("../../hooks/useAdaptivity");

var _getSizeXClassName = require("../../helpers/getSizeXClassName");

var _excluded = ["header", "description", "children", "separator", "getRootRef", "mode", "padding"];

/**
 * @see https://vkcom.github.io/VKUI/#/Group
 */
var Group = function Group(props) {
  var header = props.header,
      description = props.description,
      children = props.children,
      _props$separator = props.separator,
      separator = _props$separator === void 0 ? "auto" : _props$separator,
      getRootRef = props.getRootRef,
      modeProps = props.mode,
      _props$padding = props.padding,
      padding = _props$padding === void 0 ? "m" : _props$padding,
      restProps = (0, _objectWithoutProperties2.default)(props, _excluded);

  var _React$useContext = React.useContext(_ModalRootContext.ModalRootContext),
      isInsideModal = _React$useContext.isInsideModal;

  var platform = (0, _usePlatform.usePlatform)();

  var _useAdaptivity = (0, _useAdaptivity2.useAdaptivity)(),
      sizeX = _useAdaptivity.sizeX;

  var mode = modeProps;

  if (!modeProps) {
    // Подробнее в "none" можно прочитать в ADAPTIVITY_GUIDE.md
    mode = isInsideModal ? "plain" : "none";
  }

  var separatorClassName = (0, _classNames.classNamesString)("Group__separator", separator === "show" && "Group__separator--force");
  return (0, _jsxRuntime.createScopedElement)("section", (0, _extends2.default)({}, restProps, {
    ref: getRootRef,
    vkuiClass: (0, _classNames.classNames)("Group", platform === _platform.Platform.IOS && "Group--ios", (0, _getSizeXClassName.getSizeXClassName)("Group", sizeX), mode && "Group--mode-".concat(mode), "Group--padding-".concat(padding))
  }), (0, _jsxRuntime.createScopedElement)("div", {
    vkuiClass: "Group__inner"
  }, header, children, (0, _utils.hasReactNode)(description) && (0, _jsxRuntime.createScopedElement)(_Footnote.Footnote, {
    vkuiClass: "Group__description"
  }, description)), separator !== "hide" && (0, _jsxRuntime.createScopedElement)(React.Fragment, null, (0, _jsxRuntime.createScopedElement)(_Spacing.Spacing, {
    vkuiClass: (0, _classNames.classNames)(separatorClassName, "Group__separator--spacing"),
    size: 16
  }), (0, _jsxRuntime.createScopedElement)(_Separator.Separator, {
    vkuiClass: (0, _classNames.classNames)(separatorClassName, "Group__separator--separator")
  })));
};

exports.Group = Group;
//# sourceMappingURL=Group.js.map