import * as React from 'react';
import { Spinner } from '../Spinner/Spinner';
/**
 * @see https://vkcom.github.io/VKUI/#/PanelSpinner
 */ export const PanelSpinner = /*#__PURE__*/ React.memo(({ height = 96, style, ...restProps })=>/*#__PURE__*/ React.createElement(Spinner, {
        size: "regular",
        ...restProps,
        style: {
            height,
            ...style
        }
    }));
PanelSpinner.displayName = 'PanelSpinner';

//# sourceMappingURL=PanelSpinner.js.map