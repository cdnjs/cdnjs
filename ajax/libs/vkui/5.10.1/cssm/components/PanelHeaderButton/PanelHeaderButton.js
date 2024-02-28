import * as React from 'react';
import { classNames, isPrimitiveReactNode } from '@vkontakte/vkjs';
import { usePlatform } from '../../hooks/usePlatform';
import { Platform } from '../../lib/platform';
import { getTitleFromChildren } from '../../lib/utils';
import { warnOnce } from '../../lib/warnOnce';
import { Tappable } from '../Tappable/Tappable';
import { Text } from '../Typography/Text/Text';
import { Title } from '../Typography/Title/Title';
import styles from './PanelHeaderButton.module.css';
const platformClassNames = {
    ios: styles['PanelHeaderButton--ios'],
    android: styles['PanelHeaderButton--android'],
    vkcom: styles['PanelHeaderButton--vkcom']
};
const ButtonTypography = ({ primary, children })=>{
    const platform = usePlatform();
    if (platform === Platform.IOS) {
        return /*#__PURE__*/ React.createElement(Title, {
            Component: "span",
            level: "3",
            weight: primary ? '1' : '3'
        }, children);
    }
    return /*#__PURE__*/ React.createElement(Text, {
        weight: platform === Platform.VKCOM ? undefined : '2'
    }, children);
};
const warn = warnOnce('PanelHeaderButton');
/**
 * @see https://vkcom.github.io/VKUI/#/PanelHeaderButton
 */ export const PanelHeaderButton = ({ children, primary = false, label, className, ...restProps })=>{
    const isPrimitive = isPrimitiveReactNode(children);
    const isPrimitiveLabel = isPrimitiveReactNode(label);
    const platform = usePlatform();
    let hoverMode;
    let activeMode;
    switch(platform){
        case Platform.IOS:
            hoverMode = 'opacity';
            activeMode = 'opacity';
            break;
        case Platform.VKCOM:
            hoverMode = styles['PanelHeaderButton--hover'];
            activeMode = styles['PanelHeaderButton--active'];
            break;
        default:
            hoverMode = 'background';
            activeMode = 'background';
    }
    if (process.env.NODE_ENV === 'development') {
        const hasAccessibleName = Boolean(getTitleFromChildren(children) || getTitleFromChildren(label) || restProps['aria-label'] || restProps['aria-labelledby']);
        if (!hasAccessibleName) {
            warn('a11y: У кнопки нет названия, которое может прочитать скринридер, и она недоступна для части пользователей. Замените содержимое на текст или добавьте описание действия с помощью пропа aria-label.', 'error');
        }
    }
    return /*#__PURE__*/ React.createElement(Tappable, {
        Component: restProps.href ? 'a' : 'button',
        ...restProps,
        hoverMode: hoverMode,
        activeEffectDelay: 200,
        activeMode: activeMode,
        className: classNames('vkuiInternalPanelHeaderButton', styles['PanelHeaderButton'], platformClassNames.hasOwnProperty(platform) ? platformClassNames[platform] : platformClassNames.android, isPrimitive && styles['PanelHeaderButton--primitive'], !isPrimitive && !isPrimitiveLabel && styles['PanelHeaderButton--notPrimitive'], className)
    }, isPrimitive ? /*#__PURE__*/ React.createElement(ButtonTypography, {
        primary: primary
    }, children) : children, isPrimitiveLabel ? /*#__PURE__*/ React.createElement(ButtonTypography, {
        primary: primary,
        className: styles['PanelHeaderButton__label']
    }, label) : label);
};

//# sourceMappingURL=PanelHeaderButton.js.map