import * as React from 'react';
import { classNames } from '@vkontakte/vkjs';
import { useAdaptivity } from '../../hooks/useAdaptivity';
import { SizeType } from '../../lib/adaptivity';
import { warnOnce } from '../../lib/warnOnce';
import { TabsModeContext } from '../Tabs/Tabs';
import { Tappable } from '../Tappable/Tappable';
import { Headline } from '../Typography/Headline/Headline';
import { Subhead } from '../Typography/Subhead/Subhead';
import { VisuallyHidden } from '../VisuallyHidden/VisuallyHidden';
import styles from './TabsItem.module.css';
const sizeYClassNames = {
    none: styles['TabsItem--sizeY-none'],
    [SizeType.COMPACT]: styles['TabsItem--sizeY-compact']
};
const stylesMode = {
    default: styles['TabsItem--mode-default'],
    accent: styles['TabsItem--mode-accent'],
    secondary: styles['TabsItem--mode-secondary']
};
const warn = warnOnce('TabsItem');
/**
 * @see https://vkcom.github.io/VKUI/#/TabsItem
 */ export const TabsItem = ({ before, children, status, after, selected = false, className, role = 'tab', tabIndex: tabIndexProp, ...restProps })=>{
    const { sizeY = 'none' } = useAdaptivity();
    const { mode, withGaps } = React.useContext(TabsModeContext);
    let statusComponent = null;
    const isTabFlow = role === 'tab';
    if (status) {
        statusComponent = typeof status === 'number' ? /*#__PURE__*/ React.createElement(Subhead, {
            Component: "span",
            className: classNames(styles['TabsItem__status'], styles['TabsItem__status--count']),
            weight: "2"
        }, /*#__PURE__*/ React.createElement(VisuallyHidden, null, "\xa0"), status) : /*#__PURE__*/ React.createElement("span", {
            className: styles['TabsItem__status']
        }, /*#__PURE__*/ React.createElement(VisuallyHidden, null, "\xa0"), status);
    }
    if (process.env.NODE_ENV === 'development' && isTabFlow) {
        if (!restProps['aria-controls']) {
            warn(`Передайте в "aria-controls" id контролируемого блока`, 'warn');
        } else if (!restProps['id']) {
            warn(`Передайте "id" компоненту для использования в "aria-labelledby" контролируемого блока`, 'warn');
        }
    }
    let tabIndex = tabIndexProp;
    if (isTabFlow && tabIndex === undefined) {
        tabIndex = selected ? 0 : -1;
    }
    return /*#__PURE__*/ React.createElement(Tappable, {
        ...restProps,
        className: classNames(styles['TabsItem'], mode && stylesMode[mode], selected && styles['TabsItem--selected'], sizeY !== SizeType.REGULAR && sizeYClassNames[sizeY], withGaps && styles['TabsItem--withGaps'], className),
        hoverMode: styles['TabsItem--hover'],
        activeMode: "",
        focusVisibleMode: "inside",
        hasActive: false,
        role: role,
        "aria-selected": selected,
        tabIndex: tabIndex
    }, before && /*#__PURE__*/ React.createElement("div", {
        className: styles['TabsItem__before']
    }, before), /*#__PURE__*/ React.createElement(Headline, {
        Component: "span",
        className: styles['TabsItem__label'],
        level: mode === 'default' ? '1' : '2',
        weight: "2"
    }, children), statusComponent, after && /*#__PURE__*/ React.createElement("div", {
        className: styles['TabsItem__after']
    }, after), mode === 'default' && /*#__PURE__*/ React.createElement("div", {
        className: styles['TabsItem__underline'],
        "aria-hidden": true,
        "data-selected": selected
    }));
};

//# sourceMappingURL=TabsItem.js.map