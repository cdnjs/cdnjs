import * as React from 'react';
import { classNames } from '@vkontakte/vkjs';
import { Tappable } from '../../Tappable/Tappable';
import { Text } from '../../Typography/Text/Text';
import { VisuallyHidden } from '../../VisuallyHidden/VisuallyHidden';
import { getPageLabelDefault } from '../utils';
import { usePaginationPageClassNames } from './usePaginationPageClasses';
import styles from './PaginationPage.module.css';
export const PaginationPageButton = ({ isCurrent = false, getPageLabel = getPageLabelDefault, children, className, disabled, ...restProps })=>{
    const paginationClassNames = usePaginationPageClassNames({
        isCurrent,
        disabled
    });
    return /*#__PURE__*/ React.createElement(Tappable, {
        className: classNames(paginationClassNames, className),
        activeMode: styles['PaginationPage--state-active'],
        hoverMode: styles['PaginationPage--state-hover'],
        focusVisibleMode: "outside",
        "data-page": children,
        "aria-current": isCurrent ? true : undefined,
        disabled: disabled,
        ...restProps
    }, /*#__PURE__*/ React.createElement(Text, {
        normalize: false
    }, /*#__PURE__*/ React.createElement(VisuallyHidden, null, getPageLabel(isCurrent), " "), children));
};

//# sourceMappingURL=PaginationPageButton.js.map