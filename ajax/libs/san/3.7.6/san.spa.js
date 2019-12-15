/**
 * Copyright (c) Baidu Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license.
 * See LICENSE file in the project root for license information.
 *
 * @file San 主文件
 */

(function (root) {
    // 人工调整打包代码顺序，通过注释手工写一些依赖
//     // require('./util/guid');
//     // require('./util/empty');
//     // require('./util/extend');
//     // require('./util/inherits');
//     // require('./util/each');
//     // require('./util/contains');
//     // require('./util/bind');
//     // require('./browser/on');
//     // require('./browser/un');
//     // require('./browser/svg-tags');
//     // require('./browser/create-el');
//     // require('./browser/remove-el');
//     // require('./util/next-tick');
//     // require('./browser/ie');
//     // require('./browser/ie-old-than-9');
//     // require('./browser/input-event-compatible');
//     // require('./browser/auto-close-tags');
//     // require('./util/data-types.js');
//     // require('./util/create-data-types-checker.js');
//     // require('./parser/walker');
//     // require('./parser/parse-template');
//     // require('./runtime/change-expr-compare');
//     // require('./runtime/data-change-type');
//     // require('./runtime/default-filters');
//     // require('./view/life-cycle');
//     // require('./view/node-type');
//     // require('./view/get-prop-handler');
//     // require('./view/is-data-change-by-element');
//     // require('./view/get-event-listener');
//     // require('./view/create-node');


    /**
 * Copyright (c) Baidu Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license.
 * See LICENSE file in the project root for license information.
 *
 * @file 唯一id
 */


/**
 * 获取唯一id
 *
 * @type {number} 唯一id
 */
var guid = 1;

// exports = module.exports = guid;


/**
 * Copyright (c) Baidu Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license.
 * See LICENSE file in the project root for license information.
 *
 * @file 空函数
 */


/**
 * 啥都不干
 */
function empty() {}

// exports = module.exports = empty;


/**
 * Copyright (c) Baidu Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license.
 * See LICENSE file in the project root for license information.
 *
 * @file 属性拷贝
 */

/**
 * 对象属性拷贝
 *
 * @param {Object} target 目标对象
 * @param {Object} source 源对象
 * @return {Object} 返回目标对象
 */
function extend(target, source) {
    for (var key in source) {
        /* istanbul ignore else  */
        if (source.hasOwnProperty(key)) {
            var value = source[key];
            if (typeof value !== 'undefined') {
                target[key] = value;
            }
        }
    }

    return target;
}

// exports = module.exports = extend;


/**
 * Copyright (c) Baidu Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license.
 * See LICENSE file in the project root for license information.
 *
 * @file 构建类之间的继承关系
 */

// var extend = require('./extend');

/**
 * 构建类之间的继承关系
 *
 * @param {Function} subClass 子类函数
 * @param {Function} superClass 父类函数
 */
function inherits(subClass, superClass) {
    /* jshint -W054 */
    var subClassProto = subClass.prototype;
    var F = new Function();
    F.prototype = superClass.prototype;
    subClass.prototype = new F();
    subClass.prototype.constructor = subClass;
    extend(subClass.prototype, subClassProto);
    /* jshint +W054 */
}

// exports = module.exports = inherits;


/**
 * Copyright (c) Baidu Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license.
 * See LICENSE file in the project root for license information.
 *
 * @file 遍历数组
 */


/**
 * 遍历数组集合
 *
 * @param {Array} array 数组源
 * @param {function(Any,number):boolean} iterator 遍历函数
 */
function each(array, iterator) {
    if (array && array.length > 0) {
        for (var i = 0, l = array.length; i < l; i++) {
            if (iterator(array[i], i) === false) {
                break;
            }
        }
    }
}

// exports = module.exports = each;


/**
 * Copyright (c) Baidu Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license.
 * See LICENSE file in the project root for license information.
 *
 * @file 判断数组中是否包含某项
 */

// var each = require('./each');

/**
 * 判断数组中是否包含某项
 *
 * @param {Array} array 数组
 * @param {*} value 包含的项
 * @return {boolean}
 */
function contains(array, value) {
    var result = false;
    each(array, function (item) {
        result = item === value;
        return !result;
    });

    return result;
}

// exports = module.exports = contains;


/**
 * Copyright (c) Baidu Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license.
 * See LICENSE file in the project root for license information.
 *
 * @file bind函数
 */

/**
 * Function.prototype.bind 方法的兼容性封装
 *
 * @param {Function} func 要bind的函数
 * @param {Object} thisArg this指向对象
 * @param {...*} args 预设的初始参数
 * @return {Function}
 */
function bind(func, thisArg) {
    var nativeBind = Function.prototype.bind;
    var slice = Array.prototype.slice;
    // #[begin] allua
    if (nativeBind && func.bind === nativeBind) {
    // #[end]
        return nativeBind.apply(func, slice.call(arguments, 1));
    // #[begin] allua
    }

    /* istanbul ignore next */
    var args = slice.call(arguments, 2);
    /* istanbul ignore next */
    return function () {
        return func.apply(thisArg, args.concat(slice.call(arguments)));
    };
    // #[end]
}

// exports = module.exports = bind;


/**
 * Copyright (c) Baidu Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license.
 * See LICENSE file in the project root for license information.
 *
 * @file DOM 事件挂载
 */

/**
 * DOM 事件挂载
 *
 * @inner
 * @param {HTMLElement} el DOM元素
 * @param {string} eventName 事件名
 * @param {Function} listener 监听函数
 * @param {boolean} capture 是否是捕获阶段
 */
function on(el, eventName, listener, capture) {
    // #[begin] allua
    /* istanbul ignore else */
    if (el.addEventListener) {
    // #[end]
        el.addEventListener(eventName, listener, capture);
    // #[begin] allua
    }
    else {
        el.attachEvent('on' + eventName, listener);
    }
    // #[end]
}

// exports = module.exports = on;


/**
 * Copyright (c) Baidu Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license.
 * See LICENSE file in the project root for license information.
 *
 * @file DOM 事件卸载
 */

/**
 * DOM 事件卸载
 *
 * @inner
 * @param {HTMLElement} el DOM元素
 * @param {string} eventName 事件名
 * @param {Function} listener 监听函数
 * @param {boolean} capture 是否是捕获阶段
 */
function un(el, eventName, listener, capture) {
    // #[begin] allua
    /* istanbul ignore else */
    if (el.addEventListener) {
    // #[end]
        el.removeEventListener(eventName, listener, capture);
    // #[begin] allua
    }
    else {
        el.detachEvent('on' + eventName, listener);
    }
    // #[end]
}

// exports = module.exports = un;


/**
 * Copyright (c) Baidu Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license.
 * See LICENSE file in the project root for license information.
 *
 * @file 将字符串逗号切分返回对象
 */

// var each = require('../util/each');

/**
 * 将字符串逗号切分返回对象
 *
 * @param {string} source 源字符串
 * @return {Object}
 */
function splitStr2Obj(source) {
    var result = {};
    each(
        source.split(','),
        function (key) {
            result[key] = key;
        }
    );
    return result;
}

// exports = module.exports = splitStr2Obj;


/**
 * Copyright (c) Baidu Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license.
 * See LICENSE file in the project root for license information.
 *
 * @file SVG标签表
 */

// var splitStr2Obj = require('../util/split-str-2-obj');

/**
 * svgTags
 *
 * @see https://www.w3.org/TR/SVG/svgdtd.html 只取常用
 * @type {Object}
 */
var svgTags = splitStr2Obj(''
    // structure
    + 'svg,g,defs,desc,metadata,symbol,use,'
    // image & shape
    + 'image,path,rect,circle,line,ellipse,polyline,polygon,'
    // text
    + 'text,tspan,tref,textpath,'
    // other
    + 'marker,pattern,clippath,mask,filter,cursor,view,animate,'
    // font
    + 'font,font-face,glyph,missing-glyph,'
    // camel
    + 'animateColor,animateMotion,animateTransform,textPath,foreignObject'
);

// exports = module.exports = svgTags;


/**
 * Copyright (c) Baidu Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license.
 * See LICENSE file in the project root for license information.
 *
 * @file DOM创建
 */

// var svgTags = require('./svg-tags');

/**
 * 创建 DOM 元素
 *
 * @param  {string} tagName tagName
 * @return {HTMLElement}
 */
function createEl(tagName) {
    if (svgTags[tagName]) {
        return document.createElementNS('http://www.w3.org/2000/svg', tagName);
    }

    return document.createElement(tagName);
}

// exports = module.exports = createEl;


/**
 * Copyright (c) Baidu Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license.
 * See LICENSE file in the project root for license information.
 *
 * @file 移除DOM
 */

/**
 * 将 DOM 从页面中移除
 *
 * @param {HTMLElement} el DOM元素
 */
function removeEl(el) {
    if (el && el.parentNode) {
        el.parentNode.removeChild(el);
    }
}

// exports = module.exports = removeEl;


/**
 * Copyright (c) Baidu Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license.
 * See LICENSE file in the project root for license information.
 *
 * @file 在下一个时间周期运行任务
 */

// 该方法参照了vue2.5.0的实现，感谢vue团队
// SEE: https://github.com/vuejs/vue/blob/0948d999f2fddf9f90991956493f976273c5da1f/src/core/util/env.js#L68


// var bind = require('./bind');

/**
 * 下一个周期要执行的任务列表
 *
 * @inner
 * @type {Array}
 */
var nextTasks = [];

/**
 * 执行下一个周期任务的函数
 *
 * @inner
 * @type {Function}
 */
var nextHandler;

/**
 * 浏览器是否支持原生Promise
 * 对Promise做判断，是为了禁用一些不严谨的Promise的polyfill
 *
 * @inner
 * @type {boolean}
 */
var isNativePromise = typeof Promise === 'function' && /native code/.test(Promise);

/**
 * 在下一个时间周期运行任务
 *
 * @inner
 * @param {Function} fn 要运行的任务函数
 * @param {Object=} thisArg this指向对象
 */
function nextTick(fn, thisArg) {
    if (thisArg) {
        fn = bind(fn, thisArg);
    }
    nextTasks.push(fn);

    if (nextHandler) {
        return;
    }

    nextHandler = function () {
        var tasks = nextTasks.slice(0);
        nextTasks = [];
        nextHandler = null;

        for (var i = 0, l = tasks.length; i < l; i++) {
            tasks[i]();
        }
    };

    // 非标准方法，但是此方法非常吻合要求。
    /* istanbul ignore next */
    if (typeof setImmediate === 'function') {
        setImmediate(nextHandler);
    }
    // 用MessageChannel去做setImmediate的polyfill
    // 原理是将新的message事件加入到原有的dom events之后
    else if (typeof MessageChannel === 'function') {
        var channel = new MessageChannel();
        var port = channel.port2;
        channel.port1.onmessage = nextHandler;
        port.postMessage(1);
    }
    // for native app
    else if (isNativePromise) {
        Promise.resolve().then(nextHandler);
    }
    else {
        setTimeout(nextHandler, 0);
    }
}

// exports = module.exports = nextTick;


/**
 * Copyright (c) Baidu Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license.
 * See LICENSE file in the project root for license information.
 *
 * @file ie版本号
 */

// #[begin] allua
/**
 * 从userAgent中ie版本号的匹配信息
 *
 * @type {Array}
 */
var ieVersionMatch = typeof navigator !== 'undefined'
    && navigator.userAgent.match(/msie\s*([0-9]+)/i);

/**
 * ie版本号，非ie时为0
 *
 * @type {number}
 */
var ie = ieVersionMatch ? /* istanbul ignore next */ ieVersionMatch[1] - 0 : 0;
// #[end]

// exports = module.exports = ie;


/**
 * Copyright (c) Baidu Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license.
 * See LICENSE file in the project root for license information.
 *
 * @file 是否 IE 并且小于 9
 */

// var ie = require('./ie');

// HACK:
// 1. IE8下，设置innerHTML时如果以html comment开头，comment会被自动滤掉
//    为了保证stump存在，需要设置完html后，createComment并appendChild/insertBefore
// 2. IE8下，innerHTML还不支持custom element，所以需要用div替代，不用createElement
// 3. 虽然IE8已经优化了字符串+连接，碎片化连接性能不再退化
//    但是由于上面多个兼容场景都用 < 9 判断，所以字符串连接也沿用
//    所以结果是IE8下字符串连接用的是数组join的方式

// #[begin] allua
/**
 * 是否 IE 并且小于 9
 */
var ieOldThan9 = ie && /* istanbul ignore next */ ie < 9;
// #[end]

// exports = module.exports = ieOldThan9;


/**
 * Copyright (c) Baidu Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license.
 * See LICENSE file in the project root for license information.
 *
 * @file 触发元素事件
 */

/**
 * 触发元素事件
 *
 * @inner
 * @param {HTMLElement} el DOM元素
 * @param {string} eventName 事件名
 */
function trigger(el, eventName) {
    var event = document.createEvent('HTMLEvents');
    event.initEvent(eventName, true, true);
    el.dispatchEvent(event);
}

// exports = module.exports = trigger;


/**
 * Copyright (c) Baidu Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license.
 * See LICENSE file in the project root for license information.
 *
 * @file 解决 IE9 在表单元素中删除字符时不触发事件的问题
 */

// var ie = require('./ie');
// var on = require('./on');
// var trigger = require('./trigger');

// #[begin] allua
/* istanbul ignore if */
if (ie === 9) {
    on(document, 'selectionchange', function () {
        var el = document.activeElement;
        if (el.tagName === 'TEXTAREA' || el.tagName === 'INPUT') {
            trigger(el, 'input');
        }
    });
}
// #[end]


/**
 * Copyright (c) Baidu Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license.
 * See LICENSE file in the project root for license information.
 *
 * @file 自闭合标签表
 */

// var splitStr2Obj = require('../util/split-str-2-obj');

/**
 * 自闭合标签列表
 *
 * @type {Object}
 */
var autoCloseTags = splitStr2Obj('area,base,br,col,embed,hr,img,input,keygen,param,source,track,wbr');

// exports = module.exports = autoCloseTags;


/**
 * Copyright (c) Baidu Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license.
 * See LICENSE file in the project root for license information.
 *
 * @file data types
 */

// var bind = require('./bind');
// var empty = require('./empty');
// var extend = require('./extend');

// #[begin] error
// var ANONYMOUS_CLASS_NAME = '<<anonymous>>';
// 
// /**
//  * 获取精确的类型
//  *
//  * @NOTE 如果 obj 是一个 DOMElement，我们会返回 `element`；
//  *
//  * @param  {*} obj 目标
//  * @return {string}
//  */
// function getDataType(obj) {
//     // 不支持element了。data应该是纯数据
//     // if (obj && obj.nodeType === 1) {
//     //     return 'element';
//     // }
// 
//     return Object.prototype.toString
//         .call(obj)
//         .slice(8, -1)
//         .toLowerCase();
// }
// #[end]

/**
 * 创建链式的数据类型校验器
 *
 * @param  {Function} validate 真正的校验器
 * @return {Function}
 */
function createChainableChecker(validate) {
    /* istanbul ignore next */
    var chainedChecker = function () {};
    chainedChecker.isRequired = empty;

    // 只在 error 功能启用时才有实际上的 dataTypes 检测
    // #[begin] error
//     validate = validate || empty;
//     var checkType = function (isRequired, data, dataName, componentName, fullDataName) {
// 
//         var dataValue = data[dataName];
//         var dataType = getDataType(dataValue);
// 
//         /* istanbul ignore next */
//         componentName = componentName || ANONYMOUS_CLASS_NAME;
// 
//         // 如果是 null 或 undefined，那么要提前返回啦
//         if (dataValue == null) {
//             // 是 required 就报错
//             if (isRequired) {
//                 throw new Error('[SAN ERROR] '
//                     + 'The `' + dataName + '` '
//                     + 'is marked as required in `' + componentName + '`, '
//                     + 'but its value is ' + dataType
//                 );
//             }
//             // 不是 required，那就是 ok 的
//             return;
//         }
// 
//         validate(data, dataName, componentName, fullDataName);
// 
//     };
// 
//     chainedChecker = bind(checkType, null, false);
//     chainedChecker.isRequired = bind(checkType, null, true);
    // #[end]

    return chainedChecker;

}

// #[begin] error
// /**
//  * 生成主要类型数据校验器
//  *
//  * @param  {string} type 主类型
//  * @return {Function}
//  */
// function createPrimaryTypeChecker(type) {
// 
//     return createChainableChecker(function (data, dataName, componentName, fullDataName) {
// 
//         var dataValue = data[dataName];
//         var dataType = getDataType(dataValue);
// 
//         if (dataType !== type) {
//             throw new Error('[SAN ERROR] '
//                 + 'Invalid ' + componentName + ' data `' + fullDataName + '` of type'
//                 + '(' + dataType + ' supplied to ' + componentName + ', '
//                 + 'expected ' + type + ')'
//             );
//         }
// 
//     });
// 
// }
// 
// 
// 
// /**
//  * 生成 arrayOf 校验器
//  *
//  * @param  {Function} arrayItemChecker 数组中每项数据的校验器
//  * @return {Function}
//  */
// function createArrayOfChecker(arrayItemChecker) {
// 
//     return createChainableChecker(function (data, dataName, componentName, fullDataName) {
// 
//         if (typeof arrayItemChecker !== 'function') {
//             throw new Error('[SAN ERROR] '
//                 + 'Data `' + dataName + '` of `' + componentName + '` has invalid '
//                 + 'DataType notation inside `arrayOf`, expected `function`'
//             );
//         }
// 
//         var dataValue = data[dataName];
//         var dataType = getDataType(dataValue);
// 
//         if (dataType !== 'array') {
//             throw new Error('[SAN ERROR] '
//                 + 'Invalid ' + componentName + ' data `' + fullDataName + '` of type'
//                 + '(' + dataType + ' supplied to ' + componentName + ', '
//                 + 'expected array)'
//             );
//         }
// 
//         for (var i = 0, len = dataValue.length; i < len; i++) {
//             arrayItemChecker(dataValue, i, componentName, fullDataName + '[' + i + ']');
//         }
// 
//     });
// 
// }
// 
// /**
//  * 生成 instanceOf 检测器
//  *
//  * @param  {Function|Class} expectedClass 期待的类
//  * @return {Function}
//  */
// function createInstanceOfChecker(expectedClass) {
// 
//     return createChainableChecker(function (data, dataName, componentName, fullDataName) {
// 
//         var dataValue = data[dataName];
// 
//         if (dataValue instanceof expectedClass) {
//             return;
//         }
// 
//         var dataValueClassName = dataValue.constructor && dataValue.constructor.name
//             ? dataValue.constructor.name
//             : /* istanbul ignore next */ ANONYMOUS_CLASS_NAME;
// 
//         /* istanbul ignore next */
//         var expectedClassName = expectedClass.name || ANONYMOUS_CLASS_NAME;
// 
//         throw new Error('[SAN ERROR] '
//             + 'Invalid ' + componentName + ' data `' + fullDataName + '` of type'
//             + '(' + dataValueClassName + ' supplied to ' + componentName + ', '
//             + 'expected instance of ' + expectedClassName + ')'
//         );
// 
// 
//     });
// 
// }
// 
// /**
//  * 生成 shape 校验器
//  *
//  * @param  {Object} shapeTypes shape 校验规则
//  * @return {Function}
//  */
// function createShapeChecker(shapeTypes) {
// 
//     return createChainableChecker(function (data, dataName, componentName, fullDataName) {
// 
//         if (getDataType(shapeTypes) !== 'object') {
//             throw new Error('[SAN ERROR] '
//                 + 'Data `' + fullDataName + '` of `' + componentName + '` has invalid '
//                 + 'DataType notation inside `shape`, expected `object`'
//             );
//         }
// 
//         var dataValue = data[dataName];
//         var dataType = getDataType(dataValue);
// 
//         if (dataType !== 'object') {
//             throw new Error('[SAN ERROR] '
//                 + 'Invalid ' + componentName + ' data `' + fullDataName + '` of type'
//                 + '(' + dataType + ' supplied to ' + componentName + ', '
//                 + 'expected object)'
//             );
//         }
// 
//         for (var shapeKeyName in shapeTypes) {
//             /* istanbul ignore else  */
//             if (shapeTypes.hasOwnProperty(shapeKeyName)) {
//                 var checker = shapeTypes[shapeKeyName];
//                 if (typeof checker === 'function') {
//                     checker(dataValue, shapeKeyName, componentName, fullDataName + '.' + shapeKeyName);
//                 }
//             }
//         }
// 
//     });
// 
// }
// 
// /**
//  * 生成 oneOf 校验器
//  *
//  * @param  {Array} expectedEnumValues 期待的枚举值
//  * @return {Function}
//  */
// function createOneOfChecker(expectedEnumValues) {
// 
//     return createChainableChecker(function (data, dataName, componentName, fullDataName) {
// 
//         if (getDataType(expectedEnumValues) !== 'array') {
//             throw new Error('[SAN ERROR] '
//                 + 'Data `' + fullDataName + '` of `' + componentName + '` has invalid '
//                 + 'DataType notation inside `oneOf`, array is expected.'
//             );
//         }
// 
//         var dataValue = data[dataName];
// 
//         for (var i = 0, len = expectedEnumValues.length; i < len; i++) {
//             if (dataValue === expectedEnumValues[i]) {
//                 return;
//             }
//         }
// 
//         throw new Error('[SAN ERROR] '
//             + 'Invalid ' + componentName + ' data `' + fullDataName + '` of value'
//             + '(`' + dataValue + '` supplied to ' + componentName + ', '
//             + 'expected one of ' + expectedEnumValues.join(',') + ')'
//         );
// 
//     });
// 
// }
// 
// /**
//  * 生成 oneOfType 校验器
//  *
//  * @param  {Array<Function>} expectedEnumOfTypeValues 期待的枚举类型
//  * @return {Function}
//  */
// function createOneOfTypeChecker(expectedEnumOfTypeValues) {
// 
//     return createChainableChecker(function (data, dataName, componentName, fullDataName) {
// 
//         if (getDataType(expectedEnumOfTypeValues) !== 'array') {
//             throw new Error('[SAN ERROR] '
//                 + 'Data `' + dataName + '` of `' + componentName + '` has invalid '
//                 + 'DataType notation inside `oneOf`, array is expected.'
//             );
//         }
// 
//         var dataValue = data[dataName];
// 
//         for (var i = 0, len = expectedEnumOfTypeValues.length; i < len; i++) {
// 
//             var checker = expectedEnumOfTypeValues[i];
// 
//             if (typeof checker !== 'function') {
//                 continue;
//             }
// 
//             try {
//                 checker(data, dataName, componentName, fullDataName);
//                 // 如果 checker 完成校验没报错，那就返回了
//                 return;
//             }
//             catch (e) {
//                 // 如果有错误，那么应该把错误吞掉
//             }
// 
//         }
// 
//         // 所有的可接受 type 都失败了，才丢一个异常
//         throw new Error('[SAN ERROR] '
//             + 'Invalid ' + componentName + ' data `' + dataName + '` of value'
//             + '(`' + dataValue + '` supplied to ' + componentName + ')'
//         );
// 
//     });
// 
// }
// 
// /**
//  * 生成 objectOf 校验器
//  *
//  * @param  {Function} typeChecker 对象属性值校验器
//  * @return {Function}
//  */
// function createObjectOfChecker(typeChecker) {
// 
//     return createChainableChecker(function (data, dataName, componentName, fullDataName) {
// 
//         if (typeof typeChecker !== 'function') {
//             throw new Error('[SAN ERROR] '
//                 + 'Data `' + dataName + '` of `' + componentName + '` has invalid '
//                 + 'DataType notation inside `objectOf`, expected function'
//             );
//         }
// 
//         var dataValue = data[dataName];
//         var dataType = getDataType(dataValue);
// 
//         if (dataType !== 'object') {
//             throw new Error('[SAN ERROR] '
//                 + 'Invalid ' + componentName + ' data `' + dataName + '` of type'
//                 + '(' + dataType + ' supplied to ' + componentName + ', '
//                 + 'expected object)'
//             );
//         }
// 
//         for (var dataKeyName in dataValue) {
//             /* istanbul ignore else  */
//             if (dataValue.hasOwnProperty(dataKeyName)) {
//                 typeChecker(
//                     dataValue,
//                     dataKeyName,
//                     componentName,
//                     fullDataName + '.' + dataKeyName
//                 );
//             }
//         }
// 
// 
//     });
// 
// }
// 
// /**
//  * 生成 exact 校验器
//  *
//  * @param  {Object} shapeTypes object 形态定义
//  * @return {Function}
//  */
// function createExactChecker(shapeTypes) {
// 
//     return createChainableChecker(function (data, dataName, componentName, fullDataName, secret) {
// 
//         if (getDataType(shapeTypes) !== 'object') {
//             throw new Error('[SAN ERROR] '
//                 + 'Data `' + dataName + '` of `' + componentName + '` has invalid '
//                 + 'DataType notation inside `exact`'
//             );
//         }
// 
//         var dataValue = data[dataName];
//         var dataValueType = getDataType(dataValue);
// 
//         if (dataValueType !== 'object') {
//             throw new Error('[SAN ERROR] '
//                 + 'Invalid data `' + fullDataName + '` of type `' + dataValueType + '`'
//                 + '(supplied to ' + componentName + ', expected `object`)'
//             );
//         }
// 
//         var allKeys = {};
// 
//         // 先合入 shapeTypes
//         extend(allKeys, shapeTypes);
//         // 再合入 dataValue
//         extend(allKeys, dataValue);
//         // 保证 allKeys 的类型正确
// 
//         for (var key in allKeys) {
//             /* istanbul ignore else  */
//             if (allKeys.hasOwnProperty(key)) {
//                 var checker = shapeTypes[key];
// 
//                 // dataValue 中有一个多余的数据项
//                 if (!checker) {
//                     throw new Error('[SAN ERROR] '
//                         + 'Invalid data `' + fullDataName + '` key `' + key + '` '
//                         + 'supplied to `' + componentName + '`. '
//                         + '(`' + key + '` is not defined in `DataTypes.exact`)'
//                     );
//                 }
// 
//                 if (!(key in dataValue)) {
//                     throw new Error('[SAN ERROR] '
//                         + 'Invalid data `' + fullDataName + '` key `' + key + '` '
//                         + 'supplied to `' + componentName + '`. '
//                         + '(`' + key + '` is marked `required` in `DataTypes.exact`)'
//                     );
//                 }
// 
//                 checker(
//                     dataValue,
//                     key,
//                     componentName,
//                     fullDataName + '.' + key,
//                     secret
//                 );
// 
//             }
//         }
// 
//     });
// 
// }
// #[end]



/* eslint-disable fecs-valid-var-jsdoc */
var DataTypes = {
    array: createChainableChecker(),
    object: createChainableChecker(),
    func: createChainableChecker(),
    string: createChainableChecker(),
    number: createChainableChecker(),
    bool: createChainableChecker(),
    symbol: createChainableChecker(),
    any: createChainableChecker,
    arrayOf: createChainableChecker,
    instanceOf: createChainableChecker,
    shape: createChainableChecker,
    oneOf: createChainableChecker,
    oneOfType: createChainableChecker,
    objectOf: createChainableChecker,
    exact: createChainableChecker
};

// #[begin] error
// DataTypes = {
// 
//     any: createChainableChecker(),
// 
//     // 类型检测
//     array: createPrimaryTypeChecker('array'),
//     object: createPrimaryTypeChecker('object'),
//     func: createPrimaryTypeChecker('function'),
//     string: createPrimaryTypeChecker('string'),
//     number: createPrimaryTypeChecker('number'),
//     bool: createPrimaryTypeChecker('boolean'),
//     symbol: createPrimaryTypeChecker('symbol'),
// 
//     // 复合类型检测
//     arrayOf: createArrayOfChecker,
//     instanceOf: createInstanceOfChecker,
//     shape: createShapeChecker,
//     oneOf: createOneOfChecker,
//     oneOfType: createOneOfTypeChecker,
//     objectOf: createObjectOfChecker,
//     exact: createExactChecker
// 
// };
// /* eslint-enable fecs-valid-var-jsdoc */
// #[end]


// module.exports = DataTypes;


/**
 * Copyright (c) Baidu Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license.
 * See LICENSE file in the project root for license information.
 *
 * @file 创建数据检测函数
 */


// #[begin] error
// 
// /**
//  * 创建数据检测函数
//  *
//  * @param  {Object} dataTypes     数据格式
//  * @param  {string} componentName 组件名
//  * @return {Function}
//  */
// function createDataTypesChecker(dataTypes, componentName) {
// 
//     /**
//      * 校验 data 是否满足 data types 的格式
//      *
//      * @param  {*} data 数据
//      */
//     return function (data) {
// 
//         for (var dataTypeName in dataTypes) {
//             /* istanbul ignore else  */
//             if (dataTypes.hasOwnProperty(dataTypeName)) {
// 
//                 var dataTypeChecker = dataTypes[dataTypeName];
// 
//                 if (typeof dataTypeChecker !== 'function') {
//                     throw new Error('[SAN ERROR] '
//                         + componentName + ':' + dataTypeName + ' is invalid; '
//                         + 'it must be a function, usually from san.DataTypes'
//                     );
//                 }
// 
//                 dataTypeChecker(
//                     data,
//                     dataTypeName,
//                     componentName,
//                     dataTypeName
//                 );
// 
// 
//             }
//         }
// 
//     };
// 
// }
// 
// #[end]

// module.exports = createDataTypesChecker;


/**
 * Copyright (c) Baidu Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license.
 * See LICENSE file in the project root for license information.
 *
 * @file 字符串源码读取类
 */


/**
 * 字符串源码读取类，用于模板字符串解析过程
 *
 * @class
 * @param {string} source 要读取的字符串
 */
function Walker(source) {
    this.source = source;
    this.len = this.source.length;
    this.index = 0;
}

/**
 * 获取当前字符码
 *
 * @return {number}
 */
Walker.prototype.currentCode = function () {
    return this.source.charCodeAt(this.index);
};

/**
 * 截取字符串片段
 *
 * @param {number} start 起始位置
 * @param {number} end 结束位置
 * @return {string}
 */
Walker.prototype.cut = function (start, end) {
    return this.source.slice(start, end);
};

/**
 * 向前读取字符
 *
 * @param {number} distance 读取字符数
 */
Walker.prototype.go = function (distance) {
    this.index += distance;
};

/**
 * 读取下一个字符，返回下一个字符的 code
 *
 * @return {number}
 */
Walker.prototype.nextCode = function () {
    this.go(1);
    return this.currentCode();
};

/**
 * 获取相应位置字符的 code
 *
 * @param {number} index 字符位置
 * @return {number}
 */
Walker.prototype.charCode = function (index) {
    return this.source.charCodeAt(index);
};

/**
 * 向前读取字符，直到遇到指定字符再停止
 * 未指定字符时，当遇到第一个非空格、制表符的字符停止
 *
 * @param {number=} charCode 指定字符的code
 * @return {boolean} 当指定字符时，返回是否碰到指定的字符
 */
Walker.prototype.goUntil = function (charCode) {
    var code;
    while (this.index < this.len && (code = this.currentCode())) {
        switch (code) {
            case 32: // 空格 space
            case 9: // 制表符 tab
            case 13: // \r
            case 10: // \n
                this.index++;
                break;

            default:
                if (code === charCode) {
                    this.index++;
                    return 1;
                }
                return;
        }
    }
};

/**
 * 向前读取符合规则的字符片段，并返回规则匹配结果
 *
 * @param {RegExp} reg 字符片段的正则表达式
 * @param {boolean} isMatchStart 是否必须匹配当前位置
 * @return {Array?}
 */
Walker.prototype.match = function (reg, isMatchStart) {
    reg.lastIndex = this.index;

    var match = reg.exec(this.source);
    if (match && (!isMatchStart || this.index === match.index)) {
        this.index = reg.lastIndex;
        return match;
    }
};

// exports = module.exports = Walker;


/**
 * Copyright (c) Baidu Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license.
 * See LICENSE file in the project root for license information.
 *
 * @file 把 kebab case 字符串转换成 camel case
 */

/**
 * 把 kebab case 字符串转换成 camel case
 *
 * @param {string} source 源字符串
 * @return {string}
 */
function kebab2camel(source) {
    return source.replace(/-+(.)/ig, function (match, alpha) {
        return alpha.toUpperCase();
    });
}

// exports = module.exports = kebab2camel;


/**
 * Copyright (c) Baidu Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license.
 * See LICENSE file in the project root for license information.
 *
 * @file 表达式类型
 */

/**
 * 表达式类型
 *
 * @const
 * @type {Object}
 */
var ExprType = {
    STRING: 1,
    NUMBER: 2,
    BOOL: 3,
    ACCESSOR: 4,
    INTERP: 5,
    CALL: 6,
    TEXT: 7,
    BINARY: 8,
    UNARY: 9,
    TERTIARY: 10,
    OBJECT: 11,
    ARRAY: 12
};

// exports = module.exports = ExprType;


/**
 * Copyright (c) Baidu Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license.
 * See LICENSE file in the project root for license information.
 *
 * @file 创建访问表达式对象
 */

// var ExprType = require('./expr-type');

/**
 * 创建访问表达式对象
 *
 * @param {Array} paths 访问路径
 * @return {Object}
 */
function createAccessor(paths) {
    return {
        type: 4,
        paths: paths
    };
}

// exports = module.exports = createAccessor;


/**
 * Copyright (c) Baidu Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license.
 * See LICENSE file in the project root for license information.
 *
 * @file 读取字符串
 */


// var ExprType = require('./expr-type');

/**
 * 读取字符串
 *
 * @param {Walker} walker 源码读取对象
 * @return {Object}
 */
function readString(walker) {
    var startCode = walker.currentCode();
    var startIndex = walker.index;
    var charCode;

    walkLoop: while ((charCode = walker.nextCode())) {
        switch (charCode) {
            case 92: // \
                walker.go(1);
                break;
            case startCode:
                walker.go(1);
                break walkLoop;
        }
    }

    var literal = walker.cut(startIndex, walker.index);
    return {
        type: 1,
        // 处理字符转义
        value: (new Function('return ' + literal))()
    };
}

// exports = module.exports = readString;


/**
 * Copyright (c) Baidu Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license.
 * See LICENSE file in the project root for license information.
 *
 * @file 读取一元表达式
 */

// var ExprType = require('./expr-type');
// var readString = require('./read-string');
// var readNumber = require('./read-number');
// var readCall = require('./read-call');
// var readParenthesizedExpr = require('./read-parenthesized-expr');
// var readTertiaryExpr = require('./read-tertiary-expr');


/**
 * 读取一元表达式
 *
 * @param {Walker} walker 源码读取对象
 * @return {Object}
 */
function readUnaryExpr(walker) {
    walker.goUntil();

    switch (walker.currentCode()) {
        case 33: // !
            walker.go(1);
            return {
                type: 9,
                expr: readUnaryExpr(walker),
                operator: 33
            };

        case 34: // "
        case 39: // '
            return readString(walker);

        case 45: // -
        case 48: // number
        case 49:
        case 50:
        case 51:
        case 52:
        case 53:
        case 54:
        case 55:
        case 56:
        case 57:
            return readNumber(walker);

        case 40: // (
            return readParenthesizedExpr(walker);

        // array literal
        case 91: // [
            walker.go(1);
            var arrItems = [];
            while (!walker.goUntil(93)) { // ]
                var item = {};
                arrItems.push(item);

                if (walker.currentCode() === 46 && walker.match(/\.\.\.\s*/g)) {
                    item.spread = true;
                }

                item.expr = readTertiaryExpr(walker);
                walker.goUntil(44); // ,
            }

            return {
                type: 12,
                items: arrItems
            };

        // object literal
        case 123: // {
            walker.go(1);
            var objItems = [];

            while (!walker.goUntil(125)) { // }
                var item = {};
                objItems.push(item);

                if (walker.currentCode() === 46 && walker.match(/\.\.\.\s*/g)) {
                    item.spread = true;
                    item.expr = readTertiaryExpr(walker);
                }
                else {
                    // #[begin] error
//                     var walkerIndexBeforeName = walker.index;
                    // #[end]

                    item.name = readUnaryExpr(walker);

                    // #[begin] error
//                     if (item.name.type > 4) {
//                         throw new Error(
//                             '[SAN FATAL] unexpect object name: '
//                             + walker.cut(walkerIndexBeforeName, walker.index)
//                         );
//                     }
                    // #[end]

                    if (walker.goUntil(58)) { // :
                        item.expr = readTertiaryExpr(walker);
                    }
                    else {
                        item.expr = item.name;
                    }

                    if (item.name.type === 4) {
                        item.name = item.name.paths[0];
                    }
                }

                walker.goUntil(44); // ,
            }

            return {
                type: 11,
                items: objItems
            };
    }

    return readCall(walker);
}

// exports = module.exports = readUnaryExpr;


/**
 * Copyright (c) Baidu Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license.
 * See LICENSE file in the project root for license information.
 *
 * @file 读取数字
 */


// var ExprType = require('./expr-type');
// var readUnaryExpr = require('./read-unary-expr');

/**
 * 读取数字
 *
 * @inner
 * @param {Walker} walker 源码读取对象
 * @return {Object}
 */
function readNumber(walker) {
    var match = walker.match(/\s*(-?[0-9]+(\.[0-9]+)?)/g, 1);

    if (match) {
        return {
            type: 2,
            value: +match[1]
        };
    }
    else if (walker.currentCode() === 45) {
        walker.go(1);
        return {
            type: 9,
            expr: readUnaryExpr(walker),
            operator: 45
        };
    }
}

// exports = module.exports = readNumber;


/**
 * Copyright (c) Baidu Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license.
 * See LICENSE file in the project root for license information.
 *
 * @file 读取ident
 */

/**
 * 读取ident
 * 这里的 ident 指标识符(identifier)，也就是通常意义上的变量名
 * 这里默认的变量名规则为：由美元符号($)、数字、字母或者下划线(_)构成的字符串
 *
 * @inner
 * @param {Walker} walker 源码读取对象
 * @return {string}
 */
function readIdent(walker) {
    var match = walker.match(/\s*([\$0-9a-z_]+)/ig, 1);

    // #[begin] error
//     if (!match) {
//         throw new Error('[SAN FATAL] expect an ident: ' + walker.cut(walker.index));
//     }
    // #[end]

    return match[1];
}

// exports = module.exports = readIdent;


/**
 * Copyright (c) Baidu Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license.
 * See LICENSE file in the project root for license information.
 *
 * @file 读取三元表达式
 */

// var ExprType = require('./expr-type');
// var readLogicalORExpr = require('./read-logical-or-expr');

/**
 * 读取三元表达式
 *
 * @param {Walker} walker 源码读取对象
 * @return {Object}
 */
function readTertiaryExpr(walker) {
    var conditional = readLogicalORExpr(walker);
    walker.goUntil();

    if (walker.currentCode() === 63) { // ?
        walker.go(1);
        var yesExpr = readTertiaryExpr(walker);
        walker.goUntil();

        if (walker.currentCode() === 58) { // :
            walker.go(1);
            return {
                type: 10,
                segs: [
                    conditional,
                    yesExpr,
                    readTertiaryExpr(walker)
                ]
            };
        }
    }

    return conditional;
}

// exports = module.exports = readTertiaryExpr;


/**
 * Copyright (c) Baidu Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license.
 * See LICENSE file in the project root for license information.
 *
 * @file 读取访问表达式
 */

// var ExprType = require('./expr-type');
// var createAccessor = require('./create-accessor');
// var readIdent = require('./read-ident');
// var readTertiaryExpr = require('./read-tertiary-expr');

/**
 * 读取访问表达式
 *
 * @param {Walker} walker 源码读取对象
 * @return {Object}
 */
function readAccessor(walker) {
    var firstSeg = readIdent(walker);
    switch (firstSeg) {
        case 'true':
        case 'false':
            return {
                type: 3,
                value: firstSeg === 'true'
            };
    }

    var result = createAccessor([
        {
            type: 1,
            value: firstSeg
        }
    ]);

    /* eslint-disable no-constant-condition */
    accessorLoop: while (1) {
    /* eslint-enable no-constant-condition */

        switch (walker.currentCode()) {
            case 46: // .
                walker.go(1);

                // ident as string
                result.paths.push({
                    type: 1,
                    value: readIdent(walker)
                });
                break;

            case 91: // [
                walker.go(1);
                result.paths.push(readTertiaryExpr(walker));
                walker.goUntil(93); // ]
                break;

            default:
                break accessorLoop;
        }
    }

    return result;
}

// exports = module.exports = readAccessor;


/**
 * Copyright (c) Baidu Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license.
 * See LICENSE file in the project root for license information.
 *
 * @file 读取调用
 */

// var ExprType = require('./expr-type');
// var readAccessor = require('./read-accessor');
// var readTertiaryExpr = require('./read-tertiary-expr');

/**
 * 读取调用
 *
 * @param {Walker} walker 源码读取对象
 * @param {Array=} defaultArgs 默认参数
 * @return {Object}
 */
function readCall(walker, defaultArgs) {
    walker.goUntil();
    var result = readAccessor(walker);

    var args;
    if (walker.goUntil(40)) { // (
        args = [];

        while (!walker.goUntil(41)) { // )
            args.push(readTertiaryExpr(walker));
            walker.goUntil(44); // ,
        }
    }
    else if (defaultArgs) {
        args = defaultArgs;
    }

    if (args) {
        result = {
            type: 6,
            name: result,
            args: args
        };
    }

    return result;
}

// exports = module.exports = readCall;


/**
 * Copyright (c) Baidu Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license.
 * See LICENSE file in the project root for license information.
 *
 * @file 读取括号表达式
 */

// var readTertiaryExpr = require('./read-tertiary-expr');

/**
 * 读取括号表达式
 *
 * @param {Walker} walker 源码读取对象
 * @return {Object}
 */
function readParenthesizedExpr(walker) {
    walker.go(1);
    var expr = readTertiaryExpr(walker);
    walker.goUntil(41); // )

    expr.parenthesized = true;
    return expr;
}

// exports = module.exports = readParenthesizedExpr;


/**
 * Copyright (c) Baidu Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license.
 * See LICENSE file in the project root for license information.
 *
 * @file 读取乘法表达式
 */

// var ExprType = require('./expr-type');
// var readUnaryExpr = require('./read-unary-expr');

/**
 * 读取乘法表达式
 *
 * @param {Walker} walker 源码读取对象
 * @return {Object}
 */
function readMultiplicativeExpr(walker) {
    var expr = readUnaryExpr(walker);

    while (1) {
        walker.goUntil();

        var code = walker.currentCode();
        switch (code) {
            case 37: // %
            case 42: // *
            case 47: // /
                walker.go(1);
                expr = {
                    type: 8,
                    operator: code,
                    segs: [expr, readUnaryExpr(walker)]
                };
                continue;
        }

        break;
    }


    return expr;
}

// exports = module.exports = readMultiplicativeExpr;


/**
 * Copyright (c) Baidu Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license.
 * See LICENSE file in the project root for license information.
 *
 * @file 读取加法表达式
 */

// var ExprType = require('./expr-type');
// var readMultiplicativeExpr = require('./read-multiplicative-expr');


/**
 * 读取加法表达式
 *
 * @param {Walker} walker 源码读取对象
 * @return {Object}
 */
function readAdditiveExpr(walker) {
    var expr = readMultiplicativeExpr(walker);

    while (1) {
        walker.goUntil();
        var code = walker.currentCode();

        switch (code) {
            case 43: // +
            case 45: // -
                walker.go(1);
                expr = {
                    type: 8,
                    operator: code,
                    segs: [expr, readMultiplicativeExpr(walker)]
                };
                continue;
        }

        break;
    }

    return expr;
}

// exports = module.exports = readAdditiveExpr;


/**
 * Copyright (c) Baidu Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license.
 * See LICENSE file in the project root for license information.
 *
 * @file 读取关系判断表达式
 */

// var ExprType = require('./expr-type');
// var readAdditiveExpr = require('./read-additive-expr');

/**
 * 读取关系判断表达式
 *
 * @param {Walker} walker 源码读取对象
 * @return {Object}
 */
function readRelationalExpr(walker) {
    var expr = readAdditiveExpr(walker);
    walker.goUntil();

    var code = walker.currentCode();
    switch (code) {
        case 60: // <
        case 62: // >
            if (walker.nextCode() === 61) {
                code += 61;
                walker.go(1);
            }

            return {
                type: 8,
                operator: code,
                segs: [expr, readAdditiveExpr(walker)]
            };
    }

    return expr;
}

// exports = module.exports = readRelationalExpr;


/**
 * Copyright (c) Baidu Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license.
 * See LICENSE file in the project root for license information.
 *
 * @file 读取相等比对表达式
 */

// var ExprType = require('./expr-type');
// var readRelationalExpr = require('./read-relational-expr');

/**
 * 读取相等比对表达式
 *
 * @param {Walker} walker 源码读取对象
 * @return {Object}
 */
function readEqualityExpr(walker) {
    var expr = readRelationalExpr(walker);
    walker.goUntil();

    var code = walker.currentCode();
    switch (code) {
        case 61: // =
        case 33: // !
            if (walker.nextCode() === 61) {
                code += 61;
                if (walker.nextCode() === 61) {
                    code += 61;
                    walker.go(1);
                }

                return {
                    type: 8,
                    operator: code,
                    segs: [expr, readRelationalExpr(walker)]
                };
            }

            walker.go(-1);
    }

    return expr;
}

// exports = module.exports = readEqualityExpr;


/**
 * Copyright (c) Baidu Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license.
 * See LICENSE file in the project root for license information.
 *
 * @file 读取逻辑与表达式
 */

// var ExprType = require('./expr-type');
// var readEqualityExpr = require('./read-equality-expr');

/**
 * 读取逻辑与表达式
 *
 * @param {Walker} walker 源码读取对象
 * @return {Object}
 */
function readLogicalANDExpr(walker) {
    var expr = readEqualityExpr(walker);
    walker.goUntil();

    if (walker.currentCode() === 38) { // &
        if (walker.nextCode() === 38) {
            walker.go(1);
            return {
                type: 8,
                operator: 76,
                segs: [expr, readLogicalANDExpr(walker)]
            };
        }

        walker.go(-1);
    }

    return expr;
}

// exports = module.exports = readLogicalANDExpr;


/**
 * Copyright (c) Baidu Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license.
 * See LICENSE file in the project root for license information.
 *
 * @file 读取逻辑或表达式
 */

// var ExprType = require('./expr-type');
// var readLogicalANDExpr = require('./read-logical-and-expr');

/**
 * 读取逻辑或表达式
 *
 * @param {Walker} walker 源码读取对象
 * @return {Object}
 */
function readLogicalORExpr(walker) {
    var expr = readLogicalANDExpr(walker);
    walker.goUntil();

    if (walker.currentCode() === 124) { // |
        if (walker.nextCode() === 124) {
            walker.go(1);
            return {
                type: 8,
                operator: 248,
                segs: [expr, readLogicalORExpr(walker)]
            };
        }

        walker.go(-1);
    }

    return expr;
}

// exports = module.exports = readLogicalORExpr;


/**
 * Copyright (c) Baidu Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license.
 * See LICENSE file in the project root for license information.
 *
 * @file 解析表达式
 */

// var Walker = require('./walker');
// var readTertiaryExpr = require('./read-tertiary-expr');

/**
 * 解析表达式
 *
 * @param {string} source 源码
 * @return {Object}
 */
function parseExpr(source) {
    if (!source) {
        return;
    }

    if (typeof source === 'object' && source.type) {
        return source;
    }

    var expr = readTertiaryExpr(new Walker(source));
    expr.raw = source;
    return expr;
}

// exports = module.exports = parseExpr;


/**
 * Copyright (c) Baidu Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license.
 * See LICENSE file in the project root for license information.
 *
 * @file 解析调用
 */


// var Walker = require('./walker');
// var ExprType = require('./expr-type');
// var readCall = require('./read-call');

/**
 * 解析调用
 *
 * @param {string} source 源码
 * @param {Array=} defaultArgs 默认参数
 * @return {Object}
 */
function parseCall(source, defaultArgs) {
    var expr = readCall(new Walker(source), defaultArgs);

    if (expr.type !== 6) {
        expr = {
            type: 6,
            name: expr,
            args: defaultArgs || []
        };
    }

    expr.raw = source;
    return expr;
}

// exports = module.exports = parseCall;


/**
 * Copyright (c) Baidu Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license.
 * See LICENSE file in the project root for license information.
 *
 * @file 解析插值替换
 */

// var Walker = require('./walker');
// var readTertiaryExpr = require('./read-tertiary-expr');
// var ExprType = require('./expr-type');
// var readCall = require('./read-call');

/**
 * 解析插值替换
 *
 * @param {string} source 源码
 * @return {Object}
 */
function parseInterp(source) {
    var walker = new Walker(source);

    var interp = {
        type: 5,
        expr: readTertiaryExpr(walker),
        filters: [],
        raw: source
    };

    while (walker.goUntil(124)) { // |
        var callExpr = readCall(walker, []);
        switch (callExpr.name.paths[0].value) {
            case 'html':
                break;
            case 'raw':
                interp.original = 1;
                break;
            default:
                interp.filters.push(callExpr);
        }
    }

    return interp;
}

// exports = module.exports = parseInterp;


/**
 * Copyright (c) Baidu Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license.
 * See LICENSE file in the project root for license information.
 *
 * @file 解码 HTML 字符实体
 */

var ENTITY_DECODE_MAP = {
    lt: '<',
    gt: '>',
    nbsp: ' ',
    quot: '\"',
    emsp: '\u2003',
    ensp: '\u2002',
    thinsp: '\u2009',
    copy: '\xa9',
    reg: '\xae',
    zwnj: '\u200c',
    zwj: '\u200d',
    amp: '&'
};

/**
 * 解码 HTML 字符实体
 *
 * @param {string} source 要解码的字符串
 * @return {string}
 */
function decodeHTMLEntity(source) {
    return source
        .replace(/&#([0-9]+);/g, function (match, code) {
            return String.fromCharCode(+code);
        })
        .replace(/&#x([0-9a-f]+);/ig, function (match, code) {
            return String.fromCharCode(parseInt(code, 16));
        })
        .replace(/&([a-z]+);/ig, function (match, code) {
            return ENTITY_DECODE_MAP[code] || match;
        });
}

