'use client';
import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import * as React from "react";
import { classNames } from "@vkontakte/vkjs";
import { useAdaptivity } from "../../hooks/useAdaptivity.js";
import { warnOnce } from "../../lib/warnOnce.js";
import { AppRootContext } from "../AppRoot/AppRootContext.js";
import { ModalRootContext } from "../ModalRoot/ModalRootContext.js";
import { RootComponent } from "../RootComponent/RootComponent.js";
const sizeXClassNames = {
    none: classNames("Group__sizeXNone--cwmCa", 'vkuiInternalGroup--sizeX-none'),
    regular: "Group__sizeXRegular--rs0Wz",
    compact: "Group__sizeXCompact--rlF-h"
};
const stylesMode = {
    none: classNames("Group__modeNone--ACAea", 'vkuiInternalGroup--mode-none'),
    plain: classNames("Group__modePlain--qLBDS", 'vkuiInternalGroup--mode-plain'),
    card: classNames("Group__modeCard--Pvlyb", 'vkuiInternalGroup--mode-card')
};
const stylesPadding = {
    s: "Group__paddingS---6tCP",
    m: "Group__paddingM---bBhY"
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
                className: "Group__separatorSibling--58NyT"
            });
            break;
        case 'show':
            siblingSeparatorElement = /*#__PURE__*/ _jsx("div", {
                className: classNames("Group__separatorSibling--58NyT", mode === 'plain' || mode === 'none' ? "Group__separatorSiblingForced--vXMJu" : undefined)
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
                baseClassName: classNames('vkuiInternalGroup', "Group__host--3LuDm", sizeXClassNames[sizeX], mode === 'plain' && isInsideModal && "Group__modePlainInsideModal--Jzx-A", stylesMode[mode], stylesPadding[padding]),
                children: children
            })),
            siblingSeparatorElement
        ]
    });
};
GroupContainer.displayName = 'GroupContainer';

//# sourceMappingURL=GroupContainer.js.map