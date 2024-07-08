import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Icon24CancelOutline, Icon28CancelOutline } from '@vkontakte/icons';
import { usePlatform } from '../../hooks/usePlatform';
import { AdaptiveIconRenderer } from '../AdaptiveIconRenderer/AdaptiveIconRenderer';
import { PanelHeaderButton } from '../PanelHeaderButton/PanelHeaderButton';
import { VisuallyHidden } from '../VisuallyHidden/VisuallyHidden';
/**
 * @see https://vkcom.github.io/VKUI/#/PanelHeaderButton
 */ export const PanelHeaderClose = ({ children = 'Отмена', ...restProps })=>{
    const platform = usePlatform();
    return /*#__PURE__*/ _jsx(PanelHeaderButton, {
        ...restProps,
        children: platform === 'ios' ? children : /*#__PURE__*/ _jsxs(_Fragment, {
            children: [
                /*#__PURE__*/ _jsx(VisuallyHidden, {
                    children: children
                }),
                /*#__PURE__*/ _jsx(AdaptiveIconRenderer, {
                    IconCompact: Icon24CancelOutline,
                    IconRegular: Icon28CancelOutline
                })
            ]
        })
    });
};

//# sourceMappingURL=PanelHeaderClose.js.map