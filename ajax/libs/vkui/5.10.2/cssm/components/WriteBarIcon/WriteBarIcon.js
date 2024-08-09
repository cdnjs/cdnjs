import * as React from 'react';
import { Icon24Attach, Icon24CheckCircleOutline, Icon24Send, Icon28AddCircleOutline, Icon28AttachOutline, Icon28CheckCircleOutline, Icon28Send, Icon48WritebarDone, Icon48WritebarSend } from '@vkontakte/icons';
import { classNames, hasReactNode } from '@vkontakte/vkjs';
import { usePlatform } from '../../hooks/usePlatform';
import { Platform } from '../../lib/platform';
import { COMMON_WARNINGS, warnOnce } from '../../lib/warnOnce';
import { AdaptiveIconRenderer } from '../AdaptiveIconRenderer/AdaptiveIconRenderer';
import { Counter } from '../Counter/Counter';
import { Tappable } from '../Tappable/Tappable';
import styles from './WriteBarIcon.module.css';
const warn = warnOnce('WriteBarIcon');
/**
 * @see https://vkcom.github.io/VKUI/#/WriteBarIcon
 */ export const WriteBarIcon = ({ mode, children, count, className, ...restProps })=>{
    const platform = usePlatform();
    let modeLabel = undefined;
    let predefinedIcons;
    switch(mode){
        case 'attach':
            predefinedIcons = {
                IconCompact: platform === Platform.IOS ? Icon28AddCircleOutline : Icon24Attach,
                IconRegular: platform === Platform.IOS ? Icon28AddCircleOutline : Icon28AttachOutline
            };
            modeLabel = 'Прикрепить файл';
            break;
        case 'send':
            predefinedIcons = {
                IconCompact: platform === Platform.IOS ? Icon48WritebarSend : Icon24Send,
                IconRegular: platform === Platform.IOS ? Icon48WritebarSend : Icon28Send
            };
            modeLabel = 'Отправить';
            break;
        case 'done':
            predefinedIcons = {
                IconCompact: platform === Platform.IOS ? Icon48WritebarDone : Icon24CheckCircleOutline,
                IconRegular: platform === Platform.IOS ? Icon48WritebarDone : Icon28CheckCircleOutline
            };
            modeLabel = 'Готово';
            break;
        default:
            break;
    }
    if (process.env.NODE_ENV === 'development') {
        const isAccessible = modeLabel || restProps['aria-label'] || restProps['aria-labelledby'];
        if (!isAccessible) {
            warn(COMMON_WARNINGS.a11y['button-name'], 'error');
        }
    }
    return /*#__PURE__*/ React.createElement(Tappable, {
        "aria-label": modeLabel,
        ...restProps,
        Component: "button",
        hasHover: false,
        activeMode: styles['WriteBarIcon__active'],
        className: classNames(styles['WriteBarIcon'], platform === Platform.IOS && styles['WriteBarIcon--ios'], mode === 'send' && styles['WriteBarIcon--mode-send'], mode === 'done' && styles['WriteBarIcon--mode-done'], className)
    }, /*#__PURE__*/ React.createElement("span", {
        className: styles['WriteBarIcon__in']
    }, predefinedIcons ? /*#__PURE__*/ React.createElement(AdaptiveIconRenderer, predefinedIcons) : children), hasReactNode(count) && /*#__PURE__*/ React.createElement(Counter, {
        className: styles['WriteBarIcon__counter'],
        size: "s"
    }, count));
};

//# sourceMappingURL=WriteBarIcon.js.map