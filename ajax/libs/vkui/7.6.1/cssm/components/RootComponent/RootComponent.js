import { jsx as _jsx } from "react/jsx-runtime";
import * as React from "react";
import { classNames } from "@vkontakte/vkjs";
import { mergeStyle } from "../../helpers/mergeStyle.js";
import styles from "./RootComponent.module.css";
/**
 * Базовый корневой компонент.
 */ export const RootComponent = ({ Component = 'div', baseClassName, className, baseStyle, style, getRootRef, ...restProps })=>/*#__PURE__*/ _jsx(Component, {
        ref: getRootRef,
        className: classNames(className, baseClassName, styles.host, restProps.hidden === true && styles.hidden),
        style: mergeStyle(baseStyle, style),
        ...restProps
    });

//# sourceMappingURL=RootComponent.js.map