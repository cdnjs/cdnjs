import { jsx as _jsx } from "react/jsx-runtime";
import { classNames } from '@vkontakte/vkjs';
import { RootComponent } from '../RootComponent/RootComponent';
import styles from './Separator.module.css';
const modeClassNames = {
    'primary': styles['Separator--mode-primary'],
    'secondary': styles['Separator--mode-secondary'],
    'primary-alpha': styles['Separator--mode-primaryAlpha']
};
/**
 * @see https://vkcom.github.io/VKUI/#/Separator
 */ export const Separator = ({ wide, mode = 'primary', ...restProps })=>/*#__PURE__*/ _jsx(RootComponent, {
        ...restProps,
        baseClassName: classNames(!wide && styles['Separator--padded'], modeClassNames[mode]),
        children: /*#__PURE__*/ _jsx("hr", {
            className: styles['Separator__in']
        })
    });

//# sourceMappingURL=Separator.js.map