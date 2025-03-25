import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from 'react';
import { classNames } from '@vkontakte/vkjs';
import { Subhead } from '../../Typography/Subhead/Subhead';
import { FormItemContext } from '../context';
import styles from '../FormItem.module.css';
/**
 * Отвечает за отрисовку заголовка поля. По умолчанию компонент представлен тегом `label`, если передано свойство `htmlFor`.
 * Можно переопределить через свойство `Component`.
 *
 * @since 6.1.0
 *
 */ export const FormItemTopLabel = ({ children, Component: componentProp, htmlFor, multiline, ...restProps })=>{
    const component = componentProp || htmlFor && 'label' || 'span';
    const { required, topMultiline: multilineContext } = React.useContext(FormItemContext);
    return /*#__PURE__*/ _jsxs(Subhead, {
        className: classNames(styles['FormItemTop__label'], (multiline ?? multilineContext) && styles['FormItemTop__label--multiline']),
        Component: component,
        htmlFor: htmlFor,
        ...restProps,
        children: [
            children,
            required && /*#__PURE__*/ _jsx("span", {
                className: styles['FormItemTop__label--required'],
                "aria-hidden": true,
                children: "*"
            })
        ]
    });
};
FormItemTopLabel.displayName = 'FormItemTopLabel';

//# sourceMappingURL=FormItemTopLabel.js.map