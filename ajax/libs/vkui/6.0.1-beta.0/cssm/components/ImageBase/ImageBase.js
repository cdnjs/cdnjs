import * as React from 'react';
import { classNames } from '@vkontakte/vkjs';
import { useExternRef } from '../../hooks/useExternRef';
import { minOr } from '../../lib/comparing';
import { Clickable } from '../Clickable/Clickable';
import { ImageBaseBadge } from './ImageBaseBadge/ImageBaseBadge';
import { ImageBaseOverlay } from './ImageBaseOverlay/ImageBaseOverlay';
import { ImageBaseContext } from './context';
import { validateFallbackIcon, validateSize } from './validators';
import styles from './ImageBase.module.css';
export { getBadgeIconSizeByImageBaseSize, getFallbackIconSizeByImageBaseSize, getOverlayIconSizeByImageBaseSize } from './helpers';
export { ImageBaseContext };
/**
 * Размер по умолчанию.
 */ const defaultSize = 24;
/**
 * @see https://vkcom.github.io/VKUI/#/ImageBase
 */ export const ImageBase = ({ alt, crossOrigin, decoding, loading, referrerPolicy, sizes, src, srcSet, useMap, getRef, size: sizeProp, width: widthImg, height: heightImg, widthSize, heightSize, style, noBorder = false, fallbackIcon: fallbackIconProp, children, onLoad, onError, withTransparentBackground, ...restProps })=>{
    const size = sizeProp ?? minOr([
        widthSize,
        heightSize
    ], defaultSize);
    const width = widthSize ?? size;
    const height = heightSize ?? size;
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
    return /*#__PURE__*/ React.createElement(ImageBaseContext.Provider, {
        value: {
            size
        }
    }, /*#__PURE__*/ React.createElement(Clickable, {
        style: {
            width,
            height,
            ...style
        },
        baseClassName: classNames(styles['ImageBase'], loaded && styles['ImageBase--loaded'], withTransparentBackground && styles['ImageBase--transparent-background']),
        ...restProps
    }, hasSrc && /*#__PURE__*/ React.createElement("img", {
        ref: imgRef,
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
        width: widthImg,
        height: heightImg,
        onLoad: handleImageLoad,
        onError: handleImageError
    }), fallbackIcon && /*#__PURE__*/ React.createElement("div", {
        className: styles['ImageBase__fallback']
    }, fallbackIcon), children, !noBorder && /*#__PURE__*/ React.createElement("div", {
        "aria-hidden": true,
        className: styles['ImageBase__border']
    })));
};
ImageBase.Badge = ImageBaseBadge;
ImageBase.Overlay = ImageBaseOverlay;

//# sourceMappingURL=ImageBase.js.map