import { _ as _define_property } from "@swc/helpers/_/_define_property";
import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import * as React from "react";
import { useIsomorphicLayoutEffect } from "../../lib/useIsomorphicLayoutEffect";
export var ModalRootContext = /*#__PURE__*/ React.createContext({
    updateModalHeight: function() {
        return undefined;
    },
    registerModal: function() {
        return undefined;
    },
    isInsideModal: false
});
/**
 * All referenced elements must be static
 */ export function useModalRegistry(id, type) {
    var modalContext = React.useContext(ModalRootContext);
    var elements = React.useRef({}).current;
    useIsomorphicLayoutEffect(function() {
        if (id !== undefined) {
            modalContext.registerModal(_object_spread_props(_object_spread({}, elements), {
                type: type,
                id: id
            }));
            // unset refs on  unmount to prevent leak
            var reset = Object.keys(elements).reduce(function(acc, k) {
                return _object_spread_props(_object_spread({}, acc), _define_property({}, k, null));
            }, {
                type: type,
                id: id
            });
            return function() {
                return modalContext.registerModal(reset);
            };
        }
        return undefined;
    }, []);
    var refs = React.useRef({
        modalElement: function(e) {
            return elements.modalElement = e;
        },
        innerElement: function(e) {
            return elements.innerElement = e;
        },
        headerElement: function(e) {
            return elements.headerElement = e;
        },
        contentElement: function(e) {
            return elements.contentElement = e;
        },
        bottomInset: function(e) {
            return elements.bottomInset = e;
        }
    }).current;
    return {
        refs: refs
    };
}

//# sourceMappingURL=ModalRootContext.js.map