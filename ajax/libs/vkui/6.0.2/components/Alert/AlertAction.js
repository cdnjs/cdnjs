import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import * as React from 'react';
import { classNames } from '@vkontakte/vkjs';
import { usePlatform } from '../../hooks/usePlatform';
import { Button } from '../Button/Button';
import { Tappable } from '../Tappable/Tappable';
const AlertActionIos = (_param)=>{
    var { mode } = _param, restProps = _object_without_properties(_param, [
        "mode"
    ]);
    return /*#__PURE__*/ React.createElement(Tappable, _object_spread({
        Component: restProps.href ? 'a' : 'button',
        className: classNames("vkuiAlert__action", mode === 'destructive' && "vkuiAlert__action--mode-destructive", mode === 'cancel' && "vkuiAlert__action--mode-cancel")
    }, restProps));
};
const AlertActionBase = (_param)=>{
    var { mode } = _param, restProps = _object_without_properties(_param, [
        "mode"
    ]);
    const platform = usePlatform();
    let buttonMode = 'tertiary';
    if (platform === 'vkcom') {
        buttonMode = mode === 'cancel' ? 'secondary' : 'primary';
    }
    return /*#__PURE__*/ React.createElement(Button, _object_spread({
        className: classNames("vkuiAlert__button", mode === 'cancel' && "vkuiAlert__button--mode-cancel"),
        mode: buttonMode,
        size: "m"
    }, restProps));
};
export const AlertAction = (props)=>{
    const platform = usePlatform();
    if (platform === 'ios') {
        return /*#__PURE__*/ React.createElement(AlertActionIos, props);
    }
    return /*#__PURE__*/ React.createElement(AlertActionBase, props);
};

//# sourceMappingURL=AlertAction.js.map