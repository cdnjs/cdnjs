import * as React from 'react';
import { noop } from '@vkontakte/vkjs';
import { useAdaptivityWithJSMediaQueries } from '../../hooks/useAdaptivityWithJSMediaQueries';
import { useObjectMemo } from '../../hooks/useObjectMemo';
import { usePlatform } from '../../hooks/usePlatform';
import { useTimeout } from '../../hooks/useTimeout';
import { Platform } from '../../lib/platform';
import { useScrollLock } from '../AppRoot/ScrollContext';
import { PopoutWrapper } from '../PopoutWrapper/PopoutWrapper';
import { Footnote } from '../Typography/Footnote/Footnote';
import { ActionSheetContext } from './ActionSheetContext';
import { ActionSheetDropdown } from './ActionSheetDropdown';
import { ActionSheetDropdownDesktop } from './ActionSheetDropdownDesktop';
import styles from './ActionSheet.module.css';
/**
 * @see https://vkcom.github.io/VKUI/#/ActionSheet
 */ export const ActionSheet = ({ children, className, header, text, style, iosCloseItem, popupDirection = 'bottom', popupOffsetDistance, ...restProps })=>{
    const platform = usePlatform();
    const [closing, setClosing] = React.useState(false);
    const onClose = ()=>setClosing(true);
    const _action = React.useRef(noop);
    const afterClose = ()=>{
        restProps.onClose();
        _action.current();
        _action.current = noop;
    };
    const { isDesktop } = useAdaptivityWithJSMediaQueries();
    useScrollLock(!isDesktop);
    let timeout = platform === Platform.IOS ? 300 : 200;
    if (isDesktop) {
        timeout = 0;
    }
    const fallbackTransitionFinish = useTimeout(afterClose, timeout);
    React.useEffect(()=>{
        if (closing) {
            fallbackTransitionFinish.set();
        } else {
            fallbackTransitionFinish.clear();
        }
    }, [
        closing,
        fallbackTransitionFinish
    ]);
    const onItemClick = React.useCallback((action, immediateAction, autoClose)=>(event)=>{
            event.persist();
            immediateAction && immediateAction(event);
            if (autoClose) {
                _action.current = ()=>action && action(event);
                setClosing(true);
            } else {
                action && action(event);
            }
        }, []);
    const contextValue = useObjectMemo({
        onItemClick,
        isDesktop
    });
    const DropdownComponent = isDesktop ? ActionSheetDropdownDesktop : ActionSheetDropdown;
    const dropdownProps = isDesktop ? Object.assign(restProps, {
        popupOffsetDistance,
        popupDirection
    }) : restProps;
    const actionSheet = /*#__PURE__*/ React.createElement(ActionSheetContext.Provider, {
        value: contextValue
    }, /*#__PURE__*/ React.createElement(DropdownComponent, {
        closing: closing,
        timeout: timeout,
        ...dropdownProps,
        onClose: onClose,
        className: isDesktop ? className : undefined,
        style: isDesktop ? style : undefined
    }, (header || text) && /*#__PURE__*/ React.createElement("header", {
        className: styles['ActionSheet__header']
    }, header && /*#__PURE__*/ React.createElement(Footnote, {
        weight: "2",
        className: styles['ActionSheet__title']
    }, header), text && /*#__PURE__*/ React.createElement(Footnote, {
        className: styles['ActionSheet__text']
    }, text)), children, platform === Platform.IOS && !isDesktop && iosCloseItem));
    if (isDesktop) {
        return actionSheet;
    }
    return /*#__PURE__*/ React.createElement(PopoutWrapper, {
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