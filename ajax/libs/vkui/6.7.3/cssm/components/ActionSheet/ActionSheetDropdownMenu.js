import { jsx as _jsx } from "react/jsx-runtime";
import * as React from 'react';
import { classNames } from '@vkontakte/vkjs';
import { useAdaptivityWithJSMediaQueries } from '../../hooks/useAdaptivityWithJSMediaQueries';
import { useEffectDev } from '../../hooks/useEffectDev';
import { useEventListener } from '../../hooks/useEventListener';
import { usePlatform } from '../../hooks/usePlatform';
import { useDOM } from '../../lib/dom';
import { isRefObject } from '../../lib/isRefObject';
import { warnOnce } from '../../lib/warnOnce';
import { FocusTrap } from '../FocusTrap/FocusTrap';
import { Popper } from '../Popper/Popper';
import styles from './ActionSheet.module.css';
const warn = warnOnce('ActionSheet');
function getEl(ref) {
    return ref && 'current' in ref ? ref.current : ref;
}
export const ActionSheetDropdownMenu = ({ children, toggleRef, closing, onClose, className, style, popupOffsetDistance = 0, placement, onAnimationStart, onAnimationEnd, ...restProps })=>{
    const { document } = useDOM();
    const platform = usePlatform();
    const { sizeY } = useAdaptivityWithJSMediaQueries();
    const elementRef = React.useRef(null);
    useEffectDev(()=>{
        const toggleEl = getEl(toggleRef);
        if (!toggleEl) {
            warn(`Свойство "toggleRef" не передано`, 'error');
        }
    }, [
        toggleRef
    ]);
    const bodyClickListener = useEventListener('click', (e)=>{
        const dropdownElement = elementRef?.current;
        if (dropdownElement && !dropdownElement.contains(e.target)) {
            onClose?.();
        }
    });
    React.useEffect(()=>{
        setTimeout(()=>{
            bodyClickListener.add(document.body);
        });
    }, [
        bodyClickListener,
        document
    ]);
    const onClick = React.useCallback((e)=>e.stopPropagation(), []);
    const targetRef = React.useMemo(()=>{
        if (isRefObject(toggleRef)) {
            return toggleRef;
        }
        return {
            current: toggleRef
        };
    }, [
        toggleRef
    ]);
    return /*#__PURE__*/ _jsx(Popper, {
        targetRef: targetRef,
        offsetByMainAxis: popupOffsetDistance,
        placement: placement,
        className: classNames(styles['ActionSheet'], platform === 'ios' && styles['ActionSheet--ios'], styles['ActionSheet--menu'], closing ? styles['ActionSheet--closing'] : styles['ActionSheet--opening'], sizeY === 'compact' && styles['ActionSheet--sizeY-compact'], className),
        style: style,
        getRootRef: elementRef,
        usePortal: false,
        onAnimationStart: onAnimationStart,
        onAnimationEnd: onAnimationEnd,
        children: /*#__PURE__*/ _jsx(FocusTrap, {
            onClose: onClose,
            ...restProps,
            onClick: onClick,
            children: children
        })
    });
};

//# sourceMappingURL=ActionSheetDropdownMenu.js.map