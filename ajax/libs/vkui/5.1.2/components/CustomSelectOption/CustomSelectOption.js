import _extends from "@babel/runtime/helpers/extends";
import _objectSpread from "@babel/runtime/helpers/objectSpread2";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
var _excluded = ["children", "hierarchy", "hovered", "selected", "before", "after", "option", "description", "disabled", "style", "className"];
import * as React from 'react';
import { Icon16Done } from '@vkontakte/icons';
import { classNames, hasReactNode } from '@vkontakte/vkjs';
import { Paragraph } from '../Typography/Paragraph/Paragraph';
import { Footnote } from '../Typography/Footnote/Footnote';
import { useAdaptivity } from '../../hooks/useAdaptivity';
import { warnOnce } from '../../lib/warnOnce';
import { getSizeYClassName } from '../../helpers/getSizeYClassName';
var warn = warnOnce('CustomSelectOption');

/**
 * @see https://vkcom.github.io/VKUI/#/CustomSelectOption
 */
export var CustomSelectOption = function CustomSelectOption(_ref) {
  var children = _ref.children,
    _ref$hierarchy = _ref.hierarchy,
    hierarchy = _ref$hierarchy === void 0 ? 0 : _ref$hierarchy,
    hovered = _ref.hovered,
    selected = _ref.selected,
    before = _ref.before,
    after = _ref.after,
    option = _ref.option,
    description = _ref.description,
    disabled = _ref.disabled,
    styleProp = _ref.style,
    className = _ref.className,
    restProps = _objectWithoutProperties(_ref, _excluded);
  var title = typeof children === 'string' ? children : undefined;
  var _useAdaptivity = useAdaptivity(),
    sizeY = _useAdaptivity.sizeY;
  var style = React.useMemo(function () {
    return hierarchy > 0 ? _objectSpread({
      '--vkui_internal--custom_select_option_hierarchy_level': hierarchy
    }, styleProp) : styleProp;
  }, [hierarchy, styleProp]);
  if (!!option && process.env.NODE_ENV === 'development') {
    // TODO v6.0.0. Удалить св-во `option`
    warn('Свойство option было добавлено по ошибке и будет удалено в v6.0.0.');
  }
  return /*#__PURE__*/React.createElement(Paragraph, _extends({}, restProps, {
    Component: "div",
    role: "option",
    title: title,
    "aria-disabled": disabled,
    "aria-selected": selected,
    className: classNames("vkuiCustomSelectOption", getSizeYClassName("vkuiCustomSelectOption", sizeY), hovered && !disabled && "vkuiCustomSelectOption--hover",
    // Note: пустой класс
    selected && "vkuiCustomSelectOption--selected", disabled && "vkuiCustomSelectOption--disabled", hierarchy > 0 && "vkuiCustomSelectOption--hierarchy", className),
    style: style
  }), hasReactNode(before) && /*#__PURE__*/React.createElement("div", {
    className: "vkuiCustomSelectOption__before"
  }, before), /*#__PURE__*/React.createElement("div", {
    className: "vkuiCustomSelectOption__main"
  }, /*#__PURE__*/React.createElement("div", {
    className: "vkuiCustomSelectOption__children"
  }, children), hasReactNode(description) && /*#__PURE__*/React.createElement(Footnote, {
    className: "vkuiCustomSelectOption__description"
  }, description)), /*#__PURE__*/React.createElement("div", {
    className: "vkuiCustomSelectOption__after"
  }, hasReactNode(after) && /*#__PURE__*/React.createElement("div", {
    className: "vkuiCustomSelectOption__afterIn"
  }, after), selected && /*#__PURE__*/React.createElement(Icon16Done, {
    className: "vkuiCustomSelectOption__selectedIcon"
  })));
};
//# sourceMappingURL=CustomSelectOption.js.map