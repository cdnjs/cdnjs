import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { classNames } from "@vkontakte/vkjs";
import { useExternRef } from "../../hooks/useExternRef.js";
import { minOr } from "../../lib/comparing.js";
import { getFetchPriorityProp } from "../../lib/utils.js";
import { Clickable } from "../Clickable/Clickable.js";
import { ImageBaseBadge } from "./ImageBaseBadge/ImageBaseBadge.js";
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
 */ export const ImageBase = ({ alt, crossOrigin, decoding, loading, referrerPolicy, sizes, src, srcSet, useMap, fetchPriority, getRef, size: sizeProp, width: widthImg, height: heightImg, widthSize, heightSize, style, noBorder = false, fallbackIcon: fallbackIconProp, children, onLoad, onError, withTransparentBackground, objectFit = 'cover', keepAspectRatio = false, ...restProps })=>{
    const size = sizeProp ?? minOr([
        sizeToNumber(widthSize),
        sizeToNumber(heightSize)
    ], defaultSize);
    const width = widthSize ?? (keepAspectRatio ? undefined : size);
    const height = heightSize ?? (keepAspectRatio ? undefined : size);
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
    return /*#__PURE__*/ _jsx(ImageBaseContext.Provider, {
        value: {
            size
        },
        children: /*#__PURE__*/ _jsxs(Clickable, {
            style: {
                width,
                height,
                ...style
            },
            baseClassName: classNames(styles.host, loaded && styles.loaded, withTransparentBackground && styles.transparentBackground),
            ...restProps,
            children: [
                hasSrc && /*#__PURE__*/ _jsx("img", {
                    ref: imgRef,
                    alt: alt,
                    className: classNames(styles.img, getObjectFitClassName(objectFit), keepAspectRatio && styles.imgKeepRatio),
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
                    onError: handleImageError,
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

//# sourceMappingURL=ImageBase.js.map