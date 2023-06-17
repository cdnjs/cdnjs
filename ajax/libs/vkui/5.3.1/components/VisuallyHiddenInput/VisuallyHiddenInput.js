import _object_spread from "@swc/helpers/src/_object_spread.mjs";
import _object_spread_props from "@swc/helpers/src/_object_spread_props.mjs";
import _object_without_properties from "@swc/helpers/src/_object_without_properties.mjs";
import * as React from "react";
import { classNames } from "@vkontakte/vkjs";
/**
 * @description
 * Обертка над обычным `<input/>`; дает
 * скрыть его визуально и оставить
 * доступным для ассистивных технологий.
 */ export var VisuallyHiddenInput = function(_param) {
    var getRef = _param.getRef, className = _param.className, restProps = _object_without_properties(_param, [
        "getRef",
        "className"
    ]);
    return /*#__PURE__*/ React.createElement("input", _object_spread_props(_object_spread({}, restProps), {
        className: classNames("vkuiVisuallyHiddenInput", className),
        ref: getRef
    }));
};

//# sourceMappingURL=VisuallyHiddenInput.js.map