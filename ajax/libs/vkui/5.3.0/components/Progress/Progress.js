import _object_spread from "@swc/helpers/src/_object_spread.mjs";
import _object_spread_props from "@swc/helpers/src/_object_spread_props.mjs";
import _object_without_properties from "@swc/helpers/src/_object_without_properties.mjs";
import * as React from "react";
import { classNames } from "@vkontakte/vkjs";
import { clamp } from "../../helpers/math";
var PROGRESS_MIN_VALUE = 0;
var PROGRESS_MAX_VALUE = 100;
/**
 * @see https://vkcom.github.io/VKUI/#/Progress
 */ export var Progress = function(_param) {
    var _param_value = _param.value, value = _param_value === void 0 ? 0 : _param_value, getRootRef = _param.getRootRef, className = _param.className, restProps = _object_without_properties(_param, [
        "value",
        "getRootRef",
        "className"
    ]);
    var progress = clamp(value, PROGRESS_MIN_VALUE, PROGRESS_MAX_VALUE);
    var title = "".concat(progress, " / ").concat(PROGRESS_MAX_VALUE);
    return /*#__PURE__*/ React.createElement("div", _object_spread_props(_object_spread({
        "aria-valuenow": value,
        title: title
    }, restProps), {
        role: "progressbar",
        "aria-valuemin": PROGRESS_MIN_VALUE,
        "aria-valuemax": PROGRESS_MAX_VALUE,
        ref: getRootRef,
        className: classNames("vkuiProgress", className)
    }), /*#__PURE__*/ React.createElement("div", {
        className: "vkuiProgress__in",
        style: {
            width: "".concat(progress, "%")
        }
    }));
};

//# sourceMappingURL=Progress.js.map