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
var _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
var _object_spread = require("@swc/helpers/_/_object_spread");
var _object_without_properties = require("@swc/helpers/_/_object_without_properties");
var _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
var _icons = require("@vkontakte/icons");
var _usePlatform = require("../../hooks/usePlatform");
var _platform = require("../../lib/platform");
var _utils = require("../../lib/utils");
var _PanelHeaderButton = require("../PanelHeaderButton/PanelHeaderButton");
var PanelHeaderSubmit = function(_param) {
    var _param_children = _param.children, children = _param_children === void 0 ? "Готово" : _param_children, restProps = _object_without_properties._(_param, [
        "children"
    ]);
    var platform = (0, _usePlatform.usePlatform)();
    return /*#__PURE__*/ _react.createElement(_PanelHeaderButton.PanelHeaderButton, _object_spread._({
        "aria-label": (0, _utils.getTitleFromChildren)(children),
        primary: true
    }, restProps), platform === _platform.Platform.IOS ? children : /*#__PURE__*/ _react.createElement(_icons.Icon28DoneOutline, null));
};

//# sourceMappingURL=PanelHeaderSubmit.js.map