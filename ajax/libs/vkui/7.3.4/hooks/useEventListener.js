import { _ as _class_private_field_get } from "@swc/helpers/_/_class_private_field_get";
import { _ as _class_private_field_init } from "@swc/helpers/_/_class_private_field_init";
import { _ as _class_private_field_set } from "@swc/helpers/_/_class_private_field_set";
import { _ as _define_property } from "@swc/helpers/_/_define_property";
import * as React from "react";
import { noop } from "@vkontakte/vkjs";
import { canUseDOM } from "../lib/dom.js";
var _target = /*#__PURE__*/ new WeakMap(), _listener = /*#__PURE__*/ new WeakMap();
class EventListener {
    constructor(type, callback, options){
        _define_property(this, "callback", noop);
        _define_property(this, "options", undefined);
        _define_property(this, "eventType", void 0);
        _class_private_field_init(this, _target, {
            writable: true,
            value: null
        });
        _class_private_field_init(this, _listener, {
            writable: true,
            value: (ev)=>{
                this.callback(ev);
            }
        });
        _define_property(this, "add", (el)=>{
            if (!canUseDOM) {
                return;
            }
            this.remove();
            if (!el) {
                return;
            }
            el.addEventListener(this.eventType, _class_private_field_get(this, _listener), this.options);
            _class_private_field_set(this, _target, el);
        });
        _define_property(this, "remove", ()=>{
            if (!canUseDOM || !_class_private_field_get(this, _target)) {
                return;
            }
            _class_private_field_get(this, _target).removeEventListener(this.eventType, _class_private_field_get(this, _listener), this.options);
            _class_private_field_set(this, _target, null);
        });
        this.options = options;
        this.eventType = type;
        if (callback) {
            this.callback = callback;
        }
    }
}
export function useEventListener(event, _cb, _options) {
    const ref = React.useRef(null);
    if (ref.current === null) {
        ref.current = new EventListener(event, _cb, _options);
    } else {
        ref.current.eventType = event;
        ref.current.options = _options;
        if (_cb) {
            ref.current.callback = _cb;
        }
    }
    React.useEffect(()=>{
        var _ref_current;
        const detach = (_ref_current = ref.current) === null || _ref_current === void 0 ? void 0 : _ref_current.remove.bind(ref.current);
        return detach;
    }, []);
    return ref.current;
}

//# sourceMappingURL=useEventListener.js.map