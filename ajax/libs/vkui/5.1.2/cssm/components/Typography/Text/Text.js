import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
var _excluded = ["className", "children", "weight", "Component", "getRootRef"];
import * as React from 'react';
import { useAdaptivity } from '../../../hooks/useAdaptivity';
import { classNames } from '@vkontakte/vkjs';
import { warnOnce } from '../../../lib/warnOnce';
import { getSizeYClassName } from '../../../helpers/getSizeYClassName';
import "./Text.module.css";
var warn = warnOnce('Text');
/**
 * @see https://vkcom.github.io/VKUI/#/Text
 */
export var Text = function Text(_ref) {
  var className = _ref.className,
    children = _ref.children,
    weight = _ref.weight,
    _ref$Component = _ref.Component,
    Component = _ref$Component === void 0 ? 'span' : _ref$Component,
    getRootRef = _ref.getRootRef,
    restProps = _objectWithoutProperties(_ref, _excluded);
  if (process.env.NODE_ENV === 'development' && typeof Component !== 'string' && getRootRef) {
    warn("\u0421\u0432\u043E\u0439\u0441\u0442\u0432\u043E \"getRootRef\" \u043C\u043E\u0436\u0435\u0442 \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u044C\u0441\u044F \u0442\u043E\u043B\u044C\u043A\u043E \u0441 \u043A\u043E\u043C\u043F\u043E\u043D\u0435\u043D\u0442\u0430\u043C\u0438 DOM", 'error');
  }
  var _useAdaptivity = useAdaptivity(),
    sizeY = _useAdaptivity.sizeY;
  return /*#__PURE__*/React.createElement(Component, _extends({}, restProps, {
    ref: getRootRef,
    className: classNames(className, "vkuiText", getSizeYClassName("vkuiText", sizeY), weight && styles["Text--weight-".concat(weight)])
  }), children);
};
var styles = {
  "Text--weight-1": "vkuiText--weight-1",
  "Text--weight-2": "vkuiText--weight-2",
  "Text--weight-3": "vkuiText--weight-3"
};
//# sourceMappingURL=Text.js.map