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

var _getClassName = require("../../helpers/getClassName");

var _classNames = require("../../lib/classNames");

var _usePlatform = require("../../hooks/usePlatform");

var _Separator = _interopRequireDefault(require("../Separator/Separator"));

var _utils = require("../../lib/utils");

var _Caption = _interopRequireDefault(require("../Typography/Caption/Caption"));

var _withAdaptivity = require("../../hoc/withAdaptivity");

var _ModalRootContext = _interopRequireDefault(require("../ModalRoot/ModalRootContext"));

var _excluded = ["header", "description", "children", "separator", "getRootRef", "mode", "sizeX"];

var Group = function Group(props) {
  var header = props.header,
      description = props.description,
      children = props.children,
      separator = props.separator,
      getRootRef = props.getRootRef,
      mode = props.mode,
      sizeX = props.sizeX,
      restProps = (0, _objectWithoutProperties2.default)(props, _excluded);

  var _React$useContext = React.useContext(_ModalRootContext.default),
      isInsideModal = _React$useContext.isInsideModal;

  var platform = (0, _usePlatform.usePlatform)();
  var computedMode = mode;

  if (!mode) {
    computedMode = sizeX === _withAdaptivity.SizeType.COMPACT || isInsideModal ? 'plain' : 'card';
  }

  return (0, _jsxRuntime.createScopedElement)("section", (0, _extends2.default)({}, restProps, {
    ref: getRootRef,
    vkuiClass: (0, _classNames.classNames)((0, _getClassName.getClassName)('Group', platform), "Group--sizeX-".concat(sizeX), "Group--".concat(computedMode))
  }), (0, _jsxRuntime.createScopedElement)("div", {
    vkuiClass: "Group__inner"
  }, header, children, (0, _utils.hasReactNode)(description) && (0, _jsxRuntime.createScopedElement)(_Caption.default, {
    vkuiClass: "Group__description",
    weight: "regular",
    level: "1"
  }, description)), separator !== 'hide' && (0, _jsxRuntime.createScopedElement)(_Separator.default, {
    vkuiClass: (0, _classNames.classNames)('Group__separator', {
      'Group__separator--force': separator === 'show'
    }),
    expanded: computedMode === 'card'
  }));
};

Group.defaultProps = {
  separator: 'auto'
};

var _default = (0, _withAdaptivity.withAdaptivity)(Group, {
  sizeX: true
});

exports.default = _default;
//# sourceMappingURL=Group.js.map