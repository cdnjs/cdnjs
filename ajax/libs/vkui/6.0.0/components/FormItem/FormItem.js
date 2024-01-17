import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import * as React from 'react';
import { classNames, hasReactNode, noop } from '@vkontakte/vkjs';
import { useAdaptivity } from '../../hooks/useAdaptivity';
import { useExternRef } from '../../hooks/useExternRef';
import { Removable } from '../Removable/Removable';
import { RootComponent } from '../RootComponent/RootComponent';
import { Footnote } from '../Typography/Footnote/Footnote';
import { Subhead } from '../Typography/Subhead/Subhead';
const sizeYClassNames = {
    none: classNames("vkuiFormItem--sizeY-none", 'vkuiInternalFormItem--sizeY-none'),
    ['compact']: classNames("vkuiFormItem--sizeY-compact", 'vkuiInternalFormItem--sizeY-compact')
};
const stylesStatus = {
    error: classNames("vkuiFormItem--status-error", 'vkuiInternalFormItem--status-error'),
    valid: classNames("vkuiFormItem--status-valid", 'vkuiInternalFormItem--status-valid')
};
/**
 * @see https://vkcom.github.io/VKUI/#/FormItem
 */ export const FormItem = (_param)=>{
    var { children, top, topComponent: topComponentProp, bottom, status = 'default', removable, onRemove = noop, removePlaceholder = 'Удалить', getRootRef, htmlFor, bottomId, noPadding } = _param, restProps = _object_without_properties(_param, [
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
    const rootEl = useExternRef(getRootRef);
    const { sizeY = 'none' } = useAdaptivity();
    const topComponent = topComponentProp || htmlFor && 'label' || 'span';
    const wrappedChildren = /*#__PURE__*/ React.createElement(React.Fragment, null, hasReactNode(top) && /*#__PURE__*/ React.createElement(Subhead, {
        className: "vkuiFormItem__top",
        Component: topComponent,
        htmlFor: htmlFor
    }, top), children, hasReactNode(bottom) && /*#__PURE__*/ React.createElement(Footnote, {
        className: "vkuiFormItem__bottom",
        id: bottomId,
        role: status === 'error' ? 'alert' : undefined
    }, bottom));
    return /*#__PURE__*/ React.createElement(RootComponent, _object_spread_props(_object_spread({}, restProps), {
        getRootRef: rootEl,
        baseClassName: classNames("vkuiFormItem", !noPadding && "vkuiFormItem--withPadding", 'vkuiInternalFormItem', status !== 'default' && stylesStatus[status], sizeY !== 'regular' && sizeYClassNames[sizeY], hasReactNode(top) && classNames("vkuiFormItem--withTop", 'vkuiInternalFormItem--withTop'), removable && classNames("vkuiFormItem--removable", 'vkuiInternalFormItem--removable'))
    }), removable ? /*#__PURE__*/ React.createElement(Removable, {
        align: "start",
        onRemove: (e)=>{
            if (rootEl === null || rootEl === void 0 ? void 0 : rootEl.current) {
                onRemove(e, rootEl.current);
            }
        },
        removePlaceholder: removePlaceholder,
        indent: removable === 'indent'
    }, /*#__PURE__*/ React.createElement("div", {
        className: classNames("vkuiFormItem__removable", 'vkuiInternalFormItem__removable')
    }, wrappedChildren)) : wrappedChildren);
};

//# sourceMappingURL=FormItem.js.map