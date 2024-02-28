import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import * as React from "react";
import { Icon24Attach, Icon24CheckCircleOutline, Icon24Send, Icon28AddCircleOutline, Icon28AttachOutline, Icon28CheckCircleOutline, Icon28Send, Icon48WritebarDone, Icon48WritebarSend } from "@vkontakte/icons";
import { classNames, hasReactNode } from "@vkontakte/vkjs";
import { usePlatform } from "../../hooks/usePlatform";
import { Platform } from "../../lib/platform";
import { COMMON_WARNINGS, warnOnce } from "../../lib/warnOnce";
import { AdaptiveIconRenderer } from "../AdaptiveIconRenderer/AdaptiveIconRenderer";
import { Counter } from "../Counter/Counter";
import { Tappable } from "../Tappable/Tappable";
var warn = warnOnce("WriteBarIcon");
/**
 * @see https://vkcom.github.io/VKUI/#/WriteBarIcon
 */ export var WriteBarIcon = function(_param) {
    var mode = _param.mode, children = _param.children, count = _param.count, className = _param.className, restProps = _object_without_properties(_param, [
        "mode",
        "children",
        "count",
        "className"
    ]);
    var platform = usePlatform();
    var modeLabel = undefined;
    var predefinedIcons;
    switch(mode){
        case "attach":
            predefinedIcons = {
                IconCompact: platform === Platform.IOS ? Icon28AddCircleOutline : Icon24Attach,
                IconRegular: platform === Platform.IOS ? Icon28AddCircleOutline : Icon28AttachOutline
            };
            modeLabel = "Прикрепить файл";
            break;
        case "send":
            predefinedIcons = {
                IconCompact: platform === Platform.IOS ? Icon48WritebarSend : Icon24Send,
                IconRegular: platform === Platform.IOS ? Icon48WritebarSend : Icon28Send
            };
            modeLabel = "Отправить";
            break;
        case "done":
            predefinedIcons = {
                IconCompact: platform === Platform.IOS ? Icon48WritebarDone : Icon24CheckCircleOutline,
                IconRegular: platform === Platform.IOS ? Icon48WritebarDone : Icon28CheckCircleOutline
            };
            modeLabel = "Готово";
            break;
        default:
            break;
    }
    if (process.env.NODE_ENV === "development") {
        var isAccessible = modeLabel || restProps["aria-label"] || restProps["aria-labelledby"];
        if (!isAccessible) {
            warn(COMMON_WARNINGS.a11y["button-name"], "error");
        }
    }
    return /*#__PURE__*/ React.createElement(Tappable, _object_spread_props(_object_spread({
        "aria-label": modeLabel
    }, restProps), {
        Component: "button",
        hasHover: false,
        activeMode: "vkuiWriteBarIcon__active",
        className: classNames("vkuiWriteBarIcon", platform === Platform.IOS && "vkuiWriteBarIcon--ios", mode === "send" && "vkuiWriteBarIcon--mode-send", mode === "done" && "vkuiWriteBarIcon--mode-done", className)
    }), /*#__PURE__*/ React.createElement("span", {
        className: "vkuiWriteBarIcon__in"
    }, predefinedIcons ? /*#__PURE__*/ React.createElement(AdaptiveIconRenderer, predefinedIcons) : children), hasReactNode(count) && /*#__PURE__*/ React.createElement(Counter, {
        className: "vkuiWriteBarIcon__counter",
        size: "s"
    }, count));
};

//# sourceMappingURL=WriteBarIcon.js.map