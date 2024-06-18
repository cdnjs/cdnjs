import * as React from 'react';
import { classNames, hasReactNode } from '@vkontakte/vkjs';
import { useAdaptivity } from '../../hooks/useAdaptivity';
import { warnOnce } from '../../lib/warnOnce';
import { AppRootContext } from '../AppRoot/AppRootContext';
import { ModalRootContext } from '../ModalRoot/ModalRootContext';
import { RootComponent } from '../RootComponent/RootComponent';
import { Separator } from '../Separator/Separator';
import { Spacing } from '../Spacing/Spacing';
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
    return /*#__PURE__*/ React.createElement(React.Fragment, null, /*#__PURE__*/ React.createElement(RootComponent, {
        Component: "section",
        ...restProps,
        tabIndex: tabIndex,
        baseClassName: classNames('vkuiInternalGroup', styles['Group'], isInsideModal && styles['Group--inside-modal'], sizeX !== 'regular' && sizeXClassNames[sizeX], mode && stylesMode[mode], stylesPadding[padding])
    }, hasReactNode(header) && /*#__PURE__*/ React.createElement("div", {
        className: styles['Group__header']
    }, header), children, hasReactNode(description) && /*#__PURE__*/ React.createElement(Footnote, {
        className: styles['Group__description']
    }, description)), separator !== 'hide' && /*#__PURE__*/ React.createElement(React.Fragment, null, /*#__PURE__*/ React.createElement(Spacing, {
        className: classNames(styles['Group__separator'], styles['Group__separator--spacing']),
        size: 16
    }), /*#__PURE__*/ React.createElement(Separator, {
        className: classNames(styles['Group__separator'], styles['Group__separator--separator'], separator === 'show' && styles['Group__separator--force'])
    })));
};

//# sourceMappingURL=Group.js.map