'use client';
import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { Icon24Attach, Icon24CheckCircleOutline, Icon24Send, Icon28AddCircleOutline, Icon28AttachOutline, Icon28CheckCircleOutline, Icon28Send, Icon48WritebarDone, Icon48WritebarSend } from "@vkontakte/icons";
import { classNames, hasReactNode } from "@vkontakte/vkjs";
import { usePlatform } from "../../hooks/usePlatform.js";
import { hasAccessibleName } from "../../lib/accessibility.js";
import { COMMON_WARNINGS, warnOnce } from "../../lib/warnOnce.js";
import { AdaptiveIconRenderer } from "../AdaptiveIconRenderer/AdaptiveIconRenderer.js";
import { Counter } from "../Counter/Counter.js";
import { Tappable } from "../Tappable/Tappable.js";
import { VisuallyHidden } from "../VisuallyHidden/VisuallyHidden.js";
const predefinedLabel = {
    attach: 'Прикрепить файл',
    send: 'Отправить',
    done: 'Готово'
};
const warn = warnOnce('WriteBarIcon');
/**
 * @see https://vkcom.github.io/VKUI/#/WriteBarIcon
 */ export const WriteBarIcon = (_param)=>{
    var { mode, children, count, className, label: labelProp } = _param, restProps = _object_without_properties(_param, [
        "mode",
        "children",
        "count",
        "className",
        "label"
    ]);
    const platform = usePlatform();
    let predefinedIcons;
    switch(mode){
        case 'attach':
            predefinedIcons = {
                IconCompact: platform === 'ios' ? Icon28AddCircleOutline : Icon24Attach,
                IconRegular: platform === 'ios' ? Icon28AddCircleOutline : Icon28AttachOutline
            };
            break;
        case 'send':
            predefinedIcons = {
                IconCompact: platform === 'ios' ? Icon48WritebarSend : Icon24Send,
                IconRegular: platform === 'ios' ? Icon48WritebarSend : Icon28Send
            };
            break;
        case 'done':
            predefinedIcons = {
                IconCompact: platform === 'ios' ? Icon48WritebarDone : Icon24CheckCircleOutline,
                IconRegular: platform === 'ios' ? Icon48WritebarDone : Icon28CheckCircleOutline
            };
            break;
        default:
            break;
    }
    const label = labelProp !== null && labelProp !== void 0 ? labelProp : mode && predefinedLabel[mode];
    if (process.env.NODE_ENV === 'development') {
        /* istanbul ignore next: проверка в dev mode, тест на hasAccessibleName() есть в lib/accessibility.test.tsx */ const isAccessible = hasAccessibleName(_object_spread({
            children: [
                children,
                label
            ]
        }, restProps));
        if (!isAccessible) {
            warn(COMMON_WARNINGS.a11y['button-name'], 'error');
        }
    }
    return /*#__PURE__*/ _jsxs(Tappable, _object_spread_props(_object_spread({}, restProps), {
        Component: "button",
        hasHover: false,
        activeMode: "WriteBarIcon__active--Hz-au",
        className: classNames("WriteBarIcon__host--xgBUV", platform === 'ios' && "WriteBarIcon__ios--Ekmz7", mode === 'send' && "WriteBarIcon__modeSend---ctP0", mode === 'done' && "WriteBarIcon__modeDone--5yMHS", className),
        children: [
            /*#__PURE__*/ _jsxs("span", {
                className: "WriteBarIcon__in--2v1I1",
                children: [
                    label && /*#__PURE__*/ _jsx(VisuallyHidden, {
                        children: label
                    }),
                    predefinedIcons ? /*#__PURE__*/ _jsx(AdaptiveIconRenderer, _object_spread({}, predefinedIcons)) : children
                ]
            }),
            hasReactNode(count) && /*#__PURE__*/ _jsx(Counter, {
                className: "WriteBarIcon__counter--MvAPv",
                size: "s",
                children: count
            })
        ]
    }));
};

//# sourceMappingURL=WriteBarIcon.js.map