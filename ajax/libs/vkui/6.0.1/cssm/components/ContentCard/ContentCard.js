import * as React from 'react';
import { classNames, hasReactNode } from '@vkontakte/vkjs';
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
getRef, maxHeight, src, srcSet, alt = '', width, height, crossOrigin, decoding, loading, referrerPolicy, sizes, useMap, hasHover = false, hasActive = false, ...restProps })=>{
    return /*#__PURE__*/ React.createElement(Card, {
        mode: mode,
        getRootRef: getRootRef,
        style: style,
        className: classNames(restProps.disabled && styles['ContentCard--disabled'], className)
    }, /*#__PURE__*/ React.createElement(Tappable, {
        ...restProps,
        hasHover: hasHover,
        hasActive: hasActive,
        className: styles['ContentCard__tappable']
    }, (src || srcSet) && /*#__PURE__*/ React.createElement("img", {
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
        height: height,
        style: {
            maxHeight
        },
        width: "100%"
    }), /*#__PURE__*/ React.createElement("div", {
        className: styles['ContentCard__body']
    }, hasReactNode(subtitle) && /*#__PURE__*/ React.createElement(Caption, {
        className: classNames(styles['ContentCard__text'], styles['ContentCard__subtitle']),
        weight: "1",
        level: "3",
        caps: true
    }, subtitle), hasReactNode(header) && /*#__PURE__*/ React.createElement(Headline, {
        className: styles['ContentCard__text'],
        weight: "2",
        level: "1",
        Component: headerComponent
    }, header), hasReactNode(text) && /*#__PURE__*/ React.createElement(Text, {
        className: styles['ContentCard__text']
    }, text), hasReactNode(caption) && /*#__PURE__*/ React.createElement(Footnote, {
        className: classNames(styles['ContentCard__text'], styles['ContentCard__caption'])
    }, caption))));
};

//# sourceMappingURL=ContentCard.js.map