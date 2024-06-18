import * as React from 'react';
import { Icon16Cancel } from '@vkontakte/icons';
import { stopPropagation } from '../../lib/utils';
import { IconButton } from '../IconButton/IconButton';
export const CustomSelectClearButton = ({ className, onClick, ...restProps })=>{
    return /*#__PURE__*/ React.createElement(IconButton, {
        Component: "button",
        label: "Очистить поле",
        onKeyDown: stopPropagation,
        type: "button",
        activeMode: "opacity",
        hoverMode: "opacity",
        ...restProps,
        className: className,
        onClick: (e)=>{
            stopPropagation(e);
            e.preventDefault();
            onClick();
        }
    }, /*#__PURE__*/ React.createElement(Icon16Cancel, null));
};

//# sourceMappingURL=CustomSelectClearButton.js.map