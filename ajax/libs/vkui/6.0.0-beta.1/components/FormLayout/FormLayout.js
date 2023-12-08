import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import * as React from 'react';
import { classNames } from '@vkontakte/vkjs';
import { useExternRef } from '../../hooks/useExternRef';
const preventDefault = (e)=>e.preventDefault();
/**
 * @see https://vkcom.github.io/VKUI/#/FormLayout
 */ export const FormLayout = (_param)=>{
    var { children, Component = 'form', getRef, getRootRef, onSubmit = preventDefault, className } = _param, restProps = _object_without_properties(_param, [
        "children",
        "Component",
        "getRef",
        "getRootRef",
        "onSubmit",
        "className"
    ]);
    const formLayoutRef = useExternRef(getRef, getRootRef);
    return /*#__PURE__*/ React.createElement(Component, _object_spread_props(_object_spread({}, restProps), {
        className: classNames("vkuiFormLayout", className),
        onSubmit: onSubmit,
        ref: formLayoutRef
    }), children, Component === 'form' && /*#__PURE__*/ React.createElement("input", {
        type: "submit",
        className: "vkuiFormLayout__submit",
        value: ""
    }));
};

//# sourceMappingURL=FormLayout.js.map