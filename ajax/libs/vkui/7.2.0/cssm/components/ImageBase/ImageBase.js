'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useRef } from "react";
import * as React from "react";
import { classNames } from "@vkontakte/vkjs";
import { mergeStyle } from "../../helpers/mergeStyle.js";
import { useExternRef } from "../../hooks/useExternRef.js";
import { minOr } from "../../lib/comparing.js";
import { getFetchPriorityProp } from "../../lib/utils.js";
import { Clickable } from "../Clickable/Clickable.js";
import { ImageBaseBadge } from "./ImageBaseBadge/ImageBaseBadge.js";
import { ImageBaseFloatElement } from "./ImageBaseFloatElement/ImageBaseFloatElement.js";
import { ImageBaseOverlay } from "./ImageBaseOverlay/ImageBaseOverlay.js";
import { ImageBaseContext } from "./context.js";
import { validateFallbackIcon, validateSize } from "./validators.js";
import styles from "./ImageBase.module.css";
export { getBadgeIconSizeByImageBaseSize, getFallbackIconSizeByImageBaseSize, getOverlayIconSizeByImageBaseSize } from "./helpers.js";
export { ImageBaseContext };
/**
 * Размер по умолчанию.
 */ const defaultSize = 24;
const getObjectFitClassName = (objectFit)=>{
    switch(objectFit){
        case 'contain':
            return styles.imgObjectFitContain;
        case 'cover':
            return styles.imgObjectFitCover;
        case 'none':
            return styles.imgObjectFitNone;
        case 'scale-down':
            return styles.imgObjectFitScaleDown;
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
 */ export const ImageBase = ({ alt, crossOrigin, decoding, loading, referrerPolicy, sizes, src, srcSet, useMap, fetchPriority, getRef, size: sizeProp, width: widthImg, height: heightImg, widthSize, heightSize, noBorder = false, fallbackIcon: fallbackIconProp, children, onLoad, onError, withTransparentBackground, objectFit = 'cover', objectPosition, filter, keepAspectRatio = false, getRootRef, elementTiming, ...restProps })=>{
    const size = sizeProp ?? minOr([
        sizeToNumber(widthSize),
        sizeToNumber(heightSize)
    ], defaultSize);
    const wrapperRef = useExternRef(getRootRef);
    const width = widthSize ?? (keepAspectRatio ? undefined : size);
    const height = heightSize ?? (keepAspectRatio ? undefined : size);
    const [loaded, setLoaded] = React.useState(false);
    const [failed, setFailed] = React.useState(false);
    const mouseOverHandlersRef = useRef([]);
    const mouseOutHandlersRef = useRef([]);
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
        onLoad?.(event);
    };
    const handleImageError = (event)=>{
        setLoaded(false);
        setFailed(true);
        onError?.(event);
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
        children: /*#__PURE__*/ _jsxs(Clickable, {
            baseStyle: {
                width,
                height
            },
            baseClassName: classNames(styles.host, loaded && styles.loaded, withTransparentBackground && styles.transparentBackground),
            getRootRef: wrapperRef,
            onMouseOver: onMouseOver,
            onMouseOut: onMouseOut,
            ...restProps,
            children: [
                hasSrc && /*#__PURE__*/ _jsx("img", {
                    ref: imgRef,
                    alt: alt,
                    className: classNames(styles.img, getObjectFitClassName(objectFit), objectPosition && styles.withObjectPosition, filter && styles.withFilter, keepAspectRatio && styles.imgKeepRatio),
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
                    elementtiming: elementTiming,
                    ...getFetchPriorityProp(fetchPriority)
                }),
                fallbackIcon && /*#__PURE__*/ _jsx("div", {
                    className: styles.fallback,
                    children: fallbackIcon
                }),
                children && /*#__PURE__*/ _jsx("div", {
                    className: styles.children,
                    children: children
                }),
                !noBorder && /*#__PURE__*/ _jsx("div", {
                    "aria-hidden": true,
                    className: styles.border
                })
            ]
        })
    });
};
ImageBase.displayName = 'ImageBase';
ImageBase.Badge = ImageBaseBadge;
ImageBase.Badge.displayName = 'ImageBase.Badge';
ImageBase.Overlay = ImageBaseOverlay;
ImageBase.Overlay.displayName = 'ImageBase.Overlay';
ImageBase.FloatElement = ImageBaseFloatElement;
ImageBase.FloatElement.displayName = 'ImageBase.FloatElement';

//# sourceMappingURL=ImageBase.js.map