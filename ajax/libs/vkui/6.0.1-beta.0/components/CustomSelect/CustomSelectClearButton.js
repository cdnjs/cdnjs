import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import * as React from 'react';
import { Icon16Cancel } from '@vkontakte/icons';
import { stopPropagation } from '../../lib/utils';
import { IconButton } from '../IconButton/IconButton';
export const CustomSelectClearButton = (_param)=>{
    var { className, onClick } = _param, restProps = _object_without_properties(_param, [
        "className",
        "onClick"
    ]);
    return /*#__PURE__*/ React.createElement(IconButton, _object_spread_props(_object_spread({
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
        }
    }), /*#__PURE__*/ React.createElement(Icon16Cancel, null));
};

//# sourceMappingURL=CustomSelectClearButton.js.map