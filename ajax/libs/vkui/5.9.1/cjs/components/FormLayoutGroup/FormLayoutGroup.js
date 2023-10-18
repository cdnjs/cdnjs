"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "FormLayoutGroup", {
    enumerable: true,
    get: function() {
        return FormLayoutGroup;
    }
});
var _define_property = require("@swc/helpers/_/_define_property");
var _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
var _object_spread = require("@swc/helpers/_/_object_spread");
var _object_without_properties = require("@swc/helpers/_/_object_without_properties");
var _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
var _vkjs = require("@vkontakte/vkjs");
var _useAdaptivity = require("../../hooks/useAdaptivity");
var _useExternRef = require("../../hooks/useExternRef");
var _adaptivity = require("../../lib/adaptivity");
var _Removable = require("../Removable/Removable");
var _RootComponent = require("../RootComponent/RootComponent");
var sizeYClassNames = _define_property._({
    none: (0, _vkjs.classNames)("vkuiFormLayoutGroup--sizeY-none", "vkuiInternalFormLayoutGroup--sizeY-none")
}, _adaptivity.SizeType.COMPACT, (0, _vkjs.classNames)("vkuiFormLayoutGroup--sizeY-compact", "vkuiInternalFormLayoutGroup--sizeY-compact"));
var FormLayoutGroup = function(_param) {
    var children = _param.children, _param_mode = _param.mode, mode = _param_mode === void 0 ? "vertical" : _param_mode, removable = _param.removable, segmented = _param.segmented, _param_removePlaceholder = _param.removePlaceholder, removePlaceholder = _param_removePlaceholder === void 0 ? "Удалить" : _param_removePlaceholder, _param_onRemove = _param.onRemove, onRemove = _param_onRemove === void 0 ? _vkjs.noop : _param_onRemove, getRootRef = _param.getRootRef, restProps = _object_without_properties._(_param, [
        "children",
        "mode",
        "removable",
        "segmented",
        "removePlaceholder",
        "onRemove",
        "getRootRef"
    ]);
    var _useAdaptivity1 = (0, _useAdaptivity.useAdaptivity)(), _useAdaptivity_sizeY = _useAdaptivity1.sizeY, sizeY = _useAdaptivity_sizeY === void 0 ? "none" : _useAdaptivity_sizeY;
    var isRemovable = removable && mode === "horizontal";
    var rootEl = (0, _useExternRef.useExternRef)(getRootRef);
    return /*#__PURE__*/ _react.createElement(_RootComponent.RootComponent, _object_spread._({
        getRootRef: rootEl,
        baseClassName: (0, _vkjs.classNames)(sizeY !== _adaptivity.SizeType.REGULAR && sizeYClassNames[sizeY], mode === "horizontal" && (0, _vkjs.classNames)("vkuiFormLayoutGroup--mode-horizontal", "vkuiInternalFormLayoutGroup--mode-horizontal"), mode === "vertical" && (0, _vkjs.classNames)("vkuiFormLayoutGroup--mode-vertical", "vkuiInternalFormLayoutGroup--mode-vertical"), isRemovable && (0, _vkjs.classNames)("vkuiFormLayoutGroup--removable", "vkuiInternalFormLayoutGroup--removable"), segmented && (0, _vkjs.classNames)("vkuiFormLayoutGroup--segmented", "vkuiInternalFormLayoutGroup--segmented"))
    }, restProps), isRemovable ? /*#__PURE__*/ _react.createElement(_Removable.Removable, {
        className: "vkuiFormLayoutGroup__removable",
        align: "start",
        removePlaceholder: removePlaceholder,
        onRemove: function(e) {
            if (rootEl === null || rootEl === void 0 ? void 0 : rootEl.current) {
                onRemove(e, rootEl.current);
            }
        },
        indent: removable === "indent"
    }, children) : /*#__PURE__*/ _react.createElement(_react.Fragment, null, children, /*#__PURE__*/ _react.createElement("span", {
        className: "vkuiFormLayoutGroup__offset",
        "aria-hidden": true
    })));
};

//# sourceMappingURL=FormLayoutGroup.js.map