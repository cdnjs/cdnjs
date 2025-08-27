import { jsx as _jsx } from "react/jsx-runtime";
import * as React from "react";
import { defineComponentDisplayNames } from "../../lib/react/defineComponentDisplayNames.js";
import { Spinner } from "../Spinner/Spinner.js";
/**
 * @see https://vkui.io/components/panel#panel-spinner
 */ // eslint-disable-next-line react/display-name -- используется defineComponentDisplayNames
export const PanelSpinner = /*#__PURE__*/ React.memo(({ height = 96, style, ...restProps })=>/*#__PURE__*/ _jsx(Spinner, {
        size: "m",
        ...restProps,
        style: {
            height,
            ...style
        }
    }));
if (process.env.NODE_ENV !== 'production') {
    defineComponentDisplayNames(PanelSpinner, 'PanelSpinner');
}

//# sourceMappingURL=PanelSpinner.js.map