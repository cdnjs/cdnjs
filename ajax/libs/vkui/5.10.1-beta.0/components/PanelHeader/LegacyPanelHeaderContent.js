import * as React from "react";
import { usePlatform } from "../../hooks/usePlatform";
import { Platform } from "../../lib/platform";
import { warnOnce } from "../../lib/warnOnce";
import { Text } from "../Typography/Text/Text";
var warn = warnOnce("PanelHeader");
/**
 * TODO [>=6]: Удалить подкомпонент
 * @deprecated
 */ export var LegacyPanelHeaderContent = function(param) {
    var children = param.children, _param_Component = param.Component, Component = _param_Component === void 0 ? "span" : _param_Component, id = param.id;
    if (process.env.NODE_ENV === "development") {
        warn("Подкомпонент PanelHeader.Content устарел и будет удалён в v6. Используйте параметр typographyProps.");
    }
    var platform = usePlatform();
    return platform === Platform.VKCOM ? /*#__PURE__*/ React.createElement(Text, {
        weight: "2",
        Component: Component,
        id: id
    }, children) : /*#__PURE__*/ React.createElement(Component, {
        className: "vkuiPanelHeader__content-in",
        id: id
    }, children);
};
LegacyPanelHeaderContent.displayName = "LegacyPanelHeaderContent";

//# sourceMappingURL=LegacyPanelHeaderContent.js.map