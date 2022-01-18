import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
var _excluded = ["value", "getRootRef"];
import { createScopedElement } from "../../lib/jsxRuntime";
import { getClassName } from "../../helpers/getClassName";
import { usePlatform } from "../../hooks/usePlatform";
import "./Progress.css";

var Progress = function Progress(_ref) {
  var value = _ref.value,
      getRootRef = _ref.getRootRef,
      restProps = _objectWithoutProperties(_ref, _excluded);

  var platform = usePlatform();
  return createScopedElement("div", _extends({
    "aria-valuenow": value
  }, restProps, {
    role: "progressbar",
    "aria-valuemin": 0,
    "aria-valuemax": 100,
    ref: getRootRef,
    vkuiClass: getClassName('Progress', platform)
  }), createScopedElement("div", {
    vkuiClass: "Progress__bg",
    "aria-hidden": "true"
  }), createScopedElement("div", {
    vkuiClass: "Progress__in",
    style: {
      width: "".concat(value, "%")
    },
    "aria-hidden": "true"
  }));
};

Progress.defaultProps = {
  value: 0
};
export default Progress;
//# sourceMappingURL=Progress.js.map