import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import * as React from "react";
import { classNames } from "@vkontakte/vkjs";
import { useAdaptivityWithJSMediaQueries } from "../../hooks/useAdaptivityWithJSMediaQueries";
import { useExternRef } from "../../hooks/useExternRef";
import { usePlatform } from "../../hooks/usePlatform";
import { Platform } from "../../lib/platform";
import { ModalPageContext } from "../ModalPage/ModalPageContext";
import { PanelHeader } from "../PanelHeader/PanelHeader";
import { Separator } from "../Separator/Separator";
/**
 * @see https://vkcom.github.io/VKUI/#/ModalPageHeader
 */ export var ModalPageHeader = function(_param) {
    var children = _param.children, _param_separator = _param.separator, separator = _param_separator === void 0 ? true : _param_separator, getRef = _param.getRef, getRootRef = _param.getRootRef, className = _param.className, typographyProps = _param.typographyProps, restProps = _object_without_properties(_param, [
        "children",
        "separator",
        "getRef",
        "getRootRef",
        "className",
        "typographyProps"
    ]);
    var platform = usePlatform();
    var hasSeparator = separator && platform === Platform.VKCOM;
    var isDesktop = useAdaptivityWithJSMediaQueries().isDesktop;
    var labelId = React.useContext(ModalPageContext).labelId;
    var modalPageHeaderRef = useExternRef(getRef, getRootRef);
    return /*#__PURE__*/ React.createElement("div", {
        className: classNames("vkuiModalPageHeader", platform !== Platform.VKCOM && "vkuiModalPageHeader--withGaps", isDesktop && "vkuiModalPageHeader--desktop"),
        ref: modalPageHeaderRef
    }, /*#__PURE__*/ React.createElement(PanelHeader, _object_spread_props(_object_spread({
        className: classNames("vkuiInternalModalPageHeader__in", className),
        typographyProps: _object_spread({
            Component: "h2",
            id: labelId
        }, typographyProps)
    }, restProps), {
        fixed: false,
        separator: false,
        transparent: true
    }), children), hasSeparator && /*#__PURE__*/ React.createElement(Separator, {
        wide: true
    }));
};

//# sourceMappingURL=ModalPageHeader.js.map