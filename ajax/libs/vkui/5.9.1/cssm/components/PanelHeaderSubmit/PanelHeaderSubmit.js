import * as React from 'react';
import { Icon28DoneOutline } from '@vkontakte/icons';
import { usePlatform } from '../../hooks/usePlatform';
import { Platform } from '../../lib/platform';
import { getTitleFromChildren } from '../../lib/utils';
import { PanelHeaderButton } from '../PanelHeaderButton/PanelHeaderButton';
/**
 * @see https://vkcom.github.io/VKUI/#/PanelHeaderButton
 */ export const PanelHeaderSubmit = ({ children = 'Готово', ...restProps })=>{
    const platform = usePlatform();
    return /*#__PURE__*/ React.createElement(PanelHeaderButton, {
        "aria-label": getTitleFromChildren(children),
        primary: true,
        ...restProps
    }, platform === Platform.IOS ? children : /*#__PURE__*/ React.createElement(Icon28DoneOutline, null));
};

//# sourceMappingURL=PanelHeaderSubmit.js.map