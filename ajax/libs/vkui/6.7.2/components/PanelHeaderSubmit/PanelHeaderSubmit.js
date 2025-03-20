import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Icon24DoneOutline, Icon28DoneOutline } from '@vkontakte/icons';
import { usePlatform } from '../../hooks/usePlatform';
import { AdaptiveIconRenderer } from '../AdaptiveIconRenderer/AdaptiveIconRenderer';
import { PanelHeaderButton } from '../PanelHeaderButton/PanelHeaderButton';
import { VisuallyHidden } from '../VisuallyHidden/VisuallyHidden';
/**
 * @see https://vkcom.github.io/VKUI/#/PanelHeaderButton
 */ export const PanelHeaderSubmit = (_param)=>{
    var { children = 'Готово' } = _param, restProps = _object_without_properties(_param, [
        "children"
    ]);
    const platform = usePlatform();
    return /*#__PURE__*/ _jsx(PanelHeaderButton, _object_spread_props(_object_spread({
        primary: true
    }, restProps), {
        children: platform === 'ios' ? children : /*#__PURE__*/ _jsxs(_Fragment, {
            children: [
                /*#__PURE__*/ _jsx(VisuallyHidden, {
                    children: children
                }),
                /*#__PURE__*/ _jsx(AdaptiveIconRenderer, {
                    IconCompact: Icon24DoneOutline,
                    IconRegular: Icon28DoneOutline
                })
            ]
        })
    }));
};

//# sourceMappingURL=PanelHeaderSubmit.js.map