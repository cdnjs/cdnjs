import * as React from 'react';
import { classNames } from '@vkontakte/vkjs';
import { useAdaptivityWithJSMediaQueries } from '../../hooks/useAdaptivityWithJSMediaQueries';
import { useExternRef } from '../../hooks/useExternRef';
import { usePlatform } from '../../hooks/usePlatform';
import { Platform } from '../../lib/platform';
import { ModalPageContext } from '../ModalPage/ModalPageContext';
import { PanelHeader } from '../PanelHeader/PanelHeader';
import { Separator } from '../Separator/Separator';
import styles from './ModalPageHeader.module.css';
/**
 * @see https://vkcom.github.io/VKUI/#/ModalPageHeader
 */ export const ModalPageHeader = ({ children, separator = true, getRef, getRootRef, className, typographyProps, ...restProps })=>{
    const platform = usePlatform();
    const hasSeparator = separator && platform === Platform.VKCOM;
    const { isDesktop } = useAdaptivityWithJSMediaQueries();
    const { labelId } = React.useContext(ModalPageContext);
    const modalPageHeaderRef = useExternRef(getRef, getRootRef);
    return /*#__PURE__*/ React.createElement("div", {
        className: classNames(styles['ModalPageHeader'], platform !== Platform.VKCOM && styles['ModalPageHeader--withGaps'], isDesktop && styles['ModalPageHeader--desktop']),
        ref: modalPageHeaderRef
    }, /*#__PURE__*/ React.createElement(PanelHeader, {
        className: classNames('vkuiInternalModalPageHeader__in', className),
        typographyProps: {
            Component: 'h2',
            id: labelId,
            ...typographyProps
        },
        ...restProps,
        fixed: false,
        separator: false,
        transparent: true
    }, children), hasSeparator && /*#__PURE__*/ React.createElement(Separator, {
        wide: true
    }));
};

//# sourceMappingURL=ModalPageHeader.js.map