import * as React from 'react';
import { Icon16Done } from '@vkontakte/icons';
import { classNames, hasReactNode } from '@vkontakte/vkjs';
import { useAdaptivity } from '../../hooks/useAdaptivity';
import { SizeType } from '../../lib/adaptivity';
import { warnOnce } from '../../lib/warnOnce';
import { Footnote } from '../Typography/Footnote/Footnote';
import { Paragraph } from '../Typography/Paragraph/Paragraph';
import styles from './CustomSelectOption.module.css';
const sizeYClassNames = {
    none: styles['CustomSelectOption--sizeY-none'],
    [SizeType.REGULAR]: styles['CustomSelectOption--sizeY-regular']
};
const warn = warnOnce('CustomSelectOption');
/**
 * @see https://vkcom.github.io/VKUI/#/CustomSelectOption
 */ export const CustomSelectOption = ({ children, hierarchy = 0, hovered, selected, before, after, option, description, disabled, style: styleProp, className, onClick, ...restProps })=>{
    const title = typeof children === 'string' ? children : undefined;
    const { sizeY = 'none' } = useAdaptivity();
    const style = React.useMemo(()=>hierarchy > 0 ? {
            '--vkui_internal--custom_select_option_hierarchy_level': hierarchy,
            ...styleProp
        } : styleProp, [
        hierarchy,
        styleProp
    ]);
    if (!!option && process.env.NODE_ENV === 'development') {
        // TODO [>=6]: Удалить св-во `option`
        warn('Свойство option было добавлено по ошибке и будет удалено в v6.0.0.');
    }
    return /*#__PURE__*/ React.createElement(Paragraph, {
        ...restProps,
        onClick: disabled ? undefined : onClick,
        Component: "div",
        role: "option",
        title: title,
        "aria-disabled": disabled,
        "aria-selected": selected,
        className: classNames(styles['CustomSelectOption'], sizeY !== SizeType.COMPACT && sizeYClassNames[sizeY], hovered && !disabled && styles['CustomSelectOption--hover'], disabled && styles['CustomSelectOption--disabled'], hierarchy > 0 && styles['CustomSelectOption--hierarchy'], className),
        style: style
    }, hasReactNode(before) && /*#__PURE__*/ React.createElement("div", {
        className: styles['CustomSelectOption__before']
    }, before), /*#__PURE__*/ React.createElement("div", {
        className: styles['CustomSelectOption__main']
    }, /*#__PURE__*/ React.createElement("div", {
        className: styles['CustomSelectOption__children']
    }, children), hasReactNode(description) && /*#__PURE__*/ React.createElement(Footnote, {
        className: styles['CustomSelectOption__description']
    }, description)), /*#__PURE__*/ React.createElement("div", {
        className: styles['CustomSelectOption__after']
    }, hasReactNode(after) && /*#__PURE__*/ React.createElement("div", null, after), selected && /*#__PURE__*/ React.createElement(Icon16Done, {
        className: styles['CustomSelectOption__selectedIcon']
    })));
};

//# sourceMappingURL=CustomSelectOption.js.map