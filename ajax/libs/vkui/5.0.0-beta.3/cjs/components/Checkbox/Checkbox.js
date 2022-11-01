"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Checkbox = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));
var React = _interopRequireWildcard(require("react"));
var _Tappable = require("../Tappable/Tappable");
var _classNames = require("../../lib/classNames");
var _platform = require("../../lib/platform");
var _icons = require("@vkontakte/icons");
var _usePlatform = require("../../hooks/usePlatform");
var _utils = require("../../lib/utils");
var _Footnote = require("../Typography/Footnote/Footnote");
var _getSizeYClassName = require("../../helpers/getSizeYClassName");
var _useAdaptivity2 = require("../../hooks/useAdaptivity");
var _useExternRef = require("../../hooks/useExternRef");
var _SizeYConditionalRender = require("../SizeYConditionalRender/SizeYConditionalRender");
var _VisuallyHiddenInput = require("../VisuallyHiddenInput/VisuallyHiddenInput");
var _warnOnce = require("../../lib/warnOnce");
var _excluded = ["children", "className", "style", "getRootRef", "getRef", "description", "indeterminate", "defaultIndeterminate", "onChange"];
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
    onChange = _ref.onChange,
    restProps = (0, _objectWithoutProperties2.default)(_ref, _excluded);
  var inputRef = (0, _useExternRef.useExternRef)(getRef);
  var platform = (0, _usePlatform.usePlatform)();
  var _useAdaptivity = (0, _useAdaptivity2.useAdaptivity)(),
    sizeY = _useAdaptivity.sizeY;
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
  return /*#__PURE__*/React.createElement(_Tappable.Tappable, {
    Component: "label",
    className: (0, _classNames.classNamesString)("vkuiCheckbox", platform === _platform.Platform.VKCOM && "vkuiCheckbox--vkcom", (0, _getSizeYClassName.getSizeYClassName)("vkuiCheckbox", sizeY), !((0, _utils.hasReactNode)(children) || (0, _utils.hasReactNode)(description)) && "vkuiCheckbox--simple", className),
    style: style,
    disabled: restProps.disabled,
    activeEffectDelay: platform === _platform.Platform.IOS ? 100 : _Tappable.ACTIVE_EFFECT_DELAY,
    getRootRef: getRootRef
  }, /*#__PURE__*/React.createElement(_VisuallyHiddenInput.VisuallyHiddenInput, (0, _extends2.default)({}, restProps, {
    onChange: handleChange,
    type: "checkbox",
    className: "vkuiCheckbox__input",
    getRef: inputRef
  })), /*#__PURE__*/React.createElement("div", {
    className: (0, _classNames.classNamesString)("vkuiCheckbox__icon", "vkuiCheckbox__icon--on")
  }, platform === _platform.Platform.VKCOM ? /*#__PURE__*/React.createElement(_icons.Icon20CheckBoxOn, {
    "aria-hidden": true
  }) : /*#__PURE__*/React.createElement(_SizeYConditionalRender.SizeYConditionalRender, {
    compact: /*#__PURE__*/React.createElement(_icons.Icon20CheckBoxOn, {
      "aria-hidden": true
    }),
    regular: /*#__PURE__*/React.createElement(_icons.Icon24CheckBoxOn, {
      "aria-hidden": true
    })
  })), /*#__PURE__*/React.createElement("div", {
    className: (0, _classNames.classNamesString)("vkuiCheckbox__icon", "vkuiCheckbox__icon--off")
  }, platform === _platform.Platform.VKCOM ? /*#__PURE__*/React.createElement(_icons.Icon20CheckBoxOff, {
    "aria-hidden": true
  }) : /*#__PURE__*/React.createElement(_SizeYConditionalRender.SizeYConditionalRender, {
    compact: /*#__PURE__*/React.createElement(_icons.Icon20CheckBoxOff, {
      "aria-hidden": true
    }),
    regular: /*#__PURE__*/React.createElement(_icons.Icon24CheckBoxOff, {
      "aria-hidden": true
    })
  })), /*#__PURE__*/React.createElement("div", {
    className: (0, _classNames.classNamesString)("vkuiCheckbox__icon", "vkuiCheckbox__icon--indeterminate")
  }, platform === _platform.Platform.VKCOM ? /*#__PURE__*/React.createElement(_icons.Icon20CheckBoxIndetermanate, {
    "aria-hidden": true,
    width: 20,
    height: 20
  }) : /*#__PURE__*/React.createElement(_SizeYConditionalRender.SizeYConditionalRender, {
    compact: /*#__PURE__*/React.createElement(_icons.Icon20CheckBoxIndetermanate, {
      "aria-hidden": true,
      width: 20,
      height: 20
    }),
    regular: /*#__PURE__*/React.createElement(_icons.Icon20CheckBoxIndetermanate, {
      "aria-hidden": true,
      width: 24,
      height: 24
    })
  })), /*#__PURE__*/React.createElement("div", {
    className: "vkuiCheckbox__content"
  }, /*#__PURE__*/React.createElement("div", {
    className: "vkuiCheckbox__children"
  }, children), (0, _utils.hasReactNode)(description) && /*#__PURE__*/React.createElement(_Footnote.Footnote, {
    className: "vkuiCheckbox__description"
  }, description)));
};
exports.Checkbox = Checkbox;
//# sourceMappingURL=Checkbox.js.map