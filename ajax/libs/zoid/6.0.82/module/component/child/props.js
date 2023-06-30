import { getDomain } from 'cross-domain-utils/src';

export function normalizeChildProp(component, props, key, value) {

    // $FlowFixMe
    var prop = component.getProp(key);

    if (!prop) {
        if (component.looseProps) {
            return value;
        } else {
            return;
        }
    }

    if (typeof prop.childDecorate === 'function') {
        return prop.childDecorate(value);
    }

    return value;
}

export function normalizeChildProps(component, props, origin) {
    var required = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;


    var result = {};

    for (var _i2 = 0, _Object$keys2 = Object.keys(props), _length2 = _Object$keys2 == null ? 0 : _Object$keys2.length; _i2 < _length2; _i2++) {
        var key = _Object$keys2[_i2];

        var prop = component.getProp(key);
        var value = props[key];

        if (prop && prop.sameDomain && origin !== getDomain(window)) {
            continue;
        }

        result[key] = normalizeChildProp(component, props, key, value);

        if (prop && prop.alias && !result[prop.alias]) {
            result[prop.alias] = value;
        }
    }

    if (required) {
        for (var _i4 = 0, _component$getPropNam2 = component.getPropNames(), _length4 = _component$getPropNam2 == null ? 0 : _component$getPropNam2.length; _i4 < _length4; _i4++) {
            var _key = _component$getPropNam2[_i4];
            if (!props.hasOwnProperty(_key)) {
                result[_key] = normalizeChildProp(component, props, _key, props[_key]);
            }
        }
    }

    // $FlowFixMe
    return result;
}