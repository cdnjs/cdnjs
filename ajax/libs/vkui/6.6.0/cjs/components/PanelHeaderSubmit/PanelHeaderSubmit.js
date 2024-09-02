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
const _object_spread = require("@swc/helpers/_/_object_spread");
const _object_spread_props = require("@swc/helpers/_/_object_spread_props");
const _object_without_properties = require("@swc/helpers/_/_object_without_properties");
const _jsxruntime = require("react/jsx-runtime");
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
    return /*#__PURE__*/ (0, _jsxruntime.jsx)(_PanelHeaderButton.PanelHeaderButton, _object_spread_props._(_object_spread._({
        primary: true
    }, restProps), {
        children: platform === 'ios' ? children : /*#__PURE__*/ (0, _jsxruntime.jsxs)(_jsxruntime.Fragment, {
            children: [
                /*#__PURE__*/ (0, _jsxruntime.jsx)(_VisuallyHidden.VisuallyHidden, {
                    children: children
                }),
                /*#__PURE__*/ (0, _jsxruntime.jsx)(_AdaptiveIconRenderer.AdaptiveIconRenderer, {
                    IconCompact: _icons.Icon24DoneOutline,
                    IconRegular: _icons.Icon28DoneOutline
                })
            ]
        })
    }));
};

//# sourceMappingURL=PanelHeaderSubmit.js.map