import * as React from 'react';
import { usePlatform } from '../../hooks/usePlatform';
import { Platform } from '../../lib/platform';
import { warnOnce } from '../../lib/warnOnce';
import { Text } from '../Typography/Text/Text';
import styles from './PanelHeader.module.css';
const warn = warnOnce('PanelHeader');
/**
 * TODO [>=6]: Удалить подкомпонент
 * @deprecated
 */ export const LegacyPanelHeaderContent = ({ children, Component = 'span', id })=>{
    if (process.env.NODE_ENV === 'development') {
        warn('Подкомпонент PanelHeader.Content устарел и будет удалён в v6. Используйте параметр typographyProps.');
    }
    const platform = usePlatform();
    return platform === Platform.VKCOM ? /*#__PURE__*/ React.createElement(Text, {
        weight: "2",
        Component: Component,
        id: id
    }, children) : /*#__PURE__*/ React.createElement(Component, {
        className: styles['PanelHeader__content-in'],
        id: id
    }, children);
};
LegacyPanelHeaderContent.displayName = 'LegacyPanelHeaderContent';

//# sourceMappingURL=LegacyPanelHeaderContent.js.map