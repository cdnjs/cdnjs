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
const _jsxruntime = require("react/jsx-runtime");
const _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
const _vkjs = require("@vkontakte/vkjs");
const _useAdaptivityHasPointer = require("../../../hooks/useAdaptivityHasPointer");
const _useAppearance = require("../../../hooks/useAppearance");
const _useExternRef = require("../../../hooks/useExternRef");
const _useFocusVisible = require("../../../hooks/useFocusVisible");
const _useFocusVisibleClassName = require("../../../hooks/useFocusVisibleClassName");
const _utils = require("../../../lib/utils");
const _context = require("../context");
const _validators = require("../validators");
const _hooks = require("./hooks");
function DevelopmentCheck({ children }) {
    const { size } = _react.useContext(_context.ImageBaseContext);
    if (process.env.NODE_ENV === 'development') {
        if (children) {
            (0, _validators.validateOverlayIcon)(size, {
                name: 'children',
                value: children
            });
        }
    }
    return null;
}
const ImageBaseOverlayInteractive = (_param)=>{
    var { children, className, getRootRef, disableInteractive, overlayShown } = _param, restProps = _object_without_properties._(_param, [
        "children",
        "className",
        "getRootRef",
        "disableInteractive",
        "overlayShown"
    ]);
    const _useFocusVisible1 = (0, _useFocusVisible.useFocusVisible)(), { focusVisible } = _useFocusVisible1, focusEvents = _object_without_properties._(_useFocusVisible1, [
        "focusVisible"
    ]);
    const focusVisibleClassNames = (0, _useFocusVisibleClassName.useFocusVisibleClassName)({
        focusVisible,
        mode: 'inside'
    });
    return /*#__PURE__*/ (0, _jsxruntime.jsxs)(_jsxruntime.Fragment, {
        children: [
            /*#__PURE__*/ (0, _jsxruntime.jsx)("div", _object_spread_props._(_object_spread._(_object_spread_props._(_object_spread._({}, restProps), {
                tabIndex: 0,
                role: "button",
                className: (0, _vkjs.classNames)("vkuiImageBaseOverlay--clickable", (focusVisible || overlayShown) && "vkuiImageBaseOverlay--visible", focusVisibleClassNames, className),
                ref: getRootRef,
                onKeyDown: _utils.clickByKeyboardHandler
            }), focusEvents), {
                children: children
            })),
            process.env.NODE_ENV === 'development' && /*#__PURE__*/ (0, _jsxruntime.jsx)(DevelopmentCheck, {
                children: children
            })
        ]
    });
};
const ImageBaseOverlayNonInteractive = (_param)=>{
    var { className, getRootRef, disableInteractive, overlayShown: overlayShownProps } = _param, restProps = _object_without_properties._(_param, [
        "className",
        "getRootRef",
        "disableInteractive",
        "overlayShown"
    ]);
    const rootRef = (0, _useExternRef.useExternRef)(getRootRef);
    const { shown: overlayShown, onClick: onOverlayClick } = (0, _hooks.useNonInteractiveOverlayProps)(rootRef);
    return /*#__PURE__*/ (0, _jsxruntime.jsx)("div", _object_spread_props._(_object_spread._({}, restProps), {
        ref: rootRef,
        className: (0, _vkjs.classNames)((overlayShown || overlayShownProps) && "vkuiImageBaseOverlay--visible", className),
        onClick: onOverlayClick
    }));
};
const ImageBaseOverlay = (_param)=>{
    var { className, theme: themeProp, visibility: visibilityProp } = _param, restProps = _object_without_properties._(_param, [
        "className",
        "theme",
        "visibility"
    ]);
    const appearance = (0, _useAppearance.useAppearance)();
    const hasPointer = (0, _useAdaptivityHasPointer.useAdaptivityHasPointer)();
    const theme = themeProp !== null && themeProp !== void 0 ? themeProp : appearance;
    const visibility = visibilityProp !== null && visibilityProp !== void 0 ? visibilityProp : hasPointer ? 'on-hover' : 'always';
    const commonClassNames = (0, _vkjs.classNames)("vkuiImageBaseOverlay", theme === 'light' && "vkuiImageBaseOverlay--theme-light", theme === 'dark' && "vkuiImageBaseOverlay--theme-dark", className);
    const commonProps = {
        className: commonClassNames,
        overlayShown: visibility === 'always'
    };
    // Не делаем деструктуризацию пропа, потому что Typescript не вывозит
    if (restProps.disableInteractive) {
        return /*#__PURE__*/ (0, _jsxruntime.jsx)(ImageBaseOverlayNonInteractive, _object_spread._({}, restProps, commonProps));
    }
    return /*#__PURE__*/ (0, _jsxruntime.jsx)(ImageBaseOverlayInteractive, _object_spread._({}, restProps, commonProps));
};
ImageBaseOverlay.displayName = 'ImageBaseOverlay';

//# sourceMappingURL=ImageBaseOverlay.js.map