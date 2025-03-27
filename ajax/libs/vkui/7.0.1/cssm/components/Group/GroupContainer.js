'use client';
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import * as React from "react";
import { classNames } from "@vkontakte/vkjs";
import { useModalContext } from "../../context/ModalContext.js";
import { useAdaptivity } from "../../hooks/useAdaptivity.js";
import { warnOnce } from "../../lib/warnOnce.js";
import { AppRootContext } from "../AppRoot/AppRootContext.js";
import { RootComponent } from "../RootComponent/RootComponent.js";
import styles from "./Group.module.css";
const sizeXClassNames = {
    none: classNames(styles.sizeXNone, 'vkuiInternalGroup--sizeX-none'),
    regular: styles.sizeXRegular,
    compact: styles.sizeXCompact
};
const stylesMode = {
    none: classNames(styles.modeNone, 'vkuiInternalGroup--mode-none'),
    plain: classNames(styles.modePlain, 'vkuiInternalGroup--mode-plain'),
    card: classNames(styles.modeCard, 'vkuiInternalGroup--mode-card')
};
const stylesPadding = {
    s: styles.paddingS,
    m: styles.paddingM
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
export const GroupContainer = ({ children, separator = 'auto', mode: modeProps, padding = 'm', tabIndex: tabIndexProp, ...restProps })=>{
    const isInsideModal = useModalContext().id !== null;
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
                className: styles.separatorSibling
            });
            break;
        case 'show':
            siblingSeparatorElement = /*#__PURE__*/ _jsx("div", {
                className: classNames(styles.separatorSibling, mode === 'plain' || mode === 'none' ? styles.separatorSiblingForced : undefined)
            });
            break;
        case 'hide':
            break;
    }
    return /*#__PURE__*/ _jsxs(_Fragment, {
        children: [
            /*#__PURE__*/ _jsx(RootComponent, {
                Component: "section",
                ...restProps,
                tabIndex: tabIndex,
                baseClassName: classNames('vkuiInternalGroup', styles.host, sizeXClassNames[sizeX], mode === 'plain' && isInsideModal && styles.modePlainInsideModal, stylesMode[mode], stylesPadding[padding]),
                children: children
            }),
            siblingSeparatorElement
        ]
    });
};
GroupContainer.displayName = 'GroupContainer';

//# sourceMappingURL=GroupContainer.js.map