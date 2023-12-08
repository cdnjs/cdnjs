import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import * as React from 'react';
import { classNames, noop } from '@vkontakte/vkjs';
import { useAdaptivity } from '../../hooks/useAdaptivity';
import { useAppearance } from '../../hooks/useAppearance';
import { useKeyboardInputTracker } from '../../hooks/useKeyboardInputTracker';
import { useDOM } from '../../lib/dom';
import { isRefObject } from '../../lib/isRefObject';
import { useIsomorphicLayoutEffect } from '../../lib/useIsomorphicLayoutEffect';
import { AppRootContext } from './AppRootContext';
import { ElementScrollController, GlobalScrollController } from './ScrollContext';
const vkuiSizeXClassNames = {
    none: 'vkui--sizeX-none',
    ['regular']: 'vkui--sizeX-regular'
};
const vkuiSizeYClassNames = {
    none: 'vkui--sizeY-none',
    ['compact']: 'vkui--sizeY-compact'
};
const vkuiLayoutClassNames = {
    card: 'vkui--layout-card',
    plain: 'vkui--layout-plain'
};
function containerClassNames(layout, sizeX, sizeY) {
    const classNames = [];
    if (layout) {
        classNames.push(vkuiLayoutClassNames[layout]);
    }
    if (sizeX !== 'compact') {
        classNames.push(vkuiSizeXClassNames[sizeX]);
    }
    if (sizeY !== 'regular') {
        classNames.push(vkuiSizeYClassNames[sizeY]);
    }
    return classNames;
}
const INSET_CUSTOM_PROPERTY_PREFIX = `--vkui_internal--safe_area_inset_`;
/**
 * @see https://vkcom.github.io/VKUI/#/AppRoot
 */ export const AppRoot = (_param)=>{
    var { children, mode = 'full', scroll = 'global', portalRoot: portalRootProp = null, disablePortal, disableParentTransformForPositionFixedElements, className, safeAreaInsets, layout } = _param, props = _object_without_properties(_param, [
        "children",
        "mode",
        "scroll",
        "portalRoot",
        "disablePortal",
        "disableParentTransformForPositionFixedElements",
        "className",
        "safeAreaInsets",
        "layout"
    ]);
    const isKeyboardInputActiveRef = useKeyboardInputTracker();
    const rootRef = React.useRef(null);
    const [portalRoot, setPortalRoot] = React.useState(null);
    const { document } = useDOM();
    const appearance = useAppearance();
    const { hasPointer, sizeX = 'none', sizeY = 'none' } = useAdaptivity();
    // setup portal
    useIsomorphicLayoutEffect(()=>{
        let portal = null;
        if (portalRootProp) {
            if (isRefObject(portalRootProp)) {
                portal = portalRootProp.current;
            } else {
                portal = portalRootProp;
            }
        }
        if (!portal) {
            portal = document.createElement('div');
            document.body.appendChild(portal);
        }
        setPortalRoot(portal);
        return ()=>{
            if (!portalRootProp) {
                var _portal_parentElement;
                portal === null || portal === void 0 ? void 0 : (_portal_parentElement = portal.parentElement) === null || _portal_parentElement === void 0 ? void 0 : _portal_parentElement.removeChild(portal);
            }
        };
    }, [
        portalRootProp
    ]);
    // setup root classes
    useIsomorphicLayoutEffect(()=>{
        var _rootRef_current;
        if (mode === 'partial') {
            return noop;
        }
        const parent = (_rootRef_current = rootRef.current) === null || _rootRef_current === void 0 ? void 0 : _rootRef_current.parentElement;
        const classes = [
            'vkui__root'
        ].concat(mode === 'embedded' ? 'vkui__root--embedded' : []);
        if (parent) {
            if (mode === 'embedded' && !disableParentTransformForPositionFixedElements) {
                parent.style.transform = 'translate3d(0, 0, 0)';
            }
            parent.classList.add(...classes);
        }
        return ()=>{
            if (parent) {
                if (mode === 'embedded' && !disableParentTransformForPositionFixedElements) {
                    parent.style.transform = '';
                }
                parent.classList.remove(...classes);
            }
        };
    }, [
        disableParentTransformForPositionFixedElements
    ]);
    useIsomorphicLayoutEffect(()=>{
        if (mode === 'full') {
            document.documentElement.classList.add('vkui');
            return ()=>{
                document.documentElement.classList.remove('vkui');
            };
        }
        return undefined;
    }, [
        document,
        mode
    ]);
    // setup insets
    useIsomorphicLayoutEffect(()=>{
        var _rootRef_current;
        if (mode === 'partial' || !((_rootRef_current = rootRef.current) === null || _rootRef_current === void 0 ? void 0 : _rootRef_current.parentElement) || !safeAreaInsets) {
            return;
        }
        const parent = rootRef.current.parentElement;
        let key;
        for(key in safeAreaInsets){
            if (safeAreaInsets.hasOwnProperty(key) && typeof safeAreaInsets[key] === 'number') {
                const inset = safeAreaInsets[key];
                parent.style.setProperty(INSET_CUSTOM_PROPERTY_PREFIX + key, `${inset}px`);
                portalRoot && portalRoot.style.setProperty(INSET_CUSTOM_PROPERTY_PREFIX + key, `${inset}px`);
            }
        }
        return ()=>{
            if (!safeAreaInsets) {
                return;
            }
            let key;
            for(key in safeAreaInsets){
                if (safeAreaInsets.hasOwnProperty(key)) {
                    parent.style.removeProperty(INSET_CUSTOM_PROPERTY_PREFIX + key);
                    portalRoot && portalRoot.style.removeProperty(INSET_CUSTOM_PROPERTY_PREFIX + key);
                }
            }
        };
    }, [
        safeAreaInsets,
        portalRoot
    ]);
    // adaptivity handler
    useIsomorphicLayoutEffect(()=>{
        var _rootRef_current;
        if (mode === 'partial') {
            return noop;
        }
        const classNames = containerClassNames(layout, sizeX, sizeY);
        const container = mode === 'embedded' ? (_rootRef_current = rootRef.current) === null || _rootRef_current === void 0 ? void 0 : _rootRef_current.parentElement : document.body;
        if (!classNames.length || !container) {
            return noop;
        }
        container.classList.add(...classNames);
        return ()=>{
            container.classList.remove(...classNames);
        };
    }, [
        sizeX,
        sizeY,
        layout
    ]);
    useIsomorphicLayoutEffect(()=>{
        if (mode !== 'full' || appearance === undefined) {
            return noop;
        }
        document.documentElement.style.setProperty('color-scheme', appearance);
        return ()=>document.documentElement.style.removeProperty('color-scheme');
    }, [
        appearance
    ]);
    const ScrollController = React.useMemo(()=>scroll === 'contain' ? ElementScrollController : GlobalScrollController, [
        scroll
    ]);
    const content = /*#__PURE__*/ React.createElement(AppRootContext.Provider, {
        value: {
            appRoot: rootRef,
            portalRoot,
            embedded: mode === 'embedded',
            mode,
            disablePortal,
            layout,
            get keyboardInput () {
                return isKeyboardInputActiveRef.current;
            }
        }
    }, /*#__PURE__*/ React.createElement(ScrollController, {
        elRef: rootRef
    }, children));
    return mode === 'partial' ? content : /*#__PURE__*/ React.createElement("div", _object_spread({
        ref: rootRef,
        className: classNames("vkuiAppRoot", hasPointer === undefined ? "vkuiAppRoot--pointer-none" : !hasPointer && "vkuiAppRoot--pointer-has-not", className)
    }, props), content);
};

//# sourceMappingURL=AppRoot.js.map