import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import * as React from "react";
import { classNames } from "@vkontakte/vkjs";
import { useExternRef } from "../../hooks/useExternRef";
import { warnOnce } from "../../lib/warnOnce";
var warn = warnOnce("VisuallyHiddenInput");
/**
 * @deprecated v5.4.0
 *
 * Компонент устарел и будет удален в v6. Используйте
 * `<VisuallyHidden Component="input" />`
 */ export var VisuallyHiddenInput = function(_param) {
    var getRef = _param.getRef, className = _param.className, getRootRef = _param.getRootRef, restProps = _object_without_properties(_param, [
        "getRef",
        "className",
        "getRootRef"
    ]);
    var visuallyHiddenInputRef = useExternRef(getRef, getRootRef);
    if (process.env.NODE_ENV === "development") {
        warn("Компонент устарел и будет удален в v6. Используйте https://vkcom.github.io/VKUI/#/VisuallyHidden");
    }
    return /*#__PURE__*/ React.createElement("input", _object_spread_props(_object_spread({}, restProps), {
        className: classNames("vkuiVisuallyHiddenInput", className),
        ref: visuallyHiddenInputRef
    }));
};

//# sourceMappingURL=VisuallyHiddenInput.js.map