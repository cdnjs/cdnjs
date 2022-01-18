"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _jsxRuntime = require("../../lib/jsxRuntime");

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _getClassName = require("../../helpers/getClassName");

var _Button = _interopRequireDefault(require("../Button/Button"));

var _usePlatform = require("../../hooks/usePlatform");

var _useExternRef = require("../../hooks/useExternRef");

var _excluded = ["children", "align", "controlSize", "mode", "stretched", "before", "className", "style", "getRef", "getRootRef", "onClick"];

var File = function File(props) {
  var children = props.children,
      align = props.align,
      controlSize = props.controlSize,
      mode = props.mode,
      stretched = props.stretched,
      before = props.before,
      className = props.className,
      style = props.style,
      getRef = props.getRef,
      getRootRef = props.getRootRef,
      _onClick = props.onClick,
      restProps = (0, _objectWithoutProperties2.default)(props, _excluded);
  var platform = (0, _usePlatform.usePlatform)();
  var inputRef = (0, _useExternRef.useExternRef)(getRef);
  return (0, _jsxRuntime.createScopedElement)(_Button.default, {
    align: align,
    vkuiClass: (0, _getClassName.getClassName)('File', platform),
    className: className,
    stretched: stretched,
    mode: mode,
    size: controlSize,
    before: before,
    style: style,
    getRootRef: getRootRef,
    disabled: restProps.disabled,
    type: "button",
    onClick: function onClick(e) {
      inputRef.current.click();
      _onClick && _onClick(e);
    }
  }, (0, _jsxRuntime.createScopedElement)("input", (0, _extends2.default)({}, restProps, {
    vkuiClass: "File__input",
    type: "file",
    ref: inputRef
  })), children);
};

File.defaultProps = {
  children: 'Выберите файл',
  align: 'left'
};
var _default = File;
exports.default = _default;
//# sourceMappingURL=File.js.map