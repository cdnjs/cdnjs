import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
var _excluded = ["value", "getRootRef"];
import { createScopedElement } from "../../lib/jsxRuntime";
import { getClassName } from "../../helpers/getClassName";
import { usePlatform } from "../../hooks/usePlatform";
var PROGRESS_MIN_VALUE = 0;
var PROGRESS_MAX_VALUE = 100;

var Progress = function Progress(_ref) {
  var _ref$value = _ref.value,
      value = _ref$value === void 0 ? 0 : _ref$value,
      getRootRef = _ref.getRootRef,
      restProps = _objectWithoutProperties(_ref, _excluded);

  var platform = usePlatform();
  var progress = Math.max(PROGRESS_MIN_VALUE, Math.min(value, PROGRESS_MAX_VALUE));
  return createScopedElement("div", _extends({
    "aria-valuenow": value
  }, restProps, {
    role: "progressbar",
    "aria-valuemin": PROGRESS_MIN_VALUE,
    "aria-valuemax": PROGRESS_MAX_VALUE,
    ref: getRootRef,
    vkuiClass: getClassName("Progress", platform)
  }), createScopedElement("div", {
    vkuiClass: "Progress__bg",
    "aria-hidden": "true"
  }), createScopedElement("div", {
    vkuiClass: "Progress__in",
    style: {
      width: "".concat(progress, "%")
    },
    "aria-hidden": "true"
  }));
}; // eslint-disable-next-line import/no-default-export


export default Progress;
//# sourceMappingURL=Progress.js.map