import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import * as React from 'react';
import { classNames } from '@vkontakte/vkjs';
import { useAdaptivity } from '../../hooks/useAdaptivity';
import { useKeyboardInputTracker } from '../../hooks/useKeyboardInputTracker';
import { useObjectMemo } from '../../hooks/useObjectMemo';
import { getDocumentBody } from '../../lib/dom';
import { useTokensClassName } from '../../lib/tokens';
import { useIsomorphicLayoutEffect } from '../../lib/useIsomorphicLayoutEffect';
import { AppRootContext } from './AppRootContext';
import { ElementScrollController, GlobalScrollController } from './ScrollContext';
import { extractPortalRootByProp, getClassNamesByMode, getParentElement, setSafeAreaInsets } from './helpers';
/**
 * @see https://vkcom.github.io/VKUI/#/AppRoot
 */ export const AppRoot = (_param)=>{
    var { children, mode = 'full', scroll = 'global', portalRoot: portalRootProp = null, disablePortal = false, disableParentTransformForPositionFixedElements, className, safeAreaInsets: safeAreaInsetsProp, layout } = _param, props = _object_without_properties(_param, [
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
    const { hasPointer, sizeX = 'none', sizeY = 'none' } = useAdaptivity();
    const tokensClassName = useTokensClassName();
    const safeAreaInsets = useObjectMemo(safeAreaInsetsProp);
    const isKeyboardInputActiveRef = useKeyboardInputTracker();
    const appRootRef = React.useRef(null);
    const portalRootRef = React.useRef(null);
    useIsomorphicLayoutEffect(function setupPortalRoot() {
        const portalByProp = portalRootProp ? extractPortalRootByProp(portalRootProp) : null;
        if (portalByProp) {
            portalRootRef.current = portalByProp;
            return function cleanup() {
                portalRootRef.current = null;
            };
        }
        const documentBody = getDocumentBody(appRootRef.current);
        const portal = documentBody.ownerDocument.createElement('div');
        documentBody.appendChild(portal);
        portalRootRef.current = portal;
        return function cleanup() {
            documentBody.removeChild(portal);
            portalRootRef.current = null;
        };
    }, [
        portalRootProp
    ]);
    useIsomorphicLayoutEffect(function setupContainers() {
        if (!appRootRef.current || !portalRootRef.current) {
            return;
        }
        const parentElement = getParentElement(appRootRef.current);
        const documentBody = getDocumentBody(appRootRef.current);
        const documentElement = documentBody.ownerDocument.documentElement;
        const [baseClassNames, stylesClassNames] = getClassNamesByMode({
            mode,
            layout,
            tokensClassName,
            sizeX,
            sizeY
        });
        /* eslint-disable no-restricted-properties */ switch(mode){
            case 'full':
                {
                    if (parentElement) {
                        parentElement.classList.add(...baseClassNames);
                    }
                    documentElement.classList.add(...stylesClassNames, 'vkui');
                    const unsetSafeAreaInsets = setSafeAreaInsets(safeAreaInsets, documentElement);
                    return function cleanup() {
                        if (parentElement) {
                            parentElement.classList.remove(...baseClassNames);
                        }
                        documentElement.classList.remove(...stylesClassNames, 'vkui');
                        unsetSafeAreaInsets();
                    };
                }
            case 'embedded':
                {
                    if (parentElement) {
                        parentElement.classList.add(...baseClassNames, ...stylesClassNames);
                        if (!disableParentTransformForPositionFixedElements) {
                            parentElement.style.setProperty('transform', 'translate3d(0, 0, 0)');
                        }
                        const unsetSafeAreaInsets = setSafeAreaInsets(safeAreaInsets, parentElement, portalRootRef.current); // prettier-ignore
                        return function cleanup() {
                            parentElement.classList.remove(...baseClassNames, ...stylesClassNames);
                            if (!disableParentTransformForPositionFixedElements) {
                                parentElement.style.removeProperty('transform');
                            }
                            unsetSafeAreaInsets();
                        };
                    }
                    /* istanbul ignore next: node.parentElement может быть null, но такой кейс в теории невозможен */ return;
                }
            /* istanbul ignore next: не покрывается за счёт теста на <AppRoot mode="partial" /> */ case 'partial':
                {
                    return;
                }
        }
    /* eslint-enable no-restricted-properties */ }, [
        mode,
        layout,
        disableParentTransformForPositionFixedElements,
        tokensClassName,
        sizeX,
        sizeY,
        safeAreaInsets
    ]);
    const ScrollController = React.useMemo(()=>scroll === 'contain' ? ElementScrollController : GlobalScrollController, [
        scroll
    ]);
    const content = /*#__PURE__*/ React.createElement(AppRootContext.Provider, {
        value: {
            appRoot: appRootRef,
            portalRoot: portalRootRef,
            embedded: mode === 'embedded',
            mode,
            disablePortal,
            layout,
            get keyboardInput () {
                return isKeyboardInputActiveRef.current;
            }
        }
    }, /*#__PURE__*/ React.createElement(ScrollController, {
        elRef: appRootRef
    }, children));
    return mode === 'partial' ? content : /*#__PURE__*/ React.createElement("div", _object_spread({
        ref: appRootRef,
        className: classNames("vkuiAppRoot", hasPointer === undefined ? "vkuiAppRoot--pointer-none" : !hasPointer && "vkuiAppRoot--pointer-has-not", className)
    }, props), content);
};

//# sourceMappingURL=AppRoot.js.map