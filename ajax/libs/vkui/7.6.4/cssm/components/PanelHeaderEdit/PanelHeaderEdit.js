'use client';
import { jsx as _jsx } from "react/jsx-runtime";
import * as React from "react";
import { Icon24DoneOutline, Icon24PenOutline, Icon28DoneOutline, Icon28EditOutline } from "@vkontakte/icons";
import { usePlatform } from "../../hooks/usePlatform.js";
import { AdaptiveIconRenderer } from "../AdaptiveIconRenderer/AdaptiveIconRenderer.js";
import { PanelHeaderButton } from "../PanelHeaderButton/PanelHeaderButton.js";
import { VisuallyHidden } from "../VisuallyHidden/VisuallyHidden.js";
/**
 * @see https://vkui.io/components/panel-header#panel-header-edit
 */ export const PanelHeaderEdit = ({ isActive = false, editLabel = 'Редактировать', doneLabel = 'Готово', ...restProps })=>{
    const platform = usePlatform();
    const label = isActive ? doneLabel : editLabel;
    return /*#__PURE__*/ _jsx(PanelHeaderButton, {
        ...restProps,
        label: platform === 'ios' ? label : label && /*#__PURE__*/ _jsx(VisuallyHidden, {
            children: label
        }),
        children: platform !== 'ios' && /*#__PURE__*/ _jsx(AdaptiveIconRenderer, {
            IconCompact: isActive ? Icon24DoneOutline : Icon24PenOutline,
            IconRegular: isActive ? Icon28DoneOutline : Icon28EditOutline
        })
    });
};

//# sourceMappingURL=PanelHeaderEdit.js.map