import * as React from 'react';
import { classNames, hasReactNode } from '@vkontakte/vkjs';
import { RootComponent } from '../RootComponent/RootComponent';
import { Caption } from '../Typography/Caption/Caption';
import { Footnote } from '../Typography/Footnote/Footnote';
import styles from './UsersStack.module.css';
const stylesSize = {
    s: styles['UsersStack--size-s'],
    m: styles['UsersStack--size-m'],
    l: styles['UsersStack--size-l']
};
const stylesDirection = {
    'row': styles['UsersStack--direction-row'],
    'row-reverse': styles['UsersStack--direction-row-reverse'],
    'column': styles['UsersStack--direction-column']
};
function PathElement({ photoSize, direction, ...props }) {
    switch(direction){
        case 'circle':
            const radius = photoSize / 2;
            return /*#__PURE__*/ React.createElement("circle", {
                cx: radius,
                cy: radius,
                r: radius,
                ...props
            });
        case 'right':
            switch(photoSize){
                case 24:
                    return /*#__PURE__*/ React.createElement("path", {
                        d: "M22,18.625A12 12 0 0 1 12 24A12 12 0 0 1 12 0A12 12 0 0 1 22 5.375A12 12 0 0 0 22,18.625",
                        ...props
                    });
                default:
                    return /*#__PURE__*/ React.createElement("path", {
                        d: "M30,23.75A16 16 0 0 1 16 32A16 16 0 0 1 16 0A16 16 0 0 1 30 8.25A16 16 0 0 0 30,23.75",
                        ...props
                    });
            }
        default:
            switch(photoSize){
                case 16:
                    return /*#__PURE__*/ React.createElement("path", {
                        d: "M2,13.285A8 8 0 0 0 8 16A8 8 0 0 0 8 0A8 8 0 0 0 2 2.715A8 8 0 0 1 2,13.285",
                        ...props
                    });
                case 24:
                    return /*#__PURE__*/ React.createElement("path", {
                        d: "M2,18.625A12 12 0 0 0 12 24A12 12 0 0 0 12 0A12 12 0 0 0 2 5.375A12 12 0 0 1 2,18.625",
                        ...props
                    });
                default:
                    return /*#__PURE__*/ React.createElement("path", {
                        d: "M2,23.75A16 16 0 0 0 16 32A16 16 0 0 0 16 0A16 16 0 0 0 2 8.25A16 16 0 0 1 2,23.75",
                        ...props
                    });
            }
    }
}
const photoSizes = {
    s: 16,
    m: 24,
    l: 32
};
/**
 * @see https://vkcom.github.io/VKUI/#/UsersStack
 */ export const UsersStack = ({ photos = [], visibleCount = 3, count = Math.max(0, photos.length - visibleCount), size = 'm', children, direction = 'row', ...restProps })=>{
    const cmpId = React.useId();
    const canShowOthers = count > 0 && count < 100 && size !== 's';
    const CounterTypography = size === 'l' ? Footnote : Caption;
    const photoSize = photoSizes[size];
    const directionClip = canShowOthers ? 'right' : 'left';
    const photosElements = photos.slice(0, visibleCount).map((photo, i)=>{
        const direction = i === 0 && !canShowOthers ? 'circle' : directionClip;
        const id = `UsersStackDefs${cmpId}${i}`;
        const hrefID = `#${id}`;
        const maskID = `UsersStackMask${cmpId}${i}`;
        return /*#__PURE__*/ React.createElement("svg", {
            xmlns: "http://www.w3.org/2000/svg",
            className: styles['UsersStack__photo'],
            key: i,
            "aria-hidden": true
        }, /*#__PURE__*/ React.createElement("defs", null, /*#__PURE__*/ React.createElement(PathElement, {
            id: id,
            direction: direction,
            photoSize: photoSize
        })), /*#__PURE__*/ React.createElement("clipPath", {
            id: maskID
        }, /*#__PURE__*/ React.createElement("use", {
            href: hrefID
        })), /*#__PURE__*/ React.createElement("g", {
            clipPath: `url(#${maskID})`
        }, /*#__PURE__*/ React.createElement("use", {
            href: hrefID,
            className: styles['UsersStack__fill']
        }), /*#__PURE__*/ React.createElement("image", {
            href: photo,
            width: photoSize,
            height: photoSize
        }), /*#__PURE__*/ React.createElement("use", {
            href: hrefID,
            fill: "none",
            stroke: "rgba(0, 0, 0, 0.08)"
        })));
    });
    const othersElement = canShowOthers ? /*#__PURE__*/ React.createElement(CounterTypography, {
        caps: true,
        weight: "1",
        className: classNames(styles['UsersStack__photo'], styles['UsersStack__photo--others'])
    }, "+", count) : null;
    return /*#__PURE__*/ React.createElement(RootComponent, {
        ...restProps,
        baseClassName: classNames(styles['UsersStack'], stylesSize[size], stylesDirection[direction])
    }, (photosElements.length > 0 || othersElement) && /*#__PURE__*/ React.createElement("div", {
        className: styles['UsersStack__photos'],
        "aria-hidden": true
    }, photosElements, othersElement), hasReactNode(children) && /*#__PURE__*/ React.createElement(Footnote, {
        className: styles['UsersStack__text']
    }, children));
};

//# sourceMappingURL=UsersStack.js.map