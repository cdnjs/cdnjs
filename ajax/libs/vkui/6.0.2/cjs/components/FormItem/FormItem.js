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
const _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
const _vkjs = require("@vkontakte/vkjs");
const _useAdaptivity = require("../../hooks/useAdaptivity");
const _useExternRef = require("../../hooks/useExternRef");
const _Removable = require("../Removable/Removable");
const _RootComponent = require("../RootComponent/RootComponent");
const _Footnote = require("../Typography/Footnote/Footnote");
const _Subhead = require("../Typography/Subhead/Subhead");
const sizeYClassNames = {
    none: (0, _vkjs.classNames)("vkuiFormItem--sizeY-none", 'vkuiInternalFormItem--sizeY-none'),
    ['compact']: (0, _vkjs.classNames)("vkuiFormItem--sizeY-compact", 'vkuiInternalFormItem--sizeY-compact')
};
const stylesStatus = {
    error: (0, _vkjs.classNames)("vkuiFormItem--status-error", 'vkuiInternalFormItem--status-error'),
    valid: (0, _vkjs.classNames)("vkuiFormItem--status-valid", 'vkuiInternalFormItem--status-valid')
};
const FormItem = (_param)=>{
    var { children, top, topComponent: topComponentProp, bottom, status = 'default', removable, onRemove = _vkjs.noop, removePlaceholder = 'Удалить', getRootRef, htmlFor, bottomId, noPadding } = _param, restProps = _object_without_properties._(_param, [
        "children",
        "top",
        "topComponent",
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
    const rootEl = (0, _useExternRef.useExternRef)(getRootRef);
    const { sizeY = 'none' } = (0, _useAdaptivity.useAdaptivity)();
    const topComponent = topComponentProp || htmlFor && 'label' || 'span';
    const wrappedChildren = /*#__PURE__*/ _react.createElement(_react.Fragment, null, (0, _vkjs.hasReactNode)(top) && /*#__PURE__*/ _react.createElement(_Subhead.Subhead, {
        className: "vkuiFormItem__top",
        Component: topComponent,
        htmlFor: htmlFor
    }, top), children, (0, _vkjs.hasReactNode)(bottom) && /*#__PURE__*/ _react.createElement(_Footnote.Footnote, {
        className: "vkuiFormItem__bottom",
        id: bottomId,
        role: status === 'error' ? 'alert' : undefined
    }, bottom));
    return /*#__PURE__*/ _react.createElement(_RootComponent.RootComponent, _object_spread_props._(_object_spread._({}, restProps), {
        getRootRef: rootEl,
        baseClassName: (0, _vkjs.classNames)("vkuiFormItem", !noPadding && "vkuiFormItem--withPadding", 'vkuiInternalFormItem', status !== 'default' && stylesStatus[status], sizeY !== 'regular' && sizeYClassNames[sizeY], (0, _vkjs.hasReactNode)(top) && (0, _vkjs.classNames)("vkuiFormItem--withTop", 'vkuiInternalFormItem--withTop'), removable && (0, _vkjs.classNames)("vkuiFormItem--removable", 'vkuiInternalFormItem--removable'))
    }), removable ? /*#__PURE__*/ _react.createElement(_Removable.Removable, {
        align: "start",
        onRemove: (e)=>{
            if (rootEl === null || rootEl === void 0 ? void 0 : rootEl.current) {
                onRemove(e, rootEl.current);
            }
        },
        removePlaceholder: removePlaceholder,
        indent: removable === 'indent'
    }, /*#__PURE__*/ _react.createElement("div", {
        className: (0, _vkjs.classNames)("vkuiFormItem__removable", 'vkuiInternalFormItem__removable')
    }, wrappedChildren)) : wrappedChildren);
};

//# sourceMappingURL=FormItem.js.map