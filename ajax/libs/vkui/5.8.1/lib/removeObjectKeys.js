import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
export function removeObjectKeys(obj) {
    var keys = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : [];
    var newObj = _object_spread({}, obj);
    keys.forEach(function(key) {
        return delete newObj[key];
    });
    return newObj;
}

//# sourceMappingURL=removeObjectKeys.js.map