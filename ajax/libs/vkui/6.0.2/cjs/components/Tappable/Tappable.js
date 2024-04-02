"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "Tappable", {
    enumerable: true,
    get: function() {
        return Tappable;
    }
});
const _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
const _object_spread = require("@swc/helpers/_/_object_spread");
const _object_without_properties = require("@swc/helpers/_/_object_without_properties");
const _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
const _vkjs = require("@vkontakte/vkjs");
const _useAdaptivity = require("../../hooks/useAdaptivity");
const _adaptivity = require("../../lib/adaptivity");
const _mergeCalls = require("../../lib/mergeCalls");
const _Clickable = require("../Clickable/Clickable");
const _Ripple = require("./Ripple");
const _state = require("./state");
const sizeXClassNames = {
    none: "vkuiTappable--sizeX-none",
    compact: "vkuiTappable--sizeX-compact"
};
function hasPointerClassName(hasPointer) {
    switch(hasPointer){
        case undefined:
            return "vkuiTappable--hasPointer-none";
        case false:
            return "vkuiTappable--hasPointer-false";
    }
    return undefined;
}
const Tappable = (_param)=>{
    var { baseClassName, borderRadiusMode = 'auto', children, hoverMode = _state.DEFAULT_STATE_MODE, activeMode = _state.DEFAULT_STATE_MODE, onPointerDown, onPointerCancel } = _param, restProps = _object_without_properties._(_param, [
        "baseClassName",
        "borderRadiusMode",
        "children",
        "hoverMode",
        "activeMode",
        "onPointerDown",
        "onPointerCancel"
    ]);
    const isClickable = (0, _Clickable.checkClickable)(restProps);
    const { sizeX = 'none', hasPointer } = (0, _useAdaptivity.useAdaptivity)();
    const needRipple = (0, _Ripple.useMaybeNeedRipple)(activeMode, hasPointer);
    const _useRipple = (0, _Ripple.useRipple)(needRipple, hasPointer), { clicks } = _useRipple, rippleEvents = _object_without_properties._(_useRipple, [
        "clicks"
    ]);
    const handlers = (0, _mergeCalls.mergeCalls)(rippleEvents, {
        onPointerDown,
        onPointerCancel
    });
    const typeProps = restProps.Component === 'button' ? {
        type: 'button'
    } : {};
    return /*#__PURE__*/ _react.createElement(_Clickable.Clickable, _object_spread._({
        baseClassName: (0, _vkjs.classNames)(baseClassName, "vkuiTappable", sizeX !== _adaptivity.SizeType.REGULAR && sizeXClassNames[sizeX], borderRadiusMode === 'inherit' && "vkuiTappable--borderRadiusInherit", hasPointerClassName(hasPointer)),
        hoverClassName: (0, _state.hoverClass)(hoverMode),
        activeClassName: (0, _state.activeClass)(activeMode)
    }, typeProps, handlers, restProps), children, isClickable && (hoverMode === 'background' || activeMode === 'background') && /*#__PURE__*/ _react.createElement(_Ripple.Ripple, {
        needRipple: needRipple,
        clicks: clicks
    }));
};

//# sourceMappingURL=Tappable.js.map