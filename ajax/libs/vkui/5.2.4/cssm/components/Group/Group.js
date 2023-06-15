import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
var _excluded = ["header", "description", "children", "separator", "getRootRef", "mode", "padding", "className", "tabIndex"];
var _sizeXClassNames;
import * as React from 'react';
import { classNames, hasReactNode } from '@vkontakte/vkjs';
import { useAdaptivity } from '../../hooks/useAdaptivity';
import { usePlatform } from '../../hooks/usePlatform';
import { SizeType } from '../../lib/adaptivity';
import { Platform } from '../../lib/platform';
import { warnOnce } from '../../lib/warnOnce';
import { ModalRootContext } from '../ModalRoot/ModalRootContext';
import { Separator } from '../Separator/Separator';
import { Spacing } from '../Spacing/Spacing';
import { Footnote } from '../Typography/Footnote/Footnote';
import "./Group.module.css";
var sizeXClassNames = (_sizeXClassNames = {
  none: "vkuiGroup--sizeX-none"
}, _defineProperty(_sizeXClassNames, SizeType.COMPACT, "vkuiGroup--sizeX-compact"), _defineProperty(_sizeXClassNames, SizeType.REGULAR, "vkuiGroup--sizeX-regular"), _sizeXClassNames);
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
    _useAdaptivity$sizeX = _useAdaptivity.sizeX,
    sizeX = _useAdaptivity$sizeX === void 0 ? 'none' : _useAdaptivity$sizeX;
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
    className: classNames("vkuiGroup", platform === Platform.IOS && "vkuiGroup--ios", sizeXClassNames[sizeX], mode && styles["Group--mode-".concat(mode)], styles["Group--padding-".concat(padding)], className)
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