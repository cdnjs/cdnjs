import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from 'react';
import { Icon20ChevronLeftOutline, Icon24ArrowLeftOutline, Icon28ArrowLeftOutline, Icon28ChevronBack, Icon28ChevronLeftOutline } from '@vkontakte/icons';
import { classNames } from '@vkontakte/vkjs';
import { useAdaptivity } from '../../hooks/useAdaptivity';
import { usePlatform } from '../../hooks/usePlatform';
import { AdaptiveIconRenderer } from '../AdaptiveIconRenderer/AdaptiveIconRenderer';
import { PanelHeaderButton } from '../PanelHeaderButton/PanelHeaderButton';
import { VisuallyHidden } from '../VisuallyHidden/VisuallyHidden';
const getBackIcon = (platform)=>{
    switch(platform){
        case 'ios':
            return /*#__PURE__*/ _jsx(Icon28ChevronBack, {});
        case 'vkcom':
            return /*#__PURE__*/ _jsx(AdaptiveIconRenderer, {
                IconCompact: Icon20ChevronLeftOutline,
                IconRegular: Icon28ChevronLeftOutline
            });
        default:
            return /*#__PURE__*/ _jsx(AdaptiveIconRenderer, {
                IconCompact: Icon24ArrowLeftOutline,
                IconRegular: Icon28ArrowLeftOutline
            });
    }
};
/**
 * @see https://vkcom.github.io/VKUI/#/PanelHeaderButton
 */ export const PanelHeaderBack = (_param)=>{
    var { label, className, children = 'Назад' } = _param, restProps = _object_without_properties(_param, [
        "label",
        "className",
        "children"
    ]);
    const platform = usePlatform();
    const { sizeX = 'none' } = useAdaptivity();
    // также label нужно скрывать при platform === 'ios' && sizeX === regular
    // https://github.com/VKCOM/VKUI/blob/master/src/components/PanelHeaderButton/PanelHeaderButton.css#L104
    const showLabel = platform === 'vkcom' || platform === 'ios';
    return /*#__PURE__*/ _jsxs(PanelHeaderButton, _object_spread_props(_object_spread({}, restProps), {
        className: classNames(sizeX === 'compact' && "vkuiPanelHeaderBack--sizeX-compact", platform === 'ios' && "vkuiPanelHeaderBack--ios", platform === 'vkcom' && "vkuiPanelHeaderBack--vkcom", showLabel && !!label && "vkuiPanelHeaderBack--has-label", className),
        label: showLabel && label,
        children: [
            children && /*#__PURE__*/ _jsx(VisuallyHidden, {
                children: children
            }),
            getBackIcon(platform)
        ]
    }));
};

//# sourceMappingURL=PanelHeaderBack.js.map