"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "PanelHeaderSubmit", {
    enumerable: true,
    get: function() {
        return PanelHeaderSubmit;
    }
});
const _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
const _object_spread = require("@swc/helpers/_/_object_spread");
const _object_without_properties = require("@swc/helpers/_/_object_without_properties");
const _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
const _icons = require("@vkontakte/icons");
const _usePlatform = require("../../hooks/usePlatform");
const _AdaptiveIconRenderer = require("../AdaptiveIconRenderer/AdaptiveIconRenderer");
const _PanelHeaderButton = require("../PanelHeaderButton/PanelHeaderButton");
const _VisuallyHidden = require("../VisuallyHidden/VisuallyHidden");
const PanelHeaderSubmit = (_param)=>{
    var { children = 'Готово' } = _param, restProps = _object_without_properties._(_param, [
        "children"
    ]);
    const platform = (0, _usePlatform.usePlatform)();
    return /*#__PURE__*/ _react.createElement(_PanelHeaderButton.PanelHeaderButton, _object_spread._({
        primary: true
    }, restProps), platform === 'ios' ? children : /*#__PURE__*/ _react.createElement(_react.Fragment, null, /*#__PURE__*/ _react.createElement(_VisuallyHidden.VisuallyHidden, null, children), /*#__PURE__*/ _react.createElement(_AdaptiveIconRenderer.AdaptiveIconRenderer, {
        IconCompact: _icons.Icon24DoneOutline,
        IconRegular: _icons.Icon28DoneOutline
    })));
};

//# sourceMappingURL=PanelHeaderSubmit.js.map