'use client';
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
import styles from "../PanelHeaderButton/PanelHeaderButton.module.css";
const sizeXClassNames = {
    none: styles.backSizeXNone,
    compact: styles.backSizeXCompact
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
 * @see https://vkui.io/components/panel-header#panel-header-back
 */ export const PanelHeaderBack = ({ label = 'Назад', className, hideLabelOnVKCom = false, hideLabelOnIOS = false, ...restProps })=>{
    const platform = usePlatform();
    const direction = useConfigDirection();
    const { sizeX = 'none' } = useAdaptivity();
    // также label нужно скрывать при platform === 'ios' && sizeX === regular
    // https://github.com/VKCOM/VKUI/blob/master/src/components/PanelHeaderButton/PanelHeaderButton.css#L104
    const showLabel = platform === 'vkcom' && !hideLabelOnVKCom || platform === 'ios' && !hideLabelOnIOS;
    return /*#__PURE__*/ _jsx(PanelHeaderButton, {
        ...restProps,
        className: classNames(sizeX !== 'regular' && sizeXClassNames[sizeX], platform === 'ios' && styles.backIos, platform === 'vkcom' && styles.backVkcom, showLabel && !!label && styles.backHasLabel, direction === 'rtl' && styles.rtl, className),
        label: showLabel ? label : label && /*#__PURE__*/ _jsx(VisuallyHidden, {
            children: label
        }),
        children: getBackIcon(platform)
    });
};

//# sourceMappingURL=PanelHeaderBack.js.map