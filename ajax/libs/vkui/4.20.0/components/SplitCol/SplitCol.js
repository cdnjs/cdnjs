import _extends from "@babel/runtime/helpers/extends";
import _objectSpread from "@babel/runtime/helpers/objectSpread2";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
var _excluded = ["children", "width", "maxWidth", "minWidth", "spaced", "animate", "fixed", "style"];
import { createScopedElement } from "../../lib/jsxRuntime";
import * as React from 'react';
import { classNames } from "../../lib/classNames";
export var SplitColContext = /*#__PURE__*/React.createContext({
  colRef: null,
  animate: true
});
export var SplitCol = function SplitCol(props) {
  var children = props.children,
      width = props.width,
      maxWidth = props.maxWidth,
      minWidth = props.minWidth,
      spaced = props.spaced,
      animate = props.animate,
      fixed = props.fixed,
      style = props.style,
      restProps = _objectWithoutProperties(props, _excluded);

  var baseRef = React.useRef();
  var contextValue = React.useMemo(function () {
    return {
      colRef: baseRef,
      animate: animate
    };
  }, [baseRef, animate]);
  return createScopedElement("div", _extends({}, restProps, {
    style: _objectSpread(_objectSpread({}, style), {}, {
      width: width,
      maxWidth: maxWidth,
      minWidth: minWidth
    }),
    ref: baseRef,
    vkuiClass: classNames('SplitCol', {
      'SplitCol--spaced': spaced,
      'SplitCol--fixed': fixed
    })
  }), createScopedElement(SplitColContext.Provider, {
    value: contextValue
  }, fixed ? createScopedElement("div", {
    vkuiClass: "SplitCol__fixedInner"
  }, children) : children));
};
SplitCol.defaultProps = {
  animate: false
};
//# sourceMappingURL=SplitCol.js.map