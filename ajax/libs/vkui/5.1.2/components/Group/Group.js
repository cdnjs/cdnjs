import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
var _excluded = ["header", "description", "children", "separator", "getRootRef", "mode", "padding", "className", "tabIndex"];
import * as React from 'react';
import { Platform } from '../../lib/platform';
import { classNames, hasReactNode } from '@vkontakte/vkjs';
import { usePlatform } from '../../hooks/usePlatform';
import { Spacing } from '../Spacing/Spacing';
import { Separator } from '../Separator/Separator';
import { Footnote } from '../Typography/Footnote/Footnote';
import { warnOnce } from '../../lib/warnOnce';
import { ModalRootContext } from '../ModalRoot/ModalRootContext';
import { useAdaptivity } from '../../hooks/useAdaptivity';
import { getSizeXClassName } from '../../helpers/getSizeXClassName';
var warn = warnOnce('TabsItem');
export var Group = function Group(_ref) {
  var header = _ref.header,
    description = _ref.description,
    children = _ref.children,
    _ref$separator = _ref.separator,
    separator = _ref$separator === void 0 ? 'auto' : _ref$separator,
    getRootRef = _ref.getRootRef,
    modeProps = _ref.mode,
    _ref$padding = _ref.padding,
    padding = _ref$padding === void 0 ? 'm' : _ref$padding,
    className = _ref.className,
    tabIndexProp = _ref.tabIndex,
    restProps = _objectWithoutProperties(_ref, _excluded);
  var _React$useContext = React.useContext(ModalRootContext),
    isInsideModal = _React$useContext.isInsideModal;
  var platform = usePlatform();
  var _useAdaptivity = useAdaptivity(),
    sizeX = _useAdaptivity.sizeX;
  var mode = modeProps;
  if (!modeProps) {
    // Подробнее в "none" можно прочитать в ADAPTIVITY_GUIDE.md
    mode = isInsideModal ? 'plain' : 'none';
  }
  var isTabPanel = restProps.role === 'tabpanel';
  if (process.env.NODE_ENV === 'development' && isTabPanel && (!restProps['aria-controls'] || !restProps['id'])) {
    warn('При использовании роли "tabpanel" необходимо задать значение свойств "aria-controls" и "id"');
  }
  var tabIndex = isTabPanel && tabIndexProp === undefined ? 0 : tabIndexProp;
  var separatorClassName = classNames("vkuiGroup__separator", separator === 'show' && "vkuiGroup__separator--force");
  return /*#__PURE__*/React.createElement("section", _extends({}, restProps, {
    tabIndex: tabIndex,
    ref: getRootRef,
    className: classNames("vkuiGroup", platform === Platform.IOS && "vkuiGroup--ios", getSizeXClassName("vkuiGroup", sizeX), mode && styles["Group--mode-".concat(mode)], styles["Group--padding-".concat(padding)], className)
  }), /*#__PURE__*/React.createElement("div", {
    className: "vkuiGroup__inner"
  }, header, children, hasReactNode(description) && /*#__PURE__*/React.createElement(Footnote, {
    className: "vkuiGroup__description"
  }, description)), separator !== 'hide' && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Spacing, {
    className: classNames(separatorClassName, "vkuiGroup__separator--spacing"),
    size: 16
  }), /*#__PURE__*/React.createElement(Separator, {
    className: classNames(separatorClassName, "vkuiGroup__separator--separator")
  })));
};
var styles = {
  "Group--mode-plain": "vkuiGroup--mode-plain",
  "Group--mode-none": "vkuiGroup--mode-none",
  "Group--mode-card": "vkuiGroup--mode-card",
  "Group--padding-s": "vkuiGroup--padding-s",
  "Group--padding-m": "vkuiGroup--padding-m"
};
//# sourceMappingURL=Group.js.map