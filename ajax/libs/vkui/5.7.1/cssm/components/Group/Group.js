import * as React from 'react';
import { classNames, hasReactNode } from '@vkontakte/vkjs';
import { useAdaptivity } from '../../hooks/useAdaptivity';
import { usePlatform } from '../../hooks/usePlatform';
import { SizeType } from '../../lib/adaptivity';
import { Platform } from '../../lib/platform';
import { warnOnce } from '../../lib/warnOnce';
import { ModalRootContext } from '../ModalRoot/ModalRootContext';
import { Separator } from '../Separator/Separator';
import { Spacing } from '../Spacing/Spacing';
import { Footnote } from '../Typography/Footnote/Footnote';
import styles from './Group.module.css';
const sizeXClassNames = {
    none: classNames(styles['Group--sizeX-none'], 'vkuiInternalGroup--sizeX-none'),
    [SizeType.COMPACT]: styles['Group--sizeX-compact']
};
const warn = warnOnce('Group');
/**
 * @see https://vkcom.github.io/VKUI/#/Group
 */ export const Group = ({ header, description, children, separator = 'auto', getRootRef, mode: modeProps, padding = 'm', className, tabIndex: tabIndexProp, ...restProps })=>{
    const { isInsideModal } = React.useContext(ModalRootContext);
    const platform = usePlatform();
    const { sizeX = 'none' } = useAdaptivity();
    let mode = modeProps;
    if (!modeProps) {
        // Подробнее в "none" можно прочитать в ADAPTIVITY_GUIDE.md
        mode = isInsideModal ? 'plain' : 'none';
    }
    if (mode === 'none' && sizeX !== 'none') {
        mode = sizeX === SizeType.REGULAR ? 'card' : 'plain';
    }
    const isTabPanel = restProps.role === 'tabpanel';
    if (process.env.NODE_ENV === 'development' && isTabPanel && (!restProps['aria-controls'] || !restProps['id'])) {
        warn('При использовании роли "tabpanel" необходимо задать значение свойств "aria-controls" и "id"');
    }
    const tabIndex = isTabPanel && tabIndexProp === undefined ? 0 : tabIndexProp;
    const separatorClassName = classNames(styles['Group__separator'], separator === 'show' && styles['Group__separator--force']);
    return /*#__PURE__*/ React.createElement(React.Fragment, null, /*#__PURE__*/ React.createElement("section", {
        ...restProps,
        tabIndex: tabIndex,
        ref: getRootRef,
        className: classNames('vkuiInternalGroup', styles['Group'], isInsideModal && styles['Group--inside-modal'], platform === Platform.IOS && styles['Group--ios'], sizeX !== SizeType.REGULAR && sizeXClassNames[sizeX], mode && ({
            none: classNames(styles['Group--mode-none'], 'vkuiInternalGroup--mode-none'),
            plain: classNames(styles['Group--mode-plain'], 'vkuiInternalGroup--mode-plain'),
            card: classNames(styles['Group--mode-card'], 'vkuiInternalGroup--mode-card')
        })[mode], {
            s: styles['Group--padding-s'],
            m: styles['Group--padding-m']
        }[padding], className)
    }, header, children, hasReactNode(description) && /*#__PURE__*/ React.createElement(Footnote, {
        className: styles['Group__description']
    }, description)), separator !== 'hide' && /*#__PURE__*/ React.createElement(React.Fragment, null, /*#__PURE__*/ React.createElement(Spacing, {
        className: classNames(separatorClassName, styles['Group__separator--spacing']),
        size: 16
    }), /*#__PURE__*/ React.createElement(Separator, {
        className: classNames(separatorClassName, styles['Group__separator--separator'])
    })));
};

//# sourceMappingURL=Group.js.map