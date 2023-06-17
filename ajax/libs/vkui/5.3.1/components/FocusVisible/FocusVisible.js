import * as React from "react";
import { classNames } from "@vkontakte/vkjs";
/**
 * @see https://vkcom.github.io/VKUI/#/FocusVisible
 */ export var FocusVisible = function(param) {
    var mode = param.mode;
    return /*#__PURE__*/ React.createElement("span", {
        "aria-hidden": true,
        className: classNames("vkuiFocusVisible", {
            inside: "vkuiFocusVisible--mode-inside",
            outside: "vkuiFocusVisible--mode-outside"
        }[mode])
    });
};

//# sourceMappingURL=FocusVisible.js.map