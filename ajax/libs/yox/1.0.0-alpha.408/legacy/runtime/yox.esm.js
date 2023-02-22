/**
 * yox.js v1.0.0-alpha.408
 * (c) 2017-2023 musicode
 * Released under the MIT License.
 */

const SYNTAX_IF = '#if';
const SYNTAX_ELSE = 'else';
const SYNTAX_ELSE_IF = 'else if';
const SYNTAX_EACH = '#each';
const SYNTAX_IMPORT = '>';
const SYNTAX_SPREAD = '...';
const SYNTAX_COMMENT = /^!(?:\s|--)/;
const TAG_SLOT = 'slot';
const TAG_PORTAL = 'portal';
const TAG_FRAGMENT = 'fragment';
const TAG_TEMPLATE = 'template';
const ATTR_TO = 'to';
const ATTR_KEY = 'key';
const ATTR_REF = 'ref';
const ATTR_SLOT = 'slot';
const ATTR_NAME = 'name';
const SLOT_DATA_PREFIX = '$slot_';
const SLOT_NAME_DEFAULT = 'children';
const VNODE_TYPE_TEXT = 1;
const VNODE_TYPE_COMMENT = 2;
const VNODE_TYPE_ELEMENT = 3;
const VNODE_TYPE_COMPONENT = 4;
const VNODE_TYPE_FRAGMENT = 5;
const VNODE_TYPE_PORTAL = 6;
const VNODE_TYPE_SLOT = 7;
const DIRECTIVE_ON = 'on';
const DIRECTIVE_LAZY = 'lazy';
const DIRECTIVE_MODEL = 'model';
const DIRECTIVE_EVENT = 'event';
const DIRECTIVE_TRANSITION = 'transition';
const DIRECTIVE_CUSTOM = 'o';
const MODIFER_NATIVE = 'native';
const MAGIC_VAR_SCOPE = '$scope';
const MAGIC_VAR_KEYPATH = '$keypath';
const MAGIC_VAR_LENGTH = '$length';
const MAGIC_VAR_EVENT = '$event';
const MAGIC_VAR_DATA = '$data';
const MODEL_PROP_DEFAULT = 'value';
const HOOK_BEFORE_CREATE = 'beforeCreate';
const HOOK_AFTER_CREATE = 'afterCreate';
const HOOK_BEFORE_RENDER = 'beforeRender';
const HOOK_AFTER_RENDER = 'afterRender';
const HOOK_BEFORE_MOUNT = 'beforeMount';
const HOOK_AFTER_MOUNT = 'afterMount';
const HOOK_BEFORE_UPDATE = 'beforeUpdate';
const HOOK_AFTER_UPDATE = 'afterUpdate';
const HOOK_BEFORE_DESTROY = 'beforeDestroy';
const HOOK_AFTER_DESTROY = 'afterDestroy';
const HOOK_BEFORE_PROPS_UPDATE = 'beforePropsUpdate';

/**
 * 为了压缩，定义的常量
 */
const TRUE$1 = true;
const FALSE$1 = false;
const NULL$1 = null;
const UNDEFINED$1 = void 0;
const RAW_TRUE = 'true';
const RAW_FALSE = 'false';
const RAW_NULL = 'null';
const RAW_UNDEFINED = 'undefined';
const RAW_FILTER = 'filter';
const RAW_COMPONENT = 'component';
const RAW_DIRECTIVE = 'directive';
const RAW_TRANSITION = 'transition';
const RAW_THIS = 'this';
const RAW_FUNCTION = 'function';
const RAW_LENGTH = 'length';
const RAW_WILDCARD = '*';
const RAW_DOT = '.';
const RAW_SLASH = '/';
const RAW_DOLLAR = '$';
const KEYPATH_ROOT = '~';
const KEYPATH_PARENT = '..';
const KEYPATH_CURRENT = RAW_THIS;
const NODE_TYPE_ELEMENT = 1;
const NODE_TYPE_TEXT = 3;
const NODE_TYPE_COMMENT = 8;
/**
 * Single instance for window in browser
 */
const WINDOW = typeof window !== RAW_UNDEFINED ? window : UNDEFINED$1;
/**
 * Single instance for document in browser
 */
const DOCUMENT = typeof document !== RAW_UNDEFINED ? document : UNDEFINED$1;
/**
 * tap 事件
 *
 * 非常有用的抽象事件，比如 pc 端是 click 事件，移动端是 touchend 事件
 *
 * 这样只需 on-tap="handler" 就可以完美兼容各端
 *
 * 框架未实现此事件，通过 Yox.dom.addSpecialEvent 提供给外部扩展
 *
 */
const EVENT_TAP = 'tap';
/**
 * 点击事件
 */
const EVENT_CLICK = 'click';
/**
 * 输入事件
 */
const EVENT_INPUT = 'input';
/**
 * 变化事件
 */
const EVENT_CHANGE = 'change';
/**
 * 唯一内置的特殊事件：model
 */
const EVENT_MODEL = 'model';
/**
 * Single instance for noop function
 */
const EMPTY_FUNCTION = function () {
    /** yox */
};
/**
 * 空对象，很多地方会用到，比如 `a || EMPTY_OBJECT` 确保是个对象
 */
const EMPTY_OBJECT = Object.freeze({});
/**
 * 空数组
 */
const EMPTY_ARRAY = Object.freeze([]);
/**
 * 空字符串
 */
const EMPTY_STRING = '';
/**
 * 日志等级
 */
const LOG_LEVEL_DEBUG = 1;
const LOG_LEVEL_INFO = 2;
const LOG_LEVEL_WARN = 3;
const LOG_LEVEL_ERROR = 4;
const LOG_LEVEL_FATAL = 5;
/**
 * 当前是否是源码调试，如果开启了代码压缩，empty function 里的注释会被干掉
 * 源码模式默认选 INFO，因为 DEBUG 输出的日志太多，会导致性能急剧下降
 */
const LOG_LEVEL_DEFAULT = /yox/.test(EMPTY_FUNCTION.toString()) ? LOG_LEVEL_INFO : LOG_LEVEL_WARN;
/**
 * 外部可配置的对象
 */
const PUBLIC_CONFIG = {
    leftDelimiter: '{',
    rightDelimiter: '}',
    uglifyCompiled: FALSE$1,
    minifyCompiled: FALSE$1,
    logLevel: LOG_LEVEL_DEFAULT,
};

/**
 * Check if value is a function.
 *
 * @param value
 * @return
 */
function func(value) {
    return typeof value === RAW_FUNCTION;
}
/**
 * Check if value is an array.
 *
 * @param value
 * @return
 */
function array$1(value) {
    return Array.isArray(value);
}
/**
 * Check if value is an object.
 *
 * @param value
 * @return
 */
function object$1(value) {
    // 低版本 IE 会把 null 当作 object
    return value !== NULL$1 && typeof value === 'object';
}
/**
 * Check if value is a string.
 *
 * @param value
 * @return
 */
function string$1(value) {
    return typeof value === 'string';
}
/**
 * Check if value is a number.
 *
 * @param value
 * @return
 */
function number(value) {
    return typeof value === 'number' && !isNaN(value);
}
/**
 * Check if value is boolean.
 *
 * @param value
 * @return
 */
function boolean(value) {
    return value === TRUE$1 || value === FALSE$1;
}
/**
 * Check if value is numeric.
 *
 * @param value
 * @return
 */
function numeric(value) {
    return !isNaN(value - parseFloat(value));
}

var is = /*#__PURE__*/Object.freeze({
  __proto__: null,
  func: func,
  array: array$1,
  object: object$1,
  string: string$1,
  number: number,
  boolean: boolean,
  numeric: numeric
});

/**
 * 任性地执行一个函数，不管它有没有、是不是
 *
 * @param fn 调用的函数
 * @param context 执行函数时的 this 指向
 * @param args 调用函数的参数，多参数时传入数组
 * @return 调用函数的返回值
 */
function execute (fn, context, args) {
    return array$1(args)
        ? fn.apply(context, args)
        : context !== UNDEFINED$1
            ? fn.call(context, args)
            : args !== UNDEFINED$1
                ? fn(args)
                : fn();
}

class CustomEvent {
    /**
     * 构造函数
     *
     * 可以传事件名称，也可以传原生事件对象
     */
    constructor(type, originalEvent) {
        // 这里不设置命名空间
        // 因为有没有命名空间取决于 Emitter 的构造函数有没有传 true
        // CustomEvent 自己无法决定
        this.type = type;
        this.phase = CustomEvent.PHASE_CURRENT;
        if (originalEvent) {
            this.originalEvent = originalEvent;
        }
    }
    static is(event) {
        return event instanceof CustomEvent;
    }
    /**
     * 阻止事件的默认行为
     */
    preventDefault() {
        const instance = this;
        if (!instance.isPrevented) {
            const { originalEvent } = instance;
            if (originalEvent) {
                originalEvent.preventDefault();
            }
            instance.isPrevented = TRUE$1;
        }
        return instance;
    }
    /**
     * 停止事件广播
     */
    stopPropagation() {
        const instance = this;
        if (!instance.isStoped) {
            const { originalEvent } = instance;
            if (originalEvent) {
                originalEvent.stopPropagation();
            }
            instance.isStoped = TRUE$1;
        }
        return instance;
    }
    prevent() {
        return this.preventDefault();
    }
    stop() {
        return this.stopPropagation();
    }
}
CustomEvent.PHASE_CURRENT = 0;
CustomEvent.PHASE_UPWARD = 1;
CustomEvent.PHASE_DOWNWARD = -1;

/**
 * 遍历数组
 *
 * @param array
 * @param callback 返回 false 可停止遍历
 * @param reversed 是否逆序遍历
 */
function each$2(array, callback, reversed) {
    const { length } = array;
    if (length) {
        if (reversed) {
            for (let i = length - 1; i >= 0; i--) {
                if (callback(array[i], i) === FALSE$1) {
                    break;
                }
            }
        }
        else {
            for (let i = 0; i < length; i++) {
                if (callback(array[i], i) === FALSE$1) {
                    break;
                }
            }
        }
    }
}
function nativePush(array, item) {
    array[array.length] = item;
}
function nativeUnshift(array, item) {
    array.unshift(item);
}
/**
 * 添加
 *
 * @param array
 * @param value
 * @param action
 */
function addItem(array, value, action) {
    if (array$1(value)) {
        each$2(value, function (item) {
            action(array, item);
        });
    }
    else {
        action(array, value);
    }
}
/**
 * 往后加
 *
 * @param array
 * @param target
 */
function push(array, target) {
    addItem(array, target, nativePush);
}
/**
 * 往前加
 *
 * @param array
 * @param target
 */
function unshift(array, target) {
    addItem(array, target, nativeUnshift);
}
/**
 * 数组项在数组中的位置
 *
 * @param array 数组
 * @param target 数组项
 * @param strict 是否全等判断，默认是全等
 * @return 如果未找到，返回 -1
 */
function indexOf$1(array, target, strict) {
    let result = -1;
    each$2(array, function (item, index) {
        if (strict === FALSE$1 ? item == target : item === target) {
            result = index;
            return FALSE$1;
        }
    });
    return result;
}
/**
 * 获取数组最后一项
 *
 * @param array 数组
 * @return
 */
function last(array) {
    const { length } = array;
    if (length > 0) {
        return array[length - 1];
    }
}
/**
 * 弹出数组最后一项
 *
 * 项目里用的太多，仅用于节省字符...
 *
 * @param array 数组
 * @return 弹出的数组项
 */
function pop(array) {
    const { length } = array;
    if (length > 0) {
        return array.pop();
    }
}
/**
 * 删除数组项
 *
 * @param array 数组
 * @param item 待删除项
 * @param strict 是否全等判断，默认是全等
 * @return 删除的数量
 */
function remove$1(array, target, strict) {
    let result = 0;
    each$2(array, function (item, index) {
        if (strict === FALSE$1 ? item == target : item === target) {
            array.splice(index, 1);
            result++;
        }
    }, TRUE$1);
    return result;
}
/**
 * 数组是否包含 item
 *
 * @param array 数组
 * @param target 可能包含的数组项
 * @param strict 是否全等判断，默认是全等
 * @return
 */
function has$2(array, target, strict) {
    return indexOf$1(array, target, strict) >= 0;
}
/**
 * 把类数组转成数组
 *
 * @param array 类数组
 * @return
 */
function toArray(array) {
    return array$1(array)
        ? array
        : execute(EMPTY_ARRAY.slice, array);
}
/**
 * 把数组转成对象
 *
 * @param array 数组
 * @param key 数组项包含的字段名称，如果数组项是基本类型，可不传
 * @param value
 * @return
 */
function toObject(array, key, value) {
    let result = {};
    each$2(array, function (item) {
        result[key ? item[key] : item] = value || item;
    });
    return result;
}
/**
 * 把数组合并成字符串
 *
 * @param array
 * @param separator
 * @return
 */
function join$1(array, separator) {
    return array.join(separator);
}
/**
 * 用于判断长度大于 0 的数组
 *
 * @param array
 * @return
 */
function falsy$2(array) {
    return !array$1(array) || !array.length;
}

var array = /*#__PURE__*/Object.freeze({
  __proto__: null,
  each: each$2,
  push: push,
  unshift: unshift,
  indexOf: indexOf$1,
  last: last,
  pop: pop,
  remove: remove$1,
  has: has$2,
  toArray: toArray,
  toObject: toObject,
  join: join$1,
  falsy: falsy$2
});

function toString (target, defaultValue) {
    return target != NULL$1 && target.toString
        ? target.toString()
        : defaultValue !== UNDEFINED$1
            ? defaultValue
            : EMPTY_STRING;
}

function isNative (target) {
    return func(target)
        && toString(target).indexOf('[native code]') >= 0;
}

let createPureObject = function () {
    const obj = Object.create(NULL$1);
    return {
        get(key) {
            return obj[key];
        },
        set(key, value) {
            obj[key] = value;
        },
        has(key) {
            return key in obj;
        },
        keys() {
            return Object.keys(obj);
        }
    };
};
// IE9+ 都已实现 Object.create
{
    if (!isNative(Object.create)) {
        createPureObject = function () {
            const obj = {};
            return {
                get(key) {
                    return obj.hasOwnProperty(key)
                        ? obj[key]
                        : UNDEFINED$1;
                },
                set(key, value) {
                    obj[key] = value;
                },
                has(key) {
                    return obj.hasOwnProperty(key);
                },
                keys() {
                    return Object.keys(obj);
                }
            };
        };
    }
}
/**
 * 创建纯净对象
 *
 * @return 纯净对象
 */
var createPureObject$1 = createPureObject;

/**
 * 缓存一个参数的函数调用结果
 *
 * @param fn 需要缓存的函数
 * @return 带缓存功能的函数
 */
function createOneKeyCache(fn) {
    const cache = createPureObject$1();
    return function (key) {
        const hit = cache.get(key);
        if (hit !== UNDEFINED$1) {
            return hit;
        }
        const value = fn(key);
        cache.set(key, value);
        return value;
    };
}
/**
 * 缓存两个参数的函数调用结果
 *
 * @param fn 需要缓存的函数
 * @return 带缓存功能的函数
 */
function createTwoKeyCache(fn) {
    const cache = createPureObject$1();
    return function (key1, key2) {
        let hit1 = cache.get(key1);
        if (hit1) {
            const hit2 = hit1.get(key2);
            if (hit2) {
                return hit2;
            }
        }
        else {
            hit1 = createPureObject$1();
            cache.set(key1, hit1);
        }
        const value = fn(key1, key2);
        hit1.set(key2, value);
        return value;
    };
}

const camelizePattern = /-([a-z])/gi, hyphenatePattern = /\B([A-Z])/g, capitalizePattern = /^[a-z]/;
/**
 * 连字符转成驼峰
 *
 * @param str
 * @return 驼峰格式的字符串
 */
const camelize = createOneKeyCache(function (str) {
    return str.replace(camelizePattern, function (_, $1) {
        return upper($1);
    });
});
/**
 * 驼峰转成连字符
 *
 * @param str
 * @return 连字符格式的字符串
 */
const hyphenate = createOneKeyCache(function (str) {
    return str.replace(hyphenatePattern, function (_, $1) {
        return '-' + lower($1);
    });
});
/**
 * 首字母大写
 *
 * @param str
 * @return
 */
const capitalize = createOneKeyCache(function (str) {
    return str.replace(capitalizePattern, upper);
});
/**
 * 重复字符串
 *
 * @param str
 * @param count 重复次数
 * @return
 */
function repeat(str, count) {
    return join$1(new Array(count + 1), str);
}
/**
 * 清除两侧空白符
 *
 * @param str
 * @return 清除两侧空白符的字符串
 */
function trim(str) {
    return falsy$1(str)
        ? EMPTY_STRING
        : str.trim();
}
/**
 * 截取字符串
 *
 * @param str
 * @param start
 * @param end
 * @return
 */
function slice(str, start, end) {
    return number(end)
        ? start === end
            ? EMPTY_STRING
            : str.slice(start, end)
        : str.slice(start);
}
/**
 * 获取子串的起始位置
 *
 * @param str
 * @param part
 * @param start
 * @return
 */
function indexOf(str, part, start) {
    return str.indexOf(part, start !== UNDEFINED$1 ? start : 0);
}
/**
 * 获取子串的起始位置
 *
 * @param str
 * @param part
 * @param end
 * @return
 */
function lastIndexOf(str, part, end) {
    return str.lastIndexOf(part, end !== UNDEFINED$1 ? end : str.length);
}
/**
 * str 是否以 part 开头
 *
 * @param str
 * @param part
 * @return
 */
function startsWith(str, part) {
    return indexOf(str, part) === 0;
}
/**
 * str 是否以 part 结束
 *
 * @param str
 * @param part
 * @return
 */
function endsWith(str, part) {
    const offset = str.length - part.length;
    return offset >= 0 && lastIndexOf(str, part) === offset;
}
/**
 * 获取某个位置的字符
 */
function charAt(str, index) {
    return str.charAt(index || 0);
}
/**
 * 获取某个位置的字符编码
 */
function codeAt(str, index) {
    return str.charCodeAt(index || 0);
}
/**
 * 大写格式
 */
function upper(str) {
    return str.toUpperCase();
}
/**
 * 小写格式
 */
function lower(str) {
    return str.toLowerCase();
}
/**
 * str 是否包含 part
 *
 * @param str
 * @param part
 * @return 是否包含
 */
function has$1(str, part) {
    return indexOf(str, part) >= 0;
}
/**
 * str 转成 value 为 true 的 map
 *
 * @param str
 * @param separator
 */
function toMap$1(str, separator) {
    const map = Object.create(NULL$1);
    each$2(str.split(separator || ','), function (item) {
        map[item] = TRUE$1;
    });
    return map;
}
/**
 * 判断长度大于 0 的字符串
 *
 * @param str
 * @return
 */
function falsy$1(str) {
    return !string$1(str) || !str.length;
}

var string = /*#__PURE__*/Object.freeze({
  __proto__: null,
  camelize: camelize,
  hyphenate: hyphenate,
  capitalize: capitalize,
  repeat: repeat,
  trim: trim,
  slice: slice,
  indexOf: indexOf,
  lastIndexOf: lastIndexOf,
  startsWith: startsWith,
  endsWith: endsWith,
  charAt: charAt,
  codeAt: codeAt,
  upper: upper,
  lower: lower,
  has: has$1,
  toMap: toMap$1,
  falsy: falsy$1
});

const dotPattern = /\./g, asteriskPattern = /\*/g, doubleAsteriskPattern = /\*\*/g;
/**
 * 判断 keypath 是否以 prefix 开头，如果是，返回匹配上的前缀长度，否则返回 -1
 *
 * @param keypath
 * @param prefix
 * @return
 */
const match = createTwoKeyCache(function (keypath, prefix) {
    if (keypath === prefix) {
        return prefix.length;
    }
    prefix += RAW_DOT;
    return startsWith(keypath, prefix)
        ? prefix.length
        : -1;
});
const getKeypathTokens = createOneKeyCache(function (keypath) {
    return indexOf(keypath, RAW_DOT) < 0
        ? [keypath]
        : keypath.split(RAW_DOT);
});
/**
 * 遍历 keypath 的每个部分
 *
 * @param keypath
 * @param callback 返回 false 可中断遍历
 */
function each$1(keypath, callback) {
    const tokens = string$1(keypath) ? getKeypathTokens(keypath) : keypath;
    for (let i = 0, lastIndex = tokens.length - 1; i <= lastIndex; i++) {
        if (callback(tokens[i], i, lastIndex) === FALSE$1) {
            break;
        }
    }
}
/**
 * 遍历 keypath 的每个部分
 *
 * @param keypath1
 * @param keypath2
 */
const join = createTwoKeyCache(function (keypath1, keypath2) {
    return keypath1 && keypath2
        ? keypath1 + RAW_DOT + keypath2
        : keypath1 || keypath2;
});
/**
 * 是否模糊匹配
 *
 * @param keypath
 */
const isFuzzy = createOneKeyCache(function (keypath) {
    return has$1(keypath, RAW_WILDCARD);
});
const getFuzzyPattern = createOneKeyCache(function (pattern) {
    return new RegExp(`^${pattern
        .replace(dotPattern, '\\.')
        .replace(asteriskPattern, '(\\w+)')
        .replace(doubleAsteriskPattern, '([\.\\w]+?)')}$`);
});
/**
 * 模糊匹配 keypath
 *
 * @param keypath
 * @param pattern
 */
const matchFuzzy = createTwoKeyCache(function (keypath, pattern) {
    const result = keypath.match(getFuzzyPattern(pattern));
    return result
        ? result[1]
        : UNDEFINED$1;
});

/**
 * 全局 value holder，避免频繁的创建临时对象
 */
const holder = {
    value: UNDEFINED$1
};

/**
 * 获取对象的 key 的数组
 *
 * @param object
 * @return
 */
function keys(object) {
    return Object.keys(object);
}
/**
 * 遍历对象
 *
 * @param object
 * @param callback 返回 false 可停止遍历
 */
function each(object, callback) {
    for (let key in object) {
        if (callback(object[key], key) === FALSE$1) {
            break;
        }
    }
}
/**
 * 扩展对象
 *
 * @return
 */
function extend(original, object) {
    each(object, function (value, key) {
        original[key] = value;
    });
    return original;
}
/**
 * 合并对象
 *
 * @return
 */
function merge(object1, object2) {
    return object1 && object2
        ? extend(extend({}, object1), object2)
        : object1 || object2;
}
/**
 * 拷贝对象
 *
 * @param object
 * @param deep 是否需要深拷贝
 * @return
 */
function copy(object, deep) {
    let result = object;
    if (array$1(object)) {
        if (deep) {
            result = [];
            each$2(object, function (item, index) {
                result[index] = copy(item, deep);
            });
        }
        else {
            result = object.slice();
        }
    }
    else if (object$1(object)) {
        result = {};
        each(object, function (value, key) {
            result[key] = deep ? copy(value, deep) : value;
        });
    }
    return result;
}
function getCallback(value) {
    // 如果是计算属性，取计算属性的值
    return func(value.get)
        ? value.get()
        : value;
}
/**
 * 从对象中查找一个 keypath
 *
 * 返回值是空时，表示没找到值
 *
 * @param object
 * @param keypath
 * @return
 */
function get(object, keypath, callback) {
    let result = object;
    each$1(keypath, function (key, index, lastIndex) {
        if (result != NULL$1) {
            // 先直接取值
            let value = result[key], 
            // 紧接着判断值是否存在
            // 下面会处理计算属性的值，不能在它后面设置 hasValue
            hasValue = value !== UNDEFINED$1;
            // 为什么不用 hasValue 判断呢？
            // 因为这里需要处理的 value 要么是函数，要么是对象，基础类型无需加工
            if (value) {
                // 如果数据中没有计算属性，也可以自定义
                value = (callback || getCallback)(value);
            }
            if (index === lastIndex) {
                if (hasValue) {
                    holder.value = value;
                    result = holder;
                }
                else {
                    result = UNDEFINED$1;
                }
            }
            else {
                result = value;
            }
        }
        else {
            result = UNDEFINED$1;
            return FALSE$1;
        }
    });
    return result;
}
/**
 * 为对象设置一个键值对
 *
 * @param object
 * @param keypath
 * @param value
 * @param autofill 是否自动填充不存在的对象，默认自动填充
 */
function set(object, keypath, value, autofill) {
    let next = object;
    each$1(keypath, function (key, index, lastIndex) {
        if (index === lastIndex) {
            next[key] = value;
        }
        else if (next[key]) {
            next = next[key];
        }
        else if (autofill) {
            next = next[key] = {};
        }
        else {
            return FALSE$1;
        }
    });
}
/**
 * 对象是否包含某个 key
 *
 * @param object
 * @param key
 * @return
 */
function has(object, key) {
    // 不用 hasOwnProperty，性能差
    return object[key] !== UNDEFINED$1;
}
/**
 * 是否是空对象
 *
 * @param object
 * @return
 */
function falsy(object) {
    return !object$1(object)
        || array$1(object)
        || !keys(object).length;
}

var object = /*#__PURE__*/Object.freeze({
  __proto__: null,
  keys: keys,
  each: each,
  extend: extend,
  merge: merge,
  copy: copy,
  get: get,
  set: set,
  has: has,
  falsy: falsy
});

/**
 * 外部可用这些常量
 */
const DEBUG = LOG_LEVEL_DEBUG;
const INFO = LOG_LEVEL_INFO;
const WARN = LOG_LEVEL_WARN;
const ERROR = LOG_LEVEL_ERROR;
const FATAL = LOG_LEVEL_FATAL;
/**
 * 是否有原生的日志特性，没有必要单独实现
 */
const nativeConsole = typeof console !== RAW_UNDEFINED ? console : NULL$1, 
/**
 * console 样式前缀
 * ie 和 edge 不支持 console.log 样式
 */
stylePrefix = WINDOW && /edge|msie|trident/i.test(WINDOW.navigator.userAgent)
    ? EMPTY_STRING
    : '%c', 
/**
 * 日志打印函数
 */
printLog = nativeConsole
    ? stylePrefix
        ? function (tag, msg, style) {
            nativeConsole.log(stylePrefix + tag, style, msg);
        }
        : function (tag, msg) {
            nativeConsole.log(tag, msg);
        }
    : EMPTY_FUNCTION;
/**
 * 全局调试开关
 */
function getLogLevel() {
    const { logLevel } = PUBLIC_CONFIG;
    if (logLevel >= DEBUG && logLevel <= FATAL) {
        return logLevel;
    }
    return LOG_LEVEL_DEFAULT;
}
function getStyle(backgroundColor) {
    return `background-color:${backgroundColor};border-radius:12px;color:#fff;font-size:10px;padding:3px 6px;`;
}
/**
 * 打印 debug 日志
 *
 * @param msg
 */
function debug(msg, tag) {
    if (getLogLevel() <= DEBUG) {
        printLog(tag || 'Yox debug', msg, getStyle('#999'));
    }
}
/**
 * 打印 info 日志
 *
 * @param msg
 */
function info(msg, tag) {
    if (getLogLevel() <= INFO) {
        printLog(tag || 'Yox info', msg, getStyle('#2db7f5'));
    }
}
/**
 * 打印 warn 日志
 *
 * @param msg
 */
function warn(msg, tag) {
    if (getLogLevel() <= WARN) {
        printLog(tag || 'Yox warn', msg, getStyle('#f90'));
    }
}
/**
 * 打印 error 日志
 *
 * @param msg
 */
function error(msg, tag) {
    if (getLogLevel() <= ERROR) {
        printLog(tag || 'Yox error', msg, getStyle('#ed4014'));
    }
}
/**
 * 致命错误，中断程序
 *
 * @param msg
 */
function fatal(msg, tag) {
    if (getLogLevel() <= FATAL) {
        throw new Error(`[${tag || 'Yox fatal'}]: ${msg}`);
    }
}

var logger = /*#__PURE__*/Object.freeze({
  __proto__: null,
  DEBUG: DEBUG,
  INFO: INFO,
  WARN: WARN,
  ERROR: ERROR,
  FATAL: FATAL,
  debug: debug,
  info: info,
  warn: warn,
  error: error,
  fatal: fatal
});

class Emitter {
    constructor(ns) {
        this.ns = ns || FALSE$1;
        this.listeners = {};
    }
    /**
     * 发射事件
     *
     * @param type 事件名称或命名空间
     * @param args 事件处理函数的参数列表
     * @param filter 自定义过滤器
     */
    fire(type, args, filter) {
        let instance = this, event = string$1(type) ? instance.toEvent(type) : type, list = instance.listeners[event.type], isComplete = TRUE$1;
        if (list) {
            // 避免遍历过程中，数组发生变化，比如增删了
            list = list.slice();
            // 判断是否是发射事件
            // 如果 args 的第一个参数是 CustomEvent 类型，表示发射事件
            // 因为事件处理函数的参数列表是 (event, data)
            const customEvent = args && CustomEvent.is(args[0])
                ? args[0]
                : UNDEFINED$1;
            // 这里不用 array.each，减少函数调用
            for (let i = 0, length = list.length; i < length; i++) {
                let options = list[i];
                // 命名空间不匹配
                if (!matchNamespace(event.ns, options)
                    // 在 fire 过程中被移除了
                    || !has$2(list, options)
                    // 传了 filter，则用 filter 判断是否过滤此 options
                    || (filter && !filter(event, args, options))) {
                    continue;
                }
                let result = execute(options.listener, options.ctx, args);
                // 执行次数
                options.num = options.num ? (options.num + 1) : 1;
                // 注册的 listener 可以指定最大执行次数
                if (options.num === options.max) {
                    instance.off(event.type, {
                        ns: event.ns,
                        listener: options.listener,
                    });
                }
                // 如果没有返回 false，而是调用了 customEvent.stop 也算是返回 false
                if (customEvent) {
                    if (result === FALSE$1) {
                        customEvent.prevent().stop();
                    }
                    else if (customEvent.isStoped) {
                        result = FALSE$1;
                    }
                }
                if (result === FALSE$1) {
                    isComplete = FALSE$1;
                    break;
                }
            }
        }
        return isComplete;
    }
    /**
     * 注册监听
     *
     * @param type
     * @param listener
     */
    on(type, listener) {
        const instance = this, listeners = instance.listeners, options = func(listener)
            ? { listener: listener }
            : listener;
        if (object$1(options) && func(options.listener)) {
            if (!string$1(options.ns)) {
                const event = instance.toEvent(type);
                options.ns = event.ns;
                type = event.type;
            }
            push(listeners[type] || (listeners[type] = []), options);
        }
    }
    /**
     * 取消监听
     *
     * @param type
     * @param listener
     */
    off(type, listener) {
        const instance = this, listeners = instance.listeners;
        if (type) {
            const filter = instance.toFilter(type, listener), each$1 = function (list, name) {
                each$2(list, function (item, index) {
                    if (matchListener(filter.listener, item) && matchNamespace(filter.ns, item)) {
                        list.splice(index, 1);
                    }
                }, TRUE$1);
                if (!list.length) {
                    delete listeners[name];
                }
            };
            if (filter.type) {
                if (listeners[filter.type]) {
                    each$1(listeners[filter.type], filter.type);
                }
            }
            // 按命名空间过滤，如 type 传入 .ns
            else if (filter.ns) {
                each(listeners, each$1);
            }
        }
        else {
            // 清空
            instance.listeners = {};
        }
    }
    /**
     * 是否已监听某个事件
     *
     * @param type
     * @param listener
     */
    has(type, listener) {
        let instance = this, listeners = instance.listeners, filter = instance.toFilter(type, listener), result = TRUE$1, each$1 = function (list) {
            each$2(list, function (item) {
                if (matchListener(filter.listener, item) && matchNamespace(filter.ns, item)) {
                    return result = FALSE$1;
                }
            });
            return result;
        };
        if (filter.type) {
            if (listeners[filter.type]) {
                each$1(listeners[filter.type]);
            }
        }
        else if (filter.ns) {
            each(listeners, each$1);
        }
        return !result;
    }
    /**
     * 把事件类型解析成命名空间格式
     *
     * @param type
     */
    toEvent(type) {
        // 这里 ns 必须为字符串
        // 用于区分 event 对象是否已完成命名空间的解析
        const event = {
            type,
            ns: EMPTY_STRING,
        };
        // 是否开启命名空间
        if (this.ns) {
            const index = indexOf(type, RAW_DOT);
            if (index >= 0) {
                event.type = slice(type, 0, index);
                event.ns = slice(type, index + 1);
            }
        }
        return event;
    }
    toFilter(type, listener) {
        let filter;
        if (listener) {
            filter = func(listener)
                ? { listener: listener }
                : listener;
        }
        else {
            filter = {};
        }
        if (string$1(filter.ns)) {
            filter.type = type;
        }
        else {
            const event = this.toEvent(type);
            filter.type = event.type;
            filter.ns = event.ns;
        }
        return filter;
    }
}
/**
 * 判断 options 是否能匹配 listener
 *
 * @param listener
 * @param options
 */
function matchListener(listener, options) {
    return listener
        ? listener === options.listener
        : TRUE$1;
}
/**
 * 判断 options 是否能匹配命名空间
 *
 * 如果 namespace 和 options.ns 都不为空，则需完全匹配
 *
 * 如果他们两个其中任何一个为空，则不判断命名空间
 *
 * @param namespace
 * @param options
 */
function matchNamespace(namespace, options) {
    const { ns } = options;
    return ns && namespace
        ? ns === namespace
        : TRUE$1;
}

let nextTick;
// IE (10+) 和 node
if (typeof setImmediate === RAW_FUNCTION && isNative(setImmediate)) {
    nextTick = setImmediate;
}
// 用 MessageChannel 去做 setImmediate 的 polyfill
// 原理是将新的 message 事件加入到原有的 dom events 之后
// 兼容性 IE10+ 和其他标准浏览器
if (typeof MessageChannel === RAW_FUNCTION && isNative(MessageChannel)) {
    nextTick = function (fn) {
        const channel = new MessageChannel();
        channel.port1.onmessage = fn;
        channel.port2.postMessage(1);
    };
}
else {
    nextTick = setTimeout;
}
var nextTick$1 = nextTick;

