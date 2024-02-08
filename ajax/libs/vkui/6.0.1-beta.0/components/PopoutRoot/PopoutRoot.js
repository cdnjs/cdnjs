import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import * as React from 'react';
import { classNames } from '@vkontakte/vkjs';
import { blurActiveElement, useDOM } from '../../lib/dom';
import { AppRootPortal } from '../AppRoot/AppRootPortal';
import { RootComponent } from '../RootComponent/RootComponent';
/**
 * @private
 */ export const PopoutRootPopout = (_param)=>{
    var { className } = _param, restProps = _object_without_properties(_param, [
        "className"
    ]);
    return /*#__PURE__*/ React.createElement("div", _object_spread({
        className: classNames("vkuiPopoutRoot__popout", className)
    }, restProps));
};
/**
 * @private
 */ export const PopoutRootModal = (_param)=>{
    var { className } = _param, restProps = _object_without_properties(_param, [
        "className"
    ]);
    return /*#__PURE__*/ React.createElement("div", _object_spread({
        className: classNames("vkuiPopoutRoot__modal", className)
    }, restProps));
};
/**
 * @private
 */ export const PopoutRoot = (_param)=>{
    var { popout, modal, children } = _param, restProps = _object_without_properties(_param, [
        "popout",
        "modal",
        "children"
    ]);
    const { document } = useDOM();
    React.useEffect(()=>{
        popout && blurActiveElement(document);
    }, [
        document,
        popout
    ]);
    return /*#__PURE__*/ React.createElement(RootComponent, _object_spread_props(_object_spread({}, restProps), {
        baseClassName: "vkuiPopoutRoot"
    }), children, /*#__PURE__*/ React.createElement(AppRootPortal, null, !!popout && /*#__PURE__*/ React.createElement(PopoutRootPopout, null, popout), !!modal && /*#__PURE__*/ React.createElement(PopoutRootModal, null, modal)));
};

//# sourceMappingURL=PopoutRoot.js.map