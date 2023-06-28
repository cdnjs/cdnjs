"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "SubnavigationButton", {
    enumerable: true,
    get: function() {
        return SubnavigationButton;
    }
});
var _defineProperty = require("@swc/helpers/lib/_define_property.js").default;
var _interopRequireWildcard = require("@swc/helpers/lib/_interop_require_wildcard.js").default;
var _objectSpread = require("@swc/helpers/lib/_object_spread.js").default;
var _objectSpreadProps = require("@swc/helpers/lib/_object_spread_props.js").default;
var _objectWithoutProperties = require("@swc/helpers/lib/_object_without_properties.js").default;
var _react = /*#__PURE__*/ _interopRequireWildcard(require("react"));
var _icons = require("@vkontakte/icons");
var _vkjs = require("@vkontakte/vkjs");
var _useAdaptivity = require("../../hooks/useAdaptivity");
var _adaptivity = require("../../lib/adaptivity");
var _tappable = require("../Tappable/Tappable");
var _caption = require("../Typography/Caption/Caption");
var _subhead = require("../Typography/Subhead/Subhead");
var sizeYClassNames = _defineProperty({
    none: "vkuiSubnavigationButton--sizeY-none"
}, _adaptivity.SizeType.COMPACT, "vkuiSubnavigationButton--sizeY-compact");
var SubnavigationButtonTypography = function(_param) {
    var textLevel = _param.textLevel, restProps = _objectWithoutProperties(_param, [
        "textLevel"
    ]);
    if (textLevel === "1") {
        return /*#__PURE__*/ _react.createElement(_subhead.Subhead, restProps);
    }
    return /*#__PURE__*/ _react.createElement(_caption.Caption, _objectSpread({
        level: textLevel === "2" ? "1" : "2"
    }, restProps));
};
var SubnavigationButton = function(_param) {
    var _param_mode = _param.mode, mode = _param_mode === void 0 ? "primary" : _param_mode, _param_size = _param.size, size = _param_size === void 0 ? "m" : _param_size, selected = _param.selected, _param_textLevel = _param.textLevel, textLevel = _param_textLevel === void 0 ? "1" : _param_textLevel, before = _param.before, after = _param.after, expandable = _param.expandable, children = _param.children, className = _param.className, restProps = _objectWithoutProperties(_param, [
        "mode",
        "size",
        "selected",
        "textLevel",
        "before",
        "after",
        "expandable",
        "children",
        "className"
    ]);
    var _useAdaptivity1 = (0, _useAdaptivity.useAdaptivity)(), _useAdaptivity_sizeY = _useAdaptivity1.sizeY, sizeY = _useAdaptivity_sizeY === void 0 ? "none" : _useAdaptivity_sizeY;
    return /*#__PURE__*/ _react.createElement(_tappable.Tappable, _objectSpreadProps(_objectSpread({}, restProps), {
        hasActive: false,
        focusVisibleMode: "outside",
        className: (0, _vkjs.classNames)("vkuiSubnavigationButton", {
            s: "vkuiSubnavigationButton--size-s",
            m: "vkuiSubnavigationButton--size-m",
            l: "vkuiSubnavigationButton--size-l"
        }[size], {
            primary: "vkuiSubnavigationButton--mode-primary",
            outline: "vkuiSubnavigationButton--mode-outline",
            tertiary: "vkuiSubnavigationButton--mode-tertiary"
        }[mode], selected && "vkuiSubnavigationButton--selected", sizeY !== _adaptivity.SizeType.REGULAR && sizeYClassNames[sizeY], className)
    }), /*#__PURE__*/ _react.createElement("span", {
        className: "vkuiSubnavigationButton__in"
    }, before && /*#__PURE__*/ _react.createElement("span", {
        className: "vkuiSubnavigationButton__before"
    }, before), /*#__PURE__*/ _react.createElement(SubnavigationButtonTypography, {
        textLevel: textLevel,
        className: "vkuiSubnavigationButton__label",
        Component: "span"
    }, children), after && /*#__PURE__*/ _react.createElement("span", {
        className: "vkuiSubnavigationButton__after"
    }, after), expandable && /*#__PURE__*/ _react.createElement(_icons.Icon16Dropdown, {
        className: "vkuiSubnavigationButton__expandableIcon"
    })));
};

//# sourceMappingURL=SubnavigationButton.js.map