"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "PanelHeaderBack", {
    enumerable: true,
    get: function() {
        return PanelHeaderBack;
    }
});
const _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
const _object_spread = require("@swc/helpers/_/_object_spread");
const _object_spread_props = require("@swc/helpers/_/_object_spread_props");
const _object_without_properties = require("@swc/helpers/_/_object_without_properties");
const _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
const _icons = require("@vkontakte/icons");
const _vkjs = require("@vkontakte/vkjs");
const _useAdaptivity = require("../../hooks/useAdaptivity");
const _usePlatform = require("../../hooks/usePlatform");
const _AdaptiveIconRenderer = require("../AdaptiveIconRenderer/AdaptiveIconRenderer");
const _PanelHeaderButton = require("../PanelHeaderButton/PanelHeaderButton");
const _VisuallyHidden = require("../VisuallyHidden/VisuallyHidden");
const getBackIcon = (platform)=>{
    switch(platform){
        case 'ios':
            return /*#__PURE__*/ _react.createElement(_icons.Icon28ChevronBack, null);
        case 'vkcom':
            return /*#__PURE__*/ _react.createElement(_AdaptiveIconRenderer.AdaptiveIconRenderer, {
                IconCompact: _icons.Icon24ChevronLeftOutline,
                IconRegular: _icons.Icon28ChevronLeftOutline
            });
        default:
            return /*#__PURE__*/ _react.createElement(_AdaptiveIconRenderer.AdaptiveIconRenderer, {
                IconCompact: _icons.Icon24ArrowLeftOutline,
                IconRegular: _icons.Icon28ArrowLeftOutline
            });
    }
};
const PanelHeaderBack = (_param)=>{
    var { label, className, children = 'Назад' } = _param, restProps = _object_without_properties._(_param, [
        "label",
        "className",
        "children"
    ]);
    const platform = (0, _usePlatform.usePlatform)();
    const { sizeX = 'none' } = (0, _useAdaptivity.useAdaptivity)();
    // также label нужно скрывать при platform === 'ios' && sizeX === regular
    // https://github.com/VKCOM/VKUI/blob/master/src/components/PanelHeaderButton/PanelHeaderButton.css#L104
    const showLabel = platform === 'vkcom' || platform === 'ios';
    return /*#__PURE__*/ _react.createElement(_PanelHeaderButton.PanelHeaderButton, _object_spread_props._(_object_spread._({}, restProps), {
        className: (0, _vkjs.classNames)(sizeX === 'compact' && "vkuiPanelHeaderBack--sizeX-compact", platform === 'ios' && "vkuiPanelHeaderBack--ios", platform === 'vkcom' && "vkuiPanelHeaderBack--vkcom", showLabel && !!label && "vkuiPanelHeaderBack--has-label", className),
        label: showLabel && label
    }), children && /*#__PURE__*/ _react.createElement(_VisuallyHidden.VisuallyHidden, null, children), getBackIcon(platform));
};

//# sourceMappingURL=PanelHeaderBack.js.map