import { jsx as _jsx } from "react/jsx-runtime";
import * as React from "react";
import { classNames } from "@vkontakte/vkjs";
import { RootComponent } from "../RootComponent/RootComponent.js";
import styles from "./RadioGroup.module.css";
/**
 * @see https://vkcom.github.io/VKUI/#/RadioGroup
 */ export const RadioGroup = ({ mode = 'vertical', ...restProps })=>/*#__PURE__*/ _jsx(RootComponent, {
        baseClassName: classNames(styles.host, 'vkuiInternalRadioGroup', mode === 'horizontal' && styles.modeHorizontal),
        role: "radiogroup",
        ...restProps
    });

//# sourceMappingURL=RadioGroup.js.map