import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
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
    return /*#__PURE__*/ _jsx(PanelHeaderButton, {
        ...restProps,
        children: platform === 'ios' ? label : /*#__PURE__*/ _jsxs(_Fragment, {
            children: [
                /*#__PURE__*/ _jsx(VisuallyHidden, {
                    children: label
                }),
                /*#__PURE__*/ _jsx(AdaptiveIconRenderer, {
                    IconCompact: isActive ? Icon24DoneOutline : Icon24PenOutline,
                    IconRegular: isActive ? Icon28DoneOutline : Icon28EditOutline
                })
            ]
        })
    });
};

//# sourceMappingURL=PanelHeaderEdit.js.map