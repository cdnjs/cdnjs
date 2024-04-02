import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import * as React from 'react';
import { classNames, noop } from '@vkontakte/vkjs';
import { useAdaptivityHasPointer } from '../../../hooks/useAdaptivityHasPointer';
import { useAppearance } from '../../../hooks/useAppearance';
import { focusVisiblePresetModeClassNames } from '../../../hooks/useFocusVisibleClassName';
import { Tappable } from '../../Tappable/Tappable';
import { ImageBaseContext } from '../context';
import { validateOverlayIcon } from '../validators';
/**
 * Интерактивный оверлей над картинкой.
 */ export const ImageBaseOverlay = (_param)=>{
    var { className, theme: themeProp, visibility: visibilityProp, children, onClick: onClickProp } = _param, restProps = _object_without_properties(_param, [
        "className",
        "theme",
        "visibility",
        "children",
        "onClick"
    ]);
    const appearance = useAppearance();
    const hasPointer = useAdaptivityHasPointer();
    const theme = themeProp !== null && themeProp !== void 0 ? themeProp : appearance;
    const visibility = visibilityProp !== null && visibilityProp !== void 0 ? visibilityProp : hasPointer ? 'on-hover' : 'always';
    if (process.env.NODE_ENV === 'development') {
        if (children) {
            // eslint-disable-next-line react-hooks/rules-of-hooks
            const { size } = React.useContext(ImageBaseContext);
            validateOverlayIcon(size, {
                name: 'children',
                value: children
            });
        }
    }
    const onClick = (onClickProp !== null && onClickProp !== void 0 ? onClickProp : visibility === 'on-hover') ? noop : undefined;
    return /*#__PURE__*/ React.createElement(Tappable, _object_spread_props(_object_spread({}, restProps), {
        className: classNames("vkuiImageBaseOverlay", visibility === 'always' && "vkuiImageBaseOverlay--visible", theme === 'light' && "vkuiImageBaseOverlay--theme-light", theme === 'dark' && "vkuiImageBaseOverlay--theme-dark", className),
        hasHover: visibility === 'on-hover',
        hoverMode: visibility === 'on-hover' ? "vkuiImageBaseOverlay--visible" : undefined,
        focusVisibleMode: classNames(focusVisiblePresetModeClassNames['inside'], "vkuiImageBaseOverlay--visible"),
        hasActive: false,
        onClick: onClick
    }), children);
};

//# sourceMappingURL=ImageBaseOverlay.js.map