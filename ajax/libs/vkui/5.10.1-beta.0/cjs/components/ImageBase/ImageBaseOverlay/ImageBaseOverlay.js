"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ImageBaseOverlay", {
    enumerable: true,
    get: function() {
        return ImageBaseOverlay;
    }
});
var _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
var _object_spread = require("@swc/helpers/_/_object_spread");
var _object_spread_props = require("@swc/helpers/_/_object_spread_props");
var _object_without_properties = require("@swc/helpers/_/_object_without_properties");
var _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
var _vkjs = require("@vkontakte/vkjs");
var _useAdaptivityHasPointer = require("../../../hooks/useAdaptivityHasPointer");
var _useAppearance = require("../../../hooks/useAppearance");
var _useFocusVisibleClassName = require("../../../hooks/useFocusVisibleClassName");
var _Tappable = require("../../Tappable/Tappable");
var _context = require("../context");
var _validators = require("../validators");
var ImageBaseOverlay = function(_param) {
    var className = _param.className, themeProp = _param.theme, visibilityProp = _param.visibility, children = _param.children, onClick = _param.onClick, restProps = _object_without_properties._(_param, [
        "className",
        "theme",
        "visibility",
        "children",
        "onClick"
    ]);
    var appearance = (0, _useAppearance.useAppearance)();
    var hasPointer = (0, _useAdaptivityHasPointer.useAdaptivityHasPointer)();
    var theme = themeProp !== null && themeProp !== void 0 ? themeProp : appearance;
    var visibility = visibilityProp !== null && visibilityProp !== void 0 ? visibilityProp : hasPointer ? "on-hover" : "always";
    if (process.env.NODE_ENV === "development") {
        if (children) {
            // eslint-disable-next-line react-hooks/rules-of-hooks
            var size = _react.useContext(_context.ImageBaseContext).size;
            (0, _validators.validateOverlayIcon)(size, {
                name: "children",
                value: children
            });
        }
    }
    return /*#__PURE__*/ _react.createElement(_Tappable.Tappable, _object_spread_props._(_object_spread._({}, restProps), {
        type: "button",
        Component: "button",
        className: (0, _vkjs.classNames)("vkuiImageBaseOverlay", visibility === "always" && "vkuiImageBaseOverlay--visible", theme === "light" && "vkuiImageBaseOverlay--theme-light", theme === "dark" && "vkuiImageBaseOverlay--theme-dark", className),
        hasHover: visibility === "on-hover",
        hoverMode: visibility === "on-hover" ? "vkuiImageBaseOverlay--visible" : undefined,
        focusVisibleMode: (0, _vkjs.classNames)(_useFocusVisibleClassName.focusVisiblePresetModeClassNames["inside"], "vkuiImageBaseOverlay--visible"),
        hasActive: false,
        onClick: onClick
    }), children);
};

//# sourceMappingURL=ImageBaseOverlay.js.map