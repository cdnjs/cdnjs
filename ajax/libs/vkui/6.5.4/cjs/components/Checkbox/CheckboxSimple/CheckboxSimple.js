"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "CheckboxSimple", {
    enumerable: true,
    get: function() {
        return CheckboxSimple;
    }
});
const _object_spread = require("@swc/helpers/_/_object_spread");
const _object_without_properties = require("@swc/helpers/_/_object_without_properties");
const _jsxruntime = require("react/jsx-runtime");
const _vkjs = require("@vkontakte/vkjs");
const _useAdaptivity = require("../../../hooks/useAdaptivity");
const _Tappable = require("../../Tappable/Tappable");
const _CheckboxInput = require("../CheckboxInput/CheckboxInput");
const sizeYClassNames = {
    none: "vkuiCheckboxSimple--sizeY-none",
    compact: "vkuiCheckboxSimple--sizeY-compact"
};
function CheckboxSimple(_param) {
    var { children, className, style, getRootRef, description, hoverMode, activeMode, hasHover, hasActive, focusVisibleMode, titleAfter } = _param, restProps = _object_without_properties._(_param, [
        "children",
        "className",
        "style",
        "getRootRef",
        "description",
        "hoverMode",
        "activeMode",
        "hasHover",
        "hasActive",
        "focusVisibleMode",
        "titleAfter"
    ]);
    const { sizeY = 'none' } = (0, _useAdaptivity.useAdaptivity)();
    return /*#__PURE__*/ (0, _jsxruntime.jsx)(_Tappable.Tappable, {
        className: (0, _vkjs.classNames)(className, "vkuiCheckboxSimple", sizeY !== 'regular' && sizeYClassNames[sizeY]),
        style: style,
        disabled: restProps.disabled,
        getRootRef: getRootRef,
        hoverMode: hoverMode,
        activeMode: activeMode,
        hasHover: hasHover,
        hasActive: hasActive,
        focusVisibleMode: focusVisibleMode,
        Component: "label",
        children: /*#__PURE__*/ (0, _jsxruntime.jsx)(_CheckboxInput.CheckboxInput, _object_spread._({}, restProps))
    });
}

//# sourceMappingURL=CheckboxSimple.js.map