function isObject(value) {
    return Object.prototype.toString.call(value) === '[object Object]';
}

function isNumber(value) {
    return typeof value === 'number' && isFinite(value);
}

function interpolate(string, object) {
    var pattern = /(#\{(.*?)\})/g;
    return string.replace(pattern, function () {
        var name = arguments[2];
        var value = object[name];
        if (isNumber(value)) {
            value = value.toString();
        }
        return typeof value === 'string' ? value : '';
    });
}

var enumerables = ['valueOf', 'toLocaleString', 'toString', 'constructor'];

function apply(object, config, defaults) {
    if (defaults) {
        apply(object, defaults);
    }

    if (object && config && typeof config === 'object') {
        var i, j, k;

        for (i in config) {
            object[i] = config[i];
        }

        if (enumerables) {
            for (j = enumerables.length; j--;) {
                k = enumerables[j];
                if (config.hasOwnProperty(k)) {
                    object[k] = config[k];
                }
            }
        }
    }

    return object;
}


module.exports = {
    isObject: isObject,
    isNumber: isNumber,
    interpolate: interpolate,
    apply: apply
};