import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import { _ as _sliced_to_array } from "@swc/helpers/_/_sliced_to_array";
import * as React from "react";
import { classNames } from "@vkontakte/vkjs";
import { ListContext } from "./ListContext";
/**
 * @see https://vkcom.github.io/VKUI/#/List
 */ export var List = function(_param) {
    var children = _param.children, className = _param.className, restProps = _object_without_properties(_param, [
        "children",
        "className"
    ]);
    var _React_useState = _sliced_to_array(React.useState(false), 2), isDragging = _React_useState[0], toggleDrag = _React_useState[1];
    return /*#__PURE__*/ React.createElement("div", _object_spread_props(_object_spread({
        role: "list"
    }, restProps), {
        className: classNames("vkuiList", isDragging && "vkuiInternalList--dragging", className)
    }), /*#__PURE__*/ React.createElement(ListContext.Provider, {
        value: React.useMemo(function() {
            return {
                toggleDrag: toggleDrag
            };
        }, [])
    }, children));
};

//# sourceMappingURL=List.js.map