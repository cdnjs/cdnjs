import { jsx as _jsx } from "react/jsx-runtime";
import * as React from 'react';
import { RootComponent } from '../RootComponent/RootComponent';
import styles from './Mark.module.css';
/**
 * Компонент используется для выделения фрагментов текста,
 * например при поиске определенных слов или выделения текста в цитате.
 *
 * @since 6.1.0
 * @see https://vkcom.github.io/VKUI/#/Mark
 */ export const Mark = (props)=>/*#__PURE__*/ _jsx(RootComponent, {
        baseClassName: styles['Mark'],
        Component: "mark",
        ...props
    });

//# sourceMappingURL=Mark.js.map