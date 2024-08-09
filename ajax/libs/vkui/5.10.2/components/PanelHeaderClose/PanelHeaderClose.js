import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import * as React from "react";
import { Icon28CancelOutline } from "@vkontakte/icons";
import { usePlatform } from "../../hooks/usePlatform";
import { Platform } from "../../lib/platform";
import { getTitleFromChildren } from "../../lib/utils";
import { PanelHeaderButton } from "../PanelHeaderButton/PanelHeaderButton";
/**
 * @see https://vkcom.github.io/VKUI/#/PanelHeaderButton
 */ export var PanelHeaderClose = function(_param) {
    var _param_children = _param.children, children = _param_children === void 0 ? "Отмена" : _param_children, restProps = _object_without_properties(_param, [
        "children"
    ]);
    var platform = usePlatform();
    return /*#__PURE__*/ React.createElement(PanelHeaderButton, _object_spread({
        "aria-label": getTitleFromChildren(children)
    }, restProps), platform === Platform.IOS ? children : /*#__PURE__*/ React.createElement(Icon28CancelOutline, null));
};

//# sourceMappingURL=PanelHeaderClose.js.map