"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "FormItem", {
    enumerable: true,
    get: function() {
        return FormItem;
    }
});
var _define_property = require("@swc/helpers/_/_define_property");
var _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
var _object_spread = require("@swc/helpers/_/_object_spread");
var _object_spread_props = require("@swc/helpers/_/_object_spread_props");
var _object_without_properties = require("@swc/helpers/_/_object_without_properties");
var _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
var _vkjs = require("@vkontakte/vkjs");
var _useAdaptivity = require("../../hooks/useAdaptivity");
var _useExternRef = require("../../hooks/useExternRef");
var _adaptivity = require("../../lib/adaptivity");
var _Removable = require("../Removable/Removable");
var _RootComponent = require("../RootComponent/RootComponent");
var _Footnote = require("../Typography/Footnote/Footnote");
var _Subhead = require("../Typography/Subhead/Subhead");
var sizeYClassNames = _define_property._({
    none: (0, _vkjs.classNames)("vkuiFormItem--sizeY-none", "vkuiInternalFormItem--sizeY-none")
}, _adaptivity.SizeType.COMPACT, (0, _vkjs.classNames)("vkuiFormItem--sizeY-compact", "vkuiInternalFormItem--sizeY-compact"));
var stylesStatus = {
    error: (0, _vkjs.classNames)("vkuiFormItem--status-error", "vkuiInternalFormItem--status-error"),
    valid: (0, _vkjs.classNames)("vkuiFormItem--status-valid", "vkuiInternalFormItem--status-valid")
};
var FormItem = function(_param) {
    var children = _param.children, top = _param.top, bottom = _param.bottom, _param_status = _param.status, status = _param_status === void 0 ? "default" : _param_status, removable = _param.removable, _param_onRemove = _param.onRemove, onRemove = _param_onRemove === void 0 ? _vkjs.noop : _param_onRemove, _param_removePlaceholder = _param.removePlaceholder, removePlaceholder = _param_removePlaceholder === void 0 ? "Удалить" : _param_removePlaceholder, getRootRef = _param.getRootRef, htmlFor = _param.htmlFor, bottomId = _param.bottomId, noPadding = _param.noPadding, restProps = _object_without_properties._(_param, [
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
    var rootEl = (0, _useExternRef.useExternRef)(getRootRef);
    var _useAdaptivity1 = (0, _useAdaptivity.useAdaptivity)(), _useAdaptivity_sizeY = _useAdaptivity1.sizeY, sizeY = _useAdaptivity_sizeY === void 0 ? "none" : _useAdaptivity_sizeY;
    var wrappedChildren = /*#__PURE__*/ _react.createElement(_react.Fragment, null, (0, _vkjs.hasReactNode)(top) && /*#__PURE__*/ _react.createElement(_Subhead.Subhead, {
        className: "vkuiFormItem__top",
        Component: htmlFor ? "label" : "h5",
        htmlFor: htmlFor
    }, top), children, (0, _vkjs.hasReactNode)(bottom) && /*#__PURE__*/ _react.createElement(_Footnote.Footnote, {
        className: "vkuiFormItem__bottom",
        id: bottomId,
        role: status === "error" ? "alert" : undefined
    }, bottom));
    return /*#__PURE__*/ _react.createElement(_RootComponent.RootComponent, _object_spread_props._(_object_spread._({}, restProps), {
        getRootRef: rootEl,
        baseClassName: (0, _vkjs.classNames)("vkuiFormItem", !noPadding && "vkuiFormItem--withPadding", "vkuiInternalFormItem", status !== "default" && stylesStatus[status], sizeY !== _adaptivity.SizeType.REGULAR && sizeYClassNames[sizeY], (0, _vkjs.hasReactNode)(top) && (0, _vkjs.classNames)("vkuiFormItem--withTop", "vkuiInternalFormItem--withTop"), removable && (0, _vkjs.classNames)("vkuiFormItem--removable", "vkuiInternalFormItem--removable"))
    }), removable ? /*#__PURE__*/ _react.createElement(_Removable.Removable, {
        align: "start",
        onRemove: function(e) {
            if (rootEl === null || rootEl === void 0 ? void 0 : rootEl.current) {
                onRemove(e, rootEl.current);
            }
        },
        removePlaceholder: removePlaceholder,
        indent: removable === "indent"
    }, /*#__PURE__*/ _react.createElement("div", {
        className: (0, _vkjs.classNames)("vkuiFormItem__removable", "vkuiInternalFormItem__removable")
    }, wrappedChildren)) : wrappedChildren);
};

//# sourceMappingURL=FormItem.js.map