import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import * as React from 'react';
import { classNames, hasReactNode } from '@vkontakte/vkjs';
import { useAdaptivity } from '../../hooks/useAdaptivity';
import { warnOnce } from '../../lib/warnOnce';
import { AppRootContext } from '../AppRoot/AppRootContext';
import { ModalRootContext } from '../ModalRoot/ModalRootContext';
import { RootComponent } from '../RootComponent/RootComponent';
import { Separator } from '../Separator/Separator';
import { Footnote } from '../Typography/Footnote/Footnote';
import styles from './Group.module.css';
const sizeXClassNames = {
    none: classNames(styles['Group--sizeX-none'], 'vkuiInternalGroup--sizeX-none'),
    ['compact']: styles['Group--sizeX-compact']
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
/**
 * @see https://vkcom.github.io/VKUI/#/Group
 */ export const Group = ({ header, description, children, separator = 'auto', mode: modeProps, padding = 'm', tabIndex: tabIndexProp, ...restProps })=>{
    const { isInsideModal } = React.useContext(ModalRootContext);
    const { sizeX = 'none' } = useAdaptivity();
    const mode = useGroupMode(modeProps, sizeX, isInsideModal);
    const isTabPanel = restProps.role === 'tabpanel';
    if (process.env.NODE_ENV === 'development' && isTabPanel && (!restProps['aria-controls'] || !restProps['id'])) {
        warn('При использовании роли "tabpanel" необходимо задать значение свойств "aria-controls" и "id"');
    }
    const tabIndex = isTabPanel && tabIndexProp === undefined ? 0 : tabIndexProp;
    return /*#__PURE__*/ _jsxs(_Fragment, {
        children: [
            /*#__PURE__*/ _jsxs(RootComponent, {
                Component: "section",
                ...restProps,
                tabIndex: tabIndex,
                baseClassName: classNames('vkuiInternalGroup', styles['Group'], isInsideModal && styles['Group--inside-modal'], sizeX !== 'regular' && sizeXClassNames[sizeX], mode && stylesMode[mode], stylesPadding[padding]),
                children: [
                    hasReactNode(header) && /*#__PURE__*/ _jsx("div", {
                        className: styles['Group__header'],
                        children: header
                    }),
                    children,
                    hasReactNode(description) && /*#__PURE__*/ _jsx(Footnote, {
                        className: styles['Group__description'],
                        children: description
                    })
                ]
            }),
            separator !== 'hide' && /*#__PURE__*/ _jsxs(React.Fragment, {
                children: [
                    /*#__PURE__*/ _jsx("div", {
                        className: classNames(styles['Group__separator'], styles['Group__separator--spacing'])
                    }),
                    /*#__PURE__*/ _jsx(Separator, {
                        className: classNames(styles['Group__separator'], styles['Group__separator--separator'], separator === 'show' && styles['Group__separator--force'])
                    })
                ]
            })
        ]
    });
};

//# sourceMappingURL=Group.js.map