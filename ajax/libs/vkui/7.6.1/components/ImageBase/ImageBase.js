'use client';
import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useRef } from "react";
import * as React from "react";
import { classNames } from "@vkontakte/vkjs";
import { mergeStyle } from "../../helpers/mergeStyle.js";
import { useExternRef } from "../../hooks/useExternRef.js";
import { minOr } from "../../lib/comparing.js";
import { defineComponentDisplayNames } from "../../lib/react/defineComponentDisplayNames.js";
import { getFetchPriorityProp } from "../../lib/utils.js";
import { Clickable } from "../Clickable/Clickable.js";
import { ImageBaseBadge } from "./ImageBaseBadge/ImageBaseBadge.js";
import { ImageBaseFloatElement } from "./ImageBaseFloatElement/ImageBaseFloatElement.js";
import { ImageBaseOverlay } from "./ImageBaseOverlay/ImageBaseOverlay.js";
import { ImageBaseContext } from "./context.js";
import { validateFallbackIcon, validateSize } from "./validators.js";
export { getBadgeIconSizeByImageBaseSize, getFallbackIconSizeByImageBaseSize, getOverlayIconSizeByImageBaseSize } from "./helpers.js";
export { ImageBaseContext };
/**
 * Размер по умолчанию.
 */ const defaultSize = 24;
const getObjectFitClassName = (objectFit)=>{
    switch(objectFit){
        case 'contain':
            return "vkuiImageBase__imgObjectFitContain";
        case 'cover':
            return "vkuiImageBase__imgObjectFitCover";
        case 'none':
            return "vkuiImageBase__imgObjectFitNone";
        case 'scale-down':
            return "vkuiImageBase__imgObjectFitScaleDown";
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
 * @see https://vkui.io/components/image-base
 */ export const ImageBase = (_param)=>{
    var { alt, crossOrigin, decoding, loading, referrerPolicy, sizes, src, srcSet, useMap, fetchPriority, getRef, size: sizeProp, width: widthImg, height: heightImg, widthSize, heightSize, noBorder = false, fallbackIcon: fallbackIconProp, children, onLoad, onError, withTransparentBackground, objectFit = 'cover', objectPosition, filter, keepAspectRatio = false, getRootRef, elementTiming } = _param, restProps = _object_without_properties(_param, [
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
        "noBorder",
        "fallbackIcon",
        "children",
        "onLoad",
        "onError",
        "withTransparentBackground",
        "objectFit",
        "objectPosition",
        "filter",
        "keepAspectRatio",
        "getRootRef",
        "elementTiming"
    ]);
    const size = sizeProp !== null && sizeProp !== void 0 ? sizeProp : minOr([
        sizeToNumber(widthSize),
        sizeToNumber(heightSize)
    ], defaultSize);
    const wrapperRef = useExternRef(getRootRef);
    const width = widthSize !== null && widthSize !== void 0 ? widthSize : keepAspectRatio ? undefined : size;
    const height = heightSize !== null && heightSize !== void 0 ? heightSize : keepAspectRatio ? undefined : size;
    const [loaded, setLoaded] = React.useState(false);
    const [failed, setFailed] = React.useState(false);
    const mouseOverHandlersRef = useRef([]);
    const mouseOutHandlersRef = useRef([]);
    const hasSrc = src || srcSet;
    const fallbackIcon = failed || !hasSrc ? fallbackIconProp : null;
    if (process.env.NODE_ENV === 'development') {
        validateSize(size);
        if (/*#__PURE__*/ React.isValidElement(fallbackIcon)) {
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
    const onMouseOver = ()=>{
        mouseOverHandlersRef.current.forEach((fn)=>fn());
    };
    const onMouseOut = ()=>{
        mouseOutHandlersRef.current.forEach((fn)=>fn());
    };
    const contextValue = React.useMemo(()=>({
            size,
            onMouseOverHandlers: mouseOverHandlersRef.current,
            onMouseOutHandlers: mouseOutHandlersRef.current
        }), [
        size
    ]);
    const imgStyles = objectPosition || filter ? {
        '--vkui_internal--ImageBase_object_position': objectPosition,
        '--vkui_internal--ImageBase_object_filter': filter
    } : undefined;
    const keepAspectRationStyles = keepAspectRatio ? {
        width: widthImg || width,
        height: heightImg || height
    } : undefined;
    return /*#__PURE__*/ _jsx(ImageBaseContext.Provider, {
        value: contextValue,
        children: /*#__PURE__*/ _jsxs(Clickable, _object_spread_props(_object_spread({
            baseStyle: {
                width,
                height
            },
            baseClassName: classNames("vkuiImageBase__host", hasSrc && loaded && "vkuiImageBase__loaded", withTransparentBackground && "vkuiImageBase__transparentBackground"),
            getRootRef: wrapperRef,
            onMouseOver: onMouseOver,
            onMouseOut: onMouseOut
        }, restProps), {
            children: [
                hasSrc && /*#__PURE__*/ _jsx("img", _object_spread({
                    ref: imgRef,
                    alt: alt,
                    className: classNames("vkuiImageBase__img", getObjectFitClassName(objectFit), objectPosition && "vkuiImageBase__withObjectPosition", filter && "vkuiImageBase__withFilter", keepAspectRatio && "vkuiImageBase__imgKeepRatio", failed && "vkuiImageBase__imgHiddenAlt"),
                    crossOrigin: crossOrigin,
                    decoding: decoding,
                    loading: loading,
                    referrerPolicy: referrerPolicy,
                    style: mergeStyle(keepAspectRationStyles, imgStyles),
                    sizes: sizes,
                    src: src,
                    srcSet: srcSet,
                    useMap: useMap,
                    width: widthImg,
                    height: heightImg,
                    onLoad: handleImageLoad,
                    onError: handleImageError,
                    // @ts-expect-error: TS2322 отсутствует в @types/react
                    elementtiming: elementTiming
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
ImageBase.Badge = ImageBaseBadge;
ImageBase.Overlay = ImageBaseOverlay;
ImageBase.FloatElement = ImageBaseFloatElement;
if (process.env.NODE_ENV !== 'production') {
    defineComponentDisplayNames(ImageBase.Badge, 'ImageBase.Badge');
    defineComponentDisplayNames(ImageBase.Overlay, 'ImageBase.Overlay');
    defineComponentDisplayNames(ImageBase.FloatElement, 'ImageBase.FloatElement');
}

//# sourceMappingURL=ImageBase.js.map