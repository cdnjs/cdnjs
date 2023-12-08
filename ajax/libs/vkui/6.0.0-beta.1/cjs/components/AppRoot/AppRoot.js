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
const _object_without_properties = require("@swc/helpers/_/_object_without_properties");
const _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
const _vkjs = require("@vkontakte/vkjs");
const _useAdaptivity = require("../../hooks/useAdaptivity");
const _useAppearance = require("../../hooks/useAppearance");
const _useKeyboardInputTracker = require("../../hooks/useKeyboardInputTracker");
const _dom = require("../../lib/dom");
const _isRefObject = require("../../lib/isRefObject");
const _useIsomorphicLayoutEffect = require("../../lib/useIsomorphicLayoutEffect");
const _AppRootContext = require("./AppRootContext");
const _ScrollContext = require("./ScrollContext");
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
const AppRoot = (_param)=>{
    var { children, mode = 'full', scroll = 'global', portalRoot: portalRootProp = null, disablePortal, disableParentTransformForPositionFixedElements, className, safeAreaInsets, layout } = _param, props = _object_without_properties._(_param, [
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
    const isKeyboardInputActiveRef = (0, _useKeyboardInputTracker.useKeyboardInputTracker)();
    const rootRef = _react.useRef(null);
    const [portalRoot, setPortalRoot] = _react.useState(null);
    const { document } = (0, _dom.useDOM)();
    const appearance = (0, _useAppearance.useAppearance)();
    const { hasPointer, sizeX = 'none', sizeY = 'none' } = (0, _useAdaptivity.useAdaptivity)();
    // setup portal
    (0, _useIsomorphicLayoutEffect.useIsomorphicLayoutEffect)(()=>{
        let portal = null;
        if (portalRootProp) {
            if ((0, _isRefObject.isRefObject)(portalRootProp)) {
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
    (0, _useIsomorphicLayoutEffect.useIsomorphicLayoutEffect)(()=>{
        var _rootRef_current;
        if (mode === 'partial') {
            return _vkjs.noop;
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
    (0, _useIsomorphicLayoutEffect.useIsomorphicLayoutEffect)(()=>{
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
    (0, _useIsomorphicLayoutEffect.useIsomorphicLayoutEffect)(()=>{
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
    (0, _useIsomorphicLayoutEffect.useIsomorphicLayoutEffect)(()=>{
        var _rootRef_current;
        if (mode === 'partial') {
            return _vkjs.noop;
        }
        const classNames = containerClassNames(layout, sizeX, sizeY);
        const container = mode === 'embedded' ? (_rootRef_current = rootRef.current) === null || _rootRef_current === void 0 ? void 0 : _rootRef_current.parentElement : document.body;
        if (!classNames.length || !container) {
            return _vkjs.noop;
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
    (0, _useIsomorphicLayoutEffect.useIsomorphicLayoutEffect)(()=>{
        if (mode !== 'full' || appearance === undefined) {
            return _vkjs.noop;
        }
        document.documentElement.style.setProperty('color-scheme', appearance);
        return ()=>document.documentElement.style.removeProperty('color-scheme');
    }, [
        appearance
    ]);
    const ScrollController = _react.useMemo(()=>scroll === 'contain' ? _ScrollContext.ElementScrollController : _ScrollContext.GlobalScrollController, [
        scroll
    ]);
    const content = /*#__PURE__*/ _react.createElement(_AppRootContext.AppRootContext.Provider, {
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
    }, /*#__PURE__*/ _react.createElement(ScrollController, {
        elRef: rootRef
    }, children));
    return mode === 'partial' ? content : /*#__PURE__*/ _react.createElement("div", _object_spread._({
        ref: rootRef,
        className: (0, _vkjs.classNames)("vkuiAppRoot", hasPointer === undefined ? "vkuiAppRoot--pointer-none" : !hasPointer && "vkuiAppRoot--pointer-has-not", className)
    }, props), content);
};

//# sourceMappingURL=AppRoot.js.map