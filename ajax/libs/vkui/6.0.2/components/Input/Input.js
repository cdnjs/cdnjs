import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import * as React from 'react';
import { classNames } from '@vkontakte/vkjs';
import { useAdaptivity } from '../../hooks/useAdaptivity';
import { FormField } from '../FormField/FormField';
import { Text } from '../Typography/Text/Text';
const sizeYClassNames = {
    none: "vkuiInput--sizeY-none",
    ['compact']: "vkuiInput--sizeY-compact"
};
/**
 * @see https://vkcom.github.io/VKUI/#/Input
 */ export const Input = (_param)=>{
    var { type = 'text', align = 'left', getRef, className, getRootRef, style, before, after, status, mode } = _param, restProps = _object_without_properties(_param, [
        "type",
        "align",
        "getRef",
        "className",
        "getRootRef",
        "style",
        "before",
        "after",
        "status",
        "mode"
    ]);
    const { sizeY = 'none' } = useAdaptivity();
    return /*#__PURE__*/ React.createElement(FormField, {
        style: style,
        className: classNames("vkuiInput", align === 'right' && "vkuiInput--align-right", align === 'center' && "vkuiInput--align-center", sizeY !== 'regular' && sizeYClassNames[sizeY], before && "vkuiInput--hasBefore", after && "vkuiInput--hasAfter", className),
        getRootRef: getRootRef,
        before: before,
        after: after,
        disabled: restProps.disabled,
        mode: mode,
        status: status
    }, /*#__PURE__*/ React.createElement(Text, _object_spread_props(_object_spread({}, restProps), {
        Component: "input",
        normalize: false,
        type: type,
        className: "vkuiInput__el",
        getRootRef: getRef
    })));
};

//# sourceMappingURL=Input.js.map