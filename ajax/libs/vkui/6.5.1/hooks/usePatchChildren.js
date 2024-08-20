import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import * as React from 'react';
import { getMergedSameEventsByProps } from '../helpers/getMergedSameEventsByProps';
import { isDOMTypeElement, isForwardRefElement, isValidNotReactFragmentElement } from '../lib/utils';
import { warnOnce } from '../lib/warnOnce';
import { useEffectDev } from './useEffectDev';
import { useExternRef } from './useExternRef';
const warn = warnOnce('usePatchChildrenRef');
/**
 * Функция пытается прокинуть в переданный React-элемент хук для получения его ссылки на DOM этого
 * элемента.
 *
 * @param children
 * @param injectProps
 * @param externRef – полезен когда нужно прокинуть `ref` элементу выше.
 *
 * 👎 Без параметра `externRef`
 * ```ts
 * const { ref } = useSomeHook();
 * const [childRef, child] = usePatchChildrenRef(children);
 * React.useLayoutEffect(() => {
 *   ref.current = childRef.current; // или ref.current(childRef.current)
 * }, [childRef]);
 * ```
 *
 * 👍 С параметром `externRef`
 * ```ts
 * const { ref } = useSomeHook();
 * const [childRef, child] = usePatchChildrenRef(children, undefined, ref);
 * ```
 *
 * @private
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
    useEffectDev(()=>{
        if (!childRef.current) {
            warn('Кажется, в children передан компонент, который не поддерживает свойство getRootRef. Мы не можем получить ссылку на корневой dom-элемент этого компонента', 'error');
        }
    }, [
        isValidElementResult ? children.type : null,
        childRef
    ]);
    return [
        childRef,
        isValidElementResult ? React.cloneElement(children, props) : children
    ];
};

//# sourceMappingURL=usePatchChildren.js.map