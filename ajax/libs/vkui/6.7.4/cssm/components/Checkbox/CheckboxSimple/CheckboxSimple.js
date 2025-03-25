import { jsx as _jsx } from "react/jsx-runtime";
import { classNames } from '@vkontakte/vkjs';
import { useAdaptivity } from '../../../hooks/useAdaptivity';
import { Tappable } from '../../Tappable/Tappable';
import { CheckboxInput } from '../CheckboxInput/CheckboxInput';
import styles from './CheckboxSimple.module.css';
const sizeYClassNames = {
    none: styles['CheckboxSimple--sizeY-none'],
    compact: styles['CheckboxSimple--sizeY-compact']
};
export function CheckboxSimple({ children, className, style, getRootRef, description, hoverMode, activeMode, hasHover, hasActive, focusVisibleMode, titleAfter, ...restProps }) {
    const { sizeY = 'none' } = useAdaptivity();
    return /*#__PURE__*/ _jsx(Tappable, {
        className: classNames(className, styles['CheckboxSimple'], sizeY !== 'regular' && sizeYClassNames[sizeY]),
        style: style,
        disabled: restProps.disabled,
        getRootRef: getRootRef,
        hoverMode: hoverMode,
        activeMode: activeMode,
        hasHover: hasHover,
        hasActive: hasActive,
        focusVisibleMode: focusVisibleMode,
        Component: "label",
        children: /*#__PURE__*/ _jsx(CheckboxInput, {
            ...restProps
        })
    });
}

//# sourceMappingURL=CheckboxSimple.js.map