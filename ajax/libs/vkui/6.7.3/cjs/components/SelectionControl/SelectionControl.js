"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "SelectionControl", {
    enumerable: true,
    get: function() {
        return SelectionControl;
    }
});
const _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
const _object_spread = require("@swc/helpers/_/_object_spread");
const _jsxruntime = require("react/jsx-runtime");
const _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
const _vkjs = require("@vkontakte/vkjs");
const _useAdaptivity = require("../../hooks/useAdaptivity");
const _usePlatform = require("../../hooks/usePlatform");
const _useState = require("../Clickable/useState");
const _Tappable = require("../Tappable/Tappable");
const _SelectionControlLabel = require("./SelectionControlLabel/SelectionControlLabel");
const sizeYClassNames = {
    none: "vkuiSelectionControl--sizeY-none",
    compact: "vkuiSelectionControl--sizeY-compact"
};
const SelectionControl = (restProps)=>{
    const { sizeY = 'none' } = (0, _useAdaptivity.useAdaptivity)();
    const platform = (0, _usePlatform.usePlatform)();
    return /*#__PURE__*/ (0, _jsxruntime.jsx)(_Tappable.Tappable, _object_spread._({
        Component: "label",
        baseClassName: (0, _vkjs.classNames)("vkuiSelectionControl", sizeY !== 'regular' && sizeYClassNames[sizeY]),
        activeEffectDelay: platform === 'ios' ? 100 : _useState.DEFAULT_ACTIVE_EFFECT_DELAY
    }, restProps));
};
SelectionControl.Label = _SelectionControlLabel.SelectionControlLabel;

//# sourceMappingURL=SelectionControl.js.map