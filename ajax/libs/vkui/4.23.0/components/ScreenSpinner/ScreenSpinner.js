import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
var _excluded = ["style", "className"];
import { createScopedElement } from "../../lib/jsxRuntime";
import Spinner from "../Spinner/Spinner";
import { PopoutWrapper } from "../PopoutWrapper/PopoutWrapper";
import { getClassName } from "../../helpers/getClassName";
import { usePlatform } from "../../hooks/usePlatform";

var ScreenSpinner = function ScreenSpinner(props) {
  var style = props.style,
      className = props.className,
      restProps = _objectWithoutProperties(props, _excluded);

  var platform = usePlatform();
  return createScopedElement(PopoutWrapper, {
    hasMask: false,
    vkuiClass: getClassName('ScreenSpinner', platform),
    className: className,
    style: style
  }, createScopedElement("div", {
    vkuiClass: "ScreenSpinner__container"
  }, createScopedElement(Spinner, _extends({
    vkuiClass: "ScreenSpinner__spinner"
  }, restProps))));
};

ScreenSpinner.defaultProps = {
  'size': 'large',
  'aria-label': 'Пожалуйста, подождите...'
};
export default ScreenSpinner;
//# sourceMappingURL=ScreenSpinner.js.map