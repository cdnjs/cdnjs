import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
var _excluded = ["value", "option", "removable", "onRemove", "removeAriaLabel", "before", "after", "children"];
import { createScopedElement } from "../../lib/jsxRuntime";
import * as React from 'react';
import { Icon16Cancel } from '@vkontakte/icons';
import { getTitleFromChildren, hasReactNode, noop } from "../../lib/utils";
import { classNames } from "../../lib/classNames";
import Caption from "../Typography/Caption/Caption";
import Tappable from "../Tappable/Tappable";

var Chip = function Chip(_ref) {
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
      restProps = _objectWithoutProperties(_ref, _excluded);

  var onRemoveWrapper = React.useCallback(function (event) {
    onRemove(event, value);
  }, [onRemove, value]);
  var title = getTitleFromChildren(children);
  return createScopedElement("div", _extends({
    vkuiClass: classNames('Chip', {
      'Chip--removable': removable
    }),
    role: "option",
    "aria-label": title
  }, restProps), createScopedElement("div", {
    vkuiClass: "Chip__in",
    role: "presentation"
  }, hasReactNode(before) && createScopedElement("div", {
    vkuiClass: "Chip__before"
  }, before), createScopedElement(Caption, {
    level: "1",
    weight: "regular",
    vkuiClass: "Chip__content",
    title: title,
    "aria-hidden": "true"
  }, children), hasReactNode(after) && createScopedElement("div", {
    vkuiClass: "Chip__after"
  }, after), removable && createScopedElement(Tappable, {
    Component: "button",
    vkuiClass: "Chip__remove",
    onClick: onRemoveWrapper,
    hasHover: false,
    hasActive: false,
    "aria-label": "".concat(removeAriaLabel, " ").concat(title)
  }, createScopedElement(Icon16Cancel, {
    "aria-hidden": true
  }))));
};

export default Chip;
//# sourceMappingURL=Chip.js.map