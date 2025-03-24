import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import { jsx as _jsx } from "react/jsx-runtime";
import { Children } from "react";
import { classNames } from "@vkontakte/vkjs";
import { calculateGap, columnGapClassNames, rowGapClassNames } from "../../lib/layouts/index.js";
import { RootComponent } from "../RootComponent/RootComponent.js";
import { FlexItem } from "./FlexItem/FlexItem.js";
const justifyClassNames = {
    'start': "Flex__justifyStart--Ch9f-",
    'end': "Flex__justifyEnd--uToGQ",
    'center': "Flex__justifyCenter--5wi-9",
    'space-around': "Flex__justifySpaceAround--R44-4",
    'space-between': "Flex__justifySpaceBetween--how1L",
    'space-evenly': "Flex__justifySpaceEvenly--q-Ivt"
};
const alignClassNames = {
    start: "Flex__alignStart--BOYzh",
    end: "Flex__alignEnd--ukDr3",
    center: "Flex__alignCenter--YIWWD",
    stretch: "Flex__alignStretch--h7meb",
    baseline: "Flex__alignBaseline--90xga"
};
export const Flex = (_param)=>{
    var { gap, align, justify, margin = 'none', noWrap = false, direction = 'row', style: styleProp, reverse = false, children } = _param, props = _object_without_properties(_param, [
        "gap",
        "align",
        "justify",
        "margin",
        "noWrap",
        "direction",
        "style",
        "reverse",
        "children"
    ]);
    const withGaps = Children.count(children) > 1 && gap;
    const [rowGap, columnGap] = calculateGap(withGaps ? gap : undefined);
    return /*#__PURE__*/ _jsx(RootComponent, _object_spread_props(_object_spread({}, props), {
        baseClassName: classNames("Flex__host--U-0dc", !noWrap && "Flex__wrap--86xzZ", reverse && "Flex__reverse--Skgx8", direction !== 'row' && "Flex__directionColumn--k1v0h", margin !== 'none' && "Flex__marginAuto--Ctjx2", align && alignClassNames[align], justify && justifyClassNames[justify], withGaps && "Flex__withGaps--8HM8R", withGaps && getGapsPresets(rowGap, columnGap)),
        style: withGaps ? _object_spread({}, getGapsByUser(rowGap, columnGap), styleProp) : styleProp,
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