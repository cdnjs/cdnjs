import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
var _excluded = ["textLevel"],
  _excluded2 = ["mode", "size", "selected", "textLevel", "before", "after", "expandable", "children", "className"];
import * as React from 'react';
import { getSizeYClassName } from '../../helpers/getSizeYClassName';
import { classNames } from '@vkontakte/vkjs';
import { getTitleFromChildren } from '../../lib/utils';
import { useAdaptivity } from '../../hooks/useAdaptivity';
import { Tappable } from '../Tappable/Tappable';
import { Icon16Dropdown } from '@vkontakte/icons';
import { Caption } from '../Typography/Caption/Caption';
import { Subhead } from '../Typography/Subhead/Subhead';
var SubnavigationButtonTypography = function SubnavigationButtonTypography(_ref) {
  var textLevel = _ref.textLevel,
    restProps = _objectWithoutProperties(_ref, _excluded);
  if (textLevel === '1') {
    return /*#__PURE__*/React.createElement(Subhead, restProps);
  }
  return /*#__PURE__*/React.createElement(Caption, _extends({
    level: textLevel === '2' ? '1' : '2'
  }, restProps));
};

/**
 * @see https://vkcom.github.io/VKUI/#/SubnavigationButton
 */
export var SubnavigationButton = function SubnavigationButton(_ref2) {
  var _ref2$mode = _ref2.mode,
    mode = _ref2$mode === void 0 ? 'primary' : _ref2$mode,
    _ref2$size = _ref2.size,
    size = _ref2$size === void 0 ? 'm' : _ref2$size,
    selected = _ref2.selected,
    _ref2$textLevel = _ref2.textLevel,
    textLevel = _ref2$textLevel === void 0 ? '1' : _ref2$textLevel,
    before = _ref2.before,
    after = _ref2.after,
    expandable = _ref2.expandable,
    children = _ref2.children,
    className = _ref2.className,
    restProps = _objectWithoutProperties(_ref2, _excluded2);
  var _useAdaptivity = useAdaptivity(),
    sizeY = _useAdaptivity.sizeY;
  return /*#__PURE__*/React.createElement(Tappable, _extends({}, restProps, {
    hasActive: false,
    focusVisibleMode: "outside",
    className: classNames("vkuiSubnavigationButton", styles["SubnavigationButton--size-".concat(size)], styles["SubnavigationButton--mode-".concat(mode)], selected && "vkuiSubnavigationButton--selected", getSizeYClassName("vkuiSubnavigationButton", sizeY), className),
    "aria-label": getTitleFromChildren(children)
  }), /*#__PURE__*/React.createElement("span", {
    className: "vkuiSubnavigationButton__in"
  }, before && /*#__PURE__*/React.createElement("span", {
    className: "vkuiSubnavigationButton__before"
  }, before), /*#__PURE__*/React.createElement(SubnavigationButtonTypography, {
    textLevel: textLevel,
    className: "vkuiSubnavigationButton__label",
    Component: "span"
  }, children), after && /*#__PURE__*/React.createElement("span", {
    className: "vkuiSubnavigationButton__after"
  }, after), expandable && /*#__PURE__*/React.createElement(Icon16Dropdown, {
    className: "vkuiSubnavigationButton__expandableIcon"
  })));
};
var styles = {
  "SubnavigationButton--size-s": "vkuiSubnavigationButton--size-s",
  "SubnavigationButton--size-m": "vkuiSubnavigationButton--size-m",
  "SubnavigationButton--size-l": "vkuiSubnavigationButton--size-l",
  "SubnavigationButton--mode-primary": "vkuiSubnavigationButton--mode-primary",
  "SubnavigationButton--mode-outline": "vkuiSubnavigationButton--mode-outline",
  "SubnavigationButton--mode-tertiary": "vkuiSubnavigationButton--mode-tertiary"
};
//# sourceMappingURL=SubnavigationButton.js.map