import _extends from "@babel/runtime/helpers/extends";
import _objectSpread from "@babel/runtime/helpers/objectSpread2";
import _slicedToArray from "@babel/runtime/helpers/slicedToArray";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
var _excluded = ["children", "style", "vertical", "getRootRef", "getRef", "filled"];
import { createScopedElement } from "../../lib/jsxRuntime";
import * as React from "react";
import { getClassName } from "../../helpers/getClassName";
import { classNames } from "../../lib/classNames";
import { SplitColContext } from "../SplitCol/SplitCol";
import { TooltipContainer } from "../Tooltip/TooltipContainer";
import { useDOM } from "../../lib/dom";
import { useGlobalEventListener } from "../../hooks/useGlobalEventListener";
import { usePlatform } from "../../hooks/usePlatform";

var FixedLayout = function FixedLayout(_ref) {
  var children = _ref.children,
      style = _ref.style,
      vertical = _ref.vertical,
      getRootRef = _ref.getRootRef,
      getRef = _ref.getRef,
      filled = _ref.filled,
      restProps = _objectWithoutProperties(_ref, _excluded);

  var platform = usePlatform();

  var _React$useState = React.useState(undefined),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      width = _React$useState2[0],
      setWidth = _React$useState2[1];

  var _useDOM = useDOM(),
      window = _useDOM.window;

  var _React$useContext = React.useContext(SplitColContext),
      colRef = _React$useContext.colRef;

  var doResize = function doResize() {
    return setWidth(colRef !== null && colRef !== void 0 && colRef.current ? "".concat(colRef.current.offsetWidth, "px") : undefined);
  };

  React.useEffect(doResize, [colRef]);
  useGlobalEventListener(window, "resize", doResize);
  return createScopedElement(TooltipContainer, _extends({}, restProps, {
    fixed: true,
    ref: getRootRef,
    vkuiClass: classNames(getClassName("FixedLayout", platform), {
      "FixedLayout--filled": filled
    }, "FixedLayout--".concat(vertical)),
    style: _objectSpread(_objectSpread({}, style), {}, {
      width: width
    })
  }), createScopedElement("div", {
    vkuiClass: "FixedLayout__in",
    ref: getRef
  }, children));
}; // eslint-disable-next-line import/no-default-export


export default FixedLayout;
//# sourceMappingURL=FixedLayout.js.map