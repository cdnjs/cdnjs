import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from 'react';
import { Icon20CheckCircleOn, Icon24CheckCircleOn } from '@vkontakte/icons';
import { AdaptiveIconRenderer } from '../../../AdaptiveIconRenderer/AdaptiveIconRenderer';
import { RootComponent } from '../../../RootComponent/RootComponent';
import { VisuallyHidden } from '../../../VisuallyHidden/VisuallyHidden';
import styles from './Radio.module.css';
const adaptiveIcon = /*#__PURE__*/ _jsx(AdaptiveIconRenderer, {
    IconCompact: Icon20CheckCircleOn,
    IconRegular: Icon24CheckCircleOn
});
export const Radio = ({ children = adaptiveIcon, getRootRef, getRef, className, style, ...restProps })=>{
    return /*#__PURE__*/ _jsxs(RootComponent, {
        getRootRef: getRootRef,
        className: className,
        style: style,
        children: [
            /*#__PURE__*/ _jsx(VisuallyHidden, {
                Component: "input",
                getRootRef: getRef,
                type: "radio",
                className: styles['ActionSheetItemRadio__input'],
                ...restProps
            }),
            children
        ]
    });
};

//# sourceMappingURL=Radio.js.map