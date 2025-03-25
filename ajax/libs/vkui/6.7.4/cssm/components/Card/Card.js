import { jsx as _jsx } from "react/jsx-runtime";
import { classNames } from '@vkontakte/vkjs';
import { RootComponent } from '../RootComponent/RootComponent';
import styles from './Card.module.css';
/**
 * @see https://vkcom.github.io/VKUI/#/Card
 */ export const Card = ({ mode = 'tint', // TODO [>=7]: поменять тег на li https://github.com/VKCOM/VKUI/issues/7336
Component = 'div', ...restProps })=>{
    const withBorder = mode === 'outline' || mode === 'outline-tint';
    return /*#__PURE__*/ _jsx(RootComponent, {
        ...restProps,
        Component: Component,
        baseClassName: classNames(styles['Card'], mode === 'outline' && styles['Card--mode-outline'], mode === 'shadow' && styles['Card--mode-shadow'], withBorder && styles['Card--withBorder'])
    });
};

//# sourceMappingURL=Card.js.map