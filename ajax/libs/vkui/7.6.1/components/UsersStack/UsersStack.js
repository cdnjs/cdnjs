'use client';
import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { classNames, hasReactNode } from "@vkontakte/vkjs";
import { useConfigDirection } from "../../hooks/useConfigDirection.js";
import { RootComponent } from "../RootComponent/RootComponent.js";
import { Caption } from "../Typography/Caption/Caption.js";
import { Footnote } from "../Typography/Footnote/Footnote.js";
const stylesSize = {
    s: "vkuiUsersStack__sizeS",
    m: "vkuiUsersStack__sizeM",
    l: "vkuiUsersStack__sizeL"
};
const avatarsPositionStyles = {
    'inline-start': "vkuiUsersStack__avatarsPositionInlineStart",
    'inline-end': "vkuiUsersStack__avatarsPositionInlineEnd",
    'block-start': "vkuiUsersStack__avatarsPositionBlockStart"
};
function PathElement(_param) {
    var { photoSize, direction } = _param, props = _object_without_properties(_param, [
        "photoSize",
        "direction"
    ]);
    switch(direction){
        case 'circle':
            const radius = photoSize / 2;
            return /*#__PURE__*/ _jsx("circle", _object_spread({
                cx: radius,
                cy: radius,
                r: radius
            }, props));
        case 'right':
            switch(photoSize){
                case 16:
                    return /*#__PURE__*/ _jsx("path", _object_spread({
                        d: "M14,13.285A8 8 0 0 1 8 16A8 8 0 0 1 8 0A8 8 0 0 1 14 2.715A8 8 0 0 0 14,13.285"
                    }, props));
                case 24:
                    return /*#__PURE__*/ _jsx("path", _object_spread({
                        d: "M22,18.625A12 12 0 0 1 12 24A12 12 0 0 1 12 0A12 12 0 0 1 22 5.375A12 12 0 0 0 22,18.625"
                    }, props));
                default:
                    return /*#__PURE__*/ _jsx("path", _object_spread({
                        d: "M30,23.75A16 16 0 0 1 16 32A16 16 0 0 1 16 0A16 16 0 0 1 30 8.25A16 16 0 0 0 30,23.75"
                    }, props));
            }
        default:
            switch(photoSize){
                case 16:
                    return /*#__PURE__*/ _jsx("path", _object_spread({
                        d: "M2,13.285A8 8 0 0 0 8 16A8 8 0 0 0 8 0A8 8 0 0 0 2 2.715A8 8 0 0 1 2,13.285"
                    }, props));
                case 24:
                    return /*#__PURE__*/ _jsx("path", _object_spread({
                        d: "M2,18.625A12 12 0 0 0 12 24A12 12 0 0 0 12 0A12 12 0 0 0 2 5.375A12 12 0 0 1 2,18.625"
                    }, props));
                default:
                    return /*#__PURE__*/ _jsx("path", _object_spread({
                        d: "M2,23.75A16 16 0 0 0 16 32A16 16 0 0 0 16 0A16 16 0 0 0 2 8.25A16 16 0 0 1 2,23.75"
                    }, props));
            }
    }
}
const photoSizes = {
    s: 16,
    m: 24,
    l: 32
};
/**
 * @see https://vkui.io/components/users-stack
 */ export const UsersStack = (_param)=>{
    var { photos = [], visibleCount = 3, count = Math.max(0, photos.length - visibleCount), size = 'm', children, avatarsPosition = 'inline-start' } = _param, restProps = _object_without_properties(_param, [
        "photos",
        "visibleCount",
        "count",
        "size",
        "children",
        "avatarsPosition"
    ]);
    const cmpId = React.useId();
    const direction = useConfigDirection();
    const canShowOthers = count > 0 && count < 100 && size !== 's';
    const CounterTypography = size === 'l' ? Footnote : Caption;
    const photoSize = photoSizes[size];
    const directionClip = direction === 'ltr' ? canShowOthers ? 'right' : 'left' : canShowOthers ? 'left' : 'right';
    const photosElements = photos.slice(0, visibleCount).map((photo, i)=>{
        const direction = i === 0 && !canShowOthers ? 'circle' : directionClip;
        const id = `UsersStackDefs${cmpId}${i}`;
        const hrefID = `#${id}`;
        const maskID = `UsersStackMask${cmpId}${i}`;
        const isPhotoType = typeof photo === 'object';
        const photoSrc = isPhotoType ? photo.src : photo;
        let photoElement = /*#__PURE__*/ _jsxs("svg", {
            xmlns: "http://www.w3.org/2000/svg",
            className: classNames("vkuiUsersStack__photo", "vkuiUsersStack__item"),
            "aria-hidden": true,
            display: "block",
            children: [
                /*#__PURE__*/ _jsx("defs", {
                    children: /*#__PURE__*/ _jsx(PathElement, {
                        id: id,
                        direction: direction,
                        photoSize: photoSize
                    })
                }),
                /*#__PURE__*/ _jsx("clipPath", {
                    id: maskID,
                    children: /*#__PURE__*/ _jsx("use", {
                        href: hrefID
                    })
                }),
                /*#__PURE__*/ _jsxs("g", {
                    clipPath: `url(#${maskID})`,
                    children: [
                        /*#__PURE__*/ _jsx("use", {
                            href: hrefID,
                            className: "vkuiUsersStack__fill"
                        }),
                        /*#__PURE__*/ _jsx("image", {
                            href: photoSrc,
                            width: photoSize,
                            height: photoSize
                        }),
                        /*#__PURE__*/ _jsx("use", {
                            href: hrefID,
                            fill: "none",
                            stroke: "rgba(0, 0, 0, 0.08)"
                        })
                    ]
                })
            ]
        });
        if (isPhotoType && photo.renderWrapper) {
            photoElement = photo.renderWrapper({
                'children': photoElement,
                'data-src': photoSrc
            });
        }
        return /*#__PURE__*/ _jsx("div", {
            className: "vkuiUsersStack__photoWrapper",
            children: photoElement
        }, i);
    });
    const othersElement = canShowOthers ? /*#__PURE__*/ _jsx("div", {
        className: "vkuiUsersStack__photoWrapper",
        children: /*#__PURE__*/ _jsxs(CounterTypography, {
            caps: true,
            weight: "1",
            className: classNames("vkuiUsersStack__item", "vkuiUsersStack__counter"),
            children: [
                "+",
                count
            ]
        })
    }) : null;
    return /*#__PURE__*/ _jsxs(RootComponent, _object_spread_props(_object_spread({}, restProps), {
        baseClassName: classNames("vkuiUsersStack__host", stylesSize[size], avatarsPositionStyles[avatarsPosition]),
        children: [
            (photosElements.length > 0 || othersElement) && /*#__PURE__*/ _jsxs("div", {
                className: "vkuiUsersStack__photos",
                "aria-hidden": true,
                children: [
                    photosElements,
                    othersElement
                ]
            }),
            hasReactNode(children) && /*#__PURE__*/ _jsx(Footnote, {
                className: "vkuiUsersStack__text",
                children: children
            })
        ]
    }));
};

//# sourceMappingURL=UsersStack.js.map