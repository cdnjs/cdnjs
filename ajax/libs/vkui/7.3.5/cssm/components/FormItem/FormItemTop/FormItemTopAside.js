import { jsx as _jsx } from "react/jsx-runtime";
import * as React from "react";
import { Subhead } from "../../Typography/Subhead/Subhead.js";
import styles from "../FormItem.module.css";
/**
 * Отвечает за отрисовку дополнительного контента справа от заголовка поля.
 *
 * @since 6.1.0
 *
 */ export const FormItemTopAside = ({ children, ...restProps })=>{
    return /*#__PURE__*/ _jsx(Subhead, {
        className: styles.aside,
        ...restProps,
        children: children
    });
};

//# sourceMappingURL=FormItemTopAside.js.map