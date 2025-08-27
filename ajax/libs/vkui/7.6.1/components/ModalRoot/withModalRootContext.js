'use client';
import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { jsx as _jsx } from "react/jsx-runtime";
/** TODO [>=8] Удалить HOC. */ import * as React from "react";
import { ModalRootContext } from "./ModalRootContext.js";
/**
 * @deprecated HOC не актуален и будет удалён в **VKUI v8**, так как вызывать `updateModalHeight()`
 *  для модальных окон с `dynamicContentHeight` больше не требуется.
 */ export function withModalRootContext(Component) {
    function WithModalRootContext(props) {
        const { updateModalHeight } = React.useContext(ModalRootContext);
        return /*#__PURE__*/ _jsx(Component, _object_spread_props(_object_spread({}, props), {
            updateModalHeight: updateModalHeight
        }));
    }
    return WithModalRootContext;
}

//# sourceMappingURL=withModalRootContext.js.map