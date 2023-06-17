import * as React from 'react';
import { Button } from '../Button/Button';
import { VisuallyHiddenInput } from '../VisuallyHiddenInput/VisuallyHiddenInput';
/**
 * @see https://vkcom.github.io/VKUI/#/File
 */ export const File = ({ children ='Выберите файл' , align ='left' , size , mode , stretched , before , after , loading , className , style , getRef , getRootRef , appearance , ...restProps })=>{
    return /*#__PURE__*/ React.createElement(Button, {
        Component: "label",
        align: align,
        className: className,
        stretched: stretched,
        mode: mode,
        appearance: appearance,
        size: size,
        before: before,
        after: after,
        loading: loading,
        style: style,
        getRootRef: getRootRef,
        disabled: restProps.disabled
    }, /*#__PURE__*/ React.createElement(VisuallyHiddenInput, {
        ...restProps,
        type: "file",
        getRef: getRef
    }), children);
};

//# sourceMappingURL=File.js.map