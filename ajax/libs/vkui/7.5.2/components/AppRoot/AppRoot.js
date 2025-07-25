'use client';
import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import { jsx as _jsx } from "react/jsx-runtime";
import * as React from "react";
import { classNames } from "@vkontakte/vkjs";
import { useKeyboardInputTracker } from "../../hooks/useKeyboardInputTracker.js";
import { useSyncHTMLWithBaseVKUIClasses } from "../../hooks/useSyncHTMLWithBaseVKUIClasses.js";
import { useSyncHTMLWithTokens } from "../../hooks/useSyncHTMLWithTokens.js";
import { AppRootContext } from "./AppRootContext.js";
import { AppRootStyleContainer } from "./AppRootStyleContainer/AppRootStyleContainer.js";
import { ElementScrollController, GlobalScrollController } from "./ScrollContext.js";
import { useSafeAreaInsetsMemo } from "./helpers.js";
const layoutClassNames = {
    card: "vkuiAppRoot__layoutCard",
    plain: "vkuiAppRoot__layoutPlain"
};
/**
 * @see https://vkui.io/components/app-root
 */ export const AppRoot = (_param)=>{
    var { children, mode = 'full', scroll = 'global', portalRoot, disablePortal = false, disableParentTransformForPositionFixedElements, safeAreaInsets: safeAreaInsetsProp, layout, userSelectMode, disableSettingVKUIClassesInRuntime, className } = _param, props = _object_without_properties(_param, [
        "children",
        "mode",
        "scroll",
        "portalRoot",
        "disablePortal",
        "disableParentTransformForPositionFixedElements",
        "safeAreaInsets",
        "layout",
        "userSelectMode",
        "disableSettingVKUIClassesInRuntime",
        "className"
    ]);
    const appRootRef = React.useRef(null);
    const isKeyboardInputActiveRef = useKeyboardInputTracker();
    const safeAreaInsets = useSafeAreaInsetsMemo(safeAreaInsetsProp);
    const contextValue = React.useMemo(()=>({
            appRoot: appRootRef,
            portalRoot,
            safeAreaInsets,
            embedded: mode === 'embedded',
            mode,
            disablePortal,
            layout,
            get keyboardInput () {
                return isKeyboardInputActiveRef.current;
            },
            userSelectMode
        }), [
        portalRoot,
        disablePortal,
        isKeyboardInputActiveRef,
        layout,
        mode,
        safeAreaInsets,
        userSelectMode
    ]);
    /*
   * Вешаем класс токенов на html в режиме full.
   * Это необходимо, чтобы цвета html элемента и скроллбара соответствовали текущей цветовой схеме:
   * - фон html элемента виден, если пользователь оверскролит. Тогда возникает анимация bounce-эффекта и виден фон html элемента. Без токенов в черной теме будет выглядывать белый фон.
   * - цвет системного сколлбара зависит от color-sheme свойства, значение которого задётся токенами и должно быть выставлено именно на html элементе.
   * В режме SSR пользователи сами могу задать этот класс на html-элементе. главное, чтобы он соответствовал переданным platform и appearence свойствам.
   */ useSyncHTMLWithTokens({
        appRootRef,
        enable: mode === 'full'
    });
    /*
   * По умолчанию VKUI будет выставлять .vkui на html и .vkui__root на контейнере в режиме full.
   * В режиме embedded будет выставлять только .vkui__root и .vkui__root--embedded на контейнере.
   * В режиме partial мы классы не выставляем.
   */ useSyncHTMLWithBaseVKUIClasses({
        appRootRef,
        mode,
        layout,
        enable: mode !== 'partial' && !disableSettingVKUIClassesInRuntime
    });
    const ScrollController = React.useMemo(()=>scroll === 'contain' ? ElementScrollController : GlobalScrollController, [
        scroll
    ]);
    return mode === 'partial' ? /*#__PURE__*/ _jsx(AppRootContext.Provider, {
        value: contextValue,
        children: /*#__PURE__*/ _jsx(ScrollController, {
            elRef: appRootRef,
            children: children
        })
    }) : /*#__PURE__*/ _jsx(AppRootContext.Provider, {
        value: contextValue,
        children: /*#__PURE__*/ _jsx(AppRootStyleContainer, _object_spread_props(_object_spread({
            getRootRef: appRootRef,
            className: classNames(className, "vkuiAppRoot__host", layout && layoutClassNames[layout], mode === 'embedded' && !disableParentTransformForPositionFixedElements ? "vkuiAppRoot__transformForPositionFixedElements" : undefined)
        }, props), {
            children: /*#__PURE__*/ _jsx(ScrollController, {
                elRef: appRootRef,
                children: children
            })
        }))
    });
};

//# sourceMappingURL=AppRoot.js.map