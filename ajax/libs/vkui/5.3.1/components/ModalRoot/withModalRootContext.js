import _object_spread from "@swc/helpers/src/_object_spread.mjs";
import _object_spread_props from "@swc/helpers/src/_object_spread_props.mjs";
import * as React from "react";
import { ModalRootContext } from "./ModalRootContext";
export function withModalRootContext(Component) {
    var WithModalRootContext = function WithModalRootContext(props) {
        var updateModalHeight = React.useContext(ModalRootContext).updateModalHeight;
        return /*#__PURE__*/ React.createElement(Component, _object_spread_props(_object_spread({}, props), {
            updateModalHeight: updateModalHeight
        }));
    };
    return WithModalRootContext;
}

//# sourceMappingURL=withModalRootContext.js.map