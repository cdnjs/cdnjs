import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from 'react';
import { noop } from '@vkontakte/vkjs';
import { useAdaptivityWithJSMediaQueries } from '../../hooks/useAdaptivityWithJSMediaQueries';
import { useObjectMemo } from '../../hooks/useObjectMemo';
import { usePlatform } from '../../hooks/usePlatform';
import { useTimeout } from '../../hooks/useTimeout';
import { useScrollLock } from '../AppRoot/ScrollContext';
import { PopoutWrapper } from '../PopoutWrapper/PopoutWrapper';
import { Footnote } from '../Typography/Footnote/Footnote';
import { ActionSheetContext } from './ActionSheetContext';
import { ActionSheetDefaultIosCloseItem } from './ActionSheetDefaultIosCloseItem';
import { ActionSheetDropdownMenu } from './ActionSheetDropdownMenu';
import { ActionSheetDropdownSheet } from './ActionSheetDropdownSheet';
import styles from './ActionSheet.module.css';
/**
 * @see https://vkcom.github.io/VKUI/#/ActionSheet
 */ export const ActionSheet = ({ children, className, header, text, style, iosCloseItem, popupOffsetDistance, placement, mode: modeProp, ...restProps })=>{
    const platform = usePlatform();
    const [closingBy, setClosingBy] = React.useState(undefined);
    const onClose = ()=>setClosingBy('other');
    const _action = React.useRef(noop);
    const afterClose = ()=>{
        restProps.onClose({
            closedBy: closingBy || 'other'
        });
        _action.current();
        _action.current = noop;
    };
    const { isDesktop } = useAdaptivityWithJSMediaQueries();
    const mode = modeProp ?? (isDesktop ? 'menu' : 'sheet');
    useScrollLock(mode === 'sheet');
    let timeout = platform === 'ios' ? 300 : 200;
    if (mode === 'menu') {
        timeout = 0;
    }
    const fallbackTransitionFinish = useTimeout(afterClose, timeout);
    React.useEffect(()=>{
        if (closingBy) {
            fallbackTransitionFinish.set();
        } else {
            fallbackTransitionFinish.clear();
        }
    }, [
        closingBy,
        fallbackTransitionFinish
    ]);
    const onItemClick = React.useCallback(({ action, immediateAction, autoClose, isCancelItem })=>(event)=>{
            event.persist();
            immediateAction && immediateAction(event);
            if (autoClose) {
                _action.current = ()=>action && action(event);
                setClosingBy(isCancelItem ? 'cancel-item' : 'action-item');
            } else {
                action && action(event);
            }
        }, []);
    const contextValue = useObjectMemo({
        onItemClick,
        mode
    });
    const DropdownComponent = mode === 'menu' ? ActionSheetDropdownMenu : ActionSheetDropdownSheet;
    const dropdownProps = mode === 'menu' ? Object.assign(restProps, {
        popupOffsetDistance,
        placement
    }) : restProps;
    const actionSheet = /*#__PURE__*/ _jsx(ActionSheetContext.Provider, {
        value: contextValue,
        children: /*#__PURE__*/ _jsxs(DropdownComponent, {
            closing: Boolean(closingBy),
            timeout: timeout,
            ...dropdownProps,
            onClose: onClose,
            className: mode === 'menu' ? className : undefined,
            style: mode === 'menu' ? style : undefined,
            children: [
                /*#__PURE__*/ _jsxs("div", {
                    className: styles['ActionSheet__content-wrapper'],
                    children: [
                        (header || text) && /*#__PURE__*/ _jsxs("div", {
                            className: styles['ActionSheet__header'],
                            children: [
                                header && /*#__PURE__*/ _jsx(Footnote, {
                                    weight: "2",
                                    className: styles['ActionSheet__title'],
                                    children: header
                                }),
                                text && /*#__PURE__*/ _jsx(Footnote, {
                                    className: styles['ActionSheet__text'],
                                    children: text
                                })
                            ]
                        }),
                        children
                    ]
                }),
                platform === 'ios' && mode === 'sheet' && /*#__PURE__*/ _jsx("div", {
                    className: styles['ActionSheet__close-item-wrapper--ios'],
                    children: iosCloseItem ?? /*#__PURE__*/ _jsx(ActionSheetDefaultIosCloseItem, {})
                })
            ]
        })
    });
    if (mode === 'menu') {
        return actionSheet;
    }
    return /*#__PURE__*/ _jsx(PopoutWrapper, {
        closing: Boolean(closingBy),
        alignY: "bottom",
        className: className,
        style: style,
        onClick: onClose,
        fixed: true,
        children: actionSheet
    });
};

//# sourceMappingURL=ActionSheet.js.map