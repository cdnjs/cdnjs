import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
export function removeObjectKeys(obj, keys = []) {
    let newObj = _object_spread({}, obj);
    keys.forEach((key)=>delete newObj[key]);
    return newObj;
}

//# sourceMappingURL=removeObjectKeys.js.map