import { jsx as _jsx } from "react/jsx-runtime";
import * as React from 'react';
import { classNames } from '@vkontakte/vkjs';
import { Footnote } from '../Typography/Footnote/Footnote';
import styles from './Group.module.css';
export const GroupDescription = ({ className, ...restProps })=>/*#__PURE__*/ _jsx(Footnote, {
        className: classNames(className, styles['Group__description']),
        ...restProps
    });
GroupDescription.displayName = 'GroupDescription';

//# sourceMappingURL=GroupDescription.js.map