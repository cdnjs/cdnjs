import * as React from 'react';
import { classNames } from '@vkontakte/vkjs';
import { CustomScrollView } from '../CustomScrollView/CustomScrollView';
import { Popper } from '../Popper/Popper';
import { Spinner } from '../Spinner/Spinner';
import styles from './CustomSelectDropdown.module.css';
const calcIsTop = (placement)=>placement?.includes('top');
export const CustomSelectDropdown = ({ children, targetRef, scrollBoxRef, placement, fetching, onPlacementChange: parentOnPlacementChange, offsetDistance = 0, sameWidth = true, forcePortal = true, autoHideScrollbar, autoHideScrollbarDelay, className, noMaxHeight = false, ...restProps })=>{
    const [isTop, setIsTop] = React.useState(()=>calcIsTop(placement));
    const onPlacementChange = React.useCallback(({ placement })=>{
        setIsTop(calcIsTop(placement));
        parentOnPlacementChange?.(placement);
    }, [
        parentOnPlacementChange,
        setIsTop
    ]);
    return /*#__PURE__*/ React.createElement(Popper, {
        targetRef: targetRef,
        offsetDistance: offsetDistance,
        sameWidth: sameWidth,
        onPlacementChange: onPlacementChange,
        placement: placement,
        className: classNames(styles['CustomSelectDropdown'], 'vkuiInternalCustomSelectDropdown', offsetDistance === 0 && (isTop ? styles['CustomSelectDropdown--top'] : styles['CustomSelectDropdown--bottom']), sameWidth && classNames(styles['CustomSelectDropdown--wide'], 'vkuiInternalCustomSelectDropdown--wide'), className),
        forcePortal: forcePortal,
        autoUpdateOnTargetResize: true,
        ...restProps
    }, /*#__PURE__*/ React.createElement(CustomScrollView, {
        boxRef: scrollBoxRef,
        className: noMaxHeight ? undefined : styles['CustomSelectDropdown__in--withMaxHeight'],
        autoHideScrollbar: autoHideScrollbar,
        autoHideScrollbarDelay: autoHideScrollbarDelay
    }, fetching ? /*#__PURE__*/ React.createElement("div", {
        className: styles['CustomSelectDropdown__fetching']
    }, /*#__PURE__*/ React.createElement(Spinner, {
        size: "small"
    })) : children));
};

//# sourceMappingURL=CustomSelectDropdown.js.map