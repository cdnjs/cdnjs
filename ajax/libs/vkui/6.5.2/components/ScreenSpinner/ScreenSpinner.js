import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from 'react';
import { Icon24Cancel } from '@vkontakte/icons';
import { classNames } from '@vkontakte/vkjs';
import { mergeCalls } from '../../lib/mergeCalls';
import { clickByKeyboardHandler } from '../../lib/utils';
import { useScrollLock } from '../AppRoot/ScrollContext';
import { PopoutWrapper } from '../PopoutWrapper/PopoutWrapper';
import { RootComponent } from '../RootComponent/RootComponent';
import { Spinner } from '../Spinner/Spinner';
import { Icon48CancelCircle } from './Icon48CancelCircle';
import { Icon48DoneOutline } from './Icon48DoneOutline';
export const ScreenSpinnerContext = /*#__PURE__*/ React.createContext({
    state: 'loading'
});
const stateClassNames = {
    cancelable: "vkuiScreenSpinner--state-cancelable",
    done: "vkuiScreenSpinner--state-done",
    error: "vkuiScreenSpinner--state-error"
};
const ScreenSpinnerLoader = (_param)=>{
    var { size = 'large', children = 'Пожалуйста, подождите...' } = _param, restProps = _object_without_properties(_param, [
        "size",
        "children"
    ]);
    return /*#__PURE__*/ _jsx(Spinner, _object_spread_props(_object_spread({
        className: "vkuiScreenSpinner__spinner",
        size: size
    }, restProps), {
        children: children
    }));
};
ScreenSpinnerLoader.displayName = 'ScreenSpinner.Loader';
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
const ScreenSpinnerSwapIcon = (_param)=>{
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
ScreenSpinnerSwapIcon.displayName = 'ScreenSpinner.SwapIcon';
const ScreenSpinnerContainer = (_param)=>{
    var { state = 'loading' } = _param, restProps = _object_without_properties(_param, [
        "state"
    ]);
    return /*#__PURE__*/ _jsx(ScreenSpinnerContext.Provider, {
        value: {
            state
        },
        children: /*#__PURE__*/ _jsx(RootComponent, _object_spread({
            baseClassName: classNames("vkuiScreenSpinner", state !== 'loading' && stateClassNames[state])
        }, restProps))
    });
};
ScreenSpinnerContainer.displayName = 'ScreenSpinner.Container';
/**
 * @see https://vkcom.github.io/VKUI/#/ScreenSpinner
 */ export const ScreenSpinner = (_param)=>{
    var { style, className, state = 'loading', onClick, cancelLabel } = _param, restProps = _object_without_properties(_param, [
        "style",
        "className",
        "state",
        "onClick",
        "cancelLabel"
    ]);
    useScrollLock();
    return /*#__PURE__*/ _jsx(PopoutWrapper, {
        className: className,
        style: style,
        noBackground: true,
        children: /*#__PURE__*/ _jsxs(ScreenSpinnerContainer, {
            state: state,
            children: [
                /*#__PURE__*/ _jsx(ScreenSpinnerLoader, _object_spread({}, restProps)),
                /*#__PURE__*/ _jsx(ScreenSpinnerSwapIcon, {
                    onClick: onClick,
                    cancelLabel: cancelLabel
                })
            ]
        })
    });
};
ScreenSpinner.displayName = 'ScreenSpinner';
ScreenSpinner.Container = ScreenSpinnerContainer;
ScreenSpinner.Container.displayName = 'ScreenSpinner.Container';
ScreenSpinner.Loader = ScreenSpinnerLoader;
ScreenSpinner.Loader.displayName = 'ScreenSpinner.Loader';
ScreenSpinner.SwapIcon = ScreenSpinnerSwapIcon;
ScreenSpinner.SwapIcon.displayName = 'ScreenSpinner.SwapIcon';

//# sourceMappingURL=ScreenSpinner.js.map