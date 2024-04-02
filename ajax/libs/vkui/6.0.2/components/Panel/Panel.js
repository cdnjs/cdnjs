import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import * as React from 'react';
import { classNames } from '@vkontakte/vkjs';
import { useAdaptivity } from '../../hooks/useAdaptivity';
import { AppRootContext } from '../AppRoot/AppRootContext';
import { NavPanelIdContext } from '../NavIdContext/NavIdContext';
import { OnboardingTooltipContainer } from '../OnboardingTooltip/OnboardingTooltipContainer';
import { RootComponent } from '../RootComponent/RootComponent';
import { Touch } from '../Touch/Touch';
const sizeXClassNames = {
    none: "vkuiPanel--sizeX-none",
    ['compact']: "vkuiPanel--sizeX-compact",
    ['regular']: "vkuiPanel--sizeX-regular"
};
/**
 * @see https://vkcom.github.io/VKUI/#/Panel
 */ export const Panel = (_param)=>{
    var { centered = false, children, nav } = _param, restProps = _object_without_properties(_param, [
        "centered",
        "children",
        "nav"
    ]);
    const { sizeX = 'none' } = useAdaptivity();
    const { layout } = React.useContext(AppRootContext);
    return /*#__PURE__*/ React.createElement(NavPanelIdContext.Provider, {
        value: restProps.id || nav
    }, /*#__PURE__*/ React.createElement(RootComponent, _object_spread_props(_object_spread({}, restProps), {
        baseClassName: classNames("vkuiPanel", sizeXClassNames[sizeX], centered && 'vkuiInternalPanel--centered', layout === 'card' && "vkuiPanel--layout-card")
    }), /*#__PURE__*/ React.createElement(Touch, {
        Component: OnboardingTooltipContainer,
        className: classNames("vkuiPanel__in", 'vkuiInternalPanel__in')
    }, /*#__PURE__*/ React.createElement("div", {
        className: "vkuiPanel__in-before"
    }), centered ? /*#__PURE__*/ React.createElement("div", {
        className: "vkuiPanel__centered"
    }, children) : children, /*#__PURE__*/ React.createElement("div", {
        className: "vkuiPanel__in-after"
    }))));
};

//# sourceMappingURL=Panel.js.map