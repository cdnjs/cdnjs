import * as React from 'react';
import { classNames } from '@vkontakte/vkjs';
/**
 * Базовый корневой компонент.
 */ export const RootComponent = ({ Component = 'div', baseClassName, className, getRootRef, ...restProps })=>/*#__PURE__*/ React.createElement(Component, {
        ref: getRootRef,
        className: classNames(baseClassName, className),
        ...restProps
    });

//# sourceMappingURL=RootComponent.js.map