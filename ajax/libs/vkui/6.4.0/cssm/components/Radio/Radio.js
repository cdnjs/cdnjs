import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from 'react';
import { classNames, hasReactNode } from '@vkontakte/vkjs';
import { useAdaptivity } from '../../hooks/useAdaptivity';
import { usePlatform } from '../../hooks/usePlatform';
import { DEFAULT_ACTIVE_EFFECT_DELAY } from '../Clickable/useState';
import { Tappable } from '../Tappable/Tappable';
import { Footnote } from '../Typography/Footnote/Footnote';
import { Text } from '../Typography/Text/Text';
import { VisuallyHidden } from '../VisuallyHidden/VisuallyHidden';
import styles from './Radio.module.css';
const sizeYClassNames = {
    none: styles['Radio--sizeY-none'],
    ['compact']: styles['Radio--sizeY-compact']
};
const RadioIcon = (props)=>{
    return /*#__PURE__*/ _jsxs("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 24 24",
        "aria-hidden": true,
        ...props,
        children: [
            /*#__PURE__*/ _jsx("circle", {
                cx: "12",
                cy: "12",
                r: "11",
                stroke: "currentColor",
                strokeWidth: "2",
                fill: "none"
            }),
            /*#__PURE__*/ _jsx("circle", {
                cx: "12",
                cy: "12",
                r: "7.5",
                className: styles['Radio__pin'],
                fill: "currentColor"
            })
        ]
    });
};
/**
 * @see https://vkcom.github.io/VKUI/#/Radio
 */ export const Radio = ({ children, description, style, className, getRootRef, titleAfter, getRef, labelProps, hoverMode, activeMode, hasHover, hasActive, focusVisibleMode, ...restProps })=>{
    const platform = usePlatform();
    const { sizeY = 'none' } = useAdaptivity();
    return /*#__PURE__*/ _jsxs(Tappable, {
        Component: "label",
        style: style,
        className: classNames(styles['Radio'], sizeY !== 'regular' && sizeYClassNames[sizeY], className),
        activeEffectDelay: platform === 'ios' ? 100 : DEFAULT_ACTIVE_EFFECT_DELAY,
        disabled: restProps.disabled,
        getRootRef: getRootRef,
        hoverMode: hoverMode,
        activeMode: activeMode,
        hasHover: hasHover,
        hasActive: hasActive,
        focusVisibleMode: focusVisibleMode,
        ...labelProps,
        children: [
            /*#__PURE__*/ _jsx(VisuallyHidden, {
                ...restProps,
                Component: "input",
                type: "radio",
                getRootRef: getRef,
                className: styles['Radio__input']
            }),
            /*#__PURE__*/ _jsxs("div", {
                className: styles['Radio__container'],
                children: [
                    /*#__PURE__*/ _jsx(RadioIcon, {
                        className: styles['Radio__icon']
                    }),
                    /*#__PURE__*/ _jsxs("div", {
                        className: styles['Radio__content'],
                        children: [
                            /*#__PURE__*/ _jsxs("div", {
                                className: styles['Radio__title'],
                                children: [
                                    /*#__PURE__*/ _jsx(Text, {
                                        children: children
                                    }),
                                    /*#__PURE__*/ _jsx("div", {
                                        className: styles['Radio__titleAfter'],
                                        children: titleAfter
                                    })
                                ]
                            }),
                            hasReactNode(description) && /*#__PURE__*/ _jsx(Footnote, {
                                className: styles['Radio__description'],
                                children: description
                            })
                        ]
                    })
                ]
            })
        ]
    });
};

//# sourceMappingURL=Radio.js.map