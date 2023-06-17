import _object_spread from "@swc/helpers/src/_object_spread.mjs";
import _object_without_properties from "@swc/helpers/src/_object_without_properties.mjs";
import * as React from "react";
import { Icon24Reorder, Icon24ReorderIos } from "@vkontakte/icons";
import { classNames } from "@vkontakte/vkjs";
import { usePlatform } from "../../../hooks/usePlatform";
import { Platform } from "../../../lib/platform";
import { Touch } from "../../Touch/Touch";
export var CellDragger = function(_param) {
    var onDragStart = _param.onDragStart, onDragMove = _param.onDragMove, onDragEnd = _param.onDragEnd, className = _param.className, restProps = _object_without_properties(_param, [
        "onDragStart",
        "onDragMove",
        "onDragEnd",
        "className"
    ]);
    var platform = usePlatform();
    var onClick = React.useCallback(function(e) {
        e.preventDefault();
    }, []);
    return /*#__PURE__*/ React.createElement(Touch, _object_spread({
        className: classNames("vkuiCellDragger", className),
        onStart: onDragStart,
        onMoveY: onDragMove,
        onEnd: onDragEnd,
        onClick: onClick
    }, restProps), platform === Platform.IOS ? /*#__PURE__*/ React.createElement(Icon24ReorderIos, null) : /*#__PURE__*/ React.createElement(Icon24Reorder, null));
};

//# sourceMappingURL=CellDragger.js.map