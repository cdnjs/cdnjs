import * as React from 'react';
import { Icon24ArrowLeftOutline, Icon24ChevronLeftOutline, Icon28ArrowLeftOutline, Icon28ChevronBack, Icon28ChevronLeftOutline } from '@vkontakte/icons';
import { classNames } from '@vkontakte/vkjs';
import { useAdaptivity } from '../../hooks/useAdaptivity';
import { usePlatform } from '../../hooks/usePlatform';
import { AdaptiveIconRenderer } from '../AdaptiveIconRenderer/AdaptiveIconRenderer';
import { PanelHeaderButton } from '../PanelHeaderButton/PanelHeaderButton';
import { VisuallyHidden } from '../VisuallyHidden/VisuallyHidden';
import styles from '../PanelHeaderButton/PanelHeaderButton.module.css';
const getBackIcon = (platform)=>{
    switch(platform){
        case 'ios':
            return /*#__PURE__*/ React.createElement(Icon28ChevronBack, null);
        case 'vkcom':
            return /*#__PURE__*/ React.createElement(AdaptiveIconRenderer, {
                IconCompact: Icon24ChevronLeftOutline,
                IconRegular: Icon28ChevronLeftOutline
            });
        default:
            return /*#__PURE__*/ React.createElement(AdaptiveIconRenderer, {
                IconCompact: Icon24ArrowLeftOutline,
                IconRegular: Icon28ArrowLeftOutline
            });
    }
};
/**
 * @see https://vkcom.github.io/VKUI/#/PanelHeaderButton
 */ export const PanelHeaderBack = ({ label, className, children = 'Назад', ...restProps })=>{
    const platform = usePlatform();
    const { sizeX = 'none' } = useAdaptivity();
    // также label нужно скрывать при platform === 'ios' && sizeX === regular
    // https://github.com/VKCOM/VKUI/blob/master/src/components/PanelHeaderButton/PanelHeaderButton.css#L104
    const showLabel = platform === 'vkcom' || platform === 'ios';
    return /*#__PURE__*/ React.createElement(PanelHeaderButton, {
        ...restProps,
        className: classNames(sizeX === 'compact' && styles['PanelHeaderBack--sizeX-compact'], platform === 'ios' && styles['PanelHeaderBack--ios'], platform === 'vkcom' && styles['PanelHeaderBack--vkcom'], showLabel && !!label && styles['PanelHeaderBack--has-label'], className),
        label: showLabel && label
    }, children && /*#__PURE__*/ React.createElement(VisuallyHidden, null, children), getBackIcon(platform));
};

//# sourceMappingURL=PanelHeaderBack.js.map