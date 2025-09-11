'use client';
import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { noop } from "@vkontakte/vkjs";
import { useAdaptivityWithJSMediaQueries } from "../../hooks/useAdaptivityWithJSMediaQueries.js";
import { usePlatform } from "../../hooks/usePlatform.js";
import { useCSSKeyframesAnimationController } from "../../lib/animation/index.js";
import { AppRootPortal } from "../AppRoot/AppRootPortal.js";
import { useScrollLock } from "../AppRoot/ScrollContext.js";
import { PopoutWrapper } from "../PopoutWrapper/PopoutWrapper.js";
import { Footnote } from "../Typography/Footnote/Footnote.js";
import { ActionSheetContext } from "./ActionSheetContext.js";
import { ActionSheetDefaultIosCloseItem } from "./ActionSheetDefaultIosCloseItem.js";
import { ActionSheetDropdownMenu } from "./ActionSheetDropdownMenu.js";
import { ActionSheetDropdownSheet } from "./ActionSheetDropdownSheet.js";
/**
 * @see https://vkui.io/components/action-sheet
 */ export const ActionSheet = (_param)=>{
    var { children, className, title, description, style, iosCloseItem, popupOffsetDistance, placement, mode: modeProp, onClose } = _param, restProps = _object_without_properties(_param, [
        "children",
        "className",
        "title",
        "description",
        "style",
        "iosCloseItem",
        "popupOffsetDistance",
        "placement",
        "mode",
        "onClose"
    ]);
    const platform = usePlatform();
    const [closingBy, setClosingBy] = React.useState(undefined);
    const onCloseWithOther = React.useCallback(()=>setClosingBy('other'), []);
    const actionCallbackRef = React.useRef(noop);
    const [animationState, animationHandlers] = useCSSKeyframesAnimationController(closingBy !== undefined ? 'exit' : 'enter', {
        onExited () {
            onClose({
                closedBy: closingBy || 'other'
            });
            actionCallbackRef.current();
            actionCallbackRef.current = noop;
        }
    });
    const { isDesktop } = useAdaptivityWithJSMediaQueries();
    const mode = modeProp !== null && modeProp !== void 0 ? modeProp : isDesktop ? 'menu' : 'sheet';
    useScrollLock(mode === 'sheet');
    const onItemClick = React.useCallback(({ action, immediateAction, autoClose, isCancelItem })=>(event)=>{
            event.persist();
            immediateAction && immediateAction(event);
            if (autoClose) {
                if (action) {
                    actionCallbackRef.current = ()=>action(event);
                }
                setClosingBy(isCancelItem ? 'cancel-item' : 'action-item');
            } else {
                action && action(event);
            }
        }, []);
    const contextValue = React.useMemo(()=>({
            onItemClick,
            mode,
            onClose: onCloseWithOther
        }), [
        mode,
        onCloseWithOther,
        onItemClick
    ]);
    const DropdownComponent = mode === 'menu' ? ActionSheetDropdownMenu : ActionSheetDropdownSheet;
    const dropdownProps = mode === 'menu' ? Object.assign(restProps, {
        popupOffsetDistance,
        placement
    }) : restProps;
    const actionSheet = /*#__PURE__*/ _jsx(ActionSheetContext.Provider, {
        value: contextValue,
        children: /*#__PURE__*/ _jsxs(DropdownComponent, _object_spread_props(_object_spread({
            closing: Boolean(closingBy),
            role: "dialog",
            "aria-modal": "true",
            autoFocus: animationState === 'entered'
        }, dropdownProps, animationHandlers), {
            onClose: onCloseWithOther,
            className: mode === 'menu' ? className : undefined,
            style: mode === 'menu' ? style : undefined,
            children: [
                /*#__PURE__*/ _jsxs("div", {
                    className: "vkuiActionSheet__contentWrapper",
                    children: [
                        (title || description) && /*#__PURE__*/ _jsxs("div", {
                            className: "vkuiActionSheet__header",
                            children: [
                                title && /*#__PURE__*/ _jsx(Footnote, {
                                    weight: "2",
                                    className: "vkuiActionSheet__title",
                                    children: title
                                }),
                                description && /*#__PURE__*/ _jsx(Footnote, {
                                    className: "vkuiActionSheet__description",
                                    children: description
                                })
                            ]
                        }),
                        children
                    ]
                }),
                platform === 'ios' && mode === 'sheet' && /*#__PURE__*/ _jsx("div", {
                    className: "vkuiActionSheet__closeItemWrapperIos",
                    children: iosCloseItem !== null && iosCloseItem !== void 0 ? iosCloseItem : /*#__PURE__*/ _jsx(ActionSheetDefaultIosCloseItem, {})
                })
            ]
        }))
    });
    return /*#__PURE__*/ _jsx(AppRootPortal, {
        children: /*#__PURE__*/ _jsx(PopoutWrapper, {
            noBackground: mode === 'menu',
            closing: Boolean(closingBy),
            alignY: "bottom",
            className: className,
            style: style,
            onClick: onCloseWithOther,
            strategy: "fixed",
            children: actionSheet
        })
    });
};

//# sourceMappingURL=ActionSheet.js.map