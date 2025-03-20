import { jsx as _jsx } from "react/jsx-runtime";
import * as React from 'react';
import { classNames } from '@vkontakte/vkjs';
import { useAdaptivity } from '../../hooks/useAdaptivity';
import { usePlatform } from '../../hooks/usePlatform';
import { DEFAULT_ACTIVE_EFFECT_DELAY } from '../Clickable/useState';
import { Tappable } from '../Tappable/Tappable';
import { SelectionControlLabel } from './SelectionControlLabel/SelectionControlLabel';
import styles from './SelectionControl.module.css';
const sizeYClassNames = {
    none: styles['SelectionControl--sizeY-none'],
    compact: styles['SelectionControl--sizeY-compact']
};
/**
 * @see https://vkcom.github.io/VKUI/#/SelectionControl
 */ export const SelectionControl = (restProps)=>{
    const { sizeY = 'none' } = useAdaptivity();
    const platform = usePlatform();
    return /*#__PURE__*/ _jsx(Tappable, {
        Component: "label",
        baseClassName: classNames(styles['SelectionControl'], sizeY !== 'regular' && sizeYClassNames[sizeY]),
        activeEffectDelay: platform === 'ios' ? 100 : DEFAULT_ACTIVE_EFFECT_DELAY,
        ...restProps
    });
};
SelectionControl.Label = SelectionControlLabel;

//# sourceMappingURL=SelectionControl.js.map