import * as React from 'react';
import { classNames } from '@vkontakte/vkjs';
import { ImageBaseBadge } from './ImageBaseBadge/ImageBaseBadge';
import { ImageBaseOverlay } from './ImageBaseOverlay/ImageBaseOverlay';
import { ImageBaseContext } from './context';
import { validateFallbackIcon, validateSize } from './validators';
import styles from './ImageBase.module.css';
export { getBadgeIconSizeByImageBaseSize, getFallbackIconSizeByImageBaseSize, getOverlayIconSizeByImageBaseSize } from './helpers';
export { ImageBaseContext };
/**
 * @see https://vkcom.github.io/VKUI/#/ImageBase
 */ export const ImageBase = ({ alt, crossOrigin, decoding, loading, referrerPolicy, sizes, src, srcSet, useMap, getRef, size = 24, width, height, style, className, getRootRef, withBorder = true, 'fallbackIcon': fallbackIconProp, children, 'aria-label': ariaLabel, onClick, onLoad, onError, ...restProps })=>{
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
        setLoaded(true);
        setFailed(false);
        onLoad?.(event);
    };
    const handleImageError = (event)=>{
        setLoaded(false);
        setFailed(true);
        onError?.(event);
    };
    const sizeClassName = (()=>{
        switch(size){
            case 28:
                return styles['ImageBase--size-28'];
            case 32:
                return styles['ImageBase--size-32'];
            case 40:
                return styles['ImageBase--size-40'];
            case 48:
                return styles['ImageBase--size-48'];
            case 72:
                return styles['ImageBase--size-72'];
        }
        return null;
    })();
    return /*#__PURE__*/ React.createElement(ImageBaseContext.Provider, {
        value: {
            size
        }
    }, /*#__PURE__*/ React.createElement("div", {
        ...restProps,
        ref: getRootRef,
        style: {
            ...style,
            width: size,
            height: size
        },
        className: classNames(className, styles['ImageBase'], sizeClassName, loaded && styles['ImageBase--loaded']),
        role: hasSrc ? 'img' : 'presentation',
        "aria-label": ariaLabel,
        onClick: onClick
    }, hasSrc && /*#__PURE__*/ React.createElement("img", {
        ref: getRef,
        alt: alt,
        className: styles['ImageBase__img'],
        crossOrigin: crossOrigin,
        decoding: decoding,
        loading: loading,
        referrerPolicy: referrerPolicy,
        sizes: sizes,
        src: src,
        srcSet: srcSet,
        useMap: useMap,
        width: width,
        height: height,
        onLoad: handleImageLoad,
        onError: handleImageError
    }), fallbackIcon && /*#__PURE__*/ React.createElement("div", {
        className: classNames(styles['ImageBase__fallback'])
    }, fallbackIcon), children, withBorder && /*#__PURE__*/ React.createElement("div", {
        "aria-hidden": true,
        className: styles['ImageBase__border']
    })));
};
ImageBase.Badge = ImageBaseBadge;
ImageBase.Overlay = ImageBaseOverlay;

//# sourceMappingURL=ImageBase.js.map