import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
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
    regular: styles['CustomSelectOption--sizeY-regular']
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
    return /*#__PURE__*/ _jsxs(Paragraph, {
        ...restProps,
        onClick: disabled ? undefined : onClick,
        Component: "div",
        role: "option",
        "aria-disabled": disabled,
        "aria-selected": selected,
        "data-hovered": hovered,
        className: classNames(styles['CustomSelectOption'], sizeY !== 'compact' && sizeYClassNames[sizeY], hovered && styles['CustomSelectOption--hover'], disabled && styles['CustomSelectOption--disabled'], hierarchy > 0 && styles['CustomSelectOption--hierarchy'], className),
        style: style,
        children: [
            hasReactNode(before) && /*#__PURE__*/ _jsx("div", {
                className: styles['CustomSelectOption__before'],
                children: before
            }),
            /*#__PURE__*/ _jsxs("div", {
                className: styles['CustomSelectOption__main'],
                children: [
                    /*#__PURE__*/ _jsx("div", {
                        className: styles['CustomSelectOption__children'],
                        children: children
                    }),
                    hasReactNode(description) && /*#__PURE__*/ _jsxs(Footnote, {
                        className: styles['CustomSelectOption__description'],
                        children: [
                            /*#__PURE__*/ _jsx(VisuallyHidden, {
                                children: " "
                            }),
                            description
                        ]
                    })
                ]
            }),
            /*#__PURE__*/ _jsxs("div", {
                className: styles['CustomSelectOption__after'],
                children: [
                    hasReactNode(after) && /*#__PURE__*/ _jsx("div", {
                        children: after
                    }),
                    selected && /*#__PURE__*/ _jsx(Icon16Done, {
                        className: styles['CustomSelectOption__selectedIcon']
                    })
                ]
            })
        ]
    });
};

//# sourceMappingURL=CustomSelectOption.js.map