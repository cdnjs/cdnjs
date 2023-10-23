"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    ModalRootContext: function() {
        return ModalRootContext;
    },
    useModalRegistry: function() {
        return useModalRegistry;
    }
});
var _define_property = require("@swc/helpers/_/_define_property");
var _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
var _object_spread = require("@swc/helpers/_/_object_spread");
var _object_spread_props = require("@swc/helpers/_/_object_spread_props");
var _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
var _useIsomorphicLayoutEffect = require("../../lib/useIsomorphicLayoutEffect");
var ModalRootContext = /*#__PURE__*/ _react.createContext({
    updateModalHeight: function() {
        return undefined;
    },
    registerModal: function() {
        return undefined;
    },
    isInsideModal: false
});
function useModalRegistry(id, type) {
    var modalContext = _react.useContext(ModalRootContext);
    var elements = _react.useRef({}).current;
    (0, _useIsomorphicLayoutEffect.useIsomorphicLayoutEffect)(function() {
        if (id !== undefined) {
            modalContext.registerModal(_object_spread_props._(_object_spread._({}, elements), {
                type: type,
                id: id
            }));
            // unset refs on  unmount to prevent leak
            var reset = Object.keys(elements).reduce(function(acc, k) {
                return _object_spread_props._(_object_spread._({}, acc), _define_property._({}, k, null));
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
    var refs = _react.useRef({
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