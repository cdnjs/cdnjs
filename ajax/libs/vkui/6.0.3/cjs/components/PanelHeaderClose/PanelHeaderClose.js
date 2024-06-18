"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "PanelHeaderClose", {
    enumerable: true,
    get: function() {
        return PanelHeaderClose;
    }
});
const _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
const _object_without_properties = require("@swc/helpers/_/_object_without_properties");
const _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
const _icons = require("@vkontakte/icons");
const _usePlatform = require("../../hooks/usePlatform");
const _AdaptiveIconRenderer = require("../AdaptiveIconRenderer/AdaptiveIconRenderer");
const _PanelHeaderButton = require("../PanelHeaderButton/PanelHeaderButton");
const _VisuallyHidden = require("../VisuallyHidden/VisuallyHidden");
const PanelHeaderClose = (_param)=>{
    var { children = 'Отмена' } = _param, restProps = _object_without_properties._(_param, [
        "children"
    ]);
    const platform = (0, _usePlatform.usePlatform)();
    return /*#__PURE__*/ _react.createElement(_PanelHeaderButton.PanelHeaderButton, restProps, platform === 'ios' ? children : /*#__PURE__*/ _react.createElement(_react.Fragment, null, /*#__PURE__*/ _react.createElement(_VisuallyHidden.VisuallyHidden, null, children), /*#__PURE__*/ _react.createElement(_AdaptiveIconRenderer.AdaptiveIconRenderer, {
        IconCompact: _icons.Icon24CancelOutline,
        IconRegular: _icons.Icon28CancelOutline
    })));
};

//# sourceMappingURL=PanelHeaderClose.js.map