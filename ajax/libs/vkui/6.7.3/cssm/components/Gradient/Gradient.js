import { jsx as _jsx } from "react/jsx-runtime";
import { classNames } from '@vkontakte/vkjs';
import { RootComponent } from '../RootComponent/RootComponent';
import styles from './Gradient.module.css';
const modeStyles = {
    overlay: styles['Gradient--mode-overlay'],
    tint: styles['Gradient--mode-tint']
};
/**
 * @see https://vkcom.github.io/VKUI/#/Gradient
 */ export const Gradient = ({ mode = 'default', to = 'top', ...restProps })=>{
    return /*#__PURE__*/ _jsx(RootComponent, {
        role: "presentation",
        ...restProps,
        baseClassName: classNames(styles['Gradient'], mode !== 'default' && modeStyles[mode], to === 'bottom' && styles['Gradient--to-bottom'])
    });
};

//# sourceMappingURL=Gradient.js.map