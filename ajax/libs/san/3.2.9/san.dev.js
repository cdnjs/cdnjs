/**
 * San
 * Copyright 2016 Baidu Inc. All rights reserved.
 *
 * @file 主文件
 * @author errorrik(errorrik@gmail.com)
 *         otakustay(otakustay@gmail.com)
 *         junmer(junmer@foxmail.com)
 */

(function (root) {
    // 人工调整打包代码顺序，通过注释手工写一些依赖
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
//     // require('./util/guid');
//     // require('./util/next-tick');
//     // require('./browser/ie');
//     // require('./browser/ie-old-than-9');
//     // require('./util/indexed-list');
//     // require('./browser/auto-close-tags');
//     // require('./util/data-types.js');
//     // require('./util/create-data-types-checker.js');
//     // require('./parser/walker');
//     // require('./parser/create-a-node');
//     // require('./parser/parse-template');
//     // require('./runtime/change-expr-compare');
//     // require('./runtime/data-change-type');
//     // require('./runtime/data');
//     // require('./runtime/escape-html');
//     // require('./runtime/default-filters');
//     // require('./runtime/binary-op');
//     // require('./runtime/eval-expr');
//     // require('./view/life-cycle');
//     // require('./view/gen-stump-html');
//     // require('./view/create-text');
//     // require('./view/get-prop-handler');
//     // require('./view/is-data-change-by-element');
//     // require('./view/event-declaration-listener');
//     // require('./view/gen-element-start-html');
//     // require('./view/gen-element-end-html');
//     // require('./view/gen-element-childs-html');
//     // require('./view/create-node');
//     // require('./parser/parse-anode-from-el');
//     // require('./view/from-el-init-childs');


    /**
 * @file 空函数
 * @author errorrik(errorrik@gmail.com)
 */


/**
 * 啥都不干
 */
function empty() {}

// exports = module.exports = empty;


/**
 * @file 属性拷贝
 * @author errorrik(errorrik@gmail.com)
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
        if (source.hasOwnProperty(key)) {
            target[key] = source[key];
        }
    }

    return target;
}

// exports = module.exports = extend;


/**
 * @file 构建类之间的继承关系
 * @author errorrik(errorrik@gmail.com)
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
 * @file bind函数
 * @author errorrik(errorrik@gmail.com)
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
    if (nativeBind && func.bind === nativeBind) {
        return nativeBind.apply(func, slice.call(arguments, 1));
    }

    var args = slice.call(arguments, 2);
    return function () {
        return func.apply(thisArg, args.concat(slice.call(arguments)));
    };
}

// exports = module.exports = bind;


/**
 * @file 遍历数组
 * @author errorrik(errorrik@gmail.com)
 */

// var bind = require('./bind');

/**
 * 遍历数组集合
 *
 * @param {Array} array 数组源
 * @param {function(Any,number):boolean} iterator 遍历函数
 * @param {Object=} thisArg this指向对象
 */
function each(array, iterator, thisArg) {
    if (array && array.length > 0) {
        if (thisArg) {
            iterator = bind(iterator, thisArg);
        }

        for (var i = 0, l = array.length; i < l; i++) {
            if (iterator(array[i], i) === false) {
                break;
            }
        }
    }
}

// exports = module.exports = each;


/**
 * @file 判断数组中是否包含某项
 * @author errorrik(errorrik@gmail.com)
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
 * @file DOM 事件挂载
 * @author errorrik(errorrik@gmail.com)
 */

/**
 * DOM 事件挂载
 *
 * @inner
 * @param {HTMLElement} el DOM元素
 * @param {string} eventName 事件名
 * @param {Function} listener 监听函数
 */
function on(el, eventName, listener) {
    if (el.addEventListener) {
        el.addEventListener(eventName, listener, false);
    }
    else {
        el.attachEvent('on' + eventName, listener);
    }
}

// exports = module.exports = on;


/**
 * @file DOM 事件卸载
 * @author errorrik(errorrik@gmail.com)
 */

/**
 * DOM 事件卸载
 *
 * @inner
 * @param {HTMLElement} el DOM元素
 * @param {string} eventName 事件名
 * @param {Function} listener 监听函数
 */
function un(el, eventName, listener) {
    if (el.addEventListener) {
        el.removeEventListener(eventName, listener, false);
    }
    else {
        el.detachEvent('on' + eventName, listener);
    }
}

// exports = module.exports = un;


/**
 * @file SVG标签表
 * @author errorrik(errorrik@gmail.com)
 */

// var each = require('../util/each');

/**
 * svgTags
 *
 * @see https://www.w3.org/TR/SVG/svgdtd.html 只取常用
 * @type {Object}
 */
var svgTags = {};
each((''
        // structure
        + 'svg,g,defs,desc,metadata,symbol,use,'
        // image & shape
        + 'image,path,rect,circle,line,ellipse,polyline,polygon,'
        // text
        + 'text,tspan,tref,textpath,'
        // other
        + 'marker,pattern,clippath,mask,filter,cursor,view,animate,'
        // font
        + 'font,font-face,glyph,missing-glyph'
    ).split(','),
    function (key) {
        svgTags[key] = 1;
    }
);

// exports = module.exports = svgTags;


/**
 * @file DOM创建
 * @author errorrik(errorrik@gmail.com)
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
 * @file 移除DOM
 * @author errorrik(errorrik@gmail.com)
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
 * @file 生成唯一id
 * @author errorrik(errorrik@gmail.com)
 */


/**
 * 唯一id的起始值
 *
 * @inner
 * @type {number}
 */
var guidIndex = 1;

/**
 * 获取唯一id
 *
 * @inner
 * @return {string} 唯一id
 */
function guid() {
    return '_san_' + (guidIndex++);
}

// exports = module.exports = guid;


/**
 * @file 在下一个时间周期运行任务
 * @author errorrik(errorrik@gmail.com)
 */

// var bind = require('./bind');
// var each = require('./each');

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

        each(tasks, function (task) {
            task();
        });
    };

    if (typeof MutationObserver === 'function') {
        var num = 1;
        var observer = new MutationObserver(nextHandler);
        var text = document.createTextNode(num);
        observer.observe(text, {
            characterData: true
        });
        text.data = ++num;
    }
    else if (typeof setImmediate === 'function') {
        setImmediate(nextHandler);
    }
    else {
        setTimeout(nextHandler, 0);
    }
}

// exports = module.exports = nextTick;


/**
 * @file ie版本号
 * @author errorrik(errorrik@gmail.com)
 */

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
var ie = ieVersionMatch ? ieVersionMatch[1] - 0 : 0;

// exports = module.exports = ie;


/**
 * @file 是否 IE 并且小于 9
 * @author errorrik(errorrik@gmail.com)
 */

// var ie = require('./ie');

// HACK: IE8下，设置innerHTML时如果以script开头，script会被自动滤掉
//       为了保证script的stump存在，前面加个零宽特殊字符
//       IE8下，innerHTML还不支持custom element，所以需要用div替代，不用createElement

/**
 * 是否 IE 并且小于 9
 */
var ieOldThan9 = ie && ie < 9;

// exports = module.exports = ieOldThan9;


/**
 * @file 索引列表
 * @author errorrik(errorrik@gmail.com)
 */

// var each = require('./each');

/**
 * 索引列表，能根据 item 中的 name 进行索引
 *
 * @class
 */
function IndexedList() {
    this.raw = [];
    this.index = {};
}

/**
 * 在列表末尾添加 item
 *
 * @inner
 * @param {Object} item 要添加的对象
 */
IndexedList.prototype.push = function (item) {
    // #[begin] error
    if (!item.name) {
        throw new Error('[SAN ERROR] Miss "name" property');
    }
    // #[end]

    if (!this.index[item.name]) {
        this.raw.push(item);
        this.index[item.name] = item;
    }
};

/**
 * 根据 name 获取 item
 *
 * @inner
 * @param {string} name name
 * @return {Object}
 */
IndexedList.prototype.get = function (name) {
    return this.index[name];
};

/**
 * 遍历 items
 *
 * @inner
 * @param {function(*,Number):boolean} iterator 遍历函数
 * @param {Object} thisArg 遍历函数运行的this环境
 */
IndexedList.prototype.each = function (iterator, thisArg) {
    each(this.raw, iterator, thisArg);
};

/**
 * 根据 name 移除 item
 *
 * @inner
 * @param {string} name name
 */
IndexedList.prototype.remove = function (name) {
    this.index[name] = null;

    var len = this.raw.length;
    while (len--) {
        if (this.raw[len].name === name) {
            this.raw.splice(len, 1);
            break;
        }
    }
};

/**
 * 连接另外一个 IndexedList，返回一个新的 IndexedList
 *
 * @inner
 * @param {IndexedList} other 要连接的IndexedList
 * @return {IndexedList}
 */
IndexedList.prototype.concat = function (other) {
    var result = new IndexedList();
    each(this.raw.concat(other.raw), function (item) {
        result.push(item);
    });

    return result;
};


// exports = module.exports = IndexedList;


/**
 * @file 自闭合标签表
 * @author errorrik(errorrik@gmail.com)
 */

// var each = require('../util/each');

/**
 * 自闭合标签列表
 *
 * @type {Object}
 */
var autoCloseTags = {};
each(
    'area,base,br,col,embed,hr,img,input,keygen,param,source,track,wbr'.split(','),
    function (key) {
        autoCloseTags[key] = 1;
    }
);

// exports = module.exports = autoCloseTags;


/**
 * @file data types
 * @author leon <ludafa@outlook.com>
 */

// var bind = require('./bind');
// var empty = require('./empty');
// var extend = require('./extend');

// #[begin] error
var ANONYMOUS_CLASS_NAME = '<<anonymous>>';

/**
 * 获取精确的类型
 *
 * @NOTE 如果 obj 是一个 DOMElement，我们会返回 `element`；
 *
 * @param  {*} obj 目标
 * @return {string}
 */
function getDataType(obj) {

    if (obj && obj.nodeType === 1) {
        return 'element';
    }

    return Object.prototype.toString
        .call(obj)
        .slice(8, -1)
        .toLowerCase();
}
// #[end]

/**
 * 创建链式的数据类型校验器
 *
 * @param  {Function} validate 真正的校验器
 * @return {Function}
 */
function createChainableChecker(validate) {
    var chainedChecker = function () {};
    chainedChecker.isRequired = empty;

    // 只在 error 功能启用时才有实际上的 dataTypes 检测
    // #[begin] error
    var checkType = function (isRequired, data, dataName, componentName, fullDataName) {

        var dataValue = data[dataName];
        var dataType = getDataType(dataValue);

        componentName = componentName || ANONYMOUS_CLASS_NAME;

        // 如果是 null 或 undefined，那么要提前返回啦
        if (dataValue == null) {
            // 是 required 就报错
            if (isRequired) {
                throw new Error('[SAN ERROR] '
                    + 'The `' + dataName + '` '
                    + 'is marked as required in `' + componentName + '`, '
                    + 'but its value is ' + dataType
                );
            }
            // 不是 required，那就是 ok 的
            return;
        }

        validate(data, dataName, componentName, fullDataName);

    };

    chainedChecker = bind(checkType, null, false);
    chainedChecker.isRequired = bind(checkType, null, true);
    // #[end]



    return chainedChecker;

}

// #[begin] error
/**
 * 生成主要类型数据校验器
 *
 * @param  {string} type 主类型
 * @return {Function}
 */
function createPrimaryTypeChecker(type) {

    return createChainableChecker(function (data, dataName, componentName, fullDataName) {

        var dataValue = data[dataName];
        var dataType = getDataType(dataValue);

        if (dataType !== type) {
            throw new Error('[SAN ERROR] '
                + 'Invalid ' + componentName + ' data `' + fullDataName + '` of type'
                + '(' + dataType + ' supplied to ' + componentName + ', '
                + 'expected ' + type + ')'
            );
        }

    });

}



/**
 * 生成 arrayOf 校验器
 *
 * @param  {Function} arrayItemChecker 数组中每项数据的校验器
 * @return {Function}
 */
function createArrayOfChecker(arrayItemChecker) {

    return createChainableChecker(function (data, dataName, componentName, fullDataName) {

        if (typeof arrayItemChecker !== 'function') {
            throw new Error('[SAN ERROR] '
                + 'Data `' + dataName + '` of `' + componentName + '` has invalid '
                + 'DataType notation inside `arrayOf`, expected `function`'
            );
        }

        var dataValue = data[dataName];
        var dataType = getDataType(dataValue);

        if (dataType !== 'array') {
            throw new Error('[SAN ERROR] '
                + 'Invalid ' + componentName + ' data `' + fullDataName + '` of type'
                + '(' + dataType + ' supplied to ' + componentName + ', '
                + 'expected array)'
            );
        }

        for (var i = 0, len = dataValue.length; i < len; i++) {
            arrayItemChecker(dataValue, i, componentName, fullDataName + '[' + i + ']');
        }

    });

}

/**
 * 生成 instanceOf 检测器
 *
 * @param  {Function|Class} expectedClass 期待的类
 * @return {Function}
 */
function createInstanceOfChecker(expectedClass) {

    return createChainableChecker(function (data, dataName, componentName, fullDataName) {

        var dataValue = data[dataName];

        if (dataValue instanceof expectedClass) {
            return;
        }

        var dataValueClassName = dataValue.constructor && dataValue.constructor.name
            ? dataValue.constructor.name
            : ANONYMOUS_CLASS_NAME;

        var expectedClassName = expectedClass.name || ANONYMOUS_CLASS_NAME;

        throw new Error('[SAN ERROR] '
            + 'Invalid ' + componentName + ' data `' + fullDataName + '` of type'
            + '(' + dataValueClassName + ' supplied to ' + componentName + ', '
            + 'expected instance of ' + expectedClassName + ')'
        );


    });

}

/**
 * 生成 shape 校验器
 *
 * @param  {Object} shapeTypes shape 校验规则
 * @return {Function}
 */
function createShapeChecker(shapeTypes) {

    return createChainableChecker(function (data, dataName, componentName, fullDataName) {

        if (getDataType(shapeTypes) !== 'object') {
            throw new Error('[SAN ERROR] '
                + 'Data `' + fullDataName + '` of `' + componentName + '` has invalid '
                + 'DataType notation inside `shape`, expected `object`'
            );
        }

        var dataValue = data[dataName];
        var dataType = getDataType(dataValue);

        if (dataType !== 'object') {
            throw new Error('[SAN ERROR] '
                + 'Invalid ' + componentName + ' data `' + fullDataName + '` of type'
                + '(' + dataType + ' supplied to ' + componentName + ', '
                + 'expected object)'
            );
        }

        for (var shapeKeyName in shapeTypes) {
            if (shapeTypes.hasOwnProperty(shapeKeyName)) {
                var checker = shapeTypes[shapeKeyName];
                if (typeof checker === 'function') {
                    checker(dataValue, shapeKeyName, componentName, fullDataName + '.' + shapeKeyName);
                }
            }
        }

    });

}

/**
 * 生成 oneOf 校验器
 *
 * @param  {Array} expectedEnumValues 期待的枚举值
 * @return {Function}
 */
function createOneOfChecker(expectedEnumValues) {

    return createChainableChecker(function (data, dataName, componentName, fullDataName) {

        if (getDataType(expectedEnumValues) !== 'array') {
            throw new Error('[SAN ERROR] '
                + 'Data `' + fullDataName + '` of `' + componentName + '` has invalid '
                + 'DataType notation inside `oneOf`, array is expected.'
            );
        }

        var dataValue = data[dataName];

        for (var i = 0, len = expectedEnumValues.length; i < len; i++) {
            if (dataValue === expectedEnumValues[i]) {
                return;
            }
        }

        throw new Error('[SAN ERROR] '
            + 'Invalid ' + componentName + ' data `' + fullDataName + '` of value'
            + '(`' + dataValue + '` supplied to ' + componentName + ', '
            + 'expected one of ' + expectedEnumValues.join(',') + ')'
        );

    });

}

/**
 * 生成 oneOfType 校验器
 *
 * @param  {Array<Function>} expectedEnumOfTypeValues 期待的枚举类型
 * @return {Function}
 */
function createOneOfTypeChecker(expectedEnumOfTypeValues) {

    return createChainableChecker(function (data, dataName, componentName, fullDataName) {

        if (getDataType(expectedEnumOfTypeValues) !== 'array') {
            throw new Error('[SAN ERROR] '
                + 'Data `' + dataName + '` of `' + componentName + '` has invalid '
                + 'DataType notation inside `oneOf`, array is expected.'
            );
        }

        var dataValue = data[dataName];

        for (var i = 0, len = expectedEnumOfTypeValues.length; i < len; i++) {

            var checker = expectedEnumOfTypeValues[i];

            if (typeof checker !== 'function') {
                continue;
            }

            try {
                checker(data, dataName, componentName, fullDataName);
                // 如果 checker 完成校验没报错，那就返回了
                return;
            }
            catch (e) {
                // 如果有错误，那么应该把错误吞掉
            }

        }

        // 所有的可接受 type 都失败了，才丢一个异常
        throw new Error('[SAN ERROR] '
            + 'Invalid ' + componentName + ' data `' + dataName + '` of value'
            + '(`' + dataValue + '` supplied to ' + componentName + ')'
        );

    });

}

/**
 * 生成 objectOf 校验器
 *
 * @param  {Function} typeChecker 对象属性值校验器
 * @return {Function}
 */
function createObjectOfChecker(typeChecker) {

    return createChainableChecker(function (data, dataName, componentName, fullDataName) {

        if (typeof typeChecker !== 'function') {
            throw new Error('[SAN ERROR] '
                + 'Data `' + dataName + '` of `' + componentName + '` has invalid '
                + 'DataType notation inside `objectOf`, expected function'
            );
        }

        var dataValue = data[dataName];
        var dataType = getDataType(dataValue);

        if (dataType !== 'object') {
            throw new Error('[SAN ERROR] '
                + 'Invalid ' + componentName + ' data `' + dataName + '` of type'
                + '(' + dataType + ' supplied to ' + componentName + ', '
                + 'expected object)'
            );
        }

        for (var dataKeyName in dataValue) {
            if (dataValue.hasOwnProperty(dataKeyName)) {
                typeChecker(
                    dataValue,
                    dataKeyName,
                    componentName,
                    fullDataName + '.' + dataKeyName
                );
            }
        }


    });

}

/**
 * 生成 exact 校验器
 *
 * @param  {Object} shapeTypes object 形态定义
 * @return {Function}
 */
function createExactChecker(shapeTypes) {

    return createChainableChecker(function (data, dataName, componentName, fullDataName, secret) {

        if (getDataType(shapeTypes) !== 'object') {
            throw new Error('[SAN ERROR] '
                + 'Data `' + dataName + '` of `' + componentName + '` has invalid '
                + 'DataType notation inside `exact`'
            );
        }

        var dataValue = data[dataName];
        var dataValueType = getDataType(dataValue);

        if (dataValueType !== 'object') {
            throw new Error('[SAN ERROR] '
                + 'Invalid data `' + fullDataName + '` of type `' + dataValueType + '`'
                + '(supplied to ' + componentName + ', expected `object`)'
            );
        }

        var allKeys = {};

        // 先合入 shapeTypes
        extend(allKeys, shapeTypes);
        // 再合入 dataValue
        extend(allKeys, dataValue);
        // 保证 allKeys 的类型正确

        for (var key in allKeys) {
            if (allKeys.hasOwnProperty(key)) {
                var checker = shapeTypes[key];

                // dataValue 中有一个多余的数据项
                if (!checker) {
                    throw new Error('[SAN ERROR] '
                        + 'Invalid data `' + fullDataName + '` key `' + key + '` '
                        + 'supplied to `' + componentName + '`. '
                        + '(`' + key + '` is not defined in `DataTypes.exact`)'
                    );
                }

                if (!(key in dataValue)) {
                    throw new Error('[SAN ERROR] '
                        + 'Invalid data `' + fullDataName + '` key `' + key + '` '
                        + 'supplied to `' + componentName + '`. '
                        + '(`' + key + '` is marked `required` in `DataTypes.exact`)'
                    );
                }

                checker(
                    dataValue,
                    key,
                    componentName,
                    fullDataName + '.' + key,
                    secret
                );

            }
        }

    });

}
// #[end]



