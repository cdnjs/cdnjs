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
var _defineProperty = require("@swc/helpers/lib/_define_property.js").default;
var _interopRequireWildcard = require("@swc/helpers/lib/_interop_require_wildcard.js").default;
var _objectSpread = require("@swc/helpers/lib/_object_spread.js").default;
var _objectSpreadProps = require("@swc/helpers/lib/_object_spread_props.js").default;
var _react = /*#__PURE__*/ _interopRequireWildcard(require("react"));
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
            modalContext.registerModal(_objectSpreadProps(_objectSpread({}, elements), {
                type: type,
                id: id
            }));
            // unset refs on  unmount to prevent leak
            var reset = Object.keys(elements).reduce(function(acc, k) {
                return _objectSpreadProps(_objectSpread({}, acc), _defineProperty({}, k, null));
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
        }
    }).current;
    return {
        refs: refs
    };
}

//# sourceMappingURL=ModalRootContext.js.map