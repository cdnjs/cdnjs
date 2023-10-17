import { _ as _define_property } from "@swc/helpers/_/_define_property";
import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import * as React from "react";
import { classNames, hasReactNode, noop } from "@vkontakte/vkjs";
import { useAdaptivity } from "../../hooks/useAdaptivity";
import { useExternRef } from "../../hooks/useExternRef";
import { SizeType } from "../../lib/adaptivity";
import { Removable } from "../Removable/Removable";
import { RootComponent } from "../RootComponent/RootComponent";
import { Footnote } from "../Typography/Footnote/Footnote";
import { Subhead } from "../Typography/Subhead/Subhead";
var sizeYClassNames = _define_property({
    none: classNames("vkuiFormItem--sizeY-none", "vkuiInternalFormItem--sizeY-none")
}, SizeType.COMPACT, classNames("vkuiFormItem--sizeY-compact", "vkuiInternalFormItem--sizeY-compact"));
var stylesStatus = {
    error: classNames("vkuiFormItem--status-error", "vkuiInternalFormItem--status-error"),
    valid: classNames("vkuiFormItem--status-valid", "vkuiInternalFormItem--status-valid")
};
/**
 * @see https://vkcom.github.io/VKUI/#/FormItem
 */ export var FormItem = function(_param) {
    var children = _param.children, top = _param.top, bottom = _param.bottom, _param_status = _param.status, status = _param_status === void 0 ? "default" : _param_status, removable = _param.removable, _param_onRemove = _param.onRemove, onRemove = _param_onRemove === void 0 ? noop : _param_onRemove, _param_removePlaceholder = _param.removePlaceholder, removePlaceholder = _param_removePlaceholder === void 0 ? "Удалить" : _param_removePlaceholder, getRootRef = _param.getRootRef, htmlFor = _param.htmlFor, bottomId = _param.bottomId, noPadding = _param.noPadding, restProps = _object_without_properties(_param, [
        "children",
        "top",
        "bottom",
        "status",
        "removable",
        "onRemove",
        "removePlaceholder",
        "getRootRef",
        "htmlFor",
        "bottomId",
        "noPadding"
    ]);
    var rootEl = useExternRef(getRootRef);
    var _useAdaptivity = useAdaptivity(), _useAdaptivity_sizeY = _useAdaptivity.sizeY, sizeY = _useAdaptivity_sizeY === void 0 ? "none" : _useAdaptivity_sizeY;
    var wrappedChildren = /*#__PURE__*/ React.createElement(React.Fragment, null, hasReactNode(top) && /*#__PURE__*/ React.createElement(Subhead, {
        className: "vkuiFormItem__top",
        Component: htmlFor ? "label" : "h5",
        htmlFor: htmlFor
    }, top), children, hasReactNode(bottom) && /*#__PURE__*/ React.createElement(Footnote, {
        className: "vkuiFormItem__bottom",
        id: bottomId,
        role: status === "error" ? "alert" : undefined
    }, bottom));
    return /*#__PURE__*/ React.createElement(RootComponent, _object_spread_props(_object_spread({}, restProps), {
        getRootRef: rootEl,
        baseClassName: classNames("vkuiFormItem", !noPadding && "vkuiFormItem--withPadding", "vkuiInternalFormItem", status !== "default" && stylesStatus[status], sizeY !== SizeType.REGULAR && sizeYClassNames[sizeY], hasReactNode(top) && classNames("vkuiFormItem--withTop", "vkuiInternalFormItem--withTop"), removable && classNames("vkuiFormItem--removable", "vkuiInternalFormItem--removable"))
    }), removable ? /*#__PURE__*/ React.createElement(Removable, {
        align: "start",
        onRemove: function(e) {
            if (rootEl === null || rootEl === void 0 ? void 0 : rootEl.current) {
                onRemove(e, rootEl.current);
            }
        },
        removePlaceholder: removePlaceholder,
        indent: removable === "indent"
    }, /*#__PURE__*/ React.createElement("div", {
        className: classNames("vkuiFormItem__removable", "vkuiInternalFormItem__removable")
    }, wrappedChildren)) : wrappedChildren);
};

//# sourceMappingURL=FormItem.js.map