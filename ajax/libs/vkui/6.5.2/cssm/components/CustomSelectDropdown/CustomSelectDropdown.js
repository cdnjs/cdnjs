import { jsx as _jsx } from "react/jsx-runtime";
import * as React from 'react';
import { classNames } from '@vkontakte/vkjs';
import { CustomScrollView } from '../CustomScrollView/CustomScrollView';
import { Popper } from '../Popper/Popper';
import { Spinner } from '../Spinner/Spinner';
import styles from './CustomSelectDropdown.module.css';
export const CustomSelectDropdown = ({ children, targetRef, scrollBoxRef, placement = 'bottom', fetching, offsetDistance = 0, autoWidth = false, forcePortal = true, autoHideScrollbar, autoHideScrollbarDelay, className, noMaxHeight = false, // CustomScrollView
overscrollBehavior, ...restProps })=>{
    return /*#__PURE__*/ _jsx(Popper, {
        targetRef: targetRef,
        offsetByMainAxis: offsetDistance,
        sameWidth: !autoWidth,
        placement: placement,
        className: classNames(styles['CustomSelectDropdown'], 'vkuiInternalCustomSelectDropdown', offsetDistance === 0 && (placement.includes('top') ? styles['CustomSelectDropdown--top'] : styles['CustomSelectDropdown--bottom']), autoWidth && classNames(styles['CustomSelectDropdown--wide'], 'vkuiInternalCustomSelectDropdown--wide'), className),
        usePortal: forcePortal,
        autoUpdateOnTargetResize: true,
        ...restProps,
        children: /*#__PURE__*/ _jsx(CustomScrollView, {
            boxRef: scrollBoxRef,
            className: noMaxHeight ? undefined : styles['CustomSelectDropdown__in--withMaxHeight'],
            autoHideScrollbar: autoHideScrollbar,
            autoHideScrollbarDelay: autoHideScrollbarDelay,
            overscrollBehavior: overscrollBehavior,
            children: fetching ? /*#__PURE__*/ _jsx("div", {
                className: styles['CustomSelectDropdown__fetching'],
                children: /*#__PURE__*/ _jsx(Spinner, {
                    size: "small"
                })
            }) : children
        })
    });
};

//# sourceMappingURL=CustomSelectDropdown.js.map