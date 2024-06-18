import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import * as React from 'react';
import { classNames } from '@vkontakte/vkjs';
import { clamp } from '../../helpers/math';
import { RootComponent } from '../RootComponent/RootComponent';
const stylesAppearance = {
    accent: "vkuiProgress--appearance-accent",
    positive: "vkuiProgress--appearance-positive",
    negative: "vkuiProgress--appearance-negative"
};
function progressCustomHeightStyle(height) {
    return height ? {
        height,
        borderRadius: height / 2
    } : undefined;
}
function progressStyle(height, styleProps) {
    const styleHeight = progressCustomHeightStyle(height);
    const style = styleHeight ? _object_spread({}, styleProps, styleHeight) : styleProps;
    return style;
}
const PROGRESS_MIN_VALUE = 0;
const PROGRESS_MAX_VALUE = 100;
/**
 * @see https://vkcom.github.io/VKUI/#/Progress
 */ export const Progress = (_param)=>{
    var { value = 0, appearance = 'accent', height, style: styleProps } = _param, restProps = _object_without_properties(_param, [
        "value",
        "appearance",
        "height",
        "style"
    ]);
    const progress = clamp(value, PROGRESS_MIN_VALUE, PROGRESS_MAX_VALUE);
    const title = `${progress} / ${PROGRESS_MAX_VALUE}`;
    const style = progressStyle(height, styleProps);
    return /*#__PURE__*/ React.createElement(RootComponent, _object_spread_props(_object_spread({
        "aria-valuenow": value,
        title: title,
        style: style
    }, restProps), {
        role: "progressbar",
        "aria-valuemin": PROGRESS_MIN_VALUE,
        "aria-valuemax": PROGRESS_MAX_VALUE,
        baseClassName: classNames("vkuiProgress", stylesAppearance[appearance])
    }), /*#__PURE__*/ React.createElement("div", {
        className: "vkuiProgress__in",
        style: {
            width: `${progress}%`
        }
    }));
};

//# sourceMappingURL=Progress.js.map