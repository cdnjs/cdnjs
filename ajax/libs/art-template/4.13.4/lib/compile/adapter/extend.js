'use strict';

var toString = Object.prototype.toString;
var toType = function toType(value) {
    // Null: 兼容 IE8
    return value === null ? 'Null' : toString.call(value).slice(8, -1);
};

/**
 * 快速继承默认配置
 * @param   {Object}    options
 * @param   {?Object}   defaults
 * @return  {Object}
 */
var extend = function extend(target, defaults) {
    var object = void 0;
    var type = toType(target);

    if (type === 'Object') {
        object = Object.create(defaults || {});
    } else if (type === 'Array') {
        object = [].concat(defaults || []);
    }

    if (object) {
        for (var index in target) {
            if (Object.hasOwnProperty.call(target, index)) {
                object[index] = extend(target[index], object[index]);
            }
        }
        return object;
    } else {
        return target;
    }
};

module.exports = extend;