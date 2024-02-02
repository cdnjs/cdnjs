import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import { _ as _sliced_to_array } from "@swc/helpers/_/_sliced_to_array";
import * as React from "react";
import { noop } from "@vkontakte/vkjs";
import { useAdaptivityWithJSMediaQueries } from "../../hooks/useAdaptivityWithJSMediaQueries";
import { useObjectMemo } from "../../hooks/useObjectMemo";
import { usePlatform } from "../../hooks/usePlatform";
import { useTimeout } from "../../hooks/useTimeout";
import { Platform } from "../../lib/platform";
import { warnOnce } from "../../lib/warnOnce";
import { useScrollLock } from "../AppRoot/ScrollContext";
import { PopoutWrapper } from "../PopoutWrapper/PopoutWrapper";
import { Footnote } from "../Typography/Footnote/Footnote";
import { ActionSheetContext } from "./ActionSheetContext";
import { ActionSheetDefaultIosCloseItem } from "./ActionSheetDefaultIosCloseItem";
import { ActionSheetDropdownMenu } from "./ActionSheetDropdownMenu";
import { ActionSheetDropdownSheet } from "./ActionSheetDropdownSheet";
var warn = warnOnce("ActionSheet");
/**
 * @see https://vkcom.github.io/VKUI/#/ActionSheet
 */ export var ActionSheet = function(_param) {
    var children = _param.children, className = _param.className, header = _param.header, text = _param.text, style = _param.style, iosCloseItem = _param.iosCloseItem, popupDirection = _param.popupDirection, popupOffsetDistance = _param.popupOffsetDistance, placement = _param.placement, modeProp = _param.mode, restProps = _object_without_properties(_param, [
        "children",
        "className",
        "header",
        "text",
        "style",
        "iosCloseItem",
        "popupDirection",
        "popupOffsetDistance",
        "placement",
        "mode"
    ]);
    var platform = usePlatform();
    var _React_useState = _sliced_to_array(React.useState(undefined), 2), closingBy = _React_useState[0], setClosingBy = _React_useState[1];
    var onClose = function() {
        return setClosingBy("other");
    };
    var _action = React.useRef(noop);
    var afterClose = function() {
        restProps.onClose({
            closedBy: closingBy || "other"
        });
        _action.current();
        _action.current = noop;
    };
    var isDesktop = useAdaptivityWithJSMediaQueries().isDesktop;
    var mode = modeProp !== null && modeProp !== void 0 ? modeProp : isDesktop ? "menu" : "sheet";
    useScrollLock(mode === "sheet");
    var timeout = platform === Platform.IOS ? 300 : 200;
    if (mode === "menu") {
        timeout = 0;
    }
    var fallbackTransitionFinish = useTimeout(afterClose, timeout);
    React.useEffect(function() {
        if (closingBy) {
            fallbackTransitionFinish.set();
        } else {
            fallbackTransitionFinish.clear();
        }
    }, [
        closingBy,
        fallbackTransitionFinish
    ]);
    var onItemClick = React.useCallback(function(param) {
        var action = param.action, immediateAction = param.immediateAction, autoClose = param.autoClose, isCancelItem = param.isCancelItem;
        return function(event) {
            event.persist();
            immediateAction && immediateAction(event);
            if (autoClose) {
                _action.current = function() {
                    return action && action(event);
                };
                setClosingBy(isCancelItem ? "cancel-item" : "action-item");
            } else {
                action && action(event);
            }
        };
    }, []);
    var contextValue = useObjectMemo({
        onItemClick: onItemClick,
        mode: mode
    });
    var DropdownComponent = mode === "menu" ? ActionSheetDropdownMenu : ActionSheetDropdownSheet;
    if (process.env.NODE_ENV === "development" && popupDirection) {
        // TODO [>=6]: popupDirection
        warn('Свойство "popupDirection" будет удалено в v6. Используйте свойство "placement"');
    }
    popupDirection = popupDirection !== undefined ? popupDirection : "bottom";
    var dropdownProps = mode === "menu" ? Object.assign(restProps, {
        popupOffsetDistance: popupOffsetDistance,
        popupDirection: popupDirection,
        placement: placement
    }) : restProps;
    var actionSheet = /*#__PURE__*/ React.createElement(ActionSheetContext.Provider, {
        value: contextValue
    }, /*#__PURE__*/ React.createElement(DropdownComponent, _object_spread_props(_object_spread({
        closing: Boolean(closingBy),
        timeout: timeout
    }, dropdownProps), {
        onClose: onClose,
        className: mode === "menu" ? className : undefined,
        style: mode === "menu" ? style : undefined
    }), /*#__PURE__*/ React.createElement("div", {
        className: "vkuiActionSheet__content-wrapper"
    }, (header || text) && /*#__PURE__*/ React.createElement("div", {
        className: "vkuiActionSheet__header"
    }, header && /*#__PURE__*/ React.createElement(Footnote, {
        weight: "2",
        className: "vkuiActionSheet__title"
    }, header), text && /*#__PURE__*/ React.createElement(Footnote, {
        className: "vkuiActionSheet__text"
    }, text)), children), platform === Platform.IOS && mode === "sheet" && /*#__PURE__*/ React.createElement("div", {
        className: "vkuiActionSheet__close-item-wrapper--ios"
    }, iosCloseItem !== null && iosCloseItem !== void 0 ? iosCloseItem : /*#__PURE__*/ React.createElement(ActionSheetDefaultIosCloseItem, null))));
    if (mode === "menu") {
        return actionSheet;
    }
    return /*#__PURE__*/ React.createElement(PopoutWrapper, {
        closing: Boolean(closingBy),
        alignY: "bottom",
        className: className,
        style: style,
        onClick: onClose,
        hasMask: true,
        fixed: true
    }, actionSheet);
};

//# sourceMappingURL=ActionSheet.js.map