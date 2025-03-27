'use client';
import { jsx as _jsx } from "react/jsx-runtime";
import * as React from "react";
import { classNames } from "@vkontakte/vkjs";
import { useAdaptivity } from "../../hooks/useAdaptivity.js";
import { usePlatform } from "../../hooks/usePlatform.js";
import { DEFAULT_ACTIVE_EFFECT_DELAY } from "../Clickable/useState.js";
import { Tappable } from "../Tappable/Tappable.js";
import { SelectionControlLabel } from "./SelectionControlLabel/SelectionControlLabel.js";
import styles from "./SelectionControl.module.css";
const sizeYClassNames = {
    none: styles.sizeYNone,
    compact: styles.sizeYCompact
};
/**
 * @see https://vkcom.github.io/VKUI/#/SelectionControl
 */ export const SelectionControl = (restProps)=>{
    const { sizeY = 'none' } = useAdaptivity();
    const platform = usePlatform();
    return /*#__PURE__*/ _jsx(Tappable, {
        Component: "label",
        baseClassName: classNames(styles.host, sizeY !== 'regular' && sizeYClassNames[sizeY]),
        activeEffectDelay: platform === 'ios' ? 100 : DEFAULT_ACTIVE_EFFECT_DELAY,
        ...restProps
    });
};
SelectionControl.Label = SelectionControlLabel;

//# sourceMappingURL=SelectionControl.js.map