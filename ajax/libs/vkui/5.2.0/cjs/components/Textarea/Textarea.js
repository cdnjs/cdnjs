"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Textarea = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));
var React = _interopRequireWildcard(require("react"));
var _vkjs = require("@vkontakte/vkjs");
var _FormField = require("../FormField/FormField");
var _useEnsuredControl3 = require("../../hooks/useEnsuredControl");
var _useExternRef = require("../../hooks/useExternRef");
var _useAdaptivity2 = require("../../hooks/useAdaptivity");
var _getSizeYClassName = require("../../helpers/getSizeYClassName");
var _excluded = ["defaultValue", "grow", "style", "onResize", "className", "getRootRef", "getRef", "rows", "maxHeight", "status", "onChange", "value"];
/**
 * @see https://vkcom.github.io/VKUI/#/Textarea
 */
var Textarea = function Textarea(_ref) {
  var _ref$defaultValue = _ref.defaultValue,
    defaultValue = _ref$defaultValue === void 0 ? '' : _ref$defaultValue,
    _ref$grow = _ref.grow,
    grow = _ref$grow === void 0 ? true : _ref$grow,
    style = _ref.style,
    onResize = _ref.onResize,
    className = _ref.className,
    getRootRef = _ref.getRootRef,
    getRef = _ref.getRef,
    _ref$rows = _ref.rows,
    rows = _ref$rows === void 0 ? 2 : _ref$rows,
    maxHeight = _ref.maxHeight,
    status = _ref.status,
    onChangeProp = _ref.onChange,
    valueProp = _ref.value,
    restProps = (0, _objectWithoutProperties2.default)(_ref, _excluded);
  var _useEnsuredControl = (0, _useEnsuredControl3.useEnsuredControl)({
      defaultValue: defaultValue,
      onChange: onChangeProp,
      value: valueProp
    }),
    _useEnsuredControl2 = (0, _slicedToArray2.default)(_useEnsuredControl, 2),
    value = _useEnsuredControl2[0],
    onChange = _useEnsuredControl2[1];
  var currentScrollHeight = React.useRef();
  var elementRef = (0, _useExternRef.useExternRef)(getRef);
  var _useAdaptivity = (0, _useAdaptivity2.useAdaptivity)(),
    sizeY = _useAdaptivity.sizeY;

  // autosize input
  React.useEffect(function () {
    var el = elementRef.current;
    if (grow && el !== null && el !== void 0 && el.offsetParent) {
      el.style.height = '';
      el.style.height = "".concat(el.scrollHeight, "px");
      if (el.scrollHeight !== currentScrollHeight.current && onResize) {
        onResize(el);
        currentScrollHeight.current = el.scrollHeight;
      }
    }
  }, [grow, value, sizeY, elementRef, onResize]);
  return /*#__PURE__*/React.createElement(_FormField.FormField, {
    className: (0, _vkjs.classNames)("vkuiTextarea", (0, _getSizeYClassName.getSizeYClassName)("vkuiTextarea", sizeY), className),
    style: style,
    getRootRef: getRootRef,
    disabled: restProps.disabled,
    status: status
  }, /*#__PURE__*/React.createElement("textarea", (0, _extends2.default)({}, restProps, {
    style: {
      maxHeight: maxHeight
    },
    rows: rows,
    className: "vkuiTextarea__el",
    value: value,
    onChange: onChange,
    ref: elementRef
  })));
};
exports.Textarea = Textarea;
//# sourceMappingURL=Textarea.js.map