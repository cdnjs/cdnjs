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
const _class_private_field_get = require("@swc/helpers/_/_class_private_field_get");
const _class_private_field_init = require("@swc/helpers/_/_class_private_field_init");
const _class_private_field_set = require("@swc/helpers/_/_class_private_field_set");
const _define_property = require("@swc/helpers/_/_define_property");
const _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
const _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
const _vkjs = require("@vkontakte/vkjs");
const _dom = require("../lib/dom");
var _target = /*#__PURE__*/ new WeakMap(), _listener = /*#__PURE__*/ new WeakMap();
class EventListener {
    constructor(type, callback, options){
        _define_property._(this, "callback", _vkjs.noop);
        _define_property._(this, "options", undefined);
        _define_property._(this, "eventType", void 0);
        _class_private_field_init._(this, _target, {
            writable: true,
            value: null
        });
        _class_private_field_init._(this, _listener, {
            writable: true,
            value: (ev)=>{
                this.callback(ev);
            }
        });
        _define_property._(this, "add", (el)=>{
            if (!_dom.canUseDOM) {
                return;
            }
            this.remove();
            if (!el) {
                return;
            }
            el.addEventListener(this.eventType, _class_private_field_get._(this, _listener), this.options);
            _class_private_field_set._(this, _target, el);
        });
        _define_property._(this, "remove", ()=>{
            if (!_dom.canUseDOM || !_class_private_field_get._(this, _target)) {
                return;
            }
            _class_private_field_get._(this, _target).removeEventListener(this.eventType, _class_private_field_get._(this, _listener), this.options);
            _class_private_field_set._(this, _target, null);
        });
        this.options = options;
        this.eventType = type;
        if (callback) {
            this.callback = callback;
        }
    }
}
function useEventListener(event, _cb, _options) {
    const ref = _react.useRef(null);
    if (ref.current === null) {
        ref.current = new EventListener(event, _cb, _options);
    } else {
        ref.current.eventType = event;
        ref.current.options = _options;
        if (_cb) {
            ref.current.callback = _cb;
        }
    }
    _react.useEffect(()=>{
        var _ref_current;
        const detach = (_ref_current = ref.current) === null || _ref_current === void 0 ? void 0 : _ref_current.remove.bind(ref.current);
        return detach;
    }, []);
    return ref.current;
}

//# sourceMappingURL=useEventListener.js.map