// exports = module.exports = decodeHTMLEntity;


/**
 * Copyright (c) Baidu Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license.
 * See LICENSE file in the project root for license information.
 *
 * @file 解析文本
 */

// var Walker = require('./walker');
// var ExprType = require('./expr-type');
// var parseInterp = require('./parse-interp');
// var decodeHTMLEntity = require('../util/decode-html-entity');

/**
 * 对字符串进行可用于new RegExp的字面化
 *
 * @inner
 * @param {string} source 需要字面化的字符串
 * @return {string} 字符串字面化结果
 */
function regexpLiteral(source) {
    return source.replace(/[\^\[\]\$\(\)\{\}\?\*\.\+\\]/g, function (c) {
        return '\\' + c;
    });
}

var delimRegCache = {};

/**
 * 解析文本
 *
 * @param {string} source 源码
 * @param {Array?} delimiters 分隔符。默认为 ['{{', '}}']
 * @return {Object}
 */
function parseText(source, delimiters) {
    delimiters = delimiters || ['{{', '}}'];

    var regCacheKey = delimiters[0] + '>..<' + delimiters[1];
    var exprStartReg = delimRegCache[regCacheKey];
    if (!exprStartReg) {
        exprStartReg = new RegExp(
            regexpLiteral(delimiters[0])
                + '\\s*([\\s\\S]+?)\\s*'
                + regexpLiteral(delimiters[1]),
            'g'
        );
        delimRegCache[regCacheKey] = exprStartReg;
    }

    var exprMatch;

    var walker = new Walker(source);
    var beforeIndex = 0;

    var expr = {
        type: 7,
        segs: []
    };

    function pushStringToSeg(text) {
        text && expr.segs.push({
            type: 1,
            literal: text,
            value: decodeHTMLEntity(text)
        });
    }

    var delimEndLen = delimiters[1].length;
    while ((exprMatch = walker.match(exprStartReg)) != null) {
        var interpSource = exprMatch[1];
        var interpLen = exprMatch[0].length;
        if (walker.cut(walker.index + 1 - delimEndLen, walker.index + 1) === delimiters[1]) {
            interpSource += walker.cut(walker.index, walker.index + 1);
            walker.go(1);
            interpLen++;
        }

        pushStringToSeg(walker.cut(
            beforeIndex,
            walker.index - interpLen
        ));

        var interp = parseInterp(interpSource);
        expr.original = expr.original || interp.original;
        expr.segs.push(interp);

        beforeIndex = walker.index;
    }

    pushStringToSeg(walker.cut(beforeIndex));



    if (expr.segs.length === 1 && expr.segs[0].type === 1) {
        expr.value = expr.segs[0].value;
    }

    return expr;
}

// exports = module.exports = parseText;


/**
 * Copyright (c) Baidu Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license.
 * See LICENSE file in the project root for license information.
 *
 * @file 解析指令
 */


// var Walker = require('./walker');
// var parseExpr = require('./parse-expr');
// var parseCall = require('./parse-call');
// var parseText = require('./parse-text');
// var readAccessor = require('./read-accessor');
// var readUnaryExpr = require('./read-unary-expr');

/**
 * 指令解析器
 *
 * @inner
 * @type {Object}
 */
var directiveParsers = {
    'for': function (value) {
        var walker = new Walker(value);
        var match = walker.match(/^\s*([$0-9a-z_]+)(\s*,\s*([$0-9a-z_]+))?\s+in\s+/ig, 1);

        if (match) {
            var directive = {
                item: match[1],
                value: readUnaryExpr(walker)
            };

            if (match[3]) {
                directive.index = match[3];
            }

            if (walker.match(/\s*trackby\s+/ig, 1)) {
                var start = walker.index;
                directive.trackBy = readAccessor(walker);
                directive.trackBy.raw = walker.cut(start, walker.index);
            }
            return directive;
        }

        // #[begin] error
//         throw new Error('[SAN FATAL] for syntax error: ' + value);
        // #[end]
    },

    'ref': function (value, options) {
        return {
            value: parseText(value, options.delimiters)
        };
    },

    'if': function (value) {
        return {
            value: parseExpr(value.replace(/(^\{\{|\}\}$)/g, ''))
        };
    },

    'elif': function (value) {
        return {
            value: parseExpr(value.replace(/(^\{\{|\}\}$)/g, ''))
        };
    },

    'else': function () {
        return {
            value: {}
        };
    },

    'bind': function (value) {
        return {
            value: parseExpr(value.replace(/(^\{\{|\}\}$)/g, ''))
        };
    },

    'html': function (value) {
        return {
            value: parseExpr(value.replace(/(^\{\{|\}\}$)/g, ''))
        };
    },

    'transition': function (value) {
        return {
            value: parseCall(value)
        };
    }
};

/**
 * 解析指令
 *
 * @param {ANode} aNode 抽象节点
 * @param {string} name 指令名称
 * @param {string} value 指令值
 * @param {Object} options 解析参数
 * @param {Array?} options.delimiters 插值分隔符列表
 */
function parseDirective(aNode, name, value, options) {
    if (name === 'else-if') {
        name = 'elif';
    }

    var parser = directiveParsers[name];
    if (parser) {
        (aNode.directives[name] = parser(value, options)).raw = value;
    }
}

// exports = module.exports = parseDirective;


/**
 * Copyright (c) Baidu Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license.
 * See LICENSE file in the project root for license information.
 *
 * @file 对属性信息进行处理
 */

// var ExprType = require('../parser/expr-type');

/**
 * 对属性信息进行处理
 * 对组件的 binds 或者特殊的属性（比如 input 的 checked）需要处理
 *
 * 扁平化：
 * 当 text 解析只有一项时，要么就是 string，要么就是 interp
 * interp 有可能是绑定到组件属性的表达式，不希望被 eval text 成 string
 * 所以这里做个处理，只有一项时直接抽出来
 *
 * bool属性：
 * 当绑定项没有值时，默认为true
 *
 * @param {Object} prop 属性对象
 */
function postProp(prop) {
    var expr = prop.expr;

    if (expr.type === 7) {
        switch (expr.segs.length) {
            case 0:
                prop.expr = {
                    type: 3,
                    value: true
                };
                break;

            case 1:
                expr = prop.expr = expr.segs[0];
                if (expr.type === 5 && expr.filters.length === 0) {
                    prop.expr = expr.expr;
                }
        }
    }
}

// exports = module.exports = postProp;


/**
 * Copyright (c) Baidu Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license.
 * See LICENSE file in the project root for license information.
 *
 * @file 解析抽象节点属性
 */

// var each = require('../util/each');
// var kebab2camel = require('../util/kebab2camel');
// var ExprType = require('./expr-type');
// var createAccessor = require('./create-accessor');
// var parseExpr = require('./parse-expr');
// var parseCall = require('./parse-call');
// var parseText = require('./parse-text');
// var parseDirective = require('./parse-directive');
// var postProp = require('./post-prop');


/**
 * 解析抽象节点属性
 *
 * @param {ANode} aNode 抽象节点
 * @param {string} name 属性名称
 * @param {string} value 属性值
 * @param {Object} options 解析参数
 * @param {Array?} options.delimiters 插值分隔符列表
 */
function integrateAttr(aNode, name, value, options) {
    var prefixIndex = name.indexOf('-');
    var realName;
    var prefix;

    if (prefixIndex > 0) {
        prefix = name.slice(0, prefixIndex);
        realName = name.slice(prefixIndex + 1);
    }

    switch (prefix) {
        case 'on':
            var event = {
                name: realName,
                modifier: {}
            };
            aNode.events.push(event);

            var colonIndex;
            while ((colonIndex = value.indexOf(':')) > 0) {
                var modifier = value.slice(0, colonIndex);

                // eventHandler("dd:aa") 这种情况不能算modifier，需要辨识
                if (!/^[a-z]+$/i.test(modifier)) {
                    break;
                }

                event.modifier[modifier] = true;
                value = value.slice(colonIndex + 1);
            }

            event.expr = parseCall(value, [
                createAccessor([
                    {type: 1, value: '$event'}
                ])
            ]);
            break;

        case 'san':
        case 's':
            parseDirective(aNode, realName, value, options);
            break;

        case 'prop':
            integrateProp(aNode, realName, value, options);
            break;

        case 'var':
            if (!aNode.vars) {
                aNode.vars = [];
            }

            realName = kebab2camel(realName);
            aNode.vars.push({
                name: realName,
                expr: parseExpr(value.replace(/(^\{\{|\}\}$)/g, ''))
            });
            break;

        default:
            integrateProp(aNode, name, value, options);
    }
}

/**
 * 解析抽象节点绑定属性
 *
 * @inner
 * @param {ANode} aNode 抽象节点
 * @param {string} name 属性名称
 * @param {string} value 属性值
 * @param {Object} options 解析参数
 * @param {Array?} options.delimiters 插值分隔符列表
 */
function integrateProp(aNode, name, value, options) {
    // parse two way binding, e.g. value="{=ident=}"
    var xMatch = value.match(/^\{=\s*(.*?)\s*=\}$/);

    if (xMatch) {
        aNode.props.push({
            name: name,
            expr: parseExpr(xMatch[1]),
            x: 1,
            raw: value
        });

        return;
    }

    // parse normal prop
    var prop = {
        name: name,
        expr: parseText(value, options.delimiters),
        raw: value
    };

    // 这里不能把只有一个插值的属性抽取
    // 因为插值里的值可能是html片段，容易被注入
    // 组件的数据绑定在组件init时做抽取
    switch (name) {
        case 'class':
        case 'style':
            each(prop.expr.segs, function (seg) {
                if (seg.type === 5) {
                    seg.filters.push({
                        type: 6,
                        name: createAccessor([
                            {
                                type: 1,
                                value: '_' + prop.name
                            }
                        ]),
                        args: []
                    });
                }
            });
            break;

        case 'checked':
            if (aNode.tagName === 'input') {
                postProp(prop);
            }
            break;
    }

    aNode.props.push(prop);
}


// exports = module.exports = integrateAttr;


/**
 * Copyright (c) Baidu Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license.
 * See LICENSE file in the project root for license information.
 *
 * @file 解析模板
 */


// var Walker = require('./walker');
// var integrateAttr = require('./integrate-attr');
// var parseText = require('./parse-text');
// var svgTags = require('../browser/svg-tags');
// var autoCloseTags = require('../browser/auto-close-tags');

// #[begin] error
// function getXPath(stack, currentTagName) {
//     var path = ['ROOT'];
//     for (var i = 1, len = stack.length; i < len; i++) {
//         path.push(stack[i].tagName);
//     }
//     if (currentTagName) {
//         path.push(currentTagName);
//     }
//     return path.join('>');
// }
// #[end]

/* eslint-disable fecs-max-statements */

/**
 * 解析 template
 *
 * @param {string} source template源码
 * @param {Object?} options 解析参数
 * @param {string?} options.trimWhitespace 空白文本的处理策略。none|blank|all
 * @param {Array?} options.delimiters 插值分隔符列表
 * @return {ANode}
 */
