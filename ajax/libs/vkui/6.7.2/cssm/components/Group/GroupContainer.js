import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import * as React from 'react';
import { classNames } from '@vkontakte/vkjs';
import { useAdaptivity } from '../../hooks/useAdaptivity';
import { warnOnce } from '../../lib/warnOnce';
import { AppRootContext } from '../AppRoot/AppRootContext';
import { ModalRootContext } from '../ModalRoot/ModalRootContext';
import { RootComponent } from '../RootComponent/RootComponent';
import styles from './Group.module.css';
const sizeXClassNames = {
    none: classNames(styles['Group--sizeX-none'], 'vkuiInternalGroup--sizeX-none'),
    regular: styles['Group--sizeX-regular'],
    compact: styles['Group--sizeX-compact']
};
const stylesMode = {
    none: classNames(styles['Group--mode-none'], 'vkuiInternalGroup--mode-none'),
    plain: classNames(styles['Group--mode-plain'], 'vkuiInternalGroup--mode-plain'),
    card: classNames(styles['Group--mode-card'], 'vkuiInternalGroup--mode-card')
};
const stylesPadding = {
    s: styles['Group--padding-s'],
    m: styles['Group--padding-m']
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
                className: styles['Group__separator-sibling']
            });
            break;
        case 'show':
            siblingSeparatorElement = /*#__PURE__*/ _jsx("div", {
                className: classNames(styles['Group__separator-sibling'], mode === 'plain' || mode === 'none' ? styles['Group__separator-sibling--forced'] : undefined)
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
                baseClassName: classNames('vkuiInternalGroup', styles['Group'], sizeXClassNames[sizeX], mode === 'plain' && isInsideModal && styles['Group--mode-plain-inside-modal'], stylesMode[mode], stylesPadding[padding]),
                children: children
            }),
            siblingSeparatorElement
        ]
    });
};
GroupContainer.displayName = 'GroupContainer';

//# sourceMappingURL=GroupContainer.js.map