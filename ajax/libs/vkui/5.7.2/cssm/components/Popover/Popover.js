import * as React from 'react';
import { classNames } from '@vkontakte/vkjs';
import { useEventListener } from '../../hooks/useEventListener';
import { useExternRef } from '../../hooks/useExternRef';
import { useGlobalEventListener } from '../../hooks/useGlobalEventListener';
import { usePatchChildrenRef } from '../../hooks/usePatchChildrenRef';
import { useTimeout } from '../../hooks/useTimeout';
import { useDOM } from '../../lib/dom';
import { FocusTrap } from '../FocusTrap/FocusTrap';
import { Popper } from '../Popper/Popper';
import styles from './Popover.module.css';
/**
 * @see https://vkcom.github.io/VKUI/#/Popover
 */ export const Popover = ({ action = 'click', shown: shownProp, showDelay = 150, hideDelay = 150, offsetDistance = 8, content, children, style: styleProp, className, getRef, onShownChange, restoreFocus = true, ...restProps })=>{
    const { document } = useDOM();
    const hoverable = action === 'hover';
    const hovered = React.useRef(false);
    const [computedShown, setComputedShown] = React.useState(shownProp || false);
    const [dropdownNode, setPopperNode] = React.useState(null);
    const shown = typeof shownProp === 'boolean' ? shownProp : computedShown;
    const patchedPopperRef = useExternRef(setPopperNode, getRef);
    const [childRef, child] = usePatchChildrenRef(children);
    const setShown = (value)=>{
        if (typeof shownProp !== 'boolean') {
            setComputedShown(value);
        }
        typeof onShownChange === 'function' && onShownChange(value);
    };
    const showTimeout = useTimeout(()=>setShown(true), showDelay);
    const hideTimeout = useTimeout(()=>setShown(false), hideDelay);
    const handleTargetEnter = ()=>{
        hovered.current = true;
        hideTimeout.clear();
        showTimeout.set();
    };
    const handleTargetClick = ()=>{
        if (hovered.current && shown) {
            return;
        }
        setShown(!shown);
    };
    const handleTargetLeave = ()=>{
        hovered.current = false;
        showTimeout.clear();
        hideTimeout.set();
    };
    const handleContentKeyDownEscape = ()=>{
        setShown(false);
    };
    const handleOutsideClick = (e)=>{
        if (dropdownNode && !childRef.current?.contains(e.target) && !dropdownNode.contains(e.target)) {
            setShown(false);
        }
    };
    useGlobalEventListener(document, 'click', handleOutsideClick, {
        capture: true,
        passive: true
    });
    const targetEnterListener = useEventListener('mouseenter', handleTargetEnter);
    const targetClickEvent = useEventListener('click', handleTargetClick);
    const targetLeaveListener = useEventListener('mouseleave', handleTargetLeave);
    React.useEffect(()=>{
        if (!childRef.current) {
            return;
        }
        targetClickEvent.add(childRef.current);
    }, [
        childRef,
        targetClickEvent
    ]);
    React.useEffect(()=>{
        if (!childRef.current) {
            return;
        }
        if (hoverable) {
            targetEnterListener.add(childRef.current);
            targetLeaveListener.add(childRef.current);
        }
        return ()=>{
            targetEnterListener.remove();
            targetLeaveListener.remove();
        };
    }, [
        childRef,
        hoverable,
        targetEnterListener,
        targetLeaveListener
    ]);
    return /*#__PURE__*/ React.createElement(React.Fragment, null, child, shown && /*#__PURE__*/ React.createElement(Popper, {
        ...restProps,
        className: classNames(styles['Popover'], className),
        targetRef: childRef,
        getRef: patchedPopperRef,
        offsetDistance: offsetDistance,
        style: // Reason: Typescript ругается на CSS Custom Properties в объекте
        // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
        {
            ...styleProp,
            '--vkui_internal--popover_safe_zone_padding': `${offsetDistance}px`
        },
        renderContent: ({ className: wrapperClassName })=>/*#__PURE__*/ React.createElement(FocusTrap, {
                className: classNames(styles['Popover__in'], wrapperClassName),
                onClose: handleContentKeyDownEscape,
                restoreFocus: restoreFocus
            }, content),
        onMouseOver: hoverable ? hideTimeout.clear : undefined,
        onMouseOut: hoverable ? handleTargetLeave : undefined
    }));
};

//# sourceMappingURL=Popover.js.map