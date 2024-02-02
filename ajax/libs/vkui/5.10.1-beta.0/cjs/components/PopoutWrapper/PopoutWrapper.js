"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "PopoutWrapper", {
    enumerable: true,
    get: function() {
        return PopoutWrapper;
    }
});
var _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
var _object_spread = require("@swc/helpers/_/_object_spread");
var _object_spread_props = require("@swc/helpers/_/_object_spread_props");
var _object_without_properties = require("@swc/helpers/_/_object_without_properties");
var _sliced_to_array = require("@swc/helpers/_/_sliced_to_array");
var _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
var _vkjs = require("@vkontakte/vkjs");
var _useGlobalEventListener = require("../../hooks/useGlobalEventListener");
var _usePlatform = require("../../hooks/usePlatform");
var _useTimeout = require("../../hooks/useTimeout");
var _dom = require("../../lib/dom");
var _platform = require("../../lib/platform");
var _RootComponent = require("../RootComponent/RootComponent");
var stylesAlignX = {
    center: "vkuiPopoutWrapper--alignX-center",
    left: "vkuiPopoutWrapper--alignX-left",
    right: "vkuiPopoutWrapper--alignX-right"
};
var stylesAlignY = {
    center: "vkuiPopoutWrapper--alignY-center",
    top: "vkuiPopoutWrapper--alignY-top",
    bottom: "vkuiPopoutWrapper--alignY-bottom"
};
var PopoutWrapper = function(_param) {
    var _param_alignY = _param.alignY, alignY = _param_alignY === void 0 ? "center" : _param_alignY, _param_alignX = _param.alignX, alignX = _param_alignX === void 0 ? "center" : _param_alignX, _param_closing = _param.closing, closing = _param_closing === void 0 ? false : _param_closing, _param_hasMask = _param.hasMask, hasMask = _param_hasMask === void 0 ? true : _param_hasMask, _param_fixed = _param.fixed, fixed = _param_fixed === void 0 ? true : _param_fixed, children = _param.children, onClick = _param.onClick, restProps = _object_without_properties._(_param, [
        "alignY",
        "alignX",
        "closing",
        "hasMask",
        "fixed",
        "children",
        "onClick"
    ]);
    var platform = (0, _usePlatform.usePlatform)();
    var _React_useState = _sliced_to_array._(_react.useState(!hasMask), 2), opened = _React_useState[0], setOpened = _React_useState[1];
    var onFadeInEnd = function(e) {
        if (!e || e.animationName === "vkuianimation-full-fade-in") {
            setOpened(true);
        }
    };
    var animationFinishFallback = (0, _useTimeout.useTimeout)(onFadeInEnd, platform === _platform.Platform.IOS ? 300 : 200);
    _react.useEffect(function() {
        !opened && animationFinishFallback.set();
    }, [
        animationFinishFallback,
        opened
    ]);
    var window = (0, _dom.useDOM)().window;
    (0, _useGlobalEventListener.useGlobalEventListener)(window, "touchmove", function(e) {
        return e.preventDefault();
    }, {
        passive: false
    });
    return /*#__PURE__*/ _react.createElement(_RootComponent.RootComponent, _object_spread_props._(_object_spread._({}, restProps), {
        baseClassName: (0, _vkjs.classNames)("vkuiPopoutWrapper", stylesAlignY[alignY], stylesAlignX[alignX], closing && "vkuiPopoutWrapper--closing", opened && "vkuiPopoutWrapper--opened", fixed && "vkuiPopoutWrapper--fixed", hasMask && "vkuiPopoutWrapper--masked"),
        onAnimationEnd: opened ? undefined : onFadeInEnd
    }), /*#__PURE__*/ _react.createElement("div", {
        className: "vkuiPopoutWrapper__container"
    }, /*#__PURE__*/ _react.createElement("div", {
        className: "vkuiPopoutWrapper__overlay",
        onClick: onClick
    }), /*#__PURE__*/ _react.createElement("div", {
        className: "vkuiPopoutWrapper__content"
    }, children)));
};

//# sourceMappingURL=PopoutWrapper.js.map