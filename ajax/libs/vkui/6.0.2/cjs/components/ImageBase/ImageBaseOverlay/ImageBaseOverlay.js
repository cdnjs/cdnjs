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
const _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
const _object_spread = require("@swc/helpers/_/_object_spread");
const _object_spread_props = require("@swc/helpers/_/_object_spread_props");
const _object_without_properties = require("@swc/helpers/_/_object_without_properties");
const _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
const _vkjs = require("@vkontakte/vkjs");
const _useAdaptivityHasPointer = require("../../../hooks/useAdaptivityHasPointer");
const _useAppearance = require("../../../hooks/useAppearance");
const _useFocusVisibleClassName = require("../../../hooks/useFocusVisibleClassName");
const _Tappable = require("../../Tappable/Tappable");
const _context = require("../context");
const _validators = require("../validators");
const ImageBaseOverlay = (_param)=>{
    var { className, theme: themeProp, visibility: visibilityProp, children, onClick: onClickProp } = _param, restProps = _object_without_properties._(_param, [
        "className",
        "theme",
        "visibility",
        "children",
        "onClick"
    ]);
    const appearance = (0, _useAppearance.useAppearance)();
    const hasPointer = (0, _useAdaptivityHasPointer.useAdaptivityHasPointer)();
    const theme = themeProp !== null && themeProp !== void 0 ? themeProp : appearance;
    const visibility = visibilityProp !== null && visibilityProp !== void 0 ? visibilityProp : hasPointer ? 'on-hover' : 'always';
    if (process.env.NODE_ENV === 'development') {
        if (children) {
            // eslint-disable-next-line react-hooks/rules-of-hooks
            const { size } = _react.useContext(_context.ImageBaseContext);
            (0, _validators.validateOverlayIcon)(size, {
                name: 'children',
                value: children
            });
        }
    }
    const onClick = (onClickProp !== null && onClickProp !== void 0 ? onClickProp : visibility === 'on-hover') ? _vkjs.noop : undefined;
    return /*#__PURE__*/ _react.createElement(_Tappable.Tappable, _object_spread_props._(_object_spread._({}, restProps), {
        className: (0, _vkjs.classNames)("vkuiImageBaseOverlay", visibility === 'always' && "vkuiImageBaseOverlay--visible", theme === 'light' && "vkuiImageBaseOverlay--theme-light", theme === 'dark' && "vkuiImageBaseOverlay--theme-dark", className),
        hasHover: visibility === 'on-hover',
        hoverMode: visibility === 'on-hover' ? "vkuiImageBaseOverlay--visible" : undefined,
        focusVisibleMode: (0, _vkjs.classNames)(_useFocusVisibleClassName.focusVisiblePresetModeClassNames['inside'], "vkuiImageBaseOverlay--visible"),
        hasActive: false,
        onClick: onClick
    }), children);
};

//# sourceMappingURL=ImageBaseOverlay.js.map