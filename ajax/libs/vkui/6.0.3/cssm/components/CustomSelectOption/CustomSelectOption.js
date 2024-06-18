import * as React from 'react';
import { Icon16Done } from '@vkontakte/icons';
import { classNames, hasReactNode } from '@vkontakte/vkjs';
import { useAdaptivity } from '../../hooks/useAdaptivity';
import { Footnote } from '../Typography/Footnote/Footnote';
import { Paragraph } from '../Typography/Paragraph/Paragraph';
import { VisuallyHidden } from '../VisuallyHidden/VisuallyHidden';
import styles from './CustomSelectOption.module.css';
const sizeYClassNames = {
    none: styles['CustomSelectOption--sizeY-none'],
    ['regular']: styles['CustomSelectOption--sizeY-regular']
};
/**
 * @see https://vkcom.github.io/VKUI/#/CustomSelectOption
 */ export const CustomSelectOption = ({ children, hierarchy = 0, hovered: hoveredProp, selected, before, after, description, disabled, style: styleProp, className, onClick, ...restProps })=>{
    const { sizeY = 'none' } = useAdaptivity();
    const style = React.useMemo(()=>hierarchy > 0 ? {
            '--vkui_internal--custom_select_option_hierarchy_level': hierarchy,
            ...styleProp
        } : styleProp, [
        hierarchy,
        styleProp
    ]);
    const hovered = hoveredProp && !disabled ? true : false;
    return /*#__PURE__*/ React.createElement(Paragraph, {
        ...restProps,
        onClick: disabled ? undefined : onClick,
        Component: "div",
        role: "option",
        "aria-disabled": disabled,
        "aria-selected": selected,
        "data-hovered": hovered,
        className: classNames(styles['CustomSelectOption'], sizeY !== 'compact' && sizeYClassNames[sizeY], hovered && styles['CustomSelectOption--hover'], disabled && styles['CustomSelectOption--disabled'], hierarchy > 0 && styles['CustomSelectOption--hierarchy'], className),
        style: style
    }, hasReactNode(before) && /*#__PURE__*/ React.createElement("div", {
        className: styles['CustomSelectOption__before']
    }, before), /*#__PURE__*/ React.createElement("div", {
        className: styles['CustomSelectOption__main']
    }, /*#__PURE__*/ React.createElement("div", {
        className: styles['CustomSelectOption__children']
    }, children), hasReactNode(description) && /*#__PURE__*/ React.createElement(Footnote, {
        className: styles['CustomSelectOption__description']
    }, /*#__PURE__*/ React.createElement(VisuallyHidden, null, " "), description)), /*#__PURE__*/ React.createElement("div", {
        className: styles['CustomSelectOption__after']
    }, hasReactNode(after) && /*#__PURE__*/ React.createElement("div", null, after), selected && /*#__PURE__*/ React.createElement(Icon16Done, {
        className: styles['CustomSelectOption__selectedIcon']
    })));
};

//# sourceMappingURL=CustomSelectOption.js.map