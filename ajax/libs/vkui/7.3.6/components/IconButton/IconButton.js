'use client';
import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { classNames } from "@vkontakte/vkjs";
import { useAdaptivity } from "../../hooks/useAdaptivity.js";
import { usePlatform } from "../../hooks/usePlatform.js";
import { hasAccessibleName } from "../../lib/accessibility.js";
import { COMMON_WARNINGS, warnOnce } from "../../lib/warnOnce.js";
import { Tappable } from "../Tappable/Tappable.js";
import { VisuallyHidden } from "../VisuallyHidden/VisuallyHidden.js";
const sizeYClassNames = {
    none: "vkuiIconButton__sizeYNone",
    compact: "vkuiIconButton__sizeYCompact"
};
const warn = warnOnce('IconButton');
/**
 * @see https://vkcom.github.io/VKUI/#/IconButton
 */ export const IconButton = (_param)=>{
    var { label, children } = _param, restProps = _object_without_properties(_param, [
        "label",
        "children"
    ]);
    const platform = usePlatform();
    const { sizeY = 'none' } = useAdaptivity();
    if (process.env.NODE_ENV === 'development') {
        /* istanbul ignore next: проверка в dev mode, тест на hasAccessibleName() есть в lib/accessibility.test.tsx */ const isAccessible = hasAccessibleName(_object_spread({
            children: [
                children,
                label
            ]
        }, restProps));
        if (!isAccessible) {
            warn(COMMON_WARNINGS.a11y[restProps.href ? 'link-name' : 'button-name'], 'error');
        }
    }
    return /*#__PURE__*/ _jsxs(Tappable, _object_spread_props(_object_spread({
        activeEffectDelay: 200,
        activeMode: "background",
        Component: restProps.href ? 'a' : 'button'
    }, restProps), {
        baseClassName: classNames("vkuiIconButton__host", sizeY !== 'regular' && sizeYClassNames[sizeY], platform === 'ios' && "vkuiIconButton__ios"),
        children: [
            label && /*#__PURE__*/ _jsx(VisuallyHidden, {
                children: label
            }),
            children
        ]
    }));
};

//# sourceMappingURL=IconButton.js.map