import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import * as React from 'react';
import { classNames } from '@vkontakte/vkjs';
import { Tappable } from '../../Tappable/Tappable';
import { Text } from '../../Typography/Text/Text';
import { VisuallyHidden } from '../../VisuallyHidden/VisuallyHidden';
import { getPageLabelDefault } from '../utils';
import { usePaginationPageClassNames } from './usePaginationPageClasses';
export const PaginationPageButton = (_param)=>{
    var { isCurrent = false, getPageLabel = getPageLabelDefault, children, className, disabled } = _param, restProps = _object_without_properties(_param, [
        "isCurrent",
        "getPageLabel",
        "children",
        "className",
        "disabled"
    ]);
    const paginationClassNames = usePaginationPageClassNames({
        isCurrent,
        disabled
    });
    return /*#__PURE__*/ React.createElement(Tappable, _object_spread({
        className: classNames(paginationClassNames, className),
        activeMode: "vkuiPaginationPage--state-active",
        hoverMode: "vkuiPaginationPage--state-hover",
        focusVisibleMode: "outside",
        "data-page": children,
        "aria-current": isCurrent ? true : undefined,
        disabled: disabled
    }, restProps), /*#__PURE__*/ React.createElement(Text, {
        normalize: false
    }, /*#__PURE__*/ React.createElement(VisuallyHidden, null, getPageLabel(isCurrent), " "), children));
};

//# sourceMappingURL=PaginationPageButton.js.map