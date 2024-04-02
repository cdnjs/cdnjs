import * as React from 'react';
import { classNames } from '@vkontakte/vkjs';
import { useAdaptivity } from '../../hooks/useAdaptivity';
import { AppRootContext } from '../AppRoot/AppRootContext';
import { NavPanelIdContext } from '../NavIdContext/NavIdContext';
import { OnboardingTooltipContainer } from '../OnboardingTooltip/OnboardingTooltipContainer';
import { RootComponent } from '../RootComponent/RootComponent';
import { Touch } from '../Touch/Touch';
import styles from './Panel.module.css';
const sizeXClassNames = {
    none: styles['Panel--sizeX-none'],
    ['compact']: styles['Panel--sizeX-compact'],
    ['regular']: styles['Panel--sizeX-regular']
};
/**
 * @see https://vkcom.github.io/VKUI/#/Panel
 */ export const Panel = ({ centered = false, children, nav, ...restProps })=>{
    const { sizeX = 'none' } = useAdaptivity();
    const { layout } = React.useContext(AppRootContext);
    return /*#__PURE__*/ React.createElement(NavPanelIdContext.Provider, {
        value: restProps.id || nav
    }, /*#__PURE__*/ React.createElement(RootComponent, {
        ...restProps,
        baseClassName: classNames(styles['Panel'], sizeXClassNames[sizeX], centered && 'vkuiInternalPanel--centered', layout === 'card' && styles['Panel--layout-card'])
    }, /*#__PURE__*/ React.createElement(Touch, {
        Component: OnboardingTooltipContainer,
        className: classNames(styles['Panel__in'], 'vkuiInternalPanel__in')
    }, /*#__PURE__*/ React.createElement("div", {
        className: styles['Panel__in-before']
    }), centered ? /*#__PURE__*/ React.createElement("div", {
        className: styles['Panel__centered']
    }, children) : children, /*#__PURE__*/ React.createElement("div", {
        className: styles['Panel__in-after']
    }))));
};

//# sourceMappingURL=Panel.js.map