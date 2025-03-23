import { jsx as _jsx } from "react/jsx-runtime";
import * as React from 'react';
import { classNames } from '@vkontakte/vkjs';
import styles from './RootComponent.module.css';
/**
 * Базовый корневой компонент.
 */ export const RootComponent = ({ Component = 'div', baseClassName, className, getRootRef, ...restProps })=>/*#__PURE__*/ _jsx(Component, {
        ref: getRootRef,
        className: classNames(className, baseClassName, styles['RootComponent'], restProps.hidden === true && styles['RootComponent--hidden']),
        ...restProps
    });

//# sourceMappingURL=RootComponent.js.map