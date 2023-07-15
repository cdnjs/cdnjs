import _extends from "@babel/runtime/helpers/extends";
import _objectSpread from "@babel/runtime/helpers/objectSpread2";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
var _excluded = ["children", "width", "maxWidth", "minWidth", "spaced", "animate", "fixed", "style"];
import { createScopedElement } from "../../lib/jsxRuntime";
import * as React from "react";
import { useScrollLockEffect } from "../AppRoot/ScrollContext";
import { classNames } from "../../lib/classNames";
import { noop } from "../../lib/utils";
import "./SplitCol.css";
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
export var SplitCol = function SplitCol(_ref) {
  var children = _ref.children,
    width = _ref.width,
    maxWidth = _ref.maxWidth,
    minWidth = _ref.minWidth,
    spaced = _ref.spaced,
    _ref$animate = _ref.animate,
    animate = _ref$animate === void 0 ? false : _ref$animate,
    fixed = _ref.fixed,
    style = _ref.style,
    restProps = _objectWithoutProperties(_ref, _excluded);
  var baseRef = React.useRef(null);
  var fixedInnerRef = React.useRef(null);
  var contextValue = React.useMemo(function () {
    return {
      colRef: baseRef,
      animate: animate
    };
  }, [baseRef, animate]);
  useScrollLockEffect(function () {
    var fixedInner = fixedInnerRef.current;
    if (!fixedInner) {
      return noop;
    }
    fixedInner.style.top = "".concat(fixedInner.offsetTop, "px");
    return function () {
      fixedInner.style.top = "";
    };
  }, [fixedInnerRef.current]);
  return createScopedElement("div", _extends({}, restProps, {
    style: _objectSpread(_objectSpread({}, style), {}, {
      width: width,
      maxWidth: maxWidth,
      minWidth: minWidth
    }),
    ref: baseRef,
    vkuiClass: classNames("SplitCol", spaced && "SplitCol--spaced", fixed && "SplitCol--fixed")
  }), createScopedElement(SplitColContext.Provider, {
    value: contextValue
  }, fixed ? createScopedElement("div", {
    ref: fixedInnerRef,
    vkuiClass: "SplitCol__fixedInner"
  }, children) : children));
};
//# sourceMappingURL=SplitCol.js.map