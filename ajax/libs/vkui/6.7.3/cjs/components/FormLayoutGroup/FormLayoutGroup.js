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
const _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
const _object_spread = require("@swc/helpers/_/_object_spread");
const _object_spread_props = require("@swc/helpers/_/_object_spread_props");
const _object_without_properties = require("@swc/helpers/_/_object_without_properties");
const _jsxruntime = require("react/jsx-runtime");
const _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
const _vkjs = require("@vkontakte/vkjs");
const _useAdaptivity = require("../../hooks/useAdaptivity");
const _useExternRef = require("../../hooks/useExternRef");
const _Removable = require("../Removable/Removable");
const _RootComponent = require("../RootComponent/RootComponent");
const sizeYClassNames = {
    none: (0, _vkjs.classNames)("vkuiFormLayoutGroup--sizeY-none", 'vkuiInternalFormLayoutGroup--sizeY-none'),
    compact: (0, _vkjs.classNames)("vkuiFormLayoutGroup--sizeY-compact", 'vkuiInternalFormLayoutGroup--sizeY-compact')
};
const FormLayoutGroup = (_param)=>{
    var { children, mode = 'vertical', removable, segmented, removePlaceholder = 'Удалить', onRemove, getRootRef } = _param, restProps = _object_without_properties._(_param, [
        "children",
        "mode",
        "removable",
        "segmented",
        "removePlaceholder",
        "onRemove",
        "getRootRef"
    ]);
    const { sizeY = 'none' } = (0, _useAdaptivity.useAdaptivity)();
    const isRemovable = removable && mode === 'horizontal';
    const rootEl = (0, _useExternRef.useExternRef)(getRootRef);
    return /*#__PURE__*/ (0, _jsxruntime.jsx)(_RootComponent.RootComponent, _object_spread_props._(_object_spread._({
        getRootRef: rootEl,
        Component: "fieldset",
        baseClassName: (0, _vkjs.classNames)("vkuiFormLayoutGroup", sizeY !== 'regular' && sizeYClassNames[sizeY], mode === 'horizontal' && (0, _vkjs.classNames)("vkuiFormLayoutGroup--mode-horizontal", 'vkuiInternalFormLayoutGroup--mode-horizontal'), mode === 'vertical' && 'vkuiInternalFormLayoutGroup--mode-vertical', isRemovable && (0, _vkjs.classNames)("vkuiFormLayoutGroup--removable", 'vkuiInternalFormLayoutGroup--removable'), segmented && (0, _vkjs.classNames)("vkuiFormLayoutGroup--segmented", 'vkuiInternalFormLayoutGroup--segmented'))
    }, restProps), {
        children: isRemovable ? /*#__PURE__*/ (0, _jsxruntime.jsx)(_Removable.Removable, {
            className: "vkuiFormLayoutGroup__removable",
            align: "start",
            removePlaceholder: removePlaceholder,
            onRemove: (e)=>{
                if (rootEl === null || rootEl === void 0 ? void 0 : rootEl.current) {
                    onRemove === null || onRemove === void 0 ? void 0 : onRemove(e, rootEl.current);
                }
            },
            indent: removable === 'indent',
            children: children
        }) : /*#__PURE__*/ (0, _jsxruntime.jsxs)(_react.Fragment, {
            children: [
                children,
                /*#__PURE__*/ (0, _jsxruntime.jsx)("span", {
                    className: "vkuiFormLayoutGroup__offset",
                    "aria-hidden": true
                })
            ]
        })
    }));
};

//# sourceMappingURL=FormLayoutGroup.js.map