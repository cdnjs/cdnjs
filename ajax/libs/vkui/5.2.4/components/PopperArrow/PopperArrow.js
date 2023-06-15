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
var DEFAULT_ARROW_WIDTH = 20;
var DEFAULT_ARROW_HEIGHT = 8;

/**
 * Примечание 1.
 *
 * В компоненте, SVG элемент `<path />` представляет собой стрелку с платформой в виде прямоугольника в 1px. Платформа
 * служит для исправления проблемы с белой полоской между контентом и стрелкой, которая зачастую проявляется при
 * изменении масштаба страницы.
 *
 * Чтобы исправление сработало нужно:
 * 1. Прибавить высоту платформы к `height` и `viewBox` SVG контейнера.
 * 2. Сместить положение SVG контейнера на высоту платформы – сделано в CSS через `translateY(1px)`.
 *
 * https://github.com/VKCOM/VKUI/issues/2123
 */
var PLATFORM_HEIGHT = 1;
var ARROW_HEIGHT_WITH_WHITE_SPACE = DEFAULT_ARROW_HEIGHT + PLATFORM_HEIGHT;
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
    width: DEFAULT_ARROW_WIDTH,
    height: ARROW_HEIGHT_WITH_WHITE_SPACE,
    viewBox: "0 0 ".concat(DEFAULT_ARROW_WIDTH, " ").concat(ARROW_HEIGHT_WITH_WHITE_SPACE),
    xmlns: "http://www.w3.org/2000/svg"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M10 0c3 0 6 8 10 8v1H0V8c3.975 0 7-8 10-8Z",
    fill: "currentColor"
  })));
};
//# sourceMappingURL=PopperArrow.js.map