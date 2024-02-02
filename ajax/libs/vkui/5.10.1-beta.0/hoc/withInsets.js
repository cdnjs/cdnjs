import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import * as React from "react";
import { useInsets } from "../hooks/useInsets";
import { warnOnce } from "../lib/warnOnce";
var warn = warnOnce("withInsets");
/**
 * TODO [>=6]: удалить HOC (#5049)
 *
 * @deprecated v5.10.0
 */ export function withInsets(Component) {
    if (process.env.NODE_ENV === "development") {
        warn("[@vkontakte/vk-bridge] Интеграция VKUI с @vkontakte/vk-bridge устарела и будет удалена в v6. Используйте хук `useInsets()` из @vkontakte/vk-bridge-react, для получения инсетов (см. https://github.com/VKCOM/VKUI/issues/5049)"); // prettier-ignore
    }
    function WithInsets(props) {
        var insets = useInsets();
        return /*#__PURE__*/ React.createElement(Component, _object_spread_props(_object_spread({}, props), {
            insets: insets
        }));
    }
    return WithInsets;
}

//# sourceMappingURL=withInsets.js.map