import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import * as React from 'react';
import { blurActiveElement, useDOM } from '../../lib/dom';
import { AppRootPortal } from '../AppRoot/AppRootPortal';
import { RootComponent } from '../RootComponent/RootComponent';
const PopoutRootPopout = (props)=>/*#__PURE__*/ React.createElement("div", _object_spread({
        className: "vkuiPopoutRoot__popout"
    }, props));
const PopoutRootModal = (props)=>/*#__PURE__*/ React.createElement("div", _object_spread({
        className: "vkuiPopoutRoot__modal"
    }, props));
export const PopoutRoot = (_param)=>{
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