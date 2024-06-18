import * as React from 'react';
import { Icon20Cancel, Icon24Dismiss } from '@vkontakte/icons';
import { useAdaptivityWithJSMediaQueries } from '../../hooks/useAdaptivityWithJSMediaQueries';
import { usePlatform } from '../../hooks/usePlatform';
import { ModalDismissButton } from '../ModalDismissButton/ModalDismissButton';
import { Tappable } from '../Tappable/Tappable';
import { VisuallyHidden } from '../VisuallyHidden/VisuallyHidden';
import styles from './ModalCardBase.module.css';
export function ModalCardBaseCloseButton({ children = 'Закрыть', testId, mode, onClose }) {
    const platform = usePlatform();
    const { isDesktop } = useAdaptivityWithJSMediaQueries();
    if (isDesktop && mode === 'outside') {
        return /*#__PURE__*/ React.createElement(ModalDismissButton, {
            "data-testid": testId,
            onClick: onClose
        }, children);
    }
    if (mode === 'inside' || platform === 'ios' && !isDesktop) {
        return /*#__PURE__*/ React.createElement(Tappable, {
            className: styles['ModalCardBase__dismiss'],
            onClick: onClose,
            hoverMode: "opacity",
            activeMode: "opacity",
            "data-testid": testId
        }, /*#__PURE__*/ React.createElement(VisuallyHidden, null, children), platform === 'ios' ? /*#__PURE__*/ React.createElement(Icon24Dismiss, null) : /*#__PURE__*/ React.createElement(Icon20Cancel, null));
    }
    return null;
}

//# sourceMappingURL=ModalCardBaseCloseButton.js.map