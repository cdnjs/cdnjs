import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import { _ as _sliced_to_array } from "@swc/helpers/_/_sliced_to_array";
import * as React from "react";
import { classNames } from "@vkontakte/vkjs";
import { useExternRef } from "../../hooks/useExternRef";
import { RootComponent } from "../RootComponent/RootComponent";
import { ImageBaseBadge } from "./ImageBaseBadge/ImageBaseBadge";
import { ImageBaseOverlay } from "./ImageBaseOverlay/ImageBaseOverlay";
import { ImageBaseContext } from "./context";
import { validateFallbackIcon, validateSize } from "./validators";
export { getBadgeIconSizeByImageBaseSize, getFallbackIconSizeByImageBaseSize, getOverlayIconSizeByImageBaseSize } from "./helpers";
export { ImageBaseContext };
/**
 * @see https://vkcom.github.io/VKUI/#/ImageBase
 */ export var ImageBase = function(_param) {
    var alt = _param.alt, crossOrigin = _param.crossOrigin, decoding = _param.decoding, loading = _param.loading, referrerPolicy = _param.referrerPolicy, sizes = _param.sizes, src = _param.src, srcSet = _param.srcSet, useMap = _param.useMap, getRef = _param.getRef, _param_size = _param.size, size = _param_size === void 0 ? 24 : _param_size, width = _param.width, height = _param.height, style = _param.style, _param_withBorder = _param.withBorder, withBorder = _param_withBorder === void 0 ? true : _param_withBorder, fallbackIconProp = _param["fallbackIcon"], children = _param.children, ariaLabel = _param["aria-label"], onClick = _param.onClick, onLoad = _param.onLoad, onError = _param.onError, restProps = _object_without_properties(_param, [
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
    var _React_useState = _sliced_to_array(React.useState(false), 2), loaded = _React_useState[0], setLoaded = _React_useState[1];
    var _React_useState1 = _sliced_to_array(React.useState(false), 2), failed = _React_useState1[0], setFailed = _React_useState1[1];
    var hasSrc = src || srcSet;
    var needShowFallbackIcon = (failed || !hasSrc) && /*#__PURE__*/ React.isValidElement(fallbackIconProp);
    var fallbackIcon = needShowFallbackIcon ? fallbackIconProp : null;
    if (process.env.NODE_ENV === "development") {
        validateSize(size);
        if (fallbackIcon) {
            validateFallbackIcon(size, {
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
    var imgRef = useExternRef(getRef);
    var isOnLoadStatusCheckedRef = React.useRef(false);
    React.useEffect(function dispatchLoadEventForAlreadyLoadedResourceIfReactInitializedLater() {
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
    return /*#__PURE__*/ React.createElement(ImageBaseContext.Provider, {
        value: {
            size: size
        }
    }, /*#__PURE__*/ React.createElement(RootComponent, _object_spread_props(_object_spread({}, restProps), {
        style: _object_spread_props(_object_spread({}, style), {
            width: size,
            height: size
        }),
        baseClassName: classNames("vkuiImageBase", sizeClassName, loaded && "vkuiImageBase--loaded"),
        role: hasSrc ? "img" : "presentation",
        "aria-label": ariaLabel,
        onClick: onClick
    }), hasSrc && /*#__PURE__*/ React.createElement("img", {
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
    }), fallbackIcon && /*#__PURE__*/ React.createElement("div", {
        className: "vkuiImageBase__fallback"
    }, fallbackIcon), children, withBorder && /*#__PURE__*/ React.createElement("div", {
        "aria-hidden": true,
        className: "vkuiImageBase__border"
    })));
};
ImageBase.Badge = ImageBaseBadge;
ImageBase.Overlay = ImageBaseOverlay;

//# sourceMappingURL=ImageBase.js.map