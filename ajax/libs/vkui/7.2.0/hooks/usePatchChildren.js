import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import * as React from "react";
import { getMergedSameEventsByProps } from "../helpers/getMergedSameEventsByProps.js";
import { isDOMTypeElement, isForwardRefElement, isValidNotReactFragmentElement } from "../lib/utils.js";
import { warnOnce } from "../lib/warnOnce.js";
import { useEffectDev } from "./useEffectDev.js";
import { useExternRef } from "./useExternRef.js";
const warn = warnOnce('usePatchChildren');
/**
 * Хук позволяет пропатчить переданный компонент так, чтобы можно было получить ссылку на его
 * DOM-элемент. Также есть возможность прокинуть дополнительные параметры.
 *
 * @param children
 * @param injectProps
 * @param externRef – полезен когда нужно прокинуть `ref` элементу выше.
 *
 * 👎 Без параметра `externRef`
 * ```ts
 * const { ref } = useSomeHook();
 * const [childRef, child] = usePatchChildren(children);
 * React.useLayoutEffect(() => {
 *   ref.current = childRef.current; // или ref.current(childRef.current)
 * }, [childRef]);
 * ```
 *
 * 👍 С параметром `externRef`
 * ```ts
 * const { ref } = useSomeHook();
 * const [childRef, child] = usePatchChildren(children, undefined, ref);
 * ```
 */ export const usePatchChildren = (children, injectProps, externRef)=>{
    const isValidElementResult = isValidNotReactFragmentElement(children);
    const isDOMTypeElementResult = isValidElementResult && isDOMTypeElement(children);
    const isForwardedRefElementResult = isValidElementResult && isForwardRefElement(children);
    const shouldUseRef = isDOMTypeElementResult || isForwardedRefElementResult;
    const childRef = useExternRef(shouldUseRef ? children.ref : isValidElementResult ? children.props.getRootRef : undefined, externRef);
    const mergedEventsByInjectProps = getMergedSameEventsByProps(injectProps ? injectProps : {}, isValidElementResult ? children.props : {});
    const props = shouldUseRef ? _object_spread({
        ref: childRef
    }, injectProps, mergedEventsByInjectProps) : isValidElementResult ? _object_spread({
        getRootRef: childRef
    }, injectProps, mergedEventsByInjectProps) : undefined;
    const patchedChildren = isValidElementResult ? React.cloneElement(children, props) : children;
    useEffectDev(()=>{
        if (!childRef.current && !shouldUseRef) {
            warn('Кажется, в children передан компонент, который не поддерживает свойство getRootRef. Мы не можем получить ссылку на корневой dom-элемент этого компонента', 'error');
        }
    }, [
        isValidElementResult ? children.type : null,
        shouldUseRef,
        childRef
    ]);
    return [
        childRef,
        patchedChildren
    ];
};

//# sourceMappingURL=usePatchChildren.js.map