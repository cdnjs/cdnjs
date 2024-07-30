import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { jsx as _jsx } from "react/jsx-runtime";
import * as React from 'react';
import { useAdaptivityWithJSMediaQueries } from '../../hooks/useAdaptivityWithJSMediaQueries';
import { useScrollLock } from '../AppRoot/ScrollContext';
import { ModalRootTouch } from './ModalRoot';
import { ModalRootDesktop } from './ModalRootDesktop';
/**
 * @see https://vkcom.github.io/VKUI/#/ModalRoot
 */ export const ModalRoot = (props)=>{
    const { isDesktop } = useAdaptivityWithJSMediaQueries();
    useScrollLock(!!props.activeModal);
    const RootComponent = isDesktop ? ModalRootDesktop : ModalRootTouch;
    return /*#__PURE__*/ _jsx(RootComponent, _object_spread({}, props));
};

//# sourceMappingURL=ModalRootAdaptive.js.map