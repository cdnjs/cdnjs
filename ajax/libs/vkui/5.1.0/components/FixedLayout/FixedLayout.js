import _extends from "@babel/runtime/helpers/extends";
import _objectSpread from "@babel/runtime/helpers/objectSpread2";
import _slicedToArray from "@babel/runtime/helpers/slicedToArray";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
var _excluded = ["children", "style", "vertical", "getRootRef", "getRef", "filled", "className"];
import * as React from 'react';
import { Platform } from '../../lib/platform';
import { classNames } from '@vkontakte/vkjs';
import { SplitColContext } from '../SplitCol/SplitCol';
import { TooltipContainer } from '../Tooltip/TooltipContainer';
import { useDOM } from '../../lib/dom';
import { useGlobalEventListener } from '../../hooks/useGlobalEventListener';
import { usePlatform } from '../../hooks/usePlatform';
import { useExternRef } from '../../hooks/useExternRef';
/**
 * @see https://vkcom.github.io/VKUI/#/FixedLayout
 */
export var FixedLayout = function FixedLayout(_ref) {
  var children = _ref.children,
    style = _ref.style,
    vertical = _ref.vertical,
    getRootRef = _ref.getRootRef,
    getRef = _ref.getRef,
    filled = _ref.filled,
    className = _ref.className,
    restProps = _objectWithoutProperties(_ref, _excluded);
  var platform = usePlatform();
  var ref = useExternRef(getRootRef, getRef); // TODO: v6 удалить getRef
  var _React$useState = React.useState(undefined),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    width = _React$useState2[0],
    setWidth = _React$useState2[1];
  var _useDOM = useDOM(),
    window = _useDOM.window;
  var _React$useContext = React.useContext(SplitColContext),
    colRef = _React$useContext.colRef;
  var doResize = function doResize() {
    if (colRef !== null && colRef !== void 0 && colRef.current) {
      var computedStyle = getComputedStyle(colRef.current);
      setWidth("".concat(colRef.current.clientWidth - parseFloat(computedStyle.paddingLeft) - parseFloat(computedStyle.paddingRight), "px"));
    } else {
      setWidth(undefined);
    }
  };
  React.useEffect(doResize, [colRef, platform]);
  useGlobalEventListener(window, 'resize', doResize);
  return /*#__PURE__*/React.createElement(TooltipContainer, _extends({}, restProps, {
    fixed: true,
    ref: ref,
    className: classNames("vkuiFixedLayout", platform === Platform.IOS && "vkuiFixedLayout--ios", filled && "vkuiFixedLayout--filled", vertical && styles["FixedLayout--vertical-".concat(vertical)], className),
    style: _objectSpread(_objectSpread({}, style), {}, {
      width: width
    })
  }), children);
};
var styles = {
  "FixedLayout--vertical-top": "vkuiFixedLayout--vertical-top",
  "FixedLayout--vertical-bottom": "vkuiFixedLayout--vertical-bottom"
};
//# sourceMappingURL=FixedLayout.js.map