let shared;
class NextTask {
    constructor(hooks) {
        const instance = this;
        instance.tasks = [];
        instance.hooks = hooks || EMPTY_OBJECT;
    }
    /**
     * 全局单例
     */
    static shared() {
        return shared || (shared = new NextTask());
    }
    /**
     * 在队尾添加异步任务
     */
    append(func, context) {
        const instance = this, { tasks } = instance;
        push(tasks, {
            fn: func,
            ctx: context
        });
        if (tasks.length === 1) {
            nextTick$1(function () {
                instance.run();
            });
        }
    }
    /**
     * 在队首添加异步任务
     */
    prepend(func, context) {
        const instance = this, { tasks } = instance;
        unshift(tasks, {
            fn: func,
            ctx: context
        });
        if (tasks.length === 1) {
            nextTick$1(function () {
                instance.run();
            });
        }
    }
    /**
     * 清空异步队列
     */
    clear() {
        this.tasks.length = 0;
    }
    /**
     * 立即执行异步任务，并清空队列
     */
    run() {
        const instance = this, { tasks, hooks } = instance, { length } = tasks;
        if (length) {
            instance.tasks = [];
            if (hooks.beforeTask) {
                hooks.beforeTask();
            }
            for (let i = 0; i < length; i++) {
                execute(tasks[i].fn, tasks[i].ctx);
            }
            if (hooks.afterTask) {
                hooks.afterTask();
            }
        }
    }
}

/**
 * 节流调用
 *
 * @param fn 需要节制调用的函数
 * @param delay 调用的时间间隔，单位毫秒
 * @param immediate 是否立即触发
 * @return 节流函数
 */
function debounce (fn, delay, immediate) {
    let timer;
    return function () {
        if (!timer) {
            const args = toArray(arguments);
            if (immediate) {
                execute(fn, UNDEFINED$1, args);
            }
            timer = setTimeout(function () {
                timer = UNDEFINED$1;
                if (!immediate) {
                    execute(fn, UNDEFINED$1, args);
                }
            }, delay);
        }
    };
}

// vnode.data 内部使用的几个字段
const VNODE = '$vnode';
const LOADING = '$loading';
const LEAVING = '$leaving';
const MODEL_CONTROL = '$model_control';
const MODEL_DESTROY = '$model_destroy';
const EVENT_DESTROY = '$event_destroy';
const DIRECTIVE_HOOKS = '$directive_hooks';
const DIRECTIVE_UPDATING = '$directive_updating';

function addEvent$1(api, element, component, data, key, lazy, event) {
    let { name, listener } = event;
    if (lazy) {
        const value = lazy[name] || lazy[EMPTY_STRING];
        if (value === TRUE$1) {
            name = EVENT_CHANGE;
        }
        else if (value > 0) {
            listener = debounce(listener, value, 
            // 避免连续多次点击，主要用于提交表单场景
            // 移动端的 tap 事件可自行在业务层打补丁实现
            name === EVENT_CLICK || name === EVENT_TAP);
        }
    }
    if (component) {
        if (event.isNative) {
            const target = component.$el;
            api.on(target, name, listener);
            return function () {
                api.off(target, name, listener);
            };
        }
        // event 有 ns 和 listener 两个字段，满足 ThisListenerOptions 的要求
        component.on(name, event);
        data[EVENT_DESTROY + key] = function () {
            component.off(name, event);
            delete data[EVENT_DESTROY + key];
        };
    }
    else {
        api.on(element, name, listener);
        data[EVENT_DESTROY + key] = function () {
            api.off(element, key, listener);
            delete data[EVENT_DESTROY + key];
        };
    }
}
function afterCreate$5(api, vnode) {
    const { events } = vnode;
    if (events) {
        const element = vnode.node, component = vnode.component, lazy = vnode.lazy, data = vnode.data;
        for (let key in events) {
            addEvent$1(api, element, component, data, key, lazy, events[key]);
        }
    }
}
function afterUpdate$4(api, vnode, oldVNode) {
    const newEvents = vnode.events, oldEvents = oldVNode.events;
    if (newEvents !== oldEvents) {
        const element = vnode.node, component = vnode.component, lazy = vnode.lazy, data = vnode.data;
        if (oldEvents) {
            const newValue = newEvents || EMPTY_OBJECT;
            for (let key in oldEvents) {
                if (!newValue[key]) {
                    const destroy = data[EVENT_DESTROY + key];
                    if (destroy) {
                        destroy();
                    }
                }
            }
        }
        if (newEvents) {
            const oldValue = oldEvents || EMPTY_OBJECT;
            for (let key in newEvents) {
                const event = newEvents[key], oldEvent = oldValue[key];
                if (!oldEvent) {
                    addEvent$1(api, element, component, data, key, lazy, event);
                }
                else if (event.value !== oldEvent.value) {
                    const destroy = data[EVENT_DESTROY + key];
                    if (destroy) {
                        destroy();
                    }
                    addEvent$1(api, element, component, data, key, lazy, event);
                }
                else if (oldEvent.runtime && event.runtime) {
                    oldEvent.runtime.execute = event.runtime.execute;
                    event.runtime = oldEvent.runtime;
                }
            }
        }
    }
}
function beforeDestroy$3(api, vnode) {
    const events = vnode.events, data = vnode.data;
    if (events) {
        for (let key in events) {
            const destroy = data[EVENT_DESTROY + key];
            if (destroy) {
                destroy();
            }
        }
    }
}

var eventHook = /*#__PURE__*/Object.freeze({
  __proto__: null,
  afterCreate: afterCreate$5,
  afterUpdate: afterUpdate$4,
  beforeDestroy: beforeDestroy$3
});

function debounceIfNeeded(fn, lazy) {
    // 应用 lazy
    return lazy && lazy !== TRUE$1
        ? debounce(fn, lazy)
        : fn;
}
const inputControl = {
    set(node, value) {
        node.value = toString(value);
    },
    sync(node, keypath, context) {
        context.set(keypath, node.value);
    },
}, radioControl = {
    set(node, value) {
        node.checked = node.value === toString(value);
    },
    sync(node, keypath, context) {
        if (node.checked) {
            context.set(keypath, node.value);
        }
    },
}, checkboxControl = {
    set(node, value) {
        node.checked = array$1(value)
            ? has$2(value, node.value, FALSE$1)
            : !!value;
    },
    sync(node, keypath, context) {
        const value = context.get(keypath);
        if (array$1(value)) {
            if (node.checked) {
                context.append(keypath, node.value);
            }
            else {
                context.removeAt(keypath, indexOf$1(value, node.value, FALSE$1));
            }
        }
        else {
            context.set(keypath, node.checked);
        }
    },
}, selectControl = {
    set(node, value) {
        const { multiple, options } = node;
        for (let i = 0, length = options.length; i < length; i++) {
            if (multiple) {
                options[i].selected = has$2(value, options[i].value, FALSE$1);
            }
            else if (options[i].value == value) {
                node.selectedIndex = i;
                return;
            }
        }
        if (!multiple) {
            node.selectedIndex = -1;
        }
    },
    sync(node, keypath, context) {
        const { multiple, options } = node;
        if (multiple) {
            const values = [];
            for (let i = 0, length = options.length; i < length; i++) {
                if (options[i].selected) {
                    values.push(options[i].value);
                }
            }
            context.set(keypath, values);
        }
        else {
            context.set(keypath, options[node.selectedIndex].value);
        }
    },
};
function addModel(api, element, component, data, vnode) {
    let { context, model, lazy, nativeAttrs } = vnode, { keypath, value } = model, lazyValue = lazy && (lazy[DIRECTIVE_MODEL] || lazy[EMPTY_STRING]);
    if (component) {
        let viewBinding = component.$model, viewSyncing = debounceIfNeeded(function (newValue) {
            context.set(keypath, newValue);
        }, lazyValue);
        component.watch(viewBinding, viewSyncing);
        data[MODEL_DESTROY] = function () {
            component.unwatch(viewBinding, viewSyncing);
            delete data[MODEL_DESTROY];
        };
    }
    else {
        let control = vnode.tag === 'select'
            ? selectControl
            : inputControl, 
        // checkbox,radio,select 监听的是 change 事件
        eventName = EVENT_CHANGE;
        if (control === inputControl) {
            const type = nativeAttrs && nativeAttrs.type;
            if (type === 'radio') {
                control = radioControl;
            }
            else if (type === 'checkbox') {
                control = checkboxControl;
            }
            // 如果是输入框，则切换成 model 事件
            // model 事件是个 yox-dom 实现的特殊事件
            // 不会在输入法组合文字过程中得到触发事件
            else if (lazyValue !== TRUE$1) {
                eventName = EVENT_MODEL;
            }
        }
        const sync = debounceIfNeeded(function () {
            control.sync(element, keypath, context);
        }, lazyValue);
        api.on(element, eventName, sync);
        control.set(element, value);
        data[MODEL_CONTROL] = control;
        data[MODEL_DESTROY] = function () {
            api.off(element, eventName, sync);
            delete data[MODEL_DESTROY];
            delete data[MODEL_CONTROL];
        };
    }
}
function afterCreate$4(api, vnode) {
    const model = vnode.model;
    if (model) {
        addModel(api, vnode.node, vnode.component, vnode.data, vnode);
    }
}
function afterUpdate$3(api, vnode, oldVNode) {
    const data = vnode.data, newModel = vnode.model, oldModel = oldVNode.model;
    if (newModel) {
        const element = vnode.node, component = vnode.component;
        if (!oldModel) {
            addModel(api, element, component, data, vnode);
        }
        else if (newModel.keypath !== oldModel.keypath) {
            data[MODEL_DESTROY]();
            addModel(api, element, component, data, vnode);
        }
        else {
            if (component) {
                component.set(component.$model, newModel.value);
            }
            else {
                const control = data[MODEL_CONTROL];
                if (control) {
                    control.set(element, newModel.value);
                }
            }
        }
    }
    else if (oldModel) {
        data[MODEL_DESTROY]();
    }
}
function beforeDestroy$2(api, vnode) {
    const data = vnode.data, destroy = data[MODEL_DESTROY];
    if (destroy) {
        destroy();
    }
}

var modelHook = /*#__PURE__*/Object.freeze({
  __proto__: null,
  afterCreate: afterCreate$4,
  afterUpdate: afterUpdate$3,
  beforeDestroy: beforeDestroy$2
});

function afterCreate$3(api, vnode) {
    const { nativeAttrs } = vnode;
    if (nativeAttrs) {
        const element = vnode.node;
        for (let name in nativeAttrs) {
            api.setAttr(element, name, nativeAttrs[name]);
        }
    }
}
function afterUpdate$2(api, vnode, oldVNode) {
    const newNativeAttrs = vnode.nativeAttrs, oldNativeAttrs = oldVNode.nativeAttrs;
    if (newNativeAttrs !== oldNativeAttrs) {
        const element = vnode.node;
        if (newNativeAttrs) {
            const oldValue = oldNativeAttrs || EMPTY_OBJECT;
            for (let name in newNativeAttrs) {
                if (oldValue[name] === UNDEFINED$1
                    || newNativeAttrs[name] !== oldValue[name]) {
                    api.setAttr(element, name, newNativeAttrs[name]);
                }
            }
        }
        if (oldNativeAttrs) {
            const newValue = newNativeAttrs || EMPTY_OBJECT;
            for (let name in oldNativeAttrs) {
                if (newValue[name] === UNDEFINED$1) {
                    api.removeAttr(element, name);
                }
            }
        }
    }
}

var nativeAttrHook = /*#__PURE__*/Object.freeze({
  __proto__: null,
  afterCreate: afterCreate$3,
  afterUpdate: afterUpdate$2
});

function afterCreate$2(api, vnode) {
    const { nativeStyles } = vnode;
    if (nativeStyles) {
        const elementStyle = vnode.node.style;
        for (let name in nativeStyles) {
            api.setStyle(elementStyle, name, nativeStyles[name]);
        }
    }
}
function afterUpdate$1(api, vnode, oldVNode) {
    const newNativeStyles = vnode.nativeStyles, oldNativeStyles = oldVNode.nativeStyles;
    if (newNativeStyles !== oldNativeStyles) {
        const elementStyle = vnode.node.style;
        if (newNativeStyles) {
            const oldValue = oldNativeStyles || EMPTY_OBJECT;
            for (let name in newNativeStyles) {
                if (oldValue[name] === UNDEFINED$1
                    || newNativeStyles[name] !== oldValue[name]) {
                    api.setStyle(elementStyle, name, newNativeStyles[name]);
                }
            }
        }
        if (oldNativeStyles) {
            const newValue = newNativeStyles || EMPTY_OBJECT;
            for (let name in oldNativeStyles) {
                if (newValue[name] === UNDEFINED$1) {
                    api.removeStyle(elementStyle, name);
                }
            }
        }
    }
}

var nativeStyleHook = /*#__PURE__*/Object.freeze({
  __proto__: null,
  afterCreate: afterCreate$2,
  afterUpdate: afterUpdate$1
});

function callDirectiveCreate(data, vnode, directive) {
    data[DIRECTIVE_HOOKS + directive.name] = directive.create(vnode.component || vnode.node, directive, vnode);
}
function callDirectiveHook(data, vnode, directive, hookName) {
    const hooks = data[DIRECTIVE_HOOKS + directive.name], hook = hooks && hooks[hookName];
    if (hook) {
        hook(directive, vnode);
    }
}
function genetateDirectiveHook(hookName) {
    return function (api, vnode) {
        const { directives } = vnode;
        if (directives) {
            const data = vnode.data;
            for (let name in directives) {
                callDirectiveHook(data, vnode, directives[name], hookName);
            }
        }
    };
}
function afterCreate$1(api, vnode) {
    const { directives } = vnode;
    if (directives) {
        const data = vnode.data;
        for (let name in directives) {
            callDirectiveCreate(data, vnode, directives[name]);
        }
    }
}
function beforeUpdate$1(api, vnode, oldVNode) {
    const newDirectives = vnode.directives, oldDirectives = oldVNode.directives, data = vnode.data;
    // 先触发 beforeDestroy 比较符合直觉
    if (oldDirectives) {
        const newValue = newDirectives || EMPTY_OBJECT;
        for (let name in oldDirectives) {
            if (newValue[name] === UNDEFINED$1) {
                callDirectiveHook(data, vnode, oldDirectives[name], 'beforeDestroy');
            }
        }
    }
    if (newDirectives) {
        const oldValue = oldDirectives || EMPTY_OBJECT, updatingDirectives = [];
        for (let name in newDirectives) {
            const directive = newDirectives[name];
            if (oldValue[name] === UNDEFINED$1) {
                callDirectiveCreate(data, vnode, directive);
            }
            else if (directive.value !== oldValue[name].value) {
                callDirectiveHook(data, vnode, directive, 'beforeUpdate');
                updatingDirectives.push(directive);
            }
        }
        data[DIRECTIVE_UPDATING] = updatingDirectives;
    }
}
function afterUpdate(api, vnode, oldVNode) {
    const { data } = vnode;
    if (data) {
        const directives = data[DIRECTIVE_UPDATING];
        if (directives) {
            for (let i = 0, length = directives.length; i < length; i++) {
                callDirectiveHook(data, vnode, directives[i], 'afterUpdate');
            }
            data[DIRECTIVE_UPDATING] = UNDEFINED$1;
        }
    }
}
const afterMount = genetateDirectiveHook('afterMount');
const beforeDestroy$1 = genetateDirectiveHook('beforeDestroy');

var directiveHook = /*#__PURE__*/Object.freeze({
  __proto__: null,
  afterCreate: afterCreate$1,
  beforeUpdate: beforeUpdate$1,
  afterUpdate: afterUpdate,
  afterMount: afterMount,
  beforeDestroy: beforeDestroy$1
});

function afterCreate(api, vnode) {
    const ref = vnode.ref;
    if (ref) {
        const context = vnode.context;
        let $refs = context.$refs;
        if (!$refs) {
            $refs = context.$refs = {};
        }
        $refs[ref] = vnode.component || vnode.node;
    }
}
// 删除 ref 的时候，要确保是相同的节点
// 因为模板中可能出现同一个 ref 名字，出现在不同的地方，
// 这样就可能出现一种特殊情况，即前面刚创建了 ref1，后面又把这个这个新创建的 ref1 删除了
function beforeUpdate(api, vnode, oldVNode) {
    const newRef = vnode.ref, oldRef = oldVNode.ref;
    if (newRef || oldRef) {
        const context = vnode.context, node = vnode.component || vnode.node;
        let $refs = context.$refs;
        if (newRef) {
            if (!oldRef) {
                if (!$refs) {
                    $refs = context.$refs = {};
                }
                $refs[newRef] = node;
            }
            else if (newRef !== oldRef) {
                if ($refs) {
                    if ($refs[newRef] === node) {
                        delete $refs[newRef];
                    }
                }
                else {
                    $refs = context.$refs = {};
                }
                $refs[newRef] = node;
            }
        }
        else if ($refs && oldRef && $refs[oldRef] === node) {
            delete $refs[oldRef];
        }
    }
}
function beforeDestroy(api, vnode) {
    const { ref } = vnode;
    if (ref) {
        const { $refs } = vnode.context, node = vnode.component || vnode.node;
        if ($refs && $refs[ref] === node) {
            delete $refs[ref];
        }
    }
}

var refHook = /*#__PURE__*/Object.freeze({
  __proto__: null,
  afterCreate: afterCreate,
  beforeUpdate: beforeUpdate,
  beforeDestroy: beforeDestroy
});

function getFragmentHostNode(api, vnode) {
    if (vnode.type === VNODE_TYPE_FRAGMENT
        || vnode.type === VNODE_TYPE_SLOT) {
        const child = vnode.children[0];
        return child
            ? getFragmentHostNode(api, child)
            : api.createComment(EMPTY_STRING);
    }
    return vnode.node;
}
function insertNodeNatively(api, parentNode, node, referenceNode) {
    if (referenceNode) {
        api.before(parentNode, node, referenceNode);
    }
    else {
        api.append(parentNode, node);
    }
}
function textVNodeUpdateOperator(api, vnode, oldVNode) {
    const node = oldVNode.node;
    vnode.node = node;
    vnode.parentNode = oldVNode.parentNode;
    if (vnode.text !== oldVNode.text) {
        api.setNodeText(node, vnode.text);
    }
}
function elementVNodeEnterOperator(vnode) {
    if (vnode.data) {
        enterVNode(vnode, vnode.node);
    }
}
function elementVNodeLeaveOperator(vnode, done) {
    if (vnode.data
        && leaveVNode(vnode, vnode.node, done)) {
        return;
    }
    done();
}
function vnodeInsertOperator(api, parentNode, vnode, before) {
    // 这里不调用 insertNodeNatively，避免判断两次
    if (before) {
        api.before(parentNode, vnode.node, before.node);
    }
    else {
        api.append(parentNode, vnode.node);
    }
}
function vnodeRemoveOperator(api, vnode) {
    api.remove(vnode.parentNode, vnode.node);
}
function vnodeLeaveOperator(vnode, done) {
    done();
}
function vnodeCreateChildrenOperator(api, vnode) {
    const children = vnode.children;
    for (let i = 0, length = children.length; i < length; i++) {
        createVNode(api, children[i]);
    }
}
function vnodeUpdateChildrenOperator(api, parentNode, vnode, oldVNode) {
    updateChildren(api, parentNode, vnode.children, oldVNode.children);
}
function vnodeDestroyChildrenOperator(api, vnode) {
    const children = vnode.children;
    for (let i = 0, length = children.length; i < length; i++) {
        destroyVNode(api, children[i]);
    }
}
function vnodeInsertChildrenOperator(api, parentNode, vnode, before) {
    const children = vnode.children;
    for (let i = 0, length = children.length; i < length; i++) {
        insertVNode(api, parentNode, children[i], before);
    }
}
function vnodeRemoveChildrenOperator(api, vnode) {
    const children = vnode.children;
    for (let i = 0, length = children.length; i < length; i++) {
        removeVNode(api, children[i]);
    }
}
const textVNodeOperator = {
    create(api, vnode) {
        vnode.node = api.createText(vnode.text);
    },
    update: textVNodeUpdateOperator,
    destroy: EMPTY_FUNCTION,
    insert: vnodeInsertOperator,
    remove: vnodeRemoveOperator,
    enter: EMPTY_FUNCTION,
    leave: vnodeLeaveOperator,
};
const commentVNodeOperator = {
    create(api, vnode) {
        vnode.node = api.createComment(vnode.text);
    },
    update: textVNodeUpdateOperator,
    destroy: EMPTY_FUNCTION,
    insert: vnodeInsertOperator,
    remove: vnodeRemoveOperator,
    enter: EMPTY_FUNCTION,
    leave: vnodeLeaveOperator,
};
const vnodeHooksList = [
    nativeAttrHook,
    nativeStyleHook,
    refHook,
    eventHook,
    modelHook,
    directiveHook,
];
const vnodeHooksLength = vnodeHooksList.length;
function callVNodeHooks(name, args) {
    for (let i = 0; i < vnodeHooksLength; i++) {
        const hook = vnodeHooksList[i][name];
        if (hook) {
            hook.apply(UNDEFINED$1, args);
        }
    }
}
const elementVNodeOperator = {
    create(api, vnode) {
        const node = vnode.node = api.createElement(vnode.tag, vnode.isSvg);
        if (vnode.children) {
            addVNodes(api, node, vnode.children);
        }
        else if (vnode.text) {
            api.setElementText(node, vnode.text);
        }
        else if (vnode.html) {
            api.setHtml(node, vnode.html);
        }
        if (!vnode.isPure) {
            vnode.data = {};
        }
        callVNodeHooks('afterCreate', [api, vnode]);
    },
    update(api, vnode, oldVNode) {
        const node = oldVNode.node;
        vnode.node = node;
        vnode.parentNode = oldVNode.parentNode;
        vnode.data = oldVNode.data;
        if (!vnode.isPure && oldVNode.isPure) {
            vnode.data = {};
        }
        callVNodeHooks('beforeUpdate', [api, vnode, oldVNode]);
        const { text, html, children } = vnode, oldText = oldVNode.text, oldHtml = oldVNode.html, oldChildren = oldVNode.children;
        if (string$1(text)) {
            if (oldChildren) {
                removeVNodes(api, oldChildren);
            }
            if (text !== oldText) {
                api.setElementText(node, text);
            }
        }
        else if (string$1(html)) {
            if (oldChildren) {
                removeVNodes(api, oldChildren);
            }
            if (html !== oldHtml) {
                api.setHtml(node, html);
            }
        }
        else if (children) {
            // 两个都有需要 diff
            if (oldChildren) {
                if (children !== oldChildren) {
                    updateChildren(api, node, children, oldChildren);
                }
            }
            // 有新的没旧的 - 新增节点
            else {
                if (oldText || oldHtml) {
                    api.setElementText(node, EMPTY_STRING);
                }
                addVNodes(api, node, children);
            }
        }
        // 有旧的没新的 - 删除节点
        else if (oldChildren) {
            removeVNodes(api, oldChildren);
        }
        // 有旧的 text 没有新的 text
        else if (oldText || oldHtml) {
            api.setElementText(node, EMPTY_STRING);
        }
        callVNodeHooks('afterUpdate', [api, vnode, oldVNode]);
    },
    destroy(api, vnode) {
        if (vnode.isPure) {
            return;
        }
        callVNodeHooks('beforeDestroy', [api, vnode]);
        const { children } = vnode;
        if (children) {
            for (let i = 0, length = children.length; i < length; i++) {
                destroyVNode(api, children[i]);
            }
        }
    },
    insert: vnodeInsertOperator,
    remove: vnodeRemoveOperator,
    enter: elementVNodeEnterOperator,
    leave: elementVNodeLeaveOperator,
};
const componentVNodeOperator = {
    create(api, vnode) {
        const data = vnode.data = {};
        let componentOptions = UNDEFINED$1;
        // 动态组件，tag 可能为空
        if (vnode.tag) {
            vnode.context.loadComponent(vnode.tag, function (options) {
                if (has(data, LOADING)) {
                    // 异步组件
                    if (data[LOADING]) {
                        // 尝试使用最新的 vnode
                        if (data[VNODE]) {
                            vnode = data[VNODE];
                            // 用完就删掉
                            delete data[VNODE];
                        }
                        createComponent(api, vnode, options);
                        vnode.operator.enter(vnode);
                    }
                }
                // 同步组件
                else {
                    componentOptions = options;
                }
            });
        }
        // 不论是同步还是异步组件，都需要一个占位元素
        vnode.node = api.createComment(RAW_COMPONENT);
        if (componentOptions) {
            createComponent(api, vnode, componentOptions);
        }
        else {
            data[LOADING] = TRUE$1;
        }
    },
    update(api, vnode, oldVNode) {
        const data = oldVNode.data;
        vnode.data = data;
        vnode.node = oldVNode.node;
        vnode.parentNode = oldVNode.parentNode;
        vnode.component = oldVNode.component;
        // 组件正在异步加载，更新为最新的 vnode
        // 当异步加载完成时才能用上最新的 vnode
        if (data[LOADING]) {
            data[VNODE] = vnode;
            return;
        }
        callVNodeHooks('beforeUpdate', [api, vnode, oldVNode]);
        const { component, slots } = vnode;
        if (component) {
            let nextProps = vnode.props;
            if (slots) {
                nextProps = extend(nextProps || {}, slots);
            }
            if (nextProps) {
                component.forceUpdate(nextProps);
            }
        }
        callVNodeHooks('afterUpdate', [api, vnode, oldVNode]);
    },
    destroy(api, vnode) {
        const { component } = vnode;
        if (component) {
            callVNodeHooks('beforeDestroy', [api, vnode]);
            component.destroy();
            // 移除时，组件可能已经发生过变化，即 shadow 不是创建时那个对象了
            vnode.shadow = component.$vnode;
            vnode.component = UNDEFINED$1;
        }
        else {
            vnode.data[LOADING] = FALSE$1;
        }
    },
    insert(api, parentNode, vnode, before) {
        const { shadow } = vnode;
        if (shadow) {
            shadow.operator.insert(api, parentNode, shadow, before);
            shadow.parentNode = parentNode;
        }
        else {
            vnodeInsertOperator(api, parentNode, vnode, before);
        }
    },
    remove(api, vnode) {
        const { shadow } = vnode;
        if (shadow) {
            shadow.operator.remove(api, shadow);
            shadow.parentNode = UNDEFINED$1;
        }
        else {
            vnodeRemoveOperator(api, vnode);
        }
    },
    enter(vnode) {
        const { shadow } = vnode;
        if (shadow) {
            if (vnode.transition) {
                enterVNode(vnode, shadow.node);
            }
            else {
                shadow.operator.enter(shadow);
            }
        }
    },
    leave(vnode, done) {
        const { shadow } = vnode;
        if (shadow) {
            if (vnode.transition) {
                if (leaveVNode(vnode, shadow.node, done)) {
                    return;
                }
            }
            else {
                shadow.operator.leave(shadow, done);
                return;
            }
        }
        done();
    },
};
const fragmentVNodeOperator = {
    create(api, vnode) {
        vnodeCreateChildrenOperator(api, vnode);
        vnode.node = getFragmentHostNode(api, vnode);
    },
    update(api, vnode, oldVNode) {
        const { parentNode } = oldVNode;
        vnode.node = oldVNode.node;
        vnode.parentNode = parentNode;
        vnodeUpdateChildrenOperator(api, parentNode, vnode, oldVNode);
    },
    destroy: vnodeDestroyChildrenOperator,
    insert: vnodeInsertChildrenOperator,
    remove: vnodeRemoveChildrenOperator,
    enter: EMPTY_FUNCTION,
    leave: vnodeLeaveOperator,
};
const portalVNodeOperator = {
    create(api, vnode) {
        let target = UNDEFINED$1;
        if (vnode.to) {
            target = api.find(vnode.to);
        }
        // 用 body 元素兜底
        if (!target) {
            target = api.getBodyElement();
        }
        vnode.target = target;
        // 用注释占用节点在模板里的位置
        // 这样删除或替换节点，才有找到它应该在的位置
        vnode.node = api.createComment(EMPTY_STRING);
        const children = vnode.children;
        for (let i = 0, length = children.length; i < length; i++) {
            createVNode(api, children[i]);
            insertVNode(api, target, children[i]);
        }
    },
    update(api, vnode, oldVNode) {
        const { target } = oldVNode;
        vnode.node = oldVNode.node;
        vnode.parentNode = oldVNode.parentNode;
        vnode.target = target;
        vnodeUpdateChildrenOperator(api, target, vnode, oldVNode);
    },
    destroy(api, vnode) {
        const children = vnode.children;
        for (let i = 0, length = children.length; i < length; i++) {
            destroyVNode(api, children[i]);
            removeVNode(api, children[i]);
        }
    },
    insert: vnodeInsertOperator,
    remove: vnodeRemoveOperator,
    enter: EMPTY_FUNCTION,
    leave: vnodeLeaveOperator,
};
const slotVNodeOperator = {
    create(api, vnode) {
        vnodeCreateChildrenOperator(api, vnode);
        vnode.data = {};
        vnode.node = getFragmentHostNode(api, vnode);
        callVNodeHooks('afterCreate', [api, vnode]);
    },
    update(api, vnode, oldVNode) {
        const { parentNode } = oldVNode;
        vnode.node = oldVNode.node;
        vnode.parentNode = parentNode;
        vnode.data = oldVNode.data;
        callVNodeHooks('beforeUpdate', [api, vnode, oldVNode]);
        vnodeUpdateChildrenOperator(api, parentNode, vnode, oldVNode);
        callVNodeHooks('afterUpdate', [api, vnode, oldVNode]);
    },
    destroy(api, vnode) {
        callVNodeHooks('beforeDestroy', [api, vnode]);
        vnodeDestroyChildrenOperator(api, vnode);
    },
    insert: vnodeInsertChildrenOperator,
    remove: vnodeRemoveChildrenOperator,
    enter: elementVNodeEnterOperator,
    leave: elementVNodeLeaveOperator,
};
function isPatchable(vnode, oldVNode) {
    return vnode.type === oldVNode.type
        && vnode.tag === oldVNode.tag
        && vnode.key === oldVNode.key;
}
function createKeyToIndex(vnodes, startIndex, endIndex) {
    let result, vnode, key;
    while (startIndex <= endIndex) {
        vnode = vnodes[startIndex];
        if (vnode && (key = vnode.key)) {
            if (!result) {
                result = {};
            }
            result[key] = startIndex;
        }
        startIndex++;
    }
    return result || EMPTY_OBJECT;
}
function createComponent(api, vnode, options) {
    const data = vnode.data, child = (vnode.parent || vnode.context).createComponent(options, vnode);
    vnode.component = child;
    vnode.shadow = child.$vnode;
    data[LOADING] = FALSE$1;
    callVNodeHooks('afterCreate', [api, vnode]);
    return child;
}
function createVNode(api, vnode) {
    if (!vnode.node) {
        vnode.operator.create(api, vnode);
    }
}
function addVNodes(api, parentNode, vnodes, startIndex, endIndex, before) {
    let vnode, start = startIndex || 0, end = endIndex !== UNDEFINED$1 ? endIndex : vnodes.length - 1;
    while (start <= end) {
        vnode = vnodes[start];
        createVNode(api, vnode);
        insertVNode(api, parentNode, vnode, before);
        start++;
    }
}
function insertVNode(api, parentNode, vnode, before) {
    const { operator } = vnode;
    operator.insert(api, parentNode, vnode, before);
    vnode.parentNode = parentNode;
    callVNodeHooks('afterMount', [api, vnode]);
    operator.enter(vnode);
}
function removeVNodes(api, vnodes, startIndex, endIndex) {
    let vnode, start = startIndex || 0, end = endIndex !== UNDEFINED$1 ? endIndex : vnodes.length - 1;
    while (start <= end) {
        vnode = vnodes[start];
        if (vnode) {
            destroyVNode(api, vnode);
            removeVNode(api, vnode);
        }
        start++;
    }
}
function destroyVNode(api, vnode) {
    vnode.operator.destroy(api, vnode);
}
function removeVNode(api, vnode) {
    const { operator } = vnode;
    operator.leave(vnode, function () {
        operator.remove(api, vnode);
        vnode.parentNode = UNDEFINED$1;
    });
}
function enterVNode(vnode, node) {
    const { context, transition } = vnode, data = vnode.data, leaving = data[LEAVING];
    if (leaving) {
        leaving();
    }
    if (transition) {
        const { enter } = transition;
        if (enter) {
            enter.call(context, node);
        }
    }
}
function leaveVNode(vnode, node, done) {
    const { context, transition } = vnode, data = vnode.data, leaving = data[LEAVING];
    if (leaving) {
        leaving();
    }
    if (transition) {
        const { leave } = transition;
        if (leave) {
            leave.call(context, node, data[LEAVING] = function () {
                if (data[LEAVING]) {
                    done();
                    data[LEAVING] = UNDEFINED$1;
                }
            });
            return TRUE$1;
        }
    }
}
function updateChildren(api, parentNode, children, oldChildren) {
    let startIndex = 0, endIndex = children.length - 1, startVNode = children[startIndex], endVNode = children[endIndex], oldStartIndex = 0, oldEndIndex = oldChildren.length - 1, oldStartVNode = oldChildren[oldStartIndex], oldEndVNode = oldChildren[oldEndIndex], oldKeyToIndex, oldIndex;
    while (oldStartIndex <= oldEndIndex && startIndex <= endIndex) {
        // 下面有设为 UNDEFINED 的逻辑
        if (!startVNode) {
            startVNode = children[++startIndex];
        }
        else if (!endVNode) {
            endVNode = children[--endIndex];
        }
        else if (!oldStartVNode) {
            oldStartVNode = oldChildren[++oldStartIndex];
        }
        else if (!oldEndVNode) {
            oldEndVNode = oldChildren[--oldEndIndex];
        }
        // 从头到尾比较，位置相同且值得 patch
        else if (isPatchable(startVNode, oldStartVNode)) {
            updateVNode(api, startVNode, oldStartVNode);
            startVNode = children[++startIndex];
            oldStartVNode = oldChildren[++oldStartIndex];
        }
        // 从尾到头比较，位置相同且值得 patch
        else if (isPatchable(endVNode, oldEndVNode)) {
            updateVNode(api, endVNode, oldEndVNode);
            endVNode = children[--endIndex];
            oldEndVNode = oldChildren[--oldEndIndex];
        }
        // 比较完两侧的节点，剩下就是 位置发生改变的节点 和 全新的节点
        // 当 endVNode 和 oldStartVNode 值得 patch
        // 说明元素被移到右边了
        else if (isPatchable(endVNode, oldStartVNode)) {
            updateVNode(api, endVNode, oldStartVNode);
            insertNodeNatively(api, parentNode, oldStartVNode.node, api.next(oldEndVNode.node));
            endVNode = children[--endIndex];
            oldStartVNode = oldChildren[++oldStartIndex];
        }
        // 当 oldEndVNode 和 startVNode 值得 patch
        // 说明元素被移到左边了
        else if (isPatchable(startVNode, oldEndVNode)) {
            updateVNode(api, startVNode, oldEndVNode);
            insertNodeNatively(api, parentNode, oldEndVNode.node, oldStartVNode.node);
            startVNode = children[++startIndex];
            oldEndVNode = oldChildren[--oldEndIndex];
        }
        // 尝试同级元素的 key
        else {
            if (!oldKeyToIndex) {
                oldKeyToIndex = createKeyToIndex(oldChildren, oldStartIndex, oldEndIndex);
            }
            // 新节点之前的位置
            oldIndex = startVNode.key
                ? oldKeyToIndex[startVNode.key]
                : UNDEFINED$1;
            // 移动元素
            if (oldIndex !== UNDEFINED$1) {
                patch(api, startVNode, oldChildren[oldIndex]);
                oldChildren[oldIndex] = UNDEFINED$1;
            }
            // 新元素
            else {
                createVNode(api, startVNode);
            }
            insertVNode(api, parentNode, startVNode, oldStartVNode);
            startVNode = children[++startIndex];
        }
    }
    if (oldStartIndex > oldEndIndex) {
        addVNodes(api, parentNode, children, startIndex, endIndex, children[endIndex + 1]);
    }
    else if (startIndex > endIndex) {
        removeVNodes(api, oldChildren, oldStartIndex, oldEndIndex);
    }
}
function updateVNode(api, vnode, oldVNode) {
    if (vnode !== oldVNode) {
        vnode.operator.update(api, vnode, oldVNode);
    }
}
function patch(api, vnode, oldVNode) {
    if (vnode === oldVNode) {
        return;
    }
    // 如果不能 patch，则删除重建
    if (!isPatchable(vnode, oldVNode)) {
        // 同步加载的组件，初始化时不会传入占位节点
        // 它内部会自动生成一个注释节点，当它的根 vnode 和注释节点对比时，必然无法 patch
        // 于是走进此分支，为新组件创建一个 DOM 节点，然后继续 createComponent 后面的流程
        const parentNode = oldVNode.parentNode;
        createVNode(api, vnode);
        if (parentNode) {
            insertVNode(api, parentNode, vnode, oldVNode);
            destroyVNode(api, oldVNode);
            removeVNode(api, oldVNode);
        }
        return;
    }
    updateVNode(api, vnode, oldVNode);
}
function create(api, node, context) {
    const vnode = {
        context,
        node,
        parentNode: api.parent(node),
    };
    switch (node.nodeType) {
        case NODE_TYPE_ELEMENT:
            vnode.data = {};
            vnode.tag = api.tag(node);
            vnode.type = VNODE_TYPE_ELEMENT;
            vnode.operator = elementVNodeOperator;
            break;
        case NODE_TYPE_TEXT:
            vnode.isPure = TRUE$1;
            vnode.text = node.nodeValue;
            vnode.type = VNODE_TYPE_TEXT;
            vnode.operator = textVNodeOperator;
            break;
        case NODE_TYPE_COMMENT:
            vnode.isPure = TRUE$1;
            vnode.text = node.nodeValue;
            vnode.type = VNODE_TYPE_COMMENT;
            vnode.operator = commentVNodeOperator;
            break;
    }
    return vnode;
}
function destroy(api, vnode, isRemove) {
    destroyVNode(api, vnode);
    if (isRemove) {
        removeVNode(api, vnode);
    }
}
function clone(vnode) {
    const { children } = vnode;
    return {
        type: vnode.type,
        data: vnode.data,
        node: vnode.node,
        parentNode: vnode.parentNode,
        target: vnode.target,
        shadow: vnode.shadow,
        parent: vnode.parent,
        component: vnode.component,
        context: vnode.context,
        operator: vnode.operator,
        tag: vnode.tag,
        isSvg: vnode.isSvg,
        isStatic: vnode.isStatic,
        isPure: vnode.isPure,
        slots: vnode.slots,
        props: vnode.props,
        nativeAttrs: vnode.nativeAttrs,
        nativeStyles: vnode.nativeStyles,
        directives: vnode.directives,
        events: vnode.events,
        lazy: vnode.lazy,
        transition: vnode.transition,
        model: vnode.model,
        to: vnode.to,
        ref: vnode.ref,
        key: vnode.key,
        text: vnode.text,
        html: vnode.html,
        children: children
            ? children.map(clone)
            : children,
    };
}

