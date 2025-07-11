import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import { jsx as _jsx } from "react/jsx-runtime";
import { classNames } from "@vkontakte/vkjs";
import { calculateGap, columnGapClassNames, rowGapClassNames } from "../../lib/layouts/index.js";
import { RootComponent } from "../RootComponent/RootComponent.js";
import { FlexItem } from "./FlexItem/FlexItem.js";
const justifyClassNames = {
    'start': "vkuiFlex__justifyStart",
    'end': "vkuiFlex__justifyEnd",
    'center': "vkuiFlex__justifyCenter",
    'space-around': "vkuiFlex__justifySpaceAround",
    'space-between': "vkuiFlex__justifySpaceBetween",
    'space-evenly': "vkuiFlex__justifySpaceEvenly"
};
const alignClassNames = {
    start: "vkuiFlex__alignStart",
    end: "vkuiFlex__alignEnd",
    center: "vkuiFlex__alignCenter",
    stretch: "vkuiFlex__alignStretch",
    baseline: "vkuiFlex__alignBaseline"
};
export const Flex = (_param)=>{
    var { gap = 0, align, justify, margin = 'none', noWrap = false, direction = 'row', reverse = false, children } = _param, props = _object_without_properties(_param, [
        "gap",
        "align",
        "justify",
        "margin",
        "noWrap",
        "direction",
        "reverse",
        "children"
    ]);
    const [rowGap, columnGap] = calculateGap(gap);
    return /*#__PURE__*/ _jsx(RootComponent, _object_spread_props(_object_spread({}, props), {
        baseClassName: classNames("vkuiFlex__host", !noWrap && "vkuiFlex__wrap", reverse && "vkuiFlex__reverse", direction !== 'row' && "vkuiFlex__directionColumn", margin !== 'none' && "vkuiFlex__marginAuto", align && alignClassNames[align], justify && justifyClassNames[justify], getGapsPresets(rowGap, columnGap)),
        baseStyle: getGapsByUser(rowGap, columnGap),
        children: children
    }));
};
function getGapsPresets(rowGap, columnGap) {
    return classNames(typeof rowGap === 'string' && rowGapClassNames[rowGap], typeof columnGap === 'string' && columnGapClassNames[columnGap]);
}
function getGapsByUser(rowGap, columnGap) {
    const style = {};
    if (typeof rowGap === 'number') {
        style['--vkui_internal--row_gap'] = `${rowGap}px`;
    }
    if (typeof columnGap === 'number') {
        style['--vkui_internal--column_gap'] = `${columnGap}px`;
    }
    return style;
}
Flex.Item = FlexItem;

//# sourceMappingURL=Flex.js.map