/* eslint-disable fecs-valid-var-jsdoc */
var DataTypes = {
    array: createChainableChecker(empty),
    object: createChainableChecker(empty),
    func: createChainableChecker(empty),
    string: createChainableChecker(empty),
    number: createChainableChecker(empty),
    bool: createChainableChecker(empty),
    symbol: createChainableChecker(empty),
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
DataTypes = {

    any: createChainableChecker(empty),

    // 类型检测
    array: createPrimaryTypeChecker('array'),
    object: createPrimaryTypeChecker('object'),
    func: createPrimaryTypeChecker('function'),
    string: createPrimaryTypeChecker('string'),
    number: createPrimaryTypeChecker('number'),
    bool: createPrimaryTypeChecker('boolean'),
    symbol: createPrimaryTypeChecker('symbol'),

    // 复合类型检测
    arrayOf: createArrayOfChecker,
    instanceOf: createInstanceOfChecker,
    shape: createShapeChecker,
    oneOf: createOneOfChecker,
    oneOfType: createOneOfTypeChecker,
    objectOf: createObjectOfChecker,
    exact: createExactChecker

};
/* eslint-enable fecs-valid-var-jsdoc */
// #[end]


// module.exports = DataTypes;


/**
 * @file 创建数据检测函数
 * @author leon<ludafa@outlook.com>
 */


// #[begin] error

/**
 * 创建数据检测函数
 *
 * @param  {Object} dataTypes     数据格式
 * @param  {string} componentName 组件名
 * @return {Function}
 */
function createDataTypesChecker(dataTypes, componentName) {

    /**
     * 校验 data 是否满足 data types 的格式
     *
     * @param  {*} data 数据
     */
    return function (data) {

        for (var dataTypeName in dataTypes) {

            if (dataTypes.hasOwnProperty(dataTypeName)) {

                var dataTypeChecker = dataTypes[dataTypeName];

                if (typeof dataTypeChecker !== 'function') {
                    throw new Error('[SAN ERROR] '
                        + componentName + ':' + dataTypeName + ' is invalid; '
                        + 'it must be a function, usually from san.DataTypes'
                    );
                }

                dataTypeChecker(
                    data,
                    dataTypeName,
                    componentName,
                    dataTypeName
                );


            }
        }

    };

}

// #[end]

// module.exports = createDataTypesChecker;


/**
 * @file 字符串源码读取类
 * @author errorrik(errorrik@gmail.com)
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
    return this.charCode(this.index);
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
 *
 * @param {number=} charCode 指定字符的code
 * @return {boolean} 当指定字符时，返回是否碰到指定的字符
 */
Walker.prototype.goUntil = function (charCode) {
    var code;
    while (this.index < this.len && (code = this.currentCode())) {
        switch (code) {
            case 32:
            case 9:
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
 * @return {Array}
 */
Walker.prototype.match = function (reg) {
    reg.lastIndex = this.index;

    var match = reg.exec(this.source);
    if (match) {
        this.index = reg.lastIndex;
    }

    return match;
};

// exports = module.exports = Walker;



/**
 * @file 表达式类型
 * @author errorrik(errorrik@gmail.com)
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
    TERTIARY: 10
};

// exports = module.exports = ExprType;


/**
 * @file 读取字符串
 * @author errorrik(errorrik@gmail.com)
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
        type: ExprType.STRING,
        value: (new Function('return ' + literal))()
    };
}

// exports = module.exports = readString;


/**
 * @file 读取数字
 * @author errorrik(errorrik@gmail.com)
 */


// var ExprType = require('./expr-type');

/**
 * 读取数字
 *
 * @inner
 * @param {Walker} walker 源码读取对象
 * @return {Object}
 */
function readNumber(walker) {
    var match = walker.match(/\s*(-?[0-9]+(.[0-9]+)?)/g);

    return {
        type: ExprType.NUMBER,
        value: match[1] - 0
    };
}

// exports = module.exports = readNumber;


/**
 * @file 读取ident
 * @author errorrik(errorrik@gmail.com)
 */

/**
 * 读取ident
 *
 * @inner
 * @param {Walker} walker 源码读取对象
 * @return {string}
 */
function readIdent(walker) {
    var match = walker.match(/\s*([\$0-9a-z_]+)/ig);
    return match[1];
}

// exports = module.exports = readIdent;


/**
 * @file 读取三元表达式
 * @author errorrik(errorrik@gmail.com)
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
                type: ExprType.TERTIARY,
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
 * @file 读取访问表达式
 * @author errorrik(errorrik@gmail.com)
 */

// var ExprType = require('./expr-type');
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
                type: ExprType.BOOL,
                value: firstSeg === 'true'
            };
    }

    var result = {
        type: ExprType.ACCESSOR,
        paths: [
            {
                type: ExprType.STRING,
                value: firstSeg
            }
        ]
    };

    /* eslint-disable no-constant-condition */
    accessorLoop: while (1) {
    /* eslint-enable no-constant-condition */

        switch (walker.currentCode()) {
            case 46: // .
                walker.go(1);

                // ident as string
                result.paths.push({
                    type: ExprType.STRING,
                    value: readIdent(walker)
                });
                break;

            case 91: // [
                walker.go(1);
                result.paths.push(readTertiaryExpr(walker));
                walker.goUntil(93);  // ]
                break;

            default:
                break accessorLoop;
        }
    }

    return result;
}

// exports = module.exports = readAccessor;


/**
 * @file 读取括号表达式
 * @author errorrik(errorrik@gmail.com)
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
    walker.goUntil(41);  // )

    return expr;
}

// exports = module.exports = readParenthesizedExpr;


/**
 * @file 读取一元表达式
 * @author errorrik(errorrik@gmail.com)
 */

// var ExprType = require('./expr-type');
// var readString = require('./read-string');
// var readNumber = require('./read-number');
// var readAccessor = require('./read-accessor');
// var readParenthesizedExpr = require('./read-parenthesized-expr');


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
                type: ExprType.UNARY,
                expr: readUnaryExpr(walker)
            };
        case 34: // "
        case 39: // '
            return readString(walker);
        case 45: // number
        case 48:
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
    }

    return readAccessor(walker);
}

// exports = module.exports = readUnaryExpr;


/**
 * @file 读取乘法表达式
 * @author errorrik(errorrik@gmail.com)
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
    walker.goUntil();

    var code = walker.currentCode();
    switch (code) {
        case 37: // %
        case 42: // *
        case 47: // /
            walker.go(1);
            return {
                type: ExprType.BINARY,
                operator: code,
                segs: [expr, readMultiplicativeExpr(walker)]
            };
    }

    return expr;
}

// exports = module.exports = readMultiplicativeExpr;


/**
 * @file 读取加法表达式
 * @author errorrik(errorrik@gmail.com)
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
    walker.goUntil();

    var code = walker.currentCode();
    switch (code) {
        case 43: // +
        case 45: // -
            walker.go(1);
            return {
                type: ExprType.BINARY,
                operator: code,
                segs: [expr, readAdditiveExpr(walker)]
            };
    }

    return expr;
}

// exports = module.exports = readAdditiveExpr;


/**
 * @file 读取关系判断表达式
 * @author errorrik(errorrik@gmail.com)
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
                type: ExprType.BINARY,
                operator: code,
                segs: [expr, readRelationalExpr(walker)]
            };
    }

    return expr;
}

// exports = module.exports = readRelationalExpr;


/**
 * @file 读取相等比对表达式
 * @author errorrik(errorrik@gmail.com)
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
                    type: ExprType.BINARY,
                    operator: code,
                    segs: [expr, readEqualityExpr(walker)]
                };
            }

            walker.go(-1);
    }

    return expr;
}

// exports = module.exports = readEqualityExpr;


/**
 * @file 读取逻辑与表达式
 * @author errorrik(errorrik@gmail.com)
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
                type: ExprType.BINARY,
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
 * @file 读取逻辑或表达式
 * @author errorrik(errorrik@gmail.com)
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
                type: ExprType.BINARY,
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
 * @file 读取调用
 * @author errorrik(errorrik@gmail.com)
 */

// var ExprType = require('./expr-type');
// var readIdent = require('./read-ident');
// var readTertiaryExpr = require('./read-tertiary-expr');

/**
 * 读取调用
 *
 * @param {Walker} walker 源码读取对象
 * @return {Object}
 */
function readCall(walker) {
    walker.goUntil();
    var ident = readIdent(walker);
    var args = [];

    if (walker.goUntil(40)) { // (
        while (!walker.goUntil(41)) { // )
            args.push(readTertiaryExpr(walker));
            walker.goUntil(44); // ,
        }
    }

    return {
        type: ExprType.CALL,
        name: ident,
        args: args
    };
}

// exports = module.exports = readCall;


/**
 * @file 解析插值替换
 * @author errorrik(errorrik@gmail.com)
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
    var expr = readTertiaryExpr(walker);

    var filters = [];
    while (walker.goUntil(124)) { // |
        filters.push(readCall(walker));
    }

    return {
        type: ExprType.INTERP,
        expr: expr,
        filters: filters
    };
}

// exports = module.exports = parseInterp;


/**
 * @file 解析文本
 * @author errorrik(errorrik@gmail.com)
 */

// var Walker = require('./walker');
// var ExprType = require('./expr-type');
// var parseInterp = require('./parse-interp');

/**
 * 解析文本
 *
 * @param {string} source 源码
 * @return {Object}
 */
function parseText(source) {
    var exprStartReg = /\{\{\s*([\s\S]+?)\s*\}\}/ig;
    var exprMatch;

    var walker = new Walker(source);
    var beforeIndex = 0;

    var segs = [];
    function pushStringToSeg(text) {
        text && segs.push({
            type: ExprType.STRING,
            value: text
        });
    }

    while ((exprMatch = walker.match(exprStartReg)) != null) {
        pushStringToSeg(walker.cut(
            beforeIndex,
            walker.index - exprMatch[0].length
        ));
        segs.push(parseInterp(exprMatch[1]));
        beforeIndex = walker.index;
    }

    pushStringToSeg(walker.cut(beforeIndex));

    var expr = {
        type: ExprType.TEXT,
        segs: segs,
        raw: source
    };

    if (segs.length === 1 && segs[0].type === ExprType.STRING) {
        expr.value = segs[0].value;
    }

    return expr;
}

// exports = module.exports = parseText;


/**
 * @file 模板解析生成的抽象节点
 * @author errorrik(errorrik@gmail.com)
 */

// var IndexedList = require('../util/indexed-list');
// var parseText = require('./parse-text');

/**
 * 创建模板解析生成的抽象节点
 *
 * @class
 * @param {Object=} options 节点参数
 * @param {string=} options.tagName 标签名
 * @param {ANode=} options.parent 父节点
 * @param {boolean=} options.isText 是否文本节点
 */
function createANode(options) {
    options = options || {};

    if (options.isText) {
        options.textExpr = parseText(options.text);
    }
    else {
        options.directives = options.directives || new IndexedList();
        options.props = options.props || new IndexedList();
        options.events = options.events || [];
        options.childs = options.childs || [];
    }

    return options;
}

// exports = module.exports = createANode;


/**
 * @file 解析表达式
 * @author errorrik(errorrik@gmail.com)
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
    if (typeof source === 'object' && source.type) {
        return source;
    }

    var expr = readTertiaryExpr(new Walker(source));
    expr.raw = source;
    return expr;
}

// exports = module.exports = parseExpr;


/**
 * @file 解析调用
 * @author errorrik(errorrik@gmail.com)
 */


// var Walker = require('./walker');
// var readCall = require('./read-call');

/**
 * 解析调用
 *
 * @param {string} source 源码
 * @return {Object}
 */
function parseCall(source) {
    var expr = readCall(new Walker(source));
    expr.raw = source;
    return expr;
}

// exports = module.exports = parseCall;


/**
 * @file 解析指令
 * @author errorrik(errorrik@gmail.com)
 */


// var Walker = require('./walker');
// var parseExpr = require('./parse-expr');
// var parseText = require('./parse-text');
// var parseInterp = require('./parse-interp');
// var readAccessor = require('./read-accessor');

/**
 * 指令解析器
 *
 * @inner
 * @type {Object}
 */