/**
 * 元素 节点
 */
const ELEMENT = 1;
/**
 * 属性 节点
 */
const ATTRIBUTE = 2;
/**
 * 指令 节点
 */
const DIRECTIVE = 3;
/**
 * 样式 节点
 */
const STYLE = 4;
/**
 * 文本 节点
 */
const TEXT = 5;
/**
 * if 节点
 */
const IF = 6;
/**
 * else if 节点
 */
const ELSE_IF = 7;
/**
 * else 节点
 */
const ELSE = 8;
/**
 * each 节点
 */
const EACH = 9;
/**
 * import 节点
 */
const IMPORT = 10;
/**
 * 表达式 节点
 */
const EXPRESSION = 11;
/**
 * 延展操作 节点
 */
const SPREAD = 12;

// 特殊标签
const specialTags = {};
// 特殊属性
const specialAttrs = {};
// 名称 -> 类型的映射
const name2Type = {};
// 标签名 -> vnode 类型的映射
const specialTag2VNodeType = {};
specialTags[TAG_SLOT] =
    specialTags[TAG_PORTAL] =
        specialTags[TAG_FRAGMENT] =
            specialTags[TAG_TEMPLATE] =
                specialAttrs[ATTR_KEY] =
                    specialAttrs[ATTR_REF] =
                        specialAttrs[TAG_SLOT] = TRUE$1;
name2Type['if'] = IF;
name2Type['each'] = EACH;
specialTag2VNodeType[TAG_FRAGMENT] = VNODE_TYPE_FRAGMENT;
specialTag2VNodeType[TAG_PORTAL] = VNODE_TYPE_PORTAL;
specialTag2VNodeType[TAG_SLOT] = VNODE_TYPE_SLOT;
function isSpecialAttr(element, attr) {
    return specialAttrs[attr.name]
        || element.tag === TAG_PORTAL && attr.name === ATTR_TO
        || element.tag === TAG_SLOT && attr.name === ATTR_NAME;
}
function parseStyleString(source, callback) {
    const parts = source.split(';');
    for (let i = 0, len = parts.length; i < len; i++) {
        const item = parts[i];
        const index = item.indexOf(':');
        if (index > 0) {
            const key = trim(item.substring(0, index));
            const value = trim(item.substring(index + 1));
            if (key && value) {
                callback(camelize(key), value);
            }
        }
    }
}

function createAttribute$1(name, ns) {
    return {
        type: ATTRIBUTE,
        isStatic: TRUE$1,
        name,
        ns,
    };
}
function createDirective(name, ns, modifier) {
    return {
        type: DIRECTIVE,
        ns,
        name,
        modifier,
    };
}
function createStyle() {
    return {
        type: STYLE,
        isStatic: TRUE$1,
    };
}
function createEach(from, to, equal, index) {
    return {
        type: EACH,
        from,
        to,
        equal: equal || UNDEFINED$1,
        index,
        isVirtual: TRUE$1,
    };
}
function createElement$2(tag, dynamicTag, isSvg, isStyle, isComponent) {
    const isSlot = tag === TAG_SLOT, isVirtual = !isComponent && !isSlot && !!specialTags[tag], isNative = !isComponent && !isSlot && !isVirtual;
    return {
        type: ELEMENT,
        tag,
        dynamicTag,
        isSvg,
        isStyle,
        isStatic: isNative,
        isNative,
        isVirtual,
        isComponent,
    };
}
function createElse() {
    return {
        type: ELSE,
        isVirtual: TRUE$1,
    };
}
function createElseIf(expr) {
    return {
        type: ELSE_IF,
        expr,
        isVirtual: TRUE$1,
    };
}
function createExpression(expr, safe) {
    return {
        type: EXPRESSION,
        expr,
        safe,
        isLeaf: TRUE$1,
        isStatic: expr.isStatic,
    };
}
function createIf(expr) {
    return {
        type: IF,
        expr,
        isVirtual: TRUE$1,
    };
}
function createImport(expr) {
    return {
        type: IMPORT,
        expr,
        isLeaf: TRUE$1,
    };
}
function createSpread(expr) {
    return {
        type: SPREAD,
        expr,
        isLeaf: TRUE$1,
    };
}
function createText$1(text) {
    return {
        type: TEXT,
        text,
        isStatic: TRUE$1,
        isLeaf: TRUE$1,
    };
}

