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
const _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
const _object_without_properties = require("@swc/helpers/_/_object_without_properties");
const _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
const _icons = require("@vkontakte/icons");
const _usePlatform = require("../../hooks/usePlatform");
const _AdaptiveIconRenderer = require("../AdaptiveIconRenderer/AdaptiveIconRenderer");
const _PanelHeaderButton = require("../PanelHeaderButton/PanelHeaderButton");
const _VisuallyHidden = require("../VisuallyHidden/VisuallyHidden");
const PanelHeaderEdit = (_param)=>{
    var { isActive = false, editLabel = 'Редактировать', doneLabel = 'Готово' } = _param, restProps = _object_without_properties._(_param, [
        "isActive",
        "editLabel",
        "doneLabel"
    ]);
    const platform = (0, _usePlatform.usePlatform)();
    const label = isActive ? doneLabel : editLabel;
    return /*#__PURE__*/ _react.createElement(_PanelHeaderButton.PanelHeaderButton, restProps, platform === 'ios' ? label : /*#__PURE__*/ _react.createElement(_react.Fragment, null, /*#__PURE__*/ _react.createElement(_VisuallyHidden.VisuallyHidden, null, label), /*#__PURE__*/ _react.createElement(_AdaptiveIconRenderer.AdaptiveIconRenderer, {
        IconCompact: isActive ? _icons.Icon24DoneOutline : _icons.Icon24PenOutline,
        IconRegular: isActive ? _icons.Icon28DoneOutline : _icons.Icon28EditOutline
    })));
};

//# sourceMappingURL=PanelHeaderEdit.js.map