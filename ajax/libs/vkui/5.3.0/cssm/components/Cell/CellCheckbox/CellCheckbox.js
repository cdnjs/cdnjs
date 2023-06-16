import * as React from 'react';
import { Icon24CheckBoxOff, Icon24CheckBoxOn, Icon24CheckCircleOff, Icon24CheckCircleOn } from '@vkontakte/icons';
import { classNames } from '@vkontakte/vkjs';
import { usePlatform } from '../../../hooks/usePlatform';
import { Platform } from '../../../lib/platform';
import { VisuallyHiddenInput } from '../../VisuallyHiddenInput/VisuallyHiddenInput';
import styles from './CellCheckbox.module.css';
export const CellCheckbox = ({ className , style , ...restProps })=>{
    const platform = usePlatform();
    const IconOff = platform === Platform.IOS || platform === Platform.VKCOM ? Icon24CheckCircleOff : Icon24CheckBoxOff;
    const IconOn = platform === Platform.IOS || platform === Platform.VKCOM ? Icon24CheckCircleOn : Icon24CheckBoxOn;
    return /*#__PURE__*/ React.createElement("span", {
        className: className,
        style: style
    }, /*#__PURE__*/ React.createElement(VisuallyHiddenInput, {
        className: styles['CellCheckbox__input'],
        type: "checkbox",
        ...restProps
    }), /*#__PURE__*/ React.createElement("span", {
        className: classNames(styles['CellCheckbox__icon'], styles['CellCheckbox__icon--off']),
        "aria-hidden": true
    }, /*#__PURE__*/ React.createElement(IconOff, null)), /*#__PURE__*/ React.createElement("span", {
        className: classNames(styles['CellCheckbox__icon'], styles['CellCheckbox__icon--on']),
        "aria-hidden": true
    }, /*#__PURE__*/ React.createElement(IconOn, null)));
};

//# sourceMappingURL=CellCheckbox.js.map