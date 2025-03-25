import { jsx as _jsx } from "react/jsx-runtime";
import { classNames } from '@vkontakte/vkjs';
import { useAdaptivity } from '../../hooks/useAdaptivity';
import { RootComponent } from '../RootComponent/RootComponent';
import styles from './CardGrid.module.css';
const sizeXClassNames = {
    none: styles['CardGrid--sizeX-none'],
    compact: styles['CardGrid--sizeX-compact']
};
const stylesSize = {
    s: 'vkuiInternalCardGrid--size-s',
    m: 'vkuiInternalCardGrid--size-m',
    l: 'vkuiInternalCardGrid--size-l'
};
/**
 * @see https://vkcom.github.io/VKUI/#/CardGrid
 */ export const CardGrid = ({ size = 's', spaced = false, // TODO [>=7]: поменять тег на ul https://github.com/VKCOM/VKUI/issues/7336
Component = 'div', ...restProps })=>{
    const { sizeX = 'none' } = useAdaptivity();
    return /*#__PURE__*/ _jsx(RootComponent, {
        ...restProps,
        Component: Component,
        baseClassName: classNames(styles['CardGrid'], 'vkuiInternalCardGrid', spaced && styles['CardGrid--spaced'], stylesSize[size], sizeX !== 'regular' && sizeXClassNames[sizeX])
    });
};

//# sourceMappingURL=CardGrid.js.map