import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import * as React from 'react';
import { hasReactNode } from '@vkontakte/vkjs';
import { Clickable } from '../../Clickable/Clickable';
import { Headline } from '../../Typography/Headline/Headline';
import { VisuallyHidden } from '../../VisuallyHidden/VisuallyHidden';
/**
 * @see https://vkcom.github.io/VKUI/#/SegmentedControl
 */ export const SegmentedControlOption = (_param)=>{
    var { getRef, className, style, children, getRootRef, before } = _param, restProps = _object_without_properties(_param, [
        "getRef",
        "className",
        "style",
        "children",
        "getRootRef",
        "before"
    ]);
    return /*#__PURE__*/ React.createElement(Clickable, {
        Component: "label",
        baseClassName: "vkuiSegmentedControlOption",
        hoverClassName: "vkuiSegmentedControlOption--hover",
        activeClassName: "vkuiSegmentedControlOption--hover",
        className: className,
        getRootRef: getRootRef,
        style: style
    }, /*#__PURE__*/ React.createElement(VisuallyHidden, _object_spread_props(_object_spread({}, restProps), {
        Component: "input",
        getRootRef: getRef,
        type: "radio"
    })), hasReactNode(before) && /*#__PURE__*/ React.createElement("div", {
        className: "vkuiSegmentedControlOption__before"
    }, before), /*#__PURE__*/ React.createElement(Headline, {
        level: "2",
        weight: "2"
    }, children));
};

//# sourceMappingURL=SegmentedControlOption.js.map