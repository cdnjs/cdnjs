"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "Group", {
    enumerable: true,
    get: function() {
        return Group;
    }
});
const _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
const _object_spread = require("@swc/helpers/_/_object_spread");
const _object_spread_props = require("@swc/helpers/_/_object_spread_props");
const _object_without_properties = require("@swc/helpers/_/_object_without_properties");
const _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
const _vkjs = require("@vkontakte/vkjs");
const _useAdaptivity = require("../../hooks/useAdaptivity");
const _warnOnce = require("../../lib/warnOnce");
const _AppRootContext = require("../AppRoot/AppRootContext");
const _ModalRootContext = require("../ModalRoot/ModalRootContext");
const _RootComponent = require("../RootComponent/RootComponent");
const _Separator = require("../Separator/Separator");
const _Spacing = require("../Spacing/Spacing");
const _Footnote = require("../Typography/Footnote/Footnote");
const sizeXClassNames = {
    none: (0, _vkjs.classNames)("vkuiGroup--sizeX-none", 'vkuiInternalGroup--sizeX-none'),
    ['compact']: "vkuiGroup--sizeX-compact"
};
const stylesMode = {
    none: (0, _vkjs.classNames)("vkuiGroup--mode-none", 'vkuiInternalGroup--mode-none'),
    plain: (0, _vkjs.classNames)("vkuiGroup--mode-plain", 'vkuiInternalGroup--mode-plain'),
    card: (0, _vkjs.classNames)("vkuiGroup--mode-card", 'vkuiInternalGroup--mode-card')
};
const stylesPadding = {
    s: "vkuiGroup--padding-s",
    m: "vkuiGroup--padding-m"
};
/**
 * Вычисляем mode для Group.
 */ function useGroupMode(forcedMode, sizeX, isInsideModal) {
    const { layout } = _react.useContext(_AppRootContext.AppRootContext);
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
const warn = (0, _warnOnce.warnOnce)('Group');
const Group = (_param)=>{
    var { header, description, children, separator = 'auto', mode: modeProps, padding = 'm', tabIndex: tabIndexProp } = _param, restProps = _object_without_properties._(_param, [
        "header",
        "description",
        "children",
        "separator",
        "mode",
        "padding",
        "tabIndex"
    ]);
    const { isInsideModal } = _react.useContext(_ModalRootContext.ModalRootContext);
    const { sizeX = 'none' } = (0, _useAdaptivity.useAdaptivity)();
    const mode = useGroupMode(modeProps, sizeX, isInsideModal);
    const isTabPanel = restProps.role === 'tabpanel';
    if (process.env.NODE_ENV === 'development' && isTabPanel && (!restProps['aria-controls'] || !restProps['id'])) {
        warn('При использовании роли "tabpanel" необходимо задать значение свойств "aria-controls" и "id"');
    }
    const tabIndex = isTabPanel && tabIndexProp === undefined ? 0 : tabIndexProp;
    return /*#__PURE__*/ _react.createElement(_react.Fragment, null, /*#__PURE__*/ _react.createElement(_RootComponent.RootComponent, _object_spread_props._(_object_spread._({
        Component: "section"
    }, restProps), {
        tabIndex: tabIndex,
        baseClassName: (0, _vkjs.classNames)('vkuiInternalGroup', "vkuiGroup", isInsideModal && "vkuiGroup--inside-modal", sizeX !== 'regular' && sizeXClassNames[sizeX], mode && stylesMode[mode], stylesPadding[padding])
    }), (0, _vkjs.hasReactNode)(header) && /*#__PURE__*/ _react.createElement("div", {
        className: "vkuiGroup__header"
    }, header), children, (0, _vkjs.hasReactNode)(description) && /*#__PURE__*/ _react.createElement(_Footnote.Footnote, {
        className: "vkuiGroup__description"
    }, description)), separator !== 'hide' && /*#__PURE__*/ _react.createElement(_react.Fragment, null, /*#__PURE__*/ _react.createElement(_Spacing.Spacing, {
        className: (0, _vkjs.classNames)("vkuiGroup__separator", "vkuiGroup__separator--spacing"),
        size: 16
    }), /*#__PURE__*/ _react.createElement(_Separator.Separator, {
        className: (0, _vkjs.classNames)("vkuiGroup__separator", "vkuiGroup__separator--separator", separator === 'show' && "vkuiGroup__separator--force")
    })));
};

//# sourceMappingURL=Group.js.map