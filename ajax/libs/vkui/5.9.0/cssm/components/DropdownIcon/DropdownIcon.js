import * as React from 'react';
import { Icon20ChevronUp, Icon20Dropdown, Icon24ChevronDown, Icon24ChevronUp } from '@vkontakte/icons';
import { classNames } from '@vkontakte/vkjs';
import { useAdaptivityConditionalRender } from '../../hooks/useAdaptivityConditionalRender';
export const DropdownIcon = ({ opened = false, className, ...restProps })=>{
    const { sizeY } = useAdaptivityConditionalRender();
    const IconCompact = opened ? Icon20ChevronUp : Icon20Dropdown;
    const IconRegular = opened ? Icon24ChevronUp : Icon24ChevronDown;
    return /*#__PURE__*/ React.createElement(React.Fragment, null, sizeY.compact && /*#__PURE__*/ React.createElement(IconCompact, {
        className: classNames(sizeY.compact.className, className),
        ...restProps
    }), sizeY.regular && /*#__PURE__*/ React.createElement(IconRegular, {
        className: classNames(sizeY.regular.className, className),
        ...restProps
    }));
};

//# sourceMappingURL=DropdownIcon.js.map