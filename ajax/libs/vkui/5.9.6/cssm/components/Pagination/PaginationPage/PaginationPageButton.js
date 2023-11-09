import * as React from 'react';
import { classNames } from '@vkontakte/vkjs';
import { Tappable } from '../../Tappable/Tappable';
import { Text } from '../../Typography/Text/Text';
import { getPageAriaLabelDefault } from '../utils';
import { usePaginationPageClassNames } from './usePaginationPageClasses';
import styles from './PaginationPage.module.css';
export const PaginationPageButton = ({ isCurrent = false, getPageAriaLabel = getPageAriaLabelDefault, children, className, disabled, ...restProps })=>{
    const paginationClassNames = usePaginationPageClassNames({
        isCurrent,
        disabled
    });
    return /*#__PURE__*/ React.createElement(Tappable, {
        className: classNames(paginationClassNames, className),
        activeMode: styles['PaginationPage--state-active'],
        hoverMode: styles['PaginationPage--state-hover'],
        hasActive: !isCurrent,
        hasHover: !isCurrent,
        focusVisibleMode: "outside",
        "data-page": children,
        "aria-current": isCurrent ? true : undefined,
        "aria-label": getPageAriaLabel(children, isCurrent),
        disabled: disabled,
        ...restProps
    }, /*#__PURE__*/ React.createElement(Text, {
        normalize: false
    }, children));
};

//# sourceMappingURL=PaginationPageButton.js.map