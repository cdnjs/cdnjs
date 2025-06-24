'use client';
import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import { jsx as _jsx } from "react/jsx-runtime";
import * as React from "react";
import { classNames } from "@vkontakte/vkjs";
import { useIsomorphicLayoutEffect } from "../../../lib/useIsomorphicLayoutEffect.js";
import { RootComponent } from "../../RootComponent/RootComponent.js";
import { ImageBaseContext } from "../context.js";
import { mutableRemoveElement, resolveIndent } from "./helpers.js";
const positionPlacementClassNames = {
    'top-start': "vkuiImageBaseFloatElement__placementTopStart",
    'top': "vkuiImageBaseFloatElement__placementTop",
    'top-end': "vkuiImageBaseFloatElement__placementTopEnd",
    'bottom-start': "vkuiImageBaseFloatElement__placementBottomStart",
    'bottom': "vkuiImageBaseFloatElement__placementBottom",
    'bottom-end': "vkuiImageBaseFloatElement__placementBottomEnd",
    'middle-start': "vkuiImageBaseFloatElement__placementMiddleStart",
    'middle': "vkuiImageBaseFloatElement__placementMiddle",
    'middle-end': "vkuiImageBaseFloatElement__placementMiddleEnd"
};
const inlineIndentClassNames = {
    '2xs': "vkuiImageBaseFloatElement__inlineIndent2xs",
    'xs': "vkuiImageBaseFloatElement__inlineIndentXs",
    's': "vkuiImageBaseFloatElement__inlineIndentS",
    'm': "vkuiImageBaseFloatElement__inlineIndentM",
    'l': "vkuiImageBaseFloatElement__inlineIndentL",
    'xl': "vkuiImageBaseFloatElement__inlineIndentXl",
    '2xl': "vkuiImageBaseFloatElement__inlineIndent2xl",
    '3xl': "vkuiImageBaseFloatElement__inlineIndent3xl",
    '4xl': "vkuiImageBaseFloatElement__inlineIndent4xl"
};
const blockIndentClassNames = {
    '2xs': "vkuiImageBaseFloatElement__blockIndent2xs",
    'xs': "vkuiImageBaseFloatElement__blockIndentXs",
    's': "vkuiImageBaseFloatElement__blockIndentS",
    'm': "vkuiImageBaseFloatElement__blockIndentM",
    'l': "vkuiImageBaseFloatElement__blockIndentL",
    'xl': "vkuiImageBaseFloatElement__blockIndentXl",
    '2xl': "vkuiImageBaseFloatElement__blockIndent2xl",
    '3xl': "vkuiImageBaseFloatElement__blockIndent3xl",
    '4xl': "vkuiImageBaseFloatElement__blockIndent4xl"
};
export const ImageBaseFloatElement = (_param)=>{
    var { placement, visibility = 'always', style, className, inlineIndent, blockIndent } = _param, restProps = _object_without_properties(_param, [
        "placement",
        "visibility",
        "style",
        "className",
        "inlineIndent",
        "blockIndent"
    ]);
    const [hidden, setHidden] = React.useState(visibility !== 'always');
    const { onMouseOverHandlers, onMouseOutHandlers } = React.useContext(ImageBaseContext);
    useIsomorphicLayoutEffect(function resetHidden() {
        setHidden(visibility === 'on-hover');
    }, [
        visibility
    ]);
    useIsomorphicLayoutEffect(function addMouseHandlers() {
        if (visibility === 'on-hover') {
            const onMouseOver = ()=>setHidden(false);
            const onMouseOut = ()=>setHidden(true);
            onMouseOverHandlers.push(onMouseOver);
            onMouseOutHandlers.push(onMouseOut);
            return ()=>{
                mutableRemoveElement(onMouseOverHandlers, onMouseOver);
                mutableRemoveElement(onMouseOutHandlers, onMouseOut);
            };
        }
        return;
    }, [
        visibility
    ]);
    const [inlineIndentStyle, blockIndentStyle, inlineIndentClassName, blockIndentClassName] = React.useMemo(()=>{
        const [inlineIndentStyle, inlineIndentClassName] = resolveIndent(inlineIndent, '--vkui_internal--FloatElement_horizontal_indent', inlineIndentClassNames);
        const [blockIndentStyle, blockIndentClassName] = resolveIndent(blockIndent, '--vkui_internal--FloatElement_vertical_indent', blockIndentClassNames);
        return [
            inlineIndentStyle,
            blockIndentStyle,
            inlineIndentClassName,
            blockIndentClassName
        ];
    }, [
        inlineIndent,
        blockIndent
    ]);
    return /*#__PURE__*/ _jsx(RootComponent, _object_spread_props(_object_spread({}, restProps), {
        style: _object_spread({}, style, inlineIndentStyle, blockIndentStyle),
        className: classNames("vkuiImageBaseFloatElement__host", hidden && "vkuiImageBaseFloatElement__hidden", positionPlacementClassNames[placement], inlineIndentClassName, blockIndentClassName, className)
    }));
};

//# sourceMappingURL=ImageBaseFloatElement.js.map