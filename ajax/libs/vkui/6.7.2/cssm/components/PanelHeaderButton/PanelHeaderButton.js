import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from 'react';
import { classNames, isPrimitiveReactNode } from '@vkontakte/vkjs';
import { usePlatform } from '../../hooks/usePlatform';
import { hasAccessibleName } from '../../lib/accessibility';
import { COMMON_WARNINGS, warnOnce } from '../../lib/warnOnce';
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
    if (platform === 'ios') {
        return /*#__PURE__*/ _jsx(Title, {
            Component: "span",
            level: "3",
            weight: primary ? '1' : '3',
            children: children
        });
    }
    return /*#__PURE__*/ _jsx(Text, {
        weight: platform === 'vkcom' ? undefined : '2',
        children: children
    });
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
        case 'ios':
            hoverMode = 'background';
            activeMode = 'opacity';
            break;
        case 'vkcom':
            hoverMode = styles['PanelHeaderButton--hover'];
            activeMode = styles['PanelHeaderButton--active'];
            break;
        default:
            hoverMode = 'background';
            activeMode = 'background';
    }
    if (process.env.NODE_ENV === 'development') {
        /* istanbul ignore next: проверка в dev mode, тест на hasAccessibleName() есть в lib/accessibility.test.tsx */ const isAccessible = hasAccessibleName({
            children: [
                children,
                label
            ],
            ...restProps
        });
        if (!isAccessible) {
            warn(COMMON_WARNINGS.a11y[restProps.href ? 'link-name' : 'button-name'], 'error');
        }
    }
    return /*#__PURE__*/ _jsxs(Tappable, {
        Component: restProps.href ? 'a' : 'button',
        ...restProps,
        hoverMode: hoverMode,
        activeEffectDelay: 200,
        activeMode: activeMode,
        className: classNames(styles['PanelHeaderButton'], platformClassNames.hasOwnProperty(platform) ? platformClassNames[platform] : platformClassNames.android, isPrimitive && styles['PanelHeaderButton--primitive'], !isPrimitive && !isPrimitiveLabel && styles['PanelHeaderButton--notPrimitive'], className),
        children: [
            isPrimitive ? /*#__PURE__*/ _jsx(ButtonTypography, {
                primary: primary,
                children: children
            }) : children,
            isPrimitiveLabel ? /*#__PURE__*/ _jsx(ButtonTypography, {
                primary: primary,
                className: styles['PanelHeaderButton__label'],
                children: label
            }) : label
        ]
    });
};

//# sourceMappingURL=PanelHeaderButton.js.map