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
    const actionSheet = /*#__PURE__*/ React.createElement(ActionSheetContext.Provider, {
        value: contextValue
    }, /*#__PURE__*/ React.createElement(DropdownComponent, {
        closing: Boolean(closingBy),
        timeout: timeout,
        ...dropdownProps,
        onClose: onClose,
        className: mode === 'menu' ? className : undefined,
        style: mode === 'menu' ? style : undefined
    }, /*#__PURE__*/ React.createElement("div", {
        className: styles['ActionSheet__content-wrapper']
    }, (header || text) && /*#__PURE__*/ React.createElement("div", {
        className: styles['ActionSheet__header']
    }, header && /*#__PURE__*/ React.createElement(Footnote, {
        weight: "2",
        className: styles['ActionSheet__title']
    }, header), text && /*#__PURE__*/ React.createElement(Footnote, {
        className: styles['ActionSheet__text']
    }, text)), children), platform === 'ios' && mode === 'sheet' && /*#__PURE__*/ React.createElement("div", {
        className: styles['ActionSheet__close-item-wrapper--ios']
    }, iosCloseItem ?? /*#__PURE__*/ React.createElement(ActionSheetDefaultIosCloseItem, null))));
    if (mode === 'menu') {
        return actionSheet;
    }
    return /*#__PURE__*/ React.createElement(PopoutWrapper, {
        closing: Boolean(closingBy),
        alignY: "bottom",
        className: className,
        style: style,
        onClick: onClose,
        fixed: true
    }, actionSheet);
};

//# sourceMappingURL=ActionSheet.js.map