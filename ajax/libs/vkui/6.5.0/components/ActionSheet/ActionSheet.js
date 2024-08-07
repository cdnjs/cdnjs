import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from 'react';
import { noop } from '@vkontakte/vkjs';
import { useAdaptivityWithJSMediaQueries } from '../../hooks/useAdaptivityWithJSMediaQueries';
import { useObjectMemo } from '../../hooks/useObjectMemo';
import { usePlatform } from '../../hooks/usePlatform';
import { useCSSKeyframesAnimationController } from '../../lib/animation';
import { useScrollLock } from '../AppRoot/ScrollContext';
import { PopoutWrapper } from '../PopoutWrapper/PopoutWrapper';
import { Footnote } from '../Typography/Footnote/Footnote';
import { ActionSheetContext } from './ActionSheetContext';
import { ActionSheetDefaultIosCloseItem } from './ActionSheetDefaultIosCloseItem';
import { ActionSheetDropdownMenu } from './ActionSheetDropdownMenu';
import { ActionSheetDropdownSheet } from './ActionSheetDropdownSheet';
/**
 * @see https://vkcom.github.io/VKUI/#/ActionSheet
 */ export const ActionSheet = (_param)=>{
    var { children, className, header, text, style, iosCloseItem, popupOffsetDistance, placement, mode: modeProp, onClose } = _param, restProps = _object_without_properties(_param, [
        "children",
        "className",
        "header",
        "text",
        "style",
        "iosCloseItem",
        "popupOffsetDistance",
        "placement",
        "mode",
        "onClose"
    ]);
    const platform = usePlatform();
    const [closingBy, setClosingBy] = React.useState(undefined);
    const onCloseWithOther = ()=>setClosingBy('other');
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
    const contextValue = useObjectMemo({
        onItemClick,
        mode,
        onClose: onCloseWithOther
    });
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
                    className: "vkuiActionSheet__content-wrapper",
                    children: [
                        (header || text) && /*#__PURE__*/ _jsxs("div", {
                            className: "vkuiActionSheet__header",
                            children: [
                                header && /*#__PURE__*/ _jsx(Footnote, {
                                    weight: "2",
                                    className: "vkuiActionSheet__title",
                                    children: header
                                }),
                                text && /*#__PURE__*/ _jsx(Footnote, {
                                    className: "vkuiActionSheet__text",
                                    children: text
                                })
                            ]
                        }),
                        children
                    ]
                }),
                platform === 'ios' && mode === 'sheet' && /*#__PURE__*/ _jsx("div", {
                    className: "vkuiActionSheet__close-item-wrapper--ios",
                    children: iosCloseItem !== null && iosCloseItem !== void 0 ? iosCloseItem : /*#__PURE__*/ _jsx(ActionSheetDefaultIosCloseItem, {})
                })
            ]
        }))
    });
    if (mode === 'menu') {
        return actionSheet;
    }
    return /*#__PURE__*/ _jsx(PopoutWrapper, {
        closing: Boolean(closingBy),
        alignY: "bottom",
        className: className,
        style: style,
        onClick: onCloseWithOther,
        fixed: true,
        children: actionSheet
    });
};

//# sourceMappingURL=ActionSheet.js.map