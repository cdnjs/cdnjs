import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
var _excluded = ["header", "children", "className"];
import * as React from 'react';
import { classNames, hasReactNode } from '@vkontakte/vkjs';
import { Subhead } from '../Typography/Subhead/Subhead';
import { Headline } from '../Typography/Headline/Headline';
import "./InfoRow.module.css";
/**
 * @see https://vkcom.github.io/VKUI/#/InfoRow
 */
export var InfoRow = function InfoRow(_ref) {
  var header = _ref.header,
    children = _ref.children,
    className = _ref.className,
    restProps = _objectWithoutProperties(_ref, _excluded);
  return /*#__PURE__*/React.createElement(Headline, _extends({}, restProps, {
    Component: "span",
    className: classNames("vkuiInfoRow", className),
    weight: "3"
  }), hasReactNode(header) && /*#__PURE__*/React.createElement(Subhead, {
    Component: "span",
    className: "vkuiInfoRow__header"
  }, header), children);
};
//# sourceMappingURL=InfoRow.js.map