"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.Checkbox = void 0;

var _jsxRuntime = require("../../lib/jsxRuntime");

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var React = _interopRequireWildcard(require("react"));

var _Tappable = require("../Tappable/Tappable");

var _classNames = require("../../lib/classNames");

var _platform = require("../../lib/platform");

var _icons = require("@vkontakte/icons");

var _usePlatform = require("../../hooks/usePlatform");

var _withAdaptivity = require("../../hoc/withAdaptivity");

var _Text = require("../Typography/Text/Text");

var _utils = require("../../lib/utils");

var _Caption = require("../Typography/Caption/Caption");

var _useExternRef = require("../../hooks/useExternRef");

var _VisuallyHiddenInput = require("../VisuallyHiddenInput/VisuallyHiddenInput");

var _warnOnce = require("../../lib/warnOnce");

var _excluded = ["children", "className", "style", "getRootRef", "getRef", "description", "indeterminate", "defaultIndeterminate", "sizeY", "onChange"];
var warn = (0, _warnOnce.warnOnce)("Checkbox");
/**
 * @see https://vkcom.github.io/VKUI/#/Checkbox
 */

var Checkbox = function Checkbox(_ref) {
  var children = _ref.children,
      className = _ref.className,
      style = _ref.style,
      getRootRef = _ref.getRootRef,
      getRef = _ref.getRef,
      description = _ref.description,
      indeterminate = _ref.indeterminate,
      defaultIndeterminate = _ref.defaultIndeterminate,
      sizeY = _ref.sizeY,
      onChange = _ref.onChange,
      restProps = (0, _objectWithoutProperties2.default)(_ref, _excluded);
  var inputRef = (0, _useExternRef.useExternRef)(getRef);
  var platform = (0, _usePlatform.usePlatform)();
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

  if (process.env.NODE_ENV === "development") {
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
    vkuiClass: (0, _classNames.classNames)("Checkbox", "Checkbox--sizeY-".concat(sizeY), !((0, _utils.hasReactNode)(children) || (0, _utils.hasReactNode)(description)) && "Checkbox--simple"),
    className: className,
    style: style,
    disabled: restProps.disabled,
    activeEffectDelay: platform === _platform.IOS ? 100 : _Tappable.ACTIVE_EFFECT_DELAY,
    getRootRef: getRootRef
  }, (0, _jsxRuntime.createScopedElement)(_VisuallyHiddenInput.VisuallyHiddenInput, (0, _extends2.default)({}, restProps, {
    onChange: handleChange,
    type: "checkbox",
    vkuiClass: "Checkbox__input",
    getRef: inputRef
  })), (0, _jsxRuntime.createScopedElement)("div", {
    vkuiClass: "Checkbox__icon Checkbox__icon--on"
  }, sizeY === _withAdaptivity.SizeType.COMPACT || platform === _platform.VKCOM ? (0, _jsxRuntime.createScopedElement)(_icons.Icon20CheckBoxOn, {
    "aria-hidden": true
  }) : (0, _jsxRuntime.createScopedElement)(_icons.Icon24CheckBoxOn, {
    "aria-hidden": true
  })), (0, _jsxRuntime.createScopedElement)("div", {
    vkuiClass: "Checkbox__icon Checkbox__icon--off"
  }, sizeY === _withAdaptivity.SizeType.COMPACT || platform === _platform.VKCOM ? (0, _jsxRuntime.createScopedElement)(_icons.Icon20CheckBoxOff, {
    "aria-hidden": true
  }) : (0, _jsxRuntime.createScopedElement)(_icons.Icon24CheckBoxOff, {
    "aria-hidden": true
  })), (0, _jsxRuntime.createScopedElement)("div", {
    vkuiClass: "Checkbox__icon Checkbox__icon--indeterminate"
  }, (0, _jsxRuntime.createScopedElement)(_icons.Icon20CheckBoxIndetermanate, {
    "aria-hidden": true,
    width: sizeY === _withAdaptivity.SizeType.COMPACT || platform === _platform.VKCOM ? 20 : 24,
    height: sizeY === _withAdaptivity.SizeType.COMPACT || platform === _platform.VKCOM ? 20 : 24
  })), (0, _jsxRuntime.createScopedElement)(_Text.Text, {
    vkuiClass: "Checkbox__content",
    Component: "div"
  }, (0, _jsxRuntime.createScopedElement)("div", {
    vkuiClass: "Checkbox__children"
  }, children), (0, _utils.hasReactNode)(description) && (0, _jsxRuntime.createScopedElement)(_Caption.Caption, {
    vkuiClass: "Checkbox__description"
  }, description)));
}; // eslint-disable-next-line import/no-default-export


exports.Checkbox = Checkbox;

var _default = (0, _withAdaptivity.withAdaptivity)(Checkbox, {
  sizeY: true
});

exports.default = _default;
//# sourceMappingURL=Checkbox.js.map