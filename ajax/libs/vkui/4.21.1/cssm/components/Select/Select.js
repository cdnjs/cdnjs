import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
var _excluded = ["hasMouse"],
    _excluded2 = ["children"],
    _excluded3 = ["options", "popupDirection", "renderOption"];
import { createScopedElement } from "../../lib/jsxRuntime";
import NativeSelect from "../NativeSelect/NativeSelect";
import CustomSelect from "../CustomSelect/CustomSelect";
import { withAdaptivity } from "../../hoc/withAdaptivity";

var Select = function Select(_ref) {
  var hasMouse = _ref.hasMouse,
      props = _objectWithoutProperties(_ref, _excluded);

  // Use custom select if device has connected a mouse
  if (hasMouse) {
    var children = props.children,
        _restProps = _objectWithoutProperties(props, _excluded2);

    return createScopedElement(CustomSelect, _restProps);
  }

  var _props$options = props.options,
      options = _props$options === void 0 ? [] : _props$options,
      popupDirection = props.popupDirection,
      renderOption = props.renderOption,
      restProps = _objectWithoutProperties(props, _excluded3);

  return createScopedElement(NativeSelect, restProps, options.map(function (_ref2) {
    var label = _ref2.label,
        value = _ref2.value;
    return createScopedElement("option", {
      value: value,
      key: "".concat(value)
    }, label);
  }));
};

export default withAdaptivity(Select, {
  hasMouse: true
});
//# sourceMappingURL=Select.js.map