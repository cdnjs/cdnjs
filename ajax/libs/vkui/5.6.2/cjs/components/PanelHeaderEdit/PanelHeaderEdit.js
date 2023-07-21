"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "PanelHeaderEdit", {
    enumerable: true,
    get: function() {
        return PanelHeaderEdit;
    }
});
var _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
var _object_spread = require("@swc/helpers/_/_object_spread");
var _object_without_properties = require("@swc/helpers/_/_object_without_properties");
var _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
var _icons = require("@vkontakte/icons");
var _usePlatform = require("../../hooks/usePlatform");
var _platform = require("../../lib/platform");
var _PanelHeaderButton = require("../PanelHeaderButton/PanelHeaderButton");
var PanelHeaderEdit = function(_param) {
    var _param_isActive = _param.isActive, isActive = _param_isActive === void 0 ? false : _param_isActive, _param_editLabel = _param.editLabel, editLabel = _param_editLabel === void 0 ? "Редактировать" : _param_editLabel, _param_doneLabel = _param.doneLabel, doneLabel = _param_doneLabel === void 0 ? "Готово" : _param_doneLabel, restProps = _object_without_properties._(_param, [
        "isActive",
        "editLabel",
        "doneLabel"
    ]);
    var iOSText = isActive ? doneLabel : editLabel;
    var AndroidIcon = isActive ? _icons.Icon28DoneOutline : _icons.Icon28EditOutline;
    var platform = (0, _usePlatform.usePlatform)();
    return /*#__PURE__*/ _react.createElement(_PanelHeaderButton.PanelHeaderButton, _object_spread._({
        "aria-label": iOSText
    }, restProps), platform === _platform.Platform.IOS ? iOSText : /*#__PURE__*/ _react.createElement(AndroidIcon, null));
};

//# sourceMappingURL=PanelHeaderEdit.js.map