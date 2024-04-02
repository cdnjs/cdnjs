import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import * as React from 'react';
import { Icon20Cancel } from '@vkontakte/icons';
import { classNames } from '@vkontakte/vkjs';
import { Tappable } from '../Tappable/Tappable';
import { VisuallyHidden } from '../VisuallyHidden/VisuallyHidden';
/**
 * @see https://vkcom.github.io/VKUI/#/ModalDismissButton
 */ export const ModalDismissButton = (_param)=>{
    var { children = 'Закрыть', className } = _param, restProps = _object_without_properties(_param, [
        "children",
        "className"
    ]);
    return /*#__PURE__*/ React.createElement(Tappable, _object_spread_props(_object_spread({
        className: classNames("vkuiModalDismissButton", className)
    }, restProps), {
        activeMode: "vkuiModalDismissButton--active",
        hoverMode: "vkuiModalDismissButton--hover"
    }), children && /*#__PURE__*/ React.createElement(VisuallyHidden, null, children), /*#__PURE__*/ React.createElement(Icon20Cancel, null));
};

//# sourceMappingURL=ModalDismissButton.js.map