'use client';
import { jsx as _jsx } from "react/jsx-runtime";
import * as React from "react";
import { classNames } from "@vkontakte/vkjs";
import { useAdaptivity } from "../../hooks/useAdaptivity.js";
import { usePlatform } from "../../hooks/usePlatform.js";
import { DEFAULT_ACTIVE_EFFECT_DELAY } from "../Clickable/useState.js";
import { Tappable } from "../Tappable/Tappable.js";
import { SelectionControlContext } from "./SelectionControlContext.js";
import { SelectionControlLabel } from "./SelectionControlLabel/SelectionControlLabel.js";
import styles from "./SelectionControl.module.css";
const sizeYClassNames = {
    none: styles.sizeYNone,
    compact: styles.sizeYCompact
};
/**
 * @see https://vkui.io/components/selection-control
 */ export const SelectionControl = ({ noPadding = false, hoverMode: hoverModeProp, activeMode: activeModeProp, ...restProps })=>{
    const { sizeY = 'none' } = useAdaptivity();
    const platform = usePlatform();
    const hoverMode = hoverModeProp || (noPadding ? 'opacity' : 'background');
    const activeMode = activeModeProp || (noPadding ? 'opacity' : 'background');
    return /*#__PURE__*/ _jsx(SelectionControlContext.Provider, {
        value: {
            noPadding
        },
        children: /*#__PURE__*/ _jsx(Tappable, {
            Component: "label",
            baseClassName: classNames(styles.host, sizeY !== 'regular' && sizeYClassNames[sizeY], !noPadding && styles.withPadding),
            activeEffectDelay: platform === 'ios' ? 100 : DEFAULT_ACTIVE_EFFECT_DELAY,
            hoverMode: hoverMode,
            activeMode: activeMode,
            ...restProps
        })
    });
};
SelectionControl.Label = SelectionControlLabel;

//# sourceMappingURL=SelectionControl.js.map