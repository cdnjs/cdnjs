'use client';
import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import { jsx as _jsx } from "react/jsx-runtime";
import * as React from "react";
import { classNames } from "@vkontakte/vkjs";
import { useAdaptivity } from "../../hooks/useAdaptivity.js";
import { usePlatform } from "../../hooks/usePlatform.js";
import { DEFAULT_ACTIVE_EFFECT_DELAY } from "../Clickable/useState.js";
import { Tappable } from "../Tappable/Tappable.js";
import { SelectionControlContext } from "./SelectionControlContext.js";
import { SelectionControlLabel } from "./SelectionControlLabel/SelectionControlLabel.js";
const sizeYClassNames = {
    none: "vkuiSelectionControl__sizeYNone",
    compact: "vkuiSelectionControl__sizeYCompact"
};
/**
 * @see https://vkui.io/components/selection-control
 */ export const SelectionControl = (_param)=>{
    var { noPadding = false, hoverMode: hoverModeProp, activeMode: activeModeProp } = _param, restProps = _object_without_properties(_param, [
        "noPadding",
        "hoverMode",
        "activeMode"
    ]);
    const { sizeY = 'none' } = useAdaptivity();
    const platform = usePlatform();
    const hoverMode = hoverModeProp || (noPadding ? 'opacity' : 'background');
    const activeMode = activeModeProp || (noPadding ? 'opacity' : 'background');
    return /*#__PURE__*/ _jsx(SelectionControlContext.Provider, {
        value: {
            noPadding
        },
        children: /*#__PURE__*/ _jsx(Tappable, _object_spread({
            Component: "label",
            baseClassName: classNames("vkuiSelectionControl__host", sizeY !== 'regular' && sizeYClassNames[sizeY], !noPadding && "vkuiSelectionControl__withPadding"),
            activeEffectDelay: platform === 'ios' ? 100 : DEFAULT_ACTIVE_EFFECT_DELAY,
            hoverMode: hoverMode,
            activeMode: activeMode
        }, restProps))
    });
};
SelectionControl.Label = SelectionControlLabel;

//# sourceMappingURL=SelectionControl.js.map