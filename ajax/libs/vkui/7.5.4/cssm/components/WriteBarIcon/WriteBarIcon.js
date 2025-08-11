'use client';
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
import styles from "./WriteBarIcon.module.css";
const predefinedLabel = {
    attach: 'Прикрепить файл',
    send: 'Отправить',
    done: 'Готово'
};
const warn = warnOnce('WriteBarIcon');
/**
 * @see https://vkui.io/components/write-bar#write-bar-icon
 */ export const WriteBarIcon = ({ mode, children, count, label: labelProp, ...restProps })=>{
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
    const label = labelProp ?? (mode && predefinedLabel[mode]);
    if (process.env.NODE_ENV === 'development') {
        /* istanbul ignore next: проверка в dev mode, тест на hasAccessibleName() есть в lib/accessibility.test.tsx */ const isAccessible = hasAccessibleName({
            children: [
                children,
                label
            ],
            ...restProps
        });
        if (!isAccessible) {
            warn(COMMON_WARNINGS.a11y['button-name'], 'error');
        }
    }
    return /*#__PURE__*/ _jsxs(Tappable, {
        Component: "button",
        hasHover: false,
        activeMode: styles.active,
        ...restProps,
        baseClassName: classNames(styles.host, platform === 'ios' && styles.ios, mode === 'send' && styles.modeSend, mode === 'done' && styles.modeDone),
        children: [
            /*#__PURE__*/ _jsxs("span", {
                className: styles.in,
                children: [
                    label && /*#__PURE__*/ _jsx(VisuallyHidden, {
                        children: label
                    }),
                    predefinedIcons ? /*#__PURE__*/ _jsx(AdaptiveIconRenderer, {
                        ...predefinedIcons
                    }) : children
                ]
            }),
            hasReactNode(count) && /*#__PURE__*/ _jsx(Counter, {
                className: styles.counter,
                size: "s",
                children: count
            })
        ]
    });
};

//# sourceMappingURL=WriteBarIcon.js.map