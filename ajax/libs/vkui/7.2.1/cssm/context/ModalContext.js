import { createContext, useContext } from "react";
/** @private */ export const ModalContext = /*#__PURE__*/ createContext(null);
/** @private */ export const useModalContext = ()=>{
    const id = useContext(ModalContext);
    return id === null ? {
        id
    } : {
        id,
        labelId: `${id}-label`
    };
};

//# sourceMappingURL=ModalContext.js.map