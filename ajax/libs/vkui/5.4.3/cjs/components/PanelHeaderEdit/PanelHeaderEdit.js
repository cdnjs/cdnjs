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
var _interopRequireWildcard = require("@swc/helpers/lib/_interop_require_wildcard.js").default;
var _objectSpread = require("@swc/helpers/lib/_object_spread.js").default;
var _objectWithoutProperties = require("@swc/helpers/lib/_object_without_properties.js").default;
var _react = /*#__PURE__*/ _interopRequireWildcard(require("react"));
var _icons = require("@vkontakte/icons");
var _usePlatform = require("../../hooks/usePlatform");
var _platform = require("../../lib/platform");
var _panelHeaderButton = require("../PanelHeaderButton/PanelHeaderButton");
var PanelHeaderEdit = function(_param) {
    var _param_isActive = _param.isActive, isActive = _param_isActive === void 0 ? false : _param_isActive, _param_editLabel = _param.editLabel, editLabel = _param_editLabel === void 0 ? "Редактировать" : _param_editLabel, _param_doneLabel = _param.doneLabel, doneLabel = _param_doneLabel === void 0 ? "Готово" : _param_doneLabel, restProps = _objectWithoutProperties(_param, [
        "isActive",
        "editLabel",
        "doneLabel"
    ]);
    var iOSText = isActive ? doneLabel : editLabel;
    var AndroidIcon = isActive ? _icons.Icon28DoneOutline : _icons.Icon28EditOutline;
    var platform = (0, _usePlatform.usePlatform)();
    return /*#__PURE__*/ _react.createElement(_panelHeaderButton.PanelHeaderButton, _objectSpread({
        "aria-label": iOSText
    }, restProps), platform === _platform.Platform.IOS ? iOSText : /*#__PURE__*/ _react.createElement(AndroidIcon, null));
};

//# sourceMappingURL=PanelHeaderEdit.js.map