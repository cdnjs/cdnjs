import { _ as _define_property } from "@swc/helpers/_/_define_property";
import * as React from "react";
import { warnOnce } from "../lib/warnOnce";
import { useEffectDev } from "./useEffectDev";
import { useExternRef } from "./useExternRef";
var isDOMTypeElement = function(element) {
    return typeof element.type === "string";
};
var warn = warnOnce("usePatchChildrenRef");
export var usePatchChildrenRef = function(children) {
    var childRef = React.isValidElement(children) && (isDOMTypeElement(children) ? children.ref : children.props.getRootRef);
    var patchedRef = useExternRef(childRef);
    useEffectDev(function() {
        if (!patchedRef.current) {
            warn("Кажется, в children передан компонент, который не поддерживает свойство getRootRef. Мы не можем получить ссылку на корневой dom-элемент этого компонента", "error");
        }
    }, [
        children === null || children === void 0 ? void 0 : children.type,
        patchedRef
    ]);
    return [
        patchedRef,
        React.isValidElement(children) ? React.cloneElement(children, _define_property({}, isDOMTypeElement(children) ? "ref" : "getRootRef", patchedRef)) : children
    ];
};

//# sourceMappingURL=usePatchChildrenRef.js.map