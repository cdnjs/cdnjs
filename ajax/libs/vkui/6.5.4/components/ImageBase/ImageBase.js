import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from 'react';
import { classNames } from '@vkontakte/vkjs';
import { useExternRef } from '../../hooks/useExternRef';
import { minOr } from '../../lib/comparing';
import { getFetchPriorityProp } from '../../lib/utils';
import { Clickable } from '../Clickable/Clickable';
import { ImageBaseBadge } from './ImageBaseBadge/ImageBaseBadge';
import { ImageBaseOverlay } from './ImageBaseOverlay/ImageBaseOverlay';
import { ImageBaseContext } from './context';
import { validateFallbackIcon, validateSize } from './validators';
export { getBadgeIconSizeByImageBaseSize, getFallbackIconSizeByImageBaseSize, getOverlayIconSizeByImageBaseSize } from './helpers';
export { ImageBaseContext };
/**
 * Размер по умолчанию.
 */ const defaultSize = 24;
const getObjectFitClassName = (objectFit)=>{
    switch(objectFit){
        case 'contain':
            return "vkuiImageBase__img--objectFit-contain";
        case 'cover':
            return "vkuiImageBase__img--objectFit-cover";
        case 'none':
            return "vkuiImageBase__img--objectFit-none";
        case 'scale-down':
            return "vkuiImageBase__img--objectFit-scaleDown";
    }
    return undefined;
};
const parsePx = (value)=>{
    if (value.endsWith('px')) {
        return parseInt(value);
    }
    return undefined;
};
const sizeToNumber = (size)=>{
    if (typeof size === 'string') {
        return parsePx(size);
    }
    return size;
};
/**
 * @see https://vkcom.github.io/VKUI/#/ImageBase
 */ export const ImageBase = (_param)=>{
    var { alt, crossOrigin, decoding, loading, referrerPolicy, sizes, src, srcSet, useMap, fetchPriority, getRef, size: sizeProp, width: widthImg, height: heightImg, widthSize, heightSize, style, noBorder = false, fallbackIcon: fallbackIconProp, children, onLoad, onError, withTransparentBackground, objectFit = 'cover', keepAspectRatio = false } = _param, restProps = _object_without_properties(_param, [
        "alt",
        "crossOrigin",
        "decoding",
        "loading",
        "referrerPolicy",
        "sizes",
        "src",
        "srcSet",
        "useMap",
        "fetchPriority",
        "getRef",
        "size",
        "width",
        "height",
        "widthSize",
        "heightSize",
        "style",
        "noBorder",
        "fallbackIcon",
        "children",
        "onLoad",
        "onError",
        "withTransparentBackground",
        "objectFit",
        "keepAspectRatio"
    ]);
    const size = sizeProp !== null && sizeProp !== void 0 ? sizeProp : minOr([
        sizeToNumber(widthSize),
        sizeToNumber(heightSize)
    ], defaultSize);
    const width = widthSize !== null && widthSize !== void 0 ? widthSize : keepAspectRatio ? undefined : size;
    const height = heightSize !== null && heightSize !== void 0 ? heightSize : keepAspectRatio ? undefined : size;
    const [loaded, setLoaded] = React.useState(false);
    const [failed, setFailed] = React.useState(false);
    const hasSrc = src || srcSet;
    const needShowFallbackIcon = (failed || !hasSrc) && /*#__PURE__*/ React.isValidElement(fallbackIconProp);
    const fallbackIcon = needShowFallbackIcon ? fallbackIconProp : null;
    if (process.env.NODE_ENV === 'development') {
        validateSize(size);
        if (fallbackIcon) {
            validateFallbackIcon(size, {
                name: 'fallbackIcon',
                value: fallbackIcon
            });
        }
    }
    const handleImageLoad = (event)=>{
        if (loaded) {
            return;
        }
        setLoaded(true);
        setFailed(false);
        onLoad === null || onLoad === void 0 ? void 0 : onLoad(event);
    };
    const handleImageError = (event)=>{
        setLoaded(false);
        setFailed(true);
        onError === null || onError === void 0 ? void 0 : onError(event);
    };
    const imgRef = useExternRef(getRef);
    const isOnLoadStatusCheckedRef = React.useRef(false);
    React.useEffect(function dispatchLoadEventForAlreadyLoadedResourceIfReactInitializedLater() {
        if (isOnLoadStatusCheckedRef.current) {
            return;
        }
        isOnLoadStatusCheckedRef.current = true;
        if (imgRef.current && imgRef.current.complete && !loaded) {
            const event = new Event('load');
            imgRef.current.dispatchEvent(event);
        }
    }, [
        imgRef,
        loaded
    ]);
    return /*#__PURE__*/ _jsx(ImageBaseContext.Provider, {
        value: {
            size
        },
        children: /*#__PURE__*/ _jsxs(Clickable, _object_spread_props(_object_spread({
            style: _object_spread({
                width,
                height
            }, style),
            baseClassName: classNames("vkuiImageBase", loaded && "vkuiImageBase--loaded", withTransparentBackground && "vkuiImageBase--transparent-background")
        }, restProps), {
            children: [
                hasSrc && /*#__PURE__*/ _jsx("img", _object_spread({
                    ref: imgRef,
                    alt: alt,
                    className: classNames("vkuiImageBase__img", getObjectFitClassName(objectFit), keepAspectRatio && "vkuiImageBase__img--keepRatio"),
                    crossOrigin: crossOrigin,
                    decoding: decoding,
                    loading: loading,
                    referrerPolicy: referrerPolicy,
                    style: keepAspectRatio ? {
                        width: widthImg || width,
                        height: heightImg || height
                    } : undefined,
                    sizes: sizes,
                    src: src,
                    srcSet: srcSet,
                    useMap: useMap,
                    width: widthImg,
                    height: heightImg,
                    onLoad: handleImageLoad,
                    onError: handleImageError
                }, getFetchPriorityProp(fetchPriority))),
                fallbackIcon && /*#__PURE__*/ _jsx("div", {
                    className: "vkuiImageBase__fallback",
                    children: fallbackIcon
                }),
                children && /*#__PURE__*/ _jsx("div", {
                    className: "vkuiImageBase__children",
                    children: children
                }),
                !noBorder && /*#__PURE__*/ _jsx("div", {
                    "aria-hidden": true,
                    className: "vkuiImageBase__border"
                })
            ]
        }))
    });
};
ImageBase.displayName = 'ImageBase';
ImageBase.Badge = ImageBaseBadge;
ImageBase.Badge.displayName = 'ImageBase.Badge';
ImageBase.Overlay = ImageBaseOverlay;
ImageBase.Overlay.displayName = 'ImageBase.Overlay';

//# sourceMappingURL=ImageBase.js.map