const // 首字母大写，或中间包含 -
componentNamePattern = /^[A-Z]|-/, 
// HTML 实体（中间最多 6 位，没见过更长的）
htmlEntityPattern = /&[#\w\d]{2,6};/, 
// 常见的自闭合标签
selfClosingTagNames = EMPTY_OBJECT, 
// 常见的 svg 标签
svgTagNames = EMPTY_OBJECT, 
// 常见的数字类型的属性（width,height,cellpadding,cellspacing 支持百分比，因此不计入数字类型）
numberAttributeNames = EMPTY_OBJECT, 
// 常见的布尔类型的属性
booleanAttributeNames = EMPTY_OBJECT;
function isSelfClosing(tagName) {
    return selfClosingTagNames[tagName] !== UNDEFINED$1;
}
function createAttribute(element, name, ns) {
    // 组件用驼峰格式
    if (element.isComponent) {
        return createAttribute$1(camelize(name), ns);
    }
    // 原生 dom 属性
    if (name === 'style') {
        return createStyle();
    }
    const attribute = createAttribute$1(name, ns);
    if (isBooleanNativeAttribute(name)) {
        // 默认为 true 的布尔属性只有以下两种情况
        attribute.defaultValue = name === 'spellcheck'
            || (element.tag === 'img' && name === 'draggable');
    }
    return attribute;
}
function getAttributeDefaultValue(element, name, defaultValue) {
    // 比如 <Dog isLive>
    if (element.isComponent) {
        return TRUE$1;
    }
    // 无视 <input min> 无效写法
    if (isNumberNativeAttribute(name)) {
        return UNDEFINED$1;
    }
    // 布尔类型取决于 defaultValue
    if (isBooleanNativeAttribute(name)) {
        return formatBooleanNativeAttributeValue(name, TRUE$1, defaultValue);
    }
    // 字符串类型返回空字符串
    return EMPTY_STRING;
}
function formatNativeAttributeValue(name, value, defaultValue) {
    if (isNumberNativeAttribute(name)) {
        return formatNumberNativeAttributeValue(name, value);
    }
    else if (isBooleanNativeAttribute(name)) {
        return formatBooleanNativeAttributeValue(name, value, defaultValue);
    }
    // 字符串类型的属性，保持原样即可
    return value;
}
function isNumberNativeAttribute(name) {
    return numberAttributeNames[name];
}
function isBooleanNativeAttribute(name) {
    return booleanAttributeNames[name];
}
function formatNumberNativeAttributeValue(name, value) {
    return toString(value);
}
function formatBooleanNativeAttributeValue(name, value, defaultValue) {
    // 布尔类型的属性，只有值为 true 或 属性名 才表示 true
    const isTrue = value === TRUE$1 || value === RAW_TRUE || value === name;
    return isTrue === defaultValue
        ? UNDEFINED$1
        : (isTrue ? RAW_TRUE : RAW_FALSE);
}
function createElement$1(staticTag, dynamicTag) {
    let isSvg = FALSE$1, isStyle = FALSE$1, isComponent = FALSE$1;
    if (dynamicTag) {
        isComponent = TRUE$1;
    }
    else {
        isSvg = svgTagNames[staticTag] !== UNDEFINED$1;
        // 是 svg 就不可能是组件
        // 加这个判断的原因是，svg 某些标签含有 连字符 和 大写字母，比较蛋疼
        if (!isSvg && componentNamePattern.test(staticTag)) {
            isComponent = TRUE$1;
        }
        else if (staticTag === 'style') {
            isStyle = TRUE$1;
        }
    }
    return createElement$2(staticTag, dynamicTag, isSvg, isStyle, isComponent);
}
function compatElement(element) {
    let { attrs } = element, hasType = FALSE$1;
    if (attrs) {
        each$2(attrs, function (attr) {
            const name = attr.type === ATTRIBUTE
                ? attr.name
                : UNDEFINED$1;
            if (name === 'type') {
                hasType = TRUE$1;
            }
        });
    }
    // 补全 style 标签的 type
    // style 如果没有 type 则加一个 type="text/css"
    // 因为低版本 IE 没这个属性，没法正常渲染样式
    if (element.isStyle && !hasType) {
        const attr = createAttribute$1('type');
        attr.value = 'text/css';
        push(element.attrs || (element.attrs = []), attr);
    }
}
function setElementText$1(element, text) {
    if (string$1(text)) {
        if (htmlEntityPattern.test(text)) {
            element.html = text;
        }
        else {
            element.text = text;
        }
    }
    else {
        element.text = text;
    }
    return TRUE$1;
}
function setElementHtml(element, expr) {
    element.html = expr;
    return TRUE$1;
}

function isDef (target) {
    return target !== UNDEFINED$1;
}

/**
 * 字面量
 */
const LITERAL = 1;
/**
 * 标识符
 */
const IDENTIFIER = 2;
/**
 * 对象属性或数组下标
 */
const MEMBER = 3;
/**
 * 一元表达式，如 - a
 */
const UNARY = 4;
/**
 * 二元表达式，如 a + b
 */
const BINARY = 5;
/**
 * 三元表达式，如 a ? b : c
 */
const TERNARY = 6;
/**
 * 数组表达式，如 [ 1, 2, 3 ]
 */
const ARRAY = 7;
/**
 * 对象表达式，如 { name: 'yox' }
 */
const OBJECT = 8;
/**
 * 函数调用表达式，如 a()
 */
const CALL = 9;

const CODE_EOF = 0; //
const CODE_DOT = 46; // .
const CODE_COMMA = 44; // ,
const CODE_SLASH = 47; // /
const CODE_BACKSLASH = 92; // \
const CODE_SQUOTE = 39; // '
const CODE_DQUOTE = 34; // "
const CODE_OPAREN = 40; // (
const CODE_CPAREN = 41; // )
const CODE_OBRACK = 91; // [
const CODE_CBRACK = 93; // ]
const CODE_OBRACE = 123; // {
const CODE_CBRACE = 125; // }
const CODE_QUESTION = 63; // ?
const CODE_COLON = 58; // :
const CODE_PLUS = 43; // +
const CODE_MINUS = 45; // -
const CODE_MULTIPLY = 42; // *
const CODE_DIVIDE = 47; // /
const CODE_MODULO = 37; // %
const CODE_WAVE = 126; // ~
const CODE_AND = 38; // &
const CODE_OR = 124; // |
const CODE_XOR = 94; // ^
const CODE_NOT = 33; // !
const CODE_LESS = 60; // <
const CODE_EQUAL = 61; // =
const CODE_GREAT = 62; // >
const CODE_AT = 64; // @
/**
 * 区分关键字和普通变量
 * 举个例子：a === true
 * 从解析器的角度来说，a 和 true 是一样的 token
 */
const keywordLiterals = {};
keywordLiterals[RAW_TRUE] = TRUE$1;
keywordLiterals[RAW_FALSE] = FALSE$1;
keywordLiterals[RAW_NULL] = NULL$1;
keywordLiterals[RAW_UNDEFINED] = UNDEFINED$1;
/**
 * 是否是空白符，用下面的代码在浏览器测试一下
 *
 * ```
 * for (var i = 0; i < 200; i++) {
 *   console.log(i, String.fromCharCode(i))
 * }
 * ```
 *
 * 从 0 到 32 全是空白符，100 往上分布比较散且较少用，唯一需要注意的是 160
 *
 * 160 表示 non-breaking space
 * http://www.adamkoch.com/2009/07/25/white-space-and-character-160/
 */
function isWhitespace(code) {
    return (code > 0 && code < 33) || code === 160;
}
/**
 * 是否是数字
 */
function isDigit(code) {
    return code > 47 && code < 58; // 0...9
}
/**
 * 是否是数字
 */
function isNumber(code) {
    return isDigit(code) || code === CODE_DOT;
}
/**
 * 是否是插槽变量，@name 表示引用 name 所指定的插槽
 */
function isSlotIdentifierStart(code) {
    return code === CODE_AT;
}
/**
 * 变量开始字符必须是 字母、下划线、$
 */
function isIdentifierStart(code) {
    return code === 36 // $
        || code === 95 // _
        || (code > 96 && code < 123) // a...z
        || (code > 64 && code < 91); // A...Z
}
/**
 * 变量剩余的字符必须是 字母、下划线、$、数字
 */
function isIdentifierPart(code) {
    return isIdentifierStart(code) || isDigit(code);
}

function createArray(nodes, raw) {
    return {
        type: ARRAY,
        raw,
        nodes,
        isStatic: isStaticNodes(nodes),
    };
}
function createBinary(left, operator, right, raw) {
    return {
        type: BINARY,
        raw,
        left,
        operator,
        right,
        isStatic: isStaticNodes([left, right]),
    };
}
function createCall(name, args, raw) {
    return {
        type: CALL,
        raw,
        name,
        args,
    };
}
function createIdentifier(raw, name, isProp) {
    let root = FALSE$1, lookup = TRUE$1, offset = 0;
    if (name === KEYPATH_CURRENT) {
        name = EMPTY_STRING;
        lookup = FALSE$1;
    }
    else if (name === KEYPATH_PARENT) {
        name = EMPTY_STRING;
        lookup = FALSE$1;
        offset = 1;
    }
    else if (name === KEYPATH_ROOT) {
        name = EMPTY_STRING;
        root = TRUE$1;
        lookup = FALSE$1;
    }
    else {
        name = replaceSlotIdentifierIfNeeded(name);
    }
    // 对象属性需要区分 a.b 和 a[b]
    // 如果不借用 Literal 无法实现这个判断
    // 同理，如果用了这种方式，就无法区分 a.b 和 a['b']，但是无所谓，这两种表示法本就一个意思
    return isProp
        ? createLiteral(name, raw)
        : createIdentifierInner(raw, name, root, lookup, offset);
}
function createLiteral(value, raw) {
    return {
        type: LITERAL,
        raw,
        value,
        isStatic: TRUE$1,
    };
}
function createObject(keys, values, raw) {
    return {
        type: OBJECT,
        raw,
        keys,
        values,
        isStatic: isStaticNodes(values),
    };
}
function createTernary(test, yes, no, raw) {
    return {
        type: TERNARY,
        raw,
        test,
        yes,
        no,
        isStatic: isStaticNodes([test, yes, no]),
    };
}
function createUnary(operator, node, raw) {
    return {
        type: UNARY,
        raw,
        operator,
        node,
        isStatic: node.isStatic,
    };
}
/**
 * 通过判断 nodes 来决定是否需要创建 Member
 *
 * 创建 Member 至少需要 nodes 有两个节点
 */
function createMemberIfNeeded(raw, nodes) {
    // 第一个节点要特殊处理
    let firstNode = nodes.shift(), 
    // 是否直接从顶层查找
    root = FALSE$1, 
    // 是否向上查找
    lookup = TRUE$1, 
    // 偏移量，默认从当前 context 开始查找
    offset = 0;
    // 表示传入的 nodes 至少有两个节点（弹出了一个）
    if (nodes.length > 0) {
        // 处理剩下的 nodes
        // 这里要做两手准备：
        // 1. 如果全是 literal 节点，则编译时 join
        // 2. 如果不全是 literal 节点，则运行时 join
        // 是否全是 Literal 节点
        let isLiteral = TRUE$1, 
        // 静态节点
        staticNodes = [], 
        // 对于 this.a.b[c] 这样的
        // 要还原静态部分 this.a.b 的 raw
        // 虽然 raw 没什么大用吧，谁让我是洁癖呢
        staticRaw = EMPTY_STRING, 
        // 动态节点
        dynamicNodes = [];
        each$2(nodes, function (node) {
            if (isLiteral) {
                if (node.type === LITERAL) {
                    const literalNode = node;
                    if (literalNode.raw === KEYPATH_PARENT) {
                        offset += 1;
                        staticRaw = staticRaw
                            ? staticRaw + RAW_SLASH + KEYPATH_PARENT
                            : KEYPATH_PARENT;
                        return;
                    }
                    if (literalNode.raw !== KEYPATH_CURRENT) {
                        const value = toString(literalNode.value);
                        push(staticNodes, value);
                        if (staticRaw) {
                            staticRaw += endsWith(staticRaw, KEYPATH_PARENT)
                                ? RAW_SLASH
                                : RAW_DOT;
                        }
                        staticRaw += value;
                    }
                }
                else {
                    isLiteral = FALSE$1;
                }
            }
            if (!isLiteral) {
                push(dynamicNodes, node);
            }
        });
        // lookup 要求第一位元素是 Identifier，且它的 lookup 是 true 才为 true
        // 其他情况都为 false，如 "11".length 第一位元素是 Literal，不存在向上寻找的需求
        // 优化 1：计算 keypath
        //
        // 计算 keypath 的唯一方式是，第一位元素是 Identifier，后面都是 Literal
        // 否则就表示中间包含动态元素，这会导致无法计算静态路径
        // 如 a.b.c 可以算出 static keypath，而 a[b].c 则不行，因为 b 是动态的
        // 优化 2：计算 offset 并智能转成 Identifier
        //
        // 比如 xx 这样的表达式，应优化成 offset = 2，并转成 Identifier
        // 处理第一个节点
        if (firstNode.type === IDENTIFIER) {
            const identifierNode = firstNode;
            root = identifierNode.root;
            lookup = identifierNode.lookup;
            offset += identifierNode.offset;
            let firstName = identifierNode.name;
            // 不是 KEYPATH_THIS 或 KEYPATH_PARENT 或 KEYPATH_ROOT
            if (firstName) {
                firstName = replaceSlotIdentifierIfNeeded(firstName, identifierNode);
                unshift(staticNodes, firstName);
            }
            // 转成 Identifier
            firstName = join$1(staticNodes, RAW_DOT);
            // a.b.c
            if (isLiteral) {
                firstNode = createIdentifierInner(raw, firstName, root, lookup, offset, staticNodes);
            }
            // a[b]
            // this.a[b]
            else {
                // 当 isLiteral 为 false 时
                // 需要为 lead 节点创建合适的 raw
                let firstRaw = identifierNode.raw;
                if (staticRaw) {
                    // 确定 firstNode 和后续静态节点的连接字符
                    let separator = RAW_DOT;
                    if (firstRaw === KEYPATH_ROOT
                        || firstRaw === KEYPATH_PARENT) {
                        separator = RAW_SLASH;
                    }
                    firstRaw += separator + staticRaw;
                }
                firstNode = createMemberInner(raw, createIdentifierInner(firstRaw, firstName, root, lookup, offset, staticNodes), UNDEFINED$1, dynamicNodes, root, lookup, offset);
            }
        }
        else {
            // 例子：
            // "xxx".length
            // format().a.b
            if (isLiteral) {
                firstNode = createMemberInner(raw, firstNode, join$1(staticNodes, RAW_DOT), UNDEFINED$1, root, lookup, offset);
            }
            // 例子：
            // "xxx"[length]
            // format()[a]
            else {
                firstNode = createMemberInner(raw, firstNode, UNDEFINED$1, dynamicNodes, root, lookup, offset);
            }
        }
    }
    return firstNode;
}
function createIdentifierInner(raw, name, root, lookup, offset, literals) {
    return {
        type: IDENTIFIER,
        raw,
        name,
        root,
        lookup,
        offset,
        literals: literals && literals.length > 1 ? literals : UNDEFINED$1,
    };
}
function createMemberInner(raw, lead, keypath, nodes, root, lookup, offset) {
    return {
        type: MEMBER,
        raw,
        lead,
        keypath,
        nodes,
        root,
        lookup,
        offset,
        isStatic: lead.isStatic && (!nodes || isStaticNodes(nodes)),
    };
}
function replaceSlotIdentifierIfNeeded(name, identifierNode) {
    // 如果是插槽变量，则进行替换
    if (isSlotIdentifierStart(codeAt(name, 0))) {
        name = SLOT_DATA_PREFIX + slice(name, 1);
        if (identifierNode) {
            identifierNode.name = name;
        }
    }
    return name;
}
function isStaticNodes(nodes) {
    let isStatic = TRUE$1;
    each$2(nodes, function (node) {
        if (!node.isStatic) {
            return isStatic = FALSE$1;
        }
    });
    return isStatic;
}

const unary = {
    '+': TRUE$1,
    '-': TRUE$1,
    '~': TRUE$1,
    '!': TRUE$1,
    '!!': TRUE$1,
};
// 参考 https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Operator_Precedence#table
const binary = {
    '*': 15,
    '/': 15,
    '%': 15,
    '+': 14,
    '-': 14,
    '<<': 13,
    '>>': 13,
    '>>>': 13,
    '<': 12,
    '<=': 12,
    '>': 12,
    '>=': 12,
    '==': 11,
    '!=': 11,
    '===': 11,
    '!==': 11,
    '&': 10,
    '^': 9,
    '|': 8,
    '&&': 7,
    '||': 6,
};

class Parser {
    constructor(content) {
        const instance = this;
        instance.index = -1;
        instance.end = content.length;
        instance.code = CODE_EOF;
        instance.content = content;
        instance.go();
    }
    /**
     * 移动一个字符
     */
    go(step) {
        let instance = this, { index, end } = instance;
        index += step || 1;
        if (index >= 0 && index < end) {
            instance.code = instance.codeAt(index);
            instance.index = index;
        }
        else {
            instance.code = CODE_EOF;
            instance.index = index < 0 ? -1 : end;
        }
    }
    /**
     * 跳过空白符
     */
    skip(step) {
        const instance = this, reversed = step && step < 0;
        // 如果表达式是 "   xyz   "，到达结尾后，如果希望 skip(-1) 回到最后一个非空白符
        // 必须先判断最后一个字符是空白符，否则碰到 "xyz" 这样结尾不是空白符的，其实不应该回退
        if (instance.code === CODE_EOF) {
            const oldIndex = instance.index;
            instance.go(step);
            // 如果跳一位之后不是空白符，还原，然后返回
            if (!isWhitespace(instance.code)) {
                instance.go(oldIndex - instance.index);
                return;
            }
        }
        // 逆向时，只有位置真的发生过变化才需要在停止时正向移动一位
        // 比如 (a) 如果调用 skip 前位于 )，调用 skip(-1) ，结果应该是原地不动
        // 为了解决这个问题，应该首先判断当前是不是空白符，如果不是，直接返回
        else if (!isWhitespace(instance.code)) {
            return;
        }
        // 如果是正向的，停在第一个非空白符左侧
        // 如果是逆向的，停在第一个非空白符右侧
        while (TRUE$1) {
            if (isWhitespace(instance.code)) {
                instance.go(step);
            }
            else {
                if (reversed) {
                    instance.go();
                }
                break;
            }
        }
    }
    /**
     * 判断当前字符
     */
    is(code) {
        return this.code === code;
    }
    /**
     * 截取一段字符串
     */
    pick(startIndex, endIndex) {
        return slice(this.content, startIndex, isDef(endIndex) ? endIndex : this.index);
    }
    /**
     * 读取 index 位置的 char code
     *
     * @param index
     */
    codeAt(index) {
        return codeAt(this.content, index);
    }
    /**
     * 尝试解析下一个 token
     */
    scanToken() {
        const instance = this, { code, index } = instance;
        let isSlotIdentifier = FALSE$1;
        if (isSlotIdentifierStart(code)) {
            isSlotIdentifier = TRUE$1;
            instance.go();
        }
        // 因为上面可能前进了一步，因此这里用 instance.code
        if (isIdentifierStart(instance.code)) {
            return instance.scanTail(index, [
                instance.scanIdentifier(index, isSlotIdentifier)
            ]);
        }
        // @后面是个标识符才行，否则回退
        else if (isSlotIdentifier) {
            instance.go(-1);
        }
        if (isDigit(code)) {
            return instance.scanNumber(index);
        }
        switch (code) {
            case CODE_EOF:
                return;
            // 'x' "x"
            case CODE_SQUOTE:
            case CODE_DQUOTE:
                return instance.scanTail(index, [
                    instance.scanString(index, code)
                ]);
            // .1  ./  ../
            case CODE_DOT:
                instance.go();
                return isDigit(instance.code)
                    ? instance.scanNumber(index)
                    : instance.scanPath(index);
            // ~/a
            case CODE_WAVE:
                // 因为 ~ 可以是一元运算符，因此必须判断后面紧跟 / 才是路径
                if (instance.codeAt(index + 1) === CODE_SLASH) {
                    return instance.scanPath(index);
                }
                break;
            // (xx)
            case CODE_OPAREN:
                instance.go();
                return instance.scanTernary(CODE_CPAREN);
            // [xx, xx]
            case CODE_OBRACK:
                return instance.scanTail(index, [
                    createArray(instance.scanTuple(index, CODE_CBRACK), instance.pick(index))
                ]);
            // { a: 'x', b: 'x' }
            case CODE_OBRACE:
                return instance.scanObject(index);
        }
        // 因为 scanOperator 会导致 index 发生变化，只能放在最后尝试
        const operator = instance.scanOperator(index);
        if (operator && unary[operator]) {
            const node = instance.scanTernary();
            if (node) {
                if (node.type === LITERAL) {
                    const value = node.value;
                    if (number(value)) {
                        // 类似 ' -1 ' 这样的右侧有空格，需要撤回来
                        instance.skip(-1);
                        return createLiteral(-value, instance.pick(index));
                    }
                }
                // 类似 ' -a ' 这样的右侧有空格，需要撤回来
                instance.skip(-1);
                return createUnary(operator, node, instance.pick(index));
            }
        }
    }
    /**
     * 扫描数字
     *
     * 支持整数和小数
     *
     * @param startIndex
     * @return
     */
    scanNumber(startIndex) {
        const instance = this;
        while (isNumber(instance.code)) {
            instance.go();
        }
        const raw = instance.pick(startIndex);
        // 尝试转型，如果转型失败，则确定是个错误的数字
        if (numeric(raw)) {
            return createLiteral(+raw, raw);
        }
    }
    /**
     * 扫描字符串
     *
     * 支持反斜线转义引号
     *
     * @param startIndex
     * @param endCode
     */
    scanString(startIndex, endCode) {
        const instance = this;
        loop: while (TRUE$1) {
            // 这句有两个作用：
            // 1. 跳过开始的引号
            // 2. 驱动 index 前进
            instance.go();
            switch (instance.code) {
                // \" \'
                case CODE_BACKSLASH:
                    instance.go();
                    break;
                case endCode:
                    instance.go();
                    break loop;
                case CODE_EOF:
                    break loop;
            }
        }
        // new Function 处理字符转义
        const raw = instance.pick(startIndex);
        return createLiteral(new Function(`return ${raw}`)(), raw);
    }
    /**
     * 扫描对象字面量
     *
     * @param startIndex
     */
    scanObject(startIndex) {
        let instance = this, keys = [], values = [], isKey = TRUE$1, node;
        // 跳过 {
        instance.go();
        loop: while (TRUE$1) {
            switch (instance.code) {
                case CODE_CBRACE:
                    instance.go();
                    break loop;
                case CODE_EOF:
                    break loop;
                // :
                case CODE_COLON:
                    instance.go();
                    isKey = FALSE$1;
                    break;
                // ,
                case CODE_COMMA:
                    instance.go();
                    isKey = TRUE$1;
                    break;
                default:
                    // 解析 key 的时候，node 可以为空，如 { } 或 { name: 'xx', }
                    // 解析 value 的时候，node 不能为空
                    node = instance.scanTernary();
                    if (isKey) {
                        if (node) {
                            // 处理 { key : value } key 后面的空格
                            instance.skip();
                            if (node.type === IDENTIFIER) {
                                push(keys, node.name);
                            }
                            else if (node.type === LITERAL) {
                                push(keys, node.value);
                            }
                            else {
                                break loop;
                            }
                        }
                    }
                    else if (node) {
                        // 处理 { key : value } value 后面的空格
                        instance.skip();
                        push(values, node);
                    }
                    // 类似这样 { key: }
                    else {
                        break loop;
                    }
            }
        }
        return createObject(keys, values, instance.pick(startIndex));
    }
    /**
     * 扫描元组，即 `a, b, c` 这种格式，可以是参数列表，也可以是数组
     *
     * @param startIndex
     * @param endCode 元组的结束字符编码
     */
    scanTuple(startIndex, endCode) {
        let instance = this, nodes = [], node;
        // 跳过开始字符，如 [ 和 (
        instance.go();
        loop: while (TRUE$1) {
            switch (instance.code) {
                case endCode:
                    instance.go();
                    break loop;
                case CODE_EOF:
                    break loop;
                case CODE_COMMA:
                    instance.go();
                    break;
                default:
                    // 1. ( )
                    // 2. (1, 2, )
                    // 这三个例子都会出现 scanTernary 为空的情况
                    // 但是不用报错
                    node = instance.scanTernary();
                    if (node) {
                        // 为了解决 1 , 2 , 3 这样的写法
                        // 当解析出值后，先跳过后面的空格
                        instance.skip();
                        push(nodes, node);
                    }
            }
        }
        return nodes;
    }
    /**
     * 扫描路径，如 `./` 和 `../` 和 `/a`
     *
     * 路径必须位于开头，如 ./../ 或 ，不存在 a/../b/../c 这样的情况，因为路径是用来切换或指定 context 的
     *
     * @param startIndex
     * @param prevNode
     */
    scanPath(startIndex) {
        let instance = this, nodes = [], name;
        // 进入此函数时，已确定前一个 code 是 helper.CODE_DOT
        // 此时只需判断接下来是 ./ 还是 / 就行了
        while (TRUE$1) {
            name = KEYPATH_CURRENT;
            // ../
            if (instance.is(CODE_DOT)) {
                instance.go();
                name = KEYPATH_PARENT;
            }
            // ~/a
            else if (instance.is(CODE_WAVE)) {
                instance.go();
                name = KEYPATH_ROOT;
            }
            push(nodes, createIdentifier(name, name, nodes.length > 0));
            // 如果以 / 结尾，则命中 ./ 或 ../
            if (instance.is(CODE_SLASH)) {
                instance.go();
                const { index, code } = instance;
                let isSlotIdentifier = FALSE$1;
                if (isSlotIdentifierStart(code)) {
                    isSlotIdentifier = TRUE$1;
                    instance.go();
                }
                // 因为上面可能前进了一步，因此这里用 instance.code
                if (isIdentifierStart(instance.code)) {
                    push(nodes, instance.scanIdentifier(index, isSlotIdentifier, TRUE$1));
                    return instance.scanTail(startIndex, nodes);
                }
                else {
                    // @后面是个标识符才行，否则回退
                    if (isSlotIdentifier) {
                        instance.go(-1);
                    }
                    if (instance.is(CODE_DOT)) {
                        // 先跳过第一个 .
                        instance.go();
                        // 继续循环
                    }
                    else {
                        break;
                    }
                }
            }
            // 类似 . 或 ..，可能就是想读取层级对象
            // 此处不用关心后面跟的具体是什么字符，那是其他函数的事情，就算报错也让别的函数去报
            // 此处也不用关心延展操作符，即 ...object，因为表达式引擎管不了这事，它没法把对象变成 attr1=value1 attr2=value2 的格式
            // 这应该是模板引擎该做的事
            else {
                break;
            }
        }
    }
    /**
     * 扫描变量
     */
    scanTail(startIndex, nodes) {
        let instance = this, node;
        /**
         * 标识符后面紧着的字符，可以是 ( . [，此外还存在各种组合，感受一下：
         *
         * a.b.c().length
         * a[b].c()()
         * a[b][c]()[d](e, f, g).length
         * [].length
         */
        loop: while (TRUE$1) {
            switch (instance.code) {
                // a(x)
                case CODE_OPAREN:
                    nodes = [
                        createCall(createMemberIfNeeded(instance.pick(startIndex), nodes), instance.scanTuple(instance.index, CODE_CPAREN), instance.pick(startIndex))
                    ];
                    break;
                // a.x
                case CODE_DOT:
                    instance.go();
                    // 接下来的字符，可能是数字，也可能是标识符，如果不是就报错
                    if (isIdentifierPart(instance.code)) {
                        // 无需识别关键字
                        push(nodes, instance.scanIdentifier(instance.index, FALSE$1, TRUE$1));
                        break;
                    }
                    else {
                        break loop;
                    }
                // a[]
                case CODE_OBRACK:
                    // 过掉 [
                    instance.go();
                    node = instance.scanTernary(CODE_CBRACK);
                    if (node) {
                        push(nodes, node);
                        break;
                    }
                    else {
                        break loop;
                    }
                default:
                    break loop;
            }
        }
        return createMemberIfNeeded(instance.pick(startIndex), nodes);
    }
    /**
     * 扫描标识符
     *
     * @param startIndex
     * @param isProp 是否是对象的属性
     * @return
     */
    scanIdentifier(startIndex, isSlotIdentifier, isProp) {
        const instance = this;
        // 标识符的第一个字符在外面已经判断过，肯定符合要求
        // 因此这里先前进一步
        do {
            instance.go();
        } while (isIdentifierPart(instance.code));
        const raw = instance.pick(startIndex);
        // 插槽变量，@ 后面必须有其他字符
        if (isSlotIdentifier && raw.length === 1) {
            instance.fatal(startIndex, 'A slot identifier must be followed by its name.');
        }
        return !isProp && raw in keywordLiterals
            ? createLiteral(keywordLiterals[raw], raw)
            : createIdentifier(raw, raw, isProp);
    }
    /**
     * 扫描运算符
     *
     * @param startIndex
     */
    scanOperator(startIndex) {
        const instance = this;
        switch (instance.code) {
            // /、%、~、^
            case CODE_DIVIDE:
            case CODE_MODULO:
            case CODE_WAVE:
            case CODE_XOR:
                instance.go();
                break;
            // *
            case CODE_MULTIPLY:
                instance.go();
                break;
            // +
            case CODE_PLUS:
                instance.go();
                break;
            // -
            case CODE_MINUS:
                instance.go();
                break;
            // !、!!、!=、!==
            case CODE_NOT:
                instance.go();
                if (instance.is(CODE_NOT)) {
                    instance.go();
                }
                else if (instance.is(CODE_EQUAL)) {
                    instance.go();
                    if (instance.is(CODE_EQUAL)) {
                        instance.go();
                    }
                }
                break;
            // &、&&
            case CODE_AND:
                instance.go();
                if (instance.is(CODE_AND)) {
                    instance.go();
                }
                break;
            // |、||
            case CODE_OR:
                instance.go();
                if (instance.is(CODE_OR)) {
                    instance.go();
                }
                break;
            // ==、===
            case CODE_EQUAL:
                instance.go();
                if (instance.is(CODE_EQUAL)) {
                    instance.go();
                    if (instance.is(CODE_EQUAL)) {
                        instance.go();
                    }
                }
                break;
            // <、<=、<<
            case CODE_LESS:
                instance.go();
                if (instance.is(CODE_EQUAL)
                    || instance.is(CODE_LESS)) {
                    instance.go();
                }
                break;
            // >、>=、>>、>>>
            case CODE_GREAT:
                instance.go();
                if (instance.is(CODE_EQUAL)) {
                    instance.go();
                }
                else if (instance.is(CODE_GREAT)) {
                    instance.go();
                    if (instance.is(CODE_GREAT)) {
                        instance.go();
                    }
                }
                break;
        }
        if (instance.index > startIndex) {
            return instance.pick(startIndex);
        }
    }
    /**
     * 扫描二元运算
     */
    scanBinary(startIndex) {
        // 二元运算，如 a + b * c / d，这里涉及运算符的优先级
        // 算法参考 https://en.wikipedia.org/wiki/Shunting-yard_algorithm
        let instance = this, 
        // 格式为 [ index1, node1, index2, node2, ... ]
        output = [], token, index, operator, operatorPrecedence, lastOperator, lastOperatorPrecedence;
        while (TRUE$1) {
            instance.skip();
            push(output, instance.index);
            token = instance.scanToken();
            if (token) {
                push(output, token);
                push(output, instance.index);
                instance.skip();
                operator = instance.scanOperator(instance.index);
                // 必须是二元运算符，一元不行
                if (operator && (operatorPrecedence = binary[operator])) {
                    while (TRUE$1) {
                        // 比较前一个运算符
                        index = output.length - 4;
                        // 如果前一个运算符的优先级 >= 现在这个，则新建 Binary
                        // 如 a + b * c / d，当从左到右读取到 / 时，发现和前一个 * 优先级相同，则把 b * c 取出用于创建 Binary
                        if ((lastOperator = output[index])
                            && (lastOperatorPrecedence = binary[lastOperator])
                            && lastOperatorPrecedence >= operatorPrecedence) {
                            output.splice(index - 2, 5, createBinary(output[index - 2], lastOperator, output[index + 2], instance.pick(output[index - 3], output[index + 3])));
                        }
                        else {
                            break;
                        }
                    }
                    push(output, operator);
                    continue;
                }
                else {
                    operator = UNDEFINED$1;
                }
            }
            // 没匹配到 token 或 operator 则跳出循环
            break;
        }
        // 类似 a + b * c 这种走到这会有 11 个
        // 此时需要从后往前遍历，因为确定后面的优先级肯定大于前面的
        while (TRUE$1) {
            // 最少的情况是 a + b，它有 7 个元素
            if (output.length >= 7) {
                index = output.length - 4;
                output.splice(index - 2, 5, createBinary(output[index - 2], output[index], output[index + 2], instance.pick(output[index - 3], output[index + 3])));
            }
            else {
                return output[1];
            }
        }
    }
    /**
     * 扫描三元运算
     *
     * @param endCode
     */
    scanTernary(endCode) {
        /**
         * https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Operator_Precedence
         *
         * ?: 运算符的优先级几乎是最低的，比它低的只有四种： 赋值、yield、延展、逗号
         * 我们不支持这四种，因此可认为 ?: 优先级最低
         */
        const instance = this;
        instance.skip();
        let index = instance.index, test = instance.scanBinary(index), yes, no;
        if (instance.is(CODE_QUESTION)) {
            // 跳过 ?
            instance.go();
            yes = instance.scanTernary();
            if (instance.is(CODE_COLON)) {
                // 跳过 :
                instance.go();
                no = instance.scanTernary();
            }
            if (test && yes && no) {
                // 类似 ' a ? 1 : 0 ' 这样的右侧有空格，需要撤回来
                instance.skip(-1);
                test = createTernary(test, yes, no, instance.pick(index));
            }
        }
        // 过掉结束字符
        if (isDef(endCode)) {
            instance.skip();
            if (instance.is(endCode)) {
                instance.go();
            }
        }
        return test;
    }
    fatal(start, message) {
    }
}
const compile$1 = createOneKeyCache(function (content) {
    const parser = new Parser(content);
    return parser.scanTernary(CODE_EOF);
});

// 当前不位于 block 之间
const BLOCK_MODE_NONE = 1, 
// {{ x }}
BLOCK_MODE_SAFE = 2, 
// {{{ x }}}
BLOCK_MODE_UNSAFE = 3, 
// 缓存编译正则
patternCache = {}, 
// 指令分隔符，如 on-click 和 lazy-click
directiveSeparator = '-', 
// on-
directiveOnSeparator = DIRECTIVE_ON + directiveSeparator, 
// lazy-
directiveLazySeparator = DIRECTIVE_LAZY + directiveSeparator, 
// o-
directiveCustomSeparator = DIRECTIVE_CUSTOM + directiveSeparator, 
// 解析 each 的 index
eachIndexPattern = /\s*:\s*([_$a-z]+)$/i, 
// 换行符
// 比较神奇是，有时候你明明看不到换行符，却真的存在一个，那就是 \r
breaklinePattern = /^\s*[\n\r]\s*|\s*[\n\r]\s*$/g, 
// 区间遍历
rangePattern = /\s*(=>|->)\s*/, 
// 标签
// 动态标签支持路径表达式，比如 $this.name、$../name、$~/name
tagPattern = /<(\/)?([a-z][-a-z0-9]*|\$[^\s]*)/i, 
// 开始注释
openCommentCode = '<!--', 
// 结束注释
endCommentCode = '-->', 
// 属性的 name
// 支持 on-click.namespace="" 或 on-get-out="" 或 xml:xx=""
attributePattern = /^\s*([-$.:\w]+)(?:=(['"]))?/, 
// 自闭合标签
selfClosingTagPattern = /^\s*(\/)?>/;
/**
 * 截取前缀之后的字符串
 */
function slicePrefix(str, prefix) {
    return trim(slice(str, prefix.length));
}
function toTextNode(node) {
    if (node.safe
        && node.expr.type === LITERAL) {
        return createText$1(toString(node.expr.value));
    }
}
function compareMatchIndex(index1, index2) {
    if (index1 >= 0 && index2 >= 0) {
        return index1 < index2 ? -1 : 1;
    }
    else if (index1 >= 0) {
        return -1;
    }
    else if (index2 >= 0) {
        return 1;
    }
    return 0;
}
function walkCommentString(stack, code, push$1, pop$1) {
    while (TRUE$1) {
        const openIndex = code.text.indexOf(openCommentCode, code.position), closeIndex = code.text.indexOf(endCommentCode, code.position);
        switch (compareMatchIndex(openIndex, closeIndex)) {
            case -1:
                code.position = openIndex + 1;
                const range = {
                    startIndex: openIndex
                };
                push(stack, range);
                if (push$1) {
                    push$1(code, range);
                }
                break;
            case 1:
                code.position = closeIndex + 1;
                // 如果 stack.length 为 0，却匹配到了一个 -->
                // 这种情况不用处理，因为可能就是纯字符串，或者 <!-- 被插值语法隔断了
                const { length } = stack;
                if (length > 0) {
                    const range = pop(stack);
                    range.endIndex = closeIndex + endCommentCode.length;
                    const isEmpty = length === 1;
                    if (pop$1) {
                        const result = pop$1(code, range, isEmpty);
                        if (result === FALSE$1) {
                            return;
                        }
                    }
                    if (isEmpty) {
                        return;
                    }
                }
                break;
            case 0:
                return;
        }
    }
}
function removeCommentNode(children) {
    // 类似 <!-- xx {{name}} yy {{age}} zz --> 这样的注释里包含插值
    // 按照目前的解析逻辑，是根据定界符进行模板分拆
    // 一旦出现插值，children 长度必然大于 1
    const stack = [];
    // children 是否发生 splice 操作
    let hasSplice = FALSE$1;
    for (let i = 0; i < children.length; i++) {
        const child = children[i];
        if (child.type === TEXT) {
            const textNode = child;
            walkCommentString(stack, {
                text: textNode.text,
                position: 0,
            }, function (_, commentRange) {
                commentRange.index = i;
                commentRange.text = slice(textNode.text, 0, commentRange.startIndex);
            }, function (commentPosition, commentRange) {
                const openIndex = commentRange.index, closeIndex = i, openText = commentRange.text, closeText = slice(textNode.text, commentRange.endIndex);
                if (openIndex === closeIndex) {
                    commentPosition.text = textNode.text = openText + closeText;
                    commentPosition.position = commentRange.startIndex;
                    return;
                }
                let startIndex = openIndex, endIndex = closeIndex;
                if (openText) {
                    children[openIndex].text = openText;
                    startIndex++;
                }
                if (closeText) {
                    children[closeIndex].text = closeText;
                    endIndex--;
                }
                const deleteCount = endIndex - startIndex + 1;
                if (deleteCount > 0) {
                    hasSplice = TRUE$1;
                    children.splice(startIndex, deleteCount);
                    i = startIndex - 1;
                }
                return FALSE$1;
            });
        }
    }
    if (hasSplice) {
        // 合并相邻的静态文本节点
        for (let i = 0; i < children.length; i++) {
            const child = children[i];
            if (child.type === TEXT) {
                const nextChild = children[i + 1];
                if (nextChild && nextChild.type === TEXT) {
                    child.text += nextChild.text;
                    children.splice(i + 1, 1);
                }
            }
        }
    }
}
function compile(content) {
    // 左安全定界符
    let leftSafeDelimiter = repeat(PUBLIC_CONFIG.leftDelimiter, 2), 
    // 右安全定界符
    rightSafeDelimiter = repeat(PUBLIC_CONFIG.rightDelimiter, 2), leftUnsafeFlag = PUBLIC_CONFIG.leftDelimiter, rightUnsafeFlag = PUBLIC_CONFIG.rightDelimiter, nodeList = [], nodeStack = [], commentStack, 
    // 持有 if 节点，方便 if/elseif/else 出栈时，获取到 if 节点
    ifList = [], 
    // 持有 if/elseif/else 节点
    ifStack = [], 
    // 持有 each 节点，方便 each/else 出栈时，获取到 each 节点
    eachList = [], 
    // 持有 each/else 节点
    eachStack = [], currentElement, currentAttribute, length = content.length, 
    // 当前处理的位置
    index = 0, 
    // 下一段开始的位置
    nextIndex = 0, 
    // 开始定界符的位置，表示的是 {{ 的右侧位置
    openBlockIndex = 0, 
    // 结束定界符的位置，表示的是 }} 的左侧位置
    closeBlockIndex = 0, 
    // 当前正在处理或即将处理的 block 类型
    blockMode = BLOCK_MODE_NONE, 
    // mustache 注释可能出现嵌套插值的情况
    blockStack = [], indexList = [], code, attributeStartQuote, /**
     * 常见的两种情况：
     *
     * <div>
     *    <input>1
     * </div>
     *
     * <div>
     *    <input>
     * </div>
     */
    popSelfClosingElementIfNeeded = function (popingTagName) {
        const lastNode = last(nodeStack);
        if (lastNode && lastNode.type === ELEMENT) {
            const lastElement = lastNode;
            if (lastElement.tag !== popingTagName
                && isSelfClosing(lastElement.tag)) {
                popStack(lastElement.type, lastElement.tag);
            }
        }
    }, popStack = function (type, tagName) {
        const node = pop(nodeStack);
        const branchNode = node, isElement = type === ELEMENT, isAttribute = type === ATTRIBUTE, isStyle = type === STYLE, isDirective = type === DIRECTIVE, parentBranchNode = last(nodeStack);
        let { children } = branchNode;
        // 先处理 children.length 大于 1 的情况，因为这里会有一些优化，导致最后的 children.length 不一定大于 0
        if (children && children.length > 1) {
            // 元素层级
            if (!currentElement) {
                removeCommentNode(children);
                if (!children.length) {
                    children = branchNode.children = UNDEFINED$1;
                }
            }
        }
        // 除了符合 isSpecialAttr() 定义的特殊属性，attrs 里的任何节点都不能单独拎出来赋给 element
        // 因为 attrs 可能存在 if，所以每个 attr 最终都不一定会存在
        if (children) {
            // 优化单个子节点
            // 减少运行时的负担
            const onlyChild = children.length === 1 && children[0];
            if (onlyChild) {
                switch (onlyChild.type) {
                    case TEXT:
                        if (isElement) {
                            processElementSingleText(branchNode, onlyChild);
                        }
                        else if (currentElement) {
                            if (isAttribute) {
                                processAttributeSingleText(currentElement, branchNode, onlyChild);
                            }
                            else if (isStyle) {
                                processStyleSingleText(currentElement, branchNode, onlyChild);
                            }
                            else if (isDirective) {
                                processDirectiveSingleText(currentElement, branchNode, onlyChild);
                            }
                        }
                        break;
                    case EXPRESSION:
                        if (isElement) {
                            processElementSingleExpression(branchNode, onlyChild);
                        }
                        else if (currentElement && (isAttribute || isStyle || isDirective)) {
                            processAttributeSingleExpression(currentElement, branchNode, onlyChild);
                        }
                        break;
                }
            }
        }
        // 0 个子节点
        else if (currentElement) {
            if (isAttribute) {
                processAttributeEmptyChildren(currentElement, branchNode);
            }
            else if (isStyle) {
                processStyleEmptyChildren(currentElement, branchNode);
            }
            else if (isDirective) {
                processDirectiveEmptyChildren(currentElement, branchNode);
            }
        }
        if (branchNode.isVirtual
            && !branchNode.children) {
            replaceChild(branchNode);
        }
        if (isElement) {
            checkElement(branchNode);
        }
        else if (currentElement) {
            if (isAttribute) {
                checkAttribute(currentElement, branchNode);
            }
        }
        // 弹出过程可能会修改 branchNode.isStatic，因此这段放在最后执行
        // 当 branchNode 出栈时，它的 isStatic 就彻底固定下来，不会再变了
        // 这时如果它不是静态节点，则父节点也不是静态节点
        if (parentBranchNode
            && parentBranchNode.isStatic
            && !branchNode.isStatic) {
            parentBranchNode.isStatic = FALSE$1;
        }
        return branchNode;
    }, processElementSingleText = function (element, child) {
        // 需要在这特殊处理的是 html 实体
        // 但这只是 WEB 平台的特殊逻辑，所以丢给 platform 处理
        if (element.isNative
            && setElementText$1(element, child.text)) {
            element.children = UNDEFINED$1;
        }
    }, processElementSingleExpression = function (element, child) {
        if (element.isNative) {
            if (child.safe && setElementText$1(element, child.expr)
                || !child.safe && setElementHtml(element, child.expr)) {
                element.children = UNDEFINED$1;
            }
        }
    }, processStyleEmptyChildren = function (element, style) {
        // 如果不写值，直接忽略
        replaceChild(style);
    }, processStyleSingleText = function (element, style, child) {
        if (child.text) {
            style.value = child.text;
            style.children = UNDEFINED$1;
        }
        else {
            // 如果是 style=""，直接忽略
            replaceChild(style);
        }
    }, processAttributeEmptyChildren = function (element, attr) {
        if (isSpecialAttr(element, attr)) ;
        else {
            attr.value = getAttributeDefaultValue(element, attr.name, attr.defaultValue);
        }
    }, processAttributeSingleText = function (element, attr, child) {
        const { text } = child;
        if (element.isNative) {
            attr.value = formatNativeAttributeValue(attr.name, text, attr.defaultValue);
        }
        else {
            attr.value = text;
        }
        attr.children = UNDEFINED$1;
    }, processAttributeSingleExpression = function (element, attr, child) {
        const { expr } = child;
        if (expr.type === LITERAL) {
            let value = expr.value;
            if (element.isNative && attr.type === ATTRIBUTE) {
                value = formatNativeAttributeValue(attr.name, value, attr.defaultValue);
            }
            attr.value = value;
        }
        else {
            attr.expr = expr;
        }
        attr.children = UNDEFINED$1;
    }, processDirectiveEmptyChildren = function (element, directive) {
        directive.value = TRUE$1;
    }, processDirectiveSingleText = function (element, directive, child) {
        let { ns } = directive, { text } = child, 
        // 自定义指令运行不合法的表达式
        isCustom = ns === DIRECTIVE_CUSTOM, 
        // 指令的值是纯文本，可以预编译表达式，提升性能
        expr, error;
        try {
            expr = compile$1(text);
        }
        catch (e) {
            error = e;
        }
        if (expr) {
            directive.expr = expr;
            directive.value = expr.type === LITERAL
                ? expr.value
                : text;
        }
        else {
            // 自定义指令支持错误的表达式
            // 反正是自定义的规则，爱怎么写就怎么写
            if (!isCustom) {
                throw error;
            }
            directive.value = text;
        }
        directive.children = UNDEFINED$1;
    }, checkCondition = function (condition) {
        // 这里会去掉没有子节点的空分支
        let currentNode = condition, nodeList = [], hasNext = FALSE$1, hasChildren = FALSE$1;
        // 转成数组，方便下一步从后往前遍历
        while (TRUE$1) {
            push(nodeList, currentNode);
            if (currentNode.next) {
                currentNode = currentNode.next;
            }
            else {
                break;
            }
        }
        each$2(nodeList, function (node) {
            // 当前分支有子节点
            if (node.children) {
                // 从后往前遍历第一次发现非空分支
                // 此时，可以删掉后面的空分支
                if (!hasNext && node.next) {
                    delete node.next;
                }
                hasChildren = hasNext = TRUE$1;
            }
        }, TRUE$1);
        // 所有分支都没有子节点，删掉整个 if
        if (!hasChildren) {
            replaceChild(condition);
        }
    }, checkElement = function (element) {
        const { tag, slot } = element, isTemplate = tag === TAG_TEMPLATE, isFragment = tag === TAG_FRAGMENT, isPortal = tag === TAG_PORTAL;
        // 没有子节点，则意味着这个元素没任何意义
        if ((isTemplate || isFragment || isPortal) && !element.children) {
            replaceChild(element);
        }
        // 处理浏览器兼容问题
        else if (element.isNative) {
            compatElement(element);
        }
    }, checkAttribute = function (element, attr) {
        const { name, value } = attr, isSlot = name === ATTR_SLOT;
        if (isSpecialAttr(element, attr)) {
            const isStringValueRequired = isSlot;
            element[name] = isStringValueRequired ? value : attr;
            replaceChild(attr);
            if (attr.isStatic) {
                attr.isStatic = FALSE$1;
            }
        }
    }, replaceChild = function (oldNode, newNode) {
        let currentBranch = last(nodeStack), isAttr, list, index;
        if (currentBranch) {
            isAttr = currentElement && currentElement === currentBranch;
            list = isAttr
                ? currentBranch.attrs
                : currentBranch.children;
        }
        else {
            list = nodeList;
        }
        if (list) {
            index = indexOf$1(list, oldNode);
            if (index >= 0) {
                if (newNode) {
                    list[index] = newNode;
                }
                else {
                    list.splice(index, 1);
                    if (currentBranch && !list.length) {
                        if (isAttr) {
                            delete currentBranch.attrs;
                        }
                        else {
                            currentBranch.children = UNDEFINED$1;
                        }
                    }
                }
            }
        }
    }, addChild = function (node) {
        /**
         * <div>
         *    <input>
         *    <div></div>
         * </div>
         *
         * <div>
         *    <input>xxx
         * </div>
         */
        if (!currentElement) {
            popSelfClosingElementIfNeeded();
        }
        let type = node.type, currentBranch = last(nodeStack), lastIfBranch = UNDEFINED$1, lastElseIfBranch = UNDEFINED$1, lastEachBranch = UNDEFINED$1;
        if (type === ELSE_IF) {
            const lastNode = last(ifStack);
            if (lastNode) {
                // lastNode 只能是 if 或 else if 节点
                if (lastNode.type === IF) {
                    lastIfBranch = lastNode;
                }
                else if (lastNode.type === ELSE_IF) {
                    lastElseIfBranch = lastNode;
                }
                // 上一个节点是 else，又加了一个 else if
                else ;
            }
        }
        else if (type === ELSE) {
            const lastIfNode = last(ifStack), lastEachNode = last(eachStack);
            if (lastIfNode && currentBranch === lastIfNode) {
                // lastIfNode 只能是 if 或 else if 节点
                if (lastIfNode.type === IF) {
                    lastIfBranch = lastIfNode;
                }
                else if (lastIfNode.type === ELSE_IF) {
                    lastElseIfBranch = lastIfNode;
                }
                // 上一个节点是 else，又加了一个 else
                else ;
            }
            else if (lastEachNode && currentBranch === lastEachNode) {
                // lastEachNode 只能是 each 节点
                if (lastEachNode.type === EACH) {
                    lastEachBranch = lastEachNode;
                }
            }
            else ;
        }
        else {
            if (currentBranch) {
                // 这里不能写 currentElement && !currentAttribute，举个例子
                //
                // <div id="x" {{#if}} name="xx" alt="xx" {{/if}}
                //
                // 当 name 属性结束后，条件满足，但此时已不是元素属性层级了
                if (currentElement && currentBranch.type === ELEMENT) {
                    // node 没法转型，一堆可能的类型怎么转啊...
                    push(currentElement.attrs || (currentElement.attrs = []), node);
                }
                else {
                    const children = currentBranch.children || (currentBranch.children = []), lastChild = last(children);
                    // 如果表达式是安全插值的字面量，可以优化成字符串
                    if (type === EXPRESSION
                        // 在元素的子节点中，则直接转成字符串
                        && (!currentElement
                            // 在元素的属性中，如果同级节点大于 0 个（即至少存在一个），则可以转成字符串
                            || (currentAttribute && children.length > 0))) {
                        const textNode = toTextNode(node);
                        if (textNode) {
                            node = textNode;
                            type = textNode.type;
                        }
                    }
                    // 连续添加文本节点，则直接合并
                    if (lastChild
                        && type === TEXT) {
                        // 合并两个文本节点
                        if (lastChild.type === TEXT) {
                            lastChild.text += node.text;
                            return;
                        }
                        // 前一个是字面量的表达式，也可以合并节点
                        // 比如 attr="{{true}}1"，先插入了一个 true 字面量表达式，然后再插入一个文本时，可以合并
                        if (lastChild.type === EXPRESSION) {
                            const textNode = toTextNode(lastChild);
                            if (textNode) {
                                children[children.length - 1] = textNode;
                                textNode.text += node.text;
                                return;
                            }
                        }
                    }
                    push(children, node);
                }
            }
            else {
                push(nodeList, node);
            }
        }
        if (type === IF) {
            push(ifList, node);
            push(ifStack, node);
        }
        else if (type === EACH) {
            push(eachList, node);
            push(eachStack, node);
        }
        else if (lastIfBranch) {
            lastIfBranch.next = node;
            ifStack[ifStack.length - 1] = node;
            popStack(lastIfBranch.type);
        }
        else if (lastElseIfBranch) {
            lastElseIfBranch.next = node;
            ifStack[ifStack.length - 1] = node;
            popStack(lastElseIfBranch.type);
        }
        else if (lastEachBranch) {
            lastEachBranch.next = node;
            eachStack[eachStack.length - 1] = node;
            popStack(lastEachBranch.type);
        }
        if (node.isLeaf) {
            // 当前树枝节点如果是静态的，一旦加入了一个非静态子节点，改变当前树枝节点的 isStatic
            // 这里不处理树枝节点的进栈，因为当树枝节点出栈时，还有一次处理机会，那时它的 isStatic 已确定下来，不会再变
            if (currentBranch) {
                if (currentBranch.isStatic && !node.isStatic) {
                    currentBranch.isStatic = FALSE$1;
                }
            }
        }
        else {
            push(nodeStack, node);
        }
    }, addTextChild = function (text) {
        // [注意]
        // 这里不能随便删掉
        // 因为收集组件的子节点会受影响，举个例子：
        // <Component>
        //
        // </Component>
        // 按现在的逻辑，这样的组件是没有子节点的，因为在这里过滤掉了，因此该组件没有 slot
        // 如果这里放开了，组件就会有一个 slot
        // trim 文本开始和结束位置的换行符
        text = text.replace(breaklinePattern, EMPTY_STRING);
        if (text) {
            addChild(createText$1(text));
        }
    }, htmlParsers = [
        function (content) {
            if (!commentStack && !currentElement) {
                const match = content.match(tagPattern);
                // 必须以 <tag 开头才能继续
                // 如果 <tag 前面有别的字符，会走进第四个 parser
                if (match && match.index === 0) {
                    let tag = match[2];
                    // 结束标签
                    if (match[1] === RAW_SLASH) {
                        /**
                         * 处理可能存在的自闭合元素，如下
                         *
                         * <div>
                         *    <input>
                         * </div>
                         */
                        popSelfClosingElementIfNeeded(tag);
                        // 等到 > 字符才算真正的结束
                        currentElement = popStack(ELEMENT);
                    }
                    // 开始标签
                    else {
                        let dynamicTag;
                        // 如果以 $ 开头，表示动态组件
                        if (charAt(tag) === RAW_DOLLAR) {
                            // 编译成表达式
                            tag = slice(tag, 1);
                            dynamicTag = compile$1(tag);
                        }
                        const node = createElement$1(tag, dynamicTag);
                        addChild(node);
                        currentElement = node;
                    }
                    return match[0];
                }
            }
        },
        // 处理标签的 > 或 />，不论开始还是结束标签
        function (content) {
            if (commentStack) {
                return;
            }
            const match = content.match(selfClosingTagPattern);
            if (match) {
                // 处理开始标签的 > 或 />
                // 处理结束标签的 >
                if (currentElement && !currentAttribute) {
                    // 自闭合标签
                    if (match[1] === RAW_SLASH) {
                        popStack(currentElement.type, currentElement.tag);
                    }
                    currentElement = UNDEFINED$1;
                    return match[0];
                }
                // 如果只是写了一个 > 字符
                // 比如 <div>></div>
                // 则交给其他 parser 处理
            }
        },
        // 处理 attribute directive 的 name 部分
        function (content) {
            // 当前在 element 层级
            if (!commentStack && currentElement && !currentAttribute) {
                const match = content.match(attributePattern);
                if (match) {
                    let node, name = match[1];
                    if (name === DIRECTIVE_MODEL || name === DIRECTIVE_TRANSITION) {
                        node = createDirective(EMPTY_STRING, name);
                    }
                    // 这里要用 on- 判断前缀，否则 on 太容易重名了
                    else if (startsWith(name, directiveOnSeparator)) {
                        const event = slicePrefix(name, directiveOnSeparator);
                        const parts = camelize(event).split(RAW_DOT);
                        node = createDirective(parts[0], DIRECTIVE_EVENT, parts[1]);
                    }
                    // 当一个元素绑定了多个事件时，可分别指定每个事件的 lazy
                    // 当只有一个事件时，可简写成 lazy
                    // <div on-click="xx" lazy-click
                    else if (name === DIRECTIVE_LAZY) {
                        node = createDirective(EMPTY_STRING, DIRECTIVE_LAZY);
                    }
                    else if (startsWith(name, directiveLazySeparator)) {
                        const lazy = slicePrefix(name, directiveLazySeparator);
                        node = createDirective(camelize(lazy), DIRECTIVE_LAZY);
                    }
                    // 自定义指令
                    else if (startsWith(name, directiveCustomSeparator)) {
                        const custom = slicePrefix(name, directiveCustomSeparator);
                        const parts = camelize(custom).split(RAW_DOT);
                        node = createDirective(parts[0], DIRECTIVE_CUSTOM, parts[1]);
                    }
                    else {
                        // 处理类似 xml:name="value" 的命名空间
                        const parts = name.split(':');
                        node = parts.length === 2
                            ? createAttribute(currentElement, parts[1], parts[0])
                            : createAttribute(currentElement, name);
                    }
                    addChild(node);
                    // 这里先记下，下一个 handler 要匹配结束引号
                    attributeStartQuote = match[2];
                    // 有属性值才需要设置 currentAttribute，便于后续收集属性值
                    if (attributeStartQuote) {
                        currentAttribute = node;
                    }
                    else {
                        popStack(node.type);
                    }
                    return match[0];
                }
            }
        },
        function (content) {
            let text = UNDEFINED$1, match;
            // 处理 attribute directive 的 value 部分
            if (!commentStack && currentAttribute && attributeStartQuote) {
                match = content.match(patternCache[attributeStartQuote] || (patternCache[attributeStartQuote] = new RegExp(attributeStartQuote)));
                // 有结束引号
                if (match) {
                    text = slice(content, 0, match.index);
                    addTextChild(text);
                    // 收集 value 到此结束
                    // 此时如果一个值都没收集到，需设置一个空字符串
                    // 否则无法区分 <div a b=""> 中的 a 和 b
                    if (!currentAttribute.children) {
                        addChild(createText$1(EMPTY_STRING));
                    }
                    text += attributeStartQuote;
                    popStack(currentAttribute.type);
                    currentAttribute = UNDEFINED$1;
                }
                // 没有结束引号，整段匹配
                // 比如 <div name="1{{a}}2"> 中的 1
                else {
                    text = content;
                    addTextChild(text);
                }
            }
            // 如果不加判断，类似 <div {{...obj}}> 这样写，会把空格当做一个属性
            // 收集文本只有两处：属性值、元素内容
            // 属性值通过上面的 if 处理过了，这里只需要处理元素内容
            else if (!currentElement) {
                let childText = EMPTY_STRING;
                // 如果当前位置不在注释中，则先判断是否有标签
                if (!commentStack) {
                    match = content.match(tagPattern);
                    if (match) {
                        const tagIndex = match.index, commentIndex = content.indexOf(openCommentCode);
                        // tag 在 comment 前面
                        if (compareMatchIndex(tagIndex, commentIndex) < 0) {
                            text = slice(content, 0, tagIndex);
                            childText = text;
                        }
                    }
                }
                if (!isDef(text)) {
                    let startIndex = -1, endIndex = -1;
                    const oldCommentStack = commentStack, newCommentStack = commentStack || [];
                    // 重置 commentStack
                    commentStack = UNDEFINED$1;
                    walkCommentString(newCommentStack, {
                        text: content,
                        position: 0,
                    }, function (_, commentRange) {
                        if (startIndex < 0) {
                            startIndex = commentRange.startIndex;
                            text = content;
                            childText = content;
                            commentStack = newCommentStack;
                        }
                    }, function (_, commentRange, isEmpty) {
                        if (isEmpty) {
                            commentStack = UNDEFINED$1;
                            endIndex = commentRange.endIndex;
                            // 注释是完整的
                            if (startIndex >= 0) {
                                if (oldCommentStack) {
                                    text = slice(content, 0, endIndex);
                                    childText = text;
                                }
                                else {
                                    text = slice(content, 0, endIndex);
                                    childText = slice(content, 0, startIndex);
                                }
                            }
                            // 只匹配到注释结束符
                            else {
                                text = slice(content, 0, endIndex);
                                childText = text;
                            }
                        }
                    });
                }
                if (!isDef(text)) {
                    // 普通文本
                    text = content;
                    childText = content;
                }
                addTextChild(childText);
            }
            else {
                text = content;
            }
            return text;
        },
    ], blockParsers = [
        // {{#each xx:index}}
        function (source) {
            if (startsWith(source, SYNTAX_EACH)) {
                source = trim(slicePrefix(source, SYNTAX_EACH));
                let literal = source, index = UNDEFINED$1, match = source.match(eachIndexPattern);
                if (match) {
                    index = match[1];
                    literal = slice(source, 0, -1 * match[0].length);
                }
                match = literal.match(rangePattern);
                if (match) {
                    const parts = literal.split(rangePattern), from = compile$1(parts[0]), to = compile$1(parts[2]);
                    if (from && to) {
                        return createEach(from, to, match[1] === '=>', index);
                    }
                }
                else {
                    const expr = compile$1(literal);
                    if (expr) {
                        return createEach(expr, UNDEFINED$1, FALSE$1, index);
                    }
                }
            }
        },
        // {{#import name}}
        function (source) {
            if (startsWith(source, SYNTAX_IMPORT)) {
                source = slicePrefix(source, SYNTAX_IMPORT);
                const expr = compile$1(source);
                return createImport(expr);
            }
        },
        // {{#if expr}}
        function (source) {
            if (startsWith(source, SYNTAX_IF)) {
                source = slicePrefix(source, SYNTAX_IF);
                const expr = compile$1(source);
                return createIf(expr);
            }
        },
        // {{else if expr}}
        function (source) {
            if (startsWith(source, SYNTAX_ELSE_IF)) {
                source = slicePrefix(source, SYNTAX_ELSE_IF);
                const expr = compile$1(source);
                return createElseIf(expr);
            }
        },
        // {{else}}
        function (source) {
            if (startsWith(source, SYNTAX_ELSE)) {
                source = slicePrefix(source, SYNTAX_ELSE);
                return createElse();
            }
        },
        // {{...obj}}
        function (source) {
            if (startsWith(source, SYNTAX_SPREAD)) {
                source = slicePrefix(source, SYNTAX_SPREAD);
                const expr = compile$1(source);
                if (currentElement && currentElement.isComponent) {
                    return createSpread(expr);
                }
            }
        },
        // {{expr}}
        function (source) {
            if (!SYNTAX_COMMENT.test(source)) {
                source = trim(source);
                const expr = compile$1(source);
                return createExpression(expr, blockMode === BLOCK_MODE_SAFE);
            }
        },
    ], parseHtml = function (code) {
        while (code) {
            each$2(htmlParsers, function (parse) {
                const match = parse(code);
                if (match) {
                    code = slice(code, match.length);
                    return FALSE$1;
                }
            });
        }
    }, parseBlock = function (code) {
        if (charAt(code) === RAW_SLASH) {
            /**
             * 处理可能存在的自闭合元素，如下
             *
             * {{#if xx}}
             *    <input>
             * {{/if}}
             */
            popSelfClosingElementIfNeeded();
            const name = slice(code, 1);
            let type = name2Type[name], ifNode = UNDEFINED$1, eachNode = UNDEFINED$1;
            if (type === IF) {
                const node = pop(ifStack);
                if (node) {
                    type = node.type;
                    ifNode = pop(ifList);
                }
            }
            else if (type === EACH) {
                const node = pop(eachStack);
                if (node) {
                    type = node.type;
                    eachNode = pop(eachList);
                }
            }
            popStack(type);
            if (ifNode) {
                checkCondition(ifNode);
            }
            else if (eachNode) {
                checkCondition(eachNode);
            }
        }
        else {
            // 开始下一个 block 或表达式
            each$2(blockParsers, function (parse) {
                const node = parse(code);
                if (node) {
                    addChild(node);
                    return FALSE$1;
                }
            });
        }
    }, closeBlock = function () {
        // 确定开始和结束定界符能否配对成功，即 {{ 对 }}，{{{ 对 }}}
        // 这里不能动 openBlockIndex 和 closeBlockIndex，因为等下要用他俩 slice
        index = closeBlockIndex + rightSafeDelimiter.length;
        // 这里要用 <=，因为很可能到头了
        if (index <= length) {
            if (index < length && charAt(content, index) === rightUnsafeFlag) {
                if (blockMode === BLOCK_MODE_UNSAFE) {
                    nextIndex = index + 1;
                }
            }
            else {
                if (blockMode === BLOCK_MODE_SAFE) {
                    nextIndex = index;
                }
            }
            pop(blockStack);
            // 结束定界符左侧的位置
            addIndex(closeBlockIndex);
            // 此时 nextIndex 位于结束定界符的右侧
        }
        else {
            // 到头了
            return TRUE$1;
        }
    }, addIndex = function (index) {
        if (!blockStack.length) {
            push(indexList, index);
        }
    };
    // 因为存在 mustache 注释内包含插值的情况
    // 这里把流程设计为先标记切片的位置，标记过程中丢弃无效的 block
    // 最后处理有效的 block
    while (TRUE$1) {
        // 当前内容位置
        addIndex(nextIndex);
        // 寻找下一个开始定界符和结束定界符
        openBlockIndex = indexOf(content, leftSafeDelimiter, nextIndex);
        closeBlockIndex = indexOf(content, rightSafeDelimiter, nextIndex);
        // 如果是连续的结束定界符，比如 {{！{{xx}} }}
        // 需要调用 closeBlock
        if (closeBlockIndex >= nextIndex
            && (openBlockIndex < 0 || closeBlockIndex < openBlockIndex)) {
            if (closeBlock()) {
                break;
            }
        }
        // 解析下一个 block
        else if (openBlockIndex >= nextIndex) {
            // 当前为安全插值模式
            blockMode = BLOCK_MODE_SAFE;
            // 开始定界符左侧的位置
            addIndex(openBlockIndex);
            // 跳过开始定界符
            openBlockIndex += leftSafeDelimiter.length;
            // 开始定界符后面总得有内容吧
            if (openBlockIndex < length) {
                // 判断是否为危险插值模式
                if (charAt(content, openBlockIndex) === leftUnsafeFlag) {
                    blockMode = BLOCK_MODE_UNSAFE;
                    openBlockIndex++;
                }
                // 开始定界符右侧的位置
                addIndex(openBlockIndex);
                // block 模式
                addIndex(blockMode);
                // 打开一个 block 就入栈一个
                push(blockStack, TRUE$1);
                if (openBlockIndex < length) {
                    // 结束定界符左侧的位置
                    closeBlockIndex = indexOf(content, rightSafeDelimiter, openBlockIndex);
                    if (closeBlockIndex >= openBlockIndex) {
                        nextIndex = indexOf(content, leftSafeDelimiter, openBlockIndex);
                        // 判断结束定界符是否能匹配开始定界符
                        // 因为支持 mustache 注释，而注释又能嵌套，如 {{！  {{xx}} {{! {{xx}} }}  }}
                        // 当 {{ 和 }} 中间还有 {{ 时，则表示无法匹配，需要靠下一次循环再次解析
                        if (nextIndex < 0 || closeBlockIndex < nextIndex) {
                            if (closeBlock()) {
                                break;
                            }
                        }
                    }
                }
            }
        }
        else {
            break;
        }
    }
    // 开始处理有效 block 之前，重置 blockMode
    blockMode = BLOCK_MODE_NONE;
    for (let i = 0, length = indexList.length; i < length; i += 5) {
        // 每个单元有 5 个 index
        // [当前内容位置，下一个开始定界符的左侧, 下一个开始定界符的右侧, block 模式, 下一个结束定界符的左侧]
        index = indexList[i];
        // 开始定界符左侧的位置
        openBlockIndex = indexList[i + 1];
        // 如果 openBlockIndex 存在，则后续 3 个 index 都存在
        if (isDef(openBlockIndex)) {
            parseHtml(slice(content, index, openBlockIndex));
            // 开始定界符右侧的位置
            openBlockIndex = indexList[i + 2];
            blockMode = indexList[i + 3];
            // 结束定界符左侧的位置
            closeBlockIndex = indexList[i + 4];
            code = trim(slice(content, openBlockIndex, closeBlockIndex));
            // 不用处理 {{ }} 和 {{{ }}} 这种空 block
            if (code) {
                parseBlock(code);
            }
        }
        else {
            blockMode = BLOCK_MODE_NONE;
            parseHtml(slice(content, index));
        }
    }
    if (nodeStack.length) {
        /**
         * 处理可能存在的自闭合元素，如下
         *
         * <input>
         */
        popSelfClosingElementIfNeeded();
    }
    if (nodeList.length > 0) {
        removeCommentNode(nodeList);
    }
    return nodeList;
}

// 下面这些值需要根据外部配置才能确定
let isUglify$1 = UNDEFINED$1, isMinify = UNDEFINED$1, 
// 保留字，避免 IE 出现 { class: 'xx' } 报错
reservedWords = toMap$1('abstract,goto,native,static,enum,implements,package,super,byte,export,import,private,protected,public,synchronized,char,extends,int,throws,class,final,interface,transient,yield,let,const,float,double,boolean,long,short,volatile,default'), varId = 0, varMap = {}, varCache = {}, VAR_PREFIX = EMPTY_STRING, TEMP = EMPTY_STRING, UNDEFINED = EMPTY_STRING, NULL = EMPTY_STRING, TRUE = EMPTY_STRING, FALSE = EMPTY_STRING, SPACE = EMPTY_STRING, INDENT = EMPTY_STRING, BREAK_LINE = EMPTY_STRING;
class Primitive {
    constructor(value) {
        this.value = value;
    }
    toString() {
        const { value } = this;
        return value === TRUE$1
            ? TRUE
            : value === FALSE$1
                ? FALSE
                : value === NULL$1
                    ? NULL
                    : value === UNDEFINED$1
                        ? UNDEFINED
                        : string$1(value)
                            ? toStringLiteral(value)
                            : `${value}`;
    }
}
class Tuple {
    constructor(left, right, separator, breakLine, offset, items) {
        this.left = left;
        this.right = right;
        this.separator = separator;
        this.breakLine = breakLine;
        this.offset = offset;
        this.items = items || [];
    }
    unshift(value) {
        unshift(this.items, value);
    }
    push(value) {
        push(this.items, value);
    }
    toString(tabSize) {
        let { left, right, separator, breakLine, offset, items } = this, { length } = items;
        if (!length) {
            return `${left}${right}`;
        }
        const currentTabSize = tabSize || 0, nextTabSize = currentTabSize + offset, currentIndentSize = repeat(INDENT, currentTabSize), nextIndentSize = repeat(INDENT, nextTabSize), result = items.map(function (item) {
            return item.toString(nextTabSize);
        });
        if (left && breakLine) {
            left += BREAK_LINE + nextIndentSize;
        }
        if (right && breakLine) {
            right = BREAK_LINE + currentIndentSize + right;
        }
        return `${left}${join$1(result, breakLine
            ? separator + BREAK_LINE + nextIndentSize
            : separator + SPACE)}${right}`;
    }
}
class Statement {
    constructor(items) {
        this.items = items || [];
    }
    add(value) {
        push(this.items, value);
    }
    toString(tabSize) {
        const { items } = this;
        if (items.length === 1) {
            return items[0].toString(tabSize);
        }
        return new Tuple('(', ')', ',', TRUE$1, 1, items).toString(tabSize);
    }
}
class Map {
    constructor(fields) {
        this.fields = {};
        if (fields) {
            const instance = this;
            each(fields, function (value, key) {
                instance.set(key, value);
            });
        }
    }
    set(name, value) {
        if (value instanceof Primitive
            && value.value === UNDEFINED$1) {
            return;
        }
        this.fields[name] = value;
    }
    isNotEmpty() {
        return keys(this.fields).length > 0;
    }
    toString(tabSize) {
        const { fields } = this, 
        // 按字典排序显得比较有规律
        items = keys(fields).sort().map(function (key) {
            return {
                toString(tabSize) {
                    return toObjectPair(key, fields[key].toString(tabSize));
                }
            };
        });
        return toTuple('{', '}', ',', TRUE$1, 1, items).toString(tabSize);
    }
}
class Call {
    constructor(name, args) {
        this.name = name;
        this.args = args;
    }
    toString(tabSize) {
        const { name, args } = this, newArgs = args ? trimArgs(args) : [];
        return newArgs.length
            ? `${name.toString(tabSize)}${toTuple('(', ')', ',', TRUE$1, 1, newArgs).toString(tabSize)}`
            : `${name.toString(tabSize)}()`;
    }
}
class Precedence {
    constructor(value) {
        this.value = value;
    }
    toString(tabSize) {
        return `(${this.value.toString(tabSize)})`;
    }
}
class StringBuffer {
    append(text) {
        const { buffer } = this;
        if (buffer) {
            this.buffer = toBinary(buffer instanceof Ternary
                ? toPrecedence(buffer)
                : buffer, '+', text instanceof Ternary
                ? toPrecedence(text)
                : text);
        }
        else {
            this.buffer = text;
        }
    }
    toString(tabSize) {
        return this.buffer.toString(tabSize);
    }
}
class Unary {
    constructor(operator, value) {
        this.operator = operator;
        this.value = value;
    }
    toString(tabSize) {
        return `${this.operator}${this.value.toString(tabSize)}`;
    }
}
class Binary {
    constructor(left, operator, right) {
        this.left = left;
        this.operator = operator;
        this.right = right;
    }
    toString(tabSize) {
        return `${this.left.toString(tabSize)}${SPACE}${this.operator}${SPACE}${this.right.toString(tabSize)}`;
    }
}
class Ternary {
    constructor(test, yes, no) {
        this.test = test;
        this.yes = yes;
        this.no = no;
    }
    toString(tabSize) {
        return `${this.test.toString(tabSize)}${SPACE}?${SPACE}${this.yes.toString(tabSize)}${SPACE}:${SPACE}${this.no.toString(tabSize)}`;
    }
}
class AnonymousFunction {
    constructor(args, body, returnValue) {
        this.args = args;
        this.body = body;
        this.returnValue = returnValue;
    }
    toString(tabSize) {
        const { args, body, returnValue } = this, currentTabSize = tabSize || 0, nextTabSize = currentTabSize + 1, currentIndentSize = repeat(INDENT, currentTabSize), nextIndentSize = repeat(INDENT, nextTabSize), tuple = args ? toTuple(EMPTY_STRING, EMPTY_STRING, ',', FALSE$1, 1, args).toString(currentTabSize) : EMPTY_STRING, code = [];
        if (body) {
            push(code, body.toString(nextTabSize) + (returnValue ? ';' : EMPTY_STRING));
        }
        if (returnValue) {
            push(code, `return ${returnValue.toString(nextTabSize)}`);
        }
        return `${RAW_FUNCTION}${SPACE}(${tuple})${SPACE}{${BREAK_LINE}${nextIndentSize}${join$1(code, BREAK_LINE + nextIndentSize)}${BREAK_LINE}${currentIndentSize}}`;
    }
}
class Member {
    constructor(base, props) {
        this.base = base;
        this.props = props;
    }
    toString(tabSize) {
        const { base, props } = this;
        let result = base.toString(tabSize);
        each$2(props, function (prop) {
            if (prop instanceof Primitive) {
                if (numeric(prop.value)) {
                    result += `[${SPACE}${prop.value}${SPACE}]`;
                }
                else {
                    result += '.' + prop.value;
                }
            }
            else {
                result += `[${SPACE}${prop.toString(tabSize)}${SPACE}]`;
            }
        });
        return result;
    }
}
class Assign {
    constructor(name, value, isDeclaration) {
        this.name = name;
        this.value = value;
        this.isDeclaration = isDeclaration;
    }
    toString(tabSize) {
        const { name, value, isDeclaration } = this;
        const statement = `${name.toString(tabSize)}${SPACE}=${SPACE}${value.toString(tabSize)}`;
        return isDeclaration
            ? `var ${statement}`
            : statement;
    }
}
class Push {
    constructor(array, item) {
        this.array = array;
        this.item = item;
    }
    toString(tabSize) {
        const { array, item } = this;
        return toCall(toMember(array, [
            toPrimitive('push')
        ]), [
            item
        ]).toString(tabSize);
    }
}
class Typeof {
    constructor(value, type) {
        this.value = value;
        this.type = type;
    }
    toString(tabSize) {
        const { value, type } = this;
        return `typeof ${value.toString(tabSize)}${SPACE}===${SPACE}${toStringLiteral(type)}`;
    }
}
function toPrimitive(value) {
    return new Primitive(value);
}
function toTuple(left, right, separator, breakLine, offset, items) {
    return new Tuple(left, right, separator, breakLine, offset, items);
}
function toStatement(items) {
    return new Statement(items);
}
function toList(items, join) {
    let result = toTuple('[', ']', ',', TRUE$1, 1, items);
    if (string$1(join)) {
        return {
            toString(tabSize) {
                return `${result.toString(tabSize)}.join(${toPrimitive(join).toString()})`;
            }
        };
    }
    return result;
}
function toMap(fields) {
    return new Map(fields);
}
function toCall(name, args) {
    return new Call(name, args);
}
function toPrecedence(value) {
    return new Precedence(value);
}
function toStringBuffer() {
    return new StringBuffer();
}
function toUnary(operator, value) {
    return new Unary(operator, value);
}
function toBinary(left, operator, right) {
    return new Binary(left, operator, right);
}
function toTernary(test, yes, no) {
    return new Ternary(test, yes, no);
}
function toAnonymousFunction(args, body, returnValue) {
    return new AnonymousFunction(args, body, returnValue);
}
function toMember(base, props) {
    return new Member(base, props);
}
function toAssign(name, value, isDeclaration) {
    return new Assign(name, value, isDeclaration);
}
function toPush(array, item) {
    return new Push(array, item);
}
function toTypeof(value, type) {
    return new Typeof(value, type);
}
function getTempName() {
    return TEMP;
}
/**
 * 目的是 保证调用参数顺序稳定，减少运行时判断
 *
 * [a, undefined, undefined] => [a]
 * [a, undefined, b, undefined] => [a, undefined, b]
 */
function trimArgs(list) {
    let args = [], removable = TRUE$1;
    each$2(list, function (arg) {
        const isDef = arg instanceof Primitive
            ? arg.value !== UNDEFINED$1
            : TRUE$1;
        if (isDef) {
            removable = FALSE$1;
            unshift(args, arg);
        }
        else if (!removable) {
            unshift(args, toPrimitive(UNDEFINED$1));
        }
    }, TRUE$1);
    return args;
}
function toStringLiteral(value) {
    value = value
        .replace(/\\?'/g, "\\'")
        .replace(/\\?"/g, '\\"')
        // 换行符会导致字符串语法错误
        .replace(/\n\s*/g, '\\n');
    return `"${value}"`;
}
function toObjectPair(key, value) {
    if (!/^[\w$]+$/.test(key) || reservedWords[key]) {
        key = toStringLiteral(key);
    }
    return `${key}:${SPACE}${value}`;
}
function toVarPair(key, value) {
    return value !== UNDEFINED$1
        ? `${key}${SPACE}=${SPACE}${value}`
        : key;
}
function init$1() {
    if (isUglify$1 !== PUBLIC_CONFIG.uglifyCompiled) {
        isUglify$1 = PUBLIC_CONFIG.uglifyCompiled;
        VAR_PREFIX = isUglify$1 ? '$' : 'var';
    }
    if (isMinify !== PUBLIC_CONFIG.minifyCompiled) {
        isMinify = PUBLIC_CONFIG.minifyCompiled;
        if (isMinify) {
            SPACE = INDENT = BREAK_LINE = EMPTY_STRING;
        }
        else {
            SPACE = ' ';
            INDENT = '  ';
            BREAK_LINE = '\n';
        }
    }
    varId = 0;
    varMap = {};
    varCache = {};
    TEMP = addVar();
    UNDEFINED = addVar('void 0');
    NULL = addVar('null');
    TRUE = addVar('!0');
    FALSE = addVar('!1');
}
function addVar(value, cache) {
    const hash = value ? value.toString() : UNDEFINED$1;
    if (cache && hash && varCache[hash]) {
        return varCache[hash];
    }
    const key = VAR_PREFIX + (varId++);
    varMap[key] = value;
    if (cache && hash) {
        varCache[hash] = key;
    }
    return key;
}
function parse(keypath) {
    return keypath.split(RAW_DOT)
        .filter(function (item) {
        return item.length > 0;
    })
        .map(toPrimitive);
}
function generate$2(args, code) {
    const varList = [];
    each(varMap, function (value, key) {
        push(varList, {
            toString(tabSize) {
                return toVarPair(key, value
                    ? value.toString(tabSize)
                    : UNDEFINED$1);
            }
        });
    });
    const result = toAnonymousFunction(UNDEFINED$1, toTuple('var ', EMPTY_STRING, ',', FALSE$1, 0, varList), toAnonymousFunction(args, code));
    return `(${result.toString()})()`;
}

/**
 * 是否需要给 node 加括号，以提升运算优先级
 * 这里不去比较运算符的优先级，而是根据节点类型判断
 * 因为在 compile 环节会根据运算符优先级或括号，创建不同的节点，节点本身已经是优先级的体现了
 *
 * @param node
 */
function needOperatorPrecedence(node) {
    return node.type === TERNARY || node.type === BINARY;
}
function generate$1(node, transformIdentifier, generateIdentifier, generateValue, generateCall, holder, parentNode) {
    let value, hasHolder = FALSE$1, generateNode = function (node, parentNode) {
        return generate$1(node, transformIdentifier, generateIdentifier, generateValue, generateCall, FALSE$1, // 如果是内部临时值，不需要 holder
        parentNode);
    }, generateNodes = function (nodes, parentNode) {
        return nodes.map(function (node) {
            return generateNode(node, parentNode);
        });
    };
    switch (node.type) {
        case LITERAL:
            const literalNode = node;
            value = toPrimitive(literalNode.value);
            break;
        case UNARY:
            const unaryNode = node;
            value = toUnary(unaryNode.operator, generateNode(unaryNode.node));
            break;
        case BINARY:
            let binaryNode = node, left = generateNode(binaryNode.left), right = generateNode(binaryNode.right);
            value = toBinary(needOperatorPrecedence(binaryNode.left)
                ? toPrecedence(left)
                : left, binaryNode.operator, needOperatorPrecedence(binaryNode.right)
                ? toPrecedence(right)
                : right);
            break;
        case TERNARY:
            const ternaryNode = node, test = generateNode(ternaryNode.test), yes = generateNode(ternaryNode.yes), no = generateNode(ternaryNode.no);
            value = toTernary(test, yes, no);
            break;
        case ARRAY:
            const arrayNode = node;
            value = toList(generateNodes(arrayNode.nodes, parentNode));
            break;
        case OBJECT:
            const objectNode = node, newObject = toMap();
            each$2(objectNode.keys, function (key, index) {
                const value = objectNode.values[index];
                newObject.set(key, generateNode(value));
            });
            value = newObject;
            break;
        case IDENTIFIER:
            hasHolder = TRUE$1;
            const identifierNode = node;
            value = transformIdentifier(identifierNode)
                || generateIdentifier(identifierNode, identifierNode.name ? parse(identifierNode.name) : [], identifierNode.name, holder, parentNode);
            break;
        case MEMBER:
            hasHolder = TRUE$1;
            const memberNode = node;
            if (memberNode.isStatic) {
                // 原样输出
                value = memberNode.raw;
            }
            else if (memberNode.lead.type === IDENTIFIER) {
                // 只能是 a[b] 的形式，因为 a.b 已经在解析时转换成 Identifier 了
                const leadNode = memberNode.lead, leadValue = transformIdentifier(leadNode), memberNodes = generateNodes(memberNode.nodes || []);
                if (leadValue) {
                    value = generateValue(leadValue, memberNodes, holder);
                }
                else {
                    if (leadNode.name) {
                        // a.b.c[d] 这里要把 a.b.c 拆开
                        each$2(parse(leadNode.name), function (node) {
                            memberNodes.unshift(node);
                        }, TRUE$1);
                    }
                    value = generateIdentifier(memberNode, memberNodes, UNDEFINED$1, holder, parentNode);
                }
            }
            else if (memberNode.nodes) {
                // "xx"[length]
                // format()[a][b]
                value = generateValue(generateNode(memberNode.lead), generateNodes(memberNode.nodes || []), holder);
            }
            else {
                // "xx".length
                // format().a.b
                value = generateValue(generateNode(memberNode.lead), parse(memberNode.keypath), holder);
            }
            break;
        default:
            hasHolder = TRUE$1;
            const callNode = node;
            value = generateCall(callNode, generateNode(callNode.name, callNode), callNode.args.length
                ? generateNodes(callNode.args)
                : UNDEFINED$1, holder);
            break;
    }
    if (!holder || hasHolder) {
        return value;
    }
    return toMap({
        value,
    });
}

// 是否正在收集虚拟节点
const vnodeStack = [TRUE$1], 
// 是否正在处理 attribute
attributeStack = [], 
// 是否正在处理特殊 each，包括 遍历 range 和 遍历数组字面量和对象字面量
eachStack = [], 
// 是否正在处理 slot
slotStack = [], 
// 是否正在收集动态 child
dynamicChildrenStack = [TRUE$1], 
// 收集属性值
attributeValueStack = [], 
// vnode 类型
vnodeTypeStack = [], magicVariables = [MAGIC_VAR_KEYPATH, MAGIC_VAR_LENGTH, MAGIC_VAR_EVENT, MAGIC_VAR_DATA], nodeGenerator = {}, FIELD_NATIVE_ATTRIBUTES = 'nativeAttrs', FIELD_NATIVE_STYLES = 'nativeStyles', FIELD_PROPERTIES = 'props', FIELD_DIRECTIVES = 'directives', FIELD_EVENTS = 'events', FIELD_MODEL = 'model', FIELD_LAZY = 'lazy', FIELD_TRANSITION = 'transition', FIELD_CHILDREN = 'children', FIELD_SLOTS = 'slots', FIELD_OPERATOR = 'operator', PRIMITIVE_UNDEFINED = toPrimitive(UNDEFINED$1), PRIMITIVE_TRUE = toPrimitive(TRUE$1);
// 下面这些值需要根据外部配置才能确定
let isUglify = UNDEFINED$1, currentTextVNode = UNDEFINED$1, RENDER_STYLE_STRING = EMPTY_STRING, RENDER_STYLE_EXPR = EMPTY_STRING, RENDER_TRANSITION = EMPTY_STRING, RENDER_MODEL = EMPTY_STRING, RENDER_EVENT_METHOD = EMPTY_STRING, RENDER_EVENT_NAME = EMPTY_STRING, RENDER_DIRECTIVE = EMPTY_STRING, RENDER_SPREAD = EMPTY_STRING, RENDER_EACH = EMPTY_STRING, RENDER_RANGE = EMPTY_STRING, RENDER_SLOT = EMPTY_STRING, APPEND_VNODE_PROPERTY = EMPTY_STRING, FORMAT_NATIVE_ATTRIBUTE_NUMBER_VALUE = EMPTY_STRING, FORMAT_NATIVE_ATTRIBUTE_BOOLEAN_VALUE = EMPTY_STRING, LOOKUP_KEYPATH = EMPTY_STRING, LOOKUP_PROP = EMPTY_STRING, READ_KEYPATH = EMPTY_STRING, SET_VALUE_HOLDER = EMPTY_STRING, TO_STRING = EMPTY_STRING, OPERATOR_TEXT_VNODE = EMPTY_STRING, OPERATOR_COMMENT_VNODE = EMPTY_STRING, OPERATOR_ELEMENT_VNODE = EMPTY_STRING, OPERATOR_COMPONENT_VNODE = EMPTY_STRING, OPERATOR_FRAGMENT_VNODE = EMPTY_STRING, OPERATOR_PORTAL_VNODE = EMPTY_STRING, OPERATOR_SLOT_VNODE = EMPTY_STRING, ARG_INSTANCE = EMPTY_STRING, ARG_LOGGER = EMPTY_STRING, ARG_FILTERS = EMPTY_STRING, ARG_GLOBAL_FILTERS = EMPTY_STRING, ARG_DIRECTIVES = EMPTY_STRING, ARG_GLOBAL_DIRECTIVES = EMPTY_STRING, ARG_TRANSITIONS = EMPTY_STRING, ARG_GLOBAL_TRANSITIONS = EMPTY_STRING, ARG_STACK = EMPTY_STRING, ARG_PARENT = EMPTY_STRING, ARG_VNODE = EMPTY_STRING, ARG_CHILDREN = EMPTY_STRING, ARG_SCOPE = EMPTY_STRING, ARG_KEYPATH = EMPTY_STRING, ARG_LENGTH = EMPTY_STRING, ARG_EVENT = EMPTY_STRING, ARG_DATA = EMPTY_STRING;
function init() {
    if (isUglify === PUBLIC_CONFIG.uglifyCompiled) {
        return;
    }
    if (PUBLIC_CONFIG.uglifyCompiled) {
        RENDER_STYLE_STRING = '_a';
        RENDER_STYLE_EXPR = '_b';
        RENDER_TRANSITION = '_c';
        RENDER_MODEL = '_d';
        RENDER_EVENT_METHOD = '_e';
        RENDER_EVENT_NAME = '_f';
        RENDER_DIRECTIVE = '_g';
        RENDER_SPREAD = '_h';
        RENDER_EACH = '_i';
        RENDER_RANGE = '_j';
        RENDER_SLOT = '_k';
        APPEND_VNODE_PROPERTY = '_l';
        FORMAT_NATIVE_ATTRIBUTE_NUMBER_VALUE = '_m';
        FORMAT_NATIVE_ATTRIBUTE_BOOLEAN_VALUE = '_n';
        LOOKUP_KEYPATH = '_o';
        LOOKUP_PROP = '_p';
        READ_KEYPATH = '_q';
        SET_VALUE_HOLDER = '_r';
        TO_STRING = '_s';
        OPERATOR_TEXT_VNODE = '_t';
        OPERATOR_COMMENT_VNODE = '_u';
        OPERATOR_ELEMENT_VNODE = '_v';
        OPERATOR_COMPONENT_VNODE = '_w';
        OPERATOR_FRAGMENT_VNODE = '_x';
        OPERATOR_PORTAL_VNODE = '_y';
        OPERATOR_SLOT_VNODE = '_z';
        ARG_INSTANCE = '_A';
        ARG_LOGGER = '_B';
        ARG_FILTERS = '_C';
        ARG_GLOBAL_FILTERS = '_D';
        ARG_DIRECTIVES = '_E';
        ARG_GLOBAL_DIRECTIVES = '_F';
        ARG_TRANSITIONS = '_G';
        ARG_GLOBAL_TRANSITIONS = '_H';
        ARG_STACK = '_I';
        ARG_PARENT = '_J';
        ARG_VNODE = '_K';
        ARG_CHILDREN = '_L';
        ARG_SCOPE = '_M';
        ARG_KEYPATH = '_N';
        ARG_LENGTH = '_O';
        ARG_EVENT = '_P';
        ARG_DATA = '_Q';
    }
    else {
        RENDER_STYLE_STRING = 'renderStyleStyle';
        RENDER_STYLE_EXPR = 'renderStyleExpr';
        RENDER_TRANSITION = 'renderTransition';
        RENDER_MODEL = 'renderModel';
        RENDER_EVENT_METHOD = 'renderEventMethod';
        RENDER_EVENT_NAME = 'renderEventName';
        RENDER_DIRECTIVE = 'renderDirective';
        RENDER_SPREAD = 'renderSpread';
        RENDER_EACH = 'renderEach';
        RENDER_RANGE = 'renderRange';
        RENDER_SLOT = 'renderSlot';
        APPEND_VNODE_PROPERTY = 'appendVNodeProperty';
        FORMAT_NATIVE_ATTRIBUTE_NUMBER_VALUE = 'formatNativeAttributeNumberValue';
        FORMAT_NATIVE_ATTRIBUTE_BOOLEAN_VALUE = 'formatNativeAttributeBooleanValue';
        LOOKUP_KEYPATH = 'lookupKeypath';
        LOOKUP_PROP = 'lookupProp';
        READ_KEYPATH = 'readKeypath';
        SET_VALUE_HOLDER = 'setValueHolder';
        TO_STRING = 'toString';
        OPERATOR_TEXT_VNODE = 'textVNodeOperator';
        OPERATOR_COMMENT_VNODE = 'commentVNodeOperator';
        OPERATOR_ELEMENT_VNODE = 'elementVNodeOperator';
        OPERATOR_COMPONENT_VNODE = 'componentVNodeOperator';
        OPERATOR_FRAGMENT_VNODE = 'fragmentVNodeOperator';
        OPERATOR_PORTAL_VNODE = 'portalVNodeOperator';
        OPERATOR_SLOT_VNODE = 'slotVNodeOperator';
        ARG_INSTANCE = 'instance';
        ARG_LOGGER = 'logger';
        ARG_FILTERS = 'filters';
        ARG_GLOBAL_FILTERS = 'globalFilters';
        ARG_DIRECTIVES = 'directives';
        ARG_GLOBAL_DIRECTIVES = 'globalDirectives';
        ARG_TRANSITIONS = 'transition';
        ARG_GLOBAL_TRANSITIONS = 'globalTransitions';
        ARG_STACK = 'stack';
        ARG_PARENT = 'parent';
        ARG_VNODE = 'vnode';
        ARG_CHILDREN = 'children';
        ARG_SCOPE = MAGIC_VAR_SCOPE;
        ARG_KEYPATH = MAGIC_VAR_KEYPATH;
        ARG_LENGTH = MAGIC_VAR_LENGTH;
        ARG_EVENT = MAGIC_VAR_EVENT;
        ARG_DATA = MAGIC_VAR_DATA;
    }
    isUglify = PUBLIC_CONFIG.uglifyCompiled;
}
class CommentVNode {
    constructor(text) {
        this.text = text;
    }
    toString(tabSize) {
        return toMap({
            type: toPrimitive(VNODE_TYPE_COMMENT),
            isPure: PRIMITIVE_TRUE,
            operator: OPERATOR_COMMENT_VNODE,
            text: this.text,
        }).toString(tabSize);
    }
}
class TextVNode {
    constructor(text) {
        this.buffer = toStringBuffer();
        this.append(text);
    }
    append(text) {
        this.buffer.append(text);
    }
    toString(tabSize) {
        return toMap({
            type: toPrimitive(VNODE_TYPE_TEXT),
            isPure: PRIMITIVE_TRUE,
            operator: OPERATOR_TEXT_VNODE,
            text: this.buffer,
        }).toString(tabSize);
    }
}
function replaceMagicVariable(name) {
    if (has$2(magicVariables, name)) {
        switch (name) {
            case MAGIC_VAR_KEYPATH:
                return ARG_KEYPATH;
            case MAGIC_VAR_LENGTH:
                return ARG_LENGTH;
            case MAGIC_VAR_EVENT:
                return ARG_EVENT;
            case MAGIC_VAR_DATA:
                return ARG_DATA;
            default:
                return name;
        }
    }
}
function transformExpressionIdentifier(node) {
    const { name, root, lookup, offset, literals } = node;
    if (literals) {
        const variable = replaceMagicVariable(literals[0]);
        if (isDef(variable)) {
            const result = copy(literals);
            result[0] = variable;
            return join$1(result, RAW_DOT);
        }
    }
    else {
        const variable = replaceMagicVariable(name);
        if (isDef(variable)) {
            return variable;
        }
    }
    // this 仅在 each 中有意义
    // 这里把 this 转成 $scope，方便直接读取
    // 避免不必要的查找，提升性能
    if (last(eachStack)
        && root === FALSE$1
        && lookup === FALSE$1
        && offset === 0) {
        if (name === EMPTY_STRING) {
            return ARG_SCOPE;
        }
        return toMember(ARG_SCOPE, parse(name));
    }
}
function generateHolderIfNeeded(node, holder) {
    return holder
        ? node
        : toMember(node, [
            toPrimitive('value')
        ]);
}
function generateExpressionIndex(root, offset) {
    if (root) {
        return toPrimitive(0);
    }
    return toBinary(toMember(ARG_STACK, [
        toPrimitive(RAW_LENGTH)
    ]), '-', toPrimitive(1 + (offset ? offset : 0)));
}
function generateExpressionIdentifier(node, nodes, keypath, holder, parentNode) {
    const { root, lookup, offset } = node, { length } = nodes, index = generateExpressionIndex(root, offset);
    let filter = PRIMITIVE_UNDEFINED;
    // 函数调用
    if (parentNode
        && parentNode.type === CALL
        // 调用过滤器肯定无需指定路径
        && lookup
        // 过滤器名称是简单的标识符，可支持多级属性，如 lodash.toUpper
        && keypath
        && length > 0) {
        if (length > 1) {
            filter = toMember(ARG_GLOBAL_FILTERS, nodes);
        }
        else {
            filter = generateSelfAndGlobalReader(ARG_FILTERS, ARG_GLOBAL_FILTERS, keypath);
        }
    }
    let result = toCall(LOOKUP_KEYPATH, [
        ARG_STACK,
        index,
        string$1(keypath)
            ? toPrimitive(keypath)
            : toList(nodes, RAW_DOT),
        toList(nodes),
        lookup
            ? PRIMITIVE_TRUE
            : PRIMITIVE_UNDEFINED,
        filter
    ]);
    // 如果是读取一级属性的场景，比如 this.x，这里可以优化成 scope.x
    // 如果是读取多级属性的场景，比如 this.x.y，这里不做优化，因为 x 可能为空，导致整个表达式报错
    // 处理一级属性
    if (keypath && length === 1) {
        // this.name
        if (!root && !offset && !lookup) {
            // setValueHolder(
            //   value,
            //   stack[index].getKeypath(name)
            // )
            result = toCall(SET_VALUE_HOLDER, [
                toMember(ARG_SCOPE, nodes),
                toCall(toMember(toMember(ARG_STACK, [
                    index
                ]), [
                    toPrimitive('getKeypath')
                ]), [
                    toPrimitive(keypath),
                ])
            ]);
        }
        // 未指定路径，如 name
        else if (!root && !offset) {
            result = toCall(LOOKUP_PROP, [
                ARG_STACK,
                index,
                toPrimitive(keypath),
                filter
            ]);
        }
        // 指定了路径，如 ~/name 或 ../name
        else {
            const statement = toStatement(), varName = getTempName();
            // temp = stack[index]
            statement.add(toAssign(varName, toMember(ARG_STACK, [
                index
            ])));
            // setValueHolder(
            //   temp.getScope()[name],
            //   temp.getKeypath(name)
            // )
            statement.add(toCall(SET_VALUE_HOLDER, [
                toMember(toCall(toMember(varName, [
                    toPrimitive('getScope')
                ])), [
                    toPrimitive(keypath),
                ]),
                toCall(toMember(varName, [
                    toPrimitive('getKeypath')
                ]), [
                    toPrimitive(keypath),
                ]),
            ]));
            result = statement;
        }
    }
    // 处理属性为空串，如 this、../this、~/this 之类的
    else if (!keypath && !length) {
        const statement = toStatement(), varName = getTempName();
        // temp = stack[index]
        statement.add(toAssign(varName, toMember(ARG_STACK, [
            index
        ])));
        // setValueHolder(temp.getScope(), temp.keypath)
        statement.add(toCall(SET_VALUE_HOLDER, [
            toCall(toMember(varName, [
                toPrimitive('getScope')
            ])),
            toMember(varName, [
                toPrimitive('keypath')
            ])
        ]));
        result = statement;
    }
    return generateHolderIfNeeded(result, holder);
}
function generateExpressionValue(value, keys, holder) {
    let result;
    switch (keys.length) {
        case 0:
            result = toCall(SET_VALUE_HOLDER, [
                value,
            ]);
            break;
        case 1:
            result = toCall(SET_VALUE_HOLDER, [
                toMember(value, keys)
            ]);
            break;
        default:
            result = toCall(READ_KEYPATH, [
                value,
                toList(keys)
            ]);
            break;
    }
    return generateHolderIfNeeded(result, holder);
}
function generateExpressionCall(node, fn, args, holder) {
    const statement = toStatement(), varName = getTempName();
    // temp = fn
    statement.add(toAssign(varName, fn));
    // temp()
    statement.add(toTernary(toTypeof(varName, 'function'), toCall(varName, args), toCall(toMember(ARG_LOGGER, [
        toPrimitive('fatal')
    ]), [
        toPrimitive(`[${node.raw}] is not a function.`)
    ])));
    return generateHolderIfNeeded(toCall(SET_VALUE_HOLDER, [
        statement
    ]), holder);
}
function generateExpression(expr, holder) {
    const result = generate$1(expr, transformExpressionIdentifier, generateExpressionIdentifier, generateExpressionValue, generateExpressionCall, holder);
    return expr.isStatic
        ? addVar(result, TRUE$1)
        : result;
}
function createAttributeValue(nodes) {
    const attributeValue = toStringBuffer();
    push(attributeValueStack, attributeValue);
    each$2(nodes, function (node) {
        nodeGenerator[node.type](node);
    });
    pop(attributeValueStack);
    return attributeValue;
}
function generateAttributeValue(attr) {
    if (isDef(attr.value)) {
        return toPrimitive(attr.value);
    }
    // 只有一个表达式时，保持原始类型
    if (attr.expr) {
        return generateExpression(attr.expr);
    }
    // 多个值拼接时，要求是字符串
    if (attr.children) {
        // 常见的应用场景是序列化 HTML 元素属性值，处理值时要求字符串，在处理属性名这个级别，不要求字符串
        // compiler 会把原始字符串编译成 value
        // compiler 会把单个插值编译成 expr
        // 因此走到这里，一定是多个插值或是单个特殊插值（比如 If)
        return createAttributeValue(attr.children);
    }
    return PRIMITIVE_UNDEFINED;
}
function mapNodes(nodes) {
    currentTextVNode = UNDEFINED$1;
    const result = [];
    each$2(nodes, function (node) {
        const item = nodeGenerator[node.type](node);
        if (item instanceof Primitive
            && item.value === UNDEFINED$1) {
            return;
        }
        push(result, item);
    });
    currentTextVNode = UNDEFINED$1;
    return result;
}
function generateNodesToTuple(nodes) {
    return toTuple(EMPTY_STRING, EMPTY_STRING, ';', TRUE$1, 0, mapNodes(nodes));
}
function generateNodesToList(nodes) {
    return toList(mapNodes(nodes));
}
function generateNodesToChildren(nodes, args) {
    const tuple = generateNodesToTuple(nodes);
    // 用 ARG_CHILDREN 收集所有的节点
    tuple.unshift(toAssign(ARG_CHILDREN, toList(), TRUE$1));
    return toAnonymousFunction(args, tuple, toTernary(toMember(ARG_CHILDREN, [
        toPrimitive(RAW_LENGTH)
    ]), ARG_CHILDREN, toPrimitive(UNDEFINED$1)));
}
function appendDynamicChildVNode(vnode) {
    currentTextVNode = vnode instanceof TextVNode
        ? vnode
        : UNDEFINED$1;
    return toPush(ARG_CHILDREN, vnode);
}
function generateSelfAndGlobalReader(self, global, name) {
    return toBinary(toBinary(self, '&&', toMember(self, [
        toPrimitive(name)
    ])), '||', toMember(global, [
        toPrimitive(name)
    ]));
}
function generateVNode(vnode) {
    return last(dynamicChildrenStack)
        ? appendDynamicChildVNode(vnode)
        : vnode;
}
function generateCommentVNode() {
    return generateVNode(new CommentVNode(toPrimitive(EMPTY_STRING)));
}
function generateTextVNode(text) {
    if (currentTextVNode) {
        currentTextVNode.append(text);
        return PRIMITIVE_UNDEFINED;
    }
    return generateVNode(new TextVNode(text));
}
function generateComponentSlots(children) {
    const result = toMap(), slots = {}, addSlot = function (name, nodes) {
        if (!falsy$2(nodes)) {
            name = SLOT_DATA_PREFIX + name;
            push(slots[name] || (slots[name] = []), nodes);
        }
    };
    push(slotStack, TRUE$1);
    each$2(children, function (child) {
        // 找到具名 slot
        if (child.type === ELEMENT) {
            const element = child;
            if (element.slot) {
                addSlot(element.slot, element.tag === TAG_TEMPLATE
                    ? element.children
                    : [element]);
                return;
            }
        }
        // 匿名 slot，名称统一为 children
        // 这个步骤不能放在 compiler，因为除了 element，还会有其他节点，比如文本节点
        addSlot(SLOT_NAME_DEFAULT, [child]);
    });
    each(slots, function (children, name) {
        result.set(name, generateNodesToChildren(children, [
            ARG_PARENT
        ]));
    });
    pop(slotStack);
    if (result.isNotEmpty()) {
        return result;
    }
}
function parseAttrs(attrs, vnodeType) {
    let nativeAttributeList = [], propertyList = [], style = UNDEFINED$1, lazyList = [], transition = UNDEFINED$1, model = UNDEFINED$1, 
    // 最后收集事件指令、自定义指令、动态属性
    eventList = [], customDirectiveList = [], otherList = [];
    for (let i = 0, len = attrs.length; i < len; i++) {
        const attr = attrs[i];
        if (attr.type === ATTRIBUTE) {
            const attributeNode = attr;
            if (vnodeType === VNODE_TYPE_COMPONENT || vnodeType === VNODE_TYPE_SLOT) {
                push(propertyList, attributeNode);
            }
            else {
                push(nativeAttributeList, attributeNode);
            }
        }
        else if (attr.type === STYLE) {
            style = attr;
        }
        else if (attr.type === DIRECTIVE) {
            const directiveNode = attr;
            switch (directiveNode.ns) {
                case DIRECTIVE_LAZY:
                    push(lazyList, directiveNode);
                    break;
                case DIRECTIVE_TRANSITION:
                    transition = directiveNode;
                    break;
                case DIRECTIVE_MODEL:
                    model = directiveNode;
                    break;
                case DIRECTIVE_EVENT:
                    push(eventList, directiveNode);
                    break;
                default:
                    push(customDirectiveList, directiveNode);
            }
        }
        else {
            push(otherList, attr);
        }
    }
    return {
        nativeAttributeList,
        propertyList,
        style,
        lazyList,
        transition,
        model,
        eventList,
        customDirectiveList,
        otherList,
    };
}
function sortAttrs(attrs, vnodeType) {
    const { nativeAttributeList, propertyList, style, lazyList, transition, model, eventList, customDirectiveList, otherList, } = parseAttrs(attrs, vnodeType);
    const result = [];
    push(result, nativeAttributeList);
    push(result, propertyList);
    if (style) {
        push(result, style);
    }
    push(result, lazyList);
    if (transition) {
        push(result, transition);
    }
    if (model) {
        push(result, model);
    }
    push(result, eventList);
    push(result, customDirectiveList);
    push(result, otherList);
    return result;
}
function generateNativeAttributeValue(node) {
    const { name } = node;
    let value = generateAttributeValue(node);
    if (!(value instanceof Primitive)) {
        if (isNumberNativeAttribute(name)) {
            value = toCall(FORMAT_NATIVE_ATTRIBUTE_NUMBER_VALUE, [
                toPrimitive(name),
                value
            ]);
        }
        else if (isBooleanNativeAttribute(name)) {
            value = toCall(FORMAT_NATIVE_ATTRIBUTE_BOOLEAN_VALUE, [
                toPrimitive(name),
                value,
                toPrimitive(node.defaultValue)
            ]);
        }
    }
    return value;
}
function parseChildren(children, forceDynamic) {
    let dynamicChildren = UNDEFINED$1, staticChildren = UNDEFINED$1, isDynamic = forceDynamic || FALSE$1;
    if (!isDynamic) {
        each$2(children, function (node) {
            if (!node.isStatic) {
                isDynamic = TRUE$1;
                return FALSE$1;
            }
        });
    }
    push(dynamicChildrenStack, isDynamic);
    if (isDynamic) {
        dynamicChildren = toCall(generateNodesToChildren(children));
    }
    else {
        staticChildren = generateNodesToList(children);
    }
    pop(dynamicChildrenStack);
    return {
        dynamicChildren,
        staticChildren,
    };
}
nodeGenerator[ELEMENT] = function (node) {
    let { tag, dynamicTag, isComponent, to, ref, key, html, text, attrs, children } = node, vnodeType = isComponent
        ? VNODE_TYPE_COMPONENT
        : (specialTag2VNodeType[tag] || VNODE_TYPE_ELEMENT), vnode = toMap({
        context: ARG_INSTANCE,
        type: toPrimitive(vnodeType),
        tag: dynamicTag
            ? generateExpression(dynamicTag)
            : toPrimitive(tag)
    }), isFragment = vnodeType === VNODE_TYPE_FRAGMENT, isPortal = vnodeType === VNODE_TYPE_PORTAL, isSlot = vnodeType === VNODE_TYPE_SLOT, outputAttrs = UNDEFINED$1, outputChildren = UNDEFINED$1, outputSlots = UNDEFINED$1, renderSlot = UNDEFINED$1;
    // 先序列化 children，再序列化 attrs，原因需要举两个例子：
    // 例子1：
    // <div on-click="output(this)"></div> 如果 this 序列化成 $scope，如果外部修改了 this，因为模板没有计入此依赖，不会刷新，因此 item 是旧的
    // 这个例子要求即使是动态执行的代码，也不能简单的直接序列化成 $scope
    // 例子2：
    // <div on-click="output(this)">{{this}}</div>，如果第一个 this 转成 $scope，第二个正常读取数据，这样肯定没问题
    // 但问题是，你不知道有没有第二个 this，因此这里反过来，先序列化非动态部分，即 children，再序列化可能动态的部分，即 attrs
    // 这样序列化动态部分的时候，就知道是否可以转成 $scope
    // 后来发现，即使这样实现也不行，因为模板里存在各种可能的 if 或三元运算，导致依赖的捕捉充满不确定，因此这里我们不再考虑把 this 转成 $scope
    push(vnodeStack, TRUE$1);
    push(attributeStack, FALSE$1);
    push(vnodeTypeStack, vnodeType);
    if (children) {
        if (isComponent) {
            outputSlots = generateComponentSlots(children);
        }
        else {
            const { dynamicChildren, staticChildren } = parseChildren(children);
            if (dynamicChildren) {
                outputChildren = dynamicChildren;
            }
            else if (staticChildren) {
                if (isSlot) {
                    outputChildren = staticChildren;
                }
                else {
                    vnode.set(FIELD_CHILDREN, staticChildren);
                }
            }
        }
    }
    // 开始序列化 attrs，原则也是先序列化非动态部分，再序列化动态部分，即指令留在最后序列化
    vnodeStack[vnodeStack.length - 1] = FALSE$1;
    attributeStack[attributeStack.length - 1] = TRUE$1;
    // 在 vnodeStack 为 false 时取值
    if (to) {
        vnode.set('to', generateAttributeValue(to));
    }
    if (ref) {
        vnode.set('ref', generateAttributeValue(ref));
    }
    if (key) {
        vnode.set('key', generateAttributeValue(key));
    }
    if (html) {
        vnode.set('html', string$1(html)
            ? toPrimitive(html)
            : toCall(TO_STRING, [
                generateExpression(html)
            ]));
    }
    if (text) {
        vnode.set('text', string$1(text)
            ? toPrimitive(text)
            : toCall(TO_STRING, [
                generateExpression(text)
            ]));
    }
    if (attrs) {
        const { nativeAttributeList, propertyList, style, lazyList, transition, model, eventList, customDirectiveList, otherList, } = parseAttrs(attrs, vnodeType), hasDynamicAttrs = otherList.length > 0;
        if (nativeAttributeList.length) {
            let nativeAttributes = toMap(), isDynamic = hasDynamicAttrs;
            each$2(nativeAttributeList, function (node) {
                if (!node.isStatic) {
                    isDynamic = TRUE$1;
                }
                nativeAttributes.set(node.name, generateNativeAttributeValue(node));
            });
            vnode.set(FIELD_NATIVE_ATTRIBUTES, isDynamic
                ? nativeAttributes
                : addVar(nativeAttributes, TRUE$1));
        }
        if (propertyList.length) {
            const properties = toMap();
            each$2(propertyList, function (node) {
                properties.set(node.name, generateAttributeValue(node));
            });
            vnode.set(FIELD_PROPERTIES, properties);
        }
        if (style) {
            vnode.set(FIELD_NATIVE_STYLES, getStyleValue(style));
        }
        if (lazyList.length) {
            const lazy = toMap();
            each$2(lazyList, function (node) {
                lazy.set(node.name, getLazyValue(node));
            });
            // 编译器保证了 lazy 的值是静态的
            vnode.set(FIELD_LAZY, addVar(lazy, TRUE$1));
        }
        if (transition) {
            vnode.set(FIELD_TRANSITION, getTransitionValue(transition));
        }
        if (model) {
            vnode.set(FIELD_MODEL, getModelValue(model));
        }
        if (eventList.length) {
            const events = toMap();
            each$2(eventList, function (node) {
                const info = getEventInfo(node);
                events.set(getDirectiveKey(node), toCall(info.name, info.args));
            });
            vnode.set(FIELD_EVENTS, events);
        }
        if (customDirectiveList.length) {
            const directives = toMap();
            each$2(customDirectiveList, function (node) {
                directives.set(getDirectiveKey(node), toCall(RENDER_DIRECTIVE, getDirectiveArgs(node)));
            });
            vnode.set(FIELD_DIRECTIVES, directives);
        }
        if (otherList.length) {
            outputAttrs = toAnonymousFunction([
                ARG_VNODE
            ], generateNodesToTuple(otherList), ARG_VNODE);
        }
    }
    if (isSlot) {
        const nameAttr = node.name;
        let outputName = toPrimitive(SLOT_DATA_PREFIX + SLOT_NAME_DEFAULT);
        if (nameAttr) {
            // 如果 name 是字面量，直接拼出结果
            outputName = isDef(nameAttr.value)
                ? toPrimitive(SLOT_DATA_PREFIX + nameAttr.value)
                : toBinary(toPrimitive(SLOT_DATA_PREFIX), '+', toPrecedence(generateAttributeValue(nameAttr)));
        }
        renderSlot = toCall(RENDER_SLOT, [
            outputName,
            last(slotStack)
                ? ARG_PARENT
                : PRIMITIVE_UNDEFINED
        ]);
    }
    pop(vnodeStack);
    pop(attributeStack);
    pop(vnodeTypeStack);
    if (vnodeType === VNODE_TYPE_ELEMENT) {
        vnode.set(FIELD_OPERATOR, OPERATOR_ELEMENT_VNODE);
    }
    else if (isFragment) {
        vnode.set(FIELD_OPERATOR, OPERATOR_FRAGMENT_VNODE);
    }
    else if (isPortal) {
        vnode.set(FIELD_OPERATOR, OPERATOR_PORTAL_VNODE);
    }
    else if (isComponent) {
        vnode.set(FIELD_OPERATOR, OPERATOR_COMPONENT_VNODE);
        if (last(slotStack)) {
            vnode.set('parent', ARG_PARENT);
        }
    }
    else if (isSlot) {
        vnode.set(FIELD_OPERATOR, OPERATOR_SLOT_VNODE);
        // 如果 renderSlot 没内容，则取 slot 元素的 children 作为内容
        // <slot>
        //  default
        // </slot>
        outputChildren = outputChildren
            ? toBinary(renderSlot, '||', outputChildren)
            : renderSlot;
    }
    if (node.isSvg) {
        vnode.set('isSvg', PRIMITIVE_TRUE);
    }
    if (node.isStatic) {
        vnode.set('isStatic', PRIMITIVE_TRUE);
        vnode.set('isPure', PRIMITIVE_TRUE);
    }
    if (outputChildren) {
        vnode.set(FIELD_CHILDREN, outputChildren);
    }
    if (outputSlots) {
        vnode.set(FIELD_SLOTS, outputSlots);
    }
    const result = outputAttrs
        ? toCall(outputAttrs, [
            vnode,
        ])
        : vnode;
    if (isFragment || isPortal || isSlot) {
        const statement = toStatement(), varName = getTempName();
        // temp = vnode
        statement.add(toAssign(varName, result));
        // temp.children && temp.children.length && children.push(temp)
        statement.add(toBinary(toBinary(toMember(varName, [
            toPrimitive(FIELD_CHILDREN)
        ]), '&&', toMember(varName, [
            toPrimitive(FIELD_CHILDREN),
            toPrimitive(RAW_LENGTH)
        ])), '&&', toPush(ARG_CHILDREN, varName)));
        return statement;
    }
    return generateVNode(result);
};
nodeGenerator[ATTRIBUTE] = function (node) {
    const lastVNodeType = last(vnodeTypeStack);
    return toCall(APPEND_VNODE_PROPERTY, [
        ARG_VNODE,
        toPrimitive((lastVNodeType === VNODE_TYPE_COMPONENT || lastVNodeType === VNODE_TYPE_SLOT)
            ? FIELD_PROPERTIES
            : FIELD_NATIVE_ATTRIBUTES),
        toPrimitive(node.name),
        generateNativeAttributeValue(node),
    ]);
};
nodeGenerator[STYLE] = function (node) {
    return toAssign(toMember(ARG_VNODE, [
        toPrimitive(FIELD_NATIVE_STYLES)
    ]), getStyleValue(node));
};
function getStyleValue(node) {
    if (isDef(node.value)) {
        const styles = toMap();
        parseStyleString(node.value, function (key, value) {
            styles.set(key, toPrimitive(value));
        });
        return addVar(styles, TRUE$1);
    }
    if (node.expr) {
        if (node.expr.type === OBJECT) {
            return generateExpression(node.expr);
        }
        return toCall(RENDER_STYLE_EXPR, [
            generateExpression(node.expr)
        ]);
    }
    // 多值拼接，compiler 保证了 children 必然有值
    return toCall(RENDER_STYLE_STRING, [
        createAttributeValue(node.children)
    ]);
}
function getLazyValue(node) {
    return toPrimitive(node.value);
}
function getTransitionValue(node) {
    return toCall(RENDER_TRANSITION, [
        toPrimitive(node.value),
        generateSelfAndGlobalReader(ARG_TRANSITIONS, ARG_GLOBAL_TRANSITIONS, node.value)
    ]);
}
function getModelValue(node) {
    return toCall(RENDER_MODEL, [
        generateExpression(node.expr, TRUE$1)
    ]);
}
function addEventBooleanInfo(args, node) {
    // isComponent
    push(args, PRIMITIVE_UNDEFINED);
    // isNative
    push(args, PRIMITIVE_UNDEFINED);
    if (last(vnodeTypeStack) === VNODE_TYPE_COMPONENT) {
        if (node.modifier === MODIFER_NATIVE) {
            // isNative
            args[args.length - 1] = PRIMITIVE_TRUE;
        }
        else {
            // isComponent
            args[args.length - 2] = PRIMITIVE_TRUE;
        }
    }
}
function getEventInfo(node) {
    const args = [];
    // key
    push(args, toPrimitive(getDirectiveKey(node)));
    // value
    push(args, toPrimitive(node.value));
    // from
    push(args, toPrimitive(node.name));
    // fromNs
    push(args, 
    // 组件事件要用 component.on(type, options) 进行监听
    // 为了保证 options.ns 是字符串类型，这里需确保 fromNs 是字符串
    toPrimitive(node.modifier || EMPTY_STRING));
    // 事件的 expr 必须是表达式
    const expr = node.expr, { raw } = expr;
    if (expr.type === CALL) {
        const callNode = expr;
        // compiler 保证了函数调用的 name 是标识符
        // method
        push(args, toPrimitive(callNode.name.name));
        // 为了实现运行时动态收集参数，这里序列化成函数
        if (!falsy$2(callNode.args)) {
            // runtime
            push(args, toMap({
                execute: toAnonymousFunction([
                    ARG_EVENT,
                    ARG_DATA,
                ], UNDEFINED$1, toList(callNode.args.map(function (arg) {
                    return generateExpression(arg);
                })))
            }));
        }
        else {
            // runtime
            push(args, PRIMITIVE_UNDEFINED);
        }
        addEventBooleanInfo(args, node);
        return {
            name: RENDER_EVENT_METHOD,
            args,
        };
    }
    const parts = raw.split(RAW_DOT);
    // to
    push(args, toPrimitive(parts[0]));
    // toNs
    push(args, toPrimitive(parts[1]));
    addEventBooleanInfo(args, node);
    return {
        name: RENDER_EVENT_NAME,
        args,
    };
}
function getDirectiveKey(node) {
    return join(node.name, node.modifier || EMPTY_STRING);
}
function getDirectiveArgs(node) {
    const args = [];
    // key
    push(args, toPrimitive(getDirectiveKey(node)));
    // name
    push(args, toPrimitive(node.name));
    // modifier
    push(args, toPrimitive(node.modifier));
    // value
    push(args, node.expr
        ? generateExpression(node.expr)
        : toPrimitive(node.value));
    // create
    push(args, generateSelfAndGlobalReader(ARG_DIRECTIVES, ARG_GLOBAL_DIRECTIVES, node.name));
    return args;
}
nodeGenerator[DIRECTIVE] = function (node) {
    switch (node.ns) {
        case DIRECTIVE_LAZY:
            return toCall(APPEND_VNODE_PROPERTY, [
                ARG_VNODE,
                toPrimitive(FIELD_LAZY),
                toPrimitive(node.name),
                getLazyValue(node),
            ]);
        // <div transition="name">
        case DIRECTIVE_TRANSITION:
            return toAssign(toMember(ARG_VNODE, [
                toPrimitive(FIELD_TRANSITION)
            ]), getTransitionValue(node));
        // <input model="id">
        case DIRECTIVE_MODEL:
            return toAssign(toMember(ARG_VNODE, [
                toPrimitive(FIELD_MODEL)
            ]), getModelValue(node));
        // <div on-click="name">
        case DIRECTIVE_EVENT:
            const info = getEventInfo(node);
            return toCall(APPEND_VNODE_PROPERTY, [
                ARG_VNODE,
                toPrimitive(FIELD_EVENTS),
                toPrimitive(getDirectiveKey(node)),
                toCall(info.name, info.args),
            ]);
        default:
            return toCall(APPEND_VNODE_PROPERTY, [
                ARG_VNODE,
                toPrimitive(FIELD_DIRECTIVES),
                toPrimitive(getDirectiveKey(node)),
                toCall(RENDER_DIRECTIVE, getDirectiveArgs(node)),
            ]);
    }
};
nodeGenerator[SPREAD] = function (node) {
    return toCall(RENDER_SPREAD, [
        ARG_VNODE,
        toPrimitive(FIELD_PROPERTIES),
        generateExpression(node.expr)
    ]);
};
nodeGenerator[TEXT] = function (node) {
    const text = toPrimitive(node.text);
    if (last(vnodeStack)) {
        return generateTextVNode(text);
    }
    const attributeValue = last(attributeValueStack);
    if (attributeValue) {
        attributeValue.append(text);
        return PRIMITIVE_UNDEFINED;
    }
    return text;
};
nodeGenerator[EXPRESSION] = function (node) {
    const value = generateExpression(node.expr);
    if (last(vnodeStack)) {
        return generateTextVNode(toCall(TO_STRING, [
            value
        ]));
    }
    const attributeValue = last(attributeValueStack);
    if (attributeValue) {
        attributeValue.append(toCall(TO_STRING, [
            value
        ]));
        return PRIMITIVE_UNDEFINED;
    }
    return value;
};
function getBranchDefaultValue() {
    return last(vnodeStack)
        ? generateCommentVNode()
        : last(attributeValueStack)
            ? toPrimitive(EMPTY_STRING)
            : PRIMITIVE_UNDEFINED;
}
function getBranchValue(children) {
    if (children) {
        if (last(attributeStack)) {
            children = sortAttrs(children, last(vnodeTypeStack));
        }
        if (last(attributeValueStack)) {
            return createAttributeValue(children);
        }
        return toStatement(mapNodes(children));
    }
}
nodeGenerator[IF] = function (node) {
    const { next } = node, attributeValue = last(attributeValueStack), defaultValue = getBranchDefaultValue(), result = toTernary(generateExpression(node.expr), getBranchValue(node.children) || defaultValue, next
        ? nodeGenerator[next.type](next)
        : defaultValue);
    if (attributeValue) {
        attributeValue.append(result);
        return PRIMITIVE_UNDEFINED;
    }
    return result;
};
nodeGenerator[ELSE_IF] = function (node) {
    const { next } = node, defaultValue = getBranchDefaultValue();
    return toTernary(generateExpression(node.expr), getBranchValue(node.children) || defaultValue, next
        ? nodeGenerator[next.type](next)
        : defaultValue);
};
nodeGenerator[ELSE] = function (node) {
    return getBranchValue(node.children) || getBranchDefaultValue();
};
nodeGenerator[EACH] = function (node) {
    const { index, from, to, equal, next } = node, isSpecial = to || from.type === ARRAY || from.type === OBJECT;
    const args = [
        ARG_STACK,
        ARG_SCOPE,
        ARG_KEYPATH,
        ARG_LENGTH,
    ];
    if (index) {
        push(args, index);
        push(magicVariables, index);
    }
    // 如果是特殊的 each，包括 遍历 range 和 遍历数组字面量和对象字面量
    // 在这种 each 中引用 this 无需追踪依赖，因此可直接认为 this 已用过，这样生成代码时，会直接引用局部变量，提高执行效率
    push(eachStack, isSpecial);
    // compiler 保证了 children 一定有值
    const renderChildren = toAnonymousFunction(args, generateNodesToTuple(node.children));
    if (index) {
        pop(magicVariables);
    }
    pop(eachStack);
    // compiler 保证了 children 一定有值
    const renderElse = next
        ? toAnonymousFunction(UNDEFINED$1, generateNodesToTuple(next.children))
        : PRIMITIVE_UNDEFINED;
    // 遍历区间
    if (to) {
        return toCall(RENDER_RANGE, [
            generateExpression(from),
            generateExpression(to),
            toPrimitive(equal),
            renderChildren,
            renderElse,
        ]);
    }
    // 遍历数组和对象
    return toCall(RENDER_EACH, [
        generateExpression(from, TRUE$1),
        renderChildren,
        renderElse,
    ]);
};
nodeGenerator[IMPORT] = function (node) {
    const varName = getTempName(), statement = toStatement();
    // temp = vnode
    statement.add(toAssign(varName, generateExpression(node.expr)));
    statement.add(toTernary(varName, generateVNode(varName), PRIMITIVE_UNDEFINED));
    return statement;
};
function generate(node) {
    init();
    init$1();
    return generate$2([
        RENDER_STYLE_STRING,
        RENDER_STYLE_EXPR,
        RENDER_TRANSITION,
        RENDER_MODEL,
        RENDER_EVENT_METHOD,
        RENDER_EVENT_NAME,
        RENDER_DIRECTIVE,
        RENDER_SPREAD,
        RENDER_EACH,
        RENDER_RANGE,
        RENDER_SLOT,
        APPEND_VNODE_PROPERTY,
        FORMAT_NATIVE_ATTRIBUTE_NUMBER_VALUE,
        FORMAT_NATIVE_ATTRIBUTE_BOOLEAN_VALUE,
        LOOKUP_KEYPATH,
        LOOKUP_PROP,
        READ_KEYPATH,
        SET_VALUE_HOLDER,
        TO_STRING,
        OPERATOR_TEXT_VNODE,
        OPERATOR_COMMENT_VNODE,
        OPERATOR_ELEMENT_VNODE,
        OPERATOR_COMPONENT_VNODE,
        OPERATOR_FRAGMENT_VNODE,
        OPERATOR_PORTAL_VNODE,
        OPERATOR_SLOT_VNODE,
        ARG_INSTANCE,
        ARG_LOGGER,
        ARG_FILTERS,
        ARG_GLOBAL_FILTERS,
        ARG_DIRECTIVES,
        ARG_GLOBAL_DIRECTIVES,
        ARG_TRANSITIONS,
        ARG_GLOBAL_TRANSITIONS,
        ARG_STACK,
        ARG_SCOPE,
        ARG_KEYPATH,
        ARG_CHILDREN,
    ], nodeGenerator[node.type](node));
}

const STATUS_INIT = 1;
const STATUS_FRESH = 2;
const STATUS_DIRTY = 3;
function runGetter(instance) {
    const { input, getter } = instance;
    instance.value = input
        ? getter.apply(UNDEFINED$1, input)
        : getter();
}
function runOutput(instance) {
    const { value, output } = instance;
    return output
        ? output(value)
        : value;
}
class Deps {
    constructor() {
        this.map = {};
        this.list = [];
    }
    add(observer, dep) {
        const deps = this.map[observer.id] || (this.map[observer.id] = {});
        if (!deps[dep]) {
            deps[dep] = observer;
            this.list.push([
                observer, dep
            ]);
        }
    }
    watch(watcher) {
        const { list } = this;
        if (list) {
            for (let i = 0, length = list.length; i < length; i++) {
                list[i][0].watch(list[i][1], watcher);
            }
        }
    }
    unwatch(watcher) {
        const { list } = this;
        if (list) {
            for (let i = 0, length = list.length; i < length; i++) {
                list[i][0].unwatch(list[i][1], watcher);
            }
        }
    }
}
/**
 * 计算属性
 *
 * 可配置 cache、deps, get、set 等
 */
class Computed {
    constructor(keypath, cache, sync, input, output, getter, setter, onChange) {
        const instance = this;
        instance.status = STATUS_INIT;
        instance.keypath = keypath;
        instance.cache = cache;
        instance.input = input;
        instance.output = output;
        instance.setter = setter;
        instance.getter = getter;
        instance.onChange = onChange;
        instance.watcherOptions = {
            sync,
            watcher() {
                instance.refresh();
            }
        };
    }
    /**
     * 读取计算属性的值
     */
    get() {
        const instance = this, { status, watcherOptions } = instance;
        // 禁用缓存
        if (!instance.cache) {
            runGetter(instance);
        }
        // 减少取值频率，尤其是处理复杂的计算规则
        else if (status !== STATUS_FRESH) {
            // 如果写死了依赖，则不需要收集依赖
            if (instance.staticDeps) {
                runGetter(instance);
            }
            // 自动收集依赖
            else {
                let { dynamicDeps } = instance;
                // 清空上次收集的依赖
                if (dynamicDeps) {
                    dynamicDeps.unwatch(watcherOptions.watcher);
                }
                instance.dynamicDeps = UNDEFINED$1;
                const lastComputed = Computed.current;
                // 开始收集新的依赖
                Computed.current = instance;
                runGetter(instance);
                // 取值完成，恢复原值
                Computed.current = lastComputed;
                dynamicDeps = instance.dynamicDeps;
                if (dynamicDeps) {
                    dynamicDeps.watch(watcherOptions);
                }
            }
        }
        if (status !== STATUS_FRESH) {
            instance.status = STATUS_FRESH;
        }
        return runOutput(instance);
    }
    set(value) {
        const { setter } = this;
        if (setter) {
            setter(value);
        }
        else if (func(value)) {
            this.getter = value;
            this.refresh();
        }
    }
    refresh() {
        const oldValue = this.value;
        this.status = STATUS_DIRTY;
        const newValue = this.get();
        if (newValue !== oldValue) {
            this.onChange(this.keypath, newValue, oldValue);
        }
    }
    addStaticDeps(observer, deps) {
        const staticDeps = this.staticDeps || (this.staticDeps = new Deps());
        for (let i = 0, length = deps.length; i < length; i++) {
            staticDeps.add(observer, deps[i]);
        }
        staticDeps.watch(this.watcherOptions);
    }
    addDynamicDep(observer, dep) {
        // 动态依赖不能在这直接 watch
        // 只有当计算属性的依赖全部收集完了，才能监听该计算属性的所有依赖
        // 这样可保证依赖最少的计算属性最先执行 watch，当依赖变化时，它也会最早触发 refresh
        const deps = this.dynamicDeps || (this.dynamicDeps = new Deps());
        deps.add(observer, dep);
    }
}

class Context {
    constructor(keypath, scopeValue, scopeKey) {
        this.keypath = keypath;
        this.scopeValue = scopeValue;
        this.scopeKey = scopeKey;
    }
    getScope() {
        const { scopeValue, scopeKey } = this;
        return scopeKey !== UNDEFINED$1 ? scopeValue[scopeKey] : scopeValue;
    }
    getKeypath(name) {
        const { keypath } = this;
        return keypath ? keypath + RAW_DOT + name : name;
    }
}
function render(instance, template, rootScope, filters, globalFilters, directives, globalDirectives, transitions, globalTransitions, addDependency) {
    let rootKeypath = EMPTY_STRING, contextStack = [
        new Context(rootKeypath, rootScope)
    ], 
    // 模板渲染过程收集的 vnode
    children = [], appendVNodeProperty = function (vnode, key, name, value) {
        if (vnode[key]) {
            vnode[key][name] = value;
        }
        else {
            const map = {};
            map[name] = value;
            vnode[key] = map;
        }
    }, renderStyleString = function (value) {
        const styles = {};
        parseStyleString(value, function (key, value) {
            styles[key] = value;
        });
        return styles;
    }, renderStyleExpr = function (value) {
        if (array$1(value)) {
            const styles = {};
            for (let i = 0, len = value.length; i < len; i++) {
                const item = renderStyleExpr(value[i]);
                if (item) {
                    for (let key in item) {
                        styles[key] = item[key];
                    }
                }
            }
            return styles;
        }
        if (object$1(value)) {
            return value;
        }
        if (string$1(value)) {
            return renderStyleString(value);
        }
    }, renderTransition = function (name, transition) {
        return transition;
    }, 
    // holder 是全局共用的，这里要浅拷贝一次
    renderModel = function (holder) {
        return {
            keypath: holder.keypath,
            value: holder.value,
        };
    }, createEventNameListener = function (type, ns, isComponent) {
        return function (event, data, isNative) {
            // 监听组件事件不用处理父组件传下来的事件
            if (isComponent && event.phase === CustomEvent.PHASE_DOWNWARD) {
                return;
            }
            if (type !== event.type || ns !== event.ns) {
                event = new CustomEvent(type, isNative
                    ? event.originalEvent
                    : event);
                event.ns = ns;
            }
            instance.fire(event, data);
        };
    }, createEventMethodListener = function (method, runtime, isComponent) {
        return function (event, data) {
            // 监听组件事件不用处理父组件传下来的事件
            if (isComponent && event.phase === CustomEvent.PHASE_DOWNWARD) {
                return;
            }
            const result = callMethod(method, runtime
                ? runtime.execute(event, data)
                : (data ? [event, data] : [event]));
            if (result === FALSE$1) {
                event.prevent().stop();
            }
        };
    }, renderEventMethod = function (key, value, name, ns, method, runtime, isComponent, isNative) {
        return {
            key,
            value,
            name,
            ns,
            isNative,
            runtime,
            listener: createEventMethodListener(method, runtime, isComponent),
        };
    }, renderEventName = function (key, value, name, ns, to, toNs, isComponent, isNative) {
        return {
            key,
            value,
            name,
            ns,
            isNative,
            listener: createEventNameListener(to, toNs, isComponent),
        };
    }, renderDirective = function (key, name, modifier, value, create) {
        return {
            ns: DIRECTIVE_CUSTOM,
            name,
            value,
            modifier,
            create,
        };
    }, callMethod = function (name, args) {
        const method = instance[name];
        if (args && args.length > 0) {
            return execute(method, instance, args);
        }
        return instance[name]();
    }, renderSpread = function (vnode, key, value) {
        if (object$1(value)) {
            for (let name in value) {
                appendVNodeProperty(vnode, key, name, value[name]);
            }
        }
    }, renderEach = function (holder, renderChildren, renderElse) {
        let { keypath, value } = holder, length = 0, needKeypath = !!keypath, oldScopeStack = contextStack, currentKeypath = last(contextStack).keypath;
        if (array$1(value)) {
            length = value.length;
            for (let i = 0; i < length; i++) {
                if (needKeypath) {
                    currentKeypath = keypath + RAW_DOT + i;
                    // slice + push 比直接 concat 快多了
                    contextStack = oldScopeStack.slice();
                    contextStack.push(new Context(currentKeypath, value, i));
                }
                renderChildren(contextStack, value[i], currentKeypath, length, i);
            }
        }
        else if (object$1(value)) {
            const keys$1 = keys(value);
            length = keys$1.length;
            for (let i = 0; i < length; i++) {
                const key = keys$1[i];
                if (needKeypath) {
                    // 这里 key 虽然可能为空，但也必须直接拼接
                    // 因为不拼接就变成了原来的 keypath，这样更是错的，
                    // 只能在使用上尽量避免 key 为空的用法
                    currentKeypath = keypath + RAW_DOT + key;
                    // slice + push 比直接 concat 快多了
                    contextStack = oldScopeStack.slice();
                    contextStack.push(new Context(currentKeypath, value, key));
                }
                renderChildren(contextStack, value[key], currentKeypath, length, key);
            }
        }
        if (contextStack !== oldScopeStack) {
            contextStack = oldScopeStack;
        }
        if (renderElse && length === 0) {
            renderElse();
        }
    }, renderRange = function (from, to, equal, renderChildren, renderElse) {
        let count = 0, length = 0, currentKeypath = last(contextStack).keypath;
        if (from < to) {
            length = to - from;
            if (equal) {
                for (let i = from; i <= to; i++) {
                    renderChildren(contextStack, i, currentKeypath, length, count++);
                }
            }
            else {
                for (let i = from; i < to; i++) {
                    renderChildren(contextStack, i, currentKeypath, length, count++);
                }
            }
        }
        else {
            length = from - to;
            if (equal) {
                for (let i = from; i >= to; i--) {
                    renderChildren(contextStack, i, currentKeypath, length, count++);
                }
            }
            else {
                for (let i = from; i > to; i--) {
                    renderChildren(contextStack, i, currentKeypath, length, count++);
                }
            }
        }
        if (renderElse && length === 0) {
            renderElse();
        }
    }, renderSlot = function (name, parent) {
        addDependency(name);
        const target = rootScope[name];
        if (target) {
            if (target instanceof Computed) {
                // 如果 slot 透传好几层组件，最里面的那个组件调用 renderSlot 时，会把自己传入 parent 参数
                // 那么在它之上的每一层组件，都应该调用原始的渲染函数 getter，而不是调用经过封装的 get
                return parent
                    ? target.getter(parent)
                    : target.get();
            }
            return target;
        }
    }, lookupKeypath = function (stack, index, keypathStr, keypathList, lookup, filter) {
        let defaultResult;
        while (index >= 0) {
            const item = stack[index], currentKeypath = item.getKeypath(keypathStr), result = get(item.getScope(), keypathList);
            const valueHolder = setValueHolder(result ? result.value : UNDEFINED$1, currentKeypath);
            if (result) {
                return valueHolder;
            }
            if (!defaultResult) {
                defaultResult = valueHolder;
            }
            if (lookup && index > 0) {
                index--;
            }
            else {
                break;
            }
        }
        return filter
            ? setValueHolder(filter)
            : defaultResult;
    }, lookupProp = function (stack, index, prop, filter) {
        return lookupKeypath(stack, index, prop, [prop], TRUE$1, filter);
    }, readKeypath = function (value, keypath) {
        const result = get(value, keypath);
        return setValueHolder(result ? result.value : UNDEFINED$1);
    }, setValueHolder = function (value, keypath) {
        if (value && func(value.get)) {
            value = value.get();
        }
        holder.keypath = keypath;
        holder.value = value;
        if (keypath !== UNDEFINED$1) {
            addDependency(keypath);
        }
        return holder;
    }, renderTemplate = function (render, scope, keypath, children) {
        render(renderStyleString, renderStyleExpr, renderTransition, renderModel, renderEventMethod, renderEventName, renderDirective, renderSpread, renderEach, renderRange, renderSlot, appendVNodeProperty, formatNumberNativeAttributeValue, formatBooleanNativeAttributeValue, lookupKeypath, lookupProp, readKeypath, setValueHolder, toString, textVNodeOperator, commentVNodeOperator, elementVNodeOperator, componentVNodeOperator, fragmentVNodeOperator, portalVNodeOperator, slotVNodeOperator, instance, logger, filters, globalFilters, directives, globalDirectives, transitions, globalTransitions, contextStack, scope, keypath, children);
    };
    renderTemplate(template, rootScope, rootKeypath, children);
    return children[0];
}

let guid$1 = 0, 
// 这里先写 IE9 支持的接口
// 文本或注释节点设置内容的属性
textContent = 'textContent', 
// 元素节点设置 text 的属性
innerText = textContent, 
// 元素节点设置 html 的属性
innerHTML = 'innerHTML', cssFloat = 'cssFloat', createEvent = function (event, node) {
    return event;
}, findElement = function (selector) {
    const node = DOCUMENT.querySelector(selector);
    if (node) {
        return node;
    }
}, addEventListener = function (node, type, listener) {
    node.addEventListener(type, listener, FALSE$1);
}, removeEventListener = function (node, type, listener) {
    node.removeEventListener(type, listener, FALSE$1);
}, 
// IE9 不支持 classList
addElementClass = function (node, className) {
    node.classList.add(className);
}, removeElementClass = function (node, className) {
    node.classList.remove(className);
};
{
    if (DOCUMENT) {
        // 此时 document.body 不一定有值，比如 script 放在 head 里
        let testElement = DOCUMENT.documentElement;
        if (!(cssFloat in testElement.style)) {
            cssFloat = 'styleFloat';
        }
        if (!testElement.classList) {
            addElementClass = function (node, className) {
                const classes = node.className.split(CHAR_WHITESPACE);
                if (!has$2(classes, className)) {
                    push(classes, className);
                    node.className = join$1(classes, CHAR_WHITESPACE);
                }
            };
            removeElementClass = function (node, className) {
                const classes = node.className.split(CHAR_WHITESPACE);
                if (remove$1(classes, className)) {
                    node.className = join$1(classes, CHAR_WHITESPACE);
                }
            };
        }
        // 为 IE9 以下浏览器打补丁
        {
            if (!testElement.addEventListener) {
                const PROPERTY_CHANGE = 'propertychange', isBoxElement = function (node) {
                    return node.tagName === 'INPUT'
                        && (node.type === 'radio' || node.type === 'checkbox');
                };
                class IEEvent {
                    constructor(event, element) {
                        extend(this, event);
                        this.currentTarget = element;
                        this.target = event.srcElement || element;
                        this.originalEvent = event;
                    }
                    preventDefault() {
                        this.originalEvent.returnValue = FALSE$1;
                    }
                    stopPropagation() {
                        this.originalEvent.cancelBubble = TRUE$1;
                    }
                }
                // 兼容 IE678
                textContent = 'nodeValue';
                innerText = 'innerText';
                createEvent = function (event, element) {
                    return new IEEvent(event, element);
                };
                findElement = function (selector) {
                    // 去掉 #
                    if (codeAt(selector, 0) === 35) {
                        selector = slice(selector, 1);
                    }
                    const node = DOCUMENT.getElementById(selector);
                    if (node) {
                        return node;
                    }
                };
                addEventListener = function (node, type, listener) {
                    if (type === EVENT_INPUT) {
                        addEventListener(node, PROPERTY_CHANGE, 
                        // 借用 EMITTER，反正只是内部临时用一下...
                        listener[EVENT] = function (event) {
                            if (event.propertyName === 'value') {
                                listener(new CustomEvent(EVENT_INPUT, createEvent(event, node)));
                            }
                        });
                    }
                    else if (type === EVENT_CHANGE && isBoxElement(node)) {
                        addEventListener(node, EVENT_CLICK, listener[EVENT] = function (event) {
                            listener(new CustomEvent(EVENT_CHANGE, createEvent(event, node)));
                        });
                    }
                    else {
                        node.attachEvent(`on${type}`, listener);
                    }
                };
                removeEventListener = function (node, type, listener) {
                    if (type === EVENT_INPUT) {
                        removeEventListener(node, PROPERTY_CHANGE, listener[EVENT]);
                        delete listener[EVENT];
                    }
                    else if (type === EVENT_CHANGE && isBoxElement(node)) {
                        removeEventListener(node, EVENT_CLICK, listener[EVENT]);
                        delete listener[EVENT];
                    }
                    else {
                        node.detachEvent(`on${type}`, listener);
                    }
                };
            }
        }
        testElement = UNDEFINED$1;
    }
}
const CHAR_WHITESPACE = ' ', 
/**
 * 绑定在 HTML 元素上的事件发射器
 */
EVENT = '$event', 
/**
 * 低版本 IE 上 style 标签的专有属性
 */
STYLE_SHEET = 'styleSheet', 
/**
 * 跟输入事件配套使用的事件
 */
COMPOSITION_START = 'compositionstart', 
/**
 * 跟输入事件配套使用的事件
 */
COMPOSITION_END = 'compositionend', domain = 'http://www.w3.org/', namespaces = {
    svg: domain + '2000/svg',
    // xml: domain + 'XML/1998/namespace',
    // xlink: domain + '1999/xlink',
}, nativeListenerCount = {}, nativeListeners = {}, customListeners = {}, specialEvents = {};
specialEvents[EVENT_MODEL] = {
    on(node, listener) {
        let locked = FALSE$1;
        on(node, COMPOSITION_START, listener[COMPOSITION_START] = function () {
            locked = TRUE$1;
        });
        on(node, COMPOSITION_END, listener[COMPOSITION_END] = function (event) {
            locked = FALSE$1;
            listener(event);
        });
        addEventListener(node, EVENT_INPUT, listener[EVENT_INPUT] = function (event) {
            if (!locked) {
                listener(event);
            }
        });
    },
    off(node, listener) {
        off(node, COMPOSITION_START, listener[COMPOSITION_START]);
        off(node, COMPOSITION_END, listener[COMPOSITION_END]);
        removeEventListener(node, EVENT_INPUT, listener[EVENT_INPUT]);
        listener[COMPOSITION_START] =
            listener[COMPOSITION_END] =
                listener[EVENT_INPUT] = UNDEFINED$1;
    }
};
function getBodyElement() {
    return DOCUMENT.body;
}
function createElement(tag, isSvg) {
    return isSvg
        ? DOCUMENT.createElementNS(namespaces.svg, tag)
        : DOCUMENT.createElement(tag);
}
function createText(text) {
    return DOCUMENT.createTextNode(text);
}
function createComment(text) {
    return DOCUMENT.createComment(text);
}
function getAttr(node, name) {
    const value = node.getAttribute(name);
    if (value != NULL$1) {
        return value;
    }
}
function setAttr(node, name, value) {
    if (value === UNDEFINED$1) {
        node.removeAttribute(name);
    }
    else {
        node.setAttribute(name, value);
    }
}
function removeAttr(node, name) {
    node.removeAttribute(name);
}
// 这里不传 HTMLElement 是因为外面会在循环里调用，频繁读取 node.style 挺浪费性能的
function setStyle(style, name, value) {
    if (value == NULL$1) {
        style[name] = EMPTY_STRING;
        return;
    }
    style[name === 'float' ? cssFloat : name] = value;
}
// 这里不传 HTMLElement 是因为外面会在循环里调用，频繁读取 node.style 挺浪费性能的
function removeStyle(style, name) {
    style[name] = EMPTY_STRING;
}
function before(parentNode, node, beforeNode) {
    parentNode.insertBefore(node, beforeNode);
}
function append(parentNode, node) {
    parentNode.appendChild(node);
}
function replace(parentNode, node, oldNode) {
    parentNode.replaceChild(node, oldNode);
}
function remove(parentNode, node) {
    parentNode.removeChild(node);
}
function parent(node) {
    const { parentNode } = node;
    if (parentNode) {
        return parentNode;
    }
}
function next(node) {
    const { nextSibling } = node;
    if (nextSibling) {
        return nextSibling;
    }
}
const find = findElement;
function tag(node) {
    if (node.nodeType === NODE_TYPE_ELEMENT) {
        return lower(node.tagName);
    }
}
function getNodeText(node) {
    return node[textContent];
}
function setNodeText(node, text) {
    node[textContent] = text;
}
function getElementText(node) {
    {
        if (tag(node) === 'style' && has(node, STYLE_SHEET)) {
            return node[STYLE_SHEET].cssText;
        }
    }
    return node[innerText];
}
function setElementText(node, text) {
    {
        if (tag(node) === 'style' && has(node, STYLE_SHEET)) {
            node[STYLE_SHEET].cssText = text;
            return;
        }
    }
    node[innerText] = text;
}
function getHtml(node) {
    {
        if (tag(node) === 'style' && has(node, STYLE_SHEET)) {
            return node[STYLE_SHEET].cssText;
        }
    }
    return node[innerHTML];
}
function setHtml(node, html) {
    {
        if (tag(node) === 'style' && has(node, STYLE_SHEET)) {
            node[STYLE_SHEET].cssText = html;
            return;
        }
    }
    node[innerHTML] = html;
}
const addClass = addElementClass;
const removeClass = removeElementClass;
function on(node, type, listener) {
    const nativeKey = node[EVENT] || (node[EVENT] = ++guid$1), nativeListenerMap = nativeListeners[nativeKey] || (nativeListeners[nativeKey] = {}), customListenerMap = customListeners[nativeKey] || (customListeners[nativeKey] = {}), customListenerList = customListenerMap[type] || (customListenerMap[type] = []);
    // 一个元素，相同的事件，只注册一个 native listener
    if (!nativeListenerMap[type]) {
        // 特殊事件
        const special = specialEvents[type], 
        // 唯一的原生监听器
        nativeListener = function (event) {
            let customEvent;
            if (CustomEvent.is(event)) {
                customEvent = event;
                if (customEvent.type !== type) {
                    customEvent.type = type;
                }
            }
            else {
                customEvent = new CustomEvent(type, createEvent(event, node));
            }
            // 避免遍历过程中，数组发生变化，比如增删了
            const listenerList = customListenerList.slice();
            for (let i = 0, length = listenerList.length; i < length; i++) {
                listenerList[i](customEvent, UNDEFINED$1, TRUE$1);
            }
        };
        nativeListenerMap[type] = nativeListener;
        if (nativeListenerCount[nativeKey]) {
            nativeListenerCount[nativeKey]++;
        }
        else {
            nativeListenerCount[nativeKey] = 1;
        }
        if (special) {
            special.on(node, nativeListener);
        }
        else {
            addEventListener(node, type, nativeListener);
        }
    }
    customListenerList.push(listener);
}
function off(node, type, listener) {
    let nativeKey = node[EVENT], nativeListenerMap = nativeListeners[nativeKey], customListenerMap = customListeners[nativeKey], customListenerList = customListenerMap && customListenerMap[type];
    if (customListenerList) {
        remove$1(customListenerList, listener);
        if (!customListenerList.length) {
            customListenerList = UNDEFINED$1;
            delete customListenerMap[type];
        }
    }
    // 如果注册的 type 事件都解绑了，则去掉原生监听器
    if (nativeListenerMap && nativeListenerMap[type] && !customListenerList) {
        const special = specialEvents[type], nativeListener = nativeListenerMap[type];
        if (special) {
            special.off(node, nativeListener);
        }
        else {
            removeEventListener(node, type, nativeListener);
        }
        delete nativeListenerMap[type];
        if (nativeListenerCount[nativeKey]) {
            nativeListenerCount[nativeKey]--;
        }
    }
    if (!nativeListenerCount[nativeKey]) {
        node[EVENT] = UNDEFINED$1;
        delete nativeListeners[nativeKey];
        delete customListeners[nativeKey];
    }
}
function addSpecialEvent(type, hooks) {
    specialEvents[type] = hooks;
}

var domApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  getBodyElement: getBodyElement,
  createElement: createElement,
  createText: createText,
  createComment: createComment,
  getAttr: getAttr,
  setAttr: setAttr,
  removeAttr: removeAttr,
  setStyle: setStyle,
  removeStyle: removeStyle,
  before: before,
  append: append,
  replace: replace,
  remove: remove,
  parent: parent,
  next: next,
  find: find,
  tag: tag,
  getNodeText: getNodeText,
  setNodeText: setNodeText,
  getElementText: getElementText,
  setElementText: setElementText,
  getHtml: getHtml,
  setHtml: setHtml,
  addClass: addClass,
  removeClass: removeClass,
  on: on,
  off: off,
  addSpecialEvent: addSpecialEvent
});

function toNumber (target, defaultValue) {
    return numeric(target)
        ? +target
        : defaultValue !== UNDEFINED$1
            ? defaultValue
            : 0;
}

function readValue (source, keypath) {
    if (source == NULL$1 || keypath === EMPTY_STRING) {
        return source;
    }
    const result = get(source, keypath);
    if (result) {
        return result.value;
    }
}

/**
 * 对比新旧字符串
 *
 * @param newValue
 * @param oldValue
 * @param callback
 */
function diffString (newValue, oldValue, callback) {
    const newIsString = string$1(newValue), oldIsString = string$1(oldValue);
    if (newIsString || oldIsString) {
        callback(RAW_LENGTH, newIsString ? newValue.length : UNDEFINED$1, oldIsString ? oldValue.length : UNDEFINED$1);
        return TRUE$1;
    }
}

/**
 * 对比新旧数组
 *
 * @param newValue
 * @param oldValue
 * @param callback
 */
function diffArray (newValue, oldValue, callback) {
    const newIsArray = array$1(newValue), oldIsArray = array$1(oldValue);
    if (newIsArray || oldIsArray) {
        const newLength = newIsArray ? newValue.length : UNDEFINED$1, oldLength = oldIsArray ? oldValue.length : UNDEFINED$1;
        callback(RAW_LENGTH, newLength, oldLength);
        for (let i = 0, length = Math.max(newLength || 0, oldLength || 0); i < length; i++) {
            callback(
            // 把 number 转成 string
            EMPTY_STRING + i, newIsArray ? newValue[i] : UNDEFINED$1, oldIsArray ? oldValue[i] : UNDEFINED$1);
        }
        return TRUE$1;
    }
}

/**
 * 对比新旧对象
 *
 * @param newValue
 * @param oldValue
 * @param callback
 */
function diffObject (newValue, oldValue, callback) {
    const newIsObject = object$1(newValue), oldIsObject = object$1(oldValue);
    if (newIsObject || oldIsObject) {
        const diffed = createPureObject$1(), newObject = newIsObject ? newValue : EMPTY_OBJECT, oldObject = oldIsObject ? oldValue : EMPTY_OBJECT;
        if (newIsObject) {
            for (let key in newObject) {
                const value = newObject[key];
                if (value !== oldObject[key]) {
                    // 保证遍历 oldObject 时不会再次触发
                    diffed.set(key, TRUE$1);
                    callback(key, value, oldObject[key]);
                }
            }
        }
        if (oldIsObject) {
            for (let key in oldObject) {
                const value = oldObject[key];
                if (diffed.get(key) === UNDEFINED$1 && value !== newObject[key]) {
                    callback(key, newObject[key], value);
                }
            }
        }
    }
}

/**
 * 递归对比
 */
function diffRecursion(keypath, newValue, oldValue, fuzzyKeypaths, fuzzyKeypathLength, callback) {
    const diff = function (subKey, subNewValue, subOldValue) {
        if (subNewValue !== subOldValue) {
            const newKeypath = join(keypath, subKey);
            for (let i = 0; i < fuzzyKeypathLength; i++) {
                const fuzzyKeypath = fuzzyKeypaths[i];
                if (matchFuzzy(newKeypath, fuzzyKeypath) !== UNDEFINED$1) {
                    callback(fuzzyKeypath, newKeypath, subNewValue, subOldValue);
                }
            }
            diffRecursion(newKeypath, subNewValue, subOldValue, fuzzyKeypaths, fuzzyKeypathLength, callback);
        }
    };
    diffString(newValue, oldValue, diff)
        || diffArray(newValue, oldValue, diff)
        || diffObject(newValue, oldValue, diff);
}

function diffWatcher (keypath, newValue, oldValue, watcher, isRecursive, callback) {
    let fuzzyKeypaths;
    // 遍历监听的 keypath，如果未被监听，则无需触发任何事件
    for (const watchKeypath in watcher) {
        // 模糊监听，如 users.*.name
        if (isFuzzy(watchKeypath)) {
            // 如果当前修改的是 users.0 整个对象
            // users.0 和 users.*.name 无法匹配
            // 此时要知道设置 users.0 到底会不会改变 users.*.name 需要靠递归了
            // 如果匹配，则无需递归
            if (matchFuzzy(keypath, watchKeypath) !== UNDEFINED$1) {
                callback(watchKeypath, keypath, newValue, oldValue);
            }
            else if (isRecursive) {
                if (fuzzyKeypaths) {
                    fuzzyKeypaths.push(watchKeypath);
                }
                else {
                    fuzzyKeypaths = [watchKeypath];
                }
            }
        }
        // 不是模糊匹配，直接通过前缀匹配
        else {
            // 比如监听的是 users.0.name，此时修改 users.0，则直接读出子属性值，判断是否相等
            const length = match(watchKeypath, keypath);
            if (length >= 0) {
                const subKeypath = slice(watchKeypath, length), subNewValue = readValue(newValue, subKeypath), subOldValue = readValue(oldValue, subKeypath);
                if (subNewValue !== subOldValue) {
                    callback(watchKeypath, watchKeypath, subNewValue, subOldValue);
                }
            }
        }
    }
    // 存在模糊匹配的需求
    // 必须对数据进行递归
    // 性能确实会慢一些，但是很好用啊，几乎可以监听所有的数据
    if (fuzzyKeypaths) {
        diffRecursion(keypath, newValue, oldValue, fuzzyKeypaths, fuzzyKeypaths.length, callback);
    }
}

// 避免频繁创建对象
const optionsHolder = {
    watcher: EMPTY_FUNCTION,
};
/**
 * 格式化 watch options
 *
 * @param options
 */
function formatWatcherOptions (options, immediate) {
    const isWatcher = func(options);
    if (isWatcher) {
        optionsHolder.watcher = options;
        optionsHolder.immediate = immediate === TRUE$1;
        return optionsHolder;
    }
    return options;
}

let guid = 0;
/**
 * 观察者有两种观察模式：
 *
 * 1. 同步监听
 * 2. 异步监听
 *
 * 对于`计算属性`这种需要实时变化的对象，即它的依赖变了，它需要立即跟着变，否则会出现不一致的问题
 * 这种属于同步监听
 *
 * 对于外部调用 observer.watch('keypath', listener)，属于异步监听，它只关心是否变了，而不关心是否是立即触发的
 */
class Observer {
    constructor(data, context, nextTask) {
        const instance = this;
        instance.id = guid++;
        instance.data = data || {};
        instance.context = context || instance;
        instance.nextTask = nextTask || new NextTask();
        instance.syncEmitter = new Emitter();
        instance.asyncEmitter = new Emitter();
        instance.asyncOldValues = {};
        instance.asyncKeypaths = {};
        instance.onComputedChange = function (keypath, newValue, oldValue) {
            instance.diff(keypath, newValue, oldValue);
        };
    }
    /**
     * 获取数据
     *
     * @param keypath
     * @param defaultValue
     * @param depIgnore
     * @return
     */
    get(keypath, defaultValue, depIgnore) {
        const instance = this, { data } = instance, currentComputed = Computed.current;
        // 传入 '' 获取整个 data
        if (keypath === EMPTY_STRING) {
            return data;
        }
        // 调用 get 时，外面想要获取依赖必须设置是谁在收集依赖
        // 如果没设置，则跳过依赖收集
        if (currentComputed && !depIgnore) {
            currentComputed.addDynamicDep(instance, keypath);
        }
        const result = get(data, keypath);
        return result
            ? result.value
            : defaultValue;
    }
    /**
     * 更新数据
     *
     * @param keypath
     * @param value
     */
    set(keypath, value) {
        const instance = this, { data } = instance, setValue = function (keypath, newValue) {
            const oldValue = instance.get(keypath);
            if (newValue === oldValue) {
                return;
            }
            let next;
            each$1(keypath, function (key, index, lastIndex) {
                if (index === 0) {
                    const item = data[key];
                    if (item && item instanceof Computed) {
                        if (lastIndex === 0) {
                            item.set(newValue);
                        }
                        else {
                            // 这里 next 可能为空
                            next = item.get();
                        }
                    }
                    else {
                        if (lastIndex === 0) {
                            data[key] = newValue;
                        }
                        else {
                            next = data[key] || (data[key] = {});
                        }
                    }
                    return;
                }
                if (next) {
                    if (index === lastIndex) {
                        next[key] = newValue;
                    }
                    else {
                        next = next[key] || (next[key] = {});
                    }
                }
            });
            instance.diff(keypath, newValue, oldValue);
        };
        if (string$1(keypath)) {
            setValue(keypath, value);
        }
        else if (object$1(keypath)) {
            for (let key in keypath) {
                setValue(key, keypath[key]);
            }
        }
    }
    /**
     * 同步调用的 diff，用于触发 syncEmitter，以及唤醒 asyncEmitter
     *
     * @param keypath
     * @param newValue
     * @param oldValue
     */
    diff(keypath, newValue, oldValue) {
        let instance = this, { syncEmitter, asyncEmitter, asyncOldValues, asyncKeypaths } = instance, 
        /**
         * 我们认为 $ 开头的变量是不可递归的
         * 比如浏览器中常见的 $0 表示当前选中元素
         * DOM 元素是不能递归的
         */
        isRecursive = codeAt(keypath) !== 36;
        diffWatcher(keypath, newValue, oldValue, syncEmitter.listeners, isRecursive, function (watchKeypath, keypath, newValue, oldValue) {
            syncEmitter.fire({
                type: watchKeypath,
                ns: EMPTY_STRING,
            }, [
                newValue,
                oldValue,
                keypath,
            ]);
        });
        /**
         * 此处有坑，举个例子
         *
         * observer.watch('a', function () {})
         *
         * observer.set('a', 1)
         *
         * observer.watch('a', function () {})
         *
         * 这里，第一个 watcher 应该触发，但第二个不应该，因为它绑定监听时，值已经是最新的了
         */
        diffWatcher(keypath, newValue, oldValue, asyncEmitter.listeners, isRecursive, function (watchKeypath, keypath, newValue, oldValue) {
            // 这里是为了解决上面说的坑
            const options = asyncEmitter.listeners[watchKeypath];
            for (let i = 0, length = options.length; i < length; i++) {
                options[i].count++;
            }
            if (!asyncKeypaths[keypath]) {
                asyncOldValues[keypath] = oldValue;
                asyncKeypaths[keypath] = {};
            }
            asyncKeypaths[keypath][watchKeypath] = TRUE$1;
            if (!instance.pending) {
                instance.pending = TRUE$1;
                instance.nextTask.append(function () {
                    if (instance.pending) {
                        instance.diffAsync();
                    }
                });
            }
        });
    }
    /**
     * 异步触发的 diff
     */
    diffAsync() {
        const instance = this, { asyncEmitter, asyncOldValues, asyncKeypaths } = instance;
        instance.pending = UNDEFINED$1;
        instance.asyncOldValues = {};
        instance.asyncKeypaths = {};
        for (let keypath in asyncOldValues) {
            const args = [
                instance.get(keypath),
                asyncOldValues[keypath],
                keypath,
            ], keypaths = asyncKeypaths[keypath], hasChange = args[0] !== args[1], filterWatcher = function (event, args, options) {
                // 前面递增了 count
                // 这里要递减 count
                // count > 0 表示前面标记了该监听器需要响应此次变化
                if (options.count) {
                    // 采用计数器的原因是，同一个 options 可能执行多次
                    // 比如监听 user.*，如果同批次修改了 user.name 和 user.age
                    // 这个监听器会调用多次，如果第一次执行就把 count 干掉了，第二次就无法执行了
                    options.count--;
                    // 新旧值不相等才能触发监听器
                    return hasChange;
                }
            };
            for (let watchKeypath in keypaths) {
                asyncEmitter.fire({
                    type: watchKeypath,
                    ns: EMPTY_STRING,
                }, args, filterWatcher);
            }
        }
    }
    /**
     * 添加计算属性
     *
     * @param keypath
     * @param options
     */
    addComputed(keypath, options) {
        let instance = this, context = instance.context, cache = TRUE$1, sync = TRUE$1, deps, input, getter, setter, output;
        // 这里用 bind 方法转换一下调用的 this
        // 还有一个好处，它比 call(context) 速度稍快一些
        if (func(options)) {
            getter = options.bind(context);
        }
        else if (object$1(options)) {
            const computedOptions = options;
            if (boolean(computedOptions.cache)) {
                cache = computedOptions.cache;
            }
            if (boolean(computedOptions.sync)) {
                sync = computedOptions.sync;
            }
            if (array$1(computedOptions.deps)) {
                deps = computedOptions.deps;
            }
            // 参数列表必须是长度大于 0 的数组
            if (!falsy$2(computedOptions.input)) {
                input = computedOptions.input;
            }
            if (func(computedOptions.output)) {
                output = computedOptions.output;
            }
            if (func(computedOptions.get)) {
                getter = computedOptions.get.bind(context);
            }
            if (func(computedOptions.set)) {
                setter = computedOptions.set.bind(context);
            }
        }
        if (getter) {
            const computed = new Computed(keypath, cache, sync, input, output, getter, setter, instance.onComputedChange);
            if (cache && deps) {
                computed.addStaticDeps(instance, deps);
            }
            return instance.data[keypath] = computed;
        }
    }
    /**
     * 移除计算属性
     *
     * @param keypath
     */
    removeComputed(keypath) {
        delete this.data[keypath];
    }
    /**
     * 监听数据变化
     *
     * @param keypath
     * @param watcher
     * @param immediate
     */
    watch(keypath, watcher, immediate) {
        const instance = this, { context, syncEmitter, asyncEmitter } = instance, addWatcher = function (keypath, options) {
            const emitter = options.sync ? syncEmitter : asyncEmitter, 
            // formatWatcherOptions 保证了 options.watcher 一定存在
            listener = {
                ns: EMPTY_STRING,
                listener: options.watcher,
                ctx: context,
                count: 0,
            };
            if (options.once) {
                listener.max = 1;
            }
            emitter.on(keypath, listener);
            if (options.immediate) {
                options.watcher.call(context, instance.get(keypath), UNDEFINED$1, keypath);
            }
        };
        if (string$1(keypath)) {
            addWatcher(keypath, formatWatcherOptions(watcher, immediate));
        }
        else {
            for (let key in keypath) {
                addWatcher(key, formatWatcherOptions(keypath[key]));
            }
        }
    }
    /**
     * 取消监听数据变化
     *
     * @param keypath
     * @param watcher
     */
    unwatch(keypath, watcher) {
        this.syncEmitter.off(keypath, watcher);
        this.asyncEmitter.off(keypath, watcher);
    }
    /**
     * 取反 keypath 对应的数据
     *
     * 不管 keypath 对应的数据是什么类型，操作后都是布尔型
     *
     * @param keypath
     * @return 取反后的布尔值
     */
    toggle(keypath) {
        const value = !this.get(keypath);
        this.set(keypath, value);
        return value;
    }
    /**
     * 递增 keypath 对应的数据
     *
     * 注意，最好是整型的加法，如果涉及浮点型，不保证计算正确
     *
     * @param keypath 值必须能转型成数字，如果不能，则默认从 0 开始递增
     * @param step 步进值，默认是 1
     * @param max 可以递增到的最大值，默认不限制
     */
    increase(keypath, step, max) {
        const value = toNumber(this.get(keypath), 0) + (step || 1);
        if (!number(max) || value <= max) {
            this.set(keypath, value);
            return value;
        }
    }
    /**
     * 递减 keypath 对应的数据
     *
     * 注意，最好是整型的减法，如果涉及浮点型，不保证计算正确
     *
     * @param keypath 值必须能转型成数字，如果不能，则默认从 0 开始递减
     * @param step 步进值，默认是 1
     * @param min 可以递减到的最小值，默认不限制
     */
    decrease(keypath, step, min) {
        const value = toNumber(this.get(keypath), 0) - (step || 1);
        if (!number(min) || value >= min) {
            this.set(keypath, value);
            return value;
        }
    }
    /**
     * 在数组指定位置插入元素
     *
     * @param keypath
     * @param item
     * @param index
     */
    insert(keypath, item, index) {
        let list = this.get(keypath);
        list = array$1(list) ? list.slice() : [];
        const { length } = list;
        if (index === TRUE$1 || index === length) {
            list.push(item);
        }
        else if (index === FALSE$1 || index === 0) {
            list.unshift(item);
        }
        else if (index > 0 && index < length) {
            list.splice(index, 0, item);
        }
        else {
            return;
        }
        this.set(keypath, list);
        return TRUE$1;
    }
    /**
     * 在数组尾部添加元素
     *
     * @param keypath
     * @param item
     */
    append(keypath, item) {
        return this.insert(keypath, item, TRUE$1);
    }
    /**
     * 在数组首部添加元素
     *
     * @param keypath
     * @param item
     */
    prepend(keypath, item) {
        return this.insert(keypath, item, FALSE$1);
    }
    /**
     * 通过索引移除数组中的元素
     *
     * @param keypath
     * @param index
     */
    removeAt(keypath, index) {
        let list = this.get(keypath);
        if (array$1(list)
            && index >= 0
            && index < list.length) {
            list = list.slice();
            list.splice(index, 1);
            this.set(keypath, list);
            return TRUE$1;
        }
    }
    /**
     * 直接移除数组中的元素
     *
     * @param keypath
     * @param item
     */
    remove(keypath, item) {
        let list = this.get(keypath);
        if (array$1(list)) {
            list = list.slice();
            if (remove$1(list, item)) {
                this.set(keypath, list);
                return TRUE$1;
            }
        }
    }
    /**
     * 拷贝任意数据，支持深拷贝
     *
     * @param data
     * @param deep
     */
    copy(data, deep) {
        return copy(data, deep);
    }
    /**
     * 销毁
     */
    destroy() {
        const instance = this;
        instance.syncEmitter.off();
        instance.asyncEmitter.off();
        instance.nextTask.clear();
        instance.data = {};
    }
}

class LifeCycle {
    constructor() {
        this.$emitter = new Emitter();
    }
    fire(component, type, data) {
        this.$emitter.fire(type, [
            component,
            data,
        ]);
    }
    on(type, listener) {
        this.$emitter.on(type, listener);
        return this;
    }
    off(type, listener) {
        this.$emitter.off(type, listener);
        return this;
    }
}
const globalDirectives = {}, globalTransitions = {}, globalComponents = {}, globalFilters = {}, selectorPattern = /^[#.][-\w+]+$/, lifeCycle = new LifeCycle(); createOneKeyCache(function (template) {
    const nodes = compile(template);
    return generate(nodes[0]);
}); const templateComputed = '$$template', templateComputedWatcher = {
    watcher(vnode) {
        this.update(vnode, this.$vnode);
    },
    sync: TRUE$1,
}, outputSlot = function (vnodes) {
    return vnodes
        ? vnodes.map(clone)
        : vnodes;
};
class Yox {
    constructor(options) {
        const instance = this, $options = options || EMPTY_OBJECT;
        // 为了冒泡 HOOK_BEFORE_CREATE 事件，必须第一时间创建 emitter
        // 监听各种事件
        // 支持命名空间
        instance.$emitter = new Emitter(TRUE$1);
        if ($options.events) {
            instance.on($options.events);
        }
        {
            // 当前组件的直接父组件
            if ($options.parent) {
                instance.$parent = $options.parent;
            }
            // 建立好父子连接后，立即触发钩子
            const beforeCreateHook = $options[HOOK_BEFORE_CREATE];
            if (beforeCreateHook) {
                beforeCreateHook.call(instance, $options);
            }
            lifeCycle.fire(instance, HOOK_BEFORE_CREATE, {
                options: $options,
            });
        }
        let { data, props, vnode, propTypes, computed, methods, watchers, extensions, } = $options;
        instance.$options = $options;
        if (extensions) {
            extend(instance, extensions);
        }
        // 数据源，默认值仅在创建组件时启用
        const source = props ? copy(props) : {};
        {
            if (propTypes) {
                each(propTypes, function (rule, key) {
                    let value = source[key];
                    if (value === UNDEFINED$1) {
                        value = rule.value;
                        if (value !== UNDEFINED$1) {
                            source[key] = rule.type === RAW_FUNCTION
                                ? value
                                : func(value)
                                    ? value()
                                    : value;
                        }
                    }
                });
            }
        }
        // 先放 props
        // 当 data 是函数时，可以通过 this.get() 获取到外部数据
        const observer = instance.$observer = new Observer(source, instance, instance.$nextTask = new NextTask());
        if (computed) {
            each(computed, function (options, keypath) {
                observer.addComputed(keypath, options);
            });
        }
        const extend$1 = func(data) ? data.call(instance, options) : data;
        if (object$1(extend$1)) {
            each(extend$1, function (value, key) {
                source[key] = value;
            });
        }
        if (methods) {
            each(methods, function (method, name) {
                instance[name] = method;
            });
        }
        {
            let placeholder = UNDEFINED$1, { el, root, model, context, replace, template, transitions, components, directives, filters, slots, } = $options;
            if (model) {
                instance.$model = model;
            }
            // 检查 template
            if (string$1(template)) {
                // 传了选择器，则取对应元素的 html
                if (selectorPattern.test(template)) {
                    placeholder = find(template);
                    if (placeholder) {
                        template = getHtml(placeholder);
                        placeholder = UNDEFINED$1;
                    }
                }
            }
            // 检查 el
            if (el) {
                if (string$1(el)) {
                    const selector = el;
                    if (selectorPattern.test(selector)) {
                        placeholder = find(selector);
                    }
                }
                else {
                    placeholder = el;
                }
                if (!replace) {
                    append(placeholder, placeholder = createComment(EMPTY_STRING));
                }
            }
            // 根组件
            if (root) {
                instance.$root = root;
            }
            // 当前组件是被哪个组件渲染出来的
            // 因为有 slot 机制，$context 不一定等于 $parent
            if (context) {
                instance.$context = context;
            }
            setOptionsSmartly(instance, RAW_TRANSITION, transitions);
            setOptionsSmartly(instance, RAW_COMPONENT, components);
            setOptionsSmartly(instance, RAW_DIRECTIVE, directives);
            setOptionsSmartly(instance, RAW_FILTER, filters);
            if (template) {
                if (watchers) {
                    observer.watch(watchers);
                }
                if (slots) {
                    for (let name in slots) {
                        observer.addComputed(name, {
                            get: slots[name],
                            input: [instance],
                            output: outputSlot,
                        });
                    }
                }
                observer.addComputed(templateComputed, {
                    get: instance.render,
                    sync: FALSE$1,
                });
                observer.watch(templateComputed, templateComputedWatcher);
                {
                    const afterCreateHook = $options[HOOK_AFTER_CREATE];
                    if (afterCreateHook) {
                        afterCreateHook.call(instance);
                    }
                    lifeCycle.fire(instance, HOOK_AFTER_CREATE);
                }
                // 编译模板
                // 在开发阶段，template 是原始的 html 模板
                // 在产品阶段，template 是编译后的渲染函数
                // 当然，具体是什么需要外部自己控制
                instance.$template = string$1(template)
                    ? Yox.compile(template)
                    : template;
                if (!vnode) {
                    vnode = create(domApi, placeholder, instance);
                }
                instance.update(instance.get(templateComputed), vnode);
                return;
            }
        }
        if (watchers) {
            observer.watch(watchers);
        }
        {
            const afterCreateHook = $options[HOOK_AFTER_CREATE];
            if (afterCreateHook) {
                afterCreateHook.call(instance);
            }
            lifeCycle.fire(instance, HOOK_AFTER_CREATE);
        }
    }
    /**
     * 定义组件对象
     */
    static define(options) {
        return options;
    }
    /**
     * 安装插件
     *
     * 插件必须暴露 install 方法
     */
    static use(plugin) {
        plugin.install(Yox);
    }
    /**
     * 因为组件采用的是异步更新机制，为了在更新之后进行一些操作，可使用 nextTick
     */
    static nextTick(task, context) {
        NextTask.shared().append(task, context);
    }
    /**
     * 编译模板，暴露出来是为了打包阶段的模板预编译
     */
    static compile(template, stringify) {
        {
            return template;
        }
    }
    /**
     * 注册全局指令
     */
    static directive(name, directive) {
        {
            if (string$1(name) && !directive) {
                return getResource(globalDirectives, name);
            }
            {
                setResourceSmartly(globalDirectives, name, directive);
            }
        }
    }
    /**
     * 注册全局过渡动画
     */
    static transition(name, transition) {
        {
            if (string$1(name) && !transition) {
                return getResource(globalTransitions, name);
            }
            {
                setResourceSmartly(globalTransitions, name, transition);
            }
        }
    }
    /**
     * 注册全局组件
     */
    static component(name, component) {
        {
            if (string$1(name) && !component) {
                return getResource(globalComponents, name);
            }
            {
                setResourceSmartly(globalComponents, name, component);
            }
        }
    }
    /**
     * 注册全局过滤器
     */
    static filter(name, filter) {
        {
            if (string$1(name) && !filter) {
                return getResource(globalFilters, name);
            }
            {
                setResourceSmartly(globalFilters, name, filter);
            }
        }
    }
    /**
     * 注册全局方法
     */
    static method(name, method) {
        if (string$1(name) && !method) {
            return YoxPrototype[name];
        }
        {
            setResourceSmartly(YoxPrototype, name, method);
        }
    }
    /**
     * 取值
     */
    get(keypath, defaultValue) {
        return this.$observer.get(keypath, defaultValue);
    }
    /**
     * 设值
     */
    set(keypath, value) {
        // 组件经常有各种异步改值，为了避免组件销毁后依然调用 set
        // 这里判断一下，至于其他方法的异步调用就算了，业务自己控制吧
        const { $observer } = this;
        if ($observer) {
            $observer.set(keypath, value);
        }
    }
    /**
     * 监听事件，支持链式调用
     */
    on(type, listener) {
        addEventSmartly(this, type, listener);
        return this;
    }
    /**
     * 监听一次事件，支持链式调用
     */
    once(type, listener) {
        addEventSmartly(this, type, listener, TRUE$1);
        return this;
    }
    /**
     * 取消监听事件，支持链式调用
     */
    off(type, listener) {
        this.$emitter.off(type, listener);
        return this;
    }
    /**
     * 发射事件
     */
    fire(type, data, downward) {
        // 外部为了使用方便，fire(type) 或 fire(type, data) 就行了
        // 内部为了保持格式统一
        // 需要转成 Event，这样还能知道 target 是哪个组件
        const instance = this, { $emitter, $parent, $children } = instance;
        // 生成事件对象
        let event;
        if (CustomEvent.is(type)) {
            event = type;
        }
        else if (string$1(type)) {
            event = new CustomEvent(type);
        }
        else {
            const emitterEvent = type;
            event = new CustomEvent(emitterEvent.type);
            event.ns = emitterEvent.ns;
        }
        // 先解析出命名空间，避免每次 fire 都要解析
        if (event.ns === UNDEFINED$1) {
            const emitterEvent = $emitter.toEvent(event.type);
            event.type = emitterEvent.type;
            event.ns = emitterEvent.ns;
        }
        // 告诉外部是谁发出的事件
        if (!event.target) {
            event.target = instance;
        }
        // 事件参数列表
        let args = [event], 
        // 事件是否正常结束（未被停止冒泡）
        isComplete;
        // 比如 fire('name', true) 直接向下发事件
        if (object$1(data)) {
            push(args, data);
        }
        else if (data === TRUE$1) {
            downward = TRUE$1;
        }
        // 向上发事件会经过自己
        // 如果向下发事件再经过自己，就产生了一次重叠
        // 这是没有必要的，而且会导致向下发事件时，外部能接收到该事件，但我们的本意只是想让子组件接收到事件
        isComplete = downward && event.target === instance
            ? TRUE$1
            : $emitter.fire(event, args);
        if (isComplete) {
            if (downward) {
                if ($children) {
                    event.phase = CustomEvent.PHASE_DOWNWARD;
                    each$2($children, function (child) {
                        return isComplete = child.fire(event, data, TRUE$1);
                    });
                }
            }
            else if ($parent) {
                event.phase = CustomEvent.PHASE_UPWARD;
                isComplete = $parent.fire(event, data);
            }
        }
        return isComplete;
    }
    /**
     * 监听数据变化，支持链式调用
     */
    watch(keypath, watcher, immediate) {
        this.$observer.watch(keypath, watcher, immediate);
        return this;
    }
    /**
     * 取消监听数据变化，支持链式调用
     */
    unwatch(keypath, watcher) {
        this.$observer.unwatch(keypath, watcher);
        return this;
    }
    /**
     * 加载组件，组件可以是同步或异步，最后会调用 callback
     *
     * @param name 组件名称
     * @param callback 组件加载成功后的回调
     */
    loadComponent(name, callback) {
        {
            if (!loadComponent(this.$components, name, callback)) {
                {
                    loadComponent(globalComponents, name, callback);
                }
            }
        }
    }
    /**
     * 创建子组件
     *
     * @param options 组件配置
     * @param vnode 虚拟节点
     */
    createComponent(options, vnode) {
        {
            const instance = this;
            options = copy(options);
            options.root = instance.$root || instance;
            options.parent = instance;
            options.context = vnode.context;
            options.vnode = vnode;
            options.replace = TRUE$1;
            let { props, slots, model } = vnode;
            if (model) {
                if (!props) {
                    props = {};
                }
                const key = options.model || MODEL_PROP_DEFAULT;
                props[key] = model.value;
                options.model = key;
            }
            if (props) {
                options.props = props;
            }
            if (slots) {
                options.slots = slots;
            }
            const child = new Yox(options);
            push(instance.$children || (instance.$children = []), child);
            const node = child.$el;
            if (node) {
                vnode.node = node;
            }
            return child;
        }
    }
    /**
     * 注册当前组件级别的指令
     */
    directive(name, directive) {
        {
            const instance = this, { $directives } = instance;
            if (string$1(name) && !directive) {
                return getResource($directives, name, Yox.directive);
            }
            {
                setResourceSmartly($directives || (instance.$directives = {}), name, directive);
            }
        }
    }
    /**
     * 注册当前组件级别的过渡动画
     */
    transition(name, transition) {
        {
            const instance = this, { $transitions } = instance;
            if (string$1(name) && !transition) {
                return getResource($transitions, name, Yox.transition);
            }
            {
                setResourceSmartly($transitions || (instance.$transitions = {}), name, transition);
            }
        }
    }
    /**
     * 注册当前组件级别的组件
     */
    component(name, component) {
        {
            const instance = this, { $components } = instance;
            if (string$1(name) && !component) {
                return getResource($components, name, Yox.component);
            }
            {
                setResourceSmartly($components || (instance.$components = {}), name, component);
            }
        }
    }
    /**
     * 注册当前组件级别的过滤器
     */
    filter(name, filter) {
        {
            const instance = this, { $filters } = instance;
            if (string$1(name) && !filter) {
                return getResource($filters, name, Yox.filter);
            }
            {
                setResourceSmartly($filters || (instance.$filters = {}), name, filter);
            }
        }
    }
    /**
     * 对于某些特殊场景，修改了数据，但是模板的依赖中并没有这一项
     * 而你非常确定需要更新模板，强制刷新正是你需要的
     */
    forceUpdate(props) {
        {
            const instance = this, { $options, $vnode, $nextTask } = instance;
            if ($vnode) {
                if (props) {
                    const beforePropsUpdateHook = $options[HOOK_BEFORE_PROPS_UPDATE];
                    if (beforePropsUpdateHook) {
                        beforePropsUpdateHook.call(instance, props);
                    }
                    instance.set(props);
                }
                // 当前可能正在进行下一轮更新
                $nextTask.run();
                // 没有更新模板，强制刷新
                if (!props && $vnode === instance.$vnode) {
                    instance.update(instance.get(templateComputed), $vnode);
                }
            }
        }
    }
    /**
     * 把模板抽象语法树渲染成 virtual dom
     */
    render() {
        {
            const instance = this, { $options, $observer } = instance, { data } = $observer, beforeRenderHook = $options[HOOK_BEFORE_RENDER], afterRenderHook = $options[HOOK_AFTER_RENDER];
            if (beforeRenderHook) {
                beforeRenderHook.call(instance, data);
            }
            lifeCycle.fire(instance, HOOK_BEFORE_RENDER, {
                props: data,
            });
            const result = render(instance, instance.$template, data, instance.$filters, globalFilters, instance.$directives, globalDirectives, instance.$transitions, globalTransitions, function (keypath) {
                // 事件、指令触发时调用方法，Computed.current 为空
                // 其他情况不为空
                const { current } = Computed;
                if (current) {
                    current.addDynamicDep($observer, keypath);
                }
            });
            if (afterRenderHook) {
                afterRenderHook.call(instance);
            }
            lifeCycle.fire(instance, HOOK_AFTER_RENDER);
            return result;
        }
    }
    /**
     * 更新 virtual dom
     *
     * @param vnode
     * @param oldVNode
     */
    update(vnode, oldVNode) {
        {
            let instance = this, { $vnode, $options } = instance, afterHookName;
            if ($vnode) {
                const beforeUpdateHook = $options[HOOK_BEFORE_UPDATE];
                if (beforeUpdateHook) {
                    beforeUpdateHook.call(instance);
                }
                lifeCycle.fire(instance, HOOK_BEFORE_UPDATE);
                patch(domApi, vnode, oldVNode);
                afterHookName = HOOK_AFTER_UPDATE;
            }
            else {
                const beforeMountHook = $options[HOOK_BEFORE_MOUNT];
                if (beforeMountHook) {
                    beforeMountHook.call(instance);
                }
                lifeCycle.fire(instance, HOOK_BEFORE_MOUNT);
                patch(domApi, vnode, oldVNode);
                instance.$el = vnode.node;
                afterHookName = HOOK_AFTER_MOUNT;
            }
            instance.$vnode = vnode;
            // 跟 nextTask 保持一个节奏
            // 这样可以预留一些优化的余地
            Yox.nextTick(function () {
                if (instance.$vnode) {
                    const afterHook = $options[afterHookName];
                    if (afterHook) {
                        afterHook.call(instance);
                    }
                    lifeCycle.fire(instance, afterHookName);
                }
            });
        }
    }
    /**
     * 校验组件参数
     *
     * @param props
     */
    checkProp(key, value) {
    }
    /**
     * 销毁组件
     */
    destroy() {
        const instance = this, { $parent, $options, $emitter, $observer } = instance;
        {
            const beforeDestroyHook = $options[HOOK_BEFORE_DESTROY];
            if (beforeDestroyHook) {
                beforeDestroyHook.call(instance);
            }
            lifeCycle.fire(instance, HOOK_BEFORE_DESTROY);
            if ($parent && $parent.$children) {
                remove$1($parent.$children, instance);
            }
            const { $vnode } = instance;
            if ($vnode) {
                destroy(domApi, $vnode, !$parent);
            }
        }
        $observer.destroy();
        {
            const afterDestroyHook = $options[HOOK_AFTER_DESTROY];
            if (afterDestroyHook) {
                afterDestroyHook.call(instance);
            }
            lifeCycle.fire(instance, HOOK_AFTER_DESTROY);
        }
        // 发完 after destroy 事件再解绑所有事件
        $emitter.off();
        instance.$el = UNDEFINED$1;
    }
    /**
     * 因为组件采用的是异步更新机制，为了在更新之后进行一些操作，可使用 nextTick
     */
    nextTick(task) {
        this.$nextTask.append(task, this);
    }
    /**
     * 取反 keypath 对应的数据
     *
     * 不管 keypath 对应的数据是什么类型，操作后都是布尔型
     */
    toggle(keypath) {
        return this.$observer.toggle(keypath);
    }
    /**
     * 递增 keypath 对应的数据
     *
     * 注意，最好是整型的加法，如果涉及浮点型，不保证计算正确
     *
     * @param keypath 值必须能转型成数字，如果不能，则默认从 0 开始递增
     * @param step 步进值，默认是 1
     * @param max 可以递增到的最大值，默认不限制
     */
    increase(keypath, step, max) {
        return this.$observer.increase(keypath, step, max);
    }
    /**
     * 递减 keypath 对应的数据
     *
     * 注意，最好是整型的减法，如果涉及浮点型，不保证计算正确
     *
     * @param keypath 值必须能转型成数字，如果不能，则默认从 0 开始递减
     * @param step 步进值，默认是 1
     * @param min 可以递减到的最小值，默认不限制
     */
    decrease(keypath, step, min) {
        return this.$observer.decrease(keypath, step, min);
    }
    /**
     * 在数组指定位置插入元素
     *
     * @param keypath
     * @param item
     * @param index
     */
    insert(keypath, item, index) {
        return this.$observer.insert(keypath, item, index);
    }
    /**
     * 在数组尾部添加元素
     *
     * @param keypath
     * @param item
     */
    append(keypath, item) {
        return this.$observer.append(keypath, item);
    }
    /**
     * 在数组首部添加元素
     *
     * @param keypath
     * @param item
     */
    prepend(keypath, item) {
        return this.$observer.prepend(keypath, item);
    }
    /**
     * 通过索引移除数组中的元素
     *
     * @param keypath
     * @param index
     */
    removeAt(keypath, index) {
        return this.$observer.removeAt(keypath, index);
    }
    /**
     * 直接移除数组中的元素
     *
     * @param keypath
     * @param item
     */
    remove(keypath, item) {
        return this.$observer.remove(keypath, item);
    }
    /**
     * 拷贝任意数据，支持深拷贝
     *
     * @param data
     * @param deep
     */
    copy(data, deep) {
        return this.$observer.copy(data, deep);
    }
}
/**
 * core 版本
 */
Yox.version = "1.0.0-alpha.408";
/**
 * 方便外部共用的通用逻辑，特别是写插件，减少重复代码
 */
Yox.is = is;
Yox.dom = domApi;
Yox.array = array;
Yox.object = object;
Yox.string = string;
Yox.logger = logger;
Yox.Event = CustomEvent;
Yox.Emitter = Emitter;
Yox.lifeCycle = lifeCycle;
/**
 * 外部可配置的对象
 */
Yox.config = PUBLIC_CONFIG;
const YoxPrototype = Yox.prototype;
// 内置方法，外部不可覆盖
toObject(keys(YoxPrototype));
function loadComponent(registry, name, callback) {
    if (registry && registry[name]) {
        const component = registry[name];
        // 注册的是异步加载函数
        if (func(component)) {
            registry[name] = [callback];
            const componentCallback = function (result) {
                const queue = registry[name], options = result['default'] || result;
                registry[name] = options;
                each$2(queue, function (callback) {
                    callback(options);
                });
            }, promise = component(componentCallback);
            if (promise) {
                promise.then(componentCallback);
            }
        }
        // 正在加载中
        else if (array$1(component)) {
            push(component, callback);
        }
        // 不是异步加载函数，直接同步返回
        else {
            callback(component);
        }
        return TRUE$1;
    }
}
function getResource(registry, name, lookup) {
    if (registry && registry[name]) {
        return registry[name];
    }
    else if (lookup) {
        return lookup(name);
    }
}
function setResourceItem(registry, name, value, options) {
    if (options && options.format) {
        value = options.format(value);
    }
    registry[name] = value;
}
function setResourceSmartly(registry, name, value, options) {
    if (string$1(name)) {
        setResourceItem(registry, name, value, options);
    }
    else {
        each(name, function (value, key) {
            setResourceItem(registry, key, value, options);
        });
    }
}
function setOptionsSmartly(instance, key, value) {
    if (func(value)) {
        instance[key](value.call(instance));
    }
    else if (object$1(value)) {
        instance[key](value);
    }
}
function addEvent(instance, options, once) {
    instance.$emitter.on(options.type, {
        listener: options.listener,
        ns: options.ns,
        max: once ? 1 : -1,
        ctx: instance,
    });
}
function addEventSmartly(instance, type, listener, once) {
    const { $emitter } = instance;
    if (string$1(type)) {
        addEvent(instance, $emitter.toFilter(type, listener), once);
    }
    else if (array$1(type)) {
        each$2(type, function (filter) {
            addEvent(instance, filter, once);
        });
    }
    else {
        each(type, function (value, key) {
            addEvent(instance, $emitter.toFilter(key, value), once);
        });
    }
}

export default Yox;
//# sourceMappingURL=yox.esm.js.map
