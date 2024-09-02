import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import { jsx as _jsx } from "react/jsx-runtime";
import * as React from 'react';
import { classNames } from '@vkontakte/vkjs';
import { RootComponent } from '../RootComponent/RootComponent';
import { ScreenSpinnerContext } from './context';
const stateClassNames = {
    cancelable: "vkuiScreenSpinner--state-cancelable",
    done: "vkuiScreenSpinner--state-done",
    error: "vkuiScreenSpinner--state-error"
};
const modeClassNames = {
    shadow: "vkuiScreenSpinner--mode-shadow",
    overlay: "vkuiScreenSpinner--mode-overlay"
};
export const ScreenSpinnerContainer = (_param)=>{
    var { state = 'loading', mode = 'shadow' } = _param, restProps = _object_without_properties(_param, [
        "state",
        "mode"
    ]);
    return /*#__PURE__*/ _jsx(ScreenSpinnerContext.Provider, {
        value: {
            state
        },
        children: /*#__PURE__*/ _jsx(RootComponent, _object_spread({
            baseClassName: classNames("vkuiScreenSpinner", modeClassNames[mode], state !== 'loading' && stateClassNames[state])
        }, restProps))
    });
};
ScreenSpinnerContainer.displayName = 'ScreenSpinnerContainer';

//# sourceMappingURL=ScreenSpinnerContainer.js.map