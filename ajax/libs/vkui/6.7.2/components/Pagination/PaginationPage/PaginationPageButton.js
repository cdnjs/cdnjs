import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from 'react';
import { classNames } from '@vkontakte/vkjs';
import { Tappable } from '../../Tappable/Tappable';
import { Text } from '../../Typography/Text/Text';
import { VisuallyHidden } from '../../VisuallyHidden/VisuallyHidden';
import { getPageLabelDefault } from '../utils';
import { getPaginationPageClassNames } from './usePaginationPageClasses';
const getTappablePropsFromPaginationPage = (opts)=>{
    const { isCurrent = false, getPageLabel = getPageLabelDefault, children, className, disabled, sizeY } = opts, restProps = _object_without_properties(opts, [
        "isCurrent",
        "getPageLabel",
        "children",
        "className",
        "disabled",
        "sizeY"
    ]);
    const pageClassNames = getPaginationPageClassNames({
        isCurrent,
        disabled,
        sizeY
    });
    return _object_spread({
        'className': classNames(pageClassNames, className),
        'activeMode': "vkuiPaginationPage--state-active",
        'hoverMode': "vkuiPaginationPage--state-hover",
        'focusVisibleMode': 'outside',
        'aria-current': isCurrent ? true : undefined,
        'disabled': disabled,
        'children': /*#__PURE__*/ _jsxs(Text, {
            normalize: false,
            children: [
                /*#__PURE__*/ _jsxs(VisuallyHidden, {
                    children: [
                        getPageLabel(isCurrent),
                        " "
                    ]
                }),
                children
            ]
        }),
        'data-page': children
    }, restProps);
};
export const PaginationPageButton = (_param)=>{
    var { renderPageButton } = _param, restProps = _object_without_properties(_param, [
        "renderPageButton"
    ]);
    const tappableProps = getTappablePropsFromPaginationPage(restProps);
    if (typeof renderPageButton === 'function') {
        return renderPageButton(tappableProps);
    }
    return /*#__PURE__*/ _jsx(Tappable, _object_spread({}, tappableProps));
};

//# sourceMappingURL=PaginationPageButton.js.map