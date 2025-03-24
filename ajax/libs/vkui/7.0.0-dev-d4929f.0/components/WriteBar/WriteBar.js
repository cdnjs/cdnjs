'use client';
import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { classNames, hasReactNode } from "@vkontakte/vkjs";
import { useExternRef } from "../../hooks/useExternRef.js";
import { usePlatform } from "../../hooks/usePlatform.js";
import { callMultiple } from "../../lib/callMultiple.js";
import { useResizeTextarea } from "../Textarea/useResizeTextarea.js";
import { Headline } from "../Typography/Headline/Headline.js";
import { Title } from "../Typography/Title/Title.js";
const WriteBarTypography = (props)=>{
    const platform = usePlatform();
    if (platform === 'ios') {
        return /*#__PURE__*/ _jsx(Title, _object_spread_props(_object_spread({}, props), {
            level: "3",
            weight: "3"
        }));
    }
    return /*#__PURE__*/ _jsx(Headline, _object_spread({
        weight: "3"
    }, props));
};
/**
 * @see https://vkcom.github.io/VKUI/#/WriteBar
 */ export const WriteBar = (_param)=>{
    var { className, style, before, inlineAfter, after, getRootRef, getRef, onHeightChange, shadow = false, onChange } = _param, restProps = _object_without_properties(_param, [
        "className",
        "style",
        "before",
        "inlineAfter",
        "after",
        "getRootRef",
        "getRef",
        "onHeightChange",
        "shadow",
        "onChange"
    ]);
    const platform = usePlatform();
    const [refResizeTextarea, resize] = useResizeTextarea(onHeightChange, true);
    const textareaRef = useExternRef(getRef, refResizeTextarea);
    React.useEffect(resize, [
        resize,
        platform
    ]);
    return /*#__PURE__*/ _jsx("div", {
        ref: getRootRef,
        className: classNames("WriteBar__host--udgK6", platform === 'ios' && "WriteBar__ios--B5evb", shadow && "WriteBar__shadow--MKzPp", className),
        style: style,
        children: /*#__PURE__*/ _jsxs("div", {
            className: "WriteBar__form--xjBL-",
            children: [
                hasReactNode(before) && /*#__PURE__*/ _jsx("div", {
                    className: "WriteBar__before--0pEdm",
                    children: before
                }),
                /*#__PURE__*/ _jsxs("div", {
                    className: "WriteBar__formIn--vdz32",
                    children: [
                        /*#__PURE__*/ _jsx(WriteBarTypography, _object_spread_props(_object_spread({}, restProps), {
                            Component: "textarea",
                            className: "WriteBar__textarea--8uZaY",
                            onChange: callMultiple(onChange, resize),
                            getRootRef: textareaRef
                        })),
                        hasReactNode(inlineAfter) && /*#__PURE__*/ _jsx("div", {
                            className: "WriteBar__inlineAfter--pLMq3",
                            children: inlineAfter
                        })
                    ]
                }),
                hasReactNode(after) && /*#__PURE__*/ _jsx("div", {
                    className: "WriteBar__after--JWaDw",
                    children: after
                })
            ]
        })
    });
};

//# sourceMappingURL=WriteBar.js.map