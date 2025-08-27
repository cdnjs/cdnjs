import { jsx as _jsx } from "react/jsx-runtime";
import * as React from "react";
import { classNames } from "@vkontakte/vkjs";
import { Banner } from "../Banner/Banner.js";
import styles from "./FormStatus.module.css";
/**
 * @see https://vkui.io/components/form-status
 */ export const FormStatus = ({ mode, children, className, role = mode === 'error' ? 'alert' : 'status', title, ...restProps })=>{
    return /*#__PURE__*/ _jsx(Banner, {
        ...restProps,
        title: title,
        role: role,
        subtitle: children,
        className: classNames('vkuiInternalFormStatus', mode === 'error' && classNames(styles.modeError, 'vkuiInternalFormStatus--mode-error'), className)
    });
};

//# sourceMappingURL=FormStatus.js.map