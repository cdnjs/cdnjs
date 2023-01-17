import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
var _excluded = ["mode", "children", "getRootRef", "className"];
import * as React from 'react';
import { classNames } from '@vkontakte/vkjs';
import "./Card.module.css";
/**
 * @see https://vkcom.github.io/VKUI/#/Card
 */
export var Card = function Card(_ref) {
  var _ref$mode = _ref.mode,
    mode = _ref$mode === void 0 ? 'tint' : _ref$mode,
    children = _ref.children,
    getRootRef = _ref.getRootRef,
    className = _ref.className,
    restProps = _objectWithoutProperties(_ref, _excluded);
  return /*#__PURE__*/React.createElement("div", _extends({}, restProps, {
    ref: getRootRef,
    className: classNames("vkuiCard", styles["Card--mode-".concat(mode)], className)
  }), /*#__PURE__*/React.createElement("div", {
    className: "vkuiCard__in"
  }, children));
};
var styles = {
  "Card--mode-shadow": "vkuiCard--mode-shadow",
  "Card--mode-outline": "vkuiCard--mode-outline",
  "Card--mode-tint": "vkuiCard--mode-tint"
};
//# sourceMappingURL=Card.js.map