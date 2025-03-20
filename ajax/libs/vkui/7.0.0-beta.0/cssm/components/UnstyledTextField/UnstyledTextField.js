import { jsx as _jsx } from "react/jsx-runtime";
import * as React from "react";
import { classNames } from "@vkontakte/vkjs";
import { Text } from "../Typography/Text/Text.js";
import styles from "./UnstyledTextField.module.css";
/**
 * Компонент сбрасывает [User-agent stylesheets](https://www.geeksforgeeks.org/what-is-a-user-agent-stylesheet/)
 * полей ввода.
 *
 * Используется в <a href="?path=/story/forms-input--playground" data-prod-href="https://vkcom.github.io/VKUI/playground/?path=/story/forms-input--playground">Input</a> и <a href="?path=/story/forms-textarea--playground" data-prod-href="https://vkcom.github.io/VKUI/playground/?path=/story/forms-textarea--playground">Textarea</a>.
 *
 * @since 6.1.0
 */ export const UnstyledTextField = ({ as, noPadding = false, className, ...restProps })=>/*#__PURE__*/ _jsx(Text, {
        Component: as,
        normalize: false,
        className: classNames(styles.host, noPadding && styles.noPadding, className),
        ...restProps
    });

//# sourceMappingURL=UnstyledTextField.js.map