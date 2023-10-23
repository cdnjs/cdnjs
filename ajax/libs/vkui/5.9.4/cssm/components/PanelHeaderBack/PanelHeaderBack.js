import * as React from 'react';
import { Icon28ArrowLeftOutline, Icon28ChevronBack, Icon28ChevronLeftOutline } from '@vkontakte/icons';
import { classNames } from '@vkontakte/vkjs';
import { useAdaptivity } from '../../hooks/useAdaptivity';
import { usePlatform } from '../../hooks/usePlatform';
import { SizeType } from '../../lib/adaptivity';
import { Platform } from '../../lib/platform';
import { PanelHeaderButton } from '../PanelHeaderButton/PanelHeaderButton';
import styles from '../PanelHeaderButton/PanelHeaderButton.module.css';
/**
 * @see https://vkcom.github.io/VKUI/#/PanelHeaderButton
 */ export const PanelHeaderBack = ({ label, 'aria-label': ariaLabel = 'Назад', className, ...restProps })=>{
    const platform = usePlatform();
    const { sizeX = 'none' } = useAdaptivity();
    // так-же label нужно скрывать при platform === Platform.IOS && sizeX === regular
    // https://github.com/VKCOM/VKUI/blob/master/src/components/PanelHeaderButton/PanelHeaderButton.css#L104
    const showLabel = platform === Platform.VKCOM || platform === Platform.IOS;
    let icon = /*#__PURE__*/ React.createElement(Icon28ArrowLeftOutline, null);
    switch(platform){
        case Platform.IOS:
            icon = /*#__PURE__*/ React.createElement(Icon28ChevronBack, null);
            break;
        case Platform.VKCOM:
            icon = /*#__PURE__*/ React.createElement(Icon28ChevronLeftOutline, null);
            break;
    }
    return /*#__PURE__*/ React.createElement(PanelHeaderButton, {
        ...restProps,
        className: classNames(sizeX === SizeType.COMPACT && styles['PanelHeaderBack--sizeX-compact'], platform === Platform.IOS && styles['PanelHeaderBack--ios'], platform === Platform.VKCOM && styles['PanelHeaderBack--vkcom'], showLabel && !!label && styles['PanelHeaderBack--has-label'], className),
        label: showLabel && label,
        "aria-label": ariaLabel
    }, icon);
};

//# sourceMappingURL=PanelHeaderBack.js.map