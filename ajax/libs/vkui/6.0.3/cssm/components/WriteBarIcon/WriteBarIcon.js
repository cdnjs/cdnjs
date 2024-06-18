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
import styles from './WriteBarIcon.module.css';
const predefinedLabel = {
    attach: 'Прикрепить файл',
    send: 'Отправить',
    done: 'Готово'
};
const warn = warnOnce('WriteBarIcon');
/**
 * @see https://vkcom.github.io/VKUI/#/WriteBarIcon
 */ export const WriteBarIcon = ({ mode, children, count, className, label: labelProp, ...restProps })=>{
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
    return /*#__PURE__*/ React.createElement(Tappable, {
        ...restProps,
        Component: "button",
        hasHover: false,
        activeMode: styles['WriteBarIcon__active'],
        className: classNames(styles['WriteBarIcon'], platform === 'ios' && styles['WriteBarIcon--ios'], mode === 'send' && styles['WriteBarIcon--mode-send'], mode === 'done' && styles['WriteBarIcon--mode-done'], className)
    }, /*#__PURE__*/ React.createElement("span", {
        className: styles['WriteBarIcon__in']
    }, label && /*#__PURE__*/ React.createElement(VisuallyHidden, null, label), predefinedIcons ? /*#__PURE__*/ React.createElement(AdaptiveIconRenderer, predefinedIcons) : children), hasReactNode(count) && /*#__PURE__*/ React.createElement(Counter, {
        className: styles['WriteBarIcon__counter'],
        size: "s"
    }, count));
};

//# sourceMappingURL=WriteBarIcon.js.map