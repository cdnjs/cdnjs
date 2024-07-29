import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import { jsx as _jsx } from "react/jsx-runtime";
import * as React from 'react';
import { Icon16Cancel } from '@vkontakte/icons';
import { stopPropagation } from '../../lib/utils';
import { IconButton } from '../IconButton/IconButton';
export const FormFieldClearButton = (_param)=>{
    var { className, onClick } = _param, restProps = _object_without_properties(_param, [
        "className",
        "onClick"
    ]);
    return /*#__PURE__*/ _jsx(IconButton, _object_spread_props(_object_spread({
        Component: "button",
        label: "Очистить поле",
        onKeyDown: stopPropagation,
        type: "button",
        activeMode: "opacity",
        hoverMode: "opacity"
    }, restProps), {
        className: className,
        onClick: (e)=>{
            stopPropagation(e);
            e.preventDefault();
            onClick();
        },
        children: /*#__PURE__*/ _jsx(Icon16Cancel, {})
    }));
};

//# sourceMappingURL=FormFieldClearButton.js.map