import * as React from 'react';
import { classNames } from '@vkontakte/vkjs';
export var ARROW_PADDING = 10;
export var ARROW_WIDTH = 20;
export var ARROW_HEIGHT = 8;
function getPositionsStylesByCoords(placement) {
  var coords = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
    x: 0,
    y: 0
  };
  if (placement.startsWith('top')) {
    return {
      top: '100%',
      left: coords.x
    };
  } else if (placement.startsWith('right')) {
    return {
      top: coords.y,
      right: 'calc(100% - 6px)'
    };
  } else if (placement.startsWith('bottom')) {
    return {
      bottom: '100%',
      left: coords.x
    };
  } else {
    return {
      top: coords.y,
      left: 'calc(100% - 6px)'
    };
  }
}
export var PopperArrow = function PopperArrow(_ref) {
  var coords = _ref.coords,
    arrowClassName = _ref.arrowClassName,
    placement = _ref.placement,
    getRootRef = _ref.getRootRef;
  return /*#__PURE__*/React.createElement("div", {
    ref: getRootRef,
    style: getPositionsStylesByCoords(placement, coords),
    className: "vkuiPopperArrow",
    "data-placement": placement
  }, /*#__PURE__*/React.createElement("svg", {
    className: classNames("vkuiPopperArrow__in", arrowClassName),
    width: "20",
    height: "8",
    viewBox: "0 0 20 8",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  }, /*#__PURE__*/React.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M10 0C13 0 15.9999 8 20 8H0C3.9749 8 7 0 10 0Z",
    fill: "currentColor"
  })));
};
//# sourceMappingURL=PopperArrow.js.map