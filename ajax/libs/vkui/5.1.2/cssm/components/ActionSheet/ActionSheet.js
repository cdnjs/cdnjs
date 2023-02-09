import _extends from "@babel/runtime/helpers/extends";
import _slicedToArray from "@babel/runtime/helpers/slicedToArray";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
var _excluded = ["children", "className", "header", "text", "style", "iosCloseItem", "popupDirection", "popupOffsetDistance"];
import * as React from 'react';
import { PopoutWrapper } from '../PopoutWrapper/PopoutWrapper';
import { Platform } from '../../lib/platform';
import { ActionSheetDropdownDesktop } from './ActionSheetDropdownDesktop';
import { ActionSheetDropdown } from './ActionSheetDropdown';
import { noop } from '@vkontakte/vkjs';
import { ActionSheetContext } from './ActionSheetContext';
import { Footnote } from '../Typography/Footnote/Footnote';
import { usePlatform } from '../../hooks/usePlatform';
import { useTimeout } from '../../hooks/useTimeout';
import { useAdaptivityWithJSMediaQueries } from '../../hooks/useAdaptivityWithJSMediaQueries';
import { useObjectMemo } from '../../hooks/useObjectMemo';
import { useScrollLock } from '../AppRoot/ScrollContext';
import "./ActionSheet.module.css";
/**
 * @see https://vkcom.github.io/VKUI/#/ActionSheet
 */
export var ActionSheet = function ActionSheet(_ref) {
  var children = _ref.children,
    className = _ref.className,
    header = _ref.header,
    text = _ref.text,
    style = _ref.style,
    iosCloseItem = _ref.iosCloseItem,
    _ref$popupDirection = _ref.popupDirection,
    popupDirection = _ref$popupDirection === void 0 ? 'bottom' : _ref$popupDirection,
    popupOffsetDistance = _ref.popupOffsetDistance,
    restProps = _objectWithoutProperties(_ref, _excluded);
  var platform = usePlatform();
  var _React$useState = React.useState(false),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    closing = _React$useState2[0],
    setClosing = _React$useState2[1];
  var onClose = function onClose() {
    return setClosing(true);
  };
  var _action = React.useRef(noop);
  var afterClose = function afterClose() {
    restProps.onClose();
    _action.current();
    _action.current = noop;
  };
  var _useAdaptivityWithJSM = useAdaptivityWithJSMediaQueries(),
    isDesktop = _useAdaptivityWithJSM.isDesktop;
  useScrollLock(!isDesktop);
  var timeout = platform === Platform.IOS ? 300 : 200;
  if (isDesktop) {
    timeout = 0;
  }
  var fallbackTransitionFinish = useTimeout(afterClose, timeout);
  React.useEffect(function () {
    if (closing) {
      fallbackTransitionFinish.set();
    } else {
      fallbackTransitionFinish.clear();
    }
  }, [closing, fallbackTransitionFinish]);
  var onItemClick = React.useCallback(function (action, immediateAction, autoClose) {
    return function (event) {
      event.persist();
      immediateAction && immediateAction(event);
      if (autoClose) {
        _action.current = function () {
          return action && action(event);
        };
        setClosing(true);
      } else {
        action && action(event);
      }
    };
  }, []);
  var contextValue = useObjectMemo({
    onItemClick: onItemClick,
    isDesktop: isDesktop
  });
  var DropdownComponent = isDesktop ? ActionSheetDropdownDesktop : ActionSheetDropdown;
  var dropdownProps = isDesktop ? Object.assign(restProps, {
    popupOffsetDistance: popupOffsetDistance,
    popupDirection: popupDirection
  }) : restProps;
  var actionSheet = /*#__PURE__*/React.createElement(ActionSheetContext.Provider, {
    value: contextValue
  }, /*#__PURE__*/React.createElement(DropdownComponent, _extends({
    closing: closing,
    timeout: timeout
  }, dropdownProps, {
    onClose: onClose,
    className: isDesktop ? className : undefined,
    style: isDesktop ? style : undefined
  }), (header || text) && /*#__PURE__*/React.createElement("header", {
    className: "vkuiActionSheet__header"
  }, header && /*#__PURE__*/React.createElement(Footnote, {
    weight: "2",
    className: "vkuiActionSheet__title"
  }, header), text && /*#__PURE__*/React.createElement(Footnote, {
    className: "vkuiActionSheet__text"
  }, text)), children, platform === Platform.IOS && !isDesktop && iosCloseItem));
  if (isDesktop) {
    return actionSheet;
  }
  return /*#__PURE__*/React.createElement(PopoutWrapper, {
    closing: closing,
    alignY: "bottom",
    className: className,
    style: style,
    onClick: onClose,
    hasMask: true,
    fixed: true
  }, actionSheet);
};
//# sourceMappingURL=ActionSheet.js.map