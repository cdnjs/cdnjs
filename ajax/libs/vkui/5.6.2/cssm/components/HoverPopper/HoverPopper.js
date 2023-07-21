import * as React from 'react';
import { useEventListener } from '../../hooks/useEventListener';
import { usePatchChildrenRef } from '../../hooks/usePatchChildrenRef';
import { useTimeout } from '../../hooks/useTimeout';
import { useIsomorphicLayoutEffect } from '../../lib/useIsomorphicLayoutEffect';
import { Popper } from '../Popper/Popper';
export const HoverPopper = ({ getRef, content, children, onShownChange, shown: _shown, showDelay = 150, hideDelay = 150, ...restProps })=>{
    const [computedShown, setComputedShown] = React.useState(_shown || false);
    const shown = typeof _shown === 'boolean' ? _shown : computedShown;
    const setShown = (value)=>{
        if (typeof _shown !== 'boolean') {
            setComputedShown(value);
        }
        typeof onShownChange === 'function' && onShownChange(value);
    };
    const showTimeout = useTimeout(()=>{
        setShown(true);
    }, showDelay);
    const hideTimeout = useTimeout(()=>{
        setShown(false);
    }, hideDelay);
    const [childRef, child] = usePatchChildrenRef(children);
    const onTargetEnter = ()=>{
        hideTimeout.clear();
        showTimeout.set();
    };
    const onTargetLeave = ()=>{
        showTimeout.clear();
        hideTimeout.set();
    };
    const targetEnterListener = useEventListener('pointerenter', onTargetEnter);
    const targetLeaveListener = useEventListener('pointerleave', onTargetLeave);
    useIsomorphicLayoutEffect(()=>{
        if (childRef.current) {
            targetEnterListener.add(childRef.current);
            targetLeaveListener.add(childRef.current);
        }
    }, []);
    return /*#__PURE__*/ React.createElement(React.Fragment, null, child, shown && /*#__PURE__*/ React.createElement(Popper, {
        ...restProps,
        onMouseOver: hideTimeout.clear,
        onMouseOut: onTargetLeave,
        getRef: getRef,
        targetRef: childRef
    }, content));
};

//# sourceMappingURL=HoverPopper.js.map