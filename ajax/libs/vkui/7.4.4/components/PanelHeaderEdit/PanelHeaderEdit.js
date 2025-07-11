'use client';
import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import { jsx as _jsx } from "react/jsx-runtime";
import * as React from "react";
import { Icon24DoneOutline, Icon24PenOutline, Icon28DoneOutline, Icon28EditOutline } from "@vkontakte/icons";
import { usePlatform } from "../../hooks/usePlatform.js";
import { AdaptiveIconRenderer } from "../AdaptiveIconRenderer/AdaptiveIconRenderer.js";
import { PanelHeaderButton } from "../PanelHeaderButton/PanelHeaderButton.js";
import { VisuallyHidden } from "../VisuallyHidden/VisuallyHidden.js";
/**
 * @see https://vkcom.github.io/VKUI/#/PanelHeaderButton
 */ export const PanelHeaderEdit = (_param)=>{
    var { isActive = false, editLabel = 'Редактировать', doneLabel = 'Готово' } = _param, restProps = _object_without_properties(_param, [
        "isActive",
        "editLabel",
        "doneLabel"
    ]);
    const platform = usePlatform();
    const label = isActive ? doneLabel : editLabel;
    return /*#__PURE__*/ _jsx(PanelHeaderButton, _object_spread_props(_object_spread({}, restProps), {
        label: platform === 'ios' ? label : label && /*#__PURE__*/ _jsx(VisuallyHidden, {
            children: label
        }),
        children: platform !== 'ios' && /*#__PURE__*/ _jsx(AdaptiveIconRenderer, {
            IconCompact: isActive ? Icon24DoneOutline : Icon24PenOutline,
            IconRegular: isActive ? Icon28DoneOutline : Icon28EditOutline
        })
    }));
};

//# sourceMappingURL=PanelHeaderEdit.js.map