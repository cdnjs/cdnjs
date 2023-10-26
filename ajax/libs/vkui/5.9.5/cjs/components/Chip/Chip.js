"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "Chip", {
    enumerable: true,
    get: function() {
        return Chip;
    }
});
var _define_property = require("@swc/helpers/_/_define_property");
var _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
var _object_spread = require("@swc/helpers/_/_object_spread");
var _object_without_properties = require("@swc/helpers/_/_object_without_properties");
var _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
var _icons = require("@vkontakte/icons");
var _vkjs = require("@vkontakte/vkjs");
var _useAdaptivity = require("../../hooks/useAdaptivity");
var _adaptivity = require("../../lib/adaptivity");
var _utils = require("../../lib/utils");
var _RootComponent = require("../RootComponent/RootComponent");
var _Tappable = require("../Tappable/Tappable");
var sizeYClassNames = _define_property._({
    none: "vkuiChip--sizeY-none"
}, _adaptivity.SizeType.COMPACT, "vkuiChip--sizeY-compact");
var Chip = function(_param) {
    var _param_value = _param.value, value = _param_value === void 0 ? "" : _param_value, option = _param.option, _param_removable = _param.removable, removable = _param_removable === void 0 ? true : _param_removable, _param_onRemove = _param.onRemove, onRemove = _param_onRemove === void 0 ? _vkjs.noop : _param_onRemove, _param_removeAriaLabel = _param.removeAriaLabel, removeAriaLabel = _param_removeAriaLabel === void 0 ? "Удалить" : _param_removeAriaLabel, _param_before = _param.before, before = _param_before === void 0 ? null : _param_before, after = _param.after, children = _param.children, restProps = _object_without_properties._(_param, [
        "value",
        "option",
        "removable",
        "onRemove",
        "removeAriaLabel",
        "before",
        "after",
        "children"
    ]);
    var _useAdaptivity1 = (0, _useAdaptivity.useAdaptivity)(), _useAdaptivity_sizeY = _useAdaptivity1.sizeY, sizeY = _useAdaptivity_sizeY === void 0 ? "none" : _useAdaptivity_sizeY;
    var onRemoveWrapper = _react.useCallback(function(event) {
        onRemove(event, value);
    }, [
        onRemove,
        value
    ]);
    var title = (0, _utils.getTitleFromChildren)(children);
    return /*#__PURE__*/ _react.createElement(_RootComponent.RootComponent, _object_spread._({
        baseClassName: (0, _vkjs.classNames)("vkuiChip", sizeY !== _adaptivity.SizeType.REGULAR && sizeYClassNames[sizeY], removable && "vkuiChip--removable"),
        role: "option",
        "aria-label": title
    }, restProps), /*#__PURE__*/ _react.createElement("div", {
        className: "vkuiChip__in",
        role: "presentation"
    }, (0, _vkjs.hasReactNode)(before) && /*#__PURE__*/ _react.createElement("div", {
        className: "vkuiChip__before"
    }, before), /*#__PURE__*/ _react.createElement("span", {
        className: "vkuiChip__content",
        title: title,
        "aria-hidden": true
    }, children), (0, _vkjs.hasReactNode)(after) && /*#__PURE__*/ _react.createElement("div", {
        className: "vkuiChip__after"
    }, after), removable && /*#__PURE__*/ _react.createElement(_Tappable.Tappable, {
        Component: "button",
        className: "vkuiChip__remove",
        onClick: onRemoveWrapper,
        hasHover: false,
        hasActive: false,
        "aria-label": "".concat(removeAriaLabel, " ").concat(title)
    }, /*#__PURE__*/ _react.createElement(_icons.Icon16Cancel, null))));
};

//# sourceMappingURL=Chip.js.map