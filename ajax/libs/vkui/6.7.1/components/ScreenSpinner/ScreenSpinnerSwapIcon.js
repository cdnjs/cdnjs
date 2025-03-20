import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import { jsx as _jsx } from "react/jsx-runtime";
import * as React from 'react';
import { Icon24Cancel } from '@vkontakte/icons';
import { mergeCalls } from '../../lib/mergeCalls';
import { clickByKeyboardHandler } from '../../lib/utils';
import { RootComponent } from '../RootComponent/RootComponent';
import { Icon48CancelCircle } from './Icon48CancelCircle';
import { Icon48DoneOutline } from './Icon48DoneOutline';
import { ScreenSpinnerContext } from './context';
const ScreenSpinnerCancelIcon = (_param)=>{
    var { onKeyDown, 'aria-label': ariaLabel = 'Отменить' } = _param, restProps = _object_without_properties(_param, [
        "onKeyDown",
        'aria-label'
    ]);
    const handlers = mergeCalls({
        onKeyDown: clickByKeyboardHandler
    }, {
        onKeyDown
    });
    let clickableProps = _object_spread_props(_object_spread({}, handlers), {
        'tabIndex': 0,
        'role': 'button',
        'aria-label': ariaLabel
    });
    return /*#__PURE__*/ _jsx(RootComponent, _object_spread_props(_object_spread({
        baseClassName: "vkuiScreenSpinner__icon"
    }, clickableProps, restProps), {
        children: /*#__PURE__*/ _jsx(Icon24Cancel, {})
    }));
};
ScreenSpinnerCancelIcon.displayName = 'ScreenSpinnerCancelIcon';
export const ScreenSpinnerSwapIcon = (_param)=>{
    var { cancelLabel } = _param, restProps = _object_without_properties(_param, [
        "cancelLabel"
    ]);
    const { state } = React.useContext(ScreenSpinnerContext);
    if (state === 'cancelable') {
        return /*#__PURE__*/ _jsx(ScreenSpinnerCancelIcon, _object_spread({
            "aria-label": cancelLabel
        }, restProps));
    }
    const Icon = {
        loading: ()=>null,
        done: Icon48DoneOutline,
        error: Icon48CancelCircle
    }[state];
    return /*#__PURE__*/ _jsx(RootComponent, _object_spread_props(_object_spread({
        baseClassName: "vkuiScreenSpinner__icon"
    }, restProps), {
        children: /*#__PURE__*/ _jsx(Icon, {})
    }));
};
ScreenSpinnerSwapIcon.displayName = 'ScreenSpinnerSwapIcon';

//# sourceMappingURL=ScreenSpinnerSwapIcon.js.map