import { jsx as _jsx } from "react/jsx-runtime";
import * as React from 'react';
import { classNames } from '@vkontakte/vkjs';
import { Text } from '../../Typography/Text/Text';
import { usePaginationPageClassNames } from './usePaginationPageClasses';
import styles from './PaginationPage.module.css';
export const PaginationPageEllipsis = ({ className, disabled, ...restProps })=>{
    const paginationClassNames = usePaginationPageClassNames({
        isCurrent: false,
        disabled
    });
    return /*#__PURE__*/ _jsx(Text, {
        className: classNames(paginationClassNames, styles['PaginationPage--type-ellipsis'], className),
        ...restProps,
        children: "…"
    });
};

//# sourceMappingURL=PaginationPageEllipsis.js.map