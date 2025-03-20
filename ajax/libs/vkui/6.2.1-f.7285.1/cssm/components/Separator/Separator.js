import { jsx as _jsx } from "react/jsx-runtime";
import { classNames } from '@vkontakte/vkjs';
import { RootComponent } from '../RootComponent/RootComponent';
import styles from './Separator.module.css';
/**
 * @see https://vkcom.github.io/VKUI/#/Separator
 */ export const Separator = ({ wide, ...restProps })=>/*#__PURE__*/ _jsx(RootComponent, {
        ...restProps,
        baseClassName: classNames(styles['Separator'], !wide && styles['Separator--padded']),
        children: /*#__PURE__*/ _jsx("hr", {
            className: styles['Separator__in']
        })
    });

//# sourceMappingURL=Separator.js.map