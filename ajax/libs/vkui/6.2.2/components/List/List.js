import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { DATA_DRAGGABLE_PLACEHOLDER_REACT_PROP } from '../../hooks/useDraggableWithDomApi';
import { RootComponent } from '../RootComponent/RootComponent';
/**
 * @see https://vkcom.github.io/VKUI/#/List
 */ export const List = (_param)=>{
    var { children } = _param, restProps = _object_without_properties(_param, [
        "children"
    ]);
    return /*#__PURE__*/ _jsxs(RootComponent, _object_spread_props(_object_spread({
        role: "list"
    }, restProps), {
        children: [
            children,
            /*#__PURE__*/ _jsx("div", _object_spread({
                "aria-hidden": true
            }, DATA_DRAGGABLE_PLACEHOLDER_REACT_PROP))
        ]
    }));
};

//# sourceMappingURL=List.js.map