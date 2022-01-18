import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
var _excluded = ["size", "platform"],
    _excluded2 = ["mode", "size", "children"];
import { createScopedElement } from "../../lib/jsxRuntime";
import * as React from 'react';
import { classNames } from "../../lib/classNames";
import { getClassName } from "../../helpers/getClassName";
import { usePlatform } from "../../hooks/usePlatform";
import Caption from "../Typography/Caption/Caption";
import Text from "../Typography/Text/Text";
import { VKCOM } from "../../lib/platform";
import { hasReactNode } from "../../lib/utils";

var CounterTypography = function CounterTypography(_ref) {
  var size = _ref.size,
      platform = _ref.platform,
      restProps = _objectWithoutProperties(_ref, _excluded);

  return size === 's' ? createScopedElement(Caption, _extends({
    level: "2",
    weight: platform === VKCOM ? 'medium' : 'regular'
  }, restProps)) : createScopedElement(Text, _extends({
    weight: "medium"
  }, restProps));
};

var Counter = function Counter(props) {
  var mode = props.mode,
      size = props.size,
      children = props.children,
      restProps = _objectWithoutProperties(props, _excluded2);

  var platform = usePlatform();

  if (React.Children.count(children) === 0) {
    return null;
  }

  return createScopedElement("span", _extends({}, restProps, {
    vkuiClass: classNames(getClassName('Counter', platform), "Counter--".concat(mode), "Counter--s-".concat(size))
  }), hasReactNode(children) && createScopedElement(CounterTypography, {
    platform: platform,
    size: size,
    vkuiClass: "Counter__in"
  }, children));
};

Counter.defaultProps = {
  mode: 'secondary',
  size: 'm'
};
export default /*#__PURE__*/React.memo(Counter);
//# sourceMappingURL=Counter.js.map