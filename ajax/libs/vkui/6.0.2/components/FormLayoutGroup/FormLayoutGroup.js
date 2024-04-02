import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import * as React from 'react';
import { classNames, noop } from '@vkontakte/vkjs';
import { useAdaptivity } from '../../hooks/useAdaptivity';
import { useExternRef } from '../../hooks/useExternRef';
import { Removable } from '../Removable/Removable';
import { RootComponent } from '../RootComponent/RootComponent';
const sizeYClassNames = {
    none: classNames("vkuiFormLayoutGroup--sizeY-none", 'vkuiInternalFormLayoutGroup--sizeY-none'),
    ['compact']: classNames("vkuiFormLayoutGroup--sizeY-compact", 'vkuiInternalFormLayoutGroup--sizeY-compact')
};
/**
 * @see https://vkcom.github.io/VKUI/#/FormLayoutGroup
 */ export const FormLayoutGroup = (_param)=>{
    var { children, mode = 'vertical', removable, segmented, removePlaceholder = 'Удалить', onRemove = noop, getRootRef } = _param, restProps = _object_without_properties(_param, [
        "children",
        "mode",
        "removable",
        "segmented",
        "removePlaceholder",
        "onRemove",
        "getRootRef"
    ]);
    const { sizeY = 'none' } = useAdaptivity();
    const isRemovable = removable && mode === 'horizontal';
    const rootEl = useExternRef(getRootRef);
    return /*#__PURE__*/ React.createElement(RootComponent, _object_spread({
        getRootRef: rootEl,
        baseClassName: classNames(sizeY !== 'regular' && sizeYClassNames[sizeY], mode === 'horizontal' && classNames("vkuiFormLayoutGroup--mode-horizontal", 'vkuiInternalFormLayoutGroup--mode-horizontal'), mode === 'vertical' && classNames("vkuiFormLayoutGroup--mode-vertical", 'vkuiInternalFormLayoutGroup--mode-vertical'), isRemovable && classNames("vkuiFormLayoutGroup--removable", 'vkuiInternalFormLayoutGroup--removable'), segmented && classNames("vkuiFormLayoutGroup--segmented", 'vkuiInternalFormLayoutGroup--segmented'))
    }, restProps), isRemovable ? /*#__PURE__*/ React.createElement(Removable, {
        className: "vkuiFormLayoutGroup__removable",
        align: "start",
        removePlaceholder: removePlaceholder,
        onRemove: (e)=>{
            if (rootEl === null || rootEl === void 0 ? void 0 : rootEl.current) {
                onRemove(e, rootEl.current);
            }
        },
        indent: removable === 'indent'
    }, children) : /*#__PURE__*/ React.createElement(React.Fragment, null, children, /*#__PURE__*/ React.createElement("span", {
        className: "vkuiFormLayoutGroup__offset",
        "aria-hidden": true
    })));
};

//# sourceMappingURL=FormLayoutGroup.js.map