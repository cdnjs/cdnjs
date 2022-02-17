import _extends from "@babel/runtime/helpers/extends";
import _slicedToArray from "@babel/runtime/helpers/slicedToArray";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
var _excluded = ["defaultValue", "grow", "style", "onResize", "className", "getRootRef", "getRef", "sizeY", "rows"];
import { createScopedElement } from "../../lib/jsxRuntime";
import * as React from "react";
import { classNames } from "../../lib/classNames";
import { FormField } from "../FormField/FormField";
import { withAdaptivity } from "../../hoc/withAdaptivity";
import { getClassName } from "../../helpers/getClassName";
import { useEnsuredControl } from "../../hooks/useEnsuredControl";
import { useExternRef } from "../../hooks/useExternRef";
import { usePlatform } from "../../hooks/usePlatform";
import "./Textarea.css";
var Textarea = /*#__PURE__*/React.memo(function (_ref) {
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
      restProps = _objectWithoutProperties(_ref, _excluded);

  var _useEnsuredControl = useEnsuredControl(restProps, {
    defaultValue: defaultValue
  }),
      _useEnsuredControl2 = _slicedToArray(_useEnsuredControl, 2),
      value = _useEnsuredControl2[0],
      onChange = _useEnsuredControl2[1];

  var currentScrollHeight = React.useRef();
  var elementRef = useExternRef(getRef);
  var platform = usePlatform(); // autosize input

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
  return createScopedElement(FormField, {
    vkuiClass: classNames(getClassName("Textarea", platform), "Textarea--sizeY-".concat(sizeY)),
    className: className,
    style: style,
    getRootRef: getRootRef,
    disabled: restProps.disabled
  }, createScopedElement("textarea", _extends({}, restProps, {
    rows: rows,
    vkuiClass: "Textarea__el",
    value: value,
    onChange: onChange,
    ref: elementRef
  })));
}); // eslint-disable-next-line import/no-default-export

export default withAdaptivity(Textarea, {
  sizeY: true
});
//# sourceMappingURL=Textarea.js.map