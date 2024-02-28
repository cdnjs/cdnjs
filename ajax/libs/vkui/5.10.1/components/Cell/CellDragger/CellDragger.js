import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import * as React from "react";
import { Icon24Reorder, Icon24ReorderIos } from "@vkontakte/icons";
import { classNames } from "@vkontakte/vkjs";
import { useDraggableWithDomApi } from "../../../hooks/useDraggableWithDomApi";
import { usePlatform } from "../../../hooks/usePlatform";
import { Platform } from "../../../lib/platform";
import { useIsomorphicLayoutEffect } from "../../../lib/useIsomorphicLayoutEffect";
import { Touch } from "../../Touch/Touch";
export var CellDragger = function(_param) {
    var elRef = _param.elRef, disabled = _param.disabled, className = _param.className, onDragStateChange = _param.onDragStateChange, onDragFinish = _param.onDragFinish, restProps = _object_without_properties(_param, [
        "elRef",
        "disabled",
        "className",
        "onDragStateChange",
        "onDragFinish"
    ]);
    var platform = usePlatform();
    var Icon = platform === Platform.IOS ? Icon24ReorderIos : Icon24Reorder;
    var _useDraggableWithDomApi = useDraggableWithDomApi({
        elRef: elRef,
        onDragFinish: onDragFinish
    }), dragging = _useDraggableWithDomApi.dragging, onDragStart = _useDraggableWithDomApi.onDragStart, onDragMove = _useDraggableWithDomApi.onDragMove, onDragEnd = _useDraggableWithDomApi.onDragEnd;
    useIsomorphicLayoutEffect(function() {
        if (onDragStateChange) {
            onDragStateChange(dragging);
        }
    }, [
        dragging,
        onDragStateChange
    ]);
    return /*#__PURE__*/ React.createElement(Touch, _object_spread({
        className: classNames("vkuiCellDragger", className),
        onStart: disabled ? undefined : onDragStart,
        onMoveY: disabled ? undefined : onDragMove,
        onEnd: disabled ? undefined : onDragEnd
    }, restProps), /*#__PURE__*/ React.createElement(Icon, {
        className: "vkuiCellDragger__icon"
    }));
};

//# sourceMappingURL=CellDragger.js.map