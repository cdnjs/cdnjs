import { _ as _define_property } from "@swc/helpers/_/_define_property";
import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import * as React from "react";
import { classNames, hasReactNode } from "@vkontakte/vkjs";
import { useAdaptivity } from "../../hooks/useAdaptivity";
import { usePlatform } from "../../hooks/usePlatform";
import { SizeType } from "../../lib/adaptivity";
import { Platform } from "../../lib/platform";
import { warnOnce } from "../../lib/warnOnce";
import { AppRootContext } from "../AppRoot/AppRootContext";
import { ModalRootContext } from "../ModalRoot/ModalRootContext";
import { RootComponent } from "../RootComponent/RootComponent";
import { Separator } from "../Separator/Separator";
import { Spacing } from "../Spacing/Spacing";
import { Footnote } from "../Typography/Footnote/Footnote";
var sizeXClassNames = _define_property({
    none: classNames("vkuiGroup--sizeX-none", "vkuiInternalGroup--sizeX-none")
}, SizeType.COMPACT, "vkuiGroup--sizeX-compact");
var stylesMode = {
    none: classNames("vkuiGroup--mode-none", "vkuiInternalGroup--mode-none"),
    plain: classNames("vkuiGroup--mode-plain", "vkuiInternalGroup--mode-plain"),
    card: classNames("vkuiGroup--mode-card", "vkuiInternalGroup--mode-card")
};
var stylesPadding = {
    s: "vkuiGroup--padding-s",
    m: "vkuiGroup--padding-m"
};
/**
 * Вычисляем mode для Group.
 */ function useGroupMode(forcedMode, sizeX, isInsideModal) {
    var layout = React.useContext(AppRootContext).layout;
    if (forcedMode) {
        return forcedMode;
    }
    if (isInsideModal) {
        return "plain";
    }
    if (layout) {
        return layout;
    }
    if (sizeX !== "none") {
        return sizeX === SizeType.REGULAR ? "card" : "plain";
    }
    return "none";
}
var warn = warnOnce("Group");
/**
 * @see https://vkcom.github.io/VKUI/#/Group
 */ export var Group = function(_param) {
    var header = _param.header, description = _param.description, children = _param.children, _param_separator = _param.separator, separator = _param_separator === void 0 ? "auto" : _param_separator, modeProps = _param.mode, _param_padding = _param.padding, padding = _param_padding === void 0 ? "m" : _param_padding, tabIndexProp = _param.tabIndex, restProps = _object_without_properties(_param, [
        "header",
        "description",
        "children",
        "separator",
        "mode",
        "padding",
        "tabIndex"
    ]);
    var isInsideModal = React.useContext(ModalRootContext).isInsideModal;
    var platform = usePlatform();
    var _useAdaptivity = useAdaptivity(), _useAdaptivity_sizeX = _useAdaptivity.sizeX, sizeX = _useAdaptivity_sizeX === void 0 ? "none" : _useAdaptivity_sizeX;
    var mode = useGroupMode(modeProps, sizeX, isInsideModal);
    var isTabPanel = restProps.role === "tabpanel";
    if (process.env.NODE_ENV === "development" && isTabPanel && (!restProps["aria-controls"] || !restProps["id"])) {
        warn('При использовании роли "tabpanel" необходимо задать значение свойств "aria-controls" и "id"');
    }
    var tabIndex = isTabPanel && tabIndexProp === undefined ? 0 : tabIndexProp;
    return /*#__PURE__*/ React.createElement(React.Fragment, null, /*#__PURE__*/ React.createElement(RootComponent, _object_spread_props(_object_spread({
        Component: "section"
    }, restProps), {
        tabIndex: tabIndex,
        baseClassName: classNames("vkuiInternalGroup", "vkuiGroup", isInsideModal && "vkuiGroup--inside-modal", platform === Platform.IOS && "vkuiGroup--ios", sizeX !== SizeType.REGULAR && sizeXClassNames[sizeX], mode && stylesMode[mode], stylesPadding[padding])
    }), hasReactNode(header) && /*#__PURE__*/ React.createElement("div", {
        className: "vkuiGroup__header"
    }, header), children, hasReactNode(description) && /*#__PURE__*/ React.createElement(Footnote, {
        className: "vkuiGroup__description"
    }, description)), separator !== "hide" && /*#__PURE__*/ React.createElement(React.Fragment, null, /*#__PURE__*/ React.createElement(Spacing, {
        className: classNames("vkuiGroup__separator", "vkuiGroup__separator--spacing"),
        size: 16
    }), /*#__PURE__*/ React.createElement(Separator, {
        className: classNames("vkuiGroup__separator", "vkuiGroup__separator--separator", separator === "show" && "vkuiGroup__separator--force")
    })));
};

//# sourceMappingURL=Group.js.map