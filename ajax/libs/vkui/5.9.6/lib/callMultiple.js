import { _ as _to_consumable_array } from "@swc/helpers/_/_to_consumable_array";
export var callMultiple = function() {
    for(var _len = arguments.length, fns = new Array(_len), _key = 0; _key < _len; _key++){
        fns[_key] = arguments[_key];
    }
    return function() {
        for(var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++){
            args[_key] = arguments[_key];
        }
        return fns.filter(function(f) {
            return typeof f === "function";
        }).forEach(function(f) {
            return f.apply(void 0, _to_consumable_array(args));
        });
    };
};

//# sourceMappingURL=callMultiple.js.map