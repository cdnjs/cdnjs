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
var _interopRequireWildcard = require("@swc/helpers/lib/_interop_require_wildcard.js").default;
var _objectSpread = require("@swc/helpers/lib/_object_spread.js").default;
var _objectSpreadProps = require("@swc/helpers/lib/_object_spread_props.js").default;
var _objectWithoutProperties = require("@swc/helpers/lib/_object_without_properties.js").default;
var _react = /*#__PURE__*/ _interopRequireWildcard(require("react"));
var _vkjs = require("@vkontakte/vkjs");
var _useAdaptivityHasPointer = require("../../../hooks/useAdaptivityHasPointer");
var _useAppearance = require("../../../hooks/useAppearance");
var _tappable = require("../../Tappable/Tappable");
var _context = require("../context");
var _validators = require("../validators");
var ImageBaseOverlay = function(_param) {
    var className = _param.className, themeProp = _param.theme, visibilityProp = _param.visibility, children = _param.children, onClick = _param.onClick, restProps = _objectWithoutProperties(_param, [
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
    return /*#__PURE__*/ _react.createElement(_tappable.Tappable, _objectSpreadProps(_objectSpread({}, restProps), {
        type: "button",
        Component: "button",
        className: (0, _vkjs.classNames)("vkuiImageBaseOverlay", visibility === "always" && "vkuiImageBaseOverlay--visible", theme === "light" && "vkuiImageBaseOverlay--theme-light", theme === "dark" && "vkuiImageBaseOverlay--theme-dark", className),
        hasHover: visibility === "on-hover",
        hoverMode: visibility === "on-hover" ? "vkuiImageBaseOverlay--visible" : undefined,
        focusVisibleMode: "vkuiImageBaseOverlay--focus-visible",
        hasActive: false,
        onClick: onClick
    }), children);
};

//# sourceMappingURL=ImageBaseOverlay.js.map