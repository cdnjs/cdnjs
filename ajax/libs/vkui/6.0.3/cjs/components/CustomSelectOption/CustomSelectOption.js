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
const _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
const _object_spread = require("@swc/helpers/_/_object_spread");
const _object_spread_props = require("@swc/helpers/_/_object_spread_props");
const _object_without_properties = require("@swc/helpers/_/_object_without_properties");
const _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
const _icons = require("@vkontakte/icons");
const _vkjs = require("@vkontakte/vkjs");
const _useAdaptivity = require("../../hooks/useAdaptivity");
const _Footnote = require("../Typography/Footnote/Footnote");
const _Paragraph = require("../Typography/Paragraph/Paragraph");
const _VisuallyHidden = require("../VisuallyHidden/VisuallyHidden");
const sizeYClassNames = {
    none: "vkuiCustomSelectOption--sizeY-none",
    ['regular']: "vkuiCustomSelectOption--sizeY-regular"
};
const CustomSelectOption = (_param)=>{
    var { children, hierarchy = 0, hovered: hoveredProp, selected, before, after, description, disabled, style: styleProp, className, onClick } = _param, restProps = _object_without_properties._(_param, [
        "children",
        "hierarchy",
        "hovered",
        "selected",
        "before",
        "after",
        "description",
        "disabled",
        "style",
        "className",
        "onClick"
    ]);
    const { sizeY = 'none' } = (0, _useAdaptivity.useAdaptivity)();
    const style = _react.useMemo(()=>hierarchy > 0 ? _object_spread._({
            '--vkui_internal--custom_select_option_hierarchy_level': hierarchy
        }, styleProp) : styleProp, [
        hierarchy,
        styleProp
    ]);
    const hovered = hoveredProp && !disabled ? true : false;
    return /*#__PURE__*/ _react.createElement(_Paragraph.Paragraph, _object_spread_props._(_object_spread._({}, restProps), {
        onClick: disabled ? undefined : onClick,
        Component: "div",
        role: "option",
        "aria-disabled": disabled,
        "aria-selected": selected,
        "data-hovered": hovered,
        className: (0, _vkjs.classNames)("vkuiCustomSelectOption", sizeY !== 'compact' && sizeYClassNames[sizeY], hovered && "vkuiCustomSelectOption--hover", disabled && "vkuiCustomSelectOption--disabled", hierarchy > 0 && "vkuiCustomSelectOption--hierarchy", className),
        style: style
    }), (0, _vkjs.hasReactNode)(before) && /*#__PURE__*/ _react.createElement("div", {
        className: "vkuiCustomSelectOption__before"
    }, before), /*#__PURE__*/ _react.createElement("div", {
        className: "vkuiCustomSelectOption__main"
    }, /*#__PURE__*/ _react.createElement("div", {
        className: "vkuiCustomSelectOption__children"
    }, children), (0, _vkjs.hasReactNode)(description) && /*#__PURE__*/ _react.createElement(_Footnote.Footnote, {
        className: "vkuiCustomSelectOption__description"
    }, /*#__PURE__*/ _react.createElement(_VisuallyHidden.VisuallyHidden, null, " "), description)), /*#__PURE__*/ _react.createElement("div", {
        className: "vkuiCustomSelectOption__after"
    }, (0, _vkjs.hasReactNode)(after) && /*#__PURE__*/ _react.createElement("div", null, after), selected && /*#__PURE__*/ _react.createElement(_icons.Icon16Done, {
        className: "vkuiCustomSelectOption__selectedIcon"
    })));
};

//# sourceMappingURL=CustomSelectOption.js.map