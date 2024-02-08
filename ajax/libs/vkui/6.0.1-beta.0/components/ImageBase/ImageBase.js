import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import * as React from 'react';
import { classNames } from '@vkontakte/vkjs';
import { useExternRef } from '../../hooks/useExternRef';
import { minOr } from '../../lib/comparing';
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
/**
 * @see https://vkcom.github.io/VKUI/#/ImageBase
 */ export const ImageBase = (_param)=>{
    var { alt, crossOrigin, decoding, loading, referrerPolicy, sizes, src, srcSet, useMap, getRef, size: sizeProp, width: widthImg, height: heightImg, widthSize, heightSize, style, noBorder = false, fallbackIcon: fallbackIconProp, children, onLoad, onError, withTransparentBackground } = _param, restProps = _object_without_properties(_param, [
        "alt",
        "crossOrigin",
        "decoding",
        "loading",
        "referrerPolicy",
        "sizes",
        "src",
        "srcSet",
        "useMap",
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
        "withTransparentBackground"
    ]);
    const size = sizeProp !== null && sizeProp !== void 0 ? sizeProp : minOr([
        widthSize,
        heightSize
    ], defaultSize);
    const width = widthSize !== null && widthSize !== void 0 ? widthSize : size;
    const height = heightSize !== null && heightSize !== void 0 ? heightSize : size;
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
    return /*#__PURE__*/ React.createElement(ImageBaseContext.Provider, {
        value: {
            size
        }
    }, /*#__PURE__*/ React.createElement(Clickable, _object_spread({
        style: _object_spread({
            width,
            height
        }, style),
        baseClassName: classNames("vkuiImageBase", loaded && "vkuiImageBase--loaded", withTransparentBackground && "vkuiImageBase--transparent-background")
    }, restProps), hasSrc && /*#__PURE__*/ React.createElement("img", {
        ref: imgRef,
        alt: alt,
        className: "vkuiImageBase__img",
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
        className: "vkuiImageBase__fallback"
    }, fallbackIcon), children, !noBorder && /*#__PURE__*/ React.createElement("div", {
        "aria-hidden": true,
        className: "vkuiImageBase__border"
    })));
};
ImageBase.Badge = ImageBaseBadge;
ImageBase.Overlay = ImageBaseOverlay;

//# sourceMappingURL=ImageBase.js.map