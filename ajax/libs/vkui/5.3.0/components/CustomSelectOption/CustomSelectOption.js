import _define_property from "@swc/helpers/src/_define_property.mjs";
import _object_spread from "@swc/helpers/src/_object_spread.mjs";
import _object_spread_props from "@swc/helpers/src/_object_spread_props.mjs";
import _object_without_properties from "@swc/helpers/src/_object_without_properties.mjs";
import * as React from "react";
import { Icon16Done } from "@vkontakte/icons";
import { classNames, hasReactNode } from "@vkontakte/vkjs";
import { useAdaptivity } from "../../hooks/useAdaptivity";
import { SizeType } from "../../lib/adaptivity";
import { warnOnce } from "../../lib/warnOnce";
import { Footnote } from "../Typography/Footnote/Footnote";
import { Paragraph } from "../Typography/Paragraph/Paragraph";
var sizeYClassNames = _define_property({
    none: "vkuiCustomSelectOption--sizeY-none"
}, SizeType.REGULAR, "vkuiCustomSelectOption--sizeY-regular");
var warn = warnOnce("CustomSelectOption");
/**
 * @see https://vkcom.github.io/VKUI/#/CustomSelectOption
 */ export var CustomSelectOption = function(_param) {
    var children = _param.children, _param_hierarchy = _param.hierarchy, hierarchy = _param_hierarchy === void 0 ? 0 : _param_hierarchy, hovered = _param.hovered, selected = _param.selected, before = _param.before, after = _param.after, option = _param.option, description = _param.description, disabled = _param.disabled, styleProp = _param.style, className = _param.className, restProps = _object_without_properties(_param, [
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
    var _useAdaptivity = useAdaptivity(), _useAdaptivity_sizeY = _useAdaptivity.sizeY, sizeY = _useAdaptivity_sizeY === void 0 ? "none" : _useAdaptivity_sizeY;
    var style = React.useMemo(function() {
        return hierarchy > 0 ? _object_spread({
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
    return /*#__PURE__*/ React.createElement(Paragraph, _object_spread_props(_object_spread({}, restProps), {
        Component: "div",
        role: "option",
        title: title,
        "aria-disabled": disabled,
        "aria-selected": selected,
        className: classNames("vkuiCustomSelectOption", sizeY !== SizeType.COMPACT && sizeYClassNames[sizeY], hovered && !disabled && "vkuiCustomSelectOption--hover", disabled && "vkuiCustomSelectOption--disabled", hierarchy > 0 && "vkuiCustomSelectOption--hierarchy", className),
        style: style
    }), hasReactNode(before) && /*#__PURE__*/ React.createElement("div", {
        className: "vkuiCustomSelectOption__before"
    }, before), /*#__PURE__*/ React.createElement("div", {
        className: "vkuiCustomSelectOption__main"
    }, /*#__PURE__*/ React.createElement("div", {
        className: "vkuiCustomSelectOption__children"
    }, children), hasReactNode(description) && /*#__PURE__*/ React.createElement(Footnote, {
        className: "vkuiCustomSelectOption__description"
    }, description)), /*#__PURE__*/ React.createElement("div", {
        className: "vkuiCustomSelectOption__after"
    }, hasReactNode(after) && /*#__PURE__*/ React.createElement("div", null, after), selected && /*#__PURE__*/ React.createElement(Icon16Done, {
        className: "vkuiCustomSelectOption__selectedIcon"
    })));
};

//# sourceMappingURL=CustomSelectOption.js.map