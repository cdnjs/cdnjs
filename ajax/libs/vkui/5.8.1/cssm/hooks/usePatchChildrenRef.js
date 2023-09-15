import * as React from 'react';
import { warnOnce } from '../lib/warnOnce';
import { useEffectDev } from './useEffectDev';
import { useExternRef } from './useExternRef';
const isDOMTypeElement = (element)=>{
    return typeof element.type === 'string';
};
const warn = warnOnce('usePatchChildrenRef');
export const usePatchChildrenRef = (children)=>{
    const childRef = React.isValidElement(children) && (isDOMTypeElement(children) ? children.ref : children.props.getRootRef);
    const patchedRef = useExternRef(childRef);
    useEffectDev(()=>{
        if (!patchedRef.current) {
            warn('Кажется, в children передан компонент, который не поддерживает свойство getRootRef. Мы не можем получить ссылку на корневой dom-элемент этого компонента', 'error');
        }
    }, [
        children?.type,
        patchedRef
    ]);
    return [
        patchedRef,
        React.isValidElement(children) ? React.cloneElement(children, {
            [isDOMTypeElement(children) ? 'ref' : 'getRootRef']: patchedRef
        }) : children
    ];
};

//# sourceMappingURL=usePatchChildrenRef.js.map