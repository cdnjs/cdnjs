"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "CustomSelectOption", {
    enumerable: true,
    get: function() {
        return CustomSelectOption;
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
var _warnOnce = require("../../lib/warnOnce");
var _footnote = require("../Typography/Footnote/Footnote");
var _paragraph = require("../Typography/Paragraph/Paragraph");
var sizeYClassNames = _defineProperty({
    none: "vkuiCustomSelectOption--sizeY-none"
}, _adaptivity.SizeType.REGULAR, "vkuiCustomSelectOption--sizeY-regular");
var warn = (0, _warnOnce.warnOnce)("CustomSelectOption");
var CustomSelectOption = function(_param) {
    var children = _param.children, _param_hierarchy = _param.hierarchy, hierarchy = _param_hierarchy === void 0 ? 0 : _param_hierarchy, hovered = _param.hovered, selected = _param.selected, before = _param.before, after = _param.after, option = _param.option, description = _param.description, disabled = _param.disabled, styleProp = _param.style, className = _param.className, restProps = _objectWithoutProperties(_param, [
        "children",
        "hierarchy",
        "hovered",
        "selected",
        "before",
        "after",
        "option",
        "description",
        "disabled",
        "style",
        "className"
    ]);
    var title = typeof children === "string" ? children : undefined;
    var _useAdaptivity1 = (0, _useAdaptivity.useAdaptivity)(), _useAdaptivity_sizeY = _useAdaptivity1.sizeY, sizeY = _useAdaptivity_sizeY === void 0 ? "none" : _useAdaptivity_sizeY;
    var style = _react.useMemo(function() {
        return hierarchy > 0 ? _objectSpread({
            "--vkui_internal--custom_select_option_hierarchy_level": hierarchy
        }, styleProp) : styleProp;
    }, [
        hierarchy,
        styleProp
    ]);
    if (!!option && process.env.NODE_ENV === "development") {
        // TODO v6.0.0. Удалить св-во `option`
        warn("Свойство option было добавлено по ошибке и будет удалено в v6.0.0.");
    }
    return /*#__PURE__*/ _react.createElement(_paragraph.Paragraph, _objectSpreadProps(_objectSpread({}, restProps), {
        Component: "div",
        role: "option",
        title: title,
        "aria-disabled": disabled,
        "aria-selected": selected,
        className: (0, _vkjs.classNames)("vkuiCustomSelectOption", sizeY !== _adaptivity.SizeType.COMPACT && sizeYClassNames[sizeY], hovered && !disabled && "vkuiCustomSelectOption--hover", disabled && "vkuiCustomSelectOption--disabled", hierarchy > 0 && "vkuiCustomSelectOption--hierarchy", className),
        style: style
    }), (0, _vkjs.hasReactNode)(before) && /*#__PURE__*/ _react.createElement("div", {
        className: "vkuiCustomSelectOption__before"
    }, before), /*#__PURE__*/ _react.createElement("div", {
        className: "vkuiCustomSelectOption__main"
    }, /*#__PURE__*/ _react.createElement("div", {
        className: "vkuiCustomSelectOption__children"
    }, children), (0, _vkjs.hasReactNode)(description) && /*#__PURE__*/ _react.createElement(_footnote.Footnote, {
        className: "vkuiCustomSelectOption__description"
    }, description)), /*#__PURE__*/ _react.createElement("div", {
        className: "vkuiCustomSelectOption__after"
    }, (0, _vkjs.hasReactNode)(after) && /*#__PURE__*/ _react.createElement("div", null, after), selected && /*#__PURE__*/ _react.createElement(_icons.Icon16Done, {
        className: "vkuiCustomSelectOption__selectedIcon"
    })));
};

//# sourceMappingURL=CustomSelectOption.js.map