import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
var _excluded = ["style", "className", "getRef", "getRootRef", "sizeY"];
import { createScopedElement } from "../../lib/jsxRuntime";
import { getClassName } from "../../helpers/getClassName";
import { classNames } from "../../lib/classNames";
import { usePlatform } from "../../hooks/usePlatform";
import { withAdaptivity } from "../../hoc/withAdaptivity";
import { useExternRef } from "../../hooks/useExternRef";
export var Switch = withAdaptivity(function (_ref) {
  var style = _ref.style,
      className = _ref.className,
      getRef = _ref.getRef,
      getRootRef = _ref.getRootRef,
      sizeY = _ref.sizeY,
      restProps = _objectWithoutProperties(_ref, _excluded);

  var platform = usePlatform();
  var inputRef = useExternRef(getRef);
  return createScopedElement("label", {
    vkuiClass: classNames(getClassName('Switch', platform), "Switch--sizeY-".concat(sizeY)),
    className: className,
    style: style,
    ref: getRootRef
  }, createScopedElement("input", _extends({}, restProps, {
    type: "checkbox",
    vkuiClass: "Switch__self",
    ref: inputRef
  })), createScopedElement("span", {
    vkuiClass: "Switch__pseudo"
  }));
}, {
  sizeY: true
});
//# sourceMappingURL=Switch.js.map