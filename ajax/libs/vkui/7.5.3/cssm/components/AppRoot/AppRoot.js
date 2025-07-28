'use client';
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
import styles from "./AppRoot.module.css";
const layoutClassNames = {
    card: styles.layoutCard,
    plain: styles.layoutPlain
};
/**
 * @see https://vkui.io/components/app-root
 */ export const AppRoot = ({ children, mode = 'full', scroll = 'global', portalRoot, disablePortal = false, disableParentTransformForPositionFixedElements, safeAreaInsets: safeAreaInsetsProp, layout, userSelectMode, disableSettingVKUIClassesInRuntime, className, ...props })=>{
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
        children: /*#__PURE__*/ _jsx(AppRootStyleContainer, {
            getRootRef: appRootRef,
            className: classNames(className, styles.host, layout && layoutClassNames[layout], mode === 'embedded' && !disableParentTransformForPositionFixedElements ? styles.transformForPositionFixedElements : undefined),
            ...props,
            children: /*#__PURE__*/ _jsx(ScrollController, {
                elRef: appRootRef,
                children: children
            })
        })
    });
};

//# sourceMappingURL=AppRoot.js.map