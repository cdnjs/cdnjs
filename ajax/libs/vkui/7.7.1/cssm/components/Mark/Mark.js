import { jsx as _jsx } from "react/jsx-runtime";
import * as React from "react";
import { RootComponent } from "../RootComponent/RootComponent.js";
import styles from "./Mark.module.css";
/**
 * Компонент используется для выделения фрагментов текста,
 * например при поиске определенных слов или выделения текста в цитате.
 *
 * @since 6.1.0
 * @see https://vkui.io/components/mark
 */ export const Mark = (props)=>/*#__PURE__*/ _jsx(RootComponent, {
        baseClassName: styles.host,
        Component: "mark",
        ...props
    });

//# sourceMappingURL=Mark.js.map