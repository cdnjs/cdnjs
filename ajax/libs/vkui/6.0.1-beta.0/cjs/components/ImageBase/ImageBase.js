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
const _object_without_properties = require("@swc/helpers/_/_object_without_properties");
const _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
const _vkjs = require("@vkontakte/vkjs");
const _useExternRef = require("../../hooks/useExternRef");
const _comparing = require("../../lib/comparing");
const _Clickable = require("../Clickable/Clickable");
const _ImageBaseBadge = require("./ImageBaseBadge/ImageBaseBadge");
const _ImageBaseOverlay = require("./ImageBaseOverlay/ImageBaseOverlay");
const _context = require("./context");
const _validators = require("./validators");
const _helpers = require("./helpers");
/**
 * Размер по умолчанию.
 */ const defaultSize = 24;
const ImageBase = (_param)=>{
    var { alt, crossOrigin, decoding, loading, referrerPolicy, sizes, src, srcSet, useMap, getRef, size: sizeProp, width: widthImg, height: heightImg, widthSize, heightSize, style, noBorder = false, fallbackIcon: fallbackIconProp, children, onLoad, onError, withTransparentBackground } = _param, restProps = _object_without_properties._(_param, [
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
    const size = sizeProp !== null && sizeProp !== void 0 ? sizeProp : (0, _comparing.minOr)([
        widthSize,
        heightSize
    ], defaultSize);
    const width = widthSize !== null && widthSize !== void 0 ? widthSize : size;
    const height = heightSize !== null && heightSize !== void 0 ? heightSize : size;
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
    return /*#__PURE__*/ _react.createElement(_context.ImageBaseContext.Provider, {
        value: {
            size
        }
    }, /*#__PURE__*/ _react.createElement(_Clickable.Clickable, _object_spread._({
        style: _object_spread._({
            width,
            height
        }, style),
        baseClassName: (0, _vkjs.classNames)("vkuiImageBase", loaded && "vkuiImageBase--loaded", withTransparentBackground && "vkuiImageBase--transparent-background")
    }, restProps), hasSrc && /*#__PURE__*/ _react.createElement("img", {
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
    }), fallbackIcon && /*#__PURE__*/ _react.createElement("div", {
        className: "vkuiImageBase__fallback"
    }, fallbackIcon), children, !noBorder && /*#__PURE__*/ _react.createElement("div", {
        "aria-hidden": true,
        className: "vkuiImageBase__border"
    })));
};
ImageBase.Badge = _ImageBaseBadge.ImageBaseBadge;
ImageBase.Overlay = _ImageBaseOverlay.ImageBaseOverlay;

//# sourceMappingURL=ImageBase.js.map