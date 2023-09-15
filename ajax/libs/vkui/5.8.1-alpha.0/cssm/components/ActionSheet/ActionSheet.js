import * as React from 'react';
import { noop } from '@vkontakte/vkjs';
import { useAdaptivityWithJSMediaQueries } from '../../hooks/useAdaptivityWithJSMediaQueries';
import { useObjectMemo } from '../../hooks/useObjectMemo';
import { usePlatform } from '../../hooks/usePlatform';
import { useTimeout } from '../../hooks/useTimeout';
import { Platform } from '../../lib/platform';
import { warnOnce } from '../../lib/warnOnce';
import { useScrollLock } from '../AppRoot/ScrollContext';
import { PopoutWrapper } from '../PopoutWrapper/PopoutWrapper';
import { Footnote } from '../Typography/Footnote/Footnote';
import { ActionSheetContext } from './ActionSheetContext';
import { ActionSheetDefaultIosCloseItem } from './ActionSheetDefaultIosCloseItem';
import { ActionSheetDropdown } from './ActionSheetDropdown';
import { ActionSheetDropdownDesktop } from './ActionSheetDropdownDesktop';
import styles from './ActionSheet.module.css';
const warn = warnOnce('ActionSheet');
/**
 * @see https://vkcom.github.io/VKUI/#/ActionSheet
 */ export const ActionSheet = ({ children, className, header, text, style, iosCloseItem, popupDirection, popupOffsetDistance, placement, ...restProps })=>{
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
    useScrollLock(!isDesktop);
    let timeout = platform === Platform.IOS ? 300 : 200;
    if (isDesktop) {
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
        isDesktop
    });
    const DropdownComponent = isDesktop ? ActionSheetDropdownDesktop : ActionSheetDropdown;
    if (process.env.NODE_ENV === 'development' && popupDirection) {
        // TODO [>=6]: popupDirection
        warn('Свойство "popupDirection" будет удалено в v6. Используйте свойство "placement"');
    }
    popupDirection = popupDirection !== undefined ? popupDirection : 'bottom';
    const dropdownProps = isDesktop ? Object.assign(restProps, {
        popupOffsetDistance,
        popupDirection,
        placement
    }) : restProps;
    const actionSheet = /*#__PURE__*/ React.createElement(ActionSheetContext.Provider, {
        value: contextValue
    }, /*#__PURE__*/ React.createElement(DropdownComponent, {
        closing: Boolean(closingBy),
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
    }, text)), children, platform === Platform.IOS && !isDesktop && (iosCloseItem ?? /*#__PURE__*/ React.createElement(ActionSheetDefaultIosCloseItem, null))));
    if (isDesktop) {
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