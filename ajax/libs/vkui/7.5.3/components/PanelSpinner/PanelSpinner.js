import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import { jsx as _jsx } from "react/jsx-runtime";
import * as React from "react";
import { defineComponentDisplayNames } from "../../lib/react/defineComponentDisplayNames.js";
import { Spinner } from "../Spinner/Spinner.js";
/**
 * @see https://vkui.io/components/panel#panel-spinner
 */ // eslint-disable-next-line react/display-name -- используется defineComponentDisplayNames
export const PanelSpinner = /*#__PURE__*/ React.memo((_param)=>{
    var { height = 96, style } = _param, restProps = _object_without_properties(_param, [
        "height",
        "style"
    ]);
    return /*#__PURE__*/ _jsx(Spinner, _object_spread_props(_object_spread({
        size: "m"
    }, restProps), {
        style: _object_spread({
            height
        }, style)
    }));
});
if (process.env.NODE_ENV !== 'production') {
    defineComponentDisplayNames(PanelSpinner, 'PanelSpinner');
}

//# sourceMappingURL=PanelSpinner.js.map