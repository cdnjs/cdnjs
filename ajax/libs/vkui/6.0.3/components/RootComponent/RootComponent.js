import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import * as React from 'react';
import { classNames } from '@vkontakte/vkjs';
/**
 * Базовый корневой компонент.
 */ export const RootComponent = (_param)=>{
    var { Component = 'div', baseClassName, className, getRootRef } = _param, restProps = _object_without_properties(_param, [
        "Component",
        "baseClassName",
        "className",
        "getRootRef"
    ]);
    return /*#__PURE__*/ React.createElement(Component, _object_spread({
        ref: getRootRef,
        className: classNames(baseClassName, className)
    }, restProps));
};

//# sourceMappingURL=RootComponent.js.map