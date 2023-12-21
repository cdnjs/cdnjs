import * as React from 'react';
import { classNames } from '@vkontakte/vkjs';
import { CustomScrollView } from '../CustomScrollView/CustomScrollView';
import { Popper } from '../Popper/Popper';
import { Spinner } from '../Spinner/Spinner';
import styles from './CustomSelectDropdown.module.css';
const calcIsTop = (placement)=>placement.startsWith('top');
export const CustomSelectDropdown = ({ children, targetRef, scrollBoxRef, placement = 'bottom', fetching, onPlacementChange: parentOnPlacementChange, offsetDistance = 0, sameWidth = true, forcePortal = true, autoHideScrollbar, autoHideScrollbarDelay, className, noMaxHeight = false, ...restProps })=>{
    const [isTop, setIsTop] = React.useState(()=>calcIsTop(placement));
    const onPlacementChange = React.useCallback((placement)=>{
        setIsTop(calcIsTop(placement));
        if (parentOnPlacementChange) {
            parentOnPlacementChange(placement);
        }
    }, [
        parentOnPlacementChange
    ]);
    return /*#__PURE__*/ React.createElement(Popper, {
        targetRef: targetRef,
        offsetByMainAxis: offsetDistance,
        sameWidth: sameWidth,
        onPlacementChange: onPlacementChange,
        placement: placement,
        className: classNames(styles['CustomSelectDropdown'], 'vkuiInternalCustomSelectDropdown', offsetDistance === 0 && (isTop ? styles['CustomSelectDropdown--top'] : styles['CustomSelectDropdown--bottom']), sameWidth && classNames(styles['CustomSelectDropdown--wide'], 'vkuiInternalCustomSelectDropdown--wide'), className),
        usePortal: forcePortal,
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