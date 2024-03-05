import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import * as React from 'react';
import { Icon24CancelOutline, Icon28CancelOutline } from '@vkontakte/icons';
import { usePlatform } from '../../hooks/usePlatform';
import { AdaptiveIconRenderer } from '../AdaptiveIconRenderer/AdaptiveIconRenderer';
import { PanelHeaderButton } from '../PanelHeaderButton/PanelHeaderButton';
import { VisuallyHidden } from '../VisuallyHidden/VisuallyHidden';
/**
 * @see https://vkcom.github.io/VKUI/#/PanelHeaderButton
 */ export const PanelHeaderClose = (_param)=>{
    var { children = 'Отмена' } = _param, restProps = _object_without_properties(_param, [
        "children"
    ]);
    const platform = usePlatform();
    return /*#__PURE__*/ React.createElement(PanelHeaderButton, restProps, platform === 'ios' ? children : /*#__PURE__*/ React.createElement(React.Fragment, null, /*#__PURE__*/ React.createElement(VisuallyHidden, null, children), /*#__PURE__*/ React.createElement(AdaptiveIconRenderer, {
        IconCompact: Icon24CancelOutline,
        IconRegular: Icon28CancelOutline
    })));
};

//# sourceMappingURL=PanelHeaderClose.js.map