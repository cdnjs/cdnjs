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
var _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
var _object_spread = require("@swc/helpers/_/_object_spread");
var _object_without_properties = require("@swc/helpers/_/_object_without_properties");
var _sliced_to_array = require("@swc/helpers/_/_sliced_to_array");
var _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
var _vkjs = require("@vkontakte/vkjs");
var _useExternRef = require("../../hooks/useExternRef");
var _comparing = require("../../lib/comparing");
var _Clickable = require("../Clickable/Clickable");
var _ImageBaseBadge = require("./ImageBaseBadge/ImageBaseBadge");
var _ImageBaseOverlay = require("./ImageBaseOverlay/ImageBaseOverlay");
var _context = require("./context");
var _validators = require("./validators");
var _helpers = require("./helpers");
/**
 * Размер по умолчанию.
 */ var defaultSize = 24;
var ImageBase = function(_param) {
    var alt = _param.alt, crossOrigin = _param.crossOrigin, decoding = _param.decoding, loading = _param.loading, referrerPolicy = _param.referrerPolicy, sizes = _param.sizes, src = _param.src, srcSet = _param.srcSet, useMap = _param.useMap, getRef = _param.getRef, sizeProp = _param.size, widthImg = _param.width, heightImg = _param.height, widthSize = _param.widthSize, heightSize = _param.heightSize, style = _param.style, _param_withBorder = _param.withBorder, withBorder = _param_withBorder === void 0 ? true : _param_withBorder, fallbackIconProp = _param.fallbackIcon, children = _param.children, onLoad = _param.onLoad, onError = _param.onError, withTransparentBackground = _param.withTransparentBackground, restProps = _object_without_properties._(_param, [
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
        "withBorder",
        "fallbackIcon",
        "children",
        "onLoad",
        "onError",
        "withTransparentBackground"
    ]);
    var size = sizeProp !== null && sizeProp !== void 0 ? sizeProp : (0, _comparing.minOr)([
        widthSize,
        heightSize
    ], defaultSize);
    var width = widthSize !== null && widthSize !== void 0 ? widthSize : size;
    var height = heightSize !== null && heightSize !== void 0 ? heightSize : size;
    var _React_useState = _sliced_to_array._(_react.useState(false), 2), loaded = _React_useState[0], setLoaded = _React_useState[1];
    var _React_useState1 = _sliced_to_array._(_react.useState(false), 2), failed = _React_useState1[0], setFailed = _React_useState1[1];
    var hasSrc = src || srcSet;
    var needShowFallbackIcon = (failed || !hasSrc) && /*#__PURE__*/ _react.isValidElement(fallbackIconProp);
    var fallbackIcon = needShowFallbackIcon ? fallbackIconProp : null;
    if (process.env.NODE_ENV === "development") {
        (0, _validators.validateSize)(size);
        if (fallbackIcon) {
            (0, _validators.validateFallbackIcon)(size, {
                name: "fallbackIcon",
                value: fallbackIcon
            });
        }
    }
    var handleImageLoad = function(event) {
        if (loaded) {
            return;
        }
        setLoaded(true);
        setFailed(false);
        onLoad === null || onLoad === void 0 ? void 0 : onLoad(event);
    };
    var handleImageError = function(event) {
        setLoaded(false);
        setFailed(true);
        onError === null || onError === void 0 ? void 0 : onError(event);
    };
    var imgRef = (0, _useExternRef.useExternRef)(getRef);
    var isOnLoadStatusCheckedRef = _react.useRef(false);
    _react.useEffect(function dispatchLoadEventForAlreadyLoadedResourceIfReactInitializedLater() {
        if (isOnLoadStatusCheckedRef.current) {
            return;
        }
        isOnLoadStatusCheckedRef.current = true;
        if (imgRef.current && imgRef.current.complete && !loaded) {
            var event = new Event("load");
            imgRef.current.dispatchEvent(event);
        }
    }, [
        imgRef,
        loaded
    ]);
    return /*#__PURE__*/ _react.createElement(_context.ImageBaseContext.Provider, {
        value: {
            size: size
        }
    }, /*#__PURE__*/ _react.createElement(_Clickable.Clickable, _object_spread._({
        style: _object_spread._({
            width: width,
            height: height
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
    }, fallbackIcon), children, withBorder && /*#__PURE__*/ _react.createElement("div", {
        "aria-hidden": true,
        className: "vkuiImageBase__border"
    })));
};
ImageBase.Badge = _ImageBaseBadge.ImageBaseBadge;
ImageBase.Overlay = _ImageBaseOverlay.ImageBaseOverlay;

//# sourceMappingURL=ImageBase.js.map