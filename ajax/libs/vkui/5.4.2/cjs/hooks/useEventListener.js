"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "useEventListener", {
    enumerable: true,
    get: function() {
        return useEventListener;
    }
});
var _interopRequireWildcard = require("@swc/helpers/lib/_interop_require_wildcard.js").default;
var _objectSpread = require("@swc/helpers/lib/_object_spread.js").default;
var _react = /*#__PURE__*/ _interopRequireWildcard(require("react"));
var _vkjs = require("@vkontakte/vkjs");
var _dom = require("../lib/dom");
var _useIsomorphicLayoutEffect = require("../lib/useIsomorphicLayoutEffect");
function useEventListener(event, _cb, _options) {
    var cbRef = _react.useRef(_cb);
    (0, _useIsomorphicLayoutEffect.useIsomorphicLayoutEffect)(function() {
        cbRef.current = _cb;
    }, [
        _cb
    ]);
    var cb = _react.useCallback(function(e) {
        return cbRef.current && cbRef.current(e);
    }, []);
    var detach = _react.useRef(_vkjs.noop);
    var remove = _react.useCallback(function() {
        detach.current();
        detach.current = _vkjs.noop;
    }, []);
    var add = _react.useCallback(function(el) {
        if (!_dom.canUseDOM) {
            return;
        }
        remove();
        if (!el) {
            return;
        }
        var options = _objectSpread({}, _options);
        el.addEventListener(event, cb, options);
        detach.current = function() {
            return el.removeEventListener(event, cb, options);
        };
    }, [
        _options,
        cb,
        event,
        remove
    ]);
    _react.useEffect(function() {
        return remove;
    }, [
        remove
    ]);
    return _react.useMemo(function() {
        return {
            add: add,
            remove: remove
        };
    }, [
        add,
        remove
    ]);
}

//# sourceMappingURL=useEventListener.js.map