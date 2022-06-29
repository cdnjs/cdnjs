"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Textarea = void 0;

var _jsxRuntime = require("../../lib/jsxRuntime");

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var React = _interopRequireWildcard(require("react"));

var _classNames = require("../../lib/classNames");

var _FormField = require("../FormField/FormField");

var _withAdaptivity = require("../../hoc/withAdaptivity");

var _useEnsuredControl3 = require("../../hooks/useEnsuredControl");

var _useExternRef = require("../../hooks/useExternRef");

var _excluded = ["defaultValue", "grow", "style", "onResize", "className", "getRootRef", "getRef", "sizeY", "rows", "maxHeight"];

/**
 * @see https://vkcom.github.io/VKUI/#/Textarea
 */
var TextareaComponent = function TextareaComponent(_ref) {
  var _ref$defaultValue = _ref.defaultValue,
      defaultValue = _ref$defaultValue === void 0 ? "" : _ref$defaultValue,
      _ref$grow = _ref.grow,
      grow = _ref$grow === void 0 ? true : _ref$grow,
      style = _ref.style,
      onResize = _ref.onResize,
      className = _ref.className,
      getRootRef = _ref.getRootRef,
      getRef = _ref.getRef,
      sizeY = _ref.sizeY,
      _ref$rows = _ref.rows,
      rows = _ref$rows === void 0 ? 2 : _ref$rows,
      maxHeight = _ref.maxHeight,
      restProps = (0, _objectWithoutProperties2.default)(_ref, _excluded);

  var _useEnsuredControl = (0, _useEnsuredControl3.useEnsuredControl)(restProps, {
    defaultValue: defaultValue
  }),
      _useEnsuredControl2 = (0, _slicedToArray2.default)(_useEnsuredControl, 2),
      value = _useEnsuredControl2[0],
      onChange = _useEnsuredControl2[1];

  var currentScrollHeight = React.useRef();
  var elementRef = (0, _useExternRef.useExternRef)(getRef); // autosize input

  React.useEffect(function () {
    var el = elementRef.current;

    if (grow && el !== null && el !== void 0 && el.offsetParent) {
      el.style.height = "";
      el.style.height = "".concat(el.scrollHeight, "px");

      if (el.scrollHeight !== currentScrollHeight.current && onResize) {
        onResize(el);
        currentScrollHeight.current = el.scrollHeight;
      }
    }
  }, [grow, value, sizeY, elementRef, onResize]);
  return (0, _jsxRuntime.createScopedElement)(_FormField.FormField, {
    vkuiClass: (0, _classNames.classNames)("Textarea", // TODO. v5.0.0 Новая адаптивность
    "Textarea--sizeY-".concat(sizeY)),
    className: className,
    style: style,
    getRootRef: getRootRef,
    disabled: restProps.disabled
  }, (0, _jsxRuntime.createScopedElement)("textarea", (0, _extends2.default)({}, restProps, {
    style: {
      maxHeight: maxHeight
    },
    rows: rows,
    vkuiClass: "Textarea__el",
    value: value,
    onChange: onChange,
    ref: elementRef
  })));
}; // eslint-disable-next-line import/no-default-export


var Textarea = (0, _withAdaptivity.withAdaptivity)(TextareaComponent, {
  sizeY: true
});
exports.Textarea = Textarea;
//# sourceMappingURL=Textarea.js.map