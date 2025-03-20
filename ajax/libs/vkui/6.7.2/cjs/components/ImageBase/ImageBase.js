"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    ImageBase: function() {
        return ImageBase;
    },
    ImageBaseContext: function() {
        return _context.ImageBaseContext;
    },
    getBadgeIconSizeByImageBaseSize: function() {
        return _helpers.getBadgeIconSizeByImageBaseSize;
    },
    getFallbackIconSizeByImageBaseSize: function() {
        return _helpers.getFallbackIconSizeByImageBaseSize;
    },
    getOverlayIconSizeByImageBaseSize: function() {
        return _helpers.getOverlayIconSizeByImageBaseSize;
    }
});
const _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
const _object_spread = require("@swc/helpers/_/_object_spread");
const _object_spread_props = require("@swc/helpers/_/_object_spread_props");
const _object_without_properties = require("@swc/helpers/_/_object_without_properties");
const _jsxruntime = require("react/jsx-runtime");
const _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
const _vkjs = require("@vkontakte/vkjs");
const _useExternRef = require("../../hooks/useExternRef");
const _comparing = require("../../lib/comparing");
const _utils = require("../../lib/utils");
const _Clickable = require("../Clickable/Clickable");
const _ImageBaseBadge = require("./ImageBaseBadge/ImageBaseBadge");
const _ImageBaseOverlay = require("./ImageBaseOverlay/ImageBaseOverlay");
const _context = require("./context");
const _validators = require("./validators");
const _helpers = require("./helpers");
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
const ImageBase = (_param)=>{
    var { alt, crossOrigin, decoding, loading, referrerPolicy, sizes, src, srcSet, useMap, fetchPriority, getRef, size: sizeProp, width: widthImg, height: heightImg, widthSize, heightSize, style, noBorder = false, fallbackIcon: fallbackIconProp, children, onLoad, onError, withTransparentBackground, objectFit = 'cover', keepAspectRatio = false } = _param, restProps = _object_without_properties._(_param, [
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
    const size = sizeProp !== null && sizeProp !== void 0 ? sizeProp : (0, _comparing.minOr)([
        sizeToNumber(widthSize),
        sizeToNumber(heightSize)
    ], defaultSize);
    const width = widthSize !== null && widthSize !== void 0 ? widthSize : keepAspectRatio ? undefined : size;
    const height = heightSize !== null && heightSize !== void 0 ? heightSize : keepAspectRatio ? undefined : size;
    const [loaded, setLoaded] = _react.useState(false);
    const [failed, setFailed] = _react.useState(false);
    const hasSrc = src || srcSet;
    const needShowFallbackIcon = (failed || !hasSrc) && /*#__PURE__*/ _react.isValidElement(fallbackIconProp);
    const fallbackIcon = needShowFallbackIcon ? fallbackIconProp : null;
    if (process.env.NODE_ENV === 'development') {
        (0, _validators.validateSize)(size);
        if (fallbackIcon) {
            (0, _validators.validateFallbackIcon)(size, {
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
    const imgRef = (0, _useExternRef.useExternRef)(getRef);
    const isOnLoadStatusCheckedRef = _react.useRef(false);
    _react.useEffect(function dispatchLoadEventForAlreadyLoadedResourceIfReactInitializedLater() {
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
    return /*#__PURE__*/ (0, _jsxruntime.jsx)(_context.ImageBaseContext.Provider, {
        value: {
            size
        },
        children: /*#__PURE__*/ (0, _jsxruntime.jsxs)(_Clickable.Clickable, _object_spread_props._(_object_spread._({
            style: _object_spread._({
                width,
                height
            }, style),
            baseClassName: (0, _vkjs.classNames)("vkuiImageBase", loaded && "vkuiImageBase--loaded", withTransparentBackground && "vkuiImageBase--transparent-background")
        }, restProps), {
            children: [
                hasSrc && /*#__PURE__*/ (0, _jsxruntime.jsx)("img", _object_spread._({
                    ref: imgRef,
                    alt: alt,
                    className: (0, _vkjs.classNames)("vkuiImageBase__img", getObjectFitClassName(objectFit), keepAspectRatio && "vkuiImageBase__img--keepRatio"),
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
                }, (0, _utils.getFetchPriorityProp)(fetchPriority))),
                fallbackIcon && /*#__PURE__*/ (0, _jsxruntime.jsx)("div", {
                    className: "vkuiImageBase__fallback",
                    children: fallbackIcon
                }),
                children && /*#__PURE__*/ (0, _jsxruntime.jsx)("div", {
                    className: "vkuiImageBase__children",
                    children: children
                }),
                !noBorder && /*#__PURE__*/ (0, _jsxruntime.jsx)("div", {
                    "aria-hidden": true,
                    className: "vkuiImageBase__border"
                })
            ]
        }))
    });
};
ImageBase.displayName = 'ImageBase';
ImageBase.Badge = _ImageBaseBadge.ImageBaseBadge;
ImageBase.Badge.displayName = 'ImageBase.Badge';
ImageBase.Overlay = _ImageBaseOverlay.ImageBaseOverlay;
ImageBase.Overlay.displayName = 'ImageBase.Overlay';

//# sourceMappingURL=ImageBase.js.map