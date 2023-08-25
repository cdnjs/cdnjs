import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import * as React from "react";
import { Icon24Reorder, Icon24ReorderIos } from "@vkontakte/icons";
import { classNames } from "@vkontakte/vkjs";
import { usePlatform } from "../../../hooks/usePlatform";
import { Platform } from "../../../lib/platform";
import { Touch } from "../../Touch/Touch";
export var CellDragger = function(_param) {
    var onDragStart = _param.onDragStart, onDragMove = _param.onDragMove, onDragEnd = _param.onDragEnd, onClick = _param.onClick, className = _param.className, restProps = _object_without_properties(_param, [
        "onDragStart",
        "onDragMove",
        "onDragEnd",
        "onClick",
        "className"
    ]);
    var platform = usePlatform();
    var handleClick = function(event) {
        event.preventDefault();
        if (onClick) {
            onClick(event);
        }
    };
    return /*#__PURE__*/ React.createElement(Touch, _object_spread({
        className: classNames("vkuiCellDragger", className),
        onStart: onDragStart,
        onMoveY: onDragMove,
        onEnd: onDragEnd,
        onClick: handleClick
    }, restProps), platform === Platform.IOS ? /*#__PURE__*/ React.createElement(Icon24ReorderIos, null) : /*#__PURE__*/ React.createElement(Icon24Reorder, null));
};

//# sourceMappingURL=CellDragger.js.map