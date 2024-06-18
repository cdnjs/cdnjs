import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import * as React from 'react';
import { DATA_DRAGGABLE_PLACEHOLDER_REACT_PROP } from '../../hooks/useDraggableWithDomApi';
import { RootComponent } from '../RootComponent/RootComponent';
/**
 * @see https://vkcom.github.io/VKUI/#/List
 */ export const List = (_param)=>{
    var { children } = _param, restProps = _object_without_properties(_param, [
        "children"
    ]);
    return /*#__PURE__*/ React.createElement(RootComponent, _object_spread({
        role: "list"
    }, restProps), children, /*#__PURE__*/ React.createElement("div", _object_spread({
        "aria-hidden": true
    }, DATA_DRAGGABLE_PLACEHOLDER_REACT_PROP)));
};

//# sourceMappingURL=List.js.map