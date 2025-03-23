import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import * as React from 'react';
import { classNames } from '@vkontakte/vkjs';
import { useAdaptivity } from '../../hooks/useAdaptivity';
import { warnOnce } from '../../lib/warnOnce';
import { AppRootContext } from '../AppRoot/AppRootContext';
import { ModalRootContext } from '../ModalRoot/ModalRootContext';
import { RootComponent } from '../RootComponent/RootComponent';
const sizeXClassNames = {
    none: classNames("vkuiGroup--sizeX-none", 'vkuiInternalGroup--sizeX-none'),
    regular: "vkuiGroup--sizeX-regular",
    compact: "vkuiGroup--sizeX-compact"
};
const stylesMode = {
    none: classNames("vkuiGroup--mode-none", 'vkuiInternalGroup--mode-none'),
    plain: classNames("vkuiGroup--mode-plain", 'vkuiInternalGroup--mode-plain'),
    card: classNames("vkuiGroup--mode-card", 'vkuiInternalGroup--mode-card')
};
const stylesPadding = {
    s: "vkuiGroup--padding-s",
    m: "vkuiGroup--padding-m"
};
/**
 * Вычисляем mode для Group.
 */ function useGroupMode(forcedMode, sizeX, isInsideModal) {
    const { layout } = React.useContext(AppRootContext);
    if (forcedMode) {
        return forcedMode;
    }
    if (isInsideModal) {
        return 'plain';
    }
    if (layout) {
        return layout;
    }
    if (sizeX !== 'none') {
        return sizeX === 'regular' ? 'card' : 'plain';
    }
    return 'none';
}
const warn = warnOnce('Group');
export const GroupContainer = (_param)=>{
    var { children, separator = 'auto', mode: modeProps, padding = 'm', tabIndex: tabIndexProp } = _param, restProps = _object_without_properties(_param, [
        "children",
        "separator",
        "mode",
        "padding",
        "tabIndex"
    ]);
    const { isInsideModal } = React.useContext(ModalRootContext);
    const { sizeX = 'none' } = useAdaptivity();
    const mode = useGroupMode(modeProps, sizeX, isInsideModal);
    const isTabPanel = restProps.role === 'tabpanel';
    if (process.env.NODE_ENV === 'development' && isTabPanel && (!restProps['aria-controls'] || !restProps['id'])) {
        warn('При использовании роли "tabpanel" необходимо задать значение свойств "aria-controls" и "id"');
    }
    const tabIndex = isTabPanel && tabIndexProp === undefined ? 0 : tabIndexProp;
    let siblingSeparatorElement = null;
    switch(separator){
        case 'auto':
            siblingSeparatorElement = /*#__PURE__*/ _jsx("div", {
                className: "vkuiGroup__separator-sibling"
            });
            break;
        case 'show':
            siblingSeparatorElement = /*#__PURE__*/ _jsx("div", {
                className: classNames("vkuiGroup__separator-sibling", mode === 'plain' || mode === 'none' ? "vkuiGroup__separator-sibling--forced" : undefined)
            });
            break;
        case 'hide':
            break;
    }
    return /*#__PURE__*/ _jsxs(_Fragment, {
        children: [
            /*#__PURE__*/ _jsx(RootComponent, _object_spread_props(_object_spread({
                Component: "section"
            }, restProps), {
                tabIndex: tabIndex,
                baseClassName: classNames('vkuiInternalGroup', "vkuiGroup", sizeXClassNames[sizeX], mode === 'plain' && isInsideModal && "vkuiGroup--mode-plain-inside-modal", stylesMode[mode], stylesPadding[padding]),
                children: children
            })),
            siblingSeparatorElement
        ]
    });
};
GroupContainer.displayName = 'GroupContainer';

//# sourceMappingURL=GroupContainer.js.map