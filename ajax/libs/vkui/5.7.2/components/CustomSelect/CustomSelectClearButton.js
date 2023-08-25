import * as React from "react";
import { Icon16Cancel } from "@vkontakte/icons";
import { stopPropagation } from "../../lib/utils";
import { IconButton } from "../IconButton/IconButton";
export var CustomSelectClearButton = function(param) {
    var className = param.className, onClick = param.onClick;
    return /*#__PURE__*/ React.createElement(IconButton, {
        className: className,
        Component: "div",
        onClick: function(e) {
            stopPropagation(e);
            onClick();
        },
        "aria-label": "Очистить поле",
        onKeyDown: stopPropagation,
        role: "button",
        activeMode: "opacity",
        hoverMode: "opacity"
    }, /*#__PURE__*/ React.createElement(Icon16Cancel, null));
};

//# sourceMappingURL=CustomSelectClearButton.js.map