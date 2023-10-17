import { _ as _define_property } from "@swc/helpers/_/_define_property";
import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import * as React from "react";
import { classNames, noop } from "@vkontakte/vkjs";
import { useAdaptivity } from "../../hooks/useAdaptivity";
import { useExternRef } from "../../hooks/useExternRef";
import { SizeType } from "../../lib/adaptivity";
import { Removable } from "../Removable/Removable";
import { RootComponent } from "../RootComponent/RootComponent";
var sizeYClassNames = _define_property({
    none: classNames("vkuiFormLayoutGroup--sizeY-none", "vkuiInternalFormLayoutGroup--sizeY-none")
}, SizeType.COMPACT, classNames("vkuiFormLayoutGroup--sizeY-compact", "vkuiInternalFormLayoutGroup--sizeY-compact"));
/**
 * @see https://vkcom.github.io/VKUI/#/FormLayoutGroup
 */ export var FormLayoutGroup = function(_param) {
    var children = _param.children, _param_mode = _param.mode, mode = _param_mode === void 0 ? "vertical" : _param_mode, removable = _param.removable, segmented = _param.segmented, _param_removePlaceholder = _param.removePlaceholder, removePlaceholder = _param_removePlaceholder === void 0 ? "Удалить" : _param_removePlaceholder, _param_onRemove = _param.onRemove, onRemove = _param_onRemove === void 0 ? noop : _param_onRemove, getRootRef = _param.getRootRef, restProps = _object_without_properties(_param, [
        "children",
        "mode",
        "removable",
        "segmented",
        "removePlaceholder",
        "onRemove",
        "getRootRef"
    ]);
    var _useAdaptivity = useAdaptivity(), _useAdaptivity_sizeY = _useAdaptivity.sizeY, sizeY = _useAdaptivity_sizeY === void 0 ? "none" : _useAdaptivity_sizeY;
    var isRemovable = removable && mode === "horizontal";
    var rootEl = useExternRef(getRootRef);
    return /*#__PURE__*/ React.createElement(RootComponent, _object_spread({
        getRootRef: rootEl,
        baseClassName: classNames(sizeY !== SizeType.REGULAR && sizeYClassNames[sizeY], mode === "horizontal" && classNames("vkuiFormLayoutGroup--mode-horizontal", "vkuiInternalFormLayoutGroup--mode-horizontal"), mode === "vertical" && classNames("vkuiFormLayoutGroup--mode-vertical", "vkuiInternalFormLayoutGroup--mode-vertical"), isRemovable && classNames("vkuiFormLayoutGroup--removable", "vkuiInternalFormLayoutGroup--removable"), segmented && classNames("vkuiFormLayoutGroup--segmented", "vkuiInternalFormLayoutGroup--segmented"))
    }, restProps), isRemovable ? /*#__PURE__*/ React.createElement(Removable, {
        className: "vkuiFormLayoutGroup__removable",
        align: "start",
        removePlaceholder: removePlaceholder,
        onRemove: function(e) {
            if (rootEl === null || rootEl === void 0 ? void 0 : rootEl.current) {
                onRemove(e, rootEl.current);
            }
        },
        indent: removable === "indent"
    }, children) : /*#__PURE__*/ React.createElement(React.Fragment, null, children, /*#__PURE__*/ React.createElement("span", {
        className: "vkuiFormLayoutGroup__offset",
        "aria-hidden": true
    })));
};

//# sourceMappingURL=FormLayoutGroup.js.map