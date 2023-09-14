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
    getBadgeIconSizeByImageBaseSize: function() {
        return _helpers.getBadgeIconSizeByImageBaseSize;
    },
    getFallbackIconSizeByImageBaseSize: function() {
        return _helpers.getFallbackIconSizeByImageBaseSize;
    },
    getOverlayIconSizeByImageBaseSize: function() {
        return _helpers.getOverlayIconSizeByImageBaseSize;
    },
    ImageBaseContext: function() {
        return _context.ImageBaseContext;
    },
    ImageBase: function() {
        return ImageBase;
    }
});
var _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
var _object_spread = require("@swc/helpers/_/_object_spread");
var _object_spread_props = require("@swc/helpers/_/_object_spread_props");
var _object_without_properties = require("@swc/helpers/_/_object_without_properties");
var _sliced_to_array = require("@swc/helpers/_/_sliced_to_array");
var _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
var _vkjs = require("@vkontakte/vkjs");
var _useExternRef = require("../../hooks/useExternRef");
var _RootComponent = require("../RootComponent/RootComponent");
var _ImageBaseBadge = require("./ImageBaseBadge/ImageBaseBadge");
var _ImageBaseOverlay = require("./ImageBaseOverlay/ImageBaseOverlay");
var _context = require("./context");
var _validators = require("./validators");
var _helpers = require("./helpers");
var ImageBase = function(_param) {
    var alt = _param.alt, crossOrigin = _param.crossOrigin, decoding = _param.decoding, loading = _param.loading, referrerPolicy = _param.referrerPolicy, sizes = _param.sizes, src = _param.src, srcSet = _param.srcSet, useMap = _param.useMap, getRef = _param.getRef, _param_size = _param.size, size = _param_size === void 0 ? 24 : _param_size, width = _param.width, height = _param.height, style = _param.style, _param_withBorder = _param.withBorder, withBorder = _param_withBorder === void 0 ? true : _param_withBorder, fallbackIconProp = _param["fallbackIcon"], children = _param.children, ariaLabel = _param["aria-label"], onClick = _param.onClick, onLoad = _param.onLoad, onError = _param.onError, restProps = _object_without_properties._(_param, [
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
        "style",
        "withBorder",
        "fallbackIcon",
        "children",
        "aria-label",
        "onClick",
        "onLoad",
        "onError"
    ]);
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
        var _onLoad;
        if (loaded) {
            return;
        }
        setLoaded(true);
        setFailed(false);
        (_onLoad = onLoad) === null || _onLoad === void 0 ? void 0 : _onLoad(event);
    };
    var handleImageError = function(event) {
        var _onError;
        setLoaded(false);
        setFailed(true);
        (_onError = onError) === null || _onError === void 0 ? void 0 : _onError(event);
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
    var sizeClassName = function() {
        switch(size){
            case 28:
                return "vkuiImageBase--size-28";
            case 32:
                return "vkuiImageBase--size-32";
            case 40:
                return "vkuiImageBase--size-40";
            case 48:
                return "vkuiImageBase--size-48";
            case 72:
                return "vkuiImageBase--size-72";
        }
        return null;
    }();
    return /*#__PURE__*/ _react.createElement(_context.ImageBaseContext.Provider, {
        value: {
            size: size
        }
    }, /*#__PURE__*/ _react.createElement(_RootComponent.RootComponent, _object_spread_props._(_object_spread._({}, restProps), {
        style: _object_spread_props._(_object_spread._({}, style), {
            width: size,
            height: size
        }),
        baseClassName: (0, _vkjs.classNames)("vkuiImageBase", sizeClassName, loaded && "vkuiImageBase--loaded"),
        role: hasSrc ? "img" : "presentation",
        "aria-label": ariaLabel,
        onClick: onClick
    }), hasSrc && /*#__PURE__*/ _react.createElement("img", {
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
        width: width,
        height: height,
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