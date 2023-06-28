import * as React from "react";
import { classNames } from "@vkontakte/vkjs";
/**
 * @see https://vkcom.github.io/VKUI/#/FocusVisible
 */ export var FocusVisible = function(param) {
    var visible = param.visible, mode = param.mode, thin = param.thin;
    return /*#__PURE__*/ React.createElement("span", {
        "aria-hidden": true,
        className: classNames("vkuiFocusVisible", visible && "vkuiFocusVisible--visible", thin && "vkuiFocusVisible--thin", {
            inside: "vkuiFocusVisible--mode-inside",
            outside: "vkuiFocusVisible--mode-outside",
            outline: "vkuiFocusVisible--mode-outline"
        }[mode])
    });
};

//# sourceMappingURL=FocusVisible.js.map