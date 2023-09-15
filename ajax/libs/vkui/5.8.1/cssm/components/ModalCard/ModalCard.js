import * as React from 'react';
import { classNames } from '@vkontakte/vkjs';
import { useAdaptivityWithJSMediaQueries } from '../../hooks/useAdaptivityWithJSMediaQueries';
import { usePlatform } from '../../hooks/usePlatform';
import { getNavId } from '../../lib/getNavId';
import { warnOnce } from '../../lib/warnOnce';
import { ModalCardBase } from '../ModalCardBase/ModalCardBase';
import { ModalRootContext, useModalRegistry } from '../ModalRoot/ModalRootContext';
import { ModalType } from '../ModalRoot/types';
import { RootComponent } from '../RootComponent/RootComponent';
import styles from './ModalCard.module.css';
const platformClassNames = {
    ios: styles['ModalCard--ios'],
    android: styles['ModalCard--android'],
    vkcom: styles['ModalCard--vkcom']
};
const warn = warnOnce('ModalCard');
/**
 * @see https://vkcom.github.io/VKUI/#/ModalCard
 */ export const ModalCard = ({ icon, header, subheader, children, actions, onClose, nav, id, size, ...restProps })=>{
    const { isDesktop } = useAdaptivityWithJSMediaQueries();
    const platform = usePlatform();
    const modalContext = React.useContext(ModalRootContext);
    const { refs } = useModalRegistry(getNavId({
        nav,
        id
    }, warn), ModalType.CARD);
    return /*#__PURE__*/ React.createElement(RootComponent, {
        ...restProps,
        id: id,
        baseClassName: classNames(styles['ModalCard'], platformClassNames.hasOwnProperty(platform) ? platformClassNames[platform] : platformClassNames.android, isDesktop && styles['ModalCard--desktop'])
    }, /*#__PURE__*/ React.createElement(ModalCardBase, {
        className: styles['ModalCard__in'],
        getRootRef: refs.innerElement,
        icon: icon,
        header: header,
        subheader: subheader,
        actions: actions,
        onClose: onClose || modalContext.onClose,
        size: size
    }, children));
};

//# sourceMappingURL=ModalCard.js.map