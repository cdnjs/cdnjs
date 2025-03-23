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
const _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
const _object_spread = require("@swc/helpers/_/_object_spread");
const _object_spread_props = require("@swc/helpers/_/_object_spread_props");
const _object_without_properties = require("@swc/helpers/_/_object_without_properties");
const _jsxruntime = require("react/jsx-runtime");
const _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
const _vkjs = require("@vkontakte/vkjs");
const _useAdaptivity = require("../../hooks/useAdaptivity");
const _useExternRef = require("../../hooks/useExternRef");
const _useObjectMemo = require("../../hooks/useObjectMemo");
const _Removable = require("../Removable/Removable");
const _RootComponent = require("../RootComponent/RootComponent");
const _Footnote = require("../Typography/Footnote/Footnote");
const _FormItemTop = require("./FormItemTop/FormItemTop");
const _FormItemTopAside = require("./FormItemTop/FormItemTopAside");
const _FormItemTopLabel = require("./FormItemTop/FormItemTopLabel");
const _context = require("./context");
const sizeYClassNames = {
    none: (0, _vkjs.classNames)("vkuiFormItem--sizeY-none", 'vkuiInternalFormItem--sizeY-none'),
    compact: (0, _vkjs.classNames)("vkuiFormItem--sizeY-compact", 'vkuiInternalFormItem--sizeY-compact')
};
const stylesStatus = {
    error: (0, _vkjs.classNames)("vkuiFormItem--status-error", 'vkuiInternalFormItem--status-error'),
    valid: (0, _vkjs.classNames)("vkuiFormItem--status-valid", 'vkuiInternalFormItem--status-valid')
};
const FormItem = (_param)=>{
    var { children, top, topId, topMultiline, topComponent: topComponentProp, bottom, status = 'default', removable, onRemove, removePlaceholder = 'Удалить', getRootRef, htmlFor, bottomId, noPadding, topNode, required = false } = _param, restProps = _object_without_properties._(_param, [
        "children",
        "top",
        "topId",
        "topMultiline",
        "topComponent",
        "bottom",
        "status",
        "removable",
        "onRemove",
        "removePlaceholder",
        "getRootRef",
        "htmlFor",
        "bottomId",
        "noPadding",
        "topNode",
        "required"
    ]);
    const rootEl = (0, _useExternRef.useExternRef)(getRootRef);
    const { sizeY = 'none' } = (0, _useAdaptivity.useAdaptivity)();
    const wrappedChildren = /*#__PURE__*/ (0, _jsxruntime.jsxs)(_react.Fragment, {
        children: [
            (0, _vkjs.hasReactNode)(topNode) ? topNode : (0, _vkjs.hasReactNode)(top) ? /*#__PURE__*/ (0, _jsxruntime.jsx)(_FormItemTop.FormItemTop, {
                children: /*#__PURE__*/ (0, _jsxruntime.jsx)(_FormItemTopLabel.FormItemTopLabel, {
                    htmlFor: htmlFor,
                    Component: topComponentProp,
                    multiline: topMultiline,
                    id: topId,
                    children: top
                })
            }) : null,
            children,
            (0, _vkjs.hasReactNode)(bottom) && /*#__PURE__*/ (0, _jsxruntime.jsx)(_Footnote.Footnote, {
                className: "vkuiFormItem__bottom",
                id: bottomId,
                role: status === 'error' ? 'alert' : undefined,
                children: bottom
            })
        ]
    });
    const context = (0, _useObjectMemo.useObjectMemo)({
        required,
        topMultiline
    });
    return /*#__PURE__*/ (0, _jsxruntime.jsx)(_RootComponent.RootComponent, _object_spread_props._(_object_spread._({}, restProps), {
        getRootRef: rootEl,
        baseClassName: (0, _vkjs.classNames)("vkuiFormItem", !noPadding && "vkuiFormItem--withPadding", 'vkuiInternalFormItem', status !== 'default' && stylesStatus[status], sizeY !== 'regular' && sizeYClassNames[sizeY], (0, _vkjs.hasReactNode)(top) && (0, _vkjs.classNames)("vkuiFormItem--withTop", 'vkuiInternalFormItem--withTop'), removable && (0, _vkjs.classNames)("vkuiFormItem--removable", 'vkuiInternalFormItem--removable')),
        children: /*#__PURE__*/ (0, _jsxruntime.jsx)(_context.FormItemContext.Provider, {
            value: context,
            children: removable ? /*#__PURE__*/ (0, _jsxruntime.jsx)(_Removable.Removable, {
                align: "start",
                onRemove: (e)=>{
                    if (rootEl === null || rootEl === void 0 ? void 0 : rootEl.current) {
                        onRemove === null || onRemove === void 0 ? void 0 : onRemove(e, rootEl.current);
                    }
                },
                removePlaceholder: removePlaceholder,
                indent: removable === 'indent',
                children: /*#__PURE__*/ (0, _jsxruntime.jsx)("div", {
                    className: (0, _vkjs.classNames)("vkuiFormItem__removable", 'vkuiInternalFormItem__removable'),
                    children: wrappedChildren
                })
            }) : wrappedChildren
        })
    }));
};
FormItem.displayName = 'FormItem';
FormItem.Top = _FormItemTop.FormItemTop;
FormItem.Top.displayName = 'FormItem.Top';
FormItem.TopLabel = _FormItemTopLabel.FormItemTopLabel;
FormItem.TopLabel.displayName = 'FormItem.TopLabel';
FormItem.TopAside = _FormItemTopAside.FormItemTopAside;
FormItem.TopAside.displayName = 'FormItem.TopAside';

//# sourceMappingURL=FormItem.js.map