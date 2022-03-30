import _extends from "@babel/runtime/helpers/extends";
import _slicedToArray from "@babel/runtime/helpers/slicedToArray";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
var _excluded = ["children", "className", "header", "text", "style", "iosCloseItem"];
import { createScopedElement } from "../../lib/jsxRuntime";
import * as React from "react";
import { PopoutWrapper } from "../PopoutWrapper/PopoutWrapper";
import { ViewWidth, ViewHeight } from "../../hoc/withAdaptivity";
import { IOS } from "../../lib/platform";
import { ActionSheetDropdownDesktop } from "./ActionSheetDropdownDesktop";
import { ActionSheetDropdown } from "./ActionSheetDropdown";
import { hasReactNode, noop } from "../../lib/utils";
import { ActionSheetContext } from "./ActionSheetContext";
import { Caption } from "../Typography/Caption/Caption";
import { usePlatform } from "../../hooks/usePlatform";
import { useTimeout } from "../../hooks/useTimeout";
import { useAdaptivity } from "../../hooks/useAdaptivity";
import { useObjectMemo } from "../../hooks/useObjectMemo";
import { warnOnce } from "../../lib/warnOnce";
var warn = warnOnce("ActionSheet");
export var ActionSheet = function ActionSheet(_ref) {
  var children = _ref.children,
      className = _ref.className,
      header = _ref.header,
      text = _ref.text,
      style = _ref.style,
      iosCloseItem = _ref.iosCloseItem,
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
    var _restProps$onClose;

    (_restProps$onClose = restProps.onClose) === null || _restProps$onClose === void 0 ? void 0 : _restProps$onClose.call(restProps);

    _action.current();

    _action.current = noop;
  };

  if (process.env.NODE_ENV === "development" && !restProps.onClose) {
    warn("can't close on outer click without onClose");
  }

  var _useAdaptivity = useAdaptivity(),
      viewWidth = _useAdaptivity.viewWidth,
      viewHeight = _useAdaptivity.viewHeight,
      hasMouse = _useAdaptivity.hasMouse;

  var isDesktop = viewWidth >= ViewWidth.SMALL_TABLET && (hasMouse || viewHeight >= ViewHeight.MEDIUM);
  var timeout = platform === IOS ? 300 : 200;

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
  var onItemClick = React.useCallback(function (action, immediateAction, autoclose) {
    return function (event) {
      event.persist();
      immediateAction && immediateAction(event);

      if (autoclose) {
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
  var actionSheet = createScopedElement(ActionSheetContext.Provider, {
    value: contextValue
  }, createScopedElement(DropdownComponent, _extends({
    closing: closing,
    timeout: timeout
  }, restProps, {
    onClose: onClose,
    className: isDesktop ? className : undefined,
    style: isDesktop ? style : undefined
  }), (hasReactNode(header) || hasReactNode(text)) && createScopedElement("header", {
    vkuiClass: "ActionSheet__header"
  }, hasReactNode(header) && createScopedElement(Caption, {
    weight: platform === IOS ? "1" : "2",
    vkuiClass: "ActionSheet__title"
  }, header), hasReactNode(text) && createScopedElement(Caption, {
    vkuiClass: "ActionSheet__text"
  }, text)), children, platform === IOS && !isDesktop && iosCloseItem));

  if (isDesktop) {
    return actionSheet;
  }

  return createScopedElement(PopoutWrapper, {
    closing: closing,
    alignY: "bottom",
    className: className,
    style: style,
    onClick: onClose,
    hasMask: true,
    fixed: true
  }, actionSheet);
};
ActionSheet.defaultProps = {
  popupDirection: "bottom"
};
//# sourceMappingURL=ActionSheet.js.map