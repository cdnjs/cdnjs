import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import * as React from 'react';
import { classNames } from '@vkontakte/vkjs';
import { useAdaptivityWithJSMediaQueries } from '../../hooks/useAdaptivityWithJSMediaQueries';
import { useEffectDev } from '../../hooks/useEffectDev';
import { useEventListener } from '../../hooks/useEventListener';
import { usePlatform } from '../../hooks/usePlatform';
import { useDOM } from '../../lib/dom';
import { isRefObject } from '../../lib/isRefObject';
import { warnOnce } from '../../lib/warnOnce';
import { FocusTrap } from '../FocusTrap/FocusTrap';
import { Popper } from '../Popper/Popper';
const warn = warnOnce('ActionSheet');
function getEl(ref) {
    return ref && 'current' in ref ? ref.current : ref;
}
export const ActionSheetDropdownMenu = (_param)=>{
    var { children, toggleRef, closing, onClose, className, style, popupOffsetDistance = 0, placement } = _param, restProps = _object_without_properties(_param, [
        "children",
        "toggleRef",
        "closing",
        "onClose",
        "className",
        "style",
        "popupOffsetDistance",
        "placement"
    ]);
    const { document } = useDOM();
    const platform = usePlatform();
    const { sizeY } = useAdaptivityWithJSMediaQueries();
    const elementRef = React.useRef(null);
    useEffectDev(()=>{
        const toggleEl = getEl(toggleRef);
        if (!toggleEl) {
            warn(`Свойство "toggleRef" не передано`, 'error');
        }
    }, [
        toggleRef
    ]);
    const bodyClickListener = useEventListener('click', (e)=>{
        const dropdownElement = elementRef === null || elementRef === void 0 ? void 0 : elementRef.current;
        if (dropdownElement && !dropdownElement.contains(e.target)) {
            onClose === null || onClose === void 0 ? void 0 : onClose();
        }
    });
    React.useEffect(()=>{
        setTimeout(()=>{
            bodyClickListener.add(document.body);
        });
    }, [
        bodyClickListener,
        document
    ]);
    const onClick = React.useCallback((e)=>e.stopPropagation(), []);
    const targetRef = React.useMemo(()=>{
        if (isRefObject(toggleRef)) {
            return toggleRef;
        }
        return {
            current: toggleRef
        };
    }, [
        toggleRef
    ]);
    return /*#__PURE__*/ React.createElement(Popper, {
        targetRef: targetRef,
        offsetByMainAxis: popupOffsetDistance,
        placement: placement,
        className: classNames("vkuiActionSheet", platform === 'ios' && "vkuiActionSheet--ios", "vkuiActionSheet--menu", sizeY === 'compact' && "vkuiActionSheet--sizeY-compact", className),
        style: style,
        getRootRef: elementRef,
        usePortal: false
    }, /*#__PURE__*/ React.createElement(FocusTrap, _object_spread_props(_object_spread({
        onClose: onClose
    }, restProps), {
        onClick: onClick
    }), children));
};

//# sourceMappingURL=ActionSheetDropdownMenu.js.map