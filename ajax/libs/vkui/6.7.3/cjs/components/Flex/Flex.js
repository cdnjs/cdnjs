"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "Flex", {
    enumerable: true,
    get: function() {
        return Flex;
    }
});
const _object_spread = require("@swc/helpers/_/_object_spread");
const _object_spread_props = require("@swc/helpers/_/_object_spread_props");
const _object_without_properties = require("@swc/helpers/_/_object_without_properties");
const _jsxruntime = require("react/jsx-runtime");
const _react = require("react");
const _vkjs = require("@vkontakte/vkjs");
const _layouts = require("../../lib/layouts");
const _RootComponent = require("../RootComponent/RootComponent");
const _FlexItem = require("./FlexItem/FlexItem");
const justifyClassNames = {
    'start': "vkuiFlex--justify-start",
    'end': "vkuiFlex--justify-end",
    'center': "vkuiFlex--justify-center",
    'space-around': "vkuiFlex--justify-space-around",
    'space-between': "vkuiFlex--justify-space-between",
    'space-evenly': "vkuiFlex--justify-space-evenly"
};
const alignClassNames = {
    start: "vkuiFlex--align-start",
    end: "vkuiFlex--align-end",
    center: "vkuiFlex--align-center",
    stretch: "vkuiFlex--align-stretch",
    baseline: "vkuiFlex--align-baseline"
};
const Flex = (_param)=>{
    var { gap, align, justify, margin = 'none', noWrap = false, direction = 'row', style: styleProp, reverse = false, children } = _param, props = _object_without_properties._(_param, [
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
    const withGaps = _react.Children.count(children) > 1 && gap;
    const [columnGap, rowGap] = (0, _layouts.calculateGap)(withGaps ? gap : undefined);
    return /*#__PURE__*/ (0, _jsxruntime.jsx)(_RootComponent.RootComponent, _object_spread_props._(_object_spread._({}, props), {
        baseClassName: (0, _vkjs.classNames)("vkuiFlex", !noWrap && "vkuiFlex--wrap", reverse && "vkuiFlex--reverse", direction !== 'row' && "vkuiFlex--direction-column", margin !== 'none' && "vkuiFlex--margin-auto", align && alignClassNames[align], justify && justifyClassNames[justify], withGaps && "vkuiFlex--withGaps", withGaps && getGapsPresets(rowGap, columnGap)),
        style: withGaps ? _object_spread._({}, getGapsByUser(rowGap, columnGap), styleProp) : styleProp,
        children: children
    }));
};
function getGapsPresets(rowGap, columnGap) {
    return (0, _vkjs.classNames)(typeof rowGap === 'string' && _layouts.rowGapClassNames[rowGap], typeof columnGap === 'string' && _layouts.columnGapClassNames[columnGap]);
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
Flex.Item = _FlexItem.FlexItem;

//# sourceMappingURL=Flex.js.map