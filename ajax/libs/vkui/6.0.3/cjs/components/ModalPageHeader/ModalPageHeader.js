"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ModalPageHeader", {
    enumerable: true,
    get: function() {
        return ModalPageHeader;
    }
});
const _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
const _object_spread = require("@swc/helpers/_/_object_spread");
const _object_spread_props = require("@swc/helpers/_/_object_spread_props");
const _object_without_properties = require("@swc/helpers/_/_object_without_properties");
const _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
const _vkjs = require("@vkontakte/vkjs");
const _useAdaptivityWithJSMediaQueries = require("../../hooks/useAdaptivityWithJSMediaQueries");
const _usePlatform = require("../../hooks/usePlatform");
const _ModalPageContext = require("../ModalPage/ModalPageContext");
const _PanelHeader = require("../PanelHeader/PanelHeader");
const _Separator = require("../Separator/Separator");
const ModalPageHeader = (_param)=>{
    var { children, noSeparator = false, getRootRef, className, typographyProps } = _param, restProps = _object_without_properties._(_param, [
        "children",
        "noSeparator",
        "getRootRef",
        "className",
        "typographyProps"
    ]);
    const platform = (0, _usePlatform.usePlatform)();
    const { isDesktop, sizeX } = (0, _useAdaptivityWithJSMediaQueries.useAdaptivityWithJSMediaQueries)();
    const { labelId } = _react.useContext(_ModalPageContext.ModalPageContext);
    return /*#__PURE__*/ _react.createElement("div", {
        className: (0, _vkjs.classNames)("vkuiModalPageHeader", platform !== 'vkcom' && "vkuiModalPageHeader--withGaps", isDesktop && "vkuiModalPageHeader--desktop"),
        ref: getRootRef
    }, /*#__PURE__*/ _react.createElement(_PanelHeader.PanelHeader, _object_spread_props._(_object_spread._({
        className: (0, _vkjs.classNames)('vkuiInternalModalPageHeader__in', className),
        typographyProps: _object_spread._({
            Component: 'h2',
            id: labelId
        }, typographyProps)
    }, restProps), {
        fixed: false,
        delimiter: "none",
        transparent: true
    }), children), !noSeparator && /*#__PURE__*/ _react.createElement(_Separator.Separator, {
        wide: sizeX === 'regular'
    }));
};

//# sourceMappingURL=ModalPageHeader.js.map