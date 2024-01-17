import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import * as React from 'react';
import { classNames } from '@vkontakte/vkjs';
import { useAdaptivityWithJSMediaQueries } from '../../hooks/useAdaptivityWithJSMediaQueries';
import { usePlatform } from '../../hooks/usePlatform';
import { FocusTrap } from '../FocusTrap/FocusTrap';
const stopPropagation = (e)=>e.stopPropagation();
export const ActionSheetDropdownSheet = (_param)=>{
    var { children, closing, // these 2 props are only omitted - ActionSheetDesktop compat
    toggleRef, className } = _param, restProps = _object_without_properties(_param, [
        "children",
        "closing",
        "toggleRef",
        "className"
    ]);
    const { sizeY } = useAdaptivityWithJSMediaQueries();
    const platform = usePlatform();
    return /*#__PURE__*/ React.createElement(FocusTrap, _object_spread_props(_object_spread({}, restProps), {
        onClick: stopPropagation,
        className: classNames("vkuiActionSheet", platform === 'ios' && "vkuiActionSheet--ios", closing && "vkuiActionSheet--closing", sizeY === 'compact' && "vkuiActionSheet--sizeY-compact", className)
    }), children);
};

//# sourceMappingURL=ActionSheetDropdownSheet.js.map