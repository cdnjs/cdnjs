import * as React from 'react';
import { classNames } from '@vkontakte/vkjs';
import { clamp } from '../../helpers/math';
import { RootComponent } from '../RootComponent/RootComponent';
import styles from './Progress.module.css';
const stylesAppearance = {
    accent: styles['Progress--appearance-accent'],
    positive: styles['Progress--appearance-positive'],
    negative: styles['Progress--appearance-negative']
};
function progressCustomHeightStyle(height) {
    return height ? {
        height,
        borderRadius: height / 2
    } : undefined;
}
function progressStyle(height, styleProps) {
    const styleHeight = progressCustomHeightStyle(height);
    const style = styleHeight ? {
        ...styleProps,
        ...styleHeight
    } : styleProps;
    return style;
}
const PROGRESS_MIN_VALUE = 0;
const PROGRESS_MAX_VALUE = 100;
/**
 * @see https://vkcom.github.io/VKUI/#/Progress
 */ export const Progress = ({ value = 0, appearance = 'accent', height, style: styleProps, ...restProps })=>{
    const progress = clamp(value, PROGRESS_MIN_VALUE, PROGRESS_MAX_VALUE);
    const title = `${progress} / ${PROGRESS_MAX_VALUE}`;
    const style = progressStyle(height, styleProps);
    return /*#__PURE__*/ React.createElement(RootComponent, {
        "aria-valuenow": value,
        title: title,
        style: style,
        ...restProps,
        role: "progressbar",
        "aria-valuemin": PROGRESS_MIN_VALUE,
        "aria-valuemax": PROGRESS_MAX_VALUE,
        baseClassName: classNames(styles['Progress'], stylesAppearance[appearance])
    }, /*#__PURE__*/ React.createElement("div", {
        className: styles['Progress__in'],
        style: {
            width: `${progress}%`
        }
    }));
};

//# sourceMappingURL=Progress.js.map