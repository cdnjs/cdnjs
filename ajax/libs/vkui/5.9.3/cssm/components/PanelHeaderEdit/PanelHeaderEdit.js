import * as React from 'react';
import { Icon28DoneOutline, Icon28EditOutline } from '@vkontakte/icons';
import { usePlatform } from '../../hooks/usePlatform';
import { Platform } from '../../lib/platform';
import { PanelHeaderButton } from '../PanelHeaderButton/PanelHeaderButton';
/**
 * @see https://vkcom.github.io/VKUI/#/PanelHeaderButton
 */ export const PanelHeaderEdit = ({ isActive = false, editLabel = 'Редактировать', doneLabel = 'Готово', ...restProps })=>{
    const iOSText = isActive ? doneLabel : editLabel;
    const AndroidIcon = isActive ? Icon28DoneOutline : Icon28EditOutline;
    const platform = usePlatform();
    return /*#__PURE__*/ React.createElement(PanelHeaderButton, {
        "aria-label": iOSText,
        ...restProps
    }, platform === Platform.IOS ? iOSText : /*#__PURE__*/ React.createElement(AndroidIcon, null));
};

//# sourceMappingURL=PanelHeaderEdit.js.map