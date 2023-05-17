"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SimpleCheckbox = void 0;
var _jsxRuntime = require("../../lib/jsxRuntime");
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));
var React = _interopRequireWildcard(require("react"));
var _Tappable = require("../Tappable/Tappable");
var _getClassName = require("../../helpers/getClassName");
var _classNames = require("../../lib/classNames");
var _platform = require("../../lib/platform");
var _icons = require("@vkontakte/icons");
var _usePlatform = require("../../hooks/usePlatform");
var _useAdaptivity2 = require("../../hooks/useAdaptivity");
var _useExternRef = require("../../hooks/useExternRef");
var _withAdaptivity = require("../../hoc/withAdaptivity");
var _warnOnce = require("../../lib/warnOnce");
var _excluded = ["className", "style", "getRootRef", "getRef", "indeterminate", "defaultIndeterminate", "onChange"];
var warn = (0, _warnOnce.warnOnce)("SimpleCheckbox");
var IS_DEV = process.env.NODE_ENV === "development";
/**
 * @deprecated Этот компонент устарел и будет удален в 5.0.0. Используйте [`Checkbox`](https://vkcom.github.io/VKUI/#/Checkbox).
 * @see https://vkcom.github.io/VKUI/#/SimpleCheckbox
 */
var SimpleCheckbox = function SimpleCheckbox(_ref) {
  var className = _ref.className,
    style = _ref.style,
    getRootRef = _ref.getRootRef,
    getRef = _ref.getRef,
    indeterminate = _ref.indeterminate,
    defaultIndeterminate = _ref.defaultIndeterminate,
    onChange = _ref.onChange,
    restProps = (0, _objectWithoutProperties2.default)(_ref, _excluded);
  var _useAdaptivity = (0, _useAdaptivity2.useAdaptivity)(),
    sizeY = _useAdaptivity.sizeY;
  var platform = (0, _usePlatform.usePlatform)();
  var inputRef = (0, _useExternRef.useExternRef)(getRef);
  React.useEffect(function () {
    var indeterminateValue = indeterminate === undefined ? defaultIndeterminate : indeterminate;
    if (inputRef.current) {
      inputRef.current.indeterminate = Boolean(indeterminateValue);
    }
  }, [defaultIndeterminate, indeterminate, inputRef]);
  var handleChange = React.useCallback(function (event) {
    if (defaultIndeterminate !== undefined && indeterminate === undefined && restProps.checked === undefined && inputRef.current) {
      inputRef.current.indeterminate = false;
    }
    if (indeterminate !== undefined && inputRef.current) {
      inputRef.current.indeterminate = indeterminate;
    }
    onChange && onChange(event);
  }, [defaultIndeterminate, indeterminate, restProps.checked, onChange, inputRef]);
  if (IS_DEV) {
    if (defaultIndeterminate && restProps.defaultChecked) {
      warn("defaultIndeterminate и defaultChecked не могут быть true одновременно", "error");
    }
    if (indeterminate && restProps.checked) {
      warn("indeterminate и checked не могут быть true одновременно", "error");
    }
    if (restProps.defaultChecked && restProps.checked) {
      warn("defaultChecked и checked не могут быть true одновременно", "error");
    }
  }
  return (0, _jsxRuntime.createScopedElement)(_Tappable.Tappable, {
    Component: "label",
    vkuiClass: (0, _classNames.classNames)((0, _getClassName.getClassName)("SimpleCheckbox", platform), "SimpleCheckbox--sizeY-".concat(sizeY)),
    className: className,
    style: style,
    disabled: restProps.disabled,
    activeMode: platform === _platform.VKCOM ? "SimpleCheckbox--active" : "background",
    hoverMode: platform === _platform.VKCOM ? "SimpleCheckbox--hover" : "background",
    activeEffectDelay: platform === _platform.IOS ? 100 : _Tappable.ACTIVE_EFFECT_DELAY,
    getRootRef: getRootRef
  }, (0, _jsxRuntime.createScopedElement)("input", (0, _extends2.default)({}, restProps, {
    onChange: handleChange,
    type: "checkbox",
    vkuiClass: "SimpleCheckbox__input",
    ref: inputRef
  })), (0, _jsxRuntime.createScopedElement)("div", {
    vkuiClass: "SimpleCheckbox__container"
  }, (0, _jsxRuntime.createScopedElement)("div", {
    vkuiClass: "SimpleCheckbox__icon SimpleCheckbox__icon--on"
  }, sizeY === _withAdaptivity.SizeType.COMPACT || platform === _platform.VKCOM ? (0, _jsxRuntime.createScopedElement)(_icons.Icon20CheckBoxOn, null) : (0, _jsxRuntime.createScopedElement)(_icons.Icon24CheckBoxOn, null)), (0, _jsxRuntime.createScopedElement)("div", {
    vkuiClass: "SimpleCheckbox__icon SimpleCheckbox__icon--off"
  }, sizeY === _withAdaptivity.SizeType.COMPACT || platform === _platform.VKCOM ? (0, _jsxRuntime.createScopedElement)(_icons.Icon20CheckBoxOff, null) : (0, _jsxRuntime.createScopedElement)(_icons.Icon24CheckBoxOff, null)), (0, _jsxRuntime.createScopedElement)("div", {
    vkuiClass: "SimpleCheckbox__icon SimpleCheckbox__icon--indeterminate"
  }, (0, _jsxRuntime.createScopedElement)(_icons.Icon20CheckBoxIndetermanate, {
    width: sizeY === _withAdaptivity.SizeType.COMPACT || platform === _platform.VKCOM ? 20 : 24,
    height: sizeY === _withAdaptivity.SizeType.COMPACT || platform === _platform.VKCOM ? 20 : 24
  }))), platform === _platform.VKCOM && (0, _jsxRuntime.createScopedElement)("div", {
    "aria-hidden": true,
    vkuiClass: "SimpleCheckbox__activeShadow"
  }), platform === _platform.VKCOM && (0, _jsxRuntime.createScopedElement)("div", {
    "aria-hidden": true,
    vkuiClass: "SimpleCheckbox__hoverShadow"
  }));
};
exports.SimpleCheckbox = SimpleCheckbox;
//# sourceMappingURL=SimpleCheckbox.js.map