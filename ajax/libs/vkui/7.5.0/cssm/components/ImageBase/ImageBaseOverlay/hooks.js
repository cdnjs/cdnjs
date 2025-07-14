import * as React from "react";
import { hasMouse as hasPointerLib } from "@vkontakte/vkjs";
import { useAdaptivity } from "../../../hooks/useAdaptivity.js";
import { useFocusWithin } from "../../../hooks/useFocusWithin.js";
import { useIsClient } from "../../../hooks/useIsClient.js";
import { useIsomorphicLayoutEffect } from "../../../lib/useIsomorphicLayoutEffect.js";
export function useNonInteractiveOverlayProps(rootRef) {
    const focusWithin = useFocusWithin(rootRef);
    const [nonInteractiveFocusShown, setNonInteractiveFocusShown] = React.useState(false);
    function onClick(event) {
        if (event.detail > 0) {
            // Если мы попали на вложенный в оверлей элемент через focus,
            // то при клике мышкой мы должны начать реагировать на hover-состояние,
            // даже если фокус всё ещё остался на вложенном элементе (был по нему клик)
            setNonInteractiveFocusShown(false);
        }
    }
    useIsomorphicLayoutEffect(()=>{
        setNonInteractiveFocusShown(focusWithin);
    }, [
        focusWithin
    ]);
    return {
        shown: nonInteractiveFocusShown && focusWithin,
        onClick
    };
}
/*
 * Определям значение по умолчанию для свойства visibility.
 *
 * Задача состоит в том, чтобы правильно рендерить Overlay.
 * Для устройств с мышкой, мы можем показывать его по наведению,
 * а для остальных устройств он должен быть виден всегда.
 *
 * Задача в том, чтобы избежать проблем при гидратации,
 * и отложить использование значения `always`, пока мы точно не уверены, что у пользоватея действительно нет мышки.
 * Иначе Overlay при первом рендере может показаться, а потом исчезнуть.
 *
 * Основано на хуке `useAdaptivityHasPointer`, но если при первом рендере мы точно не знаем значения hasPointer, то возвращаем `on-hover`.
 * */ export function useCalculatedDefaultVisibility() {
    const { hasPointer: hasPointerContext } = useAdaptivity();
    const needTwoPassRendering = hasPointerContext === undefined;
    const isClient = useIsClient(!needTwoPassRendering);
    if (!isClient && hasPointerContext === undefined) {
        return 'on-hover';
    }
    const hasPointer = hasPointerContext ?? hasPointerLib;
    return hasPointer ? 'on-hover' : 'always';
}

//# sourceMappingURL=hooks.js.map