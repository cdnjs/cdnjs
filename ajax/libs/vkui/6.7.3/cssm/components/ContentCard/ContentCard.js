import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from 'react';
import { classNames, hasReactNode } from '@vkontakte/vkjs';
import { getFetchPriorityProp } from '../../lib/utils';
import { Card } from '../Card/Card';
import { Tappable } from '../Tappable/Tappable';
import { Caption } from '../Typography/Caption/Caption';
import { Footnote } from '../Typography/Footnote/Footnote';
import { Headline } from '../Typography/Headline/Headline';
import { Text } from '../Typography/Text/Text';
import styles from './ContentCard.module.css';
/**
 * @see https://vkcom.github.io/VKUI/#/ContentCard
 */ export const ContentCard = ({ subtitle, header, headerComponent = 'span', text, caption, // card props
className, mode = 'shadow', style, getRootRef, // img props
getRef, maxHeight, src, srcSet, alt = '', width, height, crossOrigin, decoding, loading, referrerPolicy, sizes, useMap, fetchPriority, hasHover = false, hasActive = false, // TODO [>=7]: поменять тег на li https://github.com/VKCOM/VKUI/issues/7336
Component = 'div', ...restProps })=>{
    return /*#__PURE__*/ _jsx(Card, {
        mode: mode,
        getRootRef: getRootRef,
        Component: Component,
        style: style,
        className: classNames(restProps.disabled && styles['ContentCard--disabled'], className),
        children: /*#__PURE__*/ _jsxs(Tappable, {
            ...restProps,
            hasHover: hasHover,
            hasActive: hasActive,
            className: styles['ContentCard__tappable'],
            children: [
                (src || srcSet) && /*#__PURE__*/ _jsx("img", {
                    ref: getRef,
                    className: styles['ContentCard__img'],
                    src: src,
                    srcSet: srcSet,
                    alt: alt,
                    crossOrigin: crossOrigin,
                    decoding: decoding,
                    loading: loading,
                    referrerPolicy: referrerPolicy,
                    sizes: sizes,
                    useMap: useMap,
                    ...getFetchPriorityProp(fetchPriority),
                    height: height,
                    style: {
                        maxHeight
                    },
                    width: "100%"
                }),
                /*#__PURE__*/ _jsxs("div", {
                    className: styles['ContentCard__body'],
                    children: [
                        hasReactNode(subtitle) && /*#__PURE__*/ _jsx(Caption, {
                            className: classNames(styles['ContentCard__text'], styles['ContentCard__subtitle']),
                            weight: "1",
                            level: "3",
                            caps: true,
                            children: subtitle
                        }),
                        hasReactNode(header) && /*#__PURE__*/ _jsx(Headline, {
                            className: styles['ContentCard__text'],
                            weight: "2",
                            level: "1",
                            Component: headerComponent,
                            children: header
                        }),
                        hasReactNode(text) && /*#__PURE__*/ _jsx(Text, {
                            className: styles['ContentCard__text'],
                            children: text
                        }),
                        hasReactNode(caption) && /*#__PURE__*/ _jsx(Footnote, {
                            className: classNames(styles['ContentCard__text'], styles['ContentCard__caption']),
                            children: caption
                        })
                    ]
                })
            ]
        })
    });
};

//# sourceMappingURL=ContentCard.js.map