var directiveParsers = {
    'for': function (value) {
        var walker = new Walker(value);
        var match = walker.match(/^\s*([\$0-9a-z_]+)(\s*,\s*([\$0-9a-z_]+))?\s+in\s+/ig);

        if (match) {
            return {
                item: parseExpr(match[1]),
                index: parseExpr(match[3] || '$index'),
                list: readAccessor(walker)
            };
        }

        // #[begin] error
        throw new Error('[SAN FATAL] for syntax error: ' + value);
        // #[end]
    },

    'ref': function (value) {
        return {
            value: parseText(value)
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

    'else': function (value) {
        return {
            value: 1
        };
    },

    'html': function (value) {
        return {
            value: parseInterp(value)
        };
    }
};

/**
 * 解析指令
 *
 * @param {ANode} aNode 抽象节点
 * @param {string} name 指令名称
 * @param {string} value 指令值
 */
function parseDirective(aNode, name, value) {
    var parser = directiveParsers[name];

    if (parser) {
        var result = parser(value);
        result.name = name;
        result.raw = value;

        aNode.directives.push(result);
    }
}

// exports = module.exports = parseDirective;


/**
 * @file 对属性信息进行处理
 * @author errorrik(errorrik@gmail.com)
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

    if (expr.type === ExprType.TEXT) {
        switch (expr.segs.length) {
            case 0:
                prop.expr = {
                    type: ExprType.BOOL,
                    value: true
                };
                break;

            case 1:
                expr = prop.expr = expr.segs[0];
                if (expr.type === ExprType.INTERP && expr.filters.length === 0) {
                    prop.expr = expr.expr;
                }
        }
    }
}

// exports = module.exports = postProp;


/**
 * @file 二元表达式操作函数
 * @author errorrik(errorrik@gmail.com)
 */

/**
 * 二元表达式操作函数
 *
 * @type {Object}
 */
var BinaryOp = {
    /* eslint-disable */
    37: function (a, b) {
        return a % b;
    },
    43: function (a, b) {
        return a + b;
    },
    45: function (a, b) {
        return a - b;
    },
    42: function (a, b) {
        return a * b;
    },
    47: function (a, b) {
        return a / b;
    },
    60: function (a, b) {
        return a < b;
    },
    62: function (a, b) {
        return a > b;
    },
    76: function (a, b) {
        return a && b;
    },
    94: function (a, b) {
        return a != b;
    },
    121: function (a, b) {
        return a <= b;
    },
    122: function (a, b) {
        return a == b;
    },
    123: function (a, b) {
        return a >= b;
    },
    155: function (a, b) {
        return a !== b;
    },
    183: function (a, b) {
        return a === b;
    },
    248: function (a, b) {
        return a || b;
    }
    /* eslint-enable */
};

// exports = module.exports = BinaryOp;


/**
 * @file HTML转义
 * @author errorrik(errorrik@gmail.com)
 */

/**
 * HTML Filter替换的字符实体表
 *
 * @const
 * @inner
 * @type {Object}
 */
var HTML_ENTITY = {
    /* jshint ignore:start */
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    /* eslint-disable quotes */
    "'": '&#39;'
    /* eslint-enable quotes */
    /* jshint ignore:end */
};

/**
 * HTML Filter的替换函数
 *
 * @inner
 * @param {string} c 替换字符
 * @return {string} 替换后的HTML字符实体
 */
function htmlFilterReplacer(c) {
    return HTML_ENTITY[c];
}

/**
 * HTML转义
 *
 * @param {string} source 源串
 * @return {string} 替换结果串
 */
function escapeHTML(source) {
    if (source == null) {
        return '';
    }

    return ('' + source).replace(/[&<>"']/g, htmlFilterReplacer);
}

// exports = module.exports = escapeHTML;


/**
 * @file 默认filter
 * @author errorrik(errorrik@gmail.com)
 */

// var escapeHTML = require('./escape-html');

/* eslint-disable fecs-camelcase */
/* eslint-disable guard-for-in */

/**
 * 默认filter
 *
 * @const
 * @type {Object}
 */
var DEFAULT_FILTERS = {

    /**
     * HTML转义filter
     *
     * @param {string} source 源串
     * @return {string} 替换结果串
     */
    html: escapeHTML,

    /**
     * URL编码filter
     *
     * @param {string} source 源串
     * @return {string} 替换结果串
     */
    url: encodeURIComponent,

    /**
     * 源串filter，用于在默认开启HTML转义时获取源串，不进行转义
     *
     * @param {string} source 源串
     * @return {string} 替换结果串
     */
    raw: function (source) {
        return source;
    },

    _class: function (source) {
        if (source instanceof Array) {
            return source.join(' ');
        }

        return source;
    },

    _style: function (source) {
        if (typeof source === 'object') {
            var result = '';
            for (var key in source) {
                result += key + ':' + source[key] + ';';
            }

            return result;
        }

        return source;
    },

    _sep: function (source, sep) {
        return source ? sep + source : source;
    }
};
/* eslint-enable fecs-camelcase */

// exports = module.exports = DEFAULT_FILTERS;


/**
 * @file 表达式计算
 * @author errorrik(errorrik@gmail.com)
 */

// var ExprType = require('../parser/expr-type');
// var BinaryOp = require('./binary-op');
// var DEFAULT_FILTERS = require('./default-filters');
// var escapeHTML = require('./escape-html');
// var each = require('../util/each');

/**
 * 计算表达式的值
 *
 * @param {Object} expr 表达式对象
 * @param {Data} data 数据容器对象
 * @param {Component=} owner 所属组件环境
 * @param {boolean?} escapeInterpHtml 是否对插值进行html转义
 * @return {*}
 */
function evalExpr(expr, data, owner, escapeInterpHtml) {
    if (expr.value != null) {
        return expr.value;
    }

    switch (expr.type) {
        case ExprType.UNARY:
            return !evalExpr(expr.expr, data, owner);

        case ExprType.BINARY:
            var opHandler = BinaryOp[expr.operator];
            if (typeof opHandler === 'function') {
                return opHandler(
                    evalExpr(expr.segs[0], data, owner),
                    evalExpr(expr.segs[1], data, owner)
                );
            }
            return;

        case ExprType.TERTIARY:
            return evalExpr(
                expr.segs[evalExpr(expr.segs[0], data, owner) ? 1 : 2],
                data,
                owner
            );

        case ExprType.ACCESSOR:
            return data.get(expr);

        case ExprType.INTERP:
            var value = evalExpr(expr.expr, data, owner);

            owner && each(expr.filters, function (filter) {
                var filterName = filter.name;
                /* eslint-disable no-use-before-define */
                var filterFn = owner.filters[filterName] || DEFAULT_FILTERS[filterName];
                /* eslint-enable no-use-before-define */

                if (typeof filterFn === 'function') {
                    var args = [value];
                    each(filter.args, function (arg) {
                        args.push(evalExpr(arg, data, owner));
                    });

                    value = filterFn.apply(owner, args);
                }
            });

            if (value == null) {
                value = '';
            }

            return value;

        case ExprType.TEXT:
            var buf = '';
            each(expr.segs, function (seg) {
                var segValue = evalExpr(seg, data, owner);

                // escape html
                if (escapeInterpHtml && seg.type === ExprType.INTERP && !seg.filters[0]) {
                    segValue = escapeHTML(segValue);
                }

                buf += segValue;
            });
            return buf;
    }
}

// exports = module.exports = evalExpr;


/**
 * @file 在节点环境执行表达式
 * @author errorrik(errorrik@gmail.com)
 */

// var evalExpr = require('../runtime/eval-expr');

/**
 * 在节点环境执行表达式
 *
 * @param {Object} node 节点对象
 * @param {Object} expr 表达式对象
 * @param {boolean} escapeInterpHtml 是否要对插值结果进行html转义
 * @return {*}
 */
function nodeEvalExpr(node, expr, escapeInterpHtml) {
    return evalExpr(expr, node.scope, node.owner, escapeInterpHtml);
}

// exports = module.exports = nodeEvalExpr;


/**
 * @file 节点类型
 * @author errorrik(errorrik@gmail.com)
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
    SLOT: 6
};

// exports = module.exports = NodeType;


/**
 * @file 判断一个node是否组件
 * @author errorrik(errorrik@gmail.com)
 */

// var NodeType = require('./node-type');

/**
 * 判断一个node是否组件
 *
 * @param {Node} node 节点实例
 * @return {boolean}
 */
function isComponent(node) {
    return node && node._type === NodeType.CMPT;
}

// exports = module.exports = isComponent;


/**
 * @file 获取属性处理对象
 * @author errorrik(errorrik@gmail.com)
 */

// var contains = require('../util/contains');
// var empty = require('../util/empty');
// var svgTags = require('../browser/svg-tags');
// var evalExpr = require('../runtime/eval-expr');
// var nodeEvalExpr = require('./node-eval-expr');
// var isComponent = require('./is-component');


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
    'for': 'htmlFor',
    'class': 'className'
};

/**
 * 默认的元素的属性设置的变换方法
 *
 * @inner
 * @type {Object}
 */
var defaultElementPropHandler = {
    attr: function (element, name, value) {
        if (value != null) {
            return ' ' + name + '="' + value + '"';
        }
    },

    prop: function (element, name, value) {
        var propName = HTML_ATTR_PROP_MAP[name] || name;
        var el = element.el;

        // input 的 type 是个特殊属性，其实也应该用 setAttribute
        // 但是 type 不应该运行时动态改变，否则会有兼容性问题
        // 所以这里直接就不管了
        if (svgTags[element.tagName] || !(propName in el)) {
            el.setAttribute(name, value);
        }
        else {
            el[propName] = value;
        }

        // attribute 绑定的是 text，所以不会出现 null 的情况，这里无需处理
        // 换句话来说，san 是做不到 attribute 时有时无的
        // if (value == null) {
        //     el.removeAttribute(name);
        // }
    },

    output: function (element, bindInfo, data) {
        data.set(bindInfo.expr, element.el[bindInfo.name], {
            target: {
                id: element.id,
                prop: bindInfo.name
            }
        });
    }
};

/**
 * 默认的属性设置变换方法
 *
 * @inner
 * @type {Object}
 */
var defaultElementPropHandlers = {
    style: {
        attr: function (element, name, value) {
            if (value != null) {
                return ' style="' + value + '"';
            }
        },

        prop: function (element, name, value) {
            element.el.style.cssText = value;
        }
    },

    draggable: genBoolPropHandler('draggable'),
    readonly: genBoolPropHandler('readonly'),
    disabled: genBoolPropHandler('disabled')
};

var checkedPropHandler = genBoolPropHandler('checked');
var analInputChecker = {
    checkbox: contains,
    radio: function (a, b) {
        return a === b;
    }
};

function analInputCheckedState(element, value, oper) {
    var bindValue = element.props.get('value');
    var bindType = element.props.get('type');

    if (bindValue && bindType) {
        var type = nodeEvalExpr(element, bindType.expr);

        if (analInputChecker[type]) {
            var bindChecked = element.props.get('checked');
            if (!bindChecked.hintExpr) {
                bindChecked.hintExpr = bindValue.expr;
            }

            var checkedState = analInputChecker[type](
                value,
                nodeEvalExpr(element, bindValue.expr)
            );

            switch (oper) {
                case 'attr':
                    return checkedState ? ' checked="checked"' : '';

                case 'prop':
                    element.el.checked = checkedState;
                    return;
            }
        }
    }

    return checkedPropHandler[oper](element, 'checked', value);
}

var elementPropHandlers = {
    input: {
        mutiple: genBoolPropHandler('mutiple'),
        checked: {
            attr: function (element, name, value) {
                return analInputCheckedState(element, value, 'attr');
            },

            prop: function (element, name, value) {
                analInputCheckedState(element, value, 'prop');
            },

            output: function (element, bindInfo, data) {
                var el = element.el;
                var bindValue = element.props.get('value');
                var bindType = element.props.get('type') || {};

                if (bindValue && bindType) {
                    switch (bindType.raw) {
                        case 'checkbox':
                            data[el.checked ? 'push' : 'remove'](bindInfo.expr, el.value);
                            return;

                        case 'radio':
                            el.checked && data.set(bindInfo.expr, el.value, {
                                target: {
                                    id: element.id,
                                    prop: bindInfo.name
                                }
                            });
                            return;
                    }
                }

                defaultElementPropHandler.output(element, bindInfo, data);
            }
        }
    },

    textarea: {
        value: {
            attr: empty,
            prop: defaultElementPropHandler.prop,
            output: defaultElementPropHandler.output
        }
    },

    option: {
        value: {
            attr: function (element, name, value) {
                var attrStr = ' value="' + (value || '') + '"';
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

                    if ((prop = parentSelect.props.get('value'))
                        && (expr = prop.expr)
                    ) {
                        selectValue = isComponent(parentSelect)
                                ? evalExpr(expr, parentSelect.data, parentSelect)
                                : nodeEvalExpr(parentSelect, expr)
                            || '';
                    }

                    if (selectValue === value) {
                        attrStr += ' selected';
                    }
                }

                return attrStr;
            },

            prop: defaultElementPropHandler.prop
        }
    },

    select: {
        value: {
            attr: empty,
            prop: function (element, name, value) {
                element.el.value = value || '';
            },

            output: defaultElementPropHandler.output
        }
    }
};

/**
 * 生成 bool 类型属性绑定操作的变换方法
 *
 * @inner
 * @param {string} attrName 属性名
 * @return {Object}
 */
function genBoolPropHandler(attrName) {
    return {
        attr: function (element, name, value) {
            // 因为元素的attr值必须经过html escape，否则可能有漏洞
            // 所以这里直接对假值字符串形式进行处理
            // NaN之类非主流的就先不考虑了
            var prop = element.props.get(name);
            if (prop && prop.raw === ''
                || value && value !== 'false' && value !== '0'
            ) {
                return ' ' + attrName;
            }
        },

        prop: function (element, name, value) {
            var propName = HTML_ATTR_PROP_MAP[attrName] || attrName;
            element.el[propName] = !!(value && value !== 'false' && value !== '0');
        }
    };
}


/**
 * 获取属性处理对象
 *
 * @param {Element} element 元素实例
 * @param {string} name 属性名
 * @return {Object}
 */
function getPropHandler(element, name) {
    var tagPropHandlers = elementPropHandlers[element.tagName];
    if (!tagPropHandlers) {
        tagPropHandlers = elementPropHandlers[element.tagName] = {};
    }

    var propHandler = tagPropHandlers[name];
    if (!propHandler) {
        propHandler = defaultElementPropHandlers[name] || defaultElementPropHandler;
        tagPropHandlers[name] = propHandler;
    }

    return propHandler;
}

// exports = module.exports = getPropHandler;


/**
 * @file 解析抽象节点属性
 * @author errorrik(errorrik@gmail.com)
 */

// var each = require('../util/each');
// var parseExpr = require('./parse-expr');
// var parseCall = require('./parse-call');
// var parseText = require('./parse-text');
// var parseDirective = require('./parse-directive');
// var ExprType = require('./expr-type');
// var postProp = require('./post-prop');
// var getPropHandler = require('../view/get-prop-handler');

/**
 * 解析抽象节点属性
 *
 * @param {ANode} aNode 抽象节点
 * @param {string} name 属性名称
 * @param {string} value 属性值
 * @param {boolean=} ignoreNormal 是否忽略无前缀的普通属性
 */
function integrateAttr(aNode, name, value, ignoreNormal) {
    if (name === 'id') {
        aNode.id = value;
        return;
    }

    var prefixIndex = name.indexOf('-');
    var realName;
    var prefix;

    if (prefixIndex > 0) {
        prefix = name.slice(0, prefixIndex);
        realName = name.slice(prefixIndex + 1);
    }

    switch (prefix) {
        case 'on':
            aNode.events.push({
                name: realName,
                expr: parseCall(value)
            });
            break;

        case 'san':
        case 's':
            parseDirective(aNode, realName, value);
            break;

        case 'prop':
            integrateProp(aNode, realName, value);
            break;

        default:
            if (!ignoreNormal) {
                integrateProp(aNode, name, value);
            }
    }
}

/**
 * 解析抽象节点绑定属性
 *
 * @inner
 * @param {ANode} aNode 抽象节点
 * @param {string} name 属性名称
 * @param {string} value 属性值
 */
function integrateProp(aNode, name, value) {
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
        expr: parseText(value),
        raw: value
    };

    if (prop.expr.value != null && !/^(template|input|textarea|select|option)$/.test(aNode.tagName)) {
        prop.attr = getPropHandler(aNode, name).attr(aNode, name, value);
    }

    if (name === 'checked' && aNode.tagName === 'input') {
        postProp(prop);
    }

    // 这里不能把只有一个插值的属性抽取
    // 因为插值里的值可能是html片段，容易被注入
    // 组件的数据绑定在组件init时做抽取
    switch (prop.name) {
        case 'class':
        case 'style':
            each(prop.expr.segs, function (seg) {
                if (seg.type === ExprType.INTERP) {
                    seg.filters.push({
                        type: ExprType.CALL,
                        name: '_' + prop.name,
                        args: []
                    });
                }
            });
            break;
    }

    aNode.props.push(prop);
}


// exports = module.exports = integrateAttr;


/**
 * @file 解析模板
 * @author errorrik(errorrik@gmail.com)
 */


// var createANode = require('./create-a-node');
// var Walker = require('./walker');
// var integrateAttr = require('./integrate-attr');
// var autoCloseTags = require('../browser/auto-close-tags');

/* eslint-disable fecs-max-statements */

/**
 * 解析 template
 *
 * @param {string} source template源码
 * @param {Object?} options 解析参数
 * @param {string?} options.trimWhitespace 空白文本的处理策略。none|blank|all
 * @return {ANode}
 */
function parseTemplate(source, options) {
    options = options || {};
    options.trimWhitespace = options.trimWhitespace || 'none';

    var rootNode = createANode();

    if (typeof source !== 'string') {
        return rootNode;
    }

    source = source.replace(/<!--([\s\S]*?)-->/mg, '').replace(/(^\s+|\s+$)/g, '');
    var walker = new Walker(source);

    var tagReg = /<(\/)?([a-z0-9-]+)\s*/ig;
    var attrReg = /([-:0-9a-z\(\)\[\]]+)(=(['"])([^\3]*?)\3)?\s*/ig;

    var tagMatch;
    var currentNode = rootNode;
    var beforeLastIndex = 0;

    while ((tagMatch = walker.match(tagReg)) != null) {
        var tagEnd = tagMatch[1];
        var tagName = tagMatch[2].toLowerCase();

        pushTextNode(source.slice(
            beforeLastIndex,
            walker.index - tagMatch[0].length
        ));

        // 62: >
        // 47: /
        if (tagEnd && walker.currentCode() === 62) {
            // 满足关闭标签的条件时，关闭标签
            // 向上查找到对应标签，找不到时忽略关闭
            var closeTargetNode = currentNode;
            while (closeTargetNode && closeTargetNode.tagName !== tagName) {
                closeTargetNode = closeTargetNode.parent;
            }

            closeTargetNode && (currentNode = closeTargetNode.parent);
            walker.go(1);
        }
        else if (!tagEnd) {
            var aElement = createANode({
                tagName: tagName,
                parent: currentNode
            });
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
                else if (nextCharCode === 47
                    && walker.charCode(walker.index + 1) === 62
                ) {
                    walker.go(2);
                    tagClose = 1;
                    break;
                }

                // 读取 attribute
                var attrMatch = walker.match(attrReg);
                if (attrMatch) {
                    integrateAttr(
                        aElement,
                        attrMatch[1],
                        attrMatch[2] ? attrMatch[4] : ''
                    );
                }
            }

            // match if directive for else/elif directive
            var elseDirective = aElement.directives.get('else') || aElement.directives.get('elif');
            if (elseDirective) {
                var parentChildsLen = currentNode.childs.length;

                while (parentChildsLen--) {
                    var parentChild = currentNode.childs[parentChildsLen];
                    if (parentChild.isText) {
                        currentNode.childs.splice(parentChildsLen, 1);
                        continue;
                    }

                    // #[begin] error
                    if (!parentChild.directives.get('if')) {
                        throw new Error('[SAN FATEL] else not match if.');
                    }
                    // #[end]

                    parentChild.elses = parentChild.elses || [];
                    parentChild.elses.push(aElement);

                    break;
                }
            }
            else {
                if (aElement.tagName === 'tr' && currentNode.tagName === 'table') {
                    var tbodyNode = createANode({
                        tagName: 'tbody',
                        parent: currentNode
                    });
                    currentNode.childs.push(tbodyNode);
                    currentNode = tbodyNode;
                    aElement.parent = tbodyNode;
                }

                currentNode.childs.push(aElement);
            }

            if (!tagClose) {
                currentNode = aElement;
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
            currentNode.childs.push(createANode({
                isText: 1,
                text: text,
                parent: currentNode
            }));
        }
    }
}

/* eslint-enable fecs-max-statements */

// exports = module.exports = parseTemplate;


/**
 * @file 比较变更表达式与目标表达式之间的关系
 * @author errorrik(errorrik@gmail.com)
 */

// var ExprType = require('../parser/expr-type');
// var evalExpr = require('./eval-expr');
// var each = require('../util/each');

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
    var result;
    each(exprs, function (expr) {
        result = changeExprCompare(changeExpr, expr, data);
        return !result;
    });

    return result ? 1 : 0;
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
    switch (expr.type) {
        case ExprType.ACCESSOR:
            var paths = expr.paths;
            var len = paths.length;
            var changePaths = changeExpr.paths;
            var changeLen = changePaths.length;

            var result = 1;
            for (var i = 0; i < len; i++) {
                var pathExpr = paths[i];

                if (pathExpr.type === ExprType.ACCESSOR
                    && changeExprCompare(changeExpr, pathExpr, data)
                ) {
                    return 1;
                }

                if (result && i < changeLen
                    /* eslint-disable eqeqeq */
                    && evalExpr(pathExpr, data) != evalExpr(changePaths[i], data)
                    /* eslint-enable eqeqeq */
                ) {
                    result = 0;
                }
            }

            if (result) {
                result = Math.max(1, changeLen - len + 2);
            }
            return result;

        case ExprType.UNARY:
            return changeExprCompare(changeExpr, expr.expr, data) ? 1 : 0;


        case ExprType.TEXT:
        case ExprType.BINARY:
        case ExprType.TERTIARY:
            return changeExprCompareExprs(changeExpr, expr.segs, data);

        case ExprType.INTERP:
            if (!changeExprCompare(changeExpr, expr.expr, data)) {
                var filterResult;
                each(expr.filters, function (filter) {
                    filterResult = changeExprCompareExprs(changeExpr, filter.args, data);
                    return !filterResult;
                });

                return filterResult ? 1 : 0;
            }

            return 1;
    }

    return 0;
}

// exports = module.exports = changeExprCompare;


/**
 * @file 数据变更类型枚举
 * @author errorrik(errorrik@gmail.com)
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
 * @file 数据类
 * @author errorrik(errorrik@gmail.com)
 */

// var ExprType = require('../parser/expr-type');
// var evalExpr = require('./eval-expr');
// var DataChangeType = require('./data-change-type');
// var parseExpr = require('../parser/parse-expr');
// var each = require('../util/each');

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
// 以下两个函数只在开发模式下可用，在生产模式下不存在
/**
 * DataTypes 检测
 */
Data.prototype.checkDataTypes = function () {
    if (this.typeChecker) {
        this.typeChecker(this.raw);
    }
};

/**
 * 设置 type checker
 *
 * @param  {Function} typeChecker 类型校验器
 */
Data.prototype.setTypeChecker = function (typeChecker) {
    this.typeChecker = typeChecker;
};

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
    each(this.listeners, function (listener) {
        listener.call(this, change);
    }, this);
};

/**
 * 获取数据项
 *
 * @param {string|Object?} expr 数据项路径
 * @return {*}
 */
Data.prototype.get = function (expr) {
    var value = this.raw;
    if (!expr) {
        return value;
    }

    expr = parseExpr(expr);

    var paths = expr.paths;
    var start = 0;
    var l = paths.length;

    for (; start < l; start++) {
        if (paths[start].value == null) {
            break;
        }
    }

    var i = 0;
    for (; value != null && i < start; i++) {
        value = value[paths[i].value];
    }

    if (value == null && this.parent) {
        value = this.parent.get({
            type: ExprType.ACCESSOR,
            paths: paths.slice(0, start)
        });
    }

    for (i = start; value != null && i < l; i++) {
        value = value[evalExpr(paths[i], this)];
    }

    return value;
};


/**
 * 数据对象变更操作
 *
 * @inner
 * @param {Object|Array} source 要变更的源数据
 * @param {Array} exprPaths 属性路径
 * @param {*} value 变更属性值
 * @param {Data} data 对应的Data对象
 * @return {*} 变更后的新数据
 */
function immutableSet(source, exprPaths, value, data) {
    if (exprPaths.length === 0) {
        return value;
    }

    var prop = evalExpr(exprPaths[0], data);
    var result;

    if (source instanceof Array) {
        var index = +prop;

        if (!isNaN(index)) {
            result = source.slice(0);
            result[index] = immutableSet(result[index], exprPaths.slice(1), value, data);

            return result;
        }
    }
    else if (typeof source === 'object') {
        result = {};

        for (var key in source) {
            if (key !== prop) {
                result[key] = source[key];
            }
        }

        result[prop] = immutableSet(source[prop] || {}, exprPaths.slice(1), value, data);

        return result;
    }

    return source;
}

/**
 * 设置数据项
 *
 * @param {string|Object} expr 数据项路径
 * @param {*} value 数据值
 * @param {Object=} option 设置参数
 * @param {boolean} option.silence 静默设置，不触发变更事件
 */
Data.prototype.set = function (expr, value, option) {
    option = option || {};

    // #[begin] error
    var exprRaw = expr;
    // #[end]

    expr = parseExpr(expr);

    // #[begin] error
    if (expr.type !== ExprType.ACCESSOR) {
        throw new Error('[SAN ERROR] Invalid Expression in Data set: ' + exprRaw);
    }
    // #[end]

    if (this.get(expr) === value) {
        return;
    }

    this.raw = immutableSet(this.raw, expr.paths, value, this);
    !option.silence && this.fire({
        type: DataChangeType.SET,
        expr: expr,
        value: value,
        option: option
    });

    // #[begin] error
    this.checkDataTypes();
    // #[end]

};



Data.prototype.splice = function (expr, args, option) {
    option = option || {};
    // #[begin] error
    var exprRaw = expr;
    // #[end]

    expr = parseExpr(expr);

    // #[begin] error
    if (expr.type !== ExprType.ACCESSOR) {
        throw new Error('[SAN ERROR] Invalid Expression in Data splice: ' + exprRaw);
    }
    // #[end]

    var target = this.get(expr);
    var returnValue = [];

    if (target instanceof Array) {
        var index = args[0];
        if (index < 0 || index > target.length) {
            return;
        }

        var newArray = target.slice(0);
        returnValue = newArray.splice.apply(newArray, args);
        this.raw = immutableSet(this.raw, expr.paths, newArray, this);

        !option.silence && this.fire({
            expr: expr,
            type: DataChangeType.SPLICE,
            index: index,
            deleteCount: returnValue.length,
            value: returnValue,
            insertions: args.slice(2),
            option: option
        });
    }

    // #[begin] error
    this.checkDataTypes();
    // #[end]

    return returnValue;
};

/**
 * 数组数据项push操作
 *
 * @param {string|Object} expr 数据项路径
 * @param {*} item 要push的值
 * @param {Object=} option 设置参数
 * @param {boolean} option.silence 静默设置，不触发变更事件
 */
Data.prototype.push = function (expr, item, option) {
    var target = this.get(expr);

    if (target instanceof Array) {
        this.splice(expr, [target.length, 0, item], option);
    }
};

/**
 * 数组数据项pop操作
 *
 * @param {string|Object} expr 数据项路径
 * @param {Object=} option 设置参数
 * @param {boolean} option.silence 静默设置，不触发变更事件
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
 * @param {boolean} option.silence 静默设置，不触发变更事件
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
 * @param {boolean} option.silence 静默设置，不触发变更事件
 */
Data.prototype.unshift = function (expr, item, option) {
    this.splice(expr, [0, 0, item], option);
};

/**
 * 数组数据项移除操作
 *
 * @param {string|Object} expr 数据项路径
 * @param {number} index 要移除项的索引
 * @param {Object=} option 设置参数
 * @param {boolean} option.silence 静默设置，不触发变更事件
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
 * @param {boolean} option.silence 静默设置，不触发变更事件
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
 * @file 生命周期类
 * @author errorrik(errorrik@gmail.com)
 */

/* eslint-disable fecs-valid-var-jsdoc */
/**
 * 节点生命周期信息
 *
 * @inner
 * @type {Object}
 */
var LifeCycles = {
    compiled: {
        compiled: 1
    },

    inited: {
        compiled: 1,
        inited: 1
    },

    painting: {
        compiled: 1,
        inited: 1,
        painting: 1
    },

    created: {
        compiled: 1,
        inited: 1,
        created: 1
    },

    attached: {
        compiled: 1,
        inited: 1,
        created: 1,
        attached: 1
    },

    detached: {
        compiled: 1,
        inited: 1,
        created: 1,
        detached: 1
    },

    disposed: {
        disposed: 1
    }
};
/* eslint-enable fecs-valid-var-jsdoc */

/**
 * 生命周期类
 *
 * @class
 */
function LifeCycle() {
    this.raw = {};
}

/**
 * 设置生命周期
 *
 * @param {string} name 生命周期名称
 */
LifeCycle.prototype.set = function (name) {
    var phase = LifeCycles[name];

    if (phase) {
        this.raw = phase;
    }
};

/**
 * 是否位于生命周期
 *
 * @param {string} name 生命周期名称
 * @return {boolean}
 */
LifeCycle.prototype.is = function (name) {
    return this.raw[name];
};

// exports = module.exports = LifeCycle;


/**
 * @file 字符串连接时是否使用老式的兼容方案
 * @author errorrik(errorrik@gmail.com)
 */


// var ie = require('./ie');

/**
 * 字符串连接时是否使用老式的兼容方案
 *
 * @inner
 * @type {boolean}
 */
var isCompatStrJoin = ie && ie < 8;

// exports = module.exports = isCompatStrJoin;


/**
 * @file 往字符串连接对象中添加字符串
 * @author errorrik(errorrik@gmail.com)
 */

// var isCompatStrJoin = require('../browser/is-compat-str-join');

/**
 * 往字符串连接对象中添加字符串
 *
 * @param {Object} buf 字符串连接对象
 * @param {string} str 要添加的字符串
 */
var pushStrBuffer = isCompatStrJoin
    ? function (buf, str) {
        buf.raw[buf.length++] = str;
    }
    : function (buf, str) {
        buf.raw += str;
    };

// exports = module.exports = pushStrBuffer;


/**
 * @file 创建桩的html
 * @author errorrik(errorrik@gmail.com)
 */

// var pushStrBuffer = require('../runtime/push-str-buffer');

/**
 * 创建桩的html
 *
 * @param {Node} node 节点对象
 * @param {Object} buf html串存储对象
 */
function genStumpHTML(node, buf) {
    pushStrBuffer(buf, '<!--san:' + node.id + '-->');
}

// exports = module.exports = genStumpHTML;


/**
 * @file  初始化节点
 * @author errorrik(errorrik@gmail.com)
 */

// var guid = require('../util/guid');
// var isComponent = require('./is-component');

/**
 * 初始化节点
 *
 * @param {Object} options 初始化参数
 * @param {ANode} options.aNode 抽象信息节点对象
 * @param {Component=} options.owner 所属的组件对象
 * @param {Object?} node 节点对象，允许为空。空时将options作为节点对象，避免重复创建
 * @return {Object}
 */
function nodeInit(options, node) {
    node = node || options || {};

    if (node !== options) {
        node.owner = options.owner;
        node.parent = options.parent;
        node.scope = options.scope;
        node.aNode = node.aNode || options.aNode;
        node.el = options.el;
    }

    node.parentComponent = isComponent(options.parent)
            ? options.parent
            : options.parent && options.parent.parentComponent,

    node.id = (options.el && options.el.id)
            || (options.aNode && options.aNode.id)
            || guid();

    return node;
}


// exports = module.exports = nodeInit;


/**
 * @file  获取节点 stump 的 comment
 * @author errorrik(errorrik@gmail.com)
 */

// #[begin] error
/**
 * 获取节点 stump 的 comment
 *
 * @param {HTMLElement} el HTML元素
 */
function warnSetHTML(el) {
    // dont warn if not in browser runtime
    if (!(typeof window !== 'undefined' && typeof navigator !== 'undefined' && window.document)) {
        return;
    }

    // some html elements cannot set innerHTML in old ie
    // see: https://msdn.microsoft.com/en-us/library/ms533897(VS.85).aspx
    if (/^(col|colgroup|frameset|style|table|tbody|tfoot|thead|tr|select)$/i.test(el.tagName)) {
        var message = '[SAN WARNING] set html for element "' + el.tagName
            + '" may cause an error in old IE';
        /* eslint-disable no-console */
        if (typeof console === 'object' && console.warn) {
            console.warn(message);
        }
        else {
            throw new Error(message);
        }
        /* eslint-enable no-console */
    }
}
// #[end]

// exports = module.exports = warnSetHTML;


/**
 * @file 判断是否结束桩
 * @author errorrik(errorrik@gmail.com)
 */

// #[begin] reverse
/**
 * 判断是否结束桩
 *
 * @param {HTMLElement|HTMLComment} target 要判断的元素
 * @param {string} type 桩类型
 * @return {boolean}
 */
function isEndStump(target, type) {
    return target.nodeType === 8 && target.data === '/s-' + type;
}
// #[end]

// exports = module.exports = isEndStump;


/**
 * @file 创建 text 节点
 * @author errorrik(errorrik@gmail.com)
 */

// var each = require('../util/each');
// var removeEl = require('../browser/remove-el');
// var createANode = require('../parser/create-a-node');
// var ExprType = require('../parser/expr-type');
// var pushStrBuffer = require('../runtime/push-str-buffer');
// var changeExprCompare = require('../runtime/change-expr-compare');
// var nodeInit = require('./node-init');
// var NodeType = require('./node-type');
// var nodeEvalExpr = require('./node-eval-expr');
// var warnSetHTML = require('./warn-set-html');
// var isEndStump = require('./is-end-stump');

/**
 * 创建 text 节点
 *
 * @param {Object} options 初始化参数
 * @param {ANode} options.aNode 抽象信息节点对象
 * @param {Component=} options.owner 所属的组件对象
 * @return {Object}
 */
function createText(options) {
    var node = nodeInit(options);
    node._type = NodeType.TEXT;

    node.dispose = textOwnDispose;
    node._attachHTML = textOwnAttachHTML;
    node._update = textOwnUpdate;

    // #[begin] reverse
    // from el
    if (node.el) {
        node.aNode = createANode({
            isText: 1,
            text: options.stumpText
        });

        node.parent._pushChildANode(node.aNode);

        /* eslint-disable no-constant-condition */
        while (1) {
        /* eslint-enable no-constant-condition */
            var next = options.elWalker.next;
            if (isEndStump(next, 'text')) {
                options.elWalker.goNext();
                removeEl(next);
                break;
            }

            options.elWalker.goNext();
        }

        removeEl(node.el);
        node.el = null;
    }
    // #[end]

    node._static = node.aNode.textExpr.value;

    return node;
}

/**
 * 销毁 text 节点
 */
function textOwnDispose() {
    this._prev = null;
    this.el = null;
    this.content = null;
}

/**
 * attach text 节点的 html
 *
 * @param {Object} buf html串存储对象
 */
function textOwnAttachHTML(buf) {
    this.content = nodeEvalExpr(this, this.aNode.textExpr, 1);
    pushStrBuffer(buf, this.content);
}


/* eslint-disable max-depth */

/**
 * 更新 text 节点的视图
 *
 * @param {Array} changes 数据变化信息
 */
function textOwnUpdate(changes) {
    var me = this;

    var len = changes ? changes.length : 0;
    while (len--) {
        if (changeExprCompare(changes[len].expr, this.aNode.textExpr, this.scope)) {
            var text = nodeEvalExpr(this, this.aNode.textExpr, 1);
            if (text !== this.content) {
                this.content = text;

                // 无 stump 元素，所以需要根据组件结构定位
                if (!this._located) {
                    each(this.parent.childs, function (child, i) {
                        if (child === me) {
                            me._prev = me.parent.childs[i - 1];
                            return false;
                        }
                    });

                    this._located = 1;
                }

                // 两种 update 模式
                // 1. 单纯的 text node
                // 2. 可能是复杂的 html 结构
                if (!me.updateMode) {
                    me.updateMode = 1;
                    each(this.aNode.textExpr.segs, function (seg) {
                        if (seg.type === ExprType.INTERP) {
                            each(seg.filters, function (filter) {
                                switch (filter.name) {
                                    case 'html':
                                    case 'url':
                                        return;
                                }

                                me.updateMode = 2;
                                return false;
                            });
                        }

                        return me.updateMode < 2;
                    });
                }

                var parentEl = this.parent._getEl();
                if (me.updateMode === 1) {
                    if (me.el) {
                        me.el[typeof me.el.textContent === 'string' ? 'textContent' : 'data'] = text;
                    }
                    else {
                        var el = me._prev && me._prev._getEl().nextSibling || parentEl.firstChild;
                        if (el) {
                            switch (el.nodeType) {
                                case 3:
                                    me.el = el;
                                    me.el[typeof me.el.textContent === 'string' ? 'textContent' : 'data'] = text;
                                    break;
                                case 1:
                                    el.insertAdjacentHTML('beforebegin', text);
                                    break;
                                default:
                                    me.el = document.createTextNode(text);
                                    parentEl.insertBefore(me.el, el);
                            }
                        }
                        else {
                            parentEl.insertAdjacentHTML('beforeend', text);
                        }
                    }
                }
                else {
                    var insertBeforeEl = me._prev && me._prev._getEl().nextSibling || parentEl.firstChild;
                    var startRemoveEl = insertBeforeEl;

                    while (startRemoveEl && !/^_san_/.test(startRemoveEl.id)) {
                        insertBeforeEl = startRemoveEl.nextSibling;
                        removeEl(startRemoveEl);
                        startRemoveEl = insertBeforeEl;
                    }

                    // #[begin] error
                    warnSetHTML(parentEl);
                    // #[end]


                    if (insertBeforeEl) {
                        insertBeforeEl.insertAdjacentHTML('beforebegin', text);
                    }
                    else if (me._prev) {
                        me._prev._getEl().insertAdjacentHTML('afterend', text);
                    }
                    else {
                        parentEl.innerHTML = text;
                    }
                }
            }

            return;
        }
    }
}

/* eslint-enable max-depth */

// exports = module.exports = createText;


/**
 * @file 判断变更是否来源于元素
 * @author errorrik(errorrik@gmail.com)
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
    return changeTarget && changeTarget.id === element.id
        && (!propName || changeTarget.prop === propName);
}

// exports = module.exports = isDataChangeByElement;


/**
 * @file 声明式事件的监听函数
 * @author errorrik(errorrik@gmail.com)
 */

// var each = require('../util/each');
// var evalExpr = require('../runtime/eval-expr');
// var ExprType = require('../parser/expr-type');

/**
 * 声明式事件的监听函数
 *
 * @param {Object} eventBind 绑定信息对象
 * @param {boolean} isComponentEvent 是否组件自定义事件
 * @param {Model} model 数据环境
 * @param {Event} e 事件对象
 */
function eventDeclarationListener(eventBind, isComponentEvent, model, e) {
    var args = [];
    var expr = eventBind.expr;

    each(expr.args, function (argExpr) {
        args.push(argExpr.type === ExprType.ACCESSOR
                && argExpr.paths.length === 1
                && argExpr.paths[0].value === '$event'
            ? (isComponentEvent ? e : e || window.event)
            : evalExpr(argExpr, model)
        );
    });

    var method = this[expr.name];
    if (typeof method === 'function') {
        method.apply(this, args);
    }
}

// exports = module.exports = eventDeclarationListener;


/**
 * @file 生成元素标签起始的html
 * @author errorrik(errorrik@gmail.com)
 */

// var evalExpr = require('../runtime/eval-expr');
// var pushStrBuffer = require('../runtime/push-str-buffer');
// var isComponent = require('./is-component');
// var getPropHandler = require('./get-prop-handler');
// var nodeEvalExpr = require('./node-eval-expr');

/**
 * 生成元素标签起始的html
 *
 * @param {Element} element 元素
 * @param {Object} buf html串存储对象
 */
function genElementStartHTML(element, buf) {
    if (!element.tagName) {
        return;
    }

    pushStrBuffer(buf, '<' + element.tagName + ' id="' + element.id + '"');

    element.props.each(function (prop) {
        var attr = prop.attr;

        if (!attr) {
            element.dynamicProps.push(prop);

            var value = isComponent(element)
                ? evalExpr(prop.expr, element.data, element)
                : nodeEvalExpr(element, prop.expr, 1);

            attr = getPropHandler(element, prop.name).attr(element, prop.name, value);
        }

        pushStrBuffer(buf, attr || '');
    });

    pushStrBuffer(buf, '>');
}

// exports = module.exports = genElementStartHTML;


/**
 * @file 生成元素标签结束的html
 * @author errorrik(errorrik@gmail.com)
 */

// var autoCloseTags = require('../browser/auto-close-tags');
// var pushStrBuffer = require('../runtime/push-str-buffer');

/**
 * 生成元素标签结束的html
 *
 * @inner
 * @param {Element} element 元素
 * @param {Object} buf html串存储对象
 */
function genElementEndHTML(element, buf) {
    var tagName = element.tagName;

    if (!autoCloseTags[tagName]) {
        pushStrBuffer(buf, '</' + tagName + '>');
    }
}

// exports = module.exports = genElementEndHTML;


/**
 * @file attaching 的 element 和 component 池
         完成 html fill 后执行 attached 操作，进行事件绑定等后续行为
 * @author errorrik(errorrik@gmail.com)
 */


/**
 * attaching 的 element 和 component 集合
 *
 * @inner
 * @type {Array}
 */
var attachingNodes = [];

/**
 * attaching 操作对象
 *
 * @type {Object}
 */
var attachings = {

    /**
     * 添加 attaching 的 element 或 component
     *
     * @param {Object|Component} node attaching的node
     */
    add: function (node) {
        attachingNodes.push(node);
    },

    /**
     * 执行 attaching 完成行为
     */
    done: function () {
        var nodes = attachingNodes;
        attachingNodes = [];

        for (var i = 0, l = nodes.length; i < l; i++) {
            nodes[i]._attached();
        }
    }
};

// exports = module.exports = attachings;


/**
 * @file 解析元素自身的 ANode
 * @author errorrik(errorrik@gmail.com)
 */

// var each = require('../util/each');
// var createANode = require('./create-a-node');
// var integrateAttr = require('./integrate-attr');

// #[begin] reverse
/**
 * 解析元素自身的 ANode
 *
 * @param {HTMLElement} el 页面元素
 * @return {ANode}
 */
function parseANodeFromEl(el) {
    var aNode = createANode();
    aNode.tagName = el.tagName.toLowerCase();

    each(
        el.attributes,
        function (attr) {
            integrateAttr(aNode, attr.name, attr.value, 1);
        }
    );

    return aNode;
}
// #[end]

// exports = module.exports = parseANodeFromEl;


/**
 * @file 创建 element 节点
 * @author errorrik(errorrik@gmail.com)
 */


// var each = require('../util/each');
// var IndexedList = require('../util/indexed-list');
// var changeExprCompare = require('../runtime/change-expr-compare');
// var attachings = require('./attachings');
// var parseANodeFromEl = require('../parser/parse-anode-from-el');
// var fromElInitChilds = require('./from-el-init-childs');
// var isDataChangeByElement = require('./is-data-change-by-element');
// var nodeInit = require('./node-init');
// var nodeEvalExpr = require('./node-eval-expr');
// var elementUpdateChilds = require('./element-update-childs');
// var elementOwnAttachHTML = require('./element-own-attach-html');
// var elementOwnCreate = require('./element-own-create');
// var elementOwnAttach = require('./element-own-attach');
// var elementOwnDetach = require('./element-own-detach');
// var elementOwnDispose = require('./element-own-dispose');
// var elementOwnGetEl = require('./element-own-get-el');
// var elementOwnOnEl = require('./element-own-on-el');
// var elementAttached = require('./element-attached');
// var elementSetElProp = require('./element-set-el-prop');
// var elementInitProps = require('./element-init-props');
// var elementInitTagName = require('./element-init-tag-name');
// var elementOwnPushChildANode = require('./element-own-push-child-anode');
// var warnSetHTML = require('./warn-set-html');

/**
 * 创建 element 节点
 *
 * @param {Object} options 初始化参数
 * @param {ANode} options.aNode 抽象信息节点对象
 * @param {Component=} options.owner 所属的组件对象
 * @return {Object}
 */
function createElement(options) {
    var node = nodeInit(options);

    // init methods
    node.attach = elementOwnAttach;
    node.detach = elementOwnDetach;
    node.dispose = elementOwnDispose;
    node._attachHTML = elementOwnAttachHTML;
    node._update = elementOwnUpdate;
    node._create = elementOwnCreate;
    node._attached = elementOwnAttached;
    node._getEl = elementOwnGetEl;
    node._toPhase = elementOwnToPhase;
    node._onEl = elementOwnOnEl;

    elementInitProps(node);

    // #[begin] reverse
    node._pushChildANode = elementOwnPushChildANode;

    if (node.el) {
        node.aNode = parseANodeFromEl(node.el);
        node.parent && node.parent._pushChildANode(node.aNode);
        node.tagName = node.aNode.tagName;

        if (!node.aNode.directives.get('html')) {
            fromElInitChilds(node);
        }
        node.el.id = node.id;

        node.dynamicProps = new IndexedList();
        node.aNode.props.each(function (prop) {
            if (!prop.attr) {
                node.dynamicProps.push(prop);
            }
        });
        attachings.add(node);
    }
    // #[end]

    elementInitTagName(node);
    node.props = node.aNode.props;
    node.binds = node.aNode.binds || node.aNode.props;

    node._toPhase('inited');
    return node;
}

/**
 * 视图更新函数
 *
 * @param {Array} changes 数据变化信息
 */
function elementOwnUpdate(changes) {
    this._getEl();
    var me = this;

    this.dynamicProps.each(function (prop) {
        if (prop.expr.value) {
            return;
        }

        each(changes, function (change) {
            if (!isDataChangeByElement(change, me, prop.name)
                && (
                    changeExprCompare(change.expr, prop.expr, me.scope)
                    || prop.hintExpr && changeExprCompare(change.expr, prop.hintExpr, me.scope)
                )
            ) {
                elementSetElProp(me, prop.name, nodeEvalExpr(me, prop.expr));
                return false;
            }
        });
    });

    var htmlDirective = this.aNode.directives.get('html');
    if (htmlDirective) {
        each(changes, function (change) {
            if (changeExprCompare(change.expr, htmlDirective.value, me.scope)) {
                // #[begin] error
                warnSetHTML(me.el);
                // #[end]
                me.el.innerHTML = nodeEvalExpr(me, htmlDirective.value);
                return false;
            }
        });
    }
    else {
        elementUpdateChilds(this, changes);
    }
}

/**
 * 执行完成attached状态的行为
 */
function elementOwnAttached() {
    elementAttached(this);
}

/**
 * 使节点到达相应的生命周期
 *
 * @param {string} name 生命周期名称
 */
function elementOwnToPhase(name) {
    this.lifeCycle.set(name);
}


// exports = module.exports = createElement;


/**
 * @file 创建节点的工厂方法
 * @author errorrik(errorrik@gmail.com)
 */


// var isComponent = require('./is-component');
// var createText = require('./create-text');
// var createElement = require('./create-element');
// var createSlot = require('./create-slot');
// var createFor = require('./create-for');
// var createIf = require('./create-if');


/**
 * 创建节点
 *
 * @param {ANode} aNode 抽象节点
 * @param {Node} parent 父亲节点
 * @param {Model=} scope 所属数据环境
 * @return {Node}
 */
function createNode(aNode, parent, scope) {
    var owner = isComponent(parent) ? parent : parent.owner;
    scope = scope || (isComponent(parent) ? parent.data : parent.scope);
    var options = {
        aNode: aNode,
        owner: owner,
        scope: scope,
        parent: parent
    };

    if (aNode.isText) {
        return createText(options);
    }

    if (aNode.directives.get('if')) {
        return createIf(options);
    }

    if (aNode.directives.get('for')) {
        return createFor(options);
    }

    var ComponentType = owner.components[aNode.tagName];
    if (ComponentType) {
        options.subTag = aNode.tagName;
        return new ComponentType(options);
    }

    if (aNode.tagName === 'slot') {
        return createSlot(options);
    }

    return createElement(options);
}

// exports = module.exports = createNode;


/**
 * @file 通过存在的 el 创建节点的工厂方法
 * @author errorrik(errorrik@gmail.com)
 */

// var parseTemplate = require('../parser/parse-template');
// var parseANodeFromEl = require('../parser/parse-anode-from-el');

// var NodeType = require('./node-type');
// var isComponent = require('./is-component');
// var createText = require('./create-text');
// var createElement = require('./create-element');
// var createIf = require('./create-if');
// var createFor = require('./create-for');
// var createSlot = require('./create-slot');

// #[begin] reverse
/**
 * 通过存在的 el 创建节点
 *
 * @param {HTMLElement} el 页面中存在的元素
 * @param {Node} parent 父亲节点
 * @param {DOMChildsWalker} elWalker 遍历元素的功能对象
 * @param {Model=} scope 所属数据环境
 * @return {Node}
 */
function createNodeByEl(el, parent, elWalker, scope) {
    var owner = isComponent(parent) ? parent : parent.owner;
    scope = scope || (isComponent(parent) ? parent.data : parent.scope);

    var option = {
        owner: owner,
        scope: scope,
        parent: parent,
        el: el,
        elWalker: elWalker
    };

    // comment as stump
    if (el.nodeType === 8) {
        var stumpMatch = el.data.match(/^\s*s-([a-z]+)(:[\s\S]+)?$/);

        if (stumpMatch) {
            option.stumpText = stumpMatch[2] ? stumpMatch[2].slice(1) : '';

            switch (stumpMatch[1]) {
                case 'text':
                    return createText(option);

                case 'for':
                    return createFor(option);

                case 'slot':
                    return createSlot(option);

                case 'if':
                    return createIf(option);


                case 'else':
                case 'elif':
                    createNodeByElseStump(option, stumpMatch[1]);
                    return;

                case 'data':
                    // fill component data
                    var data = (new Function(
                        'return ' + option.stumpText.replace(/^[\s\n]*/, '')
                    ))();

                    /* eslint-disable guard-for-in */
                    for (var key in data) {
                        owner.data.set(key, data[key]);
                    }
                    /* eslint-enable guard-for-in */

                    return;
            }
        }

        return;
    }

    // element as anything
    var tagName = el.tagName.toLowerCase();
    var childANode = parseANodeFromEl(el);
    option.aNode = childANode;

    // find component class
    var ComponentClass = null;
    if (tagName.indexOf('-') > 0) {
        ComponentClass = owner.components[tagName];
    }

    var componentName = el.getAttribute('s-component');
    if (componentName) {
        ComponentClass = owner.components[componentName];
        childANode.tagName = componentName;
    }


    if (childANode.directives.get('if')) {
        return createIf(option);
    }

    if (childANode.directives.get('else')) {
        return createNodeByElseEl(option, 'else');
    }

    if (childANode.directives.get('elif')) {
        return createNodeByElseEl(option, 'elif');
    }


    // as Component
    if (ComponentClass) {
        return new ComponentClass(option);
    }

    // as Element
    return createElement(option);
}

function createNodeByElseEl(option, type) {
    var parentChilds = option.parent.childs;
    var len = parentChilds.length;

    matchif: while (len--) {
        var ifNode = parentChilds[len];
        switch (ifNode._type) {
            case NodeType.TEXT:
                continue matchif;

            case NodeType.IF:
                if (!ifNode.aNode.elses) {
                    ifNode.aNode.elses = [];
                }
                ifNode.aNode.elses.push(option.aNode);
                ifNode.elseIndex = ifNode.aNode.elses.length - 1;

                option.el.removeAttribute('san-' + type);
                option.el.removeAttribute('s-' + type);

                var elseChild = createNodeByEl(option.el, ifNode, option.elWalker);
                ifNode.childs[0] = elseChild;
                option.aNode.childs = option.aNode.childs.slice(0);
                break matchif;
        }

        throw new Error('[SAN FATEL] ' + type + ' not match if.');
    }
}

function createNodeByElseStump(option, type) {
    var parentChilds = option.parent.childs;
    var len = parentChilds.length;

    matchif: while (len--) {
        var ifNode = parentChilds[len];
        switch (ifNode._type) {
            case NodeType.TEXT:
                continue matchif;

            case NodeType.IF:
                if (!ifNode.aNode.elses) {
                    ifNode.aNode.elses = [];
                }

                var elseANode;
                switch (type) {
                    case 'else':
                        elseANode = parseTemplate(
                            option.stumpText.replace('san-else', '').replace('s-else', '')
                        ).childs[0];
                        elseANode.directives.push({
                            value: 1,
                            name: type
                        });

                        break;

                    case 'elif':
                        elseANode = parseTemplate(
                            option.stumpText.replace('san-elif', 's-if').replace('s-elif', 's-if')
                        ).childs[0];

                        var ifDirective = elseANode.directives.get('if');
                        elseANode.directives.remove('if');
                        ifDirective.name = 'elif';
                        elseANode.directives.push(ifDirective);

                        break;
                }

                ifNode.aNode.elses.push(elseANode);
                break matchif;
        }

        throw new Error('[SAN FATEL] ' + type + ' not match if.');
    }
}
// #[end]

// exports = module.exports = createNodeByEl;


/**
 * @file  获取节点 stump 的父元素
 * @author errorrik(errorrik@gmail.com)
 */

/**
 * 获取节点 stump 的父元素
 * if、for 节点的 el stump 是 comment node，在 IE 下还可能不存在
 * 获取其父元素通常用于 el 的查找，以及视图变更的插入操作
 *
 * @param {Node} node 节点对象
 * @return {HTMLElement}
 */
function getNodeStumpParent(node) {
    if (node.el) {
        return node.el.parentNode;
    }

    var parentNode = node.parent._getEl();
    while (parentNode && parentNode.nodeType !== 1) {
        parentNode = parentNode.parentNode;
    }

    return parentNode;
}

// exports = module.exports = getNodeStumpParent;


/**
 * @file 更新元素的子元素视图
 * @author errorrik(errorrik@gmail.com)
 */

// var each = require('../util/each');

/**
 * 更新元素的子元素视图
 *
 * @param {Object} element 要更新的元素
 * @param {Array} changes 数据变化信息
 * @param {string} slotChildsName 子slot名称
 */
function elementUpdateChilds(element, changes, slotChildsName) {
    each(element.childs, function (child) {
        child._update(changes);
    });

    each(element[slotChildsName || 'slotChilds'], function (child) {
        elementUpdateChilds(child, changes);
    });
}

// exports = module.exports = elementUpdateChilds;


/**
 * @file 销毁释放元素的子元素
 * @author errorrik(errorrik@gmail.com)
 */

/**
 * 销毁释放元素的子元素
 *
 * @param {Object} element 元素节点
 * @param {boolean} dontDetach 是否不要将节点从DOM移除
 */
function elementDisposeChilds(element, dontDetach) {
    var childs = element.childs;
    if (childs instanceof Array) {
        var len = childs.length;
        while (len--) {
            childs[len].dispose(dontDetach);
        }

        childs.length = 0;
    }
}

// exports = module.exports = elementDisposeChilds;


/**
 * @file 销毁节点，清空节点上的无用成员
 * @author errorrik(errorrik@gmail.com)
 */


/**
 * 销毁节点
 *
 * @param {Object} node 节点对象
 */
function nodeDispose(node) {
    node.el = null;
    node.owner = null;
    node.scope = null;
    node.aNode = null;
    node.parent = null;
    node.parentComponent = null;
    node.childs = null;
}

// exports = module.exports = nodeDispose;


/**
 * @file 简单执行销毁节点的行为
 * @author errorrik(errorrik@gmail.com)
 */

// var removeEl = require('../browser/remove-el');
// var nodeDispose = require('./node-dispose');
// var elementDisposeChilds = require('./element-dispose-childs');

/**
 * 简单执行销毁节点的行为
 *
 * @param {boolean} dontDetach 是否不要将节点移除
 */
function nodeOwnSimpleDispose(dontDetach) {
    elementDisposeChilds(this, dontDetach);

    if (!dontDetach) {
        removeEl(this._getEl());
    }

    nodeDispose(this);
}

// exports = module.exports = nodeOwnSimpleDispose;


/**
 * @file  获取节点 stump 的 comment
 * @author errorrik(errorrik@gmail.com)
 */


// var getNodeStumpParent = require('./get-node-stump-parent');

/**
 * 获取节点 stump 的 comment
 *
 * @param {Node} node 节点对象
 * @return {Comment}
 */
function getNodeStump(node) {
    if (typeof node.el === 'undefined') {
        var parentNode = getNodeStumpParent(node);
        var el = parentNode.firstChild;

        while (el) {
            if (el.nodeType === 8
                && el.data.indexOf('san:') === 0
                && el.data.replace('san:', '') === node.id
            ) {
                break;
            }

            el = el.nextSibling;
        }

        node.el = el;
    }

    return node.el;
}

// exports = module.exports = getNodeStump;


/**
 * @file 获取节点对应的 stump 主元素
 * @author errorrik(errorrik@gmail.com)
 */

// var getNodeStump = require('./get-node-stump');

/**
 * 获取节点对应的 stump 主元素
 *
 * @return {Comment}
 */
function nodeOwnGetStumpEl() {
    return getNodeStump(this);
}

// exports = module.exports = nodeOwnGetStumpEl;


/**
 * @file 创建 if 指令元素
 * @author errorrik(errorrik@gmail.com)
 */

// var each = require('../util/each');
// var empty = require('../util/empty');
// var IndexedList = require('../util/indexed-list');
// var parseTemplate = require('../parser/parse-template');
// var createANode = require('../parser/create-a-node');
// var genStumpHTML = require('./gen-stump-html');
// var nodeInit = require('./node-init');
// var NodeType = require('./node-type');
// var nodeEvalExpr = require('./node-eval-expr');
// var createNode = require('./create-node');
// var createNodeByEl = require('./create-node-by-el');
// var getNodeStumpParent = require('./get-node-stump-parent');
// var elementUpdateChilds = require('./element-update-childs');
// var elementDisposeChilds = require('./element-dispose-childs');
// var nodeOwnSimpleDispose = require('./node-own-simple-dispose');
// var nodeOwnGetStumpEl = require('./node-own-get-stump-el');

/**
 * 创建 if 指令元素
 *
 * @param {Object} options 初始化参数
 * @return {Object}
 */
function createIf(options) {
    var node = nodeInit(options);
    node.childs = [];
    node._type = NodeType.IF;

    node.dispose = nodeOwnSimpleDispose;

    node._getEl = nodeOwnGetStumpEl;
    node._attachHTML = ifOwnAttachHTML;
    node._update = ifOwnUpdate;

    // #[begin] reverse
    node._pushChildANode = empty;
    // #[end]

    // #[begin] reverse
    if (options.el) {
        if (options.el.nodeType === 8) {
            var aNode = parseTemplate(options.stumpText).childs[0];
            node.aNode = aNode;
        }
        else {
            node.elseIndex = -1;
            var el = document.createComment('san:' + this.id);
            options.el.parentNode.insertBefore(el, options.el.nextSibling);


            options.el.removeAttribute('san-if');
            options.el.removeAttribute('s-if');

            var child = createNodeByEl(options.el, node, options.elWalker);
            node.childs[0] = child;
            node.aNode.childs = child.aNode.childs.slice(0);

            node.el = el;
        }

        node.parent._pushChildANode(node.aNode);
    }
    // #[end]

    node.cond = node.aNode.directives.get('if').value;

    return node;
}

/**
 * 创建 if 指令对应条件为 true 时对应的元素
 *
 * @inner
 * @param {ANode} directiveANode 指令ANode
 * @param {IfDirective} mainIf 主if元素
 * @return {Element}
 */
function createIfDirectiveChild(directiveANode, mainIf) {
    var childANode = createANode({
        childs: directiveANode.childs,
        props: directiveANode.props,
        events: directiveANode.events,
        tagName: directiveANode.tagName,
        directives: (new IndexedList()).concat(directiveANode.directives)
    });

    childANode.directives.remove('if');
    childANode.directives.remove('else');
    childANode.directives.remove('elif');

    return createNode(childANode, mainIf);
}


/**
 * attach元素的html
 *
 * @param {Object} buf html串存储对象
 */
function ifOwnAttachHTML(buf) {
    var me = this;
    var elseIndex;
    var child;

    if (nodeEvalExpr(me, me.cond)) {
        child = createIfDirectiveChild(me.aNode, me);
        elseIndex = -1;
    }
    else {
        each(me.aNode.elses, function (elseANode, index) {
            var elif = elseANode.directives.get('elif');

            if (!elif || elif && nodeEvalExpr(me, elif.value)) {
                child = createIfDirectiveChild(elseANode, me);
                elseIndex = index;
                return false;
            }
        });
    }

    if (child) {
        me.childs[0] = child;
        child._attachHTML(buf);
        me.elseIndex = elseIndex;
    }

    genStumpHTML(this, buf);
}

/**
 * 视图更新函数
 *
 * @param {Array} changes 数据变化信息
 */
function ifOwnUpdate(changes) {
    var me = this;
    var childANode = me.aNode;
    var elseIndex;

    if (nodeEvalExpr(this, this.cond)) {
        elseIndex = -1;
    }
    else {
        each(me.aNode.elses, function (elseANode, index) {
            var elif = elseANode.directives.get('elif');

            if (elif && nodeEvalExpr(me, elif.value) || !elif) {
                elseIndex = index;
                childANode = elseANode;
                return false;
            }
        });
    }

    if (elseIndex === me.elseIndex) {
        elementUpdateChilds(me, changes);
    }
    else {
        elementDisposeChilds(me);

        if (typeof elseIndex !== 'undefined') {
            var child = createIfDirectiveChild(childANode, me);
            var parentEl = getNodeStumpParent(me);
            child.attach(parentEl, me._getEl() || parentEl.firstChild);

            me.childs[0] = child;
        }

        me.elseIndex = elseIndex;
    }
}

// exports = module.exports = createIf;


/**
 * @file 创建字符串连接对象，用于跨平台提高性能的字符串连接，万一不小心支持老式浏览器了呢
 * @author errorrik(errorrik@gmail.com)
 */

// var isCompatStrJoin = require('../browser/is-compat-str-join');

/**
 * 创建字符串连接对象
 *
 * @return {Object}
 */
function createStrBuffer() {
    return {
        raw: isCompatStrJoin ? [] : '',
        length: 0
    };
}

// exports = module.exports = createStrBuffer;


/**
 * @file 字符串化字符串连接对象
 * @author errorrik(errorrik@gmail.com)
 */

// var isCompatStrJoin = require('../browser/is-compat-str-join');

/**
 * 字符串化字符串连接对象
 *
 * @param {Object} buf 字符串连接对象
 * @return {string}
 */
var stringifyStrBuffer = isCompatStrJoin
    ? function (buf) {
        return buf.raw.join('');
    }
    : function (buf) {
        return buf.raw;
    };

// exports = module.exports = stringifyStrBuffer;


/**
 * @file 创建节点对应的 stump comment 元素
 * @author errorrik(errorrik@gmail.com)
 */

/**
 * 创建节点对应的 stump comment 主元素
 */
function nodeOwnCreateStump() {
    this.el = this.el || document.createComment('san:' + this.id);
}

// exports = module.exports = nodeOwnCreateStump;


/**
 * @file 创建 for 指令元素
 * @author errorrik(errorrik@gmail.com)
 */

// var empty = require('../util/empty');
// var extend = require('../util/extend');
// var inherits = require('../util/inherits');
// var each = require('../util/each');
// var IndexedList = require('../util/indexed-list');
// var parseTemplate = require('../parser/parse-template');
// var createANode = require('../parser/create-a-node');
// var ExprType = require('../parser/expr-type');
// var parseExpr = require('../parser/parse-expr');
// var Data = require('../runtime/data');
// var DataChangeType = require('../runtime/data-change-type');
// var changeExprCompare = require('../runtime/change-expr-compare');
// var createStrBuffer = require('../runtime/create-str-buffer');
// var stringifyStrBuffer = require('../runtime/stringify-str-buffer');
// var removeEl = require('../browser/remove-el');

// var attachings = require('./attachings');
// var genStumpHTML = require('./gen-stump-html');
// var nodeInit = require('./node-init');
// var NodeType = require('./node-type');
// var nodeEvalExpr = require('./node-eval-expr');
// var createNode = require('./create-node');
// var createNodeByEl = require('./create-node-by-el');
// var isEndStump = require('./is-end-stump');
// var getNodeStumpParent = require('./get-node-stump-parent');
// var nodeOwnSimpleDispose = require('./node-own-simple-dispose');
// var nodeOwnCreateStump = require('./node-own-create-stump');
// var nodeOwnGetStumpEl = require('./node-own-get-stump-el');
// var elementDisposeChilds = require('./element-dispose-childs');
// var warnSetHTML = require('./warn-set-html');


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

    this.directive = forElement.aNode.directives.get('for');
    this.raw[this.directive.item.raw] = item;
    this.raw[this.directive.index.raw] = index;
}

/**
 * 将数据操作的表达式，转换成为对parent数据操作的表达式
 * 主要是对item和index进行处理
 *
 * @param {Object} expr 表达式
 * @return {Object}
 */
ForItemData.prototype.exprResolve = function (expr) {
    var directive = this.directive;
    var me = this;

    function resolveItem(expr) {
        if (expr.type === ExprType.ACCESSOR
            && expr.paths[0].value === directive.item.paths[0].value
        ) {
            return {
                type: ExprType.ACCESSOR,
                paths: directive.list.paths.concat(
                    {
                        type: ExprType.NUMBER,
                        value: me.get(directive.index)
                    },
                    expr.paths.slice(1)
                )
            };
        }

        return expr;
    }

    expr = resolveItem(expr);

    var resolvedPaths = [];

    each(expr.paths, function (item) {
        resolvedPaths.push(
            item.type === ExprType.ACCESSOR
                && item.paths[0].value === directive.index.paths[0].value
            ? {
                type: ExprType.NUMBER,
                value: me.get(directive.index)
            }
            : resolveItem(item)
        );
    });

    return {
        type: ExprType.ACCESSOR,
        paths: resolvedPaths
    };
};

// 代理数据操作方法
inherits(ForItemData, Data);
each(
    ['set', 'remove', 'unshift', 'shift', 'push', 'pop', 'splice'],
    function (method) {
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
 * 创建 for 指令元素的子元素
 *
 * @inner
 * @param {ForDirective} forElement for 指令元素对象
 * @param {*} item 子元素对应数据
 * @param {number} index 子元素对应序号
 * @return {Element}
 */
function createForDirectiveChild(forElement, item, index) {
    var itemScope = new ForItemData(forElement, item, index);
    return createNode(forElement.itemANode, forElement, itemScope);
}

/**
 * 创建 for 指令元素
 *
 * @param {Object} options 初始化参数
 * @return {Object}
 */
function createFor(options) {
    var node = nodeInit(options);
    node.childs = [];
    node._type = NodeType.FOR;

    node.attach = forOwnAttach;
    node.detach = forOwnDetach;
    node.dispose = nodeOwnSimpleDispose;

    node._attachHTML = forOwnAttachHTML;
    node._update = forOwnUpdate;
    node._create = nodeOwnCreateStump;
    node._getEl = nodeOwnGetStumpEl;

    // #[begin] reverse
    node._pushChildANode = empty;
    // #[end]

    var aNode = node.aNode;

    // #[begin] reverse
    if (options.el) {
        aNode = parseTemplate(options.stumpText).childs[0];
        node.aNode = aNode;

        var index = 0;
        var directive = aNode.directives.get('for');
        var listData = nodeEvalExpr(node, directive.list) || [];

        /* eslint-disable no-constant-condition */
        while (1) {
        /* eslint-enable no-constant-condition */
            var next = options.elWalker.next;
            if (isEndStump(next, 'for')) {
                removeEl(options.el);
                node.el = next;
                options.elWalker.goNext();
                break;
            }

            var itemScope = new ForItemData(node, listData[index], index);
            var child = createNodeByEl(next, node, options.elWalker, itemScope);
            node.childs.push(child);

            index++;
            options.elWalker.goNext();
        }

        node.parent._pushChildANode(node.aNode);
    }
    // #[end]

    node.itemANode = createANode({
        childs: aNode.childs,
        props: aNode.props,
        events: aNode.events,
        tagName: aNode.tagName,
        directives: (new IndexedList()).concat(aNode.directives)
    });
    node.itemANode.directives.remove('for');

    return node;
}

/**
 * attach元素的html
 *
 * @param {Object} buf html串存储对象
 * @param {boolean} onlyChilds 是否只attach列表本身html，不包括stump部分
 */
function forOwnAttachHTML(buf, onlyChilds) {
    var me = this;
    each(
        nodeEvalExpr(me, me.aNode.directives.get('for').list),
        function (item, i) {
            var child = createForDirectiveChild(me, item, i);
            me.childs.push(child);
            child._attachHTML(buf);
        }
    );

    if (!onlyChilds) {
        genStumpHTML(me, buf);
    }
}


/**
 * 将元素attach到页面的行为
 *
 * @param {HTMLElement} parentEl 要添加到的父元素
 * @param {HTMLElement＝} beforeEl 要添加到哪个元素之前
 */
function forOwnAttach(parentEl, beforeEl) {
    this._create();
    if (parentEl) {
        if (beforeEl) {
            parentEl.insertBefore(this.el, beforeEl);
        }
        else {
            parentEl.appendChild(this.el);
        }
    }

    // paint list
    var el = this.el || parentEl.firstChild;
    var prevEl = el && el.previousSibling;
    var buf = createStrBuffer();

    prev: while (prevEl) {
        var nextPrev = prevEl.previousSibling;
        switch (prevEl.nodeType) {
            case 1:
                break prev;

            case 3:
                if (!/^\s*$/.test(prevEl.textContent)) {
                    break prev;
                }

                removeEl(prevEl);
                break;

        }

        prevEl = nextPrev;
    }

    if (!prevEl) {
        this._attachHTML(buf, 1);
        // #[begin] error
        warnSetHTML(parentEl);
        // #[end]
        parentEl.insertAdjacentHTML('afterbegin', stringifyStrBuffer(buf));
    }
    else if (prevEl.nodeType === 1) {
        this._attachHTML(buf, 1);
        // #[begin] error
        warnSetHTML(parentEl);
        // #[end]
        prevEl.insertAdjacentHTML('afterend', stringifyStrBuffer(buf));
    }
    else {
        each(
            nodeEvalExpr(this, this.aNode.directives.get('for').list),
            function (item, i) {
                var child = createForDirectiveChild(this, item, i);
                this.childs.push(child);
                child.attach(parentEl, el);
            },
            this
        );
    }

    attachings.done();
}


/**
 * 将元素从页面上移除的行为
 */
function forOwnDetach() {
    if (this.lifeCycle.is('attached')) {
        elementDisposeChilds(this, true);
        removeEl(this._getEl());
        this.lifeCycle.set('detached');
    }
}



/**
 * 视图更新函数
 *
 * @param {Array} changes 数据变化信息
 */
function forOwnUpdate(changes) {
    var childsChanges = [];
    var oldChildsLen = this.childs.length;
    each(this.childs, function () {
        childsChanges.push([]);
    });


    var disposeChilds = [];
    var forDirective = this.aNode.directives.get('for');

    this._getEl();
    var parentEl = getNodeStumpParent(this);
    var parentFirstChild = parentEl.firstChild;
    var parentLastChild = parentEl.lastChild;

    var isOnlyParentChild =
        oldChildsLen > 0 // 有孩子时
            && parentFirstChild === this.childs[0]._getEl()
            && (parentLastChild === this.el || parentLastChild === this.childs[oldChildsLen - 1]._getEl())
        || oldChildsLen === 0 // 无孩子时
            && parentFirstChild === this.el
            && parentLastChild === this.el

    var isChildsRebuild;

    each(changes, function (change) {
        var relation = changeExprCompare(change.expr, forDirective.list, this.scope);

        if (!relation) {
            // 无关时，直接传递给子元素更新，列表本身不需要动
            each(childsChanges, function (childChanges) {
                childChanges.push(change);
            });
        }
        else if (relation > 2) {
            // 变更表达式是list绑定表达式的子项
            // 只需要对相应的子项进行更新
            var changePaths = change.expr.paths;
            var forLen = forDirective.list.paths.length;

            change = extend({}, change);
            change.expr = {
                type: ExprType.ACCESSOR,
                paths: forDirective.item.paths.concat(changePaths.slice(forLen + 1))
            };

            var changeIndex = +nodeEvalExpr(this, changePaths[forLen]);
            childsChanges[changeIndex].push(change);

            switch (change.type) {
                case DataChangeType.SET:
                    Data.prototype.set.call(
                        this.childs[changeIndex].scope,
                        change.expr,
                        change.value,
                        {silence: 1}
                    );
                    break;


                case DataChangeType.SPLICE:
                    Data.prototype.splice.call(
                        this.childs[changeIndex].scope,
                        change.expr,
                        [].concat(change.index, change.deleteCount, change.insertions),
                        {silence: 1}
                    );
                    break;
            }
        }
        else if (change.type === DataChangeType.SET) {
            // 变更表达式是list绑定表达式本身或母项的重新设值
            // 此时需要更新整个列表
            var newList = nodeEvalExpr(this, forDirective.list);
            var newLen = newList && newList.length || 0;

            // 老的比新的多的部分，标记需要dispose
            if (oldChildsLen > newLen) {
                disposeChilds = disposeChilds.concat(this.childs.slice(newLen));

                childsChanges.length = newLen;
                this.childs.length = newLen;
            }

            // 整项变更
            for (var i = 0; i < newLen; i++) {
                childsChanges[i] = childsChanges[i] || [];
                childsChanges[i].push({
                    type: DataChangeType.SET,
                    option: change.option,
                    expr: {
                        type: ExprType.ACCESSOR,
                        paths: forDirective.item.paths.slice(0)
                    },
                    value: newList[i]
                });

                // 对list更上级数据的直接设置
                if (relation < 2) {
                    childsChanges[i].push(change);
                }

                if (this.childs[i]) {
                    Data.prototype.set.call(
                        this.childs[i].scope,
                        forDirective.item,
                        newList[i],
                        {silence: 1}
                    );
                }
                else {
                    this.childs[i] = createForDirectiveChild(this, newList[i], i);
                }
            }

            isChildsRebuild = 1;
        }
        else if (relation === 2 && change.type === DataChangeType.SPLICE && !isChildsRebuild) {
            // 变更表达式是list绑定表达式本身数组的SPLICE操作
            // 此时需要删除部分项，创建部分项
            var changeStart = change.index;
            var deleteCount = change.deleteCount;

            var indexChange = {
                type: DataChangeType.SET,
                option: change.option,
                expr: forDirective.index
            };

            var insertionsLen = change.insertions.length;
            if (insertionsLen !== deleteCount) {
                each(this.childs, function (child, index) {
                    // update child index
                    if (index >= changeStart + deleteCount) {
                        childsChanges[index].push(indexChange);
                        Data.prototype.set.call(
                            child.scope,
                            indexChange.expr,
                            index - deleteCount + insertionsLen,
                            {silence: 1}
                        );
                    }
                }, this);
            }

            var spliceArgs = [changeStart, deleteCount];
            var childsChangesSpliceArgs = [changeStart, deleteCount];
            each(change.insertions, function (insertion, index) {
                spliceArgs.push(createForDirectiveChild(this, insertion, changeStart + index));
                childsChangesSpliceArgs.push([]);
            }, this);

            disposeChilds = disposeChilds.concat(this.childs.splice.apply(this.childs, spliceArgs));
            childsChanges.splice.apply(childsChanges, childsChangesSpliceArgs);
        }
    }, this);

    var newChildsLen = this.childs.length;

    // 标记 length 是否发生变化
    if (newChildsLen !== oldChildsLen) {
        var lengthChange = {
            type: DataChangeType.SET,
            option: {},
            expr: {
                type: ExprType.ACCESSOR,
                paths: forDirective.list.paths.concat({
                    type: ExprType.STRING,
                    value: 'length'
                })
            }
        };
        each(childsChanges, function (childChanges) {
            childChanges.push(lengthChange);
        });
    }


    // 清除应该干掉的 child
    var violentClear = isOnlyParentChild && newChildsLen === 0;

    each(disposeChilds, function (child) {
        child.dispose(violentClear);
    });

    if (violentClear) {
        parentEl.innerHTML = '';
        this.el = document.createComment('san:' + this.id);
        parentEl.appendChild(this.el);
        return;
    }


    // 对相应的项进行更新
    if (oldChildsLen === 0 && isOnlyParentChild) {
        var buf = createStrBuffer();
        each(
            this.childs,
            function (child) {
                child._attachHTML(buf);
            }
        );
        parentEl.innerHTML = stringifyStrBuffer(buf);
        this.el = document.createComment('san:' + this.id);
        parentEl.appendChild(this.el);
    }
    else {
        // 如果不attached则直接创建，如果存在则调用更新函数

        // var attachStump = this;

        // while (newChildsLen--) {
        //     var child = this.childs[newChildsLen];
        //     if (child.lifeCycle.is('attached')) {
        //         childsChanges[newChildsLen].length && child._update(childsChanges[newChildsLen]);
        //     }
        //     else {
        //         child.attach(parentEl, attachStump._getEl() || parentEl.firstChild);
        //     }

        //     attachStump = child;
        // }

        var newChildBuf;

        for (var i = 0; i < newChildsLen; i++) {
            var child = this.childs[i];

            if (child.lifeCycle.is('attached')) {
                childsChanges[i].length && child._update(childsChanges[i]);
            }
            else {
                newChildBuf = newChildBuf || createStrBuffer();
                child._attachHTML(newChildBuf);

                // flush new childs html
                var nextChild = this.childs[i + 1];
                if (!nextChild || nextChild.lifeCycle.is('attached')) {
                    var beforeEl = nextChild && nextChild._getEl();
                    if (!beforeEl) {
                        beforeEl = document.createElement('script');
                        parentEl.insertBefore(beforeEl, this.el || parentEl.firstChild);
                    }
                    beforeEl.insertAdjacentHTML('beforebegin', stringifyStrBuffer(newChildBuf));

                    newChildBuf = null;
                    if (!nextChild) {
                        parentEl.removeChild(beforeEl);
                    }
                }
            }
        }
    }

    attachings.done();
}


// exports = module.exports = createFor;


/**
 * @file 生成子元素html
 * @author errorrik(errorrik@gmail.com)
 */

// var escapeHTML = require('../runtime/escape-html');
// var pushStrBuffer = require('../runtime/push-str-buffer');
// var each = require('../util/each');
// var createNode = require('./create-node');
// var nodeEvalExpr = require('./node-eval-expr');

/**
 * 生成子元素html
 *
 * @param {Element} element 元素
 * @param {Object} buf html串存储对象
 */
function genElementChildsHTML(element, buf) {
    if (element.tagName === 'textarea') {
        var valueProp = element.props.get('value');
        if (valueProp) {
            pushStrBuffer(buf, escapeHTML(nodeEvalExpr(element, valueProp.expr)));
        }
    }
    else {
        var htmlDirective = element.aNode.directives.get('html');

        if (htmlDirective) {
            pushStrBuffer(buf, nodeEvalExpr(element, htmlDirective.value));
        }
        else {
            each(element.aNode.childs, function (aNodeChild) {
                var child = createNode(aNodeChild, element);
                if (!child._static) {
                    element.childs.push(child);
                }
                child._attachHTML(buf);
            });
        }
    }
}

// exports = module.exports = genElementChildsHTML;


/**
 * @file 添加子节点的 ANode
 * @author errorrik(errorrik@gmail.com)
 */

// #[begin] reverse
/**
 * 添加子节点的 ANode
 * 用于从 el 初始化时，需要将解析的元素抽象成 ANode，并向父级注册
 *
 * @param {ANode} aNode 抽象节点对象
 */
function elementOwnPushChildANode(aNode) {
    this.aNode.childs.push(aNode);
}
// #[end]


// exports = module.exports = elementOwnPushChildANode;


/**
 * @file 创建 slot 元素
 * @author errorrik(errorrik@gmail.com)
 */

// var empty = require('../util/empty');
// var createANode = require('../parser/create-a-node');
// var NodeType = require('./node-type');
// var isEndStump = require('./is-end-stump');
// var genElementChildsHTML = require('./gen-element-childs-html');
// var nodeInit = require('./node-init');
// var nodeDispose = require('./node-dispose');
// var createNodeByEl = require('./create-node-by-el');
// var elementDisposeChilds = require('./element-dispose-childs');
// var elementOwnPushChildANode = require('./element-own-push-child-anode');

/**
 * 创建 slot 元素
 *
 * @param {Object} options 初始化参数
 * @return {Object}
 */
function createSlot(options) {
    var literalOwner = options.owner;
    var aNode = createANode();

    // #[begin] reverse
    if (options.el) {
        if (options.stumpText.indexOf('!') !== 0) {
            options.owner = literalOwner.owner;
            options.scope = literalOwner.scope;
            options.stumpText = options.stumpText.slice(1);
        }
        this.name = options.stumpText || '____';
    }
    else {
    // #[end]

        var nameBind = options.aNode.props.get('name');
        this.name = nameBind ? nameBind.raw : '____';

        var givenSlots = literalOwner.aNode.givenSlots;
        var givenChilds = givenSlots && givenSlots[this.name];
        aNode.childs = givenChilds || options.aNode.childs.slice(0);

        if (givenChilds) {
            options.owner = literalOwner.owner;
            options.scope = literalOwner.scope;
        }

    // #[begin] reverse
    }
    // #[end]


    options.aNode = aNode;


    var node = nodeInit(options);
    node.childs = [];
    node._type = NodeType.SLOT;
    node.dispose = slotOwnDispose;

    node._getEl = slotOwnGetEl;
    node._attachHTML = slotOwnAttachHTML;
    node._update = empty;

    // #[begin] reverse
    node._pushChildANode = elementOwnPushChildANode;
    // #[end]

    var parent = node.parent;
    while (parent) {
        if (parent === node.owner) {
            parent.ownSlotChilds.push(node);
            break;
        }

        if (parent._type !== NodeType.SLOT && parent.owner === node.owner) {
            parent.slotChilds.push(node);
            break;
        }

        parent = parent.parent;
    }

    // #[begin] reverse
    if (options.el) {
        /* eslint-disable no-constant-condition */
        while (1) {
        /* eslint-enable no-constant-condition */
            var next = options.elWalker.next;
            if (!next || isEndStump(next, 'slot')) {
                next && options.elWalker.goNext();
                break;
            }

            var child = createNodeByEl(next, node, options.elWalker);
            node.childs.push(child);
            options.elWalker.goNext();
        }

        if (literalOwner !== node.owner) {
            literalOwner.aNode.givenSlots[node.name] = node.aNode;
        }
    }
    // #[end]

    return node;
}


/**
 * attach元素的html
 *
 * @param {Object} buf html串存储对象
 */
function slotOwnAttachHTML(buf) {
    genElementChildsHTML(this, buf);
}

/**
 * 获取 slot 对应的主元素
 * slot 是片段的管理，没有主元素，所以直接返回爹的主元素，不持有引用
 *
 * @return {HTMLElement}
 */
function slotOwnGetEl() {
    return this.parent._getEl();
}

/**
 * 销毁释放 slot
 */
function slotOwnDispose(dontDetach) {
    elementDisposeChilds(this, dontDetach);
    nodeDispose(this);
}

// exports = module.exports = createSlot;


/**
 * @file 遍历和编译已有元素的孩子
 * @author errorrik(errorrik@gmail.com)
 */

// var createNodeByEl = require('./create-node-by-el');

// #[begin] reverse
/**
 * 元素子节点遍历操作对象
 *
 * @inner
 * @class
 * @param {HTMLElement} el 要遍历的元素
 */
function DOMChildsWalker(el) {
    this.raw = [];
    this.index = 0;

    var child = el.firstChild;
    while (child) {
        switch (child.nodeType) {
            case 1:
            case 8:
                this.raw.push(child);
        }

        child = child.nextSibling;
    }

    this.current = this.raw[this.index];
    this.next = this.raw[this.index + 1];
}

/**
 * 往下走一个元素
 */
DOMChildsWalker.prototype.goNext = function () {
    this.current = this.raw[++this.index];
    this.next = this.raw[this.index + 1];
};

/**
 * 遍历和编译已有元素的孩子
 *
 * @param {HTMLElement} element 已有元素
 */
function fromElInitChilds(element) {
    var walker = new DOMChildsWalker(element.el);
    var current;
    while ((current = walker.current)) {
        var child = createNodeByEl(current, element, walker);
        if (child && !child._static) {
            element.childs.push(child);
        }

        walker.goNext();
    }
}
// #[end]

// exports = module.exports = fromElInitChilds;


/**
 * @file attach 元素的 HTML
 * @author errorrik(errorrik@gmail.com)
 */

// var genElementStartHTML = require('./gen-element-start-html');
// var genElementChildsHTML = require('./gen-element-childs-html');
// var genElementEndHTML = require('./gen-element-end-html');
// var attachings = require('./attachings');

/**
 * attach 元素的 HTML
 *
 * @param {Object} buf html串存储对象
 */
function elementOwnAttachHTML(buf) {
    this.lifeCycle.set('painting');

    genElementStartHTML(this, buf);
    genElementChildsHTML(this, buf);
    genElementEndHTML(this, buf);

    attachings.add(this);
}

// exports = module.exports = elementOwnAttachHTML;


/**
 * @file 设置元素属性
 * @author errorrik(errorrik@gmail.com)
 */


// var getPropHandler = require('./get-prop-handler');

/**
 * 设置元素属性
 *
 * @param {Object} element 元素
 * @param {string} name 属性名
 * @param {*} value 属性值
 */
function elementSetElProp(element, name, value) {
    getPropHandler(element, name).prop(element, name, value);
}

// exports = module.exports = elementSetElProp;


/**
 * @file 创建节点对应的 HTMLElement 主元素
 * @author errorrik(errorrik@gmail.com)
 */

// var createEl = require('../browser/create-el');
// var evalExpr = require('../runtime/eval-expr');
// var nodeEvalExpr = require('./node-eval-expr');
// var isComponent = require('./is-component');
// var elementSetElProp = require('./element-set-el-prop');

/**
 * 创建节点对应的 HTMLElement 主元素
 *
 * @param {Object} element 元素节点
 */
function elementCreate(element) {
    element.lifeCycle.set('painting');
    element.el = createEl(element.tagName);
    element.el.id = element.id;

    element.props.each(function (prop) {
        var attr = prop.attr;

        if (!attr) {
            element.dynamicProps.push(prop);
        }

        var value = isComponent(element)
            ? evalExpr(prop.expr, element.data, element)
            : nodeEvalExpr(element, prop.expr, 1);

        elementSetElProp(element, prop.name, value);
    });
}

// exports = module.exports = elementCreate;


/**
 * @file 创建节点对应的 HTMLElement 主元素
 * @author errorrik(errorrik@gmail.com)
 */

// var elementCreate = require('./element-create');

/**
 * 创建节点对应的 HTMLElement 主元素
 */
function elementOwnCreate() {
    if (!this.lifeCycle.is('created')) {
        elementCreate(this);
        this._toPhase('created');
    }
}

// exports = module.exports = elementOwnCreate;


/**
 * @file 将元素attach到页面
 * @author errorrik(errorrik@gmail.com)
 */

// var createStrBuffer = require('../runtime/create-str-buffer');
// var stringifyStrBuffer = require('../runtime/stringify-str-buffer');
// var genElementChildsHTML = require('./gen-element-childs-html');
// var warnSetHTML = require('./warn-set-html');

/**
 * 将元素attach到页面
 *
 * @param {Object} element 元素节点
 * @param {HTMLElement} parentEl 要添加到的父元素
 * @param {HTMLElement＝} beforeEl 要添加到哪个元素之前
 */
function elementAttach(element, parentEl, beforeEl) {
    element._create();
    if (parentEl) {
        if (beforeEl) {
            parentEl.insertBefore(element.el, beforeEl);
        }
        else {
            parentEl.appendChild(element.el);
        }
    }

    if (!element._contentReady) {
        var buf = createStrBuffer();
        genElementChildsHTML(element, buf);

        // html 没内容就不要设置 innerHTML了
        // 这里还能避免在 IE 下 component root 为 input 等元素时设置 innerHTML 报错的问题
        var html = stringifyStrBuffer(buf);
        if (html) {
            // #[begin] error
            warnSetHTML(element.el);
            // #[end]
            element.el.innerHTML = html;
        }

        element._contentReady = 1;
    }
}


// exports = module.exports = elementAttach;


/**
 * @file 将元素attach到页面
 * @author errorrik(errorrik@gmail.com)
 */


// var elementAttach = require('./element-attach');
// var attachings = require('./attachings');

/**
 * 将元素attach到页面
 *
 * @param {HTMLElement} parentEl 要添加到的父元素
 * @param {HTMLElement＝} beforeEl 要添加到哪个元素之前
 */
function elementOwnAttach(parentEl, beforeEl) {
    if (!this.lifeCycle.is('attached')) {
        elementAttach(this, parentEl, beforeEl);
        attachings.add(this);
        attachings.done();

        this._toPhase('attached');
    }
}

// exports = module.exports = elementOwnAttach;


/**
 * @file 将元素从页面上移除
 * @author errorrik(errorrik@gmail.com)
 */

// var removeEl = require('../browser/remove-el');

/**
 * 将元素从页面上移除
 */
function elementOwnDetach() {
    if (this.lifeCycle.is('attached')) {
        removeEl(this._getEl());
        this._toPhase('detached');
    }
}

// exports = module.exports = elementOwnDetach;


/**
 * @file 销毁元素节点
 * @author errorrik(errorrik@gmail.com)
 */

// var elementDisposeChilds = require('./element-dispose-childs');
// var nodeDispose = require('./node-dispose');
// var un = require('../browser/un');

/**
 * 销毁元素节点
 *
 * @param {Object} element 要销毁的元素节点
 * @param {boolean} dontDetach 是否不要将节点从DOM移除
 */
function elementDispose(element, dontDetach) {
    elementDisposeChilds(element, true);

    /* eslint-disable guard-for-in */
    // el 事件解绑
    for (var key in element._elFns) {
        var nameListeners = element._elFns[key];
        var len = nameListeners && nameListeners.length;

        while (len--) {
            un(element._getEl(), key, nameListeners[len]);
        }
    }
    element._elFns = null;
    /* eslint-enable guard-for-in */


    if (!dontDetach || !element.parent) {
        element.detach();
    }
    else if (element._toPhase) {
        element._toPhase('detached');
    }

    element.props = null;
    element.dynamicProps = null;
    element.binds = null;
    element._propVals = null;

    // 这里不用挨个调用 dispose 了，因为 childs 释放链会调用的
    element.slotChilds = null;

    nodeDispose(element);
}


// exports = module.exports = elementDispose;


/**
 * @file 销毁释放元素
 * @author errorrik(errorrik@gmail.com)
 */

// var elementDispose = require('./element-dispose');

/**
 * 销毁释放元素
 *
 * @param {boolean} dontDetach 是否不要将节点移除
 */
function elementOwnDispose(dontDetach) {
    if (!this.lifeCycle.is('disposed')) {
        elementDispose(this, dontDetach);
        this._toPhase('disposed');
    }
}

// exports = module.exports = elementOwnDispose;


/**
 * @file 获取节点对应的主元素
 * @author errorrik(errorrik@gmail.com)
 */

/**
 * 获取节点对应的主元素
 *
 * @return {HTMLElement}
 */
function elementOwnGetEl() {
    if (!this.el) {
        this.el = document.getElementById(this.id);
    }

    return this.el;
}

// exports = module.exports = elementOwnGetEl;


/**
 * @file 为元素的 el 绑定事件
 * @author errorrik(errorrik@gmail.com)
 */

// var on = require('../browser/on');

/**
 * 为元素的 el 绑定事件
 *
 * @param {string} name 事件名
 * @param {Function} listener 监听器
 */
function elementOwnOnEl(name, listener) {
    if (typeof listener === 'function') {
        if (!this._elFns[name]) {
            this._elFns[name] = [];
        }
        this._elFns[name].push(listener);

        on(this._getEl(), name, listener);
    }
}

// exports = module.exports = elementOwnOnEl;


/**
 * @file 是否浏览器环境
 * @author errorrik(errorrik@gmail.com)
 */

var isBrowser = typeof window !== 'undefined';

// exports = module.exports = isBrowser;


/**
 * @file 完成元素 attached 后的行为
 * @author errorrik(errorrik@gmail.com)
 */



// var each = require('../util/each');
// var bind = require('../util/bind');
// var isBrowser = require('../browser/is-browser');

// var eventDeclarationListener = require('./event-declaration-listener');
// var isComponent = require('./is-component');
// var getPropHandler = require('./get-prop-handler');


/**
 * 完成元素 attached 后的行为
 *
 * @param {Object} element 元素节点
 */
function elementAttached(element) {
    element._toPhase('created');

    var data = isComponent(element) ? element.data : element.scope;

    // 处理自身变化时双向绑定的逻辑
    var xBinds = isComponent(element) ? element.props : element.binds;
    xBinds && xBinds.each(function (bindInfo) {
        if (!bindInfo.x) {
            return;
        }

        var el = element._getEl();
        function outputer() {
            getPropHandler(element, bindInfo.name).output(element, bindInfo, data);
        }

        switch (bindInfo.name) {
            case 'value':
                switch (element.tagName) {
                    case 'input':
                    case 'textarea':
                        if (isBrowser && window.CompositionEvent) {
                            element._onEl('compositionstart', function () {
                                this.composing = 1;
                            });
                            element._onEl('compositionend', function () {
                                this.composing = 0;

                                var event = document.createEvent('HTMLEvents');
                                event.initEvent('input', true, true);
                                this.dispatchEvent(event);
                            });
                        }

                        element._onEl(
                            ('oninput' in el) ? 'input' : 'propertychange',
                            function (e) {
                                if (!this.composing) {
                                    outputer(e);
                                }
                            }
                        );

                        break;

                    case 'select':
                        element._onEl('change', outputer);
                        break;
                }
                break;

            case 'checked':
                switch (element.tagName) {
                    case 'input':
                        switch (el.type) {
                            case 'checkbox':
                            case 'radio':
                                element._onEl('click', outputer);
                        }
                }
                break;
        }

    });

    // bind events
    each(element.aNode.events, function (eventBind) {
        element._onEl(
            eventBind.name,
            bind(
                eventDeclarationListener,
                isComponent(element) ? element : element.owner,
                eventBind,
                0,
                element.data || element.scope
            )
        );
    });

    element._toPhase('attached');
}


// exports = module.exports = elementAttached;


/**
 * @file 初始化 element 节点的必须属性
 * @author errorrik(errorrik@gmail.com)
 */

// var LifeCycle = require('./life-cycle');
// var IndexedList = require('../util/indexed-list');

/**
 * 初始化 element 节点的必须属性
 *
 * @param {Object} element 节点对象
 */
function elementInitProps(element) {
    element.lifeCycle = new LifeCycle();
    element.childs = [];
    element.slotChilds = [];
    element._elFns = {};
    element._propVals = {};
    element.dynamicProps = new IndexedList();
}

// exports = module.exports = elementInitProps;


/**
 * @file 初始化 element 节点的 tagName 处理
 * @author errorrik(errorrik@gmail.com)
 */

// var ieOldThan9 = require('../browser/ie-old-than-9');

/**
 * 初始化 element 节点的 tagName 处理
 *
 * @param {Object} node 节点对象
 */
function elementInitTagName(node) {
    node.tagName = node.tagName || node.aNode.tagName || 'div';
    // ie8- 不支持innerHTML输出自定义标签
    if (ieOldThan9 && node.tagName.indexOf('-') > 0) {
        node.tagName = 'div';
    }

    // ie 下，如果 option 没有 value 属性，select.value = xx 操作不会选中 option
    // 所以没有设置 value 时，默认把 option 的内容作为 value
    if (node.tagName === 'option'
        && !node.aNode.props.get('value')
        && node.aNode.childs[0]
    ) {
        node.aNode.props.push({
            name: 'value',
            expr: node.aNode.childs[0].textExpr
        });
    }
}


// exports = module.exports = elementInitTagName;


/**
 * @file 给 devtool 发通知消息
 * @author errorrik(errorrik@gmail.com)
 */

// var isBrowser = require('../browser/is-browser');

// #[begin] devtool
var san4devtool;

/**
 * 给 devtool 发通知消息
 *
 * @param {string} name 消息名称
 * @param {*} arg 消息参数
 */
function emitDevtool(name, arg) {
    if (isBrowser && san4devtool && san4devtool.debug && window.__san_devtool__) {
        window.__san_devtool__.emit(name, arg);
    }
}

emitDevtool.start = function (main) {
    san4devtool = main;
    emitDevtool('san', main);
};
// #[end]

// exports = module.exports = emitDevtool;


/**
 * @file 组件类
 * @author errorrik(errorrik@gmail.com)
 */

// var bind = require('../util/bind');
// var each = require('../util/each');
// var extend = require('../util/extend');
// var nextTick = require('../util/next-tick');
// var emitDevtool = require('../util/emit-devtool');
// var IndexedList = require('../util/indexed-list');
// var ExprType = require('../parser/expr-type');
// var createANode = require('../parser/create-a-node');
// var parseExpr = require('../parser/parse-expr');
// var parseText = require('../parser/parse-text');
// var parseTemplate = require('../parser/parse-template');
// var parseANodeFromEl = require('../parser/parse-anode-from-el');
// var Data = require('../runtime/data');
// var DataChangeType = require('../runtime/data-change-type');
// var evalExpr = require('../runtime/eval-expr');
// var changeExprCompare = require('../runtime/change-expr-compare');

// var defineComponent = require('./define-component');
// var attachings = require('./attachings');
// var isComponent = require('./is-component');
// var isDataChangeByElement = require('./is-data-change-by-element');
// var eventDeclarationListener = require('./event-declaration-listener');
// var fromElInitChilds = require('./from-el-init-childs');
// var postComponentBinds = require('./post-component-binds');
// var camelComponentBinds = require('./camel-component-binds');
// var nodeEvalExpr = require('./node-eval-expr');
// var NodeType = require('./node-type');
// var nodeInit = require('./node-init');
// var elementInitProps = require('./element-init-props');
// var elementInitTagName = require('./element-init-tag-name');
// var elementAttached = require('./element-attached');
// var elementDispose = require('./element-dispose');
// var elementUpdateChilds = require('./element-update-childs');
// var elementSetElProp = require('./element-set-el-prop');
// var elementOwnGetEl = require('./element-own-get-el');
// var elementOwnOnEl = require('./element-own-on-el');
// var elementOwnCreate = require('./element-own-create');
// var elementOwnAttach = require('./element-own-attach');
// var elementOwnDetach = require('./element-own-detach');
// var elementOwnAttachHTML = require('./element-own-attach-html');
// var elementOwnPushChildANode = require('./element-own-push-child-anode');

// var createDataTypesChecker = require('../util/create-data-types-checker');

/* eslint-disable guard-for-in */

/**
 * 组件类
 *
 * @class
 * @param {Object} options 初始化参数
 */
function Component(options) {
    elementInitProps(this);
    options = options || {};

    this.dataChanges = [];
    this.listeners = {};
    this.ownSlotChilds = [];


    this.filters = this.filters || this.constructor.filters || {};
    this.computed = this.computed || this.constructor.computed || {};
    this.messages = this.messages || this.constructor.messages || {};
    this.subTag = options.subTag;

    // compile
    this._compile();

    var me = this;

    var givenANode = options.aNode;
    var protoANode = this.constructor.prototype.aNode;

    if (givenANode) {
        // 组件运行时传入的结构，做slot解析
        var givenSlots = {};
        each(givenANode.childs, function (child) {
            var slotName = '____';
            var slotBind = !child.isText && child.props.get('slot');
            if (slotBind) {
                slotName = slotBind.raw;
            }

            if (!givenSlots[slotName]) {
                givenSlots[slotName] = [];
            }

            givenSlots[slotName].push(child);
        });

        this.aNode = createANode({
            tagName: protoANode.tagName || givenANode.tagName,
            givenSlots: givenSlots,

            // 组件的实际结构应为template编译的结构
            childs: protoANode.childs,

            // 合并运行时的一些绑定和事件声明
            props: protoANode.props,
            binds: camelComponentBinds(givenANode.props),
            events: protoANode.events,
            directives: givenANode.directives
        });
        each(givenANode.events, function (eventBind) {
            me.on(
                eventBind.name,
                bind(eventDeclarationListener, options.owner, eventBind, 1, options.scope),
                eventBind
            );
        });
    }

    this._toPhase('compiled');

    // init data
    this.data = new Data(
        extend(
            typeof this.initData === 'function' && this.initData() || {},
            options.data
        )
    );

    nodeInit(options, this);

    // #[begin] reverse
    if (this.el) {
        this.aNode = parseANodeFromEl(this.el);
        this.aNode.givenSlots = {};
        this.aNode.binds = camelComponentBinds(this.aNode.props);
        this.aNode.props = this.constructor.prototype.aNode.props;

        this.parent && this.parent._pushChildANode(this.aNode);
        this.tagName = this.aNode.tagName;

        fromElInitChilds(this);
        attachings.add(this);
    }
    // #[end]

    elementInitTagName(this);
    this.props = this.aNode.props;
    this.binds = this.aNode.binds || this.aNode.props;

    postComponentBinds(this.binds);
    this.scope && this.binds.each(function (bind) {
        me.data.set(bind.name, nodeEvalExpr(me, bind.expr));
    });

    // #[begin] error
    // 在初始化 + 数据绑定后，开始数据校验
    // NOTE: 只在开发版本中进行属性校验
    var dataTypes = this.dataTypes || this.constructor.dataTypes;
    if (dataTypes) {
        var dataTypeChecker = createDataTypesChecker(
            dataTypes,
            this.subTag || this.name || this.constructor.name
        );
        this.data.setTypeChecker(dataTypeChecker);
        this.data.checkDataTypes();
    }
    // #[end]

    this.computedDeps = {};
    for (var expr in this.computed) {
        if (!this.computedDeps[expr]) {
            this._calcComputed(expr);
        }
    }

    if (!this.dataChanger) {
        this.dataChanger = bind(this._dataChanger, this);
        this.data.listen(this.dataChanger);
    }
    this._toPhase('inited');

    // #[begin] reverse
    // 如果从el编译的，认为已经attach了，触发钩子
    if (this.el) {
        attachings.done();
    }
    // #[end]
}

/**
 * 类型标识
 *
 * @protected
 * @type {string}
 */
Component.prototype._type = NodeType.CMPT;

/* eslint-disable operator-linebreak */
/**
 * 使节点到达相应的生命周期
 *
 * @protected
 * @param {string} name 生命周期名称
 */
Component.prototype._callHook =
Component.prototype._toPhase = function (name) {
    if (this.lifeCycle.is(name)) {
        return;
    }

    this.lifeCycle.set(name);

    if (typeof this[name] === 'function') {
        this[name](this);
    }

    // 通知devtool
    // #[begin] devtool
    emitDevtool('comp-' + name, this);
    // #[end]
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
    each(this.listeners[name], function (listener) {
        listener.fn.call(this, event);
    }, this);
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

    this.data.set(computedExpr, this.computed[computedExpr].call({
        data: {
            get: bind(function (expr) {
                // #[begin] error
                if (!expr) {
                    throw new Error('[SAN ERROR] call get method in computed need argument');
                }
                // #[end]

                if (!computedDeps[expr]) {
                    computedDeps[expr] = 1;

                    if (this.computed[expr]) {
                        this._calcComputed(expr);
                    }

                    this.watch(expr, function () {
                        this._calcComputed(computedExpr);
                    });
                }

                return this.data.get(expr);
            }, this)
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
        if (typeof parentComponent.messages[name] === 'function') {
            parentComponent.messages[name].call(
                parentComponent,
                {target: this, value: value}
            );
            break;
        }

        parentComponent = parentComponent.parentComponent;
    }
};

/**
 * 获取带有 san-ref 指令的子组件引用
 *
 * @param {string} name 子组件的引用名
 * @return {Component}
 */
Component.prototype.ref = function (name) {
    var refComponent;
    var owner = this;

    function slotChildsTraversal(childs) {
        each(childs, function (slotChild) {
            childsTraversal(slotChild);
            return !refComponent;
        });
    }

    function childsTraversal(element) {
        slotChildsTraversal(element.slotChilds);

        each(element.childs, function (child) {
            if (isComponent(child)) {
                var refDirective = child.aNode.directives.get('ref');
                if (refDirective
                    && evalExpr(refDirective.value, child.scope || owner.data, owner) === name
                ) {
                    refComponent = child;
                }

                slotChildsTraversal(child.slotChilds);
            }

            if (!refComponent && child._type !== NodeType.TEXT) {
                childsTraversal(child);
            }

            return !refComponent;
        });
    }

    childsTraversal(this);
    slotChildsTraversal(this.ownSlotChilds);

    return refComponent;
};

/* eslint-disable quotes */
var componentPropExtra = [
    {name: 'class', expr: parseText("{{class | _class | _sep(' ')}}")},
    {name: 'style', expr: parseText("{{style | _style | _sep(';')}}")}
];
/* eslint-enable quotes */


/**
 * 模板编译行为
 *
 * @private
 */
Component.prototype._compile = function () {
    var ComponentClass = this.constructor;
    var proto = ComponentClass.prototype;

    // pre define components class
    if (!proto.hasOwnProperty('_cmptReady')) {
        proto.components =  ComponentClass.components || proto.components || {};
        var components = proto.components;

        for (var key in components) {
            var componentClass = components[key];

            if (typeof componentClass === 'object') {
                components[key] = defineComponent(componentClass);
            }
            else if (componentClass === 'self') {
                components[key] = ComponentClass;
            }
        }

        proto._cmptReady = 1;
    }


    // pre compile template
    if (!proto.hasOwnProperty('_compiled')) {
        proto.aNode = createANode();

        var tpl = ComponentClass.template || proto.template;
        if (tpl) {
            var aNode = parseTemplate(tpl, {
                trimWhitespace: proto.trimWhitespace || ComponentClass.trimWhitespace
            });
            var firstChild = aNode.childs[0];

            // #[begin] error
            if (aNode.childs.length !== 1 || firstChild.isText) {
                throw new Error('[SAN FATAL] template must have a root element.');
            }
            // #[end]

            proto.aNode = firstChild;
            if (firstChild.tagName === 'template') {
                firstChild.tagName = null;
            }

            firstChild.binds = new IndexedList();

            each(componentPropExtra, function (extra) {
                var prop = firstChild.props.get(extra.name);
                if (prop) {
                    prop.expr.segs.push(extra.expr.segs[0]);
                    prop.expr.value = null;
                    prop.attr = null;
                }
                else {
                    firstChild.props.push({
                        name: extra.name,
                        expr: extra.expr
                    });
                }
            });
        }

        proto._compiled = 1;
    }
};

/**
 * 视图更新函数
 *
 * @param {Array?} changes 数据变化信息
 */
Component.prototype._update = function (changes) {
    if (this.lifeCycle.is('disposed')) {
        return;
    }

    var me = this;

    each(changes, function (change) {
        var changeExpr = change.expr;

        me.binds.each(function (bindItem) {
            var relation;
            var setExpr = bindItem.name;
            var updateExpr = bindItem.expr;

            if (!isDataChangeByElement(change, me, setExpr)
                && (relation = changeExprCompare(changeExpr, updateExpr, me.scope))
            ) {
                if (relation > 2) {
                    setExpr = {
                        type: ExprType.ACCESSOR,
                        paths: [{
                            type: ExprType.STRING,
                            value: setExpr
                        }].concat(changeExpr.paths.slice(updateExpr.paths.length))
                    };
                    updateExpr = changeExpr;
                }

                me.data.set(setExpr, nodeEvalExpr(me, updateExpr), {
                    target: {
                        id: me.owner.id
                    }
                });
            }
        });
    });

    each(this.slotChilds, function (child) {
        elementUpdateChilds(child, changes);
    });


    var dataChanges = me.dataChanges;
    if (dataChanges.length) {
        me.dataChanges = [];
        me.props.each(function (prop) {
            each(dataChanges, function (change) {
                if (changeExprCompare(change.expr, prop.expr, me.data)
                    || prop.hintExpr && changeExprCompare(change.expr, prop.hintExpr, me.data)
                ) {
                    elementSetElProp(
                        me,
                        prop.name,
                        evalExpr(prop.expr, me.data, me)
                    );

                    return false;
                }
            });
        });

        elementUpdateChilds(this, dataChanges, 'ownSlotChilds');

        this._toPhase('updated');

        if (me.owner) {
            each(dataChanges, function (change) {
                me.binds.each(function (bindItem) {
                    var changeExpr = change.expr;
                    if (bindItem.x
                        && !isDataChangeByElement(change, me.owner)
                        && changeExprCompare(changeExpr, parseExpr(bindItem.name), me.data)
                    ) {
                        var updateScopeExpr = bindItem.expr;
                        if (changeExpr.paths.length > 1) {
                            updateScopeExpr = {
                                type: ExprType.ACCESSOR,
                                paths: bindItem.expr.paths.concat(changeExpr.paths.slice(1))
                            };
                        }

                        me.scope.set(
                            updateScopeExpr,
                            evalExpr(changeExpr, me.data, me),
                            {
                                target: {
                                    id: me.id,
                                    prop: bindItem.name
                                }
                            }
                        );
                    }
                });
            });

            me.owner._update();
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
    if (this.lifeCycle.is('painting') || this.lifeCycle.is('created')) {
        var len = this.dataChanges.length;

        if (!len) {
            nextTick(this._update, this);
        }

        while (len--) {
            switch (changeExprCompare(change.expr, this.dataChanges[len].expr)) {
                case 1:
                case 2:
                    if (change.type === DataChangeType.SET) {
                        this.dataChanges.splice(len, 1);
                    }
            }
        }

        this.dataChanges.push(change);
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
 * 组件销毁的行为
 *
 * @param {boolean} dontDetach 是否不要将节点从DOM移除
 */
Component.prototype.dispose = function (dontDetach) {
    if (!this.lifeCycle.is('disposed')) {
        elementDispose(this, dontDetach);

        this.ownSlotChilds = null;

        this.data.unlisten();
        this.dataChanger = null;
        this.dataChanges = null;

        this.listeners = null;

        this._toPhase('disposed');
    }
};

/**
 * 完成组件 attached 后的行为
 *
 * @param {Object} element 元素节点
 */
Component.prototype._attached = function () {
    this._getEl();
    elementAttached(this);
};

Component.prototype.attach = elementOwnAttach;
Component.prototype.detach = elementOwnDetach;
Component.prototype._attachHTML = elementOwnAttachHTML;
Component.prototype._create = elementOwnCreate;
Component.prototype._getEl = elementOwnGetEl;
Component.prototype._onEl = elementOwnOnEl;

// #[begin] reverse
Component.prototype._pushChildANode = elementOwnPushChildANode;
// #[end]

// exports = module.exports = Component;


/**
 * @file 创建组件类
 * @author errorrik(errorrik@gmail.com)
 */

// var Component = require('./component');
// var inherits = require('../util/inherits');

/**
 * 创建组件类
 *
 * @param {Object} proto 组件类的方法表
 * @return {Function}
 */
function defineComponent(proto) {
    // 如果传入一个不是 san component 的 constructor，直接返回不是组件构造函数
    // 这种场景导致的错误 san 不予考虑
    if (typeof proto === 'function') {
        return proto;
    }

    // #[begin] error
    if (typeof proto !== 'object') {
        throw new Error('[SAN FATAL] param must be a plain object.');
    }
    // #[end]

    function ComponentClass(option) {
        Component.call(this, option);
    }

    ComponentClass.prototype = proto;
    inherits(ComponentClass, Component);

    return ComponentClass;
}

// exports = module.exports = defineComponent;


/**
 * @file 将组件的绑定信息进行后处理
 * @author errorrik(errorrik@gmail.com)
 */


// var postProp = require('../parser/post-prop');

/**
 * 将组件的绑定信息进行后处理
 *
 * 扁平化：
 * 当 text 解析只有一项时，要么就是 string，要么就是 interp
 * interp 有可能是绑定到组件属性的表达式，不希望被 eval text 成 string
 * 所以这里做个处理，只有一项时直接抽出来
 *
 * bool属性：
 * 当绑定项没有值时，默认为true
 *
 * @param {IndexedList} binds 组件绑定信息集合对象
 */
function postComponentBinds(binds) {
    binds.each(function (bind) {
        postProp(bind);
    });
}

// exports = module.exports = postComponentBinds;


/**
 * @file 把 kebab case 字符串转换成 camel case
 * @author errorrik(errorrik@gmail.com)
 */

/**
 * 把 kebab case 字符串转换成 camel case
 *
 * @param {string} source 源字符串
 * @return {string}
 */
function kebab2camel(source) {
    return source.replace(/-([a-z])/g, function (match, alpha) {
        return alpha.toUpperCase();
    });
}

// exports = module.exports = kebab2camel;


/**
 * @file 将 binds 的 name 从 kebabcase 转换成 camelcase
 * @author errorrik(errorrik@gmail.com)
 */

// var kebab2camel = require('../util/kebab2camel');
// var IndexedList = require('../util/indexed-list');

/**
 * 将 binds 的 name 从 kebabcase 转换成 camelcase
 *
 * @param {IndexedList} binds binds集合
 * @return {IndexedList}
 */
function camelComponentBinds(binds) {
    var result = new IndexedList();
    binds.each(function (bind) {
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
 * @file 把 camel case 字符串转换成 kebab case
 * @author errorrik(errorrik@gmail.com)
 */

// #[begin] ssr
// /**
//  * 把 camel case 字符串转换成 kebab case
//  *
//  * @param {string} source 源字符串
//  * @return {string}
//  */
// function camel2kebab(source) {
//     return source.replace(/[A-Z]/g, function (match) {
//         return '-' + match.toLowerCase();
//     });
// }
// #[end]

// exports = module.exports = camel2kebab;


/**
 * @file 编译源码的 helper 方法集合
 * @author errorrik(errorrik@gmail.com)
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
//                 if (path.type === ExprType.ACCESSOR) {
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
//      * 生成插值代码
//      *
//      * @param {Object} interpExpr 插值表达式对象
//      * @return {string}
//      */
//     interp: function (interpExpr) {
//         var code = compileExprSource.expr(interpExpr.expr);
// 
//         each(interpExpr.filters, function (filter) {
//             code = 'componentCtx.callFilter("' + filter.name + '", [' + code;
//             each(filter.args, function (arg) {
//                 code += ', ' + compileExprSource.expr(arg);
//             });
//             code += '])';
//         });
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
//             if (seg.type === ExprType.INTERP && !seg.filters[0]) {
//                 seg = {
//                     type: ExprType.INTERP,
//                     expr: seg.expr,
//                     filters: [
//                         {
//                             type: ExprType.CALL,
//                             name: 'html',
//                             args: []
//                         }
//                     ]
//                 };
//             }
// 
//             var segCode = compileExprSource.expr(seg);
//             code += code ? ' + ' + segCode : segCode;
//         });
// 
//         return code;
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
//         switch (expr.type) {
//             case ExprType.UNARY:
//                 return '!' + compileExprSource.expr(expr.expr);
// 
//             case ExprType.BINARY:
//                 return compileExprSource.expr(expr.segs[0])
//                     + compileExprSource.binaryOp[expr.operator]
//                     + compileExprSource.expr(expr.segs[1]);
// 
//             case ExprType.TERTIARY:
//                 return compileExprSource.expr(expr.segs[0])
//                     + '?' + compileExprSource.expr(expr.segs[1])
//                     + ':' + compileExprSource.expr(expr.segs[2]);
// 
//             case ExprType.STRING:
//                 return compileExprSource.stringLiteralize(expr.value);
// 
//             case ExprType.NUMBER:
//                 return expr.value;
// 
//             case ExprType.BOOL:
//                 return expr.value ? 'true' : 'false';
// 
//             case ExprType.ACCESSOR:
//                 return compileExprSource.dataAccess(expr);
// 
//             case ExprType.INTERP:
//                 return compileExprSource.interp(expr);
// 
//             case ExprType.TEXT:
//                 return compileExprSource.text(expr);
//         }
//     }
// };
// #[end]

// exports = module.exports = compileExprSource;


/**
 * @file 编译源码的中间buffer类
 * @author errorrik(errorrik@gmail.com)
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
//     this.addRaw('function (data, parentCtx) {');
//     this.addRaw('var html = "";');
// };
// 
// /**
//  * 添加renderer方法的结束源码
//  */
// CompileSourceBuffer.prototype.addRendererEnd = function () {
//     this.addRaw('return html;');
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
//                 code.push('html += stringifier.any(' + compileExprSource.dataAccess() + ');');
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
// #[end]

// exports = module.exports = CompileSourceBuffer;


/**
 * @file 序列化一个ANode
 * @author errorrik(errorrik@gmail.com)
 */

// var each = require('../util/each');
// var autoCloseTags = require('../browser/auto-close-tags');


// #[begin] ssr
// /**
//  * 序列化一个ANode
//  *
//  * @param {ANode} aNode aNode对象
//  * @return {string}
//  */
// function serializeANode(aNode) {
//     if (aNode.isText) {
//         return aNode.text;
//     }
// 
//     var tagName = aNode.tagName;
// 
//     // start tag
//     var str = '<' + tagName;
// 
//     // for directives
//     var hasElse;
//     aNode.directives.each(function (directive) {
//         if (directive.name === 'else' || directive.name === 'if' && directive.isElse) {
//             if (!hasElse) {
//                 str += ' s-else';
//             }
//             hasElse = 1;
// 
//             return;
//         }
// 
//         str += ' s-' + directive.name + '="' + directive.raw + '"';
//     });
// 
//     // for events
//     each(aNode.events, function (event) {
//         str += ' on-' + event.name + '="' + event.expr.raw + '"';
//     });
// 
//     // for props
//     aNode.props.each(function (prop) {
//         str += ' ' + prop.name + '="' + prop.raw + '"';
//     });
// 
//     if (autoCloseTags[tagName]) {
//         str += ' />';
//     }
//     else {
//         str += '>';
// 
//         // for childs
//         each(aNode.childs, function (child) {
//             str += serializeANode(child);
//         });
// 
//         // close tag
//         str += '</' + tagName + '>';
//     }
// 
//     return str;
// }
// #[end]

// exports = module.exports = serializeANode;


/**
 * @file 将组件编译成 render 方法的 js 源码
 * @author errorrik(errorrik@gmail.com)
 */


// var each = require('../util/each');
// var camel2kebab = require('../util/camel2kebab');
// var IndexedList = require('../util/indexed-list');
// var parseExpr = require('../parser/parse-expr');
// var createANode = require('../parser/create-a-node');
// var escapeHTML = require('../runtime/escape-html');
// var autoCloseTags = require('../browser/auto-close-tags');
// var CompileSourceBuffer = require('./compile-source-buffer');
// var compileExprSource = require('./compile-expr-source');
// var postComponentBinds = require('./post-component-binds');
// var serializeANode = require('./serialize-a-node');

// #[begin] ssr
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
//     /**
//      * 编译元素标签头
//      *
//      * @param {CompileSourceBuffer} sourceBuffer 编译源码的中间buffer
//      * @param {string} tagName 标签名
//      * @param {IndexedList} props 属性列表
//      * @param {IndexedList} binds 绑定信息列表
//      * @param {Array} events 绑定事件列表
//      * @param {Object} aNode 对应的抽象节点对象
//      * @param {string?} extraProp 额外的属性串
//      * @param {boolean?} isComponent 是否组件
//      */
//     tagStart: function (sourceBuffer, tagName, props, binds, events, aNode, extraProp, isComponent) {
//         sourceBuffer.joinString('<' + tagName);
//         sourceBuffer.joinString(extraProp || '');
// 
//         binds.each(function (bindInfo) {
//             if (isComponent) {
//                 sourceBuffer.joinString(
//                     ' prop-' + camel2kebab(bindInfo.name)
//                         + (bindInfo.raw ? '="' + bindInfo.raw + '"' : '')
//                 );
//             }
//             else if (bindInfo.raw) {
//                 sourceBuffer.joinString(
//                     ' prop-' + camel2kebab(bindInfo.name) + '="' + bindInfo.raw + '"'
//                 );
//             }
// 
//         });
// 
//         var htmlDirective = aNode.directives.get('html');
//         if (htmlDirective) {
//             sourceBuffer.joinString(' s-html="' + htmlDirective.raw + '"');
//         }
// 
//         each(events, function (event) {
//             sourceBuffer.joinString(' on-' + event.name + '="' + event.expr.raw + '"');
//         });
// 
//         props.each(function (prop) {
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
//                 case 'draggable':
//                 case 'readonly':
//                 case 'disabled':
//                 case 'mutiple':
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
//                         var valueProp = props.get('value');
//                         var valueCode = compileExprSource.expr(valueProp.expr);
// 
//                         if (valueProp) {
//                             switch (props.get('type').raw) {
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
//                     if (prop.expr.value) {
//                         sourceBuffer.joinString(' ' + prop.name + '="' + prop.expr.value + '"');
//                     }
//                     else {
//                         sourceBuffer.joinRaw('attrFilter("' + prop.name + '", '
//                             + compileExprSource.expr(prop.expr)
//                             + ')'
//                         );
//                     }
//                     break;
//             }
//         });
// 
//         sourceBuffer.joinString('>');
//     },
//     /* eslint-enable max-params */
// 
//     /**
//      * 编译元素闭合
//      *
//      * @param {CompileSourceBuffer} sourceBuffer 编译源码的中间buffer
//      * @param {string} tagName 标签名
//      */
//     tagEnd: function (sourceBuffer, tagName) {
//         if (!autoCloseTags[tagName]) {
//             sourceBuffer.joinString('</' + tagName + '>');
//         }
// 
//         if (tagName === 'select') {
//             sourceBuffer.addRaw('$selectValue = null;');
//         }
// 
//         if (tagName === 'option') {
//             sourceBuffer.addRaw('$optionValue = null;');
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
//             var valueProp = aNode.props.get('value');
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
//         var htmlDirective = aNode.directives.get('html');
//         if (htmlDirective) {
//             sourceBuffer.joinExpr(htmlDirective.value);
//         }
//         else {
//             /* eslint-disable no-use-before-define */
//             each(aNode.childs, function (aNodeChild) {
//                 sourceBuffer.addRaw(aNodeCompiler.compile(aNodeChild, sourceBuffer, owner));
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
//         if (aNode.isText) {
//             compileMethod = 'compileText';
//         }
//         else if (aNode.directives.get('if')) {
//             compileMethod = 'compileIf';
//         }
//         else if (aNode.directives.get('for')) {
//             compileMethod = 'compileFor';
//         }
//         else if (aNode.tagName === 'slot') {
//             compileMethod = 'compileSlot';
//         }
//         else {
//             var ComponentType = owner.components[aNode.tagName];
//             if (ComponentType) {
//                 compileMethod = 'compileComponent';
//                 extra.ComponentClass = ComponentType;
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
//         var value = aNode.textExpr.value;
// 
//         if (value == null) {
//             sourceBuffer.joinString('<!--s-text:' + aNode.text + '-->');
//             sourceBuffer.joinExpr(aNode.textExpr);
//             sourceBuffer.joinString('<!--/s-text-->');
//         }
//         else {
//             sourceBuffer.joinString(value);
//         }
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
//         sourceBuffer.addRaw('(function () {');
//         sourceBuffer.addRaw('var ifIndex = null;');
// 
//         // for ifIndex
//         var ifDirective = aNode.directives.get('if');
//         sourceBuffer.addRaw('if (' + compileExprSource.expr(ifDirective.value) + ') {');
//         sourceBuffer.addRaw('    ifIndex = -1;');
//         sourceBuffer.addRaw('}');
//         each(aNode.elses, function (elseANode, index) {
//             var elifDirective = elseANode.directives.get('elif');
//             if (elifDirective) {
//                 sourceBuffer.addRaw('else if (' + compileExprSource.expr(elifDirective.value) + ') {');
//             }
//             else {
//                 sourceBuffer.addRaw('else {');
//             }
// 
//             sourceBuffer.addRaw('    ifIndex = ' + index + ';');
//             sourceBuffer.addRaw('}');
//         });
// 
//         // for output main if html
//         sourceBuffer.addRaw('if (ifIndex === -1) {');
//         sourceBuffer.addRaw(
//             aNodeCompiler.compile(
//                 rinseANode(aNode),
//                 sourceBuffer,
//                 owner,
//                 {prop: ' s-if="' + escapeHTML(ifDirective.raw) + '"'}
//             )
//         );
//         sourceBuffer.addRaw('} else {');
//         sourceBuffer.joinString(serializeStump('if', serializeANode(aNode)));
//         sourceBuffer.addRaw('}');
// 
//         // for output else html
//         each(aNode.elses, function (elseANode, index) {
//             var elifDirective = elseANode.directives.get('elif');
//             sourceBuffer.addRaw('if (ifIndex === ' + index + ') {');
//             sourceBuffer.addRaw(
//                 aNodeCompiler.compile(
//                     rinseANode(elseANode),
//                     sourceBuffer,
//                     owner,
//                     {
//                         prop: elifDirective ? ' s-elif="' + escapeHTML(elifDirective.raw) + '"' : ' s-else'
//                     }
//                 )
//             );
//             sourceBuffer.addRaw('} else {');
//             sourceBuffer.joinString(serializeStump(elifDirective ? 'elif' : 'else', serializeANode(elseANode)));
//             sourceBuffer.addRaw('}');
//         });
// 
//         sourceBuffer.addRaw('})();');
// 
//         /**
//          * 清洗 if aNode，返回纯净无 if 指令的 aNode
//          *
//          * @param {ANode} ifANode 节点对象
//          * @return {ANode}
//          */
//         function rinseANode(ifANode) {
//             var result = createANode({
//                 childs: ifANode.childs,
//                 props: ifANode.props,
//                 events: ifANode.events,
//                 tagName: ifANode.tagName,
//                 directives: (new IndexedList()).concat(ifANode.directives)
//             });
//             result.directives.remove('if');
//             result.directives.remove('elif');
//             result.directives.remove('else');
// 
//             return result;
//         }
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
//         var forElementANode = createANode({
//             childs: aNode.childs,
//             props: aNode.props,
//             events: aNode.events,
//             tagName: aNode.tagName,
//             directives: (new IndexedList()).concat(aNode.directives)
//         });
//         forElementANode.directives.remove('for');
// 
//         var forDirective = aNode.directives.get('for');
//         var itemName = forDirective.item.raw;
//         var indexName = forDirective.index.raw;
//         var listName = compileExprSource.dataAccess(forDirective.list);
// 
//         // start stump
//         sourceBuffer.joinString(serializeStump('for', serializeANode(aNode)));
// 
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
//         // stop stump
//         sourceBuffer.joinString(serializeStumpEnd('for'));
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
//         var nameProp = aNode.props.get('name');
//         var name = nameProp ? nameProp.raw : '____';
//         var isGivenContent = 0;
//         var childs = aNode.childs;
// 
//         if (owner.aNode.givenSlots[name]) {
//             isGivenContent = 1;
//             childs = owner.aNode.givenSlots[name];
//             owner = owner.owner;
//         }
// 
//         var stumpText = (!isGivenContent ? '!' : '')
//             + (nameProp ? nameProp.raw : '');
//         sourceBuffer.joinString(serializeStump('slot', stumpText));
// 
//         if (isGivenContent) {
//             sourceBuffer.addRaw('(function (componentCtx) {');
//         }
// 
//         each(childs, function (aNodeChild) {
//             sourceBuffer.addRaw(aNodeCompiler.compile(aNodeChild, sourceBuffer, owner));
//         });
// 
//         if (isGivenContent) {
//             sourceBuffer.addRaw('})(componentCtx.owner);');
//         }
// 
//         sourceBuffer.joinString(serializeStumpEnd('slot'));
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
//     compileElement: function (aNode, sourceBuffer, owner, extra) {
//         extra = extra || {};
//         if (aNode.tagName === 'option'
//             && !aNode.props.get('value')
//             && aNode.childs[0]
//         ) {
//             aNode.props.push({
//                 name: 'value',
//                 expr: aNode.childs[0].textExpr
//             });
//         }
// 
//         elementSourceCompiler.tagStart(
//             sourceBuffer,
//             aNode.tagName,
//             aNode.props,
//             aNode.props,
//             aNode.events,
//             aNode,
//             extra.prop
//         );
// 
//         elementSourceCompiler.inner(sourceBuffer, aNode, owner);
//         elementSourceCompiler.tagEnd(sourceBuffer, aNode.tagName);
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
//         var ComponentClass = extra.ComponentClass;
//         var component = new ComponentClass({
//             aNode: aNode,
//             owner: owner,
//             subTag: aNode.tagName
//         });
// 
//         var givenData = [];
// 
//         postComponentBinds(aNode.props);
//         component.binds.each(function (prop) {
//             givenData.push(
//                 compileExprSource.stringLiteralize(prop.name)
//                 + ':'
//                 + compileExprSource.expr(prop.expr)
//             );
//         });
// 
//         sourceBuffer.addRaw('html += (');
//         sourceBuffer.addRendererStart();
//         compileComponentSource(sourceBuffer, component, extra && extra.prop);
//         sourceBuffer.addRendererEnd();
//         sourceBuffer.addRaw(')({' + givenData.join(',\n') + '}, componentCtx);');
//     }
// };
// 
// /* eslint-disable guard-for-in */
// 
// /**
//  * 生成组件 renderer 时 ctx 对象构建的代码
//  *
//  * @inner
//  * @param {CompileSourceBuffer} sourceBuffer 编译源码的中间buffer
//  * @param {Object} component 组件实例
//  * @param {string?} extraProp 额外的属性串
//  */
// function compileComponentSource(sourceBuffer, component, extraProp) {
//     sourceBuffer.addRaw(genComponentContextCode(component));
//     sourceBuffer.addRaw('componentCtx.owner = parentCtx;');
//     sourceBuffer.addRaw('data = extend(componentCtx.data, data);');
//     sourceBuffer.addRaw('for (var $i = 0; $i < componentCtx.computedNames.length; $i++) {');
//     sourceBuffer.addRaw('var $computedName = componentCtx.computedNames[$i];');
//     sourceBuffer.addRaw('data[$computedName] = componentCtx.computed[$computedName]();');
//     sourceBuffer.addRaw('}');
// 
//     extraProp = extraProp || '';
//     if (component.subTag) {
//         extraProp += ' s-component="' + component.subTag + '"';
//     }
// 
//     var refDirective = component.aNode.directives.get('ref');
//     if (refDirective) {
//         extraProp += ' s-ref="' + refDirective.value.raw + '"';
//     }
// 
//     var eventDeclarations = [];
//     for (var key in component.listeners) {
//         each(component.listeners[key], function (listener) {
//             if (listener.declaration) {
//                 eventDeclarations.push(listener.declaration);
//             }
//         });
//     }
// 
//     elementSourceCompiler.tagStart(
//         sourceBuffer,
//         component.tagName,
//         component.props,
//         component.binds,
//         eventDeclarations,
//         component.aNode,
//         extraProp,
//         1
//     );
// 
//     if (!component.owner) {
//         sourceBuffer.joinString('<!--s-data:');
//         sourceBuffer.joinDataStringify();
//         sourceBuffer.joinString('-->');
//     }
// 
//     elementSourceCompiler.inner(sourceBuffer, component.aNode, component);
//     elementSourceCompiler.tagEnd(sourceBuffer, component.tagName);
// }
// 
// var stringifier = {
//     obj: function (source) {
//         var prefixComma;
//         var result = '{';
// 
//         for (var key in source) {
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
// /**
//  * 生成组件 renderer 时 ctx 对象构建的代码
//  *
//  * @inner
//  * @param {Object} component 组件实例
//  * @return {string}
//  */
// function genComponentContextCode(component) {
//     var code = ['var componentCtx = {'];
// 
//     // filters
//     code.push('filters: {');
//     var filterCode = [];
//     for (var key in component.filters) {
//         var filter = component.filters[key];
// 
//         if (typeof filter === 'function') {
//             filterCode.push(key + ': ' + filter.toString());
//         }
//     }
//     code.push(filterCode.join(','));
//     code.push('},');
// 
//     code.push(
//         'callFilter: function (name, args) {',
//         '    var filter = this.filters[name] || DEFAULT_FILTERS[name];',
//         '    if (typeof filter === "function") {',
//         '        return filter.apply(this, args);',
//         '    }',
//         '},'
//     );
// 
//     /* eslint-disable no-redeclare */
//     // computed obj
//     code.push('computed: {');
//     var computedCode = [];
//     for (var key in component.computed) {
//         var computed = component.computed[key];
// 
//         if (typeof computed === 'function') {
//             computedCode.push(key + ': '
//                 + computed.toString().replace(
//                     /this.data.get\(([^\)]+)\)/g,
//                     function (match, exprLiteral) {
//                         var exprStr = (new Function('return ' + exprLiteral))();
//                         var expr = parseExpr(exprStr);
// 
//                         return compileExprSource.expr(expr);
//                     })
//             );
//         }
//     }
//     code.push(computedCode.join(','));
//     code.push('},');
// 
//     // computed names
//     code.push('computedNames: [');
//     computedCode = [];
//     for (var key in component.computed) {
//         var computed = component.computed[key];
// 
//         if (typeof computed === 'function') {
//             computedCode.push('"' + key + '"');
//         }
//     }
//     code.push(computedCode.join(','));
//     code.push('],');
//     /* eslint-enable no-redeclare */
// 
//     // data
//     code.push('data: ' + stringifier.any(component.data.get()) + ',');
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
// /* eslint-disable no-unused-vars */
// /* eslint-disable fecs-camelcase */
// 
// /**
//  * 组件编译的模板函数
//  *
//  * @inner
//  */
// function componentCompilePreCode() {
//     var $version = '3.2.9';
// 
//     function extend(target, source) {
//         if (source) {
//             Object.keys(source).forEach(function (key) {
//                 target[key] = source[key];
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
//         return String(source).replace(/[&<>"']/g, htmlFilterReplacer);
//     }
// 
//     var DEFAULT_FILTERS = {
//         html: escapeHTML,
//         url: encodeURIComponent,
//         raw: function (source) {
//             return source;
//         },
//         _class: function (source) {
//             if (source instanceof Array) {
//                 return source.join(' ');
//             }
// 
//             return source;
//         },
//         _style: function (source) {
//             if (typeof source === 'object') {
//                 var result = '';
//                 if (source) {
//                     Object.keys(source).forEach(function (key) {
//                         result += key + ':' + source[key] + ';';
//                     });
//                 }
// 
//                 return result;
//             }
// 
//             return source || '';
//         },
//         _sep: function (source, sep) {
//             return source ? sep + source : '';
//         }
//     };
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
//     function stringLiteralize(source) {
//         return '"'
//             + source
//                 .replace(/\x5C/g, '\\\\')
//                 .replace(/"/g, '\\"')
//                 .replace(/\x0A/g, '\\n')
//                 .replace(/\x09/g, '\\t')
//                 .replace(/\x0D/g, '\\r')
//             + '"';
//     }
// 
//     var stringifier = {
//         obj: function (source) {
//             var prefixComma;
//             var result = '{';
// 
//             Object.keys(source).forEach(function (key) {
//                 if (prefixComma) {
//                     result += ',';
//                 }
//                 prefixComma = 1;
// 
//                 result += stringLiteralize(key) + ':' + stringifier.any(source[key]);
//             });
// 
//             return result + '}';
//         },
// 
//         arr: function (source) {
//             var prefixComma;
//             var result = '[';
// 
//             each(source, function (value) {
//                 if (prefixComma) {
//                     result += ',';
//                 }
//                 prefixComma = 1;
// 
//                 result += stringifier.any(value);
//             });
// 
//             return result + ']';
//         },
// 
//         str: function (source) {
//             return stringLiteralize(source);
//         },
// 
//         date: function (source) {
//             return 'new Date(' + source.getTime() + ')';
//         },
// 
//         any: function (source) {
//             switch (typeof source) {
//                 case 'string':
//                     return stringifier.str(source);
// 
//                 case 'number':
//                     return '' + source;
// 
//                 case 'boolean':
//                     return source ? 'true' : 'false';
// 
//                 case 'object':
//                     if (!source) {
//                         return null;
//                     }
// 
//                     if (source instanceof Array) {
//                         return stringifier.arr(source);
//                     }
// 
//                     if (source instanceof Date) {
//                         return stringifier.date(source);
//                     }
// 
//                     return stringifier.obj(source);
//             }
// 
//             throw new Error('Cannot Stringify:' + source);
//         }
//     };
// }
// /* eslint-enable no-unused-vars */
// /* eslint-enable fecs-camelcase */
// 
// /**
//  * 将组件编译成 render 方法的 js 源码
//  *
//  * @param {Function} ComponentClass 组件类
//  * @return {string}
//  */
// function compileJSSource(ComponentClass) {
//     var sourceBuffer = new CompileSourceBuffer();
// 
//     sourceBuffer.addRendererStart();
//     sourceBuffer.addRaw(
//         componentCompilePreCode.toString()
//             .split('\n')
//             .slice(1)
//             .join('\n')
//             .replace(/\}\s*$/, '')
//     );
// 
//     // 先初始化个实例，让模板编译成 ANode，并且能获得初始化数据
//     var component = new ComponentClass();
// 
//     compileComponentSource(sourceBuffer, component);
//     sourceBuffer.addRendererEnd();
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
//     var Component = require('./view/component');
//     var defineComponent = require('./view/define-component');
//     var emitDevtool = require('./util/emit-devtool');
//     var compileJSSource = require('./view/compile-js-source');
//     var DataTypes = require('./util/data-types');


    var san = {
        /**
         * san版本号
         *
         * @type {string}
         */
        version: '3.2.9',

        // #[begin] devtool
        /**
         * 是否开启调试。开启调试时 devtool 会工作
         *
         * @type {boolean}
         */
        debug: true,
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
         * 生命周期类
         *
         * @class
         */
        LifeCycle: LifeCycle,

        /**
         * 在下一个更新周期运行函数
         *
         * @param {Function} fn 要运行的函数
         */
        nextTick: nextTick,

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
    emitDevtool.start(san);
    // #[end]
})(this);
