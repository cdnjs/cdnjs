import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
var _excluded = ["children", "size", "spaced", "className"];
import * as React from 'react';
import { classNames } from '@vkontakte/vkjs';
import { getSizeXClassName } from '../../helpers/getSizeXClassName';
import { useAdaptivity } from '../../hooks/useAdaptivity';
import "./CardGrid.module.css";
/**
 * @see https://vkcom.github.io/VKUI/#/CardGrid
 */
export var CardGrid = function CardGrid(_ref) {
  var children = _ref.children,
    _ref$size = _ref.size,
    size = _ref$size === void 0 ? 's' : _ref$size,
    _ref$spaced = _ref.spaced,
    spaced = _ref$spaced === void 0 ? false : _ref$spaced,
    className = _ref.className,
    restProps = _objectWithoutProperties(_ref, _excluded);
  var _useAdaptivity = useAdaptivity(),
    sizeX = _useAdaptivity.sizeX;
  return /*#__PURE__*/React.createElement("div", _extends({}, restProps, {
    className: classNames("vkuiCardGrid", spaced && "vkuiCardGrid--spaced", styles["CardGrid--size-".concat(size)], getSizeXClassName("vkuiCardGrid", sizeX), className)
  }), children);
};
var styles = {
  "CardGrid--size-l": "vkuiCardGrid--size-l",
  "CardGrid--size-m": "vkuiCardGrid--size-m",
  "CardGrid--size-s": "vkuiCardGrid--size-s"
};
//# sourceMappingURL=CardGrid.js.map