import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import { _ as _sliced_to_array } from "@swc/helpers/_/_sliced_to_array";
import * as React from "react";
import { classNames } from "@vkontakte/vkjs";
import { RootComponent } from "../RootComponent/RootComponent";
import { ListContext } from "./ListContext";
/**
 * @see https://vkcom.github.io/VKUI/#/List
 */ export var List = function(_param) {
    var children = _param.children, restProps = _object_without_properties(_param, [
        "children"
    ]);
    var _React_useState = _sliced_to_array(React.useState(false), 2), isDragging = _React_useState[0], toggleDrag = _React_useState[1];
    return /*#__PURE__*/ React.createElement(RootComponent, _object_spread_props(_object_spread({
        role: "list"
    }, restProps), {
        baseClassName: classNames("vkuiList", isDragging && "vkuiInternalList--dragging")
    }), /*#__PURE__*/ React.createElement(ListContext.Provider, {
        value: React.useMemo(function() {
            return {
                toggleDrag: toggleDrag
            };
        }, [])
    }, children));
};

//# sourceMappingURL=List.js.map