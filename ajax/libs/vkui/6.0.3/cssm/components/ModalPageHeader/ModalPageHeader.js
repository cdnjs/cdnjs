import * as React from 'react';
import { classNames } from '@vkontakte/vkjs';
import { useAdaptivityWithJSMediaQueries } from '../../hooks/useAdaptivityWithJSMediaQueries';
import { usePlatform } from '../../hooks/usePlatform';
import { ModalPageContext } from '../ModalPage/ModalPageContext';
import { PanelHeader } from '../PanelHeader/PanelHeader';
import { Separator } from '../Separator/Separator';
import styles from './ModalPageHeader.module.css';
/**
 * @see https://vkcom.github.io/VKUI/#/ModalPageHeader
 */ export const ModalPageHeader = ({ children, noSeparator = false, getRootRef, className, typographyProps, ...restProps })=>{
    const platform = usePlatform();
    const { isDesktop, sizeX } = useAdaptivityWithJSMediaQueries();
    const { labelId } = React.useContext(ModalPageContext);
    return /*#__PURE__*/ React.createElement("div", {
        className: classNames(styles['ModalPageHeader'], platform !== 'vkcom' && styles['ModalPageHeader--withGaps'], isDesktop && styles['ModalPageHeader--desktop']),
        ref: getRootRef
    }, /*#__PURE__*/ React.createElement(PanelHeader, {
        className: classNames('vkuiInternalModalPageHeader__in', className),
        typographyProps: {
            Component: 'h2',
            id: labelId,
            ...typographyProps
        },
        ...restProps,
        fixed: false,
        delimiter: "none",
        transparent: true
    }, children), !noSeparator && /*#__PURE__*/ React.createElement(Separator, {
        wide: sizeX === 'regular'
    }));
};

//# sourceMappingURL=ModalPageHeader.js.map