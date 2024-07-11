import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Icon24Cancel } from '@vkontakte/icons';
import { classNames } from '@vkontakte/vkjs';
import { useScrollLock } from '../AppRoot/ScrollContext';
import { PopoutWrapper } from '../PopoutWrapper/PopoutWrapper';
import { Spinner } from '../Spinner/Spinner';
import { Icon48CancelCircle } from './Icon48CancelCircle';
import { Icon48DoneOutline } from './Icon48DoneOutline';
/**
 * @see https://vkcom.github.io/VKUI/#/ScreenSpinner
 */ export const ScreenSpinner = (_param)=>{
    var { style, className, state = 'loading', size = 'large', onClick, children = 'Пожалуйста, подождите...' } = _param, restProps = _object_without_properties(_param, [
        "style",
        "className",
        "state",
        "size",
        "onClick",
        "children"
    ]);
    const hideSpinner = state === 'done' || state === 'error';
    const Icon = {
        loading: ()=>null,
        cancelable: Icon24Cancel,
        done: Icon48DoneOutline,
        error: Icon48CancelCircle
    }[state];
    useScrollLock();
    return /*#__PURE__*/ _jsx(PopoutWrapper, {
        noBackground: true,
        className: classNames("vkuiScreenSpinner", state === 'cancelable' && "vkuiScreenSpinner--clickable", className),
        style: style,
        children: /*#__PURE__*/ _jsxs("div", {
            className: "vkuiScreenSpinner__container",
            onClick: onClick,
            children: [
                /*#__PURE__*/ _jsx(Spinner, _object_spread_props(_object_spread({
                    className: classNames("vkuiScreenSpinner__spinner", hideSpinner && "vkuiScreenSpinner__spinner--hidden"),
                    size: size
                }, restProps), {
                    children: children
                })),
                /*#__PURE__*/ _jsx("div", {
                    className: classNames("vkuiScreenSpinner__icon", state === 'done' && "vkuiScreenSpinner__icon--state-done"),
                    children: /*#__PURE__*/ _jsx(Icon, {})
                })
            ]
        })
    });
};

//# sourceMappingURL=ScreenSpinner.js.map