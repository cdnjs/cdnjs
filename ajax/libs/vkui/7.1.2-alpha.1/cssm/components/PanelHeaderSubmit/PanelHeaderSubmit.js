'use client';
import { jsx as _jsx } from "react/jsx-runtime";
import { Icon24DoneOutline, Icon28DoneOutline } from "@vkontakte/icons";
import { usePlatform } from "../../hooks/usePlatform.js";
import { AdaptiveIconRenderer } from "../AdaptiveIconRenderer/AdaptiveIconRenderer.js";
import { PanelHeaderButton } from "../PanelHeaderButton/PanelHeaderButton.js";
import { VisuallyHidden } from "../VisuallyHidden/VisuallyHidden.js";
/**
 * @see https://vkcom.github.io/VKUI/#/PanelHeaderButton
 */ export const PanelHeaderSubmit = ({ label = 'Готово', ...restProps })=>{
    const platform = usePlatform();
    return /*#__PURE__*/ _jsx(PanelHeaderButton, {
        primary: true,
        label: platform === 'ios' ? label : label && /*#__PURE__*/ _jsx(VisuallyHidden, {
            children: label
        }),
        ...restProps,
        children: platform !== 'ios' && /*#__PURE__*/ _jsx(AdaptiveIconRenderer, {
            IconCompact: Icon24DoneOutline,
            IconRegular: Icon28DoneOutline
        })
    });
};

//# sourceMappingURL=PanelHeaderSubmit.js.map