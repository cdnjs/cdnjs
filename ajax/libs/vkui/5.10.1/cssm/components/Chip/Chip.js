import * as React from 'react';
import { Icon16Cancel } from '@vkontakte/icons';
import { classNames, hasReactNode, noop } from '@vkontakte/vkjs';
import { useAdaptivity } from '../../hooks/useAdaptivity';
import { SizeType } from '../../lib/adaptivity';
import { getTitleFromChildren } from '../../lib/utils';
import { RootComponent } from '../RootComponent/RootComponent';
import { Tappable } from '../Tappable/Tappable';
import styles from './Chip.module.css';
const sizeYClassNames = {
    none: styles['Chip--sizeY-none'],
    [SizeType.COMPACT]: styles['Chip--sizeY-compact']
};
/**
 * @see https://vkcom.github.io/VKUI/#/Chip
 */ export const Chip = ({ value = '', option, removable = true, onRemove = noop, removeAriaLabel = 'Удалить', before = null, after, children, ...restProps })=>{
    const { sizeY = 'none' } = useAdaptivity();
    const onRemoveWrapper = React.useCallback((event)=>{
        onRemove(event, value);
    }, [
        onRemove,
        value
    ]);
    const title = getTitleFromChildren(children);
    return /*#__PURE__*/ React.createElement(RootComponent, {
        baseClassName: classNames(styles['Chip'], sizeY !== SizeType.REGULAR && sizeYClassNames[sizeY], removable && styles['Chip--removable']),
        role: "option",
        "aria-label": title,
        ...restProps
    }, /*#__PURE__*/ React.createElement("div", {
        className: styles['Chip__in'],
        role: "presentation"
    }, hasReactNode(before) && /*#__PURE__*/ React.createElement("div", {
        className: styles['Chip__before']
    }, before), /*#__PURE__*/ React.createElement("span", {
        className: styles['Chip__content'],
        title: title,
        "aria-hidden": true
    }, children), hasReactNode(after) && /*#__PURE__*/ React.createElement("div", {
        className: styles['Chip__after']
    }, after), removable && /*#__PURE__*/ React.createElement(Tappable, {
        Component: "button",
        className: styles['Chip__remove'],
        onClick: onRemoveWrapper,
        hasHover: false,
        hasActive: false,
        "aria-label": `${removeAriaLabel} ${title}`
    }, /*#__PURE__*/ React.createElement(Icon16Cancel, null))));
};

//# sourceMappingURL=Chip.js.map