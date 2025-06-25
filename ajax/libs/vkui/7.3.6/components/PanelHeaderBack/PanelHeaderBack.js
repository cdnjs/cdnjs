'use client';
import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import { jsx as _jsx } from "react/jsx-runtime";
import * as React from "react";
import { Icon20ChevronLeftOutline, Icon24ArrowLeftOutline, Icon28ArrowLeftOutline, Icon28ChevronBack, Icon28ChevronLeftOutline } from "@vkontakte/icons";
import { classNames } from "@vkontakte/vkjs";
import { useAdaptivity } from "../../hooks/useAdaptivity.js";
import { useConfigDirection } from "../../hooks/useConfigDirection.js";
import { usePlatform } from "../../hooks/usePlatform.js";
import { AdaptiveIconRenderer } from "../AdaptiveIconRenderer/AdaptiveIconRenderer.js";
import { PanelHeaderButton } from "../PanelHeaderButton/PanelHeaderButton.js";
import { VisuallyHidden } from "../VisuallyHidden/VisuallyHidden.js";
const sizeXClassNames = {
    none: "vkuiPanelHeaderButton__backSizeXNone",
    compact: "vkuiPanelHeaderButton__backSizeXCompact"
};
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
    var { label = 'Назад', className, hideLabelOnVKCom = false, hideLabelOnIOS = false } = _param, restProps = _object_without_properties(_param, [
        "label",
        "className",
        "hideLabelOnVKCom",
        "hideLabelOnIOS"
    ]);
    const platform = usePlatform();
    const direction = useConfigDirection();
    const { sizeX = 'none' } = useAdaptivity();
    // также label нужно скрывать при platform === 'ios' && sizeX === regular
    // https://github.com/VKCOM/VKUI/blob/master/src/components/PanelHeaderButton/PanelHeaderButton.css#L104
    const showLabel = platform === 'vkcom' && !hideLabelOnVKCom || platform === 'ios' && !hideLabelOnIOS;
    return /*#__PURE__*/ _jsx(PanelHeaderButton, _object_spread_props(_object_spread({}, restProps), {
        className: classNames(sizeX !== 'regular' && sizeXClassNames[sizeX], platform === 'ios' && "vkuiPanelHeaderButton__backIos", platform === 'vkcom' && "vkuiPanelHeaderButton__backVkcom", showLabel && !!label && "vkuiPanelHeaderButton__backHasLabel", direction === 'rtl' && "vkuiPanelHeaderButton__rtl", className),
        label: showLabel ? label : label && /*#__PURE__*/ _jsx(VisuallyHidden, {
            children: label
        }),
        children: getBackIcon(platform)
    }));
};

//# sourceMappingURL=PanelHeaderBack.js.map