import { jsx as _jsx } from "react/jsx-runtime";
import { classNames } from '@vkontakte/vkjs';
import { RootComponent } from '../RootComponent/RootComponent';
import styles from './VisuallyHidden.module.css';
/**
 * Компонент-обертка. Позволяет скрыть контент визуально, но оставить его
 * доступным для ассистивных технологий. По умолчанию — `span`.
 *
 * @since 5.4.0
 * @see https://vkcom.github.io/VKUI/#/VisuallyHidden
 */ export const VisuallyHidden = ({ Component = 'span', baseClassName, ...restProps })=>/*#__PURE__*/ _jsx(RootComponent, {
        Component: Component,
        ...restProps,
        baseClassName: classNames(baseClassName, styles['VisuallyHidden'], Component === 'input' && styles['VisuallyHidden--focusable-input'])
    });

//# sourceMappingURL=VisuallyHidden.js.map