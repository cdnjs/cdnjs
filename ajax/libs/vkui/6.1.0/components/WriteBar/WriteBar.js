import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from 'react';
import { classNames, hasReactNode } from '@vkontakte/vkjs';
import { useExternRef } from '../../hooks/useExternRef';
import { usePlatform } from '../../hooks/usePlatform';
import { callMultiple } from '../../lib/callMultiple';
import { Headline } from '../Typography/Headline/Headline';
import { Title } from '../Typography/Title/Title';
const WriteBarTypography = (props)=>{
    const platform = usePlatform();
    if (platform === 'ios') {
        return /*#__PURE__*/ _jsx(Title, _object_spread_props(_object_spread({}, props), {
            level: "3",
            weight: "3"
        }));
    }
    return /*#__PURE__*/ _jsx(Headline, _object_spread({}, props));
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
    const textareaRef = useExternRef(getRef);
    const currentScrollHeight = React.useRef();
    const resize = React.useCallback(()=>{
        const textareaEl = textareaRef.current;
        if (!textareaEl) {
            return;
        }
        if (textareaEl.offsetParent) {
            textareaEl.style.height = '';
            textareaEl.style.height = `${textareaEl.scrollHeight}px`;
            if (textareaEl.scrollHeight !== currentScrollHeight.current && onHeightChange) {
                onHeightChange();
                currentScrollHeight.current = textareaEl.scrollHeight;
            }
        }
    }, [
        onHeightChange,
        textareaRef
    ]);
    React.useEffect(resize, [
        resize,
        platform
    ]);
    return /*#__PURE__*/ _jsx("div", {
        ref: getRootRef,
        className: classNames("vkuiWriteBar", platform === 'ios' && "vkuiWriteBar--ios", shadow && "vkuiWriteBar--shadow", className),
        style: style,
        children: /*#__PURE__*/ _jsxs("div", {
            className: "vkuiWriteBar__form",
            children: [
                hasReactNode(before) && /*#__PURE__*/ _jsx("div", {
                    className: "vkuiWriteBar__before",
                    children: before
                }),
                /*#__PURE__*/ _jsxs("div", {
                    className: "vkuiWriteBar__formIn",
                    children: [
                        /*#__PURE__*/ _jsx(WriteBarTypography, _object_spread_props(_object_spread({}, restProps), {
                            Component: "textarea",
                            className: "vkuiWriteBar__textarea",
                            onChange: callMultiple(onChange, resize),
                            getRootRef: textareaRef
                        })),
                        hasReactNode(inlineAfter) && /*#__PURE__*/ _jsx("div", {
                            className: "vkuiWriteBar__inlineAfter",
                            children: inlineAfter
                        })
                    ]
                }),
                hasReactNode(after) && /*#__PURE__*/ _jsx("div", {
                    className: "vkuiWriteBar__after",
                    children: after
                })
            ]
        })
    });
};

//# sourceMappingURL=WriteBar.js.map