function parseTemplate(source, options) {
    options = options || {};
    options.trimWhitespace = options.trimWhitespace || 'none';

    var rootNode = {
        directives: {},
        props: [],
        events: [],
        children: []
    };

    if (typeof source !== 'string') {
        return rootNode;
    }

    source = source.replace(/<!--([\s\S]*?)-->/mg, '').replace(/(^\s+|\s+$)/g, '');
    var walker = new Walker(source);

    var tagReg = /<(\/)?([a-z0-9-]+)\s*/ig;
    var attrReg = /([-:0-9a-z\[\]_]+)(\s*=\s*(['"])([^\3]*?)\3)?\s*/ig;

    var tagMatch;
    var currentNode = rootNode;
    var stack = [rootNode];
    var stackIndex = 0;
    var beforeLastIndex = 0;

    while ((tagMatch = walker.match(tagReg)) != null) {
        var tagMatchStart = walker.index - tagMatch[0].length;
        var tagEnd = tagMatch[1];
        var tagName = tagMatch[2];
        if (!svgTags[tagName]) {
            tagName = tagName.toLowerCase();
        }

        // 62: >
        // 47: /
        // 处理 </xxxx >
        if (tagEnd) {
            if (walker.currentCode() === 62) {
                // 满足关闭标签的条件时，关闭标签
                // 向上查找到对应标签，找不到时忽略关闭
                var closeIndex = stackIndex;

                // #[begin] error
//                 // 如果正在闭合一个自闭合的标签，例如 </input>，报错
//                 if (autoCloseTags[tagName]) {
//                     throw new Error(''
//                         + '[SAN ERROR] ' + getXPath(stack, tagName) + ' is a `auto closed` tag, '
//                         + 'so it cannot be closed with </' + tagName + '>'
//                     );
//                 }
// 
//                 // 如果关闭的 tag 和当前打开的不一致，报错
//                 if (
//                     stack[closeIndex].tagName !== tagName
//                     // 这里要把 table 自动添加 tbody 的情况给去掉
//                     && !(tagName === 'table' && stack[closeIndex].tagName === 'tbody')
//                 ) {
//                     throw new Error('[SAN ERROR] ' + getXPath(stack) + ' is closed with ' + tagName);
//                 }
                // #[end]


                pushTextNode(source.slice(beforeLastIndex, tagMatchStart));
                while (closeIndex > 0 && stack[closeIndex].tagName !== tagName) {
                    closeIndex--;
                }

                if (closeIndex > 0) {
                    stackIndex = closeIndex - 1;
                    currentNode = stack[stackIndex];
                }
                walker.go(1);
            }
            // #[begin] error
//             else {
//                 // 处理 </xxx 非正常闭合标签
// 
//                 // 如果闭合标签时，匹配后的下一个字符是 <，即下一个标签的开始，那么当前闭合标签未闭合
//                 if (walker.currentCode() === 60) {
//                     throw new Error(''
//                         + '[SAN ERROR] ' + getXPath(stack)
//                         + '\'s close tag not closed'
//                     );
//                 }
// 
//                 // 闭合标签有属性
//                 throw new Error(''
//                     + '[SAN ERROR] ' + getXPath(stack)
//                     + '\'s close tag has attributes'
//                 );
//             }
            // #[end]
        }
        else {
            var aElement = {
                directives: {},
                props: [],
                events: [],
                children: [],
                tagName: tagName
            };
            var tagClose = autoCloseTags[tagName];

            // 解析 attributes

            /* eslint-disable no-constant-condition */
            while (1) {
            /* eslint-enable no-constant-condition */

                var nextCharCode = walker.currentCode();

                // 标签结束时跳出 attributes 读取
                // 标签可能直接结束或闭合结束
                if (nextCharCode === 62) {
                    walker.go(1);
                    break;
                }

                // 遇到 /> 按闭合处理
                if (nextCharCode === 47
                    && walker.charCode(walker.index + 1) === 62
                ) {
                    walker.go(2);
                    tagClose = 1;
                    break;
                }

                // template 串结束了
                // 这时候，说明这个读取周期的所有内容，都是text
                if (!nextCharCode) {
                    pushTextNode(walker.cut(beforeLastIndex));
                    aElement = null;
                    break;
                }

                // #[begin] error
//                 // 在处理一个 open 标签时，如果遇到了 <， 即下一个标签的开始，则当前标签未能正常闭合，报错
//                 if (nextCharCode === 60) {
//                     throw new Error('[SAN ERROR] ' + getXPath(stack, tagName) + ' is not closed');
//                 }
                // #[end]

                // 读取 attribute
                var attrMatch = walker.match(attrReg);
                if (attrMatch) {

                    // #[begin] error
//                     // 如果属性有 =，但没取到 value，报错
//                     if (
//                         walker.charCode(attrMatch.index + attrMatch[1].length) === 61
//                         && !attrMatch[2]
//                     ) {
//                         throw new Error(''
//                             + '[SAN ERROR] ' + getXPath(stack, tagName) + ' attribute `'
//                             + attrMatch[1] + '` is not wrapped with ""'
//                         );
//                     }
                    // #[end]

                    integrateAttr(
                        aElement,
                        attrMatch[1],
                        attrMatch[2] ? attrMatch[4] : '',
                        options
                    );
                }

            }

            if (aElement) {
                pushTextNode(source.slice(beforeLastIndex, tagMatchStart));

                // match if directive for else/elif directive
                var elseDirective = aElement.directives['else'] // eslint-disable-line dot-notation
                    || aElement.directives.elif;

                if (elseDirective) {
                    var parentChildrenLen = currentNode.children.length;
                    var ifANode = null;

                    while (parentChildrenLen--) {
                        var parentChild = currentNode.children[parentChildrenLen];
                        if (parentChild.textExpr) {
                            currentNode.children.splice(parentChildrenLen, 1);
                            continue;
                        }

                        ifANode = parentChild;
                        break;
                    }

                    // #[begin] error
//                     if (!ifANode || !parentChild.directives['if']) { // eslint-disable-line dot-notation
//                         throw new Error('[SAN FATEL] else not match if.');
//                     }
                    // #[end]

                    if (ifANode) {
                        ifANode.elses = ifANode.elses || [];
                        ifANode.elses.push(aElement);
                    }
                }
                else {
                    if (aElement.tagName === 'tr' && currentNode.tagName === 'table') {
                        var tbodyNode = {
                            directives: {},
                            props: [],
                            events: [],
                            children: [],
                            tagName: 'tbody'
                        };
                        currentNode.children.push(tbodyNode);
                        currentNode = tbodyNode;
                        stack[++stackIndex] = tbodyNode;
                    }

                    currentNode.children.push(aElement);
                }

                if (!tagClose) {
                    currentNode = aElement;
                    stack[++stackIndex] = aElement;
                }
            }

        }

        beforeLastIndex = walker.index;
    }

    pushTextNode(walker.cut(beforeLastIndex));

    return rootNode;

    /**
     * 在读取栈中添加文本节点
     *
     * @inner
     * @param {string} text 文本内容
     */
    function pushTextNode(text) {
        switch (options.trimWhitespace) {
            case 'blank':
                if (/^\s+$/.test(text)) {
                    text = null;
                }
                break;

            case 'all':
                text = text.replace(/(^\s+|\s+$)/g, '');
                break;
        }

        if (text) {
            currentNode.children.push({
                textExpr: parseText(text, options.delimiters)
            });
        }
    }
}

/* eslint-enable fecs-max-statements */

// exports = module.exports = parseTemplate;


/**
 * Copyright (c) Baidu Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license.
 * See LICENSE file in the project root for license information.
 *
 * @file 默认filter
 */


/* eslint-disable fecs-camelcase */


function defaultClassFilter(source) {
    if (source instanceof Array) {
        return source.join(' ');
    }

    return source;
}

function defaultStyleFilter(source) {
    if (typeof source === 'object') {
        var result = '';
        for (var key in source) {
            /* istanbul ignore else  */
            if (source.hasOwnProperty(key)) {
                result += key + ':' + source[key] + ';';
            }
        }

        return result;
    }

    return source;
}

/**
 * 默认filter
 *
 * @const
 * @type {Object}
 */
var DEFAULT_FILTERS = {

    /**
     * URL编码filter
     *
     * @param {string} source 源串
     * @return {string} 替换结果串
     */
    url: encodeURIComponent,

    _class: defaultClassFilter,
    _style: defaultStyleFilter,

    _xclass: function (source) {
        var result = defaultClassFilter(source);
        return result ? ' ' + result : '';
    },

    _xstyle: function (source) {
        var result = defaultStyleFilter(source);
        return result ? ';' + result : '';
    }
};
/* eslint-enable fecs-camelcase */

// exports = module.exports = DEFAULT_FILTERS;


/**
 * Copyright (c) Baidu Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license.
 * See LICENSE file in the project root for license information.
 *
 * @file 表达式计算
 */

// var ExprType = require('../parser/expr-type');
// var extend = require('../util/extend');
// var DEFAULT_FILTERS = require('./default-filters');
// var evalArgs = require('./eval-args');

/**
 * 计算表达式的值
 *
 * @param {Object} expr 表达式对象
 * @param {Data} data 数据容器对象
 * @param {Component=} owner 所属组件环境
 * @return {*}
 */
function evalExpr(expr, data, owner) {
    if (expr.value != null) {
        return expr.value;
    }

    var value;

    switch (expr.type) {
        case 9:
            value = evalExpr(expr.expr, data, owner);
            switch (expr.operator) {
                case 33:
                    value = !value;
                    break;

                case 45:
                    value = 0 - value;
                    break;
            }
            return value;

        case 8:
            value = evalExpr(expr.segs[0], data, owner);
            var rightValue = evalExpr(expr.segs[1], data, owner);

            /* eslint-disable eqeqeq */
            switch (expr.operator) {
                case 37:
                    value = value % rightValue;
                    break;

                case 43:
                    value = value + rightValue;
                    break;

                case 45:
                    value = value - rightValue;
                    break;

                case 42:
                    value = value * rightValue;
                    break;

                case 47:
                    value = value / rightValue;
                    break;

                case 60:
                    value = value < rightValue;
                    break;

                case 62:
                    value = value > rightValue;
                    break;

                case 76:
                    value = value && rightValue;
                    break;

                case 94:
                    value = value != rightValue;
                    break;

                case 121:
                    value = value <= rightValue;
                    break;

                case 122:
                    value = value == rightValue;
                    break;

                case 123:
                    value = value >= rightValue;
                    break;

                case 155:
                    value = value !== rightValue;
                    break;

                case 183:
                    value = value === rightValue;
                    break;

                case 248:
                    value = value || rightValue;
                    break;

            }
            /* eslint-enable eqeqeq */
            return value;

        case 10:
            return evalExpr(
                expr.segs[evalExpr(expr.segs[0], data, owner) ? 1 : 2],
                data,
                owner
            );


        case 12:
            value = [];
            for (var i = 0, l = expr.items.length; i < l; i++) {
                var item = expr.items[i];
                var itemValue = evalExpr(item.expr, data, owner);

                if (item.spread) {
                    itemValue && (value = value.concat(itemValue));
                }
                else {
                    value.push(itemValue);
                }
            }
            return value;

        case 11:
            value = {};
            for (var i = 0, l = expr.items.length; i < l; i++) {
                var item = expr.items[i];
                var itemValue = evalExpr(item.expr, data, owner);

                if (item.spread) {
                    itemValue && extend(value, itemValue);
                }
                else {
                    value[evalExpr(item.name, data, owner)] = itemValue;
                }
            }
            return value;

        case 4:
            return data.get(expr);


        case 5:
            value = evalExpr(expr.expr, data, owner);

            if (owner) {
                for (var i = 0, l = expr.filters.length; i < l; i++) {
                    var filter = expr.filters[i];
                    var filterName = filter.name.paths[0].value;

                    if (owner.filters[filterName]) {
                        value = owner.filters[filterName].apply(
                            owner,
                            [value].concat(evalArgs(filter.args, data, owner))
                        );
                    }
                    else if (DEFAULT_FILTERS[filterName]) {
                        value = DEFAULT_FILTERS[filterName](value);
                    }
                }
            }

            if (value == null) {
                value = '';
            }

            return value;

        case 6:
            if (owner && expr.name.type === 4) {
                var method = owner;
                var pathsLen = expr.name.paths.length;

                for (var i = 0; method && i < pathsLen; i++) {
                    method = method[evalExpr(expr.name.paths[i], data, owner)];
                }

                if (method) {
                    value = method.apply(owner, evalArgs(expr.args, data, owner));
                }
            }

            break;

        /* eslint-disable no-redeclare */
        case 7:
            var buf = '';
            for (var i = 0, l = expr.segs.length; i < l; i++) {
                var seg = expr.segs[i];
                buf += seg.value || evalExpr(seg, data, owner);
            }
            return buf;
    }

    return value;
}

// exports = module.exports = evalExpr;


/**
 * Copyright (c) Baidu Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license.
 * See LICENSE file in the project root for license information.
 *
 * @file 为函数调用计算参数数组的值
 */


// var evalExpr = require('./eval-expr');

/**
 * 为函数调用计算参数数组的值
 *
 * @param {Array} args 参数表达式列表
 * @param {Data} data 数据环境
 * @param {Component} owner 组件环境
 * @return {Array}
 */
function evalArgs(args, data, owner) {
    var result = [];
    for (var i = 0; i < args.length; i++) {
        result.push(evalExpr(args[i], data, owner));
    }

    return result;
}

// exports = module.exports = evalArgs;


/**
 * Copyright (c) Baidu Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license.
 * See LICENSE file in the project root for license information.
 *
 * @file 比较变更表达式与目标表达式之间的关系
 */

// var ExprType = require('../parser/expr-type');
// var evalExpr = require('./eval-expr');

/**
 * 判断变更表达式与多个表达式之间的关系，0为完全没关系，1为有关系
 *
 * @inner
 * @param {Object} changeExpr 目标表达式
 * @param {Array} exprs 多个源表达式
 * @param {Data} data 表达式所属数据环境
 * @return {number}
 */
function changeExprCompareExprs(changeExpr, exprs, data) {
    for (var i = 0, l = exprs.length; i < l; i++) {
        if (changeExprCompare(changeExpr, exprs[i], data)) {
            return 1;
        }
    }

    return 0;
}

/**
 * 比较变更表达式与目标表达式之间的关系，用于视图更新判断
 * 视图更新需要根据其关系，做出相应的更新行为
 *
 * 0: 完全没关系
 * 1: 变更表达式是目标表达式的母项(如a与a.b) 或 表示需要完全变化
 * 2: 变更表达式是目标表达式相等
 * >2: 变更表达式是目标表达式的子项，如a.b.c与a.b
 *
 * @param {Object} changeExpr 变更表达式
 * @param {Object} expr 要比较的目标表达式
 * @param {Data} data 表达式所属数据环境
 * @return {number}
 */
function changeExprCompare(changeExpr, expr, data) {
    var result = 0;
    if (!expr.changeCache) {
        expr.changeCache = {};
    }

    if (changeExpr.raw && !expr.dynamic) {
        if (expr.changeCache[changeExpr.raw] != null) {
            return expr.changeCache[changeExpr.raw];
        }
    }

    switch (expr.type) {
        case 4:
            var paths = expr.paths;
            var pathsLen = paths.length;
            var changePaths = changeExpr.paths;
            var changeLen = changePaths.length;

            result = 1;
            for (var i = 0; i < pathsLen; i++) {
                var pathExpr = paths[i];
                var pathExprValue = pathExpr.value;

                if (pathExprValue == null && changeExprCompare(changeExpr, pathExpr, data)) {
                    result = 1;
                    break;
                }

                if (result && i < changeLen
                    /* eslint-disable eqeqeq */
                    && (pathExprValue || evalExpr(pathExpr, data)) != changePaths[i].value
                    /* eslint-enable eqeqeq */
                ) {
                    result = 0;
                }
            }

            if (result) {
                result = Math.max(1, changeLen - pathsLen + 2);
            }
            break;

        case 9:
            result = changeExprCompare(changeExpr, expr.expr, data) ? 1 : 0;
            break;

        case 7:
        case 8:
        case 10:
            result = changeExprCompareExprs(changeExpr, expr.segs, data);
            break;

        case 12:
        case 11:
            for (var i = 0; i < expr.items.length; i++) {
                if (changeExprCompare(changeExpr, expr.items[i].expr, data)) {
                    result = 1;
                    break;
                }
            }

            break;

        case 5:
            if (changeExprCompare(changeExpr, expr.expr, data)) {
                result = 1;
            }
            else {
                for (var i = 0; i < expr.filters.length; i++) {
                    if (changeExprCompareExprs(changeExpr, expr.filters[i].args, data)) {
                        result = 1;
                        break;
                    }
                }
            }

            break;

        case 6:
            if (changeExprCompareExprs(changeExpr, expr.name.paths, data)
                || changeExprCompareExprs(changeExpr, expr.args, data)
            ) {
                result = 1;
            }
            break;
    }

    if (changeExpr.raw && !expr.dynamic) {
        expr.changeCache[changeExpr.raw] = result;
    }

    return result;
}

// exports = module.exports = changeExprCompare;


/**
 * Copyright (c) Baidu Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license.
 * See LICENSE file in the project root for license information.
 *
 * @file 数据变更类型枚举
 */

/**
 * 数据变更类型枚举
 *
 * @const
 * @type {Object}
 */
var DataChangeType = {
    SET: 1,
    SPLICE: 2
};

// exports = module.exports = DataChangeType;


/**
 * Copyright (c) Baidu Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license.
 * See LICENSE file in the project root for license information.
 *
 * @file 生命周期类
 */

function lifeCycleOwnIs(name) {
    return this[name];
}

/* eslint-disable fecs-valid-var-jsdoc */
/**
 * 节点生命周期信息
 *
 * @inner
 * @type {Object}
 */
var LifeCycle = {
    start: {},

    compiled: {
        is: lifeCycleOwnIs,
        compiled: true
    },

    inited: {
        is: lifeCycleOwnIs,
        compiled: true,
        inited: true
    },

    created: {
        is: lifeCycleOwnIs,
        compiled: true,
        inited: true,
        created: true
    },

    attached: {
        is: lifeCycleOwnIs,
        compiled: true,
        inited: true,
        created: true,
        attached: true
    },

    leaving: {
        is: lifeCycleOwnIs,
        compiled: true,
        inited: true,
        created: true,
        attached: true,
        leaving: true
    },

    detached: {
        is: lifeCycleOwnIs,
        compiled: true,
        inited: true,
        created: true,
        detached: true
    },

    disposed: {
        is: lifeCycleOwnIs,
        disposed: true
    }
};
/* eslint-enable fecs-valid-var-jsdoc */


// exports = module.exports = LifeCycle;


/**
 * Copyright (c) Baidu Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license.
 * See LICENSE file in the project root for license information.
 *
 * @file 节点类型
 */

/**
 * 节点类型
 *
 * @const
 * @type {Object}
 */
var NodeType = {
    TEXT: 1,
    IF: 2,
    FOR: 3,
    ELEM: 4,
    CMPT: 5,
    SLOT: 6,
    TPL: 7,
    LOADER: 8
};

// exports = module.exports = NodeType;


/**
 * Copyright (c) Baidu Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license.
 * See LICENSE file in the project root for license information.
 *
 * @file 获取 ANode props 数组中相应 name 的项
 */

/**
 * 获取 ANode props 数组中相应 name 的项
 *
 * @param {Object} aNode ANode对象
 * @param {string} name name属性匹配串
 * @return {Object}
 */
function getANodeProp(aNode, name) {
    var index = aNode.hotspot.props[name];
    if (index != null) {
        return aNode.props[index];
    }
}

// exports = module.exports = getANodeProp;


/**
 * Copyright (c) Baidu Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license.
 * See LICENSE file in the project root for license information.
 *
 * @file 获取属性处理对象
 */

// var contains = require('../util/contains');
// var empty = require('../util/empty');
// var svgTags = require('../browser/svg-tags');
// var ie = require('../browser/ie');
// var evalExpr = require('../runtime/eval-expr');
// var getANodeProp = require('./get-a-node-prop');
// var NodeType = require('./node-type');


/**
 * HTML 属性和 DOM 操作属性的对照表
 *
 * @inner
 * @const
 * @type {Object}
 */
var HTML_ATTR_PROP_MAP = {
    'readonly': 'readOnly',
    'cellpadding': 'cellPadding',
    'cellspacing': 'cellSpacing',
    'colspan': 'colSpan',
    'rowspan': 'rowSpan',
    'valign': 'vAlign',
    'usemap': 'useMap',
    'frameborder': 'frameBorder',
    'for': 'htmlFor'
};

/**
 * 默认的元素的属性设置的变换方法
 *
 * @inner
 * @type {Object}
 */


function defaultElementPropHandler(el, value, name) {
    var propName = HTML_ATTR_PROP_MAP[name] || name;
    value = value == null ? '' : value;
    // input 的 type 是个特殊属性，其实也应该用 setAttribute
    // 但是 type 不应该运行时动态改变，否则会有兼容性问题
    // 所以这里直接就不管了
    if (propName in el) {
        el[propName] = value;
    }
    else {
        el.setAttribute(name, value);
    }

    // attribute 绑定的是 text，所以不会出现 null 的情况，这里无需处理
    // 换句话来说，san 是做不到 attribute 时有时无的
    // if (value == null) {
    //     el.removeAttribute(name);
    // }
}

function svgPropHandler(el, value, name) {
    el.setAttribute(name, value);
}

function boolPropHandler(el, value, name, element, prop) {
    var propName = HTML_ATTR_PROP_MAP[name] || name;
    el[propName] = !!(prop && prop.raw === ''
        || value && value !== 'false' && value !== '0');
}

/* eslint-disable fecs-properties-quote */
/**
 * 默认的属性设置变换方法
 *
 * @inner
 * @type {Object}
 */
var defaultElementPropHandlers = {
    style: function (el, value) {
        el.style.cssText = value;
    },

    'class': function (el, value) { // eslint-disable-line
        if (
            // #[begin] allua
            ie
            ||
            // #[end]
            el.className !== value
        ) {
            el.className = value;
        }
    },

    slot: empty,

    draggable: boolPropHandler
};
/* eslint-enable fecs-properties-quote */

var analInputChecker = {
    checkbox: contains,
    radio: function (a, b) {
        return a === b;
    }
};

function analInputCheckedState(element, value) {
    var bindValue = getANodeProp(element.aNode, 'value');
    var bindType = getANodeProp(element.aNode, 'type');

    if (bindValue && bindType) {
        var type = evalExpr(bindType.expr, element.scope, element.owner);

        if (analInputChecker[type]) {
            var bindChecked = getANodeProp(element.aNode, 'checked');
            if (bindChecked != null && !bindChecked.hintExpr) {
                bindChecked.hintExpr = bindValue.expr;
            }

            return !!analInputChecker[type](
                value,
                evalExpr(bindValue.expr, element.scope, element.owner)
            );
        }
    }
}

var elementPropHandlers = {
    input: {
        multiple: boolPropHandler,
        checked: function (el, value, name, element) {
            var state = analInputCheckedState(element, value);

            boolPropHandler(
                el,
                state != null ? state : value,
                'checked',
                element
            );

            // #[begin] allua
            // 代码不用抽出来防重复，allua内的代码在现代浏览器版本会被编译时干掉，gzip也会处理重复问题
            // see: #378
            /* istanbul ignore if */
            if (ie && ie < 8 && !element.lifeCycle.attached) {
                boolPropHandler(
                    el,
                    state != null ? state : value,
                    'defaultChecked',
                    element
                );
            }
            // #[end]
        },
        readonly: boolPropHandler,
        disabled: boolPropHandler,
        autofocus: boolPropHandler,
        required: boolPropHandler
    },

    option: {
        value: function (el, value, name, element) {
            defaultElementPropHandler(el, value, name, element);

            if (isOptionSelected(element, value)) {
                el.selected = true;
            }
        }
    },

    select: {
        value: function (el, value) {
            el.value = value || '';
        },
        readonly: boolPropHandler,
        disabled: boolPropHandler,
        autofocus: boolPropHandler,
        required: boolPropHandler
    },

    textarea: {
        readonly: boolPropHandler,
        disabled: boolPropHandler,
        autofocus: boolPropHandler,
        required: boolPropHandler
    },

    button: {
        disabled: boolPropHandler,
        autofocus: boolPropHandler,
        type: function (el, value) {
            el.setAttribute('type', value || '');
        }
    }
};

function isOptionSelected(element, value) {
    var parentSelect = element.parent;
    while (parentSelect) {
        if (parentSelect.tagName === 'select') {
            break;
        }

        parentSelect = parentSelect.parent;
    }


    if (parentSelect) {
        var selectValue = null;
        var prop;
        var expr;

        if ((prop = getANodeProp(parentSelect.aNode, 'value'))
            && (expr = prop.expr)
        ) {
            selectValue = parentSelect.nodeType === 5
                ? evalExpr(expr, parentSelect.data, parentSelect)
                : evalExpr(expr, parentSelect.scope, parentSelect.owner)
                || '';
        }

        if (selectValue === value) {
            return 1;
        }
    }
}


/**
 * 获取属性处理对象
 *
 * @param {string} tagName 元素tag
 * @param {string} attrName 属性名
 * @return {Object}
 */
function getPropHandler(tagName, attrName) {
    if (svgTags[tagName]) {
        return svgPropHandler;
    }

    var tagPropHandlers = elementPropHandlers[tagName];
    if (!tagPropHandlers) {
        tagPropHandlers = elementPropHandlers[tagName] = {};
    }

    var propHandler = tagPropHandlers[attrName];
    if (!propHandler) {
        propHandler = defaultElementPropHandlers[attrName] || defaultElementPropHandler;
        tagPropHandlers[attrName] = propHandler;
    }

    return propHandler;
}

// exports = module.exports = getPropHandler;


/**
 * Copyright (c) Baidu Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license.
 * See LICENSE file in the project root for license information.
 *
 * @file 判断变更是否来源于元素
 */

/**
 * 判断变更是否来源于元素，来源于元素时，视图更新需要阻断
 *
 * @param {Object} change 变更对象
 * @param {Element} element 元素
 * @param {string?} propName 属性名，可选。需要精确判断是否来源于此属性时传入
 * @return {boolean}
 */
function isDataChangeByElement(change, element, propName) {
    var changeTarget = change.option.target;
    return changeTarget && changeTarget.node === element
        && (!propName || changeTarget.prop === propName);
}

// exports = module.exports = isDataChangeByElement;


/**
 * Copyright (c) Baidu Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license.
 * See LICENSE file in the project root for license information.
 *
 * @file 在对象上使用accessor表达式查找方法
 */

// var evalExpr = require('../runtime/eval-expr');

/**
 * 在对象上使用accessor表达式查找方法
 *
 * @param {Object} source 源对象
 * @param {Object} nameExpr 表达式
 * @param {Data} data 所属数据环境
 * @return {Function}
 */
function findMethod(source, nameExpr, data) {
    var method = source;

    for (var i = 0; method != null && i < nameExpr.paths.length; i++) {
        method = method[evalExpr(nameExpr.paths[i], data)];
    }

    return method;
}

// exports = module.exports = findMethod;


/**
 * Copyright (c) Baidu Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license.
 * See LICENSE file in the project root for license information.
 *
 * @file 数据类
 */

// var ExprType = require('../parser/expr-type');
// var evalExpr = require('./eval-expr');
// var DataChangeType = require('./data-change-type');
// var createAccessor = require('../parser/create-accessor');
// var parseExpr = require('../parser/parse-expr');

/**
 * 数据类
 *
 * @class
 * @param {Object?} data 初始数据
 * @param {Model?} parent 父级数据容器
 */
function Data(data, parent) {
    this.parent = parent;
    this.raw = data || {};
    this.listeners = [];
}

// #[begin] error
// // 以下两个函数只在开发模式下可用，在生产模式下不存在
// /**
//  * DataTypes 检测
//  */
// Data.prototype.checkDataTypes = function () {
//     if (this.typeChecker) {
//         this.typeChecker(this.raw);
//     }
// };
// 
// /**
//  * 设置 type checker
//  *
//  * @param  {Function} typeChecker 类型校验器
//  */
// Data.prototype.setTypeChecker = function (typeChecker) {
//     this.typeChecker = typeChecker;
// };
// 
// #[end]

/**
 * 添加数据变更的事件监听器
 *
 * @param {Function} listener 监听函数
 */
Data.prototype.listen = function (listener) {
    if (typeof listener === 'function') {
        this.listeners.push(listener);
    }
};

/**
 * 移除数据变更的事件监听器
 *
 * @param {Function} listener 监听函数
 */
Data.prototype.unlisten = function (listener) {
    var len = this.listeners.length;
    while (len--) {
        if (!listener || this.listeners[len] === listener) {
            this.listeners.splice(len, 1);
        }
    }
};

/**
 * 触发数据变更
 *
 * @param {Object} change 变更信息对象
 */
Data.prototype.fire = function (change) {
    if (change.option.silent || change.option.silence || change.option.quiet) {
        return;
    }

    for (var i = 0; i < this.listeners.length; i++) {
        this.listeners[i].call(this, change);
    }
};

/**
 * 获取数据项
 *
 * @param {string|Object?} expr 数据项路径
 * @param {Data?} callee 当前数据获取的调用环境
 * @return {*}
 */
Data.prototype.get = function (expr, callee) {
    var value = this.raw;
    if (!expr) {
        return value;
    }

    if (typeof expr !== 'object') {
        expr = parseExpr(expr);
    }

    var paths = expr.paths;
    callee = callee || this;

    value = value[paths[0].value];

    if (value == null && this.parent) {
        value = this.parent.get(expr, callee);
    }
    else {
        for (var i = 1, l = paths.length; value != null && i < l; i++) {
            value = value[paths[i].value || evalExpr(paths[i], callee)];
        }
    }

    return value;
};


/**
 * 数据对象变更操作
 *
 * @inner
 * @param {Object|Array} source 要变更的源数据
 * @param {Array} exprPaths 属性路径
 * @param {number} pathsStart 当前处理的属性路径指针位置
 * @param {number} pathsLen 属性路径长度
 * @param {*} value 变更属性值
 * @param {Data} data 对应的Data对象
 * @return {*} 变更后的新数据
 */
function immutableSet(source, exprPaths, pathsStart, pathsLen, value, data) {
    if (pathsStart >= pathsLen) {
        return value;
    }

    if (source == null) {
        source = {};
    }

    var pathExpr = exprPaths[pathsStart];
    var prop = evalExpr(pathExpr, data);
    var result = source;

    if (source instanceof Array) {
        var index = +prop;
        prop = isNaN(index) ? prop : index;

        result = source.slice(0);
        result[prop] = immutableSet(source[prop], exprPaths, pathsStart + 1, pathsLen, value, data);
    }
    else if (typeof source === 'object') {
        result = {};

        for (var key in source) {
            /* istanbul ignore else  */
            if (key !== prop && source.hasOwnProperty(key)) {
                result[key] = source[key];
            }
        }

        result[prop] = immutableSet(source[prop], exprPaths, pathsStart + 1, pathsLen, value, data);
    }

    if (pathExpr.value == null) {
        exprPaths[pathsStart] = {
            type: typeof prop === 'string' ? 1 : 2,
            value: prop
        };
    }

    return result;
}

/**
 * 设置数据项
 *
 * @param {string|Object} expr 数据项路径
 * @param {*} value 数据值
 * @param {Object=} option 设置参数
 * @param {boolean} option.silent 静默设置，不触发变更事件
 */
Data.prototype.set = function (expr, value, option) {
    option = option || {};

    // #[begin] error
//     var exprRaw = expr;
    // #[end]

    expr = parseExpr(expr);

    // #[begin] error
//     if (expr.type !== 4) {
//         throw new Error('[SAN ERROR] Invalid Expression in Data set: ' + exprRaw);
//     }
    // #[end]

    if (this.get(expr) === value && !option.force) {
        return;
    }

    var prop = expr.paths[0].value;
    this.raw[prop] = immutableSet(this.raw[prop], expr.paths, 1, expr.paths.length, value, this);

    this.fire({
        type: 1,
        expr: expr,
        value: value,
        option: option
    });

    // #[begin] error
//     this.checkDataTypes();
    // #[end]

};

/**
 * 合并更新数据项
 *
 * @param {string|Object} expr 数据项路径
 * @param {Object} source 待合并的数据值
 * @param {Object=} option 设置参数
 * @param {boolean} option.silent 静默设置，不触发变更事件
 */
Data.prototype.merge = function (expr, source, option) {
    option = option || {};

    // #[begin] error
//     var exprRaw = expr;
    // #[end]

    expr = parseExpr(expr);

    // #[begin] error
//     if (expr.type !== 4) {
//         throw new Error('[SAN ERROR] Invalid Expression in Data merge: ' + exprRaw);
//     }
// 
//     if (typeof this.get(expr) !== 'object') {
//         throw new Error('[SAN ERROR] Merge Expects a Target of Type \'object\'; got ' + typeof oldValue);
//     }
// 
//     if (typeof source !== 'object') {
//         throw new Error('[SAN ERROR] Merge Expects a Source of Type \'object\'; got ' + typeof source);
//     }
    // #[end]

    for (var key in source) { // eslint-disable-line
        this.set(
            createAccessor(
                expr.paths.concat(
                    [
                        {
                            type: 1,
                            value: key
                        }
                    ]
                )
            ),
            source[key],
            option
        );
    }
};

/**
 * 基于更新函数更新数据项
 *
 * @param {string|Object} expr 数据项路径
 * @param {Function} fn 数据处理函数
 * @param {Object=} option 设置参数
 * @param {boolean} option.silent 静默设置，不触发变更事件
 */
Data.prototype.apply = function (expr, fn, option) {
    // #[begin] error
//     var exprRaw = expr;
    // #[end]

    expr = parseExpr(expr);

    // #[begin] error
//     if (expr.type !== 4) {
//         throw new Error('[SAN ERROR] Invalid Expression in Data apply: ' + exprRaw);
//     }
    // #[end]

    var oldValue = this.get(expr);

    // #[begin] error
//     if (typeof fn !== 'function') {
//         throw new Error(
//             '[SAN ERROR] Invalid Argument\'s Type in Data apply: '
//             + 'Expected Function but got ' + typeof fn
//         );
//     }
    // #[end]

    this.set(expr, fn(oldValue), option);
};

/**
 * 数组数据项splice操作
 *
 * @param {string|Object} expr 数据项路径
 * @param {Array} args splice 接受的参数列表，数组项与Array.prototype.splice的参数一致
 * @param {Object=} option 设置参数
 * @param {boolean} option.silent 静默设置，不触发变更事件
 * @return {Array} 新数组
 */
Data.prototype.splice = function (expr, args, option) {
    option = option || {};
    // #[begin] error
//     var exprRaw = expr;
    // #[end]

    expr = parseExpr(expr);

    // #[begin] error
//     if (expr.type !== 4) {
//         throw new Error('[SAN ERROR] Invalid Expression in Data splice: ' + exprRaw);
//     }
    // #[end]

    var target = this.get(expr);
    var returnValue = [];

    if (target instanceof Array) {
        var index = args[0];
        var len = target.length;
        if (index > len) {
            index = len;
        }
        else if (index < 0) {
            index = len + index;
            if (index < 0) {
                index = 0;
            }
        }

        var newArray = target.slice(0);
        returnValue = newArray.splice.apply(newArray, args);

        this.raw = immutableSet(this.raw, expr.paths, 0, expr.paths.length, newArray, this);

        this.fire({
            expr: expr,
            type: 2,
            index: index,
            deleteCount: returnValue.length,
            value: returnValue,
            insertions: args.slice(2),
            option: option
        });
    }

    // #[begin] error
//     this.checkDataTypes();
    // #[end]

    return returnValue;
};

/**
 * 数组数据项push操作
 *
 * @param {string|Object} expr 数据项路径
 * @param {*} item 要push的值
 * @param {Object=} option 设置参数
 * @param {boolean} option.silent 静默设置，不触发变更事件
 * @return {number} 新数组的length属性
 */
Data.prototype.push = function (expr, item, option) {
    var target = this.get(expr);

    if (target instanceof Array) {
        this.splice(expr, [target.length, 0, item], option);
        return target.length + 1;
    }
};

/**
 * 数组数据项pop操作
 *
 * @param {string|Object} expr 数据项路径
 * @param {Object=} option 设置参数
 * @param {boolean} option.silent 静默设置，不触发变更事件
 * @return {*}
 */
Data.prototype.pop = function (expr, option) {
    var target = this.get(expr);

    if (target instanceof Array) {
        var len = target.length;
        if (len) {
            return this.splice(expr, [len - 1, 1], option)[0];
        }
    }
};

/**
 * 数组数据项shift操作
 *
 * @param {string|Object} expr 数据项路径
 * @param {Object=} option 设置参数
 * @param {boolean} option.silent 静默设置，不触发变更事件
 * @return {*}
 */
Data.prototype.shift = function (expr, option) {
    return this.splice(expr, [0, 1], option)[0];
};

/**
 * 数组数据项unshift操作
 *
 * @param {string|Object} expr 数据项路径
 * @param {*} item 要unshift的值
 * @param {Object=} option 设置参数
 * @param {boolean} option.silent 静默设置，不触发变更事件
 * @return {number} 新数组的length属性
 */
Data.prototype.unshift = function (expr, item, option) {
    var target = this.get(expr);

    if (target instanceof Array) {
        this.splice(expr, [0, 0, item], option);
        return target.length + 1;
    }
};

/**
 * 数组数据项移除操作
 *
 * @param {string|Object} expr 数据项路径
 * @param {number} index 要移除项的索引
 * @param {Object=} option 设置参数
 * @param {boolean} option.silent 静默设置，不触发变更事件
 */
Data.prototype.removeAt = function (expr, index, option) {
    this.splice(expr, [index, 1], option);
};

/**
 * 数组数据项移除操作
 *
 * @param {string|Object} expr 数据项路径
 * @param {*} value 要移除的项
 * @param {Object=} option 设置参数
 * @param {boolean} option.silent 静默设置，不触发变更事件
 */
Data.prototype.remove = function (expr, value, option) {
    var target = this.get(expr);

    if (target instanceof Array) {
        var len = target.length;
        while (len--) {
            if (target[len] === value) {
                this.splice(expr, [len, 1], option);
                break;
            }
        }
    }
};

// exports = module.exports = Data;


/**
 * Copyright (c) Baidu Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license.
 * See LICENSE file in the project root for license information.
 *
 * @file 声明式事件的监听函数
 */


// var evalArgs = require('../runtime/eval-args');
// var findMethod = require('../runtime/find-method');
// var Data = require('../runtime/data');

/**
 * 声明式事件的监听函数
 *
 * @param {Object} eventBind 绑定信息对象
 * @param {boolean} isComponentEvent 是否组件自定义事件
 * @param {Data} data 数据环境
 * @param {Event} e 事件对象
 */
function getEventListener(eventExpr, owner, data, isComponentEvent) {
    return function (e) {
        var method = findMethod(owner, eventExpr.name, data);

        if (typeof method === 'function') {
            method.apply(owner, evalArgs(
                eventExpr.args,
                new Data(
                    { $event: isComponentEvent ? e : e || window.event },
                    data
                ),
                owner
            ));
        }
    };
}

// exports = module.exports = getEventListener;


/**
 * Copyright (c) Baidu Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license.
 * See LICENSE file in the project root for license information.
 *
 * @file 判断变更数组是否影响到数据引用摘要
 */


/**
 * 判断变更数组是否影响到数据引用摘要
 *
 * @param {Array} changes 变更数组
 * @param {Object} dataRef 数据引用摘要
 * @return {boolean}
 */
function changesIsInDataRef(changes, dataRef) {
    for (var i = 0; i < changes.length; i++) {
        var change = changes[i];

        if (!change.overview) {
            var paths = change.expr.paths;
            change.overview = paths[0].value;

            if (paths.length > 1) {
                change.extOverview = paths[0].value + '.' + paths[1].value;
                change.wildOverview = paths[0].value + '.*';
            }
        }

        if (dataRef[change.overview]
            || change.wildOverview && dataRef[change.wildOverview]
            || change.extOverview && dataRef[change.extOverview]
        ) {
            return true;
        }
    }
}

// exports = module.exports = changesIsInDataRef;


/**
 * Copyright (c) Baidu Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license.
 * See LICENSE file in the project root for license information.
 *
 * @file insertBefore 方法的兼容性封装
 */

/**
 * insertBefore 方法的兼容性封装
 *
 * @param {HTMLNode} targetEl 要插入的节点
 * @param {HTMLElement} parentEl 父元素
 * @param {HTMLElement?} beforeEl 在此元素之前插入
 */
function insertBefore(targetEl, parentEl, beforeEl) {
    if (parentEl) {
        if (beforeEl) {
            parentEl.insertBefore(targetEl, beforeEl);
        }
        else {
            parentEl.appendChild(targetEl);
        }
    }
}

// exports = module.exports = insertBefore;


/**
 * Copyright (c) Baidu Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license.
 * See LICENSE file in the project root for license information.
 *
 * @file 元素的基本属性
 */

var baseProps = {
    'class': 1,
    'style': 1,
    'id': 1
};

// exports = module.exports = baseProps;


/**
 * Copyright (c) Baidu Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license.
 * See LICENSE file in the project root for license information.
 *
 * @file 元素子节点遍历操作类
 */

// var removeEl = require('../browser/remove-el');

// #[begin] reverse
// /**
//  * 元素子节点遍历操作类
//  *
//  * @inner
//  * @class
//  * @param {HTMLElement} el 要遍历的元素
//  */
// function DOMChildrenWalker(el) {
//     this.raw = [];
//     this.index = 0;
//     this.target = el;
// 
//     var child = el.firstChild;
//     var next;
//     while (child) {
//         next = child.nextSibling;
// 
//         switch (child.nodeType) {
//             case 3:
//                 if (/^\s*$/.test(child.data || child.textContent)) {
//                     removeEl(child);
//                 }
//                 else {
//                     this.raw.push(child);
//                 }
//                 break;
// 
//             case 1:
//             case 8:
//                 this.raw.push(child);
//         }
// 
//         child = next;
//     }
// 
//     this.current = this.raw[this.index];
//     this.next = this.raw[this.index + 1];
// }
// 
// /**
//  * 往下走一个元素
//  */
// DOMChildrenWalker.prototype.goNext = function () {
//     this.current = this.raw[++this.index];
//     this.next = this.raw[this.index + 1];
// };
// #[end]

// exports = module.exports = DOMChildrenWalker;


/**
 * Copyright (c) Baidu Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license.
 * See LICENSE file in the project root for license information.
 *
 * @file 元素节点类
 */


// var changeExprCompare = require('../runtime/change-expr-compare');
// var changesIsInDataRef = require('../runtime/changes-is-in-data-ref');
// var evalExpr = require('../runtime/eval-expr');
// var insertBefore = require('../browser/insert-before');
// var LifeCycle = require('./life-cycle');
// var NodeType = require('./node-type');
// var baseProps = require('./base-props');
// var reverseElementChildren = require('./reverse-element-children');
// var isDataChangeByElement = require('./is-data-change-by-element');
// var getPropHandler = require('./get-prop-handler');
// var createNode = require('./create-node');
// var elementOwnDetach = require('./element-own-detach');
// var elementOwnDispose = require('./element-own-dispose');
// var elementOwnOnEl = require('./element-own-on-el');
// var elementOwnAttached = require('./element-own-attached');
// var nodeSBindInit = require('./node-s-bind-init');
// var nodeSBindUpdate = require('./node-s-bind-update');
// var warnSetHTML = require('./warn-set-html');
// var getNodePath = require('./get-node-path');

/**
 * 元素节点类
 *
 * @class
 * @param {Object} aNode 抽象节点
 * @param {Node} parent 父亲节点
 * @param {Model} scope 所属数据环境
 * @param {Component} owner 所属组件环境
 * @param {DOMChildrenWalker?} reverseWalker 子元素遍历对象
 */
function Element(aNode, parent, scope, owner, reverseWalker) {
    this.aNode = aNode;
    this.owner = owner;
    this.scope = scope;
    this.parent = parent;

    this.lifeCycle = LifeCycle.start;
    this.children = [];
    this._elFns = [];
    this.parentComponent = parent.nodeType === 5
        ? parent
        : parent.parentComponent;

    this.tagName = aNode.tagName;

    // #[begin] allua
    // ie8- 不支持innerHTML输出自定义标签
    /* istanbul ignore if */
    if (ieOldThan9 && this.tagName.indexOf('-') > 0) {
        this.tagName = 'div';
    }
    // #[end]

    nodeSBindInit(this, aNode.directives.bind);
    this.lifeCycle = LifeCycle.inited;

    // #[begin] reverse
//     if (reverseWalker) {
//         var currentNode = reverseWalker.current;
// 
//         /* istanbul ignore if */
//         if (!currentNode) {
//             throw new Error('[SAN REVERSE ERROR] Element not found. \nPaths: '
//                 + getNodePath(this).join(' > '));
//         }
// 
//         /* istanbul ignore if */
//         if (currentNode.nodeType !== 1) {
//             throw new Error('[SAN REVERSE ERROR] Element type not match, expect 1 but '
//                 + currentNode.nodeType + '.\nPaths: '
//                 + getNodePath(this).join(' > '));
//         }
// 
//         /* istanbul ignore if */
//         if (currentNode.tagName.toLowerCase() !== this.tagName) {
//             throw new Error('[SAN REVERSE ERROR] Element tagName not match, expect '
//                 + this.tagName + ' but meat ' + currentNode.tagName.toLowerCase() + '.\nPaths: '
//                 + getNodePath(this).join(' > '));
//         }
// 
//         this.el = currentNode;
//         reverseWalker.goNext();
// 
//         reverseElementChildren(this, this.scope, this.owner);
// 
//         this.lifeCycle = LifeCycle.created;
//         this._attached();
//         this.lifeCycle = LifeCycle.attached;
//     }
    // #[end]
}



Element.prototype.nodeType = 4;

/**
 * 将元素attach到页面
 *
 * @param {HTMLElement} parentEl 要添加到的父元素
 * @param {HTMLElement＝} beforeEl 要添加到哪个元素之前
 */
Element.prototype.attach = function (parentEl, beforeEl) {
    if (!this.lifeCycle.attached) {
        if (!this.el) {
            var sourceNode = this.aNode.hotspot.sourceNode;
            var props = this.aNode.props;

            if (sourceNode) {
                this.el = sourceNode.cloneNode(false);
                props = this.aNode.hotspot.dynamicProps;
            }
            else {
                this.el = createEl(this.tagName);
            }

            if (this._sbindData) {
                for (var key in this._sbindData) {
                    if (this._sbindData.hasOwnProperty(key)) {
                        getPropHandler(this.tagName, key)(
                            this.el,
                            this._sbindData[key],
                            key,
                            this
                        );
                    }
                }
            }

            for (var i = 0, l = props.length; i < l; i++) {
                var prop = props[i];
                var propName = prop.name;
                var value = evalExpr(prop.expr, this.scope, this.owner);

                if (value || !baseProps[propName]) {
                    prop.handler(this.el, value, propName, this, prop);
                }
            }

            this.lifeCycle = LifeCycle.created;
        }
        insertBefore(this.el, parentEl, beforeEl);

        if (!this._contentReady) {
            var htmlDirective = this.aNode.directives.html;

            if (htmlDirective) {
                // #[begin] error
//                 warnSetHTML(this.el);
                // #[end]

                this.el.innerHTML = evalExpr(htmlDirective.value, this.scope, this.owner);
            }
            else {
                for (var i = 0, l = this.aNode.children.length; i < l; i++) {
                    var childANode = this.aNode.children[i];
                    var child = childANode.Clazz
                        ? new childANode.Clazz(childANode, this, this.scope, this.owner)
                        : createNode(childANode, this, this.scope, this.owner);
                    this.children.push(child);
                    child.attach(this.el);
                }
            }

            this._contentReady = 1;
        }

        this._attached();

        this.lifeCycle = LifeCycle.attached;
    }
};

Element.prototype.detach = elementOwnDetach;
Element.prototype.dispose = elementOwnDispose;
Element.prototype._onEl = elementOwnOnEl;
Element.prototype._leave = function () {
    if (this.leaveDispose) {
        if (!this.lifeCycle.disposed) {
            var len = this.children.length;
            while (len--) {
                this.children[len].dispose(1, 1);
            }

            len = this._elFns.length;
            while (len--) {
                var fn = this._elFns[len];
                un(this.el, fn[0], fn[1], fn[2]);
            }
            this._elFns = null;

            // #[begin] allua
            /* istanbul ignore if */
            if (this._inputTimer) {
                clearInterval(this._inputTimer);
                this._inputTimer = null;
            }
            // #[end]

            // 如果没有parent，说明是一个root component，一定要从dom树中remove
            if (!this.disposeNoDetach || !this.parent) {
                removeEl(this.el);
            }

            this.lifeCycle = LifeCycle.detached;

            this.el = null;
            this.owner = null;
            this.scope = null;
            this.children = null;
            this.lifeCycle = LifeCycle.disposed;

            if (this._ondisposed) {
                this._ondisposed();
            }
        }
    }
    else if (this.lifeCycle.attached) {
        removeEl(this.el);
        this.lifeCycle = LifeCycle.detached;
    }
};

/**
 * 视图更新
 *
 * @param {Array} changes 数据变化信息
 */
Element.prototype._update = function (changes) {
    var dataHotspot = this.aNode.hotspot.data;
    if (dataHotspot && changesIsInDataRef(changes, dataHotspot)) {

        // update s-bind
        var me = this;
        nodeSBindUpdate(
            this,
            this.aNode.directives.bind,
            changes,
            function (name, value) {
                if (name in me.aNode.hotspot.props) {
                    return;
                }

                getPropHandler(me.tagName, name)(me.el, value, name, me);
            }
        );

        // update prop
        var dynamicProps = this.aNode.hotspot.dynamicProps;
        for (var i = 0, l = dynamicProps.length; i < l; i++) {
            var prop = dynamicProps[i];
            var propName = prop.name;

            for (var j = 0, changeLen = changes.length; j < changeLen; j++) {
                var change = changes[j];

                if (!isDataChangeByElement(change, this, propName)
                    && (
                        changeExprCompare(change.expr, prop.expr, this.scope)
                        || prop.hintExpr && changeExprCompare(change.expr, prop.hintExpr, this.scope)
                    )
                ) {
                    prop.handler(this.el, evalExpr(prop.expr, this.scope, this.owner), propName, this, prop);
                    break;
                }
            }
        }

        // update content
        var htmlDirective = this.aNode.directives.html;
        if (htmlDirective) {
            var len = changes.length;
            while (len--) {
                if (changeExprCompare(changes[len].expr, htmlDirective.value, this.scope)) {
                    // #[begin] error
//                     warnSetHTML(this.el);
                    // #[end]

                    this.el.innerHTML = evalExpr(htmlDirective.value, this.scope, this.owner);
                    break;
                }
            }
        }
        else {
            for (var i = 0, l = this.children.length; i < l; i++) {
                this.children[i]._update(changes);
            }
        }
    }
};

/**
 * 执行完成attached状态的行为
 */
Element.prototype._attached = elementOwnAttached;

// exports = module.exports = Element;


/**
 * Copyright (c) Baidu Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license.
 * See LICENSE file in the project root for license information.
 *
 * @file 创建节点对应的 stump comment 元素
 */



/**
 * 创建节点对应的 stump comment 主元素
 */
function nodeOwnCreateStump() {
    this.el = this.el || document.createComment(this.id);
}

// exports = module.exports = nodeOwnCreateStump;


/**
 * Copyright (c) Baidu Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license.
 * See LICENSE file in the project root for license information.
 *
 * @file 销毁释放元素的子元素
 */

/**
 * 销毁释放元素的子元素
 *
 * @param {Array=} children 子元素数组
 * @param {boolean=} noDetach 是否不要把节点从dom移除
 * @param {boolean=} noTransition 是否不显示过渡动画效果
 */
function elementDisposeChildren(children, noDetach, noTransition) {
    var len = children && children.length;
    while (len--) {
        children[len].dispose(noDetach, noTransition);
    }
}

// exports = module.exports = elementDisposeChildren;


/**
 * Copyright (c) Baidu Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license.
 * See LICENSE file in the project root for license information.
 *
 * @file 简单执行销毁节点的行为
 */

// var removeEl = require('../browser/remove-el');
// var LifeCycle = require('./life-cycle');
// var elementDisposeChildren = require('./element-dispose-children');

/**
 * 简单执行销毁节点的行为
 *
 * @param {boolean=} noDetach 是否不要把节点从dom移除
 */
function nodeOwnSimpleDispose(noDetach) {
    elementDisposeChildren(this.children, noDetach, 1);

    if (!noDetach) {
        removeEl(this.el);
    }

    this.el = null;
    this.owner = null;
    this.scope = null;
    this.children = null;

    this.lifeCycle = LifeCycle.disposed;
    if (this._ondisposed) {
        this._ondisposed();
    }
}

// exports = module.exports = nodeOwnSimpleDispose;


/**
 * Copyright (c) Baidu Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license.
 * See LICENSE file in the project root for license information.
 *
 * @file 异步组件类
 */

// var guid = require('../util/guid');
// var each = require('../util/each');
// var insertBefore = require('../browser/insert-before');
// var nodeOwnCreateStump = require('./node-own-create-stump');
// var nodeOwnSimpleDispose = require('./node-own-simple-dispose');


/**
 * 异步组件类
 *
 * @class
 * @param {Object} options 初始化参数
 * @param {Object} loader 组件加载器
 */
function AsyncComponent(options, loader) {
    this.options = options;
    this.loader = loader;
    this.id = guid++;
    this.children = [];

    // #[begin] reverse
//     var reverseWalker = options.reverseWalker;
//     if (reverseWalker) {
//         var PlaceholderComponent = this.loader.placeholder;
//         if (PlaceholderComponent) {
//             this.children[0] = new PlaceholderComponent(options);
//         }
// 
//         this._create();
//         insertBefore(this.el, reverseWalker.target, reverseWalker.current);
// 
//         var me = this;
//         this.loader.start(function (ComponentClass) {
//             me.onload(ComponentClass);
//         });
//     }
//     options.reverseWalker = null;
    // #[end]
}

AsyncComponent.prototype._create = nodeOwnCreateStump;
AsyncComponent.prototype.dispose = nodeOwnSimpleDispose;

/**
 * attach到页面
 *
 * @param {HTMLElement} parentEl 要添加到的父元素
 * @param {HTMLElement＝} beforeEl 要添加到哪个元素之前
 */
AsyncComponent.prototype.attach = function (parentEl, beforeEl) {
    var PlaceholderComponent = this.loader.placeholder;
    if (PlaceholderComponent) {
        var component = new PlaceholderComponent(this.options);
        this.children[0] = component;
        component.attach(parentEl, beforeEl);
    }

    this._create();
    insertBefore(this.el, parentEl, beforeEl);

    var me = this;
    this.loader.start(function (ComponentClass) {
        me.onload(ComponentClass);
    });
};


/**
 * loader加载完成，渲染组件
 *
 * @param {Function=} ComponentClass 组件类
 */
AsyncComponent.prototype.onload = function (ComponentClass) {
    if (this.el && ComponentClass) {
        var component = new ComponentClass(this.options);
        component.attach(this.el.parentNode, this.el);

        var parentChildren = this.options.parent.children;
        if (this.parentIndex == null || parentChildren[this.parentIndex] !== this) {
            each(parentChildren, function (child, index) {
                if (child instanceof AsyncComponent) {
                    child.parentIndex = index;
                }
            });
        }

        parentChildren[this.parentIndex] = component;
    }

    this.dispose();
};

// exports = module.exports = AsyncComponent;


/**
 * Copyright (c) Baidu Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license.
 * See LICENSE file in the project root for license information.
 *
 * @file 通过组件反解创建节点的工厂方法
 */

// var Element = require('./element');
// var AsyncComponent = require('./async-component');

// #[begin] reverse
// /**
//  * 通过组件反解创建节点
//  *
//  * @param {ANode} aNode 抽象节点
//  * @param {Node} parent 父亲节点
//  * @param {Model} scope 所属数据环境
//  * @param {Component} owner 所属组件环境
//  * @param {DOMChildrenWalker} reverseWalker 子元素遍历对象
//  * @return {Node}
//  */
// function createReverseNode(aNode, parent, scope, owner, reverseWalker) {
//     if (aNode.Clazz) {
//         return new aNode.Clazz(aNode, parent, scope, owner, reverseWalker);
//     }
// 
//     var ComponentOrLoader = owner.getComponentType
//         ? owner.getComponentType(aNode)
//         : owner.components[aNode.tagName];
// 
//     if (ComponentOrLoader) {
//         return typeof ComponentOrLoader === 'function'
//             ? new ComponentOrLoader({
//                 source: aNode,
//                 owner: owner,
//                 scope: scope,
//                 parent: parent,
//                 subTag: aNode.tagName,
//                 reverseWalker: reverseWalker
//             })
//             : new AsyncComponent({
//                 source: aNode,
//                 owner: owner,
//                 scope: scope,
//                 parent: parent,
//                 subTag: aNode.tagName,
//                 reverseWalker: reverseWalker
//             }, ComponentOrLoader);
//     }
// 
//     return new Element(aNode, parent, scope, owner, reverseWalker);
// }
// #[end]

// exports = module.exports = createReverseNode;


/**
 * Copyright (c) Baidu Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license.
 * See LICENSE file in the project root for license information.
 *
 * @file 对元素的子节点进行反解
 */


// var each = require('../util/each');
// var DOMChildrenWalker = require('./dom-children-walker');
// var createReverseNode = require('./create-reverse-node');

// #[begin] reverse
// 
// /**
//  * 对元素的子节点进行反解
//  *
//  * @param {Object} element 元素
//  */
// function reverseElementChildren(element, scope, owner) {
//     var htmlDirective = element.aNode.directives.html;
// 
//     if (!htmlDirective) {
//         var reverseWalker = new DOMChildrenWalker(element.el);
// 
//         each(element.aNode.children, function (aNodeChild) {
//             element.children.push(
//                 createReverseNode(aNodeChild, element, scope, owner, reverseWalker)
//             );
//         });
//     }
// }
// #[end]

// exports = module.exports = reverseElementChildren;


/**
 * Copyright (c) Baidu Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license.
 * See LICENSE file in the project root for license information.
 *
 * @file 创建节点的工厂方法
 */

// var Element = require('./element');
// var AsyncComponent = require('./async-component');


/**
 * 创建节点
 *
 * @param {ANode} aNode 抽象节点
 * @param {Node} parent 父亲节点
 * @param {Model} scope 所属数据环境
 * @param {Component} owner 所属组件环境
 * @return {Node}
 */
function createNode(aNode, parent, scope, owner) {
    if (aNode.Clazz) {
        return new aNode.Clazz(aNode, parent, scope, owner);
    }

    var ComponentOrLoader = owner.getComponentType
        ? owner.getComponentType(aNode)
        : owner.components[aNode.tagName];

    if (ComponentOrLoader) {
        return typeof ComponentOrLoader === 'function'
            ? new ComponentOrLoader({
                source: aNode,
                owner: owner,
                scope: scope,
                parent: parent,
                subTag: aNode.tagName
            })
            : new AsyncComponent({
                source: aNode,
                owner: owner,
                scope: scope,
                parent: parent,
                subTag: aNode.tagName
            }, ComponentOrLoader);
    }

    aNode.Clazz = Element;
    return new Element(aNode, parent, scope, owner);
}

// exports = module.exports = createNode;


/**
 * Copyright (c) Baidu Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license.
 * See LICENSE file in the project root for license information.
 *
 * @file 获取 element 的 transition 控制对象
 */

// var evalArgs = require('../runtime/eval-args');
// var findMethod = require('../runtime/find-method');
// var NodeType = require('./node-type');

/**
 * 获取 element 的 transition 控制对象
 *
 * @param {Object} element 元素
 * @return {Object?}
 */
function elementGetTransition(element) {
    var directive = element.aNode.directives.transition;
    var owner = element.owner;

    if (element.nodeType === 5) {
        var cmptGivenTransition = element.source && element.source.directives.transition;
        if (cmptGivenTransition) {
            directive = cmptGivenTransition;
        }
        else {
            owner = element;
        }
    }

    var transition;
    if (directive && owner) {
        transition = findMethod(owner, directive.value.name);

        if (typeof transition === 'function') {
            transition = transition.apply(
                owner,
                evalArgs(directive.value.args, element.scope, owner)
            );
        }
    }

    return transition || element.transition;
}

// exports = module.exports = elementGetTransition;


/**
 * Copyright (c) Baidu Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license.
 * See LICENSE file in the project root for license information.
 *
 * @file 将元素从页面上移除
 */

// var elementGetTransition = require('./element-get-transition');

/**
 * 将元素从页面上移除
 */
function elementOwnDetach() {
    var lifeCycle = this.lifeCycle;
    if (lifeCycle.leaving) {
        return;
    }

    if (!this.disposeNoTransition) {
        var transition = elementGetTransition(this);

        if (transition && transition.leave) {
            if (this._toPhase) {
                this._toPhase('leaving');
            }
            else {
                this.lifeCycle = LifeCycle.leaving;
            }

            var me = this;
            transition.leave(this.el, function () {
                me._leave();
            });

            return;
        }
    }

    this._leave();
}


// exports = module.exports = elementOwnDetach;


/**
 * Copyright (c) Baidu Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license.
 * See LICENSE file in the project root for license information.
 *
 * @file 销毁释放元素
 */

/**
 * 销毁释放元素
 *
 * @param {boolean=} noDetach 是否不要把节点从dom移除
 * @param {boolean=} noTransition 是否不显示过渡动画效果
 */
function elementOwnDispose(noDetach, noTransition) {
    this.leaveDispose = 1;
    this.disposeNoDetach = noDetach;
    this.disposeNoTransition = noTransition;

    this.detach();
}

// exports = module.exports = elementOwnDispose;


/**
 * Copyright (c) Baidu Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license.
 * See LICENSE file in the project root for license information.
 *
 * @file 为元素的 el 绑定事件
 */

// var on = require('../browser/on');

/**
 * 为元素的 el 绑定事件
 *
 * @param {string} name 事件名
 * @param {Function} listener 监听器
 * @param {boolean} capture 是否是捕获阶段触发
 */
function elementOwnOnEl(name, listener, capture) {
    capture = !!capture;
    this._elFns.push([name, listener, capture]);
    on(this.el, name, listener, capture);
}

// exports = module.exports = elementOwnOnEl;


/**
 * Copyright (c) Baidu Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license.
 * See LICENSE file in the project root for license information.
 *
 * @file 是否浏览器环境
 */

var isBrowser = typeof window !== 'undefined';

// exports = module.exports = isBrowser;


/**
 * Copyright (c) Baidu Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license.
 * See LICENSE file in the project root for license information.
 *
 * @file 开发时的警告提示
 */

// #[begin] error
// /**
//  * 开发时的警告提示
//  *
//  * @param {string} message 警告信息
//  */
// function warn(message) {
//     message = '[SAN WARNING] ' + message;
// 
//     /* eslint-disable no-console */
//     /* istanbul ignore next */
//     if (typeof console === 'object' && console.warn) {
//         console.warn(message);
//     }
//     else {
//         // 防止警告中断调用堆栈
//         setTimeout(function () {
//             throw new Error(message);
//         }, 0);
//     }
//     /* eslint-enable no-console */
// }
// #[end]

// exports = module.exports = warn;


/**
 * Copyright (c) Baidu Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license.
 * See LICENSE file in the project root for license information.
 *
 * @file  事件绑定不存在的 warning
 */

// var each = require('../util/each');
// var warn = require('../util/warn');

// #[begin] error
// /**
//  * 事件绑定不存在的 warning
//  *
//  * @param {Object} eventBind 事件绑定对象
//  * @param {Component} owner 所属的组件对象
//  */
// function warnEventListenMethod(eventBind, owner) {
//     var valid = true;
//     var method = owner;
//     each(eventBind.expr.name.paths, function (path) {
//         method = method[path.value];
//         valid = !!method;
//         return valid;
//     });
// 
//     if (!valid) {
//         var paths = [];
//         each(eventBind.expr.name.paths, function (path) {
//             paths.push(path.value);
//         });
// 
//         warn(eventBind.name + ' listen fail,"' + paths.join('.') + '" not exist');
//     }
// }
// #[end]

// exports = module.exports = warnEventListenMethod;


/**
 * Copyright (c) Baidu Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license.
 * See LICENSE file in the project root for license information.
 *
 * @file 完成元素 attached 后的行为
 */


// var empty = require('../util/empty');
// var isBrowser = require('../browser/is-browser');
// var trigger = require('../browser/trigger');
// var NodeType = require('./node-type');
// var elementGetTransition = require('./element-get-transition');
// var getEventListener = require('./get-event-listener');
// var warnEventListenMethod = require('./warn-event-listen-method');

/**
 * 双绑输入框CompositionEnd事件监听函数
 *
 * @inner
 */
function inputOnCompositionEnd() {
    if (!this.composing) {
        return;
    }

    this.composing = 0;
    trigger(this, 'input');
}

/**
 * 双绑输入框CompositionStart事件监听函数
 *
 * @inner
 */
function inputOnCompositionStart() {
    this.composing = 1;
}

function getXPropOutputer(element, xProp, data) {
    return function () {
        xPropOutput(element, xProp, data);
    };
}

function getInputXPropOutputer(element, xProp, data) {
    return function () {
        if (!this.composing) {
            xPropOutput(element, xProp, data);
        }
    };
}

// #[begin] allua
/* istanbul ignore next */
function getInputFocusXPropHandler(element, xProp, data) {
    return function () {
        element._inputTimer = setInterval(function () {
            xPropOutput(element, xProp, data);
        }, 16);
    };
}

/* istanbul ignore next */
function getInputBlurXPropHandler(element) {
    return function () {
        clearInterval(element._inputTimer);
        element._inputTimer = null;
    };
}
// #[end]

function xPropOutput(element, bindInfo, data) {
    /* istanbul ignore if */
    if (!element.lifeCycle.created) {
        return;
    }

    var el = element.el;

    if (element.tagName === 'input' && bindInfo.name === 'checked') {
        var bindValue = getANodeProp(element.aNode, 'value');
        var bindType = getANodeProp(element.aNode, 'type');

        if (bindValue && bindType) {
            switch (el.type.toLowerCase()) {
                case 'checkbox':
                    data[el.checked ? 'push' : 'remove'](bindInfo.expr, el.value);
                    return;

                case 'radio':
                    el.checked && data.set(bindInfo.expr, el.value, {
                        target: {
                            node: element,
                            prop: bindInfo.name
                        }
                    });
                    return;
            }
        }
    }

    data.set(bindInfo.expr, el[bindInfo.name], {
        target: {
            node: element,
            prop: bindInfo.name
        }
    });
}

/**
 * 完成元素 attached 后的行为
 *
 * @param {Object} element 元素节点
 */
function elementOwnAttached() {
    if (this.el.nodeType === 1) {
        var isComponent = this.nodeType === 5;
        var data = isComponent ? this.data : this.scope;

        /* eslint-disable no-redeclare */

        // 处理自身变化时双向绑定的逻辑
        var xProps = this.aNode.hotspot.xProps;
        for (var i = 0, l = xProps.length; i < l; i++) {
            var xProp = xProps[i];

            switch (xProp.name) {
                case 'value':
                    switch (this.tagName) {
                        case 'input':
                        case 'textarea':
                            if (isBrowser && window.CompositionEvent) {
                                this._onEl('change', inputOnCompositionEnd);
                                this._onEl('compositionstart', inputOnCompositionStart);
                                this._onEl('compositionend', inputOnCompositionEnd);
                            }

                            // #[begin] allua
                            /* istanbul ignore else */
                            if ('oninput' in this.el) {
                            // #[end]
                                this._onEl('input', getInputXPropOutputer(this, xProp, data));
                            // #[begin] allua
                            }
                            else {
                                this._onEl('focusin', getInputFocusXPropHandler(this, xProp, data));
                                this._onEl('focusout', getInputBlurXPropHandler(this));
                            }
                            // #[end]

                            break;

                        case 'select':
                            this._onEl('change', getXPropOutputer(this, xProp, data));
                            break;
                    }
                    break;

                case 'checked':
                    switch (this.tagName) {
                        case 'input':
                            switch (this.el.type) {
                                case 'checkbox':
                                case 'radio':
                                    this._onEl('click', getXPropOutputer(this, xProp, data));
                            }
                    }
                    break;
            }
        }

        var owner = isComponent ? this : this.owner;
        for (var i = 0, l = this.aNode.events.length; i < l; i++) {
            var eventBind = this.aNode.events[i];

            // #[begin] error
//             warnEventListenMethod(eventBind, owner);
            // #[end]

            this._onEl(
                eventBind.name,
                getEventListener(eventBind.expr, owner, data),
                eventBind.modifier.capture
            );
        }

        if (isComponent) {
            for (var i = 0, l = this.nativeEvents.length; i < l; i++) {
                var eventBind = this.nativeEvents[i];

                // #[begin] error
//                 warnEventListenMethod(eventBind, this.owner);
                // #[end]

                this._onEl(
                    eventBind.name,
                    getEventListener(eventBind.expr, this.owner, this.scope),
                    eventBind.modifier.capture
                );
            }
        }
    }

    if (this.el.nodeType === 1) {
        var transition = elementGetTransition(this);
        if (transition && transition.enter) {
            transition.enter(this.el, empty);
        }
    }
}

// exports = module.exports = elementOwnAttached;


/**
 * Copyright (c) Baidu Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license.
 * See LICENSE file in the project root for license information.
 *
 * @file 初始化节点的 s-bind 数据
 */


// var evalExpr = require('../runtime/eval-expr');

/**
 * 初始化节点的 s-bind 数据
 *
 * @param {Object} node 节点对象
 * @param {Object} sBind bind指令对象
 * @return {boolean}
 */
function nodeSBindInit(node, sBind) {
    if (sBind && node.scope) {
        node._sbindData = evalExpr(sBind.value, node.scope, node.owner);
        return true;
    }
}

// exports = module.exports = nodeSBindInit;


/**
 * Copyright (c) Baidu Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license.
 * See LICENSE file in the project root for license information.
 *
 * @file 计算两个对象 key 的并集
 */

/**
 * 计算两个对象 key 的并集
 *
 * @param {Object} obj1 目标对象
 * @param {Object} obj2 源对象
 * @return {Array}
 */
function unionKeys(obj1, obj2) {
    var result = [];
    var key;

    for (key in obj1) {
        /* istanbul ignore else  */
        if (obj1.hasOwnProperty(key)) {
            result.push(key);
        }
    }

    for (key in obj2) {
        /* istanbul ignore else  */
        if (obj2.hasOwnProperty(key)) {
            !obj1[key] && result.push(key);
        }
    }

    return result;
}

// exports = module.exports = unionKeys;


/**
 * Copyright (c) Baidu Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license.
 * See LICENSE file in the project root for license information.
 *
 * @file 更新节点的 s-bind 数据
 */

// var unionKeys = require('../util/union-keys');
// var evalExpr = require('../runtime/eval-expr');
// var changeExprCompare = require('../runtime/change-expr-compare');

/**
 * 初始化节点的 s-bind 数据
 *
 * @param {Object} node 节点对象
 * @param {Object} sBind bind指令对象
 * @param {Array} changes 变更数组
 * @param {Function} updater 绑定对象子项变更的更新函数
 */
function nodeSBindUpdate(node, sBind, changes, updater) {
    if (sBind) {
        var len = changes.length;

        while (len--) {
            if (changeExprCompare(changes[len].expr, sBind.value, node.scope)) {
                var newBindData = evalExpr(sBind.value, node.scope, node.owner);
                var keys = unionKeys(newBindData, node._sbindData);

                for (var i = 0, l = keys.length; i < l; i++) {
                    var key = keys[i];
                    var value = newBindData[key];

                    if (value !== node._sbindData[key]) {
                        updater(key, value);
                    }
                }

                node._sbindData = newBindData;
                break;
            }

        }
    }
}

// exports = module.exports = nodeSBindUpdate;


/**
 * Copyright (c) Baidu Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license.
 * See LICENSE file in the project root for license information.
 *
 * @file 判断元素是否不允许设置HTML
 */

// some html elements cannot set innerHTML in old ie
// see: https://msdn.microsoft.com/en-us/library/ms533897(VS.85).aspx

/**
 * 判断元素是否不允许设置HTML
 *
 * @param {HTMLElement} el 要判断的元素
 * @return {boolean}
 */
function noSetHTML(el) {
    return /^(col|colgroup|frameset|style|table|tbody|tfoot|thead|tr|select)$/i.test(el.tagName);
}

// exports = module.exports = noSetHTML;


/**
 * Copyright (c) Baidu Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license.
 * See LICENSE file in the project root for license information.
 *
 * @file  获取节点 stump 的 comment
 */

// var noSetHTML = require('../browser/no-set-html');
// var warn = require('../util/warn');

// #[begin] error
// /**
//  * 获取节点 stump 的 comment
//  *
//  * @param {HTMLElement} el HTML元素
//  */
// function warnSetHTML(el) {
//     // dont warn if not in browser runtime
//     /* istanbul ignore if */
//     if (!(typeof window !== 'undefined' && typeof navigator !== 'undefined' && window.document)) {
//         return;
//     }
// 
//     // some html elements cannot set innerHTML in old ie
//     // see: https://msdn.microsoft.com/en-us/library/ms533897(VS.85).aspx
//     if (noSetHTML(el)) {
//         warn('set html for element "' + el.tagName + '" may cause an error in old IE');
//     }
// }
// #[end]

// exports = module.exports = warnSetHTML;


/**
 * Copyright (c) Baidu Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license.
 * See LICENSE file in the project root for license information.
 *
 * @file 获取节点在组件树中的路径
 */


// var NodeType = require('./node-type');

// #[begin] reverse
// /**
//  * 获取节点在组件树中的路径
//  *
//  * @param {Node} node 节点对象
//  * @return {Array}
//  */
// /* istanbul ignore next */
// function getNodePath(node) {
//     var nodePaths = [];
//     var nodeParent = node;
//     while (nodeParent) {
//         switch (nodeParent.nodeType) {
//             case 4:
//                 nodePaths.unshift(nodeParent.tagName);
//                 break;
// 
//             case 2:
//                 nodePaths.unshift('if');
//                 break;
// 
//             case 3:
//                 nodePaths.unshift('for[' + nodeParent.anode.directives['for'].raw + ']'); // eslint-disable-line dot-notation
//                 break;
// 
//             case 6:
//                 nodePaths.unshift('slot[' + (nodeParent.name || 'default') + ']');
//                 break;
// 
//             case 7:
//                 nodePaths.unshift('template');
//                 break;
// 
//             case 5:
//                 nodePaths.unshift('component[' + (nodeParent.subTag || 'root') + ']');
//                 break;
// 
//             case 1:
//                 nodePaths.unshift('text');
//                 break;
//         }
// 
//         nodeParent = nodeParent.parent;
//     }
// 
//     return nodePaths;
// }
// #[end]

// exports = module.exports = getNodePath;


/**
 * Copyright (c) Baidu Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license.
 * See LICENSE file in the project root for license information.
 *
 * @file 给 devtool 发通知消息
 */

// var isBrowser = require('../browser/is-browser');

// #[begin] devtool
// var san4devtool;
// 
// /**
//  * 给 devtool 发通知消息
//  *
//  * @param {string} name 消息名称
//  * @param {*} arg 消息参数
//  */
// function emitDevtool(name, arg) {
//     /* istanbul ignore if */
//     if (isBrowser && san4devtool && san4devtool.debug && window.__san_devtool__) {
//         window.__san_devtool__.emit(name, arg);
//     }
// }
// 
// emitDevtool.start = function (main) {
//     san4devtool = main;
//     emitDevtool('san', main);
// };
// #[end]

// exports = module.exports = emitDevtool;


/**
 * Copyright (c) Baidu Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license.
 * See LICENSE file in the project root for license information.
 *
 * @file 组件类
 */

// var bind = require('../util/bind');
// var each = require('../util/each');
// var guid = require('../util/guid');
// var extend = require('../util/extend');
// var nextTick = require('../util/next-tick');
// var emitDevtool = require('../util/emit-devtool');
// var ExprType = require('../parser/expr-type');
// var parseExpr = require('../parser/parse-expr');
// var parseTemplate = require('../parser/parse-template');
// var createAccessor = require('../parser/create-accessor');
// var postProp = require('../parser/post-prop');
// var removeEl = require('../browser/remove-el');
// var Data = require('../runtime/data');
// var evalExpr = require('../runtime/eval-expr');
// var changeExprCompare = require('../runtime/change-expr-compare');
// var DataChangeType = require('../runtime/data-change-type');
// var insertBefore = require('../browser/insert-before');
// var un = require('../browser/un');
// var createNode = require('./create-node');
// var compileComponent = require('./compile-component');
// var preheatANode = require('./preheat-a-node');
// var LifeCycle = require('./life-cycle');
// var getANodeProp = require('./get-a-node-prop');
// var isDataChangeByElement = require('./is-data-change-by-element');
// var getEventListener = require('./get-event-listener');
// var reverseElementChildren = require('./reverse-element-children');
// var camelComponentBinds = require('./camel-component-binds');
// var NodeType = require('./node-type');
// var baseProps = require('./base-props');
// var nodeSBindInit = require('./node-s-bind-init');
// var nodeSBindUpdate = require('./node-s-bind-update');
// var elementOwnAttached = require('./element-own-attached');
// var elementOwnOnEl = require('./element-own-on-el');
// var elementOwnDetach = require('./element-own-detach');
// var elementOwnDispose = require('./element-own-dispose');
// var warnEventListenMethod = require('./warn-event-listen-method');
// var elementDisposeChildren = require('./element-dispose-children');
// var createDataTypesChecker = require('../util/create-data-types-checker');
// var warn = require('../util/warn');




/**
 * 组件类
 *
 * @class
 * @param {Object} options 初始化参数
 */
function Component(options) { // eslint-disable-line

    // #[begin] error
//     for (var key in Component.prototype) {
//         if (this[key] !== Component.prototype[key]) {
//             /* eslint-disable max-len */
//             warn('\`' + key + '\` is a reserved key of san components. Overriding this property may cause unknown exceptions.');
//             /* eslint-enable max-len */
//         }
//     }
    // #[end]


    options = options || {};

    this.lifeCycle = LifeCycle.start;
    this.children = [];
    this._elFns = [];
    this.listeners = {};
    this.slotChildren = [];
    this.implicitChildren = [];

    var clazz = this.constructor;

    this.filters = this.filters || clazz.filters || {};
    this.computed = this.computed || clazz.computed || {};
    this.messages = this.messages || clazz.messages || {};

    if (options.transition) {
        this.transition = options.transition;
    }

    this.subTag = options.subTag;

    // compile
    compileComponent(clazz);

    var protoANode = clazz.prototype.aNode;
    preheatANode(protoANode);


    this.tagName = protoANode.tagName;
    this.source = typeof options.source === 'string'
        ? parseTemplate(options.source).children[0]
        : options.source;
    preheatANode(this.source);


    this.sourceSlotNameProps = [];
    this.sourceSlots = {
        named: {}
    };


    this.owner = options.owner;
    this.scope = options.scope;
    this.el = options.el;

    var parent = options.parent;
    if (parent) {
        this.parent = parent;
        this.parentComponent = parent.nodeType === 5
            ? parent
            : parent && parent.parentComponent;
    }
    else if (this.owner) {
        this.parentComponent = this.owner;
        this.scope = this.owner.data;
    }

    this.id = guid++;

    // #[begin] reverse
//     if (this.el) {
//         var firstCommentNode = this.el.firstChild;
//         if (firstCommentNode && firstCommentNode.nodeType === 3) {
//             firstCommentNode = firstCommentNode.nextSibling;
//         }
// 
//         if (firstCommentNode && firstCommentNode.nodeType === 8) {
//             var stumpMatch = firstCommentNode.data.match(/^\s*s-data:([\s\S]+)?$/);
//             if (stumpMatch) {
//                 var stumpText = stumpMatch[1];
// 
//                 // fill component data
//                 options.data = (new Function('return '
//                     + stumpText
//                         .replace(/^[\s\n]*/, '')
//                         .replace(
//                             /"(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})\.\d+Z"/g,
//                             function (match, y, mon, d, h, m, s) {
//                                 return 'new Date(' + (+y) + ',' + (+mon) + ',' + (+d)
//                                     + ',' + (+h) + ',' + (+m) + ',' + (+s) + ')';
//                             }
//                         )
//                 ))();
// 
//                 if (firstCommentNode.previousSibling) {
//                     removeEl(firstCommentNode.previousSibling);
//                 }
//                 removeEl(firstCommentNode);
//             }
//         }
//     }
    // #[end]

    // native事件数组
    this.nativeEvents = [];

    if (this.source) {
        // 组件运行时传入的结构，做slot解析
        this._initSourceSlots(1);

        for (var i = 0, l = this.source.events.length; i < l; i++) {
            var eventBind = this.source.events[i];
            // 保存当前实例的native事件，下面创建aNode时候做合并
            if (eventBind.modifier.native) {
                this.nativeEvents.push(eventBind);
            }
            else {
                // #[begin] error
//                 warnEventListenMethod(eventBind, options.owner);
                // #[end]

                this.on(
                    eventBind.name,
                    getEventListener(eventBind.expr, options.owner, this.scope, 1),
                    eventBind
                );
            }
        }

        this.tagName = this.tagName || this.source.tagName;
        this.binds = camelComponentBinds(this.source.props);

        // init s-bind data
        nodeSBindInit(this, this.source.directives.bind);
    }

    this._toPhase('compiled');

    // init data
    this.data = new Data(
        extend(
            typeof this.initData === 'function' && this.initData() || {},
            options.data || this._sbindData
        )
    );

    this.tagName = this.tagName || 'div';

    // #[begin] allua
    // ie8- 不支持innerHTML输出自定义标签
    /* istanbul ignore if */
    if (ieOldThan9 && this.tagName.indexOf('-') > 0) {
        this.tagName = 'div';
    }
    // #[end]

    if (this.binds) {
        for (var i = 0, l = this.binds.length; i < l; i++) {
            var bindInfo = this.binds[i];
            postProp(bindInfo);

            if (this.scope) {
                var value = evalExpr(bindInfo.expr, this.scope, this.owner);
                if (typeof value !== 'undefined') {
                    // See: https://github.com/ecomfe/san/issues/191
                    this.data.set(bindInfo.name, value);
                }
            }
        }
    }

    // #[begin] error
//     // 在初始化 + 数据绑定后，开始数据校验
//     // NOTE: 只在开发版本中进行属性校验
//     var dataTypes = this.dataTypes || clazz.dataTypes;
//     if (dataTypes) {
//         var dataTypeChecker = createDataTypesChecker(
//             dataTypes,
//             this.subTag || this.name || clazz.name
//         );
//         this.data.setTypeChecker(dataTypeChecker);
//         this.data.checkDataTypes();
//     }
    // #[end]

    this.computedDeps = {};
    for (var expr in this.computed) {
        if (this.computed.hasOwnProperty(expr) && !this.computedDeps[expr]) {
            this._calcComputed(expr);
        }
    }

    this.dataChanger = bind(this._dataChanger, this);
    this.data.listen(this.dataChanger);

    this._toPhase('inited');

    // #[begin] reverse
//     if (this.el) {
//         reverseElementChildren(this, this.data, this);
//         this._toPhase('created');
//         this._attached();
//         this._toPhase('attached');
//     }
//     else {
//         var walker = options.reverseWalker;
//         if (walker) {
//             var ifDirective = this.aNode.directives['if']; // eslint-disable-line dot-notation
// 
//             if (!ifDirective || evalExpr(ifDirective.value, this.data, this)) {
//                 var currentNode = walker.current;
//                 if (currentNode && currentNode.nodeType === 1) {
//                     this.el = currentNode;
//                     walker.goNext();
//                 }
// 
//                 reverseElementChildren(this, this.data, this);
//             }
//             else {
//                 this.el = document.createComment(this.id);
//                 insertBefore(this.el, walker.target, walker.current);
//             }
// 
//             this._toPhase('created');
//             this._attached();
//             this._toPhase('attached');
//         }
//     }
    // #[end]
}


/**
 * 初始化创建组件外部传入的插槽对象
 *
 * @protected
 * @param {boolean} isFirstTime 是否初次对sourceSlots进行计算
 */
Component.prototype._initSourceSlots = function (isFirstTime) {
    var me = this;
    this.sourceSlots.named = {};

    // 组件运行时传入的结构，做slot解析
    this.source && this.scope && each(this.source.children, function (child) {
        var target;

        var slotBind = !child.textExpr && getANodeProp(child, 'slot');
        if (slotBind) {
            isFirstTime && me.sourceSlotNameProps.push(slotBind);

            var slotName = evalExpr(slotBind.expr, me.scope, me.owner);
            target = me.sourceSlots.named[slotName];
            if (!target) {
                target = me.sourceSlots.named[slotName] = [];
            }
        }
        else if (isFirstTime) {
            target = me.sourceSlots.noname;
            if (!target) {
                target = me.sourceSlots.noname = [];
            }
        }

        target && target.push(child);
    });
};

/**
 * 类型标识
 *
 * @type {string}
 */
Component.prototype.nodeType = 5;

/**
 * 在下一个更新周期运行函数
 *
 * @param {Function} fn 要运行的函数
 */
Component.prototype.nextTick = nextTick;

Component.prototype._ctx = (new Date()).getTime().toString(16);

/* eslint-disable operator-linebreak */
/**
 * 使节点到达相应的生命周期
 *
 * @protected
 * @param {string} name 生命周期名称
 */
Component.prototype._callHook =
Component.prototype._toPhase = function (name) {
    if (!this.lifeCycle[name]) {
        this.lifeCycle = LifeCycle[name] || this.lifeCycle;
        if (typeof this[name] === 'function') {
            this[name]();
        }
        this['_after' + name] = 1;

        // 通知devtool
        // #[begin] devtool
//         emitDevtool('comp-' + name, this);
        // #[end]
    }
};
/* eslint-enable operator-linebreak */


/**
 * 添加事件监听器
 *
 * @param {string} name 事件名
 * @param {Function} listener 监听器
 * @param {string?} declaration 声明式
 */
Component.prototype.on = function (name, listener, declaration) {
    if (typeof listener === 'function') {
        if (!this.listeners[name]) {
            this.listeners[name] = [];
        }
        this.listeners[name].push({fn: listener, declaration: declaration});
    }
};

/**
 * 移除事件监听器
 *
 * @param {string} name 事件名
 * @param {Function=} listener 监听器
 */
Component.prototype.un = function (name, listener) {
    var nameListeners = this.listeners[name];
    var len = nameListeners && nameListeners.length;

    while (len--) {
        if (!listener || listener === nameListeners[len].fn) {
            nameListeners.splice(len, 1);
        }
    }
};


/**
 * 派发事件
 *
 * @param {string} name 事件名
 * @param {Object} event 事件对象
 */
Component.prototype.fire = function (name, event) {
    var me = this;
    each(this.listeners[name], function (listener) {
        listener.fn.call(me, event);
    });
};

/**
 * 计算 computed 属性的值
 *
 * @private
 * @param {string} computedExpr computed表达式串
 */
Component.prototype._calcComputed = function (computedExpr) {
    var computedDeps = this.computedDeps[computedExpr];
    if (!computedDeps) {
        computedDeps = this.computedDeps[computedExpr] = {};
    }

    var me = this;
    this.data.set(computedExpr, this.computed[computedExpr].call({
        data: {
            get: function (expr) {
                // #[begin] error
//                 if (!expr) {
//                     throw new Error('[SAN ERROR] call get method in computed need argument');
//                 }
                // #[end]

                if (!computedDeps[expr]) {
                    computedDeps[expr] = 1;

                    if (me.computed[expr] && !me.computedDeps[expr]) {
                        me._calcComputed(expr);
                    }

                    me.watch(expr, function () {
                        me._calcComputed(computedExpr);
                    });
                }

                return me.data.get(expr);
            }
        }
    }));
};

/**
 * 派发消息
 * 组件可以派发消息，消息将沿着组件树向上传递，直到遇上第一个处理消息的组件
 *
 * @param {string} name 消息名称
 * @param {*?} value 消息值
 */
Component.prototype.dispatch = function (name, value) {
    var parentComponent = this.parentComponent;

    while (parentComponent) {
        var receiver = parentComponent.messages[name] || parentComponent.messages['*'];
        if (typeof receiver === 'function') {
            receiver.call(
                parentComponent,
                {target: this, value: value, name: name}
            );
            break;
        }

        parentComponent = parentComponent.parentComponent;
    }
};

/**
 * 获取组件内部的 slot
 *
 * @param {string=} name slot名称，空为default slot
 * @return {Array}
 */
Component.prototype.slot = function (name) {
    var result = [];
    var me = this;

    function childrenTraversal(children) {
        each(children, function (child) {
            if (child.nodeType === 6 && child.owner === me) {
                if (child.isNamed && child.name === name
                    || !child.isNamed && !name
                ) {
                    result.push(child);
                }
            }
            else {
                childrenTraversal(child.children);
            }
        });
    }

    childrenTraversal(this.children);
    return result;
};

/**
 * 获取带有 san-ref 指令的子组件引用
 *
 * @param {string} name 子组件的引用名
 * @return {Component}
 */
Component.prototype.ref = function (name) {
    var refTarget;
    var owner = this;

    function childrenTraversal(children) {
        each(children, function (child) {
            elementTraversal(child);
            return !refTarget;
        });
    }

    function elementTraversal(element) {
        var nodeType = element.nodeType;
        if (nodeType === 1) {
            return;
        }

        if (element.owner === owner) {
            var ref;
            switch (element.nodeType) {
                case 4:
                    ref = element.aNode.directives.ref;
                    if (ref && evalExpr(ref.value, element.scope, owner) === name) {
                        refTarget = element.el;
                    }
                    break;

                case 5:
                    ref = element.source.directives.ref;
                    if (ref && evalExpr(ref.value, element.scope, owner) === name) {
                        refTarget = element;
                    }
            }

            !refTarget && childrenTraversal(element.slotChildren);
        }

        !refTarget && childrenTraversal(element.children);
    }

    childrenTraversal(this.children);

    return refTarget;
};


/**
 * 视图更新函数
 *
 * @param {Array?} changes 数据变化信息
 */
Component.prototype._update = function (changes) {
    if (this.lifeCycle.disposed) {
        return;
    }

    var me = this;


    var needReloadForSlot = false;
    this._notifyNeedReload = function () {
        needReloadForSlot = true;
    };

    if (changes) {
        this.source && nodeSBindUpdate(
            this,
            this.source.directives.bind,
            changes,
            function (name, value) {
                if (name in me.source.hotspot.props) {
                    return;
                }

                me.data.set(name, value, {
                    target: {
                        node: me.owner
                    }
                });
            }
        );


        each(changes, function (change) {
            var changeExpr = change.expr;

            each(me.binds, function (bindItem) {
                var relation;
                var setExpr = bindItem.name;
                var updateExpr = bindItem.expr;

                if (!isDataChangeByElement(change, me, setExpr)
                    && (relation = changeExprCompare(changeExpr, updateExpr, me.scope))
                ) {
                    if (relation > 2) {
                        setExpr = createAccessor(
                            [
                                {
                                    type: 1,
                                    value: setExpr
                                }
                            ].concat(changeExpr.paths.slice(updateExpr.paths.length))
                        );
                        updateExpr = changeExpr;
                    }

                    if (relation >= 2 && change.type === 2) {
                        me.data.splice(setExpr, [change.index, change.deleteCount].concat(change.insertions), {
                            target: {
                                node: me.owner
                            }
                        });
                    }
                    else {
                        me.data.set(setExpr, evalExpr(updateExpr, me.scope, me.owner), {
                            target: {
                                node: me.owner
                            }
                        });
                    }
                }
            });

            each(me.sourceSlotNameProps, function (bindItem) {
                needReloadForSlot = needReloadForSlot || changeExprCompare(changeExpr, bindItem.expr, me.scope);
                return !needReloadForSlot;
            });
        });

        if (needReloadForSlot) {
            this._initSourceSlots();
            this._repaintChildren();
        }
        else {
            var slotChildrenLen = this.slotChildren.length;
            while (slotChildrenLen--) {
                var slotChild = this.slotChildren[slotChildrenLen];

                if (slotChild.lifeCycle.disposed) {
                    this.slotChildren.splice(slotChildrenLen, 1);
                }
                else if (slotChild.isInserted) {
                    slotChild._update(changes, 1);
                }
            }
        }
    }

    var dataChanges = this._dataChanges;
    if (dataChanges) {
        this._dataChanges = null;

        var ifDirective = this.aNode.directives['if']; // eslint-disable-line dot-notation
        var expectNodeType = (!ifDirective || evalExpr(ifDirective.value, this.data, this)) ? 1 : 8;

        if (this.el.nodeType === expectNodeType) {
            if (expectNodeType === 1) {
                var dynamicProps = this.aNode.hotspot.dynamicProps;
                for (var i = 0; i < dynamicProps.length; i++) {
                    var prop = dynamicProps[i];

                    for (var j = 0; j < dataChanges.length; j++) {
                        var change = dataChanges[j];
                        if (changeExprCompare(change.expr, prop.expr, this.data)
                            || prop.hintExpr && changeExprCompare(change.expr, prop.hintExpr, this.data)
                        ) {
                            prop.handler(this.el, evalExpr(prop.expr, this.data, this), prop.name, this, prop);
                            break;
                        }
                    }
                }

                for (var i = 0; i < this.children.length; i++) {
                    this.children[i]._update(dataChanges);
                }


                if (needReloadForSlot) {
                    this._initSourceSlots();
                    this._repaintChildren();
                }
            }
        }
        else {
            this._repaint(expectNodeType);
        }

        for (var i = 0; i < this.implicitChildren.length; i++) {
            this.implicitChildren[i]._update(dataChanges);
        }

        this._toPhase('updated');

        if (this.owner && this._updateBindxOwner(dataChanges)) {
            this.owner._update();
        }
    }

    this._notifyNeedReload = null;
};

Component.prototype._updateBindxOwner = function (dataChanges) {
    var me = this;
    var xbindUped;

    each(dataChanges, function (change) {
        each(me.binds, function (bindItem) {
            var changeExpr = change.expr;
            if (bindItem.x
                && !isDataChangeByElement(change, me.owner)
                && changeExprCompare(changeExpr, parseExpr(bindItem.name), me.data)
            ) {
                var updateScopeExpr = bindItem.expr;
                if (changeExpr.paths.length > 1) {
                    updateScopeExpr = createAccessor(
                        bindItem.expr.paths.concat(changeExpr.paths.slice(1))
                    );
                }

                xbindUped = 1;
                me.scope.set(
                    updateScopeExpr,
                    evalExpr(changeExpr, me.data, me),
                    {
                        target: {
                            node: me,
                            prop: bindItem.name
                        }
                    }
                );
            }
        });
    });

    return xbindUped;
};

/**
 * 重新绘制组件的内容
 * 当 dynamic slot name 发生变更或 slot 匹配发生变化时，重新绘制
 * 在组件级别重绘有点粗暴，但是能保证视图结果正确性
 */
Component.prototype._repaintChildren = function () {
    if (this.el.nodeType === 1) {
        elementDisposeChildren(this.children, 0, 1);
        this.children = [];

        this.slotChildren = [];

        for (var i = 0, l = this.aNode.children.length; i < l; i++) {
            var child = createNode(this.aNode.children[i], this, this.data, this);
            this.children.push(child);
            child.attach(this.el);
        }
    }
};


/**
 * 组件内部监听数据变化的函数
 *
 * @private
 * @param {Object} change 数据变化信息
 */
Component.prototype._dataChanger = function (change) {
    if (this.lifeCycle.created && this._aftercreated) {
        if (!this._dataChanges) {
            nextTick(this._update, this);
            this._dataChanges = [];
        }

        this._dataChanges.push(change);
    }
    else if (this.lifeCycle.inited && this.owner) {
        this._updateBindxOwner([change]);
    }
};


/**
 * 监听组件的数据变化
 *
 * @param {string} dataName 变化的数据项
 * @param {Function} listener 监听函数
 */
Component.prototype.watch = function (dataName, listener) {
    var dataExpr = parseExpr(dataName);

    this.data.listen(bind(function (change) {
        if (changeExprCompare(change.expr, dataExpr, this.data)) {
            listener.call(this, evalExpr(dataExpr, this.data, this), change);
        }
    }, this));
};


/**
 * 将组件attach到页面
 *
 * @param {HTMLElement} parentEl 要添加到的父元素
 * @param {HTMLElement＝} beforeEl 要添加到哪个元素之前
 */
Component.prototype.attach = function (parentEl, beforeEl) {
    if (!this.lifeCycle.attached) {
        this._attach(parentEl, beforeEl);

        // element 都是内部创建的，只有动态创建的 component 才会进入这个分支
        if (this.owner && !this.parent) {
            this.owner.implicitChildren.push(this);
        }
    }
};

Component.prototype._attach = function (parentEl, beforeEl) {
    var ifDirective = this.aNode.directives['if']; // eslint-disable-line dot-notation

    if (!ifDirective || evalExpr(ifDirective.value, this.data, this)) {
        if (!this.el) {
            var isComponent = this.nodeType === 5;
            var sourceNode = this.aNode.hotspot.sourceNode;
            var props = this.aNode.props;

            if (sourceNode) {
                this.el = sourceNode.cloneNode(false);
                props = this.aNode.hotspot.dynamicProps;
            }
            else {
                this.el = createEl(this.tagName);
            }

            if (this._sbindData) {
                for (var key in this._sbindData) {
                    if (this._sbindData.hasOwnProperty(key)) {
                        getPropHandler(this.tagName, key)(
                            this.el,
                            this._sbindData[key],
                            key,
                            this
                        );
                    }
                }
            }

            for (var i = 0, l = props.length; i < l; i++) {
                var prop = props[i];
                var propName = prop.name;
                var value = isComponent
                    ? evalExpr(prop.expr, this.data, this)
                    : evalExpr(prop.expr, this.scope, this.owner);

                if (value || !baseProps[propName]) {
                    prop.handler(this.el, value, propName, this, prop);
                }
            }

            this._toPhase('created');
        }

        insertBefore(this.el, parentEl, beforeEl);

        if (!this._contentReady) {
            for (var i = 0, l = this.aNode.children.length; i < l; i++) {
                var childANode = this.aNode.children[i];
                var child = childANode.Clazz
                    ? new childANode.Clazz(childANode, this, this.data, this)
                    : createNode(childANode, this, this.data, this);
                this.children.push(child);
                child.attach(this.el);
            }

            this._contentReady = 1;
        }

        this._attached();
    }
    else {
        this.el = document.createComment(this.id);
        this._toPhase('created');
        insertBefore(this.el, parentEl, beforeEl);
    }

    this._toPhase('attached');
};

/**
 * 重新刷新组件视图
 */
Component.prototype._repaint = function () {
    elementDisposeChildren(this.children, 1, 1);
    this.children = [];
    this.slotChildren = [];

    this._contentReady = 0;

    var len = this._elFns.length;
    while (len--) {
        var fn = this._elFns[len];
        un(this.el, fn[0], fn[1], fn[2]);
    }
    this._elFns = [];

    var beforeEl = this.el;
    this.el = null;
    this._attach(beforeEl.parentNode, beforeEl);

    removeEl(beforeEl);
};

Component.prototype.detach = elementOwnDetach;
Component.prototype.dispose = elementOwnDispose;
Component.prototype._onEl = elementOwnOnEl;
Component.prototype._attached = elementOwnAttached;
Component.prototype._leave = function () {
    if (this.leaveDispose) {
        if (!this.lifeCycle.disposed) {
            this.data.unlisten();
            this.dataChanger = null;
            this._dataChanges = null;

            var len = this.implicitChildren.length;
            while (len--) {
                this.implicitChildren[len].dispose(0, 1);
            }

            this.implicitChildren = null;

            this.source = null;
            this.sourceSlots = null;
            this.sourceSlotNameProps = null;

            // 这里不用挨个调用 dispose 了，因为 children 释放链会调用的
            this.slotChildren = null;

            var len = this.children.length;
            while (len--) {
                this.children[len].dispose(1, 1);
            }

            len = this._elFns.length;
            while (len--) {
                var fn = this._elFns[len];
                un(this.el, fn[0], fn[1], fn[2]);
            }
            this._elFns = null;

            // #[begin] allua
            /* istanbul ignore if */
            if (this._inputTimer) {
                clearInterval(this._inputTimer);
                this._inputTimer = null;
            }
            // #[end]

            // 如果没有parent，说明是一个root component，一定要从dom树中remove
            if (!this.disposeNoDetach || !this.parent) {
                removeEl(this.el);
            }

            this._toPhase('detached');

            this.el = null;
            this.owner = null;
            this.scope = null;
            this.children = null;

            this._toPhase('disposed');

            if (this._ondisposed) {
                this._ondisposed();
            }
        }
    }
    else if (this.lifeCycle.attached) {
        removeEl(this.el);
        this._toPhase('detached');
    }
};


// exports = module.exports = Component;


/**
 * Copyright (c) Baidu Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license.
 * See LICENSE file in the project root for license information.
 *
 * @file 创建组件类
 */

// var Component = require('./component');
// var inherits = require('../util/inherits');

/**
 * 创建组件类
 *
 * @param {Object} proto 组件类的方法表
 * @param {Function=} SuperComponent 父组件类
 * @return {Function}
 */
function defineComponent(proto, SuperComponent) {
    // 如果传入一个不是 san component 的 constructor，直接返回不是组件构造函数
    // 这种场景导致的错误 san 不予考虑
    if (typeof proto === 'function') {
        return proto;
    }

    // #[begin] error
//     if (typeof proto !== 'object') {
//         throw new Error('[SAN FATAL] defineComponent need a plain object.');
//     }
    // #[end]

    function ComponentClass(option) { // eslint-disable-line
        Component.call(this, option);
    }

    ComponentClass.prototype = proto;
    inherits(ComponentClass, SuperComponent || Component);

    return ComponentClass;
}

// exports = module.exports = defineComponent;


/**
 * Copyright (c) Baidu Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license.
 * See LICENSE file in the project root for license information.
 *
 * @file 组件Loader类
 */

// var nextTick = require('../util/next-tick');
// var each = require('../util/each');


/**
 * 组件Loader类
 *
 * @class
 *
 * @param {Function} load load方法
 * @param {Function=} placeholder loading过程中渲染的组件
 * @param {Function=} fallback load失败时渲染的组件
 */
function ComponentLoader(load, placeholder, fallback) {
    this.load = load;
    this.placeholder = placeholder;
    this.fallback = fallback;

    this.listeners = [];
}


/**
 * 开始加载组件
 *
 * @param {Function} onload 组件加载完成监听函数
 */
ComponentLoader.prototype.start = function (onload) {
    var me = this;

    switch (this.state) {
        case 2:
            nextTick(function () {
                onload(me.Component);
            });
            break;

        case 1:
            this.listeners.push(onload);
            break;

        default:
            this.listeners.push(onload);
            this.state = 1;

            var startLoad = this.load();
            var done = function (RealComponent) {
                me.done(RealComponent);
            };

            if (startLoad && typeof startLoad.then === 'function') {
                startLoad.then(done, done);
            }
    }
};

/**
 * 完成组件加载
 *
 * @param {Function=} ComponentClass 组件类
 */
ComponentLoader.prototype.done = function (ComponentClass) {
    this.state = 2;
    ComponentClass = ComponentClass || this.fallback;
    this.Component = ComponentClass;

    each(this.listeners, function (listener) {
        listener(ComponentClass);
    });
};

// exports = module.exports = ComponentLoader;


/**
 * Copyright (c) Baidu Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license.
 * See LICENSE file in the project root for license information.
 *
 * @file 编译组件类
 */

// var warn = require('../util/warn');
// var parseTemplate = require('../parser/parse-template');
// var parseText = require('../parser/parse-text');
// var defineComponent = require('./define-component');
// var ComponentLoader = require('./component-loader');


/**
 * 编译组件类。预解析template和components
 *
 * @param {Function} ComponentClass 组件类
 */
function compileComponent(ComponentClass) {
    var proto = ComponentClass.prototype;

    // pre define components class
    /* istanbul ignore else  */
    if (!proto.hasOwnProperty('_cmptReady')) {
        proto.components = ComponentClass.components || proto.components || {};
        var components = proto.components;

        for (var key in components) { // eslint-disable-line
            var componentClass = components[key];

            if (typeof componentClass === 'object' && !(componentClass instanceof ComponentLoader)) {
                components[key] = defineComponent(componentClass);
            }
            else if (componentClass === 'self') {
                components[key] = ComponentClass;
            }
        }

        proto._cmptReady = 1;
    }


    // pre compile template
    /* istanbul ignore else  */
    if (!proto.hasOwnProperty('aNode')) {
        var aNode = parseTemplate(ComponentClass.template || proto.template, {
            trimWhitespace: proto.trimWhitespace || ComponentClass.trimWhitespace,
            delimiters: proto.delimiters || ComponentClass.delimiters
        });

        var firstChild = aNode.children[0];
        if (firstChild && firstChild.textExpr) {
            firstChild = null;
        }

        // #[begin] error
//         if (aNode.children.length !== 1 || !firstChild) {
//             warn('Component template must have a root element.');
//         }
        // #[end]

        proto.aNode = firstChild = firstChild || {
            directives: {},
            props: [],
            events: [],
            children: []
        };

        if (firstChild.tagName === 'template') {
            firstChild.tagName = null;
        }

        if (proto.autoFillStyleAndId !== false && ComponentClass.autoFillStyleAndId !== false) {
            var componentPropExtra = {
                'class': {name: 'class', expr: parseText('{{class | _xclass}}')},
                'style': {name: 'style', expr: parseText('{{style | _xstyle}}')},
                'id': {name: 'id', expr: parseText('{{id}}')}
            };

            var len = firstChild.props.length;
            while (len--) {
                var prop = firstChild.props[len];
                var extra = componentPropExtra[prop.name];

                if (extra) {
                    firstChild.props.splice(len, 1);
                    componentPropExtra[prop.name] = prop;

                    if (prop.name !== 'id') {
                        prop.expr.segs.push(extra.expr.segs[0]);
                        prop.expr.value = null;
                    }
                }
            }

            firstChild.props.push(
                componentPropExtra['class'], // eslint-disable-line dot-notation
                componentPropExtra.style,
                componentPropExtra.id
            );
        }
    }
}

// exports = module.exports = compileComponent;


/**
 * Copyright (c) Baidu Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license.
 * See LICENSE file in the project root for license information.
 *
 * @file 判断是否结束桩
 */

// #[begin] reverse
// /**
//  * 判断是否结束桩
//  *
//  * @param {HTMLElement|HTMLComment} target 要判断的元素
//  * @param {string} type 桩类型
//  * @return {boolean}
//  */
// function isEndStump(target, type) {
//     return target.nodeType === 8 && target.data === '/s-' + type;
// }
// #[end]

// exports = module.exports = isEndStump;


/**
 * Copyright (c) Baidu Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license.
 * See LICENSE file in the project root for license information.
 *
 * @file text 节点类
 */

// var isBrowser = require('../browser/is-browser');
// var removeEl = require('../browser/remove-el');
// var insertBefore = require('../browser/insert-before');
// var changeExprCompare = require('../runtime/change-expr-compare');
// var evalExpr = require('../runtime/eval-expr');
// var NodeType = require('./node-type');
// var warnSetHTML = require('./warn-set-html');
// var isEndStump = require('./is-end-stump');
// var getNodePath = require('./get-node-path');


/**
 * text 节点类
 *
 * @class
 * @param {Object} aNode 抽象节点
 * @param {Node} parent 父亲节点
 * @param {Model} scope 所属数据环境
 * @param {Component} owner 所属组件环境
 * @param {DOMChildrenWalker?} reverseWalker 子元素遍历对象
 */
function TextNode(aNode, parent, scope, owner, reverseWalker) {
    this.aNode = aNode;
    this.owner = owner;
    this.scope = scope;
    this.parent = parent;

    // #[begin] reverse
//     if (reverseWalker) {
//         var currentNode = reverseWalker.current;
//         if (currentNode) {
//             switch (currentNode.nodeType) {
//                 case 8:
//                     if (currentNode.data === 's-text') {
//                         this.sel = currentNode;
//                         currentNode.data = this.id;
//                         reverseWalker.goNext();
// 
//                         while (1) { // eslint-disable-line
//                             currentNode = reverseWalker.current;
//                             /* istanbul ignore if */
//                             if (!currentNode) {
//                                 throw new Error('[SAN REVERSE ERROR] Text end flag not found. \nPaths: '
//                                     + getNodePath(this).join(' > '));
//                             }
// 
//                             if (isEndStump(currentNode, 'text')) {
//                                 this.el = currentNode;
//                                 reverseWalker.goNext();
//                                 currentNode.data = this.id;
//                                 break;
//                             }
// 
//                             reverseWalker.goNext();
//                         }
//                     }
//                     break;
// 
//                 case 3:
//                     reverseWalker.goNext();
//                     if (!this.aNode.textExpr.original) {
//                         this.el = currentNode;
//                     }
//                     break;
//             }
//         }
//         else {
//             this.el = document.createTextNode('');
//             insertBefore(this.el, reverseWalker.target, reverseWalker.current);
//         }
//     }
    // #[end]
}

TextNode.prototype.nodeType = 1;

/**
 * 将text attach到页面
 *
 * @param {HTMLElement} parentEl 要添加到的父元素
 * @param {HTMLElement＝} beforeEl 要添加到哪个元素之前
 */
TextNode.prototype.attach = function (parentEl, beforeEl) {
    this.content = evalExpr(this.aNode.textExpr, this.scope, this.owner);

    if (this.aNode.textExpr.original) {
        this.sel = document.createComment(this.id);
        insertBefore(this.sel, parentEl, beforeEl);

        this.el = document.createComment(this.id);
        insertBefore(this.el, parentEl, beforeEl);

        var tempFlag = document.createElement('script');
        parentEl.insertBefore(tempFlag, this.el);
        tempFlag.insertAdjacentHTML('beforebegin', this.content);
        parentEl.removeChild(tempFlag);
    }
    else {
        this.el = document.createTextNode(this.content);
        insertBefore(this.el, parentEl, beforeEl);
    }
};

/**
 * 销毁 text 节点
 *
 * @param {boolean=} noDetach 是否不要把节点从dom移除
 */
TextNode.prototype.dispose = function (noDetach) {
    if (!noDetach) {
        removeEl(this.el);
        removeEl(this.sel);
    }

    this.el = null;
    this.sel = null;
};

var textUpdateProp = isBrowser
    && (typeof document.createTextNode('').textContent === 'string'
        ? 'textContent'
        : 'data');

/**
 * 更新 text 节点的视图
 *
 * @param {Array} changes 数据变化信息
 */
TextNode.prototype._update = function (changes) {
    if (this.aNode.textExpr.value) {
        return;
    }

    var len = changes.length;
    while (len--) {
        if (changeExprCompare(changes[len].expr, this.aNode.textExpr, this.scope)) {
            var text = evalExpr(this.aNode.textExpr, this.scope, this.owner);

            if (text !== this.content) {
                this.content = text;

                if (this.aNode.textExpr.original) {
                    var startRemoveEl = this.sel.nextSibling;
                    var parentEl = this.el.parentNode;

                    while (startRemoveEl !== this.el) {
                        var removeTarget = startRemoveEl;
                        startRemoveEl = startRemoveEl.nextSibling;
                        removeEl(removeTarget);
                    }

                    // #[begin] error
//                     warnSetHTML(parentEl);
                    // #[end]

                    var tempFlag = document.createElement('script');
                    parentEl.insertBefore(tempFlag, this.el);
                    tempFlag.insertAdjacentHTML('beforebegin', text);
                    parentEl.removeChild(tempFlag);
                }
                else {
                    this.el[textUpdateProp] = text;
                }
            }

            return;
        }
    }
};

// exports = module.exports = TextNode;


/**
 * Copyright (c) Baidu Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license.
 * See LICENSE file in the project root for license information.
 *
 * @file 将没有 root 只有 children 的元素 attach 到页面
 */


// var insertBefore = require('../browser/insert-before');
// var LifeCycle = require('./life-cycle');
// var createNode = require('./create-node');

/**
 * 将没有 root 只有 children 的元素 attach 到页面
 * 主要用于 slot 和 template
 *
 * @param {HTMLElement} parentEl 要添加到的父元素
 * @param {HTMLElement＝} beforeEl 要添加到哪个元素之前
 */
function nodeOwnOnlyChildrenAttach(parentEl, beforeEl) {
    this.sel = document.createComment(this.id);
    insertBefore(this.sel, parentEl, beforeEl);

    for (var i = 0; i < this.aNode.children.length; i++) {
        var child = createNode(
            this.aNode.children[i],
            this,
            this.childScope || this.scope,
            this.childOwner || this.owner
        );
        this.children.push(child);
        child.attach(parentEl, beforeEl);
    }

    this.el = document.createComment(this.id);
    insertBefore(this.el, parentEl, beforeEl);

    this.lifeCycle = LifeCycle.attached;
}

// exports = module.exports = nodeOwnOnlyChildrenAttach;


/**
 * Copyright (c) Baidu Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license.
 * See LICENSE file in the project root for license information.
 *
 * @file slot 节点类
 */

// var each = require('../util/each');
// var guid = require('../util/guid');
// var extend = require('../util/extend');
// var ExprType = require('../parser/expr-type');
// var createAccessor = require('../parser/create-accessor');
// var evalExpr = require('../runtime/eval-expr');
// var Data = require('../runtime/data');
// var DataChangeType = require('../runtime/data-change-type');
// var changeExprCompare = require('../runtime/change-expr-compare');
// var insertBefore = require('../browser/insert-before');
// var removeEl = require('../browser/remove-el');
// var NodeType = require('./node-type');
// var LifeCycle = require('./life-cycle');
// var getANodeProp = require('./get-a-node-prop');
// var nodeSBindInit = require('./node-s-bind-init');
// var nodeSBindUpdate = require('./node-s-bind-update');
// var createReverseNode = require('./create-reverse-node');
// var elementDisposeChildren = require('./element-dispose-children');
// var nodeOwnOnlyChildrenAttach = require('./node-own-only-children-attach');


/**
 * slot 节点类
 *
 * @class
 * @param {Object} aNode 抽象节点
 * @param {Node} parent 父亲节点
 * @param {Model} scope 所属数据环境
 * @param {Component} owner 所属组件环境
 * @param {DOMChildrenWalker?} reverseWalker 子元素遍历对象
 */
function SlotNode(aNode, parent, scope, owner, reverseWalker) {
    this.owner = owner;
    this.scope = scope;
    this.parent = parent;
    this.parentComponent = parent.nodeType === 5
        ? parent
        : parent.parentComponent;

    this.id = guid++;

    this.lifeCycle = LifeCycle.start;
    this.children = [];

    // calc slot name
    this.nameBind = getANodeProp(aNode, 'name');
    if (this.nameBind) {
        this.isNamed = true;
        this.name = evalExpr(this.nameBind.expr, this.scope, this.owner);
    }

    // calc aNode children
    var sourceSlots = owner.sourceSlots;
    var matchedSlots;
    if (sourceSlots) {
        matchedSlots = this.isNamed ? sourceSlots.named[this.name] : sourceSlots.noname;
    }

    if (matchedSlots) {
        this.isInserted = true;
    }

    this.aNode = {
        directives: aNode.directives,
        props: [],
        events: [],
        children: matchedSlots || aNode.children.slice(0),
        vars: aNode.vars
    };

    // calc scoped slot vars
    var initData;
    if (nodeSBindInit(this, aNode.directives.bind)) {
        initData = extend({}, this._sbindData);
    }

    if (aNode.vars) {
        initData = initData || {};
        each(aNode.vars, function (varItem) {
            initData[varItem.name] = evalExpr(varItem.expr, scope, owner);
        });
    }

    // child owner & child scope
    if (this.isInserted) {
        this.childOwner = owner.owner;
        this.childScope = owner.scope;
    }

    if (initData) {
        this.isScoped = true;
        this.childScope = new Data(initData, this.childScope || this.scope);
    }


    owner.slotChildren.push(this);

    // #[begin] reverse
//     if (reverseWalker) {
// 
//         this.sel = document.createComment(this.id);
//         insertBefore(this.sel, reverseWalker.target, reverseWalker.current);
// 
//         var me = this;
//         each(this.aNode.children, function (aNodeChild) {
//             me.children.push(createReverseNode(
//                 aNodeChild,
//                 me,
//                 me.childScope || me.scope,
//                 me.childOwner || me.owner,
//                 reverseWalker
//             ));
//         });
// 
//         this.el = document.createComment(this.id);
//         insertBefore(this.el, reverseWalker.target, reverseWalker.current);
// 
//         this.lifeCycle = LifeCycle.attached;
//     }
    // #[end]
}

SlotNode.prototype.nodeType = 6;

/**
 * 销毁释放 slot
 *
 * @param {boolean=} noDetach 是否不要把节点从dom移除
 * @param {boolean=} noTransition 是否不显示过渡动画效果
 */
SlotNode.prototype.dispose = function (noDetach, noTransition) {
    this.childOwner = null;
    this.childScope = null;

    elementDisposeChildren(this.children, noDetach, noTransition);

    if (!noDetach) {
        removeEl(this.el);
        removeEl(this.sel);
    }

    this.sel = null;
    this.el = null;
    this.owner = null;
    this.scope = null;
    this.children = null;

    this.lifeCycle = LifeCycle.disposed;

    if (this._ondisposed) {
        this._ondisposed();
    }
};

SlotNode.prototype.attach = nodeOwnOnlyChildrenAttach;

/**
 * 视图更新函数
 *
 * @param {Array} changes 数据变化信息
 * @param {boolean=} isFromOuter 变化信息是否来源于父组件之外的组件
 * @return {boolean}
 */
SlotNode.prototype._update = function (changes, isFromOuter) {
    var me = this;

    if (this.nameBind && evalExpr(this.nameBind.expr, this.scope, this.owner) !== this.name) {
        this.owner._notifyNeedReload();
        return false;
    }

    if (isFromOuter) {
        if (this.isInserted) {
            for (var i = 0; i < this.children.length; i++) {
                this.children[i]._update(changes);
            }
        }
    }
    else {
        if (this.isScoped) {
            var varKeys = {};
            each(this.aNode.vars, function (varItem) {
                varKeys[varItem.name] = 1;
                me.childScope.set(varItem.name, evalExpr(varItem.expr, me.scope, me.owner));
            });

            var scopedChanges = [];

            nodeSBindUpdate(
                this,
                this.aNode.directives.bind,
                changes,
                function (name, value) {
                    if (varKeys[name]) {
                        return;
                    }

                    me.childScope.set(name, value);
                    scopedChanges.push({
                        type: 1,
                        expr: createAccessor([
                            {type: 1, value: name}
                        ]),
                        value: value,
                        option: {}
                    });
                }
            );

            each(changes, function (change) {
                if (!me.isInserted) {
                    scopedChanges.push(change);
                }

                each(me.aNode.vars, function (varItem) {
                    var name = varItem.name;
                    var relation = changeExprCompare(change.expr, varItem.expr, me.scope);

                    if (relation < 1) {
                        return;
                    }

                    if (change.type !== 2) {
                        scopedChanges.push({
                            type: 1,
                            expr: createAccessor([
                                {type: 1, value: name}
                            ]),
                            value: me.childScope.get(name),
                            option: change.option
                        });
                    }
                    else if (relation === 2) {
                        scopedChanges.push({
                            expr: createAccessor([
                                {type: 1, value: name}
                            ]),
                            type: 2,
                            index: change.index,
                            deleteCount: change.deleteCount,
                            value: change.value,
                            insertions: change.insertions,
                            option: change.option
                        });
                    }
                });
            });

            for (var i = 0; i < this.children.length; i++) {
                this.children[i]._update(scopedChanges);
            }
        }
        else if (!this.isInserted) {
            for (var i = 0; i < this.children.length; i++) {
                this.children[i]._update(changes);
            }
        }
    }
};

// exports = module.exports = SlotNode;


/**
 * Copyright (c) Baidu Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license.
 * See LICENSE file in the project root for license information.
 *
 * @file for 指令节点类
 */

// var inherits = require('../util/inherits');
// var each = require('../util/each');
// var guid = require('../util/guid');
// var ExprType = require('../parser/expr-type');
// var parseExpr = require('../parser/parse-expr');
// var createAccessor = require('../parser/create-accessor');
// var Data = require('../runtime/data');
// var DataChangeType = require('../runtime/data-change-type');
// var changeExprCompare = require('../runtime/change-expr-compare');
// var evalExpr = require('../runtime/eval-expr');
// var changesIsInDataRef = require('../runtime/changes-is-in-data-ref');
// var insertBefore = require('../browser/insert-before');
// var NodeType = require('./node-type');
// var createNode = require('./create-node');
// var createReverseNode = require('./create-reverse-node');
// var nodeOwnSimpleDispose = require('./node-own-simple-dispose');
// var nodeOwnCreateStump = require('./node-own-create-stump');


/**
 * 循环项的数据容器类
 *
 * @inner
 * @class
 * @param {Object} forElement for元素对象
 * @param {*} item 当前项的数据
 * @param {number} index 当前项的索引
 */
function ForItemData(forElement, item, index) {
    this.parent = forElement.scope;
    this.raw = {};
    this.listeners = [];

    this.directive = forElement.aNode.directives['for']; // eslint-disable-line dot-notation
    this.indexName = this.directive.index || '$index';

    this.raw[this.directive.item] = item;
    this.raw[this.indexName] = index;
}

/**
 * 将数据操作的表达式，转换成为对parent数据操作的表达式
 * 主要是对item和index进行处理
 *
 * @param {Object} expr 表达式
 * @return {Object}
 */
ForItemData.prototype.exprResolve = function (expr) {
    var me = this;
    var directive = this.directive;

    function resolveItem(expr) {
        if (expr.type === 4 && expr.paths[0].value === directive.item) {
            return createAccessor(
                directive.value.paths.concat(
                    {
                        type: 2,
                        value: me.raw[me.indexName]
                    },
                    expr.paths.slice(1)
                )
            );
        }

        return expr;
    }

    expr = resolveItem(expr);

    var resolvedPaths = [];

    each(expr.paths, function (item) {
        resolvedPaths.push(
            item.type === 4 && item.paths[0].value === me.indexName
                ? {
                    type: 2,
                    value: me.raw[me.indexName]
                }
                : resolveItem(item)
        );
    });

    return createAccessor(resolvedPaths);
};

// 代理数据操作方法
inherits(ForItemData, Data);
each(
    ['set', 'remove', 'unshift', 'shift', 'push', 'pop', 'splice'],
    function (method) {
        ForItemData.prototype['_' + method] = Data.prototype[method];

        ForItemData.prototype[method] = function (expr) {
            expr = this.exprResolve(parseExpr(expr));
            this.parent[method].apply(
                this.parent,
                [expr].concat(Array.prototype.slice.call(arguments, 1))
            );
        };
    }
);

/**
 * for 指令节点类
 *
 * @class
 * @param {Object} aNode 抽象节点
 * @param {Node} parent 父亲节点
 * @param {Model} scope 所属数据环境
 * @param {Component} owner 所属组件环境
 * @param {DOMChildrenWalker?} reverseWalker 子元素遍历对象
 */
function ForNode(aNode, parent, scope, owner, reverseWalker) {
    this.aNode = aNode;
    this.owner = owner;
    this.scope = scope;
    this.parent = parent;
    this.parentComponent = parent.nodeType === 5
        ? parent
        : parent.parentComponent;

    this.id = guid++;
    this.children = [];

    this.param = aNode.directives['for']; // eslint-disable-line dot-notation

    this.itemPaths = [
        {
            type: 1,
            value: this.param.item
        }
    ];

    this.itemExpr = {
        type: 4,
        paths: this.itemPaths,
        raw: this.param.item
    };

    if (this.param.index) {
        this.indexExpr = createAccessor([{
            type: 1,
            value: '' + this.param.index
        }]);
    }


    // #[begin] reverse
//     if (reverseWalker) {
//         this.listData = evalExpr(this.param.value, this.scope, this.owner);
//         if (this.listData instanceof Array) {
//             for (var i = 0; i < this.listData.length; i++) {
//                 this.children.push(createReverseNode(
//                     this.aNode.forRinsed,
//                     this,
//                     new ForItemData(this, this.listData[i], i),
//                     this.owner,
//                     reverseWalker
//                 ));
//             }
//         }
//         else if (this.listData && typeof this.listData === 'object') {
//             for (var i in this.listData) {
//                 if (this.listData.hasOwnProperty(i) && this.listData[i] != null) {
//                     this.children.push(createReverseNode(
//                         this.aNode.forRinsed,
//                         this,
//                         new ForItemData(this, this.listData[i], i),
//                         this.owner,
//                         reverseWalker
//                     ));
//                 }
//             }
//         }
// 
//         this._create();
//         insertBefore(this.el, reverseWalker.target, reverseWalker.current);
//     }
    // #[end]
}


ForNode.prototype.nodeType = 3;
ForNode.prototype._create = nodeOwnCreateStump;
ForNode.prototype.dispose = nodeOwnSimpleDispose;

/**
 * 将元素attach到页面的行为
 *
 * @param {HTMLElement} parentEl 要添加到的父元素
 * @param {HTMLElement＝} beforeEl 要添加到哪个元素之前
 */
ForNode.prototype.attach = function (parentEl, beforeEl) {
    this._create();
    insertBefore(this.el, parentEl, beforeEl);
    this.listData = evalExpr(this.param.value, this.scope, this.owner);

    this._createChildren();
};

/**
 * 创建子元素
 */
ForNode.prototype._createChildren = function () {
    var parentEl = this.el.parentNode;
    var listData = this.listData;

    if (listData instanceof Array) {
        for (var i = 0; i < listData.length; i++) {
            var child = createNode(this.aNode.forRinsed, this, new ForItemData(this, listData[i], i), this.owner);
            this.children.push(child);
            child.attach(parentEl, this.el);
        }
    }
    else if (listData && typeof listData === 'object') {
        for (var i in listData) {
            if (listData.hasOwnProperty(i) && listData[i] != null) {
                var child = createNode(this.aNode.forRinsed, this, new ForItemData(this, listData[i], i), this.owner);
                this.children.push(child);
                child.attach(parentEl, this.el);
            }
        }
    }
};

/* eslint-disable fecs-max-statements */

/**
 * 视图更新函数
 *
 * @param {Array} changes 数据变化信息
 */
ForNode.prototype._update = function (changes) {
    var listData = evalExpr(this.param.value, this.scope, this.owner);
    var oldIsArr = this.listData instanceof Array;
    var newIsArr = listData instanceof Array;

    if (this.children.length) {
        if (!listData || newIsArr && listData.length === 0) {
            this._disposeChildren();
            this.listData = listData;
        }
        else if (oldIsArr !== newIsArr || !newIsArr) {
            // 就是这么暴力
            // 不推荐使用for遍历object，用的话自己负责
            this.listData = listData;
            var me = this;
            this._disposeChildren(null, function () {
                me._createChildren();
            });
        }
        else {
            this._updateArray(changes, listData);
            this.listData = listData;
        }
    }
    else {
        this.listData = listData;
        this._createChildren();
    }
};

/**
 * 销毁释放子元素
 *
 * @param {Array?} children 要销毁的子元素，默认为自身的children
 * @param {Function} callback 释放完成的回调函数
 */
ForNode.prototype._disposeChildren = function (children, callback) {
    var parentEl = this.el.parentNode;
    var parentFirstChild = parentEl.firstChild;
    var parentLastChild = parentEl.lastChild;

    var len = this.children.length;

    var violentClear = !this.aNode.directives.transition
        && !children
        // 是否 parent 的唯一 child
        && len && parentFirstChild === this.children[0].el && parentLastChild === this.el
        ;

    if (!children) {
        children = this.children;
        this.children = [];
    }


    var disposedChildCount = 0;
    len = children.length;

    // 调用入口处已保证此处必有需要被删除的 child
    for (var i = 0; i < len; i++) {
        var disposeChild = children[i];

        if (violentClear) {
            disposeChild && disposeChild.dispose(violentClear, violentClear);
        }
        else if (disposeChild) {
            disposeChild._ondisposed = childDisposed;
            disposeChild.dispose();
        }
        else {
            childDisposed();
        }
    }

    if (violentClear) {
        // #[begin] allua
        /* istanbul ignore next */
        if (ie) {
            parentEl.innerHTML = '';
        }
        else {
            // #[end]
            parentEl.textContent = '';
            // #[begin] allua
        }
        // #[end]

        this.el = document.createComment(this.id);
        parentEl.appendChild(this.el);
        callback && callback();
    }

    function childDisposed() {
        disposedChildCount++;
        if (disposedChildCount >= len) {
            callback && callback();
        }
    }
};

ForNode.prototype.opti = typeof navigator !== 'undefined'
    && /chrome\/[0-9]+/i.test(navigator.userAgent);
/**
 * 数组类型的视图更新
 *
 * @param {Array} changes 数据变化信息
 * @param {Array} newList 新数组数据
 */
ForNode.prototype._updateArray = function (changes, newList) {
    var oldChildrenLen = this.children.length;
    var childrenChanges = new Array(oldChildrenLen);

    function pushToChildrenChanges(change) {
        for (var i = 0, l = childrenChanges.length; i < l; i++) {
            (childrenChanges[i] = childrenChanges[i] || []).push(change);
        }
        childrenNeedUpdate = null;
        isOnlyDispose = false;
    }

    var disposeChildren = [];

    // 控制列表是否整体更新的变量
    var isChildrenRebuild;

    //
    var isOnlyDispose = true;

    var childrenNeedUpdate = {};

    var newLen = newList.length;
    var getItemKey = this.aNode.hotspot.getForKey;

    /* eslint-disable no-redeclare */
    for (var cIndex = 0; cIndex < changes.length; cIndex++) {
        var change = changes[cIndex];
        var relation = changeExprCompare(change.expr, this.param.value, this.scope);

        if (!relation) {
            // 无关时，直接传递给子元素更新，列表本身不需要动
            pushToChildrenChanges(change);
        }
        else {
            if (relation > 2) {
                // 变更表达式是list绑定表达式的子项
                // 只需要对相应的子项进行更新
                var changePaths = change.expr.paths;
                var forLen = this.param.value.paths.length;
                var changeIndex = +evalExpr(changePaths[forLen], this.scope, this.owner);

                if (isNaN(changeIndex)) {
                    pushToChildrenChanges(change);
                }
                else if (!isChildrenRebuild) {
                    isOnlyDispose = false;
                    childrenNeedUpdate && (childrenNeedUpdate[changeIndex] = 1);

                    childrenChanges[changeIndex] = childrenChanges[changeIndex] || [];
                    if (this.param.index) {
                        childrenChanges[changeIndex].push(change);
                    }

                    change = change.type === 1
                        ? {
                            type: change.type,
                            expr: createAccessor(
                                this.itemPaths.concat(changePaths.slice(forLen + 1))
                            ),
                            value: change.value,
                            option: change.option
                        }
                        : {
                            index: change.index,
                            deleteCount: change.deleteCount,
                            insertions: change.insertions,
                            type: change.type,
                            expr: createAccessor(
                                this.itemPaths.concat(changePaths.slice(forLen + 1))
                            ),
                            value: change.value,
                            option: change.option
                        };


                    childrenChanges[changeIndex].push(change);

                    if (change.type === 1) {
                        if (this.children[changeIndex]) {
                            this.children[changeIndex].scope._set(
                                change.expr,
                                change.value,
                                {
                                    silent: 1
                                }
                            );
                        }
                        else {
                            // 设置数组项的索引可能超出数组长度，此时需要新增
                            // 比如当前数组只有2项，但是set list[4]
                            this.children[changeIndex] = 0;
                        }
                    }
                    else if (this.children[changeIndex]) {
                        this.children[changeIndex].scope._splice(
                            change.expr,
                            [].concat(change.index, change.deleteCount, change.insertions),
                            {
                                silent: 1
                            }
                        );
                    }
                }
            }
            else if (isChildrenRebuild) {
                continue;
            }
            else if (relation === 2 && change.type === 2
                && (this.owner.updateMode !== 'optimized' || !this.opti || this.aNode.directives.transition)
            ) {
                childrenNeedUpdate = null;

                // 变更表达式是list绑定表达式本身数组的splice操作
                // 此时需要删除部分项，创建部分项
                var changeStart = change.index;
                var deleteCount = change.deleteCount;
                var insertionsLen = change.insertions.length;
                var newCount = insertionsLen - deleteCount;

                if (newCount) {
                    var indexChange = this.param.index
                        ? {
                            type: 1,
                            option: change.option,
                            expr: this.indexExpr
                        }
                        : null;

                    for (var i = changeStart + deleteCount; i < this.children.length; i++) {
                        if (indexChange) {
                            isOnlyDispose = false;
                            (childrenChanges[i] = childrenChanges[i] || []).push(indexChange);
                        }

                        var child = this.children[i];
                        if (child) {
                            child.scope.raw[child.scope.indexName] = i - deleteCount + insertionsLen;
                        }
                    }
                }

                var deleteLen = deleteCount;
                while (deleteLen--) {
                    if (deleteLen < insertionsLen) {
                        isOnlyDispose = false;
                        var i = changeStart + deleteLen;
                        // update
                        (childrenChanges[i] = childrenChanges[i] || []).push({
                            type: 1,
                            option: change.option,
                            expr: this.itemExpr,
                            value: change.insertions[deleteLen]
                        });
                        if (this.children[i]) {
                            this.children[i].scope.raw[this.param.item] = change.insertions[deleteLen];
                        }
                    }
                }

                if (newCount < 0) {
                    disposeChildren = disposeChildren.concat(
                        this.children.splice(changeStart + insertionsLen, -newCount)
                    );
                    childrenChanges.splice(changeStart + insertionsLen, -newCount);
                }
                else if (newCount > 0) {
                    isOnlyDispose = false;
                    var spliceArgs = [changeStart + deleteCount, 0].concat(new Array(newCount));
                    this.children.splice.apply(this.children, spliceArgs);
                    childrenChanges.splice.apply(childrenChanges, spliceArgs);
                }
            }
            else {
                childrenNeedUpdate = null;
                isOnlyDispose = false;

                isChildrenRebuild = 1;

                // 变更表达式是list绑定表达式本身或母项的重新设值
                // 此时需要更新整个列表

                if (getItemKey && newLen && oldChildrenLen) {
                    // 如果设置了trackBy，用lis更新。开始 ====
                    var newListKeys = [];
                    var oldListKeys = [];
                    var newListKeysMap = {};
                    var oldListInNew = [];
                    var oldListKeyIndex = {};

                    for (var i = 0; i < newList.length; i++) {
                        var itemKey = getItemKey(newList[i]);
                        newListKeys.push(itemKey);
                        newListKeysMap[itemKey] = i;
                    };

                    for (var i = 0; i < this.listData.length; i++) {
                        var itemKey = getItemKey(this.listData[i]);

                        oldListKeys.push(itemKey);
                        oldListKeyIndex[itemKey] = i;

                        if (newListKeysMap[itemKey] != null) {
                            oldListInNew[i] = newListKeysMap[itemKey];
                        }
                        else {
                            oldListInNew[i] = -1;
                            disposeChildren.push(this.children[i]);
                        }
                    };

                    var newIndexStart = 0;
                    var newIndexEnd = newLen;
                    var oldIndexStart = 0;
                    var oldIndexEnd = oldChildrenLen;

                    while (newIndexStart < newLen
                        && oldIndexStart < oldChildrenLen
                        && newListKeys[newIndexStart] === oldListKeys[oldIndexStart]
                    ) {
                        if (this.listData[oldIndexStart] !== newList[newIndexStart]) {
                            this.children[oldIndexStart].scope.raw[this.param.item] = newList[newIndexStart];
                            (childrenChanges[oldIndexStart] = childrenChanges[oldIndexStart] || []).push({
                                type: 1,
                                option: change.option,
                                expr: this.itemExpr,
                                value: newList[newIndexStart]
                            });
                        }

                        // 对list更上级数据的直接设置
                        if (relation < 2) {
                            (childrenChanges[oldIndexStart] = childrenChanges[oldIndexStart] || []).push(change);
                        }

                        newIndexStart++;
                        oldIndexStart++;
                    }

                    while (newIndexEnd > newIndexStart && oldIndexEnd > oldIndexStart
                        && newListKeys[newIndexEnd - 1] === oldListKeys[oldIndexEnd - 1]
                    ) {
                        newIndexEnd--;
                        oldIndexEnd--;

                        if (this.listData[oldIndexEnd] !== newList[newIndexEnd]) {
                            this.children[oldIndexEnd].scope.raw[this.param.item] = newList[newIndexEnd];
                            (childrenChanges[oldIndexEnd] = childrenChanges[oldIndexEnd] || []).push({
                                type: 1,
                                option: change.option,
                                expr: this.itemExpr,
                                value: newList[newIndexEnd]
                            });
                        }

                        // 对list更上级数据的直接设置
                        if (relation < 2) {
                            (childrenChanges[oldIndexEnd] = childrenChanges[oldIndexEnd] || []).push(change);
                        }
                    }

                    var oldListLIS = [];
                    var lisIdx = [];
                    var lisPos = -1;
                    var lisSource = oldListInNew.slice(oldIndexStart, oldIndexEnd);
                    var len = oldIndexEnd - oldIndexStart;
                    var preIdx = new Array(len);

                    for (var i = 0; i < len; i++) {
                        var oldItemInNew = lisSource[i];
                        if (oldItemInNew === -1) {
                            continue;
                        }

                        var rePos = -1;
                        var rePosEnd = oldListLIS.length;

                        if (rePosEnd > 0 && oldListLIS[rePosEnd - 1] <= oldItemInNew) {
                            rePos = rePosEnd - 1;
                        }
                        else {
                            while (rePosEnd - rePos > 1) {
                                var mid = Math.floor((rePos + rePosEnd) / 2);
                                if (oldListLIS[mid] > oldItemInNew) {
                                    rePosEnd = mid;
                                } else {
                                    rePos = mid;
                                }
                            }
                        }

                        if (rePos !== -1) {
                            preIdx[i] = lisIdx[rePos];
                        }

                        if (rePos === lisPos) {
                            lisPos++;
                            oldListLIS[lisPos] = oldItemInNew;
                            lisIdx[lisPos] = i;
                        } else if (oldItemInNew < oldListLIS[rePos + 1]) {
                            oldListLIS[rePos + 1] = oldItemInNew;
                            lisIdx[rePos + 1] = i;
                        }
                    }

                    for (var i = lisIdx[lisPos]; lisPos >= 0; i = preIdx[i], lisPos--) {
                        oldListLIS[lisPos] = i;
                    }

                    var oldListLISPos = oldListLIS.length;
                    var staticPos = oldListLISPos ? oldListInNew[oldListLIS[--oldListLISPos] + oldIndexStart] : -1;

                    var newChildren = [];
                    var newChildrenChanges = [];

                    for (var i = newLen - 1; i >= 0; i--) {
                        if (i >= newIndexEnd) {
                            newChildren[i] = this.children[oldChildrenLen - newLen + i];
                            newChildrenChanges[i] = childrenChanges[oldChildrenLen - newLen + i];
                        }
                        else if (i < newIndexStart) {
                            newChildren[i] = this.children[i];
                            newChildrenChanges[i] = childrenChanges[i];
                        }
                        else {
                            var oldListIndex = oldListKeyIndex[newListKeys[i]];

                            if (i === staticPos) {
                                // 如果数据本身引用发生变化，设置变更
                                if (this.listData[oldListIndex] !== newList[i]) {
                                    this.children[oldListIndex].scope.raw[this.param.item] = newList[i];
                                    (childrenChanges[oldListIndex] = childrenChanges[oldListIndex] || []).push({
                                        type: 1,
                                        option: change.option,
                                        expr: this.itemExpr,
                                        value: newList[i]
                                    });
                                }

                                // 对list更上级数据的直接设置
                                if (relation < 2) {
                                    (childrenChanges[oldListIndex] = childrenChanges[oldListIndex] || []).push(change);
                                }

                                newChildren[i] = this.children[oldListIndex];
                                newChildrenChanges[i] = childrenChanges[oldListIndex];

                                staticPos = oldListLISPos ? oldListInNew[oldListLIS[--oldListLISPos] + oldIndexStart] : -1;
                            }
                            else {
                                if (oldListIndex) {
                                    disposeChildren.push(this.children[oldListIndex]);
                                }

                                newChildren[i] = 0;
                                newChildrenChanges[i] = 0;
                            }

                        }
                    }

                    this.children = newChildren;
                    childrenChanges = newChildrenChanges;
                    // 如果设置了trackBy，用lis更新。结束 ====
                }
                else {
                    // 老的比新的多的部分，标记需要dispose
                    if (oldChildrenLen > newLen) {
                        disposeChildren = disposeChildren.concat(this.children.slice(newLen));
                        childrenChanges = childrenChanges.slice(0, newLen);
                        this.children = this.children.slice(0, newLen);
                    }

                    // 剩下的部分整项变更
                    for (var i = 0; i < newLen; i++) {
                        // 对list更上级数据的直接设置
                        if (relation < 2) {
                            (childrenChanges[i] = childrenChanges[i] || []).push(change);
                        }

                        if (this.children[i]) {
                            if (this.children[i].scope.raw[this.param.item] !== newList[i]) {
                                this.children[i].scope.raw[this.param.item] = newList[i];
                                (childrenChanges[i] = childrenChanges[i] || []).push({
                                    type: 1,
                                    option: change.option,
                                    expr: this.itemExpr,
                                    value: newList[i]
                                });
                            }
                        }
                        else {
                            this.children[i] = 0;
                        }
                    }
                }
            }
        }

    }

    // 标记 length 是否发生变化
    if (newLen !== oldChildrenLen && this.param.value.paths) {
        var lengthChange = {
            type: 1,
            option: {},
            expr: createAccessor(
                this.param.value.paths.concat({
                    type: 1,
                    value: 'length'
                })
            )
        };

        if (changesIsInDataRef([lengthChange], this.aNode.hotspot.data)) {
            pushToChildrenChanges(lengthChange);
        }
    }

    // 执行视图更新，先删再刷新
    this._doCreateAndUpdate = doCreateAndUpdate;

    var me = this;
    if (disposeChildren.length === 0) {
        doCreateAndUpdate();
    }
    else {
        this._disposeChildren(disposeChildren, function () {
            if (doCreateAndUpdate === me._doCreateAndUpdate) {
                doCreateAndUpdate();
            }
        });
    }

    function doCreateAndUpdate() {
        me._doCreateAndUpdate = null;

        if (isOnlyDispose) {
            return;
        }

        var beforeEl = me.el;
        var parentEl = beforeEl.parentNode;

        // 对相应的项进行更新
        // 如果不attached则直接创建，如果存在则调用更新函数
        var j = -1;
        for (var i = 0; i < newLen; i++) {
            var child = me.children[i];

            if (child) {
                if (childrenChanges[i] && (!childrenNeedUpdate || childrenNeedUpdate[i])) {
                    child._update(childrenChanges[i]);
                }
            }
            else {
                if (j < i) {
                    j = i + 1;
                    beforeEl = null;
                    while (j < newLen) {
                        var nextChild = me.children[j];
                        if (nextChild) {
                            beforeEl = nextChild.sel || nextChild.el;
                            break;
                        }
                        j++;
                    }
                }

                me.children[i] = createNode(me.aNode.forRinsed, me, new ForItemData(me, newList[i], i), me.owner);
                me.children[i].attach(parentEl, beforeEl || me.el);
            }
        }
    }
};

// exports = module.exports = ForNode;


/**
 * Copyright (c) Baidu Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license.
 * See LICENSE file in the project root for license information.
 *
 * @file if 指令节点类
 */

// var each = require('../util/each');
// var guid = require('../util/guid');
// var insertBefore = require('../browser/insert-before');
// var evalExpr = require('../runtime/eval-expr');
// var NodeType = require('./node-type');
// var createNode = require('./create-node');
// var createReverseNode = require('./create-reverse-node');
// var nodeOwnCreateStump = require('./node-own-create-stump');
// var nodeOwnSimpleDispose = require('./node-own-simple-dispose');

/**
 * if 指令节点类
 *
 * @class
 * @param {Object} aNode 抽象节点
 * @param {Node} parent 父亲节点
 * @param {Model} scope 所属数据环境
 * @param {Component} owner 所属组件环境
 * @param {DOMChildrenWalker?} reverseWalker 子元素遍历对象
 */
function IfNode(aNode, parent, scope, owner, reverseWalker) {
    this.aNode = aNode;
    this.owner = owner;
    this.scope = scope;
    this.parent = parent;
    this.parentComponent = parent.nodeType === 5
        ? parent
        : parent.parentComponent;

    this.id = guid++;
    this.children = [];

    // #[begin] reverse
//     if (reverseWalker) {
//         if (evalExpr(this.aNode.directives['if'].value, this.scope, this.owner)) { // eslint-disable-line dot-notation
//             this.elseIndex = -1;
//             this.children[0] = createReverseNode(
//                 this.aNode.ifRinsed,
//                 this,
//                 this.scope,
//                 this.owner,
//                 reverseWalker
//             );
//         }
//         else {
//             var me = this;
//             each(aNode.elses, function (elseANode, index) {
//                 var elif = elseANode.directives.elif;
// 
//                 if (!elif || elif && evalExpr(elif.value, me.scope, me.owner)) {
//                     me.elseIndex = index;
//                     me.children[0] = createReverseNode(
//                         elseANode,
//                         me,
//                         me.scope,
//                         me.owner,
//                         reverseWalker
//                     );
//                     return false;
//                 }
//             });
//         }
// 
//         this._create();
//         insertBefore(this.el, reverseWalker.target, reverseWalker.current);
//     }
    // #[end]
}

IfNode.prototype.nodeType = 2;

IfNode.prototype._create = nodeOwnCreateStump;
IfNode.prototype.dispose = nodeOwnSimpleDispose;

/**
 * attach到页面
 *
 * @param {HTMLElement} parentEl 要添加到的父元素
 * @param {HTMLElement＝} beforeEl 要添加到哪个元素之前
 */
IfNode.prototype.attach = function (parentEl, beforeEl) {
    var me = this;
    var elseIndex;
    var child;

    if (evalExpr(this.aNode.directives['if'].value, this.scope, this.owner)) { // eslint-disable-line dot-notation
        child = createNode(this.aNode.ifRinsed, this, this.scope, this.owner);
        elseIndex = -1;
    }
    else {
        each(this.aNode.elses, function (elseANode, index) {
            var elif = elseANode.directives.elif;

            if (!elif || elif && evalExpr(elif.value, me.scope, me.owner)) {
                child = createNode(elseANode, me, me.scope, me.owner);
                elseIndex = index;
                return false;
            }
        });
    }

    if (child) {
        this.children[0] = child;
        child.attach(parentEl, beforeEl);
        this.elseIndex = elseIndex;
    }


    this._create();
    insertBefore(this.el, parentEl, beforeEl);
};


/**
 * 视图更新函数
 *
 * @param {Array} changes 数据变化信息
 */
IfNode.prototype._update = function (changes) {
    var me = this;
    var childANode = this.aNode.ifRinsed;
    var elseIndex;

    if (evalExpr(this.aNode.directives['if'].value, this.scope, this.owner)) { // eslint-disable-line dot-notation
        elseIndex = -1;
    }
    else {
        each(this.aNode.elses, function (elseANode, index) {
            var elif = elseANode.directives.elif;

            if (elif && evalExpr(elif.value, me.scope, me.owner) || !elif) {
                elseIndex = index;
                childANode = elseANode;
                return false;
            }
        });
    }

    var child = this.children[0];
    if (elseIndex === this.elseIndex) {
        child && child._update(changes);
    }
    else {
        this.children = [];
        if (child) {
            child._ondisposed = newChild;
            child.dispose();
        }
        else {
            newChild();
        }

        this.elseIndex = elseIndex;
    }

    function newChild() {
        if (typeof elseIndex !== 'undefined') {
            (me.children[0] = createNode(childANode, me, me.scope, me.owner))
                .attach(me.el.parentNode, me.el);
        }
    }
};

// exports = module.exports = IfNode;


/**
 * Copyright (c) Baidu Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license.
 * See LICENSE file in the project root for license information.
 *
 * @file template 节点类
 */

// var each = require('../util/each');
// var guid = require('../util/guid');
// var insertBefore = require('../browser/insert-before');
// var removeEl = require('../browser/remove-el');
// var NodeType = require('./node-type');
// var LifeCycle = require('./life-cycle');
// var createReverseNode = require('./create-reverse-node');
// var elementDisposeChildren = require('./element-dispose-children');
// var nodeOwnOnlyChildrenAttach = require('./node-own-only-children-attach');

/**
 * template 节点类
 *
 * @class
 * @param {Object} aNode 抽象节点
 * @param {Node} parent 父亲节点
 * @param {Model} scope 所属数据环境
 * @param {Component} owner 所属组件环境
 * @param {DOMChildrenWalker?} reverseWalker 子元素遍历对象
 */
function TemplateNode(aNode, parent, scope, owner, reverseWalker) {
    this.aNode = aNode;
    this.owner = owner;
    this.scope = scope;
    this.parent = parent;
    this.parentComponent = parent.nodeType === 5
        ? parent
        : parent.parentComponent;

    this.id = guid++;
    this.lifeCycle = LifeCycle.start;
    this.children = [];

    // #[begin] reverse
//     if (reverseWalker) {
//         this.sel = document.createComment(this.id);
//         insertBefore(this.sel, reverseWalker.target, reverseWalker.current);
// 
//         var me = this;
//         each(this.aNode.children, function (aNodeChild) {
//             me.children.push(createReverseNode(aNodeChild, me, me.scope, me.owner, reverseWalker));
//         });
// 
//         this.el = document.createComment(this.id);
//         insertBefore(this.el, reverseWalker.target, reverseWalker.current);
// 
//         this.lifeCycle = LifeCycle.attached;
//     }
    // #[end]
}



TemplateNode.prototype.nodeType = 7;

TemplateNode.prototype.attach = nodeOwnOnlyChildrenAttach;

/**
 * 销毁释放
 *
 * @param {boolean=} noDetach 是否不要把节点从dom移除
 * @param {boolean=} noTransition 是否不显示过渡动画效果
 */
TemplateNode.prototype.dispose = function (noDetach, noTransition) {
    elementDisposeChildren(this.children, noDetach, noTransition);

    if (!noDetach) {
        removeEl(this.el);
        removeEl(this.sel);
    }

    this.sel = null;
    this.el = null;
    this.owner = null;
    this.scope = null;
    this.children = null;

    this.lifeCycle = LifeCycle.disposed;

    if (this._ondisposed) {
        this._ondisposed();
    }
};

/**
 * 视图更新函数
 *
 * @param {Array} changes 数据变化信息
 */
TemplateNode.prototype._update = function (changes) {
    for (var i = 0; i < this.children.length; i++) {
        this.children[i]._update(changes);
    }
};

// exports = module.exports = TemplateNode;


/**
 * Copyright (c) Baidu Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license.
 * See LICENSE file in the project root for license information.
 *
 * @file ANode预热
 */

// var ExprType = require('../parser/expr-type');
// var each = require('../util/each');
// var extend = require('../util/extend');
// var createEl = require('../browser/create-el');
// var getPropHandler = require('./get-prop-handler');
// var getANodeProp = require('./get-a-node-prop');
// var isBrowser = require('../browser/is-browser');
// var TextNode = require('./text-node');
// var SlotNode = require('./slot-node');
// var ForNode = require('./for-node');
// var IfNode = require('./if-node');
// var TemplateNode = require('./template-node');

/**
 * ANode预热，分析的数据引用等信息
 *
 * @param {Object} aNode 要预热的ANode
 */
function preheatANode(aNode) {
    var stack = [];

    function recordHotspotData(expr, notContentData) {
        var refs = analyseExprDataHotspot(expr);

        if (refs.length) {
            for (var i = 0, len = stack.length; i < len; i++) {
                if (!notContentData || i !== len - 1) {
                    var data = stack[i].hotspot.data;
                    if (!data) {
                        data = stack[i].hotspot.data = {};
                    }

                    each(refs, function (ref) {
                        data[ref] = 1;
                    });
                }
            }
        }
    }


    function analyseANodeHotspot(aNode) {
        if (!aNode.hotspot) {
            stack.push(aNode);


            if (aNode.textExpr) {
                aNode.hotspot = {};
                aNode.Clazz = TextNode;
                recordHotspotData(aNode.textExpr);
            }
            else {
                var sourceNode;
                if (isBrowser && aNode.tagName
                    && aNode.tagName.indexOf('-') < 0
                    && !/^(template|slot|select|input|option|button|video|audio|canvas|img|embed|object|iframe)$/i.test(aNode.tagName)
                ) {
                    sourceNode = createEl(aNode.tagName);
                }

                aNode.hotspot = {
                    dynamicProps: [],
                    xProps: [],
                    props: {},
                    sourceNode: sourceNode
                };


                // === analyse hotspot data: start
                each(aNode.vars, function (varItem) {
                    recordHotspotData(varItem.expr);
                });

                each(aNode.props, function (prop) {
                    recordHotspotData(prop.expr);
                });

                for (var key in aNode.directives) {
                    /* istanbul ignore else  */
                    if (aNode.directives.hasOwnProperty(key)) {
                        var directive = aNode.directives[key];
                        recordHotspotData(
                            directive.value,
                            !/^(html|bind)$/.test(key)
                        );

                        // init trackBy getKey function
                        if (key === 'for') {
                            var trackBy = directive.trackBy;
                            if (trackBy
                                && trackBy.type === 4
                                && trackBy.paths[0].value === directive.item
                            ) {
                                aNode.hotspot.getForKey = new Function(
                                    directive.item,
                                    'return ' + trackBy.raw
                                );
                            }
                        }
                    }
                }

                each(aNode.elses, function (child) {
                    analyseANodeHotspot(child);
                });

                each(aNode.children, function (child) {
                    analyseANodeHotspot(child);
                });
                // === analyse hotspot data: end


                // === analyse hotspot props: start
                each(aNode.props, function (prop, index) {
                    aNode.hotspot.props[prop.name] = index;
                    prop.handler = getPropHandler(aNode.tagName, prop.name);

                    if (prop.name === 'id') {
                        prop.id = true;
                        aNode.hotspot.idProp = prop;
                        aNode.hotspot.dynamicProps.push(prop);
                    }
                    else if (prop.expr.value != null) {
                        if (sourceNode) {
                            prop.handler(sourceNode, prop.expr.value, prop.name, aNode);
                        }
                    }
                    else {
                        if (prop.x) {
                            aNode.hotspot.xProps.push(prop);
                        }
                        aNode.hotspot.dynamicProps.push(prop);
                    }
                });

                // ie 下，如果 option 没有 value 属性，select.value = xx 操作不会选中 option
                // 所以没有设置 value 时，默认把 option 的内容作为 value
                if (aNode.tagName === 'option'
                    && !getANodeProp(aNode, 'value')
                    && aNode.children[0]
                ) {
                    var valueProp = {
                        name: 'value',
                        expr: aNode.children[0].textExpr,
                        handler: getPropHandler(aNode.tagName, 'value')
                    };
                    aNode.props.push(valueProp);
                    aNode.hotspot.dynamicProps.push(valueProp);
                    aNode.hotspot.props.value = aNode.props.length - 1;
                }

                if (aNode.directives['if']) { // eslint-disable-line dot-notation
                    aNode.ifRinsed = {
                        children: aNode.children,
                        props: aNode.props,
                        events: aNode.events,
                        tagName: aNode.tagName,
                        vars: aNode.vars,
                        hotspot: aNode.hotspot,
                        directives: extend({}, aNode.directives)
                    };
                    aNode.Clazz = IfNode;
                    aNode = aNode.ifRinsed;
                    aNode.directives['if'] = null; // eslint-disable-line dot-notation
                }

                if (aNode.directives['for']) { // eslint-disable-line dot-notation
                    aNode.forRinsed = {
                        children: aNode.children,
                        props: aNode.props,
                        events: aNode.events,
                        tagName: aNode.tagName,
                        vars: aNode.vars,
                        hotspot: aNode.hotspot,
                        directives: extend({}, aNode.directives)
                    };
                    aNode.Clazz = ForNode;
                    aNode.forRinsed.directives['for'] = null; // eslint-disable-line dot-notation
                    aNode = aNode.forRinsed;
                }

                switch (aNode.tagName) {
                    case 'slot':
                        aNode.Clazz = SlotNode;
                        break;

                    case 'template':
                        aNode.Clazz = TemplateNode;
                }
                // === analyse hotspot props: end
            }

            stack.pop();
        }
    }

    if (aNode) {
        analyseANodeHotspot(aNode);
    }
}

/**
 * 分析表达式的数据引用
 *
 * @param {Object} expr 要分析的表达式
 * @return {Array}
 */
function analyseExprDataHotspot(expr, accessorMeanDynamic) {
    var refs = [];
    var isDynamic;

    function analyseExprs(exprs, accessorMeanDynamic) {
        for (var i = 0, l = exprs.length; i < l; i++) {
            refs = refs.concat(analyseExprDataHotspot(exprs[i], accessorMeanDynamic));
            isDynamic = isDynamic || exprs[i].dynamic;
        }
    }

    switch (expr.type) {
        case 4:
            isDynamic = accessorMeanDynamic;

            var paths = expr.paths;
            refs.push(paths[0].value);

            if (paths.length > 1) {
                refs.push(paths[0].value + '.' + (paths[1].value || '*'));
            }

            analyseExprs(paths.slice(1), 1);
            break;

        case 9:
            refs = analyseExprDataHotspot(expr.expr, accessorMeanDynamic);
            isDynamic = expr.expr.dynamic;
            break;

        case 7:
        case 8:
        case 10:
            analyseExprs(expr.segs, accessorMeanDynamic);
            break;

        case 5:
            refs = analyseExprDataHotspot(expr.expr);
            isDynamic = expr.expr.dynamic;

            each(expr.filters, function (filter) {
                analyseExprs(filter.name.paths);
                analyseExprs(filter.args);
            });

            break;

        case 12:
        case 11:
            for (var i = 0; i < expr.items.length; i++) {
                refs = refs.concat(analyseExprDataHotspot(expr.items[i].expr));
                isDynamic = isDynamic || expr.items[i].expr.dynamic;
            }
            break;
    }

    isDynamic && (expr.dynamic = true);
    return refs;
}

// exports = module.exports = preheatANode;


/**
 * Copyright (c) Baidu Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license.
 * See LICENSE file in the project root for license information.
 *
 * @file 将 binds 的 name 从 kebabcase 转换成 camelcase
 */

// var kebab2camel = require('../util/kebab2camel');
// var each = require('../util/each');

/**
 * 将 binds 的 name 从 kebabcase 转换成 camelcase
 *
 * @param {Array} binds binds集合
 * @return {Array}
 */
function camelComponentBinds(binds) {
    var result = [];
    each(binds, function (bind) {
        result.push({
            name: kebab2camel(bind.name),
            expr: bind.expr,
            x: bind.x,
            raw: bind.raw
        });
    });

    return result;
}

// exports = module.exports = camelComponentBinds;


/**
 * Copyright (c) Baidu Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license.
 * See LICENSE file in the project root for license information.
 *
 * @file 创建组件Loader
 */

// var ComponentLoader = require('./component-loader');

/**
 * 创建组件Loader
 *
 * @param {Object|Function} options 创建组件Loader的参数。为Object时参考下方描述，为Function时代表load方法。
 * @param {Function} options.load load方法
 * @param {Function=} options.placeholder loading过程中渲染的占位组件
 * @param {Function=} options.fallback load失败时渲染的组件
 * @return {ComponentLoader}
 */
function createComponentLoader(options) {
    var placeholder = options.placeholder;
    var fallback = options.fallback;
    var load = typeof options === 'function' ? options : options.load;

    return new ComponentLoader(load, placeholder, fallback);
}

// exports = module.exports = createComponentLoader;


/**
 * Copyright (c) Baidu Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license.
 * See LICENSE file in the project root for license information.
 *
 * @file 编译源码的 helper 方法集合
 */

// var each = require('../util/each');
// var ExprType = require('../parser/expr-type');

// #[begin] ssr
// 
// /**
//  * 编译源码的 helper 方法集合对象
//  */
// var compileExprSource = {
// 
//     /**
//      * 字符串字面化
//      *
//      * @param {string} source 需要字面化的字符串
//      * @return {string} 字符串字面化结果
//      */
//     stringLiteralize: function (source) {
//         return '"'
//             + source
//                 .replace(/\x5C/g, '\\\\')
//                 .replace(/"/g, '\\"')
//                 .replace(/\x0A/g, '\\n')
//                 .replace(/\x09/g, '\\t')
//                 .replace(/\x0D/g, '\\r')
//                 // .replace( /\x08/g, '\\b' )
//                 // .replace( /\x0C/g, '\\f' )
//             + '"';
//     },
// 
//     /**
//      * 生成数据访问表达式代码
//      *
//      * @param {Object?} accessorExpr accessor表达式对象
//      * @return {string}
//      */
//     dataAccess: function (accessorExpr) {
//         var code = 'componentCtx.data';
//         if (accessorExpr) {
//             each(accessorExpr.paths, function (path) {
//                 if (path.type === 4) {
//                     code += '[' + compileExprSource.dataAccess(path) + ']';
//                     return;
//                 }
// 
//                 switch (typeof path.value) {
//                     case 'string':
//                         code += '.' + path.value;
//                         break;
// 
//                     case 'number':
//                         code += '[' + path.value + ']';
//                         break;
//                 }
//             });
//         }
// 
//         return code;
//     },
// 
//     /**
//      * 生成调用表达式代码
//      *
//      * @param {Object?} callExpr 调用表达式对象
//      * @return {string}
//      */
//     callExpr: function (callExpr) {
//         var paths = callExpr.name.paths;
//         var code = 'componentCtx.proto.' + paths[0].value;
// 
//         for (var i = 1; i < paths.length; i++) {
//             var path = paths[i];
// 
//             switch (path.type) {
//                 case 1:
//                     code += '.' + path.value;
//                     break;
// 
//                 case 2:
//                     code += '[' + path.value + ']';
//                     break;
// 
//                 default:
//                     code += '[' + compileExprSource.expr(path) + ']';
//             }
//         }
// 
//         code += '(';
//         each(callExpr.args, function (arg, index) {
//             code += (index > 0 ? ', ' : '') + compileExprSource.expr(arg);
//         });
//         code += ')';
// 
//         return code;
//     },
// 
//     /**
//      * 生成插值代码
//      *
//      * @param {Object} interpExpr 插值表达式对象
//      * @return {string}
//      */
//     interp: function (interpExpr) {
//         var code = compileExprSource.expr(interpExpr.expr);
// 
// 
//         each(interpExpr.filters, function (filter) {
//             var filterName = filter.name.paths[0].value;
// 
//             switch (filterName) {
//                 case '_style':
//                 case '_xstyle':
//                 case '_class':
//                 case '_xclass':
//                     code = filterName + 'Filter(' + code + ')';
//                     break;
// 
//                 case 'url':
//                     code = 'encodeURIComponent(' + code + ')';
//                     break;
// 
//                 default:
//                     code = 'callFilter(componentCtx, "' + filterName + '", [' + code;
//                     each(filter.args, function (arg) {
//                         code += ', ' + compileExprSource.expr(arg);
//                     });
//                     code += '])';
//             }
// 
//         });
// 
//         if (!interpExpr.original) {
//             return 'escapeHTML(' + code + ')';
//         }
// 
//         return code;
//     },
// 
//     /**
//      * 生成文本片段代码
//      *
//      * @param {Object} textExpr 文本片段表达式对象
//      * @return {string}
//      */
//     text: function (textExpr) {
//         if (textExpr.segs.length === 0) {
//             return '""';
//         }
// 
//         var code = '';
// 
//         each(textExpr.segs, function (seg) {
//             var segCode = compileExprSource.expr(seg);
//             code += code ? ' + ' + segCode : segCode;
//         });
// 
//         return code;
//     },
// 
//     /**
//      * 生成数组字面量代码
//      *
//      * @param {Object} arrayExpr 数组字面量表达式对象
//      * @return {string}
//      */
//     array: function (arrayExpr) {
//         var code = [];
// 
//         each(arrayExpr.items, function (item) {
//             code.push((item.spread ? '...' : '') + compileExprSource.expr(item.expr));
//         });
// 
//         return '[\n' + code.join(',\n') + '\n]';
//     },
// 
//     /**
//      * 生成对象字面量代码
//      *
//      * @param {Object} objExpr 对象字面量表达式对象
//      * @return {string}
//      */
//     object: function (objExpr) {
//         var code = [];
// 
//         each(objExpr.items, function (item) {
//             if (item.spread) {
//                 code.push('...' + compileExprSource.expr(item.expr));
//             }
//             else {
//                 code.push(compileExprSource.expr(item.name) + ':' + compileExprSource.expr(item.expr));
//             }
//         });
// 
//         return '{\n' + code.join(',\n') + '\n}';
//     },
// 
//     /**
//      * 二元表达式操作符映射表
//      *
//      * @type {Object}
//      */
//     binaryOp: {
//         /* eslint-disable */
//         43: '+',
//         45: '-',
//         42: '*',
//         47: '/',
//         60: '<',
//         62: '>',
//         76: '&&',
//         94: '!=',
//         121: '<=',
//         122: '==',
//         123: '>=',
//         155: '!==',
//         183: '===',
//         248: '||'
//         /* eslint-enable */
//     },
// 
//     /**
//      * 生成表达式代码
//      *
//      * @param {Object} expr 表达式对象
//      * @return {string}
//      */
//     expr: function (expr) {
//         if (expr.parenthesized) {
//             return '(' + compileExprSource._expr(expr) + ')';
//         }
// 
//         return compileExprSource._expr(expr);
//     },
// 
//     /**
//      * 根据表达式类型进行生成代码函数的中转分发
//      *
//      * @param {Object} expr 表达式对象
//      * @return {string}
//      */
//     _expr: function (expr) {
//         switch (expr.type) {
//             case 9:
//                 switch (expr.operator) {
//                     case 33:
//                         return '!' + compileExprSource.expr(expr.expr);
//                     case 45:
//                         return '-' + compileExprSource.expr(expr.expr);
//                 }
//                 return '';
// 
//             case 8:
//                 return compileExprSource.expr(expr.segs[0])
//                     + compileExprSource.binaryOp[expr.operator]
//                     + compileExprSource.expr(expr.segs[1]);
// 
//             case 10:
//                 return compileExprSource.expr(expr.segs[0])
//                     + '?' + compileExprSource.expr(expr.segs[1])
//                     + ':' + compileExprSource.expr(expr.segs[2]);
// 
//             case 1:
//                 return compileExprSource.stringLiteralize(expr.literal || expr.value);
// 
//             case 2:
//                 return expr.value;
// 
//             case 3:
//                 return expr.value ? 'true' : 'false';
// 
//             case 4:
//                 return compileExprSource.dataAccess(expr);
// 
//             case 5:
//                 return compileExprSource.interp(expr);
// 
//             case 7:
//                 return compileExprSource.text(expr);
// 
//             case 12:
//                 return compileExprSource.array(expr);
// 
//             case 11:
//                 return compileExprSource.object(expr);
// 
//             case 6:
//                 return compileExprSource.callExpr(expr);
//         }
//     }
// };
// #[end]

// exports = module.exports = compileExprSource;


/**
 * Copyright (c) Baidu Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license.
 * See LICENSE file in the project root for license information.
 *
 * @file 编译源码的中间buffer类
 */

// var each = require('../util/each');
// var compileExprSource = require('./compile-expr-source');


// #[begin] ssr
// /**
//  * 编译源码的中间buffer类
//  *
//  * @class
//  */
// function CompileSourceBuffer() {
//     this.segs = [];
// }
// 
// /**
//  * 添加原始代码，将原封不动输出
//  *
//  * @param {string} code 原始代码
//  */
// CompileSourceBuffer.prototype.addRaw = function (code) {
//     this.segs.push({
//         type: 'RAW',
//         code: code
//     });
// };
// 
// /**
//  * 添加被拼接为html的原始代码
//  *
//  * @param {string} code 原始代码
//  */
// CompileSourceBuffer.prototype.joinRaw = function (code) {
//     this.segs.push({
//         type: 'JOIN_RAW',
//         code: code
//     });
// };
// 
// /**
//  * 添加renderer方法的起始源码
//  */
// CompileSourceBuffer.prototype.addRendererStart = function () {
//     this.addRaw('function (data, noDataOutput) {');
//     this.addRaw(
//         compileSourcePreCode.toString()
//             .split('\n')
//             .slice(1)
//             .join('\n')
//             .replace(/\}\s*$/, '')
//     );
// };
// 
// /**
//  * 添加renderer方法的结束源码
//  */
// CompileSourceBuffer.prototype.addRendererEnd = function () {
//     this.addRaw('}');
// };
// 
// /**
//  * 添加被拼接为html的静态字符串
//  *
//  * @param {string} str 被拼接的字符串
//  */
// CompileSourceBuffer.prototype.joinString = function (str) {
//     this.segs.push({
//         str: str,
//         type: 'JOIN_STRING'
//     });
// };
// 
// /**
//  * 添加被拼接为html的数据访问
//  *
//  * @param {Object?} accessor 数据访问表达式对象
//  */
// CompileSourceBuffer.prototype.joinDataStringify = function () {
//     this.segs.push({
//         type: 'JOIN_DATA_STRINGIFY'
//     });
// };
// 
// /**
//  * 添加被拼接为html的表达式
//  *
//  * @param {Object} expr 表达式对象
//  */
// CompileSourceBuffer.prototype.joinExpr = function (expr) {
//     this.segs.push({
//         expr: expr,
//         type: 'JOIN_EXPR'
//     });
// };
// 
// /**
//  * 生成编译后代码
//  *
//  * @return {string}
//  */
// CompileSourceBuffer.prototype.toCode = function () {
//     var code = [];
//     var temp = '';
// 
//     function genStrLiteral() {
//         if (temp) {
//             code.push('html += ' + compileExprSource.stringLiteralize(temp) + ';');
//         }
// 
//         temp = '';
//     }
// 
//     each(this.segs, function (seg) {
//         if (seg.type === 'JOIN_STRING') {
//             temp += seg.str;
//             return;
//         }
// 
//         genStrLiteral();
//         switch (seg.type) {
//             case 'JOIN_DATA_STRINGIFY':
//                 code.push('html += "<!--s-data:" + JSON.stringify('
//                     + compileExprSource.dataAccess() + ') + "-->";');
//                 break;
// 
//             case 'JOIN_EXPR':
//                 code.push('html += ' + compileExprSource.expr(seg.expr) + ';');
//                 break;
// 
//             case 'JOIN_RAW':
//                 code.push('html += ' + seg.code + ';');
//                 break;
// 
//             case 'RAW':
//                 code.push(seg.code);
//                 break;
// 
//         }
//     });
// 
//     genStrLiteral();
// 
//     return code.join('\n');
// };
// 
// /* eslint-disable no-unused-vars */
// /* eslint-disable fecs-camelcase */
// 
// /**
//  * 组件编译的模板函数
//  *
//  * @inner
//  */
// function compileSourcePreCode() {
//     var $version = '3.7.6';
// 
//     var componentRenderers = {};
// 
//     function extend(target, source) {
//         if (source) {
//             Object.keys(source).forEach(function (key) {
//                 var value = source[key];
//                 if (typeof value !== 'undefined') {
//                     target[key] = value;
//                 }
//             });
//         }
// 
//         return target;
//     }
// 
//     function each(array, iterator) {
//         if (array && array.length > 0) {
//             for (var i = 0, l = array.length; i < l; i++) {
//                 if (iterator(array[i], i) === false) {
//                     break;
//                 }
//             }
//         }
//     }
// 
//     function contains(array, value) {
//         var result;
//         each(array, function (item) {
//             result = item === value;
//             return !result;
//         });
// 
//         return result;
//     }
// 
//     var HTML_ENTITY = {
//         /* jshint ignore:start */
//         '&': '&amp;',
//         '<': '&lt;',
//         '>': '&gt;',
//         '"': '&quot;',
//         /* eslint-disable quotes */
//         "'": '&#39;'
//         /* eslint-enable quotes */
//         /* jshint ignore:end */
//     };
// 
//     function htmlFilterReplacer(c) {
//         return HTML_ENTITY[c];
//     }
// 
//     function escapeHTML(source) {
//         if (source == null) {
//             return '';
//         }
// 
//         if (typeof source === 'string') {
//             return source ? source.replace(/[&<>"']/g, htmlFilterReplacer) : '';
//         }
// 
//         return '' + source;
//     }
// 
//     function _classFilter(source) {
//         if (source instanceof Array) {
//             return source.join(' ');
//         }
// 
//         return source;
//     }
// 
//     function _styleFilter(source) {
//         if (typeof source === 'object') {
//             var result = '';
//             if (source) {
//                 Object.keys(source).forEach(function (key) {
//                     result += key + ':' + source[key] + ';';
//                 });
//             }
// 
//             return result;
//         }
// 
//         return source;
//     }
// 
//     function _xclassFilter(source) {
//         if (source instanceof Array) {
//             source = source.join(' ');
//         }
// 
//         return source ? ' ' + source : '';
//     }
// 
//     function _xstyleFilter(source) {
//         var result;
//         if (typeof source === 'object') {
//             result = '';
//             if (source) {
//                 Object.keys(source).forEach(function (key) {
//                     result += key + ':' + source[key] + ';';
//                 });
//             }
//         }
//         else {
//             result = source;
//         }
// 
//         return result ? ';' + result : '';
//     }
// 
//     function attrFilter(name, value) {
//         if (value) {
//             return ' ' + name + '="' + value + '"';
//         }
// 
//         return '';
//     }
// 
//     function boolAttrFilter(name, value) {
//         if (value && value !== 'false' && value !== '0') {
//             return ' ' + name;
//         }
// 
//         return '';
//     }
// 
//     function callFilter(ctx, name, args) {
//         var filter = ctx.proto.filters[name];
//         if (typeof filter === 'function') {
//             return filter.apply(ctx, args);
//         }
//     }
// }
// /* eslint-enable no-unused-vars */
// /* eslint-enable fecs-camelcase */
// 
// 
// #[end]

// exports = module.exports = CompileSourceBuffer;


/**
 * Copyright (c) Baidu Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license.
 * See LICENSE file in the project root for license information.
 *
 * @file 将组件编译成 render 方法的 js 源码
 */


// var each = require('../util/each');
// var extend = require('../util/extend');
// var splitStr2Obj = require('../util/split-str-2-obj');
// var parseExpr = require('../parser/parse-expr');
// var ExprType = require('../parser/expr-type');
// var postProp = require('../parser/post-prop');
// var autoCloseTags = require('../browser/auto-close-tags');
// var camelComponentBinds = require('./camel-component-binds');
// var CompileSourceBuffer = require('./compile-source-buffer');
// var compileExprSource = require('./compile-expr-source');
// var getANodeProp = require('./get-a-node-prop');
// var ComponentLoader = require('./component-loader');

// #[begin] ssr
// 
// var ssrIndex = 0;
// function genSSRId() {
//     return '_id' + (ssrIndex++);
// }
// 
// var stringifier = {
//     obj: function (source) {
//         var prefixComma;
//         var result = '{';
// 
//         for (var key in source) {
//             if (!source.hasOwnProperty(key) || typeof source[key] === 'undefined') {
//                 continue;
//             }
// 
//             if (prefixComma) {
//                 result += ',';
//             }
//             prefixComma = 1;
// 
//             result += compileExprSource.stringLiteralize(key) + ':' + stringifier.any(source[key]);
//         }
// 
//         return result + '}';
//     },
// 
//     arr: function (source) {
//         var prefixComma;
//         var result = '[';
// 
//         each(source, function (value) {
//             if (prefixComma) {
//                 result += ',';
//             }
//             prefixComma = 1;
// 
//             result += stringifier.any(value);
//         });
// 
//         return result + ']';
//     },
// 
//     str: function (source) {
//         return compileExprSource.stringLiteralize(source);
//     },
// 
//     date: function (source) {
//         return 'new Date(' + source.getTime() + ')';
//     },
// 
//     any: function (source) {
//         switch (typeof source) {
//             case 'string':
//                 return stringifier.str(source);
// 
//             case 'number':
//                 return '' + source;
// 
//             case 'boolean':
//                 return source ? 'true' : 'false';
// 
//             case 'object':
//                 if (!source) {
//                     return null;
//                 }
// 
//                 if (source instanceof Array) {
//                     return stringifier.arr(source);
//                 }
// 
//                 if (source instanceof Date) {
//                     return stringifier.date(source);
//                 }
// 
//                 return stringifier.obj(source);
//         }
// 
//         throw new Error('Cannot Stringify:' + source);
//     }
// };
// 
// var COMPONENT_RESERVED_MEMBERS = splitStr2Obj('aNode,computed,filters,components,'
//     + 'initData,template,attached,created,detached,disposed,compiled'
// );
// 
// /**
//  * 生成序列化时起始桩的html
//  *
//  * @param {string} type 桩类型标识
//  * @param {string?} content 桩内的内容
//  * @return {string}
//  */
// function serializeStump(type, content) {
//     return '<!--s-' + type + (content ? ':' + content : '') + '-->';
// }
// 
// /**
//  * 生成序列化时结束桩的html
//  *
//  * @param {string} type 桩类型标识
//  * @return {string}
//  */
// function serializeStumpEnd(type) {
//     return '<!--/s-' + type + '-->';
// }
// 
// /**
//  * element 的编译方法集合对象
//  *
//  * @inner
//  */
// var elementSourceCompiler = {
// 
//     /* eslint-disable max-params */
// 
//     /**
//      * 编译元素标签头
//      *
//      * @param {CompileSourceBuffer} sourceBuffer 编译源码的中间buffer
//      * @param {ANode} aNode 抽象节点
//      * @param {string=} tagNameVariable 组件标签为外部动态传入时的标签变量名
//      */
//     tagStart: function (sourceBuffer, aNode, tagNameVariable) {
//         var props = aNode.props;
//         var bindDirective = aNode.directives.bind;
//         var tagName = aNode.tagName;
// 
//         if (tagName) {
//             sourceBuffer.joinString('<' + tagName);
//         }
//         else if (tagNameVariable) {
//             sourceBuffer.joinString('<');
//             sourceBuffer.joinRaw(tagNameVariable + ' || "div"');
//         }
//         else {
//             sourceBuffer.joinString('<div');
//         }
// 
//         // index list
//         var propsIndex = {};
//         each(props, function (prop) {
//             propsIndex[prop.name] = prop;
// 
//             if (prop.name !== 'slot' && prop.expr.value != null) {
//                 sourceBuffer.joinString(' ' + prop.name + '="' + prop.expr.segs[0].literal + '"');
//             }
//         });
// 
//         each(props, function (prop) {
//             if (prop.name === 'slot' || prop.expr.value != null) {
//                 return;
//             }
// 
//             if (prop.name === 'value') {
//                 switch (tagName) {
//                     case 'textarea':
//                         return;
// 
//                     case 'select':
//                         sourceBuffer.addRaw('$selectValue = '
//                             + compileExprSource.expr(prop.expr)
//                             + ' || "";'
//                         );
//                         return;
// 
//                     case 'option':
//                         sourceBuffer.addRaw('$optionValue = '
//                             + compileExprSource.expr(prop.expr)
//                             + ';'
//                         );
//                         // value
//                         sourceBuffer.addRaw('if ($optionValue != null) {');
//                         sourceBuffer.joinRaw('" value=\\"" + $optionValue + "\\""');
//                         sourceBuffer.addRaw('}');
// 
//                         // selected
//                         sourceBuffer.addRaw('if ($optionValue === $selectValue) {');
//                         sourceBuffer.joinString(' selected');
//                         sourceBuffer.addRaw('}');
//                         return;
//                 }
//             }
// 
//             switch (prop.name) {
//                 case 'readonly':
//                 case 'disabled':
//                 case 'multiple':
//                     if (prop.raw === '') {
//                         sourceBuffer.joinString(' ' + prop.name);
//                     }
//                     else {
//                         sourceBuffer.joinRaw('boolAttrFilter("' + prop.name + '", '
//                             + compileExprSource.expr(prop.expr)
//                             + ')'
//                         );
//                     }
//                     break;
// 
//                 case 'checked':
//                     if (tagName === 'input') {
//                         var valueProp = propsIndex.value;
//                         var valueCode = compileExprSource.expr(valueProp.expr);
// 
//                         if (valueProp) {
//                             switch (propsIndex.type.raw) {
//                                 case 'checkbox':
//                                     sourceBuffer.addRaw('if (contains('
//                                         + compileExprSource.expr(prop.expr)
//                                         + ', '
//                                         + valueCode
//                                         + ')) {'
//                                     );
//                                     sourceBuffer.joinString(' checked');
//                                     sourceBuffer.addRaw('}');
//                                     break;
// 
//                                 case 'radio':
//                                     sourceBuffer.addRaw('if ('
//                                         + compileExprSource.expr(prop.expr)
//                                         + ' === '
//                                         + valueCode
//                                         + ') {'
//                                     );
//                                     sourceBuffer.joinString(' checked');
//                                     sourceBuffer.addRaw('}');
//                                     break;
//                             }
//                         }
//                     }
//                     break;
// 
//                 default:
//                     var onlyOneAccessor = false;
//                     var preCondExpr;
// 
//                     if (prop.expr.type === 4) {
//                         onlyOneAccessor = true;
//                         preCondExpr = prop.expr;
//                     }
//                     else if (prop.expr.segs.length === 1) {
//                         var interpExpr = prop.expr.segs[0];
//                         var interpFilters = interpExpr.filters;
// 
//                         if (!interpFilters.length
//                             || interpFilters.length === 1 && interpFilters[0].args.length === 0
//                         ) {
//                             onlyOneAccessor = true;
//                             preCondExpr = prop.expr.segs[0].expr;
//                         }
//                     }
// 
//                     if (onlyOneAccessor) {
//                         sourceBuffer.addRaw('if (' + compileExprSource.expr(preCondExpr) + ') {');
//                     }
// 
//                     sourceBuffer.joinRaw('attrFilter("' + prop.name + '", '
//                         + (prop.x ? 'escapeHTML(' : '')
//                         + compileExprSource.expr(prop.expr)
//                         + (prop.x ? ')' : '')
//                         + ')'
//                     );
// 
//                     if (onlyOneAccessor) {
//                         sourceBuffer.addRaw('}');
//                     }
// 
//                     break;
//             }
//         });
// 
//         if (bindDirective) {
//             sourceBuffer.addRaw(
//                 '(function ($bindObj) {for (var $key in $bindObj) {'
//                 + 'var $value = $bindObj[$key];'
//             );
// 
//             if (tagName === 'textarea') {
//                 sourceBuffer.addRaw(
//                     'if ($key === "value") {'
//                     + 'continue;'
//                     + '}'
//                 );
//             }
// 
//             sourceBuffer.addRaw('switch ($key) {\n'
//                 + 'case "readonly":\n'
//                 + 'case "disabled":\n'
//                 + 'case "multiple":\n'
//                 + 'case "multiple":\n'
//                 + 'html += boolAttrFilter($key, escapeHTML($value));\n'
//                 + 'break;\n'
//                 + 'default:\n'
//                 + 'html += attrFilter($key, escapeHTML($value));'
//                 + '}'
//             );
// 
//             sourceBuffer.addRaw(
//                 '}})('
//                 + compileExprSource.expr(bindDirective.value)
//                 + ');'
//             );
//         }
// 
//         sourceBuffer.joinString('>');
//     },
//     /* eslint-enable max-params */
// 
//     /**
//      * 编译元素闭合
//      *
//      * @param {CompileSourceBuffer} sourceBuffer 编译源码的中间buffer
//      * @param {ANode} aNode 抽象节点
//      * @param {string=} tagNameVariable 组件标签为外部动态传入时的标签变量名
//      */
//     tagEnd: function (sourceBuffer, aNode, tagNameVariable) {
//         var tagName = aNode.tagName;
// 
//         if (tagName) {
//             if (!autoCloseTags[tagName]) {
//                 sourceBuffer.joinString('</' + tagName + '>');
//             }
// 
//             if (tagName === 'select') {
//                 sourceBuffer.addRaw('$selectValue = null;');
//             }
// 
//             if (tagName === 'option') {
//                 sourceBuffer.addRaw('$optionValue = null;');
//             }
//         }
//         else {
//             sourceBuffer.joinString('</');
//             sourceBuffer.joinRaw(tagNameVariable + ' || "div"');
//             sourceBuffer.joinString('>');
//         }
//     },
// 
//     /**
//      * 编译元素内容
//      *
//      * @param {CompileSourceBuffer} sourceBuffer 编译源码的中间buffer
//      * @param {ANode} aNode 元素的抽象节点信息
//      * @param {Component} owner 所属组件实例环境
//      */
//     inner: function (sourceBuffer, aNode, owner) {
//         // inner content
//         if (aNode.tagName === 'textarea') {
//             var valueProp = getANodeProp(aNode, 'value');
//             if (valueProp) {
//                 sourceBuffer.joinRaw('escapeHTML('
//                     + compileExprSource.expr(valueProp.expr)
//                     + ')'
//                 );
//             }
// 
//             return;
//         }
// 
//         var htmlDirective = aNode.directives.html;
//         if (htmlDirective) {
//             sourceBuffer.joinExpr(htmlDirective.value);
//         }
//         else {
//             /* eslint-disable no-use-before-define */
//             each(aNode.children, function (aNodeChild) {
//                 aNodeCompiler.compile(aNodeChild, sourceBuffer, owner);
//             });
//             /* eslint-enable no-use-before-define */
//         }
//     }
// };
// 
// /**
//  * ANode 的编译方法集合对象
//  *
//  * @inner
//  */
// var aNodeCompiler = {
// 
//     /**
//      * 编译节点
//      *
//      * @param {ANode} aNode 抽象节点
//      * @param {CompileSourceBuffer} sourceBuffer 编译源码的中间buffer
//      * @param {Component} owner 所属组件实例环境
//      * @param {Object} extra 编译所需的一些额外信息
//      */
//     compile: function (aNode, sourceBuffer, owner, extra) {
//         extra = extra || {};
//         var compileMethod = 'compileElement';
// 
//         if (aNode.textExpr) {
//             compileMethod = 'compileText';
//         }
//         else if (aNode.directives['if']) { // eslint-disable-line dot-notation
//             compileMethod = 'compileIf';
//         }
//         else if (aNode.directives['for']) { // eslint-disable-line dot-notation
//             compileMethod = 'compileFor';
//         }
//         else if (aNode.tagName === 'slot') {
//             compileMethod = 'compileSlot';
//         }
//         else if (aNode.tagName === 'template') {
//             compileMethod = 'compileTemplate';
//         }
//         else {
//             var ComponentType = owner.getComponentType
//                 ? owner.getComponentType(aNode)
//                 : owner.components[aNode.tagName];
// 
//             if (ComponentType) {
//                 compileMethod = 'compileComponent';
//                 extra.ComponentClass = ComponentType;
// 
//                 if (ComponentType instanceof ComponentLoader) {
//                     compileMethod = 'compileComponentLoader';
//                 }
//             }
//         }
// 
//         aNodeCompiler[compileMethod](aNode, sourceBuffer, owner, extra);
//     },
// 
//     /**
//      * 编译文本节点
//      *
//      * @param {ANode} aNode 节点对象
//      * @param {CompileSourceBuffer} sourceBuffer 编译源码的中间buffer
//      */
//     compileText: function (aNode, sourceBuffer) {
//         if (aNode.textExpr.original) {
//             sourceBuffer.joinString(serializeStump('text'));
//         }
// 
//         if (aNode.textExpr.value != null) {
//             sourceBuffer.joinString(aNode.textExpr.segs[0].literal);
//         }
//         else {
//             sourceBuffer.joinExpr(aNode.textExpr);
//         }
// 
//         if (aNode.textExpr.original) {
//             sourceBuffer.joinString(serializeStumpEnd('text'));
//         }
//     },
// 
//     /**
//      * 编译template节点
//      *
//      * @param {ANode} aNode 节点对象
//      * @param {CompileSourceBuffer} sourceBuffer 编译源码的中间buffer
//      * @param {Component} owner 所属组件实例环境
//      */
//     compileTemplate: function (aNode, sourceBuffer, owner) {
//         elementSourceCompiler.inner(sourceBuffer, aNode, owner);
//     },
// 
//     /**
//      * 编译 if 节点
//      *
//      * @param {ANode} aNode 节点对象
//      * @param {CompileSourceBuffer} sourceBuffer 编译源码的中间buffer
//      * @param {Component} owner 所属组件实例环境
//      */
//     compileIf: function (aNode, sourceBuffer, owner) {
// 
//         // output main if
//         var ifDirective = aNode.directives['if']; // eslint-disable-line dot-notation
//         sourceBuffer.addRaw('if (' + compileExprSource.expr(ifDirective.value) + ') {');
//         sourceBuffer.addRaw(
//             aNodeCompiler.compile(
//                 aNode.ifRinsed,
//                 sourceBuffer,
//                 owner
//             )
//         );
//         sourceBuffer.addRaw('}');
// 
//         // output elif and else
//         each(aNode.elses, function (elseANode) {
//             var elifDirective = elseANode.directives.elif;
//             if (elifDirective) {
//                 sourceBuffer.addRaw('else if (' + compileExprSource.expr(elifDirective.value) + ') {');
//             }
//             else {
//                 sourceBuffer.addRaw('else {');
//             }
// 
//             sourceBuffer.addRaw(
//                 aNodeCompiler.compile(
//                     elseANode,
//                     sourceBuffer,
//                     owner
//                 )
//             );
//             sourceBuffer.addRaw('}');
//         });
//     },
// 
//     /**
//      * 编译 for 节点
//      *
//      * @param {ANode} aNode 节点对象
//      * @param {CompileSourceBuffer} sourceBuffer 编译源码的中间buffer
//      * @param {Component} owner 所属组件实例环境
//      */
//     compileFor: function (aNode, sourceBuffer, owner) {
//         var forElementANode = {
//             children: aNode.children,
//             props: aNode.props,
//             events: aNode.events,
//             tagName: aNode.tagName,
//             directives: extend({}, aNode.directives),
//             hotspot: aNode.hotspot
//         };
//         forElementANode.directives['for'] = null;
// 
//         var forDirective = aNode.directives['for']; // eslint-disable-line dot-notation
//         var itemName = forDirective.item;
//         var indexName = forDirective.index || genSSRId();
//         var listName = genSSRId();
// 
// 
//         sourceBuffer.addRaw('var ' + listName + ' = ' + compileExprSource.expr(forDirective.value) + ';');
//         sourceBuffer.addRaw('if (' + listName + ' instanceof Array) {');
// 
//         // for array
//         sourceBuffer.addRaw('for ('
//             + 'var ' + indexName + ' = 0; '
//             + indexName + ' < ' + listName + '.length; '
//             + indexName + '++) {'
//         );
//         sourceBuffer.addRaw('componentCtx.data.' + indexName + '=' + indexName + ';');
//         sourceBuffer.addRaw('componentCtx.data.' + itemName + '= ' + listName + '[' + indexName + '];');
//         sourceBuffer.addRaw(
//             aNodeCompiler.compile(
//                 forElementANode,
//                 sourceBuffer,
//                 owner
//             )
//         );
//         sourceBuffer.addRaw('}');
// 
//         sourceBuffer.addRaw('} else if (typeof ' + listName + ' === "object") {');
// 
//         // for object
//         sourceBuffer.addRaw('for (var ' + indexName + ' in ' + listName + ') {');
//         sourceBuffer.addRaw('if (' + listName + '[' + indexName + '] != null) {');
//         sourceBuffer.addRaw('componentCtx.data.' + indexName + '=' + indexName + ';');
//         sourceBuffer.addRaw('componentCtx.data.' + itemName + '= ' + listName + '[' + indexName + '];');
//         sourceBuffer.addRaw(
//             aNodeCompiler.compile(
//                 forElementANode,
//                 sourceBuffer,
//                 owner
//             )
//         );
//         sourceBuffer.addRaw('}');
//         sourceBuffer.addRaw('}');
// 
//         sourceBuffer.addRaw('}');
//     },
// 
//     /**
//      * 编译 slot 节点
//      *
//      * @param {ANode} aNode 节点对象
//      * @param {CompileSourceBuffer} sourceBuffer 编译源码的中间buffer
//      * @param {Component} owner 所属组件实例环境
//      */
//     compileSlot: function (aNode, sourceBuffer, owner) {
//         var rendererId = genSSRId();
// 
//         sourceBuffer.addRaw('componentCtx.slotRenderers.' + rendererId
//             + ' = componentCtx.slotRenderers.' + rendererId + ' || function () {');
// 
//         sourceBuffer.addRaw('function $defaultSlotRender(componentCtx) {');
//         sourceBuffer.addRaw('  var html = "";');
//         each(aNode.children, function (aNodeChild) {
//             sourceBuffer.addRaw(aNodeCompiler.compile(aNodeChild, sourceBuffer, owner));
//         });
//         sourceBuffer.addRaw('  return html;');
//         sourceBuffer.addRaw('}');
// 
//         sourceBuffer.addRaw('var $isInserted = false;');
//         sourceBuffer.addRaw('var $ctxSourceSlots = componentCtx.sourceSlots;');
//         sourceBuffer.addRaw('var $mySourceSlots = [];');
// 
//         var nameProp = getANodeProp(aNode, 'name');
//         if (nameProp) {
//             sourceBuffer.addRaw('var $slotName = ' + compileExprSource.expr(nameProp.expr) + ';');
// 
//             sourceBuffer.addRaw('for (var $i = 0; $i < $ctxSourceSlots.length; $i++) {');
//             sourceBuffer.addRaw('  if ($ctxSourceSlots[$i][1] == $slotName) {');
//             sourceBuffer.addRaw('    $mySourceSlots.push($ctxSourceSlots[$i][0]);');
//             sourceBuffer.addRaw('    $isInserted = true;');
//             sourceBuffer.addRaw('  }');
//             sourceBuffer.addRaw('}');
//         }
//         else {
//             sourceBuffer.addRaw('if ($ctxSourceSlots[0] && $ctxSourceSlots[0][1] == null) {');
//             sourceBuffer.addRaw('  $mySourceSlots.push($ctxSourceSlots[0][0]);');
//             sourceBuffer.addRaw('  $isInserted = true;');
//             sourceBuffer.addRaw('}');
//         }
// 
//         sourceBuffer.addRaw('if (!$isInserted) { $mySourceSlots.push($defaultSlotRender); }');
//         sourceBuffer.addRaw('var $slotCtx = $isInserted ? componentCtx.owner : componentCtx;');
// 
//         if (aNode.vars || aNode.directives.bind) {
//             sourceBuffer.addRaw('$slotCtx = {data: extend({}, $slotCtx.data), proto: $slotCtx.proto, owner: $slotCtx.owner};'); // eslint-disable-line
// 
//             if (aNode.directives.bind) {
//                 sourceBuffer.addRaw('extend($slotCtx.data, ' + compileExprSource.expr(aNode.directives.bind.value) + ');'); // eslint-disable-line
//             }
// 
//             each(aNode.vars, function (varItem) {
//                 sourceBuffer.addRaw(
//                     '$slotCtx.data["' + varItem.name + '"] = '
//                     + compileExprSource.expr(varItem.expr)
//                     + ';'
//                 );
//             });
//         }
// 
//         sourceBuffer.addRaw('for (var $renderIndex = 0; $renderIndex < $mySourceSlots.length; $renderIndex++) {');
//         sourceBuffer.addRaw('  html += $mySourceSlots[$renderIndex]($slotCtx);');
//         sourceBuffer.addRaw('}');
// 
//         sourceBuffer.addRaw('};');
//         sourceBuffer.addRaw('componentCtx.slotRenderers.' + rendererId + '();');
//     },
// 
//     /**
//      * 编译普通节点
//      *
//      * @param {ANode} aNode 节点对象
//      * @param {CompileSourceBuffer} sourceBuffer 编译源码的中间buffer
//      * @param {Component} owner 所属组件实例环境
//      * @param {Object} extra 编译所需的一些额外信息
//      */
//     compileElement: function (aNode, sourceBuffer, owner) {
//         elementSourceCompiler.tagStart(sourceBuffer, aNode);
//         elementSourceCompiler.inner(sourceBuffer, aNode, owner);
//         elementSourceCompiler.tagEnd(sourceBuffer, aNode);
//     },
// 
//     /**
//      * 编译组件节点
//      *
//      * @param {ANode} aNode 节点对象
//      * @param {CompileSourceBuffer} sourceBuffer 编译源码的中间buffer
//      * @param {Component} owner 所属组件实例环境
//      * @param {Object} extra 编译所需的一些额外信息
//      * @param {Function} extra.ComponentClass 对应组件类
//      */
//     compileComponent: function (aNode, sourceBuffer, owner, extra) {
//         var dataLiteral = '{}';
// 
//         sourceBuffer.addRaw('var $sourceSlots = [];');
//         if (aNode.children) {
//             var defaultSourceSlots = [];
//             var sourceSlotCodes = {};
// 
//             each(aNode.children, function (child) {
//                 var slotBind = !child.textExpr && getANodeProp(child, 'slot');
//                 if (slotBind) {
//                     if (!sourceSlotCodes[slotBind.raw]) {
//                         sourceSlotCodes[slotBind.raw] = {
//                             children: [],
//                             prop: slotBind
//                         };
//                     }
// 
//                     sourceSlotCodes[slotBind.raw].children.push(child);
//                 }
//                 else {
//                     defaultSourceSlots.push(child);
//                 }
//             });
// 
//             if (defaultSourceSlots.length) {
//                 sourceBuffer.addRaw('$sourceSlots.push([function (componentCtx) {');
//                 sourceBuffer.addRaw('  var html = "";');
//                 defaultSourceSlots.forEach(function (child) {
//                     aNodeCompiler.compile(child, sourceBuffer, owner);
//                 });
//                 sourceBuffer.addRaw('  return html;');
//                 sourceBuffer.addRaw('}]);');
//             }
// 
//             for (var key in sourceSlotCodes) {
//                 var sourceSlotCode = sourceSlotCodes[key];
//                 sourceBuffer.addRaw('$sourceSlots.push([function (componentCtx) {');
//                 sourceBuffer.addRaw('  var html = "";');
//                 sourceBuffer.addRaw(sourceSlotCode.children.forEach(function (child) {
//                     aNodeCompiler.compile(child, sourceBuffer, owner);
//                 }));
//                 sourceBuffer.addRaw('  return html;');
//                 sourceBuffer.addRaw('}, ' + compileExprSource.expr(sourceSlotCode.prop.expr) + ']);');
//             }
//         }
// 
// 
//         var givenData = [];
//         each(camelComponentBinds(aNode.props), function (prop) {
//             postProp(prop);
//             givenData.push(
//                 compileExprSource.stringLiteralize(prop.name)
//                 + ':'
//                 + compileExprSource.expr(prop.expr)
//             );
//         });
// 
//         dataLiteral = '{' + givenData.join(',\n') + '}';
//         if (aNode.directives.bind) {
//             dataLiteral = 'extend('
//                 + compileExprSource.expr(aNode.directives.bind.value)
//                 + ', '
//                 + dataLiteral
//                 + ')';
//         }
// 
//         var renderId = compileComponentSource(sourceBuffer, extra.ComponentClass, owner.ssrContextId);
//         sourceBuffer.addRaw('html += componentRenderers.' + renderId + '(');
//         sourceBuffer.addRaw(dataLiteral + ', true, componentCtx, '
//             + stringifier.str(aNode.tagName) + ', $sourceSlots);');
//         sourceBuffer.addRaw('$sourceSlots = null;');
//     },
// 
//     /**
//      * 编译组件加载器节点
//      *
//      * @param {ANode} aNode 节点对象
//      * @param {CompileSourceBuffer} sourceBuffer 编译源码的中间buffer
//      * @param {Component} owner 所属组件实例环境
//      * @param {Object} extra 编译所需的一些额外信息
//      * @param {Function} extra.ComponentClass 对应类
//      */
//     compileComponentLoader: function (aNode, sourceBuffer, owner, extra) {
//         var LoadingComponent = extra.ComponentClass.placeholder;
//         if (typeof LoadingComponent === 'function') {
//             aNodeCompiler.compileComponent(aNode, sourceBuffer, owner, {
//                 ComponentClass: LoadingComponent
//             });
//         }
//     }
// };
// 
// /**
//  * 生成组件构建的代码
//  *
//  * @inner
//  * @param {CompileSourceBuffer} sourceBuffer 编译源码的中间buffer
//  * @param {Function} ComponentClass 组件类
//  * @param {string} contextId 构建render环境的id
//  * @return {string} 组件在当前环境下的方法标识
//  */
// function compileComponentSource(sourceBuffer, ComponentClass, contextId) {
//     ComponentClass.ssrContext = ComponentClass.ssrContext || {};
//     var componentIdInContext = ComponentClass.ssrContext[contextId];
// 
//     if (!componentIdInContext) {
//         componentIdInContext = genSSRId();
//         ComponentClass.ssrContext[contextId] = componentIdInContext;
// 
//         // 先初始化个实例，让模板编译成 ANode，并且能获得初始化数据
//         var component = new ComponentClass();
//         component.ssrContextId = contextId;
// 
//         if (component.components) {
//             Object.keys(component.components).forEach(
//                 function (key) {
//                     var CmptClass = component.components[key];
//                     if (CmptClass instanceof ComponentLoader) {
//                         CmptClass = CmptClass.placeholder;
//                     }
// 
//                     if (CmptClass) {
//                         compileComponentSource(sourceBuffer, CmptClass, contextId);
//                     }
//                 }
//             );
//         }
// 
//         sourceBuffer.addRaw('componentRenderers.' + componentIdInContext + ' = componentRenderers.'
//             + componentIdInContext + '|| ' + componentIdInContext + ';');
// 
//         sourceBuffer.addRaw('var ' + componentIdInContext + 'Proto = ' + genComponentProtoCode(component));
//         sourceBuffer.addRaw('function ' + componentIdInContext
//             + '(data, noDataOutput, parentCtx, tagName, sourceSlots) {');
//         sourceBuffer.addRaw('var html = "";');
// 
//         sourceBuffer.addRaw(genComponentContextCode(component, componentIdInContext));
// 
// 
//         // init data
//         var defaultData = component.data.get();
//         sourceBuffer.addRaw('if (data) {');
//         Object.keys(defaultData).forEach(function (key) {
//             sourceBuffer.addRaw('componentCtx.data["' + key + '"] = componentCtx.data["' + key + '"] || '
//                 + stringifier.any(defaultData[key]) + ';');
//         });
//         sourceBuffer.addRaw('}');
// 
//         // calc computed
//         sourceBuffer.addRaw('var computedNames = componentCtx.proto.computedNames;');
//         sourceBuffer.addRaw('for (var $i = 0; $i < computedNames.length; $i++) {');
//         sourceBuffer.addRaw('  var $computedName = computedNames[$i];');
//         sourceBuffer.addRaw('  data[$computedName] = componentCtx.proto.computed[$computedName](componentCtx);');
//         sourceBuffer.addRaw('}');
// 
// 
//         var ifDirective = component.aNode.directives['if']; // eslint-disable-line dot-notation
//         if (ifDirective) {
//             sourceBuffer.addRaw('if (' + compileExprSource.expr(ifDirective.value) + ') {');
//         }
// 
//         elementSourceCompiler.tagStart(sourceBuffer, component.aNode, 'tagName');
// 
// 
//         sourceBuffer.addRaw('if (!noDataOutput) {');
//         sourceBuffer.joinDataStringify();
//         sourceBuffer.addRaw('}');
// 
// 
//         elementSourceCompiler.inner(sourceBuffer, component.aNode, component);
//         elementSourceCompiler.tagEnd(sourceBuffer, component.aNode, 'tagName');
// 
//         if (ifDirective) {
//             sourceBuffer.addRaw('}');
//         }
// 
//         sourceBuffer.addRaw('return html;');
//         sourceBuffer.addRaw('};');
//     }
// 
//     return componentIdInContext;
// }
// 
// /**
//  * 生成组件 renderer 时 ctx 对象构建的代码
//  *
//  * @inner
//  * @param {Object} component 组件实例
//  * @return {string}
//  */
// function genComponentContextCode(component, componentIdInContext) {
//     var code = ['var componentCtx = {'];
// 
//     // proto
//     code.push('proto: ' + componentIdInContext + 'Proto,');
// 
//     // sourceSlots
//     code.push('sourceSlots: sourceSlots,');
// 
//     // data
//     var defaultData = component.data.get();
//     code.push('data: data || ' + stringifier.any(defaultData) + ',');
// 
//     // parentCtx
//     code.push('owner: parentCtx,');
// 
//     // slotRenderers
//     code.push('slotRenderers: {}');
// 
//     code.push('};');
// 
//     return code.join('\n');
// }
// 
// /**
//  * 生成组件 proto 对象构建的代码
//  *
//  * @inner
//  * @param {Object} component 组件实例
//  * @return {string}
//  */
// function genComponentProtoCode(component) {
//     var code = ['{'];
// 
//     // members for call expr
//     var ComponentProto = component.constructor.prototype;
//     Object.keys(ComponentProto).forEach(function (protoMemberKey) {
//         var protoMember = ComponentProto[protoMemberKey];
//         if (COMPONENT_RESERVED_MEMBERS[protoMemberKey] || !protoMember) {
//             return;
//         }
// 
//         switch (typeof protoMember) {
//             case 'function':
//                 code.push(protoMemberKey + ': ' + protoMember.toString() + ',');
//                 break;
// 
//             case 'object':
//                 code.push(protoMemberKey + ':');
// 
//                 if (protoMember instanceof Array) {
//                     code.push('[');
//                     protoMember.forEach(function (item) {
//                         code.push(typeof item === 'function' ? item.toString() : '' + ',');
//                     });
//                     code.push(']');
//                 }
//                 else {
//                     code.push('{');
//                     Object.keys(protoMember).forEach(function (itemKey) {
//                         var item = protoMember[itemKey];
//                         if (typeof item === 'function') {
//                             code.push(itemKey + ':' + item.toString() + ',');
//                         }
//                     });
//                     code.push('}');
//                 }
// 
//                 code.push(',');
//         }
//     });
// 
//     // filters
//     code.push('filters: {');
//     var filterCode = [];
//     for (var key in component.filters) {
//         if (component.filters.hasOwnProperty(key)) {
//             var filter = component.filters[key];
// 
//             if (typeof filter === 'function') {
//                 filterCode.push(key + ': ' + filter.toString());
//             }
//         }
//     }
//     code.push(filterCode.join(','));
//     code.push('},');
// 
//     /* eslint-disable no-redeclare */
//     // computed obj
//     code.push('computed: {');
//     var computedCode = [];
//     var computedNamesCode = [];
//     var computedNamesIndex = {};
//     for (var key in component.computed) {
//         if (component.computed.hasOwnProperty(key)) {
//             var computed = component.computed[key];
// 
//             if (typeof computed === 'function') {
//                 if (!computedNamesIndex[key]) {
//                     computedNamesIndex[key] = 1;
//                     computedNamesCode.push('"' + key + '"');
//                 }
// 
//                 computedCode.push(key + ': '
//                     + computed.toString()
//                         .replace(/^\s*function\s*\(/, 'function (componentCtx')
//                         .replace(
//                             /this.data.get\(([^\)]+)\)/g,
//                             function (match, exprLiteral) {
//                                 var exprStr = (new Function('return ' + exprLiteral))();
//                                 var expr = parseExpr(exprStr);
// 
//                                 var ident = expr.paths[0].value;
//                                 if (component.computed.hasOwnProperty(ident)
//                                     && !computedNamesIndex[ident]
//                                 ) {
//                                     computedNamesIndex[ident] = 1;
//                                     computedNamesCode.unshift('"' + ident + '"');
//                                 }
// 
//                                 return compileExprSource.expr(expr);
//                             }
//                         )
//                 );
//             }
//         }
//     }
//     code.push(computedCode.join(','));
//     code.push('},');
// 
//     // computed names
//     code.push('computedNames: [');
//     code.push(computedNamesCode.join(','));
//     code.push('],');
//     /* eslint-enable no-redeclare */
// 
//     // tagName
//     code.push('tagName: "' + component.tagName + '"');
//     code.push('};');
// 
//     return code.join('\n');
// }
// 
// /* eslint-enable guard-for-in */
// 
// /**
//  * 将组件编译成 render 方法的 js 源码
//  *
//  * @param {Function} ComponentClass 组件类
//  * @return {string}
//  */
// function compileJSSource(ComponentClass) {
//     var sourceBuffer = new CompileSourceBuffer();
//     var contextId = genSSRId();
// 
//     sourceBuffer.addRendererStart();
//     var renderId = compileComponentSource(sourceBuffer, ComponentClass, contextId);
//     sourceBuffer.addRaw('return componentRenderers.' + renderId + '(data, noDataOutput)');
//     sourceBuffer.addRendererEnd();
// 
//     return sourceBuffer.toCode();
// }
// #[end]

// exports = module.exports = compileJSSource;

    /* eslint-disable no-unused-vars */
//     var nextTick = require('./util/next-tick');
//     var inherits = require('./util/inherits');
//     var parseTemplate = require('./parser/parse-template');
//     var parseExpr = require('./parser/parse-expr');
//     var ExprType = require('./parser/expr-type');
//     var LifeCycle = require('./view/life-cycle');
//     var NodeType = require('./view/node-type');
//     var Component = require('./view/component');
//     var compileComponent = require('./view/compile-component');
//     var defineComponent = require('./view/define-component');
//     var createComponentLoader = require('./view/create-component-loader');
//     var emitDevtool = require('./util/emit-devtool');
//     var compileJSSource = require('./view/compile-js-source');
//     var Data = require('./runtime/data');
//     var evalExpr = require('./runtime/eval-expr');
//     var DataTypes = require('./util/data-types');


    var san = {
        /**
         * san版本号
         *
         * @type {string}
         */
        version: '3.7.6',

        // #[begin] devtool
//         /**
//          * 是否开启调试。开启调试时 devtool 会工作
//          *
//          * @type {boolean}
//          */
//         debug: true,
        // #[end]

        // #[begin] ssr
//         /**
//          * 将组件类编译成 renderer 方法
//          *
//          * @param {Function} ComponentClass 组件类
//          * @return {function(Object):string}
//          */
//         compileToRenderer: function (ComponentClass) {
//             var renderer = ComponentClass.__ssrRenderer;
// 
//             if (!renderer) {
//                 var code = compileJSSource(ComponentClass);
//                 renderer = (new Function('return ' + code))();
//                 ComponentClass.__ssrRenderer = renderer;
//             }
// 
//             return renderer;
//         },
// 
//         /**
//          * 将组件类编译成 renderer 方法的源文件
//          *
//          * @param {Function} ComponentClass 组件类
//          * @return {string}
//          */
//         compileToSource: compileJSSource,
        // #[end]

        /**
         * 组件基类
         *
         * @type {Function}
         */
        Component: Component,

        /**
         * 创建组件类
         *
         * @param {Object} proto 组件类的方法表
         * @return {Function}
         */
        defineComponent: defineComponent,

        /**
         * 创建组件Loader
         *
         * @param {Object|Function} options 创建组件Loader的参数。为Object时参考下方描述，为Function时代表load方法。
         * @param {Function} options.load load方法
         * @param {Function=} options.placeholder loading过程中渲染的占位组件
         * @param {Function=} options.fallback load失败时渲染的组件
         * @return {ComponentLoader}
         */
        createComponentLoader: createComponentLoader,

        /**
         * 编译组件类。预解析template和components
         *
         * @param {Function} ComponentClass 组件类
         */
        compileComponent: compileComponent,

        /**
         * 解析 template
         *
         * @inner
         * @param {string} source template 源码
         * @return {ANode}
         */
        parseTemplate: parseTemplate,

        /**
         * 解析表达式
         *
         * @param {string} source 源码
         * @return {Object}
         */
        parseExpr: parseExpr,

        /**
         * 表达式类型枚举
         *
         * @const
         * @type {Object}
         */
        ExprType: ExprType,

        /**
         * 生命周期
         */
        LifeCycle: LifeCycle,

        /**
         * 节点类型
         *
         * @const
         * @type {Object}
         */
        NodeType: NodeType,

        /**
         * 在下一个更新周期运行函数
         *
         * @param {Function} fn 要运行的函数
         */
        nextTick: nextTick,

        /**
         * 数据类
         *
         * @class
         * @param {Object?} data 初始数据
         * @param {Data?} parent 父级数据对象
         */
        Data: Data,

        /**
         * 计算表达式的值
         *
         * @param {Object} expr 表达式对象
         * @param {Data} data 数据对象
         * @param {Component=} owner 组件对象，用于表达式中filter的执行
         * @return {*}
         */
        evalExpr: evalExpr,

        /**
         * 构建类之间的继承关系
         *
         * @param {Function} subClass 子类函数
         * @param {Function} superClass 父类函数
         */
        inherits: inherits,

        /**
         * DataTypes
         *
         * @type {Object}
         */
        DataTypes: DataTypes
    };

    // export
    if (typeof exports === 'object' && typeof module === 'object') {
        // For CommonJS
        exports = module.exports = san;
    }
    else if (typeof define === 'function' && define.amd) {
        // For AMD
        define('san', [], san);
    }
    else {
        // For <script src="..."
        root.san = san;
    }

    // #[begin] devtool
//     emitDevtool.start(san);
    // #[end]
})(this);
//@ sourceMappingURL=san.spa.js.map