'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { classNames } from "@vkontakte/vkjs";
import { useAdaptivity } from "../../hooks/useAdaptivity.js";
import { usePlatform } from "../../hooks/usePlatform.js";
import { hasAccessibleName } from "../../lib/accessibility.js";
import { COMMON_WARNINGS, warnOnce } from "../../lib/warnOnce.js";
import { Tappable } from "../Tappable/Tappable.js";
import { VisuallyHidden } from "../VisuallyHidden/VisuallyHidden.js";
import styles from "./IconButton.module.css";
const sizeYClassNames = {
    none: styles.sizeYNone,
    compact: styles.sizeYCompact
};
const warn = warnOnce('IconButton');
/**
 * @see https://vkui.io/components/icon-button
 */ export const IconButton = ({ label, children, ...restProps })=>{
    const platform = usePlatform();
    const { sizeY = 'none' } = useAdaptivity();
    if (process.env.NODE_ENV === 'development') {
        /* istanbul ignore next: проверка в dev mode, тест на hasAccessibleName() есть в lib/accessibility.test.tsx */ const isAccessible = hasAccessibleName({
            children: [
                children,
                label
            ],
            ...restProps
        });
        if (!isAccessible) {
            warn(COMMON_WARNINGS.a11y[restProps.href ? 'link-name' : 'button-name'], 'error');
        }
    }
    return /*#__PURE__*/ _jsxs(Tappable, {
        activeEffectDelay: 200,
        activeMode: "background",
        Component: restProps.href ? 'a' : 'button',
        ...restProps,
        baseClassName: classNames(styles.host, sizeY !== 'regular' && sizeYClassNames[sizeY], platform === 'ios' && styles.ios),
        children: [
            label && /*#__PURE__*/ _jsx(VisuallyHidden, {
                children: label
            }),
            children
        ]
    });
};

//# sourceMappingURL=IconButton.js.map