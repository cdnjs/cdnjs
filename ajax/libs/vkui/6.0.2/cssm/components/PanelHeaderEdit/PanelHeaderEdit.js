import * as React from 'react';
import { Icon24DoneOutline, Icon24PenOutline, Icon28DoneOutline, Icon28EditOutline } from '@vkontakte/icons';
import { usePlatform } from '../../hooks/usePlatform';
import { AdaptiveIconRenderer } from '../AdaptiveIconRenderer/AdaptiveIconRenderer';
import { PanelHeaderButton } from '../PanelHeaderButton/PanelHeaderButton';
import { VisuallyHidden } from '../VisuallyHidden/VisuallyHidden';
/**
 * @see https://vkcom.github.io/VKUI/#/PanelHeaderButton
 */ export const PanelHeaderEdit = ({ isActive = false, editLabel = 'Редактировать', doneLabel = 'Готово', ...restProps })=>{
    const platform = usePlatform();
    const label = isActive ? doneLabel : editLabel;
    return /*#__PURE__*/ React.createElement(PanelHeaderButton, restProps, platform === 'ios' ? label : /*#__PURE__*/ React.createElement(React.Fragment, null, /*#__PURE__*/ React.createElement(VisuallyHidden, null, label), /*#__PURE__*/ React.createElement(AdaptiveIconRenderer, {
        IconCompact: isActive ? Icon24DoneOutline : Icon24PenOutline,
        IconRegular: isActive ? Icon28DoneOutline : Icon28EditOutline
    })));
};

//# sourceMappingURL=PanelHeaderEdit.js.map