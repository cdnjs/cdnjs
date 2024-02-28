import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import * as React from "react";
import { Icon28ArrowLeftOutline, Icon28ChevronBack, Icon28ChevronLeftOutline } from "@vkontakte/icons";
import { classNames } from "@vkontakte/vkjs";
import { useAdaptivity } from "../../hooks/useAdaptivity";
import { usePlatform } from "../../hooks/usePlatform";
import { SizeType } from "../../lib/adaptivity";
import { Platform } from "../../lib/platform";
import { PanelHeaderButton } from "../PanelHeaderButton/PanelHeaderButton";
/**
 * @see https://vkcom.github.io/VKUI/#/PanelHeaderButton
 */ export var PanelHeaderBack = function(_param) {
    var label = _param.label, tmp = _param["aria-label"], ariaLabel = tmp === void 0 ? "Назад" : tmp, className = _param.className, restProps = _object_without_properties(_param, [
        "label",
        "aria-label",
        "className"
    ]);
    var platform = usePlatform();
    var _useAdaptivity = useAdaptivity(), _useAdaptivity_sizeX = _useAdaptivity.sizeX, sizeX = _useAdaptivity_sizeX === void 0 ? "none" : _useAdaptivity_sizeX;
    // так-же label нужно скрывать при platform === Platform.IOS && sizeX === regular
    // https://github.com/VKCOM/VKUI/blob/master/src/components/PanelHeaderButton/PanelHeaderButton.css#L104
    var showLabel = platform === Platform.VKCOM || platform === Platform.IOS;
    var icon = /*#__PURE__*/ React.createElement(Icon28ArrowLeftOutline, null);
    switch(platform){
        case Platform.IOS:
            icon = /*#__PURE__*/ React.createElement(Icon28ChevronBack, null);
            break;
        case Platform.VKCOM:
            icon = /*#__PURE__*/ React.createElement(Icon28ChevronLeftOutline, null);
            break;
    }
    return /*#__PURE__*/ React.createElement(PanelHeaderButton, _object_spread_props(_object_spread({}, restProps), {
        className: classNames(sizeX === SizeType.COMPACT && "vkuiPanelHeaderBack--sizeX-compact", platform === Platform.IOS && "vkuiPanelHeaderBack--ios", platform === Platform.VKCOM && "vkuiPanelHeaderBack--vkcom", showLabel && !!label && "vkuiPanelHeaderBack--has-label", className),
        label: showLabel && label,
        "aria-label": ariaLabel
    }), icon);
};

//# sourceMappingURL=PanelHeaderBack.js.map