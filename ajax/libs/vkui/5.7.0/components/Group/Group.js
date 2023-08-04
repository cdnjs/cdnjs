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
import { ModalRootContext } from "../ModalRoot/ModalRootContext";
import { Separator } from "../Separator/Separator";
import { Spacing } from "../Spacing/Spacing";
import { Footnote } from "../Typography/Footnote/Footnote";
var sizeXClassNames = _define_property({
    none: classNames("vkuiGroup--sizeX-none", "vkuiInternalGroup--sizeX-none")
}, SizeType.COMPACT, "vkuiGroup--sizeX-compact");
var warn = warnOnce("Group");
/**
 * @see https://vkcom.github.io/VKUI/#/Group
 */ export var Group = function(_param) {
    var header = _param.header, description = _param.description, children = _param.children, _param_separator = _param.separator, separator = _param_separator === void 0 ? "auto" : _param_separator, getRootRef = _param.getRootRef, modeProps = _param.mode, _param_padding = _param.padding, padding = _param_padding === void 0 ? "m" : _param_padding, className = _param.className, tabIndexProp = _param.tabIndex, restProps = _object_without_properties(_param, [
        "header",
        "description",
        "children",
        "separator",
        "getRootRef",
        "mode",
        "padding",
        "className",
        "tabIndex"
    ]);
    var isInsideModal = React.useContext(ModalRootContext).isInsideModal;
    var platform = usePlatform();
    var _useAdaptivity = useAdaptivity(), _useAdaptivity_sizeX = _useAdaptivity.sizeX, sizeX = _useAdaptivity_sizeX === void 0 ? "none" : _useAdaptivity_sizeX;
    var mode = modeProps;
    if (!modeProps) {
        // Подробнее в "none" можно прочитать в ADAPTIVITY_GUIDE.md
        mode = isInsideModal ? "plain" : "none";
    }
    if (mode === "none" && sizeX !== "none") {
        mode = sizeX === SizeType.REGULAR ? "card" : "plain";
    }
    var isTabPanel = restProps.role === "tabpanel";
    if (process.env.NODE_ENV === "development" && isTabPanel && (!restProps["aria-controls"] || !restProps["id"])) {
        warn('При использовании роли "tabpanel" необходимо задать значение свойств "aria-controls" и "id"');
    }
    var tabIndex = isTabPanel && tabIndexProp === undefined ? 0 : tabIndexProp;
    var separatorClassName = classNames("vkuiGroup__separator", separator === "show" && "vkuiGroup__separator--force");
    return /*#__PURE__*/ React.createElement(React.Fragment, null, /*#__PURE__*/ React.createElement("section", _object_spread_props(_object_spread({}, restProps), {
        tabIndex: tabIndex,
        ref: getRootRef,
        className: classNames("vkuiInternalGroup", "vkuiGroup", isInsideModal && "vkuiGroup--inside-modal", platform === Platform.IOS && "vkuiGroup--ios", sizeX !== SizeType.REGULAR && sizeXClassNames[sizeX], mode && ({
            none: classNames("vkuiGroup--mode-none", "vkuiInternalGroup--mode-none"),
            plain: classNames("vkuiGroup--mode-plain", "vkuiInternalGroup--mode-plain"),
            card: classNames("vkuiGroup--mode-card", "vkuiInternalGroup--mode-card")
        })[mode], {
            s: "vkuiGroup--padding-s",
            m: "vkuiGroup--padding-m"
        }[padding], className)
    }), header, children, hasReactNode(description) && /*#__PURE__*/ React.createElement(Footnote, {
        className: "vkuiGroup__description"
    }, description)), separator !== "hide" && /*#__PURE__*/ React.createElement(React.Fragment, null, /*#__PURE__*/ React.createElement(Spacing, {
        className: classNames(separatorClassName, "vkuiGroup__separator--spacing"),
        size: 16
    }), /*#__PURE__*/ React.createElement(Separator, {
        className: classNames(separatorClassName, "vkuiGroup__separator--separator")
    })));
};

//# sourceMappingURL=Group.js.map