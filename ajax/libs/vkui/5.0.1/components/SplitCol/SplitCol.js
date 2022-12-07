import _extends from "@babel/runtime/helpers/extends";
import _objectSpread from "@babel/runtime/helpers/objectSpread2";
import _slicedToArray from "@babel/runtime/helpers/slicedToArray";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
var _excluded = ["children", "width", "maxWidth", "minWidth", "spaced", "animate", "fixed", "style", "autoSpaced", "stretchedOnMobile", "className"];
import * as React from "react";
import { classNamesString } from "../../lib/classNames";
import { getSizeXClassName } from "../../helpers/getSizeXClassName";
import { getViewWidthClassName } from "../../helpers/getViewWidthClassName";
import { useAdaptivity } from "../../hooks/useAdaptivity";
import { BREAKPOINTS, ViewWidth } from "../../lib/adaptivity";
import { useDOM } from "../../lib/dom";
export var SplitColContext = /*#__PURE__*/React.createContext({
  colRef: null,
  animate: true
});
export var useSplitCol = function useSplitCol() {
  return React.useContext(SplitColContext);
};
/**
 * @see https://vkcom.github.io/VKUI/#/SplitCol
 */
export var SplitCol = function SplitCol(props) {
  var children = props.children,
    width = props.width,
    maxWidth = props.maxWidth,
    minWidth = props.minWidth,
    spaced = props.spaced,
    _animate = props.animate,
    fixed = props.fixed,
    style = props.style,
    autoSpaced = props.autoSpaced,
    stretchedOnMobile = props.stretchedOnMobile,
    className = props.className,
    restProps = _objectWithoutProperties(props, _excluded);
  var baseRef = React.useRef(null);
  var _useAdaptivity = useAdaptivity(),
    viewWidth = _useAdaptivity.viewWidth,
    sizeX = _useAdaptivity.sizeX;
  var _React$useState = React.useState(Boolean(_animate)),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    animate = _React$useState2[0],
    setAnimate = _React$useState2[1];
  var _useDOM = useDOM(),
    window = _useDOM.window;
  React.useEffect(function () {
    if (_animate === undefined) {
      setAnimate(viewWidth !== undefined ? viewWidth < ViewWidth.TABLET : window.innerWidth < BREAKPOINTS.SMALL_TABLET);
    } else {
      setAnimate(_animate);
    }
  }, [_animate, viewWidth, window]);
  var contextValue = React.useMemo(function () {
    return {
      colRef: baseRef,
      animate: animate
    };
  }, [baseRef, animate]);
  return /*#__PURE__*/React.createElement("div", _extends({}, restProps, {
    style: _objectSpread(_objectSpread({}, style), {}, {
      width: width,
      maxWidth: maxWidth,
      minWidth: minWidth
    }),
    ref: baseRef,
    className: classNamesString("vkuiSplitCol", getSizeXClassName("vkuiSplitCol", sizeX), getViewWidthClassName("vkuiSplitCol", viewWidth), spaced && "vkuiSplitCol--spaced", spaced === undefined && "vkuiSplitCol--spaced-none", autoSpaced && "vkuiSplitCol--spaced-auto", fixed && "vkuiSplitCol--fixed", stretchedOnMobile && "vkuiSplitCol--stretched-on-mobile", className)
  }), /*#__PURE__*/React.createElement(SplitColContext.Provider, {
    value: contextValue
  }, fixed ? /*#__PURE__*/React.createElement("div", {
    className: "vkuiSplitCol__fixedInner"
  }, children) : children));
};
//# sourceMappingURL=SplitCol.js.map