import _extends from "@babel/runtime/helpers/extends";
import _objectSpread from "@babel/runtime/helpers/objectSpread2";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
import _slicedToArray from "@babel/runtime/helpers/slicedToArray";
var _excluded = ["children", "width", "maxWidth", "minWidth", "spaced", "animate", "fixed", "style", "autoSpaced", "stretchedOnMobile", "className"];
import * as React from 'react';
import { classNames } from '@vkontakte/vkjs';
import { getSizeXClassName } from '../../helpers/getSizeXClassName';
import { getViewWidthClassName } from '../../helpers/getViewWidthClassName';
import { useAdaptivity } from '../../hooks/useAdaptivity';
import { ViewWidth } from '../../lib/adaptivity';
import { useObjectMemo } from '../../hooks/useObjectMemo';
import { useMediaQueries } from '../../hooks/useMediaQueries';
import { matchMediaListAddListener, matchMediaListRemoveListener } from '../../lib/matchMedia';
import "./SplitCol.module.css";
function useTransitionAnimate(animateProp) {
  var _useAdaptivity = useAdaptivity(),
    viewWidth = _useAdaptivity.viewWidth;
  var _React$useState = React.useState(Boolean(animateProp)),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    animate = _React$useState2[0],
    setAnimate = _React$useState2[1];
  var mediaQueries = useMediaQueries();
  React.useEffect(function () {
    if (animateProp !== undefined) {
      setAnimate(animateProp);
      return;
    }
    if (viewWidth !== undefined) {
      setAnimate(viewWidth < ViewWidth.TABLET);
      return;
    }

    // eslint-disable-next-line no-restricted-properties
    var listener = function listener() {
      return setAnimate(!mediaQueries.smallTabletPlus.matches);
    };
    listener();
    matchMediaListAddListener(mediaQueries.smallTabletPlus, listener);
    return function () {
      matchMediaListRemoveListener(mediaQueries.smallTabletPlus, listener);
    };
  }, [animateProp, viewWidth, mediaQueries]);
  return animate;
}
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
    animateProp = props.animate,
    fixed = props.fixed,
    style = props.style,
    autoSpaced = props.autoSpaced,
    stretchedOnMobile = props.stretchedOnMobile,
    className = props.className,
    restProps = _objectWithoutProperties(props, _excluded);
  var baseRef = React.useRef(null);
  var _useAdaptivity2 = useAdaptivity(),
    viewWidth = _useAdaptivity2.viewWidth,
    sizeX = _useAdaptivity2.sizeX;
  var animate = useTransitionAnimate(animateProp);
  var contextValue = useObjectMemo({
    colRef: baseRef,
    animate: animate
  });
  return /*#__PURE__*/React.createElement("div", _extends({}, restProps, {
    style: _objectSpread(_objectSpread({}, style), {}, {
      width: width,
      maxWidth: maxWidth,
      minWidth: minWidth
    }),
    ref: baseRef,
    className: classNames("vkuiSplitCol", getSizeXClassName("vkuiSplitCol", sizeX), getViewWidthClassName("vkuiSplitCol", viewWidth), spaced && "vkuiSplitCol--spaced", spaced === undefined && "vkuiSplitCol--spaced-none", autoSpaced && "vkuiSplitCol--spaced-auto", fixed && "vkuiSplitCol--fixed", stretchedOnMobile && "vkuiSplitCol--stretched-on-mobile", className)
  }), /*#__PURE__*/React.createElement(SplitColContext.Provider, {
    value: contextValue
  }, fixed ? /*#__PURE__*/React.createElement("div", {
    className: "vkuiSplitCol__fixedInner"
  }, children) : children));
};
//# sourceMappingURL=SplitCol.js.map