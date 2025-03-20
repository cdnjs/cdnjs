import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
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
    compact: styles['Panel--sizeX-compact'],
    regular: styles['Panel--sizeX-regular']
};
const stylesMode = {
    none: styles['Panel--mode-none'],
    plain: styles['Panel--mode-plain'],
    card: styles['Panel--mode-card']
};
/**
 * @see https://vkcom.github.io/VKUI/#/Panel
 */ export const Panel = ({ centered = false, children, nav, mode: modeProp, disableBackground, ...restProps })=>{
    const { sizeX = 'none' } = useAdaptivity();
    const mode = usePanelMode(modeProp, sizeX);
    return /*#__PURE__*/ _jsx(NavPanelIdContext.Provider, {
        value: restProps.id || nav,
        children: /*#__PURE__*/ _jsx(RootComponent, {
            ...restProps,
            baseClassName: classNames(styles['Panel'], sizeXClassNames[sizeX], centered && 'vkuiInternalPanel--centered', disableBackground && styles['Panel--disableBackground'], stylesMode[mode]),
            children: /*#__PURE__*/ _jsxs(Touch, {
                Component: OnboardingTooltipContainer,
                className: classNames(styles['Panel__in'], 'vkuiInternalPanel__in'),
                children: [
                    /*#__PURE__*/ _jsx("div", {
                        className: styles['Panel__in-before']
                    }),
                    centered ? /*#__PURE__*/ _jsx("div", {
                        className: styles['Panel__centered'],
                        children: children
                    }) : children,
                    /*#__PURE__*/ _jsx("div", {
                        className: styles['Panel__in-after']
                    })
                ]
            })
        })
    });
};
function usePanelMode(modeProp, sizeX) {
    const { layout } = React.useContext(AppRootContext);
    if (modeProp) {
        return modeProp;
    }
    if (layout) {
        return layout;
    }
    if (sizeX !== 'none') {
        return sizeX === 'regular' ? 'card' : 'plain';
    }
    return 'none';
}

//# sourceMappingURL=Panel.js.map