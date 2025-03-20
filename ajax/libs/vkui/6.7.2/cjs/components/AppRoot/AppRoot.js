"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "AppRoot", {
    enumerable: true,
    get: function() {
        return AppRoot;
    }
});
const _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
const _object_spread = require("@swc/helpers/_/_object_spread");
const _object_spread_props = require("@swc/helpers/_/_object_spread_props");
const _object_without_properties = require("@swc/helpers/_/_object_without_properties");
const _jsxruntime = require("react/jsx-runtime");
const _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
const _vkjs = require("@vkontakte/vkjs");
const _useAdaptivity = require("../../hooks/useAdaptivity");
const _useKeyboardInputTracker = require("../../hooks/useKeyboardInputTracker");
const _useObjectMemo = require("../../hooks/useObjectMemo");
const _dom = require("../../lib/dom");
const _tokens = require("../../lib/tokens");
const _useIsomorphicLayoutEffect = require("../../lib/useIsomorphicLayoutEffect");
const _ConfigProviderContext = require("../ConfigProvider/ConfigProviderContext");
const _AppRootContext = require("./AppRootContext");
const _ScrollContext = require("./ScrollContext");
const _helpers = require("./helpers");
const AppRoot = (_param)=>{
    var { children, mode = 'full', scroll = 'global', portalRoot: portalRootProp = null, disablePortal = false, disableParentTransformForPositionFixedElements, className, safeAreaInsets: safeAreaInsetsProp, layout, userSelectMode } = _param, props = _object_without_properties._(_param, [
        "children",
        "mode",
        "scroll",
        "portalRoot",
        "disablePortal",
        "disableParentTransformForPositionFixedElements",
        "className",
        "safeAreaInsets",
        "layout",
        "userSelectMode"
    ]);
    const { hasPointer, sizeX = 'none', sizeY = 'none' } = (0, _useAdaptivity.useAdaptivity)();
    const tokensClassName = (0, _tokens.useTokensClassName)();
    const safeAreaInsets = (0, _useObjectMemo.useObjectMemo)(safeAreaInsetsProp);
    const isKeyboardInputActiveRef = (0, _useKeyboardInputTracker.useKeyboardInputTracker)();
    const appRootRef = _react.useRef(null);
    const portalRootRef = _react.useRef(null);
    (0, _useIsomorphicLayoutEffect.useIsomorphicLayoutEffect)(function setupPortalRoot() {
        const portalByProp = portalRootProp ? (0, _helpers.extractPortalRootByProp)(portalRootProp) : null;
        if (portalByProp) {
            portalRootRef.current = portalByProp;
            return function cleanup() {
                portalRootRef.current = null;
            };
        }
        const documentBody = (0, _dom.getDocumentBody)(appRootRef.current);
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
    (0, _useIsomorphicLayoutEffect.useIsomorphicLayoutEffect)(function setupContainers() {
        if (!appRootRef.current || !portalRootRef.current) {
            return;
        }
        const parentElement = (0, _helpers.getParentElement)(appRootRef.current);
        const documentBody = (0, _dom.getDocumentBody)(appRootRef.current);
        const documentElement = documentBody.ownerDocument.documentElement;
        const [baseClassNames, stylesClassNames] = (0, _helpers.getClassNamesByMode)({
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
                    const unsetSafeAreaInsets = (0, _helpers.setSafeAreaInsets)(safeAreaInsets, documentElement);
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
                        const unsetSafeAreaInsets = (0, _helpers.setSafeAreaInsets)(safeAreaInsets, parentElement, portalRootRef.current); // prettier-ignore
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
    const ScrollController = _react.useMemo(()=>scroll === 'contain' ? _ScrollContext.ElementScrollController : _ScrollContext.GlobalScrollController, [
        scroll
    ]);
    const contextValue = _react.useMemo(()=>({
            appRoot: appRootRef,
            portalRoot: portalRootRef,
            embedded: mode === 'embedded',
            mode,
            disablePortal,
            layout,
            get keyboardInput () {
                return isKeyboardInputActiveRef.current;
            }
        }), [
        disablePortal,
        isKeyboardInputActiveRef,
        layout,
        mode
    ]);
    const content = /*#__PURE__*/ (0, _jsxruntime.jsx)(_AppRootContext.AppRootContext.Provider, {
        value: contextValue,
        children: /*#__PURE__*/ (0, _jsxruntime.jsx)(ScrollController, {
            elRef: appRootRef,
            children: children
        })
    });
    const { isWebView } = (0, _ConfigProviderContext.useConfigProvider)();
    const userSelectModeClassName = (0, _helpers.getUserSelectModeClassName)({
        userSelectMode,
        isWebView,
        hasPointer
    });
    return mode === 'partial' ? content : /*#__PURE__*/ (0, _jsxruntime.jsx)("div", _object_spread_props._(_object_spread._({
        ref: appRootRef,
        className: (0, _vkjs.classNames)("vkuiAppRoot", userSelectModeClassName, className)
    }, props), {
        children: content
    }));
};

//# sourceMappingURL=AppRoot.js.map