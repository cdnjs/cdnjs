import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import * as React from 'react';
import { classNames } from '@vkontakte/vkjs';
import { useAdaptivity } from '../../hooks/useAdaptivity';
import { usePlatform } from '../../hooks/usePlatform';
import { hasAccessibleName } from '../../lib/accessibility';
import { COMMON_WARNINGS, warnOnce } from '../../lib/warnOnce';
import { Tappable } from '../Tappable/Tappable';
import { VisuallyHidden } from '../VisuallyHidden/VisuallyHidden';
const sizeYClassNames = {
    none: "vkuiIconButton--sizeY-none",
    compact: "vkuiIconButton--sizeY-compact"
};
const warn = warnOnce('IconButton');
/**
 * @see https://vkcom.github.io/VKUI/#/IconButton
 */ export const IconButton = (_param)=>{
    var { label, children, className } = _param, restProps = _object_without_properties(_param, [
        "label",
        "children",
        "className"
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
    return /*#__PURE__*/ React.createElement(Tappable, _object_spread_props(_object_spread({
        activeEffectDelay: 200,
        activeMode: "background",
        Component: restProps.href ? 'a' : 'button'
    }, restProps), {
        className: classNames("vkuiIconButton", sizeY !== 'regular' && sizeYClassNames[sizeY], platform === 'ios' && "vkuiIconButton--ios", className)
    }), label && /*#__PURE__*/ React.createElement(VisuallyHidden, null, label), children);
};

//# sourceMappingURL=IconButton.js.map