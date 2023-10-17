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
var _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
var _object_spread = require("@swc/helpers/_/_object_spread");
var _object_spread_props = require("@swc/helpers/_/_object_spread_props");
var _object_without_properties = require("@swc/helpers/_/_object_without_properties");
var _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
var _icons = require("@vkontakte/icons");
var _vkjs = require("@vkontakte/vkjs");
var _useAdaptivity = require("../../hooks/useAdaptivity");
var _usePlatform = require("../../hooks/usePlatform");
var _adaptivity = require("../../lib/adaptivity");
var _platform = require("../../lib/platform");
var _PanelHeaderButton = require("../PanelHeaderButton/PanelHeaderButton");
var PanelHeaderBack = function(_param) {
    var label = _param.label, tmp = _param["aria-label"], ariaLabel = tmp === void 0 ? "Назад" : tmp, className = _param.className, restProps = _object_without_properties._(_param, [
        "label",
        "aria-label",
        "className"
    ]);
    var platform = (0, _usePlatform.usePlatform)();
    var _useAdaptivity1 = (0, _useAdaptivity.useAdaptivity)(), _useAdaptivity_sizeX = _useAdaptivity1.sizeX, sizeX = _useAdaptivity_sizeX === void 0 ? "none" : _useAdaptivity_sizeX;
    // так-же label нужно скрывать при platform === Platform.IOS && sizeX === regular
    // https://github.com/VKCOM/VKUI/blob/master/src/components/PanelHeaderButton/PanelHeaderButton.css#L104
    var showLabel = platform === _platform.Platform.VKCOM || platform === _platform.Platform.IOS;
    var icon = /*#__PURE__*/ _react.createElement(_icons.Icon28ArrowLeftOutline, null);
    switch(platform){
        case _platform.Platform.IOS:
            icon = /*#__PURE__*/ _react.createElement(_icons.Icon28ChevronBack, null);
            break;
        case _platform.Platform.VKCOM:
            icon = /*#__PURE__*/ _react.createElement(_icons.Icon28ChevronLeftOutline, null);
            break;
    }
    return /*#__PURE__*/ _react.createElement(_PanelHeaderButton.PanelHeaderButton, _object_spread_props._(_object_spread._({}, restProps), {
        className: (0, _vkjs.classNames)(sizeX === _adaptivity.SizeType.COMPACT && "vkuiPanelHeaderBack--sizeX-compact", platform === _platform.Platform.IOS && "vkuiPanelHeaderBack--ios", platform === _platform.Platform.VKCOM && "vkuiPanelHeaderBack--vkcom", showLabel && !!label && "vkuiPanelHeaderBack--has-label", className),
        label: showLabel && label,
        "aria-label": ariaLabel
    }), icon);
};

//# sourceMappingURL=PanelHeaderBack.js.map