import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
var _excluded = ["textLevel"],
  _excluded2 = ["mode", "size", "selected", "textLevel", "before", "after", "expandable", "children"];
import { createScopedElement } from "../../lib/jsxRuntime";
import { classNames } from "../../lib/classNames";
import { getTitleFromChildren } from "../../lib/utils";
import { useAdaptivity } from "../../hooks/useAdaptivity";
import { Tappable } from "../Tappable/Tappable";
import { Icon16Dropdown } from "@vkontakte/icons";
import { Caption } from "../Typography/Caption/Caption";
import { Subhead } from "../Typography/Subhead/Subhead";
import "./SubnavigationButton.css";
var SubnavigationButtonTypography = function SubnavigationButtonTypography(_ref) {
  var textLevel = _ref.textLevel,
    restProps = _objectWithoutProperties(_ref, _excluded);
  if (textLevel === 1) {
    return createScopedElement(Subhead, restProps);
  }
  return createScopedElement(Caption, _extends({
    level: textLevel === 2 ? "2" : "3"
  }, restProps));
};

/**
 * @see https://vkcom.github.io/VKUI/#/SubnavigationButton
 */
export var SubnavigationButton = function SubnavigationButton(_ref2) {
  var _ref2$mode = _ref2.mode,
    mode = _ref2$mode === void 0 ? "primary" : _ref2$mode,
    _ref2$size = _ref2.size,
    size = _ref2$size === void 0 ? "m" : _ref2$size,
    selected = _ref2.selected,
    _ref2$textLevel = _ref2.textLevel,
    textLevel = _ref2$textLevel === void 0 ? 1 : _ref2$textLevel,
    before = _ref2.before,
    after = _ref2.after,
    expandable = _ref2.expandable,
    children = _ref2.children,
    restProps = _objectWithoutProperties(_ref2, _excluded2);
  var _useAdaptivity = useAdaptivity(),
    sizeY = _useAdaptivity.sizeY;
  return createScopedElement(Tappable, _extends({}, restProps, {
    hasActive: false,
    focusVisibleMode: "outside",
    vkuiClass: classNames("SubnavigationButton", "SubnavigationButton--".concat(size), "SubnavigationButton--mode-".concat(mode), selected && "SubnavigationButton--selected", "SubnavigationButton--sizeY-".concat(sizeY)),
    "aria-label": getTitleFromChildren(children)
  }), createScopedElement("span", {
    vkuiClass: "SubnavigationButton__in"
  }, before && createScopedElement("span", {
    vkuiClass: "SubnavigationButton__before"
  }, before), createScopedElement(SubnavigationButtonTypography, {
    textLevel: textLevel,
    vkuiClass: "SubnavigationButton__label",
    Component: "span"
  }, children), after && createScopedElement("span", {
    vkuiClass: "SubnavigationButton__after"
  }, after), expandable && createScopedElement(Icon16Dropdown, {
    vkuiClass: "SubnavigationButton__expandableIcon",
    "aria-hidden": true
  })));
};
//# sourceMappingURL=SubnavigationButton.js.map