(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('react')) :
  typeof define === 'function' && define.amd ? define(['exports', 'react'], factory) :
  (factory((global.concent = {}),global.React));
}(this, (function (exports,React) { 'use strict';

  var _ERR_MESSAGE;

  var MODULE_GLOBAL = '$$global';
  var MODULE_DEFAULT = '$$default';
  var MODULE_CC = '$$cc'; // do not consider symbol as MODULE_VOID

  var MODULE_VOID = '$$concent_void_module_624313307';
  var MODULE_CC_ROUTER = '$$CONCENT_ROUTER'; // get val from callback or event

  var AUTO_VAL = Symbol('__aval__'); // component type

  var CC_CLASS = '$$CcClass';
  var CC_HOOK = '$$CcHook'; // component ins type

  /** use CcFragment initialize a component instance in jsx directly */

  var CC_FRAGMENT = '$$CcFrag';
  /** use Ob to initialize a component instance in jsx directly */

  var CC_OB = '$$CcOb';
  /**
   * use api register、useConcent to create component firstly, 
   * then use the customized component to initialize a component instance in jsx
   */

  var CC_CUSTOMIZE = '$$CcCust';
  var CC_PREFIX = '$$Cc';
  var CC_DISPATCHER = '$$Dispatcher';
  var CCSYNC_KEY = Symbol('__for_sync_param_ccsync__');
  var SIG_FN_START = 10;
  var SIG_FN_END = 11;
  var SIG_FN_QUIT = 12;
  var SIG_FN_ERR = 13;
  var SIG_MODULE_CONFIGURED = 14;
  var SIG_STATE_CHANGED = 15;
  var SIG_ASYNC_COMPUTED_START = 30;
  var SIG_ASYNC_COMPUTED_END = 31;
  var SIG_ASYNC_COMPUTED_ERR = 32;
  var SIG_ASYNC_COMPUTED_BATCH_START = 33;
  var SIG_ASYNC_COMPUTED_BATCH_END = 34;
  var RENDER_NO_OP = 1;
  var RENDER_BY_KEY = 2;
  var RENDER_BY_STATE = 3;
  var FOR_CUR_MOD = 1;
  var FOR_ANOTHER_MOD = 2; // 暂时用不到
  // export const EFFECT_AVAILABLE = 1;
  // export const EFFECT_STOPPED = 0;

  var DISPATCH = 'dispatch';
  var SET_STATE = 'setState';
  var SET_MODULE_STATE = 'setModuleState';
  var FORCE_UPDATE = 'forceUpdate';
  var INVOKE = 'invoke';
  var SYNC = 'sync';
  var CATE_MODULE = 'module';
  var CATE_REF = 'ref';
  var FN_CU = 'computed';
  var FN_WATCH = 'watch';
  var ERR = {
    CC_MODULE_NAME_DUPLICATE: 1002,
    CC_MODULE_NOT_FOUND: 1012,
    CC_DISPATCH_STRING_INVALID: 1013,
    CC_DISPATCH_PARAM_INVALID: 1014,
    CC_MODULE_NOT_CONNECTED: 1015,
    CC_CLASS_KEY_DUPLICATE: 1100,
    CC_CLASS_INSTANCE_KEY_DUPLICATE: 1200,
    CC_STORED_KEYS_NEED_CCKEY: 1207,
    CC_REDUCER_NOT_A_FUNCTION: 1503
  };
  var ERR_MESSAGE = (_ERR_MESSAGE = {}, _ERR_MESSAGE[ERR.CC_MODULE_NAME_DUPLICATE] = 'module name duplicate!', _ERR_MESSAGE[ERR.CC_MODULE_NOT_FOUND] = "module not found!", _ERR_MESSAGE[ERR.CC_DISPATCH_STRING_INVALID] = "when type param is string, it must be one of these format: (fnName)\u3001(moduleName)/(fnName)", _ERR_MESSAGE[ERR.CC_DISPATCH_PARAM_INVALID] = "dispatch param type is invalid, it must be string or object", _ERR_MESSAGE[ERR.CC_MODULE_NOT_CONNECTED] = "module not been connected by ref", _ERR_MESSAGE[ERR.CC_CLASS_INSTANCE_KEY_DUPLICATE] = "props.ccKey duplicate", _ERR_MESSAGE[ERR.CC_STORED_KEYS_NEED_CCKEY] = 'you must explicitly specify a ccKey for ccInstance when set storedKeys!', _ERR_MESSAGE[ERR.CC_CLASS_KEY_DUPLICATE] = 'ccClassKey duplicate!', _ERR_MESSAGE[ERR.CC_REDUCER_NOT_A_FUNCTION] = "reducer must be a function!", _ERR_MESSAGE);
  var NOT_MOUNT = 1;
  var MOUNTED = 2; // 已挂载未卸载

  var UNMOUNTED = 3;

  var _cst = /*#__PURE__*/Object.freeze({
    MODULE_GLOBAL: MODULE_GLOBAL,
    MODULE_DEFAULT: MODULE_DEFAULT,
    MODULE_CC: MODULE_CC,
    MODULE_VOID: MODULE_VOID,
    MODULE_CC_ROUTER: MODULE_CC_ROUTER,
    AUTO_VAL: AUTO_VAL,
    CC_CLASS: CC_CLASS,
    CC_HOOK: CC_HOOK,
    CC_FRAGMENT: CC_FRAGMENT,
    CC_OB: CC_OB,
    CC_CUSTOMIZE: CC_CUSTOMIZE,
    CC_PREFIX: CC_PREFIX,
    CC_DISPATCHER: CC_DISPATCHER,
    CCSYNC_KEY: CCSYNC_KEY,
    SIG_FN_START: SIG_FN_START,
    SIG_FN_END: SIG_FN_END,
    SIG_FN_QUIT: SIG_FN_QUIT,
    SIG_FN_ERR: SIG_FN_ERR,
    SIG_MODULE_CONFIGURED: SIG_MODULE_CONFIGURED,
    SIG_STATE_CHANGED: SIG_STATE_CHANGED,
    SIG_ASYNC_COMPUTED_START: SIG_ASYNC_COMPUTED_START,
    SIG_ASYNC_COMPUTED_END: SIG_ASYNC_COMPUTED_END,
    SIG_ASYNC_COMPUTED_ERR: SIG_ASYNC_COMPUTED_ERR,
    SIG_ASYNC_COMPUTED_BATCH_START: SIG_ASYNC_COMPUTED_BATCH_START,
    SIG_ASYNC_COMPUTED_BATCH_END: SIG_ASYNC_COMPUTED_BATCH_END,
    RENDER_NO_OP: RENDER_NO_OP,
    RENDER_BY_KEY: RENDER_BY_KEY,
    RENDER_BY_STATE: RENDER_BY_STATE,
    FOR_CUR_MOD: FOR_CUR_MOD,
    FOR_ANOTHER_MOD: FOR_ANOTHER_MOD,
    DISPATCH: DISPATCH,
    SET_STATE: SET_STATE,
    SET_MODULE_STATE: SET_MODULE_STATE,
    FORCE_UPDATE: FORCE_UPDATE,
    INVOKE: INVOKE,
    SYNC: SYNC,
    CATE_MODULE: CATE_MODULE,
    CATE_REF: CATE_REF,
    FN_CU: FN_CU,
    FN_WATCH: FN_WATCH,
    ERR: ERR,
    ERR_MESSAGE: ERR_MESSAGE,
    NOT_MOUNT: NOT_MOUNT,
    MOUNTED: MOUNTED,
    UNMOUNTED: UNMOUNTED
  });

  var _moduleName2stateKeys;
  /**
   * 为避免cc-context文件里调用的方法和自身产生循环引用，将moduleName_stateKeys_单独拆开放置到此文件
   * 如果还有别的类似循环引用产生，都可以像moduleName_stateKeys_一样单独拆出来放置为一个文件
   */

  var moduleName2stateKeys = (_moduleName2stateKeys = {}, _moduleName2stateKeys[MODULE_DEFAULT] = [], _moduleName2stateKeys); // 映射好模块的状态所有key并缓存住，用于提高性能

  var _computedValues2, _computedRawValues2;

  var _computedValues = (_computedValues2 = {}, _computedValues2[MODULE_GLOBAL] = {}, _computedValues2[MODULE_DEFAULT] = {}, _computedValues2[MODULE_CC] = {}, _computedValues2[MODULE_VOID] = {}, _computedValues2);

  var _computedRawValues = (_computedRawValues2 = {}, _computedRawValues2[MODULE_GLOBAL] = {}, _computedRawValues2[MODULE_DEFAULT] = {}, _computedRawValues2[MODULE_CC] = {}, _computedRawValues2[MODULE_VOID] = {}, _computedRawValues2);

  var _computedDep = {};
  var _computedRaw = {};
  var computedMap = {
    _computedRawValues: _computedRawValues,
    // 在 init-module-computed 时，会将key对应的值赋为经defineProperty处理过的对象
    _computedValues: _computedValues,
    _computedRaw: _computedRaw,
    _computedDep: _computedDep,
    getRootComputedValue: function getRootComputedValue() {
      return _computedValues;
    },
    getRootComputedDep: function getRootComputedDep() {
      return _computedDep;
    },
    getRootComputedRaw: function getRootComputedRaw() {
      return _computedRaw;
    }
  };

  /** watch section */
  var _watchDep = {};
  var _watchRaw = {};
  var watch = {
    _watchRaw: _watchRaw,
    _watchDep: _watchDep,
    getRootWatchDep: function getRootWatchDep() {
      return _watchDep;
    },
    getRootWatchRaw: function getRootWatchRaw() {
      return _watchRaw;
    }
  };

  // 后续在逐步迁移其他的
  var rv = {
    asyncCuKeys: [],
    // if isStrict is true, every error will be throw out instead of console.error, 
    // but this may crash your app, make sure you have a nice error handling way,
    // like componentDidCatch in react 16.*
    isStrict: false,
    isDebug: false,
    unsafe_moveReducerErrToErrorHandler: false,
    log: true,
    alwaysRenderCaller: true,
    computedCompare: false,
    // 针对object值的比较规则
    watchCompare: false,
    // 针对object值的比较规则
    watchImmediate: false,
    bindCtxToMethod: false,
    extractModuleChangedState: true,
    extractRefChangedState: false,
    // 对于triggerReactSetState调用，当judgeStateChangedForRef为true时，触发__$$ccSetState 前，提取真正发生变化的值
    // 对于saveSharedState调用，提取真正发生变化的值作为sharedState，透传给其他实例
    // object类型值的比较规则默认是 false
    // false: 不比较，只要set了就提取出来
    // true: 比较，只有和前一刻的值不一样就提取出来
    objectValueCompare: false,
    // 非object类型值的比较规则默认是 true，
    // false: 不比较，只要set了就提取出来
    // true: 只有和前一刻的值不一样就提取出来
    nonObjectValueCompare: true
  };

  function _extends() {
    _extends = Object.assign || function (target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];

        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }

      return target;
    };

    return _extends.apply(this, arguments);
  }

  var CU_KEY = Symbol('cuk');
  var ALCC_KEY = Symbol('allowCcPrefix');
  var UNSTART = '0';
  var START = '1';
  var END = '2';
  var FN = 'function';
  var OBJ = 'object';
  var INAF = "is not a " + FN;
  var INAJ = 'is not a plain json object!';
  var STR_ARR_OR_STAR = 'should be an string array or *!';

  var cer = function cer() {
    return rv.log && logErr.apply(void 0, arguments);
  };

  var protoToString = Object.prototype.toString;
  function logErr() {
    var _console;

    (_console = console).error.apply(_console, arguments);
  }
  function logWarn() {
    var _console2;

    (_console2 = console).warn.apply(_console2, arguments);
  }
  function logNormal() {
    var _console3;

    (_console3 = console).log.apply(_console3, arguments);
  }
  function noop() {}
  function isLocal() {
    return window && window.location && window.location.port;
  }
  function isValueNotNull(value) {
    return !(value === null || value === undefined);
  }
  function isObjectNotNull(object) {
    if (object === null || object === undefined) {
      return false;
    }

    if (okeys(object).length > 0) {
      return true;
    }

    return false;
  }
  function isObjectNull(object) {
    return !isObjectNotNull(object);
  }
  function isBool(val) {
    return typeof val === 'boolean';
  }
  function isObject(obj) {
    if (!obj) return false; // undefined null etc...

    var str = protoToString.call(obj); // !!!编译后的对象可能重写了toStringTag Symbol(Symbol.toStringTag): "Module"

    return str === '[object Object]' || str === '[object Module]';
  }
  function isArray(obj) {
    return Array.isArray(obj);
  } // isPJO is short of isPlainJsonObject

  function isPJO(obj, canBeArray) {
    if (canBeArray === void 0) {
      canBeArray = false;
    }

    var isArr = isArray(obj);
    var isObj = isObject(obj);
    return canBeArray ? isArr || isObj : isObj;
  }
  function isFn(maybeFn) {
    return typeof maybeFn === FN;
  }
  function isAsyncFn(fn, asyncKey) {
    if (!fn) return false; // @see https://github.com/tj/co/blob/master/index.js
    // obj.constructor.name === 'AsyncFunction'

    var isAsync = protoToString.call(fn) === '[object AsyncFunction]' || isFn(fn.then);

    if (isAsync === true) {
      return true;
    } // 有可能成降级编译成 __awaiter格式的了 或者 _regenerator


    var fnStr = fn.toString();

    if (fnStr.indexOf('_awaiter') >= 0 || fnStr.indexOf('_regenerator') >= 0) {
      return true;
    }
    /**
     * 上面的判定过程目前对这种编译结果是无效的，
     * function asyncFn(_x, _x2, _x3) {
     *     return _asyncFn.apply(this, arguments);
     *  }
     * 所以要求用户传入相应的asyncKeys来辅助判断，由runOptins里传入
     */


    if (asyncKey && rv.asyncCuKeys.includes(asyncKey)) {
      return true;
    }

    return false;
  } // 0 算有效值, undefined null ''算空值

  function isEmptyVal(val) {
    return !val && val !== 0;
  }
  function isKeyValid(obj, key) {
    return typeof key !== "symbol" && Object.prototype.hasOwnProperty.call(obj, key);
  } // renderKey 可能是 IDispatchOptions

  function extractRenderKey(renderKey) {
    var getRkey = function getRkey(key) {
      if (!key && key !== 0) return [];
      if (isArray(key)) return key;
      return null;
    };

    var targetRenderKey = getRkey(renderKey);
    if (targetRenderKey) return targetRenderKey;
    if (typeof renderKey === 'object') targetRenderKey = getRkey(renderKey.renderKey);
    if (targetRenderKey) return targetRenderKey;
    return [renderKey]; // 是一个具体的string 或 number
  }
  function makeError(code, extraMessage) {
    var message = '';
    if (typeof code === 'string') message = code;else {
      message = ERR_MESSAGE[code] || '';
    }
    if (extraMessage) message += extraMessage;
    if (!message) message = "undefined message for code:" + code;
    var error = new Error(message);
    error.code = code;
    return error;
  }
  function makeCuPackedValue(isLazy, result, needCompute, fn, newState, oldState, fnCtx) {
    var _ref;

    return _ref = {}, _ref[CU_KEY] = 1, _ref.needCompute = needCompute, _ref.fn = fn, _ref.newState = newState, _ref.oldState = oldState, _ref.fnCtx = fnCtx, _ref.isLazy = isLazy, _ref.result = result, _ref;
  }
  function makeCuDepDesc() {
    return {
      retKey2fn: {},
      retKey2lazy: {},
      stateKey2retKeys: {},
      // 用于辅助依赖收集系统更新依赖之用，render逻辑书写 refCompute.*** moduleCompted.*** connectedCompute.yy.** 时触发
      retKey2stateKeys: {},
      fnCount: 0
    };
  }
  /** make ccClassContext */

  function makeCcClassContext(module, ccClassKey, renderKeyClasses) {
    return {
      module: module,
      ccClassKey: ccClassKey,
      renderKeyClasses: renderKeyClasses
    };
  } // !!! different ccClass enable own a same key

  function makeUniqueCcKey(ccClassKey, featureStr) {
    return ccClassKey + "$" + featureStr;
  }
  function makeHandlerKey(ccUniqueKey, eventName, identity) {
    return ccUniqueKey + "$" + eventName + "$" + identity;
  }
  function isModuleNameValid(moduleName) {
    if (!moduleName) return false;
    return /^[\$\#\&a-zA-Z0-9_-]+$/.test(moduleName);
  }
  function isModuleNameCcLike(moduleName) {
    var name = moduleName.toLowerCase();
    return name.startsWith(MODULE_CC);
  }
  function verboseInfo(info) {
    return info ? " --verbose-info: " + info : '';
  }
  function ccClassDisplayName(className) {
    return "CC(" + className + ")";
  }
  function verifyKeys(keys1, keys2) {
    var duplicate = false,
        notArray = false,
        keyElementNotString = false;
    if (!isArray(keys1)) return {
      duplicate: duplicate,
      notArray: true,
      keyElementNotString: keyElementNotString
    };
    if (!isArray(keys2)) return {
      duplicate: duplicate,
      notArray: true,
      keyElementNotString: keyElementNotString
    };
    var len1 = keys1.length;
    var len2 = keys2.length;

    outLoop: for (var i = 0; i < len1; i++) {
      var tmpKey = keys1[i];

      if (typeof tmpKey !== 'string') {
        keyElementNotString = true;
        break outLoop;
      }

      for (var j = 0; j < len2; j++) {
        var tmpKey2 = keys2[j];

        if (typeof tmpKey2 !== 'string') {
          keyElementNotString = true;
          break outLoop;
        }

        if (tmpKey2 === tmpKey) {
          duplicate = true;
          break outLoop;
        }
      }
    }

    return {
      duplicate: duplicate,
      notArray: notArray,
      keyElementNotString: keyElementNotString
    };
  }
  function color(color) {
    if (color === void 0) {
      color = 'green';
    }

    return "color:" + color + ";border:1px solid " + color;
  }
  function styleStr(str) {
    return "%c" + str;
  }

  var tipStart = function tipStart(str) {
    return "------------ CC " + str + " ------------";
  };

  function justWarning(err) {
    cer(tipStart('WARNING'));

    if (err instanceof Error) {
      cer(err.message);
      cer(err.stack);
    } else {
      cer(err);
    }
  }
  function justTip(msg, tipColor) {
    if (tipColor === void 0) {
      tipColor = 'green';
    }

    if (!rv.log) return;
    console.log(tipStart('TIP'));
    console.log("%c" + msg, "color:" + tipColor + ";border:1px solid " + tipColor + ";");
  }
  function strictWarning(err) {
    cer(tipStart('WARNING'));
    cer(err);

    if (rv.isStrict) {
      throw err;
    }
  }
  function safeAdd(object, key, toAdd) {
    try {
      object[key] += toAdd;
    } catch (err) {
      object[key] = toAdd;
    }
  }
  function safeMinus(object, key, toMinus) {
    try {
      object[key] -= toMinus;
    } catch (err) {
      object[key] = 0;
    }
  }
  function safeGet(object, key, defaultVal) {
    if (defaultVal === void 0) {
      defaultVal = {};
    }

    var childrenObject = object[key];

    if (!childrenObject) {
      childrenObject = object[key] = defaultVal;
    }

    return childrenObject;
  }
  function safeGetArray(object, key, defaultVal) {
    if (defaultVal === void 0) {
      defaultVal = [];
    }

    return safeGet(object, key, defaultVal);
  }
  function noDupPush(arr, strItem) {
    if (!arr.includes(strItem)) arr.push(strItem);
  }
  function safeGetThenNoDupPush(object, key, strItem) {
    var arr = safeGetArray(object, key);
    noDupPush(arr, strItem);
  }
  function safeAssignObjectValue(assignTo, assignFrom) {
    okeys(assignFrom).forEach(function (key) {
      assignTo[key] = assignFrom[key];
    });
  }
  /**
   * 把某个object赋值到container[key]的map下，map存在就直接赋值，map不存在则先创建再赋值，确保map引用无变化
   * @param {*} container 对象容器
   * @param {*} key 字段名
   * @param {*} objectToBeenAssign 等待赋值的object
   */

  function safeAssignToMap(container, key, objectToBeenAssign) {
    var map = container[key];
    if (!map) map = container[key] = {};
    safeAssignObjectValue(map, objectToBeenAssign);
  }
  function computeFeature(ccUniqueKey, state) {
    var stateKeys = okeys(state);
    var stateKeysStr = stateKeys.sort().join('|');
    return ccUniqueKey + "/" + stateKeysStr;
  }
  function randomNumber(lessThan) {
    if (lessThan === void 0) {
      lessThan = 52;
    }

    var seed = Math.random();
    return parseInt(seed * lessThan);
  } // 在 object[key]存在且deepClear为true时，传入的reset会被忽略
  // 传入deepClear是为了保持引用不变

  function clearObject(object, excludeKeys, reset, deepClear) {
    if (excludeKeys === void 0) {
      excludeKeys = [];
    }

    if (deepClear === void 0) {
      deepClear = false;
    }

    if (isArray(object)) {
      var retainKeys = [];
      excludeKeys.forEach(function (key) {
        if (object.includes(key)) retainKeys.push(key);
      });
      object.length = 0;
      retainKeys.forEach(function (key) {
        return object.push(key);
      });
      return;
    }

    okeys(object).forEach(function (key) {
      if (excludeKeys.includes(key)) {
        // do nothing
        return;
      }

      var subMap = object[key];

      if (deepClear && subMap) {
        okeys(subMap).forEach(function (key) {
          return delete subMap[key];
        });
      } else {
        if (reset) object[key] = reset;else delete object[key];
      }
    });
  }
  function okeys(obj) {
    return Object.keys(obj);
  }
  function convertToStandardEvent(e) {
    var ret = null; // avoid Warning: This synthetic event is reused for performance reasons. If you're seeing this...
    // call e.persist() @see https://reactjs.org/docs/events.html#event-pooling

    if (e) {
      if (e.persist) e.persist();

      if (e.currentTarget && e.type) {
        ret = e;
      } else if (e.nativeEvent && e.target) {
        e.currentTarget = e.target;
        ret = e;
      }
    }

    return ret;
  }
  function bindToContainer(key, toBindObj, targetContainerObj) {
    if (targetContainerObj) targetContainerObj[key] = toBindObj;
  }
  /**
   * 浅比较两个对象
   * come from : https://github.com/developit/preact-compat/blob/7c5de00e7c85e2ffd011bf3af02899b63f699d3a/src/index.js#L349
   */

  function shallowDiffers(a, b) {
    for (var i in a) {
      if (!(i in b)) return true;
    }

    for (var _i in b) {
      if (a[_i] !== b[_i]) return true;
    }

    return false;
  }
  function shallowCopy(oriVal) {
    var newVal = oriVal;

    if (isObject(oriVal)) {
      newVal = _extends({}, oriVal);
    } else if (isArray(oriVal)) {
      newVal = [].concat(oriVal);
    }

    return newVal;
  }
  function extractChangedState(oldState, partialNewState, moduleOpt, force) {
    var changedState = {};
    var setted = false;
    var extractRefChangedState = rv.extractRefChangedState,
        extractModuleChangedState = rv.extractModuleChangedState,
        nonObjectValueCompare = rv.nonObjectValueCompare,
        objectValueCompare = rv.objectValueCompare;
    var needExtractChangedState = moduleOpt ? extractModuleChangedState : extractRefChangedState; // 非模块调用

    if (!moduleOpt) {
      if (!needExtractChangedState) return partialNewState;
      if (!nonObjectValueCompare && !objectValueCompare) return partialNewState;
    }

    if (partialNewState) {
      okeys(partialNewState).forEach(function (key) {
        var oldVal = oldState[key];
        var newVal = partialNewState[key];
        var valType = typeof newVal;
        var isNotEqual = true;

        if (force === true) ; else {
          if (valType !== 'object') {
            // 比较非object类型的值
            if (nonObjectValueCompare) isNotEqual = oldVal !== newVal;
          } else {
            // 比较object类型的值
            if (objectValueCompare) isNotEqual = oldVal !== newVal;
          }
        }

        if (isNotEqual) {
          if (moduleOpt) {
            moduleOpt.prevStateContainer[key] = oldVal;
            moduleOpt.incStateVer(key);
            oldState[key] = newVal;
          }

          changedState[key] = newVal;
          setted = true;
        }
      });
    }

    return setted ? changedState : null;
  }
  function differStateKeys(oldState, newState) {
    var changed = [],
        setted = []; // const unchanged=[];

    okeys(newState).forEach(function (k) {
      var newVal = newState[k];

      if (newVal !== undefined) {
        setted.push(k);
        if (newVal !== oldState[k]) changed.push(k); // else unchanged.push(k);
      }
    });
    return {
      changed: changed,
      setted: setted
    };
  }
  function removeArrElements(arr, toRemoveArr) {
    var newArr = [];
    arr.forEach(function (item) {
      if (!toRemoveArr.includes(item)) newArr.push(item);
    });
    return newArr;
  }
  function getRegisterOptions(options) {
    if (options === void 0) {
      options = {};
    }

    if (typeof options === 'string') {
      return {
        module: options
      };
    }

    if (options) {
      if (options.module) return Object.assign({
        module: MODULE_DEFAULT
      }, options);
      return Object.assign(options, {
        module: MODULE_DEFAULT
      });
    }

    return {
      module: MODULE_DEFAULT
    };
  }
  function makeCommitHandler() {
    var state = null;

    var commit = function commit(partialState) {
      if (!state) state = {};
      Object.assign(state, partialState);
    };

    var clear = function clear() {
      return state = null;
    };

    var getFnCommittedState = function getFnCommittedState() {
      return state;
    };

    return {
      commit: commit,
      clear: clear,
      getFnCommittedState: getFnCommittedState
    };
  }
  function isOnlineEditor() {
    var result = false;

    if (window) {
      if (window.name === 'previewFrame' //for stackblitz
      || window.__SANDBOX_DATA__ // for codesandbox
      || window.BrowserFS // for codesandbox
      ) {
          result = true;
        }
    }

    return result;
  }
  function makeCallInfo(module) {
    return {
      payload: null,
      renderKey: [],
      delay: -1,
      module: module,
      fnName: ''
    };
  }
  function evalState(state) {
    if (state === void 0) {
      state = {};
    }

    var ret = isFn(state) ? state() : state;

    if (!isPJO(ret)) {
      throw new Error("state " + INAJ);
    }

    return ret;
  }

  function _getValue(obj, keys, lastKeyIndex, keyIndex) {
    var key = keys[keyIndex];

    if (lastKeyIndex === keyIndex) {
      return obj[key];
    } else {
      return _getValue(obj[key], keys, lastKeyIndex, ++keyIndex);
    }
  }

  function getValueByKeyPath(obj, keyPath) {
    var keys = keyPath.split('.');
    return _getValue(obj, keys, keys.length - 1, 0);
  }
  function isDepKeysValid(depKeys) {
    return isFn(depKeys) || isArray(depKeys) || depKeys === '-' || depKeys === '*';
  }
  function checkDepKeys(depKeys) {
    if (depKeys && !isDepKeysValid(depKeys)) {
      throw new Error("depKeys must be one of them(array,'*','-',fn)");
    }
  }
  function makeFnDesc(fn, depKeysOrOpt, check) {
    if (check === void 0) {
      check = true;
    }

    // 防止显式的传递null
    var _depKeysOrOpt = depKeysOrOpt || {};

    var desc = {
      fn: fn
    };
    var assignFrom = isDepKeysValid(_depKeysOrOpt) ? {
      depKeys: _depKeysOrOpt
    } : _depKeysOrOpt;
    check && checkDepKeys(assignFrom.depKeys);
    return Object.assign(desc, assignFrom);
  }
  function delay(ms) {
    if (ms === void 0) {
      ms = 1000;
    }

    return new Promise(function (resolve) {
      return setTimeout(resolve, ms);
    });
  }
  function getErrStackKeywordLoc(err, keyword, offset) {
    if (offset === void 0) {
      offset = 0;
    }

    var errStack = err.stack;
    var arr = errStack.split('\n');
    var len = arr.length;
    var curLocation = '';

    for (var i = 0; i < len; i++) {
      if (arr[i].includes(keyword)) {
        curLocation = arr[i + offset];
        break;
      }
    }

    return curLocation;
  }
  function getVal(val, defaultVal) {
    if (val !== undefined) return val;
    return defaultVal;
  }

  var defaultErrorHandler = function defaultErrorHandler(err, silent) {
    if (silent === void 0) {
      silent = false;
    }

    var logFn = rv.isDebug ? logWarn : logErr; // 避免travis 发现 error打印就导致test用例不通过

    logFn('found uncaught err, suggest configure an errorHandler in run options');
    logFn(err);
    if (!silent) throw err;
  };

  var rh = {
    act: null,
    errorHandler: null,
    warningHandler: null,
    tryHandleError: function tryHandleError(err, silent) {
      rh.errorHandler ? rh.errorHandler(err) : defaultErrorHandler(err, silent);
    },
    tryHandleWarning: function tryHandleWarning(err) {
      // this kind of error will not lead to app crash, but should let developer know
      justWarning(err);
      rh.warningHandler && rh.warningHandler(err);
    }
  };

  /* eslint-disable camelcase */
  // 依赖收集写入的映射
  var waKey2uKeyMap = {}; // 依赖标记写入的映射，是一个实例化完成就会固化的依赖
  // 不采取一开始映射好全部waKey的形式，而是采用safeGet动态添加map映射

  var waKey2staticUKeyMap = {};

  function _mapIns(mapContainer, waKey, ccUniqueKey) {
    try {
      mapContainer[waKey][ccUniqueKey] = 1; //处于依赖状态
    } catch (err) {
      var map = {};
      map[ccUniqueKey] = 1;
      mapContainer[waKey] = map;
    }
  }

  function makeWaKey(module, stateKey) {
    return module + "/" + stateKey;
  }
  function mapIns(module, stateKey, ccUniqueKey) {
    _mapIns(waKey2uKeyMap, makeWaKey(module, stateKey), ccUniqueKey);
  }
  function mapInsM(modStateKey, ccUniqueKey) {
    _mapIns(waKey2uKeyMap, modStateKey, ccUniqueKey);
  }
  function delIns(module, stateKey, ccUniqueKey) {
    delInsM(makeWaKey(module, stateKey), ccUniqueKey);
  }
  function delInsM(modStateKey, ccUniqueKey) {
    try {
      delete waKey2uKeyMap[modStateKey][ccUniqueKey];
    } catch (err) {// do nothing
    }
  }
  function mapStaticInsM(modStateKey, ccUniqueKey) {
    _mapIns(waKey2staticUKeyMap, modStateKey, ccUniqueKey);
  }
  function delStaticInsM(modStateKey, ccUniqueKey) {
    try {
      delete waKey2staticUKeyMap[modStateKey][ccUniqueKey];
    } catch (err) {// do nothing
    }
  }

  var _MODULE_DEFAULT$MODUL;
  var module2insCount = (_MODULE_DEFAULT$MODUL = {}, _MODULE_DEFAULT$MODUL[MODULE_DEFAULT] = 0, _MODULE_DEFAULT$MODUL[MODULE_GLOBAL] = 0, _MODULE_DEFAULT$MODUL);

  var _lifecycle;
  var lifecycle = {
    _lifecycle: (_lifecycle = {}, _lifecycle[MODULE_DEFAULT] = {}, _lifecycle[MODULE_GLOBAL] = {}, _lifecycle),
    _mountedOnce: {},
    _willUnmountOnce: {}
  };

  var refs = {};

  /* eslint-disable camelcase */

  function getCacheDataContainer() {
    return {
      module: {
        computed: {},
        watch: {}
      },
      ref: {
        computed: {},
        watch: {},
        effect: {}
      }
    };
  }

  var cacheArea_pickedRetKeys_ = getCacheDataContainer();

  function _wrapFn(retKey, retKey2fn, isLazy) {
    var _retKey2fn$retKey = retKey2fn[retKey],
        fn = _retKey2fn$retKey.fn,
        depKeys = _retKey2fn$retKey.depKeys,
        sort = _retKey2fn$retKey.sort;
    return {
      retKey: retKey,
      fn: fn,
      depKeys: depKeys,
      isLazy: isLazy,
      sort: sort
    };
  } // asc sort


  var sortCb = function sortCb(o1, o2) {
    return o1.sort - o2.sort;
  };

  function clearCachedData() {
    cacheArea_pickedRetKeys_ = getCacheDataContainer();
  } // cate module | ref
  // type computed | watch

  function pickDepFns (isBeforeMount, cate, type, depDesc, stateModule, oldState, committedState, cUkey) {
    var moduleDep = depDesc[stateModule]; // it can be refModuleDep or moduleDep

    var pickedFns = []; // 针对type module， init-module-state时，已对_computedValueOri赋值了默认cuDesc，
    // 所以此时可以安全的直接判断非关系，而不用担心 {}对象存在

    if (isObjectNull(moduleDep)) return {
      pickedFns: pickedFns,
      setted: [],
      changed: [],
      retKey2stateKeys: {}
    };
    var retKey2fn = moduleDep.retKey2fn,
        retKey2lazy = moduleDep.retKey2lazy,
        stateKey2retKeys = moduleDep.stateKey2retKeys,
        retKey2stateKeys = moduleDep.retKey2stateKeys,
        fnCount = moduleDep.fnCount;
    /** 首次调用 */

    if (isBeforeMount) {
      var retKeys = okeys(retKey2fn);

      var _setted = okeys(committedState);

      var _changed = _setted;

      if (type === 'computed') {
        return {
          pickedFns: retKeys.map(function (retKey) {
            return _wrapFn(retKey, retKey2fn, retKey2lazy[retKey]);
          }).sort(sortCb),
          setted: _setted,
          changed: _changed,
          retKey2stateKeys: retKey2stateKeys
        };
      } // for watch


      retKeys.forEach(function (retKey) {
        var _retKey2fn$retKey2 = retKey2fn[retKey],
            fn = _retKey2fn$retKey2.fn,
            immediate = _retKey2fn$retKey2.immediate,
            depKeys = _retKey2fn$retKey2.depKeys,
            sort = _retKey2fn$retKey2.sort;
        if (immediate) pickedFns.push({
          retKey: retKey,
          fn: fn,
          depKeys: depKeys,
          sort: sort
        });
      });
      pickedFns.sort(sortCb);
      return {
        pickedFns: pickedFns,
        setted: _setted,
        changed: _changed,
        retKey2stateKeys: retKey2stateKeys
      };
    } // 这些目标stateKey的值发生了变化


    var _differStateKeys = differStateKeys(oldState, committedState),
        setted = _differStateKeys.setted,
        changed = _differStateKeys.changed;

    if (setted.length === 0) {
      return {
        pickedFns: pickedFns,
        setted: [],
        changed: [],
        retKey2stateKeys: {}
      };
    } //用setted + changed + module 作为键，缓存对应的pickedFns，这样相同形状的committedState再次进入此函数时，方便快速直接命中pickedFns


    var cacheKey = setted.join(',') + "|" + changed.join(',') + "|" + stateModule; // 要求用户必须在setup里静态的定义完computed & watch，动态的调用computed & watch的回调因为缓存原因不会被触发

    var tmpNode = cacheArea_pickedRetKeys_[cate][type];
    var cachePool = cUkey ? safeGet(tmpNode, cUkey) : tmpNode;
    var cachedPickedRetKeys = cachePool[cacheKey];

    if (cachedPickedRetKeys) {
      // todo, for 2.5, call checkFnByDepPath with variable depKey_pathDepKeys_
      return {
        pickedFns: cachedPickedRetKeys.map(function (retKey) {
          return _wrapFn(retKey, retKey2fn, retKey2lazy[retKey]);
        }),
        setted: setted,
        changed: changed,
        retKey2stateKeys: retKey2stateKeys
      };
    }

    _pickFn(pickedFns, setted, changed, retKey2fn, stateKey2retKeys, retKey2lazy, fnCount);

    cachePool[cacheKey] = pickedFns.map(function (v) {
      return v.retKey;
    }); // todo, for 2.5, call checkFnByDepPath with variable depKey_pathDepKeys_

    return {
      pickedFns: pickedFns,
      setted: setted,
      changed: changed,
      retKey2stateKeys: retKey2stateKeys
    };
  }

  function _pickFn(pickedFns, settedStateKeys, changedStateKeys, retKey2fn, stateKey2retKeys, retKey2lazy, fnCount) {
    if (settedStateKeys.length === 0) return; // 把*的函数先全部挑出来, 有key的值发生变化了或者有设值行为

    var starRetKeys = stateKey2retKeys['*'];

    if (starRetKeys) {
      var isKeyValChanged = changedStateKeys.length > 0;
      starRetKeys.forEach(function (retKey) {
        var _retKey2fn$retKey3 = retKey2fn[retKey],
            fn = _retKey2fn$retKey3.fn,
            compare = _retKey2fn$retKey3.compare,
            depKeys = _retKey2fn$retKey3.depKeys,
            sort = _retKey2fn$retKey3.sort;
        var toPush = {
          retKey: retKey,
          fn: fn,
          depKeys: depKeys,
          isLazy: retKey2lazy[retKey],
          sort: sort
        };

        if (compare) {
          if (isKeyValChanged) pickedFns.push(toPush);
          return;
        }

        pickedFns.push(toPush);
      });
    } // 继续遍历settedStateKeys, 挑选出剩余的目标fn（非*相关的）


    if (pickedFns.length < fnCount) {
      (function () {
        var retKey_picked_ = {};
        var len = settedStateKeys.length;

        var _loop2 = function _loop2(i) {
          var stateKey = settedStateKeys[i];
          var retKeys = stateKey2retKeys[stateKey]; //发生变化了的stateKey不一定在依赖列表里

          if (!retKeys) return "continue";
          retKeys.forEach(function (retKey) {
            //没有挑过的方法才挑出来
            if (!retKey_picked_[retKey]) {
              var _retKey2fn$retKey4 = retKey2fn[retKey],
                  fn = _retKey2fn$retKey4.fn,
                  compare = _retKey2fn$retKey4.compare,
                  depKeys = _retKey2fn$retKey4.depKeys,
                  sort = _retKey2fn$retKey4.sort;
              var canPick;
              var isValChanged = changedStateKeys.includes(stateKey); // 检测出发生了变化，就一定pick

              if (isValChanged) {
                canPick = true;
              } else {
                // 对于未采用 immutable写法的object是检测不出是否改变的，
                // 因为指向同一个引用，isValChanged一定是false
                // 所以如果compare 为true，则要求用户严格采用immutable写法
                // 为false的话，进入到这里，是已经set的key，canPick一定为true
                canPick = compare ? isValChanged : true;
              }

              if (canPick) {
                retKey_picked_[retKey] = true;
                pickedFns.push({
                  retKey: retKey,
                  fn: fn,
                  depKeys: depKeys,
                  isLazy: retKey2lazy[retKey],
                  sort: sort
                });
              }
            }
          });
          if (pickedFns.length === fnCount) return "break";
        };

        _loop: for (var i = 0; i < len; i++) {
          var _ret = _loop2(i);

          switch (_ret) {
            case "continue":
              continue;

            case "break":
              break _loop;
          }
        }
      })();
    }

    pickedFns.sort(sortCb);
  }

  function setPartialState(partialState, state, key) {
    var value = state[key];

    if (value !== undefined) {
      partialState[key] = value;
      return true;
    }

    return false;
  } // missKeyInState: true代表state含有stateKeys里不包含的key， false则不含


  function extractStateByKeys (state, stateKeys, returnNullIfEmpty, needIgnored) {
    if (stateKeys === void 0) {
      stateKeys = [];
    }

    if (returnNullIfEmpty === void 0) {
      returnNullIfEmpty = false;
    }

    if (needIgnored === void 0) {
      needIgnored = false;
    }

    var partialState = {},
        ignoredStateKeys = [],
        missKeyInState = false;

    if (!isPJO(state)) {
      return {
        partialState: returnNullIfEmpty ? null : partialState,
        isStateEmpty: true,
        ignoredStateKeys: ignoredStateKeys,
        missKeyInState: missKeyInState
      };
    }

    var isStateEmpty = true;
    var committedStateKeys = okeys(state);
    var cLen = committedStateKeys.length;
    var sLen = stateKeys.length;

    if (cLen > sLen) {
      missKeyInState = true;
      stateKeys.forEach(function (key) {
        if (setPartialState(partialState, state, key)) isStateEmpty = false;
      });
      if (needIgnored) ignoredStateKeys = removeArrElements(committedStateKeys, stateKeys);
    } else {
      committedStateKeys.forEach(function (key) {
        if (stateKeys.includes(key)) {
          if (setPartialState(partialState, state, key)) isStateEmpty = false;
        } else {
          missKeyInState = true;
          if (needIgnored) ignoredStateKeys.push(key);
        }
      });
    }

    if (isStateEmpty && returnNullIfEmpty) partialState = null;
    return {
      partialState: partialState,
      isStateEmpty: isStateEmpty,
      ignoredStateKeys: ignoredStateKeys,
      missKeyInState: missKeyInState
    };
  }

  /**
   * 用于传递给 computed 回调收集相关依赖
   * defComputed((newState, oldState)=>{
   *   // 此处的newState oldState即cuObState
   * })
   * @param {{[key:string]:any}} state 
   * @param {string[]} depKeys 
   */

  function makeCuObState (state, depKeys) {
    return new Proxy(state, {
      get: function get(target, key) {
        /**
         * 第一个isKeyValid判断，是为了防止误使用state算computed value，而触发了其他的key收集
         *   ctx.computed('count', n => {
         *     return n * 2;// 正确写法本应该是 return n.count * 2
         *    })
         *   // 本应该是 n.count * 2, 写为 n * 2 后，触发的key分别为
         *   // valueOf, toString, Symbol(...)
         */
        if (isKeyValid(target, key) && !depKeys.includes(key)) depKeys.push(key);
        return target[key];
      },
      // set: function (target, key) {
      set: function set() {
        // do nothing，拒绝用户在computed回调里修改state的值
        return true;
      }
    });
  }

  function createCommonjsModule(fn, module) {
  	return module = { exports: {} }, fn(module, module.exports), module.exports;
  }

  var runtime_1 = createCommonjsModule(function (module) {
  /**
   * Copyright (c) 2014-present, Facebook, Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */

  var runtime = (function (exports) {

    var Op = Object.prototype;
    var hasOwn = Op.hasOwnProperty;
    var undefined; // More compressible than void 0.
    var $Symbol = typeof Symbol === "function" ? Symbol : {};
    var iteratorSymbol = $Symbol.iterator || "@@iterator";
    var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
    var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

    function wrap(innerFn, outerFn, self, tryLocsList) {
      // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
      var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
      var generator = Object.create(protoGenerator.prototype);
      var context = new Context(tryLocsList || []);

      // The ._invoke method unifies the implementations of the .next,
      // .throw, and .return methods.
      generator._invoke = makeInvokeMethod(innerFn, self, context);

      return generator;
    }
    exports.wrap = wrap;

    // Try/catch helper to minimize deoptimizations. Returns a completion
    // record like context.tryEntries[i].completion. This interface could
    // have been (and was previously) designed to take a closure to be
    // invoked without arguments, but in all the cases we care about we
    // already have an existing method we want to call, so there's no need
    // to create a new function object. We can even get away with assuming
    // the method takes exactly one argument, since that happens to be true
    // in every case, so we don't have to touch the arguments object. The
    // only additional allocation required is the completion record, which
    // has a stable shape and so hopefully should be cheap to allocate.
    function tryCatch(fn, obj, arg) {
      try {
        return { type: "normal", arg: fn.call(obj, arg) };
      } catch (err) {
        return { type: "throw", arg: err };
      }
    }

    var GenStateSuspendedStart = "suspendedStart";
    var GenStateSuspendedYield = "suspendedYield";
    var GenStateExecuting = "executing";
    var GenStateCompleted = "completed";

    // Returning this object from the innerFn has the same effect as
    // breaking out of the dispatch switch statement.
    var ContinueSentinel = {};

    // Dummy constructor functions that we use as the .constructor and
    // .constructor.prototype properties for functions that return Generator
    // objects. For full spec compliance, you may wish to configure your
    // minifier not to mangle the names of these two functions.
    function Generator() {}
    function GeneratorFunction() {}
    function GeneratorFunctionPrototype() {}

    // This is a polyfill for %IteratorPrototype% for environments that
    // don't natively support it.
    var IteratorPrototype = {};
    IteratorPrototype[iteratorSymbol] = function () {
      return this;
    };

    var getProto = Object.getPrototypeOf;
    var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
    if (NativeIteratorPrototype &&
        NativeIteratorPrototype !== Op &&
        hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
      // This environment has a native %IteratorPrototype%; use it instead
      // of the polyfill.
      IteratorPrototype = NativeIteratorPrototype;
    }

    var Gp = GeneratorFunctionPrototype.prototype =
      Generator.prototype = Object.create(IteratorPrototype);
    GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
    GeneratorFunctionPrototype.constructor = GeneratorFunction;
    GeneratorFunctionPrototype[toStringTagSymbol] =
      GeneratorFunction.displayName = "GeneratorFunction";

    // Helper for defining the .next, .throw, and .return methods of the
    // Iterator interface in terms of a single ._invoke method.
    function defineIteratorMethods(prototype) {
      ["next", "throw", "return"].forEach(function(method) {
        prototype[method] = function(arg) {
          return this._invoke(method, arg);
        };
      });
    }

    exports.isGeneratorFunction = function(genFun) {
      var ctor = typeof genFun === "function" && genFun.constructor;
      return ctor
        ? ctor === GeneratorFunction ||
          // For the native GeneratorFunction constructor, the best we can
          // do is to check its .name property.
          (ctor.displayName || ctor.name) === "GeneratorFunction"
        : false;
    };

    exports.mark = function(genFun) {
      if (Object.setPrototypeOf) {
        Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
      } else {
        genFun.__proto__ = GeneratorFunctionPrototype;
        if (!(toStringTagSymbol in genFun)) {
          genFun[toStringTagSymbol] = "GeneratorFunction";
        }
      }
      genFun.prototype = Object.create(Gp);
      return genFun;
    };

    // Within the body of any async function, `await x` is transformed to
    // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
    // `hasOwn.call(value, "__await")` to determine if the yielded value is
    // meant to be awaited.
    exports.awrap = function(arg) {
      return { __await: arg };
    };

    function AsyncIterator(generator) {
      function invoke(method, arg, resolve, reject) {
        var record = tryCatch(generator[method], generator, arg);
        if (record.type === "throw") {
          reject(record.arg);
        } else {
          var result = record.arg;
          var value = result.value;
          if (value &&
              typeof value === "object" &&
              hasOwn.call(value, "__await")) {
            return Promise.resolve(value.__await).then(function(value) {
              invoke("next", value, resolve, reject);
            }, function(err) {
              invoke("throw", err, resolve, reject);
            });
          }

          return Promise.resolve(value).then(function(unwrapped) {
            // When a yielded Promise is resolved, its final value becomes
            // the .value of the Promise<{value,done}> result for the
            // current iteration.
            result.value = unwrapped;
            resolve(result);
          }, function(error) {
            // If a rejected Promise was yielded, throw the rejection back
            // into the async generator function so it can be handled there.
            return invoke("throw", error, resolve, reject);
          });
        }
      }

      var previousPromise;

      function enqueue(method, arg) {
        function callInvokeWithMethodAndArg() {
          return new Promise(function(resolve, reject) {
            invoke(method, arg, resolve, reject);
          });
        }

        return previousPromise =
          // If enqueue has been called before, then we want to wait until
          // all previous Promises have been resolved before calling invoke,
          // so that results are always delivered in the correct order. If
          // enqueue has not been called before, then it is important to
          // call invoke immediately, without waiting on a callback to fire,
          // so that the async generator function has the opportunity to do
          // any necessary setup in a predictable way. This predictability
          // is why the Promise constructor synchronously invokes its
          // executor callback, and why async functions synchronously
          // execute code before the first await. Since we implement simple
          // async functions in terms of async generators, it is especially
          // important to get this right, even though it requires care.
          previousPromise ? previousPromise.then(
            callInvokeWithMethodAndArg,
            // Avoid propagating failures to Promises returned by later
            // invocations of the iterator.
            callInvokeWithMethodAndArg
          ) : callInvokeWithMethodAndArg();
      }

      // Define the unified helper method that is used to implement .next,
      // .throw, and .return (see defineIteratorMethods).
      this._invoke = enqueue;
    }

    defineIteratorMethods(AsyncIterator.prototype);
    AsyncIterator.prototype[asyncIteratorSymbol] = function () {
      return this;
    };
    exports.AsyncIterator = AsyncIterator;

    // Note that simple async functions are implemented on top of
    // AsyncIterator objects; they just return a Promise for the value of
    // the final result produced by the iterator.
    exports.async = function(innerFn, outerFn, self, tryLocsList) {
      var iter = new AsyncIterator(
        wrap(innerFn, outerFn, self, tryLocsList)
      );

      return exports.isGeneratorFunction(outerFn)
        ? iter // If outerFn is a generator, return the full iterator.
        : iter.next().then(function(result) {
            return result.done ? result.value : iter.next();
          });
    };

    function makeInvokeMethod(innerFn, self, context) {
      var state = GenStateSuspendedStart;

      return function invoke(method, arg) {
        if (state === GenStateExecuting) {
          throw new Error("Generator is already running");
        }

        if (state === GenStateCompleted) {
          if (method === "throw") {
            throw arg;
          }

          // Be forgiving, per 25.3.3.3.3 of the spec:
          // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
          return doneResult();
        }

        context.method = method;
        context.arg = arg;

        while (true) {
          var delegate = context.delegate;
          if (delegate) {
            var delegateResult = maybeInvokeDelegate(delegate, context);
            if (delegateResult) {
              if (delegateResult === ContinueSentinel) continue;
              return delegateResult;
            }
          }

          if (context.method === "next") {
            // Setting context._sent for legacy support of Babel's
            // function.sent implementation.
            context.sent = context._sent = context.arg;

          } else if (context.method === "throw") {
            if (state === GenStateSuspendedStart) {
              state = GenStateCompleted;
              throw context.arg;
            }

            context.dispatchException(context.arg);

          } else if (context.method === "return") {
            context.abrupt("return", context.arg);
          }

          state = GenStateExecuting;

          var record = tryCatch(innerFn, self, context);
          if (record.type === "normal") {
            // If an exception is thrown from innerFn, we leave state ===
            // GenStateExecuting and loop back for another invocation.
            state = context.done
              ? GenStateCompleted
              : GenStateSuspendedYield;

            if (record.arg === ContinueSentinel) {
              continue;
            }

            return {
              value: record.arg,
              done: context.done
            };

          } else if (record.type === "throw") {
            state = GenStateCompleted;
            // Dispatch the exception by looping back around to the
            // context.dispatchException(context.arg) call above.
            context.method = "throw";
            context.arg = record.arg;
          }
        }
      };
    }

    // Call delegate.iterator[context.method](context.arg) and handle the
    // result, either by returning a { value, done } result from the
    // delegate iterator, or by modifying context.method and context.arg,
    // setting context.delegate to null, and returning the ContinueSentinel.
    function maybeInvokeDelegate(delegate, context) {
      var method = delegate.iterator[context.method];
      if (method === undefined) {
        // A .throw or .return when the delegate iterator has no .throw
        // method always terminates the yield* loop.
        context.delegate = null;

        if (context.method === "throw") {
          // Note: ["return"] must be used for ES3 parsing compatibility.
          if (delegate.iterator["return"]) {
            // If the delegate iterator has a return method, give it a
            // chance to clean up.
            context.method = "return";
            context.arg = undefined;
            maybeInvokeDelegate(delegate, context);

            if (context.method === "throw") {
              // If maybeInvokeDelegate(context) changed context.method from
              // "return" to "throw", let that override the TypeError below.
              return ContinueSentinel;
            }
          }

          context.method = "throw";
          context.arg = new TypeError(
            "The iterator does not provide a 'throw' method");
        }

        return ContinueSentinel;
      }

      var record = tryCatch(method, delegate.iterator, context.arg);

      if (record.type === "throw") {
        context.method = "throw";
        context.arg = record.arg;
        context.delegate = null;
        return ContinueSentinel;
      }

      var info = record.arg;

      if (! info) {
        context.method = "throw";
        context.arg = new TypeError("iterator result is not an object");
        context.delegate = null;
        return ContinueSentinel;
      }

      if (info.done) {
        // Assign the result of the finished delegate to the temporary
        // variable specified by delegate.resultName (see delegateYield).
        context[delegate.resultName] = info.value;

        // Resume execution at the desired location (see delegateYield).
        context.next = delegate.nextLoc;

        // If context.method was "throw" but the delegate handled the
        // exception, let the outer generator proceed normally. If
        // context.method was "next", forget context.arg since it has been
        // "consumed" by the delegate iterator. If context.method was
        // "return", allow the original .return call to continue in the
        // outer generator.
        if (context.method !== "return") {
          context.method = "next";
          context.arg = undefined;
        }

      } else {
        // Re-yield the result returned by the delegate method.
        return info;
      }

      // The delegate iterator is finished, so forget it and continue with
      // the outer generator.
      context.delegate = null;
      return ContinueSentinel;
    }

    // Define Generator.prototype.{next,throw,return} in terms of the
    // unified ._invoke helper method.
    defineIteratorMethods(Gp);

    Gp[toStringTagSymbol] = "Generator";

    // A Generator should always return itself as the iterator object when the
    // @@iterator function is called on it. Some browsers' implementations of the
    // iterator prototype chain incorrectly implement this, causing the Generator
    // object to not be returned from this call. This ensures that doesn't happen.
    // See https://github.com/facebook/regenerator/issues/274 for more details.
    Gp[iteratorSymbol] = function() {
      return this;
    };

    Gp.toString = function() {
      return "[object Generator]";
    };

    function pushTryEntry(locs) {
      var entry = { tryLoc: locs[0] };

      if (1 in locs) {
        entry.catchLoc = locs[1];
      }

      if (2 in locs) {
        entry.finallyLoc = locs[2];
        entry.afterLoc = locs[3];
      }

      this.tryEntries.push(entry);
    }

    function resetTryEntry(entry) {
      var record = entry.completion || {};
      record.type = "normal";
      delete record.arg;
      entry.completion = record;
    }

    function Context(tryLocsList) {
      // The root entry object (effectively a try statement without a catch
      // or a finally block) gives us a place to store values thrown from
      // locations where there is no enclosing try statement.
      this.tryEntries = [{ tryLoc: "root" }];
      tryLocsList.forEach(pushTryEntry, this);
      this.reset(true);
    }

    exports.keys = function(object) {
      var keys = [];
      for (var key in object) {
        keys.push(key);
      }
      keys.reverse();

      // Rather than returning an object with a next method, we keep
      // things simple and return the next function itself.
      return function next() {
        while (keys.length) {
          var key = keys.pop();
          if (key in object) {
            next.value = key;
            next.done = false;
            return next;
          }
        }

        // To avoid creating an additional object, we just hang the .value
        // and .done properties off the next function object itself. This
        // also ensures that the minifier will not anonymize the function.
        next.done = true;
        return next;
      };
    };

    function values(iterable) {
      if (iterable) {
        var iteratorMethod = iterable[iteratorSymbol];
        if (iteratorMethod) {
          return iteratorMethod.call(iterable);
        }

        if (typeof iterable.next === "function") {
          return iterable;
        }

        if (!isNaN(iterable.length)) {
          var i = -1, next = function next() {
            while (++i < iterable.length) {
              if (hasOwn.call(iterable, i)) {
                next.value = iterable[i];
                next.done = false;
                return next;
              }
            }

            next.value = undefined;
            next.done = true;

            return next;
          };

          return next.next = next;
        }
      }

      // Return an iterator with no values.
      return { next: doneResult };
    }
    exports.values = values;

    function doneResult() {
      return { value: undefined, done: true };
    }

    Context.prototype = {
      constructor: Context,

      reset: function(skipTempReset) {
        this.prev = 0;
        this.next = 0;
        // Resetting context._sent for legacy support of Babel's
        // function.sent implementation.
        this.sent = this._sent = undefined;
        this.done = false;
        this.delegate = null;

        this.method = "next";
        this.arg = undefined;

        this.tryEntries.forEach(resetTryEntry);

        if (!skipTempReset) {
          for (var name in this) {
            // Not sure about the optimal order of these conditions:
            if (name.charAt(0) === "t" &&
                hasOwn.call(this, name) &&
                !isNaN(+name.slice(1))) {
              this[name] = undefined;
            }
          }
        }
      },

      stop: function() {
        this.done = true;

        var rootEntry = this.tryEntries[0];
        var rootRecord = rootEntry.completion;
        if (rootRecord.type === "throw") {
          throw rootRecord.arg;
        }

        return this.rval;
      },

      dispatchException: function(exception) {
        if (this.done) {
          throw exception;
        }

        var context = this;
        function handle(loc, caught) {
          record.type = "throw";
          record.arg = exception;
          context.next = loc;

          if (caught) {
            // If the dispatched exception was caught by a catch block,
            // then let that catch block handle the exception normally.
            context.method = "next";
            context.arg = undefined;
          }

          return !! caught;
        }

        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];
          var record = entry.completion;

          if (entry.tryLoc === "root") {
            // Exception thrown outside of any try block that could handle
            // it, so set the completion value of the entire function to
            // throw the exception.
            return handle("end");
          }

          if (entry.tryLoc <= this.prev) {
            var hasCatch = hasOwn.call(entry, "catchLoc");
            var hasFinally = hasOwn.call(entry, "finallyLoc");

            if (hasCatch && hasFinally) {
              if (this.prev < entry.catchLoc) {
                return handle(entry.catchLoc, true);
              } else if (this.prev < entry.finallyLoc) {
                return handle(entry.finallyLoc);
              }

            } else if (hasCatch) {
              if (this.prev < entry.catchLoc) {
                return handle(entry.catchLoc, true);
              }

            } else if (hasFinally) {
              if (this.prev < entry.finallyLoc) {
                return handle(entry.finallyLoc);
              }

            } else {
              throw new Error("try statement without catch or finally");
            }
          }
        }
      },

      abrupt: function(type, arg) {
        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];
          if (entry.tryLoc <= this.prev &&
              hasOwn.call(entry, "finallyLoc") &&
              this.prev < entry.finallyLoc) {
            var finallyEntry = entry;
            break;
          }
        }

        if (finallyEntry &&
            (type === "break" ||
             type === "continue") &&
            finallyEntry.tryLoc <= arg &&
            arg <= finallyEntry.finallyLoc) {
          // Ignore the finally entry if control is not jumping to a
          // location outside the try/catch block.
          finallyEntry = null;
        }

        var record = finallyEntry ? finallyEntry.completion : {};
        record.type = type;
        record.arg = arg;

        if (finallyEntry) {
          this.method = "next";
          this.next = finallyEntry.finallyLoc;
          return ContinueSentinel;
        }

        return this.complete(record);
      },

      complete: function(record, afterLoc) {
        if (record.type === "throw") {
          throw record.arg;
        }

        if (record.type === "break" ||
            record.type === "continue") {
          this.next = record.arg;
        } else if (record.type === "return") {
          this.rval = this.arg = record.arg;
          this.method = "return";
          this.next = "end";
        } else if (record.type === "normal" && afterLoc) {
          this.next = afterLoc;
        }

        return ContinueSentinel;
      },

      finish: function(finallyLoc) {
        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];
          if (entry.finallyLoc === finallyLoc) {
            this.complete(entry.completion, entry.afterLoc);
            resetTryEntry(entry);
            return ContinueSentinel;
          }
        }
      },

      "catch": function(tryLoc) {
        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];
          if (entry.tryLoc === tryLoc) {
            var record = entry.completion;
            if (record.type === "throw") {
              var thrown = record.arg;
              resetTryEntry(entry);
            }
            return thrown;
          }
        }

        // The context.catch method must only be called with a location
        // argument that corresponds to a known catch block.
        throw new Error("illegal catch attempt");
      },

      delegateYield: function(iterable, resultName, nextLoc) {
        this.delegate = {
          iterator: values(iterable),
          resultName: resultName,
          nextLoc: nextLoc
        };

        if (this.method === "next") {
          // Deliberately forget the last sent value so that we don't
          // accidentally pass it on to the delegate.
          this.arg = undefined;
        }

        return ContinueSentinel;
      }
    };

    // Regardless of whether this script is executing as a CommonJS module
    // or not, return the runtime object so that we can declare the variable
    // regeneratorRuntime in the outer scope, which allows this module to be
    // injected easily by `bin/regenerator --include-runtime script.js`.
    return exports;

  }(
    // If this script is executing as a CommonJS module, use module.exports
    // as the regeneratorRuntime namespace. Otherwise create a new empty
    // object. Either way, the resulting object will be used to initialize
    // the regeneratorRuntime variable at the top of this file.
    module.exports
  ));

  try {
    regeneratorRuntime = runtime;
  } catch (accidentalStrictMode) {
    // This module should not be running in strict mode, so the above
    // assignment should always work unless something is misconfigured. Just
    // in case runtime.js accidentally runs in strict mode, we can escape
    // strict mode using a global Function call. This could conceivably fail
    // if a Content Security Policy forbids using Function, but in that case
    // the proper solution is to fix the accidental strict mode problem. If
    // you've misconfigured your bundler to force strict mode and applied a
    // CSP to forbid Function, and you're not willing to fix either of those
    // problems, please detail your unique predicament in a GitHub issue.
    Function("r", "regeneratorRuntime = r")(runtime);
  }
  });

  var regenerator = runtime_1;

  function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
    try {
      var info = gen[key](arg);
      var value = info.value;
    } catch (error) {
      reject(error);
      return;
    }

    if (info.done) {
      resolve(value);
    } else {
      Promise.resolve(value).then(_next, _throw);
    }
  }

  function _asyncToGenerator(fn) {
    return function () {
      var self = this,
          args = arguments;
      return new Promise(function (resolve, reject) {
        var gen = fn.apply(self, args);

        function _next(value) {
          asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
        }

        function _throw(err) {
          asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
        }

        _next(undefined);
      });
    };
  }

  var sigs = [SIG_FN_START, SIG_FN_END, SIG_FN_QUIT, SIG_FN_ERR, SIG_MODULE_CONFIGURED, SIG_STATE_CHANGED, SIG_ASYNC_COMPUTED_START, SIG_ASYNC_COMPUTED_END, SIG_ASYNC_COMPUTED_ERR, SIG_ASYNC_COMPUTED_BATCH_START, SIG_ASYNC_COMPUTED_BATCH_END];
  var sig2cbs = {};
  sigs.forEach(function (sig) {
    return sig2cbs[sig] = [];
  });

  function _pushSigCb(sigMap, sigOrSigs, cb) {
    function pushCb(sig, cb) {
      var cbs = sigMap[sig];

      if (cb) {
        cbs.push(cb);
      } else {
        console.warn("invalid sig[" + sig + "]");
      }
    }

    if (Array.isArray(sigOrSigs)) {
      sigOrSigs.forEach(function (sig) {
        pushCb(sig, cb);
      });
    } else {
      pushCb(sigOrSigs, cb);
    }
  }

  function clearCbs() {
    sigs.forEach(function (sig) {
      return sig2cbs[sig].length = 0;
    });
  }
  function send(sig, payload) {
    var cbs = sig2cbs[sig];
    cbs.forEach(function (cb) {
      try {
        cb({
          sig: sig,
          payload: payload
        });
      } catch (err) {
        // plugin error should not abort dispatch process
        // for letting plugin error be isolate, I have to put try catch block in forEach loop
        rh.tryHandleError(err, true);
      }
    });
  }
  function on(sigOrSigs, cb) {
    _pushSigCb(sig2cbs, sigOrSigs, cb);
  }

  var waKey2uKeyMap$1 = waKey2uKeyMap,
      waKey2staticUKeyMap$1 = waKey2staticUKeyMap;

  function triggerReRender(ref) {
    if (!ref) return; // 对于挂载好了还未卸载的实例，才有必要触发重渲染

    if (ref.__$$ms === MOUNTED) {
      var refCtx = ref.ctx;

      refCtx.__$$ccForceUpdate();
    }
  }

  function executeCuInfo(_x) {
    return _executeCuInfo.apply(this, arguments);
  }

  function _executeCuInfo() {
    _executeCuInfo = _asyncToGenerator(
    /*#__PURE__*/
    regenerator.mark(function _callee(cuInfo) {
      var fns, len, sourceType, ref, module, fnAsync, fnRetKeys, cuRetContainer, retKey2stateKeys, isModule, stateKeys, curRetKey, i, fn, isAsync, retKey, ret, toSend, uKeyMap, uKeys;
      return regenerator.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              fns = cuInfo.fns;
              len = fns.length;

              if (!(len === 0)) {
                _context.next = 5;
                break;
              }

              return _context.abrupt("return");

            case 5:
              _context.next = 7;
              return delay();

            case 7:
              sourceType = cuInfo.sourceType, ref = cuInfo.ref, module = cuInfo.module, fnAsync = cuInfo.fnAsync, fnRetKeys = cuInfo.fnRetKeys, cuRetContainer = cuInfo.cuRetContainer, retKey2stateKeys = cuInfo.retKey2stateKeys;
              isModule = sourceType !== CATE_REF;
              stateKeys = [];
              curRetKey = '';
              _context.prev = 11;
              send(SIG_ASYNC_COMPUTED_BATCH_START, {
                module: module
              });
              i = 0;

            case 14:
              if (!(i < len)) {
                _context.next = 34;
                break;
              }

              fn = fns[i];
              isAsync = fnAsync[i];
              retKey = fnRetKeys[i];
              curRetKey = retKey;
              ret = void 0;
              send(SIG_ASYNC_COMPUTED_START, {
                module: module,
                retKey: retKey
              });

              if (!isAsync) {
                _context.next = 27;
                break;
              }

              _context.next = 24;
              return fn();

            case 24:
              ret = _context.sent;
              _context.next = 28;
              break;

            case 27:
              ret = fn();

            case 28:
              cuRetContainer[retKey] = makeCuPackedValue(false, ret);
              send(SIG_ASYNC_COMPUTED_END, {
                module: module,
                retKey: retKey
              });
              if (isModule) stateKeys = stateKeys.concat(retKey2stateKeys[retKey]);

            case 31:
              i++;
              _context.next = 14;
              break;

            case 34:
              send(SIG_ASYNC_COMPUTED_BATCH_END, {
                module: module
              });
              _context.next = 41;
              break;

            case 37:
              _context.prev = 37;
              _context.t0 = _context["catch"](11);

              if (isModule) {
                toSend = {
                  module: module,
                  err: _context.t0,
                  retKey: curRetKey
                };
                send(SIG_ASYNC_COMPUTED_ERR, toSend);
                send(SIG_ASYNC_COMPUTED_BATCH_END, toSend);
              }

              rh.tryHandleError(_context.t0);

            case 41:
              if (isModule) {
                //  让所有正确执行完毕的计算函数关联到的实例能够被触发重渲染
                stateKeys = Array.from(new Set(stateKeys));
                uKeyMap = {};
                stateKeys.forEach(function (stateKey) {
                  var waKey = module + "/" + stateKey; // 利用assign不停的去重

                  Object.assign(uKeyMap, waKey2uKeyMap$1[waKey], waKey2staticUKeyMap$1[waKey]);
                });
                uKeys = okeys(uKeyMap);
                uKeys.forEach(function (refKey) {
                  triggerReRender(refs[refKey]);
                });
              } else {
                triggerReRender(ref);
              }

              _context.next = 47;
              break;

            case 44:
              _context.prev = 44;
              _context.t1 = _context["catch"](0);
              rh.tryHandleError(_context.t1);

            case 47:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[0, 44], [11, 37]]);
    }));
    return _executeCuInfo.apply(this, arguments);
  }

  /** @typedef {import('../../types-inner').IRefCtx} IRefCtx */
  //  cur: {} compare: {a:2, b:2, c:2} compareCount=3 nextCompare:{}
  //
  //  receive cur in rendering period as below
  //  cur: {a:'val', c:'val', d:'val'}
  //
  //  after render
  //  cur: {a:1, c:1, d:1} compare: {a:1, b:2, c:1, d:1} compareCount=4 nextCompare:{a:2, c:2, d:2}
  //
  //  then concent know 'b' should delete from dep because its value is 2, 
  //  if compare key count become bigger than previous render(4>3) or compare key values include 2, 
  //  then cache will be expired
  //
  //  before next render, assign nextCompare to compare, clear cur and nextCompare
  //  cur: {} compare: {a:2, c:2, d:2} compareCount=3 nextCompare:{}

  function updateDep (ref, module, key, isForModule) {
    // 这个key不是模块的stateKey，则忽略依赖记录
    if (!moduleName2stateKeys[module].includes(key)) {
      return;
    }
    /** @type IRefCtx */


    var refCtx = ref.ctx;

    if (refCtx.__$$inBM === true // 还处于beforeMount步骤
    || refCtx.__$$renderStatus === START) {
      var ccUniqueKey = refCtx.ccUniqueKey;
      var waKey = makeWaKey(module, key); // 未挂载时，是refWatch 或者 refComputed 函数里读取了moduleComputed的值间接推导出来的依赖stateKey
      // 则写到static块里，防止依赖丢失

      if (refCtx.__$$inBM === true) {
        refCtx.__$$staticWaKeys[waKey] = 1;
        return;
      }

      if (!isForModule) {
        // for ref connect
        // 处于非自动收集状态则忽略，依赖在buildRefCtx时已记录
        if (refCtx.connect[module] !== '-') return;
        var __$$curConnWaKeys = refCtx.__$$curConnWaKeys,
            __$$compareConnWaKeys = refCtx.__$$compareConnWaKeys,
            __$$nextCompareConnWaKeys = refCtx.__$$nextCompareConnWaKeys,
            __$$nextCompareConnWaKeyCount = refCtx.__$$nextCompareConnWaKeyCount; // TODO: 考虑用 waKey 写在map里

        mapInsM(waKey, ccUniqueKey);
        __$$curConnWaKeys[module][key] = 1;
        __$$compareConnWaKeys[module][key] = 1;
        var tmpMap = __$$nextCompareConnWaKeys[module];

        if (!tmpMap[key]) {
          tmpMap[key] = 2;
          __$$nextCompareConnWaKeyCount[module]++;
        }
      } else {
        // for ref module
        // 处于非自动收集状态则忽略
        if (refCtx.watchedKeys !== '-') return;
        var __$$curWaKeys = refCtx.__$$curWaKeys,
            __$$compareWaKeys = refCtx.__$$compareWaKeys,
            __$$nextCompareWaKeys = refCtx.__$$nextCompareWaKeys;
        mapInsM(waKey, ccUniqueKey);
        __$$curWaKeys[key] = 1;
        __$$compareWaKeys[key] = 1;

        if (!__$$nextCompareWaKeys[key]) {
          __$$nextCompareWaKeys[key] = 2;
          refCtx.__$$nextCompareWaKeyCount++;
        }
      }
    }
  }

  /**
   * 为每一个实例单独建立了一个获取计算结果的观察容器，方便写入依赖
   */
  var hasOwnProperty = Object.prototype.hasOwnProperty;
  var _computedRawValues$1 = computedMap._computedRawValues,
      _computedValues$1 = computedMap._computedValues,
      _computedRaw$1 = computedMap._computedRaw,
      _computedDep$1 = computedMap._computedDep; // refModuleCuDep 来自 ref.ctx.computedDep

  function writeRetKeyDep(refModuleCuDep, ref, module, retKey, isForModule) {
    // 所有组件都自动连接到$$global模块，但是未必有对$$global模块的retKey依赖
    var retKey2stateKeys = refModuleCuDep.retKey2stateKeys || {};
    var stateKeys = retKey2stateKeys[retKey] || [];
    stateKeys.forEach(function (stateKey) {
      updateDep(ref, module, stateKey, isForModule);
    }); // TODO: retKey_otherModStateKeys_  ---> updateDep(ref, module, stateKey, false);
  }
  /** 
    此函数被以下两种场景调用，
    1 模块首次运行computed&watch时
    2 实例首次运行computed&watch时
    用于生成cuVal透传给计算函数fnCtx.cuVal,
    用户读取cuVal的结果时，收集到当前计算函对其他计算函数的依赖关系
    
      module:
      function fullName(n, o, f){
          return n.firstName + n.lastName;
      }
      
      // 此时funnyName依赖是 firstName lastName age
      function funnyName(n, o, f){
        const { fullName } = f.cuVal;
        return fullName + n.age;
      }
      
      ref:
      ctx.computed('fullName',(n, o, f)=>{
        return n.firstName + n.lastName;
      })
      
      // 此时funnyName依赖是 firstName lastName age
      ctx.computed('funnyName',(n, o, f)=>{
        const { fullName } = f.cuVal;
        return fullName + n.age;
      })
   */


  function getSimpleObContainer(retKey, sourceType, fnType, module,
  /**@type ICtx*/
  refCtx, retKeys, referInfo) {
    var oriCuContainer, oriCuObContainer, computedRaw;

    if (CATE_MODULE === sourceType) {
      oriCuContainer = _computedRawValues$1[module];
      oriCuObContainer = _computedValues$1[module];
      computedRaw = _computedRaw$1[module];
    } else {
      oriCuContainer = refCtx.refComputedRawValues;
      oriCuObContainer = refCtx.refComputedValues;
      computedRaw = refCtx.computedRetKeyFns;
    } // create cuVal


    return new Proxy(oriCuContainer, {
      get: function get(target, otherRetKey) {
        var fnInfo = sourceType + " " + fnType + " retKey[" + retKey + "]"; // 1 防止用户从 cuVal读取不存在的key
        // 2 首次按序执行所有的computed函数时，前面的计算函数取取不到后面的计算结果，收集不到依赖，所以这里强制用户要注意计算函数的书写顺序

        if (hasOwnProperty.call(oriCuContainer, otherRetKey)) {
          if (isAsyncFn(computedRaw[otherRetKey], module + "/" + otherRetKey)) {
            referInfo.hasAsyncCuRefer = true; // 不允许读取异步计算函数结果做二次计算，隔离一切副作用，确保依赖关系简单和纯粹
            // throw new Error(`${fnInfo},  get an async retKey[${otherRetKey}] from cuVal is not allowed`);
          }

          retKeys.push(otherRetKey);
        } else {
          justWarning(fnInfo + " get cuVal invalid retKey[" + otherRetKey + "]");
        } // 从已定义 defineProperty 的计算结果容器里获取结果


        return oriCuObContainer[otherRetKey];
      },
      set: function set() {
        return true;
      }
    });
  }
  /**
   * 创建一个具有依赖收集行为的计算结果获取容器
   * @param {IRef} ref 
   * @param {string} module - 模块名称
   * @param {boolean} isForModule - true: belong to one module, false: connect other modules
   * @param {boolean} isRefCu - 为ref创建
   */

  function makeCuRefObContainer (ref, module, isForModule, isRefCu) {
    if (isForModule === void 0) {
      isForModule = true;
    }

    if (isRefCu === void 0) {
      isRefCu = false;
    }

    var ctx = ref.ctx;
    var moduleCuRetContainer = _computedValues$1[module]; // 注意isRefCu为true时，beforeMount时做了相关的赋值操作，保证了读取ref.ctx下目标属性是安全的

    var oriCuContainer = isRefCu ? ctx.refComputedRawValues : _computedRawValues$1[module];
    if (!oriCuContainer) return {}; // refComputed 的 cuRetWrapper 是在setup执行完毕后会被替换成填充满属性的新引用 refComputedValues
    // 见 before-mount里: ctx.refComputedValues =....
    // 所以需要在get时现取，而不能在闭包作用域内提前缓存起来反复使用

    var getCuRetContainer = function getCuRetContainer() {
      return isRefCu ? ctx.refComputedValues : moduleCuRetContainer;
    }; // 为普通的计算结果容器建立代理对象


    return new Proxy(oriCuContainer, {
      get: function get(target, retKey) {
        // 防止用户从 cuVal读取不存在的key
        if (hasOwnProperty.call(oriCuContainer, retKey)) {
          // 由refComputed.{keyName}取值触发
          if (isRefCu) {
            var computedDep = ref.ctx.computedDep;
            okeys(computedDep).forEach(function (m) {
              writeRetKeyDep(computedDep[m], ref, m, retKey, isForModule);
            });
          } else {
            // 由moduleComputed.{keyName} 或者 connectedComputed.{moduleName}.{keyName} 取值触发
            writeRetKeyDep(_computedDep$1[module], ref, module, retKey, isForModule);
          }
        } // 从已定义defineProperty的计算结果容器里获取结果


        var cuRetWrapper = getCuRetContainer();
        return cuRetWrapper[retKey];
      },
      set: function set(target, retKey, value) {
        target[retKey] = value;
        return true;
      }
    });
  }

  /* eslint-disable camelcase */

  var noCommit = function noCommit(tip, asIs) {
    return justWarning(tip + " call commit or commitCu as it is " + asIs);
  }; // 记录某个cuRetKey引用过哪些staticCuRetKeys
  // 直接引用或者间接引用过staticCuRetKey都会记录在列表内


  var modCuRetKey_referStaticCuRetKeys_ = {};
  var refCuRetKey_referStaticCuRetKeys_ = {};

  function getCuRetKeyRSListMap(sourceType, module, ccUniqueKey) {
    if (sourceType == CATE_MODULE) {
      return safeGet(modCuRetKey_referStaticCuRetKeys_, module);
    } else {
      return safeGet(refCuRetKey_referStaticCuRetKeys_, ccUniqueKey);
    }
  }

  function getCuRetKeyRSList(cuRetKey, sourceType, module, ccUniqueKey) {
    var map = getCuRetKeyRSListMap(sourceType, module, ccUniqueKey);
    return safeGetArray(map, cuRetKey);
  }

  function clearCuRefer() {
    modCuRetKey_referStaticCuRetKeys_ = {};
    refCuRetKey_referStaticCuRetKeys_ = {};
  }

  function getCuDep(refCtx, sourceType) {
    return sourceType === CATE_REF ? refCtx.computedDep : computedMap._computedDep;
  }

  function setStateKeyRetKeysMap(refCtx, sourceType, fnType, stateModule, retKey, keys, isKeysDep) {
    if (isKeysDep === void 0) {
      isKeysDep = true;
    }

    if (keys.length === 0) return;
    var modDep, cuModDep;

    if (sourceType === CATE_REF) {
      // 由ref发起调用，refCtx是肯定有值的
      var computedDep = refCtx.computedDep;
      var depDesc = fnType === FN_CU ? computedDep : refCtx.watchDep;
      cuModDep = safeGet(computedDep, stateModule);
      modDep = safeGet(depDesc, stateModule);
    } else {
      var cuDep = computedMap._computedDep;

      var _depDesc = fnType === FN_CU ? cuDep : watch._watchDep;

      cuModDep = safeGet(cuDep, stateModule);
      modDep = safeGet(_depDesc, stateModule);
    }

    var stateKey2retKeys = safeGet(modDep, 'stateKey2retKeys');
    var retKey2stateKeys = safeGet(modDep, 'retKey2stateKeys');

    var updateRelationship = function updateRelationship(depKeys) {
      var stateKeys = safeGetArray(retKey2stateKeys, retKey);
      depKeys.forEach(function (sKey) {
        var retKeys = safeGetArray(stateKey2retKeys, sKey); // 此处判断一下retKeys，谨防用户直接在computed里操作obState, 这里拿到的sKey是一堆原型链上key，如`valueOf`等

        if (Array.isArray(retKeys) && !retKeys.includes(retKey)) retKeys.push(retKey);
        if (!stateKeys.includes(sKey)) stateKeys.push(sKey);
      });
    };

    if (isKeysDep) {
      // keys is depKeys
      updateRelationship(keys);
    } else {
      // keys is retKeys, 将retKeys里各自retKey的stateKeys转移给目标retKey
      keys.forEach(function (sourceRetKey) {
        // 这里取的是cu模块的retKey_stateKeys_
        var retKey2stateKeys = safeGet(cuModDep, 'retKey2stateKeys');
        var sourceStateKeys = retKey2stateKeys[sourceRetKey] || [];
        updateRelationship(sourceStateKeys);
      });
    }
  }

  function getRetKeyFnMap(refCtx, sourceType, stateModule) {
    // 始终从_computedDep 取retKey_fn_，来判断commitCu提交的retKey是否合法
    if (sourceType === CATE_REF) {
      return refCtx.computedRetKeyFns;
    } else {
      var moduleDep = computedMap._computedDep[stateModule] || {};
      return moduleDep.retKey2fn || {};
    }
  }

  function mapRSList(cuRetKey, referCuRetKeys, refCtx, ccUniqueKey, sourceType, stateModule) {
    var cuRetKey_referStaticCuRetKeys_ = getCuRetKeyRSListMap(cuRetKey, sourceType, stateModule, ccUniqueKey);
    var retKey2fn = getRetKeyFnMap(refCtx, sourceType, stateModule);
    var referStaticCuRetKeys = safeGetArray(cuRetKey_referStaticCuRetKeys_, cuRetKey);
    referCuRetKeys.forEach(function (referCuRetKey) {
      var fnDesc = retKey2fn[referCuRetKey]; // 直接引用

      if (fnDesc.isStatic) {
        referStaticCuRetKeys.push(referCuRetKey);
      } else {
        var tmpRSList = safeGetArray(cuRetKey_referStaticCuRetKeys_, referCuRetKey); // 把引用的referCuRetKey对应的staticCuRetKey列表记录到当前cuRetKey的staticCuRetKey列表记录上
        // 因为computed函数是严格按需执行的，所以此逻辑能够成立

        tmpRSList.forEach(function (staticCuRetKey) {
          return noDupPush(referStaticCuRetKeys, staticCuRetKey);
        });
      }
    });
  }

  var STOP_FN = Symbol('sf'); // fnType: computed watch
  // sourceType: module ref
  // initialDeltaCommittedState 会在整个过程里收集所有的提交状态

  function executeDepFns(ref, stateModule, refModule, oldState, finder, committedState, initialNewState, initialDeltaCommittedState, callInfo, isFirstCall, fnType, sourceType, computedContainer, mergeToDelta) {
    if (ref === void 0) {
      ref = {};
    }

    if (mergeToDelta === void 0) {
      mergeToDelta = true;
    }

    var refCtx = ref.ctx;
    var ccUniqueKey = refCtx ? refCtx.ccUniqueKey : ''; // while循环结束后，收集到的所有的新增或更新state

    var committedStateInWhile = {};
    var nextTickCuInfo = {
      sourceType: sourceType,
      ref: ref,
      module: stateModule,
      fns: [],
      fnAsync: [],
      fnRetKeys: [],
      cuRetContainer: computedContainer
    };
    var whileCount = 0;
    var curStateForComputeFn = committedState;
    var hasDelta = false; // 不在头部引入，避免循环依赖 TODO：后期做更好的抽象

    var ccDispatch = require('../base/dispatch')["default"];

    var _loop = function _loop() {
      whileCount++; // 因为beforeMountFlag为true的情况下，finder里调用的pickDepFns会挑出所有函数，
      // 这里必需保证只有第一次循环的时候取isFirstCall的实际值，否则一定取false，（要不然就陷入无限死循环，每一次都是true，每一次都挑出所有dep函数执行）

      var beforeMountFlag = whileCount === 1 ? isFirstCall : false;

      var _finder = finder(curStateForComputeFn, beforeMountFlag),
          pickedFns = _finder.pickedFns,
          setted = _finder.setted,
          changed = _finder.changed,
          retKey2stateKeys = _finder.retKey2stateKeys;

      nextTickCuInfo.retKey2stateKeys = retKey2stateKeys;
      if (!pickedFns.length) return "break";

      var _makeCommitHandler = makeCommitHandler(),
          commit = _makeCommitHandler.commit,
          getFnCommittedState = _makeCommitHandler.getFnCommittedState;

      var _makeCommitHandler2 = makeCommitHandler(),
          commitCu = _makeCommitHandler2.commit,
          getRetKeyCu = _makeCommitHandler2.getFnCommittedState,
          clearCu = _makeCommitHandler2.clear;

      pickedFns.forEach(function (_ref) {
        var retKey = _ref.retKey,
            fn = _ref.fn,
            depKeys = _ref.depKeys,
            isLazy = _ref.isLazy;
        var keyInfo = sourceType + " " + fnType + " retKey[" + retKey + "]";
        var tip = keyInfo + " can't"; // 异步计算的初始值

        var initialVal = '';
        var isInitialValSetted = false;

        var innerDispatch = function innerDispatch(immediate, fnOrFnStr, payload, dispatchOptions) {
          return new Promise(function (resolve) {
            var d = function d() {
              return ccDispatch(fnOrFnStr, payload, dispatchOptions, 0, {
                refModule: stateModule
              });
            };

            if (immediate) resolve(d());else setTimeout(function () {
              return resolve(d());
            }, 0);
          });
        };

        var fnCtx = {
          retKey: retKey,
          callInfo: callInfo,
          isFirstCall: isFirstCall,
          commit: commit,
          commitCu: commitCu,
          setted: setted,
          changed: changed,
          // 在sourceType为module时, 如果非首次计算
          // computedContainer只是一个携带defineProperty的计算结果收集容器，没有收集依赖行为
          cuVal: computedContainer,
          committedState: curStateForComputeFn,
          deltaCommittedState: initialDeltaCommittedState,
          stateModule: stateModule,
          refModule: refModule,
          oldState: oldState,
          refCtx: refCtx,
          dispatch: function dispatch() {
            for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
              args[_key] = arguments[_key];
            }

            return innerDispatch.apply(void 0, [false].concat(args));
          },
          dispatchImmediate: function dispatchImmediate() {
            for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
              args[_key2] = arguments[_key2];
            }

            return innerDispatch.apply(void 0, [true].concat(args));
          },
          setInitialVal: function setInitialVal() {
            beforeMountFlag && justWarning("non async " + keyInfo + " call setInitialVal is unnecessary");
          }
        }; // 循环里的首次计算且是自动收集状态，注入代理对象，收集计算&观察依赖

        var needCollectDep = beforeMountFlag && depKeys === '-'; // 用户通过cuVal读取其他计算结果时，记录cuRetKeys，用于辅助下面计算依赖

        var collectedCuRetKeys = []; // 读取newState时，记录stateKeys，用于辅助下面计算依赖

        var collectedDepKeys = []; // 对于computed，首次计算时会替换为obContainer用于收集依赖
        // !!!对于watch，immediate为true才有机会替换为obContainer收集到依赖

        var referInfo = {
          hasAsyncCuRefer: false
        };

        if (needCollectDep) {
          // 替换cuVal，以便动态的收集到computed&watch函数里读取cuVal时计算相关依赖
          fnCtx.cuVal = getSimpleObContainer(retKey, sourceType, fnType, stateModule, refCtx, collectedCuRetKeys, referInfo);
        }

        if (fnType === FN_CU) {
          var isCuFnAsync = isAsyncFn(fn, stateModule + "/" + retKey);

          if (isLazy || isCuFnAsync) {
            // lazyComputed 和 asyncComputed 不能调用commit commitCu，以隔绝副作用
            var asIs = isLazy ? 'lazy' : 'async computed';

            fnCtx.commit = function () {
              return noCommit(tip, asIs);
            };

            fnCtx.commitCu = fnCtx.commit;
            if (isCuFnAsync) fnCtx.setInitialVal = function (val) {
              initialVal = val;
              isInitialValSetted = true; // 这里阻止异步计算函数的首次执行，交给executeAsyncCuInfo去触发

              if (beforeMountFlag) throw STOP_FN;
            };
          }

          if (isLazy) {
            computedContainer[retKey] = makeCuPackedValue(isLazy, null, true, fn, initialNewState, oldState, fnCtx);
          } else {
            var newStateArg = initialNewState,
                oldStateArg = oldState; // 首次计算时，new 和 old是同一个对象，方便用于收集depKeys

            if (needCollectDep) {
              oldStateArg = makeCuObState(initialNewState, collectedDepKeys);
              newStateArg = oldStateArg;
            } // TODO: fnCtx.connectedState 转为代理对象，用于收集到连接模块的依赖
            // 让示例 https://codesandbox.io/s/ref-watch-read-connected-state-prb4v?file=/src/App.js 正常工作
            // 不同的sourceType，创建的connectedState不一样
            // for module: fnCtx.getComputed, fnCtx.getState，
            // 此处会检查模块加载顺序，然后appendState创建一个隐含的key，然后在目标模块创建一个watch函数
            // for ref: fnCtx.connectedState, fnCtx.connectedComputed
            // 确保 (n,o,f)里的n o总是实例的state


            var computedRet; // 异步函数首次执行时才去调用它，仅为了收集依赖

            if (isCuFnAsync) {
              if (beforeMountFlag) {
                fn(newStateArg, oldStateArg, fnCtx)["catch"](function (err) {
                  if (err !== STOP_FN) throw err;
                });
              }
            } else {
              computedRet = fn(newStateArg, oldStateArg, fnCtx);
            }

            if (isCuFnAsync || referInfo.hasAsyncCuRefer) {
              // 首次计算时需要赋初始化值
              if (beforeMountFlag) {
                if (!isInitialValSetted) {
                  throw new Error("async " + keyInfo + " forget call setInitialVal");
                }

                computedRet = initialVal;
              } else {
                // 不做任何新的计算，还是赋值原来的结果
                // 新的结果等待 asyncComputedMgr 来计算并触发相关实例重渲染
                computedRet = computedContainer[retKey];
              } // 替换掉setInitialVal，使其失效


              fnCtx.setInitialVal = noop;

              fnCtx.commit = function () {
                return noCommit(tip, 'async computed or it refers async computed ret');
              };

              fnCtx.commitCu = fnCtx.commit; // 安排到nextTickCuInfo里，while结束后单独触发它们挨个按需计算

              nextTickCuInfo.fns.push(function () {
                return fn(newStateArg, oldStateArg, fnCtx);
              });
              nextTickCuInfo.fnAsync.push(isCuFnAsync);
              nextTickCuInfo.fnRetKeys.push(retKey);
            } // 记录计算结果


            computedContainer[retKey] = makeCuPackedValue(false, computedRet);

            if (needCollectDep) {
              // 在computed函数里读取了newState的stateKey，需要将其记录到当前retKey的依赖列表上
              // 以便能够在相应stateKey值改变时，能够正确命中该computed函数
              setStateKeyRetKeysMap(refCtx, sourceType, FN_CU, stateModule, retKey, collectedDepKeys); // 在computed里读取cuVal里的其他retKey结果, 要将其他retKey对应的stateKeys写到当前retKey的依赖列表上，
              // 以便能够在相应stateKey值改变时，能够正确命中该computed函数

              setStateKeyRetKeysMap(refCtx, sourceType, FN_CU, stateModule, retKey, collectedCuRetKeys, false);
              mapRSList(retKey, collectedCuRetKeys, refCtx, ccUniqueKey, sourceType, stateModule);
            }
          }
        } else {
          // watch
          var tmpInitialNewState = initialNewState;
          var tmpOldState = oldState; // 首次触发watch时，才传递ob对象，用于收集依赖

          if (needCollectDep) {
            tmpInitialNewState = makeCuObState(initialNewState, collectedDepKeys); // new 和 old是同一个对象，方便用于收集depKeys

            tmpOldState = tmpInitialNewState;
          }

          fn(tmpInitialNewState, tmpOldState, fnCtx); // 首次触发watch时, 才记录依赖

          if (needCollectDep) {
            // 在watch函数里读取了newState的stateKey，需要将其记录到当前watch retKey的依赖列表上
            // 以便能够在相应stateKey值改变时，能够正确命中该watch函数
            setStateKeyRetKeysMap(refCtx, sourceType, FN_WATCH, stateModule, retKey, collectedDepKeys); // 在watch里读取了cuVal里的retKey结果，要将这些retKey对应的stateKey依赖附加到当前watch retKey的依赖列表上，
            // 以便能够在相应stateKey值改变时，能够正确命中该watch函数

            setStateKeyRetKeysMap(refCtx, sourceType, FN_WATCH, stateModule, retKey, collectedCuRetKeys, false);
          }
        } // refCompute&refWatch 里获取state、moduleState、connectedState的值收集到的depKeys要记录为ref的静态依赖


        if (needCollectDep && sourceType === CATE_REF) {
          collectedDepKeys.forEach(function (key) {
            return refCtx.__$$staticWaKeys[makeWaKey(stateModule, key)] = 1;
          }); // 注：refWatch直接读取了moduleComputed 或者 connectedComputed的值时也收集到了依赖
          // 逻辑在updateDep里判断__$$isBM来确定是不是首次触发
        } // 对于模块计算过程，fn里调用committedCu，computedContainer是moduleComputed结果容器，
        // 对于实例计算过程，fn里调用committedCu来说，computedContainer是refComputed结果容器
        // 每一个retKey返回的committedCu都及时处理掉，因为下面setStateKeyRetKeysMap需要对此时的retKey写依赖


        var committedCuRet = getRetKeyCu();

        if (committedCuRet) {
          var retKey2fn = getRetKeyFnMap(refCtx, sourceType, stateModule);
          okeys(committedCuRet).forEach(function (cuRetKey) {
            // 模块计算函数里调用commitCu只能修改模块计算retKey
            // 实例计算函数里调用commitCu只能修改实例计算retKey
            var fnDesc = retKey2fn[cuRetKey];
            if (!fnDesc) justWarning("commitCu:" + tip + " commit [" + cuRetKey + "], it is not defined"); // 由committedCu提交的值，可以统一当作非lazy值set回去，方便取的时候直接取
            else {
                // 检查提交目标只能是静态的cuRetKey
                if (fnDesc.isStatic) {
                  var RSList = getCuRetKeyRSList(cuRetKey, sourceType, stateModule, ccUniqueKey);

                  if (RSList.includes(cuRetKey)) {
                    // 直接或间接引用了这个cuRetKey，就不能去改变它，以避免死循环
                    justWarning("commitCu:" + tip + " change [" + cuRetKey + "], [" + retKey + "] referred [" + cuRetKey + "]");
                  } else {
                    computedContainer[cuRetKey] = makeCuPackedValue(false, committedCuRet[cuRetKey]);
                  }
                } else {
                  justWarning("commitCu:" + tip + " change [" + cuRetKey + "], it must have zero dep keys");
                }
              }
          });
          clearCu();
        }
      }); // 这里一次性处理所有computed or watch函数提交了然后合并后的state

      curStateForComputeFn = getFnCommittedState();

      if (curStateForComputeFn) {
        // toAssign may be null
        var assignCuState = function assignCuState(toAssign, mergeAssign) {
          if (mergeAssign === void 0) {
            mergeAssign = false;
          }

          // 确保finder函数只针对这一部分新提交的状态去触发computed or watch
          if (mergeAssign) Object.assign(curStateForComputeFn, toAssign);else curStateForComputeFn = toAssign;
          if (!curStateForComputeFn) return;
          Object.assign(committedStateInWhile, curStateForComputeFn);

          if (mergeToDelta) {
            Object.assign(initialNewState, curStateForComputeFn);
            Object.assign(initialDeltaCommittedState, curStateForComputeFn);
          } else {
            // 强行置为null，结束while循环  
            // mergeToDelta为false表示这是来自connectedRefs触发的 cu 或者 wa 函数
            // 此时传入的 initialDeltaCommittedState 是模块state
            // 但是实例里 cu 或 wa 函数只能commit private state
            // 收集到 committedStateInWhile 后，在外面单独触发新的 computedForRef watchForRef过程
            curStateForComputeFn = null;
          }

          hasDelta = true;
        };

        var ensureCommittedState = function ensureCommittedState(fnCommittedState) {
          // !!! 确保实例里调用commit只能提交privState片段，模块里调用commit只能提交moduleState片段
          // !!! 同时确保privState里的key是事先声明过的，而不是动态添加的
          var stateKeys = sourceType === 'ref' ? refCtx.privStateKeys : moduleName2stateKeys[stateModule];

          var _extractStateByKeys = extractStateByKeys(fnCommittedState, stateKeys, true),
              partialState = _extractStateByKeys.partialState,
              ignoredStateKeys = _extractStateByKeys.ignoredStateKeys;

          if (ignoredStateKeys.length) {
            var reason = "they are not " + (sourceType === CATE_REF ? 'private' : 'module') + ", fn is " + sourceType + " " + fnType;
            justWarning("these state keys[" + ignoredStateKeys.join(',') + "] are invalid, " + reason);
          }

          return partialState; // 返回合法的提交状态
        };

        var partialState = ensureCommittedState(curStateForComputeFn);

        if (partialState) {
          assignCuState(partialState); // watch里提交了新的片段state，再次过一遍computed、watch函数

          if (fnType === FN_WATCH) {
            // const stateKey2retKeys = getStateKeyRetKeysMap(refCtx, sourceType, stateModule);
            var computedDep = getCuDep(refCtx, sourceType, stateModule);

            var _finder2 = function _finder2(committedState, isBeforeMount) {
              return pickDepFns(isBeforeMount, sourceType, FN_CU, computedDep, stateModule, oldState, committedState, ccUniqueKey);
            }; // 一轮watch函数执行结束，去触发对应的computed计算


            var _executeDepFns = executeDepFns(ref, stateModule, refModule, oldState, _finder2, partialState, initialNewState, initialDeltaCommittedState, callInfo, false, // 再次由watch发起的computed函数查找调用，irFirstCall，一定是false
            FN_CU, sourceType, computedContainer),
                _hasDelta = _executeDepFns.hasDelta,
                newCommittedState = _executeDepFns.newCommittedState;

            if (_hasDelta) {
              // see https://codesandbox.io/s/complex-cu-watch-chain-s9wzt, 
              // 输入 cc.setState('test', {k1:Date.now()})，确保k4 watch被触发
              var validCommittedState = ensureCommittedState(newCommittedState); // 让validCommittedState合并到curStateForComputeFn里，确保下一轮循环相关watch能被computed里提交的状态触发

              assignCuState(validCommittedState, true);
            }
          }
        }
      }

      if (whileCount > 2) {
        justWarning('fnCtx.commit may goes endless loop, please check your code');
        justWarning(callInfo); // 清空，确保不再触发while循环

        curStateForComputeFn = null;
      }
    };

    while (curStateForComputeFn) {
      var _ret = _loop();

      if (_ret === "break") break;
    }

    executeCuInfo(nextTickCuInfo);
    return {
      hasDelta: hasDelta,
      newCommittedState: committedStateInWhile
    };
  }

  var _reducer;
  var _computedValues$2 = computedMap._computedValues;
  var okeys$1 = okeys,
      extractChangedState$1 = extractChangedState;

  var getDispatcher = function getDispatcher() {
    return ccContext.permanentDispatcher;
  };

  var setStateByModule = function setStateByModule(module, committedState, opts) {
    if (opts === void 0) {
      opts = {};
    }

    var _opts = opts,
        _opts$ref = _opts.ref,
        ref = _opts$ref === void 0 ? null : _opts$ref,
        _opts$callInfo = _opts.callInfo,
        callInfo = _opts$callInfo === void 0 ? {} : _opts$callInfo,
        _opts$noSave = _opts.noSave,
        noSave = _opts$noSave === void 0 ? false : _opts$noSave,
        force = _opts.force;

    var moduleState = _getState(module);

    var moduleComputedValue = _computedValues$2[module];
    var rootComputedDep = computedMap.getRootComputedDep();

    var curDepComputedFns = function curDepComputedFns(committedState, isFirstCall) {
      return pickDepFns(isFirstCall, CATE_MODULE, 'computed', rootComputedDep, module, moduleState, committedState);
    };

    var rootWatchDep = watch.getRootWatchDep();

    var curDepWatchFns = function curDepWatchFns(committedState, isFirstCall) {
      return pickDepFns(isFirstCall, CATE_MODULE, 'watch', rootWatchDep, module, moduleState, committedState);
    };

    var callerRef = ref || getDispatcher();
    var refModule = callerRef.module;
    var newState = Object.assign({}, moduleState, committedState);
    var deltaCommittedState = Object.assign({}, committedState);

    var _findDepFnsToExecute = executeDepFns(callerRef, module, refModule, moduleState, curDepComputedFns, deltaCommittedState, newState, deltaCommittedState, callInfo, false, FN_CU, CATE_MODULE, moduleComputedValue),
        hasDeltaInCu = _findDepFnsToExecute.hasDelta;

    var _findDepFnsToExecute2 = executeDepFns(callerRef, module, refModule, moduleState, curDepWatchFns, deltaCommittedState, newState, deltaCommittedState, callInfo, false, FN_WATCH, CATE_MODULE, moduleComputedValue),
        hasDeltaInWa = _findDepFnsToExecute2.hasDelta;

    if (!noSave) {
      saveSharedState(module, deltaCommittedState, null, force);
    }

    return {
      hasDelta: hasDeltaInCu || hasDeltaInWa,
      deltaCommittedState: deltaCommittedState
    };
  };

  var saveSharedState = function saveSharedState(module, toSave, needExtract, force) {
    if (needExtract === void 0) {
      needExtract = false;
    }

    var target = toSave;

    if (needExtract) {
      var _extractStateByKeys = extractStateByKeys(toSave, moduleName2stateKeys[module], true),
          partialState = _extractStateByKeys.partialState;

      target = partialState;
    }

    var moduleState = _getState(module);

    var prevModuleState = _getPrevState(module);

    incModuleVer(module); // 调用 extractChangedState 时会更新 moduleState

    return extractChangedState$1(moduleState, target, {
      prevStateContainer: prevModuleState,
      incStateVer: function incStateVer(key) {
        return _incStateVer(module, key);
      }
    }, force);
  };

  var _getState = function getState(module) {
    return _state[module];
  };

  var _getPrevState = function getPrevState(module) {
    return _prevState[module];
  };

  var getModuleVer = function getModuleVer(module) {
    if (!module) return _moduleVer;
    return _moduleVer[module];
  };

  var incModuleVer = function incModuleVer(module, val) {
    if (val === void 0) {
      val = 1;
    }

    try {
      _moduleVer[module] += val;
    } catch (err) {
      _moduleVer[module] = val;
    }
  };

  function replaceMV(mv) {
    _moduleVer = mv;
  }

  var getStateVer = function getStateVer(module) {
    if (!module) return _stateVer;
    return _stateVer[module];
  };

  var _incStateVer = function _incStateVer(module, key) {
    _stateVer[module][key]++;
  };

  var getRootState = function getRootState() {
    var _ref;

    return _ref = {}, _ref[MODULE_CC] = {}, _ref[MODULE_VOID] = {}, _ref[MODULE_GLOBAL] = {}, _ref[MODULE_DEFAULT] = {}, _ref;
  };
  /** ccContext section */


  var _state = getRootState();

  var _prevState = getRootState(); // record state version, to let ref effect avoid endless execute
  // 1 effect里的函数再次出发当前实例渲染，渲染完后检查prevModuleState curModuleState, 对应的key值还是不一样，又再次出发effect，造成死循环
  // 2 确保引用型值是基于原有引用修改某个属性的值时，也能触发effect


  var _stateVer = {}; // 优化before-render里无意义的merge mstate导致冗余的set（太多的set会导致 Maximum call stack size exceeded）
  // https://codesandbox.io/s/happy-bird-rc1t7?file=/src/App.js concent below 2.4.18会触发

  var _moduleVer = {};
  var ccContext = {
    getDispatcher: getDispatcher,
    isHotReloadMode: function isHotReloadMode() {
      if (ccContext.isHot) return true;
      return window && (window.webpackHotUpdate || isOnlineEditor());
    },
    runtimeVar: rv,
    runtimeHandler: rh,
    isHot: false,
    reComputed: true,
    isStartup: false,
    moduleName2stateFn: {},
    // 映射好模块的状态所有key并缓存住，用于提高性能
    moduleName2stateKeys: moduleName2stateKeys,
    // 记录模块是不是通过configure配置的
    moduleName2isConfigured: {},

    /**
     * ccClassContext:{
     *   module,
     *   ccClassKey,
     *   // renderKey机制影响的类范围，默认只影响调用者所属的类，如果有别的类观察了同一个模块的某个key，这个类的实例是否触发渲染不受renderKey影响
     *   // 为 * 表示影响所有的类，即其他类实例都受renderKey机制影响。
     *   renderKeyClasses, 
     * }
    */
    ccClassKey2Context: {},

    /**
     * globalStateKeys is maintained by cc automatically,
     * when user call cc.setGlobalState, or ccInstance.setGlobalState,
     * committedState will be checked strictly by cc with globalStateKeys,
     * committedState keys must been included in globalStateKeys
     */
    globalStateKeys: [],
    // store里的setState行为会自动触发模块级别的computed、watch函数
    store: {
      appendState: function appendState(module, state) {
        if (!moduleName2stateKeys[module]) throw new Error("module[" + module + "] not configured");
        var stateKeys = safeGetArray(moduleName2stateKeys, module);
        okeys$1(state).forEach(function (k) {
          if (!stateKeys.includes(k)) {
            stateKeys.push(k);
          }
        });
        ccContext.store.setState(module, state);
      },
      _state: _state,
      _prevState: _prevState,
      // 辅助effect逻辑用
      _stateVer: _stateVer,
      // 触发时，比较state版本，防止死循环
      getState: function getState(module) {
        if (module) return _getState(module);else return _state;
      },
      getPrevState: function getPrevState(module) {
        if (module) return _getPrevState(module);else return _prevState;
      },
      getStateVer: getStateVer,
      getModuleVer: getModuleVer,
      incModuleVer: incModuleVer,
      replaceMV: replaceMV,
      setState: function setState(module, partialSharedState, options) {
        return setStateByModule(module, partialSharedState, options);
      },
      setGlobalState: function setGlobalState(partialGlobalState) {
        return setStateByModule(MODULE_GLOBAL, partialGlobalState);
      },
      saveSharedState: saveSharedState,
      getGlobalState: function getGlobalState() {
        return _state[MODULE_GLOBAL];
      }
    },
    reducer: {
      _reducer: (_reducer = {}, _reducer[MODULE_GLOBAL] = {}, _reducer[MODULE_CC] = {}, _reducer),
      _caller: {},
      // _reducerRefCaller: {},//为实例准备的reducer caller
      _fnName2fullFnNames: {},
      _module2fnNames: {},
      _module2Ghosts: {}
    },
    computed: computedMap,
    watch: watch,
    refStore: {
      _state: {},
      setState: function setState(ccUniqueKey, partialStoredState) {
        var _state = ccContext.refStore._state;
        var fullStoredState = _state[ccUniqueKey];
        var mergedState = Object.assign({}, fullStoredState, partialStoredState);
        _state[ccUniqueKey] = mergedState;
      }
    },
    lifecycle: lifecycle,
    ccUKey2ref: refs,

    /**
     * key:eventName,  value: Array<{ccKey, identity,  handlerKey}>
     */
    event2handlers: {},
    ccUKey2handlerKeys: {},

    /**
     * to avoid memory leak, the handlerItem of event2handlers just store handlerKey, 
     * it is a ref that towards ccUniqueKeyEvent_handler_'s key
     * when component unmounted, its handler will been removed
     */
    handlerKey2handler: {},
    waKey2uKeyMap: waKey2uKeyMap,
    waKey2staticUKeyMap: waKey2staticUKeyMap,
    module2insCount: module2insCount,
    refs: refs,
    info: {
      packageLoadTime: Date.now(),
      firstStartupTime: '',
      latestStartupTime: '',
      version: '2.16.6',
      author: 'fantasticsoul',
      emails: ['624313307@qq.com', 'zhongzhengkai@gmail.com'],
      tag: 'glory'
    },
    featureStr2classKey: {},
    userClassKey2featureStr: {},
    middlewares: [],
    plugins: [],
    pluginNameMap: {},

    /** @type {import('../types-inner').IRef | null} */
    permanentDispatcher: null,
    localStorage: null,
    recoverRefState: noop,
    getModuleStateKeys: function getModuleStateKeys(m) {
      return ccContext.moduleName2stateKeys[m];
    }
  };

  ccContext.recoverRefState = function () {
    var localStorage = ccContext.localStorage;
    if (!localStorage) return;
    var lsLen = localStorage.length;
    var _refStoreState = ccContext.refStore._state;

    try {
      for (var i = 0; i < lsLen; i++) {
        var lsKey = localStorage.key(i);
        if (!lsKey.startsWith('CCSS_')) return;
        _refStoreState[lsKey.substr(5)] = JSON.parse(localStorage.getItem(lsKey));
      }
    } catch (err) {
      logErr(err);
    }
  };

  /**
   * when user call configure bofore run,
   * target module will be pushed to pending modules array,
   * later they all will been configured by run api in startup process
   */
  var pendingModules = [];

  var isModuleNameCcLike$1 = isModuleNameCcLike,
      isModuleNameValid$1 = isModuleNameValid,
      vbi = verboseInfo,
      makeError$1 = makeError,
      okeys$2 = okeys;
  var store = ccContext.store,
      getModuleStateKeys = ccContext.getModuleStateKeys;
  /** 检查模块名，名字合法，就算检查通过 */

  function checkModuleNameBasically(moduleName, innerParams) {
    if (innerParams === void 0) {
      innerParams = {};
    }

    if (!isModuleNameValid$1(moduleName)) {
      throw new Error("module[" + moduleName + "] writing is invalid!");
    } // moduleName will be named starting with $cc while calling createModule


    if (innerParams[ALCC_KEY] === 1) return;

    if (isModuleNameCcLike$1(moduleName)) {
      throw new Error("'$$cc' is a built-in module name");
    }
  }
  /**
   * 检查模块名, moduleMustNotExisted 默认为true，
   * true表示【module名字合法】且【对应的moduleState不存在】，才算检查通过  
   * false表示【module名字合法】且【对应的moduleState存在】，才算检查通过
   * @param {string} moduleName 
   * @param {boolean} [moduleMustNotExisted=true] - true 要求模块应该不存在 ,false 要求模块状态应该已存在
   */

  function checkModuleName(moduleName, moduleMustNotExisted, vbiMsg, innerParams) {
    if (moduleMustNotExisted === void 0) {
      moduleMustNotExisted = true;
    }

    if (vbiMsg === void 0) {
      vbiMsg = '';
    }

    var _vbiMsg = vbiMsg || "module[" + moduleName + "]";

    var _state = store._state;
    checkModuleNameBasically(moduleName, innerParams);

    if (moduleName !== MODULE_GLOBAL) {
      if (moduleMustNotExisted) {
        if (isObjectNotNull(_state[moduleName])) {
          // 但是却存在了
          throw makeError$1(ERR.CC_MODULE_NAME_DUPLICATE, vbi(_vbiMsg));
        }
      } else {
        if (!_state[moduleName]) {
          // 实际上却不存在
          throw makeError$1(ERR.CC_MODULE_NOT_FOUND, vbi(_vbiMsg));
        }
      }
    }
  }
  function checkModuleNameAndState(moduleName, moduleState, moduleMustNotExisted, innerParams) {
    checkModuleName(moduleName, moduleMustNotExisted, '', innerParams);

    if (!isPJO(moduleState)) {
      throw new Error("module[" + moduleName + "]'s state " + INAJ);
    }
  }
  function checkStoredKeys(belongModule, storedKeys) {
    if (storedKeys === '*') {
      return;
    }

    if (Array.isArray(storedKeys)) {
      checkKeys(belongModule, storedKeys, false, 'storedKeys invalid ');
      return;
    }

    throw new Error("storedKeys type err, " + STR_ARR_OR_STAR);
  }
  function checkKeys(module, keys, keyShouldBeModuleStateKey, extraInfo) {
    if (keyShouldBeModuleStateKey === void 0) {
      keyShouldBeModuleStateKey = true;
    }

    if (extraInfo === void 0) {
      extraInfo = '';
    }

    var keyword = keyShouldBeModuleStateKey ? '' : 'not ';

    var keyTip = function keyTip(name, keyword) {
      return extraInfo + "key[" + name + "] must " + keyword + "be a module state key";
    };

    var moduleStateKeys = getModuleStateKeys(module);
    keys.forEach(function (sKey) {
      var keyInModuleState = moduleStateKeys.includes(sKey);

      var throwErr = function throwErr() {
        throw new Error(keyTip(sKey, keyword));
      };

      if (keyShouldBeModuleStateKey) {
        !keyInModuleState && throwErr();
      } else {
        keyInModuleState && throwErr();
      }
    });
  }
  function checkConnectSpec(connectSpec) {
    var invalidConnect = "param connect is invalid,";

    var invalidConnectItem = function invalidConnectItem(m) {
      return invalidConnect + " module[" + m + "]'s value " + STR_ARR_OR_STAR;
    };

    okeys$2(connectSpec).forEach(function (m) {
      checkModuleName(m, false);
      var val = connectSpec[m];

      if (typeof val === 'string') {
        if (val !== '*' && val !== '-') throw new Error(invalidConnectItem(m));
      } else if (!Array.isArray(val)) {
        throw new Error(invalidConnectItem(m));
      } else {
        checkKeys(m, val, true, "connect module[" + m + "] invalid,");
      }
    });
  }
  function checkRenderKeyClasses(regRenderKeyClasses) {
    if (!Array.isArray(regRenderKeyClasses) && regRenderKeyClasses !== '*') {
      throw new Error("renderKeyClasses type err, it " + STR_ARR_OR_STAR);
    }
  }

  var keyWord = '.checkModuleNameAndState';

  function getDupLocation(errStack) {
    if (!errStack) errStack = '';
    /** stack may like this: at CodeSandbox
    Error: module name duplicate! --verbose-info: module[SetupDemo]
      at makeError (https://xvcej.csb.app/node_modules/concent/src/support/util.js:128:15)
      at checkModuleName (https://xvcej.csb.app/node_modules/concent/src/core/param/checker.js:71:15)
    >>  at Object.checkModuleNameAndState (https://xvcej.csb.app/node_modules/concent/src/core/param/checker.js:90:3)
      at _default (https://xvcej.csb.app/node_modules/concent/src/core/state/init-module-state.js:25:13)
      at _default (https://xvcej.csb.app/node_modules/concent/src/api/configure.js:96:35)
    >>  at evaluate (https://xvcej.csb.app/src/pages/SetupDemo/model/index.js:13:24)
      at Jn (https://codesandbox.io/static/js/sandbox.fb6f2fde.js:1:146799)
      at e.value (https://codesandbox.io/static/js/sandbox.fb6f2fde.js:1:162063)
      at e.value (https://codesandbox.io/static/js/sandbox.fb6f2fde.js:1:202119)
      at t (https://codesandbox.io/static/js/sandbox.fb6f2fde.js:1:161805)
      ...
     or: at local web-dev-server
     Error: module name duplicate! --verbose-info: module[batchAddGroup]
      at makeError (http://localhost:3001/static/js/main.chunk.js:20593:17)
      at checkModuleName (http://localhost:3001/static/js/main.chunk.js:17256:15)
    >>  at Module.checkModuleNameAndState (http://localhost:3001/static/js/main.chunk.js:17273:3)
      at http://localhost:3001/static/js/main.chunk.js:19804:106
      at Object.configure (http://localhost:3001/static/js/main.chunk.js:13750:80)
    >>  at Module../src/components/layer/BatchOpGroup/model/index.js (http://localhost:3001/static/js/main.chunk.js:8374:55)
      at __webpack_require__ (http://localhost:3001/static/js/bundle.js:782:30)
      at fn (http://localhost:3001/static/js/bundle.js:150:20)
     */

    var arr = errStack.split('\n');
    var len = arr.length;
    var locationStr = '';

    for (var i = 0; i < len; i++) {
      var strPiece = arr[i];

      if (strPiece.includes(keyWord)) {
        var _ret = function () {
          var callConfigureIdx = i + 3; // 向下3句就是调用处
          // 这句话是具体调用configure的地方
          // at Module../src/components/layer/BatchOpGroup/model/index.js (http://localhost:3001/static/js/main.chunk.js:8374:55)

          var targetStrPiece = arr[callConfigureIdx];
          var arr2 = targetStrPiece.split(':');
          var lastIdx = arr2.length - 1;
          var locationStrArr = [];
          arr2.forEach(function (str, idx) {
            if (idx !== lastIdx) locationStrArr.push(str);
          }); // at Module../src/components/layer/BatchOpGroup/model/index.js (http://localhost:3001/static/js/main.chunk.js:8374

          locationStr = locationStrArr.join(':');
          return "break";
        }();

        break;
      }
    }

    return locationStr;
  }

  var module2dupLocation = {};
  var guessDuplicate = (function (err, module, tag) {
    if (err.code === ERR.CC_MODULE_NAME_DUPLICATE && ccContext.isHotReloadMode()) {
      var dupLocation = getDupLocation(err.stack);
      var key = tag + "|--link--|" + module;
      var prevLocation = module2dupLocation[key];

      if (!prevLocation) {
        // 没有记录过
        module2dupLocation[key] = dupLocation;
      } else if (dupLocation !== prevLocation) {
        throw err;
      }
    } else {
      throw err;
    }
  });

  var key2findResult = {};
  function createModuleNode(moduleName) {
    key2findResult[moduleName] = {};
  }
  function getCacheKey(moduleName, sharedStateKeys, renderKeys, renderKeyClasses) {
    if (renderKeyClasses === void 0) {
      renderKeyClasses = [];
    }

    var renderKeyStr = renderKeys ? renderKeys.join(',') : '';
    var featureStr1 = sharedStateKeys.sort().join(',');
    var featureStr2 = renderKeyClasses === '*' ? '*' : renderKeyClasses.sort().join(',');
    return moduleName + "/" + featureStr1 + "/" + renderKeyStr + "/" + featureStr2;
  }
  function getCache(moduleName, key) {
    return key2findResult[moduleName][key];
  }
  function setCache(moduleName, key, result) {
    key2findResult[moduleName][key] = result;
  }

  var safeAssignToMap$1 = safeAssignToMap,
      okeys$3 = okeys,
      safeGet$1 = safeGet;
  function initModuleState (module, mState, moduleMustNotExisted, innerParams) {
    if (moduleMustNotExisted === void 0) {
      moduleMustNotExisted = true;
    }

    // force MODULE_VOID state as {}
    var state = module === MODULE_VOID ? {} : mState;

    try {
      checkModuleNameAndState(module, state, moduleMustNotExisted, innerParams);
    } catch (err) {
      guessDuplicate(err, module, 'state');
    }

    createModuleNode(module);
    var ccStore = ccContext.store;
    var rootState = ccStore.getState();
    var rootStateVer = ccStore.getStateVer();
    var rootModuleVer = ccStore.getModuleVer();
    var prevRootState = ccStore.getPrevState();
    safeAssignToMap$1(rootState, module, state);
    safeAssignToMap$1(prevRootState, module, state);
    rootStateVer[module] = okeys$3(state).reduce(function (map, key) {
      map[key] = 1;
      return map;
    }, {});
    rootModuleVer[module] = 1; // 把_computedValueOri safeGet从init-module-computed调整到此处
    // 防止用户不定义任何computed，而只是定义watch时报错undefined

    var cu = ccContext.computed;
    safeGet$1(cu._computedDep, module, makeCuDepDesc());
    safeGet$1(cu._computedValues, module);
    safeGet$1(cu._computedRawValues, module);
    var stateKeys = okeys$3(state);
    ccContext.moduleName2stateKeys[module] = stateKeys;

    if (module === MODULE_GLOBAL) {
      var globalStateKeys = ccContext.globalStateKeys;
      stateKeys.forEach(function (key) {
        if (!globalStateKeys.includes(key)) globalStateKeys.push(key);
      });
    }

    ccContext.module2insCount[module] = 0;
  }

  /** @typedef {import('../../types').ICtxBase} ICtxBase */
  var ignoreIt = "if this message doesn't matter, you can ignore it";
  /****
   * 尽可能优先找module的实例，找不到的话在根据mustBelongToModule值来决定要不要找其他模块的实例
   * pick one ccInstance ref randomly
   */

  function pickOneRef (module, mustBelongToModule) {
    if (mustBelongToModule === void 0) {
      mustBelongToModule = false;
    }

    var ccUKey2ref = ccContext.ccUKey2ref;
    var oneRef = null;

    if (module) {
      checkModuleName(module, false);
      var ukeys = okeys(ccUKey2ref);
      var len = ukeys.length;

      for (var i = 0; i < len; i++) {
        /** @type {{ctx:ICtxBase}} */
        var ref = ccUKey2ref[ukeys[i]];

        if (ref.ctx.module === module) {
          oneRef = ref;
          break;
        }
      }
    }

    if (!oneRef) {
      if (mustBelongToModule) {
        throw new Error("[[pickOneRef]]: no ref found for module[" + module + "]!," + ignoreIt);
      } else {
        oneRef = ccContext.permanentDispatcher;
      }
    }

    return oneRef;
  }

  var makeUniqueCcKey$1 = makeUniqueCcKey,
      justWarning$1 = justWarning;

  var resolve = function resolve() {
    return Promise.resolve();
  };

  function ccDispatch (action, payLoadWhenActionIsString, rkOrOptions, delay$$1, options) {
    if (rkOrOptions === void 0) {
      rkOrOptions = '';
    }

    if (options === void 0) {
      options = {};
    }

    var _options = options,
        ccClassKey = _options.ccClassKey,
        ccKey = _options.ccKey,
        _options$throwError = _options.throwError,
        throwError = _options$throwError === void 0 ? true : _options$throwError,
        _options$refModule = _options.refModule,
        refModule = _options$refModule === void 0 ? '' : _options$refModule;

    if (action === undefined && payLoadWhenActionIsString === undefined) {
      throw new Error("params type error");
    }

    var dispatchFn,
        module = '',
        fnName = '';

    try {
      if (ccClassKey && ccKey) {
        var uKey = makeUniqueCcKey$1(ccClassKey, ccKey);
        var targetRef = ccContext.refs[uKey];

        if (!targetRef) {
          justWarning$1("no ref found for ccUniqueKey:" + uKey + "!");
          return resolve();
        } else {
          dispatchFn = targetRef.ctx.dispatch;
        }
      } else {
        if (typeof action == 'string') {
          if (action.includes('/')) {
            var _action$split = action.split('/'),
                m = _action$split[0],
                name = _action$split[1];

            module = m;
            fnName = name;
          } else {
            fnName = action;
          }
        }

        var ref;

        if (module && module !== '*') {
          try {
            ref = pickOneRef(module);
          } catch (err) {// do nothing
          }
        } else if (refModule) {
          ref = pickOneRef(refModule);
        }

        if (!ref) {
          ref = pickOneRef();
        }

        dispatchFn = ref.ctx.dispatch;
      }

      if (module === '*') {
        var fullFnNames = ccContext.reducer._fnName2fullFnNames[fnName];
        if (!fullFnNames) return;
        var tasks = [];
        fullFnNames.forEach(function (fullFnName) {
          tasks.push(dispatchFn(fullFnName, payLoadWhenActionIsString, rkOrOptions, delay$$1));
        });
        return Promise.all(tasks);
      } else {
        return dispatchFn(action, payLoadWhenActionIsString, rkOrOptions, delay$$1);
      }
    } catch (err) {
      if (throwError) throw err;else {
        justWarning$1(err.message);
        return resolve();
      }
    }
  }

  function dispatch (action, maybePayload, rkOrOptions, delay, extra) {
    return ccDispatch(action, maybePayload, rkOrOptions, delay, extra);
  }

  function initModuleReducer (module, reducer, ghosts) {
    if (reducer === void 0) {
      reducer = {};
    }

    if (ghosts === void 0) {
      ghosts = [];
    }

    if (!isPJO(reducer)) {
      throw new Error("module[" + module + "] reducer " + INAJ);
    }

    var _ccContext$reducer = ccContext.reducer,
        _reducer = _ccContext$reducer._reducer,
        _caller = _ccContext$reducer._caller,
        _fnName2fullFnNames = _ccContext$reducer._fnName2fullFnNames,
        _module2fnNames = _ccContext$reducer._module2fnNames,
        _module2Ghosts = _ccContext$reducer._module2Ghosts; // 防止同一个reducer被载入到不同模块时，setState附加逻辑不正确

    var newReducer = Object.assign({}, reducer);
    _reducer[module] = newReducer;
    var subReducerCaller = safeGet(_caller, module); // const subReducerRefCaller = util.safeGet(_reducerRefCaller, module);

    var fnNames = safeGetArray(_module2fnNames, module);
    safeGet(_module2Ghosts, module, ghosts.slice());
    ghosts.forEach(function (ghostFnName) {
      if (!reducer[ghostFnName]) throw new Error("ghost[" + ghostFnName + "] not exist");
    }); // 自动附加一个setState在reducer里

    if (!newReducer.setState) newReducer.setState = function (payload) {
      return payload;
    };
    var reducerFnNames = okeys(newReducer);
    reducerFnNames.forEach(function (name) {
      // avoid hot reload
      noDupPush(fnNames, name);
      var fullFnName = module + "/" + name;
      var list = safeGetArray(_fnName2fullFnNames, name); // avoid hot reload

      noDupPush(list, fullFnName);

      subReducerCaller[name] = function (payload, renderKeyOrOptions, delay$$1) {
        return dispatch(fullFnName, payload, renderKeyOrOptions, delay$$1);
      };

      var reducerFn = newReducer[name];

      if (!isFn(reducerFn)) {
        throw new Error("module[" + module + "] reducer[" + name + "] " + INAF);
      } else {
        var targetFn = reducerFn;

        if (reducerFn.__fnName) {
          // 将某个已载入到模块a的reducer再次载入到模块b
          targetFn = function targetFn(payload, moduleState, actionCtx) {
            return reducerFn(payload, moduleState, actionCtx);
          };

          newReducer[name] = targetFn;
        }

        targetFn.__fnName = name; // !!! 很重要，将真正的名字附记录上，否则名字是编译后的缩写名
        // 给函数绑上模块名，方便dispatch可以直接调用函数时，也能知道是更新哪个模块的数据，

        targetFn.__stateModule = module; // AsyncFunction GeneratorFunction Function

        targetFn.__ctName = reducerFn.__ctName || reducerFn.constructor.name;
        targetFn.__isAsync = isAsyncFn(reducerFn);
      }
    });
  }

  /** eslint-disable */
  var _currentIndex = 0;
  var letters = ['a', 'A', 'b', 'B', 'c', 'C', 'd', 'D', 'e', 'E', 'f', 'F', 'g', 'G', 'h', 'H', 'i', 'I', 'j', 'J', 'k', 'K', 'l', 'L', 'm', 'M', 'n', 'N', 'o', 'O', 'p', 'P', 'q', 'Q', 'r', 'R', 's', 'S', 't', 'T', 'u', 'U', 'v', 'V', 'w', 'W', 'x', 'X', 'y', 'Y', 'z', 'Z'];

  function genNonceStr(length) {
    if (length === void 0) {
      length = 6;
    }

    var ret = '';

    for (var i = 0; i < length; i++) {
      ret += letters[randomNumber()];
    }

    return ret;
  }

  function uuid (tag) {
    _currentIndex++;
    var nonceStr = tag || genNonceStr();
    return nonceStr + "_" + _currentIndex;
  }

  /** @typedef {import('../../types-inner').IRefCtx} Ctx */
  var moduleName2stateKeys$1 = ccContext.moduleName2stateKeys,
      runtimeVar = ccContext.runtimeVar,
      runtimeHandler = ccContext.runtimeHandler,
      store$1 = ccContext.store;
  var sortFactor = 1;
  /**
  computed('foo/firstName', ()=>{});
  //or
  computed('firstName', ()=>{}, ['foo/firstName']);

  computed('foo/firstName', {
    fn: ()=>{},
    compare: false,
    depKeys: ['firstName'],
  });

  computed({
    'foo/firstName':()=>{},
    'foo/fullName':{
      fn:()=>{},
      depKeys:['firstName', 'lastName']
    }
  });
  // or 
  computed({
    'foo/firstName':()=>{},
    'fullName':{
      fn:()=>{},
      depKeys:['foo/firstName', 'foo/lastName']
    }
  });

  computed(ctx=>{ return cuDesc}
  */
  // cate: module | ref

  function configureDepFns (cate, confMeta, item, handler, depKeysOrOpt) {
    /** @type Ctx */
    var ctx = confMeta.refCtx;
    var type = confMeta.type;

    if (cate === CATE_REF && !ctx.__$$inBM) {
      var tip = cate + " " + type + " must been called in setup block";
      runtimeHandler.tryHandleWarning(new Error(tip));
      return;
    }

    if (!item) return;
    var itype = typeof item;

    var _descObj;

    if (itype === 'string') {
      var _descObj2, _descObj3;

      // retKey
      if (isPJO(handler)) _descObj = (_descObj2 = {}, _descObj2[item] = handler, _descObj2);else if (typeof handler === FN) _descObj = (_descObj3 = {}, _descObj3[item] = makeFnDesc(handler, depKeysOrOpt), _descObj3);
    } else if (isPJO(item)) {
      _descObj = item;
    } else if (itype === FN) {
      _descObj = item(ctx);

      if (!isPJO(_descObj)) {
        runtimeHandler.tryHandleWarning(new Error("type of " + type + " callback result must be an object"));
        return;
      }
    }

    if (!_descObj) {
      runtimeHandler.tryHandleWarning(new Error(cate + " " + type + " param type error"));
      return;
    }

    _parseDescObj(cate, confMeta, _descObj);
  }

  function _parseDescObj(cate, confMeta, descObj) {
    var computedCompare = runtimeVar.computedCompare,
        watchCompare = runtimeVar.watchCompare,
        watchImmediate = runtimeVar.watchImmediate;
    var tryHandleWarning = runtimeHandler.tryHandleWarning; // 读全局的默认值

    var defaultCompare = confMeta.type === FN_CU ? computedCompare : watchCompare;
    var callerModule = confMeta.module;
    okeys(descObj).forEach(function (retKey) {
      var val = descObj[retKey];
      var targetItem = val;

      if (isFn(val)) {
        targetItem = {
          fn: val
        };
      } // 有可能是空模块，如未写任何内容的computed.js文件，babel编译后为 { default: {} }
      // 所以此处需进一步判断 targetItem.fn


      if (isPJO(targetItem) && isFn(targetItem.fn)) {
        var _targetItem = targetItem,
            fn = _targetItem.fn,
            _targetItem$immediate = _targetItem.immediate,
            immediate = _targetItem$immediate === void 0 ? watchImmediate : _targetItem$immediate,
            _targetItem$compare = _targetItem.compare,
            compare = _targetItem$compare === void 0 ? defaultCompare : _targetItem$compare,
            lazy = _targetItem.lazy,
            _targetItem$retKeyDep = _targetItem.retKeyDep,
            retKeyDep = _targetItem$retKeyDep === void 0 ? true : _targetItem$retKeyDep,
            allowSlash = _targetItem.allowSlash,
            depKeyModule = _targetItem.depKeyModule; // 确保用户显示的传递null、undefined、0、都置为依赖收集状态

        var depKeys = targetItem.depKeys || '-'; // 作为动态的依赖收集函数，作用于watch函数

        if (isFn(depKeys)) {
          // ctx.watchModule 在内部会显式的传递depKeyModule
          // 而ctx.watch 是不传递 depKeyModule的，所以此处这样写
          var targetDepModule = depKeyModule || callerModule;
          var moduleState = store$1.getState(targetDepModule);
          var collectedDepKeys = [];
          depKeys(makeCuObState(moduleState, collectedDepKeys));
          depKeys = collectedDepKeys.map(function (key) {
            return targetDepModule + "/" + key;
          });
        } // if user don't pass sort explicitly, computed fn will been called orderly by sortFactor


        var sort = targetItem.sort || sortFactor++;
        var fnUid = uuid('mark');

        if (depKeys === '*' || depKeys === '-') {
          // 处于依赖收集，且用户没有显式的通过设置retKeyDep为false来关闭同名依赖规则时，会自动设置同名依赖
          var mapSameName = depKeys === '-' && retKeyDep;

          var _resolveKey2 = _resolveKey(confMeta, callerModule, retKey, mapSameName, allowSlash),
              pureKey = _resolveKey2.pureKey,
              module = _resolveKey2.module;

          var err = _checkRetKeyDup(cate, confMeta, fnUid, pureKey);

          if (err) return tryHandleWarning(err); // when retKey is '/xxxx', here need pass xxxx as retKey

          _mapDepDesc(cate, confMeta, module, pureKey, fn, depKeys, immediate, compare, lazy, sort);
        } else {
          if (depKeys.length === 0) {
            var _resolveKey3 = _resolveKey(confMeta, callerModule, retKey, false, allowSlash),
                _pureKey = _resolveKey3.pureKey,
                _module2 = _resolveKey3.module; // consume retKey is stateKey


            var _err = _checkRetKeyDup(cate, confMeta, fnUid, _pureKey);

            if (_err) return tryHandleWarning(_err);

            _mapDepDesc(cate, confMeta, _module2, _pureKey, fn, depKeys, immediate, compare, lazy, sort);
          } else {
            // ['foo/b1', 'bar/b1'] or ['b1', 'b2']
            var _resolveKey4 = _resolveKey(confMeta, callerModule, retKey, false, allowSlash),
                _pureKey2 = _resolveKey4.pureKey,
                moduleOfKey = _resolveKey4.moduleOfKey;

            var stateKeyModule = moduleOfKey;

            var _err2 = _checkRetKeyDup(cate, confMeta, fnUid, _pureKey2);

            if (_err2) return tryHandleWarning(_err2); // 给depKeys按module分类，此时它们都指向同一个retKey，同一个fn，但是会被分配ctx.computedDep或者watchDep的不同映射里

            var module2depKeys = {}; // ['foo/b1', 'bar/b1']

            depKeys.forEach(function (depKey) {
              // !!!这里只是单纯的解析depKey，不需要有映射同名依赖的行为，映射同名依赖仅发生在传入retKey的时候
              // consume depKey is stateKey
              var _resolveKey5 = _resolveKey(confMeta, callerModule, depKey, false, allowSlash),
                  isStateKey = _resolveKey5.isStateKey,
                  pureKey = _resolveKey5.pureKey,
                  module = _resolveKey5.module; // ok: retKey: 'xxxx' depKeys:['foo/f1', 'foo/f2', 'bar/b1', 'bar/b2'], 
              //     some stateKey belong to foo, some belong to bar
              // ok: retKey: 'foo/xxxx' depKeys:['f1', 'f2'], all stateKey belong to foo
              // ok: retKey: 'foo/xxxx' depKeys:['foo/f1', 'foo/f2'], all stateKey belong to foo
              // both left and right include module but they are not equal, this situation is not ok!
              // not ok: retKey: 'foo/xxxx' depKeys:['foo/f1', 'foo/f2', 'bar/b1', 'bar/b2']


              if (stateKeyModule && module !== stateKeyModule) {
                throw new Error("found slash both in retKey[" + retKey + "] and depKey[" + depKey + "], but their module is different");
              }

              var depKeys = safeGetArray(module2depKeys, module);

              if (!isStateKey) {
                throw new Error("depKey[" + depKey + "] invalid, module[" + module + "] doesn't include its stateKey[" + pureKey + "]");
              } else {
                // 当一个实例里 ctx.computed ctx.watch 的depKeys里显示的标记了依赖时
                // 在这里需要立即记录依赖了
                _mapIns$1(confMeta, module, pureKey);
              }

              depKeys.push(pureKey);
            });
            okeys(module2depKeys).forEach(function (m) {
              // 指向同一个fn，允许重复
              _mapDepDesc(cate, confMeta, m, _pureKey2, fn, module2depKeys[m], immediate, compare, lazy, sort);
            });
          }
        }
      } else if (retKey !== 'default') {
        // default 是空模块导出导致的，这里就不打印了
        tryHandleWarning("module[" + callerModule + "] " + confMeta.type + " retKey[" + retKey + "] type error");
      }
    });
  } // just return an error if key dup


  function _checkRetKeyDup(cate, confMeta, fnUid, retKey) {
    if (cate === CATE_REF) {
      var _confMeta$refCtx = confMeta.refCtx,
          ccUniqueKey = _confMeta$refCtx.ccUniqueKey,
          retKey2fnUid = _confMeta$refCtx.retKey2fnUid;
      var type = confMeta.type;
      var typedRetKey = type + "_" + retKey;
      var mappedFn = retKey2fnUid[typedRetKey];

      if (mappedFn) {
        return new Error("ccUKey[" + ccUniqueKey + "] retKey[" + retKey + "] duplicate in ref " + type);
      }

      retKey2fnUid[typedRetKey] = fnUid;
    }
  } // !!!由实例调用computed或者watch，监听同名的retKey，更新stateKey与retKey的关系映射


  function _mapSameNameRetKey(confMeta, module, retKey, isModuleStateKey) {
    var dep = confMeta.dep;
    var moduleDepDesc = safeGet(dep, module, makeCuDepDesc());
    var stateKey2retKeys = moduleDepDesc.stateKey2retKeys,
        retKey2stateKeys = moduleDepDesc.retKey2stateKeys;
    safeGetThenNoDupPush(stateKey2retKeys, retKey, retKey);
    safeGetThenNoDupPush(retKey2stateKeys, retKey, retKey); // 记录依赖

    isModuleStateKey && _mapIns$1(confMeta, module, retKey);
  }

  function _mapIns$1(confMeta, module, retKey) {
    var ctx = confMeta.refCtx;

    if (ctx) {
      ctx.__$$staticWaKeys[makeWaKey(module, retKey)] = 1;
    }
  } // 映射依赖描述对象, module即是取的dep里的key


  function _mapDepDesc(cate, confMeta, module, retKey, fn, depKeys, immediate, compare, lazy, sort) {
    var dep = confMeta.dep;
    var moduleDepDesc = safeGet(dep, module, makeCuDepDesc());
    var retKey2fn = moduleDepDesc.retKey2fn,
        stateKey2retKeys = moduleDepDesc.stateKey2retKeys,
        retKey2lazy = moduleDepDesc.retKey2lazy,
        retKey2stateKeys = moduleDepDesc.retKey2stateKeys;
    var isStatic = Array.isArray(depKeys) && depKeys.length === 0; // 确保static computed优先优先执行

    var targetSort = sort;

    if (isStatic) {
      if (targetSort >= 0) targetSort = -1;
    } else {
      if (sort < 0) targetSort = 0;
    }

    var fnDesc = {
      fn: fn,
      immediate: immediate,
      compare: compare,
      depKeys: depKeys,
      sort: targetSort,
      isStatic: isStatic
    }; // retKey作为将计算结果映射到refComputed | moduleComputed 里的key

    if (retKey2fn[retKey]) {
      if (cate !== CATE_REF) {
        // 因为热加载，对于module computed 定义总是赋值最新的，
        retKey2fn[retKey] = fnDesc;
        retKey2lazy[retKey] = lazy;
      } // do nothing

    } else {
      retKey2fn[retKey] = fnDesc;
      retKey2lazy[retKey] = lazy;
      moduleDepDesc.fnCount++;
    }

    if (cate === CATE_REF) {
      confMeta.retKeyFns[retKey] = retKey2fn[retKey];
    }

    var refCtx = confMeta.refCtx;

    if (refCtx) {
      if (confMeta.type === 'computed') refCtx.hasComputedFn = true;else refCtx.hasWatchFn = true;
    } //处于自动收集依赖状态，首次遍历完计算函数后之后再去写stateKey_retKeys_, retKey2stateKeys
    // in find-dep-fns-to-execute.js setStateKeyRetKeysMap


    if (depKeys === '-') return;
    var allKeyDep = depKeys === '*';
    var targetDepKeys = allKeyDep ? ['*'] : depKeys;

    if (allKeyDep) {
      retKey2stateKeys[retKey] = moduleName2stateKeys$1[module];
    }

    targetDepKeys.forEach(function (sKey) {
      if (!allKeyDep) safeGetThenNoDupPush(retKey2stateKeys, retKey, sKey); //一个依赖key列表里的stateKey会对应着多个结果key

      safeGetThenNoDupPush(stateKey2retKeys, sKey, retKey);
    });
  } // 分析retKey或者depKey是不是stateKey,
  // 返回的是净化后的key


  function _resolveKey(confMeta, module, retKey, mapSameName, allowSlash) {
    if (mapSameName === void 0) {
      mapSameName = false;
    }

    var targetModule = module,
        targetRetKey = retKey,
        moduleOfKey = '';

    if (retKey.includes('/')) {
      if (allowSlash !== true) {
        throw new Error("key[" + retKey + "] can't contains /, please use (computedModule,watchModule) instead of (computed, watch) if you want to operate another module");
      }

      var _retKey$split = retKey.split('/'),
          _module = _retKey$split[0],
          _stateKey = _retKey$split[1];

      if (_module) {
        moduleOfKey = _module;
        targetModule = _module; // '/name' 支持这种申明方式
      }

      targetRetKey = _stateKey;
    }

    var stateKeys;
    var moduleStateKeys = moduleName2stateKeys$1[targetModule];

    if (targetModule === confMeta.module) {
      // 此时computed & watch观察的是对象的所有stateKeys
      stateKeys = confMeta.stateKeys;
    } else {
      // 对于属于bar的ref 配置key 'foo/a'时，会走入到此块
      stateKeys = moduleStateKeys;

      if (!stateKeys) {
        throw makeError(ERR.CC_MODULE_NOT_FOUND, verboseInfo("module[" + targetModule + "]"));
      }

      if (!confMeta.connect[targetModule]) {
        throw makeError(ERR.CC_MODULE_NOT_CONNECTED, verboseInfo("module[" + targetModule + "], retKey[" + targetRetKey + "]"));
      }
    }

    var isStateKey = stateKeys.includes(targetRetKey);

    if (mapSameName && isStateKey) {
      _mapSameNameRetKey(confMeta, targetModule, targetRetKey, moduleStateKeys.includes(targetRetKey));
    }

    return {
      isStateKey: isStateKey,
      pureKey: targetRetKey,
      module: targetModule,
      moduleOfKey: moduleOfKey
    };
  }

  /**
   * 提供给用户使用，从存储的打包计算对象里获取目标计算结果的容器
   * ------------------------------------------------------------------------------------
   * 触发get时，会从打包对象里获取目标计算结果，
   * 打包对象按 ${retKey} 放置在originalCuContainer里，
   * 对于refComputed，rawComputedValues 是 ctx.refComputedRawValues
   * 对于moduleComputed，rawComputedValues 是  concentContext.ccComputed._computedRawValues.{$module}
   */

  function makeCuRetContainer (computed, rawComputedValues) {
    // prepare for refComputed or moduleComputed
    var computedValues = {};
    okeys(computed).forEach(function (key) {
      // 用这个对象来存其他信息, 避免get无限递归，
      rawComputedValues[key] = makeCuPackedValue();
      Object.defineProperty(computedValues, key, {
        get: function get() {
          // 防止用户传入未定义的key
          var value = rawComputedValues[key] || {};
          var needCompute = value.needCompute,
              fn = value.fn,
              newState = value.newState,
              oldState = value.oldState,
              fnCtx = value.fnCtx,
              isLazy = value.isLazy,
              result = value.result;

          if (!isLazy) {
            return result;
          }

          if (isLazy && needCompute) {
            var ret = fn(newState, oldState, fnCtx);
            value.result = ret;
            value.needCompute = false;
          }

          return value.result;
        },
        set: function set(input) {
          var value = rawComputedValues[key];

          if (!input[CU_KEY]) {
            justWarning("computed value can not been changed manually");
            return;
          }

          if (input.isLazy) {
            value.isLazy = true;
            value.needCompute = true;
            value.newState = input.newState;
            value.oldState = input.oldState;
            value.fn = input.fn;
            value.fnCtx = input.fnCtx;
          } else {
            value.isLazy = false;
            value.result = input.result;
          }
        }
      });
    });
    return computedValues;
  }

  var isPJO$1 = isPJO;
  function initModuleComputed (module, computed) {
    if (computed === void 0) {
      computed = {};
    }

    if (!isPJO$1(computed)) {
      throw new Error("module[" + module + "] computed " + INAJ);
    }

    var ccComputed = ccContext.computed;
    var rootState = ccContext.store.getState();
    var rootComputedValue = ccComputed.getRootComputedValue();
    var rootComputedDep = ccComputed.getRootComputedDep();
    var rootComputedRaw = ccComputed.getRootComputedRaw(); // 在init-module-state那里已safeGet, 这里可以安全的直接读取

    var cuOri = ccComputed._computedRawValues[module];
    rootComputedRaw[module] = computed;
    var moduleState = rootState[module];
    configureDepFns(CATE_MODULE, {
      type: FN_CU,
      module: module,
      stateKeys: okeys(moduleState),
      dep: rootComputedDep
    }, computed);
    var d = ccContext.getDispatcher();

    var curDepComputedFns = function curDepComputedFns(committedState, isBeforeMount) {
      return pickDepFns(isBeforeMount, CATE_MODULE, FN_CU, rootComputedDep, module, moduleState, committedState);
    };

    rootComputedValue[module] = makeCuRetContainer(computed, cuOri);
    var moduleComputedValue = rootComputedValue[module];

    try {
      executeDepFns(d, module, d && d.ctx.module, moduleState, curDepComputedFns, moduleState, moduleState, moduleState, makeCallInfo(module), true, FN_CU, CATE_MODULE, moduleComputedValue);
    } catch (err) {
      ccContext.runtimeHandler.tryHandleError(err);
    }
  }

  var isPJO$2 = isPJO,
      safeGet$2 = safeGet,
      okeys$4 = okeys;
  /**
   * 设置watch值，过滤掉一些无效的key
   */

  function initModuleWatch (module, moduleWatch, append) {
    if (moduleWatch === void 0) {
      moduleWatch = {};
    }

    if (append === void 0) {
      append = false;
    }

    if (!isPJO$2(moduleWatch)) {
      throw new Error("module[" + module + "] watch " + INAJ);
    }

    var rootWatchDep = ccContext.watch.getRootWatchDep();
    var rootWatchRaw = ccContext.watch.getRootWatchRaw();
    var rootComputedValue = ccContext.computed.getRootComputedValue();

    if (append) {
      var ori = rootWatchRaw[module];
      if (ori) Object.assign(ori, moduleWatch);else rootWatchRaw[module] = moduleWatch;
    } else {
      rootWatchRaw[module] = moduleWatch;
    }

    var getState = ccContext.store.getState;
    var moduleState = getState(module);
    configureDepFns(CATE_MODULE, {
      module: module,
      stateKeys: okeys$4(moduleState),
      dep: rootWatchDep
    }, moduleWatch);
    var d = ccContext.getDispatcher();

    var curDepWatchFns = function curDepWatchFns(committedState, isFirstCall) {
      return pickDepFns(isFirstCall, CATE_MODULE, FN_WATCH, rootWatchDep, module, moduleState, committedState);
    };

    var moduleComputedValue = safeGet$2(rootComputedValue, module);
    executeDepFns(d, module, d && d.ctx.module, moduleState, curDepWatchFns, moduleState, moduleState, moduleState, makeCallInfo(module), true, FN_WATCH, CATE_MODULE, moduleComputedValue);
  }

  /* eslint-disable camelcase */
  var id = 0;
  /** 针对lazy的reducer调用链状态记录缓存map */

  var chainId2moduleStateMap = {};
  var chainId2isExited = {};
  var chainId2isLazy = {};
  /** 所有的reducer调用链状态记录缓存map */

  var normalChainId_moduleStateMap_ = {};
  function getChainId() {
    id++;
    return id;
  }

  function __setChainState(chainId, targetModule, partialState, targetId_msMap) {
    if (partialState) {
      var moduleStateMap = targetId_msMap[chainId];

      if (!moduleStateMap) {
        moduleStateMap = {};
        targetId_msMap[chainId] = moduleStateMap;
      }

      var state = moduleStateMap[targetModule];

      if (!state) {
        moduleStateMap[targetModule] = partialState;
      } else {
        Object.assign(state, partialState);
      }
    }
  }

  function setChainState(chainId, targetModule, partialState) {
    __setChainState(chainId, targetModule, partialState, chainId2moduleStateMap);
  }
  function setAllChainState(chainId, targetModule, partialState) {
    __setChainState(chainId, targetModule, partialState, normalChainId_moduleStateMap_);
  }
  function setAndGetChainStateList(isC2Result, chainId, targetModule, partialState) {
    if (!isC2Result) setChainState(chainId, targetModule, partialState);
    return getChainStateList(chainId);
  }
  function getChainStateMap(chainId) {
    return chainId2moduleStateMap[chainId];
  }
  function getAllChainStateMap(chainId) {
    return normalChainId_moduleStateMap_[chainId];
  }
  function getChainStateList(chainId) {
    var moduleStateMap = getChainStateMap(chainId);
    return okeys(moduleStateMap).map(function (m) {
      return {
        module: m,
        state: moduleStateMap[m]
      };
    });
  }
  function removeChainState(chainId) {
    delete chainId2moduleStateMap[chainId];
  }
  function removeAllChainState(chainId) {
    delete normalChainId_moduleStateMap_[chainId];
  }
  function isChainExited(chainId) {
    return chainId2isExited[chainId] === true;
  }
  function setChainIdLazy(chainId) {
    chainId2isLazy[chainId] = true;
  }
  function isChainIdLazy(chainId) {
    return chainId2isLazy[chainId] === true;
  }

  var feature2timerId = {};
  var runLater = (function (cb, feature, delay) {
    if (delay === void 0) {
      delay = 1000;
    }

    var timerId = feature2timerId[feature];
    if (timerId) clearTimeout(timerId);
    feature2timerId[feature] = setTimeout(function () {
      delete feature2timerId[feature];
      cb();
    }, delay);
  });

  function watchKeyForRef (ref, stateModule, oldState, deltaCommittedState, callInfo, isBeforeMount, mergeToDelta) {
    if (isBeforeMount === void 0) {
      isBeforeMount = false;
    }

    var refCtx = ref.ctx;
    if (!refCtx.hasWatchFn) return {
      hasDelta: false,
      newCommittedState: {}
    };
    var newState = Object.assign({}, oldState, deltaCommittedState);
    var watchDep = refCtx.watchDep,
        refModule = refCtx.module,
        ccUniqueKey = refCtx.ccUniqueKey,
        computedContainer = refCtx.refComputed;

    var curDepWatchFns = function curDepWatchFns(committedState, isBeforeMount) {
      return pickDepFns(isBeforeMount, CATE_REF, FN_WATCH, watchDep, stateModule, oldState, committedState, ccUniqueKey);
    }; // 触发有stateKey依赖列表相关的watch函数


    var _findDepFnsToExecute = executeDepFns(ref, stateModule, refModule, oldState, curDepWatchFns, deltaCommittedState, newState, deltaCommittedState, callInfo, isBeforeMount, FN_WATCH, CATE_REF, computedContainer, mergeToDelta),
        hasDelta = _findDepFnsToExecute.hasDelta;

    return {
      hasDelta: hasDelta
    };
  }

  function computeValueForRef (ref, stateModule, oldState, deltaCommittedState, callInfo, isBeforeMount, mergeToDelta) {
    if (isBeforeMount === void 0) {
      isBeforeMount = false;
    }

    var refCtx = ref.ctx;
    if (!refCtx.hasComputedFn) return {
      hasDelta: false,
      newCommittedState: {}
    };
    var computedDep = refCtx.computedDep,
        refModule = refCtx.module,
        ccUniqueKey = refCtx.ccUniqueKey,
        computedContainer = refCtx.refComputed;
    var newState = Object.assign({}, oldState, deltaCommittedState);

    var curDepComputedFns = function curDepComputedFns(committedState, isBeforeMount) {
      return pickDepFns(isBeforeMount, CATE_REF, FN_CU, computedDep, stateModule, oldState, committedState, ccUniqueKey);
    }; // 触发依赖stateKeys相关的computed函数


    return executeDepFns(ref, stateModule, refModule, oldState, curDepComputedFns, deltaCommittedState, newState, deltaCommittedState, callInfo, isBeforeMount, FN_CU, CATE_REF, computedContainer, mergeToDelta);
  }

  var okeys$5 = okeys,
      isEmptyVal$1 = isEmptyVal;
  var ccUKey2ref = ccContext.ccUKey2ref,
      waKey2uKeyMap$2 = ccContext.waKey2uKeyMap,
      waKey2staticUKeyMap$2 = ccContext.waKey2staticUKeyMap;
  function findUpdateRefs (moduleName, partialSharedState, renderKeys, renderKeyClasses) {
    var sharedStateKeys = okeys$5(partialSharedState);
    var cacheKey = getCacheKey(moduleName, sharedStateKeys, renderKeys, renderKeyClasses);
    var cachedResult = getCache(moduleName, cacheKey);

    if (cachedResult) {
      return {
        sharedStateKeys: sharedStateKeys,
        result: cachedResult
      };
    }

    var targetUKeyMap = {};
    var belongRefKeys = [];
    var connectRefKeys = [];
    sharedStateKeys.forEach(function (stateKey) {
      var waKey = moduleName + "/" + stateKey; // 利用assign不停的去重

      Object.assign(targetUKeyMap, waKey2uKeyMap$2[waKey], waKey2staticUKeyMap$2[waKey]);
    });
    var uKeys = okeys$5(targetUKeyMap);

    var putRef = function putRef(isBelong, ccUniqueKey) {
      isBelong ? belongRefKeys.push(ccUniqueKey) : connectRefKeys.push(ccUniqueKey);
    };

    var tryMatch = function tryMatch(ref, toBelong) {
      var _ref$ctx = ref.ctx,
          refRenderKey = _ref$ctx.renderKey,
          refCcClassKey = _ref$ctx.ccClassKey,
          ccUniqueKey = _ref$ctx.ccUniqueKey,
          props = _ref$ctx.props; // 如果调用方携带renderKey发起修改状态动作，则需要匹配renderKey做更新

      if (renderKeys.length) {
        var isRenderKeyMatched = renderKeys.includes(refRenderKey); // 所有的类实例都受renderKey匹配机制影响
        // or 携带id生成了renderKey

        if (renderKeyClasses === '*' || !isEmptyVal$1(props.id)) {
          if (isRenderKeyMatched) {
            putRef(toBelong, ccUniqueKey);
          }

          return;
        } // 这些指定类实例受renderKey机制影响


        if (renderKeyClasses.includes(refCcClassKey)) {
          if (isRenderKeyMatched) {
            putRef(toBelong, ccUniqueKey);
          }
        } else {
          // 这些实例则不受renderKey机制影响
          putRef(toBelong, ccUniqueKey);
        }
      } else {
        putRef(toBelong, ccUniqueKey);
      }
    };

    var missRef = false;
    uKeys.forEach(function (key) {
      var ref = ccUKey2ref[key];

      if (!ref) {
        missRef = true;
        return;
      }

      var refCtx = ref.ctx;
      var refModule = refCtx.module,
          refConnect = refCtx.connect;
      var isBelong = refModule === moduleName;
      var isConnect = refConnect[moduleName] ? true : false;

      if (isBelong) {
        tryMatch(ref, true);
      } // 一个实例如果既属于模块x同时也连接了模块x，这是不推荐的，在buildCtx里面已给出警告
      // 会造成冗余的渲染


      if (isConnect) {
        tryMatch(ref, false);
      }
    });
    var result = {
      belong: belongRefKeys,
      connect: connectRefKeys
    }; // 没有miss的ref才存缓存，防止直接标记了watchedKeys的实例此时还没有记录ref，
    // 但是此时刚好有变更状态的命令的话，如果这里缓存了查询结果，这这个实例挂上后，没有机会响应状态变更了

    if (!missRef) {
      setCache(moduleName, cacheKey, result);
    }

    return {
      sharedStateKeys: sharedStateKeys,
      result: result
    };
  }

  /* eslint-disable camelcase */
  var isPJO$3 = isPJO,
      justWarning$2 = justWarning,
      isObjectNull$1 = isObjectNull,
      computeFeature$1 = computeFeature,
      okeys$6 = okeys;
  var FOR_CUR_MOD$1 = FOR_CUR_MOD,
      FOR_ANOTHER_MOD$1 = FOR_ANOTHER_MOD,
      FORCE_UPDATE$1 = FORCE_UPDATE,
      SET_STATE$1 = SET_STATE,
      SIG_STATE_CHANGED$1 = SIG_STATE_CHANGED,
      RENDER_NO_OP$1 = RENDER_NO_OP,
      RENDER_BY_KEY$1 = RENDER_BY_KEY,
      RENDER_BY_STATE$1 = RENDER_BY_STATE,
      UNMOUNTED$1 = UNMOUNTED,
      MOUNTED$1 = MOUNTED;
  var _ccContext$store = ccContext.store,
      storeSetState = _ccContext$store.setState,
      getPrevState = _ccContext$store.getPrevState,
      saveSharedState$1 = _ccContext$store.saveSharedState,
      middlewares = ccContext.middlewares,
      ccClassKey2Context = ccContext.ccClassKey2Context,
      refStore = ccContext.refStore,
      getModuleStateKeys$1 = ccContext.getModuleStateKeys,
      runtimeVar$1 = ccContext.runtimeVar; // 触发修改状态的实例所属模块和目标模块不一致的时候，stateFor是 FOR_ANOTHER_MOD

  function getStateFor(targetModule, refModule) {
    return targetModule === refModule ? FOR_CUR_MOD$1 : FOR_ANOTHER_MOD$1;
  }

  function callMiddlewares(skipMiddleware, passToMiddleware, cb) {
    if (skipMiddleware !== true) {
      var len = middlewares.length;

      if (len > 0) {
        var index = 0;

        var next = function next() {
          if (index === len) {
            // all middlewares been executed
            cb();
          } else {
            var middlewareFn = middlewares[index];
            index++;
            if (isFn(middlewareFn)) middlewareFn(passToMiddleware, next);else {
              justWarning$2("found one middleware " + INAF);
              next();
            }
          }
        };

        next();
      } else {
        cb();
      }
    } else {
      cb();
    }
  } // 调用者优先取 alwaysRenderCaller，再去force参数


  function getCallerForce(force) {
    return runtimeVar$1.alwaysRenderCaller || force;
  }
  /**
   * 修改状态入口函数
   */


  function changeRefState(state, _temp, targetRef) {
    var _ref = _temp === void 0 ? {} : _temp,
        module = _ref.module,
        _ref$skipMiddleware = _ref.skipMiddleware,
        skipMiddleware = _ref$skipMiddleware === void 0 ? false : _ref$skipMiddleware,
        payload = _ref.payload,
        stateChangedCb = _ref.stateChangedCb,
        _ref$force = _ref.force,
        force = _ref$force === void 0 ? false : _ref$force,
        _ref$keys = _ref.keys,
        keys = _ref$keys === void 0 ? [] : _ref$keys,
        _ref$keyPath = _ref.keyPath,
        keyPath = _ref$keyPath === void 0 ? '' : _ref$keyPath,
        reactCallback = _ref.reactCallback,
        type = _ref.type,
        _ref$calledBy = _ref.calledBy,
        calledBy = _ref$calledBy === void 0 ? SET_STATE$1 : _ref$calledBy,
        _ref$fnName = _ref.fnName,
        fnName = _ref$fnName === void 0 ? '' : _ref$fnName,
        renderKey = _ref.renderKey,
        _ref$delay = _ref.delay,
        delay$$1 = _ref$delay === void 0 ? -1 : _ref$delay;

    if (!state) return;

    if (!isPJO$3(state)) {
      return;
    }

    var targetRenderKey = extractRenderKey(renderKey);
    var targetDelay = renderKey && renderKey.delay ? renderKey.delay : delay$$1;
    var _targetRef$ctx = targetRef.ctx,
        refModule = _targetRef$ctx.module,
        ccUniqueKey = _targetRef$ctx.ccUniqueKey,
        ccKey = _targetRef$ctx.ccKey;
    var stateFor = getStateFor(module, refModule);
    var callInfo = {
      calledBy: calledBy,
      payload: payload,
      renderKey: targetRenderKey,
      force: force,
      ccKey: ccKey,
      module: module,
      fnName: fnName,
      keys: keys,
      keyPath: keyPath
    }; // 在triggerReactSetState之前把状态存储到store，
    // 防止属于同一个模块的父组件套子组件渲染时，父组件修改了state，子组件初次挂载是不能第一时间拿到state
    // const passedRef = stateFor === FOR_CUR_MOD ? targetRef : null;
    // 标记noSave为true，延迟到后面可能存在的中间件执行结束后才save

    var _syncCommittedStateTo = syncCommittedStateToStore(module, state, {
      ref: targetRef,
      callInfo: callInfo,
      noSave: true,
      force: force
    }),
        sharedState = _syncCommittedStateTo.partialState,
        hasDelta = _syncCommittedStateTo.hasDelta,
        hasPrivState = _syncCommittedStateTo.hasPrivState;

    if (hasDelta) {
      Object.assign(state, sharedState);
    } // 不包含私有状态，仅包含模块状态，交给belongRefs那里去触发渲染，这样可以让已失去依赖的当前实例减少一次渲染
    // 因为belongRefs那里是根据有无依赖来确定要不要渲染，这样的话如果失去了依赖不把它查出来就不触发它渲染了


    var ignoreRender = !hasPrivState && !!sharedState; // source ref will receive the whole committed state 

    triggerReactSetState(targetRef, callInfo, targetRenderKey, calledBy, state, stateFor, ignoreRender, reactCallback, getCallerForce(force), function (renderType, committedState, updateRef) {
      // committedState means final committedState
      var passToMiddleware = {
        calledBy: calledBy,
        type: type,
        payload: payload,
        renderKey: targetRenderKey,
        delay: targetDelay,
        ccKey: ccKey,
        ccUniqueKey: ccUniqueKey,
        committedState: committedState,
        refModule: refModule,
        module: module,
        fnName: fnName,
        sharedState: sharedState || {} // 给一个空壳对象，防止用户直接用的时候报错null

      };
      var modStateCalled = false; // 修改或新增状态值
      // 修改并不会再次触发compute&watch过程，请明确你要修改的目的

      passToMiddleware.modState = function (key, val) {
        modStateCalled = true;
        passToMiddleware.committedState[key] = val;
        passToMiddleware.sharedState[key] = val;
      };

      callMiddlewares(skipMiddleware, passToMiddleware, function () {
        // 到这里才触发调用saveSharedState存储模块状态和updateRef更新调用实例，注这两者前后顺序不能调换
        // 因为updateRef里的beforeRender需要把最新的模块状态合进来
        // 允许在中间件过程中使用「modState」修改某些key的值，会影响到实例的更新结果，且不会再触发computed&watch
        // 调用此接口请明确知道后果,
        // 注不要直接修改sharedState或committedState，两个对象一起修改某个key才是正确的
        var midSharedState = passToMiddleware.sharedState;
        var realShare = saveSharedState$1(module, midSharedState, modStateCalled, force); // TODO: 查看其它模块的cu函数里读取了当前模块的state或computed作为输入产生了的新的计算结果
        // 然后做相应的关联更新 {'$$global/key1': {foo: ['cuKey1', 'cuKey2'] } }
        // code here
        // 执行完毕所有的中间件，才更新触发调用的源头实例

        updateRef && updateRef();

        if (renderType === RENDER_NO_OP$1 && !realShare) {
          if (ignoreRender) {
            // 此时updateRef 为 null, 需要给补上一次机会为caller执行 triggerReactSetState
            triggerReactSetState(targetRef, callInfo, [], SET_STATE$1, midSharedState, stateFor, false, reactCallback, getCallerForce(force));
          }
        } else {
          send(SIG_STATE_CHANGED$1, {
            calledBy: calledBy,
            type: type,
            committedState: committedState,
            sharedState: realShare || {},
            module: module,
            ccUniqueKey: ccUniqueKey,
            renderKey: targetRenderKey
          });
        } // 无论是否真的有状态改变，此回调都会被触发


        if (stateChangedCb) stateChangedCb(); // 当前上下文的ignoreRender 为true 等效于这里的入参 allowOriInsRender 为true，允许查询出oriIns后触发它渲染

        if (realShare) triggerBroadcastState(stateFor, callInfo, targetRef, realShare, ignoreRender, module, reactCallback, targetRenderKey, targetDelay, force);
      });
    });
  }

  function triggerReactSetState(targetRef, callInfo, renderKeys, calledBy, state, stateFor, ignoreRender, reactCallback, force, next) {
    var nextNoop = function nextNoop() {
      return next && next(RENDER_NO_OP$1, state);
    };

    var refCtx = targetRef.ctx;
    var refState = refCtx.unProxyState;

    if (ignoreRender) {
      return nextNoop();
    }

    if (targetRef.__$$ms === UNMOUNTED$1 // 已卸载
    || stateFor !== FOR_CUR_MOD$1 // 确保 forceUpdate 能够刷新cc实例，因为state可能是{}，此时用户调用forceUpdate也要触发render
    || calledBy !== FORCE_UPDATE$1 && isObjectNull$1(state)) {
      return nextNoop();
    }

    var stateModule = refCtx.module,
        storedKeys = refCtx.storedKeys,
        ccUniqueKey = refCtx.ccUniqueKey;
    var renderType = RENDER_BY_STATE$1;

    if (renderKeys.length) {
      // if user specify renderKeys
      renderType = RENDER_BY_KEY$1;

      if (renderKeys.includes(refCtx.renderKey)) {
        // current instance can been rendered only if ctx.renderKey included in renderKeys
        return nextNoop();
      }
    }

    if (storedKeys.length > 0) {
      var _extractStateByKeys = extractStateByKeys(state, storedKeys),
          partialState = _extractStateByKeys.partialState,
          isStateEmpty = _extractStateByKeys.isStateEmpty;

      if (!isStateEmpty) {
        if (refCtx.persistStoredKeys === true) {
          var _extractStateByKeys2 = extractStateByKeys(refState, storedKeys),
              entireStoredState = _extractStateByKeys2.partialState;

          var currentStoredState = Object.assign({}, entireStoredState, partialState);

          if (ccContext.localStorage) {
            ccContext.localStorage.setItem("CCSS_" + ccUniqueKey, JSON.stringify(currentStoredState));
          }
        }

        refStore.setState(ccUniqueKey, partialState);
      }
    }

    var deltaCommittedState = Object.assign({}, state);
    computeValueForRef(targetRef, stateModule, refState, deltaCommittedState, callInfo);
    watchKeyForRef(targetRef, stateModule, refState, deltaCommittedState, callInfo);

    var ccSetState = function ccSetState() {
      // 使用 unProxyState ，避免触发get
      var myChangedState;
      if (force === true) myChangedState = deltaCommittedState;else myChangedState = extractChangedState(refCtx.unProxyState, deltaCommittedState);

      if (myChangedState) {
        // 记录 stateKeys，方便 triggerRefEffect 之用
        refCtx.__$$settedList.push({
          module: stateModule,
          keys: okeys$6(myChangedState)
        });

        refCtx.__$$ccSetState(myChangedState, reactCallback);
      }
    };

    if (next) {
      next(renderType, deltaCommittedState, ccSetState);
    } else {
      ccSetState();
    }
  }

  function syncCommittedStateToStore(moduleName, committedState, options) {
    var stateKeys = getModuleStateKeys$1(moduleName); // extract shared state

    var _extractStateByKeys3 = extractStateByKeys(committedState, stateKeys, true),
        partialState = _extractStateByKeys3.partialState,
        hasPrivState = _extractStateByKeys3.missKeyInState; // save state to store


    if (partialState) {
      var _storeSetState = storeSetState(moduleName, partialState, options),
          hasDelta = _storeSetState.hasDelta,
          deltaCommittedState = _storeSetState.deltaCommittedState;

      return {
        partialState: deltaCommittedState,
        hasDelta: hasDelta,
        hasPrivState: hasPrivState
      };
    }

    return {
      partialState: partialState,
      hasDelta: false,
      hasPrivState: hasPrivState
    };
  }

  function triggerBroadcastState(stateFor, callInfo, targetRef, sharedState, allowOriInsRender, moduleName, reactCallback, renderKeys, delay$$1, force) {
    var passAllowOri = allowOriInsRender;

    if (delay$$1 > 0) {
      if (passAllowOri) {
        // 优先将当前实例渲染了
        triggerReactSetState(targetRef, callInfo, [], SET_STATE$1, sharedState, stateFor, false, reactCallback, getCallerForce(force));
      }

      passAllowOri = false; // 置为false，后面的runLater里不会再次触发当前实例渲染
    }

    var startBroadcastState = function startBroadcastState() {
      broadcastState(callInfo, targetRef, sharedState, passAllowOri, moduleName, reactCallback, renderKeys, force);
    };

    if (delay$$1 > 0) {
      var feature = computeFeature$1(targetRef.ctx.ccUniqueKey, sharedState);
      runLater(startBroadcastState, feature, delay$$1);
    } else {
      startBroadcastState();
    }
  }

  function broadcastState(callInfo, targetRef, partialSharedState, allowOriInsRender, moduleName, reactCallback, renderKeys, force) {
    if (!partialSharedState) {
      // null
      return;
    }

    var ccUKey2ref = ccContext.ccUKey2ref;
    /** @type ICtxBase */

    var _targetRef$ctx2 = targetRef.ctx,
        currentCcUKey = _targetRef$ctx2.ccUniqueKey,
        ccClassKey = _targetRef$ctx2.ccClassKey;
    var renderKeyClasses = ccClassKey2Context[ccClassKey].renderKeyClasses;

    var _findUpdateRefs = findUpdateRefs(moduleName, partialSharedState, renderKeys, renderKeyClasses),
        sharedStateKeys = _findUpdateRefs.sharedStateKeys,
        _findUpdateRefs$resul = _findUpdateRefs.result,
        belongRefKeys = _findUpdateRefs$resul.belong,
        connectRefKeys = _findUpdateRefs$resul.connect;

    var renderedInBelong = {};
    belongRefKeys.forEach(function (refKey) {
      var ref = ccUKey2ref[refKey];
      if (!ref) return;
      var refUKey = ref.ctx.ccUniqueKey;
      var rcb = null; // 这里的calledBy直接用'broadcastState'，仅供concent内部运行时用

      var calledBy = 'broadcastState';

      if (refUKey === currentCcUKey) {
        if (!allowOriInsRender) return;
        rcb = reactCallback;
        calledBy = callInfo.calledBy;
      }

      triggerReactSetState(ref, callInfo, [], calledBy, partialSharedState, FOR_CUR_MOD$1, false, rcb, force);
      renderedInBelong[refKey] = 1;
    });
    var prevModuleState = getPrevState(moduleName);
    connectRefKeys.forEach(function (refKey) {
      // 对于即属于又连接的实例，避免一次重复的渲染
      if (renderedInBelong[refKey]) {
        return;
      }

      var ref = ccUKey2ref[refKey];
      if (!ref) return; // 对于挂载好了还未卸载的实例，才有必要触发重渲染

      if (ref.__$$ms === MOUNTED$1) {
        var refCtx = ref.ctx;

        var _computeValueForRef = computeValueForRef(ref, moduleName, prevModuleState, partialSharedState, callInfo, false, false),
            hasDeltaInCu = _computeValueForRef.hasDelta,
            cuCommittedState = _computeValueForRef.newCommittedState;

        var _watchKeyForRef = watchKeyForRef(ref, moduleName, prevModuleState, partialSharedState, callInfo, false, false),
            hasDeltaInWa = _watchKeyForRef.hasDelta,
            waCommittedState = _watchKeyForRef.newCommittedState; // computed & watch 过程中提交了新的state，合并到 unProxyState 里
        // 注意这里，computeValueForRef watchKeyForRef 调用的 findDepFnsToExecute 内部
        // 保证了实例里cu或者wa函数 commit 提交的状态只能是 privateStateKey，所以合并到 unProxyState 是安全的


        if (hasDeltaInCu || hasDeltaInWa) {
          var changedRefPrivState = Object.assign(cuCommittedState, waCommittedState);
          var refModule = refCtx.module;
          var refState = refCtx.unProxyState;
          computeValueForRef(ref, refModule, refState, changedRefPrivState, callInfo);
          watchKeyForRef(ref, refModule, refState, changedRefPrivState, callInfo);
          Object.assign(refState, changedRefPrivState);
          Object.assign(refCtx.state, changedRefPrivState);

          refCtx.__$$settedList.push({
            module: refModule,
            keys: okeys$6(changedRefPrivState)
          });
        } // 记录 sharedStateKeys，方便 triggerRefEffect 之用


        refCtx.__$$settedList.push({
          module: moduleName,
          keys: sharedStateKeys
        });

        refCtx.__$$ccForceUpdate();
      }
    });
  }

  function startChangeRefState(state, options, ref) {
    /**
     * 避免死循环，利用 setTimeout 将执行流程放到下一轮事件循环里
     *  在 <= v2.10.13之前
     *  1 watch 回调里执行 setState 导致无限死循环
     *  2 setup 块里直接执行 setState 导致无限死循环
     * 
     *  以 watch 为例：
     * function setup({watch, setState, initState}){
     *   initState({privKey: 2});
     *   watch('num', ()=>{
     *     // 因为watch是在组件渲染前执行，当设置 immediate 为 true 时
     *     // 组件处于 beforeMount 步骤，cUKey2Ref 并未记录具体的 ref,
     *     // 此时回调里调用setState会导致 use-concent 134 [KEY_1] 处判断失败后
     *     // 然后一直触发 cref 函数，一直进入新的 beforeMount 流程
     *     setState({privKey:1});
     *   }, {immediate:true});
     * }
     */
    if (ref.ctx.__$$inBM) {
      // <= 2.15.7
      // setTimeout(() => startChangeRefState(state, options, ref), 0);
      // > 2.15.7 调整为此逻辑
      // 满足一些的确需要在 setup 里及时的将数据写入 store 的场景
      // 由 permanentDispatcher 去触发其他组件实例渲染
      // 自身的 state 直接合入，这样在实例首次渲染的函数体能拿到 setup 里写入的最新状态
      var permanentDispatcher = ccContext.getDispatcher();

      if (permanentDispatcher) {
        permanentDispatcher.ctx.changeState(state, options);
      }

      Object.assign(ref.ctx.state, state);
      Object.assign(ref.state, state);
      return;
    }

    changeRefState(state, options, ref);
  }

  function _setState(state, options) {
    try {
      var ref = pickOneRef(options.module);
      ref.ctx.changeState(state, options);
    } catch (err) {
      strictWarning(err);
    }
  }

  function innerSetState(module, state, stateChangedCb) {
    _setState(state, {
      module: module,
      stateChangedCb: stateChangedCb
    });
  }
  function setState (module, state, renderKey, delay$$1, skipMiddleware) {
    if (delay$$1 === void 0) {
      delay$$1 = -1;
    }

    _setState(state, {
      ccKey: '[[top api:setState]]',
      module: module,
      renderKey: renderKey,
      delay: delay$$1,
      skipMiddleware: skipMiddleware
    });
  }

  // import hoistNonReactStatic from 'hoist-non-react-statics';
  var verboseInfo$1 = verboseInfo,
      makeError$2 = makeError,
      justWarning$3 = justWarning,
      isPJO$4 = isPJO,
      okeys$7 = okeys,
      isValueNotNull$1 = isValueNotNull;
  var _ccContext$store$1 = ccContext.store,
      getState = _ccContext$store$1.getState,
      storeSetState$1 = _ccContext$store$1.setState,
      _reducer$1 = ccContext.reducer._reducer,
      _computedValues$3 = ccContext.computed._computedValues,
      runtimeHandler$1 = ccContext.runtimeHandler,
      runtimeVar$2 = ccContext.runtimeVar;
  var me = makeError$2;
  var vbi$1 = verboseInfo$1;

  function handleError(err, throwError) {
    if (throwError === void 0) {
      throwError = true;
    }

    if (throwError) throw err;else {
      handleCcFnError(err);
    }
  }

  function checkStoreModule(module, throwError) {
    if (throwError === void 0) {
      throwError = true;
    }

    try {
      checkModuleName(module, false, "module[" + module + "] is not configured in store");
      return true;
    } catch (err) {
      handleError(err, throwError);
      return false;
    }
  }

  function paramCallBackShouldNotSupply(module, currentModule) {
    return "param module[" + module + "] must equal current ref's module[" + currentModule + "] when pass param reactCallback, or it will never been triggered! ";
  }

  function _promiseErrorHandler(resolve, reject) {
    return function (err) {
      for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      return err ? reject(err) : resolve.apply(void 0, args);
    };
  } //忽略掉传递进来的chainId，chainDepth，重新生成它们，源头调用了lazyDispatch或者ctx里调用了lazyDispatch，就会触发此逻辑


  function getNewChainData(isLazy, chainId, oriChainId, chainId2depth) {
    var _chainId;

    if (isLazy === true) {
      _chainId = getChainId();
      setChainIdLazy(_chainId);
      chainId2depth[_chainId] = 1; //置为1
    } else {
      _chainId = chainId || getChainId();
      if (!chainId2depth[_chainId]) chainId2depth[_chainId] = 1;
    } //源头函数会触发创建oriChainId， 之后就一直传递下去了


    var _oriChainId = oriChainId || _chainId;

    return {
      _chainId: _chainId,
      _oriChainId: _oriChainId
    };
  } // any error in this function will not been throw, cc just warning, 


  function isStateModuleValid(inputModule, currentModule, reactCallback, cb) {
    var targetCb = reactCallback;

    if (checkStoreModule(inputModule, false)) {
      if (inputModule !== currentModule && reactCallback) {
        // ???strict
        justWarning$3(paramCallBackShouldNotSupply(inputModule, currentModule));
        targetCb = null; //let user's reactCallback has no chance to be triggered
      }

      cb(null, targetCb);
    } else {
      cb(new Error("inputModule:" + inputModule + " invalid"), null);
    }
  }

  function handleCcFnError(err, __innerCb) {
    if (err) {
      if (__innerCb) __innerCb(err);else {
        ccContext.runtimeHandler.tryHandleError(err);
      }
    }
  }

  function _promisifyCcFn(ccFn, userLogicFn, executionContext, payload) {
    return new Promise(function (resolve, reject) {
      var _executionContext = Object.assign(executionContext, {
        __innerCb: _promiseErrorHandler(resolve, reject)
      });

      ccFn(userLogicFn, _executionContext, payload);
    })["catch"](runtimeHandler$1.tryHandleError);
  }

  function __promisifiedInvokeWith(userLogicFn, executionContext, payload) {
    return _promisifyCcFn(invokeWith, userLogicFn, executionContext, payload);
  }

  function __invoke(userLogicFn, option, payload) {
    var callerRef = option.callerRef,
        delay$$1 = option.delay,
        renderKey = option.renderKey,
        force = option.force,
        calledBy = option.calledBy,
        module = option.module,
        chainId = option.chainId,
        oriChainId = option.oriChainId,
        chainId2depth = option.chainId2depth,
        isSilent = option.isSilent;
    return __promisifiedInvokeWith(userLogicFn, {
      callerRef: callerRef,
      context: true,
      module: module,
      calledBy: calledBy,
      fnName: userLogicFn.name,
      delay: delay$$1,
      renderKey: renderKey,
      force: force,
      chainId: chainId,
      oriChainId: oriChainId,
      chainId2depth: chainId2depth,
      isSilent: isSilent
    }, payload);
  } // 后面会根据具体组件形态给reactSetState赋值
  // 直接写为 makeCcSetStateHandler = (ref)=> ref.ctx.reactSetState, 是错误的
  // ref.ctx.reactSetState是在后面的流程里被赋值的，所以此处多用一层函数包裹再调用


  function makeCcSetStateHandler(ref) {
    return function (state, cb) {
      ref.ctx.reactSetState(state, cb);
    };
  }
  function makeCcForceUpdateHandler(ref) {
    return function (cb) {
      ref.ctx.reactForceUpdate(cb);
    };
  } // last param: chainData

  function makeInvokeHandler(callerRef, _temp) {
    var _ref = _temp === void 0 ? {} : _temp,
        chainId = _ref.chainId,
        oriChainId = _ref.oriChainId,
        isLazy = _ref.isLazy,
        _ref$delay = _ref.delay,
        delay$$1 = _ref$delay === void 0 ? -1 : _ref$delay,
        _ref$isSilent = _ref.isSilent,
        isSilent = _ref$isSilent === void 0 ? false : _ref$isSilent,
        _ref$chainId2depth = _ref.chainId2depth,
        chainId2depth = _ref$chainId2depth === void 0 ? {} : _ref$chainId2depth;

    return function (firstParam, payload, inputRKey, inputDelay) {
      var _isLazy = isLazy,
          _isSilent = isSilent;

      var _renderKey = '',
          _delay = inputDelay != undefined ? inputDelay : delay$$1;

      var _force = false;

      if (isPJO$4(inputRKey)) {
        var lazy = inputRKey.lazy,
            silent = inputRKey.silent,
            renderKey = inputRKey.renderKey,
            _delay2 = inputRKey.delay,
            force = inputRKey.force;
        lazy !== undefined && (_isLazy = lazy);
        silent !== undefined && (_isSilent = silent);
        renderKey !== undefined && (_renderKey = renderKey);
        _delay2 !== undefined && (_delay = _delay2);
        _force = force;
      } else {
        _renderKey = inputRKey;
      }

      var _getNewChainData = getNewChainData(_isLazy, chainId, oriChainId, chainId2depth),
          _chainId = _getNewChainData._chainId,
          _oriChainId = _getNewChainData._oriChainId;

      var firstParamType = typeof firstParam;
      var option = {
        callerRef: callerRef,
        calledBy: INVOKE,
        module: callerRef.ctx.module,
        isSilent: _isSilent,
        chainId: _chainId,
        oriChainId: _oriChainId,
        chainId2depth: chainId2depth,
        delay: _delay,
        renderKey: _renderKey,
        force: _force
      }; // eslint-disable-next-line

      var err = new Error("param type error, correct usage: invoke(userFn:function, ...args:any[]) or invoke(option:[module:string, fn:function], ...args:any[])");

      if (firstParamType === 'function') {
        // 可能用户直接使用invoke调用了reducer函数
        if (firstParam.__fnName) firstParam.name = firstParam.__fnName; // 这里不修改option.module，concent明确定义了dispatch和invoke规则

        /**
          invoke调用函数引用时
          无论组件有无注册模块，一定走调用方模块
           dispatch调用函数引用时
          优先走函数引用的模块（此时函数是一个reducer函数），没有(此函数不是reducer函数)则走调用方的模块并降级为invoke调用
         */
        // if (firstParam.__stateModule) option.module = firstParam.__stateModule;

        return __invoke(firstParam, option, payload);
      } else if (firstParamType === 'object') {
        var _fn, _module;

        if (Array.isArray(firstParam)) {
          var module = firstParam[0],
              fn = firstParam[1];
          _fn = fn;
          _module = module;
        } else {
          var _module2 = firstParam.module,
              _fn2 = firstParam.fn;
          _fn = _fn2;
          _module = _module2;
        }

        if (!isFn(_fn)) throw err;
        if (_module) option.module = _module; //某个模块的实例修改了另外模块的数据

        return __invoke(_fn, option, payload);
      } else {
        throw err;
      }
    };
  }
  function invokeWith(userLogicFn, executionContext, payload) {
    var callerRef = executionContext.callerRef;
    var callerModule = callerRef.ctx.module;
    var _executionContext$mod = executionContext.module,
        targetModule = _executionContext$mod === void 0 ? callerModule : _executionContext$mod,
        _executionContext$con = executionContext.context,
        context = _executionContext$con === void 0 ? false : _executionContext$con,
        cb = executionContext.cb,
        __innerCb = executionContext.__innerCb,
        type = executionContext.type,
        calledBy = executionContext.calledBy,
        _executionContext$fnN = executionContext.fnName,
        fnName = _executionContext$fnN === void 0 ? '' : _executionContext$fnN,
        _executionContext$del = executionContext.delay,
        delay$$1 = _executionContext$del === void 0 ? -1 : _executionContext$del,
        renderKey = executionContext.renderKey,
        _executionContext$for = executionContext.force,
        force = _executionContext$for === void 0 ? false : _executionContext$for,
        chainId = executionContext.chainId,
        oriChainId = executionContext.oriChainId,
        chainId2depth = executionContext.chainId2depth,
        isSilent = executionContext.isSilent;
    isStateModuleValid(targetModule, callerModule, cb, function (err, newCb) {
      if (err) return handleCcFnError(err, __innerCb);
      var moduleState = getState(targetModule);
      var actionContext = {};
      var isSourceCall = false;
      isSourceCall = chainId === oriChainId && chainId2depth[chainId] === 1;

      if (context) {
        // 调用前先加1
        chainId2depth[chainId] = chainId2depth[chainId] + 1; // !!!makeDispatchHandler的dispatch lazyDispatch将源头的isSilent 一致透传下去

        var _dispatch = makeDispatchHandler(callerRef, false, isSilent, targetModule, renderKey, delay$$1, chainId, oriChainId, chainId2depth);

        var silentDispatch = makeDispatchHandler(callerRef, false, true, targetModule, renderKey, delay$$1, chainId, oriChainId, chainId2depth);
        var lazyDispatch = makeDispatchHandler(callerRef, true, isSilent, targetModule, renderKey, delay$$1, chainId, oriChainId, chainId2depth); // oriChainId, chainId2depth 一直携带下去，设置isLazy，会重新生成chainId

        var invoke = makeInvokeHandler(callerRef, {
          delay: delay$$1,
          chainId: chainId,
          oriChainId: oriChainId,
          chainId2depth: chainId2depth
        });
        var lazyInvoke = makeInvokeHandler(callerRef, {
          isLazy: true,
          delay: delay$$1,
          oriChainId: oriChainId,
          chainId2depth: chainId2depth
        });
        var silentInvoke = makeInvokeHandler(callerRef, {
          isLazy: false,
          delay: delay$$1,
          isSilent: true,
          oriChainId: oriChainId,
          chainId2depth: chainId2depth
        }); // 首次调用时是undefined，这里做个保护

        var committedStateMap = getAllChainStateMap(chainId) || {};
        var committedState = committedStateMap[targetModule] || {};
        actionContext = {
          callInfo: {
            renderKey: renderKey,
            delay: delay$$1,
            fnName: fnName,
            type: type,
            calledBy: calledBy,
            force: force
          },
          module: targetModule,
          callerModule: callerModule,
          committedStateMap: committedStateMap,
          // 一次ref dispatch调用，所经过的所有reducer的返回结果收集
          committedState: committedState,
          invoke: invoke,
          lazyInvoke: lazyInvoke,
          silentInvoke: silentInvoke,
          invokeLazy: lazyInvoke,
          invokeSilent: silentInvoke,
          dispatch: _dispatch,
          lazyDispatch: lazyDispatch,
          silentDispatch: silentDispatch,
          dispatchLazy: lazyDispatch,
          dispatchSilent: silentDispatch,
          rootState: getState(),
          globalState: getState(MODULE_GLOBAL),
          // 指的是目标模块的state
          moduleState: moduleState,
          // 指的是目标模块的的moduleComputed
          moduleComputed: _computedValues$3[targetModule] || {},
          // 利用dispatch调用自动生成的setState
          setState: function setState$$1(state, r, d) {
            var targetR = r !== 0 ? r || renderKey : r;
            var targetD = d !== 0 ? d || delay$$1 : d;
            return _dispatch('setState', state, {
              silent: isSilent,
              renderKey: targetR,
              delay: targetD
            });
          },
          // !!!指的是调用源cc实例的ctx
          refCtx: callerRef.ctx,
          // 方便直接获取并标记 refState 类型
          refState: callerRef.ctx.state // concent不鼓励用户在reducer使用ref相关数据书写业务逻辑，除非用户确保是同一个模块的实例触发调用该函数，
          // 因为不同调用方传递不同的refCtx值，会引起用户不注意的bug

        };
      }

      if (isSilent === false) {
        send(SIG_FN_START, {
          isSourceCall: isSourceCall,
          calledBy: calledBy,
          module: targetModule,
          chainId: chainId,
          fn: userLogicFn
        });
      }

      var handleReturnState = function handleReturnState(partialState) {
        chainId2depth[chainId] = chainId2depth[chainId] - 1; // 调用结束减1

        var curDepth = chainId2depth[chainId];
        var isFirstDepth = curDepth === 1;
        var isC2Result = stOrPromisedSt && stOrPromisedSt.__c2Result; // 调用结束就记录

        setAllChainState(chainId, targetModule, partialState);
        var commitStateList = [];

        if (isSilent === false) {
          send(SIG_FN_END, {
            isSourceCall: isSourceCall,
            calledBy: calledBy,
            module: targetModule,
            chainId: chainId,
            fn: userLogicFn
          }); // targetModule, sourceModule相等与否不用判断了，chainState里按模块为key去记录提交到不同模块的state

          if (isChainIdLazy(chainId)) {
            // 来自于惰性派发的调用
            if (!isFirstDepth) {
              // 某条链还在往下调用中，没有回到第一层，暂存状态，直到回到第一层才提交
              setChainState(chainId, targetModule, partialState);
            } else {
              // 合并状态一次性提交到store并派发到组件实例
              if (isChainExited(chainId)) ; else {
                commitStateList = setAndGetChainStateList(isC2Result, chainId, targetModule, partialState);
                removeChainState(chainId);
              }
            }
          } else {
            if (!isC2Result) commitStateList = [{
              module: targetModule,
              state: partialState
            }];
          }
        }

        commitStateList.forEach(function (v) {
          startChangeRefState(v.state, {
            renderKey: renderKey,
            module: v.module,
            reactCallback: newCb,
            type: type,
            calledBy: calledBy,
            fnName: fnName,
            delay: delay$$1,
            payload: payload,
            force: force
          }, callerRef);
        });

        if (isSourceCall) {
          // 源头 dispatch 或 invoke 结束调用
          removeChainState(chainId);
          removeAllChainState(chainId);
        }

        if (__innerCb) __innerCb(null, partialState);
      };

      var handleFnError = function handleFnError(err) {
        send(SIG_FN_ERR, {
          isSourceCall: isSourceCall,
          calledBy: calledBy,
          module: targetModule,
          chainId: chainId,
          fn: userLogicFn
        });
        handleCcFnError(err, __innerCb);
      };

      var stOrPromisedSt = userLogicFn(payload, moduleState, actionContext);

      if (userLogicFn.__isAsync) {
        Promise.resolve(stOrPromisedSt).then(handleReturnState)["catch"](handleFnError);
      } else {
        // 防止输入中文时，因为隔了一个Promise而出现抖动
        try {
          if (userLogicFn.__isReturnJudged) {
            handleReturnState(stOrPromisedSt);
            return;
          } // 再判断一次，有可能会被编译器再包一层，形如：
          //  function getServerStore(_x2) {
          //    return _getServerStore.apply(this, arguments);
          //  }


          if (isAsyncFn(stOrPromisedSt)) {
            userLogicFn.__isAsync = true;
            Promise.resolve(stOrPromisedSt).then(handleReturnState)["catch"](handleFnError);
            return;
          } else {
            userLogicFn.__isReturnJudged = true;
          }

          handleReturnState(stOrPromisedSt);
        } catch (err) {
          handleFnError(err);
        }
      }
    });
  }
  function dispatch$1(_temp2) {
    var _ref2 = _temp2 === void 0 ? {} : _temp2,
        callerRef = _ref2.callerRef,
        inputModule = _ref2.module,
        renderKey = _ref2.renderKey,
        isSilent = _ref2.isSilent,
        force = _ref2.force,
        type = _ref2.type,
        payload = _ref2.payload,
        reactCallback = _ref2.cb,
        __innerCb = _ref2.__innerCb,
        _ref2$delay = _ref2.delay,
        delay$$1 = _ref2$delay === void 0 ? -1 : _ref2$delay,
        chainId = _ref2.chainId,
        oriChainId = _ref2.oriChainId,
        chainId2depth = _ref2.chainId2depth;

    var targetReducerFns = _reducer$1[inputModule] || {};
    var reducerFn = targetReducerFns[type];

    if (!reducerFn) {
      var fns = okeys$7(targetReducerFns);
      var err = new Error("reducer fn [" + inputModule + "/" + type + "] not found, you may call:" + fns);
      return __innerCb(err);
    }

    var executionContext = {
      callerRef: callerRef,
      module: inputModule,
      type: type,
      force: force,
      cb: reactCallback,
      context: true,
      __innerCb: __innerCb,
      calledBy: DISPATCH,
      delay: delay$$1,
      renderKey: renderKey,
      isSilent: isSilent,
      chainId: chainId,
      oriChainId: oriChainId,
      chainId2depth: chainId2depth
    };
    invokeWith(reducerFn, executionContext, payload);
  }
  function makeDispatchHandler(callerRef, inputIsLazy, inputIsSilent, defaultModule, defaultRenderKey, delay$$1, chainId, oriChainId, chainId2depth // sourceModule, oriChainId, oriChainDepth
  ) {
    if (defaultRenderKey === void 0) {
      defaultRenderKey = '';
    }

    if (delay$$1 === void 0) {
      delay$$1 = -1;
    }

    if (chainId2depth === void 0) {
      chainId2depth = {};
    }

    // return Promise<any>
    return function (paramObj, payload, userInputRKey, userInputDelay) {
      if (!isValueNotNull$1(paramObj)) {
        return Promise.reject(new Error('dispatch param is null/undefined'));
      }

      var isLazy = inputIsLazy,
          isSilent = inputIsSilent;
      var _renderKey = '';

      var _delay = userInputDelay || delay$$1;

      var _force = false;

      if (isPJO$4(userInputRKey)) {
        _renderKey = defaultRenderKey;
        var lazy = userInputRKey.lazy,
            silent = userInputRKey.silent,
            renderKey = userInputRKey.renderKey,
            _delay3 = userInputRKey.delay,
            force = userInputRKey.force;
        lazy !== undefined && (isLazy = lazy);
        silent !== undefined && (isSilent = silent);
        renderKey !== undefined && (_renderKey = renderKey);
        _delay3 !== undefined && (_delay = _delay3);
        _force = force;
      } else {
        _renderKey = userInputRKey || defaultRenderKey;
      }

      var _getNewChainData2 = getNewChainData(isLazy, chainId, oriChainId, chainId2depth),
          _chainId = _getNewChainData2._chainId,
          _oriChainId = _getNewChainData2._oriChainId;

      var paramObjType = typeof paramObj;

      var _type, _cb;

      var _module = defaultModule;

      var callInvoke = function callInvoke() {
        var iHandler = makeInvokeHandler(callerRef, {
          chainId: _chainId,
          oriChainId: _oriChainId,
          isLazy: isLazy,
          isSilent: isSilent,
          chainId2depth: chainId2depth
        });
        return iHandler(paramObj, payload, {
          renderKey: _renderKey,
          delay: _delay,
          force: _force
        });
      };

      if (paramObjType === 'object') {
        // [ moduleName: string, reducerFn: Function ]
        if (Array.isArray(paramObj)) {
          var mInArr = paramObj[0],
              rInArr = paramObj[1];

          if (rInArr && rInArr.__fnName) {
            _module = mInArr;
            _type = rInArr.__fnName;
          } else {
            return callInvoke();
          }
        } else {
          var module = paramObj.module,
              fn = paramObj.fn,
              type = paramObj.type,
              cb = paramObj.cb;
          if (module) _module = module;

          if (fn && fn.__fnName) {
            _type = fn.__fnName; // 未指定module，才默认走 reducer函数的所属模块

            if (!module) _module = fn.__stateModule;
          } else {
            if (typeof type !== 'string') {
              return Promise.reject(new Error('dispatchDesc.type must be string'));
            }

            _type = type;
          }

          _cb = cb;
        }
      } else if (paramObjType === 'string' || paramObjType === 'function') {
        var targetFirstParam = paramObj;

        if (paramObjType === 'function') {
          var fnName = paramObj.__fnName;

          if (!fnName) {
            // 此函数是一个普通函数，没有配置到某个模块的reducer里，降级为invoke调用
            return callInvoke();
          }

          targetFirstParam = fnName; // 这里非常重要，只有处于第一层的调用时，才获取函数对象上的__stateModule参数
          // 防止克隆自模块a的模块b在reducer文件里基于函数引用直接调用时，取的是a的模块相关参数了，但是源头由b发起，应该是b才对

          if (chainId2depth[_oriChainId] == 1) {
            // let dispatch can apply reducer function directly!!!
            // !!! 如果用户在b模块的组件里dispatch直接调用a模块的函数，但是确实想修改的是b模块的数据，只是想复用a模块的那个函数的逻辑
            // 那么千万要注意，写为{module:'b', fn:xxxFoo}的模式
            _module = paramObj.__stateModule;
          }
        }

        var slashCount = targetFirstParam.split('').filter(function (v) {
          return v === '/';
        }).length;

        if (slashCount === 0) {
          _type = targetFirstParam;
        } else if (slashCount === 1) {
          var _targetFirstParam$spl = targetFirstParam.split('/'),
              _module3 = _targetFirstParam$spl[0],
              _type2 = _targetFirstParam$spl[1];

          if (_module3) _module = _module3; //targetFirstParam may like: /foo/changeName

          _type = _type2;
        } else {
          return Promise.reject(me(ERR.CC_DISPATCH_STRING_INVALID, vbi$1(targetFirstParam)));
        }
      } else {
        return Promise.reject(me(ERR.CC_DISPATCH_PARAM_INVALID));
      }

      if (_module === '*') {
        return ccDispatch("*/" + _type, payload, {
          silent: isSilent,
          lazy: isLazy,
          renderKey: _renderKey,
          force: _force
        }, _delay, {
          refModule: callerRef.ctx.module
        } // in name of refModule to call dispatch handler
        );
      }

      var p = new Promise(function (resolve, reject) {
        dispatch$1({
          callerRef: callerRef,
          module: _module,
          type: _type,
          payload: payload,
          cb: _cb,
          __innerCb: _promiseErrorHandler(resolve, reject),
          delay: _delay,
          renderKey: _renderKey,
          isSilent: isSilent,
          force: _force,
          chainId: _chainId,
          oriChainId: _oriChainId,
          chainId2depth: chainId2depth // oriChainId: _oriChainId, oriChainDepth: _oriChainDepth, sourceModule: _sourceModule,

        });
      })["catch"](function (err) {
        // 强烈不建议用户配置 unsafe_moveReducerErrToErrorHandler 为 true，转发 reducer 错误到 errorHandler 里
        // 保留这个参数是为了让老版本的concent工程能够正常工作
        if (runtimeVar$2.unsafe_moveReducerErrToErrorHandler) {
          // 非严格模式，如果未配置 errorHandler，错误会被静默掉
          runtimeHandler$1.tryHandleError(err, !runtimeVar$2.isStrict);
        } else {
          throw err;
        }
      });
      /**
       * 用于帮助concent识别出这是用户直接返回的Promise对象，减少一次冗余的渲染
       *   function demoMethod(p,m,ac){
       *     // ac.setState已经触发了一次渲染
       *     // demoMethod可以不用再触发渲染了
       *     return ac.setState({num1:1}); 
       *   }
       */

      p.__c2Result = true;
      return p;
    };
  }
  function makeModuleDispatcher(module) {
    return function (action) {
      var _action = typeof action === 'string' && !action.includes('/') ? module + "/" + action : action;

      for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        args[_key2 - 1] = arguments[_key2];
      }

      return ccDispatch.apply(void 0, [_action].concat(args));
    };
  } // for moduleConf.init(legency) moduleConf.lifecycle.initState(v2.9+)

  function makeSetStateHandler(module, initStateDone) {
    return function (state) {
      var execInitDoneWrap = function execInitDoneWrap() {
        return initStateDone && initStateDone(makeModuleDispatcher(module), getState(module));
      };

      try {
        if (!state) return void execInitDoneWrap();
        innerSetState(module, state, execInitDoneWrap);
      } catch (err) {
        var moduleState = getState(module);

        if (!moduleState) {
          return justWarning$3("invalid module " + module);
        }

        var keys = okeys$7(moduleState);

        var _extractStateByKeys = extractStateByKeys(state, keys, false, true),
            partialState = _extractStateByKeys.partialState,
            isStateEmpty = _extractStateByKeys.isStateEmpty,
            ignoredStateKeys = _extractStateByKeys.ignoredStateKeys;

        if (!isStateEmpty) storeSetState$1(module, partialState); //store this valid state;

        if (ignoredStateKeys.length > 0) {
          justWarning$3("invalid keys:" + ignoredStateKeys.join(',') + ", their value is undefined or they are not declared in module" + module);
        }

        justTip("no ccInstance found for module[" + module + "] currently, cc will just store it, lately ccInstance will pick this state to render");
        execInitDoneWrap();
      }
    };
  }
  var makeRefSetState = function makeRefSetState(ref) {
    return function (partialState, cb) {
      var ctx = ref.ctx;
      var newState = Object.assign({}, ctx.unProxyState, partialState);
      ctx.unProxyState = newState; // 和class setState(partialState, cb); 保持一致

      var cbNewState = function cbNewState() {
        return cb && cb(newState);
      }; // 让ctx.state始终保持同一个引用，使setup里可以安全的解构state反复使用


      ctx.state = Object.assign(ctx.state, partialState);
      var act = runtimeHandler$1.act;

      var update = function update() {
        if (ctx.type === CC_HOOK) {
          ctx.__boundSetState(newState); // 保持和class组件callback一样的行为，即组件渲染后再触发callback


          setTimeout(cbNewState, 0);
        } else {
          // 此处注意原始的react class setSate [,callback] 不会提供latestState
          ctx.__boundSetState(partialState, cbNewState);
        }
      }; // for rest-test-utils


      if (act) act(update);else update();
    };
  };
  var makeRefForceUpdate = function makeRefForceUpdate(ref) {
    return function (cb) {
      var ctx = ref.ctx;
      var newState = Object.assign({}, ctx.unProxyState, ctx.__$$mstate);

      var cbNewState = function cbNewState() {
        return cb && cb(newState);
      };

      if (ctx.type === CC_HOOK) {
        ctx.__boundSetState(newState);

        cbNewState();
      } else {
        ctx.__boundForceUpdate(cbNewState);
      }
    };
  };

  var getState$1 = ccContext.store.getState;
  function initModuleLifecycle (moduleName, lifecycle) {
    if (lifecycle === void 0) {
      lifecycle = {};
    }

    var _lifecycle = lifecycle,
        initState = _lifecycle.initState,
        initStateDone = _lifecycle.initStateDone,
        loaded = _lifecycle.loaded,
        willUnmount = _lifecycle.willUnmount,
        mounted = _lifecycle.mounted; // 对接原来的 moduleConf.init initPost

    var validLifecycle = {};
    if (isFn(willUnmount)) validLifecycle.willUnmount = willUnmount;
    if (isFn(mounted)) validLifecycle.mounted = mounted;
    ccContext.lifecycle._lifecycle[moduleName] = validLifecycle;
    var moduleState = getState$1(moduleName);
    var d = makeModuleDispatcher(moduleName); // loaded just means that module state、reducer、watch、computed configuration were recorded to ccContext
    // so it is called before initState

    if (isFn(loaded)) {
      loaded(d, moduleState);
    }

    if (isFn(initState)) {
      Promise.resolve().then(function () {
        return initState(moduleState);
      }).then(function (state) {
        makeSetStateHandler(moduleName, initStateDone)(state);
      })["catch"](ccContext.runtimeHandler.tryHandleError);
    } else {
      // make sure initStateDone will be alway called no matther initState difined or not
      isFn(initStateDone) && initStateDone(d, moduleState);
    }
  }

  /**
   * 兼容v2.8之前的 moduleConf.init、initPost
   * 2.9之后不在types.d.ts的ModuleConf类型里暴露init、initPost，仅为了让老版本的js工程升级到2.9能正常工作
   * 如果是ts工程，则需要将init逻辑迁移到 lifecycle.initState 里，initPost 迁移到 lifecycle.initStateDone 里
   */
  function getLifecycle (legencyModuleConf) {
    var lifeCycleCopy = Object.assign({}, legencyModuleConf.lifecycle); // 优先取lifecycle里的initState、initStateDone，不存在的话再去对接原来外层的init、initPost定义

    if (!lifeCycleCopy.initState) lifeCycleCopy.initState = legencyModuleConf.init;
    if (!lifeCycleCopy.initStateDone) lifeCycleCopy.initStateDone = legencyModuleConf.initPost;
    return lifeCycleCopy;
  }

  /** @typedef {import('../types').ModuleConfig} ModuleConfig */
  var isPJO$5 = isPJO,
      evalState$1 = evalState,
      okeys$8 = okeys,
      isFn$1 = isFn;
  /**
   * @description configure module associate params
   * @author zzk
   * @export
   * @param {string | {[module:string]: ModuleConfig}} moduleNameOrNamedModuleConf
   * @param {ModuleConfig | ConfOptions } config - when module type is string
   */

  function configure (moduleNameOrNamedModuleConf, config, innerParams) {
    if (config === void 0) {
      config = {};
    }

    var confOneModule = function confOneModule(module,
    /** @type ModuleConfig*/
    config, allowDup) {
      if (allowDup === void 0) {
        allowDup = false;
      }

      if (!ccContext.isStartup) {
        pendingModules.push({
          module: module,
          config: config
        });
        return;
      }

      if (!isPJO$5(config)) {
        throw new Error("param config " + INAJ);
      }

      if (module === MODULE_GLOBAL) {
        throw new Error('configuring global module is not allowed');
      }

      if (allowDup && ccContext.store.getState(module)) {
        return;
      }

      var state = config.state,
          reducer = config.reducer,
          computed = config.computed,
          watch = config.watch,
          _config$ghosts = config.ghosts,
          ghosts = _config$ghosts === void 0 ? [] : _config$ghosts;
      var eState = evalState$1(state);
      if (isFn$1(state)) ccContext.moduleName2stateFn[module] = state; // 运行重复且已存在，则直接忽略此模块

      initModuleState(module, eState, true, innerParams);
      initModuleReducer(module, reducer, ghosts);
      initModuleComputed(module, computed);
      initModuleWatch(module, watch);
      initModuleLifecycle(module, getLifecycle(config));
      ccContext.moduleName2isConfigured[module] = true;
      send(SIG_MODULE_CONFIGURED, module);
    }; // now module is an object that includes partial store conf


    if (isPJO$5(moduleNameOrNamedModuleConf)) {
      var allowDup = false;
      if (isPJO$5(config)) allowDup = config.allowDup === true;
      okeys$8(moduleNameOrNamedModuleConf).forEach(function (moduleName) {
        return confOneModule(moduleName, moduleNameOrNamedModuleConf[moduleName], allowDup);
      });
    } else {
      confOneModule(moduleNameOrNamedModuleConf, config);
    }
  }

  function tagReducerFn(reducerFns, moduleName) {
    var taggedReducer = {};

    if (reducerFns) {
      okeys(reducerFns).forEach(function (fnName) {
        var oldFn = reducerFns[fnName];

        var fn = function fn() {
          return oldFn.apply(void 0, arguments);
        };

        fn.__fnName = fnName;
        fn.__stateModule = moduleName;
        taggedReducer[fnName] = fn;
      });
    }

    return taggedReducer;
  }
  /**
   * @param {string} newModule
   * @param {string} existingModule
   */


  var _cloneModule = (function (newModule, existingModule, moduleOverideConf) {
    if (moduleOverideConf === void 0) {
      moduleOverideConf = {};
    }

    var _moduleOverideConf = moduleOverideConf,
        state = _moduleOverideConf.state,
        reducer = _moduleOverideConf.reducer,
        computed = _moduleOverideConf.computed,
        watch = _moduleOverideConf.watch;

    if (!ccContext.isStartup) {
      throw new Error('concent is not running');
    }

    checkModuleNameBasically(newModule);
    checkModuleName(existingModule, false);
    var stateFn = ccContext.moduleName2stateFn[existingModule];

    if (!stateFn) {
      throw new Error("target module[" + existingModule + "] state must be a function when use cloneModule");
    }

    var stateCopy = stateFn();
    Object.assign(stateCopy, evalState(state));
    var originalReducer = ccContext.reducer._reducer[existingModule]; // attach  __fnName  __stateModule, 不能污染原函数的dispatch逻辑里需要的__stateModule

    var taggedReducerCopy = Object.assign(tagReducerFn(originalReducer, newModule), tagReducerFn(reducer, newModule));
    var computedCopy = Object.assign({}, ccContext.computed._computedRaw[existingModule], computed);
    var watchCopy = Object.assign({}, ccContext.watch._watchRaw[existingModule], watch);
    var lifecycleCopy = Object.assign({}, ccContext.lifecycle._lifecycle[existingModule], getLifecycle(moduleOverideConf));
    var confObj = {
      state: stateCopy,
      reducer: taggedReducerCopy,
      computed: computedCopy,
      watch: watchCopy,
      lifecycle: lifecycleCopy
    };
    configure(newModule, confObj);
  });

  var event2handlers = ccContext.event2handlers,
      handlerKey2handler = ccContext.handlerKey2handler,
      ccUKey2handlerKeys = ccContext.ccUKey2handlerKeys,
      ccUKey2ref$1 = ccContext.ccUKey2ref;
  var makeHandlerKey$1 = makeHandlerKey,
      safeGetArray$1 = safeGetArray,
      justWarning$4 = justWarning;

  function _findEventHandlers(event, module, ccClassKey, ccUniqueKey, identity) {
    // 不用默认参数写法了
    // codesandbox lost default value
    var _identity = identity == undefined ? null : identity; // 查找的时候，只负责取，不负责隐式的生成，此次不需要用safeGetArray


    var handlers = event2handlers[event];

    if (handlers) {
      var filteredHandlers = handlers;
      if (ccUniqueKey) filteredHandlers = handlers.filter(function (v) {
        return v.ccUniqueKey === ccUniqueKey;
      });else if (ccClassKey) filteredHandlers = handlers.filter(function (v) {
        return v.ccClassKey === ccClassKey;
      });else if (module) filteredHandlers = handlers.filter(function (v) {
        return v.module === module;
      }); // identity is null means user call emit like emit('eventName')
      // identity is not null means user call emit like emit(['eventName', 'idtName'])

      if (_identity !== undefined) {
        filteredHandlers = filteredHandlers.filter(function (v) {
          return v.identity === _identity;
        });
      }

      return filteredHandlers;
    }

    return [];
  }

  function _deleteEventHandlers(handlers) {
    var toDeleteCcUniqueKeyMap = {};
    var toDeleteEventNames = [];
    handlers.forEach(function (item) {
      var handlerKey = item.handlerKey,
          ccUniqueKey = item.ccUniqueKey,
          event = item.event;
      delete handlerKey2handler[handlerKey]; // delete mapping of handlerKey2handler;
      toDeleteCcUniqueKeyMap[ccUniqueKey] = 1;
      if (!toDeleteEventNames.includes(event)) toDeleteEventNames.push(event);
    });
    toDeleteEventNames.forEach(function (event) {
      var eHandlers = event2handlers[event];

      if (eHandlers) {
        eHandlers.forEach(function (h, idx) {
          var ccUniqueKey = h.ccUniqueKey;

          if (toDeleteCcUniqueKeyMap[ccUniqueKey] === 1) {
            eHandlers[idx] = null;
            delete ccUKey2handlerKeys[ccUniqueKey]; // delete mapping of ccUKey2handlerKeys;
          }
        });
        event2handlers[event] = eHandlers.filter(function (v) {
          return v !== null;
        }); // delete eHandlers null element
      }
    });
  }

  function bindEventHandlerToCcContext(module, ccClassKey, ccUniqueKey, event, identity, handler) {
    var handlers = safeGetArray$1(event2handlers, event);

    if (!isFn(handler)) {
      return justWarning$4("event " + event + "'s handler " + INAF + "!");
    }

    var handlerKey = makeHandlerKey$1(ccUniqueKey, event, identity);
    var handlerKeys = safeGetArray$1(ccUKey2handlerKeys, ccUniqueKey);
    var targetHandlerIndex = handlers.findIndex(function (v) {
      return v.handlerKey === handlerKey;
    }); // user call ctx.on for a same event in a same instance more than once

    var handlerItem = {
      event: event,
      module: module,
      ccClassKey: ccClassKey,
      ccUniqueKey: ccUniqueKey,
      identity: identity,
      handlerKey: handlerKey,
      fn: handler
    };

    if (targetHandlerIndex > -1) {
      // will alway use the latest handler
      handlers[targetHandlerIndex] = handlerItem;
    } else {
      handlers.push(handlerItem);
      handlerKeys.push(handlerKey);
    }

    handlerKey2handler[handlerKey] = handlerItem;
  }
  function findEventHandlersToPerform(event) {
    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    var _event,
        _identity = null,
        _module,
        _ccClassKey,
        _ccUniqueKey;

    var canPerform = null;

    if (typeof event === 'string') {
      _event = event;
    } else {
      _event = event.name;
      _identity = event.identity;
      _module = event.module;
      _ccClassKey = event.ccClassKey;
      _ccUniqueKey = event.ccUniqueKey;
      canPerform = event.canPerform;
    }

    var handlers = _findEventHandlers(_event, _module, _ccClassKey, _ccUniqueKey, _identity);

    handlers.forEach(function (_ref) {
      var ccUniqueKey = _ref.ccUniqueKey,
          handlerKey = _ref.handlerKey;
      var ref = ccUKey2ref$1[ccUniqueKey];

      if (ref && handlerKey) {
        // confirm the instance is mounted and handler is not been offed
        if (ref.__$$ms !== MOUNTED) return;
        var handler = handlerKey2handler[handlerKey];

        if (handler) {
          if (canPerform && !canPerform(ref)) {
            return;
          }

          handler.fn.apply(handler, args);
        }
      }
    });
  }
  function findEventHandlersToOff(event, _ref2) {
    var module = _ref2.module,
        ccClassKey = _ref2.ccClassKey,
        ccUniqueKey = _ref2.ccUniqueKey,
        identity = _ref2.identity;

    var handlers = _findEventHandlers(event, module, ccClassKey, ccUniqueKey, identity);

    _deleteEventHandlers(handlers);
  }
  function offEventHandlersByCcUniqueKey(ccUniqueKey) {
    var handlerKeys = ccUKey2handlerKeys[ccUniqueKey];

    if (handlerKeys) {
      var toDeleteHandlers = [];
      handlerKeys.forEach(function (k) {
        return toDeleteHandlers.push(handlerKey2handler[k]);
      });

      _deleteEventHandlers(toDeleteHandlers);
    }
  }
  function getEventItem(event) {
    var outputEv;

    if (event && typeof event === 'object') {
      var _event;

      if (Array.isArray(event)) {
        var name = event[0],
            identity = event[1];
        _event = {
          name: name,
          identity: identity
        };
      } else {
        _event = Object.assign({}, event);
      }

      if (!_event.identity) _event.identity = null; //否则就允许用户传如自己定义的module, ccClassKey

      outputEv = _event;
    } else {
      outputEv = {
        name: event,
        identity: null
      };
    }

    return outputEv;
  }

  var ev = /*#__PURE__*/Object.freeze({
    bindEventHandlerToCcContext: bindEventHandlerToCcContext,
    findEventHandlersToPerform: findEventHandlersToPerform,
    findEventHandlersToOff: findEventHandlersToOff,
    offEventHandlersByCcUniqueKey: offEventHandlersByCcUniqueKey,
    getEventItem: getEventItem
  });

  var getModuleVer$1 = ccContext.store.getModuleVer;
  function makeObState (ref, state, module, isForModule) {
    return new Proxy(state, {
      get: function get(target, key) {
        // ensureStateNotExpired, 当实例失去模块数据依赖，回调方法直接使用ctx.state时，state里的模块数据可能已过期
        if (isForModule) {
          var modVer = getModuleVer$1(module);
          var ctx = ref.ctx;

          if (modVer !== ctx.__$$prevModuleVer) {
            ctx.__$$prevModuleVer = modVer;
            Object.assign(state, ctx.__$$mstate);
          }
        }

        updateDep(ref, module, key, isForModule);
        return target[key];
      },
      set: function set(target, key, value) {
        // 这个warning暂时关闭，因为buildRefCtx阶段就生成了obState, refComputed里可能会调用commit向obState写入新的state
        // justWarning(`warning: state key[${key}] can not been changed manually, use api setState or dispatch instead`);
        // 允许赋最新值，否则silentUpdate状态合并会失效
        target[key] = value; // avoid Uncaught TypeError: 'set' on proxy: trap returned falsish for property '***'

        return true;
      }
    });
  }

  function getDefineWatchHandler (refCtx) {
    return function (watchItem, watchHandler, depKeysOrOpt) {
      var confMeta = {
        type: FN_WATCH,
        refCtx: refCtx,
        stateKeys: refCtx.stateKeys,
        retKeyFns: refCtx.watchRetKeyFns,
        module: refCtx.module,
        connect: refCtx.connect,
        dep: refCtx.watchDep
      };
      refCtx.__$$cuOrWaCalled = true;
      configureDepFns(CATE_REF, confMeta, watchItem, watchHandler, depKeysOrOpt);
    };
  }

  /** @typedef {import('../../types-inner').IRefCtx} IRefCtx */
  function getDefineComputedHandler (
  /** @type IRefCtx */
  refCtx) {
    return function (computedItem, computedHandler, depKeysOrOpt) {
      var confMeta = {
        type: FN_CU,
        refCtx: refCtx,
        stateKeys: refCtx.stateKeys,
        retKeyFns: refCtx.computedRetKeyFns,
        module: refCtx.module,
        connect: refCtx.connect,
        dep: refCtx.computedDep
      };
      refCtx.__$$cuOrWaCalled = true;
      configureDepFns(CATE_REF, confMeta, computedItem, computedHandler, depKeysOrOpt);
      return refCtx.refComputed;
    };
  }

  var makeUniqueCcKey$2 = makeUniqueCcKey;
  function computeCcUniqueKey (ccClassKey, ccKey, tag) {
    var featureStr = ccKey || uuid(tag);
    return makeUniqueCcKey$2(ccClassKey, featureStr);
  }

  function getOutProps (props) {
    if (props) {
      return props.props || props; //把最外层的props传递给用户
    } else {
      return {};
    }
  }

  var getState$2 = ccContext.store.getState;

  function getValFromEvent(e) {
    var se = convertToStandardEvent(e);

    if (se) {
      return se.currentTarget.value;
    } else {
      return e;
    }
  }

  var buildMockEvent = (function (spec, e, refCtx) {
    var refModule = refCtx.module,
        refState = refCtx.state;
    var ccint = false,
        ccsync = '',
        ccrkey = '',
        value = '',
        extraState = null,
        ccdelay = -1,
        isToggleBool = false;
    var syncKey = spec[CCSYNC_KEY];
    var type = spec.type;
    var noAutoExtract = false;

    if (syncKey !== undefined) {
      // 来自sync生成的setter函数调用 即 sync('xxxKey')
      ccsync = syncKey;
      ccdelay = spec.delay;
      ccrkey = spec.rkey; // type 'bool', 'val', 'int', 'as'

      ccint = type === 'int'; // convert to int

      isToggleBool = type === 'bool';
      var keyPath, fullKeyPath, module;

      if (ccsync.includes('/')) {
        var _ccsync$split = ccsync.split('/'),
            _module = _ccsync$split[0],
            _keyPath = _ccsync$split[1];

        keyPath = _keyPath;
        fullKeyPath = ccsync;
        module = _module;
      } else {
        keyPath = ccsync;
        fullKeyPath = refModule + "/" + keyPath;
        module = refModule;
      }

      var mState = getState$2(module); // 布尔值需要对原来的值取反

      var fullState = module !== refModule ? mState : refState;
      value = type === 'bool' ? !getValueByKeyPath(fullState, keyPath) : getValFromEvent(e); // 优先从spec里取，取不到的话value不会重新被赋值，而是直接用上面从e里提取出来的值

      var val = spec.val;

      if (val === undefined || val === AUTO_VAL) ; else {
        if (isFn(val)) {
          // moduleState指的是所修改的目标模块的state
          var syncRet = val( // TODO: syncCtx 填写函数 setVal(keyPath, value)
          value, keyPath, {
            event: e,
            module: module,
            moduleState: mState,
            fullKeyPath: fullKeyPath,
            state: refState,
            refCtx: refCtx
          });

          if (syncRet !== undefined) {
            if (type === 'as') value = syncRet; // value is what cb returns;
            else {
                var retType = typeof syncRet;

                if (retType === 'boolean') {
                  // if return true, let noAutoExtract = false, 
                  // so this cb will not block state update, and cc will extract partial state automatically
                  // if return false, let noAutoExtract = true, but now extraState is still null, 
                  // so this cb will block state update
                  noAutoExtract = !syncRet;
                } else if (retType === 'object') {
                  noAutoExtract = true;
                  extraState = syncRet;
                } else {
                  justWarning("syncKey[" + syncKey + "] cb result type error.");
                }
              }
          } else {
            if (type === 'as') noAutoExtract = true; // if syncAs return undefined, will block update
            // else continue update and value is just extracted above
          }
        } else {
          value = val;
        }
      }
    } else {
      // 来自于sync直接调用 <input data-ccsync="foo/f1" onChange={this.ctx.sync} /> 
      var se = convertToStandardEvent(e);

      if (se) {
        // e is event
        var currentTarget = se.currentTarget;
        value = currentTarget.value;
        var dataset = currentTarget.dataset;
        if (type === 'int') ccint = true;else ccint = dataset.ccint !== undefined;
        ccsync = dataset.ccsync;
        if (!ccsync) return null;
        ccrkey = dataset.ccrkey;
        var dataSetDelay = dataset.ccdelay;

        if (dataSetDelay) {
          try {
            ccdelay = parseInt(dataSetDelay);
          } catch (err) {// do nothing
          }
        }
      } else {
        // no data-ccsync in attrs, <Input onChange={this.ctx.sync}/> is invalid
        return null;
      }
    }

    return {
      currentTarget: {
        value: value,
        extraState: extraState,
        noAutoExtract: noAutoExtract,
        dataset: {
          ccsync: ccsync,
          ccint: ccint,
          ccdelay: ccdelay,
          ccrkey: ccrkey
        }
      },
      isToggleBool: isToggleBool
    };
  });

  function setValue(obj, keys, lastKeyIndex, keyIndex, value, isToggleBool) {
    if (isToggleBool === void 0) {
      isToggleBool = false;
    }

    var key = keys[keyIndex];
    var oriVal = obj[key];

    if (lastKeyIndex === keyIndex) {
      if (isToggleBool === true) {
        if (typeof oriVal !== 'boolean') {
          justWarning("key[" + key + "]'s value type is not boolean");
        } else {
          obj[key] = !oriVal;
        }
      } else {
        obj[key] = value;
      }
    } else {
      var newVal = shallowCopy(oriVal);
      obj[key] = newVal;
      setValue(newVal, keys, lastKeyIndex, ++keyIndex, value, isToggleBool);
    }
  }

  var extractStateByCcsync = (function (ccsync, value, ccint, oriState, isToggleBool, refModule) {
    var _value = value;

    if (ccint === true) {
      _value = parseInt(value); // strict?

      if (Number.isNaN(_value)) {
        justWarning(value + " can not convert to int but you set ccint as true!");
        _value = value;
      }
    }

    var module = refModule,
        keys = [];

    if (ccsync.includes('/')) {
      var _ccsync$split = ccsync.split('/'),
          _module = _ccsync$split[0],
          keyOrKeyPath = _ccsync$split[1];

      module = _module;

      if (keyOrKeyPath.includes('.')) {
        keys = keyOrKeyPath.split('.');
      } else {
        keys = [keyOrKeyPath];
      }
    } else if (ccsync.includes('.')) {
      keys = ccsync.split('.');
    } else {
      keys = [ccsync];
    }

    var keyPath = keys.join('.');

    if (keys.length === 1) {
      var targetStateKey = keys[0];

      if (isToggleBool === true) {
        var _state;

        return {
          module: module,
          keys: keys,
          keyPath: keyPath,
          state: (_state = {}, _state[targetStateKey] = !oriState[targetStateKey], _state)
        };
      } else {
        var _state2;

        return {
          module: module,
          keys: keys,
          keyPath: keyPath,
          state: (_state2 = {}, _state2[targetStateKey] = _value, _state2)
        };
      }
    } else {
      var _state3;

      var _keys = keys,
          key = _keys[0],
          restKeys = _keys.slice(1);

      var subState = shallowCopy(oriState[key]);
      setValue(subState, restKeys, restKeys.length - 1, 0, _value, isToggleBool);
      return {
        module: module,
        keys: keys,
        keyPath: keyPath,
        state: (_state3 = {}, _state3[key] = subState, _state3)
      };
    }
  });

  var getState$3 = ccContext.store.getState;
  function __sync (spec, ref, e) {
    var refCtx = ref.ctx;
    var mockE = buildMockEvent(spec, e, refCtx);
    if (!mockE) return; // 参数无效 例如 <input onChange={this.sync}/> 导致

    var ccKey = refCtx.ccKey,
        ccUniqueKey = refCtx.ccUniqueKey,
        refModule = refCtx.module;
    var currentTarget = mockE.currentTarget;
    var dataset = currentTarget.dataset,
        value = currentTarget.value,
        extraState = currentTarget.extraState,
        noAutoExtract = currentTarget.noAutoExtract;
    if (e && e.stopPropagation) e.stopPropagation();
    var ccint = dataset.ccint,
        ccdelay = dataset.ccdelay,
        ccrkey = dataset.ccrkey;
    var ccsync = dataset.ccsync;

    if (ccsync.startsWith('/')) {
      ccsync = "" + refModule + ccsync; // 附加上默认模块值
    }

    var options = {
      calledBy: SYNC,
      ccKey: ccKey,
      ccUniqueKey: ccUniqueKey,
      module: refModule,
      renderKey: ccrkey,
      delay: ccdelay
    };

    var doExtract = function doExtract(fullState) {
      return extractStateByCcsync(ccsync, value, ccint, fullState, mockE.isToggleBool, refModule);
    };

    if (ccsync.includes('/')) {
      // syncModuleState 同步模块的state状态
      var targetModule = ccsync.split('/')[0];
      checkModuleName(targetModule, false);
      options.module = targetModule;

      if (noAutoExtract) {
        if (extraState) startChangeRefState(extraState, options, ref);
        return;
      }

      var fullState = targetModule !== refModule ? getState$3(targetModule) : ref.state;

      var _doExtract = doExtract(fullState),
          state = _doExtract.state,
          module = _doExtract.module,
          keys = _doExtract.keys,
          keyPath = _doExtract.keyPath;

      Object.assign(options, {
        module: module,
        keys: keys,
        keyPath: keyPath
      });
      startChangeRefState(state, options, ref);
    } else {
      // 调用自己的setState句柄触发更新，key可能属于local的，也可能属于module的
      if (noAutoExtract) {
        if (extraState) ref.setState(extraState, null, options);
        return;
      }

      var _doExtract2 = doExtract(ref.state),
          _state = _doExtract2.state,
          _module = _doExtract2.module,
          _keys = _doExtract2.keys,
          _keyPath = _doExtract2.keyPath;

      Object.assign(options, {
        module: _module,
        keys: _keys,
        keyPath: _keyPath
      });
      ref.setState(_state, null, options);
    }
  }

  var getModuleStateKeys$2 = ccContext.getModuleStateKeys;
  var verifyKeys$1 = verifyKeys,
      vbi$2 = verboseInfo,
      okeys$9 = okeys;
  function getStoredKeys(belongMotule, refPrivState, ccOptionStoredKeys, regStoredKeys) {
    var targetStoredKeys = ccOptionStoredKeys || regStoredKeys;

    if (!targetStoredKeys) {
      return [];
    }

    var moduleStateKeys = getModuleStateKeys$2(belongMotule);

    if (targetStoredKeys === '*') {
      // refPrivState里可能含有moduleStateKey，需要进一步过滤
      return okeys$9(refPrivState).filter(function (k) {
        return !moduleStateKeys.includes(k);
      });
    } else {
      checkStoredKeys(belongMotule, targetStoredKeys);
      return targetStoredKeys;
    }
  }
  function getWatchedStateKeys(module, ccClassKey, regWatchedKeys) {
    if (ccClassKey === CC_DISPATCHER) return [];
    if (!regWatchedKeys) return [];

    if (regWatchedKeys === '*') {
      return getModuleStateKeys$2(module);
    }

    if (regWatchedKeys === '-') {
      return regWatchedKeys;
    }

    var _verifyKeys = verifyKeys$1(regWatchedKeys, []),
        notArray = _verifyKeys.notArray,
        keyElementNotString = _verifyKeys.keyElementNotString;

    if (notArray || keyElementNotString) {
      var vbiInfo = vbi$2("ccClassKey:" + ccClassKey);
      throw new Error("watchedKeys " + STR_ARR_OR_STAR + " " + vbiInfo);
    }

    return regWatchedKeys;
  }
  function getConnect(regConnect) {
    var targetConnect = regConnect || {}; // codesandbox lost default value

    if (!isPJO(targetConnect, true)) {
      throw new Error("param connect type error, it " + INAJ + " or string array");
    }

    var isArr = Array.isArray(targetConnect);
    var finalConnect = {};

    if (isArr || typeof targetConnect === 'string') {
      var connectedModules = isArr ? targetConnect : targetConnect.split(',');
      connectedModules.forEach(function (m) {
        finalConnect[m] = '-'; //标识自动收集观察依赖
      });
    } else {
      finalConnect = regConnect;
    } // 未设定连接$$global模块的watchedKeys参数时，自动连接$$global模块，并默认采用依赖收集


    if (!finalConnect[MODULE_GLOBAL]) {
      finalConnect[MODULE_GLOBAL] = '-';
    }

    checkConnectSpec(finalConnect);
    return finalConnect;
  }

  /** @typedef {import('../../types-inner').IRefCtx} ICtx */
  var _ccContext$reducer = ccContext.reducer,
      _caller = _ccContext$reducer._caller,
      _module2fnNames = _ccContext$reducer._module2fnNames,
      _module2Ghosts = _ccContext$reducer._module2Ghosts,
      refStore$1 = ccContext.refStore,
      getModuleStateKeys$3 = ccContext.getModuleStateKeys,
      _ccContext$store$2 = ccContext.store,
      getState$4 = _ccContext$store$2.getState,
      getModuleVer$2 = _ccContext$store$2.getModuleVer;
  var noop$1 = noop;
  var okeys$a = okeys,
      me$1 = makeError,
      vbi$3 = verboseInfo,
      isObject$1 = isObject,
      isBool$1 = isBool,
      justWarning$5 = justWarning,
      isObjectNull$2 = isObjectNull,
      isValueNotNull$2 = isValueNotNull,
      noDupPush$1 = noDupPush;
  var idSeq = 0;

  function getEId() {
    idSeq += 1;
    return Symbol("__autoGen_" + idSeq + "__");
  }

  var fnKey = 0;

  function getFnKey() {
    fnKey += 1;
    return "" + fnKey;
  }

  var eType = function eType(th) {
    return "type of defineEffect " + th + " param must be";
  };

  var getWatchedKeys = function getWatchedKeys(ctx) {
    if (ctx.watchedKeys === '-') {
      if (ctx.__$$renderStatus === START) return okeys$a(ctx.__$$compareWaKeys);
      return okeys$a(ctx.__$$curWaKeys);
    }

    return ctx.watchedKeys;
  };

  var getConnectWatchedKeys = function getConnectWatchedKeys(ctx, moduleName) {
    var connect = ctx.connect,
        connectedModules = ctx.connectedModules;
    var isConnectArr = Array.isArray(connect);

    var getModuleWaKeys = function getModuleWaKeys(m) {
      if (ctx.__$$renderStatus === START) return okeys$a(ctx.__$$compareConnWaKeys[m]);
      return okeys$a(ctx.__$$curConnWaKeys[m]);
    };

    var getWKeys = function getWKeys(moduleName) {
      if (isConnectArr) {
        // auto observe connect modules
        return getModuleWaKeys(moduleName);
      } else {
        var waKeys = connect[moduleName];
        if (waKeys === '*') return getModuleStateKeys$3(moduleName);else if (waKeys === '-') return getModuleWaKeys(moduleName);else return waKeys;
      }
    };

    if (moduleName) return getWKeys(moduleName);else {
      var cKeys = {};
      connectedModules.forEach(function (m) {
        cKeys[m] = getWKeys(m);
      });
      return cKeys;
    }
  };

  function recordDep(ccUniqueKey, moduleName, watchedKeys) {
    var waKeys = watchedKeys === '*' ? getModuleStateKeys$3(moduleName) : watchedKeys;
    waKeys.forEach(function (stateKey) {
      return mapIns(moduleName, stateKey, ccUniqueKey);
    });
  }

  function makeProxyReducer(m, dispatch, reducerFnType, ghostFnName) {
    if (reducerFnType === void 0) {
      reducerFnType = 0;
    }

    // 让绑定到组件上的mr.{xxx} 方法始终指向同一个，让 memo 优化可以生效
    var name2wrapFn = {}; // 此处代理对象仅用于log时可以打印出目标模块reducer函数集合

    return new Proxy(_caller[m] || {}, {
      get: function get(target, fnName) {
        var fnNames = _module2fnNames[m];

        if (fnNames.includes(fnName)) {
          var _fnKey = m + "/" + fnName;

          var wrapFn = name2wrapFn[_fnKey];

          if (!wrapFn) {
            wrapFn = function wrapFn(payload, renderKey, delay$$1) {
              var callerParams = {
                module: m,
                fnName: fnName,
                payload: payload,
                renderKey: renderKey,
                delay: delay$$1
              };
              if (reducerFnType === 0) return dispatch(_fnKey, payload, renderKey, delay$$1);
              if (reducerFnType === 1) return callerParams;

              if (reducerFnType === 2) {
                if (fnName === ghostFnName) return justWarning$5("the target fn[" + fnName + "] can't be a ghost");
                return dispatch(m + "/" + ghostFnName, callerParams, renderKey, delay$$1);
              }
            };

            name2wrapFn[_fnKey] = wrapFn;
          }

          return wrapFn;
        } else {
          // 可能是原型链上的其他方法或属性调用
          return target[fnName];
        }
      }
    });
  }

  function bindCtxToRef(isCtxNull, ref, ctx) {
    if (isCtxNull) return ref.ctx = ctx; // 适配热加载或者异步渲染里, 需要清理ctx里运行时收集的相关数据，重新分配即可
    // 这里需要把第一次渲染期间已经收集好的依赖再次透传给ref.ctx

    var _ref$ctx = ref.ctx,
        __$$curWaKeys = _ref$ctx.__$$curWaKeys,
        __$$compareWaKeys = _ref$ctx.__$$compareWaKeys,
        __$$compareWaKeyCount = _ref$ctx.__$$compareWaKeyCount,
        __$$nextCompareWaKeys = _ref$ctx.__$$nextCompareWaKeys,
        __$$nextCompareWaKeyCount = _ref$ctx.__$$nextCompareWaKeyCount,
        __$$curConnWaKeys = _ref$ctx.__$$curConnWaKeys,
        __$$compareConnWaKeys = _ref$ctx.__$$compareConnWaKeys,
        __$$compareConnWaKeyCount = _ref$ctx.__$$compareConnWaKeyCount,
        __$$nextCompareConnWaKeys = _ref$ctx.__$$nextCompareConnWaKeys,
        __$$nextCompareConnWaKeyCount = _ref$ctx.__$$nextCompareConnWaKeyCount;
    Object.assign(ref.ctx, ctx, {
      __$$curWaKeys: __$$curWaKeys,
      __$$compareWaKeys: __$$compareWaKeys,
      __$$compareWaKeyCount: __$$compareWaKeyCount,
      __$$nextCompareWaKeys: __$$nextCompareWaKeys,
      __$$nextCompareWaKeyCount: __$$nextCompareWaKeyCount,
      __$$curConnWaKeys: __$$curConnWaKeys,
      __$$compareConnWaKeys: __$$compareConnWaKeys,
      __$$compareConnWaKeyCount: __$$compareConnWaKeyCount,
      __$$nextCompareConnWaKeys: __$$nextCompareConnWaKeys,
      __$$nextCompareConnWaKeyCount: __$$nextCompareConnWaKeyCount
    });
  }

  function bindInitStateHandler(ref, ctx, registryState, refStoredState, mstate, modStateKeys) {
    // allow user have a chance to define state in setup block
    ctx.initState = function (initialStateOrCb) {
      var initialState = initialStateOrCb;

      if (isFn(initialStateOrCb)) {
        initialState = initialStateOrCb();
      }

      if (!ctx.__$$inBM) {
        return justWarning$5("initState must been called in setup block!");
      }

      if (!isPJO(registryState)) {
        return justWarning$5("state " + INAJ);
      }

      if (ctx.__$$cuOrWaCalled) {
        return justWarning$5("initState must been called before computed or watch");
      }

      var newRefState = Object.assign({}, registryState, initialState, refStoredState, mstate); // 更新stateKeys，防止遗漏新的私有stateKey

      ctx.stateKeys = okeys$a(newRefState);
      ctx.privStateKeys = removeArrElements(okeys$a(newRefState), modStateKeys);
      ctx.prevState = Object.assign({}, newRefState);
      ctx.unProxyState = newRefState;
      ref.state = Object.assign(ctx.state, newRefState); // 扩展私有属性后，type.d.ts里会自动计算新的fullState，
      // 这里直接返回ctx, 但类型文件仅描述了可解构使用的有 state、setState、computed、watch 四个属性
      // 导出这四个属性可方便直接使用推导出的合并类型

      return ctx;
    };
  }

  function bindModApis(ref, ctx, stateModule, liteLevel, setState) {
    // 创建dispatch需要ref.ctx里的ccClassKey相关信息, 所以这里放在ref.ctx赋值之后在调用makeDispatchHandler
    var dispatch = makeDispatchHandler(ref, false, false, stateModule);
    ctx.dispatch = dispatch;

    if (liteLevel > 1) {
      // level 2, assign these mod data api
      ctx.lazyDispatch = makeDispatchHandler(ref, true, false, stateModule);
      ctx.silentDispatch = makeDispatchHandler(ref, false, true, stateModule);
      ctx.dispatchLazy = ctx.lazyDispatch; // alias of lazyDispatch

      ctx.dispatchSilent = ctx.silentDispatch; // alias of silentDispatch

      ctx.invoke = makeInvokeHandler(ref);
      ctx.lazyInvoke = makeInvokeHandler(ref, {
        isLazy: true
      });
      ctx.silentInvoke = makeInvokeHandler(ref, {
        isLazy: false,
        isSilent: true
      });
      ctx.invokeLazy = ctx.lazyInvoke; // alias of lazyInvoke

      ctx.invokeSilent = ctx.silentInvoke; // alias of silentInvoke

      ctx.setGlobalState = function (state, reactCallback, renderKey, delay$$1) {
        setState(MODULE_GLOBAL, state, SET_STATE, reactCallback, renderKey, delay$$1);
      };
    }

    return dispatch;
  }

  function bindSyncApis(ref, ctx, liteLevel) {
    if (liteLevel > 2) {
      // level 3, assign sync api
      var cachedBoundFns = {};

      var doSync = function doSync(type, e, val, rkey, delay$$1) {
        if (typeof e === 'string') {
          var valType = typeof val; // now val is syncCb

          if (isValueNotNull$2(val) && (valType === OBJ || valType === FN || val === AUTO_VAL)) {
            var _sync$bind;

            return __sync.bind(null, (_sync$bind = {}, _sync$bind[CCSYNC_KEY] = e, _sync$bind.type = type, _sync$bind.val = val, _sync$bind.delay = delay$$1, _sync$bind.rkey = rkey, _sync$bind), ref);
          }

          var valStr = val && val.toString ? val.toString() : '';
          var key = e + "|" + valStr + "|" + rkey + "|" + delay$$1;
          var boundFn = cachedBoundFns[key];

          if (!boundFn) {
            var _sync$bind2;

            cachedBoundFns[key] = __sync.bind(null, (_sync$bind2 = {}, _sync$bind2[CCSYNC_KEY] = e, _sync$bind2.type = type, _sync$bind2.val = val, _sync$bind2.delay = delay$$1, _sync$bind2.rkey = rkey, _sync$bind2), ref);
            boundFn = cachedBoundFns[key];
          }

          return boundFn;
        } // case: <input data-ccsync="foo/f1" onChange={ctx.sync} />


        __sync({
          type: 'val'
        }, ref, e);
      }; // syncer series


      var makeTrap = function makeTrap(type) {
        return {
          get: function get(target, key) {
            if (isKeyValid(target, key)) return doSync(type, key);
            return noop$1;
          }
        };
      };

      ctx.syncer = new Proxy(ctx.state, makeTrap('val'));
      ctx.syncerOfBool = new Proxy(ctx.state, makeTrap('bool'));
      ctx.sybo = ctx.syncerOfBool; // alias of syncerOfBool
      // sync series

      ctx.sync = function (e, val, rkey, delay$$1) {
        if (rkey === void 0) {
          rkey = '';
        }

        if (delay$$1 === void 0) {
          delay$$1 = -1;
        }

        return doSync('val', e, val, rkey, delay$$1);
      };

      ctx.syncBool = function (e, val, rkey, delay$$1) {
        if (rkey === void 0) {
          rkey = '';
        }

        if (delay$$1 === void 0) {
          delay$$1 = -1;
        }

        return doSync('bool', e, val, rkey, delay$$1);
      };

      ctx.syncInt = function (e, val, rkey, delay$$1) {
        if (rkey === void 0) {
          rkey = '';
        }

        if (delay$$1 === void 0) {
          delay$$1 = -1;
        }

        return doSync('int', e, val, rkey, delay$$1);
      };

      ctx.syncAs = function (e, val, rkey, delay$$1) {
        if (rkey === void 0) {
          rkey = '';
        }

        if (delay$$1 === void 0) {
          delay$$1 = -1;
        }

        return doSync('as', e, val, rkey, delay$$1);
      };

      ctx.set = function (ccsync, val, rkey, delay$$1) {
        var _sync;

        if (rkey === void 0) {
          rkey = '';
        }

        if (delay$$1 === void 0) {
          delay$$1 = -1;
        }

        __sync((_sync = {}, _sync[CCSYNC_KEY] = ccsync, _sync.type = 'val', _sync.val = val, _sync.delay = delay$$1, _sync.rkey = rkey, _sync), ref);
      };

      ctx.setBool = function (ccsync, rkey, delay$$1) {
        var _sync2;

        if (rkey === void 0) {
          rkey = '';
        }

        if (delay$$1 === void 0) {
          delay$$1 = -1;
        }

        __sync((_sync2 = {}, _sync2[CCSYNC_KEY] = ccsync, _sync2.type = 'bool', _sync2.delay = delay$$1, _sync2.rkey = rkey, _sync2), ref);
      };
    }
  }

  function bindEventApis(ctx, liteLevel, ccUniqueKey) {
    if (liteLevel > 3) {
      // level 4, assign event api
      ctx.emit = function (event) {
        for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          args[_key - 1] = arguments[_key];
        }

        findEventHandlersToPerform.apply(ev, [getEventItem(event)].concat(args));
      }; // 默认off掉当前实例对某个事件名的所有监听


      ctx.off = function (event, _temp) {
        var _ref = _temp === void 0 ? {} : _temp,
            module = _ref.module,
            ccClassKey = _ref.ccClassKey,
            _ref$ccUniqueKey = _ref.ccUniqueKey,
            inputCcUkey = _ref$ccUniqueKey === void 0 ? ccUniqueKey : _ref$ccUniqueKey;

        var targetCcUkey = inputCcUkey; // 传递了 module 或者 ccClassKey的话，清理掉targetCcUkey，表示off的目标要扩大

        if (module || ccClassKey) targetCcUkey = ''; // 这里刻意不为identity赋默认值，如果是undefined，表示off掉所有监听

        var _ev$getEventItem = getEventItem(event),
            name = _ev$getEventItem.name,
            identity = _ev$getEventItem.identity;

        findEventHandlersToOff(name, {
          module: module,
          ccClassKey: ccClassKey,
          ccUniqueKey: targetCcUkey,
          identity: identity
        });
      };

      ctx.on = function (inputEvent, handler) {
        ctx.__$$onEvents.push({
          inputEvent: inputEvent,
          handler: handler
        });
      };
    }
  }

  function _makeCuWaDesc(moduleName, fnKeyOrDesc, cb, cbOptions) {
    var newDesc = {};

    var makeFnDesc$$1 = function makeFnDesc$$1(fn, cbOptions) {
      var fnDesc = isObject(fn) ? fn : {
        fn: fn
      }; // 因为加上 / 后，cb的state类型会和模块相关了，types文件目前不方便推导含 / 的cb参数类型
      // 所以types文件里不允许传递 allowSlash 标记，让用户定义的retKey包含 / 会报运行时错误
      // 同时额外提供的 watchModule方法和 computedModule 方法需要用到 / 携带模块的特性
      // 故需内部放过不允许key包含slash的校验，所以这里加上 allowSlash 标记

      var opts = {};
      if (cbOptions) opts = isObject(cbOptions) ? cbOptions : {
        depKeys: cbOptions
      };
      var depKeys = opts.depKeys || fnDesc.depKeys;

      if (Array.isArray(depKeys)) {
        // 让 watchModule 的 depKeys 不拼模块前缀也能生效
        depKeys = depKeys.map(function (key) {
          return key.includes('/') ? key : moduleName + "/" + key;
        });
      } else {
        depKeys = [];
      }

      return Object.assign({
        allowSlash: true,
        depKeyModule: moduleName
      }, fnDesc, opts, {
        depKeys: depKeys
      });
    };

    if (typeof fnKeyOrDesc === 'string') {
      newDesc[moduleName + "/" + fnKeyOrDesc] = makeFnDesc$$1(cb, cbOptions);
    } else if (isObject(fnKeyOrDesc)) {
      okeys(fnKeyOrDesc).forEach(function (key) {
        newDesc[moduleName + "/" + key] = makeFnDesc$$1(fnKeyOrDesc[key]);
      });
    }

    return newDesc;
  }

  function bindEnhanceApis(ctx, liteLevel, stateModule) {
    var effectItems = [],
        effectPropsItems = []; // {fn:function, status:0, eId:'', immediate:true}

    var eid2effectReturnCb = {},
        eid2effectPropsReturnCb = {}; // fn

    ctx.effectMeta = {
      effectItems: effectItems,
      eid2effectReturnCb: eid2effectReturnCb,
      effectPropsItems: effectPropsItems,
      eid2effectPropsReturnCb: eid2effectPropsReturnCb
    };

    if (liteLevel > 4) {
      // level 5, assign enhance api
      ctx.execute = function (handler) {
        return ctx.execute = handler;
      };

      ctx.watch = getDefineWatchHandler(ctx);
      ctx.computed = getDefineComputedHandler(ctx); // 方便type文件定义类型时能够推导出cb的参数类型为已连接的模块状态类型

      ctx.watchModule = function (moduleName, cbOrMultiWatchDesc, cbOptions) {
        if (cbOptions === void 0) {
          cbOptions = {};
        }

        if (isFn(cbOrMultiWatchDesc)) {
          ctx.watch(_makeCuWaDesc(moduleName, getFnKey(), cbOrMultiWatchDesc, cbOptions));
        } else {
          ctx.watch(_makeCuWaDesc(moduleName, cbOrMultiWatchDesc));
        }
      }; // 方便type文件定义类型时能够推导出cb的参数类型为已连接的模块状态类型


      ctx.computedModule = function (moduleName, retKey, cb, cbOptions) {
        return ctx.computed(_makeCuWaDesc(moduleName, retKey, cb, cbOptions));
      };

      var makeEffectHandler = function makeEffectHandler(targetEffectItems, isProp) {
        return function (fn, depKeysOrOpt, compare, immediate) {
          if (immediate === void 0) {
            immediate = true;
          }

          if (!isFn(fn)) throw new Error(eType('first') + " function");
          var compareForEf = compare === undefined ? false : compare; // 对于effectProps 第三位参数就是immediate, 不传的话，默认是true

          var immediateForEfProp = compare === undefined ? true : compare; // depKeys 为 null 和 undefined, 表示无任何依赖，每一轮都执行的副作用

          var _depKeys = depKeysOrOpt;
          var _compare = compareForEf;

          var _immediate = isProp ? immediateForEfProp : immediate;

          if (isObject$1(depKeysOrOpt)) {
            _depKeys = depKeysOrOpt.depKeys;
            _compare = isBool$1(depKeysOrOpt.compare) ? depKeysOrOpt.compare : compare;
            _immediate = isBool$1(depKeysOrOpt.immediate) ? depKeysOrOpt.immediate : immediate;
          }

          if (_depKeys !== undefined && _depKeys !== null && !Array.isArray(_depKeys)) {
            throw new Error(eType('second') + " array, null, or undefined");
          }

          var modDepKeys = [];

          if (!isProp && _depKeys) {
            _depKeys.forEach(function (depKey) {
              var modDepKey;

              if (depKey.includes('/')) {
                modDepKey = depKey;

                var _depKey$split = depKey.split('/'),
                    m = _depKey$split[0];

                if (!ctx.connect[m]) {
                  throw me$1(ERR.CC_MODULE_NOT_CONNECTED, vbi$3("depKey[" + depKey + "]"));
                }
              } else {
                // 这里要注意， 私有的key
                modDepKey = stateModule + "/" + depKey;
              }

              modDepKeys.push(modDepKey); // 先暂时保持起来，组件挂载时才映射依赖

              ctx.__$$staticWaKeys[modDepKey] = 1;
            });
          } // 对于effectProps来说是不会读取compare属性来用的


          var effectItem = {
            fn: fn,
            isProp: isProp,
            depKeys: _depKeys,
            modDepKeys: modDepKeys,
            eId: getEId(),
            compare: _compare,
            immediate: _immediate
          };
          targetEffectItems.push(effectItem);
        };
      };

      ctx.effect = makeEffectHandler(effectItems, false);
      ctx.effectProps = makeEffectHandler(effectPropsItems, true);
    }
  }

  function fillCtxOtherAttrs(ref, ctx, connect, watchedKeys, ccUniqueKey, stateModule, allModules, dispatch) {
    // 构造完毕ctx后，开始创建 reducer，和可观察 connectedState
    var connectedReducer = ctx.connectedReducer,
        connectedState = ctx.connectedState,
        __$$curConnWaKeys = ctx.__$$curConnWaKeys,
        __$$compareConnWaKeys = ctx.__$$compareConnWaKeys,
        __$$compareConnWaKeyCount = ctx.__$$compareConnWaKeyCount,
        __$$nextCompareConnWaKeys = ctx.__$$nextCompareConnWaKeys,
        __$$nextCompareConnWaKeyCount = ctx.__$$nextCompareConnWaKeyCount; // 实例所属模块或连接模块是否处于自动观察状态

    var __$$autoWatch = false; // 向实例的reducer里绑定方法，key:{module} value:{reducerFn}
    // 只绑定所属的模块和已连接的模块的reducer方法

    allModules.forEach(function (m) {
      var rd = makeProxyReducer(m, dispatch);

      if (m === stateModule) {
        ctx.moduleReducer = rd;
        ctx.mrc = makeProxyReducer(m, dispatch, 1);
        var ghosts = _module2Ghosts[m] || [];
        ghosts.forEach(function (ghostFnName) {
          ctx.mrg[ghostFnName] = makeProxyReducer(m, dispatch, 2, ghostFnName);
        });
        if (m === MODULE_GLOBAL) connectedReducer[m] = rd;
      } else {
        connectedReducer[m] = rd;
      }

      var connectDesc = connect[m];

      if (connectDesc) {
        var moduleState = getState$4(m);

        if (connectDesc === '-') {
          // auto watch
          __$$autoWatch = true;
          __$$curConnWaKeys[m] = {};
          __$$compareConnWaKeys[m] = {};
          __$$compareConnWaKeyCount[m] = 0;
          __$$nextCompareConnWaKeys[m] = {};
          __$$nextCompareConnWaKeyCount[m] = 0;
          if (m === MODULE_GLOBAL) moduleState = ctx.globalState;else moduleState = makeObState(ref, moduleState, m);
        } else {
          // 非自动收集，这里就需要写入waKey2uKeyMap来记录依赖关系了
          recordDep(ccUniqueKey, m, connectDesc);
        }

        connectedState[m] = moduleState;
      }
    });
    ctx.reducer = _caller;
    ctx.globalReducer = connectedReducer[MODULE_GLOBAL]; // alias

    ctx.mr = ctx.moduleReducer;
    ctx.gr = ctx.globalReducer;
    ctx.cr = ctx.connectedReducer;
    ctx.r = ctx.reducer;

    if (watchedKeys === '-') {
      __$$autoWatch = true;
    } else {
      // 开始记录依赖
      recordDep(ccUniqueKey, stateModule, watchedKeys);
    }

    ctx.__$$autoWatch = __$$autoWatch;
  }
  /**
   * 构建refCtx，附加到ref上
   * liteLevel 越小，绑定的方法越少
   */


  function buildRefCtx (ref, params, liteLevel) {
    if (liteLevel === void 0) {
      liteLevel = 5;
    }

    // 能省赋默认值的就省，比如state，外层调用都保证赋值过了
    var _params$ccKey = params.ccKey,
        ccKey = _params$ccKey === void 0 ? '' : _params$ccKey,
        state = params.state,
        id = params.id,
        _params$ccOption = params.ccOption,
        ccOption = _params$ccOption === void 0 ? {} : _params$ccOption,
        module = params.module,
        ccClassKey = params.ccClassKey,
        type = params.type,
        insType = params.insType,
        _params$tag = params.tag,
        tag = _params$tag === void 0 ? '' : _params$tag,
        _params$storedKeys = params.storedKeys,
        storedKeys = _params$storedKeys === void 0 ? [] : _params$storedKeys,
        _params$persistStored = params.persistStoredKeys,
        persistStoredKeys = _params$persistStored === void 0 ? false : _params$persistStored,
        _params$watchedKeys = params.watchedKeys,
        watchedKeys = _params$watchedKeys === void 0 ? '-' : _params$watchedKeys,
        _params$connect = params.connect,
        connect = _params$connect === void 0 ? {} : _params$connect,
        _params$staticExtra = params.staticExtra,
        staticExtra = _params$staticExtra === void 0 ? {} : _params$staticExtra;
    var stateModule = module;
    var existedCtx = ref.ctx;
    var isCtxNull = isObjectNull$2(existedCtx); // 做个保护判断，防止 ctx = {}

    var modStateKeys = getModuleStateKeys$3(stateModule);
    var __boundSetState = ref.setState,
        __boundForceUpdate = ref.forceUpdate; // 如果已存在ctx，则直接指向原来的__bound，否则会造成无限递归调用栈溢出
    // 做个保护判断，防止 ctx = {}
    // const act = runtimeHandler.act;// for react-test-utils

    if (!isCtxNull && existedCtx.ccUniqueKey) {
      __boundSetState = existedCtx.__boundSetState;
      __boundForceUpdate = existedCtx.__boundForceUpdate;
    } else if (type !== CC_HOOK) {
      __boundSetState = ref.setState.bind(ref);
      __boundForceUpdate = ref.forceUpdate.bind(ref);
    }

    var refOption = {};
    refOption.persistStoredKeys = ccOption.persistStoredKeys === undefined ? persistStoredKeys : ccOption.persistStoredKeys;
    refOption.tag = ccOption.tag || tag; // pick ccOption tag first, register tag second

    var ccUniqueKey = computeCcUniqueKey(ccClassKey, ccKey, refOption.tag); // 没有设定renderKey的话读id，最后才默认renderKey为ccUniqueKey

    var tmpRenderKey = ccOption.renderKey || id;
    refOption.renderKey = tmpRenderKey !== undefined ? tmpRenderKey : ccUniqueKey;
    refOption.storedKeys = getStoredKeys(stateModule, state, ccOption.storedKeys, storedKeys); // 用户使用ccKey属性的话，必需显示的指定ccClassKey

    if (ccKey && !ccClassKey) {
      throw new Error("missing ccClassKey while init a cc ins with ccKey[" + ccKey + "]");
    }

    if (refOption.storedKeys.length > 0) {
      if (!ccKey) throw me$1(ERR.CC_STORED_KEYS_NEED_CCKEY, vbi$3("ccClassKey[" + ccClassKey + "]"));
    }

    var mstate = getState$4(module); // recover ref state

    var refStoredState = refStore$1._state[ccUniqueKey] || {};
    var mergedState = Object.assign({}, state, refStoredState, mstate);
    ref.state = mergedState;
    var stateKeys = okeys$a(mergedState);
    var connectedModules = okeys$a(connect);
    var connectedComputed = {};
    connectedModules.forEach(function (m) {
      connectedComputed[m] = makeCuRefObContainer(ref, m, false);
    });
    var moduleComputed = makeCuRefObContainer(ref, module); // 所有实例都自动连接上了global模块，这里可直接取connectedComputed已做好的结果

    var globalComputed = connectedComputed[MODULE_GLOBAL];
    var globalState = makeObState(ref, getState$4(MODULE_GLOBAL), MODULE_GLOBAL, false); // extract privStateKeys

    var privStateKeys = removeArrElements(okeys$a(state), modStateKeys);
    var moduleState = module === MODULE_GLOBAL ? globalState : makeObState(ref, mstate, module, true); // declare cc state series api

    var changeState = function changeState(state, options) {
      startChangeRefState(state, options, ref);
    };

    var _setState = function _setState(module, state, calledBy, reactCallback, renderKey, delay$$1) {
      var options = {
        calledBy: calledBy,
        module: module,
        reactCallback: reactCallback
      };
      if (isObject(renderKey)) Object.assign(options, renderKey); // 丢弃delay，renderKeyAsOpt里的delay
      else Object.assign(options, {
          renderKey: renderKey,
          delay: delay$$1
        });
      changeState(state, options);
    };

    var setModuleState = function setModuleState(module, state, reactCallback, renderKey, delay$$1) {
      _setState(module, state, SET_MODULE_STATE, reactCallback, renderKey, delay$$1);
    };

    var setState = function setState(p1, p2, p3, p4, p5) {
      var p1Type = typeof p1;

      if (p1Type === 'string') {
        // p1: module, p2: state, p3: cb, p4: rkey, p5: delay
        setModuleState(p1, p2, p3, p4, p5);
      } else if (p1Type === 'function') {
        // p1: stateFn, p2: rkey, p3: delay
        var newState = p1(Object.assign({}, ctx.unProxyState), ctx.props);

        _setState(stateModule, newState, SET_STATE, p2, p3, p4);
      } else {
        // p1: state, p2: cb, p3: rkey, p4: delay
        _setState(stateModule, p1, SET_STATE, p2, p3, p4);
      }
    };

    var forceUpdate = function forceUpdate(reactCallback, renderKey, delay$$1) {
      _setState(stateModule, ref.unProxyState, FORCE_UPDATE, reactCallback, renderKey, delay$$1);
    };

    var refs = {};
    var allModules = connectedModules.slice(); // 已在change-ref-state里做优化，支持组件即属于又连接同一个模块，不会照成冗余渲染，
    // 所以此处allModules包含了module对渲染性能无影响，不过代码的语义上会照成重复的表达

    noDupPush$1(allModules, module);
    var props = getOutProps(ref.props);
    var now = Date.now();
    var ctx = {
      // static params
      type: type,
      insType: insType,
      module: module,
      ccClassKey: ccClassKey,
      ccKey: ccKey,
      ccUniqueKey: ccUniqueKey,
      renderCount: 0,
      initTime: now,
      watchedKeys: watchedKeys,
      privStateKeys: privStateKeys,
      connect: connect,
      connectedModules: connectedModules,
      allModules: allModules,
      // dynamic meta, I don't want user know these props, so let field name start with __$$
      __$$onEvents: [],
      // 当组件还未挂载时，将事件存到__$$onEvents里，当组件挂载时才开始真正监听事件
      __$$hasModuleState: modStateKeys.length > 0,
      __$$renderStatus: UNSTART,
      __$$curWaKeys: {},
      __$$compareWaKeys: {},
      __$$compareWaKeyCount: 0,
      // write before render
      __$$nextCompareWaKeys: {},
      __$$nextCompareWaKeyCount: 0,
      __$$curConnWaKeys: {},
      __$$compareConnWaKeys: {},
      __$$compareConnWaKeyCount: {},
      __$$nextCompareConnWaKeys: {},
      __$$nextCompareConnWaKeyCount: {},
      __$$staticWaKeys: {},
      // 用于快速的去重记录
      __$$staticWaKeyList: [],
      // 在实例didMount时由__$$staticWaKeys计算得出，用于辅助清理依赖映射
      persistStoredKeys: refOption.persistStoredKeys,
      storedKeys: refOption.storedKeys,
      renderKey: refOption.renderKey,
      tag: refOption.tag,
      prevProps: props,
      props: props,
      // collected mapProps result
      mapped: {},
      prevState: Object.assign({}, mergedState),
      // state
      state: makeObState(ref, mergedState, stateModule, true),
      unProxyState: mergedState,
      // 没有proxy化的state
      moduleState: moduleState,
      // 用于before-render里避免merge moduleState而导致的冗余触发get，此属性不暴露给用户使用，因其不具备依赖收集能力
      __$$mstate: mstate,
      globalState: globalState,
      connectedState: {},
      // for function: pass value to extra in every render period
      // for class: pass value to extra one time
      extra: isObject$1(params.extra) ? params.extra : {},
      // pass value to staticExtra only one time for both function and class
      staticExtra: staticExtra,
      settings: {},

      /** @type ICtx['refComputedValues'] */
      refComputedValues: {},

      /** @type ICtx['refComputedRawValues'] */
      refComputedRawValues: {},
      moduleComputed: moduleComputed,
      globalComputed: globalComputed,
      connectedComputed: connectedComputed,
      moduleReducer: null,
      mrc: null,
      // 仅生成描述体，moduleReducerCaller

      /** ghost reducer map */
      mrg: {},
      globalReducer: null,
      connectedReducer: {},
      reducer: {},
      // api meta data
      stateKeys: stateKeys,

      /** @type ICtx['computedDep'] */
      computedDep: {},
      computedRetKeyFns: {},

      /** @type ICtx['watchDep'] */
      watchDep: {},
      watchRetKeyFns: {},
      // 不按模块分类，映射的 watchRetKey2fns
      execute: null,
      retKey2fnUid: {},
      // api
      reactSetState: noop$1,
      // 等待重写
      __boundSetState: __boundSetState,
      reactForceUpdate: noop$1,
      // 等待重写
      __boundForceUpdate: __boundForceUpdate,
      setState: setState,
      setModuleState: setModuleState,
      forceUpdate: forceUpdate,
      changeState: changeState,
      // not expose in d.ts
      refs: refs,
      getRef: function getRef(refName) {
        return refs[refName] || null;
      },
      useRef: function useRef(refName) {
        return function (nodeRef) {
          // keep the same shape with hook useRef
          refs[refName] = {
            current: nodeRef
          };
        };
      },
      // below methods only can be called by cc or updated by cc in existed period, not expose in d.ts
      __$$ccSetState: makeCcSetStateHandler(ref),
      __$$ccForceUpdate: makeCcForceUpdateHandler(ref),
      __$$settedList: [],
      // [{module:string, keys:string[]}, ...]
      __$$prevMoStateVer: {},
      __$$prevModuleVer: getModuleVer$2(stateModule),
      __$$cuOrWaCalled: false
    };
    bindCtxToRef(isCtxNull, ref, ctx);
    ctx.refComputed = makeCuRefObContainer(ref, null, true, true);
    ref.setState = setState;
    ref.forceUpdate = forceUpdate;
    bindInitStateHandler(ref, ctx, state, refStoredState, mstate, modStateKeys);
    var dispatch = bindModApis(ref, ctx, stateModule, liteLevel, _setState);
    bindSyncApis(ref, ctx, liteLevel);
    bindEventApis(ctx, liteLevel, ccUniqueKey);
    bindEnhanceApis(ctx, liteLevel, stateModule);
    fillCtxOtherAttrs(ref, ctx, connect, watchedKeys, ccUniqueKey, stateModule, allModules, dispatch); // 始终优先取ref上指向的ctx，对于在热加载模式下的hook组件实例，那里面有的最近一次渲染收集的依赖信息才是正确的

    ctx.getWatchedKeys = function () {
      return getWatchedKeys(ref.ctx || ctx);
    };

    ctx.getConnectWatchedKeys = function (moduleName) {
      return getConnectWatchedKeys(ref.ctx || ctx, moduleName);
    };
  }

  var okeys$b = okeys;
  /**
   * 根据connect,watchedKeys,以及用户提供的原始renderKeyClasses 计算 特征值
   */

  function getFeatureStr (belongModule, connectSpec, renderKeyClasses) {
    var moduleNames = okeys$b(connectSpec);
    moduleNames.sort();
    var classesStr;
    if (renderKeyClasses === '*') classesStr = '*';else classesStr = renderKeyClasses.slice().join(',');
    return belongModule + "/" + moduleNames.join(',') + "/" + classesStr;
  }

  var isObjectNull$3 = isObjectNull,
      me$2 = makeError;
  var featureStr2classKey = ccContext.featureStr2classKey,
      userClassKey2featureStr = ccContext.userClassKey2featureStr,
      ccClassKey2Context$1 = ccContext.ccClassKey2Context;
  var cursor = 0;
  function getCcClassKey (allowNamingDispatcher, module, connect, prefix, featureStr, classKey) {
    if (classKey === void 0) {
      classKey = '';
    }

    // 未指定classKey
    if (!classKey) {
      // 未指定所属模块，也未连接到其他模块
      if (module === MODULE_DEFAULT && isObjectNull$3(connect)) {
        return prefix + "0";
      }

      var prefixedFeatureStr = prefix + ":" + featureStr;
      var _classKey = featureStr2classKey[prefixedFeatureStr];

      if (_classKey) {
        return _classKey;
      }

      cursor++;
      _classKey = "" + prefix + cursor;
      featureStr2classKey[prefixedFeatureStr] = _classKey;
      return _classKey;
    } // verify user input classKey


    if (classKey.startsWith(CC_PREFIX)) {
      throw new Error("user can not specify a classKey[" + classKey + "] starts with $$Cc");
    }

    if (!allowNamingDispatcher) {
      if (classKey.toLowerCase() === CC_DISPATCHER.toLowerCase()) {
        // throw new Error(`${CC_DISPATCHER} is cc built-in ccClassKey name, if you want to customize your dispatcher, 
        // you can set autoCreateDispatcher=false in StartupOption, and use createDispatcher then.`)
        // currently createDispatcher is not allowed..
        throw new Error(CC_DISPATCHER + " is cc built-in ccClassKey name.");
      }
    }

    var clsCtx = ccClassKey2Context$1[classKey];

    if (clsCtx) {
      var fStr = userClassKey2featureStr[classKey];

      if (fStr !== featureStr) {
        // 不允许，特征值不一样的class指定相同的ccClassKey
        throw me$2(ERR.CC_CLASS_KEY_DUPLICATE, "ccClassKey:[" + classKey + "] duplicate");
      }
    } else {
      userClassKey2featureStr[classKey] = featureStr;
    }

    return classKey;
  }

  function getRenderKeyClasses(ccClassKey, regRenderKeyClasses) {
    var _renderKeyClasses;

    if (!regRenderKeyClasses) {
      _renderKeyClasses = [ccClassKey];
    } else {
      if (!Array.isArray(regRenderKeyClasses) && regRenderKeyClasses !== '*') {
        throw new Error("renderKeyClasses type err, it " + STR_ARR_OR_STAR);
      }

      _renderKeyClasses = regRenderKeyClasses;
    }

    return _renderKeyClasses;
  }

  var ccClassKey2Context$2 = ccContext.ccClassKey2Context;

  function checkCcStartupOrNot() {
    if (ccContext.isStartup !== true) {
      throw new Error('you must call run api to startup concent before register Class!');
    }
  }
  /**
   * map registration info to ccContext
   */


  function mapRegistrationInfo (module, ccClassKey, regRenderKeyClasses, classKeyPrefix, regWatchedKeys, regConnect, __checkStartUp, __calledBy) {
    if (module === void 0) {
      module = MODULE_DEFAULT;
    }

    if (__checkStartUp === true) checkCcStartupOrNot();
    var allowNamingDispatcher = __calledBy === 'cc';
    var renderKeyClasses = regRenderKeyClasses || [];
    checkModuleName(module, false, "module[" + module + "] not configured");
    checkRenderKeyClasses(renderKeyClasses);

    var _connect = getConnect(regConnect);

    var _watchedKeys = getWatchedStateKeys(module, ccClassKey, regWatchedKeys); // 注意此处用户不指定renderKeyClasses时，算出来的特征值和renderKeyClasses无关


    var featureStr = getFeatureStr(module, _connect, renderKeyClasses);

    var _ccClassKey = getCcClassKey(allowNamingDispatcher, module, _connect, classKeyPrefix, featureStr, ccClassKey); // 此处再次获得真正的renderKeyClasses


    var _renderKeyClasses = getRenderKeyClasses(_ccClassKey, regRenderKeyClasses);

    var ccClassContext = ccClassKey2Context$2[_ccClassKey]; //做一个判断，有可能是热加载调用

    if (!ccClassContext) {
      ccClassContext = makeCcClassContext(module, _ccClassKey, _renderKeyClasses);
      ccClassKey2Context$2[_ccClassKey] = ccClassContext;
    }

    return {
      _module: module,
      _connect: _connect,
      _ccClassKey: _ccClassKey,
      _watchedKeys: _watchedKeys
    };
  }

  function createDispatcher () {
    var ccClassKey = CC_DISPATCHER;
    mapRegistrationInfo(MODULE_DEFAULT, ccClassKey, '', CC_CLASS, [], [], false, 'cc');
    var mockRef = {
      setState: noop,
      forceUpdate: noop
    };
    buildRefCtx(mockRef, {
      module: MODULE_DEFAULT,
      ccClassKey: ccClassKey,
      state: {}
    });
    ccContext.permanentDispatcher = mockRef;
  }

  var isPJO$6 = isPJO,
      okeys$c = okeys,
      isObject$2 = isObject;

  function checkObj(rootObj, tag) {
    if (!isPJO$6(rootObj)) {
      throw new Error(tag + " " + INAJ);
    }
  }

  function configStoreState(storeState) {
    checkObj(storeState, 'state');
    delete storeState[MODULE_VOID];
    delete storeState[MODULE_CC];
    if (!isObject$2(storeState[MODULE_GLOBAL])) storeState[MODULE_GLOBAL] = {};
    if (!isObject$2(storeState[MODULE_DEFAULT])) storeState[MODULE_DEFAULT] = {};
    var moduleNames = okeys$c(storeState);
    var len = moduleNames.length;

    for (var i = 0; i < len; i++) {
      var moduleName = moduleNames[i];
      var moduleState = storeState[moduleName];
      initModuleState(moduleName, moduleState);
    }
  }
  /**
   * @param {{[moduleName:string]:{[reducerFnType:string]:function}}} rootReducer 
   */

  function configRootReducer(rootReducer, rootGhost) {
    checkObj(rootReducer, 'reducer');
    if (!isObject$2(rootReducer[MODULE_DEFAULT])) rootReducer[MODULE_DEFAULT] = {};
    if (!isObject$2(rootReducer[MODULE_GLOBAL])) rootReducer[MODULE_GLOBAL] = {};
    okeys$c(rootReducer).forEach(function (m) {
      return initModuleReducer(m, rootReducer[m], rootGhost[m]);
    });
  }
  function configRootComputed(rootComputed) {
    checkObj(rootComputed, 'computed');
    okeys$c(rootComputed).forEach(function (m) {
      return initModuleComputed(m, rootComputed[m]);
    });
  }
  function configRootWatch(rootWatch) {
    checkObj(rootWatch, 'watch');
    okeys$c(rootWatch).forEach(function (m) {
      return initModuleWatch(m, rootWatch[m]);
    });
  }
  function configRootLifecycle(rootLifecycle) {
    checkObj(rootLifecycle, 'lifecycle');
    okeys$c(rootLifecycle).forEach(function (m) {
      return initModuleLifecycle(m, rootLifecycle[m]);
    });
  }
  function configMiddlewares(middlewares) {
    if (middlewares.length > 0) {
      var ccMiddlewares = ccContext.middlewares;
      ccMiddlewares.length = 0; // 防止热加载重复多次载入middlewares

      middlewares.forEach(function (m) {
        return ccMiddlewares.push(m);
      });
    }
  }
  function configPlugins(plugins) {
    if (plugins.length > 0) {
      var ccPlugins = ccContext.plugins;
      ccPlugins.length = 0; // 防止热加载重复多次载入plugins

      clearCbs(); // 清理掉已映射好的插件回调

      var pluginNameMap = {};
      plugins.forEach(function (p) {
        ccPlugins.push(p);

        if (p.install) {
          var pluginInfo = p.install(on);
          var e = new Error('plugin.install must return result:{name:string, options?:object}');
          if (!pluginInfo) throw e;
          var pluginName = pluginInfo.name;
          if (!pluginName) throw e;
          if (pluginNameMap[pluginName]) throw new Error("pluginName[" + pluginName + "] duplicate");
          pluginNameMap[pluginName] = 1;
        } else {
          throw new Error('a plugin must export install handler!');
        }
      });
      ccContext.pluginNameMap = pluginNameMap;
    }
  }

  /* eslint-disable camelcase */
  var justWarning$6 = justWarning,
      me$3 = makeError,
      vbi$4 = verboseInfo,
      ss = styleStr,
      cl = color,
      logNormal$1 = logNormal;
  var runtimeVar$3 = ccContext.runtimeVar,
      ccUKey2ref$2 = ccContext.ccUKey2ref;
  var ccUKey2insCount = {};

  function setCcInstanceRef(ccUniqueKey, ref, delayMs) {
    var setRef = function setRef() {
      ccUKey2ref$2[ccUniqueKey] = ref;
    };

    if (ccContext.isHotReloadMode()) incCcKeyInsCount(ccUniqueKey);

    if (delayMs) {
      setTimeout(setRef, delayMs);
    } else {
      setRef();
    }
  }

  function incCcKeyInsCount(ccUniqueKey) {
    safeAdd(ccUKey2insCount, ccUniqueKey, 1);
  }
  function decCcKeyInsCount(ccUniqueKey) {
    safeMinus(ccUKey2insCount, ccUniqueKey, 1);
  }
  function getCcKeyInsCount(ccUniqueKey) {
    return ccUKey2insCount[ccUniqueKey] || 0;
  }
  function clearCount() {
    ccUKey2insCount = {};
  }
  function setRef (ref) {
    var _ref$ctx = ref.ctx,
        ccClassKey = _ref$ctx.ccClassKey,
        ccKey = _ref$ctx.ccKey,
        ccUniqueKey = _ref$ctx.ccUniqueKey;

    if (runtimeVar$3.isDebug) {
      logNormal$1(ss("register ccKey " + ccUniqueKey + " to CC_CONTEXT"), cl());
    }

    var isHot = ccContext.isHotReloadMode();

    if (ccUKey2ref$2[ccUniqueKey]) {
      var dupErr = function dupErr() {
        throw me$3(ERR.CC_CLASS_INSTANCE_KEY_DUPLICATE, vbi$4("ccClass:" + ccClassKey + ",ccKey:" + ccKey));
      };

      if (isHot) {
        // get existed ins count
        var insCount = getCcKeyInsCount(ccUniqueKey);

        if (insCount > 1) {
          // now cc can make sure the ccKey duplicate
          dupErr();
        } // just warning


        justWarning$6("\n        found ccKey[" + ccKey + "] duplicated in hot reload mode, please make sure your ccKey is unique manually,\n        " + vbi$4("ccClassKey:" + ccClassKey + " ccKey:" + ccKey + " ccUniqueKey:" + ccUniqueKey) + "\n      "); // in webpack hot reload mode, cc works not very well,
        // cc can't set ref immediately, because the ccInstance of ccKey will ummount right now in unmount func, 
        // cc call unsetCcInstanceRef will lost the right ref in CC_CONTEXT.refs
        // so cc set ref later

        setCcInstanceRef(ccUniqueKey, ref, 600);
      } else {
        dupErr();
      }
    } else {
      setCcInstanceRef(ccUniqueKey, ref);
    }
  }

  /* eslint-disable camelcase */
  var justCalledByStartUp = false;

  function _clearInsAssociation(recomputed, otherExcludeKeys) {
    if (recomputed === void 0) {
      recomputed = false;
    }

    clearCuRefer();
    clearCount();
    clearObject(ccContext.event2handlers);
    clearObject(ccContext.ccUKey2handlerKeys);
    var ccUKey2ref = ccContext.ccUKey2ref;
    clearObject(ccContext.handlerKey2handler);
    clearObject(ccUKey2ref, otherExcludeKeys); // 此处故意设置和原来的版本相差几位的数字，
    // 防止resetClassInsUI调用时类组件实例的版本和模块是相同的
    // 导致ui更新未同步到store最新数据

    var _ccContext$store = ccContext.store,
        getModuleVer = _ccContext$store.getModuleVer,
        incModuleVer = _ccContext$store.incModuleVer,
        replaceMV = _ccContext$store.replaceMV;
    var moduleVer = getModuleVer();
    okeys(moduleVer).forEach(function (m) {
      var curVer = moduleVer[m];
      incModuleVer(m, curVer > 5 ? 1 : 6);
    }); // 用于还原_moduleVer，在resetClassInsUI回调里_moduleVer又变为了 所有的模块版本值为1的奇怪现象.
    // 全局有没有找到重置_moduleVer的地方.

    var lockedMV = JSON.parse(JSON.stringify(moduleVer));

    if (recomputed) {
      var computed = ccContext.computed,
          watch = ccContext.watch;
      var computedValue = computed._computedValues;
      var watchDep = watch._watchDep;
      var modules = okeys(ccContext.store._state);
      modules.forEach(function (m) {
        if (m === MODULE_CC) return;

        if (computedValue[m]) {
          // !!!先清除之前建立好的依赖关系
          ccContext.computed._computedDep[m] = makeCuDepDesc();
          initModuleComputed(m, computed._computedRaw[m]);
        }

        if (watchDep[m]) {
          // !!!先清除之前建立好的依赖关系
          watchDep[m] = makeCuDepDesc();
          initModuleWatch(m, watch._watchRaw[m]);
        }
      });
    } // resetClassInsUI


    return function () {
      // 安排在下一个循环自我刷新
      setTimeout(function () {
        replaceMV(lockedMV);
        otherExcludeKeys.forEach(function (key) {
          var ref = ccUKey2ref[key];
          ref && ref.ctx.reactForceUpdate();
        });
      }, 0);
    };
  }

  function _pickNonCustomizeIns() {
    var ccUKey2ref = ccContext.ccUKey2ref;
    var ccFragKeys = [];
    var ccClassInsKeys = [];
    okeys(ccUKey2ref).forEach(function (refKey) {
      var ref = ccUKey2ref[refKey];

      if (ref && ref.__$$ms === MOUNTED) {
        var type = ref.ctx.type;
        if (type === CC_CLASS) ccClassInsKeys.push(refKey);
      }
    });
    return {
      ccFragKeys: ccFragKeys,
      ccClassInsKeys: ccClassInsKeys
    };
  }

  function _clearAll() {
    clearObject(ccContext.globalStateKeys); // 在codesandbox里，按标准模式组织的代码，如果只是修改了runConcent里相关联的代码，pages目录下的configure调用不会被再次触发的
    // 所以是来自configure调用配置的模块则不参与清理，防止报错

    var toExcludedModules = okeys(ccContext.moduleName2isConfigured).concat([MODULE_DEFAULT, MODULE_CC, MODULE_GLOBAL, MODULE_CC_ROUTER]);
    clearObject(ccContext.reducer._reducer, toExcludedModules);
    clearObject(ccContext.store._state, toExcludedModules, {}, true);
    clearObject(ccContext.computed._computedDep, toExcludedModules);
    clearObject(ccContext.computed._computedValues, toExcludedModules);
    clearObject(ccContext.watch._watchDep, toExcludedModules);
    clearObject(ccContext.middlewares); // class组件实例的依赖要保留，因为它的ref不再被清除（不像function组件那样能在热重载期间能够再次触发unmount和mount）

    var waKey2uKeyMap = ccContext.waKey2uKeyMap;
    okeys(waKey2uKeyMap).forEach(function (waKey) {
      var uKeyMap = waKey2uKeyMap[waKey];
      var newUKeyMap = {};
      okeys(uKeyMap).forEach(function (uKey) {
        if (uKey.startsWith(CC_CLASS)) {
          newUKeyMap[uKey] = uKeyMap[uKey];
        }
      });
      waKey2uKeyMap[waKey] = newUKeyMap;
    });
    clearObject(ccContext.lifecycle._mountedOnce);
    clearObject(ccContext.lifecycle._willUnmountOnce);
    clearObject(ccContext.module2insCount, [], 0);
    clearCachedData();

    var _pickNonCustomizeIns2 = _pickNonCustomizeIns(),
        ccClassInsKeys = _pickNonCustomizeIns2.ccClassInsKeys;

    return _clearInsAssociation(false, ccClassInsKeys);
  }

  function clearContextIfHot (clearAll) {
    if (clearAll === void 0) {
      clearAll = false;
    }

    ccContext.info.latestStartupTime = Date.now(); // 热加载模式下，这些CcFragIns随后需要被恢复
    // let ccFragKeys = [];

    if (ccContext.isStartup) {
      if (ccContext.isHotReloadMode()) {
        if (clearAll) {
          if (ccContext.runtimeVar.log) console.warn("attention: make sure [[clearContextIfHot]] been called before app rendered!");
          justCalledByStartUp = true;
          return _clearAll(); // return ccFragKeys;
        } else {
          // 如果刚刚被startup调用，则随后的调用只是把justCalledByStartUp标记为false
          // 因为在stackblitz的 hot reload 模式下，当用户将启动cc的命令单独放置在一个脚本里，
          // 如果用户修改了启动相关文件, 则会触发 runConcent renderApp，
          // runConcent调用清理把justCalledByStartUp置为true，则renderApp这里再次触发clear时就可以不用执行了(注意确保renderApp之前，调用了clearContextIfHot)
          // 而随后只是改了某个component文件时，则只会触发 renderApp，
          // 因为之前已把justCalledByStartUp置为false，则有机会清理实例相关上下文了
          if (justCalledByStartUp) {
            justCalledByStartUp = false;
            return noop;
          }

          var ret = _pickNonCustomizeIns(); // !!!重计算各个模块的computed结果


          return _clearInsAssociation(ccContext.reComputed, ret.ccClassInsKeys);
        }
      } else {
        console.warn("clear failed because of not running under hot reload mode!");
        return noop;
      }
    } else {
      // 还没有启动过，泽只是标记justCalledByStartUp为true
      justCalledByStartUp = true;
      return noop;
    }
  }

  var justTip$1 = justTip,
      getErrStackKeywordLoc$1 = getErrStackKeywordLoc;
  var cachedLocation = '';

  function checkStartup(err) {
    var info = ccContext.info;
    var curLocation = getErrStackKeywordLoc$1(err, 'startup', 2); // 向下2句找触发run的文件

    if (!curLocation) curLocation = getErrStackKeywordLoc$1(err, 'runConcent', 0);

    var letRunOk = function letRunOk() {
      ccContext.isHot = true;
      return clearContextIfHot(true);
    };

    var now = Date.now();

    var resetClassInsUI = function resetClassInsUI() {},
        canStartup = true;

    if (!cachedLocation) {
      cachedLocation = curLocation;
      info.firstStartupTime = now;
      info.latestStartupTime = now;
    } else if (cachedLocation !== curLocation) {
      var tip = "run can only been called one time, try refresh browser to avoid this error";

      if (now - info.latestStartupTime < 1000) {
        throw new Error(tip);
      }

      if (isOnlineEditor()) {
        resetClassInsUI = letRunOk();
        cachedLocation = curLocation;
      } else {
        strictWarning(tip);
        canStartup = false;
      }
    } else {
      resetClassInsUI = letRunOk();
    }

    return {
      canStartup: canStartup,
      resetClassInsUI: resetClassInsUI
    };
  }

  function startup (_temp, _temp2) {
    var _ref = _temp === void 0 ? {} : _temp,
        _ref$store = _ref.store,
        store = _ref$store === void 0 ? {} : _ref$store,
        _ref$reducer = _ref.reducer,
        reducer = _ref$reducer === void 0 ? {} : _ref$reducer,
        _ref$ghost = _ref.ghost,
        ghost = _ref$ghost === void 0 ? {} : _ref$ghost,
        _ref$computed = _ref.computed,
        computed = _ref$computed === void 0 ? {} : _ref$computed,
        _ref$watch = _ref.watch,
        watch = _ref$watch === void 0 ? {} : _ref$watch,
        _ref$lifecycle = _ref.lifecycle,
        lifecycle = _ref$lifecycle === void 0 ? {} : _ref$lifecycle;

    var _ref2 = _temp2 === void 0 ? {} : _temp2,
        _ref2$plugins = _ref2.plugins,
        plugins = _ref2$plugins === void 0 ? [] : _ref2$plugins,
        _ref2$middlewares = _ref2.middlewares,
        middlewares = _ref2$middlewares === void 0 ? [] : _ref2$middlewares,
        _ref2$isStrict = _ref2.isStrict,
        isStrict = _ref2$isStrict === void 0 ? false : _ref2$isStrict,
        _ref2$isDebug = _ref2.isDebug,
        isDebug = _ref2$isDebug === void 0 ? false : _ref2$isDebug,
        _ref2$log = _ref2.log,
        log = _ref2$log === void 0 ? true : _ref2$log,
        _ref2$logVersion = _ref2.logVersion,
        logVersion = _ref2$logVersion === void 0 ? true : _ref2$logVersion,
        _ref2$errorHandler = _ref2.errorHandler,
        errorHandler = _ref2$errorHandler === void 0 ? null : _ref2$errorHandler,
        _ref2$warningHandler = _ref2.warningHandler,
        warningHandler = _ref2$warningHandler === void 0 ? null : _ref2$warningHandler,
        _ref2$unsafe_moveRedu = _ref2.unsafe_moveReducerErrToErrorHandler,
        unsafe_moveReducerErrToErrorHandler = _ref2$unsafe_moveRedu === void 0 ? false : _ref2$unsafe_moveRedu,
        isHot = _ref2.isHot,
        _ref2$alwaysRenderCal = _ref2.alwaysRenderCaller,
        alwaysRenderCaller = _ref2$alwaysRenderCal === void 0 ? true : _ref2$alwaysRenderCal,
        _ref2$bindCtxToMethod = _ref2.bindCtxToMethod,
        bindCtxToMethod = _ref2$bindCtxToMethod === void 0 ? false : _ref2$bindCtxToMethod,
        _ref2$computedCompare = _ref2.computedCompare,
        computedCompare = _ref2$computedCompare === void 0 ? false : _ref2$computedCompare,
        _ref2$watchCompare = _ref2.watchCompare,
        watchCompare = _ref2$watchCompare === void 0 ? false : _ref2$watchCompare,
        _ref2$watchImmediate = _ref2.watchImmediate,
        watchImmediate = _ref2$watchImmediate === void 0 ? false : _ref2$watchImmediate,
        _ref2$reComputed = _ref2.reComputed,
        reComputed = _ref2$reComputed === void 0 ? true : _ref2$reComputed,
        _ref2$extractModuleCh = _ref2.extractModuleChangedState,
        extractModuleChangedState = _ref2$extractModuleCh === void 0 ? true : _ref2$extractModuleCh,
        _ref2$extractRefChang = _ref2.extractRefChangedState,
        extractRefChangedState = _ref2$extractRefChang === void 0 ? false : _ref2$extractRefChang,
        _ref2$objectValueComp = _ref2.objectValueCompare,
        objectValueCompare = _ref2$objectValueComp === void 0 ? false : _ref2$objectValueComp,
        _ref2$nonObjectValueC = _ref2.nonObjectValueCompare,
        nonObjectValueCompare = _ref2$nonObjectValueC === void 0 ? true : _ref2$nonObjectValueC,
        _ref2$localStorage = _ref2.localStorage,
        localStorage = _ref2$localStorage === void 0 ? null : _ref2$localStorage,
        _ref2$act = _ref2.act,
        act = _ref2$act === void 0 ? null : _ref2$act,
        _ref2$asyncCuKeys = _ref2.asyncCuKeys,
        asyncCuKeys = _ref2$asyncCuKeys === void 0 ? null : _ref2$asyncCuKeys;

    try {
      throw new Error();
    } catch (err) {
      var _checkStartup = checkStartup(err),
          canStartup = _checkStartup.canStartup,
          resetClassInsUI = _checkStartup.resetClassInsUI;

      if (!canStartup) {
        return;
      }

      try {
        var rv = ccContext.runtimeVar;
        var rh = ccContext.runtimeHandler;
        rv.log = log;
        if (logVersion) justTip$1("concent version " + ccContext.info.version);
        if (isHot !== undefined) ccContext.isHot = isHot;
        ccContext.reComputed = reComputed;
        rh.errorHandler = errorHandler;
        rh.warningHandler = warningHandler;
        rh.act = act;
        rv.asyncCuKeys = asyncCuKeys || [];
        rv.alwaysRenderCaller = alwaysRenderCaller;
        rv.isStrict = isStrict;
        rv.isDebug = isDebug;
        rv.unsafe_moveReducerErrToErrorHandler = unsafe_moveReducerErrToErrorHandler;
        rv.computedCompare = computedCompare;
        rv.watchCompare = watchCompare;
        rv.watchImmediate = watchImmediate;
        rv.extractModuleChangedState = extractModuleChangedState;
        rv.extractRefChangedState = extractRefChangedState;
        rv.objectValueCompare = objectValueCompare;
        rv.nonObjectValueCompare = nonObjectValueCompare;
        rv.bindCtxToMethod = bindCtxToMethod;

        if (localStorage) {
          ccContext.localStorage = localStorage;
        } else if (window && window.localStorage) {
          ccContext.localStorage = window.localStorage;
        }

        ccContext.recoverRefState();
        createDispatcher();
        configStoreState(store);
        configRootReducer(reducer, ghost);
        configRootComputed(computed);
        configRootWatch(watch);
        configRootLifecycle(lifecycle);
        configMiddlewares(middlewares);
        ccContext.isStartup = true; // 置为已启动后，才开始配置plugins，因为plugins需要注册自己的模块，而注册模块又必需是启动后才能注册

        configPlugins(plugins);
        resetClassInsUI();
      } catch (err) {
        ccContext.runtimeHandler.tryHandleError(err);
      }
    }
  }

  /** @typedef {import('../types').ModuleConfig} ModuleConfig */
  var isPJO$7 = isPJO,
      okeys$d = okeys,
      evalState$2 = evalState,
      isFn$2 = isFn;

  var pError = function pError(label) {
    throw new Error("[[run]]: param error, " + label + " " + INAJ);
  };
  /**
   * run will call startup
   * @param {{ [moduleName:string]: ModuleConfig }} store
   * @param {import('../types').RunOptions} options
   */


  function _run (store, options) {
    if (store === void 0) {
      store = {};
    }

    if (options === void 0) {
      options = {};
    }

    if (!isPJO$7(store)) pError('store');
    if (!isPJO$7(options)) pError('options');
    var storeConf = {
      store: {},
      reducer: {},
      ghost: {},
      watch: {},
      computed: {},
      lifecycle: {}
    };

    var buildStoreConf = function buildStoreConf(m, moduleConf) {
      var state = moduleConf.state,
          reducer = moduleConf.reducer,
          watch = moduleConf.watch,
          computed = moduleConf.computed,
          _moduleConf$ghosts = moduleConf.ghosts,
          ghosts = _moduleConf$ghosts === void 0 ? [] : _moduleConf$ghosts;

      if (storeConf.store[m]) {
        throw new Error("run api error: module[" + m + "] duplicate");
      }

      storeConf.store[m] = evalState$2(state);
      if (isFn$2(state)) ccContext.moduleName2stateFn[m] = state;
      storeConf.reducer[m] = reducer;
      storeConf.ghost[m] = ghosts;
      storeConf.watch[m] = watch;
      storeConf.computed[m] = computed;
      storeConf.lifecycle[m] = getLifecycle(moduleConf);
    }; // traversal moduleNames


    okeys$d(store).forEach(function (m) {
      return buildStoreConf(m, store[m]);
    }); // these modules pushed by configure api before calling run

    pendingModules.forEach(function (_ref) {
      var module = _ref.module,
          config = _ref.config;
      // user put this module to run api 1th models param again, here just ignore this one
      if (storeConf.store[module]) return; // configure pending module

      buildStoreConf(module, config);
    });
    pendingModules.length = 0; // clear pending modules

    startup(storeConf, options);
  }

  function _assertThisInitialized(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return self;
  }

  function _inheritsLoose(subClass, superClass) {
    subClass.prototype = Object.create(superClass.prototype);
    subClass.prototype.constructor = subClass;
    subClass.__proto__ = superClass;
  }

  var getState$5 = ccContext.store.getState;
  /** 由首次render触发, 在beforeMount里调用 */

  function triggerComputedAndWatch (ref) {
    var ctx = ref.ctx; // 取原始对象，防止 computeValueForRef 里用 Object.assign 触发依赖收集

    var hasComputedFn = ctx.hasComputedFn,
        hasWatchFn = ctx.hasWatchFn,
        connectedModules = ctx.connectedModules,
        refModule = ctx.module,
        unProxyState = ctx.unProxyState;
    var callInfo = makeCallInfo(refModule);

    var cuOrWatch = function cuOrWatch(op) {
      op(ref, refModule, unProxyState, unProxyState, callInfo, true);
      connectedModules.forEach(function (m) {
        var mState = getState$5(m);
        var tmpCallInfo = makeCallInfo(m);
        op(ref, m, mState, mState, tmpCallInfo, true);
      });
    };

    if (hasComputedFn) cuOrWatch(computeValueForRef);
    if (hasWatchFn) cuOrWatch(watchKeyForRef);
  }

  /** @typedef {import('../../types-inner').IRef} IRef */
  var okeys$e = okeys,
      makeCuDepDesc$1 = makeCuDepDesc,
      isFn$3 = isFn;
  var runtimeVar$4 = ccContext.runtimeVar;
  /**
   * @param {IRef} ref
   * @param {Function} setup
   * @param {boolean} bindCtxToMethod
   * @param {MultiComputed | MultiComputedFn} cuDesc
   */

  function beforeMount (ref, setup, bindCtxToMethod, cuDesc) {
    var ctx = ref.ctx;
    ref.__$$ms = NOT_MOUNT; // flag ref is at before mount step

    ctx.__$$inBM = true; // 先调用setup，setup可能会定义computed,watch，同时也可能调用ctx.reducer,所以setup放在fill reducer之后

    if (setup) {
      var tip = 'type of setup';
      if (!isFn$3(setup)) throw new Error(tip + " " + INAF);
      var settingsObj = setup(ctx) || {};
      if (!isPJO(settingsObj)) throw new Error(tip + " return result " + INAJ); // 优先读自己的，再读全局的

      if (bindCtxToMethod === true || runtimeVar$4.bindCtxToMethod === true && bindCtxToMethod !== false) {
        okeys$e(settingsObj).forEach(function (name) {
          var settingValue = settingsObj[name];
          if (isFn$3(settingValue)) settingsObj[name] = settingValue.bind(ref, ctx);
        });
      }

      Object.assign(ctx.settings, settingsObj);
    } // v2.13.1+ 支持外部传入refComputed函数定义


    if (cuDesc) ctx.computed(cuDesc); // !!! 把拦截了setter getter的计算结果容器赋值给refComputed
    // 这一波必需在setup调用之后做，因为setup里会调用ctx.computed写入 computedRetKeyFns 等元数据

    ctx.refComputedValues = makeCuRetContainer(ctx.computedRetKeyFns, ctx.refComputedRawValues); // 所有的组件都会自动连接到$$global模块，但是有可能没有使用$$global模块数据做过任何实例计算
    // 这里需要补齐computedDep.$$global 和 watchDep.$$global 的依赖描述数据
    // 防止后续逻辑里出错

    var computedDep = ctx.computedDep,
        watchDep = ctx.watchDep;

    if (!computedDep[MODULE_GLOBAL]) {
      computedDep[MODULE_GLOBAL] = makeCuDepDesc$1();
    }

    if (!watchDep[MODULE_GLOBAL]) {
      watchDep[MODULE_GLOBAL] = makeCuDepDesc$1();
    }

    triggerComputedAndWatch(ref);
    ctx.__$$inBM = false;
  }

  var moduleName2stateKeys$2 = ccContext.moduleName2stateKeys,
      _ccContext$store$3 = ccContext.store,
      getPrevState$1 = _ccContext$store$3.getPrevState,
      getState$6 = _ccContext$store$3.getState,
      getStateVer$1 = _ccContext$store$3.getStateVer;

  var warn = function warn(key, frag) {
    return justWarning("effect: key[" + key + "] is invalid, its " + frag + " has not been declared in' store!");
  };

  function mapSettedList(settedList) {
    return settedList.reduce(function (map, _ref) {
      var module = _ref.module,
          keys = _ref.keys;
      keys.forEach(function (key) {
        return map[module + "/" + key] = 1;
      });
      return map;
    }, {});
  }

  function triggerSetupEffect (ref, callByDidMount) {
    var ctx = ref.ctx;
    var _ctx$effectMeta = ctx.effectMeta,
        effectItems = _ctx$effectMeta.effectItems,
        eid2effectReturnCb = _ctx$effectMeta.eid2effectReturnCb,
        effectPropsItems = _ctx$effectMeta.effectPropsItems,
        eid2effectPropsReturnCb = _ctx$effectMeta.eid2effectPropsReturnCb;
    var __$$prevMoStateVer = ctx.__$$prevMoStateVer,
        __$$settedList = ctx.__$$settedList,
        refModule = ctx.module;

    var makeItemHandler = function makeItemHandler(eid2cleanCb, isFirstCall, needJudgeImmediate) {
      return function (item) {
        var fn = item.fn,
            eId = item.eId,
            immediate = item.immediate;

        if (needJudgeImmediate) {
          if (immediate === false) return;
        }

        var prevCb = eid2cleanCb[eId];
        if (prevCb) prevCb(ctx); // let ctx.effect have the totally same behavior with useEffect

        var cb = fn(ctx, isFirstCall);
        eid2cleanCb[eId] = cb; //不管有没有返回，都要覆盖之前的结果
      };
    };

    if (callByDidMount) {
      // flag isFirstCall as true
      effectItems.forEach(makeItemHandler(eid2effectReturnCb, true, true));
      effectPropsItems.forEach(makeItemHandler(eid2effectPropsReturnCb, true, true));
      return;
    } // callByDidUpdate
    // start handle effect meta data of state keys


    var prevState = ctx.prevState;
    var curState = ctx.unProxyState;
    var toBeExecutedFns = [];
    effectItems.forEach(function (item) {
      // const { status, depKeys, fn, eId } = item;
      // if (status === EFFECT_STOPPED) return;
      // todo, 优化为effectDep模式, 利用differStateKeys去命中执行函数
      var modDepKeys = item.modDepKeys,
          depKeys = item.depKeys,
          compare = item.compare,
          fn = item.fn,
          eId = item.eId;

      if (!depKeys) {
        return toBeExecutedFns.push({
          fn: fn,
          eId: eId
        });
      }

      var keysLen = modDepKeys.length;
      if (keysLen === 0) return;
      var mappedSettedKey = mapSettedList(__$$settedList);
      var shouldEffectExecute = false;

      for (var i = 0; i < keysLen; i++) {
        var key = modDepKeys[i];

        var _key$split = key.split('/'),
            module = _key$split[0],
            unmoduledKey = _key$split[1];

        var targetCurState = void 0,
            targetPrevState = void 0;

        if (module !== refModule) {
          var _prevState = getPrevState$1(module);

          var moduleStateVer = getStateVer$1(module);

          if (__$$prevMoStateVer[unmoduledKey] === moduleStateVer[unmoduledKey]) {
            continue;
          } else {
            __$$prevMoStateVer[unmoduledKey] = moduleStateVer[unmoduledKey];
          }

          if (!_prevState) {
            warn(key, "module[" + module + "]");
            continue;
          }

          if (!moduleName2stateKeys$2[module].includes(unmoduledKey)) {
            warn(key, "unmoduledKey[" + unmoduledKey + "]");
            continue;
          }

          targetCurState = getState$6(module);
          targetPrevState = _prevState;
        } else {
          targetCurState = curState;
          targetPrevState = prevState;
        }

        var isValChanged = targetPrevState[unmoduledKey] !== targetCurState[unmoduledKey];

        if (isValChanged) {
          shouldEffectExecute = true;
        } else {
          // compare为true看有没有发生变化（object类型值不走immutable写法的话，这里是false，所以compare值默认是false）
          // compare为false则看是不是setted
          shouldEffectExecute = compare ? isValChanged : mappedSettedKey[key];
        }

        if (shouldEffectExecute) {
          break;
        }
      }

      if (shouldEffectExecute) {
        toBeExecutedFns.push({
          fn: fn,
          eId: eId
        });
      }
    }); // flag isFirstCall as false, start to run state effect fns

    toBeExecutedFns.forEach(makeItemHandler(eid2effectReturnCb, false, false)); // start handle effect meta data of props keys

    var prevProps = ctx.prevProps;
    var curProps = ctx.props;
    var toBeExecutedPropFns = [];
    effectPropsItems.forEach(function (item) {
      var depKeys = item.depKeys,
          fn = item.fn,
          eId = item.eId;

      if (!depKeys) {
        return toBeExecutedPropFns.push({
          fn: fn,
          eId: eId
        });
      }

      var keysLen = depKeys.length;
      var shouldEffectExecute = false;

      for (var i = 0; i < keysLen; i++) {
        var key = depKeys[i];

        if (prevProps[key] !== curProps[key]) {
          shouldEffectExecute = true;
          break;
        }
      }

      if (shouldEffectExecute) toBeExecutedPropFns.push({
        fn: fn,
        eId: eId
      });
    }); // flag isFirstCall as false, start to run prop effect fns

    toBeExecutedPropFns.forEach(makeItemHandler(eid2effectPropsReturnCb, false, false)); // clear settedList

    __$$settedList.length = 0;
  }

  // cur: {} compare: {a:2, b:2, c:2} compareCount=3 nextCompare:{}
  //
  // rendering input
  // cur: {a:'val', c:'val', d:'val'}
  //
  // after render
  // cur: {a:1, c:1, c:1} compare: {a:1, b:2, c:1, d:1} nextCompare:{a:2, c:2, d:2}
  //
  // then concent will know b should delete dep because=0, 
  // compare key count=4>3 or compare include 2, so should let cache expire
  //
  // before next render
  // cur: {} compare: {a:2, c:2, d:2} compareCount=3 nextCompare:{}

  /** 删除依赖 */

  function delDep(compareWaKeys, compareWaKeyCount, module, ccUniqueKey) {
    var waKeys = okeys(compareWaKeys);
    var waKeyKen = waKeys.length;
    if (waKeyKen === 0) return;
    var shouldLetCacheExpire = false;
    waKeys.forEach(function (waKey) {
      // no module prefix
      if (compareWaKeys[waKey] === 2) {
        // 这个key在这轮渲染结束后没有命中，说明视图不再对它有依赖
        shouldLetCacheExpire = true;
        delIns(module, waKey, ccUniqueKey);
      }
    });

    if (waKeys.length > compareWaKeyCount) {
      // 大于最初记录的key数量，有新增
      shouldLetCacheExpire = true;
    } // let find result cache expire


    if (shouldLetCacheExpire) {
      createModuleNode(module);
    }
  }

  function afterRender (ref) {
    var ctx = ref.ctx;
    ctx.__$$renderStatus = END;
    var refModule = ctx.module,
        connectedModules = ctx.connectedModules,
        connect = ctx.connect,
        ccUniqueKey = ctx.ccUniqueKey,
        __$$compareWaKeys = ctx.__$$compareWaKeys,
        __$$compareWaKeyCount = ctx.__$$compareWaKeyCount,
        __$$compareConnWaKeys = ctx.__$$compareConnWaKeys,
        __$$compareConnWaKeyCount = ctx.__$$compareConnWaKeyCount; // if ref is autoWatch status, should del belong module dep dynamically after every render period

    if (ctx.__$$autoWatch) {
      delDep(__$$compareWaKeys, __$$compareWaKeyCount, refModule, ccUniqueKey);
    }

    connectedModules.forEach(function (m) {
      // if ref is autoWatch status, should del connected module dep dynamically after every render period
      if (connect[m] === '-') {
        var _$$compareWaKeys = __$$compareConnWaKeys[m];
        var _$$compareWaKeyCount = __$$compareConnWaKeyCount[m];
        delDep(_$$compareWaKeys, _$$compareWaKeyCount, m, ccUniqueKey);
      }
    });
  }

  var _lifecycle$1 = lifecycle._lifecycle,
      _mountedOnce = lifecycle._mountedOnce;
  var getModuleVer$3 = ccContext.store.getModuleVer;

  function triggerLifecyleMounted(allModules, mstate) {
    var handleOneModule = function handleOneModule(m) {
      safeAdd(module2insCount, m, 1);
      var moduleLifecycle = _lifecycle$1[m];
      if (!moduleLifecycle) return;
      var mounted = moduleLifecycle.mounted;
      if (!mounted) return;
      if (_mountedOnce[m] === true) return;

      if (module2insCount[m] == 1) {
        var once = mounted(makeModuleDispatcher(m), mstate);
        _mountedOnce[m] = getVal(once, true);
      }
    };

    allModules.forEach(handleOneModule);
  }

  function didMount (ref) {
    afterRender(ref);
    ref.__$$ms = MOUNTED;
    var _ref$ctx = ref.ctx,
        ccUniqueKey = _ref$ctx.ccUniqueKey,
        __$$onEvents = _ref$ctx.__$$onEvents,
        __$$staticWaKeys = _ref$ctx.__$$staticWaKeys,
        module = _ref$ctx.module,
        allModules = _ref$ctx.allModules,
        __$$mstate = _ref$ctx.__$$mstate,
        __$$prevModuleVer = _ref$ctx.__$$prevModuleVer;
    setRef(ref); // 确保组件挂载时在绑定事件，以避免同一个组件(通常是function组件, 因为cursor问题)，
    // 走了 (1)mount ---> (2)mount ---> (1)unmount 时把2本来也要监听的事件清理掉
    // 同时本身来说，挂载好的组件监听事件才是安全的

    if (__$$onEvents.length > 0) {
      __$$onEvents.forEach(function (_ref) {
        var inputEvent = _ref.inputEvent,
            handler = _ref.handler;

        var _ev$getEventItem = getEventItem(inputEvent),
            event = _ev$getEventItem.name,
            identity = _ev$getEventItem.identity;

        bindEventHandlerToCcContext(module, ref.ctx.ccClassKey, ccUniqueKey, event, identity, handler);
      });

      __$$onEvents.length = 0;
    }

    var __$$staticWaKeyList = okeys(__$$staticWaKeys); // 用于辅助记录依赖映射


    ref.ctx.__$$staticWaKeyList = __$$staticWaKeyList; // 记录静态依赖

    __$$staticWaKeyList.forEach(function (modStateKey) {
      return mapStaticInsM(modStateKey, ccUniqueKey);
    });

    triggerSetupEffect(ref, true);
    triggerLifecyleMounted(allModules, __$$mstate); // 组件的didMount触发会在lifecycle.initState调用之后，此处版本可能已落后，需要自我刷新一下

    if (__$$prevModuleVer !== getModuleVer$3(module)) {
      ref.ctx.reactForceUpdate();
    }
  }

  function didUpdate (ref) {
    afterRender(ref);
    triggerSetupEffect(ref); //!!! 将最新的state记录为prevState，方便下一轮渲染完毕执行triggerSetupEffect时做比较用
    //注意一定是先调用triggerSetupEffect，再赋值

    ref.ctx.prevState = ref.ctx.unProxyState;
  }

  var ccUKey2ref$3 = ccContext.ccUKey2ref,
      ccUKey2handlerKeys$1 = ccContext.ccUKey2handlerKeys,
      runtimeVar$5 = ccContext.runtimeVar,
      handlerKey2handler$1 = ccContext.handlerKey2handler;
  function unsetRef (ccUniqueKey) {
    if (runtimeVar$5.isDebug) {
      logNormal(styleStr(ccUniqueKey + " unset ref"), color('purple'));
    }

    delete ccUKey2ref$3[ccUniqueKey];
    if (ccContext.isHotReloadMode()) decCcKeyInsCount(ccUniqueKey);
    var handlerKeys = ccUKey2handlerKeys$1[ccUniqueKey];

    if (handlerKeys) {
      handlerKeys.forEach(function (hKey) {
        delete handlerKey2handler$1[hKey];
      });
    }
  }

  var _lifecycle$2 = lifecycle._lifecycle,
      _willUnmountOnce = lifecycle._willUnmountOnce;

  function executeClearCb(cbMap, ctx) {
    var execute = function execute(key) {
      // symbolKey or normalKey
      var cb = cbMap[key];
      if (isFn(cb)) cb(ctx);
    };

    Object.getOwnPropertySymbols(cbMap).forEach(execute);
    okeys(cbMap).forEach(execute);
  }

  function triggerLifecycleWillUnmount(allModules, mstate) {
    var handleOneModule = function handleOneModule(m) {
      module2insCount[m] -= 1;
      var moduleLifecycle = _lifecycle$2[m];
      if (!moduleLifecycle) return;
      var willUnmount = moduleLifecycle.willUnmount;
      if (!willUnmount) return;
      if (_willUnmountOnce[m] === true) return;

      if (module2insCount[m] === 0) {
        var once = willUnmount(makeModuleDispatcher(m), mstate);
        _willUnmountOnce[m] = getVal(once, true);
      }
    };

    allModules.forEach(handleOneModule);
  }

  function beforeUnmount (ref) {
    // 标记一下已卸载，防止组件卸载后，某个地方有异步的任务拿到了该组件的引用，然后执行setState，导致
    // Warning: Can't perform a React state update on an unmounted component. This is a no-op ......
    var curMs = ref.__$$ms;
    ref.__$$ms = UNMOUNTED;
    var ctx = ref.ctx;
    var ccUniqueKey = ctx.ccUniqueKey,
        module = ctx.module,
        allModules = ctx.allModules,
        __$$staticWaKeyList = ctx.__$$staticWaKeyList,
        __$$mstate = ctx.__$$mstate; // 正常情况下只有挂载了组件才会有effect等相关定义

    if (curMs === MOUNTED) {
      var _ctx$effectMeta = ctx.effectMeta,
          eid2effectReturnCb = _ctx$effectMeta.eid2effectReturnCb,
          eid2effectPropsReturnCb = _ctx$effectMeta.eid2effectPropsReturnCb;
      executeClearCb(eid2effectReturnCb, ctx);
      executeClearCb(eid2effectPropsReturnCb, ctx);
      offEventHandlersByCcUniqueKey(ccUniqueKey);
    } // 删除记录的动态依赖


    var waKeys = ctx.getWatchedKeys(); // no module prefix

    waKeys.forEach(function (k) {
      return delIns(module, k, ccUniqueKey);
    });
    var connWaKeys = ctx.getConnectWatchedKeys();
    okeys(connWaKeys).map(function (m) {
      var waKeys = connWaKeys[m];
      waKeys.forEach(function (k) {
        return delIns(m, k, ccUniqueKey);
      });
    }); // 删除记录的静态依赖

    __$$staticWaKeyList.forEach(function (modStateKey) {
      return delStaticInsM(modStateKey, ccUniqueKey);
    }); // let findUpdateRefs cache expire


    allModules.forEach(createModuleNode);
    unsetRef(ccUniqueKey);
    triggerLifecycleWillUnmount(allModules, __$$mstate);
  }

  /** eslint-disable */
  function beforeRender (ref, mapProps) {
    var ctx = ref.ctx;
    ctx.renderCount += 1; // 类组件this.reactSetState调用后生成的this.state是一个新的普通对象
    // 每次渲染前替换为ctx.state指向的Proxy对象，确保让类组件里使用this.state能够收集到依赖

    ref.state = ctx.state;
    if (ctx.childRef) ctx.childRef.state = ctx.state; // 不处于收集观察依赖 or 已经开始都要跳出此函数
    // strictMode模式下，会走两次beforeRender 一次afterRender，
    // 所以这里严格用ctx.__$$renderStatus === START 来控制只真正执行一次beforeRender

    if (!ctx.__$$autoWatch || ctx.__$$renderStatus === START) {
      return;
    }

    if (ctx.__$$renderStatus !== START) ctx.__$$renderStatus = START;

    if (ctx.__$$hasModuleState) {
      ctx.__$$curWaKeys = {};
      ctx.__$$compareWaKeys = ctx.__$$nextCompareWaKeys;
      ctx.__$$compareWaKeyCount = ctx.__$$nextCompareWaKeyCount; // 渲染期间再次收集

      ctx.__$$nextCompareWaKeys = {};
      ctx.__$$nextCompareWaKeyCount = 0;
    }

    var connectedModules = ctx.connectedModules,
        connect = ctx.connect;
    connectedModules.forEach(function (m) {
      // 非自动收集，在make-ob-state里不会触发get，这里直接跳出
      if (connect[m] !== '-') return;
      ctx.__$$curConnWaKeys[m] = {};
      ctx.__$$compareConnWaKeys[m] = ctx.__$$nextCompareConnWaKeys[m];
      ctx.__$$compareConnWaKeyCount[m] = ctx.__$$nextCompareConnWaKeyCount[m]; // 渲染期间再次收集

      ctx.__$$nextCompareConnWaKeys[m] = {};
      ctx.__$$nextCompareConnWaKeyCount[m] = 0;
    }); // 外面始终取 ctx.__$$mapped 传给 CcFragment registerHookComp registerDumb 的 render 函数，
    // 具体 ctx.__$$mapped 指向什么取决于有没有传递 mapProps
    // 传递 mapProps，则传 mapped 给 render 函数，没传 mapProps，则直接透传 ctx 给 render 函数
    // !!! 这个规则或许将来某一天会改掉，始终传递 ctx 给 render 函数，这样简单的设定更适合编码思维，而不是存在多种形态

    if (mapProps) {
      var mapped = mapProps(ctx);

      if (isPJO(mapped)) {
        Object.assign(ctx.mapped, mapped);
      }

      ctx.__$$mapped = ctx.mapped;
    } else {
      ctx.__$$mapped = ctx;
    }
  }

  var ccClassDisplayName$1 = ccClassDisplayName,
      shallowDiffers$1 = shallowDiffers,
      evalState$3 = evalState;

  var setupErr = function setupErr(info) {
    return new Error("can not defined setup both in register options and class body, --verbose: " + info);
  };

  function register(_temp, ccClassKey) {
    var _ref = _temp === void 0 ? {} : _temp,
        _ref$module = _ref.module,
        module = _ref$module === void 0 ? MODULE_DEFAULT : _ref$module,
        _ref$state = _ref.state,
        state = _ref$state === void 0 ? {} : _ref$state,
        _ref$watchedKeys = _ref.watchedKeys,
        watchedKeys = _ref$watchedKeys === void 0 ? '-' : _ref$watchedKeys,
        _ref$storedKeys = _ref.storedKeys,
        storedKeys = _ref$storedKeys === void 0 ? [] : _ref$storedKeys,
        _ref$setup = _ref.setup,
        setup = _ref$setup === void 0 ? null : _ref$setup,
        _ref$cuDesc = _ref.cuDesc,
        cuDesc = _ref$cuDesc === void 0 ? null : _ref$cuDesc,
        persistStoredKeys = _ref.persistStoredKeys,
        _ref$connect = _ref.connect,
        connect = _ref$connect === void 0 ? {} : _ref$connect,
        _ref$extra = _ref.extra,
        extra = _ref$extra === void 0 ? {} : _ref$extra,
        staticExtra = _ref.staticExtra,
        tag = _ref.tag,
        lite = _ref.lite,
        _ref$isPropsProxy = _ref.isPropsProxy,
        isPropsProxy = _ref$isPropsProxy === void 0 ? false : _ref$isPropsProxy,
        renderKeyClasses = _ref.renderKeyClasses,
        _ref$__checkStartUp = _ref.__checkStartUp,
        __checkStartUp = _ref$__checkStartUp === void 0 ? true : _ref$__checkStartUp,
        _ref$compareProps = _ref.compareProps,
        compareProps = _ref$compareProps === void 0 ? true : _ref$compareProps,
        __calledBy = _ref.__calledBy;

    if (ccClassKey === void 0) {
      ccClassKey = '';
    }

    try {
      var _mapRegistrationInfo = mapRegistrationInfo(module, ccClassKey, renderKeyClasses, CC_CLASS, watchedKeys, connect, __checkStartUp, __calledBy),
          _module = _mapRegistrationInfo._module,
          _ccClassKey = _mapRegistrationInfo._ccClassKey,
          _connect = _mapRegistrationInfo._connect,
          _watchedKeys = _mapRegistrationInfo._watchedKeys;

      return function (ReactClass) {
        if (ReactClass.prototype && ReactClass.prototype.$$attach) {
          throw new Error("register a cc class is prohibited!");
        } // const isClsPureComponent = ReactClass.prototype.isPureReactComponent;


        var ToBeExtendedClass = isPropsProxy === false ? ReactClass : React.Component;
        var staticSetup = ToBeExtendedClass.$$setup;

        var _CcClass =
        /*#__PURE__*/
        function (_ToBeExtendedClass) {
          _inheritsLoose(CcClass, _ToBeExtendedClass);

          function CcClass(props, context) {
            var _this;

            _this = _ToBeExtendedClass.call(this, props, context) || this;

            try {
              var optState = evalState$3(state);
              var thisState = _this.state || {};
              var privState = Object.assign(thisState, optState);
              _this.$$attach = _this.$$attach.bind(_assertThisInitialized(_this)); // props.ccOption

              var params = Object.assign({}, props, {
                module: _module,
                tag: tag,
                state: privState,
                type: CC_CLASS,
                insType: CC_CUSTOMIZE,
                watchedKeys: _watchedKeys,
                ccClassKey: _ccClassKey,
                connect: _connect,
                storedKeys: storedKeys,
                persistStoredKeys: persistStoredKeys,
                extra: extra,
                staticExtra: staticExtra
              });
              buildRefCtx(_assertThisInitialized(_this), params, lite);
              _this.ctx.reactSetState = makeRefSetState(_assertThisInitialized(_this));
              _this.ctx.reactForceUpdate = makeRefForceUpdate(_assertThisInitialized(_this));

              if (setup && (_this.$$setup || staticSetup)) {
                throw setupErr("ccUniqueKey " + _this.ctx.ccUniqueKey);
              }

              if (!isPropsProxy) {
                if (_this.$$setup) _this.$$setup = _this.$$setup.bind(_assertThisInitialized(_this));
                beforeMount(_assertThisInitialized(_this), setup || _this.$$setup || staticSetup, false, cuDesc);
              } // isPropsProxy为true时，延迟到$$attach里执行beforeMount

            } catch (err) {
              rh.tryHandleError(err);
            }

            return _this;
          } // 如果代理组件或者继承组件没有没有实现scu，则同时比较nextState nextProps
          // 因为nextProps不同也会导致重渲染，所以需要约束用户不要把可变数据从props传下来，以提高性能


          var _proto = CcClass.prototype;

          _proto.shouldComponentUpdate = function shouldComponentUpdate(nextProps, nextState) {
            var childRef = this.ctx.childRef;

            if (childRef && childRef.shouldComponentUpdate) {
              return childRef.shouldComponentUpdate(nextProps, nextState);
            } else if (_ToBeExtendedClass.prototype.shouldComponentUpdate) {
              return _ToBeExtendedClass.prototype.shouldComponentUpdate.call(this, nextProps, nextState);
            }

            var isPropsChanged = compareProps ? shallowDiffers$1(this.props, nextProps) : false;
            return this.state !== nextState || isPropsChanged;
          } //!!! 存在多重装饰器时, 或者用户想使用this.props.***来用concent类时
          //!!! 必需在类的【constructor】 里调用 this.props.$$attach(this),紧接着state定义之后
          ;

          _proto.$$attach = function $$attach(childRef) {
            var ctx = this.ctx;
            ctx.childRef = childRef;
            childRef.ctx = ctx; // 让代理属性的目标组件访问ctx时，既可以写 this.props.ctx 也可以写 this.ctx
            // 让孩子引用的setState forceUpdate 指向父容器事先构造好的setState forceUpdate

            childRef.setState = ctx.setState;
            childRef.forceUpdate = ctx.forceUpdate;

            if (isObjectNotNull(childRef.state)) {
              Object.assign(ctx.state, childRef.state, ctx.__$$mstate);
            }

            if (childRef.$$setup) childRef.$$setup = childRef.$$setup.bind(childRef);
            if (setup && (childRef.$$setup || staticSetup)) throw setupErr("ccUniqueKey " + ctx.ccUniqueKey);
            beforeMount(this, setup || childRef.$$setup || staticSetup, false, cuDesc);
            beforeRender(this);
          };

          _proto.componentDidMount = function componentDidMount() {
            // 属性代理模式，必需在组件consturctor里调用 props.$$attach(this)
            // you must call it in next line of state assign expression 
            if (isPropsProxy && !this.ctx.childRef) {
              throw new Error("forget call props.$$attach(this) in constructor when set isPropsProxy true");
            }

            if (_ToBeExtendedClass.prototype.componentDidMount) _ToBeExtendedClass.prototype.componentDidMount.call(this);
            didMount(this);
          };

          _proto.componentDidUpdate = function componentDidUpdate(prevProps, prevState, snapshot) {
            // if (super.componentDidUpdate) super.componentDidUpdate(prevProps, prevState, snapshot);
            // @see https://codesandbox.io/s/example-modular-1-forked-z3xsb?file=/src/App.js
            // prevState 不对，ctx.prevState是正确的 透传给用户
            if (_ToBeExtendedClass.prototype.componentDidUpdate) _ToBeExtendedClass.prototype.componentDidUpdate.call(this, prevProps, this.ctx.prevState, snapshot);
            didUpdate(this);
          };

          _proto.componentWillUnmount = function componentWillUnmount() {
            if (_ToBeExtendedClass.prototype.componentWillUnmount) _ToBeExtendedClass.prototype.componentWillUnmount.call(this);
            beforeUnmount(this);
          } // 注：strict mode 模式下，class组件的双调用机制行为和function组件不一样
          // constructor x2 ---> render x2 ---> componentDidMount x1
          // 两次构造器里虽然生成了不同的refCtx，但是两次render里给的 this.ctx 始终是最新的那一个
          // 所以此处不需要像 useConcent 一样做ef标记
          ;

          _proto.render = function render() {
            var outProps = this.props;
            this.ctx.prevProps = this.ctx.props;
            this.ctx.props = outProps;
            beforeRender(this);

            if (isPropsProxy === false) {
              // now cc class extends ReactClass, call super.render()
              return _ToBeExtendedClass.prototype.render.call(this);
            } else {
              //将$$attach传递下去，用户需在构造器里最后一样调用props.$$attach()
              var passedProps = _extends({}, outProps, {
                ctx: this.ctx,
                $$attach: this.$$attach
              });

              return React.createElement(ReactClass, passedProps);
            }
          };

          return CcClass;
        }(ToBeExtendedClass);

        _CcClass.displayName = ccClassDisplayName$1(_ccClassKey);
        return _CcClass;
      };
    } catch (err) {
      rh.tryHandleError(err);
    }
  }

  /****
   * @param {string} ccClassKey a cc class's name, 
   * you can register a same react class to cc with different ccClassKey,
   * but you can not register multi react class with a same ccClassKey 
   * if they don't have same feature(module, connnect params)
   * @param {object} registerOption
   * @param {string} [registerOption.module] declare which module current cc class belong to, 
   * default is '$$default'
   * @param {Function} [registerOption.setup]
   * @param {Array<string>|string} [registerOption.watchedKeys] 
   * declare current cc class's any instance is concerned which state keys's state changing,
   * but mostly wo should not set this param cause concent will collect ins dep automatically
   * @param {{ [moduleName:string]: keys: string[] | '*' }} [registerOption.connect]
   * @param {string} [registerOption.isPropsProxy] default is false
   * cc alway use strategy of reverse inheritance to wrap your react class, 
   * that means you can get ctx from `this` directly
   * but if you meet multi decorator in your project, 
   * to let concent still works well you should set isPropsProxy as true, 
   * and call props.attach(this) in last line of constructor, 
   * then cc will use strategy of prop proxy to wrap your react class, 
   * for example
   * ```
   *    @register({ module: "form", isPropsProxy: true })
   *    @Form.create()
   *    class BasicForms extends PureComponent {
   *      constructor(props, context) {
   *        super(props, context);
   *        props.$$attach(this);// must call $$attach at last line of constructor block
   *      }
   *      render(){
   *        this.ctx.moduleComputed; //now you can get render ctx supplied by concent
   *      }
   *   }
   * ```
   * online example here: https://codesandbox.io/s/register-in-multi-decrator-j4nr2
   */

  function register$1 (registerOption, ccClassKey) {
    var _registerOption = getRegisterOptions(registerOption);

    delete _registerOption.__checkStartUp;
    delete _registerOption.__calledBy;
    return register(_registerOption, ccClassKey);
  }

  function _connect (connectSpec, ccClassKey) {
    var connect = connectSpec || [];
    return register$1({
      connect: connect
    }, ccClassKey);
  }

  /* eslint-disable camelcase */
  var getRegisterOptions$1 = getRegisterOptions,
      evalState$4 = evalState;
  function initCcFrag (ref, props) {
    var registerOptions = getRegisterOptions$1(props.register);
    var module = registerOptions.module,
        renderKeyClasses = registerOptions.renderKeyClasses,
        tag = registerOptions.tag,
        lite = registerOptions.lite,
        _registerOptions$comp = registerOptions.compareProps,
        compareProps = _registerOptions$comp === void 0 ? true : _registerOptions$comp,
        setup = registerOptions.setup,
        bindCtxToMethod = registerOptions.bindCtxToMethod,
        _registerOptions$watc = registerOptions.watchedKeys,
        watchedKeys = _registerOptions$watc === void 0 ? '-' : _registerOptions$watc,
        _registerOptions$conn = registerOptions.connect,
        connect = _registerOptions$conn === void 0 ? {} : _registerOptions$conn,
        _registerOptions$stor = registerOptions.storedKeys,
        storedKeys = _registerOptions$stor === void 0 ? [] : _registerOptions$stor,
        _registerOptions$cuDe = registerOptions.cuDesc,
        cuDesc = _registerOptions$cuDe === void 0 ? null : _registerOptions$cuDe;
    var state = evalState$4(registerOptions.state);
    var ccClassKey = props.ccClassKey,
        ccKey = props.ccKey,
        _props$ccOption = props.ccOption,
        ccOption = _props$ccOption === void 0 ? {} : _props$ccOption,
        id = props.id;
    var target_watchedKeys = watchedKeys;
    var target_ccClassKey = ccClassKey;
    var target_connect = connect;
    var insType = CC_CUSTOMIZE; //直接使用<CcFragment />构造的cc实例, 尝试提取storedKeys, 然后映射注册信息，（注：registerDumb创建的组件已在外部调用过mapRegistrationInfo）

    if (props.__$$regDumb !== true) {
      insType = CC_FRAGMENT;

      var _mapRegistrationInfo = mapRegistrationInfo(module, ccClassKey, renderKeyClasses, CC_CLASS, watchedKeys, connect, true),
          _ccClassKey = _mapRegistrationInfo._ccClassKey,
          _connect = _mapRegistrationInfo._connect,
          _watchedKeys = _mapRegistrationInfo._watchedKeys;

      target_watchedKeys = _watchedKeys;
      target_ccClassKey = _ccClassKey;
      target_connect = _connect;
    }

    buildRefCtx(ref, {
      ccKey: ccKey,
      connect: target_connect,
      state: state,
      module: module,
      type: CC_CLASS,
      insType: insType,
      storedKeys: storedKeys,
      watchedKeys: target_watchedKeys,
      tag: tag,
      ccClassKey: target_ccClassKey,
      ccOption: ccOption,
      id: id
    }, lite);
    ref.ctx.reactSetState = makeRefSetState(ref);
    ref.ctx.reactForceUpdate = makeRefForceUpdate(ref);
    ref.__$$compareProps = compareProps; //对于concent来说，ctx在constructor里构造完成，此时就可以直接把ctx传递给beforeMount了，
    //无需在将要给废弃的componentWillMount里调用beforeMount

    beforeMount(ref, setup, bindCtxToMethod, cuDesc);
  }

  var connectToStr = function connectToStr(connect) {
    if (!connect) return '';else if (Array.isArray(connect)) return connect.join(',');else if (typeof connect === 'object') return JSON.stringify(connect);else return connect;
  };

  function isRegChanged(firstRegOpt, curRegOpt) {
    if (typeof firstRegOpt === 'string' && firstRegOpt !== curRegOpt) {
      return true;
    }

    if (firstRegOpt.module !== curRegOpt.module) {
      return true;
    }

    if (connectToStr(firstRegOpt.connect) !== connectToStr(curRegOpt.connect)) {
      return true;
    } // if (firstRegOpt.tag !== curRegOpt.tag) {
    //   return true;
    // }


    return false;
  }

  var shallowDiffers$2 = shallowDiffers,
      isFn$4 = isFn;
  var nullSpan = React.createElement('span', {
    style: {
      display: 'none'
    }
  });

  var CcFragment =
  /*#__PURE__*/
  function (_React$Component) {
    _inheritsLoose(CcFragment, _React$Component);

    function CcFragment(props, context) {
      var _this;

      _this = _React$Component.call(this, props, context) || this;
      initCcFrag(_assertThisInitialized(_this), props);
      return _this;
    }

    var _proto = CcFragment.prototype;

    _proto.componentDidMount = function componentDidMount() {
      didMount(this);
    };

    _proto.shouldComponentUpdate = function shouldComponentUpdate(nextProps, nextState) {
      var props = getOutProps(nextProps);
      var isPropsChanged = this.__$$compareProps ? shallowDiffers$2(props, getOutProps(this.props)) : false; // 检测到register已发送变化，需要重新走一把卸载和初始化流程

      if (isPropsChanged && isRegChanged(props.register, this.props.register)) {
        beforeUnmount(this);
        initCcFrag(this, props);
        didMount(this);
        this.ctx.reactForceUpdate();
        return false;
      }

      return this.state !== nextState || isPropsChanged;
    } // componentDidUpdate(prevProps, prevState) {
    ;

    _proto.componentDidUpdate = function componentDidUpdate() {
      didUpdate(this);
    };

    _proto.componentWillUnmount = function componentWillUnmount() {
      beforeUnmount(this);
    };

    _proto.render = function render() {
      // 注意这里，一定要每次都取最新的绑在ctx上，确保交给renderProps的ctx参数里的state和props是最新的
      var thisProps = this.props;
      this.ctx.prevProps = this.ctx.props;
      this.ctx.props = getOutProps(thisProps);
      var children = thisProps.children,
          render = thisProps.render,
          _thisProps$register = thisProps.register,
          register = _thisProps$register === void 0 ? {} : _thisProps$register;
      var view = render || children;

      if (isFn$4(view)) {
        var ctx = this.ctx;
        beforeRender(this, register.mapProps);
        return view(ctx.__$$mapped) || nullSpan;
      } else {
        if (React.isValidElement(view)) {
          // 直接传递dom，无论state怎么改变都不会再次触发渲染
          throw new Error("CcFragment's children can not be a react dom");
        }

        return view;
      }
    };

    return CcFragment;
  }(React.Component);

  /* eslint-disable react/prop-types */

  function _registerDumb(Dumb, regOpt) {
    var ccClassKey = regOpt.ccClassKey,
        _regOpt$props = regOpt.props,
        props = _regOpt$props === void 0 ? {} : _regOpt$props;

    var render = function render(ctx) {
      return React.createElement(Dumb, ctx.__$$mapped);
    }; // ccKey由实例化的Dumb组件props上透传下来


    var passProps = {
      __$$regDumb: true,
      props: props,
      ccOption: props.ccOption,
      ccClassKey: ccClassKey,
      render: render,
      ccKey: props.ccKey,
      register: regOpt
    };
    return React.createElement(CcFragment, passProps);
  } // renderKeyClasses, tag, mapProps, module = MODULE_DEFAULT,
  // watchedKeys = '*', storedKeys, persistStoredKeys, render: Dumb,
  // connect = {}, state = {}, setup, bindCtxToMethod, compareProps, lite,
  // bindCtxToMethod


  function registerDumb (registerOption, ccClassKey) {
    var _registerOption = getRegisterOptions(registerOption);

    var renderKeyClasses = _registerOption.renderKeyClasses,
        module = _registerOption.module,
        _registerOption$watch = _registerOption.watchedKeys,
        watchedKeys = _registerOption$watch === void 0 ? '-' : _registerOption$watch,
        Dumb = _registerOption.render,
        _registerOption$conne = _registerOption.connect,
        connect = _registerOption$conne === void 0 ? {} : _registerOption$conne;

    var _mapRegistrationInfo = mapRegistrationInfo(module, ccClassKey, renderKeyClasses, CC_FRAGMENT, watchedKeys, connect, true),
        _module = _mapRegistrationInfo._module,
        _ccClassKey = _mapRegistrationInfo._ccClassKey,
        _connect = _mapRegistrationInfo._connect,
        _watchedKeys = _mapRegistrationInfo._watchedKeys;

    _registerOption.module = _module;
    _registerOption.watchedKeys = _watchedKeys;
    _registerOption.ccClassKey = _ccClassKey;
    _registerOption.connect = _connect;

    function buildCcFragComp(Dumb) {
      // 避免react dev tool显示的dom为Unknown
      var ConnectedFragment = function ConnectedFragment(props) {
        _registerOption.props = props;
        return _registerDumb(Dumb, _registerOption);
      };

      return ConnectedFragment;
    }

    if (Dumb) {
      return buildCcFragComp(Dumb);
    } else {
      return function (Dumb) {
        return buildCcFragComp(Dumb);
      };
    }
  }

  function _connectDumb (connectSpec, ccClassKey) {
    var connect = connectSpec || [];
    return registerDumb({
      connect: connect
    }, ccClassKey);
  }

  var isStrictMode = false;
  var locMsgs = {
    1: '',
    2: ''
  };
  function recordFirst2HookCallLoc(cursor, msg) {
    locMsgs[cursor] = msg;

    if (cursor === 2 && locMsgs[1] === locMsgs[2]) {
      isStrictMode = true;
    }
  }
  function isStrict () {
    return isStrictMode;
  }

  /**
   * http://react.html.cn/docs/strict-mode.html
   * https://frontarm.com/daishi-kato/use-ref-in-concurrent-mode/
   */
  var ccUKey2ref$4 = ccContext.ccUKey2ref;
  var cursor2hookCtx = {};
  var refCursor = 1;

  function getUsableCursor() {
    var toReturn = refCursor;
    return toReturn;
  }

  function incCursor() {
    refCursor = refCursor + 1;
  }

  function CcHook(state, hookSetter, props, hookCtx) {
    // new CcHook时，这里锁定的hookSetter就是后面一直可以用的setter
    // 如果存在期一直替换hookSetter，反倒会造成打开react-dev-tool，点击面板里的dom后，视图便不再更新的bug
    this.setState = hookSetter;
    this.forceUpdate = hookSetter;
    this.state = state;
    this.isFirstRendered = true;
    this.props = props;
    this.hookCtx = hookCtx;
  } // rState: resolvedState, iState: initialState


  function buildRef(ref, insType, hookCtx, rState, iState, regOpt, hookState, hookSetter, props, ccClassKey) {
    incCursor();
    cursor2hookCtx[hookCtx.cursor] = hookCtx; // when single file demo in hmr mode trigger buildRef, rState is 0 
    // so here call evalState again

    var state = rState || evalState(iState);
    var renderKeyClasses = regOpt.renderKeyClasses,
        module = regOpt.module,
        _regOpt$watchedKeys = regOpt.watchedKeys,
        watchedKeys = _regOpt$watchedKeys === void 0 ? '-' : _regOpt$watchedKeys,
        _regOpt$connect = regOpt.connect,
        connect = _regOpt$connect === void 0 ? {} : _regOpt$connect,
        setup = regOpt.setup,
        lite = regOpt.lite,
        cuDesc = regOpt.cuDesc,
        bindCtxToMethod = regOpt.bindCtxToMethod;

    var _mapRegistrationInfo = mapRegistrationInfo(module, ccClassKey, renderKeyClasses, CC_HOOK, watchedKeys, connect, true),
        _module = _mapRegistrationInfo._module,
        _ccClassKey = _mapRegistrationInfo._ccClassKey,
        _connect = _mapRegistrationInfo._connect,
        _watchedKeys = _mapRegistrationInfo._watchedKeys;

    var hookRef = ref || new CcHook(hookState, hookSetter, props, hookCtx);
    hookCtx.hookRef = hookRef;
    var params = Object.assign({}, regOpt, {
      module: _module,
      watchedKeys: _watchedKeys,
      state: state,
      type: CC_HOOK,
      insType: insType,
      ccClassKey: _ccClassKey,
      connect: _connect,
      ccOption: props.ccOption,
      id: props.id,
      ccKey: props.ccKey
    });
    hookRef.props = props; // keep shape same as class

    buildRefCtx(hookRef, params, lite); // in buildRefCtx cc will assign hookRef.props to ctx.prevProps

    hookRef.ctx.reactSetState = makeRefSetState(hookRef);
    hookRef.ctx.reactForceUpdate = makeRefForceUpdate(hookRef);
    var refCtx = hookRef.ctx;
    refCtx.props = props; // attach props to ctx

    beforeMount(hookRef, setup, bindCtxToMethod, cuDesc);
    hookCtx.prevCcUKey = hookCtx.ccUKey;
    hookCtx.ccUKey = hookRef.ctx.ccUniqueKey; // rewrite useRef for CcHook

    refCtx.useRef = function useR(refName) {
      // give named function to avoid eslint error
      var ref = React.useRef(null);
      refCtx.refs[refName] = ref;
      return ref;
    };

    return hookRef;
  }

  function replaceSetter(ctx, hookSetter) {
    ctx.__boundSetState = hookSetter;
    ctx.__boundForceUpdate = hookSetter;
  }

  function getHookCtxCcUKey(hookCtx) {
    return hookCtx.prevCcUKey || hookCtx.ccUKey;
  }

  var tip = 'react version is LTE 16.8';

  function _useConcent(registerOption, ccClassKey, insType) {
    if (registerOption === void 0) {
      registerOption = {};
    }

    var cursor = getUsableCursor();

    var _registerOption = getRegisterOptions(registerOption);

    var shouldGuessStrictMode = isLocal() || isOnlineEditor();

    if (shouldGuessStrictMode && [1, 2].includes(cursor)) {
      try {
        throw new Error('guess strict mode');
      } catch (err) {
        recordFirst2HookCallLoc(cursor, err.stack);
      }
    } // ef: effectFlag


    var hookCtxContainer = React.useRef({
      cursor: cursor,
      prevCcUKey: null,
      ccUKey: null,
      regOpt: _registerOption,
      ef: 0
    });
    var hookCtx = hookCtxContainer.current;
    var _registerOption$state = _registerOption.state,
        iState = _registerOption$state === void 0 ? {} : _registerOption$state,
        _registerOption$props = _registerOption.props,
        props = _registerOption$props === void 0 ? {} : _registerOption$props,
        mapProps = _registerOption.mapProps,
        _registerOption$layou = _registerOption.layoutEffect,
        layoutEffect = _registerOption$layou === void 0 ? false : _registerOption$layou,
        extra = _registerOption.extra;
    var reactUseState = React.useState;

    if (!reactUseState) {
      throw new Error(tip);
    }

    var isFirstRendered = cursor === hookCtx.cursor;
    var state = isFirstRendered ? evalState(iState) : 0;

    var _reactUseState = reactUseState(state),
        hookState = _reactUseState[0],
        hookSetter = _reactUseState[1];

    var cref = function cref(ref) {
      return buildRef(ref, insType, hookCtx, state, iState, _registerOption, hookState, hookSetter, props, ccClassKey);
    };

    var hookRef; // 组件刚挂载 or 渲染过程中变化module或者connect的值，触发创建新ref

    if (isFirstRendered || isRegChanged(hookCtx.regOpt, _registerOption, true)) {
      hookCtx.regOpt = _registerOption;
      hookRef = cref();
    } else {
      hookRef = ccUKey2ref$4[hookCtx.ccUKey]; // [KEY_1] single file demo in hot reload mode

      if (!hookRef) {
        hookRef = cref();
      } else {
        var _refCtx = hookRef.ctx;
        _refCtx.prevProps = _refCtx.props;
        _refCtx.props = props;
        hookRef.props = props;

        if (isObject(extra)) {
          Object.assign(_refCtx.extra, extra);
        }
      }
    }

    var refCtx = hookRef.ctx;
    var effectHandler = layoutEffect ? React.useLayoutEffect : React.useEffect; // after first render of hookRef just created 

    effectHandler(function () {
      var hookCtx = hookRef.hookCtx;
      hookCtx.ef = 1; // 辅助非StrictMode包裹的区域，在随后的判断里可以逃出被删除逻辑
      // mock componentWillUnmount

      return function () {
        var toUnmountRef = ccUKey2ref$4[getHookCtxCcUKey(hookCtx)];
        hookCtx.prevCcUKey = null;

        if (toUnmountRef) {
          beforeUnmount(toUnmountRef);
        }

        delete cursor2hookCtx[cursor];
      };
    }, [hookRef]); // 渲染过程中变化module或者connect的值，触发卸载前一刻的ref
    // after every render

    effectHandler(function () {
      replaceSetter(refCtx, hookSetter); // 热加载模式下会触发卸载，这里需要核实ccUKey_ref_

      if (!hookRef.isFirstRendered && ccUKey2ref$4[getHookCtxCcUKey(hookCtx)]) {
        // mock componentDidUpdate
        didUpdate(hookRef);
      } else {
        // mock componentDidMount
        hookRef.isFirstRendered = false;
        didMount(hookRef);
      } // dobule-invoking 机制导致初始化阶段生成了一个多余的hookRef
      // 虽然未存储到refs上，但是收集到的依赖存储到了waKey2uKeyMap上
      // 这里通过触发beforeUnmount来清理多余的依赖


      var cursor = hookCtx.cursor;

      if (isStrict() && !hookCtx.clearPrev) {
        hookCtx.clearPrev = true;
        var prevCursor = cursor - 1;
        var prevHookCtx = cursor2hookCtx[prevCursor];

        if (prevHookCtx && prevHookCtx.ef === 0) {
          // 确保是同一个类型的实例
          if (prevHookCtx.hookRef.ctx.ccClassKey === hookCtx.hookRef.ctx.ccClassKey) {
            delete cursor2hookCtx[prevCursor]; // 让来自于concent的渲染通知只触发一次, 注意prevHookRef没有被重复触发过diMount逻辑
            // 所以直接用prevHookCtx.hookRef来执行beforeUnmount

            beforeUnmount(prevHookCtx.hookRef);
          }
        }
      }
    });
    beforeRender(hookRef, mapProps);
    return refCtx;
  }
  /**
   * 仅供内部 component/Ob 调用
   */


  function useConcentForOb(registerOption, ccClassKey) {
    // 只针对Ob组件实例化检查时，reg参数是否已变化
    return _useConcent(registerOption, ccClassKey, CC_OB);
  } // 写为具名函数，防止react-dev-tool里显示.default

  function useConcent(registerOption, ccClassKey) {
    return _useConcent(registerOption, ccClassKey, CC_CUSTOMIZE);
  }

  function registerHookComp(options, ccClassKey) {
    var _options = getRegisterOptions(options);

    if (isFn(_options.state)) {
      _options = Object.assign({}, _options);
      _options.state = _options.state();
    }

    function buildCcHookComp(Dumb) {
      var _options2 = _options,
          _options2$memo = _options2.memo,
          memo = _options2$memo === void 0 ? true : _options2$memo;
      delete _options.memo;

      var getComp = function getComp() {
        return function CcHookComp(props) {
          _options.props = props;
          var ctx = useConcent(_options, ccClassKey);
          return React.createElement(Dumb, ctx.__$$mapped);
        };
      };

      var Comp = getComp();

      if (memo && React.memo) {
        return React.memo(Comp);
      } else {
        return Comp;
      }
    }

    var Dumb = _options.render;

    if (Dumb) {
      return buildCcHookComp(Dumb);
    } else {
      return function (Dumb) {
        return buildCcHookComp(Dumb);
      };
    }
  }

  /****
   * if you are sure the input state is really belong to global state, call cc.setGlobalState,
   * note! cc will filter the input state to meet global state shape and only pass the filtered state to global module
   */

  function setGlobalState (state, cb, renderKey, delay) {
    var ref = pickOneRef();
    ref.ctx.setGlobalState(state, cb, renderKey, delay);
  }

  function throwApiCallError() {
    throw new Error("api doc: cc.setState(module:string, state:object, renderKey:string | string[], delayMs?:number, skipMiddleware?:boolean, throwError?:boolean)");
  }

  function _setState$1 (module, state, renderKey, delayMs, skipMiddleware, throwError) {
    if (delayMs === void 0) {
      delayMs = -1;
    }

    if (throwError === void 0) {
      throwError = false;
    }

    if (module === undefined && state === undefined) {
      throwApiCallError();
    }

    if (typeof module !== 'string') {
      throwApiCallError();
    }

    setState(module, state, renderKey, delayMs, skipMiddleware, throwError);
  }

  function _set (moduledKeyPath, val, renderKey, delay) {
    var dispatcher = pickOneRef();
    dispatcher.ctx.set(moduledKeyPath, val, renderKey, delay);
  }

  var _getState$1 = (function (module) {
    return ccContext.store.getState(module);
  });

  var getGlobalState = ccContext.store.getGlobalState;

  var _computedValues$4 = ccContext.computed._computedValues;
  var _getGlobalComputed = (function () {
    return _computedValues$4[MODULE_GLOBAL];
  });

  var _computedValues$5 = ccContext.computed._computedValues;
  var getComputed = (function (module) {
    if (module) return _computedValues$5[module];else return _computedValues$5;
  });

  function getOneModuleCu(moduleName) {
    var moduleCuRaw = ccContext.computed._computedRaw[moduleName];
    var map = {};
    if (!moduleCuRaw) return map;
    var cuKeys = okeys(moduleCuRaw);
    cuKeys.forEach(function (key) {
      return map[key] = getComputed(moduleName)[key];
    });
    return map;
  }

  function _debugComputed (moduleName) {
    if (moduleName) return getOneModuleCu(moduleName);
    var allModules = okeys(ccContext.store._state);
    var map = {};
    allModules.forEach(function (key) {
      return map[key] = getOneModuleCu(key);
    });
    return map;
  }

  function _emit (event) {
    var _ref$ctx;

    if (!event) return;
    var ref = pickOneRef();

    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    if (ref) (_ref$ctx = ref.ctx).emit.apply(_ref$ctx, [event].concat(args));
  }

  /** @typedef {import('../types-inner').IRef} Ref */
  function _off (event, offOptions) {
    /** @type {Ref} */
    var ref = pickOneRef();
    if (ref) ref.ctx.off(event, offOptions);
  }

  /* eslint-disable camelcase */
  function getRefs (filters) {
    var ccUKey2ref = ccContext.ccUKey2ref;
    var _filters = {};
    if (typeof filters === 'string') _filters = {
      ccClassKey: filters
    };else if (isObject(filters)) _filters = filters;
    var _filters2 = _filters,
        ccClassKey = _filters2.ccClassKey,
        tag = _filters2.tag,
        moduleName = _filters2.moduleName,
        _filters2$includeNotM = _filters2.includeNotMount,
        includeNotMount = _filters2$includeNotM === void 0 ? false : _filters2$includeNotM;
    var refs = [];
    var ukeys = okeys(ccUKey2ref);
    var len = ukeys.length;

    var isEqual = function isEqual(passedVal, ctxVal) {
      if (!passedVal) return true;
      return passedVal === ctxVal;
    };

    for (var i = 0; i < len; i++) {
      /** @type Ref */
      var ref = ccUKey2ref[ukeys[i]];
      var mountStatus = ref.__$$ms;

      if (includeNotMount) {
        // allow NOT_MOUNT, MOUNTED
        if (mountStatus === UNMOUNTED) continue;
      } else {
        // only allow MOUNTED
        if (mountStatus !== MOUNTED) continue;
      }

      var ctx = ref.ctx;

      if (isEqual(ccClassKey, ctx.ccClassKey) && isEqual(tag, ctx.tag) && isEqual(moduleName, ctx.module)) {
        refs.push(ref);
      }
    }

    return refs;
  }

  var _execute = (function (filters) {
    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    var refs = getRefs(filters);
    refs.forEach(function (ref) {
      var _ref$ctx;

      if (ref.ctx.execute) (_ref$ctx = ref.ctx).execute.apply(_ref$ctx, args);
    });
  });

  var _executeAll = (function () {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var refs = getRefs();
    refs.forEach(function (ref) {
      var _ref$ctx;

      if (ref.ctx.execute) (_ref$ctx = ref.ctx).execute.apply(_ref$ctx, args);
    });
  });

  var appendState = ccContext.store.appendState;

  var _caller$1 = ccContext.reducer._caller;

  /* eslint-disable react/prop-types */

  var obView = function obView() {
    return 'miss render prop or children';
  };

  var TargetComp = function TargetComp() {
    return React.createElement('h1', {}, 'Ob component needs react ver lte 16.8');
  };

  if (React.memo) {
    TargetComp = React.memo(function (
    /** @type any */
    props) {
      var module = props.module,
          connect = props.connect,
          classKey = props.classKey,
          render = props.render,
          children = props.children;

      if (module && connect) {
        throw new Error("module, connect can not been supplied both");
      } else if (!module && !connect) {
        throw new Error("module or connect should been supplied");
      }

      var view = render || children || obView;
      var register = module ? {
        module: module
      } : {
        connect: connect
      }; // 设置为1，最小化ctx够造过程，仅附加状态数据，衍生数据、和reducer相关函数

      register.lite = 1;
      var ctx = useConcentForOb(register, classKey);
      var mr = ctx.mr,
          cr = ctx.cr,
          r = ctx.r;
      var state, computed;

      if (module) {
        state = ctx.moduleState;
        computed = ctx.moduleComputed;
      } else {
        state = ctx.connectedState;
        computed = ctx.connectedComputed;
      }

      return view([state, computed, {
        mr: mr,
        cr: cr,
        r: r
      }]);
    });
  }

  var _Ob = TargetComp;

  function _fnPayload (fn) {
    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    return [fn].concat(args);
  }

  var bindToContainer$1 = bindToContainer,
      safeGet$3 = safeGet; // for ssr

  if (typeof window === 'undefined') {
    // eslint-disable-next-line
    global && (global.window = {});
  }

  var _getRef = function _getRef(filters) {
    var refs = getRefs(filters);

    return refs[0];
  };

  var cloneModule = _cloneModule;
  var run = _run;
  var connect = _connect;
  var connectDumb = _connectDumb;
  var register$2 = register$1;
  var registerDumb$1 = registerDumb;
  var registerHookComp$1 = registerHookComp;
  var configure$1 = configure;
  var defineModule = function defineModule(conf) {
    var confCopy = Object.assign({}, conf);
    if (conf.reducer) confCopy.r = confCopy.reducer;
    return confCopy;
  };
  var setGlobalState$1 = setGlobalState;
  var setState$1 = _setState$1;
  var set = _set;
  var getState$7 = _getState$1;
  var getGlobalState$1 = getGlobalState;
  var getComputed$1 = getComputed;
  var debugComputed = _debugComputed;
  var getGlobalComputed = _getGlobalComputed;
  var emit = _emit;
  var off = _off;
  var dispatch$2 = dispatch;
  var ccContext$1 = ccContext;
  var execute = _execute;
  var executeAll = _executeAll;
  var getRefs$1 = getRefs;
  var getRef = _getRef;
  var reducer = _caller$1;
  var clearContextIfHot$1 = clearContextIfHot;
  var CcFragment$1 = CcFragment;
  var Ob = _Ob;
  var cst = _cst;
  var appendState$1 = appendState;
  var useConcent$1 = useConcent;
  var fnPayload = _fnPayload;
  var defComputed = function defComputed(fn, defOptions) {
    return makeFnDesc(fn, defOptions);
  };
  var defLazyComputed = function defLazyComputed(fn, defOptions) {
    var desc = makeFnDesc(fn, defOptions);
    desc.lazy = true;
    return desc;
  };
  var defComputedVal = function defComputedVal(val) {
    return {
      fn: function fn() {
        return val;
      },
      depKeys: []
    };
  };
  /** @type {import('./types').defWatch} */

  var defWatch = function defWatch(fn, defOptions) {
    return makeFnDesc(fn, defOptions);
  };

  var innerBindCcTo = function innerBindCcTo(custPrefix, bindTo) {
    if (!bindTo) return;
    var prefix = custPrefix ? custPrefix + "_" : '';
    var ccKey = prefix + "cc";
    bindToContainer$1(ccKey, defaultExport, bindTo);
    bindToContainer$1(prefix + "CC_CONTEXT", ccContext$1, bindTo);
    bindToContainer$1(prefix + "ccc", ccContext$1, bindTo);
    bindToContainer$1(prefix + "cccc", ccContext$1.computed._computedValues, bindTo);
    bindToContainer$1(prefix + "sss", ccContext$1.store._state, bindTo);
    return ccKey;
  };

  var ccKey = null;
  var bindCcToWindow = function bindCcToWindow(custPrefix) {
    ccKey = innerBindCcTo(custPrefix, window);
  };
  var defaultExport = {
    cloneModule: cloneModule,
    emit: emit,
    off: off,
    connect: connect,
    connectDumb: connectDumb,
    register: register$2,
    registerDumb: registerDumb$1,
    registerHookComp: registerHookComp$1,
    configure: configure$1,
    defineModule: defineModule,
    dispatch: dispatch$2,
    run: run,
    setGlobalState: setGlobalState$1,
    setState: setState$1,
    set: set,
    getGlobalState: getGlobalState$1,
    getState: getState$7,
    getComputed: getComputed$1,
    debugComputed: debugComputed,
    getGlobalComputed: getGlobalComputed,
    ccContext: ccContext$1,
    execute: execute,
    executeAll: executeAll,
    getRefs: getRefs$1,
    getRef: getRef,
    reducer: reducer,
    clearContextIfHot: clearContextIfHot$1,
    CcFragment: CcFragment$1,
    Ob: Ob,
    cst: cst,
    appendState: appendState$1,
    useConcent: useConcent$1,
    bindCcToMcc: bindCcToMcc,
    bindCcToWindow: bindCcToWindow,
    defComputed: defComputed,
    defLazyComputed: defLazyComputed,
    defComputedVal: defComputedVal,
    defWatch: defWatch,
    fnPayload: fnPayload
  };
  var multiCcContainer = null;
  var mccKey = '';
  function bindCcToMcc(key) {
    if (!multiCcContainer) {
      throw new Error('current env is not multi concent ins mode');
    }

    mccKey = key;
    var subBindTo = safeGet$3(multiCcContainer, key);
    innerBindCcTo('', subBindTo);
  }

  function avoidMultiCcInSameScope() {
    var winCc = window[ccKey] || window.cc;

    if (multiCcContainer && multiCcContainer[mccKey]) {
      winCc = multiCcContainer[mccKey].cc;
    }

    if (!winCc) {
      return;
    }

    if (winCc.ccContext && winCc.ccContext.info) {
      var existedVersion = winCc.ccContext.info.version;
      var newVersion = ccContext$1.info.version; // webpack-dev-server模式下，有些引用了concent的插件或者中间件模块，如果和当前concent版本不一致的话，会保留另外一个concent在其包下
      // 路径如 node_modules/concent-middleware-web-devtool/node_modules/concent（注，在版本一致时，不会出现此问题）
      // 这样的就相当于隐形的实例化两个concent 上下文，这是不允许的

      if (existedVersion !== newVersion) {
        throw new Error("concent ver conflict! cur[" + existedVersion + "]-new[" + newVersion + "], refresh browser or reinstall some concent-eco-lib");
      }
    }
  }

  var binded = false; // 微前端机构里，如果每个子应用都有自己的cc实例，允许用户绑定到mcc下，避免相互覆盖

  var autoBind = function autoBind() {
    if (window) multiCcContainer = window.mcc; // 延迟绑定，等待用户调用 bindCcToWindow
    // 同时检查 cc 版本问题

    setTimeout(function () {
      avoidMultiCcInSameScope();

      if (!binded) {
        binded = true;
        bindCcToWindow('');
      }
    }, 2000);
  };

  if (window) {
    autoBind();
  } else {
    // 防止某些在线IDE不能及时拿到window
    setTimeout(autoBind, 1000);
  }

  exports.cloneModule = cloneModule;
  exports.run = run;
  exports.connect = connect;
  exports.connectDumb = connectDumb;
  exports.register = register$2;
  exports.registerDumb = registerDumb$1;
  exports.registerHookComp = registerHookComp$1;
  exports.configure = configure$1;
  exports.defineModule = defineModule;
  exports.setGlobalState = setGlobalState$1;
  exports.setState = setState$1;
  exports.set = set;
  exports.getState = getState$7;
  exports.getGlobalState = getGlobalState$1;
  exports.getComputed = getComputed$1;
  exports.debugComputed = debugComputed;
  exports.getGlobalComputed = getGlobalComputed;
  exports.emit = emit;
  exports.off = off;
  exports.dispatch = dispatch$2;
  exports.ccContext = ccContext$1;
  exports.execute = execute;
  exports.executeAll = executeAll;
  exports.getRefs = getRefs$1;
  exports.getRef = getRef;
  exports.reducer = reducer;
  exports.clearContextIfHot = clearContextIfHot$1;
  exports.CcFragment = CcFragment$1;
  exports.Ob = Ob;
  exports.cst = cst;
  exports.appendState = appendState$1;
  exports.useConcent = useConcent$1;
  exports.fnPayload = fnPayload;
  exports.defComputed = defComputed;
  exports.defLazyComputed = defLazyComputed;
  exports.defComputedVal = defComputedVal;
  exports.defWatch = defWatch;
  exports.bindCcToWindow = bindCcToWindow;
  exports.bindCcToMcc = bindCcToMcc;
  exports.default = defaultExport;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
