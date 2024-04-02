"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "CellCheckbox", {
    enumerable: true,
    get: function() {
        return CellCheckbox;
    }
});
const _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
const _object_spread = require("@swc/helpers/_/_object_spread");
const _object_spread_props = require("@swc/helpers/_/_object_spread_props");
const _object_without_properties = require("@swc/helpers/_/_object_without_properties");
const _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
const _icons = require("@vkontakte/icons");
const _vkjs = require("@vkontakte/vkjs");
const _usePlatform = require("../../../hooks/usePlatform");
const _AdaptiveIconRenderer = require("../../AdaptiveIconRenderer/AdaptiveIconRenderer");
const _VisuallyHidden = require("../../VisuallyHidden/VisuallyHidden");
const CheckBoxOn = ()=>/*#__PURE__*/ _react.createElement(_AdaptiveIconRenderer.AdaptiveIconRenderer, {
        IconCompact: _icons.Icon20CheckBoxOn,
        IconRegular: _icons.Icon24CheckBoxOn
    });
const CheckBoxOff = ()=>/*#__PURE__*/ _react.createElement(_AdaptiveIconRenderer.AdaptiveIconRenderer, {
        IconCompact: _icons.Icon20CheckBoxOff,
        IconRegular: _icons.Icon24CheckBoxOff
    });
function useTypeIcon(type) {
    const platform = (0, _usePlatform.usePlatform)();
    if (type !== 'auto') {
        return type;
    }
    if (platform === 'ios' || platform === 'vkcom') {
        return 'circle';
    }
    return 'square';
}
const CellCheckbox = (_param)=>{
    var { getRootRef, getRef, className, style, type = 'auto' } = _param, restProps = _object_without_properties._(_param, [
        "getRootRef",
        "getRef",
        "className",
        "style",
        "type"
    ]);
    const typeIcon = useTypeIcon(type);
    const IconOff = typeIcon === 'circle' ? _icons.Icon24CheckCircleOff : CheckBoxOff;
    const IconOn = typeIcon === 'circle' ? _icons.Icon24CheckCircleOn : CheckBoxOn;
    return /*#__PURE__*/ _react.createElement("span", {
        className: (0, _vkjs.classNames)("vkuiCellCheckbox", className),
        style: style,
        ref: getRootRef
    }, /*#__PURE__*/ _react.createElement(_VisuallyHidden.VisuallyHidden, _object_spread_props._(_object_spread._({}, restProps), {
        Component: "input",
        type: "checkbox",
        className: "vkuiCellCheckbox__input",
        getRootRef: getRef
    })), /*#__PURE__*/ _react.createElement("span", {
        className: (0, _vkjs.classNames)("vkuiCellCheckbox__icon", "vkuiCellCheckbox__icon--off"),
        "aria-hidden": true
    }, /*#__PURE__*/ _react.createElement(IconOff, null)), /*#__PURE__*/ _react.createElement("span", {
        className: (0, _vkjs.classNames)("vkuiCellCheckbox__icon", "vkuiCellCheckbox__icon--on"),
        "aria-hidden": true
    }, /*#__PURE__*/ _react.createElement(IconOn, null)));
};

//# sourceMappingURL=CellCheckbox.js.map