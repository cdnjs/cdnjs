(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('react')) :
  typeof define === 'function' && define.amd ? define(['exports', 'react'], factory) :
  (factory((global.concent = {}),global.React));
}(this, (function (exports,React) { 'use strict';

  const MODULE_GLOBAL = '$$global';
  const MODULE_DEFAULT = '$$default';
  const MODULE_CC = '$$cc'; // do not consider symbol as MODULE_VOID

  const MODULE_VOID = '$$concent_void_module_624313307';
  const MODULE_CC_ROUTER = '$$CONCENT_ROUTER'; // get val from callback or event

  const AUTO_VAL = Symbol('__aval__'); // component type

  const CC_CLASS = '$$CcClass';
  const CC_HOOK = '$$CcHook'; // component ins type

  /** use CcFragment initialize a component instance in jsx directly */

  const CC_FRAGMENT = '$$CcFrag';
  /** use Ob to initialize a component instance in jsx directly */

  const CC_OB = '$$CcOb';
  /**
   * use api register、useConcent to create component firstly, 
   * then use the customized component to initialize a component instance in jsx
   */

  const CC_CUSTOMIZE = '$$CcCust';
  const CC_PREFIX = '$$Cc';
  const CC_DISPATCHER = '$$Dispatcher';
  const CCSYNC_KEY = Symbol('__for_sync_param_ccsync__');
  const SIG_FN_START = 10;
  const SIG_FN_END = 11;
  const SIG_FN_QUIT = 12;
  const SIG_FN_ERR = 13;
  const SIG_MODULE_CONFIGURED = 14;
  const SIG_STATE_CHANGED = 15;
  const SIG_ASYNC_COMPUTED_START = 30;
  const SIG_ASYNC_COMPUTED_END = 31;
  const SIG_ASYNC_COMPUTED_ERR = 32;
  const SIG_ASYNC_COMPUTED_BATCH_START = 33;
  const SIG_ASYNC_COMPUTED_BATCH_END = 34;
  const RENDER_NO_OP = 1;
  const RENDER_BY_KEY = 2;
  const RENDER_BY_STATE = 3;
  const FOR_CUR_MOD = 1;
  const FOR_ANOTHER_MOD = 2; // 暂时用不到
  // export const EFFECT_AVAILABLE = 1;
  // export const EFFECT_STOPPED = 0;

  const DISPATCH = 'dispatch';
  const SET_STATE = 'setState';
  const SET_MODULE_STATE = 'setModuleState';
  const FORCE_UPDATE = 'forceUpdate';
  const INVOKE = 'invoke';
  const SYNC = 'sync';
  const CATE_MODULE = 'module';
  const CATE_REF = 'ref';
  const FN_CU = 'computed';
  const FN_WATCH = 'watch';
  const ERR = {
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
  const ERR_MESSAGE = {
    [ERR.CC_MODULE_NAME_DUPLICATE]: 'module name duplicate!',
    [ERR.CC_MODULE_NOT_FOUND]: `module not found!`,
    [ERR.CC_DISPATCH_STRING_INVALID]: `when type param is string, it must be one of these format: (fnName)、(moduleName)/(fnName)`,
    [ERR.CC_DISPATCH_PARAM_INVALID]: `dispatch param type is invalid, it must be string or object`,
    [ERR.CC_MODULE_NOT_CONNECTED]: `module not been connected by ref`,
    [ERR.CC_CLASS_INSTANCE_KEY_DUPLICATE]: `props.ccKey duplicate`,
    [ERR.CC_STORED_KEYS_NEED_CCKEY]: 'you must explicitly specify a ccKey for ccInstance when set storedKeys!',
    [ERR.CC_CLASS_KEY_DUPLICATE]: 'ccClassKey duplicate!',
    [ERR.CC_REDUCER_NOT_A_FUNCTION]: `reducer must be a function!`
  };
  const NOT_MOUNT = 1; // 未挂载

  const MOUNTED = 2; // 已挂载未卸载

  const UNMOUNTED = 3; // 已卸载

  var cst = /*#__PURE__*/Object.freeze({
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

  const _computedValues = {
    // 辅助暴露给用户使用来获取计算结果的容器
    [MODULE_GLOBAL]: {},
    [MODULE_DEFAULT]: {},
    [MODULE_CC]: {},
    [MODULE_VOID]: {}
  };
  const _computedRawValues = {
    // 辅助存储计算结果的容器
    [MODULE_GLOBAL]: {},
    [MODULE_DEFAULT]: {},
    [MODULE_CC]: {},
    [MODULE_VOID]: {}
  };
  const _computedDep = {};
  const _computedRaw = {};
  var computedMap = {
    _computedRawValues,
    // 在 init-module-computed 时，会将key对应的值赋为经defineProperty处理过的对象
    _computedValues,
    _computedRaw,
    _computedDep,
    getRootComputedValue: () => _computedValues,
    getRootComputedDep: () => _computedDep,
    getRootComputedRaw: () => _computedRaw
  };

  /** watch section */
  const _watchDep = {};
  const _watchRaw = {};
  const watch = {
    _watchRaw,
    _watchDep,
    getRootWatchDep: () => _watchDep,
    getRootWatchRaw: () => _watchRaw
  };

  // 后续在逐步迁移其他的
  var runtimeVar = {
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
    nonObjectValueCompare: true,

    /**
     * see
     * @type {import('../types').RunOptions['ignoreUndefined']}
     */
    ignoreUndefined: false
  };

  const CU_KEY = Symbol('cuk');
  const ALCC_KEY = Symbol('allowCcPrefix');
  const UNSTART = '0';
  const START = '1';
  const END = '2';
  const FN = 'function';
  const OBJ = 'object';
  const INAF = `is not a ${FN}`;
  const INAJ = 'is not a plain json object!';
  const STR_ARR_OR_STAR = 'should be an string array or *!';

  /* eslint-disable */

  const cer = function () {
    return runtimeVar.log && logErr(...arguments);
  };

  const protoToString = Object.prototype.toString;
  function logErr() {
    console.error(...arguments);
  }
  function logWarn() {
    console.warn(...arguments);
  }
  function logNormal() {
    console.log(...arguments);
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
  } // !!!编译后的对象可能重写了toStringTag Symbol(Symbol.toStringTag): "Module"

  const objStrList = ['[object Object]', '[object Module]', '[object Map]', '[object Set]'];
  function isObject(obj) {
    if (!obj) return false; // undefined null etc...

    const str = protoToString.call(obj);
    return objStrList.includes(str);
  }
  function isArray(obj) {
    return Array.isArray(obj);
  } // isPJO is short of isPlainJsonObject

  function isPJO(obj, canBeArray) {
    if (canBeArray === void 0) {
      canBeArray = false;
    }

    const isArr = isArray(obj);
    const isObj = isObject(obj);
    return canBeArray ? isArr || isObj : isObj;
  }
  function isFn(maybeFn) {
    return typeof maybeFn === FN;
  }
  function isAsyncFn(fn, asyncKey) {
    if (!fn) return false; // @see https://github.com/tj/co/blob/master/index.js
    // obj.constructor.name === 'AsyncFunction'

    let isAsync = protoToString.call(fn) === '[object AsyncFunction]' || isFn(fn.then);

    if (isAsync === true) {
      return true;
    } // 有可能成降级编译成 __awaiter格式的了 或者 _regenerator


    const fnStr = fn.toString();

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


    if (asyncKey && runtimeVar.asyncCuKeys.includes(asyncKey)) {
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
    const getRkey = key => {
      if (!key && key !== 0) return [];
      if (isArray(key)) return key;
      return null;
    };

    let targetRenderKey = getRkey(renderKey);
    if (targetRenderKey) return targetRenderKey;
    if (typeof renderKey === 'object') targetRenderKey = getRkey(renderKey.renderKey);
    if (targetRenderKey) return targetRenderKey;
    return [renderKey]; // 是一个具体的string 或 number
  }
  function makeError(code, extraMessage) {
    let message = '';
    if (typeof code === 'string') message = code;else {
      message = ERR_MESSAGE[code] || '';
    }
    if (extraMessage) message += extraMessage;
    if (!message) message = `undefined message for code:${code}`;
    const error = new Error(message);
    error.code = code;
    return error;
  }
  function makeCuPackedValue(isLazy, result, needCompute, fn, newState, oldState, fnCtx) {
    return {
      [CU_KEY]: 1,
      needCompute,
      fn,
      newState,
      oldState,
      fnCtx,
      isLazy,
      result
    };
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
      module,
      ccClassKey,
      renderKeyClasses
    };
  } // !!! different ccClass enable own a same key

  function makeUniqueCcKey(ccClassKey, featureStr) {
    return `${ccClassKey}$${featureStr}`;
  }
  function makeHandlerKey(ccUniqueKey, eventName, identity) {
    return `${ccUniqueKey}$${eventName}$${identity}`;
  }
  function isModuleNameValid(moduleName) {
    if (!moduleName) return false;
    return /^[\$\#\&a-zA-Z0-9_-]+$/.test(moduleName);
  }
  function isModuleNameCcLike(moduleName) {
    const name = moduleName.toLowerCase();
    return name.startsWith(MODULE_CC);
  }
  function verboseInfo(info) {
    return info ? ` --verbose-info: ${info}` : '';
  }
  function ccClassDisplayName(className) {
    return `CC(${className})`;
  }
  function verifyKeys(keys1, keys2) {
    let duplicate = false,
        notArray = false,
        keyElementNotString = false;
    if (!isArray(keys1)) return {
      duplicate,
      notArray: true,
      keyElementNotString
    };
    if (!isArray(keys2)) return {
      duplicate,
      notArray: true,
      keyElementNotString
    };
    const len1 = keys1.length;
    const len2 = keys2.length;

    outLoop: for (let i = 0; i < len1; i++) {
      const tmpKey = keys1[i];

      if (typeof tmpKey !== 'string') {
        keyElementNotString = true;
        break outLoop;
      }

      for (let j = 0; j < len2; j++) {
        const tmpKey2 = keys2[j];

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
      duplicate,
      notArray,
      keyElementNotString
    };
  }
  function color(color) {
    if (color === void 0) {
      color = 'green';
    }

    return `color:${color};border:1px solid ${color}`;
  }
  function styleStr(str) {
    return `%c${str}`;
  }

  const tipStart = str => `------------ CC ${str} ------------`;

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

    if (!runtimeVar.log) return;
    console.log(tipStart('TIP'));
    console.log(`%c${msg}`, `color:${tipColor};border:1px solid ${tipColor};`);
  }
  function strictWarning(err) {
    cer(tipStart('WARNING'));
    cer(err);

    if (runtimeVar.isStrict) {
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

    let childrenObject = object[key];

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
    const arr = safeGetArray(object, key);
    noDupPush(arr, strItem);
  }
  function safeAssignObjectValue(assignTo, assignFrom) {
    okeys(assignFrom).forEach(key => {
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
    let map = container[key];
    if (!map) map = container[key] = {};
    safeAssignObjectValue(map, objectToBeenAssign);
  }
  function computeFeature(ccUniqueKey, state) {
    const stateKeys = okeys(state);
    const stateKeysStr = stateKeys.sort().join('|');
    return `${ccUniqueKey}/${stateKeysStr}`;
  }
  function randomNumber(lessThan) {
    if (lessThan === void 0) {
      lessThan = 52;
    }

    const seed = Math.random();
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
      const retainKeys = [];
      excludeKeys.forEach(key => {
        if (object.includes(key)) retainKeys.push(key);
      });
      object.length = 0;
      retainKeys.forEach(key => object.push(key));
      return;
    }

    okeys(object).forEach(key => {
      if (excludeKeys.includes(key)) {
        // do nothing
        return;
      }

      const subMap = object[key];

      if (deepClear && subMap) {
        okeys(subMap).forEach(key => delete subMap[key]);
      } else {
        if (reset) object[key] = reset;else delete object[key];
      }
    });
  }
  function okeys(obj) {
    return Object.keys(obj);
  }
  function excludeArrStringItem(arr, toExcludeStr) {
    const idx = arr.indexOf(toExcludeStr);

    if (idx > -1) {
      const arrCopy = arr.slice();
      arrCopy.splice(idx, 1);
      return arrCopy;
    } else {
      return arr;
    }
  }
  function convertToStandardEvent(e) {
    let ret = null; // avoid Warning: This synthetic event is reused for performance reasons. If you're seeing this...
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
    for (let i in a) if (!(i in b)) return true;

    for (let i in b) if (a[i] !== b[i]) return true;

    return false;
  }
  function shallowCopy(oriVal) {
    let newVal = oriVal;

    if (isObject(oriVal)) {
      newVal = Object.assign({}, oriVal);
    } else if (isArray(oriVal)) {
      newVal = [...oriVal];
    }

    return newVal;
  }
  function extractChangedState(oldState, partialNewState, moduleOpt, force) {
    let changedState = {};
    let setted = false;
    const {
      extractRefChangedState,
      extractModuleChangedState,
      nonObjectValueCompare,
      objectValueCompare
    } = runtimeVar;
    const needExtractChangedState = moduleOpt ? extractModuleChangedState : extractRefChangedState; // 非模块调用

    if (!moduleOpt) {
      if (!needExtractChangedState) return partialNewState;
      if (!nonObjectValueCompare && !objectValueCompare) return partialNewState;
    }

    if (partialNewState) {
      okeys(partialNewState).forEach(key => {
        const oldVal = oldState[key];
        const newVal = partialNewState[key];
        const valType = typeof newVal;
        let isNotEqual = true;

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
    const changed = [],
          setted = [];
    okeys(newState).forEach(k => {
      const newVal = newState[k];
      setted.push(k);
      if (newVal !== oldState[k]) changed.push(k);
    });
    return {
      changed,
      setted
    };
  }
  function removeArrElements(arr, toRemoveArr) {
    const newArr = [];
    arr.forEach(item => {
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
    let state = null;

    const commit = partialState => {
      if (!state) state = {};
      Object.assign(state, partialState);
    };

    const clear = () => state = null;

    const getFnCommittedState = () => state;

    return {
      commit,
      clear,
      getFnCommittedState
    };
  }
  function isOnlineEditor() {
    let result = false;

    if (window) {
      if (window.name === 'previewFrame' // for stackblitz
      || window.__SANDBOX_DATA__ // for codesandbox
      || window.BrowserFS // for codesandbox
      ) {
        result = true;
      }
    }

    return result;
  }
  let cachedSGSMResult = null;
  function shouldGuessStrictMode() {
    if (cachedSGSMResult === null) {
      cachedSGSMResult = isLocal() || isOnlineEditor();
    }

    return cachedSGSMResult;
  }
  function makeCallInfo(module) {
    return {
      payload: null,
      renderKey: [],
      delay: -1,
      module,
      fnName: ''
    };
  }
  function evalState(state) {
    if (state === void 0) {
      state = {};
    }

    const ret = isFn(state) ? state() : state;

    if (!isPJO(ret)) {
      throw new Error(`state ${INAJ}`);
    }

    return ret;
  }

  function _getValue(obj, keys, lastKeyIndex, keyIndex) {
    const key = keys[keyIndex];

    if (lastKeyIndex === keyIndex) {
      return obj[key];
    } else {
      return _getValue(obj[key], keys, lastKeyIndex, ++keyIndex);
    }
  }

  function getValueByKeyPath(obj, keyPath) {
    const keys = keyPath.split('.');
    return _getValue(obj, keys, keys.length - 1, 0);
  }
  function isDepKeysValid(depKeys) {
    return isFn(depKeys) || isArray(depKeys) || depKeys === '-' || depKeys === '*';
  }
  function checkDepKeys(depKeys) {
    if (depKeys && !isDepKeysValid(depKeys)) {
      throw new Error(`depKeys must be one of them(array,'*','-',fn)`);
    }
  }
  function makeFnDesc(fn, depKeysOrOpt, check) {
    if (check === void 0) {
      check = true;
    }

    // 防止显式的传递null
    const _depKeysOrOpt = depKeysOrOpt || {};

    const desc = {
      fn
    };
    const assignFrom = isDepKeysValid(_depKeysOrOpt) ? {
      depKeys: _depKeysOrOpt
    } : _depKeysOrOpt;
    check && checkDepKeys(assignFrom.depKeys);
    return Object.assign(desc, assignFrom);
  }
  const symbolTag = "[object Symbol]";

  function isObjectLike(value) {
    return typeof value == "object" && value !== null;
  }

  function isSymbol(value) {
    return typeof value === "symbol" || isObjectLike(value) && Object.prototype.toString.call(value) === symbolTag;
  }
  function delay(ms) {
    if (ms === void 0) {
      ms = 1000;
    }

    return new Promise(resolve => setTimeout(resolve, ms));
  }
  function getErrStackKeywordLoc(err, keyword, offset) {
    if (offset === void 0) {
      offset = 0;
    }

    const errStack = err.stack;
    const arr = errStack.split('\n');
    const len = arr.length;
    let curLocation = '';

    for (let i = 0; i < len; i++) {
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

  var util = /*#__PURE__*/Object.freeze({
    logErr: logErr,
    logWarn: logWarn,
    logNormal: logNormal,
    noop: noop,
    isLocal: isLocal,
    isValueNotNull: isValueNotNull,
    isObjectNotNull: isObjectNotNull,
    isObjectNull: isObjectNull,
    isBool: isBool,
    isObject: isObject,
    isArray: isArray,
    isPJO: isPJO,
    isFn: isFn,
    isAsyncFn: isAsyncFn,
    isEmptyVal: isEmptyVal,
    isKeyValid: isKeyValid,
    extractRenderKey: extractRenderKey,
    makeError: makeError,
    makeCuPackedValue: makeCuPackedValue,
    makeCuDepDesc: makeCuDepDesc,
    makeCcClassContext: makeCcClassContext,
    makeUniqueCcKey: makeUniqueCcKey,
    makeHandlerKey: makeHandlerKey,
    isModuleNameValid: isModuleNameValid,
    isModuleNameCcLike: isModuleNameCcLike,
    verboseInfo: verboseInfo,
    ccClassDisplayName: ccClassDisplayName,
    verifyKeys: verifyKeys,
    color: color,
    styleStr: styleStr,
    justWarning: justWarning,
    justTip: justTip,
    strictWarning: strictWarning,
    safeAdd: safeAdd,
    safeMinus: safeMinus,
    safeGet: safeGet,
    safeGetArray: safeGetArray,
    noDupPush: noDupPush,
    safeGetThenNoDupPush: safeGetThenNoDupPush,
    safeAssignObjectValue: safeAssignObjectValue,
    safeAssignToMap: safeAssignToMap,
    computeFeature: computeFeature,
    randomNumber: randomNumber,
    clearObject: clearObject,
    okeys: okeys,
    excludeArrStringItem: excludeArrStringItem,
    convertToStandardEvent: convertToStandardEvent,
    bindToContainer: bindToContainer,
    shallowDiffers: shallowDiffers,
    shallowCopy: shallowCopy,
    extractChangedState: extractChangedState,
    differStateKeys: differStateKeys,
    removeArrElements: removeArrElements,
    getRegisterOptions: getRegisterOptions,
    makeCommitHandler: makeCommitHandler,
    isOnlineEditor: isOnlineEditor,
    shouldGuessStrictMode: shouldGuessStrictMode,
    makeCallInfo: makeCallInfo,
    evalState: evalState,
    getValueByKeyPath: getValueByKeyPath,
    isDepKeysValid: isDepKeysValid,
    checkDepKeys: checkDepKeys,
    makeFnDesc: makeFnDesc,
    isSymbol: isSymbol,
    delay: delay,
    getErrStackKeywordLoc: getErrStackKeywordLoc,
    getVal: getVal
  });

  const defaultErrorHandler = function (err, silent) {
    if (silent === void 0) {
      silent = false;
    }

    const logFn = runtimeVar.isDebug ? logWarn : logErr; // 避免travis 发现 error 打印就导致 test 用例不通过

    logFn('found uncaught err, suggest configure an errorHandler in run options');
    logFn(err);
    if (!silent) throw err;
  };

  const rh = {
    act: null,
    immutLib: null,
    errorHandler: null,
    warningHandler: null,
    tryHandleError: (err, silent) => {
      rh.errorHandler ? rh.errorHandler(err) : defaultErrorHandler(err, silent);
    },
    tryHandleWarning: err => {
      // this kind of error will not lead to app crash, but should let developer know
      justWarning(err);
      rh.warningHandler && rh.warningHandler(err);
    }
  };

  /* eslint-disable camelcase */

  const waKey2uKeyMap = {}; // 依赖标记写入的映射，是一个实例化完成就会固化的依赖
  // 不采取一开始映射好全部waKey的形式，而是采用safeGet动态添加map映射

  const waKey2staticUKeyMap = {};

  function _mapIns(mapContainer, waKey, ccUniqueKey) {
    try {
      mapContainer[waKey][ccUniqueKey] = 1; //处于依赖状态
    } catch (err) {
      const map = {};
      map[ccUniqueKey] = 1;
      mapContainer[waKey] = map;
    }
  }

  function makeWaKey(module, stateKey) {
    return `${module}/${stateKey}`;
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
  const cUkey2depKeys = {};
  function delInsM(modStateKey, ccUniqueKey) {
    try {
      // 对抗 react 18 里的 strict 双调用模型
      if (shouldGuessStrictMode()) {
        safeGetThenNoDupPush(cUkey2depKeys, ccUniqueKey, modStateKey);
      }

      delete waKey2uKeyMap[modStateKey][ccUniqueKey];
    } catch (err) {// do nothing
    }
  }
  function mapStaticIns(module, stateKey, ccUniqueKey) {
    _mapIns(waKey2staticUKeyMap, makeWaKey(module, stateKey), ccUniqueKey);
  }
  function mapStaticInsM(modStateKey, ccUniqueKey) {
    _mapIns(waKey2staticUKeyMap, modStateKey, ccUniqueKey);
  }
  const cUkey2staticDepKeys = {};
  function delStaticInsM(modStateKey, ccUniqueKey) {
    try {
      // 对抗 react 18 里的 strict 双调用模型
      if (shouldGuessStrictMode()) {
        safeGetThenNoDupPush(cUkey2staticDepKeys, ccUniqueKey, modStateKey);
      }

      delete waKey2staticUKeyMap[modStateKey][ccUniqueKey];
    } catch (err) {// do nothing
    }
  }
  function mayRecoverDepRecord(ccUniqueKey) {
    if (shouldGuessStrictMode()) {
      const depKeys = cUkey2depKeys[ccUniqueKey]; // 恢复时顺带清理掉

      if (depKeys) {
        delete cUkey2depKeys[ccUniqueKey];
        depKeys.forEach(key => mapInsM(key, ccUniqueKey));
      }

      const staticDepKeys = cUkey2staticDepKeys[ccUniqueKey] || [];

      if (staticDepKeys) {
        delete cUkey2staticDepKeys[ccUniqueKey];
        staticDepKeys.forEach(key => mapStaticInsM(key, ccUniqueKey));
      }
    }
  }

  var waKeyMap = /*#__PURE__*/Object.freeze({
    waKey2uKeyMap: waKey2uKeyMap,
    waKey2staticUKeyMap: waKey2staticUKeyMap,
    makeWaKey: makeWaKey,
    mapIns: mapIns,
    mapInsM: mapInsM,
    delIns: delIns,
    delInsM: delInsM,
    mapStaticIns: mapStaticIns,
    mapStaticInsM: mapStaticInsM,
    delStaticInsM: delStaticInsM,
    mayRecoverDepRecord: mayRecoverDepRecord
  });

  var module2insCount = {
    [MODULE_DEFAULT]: 0,
    [MODULE_GLOBAL]: 0
  };

  const getRootState = () => ({
    [MODULE_CC]: {},
    [MODULE_VOID]: {},
    [MODULE_GLOBAL]: {},
    [MODULE_DEFAULT]: {}
  });

  const _state = getRootState();
  const _prevState = getRootState();
  const reducer = {
    _reducer: {
      [MODULE_GLOBAL]: {},
      [MODULE_CC]: {}
    },
    _caller: {},
    // _reducerRefCaller: {},//为实例准备的reducer caller
    _fnName2fullFnNames: {},
    _module2fnNames: {},
    _module2Ghosts: {}
  };
  const refs = {};
  /** @type {{value: import('../types-inner').IRef | null}} */

  const permanentDispatcherRef = {
    value: null
  };
  /**
   * 为避免cc-context文件里调用的方法和自身产生循环引用，将moduleName_stateKeys_单独拆开放置到此文件
   * 如果还有别的类似循环引用产生，都可以像moduleName_stateKeys_一样单独拆出来放置为一个文件
   */

  const moduleName2stateKeys = {
    [MODULE_DEFAULT]: []
  };

  var lifecycle = {
    _lifecycle: {
      [MODULE_DEFAULT]: {},
      [MODULE_GLOBAL]: {}
    },
    _mountedOnce: {},
    _willUnmountOnce: {}
  };

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

  let cacheArea_pickedRetKeys_ = getCacheDataContainer();

  function _wrapFn(retKey, retKey2fn, isLazy) {
    const {
      fn,
      depKeys,
      sort
    } = retKey2fn[retKey];
    return {
      retKey,
      fn,
      depKeys,
      isLazy,
      sort
    };
  } // asc sort


  const sortCb = (o1, o2) => o1.sort - o2.sort;

  function clearCachedData() {
    cacheArea_pickedRetKeys_ = getCacheDataContainer();
  } // cate module | ref
  // type computed | watch

  function pickDepFns (isBeforeMount, cate, type, depDesc, stateModule, oldState, committedState, cUkey) {
    const moduleDep = depDesc[stateModule]; // it can be refModuleDep or moduleDep

    const pickedFns = []; // 针对type module， init-module-state时，已对_computedValueOri赋值了默认cuDesc，
    // 所以此时可以安全的直接判断非关系，而不用担心 {}对象存在

    if (isObjectNull(moduleDep)) return {
      pickedFns,
      setted: [],
      changed: [],
      retKey2stateKeys: {}
    };
    const {
      retKey2fn,
      retKey2lazy,
      stateKey2retKeys,
      retKey2stateKeys,
      fnCount
    } = moduleDep;
    /** 首次调用 */

    if (isBeforeMount) {
      const retKeys = okeys(retKey2fn);
      const setted = okeys(committedState);
      const changed = setted;

      if (type === 'computed') {
        return {
          pickedFns: retKeys.map(retKey => _wrapFn(retKey, retKey2fn, retKey2lazy[retKey])).sort(sortCb),
          setted,
          changed,
          retKey2stateKeys
        };
      } // for watch


      retKeys.forEach(retKey => {
        const {
          fn,
          immediate,
          depKeys,
          sort
        } = retKey2fn[retKey];
        if (immediate) pickedFns.push({
          retKey,
          fn,
          depKeys,
          sort
        });
      });
      pickedFns.sort(sortCb);
      return {
        pickedFns,
        setted,
        changed,
        retKey2stateKeys
      };
    } // 这些目标stateKey的值发生了变化


    const {
      setted,
      changed
    } = differStateKeys(oldState, committedState);

    if (setted.length === 0) {
      return {
        pickedFns,
        setted: [],
        changed: [],
        retKey2stateKeys: {}
      };
    } //用setted + changed + module 作为键，缓存对应的pickedFns，这样相同形状的committedState再次进入此函数时，方便快速直接命中pickedFns


    const cacheKey = `${setted.join(',')}|${changed.join(',')}|${stateModule}`; // 要求用户必须在setup里静态的定义完computed & watch，动态的调用computed & watch的回调因为缓存原因不会被触发

    const tmpNode = cacheArea_pickedRetKeys_[cate][type];
    const cachePool = cUkey ? safeGet(tmpNode, cUkey) : tmpNode;
    const cachedPickedRetKeys = cachePool[cacheKey];

    if (cachedPickedRetKeys) {
      // todo, for 2.5, call checkFnByDepPath with variable depKey_pathDepKeys_
      return {
        pickedFns: cachedPickedRetKeys.map(retKey => _wrapFn(retKey, retKey2fn, retKey2lazy[retKey])),
        setted,
        changed,
        retKey2stateKeys
      };
    }

    _pickFn(pickedFns, setted, changed, retKey2fn, stateKey2retKeys, retKey2lazy, fnCount);

    cachePool[cacheKey] = pickedFns.map(v => v.retKey); // todo, for 2.5, call checkFnByDepPath with variable depKey_pathDepKeys_

    return {
      pickedFns,
      setted,
      changed,
      retKey2stateKeys
    };
  }

  function _pickFn(pickedFns, settedStateKeys, changedStateKeys, retKey2fn, stateKey2retKeys, retKey2lazy, fnCount) {
    if (settedStateKeys.length === 0) return; // 把*的函数先全部挑出来, 有key的值发生变化了或者有设值行为

    const starRetKeys = stateKey2retKeys['*'];

    if (starRetKeys) {
      const isKeyValChanged = changedStateKeys.length > 0;
      starRetKeys.forEach(retKey => {
        const {
          fn,
          compare,
          depKeys,
          sort
        } = retKey2fn[retKey];
        const toPush = {
          retKey,
          fn,
          depKeys,
          isLazy: retKey2lazy[retKey],
          sort
        };

        if (compare) {
          if (isKeyValChanged) pickedFns.push(toPush);
          return;
        }

        pickedFns.push(toPush);
      });
    } // 继续遍历settedStateKeys, 挑选出剩余的目标fn（非*相关的）


    if (pickedFns.length < fnCount) {
      const retKey_picked_ = {};
      const len = settedStateKeys.length;

      for (let i = 0; i < len; i++) {
        const stateKey = settedStateKeys[i];
        const retKeys = stateKey2retKeys[stateKey]; //发生变化了的stateKey不一定在依赖列表里

        if (!retKeys) continue;
        retKeys.forEach(retKey => {
          //没有挑过的方法才挑出来
          if (!retKey_picked_[retKey]) {
            const {
              fn,
              compare,
              depKeys,
              sort
            } = retKey2fn[retKey];
            let canPick;
            const isValChanged = changedStateKeys.includes(stateKey); // 检测出发生了变化，就一定pick

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
                retKey,
                fn,
                depKeys,
                isLazy: retKey2lazy[retKey],
                sort
              });
            }
          }
        });
        if (pickedFns.length === fnCount) break;
      }
    }

    pickedFns.sort(sortCb);
  }

  const UNDEFINED = void 0; // set成功则返回true

  function setPartialState(partialState, state, key) {
    const value = state[key];

    if (runtimeVar.ignoreUndefined && value === UNDEFINED) {
      return false;
    }

    partialState[key] = value;
    return true;
  } // missKeyInState: true 代表 state 含有 stateKeys 里不包含的 key， false 则不含


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

    let partialState = {},
        ignoredStateKeys = [],
        missKeyInState = false;

    if (!isPJO(state)) {
      return {
        partialState: returnNullIfEmpty ? null : partialState,
        isStateEmpty: true,
        ignoredStateKeys,
        missKeyInState
      };
    }

    let isStateEmpty = true;
    const committedStateKeys = okeys(state);
    const cLen = committedStateKeys.length;
    const sLen = stateKeys.length;

    if (cLen > sLen) {
      missKeyInState = true;
      stateKeys.forEach(key => {
        if (setPartialState(partialState, state, key)) isStateEmpty = false;
      });
      if (needIgnored) ignoredStateKeys = removeArrElements(committedStateKeys, stateKeys);
    } else {
      committedStateKeys.forEach(key => {
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
      partialState,
      isStateEmpty,
      ignoredStateKeys,
      missKeyInState
    };
  }

  const {
    isModuleNameCcLike: isModuleNameCcLike$1,
    isModuleNameValid: isModuleNameValid$1,
    verboseInfo: vbi,
    makeError: makeError$1,
    okeys: okeys$1
  } = util;
  /** 检查模块名，名字合法，就算检查通过 */

  function checkModuleNameBasically(moduleName, innerParams) {
    if (innerParams === void 0) {
      innerParams = {};
    }

    if (!isModuleNameValid$1(moduleName)) {
      throw new Error(`module[${moduleName}] writing is invalid!`);
    } // moduleName will be named starting with $cc while calling createModule


    if (innerParams[ALCC_KEY] === 1) return;

    if (isModuleNameCcLike$1(moduleName)) {
      throw new Error(`'$$cc' is a built-in module name`);
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

    const _vbiMsg = vbiMsg || `module[${moduleName}]`;

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
      throw new Error(`module[${moduleName}]'s state ${INAJ}`);
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

    throw new Error(`storedKeys type err, ${STR_ARR_OR_STAR}`);
  }
  function checkKeys(module, keys, keyShouldBeModuleStateKey, extraInfo) {
    if (keyShouldBeModuleStateKey === void 0) {
      keyShouldBeModuleStateKey = true;
    }

    if (extraInfo === void 0) {
      extraInfo = '';
    }

    const keyword = keyShouldBeModuleStateKey ? '' : 'not ';

    const keyTip = (name, keyword) => `${extraInfo}key[${name}] must ${keyword}be a module state key`;

    const moduleStateKeys = moduleName2stateKeys[module] || [];
    keys.forEach(sKey => {
      const keyInModuleState = moduleStateKeys.includes(sKey);

      const throwErr = () => {
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
    const invalidConnect = `param connect is invalid,`;

    const invalidConnectItem = m => `${invalidConnect} module[${m}]'s value ${STR_ARR_OR_STAR}`;

    okeys$1(connectSpec).forEach(m => {
      checkModuleName(m, false);
      const val = connectSpec[m];

      if (typeof val === 'string') {
        if (val !== '*' && val !== '-') throw new Error(invalidConnectItem(m));
      } else if (!Array.isArray(val)) {
        throw new Error(invalidConnectItem(m));
      } else {
        checkKeys(m, val, true, `connect module[${m}] invalid,`);
      }
    });
  }
  function checkRenderKeyClasses(regRenderKeyClasses) {
    if (!Array.isArray(regRenderKeyClasses) && regRenderKeyClasses !== '*') {
      throw new Error(`renderKeyClasses type err, it ${STR_ARR_OR_STAR}`);
    }
  }

  /** @typedef {import('../../types').ICtxBase} ICtxBase */
  const ignoreIt = `if this message doesn't matter, you can ignore it`;
  /****
   * 尽可能优先找module的实例，找不到的话在根据mustBelongToModule值来决定要不要找其他模块的实例
   * pick one ccInstance ref randomly
   */

  function pickOneRef (module, mustBelongToModule) {
    if (mustBelongToModule === void 0) {
      mustBelongToModule = false;
    }

    const ccUKey2ref = refs;
    let oneRef = null;

    if (module) {
      checkModuleName(module, false);
      const ukeys = okeys(ccUKey2ref);
      const len = ukeys.length;

      for (let i = 0; i < len; i++) {
        /** @type {{ctx:ICtxBase}} */
        const ref = ccUKey2ref[ukeys[i]];

        if (ref.ctx.module === module) {
          oneRef = ref;
          break;
        }
      }
    }

    if (!oneRef) {
      if (mustBelongToModule) {
        throw new Error(`[[pickOneRef]]: no ref found for module[${module}]!,${ignoreIt}`);
      } else {
        oneRef = permanentDispatcherRef.value;
      }
    }

    return oneRef;
  }

  const {
    makeUniqueCcKey: makeUniqueCcKey$1,
    justWarning: justWarning$1
  } = util;

  const resolve = () => Promise.resolve();

  function ccDispatch (action, payLoadWhenActionIsString, rkOrOptions, delay$$1, options) {
    if (rkOrOptions === void 0) {
      rkOrOptions = '';
    }

    if (options === void 0) {
      options = {};
    }

    const {
      ccClassKey,
      ccKey,
      throwError = true,
      refModule = ''
    } = options;

    if (action === undefined && payLoadWhenActionIsString === undefined) {
      throw new Error(`params type error`);
    }

    let dispatchFn,
        module = '',
        fnName = '';

    try {
      if (ccClassKey && ccKey) {
        const uKey = makeUniqueCcKey$1(ccClassKey, ccKey);
        const targetRef = refs[uKey];

        if (!targetRef) {
          justWarning$1(`no ref found for ccUniqueKey:${uKey}!`);
          return resolve();
        } else {
          dispatchFn = targetRef.ctx.dispatch;
        }
      } else {
        if (typeof action == 'string') {
          if (action.includes('/')) {
            const [m, name] = action.split('/');
            module = m;
            fnName = name;
          } else {
            fnName = action;
          }
        }

        let ref;

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
        const fullFnNames = reducer._fnName2fullFnNames[fnName];
        if (!fullFnNames) return;
        const tasks = [];
        fullFnNames.forEach(fullFnName => {
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
      get: function (target, key) {
        /**
         * 第一个isKeyValid判断，是为了防止误使用state算computed value，而触发了其他的key收集
         *   ctx.computed('count', n => {
         *     return n * 2;// 正确写法本应该是 return n.count * 2
         *    })
         *   // 本应该是 n.count * 2, 写为 n * 2 后，触发的key分别为
         *   // valueOf, toString, Symbol(...)
         */
        if (isKeyValid(target, key) && !depKeys.includes(key)) depKeys.push(key);
        const val = target[key]; // TODO 2_level_key_collect

        return val;
      },
      // set: function (target, key) {
      set: function () {
        // do nothing，拒绝用户在computed回调里修改state的值
        return true;
      }
    });
  }

  const sigs = [SIG_FN_START, SIG_FN_END, SIG_FN_QUIT, SIG_FN_ERR, SIG_MODULE_CONFIGURED, SIG_STATE_CHANGED, SIG_ASYNC_COMPUTED_START, SIG_ASYNC_COMPUTED_END, SIG_ASYNC_COMPUTED_ERR, SIG_ASYNC_COMPUTED_BATCH_START, SIG_ASYNC_COMPUTED_BATCH_END];
  const sig2cbs = {};
  sigs.forEach(sig => sig2cbs[sig] = []);

  function _pushSigCb(sigMap, sigOrSigs, cb) {
    function pushCb(sig, cb) {
      const cbs = sigMap[sig];

      if (cb) {
        cbs.push(cb);
      } else {
        console.warn(`invalid sig[${sig}]`);
      }
    }

    if (Array.isArray(sigOrSigs)) {
      sigOrSigs.forEach(sig => {
        pushCb(sig, cb);
      });
    } else {
      pushCb(sigOrSigs, cb);
    }
  }

  function clearCbs() {
    sigs.forEach(sig => sig2cbs[sig].length = 0);
  }
  function send(sig, payload) {
    const cbs = sig2cbs[sig];
    cbs.forEach(cb => {
      try {
        cb({
          sig,
          payload
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

  /* eslint-disable */
  const {
    waKey2uKeyMap: waKey2uKeyMap$1,
    waKey2staticUKeyMap: waKey2staticUKeyMap$1
  } = waKeyMap;

  function triggerReRender(ref) {
    if (!ref) return; // 对于挂载好了还未卸载的实例，才有必要触发重渲染

    if (ref.__$$ms === MOUNTED) {
      const refCtx = ref.ctx;

      refCtx.__$$ccForceUpdate();
    }
  }

  async function executeCuInfo(cuInfo) {
    try {
      const fns = cuInfo.fns;
      const len = fns.length;
      if (len === 0) return;
      await delay();
      const {
        sourceType,
        ref,
        module,
        fnAsync,
        fnRetKeys,
        cuRetContainer,
        retKey2stateKeys
      } = cuInfo;
      const isModule = sourceType !== CATE_REF;
      let stateKeys = [];
      let curRetKey = '';

      try {
        send(SIG_ASYNC_COMPUTED_BATCH_START, {
          module
        });

        for (let i = 0; i < len; i++) {
          const fn = fns[i];
          const isAsync = fnAsync[i];
          const retKey = fnRetKeys[i];
          curRetKey = retKey;
          let ret;
          send(SIG_ASYNC_COMPUTED_START, {
            module,
            retKey
          });

          if (isAsync) {
            ret = await fn();
          } else {
            ret = fn();
          }

          cuRetContainer[retKey] = makeCuPackedValue(false, ret);
          send(SIG_ASYNC_COMPUTED_END, {
            module,
            retKey
          });
          if (isModule) stateKeys = stateKeys.concat(retKey2stateKeys[retKey]);
        }

        send(SIG_ASYNC_COMPUTED_BATCH_END, {
          module
        });
      } catch (err) {
        if (isModule) {
          const toSend = {
            module,
            err,
            retKey: curRetKey
          };
          send(SIG_ASYNC_COMPUTED_ERR, toSend);
          send(SIG_ASYNC_COMPUTED_BATCH_END, toSend);
        }

        rh.tryHandleError(err);
      }

      if (isModule) {
        //  让所有正确执行完毕的计算函数关联到的实例能够被触发重渲染
        stateKeys = Array.from(new Set(stateKeys));
        const uKeyMap = {};
        stateKeys.forEach(stateKey => {
          const waKey = `${module}/${stateKey}`; // 利用assign不停的去重

          Object.assign(uKeyMap, waKey2uKeyMap$1[waKey], waKey2staticUKeyMap$1[waKey]);
        });
        const uKeys = okeys(uKeyMap);
        uKeys.forEach(refKey => {
          triggerReRender(refs[refKey]);
        });
      } else {
        triggerReRender(ref);
      }
    } catch (err) {
      rh.tryHandleError(err);
    }
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


    const refCtx = ref.ctx;

    if (refCtx.__$$inBM === true // 还处于beforeMount步骤
    || refCtx.__$$renderStatus === START) {
      const ccUniqueKey = refCtx.ccUniqueKey;
      const waKey = makeWaKey(module, key); // 未挂载时，是refWatch 或者 refComputed 函数里读取了moduleComputed的值间接推导出来的依赖stateKey
      // 则写到static块里，防止依赖丢失

      if (refCtx.__$$inBM === true) {
        refCtx.__$$staticWaKeys[waKey] = 1;
        return;
      }

      if (!isForModule) {
        // for ref connect
        // 处于非自动收集状态则忽略，依赖在buildRefCtx时已记录
        if (refCtx.connect[module] !== '-') return;
        const {
          __$$curConnWaKeys,
          __$$compareConnWaKeys,
          __$$nextCompareConnWaKeys,
          __$$nextCompareConnWaKeyCount
        } = refCtx; // TODO: 考虑用 waKey 写在map里

        mapInsM(waKey, ccUniqueKey);
        __$$curConnWaKeys[module][key] = 1;
        __$$compareConnWaKeys[module][key] = 1;
        const tmpMap = __$$nextCompareConnWaKeys[module];

        if (!tmpMap[key]) {
          tmpMap[key] = 2;
          __$$nextCompareConnWaKeyCount[module]++;
        }
      } else {
        // for ref module
        // 处于非自动收集状态则忽略
        if (refCtx.watchedKeys !== '-') return;
        const {
          __$$curWaKeys,
          __$$compareWaKeys,
          __$$nextCompareWaKeys
        } = refCtx;
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
  const hasOwnProperty = Object.prototype.hasOwnProperty;
  const {
    _computedRawValues: _computedRawValues$1,
    _computedValues: _computedValues$1,
    _computedRaw: _computedRaw$1,
    _computedDep: _computedDep$1
  } = computedMap; // refModuleCuDep 来自 ref.ctx.computedDep

  function writeRetKeyDep(refModuleCuDep, ref, module, retKey, isForModule) {
    // 所有组件都自动连接到$$global模块，但是未必有对$$global模块的retKey依赖
    const retKey2stateKeys = refModuleCuDep.retKey2stateKeys || {};
    const stateKeys = retKey2stateKeys[retKey] || [];
    stateKeys.forEach(stateKey => {
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
    let oriCuContainer, oriCuObContainer, computedRaw;

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
      get: function (target, otherRetKey) {
        const fnInfo = `${sourceType} ${fnType} retKey[${retKey}]`; // 1 防止用户从 cuVal读取不存在的key
        // 2 首次按序执行所有的computed函数时，前面的计算函数取取不到后面的计算结果，收集不到依赖，所以这里强制用户要注意计算函数的书写顺序

        if (hasOwnProperty.call(oriCuContainer, otherRetKey)) {
          if (isAsyncFn(computedRaw[otherRetKey], `${module}/${otherRetKey}`)) {
            referInfo.hasAsyncCuRefer = true; // 不允许读取异步计算函数结果做二次计算，隔离一切副作用，确保依赖关系简单和纯粹
            // throw new Error(`${fnInfo},  get an async retKey[${otherRetKey}] from cuVal is not allowed`);
          }

          retKeys.push(otherRetKey);
        } else {
          justWarning(`${fnInfo} get cuVal invalid retKey[${otherRetKey}]`);
        } // 从已定义 defineProperty 的计算结果容器里获取结果


        return oriCuObContainer[otherRetKey];
      },
      set: function () {
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

    const ctx = ref.ctx;
    const moduleCuRetContainer = _computedValues$1[module]; // 注意isRefCu为true时，beforeMount时做了相关的赋值操作，保证了读取ref.ctx下目标属性是安全的

    const oriCuContainer = isRefCu ? ctx.refComputedRawValues : _computedRawValues$1[module];
    if (!oriCuContainer) return {}; // refComputed 的 cuRetWrapper 是在setup执行完毕后会被替换成填充满属性的新引用 refComputedValues
    // 见 before-mount里: ctx.refComputedValues =....
    // 所以需要在get时现取，而不能在闭包作用域内提前缓存起来反复使用

    const getCuRetContainer = () => {
      return isRefCu ? ctx.refComputedValues : moduleCuRetContainer;
    }; // 为普通的计算结果容器建立代理对象


    return new Proxy(oriCuContainer, {
      get: function (target, retKey) {
        // 防止用户从 cuVal读取不存在的key
        if (hasOwnProperty.call(oriCuContainer, retKey)) {
          // 由refComputed.{keyName}取值触发
          if (isRefCu) {
            const computedDep = ref.ctx.computedDep;
            okeys(computedDep).forEach(m => {
              writeRetKeyDep(computedDep[m], ref, m, retKey, isForModule);
            });
          } else {
            // 由moduleComputed.{keyName} 或者 connectedComputed.{moduleName}.{keyName} 取值触发
            writeRetKeyDep(_computedDep$1[module], ref, module, retKey, isForModule);
          }
        } // 从已定义defineProperty的计算结果容器里获取结果


        const cuRetWrapper = getCuRetContainer();
        return cuRetWrapper[retKey];
      },
      set: function (target, retKey, value) {
        target[retKey] = value;
        return true;
      }
    });
  }

  /* eslint-disable camelcase */

  const noCommit = (tip, asIs) => justWarning(`${tip} call commit or commitCu as it is ${asIs}`); // 记录某个cuRetKey引用过哪些staticCuRetKeys
  // 直接引用或者间接引用过staticCuRetKey都会记录在列表内


  let modCuRetKey_referStaticCuRetKeys_ = {};
  let refCuRetKey_referStaticCuRetKeys_ = {};

  function getCuRetKeyRSListMap(sourceType, module, ccUniqueKey) {
    if (sourceType == CATE_MODULE) {
      return safeGet(modCuRetKey_referStaticCuRetKeys_, module);
    } else {
      return safeGet(refCuRetKey_referStaticCuRetKeys_, ccUniqueKey);
    }
  }

  function getCuRetKeyRSList(cuRetKey, sourceType, module, ccUniqueKey) {
    const map = getCuRetKeyRSListMap(sourceType, module, ccUniqueKey);
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
    let modDep, cuModDep;

    if (sourceType === CATE_REF) {
      // 由ref发起调用，refCtx是肯定有值的
      const computedDep = refCtx.computedDep;
      const depDesc = fnType === FN_CU ? computedDep : refCtx.watchDep;
      cuModDep = safeGet(computedDep, stateModule);
      modDep = safeGet(depDesc, stateModule);
    } else {
      const cuDep = computedMap._computedDep;
      const depDesc = fnType === FN_CU ? cuDep : watch._watchDep;
      cuModDep = safeGet(cuDep, stateModule);
      modDep = safeGet(depDesc, stateModule);
    }

    const stateKey2retKeys = safeGet(modDep, 'stateKey2retKeys');
    const retKey2stateKeys = safeGet(modDep, 'retKey2stateKeys');

    const updateRelationship = depKeys => {
      const stateKeys = safeGetArray(retKey2stateKeys, retKey);
      depKeys.forEach(sKey => {
        const retKeys = safeGetArray(stateKey2retKeys, sKey); // 此处判断一下retKeys，谨防用户直接在computed里操作obState, 这里拿到的sKey是一堆原型链上key，如`valueOf`等

        if (Array.isArray(retKeys) && !retKeys.includes(retKey)) retKeys.push(retKey);
        if (!stateKeys.includes(sKey)) stateKeys.push(sKey);
      });
    };

    if (isKeysDep) {
      // keys is depKeys
      updateRelationship(keys);
    } else {
      // keys is retKeys, 将retKeys里各自retKey的stateKeys转移给目标retKey
      keys.forEach(sourceRetKey => {
        // 这里取的是cu模块的retKey_stateKeys_
        const retKey2stateKeys = safeGet(cuModDep, 'retKey2stateKeys');
        const sourceStateKeys = retKey2stateKeys[sourceRetKey] || [];
        updateRelationship(sourceStateKeys);
      });
    }
  }

  function getRetKeyFnMap(refCtx, sourceType, stateModule) {
    // 始终从_computedDep 取retKey_fn_，来判断commitCu提交的retKey是否合法
    if (sourceType === CATE_REF) {
      return refCtx.computedRetKeyFns;
    } else {
      const moduleDep = computedMap._computedDep[stateModule] || {};
      return moduleDep.retKey2fn || {};
    }
  }

  function mapRSList(cuRetKey, referCuRetKeys, refCtx, ccUniqueKey, sourceType, stateModule) {
    const cuRetKey_referStaticCuRetKeys_ = getCuRetKeyRSListMap(cuRetKey, sourceType, stateModule, ccUniqueKey);
    const retKey2fn = getRetKeyFnMap(refCtx, sourceType, stateModule);
    const referStaticCuRetKeys = safeGetArray(cuRetKey_referStaticCuRetKeys_, cuRetKey);
    referCuRetKeys.forEach(referCuRetKey => {
      const fnDesc = retKey2fn[referCuRetKey]; // 直接引用

      if (fnDesc.isStatic) {
        referStaticCuRetKeys.push(referCuRetKey);
      } else {
        const tmpRSList = safeGetArray(cuRetKey_referStaticCuRetKeys_, referCuRetKey); // 把引用的referCuRetKey对应的staticCuRetKey列表记录到当前cuRetKey的staticCuRetKey列表记录上
        // 因为computed函数是严格按需执行的，所以此逻辑能够成立

        tmpRSList.forEach(staticCuRetKey => noDupPush(referStaticCuRetKeys, staticCuRetKey));
      }
    });
  }

  const STOP_FN = Symbol('sf'); // fnType: computed watch
  // sourceType: module ref
  // initialDeltaCommittedState 会在整个过程里收集所有的提交状态

  function executeDepFns(ref, stateModule, refModule, oldState, finder, committedState, initialNewState, initialDeltaCommittedState, callInfo, isFirstCall, fnType, sourceType, computedContainer, mergeToDelta) {
    if (ref === void 0) {
      ref = {};
    }

    if (mergeToDelta === void 0) {
      mergeToDelta = true;
    }

    const refCtx = ref.ctx;
    const ccUniqueKey = refCtx ? refCtx.ccUniqueKey : ''; // while循环结束后，收集到的所有的新增或更新state

    const committedStateInWhile = {};
    const nextTickCuInfo = {
      sourceType,
      ref,
      module: stateModule,
      fns: [],
      fnAsync: [],
      fnRetKeys: [],
      cuRetContainer: computedContainer
    };
    let whileCount = 0;
    let curStateForComputeFn = committedState;
    let hasDelta = false;

    while (curStateForComputeFn) {
      whileCount++; // 因为beforeMountFlag为true的情况下，finder里调用的pickDepFns会挑出所有函数，
      // 这里必需保证只有第一次循环的时候取isFirstCall的实际值，否则一定取false，（要不然就陷入无限死循环，每一次都是true，每一次都挑出所有dep函数执行）

      const beforeMountFlag = whileCount === 1 ? isFirstCall : false;
      const {
        pickedFns,
        setted,
        changed,
        retKey2stateKeys
      } = finder(curStateForComputeFn, beforeMountFlag);
      nextTickCuInfo.retKey2stateKeys = retKey2stateKeys;
      if (!pickedFns.length) break;
      const {
        commit,
        getFnCommittedState
      } = makeCommitHandler();
      const {
        commit: commitCu,
        getFnCommittedState: getRetKeyCu,
        clear: clearCu
      } = makeCommitHandler();
      pickedFns.forEach(_ref => {
        let {
          retKey,
          fn,
          depKeys,
          isLazy
        } = _ref;
        const keyInfo = `${sourceType} ${fnType} retKey[${retKey}]`;
        const tip = `${keyInfo} can't`; // 异步计算的初始值

        let initialVal = '';
        let isInitialValSetted = false;

        const innerDispatch = (immediate, fnOrFnStr, payload, dispatchOptions) => {
          return new Promise(resolve => {
            const d = () => ccDispatch(fnOrFnStr, payload, dispatchOptions, 0, {
              refModule: stateModule
            });

            if (immediate) resolve(d());else setTimeout(() => resolve(d()), 0);
          });
        };

        const fnCtx = {
          retKey,
          callInfo,
          isFirstCall,
          commit,
          commitCu,
          setted,
          changed,
          // 在sourceType为module时, 如果非首次计算
          // computedContainer只是一个携带defineProperty的计算结果收集容器，没有收集依赖行为
          cuVal: computedContainer,
          committedState: curStateForComputeFn,
          deltaCommittedState: initialDeltaCommittedState,
          stateModule,
          refModule,
          oldState,
          refCtx,
          dispatch: function () {
            for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
              args[_key] = arguments[_key];
            }

            return innerDispatch(false, ...args);
          },
          dispatchImmediate: function () {
            for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
              args[_key2] = arguments[_key2];
            }

            return innerDispatch(true, ...args);
          },
          setInitialVal: () => {
            beforeMountFlag && justWarning(`non async ${keyInfo} call setInitialVal is unnecessary`);
          }
        }; // 循环里的首次计算且是自动收集状态，注入代理对象，收集计算&观察依赖

        const needCollectDep = beforeMountFlag && depKeys === '-'; // 用户通过cuVal读取其他计算结果时，记录cuRetKeys，用于辅助下面计算依赖

        const collectedCuRetKeys = []; // 读取newState时，记录stateKeys，用于辅助下面计算依赖

        const collectedDepKeys = []; // 对于computed，首次计算时会替换为obContainer用于收集依赖
        // !!!对于watch，immediate为true才有机会替换为obContainer收集到依赖

        const referInfo = {
          hasAsyncCuRefer: false
        };

        if (needCollectDep) {
          // 替换cuVal，以便动态的收集到computed&watch函数里读取cuVal时计算相关依赖
          fnCtx.cuVal = getSimpleObContainer(retKey, sourceType, fnType, stateModule, refCtx, collectedCuRetKeys, referInfo);
        }

        if (fnType === FN_CU) {
          const isCuFnAsync = isAsyncFn(fn, `${stateModule}/${retKey}`);

          if (isLazy || isCuFnAsync) {
            // lazyComputed 和 asyncComputed 不能调用commit commitCu，以隔绝副作用
            const asIs = isLazy ? 'lazy' : 'async computed';

            fnCtx.commit = () => noCommit(tip, asIs);

            fnCtx.commitCu = fnCtx.commit;
            if (isCuFnAsync) fnCtx.setInitialVal = val => {
              initialVal = val;
              isInitialValSetted = true; // 这里阻止异步计算函数的首次执行，交给executeAsyncCuInfo去触发

              if (beforeMountFlag) throw STOP_FN;
            };
          }

          if (isLazy) {
            computedContainer[retKey] = makeCuPackedValue(isLazy, null, true, fn, initialNewState, oldState, fnCtx);
          } else {
            let newStateArg = initialNewState,
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


            let computedRet; // 异步函数首次执行时才去调用它，仅为了收集依赖

            if (isCuFnAsync) {
              if (beforeMountFlag) {
                fn(newStateArg, oldStateArg, fnCtx).catch(err => {
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
                  throw new Error(`async ${keyInfo} forget call setInitialVal`);
                }

                computedRet = initialVal;
              } else {
                // 不做任何新的计算，还是赋值原来的结果
                // 新的结果等待 asyncComputedMgr 来计算并触发相关实例重渲染
                computedRet = computedContainer[retKey];
              } // 替换掉setInitialVal，使其失效


              fnCtx.setInitialVal = noop;

              fnCtx.commit = () => noCommit(tip, 'async computed or it refers async computed ret');

              fnCtx.commitCu = fnCtx.commit; // 安排到nextTickCuInfo里，while结束后单独触发它们挨个按需计算

              nextTickCuInfo.fns.push(() => fn(newStateArg, oldStateArg, fnCtx));
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
          let tmpInitialNewState = initialNewState;
          let tmpOldState = oldState; // 首次触发watch时，才传递ob对象，用于收集依赖

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
          collectedDepKeys.forEach(key => refCtx.__$$staticWaKeys[makeWaKey(stateModule, key)] = 1); // 注：refWatch直接读取了moduleComputed 或者 connectedComputed的值时也收集到了依赖
          // 逻辑在updateDep里判断__$$isBM来确定是不是首次触发
        } // 对于模块计算过程，fn里调用committedCu，computedContainer是moduleComputed结果容器，
        // 对于实例计算过程，fn里调用committedCu来说，computedContainer是refComputed结果容器
        // 每一个retKey返回的committedCu都及时处理掉，因为下面setStateKeyRetKeysMap需要对此时的retKey写依赖


        const committedCuRet = getRetKeyCu();

        if (committedCuRet) {
          const retKey2fn = getRetKeyFnMap(refCtx, sourceType, stateModule);
          okeys(committedCuRet).forEach(cuRetKey => {
            // 模块计算函数里调用commitCu只能修改模块计算retKey
            // 实例计算函数里调用commitCu只能修改实例计算retKey
            const fnDesc = retKey2fn[cuRetKey];
            if (!fnDesc) justWarning(`commitCu:${tip} commit [${cuRetKey}], it is not defined`); // 由committedCu提交的值，可以统一当作非lazy值set回去，方便取的时候直接取
            else {
              // 检查提交目标只能是静态的cuRetKey
              if (fnDesc.isStatic) {
                const RSList = getCuRetKeyRSList(cuRetKey, sourceType, stateModule, ccUniqueKey);

                if (RSList.includes(cuRetKey)) {
                  // 直接或间接引用了这个cuRetKey，就不能去改变它，以避免死循环
                  justWarning(`commitCu:${tip} change [${cuRetKey}], [${retKey}] referred [${cuRetKey}]`);
                } else {
                  computedContainer[cuRetKey] = makeCuPackedValue(false, committedCuRet[cuRetKey]);
                }
              } else {
                justWarning(`commitCu:${tip} change [${cuRetKey}], it must have zero dep keys`);
              }
            }
          });
          clearCu();
        }
      }); // 这里一次性处理所有computed or watch函数提交了然后合并后的state

      curStateForComputeFn = getFnCommittedState();

      if (curStateForComputeFn) {
        // toAssign may be null
        const assignCuState = function (toAssign, mergeAssign) {
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

        const ensureCommittedState = fnCommittedState => {
          // !!! 确保实例里调用commit只能提交privState片段，模块里调用commit只能提交moduleState片段
          // !!! 同时确保privState里的key是事先声明过的，而不是动态添加的
          const stateKeys = sourceType === 'ref' ? refCtx.privStateKeys : moduleName2stateKeys[stateModule];
          const {
            partialState,
            ignoredStateKeys
          } = extractStateByKeys(fnCommittedState, stateKeys, true);

          if (ignoredStateKeys.length) {
            const reason = `they are not ${sourceType === CATE_REF ? 'private' : 'module'} keys, fn is ${sourceType} ${fnType}`;
            justWarning(`these state keys[${ignoredStateKeys.join(',')}] are invalid, ${reason}`);
          }

          return partialState; // 返回合法的提交状态
        };

        const partialState = ensureCommittedState(curStateForComputeFn);

        if (partialState) {
          assignCuState(partialState); // watch里提交了新的片段state，再次过一遍computed、watch函数

          if (fnType === FN_WATCH) {
            // const stateKey2retKeys = getStateKeyRetKeysMap(refCtx, sourceType, stateModule);
            const computedDep = getCuDep(refCtx, sourceType, stateModule);

            const finder = (committedState, isBeforeMount) => pickDepFns(isBeforeMount, sourceType, FN_CU, computedDep, stateModule, oldState, committedState, ccUniqueKey); // 一轮watch函数执行结束，去触发对应的computed计算


            const {
              hasDelta,
              newCommittedState
            } = executeDepFns(ref, stateModule, refModule, oldState, finder, partialState, initialNewState, initialDeltaCommittedState, callInfo, false, // 再次由watch发起的computed函数查找调用，irFirstCall，一定是false
            FN_CU, sourceType, computedContainer);

            if (hasDelta) {
              // see https://codesandbox.io/s/complex-cu-watch-chain-s9wzt, 
              // 输入 cc.setState('test', {k1:Date.now()})，确保k4 watch被触发
              const validCommittedState = ensureCommittedState(newCommittedState); // 让validCommittedState合并到curStateForComputeFn里，确保下一轮循环相关watch能被computed里提交的状态触发

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
    }

    executeCuInfo(nextTickCuInfo);
    return {
      hasDelta,
      newCommittedState: committedStateInWhile
    };
  }

  /* eslint-disable camelcase */
  const {
    _computedValues: _computedValues$2
  } = computedMap;
  const {
    okeys: okeys$2,
    extractChangedState: extractChangedState$1
  } = util;

  const getDispatcher = () => permanentDispatcherRef.value;

  const setStateByModule = function (module, committedState, opts) {
    if (opts === void 0) {
      opts = {};
    }

    const {
      ref = null,
      callInfo = {},
      noSave = false,
      force
    } = opts;
    const moduleState = getState(module);
    const moduleComputedValue = _computedValues$2[module];
    const rootComputedDep = computedMap.getRootComputedDep();

    const curDepComputedFns = (committedState, isFirstCall) => pickDepFns(isFirstCall, CATE_MODULE, 'computed', rootComputedDep, module, moduleState, committedState);

    const rootWatchDep = watch.getRootWatchDep();

    const curDepWatchFns = (committedState, isFirstCall) => pickDepFns(isFirstCall, CATE_MODULE, 'watch', rootWatchDep, module, moduleState, committedState);

    const callerRef = ref || getDispatcher();
    const refModule = callerRef.module;
    const newState = Object.assign({}, moduleState, committedState);
    const deltaCommittedState = Object.assign({}, committedState);
    const {
      hasDelta: hasDeltaInCu
    } = executeDepFns(callerRef, module, refModule, moduleState, curDepComputedFns, deltaCommittedState, newState, deltaCommittedState, callInfo, false, FN_CU, CATE_MODULE, moduleComputedValue);
    const {
      hasDelta: hasDeltaInWa
    } = executeDepFns(callerRef, module, refModule, moduleState, curDepWatchFns, deltaCommittedState, newState, deltaCommittedState, callInfo, false, FN_WATCH, CATE_MODULE, moduleComputedValue);

    if (!noSave) {
      saveSharedState(module, deltaCommittedState, false, force);
    }

    return {
      hasDelta: hasDeltaInCu || hasDeltaInWa,
      deltaCommittedState
    };
  };

  const saveSharedState = function (module, toSave, needExtract, force) {
    if (needExtract === void 0) {
      needExtract = false;
    }

    let target = toSave;

    if (needExtract) {
      const {
        partialState
      } = extractStateByKeys(toSave, moduleName2stateKeys[module], true);
      target = partialState;
    }

    const moduleState = getState(module);
    const prevModuleState = getPrevState(module);
    incModuleVer(module); // 调用 extractChangedState 时会更新 moduleState

    return extractChangedState$1(moduleState, target, {
      prevStateContainer: prevModuleState,
      incStateVer: key => incStateVer(module, key)
    }, force);
  };

  const getState = module => {
    return _state[module];
  };

  const getPrevState = module => {
    return _prevState[module];
  };

  const getModuleVer = function (module) {
    if (!module) return _moduleVer;
    return _moduleVer[module];
  };

  const incModuleVer = function (module, val) {
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

  const getStateVer = function (module) {
    if (!module) return _stateVer;
    return _stateVer[module];
  };

  const incStateVer = function (module, key) {
    _stateVer[module][key]++;
  };
  /** ccContext section */
  // record state version, to let ref effect avoid endless execute
  // 1 effect里的函数再次出发当前实例渲染，渲染完后检查prevModuleState curModuleState, 对应的key值还是不一样，又再次出发effect，造成死循环
  // 2 确保引用型值是基于原有引用修改某个属性的值时，也能触发effect


  const _stateVer = {}; // 优化before-render里无意义的merge mstate导致冗余的set（太多的set会导致 Maximum call stack size exceeded）
  // https://codesandbox.io/s/happy-bird-rc1t7?file=/src/App.js concent below 2.4.18会触发

  let _moduleVer = {};
  const ccContext = {
    getDispatcher,
    isHotReloadMode: function () {
      if (ccContext.isHot) return true;
      return window && (window.webpackHotUpdate || isOnlineEditor());
    },
    runtimeVar,
    runtimeHandler: rh,
    isHot: false,
    reComputed: true,
    isStartup: false,
    moduleName2stateFn: {},
    // 映射好模块的状态所有key并缓存住，用于提高性能
    moduleName2stateKeys,
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
      appendState: function (module, state) {
        if (!moduleName2stateKeys[module]) throw new Error(`module[${module}] not configured`);
        const stateKeys = safeGetArray(moduleName2stateKeys, module);
        okeys$2(state).forEach(k => {
          if (!stateKeys.includes(k)) {
            stateKeys.push(k);
          }
        });
        ccContext.store.setState(module, state);
      },
      _state,
      _prevState,
      // 辅助effect逻辑用
      _stateVer,
      // 触发时，比较state版本，防止死循环
      getState: function (module) {
        if (module) return getState(module);else return _state;
      },
      getPrevState: function (module) {
        if (module) return getPrevState(module);else return _prevState;
      },
      getStateVer,
      getModuleVer,
      incModuleVer,
      replaceMV,
      setState: function (module, partialSharedState, options) {
        return setStateByModule(module, partialSharedState, options);
      },
      setGlobalState: function (partialGlobalState) {
        return setStateByModule(MODULE_GLOBAL, partialGlobalState);
      },
      saveSharedState,
      getGlobalState: function () {
        return _state[MODULE_GLOBAL];
      }
    },
    reducer,
    computed: computedMap,
    watch,
    refStore: {
      _state: {},
      setState: function (ccUniqueKey, partialStoredState) {
        const _state$$1 = ccContext.refStore._state;
        const fullStoredState = _state$$1[ccUniqueKey];
        const mergedState = Object.assign({}, fullStoredState, partialStoredState);
        _state$$1[ccUniqueKey] = mergedState;
      }
    },
    lifecycle,
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
    waKey2uKeyMap,
    waKey2staticUKeyMap,
    module2insCount,
    refs,
    info: {
      packageLoadTime: Date.now(),
      firstStartupTime: '',
      latestStartupTime: '',
      version: '2.19.15',
      author: 'fantasticsoul',
      emails: ['624313307@qq.com', 'zhongzhengkai@gmail.com'],
      tag: 'glory'
    },
    featureStr2classKey: {},
    userClassKey2featureStr: {},
    middlewares: [],
    plugins: [],
    pluginNameMap: {},
    localStorage: null,
    recoverRefState: noop,
    getModuleStateKeys: m => moduleName2stateKeys[m]
  };

  ccContext.recoverRefState = function () {
    const localStorage = ccContext.localStorage;
    if (!localStorage) return;
    const lsLen = localStorage.length;
    const _refStoreState = ccContext.refStore._state;

    try {
      for (let i = 0; i < lsLen; i++) {
        const lsKey = localStorage.key(i);
        if (!lsKey.startsWith('CCSS_')) return;
        _refStoreState[lsKey.substring(5)] = JSON.parse(localStorage.getItem(lsKey));
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

  const keyWord = '.checkModuleNameAndState';

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

    const arr = errStack.split('\n');
    const len = arr.length;
    let locationStr = '';

    for (let i = 0; i < len; i++) {
      const strPiece = arr[i];

      if (strPiece.includes(keyWord)) {
        const callConfigureIdx = i + 3; // 向下3句就是调用处
        // 这句话是具体调用configure的地方
        // at Module../src/components/layer/BatchOpGroup/model/index.js (http://localhost:3001/static/js/main.chunk.js:8374:55)

        const targetStrPiece = arr[callConfigureIdx];
        const arr2 = targetStrPiece.split(':');
        const lastIdx = arr2.length - 1;
        const locationStrArr = [];
        arr2.forEach((str, idx) => {
          if (idx !== lastIdx) locationStrArr.push(str);
        }); // at Module../src/components/layer/BatchOpGroup/model/index.js (http://localhost:3001/static/js/main.chunk.js:8374

        locationStr = locationStrArr.join(':');
        break;
      }
    }

    return locationStr;
  }

  const module2dupLocation = {};
  var guessDuplicate = ((err, module, tag) => {
    if (err.code === ERR.CC_MODULE_NAME_DUPLICATE && ccContext.isHotReloadMode()) {
      const dupLocation = getDupLocation(err.stack);
      const key = `${tag}|--link--|${module}`;
      const prevLocation = module2dupLocation[key];

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

  const key2findResult = {};
  function createModuleNode(moduleName) {
    key2findResult[moduleName] = {};
  }
  function getCacheKey(moduleName, sharedStateKeys, renderKeys, renderKeyClasses) {
    if (renderKeyClasses === void 0) {
      renderKeyClasses = [];
    }

    const renderKeyStr = renderKeys ? renderKeys.join(',') : '';
    const featureStr1 = sharedStateKeys.sort().join(',');
    const featureStr2 = renderKeyClasses === '*' ? '*' : renderKeyClasses.sort().join(',');
    return `${moduleName}/${featureStr1}/${renderKeyStr}/${featureStr2}`;
  }
  function getCache(moduleName, key) {
    return key2findResult[moduleName][key];
  }
  function setCache(moduleName, key, result) {
    key2findResult[moduleName][key] = result;
  }

  const {
    safeAssignToMap: safeAssignToMap$1,
    okeys: okeys$3,
    safeGet: safeGet$1
  } = util;
  function initModuleState (module, mState, moduleMustNotExisted, innerParams) {
    if (moduleMustNotExisted === void 0) {
      moduleMustNotExisted = true;
    }

    // force MODULE_VOID state as {}
    const state = module === MODULE_VOID ? {} : mState;

    try {
      checkModuleNameAndState(module, state, moduleMustNotExisted, innerParams);
    } catch (err) {
      guessDuplicate(err, module, 'state');
    }

    createModuleNode(module);
    const ccStore = ccContext.store;
    const rootState = ccStore.getState();
    const rootStateVer = ccStore.getStateVer();
    const rootModuleVer = ccStore.getModuleVer();
    const prevRootState = ccStore.getPrevState();
    safeAssignToMap$1(rootState, module, state);
    safeAssignToMap$1(prevRootState, module, state);
    rootStateVer[module] = okeys$3(state).reduce((map, key) => {
      map[key] = 1;
      return map;
    }, {});
    rootModuleVer[module] = 1; // 把_computedValueOri safeGet从init-module-computed调整到此处
    // 防止用户不定义任何computed，而只是定义watch时报错undefined

    const cu = ccContext.computed;
    safeGet$1(cu._computedDep, module, makeCuDepDesc());
    safeGet$1(cu._computedValues, module);
    safeGet$1(cu._computedRawValues, module);
    const stateKeys = okeys$3(state);
    ccContext.moduleName2stateKeys[module] = stateKeys;

    if (module === MODULE_GLOBAL) {
      const globalStateKeys = ccContext.globalStateKeys;
      stateKeys.forEach(key => {
        if (!globalStateKeys.includes(key)) globalStateKeys.push(key);
      });
    }

    ccContext.module2insCount[module] = 0;
  }

  function dispatch (action, maybePayload, rkOrOptions, delay, extra) {
    return ccDispatch(action, maybePayload, rkOrOptions, delay, extra);
  }

  function attachFnInfo(moduleName, fnName, wrappedFn, reducerFn) {
    // 给函数绑上模块名，方便dispatch可以直接调用函数时，也能知道是更新哪个模块的数据，
    wrappedFn.__stateModule = moduleName;
    wrappedFn.__fnName = fnName; // !!! 很重要，将真正的名字附记录上，否则名字是编译后的缩写名
    // AsyncFunction GeneratorFunction Function

    wrappedFn.__ctName = reducerFn.__ctName || reducerFn.constructor.name;
    wrappedFn.__isAsync = isAsyncFn(reducerFn);
  }

  function initModuleReducer (module, reducer, ghosts) {
    if (reducer === void 0) {
      reducer = {};
    }

    if (ghosts === void 0) {
      ghosts = [];
    }

    if (!isPJO(reducer)) {
      throw new Error(`module[${module}] reducer ${INAJ}`);
    }

    const {
      _reducer,
      _caller,
      _fnName2fullFnNames,
      _module2fnNames,
      _module2Ghosts // _reducerRefCaller, _lazyReducerRefCaller,

    } = ccContext.reducer; // 防止同一个reducer被载入到不同模块时，setState附加逻辑不正确

    const newReducer = Object.assign({}, reducer);
    _reducer[module] = newReducer;
    const subReducerCaller = safeGet(_caller, module); // const subReducerRefCaller = util.safeGet(_reducerRefCaller, module);

    const fnNames = safeGetArray(_module2fnNames, module);
    safeGet(_module2Ghosts, module, ghosts.slice());
    ghosts.forEach(ghostFnName => {
      if (!reducer[ghostFnName]) throw new Error(`ghost[${ghostFnName}] not exist`);
    }); // 自动附加一个setState在reducer里

    if (!newReducer.setState) {
      const injectedSetState = payload => payload;

      attachFnInfo(module, 'setState', injectedSetState, injectedSetState);
      newReducer.setState = injectedSetState;
    }

    const reducerFnNames = okeys(newReducer);
    reducerFnNames.forEach(name => {
      // avoid hot reload
      noDupPush(fnNames, name);
      const fullFnName = `${module}/${name}`;
      const list = safeGetArray(_fnName2fullFnNames, name); // avoid hot reload

      noDupPush(list, fullFnName);

      subReducerCaller[name] = (payload, renderKeyOrOptions, delay$$1) => dispatch(fullFnName, payload, renderKeyOrOptions, delay$$1);

      const reducerFn = newReducer[name];

      if (!isFn(reducerFn)) {
        throw new Error(`module[${module}] reducer[${name}] ${INAF}`);
      } else {
        let targetFn = reducerFn;

        if (reducerFn.__fnName) {
          // 将某个已载入到模块a的reducer再次载入到模块b
          targetFn = (payload, moduleState, actionCtx) => reducerFn(payload, moduleState, actionCtx);

          newReducer[name] = targetFn;
        }

        attachFnInfo(module, name, targetFn, reducerFn);
      }
    });
  }

  /** eslint-disable */
  let _currentIndex = 0;
  const letters = ['a', 'A', 'b', 'B', 'c', 'C', 'd', 'D', 'e', 'E', 'f', 'F', 'g', 'G', 'h', 'H', 'i', 'I', 'j', 'J', 'k', 'K', 'l', 'L', 'm', 'M', 'n', 'N', 'o', 'O', 'p', 'P', 'q', 'Q', 'r', 'R', 's', 'S', 't', 'T', 'u', 'U', 'v', 'V', 'w', 'W', 'x', 'X', 'y', 'Y', 'z', 'Z'];

  function genNonceStr(length) {
    if (length === void 0) {
      length = 6;
    }

    let ret = '';

    for (let i = 0; i < length; i++) {
      ret += letters[randomNumber()];
    }

    return ret;
  }

  function uuid (tag) {
    _currentIndex++;
    const nonceStr = tag || genNonceStr();
    return `${nonceStr}_${_currentIndex}`;
  }

  /** @typedef {import('../../types-inner').IRefCtx} Ctx */
  const {
    moduleName2stateKeys: moduleName2stateKeys$1,
    runtimeVar: runtimeVar$1,
    runtimeHandler,
    store
  } = ccContext;
  let sortFactor = 1;
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
    const ctx = confMeta.refCtx;
    const type = confMeta.type;

    if (cate === CATE_REF && !ctx.__$$inBM) {
      const tip = `${cate} ${type} must been called in setup block`;
      runtimeHandler.tryHandleWarning(new Error(tip));
      return;
    }

    if (!item) return;
    const itype = typeof item;

    let _descObj;

    if (itype === 'string') {
      // retKey
      if (isPJO(handler)) _descObj = {
        [item]: handler
      };else if (typeof handler === FN) _descObj = {
        [item]: makeFnDesc(handler, depKeysOrOpt)
      };
    } else if (isPJO(item)) {
      _descObj = item;
    } else if (itype === FN) {
      _descObj = item(ctx);

      if (!isPJO(_descObj)) {
        runtimeHandler.tryHandleWarning(new Error(`type of ${type} callback result must be an object`));
        return;
      }
    }

    if (!_descObj) {
      runtimeHandler.tryHandleWarning(new Error(`${cate} ${type} param type error`));
      return;
    }

    _parseDescObj(cate, confMeta, _descObj);
  }

  function _parseDescObj(cate, confMeta, descObj) {
    const {
      computedCompare,
      watchCompare,
      watchImmediate
    } = runtimeVar$1;
    const {
      tryHandleWarning
    } = runtimeHandler; // 读全局的默认值

    const defaultCompare = confMeta.type === FN_CU ? computedCompare : watchCompare;
    const callerModule = confMeta.module;
    okeys(descObj).forEach(retKey => {
      const val = descObj[retKey];
      let targetItem = val;

      if (isFn(val)) {
        targetItem = {
          fn: val
        };
      } // 有可能是空模块，如未写任何内容的computed.js文件，babel编译后为 { default: {} }
      // 所以此处需进一步判断 targetItem.fn


      if (isPJO(targetItem) && isFn(targetItem.fn)) {
        const {
          fn,
          immediate = watchImmediate,
          compare = defaultCompare,
          lazy,
          retKeyDep = true,
          // 内部传递的标记，watchModule computedModule调用时会传递
          allowSlash,
          depKeyModule
        } = targetItem; // 确保用户显示的传递null、undefined、0、都置为依赖收集状态

        let depKeys = targetItem.depKeys || '-'; // 作为动态的依赖收集函数，作用于watch函数

        if (isFn(depKeys)) {
          // ctx.watchModule 在内部会显式的传递depKeyModule
          // 而ctx.watch 是不传递 depKeyModule的，所以此处这样写
          const targetDepModule = depKeyModule || callerModule;
          const moduleState = store.getState(targetDepModule);
          const collectedDepKeys = [];
          depKeys(makeCuObState(moduleState, collectedDepKeys));
          depKeys = collectedDepKeys.map(key => `${targetDepModule}/${key}`);
        } // if user don't pass sort explicitly, computed fn will been called orderly by sortFactor


        const sort = targetItem.sort || sortFactor++;
        const fnUid = uuid('mark');

        if (depKeys === '*' || depKeys === '-') {
          // 处于依赖收集，且用户没有显式的通过设置retKeyDep为false来关闭同名依赖规则时，会自动设置同名依赖
          const mapSameName = depKeys === '-' && retKeyDep;

          const {
            pureKey,
            module
          } = _resolveKey(confMeta, callerModule, retKey, mapSameName, allowSlash);

          const err = _checkRetKeyDup(cate, confMeta, fnUid, pureKey);

          if (err) return tryHandleWarning(err); // when retKey is '/xxxx', here need pass xxxx as retKey

          _mapDepDesc(cate, confMeta, module, pureKey, fn, depKeys, immediate, compare, lazy, sort);
        } else {
          if (depKeys.length === 0) {
            const {
              pureKey,
              module
            } = _resolveKey(confMeta, callerModule, retKey, false, allowSlash); // consume retKey is stateKey


            const err = _checkRetKeyDup(cate, confMeta, fnUid, pureKey);

            if (err) return tryHandleWarning(err);

            _mapDepDesc(cate, confMeta, module, pureKey, fn, depKeys, immediate, compare, lazy, sort);
          } else {
            // ['foo/b1', 'bar/b1'] or ['b1', 'b2']
            const {
              pureKey,
              moduleOfKey
            } = _resolveKey(confMeta, callerModule, retKey, false, allowSlash);

            const stateKeyModule = moduleOfKey;

            const err = _checkRetKeyDup(cate, confMeta, fnUid, pureKey);

            if (err) return tryHandleWarning(err); // 给depKeys按module分类，此时它们都指向同一个retKey，同一个fn，但是会被分配ctx.computedDep或者watchDep的不同映射里

            const module2depKeys = {}; // ['foo/b1', 'bar/b1']

            depKeys.forEach(depKey => {
              // !!!这里只是单纯的解析depKey，不需要有映射同名依赖的行为，映射同名依赖仅发生在传入retKey的时候
              // consume depKey is stateKey
              const {
                isStateKey,
                pureKey,
                module
              } = _resolveKey(confMeta, callerModule, depKey, false, allowSlash); // ok: retKey: 'xxxx' depKeys:['foo/f1', 'foo/f2', 'bar/b1', 'bar/b2'], 
              //     some stateKey belong to foo, some belong to bar
              // ok: retKey: 'foo/xxxx' depKeys:['f1', 'f2'], all stateKey belong to foo
              // ok: retKey: 'foo/xxxx' depKeys:['foo/f1', 'foo/f2'], all stateKey belong to foo
              // both left and right include module but they are not equal, this situation is not ok!
              // not ok: retKey: 'foo/xxxx' depKeys:['foo/f1', 'foo/f2', 'bar/b1', 'bar/b2']


              if (stateKeyModule && module !== stateKeyModule) {
                throw new Error(`found slash both in retKey[${retKey}] and depKey[${depKey}], but their module is different`);
              }

              const depKeys = safeGetArray(module2depKeys, module);

              if (!isStateKey) {
                throw new Error(`depKey[${depKey}] invalid, module[${module}] doesn't include its stateKey[${pureKey}]`);
              } else {
                // 当一个实例里 ctx.computed ctx.watch 的depKeys里显示的标记了依赖时
                // 在这里需要立即记录依赖了
                _mapIns$1(confMeta, module, pureKey);
              }

              depKeys.push(pureKey);
            });
            okeys(module2depKeys).forEach(m => {
              // 指向同一个fn，允许重复
              _mapDepDesc(cate, confMeta, m, pureKey, fn, module2depKeys[m], immediate, compare, lazy, sort);
            });
          }
        }
      } else if (retKey !== 'default') {
        // default 是空模块导出导致的，这里就不打印了
        tryHandleWarning(`module[${callerModule}] ${confMeta.type} retKey[${retKey}] type error`);
      }
    });
  } // just return an error if key dup


  function _checkRetKeyDup(cate, confMeta, fnUid, retKey) {
    if (cate === CATE_REF) {
      const {
        ccUniqueKey,
        retKey2fnUid
      } = confMeta.refCtx;
      const type = confMeta.type;
      const typedRetKey = `${type}_${retKey}`;
      const mappedFn = retKey2fnUid[typedRetKey];

      if (mappedFn) {
        return new Error(`ccUKey[${ccUniqueKey}] retKey[${retKey}] duplicate in ref ${type}`);
      }

      retKey2fnUid[typedRetKey] = fnUid;
    }
  } // !!!由实例调用computed或者watch，监听同名的retKey，更新stateKey与retKey的关系映射


  function _mapSameNameRetKey(confMeta, module, retKey, isModuleStateKey) {
    const dep = confMeta.dep;
    const moduleDepDesc = safeGet(dep, module, makeCuDepDesc());
    const {
      stateKey2retKeys,
      retKey2stateKeys
    } = moduleDepDesc;
    safeGetThenNoDupPush(stateKey2retKeys, retKey, retKey);
    safeGetThenNoDupPush(retKey2stateKeys, retKey, retKey); // 记录依赖

    isModuleStateKey && _mapIns$1(confMeta, module, retKey);
  }

  function _mapIns$1(confMeta, module, retKey) {
    const ctx = confMeta.refCtx;

    if (ctx) {
      ctx.__$$staticWaKeys[makeWaKey(module, retKey)] = 1;
    }
  } // 映射依赖描述对象, module即是取的dep里的key


  function _mapDepDesc(cate, confMeta, module, retKey, fn, depKeys, immediate, compare, lazy, sort) {
    const dep = confMeta.dep;
    const moduleDepDesc = safeGet(dep, module, makeCuDepDesc());
    const {
      retKey2fn,
      stateKey2retKeys,
      retKey2lazy,
      retKey2stateKeys
    } = moduleDepDesc;
    const isStatic = Array.isArray(depKeys) && depKeys.length === 0; // 确保static computed优先优先执行

    let targetSort = sort;

    if (isStatic) {
      if (targetSort >= 0) targetSort = -1;
    } else {
      if (sort < 0) targetSort = 0;
    }

    const fnDesc = {
      fn,
      immediate,
      compare,
      depKeys,
      sort: targetSort,
      isStatic
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

    const refCtx = confMeta.refCtx;

    if (refCtx) {
      if (confMeta.type === 'computed') refCtx.hasComputedFn = true;else refCtx.hasWatchFn = true;
    } //处于自动收集依赖状态，首次遍历完计算函数后之后再去写stateKey_retKeys_, retKey2stateKeys
    // in find-dep-fns-to-execute.js setStateKeyRetKeysMap


    if (depKeys === '-') return;
    const allKeyDep = depKeys === '*';
    const targetDepKeys = allKeyDep ? ['*'] : depKeys;

    if (allKeyDep) {
      retKey2stateKeys[retKey] = moduleName2stateKeys$1[module];
    }

    targetDepKeys.forEach(sKey => {
      if (!allKeyDep) safeGetThenNoDupPush(retKey2stateKeys, retKey, sKey); //一个依赖key列表里的stateKey会对应着多个结果key

      safeGetThenNoDupPush(stateKey2retKeys, sKey, retKey);
    });
  } // 分析retKey或者depKey是不是stateKey,
  // 返回的是净化后的key


  function _resolveKey(confMeta, module, retKey, mapSameName, allowSlash) {
    if (mapSameName === void 0) {
      mapSameName = false;
    }

    let targetModule = module,
        targetRetKey = retKey,
        moduleOfKey = '';

    if (retKey.includes('/')) {
      if (allowSlash !== true) {
        throw new Error(`key[${retKey}] can't contains /, please use (computedModule,watchModule) instead of (computed, watch) if you want to operate another module`);
      }

      const [_module, _stateKey] = retKey.split('/');

      if (_module) {
        moduleOfKey = _module;
        targetModule = _module; // '/name' 支持这种申明方式
      }

      targetRetKey = _stateKey;
    }

    let stateKeys;
    const moduleStateKeys = moduleName2stateKeys$1[targetModule];

    if (targetModule === confMeta.module) {
      // 此时computed & watch观察的是对象的所有stateKeys
      stateKeys = confMeta.stateKeys;
    } else {
      // 对于属于bar的ref 配置key 'foo/a'时，会走入到此块
      stateKeys = moduleStateKeys;

      if (!stateKeys) {
        throw makeError(ERR.CC_MODULE_NOT_FOUND, verboseInfo(`module[${targetModule}]`));
      }

      if (!confMeta.connect[targetModule]) {
        throw makeError(ERR.CC_MODULE_NOT_CONNECTED, verboseInfo(`module[${targetModule}], retKey[${targetRetKey}]`));
      }
    }

    const isStateKey = stateKeys.includes(targetRetKey);

    if (mapSameName && isStateKey) {
      _mapSameNameRetKey(confMeta, targetModule, targetRetKey, moduleStateKeys.includes(targetRetKey));
    }

    return {
      isStateKey,
      pureKey: targetRetKey,
      module: targetModule,
      moduleOfKey
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
    const computedValues = {};
    okeys(computed).forEach(key => {
      // 用这个对象来存其他信息, 避免get无限递归，
      rawComputedValues[key] = makeCuPackedValue();
      Object.defineProperty(computedValues, key, {
        get: function () {
          // 防止用户传入未定义的key
          const value = rawComputedValues[key] || {};
          const {
            needCompute,
            fn,
            newState,
            oldState,
            fnCtx,
            isLazy,
            result
          } = value;

          if (!isLazy) {
            return result;
          }

          if (isLazy && needCompute) {
            const ret = fn(newState, oldState, fnCtx);
            value.result = ret;
            value.needCompute = false;
          }

          return value.result;
        },
        set: function (input) {
          const value = rawComputedValues[key];

          if (!input[CU_KEY]) {
            justWarning(`computed value can not been changed manually`);
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

  const {
    isPJO: isPJO$1
  } = util;
  function initModuleComputed (module, computed) {
    if (computed === void 0) {
      computed = {};
    }

    if (!isPJO$1(computed)) {
      throw new Error(`module[${module}] computed ${INAJ}`);
    }

    const ccComputed = ccContext.computed;
    const rootState = ccContext.store.getState();
    const rootComputedValue = ccComputed.getRootComputedValue();
    const rootComputedDep = ccComputed.getRootComputedDep();
    const rootComputedRaw = ccComputed.getRootComputedRaw(); // 在init-module-state那里已safeGet, 这里可以安全的直接读取

    const cuOri = ccComputed._computedRawValues[module];
    rootComputedRaw[module] = computed;
    const moduleState = rootState[module];
    configureDepFns(CATE_MODULE, {
      type: FN_CU,
      module,
      stateKeys: okeys(moduleState),
      dep: rootComputedDep
    }, computed);
    const d = ccContext.getDispatcher();

    const curDepComputedFns = (committedState, isBeforeMount) => pickDepFns(isBeforeMount, CATE_MODULE, FN_CU, rootComputedDep, module, moduleState, committedState);

    rootComputedValue[module] = makeCuRetContainer(computed, cuOri);
    const moduleComputedValue = rootComputedValue[module];

    try {
      executeDepFns(d, module, d && d.ctx.module, moduleState, curDepComputedFns, moduleState, moduleState, moduleState, makeCallInfo(module), true, FN_CU, CATE_MODULE, moduleComputedValue);
    } catch (err) {
      ccContext.runtimeHandler.tryHandleError(err);
    }
  }

  const {
    isPJO: isPJO$2,
    safeGet: safeGet$2,
    okeys: okeys$4
  } = util;
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
      throw new Error(`module[${module}] watch ${INAJ}`);
    }

    const rootWatchDep = ccContext.watch.getRootWatchDep();
    const rootWatchRaw = ccContext.watch.getRootWatchRaw();
    const rootComputedValue = ccContext.computed.getRootComputedValue();

    if (append) {
      const ori = rootWatchRaw[module];
      if (ori) Object.assign(ori, moduleWatch);else rootWatchRaw[module] = moduleWatch;
    } else {
      rootWatchRaw[module] = moduleWatch;
    }

    const getState = ccContext.store.getState;
    const moduleState = getState(module);
    configureDepFns(CATE_MODULE, {
      module,
      stateKeys: okeys$4(moduleState),
      dep: rootWatchDep
    }, moduleWatch);
    const d = ccContext.getDispatcher();

    const curDepWatchFns = (committedState, isFirstCall) => pickDepFns(isFirstCall, CATE_MODULE, FN_WATCH, rootWatchDep, module, moduleState, committedState);

    const moduleComputedValue = safeGet$2(rootComputedValue, module);
    executeDepFns(d, module, d && d.ctx.module, moduleState, curDepWatchFns, moduleState, moduleState, moduleState, makeCallInfo(module), true, FN_WATCH, CATE_MODULE, moduleComputedValue);
  }

  /* eslint-disable camelcase */
  let id = 0;
  /** 针对lazy的reducer调用链状态记录缓存map */

  const chainId2moduleStateMap = {};
  const chainId2isExited = {};
  const chainId2isLazy = {};
  /** 所有的reducer调用链状态记录缓存map */

  const normalChainId_moduleStateMap_ = {};
  function getChainId() {
    id++;
    return id;
  }

  function __setChainState(chainId, targetModule, partialState, targetId_msMap) {
    if (partialState) {
      let moduleStateMap = targetId_msMap[chainId];

      if (!moduleStateMap) {
        moduleStateMap = {};
        targetId_msMap[chainId] = moduleStateMap;
      }

      const state = moduleStateMap[targetModule];

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
    const moduleStateMap = getChainStateMap(chainId);
    return okeys(moduleStateMap).map(m => ({
      module: m,
      state: moduleStateMap[m]
    }));
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

  const feature2timerId = {};
  var runLater = (function (cb, feature, delay) {
    if (delay === void 0) {
      delay = 1000;
    }

    const timerId = feature2timerId[feature];
    if (timerId) clearTimeout(timerId);
    feature2timerId[feature] = setTimeout(() => {
      delete feature2timerId[feature];
      cb();
    }, delay);
  });

  function watchKeyForRef (ref, stateModule, oldState, deltaCommittedState, callInfo, isBeforeMount, mergeToDelta) {
    if (isBeforeMount === void 0) {
      isBeforeMount = false;
    }

    const refCtx = ref.ctx;
    if (!refCtx.hasWatchFn) return {
      hasDelta: false,
      newCommittedState: {}
    };
    const newState = Object.assign({}, oldState, deltaCommittedState);
    const {
      watchDep,
      module: refModule,
      ccUniqueKey,
      refComputed: computedContainer
    } = refCtx;

    const curDepWatchFns = (committedState, isBeforeMount) => pickDepFns(isBeforeMount, CATE_REF, FN_WATCH, watchDep, stateModule, oldState, committedState, ccUniqueKey); // 触发有stateKey依赖列表相关的watch函数


    const {
      hasDelta
    } = executeDepFns(ref, stateModule, refModule, oldState, curDepWatchFns, deltaCommittedState, newState, deltaCommittedState, callInfo, isBeforeMount, FN_WATCH, CATE_REF, computedContainer, mergeToDelta);
    return {
      hasDelta
    };
  }

  function computeValueForRef (ref, stateModule, oldState, deltaCommittedState, callInfo, isBeforeMount, mergeToDelta) {
    if (isBeforeMount === void 0) {
      isBeforeMount = false;
    }

    const refCtx = ref.ctx;
    if (!refCtx.hasComputedFn) return {
      hasDelta: false,
      newCommittedState: {}
    };
    const {
      computedDep,
      module: refModule,
      ccUniqueKey,
      refComputed: computedContainer
    } = refCtx;
    const newState = Object.assign({}, oldState, deltaCommittedState);

    const curDepComputedFns = (committedState, isBeforeMount) => pickDepFns(isBeforeMount, CATE_REF, FN_CU, computedDep, stateModule, oldState, committedState, ccUniqueKey); // 触发依赖stateKeys相关的computed函数


    return executeDepFns(ref, stateModule, refModule, oldState, curDepComputedFns, deltaCommittedState, newState, deltaCommittedState, callInfo, isBeforeMount, FN_CU, CATE_REF, computedContainer, mergeToDelta);
  }

  const {
    okeys: okeys$5,
    isEmptyVal: isEmptyVal$1
  } = util;
  const {
    ccUKey2ref,
    waKey2uKeyMap: waKey2uKeyMap$2,
    waKey2staticUKeyMap: waKey2staticUKeyMap$2
  } = ccContext;
  function findUpdateRefs (moduleName, partialSharedState, renderKeys, renderKeyClasses) {
    const sharedStateKeys = okeys$5(partialSharedState);
    const cacheKey = getCacheKey(moduleName, sharedStateKeys, renderKeys, renderKeyClasses);
    const cachedResult = getCache(moduleName, cacheKey);

    if (cachedResult) {
      return {
        sharedStateKeys,
        result: cachedResult
      };
    }

    const targetUKeyMap = {};
    const belongRefKeys = [];
    const connectRefKeys = [];
    sharedStateKeys.forEach(stateKey => {
      const waKey = `${moduleName}/${stateKey}`; // 利用assign不停的去重

      Object.assign(targetUKeyMap, waKey2uKeyMap$2[waKey], waKey2staticUKeyMap$2[waKey]);
    });
    const uKeys = okeys$5(targetUKeyMap);

    const putRef = (isBelong, ccUniqueKey) => {
      isBelong ? belongRefKeys.push(ccUniqueKey) : connectRefKeys.push(ccUniqueKey);
    };

    const tryMatch = (ref, toBelong) => {
      const {
        renderKey: refRenderKey,
        ccClassKey: refCcClassKey,
        ccUniqueKey,
        props
      } = ref.ctx; // 如果调用方携带renderKey发起修改状态动作，则需要匹配renderKey做更新

      if (renderKeys.length) {
        const isRenderKeyMatched = renderKeys.includes(refRenderKey); // 所有的类实例都受renderKey匹配机制影响
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

    let missRef = false;
    uKeys.forEach(key => {
      const ref = ccUKey2ref[key];

      if (!ref) {
        missRef = true;
        return;
      }

      const refCtx = ref.ctx;
      const {
        module: refModule,
        connect: refConnect
      } = refCtx;
      const isBelong = refModule === moduleName;
      const isConnect = refConnect[moduleName] ? true : false;

      if (isBelong) {
        tryMatch(ref, true);
      } // 一个实例如果既属于模块x同时也连接了模块x，这是不推荐的，在buildCtx里面已给出警告
      // 会造成冗余的渲染


      if (isConnect) {
        tryMatch(ref, false);
      }
    });
    const result = {
      belong: belongRefKeys,
      connect: connectRefKeys
    }; // 没有miss的ref才存缓存，防止直接标记了watchedKeys的实例此时还没有记录ref，
    // 但是此时刚好有变更状态的命令的话，如果这里缓存了查询结果，这这个实例挂上后，没有机会响应状态变更了

    if (!missRef) {
      setCache(moduleName, cacheKey, result);
    }

    return {
      sharedStateKeys,
      result
    };
  }

  /* eslint-disable camelcase */
  const {
    isPJO: isPJO$3,
    justWarning: justWarning$2,
    isObjectNull: isObjectNull$1,
    computeFeature: computeFeature$1,
    okeys: okeys$6
  } = util;
  const {
    FOR_CUR_MOD: FOR_CUR_MOD$1,
    FOR_ANOTHER_MOD: FOR_ANOTHER_MOD$1,
    FORCE_UPDATE: FORCE_UPDATE$1,
    SET_STATE: SET_STATE$1,
    SIG_STATE_CHANGED: SIG_STATE_CHANGED$1,
    RENDER_NO_OP: RENDER_NO_OP$1,
    RENDER_BY_KEY: RENDER_BY_KEY$1,
    RENDER_BY_STATE: RENDER_BY_STATE$1,
    UNMOUNTED: UNMOUNTED$1,
    NOT_MOUNT: NOT_MOUNT$1
  } = cst;
  const {
    store: {
      setState: storeSetState,
      getPrevState: getPrevState$1,
      saveSharedState: saveSharedState$1
    },
    middlewares,
    ccClassKey2Context,
    refStore,
    getModuleStateKeys,
    runtimeVar: runtimeVar$2
  } = ccContext; // 触发修改状态的实例所属模块和目标模块不一致的时候，stateFor是 FOR_ANOTHER_MOD

  function getStateFor(targetModule, refModule) {
    return targetModule === refModule ? FOR_CUR_MOD$1 : FOR_ANOTHER_MOD$1;
  }

  function callMiddlewares(skipMiddleware, passToMiddleware, cb) {
    if (skipMiddleware !== true) {
      const len = middlewares.length;

      if (len > 0) {
        let index = 0;

        const next = () => {
          if (index === len) {
            // all middlewares been executed
            cb();
          } else {
            const middlewareFn = middlewares[index];
            index++;
            if (isFn(middlewareFn)) middlewareFn(passToMiddleware, next);else {
              justWarning$2(`found one middleware ${INAF}`);
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
    return runtimeVar$2.alwaysRenderCaller || force;
  }
  /**
   * 修改状态入口函数
   */


  function changeRefState(inputState, _temp, callerRef) {
    let {
      module,
      skipMiddleware = false,
      payload,
      stateChangedCb,
      force = false,
      stateSnapshot,
      keys = [],
      keyPath = '',
      // sync api 透传
      reactCallback,
      type,
      calledBy = SET_STATE$1,
      fnName = '',
      renderKey,
      delay: delay$$1 = -1
    } = _temp === void 0 ? {} : _temp;
    if (!inputState) return;

    if (!isPJO$3(inputState)) {
      return;
    }

    let state = inputState;
    const targetRenderKey = extractRenderKey(renderKey);
    const targetDelay = renderKey && renderKey.delay ? renderKey.delay : delay$$1;
    const {
      module: refModule,
      ccUniqueKey,
      ccKey
    } = callerRef.ctx;
    const stateFor = getStateFor(module, refModule);
    const callInfo = {
      calledBy,
      payload,
      renderKey: targetRenderKey,
      force,
      ccKey,
      module,
      fnName,
      keys,
      keyPath
    }; // 在triggerReactSetState之前把状态存储到store，
    // 防止属于同一个模块的父组件套子组件渲染时，父组件修改了state，子组件初次挂载是不能第一时间拿到state
    // const passedRef = stateFor === FOR_CUR_MOD ? targetRef : null;
    // 标记noSave为true，延迟到后面可能存在的中间件执行结束后才save

    const {
      partialState: sharedState,
      hasDelta,
      hasPrivState
    } = syncCommittedStateToStore(module, inputState, {
      ref: callerRef,
      callInfo,
      noSave: true,
      force
    }); // 有 computed 提交了新的 state

    if (hasDelta) {
      state = Object.assign({}, inputState, sharedState);
    } // 不包含私有状态，仅包含模块状态，交给 belongRefs 那里去触发渲染，这样可以让已失去依赖的当前实例减少一次渲染
    // 因为 belongRefs 那里是根据有无依赖来确定要不要渲染，这样的话如果失去了依赖不把它查出来就不触发它渲染了


    const ignoreRender = !hasPrivState && !!sharedState; // source ref will receive the whole committed state 

    triggerReactSetState(callerRef, callInfo, targetRenderKey, calledBy, state, stateFor, ignoreRender, reactCallback, getCallerForce(force), (renderType, committedState, refUpdater) => {
      // committedState means final committedState
      const passToMiddleware = {
        calledBy,
        type,
        payload,
        renderKey: targetRenderKey,
        delay: targetDelay,
        ccKey,
        ccUniqueKey,
        committedState,
        refModule,
        module,
        fnName,
        sharedState: sharedState || {} // 给一个空壳对象，防止用户直接用的时候报错null

      };
      let modStateCalled = false; // 修改或新增状态值
      // 修改并不会再次触发compute&watch过程，请明确你要修改的目的

      passToMiddleware.modState = (key, val) => {
        modStateCalled = true;
        passToMiddleware.committedState[key] = val;
        passToMiddleware.sharedState[key] = val;
      };

      callMiddlewares(skipMiddleware, passToMiddleware, () => {
        // 到这里才触发调用 saveSharedState 存储模块状态和 并用 refUpdater 更新调用实例，注这两者前后顺序不能调换
        // 因为 callerRef 里的 beforeRender 步骤会把最新的模块状态合进来
        // 允许在中间件过程中使用「modState」修改某些key的值，会影响到实例的更新结果，但不会再触发computed&watch
        // 所以调用此接口请明确知道上面的后果，可能导致以外的bug
        // 注不要直接修改 sharedState 或 committedState，如非要修改，应该是对两个对象一起修改某个key才是正确的
        const midSharedState = passToMiddleware.sharedState; // 如 finalSharedState 为空，表示提交的状态和模块状态没有发生变化

        const finalSharedState = saveSharedState$1(module, midSharedState, modStateCalled, force); // TODO: 查看其它模块的cu函数里读取了当前模块的state或computed作为输入产生了的新的计算结果
        // 然后做相应的关联更新 {'$$global/key1': {foo: ['cuKey1', 'cuKey2'] } }
        // code here
        // 执行完毕所有的中间件，才更新触发调用的源头实例

        refUpdater && refUpdater();

        if (renderType === RENDER_NO_OP$1 && !finalSharedState) {
          if (ignoreRender) {
            // 此时 refUpdater 为 null, 主动为 caller 执行一次 triggerReactSetState，
            // 以便让 triggerReactSetState 内部有机会触发 reactCallback
            triggerReactSetState(callerRef, callInfo, [], SET_STATE$1, midSharedState, stateFor, true, reactCallback, getCallerForce(force));
          }
        } else {
          send(SIG_STATE_CHANGED$1, {
            calledBy,
            type,
            committedState,
            sharedState: finalSharedState || {},
            payload,
            module,
            ccUniqueKey,
            renderKey: targetRenderKey,
            stateSnapshot
          });
        } // 无论是否真的有状态改变，此回调都会被触发


        if (stateChangedCb) stateChangedCb(); // 当前上下文的ignoreRender 为true时， 等效于入参 allowOriInsRender 为true，允许查询出oriIns后触发它渲染

        if (finalSharedState) triggerBroadcastState(stateFor, callInfo, callerRef, finalSharedState, ignoreRender, module, reactCallback, targetRenderKey, targetDelay, force);
      });
    });
  }

  function triggerReactSetState(callerRef, callInfo, renderKeys, calledBy, state, stateFor, ignoreRender, reactCallback, force, next) {
    const refCtx = callerRef.ctx;
    const refState = refCtx.unProxyState;

    const nextNoop = () => {
      next && next(RENDER_NO_OP$1, state); // fix issue: https://github.com/concentjs/concent/issues/70
      // 没有任何依赖的组件，定义了cb，也让其有机会执行

      if (reactCallback) {
        const {
          __$$mstate
        } = refCtx;
        const newState = Object.assign({}, refState, __$$mstate);
        reactCallback(newState);
      }
    };

    if (ignoreRender) {
      return nextNoop();
    }

    if (callerRef.__$$ms === UNMOUNTED$1 // 已卸载
    || stateFor !== FOR_CUR_MOD$1 // 确保 forceUpdate 能够刷新cc实例，因为state可能是{}，此时用户调用forceUpdate也要触发render
    || calledBy !== FORCE_UPDATE$1 && isObjectNull$1(state)) {
      return nextNoop();
    }

    const {
      module: stateModule,
      storedKeys,
      ccUniqueKey
    } = refCtx;
    let renderType = RENDER_BY_STATE$1;

    if (renderKeys.length) {
      // if user specify renderKeys
      renderType = RENDER_BY_KEY$1;

      if (renderKeys.includes(refCtx.renderKey)) {
        // current instance can been rendered only if ctx.renderKey included in renderKeys
        return nextNoop();
      }
    }

    if (storedKeys.length > 0) {
      const {
        partialState,
        isStateEmpty
      } = extractStateByKeys(state, storedKeys);

      if (!isStateEmpty) {
        if (refCtx.persistStoredKeys === true) {
          const {
            partialState: entireStoredState
          } = extractStateByKeys(refState, storedKeys);
          const currentStoredState = Object.assign({}, entireStoredState, partialState);

          if (ccContext.localStorage) {
            ccContext.localStorage.setItem(`CCSS_${ccUniqueKey}`, JSON.stringify(currentStoredState));
          }
        }

        refStore.setState(ccUniqueKey, partialState);
      }
    }

    const deltaCommittedState = Object.assign({}, state);
    computeValueForRef(callerRef, stateModule, refState, deltaCommittedState, callInfo);
    watchKeyForRef(callerRef, stateModule, refState, deltaCommittedState, callInfo);

    const ccSetState = () => {
      // 使用 unProxyState ，避免触发get
      let mayChangedState;
      if (force === true) mayChangedState = deltaCommittedState;else mayChangedState = extractChangedState(refCtx.unProxyState, deltaCommittedState);

      if (mayChangedState) {
        // 记录 stateKeys，方便 triggerRefEffect 之用
        refCtx.__$$settedList.push({
          module: stateModule,
          keys: okeys$6(mayChangedState)
        });

        const upCb = () => refCtx.__$$ccSetState(mayChangedState, reactCallback);

        if (callerRef.__$$ms === NOT_MOUNT$1) {
          refCtx.__$$queuedUpdaters.push(upCb);
        } else {
          upCb();
        }
      }
    };

    if (next) {
      next(renderType, deltaCommittedState, ccSetState);
    } else {
      ccSetState();
    }
  }

  function syncCommittedStateToStore(moduleName, committedState, options) {
    const stateKeys = getModuleStateKeys(moduleName); // extract shared state

    const {
      partialState,
      missKeyInState: hasPrivState
    } = extractStateByKeys(committedState, stateKeys, true); // save state to store

    if (partialState) {
      const {
        hasDelta,
        deltaCommittedState
      } = storeSetState(moduleName, partialState, options);
      return {
        partialState: deltaCommittedState,
        hasDelta,
        hasPrivState
      };
    }

    return {
      partialState,
      hasDelta: false,
      hasPrivState
    };
  }

  function triggerBroadcastState(stateFor, callInfo, targetRef, sharedState, allowOriInsRender, moduleName, reactCallback, renderKeys, delay$$1, force) {
    let passAllowOri = allowOriInsRender;

    if (delay$$1 > 0) {
      if (passAllowOri) {
        // 优先将当前实例渲染了
        triggerReactSetState(targetRef, callInfo, [], SET_STATE$1, sharedState, stateFor, false, reactCallback, getCallerForce(force));
      }

      passAllowOri = false; // 置为false，后面的runLater里不会再次触发当前实例渲染
    }

    const startBroadcastState = () => {
      broadcastState(callInfo, targetRef, sharedState, passAllowOri, moduleName, reactCallback, renderKeys, force);
    };

    if (delay$$1 > 0) {
      const feature = computeFeature$1(targetRef.ctx.ccUniqueKey, sharedState);
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

    const ccUKey2ref = ccContext.ccUKey2ref;
    /** @type ICtxBase */

    const {
      ccUniqueKey: currentCcUKey,
      ccClassKey
    } = targetRef.ctx;
    const renderKeyClasses = ccClassKey2Context[ccClassKey].renderKeyClasses;
    const {
      sharedStateKeys,
      result: {
        belong: belongRefKeys,
        connect: connectRefKeys
      }
    } = findUpdateRefs(moduleName, partialSharedState, renderKeys, renderKeyClasses);
    const renderedInBelong = {};
    belongRefKeys.forEach(refKey => {
      const ref = ccUKey2ref[refKey];
      if (!ref) return;
      const refUKey = ref.ctx.ccUniqueKey;
      let rcb = null; // 这里的calledBy直接用'broadcastState'，仅供concent内部运行时用

      let calledBy = 'broadcastState';

      if (refUKey === currentCcUKey) {
        if (!allowOriInsRender) return;
        rcb = reactCallback;
        calledBy = callInfo.calledBy;
      }

      triggerReactSetState(ref, callInfo, [], calledBy, partialSharedState, FOR_CUR_MOD$1, false, rcb, force);
      renderedInBelong[refKey] = 1;
    });
    const prevModuleState = getPrevState$1(moduleName);
    connectRefKeys.forEach(refKey => {
      // 对于即属于又连接的实例，避免一次重复的渲染
      if (renderedInBelong[refKey]) {
        return;
      }

      const ref = ccUKey2ref[refKey];
      if (!ref) return;

      if (ref.__$$ms === UNMOUNTED$1) {
        return;
      }

      const refCtx = ref.ctx;
      const {
        hasDelta: hasDeltaInCu,
        newCommittedState: cuCommittedState
      } = computeValueForRef(ref, moduleName, prevModuleState, partialSharedState, callInfo, false, false);
      const {
        hasDelta: hasDeltaInWa,
        newCommittedState: waCommittedState
      } = watchKeyForRef(ref, moduleName, prevModuleState, partialSharedState, callInfo, false, false); // computed & watch 过程中提交了新的state，合并到 unProxyState 里
      // 注意这里，computeValueForRef watchKeyForRef 调用的 findDepFnsToExecute 内部
      // 保证了实例里cu或者wa函数 commit 提交的状态只能是 privateStateKey，所以合并到 unProxyState 是安全的

      if (hasDeltaInCu || hasDeltaInWa) {
        const changedRefPrivState = Object.assign(cuCommittedState, waCommittedState);
        const refModule = refCtx.module;
        const refState = refCtx.unProxyState;
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

      const upCb = () => refCtx.__$$ccForceUpdate();

      if (ref.__$$ms === NOT_MOUNT$1) {
        refCtx.__$$queuedUpdaters.push(upCb);
      } else {
        upCb();
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
    // TODO: 是否修改为 if (ref.ctx.__$$inBM || ref.ctx.__$$renderStatus === START) 
    // 不知是否能避免
    // Warning: Cannot update a component (`XXX`) while rendering a different component (`YYY`)
    if (ref.ctx.__$$inBM || ref.ctx.__$$renderStatus === START) {
      // <= 2.15.7
      // setTimeout(() => startChangeRefState(state, options, ref), 0);
      // > 2.15.7 调整为此逻辑
      // 满足一些的确需要在 setup 里及时的将数据写入 store 的场景
      // 由 permanentDispatcher 去触发其他组件实例渲染
      // 自身的 state 直接合入，这样在实例首次渲染的函数体能拿到 setup 里写入的最新状态
      const permanentDispatcher = ccContext.getDispatcher();

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
      const ref = pickOneRef(options.module);
      ref.ctx.changeState(state, options);
    } catch (err) {
      strictWarning(err);
    }
  }

  function innerSetState(module, state, stateChangedCb) {
    _setState(state, {
      module,
      stateChangedCb
    });
  }
  function setState (module, state, renderKey, delay$$1, skipMiddleware) {
    if (delay$$1 === void 0) {
      delay$$1 = -1;
    }

    _setState(state, {
      ccKey: '[[top api:setState]]',
      module,
      renderKey,
      delay: delay$$1,
      skipMiddleware
    });
  }

  // import hoistNonReactStatic from 'hoist-non-react-statics';
  const {
    verboseInfo: verboseInfo$1,
    makeError: makeError$2,
    justWarning: justWarning$3,
    isPJO: isPJO$4,
    okeys: okeys$7,
    isValueNotNull: isValueNotNull$1
  } = util;
  const {
    store: {
      getState: getState$1,
      setState: storeSetState$1
    },
    reducer: {
      _reducer
    },
    computed: {
      _computedValues: _computedValues$3
    },
    runtimeHandler: runtimeHandler$1,
    runtimeVar: runtimeVar$3
  } = ccContext;
  const me = makeError$2;
  const vbi$1 = verboseInfo$1;

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
      checkModuleName(module, false, `module[${module}] is not configured in store`);
      return true;
    } catch (err) {
      handleError(err, throwError);
      return false;
    }
  }

  function paramCallBackShouldNotSupply(module, currentModule) {
    return `param module[${module}] must equal current ref's module[${currentModule}] when pass param reactCallback, or it will never been triggered! `;
  }

  function _promiseErrorHandler(resolve, reject) {
    return function (err) {
      for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      return err ? reject(err) : resolve(...args);
    };
  } //忽略掉传递进来的chainId，chainDepth，重新生成它们，源头调用了lazyDispatch或者ctx里调用了lazyDispatch，就会触发此逻辑


  function getNewChainData(isLazy, chainId, oriChainId, chainId2depth) {
    let _chainId;

    if (isLazy === true) {
      _chainId = getChainId();
      setChainIdLazy(_chainId);
      chainId2depth[_chainId] = 1; //置为1
    } else {
      _chainId = chainId || getChainId();
      if (!chainId2depth[_chainId]) chainId2depth[_chainId] = 1;
    } //源头函数会触发创建oriChainId， 之后就一直传递下去了


    const _oriChainId = oriChainId || _chainId;

    return {
      _chainId,
      _oriChainId
    };
  } // any error in this function will not been throw, cc just warning, 


  function isStateModuleValid(inputModule, currentModule, reactCallback, cb) {
    let targetCb = reactCallback;

    if (checkStoreModule(inputModule, false)) {
      if (inputModule !== currentModule && reactCallback) {
        // ???strict
        justWarning$3(paramCallBackShouldNotSupply(inputModule, currentModule));
        targetCb = null; // let user's reactCallback has no chance to be triggered
      }

      cb(null, targetCb);
    } else {
      cb(new Error(`inputModule:${inputModule} invalid`), null);
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
    return new Promise((resolve, reject) => {
      const _executionContext = Object.assign(executionContext, {
        __innerCb: _promiseErrorHandler(resolve, reject)
      });

      ccFn(userLogicFn, _executionContext, payload);
    }).catch(runtimeHandler$1.tryHandleError);
  }

  function __promisifiedInvokeWith(userLogicFn, executionContext, payload) {
    return _promisifyCcFn(invokeWith, userLogicFn, executionContext, payload);
  }

  function __invoke(userLogicFn, option, payload) {
    const {
      callerRef,
      delay: delay$$1,
      renderKey,
      force,
      calledBy,
      module,
      chainId,
      oriChainId,
      chainId2depth,
      isSilent
    } = option; // 有可能直接 invoke 模块 reducer 里的方法

    const fnName = userLogicFn.__fnName || userLogicFn.name;
    return __promisifiedInvokeWith(userLogicFn, {
      callerRef,
      context: true,
      module,
      calledBy,
      fnName,
      delay: delay$$1,
      renderKey,
      force,
      chainId,
      oriChainId,
      chainId2depth,
      isSilent
    }, payload);
  } // 后面会根据具体组件形态给reactSetState赋值
  // 直接写为 makeCcSetStateHandler = (ref)=> ref.ctx.reactSetState, 是错误的
  // ref.ctx.reactSetState是在后面的流程里被赋值的，所以此处多用一层函数包裹再调用


  function makeCcSetStateHandler(ref) {
    return (state, cb) => {
      ref.ctx.reactSetState(state, cb);
    };
  }
  function makeCcForceUpdateHandler(ref) {
    return cb => {
      ref.ctx.reactForceUpdate(cb);
    };
  } // last param: chainData

  function makeInvokeHandler(callerRef, _temp) {
    let {
      chainId,
      oriChainId,
      isLazy,
      delay: delay$$1 = -1,
      isSilent = false,
      chainId2depth = {}
    } = _temp === void 0 ? {} : _temp;
    return (firstParam, payload, inputRKey, inputDelay) => {
      let _isLazy = isLazy,
          _isSilent = isSilent;

      let _renderKey = '',
          _delay = inputDelay != undefined ? inputDelay : delay$$1;

      let _force = false;

      if (isPJO$4(inputRKey)) {
        const {
          lazy,
          silent,
          renderKey,
          delay: delay$$1,
          force
        } = inputRKey;
        lazy !== undefined && (_isLazy = lazy);
        silent !== undefined && (_isSilent = silent);
        renderKey !== undefined && (_renderKey = renderKey);
        delay$$1 !== undefined && (_delay = delay$$1);
        _force = force;
      } else {
        _renderKey = inputRKey;
      }

      const {
        _chainId,
        _oriChainId
      } = getNewChainData(_isLazy, chainId, oriChainId, chainId2depth);
      const firstParamType = typeof firstParam;
      const option = {
        callerRef,
        calledBy: INVOKE,
        module: callerRef.ctx.module,
        isSilent: _isSilent,
        chainId: _chainId,
        oriChainId: _oriChainId,
        chainId2depth,
        delay: _delay,
        renderKey: _renderKey,
        force: _force
      }; // eslint-disable-next-line

      const err = new Error(`param type error, correct usage: invoke(userFn:function, ...args:any[]) or invoke(option:[module:string, fn:function], ...args:any[])`);

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
        let _fn, _module;

        if (Array.isArray(firstParam)) {
          const [module, fn] = firstParam;
          _fn = fn;
          _module = module;
        } else {
          const {
            module,
            fn
          } = firstParam;
          _fn = fn;
          _module = module;
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
    const callerRef = executionContext.callerRef;
    const callerModule = callerRef.ctx.module;
    const {
      module: targetModule = callerModule,
      context = false,
      cb,
      __innerCb,
      type,
      calledBy,
      fnName = '',
      delay: delay$$1 = -1,
      renderKey,
      force = false,
      chainId,
      oriChainId,
      chainId2depth,
      isSilent // sourceModule

    } = executionContext;
    isStateModuleValid(targetModule, callerModule, cb, (err, newCb) => {
      if (err) return handleCcFnError(err, __innerCb);
      const moduleStateBase = getState$1(targetModule);
      let moduleState = moduleStateBase;
      let actionContext = {};
      let isSourceCall = false;
      const immutLib = runtimeHandler$1.immutLib;

      if (immutLib) {
        moduleState = immutLib.createDraft(moduleStateBase);
      }

      isSourceCall = chainId === oriChainId && chainId2depth[chainId] === 1;

      if (context) {
        // 调用前先加1
        chainId2depth[chainId] = chainId2depth[chainId] + 1; // !!!makeDispatchHandler的dispatch lazyDispatch将源头的isSilent 一致透传下去

        const dispatch = makeDispatchHandler(callerRef, false, isSilent, targetModule, renderKey, delay$$1, chainId, oriChainId, chainId2depth);
        const silentDispatch = makeDispatchHandler(callerRef, false, true, targetModule, renderKey, delay$$1, chainId, oriChainId, chainId2depth);
        const lazyDispatch = makeDispatchHandler(callerRef, true, isSilent, targetModule, renderKey, delay$$1, chainId, oriChainId, chainId2depth); // oriChainId, chainId2depth 一直携带下去，设置isLazy，会重新生成chainId

        const invoke = makeInvokeHandler(callerRef, {
          delay: delay$$1,
          chainId,
          oriChainId,
          chainId2depth
        });
        const lazyInvoke = makeInvokeHandler(callerRef, {
          isLazy: true,
          delay: delay$$1,
          oriChainId,
          chainId2depth
        });
        const silentInvoke = makeInvokeHandler(callerRef, {
          isLazy: false,
          delay: delay$$1,
          isSilent: true,
          oriChainId,
          chainId2depth
        }); // 首次调用时是undefined，这里做个保护

        const committedStateMap = getAllChainStateMap(chainId) || {};
        const committedState = committedStateMap[targetModule] || {};
        actionContext = {
          callInfo: {
            renderKey,
            delay: delay$$1,
            fnName,
            type,
            calledBy,
            force
          },
          module: targetModule,
          callerModule,
          committedStateMap,
          // 一次ref dispatch调用，所经过的所有reducer的返回结果收集
          committedState,
          invoke,
          lazyInvoke,
          silentInvoke,
          invokeLazy: lazyInvoke,
          invokeSilent: silentInvoke,
          dispatch,
          lazyDispatch,
          silentDispatch,
          dispatchLazy: lazyDispatch,
          dispatchSilent: silentDispatch,
          rootState: getState$1(),
          globalState: getState$1(MODULE_GLOBAL),
          // 指的是目标模块的state
          moduleState,
          // 指的是目标模块的的moduleComputed
          moduleComputed: _computedValues$3[targetModule] || {},
          // 利用dispatch调用自动生成的setState
          setState: (state, r, d) => {
            const targetR = r !== 0 ? r || renderKey : r;
            const targetD = d !== 0 ? d || delay$$1 : d;
            return dispatch('setState', state, {
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
          isSourceCall,
          calledBy,
          module: targetModule,
          chainId,
          fn: userLogicFn,
          type
        });
      }

      const handleReturnState = partialState => {
        chainId2depth[chainId] = chainId2depth[chainId] - 1; // 调用结束减1

        const curDepth = chainId2depth[chainId];
        const isFirstDepth = curDepth === 1;
        const isC2Result = stOrPromisedSt && stOrPromisedSt.__c2Result; // 调用结束就记录

        setAllChainState(chainId, targetModule, partialState);
        let commitStateList = [];

        if (isSilent === false) {
          send(SIG_FN_END, {
            isSourceCall,
            calledBy,
            module: targetModule,
            chainId,
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
        } else {
          if (immutLib) {
            immutLib.finishDraft();
          }
        }

        commitStateList.forEach(v => {
          let changedPartialState = v.state;
          let stateSnapshot = moduleState;

          if (immutLib) {
            stateSnapshot = immutLib.finishDraft(moduleState); // 可能未对 moduleState 做任何修改，做了修改才重置 changedPartialState

            if (moduleStateBase !== stateSnapshot) {
              changedPartialState = okeys$7(changedPartialState).reduce((tmpMap, stateKey) => {
                const finalVal = stateSnapshot[stateKey];

                if (isPJO(finalVal, true)) {
                  tmpMap[stateKey] = finalVal;
                } else {
                  tmpMap[stateKey] = changedPartialState[stateKey];
                }

                return tmpMap;
              }, {});
            }
          }

          startChangeRefState(changedPartialState, {
            renderKey,
            module: v.module,
            reactCallback: newCb,
            type,
            calledBy,
            fnName,
            delay: delay$$1,
            payload,
            force,
            stateSnapshot
          }, callerRef);
        });

        if (isSourceCall) {
          // 源头 dispatch 或 invoke 结束调用
          removeChainState(chainId);
          removeAllChainState(chainId);
        }

        if (__innerCb) __innerCb(null, partialState);
      };

      const handleFnError = err => {
        send(SIG_FN_ERR, {
          isSourceCall,
          calledBy,
          module: targetModule,
          chainId,
          fn: userLogicFn
        });
        handleCcFnError(err, __innerCb);
      };

      const stOrPromisedSt = userLogicFn(payload, moduleState, actionContext);

      if (userLogicFn.__isAsync) {
        Promise.resolve(stOrPromisedSt).then(handleReturnState).catch(handleFnError);
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
            Promise.resolve(stOrPromisedSt).then(handleReturnState).catch(handleFnError);
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
    let {
      callerRef,
      module: inputModule,
      renderKey,
      isSilent,
      force,
      type,
      payload,
      cb: reactCallback,
      __innerCb,
      delay: delay$$1 = -1,
      chainId,
      oriChainId,
      chainId2depth
    } = _temp2 === void 0 ? {} : _temp2;
    const targetReducerFns = _reducer[inputModule] || {};
    const reducerFn = targetReducerFns[type];

    if (!reducerFn) {
      const fns = okeys$7(targetReducerFns);
      const err = new Error(`reducer fn [${inputModule}/${type}] not found, you may call:${fns}`);
      return __innerCb(err);
    }

    const executionContext = {
      callerRef,
      module: inputModule,
      type,
      force,
      fnName: type,
      cb: reactCallback,
      context: true,
      __innerCb,
      calledBy: DISPATCH,
      delay: delay$$1,
      renderKey,
      isSilent,
      chainId,
      oriChainId,
      chainId2depth
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
    return (paramObj, payload, userInputRKey, userInputDelay) => {
      if (!isValueNotNull$1(paramObj)) {
        return Promise.reject(new Error('dispatch param is null/undefined'));
      }

      let isLazy = inputIsLazy,
          isSilent = inputIsSilent;
      let _renderKey = '';

      let _delay = userInputDelay || delay$$1;

      let _force = false;

      if (isPJO$4(userInputRKey)) {
        _renderKey = defaultRenderKey;
        const {
          lazy,
          silent,
          renderKey,
          delay: delay$$1,
          force
        } = userInputRKey;
        lazy !== undefined && (isLazy = lazy);
        silent !== undefined && (isSilent = silent);
        renderKey !== undefined && (_renderKey = renderKey);
        delay$$1 !== undefined && (_delay = delay$$1);
        _force = force;
      } else {
        _renderKey = userInputRKey || defaultRenderKey;
      }

      const {
        _chainId,
        _oriChainId
      } = getNewChainData(isLazy, chainId, oriChainId, chainId2depth);
      const paramObjType = typeof paramObj;

      let _type, _cb;

      let _module = defaultModule;

      const callInvoke = () => {
        const iHandler = makeInvokeHandler(callerRef, {
          chainId: _chainId,
          oriChainId: _oriChainId,
          isLazy,
          isSilent,
          chainId2depth
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
          const [mInArr, rInArr] = paramObj;

          if (rInArr && rInArr.__fnName) {
            _module = mInArr;
            _type = rInArr.__fnName;
          } else {
            return callInvoke();
          }
        } else {
          const {
            module,
            fn,
            type,
            cb
          } = paramObj;
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
        let targetFirstParam = paramObj;

        if (paramObjType === 'function') {
          const fnName = paramObj.__fnName;

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

        const slashCount = targetFirstParam.split('').filter(v => v === '/').length;

        if (slashCount === 0) {
          _type = targetFirstParam;
        } else if (slashCount === 1) {
          const [module, type] = targetFirstParam.split('/');
          if (module) _module = module; //targetFirstParam may like: /foo/changeName

          _type = type;
        } else {
          return Promise.reject(me(ERR.CC_DISPATCH_STRING_INVALID, vbi$1(targetFirstParam)));
        }
      } else {
        return Promise.reject(me(ERR.CC_DISPATCH_PARAM_INVALID));
      }

      if (_module === '*') {
        return ccDispatch(`*/${_type}`, payload, {
          silent: isSilent,
          lazy: isLazy,
          renderKey: _renderKey,
          force: _force
        }, _delay, {
          refModule: callerRef.ctx.module
        } // in name of refModule to call dispatch handler
        );
      }

      const p = new Promise((resolve, reject) => {
        dispatch$1({
          callerRef,
          module: _module,
          type: _type,
          payload,
          cb: _cb,
          __innerCb: _promiseErrorHandler(resolve, reject),
          delay: _delay,
          renderKey: _renderKey,
          isSilent,
          force: _force,
          chainId: _chainId,
          oriChainId: _oriChainId,
          chainId2depth // oriChainId: _oriChainId, oriChainDepth: _oriChainDepth, sourceModule: _sourceModule,

        });
      }).catch(err => {
        // 强烈不建议用户配置 unsafe_moveReducerErrToErrorHandler 为 true，转发 reducer 错误到 errorHandler 里
        // 保留这个参数是为了让老版本的concent工程能够正常工作
        if (runtimeVar$3.unsafe_moveReducerErrToErrorHandler) {
          // 非严格模式，如果未配置 errorHandler，错误会被静默掉
          runtimeHandler$1.tryHandleError(err, !runtimeVar$3.isStrict);
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
      const _action = typeof action === 'string' && !action.includes('/') ? `${module}/${action}` : action;

      for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        args[_key2 - 1] = arguments[_key2];
      }

      return ccDispatch(_action, ...args);
    };
  } // for moduleConf.init(legency) moduleConf.lifecycle.initState(v2.9+)

  function makeSetStateHandler(module, initStateDone) {
    return state => {
      const execInitDoneWrap = () => initStateDone && initStateDone(makeModuleDispatcher(module), getState$1(module));

      try {
        if (!state) return void execInitDoneWrap();
        innerSetState(module, state, execInitDoneWrap);
      } catch (err) {
        const moduleState = getState$1(module);

        if (!moduleState) {
          return justWarning$3(`invalid module ${module}`);
        }

        const keys = okeys$7(moduleState);
        const {
          partialState,
          isStateEmpty,
          ignoredStateKeys
        } = extractStateByKeys(state, keys, false, true);
        if (!isStateEmpty) storeSetState$1(module, partialState); //store this valid state;

        if (ignoredStateKeys.length > 0) {
          justWarning$3(`invalid keys:${ignoredStateKeys.join(',')}, their value is undefined or they are not declared in module${module}`);
        }

        justTip(`no ccInstance found for module[${module}] currently, cc will just store it, lately ccInstance will pick this state to render`);
        execInitDoneWrap();
      }
    };
  }
  const makeRefSetState = ref => (partialState, cb) => {
    const ctx = ref.ctx;
    const newState = Object.assign({}, ctx.unProxyState, partialState);
    ctx.unProxyState = newState; // 和class setState(partialState, cb); 保持一致

    const cbNewState = () => cb && cb(newState); // 让ctx.state始终保持同一个引用，使setup里可以安全的解构state反复使用


    ctx.state = Object.assign(ctx.state, partialState);
    const act = runtimeHandler$1.act;

    const update = () => {
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
  const makeRefForceUpdate = ref => cb => {
    const ctx = ref.ctx;
    const newState = Object.assign({}, ctx.unProxyState, ctx.__$$mstate);

    const cbNewState = () => cb && cb(newState);

    if (ctx.type === CC_HOOK) {
      ctx.__boundSetState(newState);

      cbNewState();
    } else {
      ctx.__boundForceUpdate(cbNewState);
    }
  };

  const getState$2 = ccContext.store.getState;
  function initModuleLifecycle (moduleName, lifecycle) {
    if (lifecycle === void 0) {
      lifecycle = {};
    }

    const {
      initState,
      initStateDone,
      loaded,
      willUnmount,
      mounted
    } = lifecycle; // 对接原来的 moduleConf.init initPost

    const validLifecycle = {};
    if (isFn(willUnmount)) validLifecycle.willUnmount = willUnmount;
    if (isFn(mounted)) validLifecycle.mounted = mounted;
    ccContext.lifecycle._lifecycle[moduleName] = validLifecycle;
    const moduleState = getState$2(moduleName);
    const d = makeModuleDispatcher(moduleName); // loaded just means that module state、reducer、watch、computed configuration were recorded to ccContext
    // so it is called before initState

    if (isFn(loaded)) {
      loaded(d, moduleState);
    }

    if (isFn(initState)) {
      Promise.resolve().then(() => initState(moduleState)).then(state => {
        makeSetStateHandler(moduleName, initStateDone)(state);
      }).catch(ccContext.runtimeHandler.tryHandleError);
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
    const lifeCycleCopy = Object.assign({}, legencyModuleConf.lifecycle); // 优先取lifecycle里的initState、initStateDone，不存在的话再去对接原来外层的init、initPost定义

    if (!lifeCycleCopy.initState) lifeCycleCopy.initState = legencyModuleConf.init;
    if (!lifeCycleCopy.initStateDone) lifeCycleCopy.initStateDone = legencyModuleConf.initPost;
    return lifeCycleCopy;
  }

  /** @typedef {import('../types').ModuleConfig} ModuleConfig */
  const {
    isPJO: isPJO$5,
    evalState: evalState$1,
    okeys: okeys$8,
    isFn: isFn$1
  } = util;
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

    const confOneModule = function (module,
    /** @type ModuleConfig*/
    config, allowDup) {
      if (allowDup === void 0) {
        allowDup = false;
      }

      if (!ccContext.isStartup) {
        pendingModules.push({
          module,
          config
        });
        return;
      }

      if (!isPJO$5(config)) {
        throw new Error(`param config ${INAJ}`);
      }

      if (module === MODULE_GLOBAL) {
        throw new Error('configuring global module is not allowed');
      }

      if (allowDup && ccContext.store.getState(module)) {
        return;
      }

      const {
        state,
        reducer,
        computed,
        watch,
        ghosts = []
      } = config;
      const eState = evalState$1(state);
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
      let allowDup = false;
      if (isPJO$5(config)) allowDup = config.allowDup === true;
      okeys$8(moduleNameOrNamedModuleConf).forEach(moduleName => confOneModule(moduleName, moduleNameOrNamedModuleConf[moduleName], allowDup));
    } else {
      confOneModule(moduleNameOrNamedModuleConf, config);
    }
  }

  function tagReducerFn(reducerFns, moduleName) {
    const taggedReducer = {};

    if (reducerFns) {
      okeys(reducerFns).forEach(fnName => {
        const oldFn = reducerFns[fnName];

        const fn = function () {
          return oldFn(...arguments);
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

    const {
      state,
      reducer,
      computed,
      watch
    } = moduleOverideConf;

    if (!ccContext.isStartup) {
      throw new Error('concent is not running');
    }

    checkModuleNameBasically(newModule);
    checkModuleName(existingModule, false);
    const stateFn = ccContext.moduleName2stateFn[existingModule];

    if (!stateFn) {
      throw new Error(`target module[${existingModule}] state must be a function when use cloneModule`);
    }

    const stateCopy = stateFn();
    Object.assign(stateCopy, evalState(state));
    const originalReducer = ccContext.reducer._reducer[existingModule]; // attach  __fnName  __stateModule, 不能污染原函数的dispatch逻辑里需要的__stateModule

    const taggedReducerCopy = Object.assign(tagReducerFn(originalReducer, newModule), tagReducerFn(reducer, newModule));
    const computedCopy = Object.assign({}, ccContext.computed._computedRaw[existingModule], computed);
    const watchCopy = Object.assign({}, ccContext.watch._watchRaw[existingModule], watch);
    const lifecycleCopy = Object.assign({}, ccContext.lifecycle._lifecycle[existingModule], getLifecycle(moduleOverideConf));
    const confObj = {
      state: stateCopy,
      reducer: taggedReducerCopy,
      computed: computedCopy,
      watch: watchCopy,
      lifecycle: lifecycleCopy
    };
    configure(newModule, confObj);
  });

  const {
    event2handlers,
    handlerKey2handler,
    ccUKey2handlerKeys,
    ccUKey2ref: ccUKey2ref$1
  } = ccContext;
  const {
    makeHandlerKey: makeHandlerKey$1,
    safeGetArray: safeGetArray$1,
    justWarning: justWarning$4
  } = util;

  function _findEventHandlers(event, module, ccClassKey, ccUniqueKey, identity) {
    // 不用默认参数写法了
    // codesandbox lost default value
    const _identity = identity == undefined ? null : identity; // 查找的时候，只负责取，不负责隐式的生成，此次不需要用safeGetArray


    const handlers = event2handlers[event];

    if (handlers) {
      let filteredHandlers = handlers;
      if (ccUniqueKey) filteredHandlers = handlers.filter(v => v.ccUniqueKey === ccUniqueKey);else if (ccClassKey) filteredHandlers = handlers.filter(v => v.ccClassKey === ccClassKey);else if (module) filteredHandlers = handlers.filter(v => v.module === module); // identity is null means user call emit like emit('eventName')
      // identity is not null means user call emit like emit(['eventName', 'idtName'])

      if (_identity !== undefined) {
        filteredHandlers = filteredHandlers.filter(v => v.identity === _identity);
      }

      return filteredHandlers;
    }

    return [];
  }

  function _deleteEventHandlers(handlers) {
    const toDeleteCcUniqueKeyMap = {};
    const toDeleteEventNames = [];
    handlers.forEach(item => {
      const {
        handlerKey,
        ccUniqueKey,
        event
      } = item;
      delete handlerKey2handler[handlerKey]; // delete mapping of handlerKey2handler;
      toDeleteCcUniqueKeyMap[ccUniqueKey] = 1;
      if (!toDeleteEventNames.includes(event)) toDeleteEventNames.push(event);
    });
    toDeleteEventNames.forEach(event => {
      const eHandlers = event2handlers[event];

      if (eHandlers) {
        eHandlers.forEach((h, idx) => {
          const {
            ccUniqueKey
          } = h;

          if (toDeleteCcUniqueKeyMap[ccUniqueKey] === 1) {
            eHandlers[idx] = null;
            delete ccUKey2handlerKeys[ccUniqueKey]; // delete mapping of ccUKey2handlerKeys;
          }
        });
        event2handlers[event] = eHandlers.filter(v => v !== null); // delete eHandlers null element
      }
    });
  }

  function bindEventHandlerToCcContext(module, ccClassKey, ccUniqueKey, event, identity, handler) {
    const handlers = safeGetArray$1(event2handlers, event);

    if (!isFn(handler)) {
      return justWarning$4(`event ${event}'s handler ${INAF}!`);
    }

    const handlerKey = makeHandlerKey$1(ccUniqueKey, event, identity);
    const handlerKeys = safeGetArray$1(ccUKey2handlerKeys, ccUniqueKey);
    const targetHandlerIndex = handlers.findIndex(v => v.handlerKey === handlerKey); // user call ctx.on for a same event in a same instance more than once

    const handlerItem = {
      event,
      module,
      ccClassKey,
      ccUniqueKey,
      identity,
      handlerKey,
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

    let _event,
        _identity = null,
        _module,
        _ccClassKey,
        _ccUniqueKey;

    let canPerform = null;

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

    const handlers = _findEventHandlers(_event, _module, _ccClassKey, _ccUniqueKey, _identity);

    handlers.forEach(_ref => {
      let {
        ccUniqueKey,
        handlerKey
      } = _ref;
      const ref = ccUKey2ref$1[ccUniqueKey];

      if (ref && handlerKey) {
        // confirm the instance is mounted and handler is not been offed
        if (ref.__$$ms !== MOUNTED) return;
        const handler = handlerKey2handler[handlerKey];

        if (handler) {
          if (canPerform && !canPerform(ref)) {
            return;
          }

          handler.fn(...args);
        }
      }
    });
  }
  function findEventHandlersToOff(event, _ref2) {
    let {
      module,
      ccClassKey,
      ccUniqueKey,
      identity
    } = _ref2;

    const handlers = _findEventHandlers(event, module, ccClassKey, ccUniqueKey, identity);

    _deleteEventHandlers(handlers);
  }
  function offEventHandlersByCcUniqueKey(ccUniqueKey) {
    const handlerKeys = ccUKey2handlerKeys[ccUniqueKey];

    if (handlerKeys) {
      const toDeleteHandlers = [];
      handlerKeys.forEach(k => toDeleteHandlers.push(handlerKey2handler[k]));

      _deleteEventHandlers(toDeleteHandlers);
    }
  }
  function getEventItem(event) {
    let outputEv;

    if (event && typeof event === 'object') {
      let _event;

      if (Array.isArray(event)) {
        const [name, identity] = event;
        _event = {
          name,
          identity
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

  const {
    store: {
      getModuleVer: getModuleVer$1
    }
  } = ccContext;
  function makeObState (ref, state, module, isForModule) {
    return new Proxy(state, {
      get: function (target, key) {
        // ensureStateNotExpired, 当实例失去模块数据依赖，回调方法直接使用ctx.state时，state里的模块数据可能已过期
        if (isForModule) {
          const modVer = getModuleVer$1(module);
          const ctx = ref.ctx;

          if (modVer !== ctx.__$$prevModuleVer) {
            ctx.__$$prevModuleVer = modVer;
            Object.assign(state, ctx.__$$mstate);
          }
        }

        const val = target[key]; // TODO 2_level_key_collect

        updateDep(ref, module, key, isForModule);
        return val;
      },
      set: function (target, key, value) {
        // 这个warning暂时关闭，因为buildRefCtx阶段就生成了obState, refComputed里可能会调用commit向obState写入新的state
        // justWarning(`warning: state key[${key}] can not been changed manually, use api setState or dispatch instead`);
        // 允许赋最新值，否则silentUpdate状态合并会失效
        target[key] = value; // avoid Uncaught TypeError: 'set' on proxy: trap returned falsish for property '***'

        return true;
      }
    });
  }

  function getDefineWatchHandler (refCtx) {
    return (watchItem, watchHandler, depKeysOrOpt) => {
      const confMeta = {
        type: FN_WATCH,
        refCtx,
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
    return (computedItem, computedHandler, depKeysOrOpt) => {
      const confMeta = {
        type: FN_CU,
        refCtx,
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

  const {
    makeUniqueCcKey: makeUniqueCcKey$2
  } = util;
  function computeCcUniqueKey (ccClassKey, ccKey, tag) {
    const featureStr = ccKey || uuid(tag);
    return makeUniqueCcKey$2(ccClassKey, featureStr);
  }

  function getOutProps (props) {
    if (props) {
      return props.props || props; //把最外层的props传递给用户
    } else {
      return {};
    }
  }

  const {
    store: {
      getState: getState$3
    }
  } = ccContext;

  function getValFromEvent(e) {
    const se = convertToStandardEvent(e);

    if (se) {
      return se.currentTarget.value;
    } else {
      return e;
    }
  }

  var buildMockEvent = ((spec, e, refCtx) => {
    const {
      module: refModule,
      state: refState
    } = refCtx;
    let ccint = false,
        ccsync = '',
        ccrkey = '',
        value = '',
        extraState = null,
        ccdelay = -1,
        isToggleBool = false;
    const syncKey = spec[CCSYNC_KEY];
    const type = spec.type;
    let noAutoExtract = false;

    if (syncKey !== undefined) {
      // 来自sync生成的setter函数调用 即 sync('xxxKey')
      ccsync = syncKey;
      ccdelay = spec.delay;
      ccrkey = spec.rkey; // type 'bool', 'val', 'int', 'as'

      ccint = type === 'int'; // convert to int

      isToggleBool = type === 'bool';
      let keyPath, fullKeyPath, module;

      if (ccsync.includes('/')) {
        const [_module, _keyPath] = ccsync.split('/');
        keyPath = _keyPath;
        fullKeyPath = ccsync;
        module = _module;
      } else {
        keyPath = ccsync;
        fullKeyPath = `${refModule}/${keyPath}`;
        module = refModule;
      }

      const mState = getState$3(module); // 布尔值需要对原来的值取反

      const fullState = module !== refModule ? mState : refState;
      value = type === 'bool' ? !getValueByKeyPath(fullState, keyPath) : getValFromEvent(e); // 优先从spec里取，取不到的话value不会重新被赋值，而是直接用上面从e里提取出来的值

      const val = spec.val;

      if (val === undefined || val === AUTO_VAL) ; else {
        if (isFn(val)) {
          // moduleState指的是所修改的目标模块的state
          const syncRet = val( // TODO: syncCtx 填写函数 setVal(keyPath, value)
          value, keyPath, {
            event: e,
            module,
            moduleState: mState,
            fullKeyPath,
            state: refState,
            refCtx
          });

          if (syncRet !== undefined) {
            if (type === 'as') value = syncRet; // value is what cb returns;
            else {
              const retType = typeof syncRet;

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
                justWarning(`syncKey[${syncKey}] cb result type error.`);
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
      const se = convertToStandardEvent(e);

      if (se) {
        // e is event
        const currentTarget = se.currentTarget;
        value = currentTarget.value;
        const dataset = currentTarget.dataset;
        if (type === 'int') ccint = true;else ccint = dataset.ccint !== undefined;
        ccsync = dataset.ccsync;
        if (!ccsync) return null;
        ccrkey = dataset.ccrkey;
        const dataSetDelay = dataset.ccdelay;

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
        value,
        extraState,
        noAutoExtract,
        dataset: {
          ccsync,
          ccint,
          ccdelay,
          ccrkey
        }
      },
      isToggleBool
    };
  });

  function setValue(obj, keys, lastKeyIndex, keyIndex, value, isToggleBool) {
    if (isToggleBool === void 0) {
      isToggleBool = false;
    }

    const key = keys[keyIndex];
    let oriVal = obj[key];

    if (lastKeyIndex === keyIndex) {
      if (isToggleBool === true) {
        if (typeof oriVal !== 'boolean') {
          justWarning(`key[${key}]'s value type is not boolean`);
        } else {
          obj[key] = !oriVal;
        }
      } else {
        obj[key] = value;
      }
    } else {
      let newVal = shallowCopy(oriVal);
      obj[key] = newVal;
      setValue(newVal, keys, lastKeyIndex, ++keyIndex, value, isToggleBool);
    }
  }

  var extractStateByCcsync = ((ccsync, value, ccint, oriState, isToggleBool, refModule) => {
    let _value = value;

    if (ccint === true) {
      _value = parseInt(value); // strict?

      if (Number.isNaN(_value)) {
        justWarning(`${value} can not convert to int but you set ccint as true!`);
        _value = value;
      }
    }

    let module = refModule,
        keys = [];

    if (ccsync.includes('/')) {
      const [_module, keyOrKeyPath] = ccsync.split('/');
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

    const keyPath = keys.join('.');

    if (keys.length === 1) {
      const targetStateKey = keys[0];

      if (isToggleBool === true) {
        return {
          module,
          keys,
          keyPath,
          state: {
            [targetStateKey]: !oriState[targetStateKey]
          }
        };
      } else {
        return {
          module,
          keys,
          keyPath,
          state: {
            [targetStateKey]: _value
          }
        };
      }
    } else {
      const [key, ...restKeys] = keys;
      const subState = shallowCopy(oriState[key]);
      setValue(subState, restKeys, restKeys.length - 1, 0, _value, isToggleBool);
      return {
        module,
        keys,
        keyPath,
        state: {
          [key]: subState
        }
      };
    }
  });

  const {
    store: {
      getState: getState$4
    }
  } = ccContext;
  function __sync (spec, ref, e) {
    const refCtx = ref.ctx;
    const mockE = buildMockEvent(spec, e, refCtx);
    if (!mockE) return; // 参数无效 例如 <input onChange={this.sync}/> 导致

    const {
      ccKey,
      ccUniqueKey,
      module: refModule
    } = refCtx;
    const currentTarget = mockE.currentTarget;
    const {
      dataset,
      value,
      extraState,
      noAutoExtract
    } = currentTarget;
    if (e && e.stopPropagation) e.stopPropagation();
    const {
      ccint,
      ccdelay,
      ccrkey
    } = dataset;
    let ccsync = dataset.ccsync;

    if (ccsync.startsWith('/')) {
      ccsync = `${refModule}${ccsync}`; // 附加上默认模块值
    }

    const options = {
      calledBy: SYNC,
      ccKey,
      ccUniqueKey,
      module: refModule,
      renderKey: ccrkey,
      delay: ccdelay
    };

    const doExtract = fullState => extractStateByCcsync(ccsync, value, ccint, fullState, mockE.isToggleBool, refModule);

    if (ccsync.includes('/')) {
      // syncModuleState 同步模块的state状态
      const targetModule = ccsync.split('/')[0];
      checkModuleName(targetModule, false);
      options.module = targetModule;

      if (noAutoExtract) {
        if (extraState) startChangeRefState(extraState, options, ref);
        return;
      }

      const fullState = targetModule !== refModule ? getState$4(targetModule) : ref.state;
      const {
        state,
        module,
        keys,
        keyPath
      } = doExtract(fullState);
      Object.assign(options, {
        module,
        keys,
        keyPath
      });
      startChangeRefState(state, options, ref);
    } else {
      // 调用自己的setState句柄触发更新，key可能属于local的，也可能属于module的
      if (noAutoExtract) {
        if (extraState) ref.setState(extraState, null, options);
        return;
      }

      const {
        state,
        module,
        keys,
        keyPath
      } = doExtract(ref.state);
      Object.assign(options, {
        module,
        keys,
        keyPath
      });
      ref.setState(state, null, options);
    }
  }

  const {
    getModuleStateKeys: getModuleStateKeys$1
  } = ccContext;
  const {
    verifyKeys: verifyKeys$1,
    verboseInfo: vbi$2,
    okeys: okeys$9
  } = util;
  function getStoredKeys(belongMotule, refPrivState, ccOptionStoredKeys, regStoredKeys) {
    const targetStoredKeys = ccOptionStoredKeys || regStoredKeys;

    if (!targetStoredKeys) {
      return [];
    }

    const moduleStateKeys = getModuleStateKeys$1(belongMotule);

    if (targetStoredKeys === '*') {
      // refPrivState里可能含有moduleStateKey，需要进一步过滤
      return okeys$9(refPrivState).filter(k => !moduleStateKeys.includes(k));
    } else {
      checkStoredKeys(belongMotule, targetStoredKeys);
      return targetStoredKeys;
    }
  }
  function getWatchedStateKeys(module, ccClassKey, regWatchedKeys) {
    if (ccClassKey === CC_DISPATCHER) return [];
    if (!regWatchedKeys) return [];

    if (regWatchedKeys === '*') {
      return getModuleStateKeys$1(module);
    }

    if (regWatchedKeys === '-') {
      return regWatchedKeys;
    }

    const {
      notArray,
      keyElementNotString
    } = verifyKeys$1(regWatchedKeys, []);

    if (notArray || keyElementNotString) {
      const vbiInfo = vbi$2(`ccClassKey:${ccClassKey}`);
      throw new Error(`watchedKeys ${STR_ARR_OR_STAR} ${vbiInfo}`);
    }

    return regWatchedKeys;
  }
  function getConnect(regConnect) {
    const targetConnect = regConnect || {}; // codesandbox lost default value

    if (!isPJO(targetConnect, true)) {
      throw new Error(`param connect type error, it ${INAJ} or string array`);
    }

    const isArr = Array.isArray(targetConnect);
    let finalConnect = {};

    if (isArr || typeof targetConnect === 'string') {
      const connectedModules = isArr ? targetConnect : targetConnect.split(',');
      connectedModules.forEach(m => {
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
  const {
    reducer: {
      _caller,
      _module2fnNames,
      _module2Ghosts
    },
    refStore: refStore$1,
    getModuleStateKeys: getModuleStateKeys$2,
    store: {
      getState: getState$5,
      getModuleVer: getModuleVer$2
    }
  } = ccContext;
  const {
    noop: noop$1
  } = util;
  const {
    okeys: okeys$a,
    makeError: me$1,
    verboseInfo: vbi$3,
    isObject: isObject$1,
    isBool: isBool$1,
    justWarning: justWarning$5,
    isObjectNull: isObjectNull$2,
    isValueNotNull: isValueNotNull$2,
    noDupPush: noDupPush$1
  } = util;
  let idSeq = 0;

  function getEId() {
    idSeq += 1;
    return Symbol(`__autoGen_${idSeq}__`);
  }

  let fnKey = 0;

  function getFnKey() {
    fnKey += 1;
    return `${fnKey}`;
  }

  const eType = th => `type of defineEffect ${th} param must be`;

  const getWatchedKeys = ctx => {
    if (ctx.watchedKeys === '-') {
      if (ctx.__$$renderStatus === START) return okeys$a(ctx.__$$compareWaKeys);
      return okeys$a(ctx.__$$curWaKeys);
    }

    return ctx.watchedKeys;
  };

  const getConnectWatchedKeys = (ctx, moduleName) => {
    const {
      connect,
      connectedModules
    } = ctx;
    const isConnectArr = Array.isArray(connect);

    const getModuleWaKeys = m => {
      if (ctx.__$$renderStatus === START) return okeys$a(ctx.__$$compareConnWaKeys[m]);
      return okeys$a(ctx.__$$curConnWaKeys[m]);
    };

    const getWKeys = moduleName => {
      if (isConnectArr) {
        // auto observe connect modules
        return getModuleWaKeys(moduleName);
      } else {
        const waKeys = connect[moduleName];
        if (waKeys === '*') return getModuleStateKeys$2(moduleName);else if (waKeys === '-') return getModuleWaKeys(moduleName);else return waKeys;
      }
    };

    if (moduleName) return getWKeys(moduleName);else {
      const cKeys = {};
      connectedModules.forEach(m => {
        cKeys[m] = getWKeys(m);
      });
      return cKeys;
    }
  };

  function recordDep(ccUniqueKey, moduleName, watchedKeys) {
    const waKeys = watchedKeys === '*' ? getModuleStateKeys$2(moduleName) : watchedKeys;
    waKeys.forEach(stateKey => mapIns(moduleName, stateKey, ccUniqueKey));
  }

  function makeProxyReducer(m, dispatch, reducerFnType, ghostFnName) {
    if (reducerFnType === void 0) {
      reducerFnType = 0;
    }

    // 让绑定到组件上的mr.{xxx} 方法始终指向同一个，让 memo 优化可以生效
    const name2wrapFn = {}; // 此处代理对象仅用于log时可以打印出目标模块reducer函数集合

    return new Proxy(_caller[m] || {}, {
      get: (target, fnName) => {
        const fnNames = _module2fnNames[m];

        if (fnNames.includes(fnName)) {
          const fnKey = `${m}/${fnName}`;
          let wrapFn = name2wrapFn[fnKey];

          if (!wrapFn) {
            wrapFn = (payload, renderKey, delay$$1) => {
              const callerParams = {
                module: m,
                fnName,
                payload,
                renderKey,
                delay: delay$$1
              };
              if (reducerFnType === 0) return dispatch(fnKey, payload, renderKey, delay$$1);
              if (reducerFnType === 1) return callerParams;

              if (reducerFnType === 2) {
                if (fnName === ghostFnName) return justWarning$5(`the target fn[${fnName}] can't be a ghost`);
                return dispatch(`${m}/${ghostFnName}`, callerParams, renderKey, delay$$1);
              }
            };

            name2wrapFn[fnKey] = wrapFn;
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

    const {
      __$$curWaKeys,
      __$$compareWaKeys,
      __$$compareWaKeyCount,
      __$$nextCompareWaKeys,
      __$$nextCompareWaKeyCount,
      __$$curConnWaKeys,
      __$$compareConnWaKeys,
      __$$compareConnWaKeyCount,
      __$$nextCompareConnWaKeys,
      __$$nextCompareConnWaKeyCount
    } = ref.ctx;
    Object.assign(ref.ctx, ctx, {
      __$$curWaKeys,
      __$$compareWaKeys,
      __$$compareWaKeyCount,
      __$$nextCompareWaKeys,
      __$$nextCompareWaKeyCount,
      __$$curConnWaKeys,
      __$$compareConnWaKeys,
      __$$compareConnWaKeyCount,
      __$$nextCompareConnWaKeys,
      __$$nextCompareConnWaKeyCount
    });
  }

  function bindInitStateHandler(ref, ctx, registryState, refStoredState, mstate, modStateKeys) {
    // allow user have a chance to define state in setup block
    ctx.initState = initialStateOrCb => {
      let initialState = initialStateOrCb;

      if (isFn(initialStateOrCb)) {
        initialState = initialStateOrCb();
      }

      if (!ctx.__$$inBM) {
        return justWarning$5(`initState must been called in setup block!`);
      }

      if (!isPJO(registryState)) {
        return justWarning$5(`state ${INAJ}`);
      }

      if (ctx.__$$cuOrWaCalled) {
        return justWarning$5(`initState must been called before computed or watch`);
      }

      const newRefState = Object.assign({}, registryState, initialState, refStoredState, mstate); // 更新stateKeys，防止遗漏新的私有stateKey

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
    const dispatch = makeDispatchHandler(ref, false, false, stateModule);
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

      ctx.setGlobalState = (state, reactCallback, renderKey, delay$$1) => {
        setState(MODULE_GLOBAL, state, SET_STATE, reactCallback, renderKey, delay$$1);
      };
    }

    return dispatch;
  }

  function bindSyncApis(ref, ctx, liteLevel) {
    if (liteLevel > 2) {
      // level 3, assign sync api
      const cachedBoundFns = {};

      const doSync = (type, e, val, rkey, delay$$1) => {
        if (typeof e === 'string') {
          const valType = typeof val; // now val is syncCb

          if (isValueNotNull$2(val) && (valType === OBJ || valType === FN || val === AUTO_VAL)) {
            return __sync.bind(null, {
              [CCSYNC_KEY]: e,
              type,
              val,
              delay: delay$$1,
              rkey
            }, ref);
          }

          const valStr = val && val.toString ? val.toString() : '';
          const key = `${e}|${valStr}|${rkey}|${delay$$1}`;
          let boundFn = cachedBoundFns[key];

          if (!boundFn) {
            cachedBoundFns[key] = __sync.bind(null, {
              [CCSYNC_KEY]: e,
              type,
              val,
              delay: delay$$1,
              rkey
            }, ref);
            boundFn = cachedBoundFns[key];
          }

          return boundFn;
        } // case: <input data-ccsync="foo/f1" onChange={ctx.sync} />


        __sync({
          type: 'val'
        }, ref, e);
      }; // syncer series


      const makeTrap = type => ({
        get(target, key) {
          if (isKeyValid(target, key)) return doSync(type, key);
          return noop$1;
        }

      });

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
        if (rkey === void 0) {
          rkey = '';
        }

        if (delay$$1 === void 0) {
          delay$$1 = -1;
        }

        __sync({
          [CCSYNC_KEY]: ccsync,
          type: 'val',
          val,
          delay: delay$$1,
          rkey
        }, ref);
      };

      ctx.setBool = function (ccsync, rkey, delay$$1) {
        if (rkey === void 0) {
          rkey = '';
        }

        if (delay$$1 === void 0) {
          delay$$1 = -1;
        }

        __sync({
          [CCSYNC_KEY]: ccsync,
          type: 'bool',
          delay: delay$$1,
          rkey
        }, ref);
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

        findEventHandlersToPerform(getEventItem(event), ...args);
      }; // 默认off掉当前实例对某个事件名的所有监听


      ctx.off = function (event, _temp) {
        let {
          module,
          ccClassKey,
          ccUniqueKey: inputCcUkey = ccUniqueKey
        } = _temp === void 0 ? {} : _temp;
        let targetCcUkey = inputCcUkey; // 传递了 module 或者 ccClassKey的话，清理掉targetCcUkey，表示off的目标要扩大

        if (module || ccClassKey) targetCcUkey = ''; // 这里刻意不为identity赋默认值，如果是undefined，表示off掉所有监听

        const {
          name,
          identity
        } = getEventItem(event);
        findEventHandlersToOff(name, {
          module,
          ccClassKey,
          ccUniqueKey: targetCcUkey,
          identity
        });
      };

      ctx.on = (inputEvent, handler) => {
        ctx.__$$onEvents.push({
          inputEvent,
          handler
        });
      };
    }
  }

  function _makeCuWaDesc(moduleName, fnKeyOrDesc, cb, cbOptions) {
    const newDesc = {};

    const makeFnDesc$$1 = (fn, cbOptions) => {
      const fnDesc = isObject(fn) ? fn : {
        fn
      }; // 因为加上 / 后，cb的state类型会和模块相关了，types文件目前不方便推导含 / 的cb参数类型
      // 所以types文件里不允许传递 allowSlash 标记，让用户定义的retKey包含 / 会报运行时错误
      // 同时额外提供的 watchModule方法和 computedModule 方法需要用到 / 携带模块的特性
      // 故需内部放过不允许key包含slash的校验，所以这里加上 allowSlash 标记

      let opts = {};
      if (cbOptions) opts = isObject(cbOptions) ? cbOptions : {
        depKeys: cbOptions
      };
      let depKeys = opts.depKeys || fnDesc.depKeys;

      if (Array.isArray(depKeys)) {
        // 让 watchModule 的 depKeys 不拼模块前缀也能生效
        depKeys = depKeys.map(key => key.includes('/') ? key : `${moduleName}/${key}`);
      } // 不是自动搜集、也不是全依赖，置为自动收集模式
      else if (!['-', '*'].includes(depKeys)) {
        depKeys = '-';
      }

      return Object.assign({
        allowSlash: true,
        depKeyModule: moduleName
      }, fnDesc, opts, {
        depKeys
      });
    };

    if (typeof fnKeyOrDesc === 'string') {
      newDesc[`${moduleName}/${fnKeyOrDesc}`] = makeFnDesc$$1(cb, cbOptions);
    } else if (isObject(fnKeyOrDesc)) {
      okeys(fnKeyOrDesc).forEach(key => {
        newDesc[`${moduleName}/${key}`] = makeFnDesc$$1(fnKeyOrDesc[key]);
      });
    }

    return newDesc;
  }

  function bindEnhanceApis(ctx, liteLevel, stateModule) {
    const effectItems = [],
          effectPropsItems = []; // {fn:function, status:0, eId:'', immediate:true}

    const eid2effectReturnCb = {},
          eid2effectPropsReturnCb = {}; // fn

    ctx.effectMeta = {
      effectItems,
      eid2effectReturnCb,
      effectPropsItems,
      eid2effectPropsReturnCb
    };

    if (liteLevel > 4) {
      // level 5, assign enhance api
      ctx.execute = handler => ctx.execute = handler;

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


      ctx.computedModule = (moduleName, retKey, cb, cbOptions) => {
        return ctx.computed(_makeCuWaDesc(moduleName, retKey, cb, cbOptions));
      };

      const makeEffectHandler = (targetEffectItems, isProp) => function (fn, depKeysOrOpt, compare, immediate) {
        if (immediate === void 0) {
          immediate = true;
        }

        if (!isFn(fn)) throw new Error(`${eType('first')} function`);
        const compareForEf = compare === undefined ? false : compare; // 对于effectProps 第三位参数就是immediate, 不传的话，默认是true

        const immediateForEfProp = compare === undefined ? true : compare; // depKeys 为 null 和 undefined, 表示无任何依赖，每一轮都执行的副作用

        let _depKeys = depKeysOrOpt;
        let _compare = compareForEf;

        let _immediate = isProp ? immediateForEfProp : immediate;

        if (isObject$1(depKeysOrOpt)) {
          _depKeys = depKeysOrOpt.depKeys;
          _compare = isBool$1(depKeysOrOpt.compare) ? depKeysOrOpt.compare : compare;
          _immediate = isBool$1(depKeysOrOpt.immediate) ? depKeysOrOpt.immediate : immediate;
        }

        if (_depKeys !== undefined && _depKeys !== null && !Array.isArray(_depKeys)) {
          throw new Error(`${eType('second')} array, null, or undefined`);
        }

        const modDepKeys = [];

        if (!isProp && _depKeys) {
          _depKeys.forEach(depKey => {
            let modDepKey;

            if (depKey.includes('/')) {
              modDepKey = depKey;
              const [m] = depKey.split('/');

              if (!ctx.connect[m]) {
                throw me$1(ERR.CC_MODULE_NOT_CONNECTED, vbi$3(`depKey[${depKey}]`));
              }
            } else {
              // 这里要注意， 私有的key
              modDepKey = `${stateModule}/${depKey}`;
            }

            modDepKeys.push(modDepKey); // 先暂时保持起来，组件挂载时才映射依赖

            ctx.__$$staticWaKeys[modDepKey] = 1;
          });
        } // 对于effectProps来说是不会读取compare属性来用的


        const effectItem = {
          fn,
          isProp,
          depKeys: _depKeys,
          modDepKeys,
          eId: getEId(),
          compare: _compare,
          immediate: _immediate
        };
        targetEffectItems.push(effectItem);
      };

      ctx.effect = makeEffectHandler(effectItems, false);
      ctx.effectProps = makeEffectHandler(effectPropsItems, true);
    }
  }

  function fillCtxOtherAttrs(ref, ctx, connect, watchedKeys, ccUniqueKey, stateModule, allModules, dispatch) {
    // 构造完毕ctx后，开始创建 reducer，和可观察 connectedState
    const {
      connectedReducer,
      connectedState,
      __$$curConnWaKeys,
      __$$compareConnWaKeys,
      __$$compareConnWaKeyCount,
      __$$nextCompareConnWaKeys,
      __$$nextCompareConnWaKeyCount
    } = ctx; // 实例所属模块或连接模块是否处于自动观察状态

    let __$$autoWatch = false; // 向实例的reducer里绑定方法，key:{module} value:{reducerFn}
    // 只绑定所属的模块和已连接的模块的reducer方法

    allModules.forEach(m => {
      const rd = makeProxyReducer(m, dispatch);

      if (m === stateModule) {
        ctx.moduleReducer = rd;
        ctx.mrc = makeProxyReducer(m, dispatch, 1);
        const ghosts = _module2Ghosts[m] || [];
        ghosts.forEach(ghostFnName => {
          ctx.mrg[ghostFnName] = makeProxyReducer(m, dispatch, 2, ghostFnName);
        });
        if (m === MODULE_GLOBAL) connectedReducer[m] = rd;
      } else {
        connectedReducer[m] = rd;
      }

      const connectDesc = connect[m];

      if (connectDesc) {
        let moduleState = getState$5(m);

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


  function buildRefCtx(ref, params, liteLevel) {
    if (liteLevel === void 0) {
      liteLevel = 5;
    }

    // 能省赋默认值的就省，比如state，外层调用都保证赋值过了
    const {
      ccKey = '',
      state,
      id,
      ccOption = {},
      module,
      ccClassKey,
      type,
      insType,
      tag = '',
      storedKeys = [],
      persistStoredKeys = false,
      watchedKeys = '-',
      connect = {},
      staticExtra = {}
    } = params;
    const stateModule = module;
    const existedCtx = ref.ctx;
    const isCtxNull = isObjectNull$2(existedCtx); // 做个保护判断，防止 ctx = {}

    const modStateKeys = getModuleStateKeys$2(stateModule);
    let __boundSetState = ref.setState,
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

    const refOption = {};
    refOption.persistStoredKeys = ccOption.persistStoredKeys === undefined ? persistStoredKeys : ccOption.persistStoredKeys;
    refOption.tag = ccOption.tag || tag; // pick ccOption tag first, register tag second

    const ccUniqueKey = computeCcUniqueKey(ccClassKey, ccKey, refOption.tag); // 没有设定renderKey的话读id，最后才默认renderKey为ccUniqueKey

    const tmpRenderKey = ccOption.renderKey || id;
    refOption.renderKey = tmpRenderKey !== undefined ? tmpRenderKey : ccUniqueKey;
    refOption.storedKeys = getStoredKeys(stateModule, state, ccOption.storedKeys, storedKeys); // 用户使用ccKey属性的话，必需显示的指定ccClassKey

    if (ccKey && !ccClassKey) {
      throw new Error(`missing ccClassKey while init a cc ins with ccKey[${ccKey}]`);
    }

    if (refOption.storedKeys.length > 0) {
      if (!ccKey) throw me$1(ERR.CC_STORED_KEYS_NEED_CCKEY, vbi$3(`ccClassKey[${ccClassKey}]`));
    }

    const mstate = getState$5(module); // recover ref state

    const refStoredState = refStore$1._state[ccUniqueKey] || {};
    const mergedState = Object.assign({}, state, refStoredState, mstate);
    ref.state = mergedState;
    const stateKeys = okeys$a(mergedState);
    const connectedModules = okeys$a(connect);
    const connectedComputed = {};
    connectedModules.forEach(m => {
      connectedComputed[m] = makeCuRefObContainer(ref, m, false);
    });
    const moduleComputed = makeCuRefObContainer(ref, module); // 所有实例都自动连接上了global模块，这里可直接取connectedComputed已做好的结果

    const globalComputed = connectedComputed[MODULE_GLOBAL];
    const globalState = makeObState(ref, getState$5(MODULE_GLOBAL), MODULE_GLOBAL, false); // extract privStateKeys

    const privStateKeys = removeArrElements(okeys$a(state), modStateKeys);
    const moduleState = module === MODULE_GLOBAL ? globalState : makeObState(ref, mstate, module, true); // declare cc state series api

    const changeState = (state, options) => {
      startChangeRefState(state, options, ref);
    };

    const _setState = (module, state, calledBy, reactCallback, renderKey, delay$$1) => {
      const options = {
        calledBy,
        module,
        reactCallback
      };
      if (isObject(renderKey)) Object.assign(options, renderKey); // 丢弃delay，renderKeyAsOpt里的delay
      else Object.assign(options, {
        renderKey,
        delay: delay$$1
      });
      changeState(state, options);
    };

    const setModuleState = (module, state, reactCallback, renderKey, delay$$1) => {
      _setState(module, state, SET_MODULE_STATE, reactCallback, renderKey, delay$$1);
    };

    const setState = (p1, p2, p3, p4, p5) => {
      const p1Type = typeof p1;

      if (p1Type === 'string') {
        // p1: module, p2: state, p3: cb, p4: rkey, p5: delay
        setModuleState(p1, p2, p3, p4, p5);
      } else if (p1Type === 'function') {
        // p1: stateFn, p2: rkey, p3: delay
        const newState = p1(Object.assign({}, ctx.unProxyState), ctx.props);

        _setState(stateModule, newState, SET_STATE, p2, p3, p4);
      } else {
        // p1: state, p2: cb, p3: rkey, p4: delay
        _setState(stateModule, p1, SET_STATE, p2, p3, p4);
      }
    };

    const forceUpdate = (reactCallback, renderKey, delay$$1) => {
      _setState(stateModule, ref.unProxyState, FORCE_UPDATE, reactCallback, renderKey, delay$$1);
    };

    const refs = {};
    const allModules = connectedModules.slice(); // 已在change-ref-state里做优化，支持组件即属于又连接同一个模块，不会照成冗余渲染，
    // 所以此处allModules包含了module对渲染性能无影响，不过代码的语义上会照成重复的表达

    noDupPush$1(allModules, module);
    const props = getOutProps(ref.props);
    const now = Date.now();
    const ctx = {
      // static params
      type,
      insType,
      module,
      ccClassKey,
      ccKey,
      ccUniqueKey,
      renderCount: 0,
      initTime: now,
      watchedKeys,
      privStateKeys,
      connect,
      connectedModules,
      allModules,
      // dynamic meta, I don't want user know these props, so let field name start with __$$
      __$$onEvents: [],
      // 当组件还未挂载时，将事件存到__$$onEvents里，当组件挂载时才开始真正监听事件
      __$$queuedUpdaters: [],
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
      props,
      // collected mapProps result
      mapped: {},
      prevState: Object.assign({}, mergedState),
      // state
      state: makeObState(ref, mergedState, stateModule, true),
      unProxyState: mergedState,
      // 没有proxy化的state
      moduleState,
      // 用于before-render里避免merge moduleState而导致的冗余触发get，此属性不暴露给用户使用，因其不具备依赖收集能力
      __$$mstate: mstate,
      globalState,
      connectedState: {},
      // for function: pass value to extra in every render period
      // for class: pass value to extra one time
      extra: isObject$1(params.extra) ? params.extra : {},
      // pass value to staticExtra only one time for both function and class
      staticExtra,
      settings: {},

      /** @type ICtx['refComputedValues'] */
      refComputedValues: {},

      /** @type ICtx['refComputedRawValues'] */
      refComputedRawValues: {},
      moduleComputed,
      globalComputed,
      connectedComputed,
      moduleReducer: null,
      mrc: null,
      // 仅生成描述体，moduleReducerCaller

      /** ghost reducer map */
      mrg: {},
      globalReducer: null,
      connectedReducer: {},
      reducer: {},
      // api meta data
      stateKeys,

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
      __boundSetState,
      reactForceUpdate: noop$1,
      // 等待重写
      __boundForceUpdate,
      setState,
      setModuleState,
      forceUpdate,
      changeState,
      // not expose in d.ts
      refs,
      getRef: refName => refs[refName] || null,
      useRef: refName => {
        return nodeRef => {
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
    const dispatch = bindModApis(ref, ctx, stateModule, liteLevel, _setState);
    bindSyncApis(ref, ctx, liteLevel);
    bindEventApis(ctx, liteLevel, ccUniqueKey);
    bindEnhanceApis(ctx, liteLevel, stateModule);
    fillCtxOtherAttrs(ref, ctx, connect, watchedKeys, ccUniqueKey, stateModule, allModules, dispatch); // 始终优先取ref上指向的ctx，对于在热加载模式下的hook组件实例，那里面有的最近一次渲染收集的依赖信息才是正确的

    ctx.getWatchedKeys = () => getWatchedKeys(ref.ctx || ctx);

    ctx.getConnectWatchedKeys = moduleName => getConnectWatchedKeys(ref.ctx || ctx, moduleName);
  }

  const {
    okeys: okeys$b
  } = util;
  /**
   * 根据connect,watchedKeys,以及用户提供的原始renderKeyClasses 计算 特征值
   */

  function getFeatureStr (belongModule, connectSpec, renderKeyClasses) {
    const moduleNames = okeys$b(connectSpec);
    moduleNames.sort();
    let classesStr;
    if (renderKeyClasses === '*') classesStr = '*';else classesStr = renderKeyClasses.slice().join(',');
    return `${belongModule}/${moduleNames.join(',')}/${classesStr}`;
  }

  const {
    isObjectNull: isObjectNull$3,
    makeError: me$2
  } = util;
  const {
    featureStr2classKey,
    userClassKey2featureStr,
    ccClassKey2Context: ccClassKey2Context$1
  } = ccContext;
  let cursor = 0;
  function getCcClassKey (allowNamingDispatcher, module, connect, prefix, featureStr, classKey) {
    if (classKey === void 0) {
      classKey = '';
    }

    // 未指定classKey
    if (!classKey) {
      // 未指定所属模块，也未连接到其他模块
      if (module === MODULE_DEFAULT && isObjectNull$3(connect)) {
        return `${prefix}0`;
      }

      const prefixedFeatureStr = `${prefix}:${featureStr}`;
      let _classKey = featureStr2classKey[prefixedFeatureStr];

      if (_classKey) {
        return _classKey;
      }

      cursor++;
      _classKey = `${prefix}${cursor}`;
      featureStr2classKey[prefixedFeatureStr] = _classKey;
      return _classKey;
    } // verify user input classKey


    if (classKey.startsWith(CC_PREFIX)) {
      throw new Error(`user can not specify a classKey[${classKey}] starts with $$Cc`);
    }

    if (!allowNamingDispatcher) {
      if (classKey.toLowerCase() === CC_DISPATCHER.toLowerCase()) {
        // throw new Error(`${CC_DISPATCHER} is cc built-in ccClassKey name, if you want to customize your dispatcher, 
        // you can set autoCreateDispatcher=false in StartupOption, and use createDispatcher then.`)
        // currently createDispatcher is not allowed..
        throw new Error(`${CC_DISPATCHER} is cc built-in ccClassKey name.`);
      }
    }

    const clsCtx = ccClassKey2Context$1[classKey];

    if (clsCtx) {
      const fStr = userClassKey2featureStr[classKey];

      if (fStr !== featureStr) {
        // 不允许，特征值不一样的class指定相同的ccClassKey
        throw me$2(ERR.CC_CLASS_KEY_DUPLICATE, `ccClassKey:[${classKey}] duplicate`);
      }
    } else {
      userClassKey2featureStr[classKey] = featureStr;
    }

    return classKey;
  }

  function getRenderKeyClasses(ccClassKey, regRenderKeyClasses) {
    let _renderKeyClasses;

    if (!regRenderKeyClasses) {
      _renderKeyClasses = [ccClassKey];
    } else {
      if (!Array.isArray(regRenderKeyClasses) && regRenderKeyClasses !== '*') {
        throw new Error(`renderKeyClasses type err, it ${STR_ARR_OR_STAR}`);
      }

      _renderKeyClasses = regRenderKeyClasses;
    }

    return _renderKeyClasses;
  }

  const {
    ccClassKey2Context: ccClassKey2Context$2
  } = ccContext;

  function checkCcStartupOrNot() {
    if (ccContext.isStartup !== true) {
      throw new Error('you must call run api to startup concent before register Class!');
    }
  }
  /**
   * map registration info to ccContext
   */


  function mapRegInfo(module, ccClassKey, regRenderKeyClasses, classKeyPrefix, regWatchedKeys, regConnect, __checkStartUp, __calledBy) {
    if (module === void 0) {
      module = MODULE_DEFAULT;
    }

    if (__checkStartUp === true) checkCcStartupOrNot();
    const allowNamingDispatcher = __calledBy === 'cc';
    const renderKeyClasses = regRenderKeyClasses || [];
    checkModuleName(module, false, `module[${module}] not configured`);
    checkRenderKeyClasses(renderKeyClasses);

    const _connect = getConnect(regConnect);

    const _watchedKeys = getWatchedStateKeys(module, ccClassKey, regWatchedKeys); // 注意此处用户不指定renderKeyClasses时，算出来的特征值和renderKeyClasses无关


    const featureStr = getFeatureStr(module, _connect, renderKeyClasses);

    const _ccClassKey = getCcClassKey(allowNamingDispatcher, module, _connect, classKeyPrefix, featureStr, ccClassKey); // 此处再次获得真正的renderKeyClasses


    const _renderKeyClasses = getRenderKeyClasses(_ccClassKey, regRenderKeyClasses);

    let ccClassContext = ccClassKey2Context$2[_ccClassKey]; //做一个判断，有可能是热加载调用

    if (!ccClassContext) {
      ccClassContext = makeCcClassContext(module, _ccClassKey, _renderKeyClasses);
      ccClassKey2Context$2[_ccClassKey] = ccClassContext;
    }

    return {
      _module: module,
      _connect,
      _ccClassKey,
      _watchedKeys
    };
  }

  function createDispatcher () {
    const ccClassKey = CC_DISPATCHER;
    mapRegInfo(MODULE_DEFAULT, ccClassKey, '', CC_CLASS, [], [], false, 'cc');
    const mockRef = {
      setState: noop,
      forceUpdate: noop
    };
    buildRefCtx(mockRef, {
      module: MODULE_DEFAULT,
      ccClassKey,
      state: {}
    });
    permanentDispatcherRef.value = mockRef;
  }

  const {
    isPJO: isPJO$6,
    okeys: okeys$c,
    isObject: isObject$2
  } = util;

  function checkObj(rootObj, tag) {
    if (!isPJO$6(rootObj)) {
      throw new Error(`${tag} ${INAJ}`);
    }
  }

  function configStoreState(storeState) {
    checkObj(storeState, 'state');
    delete storeState[MODULE_VOID];
    delete storeState[MODULE_CC];
    if (!isObject$2(storeState[MODULE_GLOBAL])) storeState[MODULE_GLOBAL] = {};
    if (!isObject$2(storeState[MODULE_DEFAULT])) storeState[MODULE_DEFAULT] = {};
    const moduleNames = okeys$c(storeState);
    const len = moduleNames.length;

    for (let i = 0; i < len; i++) {
      const moduleName = moduleNames[i];
      const moduleState = storeState[moduleName];
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
    okeys$c(rootReducer).forEach(m => initModuleReducer(m, rootReducer[m], rootGhost[m]));
  }
  function configRootComputed(rootComputed) {
    checkObj(rootComputed, 'computed');
    okeys$c(rootComputed).forEach(m => initModuleComputed(m, rootComputed[m]));
  }
  function configRootWatch(rootWatch) {
    checkObj(rootWatch, 'watch');
    okeys$c(rootWatch).forEach(m => initModuleWatch(m, rootWatch[m]));
  }
  function configRootLifecycle(rootLifecycle) {
    checkObj(rootLifecycle, 'lifecycle');
    okeys$c(rootLifecycle).forEach(m => initModuleLifecycle(m, rootLifecycle[m]));
  }
  function configMiddlewares(middlewares) {
    if (middlewares.length > 0) {
      const ccMiddlewares = ccContext.middlewares;
      ccMiddlewares.length = 0; // 防止热加载重复多次载入middlewares

      middlewares.forEach(m => ccMiddlewares.push(m));
    }
  }
  function configPlugins(plugins) {
    if (plugins.length > 0) {
      const ccPlugins = ccContext.plugins;
      ccPlugins.length = 0; // 防止热加载重复多次载入plugins

      clearCbs(); // 清理掉已映射好的插件回调

      const pluginNameMap = {};
      plugins.forEach(p => {
        ccPlugins.push(p);

        if (p.install) {
          const pluginInfo = p.install(on);
          const e = new Error('plugin.install must return result:{name:string, options?:object}');
          if (!pluginInfo) throw e;
          const pluginName = pluginInfo.name;
          if (!pluginName) throw e;
          if (pluginNameMap[pluginName]) throw new Error(`pluginName[${pluginName}] duplicate`);
          pluginNameMap[pluginName] = 1;
        } else {
          throw new Error('a plugin must export install handler!');
        }
      });
      ccContext.pluginNameMap = pluginNameMap;
    }
  }

  /* eslint-disable camelcase */
  const {
    justWarning: justWarning$6,
    makeError: me$3,
    verboseInfo: vbi$4,
    styleStr: ss,
    color: cl,
    logNormal: logNormal$1
  } = util;
  const {
    runtimeVar: runtimeVar$4,
    ccUKey2ref: ccUKey2ref$2
  } = ccContext;
  let ccUKey2insCount = {};

  function setCcInstanceRef(ccUniqueKey, ref, delayMs) {
    const setRef = () => {
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
    const {
      ccClassKey,
      ccKey,
      ccUniqueKey
    } = ref.ctx;

    if (runtimeVar$4.isDebug) {
      logNormal$1(ss(`register ccKey ${ccUniqueKey} to CC_CONTEXT`), cl());
    }

    const isHot = ccContext.isHotReloadMode();

    if (ccUKey2ref$2[ccUniqueKey]) {
      const dupErr = () => {
        throw me$3(ERR.CC_CLASS_INSTANCE_KEY_DUPLICATE, vbi$4(`ccClass:${ccClassKey},ccKey:${ccKey}`));
      };

      if (isHot) {
        // get existed ins count
        const insCount = getCcKeyInsCount(ccUniqueKey);

        if (insCount > 1) {
          // now cc can make sure the ccKey duplicate
          dupErr();
        } // just warning


        justWarning$6(`
        found ccKey[${ccKey}] duplicated in hot reload mode, please make sure your ccKey is unique manually,
        ${vbi$4(`ccClassKey:${ccClassKey} ccKey:${ccKey} ccUniqueKey:${ccUniqueKey}`)}
      `); // in webpack hot reload mode, cc works not very well,
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
  let justCalledByStartUp = false;

  function _clearInsAssociation(recomputed, otherExcludeKeys) {
    if (recomputed === void 0) {
      recomputed = false;
    }

    clearCuRefer();
    clearCount();
    clearObject(ccContext.event2handlers);
    clearObject(ccContext.ccUKey2handlerKeys);
    const ccUKey2ref = ccContext.ccUKey2ref;
    clearObject(ccContext.handlerKey2handler);
    clearObject(ccUKey2ref, otherExcludeKeys); // 此处故意设置和原来的版本相差几位的数字，
    // 防止resetClassInsUI调用时类组件实例的版本和模块是相同的
    // 导致ui更新未同步到store最新数据

    const {
      getModuleVer,
      incModuleVer,
      replaceMV
    } = ccContext.store;
    const moduleVer = getModuleVer();
    okeys(moduleVer).forEach(m => {
      const curVer = moduleVer[m];
      incModuleVer(m, curVer > 5 ? 1 : 6);
    }); // 用于还原_moduleVer，在resetClassInsUI回调里_moduleVer又变为了 所有的模块版本值为1的奇怪现象.
    // 全局有没有找到重置_moduleVer的地方.

    const lockedMV = JSON.parse(JSON.stringify(moduleVer));

    if (recomputed) {
      const {
        computed,
        watch
      } = ccContext;
      const computedValue = computed._computedValues;
      const watchDep = watch._watchDep;
      const modules = okeys(ccContext.store._state);
      modules.forEach(m => {
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


    return () => {
      // 安排在下一个循环自我刷新
      setTimeout(() => {
        replaceMV(lockedMV);
        otherExcludeKeys.forEach(key => {
          const ref = ccUKey2ref[key];
          ref && ref.ctx.reactForceUpdate();
        });
      }, 0);
    };
  }

  function _pickNonCustomizeIns() {
    const ccUKey2ref = ccContext.ccUKey2ref;
    const ccFragKeys = [];
    const ccClassInsKeys = [];
    okeys(ccUKey2ref).forEach(refKey => {
      const ref = ccUKey2ref[refKey];

      if (ref && ref.__$$ms === MOUNTED) {
        const {
          type
        } = ref.ctx;
        if (type === CC_CLASS) ccClassInsKeys.push(refKey);
      }
    });
    return {
      ccFragKeys,
      ccClassInsKeys
    };
  }

  function _clearAll() {
    clearObject(ccContext.globalStateKeys); // 在codesandbox里，按标准模式组织的代码，如果只是修改了runConcent里相关联的代码，pages目录下的configure调用不会被再次触发的
    // 所以是来自configure调用配置的模块则不参与清理，防止报错

    const toExcludedModules = okeys(ccContext.moduleName2isConfigured).concat([MODULE_DEFAULT, MODULE_CC, MODULE_GLOBAL, MODULE_CC_ROUTER]);
    clearObject(ccContext.reducer._reducer, toExcludedModules);
    clearObject(ccContext.store._state, toExcludedModules, {}, true);
    clearObject(ccContext.computed._computedDep, toExcludedModules);
    clearObject(ccContext.computed._computedValues, toExcludedModules);
    clearObject(ccContext.watch._watchDep, toExcludedModules);
    clearObject(ccContext.middlewares); // class组件实例的依赖要保留，因为它的ref不再被清除（不像function组件那样能在热重载期间能够再次触发unmount和mount）

    const waKey2uKeyMap = ccContext.waKey2uKeyMap;
    okeys(waKey2uKeyMap).forEach(waKey => {
      const uKeyMap = waKey2uKeyMap[waKey];
      const newUKeyMap = {};
      okeys(uKeyMap).forEach(uKey => {
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

    const {
      ccClassInsKeys
    } = _pickNonCustomizeIns();

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
          if (ccContext.runtimeVar.log) console.warn(`attention: make sure [[clearContextIfHot]] been called before app rendered!`);
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

          const ret = _pickNonCustomizeIns(); // !!!重计算各个模块的computed结果


          return _clearInsAssociation(ccContext.reComputed, ret.ccClassInsKeys);
        }
      } else {
        console.warn(`clear failed because of not running under hot reload mode!`);
        return noop;
      }
    } else {
      // 还没有启动过，泽只是标记justCalledByStartUp为true
      justCalledByStartUp = true;
      return noop;
    }
  }

  const {
    justTip: justTip$1,
    getErrStackKeywordLoc: getErrStackKeywordLoc$1
  } = util;
  let cachedLocation = '';

  function checkStartup(err) {
    const info = ccContext.info;
    let curLocation = getErrStackKeywordLoc$1(err, 'startup', 2); // 向下2句找触发run的文件

    if (!curLocation) curLocation = getErrStackKeywordLoc$1(err, 'runConcent', 0);

    const letRunOk = () => {
      ccContext.isHot = true;
      return clearContextIfHot(true);
    };

    const now = Date.now();

    let resetClassInsUI = () => {},
        canStartup = true;

    if (!cachedLocation) {
      cachedLocation = curLocation;
      info.firstStartupTime = now;
      info.latestStartupTime = now;
    } else if (cachedLocation !== curLocation) {
      const tip = `run can only been called one time, try refresh browser to avoid this error`;

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
      canStartup,
      resetClassInsUI
    };
  }

  function startup (_temp, _temp2) {
    let {
      store = {},
      reducer = {},
      ghost = {},
      computed = {},
      watch = {},
      lifecycle = {}
    } = _temp === void 0 ? {} : _temp;
    let {
      plugins = [],
      middlewares = [],
      // consider every error will be throwed by cc? be careful when app in prod mode
      isStrict = false,
      isDebug = false,
      ignoreUndefined = false,
      log = true,
      logVersion = true,
      errorHandler = null,
      warningHandler = null,
      unsafe_moveReducerErrToErrorHandler = false,
      isHot,
      alwaysRenderCaller = true,
      bindCtxToMethod = false,
      computedCompare = false,
      // 表示针对object值需不需要比较
      watchCompare = false,
      // 表示针对object值需不需要比较
      watchImmediate = false,
      reComputed = true,
      extractModuleChangedState = true,
      extractRefChangedState = false,
      objectValueCompare = false,
      nonObjectValueCompare = true,
      localStorage = null,
      act = null,
      asyncCuKeys = null,
      immutLib = null
    } = _temp2 === void 0 ? {} : _temp2;

    try {
      throw new Error();
    } catch (err) {
      const {
        canStartup,
        resetClassInsUI
      } = checkStartup(err);

      if (!canStartup) {
        return;
      }

      try {
        const rv = ccContext.runtimeVar;
        const rh = ccContext.runtimeHandler;
        rv.log = log;
        if (logVersion) justTip$1(`concent version ${ccContext.info.version}`);
        if (isHot !== undefined) ccContext.isHot = isHot;
        ccContext.reComputed = reComputed;
        rh.errorHandler = errorHandler;
        rh.warningHandler = warningHandler;
        rh.act = act;
        rh.immutLib = immutLib;
        rv.asyncCuKeys = asyncCuKeys || [];
        rv.alwaysRenderCaller = alwaysRenderCaller;
        rv.isStrict = isStrict;
        rv.isDebug = isDebug;
        rv.ignoreUndefined = ignoreUndefined;
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
  const {
    isPJO: isPJO$7,
    okeys: okeys$d,
    evalState: evalState$2,
    isFn: isFn$2
  } = util;

  const pError = label => {
    throw new Error(`[[run]]: param error, ${label} ${INAJ}`);
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
    const storeConf = {
      store: {},
      reducer: {},
      ghost: {},
      watch: {},
      computed: {},
      lifecycle: {}
    };

    const buildStoreConf = (m, moduleConf) => {
      const {
        state,
        reducer,
        watch,
        computed,
        ghosts = []
      } = moduleConf;

      if (storeConf.store[m]) {
        throw new Error(`run api error: module[${m}] duplicate`);
      }

      storeConf.store[m] = evalState$2(state);
      if (isFn$2(state)) ccContext.moduleName2stateFn[m] = state;
      storeConf.reducer[m] = reducer;
      storeConf.ghost[m] = ghosts;
      storeConf.watch[m] = watch;
      storeConf.computed[m] = computed;
      storeConf.lifecycle[m] = getLifecycle(moduleConf);
    }; // traversal moduleNames


    okeys$d(store).forEach(m => buildStoreConf(m, store[m])); // these modules pushed by configure api before calling run

    pendingModules.forEach(_ref => {
      let {
        module,
        config
      } = _ref;
      // user put this module to run api 1th models param again, here just ignore this one
      if (storeConf.store[module]) return; // configure pending module

      buildStoreConf(module, config);
    });
    pendingModules.length = 0; // clear pending modules

    startup(storeConf, options);
  }

  const {
    store: {
      getState: getState$6
    }
  } = ccContext;
  /** 由首次render触发, 在beforeMount里调用 */

  function triggerComputedAndWatch (ref) {
    const ctx = ref.ctx; // 取原始对象，防止 computeValueForRef 里用 Object.assign 触发依赖收集

    const {
      hasComputedFn,
      hasWatchFn,
      connectedModules,
      module: refModule,
      unProxyState
    } = ctx;
    const callInfo = makeCallInfo(refModule);

    const cuOrWatch = op => {
      op(ref, refModule, unProxyState, unProxyState, callInfo, true);
      connectedModules.forEach(m => {
        const mState = getState$6(m);
        const tmpCallInfo = makeCallInfo(m);
        op(ref, m, mState, mState, tmpCallInfo, true);
      });
    };

    if (hasComputedFn) cuOrWatch(computeValueForRef);
    if (hasWatchFn) cuOrWatch(watchKeyForRef);
  }

  /** @typedef {import('../../types-inner').IRef} IRef */
  const {
    okeys: okeys$e,
    makeCuDepDesc: makeCuDepDesc$1,
    isFn: isFn$3
  } = util;
  const {
    runtimeVar: runtimeVar$5
  } = ccContext;
  /**
   * @param {IRef} ref
   * @param {Function} setup
   * @param {boolean} bindCtxToMethod
   * @param {MultiComputed | MultiComputedFn} cuDesc
   */

  function beforeMount(ref, setup, bindCtxToMethod, cuDesc) {
    const ctx = ref.ctx;
    ref.__$$ms = NOT_MOUNT; // flag ref is at before mount step

    ctx.__$$inBM = true; // 先调用setup，setup可能会定义computed,watch，同时也可能调用ctx.reducer,所以setup放在fill reducer之后

    if (setup) {
      const tip = 'type of setup';
      if (!isFn$3(setup)) throw new Error(`${tip} ${INAF}`);
      const settingsObj = setup(ctx) || {};
      if (!isPJO(settingsObj)) throw new Error(`${tip} return result ${INAJ}`); // 优先读自己的，再读全局的

      if (bindCtxToMethod === true || runtimeVar$5.bindCtxToMethod === true && bindCtxToMethod !== false) {
        okeys$e(settingsObj).forEach(name => {
          const settingValue = settingsObj[name];
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

    const {
      computedDep,
      watchDep
    } = ctx;

    if (!computedDep[MODULE_GLOBAL]) {
      computedDep[MODULE_GLOBAL] = makeCuDepDesc$1();
    }

    if (!watchDep[MODULE_GLOBAL]) {
      watchDep[MODULE_GLOBAL] = makeCuDepDesc$1();
    }

    triggerComputedAndWatch(ref);
    ctx.__$$inBM = false;
  }

  const {
    moduleName2stateKeys: moduleName2stateKeys$2,
    store: {
      getPrevState: getPrevState$2,
      getState: getState$7,
      getStateVer: getStateVer$1
    }
  } = ccContext;

  const warn = (key, frag) => justWarning(`effect: key[${key}] is invalid, its ${frag} has not been declared in' store!`);

  function mapSettedList(settedList) {
    return settedList.reduce((map, _ref) => {
      let {
        module,
        keys
      } = _ref;
      keys.forEach(key => map[`${module}/${key}`] = 1);
      return map;
    }, {});
  }

  function triggerSetupEffect (ref, callByDidMount) {
    const ctx = ref.ctx;
    const {
      effectItems,
      eid2effectReturnCb,
      effectPropsItems,
      eid2effectPropsReturnCb
    } = ctx.effectMeta;
    const {
      __$$prevMoStateVer,
      __$$settedList,
      module: refModule
    } = ctx;

    const makeItemHandler = (eid2cleanCb, isFirstCall, needJudgeImmediate) => item => {
      const {
        fn,
        eId,
        immediate
      } = item;

      if (needJudgeImmediate) {
        if (immediate === false) return;
      }

      const prevCb = eid2cleanCb[eId];
      if (prevCb) prevCb(ctx); // let ctx.effect have the totally same behavior with useEffect

      const cb = fn(ctx, isFirstCall);
      eid2cleanCb[eId] = cb; //不管有没有返回，都要覆盖之前的结果
    };

    if (callByDidMount) {
      // flag isFirstCall as true
      effectItems.forEach(makeItemHandler(eid2effectReturnCb, true, true));
      effectPropsItems.forEach(makeItemHandler(eid2effectPropsReturnCb, true, true));
      return;
    } // callByDidUpdate
    // start handle effect meta data of state keys


    const prevState = ctx.prevState;
    const curState = ctx.unProxyState;
    const toBeExecutedFns = [];
    effectItems.forEach(item => {
      // const { status, depKeys, fn, eId } = item;
      // if (status === EFFECT_STOPPED) return;
      // todo, 优化为effectDep模式, 利用differStateKeys去命中执行函数
      const {
        modDepKeys,
        depKeys,
        compare,
        fn,
        eId
      } = item;

      if (!depKeys) {
        return toBeExecutedFns.push({
          fn,
          eId
        });
      }

      const keysLen = modDepKeys.length;
      if (keysLen === 0) return;
      const mappedSettedKey = mapSettedList(__$$settedList);
      let shouldEffectExecute = false;

      for (let i = 0; i < keysLen; i++) {
        const key = modDepKeys[i];
        const [module, unmoduledKey] = key.split('/');
        let targetCurState, targetPrevState;

        if (module !== refModule) {
          const prevState = getPrevState$2(module);
          const moduleStateVer = getStateVer$1(module);

          if (__$$prevMoStateVer[unmoduledKey] === moduleStateVer[unmoduledKey]) {
            continue;
          } else {
            __$$prevMoStateVer[unmoduledKey] = moduleStateVer[unmoduledKey];
          }

          if (!prevState) {
            warn(key, `module[${module}]`);
            continue;
          }

          if (!moduleName2stateKeys$2[module].includes(unmoduledKey)) {
            warn(key, `unmoduledKey[${unmoduledKey}]`);
            continue;
          }

          targetCurState = getState$7(module);
          targetPrevState = prevState;
        } else {
          targetCurState = curState;
          targetPrevState = prevState;
        }

        const isValChanged = targetPrevState[unmoduledKey] !== targetCurState[unmoduledKey];

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
          fn,
          eId
        });
      }
    }); // flag isFirstCall as false, start to run state effect fns

    toBeExecutedFns.forEach(makeItemHandler(eid2effectReturnCb, false, false)); // start handle effect meta data of props keys

    const prevProps = ctx.prevProps;
    const curProps = ctx.props;
    const toBeExecutedPropFns = [];
    effectPropsItems.forEach(item => {
      const {
        depKeys,
        fn,
        eId
      } = item;

      if (!depKeys) {
        return toBeExecutedPropFns.push({
          fn,
          eId
        });
      }

      const keysLen = depKeys.length;
      let shouldEffectExecute = false;

      for (let i = 0; i < keysLen; i++) {
        const key = depKeys[i];

        if (prevProps[key] !== curProps[key]) {
          shouldEffectExecute = true;
          break;
        }
      }

      if (shouldEffectExecute) toBeExecutedPropFns.push({
        fn,
        eId
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
    const waKeys = okeys(compareWaKeys);
    const waKeyKen = waKeys.length;
    if (waKeyKen === 0) return;
    let shouldLetCacheExpire = false;
    waKeys.forEach(waKey => {
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
    const ctx = ref.ctx;
    ctx.__$$renderStatus = END;
    const {
      module: refModule,
      connectedModules,
      connect,
      ccUniqueKey,
      __$$compareWaKeys,
      __$$compareWaKeyCount,
      __$$compareConnWaKeys,
      __$$compareConnWaKeyCount
    } = ctx; // if ref is autoWatch status, should del belong module dep dynamically after every render period

    if (ctx.__$$autoWatch) {
      delDep(__$$compareWaKeys, __$$compareWaKeyCount, refModule, ccUniqueKey);
    }

    connectedModules.forEach(m => {
      // if ref is autoWatch status, should del connected module dep dynamically after every render period
      if (connect[m] === '-') {
        const __$$compareWaKeys = __$$compareConnWaKeys[m];
        const __$$compareWaKeyCount = __$$compareConnWaKeyCount[m];
        delDep(__$$compareWaKeys, __$$compareWaKeyCount, m, ccUniqueKey);
      }
    });
  }

  const {
    _lifecycle,
    _mountedOnce
  } = lifecycle;
  const {
    store: {
      getModuleVer: getModuleVer$3
    }
  } = ccContext;

  function triggerLifecyleMounted(allModules, mstate) {
    const handleOneModule = m => {
      safeAdd(module2insCount, m, 1);
      const moduleLifecycle = _lifecycle[m];
      if (!moduleLifecycle) return;
      const mounted = moduleLifecycle.mounted;
      if (!mounted) return;
      if (_mountedOnce[m] === true) return;

      if (module2insCount[m] == 1) {
        const once = mounted(makeModuleDispatcher(m), mstate);
        _mountedOnce[m] = getVal(once, true);
      }
    };

    allModules.forEach(handleOneModule);
  }

  function didMount(ref) {
    afterRender(ref);
    ref.__$$ms = MOUNTED;
    const {
      ccUniqueKey,
      __$$onEvents,
      __$$staticWaKeys,
      module,
      allModules,
      __$$mstate,
      __$$prevModuleVer,
      __$$queuedUpdaters
    } = ref.ctx;
    setRef(ref); // 开发模式下双调用模型里 effect ---> clear effect ---> effect 的顺序导致依赖可能丢失，这里恢复一下

    mayRecoverDepRecord(ccUniqueKey); // 确保组件挂载时在绑定事件，以避免同一个组件(通常是function组件, 因为cursor问题)，
    // 走了 (1)mount ---> (2)mount ---> (1)unmount 时把2本来也要监听的事件清理掉
    // 同时本身来说，挂载好的组件监听事件才是安全的

    if (__$$onEvents.length > 0) {
      __$$onEvents.forEach(_ref => {
        let {
          inputEvent,
          handler
        } = _ref;
        const {
          name: event,
          identity
        } = getEventItem(inputEvent);
        bindEventHandlerToCcContext(module, ref.ctx.ccClassKey, ccUniqueKey, event, identity, handler);
      });

      __$$onEvents.length = 0;
    }

    const __$$staticWaKeyList = okeys(__$$staticWaKeys); // 用于辅助记录依赖映射


    ref.ctx.__$$staticWaKeyList = __$$staticWaKeyList; // 记录静态依赖

    __$$staticWaKeyList.forEach(modStateKey => mapStaticInsM(modStateKey, ccUniqueKey));

    triggerSetupEffect(ref, true);
    triggerLifecyleMounted(allModules, __$$mstate); // fix warning: Cannot update a component (`XX`) while rendering a different component (`YY`)

    if (__$$queuedUpdaters.length) {
      __$$queuedUpdaters.forEach(up => up());

      __$$queuedUpdaters.length = 0;
    } // 组件的didMount触发会在lifecycle.initState调用之后，此处版本可能已落后，需要自我刷新一下


    if (__$$prevModuleVer !== getModuleVer$3(module)) {
      ref.ctx.reactForceUpdate();
    }
  }

  function didUpdate(ref) {
    afterRender(ref);
    triggerSetupEffect(ref); //!!! 将最新的state记录为prevState，方便下一轮渲染完毕执行triggerSetupEffect时做比较用
    //注意一定是先调用triggerSetupEffect，再赋值

    ref.ctx.prevState = ref.ctx.unProxyState;
  }

  const {
    ccUKey2ref: ccUKey2ref$3,
    ccUKey2handlerKeys: ccUKey2handlerKeys$1,
    runtimeVar: runtimeVar$6,
    handlerKey2handler: handlerKey2handler$1
  } = ccContext;
  function unsetRef (ccUniqueKey) {
    if (runtimeVar$6.isDebug) {
      logNormal(styleStr(`${ccUniqueKey} unset ref`), color('purple'));
    }

    delete ccUKey2ref$3[ccUniqueKey];
    if (ccContext.isHotReloadMode()) decCcKeyInsCount(ccUniqueKey);
    const handlerKeys = ccUKey2handlerKeys$1[ccUniqueKey];

    if (handlerKeys) {
      handlerKeys.forEach(hKey => {
        delete handlerKey2handler$1[hKey];
      });
    }
  }

  const {
    _lifecycle: _lifecycle$1,
    _willUnmountOnce
  } = lifecycle;

  function executeClearCb(cbMap, ctx) {
    const execute = key => {
      // symbolKey or normalKey
      const cb = cbMap[key];
      if (isFn(cb)) cb(ctx);
    };

    Object.getOwnPropertySymbols(cbMap).forEach(execute);
    okeys(cbMap).forEach(execute);
  }

  function triggerLifecycleWillUnmount(allModules, mstate) {
    const handleOneModule = m => {
      module2insCount[m] -= 1;
      const moduleLifecycle = _lifecycle$1[m];
      if (!moduleLifecycle) return;
      const willUnmount = moduleLifecycle.willUnmount;
      if (!willUnmount) return;
      if (_willUnmountOnce[m] === true) return;

      if (module2insCount[m] === 0) {
        const once = willUnmount(makeModuleDispatcher(m), mstate);
        _willUnmountOnce[m] = getVal(once, true);
      }
    };

    allModules.forEach(handleOneModule);
  }

  function beforeMount$1(ref) {
    // 标记一下已卸载，防止组件卸载后，某个地方有异步的任务拿到了该组件的引用，然后执行setState，导致
    // Warning: Can't perform a React state update on an unmounted component. This is a no-op ......
    const curMs = ref.__$$ms;
    ref.__$$ms = UNMOUNTED;
    const ctx = ref.ctx;
    const {
      ccUniqueKey,
      module,
      allModules,
      __$$staticWaKeyList,
      __$$mstate
    } = ctx; // 正常情况下只有挂载了组件才会有effect等相关定义

    if (curMs === MOUNTED) {
      const {
        eid2effectReturnCb,
        eid2effectPropsReturnCb
      } = ctx.effectMeta;
      executeClearCb(eid2effectReturnCb, ctx);
      executeClearCb(eid2effectPropsReturnCb, ctx);
      offEventHandlersByCcUniqueKey(ccUniqueKey);
    } // 删除记录的动态依赖


    const waKeys = ctx.getWatchedKeys(); // no module prefix

    waKeys.forEach(k => delIns(module, k, ccUniqueKey));
    const connWaKeys = ctx.getConnectWatchedKeys();
    okeys(connWaKeys).map(m => {
      const waKeys = connWaKeys[m];
      waKeys.forEach(k => delIns(m, k, ccUniqueKey));
    }); // 删除记录的静态依赖

    __$$staticWaKeyList.forEach(modStateKey => delStaticInsM(modStateKey, ccUniqueKey)); // let findUpdateRefs cache expire


    allModules.forEach(createModuleNode);
    unsetRef(ccUniqueKey);
    triggerLifecycleWillUnmount(allModules, __$$mstate);
  }

  /** eslint-disable */
  function beforeRender (ref, mapProps) {
    const ctx = ref.ctx;
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

    const {
      connectedModules,
      connect
    } = ctx;
    connectedModules.forEach(m => {
      // 非自动收集，在make-ob-state里不会触发get，这里直接跳出
      if (connect[m] !== '-') return;
      ctx.__$$curConnWaKeys[m] = {};
      ctx.__$$compareConnWaKeys[m] = ctx.__$$nextCompareConnWaKeys[m];
      ctx.__$$compareConnWaKeyCount[m] = ctx.__$$nextCompareConnWaKeyCount[m]; // 渲染期间再次收集

      ctx.__$$nextCompareConnWaKeys[m] = {};
      ctx.__$$nextCompareConnWaKeyCount[m] = 0;
    }); // 外面始终取 ctx.__$$mapped 传给 CcFragment registerHookComp registerDumb 的 render 函数里的 createElement 调用处，
    // 具体 ctx.__$$mapped 指向什么取决于有没有传递 mapProps
    // 传递 mapProps，则传 mapped 给 createElement 函数 props 参数，没传 mapProps，则直接透传 ctx 给 createElement 函数 props 参数
    // !!! 这个规则或许将来某一天会改掉，始终传递 ctx 给 render 函数，这样简单的设定更适合编码思维，而不是存在多种形态

    if (mapProps) {
      const mapped = mapProps(ctx);

      if (isPJO(mapped)) {
        Object.assign(ctx.mapped, mapped);
      }

      ctx.__$$mapped = ctx.mapped;
    } else {
      ctx.__$$mapped = ctx;
    }
  }

  // import hoistNonReactStatic from 'hoist-non-react-statics';
  const {
    ccClassDisplayName: ccClassDisplayName$1,
    shallowDiffers: shallowDiffers$1,
    evalState: evalState$3
  } = util;

  const setupErr = info => new Error(`can not defined setup both in register options and class body, --verbose: ${info}`);

  function register(_temp, ccClassKey) {
    let {
      module = MODULE_DEFAULT,
      state = {},
      watchedKeys = '-',
      storedKeys = [],
      setup = null,
      cuDesc = null,
      persistStoredKeys,
      connect = {},
      extra = {},
      staticExtra,
      tag,
      lite,
      isPropsProxy = false,
      renderKeyClasses,
      __checkStartUp = true,
      compareProps = true,
      __calledBy
    } = _temp === void 0 ? {} : _temp;

    if (ccClassKey === void 0) {
      ccClassKey = '';
    }

    try {
      const {
        _module,
        _ccClassKey,
        _connect,
        _watchedKeys
      } = mapRegInfo(module, ccClassKey, renderKeyClasses, CC_CLASS, watchedKeys, connect, __checkStartUp, __calledBy);
      return function (ReactClass) {
        if (ReactClass.prototype && ReactClass.prototype.$$attach) {
          throw new Error(`register a cc class is prohibited!`);
        } // const isClsPureComponent = ReactClass.prototype.isPureReactComponent;


        const ToBeExtendedClass = isPropsProxy === false ? ReactClass : React.Component;
        const staticSetup = ToBeExtendedClass.$$setup;

        const _CcClass = class CcClass extends ToBeExtendedClass {
          constructor(props, context) {
            super(props, context);

            try {
              const optState = evalState$3(state);
              const thisState = this.state || {};
              const privState = Object.assign(thisState, optState);
              this.$$attach = this.$$attach.bind(this); // props.ccOption

              const params = Object.assign({}, props, {
                module: _module,
                tag,
                state: privState,
                type: CC_CLASS,
                insType: CC_CUSTOMIZE,
                watchedKeys: _watchedKeys,
                ccClassKey: _ccClassKey,
                connect: _connect,
                storedKeys,
                persistStoredKeys,
                extra,
                staticExtra
              });
              buildRefCtx(this, params, lite);
              this.ctx.reactSetState = makeRefSetState(this);
              this.ctx.reactForceUpdate = makeRefForceUpdate(this);

              if (setup && (this.$$setup || staticSetup)) {
                throw setupErr(`ccUniqueKey ${this.ctx.ccUniqueKey}`);
              }

              if (!isPropsProxy) {
                if (this.$$setup) this.$$setup = this.$$setup.bind(this);
                beforeMount(this, setup || this.$$setup || staticSetup, false, cuDesc);
              } // isPropsProxy为true时，延迟到$$attach里执行beforeMount

            } catch (err) {
              rh.tryHandleError(err);
            }
          } // 如果代理组件或者继承组件没有没有实现scu，则同时比较nextState nextProps
          // 因为nextProps不同也会导致重渲染，所以需要约束用户不要把可变数据从props传下来，以提高性能


          shouldComponentUpdate(nextProps, nextState) {
            const childRef = this.ctx.childRef;

            if (childRef && childRef.shouldComponentUpdate) {
              return childRef.shouldComponentUpdate(nextProps, nextState);
            } else if (super.shouldComponentUpdate) {
              return super.shouldComponentUpdate(nextProps, nextState);
            }

            const isPropsChanged = compareProps ? shallowDiffers$1(this.props, nextProps) : false;
            return this.state !== nextState || isPropsChanged;
          } //!!! 存在多重装饰器时, 或者用户想使用this.props.***来用concent类时
          //!!! 必需在类的【constructor】 里调用 this.props.$$attach(this),紧接着state定义之后


          $$attach(childRef) {
            const ctx = this.ctx;
            ctx.childRef = childRef;
            childRef.ctx = ctx; // 让代理属性的目标组件访问ctx时，既可以写 this.props.ctx 也可以写 this.ctx
            // 让孩子引用的setState forceUpdate 指向父容器事先构造好的setState forceUpdate

            childRef.setState = ctx.setState;
            childRef.forceUpdate = ctx.forceUpdate;

            if (isObjectNotNull(childRef.state)) {
              Object.assign(ctx.state, childRef.state, ctx.__$$mstate);
            }

            if (childRef.$$setup) childRef.$$setup = childRef.$$setup.bind(childRef);
            if (setup && (childRef.$$setup || staticSetup)) throw setupErr(`ccUniqueKey ${ctx.ccUniqueKey}`);
            beforeMount(this, setup || childRef.$$setup || staticSetup, false, cuDesc);
            beforeRender(this);
          }

          componentDidMount() {
            // 属性代理模式，必需在组件consturctor里调用 props.$$attach(this)
            // you must call it in next line of state assign expression 
            if (isPropsProxy && !this.ctx.childRef) {
              throw new Error('forget call props.$$attach(this) in constructor when set isPropsProxy true');
            }

            if (super.componentDidMount) super.componentDidMount();
            didMount(this);
          }

          componentDidUpdate(prevProps, prevState, snapshot) {
            // if (super.componentDidUpdate) super.componentDidUpdate(prevProps, prevState, snapshot);
            // @see https://codesandbox.io/s/example-modular-1-forked-z3xsb?file=/src/App.js
            // prevState 不对，ctx.prevState是正确的 透传给用户
            if (super.componentDidUpdate) super.componentDidUpdate(prevProps, this.ctx.prevState, snapshot);
            didUpdate(this);
          }

          componentWillUnmount() {
            if (super.componentWillUnmount) super.componentWillUnmount();
            beforeMount$1(this);
          } // 注：strict mode 模式下，class组件的双调用机制行为和function组件不一样
          // constructor x2 ---> render x2 ---> componentDidMount x1
          // 两次构造器里虽然生成了不同的refCtx，但是两次render里给的 this.ctx 始终是最新的那一个
          // 所以此处不需要像 useConcent 一样做ef标记


          render() {
            const outProps = this.props;
            this.ctx.prevProps = this.ctx.props;
            this.ctx.props = outProps;
            beforeRender(this);

            if (isPropsProxy === false) {
              // now cc class extends ReactClass, call super.render()
              return super.render();
            } else {
              //将$$attach传递下去，用户需在构造器里最后一样调用props.$$attach()
              const passedProps = Object.assign({}, outProps, {
                ctx: this.ctx,
                $$attach: this.$$attach
              });
              return React.createElement(ReactClass, passedProps);
            }
          }

        };

        const displayName = ReactClass.displayName || _ccClassKey;
        _CcClass.displayName = ccClassDisplayName$1(displayName);
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
    const _registerOption = getRegisterOptions(registerOption);

    delete _registerOption.__checkStartUp;
    delete _registerOption.__calledBy;
    return register(_registerOption, ccClassKey);
  }

  function _connect (connectSpec, ccClassKey) {
    const connect = connectSpec || [];
    return register$1({
      connect
    }, ccClassKey);
  }

  /* eslint-disable camelcase */
  const {
    getRegisterOptions: getRegisterOptions$1,
    evalState: evalState$4
  } = util;
  function initCcFrag (ref, props) {
    const registerOptions = getRegisterOptions$1(props.register);
    const {
      module,
      renderKeyClasses,
      tag,
      lite,
      compareProps = true,
      setup,
      bindCtxToMethod,
      watchedKeys = '-',
      connect = {},
      storedKeys = [],
      cuDesc = null
    } = registerOptions;
    const state = evalState$4(registerOptions.state);
    const {
      ccClassKey,
      ccKey,
      ccOption = {},
      id
    } = props;
    let target_watchedKeys = watchedKeys;
    let target_ccClassKey = ccClassKey;
    let target_connect = connect;
    let insType = CC_CUSTOMIZE; //直接使用<CcFragment />构造的cc实例, 尝试提取storedKeys, 然后映射注册信息，（注：registerDumb创建的组件已在外部调用过mapRegistrationInfo）

    if (props.__$$regDumb !== true) {
      insType = CC_FRAGMENT;
      const {
        _ccClassKey,
        _connect,
        _watchedKeys
      } = mapRegInfo(module, ccClassKey, renderKeyClasses, CC_CLASS, watchedKeys, connect, true);
      target_watchedKeys = _watchedKeys;
      target_ccClassKey = _ccClassKey;
      target_connect = _connect;
    }

    buildRefCtx(ref, {
      ccKey,
      connect: target_connect,
      state,
      module,
      type: CC_CLASS,
      insType,
      storedKeys,
      watchedKeys: target_watchedKeys,
      tag,
      ccClassKey: target_ccClassKey,
      ccOption,
      id
    }, lite);
    ref.ctx.reactSetState = makeRefSetState(ref);
    ref.ctx.reactForceUpdate = makeRefForceUpdate(ref);
    ref.__$$compareProps = compareProps; //对于concent来说，ctx在constructor里构造完成，此时就可以直接把ctx传递给beforeMount了，
    //无需在将要给废弃的componentWillMount里调用beforeMount

    beforeMount(ref, setup, bindCtxToMethod, cuDesc);
  }

  const connectToStr = connect => {
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

  /* eslint-disable */
  const {
    shallowDiffers: shallowDiffers$2,
    isFn: isFn$4
  } = util;
  const nullSpan = React.createElement('span', {
    style: {
      display: 'none'
    }
  });

  class CcFragment extends React.Component {
    constructor(props, context) {
      super(props, context);
      initCcFrag(this, props);
    }

    componentDidMount() {
      didMount(this);
    }

    shouldComponentUpdate(nextProps, nextState) {
      const props = getOutProps(nextProps);
      const isPropsChanged = this.__$$compareProps ? shallowDiffers$2(props, getOutProps(this.props)) : false; // 检测到register已发送变化，需要重新走一把卸载和初始化流程

      if (isPropsChanged && isRegChanged(props.register, this.props.register)) {
        beforeMount$1(this);
        initCcFrag(this, props);
        didMount(this);
        this.ctx.reactForceUpdate();
        return false;
      }

      return this.state !== nextState || isPropsChanged;
    } // componentDidUpdate(prevProps, prevState) {


    componentDidUpdate() {
      didUpdate(this);
    }

    componentWillUnmount() {
      beforeMount$1(this);
    }

    render() {
      // 注意这里，一定要每次都取最新的绑在ctx上，确保交给renderProps的ctx参数里的state和props是最新的
      const thisProps = this.props;
      this.ctx.prevProps = this.ctx.props;
      this.ctx.props = getOutProps(thisProps); // eslint-disable-next-line

      const {
        children,
        render,
        register = {}
      } = thisProps;
      const view = render || children;

      if (isFn$4(view)) {
        beforeRender(this, register.mapProps);
        return view(this.ctx) || nullSpan; // return view(this.ctx.__$$mapped) || nullSpan;
      } else {
        if (React.isValidElement(view)) {
          // 直接传递dom，无论state怎么改变都不会再次触发渲染
          throw new Error(`CcFragment's children can not be a react dom`);
        }

        return view;
      }
    }

  }

  /* eslint-disable react/prop-types */

  function _registerDumb(Dumb, regOpt) {
    const {
      ccClassKey,
      props = {}
    } = regOpt;

    const render = ctx => React.createElement(Dumb, ctx.__$$mapped); // ccKey由实例化的Dumb组件props上透传下来


    const passProps = {
      __$$regDumb: true,
      props,
      ccOption: props.ccOption,
      ccClassKey,
      render,
      ccKey: props.ccKey,
      register: regOpt
    };
    return React.createElement(CcFragment, passProps);
  } // renderKeyClasses, tag, mapProps, module = MODULE_DEFAULT,
  // watchedKeys = '*', storedKeys, persistStoredKeys, render: Dumb,
  // connect = {}, state = {}, setup, bindCtxToMethod, compareProps, lite,
  // bindCtxToMethod


  function registerDumb (registerOption, ccClassKey) {
    const _registerOption = getRegisterOptions(registerOption);

    const {
      renderKeyClasses,
      module,
      watchedKeys = '-',
      render: Dumb,
      connect = {}
    } = _registerOption;
    const {
      _module,
      _ccClassKey,
      _connect,
      _watchedKeys
    } = mapRegInfo(module, ccClassKey, renderKeyClasses, CC_FRAGMENT, watchedKeys, connect, true);
    _registerOption.module = _module;
    _registerOption.watchedKeys = _watchedKeys;
    _registerOption.ccClassKey = _ccClassKey;
    _registerOption.connect = _connect;

    function buildCcFragComp(Dumb) {
      // 避免react dev tool显示的dom为Unknown
      const ConnectedFragment = props => {
        _registerOption.props = props;
        return _registerDumb(Dumb, _registerOption);
      };

      return ConnectedFragment;
    }

    if (Dumb) {
      return buildCcFragComp(Dumb);
    } else {
      return Dumb => buildCcFragComp(Dumb);
    }
  }

  function _connectDumb (connectSpec, ccClassKey) {
    const connect = connectSpec || [];
    return registerDumb({
      connect
    }, ccClassKey);
  }

  let isStrictMode = false;
  const locMsgs = {
    1: '',
    2: ''
  };

  function isLocEqual() {
    const mark = 'atbeginWork';
    const locStr1 = locMsgs[1].replace(/ /g, '');
    const locStr2 = locMsgs[2].replace(/ /g, ''); // 来自 react 18 影响，此处需要优化为更严格的判断
    // 截掉中间影响判断的一段，以 atbeginWork 为标记，向左找到第二个分号位置，作为截取参数
    // react-dom.development.js:20909:19)\natbeginWork
    // react-dom.development.js:20838:13)\natbeginWork

    const find2ndSemicolonIdx = (str, startIndex) => {
      let targetIdx = startIndex;
      let semicolonCount = 0;

      for (let tmpIdx = startIndex; tmpIdx >= 0; tmpIdx--) {
        const char = str[tmpIdx];

        if (char === ':') {
          semicolonCount++;
        }

        if (semicolonCount === 2) {
          targetIdx = tmpIdx;
          break;
        }
      }

      return targetIdx;
    };

    const markIdx1 = locStr1.indexOf(mark);

    if (markIdx1 === -1) {
      // 非 react 18 版本或线上已编译版本
      return false;
    }

    const markIdx2 = locStr2.indexOf(mark);
    const semi1 = find2ndSemicolonIdx(locStr1, markIdx1);
    const semi2 = find2ndSemicolonIdx(locStr2, markIdx2);
    const newLocStr1 = `${locStr1.substring(0, semi1)}${locStr1.substring(markIdx1)}`;
    const newLocStr2 = `${locStr2.substring(0, semi2)}${locStr2.substring(markIdx2)}`;
    return newLocStr1 === newLocStr2;
  }

  function recordFirst2HookCallLoc(cursor, msg) {
    locMsgs[cursor] = msg;

    if (cursor === 2 && isLocEqual()) {
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
  const {
    ccUKey2ref: ccUKey2ref$4
  } = ccContext;
  const cursor2hookCtx = {};
  let refCursor = 1;

  function getUsableCursor() {
    const toReturn = refCursor;
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

    const state = rState || evalState(iState);
    const {
      renderKeyClasses,
      module,
      watchedKeys = '-',
      connect = {},
      setup,
      lite,
      cuDesc,
      bindCtxToMethod
    } = regOpt;
    const {
      _module,
      _ccClassKey,
      _connect,
      _watchedKeys
    } = mapRegInfo(module, ccClassKey, renderKeyClasses, CC_HOOK, watchedKeys, connect, true);
    const hookRef = ref || new CcHook(hookState, hookSetter, props, hookCtx);
    hookCtx.hookRef = hookRef;
    const params = Object.assign({}, regOpt, {
      module: _module,
      watchedKeys: _watchedKeys,
      state,
      type: CC_HOOK,
      insType,
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
    const refCtx = hookRef.ctx;
    refCtx.props = props; // attach props to ctx

    beforeMount(hookRef, setup, bindCtxToMethod, cuDesc);
    hookCtx.prevCcUKey = hookCtx.ccUKey;
    hookCtx.ccUKey = hookRef.ctx.ccUniqueKey; // rewrite useRef for CcHook

    refCtx.useRef = function useR(refName) {
      // give named function to avoid eslint error
      const ref = React.useRef(null);
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

  const tip = 'react version is LTE 16.8';

  function _useConcent(registerOption, ccClassKey, insType) {
    if (registerOption === void 0) {
      registerOption = {};
    }

    const cursor = getUsableCursor();

    const _registerOption = getRegisterOptions(registerOption);

    if (shouldGuessStrictMode && [1, 2].includes(cursor)) {
      try {
        throw new Error('guess strict mode');
      } catch (err) {
        recordFirst2HookCallLoc(cursor, err.stack);
      }
    }

    const reactUseState = React.useState;

    if (!reactUseState) {
      throw new Error(tip);
    } // ef: effectFlag


    const hookCtxContainer = React.useRef({
      cursor,
      prevCcUKey: null,
      ccUKey: null,
      regOpt: _registerOption,
      ef: 0
    });
    const hookCtx = hookCtxContainer.current;
    const {
      state: iState = {},
      props = {},
      mapProps,
      layoutEffect = false,
      extra
    } = _registerOption;
    const isFirstRendered = cursor === hookCtx.cursor;
    const state = isFirstRendered ? evalState(iState) : 0;
    const [hookState, hookSetter] = reactUseState(state);

    const cref = ref => buildRef(ref, insType, hookCtx, state, iState, _registerOption, hookState, hookSetter, props, ccClassKey);

    let hookRef; // 组件刚挂载 or 渲染过程中变化module或者connect的值，触发创建新ref

    if (isFirstRendered || isRegChanged(hookCtx.regOpt, _registerOption)) {
      hookCtx.regOpt = _registerOption;
      hookRef = cref();
    } else {
      hookRef = ccUKey2ref$4[hookCtx.ccUKey]; // [KEY_1] single file demo in hot reload mode

      if (!hookRef) {
        hookRef = cref();
      } else {
        const refCtx = hookRef.ctx;
        refCtx.prevProps = refCtx.props;
        refCtx.props = props;
        hookRef.props = props;

        if (isObject(extra)) {
          Object.assign(refCtx.extra, extra);
        }
      }
    }

    const refCtx = hookRef.ctx;
    const effectHandler = layoutEffect ? React.useLayoutEffect : React.useEffect; // after first render of hookRef just created 

    effectHandler(() => {
      const hookCtx = hookRef.hookCtx;
      hookCtx.ef = 1; // 辅助非StrictMode包裹的区域，在随后的判断里可以逃出被删除逻辑
      // mock componentWillUnmount

      return () => {
        const toUnmountRef = ccUKey2ref$4[getHookCtxCcUKey(hookCtx)];
        hookCtx.prevCcUKey = null;

        if (toUnmountRef) {
          beforeMount$1(toUnmountRef);
        }

        delete cursor2hookCtx[cursor];
      };
    }, [hookRef]); // 渲染过程中变化module或者connect的值，触发卸载前一刻的ref
    // after every render

    effectHandler(() => {
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


      const cursor = hookCtx.cursor;

      if (isStrict() && !hookCtx.clearPrev) {
        hookCtx.clearPrev = true;
        const prevCursor = cursor - 1;
        const prevHookCtx = cursor2hookCtx[prevCursor];

        if (prevHookCtx && prevHookCtx.ef === 0) {
          // 确保是同一个类型的实例
          if (prevHookCtx.hookRef.ctx.ccClassKey === hookCtx.hookRef.ctx.ccClassKey) {
            delete cursor2hookCtx[prevCursor]; // 让来自于concent的渲染通知只触发一次, 注意prevHookRef没有被重复触发过diMount逻辑
            // 所以直接用prevHookCtx.hookRef来执行beforeUnmount

            beforeMount$1(prevHookCtx.hookRef);
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
    let _options = getRegisterOptions(options);

    if (isFn(_options.state)) {
      _options = Object.assign({}, _options);
      _options.state = _options.state();
    }

    function buildCcHookComp(Dumb) {
      const {
        memo = true
      } = _options;
      delete _options.memo;

      const getComp = () => {
        return function CcHookComp(props) {
          _options.props = props;
          const ctx = useConcent(_options, ccClassKey);
          return React.createElement(Dumb, ctx.__$$mapped);
        };
      };

      const Comp = getComp();

      if (memo && React.memo) {
        return React.memo(Comp);
      } else {
        return Comp;
      }
    }

    const Dumb = _options.render;

    if (Dumb) {
      return buildCcHookComp(Dumb);
    } else {
      return Dumb => buildCcHookComp(Dumb);
    }
  }

  /****
   * if you are sure the input state is really belong to global state, call cc.setGlobalState,
   * note! cc will filter the input state to meet global state shape and only pass the filtered state to global module
   */

  function setGlobalState (state, cb, renderKey, delay) {
    const ref = pickOneRef();
    ref.ctx.setGlobalState(state, cb, renderKey, delay);
  }

  function throwApiCallError() {
    throw new Error(`api doc: cc.setState(module:string, state:object, renderKey:string | string[], delayMs?:number, skipMiddleware?:boolean, throwError?:boolean)`);
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
    const dispatcher = pickOneRef();
    dispatcher.ctx.set(moduledKeyPath, val, renderKey, delay);
  }

  var _getState = (module => {
    return ccContext.store.getState(module);
  });

  const getGlobalState = ccContext.store.getGlobalState;

  const _computedValues$4 = ccContext.computed._computedValues;
  var _getGlobalComputed = (() => {
    return _computedValues$4[MODULE_GLOBAL];
  });

  const _computedValues$5 = ccContext.computed._computedValues;
  var getComputed = (module => {
    if (module) return _computedValues$5[module];else return _computedValues$5;
  });

  function getOneModuleCu(moduleName) {
    const moduleCuRaw = ccContext.computed._computedRaw[moduleName];
    const map = {};
    if (!moduleCuRaw) return map;
    const cuKeys = okeys(moduleCuRaw);
    cuKeys.forEach(key => map[key] = getComputed(moduleName)[key]);
    return map;
  }

  function _debugComputed (moduleName) {
    if (moduleName) return getOneModuleCu(moduleName);
    const allModules = okeys(ccContext.store._state);
    const map = {};
    allModules.forEach(key => map[key] = getOneModuleCu(key));
    return map;
  }

  function _emit (event) {
    if (!event) return;
    const ref = pickOneRef();

    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    if (ref) ref.ctx.emit(event, ...args);
  }

  /** @typedef {import('../types-inner').IRef} Ref */
  function _off (event, offOptions) {
    /** @type {Ref} */
    const ref = pickOneRef();
    if (ref) ref.ctx.off(event, offOptions);
  }

  /* eslint-disable camelcase */
  function getRefs (filters) {
    const ccUKey2ref = ccContext.ccUKey2ref;
    let _filters = {};
    if (typeof filters === 'string') _filters = {
      ccClassKey: filters
    };else if (isObject(filters)) _filters = filters;
    const {
      ccClassKey,
      tag,
      moduleName,
      includeNotMount = false
    } = _filters;
    const refs = [];
    const ukeys = okeys(ccUKey2ref);
    const len = ukeys.length;

    const isEqual = (passedVal, ctxVal) => {
      if (!passedVal) return true;
      return passedVal === ctxVal;
    };

    for (let i = 0; i < len; i++) {
      /** @type Ref */
      const ref = ccUKey2ref[ukeys[i]];
      const mountStatus = ref.__$$ms;

      if (includeNotMount) {
        // allow NOT_MOUNT, MOUNTED
        if (mountStatus === UNMOUNTED) continue;
      } else {
        // only allow MOUNTED
        if (mountStatus !== MOUNTED) continue;
      }

      const ctx = ref.ctx;

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

    const refs = getRefs(filters);
    refs.forEach(ref => {
      if (ref.ctx.execute) ref.ctx.execute(...args);
    });
  });

  var _executeAll = (function () {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    const refs = getRefs();
    refs.forEach(ref => {
      if (ref.ctx.execute) ref.ctx.execute(...args);
    });
  });

  const appendState = ccContext.store.appendState;

  const _caller$1 = ccContext.reducer._caller;

  /* eslint-disable react/prop-types,react/display-name */

  const obView = () => 'miss render prop or children';

  let TargetComp = () => React.createElement('h1', {}, 'Ob component needs react ver lte 16.8');

  if (React.memo) {
    TargetComp = React.memo(function (
    /** @type any */
    props) {
      const {
        module,
        connect,
        classKey,
        render,
        children
      } = props;

      if (module && connect) {
        throw new Error('module, connect can not been supplied both');
      } else if (!module && !connect) {
        throw new Error('module or connect should been supplied');
      }

      const view = render || children || obView;
      const register = module ? {
        module
      } : {
        connect
      }; // 设置为1，最小化ctx够造过程，仅附加状态数据，衍生数据、和reducer相关函数

      register.lite = 1;
      const ctx = useConcentForOb(register, classKey);
      const {
        mr,
        cr,
        r
      } = ctx;
      let state, computed;

      if (module) {
        state = ctx.moduleState;
        computed = ctx.moduleComputed;
      } else {
        state = ctx.connectedState;
        computed = ctx.connectedComputed;
      }

      return view([state, computed, {
        mr,
        cr,
        r
      }]);
    });
  }

  TargetComp.displayName = 'Ob';
  var _Ob = TargetComp;

  function _fnPayload (fn) {
    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    return [fn, ...args];
  }

  const {
    bindToContainer: bindToContainer$1,
    safeGet: safeGet$3,
    isOnlineEditor: isOnlineEditor$1
  } = util; // for ssr, fix issue: https://github.com/concentjs/concent/issues/73
  // if (typeof window === 'undefined') {
  //   // eslint-disable-next-line
  //   global && (global.window = {});
  // }

  const _getRef = filters => {
    const refs = getRefs(filters);

    return refs[0];
  };

  const cloneModule = _cloneModule;
  const run = _run;
  const connect = _connect;
  const connectDumb = _connectDumb;
  const register$2 = register$1;
  const registerDumb$1 = registerDumb;
  const registerHookComp$1 = registerHookComp;
  const configure$1 = configure;
  const defineModule = conf => {
    const confCopy = Object.assign({}, conf);
    if (conf.reducer) confCopy.r = confCopy.reducer;
    return confCopy;
  };
  const setGlobalState$1 = setGlobalState;
  const setState$1 = _setState$1;
  const set = _set;
  const getState$8 = _getState;
  const getGlobalState$1 = getGlobalState;
  const getComputed$1 = getComputed;
  const debugComputed = _debugComputed;
  const getGlobalComputed = _getGlobalComputed;
  const emit = _emit;
  const off = _off;
  const dispatch$2 = dispatch;
  const ccContext$1 = ccContext;
  const execute = _execute;
  const executeAll = _executeAll;
  const getRefs$1 = getRefs;
  const getRef = _getRef;
  const reducer$1 = _caller$1;
  const clearContextIfHot$1 = clearContextIfHot;
  const CcFragment$1 = CcFragment;
  const Ob = _Ob;
  const cst$1 = cst;
  const appendState$1 = appendState;
  const useConcent$1 = useConcent;
  const fnPayload = _fnPayload;
  const defComputed = (fn, defOptions) => makeFnDesc(fn, defOptions);
  const defLazyComputed = (fn, defOptions) => {
    const desc = makeFnDesc(fn, defOptions);
    desc.lazy = true;
    return desc;
  };
  const defComputedVal = val => ({
    fn: () => val,
    depKeys: []
  });
  /** @type {import('./types').defWatch} */

  const defWatch = (fn, defOptions) => makeFnDesc(fn, defOptions);

  const innerBindCcTo = (custPrefix, bindTo) => {
    if (!bindTo) return;
    let prefix = custPrefix ? `${custPrefix}_` : '';
    let ccKey = `${prefix}cc`;
    bindToContainer$1(ccKey, defaultExport, bindTo);
    bindToContainer$1(`${prefix}CC_CONTEXT`, ccContext$1, bindTo);
    bindToContainer$1(`${prefix}ccc`, ccContext$1, bindTo);
    bindToContainer$1(`${prefix}cccc`, ccContext$1.computed._computedValues, bindTo);
    bindToContainer$1(`${prefix}sss`, ccContext$1.store._state, bindTo);
    return ccKey;
  };

  let ccKey = null;
  const bindCcToWindow = custPrefix => {
    ccKey = innerBindCcTo(custPrefix, window);
  };
  const defaultExport = {
    cloneModule,
    emit,
    off,
    connect,
    connectDumb,
    register: register$2,
    registerDumb: registerDumb$1,
    registerHookComp: registerHookComp$1,
    configure: configure$1,
    defineModule,
    dispatch: dispatch$2,
    run,
    setGlobalState: setGlobalState$1,
    setState: setState$1,
    set,
    getGlobalState: getGlobalState$1,
    getState: getState$8,
    getComputed: getComputed$1,
    debugComputed,
    getGlobalComputed,
    ccContext: ccContext$1,
    execute,
    executeAll,
    getRefs: getRefs$1,
    getRef,
    reducer: reducer$1,
    clearContextIfHot: clearContextIfHot$1,
    CcFragment: CcFragment$1,
    Ob,
    cst: cst$1,
    appendState: appendState$1,
    useConcent: useConcent$1,
    bindCcToMcc,
    bindCcToWindow,
    defComputed,
    defLazyComputed,
    defComputedVal,
    defWatch,
    fnPayload
  };
  let multiCcContainer = null;
  let mccKey = '';
  function bindCcToMcc(key) {
    if (!multiCcContainer) {
      throw new Error('current env is not multi concent ins mode');
    }

    mccKey = key;
    const subBindTo = safeGet$3(multiCcContainer, key);
    innerBindCcTo('', subBindTo);
  }

  function avoidMultiCcInSameScope() {
    // 适配一些利用iframe做微前端的框架
    if (!isOnlineEditor$1()) {
      return;
    }

    let winCc = window[ccKey] || window.cc;

    if (multiCcContainer && multiCcContainer[mccKey]) {
      winCc = multiCcContainer[mccKey].cc;
    }

    if (!winCc) {
      return;
    }

    if (winCc.ccContext && winCc.ccContext.info) {
      const existedVersion = winCc.ccContext.info.version;
      const newVersion = ccContext$1.info.version; // webpack-dev-server模式下，有些引用了concent的插件或者中间件模块，如果和当前concent版本不一致的话，会保留另外一个concent在其包下
      // 路径如 node_modules/concent-middleware-web-devtool/node_modules/concent（注，在版本一致时，不会出现此问题）
      // 这样的就相当于隐形的实例化两个concent 上下文，这是不允许的

      if (existedVersion !== newVersion) {
        throw new Error(`concent ver conflict! cur[${existedVersion}]-new[${newVersion}], refresh browser or reinstall some concent-eco-lib`);
      }
    }
  }

  let binded = false; // 微前端机构里，如果每个子应用都有自己的cc实例，允许用户绑定到mcc下，避免相互覆盖

  const autoBind = () => {
    if (window) multiCcContainer = window.mcc; // 延迟绑定，等待用户调用 bindCcToWindow
    // 同时检查 cc 版本问题

    setTimeout(() => {
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
  exports.getState = getState$8;
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
  exports.reducer = reducer$1;
  exports.clearContextIfHot = clearContextIfHot$1;
  exports.CcFragment = CcFragment$1;
  exports.Ob = Ob;
  exports.cst = cst$1;
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
