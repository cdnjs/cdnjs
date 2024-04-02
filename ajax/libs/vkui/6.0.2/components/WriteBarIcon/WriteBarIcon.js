import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import * as React from 'react';
import { Icon24Attach, Icon24CheckCircleOutline, Icon24Send, Icon28AddCircleOutline, Icon28AttachOutline, Icon28CheckCircleOutline, Icon28Send, Icon48WritebarDone, Icon48WritebarSend } from '@vkontakte/icons';
import { classNames, hasReactNode } from '@vkontakte/vkjs';
import { usePlatform } from '../../hooks/usePlatform';
import { hasAccessibleName } from '../../lib/accessibility';
import { COMMON_WARNINGS, warnOnce } from '../../lib/warnOnce';
import { AdaptiveIconRenderer } from '../AdaptiveIconRenderer/AdaptiveIconRenderer';
import { Counter } from '../Counter/Counter';
import { Tappable } from '../Tappable/Tappable';
import { VisuallyHidden } from '../VisuallyHidden/VisuallyHidden';
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
    return /*#__PURE__*/ React.createElement(Tappable, _object_spread_props(_object_spread({}, restProps), {
        Component: "button",
        hasHover: false,
        activeMode: "vkuiWriteBarIcon__active",
        className: classNames("vkuiWriteBarIcon", platform === 'ios' && "vkuiWriteBarIcon--ios", mode === 'send' && "vkuiWriteBarIcon--mode-send", mode === 'done' && "vkuiWriteBarIcon--mode-done", className)
    }), /*#__PURE__*/ React.createElement("span", {
        className: "vkuiWriteBarIcon__in"
    }, label && /*#__PURE__*/ React.createElement(VisuallyHidden, null, label), predefinedIcons ? /*#__PURE__*/ React.createElement(AdaptiveIconRenderer, predefinedIcons) : children), hasReactNode(count) && /*#__PURE__*/ React.createElement(Counter, {
        className: "vkuiWriteBarIcon__counter",
        size: "s"
    }, count));
};

//# sourceMappingURL=WriteBarIcon.js.map