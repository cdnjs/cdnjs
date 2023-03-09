import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
var _excluded = ["value", "option", "removable", "onRemove", "removeAriaLabel", "before", "after", "children", "className"];
import * as React from 'react';
import { Icon16Cancel } from '@vkontakte/icons';
import { classNames, hasReactNode, noop } from '@vkontakte/vkjs';
import { useAdaptivity } from '../../hooks/useAdaptivity';
import { SizeType } from '../../lib/adaptivity';
import { getTitleFromChildren } from '../../lib/utils';
import { Tappable } from '../Tappable/Tappable';
import { Footnote } from '../Typography/Footnote/Footnote';
var sizeYClassNames = _defineProperty({
  none: "vkuiChip--sizeY-none"
}, SizeType.COMPACT, "vkuiChip--sizeY-compact");
/**
 * @see https://vkcom.github.io/VKUI/#/Chip
 */
export var Chip = function Chip(_ref) {
  var _ref$value = _ref.value,
    value = _ref$value === void 0 ? '' : _ref$value,
    option = _ref.option,
    _ref$removable = _ref.removable,
    removable = _ref$removable === void 0 ? true : _ref$removable,
    _ref$onRemove = _ref.onRemove,
    onRemove = _ref$onRemove === void 0 ? noop : _ref$onRemove,
    _ref$removeAriaLabel = _ref.removeAriaLabel,
    removeAriaLabel = _ref$removeAriaLabel === void 0 ? 'Удалить' : _ref$removeAriaLabel,
    _ref$before = _ref.before,
    before = _ref$before === void 0 ? null : _ref$before,
    after = _ref.after,
    children = _ref.children,
    className = _ref.className,
    restProps = _objectWithoutProperties(_ref, _excluded);
  var _useAdaptivity = useAdaptivity(),
    _useAdaptivity$sizeY = _useAdaptivity.sizeY,
    sizeY = _useAdaptivity$sizeY === void 0 ? 'none' : _useAdaptivity$sizeY;
  var onRemoveWrapper = React.useCallback(function (event) {
    onRemove(event, value);
  }, [onRemove, value]);
  var title = getTitleFromChildren(children);
  return /*#__PURE__*/React.createElement("div", _extends({
    className: classNames("vkuiChip", sizeY !== SizeType.REGULAR && sizeYClassNames[sizeY], removable && "vkuiChip--removable", className),
    role: "option",
    "aria-label": title
  }, restProps), /*#__PURE__*/React.createElement("div", {
    className: "vkuiChip__in",
    role: "presentation"
  }, hasReactNode(before) && /*#__PURE__*/React.createElement("div", {
    className: "vkuiChip__before"
  }, before), /*#__PURE__*/React.createElement(Footnote, {
    className: "vkuiChip__content",
    title: title,
    "aria-hidden": true
  }, children), hasReactNode(after) && /*#__PURE__*/React.createElement("div", {
    className: "vkuiChip__after"
  }, after), removable && /*#__PURE__*/React.createElement(Tappable, {
    Component: "button",
    className: "vkuiChip__remove",
    onClick: onRemoveWrapper,
    hasHover: false,
    hasActive: false,
    "aria-label": "".concat(removeAriaLabel, " ").concat(title)
  }, /*#__PURE__*/React.createElement(Icon16Cancel, null))));
};
//# sourceMappingURL=Chip.js.map