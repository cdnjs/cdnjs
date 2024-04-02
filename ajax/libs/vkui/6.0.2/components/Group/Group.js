import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import * as React from 'react';
import { classNames, hasReactNode } from '@vkontakte/vkjs';
import { useAdaptivity } from '../../hooks/useAdaptivity';
import { warnOnce } from '../../lib/warnOnce';
import { AppRootContext } from '../AppRoot/AppRootContext';
import { ModalRootContext } from '../ModalRoot/ModalRootContext';
import { RootComponent } from '../RootComponent/RootComponent';
import { Separator } from '../Separator/Separator';
import { Spacing } from '../Spacing/Spacing';
import { Footnote } from '../Typography/Footnote/Footnote';
const sizeXClassNames = {
    none: classNames("vkuiGroup--sizeX-none", 'vkuiInternalGroup--sizeX-none'),
    ['compact']: "vkuiGroup--sizeX-compact"
};
const stylesMode = {
    none: classNames("vkuiGroup--mode-none", 'vkuiInternalGroup--mode-none'),
    plain: classNames("vkuiGroup--mode-plain", 'vkuiInternalGroup--mode-plain'),
    card: classNames("vkuiGroup--mode-card", 'vkuiInternalGroup--mode-card')
};
const stylesPadding = {
    s: "vkuiGroup--padding-s",
    m: "vkuiGroup--padding-m"
};
/**
 * Вычисляем mode для Group.
 */ function useGroupMode(forcedMode, sizeX, isInsideModal) {
    const { layout } = React.useContext(AppRootContext);
    if (forcedMode) {
        return forcedMode;
    }
    if (isInsideModal) {
        return 'plain';
    }
    if (layout) {
        return layout;
    }
    if (sizeX !== 'none') {
        return sizeX === 'regular' ? 'card' : 'plain';
    }
    return 'none';
}
const warn = warnOnce('Group');
/**
 * @see https://vkcom.github.io/VKUI/#/Group
 */ export const Group = (_param)=>{
    var { header, description, children, separator = 'auto', mode: modeProps, padding = 'm', tabIndex: tabIndexProp } = _param, restProps = _object_without_properties(_param, [
        "header",
        "description",
        "children",
        "separator",
        "mode",
        "padding",
        "tabIndex"
    ]);
    const { isInsideModal } = React.useContext(ModalRootContext);
    const { sizeX = 'none' } = useAdaptivity();
    const mode = useGroupMode(modeProps, sizeX, isInsideModal);
    const isTabPanel = restProps.role === 'tabpanel';
    if (process.env.NODE_ENV === 'development' && isTabPanel && (!restProps['aria-controls'] || !restProps['id'])) {
        warn('При использовании роли "tabpanel" необходимо задать значение свойств "aria-controls" и "id"');
    }
    const tabIndex = isTabPanel && tabIndexProp === undefined ? 0 : tabIndexProp;
    return /*#__PURE__*/ React.createElement(React.Fragment, null, /*#__PURE__*/ React.createElement(RootComponent, _object_spread_props(_object_spread({
        Component: "section"
    }, restProps), {
        tabIndex: tabIndex,
        baseClassName: classNames('vkuiInternalGroup', "vkuiGroup", isInsideModal && "vkuiGroup--inside-modal", sizeX !== 'regular' && sizeXClassNames[sizeX], mode && stylesMode[mode], stylesPadding[padding])
    }), hasReactNode(header) && /*#__PURE__*/ React.createElement("div", {
        className: "vkuiGroup__header"
    }, header), children, hasReactNode(description) && /*#__PURE__*/ React.createElement(Footnote, {
        className: "vkuiGroup__description"
    }, description)), separator !== 'hide' && /*#__PURE__*/ React.createElement(React.Fragment, null, /*#__PURE__*/ React.createElement(Spacing, {
        className: classNames("vkuiGroup__separator", "vkuiGroup__separator--spacing"),
        size: 16
    }), /*#__PURE__*/ React.createElement(Separator, {
        className: classNames("vkuiGroup__separator", "vkuiGroup__separator--separator", separator === 'show' && "vkuiGroup__separator--force")
    })));
};

//# sourceMappingURL=Group.js.map