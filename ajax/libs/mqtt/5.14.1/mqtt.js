"use strict";
var mqtt = (() => {
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __esm = (fn, res) => function __init() {
    return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
  };
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __export = (target, all) => {
    for (var name2 in all)
      __defProp(target, name2, { get: all[name2], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // node_modules/esbuild-plugin-polyfill-node/polyfills/__dirname.js
  var init_dirname = __esm({
    "node_modules/esbuild-plugin-polyfill-node/polyfills/__dirname.js"() {
    }
  });

  // node_modules/@jspm/core/nodelibs/browser/process.js
  var process_exports = {};
  __export(process_exports, {
    _debugEnd: () => _debugEnd,
    _debugProcess: () => _debugProcess,
    _events: () => _events,
    _eventsCount: () => _eventsCount,
    _exiting: () => _exiting,
    _fatalExceptions: () => _fatalExceptions,
    _getActiveHandles: () => _getActiveHandles,
    _getActiveRequests: () => _getActiveRequests,
    _kill: () => _kill,
    _linkedBinding: () => _linkedBinding,
    _maxListeners: () => _maxListeners,
    _preload_modules: () => _preload_modules,
    _rawDebug: () => _rawDebug,
    _startProfilerIdleNotifier: () => _startProfilerIdleNotifier,
    _stopProfilerIdleNotifier: () => _stopProfilerIdleNotifier,
    _tickCallback: () => _tickCallback,
    abort: () => abort,
    addListener: () => addListener,
    allowedNodeEnvironmentFlags: () => allowedNodeEnvironmentFlags,
    arch: () => arch,
    argv: () => argv,
    argv0: () => argv0,
    assert: () => assert,
    binding: () => binding,
    browser: () => browser,
    chdir: () => chdir,
    config: () => config,
    cpuUsage: () => cpuUsage,
    cwd: () => cwd,
    debugPort: () => debugPort,
    default: () => process,
    dlopen: () => dlopen,
    domain: () => domain,
    emit: () => emit,
    emitWarning: () => emitWarning,
    env: () => env,
    execArgv: () => execArgv,
    execPath: () => execPath,
    exit: () => exit,
    features: () => features,
    hasUncaughtExceptionCaptureCallback: () => hasUncaughtExceptionCaptureCallback,
    hrtime: () => hrtime,
    kill: () => kill,
    listeners: () => listeners,
    memoryUsage: () => memoryUsage,
    moduleLoadList: () => moduleLoadList,
    nextTick: () => nextTick,
    off: () => off,
    on: () => on,
    once: () => once,
    openStdin: () => openStdin,
    pid: () => pid,
    platform: () => platform,
    ppid: () => ppid,
    prependListener: () => prependListener,
    prependOnceListener: () => prependOnceListener,
    reallyExit: () => reallyExit,
    release: () => release,
    removeAllListeners: () => removeAllListeners,
    removeListener: () => removeListener,
    resourceUsage: () => resourceUsage,
    setSourceMapsEnabled: () => setSourceMapsEnabled,
    setUncaughtExceptionCaptureCallback: () => setUncaughtExceptionCaptureCallback,
    stderr: () => stderr,
    stdin: () => stdin,
    stdout: () => stdout,
    title: () => title,
    umask: () => umask,
    uptime: () => uptime,
    version: () => version,
    versions: () => versions
  });
  function unimplemented(name2) {
    throw new Error("Node.js process " + name2 + " is not supported by JSPM core outside of Node.js");
  }
  function cleanUpNextTick() {
    if (!draining || !currentQueue)
      return;
    draining = false;
    if (currentQueue.length) {
      queue = currentQueue.concat(queue);
    } else {
      queueIndex = -1;
    }
    if (queue.length)
      drainQueue();
  }
  function drainQueue() {
    if (draining)
      return;
    var timeout = setTimeout(cleanUpNextTick, 0);
    draining = true;
    var len = queue.length;
    while (len) {
      currentQueue = queue;
      queue = [];
      while (++queueIndex < len) {
        if (currentQueue)
          currentQueue[queueIndex].run();
      }
      queueIndex = -1;
      len = queue.length;
    }
    currentQueue = null;
    draining = false;
    clearTimeout(timeout);
  }
  function nextTick(fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
      for (var i = 1; i < arguments.length; i++)
        args[i - 1] = arguments[i];
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining)
      setTimeout(drainQueue, 0);
  }
  function Item(fun, array) {
    this.fun = fun;
    this.array = array;
  }
  function noop() {
  }
  function _linkedBinding(name2) {
    unimplemented("_linkedBinding");
  }
  function dlopen(name2) {
    unimplemented("dlopen");
  }
  function _getActiveRequests() {
    return [];
  }
  function _getActiveHandles() {
    return [];
  }
  function assert(condition, message) {
    if (!condition) throw new Error(message || "assertion error");
  }
  function hasUncaughtExceptionCaptureCallback() {
    return false;
  }
  function uptime() {
    return _performance.now() / 1e3;
  }
  function hrtime(previousTimestamp) {
    var baseNow = Math.floor((Date.now() - _performance.now()) * 1e-3);
    var clocktime = _performance.now() * 1e-3;
    var seconds = Math.floor(clocktime) + baseNow;
    var nanoseconds = Math.floor(clocktime % 1 * 1e9);
    if (previousTimestamp) {
      seconds = seconds - previousTimestamp[0];
      nanoseconds = nanoseconds - previousTimestamp[1];
      if (nanoseconds < 0) {
        seconds--;
        nanoseconds += nanoPerSec;
      }
    }
    return [seconds, nanoseconds];
  }
  function on() {
    return process;
  }
  function listeners(name2) {
    return [];
  }
  var queue, draining, currentQueue, queueIndex, title, arch, platform, env, argv, execArgv, version, versions, emitWarning, binding, umask, cwd, chdir, release, browser, _rawDebug, moduleLoadList, domain, _exiting, config, reallyExit, _kill, cpuUsage, resourceUsage, memoryUsage, kill, exit, openStdin, allowedNodeEnvironmentFlags, features, _fatalExceptions, setUncaughtExceptionCaptureCallback, _tickCallback, _debugProcess, _debugEnd, _startProfilerIdleNotifier, _stopProfilerIdleNotifier, stdout, stderr, stdin, abort, pid, ppid, execPath, debugPort, argv0, _preload_modules, setSourceMapsEnabled, _performance, nowOffset, nanoPerSec, _maxListeners, _events, _eventsCount, addListener, once, off, removeListener, removeAllListeners, emit, prependListener, prependOnceListener, process;
  var init_process = __esm({
    "node_modules/@jspm/core/nodelibs/browser/process.js"() {
      init_dirname();
      init_buffer2();
      init_process2();
      queue = [];
      draining = false;
      queueIndex = -1;
      Item.prototype.run = function() {
        this.fun.apply(null, this.array);
      };
      title = "browser";
      arch = "x64";
      platform = "browser";
      env = {
        PATH: "/usr/bin",
        LANG: typeof navigator !== "undefined" ? navigator.language + ".UTF-8" : void 0,
        PWD: "/",
        HOME: "/home",
        TMP: "/tmp"
      };
      argv = ["/usr/bin/node"];
      execArgv = [];
      version = "v16.8.0";
      versions = {};
      emitWarning = function(message, type) {
        console.warn((type ? type + ": " : "") + message);
      };
      binding = function(name2) {
        unimplemented("binding");
      };
      umask = function(mask) {
        return 0;
      };
      cwd = function() {
        return "/";
      };
      chdir = function(dir) {
      };
      release = {
        name: "node",
        sourceUrl: "",
        headersUrl: "",
        libUrl: ""
      };
      browser = true;
      _rawDebug = noop;
      moduleLoadList = [];
      domain = {};
      _exiting = false;
      config = {};
      reallyExit = noop;
      _kill = noop;
      cpuUsage = function() {
        return {};
      };
      resourceUsage = cpuUsage;
      memoryUsage = cpuUsage;
      kill = noop;
      exit = noop;
      openStdin = noop;
      allowedNodeEnvironmentFlags = {};
      features = {
        inspector: false,
        debug: false,
        uv: false,
        ipv6: false,
        tls_alpn: false,
        tls_sni: false,
        tls_ocsp: false,
        tls: false,
        cached_builtins: true
      };
      _fatalExceptions = noop;
      setUncaughtExceptionCaptureCallback = noop;
      _tickCallback = noop;
      _debugProcess = noop;
      _debugEnd = noop;
      _startProfilerIdleNotifier = noop;
      _stopProfilerIdleNotifier = noop;
      stdout = void 0;
      stderr = void 0;
      stdin = void 0;
      abort = noop;
      pid = 2;
      ppid = 1;
      execPath = "/bin/usr/node";
      debugPort = 9229;
      argv0 = "node";
      _preload_modules = [];
      setSourceMapsEnabled = noop;
      _performance = {
        now: typeof performance !== "undefined" ? performance.now.bind(performance) : void 0,
        timing: typeof performance !== "undefined" ? performance.timing : void 0
      };
      if (_performance.now === void 0) {
        nowOffset = Date.now();
        if (_performance.timing && _performance.timing.navigationStart) {
          nowOffset = _performance.timing.navigationStart;
        }
        _performance.now = () => Date.now() - nowOffset;
      }
      nanoPerSec = 1e9;
      hrtime.bigint = function(time) {
        var diff = hrtime(time);
        if (typeof BigInt === "undefined") {
          return diff[0] * nanoPerSec + diff[1];
        }
        return BigInt(diff[0] * nanoPerSec) + BigInt(diff[1]);
      };
      _maxListeners = 10;
      _events = {};
      _eventsCount = 0;
      addListener = on;
      once = on;
      off = on;
      removeListener = on;
      removeAllListeners = on;
      emit = noop;
      prependListener = on;
      prependOnceListener = on;
      process = {
        version,
        versions,
        arch,
        platform,
        browser,
        release,
        _rawDebug,
        moduleLoadList,
        binding,
        _linkedBinding,
        _events,
        _eventsCount,
        _maxListeners,
        on,
        addListener,
        once,
        off,
        removeListener,
        removeAllListeners,
        emit,
        prependListener,
        prependOnceListener,
        listeners,
        domain,
        _exiting,
        config,
        dlopen,
        uptime,
        _getActiveRequests,
        _getActiveHandles,
        reallyExit,
        _kill,
        cpuUsage,
        resourceUsage,
        memoryUsage,
        kill,
        exit,
        openStdin,
        allowedNodeEnvironmentFlags,
        assert,
        features,
        _fatalExceptions,
        setUncaughtExceptionCaptureCallback,
        hasUncaughtExceptionCaptureCallback,
        emitWarning,
        nextTick,
        _tickCallback,
        _debugProcess,
        _debugEnd,
        _startProfilerIdleNotifier,
        _stopProfilerIdleNotifier,
        stdout,
        stdin,
        stderr,
        abort,
        umask,
        chdir,
        cwd,
        env,
        title,
        argv,
        execArgv,
        pid,
        ppid,
        execPath,
        debugPort,
        hrtime,
        argv0,
        _preload_modules,
        setSourceMapsEnabled
      };
    }
  });

  // node_modules/esbuild-plugin-polyfill-node/polyfills/process.js
  var init_process2 = __esm({
    "node_modules/esbuild-plugin-polyfill-node/polyfills/process.js"() {
      init_process();
    }
  });

  // node_modules/@jspm/core/nodelibs/browser/chunk-DtuTasat.js
  function dew$2() {
    if (_dewExec$2) return exports$2;
    _dewExec$2 = true;
    exports$2.byteLength = byteLength;
    exports$2.toByteArray = toByteArray;
    exports$2.fromByteArray = fromByteArray;
    var lookup = [];
    var revLookup = [];
    var Arr = typeof Uint8Array !== "undefined" ? Uint8Array : Array;
    var code = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
    for (var i = 0, len = code.length; i < len; ++i) {
      lookup[i] = code[i];
      revLookup[code.charCodeAt(i)] = i;
    }
    revLookup["-".charCodeAt(0)] = 62;
    revLookup["_".charCodeAt(0)] = 63;
    function getLens(b64) {
      var len2 = b64.length;
      if (len2 % 4 > 0) {
        throw new Error("Invalid string. Length must be a multiple of 4");
      }
      var validLen = b64.indexOf("=");
      if (validLen === -1) validLen = len2;
      var placeHoldersLen = validLen === len2 ? 0 : 4 - validLen % 4;
      return [validLen, placeHoldersLen];
    }
    function byteLength(b64) {
      var lens = getLens(b64);
      var validLen = lens[0];
      var placeHoldersLen = lens[1];
      return (validLen + placeHoldersLen) * 3 / 4 - placeHoldersLen;
    }
    function _byteLength(b64, validLen, placeHoldersLen) {
      return (validLen + placeHoldersLen) * 3 / 4 - placeHoldersLen;
    }
    function toByteArray(b64) {
      var tmp;
      var lens = getLens(b64);
      var validLen = lens[0];
      var placeHoldersLen = lens[1];
      var arr = new Arr(_byteLength(b64, validLen, placeHoldersLen));
      var curByte = 0;
      var len2 = placeHoldersLen > 0 ? validLen - 4 : validLen;
      var i2;
      for (i2 = 0; i2 < len2; i2 += 4) {
        tmp = revLookup[b64.charCodeAt(i2)] << 18 | revLookup[b64.charCodeAt(i2 + 1)] << 12 | revLookup[b64.charCodeAt(i2 + 2)] << 6 | revLookup[b64.charCodeAt(i2 + 3)];
        arr[curByte++] = tmp >> 16 & 255;
        arr[curByte++] = tmp >> 8 & 255;
        arr[curByte++] = tmp & 255;
      }
      if (placeHoldersLen === 2) {
        tmp = revLookup[b64.charCodeAt(i2)] << 2 | revLookup[b64.charCodeAt(i2 + 1)] >> 4;
        arr[curByte++] = tmp & 255;
      }
      if (placeHoldersLen === 1) {
        tmp = revLookup[b64.charCodeAt(i2)] << 10 | revLookup[b64.charCodeAt(i2 + 1)] << 4 | revLookup[b64.charCodeAt(i2 + 2)] >> 2;
        arr[curByte++] = tmp >> 8 & 255;
        arr[curByte++] = tmp & 255;
      }
      return arr;
    }
    function tripletToBase64(num) {
      return lookup[num >> 18 & 63] + lookup[num >> 12 & 63] + lookup[num >> 6 & 63] + lookup[num & 63];
    }
    function encodeChunk(uint8, start, end) {
      var tmp;
      var output = [];
      for (var i2 = start; i2 < end; i2 += 3) {
        tmp = (uint8[i2] << 16 & 16711680) + (uint8[i2 + 1] << 8 & 65280) + (uint8[i2 + 2] & 255);
        output.push(tripletToBase64(tmp));
      }
      return output.join("");
    }
    function fromByteArray(uint8) {
      var tmp;
      var len2 = uint8.length;
      var extraBytes = len2 % 3;
      var parts = [];
      var maxChunkLength = 16383;
      for (var i2 = 0, len22 = len2 - extraBytes; i2 < len22; i2 += maxChunkLength) {
        parts.push(encodeChunk(uint8, i2, i2 + maxChunkLength > len22 ? len22 : i2 + maxChunkLength));
      }
      if (extraBytes === 1) {
        tmp = uint8[len2 - 1];
        parts.push(lookup[tmp >> 2] + lookup[tmp << 4 & 63] + "==");
      } else if (extraBytes === 2) {
        tmp = (uint8[len2 - 2] << 8) + uint8[len2 - 1];
        parts.push(lookup[tmp >> 10] + lookup[tmp >> 4 & 63] + lookup[tmp << 2 & 63] + "=");
      }
      return parts.join("");
    }
    return exports$2;
  }
  function dew$1() {
    if (_dewExec$1) return exports$1;
    _dewExec$1 = true;
    exports$1.read = function(buffer, offset, isLE, mLen, nBytes) {
      var e, m;
      var eLen = nBytes * 8 - mLen - 1;
      var eMax = (1 << eLen) - 1;
      var eBias = eMax >> 1;
      var nBits = -7;
      var i = isLE ? nBytes - 1 : 0;
      var d = isLE ? -1 : 1;
      var s = buffer[offset + i];
      i += d;
      e = s & (1 << -nBits) - 1;
      s >>= -nBits;
      nBits += eLen;
      for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8) {
      }
      m = e & (1 << -nBits) - 1;
      e >>= -nBits;
      nBits += mLen;
      for (; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8) {
      }
      if (e === 0) {
        e = 1 - eBias;
      } else if (e === eMax) {
        return m ? NaN : (s ? -1 : 1) * Infinity;
      } else {
        m = m + Math.pow(2, mLen);
        e = e - eBias;
      }
      return (s ? -1 : 1) * m * Math.pow(2, e - mLen);
    };
    exports$1.write = function(buffer, value, offset, isLE, mLen, nBytes) {
      var e, m, c;
      var eLen = nBytes * 8 - mLen - 1;
      var eMax = (1 << eLen) - 1;
      var eBias = eMax >> 1;
      var rt = mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0;
      var i = isLE ? 0 : nBytes - 1;
      var d = isLE ? 1 : -1;
      var s = value < 0 || value === 0 && 1 / value < 0 ? 1 : 0;
      value = Math.abs(value);
      if (isNaN(value) || value === Infinity) {
        m = isNaN(value) ? 1 : 0;
        e = eMax;
      } else {
        e = Math.floor(Math.log(value) / Math.LN2);
        if (value * (c = Math.pow(2, -e)) < 1) {
          e--;
          c *= 2;
        }
        if (e + eBias >= 1) {
          value += rt / c;
        } else {
          value += rt * Math.pow(2, 1 - eBias);
        }
        if (value * c >= 2) {
          e++;
          c /= 2;
        }
        if (e + eBias >= eMax) {
          m = 0;
          e = eMax;
        } else if (e + eBias >= 1) {
          m = (value * c - 1) * Math.pow(2, mLen);
          e = e + eBias;
        } else {
          m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen);
          e = 0;
        }
      }
      for (; mLen >= 8; buffer[offset + i] = m & 255, i += d, m /= 256, mLen -= 8) {
      }
      e = e << mLen | m;
      eLen += mLen;
      for (; eLen > 0; buffer[offset + i] = e & 255, i += d, e /= 256, eLen -= 8) {
      }
      buffer[offset + i - d] |= s * 128;
    };
    return exports$1;
  }
  function dew() {
    if (_dewExec) return exports;
    _dewExec = true;
    const base64 = dew$2();
    const ieee754 = dew$1();
    const customInspectSymbol = typeof Symbol === "function" && typeof Symbol["for"] === "function" ? Symbol["for"]("nodejs.util.inspect.custom") : null;
    exports.Buffer = Buffer3;
    exports.SlowBuffer = SlowBuffer;
    exports.INSPECT_MAX_BYTES = 50;
    const K_MAX_LENGTH = 2147483647;
    exports.kMaxLength = K_MAX_LENGTH;
    Buffer3.TYPED_ARRAY_SUPPORT = typedArraySupport();
    if (!Buffer3.TYPED_ARRAY_SUPPORT && typeof console !== "undefined" && typeof console.error === "function") {
      console.error("This browser lacks typed array (Uint8Array) support which is required by `buffer` v5.x. Use `buffer` v4.x if you require old browser support.");
    }
    function typedArraySupport() {
      try {
        const arr = new Uint8Array(1);
        const proto = {
          foo: function() {
            return 42;
          }
        };
        Object.setPrototypeOf(proto, Uint8Array.prototype);
        Object.setPrototypeOf(arr, proto);
        return arr.foo() === 42;
      } catch (e) {
        return false;
      }
    }
    Object.defineProperty(Buffer3.prototype, "parent", {
      enumerable: true,
      get: function() {
        if (!Buffer3.isBuffer(this)) return void 0;
        return this.buffer;
      }
    });
    Object.defineProperty(Buffer3.prototype, "offset", {
      enumerable: true,
      get: function() {
        if (!Buffer3.isBuffer(this)) return void 0;
        return this.byteOffset;
      }
    });
    function createBuffer(length) {
      if (length > K_MAX_LENGTH) {
        throw new RangeError('The value "' + length + '" is invalid for option "size"');
      }
      const buf = new Uint8Array(length);
      Object.setPrototypeOf(buf, Buffer3.prototype);
      return buf;
    }
    function Buffer3(arg, encodingOrOffset, length) {
      if (typeof arg === "number") {
        if (typeof encodingOrOffset === "string") {
          throw new TypeError('The "string" argument must be of type string. Received type number');
        }
        return allocUnsafe(arg);
      }
      return from(arg, encodingOrOffset, length);
    }
    Buffer3.poolSize = 8192;
    function from(value, encodingOrOffset, length) {
      if (typeof value === "string") {
        return fromString(value, encodingOrOffset);
      }
      if (ArrayBuffer.isView(value)) {
        return fromArrayView(value);
      }
      if (value == null) {
        throw new TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof value);
      }
      if (isInstance(value, ArrayBuffer) || value && isInstance(value.buffer, ArrayBuffer)) {
        return fromArrayBuffer(value, encodingOrOffset, length);
      }
      if (typeof SharedArrayBuffer !== "undefined" && (isInstance(value, SharedArrayBuffer) || value && isInstance(value.buffer, SharedArrayBuffer))) {
        return fromArrayBuffer(value, encodingOrOffset, length);
      }
      if (typeof value === "number") {
        throw new TypeError('The "value" argument must not be of type number. Received type number');
      }
      const valueOf = value.valueOf && value.valueOf();
      if (valueOf != null && valueOf !== value) {
        return Buffer3.from(valueOf, encodingOrOffset, length);
      }
      const b = fromObject(value);
      if (b) return b;
      if (typeof Symbol !== "undefined" && Symbol.toPrimitive != null && typeof value[Symbol.toPrimitive] === "function") {
        return Buffer3.from(value[Symbol.toPrimitive]("string"), encodingOrOffset, length);
      }
      throw new TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof value);
    }
    Buffer3.from = function(value, encodingOrOffset, length) {
      return from(value, encodingOrOffset, length);
    };
    Object.setPrototypeOf(Buffer3.prototype, Uint8Array.prototype);
    Object.setPrototypeOf(Buffer3, Uint8Array);
    function assertSize(size) {
      if (typeof size !== "number") {
        throw new TypeError('"size" argument must be of type number');
      } else if (size < 0) {
        throw new RangeError('The value "' + size + '" is invalid for option "size"');
      }
    }
    function alloc(size, fill, encoding) {
      assertSize(size);
      if (size <= 0) {
        return createBuffer(size);
      }
      if (fill !== void 0) {
        return typeof encoding === "string" ? createBuffer(size).fill(fill, encoding) : createBuffer(size).fill(fill);
      }
      return createBuffer(size);
    }
    Buffer3.alloc = function(size, fill, encoding) {
      return alloc(size, fill, encoding);
    };
    function allocUnsafe(size) {
      assertSize(size);
      return createBuffer(size < 0 ? 0 : checked(size) | 0);
    }
    Buffer3.allocUnsafe = function(size) {
      return allocUnsafe(size);
    };
    Buffer3.allocUnsafeSlow = function(size) {
      return allocUnsafe(size);
    };
    function fromString(string, encoding) {
      if (typeof encoding !== "string" || encoding === "") {
        encoding = "utf8";
      }
      if (!Buffer3.isEncoding(encoding)) {
        throw new TypeError("Unknown encoding: " + encoding);
      }
      const length = byteLength(string, encoding) | 0;
      let buf = createBuffer(length);
      const actual = buf.write(string, encoding);
      if (actual !== length) {
        buf = buf.slice(0, actual);
      }
      return buf;
    }
    function fromArrayLike(array) {
      const length = array.length < 0 ? 0 : checked(array.length) | 0;
      const buf = createBuffer(length);
      for (let i = 0; i < length; i += 1) {
        buf[i] = array[i] & 255;
      }
      return buf;
    }
    function fromArrayView(arrayView) {
      if (isInstance(arrayView, Uint8Array)) {
        const copy = new Uint8Array(arrayView);
        return fromArrayBuffer(copy.buffer, copy.byteOffset, copy.byteLength);
      }
      return fromArrayLike(arrayView);
    }
    function fromArrayBuffer(array, byteOffset, length) {
      if (byteOffset < 0 || array.byteLength < byteOffset) {
        throw new RangeError('"offset" is outside of buffer bounds');
      }
      if (array.byteLength < byteOffset + (length || 0)) {
        throw new RangeError('"length" is outside of buffer bounds');
      }
      let buf;
      if (byteOffset === void 0 && length === void 0) {
        buf = new Uint8Array(array);
      } else if (length === void 0) {
        buf = new Uint8Array(array, byteOffset);
      } else {
        buf = new Uint8Array(array, byteOffset, length);
      }
      Object.setPrototypeOf(buf, Buffer3.prototype);
      return buf;
    }
    function fromObject(obj) {
      if (Buffer3.isBuffer(obj)) {
        const len = checked(obj.length) | 0;
        const buf = createBuffer(len);
        if (buf.length === 0) {
          return buf;
        }
        obj.copy(buf, 0, 0, len);
        return buf;
      }
      if (obj.length !== void 0) {
        if (typeof obj.length !== "number" || numberIsNaN(obj.length)) {
          return createBuffer(0);
        }
        return fromArrayLike(obj);
      }
      if (obj.type === "Buffer" && Array.isArray(obj.data)) {
        return fromArrayLike(obj.data);
      }
    }
    function checked(length) {
      if (length >= K_MAX_LENGTH) {
        throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + K_MAX_LENGTH.toString(16) + " bytes");
      }
      return length | 0;
    }
    function SlowBuffer(length) {
      if (+length != length) {
        length = 0;
      }
      return Buffer3.alloc(+length);
    }
    Buffer3.isBuffer = function isBuffer(b) {
      return b != null && b._isBuffer === true && b !== Buffer3.prototype;
    };
    Buffer3.compare = function compare(a, b) {
      if (isInstance(a, Uint8Array)) a = Buffer3.from(a, a.offset, a.byteLength);
      if (isInstance(b, Uint8Array)) b = Buffer3.from(b, b.offset, b.byteLength);
      if (!Buffer3.isBuffer(a) || !Buffer3.isBuffer(b)) {
        throw new TypeError('The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array');
      }
      if (a === b) return 0;
      let x = a.length;
      let y = b.length;
      for (let i = 0, len = Math.min(x, y); i < len; ++i) {
        if (a[i] !== b[i]) {
          x = a[i];
          y = b[i];
          break;
        }
      }
      if (x < y) return -1;
      if (y < x) return 1;
      return 0;
    };
    Buffer3.isEncoding = function isEncoding(encoding) {
      switch (String(encoding).toLowerCase()) {
        case "hex":
        case "utf8":
        case "utf-8":
        case "ascii":
        case "latin1":
        case "binary":
        case "base64":
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return true;
        default:
          return false;
      }
    };
    Buffer3.concat = function concat(list, length) {
      if (!Array.isArray(list)) {
        throw new TypeError('"list" argument must be an Array of Buffers');
      }
      if (list.length === 0) {
        return Buffer3.alloc(0);
      }
      let i;
      if (length === void 0) {
        length = 0;
        for (i = 0; i < list.length; ++i) {
          length += list[i].length;
        }
      }
      const buffer = Buffer3.allocUnsafe(length);
      let pos = 0;
      for (i = 0; i < list.length; ++i) {
        let buf = list[i];
        if (isInstance(buf, Uint8Array)) {
          if (pos + buf.length > buffer.length) {
            if (!Buffer3.isBuffer(buf)) buf = Buffer3.from(buf);
            buf.copy(buffer, pos);
          } else {
            Uint8Array.prototype.set.call(buffer, buf, pos);
          }
        } else if (!Buffer3.isBuffer(buf)) {
          throw new TypeError('"list" argument must be an Array of Buffers');
        } else {
          buf.copy(buffer, pos);
        }
        pos += buf.length;
      }
      return buffer;
    };
    function byteLength(string, encoding) {
      if (Buffer3.isBuffer(string)) {
        return string.length;
      }
      if (ArrayBuffer.isView(string) || isInstance(string, ArrayBuffer)) {
        return string.byteLength;
      }
      if (typeof string !== "string") {
        throw new TypeError('The "string" argument must be one of type string, Buffer, or ArrayBuffer. Received type ' + typeof string);
      }
      const len = string.length;
      const mustMatch = arguments.length > 2 && arguments[2] === true;
      if (!mustMatch && len === 0) return 0;
      let loweredCase = false;
      for (; ; ) {
        switch (encoding) {
          case "ascii":
          case "latin1":
          case "binary":
            return len;
          case "utf8":
          case "utf-8":
            return utf8ToBytes(string).length;
          case "ucs2":
          case "ucs-2":
          case "utf16le":
          case "utf-16le":
            return len * 2;
          case "hex":
            return len >>> 1;
          case "base64":
            return base64ToBytes(string).length;
          default:
            if (loweredCase) {
              return mustMatch ? -1 : utf8ToBytes(string).length;
            }
            encoding = ("" + encoding).toLowerCase();
            loweredCase = true;
        }
      }
    }
    Buffer3.byteLength = byteLength;
    function slowToString(encoding, start, end) {
      let loweredCase = false;
      if (start === void 0 || start < 0) {
        start = 0;
      }
      if (start > this.length) {
        return "";
      }
      if (end === void 0 || end > this.length) {
        end = this.length;
      }
      if (end <= 0) {
        return "";
      }
      end >>>= 0;
      start >>>= 0;
      if (end <= start) {
        return "";
      }
      if (!encoding) encoding = "utf8";
      while (true) {
        switch (encoding) {
          case "hex":
            return hexSlice(this, start, end);
          case "utf8":
          case "utf-8":
            return utf8Slice(this, start, end);
          case "ascii":
            return asciiSlice(this, start, end);
          case "latin1":
          case "binary":
            return latin1Slice(this, start, end);
          case "base64":
            return base64Slice(this, start, end);
          case "ucs2":
          case "ucs-2":
          case "utf16le":
          case "utf-16le":
            return utf16leSlice(this, start, end);
          default:
            if (loweredCase) throw new TypeError("Unknown encoding: " + encoding);
            encoding = (encoding + "").toLowerCase();
            loweredCase = true;
        }
      }
    }
    Buffer3.prototype._isBuffer = true;
    function swap(b, n, m) {
      const i = b[n];
      b[n] = b[m];
      b[m] = i;
    }
    Buffer3.prototype.swap16 = function swap16() {
      const len = this.length;
      if (len % 2 !== 0) {
        throw new RangeError("Buffer size must be a multiple of 16-bits");
      }
      for (let i = 0; i < len; i += 2) {
        swap(this, i, i + 1);
      }
      return this;
    };
    Buffer3.prototype.swap32 = function swap32() {
      const len = this.length;
      if (len % 4 !== 0) {
        throw new RangeError("Buffer size must be a multiple of 32-bits");
      }
      for (let i = 0; i < len; i += 4) {
        swap(this, i, i + 3);
        swap(this, i + 1, i + 2);
      }
      return this;
    };
    Buffer3.prototype.swap64 = function swap64() {
      const len = this.length;
      if (len % 8 !== 0) {
        throw new RangeError("Buffer size must be a multiple of 64-bits");
      }
      for (let i = 0; i < len; i += 8) {
        swap(this, i, i + 7);
        swap(this, i + 1, i + 6);
        swap(this, i + 2, i + 5);
        swap(this, i + 3, i + 4);
      }
      return this;
    };
    Buffer3.prototype.toString = function toString() {
      const length = this.length;
      if (length === 0) return "";
      if (arguments.length === 0) return utf8Slice(this, 0, length);
      return slowToString.apply(this, arguments);
    };
    Buffer3.prototype.toLocaleString = Buffer3.prototype.toString;
    Buffer3.prototype.equals = function equals(b) {
      if (!Buffer3.isBuffer(b)) throw new TypeError("Argument must be a Buffer");
      if (this === b) return true;
      return Buffer3.compare(this, b) === 0;
    };
    Buffer3.prototype.inspect = function inspect() {
      let str = "";
      const max = exports.INSPECT_MAX_BYTES;
      str = this.toString("hex", 0, max).replace(/(.{2})/g, "$1 ").trim();
      if (this.length > max) str += " ... ";
      return "<Buffer " + str + ">";
    };
    if (customInspectSymbol) {
      Buffer3.prototype[customInspectSymbol] = Buffer3.prototype.inspect;
    }
    Buffer3.prototype.compare = function compare(target, start, end, thisStart, thisEnd) {
      if (isInstance(target, Uint8Array)) {
        target = Buffer3.from(target, target.offset, target.byteLength);
      }
      if (!Buffer3.isBuffer(target)) {
        throw new TypeError('The "target" argument must be one of type Buffer or Uint8Array. Received type ' + typeof target);
      }
      if (start === void 0) {
        start = 0;
      }
      if (end === void 0) {
        end = target ? target.length : 0;
      }
      if (thisStart === void 0) {
        thisStart = 0;
      }
      if (thisEnd === void 0) {
        thisEnd = this.length;
      }
      if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
        throw new RangeError("out of range index");
      }
      if (thisStart >= thisEnd && start >= end) {
        return 0;
      }
      if (thisStart >= thisEnd) {
        return -1;
      }
      if (start >= end) {
        return 1;
      }
      start >>>= 0;
      end >>>= 0;
      thisStart >>>= 0;
      thisEnd >>>= 0;
      if (this === target) return 0;
      let x = thisEnd - thisStart;
      let y = end - start;
      const len = Math.min(x, y);
      const thisCopy = this.slice(thisStart, thisEnd);
      const targetCopy = target.slice(start, end);
      for (let i = 0; i < len; ++i) {
        if (thisCopy[i] !== targetCopy[i]) {
          x = thisCopy[i];
          y = targetCopy[i];
          break;
        }
      }
      if (x < y) return -1;
      if (y < x) return 1;
      return 0;
    };
    function bidirectionalIndexOf(buffer, val, byteOffset, encoding, dir) {
      if (buffer.length === 0) return -1;
      if (typeof byteOffset === "string") {
        encoding = byteOffset;
        byteOffset = 0;
      } else if (byteOffset > 2147483647) {
        byteOffset = 2147483647;
      } else if (byteOffset < -2147483648) {
        byteOffset = -2147483648;
      }
      byteOffset = +byteOffset;
      if (numberIsNaN(byteOffset)) {
        byteOffset = dir ? 0 : buffer.length - 1;
      }
      if (byteOffset < 0) byteOffset = buffer.length + byteOffset;
      if (byteOffset >= buffer.length) {
        if (dir) return -1;
        else byteOffset = buffer.length - 1;
      } else if (byteOffset < 0) {
        if (dir) byteOffset = 0;
        else return -1;
      }
      if (typeof val === "string") {
        val = Buffer3.from(val, encoding);
      }
      if (Buffer3.isBuffer(val)) {
        if (val.length === 0) {
          return -1;
        }
        return arrayIndexOf(buffer, val, byteOffset, encoding, dir);
      } else if (typeof val === "number") {
        val = val & 255;
        if (typeof Uint8Array.prototype.indexOf === "function") {
          if (dir) {
            return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset);
          } else {
            return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset);
          }
        }
        return arrayIndexOf(buffer, [val], byteOffset, encoding, dir);
      }
      throw new TypeError("val must be string, number or Buffer");
    }
    function arrayIndexOf(arr, val, byteOffset, encoding, dir) {
      let indexSize = 1;
      let arrLength = arr.length;
      let valLength = val.length;
      if (encoding !== void 0) {
        encoding = String(encoding).toLowerCase();
        if (encoding === "ucs2" || encoding === "ucs-2" || encoding === "utf16le" || encoding === "utf-16le") {
          if (arr.length < 2 || val.length < 2) {
            return -1;
          }
          indexSize = 2;
          arrLength /= 2;
          valLength /= 2;
          byteOffset /= 2;
        }
      }
      function read(buf, i2) {
        if (indexSize === 1) {
          return buf[i2];
        } else {
          return buf.readUInt16BE(i2 * indexSize);
        }
      }
      let i;
      if (dir) {
        let foundIndex = -1;
        for (i = byteOffset; i < arrLength; i++) {
          if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
            if (foundIndex === -1) foundIndex = i;
            if (i - foundIndex + 1 === valLength) return foundIndex * indexSize;
          } else {
            if (foundIndex !== -1) i -= i - foundIndex;
            foundIndex = -1;
          }
        }
      } else {
        if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength;
        for (i = byteOffset; i >= 0; i--) {
          let found = true;
          for (let j = 0; j < valLength; j++) {
            if (read(arr, i + j) !== read(val, j)) {
              found = false;
              break;
            }
          }
          if (found) return i;
        }
      }
      return -1;
    }
    Buffer3.prototype.includes = function includes(val, byteOffset, encoding) {
      return this.indexOf(val, byteOffset, encoding) !== -1;
    };
    Buffer3.prototype.indexOf = function indexOf(val, byteOffset, encoding) {
      return bidirectionalIndexOf(this, val, byteOffset, encoding, true);
    };
    Buffer3.prototype.lastIndexOf = function lastIndexOf(val, byteOffset, encoding) {
      return bidirectionalIndexOf(this, val, byteOffset, encoding, false);
    };
    function hexWrite(buf, string, offset, length) {
      offset = Number(offset) || 0;
      const remaining = buf.length - offset;
      if (!length) {
        length = remaining;
      } else {
        length = Number(length);
        if (length > remaining) {
          length = remaining;
        }
      }
      const strLen = string.length;
      if (length > strLen / 2) {
        length = strLen / 2;
      }
      let i;
      for (i = 0; i < length; ++i) {
        const parsed = parseInt(string.substr(i * 2, 2), 16);
        if (numberIsNaN(parsed)) return i;
        buf[offset + i] = parsed;
      }
      return i;
    }
    function utf8Write(buf, string, offset, length) {
      return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length);
    }
    function asciiWrite(buf, string, offset, length) {
      return blitBuffer(asciiToBytes(string), buf, offset, length);
    }
    function base64Write(buf, string, offset, length) {
      return blitBuffer(base64ToBytes(string), buf, offset, length);
    }
    function ucs2Write(buf, string, offset, length) {
      return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length);
    }
    Buffer3.prototype.write = function write(string, offset, length, encoding) {
      if (offset === void 0) {
        encoding = "utf8";
        length = this.length;
        offset = 0;
      } else if (length === void 0 && typeof offset === "string") {
        encoding = offset;
        length = this.length;
        offset = 0;
      } else if (isFinite(offset)) {
        offset = offset >>> 0;
        if (isFinite(length)) {
          length = length >>> 0;
          if (encoding === void 0) encoding = "utf8";
        } else {
          encoding = length;
          length = void 0;
        }
      } else {
        throw new Error("Buffer.write(string, encoding, offset[, length]) is no longer supported");
      }
      const remaining = this.length - offset;
      if (length === void 0 || length > remaining) length = remaining;
      if (string.length > 0 && (length < 0 || offset < 0) || offset > this.length) {
        throw new RangeError("Attempt to write outside buffer bounds");
      }
      if (!encoding) encoding = "utf8";
      let loweredCase = false;
      for (; ; ) {
        switch (encoding) {
          case "hex":
            return hexWrite(this, string, offset, length);
          case "utf8":
          case "utf-8":
            return utf8Write(this, string, offset, length);
          case "ascii":
          case "latin1":
          case "binary":
            return asciiWrite(this, string, offset, length);
          case "base64":
            return base64Write(this, string, offset, length);
          case "ucs2":
          case "ucs-2":
          case "utf16le":
          case "utf-16le":
            return ucs2Write(this, string, offset, length);
          default:
            if (loweredCase) throw new TypeError("Unknown encoding: " + encoding);
            encoding = ("" + encoding).toLowerCase();
            loweredCase = true;
        }
      }
    };
    Buffer3.prototype.toJSON = function toJSON() {
      return {
        type: "Buffer",
        data: Array.prototype.slice.call(this._arr || this, 0)
      };
    };
    function base64Slice(buf, start, end) {
      if (start === 0 && end === buf.length) {
        return base64.fromByteArray(buf);
      } else {
        return base64.fromByteArray(buf.slice(start, end));
      }
    }
    function utf8Slice(buf, start, end) {
      end = Math.min(buf.length, end);
      const res = [];
      let i = start;
      while (i < end) {
        const firstByte = buf[i];
        let codePoint = null;
        let bytesPerSequence = firstByte > 239 ? 4 : firstByte > 223 ? 3 : firstByte > 191 ? 2 : 1;
        if (i + bytesPerSequence <= end) {
          let secondByte, thirdByte, fourthByte, tempCodePoint;
          switch (bytesPerSequence) {
            case 1:
              if (firstByte < 128) {
                codePoint = firstByte;
              }
              break;
            case 2:
              secondByte = buf[i + 1];
              if ((secondByte & 192) === 128) {
                tempCodePoint = (firstByte & 31) << 6 | secondByte & 63;
                if (tempCodePoint > 127) {
                  codePoint = tempCodePoint;
                }
              }
              break;
            case 3:
              secondByte = buf[i + 1];
              thirdByte = buf[i + 2];
              if ((secondByte & 192) === 128 && (thirdByte & 192) === 128) {
                tempCodePoint = (firstByte & 15) << 12 | (secondByte & 63) << 6 | thirdByte & 63;
                if (tempCodePoint > 2047 && (tempCodePoint < 55296 || tempCodePoint > 57343)) {
                  codePoint = tempCodePoint;
                }
              }
              break;
            case 4:
              secondByte = buf[i + 1];
              thirdByte = buf[i + 2];
              fourthByte = buf[i + 3];
              if ((secondByte & 192) === 128 && (thirdByte & 192) === 128 && (fourthByte & 192) === 128) {
                tempCodePoint = (firstByte & 15) << 18 | (secondByte & 63) << 12 | (thirdByte & 63) << 6 | fourthByte & 63;
                if (tempCodePoint > 65535 && tempCodePoint < 1114112) {
                  codePoint = tempCodePoint;
                }
              }
          }
        }
        if (codePoint === null) {
          codePoint = 65533;
          bytesPerSequence = 1;
        } else if (codePoint > 65535) {
          codePoint -= 65536;
          res.push(codePoint >>> 10 & 1023 | 55296);
          codePoint = 56320 | codePoint & 1023;
        }
        res.push(codePoint);
        i += bytesPerSequence;
      }
      return decodeCodePointsArray(res);
    }
    const MAX_ARGUMENTS_LENGTH = 4096;
    function decodeCodePointsArray(codePoints) {
      const len = codePoints.length;
      if (len <= MAX_ARGUMENTS_LENGTH) {
        return String.fromCharCode.apply(String, codePoints);
      }
      let res = "";
      let i = 0;
      while (i < len) {
        res += String.fromCharCode.apply(String, codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH));
      }
      return res;
    }
    function asciiSlice(buf, start, end) {
      let ret = "";
      end = Math.min(buf.length, end);
      for (let i = start; i < end; ++i) {
        ret += String.fromCharCode(buf[i] & 127);
      }
      return ret;
    }
    function latin1Slice(buf, start, end) {
      let ret = "";
      end = Math.min(buf.length, end);
      for (let i = start; i < end; ++i) {
        ret += String.fromCharCode(buf[i]);
      }
      return ret;
    }
    function hexSlice(buf, start, end) {
      const len = buf.length;
      if (!start || start < 0) start = 0;
      if (!end || end < 0 || end > len) end = len;
      let out = "";
      for (let i = start; i < end; ++i) {
        out += hexSliceLookupTable[buf[i]];
      }
      return out;
    }
    function utf16leSlice(buf, start, end) {
      const bytes = buf.slice(start, end);
      let res = "";
      for (let i = 0; i < bytes.length - 1; i += 2) {
        res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256);
      }
      return res;
    }
    Buffer3.prototype.slice = function slice(start, end) {
      const len = this.length;
      start = ~~start;
      end = end === void 0 ? len : ~~end;
      if (start < 0) {
        start += len;
        if (start < 0) start = 0;
      } else if (start > len) {
        start = len;
      }
      if (end < 0) {
        end += len;
        if (end < 0) end = 0;
      } else if (end > len) {
        end = len;
      }
      if (end < start) end = start;
      const newBuf = this.subarray(start, end);
      Object.setPrototypeOf(newBuf, Buffer3.prototype);
      return newBuf;
    };
    function checkOffset(offset, ext, length) {
      if (offset % 1 !== 0 || offset < 0) throw new RangeError("offset is not uint");
      if (offset + ext > length) throw new RangeError("Trying to access beyond buffer length");
    }
    Buffer3.prototype.readUintLE = Buffer3.prototype.readUIntLE = function readUIntLE(offset, byteLength2, noAssert) {
      offset = offset >>> 0;
      byteLength2 = byteLength2 >>> 0;
      if (!noAssert) checkOffset(offset, byteLength2, this.length);
      let val = this[offset];
      let mul = 1;
      let i = 0;
      while (++i < byteLength2 && (mul *= 256)) {
        val += this[offset + i] * mul;
      }
      return val;
    };
    Buffer3.prototype.readUintBE = Buffer3.prototype.readUIntBE = function readUIntBE(offset, byteLength2, noAssert) {
      offset = offset >>> 0;
      byteLength2 = byteLength2 >>> 0;
      if (!noAssert) {
        checkOffset(offset, byteLength2, this.length);
      }
      let val = this[offset + --byteLength2];
      let mul = 1;
      while (byteLength2 > 0 && (mul *= 256)) {
        val += this[offset + --byteLength2] * mul;
      }
      return val;
    };
    Buffer3.prototype.readUint8 = Buffer3.prototype.readUInt8 = function readUInt8(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert) checkOffset(offset, 1, this.length);
      return this[offset];
    };
    Buffer3.prototype.readUint16LE = Buffer3.prototype.readUInt16LE = function readUInt16LE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert) checkOffset(offset, 2, this.length);
      return this[offset] | this[offset + 1] << 8;
    };
    Buffer3.prototype.readUint16BE = Buffer3.prototype.readUInt16BE = function readUInt16BE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert) checkOffset(offset, 2, this.length);
      return this[offset] << 8 | this[offset + 1];
    };
    Buffer3.prototype.readUint32LE = Buffer3.prototype.readUInt32LE = function readUInt32LE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert) checkOffset(offset, 4, this.length);
      return (this[offset] | this[offset + 1] << 8 | this[offset + 2] << 16) + this[offset + 3] * 16777216;
    };
    Buffer3.prototype.readUint32BE = Buffer3.prototype.readUInt32BE = function readUInt32BE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert) checkOffset(offset, 4, this.length);
      return this[offset] * 16777216 + (this[offset + 1] << 16 | this[offset + 2] << 8 | this[offset + 3]);
    };
    Buffer3.prototype.readBigUInt64LE = defineBigIntMethod(function readBigUInt64LE(offset) {
      offset = offset >>> 0;
      validateNumber(offset, "offset");
      const first = this[offset];
      const last = this[offset + 7];
      if (first === void 0 || last === void 0) {
        boundsError(offset, this.length - 8);
      }
      const lo = first + this[++offset] * 2 ** 8 + this[++offset] * 2 ** 16 + this[++offset] * 2 ** 24;
      const hi = this[++offset] + this[++offset] * 2 ** 8 + this[++offset] * 2 ** 16 + last * 2 ** 24;
      return BigInt(lo) + (BigInt(hi) << BigInt(32));
    });
    Buffer3.prototype.readBigUInt64BE = defineBigIntMethod(function readBigUInt64BE(offset) {
      offset = offset >>> 0;
      validateNumber(offset, "offset");
      const first = this[offset];
      const last = this[offset + 7];
      if (first === void 0 || last === void 0) {
        boundsError(offset, this.length - 8);
      }
      const hi = first * 2 ** 24 + this[++offset] * 2 ** 16 + this[++offset] * 2 ** 8 + this[++offset];
      const lo = this[++offset] * 2 ** 24 + this[++offset] * 2 ** 16 + this[++offset] * 2 ** 8 + last;
      return (BigInt(hi) << BigInt(32)) + BigInt(lo);
    });
    Buffer3.prototype.readIntLE = function readIntLE(offset, byteLength2, noAssert) {
      offset = offset >>> 0;
      byteLength2 = byteLength2 >>> 0;
      if (!noAssert) checkOffset(offset, byteLength2, this.length);
      let val = this[offset];
      let mul = 1;
      let i = 0;
      while (++i < byteLength2 && (mul *= 256)) {
        val += this[offset + i] * mul;
      }
      mul *= 128;
      if (val >= mul) val -= Math.pow(2, 8 * byteLength2);
      return val;
    };
    Buffer3.prototype.readIntBE = function readIntBE(offset, byteLength2, noAssert) {
      offset = offset >>> 0;
      byteLength2 = byteLength2 >>> 0;
      if (!noAssert) checkOffset(offset, byteLength2, this.length);
      let i = byteLength2;
      let mul = 1;
      let val = this[offset + --i];
      while (i > 0 && (mul *= 256)) {
        val += this[offset + --i] * mul;
      }
      mul *= 128;
      if (val >= mul) val -= Math.pow(2, 8 * byteLength2);
      return val;
    };
    Buffer3.prototype.readInt8 = function readInt8(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert) checkOffset(offset, 1, this.length);
      if (!(this[offset] & 128)) return this[offset];
      return (255 - this[offset] + 1) * -1;
    };
    Buffer3.prototype.readInt16LE = function readInt16LE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert) checkOffset(offset, 2, this.length);
      const val = this[offset] | this[offset + 1] << 8;
      return val & 32768 ? val | 4294901760 : val;
    };
    Buffer3.prototype.readInt16BE = function readInt16BE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert) checkOffset(offset, 2, this.length);
      const val = this[offset + 1] | this[offset] << 8;
      return val & 32768 ? val | 4294901760 : val;
    };
    Buffer3.prototype.readInt32LE = function readInt32LE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert) checkOffset(offset, 4, this.length);
      return this[offset] | this[offset + 1] << 8 | this[offset + 2] << 16 | this[offset + 3] << 24;
    };
    Buffer3.prototype.readInt32BE = function readInt32BE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert) checkOffset(offset, 4, this.length);
      return this[offset] << 24 | this[offset + 1] << 16 | this[offset + 2] << 8 | this[offset + 3];
    };
    Buffer3.prototype.readBigInt64LE = defineBigIntMethod(function readBigInt64LE(offset) {
      offset = offset >>> 0;
      validateNumber(offset, "offset");
      const first = this[offset];
      const last = this[offset + 7];
      if (first === void 0 || last === void 0) {
        boundsError(offset, this.length - 8);
      }
      const val = this[offset + 4] + this[offset + 5] * 2 ** 8 + this[offset + 6] * 2 ** 16 + (last << 24);
      return (BigInt(val) << BigInt(32)) + BigInt(first + this[++offset] * 2 ** 8 + this[++offset] * 2 ** 16 + this[++offset] * 2 ** 24);
    });
    Buffer3.prototype.readBigInt64BE = defineBigIntMethod(function readBigInt64BE(offset) {
      offset = offset >>> 0;
      validateNumber(offset, "offset");
      const first = this[offset];
      const last = this[offset + 7];
      if (first === void 0 || last === void 0) {
        boundsError(offset, this.length - 8);
      }
      const val = (first << 24) + // Overflow
      this[++offset] * 2 ** 16 + this[++offset] * 2 ** 8 + this[++offset];
      return (BigInt(val) << BigInt(32)) + BigInt(this[++offset] * 2 ** 24 + this[++offset] * 2 ** 16 + this[++offset] * 2 ** 8 + last);
    });
    Buffer3.prototype.readFloatLE = function readFloatLE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert) checkOffset(offset, 4, this.length);
      return ieee754.read(this, offset, true, 23, 4);
    };
    Buffer3.prototype.readFloatBE = function readFloatBE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert) checkOffset(offset, 4, this.length);
      return ieee754.read(this, offset, false, 23, 4);
    };
    Buffer3.prototype.readDoubleLE = function readDoubleLE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert) checkOffset(offset, 8, this.length);
      return ieee754.read(this, offset, true, 52, 8);
    };
    Buffer3.prototype.readDoubleBE = function readDoubleBE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert) checkOffset(offset, 8, this.length);
      return ieee754.read(this, offset, false, 52, 8);
    };
    function checkInt(buf, value, offset, ext, max, min) {
      if (!Buffer3.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance');
      if (value > max || value < min) throw new RangeError('"value" argument is out of bounds');
      if (offset + ext > buf.length) throw new RangeError("Index out of range");
    }
    Buffer3.prototype.writeUintLE = Buffer3.prototype.writeUIntLE = function writeUIntLE(value, offset, byteLength2, noAssert) {
      value = +value;
      offset = offset >>> 0;
      byteLength2 = byteLength2 >>> 0;
      if (!noAssert) {
        const maxBytes = Math.pow(2, 8 * byteLength2) - 1;
        checkInt(this, value, offset, byteLength2, maxBytes, 0);
      }
      let mul = 1;
      let i = 0;
      this[offset] = value & 255;
      while (++i < byteLength2 && (mul *= 256)) {
        this[offset + i] = value / mul & 255;
      }
      return offset + byteLength2;
    };
    Buffer3.prototype.writeUintBE = Buffer3.prototype.writeUIntBE = function writeUIntBE(value, offset, byteLength2, noAssert) {
      value = +value;
      offset = offset >>> 0;
      byteLength2 = byteLength2 >>> 0;
      if (!noAssert) {
        const maxBytes = Math.pow(2, 8 * byteLength2) - 1;
        checkInt(this, value, offset, byteLength2, maxBytes, 0);
      }
      let i = byteLength2 - 1;
      let mul = 1;
      this[offset + i] = value & 255;
      while (--i >= 0 && (mul *= 256)) {
        this[offset + i] = value / mul & 255;
      }
      return offset + byteLength2;
    };
    Buffer3.prototype.writeUint8 = Buffer3.prototype.writeUInt8 = function writeUInt8(value, offset, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert) checkInt(this, value, offset, 1, 255, 0);
      this[offset] = value & 255;
      return offset + 1;
    };
    Buffer3.prototype.writeUint16LE = Buffer3.prototype.writeUInt16LE = function writeUInt16LE(value, offset, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert) checkInt(this, value, offset, 2, 65535, 0);
      this[offset] = value & 255;
      this[offset + 1] = value >>> 8;
      return offset + 2;
    };
    Buffer3.prototype.writeUint16BE = Buffer3.prototype.writeUInt16BE = function writeUInt16BE(value, offset, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert) checkInt(this, value, offset, 2, 65535, 0);
      this[offset] = value >>> 8;
      this[offset + 1] = value & 255;
      return offset + 2;
    };
    Buffer3.prototype.writeUint32LE = Buffer3.prototype.writeUInt32LE = function writeUInt32LE(value, offset, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert) checkInt(this, value, offset, 4, 4294967295, 0);
      this[offset + 3] = value >>> 24;
      this[offset + 2] = value >>> 16;
      this[offset + 1] = value >>> 8;
      this[offset] = value & 255;
      return offset + 4;
    };
    Buffer3.prototype.writeUint32BE = Buffer3.prototype.writeUInt32BE = function writeUInt32BE(value, offset, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert) checkInt(this, value, offset, 4, 4294967295, 0);
      this[offset] = value >>> 24;
      this[offset + 1] = value >>> 16;
      this[offset + 2] = value >>> 8;
      this[offset + 3] = value & 255;
      return offset + 4;
    };
    function wrtBigUInt64LE(buf, value, offset, min, max) {
      checkIntBI(value, min, max, buf, offset, 7);
      let lo = Number(value & BigInt(4294967295));
      buf[offset++] = lo;
      lo = lo >> 8;
      buf[offset++] = lo;
      lo = lo >> 8;
      buf[offset++] = lo;
      lo = lo >> 8;
      buf[offset++] = lo;
      let hi = Number(value >> BigInt(32) & BigInt(4294967295));
      buf[offset++] = hi;
      hi = hi >> 8;
      buf[offset++] = hi;
      hi = hi >> 8;
      buf[offset++] = hi;
      hi = hi >> 8;
      buf[offset++] = hi;
      return offset;
    }
    function wrtBigUInt64BE(buf, value, offset, min, max) {
      checkIntBI(value, min, max, buf, offset, 7);
      let lo = Number(value & BigInt(4294967295));
      buf[offset + 7] = lo;
      lo = lo >> 8;
      buf[offset + 6] = lo;
      lo = lo >> 8;
      buf[offset + 5] = lo;
      lo = lo >> 8;
      buf[offset + 4] = lo;
      let hi = Number(value >> BigInt(32) & BigInt(4294967295));
      buf[offset + 3] = hi;
      hi = hi >> 8;
      buf[offset + 2] = hi;
      hi = hi >> 8;
      buf[offset + 1] = hi;
      hi = hi >> 8;
      buf[offset] = hi;
      return offset + 8;
    }
    Buffer3.prototype.writeBigUInt64LE = defineBigIntMethod(function writeBigUInt64LE(value, offset = 0) {
      return wrtBigUInt64LE(this, value, offset, BigInt(0), BigInt("0xffffffffffffffff"));
    });
    Buffer3.prototype.writeBigUInt64BE = defineBigIntMethod(function writeBigUInt64BE(value, offset = 0) {
      return wrtBigUInt64BE(this, value, offset, BigInt(0), BigInt("0xffffffffffffffff"));
    });
    Buffer3.prototype.writeIntLE = function writeIntLE(value, offset, byteLength2, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert) {
        const limit = Math.pow(2, 8 * byteLength2 - 1);
        checkInt(this, value, offset, byteLength2, limit - 1, -limit);
      }
      let i = 0;
      let mul = 1;
      let sub = 0;
      this[offset] = value & 255;
      while (++i < byteLength2 && (mul *= 256)) {
        if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
          sub = 1;
        }
        this[offset + i] = (value / mul >> 0) - sub & 255;
      }
      return offset + byteLength2;
    };
    Buffer3.prototype.writeIntBE = function writeIntBE(value, offset, byteLength2, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert) {
        const limit = Math.pow(2, 8 * byteLength2 - 1);
        checkInt(this, value, offset, byteLength2, limit - 1, -limit);
      }
      let i = byteLength2 - 1;
      let mul = 1;
      let sub = 0;
      this[offset + i] = value & 255;
      while (--i >= 0 && (mul *= 256)) {
        if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
          sub = 1;
        }
        this[offset + i] = (value / mul >> 0) - sub & 255;
      }
      return offset + byteLength2;
    };
    Buffer3.prototype.writeInt8 = function writeInt8(value, offset, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert) checkInt(this, value, offset, 1, 127, -128);
      if (value < 0) value = 255 + value + 1;
      this[offset] = value & 255;
      return offset + 1;
    };
    Buffer3.prototype.writeInt16LE = function writeInt16LE(value, offset, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert) checkInt(this, value, offset, 2, 32767, -32768);
      this[offset] = value & 255;
      this[offset + 1] = value >>> 8;
      return offset + 2;
    };
    Buffer3.prototype.writeInt16BE = function writeInt16BE(value, offset, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert) checkInt(this, value, offset, 2, 32767, -32768);
      this[offset] = value >>> 8;
      this[offset + 1] = value & 255;
      return offset + 2;
    };
    Buffer3.prototype.writeInt32LE = function writeInt32LE(value, offset, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert) checkInt(this, value, offset, 4, 2147483647, -2147483648);
      this[offset] = value & 255;
      this[offset + 1] = value >>> 8;
      this[offset + 2] = value >>> 16;
      this[offset + 3] = value >>> 24;
      return offset + 4;
    };
    Buffer3.prototype.writeInt32BE = function writeInt32BE(value, offset, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert) checkInt(this, value, offset, 4, 2147483647, -2147483648);
      if (value < 0) value = 4294967295 + value + 1;
      this[offset] = value >>> 24;
      this[offset + 1] = value >>> 16;
      this[offset + 2] = value >>> 8;
      this[offset + 3] = value & 255;
      return offset + 4;
    };
    Buffer3.prototype.writeBigInt64LE = defineBigIntMethod(function writeBigInt64LE(value, offset = 0) {
      return wrtBigUInt64LE(this, value, offset, -BigInt("0x8000000000000000"), BigInt("0x7fffffffffffffff"));
    });
    Buffer3.prototype.writeBigInt64BE = defineBigIntMethod(function writeBigInt64BE(value, offset = 0) {
      return wrtBigUInt64BE(this, value, offset, -BigInt("0x8000000000000000"), BigInt("0x7fffffffffffffff"));
    });
    function checkIEEE754(buf, value, offset, ext, max, min) {
      if (offset + ext > buf.length) throw new RangeError("Index out of range");
      if (offset < 0) throw new RangeError("Index out of range");
    }
    function writeFloat(buf, value, offset, littleEndian, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert) {
        checkIEEE754(buf, value, offset, 4);
      }
      ieee754.write(buf, value, offset, littleEndian, 23, 4);
      return offset + 4;
    }
    Buffer3.prototype.writeFloatLE = function writeFloatLE(value, offset, noAssert) {
      return writeFloat(this, value, offset, true, noAssert);
    };
    Buffer3.prototype.writeFloatBE = function writeFloatBE(value, offset, noAssert) {
      return writeFloat(this, value, offset, false, noAssert);
    };
    function writeDouble(buf, value, offset, littleEndian, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert) {
        checkIEEE754(buf, value, offset, 8);
      }
      ieee754.write(buf, value, offset, littleEndian, 52, 8);
      return offset + 8;
    }
    Buffer3.prototype.writeDoubleLE = function writeDoubleLE(value, offset, noAssert) {
      return writeDouble(this, value, offset, true, noAssert);
    };
    Buffer3.prototype.writeDoubleBE = function writeDoubleBE(value, offset, noAssert) {
      return writeDouble(this, value, offset, false, noAssert);
    };
    Buffer3.prototype.copy = function copy(target, targetStart, start, end) {
      if (!Buffer3.isBuffer(target)) throw new TypeError("argument should be a Buffer");
      if (!start) start = 0;
      if (!end && end !== 0) end = this.length;
      if (targetStart >= target.length) targetStart = target.length;
      if (!targetStart) targetStart = 0;
      if (end > 0 && end < start) end = start;
      if (end === start) return 0;
      if (target.length === 0 || this.length === 0) return 0;
      if (targetStart < 0) {
        throw new RangeError("targetStart out of bounds");
      }
      if (start < 0 || start >= this.length) throw new RangeError("Index out of range");
      if (end < 0) throw new RangeError("sourceEnd out of bounds");
      if (end > this.length) end = this.length;
      if (target.length - targetStart < end - start) {
        end = target.length - targetStart + start;
      }
      const len = end - start;
      if (this === target && typeof Uint8Array.prototype.copyWithin === "function") {
        this.copyWithin(targetStart, start, end);
      } else {
        Uint8Array.prototype.set.call(target, this.subarray(start, end), targetStart);
      }
      return len;
    };
    Buffer3.prototype.fill = function fill(val, start, end, encoding) {
      if (typeof val === "string") {
        if (typeof start === "string") {
          encoding = start;
          start = 0;
          end = this.length;
        } else if (typeof end === "string") {
          encoding = end;
          end = this.length;
        }
        if (encoding !== void 0 && typeof encoding !== "string") {
          throw new TypeError("encoding must be a string");
        }
        if (typeof encoding === "string" && !Buffer3.isEncoding(encoding)) {
          throw new TypeError("Unknown encoding: " + encoding);
        }
        if (val.length === 1) {
          const code = val.charCodeAt(0);
          if (encoding === "utf8" && code < 128 || encoding === "latin1") {
            val = code;
          }
        }
      } else if (typeof val === "number") {
        val = val & 255;
      } else if (typeof val === "boolean") {
        val = Number(val);
      }
      if (start < 0 || this.length < start || this.length < end) {
        throw new RangeError("Out of range index");
      }
      if (end <= start) {
        return this;
      }
      start = start >>> 0;
      end = end === void 0 ? this.length : end >>> 0;
      if (!val) val = 0;
      let i;
      if (typeof val === "number") {
        for (i = start; i < end; ++i) {
          this[i] = val;
        }
      } else {
        const bytes = Buffer3.isBuffer(val) ? val : Buffer3.from(val, encoding);
        const len = bytes.length;
        if (len === 0) {
          throw new TypeError('The value "' + val + '" is invalid for argument "value"');
        }
        for (i = 0; i < end - start; ++i) {
          this[i + start] = bytes[i % len];
        }
      }
      return this;
    };
    const errors = {};
    function E(sym, getMessage, Base) {
      errors[sym] = class NodeError extends Base {
        constructor() {
          super();
          Object.defineProperty(this, "message", {
            value: getMessage.apply(this, arguments),
            writable: true,
            configurable: true
          });
          this.name = `${this.name} [${sym}]`;
          this.stack;
          delete this.name;
        }
        get code() {
          return sym;
        }
        set code(value) {
          Object.defineProperty(this, "code", {
            configurable: true,
            enumerable: true,
            value,
            writable: true
          });
        }
        toString() {
          return `${this.name} [${sym}]: ${this.message}`;
        }
      };
    }
    E("ERR_BUFFER_OUT_OF_BOUNDS", function(name2) {
      if (name2) {
        return `${name2} is outside of buffer bounds`;
      }
      return "Attempt to access memory outside buffer bounds";
    }, RangeError);
    E("ERR_INVALID_ARG_TYPE", function(name2, actual) {
      return `The "${name2}" argument must be of type number. Received type ${typeof actual}`;
    }, TypeError);
    E("ERR_OUT_OF_RANGE", function(str, range, input) {
      let msg = `The value of "${str}" is out of range.`;
      let received = input;
      if (Number.isInteger(input) && Math.abs(input) > 2 ** 32) {
        received = addNumericalSeparator(String(input));
      } else if (typeof input === "bigint") {
        received = String(input);
        if (input > BigInt(2) ** BigInt(32) || input < -(BigInt(2) ** BigInt(32))) {
          received = addNumericalSeparator(received);
        }
        received += "n";
      }
      msg += ` It must be ${range}. Received ${received}`;
      return msg;
    }, RangeError);
    function addNumericalSeparator(val) {
      let res = "";
      let i = val.length;
      const start = val[0] === "-" ? 1 : 0;
      for (; i >= start + 4; i -= 3) {
        res = `_${val.slice(i - 3, i)}${res}`;
      }
      return `${val.slice(0, i)}${res}`;
    }
    function checkBounds(buf, offset, byteLength2) {
      validateNumber(offset, "offset");
      if (buf[offset] === void 0 || buf[offset + byteLength2] === void 0) {
        boundsError(offset, buf.length - (byteLength2 + 1));
      }
    }
    function checkIntBI(value, min, max, buf, offset, byteLength2) {
      if (value > max || value < min) {
        const n = typeof min === "bigint" ? "n" : "";
        let range;
        {
          if (min === 0 || min === BigInt(0)) {
            range = `>= 0${n} and < 2${n} ** ${(byteLength2 + 1) * 8}${n}`;
          } else {
            range = `>= -(2${n} ** ${(byteLength2 + 1) * 8 - 1}${n}) and < 2 ** ${(byteLength2 + 1) * 8 - 1}${n}`;
          }
        }
        throw new errors.ERR_OUT_OF_RANGE("value", range, value);
      }
      checkBounds(buf, offset, byteLength2);
    }
    function validateNumber(value, name2) {
      if (typeof value !== "number") {
        throw new errors.ERR_INVALID_ARG_TYPE(name2, "number", value);
      }
    }
    function boundsError(value, length, type) {
      if (Math.floor(value) !== value) {
        validateNumber(value, type);
        throw new errors.ERR_OUT_OF_RANGE("offset", "an integer", value);
      }
      if (length < 0) {
        throw new errors.ERR_BUFFER_OUT_OF_BOUNDS();
      }
      throw new errors.ERR_OUT_OF_RANGE("offset", `>= ${0} and <= ${length}`, value);
    }
    const INVALID_BASE64_RE = /[^+/0-9A-Za-z-_]/g;
    function base64clean(str) {
      str = str.split("=")[0];
      str = str.trim().replace(INVALID_BASE64_RE, "");
      if (str.length < 2) return "";
      while (str.length % 4 !== 0) {
        str = str + "=";
      }
      return str;
    }
    function utf8ToBytes(string, units) {
      units = units || Infinity;
      let codePoint;
      const length = string.length;
      let leadSurrogate = null;
      const bytes = [];
      for (let i = 0; i < length; ++i) {
        codePoint = string.charCodeAt(i);
        if (codePoint > 55295 && codePoint < 57344) {
          if (!leadSurrogate) {
            if (codePoint > 56319) {
              if ((units -= 3) > -1) bytes.push(239, 191, 189);
              continue;
            } else if (i + 1 === length) {
              if ((units -= 3) > -1) bytes.push(239, 191, 189);
              continue;
            }
            leadSurrogate = codePoint;
            continue;
          }
          if (codePoint < 56320) {
            if ((units -= 3) > -1) bytes.push(239, 191, 189);
            leadSurrogate = codePoint;
            continue;
          }
          codePoint = (leadSurrogate - 55296 << 10 | codePoint - 56320) + 65536;
        } else if (leadSurrogate) {
          if ((units -= 3) > -1) bytes.push(239, 191, 189);
        }
        leadSurrogate = null;
        if (codePoint < 128) {
          if ((units -= 1) < 0) break;
          bytes.push(codePoint);
        } else if (codePoint < 2048) {
          if ((units -= 2) < 0) break;
          bytes.push(codePoint >> 6 | 192, codePoint & 63 | 128);
        } else if (codePoint < 65536) {
          if ((units -= 3) < 0) break;
          bytes.push(codePoint >> 12 | 224, codePoint >> 6 & 63 | 128, codePoint & 63 | 128);
        } else if (codePoint < 1114112) {
          if ((units -= 4) < 0) break;
          bytes.push(codePoint >> 18 | 240, codePoint >> 12 & 63 | 128, codePoint >> 6 & 63 | 128, codePoint & 63 | 128);
        } else {
          throw new Error("Invalid code point");
        }
      }
      return bytes;
    }
    function asciiToBytes(str) {
      const byteArray = [];
      for (let i = 0; i < str.length; ++i) {
        byteArray.push(str.charCodeAt(i) & 255);
      }
      return byteArray;
    }
    function utf16leToBytes(str, units) {
      let c, hi, lo;
      const byteArray = [];
      for (let i = 0; i < str.length; ++i) {
        if ((units -= 2) < 0) break;
        c = str.charCodeAt(i);
        hi = c >> 8;
        lo = c % 256;
        byteArray.push(lo);
        byteArray.push(hi);
      }
      return byteArray;
    }
    function base64ToBytes(str) {
      return base64.toByteArray(base64clean(str));
    }
    function blitBuffer(src, dst, offset, length) {
      let i;
      for (i = 0; i < length; ++i) {
        if (i + offset >= dst.length || i >= src.length) break;
        dst[i + offset] = src[i];
      }
      return i;
    }
    function isInstance(obj, type) {
      return obj instanceof type || obj != null && obj.constructor != null && obj.constructor.name != null && obj.constructor.name === type.name;
    }
    function numberIsNaN(obj) {
      return obj !== obj;
    }
    const hexSliceLookupTable = function() {
      const alphabet = "0123456789abcdef";
      const table = new Array(256);
      for (let i = 0; i < 16; ++i) {
        const i16 = i * 16;
        for (let j = 0; j < 16; ++j) {
          table[i16 + j] = alphabet[i] + alphabet[j];
        }
      }
      return table;
    }();
    function defineBigIntMethod(fn) {
      return typeof BigInt === "undefined" ? BufferBigIntNotDefined : fn;
    }
    function BufferBigIntNotDefined() {
      throw new Error("BigInt not supported");
    }
    return exports;
  }
  var exports$2, _dewExec$2, exports$1, _dewExec$1, exports, _dewExec;
  var init_chunk_DtuTasat = __esm({
    "node_modules/@jspm/core/nodelibs/browser/chunk-DtuTasat.js"() {
      init_dirname();
      init_buffer2();
      init_process2();
      exports$2 = {};
      _dewExec$2 = false;
      exports$1 = {};
      _dewExec$1 = false;
      exports = {};
      _dewExec = false;
    }
  });

  // node_modules/@jspm/core/nodelibs/browser/buffer.js
  var buffer_exports = {};
  __export(buffer_exports, {
    Buffer: () => Buffer2,
    INSPECT_MAX_BYTES: () => INSPECT_MAX_BYTES,
    default: () => exports2,
    kMaxLength: () => kMaxLength
  });
  var exports2, Buffer2, INSPECT_MAX_BYTES, kMaxLength;
  var init_buffer = __esm({
    "node_modules/@jspm/core/nodelibs/browser/buffer.js"() {
      init_dirname();
      init_buffer2();
      init_process2();
      init_chunk_DtuTasat();
      exports2 = dew();
      exports2["Buffer"];
      exports2["SlowBuffer"];
      exports2["INSPECT_MAX_BYTES"];
      exports2["kMaxLength"];
      Buffer2 = exports2.Buffer;
      INSPECT_MAX_BYTES = exports2.INSPECT_MAX_BYTES;
      kMaxLength = exports2.kMaxLength;
    }
  });

  // node_modules/esbuild-plugin-polyfill-node/polyfills/buffer.js
  var init_buffer2 = __esm({
    "node_modules/esbuild-plugin-polyfill-node/polyfills/buffer.js"() {
      init_buffer();
    }
  });

  // node_modules/readable-stream/lib/ours/primordials.js
  var require_primordials = __commonJS({
    "node_modules/readable-stream/lib/ours/primordials.js"(exports8, module) {
      "use strict";
      init_dirname();
      init_buffer2();
      init_process2();
      var AggregateError2 = class extends Error {
        constructor(errors) {
          if (!Array.isArray(errors)) {
            throw new TypeError(`Expected input to be an Array, got ${typeof errors}`);
          }
          let message = "";
          for (let i = 0; i < errors.length; i++) {
            message += `    ${errors[i].stack}
`;
          }
          super(message);
          this.name = "AggregateError";
          this.errors = errors;
        }
      };
      module.exports = {
        AggregateError: AggregateError2,
        ArrayIsArray(self2) {
          return Array.isArray(self2);
        },
        ArrayPrototypeIncludes(self2, el) {
          return self2.includes(el);
        },
        ArrayPrototypeIndexOf(self2, el) {
          return self2.indexOf(el);
        },
        ArrayPrototypeJoin(self2, sep) {
          return self2.join(sep);
        },
        ArrayPrototypeMap(self2, fn) {
          return self2.map(fn);
        },
        ArrayPrototypePop(self2, el) {
          return self2.pop(el);
        },
        ArrayPrototypePush(self2, el) {
          return self2.push(el);
        },
        ArrayPrototypeSlice(self2, start, end) {
          return self2.slice(start, end);
        },
        Error,
        FunctionPrototypeCall(fn, thisArgs, ...args) {
          return fn.call(thisArgs, ...args);
        },
        FunctionPrototypeSymbolHasInstance(self2, instance) {
          return Function.prototype[Symbol.hasInstance].call(self2, instance);
        },
        MathFloor: Math.floor,
        Number,
        NumberIsInteger: Number.isInteger,
        NumberIsNaN: Number.isNaN,
        NumberMAX_SAFE_INTEGER: Number.MAX_SAFE_INTEGER,
        NumberMIN_SAFE_INTEGER: Number.MIN_SAFE_INTEGER,
        NumberParseInt: Number.parseInt,
        ObjectDefineProperties(self2, props) {
          return Object.defineProperties(self2, props);
        },
        ObjectDefineProperty(self2, name2, prop) {
          return Object.defineProperty(self2, name2, prop);
        },
        ObjectGetOwnPropertyDescriptor(self2, name2) {
          return Object.getOwnPropertyDescriptor(self2, name2);
        },
        ObjectKeys(obj) {
          return Object.keys(obj);
        },
        ObjectSetPrototypeOf(target, proto) {
          return Object.setPrototypeOf(target, proto);
        },
        Promise,
        PromisePrototypeCatch(self2, fn) {
          return self2.catch(fn);
        },
        PromisePrototypeThen(self2, thenFn, catchFn) {
          return self2.then(thenFn, catchFn);
        },
        PromiseReject(err) {
          return Promise.reject(err);
        },
        PromiseResolve(val) {
          return Promise.resolve(val);
        },
        ReflectApply: Reflect.apply,
        RegExpPrototypeTest(self2, value) {
          return self2.test(value);
        },
        SafeSet: Set,
        String,
        StringPrototypeSlice(self2, start, end) {
          return self2.slice(start, end);
        },
        StringPrototypeToLowerCase(self2) {
          return self2.toLowerCase();
        },
        StringPrototypeToUpperCase(self2) {
          return self2.toUpperCase();
        },
        StringPrototypeTrim(self2) {
          return self2.trim();
        },
        Symbol,
        SymbolFor: Symbol.for,
        SymbolAsyncIterator: Symbol.asyncIterator,
        SymbolHasInstance: Symbol.hasInstance,
        SymbolIterator: Symbol.iterator,
        SymbolDispose: Symbol.dispose || Symbol("Symbol.dispose"),
        SymbolAsyncDispose: Symbol.asyncDispose || Symbol("Symbol.asyncDispose"),
        TypedArrayPrototypeSet(self2, buf, len) {
          return self2.set(buf, len);
        },
        Boolean,
        Uint8Array
      };
    }
  });

  // node_modules/readable-stream/lib/ours/util/inspect.js
  var require_inspect = __commonJS({
    "node_modules/readable-stream/lib/ours/util/inspect.js"(exports8, module) {
      "use strict";
      init_dirname();
      init_buffer2();
      init_process2();
      module.exports = {
        format(format2, ...args) {
          return format2.replace(/%([sdifj])/g, function(...[_unused, type]) {
            const replacement = args.shift();
            if (type === "f") {
              return replacement.toFixed(6);
            } else if (type === "j") {
              return JSON.stringify(replacement);
            } else if (type === "s" && typeof replacement === "object") {
              const ctor = replacement.constructor !== Object ? replacement.constructor.name : "";
              return `${ctor} {}`.trim();
            } else {
              return replacement.toString();
            }
          });
        },
        inspect(value) {
          switch (typeof value) {
            case "string":
              if (value.includes("'")) {
                if (!value.includes('"')) {
                  return `"${value}"`;
                } else if (!value.includes("`") && !value.includes("${")) {
                  return `\`${value}\``;
                }
              }
              return `'${value}'`;
            case "number":
              if (isNaN(value)) {
                return "NaN";
              } else if (Object.is(value, -0)) {
                return String(value);
              }
              return value;
            case "bigint":
              return `${String(value)}n`;
            case "boolean":
            case "undefined":
              return String(value);
            case "object":
              return "{}";
          }
        }
      };
    }
  });

  // node_modules/readable-stream/lib/ours/errors.js
  var require_errors = __commonJS({
    "node_modules/readable-stream/lib/ours/errors.js"(exports8, module) {
      "use strict";
      init_dirname();
      init_buffer2();
      init_process2();
      var { format: format2, inspect } = require_inspect();
      var { AggregateError: CustomAggregateError } = require_primordials();
      var AggregateError2 = globalThis.AggregateError || CustomAggregateError;
      var kIsNodeError = Symbol("kIsNodeError");
      var kTypes = [
        "string",
        "function",
        "number",
        "object",
        // Accept 'Function' and 'Object' as alternative to the lower cased version.
        "Function",
        "Object",
        "boolean",
        "bigint",
        "symbol"
      ];
      var classRegExp = /^([A-Z][a-z0-9]*)+$/;
      var nodeInternalPrefix = "__node_internal_";
      var codes = {};
      function assert3(value, message) {
        if (!value) {
          throw new codes.ERR_INTERNAL_ASSERTION(message);
        }
      }
      function addNumericalSeparator(val) {
        let res = "";
        let i = val.length;
        const start = val[0] === "-" ? 1 : 0;
        for (; i >= start + 4; i -= 3) {
          res = `_${val.slice(i - 3, i)}${res}`;
        }
        return `${val.slice(0, i)}${res}`;
      }
      function getMessage(key, msg, args) {
        if (typeof msg === "function") {
          assert3(
            msg.length <= args.length,
            // Default options do not count.
            `Code: ${key}; The provided arguments length (${args.length}) does not match the required ones (${msg.length}).`
          );
          return msg(...args);
        }
        const expectedLength = (msg.match(/%[dfijoOs]/g) || []).length;
        assert3(
          expectedLength === args.length,
          `Code: ${key}; The provided arguments length (${args.length}) does not match the required ones (${expectedLength}).`
        );
        if (args.length === 0) {
          return msg;
        }
        return format2(msg, ...args);
      }
      function E(code, message, Base) {
        if (!Base) {
          Base = Error;
        }
        class NodeError extends Base {
          constructor(...args) {
            super(getMessage(code, message, args));
          }
          toString() {
            return `${this.name} [${code}]: ${this.message}`;
          }
        }
        Object.defineProperties(NodeError.prototype, {
          name: {
            value: Base.name,
            writable: true,
            enumerable: false,
            configurable: true
          },
          toString: {
            value() {
              return `${this.name} [${code}]: ${this.message}`;
            },
            writable: true,
            enumerable: false,
            configurable: true
          }
        });
        NodeError.prototype.code = code;
        NodeError.prototype[kIsNodeError] = true;
        codes[code] = NodeError;
      }
      function hideStackFrames(fn) {
        const hidden = nodeInternalPrefix + fn.name;
        Object.defineProperty(fn, "name", {
          value: hidden
        });
        return fn;
      }
      function aggregateTwoErrors(innerError, outerError) {
        if (innerError && outerError && innerError !== outerError) {
          if (Array.isArray(outerError.errors)) {
            outerError.errors.push(innerError);
            return outerError;
          }
          const err = new AggregateError2([outerError, innerError], outerError.message);
          err.code = outerError.code;
          return err;
        }
        return innerError || outerError;
      }
      var AbortError = class extends Error {
        constructor(message = "The operation was aborted", options = void 0) {
          if (options !== void 0 && typeof options !== "object") {
            throw new codes.ERR_INVALID_ARG_TYPE("options", "Object", options);
          }
          super(message, options);
          this.code = "ABORT_ERR";
          this.name = "AbortError";
        }
      };
      E("ERR_ASSERTION", "%s", Error);
      E(
        "ERR_INVALID_ARG_TYPE",
        (name2, expected, actual) => {
          assert3(typeof name2 === "string", "'name' must be a string");
          if (!Array.isArray(expected)) {
            expected = [expected];
          }
          let msg = "The ";
          if (name2.endsWith(" argument")) {
            msg += `${name2} `;
          } else {
            msg += `"${name2}" ${name2.includes(".") ? "property" : "argument"} `;
          }
          msg += "must be ";
          const types = [];
          const instances = [];
          const other = [];
          for (const value of expected) {
            assert3(typeof value === "string", "All expected entries have to be of type string");
            if (kTypes.includes(value)) {
              types.push(value.toLowerCase());
            } else if (classRegExp.test(value)) {
              instances.push(value);
            } else {
              assert3(value !== "object", 'The value "object" should be written as "Object"');
              other.push(value);
            }
          }
          if (instances.length > 0) {
            const pos = types.indexOf("object");
            if (pos !== -1) {
              types.splice(types, pos, 1);
              instances.push("Object");
            }
          }
          if (types.length > 0) {
            switch (types.length) {
              case 1:
                msg += `of type ${types[0]}`;
                break;
              case 2:
                msg += `one of type ${types[0]} or ${types[1]}`;
                break;
              default: {
                const last = types.pop();
                msg += `one of type ${types.join(", ")}, or ${last}`;
              }
            }
            if (instances.length > 0 || other.length > 0) {
              msg += " or ";
            }
          }
          if (instances.length > 0) {
            switch (instances.length) {
              case 1:
                msg += `an instance of ${instances[0]}`;
                break;
              case 2:
                msg += `an instance of ${instances[0]} or ${instances[1]}`;
                break;
              default: {
                const last = instances.pop();
                msg += `an instance of ${instances.join(", ")}, or ${last}`;
              }
            }
            if (other.length > 0) {
              msg += " or ";
            }
          }
          switch (other.length) {
            case 0:
              break;
            case 1:
              if (other[0].toLowerCase() !== other[0]) {
                msg += "an ";
              }
              msg += `${other[0]}`;
              break;
            case 2:
              msg += `one of ${other[0]} or ${other[1]}`;
              break;
            default: {
              const last = other.pop();
              msg += `one of ${other.join(", ")}, or ${last}`;
            }
          }
          if (actual == null) {
            msg += `. Received ${actual}`;
          } else if (typeof actual === "function" && actual.name) {
            msg += `. Received function ${actual.name}`;
          } else if (typeof actual === "object") {
            var _actual$constructor;
            if ((_actual$constructor = actual.constructor) !== null && _actual$constructor !== void 0 && _actual$constructor.name) {
              msg += `. Received an instance of ${actual.constructor.name}`;
            } else {
              const inspected = inspect(actual, {
                depth: -1
              });
              msg += `. Received ${inspected}`;
            }
          } else {
            let inspected = inspect(actual, {
              colors: false
            });
            if (inspected.length > 25) {
              inspected = `${inspected.slice(0, 25)}...`;
            }
            msg += `. Received type ${typeof actual} (${inspected})`;
          }
          return msg;
        },
        TypeError
      );
      E(
        "ERR_INVALID_ARG_VALUE",
        (name2, value, reason = "is invalid") => {
          let inspected = inspect(value);
          if (inspected.length > 128) {
            inspected = inspected.slice(0, 128) + "...";
          }
          const type = name2.includes(".") ? "property" : "argument";
          return `The ${type} '${name2}' ${reason}. Received ${inspected}`;
        },
        TypeError
      );
      E(
        "ERR_INVALID_RETURN_VALUE",
        (input, name2, value) => {
          var _value$constructor;
          const type = value !== null && value !== void 0 && (_value$constructor = value.constructor) !== null && _value$constructor !== void 0 && _value$constructor.name ? `instance of ${value.constructor.name}` : `type ${typeof value}`;
          return `Expected ${input} to be returned from the "${name2}" function but got ${type}.`;
        },
        TypeError
      );
      E(
        "ERR_MISSING_ARGS",
        (...args) => {
          assert3(args.length > 0, "At least one arg needs to be specified");
          let msg;
          const len = args.length;
          args = (Array.isArray(args) ? args : [args]).map((a) => `"${a}"`).join(" or ");
          switch (len) {
            case 1:
              msg += `The ${args[0]} argument`;
              break;
            case 2:
              msg += `The ${args[0]} and ${args[1]} arguments`;
              break;
            default:
              {
                const last = args.pop();
                msg += `The ${args.join(", ")}, and ${last} arguments`;
              }
              break;
          }
          return `${msg} must be specified`;
        },
        TypeError
      );
      E(
        "ERR_OUT_OF_RANGE",
        (str, range, input) => {
          assert3(range, 'Missing "range" argument');
          let received;
          if (Number.isInteger(input) && Math.abs(input) > 2 ** 32) {
            received = addNumericalSeparator(String(input));
          } else if (typeof input === "bigint") {
            received = String(input);
            const limit = BigInt(2) ** BigInt(32);
            if (input > limit || input < -limit) {
              received = addNumericalSeparator(received);
            }
            received += "n";
          } else {
            received = inspect(input);
          }
          return `The value of "${str}" is out of range. It must be ${range}. Received ${received}`;
        },
        RangeError
      );
      E("ERR_MULTIPLE_CALLBACK", "Callback called multiple times", Error);
      E("ERR_METHOD_NOT_IMPLEMENTED", "The %s method is not implemented", Error);
      E("ERR_STREAM_ALREADY_FINISHED", "Cannot call %s after a stream was finished", Error);
      E("ERR_STREAM_CANNOT_PIPE", "Cannot pipe, not readable", Error);
      E("ERR_STREAM_DESTROYED", "Cannot call %s after a stream was destroyed", Error);
      E("ERR_STREAM_NULL_VALUES", "May not write null values to stream", TypeError);
      E("ERR_STREAM_PREMATURE_CLOSE", "Premature close", Error);
      E("ERR_STREAM_PUSH_AFTER_EOF", "stream.push() after EOF", Error);
      E("ERR_STREAM_UNSHIFT_AFTER_END_EVENT", "stream.unshift() after end event", Error);
      E("ERR_STREAM_WRITE_AFTER_END", "write after end", Error);
      E("ERR_UNKNOWN_ENCODING", "Unknown encoding: %s", TypeError);
      module.exports = {
        AbortError,
        aggregateTwoErrors: hideStackFrames(aggregateTwoErrors),
        hideStackFrames,
        codes
      };
    }
  });

  // node_modules/abort-controller/browser.js
  var require_browser = __commonJS({
    "node_modules/abort-controller/browser.js"(exports8, module) {
      "use strict";
      init_dirname();
      init_buffer2();
      init_process2();
      var { AbortController, AbortSignal } = typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : (
        /* otherwise */
        void 0
      );
      module.exports = AbortController;
      module.exports.AbortSignal = AbortSignal;
      module.exports.default = AbortController;
    }
  });

  // node_modules/@jspm/core/nodelibs/browser/events.js
  var events_exports = {};
  __export(events_exports, {
    EventEmitter: () => EventEmitter,
    default: () => exports3,
    defaultMaxListeners: () => defaultMaxListeners,
    init: () => init,
    listenerCount: () => listenerCount,
    on: () => on2,
    once: () => once2
  });
  function dew2() {
    if (_dewExec2) return exports$12;
    _dewExec2 = true;
    var R = typeof Reflect === "object" ? Reflect : null;
    var ReflectApply = R && typeof R.apply === "function" ? R.apply : function ReflectApply2(target, receiver, args) {
      return Function.prototype.apply.call(target, receiver, args);
    };
    var ReflectOwnKeys;
    if (R && typeof R.ownKeys === "function") {
      ReflectOwnKeys = R.ownKeys;
    } else if (Object.getOwnPropertySymbols) {
      ReflectOwnKeys = function ReflectOwnKeys2(target) {
        return Object.getOwnPropertyNames(target).concat(Object.getOwnPropertySymbols(target));
      };
    } else {
      ReflectOwnKeys = function ReflectOwnKeys2(target) {
        return Object.getOwnPropertyNames(target);
      };
    }
    function ProcessEmitWarning(warning) {
      if (console && console.warn) console.warn(warning);
    }
    var NumberIsNaN = Number.isNaN || function NumberIsNaN2(value) {
      return value !== value;
    };
    function EventEmitter2() {
      EventEmitter2.init.call(this);
    }
    exports$12 = EventEmitter2;
    exports$12.once = once4;
    EventEmitter2.EventEmitter = EventEmitter2;
    EventEmitter2.prototype._events = void 0;
    EventEmitter2.prototype._eventsCount = 0;
    EventEmitter2.prototype._maxListeners = void 0;
    var defaultMaxListeners2 = 10;
    function checkListener(listener) {
      if (typeof listener !== "function") {
        throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof listener);
      }
    }
    Object.defineProperty(EventEmitter2, "defaultMaxListeners", {
      enumerable: true,
      get: function() {
        return defaultMaxListeners2;
      },
      set: function(arg) {
        if (typeof arg !== "number" || arg < 0 || NumberIsNaN(arg)) {
          throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + arg + ".");
        }
        defaultMaxListeners2 = arg;
      }
    });
    EventEmitter2.init = function() {
      if (this._events === void 0 || this._events === Object.getPrototypeOf(this)._events) {
        this._events = /* @__PURE__ */ Object.create(null);
        this._eventsCount = 0;
      }
      this._maxListeners = this._maxListeners || void 0;
    };
    EventEmitter2.prototype.setMaxListeners = function setMaxListeners(n) {
      if (typeof n !== "number" || n < 0 || NumberIsNaN(n)) {
        throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + n + ".");
      }
      this._maxListeners = n;
      return this;
    };
    function _getMaxListeners(that) {
      if (that._maxListeners === void 0) return EventEmitter2.defaultMaxListeners;
      return that._maxListeners;
    }
    EventEmitter2.prototype.getMaxListeners = function getMaxListeners() {
      return _getMaxListeners(this);
    };
    EventEmitter2.prototype.emit = function emit3(type) {
      var args = [];
      for (var i = 1; i < arguments.length; i++) args.push(arguments[i]);
      var doError = type === "error";
      var events = this._events;
      if (events !== void 0) doError = doError && events.error === void 0;
      else if (!doError) return false;
      if (doError) {
        var er;
        if (args.length > 0) er = args[0];
        if (er instanceof Error) {
          throw er;
        }
        var err = new Error("Unhandled error." + (er ? " (" + er.message + ")" : ""));
        err.context = er;
        throw err;
      }
      var handler = events[type];
      if (handler === void 0) return false;
      if (typeof handler === "function") {
        ReflectApply(handler, this, args);
      } else {
        var len = handler.length;
        var listeners3 = arrayClone(handler, len);
        for (var i = 0; i < len; ++i) ReflectApply(listeners3[i], this, args);
      }
      return true;
    };
    function _addListener(target, type, listener, prepend) {
      var m;
      var events;
      var existing;
      checkListener(listener);
      events = target._events;
      if (events === void 0) {
        events = target._events = /* @__PURE__ */ Object.create(null);
        target._eventsCount = 0;
      } else {
        if (events.newListener !== void 0) {
          target.emit("newListener", type, listener.listener ? listener.listener : listener);
          events = target._events;
        }
        existing = events[type];
      }
      if (existing === void 0) {
        existing = events[type] = listener;
        ++target._eventsCount;
      } else {
        if (typeof existing === "function") {
          existing = events[type] = prepend ? [listener, existing] : [existing, listener];
        } else if (prepend) {
          existing.unshift(listener);
        } else {
          existing.push(listener);
        }
        m = _getMaxListeners(target);
        if (m > 0 && existing.length > m && !existing.warned) {
          existing.warned = true;
          var w = new Error("Possible EventEmitter memory leak detected. " + existing.length + " " + String(type) + " listeners added. Use emitter.setMaxListeners() to increase limit");
          w.name = "MaxListenersExceededWarning";
          w.emitter = target;
          w.type = type;
          w.count = existing.length;
          ProcessEmitWarning(w);
        }
      }
      return target;
    }
    EventEmitter2.prototype.addListener = function addListener3(type, listener) {
      return _addListener(this, type, listener, false);
    };
    EventEmitter2.prototype.on = EventEmitter2.prototype.addListener;
    EventEmitter2.prototype.prependListener = function prependListener3(type, listener) {
      return _addListener(this, type, listener, true);
    };
    function onceWrapper() {
      if (!this.fired) {
        this.target.removeListener(this.type, this.wrapFn);
        this.fired = true;
        if (arguments.length === 0) return this.listener.call(this.target);
        return this.listener.apply(this.target, arguments);
      }
    }
    function _onceWrap(target, type, listener) {
      var state = {
        fired: false,
        wrapFn: void 0,
        target,
        type,
        listener
      };
      var wrapped = onceWrapper.bind(state);
      wrapped.listener = listener;
      state.wrapFn = wrapped;
      return wrapped;
    }
    EventEmitter2.prototype.once = function once5(type, listener) {
      checkListener(listener);
      this.on(type, _onceWrap(this, type, listener));
      return this;
    };
    EventEmitter2.prototype.prependOnceListener = function prependOnceListener3(type, listener) {
      checkListener(listener);
      this.prependListener(type, _onceWrap(this, type, listener));
      return this;
    };
    EventEmitter2.prototype.removeListener = function removeListener3(type, listener) {
      var list, events, position, i, originalListener;
      checkListener(listener);
      events = this._events;
      if (events === void 0) return this;
      list = events[type];
      if (list === void 0) return this;
      if (list === listener || list.listener === listener) {
        if (--this._eventsCount === 0) this._events = /* @__PURE__ */ Object.create(null);
        else {
          delete events[type];
          if (events.removeListener) this.emit("removeListener", type, list.listener || listener);
        }
      } else if (typeof list !== "function") {
        position = -1;
        for (i = list.length - 1; i >= 0; i--) {
          if (list[i] === listener || list[i].listener === listener) {
            originalListener = list[i].listener;
            position = i;
            break;
          }
        }
        if (position < 0) return this;
        if (position === 0) list.shift();
        else {
          spliceOne(list, position);
        }
        if (list.length === 1) events[type] = list[0];
        if (events.removeListener !== void 0) this.emit("removeListener", type, originalListener || listener);
      }
      return this;
    };
    EventEmitter2.prototype.off = EventEmitter2.prototype.removeListener;
    EventEmitter2.prototype.removeAllListeners = function removeAllListeners3(type) {
      var listeners3, events, i;
      events = this._events;
      if (events === void 0) return this;
      if (events.removeListener === void 0) {
        if (arguments.length === 0) {
          this._events = /* @__PURE__ */ Object.create(null);
          this._eventsCount = 0;
        } else if (events[type] !== void 0) {
          if (--this._eventsCount === 0) this._events = /* @__PURE__ */ Object.create(null);
          else delete events[type];
        }
        return this;
      }
      if (arguments.length === 0) {
        var keys = Object.keys(events);
        var key;
        for (i = 0; i < keys.length; ++i) {
          key = keys[i];
          if (key === "removeListener") continue;
          this.removeAllListeners(key);
        }
        this.removeAllListeners("removeListener");
        this._events = /* @__PURE__ */ Object.create(null);
        this._eventsCount = 0;
        return this;
      }
      listeners3 = events[type];
      if (typeof listeners3 === "function") {
        this.removeListener(type, listeners3);
      } else if (listeners3 !== void 0) {
        for (i = listeners3.length - 1; i >= 0; i--) {
          this.removeListener(type, listeners3[i]);
        }
      }
      return this;
    };
    function _listeners(target, type, unwrap) {
      var events = target._events;
      if (events === void 0) return [];
      var evlistener = events[type];
      if (evlistener === void 0) return [];
      if (typeof evlistener === "function") return unwrap ? [evlistener.listener || evlistener] : [evlistener];
      return unwrap ? unwrapListeners(evlistener) : arrayClone(evlistener, evlistener.length);
    }
    EventEmitter2.prototype.listeners = function listeners3(type) {
      return _listeners(this, type, true);
    };
    EventEmitter2.prototype.rawListeners = function rawListeners(type) {
      return _listeners(this, type, false);
    };
    EventEmitter2.listenerCount = function(emitter, type) {
      if (typeof emitter.listenerCount === "function") {
        return emitter.listenerCount(type);
      } else {
        return listenerCount2.call(emitter, type);
      }
    };
    EventEmitter2.prototype.listenerCount = listenerCount2;
    function listenerCount2(type) {
      var events = this._events;
      if (events !== void 0) {
        var evlistener = events[type];
        if (typeof evlistener === "function") {
          return 1;
        } else if (evlistener !== void 0) {
          return evlistener.length;
        }
      }
      return 0;
    }
    EventEmitter2.prototype.eventNames = function eventNames() {
      return this._eventsCount > 0 ? ReflectOwnKeys(this._events) : [];
    };
    function arrayClone(arr, n) {
      var copy = new Array(n);
      for (var i = 0; i < n; ++i) copy[i] = arr[i];
      return copy;
    }
    function spliceOne(list, index) {
      for (; index + 1 < list.length; index++) list[index] = list[index + 1];
      list.pop();
    }
    function unwrapListeners(arr) {
      var ret = new Array(arr.length);
      for (var i = 0; i < ret.length; ++i) {
        ret[i] = arr[i].listener || arr[i];
      }
      return ret;
    }
    function once4(emitter, name2) {
      return new Promise(function(resolve2, reject) {
        function errorListener(err) {
          emitter.removeListener(name2, resolver);
          reject(err);
        }
        function resolver() {
          if (typeof emitter.removeListener === "function") {
            emitter.removeListener("error", errorListener);
          }
          resolve2([].slice.call(arguments));
        }
        eventTargetAgnosticAddListener(emitter, name2, resolver, {
          once: true
        });
        if (name2 !== "error") {
          addErrorHandlerIfEventEmitter(emitter, errorListener, {
            once: true
          });
        }
      });
    }
    function addErrorHandlerIfEventEmitter(emitter, handler, flags) {
      if (typeof emitter.on === "function") {
        eventTargetAgnosticAddListener(emitter, "error", handler, flags);
      }
    }
    function eventTargetAgnosticAddListener(emitter, name2, listener, flags) {
      if (typeof emitter.on === "function") {
        if (flags.once) {
          emitter.once(name2, listener);
        } else {
          emitter.on(name2, listener);
        }
      } else if (typeof emitter.addEventListener === "function") {
        emitter.addEventListener(name2, function wrapListener(arg) {
          if (flags.once) {
            emitter.removeEventListener(name2, wrapListener);
          }
          listener(arg);
        });
      } else {
        throw new TypeError('The "emitter" argument must be of type EventEmitter. Received type ' + typeof emitter);
      }
    }
    return exports$12;
  }
  var exports$12, _dewExec2, exports3, EventEmitter, defaultMaxListeners, init, listenerCount, on2, once2;
  var init_events = __esm({
    "node_modules/@jspm/core/nodelibs/browser/events.js"() {
      init_dirname();
      init_buffer2();
      init_process2();
      exports$12 = {};
      _dewExec2 = false;
      exports3 = dew2();
      exports3["once"];
      exports3.once = function(emitter, event) {
        return new Promise((resolve2, reject) => {
          function eventListener(...args) {
            if (errorListener !== void 0) {
              emitter.removeListener("error", errorListener);
            }
            resolve2(args);
          }
          let errorListener;
          if (event !== "error") {
            errorListener = (err) => {
              emitter.removeListener(name, eventListener);
              reject(err);
            };
            emitter.once("error", errorListener);
          }
          emitter.once(event, eventListener);
        });
      };
      exports3.on = function(emitter, event) {
        const unconsumedEventValues = [];
        const unconsumedPromises = [];
        let error = null;
        let finished = false;
        const iterator = {
          async next() {
            const value = unconsumedEventValues.shift();
            if (value) {
              return createIterResult(value, false);
            }
            if (error) {
              const p = Promise.reject(error);
              error = null;
              return p;
            }
            if (finished) {
              return createIterResult(void 0, true);
            }
            return new Promise((resolve2, reject) => unconsumedPromises.push({ resolve: resolve2, reject }));
          },
          async return() {
            emitter.removeListener(event, eventHandler);
            emitter.removeListener("error", errorHandler);
            finished = true;
            for (const promise of unconsumedPromises) {
              promise.resolve(createIterResult(void 0, true));
            }
            return createIterResult(void 0, true);
          },
          throw(err) {
            error = err;
            emitter.removeListener(event, eventHandler);
            emitter.removeListener("error", errorHandler);
          },
          [Symbol.asyncIterator]() {
            return this;
          }
        };
        emitter.on(event, eventHandler);
        emitter.on("error", errorHandler);
        return iterator;
        function eventHandler(...args) {
          const promise = unconsumedPromises.shift();
          if (promise) {
            promise.resolve(createIterResult(args, false));
          } else {
            unconsumedEventValues.push(args);
          }
        }
        function errorHandler(err) {
          finished = true;
          const toError = unconsumedPromises.shift();
          if (toError) {
            toError.reject(err);
          } else {
            error = err;
          }
          iterator.return();
        }
      };
      ({
        EventEmitter,
        defaultMaxListeners,
        init,
        listenerCount,
        on: on2,
        once: once2
      } = exports3);
    }
  });

  // node_modules/readable-stream/lib/ours/util.js
  var require_util = __commonJS({
    "node_modules/readable-stream/lib/ours/util.js"(exports8, module) {
      "use strict";
      init_dirname();
      init_buffer2();
      init_process2();
      var bufferModule = (init_buffer(), __toCommonJS(buffer_exports));
      var { format: format2, inspect } = require_inspect();
      var {
        codes: { ERR_INVALID_ARG_TYPE }
      } = require_errors();
      var { kResistStopPropagation, AggregateError: AggregateError2, SymbolDispose } = require_primordials();
      var AbortSignal = globalThis.AbortSignal || require_browser().AbortSignal;
      var AbortController = globalThis.AbortController || require_browser().AbortController;
      var AsyncFunction = Object.getPrototypeOf(async function() {
      }).constructor;
      var Blob2 = globalThis.Blob || bufferModule.Blob;
      var isBlob = typeof Blob2 !== "undefined" ? function isBlob2(b) {
        return b instanceof Blob2;
      } : function isBlob2(b) {
        return false;
      };
      var validateAbortSignal = (signal, name2) => {
        if (signal !== void 0 && (signal === null || typeof signal !== "object" || !("aborted" in signal))) {
          throw new ERR_INVALID_ARG_TYPE(name2, "AbortSignal", signal);
        }
      };
      var validateFunction = (value, name2) => {
        if (typeof value !== "function") {
          throw new ERR_INVALID_ARG_TYPE(name2, "Function", value);
        }
      };
      module.exports = {
        AggregateError: AggregateError2,
        kEmptyObject: Object.freeze({}),
        once(callback) {
          let called = false;
          return function(...args) {
            if (called) {
              return;
            }
            called = true;
            callback.apply(this, args);
          };
        },
        createDeferredPromise: function() {
          let resolve2;
          let reject;
          const promise = new Promise((res, rej) => {
            resolve2 = res;
            reject = rej;
          });
          return {
            promise,
            resolve: resolve2,
            reject
          };
        },
        promisify(fn) {
          return new Promise((resolve2, reject) => {
            fn((err, ...args) => {
              if (err) {
                return reject(err);
              }
              return resolve2(...args);
            });
          });
        },
        debuglog() {
          return function() {
          };
        },
        format: format2,
        inspect,
        types: {
          isAsyncFunction(fn) {
            return fn instanceof AsyncFunction;
          },
          isArrayBufferView(arr) {
            return ArrayBuffer.isView(arr);
          }
        },
        isBlob,
        deprecate(fn, message) {
          return fn;
        },
        addAbortListener: (init_events(), __toCommonJS(events_exports)).addAbortListener || function addAbortListener(signal, listener) {
          if (signal === void 0) {
            throw new ERR_INVALID_ARG_TYPE("signal", "AbortSignal", signal);
          }
          validateAbortSignal(signal, "signal");
          validateFunction(listener, "listener");
          let removeEventListener;
          if (signal.aborted) {
            queueMicrotask(() => listener());
          } else {
            signal.addEventListener("abort", listener, {
              __proto__: null,
              once: true,
              [kResistStopPropagation]: true
            });
            removeEventListener = () => {
              signal.removeEventListener("abort", listener);
            };
          }
          return {
            __proto__: null,
            [SymbolDispose]() {
              var _removeEventListener;
              (_removeEventListener = removeEventListener) === null || _removeEventListener === void 0 ? void 0 : _removeEventListener();
            }
          };
        },
        AbortSignalAny: AbortSignal.any || function AbortSignalAny(signals) {
          if (signals.length === 1) {
            return signals[0];
          }
          const ac = new AbortController();
          const abort3 = () => ac.abort();
          signals.forEach((signal) => {
            validateAbortSignal(signal, "signals");
            signal.addEventListener("abort", abort3, {
              once: true
            });
          });
          ac.signal.addEventListener(
            "abort",
            () => {
              signals.forEach((signal) => signal.removeEventListener("abort", abort3));
            },
            {
              once: true
            }
          );
          return ac.signal;
        }
      };
      module.exports.promisify.custom = Symbol.for("nodejs.util.promisify.custom");
    }
  });

  // node_modules/readable-stream/lib/internal/validators.js
  var require_validators = __commonJS({
    "node_modules/readable-stream/lib/internal/validators.js"(exports8, module) {
      "use strict";
      init_dirname();
      init_buffer2();
      init_process2();
      var {
        ArrayIsArray,
        ArrayPrototypeIncludes,
        ArrayPrototypeJoin,
        ArrayPrototypeMap,
        NumberIsInteger,
        NumberIsNaN,
        NumberMAX_SAFE_INTEGER,
        NumberMIN_SAFE_INTEGER,
        NumberParseInt,
        ObjectPrototypeHasOwnProperty,
        RegExpPrototypeExec,
        String: String2,
        StringPrototypeToUpperCase,
        StringPrototypeTrim
      } = require_primordials();
      var {
        hideStackFrames,
        codes: { ERR_SOCKET_BAD_PORT, ERR_INVALID_ARG_TYPE, ERR_INVALID_ARG_VALUE, ERR_OUT_OF_RANGE, ERR_UNKNOWN_SIGNAL }
      } = require_errors();
      var { normalizeEncoding } = require_util();
      var { isAsyncFunction, isArrayBufferView } = require_util().types;
      var signals = {};
      function isInt32(value) {
        return value === (value | 0);
      }
      function isUint32(value) {
        return value === value >>> 0;
      }
      var octalReg = /^[0-7]+$/;
      var modeDesc = "must be a 32-bit unsigned integer or an octal string";
      function parseFileMode(value, name2, def) {
        if (typeof value === "undefined") {
          value = def;
        }
        if (typeof value === "string") {
          if (RegExpPrototypeExec(octalReg, value) === null) {
            throw new ERR_INVALID_ARG_VALUE(name2, value, modeDesc);
          }
          value = NumberParseInt(value, 8);
        }
        validateUint32(value, name2);
        return value;
      }
      var validateInteger = hideStackFrames((value, name2, min = NumberMIN_SAFE_INTEGER, max = NumberMAX_SAFE_INTEGER) => {
        if (typeof value !== "number") throw new ERR_INVALID_ARG_TYPE(name2, "number", value);
        if (!NumberIsInteger(value)) throw new ERR_OUT_OF_RANGE(name2, "an integer", value);
        if (value < min || value > max) throw new ERR_OUT_OF_RANGE(name2, `>= ${min} && <= ${max}`, value);
      });
      var validateInt32 = hideStackFrames((value, name2, min = -2147483648, max = 2147483647) => {
        if (typeof value !== "number") {
          throw new ERR_INVALID_ARG_TYPE(name2, "number", value);
        }
        if (!NumberIsInteger(value)) {
          throw new ERR_OUT_OF_RANGE(name2, "an integer", value);
        }
        if (value < min || value > max) {
          throw new ERR_OUT_OF_RANGE(name2, `>= ${min} && <= ${max}`, value);
        }
      });
      var validateUint32 = hideStackFrames((value, name2, positive = false) => {
        if (typeof value !== "number") {
          throw new ERR_INVALID_ARG_TYPE(name2, "number", value);
        }
        if (!NumberIsInteger(value)) {
          throw new ERR_OUT_OF_RANGE(name2, "an integer", value);
        }
        const min = positive ? 1 : 0;
        const max = 4294967295;
        if (value < min || value > max) {
          throw new ERR_OUT_OF_RANGE(name2, `>= ${min} && <= ${max}`, value);
        }
      });
      function validateString(value, name2) {
        if (typeof value !== "string") throw new ERR_INVALID_ARG_TYPE(name2, "string", value);
      }
      function validateNumber(value, name2, min = void 0, max) {
        if (typeof value !== "number") throw new ERR_INVALID_ARG_TYPE(name2, "number", value);
        if (min != null && value < min || max != null && value > max || (min != null || max != null) && NumberIsNaN(value)) {
          throw new ERR_OUT_OF_RANGE(
            name2,
            `${min != null ? `>= ${min}` : ""}${min != null && max != null ? " && " : ""}${max != null ? `<= ${max}` : ""}`,
            value
          );
        }
      }
      var validateOneOf = hideStackFrames((value, name2, oneOf) => {
        if (!ArrayPrototypeIncludes(oneOf, value)) {
          const allowed = ArrayPrototypeJoin(
            ArrayPrototypeMap(oneOf, (v) => typeof v === "string" ? `'${v}'` : String2(v)),
            ", "
          );
          const reason = "must be one of: " + allowed;
          throw new ERR_INVALID_ARG_VALUE(name2, value, reason);
        }
      });
      function validateBoolean(value, name2) {
        if (typeof value !== "boolean") throw new ERR_INVALID_ARG_TYPE(name2, "boolean", value);
      }
      function getOwnPropertyValueOrDefault(options, key, defaultValue) {
        return options == null || !ObjectPrototypeHasOwnProperty(options, key) ? defaultValue : options[key];
      }
      var validateObject = hideStackFrames((value, name2, options = null) => {
        const allowArray = getOwnPropertyValueOrDefault(options, "allowArray", false);
        const allowFunction = getOwnPropertyValueOrDefault(options, "allowFunction", false);
        const nullable = getOwnPropertyValueOrDefault(options, "nullable", false);
        if (!nullable && value === null || !allowArray && ArrayIsArray(value) || typeof value !== "object" && (!allowFunction || typeof value !== "function")) {
          throw new ERR_INVALID_ARG_TYPE(name2, "Object", value);
        }
      });
      var validateDictionary = hideStackFrames((value, name2) => {
        if (value != null && typeof value !== "object" && typeof value !== "function") {
          throw new ERR_INVALID_ARG_TYPE(name2, "a dictionary", value);
        }
      });
      var validateArray = hideStackFrames((value, name2, minLength = 0) => {
        if (!ArrayIsArray(value)) {
          throw new ERR_INVALID_ARG_TYPE(name2, "Array", value);
        }
        if (value.length < minLength) {
          const reason = `must be longer than ${minLength}`;
          throw new ERR_INVALID_ARG_VALUE(name2, value, reason);
        }
      });
      function validateStringArray(value, name2) {
        validateArray(value, name2);
        for (let i = 0; i < value.length; i++) {
          validateString(value[i], `${name2}[${i}]`);
        }
      }
      function validateBooleanArray(value, name2) {
        validateArray(value, name2);
        for (let i = 0; i < value.length; i++) {
          validateBoolean(value[i], `${name2}[${i}]`);
        }
      }
      function validateAbortSignalArray(value, name2) {
        validateArray(value, name2);
        for (let i = 0; i < value.length; i++) {
          const signal = value[i];
          const indexedName = `${name2}[${i}]`;
          if (signal == null) {
            throw new ERR_INVALID_ARG_TYPE(indexedName, "AbortSignal", signal);
          }
          validateAbortSignal(signal, indexedName);
        }
      }
      function validateSignalName(signal, name2 = "signal") {
        validateString(signal, name2);
        if (signals[signal] === void 0) {
          if (signals[StringPrototypeToUpperCase(signal)] !== void 0) {
            throw new ERR_UNKNOWN_SIGNAL(signal + " (signals must use all capital letters)");
          }
          throw new ERR_UNKNOWN_SIGNAL(signal);
        }
      }
      var validateBuffer = hideStackFrames((buffer, name2 = "buffer") => {
        if (!isArrayBufferView(buffer)) {
          throw new ERR_INVALID_ARG_TYPE(name2, ["Buffer", "TypedArray", "DataView"], buffer);
        }
      });
      function validateEncoding(data, encoding) {
        const normalizedEncoding = normalizeEncoding(encoding);
        const length = data.length;
        if (normalizedEncoding === "hex" && length % 2 !== 0) {
          throw new ERR_INVALID_ARG_VALUE("encoding", encoding, `is invalid for data of length ${length}`);
        }
      }
      function validatePort(port, name2 = "Port", allowZero = true) {
        if (typeof port !== "number" && typeof port !== "string" || typeof port === "string" && StringPrototypeTrim(port).length === 0 || +port !== +port >>> 0 || port > 65535 || port === 0 && !allowZero) {
          throw new ERR_SOCKET_BAD_PORT(name2, port, allowZero);
        }
        return port | 0;
      }
      var validateAbortSignal = hideStackFrames((signal, name2) => {
        if (signal !== void 0 && (signal === null || typeof signal !== "object" || !("aborted" in signal))) {
          throw new ERR_INVALID_ARG_TYPE(name2, "AbortSignal", signal);
        }
      });
      var validateFunction = hideStackFrames((value, name2) => {
        if (typeof value !== "function") throw new ERR_INVALID_ARG_TYPE(name2, "Function", value);
      });
      var validatePlainFunction = hideStackFrames((value, name2) => {
        if (typeof value !== "function" || isAsyncFunction(value)) throw new ERR_INVALID_ARG_TYPE(name2, "Function", value);
      });
      var validateUndefined = hideStackFrames((value, name2) => {
        if (value !== void 0) throw new ERR_INVALID_ARG_TYPE(name2, "undefined", value);
      });
      function validateUnion(value, name2, union) {
        if (!ArrayPrototypeIncludes(union, value)) {
          throw new ERR_INVALID_ARG_TYPE(name2, `('${ArrayPrototypeJoin(union, "|")}')`, value);
        }
      }
      var linkValueRegExp = /^(?:<[^>]*>)(?:\s*;\s*[^;"\s]+(?:=(")?[^;"\s]*\1)?)*$/;
      function validateLinkHeaderFormat(value, name2) {
        if (typeof value === "undefined" || !RegExpPrototypeExec(linkValueRegExp, value)) {
          throw new ERR_INVALID_ARG_VALUE(
            name2,
            value,
            'must be an array or string of format "</styles.css>; rel=preload; as=style"'
          );
        }
      }
      function validateLinkHeaderValue(hints) {
        if (typeof hints === "string") {
          validateLinkHeaderFormat(hints, "hints");
          return hints;
        } else if (ArrayIsArray(hints)) {
          const hintsLength = hints.length;
          let result = "";
          if (hintsLength === 0) {
            return result;
          }
          for (let i = 0; i < hintsLength; i++) {
            const link = hints[i];
            validateLinkHeaderFormat(link, "hints");
            result += link;
            if (i !== hintsLength - 1) {
              result += ", ";
            }
          }
          return result;
        }
        throw new ERR_INVALID_ARG_VALUE(
          "hints",
          hints,
          'must be an array or string of format "</styles.css>; rel=preload; as=style"'
        );
      }
      module.exports = {
        isInt32,
        isUint32,
        parseFileMode,
        validateArray,
        validateStringArray,
        validateBooleanArray,
        validateAbortSignalArray,
        validateBoolean,
        validateBuffer,
        validateDictionary,
        validateEncoding,
        validateFunction,
        validateInt32,
        validateInteger,
        validateNumber,
        validateObject,
        validateOneOf,
        validatePlainFunction,
        validatePort,
        validateSignalName,
        validateString,
        validateUint32,
        validateUndefined,
        validateUnion,
        validateAbortSignal,
        validateLinkHeaderValue
      };
    }
  });

  // node_modules/process/browser.js
  var require_browser2 = __commonJS({
    "node_modules/process/browser.js"(exports8, module) {
      init_dirname();
      init_buffer2();
      init_process2();
      var process3 = module.exports = {};
      var cachedSetTimeout;
      var cachedClearTimeout;
      function defaultSetTimout() {
        throw new Error("setTimeout has not been defined");
      }
      function defaultClearTimeout() {
        throw new Error("clearTimeout has not been defined");
      }
      (function() {
        try {
          if (typeof setTimeout === "function") {
            cachedSetTimeout = setTimeout;
          } else {
            cachedSetTimeout = defaultSetTimout;
          }
        } catch (e) {
          cachedSetTimeout = defaultSetTimout;
        }
        try {
          if (typeof clearTimeout === "function") {
            cachedClearTimeout = clearTimeout;
          } else {
            cachedClearTimeout = defaultClearTimeout;
          }
        } catch (e) {
          cachedClearTimeout = defaultClearTimeout;
        }
      })();
      function runTimeout(fun) {
        if (cachedSetTimeout === setTimeout) {
          return setTimeout(fun, 0);
        }
        if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
          cachedSetTimeout = setTimeout;
          return setTimeout(fun, 0);
        }
        try {
          return cachedSetTimeout(fun, 0);
        } catch (e) {
          try {
            return cachedSetTimeout.call(null, fun, 0);
          } catch (e2) {
            return cachedSetTimeout.call(this, fun, 0);
          }
        }
      }
      function runClearTimeout(marker) {
        if (cachedClearTimeout === clearTimeout) {
          return clearTimeout(marker);
        }
        if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
          cachedClearTimeout = clearTimeout;
          return clearTimeout(marker);
        }
        try {
          return cachedClearTimeout(marker);
        } catch (e) {
          try {
            return cachedClearTimeout.call(null, marker);
          } catch (e2) {
            return cachedClearTimeout.call(this, marker);
          }
        }
      }
      var queue3 = [];
      var draining3 = false;
      var currentQueue3;
      var queueIndex3 = -1;
      function cleanUpNextTick3() {
        if (!draining3 || !currentQueue3) {
          return;
        }
        draining3 = false;
        if (currentQueue3.length) {
          queue3 = currentQueue3.concat(queue3);
        } else {
          queueIndex3 = -1;
        }
        if (queue3.length) {
          drainQueue3();
        }
      }
      function drainQueue3() {
        if (draining3) {
          return;
        }
        var timeout = runTimeout(cleanUpNextTick3);
        draining3 = true;
        var len = queue3.length;
        while (len) {
          currentQueue3 = queue3;
          queue3 = [];
          while (++queueIndex3 < len) {
            if (currentQueue3) {
              currentQueue3[queueIndex3].run();
            }
          }
          queueIndex3 = -1;
          len = queue3.length;
        }
        currentQueue3 = null;
        draining3 = false;
        runClearTimeout(timeout);
      }
      process3.nextTick = function(fun) {
        var args = new Array(arguments.length - 1);
        if (arguments.length > 1) {
          for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
          }
        }
        queue3.push(new Item3(fun, args));
        if (queue3.length === 1 && !draining3) {
          runTimeout(drainQueue3);
        }
      };
      function Item3(fun, array) {
        this.fun = fun;
        this.array = array;
      }
      Item3.prototype.run = function() {
        this.fun.apply(null, this.array);
      };
      process3.title = "browser";
      process3.browser = true;
      process3.env = {};
      process3.argv = [];
      process3.version = "";
      process3.versions = {};
      function noop3() {
      }
      process3.on = noop3;
      process3.addListener = noop3;
      process3.once = noop3;
      process3.off = noop3;
      process3.removeListener = noop3;
      process3.removeAllListeners = noop3;
      process3.emit = noop3;
      process3.prependListener = noop3;
      process3.prependOnceListener = noop3;
      process3.listeners = function(name2) {
        return [];
      };
      process3.binding = function(name2) {
        throw new Error("process.binding is not supported");
      };
      process3.cwd = function() {
        return "/";
      };
      process3.chdir = function(dir) {
        throw new Error("process.chdir is not supported");
      };
      process3.umask = function() {
        return 0;
      };
    }
  });

  // node_modules/readable-stream/lib/internal/streams/utils.js
  var require_utils = __commonJS({
    "node_modules/readable-stream/lib/internal/streams/utils.js"(exports8, module) {
      "use strict";
      init_dirname();
      init_buffer2();
      init_process2();
      var { SymbolAsyncIterator, SymbolIterator, SymbolFor } = require_primordials();
      var kIsDestroyed = SymbolFor("nodejs.stream.destroyed");
      var kIsErrored = SymbolFor("nodejs.stream.errored");
      var kIsReadable = SymbolFor("nodejs.stream.readable");
      var kIsWritable = SymbolFor("nodejs.stream.writable");
      var kIsDisturbed = SymbolFor("nodejs.stream.disturbed");
      var kIsClosedPromise = SymbolFor("nodejs.webstream.isClosedPromise");
      var kControllerErrorFunction = SymbolFor("nodejs.webstream.controllerErrorFunction");
      function isReadableNodeStream(obj, strict = false) {
        var _obj$_readableState;
        return !!(obj && typeof obj.pipe === "function" && typeof obj.on === "function" && (!strict || typeof obj.pause === "function" && typeof obj.resume === "function") && (!obj._writableState || ((_obj$_readableState = obj._readableState) === null || _obj$_readableState === void 0 ? void 0 : _obj$_readableState.readable) !== false) && // Duplex
        (!obj._writableState || obj._readableState));
      }
      function isWritableNodeStream(obj) {
        var _obj$_writableState;
        return !!(obj && typeof obj.write === "function" && typeof obj.on === "function" && (!obj._readableState || ((_obj$_writableState = obj._writableState) === null || _obj$_writableState === void 0 ? void 0 : _obj$_writableState.writable) !== false));
      }
      function isDuplexNodeStream(obj) {
        return !!(obj && typeof obj.pipe === "function" && obj._readableState && typeof obj.on === "function" && typeof obj.write === "function");
      }
      function isNodeStream(obj) {
        return obj && (obj._readableState || obj._writableState || typeof obj.write === "function" && typeof obj.on === "function" || typeof obj.pipe === "function" && typeof obj.on === "function");
      }
      function isReadableStream(obj) {
        return !!(obj && !isNodeStream(obj) && typeof obj.pipeThrough === "function" && typeof obj.getReader === "function" && typeof obj.cancel === "function");
      }
      function isWritableStream(obj) {
        return !!(obj && !isNodeStream(obj) && typeof obj.getWriter === "function" && typeof obj.abort === "function");
      }
      function isTransformStream(obj) {
        return !!(obj && !isNodeStream(obj) && typeof obj.readable === "object" && typeof obj.writable === "object");
      }
      function isWebStream(obj) {
        return isReadableStream(obj) || isWritableStream(obj) || isTransformStream(obj);
      }
      function isIterable(obj, isAsync) {
        if (obj == null) return false;
        if (isAsync === true) return typeof obj[SymbolAsyncIterator] === "function";
        if (isAsync === false) return typeof obj[SymbolIterator] === "function";
        return typeof obj[SymbolAsyncIterator] === "function" || typeof obj[SymbolIterator] === "function";
      }
      function isDestroyed(stream) {
        if (!isNodeStream(stream)) return null;
        const wState = stream._writableState;
        const rState = stream._readableState;
        const state = wState || rState;
        return !!(stream.destroyed || stream[kIsDestroyed] || state !== null && state !== void 0 && state.destroyed);
      }
      function isWritableEnded(stream) {
        if (!isWritableNodeStream(stream)) return null;
        if (stream.writableEnded === true) return true;
        const wState = stream._writableState;
        if (wState !== null && wState !== void 0 && wState.errored) return false;
        if (typeof (wState === null || wState === void 0 ? void 0 : wState.ended) !== "boolean") return null;
        return wState.ended;
      }
      function isWritableFinished(stream, strict) {
        if (!isWritableNodeStream(stream)) return null;
        if (stream.writableFinished === true) return true;
        const wState = stream._writableState;
        if (wState !== null && wState !== void 0 && wState.errored) return false;
        if (typeof (wState === null || wState === void 0 ? void 0 : wState.finished) !== "boolean") return null;
        return !!(wState.finished || strict === false && wState.ended === true && wState.length === 0);
      }
      function isReadableEnded(stream) {
        if (!isReadableNodeStream(stream)) return null;
        if (stream.readableEnded === true) return true;
        const rState = stream._readableState;
        if (!rState || rState.errored) return false;
        if (typeof (rState === null || rState === void 0 ? void 0 : rState.ended) !== "boolean") return null;
        return rState.ended;
      }
      function isReadableFinished(stream, strict) {
        if (!isReadableNodeStream(stream)) return null;
        const rState = stream._readableState;
        if (rState !== null && rState !== void 0 && rState.errored) return false;
        if (typeof (rState === null || rState === void 0 ? void 0 : rState.endEmitted) !== "boolean") return null;
        return !!(rState.endEmitted || strict === false && rState.ended === true && rState.length === 0);
      }
      function isReadable(stream) {
        if (stream && stream[kIsReadable] != null) return stream[kIsReadable];
        if (typeof (stream === null || stream === void 0 ? void 0 : stream.readable) !== "boolean") return null;
        if (isDestroyed(stream)) return false;
        return isReadableNodeStream(stream) && stream.readable && !isReadableFinished(stream);
      }
      function isWritable(stream) {
        if (stream && stream[kIsWritable] != null) return stream[kIsWritable];
        if (typeof (stream === null || stream === void 0 ? void 0 : stream.writable) !== "boolean") return null;
        if (isDestroyed(stream)) return false;
        return isWritableNodeStream(stream) && stream.writable && !isWritableEnded(stream);
      }
      function isFinished(stream, opts) {
        if (!isNodeStream(stream)) {
          return null;
        }
        if (isDestroyed(stream)) {
          return true;
        }
        if ((opts === null || opts === void 0 ? void 0 : opts.readable) !== false && isReadable(stream)) {
          return false;
        }
        if ((opts === null || opts === void 0 ? void 0 : opts.writable) !== false && isWritable(stream)) {
          return false;
        }
        return true;
      }
      function isWritableErrored(stream) {
        var _stream$_writableStat, _stream$_writableStat2;
        if (!isNodeStream(stream)) {
          return null;
        }
        if (stream.writableErrored) {
          return stream.writableErrored;
        }
        return (_stream$_writableStat = (_stream$_writableStat2 = stream._writableState) === null || _stream$_writableStat2 === void 0 ? void 0 : _stream$_writableStat2.errored) !== null && _stream$_writableStat !== void 0 ? _stream$_writableStat : null;
      }
      function isReadableErrored(stream) {
        var _stream$_readableStat, _stream$_readableStat2;
        if (!isNodeStream(stream)) {
          return null;
        }
        if (stream.readableErrored) {
          return stream.readableErrored;
        }
        return (_stream$_readableStat = (_stream$_readableStat2 = stream._readableState) === null || _stream$_readableStat2 === void 0 ? void 0 : _stream$_readableStat2.errored) !== null && _stream$_readableStat !== void 0 ? _stream$_readableStat : null;
      }
      function isClosed(stream) {
        if (!isNodeStream(stream)) {
          return null;
        }
        if (typeof stream.closed === "boolean") {
          return stream.closed;
        }
        const wState = stream._writableState;
        const rState = stream._readableState;
        if (typeof (wState === null || wState === void 0 ? void 0 : wState.closed) === "boolean" || typeof (rState === null || rState === void 0 ? void 0 : rState.closed) === "boolean") {
          return (wState === null || wState === void 0 ? void 0 : wState.closed) || (rState === null || rState === void 0 ? void 0 : rState.closed);
        }
        if (typeof stream._closed === "boolean" && isOutgoingMessage(stream)) {
          return stream._closed;
        }
        return null;
      }
      function isOutgoingMessage(stream) {
        return typeof stream._closed === "boolean" && typeof stream._defaultKeepAlive === "boolean" && typeof stream._removedConnection === "boolean" && typeof stream._removedContLen === "boolean";
      }
      function isServerResponse(stream) {
        return typeof stream._sent100 === "boolean" && isOutgoingMessage(stream);
      }
      function isServerRequest(stream) {
        var _stream$req;
        return typeof stream._consuming === "boolean" && typeof stream._dumped === "boolean" && ((_stream$req = stream.req) === null || _stream$req === void 0 ? void 0 : _stream$req.upgradeOrConnect) === void 0;
      }
      function willEmitClose(stream) {
        if (!isNodeStream(stream)) return null;
        const wState = stream._writableState;
        const rState = stream._readableState;
        const state = wState || rState;
        return !state && isServerResponse(stream) || !!(state && state.autoDestroy && state.emitClose && state.closed === false);
      }
      function isDisturbed(stream) {
        var _stream$kIsDisturbed;
        return !!(stream && ((_stream$kIsDisturbed = stream[kIsDisturbed]) !== null && _stream$kIsDisturbed !== void 0 ? _stream$kIsDisturbed : stream.readableDidRead || stream.readableAborted));
      }
      function isErrored(stream) {
        var _ref, _ref2, _ref3, _ref4, _ref5, _stream$kIsErrored, _stream$_readableStat3, _stream$_writableStat3, _stream$_readableStat4, _stream$_writableStat4;
        return !!(stream && ((_ref = (_ref2 = (_ref3 = (_ref4 = (_ref5 = (_stream$kIsErrored = stream[kIsErrored]) !== null && _stream$kIsErrored !== void 0 ? _stream$kIsErrored : stream.readableErrored) !== null && _ref5 !== void 0 ? _ref5 : stream.writableErrored) !== null && _ref4 !== void 0 ? _ref4 : (_stream$_readableStat3 = stream._readableState) === null || _stream$_readableStat3 === void 0 ? void 0 : _stream$_readableStat3.errorEmitted) !== null && _ref3 !== void 0 ? _ref3 : (_stream$_writableStat3 = stream._writableState) === null || _stream$_writableStat3 === void 0 ? void 0 : _stream$_writableStat3.errorEmitted) !== null && _ref2 !== void 0 ? _ref2 : (_stream$_readableStat4 = stream._readableState) === null || _stream$_readableStat4 === void 0 ? void 0 : _stream$_readableStat4.errored) !== null && _ref !== void 0 ? _ref : (_stream$_writableStat4 = stream._writableState) === null || _stream$_writableStat4 === void 0 ? void 0 : _stream$_writableStat4.errored));
      }
      module.exports = {
        isDestroyed,
        kIsDestroyed,
        isDisturbed,
        kIsDisturbed,
        isErrored,
        kIsErrored,
        isReadable,
        kIsReadable,
        kIsClosedPromise,
        kControllerErrorFunction,
        kIsWritable,
        isClosed,
        isDuplexNodeStream,
        isFinished,
        isIterable,
        isReadableNodeStream,
        isReadableStream,
        isReadableEnded,
        isReadableFinished,
        isReadableErrored,
        isNodeStream,
        isWebStream,
        isWritable,
        isWritableNodeStream,
        isWritableStream,
        isWritableEnded,
        isWritableFinished,
        isWritableErrored,
        isServerRequest,
        isServerResponse,
        willEmitClose,
        isTransformStream
      };
    }
  });

  // node_modules/readable-stream/lib/internal/streams/end-of-stream.js
  var require_end_of_stream = __commonJS({
    "node_modules/readable-stream/lib/internal/streams/end-of-stream.js"(exports8, module) {
      "use strict";
      init_dirname();
      init_buffer2();
      init_process2();
      var process3 = require_browser2();
      var { AbortError, codes } = require_errors();
      var { ERR_INVALID_ARG_TYPE, ERR_STREAM_PREMATURE_CLOSE } = codes;
      var { kEmptyObject, once: once4 } = require_util();
      var { validateAbortSignal, validateFunction, validateObject, validateBoolean } = require_validators();
      var { Promise: Promise2, PromisePrototypeThen, SymbolDispose } = require_primordials();
      var {
        isClosed,
        isReadable,
        isReadableNodeStream,
        isReadableStream,
        isReadableFinished,
        isReadableErrored,
        isWritable,
        isWritableNodeStream,
        isWritableStream,
        isWritableFinished,
        isWritableErrored,
        isNodeStream,
        willEmitClose: _willEmitClose,
        kIsClosedPromise
      } = require_utils();
      var addAbortListener;
      function isRequest(stream) {
        return stream.setHeader && typeof stream.abort === "function";
      }
      var nop = () => {
      };
      function eos(stream, options, callback) {
        var _options$readable, _options$writable;
        if (arguments.length === 2) {
          callback = options;
          options = kEmptyObject;
        } else if (options == null) {
          options = kEmptyObject;
        } else {
          validateObject(options, "options");
        }
        validateFunction(callback, "callback");
        validateAbortSignal(options.signal, "options.signal");
        callback = once4(callback);
        if (isReadableStream(stream) || isWritableStream(stream)) {
          return eosWeb(stream, options, callback);
        }
        if (!isNodeStream(stream)) {
          throw new ERR_INVALID_ARG_TYPE("stream", ["ReadableStream", "WritableStream", "Stream"], stream);
        }
        const readable = (_options$readable = options.readable) !== null && _options$readable !== void 0 ? _options$readable : isReadableNodeStream(stream);
        const writable = (_options$writable = options.writable) !== null && _options$writable !== void 0 ? _options$writable : isWritableNodeStream(stream);
        const wState = stream._writableState;
        const rState = stream._readableState;
        const onlegacyfinish = () => {
          if (!stream.writable) {
            onfinish();
          }
        };
        let willEmitClose = _willEmitClose(stream) && isReadableNodeStream(stream) === readable && isWritableNodeStream(stream) === writable;
        let writableFinished = isWritableFinished(stream, false);
        const onfinish = () => {
          writableFinished = true;
          if (stream.destroyed) {
            willEmitClose = false;
          }
          if (willEmitClose && (!stream.readable || readable)) {
            return;
          }
          if (!readable || readableFinished) {
            callback.call(stream);
          }
        };
        let readableFinished = isReadableFinished(stream, false);
        const onend = () => {
          readableFinished = true;
          if (stream.destroyed) {
            willEmitClose = false;
          }
          if (willEmitClose && (!stream.writable || writable)) {
            return;
          }
          if (!writable || writableFinished) {
            callback.call(stream);
          }
        };
        const onerror = (err) => {
          callback.call(stream, err);
        };
        let closed = isClosed(stream);
        const onclose = () => {
          closed = true;
          const errored = isWritableErrored(stream) || isReadableErrored(stream);
          if (errored && typeof errored !== "boolean") {
            return callback.call(stream, errored);
          }
          if (readable && !readableFinished && isReadableNodeStream(stream, true)) {
            if (!isReadableFinished(stream, false)) return callback.call(stream, new ERR_STREAM_PREMATURE_CLOSE());
          }
          if (writable && !writableFinished) {
            if (!isWritableFinished(stream, false)) return callback.call(stream, new ERR_STREAM_PREMATURE_CLOSE());
          }
          callback.call(stream);
        };
        const onclosed = () => {
          closed = true;
          const errored = isWritableErrored(stream) || isReadableErrored(stream);
          if (errored && typeof errored !== "boolean") {
            return callback.call(stream, errored);
          }
          callback.call(stream);
        };
        const onrequest = () => {
          stream.req.on("finish", onfinish);
        };
        if (isRequest(stream)) {
          stream.on("complete", onfinish);
          if (!willEmitClose) {
            stream.on("abort", onclose);
          }
          if (stream.req) {
            onrequest();
          } else {
            stream.on("request", onrequest);
          }
        } else if (writable && !wState) {
          stream.on("end", onlegacyfinish);
          stream.on("close", onlegacyfinish);
        }
        if (!willEmitClose && typeof stream.aborted === "boolean") {
          stream.on("aborted", onclose);
        }
        stream.on("end", onend);
        stream.on("finish", onfinish);
        if (options.error !== false) {
          stream.on("error", onerror);
        }
        stream.on("close", onclose);
        if (closed) {
          process3.nextTick(onclose);
        } else if (wState !== null && wState !== void 0 && wState.errorEmitted || rState !== null && rState !== void 0 && rState.errorEmitted) {
          if (!willEmitClose) {
            process3.nextTick(onclosed);
          }
        } else if (!readable && (!willEmitClose || isReadable(stream)) && (writableFinished || isWritable(stream) === false)) {
          process3.nextTick(onclosed);
        } else if (!writable && (!willEmitClose || isWritable(stream)) && (readableFinished || isReadable(stream) === false)) {
          process3.nextTick(onclosed);
        } else if (rState && stream.req && stream.aborted) {
          process3.nextTick(onclosed);
        }
        const cleanup = () => {
          callback = nop;
          stream.removeListener("aborted", onclose);
          stream.removeListener("complete", onfinish);
          stream.removeListener("abort", onclose);
          stream.removeListener("request", onrequest);
          if (stream.req) stream.req.removeListener("finish", onfinish);
          stream.removeListener("end", onlegacyfinish);
          stream.removeListener("close", onlegacyfinish);
          stream.removeListener("finish", onfinish);
          stream.removeListener("end", onend);
          stream.removeListener("error", onerror);
          stream.removeListener("close", onclose);
        };
        if (options.signal && !closed) {
          const abort3 = () => {
            const endCallback = callback;
            cleanup();
            endCallback.call(
              stream,
              new AbortError(void 0, {
                cause: options.signal.reason
              })
            );
          };
          if (options.signal.aborted) {
            process3.nextTick(abort3);
          } else {
            addAbortListener = addAbortListener || require_util().addAbortListener;
            const disposable = addAbortListener(options.signal, abort3);
            const originalCallback = callback;
            callback = once4((...args) => {
              disposable[SymbolDispose]();
              originalCallback.apply(stream, args);
            });
          }
        }
        return cleanup;
      }
      function eosWeb(stream, options, callback) {
        let isAborted = false;
        let abort3 = nop;
        if (options.signal) {
          abort3 = () => {
            isAborted = true;
            callback.call(
              stream,
              new AbortError(void 0, {
                cause: options.signal.reason
              })
            );
          };
          if (options.signal.aborted) {
            process3.nextTick(abort3);
          } else {
            addAbortListener = addAbortListener || require_util().addAbortListener;
            const disposable = addAbortListener(options.signal, abort3);
            const originalCallback = callback;
            callback = once4((...args) => {
              disposable[SymbolDispose]();
              originalCallback.apply(stream, args);
            });
          }
        }
        const resolverFn = (...args) => {
          if (!isAborted) {
            process3.nextTick(() => callback.apply(stream, args));
          }
        };
        PromisePrototypeThen(stream[kIsClosedPromise].promise, resolverFn, resolverFn);
        return nop;
      }
      function finished(stream, opts) {
        var _opts;
        let autoCleanup = false;
        if (opts === null) {
          opts = kEmptyObject;
        }
        if ((_opts = opts) !== null && _opts !== void 0 && _opts.cleanup) {
          validateBoolean(opts.cleanup, "cleanup");
          autoCleanup = opts.cleanup;
        }
        return new Promise2((resolve2, reject) => {
          const cleanup = eos(stream, opts, (err) => {
            if (autoCleanup) {
              cleanup();
            }
            if (err) {
              reject(err);
            } else {
              resolve2();
            }
          });
        });
      }
      module.exports = eos;
      module.exports.finished = finished;
    }
  });

  // node_modules/readable-stream/lib/internal/streams/destroy.js
  var require_destroy = __commonJS({
    "node_modules/readable-stream/lib/internal/streams/destroy.js"(exports8, module) {
      "use strict";
      init_dirname();
      init_buffer2();
      init_process2();
      var process3 = require_browser2();
      var {
        aggregateTwoErrors,
        codes: { ERR_MULTIPLE_CALLBACK },
        AbortError
      } = require_errors();
      var { Symbol: Symbol2 } = require_primordials();
      var { kIsDestroyed, isDestroyed, isFinished, isServerRequest } = require_utils();
      var kDestroy = Symbol2("kDestroy");
      var kConstruct = Symbol2("kConstruct");
      function checkError(err, w, r) {
        if (err) {
          err.stack;
          if (w && !w.errored) {
            w.errored = err;
          }
          if (r && !r.errored) {
            r.errored = err;
          }
        }
      }
      function destroy(err, cb) {
        const r = this._readableState;
        const w = this._writableState;
        const s = w || r;
        if (w !== null && w !== void 0 && w.destroyed || r !== null && r !== void 0 && r.destroyed) {
          if (typeof cb === "function") {
            cb();
          }
          return this;
        }
        checkError(err, w, r);
        if (w) {
          w.destroyed = true;
        }
        if (r) {
          r.destroyed = true;
        }
        if (!s.constructed) {
          this.once(kDestroy, function(er) {
            _destroy(this, aggregateTwoErrors(er, err), cb);
          });
        } else {
          _destroy(this, err, cb);
        }
        return this;
      }
      function _destroy(self2, err, cb) {
        let called = false;
        function onDestroy(err2) {
          if (called) {
            return;
          }
          called = true;
          const r = self2._readableState;
          const w = self2._writableState;
          checkError(err2, w, r);
          if (w) {
            w.closed = true;
          }
          if (r) {
            r.closed = true;
          }
          if (typeof cb === "function") {
            cb(err2);
          }
          if (err2) {
            process3.nextTick(emitErrorCloseNT, self2, err2);
          } else {
            process3.nextTick(emitCloseNT, self2);
          }
        }
        try {
          self2._destroy(err || null, onDestroy);
        } catch (err2) {
          onDestroy(err2);
        }
      }
      function emitErrorCloseNT(self2, err) {
        emitErrorNT(self2, err);
        emitCloseNT(self2);
      }
      function emitCloseNT(self2) {
        const r = self2._readableState;
        const w = self2._writableState;
        if (w) {
          w.closeEmitted = true;
        }
        if (r) {
          r.closeEmitted = true;
        }
        if (w !== null && w !== void 0 && w.emitClose || r !== null && r !== void 0 && r.emitClose) {
          self2.emit("close");
        }
      }
      function emitErrorNT(self2, err) {
        const r = self2._readableState;
        const w = self2._writableState;
        if (w !== null && w !== void 0 && w.errorEmitted || r !== null && r !== void 0 && r.errorEmitted) {
          return;
        }
        if (w) {
          w.errorEmitted = true;
        }
        if (r) {
          r.errorEmitted = true;
        }
        self2.emit("error", err);
      }
      function undestroy() {
        const r = this._readableState;
        const w = this._writableState;
        if (r) {
          r.constructed = true;
          r.closed = false;
          r.closeEmitted = false;
          r.destroyed = false;
          r.errored = null;
          r.errorEmitted = false;
          r.reading = false;
          r.ended = r.readable === false;
          r.endEmitted = r.readable === false;
        }
        if (w) {
          w.constructed = true;
          w.destroyed = false;
          w.closed = false;
          w.closeEmitted = false;
          w.errored = null;
          w.errorEmitted = false;
          w.finalCalled = false;
          w.prefinished = false;
          w.ended = w.writable === false;
          w.ending = w.writable === false;
          w.finished = w.writable === false;
        }
      }
      function errorOrDestroy(stream, err, sync) {
        const r = stream._readableState;
        const w = stream._writableState;
        if (w !== null && w !== void 0 && w.destroyed || r !== null && r !== void 0 && r.destroyed) {
          return this;
        }
        if (r !== null && r !== void 0 && r.autoDestroy || w !== null && w !== void 0 && w.autoDestroy)
          stream.destroy(err);
        else if (err) {
          err.stack;
          if (w && !w.errored) {
            w.errored = err;
          }
          if (r && !r.errored) {
            r.errored = err;
          }
          if (sync) {
            process3.nextTick(emitErrorNT, stream, err);
          } else {
            emitErrorNT(stream, err);
          }
        }
      }
      function construct(stream, cb) {
        if (typeof stream._construct !== "function") {
          return;
        }
        const r = stream._readableState;
        const w = stream._writableState;
        if (r) {
          r.constructed = false;
        }
        if (w) {
          w.constructed = false;
        }
        stream.once(kConstruct, cb);
        if (stream.listenerCount(kConstruct) > 1) {
          return;
        }
        process3.nextTick(constructNT, stream);
      }
      function constructNT(stream) {
        let called = false;
        function onConstruct(err) {
          if (called) {
            errorOrDestroy(stream, err !== null && err !== void 0 ? err : new ERR_MULTIPLE_CALLBACK());
            return;
          }
          called = true;
          const r = stream._readableState;
          const w = stream._writableState;
          const s = w || r;
          if (r) {
            r.constructed = true;
          }
          if (w) {
            w.constructed = true;
          }
          if (s.destroyed) {
            stream.emit(kDestroy, err);
          } else if (err) {
            errorOrDestroy(stream, err, true);
          } else {
            process3.nextTick(emitConstructNT, stream);
          }
        }
        try {
          stream._construct((err) => {
            process3.nextTick(onConstruct, err);
          });
        } catch (err) {
          process3.nextTick(onConstruct, err);
        }
      }
      function emitConstructNT(stream) {
        stream.emit(kConstruct);
      }
      function isRequest(stream) {
        return (stream === null || stream === void 0 ? void 0 : stream.setHeader) && typeof stream.abort === "function";
      }
      function emitCloseLegacy(stream) {
        stream.emit("close");
      }
      function emitErrorCloseLegacy(stream, err) {
        stream.emit("error", err);
        process3.nextTick(emitCloseLegacy, stream);
      }
      function destroyer(stream, err) {
        if (!stream || isDestroyed(stream)) {
          return;
        }
        if (!err && !isFinished(stream)) {
          err = new AbortError();
        }
        if (isServerRequest(stream)) {
          stream.socket = null;
          stream.destroy(err);
        } else if (isRequest(stream)) {
          stream.abort();
        } else if (isRequest(stream.req)) {
          stream.req.abort();
        } else if (typeof stream.destroy === "function") {
          stream.destroy(err);
        } else if (typeof stream.close === "function") {
          stream.close();
        } else if (err) {
          process3.nextTick(emitErrorCloseLegacy, stream, err);
        } else {
          process3.nextTick(emitCloseLegacy, stream);
        }
        if (!stream.destroyed) {
          stream[kIsDestroyed] = true;
        }
      }
      module.exports = {
        construct,
        destroyer,
        destroy,
        undestroy,
        errorOrDestroy
      };
    }
  });

  // node_modules/readable-stream/lib/internal/streams/legacy.js
  var require_legacy = __commonJS({
    "node_modules/readable-stream/lib/internal/streams/legacy.js"(exports8, module) {
      "use strict";
      init_dirname();
      init_buffer2();
      init_process2();
      var { ArrayIsArray, ObjectSetPrototypeOf } = require_primordials();
      var { EventEmitter: EE } = (init_events(), __toCommonJS(events_exports));
      function Stream(opts) {
        EE.call(this, opts);
      }
      ObjectSetPrototypeOf(Stream.prototype, EE.prototype);
      ObjectSetPrototypeOf(Stream, EE);
      Stream.prototype.pipe = function(dest, options) {
        const source = this;
        function ondata(chunk) {
          if (dest.writable && dest.write(chunk) === false && source.pause) {
            source.pause();
          }
        }
        source.on("data", ondata);
        function ondrain() {
          if (source.readable && source.resume) {
            source.resume();
          }
        }
        dest.on("drain", ondrain);
        if (!dest._isStdio && (!options || options.end !== false)) {
          source.on("end", onend);
          source.on("close", onclose);
        }
        let didOnEnd = false;
        function onend() {
          if (didOnEnd) return;
          didOnEnd = true;
          dest.end();
        }
        function onclose() {
          if (didOnEnd) return;
          didOnEnd = true;
          if (typeof dest.destroy === "function") dest.destroy();
        }
        function onerror(er) {
          cleanup();
          if (EE.listenerCount(this, "error") === 0) {
            this.emit("error", er);
          }
        }
        prependListener3(source, "error", onerror);
        prependListener3(dest, "error", onerror);
        function cleanup() {
          source.removeListener("data", ondata);
          dest.removeListener("drain", ondrain);
          source.removeListener("end", onend);
          source.removeListener("close", onclose);
          source.removeListener("error", onerror);
          dest.removeListener("error", onerror);
          source.removeListener("end", cleanup);
          source.removeListener("close", cleanup);
          dest.removeListener("close", cleanup);
        }
        source.on("end", cleanup);
        source.on("close", cleanup);
        dest.on("close", cleanup);
        dest.emit("pipe", source);
        return dest;
      };
      function prependListener3(emitter, event, fn) {
        if (typeof emitter.prependListener === "function") return emitter.prependListener(event, fn);
        if (!emitter._events || !emitter._events[event]) emitter.on(event, fn);
        else if (ArrayIsArray(emitter._events[event])) emitter._events[event].unshift(fn);
        else emitter._events[event] = [fn, emitter._events[event]];
      }
      module.exports = {
        Stream,
        prependListener: prependListener3
      };
    }
  });

  // node_modules/readable-stream/lib/internal/streams/add-abort-signal.js
  var require_add_abort_signal = __commonJS({
    "node_modules/readable-stream/lib/internal/streams/add-abort-signal.js"(exports8, module) {
      "use strict";
      init_dirname();
      init_buffer2();
      init_process2();
      var { SymbolDispose } = require_primordials();
      var { AbortError, codes } = require_errors();
      var { isNodeStream, isWebStream, kControllerErrorFunction } = require_utils();
      var eos = require_end_of_stream();
      var { ERR_INVALID_ARG_TYPE } = codes;
      var addAbortListener;
      var validateAbortSignal = (signal, name2) => {
        if (typeof signal !== "object" || !("aborted" in signal)) {
          throw new ERR_INVALID_ARG_TYPE(name2, "AbortSignal", signal);
        }
      };
      module.exports.addAbortSignal = function addAbortSignal(signal, stream) {
        validateAbortSignal(signal, "signal");
        if (!isNodeStream(stream) && !isWebStream(stream)) {
          throw new ERR_INVALID_ARG_TYPE("stream", ["ReadableStream", "WritableStream", "Stream"], stream);
        }
        return module.exports.addAbortSignalNoValidate(signal, stream);
      };
      module.exports.addAbortSignalNoValidate = function(signal, stream) {
        if (typeof signal !== "object" || !("aborted" in signal)) {
          return stream;
        }
        const onAbort = isNodeStream(stream) ? () => {
          stream.destroy(
            new AbortError(void 0, {
              cause: signal.reason
            })
          );
        } : () => {
          stream[kControllerErrorFunction](
            new AbortError(void 0, {
              cause: signal.reason
            })
          );
        };
        if (signal.aborted) {
          onAbort();
        } else {
          addAbortListener = addAbortListener || require_util().addAbortListener;
          const disposable = addAbortListener(signal, onAbort);
          eos(stream, disposable[SymbolDispose]);
        }
        return stream;
      };
    }
  });

  // node_modules/readable-stream/lib/internal/streams/buffer_list.js
  var require_buffer_list = __commonJS({
    "node_modules/readable-stream/lib/internal/streams/buffer_list.js"(exports8, module) {
      "use strict";
      init_dirname();
      init_buffer2();
      init_process2();
      var { StringPrototypeSlice, SymbolIterator, TypedArrayPrototypeSet, Uint8Array: Uint8Array2 } = require_primordials();
      var { Buffer: Buffer3 } = (init_buffer(), __toCommonJS(buffer_exports));
      var { inspect } = require_util();
      module.exports = class BufferList {
        constructor() {
          this.head = null;
          this.tail = null;
          this.length = 0;
        }
        push(v) {
          const entry = {
            data: v,
            next: null
          };
          if (this.length > 0) this.tail.next = entry;
          else this.head = entry;
          this.tail = entry;
          ++this.length;
        }
        unshift(v) {
          const entry = {
            data: v,
            next: this.head
          };
          if (this.length === 0) this.tail = entry;
          this.head = entry;
          ++this.length;
        }
        shift() {
          if (this.length === 0) return;
          const ret = this.head.data;
          if (this.length === 1) this.head = this.tail = null;
          else this.head = this.head.next;
          --this.length;
          return ret;
        }
        clear() {
          this.head = this.tail = null;
          this.length = 0;
        }
        join(s) {
          if (this.length === 0) return "";
          let p = this.head;
          let ret = "" + p.data;
          while ((p = p.next) !== null) ret += s + p.data;
          return ret;
        }
        concat(n) {
          if (this.length === 0) return Buffer3.alloc(0);
          const ret = Buffer3.allocUnsafe(n >>> 0);
          let p = this.head;
          let i = 0;
          while (p) {
            TypedArrayPrototypeSet(ret, p.data, i);
            i += p.data.length;
            p = p.next;
          }
          return ret;
        }
        // Consumes a specified amount of bytes or characters from the buffered data.
        consume(n, hasStrings) {
          const data = this.head.data;
          if (n < data.length) {
            const slice = data.slice(0, n);
            this.head.data = data.slice(n);
            return slice;
          }
          if (n === data.length) {
            return this.shift();
          }
          return hasStrings ? this._getString(n) : this._getBuffer(n);
        }
        first() {
          return this.head.data;
        }
        *[SymbolIterator]() {
          for (let p = this.head; p; p = p.next) {
            yield p.data;
          }
        }
        // Consumes a specified amount of characters from the buffered data.
        _getString(n) {
          let ret = "";
          let p = this.head;
          let c = 0;
          do {
            const str = p.data;
            if (n > str.length) {
              ret += str;
              n -= str.length;
            } else {
              if (n === str.length) {
                ret += str;
                ++c;
                if (p.next) this.head = p.next;
                else this.head = this.tail = null;
              } else {
                ret += StringPrototypeSlice(str, 0, n);
                this.head = p;
                p.data = StringPrototypeSlice(str, n);
              }
              break;
            }
            ++c;
          } while ((p = p.next) !== null);
          this.length -= c;
          return ret;
        }
        // Consumes a specified amount of bytes from the buffered data.
        _getBuffer(n) {
          const ret = Buffer3.allocUnsafe(n);
          const retLen = n;
          let p = this.head;
          let c = 0;
          do {
            const buf = p.data;
            if (n > buf.length) {
              TypedArrayPrototypeSet(ret, buf, retLen - n);
              n -= buf.length;
            } else {
              if (n === buf.length) {
                TypedArrayPrototypeSet(ret, buf, retLen - n);
                ++c;
                if (p.next) this.head = p.next;
                else this.head = this.tail = null;
              } else {
                TypedArrayPrototypeSet(ret, new Uint8Array2(buf.buffer, buf.byteOffset, n), retLen - n);
                this.head = p;
                p.data = buf.slice(n);
              }
              break;
            }
            ++c;
          } while ((p = p.next) !== null);
          this.length -= c;
          return ret;
        }
        // Make sure the linked list only shows the minimal necessary information.
        [Symbol.for("nodejs.util.inspect.custom")](_, options) {
          return inspect(this, {
            ...options,
            // Only inspect one level.
            depth: 0,
            // It should not recurse.
            customInspect: false
          });
        }
      };
    }
  });

  // node_modules/readable-stream/lib/internal/streams/state.js
  var require_state = __commonJS({
    "node_modules/readable-stream/lib/internal/streams/state.js"(exports8, module) {
      "use strict";
      init_dirname();
      init_buffer2();
      init_process2();
      var { MathFloor, NumberIsInteger } = require_primordials();
      var { validateInteger } = require_validators();
      var { ERR_INVALID_ARG_VALUE } = require_errors().codes;
      var defaultHighWaterMarkBytes = 16 * 1024;
      var defaultHighWaterMarkObjectMode = 16;
      function highWaterMarkFrom(options, isDuplex, duplexKey) {
        return options.highWaterMark != null ? options.highWaterMark : isDuplex ? options[duplexKey] : null;
      }
      function getDefaultHighWaterMark(objectMode) {
        return objectMode ? defaultHighWaterMarkObjectMode : defaultHighWaterMarkBytes;
      }
      function setDefaultHighWaterMark(objectMode, value) {
        validateInteger(value, "value", 0);
        if (objectMode) {
          defaultHighWaterMarkObjectMode = value;
        } else {
          defaultHighWaterMarkBytes = value;
        }
      }
      function getHighWaterMark(state, options, duplexKey, isDuplex) {
        const hwm = highWaterMarkFrom(options, isDuplex, duplexKey);
        if (hwm != null) {
          if (!NumberIsInteger(hwm) || hwm < 0) {
            const name2 = isDuplex ? `options.${duplexKey}` : "options.highWaterMark";
            throw new ERR_INVALID_ARG_VALUE(name2, hwm);
          }
          return MathFloor(hwm);
        }
        return getDefaultHighWaterMark(state.objectMode);
      }
      module.exports = {
        getHighWaterMark,
        getDefaultHighWaterMark,
        setDefaultHighWaterMark
      };
    }
  });

  // node_modules/safe-buffer/index.js
  var require_safe_buffer = __commonJS({
    "node_modules/safe-buffer/index.js"(exports8, module) {
      init_dirname();
      init_buffer2();
      init_process2();
      var buffer = (init_buffer(), __toCommonJS(buffer_exports));
      var Buffer3 = buffer.Buffer;
      function copyProps(src, dst) {
        for (var key in src) {
          dst[key] = src[key];
        }
      }
      if (Buffer3.from && Buffer3.alloc && Buffer3.allocUnsafe && Buffer3.allocUnsafeSlow) {
        module.exports = buffer;
      } else {
        copyProps(buffer, exports8);
        exports8.Buffer = SafeBuffer;
      }
      function SafeBuffer(arg, encodingOrOffset, length) {
        return Buffer3(arg, encodingOrOffset, length);
      }
      SafeBuffer.prototype = Object.create(Buffer3.prototype);
      copyProps(Buffer3, SafeBuffer);
      SafeBuffer.from = function(arg, encodingOrOffset, length) {
        if (typeof arg === "number") {
          throw new TypeError("Argument must not be a number");
        }
        return Buffer3(arg, encodingOrOffset, length);
      };
      SafeBuffer.alloc = function(size, fill, encoding) {
        if (typeof size !== "number") {
          throw new TypeError("Argument must be a number");
        }
        var buf = Buffer3(size);
        if (fill !== void 0) {
          if (typeof encoding === "string") {
            buf.fill(fill, encoding);
          } else {
            buf.fill(fill);
          }
        } else {
          buf.fill(0);
        }
        return buf;
      };
      SafeBuffer.allocUnsafe = function(size) {
        if (typeof size !== "number") {
          throw new TypeError("Argument must be a number");
        }
        return Buffer3(size);
      };
      SafeBuffer.allocUnsafeSlow = function(size) {
        if (typeof size !== "number") {
          throw new TypeError("Argument must be a number");
        }
        return buffer.SlowBuffer(size);
      };
    }
  });

  // node_modules/string_decoder/lib/string_decoder.js
  var require_string_decoder = __commonJS({
    "node_modules/string_decoder/lib/string_decoder.js"(exports8) {
      "use strict";
      init_dirname();
      init_buffer2();
      init_process2();
      var Buffer3 = require_safe_buffer().Buffer;
      var isEncoding = Buffer3.isEncoding || function(encoding) {
        encoding = "" + encoding;
        switch (encoding && encoding.toLowerCase()) {
          case "hex":
          case "utf8":
          case "utf-8":
          case "ascii":
          case "binary":
          case "base64":
          case "ucs2":
          case "ucs-2":
          case "utf16le":
          case "utf-16le":
          case "raw":
            return true;
          default:
            return false;
        }
      };
      function _normalizeEncoding(enc) {
        if (!enc) return "utf8";
        var retried;
        while (true) {
          switch (enc) {
            case "utf8":
            case "utf-8":
              return "utf8";
            case "ucs2":
            case "ucs-2":
            case "utf16le":
            case "utf-16le":
              return "utf16le";
            case "latin1":
            case "binary":
              return "latin1";
            case "base64":
            case "ascii":
            case "hex":
              return enc;
            default:
              if (retried) return;
              enc = ("" + enc).toLowerCase();
              retried = true;
          }
        }
      }
      function normalizeEncoding(enc) {
        var nenc = _normalizeEncoding(enc);
        if (typeof nenc !== "string" && (Buffer3.isEncoding === isEncoding || !isEncoding(enc))) throw new Error("Unknown encoding: " + enc);
        return nenc || enc;
      }
      exports8.StringDecoder = StringDecoder;
      function StringDecoder(encoding) {
        this.encoding = normalizeEncoding(encoding);
        var nb;
        switch (this.encoding) {
          case "utf16le":
            this.text = utf16Text;
            this.end = utf16End;
            nb = 4;
            break;
          case "utf8":
            this.fillLast = utf8FillLast;
            nb = 4;
            break;
          case "base64":
            this.text = base64Text;
            this.end = base64End;
            nb = 3;
            break;
          default:
            this.write = simpleWrite;
            this.end = simpleEnd;
            return;
        }
        this.lastNeed = 0;
        this.lastTotal = 0;
        this.lastChar = Buffer3.allocUnsafe(nb);
      }
      StringDecoder.prototype.write = function(buf) {
        if (buf.length === 0) return "";
        var r;
        var i;
        if (this.lastNeed) {
          r = this.fillLast(buf);
          if (r === void 0) return "";
          i = this.lastNeed;
          this.lastNeed = 0;
        } else {
          i = 0;
        }
        if (i < buf.length) return r ? r + this.text(buf, i) : this.text(buf, i);
        return r || "";
      };
      StringDecoder.prototype.end = utf8End;
      StringDecoder.prototype.text = utf8Text;
      StringDecoder.prototype.fillLast = function(buf) {
        if (this.lastNeed <= buf.length) {
          buf.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, this.lastNeed);
          return this.lastChar.toString(this.encoding, 0, this.lastTotal);
        }
        buf.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, buf.length);
        this.lastNeed -= buf.length;
      };
      function utf8CheckByte(byte) {
        if (byte <= 127) return 0;
        else if (byte >> 5 === 6) return 2;
        else if (byte >> 4 === 14) return 3;
        else if (byte >> 3 === 30) return 4;
        return byte >> 6 === 2 ? -1 : -2;
      }
      function utf8CheckIncomplete(self2, buf, i) {
        var j = buf.length - 1;
        if (j < i) return 0;
        var nb = utf8CheckByte(buf[j]);
        if (nb >= 0) {
          if (nb > 0) self2.lastNeed = nb - 1;
          return nb;
        }
        if (--j < i || nb === -2) return 0;
        nb = utf8CheckByte(buf[j]);
        if (nb >= 0) {
          if (nb > 0) self2.lastNeed = nb - 2;
          return nb;
        }
        if (--j < i || nb === -2) return 0;
        nb = utf8CheckByte(buf[j]);
        if (nb >= 0) {
          if (nb > 0) {
            if (nb === 2) nb = 0;
            else self2.lastNeed = nb - 3;
          }
          return nb;
        }
        return 0;
      }
      function utf8CheckExtraBytes(self2, buf, p) {
        if ((buf[0] & 192) !== 128) {
          self2.lastNeed = 0;
          return "\uFFFD";
        }
        if (self2.lastNeed > 1 && buf.length > 1) {
          if ((buf[1] & 192) !== 128) {
            self2.lastNeed = 1;
            return "\uFFFD";
          }
          if (self2.lastNeed > 2 && buf.length > 2) {
            if ((buf[2] & 192) !== 128) {
              self2.lastNeed = 2;
              return "\uFFFD";
            }
          }
        }
      }
      function utf8FillLast(buf) {
        var p = this.lastTotal - this.lastNeed;
        var r = utf8CheckExtraBytes(this, buf, p);
        if (r !== void 0) return r;
        if (this.lastNeed <= buf.length) {
          buf.copy(this.lastChar, p, 0, this.lastNeed);
          return this.lastChar.toString(this.encoding, 0, this.lastTotal);
        }
        buf.copy(this.lastChar, p, 0, buf.length);
        this.lastNeed -= buf.length;
      }
      function utf8Text(buf, i) {
        var total = utf8CheckIncomplete(this, buf, i);
        if (!this.lastNeed) return buf.toString("utf8", i);
        this.lastTotal = total;
        var end = buf.length - (total - this.lastNeed);
        buf.copy(this.lastChar, 0, end);
        return buf.toString("utf8", i, end);
      }
      function utf8End(buf) {
        var r = buf && buf.length ? this.write(buf) : "";
        if (this.lastNeed) return r + "\uFFFD";
        return r;
      }
      function utf16Text(buf, i) {
        if ((buf.length - i) % 2 === 0) {
          var r = buf.toString("utf16le", i);
          if (r) {
            var c = r.charCodeAt(r.length - 1);
            if (c >= 55296 && c <= 56319) {
              this.lastNeed = 2;
              this.lastTotal = 4;
              this.lastChar[0] = buf[buf.length - 2];
              this.lastChar[1] = buf[buf.length - 1];
              return r.slice(0, -1);
            }
          }
          return r;
        }
        this.lastNeed = 1;
        this.lastTotal = 2;
        this.lastChar[0] = buf[buf.length - 1];
        return buf.toString("utf16le", i, buf.length - 1);
      }
      function utf16End(buf) {
        var r = buf && buf.length ? this.write(buf) : "";
        if (this.lastNeed) {
          var end = this.lastTotal - this.lastNeed;
          return r + this.lastChar.toString("utf16le", 0, end);
        }
        return r;
      }
      function base64Text(buf, i) {
        var n = (buf.length - i) % 3;
        if (n === 0) return buf.toString("base64", i);
        this.lastNeed = 3 - n;
        this.lastTotal = 3;
        if (n === 1) {
          this.lastChar[0] = buf[buf.length - 1];
        } else {
          this.lastChar[0] = buf[buf.length - 2];
          this.lastChar[1] = buf[buf.length - 1];
        }
        return buf.toString("base64", i, buf.length - n);
      }
      function base64End(buf) {
        var r = buf && buf.length ? this.write(buf) : "";
        if (this.lastNeed) return r + this.lastChar.toString("base64", 0, 3 - this.lastNeed);
        return r;
      }
      function simpleWrite(buf) {
        return buf.toString(this.encoding);
      }
      function simpleEnd(buf) {
        return buf && buf.length ? this.write(buf) : "";
      }
    }
  });

  // node_modules/readable-stream/lib/internal/streams/from.js
  var require_from = __commonJS({
    "node_modules/readable-stream/lib/internal/streams/from.js"(exports8, module) {
      "use strict";
      init_dirname();
      init_buffer2();
      init_process2();
      var process3 = require_browser2();
      var { PromisePrototypeThen, SymbolAsyncIterator, SymbolIterator } = require_primordials();
      var { Buffer: Buffer3 } = (init_buffer(), __toCommonJS(buffer_exports));
      var { ERR_INVALID_ARG_TYPE, ERR_STREAM_NULL_VALUES } = require_errors().codes;
      function from(Readable, iterable, opts) {
        let iterator;
        if (typeof iterable === "string" || iterable instanceof Buffer3) {
          return new Readable({
            objectMode: true,
            ...opts,
            read() {
              this.push(iterable);
              this.push(null);
            }
          });
        }
        let isAsync;
        if (iterable && iterable[SymbolAsyncIterator]) {
          isAsync = true;
          iterator = iterable[SymbolAsyncIterator]();
        } else if (iterable && iterable[SymbolIterator]) {
          isAsync = false;
          iterator = iterable[SymbolIterator]();
        } else {
          throw new ERR_INVALID_ARG_TYPE("iterable", ["Iterable"], iterable);
        }
        const readable = new Readable({
          objectMode: true,
          highWaterMark: 1,
          // TODO(ronag): What options should be allowed?
          ...opts
        });
        let reading = false;
        readable._read = function() {
          if (!reading) {
            reading = true;
            next();
          }
        };
        readable._destroy = function(error, cb) {
          PromisePrototypeThen(
            close(error),
            () => process3.nextTick(cb, error),
            // nextTick is here in case cb throws
            (e) => process3.nextTick(cb, e || error)
          );
        };
        async function close(error) {
          const hadError = error !== void 0 && error !== null;
          const hasThrow = typeof iterator.throw === "function";
          if (hadError && hasThrow) {
            const { value, done } = await iterator.throw(error);
            await value;
            if (done) {
              return;
            }
          }
          if (typeof iterator.return === "function") {
            const { value } = await iterator.return();
            await value;
          }
        }
        async function next() {
          for (; ; ) {
            try {
              const { value, done } = isAsync ? await iterator.next() : iterator.next();
              if (done) {
                readable.push(null);
              } else {
                const res = value && typeof value.then === "function" ? await value : value;
                if (res === null) {
                  reading = false;
                  throw new ERR_STREAM_NULL_VALUES();
                } else if (readable.push(res)) {
                  continue;
                } else {
                  reading = false;
                }
              }
            } catch (err) {
              readable.destroy(err);
            }
            break;
          }
        }
        return readable;
      }
      module.exports = from;
    }
  });

  // node_modules/readable-stream/lib/internal/streams/readable.js
  var require_readable = __commonJS({
    "node_modules/readable-stream/lib/internal/streams/readable.js"(exports8, module) {
      "use strict";
      init_dirname();
      init_buffer2();
      init_process2();
      var process3 = require_browser2();
      var {
        ArrayPrototypeIndexOf,
        NumberIsInteger,
        NumberIsNaN,
        NumberParseInt,
        ObjectDefineProperties,
        ObjectKeys,
        ObjectSetPrototypeOf,
        Promise: Promise2,
        SafeSet,
        SymbolAsyncDispose,
        SymbolAsyncIterator,
        Symbol: Symbol2
      } = require_primordials();
      module.exports = Readable;
      Readable.ReadableState = ReadableState;
      var { EventEmitter: EE } = (init_events(), __toCommonJS(events_exports));
      var { Stream, prependListener: prependListener3 } = require_legacy();
      var { Buffer: Buffer3 } = (init_buffer(), __toCommonJS(buffer_exports));
      var { addAbortSignal } = require_add_abort_signal();
      var eos = require_end_of_stream();
      var debug = require_util().debuglog("stream", (fn) => {
        debug = fn;
      });
      var BufferList = require_buffer_list();
      var destroyImpl = require_destroy();
      var { getHighWaterMark, getDefaultHighWaterMark } = require_state();
      var {
        aggregateTwoErrors,
        codes: {
          ERR_INVALID_ARG_TYPE,
          ERR_METHOD_NOT_IMPLEMENTED,
          ERR_OUT_OF_RANGE,
          ERR_STREAM_PUSH_AFTER_EOF,
          ERR_STREAM_UNSHIFT_AFTER_END_EVENT
        },
        AbortError
      } = require_errors();
      var { validateObject } = require_validators();
      var kPaused = Symbol2("kPaused");
      var { StringDecoder } = require_string_decoder();
      var from = require_from();
      ObjectSetPrototypeOf(Readable.prototype, Stream.prototype);
      ObjectSetPrototypeOf(Readable, Stream);
      var nop = () => {
      };
      var { errorOrDestroy } = destroyImpl;
      var kObjectMode = 1 << 0;
      var kEnded = 1 << 1;
      var kEndEmitted = 1 << 2;
      var kReading = 1 << 3;
      var kConstructed = 1 << 4;
      var kSync = 1 << 5;
      var kNeedReadable = 1 << 6;
      var kEmittedReadable = 1 << 7;
      var kReadableListening = 1 << 8;
      var kResumeScheduled = 1 << 9;
      var kErrorEmitted = 1 << 10;
      var kEmitClose = 1 << 11;
      var kAutoDestroy = 1 << 12;
      var kDestroyed = 1 << 13;
      var kClosed = 1 << 14;
      var kCloseEmitted = 1 << 15;
      var kMultiAwaitDrain = 1 << 16;
      var kReadingMore = 1 << 17;
      var kDataEmitted = 1 << 18;
      function makeBitMapDescriptor(bit) {
        return {
          enumerable: false,
          get() {
            return (this.state & bit) !== 0;
          },
          set(value) {
            if (value) this.state |= bit;
            else this.state &= ~bit;
          }
        };
      }
      ObjectDefineProperties(ReadableState.prototype, {
        objectMode: makeBitMapDescriptor(kObjectMode),
        ended: makeBitMapDescriptor(kEnded),
        endEmitted: makeBitMapDescriptor(kEndEmitted),
        reading: makeBitMapDescriptor(kReading),
        // Stream is still being constructed and cannot be
        // destroyed until construction finished or failed.
        // Async construction is opt in, therefore we start as
        // constructed.
        constructed: makeBitMapDescriptor(kConstructed),
        // A flag to be able to tell if the event 'readable'/'data' is emitted
        // immediately, or on a later tick.  We set this to true at first, because
        // any actions that shouldn't happen until "later" should generally also
        // not happen before the first read call.
        sync: makeBitMapDescriptor(kSync),
        // Whenever we return null, then we set a flag to say
        // that we're awaiting a 'readable' event emission.
        needReadable: makeBitMapDescriptor(kNeedReadable),
        emittedReadable: makeBitMapDescriptor(kEmittedReadable),
        readableListening: makeBitMapDescriptor(kReadableListening),
        resumeScheduled: makeBitMapDescriptor(kResumeScheduled),
        // True if the error was already emitted and should not be thrown again.
        errorEmitted: makeBitMapDescriptor(kErrorEmitted),
        emitClose: makeBitMapDescriptor(kEmitClose),
        autoDestroy: makeBitMapDescriptor(kAutoDestroy),
        // Has it been destroyed.
        destroyed: makeBitMapDescriptor(kDestroyed),
        // Indicates whether the stream has finished destroying.
        closed: makeBitMapDescriptor(kClosed),
        // True if close has been emitted or would have been emitted
        // depending on emitClose.
        closeEmitted: makeBitMapDescriptor(kCloseEmitted),
        multiAwaitDrain: makeBitMapDescriptor(kMultiAwaitDrain),
        // If true, a maybeReadMore has been scheduled.
        readingMore: makeBitMapDescriptor(kReadingMore),
        dataEmitted: makeBitMapDescriptor(kDataEmitted)
      });
      function ReadableState(options, stream, isDuplex) {
        if (typeof isDuplex !== "boolean") isDuplex = stream instanceof require_duplex();
        this.state = kEmitClose | kAutoDestroy | kConstructed | kSync;
        if (options && options.objectMode) this.state |= kObjectMode;
        if (isDuplex && options && options.readableObjectMode) this.state |= kObjectMode;
        this.highWaterMark = options ? getHighWaterMark(this, options, "readableHighWaterMark", isDuplex) : getDefaultHighWaterMark(false);
        this.buffer = new BufferList();
        this.length = 0;
        this.pipes = [];
        this.flowing = null;
        this[kPaused] = null;
        if (options && options.emitClose === false) this.state &= ~kEmitClose;
        if (options && options.autoDestroy === false) this.state &= ~kAutoDestroy;
        this.errored = null;
        this.defaultEncoding = options && options.defaultEncoding || "utf8";
        this.awaitDrainWriters = null;
        this.decoder = null;
        this.encoding = null;
        if (options && options.encoding) {
          this.decoder = new StringDecoder(options.encoding);
          this.encoding = options.encoding;
        }
      }
      function Readable(options) {
        if (!(this instanceof Readable)) return new Readable(options);
        const isDuplex = this instanceof require_duplex();
        this._readableState = new ReadableState(options, this, isDuplex);
        if (options) {
          if (typeof options.read === "function") this._read = options.read;
          if (typeof options.destroy === "function") this._destroy = options.destroy;
          if (typeof options.construct === "function") this._construct = options.construct;
          if (options.signal && !isDuplex) addAbortSignal(options.signal, this);
        }
        Stream.call(this, options);
        destroyImpl.construct(this, () => {
          if (this._readableState.needReadable) {
            maybeReadMore(this, this._readableState);
          }
        });
      }
      Readable.prototype.destroy = destroyImpl.destroy;
      Readable.prototype._undestroy = destroyImpl.undestroy;
      Readable.prototype._destroy = function(err, cb) {
        cb(err);
      };
      Readable.prototype[EE.captureRejectionSymbol] = function(err) {
        this.destroy(err);
      };
      Readable.prototype[SymbolAsyncDispose] = function() {
        let error;
        if (!this.destroyed) {
          error = this.readableEnded ? null : new AbortError();
          this.destroy(error);
        }
        return new Promise2((resolve2, reject) => eos(this, (err) => err && err !== error ? reject(err) : resolve2(null)));
      };
      Readable.prototype.push = function(chunk, encoding) {
        return readableAddChunk(this, chunk, encoding, false);
      };
      Readable.prototype.unshift = function(chunk, encoding) {
        return readableAddChunk(this, chunk, encoding, true);
      };
      function readableAddChunk(stream, chunk, encoding, addToFront) {
        debug("readableAddChunk", chunk);
        const state = stream._readableState;
        let err;
        if ((state.state & kObjectMode) === 0) {
          if (typeof chunk === "string") {
            encoding = encoding || state.defaultEncoding;
            if (state.encoding !== encoding) {
              if (addToFront && state.encoding) {
                chunk = Buffer3.from(chunk, encoding).toString(state.encoding);
              } else {
                chunk = Buffer3.from(chunk, encoding);
                encoding = "";
              }
            }
          } else if (chunk instanceof Buffer3) {
            encoding = "";
          } else if (Stream._isUint8Array(chunk)) {
            chunk = Stream._uint8ArrayToBuffer(chunk);
            encoding = "";
          } else if (chunk != null) {
            err = new ERR_INVALID_ARG_TYPE("chunk", ["string", "Buffer", "Uint8Array"], chunk);
          }
        }
        if (err) {
          errorOrDestroy(stream, err);
        } else if (chunk === null) {
          state.state &= ~kReading;
          onEofChunk(stream, state);
        } else if ((state.state & kObjectMode) !== 0 || chunk && chunk.length > 0) {
          if (addToFront) {
            if ((state.state & kEndEmitted) !== 0) errorOrDestroy(stream, new ERR_STREAM_UNSHIFT_AFTER_END_EVENT());
            else if (state.destroyed || state.errored) return false;
            else addChunk(stream, state, chunk, true);
          } else if (state.ended) {
            errorOrDestroy(stream, new ERR_STREAM_PUSH_AFTER_EOF());
          } else if (state.destroyed || state.errored) {
            return false;
          } else {
            state.state &= ~kReading;
            if (state.decoder && !encoding) {
              chunk = state.decoder.write(chunk);
              if (state.objectMode || chunk.length !== 0) addChunk(stream, state, chunk, false);
              else maybeReadMore(stream, state);
            } else {
              addChunk(stream, state, chunk, false);
            }
          }
        } else if (!addToFront) {
          state.state &= ~kReading;
          maybeReadMore(stream, state);
        }
        return !state.ended && (state.length < state.highWaterMark || state.length === 0);
      }
      function addChunk(stream, state, chunk, addToFront) {
        if (state.flowing && state.length === 0 && !state.sync && stream.listenerCount("data") > 0) {
          if ((state.state & kMultiAwaitDrain) !== 0) {
            state.awaitDrainWriters.clear();
          } else {
            state.awaitDrainWriters = null;
          }
          state.dataEmitted = true;
          stream.emit("data", chunk);
        } else {
          state.length += state.objectMode ? 1 : chunk.length;
          if (addToFront) state.buffer.unshift(chunk);
          else state.buffer.push(chunk);
          if ((state.state & kNeedReadable) !== 0) emitReadable(stream);
        }
        maybeReadMore(stream, state);
      }
      Readable.prototype.isPaused = function() {
        const state = this._readableState;
        return state[kPaused] === true || state.flowing === false;
      };
      Readable.prototype.setEncoding = function(enc) {
        const decoder = new StringDecoder(enc);
        this._readableState.decoder = decoder;
        this._readableState.encoding = this._readableState.decoder.encoding;
        const buffer = this._readableState.buffer;
        let content = "";
        for (const data of buffer) {
          content += decoder.write(data);
        }
        buffer.clear();
        if (content !== "") buffer.push(content);
        this._readableState.length = content.length;
        return this;
      };
      var MAX_HWM = 1073741824;
      function computeNewHighWaterMark(n) {
        if (n > MAX_HWM) {
          throw new ERR_OUT_OF_RANGE("size", "<= 1GiB", n);
        } else {
          n--;
          n |= n >>> 1;
          n |= n >>> 2;
          n |= n >>> 4;
          n |= n >>> 8;
          n |= n >>> 16;
          n++;
        }
        return n;
      }
      function howMuchToRead(n, state) {
        if (n <= 0 || state.length === 0 && state.ended) return 0;
        if ((state.state & kObjectMode) !== 0) return 1;
        if (NumberIsNaN(n)) {
          if (state.flowing && state.length) return state.buffer.first().length;
          return state.length;
        }
        if (n <= state.length) return n;
        return state.ended ? state.length : 0;
      }
      Readable.prototype.read = function(n) {
        debug("read", n);
        if (n === void 0) {
          n = NaN;
        } else if (!NumberIsInteger(n)) {
          n = NumberParseInt(n, 10);
        }
        const state = this._readableState;
        const nOrig = n;
        if (n > state.highWaterMark) state.highWaterMark = computeNewHighWaterMark(n);
        if (n !== 0) state.state &= ~kEmittedReadable;
        if (n === 0 && state.needReadable && ((state.highWaterMark !== 0 ? state.length >= state.highWaterMark : state.length > 0) || state.ended)) {
          debug("read: emitReadable", state.length, state.ended);
          if (state.length === 0 && state.ended) endReadable(this);
          else emitReadable(this);
          return null;
        }
        n = howMuchToRead(n, state);
        if (n === 0 && state.ended) {
          if (state.length === 0) endReadable(this);
          return null;
        }
        let doRead = (state.state & kNeedReadable) !== 0;
        debug("need readable", doRead);
        if (state.length === 0 || state.length - n < state.highWaterMark) {
          doRead = true;
          debug("length less than watermark", doRead);
        }
        if (state.ended || state.reading || state.destroyed || state.errored || !state.constructed) {
          doRead = false;
          debug("reading, ended or constructing", doRead);
        } else if (doRead) {
          debug("do read");
          state.state |= kReading | kSync;
          if (state.length === 0) state.state |= kNeedReadable;
          try {
            this._read(state.highWaterMark);
          } catch (err) {
            errorOrDestroy(this, err);
          }
          state.state &= ~kSync;
          if (!state.reading) n = howMuchToRead(nOrig, state);
        }
        let ret;
        if (n > 0) ret = fromList(n, state);
        else ret = null;
        if (ret === null) {
          state.needReadable = state.length <= state.highWaterMark;
          n = 0;
        } else {
          state.length -= n;
          if (state.multiAwaitDrain) {
            state.awaitDrainWriters.clear();
          } else {
            state.awaitDrainWriters = null;
          }
        }
        if (state.length === 0) {
          if (!state.ended) state.needReadable = true;
          if (nOrig !== n && state.ended) endReadable(this);
        }
        if (ret !== null && !state.errorEmitted && !state.closeEmitted) {
          state.dataEmitted = true;
          this.emit("data", ret);
        }
        return ret;
      };
      function onEofChunk(stream, state) {
        debug("onEofChunk");
        if (state.ended) return;
        if (state.decoder) {
          const chunk = state.decoder.end();
          if (chunk && chunk.length) {
            state.buffer.push(chunk);
            state.length += state.objectMode ? 1 : chunk.length;
          }
        }
        state.ended = true;
        if (state.sync) {
          emitReadable(stream);
        } else {
          state.needReadable = false;
          state.emittedReadable = true;
          emitReadable_(stream);
        }
      }
      function emitReadable(stream) {
        const state = stream._readableState;
        debug("emitReadable", state.needReadable, state.emittedReadable);
        state.needReadable = false;
        if (!state.emittedReadable) {
          debug("emitReadable", state.flowing);
          state.emittedReadable = true;
          process3.nextTick(emitReadable_, stream);
        }
      }
      function emitReadable_(stream) {
        const state = stream._readableState;
        debug("emitReadable_", state.destroyed, state.length, state.ended);
        if (!state.destroyed && !state.errored && (state.length || state.ended)) {
          stream.emit("readable");
          state.emittedReadable = false;
        }
        state.needReadable = !state.flowing && !state.ended && state.length <= state.highWaterMark;
        flow(stream);
      }
      function maybeReadMore(stream, state) {
        if (!state.readingMore && state.constructed) {
          state.readingMore = true;
          process3.nextTick(maybeReadMore_, stream, state);
        }
      }
      function maybeReadMore_(stream, state) {
        while (!state.reading && !state.ended && (state.length < state.highWaterMark || state.flowing && state.length === 0)) {
          const len = state.length;
          debug("maybeReadMore read 0");
          stream.read(0);
          if (len === state.length)
            break;
        }
        state.readingMore = false;
      }
      Readable.prototype._read = function(n) {
        throw new ERR_METHOD_NOT_IMPLEMENTED("_read()");
      };
      Readable.prototype.pipe = function(dest, pipeOpts) {
        const src = this;
        const state = this._readableState;
        if (state.pipes.length === 1) {
          if (!state.multiAwaitDrain) {
            state.multiAwaitDrain = true;
            state.awaitDrainWriters = new SafeSet(state.awaitDrainWriters ? [state.awaitDrainWriters] : []);
          }
        }
        state.pipes.push(dest);
        debug("pipe count=%d opts=%j", state.pipes.length, pipeOpts);
        const doEnd = (!pipeOpts || pipeOpts.end !== false) && dest !== process3.stdout && dest !== process3.stderr;
        const endFn = doEnd ? onend : unpipe;
        if (state.endEmitted) process3.nextTick(endFn);
        else src.once("end", endFn);
        dest.on("unpipe", onunpipe);
        function onunpipe(readable, unpipeInfo) {
          debug("onunpipe");
          if (readable === src) {
            if (unpipeInfo && unpipeInfo.hasUnpiped === false) {
              unpipeInfo.hasUnpiped = true;
              cleanup();
            }
          }
        }
        function onend() {
          debug("onend");
          dest.end();
        }
        let ondrain;
        let cleanedUp = false;
        function cleanup() {
          debug("cleanup");
          dest.removeListener("close", onclose);
          dest.removeListener("finish", onfinish);
          if (ondrain) {
            dest.removeListener("drain", ondrain);
          }
          dest.removeListener("error", onerror);
          dest.removeListener("unpipe", onunpipe);
          src.removeListener("end", onend);
          src.removeListener("end", unpipe);
          src.removeListener("data", ondata);
          cleanedUp = true;
          if (ondrain && state.awaitDrainWriters && (!dest._writableState || dest._writableState.needDrain)) ondrain();
        }
        function pause() {
          if (!cleanedUp) {
            if (state.pipes.length === 1 && state.pipes[0] === dest) {
              debug("false write response, pause", 0);
              state.awaitDrainWriters = dest;
              state.multiAwaitDrain = false;
            } else if (state.pipes.length > 1 && state.pipes.includes(dest)) {
              debug("false write response, pause", state.awaitDrainWriters.size);
              state.awaitDrainWriters.add(dest);
            }
            src.pause();
          }
          if (!ondrain) {
            ondrain = pipeOnDrain(src, dest);
            dest.on("drain", ondrain);
          }
        }
        src.on("data", ondata);
        function ondata(chunk) {
          debug("ondata");
          const ret = dest.write(chunk);
          debug("dest.write", ret);
          if (ret === false) {
            pause();
          }
        }
        function onerror(er) {
          debug("onerror", er);
          unpipe();
          dest.removeListener("error", onerror);
          if (dest.listenerCount("error") === 0) {
            const s = dest._writableState || dest._readableState;
            if (s && !s.errorEmitted) {
              errorOrDestroy(dest, er);
            } else {
              dest.emit("error", er);
            }
          }
        }
        prependListener3(dest, "error", onerror);
        function onclose() {
          dest.removeListener("finish", onfinish);
          unpipe();
        }
        dest.once("close", onclose);
        function onfinish() {
          debug("onfinish");
          dest.removeListener("close", onclose);
          unpipe();
        }
        dest.once("finish", onfinish);
        function unpipe() {
          debug("unpipe");
          src.unpipe(dest);
        }
        dest.emit("pipe", src);
        if (dest.writableNeedDrain === true) {
          pause();
        } else if (!state.flowing) {
          debug("pipe resume");
          src.resume();
        }
        return dest;
      };
      function pipeOnDrain(src, dest) {
        return function pipeOnDrainFunctionResult() {
          const state = src._readableState;
          if (state.awaitDrainWriters === dest) {
            debug("pipeOnDrain", 1);
            state.awaitDrainWriters = null;
          } else if (state.multiAwaitDrain) {
            debug("pipeOnDrain", state.awaitDrainWriters.size);
            state.awaitDrainWriters.delete(dest);
          }
          if ((!state.awaitDrainWriters || state.awaitDrainWriters.size === 0) && src.listenerCount("data")) {
            src.resume();
          }
        };
      }
      Readable.prototype.unpipe = function(dest) {
        const state = this._readableState;
        const unpipeInfo = {
          hasUnpiped: false
        };
        if (state.pipes.length === 0) return this;
        if (!dest) {
          const dests = state.pipes;
          state.pipes = [];
          this.pause();
          for (let i = 0; i < dests.length; i++)
            dests[i].emit("unpipe", this, {
              hasUnpiped: false
            });
          return this;
        }
        const index = ArrayPrototypeIndexOf(state.pipes, dest);
        if (index === -1) return this;
        state.pipes.splice(index, 1);
        if (state.pipes.length === 0) this.pause();
        dest.emit("unpipe", this, unpipeInfo);
        return this;
      };
      Readable.prototype.on = function(ev, fn) {
        const res = Stream.prototype.on.call(this, ev, fn);
        const state = this._readableState;
        if (ev === "data") {
          state.readableListening = this.listenerCount("readable") > 0;
          if (state.flowing !== false) this.resume();
        } else if (ev === "readable") {
          if (!state.endEmitted && !state.readableListening) {
            state.readableListening = state.needReadable = true;
            state.flowing = false;
            state.emittedReadable = false;
            debug("on readable", state.length, state.reading);
            if (state.length) {
              emitReadable(this);
            } else if (!state.reading) {
              process3.nextTick(nReadingNextTick, this);
            }
          }
        }
        return res;
      };
      Readable.prototype.addListener = Readable.prototype.on;
      Readable.prototype.removeListener = function(ev, fn) {
        const res = Stream.prototype.removeListener.call(this, ev, fn);
        if (ev === "readable") {
          process3.nextTick(updateReadableListening, this);
        }
        return res;
      };
      Readable.prototype.off = Readable.prototype.removeListener;
      Readable.prototype.removeAllListeners = function(ev) {
        const res = Stream.prototype.removeAllListeners.apply(this, arguments);
        if (ev === "readable" || ev === void 0) {
          process3.nextTick(updateReadableListening, this);
        }
        return res;
      };
      function updateReadableListening(self2) {
        const state = self2._readableState;
        state.readableListening = self2.listenerCount("readable") > 0;
        if (state.resumeScheduled && state[kPaused] === false) {
          state.flowing = true;
        } else if (self2.listenerCount("data") > 0) {
          self2.resume();
        } else if (!state.readableListening) {
          state.flowing = null;
        }
      }
      function nReadingNextTick(self2) {
        debug("readable nexttick read 0");
        self2.read(0);
      }
      Readable.prototype.resume = function() {
        const state = this._readableState;
        if (!state.flowing) {
          debug("resume");
          state.flowing = !state.readableListening;
          resume(this, state);
        }
        state[kPaused] = false;
        return this;
      };
      function resume(stream, state) {
        if (!state.resumeScheduled) {
          state.resumeScheduled = true;
          process3.nextTick(resume_, stream, state);
        }
      }
      function resume_(stream, state) {
        debug("resume", state.reading);
        if (!state.reading) {
          stream.read(0);
        }
        state.resumeScheduled = false;
        stream.emit("resume");
        flow(stream);
        if (state.flowing && !state.reading) stream.read(0);
      }
      Readable.prototype.pause = function() {
        debug("call pause flowing=%j", this._readableState.flowing);
        if (this._readableState.flowing !== false) {
          debug("pause");
          this._readableState.flowing = false;
          this.emit("pause");
        }
        this._readableState[kPaused] = true;
        return this;
      };
      function flow(stream) {
        const state = stream._readableState;
        debug("flow", state.flowing);
        while (state.flowing && stream.read() !== null) ;
      }
      Readable.prototype.wrap = function(stream) {
        let paused = false;
        stream.on("data", (chunk) => {
          if (!this.push(chunk) && stream.pause) {
            paused = true;
            stream.pause();
          }
        });
        stream.on("end", () => {
          this.push(null);
        });
        stream.on("error", (err) => {
          errorOrDestroy(this, err);
        });
        stream.on("close", () => {
          this.destroy();
        });
        stream.on("destroy", () => {
          this.destroy();
        });
        this._read = () => {
          if (paused && stream.resume) {
            paused = false;
            stream.resume();
          }
        };
        const streamKeys = ObjectKeys(stream);
        for (let j = 1; j < streamKeys.length; j++) {
          const i = streamKeys[j];
          if (this[i] === void 0 && typeof stream[i] === "function") {
            this[i] = stream[i].bind(stream);
          }
        }
        return this;
      };
      Readable.prototype[SymbolAsyncIterator] = function() {
        return streamToAsyncIterator(this);
      };
      Readable.prototype.iterator = function(options) {
        if (options !== void 0) {
          validateObject(options, "options");
        }
        return streamToAsyncIterator(this, options);
      };
      function streamToAsyncIterator(stream, options) {
        if (typeof stream.read !== "function") {
          stream = Readable.wrap(stream, {
            objectMode: true
          });
        }
        const iter = createAsyncIterator(stream, options);
        iter.stream = stream;
        return iter;
      }
      async function* createAsyncIterator(stream, options) {
        let callback = nop;
        function next(resolve2) {
          if (this === stream) {
            callback();
            callback = nop;
          } else {
            callback = resolve2;
          }
        }
        stream.on("readable", next);
        let error;
        const cleanup = eos(
          stream,
          {
            writable: false
          },
          (err) => {
            error = err ? aggregateTwoErrors(error, err) : null;
            callback();
            callback = nop;
          }
        );
        try {
          while (true) {
            const chunk = stream.destroyed ? null : stream.read();
            if (chunk !== null) {
              yield chunk;
            } else if (error) {
              throw error;
            } else if (error === null) {
              return;
            } else {
              await new Promise2(next);
            }
          }
        } catch (err) {
          error = aggregateTwoErrors(error, err);
          throw error;
        } finally {
          if ((error || (options === null || options === void 0 ? void 0 : options.destroyOnReturn) !== false) && (error === void 0 || stream._readableState.autoDestroy)) {
            destroyImpl.destroyer(stream, null);
          } else {
            stream.off("readable", next);
            cleanup();
          }
        }
      }
      ObjectDefineProperties(Readable.prototype, {
        readable: {
          __proto__: null,
          get() {
            const r = this._readableState;
            return !!r && r.readable !== false && !r.destroyed && !r.errorEmitted && !r.endEmitted;
          },
          set(val) {
            if (this._readableState) {
              this._readableState.readable = !!val;
            }
          }
        },
        readableDidRead: {
          __proto__: null,
          enumerable: false,
          get: function() {
            return this._readableState.dataEmitted;
          }
        },
        readableAborted: {
          __proto__: null,
          enumerable: false,
          get: function() {
            return !!(this._readableState.readable !== false && (this._readableState.destroyed || this._readableState.errored) && !this._readableState.endEmitted);
          }
        },
        readableHighWaterMark: {
          __proto__: null,
          enumerable: false,
          get: function() {
            return this._readableState.highWaterMark;
          }
        },
        readableBuffer: {
          __proto__: null,
          enumerable: false,
          get: function() {
            return this._readableState && this._readableState.buffer;
          }
        },
        readableFlowing: {
          __proto__: null,
          enumerable: false,
          get: function() {
            return this._readableState.flowing;
          },
          set: function(state) {
            if (this._readableState) {
              this._readableState.flowing = state;
            }
          }
        },
        readableLength: {
          __proto__: null,
          enumerable: false,
          get() {
            return this._readableState.length;
          }
        },
        readableObjectMode: {
          __proto__: null,
          enumerable: false,
          get() {
            return this._readableState ? this._readableState.objectMode : false;
          }
        },
        readableEncoding: {
          __proto__: null,
          enumerable: false,
          get() {
            return this._readableState ? this._readableState.encoding : null;
          }
        },
        errored: {
          __proto__: null,
          enumerable: false,
          get() {
            return this._readableState ? this._readableState.errored : null;
          }
        },
        closed: {
          __proto__: null,
          get() {
            return this._readableState ? this._readableState.closed : false;
          }
        },
        destroyed: {
          __proto__: null,
          enumerable: false,
          get() {
            return this._readableState ? this._readableState.destroyed : false;
          },
          set(value) {
            if (!this._readableState) {
              return;
            }
            this._readableState.destroyed = value;
          }
        },
        readableEnded: {
          __proto__: null,
          enumerable: false,
          get() {
            return this._readableState ? this._readableState.endEmitted : false;
          }
        }
      });
      ObjectDefineProperties(ReadableState.prototype, {
        // Legacy getter for `pipesCount`.
        pipesCount: {
          __proto__: null,
          get() {
            return this.pipes.length;
          }
        },
        // Legacy property for `paused`.
        paused: {
          __proto__: null,
          get() {
            return this[kPaused] !== false;
          },
          set(value) {
            this[kPaused] = !!value;
          }
        }
      });
      Readable._fromList = fromList;
      function fromList(n, state) {
        if (state.length === 0) return null;
        let ret;
        if (state.objectMode) ret = state.buffer.shift();
        else if (!n || n >= state.length) {
          if (state.decoder) ret = state.buffer.join("");
          else if (state.buffer.length === 1) ret = state.buffer.first();
          else ret = state.buffer.concat(state.length);
          state.buffer.clear();
        } else {
          ret = state.buffer.consume(n, state.decoder);
        }
        return ret;
      }
      function endReadable(stream) {
        const state = stream._readableState;
        debug("endReadable", state.endEmitted);
        if (!state.endEmitted) {
          state.ended = true;
          process3.nextTick(endReadableNT, state, stream);
        }
      }
      function endReadableNT(state, stream) {
        debug("endReadableNT", state.endEmitted, state.length);
        if (!state.errored && !state.closeEmitted && !state.endEmitted && state.length === 0) {
          state.endEmitted = true;
          stream.emit("end");
          if (stream.writable && stream.allowHalfOpen === false) {
            process3.nextTick(endWritableNT, stream);
          } else if (state.autoDestroy) {
            const wState = stream._writableState;
            const autoDestroy = !wState || wState.autoDestroy && // We don't expect the writable to ever 'finish'
            // if writable is explicitly set to false.
            (wState.finished || wState.writable === false);
            if (autoDestroy) {
              stream.destroy();
            }
          }
        }
      }
      function endWritableNT(stream) {
        const writable = stream.writable && !stream.writableEnded && !stream.destroyed;
        if (writable) {
          stream.end();
        }
      }
      Readable.from = function(iterable, opts) {
        return from(Readable, iterable, opts);
      };
      var webStreamsAdapters;
      function lazyWebStreams() {
        if (webStreamsAdapters === void 0) webStreamsAdapters = {};
        return webStreamsAdapters;
      }
      Readable.fromWeb = function(readableStream, options) {
        return lazyWebStreams().newStreamReadableFromReadableStream(readableStream, options);
      };
      Readable.toWeb = function(streamReadable, options) {
        return lazyWebStreams().newReadableStreamFromStreamReadable(streamReadable, options);
      };
      Readable.wrap = function(src, options) {
        var _ref, _src$readableObjectMo;
        return new Readable({
          objectMode: (_ref = (_src$readableObjectMo = src.readableObjectMode) !== null && _src$readableObjectMo !== void 0 ? _src$readableObjectMo : src.objectMode) !== null && _ref !== void 0 ? _ref : true,
          ...options,
          destroy(err, callback) {
            destroyImpl.destroyer(src, err);
            callback(err);
          }
        }).wrap(src);
      };
    }
  });

  // node_modules/readable-stream/lib/internal/streams/writable.js
  var require_writable = __commonJS({
    "node_modules/readable-stream/lib/internal/streams/writable.js"(exports8, module) {
      "use strict";
      init_dirname();
      init_buffer2();
      init_process2();
      var process3 = require_browser2();
      var {
        ArrayPrototypeSlice,
        Error: Error2,
        FunctionPrototypeSymbolHasInstance,
        ObjectDefineProperty,
        ObjectDefineProperties,
        ObjectSetPrototypeOf,
        StringPrototypeToLowerCase,
        Symbol: Symbol2,
        SymbolHasInstance
      } = require_primordials();
      module.exports = Writable;
      Writable.WritableState = WritableState;
      var { EventEmitter: EE } = (init_events(), __toCommonJS(events_exports));
      var Stream = require_legacy().Stream;
      var { Buffer: Buffer3 } = (init_buffer(), __toCommonJS(buffer_exports));
      var destroyImpl = require_destroy();
      var { addAbortSignal } = require_add_abort_signal();
      var { getHighWaterMark, getDefaultHighWaterMark } = require_state();
      var {
        ERR_INVALID_ARG_TYPE,
        ERR_METHOD_NOT_IMPLEMENTED,
        ERR_MULTIPLE_CALLBACK,
        ERR_STREAM_CANNOT_PIPE,
        ERR_STREAM_DESTROYED,
        ERR_STREAM_ALREADY_FINISHED,
        ERR_STREAM_NULL_VALUES,
        ERR_STREAM_WRITE_AFTER_END,
        ERR_UNKNOWN_ENCODING
      } = require_errors().codes;
      var { errorOrDestroy } = destroyImpl;
      ObjectSetPrototypeOf(Writable.prototype, Stream.prototype);
      ObjectSetPrototypeOf(Writable, Stream);
      function nop() {
      }
      var kOnFinished = Symbol2("kOnFinished");
      function WritableState(options, stream, isDuplex) {
        if (typeof isDuplex !== "boolean") isDuplex = stream instanceof require_duplex();
        this.objectMode = !!(options && options.objectMode);
        if (isDuplex) this.objectMode = this.objectMode || !!(options && options.writableObjectMode);
        this.highWaterMark = options ? getHighWaterMark(this, options, "writableHighWaterMark", isDuplex) : getDefaultHighWaterMark(false);
        this.finalCalled = false;
        this.needDrain = false;
        this.ending = false;
        this.ended = false;
        this.finished = false;
        this.destroyed = false;
        const noDecode = !!(options && options.decodeStrings === false);
        this.decodeStrings = !noDecode;
        this.defaultEncoding = options && options.defaultEncoding || "utf8";
        this.length = 0;
        this.writing = false;
        this.corked = 0;
        this.sync = true;
        this.bufferProcessing = false;
        this.onwrite = onwrite.bind(void 0, stream);
        this.writecb = null;
        this.writelen = 0;
        this.afterWriteTickInfo = null;
        resetBuffer(this);
        this.pendingcb = 0;
        this.constructed = true;
        this.prefinished = false;
        this.errorEmitted = false;
        this.emitClose = !options || options.emitClose !== false;
        this.autoDestroy = !options || options.autoDestroy !== false;
        this.errored = null;
        this.closed = false;
        this.closeEmitted = false;
        this[kOnFinished] = [];
      }
      function resetBuffer(state) {
        state.buffered = [];
        state.bufferedIndex = 0;
        state.allBuffers = true;
        state.allNoop = true;
      }
      WritableState.prototype.getBuffer = function getBuffer() {
        return ArrayPrototypeSlice(this.buffered, this.bufferedIndex);
      };
      ObjectDefineProperty(WritableState.prototype, "bufferedRequestCount", {
        __proto__: null,
        get() {
          return this.buffered.length - this.bufferedIndex;
        }
      });
      function Writable(options) {
        const isDuplex = this instanceof require_duplex();
        if (!isDuplex && !FunctionPrototypeSymbolHasInstance(Writable, this)) return new Writable(options);
        this._writableState = new WritableState(options, this, isDuplex);
        if (options) {
          if (typeof options.write === "function") this._write = options.write;
          if (typeof options.writev === "function") this._writev = options.writev;
          if (typeof options.destroy === "function") this._destroy = options.destroy;
          if (typeof options.final === "function") this._final = options.final;
          if (typeof options.construct === "function") this._construct = options.construct;
          if (options.signal) addAbortSignal(options.signal, this);
        }
        Stream.call(this, options);
        destroyImpl.construct(this, () => {
          const state = this._writableState;
          if (!state.writing) {
            clearBuffer(this, state);
          }
          finishMaybe(this, state);
        });
      }
      ObjectDefineProperty(Writable, SymbolHasInstance, {
        __proto__: null,
        value: function(object) {
          if (FunctionPrototypeSymbolHasInstance(this, object)) return true;
          if (this !== Writable) return false;
          return object && object._writableState instanceof WritableState;
        }
      });
      Writable.prototype.pipe = function() {
        errorOrDestroy(this, new ERR_STREAM_CANNOT_PIPE());
      };
      function _write(stream, chunk, encoding, cb) {
        const state = stream._writableState;
        if (typeof encoding === "function") {
          cb = encoding;
          encoding = state.defaultEncoding;
        } else {
          if (!encoding) encoding = state.defaultEncoding;
          else if (encoding !== "buffer" && !Buffer3.isEncoding(encoding)) throw new ERR_UNKNOWN_ENCODING(encoding);
          if (typeof cb !== "function") cb = nop;
        }
        if (chunk === null) {
          throw new ERR_STREAM_NULL_VALUES();
        } else if (!state.objectMode) {
          if (typeof chunk === "string") {
            if (state.decodeStrings !== false) {
              chunk = Buffer3.from(chunk, encoding);
              encoding = "buffer";
            }
          } else if (chunk instanceof Buffer3) {
            encoding = "buffer";
          } else if (Stream._isUint8Array(chunk)) {
            chunk = Stream._uint8ArrayToBuffer(chunk);
            encoding = "buffer";
          } else {
            throw new ERR_INVALID_ARG_TYPE("chunk", ["string", "Buffer", "Uint8Array"], chunk);
          }
        }
        let err;
        if (state.ending) {
          err = new ERR_STREAM_WRITE_AFTER_END();
        } else if (state.destroyed) {
          err = new ERR_STREAM_DESTROYED("write");
        }
        if (err) {
          process3.nextTick(cb, err);
          errorOrDestroy(stream, err, true);
          return err;
        }
        state.pendingcb++;
        return writeOrBuffer(stream, state, chunk, encoding, cb);
      }
      Writable.prototype.write = function(chunk, encoding, cb) {
        return _write(this, chunk, encoding, cb) === true;
      };
      Writable.prototype.cork = function() {
        this._writableState.corked++;
      };
      Writable.prototype.uncork = function() {
        const state = this._writableState;
        if (state.corked) {
          state.corked--;
          if (!state.writing) clearBuffer(this, state);
        }
      };
      Writable.prototype.setDefaultEncoding = function setDefaultEncoding(encoding) {
        if (typeof encoding === "string") encoding = StringPrototypeToLowerCase(encoding);
        if (!Buffer3.isEncoding(encoding)) throw new ERR_UNKNOWN_ENCODING(encoding);
        this._writableState.defaultEncoding = encoding;
        return this;
      };
      function writeOrBuffer(stream, state, chunk, encoding, callback) {
        const len = state.objectMode ? 1 : chunk.length;
        state.length += len;
        const ret = state.length < state.highWaterMark;
        if (!ret) state.needDrain = true;
        if (state.writing || state.corked || state.errored || !state.constructed) {
          state.buffered.push({
            chunk,
            encoding,
            callback
          });
          if (state.allBuffers && encoding !== "buffer") {
            state.allBuffers = false;
          }
          if (state.allNoop && callback !== nop) {
            state.allNoop = false;
          }
        } else {
          state.writelen = len;
          state.writecb = callback;
          state.writing = true;
          state.sync = true;
          stream._write(chunk, encoding, state.onwrite);
          state.sync = false;
        }
        return ret && !state.errored && !state.destroyed;
      }
      function doWrite(stream, state, writev, len, chunk, encoding, cb) {
        state.writelen = len;
        state.writecb = cb;
        state.writing = true;
        state.sync = true;
        if (state.destroyed) state.onwrite(new ERR_STREAM_DESTROYED("write"));
        else if (writev) stream._writev(chunk, state.onwrite);
        else stream._write(chunk, encoding, state.onwrite);
        state.sync = false;
      }
      function onwriteError(stream, state, er, cb) {
        --state.pendingcb;
        cb(er);
        errorBuffer(state);
        errorOrDestroy(stream, er);
      }
      function onwrite(stream, er) {
        const state = stream._writableState;
        const sync = state.sync;
        const cb = state.writecb;
        if (typeof cb !== "function") {
          errorOrDestroy(stream, new ERR_MULTIPLE_CALLBACK());
          return;
        }
        state.writing = false;
        state.writecb = null;
        state.length -= state.writelen;
        state.writelen = 0;
        if (er) {
          er.stack;
          if (!state.errored) {
            state.errored = er;
          }
          if (stream._readableState && !stream._readableState.errored) {
            stream._readableState.errored = er;
          }
          if (sync) {
            process3.nextTick(onwriteError, stream, state, er, cb);
          } else {
            onwriteError(stream, state, er, cb);
          }
        } else {
          if (state.buffered.length > state.bufferedIndex) {
            clearBuffer(stream, state);
          }
          if (sync) {
            if (state.afterWriteTickInfo !== null && state.afterWriteTickInfo.cb === cb) {
              state.afterWriteTickInfo.count++;
            } else {
              state.afterWriteTickInfo = {
                count: 1,
                cb,
                stream,
                state
              };
              process3.nextTick(afterWriteTick, state.afterWriteTickInfo);
            }
          } else {
            afterWrite(stream, state, 1, cb);
          }
        }
      }
      function afterWriteTick({ stream, state, count, cb }) {
        state.afterWriteTickInfo = null;
        return afterWrite(stream, state, count, cb);
      }
      function afterWrite(stream, state, count, cb) {
        const needDrain = !state.ending && !stream.destroyed && state.length === 0 && state.needDrain;
        if (needDrain) {
          state.needDrain = false;
          stream.emit("drain");
        }
        while (count-- > 0) {
          state.pendingcb--;
          cb();
        }
        if (state.destroyed) {
          errorBuffer(state);
        }
        finishMaybe(stream, state);
      }
      function errorBuffer(state) {
        if (state.writing) {
          return;
        }
        for (let n = state.bufferedIndex; n < state.buffered.length; ++n) {
          var _state$errored;
          const { chunk, callback } = state.buffered[n];
          const len = state.objectMode ? 1 : chunk.length;
          state.length -= len;
          callback(
            (_state$errored = state.errored) !== null && _state$errored !== void 0 ? _state$errored : new ERR_STREAM_DESTROYED("write")
          );
        }
        const onfinishCallbacks = state[kOnFinished].splice(0);
        for (let i = 0; i < onfinishCallbacks.length; i++) {
          var _state$errored2;
          onfinishCallbacks[i](
            (_state$errored2 = state.errored) !== null && _state$errored2 !== void 0 ? _state$errored2 : new ERR_STREAM_DESTROYED("end")
          );
        }
        resetBuffer(state);
      }
      function clearBuffer(stream, state) {
        if (state.corked || state.bufferProcessing || state.destroyed || !state.constructed) {
          return;
        }
        const { buffered, bufferedIndex, objectMode } = state;
        const bufferedLength = buffered.length - bufferedIndex;
        if (!bufferedLength) {
          return;
        }
        let i = bufferedIndex;
        state.bufferProcessing = true;
        if (bufferedLength > 1 && stream._writev) {
          state.pendingcb -= bufferedLength - 1;
          const callback = state.allNoop ? nop : (err) => {
            for (let n = i; n < buffered.length; ++n) {
              buffered[n].callback(err);
            }
          };
          const chunks = state.allNoop && i === 0 ? buffered : ArrayPrototypeSlice(buffered, i);
          chunks.allBuffers = state.allBuffers;
          doWrite(stream, state, true, state.length, chunks, "", callback);
          resetBuffer(state);
        } else {
          do {
            const { chunk, encoding, callback } = buffered[i];
            buffered[i++] = null;
            const len = objectMode ? 1 : chunk.length;
            doWrite(stream, state, false, len, chunk, encoding, callback);
          } while (i < buffered.length && !state.writing);
          if (i === buffered.length) {
            resetBuffer(state);
          } else if (i > 256) {
            buffered.splice(0, i);
            state.bufferedIndex = 0;
          } else {
            state.bufferedIndex = i;
          }
        }
        state.bufferProcessing = false;
      }
      Writable.prototype._write = function(chunk, encoding, cb) {
        if (this._writev) {
          this._writev(
            [
              {
                chunk,
                encoding
              }
            ],
            cb
          );
        } else {
          throw new ERR_METHOD_NOT_IMPLEMENTED("_write()");
        }
      };
      Writable.prototype._writev = null;
      Writable.prototype.end = function(chunk, encoding, cb) {
        const state = this._writableState;
        if (typeof chunk === "function") {
          cb = chunk;
          chunk = null;
          encoding = null;
        } else if (typeof encoding === "function") {
          cb = encoding;
          encoding = null;
        }
        let err;
        if (chunk !== null && chunk !== void 0) {
          const ret = _write(this, chunk, encoding);
          if (ret instanceof Error2) {
            err = ret;
          }
        }
        if (state.corked) {
          state.corked = 1;
          this.uncork();
        }
        if (err) {
        } else if (!state.errored && !state.ending) {
          state.ending = true;
          finishMaybe(this, state, true);
          state.ended = true;
        } else if (state.finished) {
          err = new ERR_STREAM_ALREADY_FINISHED("end");
        } else if (state.destroyed) {
          err = new ERR_STREAM_DESTROYED("end");
        }
        if (typeof cb === "function") {
          if (err || state.finished) {
            process3.nextTick(cb, err);
          } else {
            state[kOnFinished].push(cb);
          }
        }
        return this;
      };
      function needFinish(state) {
        return state.ending && !state.destroyed && state.constructed && state.length === 0 && !state.errored && state.buffered.length === 0 && !state.finished && !state.writing && !state.errorEmitted && !state.closeEmitted;
      }
      function callFinal(stream, state) {
        let called = false;
        function onFinish(err) {
          if (called) {
            errorOrDestroy(stream, err !== null && err !== void 0 ? err : ERR_MULTIPLE_CALLBACK());
            return;
          }
          called = true;
          state.pendingcb--;
          if (err) {
            const onfinishCallbacks = state[kOnFinished].splice(0);
            for (let i = 0; i < onfinishCallbacks.length; i++) {
              onfinishCallbacks[i](err);
            }
            errorOrDestroy(stream, err, state.sync);
          } else if (needFinish(state)) {
            state.prefinished = true;
            stream.emit("prefinish");
            state.pendingcb++;
            process3.nextTick(finish, stream, state);
          }
        }
        state.sync = true;
        state.pendingcb++;
        try {
          stream._final(onFinish);
        } catch (err) {
          onFinish(err);
        }
        state.sync = false;
      }
      function prefinish(stream, state) {
        if (!state.prefinished && !state.finalCalled) {
          if (typeof stream._final === "function" && !state.destroyed) {
            state.finalCalled = true;
            callFinal(stream, state);
          } else {
            state.prefinished = true;
            stream.emit("prefinish");
          }
        }
      }
      function finishMaybe(stream, state, sync) {
        if (needFinish(state)) {
          prefinish(stream, state);
          if (state.pendingcb === 0) {
            if (sync) {
              state.pendingcb++;
              process3.nextTick(
                (stream2, state2) => {
                  if (needFinish(state2)) {
                    finish(stream2, state2);
                  } else {
                    state2.pendingcb--;
                  }
                },
                stream,
                state
              );
            } else if (needFinish(state)) {
              state.pendingcb++;
              finish(stream, state);
            }
          }
        }
      }
      function finish(stream, state) {
        state.pendingcb--;
        state.finished = true;
        const onfinishCallbacks = state[kOnFinished].splice(0);
        for (let i = 0; i < onfinishCallbacks.length; i++) {
          onfinishCallbacks[i]();
        }
        stream.emit("finish");
        if (state.autoDestroy) {
          const rState = stream._readableState;
          const autoDestroy = !rState || rState.autoDestroy && // We don't expect the readable to ever 'end'
          // if readable is explicitly set to false.
          (rState.endEmitted || rState.readable === false);
          if (autoDestroy) {
            stream.destroy();
          }
        }
      }
      ObjectDefineProperties(Writable.prototype, {
        closed: {
          __proto__: null,
          get() {
            return this._writableState ? this._writableState.closed : false;
          }
        },
        destroyed: {
          __proto__: null,
          get() {
            return this._writableState ? this._writableState.destroyed : false;
          },
          set(value) {
            if (this._writableState) {
              this._writableState.destroyed = value;
            }
          }
        },
        writable: {
          __proto__: null,
          get() {
            const w = this._writableState;
            return !!w && w.writable !== false && !w.destroyed && !w.errored && !w.ending && !w.ended;
          },
          set(val) {
            if (this._writableState) {
              this._writableState.writable = !!val;
            }
          }
        },
        writableFinished: {
          __proto__: null,
          get() {
            return this._writableState ? this._writableState.finished : false;
          }
        },
        writableObjectMode: {
          __proto__: null,
          get() {
            return this._writableState ? this._writableState.objectMode : false;
          }
        },
        writableBuffer: {
          __proto__: null,
          get() {
            return this._writableState && this._writableState.getBuffer();
          }
        },
        writableEnded: {
          __proto__: null,
          get() {
            return this._writableState ? this._writableState.ending : false;
          }
        },
        writableNeedDrain: {
          __proto__: null,
          get() {
            const wState = this._writableState;
            if (!wState) return false;
            return !wState.destroyed && !wState.ending && wState.needDrain;
          }
        },
        writableHighWaterMark: {
          __proto__: null,
          get() {
            return this._writableState && this._writableState.highWaterMark;
          }
        },
        writableCorked: {
          __proto__: null,
          get() {
            return this._writableState ? this._writableState.corked : 0;
          }
        },
        writableLength: {
          __proto__: null,
          get() {
            return this._writableState && this._writableState.length;
          }
        },
        errored: {
          __proto__: null,
          enumerable: false,
          get() {
            return this._writableState ? this._writableState.errored : null;
          }
        },
        writableAborted: {
          __proto__: null,
          enumerable: false,
          get: function() {
            return !!(this._writableState.writable !== false && (this._writableState.destroyed || this._writableState.errored) && !this._writableState.finished);
          }
        }
      });
      var destroy = destroyImpl.destroy;
      Writable.prototype.destroy = function(err, cb) {
        const state = this._writableState;
        if (!state.destroyed && (state.bufferedIndex < state.buffered.length || state[kOnFinished].length)) {
          process3.nextTick(errorBuffer, state);
        }
        destroy.call(this, err, cb);
        return this;
      };
      Writable.prototype._undestroy = destroyImpl.undestroy;
      Writable.prototype._destroy = function(err, cb) {
        cb(err);
      };
      Writable.prototype[EE.captureRejectionSymbol] = function(err) {
        this.destroy(err);
      };
      var webStreamsAdapters;
      function lazyWebStreams() {
        if (webStreamsAdapters === void 0) webStreamsAdapters = {};
        return webStreamsAdapters;
      }
      Writable.fromWeb = function(writableStream, options) {
        return lazyWebStreams().newStreamWritableFromWritableStream(writableStream, options);
      };
      Writable.toWeb = function(streamWritable) {
        return lazyWebStreams().newWritableStreamFromStreamWritable(streamWritable);
      };
    }
  });

  // node_modules/readable-stream/lib/internal/streams/duplexify.js
  var require_duplexify = __commonJS({
    "node_modules/readable-stream/lib/internal/streams/duplexify.js"(exports8, module) {
      init_dirname();
      init_buffer2();
      init_process2();
      var process3 = require_browser2();
      var bufferModule = (init_buffer(), __toCommonJS(buffer_exports));
      var {
        isReadable,
        isWritable,
        isIterable,
        isNodeStream,
        isReadableNodeStream,
        isWritableNodeStream,
        isDuplexNodeStream,
        isReadableStream,
        isWritableStream
      } = require_utils();
      var eos = require_end_of_stream();
      var {
        AbortError,
        codes: { ERR_INVALID_ARG_TYPE, ERR_INVALID_RETURN_VALUE }
      } = require_errors();
      var { destroyer } = require_destroy();
      var Duplex = require_duplex();
      var Readable = require_readable();
      var Writable = require_writable();
      var { createDeferredPromise } = require_util();
      var from = require_from();
      var Blob2 = globalThis.Blob || bufferModule.Blob;
      var isBlob = typeof Blob2 !== "undefined" ? function isBlob2(b) {
        return b instanceof Blob2;
      } : function isBlob2(b) {
        return false;
      };
      var AbortController = globalThis.AbortController || require_browser().AbortController;
      var { FunctionPrototypeCall } = require_primordials();
      var Duplexify = class extends Duplex {
        constructor(options) {
          super(options);
          if ((options === null || options === void 0 ? void 0 : options.readable) === false) {
            this._readableState.readable = false;
            this._readableState.ended = true;
            this._readableState.endEmitted = true;
          }
          if ((options === null || options === void 0 ? void 0 : options.writable) === false) {
            this._writableState.writable = false;
            this._writableState.ending = true;
            this._writableState.ended = true;
            this._writableState.finished = true;
          }
        }
      };
      module.exports = function duplexify(body, name2) {
        if (isDuplexNodeStream(body)) {
          return body;
        }
        if (isReadableNodeStream(body)) {
          return _duplexify({
            readable: body
          });
        }
        if (isWritableNodeStream(body)) {
          return _duplexify({
            writable: body
          });
        }
        if (isNodeStream(body)) {
          return _duplexify({
            writable: false,
            readable: false
          });
        }
        if (isReadableStream(body)) {
          return _duplexify({
            readable: Readable.fromWeb(body)
          });
        }
        if (isWritableStream(body)) {
          return _duplexify({
            writable: Writable.fromWeb(body)
          });
        }
        if (typeof body === "function") {
          const { value, write, final, destroy } = fromAsyncGen(body);
          if (isIterable(value)) {
            return from(Duplexify, value, {
              // TODO (ronag): highWaterMark?
              objectMode: true,
              write,
              final,
              destroy
            });
          }
          const then2 = value === null || value === void 0 ? void 0 : value.then;
          if (typeof then2 === "function") {
            let d;
            const promise = FunctionPrototypeCall(
              then2,
              value,
              (val) => {
                if (val != null) {
                  throw new ERR_INVALID_RETURN_VALUE("nully", "body", val);
                }
              },
              (err) => {
                destroyer(d, err);
              }
            );
            return d = new Duplexify({
              // TODO (ronag): highWaterMark?
              objectMode: true,
              readable: false,
              write,
              final(cb) {
                final(async () => {
                  try {
                    await promise;
                    process3.nextTick(cb, null);
                  } catch (err) {
                    process3.nextTick(cb, err);
                  }
                });
              },
              destroy
            });
          }
          throw new ERR_INVALID_RETURN_VALUE("Iterable, AsyncIterable or AsyncFunction", name2, value);
        }
        if (isBlob(body)) {
          return duplexify(body.arrayBuffer());
        }
        if (isIterable(body)) {
          return from(Duplexify, body, {
            // TODO (ronag): highWaterMark?
            objectMode: true,
            writable: false
          });
        }
        if (isReadableStream(body === null || body === void 0 ? void 0 : body.readable) && isWritableStream(body === null || body === void 0 ? void 0 : body.writable)) {
          return Duplexify.fromWeb(body);
        }
        if (typeof (body === null || body === void 0 ? void 0 : body.writable) === "object" || typeof (body === null || body === void 0 ? void 0 : body.readable) === "object") {
          const readable = body !== null && body !== void 0 && body.readable ? isReadableNodeStream(body === null || body === void 0 ? void 0 : body.readable) ? body === null || body === void 0 ? void 0 : body.readable : duplexify(body.readable) : void 0;
          const writable = body !== null && body !== void 0 && body.writable ? isWritableNodeStream(body === null || body === void 0 ? void 0 : body.writable) ? body === null || body === void 0 ? void 0 : body.writable : duplexify(body.writable) : void 0;
          return _duplexify({
            readable,
            writable
          });
        }
        const then = body === null || body === void 0 ? void 0 : body.then;
        if (typeof then === "function") {
          let d;
          FunctionPrototypeCall(
            then,
            body,
            (val) => {
              if (val != null) {
                d.push(val);
              }
              d.push(null);
            },
            (err) => {
              destroyer(d, err);
            }
          );
          return d = new Duplexify({
            objectMode: true,
            writable: false,
            read() {
            }
          });
        }
        throw new ERR_INVALID_ARG_TYPE(
          name2,
          [
            "Blob",
            "ReadableStream",
            "WritableStream",
            "Stream",
            "Iterable",
            "AsyncIterable",
            "Function",
            "{ readable, writable } pair",
            "Promise"
          ],
          body
        );
      };
      function fromAsyncGen(fn) {
        let { promise, resolve: resolve2 } = createDeferredPromise();
        const ac = new AbortController();
        const signal = ac.signal;
        const value = fn(
          async function* () {
            while (true) {
              const _promise = promise;
              promise = null;
              const { chunk, done, cb } = await _promise;
              process3.nextTick(cb);
              if (done) return;
              if (signal.aborted)
                throw new AbortError(void 0, {
                  cause: signal.reason
                });
              ({ promise, resolve: resolve2 } = createDeferredPromise());
              yield chunk;
            }
          }(),
          {
            signal
          }
        );
        return {
          value,
          write(chunk, encoding, cb) {
            const _resolve = resolve2;
            resolve2 = null;
            _resolve({
              chunk,
              done: false,
              cb
            });
          },
          final(cb) {
            const _resolve = resolve2;
            resolve2 = null;
            _resolve({
              done: true,
              cb
            });
          },
          destroy(err, cb) {
            ac.abort();
            cb(err);
          }
        };
      }
      function _duplexify(pair) {
        const r = pair.readable && typeof pair.readable.read !== "function" ? Readable.wrap(pair.readable) : pair.readable;
        const w = pair.writable;
        let readable = !!isReadable(r);
        let writable = !!isWritable(w);
        let ondrain;
        let onfinish;
        let onreadable;
        let onclose;
        let d;
        function onfinished(err) {
          const cb = onclose;
          onclose = null;
          if (cb) {
            cb(err);
          } else if (err) {
            d.destroy(err);
          }
        }
        d = new Duplexify({
          // TODO (ronag): highWaterMark?
          readableObjectMode: !!(r !== null && r !== void 0 && r.readableObjectMode),
          writableObjectMode: !!(w !== null && w !== void 0 && w.writableObjectMode),
          readable,
          writable
        });
        if (writable) {
          eos(w, (err) => {
            writable = false;
            if (err) {
              destroyer(r, err);
            }
            onfinished(err);
          });
          d._write = function(chunk, encoding, callback) {
            if (w.write(chunk, encoding)) {
              callback();
            } else {
              ondrain = callback;
            }
          };
          d._final = function(callback) {
            w.end();
            onfinish = callback;
          };
          w.on("drain", function() {
            if (ondrain) {
              const cb = ondrain;
              ondrain = null;
              cb();
            }
          });
          w.on("finish", function() {
            if (onfinish) {
              const cb = onfinish;
              onfinish = null;
              cb();
            }
          });
        }
        if (readable) {
          eos(r, (err) => {
            readable = false;
            if (err) {
              destroyer(r, err);
            }
            onfinished(err);
          });
          r.on("readable", function() {
            if (onreadable) {
              const cb = onreadable;
              onreadable = null;
              cb();
            }
          });
          r.on("end", function() {
            d.push(null);
          });
          d._read = function() {
            while (true) {
              const buf = r.read();
              if (buf === null) {
                onreadable = d._read;
                return;
              }
              if (!d.push(buf)) {
                return;
              }
            }
          };
        }
        d._destroy = function(err, callback) {
          if (!err && onclose !== null) {
            err = new AbortError();
          }
          onreadable = null;
          ondrain = null;
          onfinish = null;
          if (onclose === null) {
            callback(err);
          } else {
            onclose = callback;
            destroyer(w, err);
            destroyer(r, err);
          }
        };
        return d;
      }
    }
  });

  // node_modules/readable-stream/lib/internal/streams/duplex.js
  var require_duplex = __commonJS({
    "node_modules/readable-stream/lib/internal/streams/duplex.js"(exports8, module) {
      "use strict";
      init_dirname();
      init_buffer2();
      init_process2();
      var {
        ObjectDefineProperties,
        ObjectGetOwnPropertyDescriptor,
        ObjectKeys,
        ObjectSetPrototypeOf
      } = require_primordials();
      module.exports = Duplex;
      var Readable = require_readable();
      var Writable = require_writable();
      ObjectSetPrototypeOf(Duplex.prototype, Readable.prototype);
      ObjectSetPrototypeOf(Duplex, Readable);
      {
        const keys = ObjectKeys(Writable.prototype);
        for (let i = 0; i < keys.length; i++) {
          const method = keys[i];
          if (!Duplex.prototype[method]) Duplex.prototype[method] = Writable.prototype[method];
        }
      }
      function Duplex(options) {
        if (!(this instanceof Duplex)) return new Duplex(options);
        Readable.call(this, options);
        Writable.call(this, options);
        if (options) {
          this.allowHalfOpen = options.allowHalfOpen !== false;
          if (options.readable === false) {
            this._readableState.readable = false;
            this._readableState.ended = true;
            this._readableState.endEmitted = true;
          }
          if (options.writable === false) {
            this._writableState.writable = false;
            this._writableState.ending = true;
            this._writableState.ended = true;
            this._writableState.finished = true;
          }
        } else {
          this.allowHalfOpen = true;
        }
      }
      ObjectDefineProperties(Duplex.prototype, {
        writable: {
          __proto__: null,
          ...ObjectGetOwnPropertyDescriptor(Writable.prototype, "writable")
        },
        writableHighWaterMark: {
          __proto__: null,
          ...ObjectGetOwnPropertyDescriptor(Writable.prototype, "writableHighWaterMark")
        },
        writableObjectMode: {
          __proto__: null,
          ...ObjectGetOwnPropertyDescriptor(Writable.prototype, "writableObjectMode")
        },
        writableBuffer: {
          __proto__: null,
          ...ObjectGetOwnPropertyDescriptor(Writable.prototype, "writableBuffer")
        },
        writableLength: {
          __proto__: null,
          ...ObjectGetOwnPropertyDescriptor(Writable.prototype, "writableLength")
        },
        writableFinished: {
          __proto__: null,
          ...ObjectGetOwnPropertyDescriptor(Writable.prototype, "writableFinished")
        },
        writableCorked: {
          __proto__: null,
          ...ObjectGetOwnPropertyDescriptor(Writable.prototype, "writableCorked")
        },
        writableEnded: {
          __proto__: null,
          ...ObjectGetOwnPropertyDescriptor(Writable.prototype, "writableEnded")
        },
        writableNeedDrain: {
          __proto__: null,
          ...ObjectGetOwnPropertyDescriptor(Writable.prototype, "writableNeedDrain")
        },
        destroyed: {
          __proto__: null,
          get() {
            if (this._readableState === void 0 || this._writableState === void 0) {
              return false;
            }
            return this._readableState.destroyed && this._writableState.destroyed;
          },
          set(value) {
            if (this._readableState && this._writableState) {
              this._readableState.destroyed = value;
              this._writableState.destroyed = value;
            }
          }
        }
      });
      var webStreamsAdapters;
      function lazyWebStreams() {
        if (webStreamsAdapters === void 0) webStreamsAdapters = {};
        return webStreamsAdapters;
      }
      Duplex.fromWeb = function(pair, options) {
        return lazyWebStreams().newStreamDuplexFromReadableWritablePair(pair, options);
      };
      Duplex.toWeb = function(duplex) {
        return lazyWebStreams().newReadableWritablePairFromDuplex(duplex);
      };
      var duplexify;
      Duplex.from = function(body) {
        if (!duplexify) {
          duplexify = require_duplexify();
        }
        return duplexify(body, "body");
      };
    }
  });

  // node_modules/readable-stream/lib/internal/streams/transform.js
  var require_transform = __commonJS({
    "node_modules/readable-stream/lib/internal/streams/transform.js"(exports8, module) {
      "use strict";
      init_dirname();
      init_buffer2();
      init_process2();
      var { ObjectSetPrototypeOf, Symbol: Symbol2 } = require_primordials();
      module.exports = Transform;
      var { ERR_METHOD_NOT_IMPLEMENTED } = require_errors().codes;
      var Duplex = require_duplex();
      var { getHighWaterMark } = require_state();
      ObjectSetPrototypeOf(Transform.prototype, Duplex.prototype);
      ObjectSetPrototypeOf(Transform, Duplex);
      var kCallback = Symbol2("kCallback");
      function Transform(options) {
        if (!(this instanceof Transform)) return new Transform(options);
        const readableHighWaterMark = options ? getHighWaterMark(this, options, "readableHighWaterMark", true) : null;
        if (readableHighWaterMark === 0) {
          options = {
            ...options,
            highWaterMark: null,
            readableHighWaterMark,
            // TODO (ronag): 0 is not optimal since we have
            // a "bug" where we check needDrain before calling _write and not after.
            // Refs: https://github.com/nodejs/node/pull/32887
            // Refs: https://github.com/nodejs/node/pull/35941
            writableHighWaterMark: options.writableHighWaterMark || 0
          };
        }
        Duplex.call(this, options);
        this._readableState.sync = false;
        this[kCallback] = null;
        if (options) {
          if (typeof options.transform === "function") this._transform = options.transform;
          if (typeof options.flush === "function") this._flush = options.flush;
        }
        this.on("prefinish", prefinish);
      }
      function final(cb) {
        if (typeof this._flush === "function" && !this.destroyed) {
          this._flush((er, data) => {
            if (er) {
              if (cb) {
                cb(er);
              } else {
                this.destroy(er);
              }
              return;
            }
            if (data != null) {
              this.push(data);
            }
            this.push(null);
            if (cb) {
              cb();
            }
          });
        } else {
          this.push(null);
          if (cb) {
            cb();
          }
        }
      }
      function prefinish() {
        if (this._final !== final) {
          final.call(this);
        }
      }
      Transform.prototype._final = final;
      Transform.prototype._transform = function(chunk, encoding, callback) {
        throw new ERR_METHOD_NOT_IMPLEMENTED("_transform()");
      };
      Transform.prototype._write = function(chunk, encoding, callback) {
        const rState = this._readableState;
        const wState = this._writableState;
        const length = rState.length;
        this._transform(chunk, encoding, (err, val) => {
          if (err) {
            callback(err);
            return;
          }
          if (val != null) {
            this.push(val);
          }
          if (wState.ended || // Backwards compat.
          length === rState.length || // Backwards compat.
          rState.length < rState.highWaterMark) {
            callback();
          } else {
            this[kCallback] = callback;
          }
        });
      };
      Transform.prototype._read = function() {
        if (this[kCallback]) {
          const callback = this[kCallback];
          this[kCallback] = null;
          callback();
        }
      };
    }
  });

  // node_modules/readable-stream/lib/internal/streams/passthrough.js
  var require_passthrough = __commonJS({
    "node_modules/readable-stream/lib/internal/streams/passthrough.js"(exports8, module) {
      "use strict";
      init_dirname();
      init_buffer2();
      init_process2();
      var { ObjectSetPrototypeOf } = require_primordials();
      module.exports = PassThrough;
      var Transform = require_transform();
      ObjectSetPrototypeOf(PassThrough.prototype, Transform.prototype);
      ObjectSetPrototypeOf(PassThrough, Transform);
      function PassThrough(options) {
        if (!(this instanceof PassThrough)) return new PassThrough(options);
        Transform.call(this, options);
      }
      PassThrough.prototype._transform = function(chunk, encoding, cb) {
        cb(null, chunk);
      };
    }
  });

  // node_modules/readable-stream/lib/internal/streams/pipeline.js
  var require_pipeline = __commonJS({
    "node_modules/readable-stream/lib/internal/streams/pipeline.js"(exports8, module) {
      init_dirname();
      init_buffer2();
      init_process2();
      var process3 = require_browser2();
      var { ArrayIsArray, Promise: Promise2, SymbolAsyncIterator, SymbolDispose } = require_primordials();
      var eos = require_end_of_stream();
      var { once: once4 } = require_util();
      var destroyImpl = require_destroy();
      var Duplex = require_duplex();
      var {
        aggregateTwoErrors,
        codes: {
          ERR_INVALID_ARG_TYPE,
          ERR_INVALID_RETURN_VALUE,
          ERR_MISSING_ARGS,
          ERR_STREAM_DESTROYED,
          ERR_STREAM_PREMATURE_CLOSE
        },
        AbortError
      } = require_errors();
      var { validateFunction, validateAbortSignal } = require_validators();
      var {
        isIterable,
        isReadable,
        isReadableNodeStream,
        isNodeStream,
        isTransformStream,
        isWebStream,
        isReadableStream,
        isReadableFinished
      } = require_utils();
      var AbortController = globalThis.AbortController || require_browser().AbortController;
      var PassThrough;
      var Readable;
      var addAbortListener;
      function destroyer(stream, reading, writing) {
        let finished = false;
        stream.on("close", () => {
          finished = true;
        });
        const cleanup = eos(
          stream,
          {
            readable: reading,
            writable: writing
          },
          (err) => {
            finished = !err;
          }
        );
        return {
          destroy: (err) => {
            if (finished) return;
            finished = true;
            destroyImpl.destroyer(stream, err || new ERR_STREAM_DESTROYED("pipe"));
          },
          cleanup
        };
      }
      function popCallback(streams) {
        validateFunction(streams[streams.length - 1], "streams[stream.length - 1]");
        return streams.pop();
      }
      function makeAsyncIterable(val) {
        if (isIterable(val)) {
          return val;
        } else if (isReadableNodeStream(val)) {
          return fromReadable(val);
        }
        throw new ERR_INVALID_ARG_TYPE("val", ["Readable", "Iterable", "AsyncIterable"], val);
      }
      async function* fromReadable(val) {
        if (!Readable) {
          Readable = require_readable();
        }
        yield* Readable.prototype[SymbolAsyncIterator].call(val);
      }
      async function pumpToNode(iterable, writable, finish, { end }) {
        let error;
        let onresolve = null;
        const resume = (err) => {
          if (err) {
            error = err;
          }
          if (onresolve) {
            const callback = onresolve;
            onresolve = null;
            callback();
          }
        };
        const wait = () => new Promise2((resolve2, reject) => {
          if (error) {
            reject(error);
          } else {
            onresolve = () => {
              if (error) {
                reject(error);
              } else {
                resolve2();
              }
            };
          }
        });
        writable.on("drain", resume);
        const cleanup = eos(
          writable,
          {
            readable: false
          },
          resume
        );
        try {
          if (writable.writableNeedDrain) {
            await wait();
          }
          for await (const chunk of iterable) {
            if (!writable.write(chunk)) {
              await wait();
            }
          }
          if (end) {
            writable.end();
            await wait();
          }
          finish();
        } catch (err) {
          finish(error !== err ? aggregateTwoErrors(error, err) : err);
        } finally {
          cleanup();
          writable.off("drain", resume);
        }
      }
      async function pumpToWeb(readable, writable, finish, { end }) {
        if (isTransformStream(writable)) {
          writable = writable.writable;
        }
        const writer = writable.getWriter();
        try {
          for await (const chunk of readable) {
            await writer.ready;
            writer.write(chunk).catch(() => {
            });
          }
          await writer.ready;
          if (end) {
            await writer.close();
          }
          finish();
        } catch (err) {
          try {
            await writer.abort(err);
            finish(err);
          } catch (err2) {
            finish(err2);
          }
        }
      }
      function pipeline(...streams) {
        return pipelineImpl(streams, once4(popCallback(streams)));
      }
      function pipelineImpl(streams, callback, opts) {
        if (streams.length === 1 && ArrayIsArray(streams[0])) {
          streams = streams[0];
        }
        if (streams.length < 2) {
          throw new ERR_MISSING_ARGS("streams");
        }
        const ac = new AbortController();
        const signal = ac.signal;
        const outerSignal = opts === null || opts === void 0 ? void 0 : opts.signal;
        const lastStreamCleanup = [];
        validateAbortSignal(outerSignal, "options.signal");
        function abort3() {
          finishImpl(new AbortError());
        }
        addAbortListener = addAbortListener || require_util().addAbortListener;
        let disposable;
        if (outerSignal) {
          disposable = addAbortListener(outerSignal, abort3);
        }
        let error;
        let value;
        const destroys = [];
        let finishCount = 0;
        function finish(err) {
          finishImpl(err, --finishCount === 0);
        }
        function finishImpl(err, final) {
          var _disposable;
          if (err && (!error || error.code === "ERR_STREAM_PREMATURE_CLOSE")) {
            error = err;
          }
          if (!error && !final) {
            return;
          }
          while (destroys.length) {
            destroys.shift()(error);
          }
          ;
          (_disposable = disposable) === null || _disposable === void 0 ? void 0 : _disposable[SymbolDispose]();
          ac.abort();
          if (final) {
            if (!error) {
              lastStreamCleanup.forEach((fn) => fn());
            }
            process3.nextTick(callback, error, value);
          }
        }
        let ret;
        for (let i = 0; i < streams.length; i++) {
          const stream = streams[i];
          const reading = i < streams.length - 1;
          const writing = i > 0;
          const end = reading || (opts === null || opts === void 0 ? void 0 : opts.end) !== false;
          const isLastStream = i === streams.length - 1;
          if (isNodeStream(stream)) {
            let onError2 = function(err) {
              if (err && err.name !== "AbortError" && err.code !== "ERR_STREAM_PREMATURE_CLOSE") {
                finish(err);
              }
            };
            var onError = onError2;
            if (end) {
              const { destroy, cleanup } = destroyer(stream, reading, writing);
              destroys.push(destroy);
              if (isReadable(stream) && isLastStream) {
                lastStreamCleanup.push(cleanup);
              }
            }
            stream.on("error", onError2);
            if (isReadable(stream) && isLastStream) {
              lastStreamCleanup.push(() => {
                stream.removeListener("error", onError2);
              });
            }
          }
          if (i === 0) {
            if (typeof stream === "function") {
              ret = stream({
                signal
              });
              if (!isIterable(ret)) {
                throw new ERR_INVALID_RETURN_VALUE("Iterable, AsyncIterable or Stream", "source", ret);
              }
            } else if (isIterable(stream) || isReadableNodeStream(stream) || isTransformStream(stream)) {
              ret = stream;
            } else {
              ret = Duplex.from(stream);
            }
          } else if (typeof stream === "function") {
            if (isTransformStream(ret)) {
              var _ret;
              ret = makeAsyncIterable((_ret = ret) === null || _ret === void 0 ? void 0 : _ret.readable);
            } else {
              ret = makeAsyncIterable(ret);
            }
            ret = stream(ret, {
              signal
            });
            if (reading) {
              if (!isIterable(ret, true)) {
                throw new ERR_INVALID_RETURN_VALUE("AsyncIterable", `transform[${i - 1}]`, ret);
              }
            } else {
              var _ret2;
              if (!PassThrough) {
                PassThrough = require_passthrough();
              }
              const pt = new PassThrough({
                objectMode: true
              });
              const then = (_ret2 = ret) === null || _ret2 === void 0 ? void 0 : _ret2.then;
              if (typeof then === "function") {
                finishCount++;
                then.call(
                  ret,
                  (val) => {
                    value = val;
                    if (val != null) {
                      pt.write(val);
                    }
                    if (end) {
                      pt.end();
                    }
                    process3.nextTick(finish);
                  },
                  (err) => {
                    pt.destroy(err);
                    process3.nextTick(finish, err);
                  }
                );
              } else if (isIterable(ret, true)) {
                finishCount++;
                pumpToNode(ret, pt, finish, {
                  end
                });
              } else if (isReadableStream(ret) || isTransformStream(ret)) {
                const toRead = ret.readable || ret;
                finishCount++;
                pumpToNode(toRead, pt, finish, {
                  end
                });
              } else {
                throw new ERR_INVALID_RETURN_VALUE("AsyncIterable or Promise", "destination", ret);
              }
              ret = pt;
              const { destroy, cleanup } = destroyer(ret, false, true);
              destroys.push(destroy);
              if (isLastStream) {
                lastStreamCleanup.push(cleanup);
              }
            }
          } else if (isNodeStream(stream)) {
            if (isReadableNodeStream(ret)) {
              finishCount += 2;
              const cleanup = pipe(ret, stream, finish, {
                end
              });
              if (isReadable(stream) && isLastStream) {
                lastStreamCleanup.push(cleanup);
              }
            } else if (isTransformStream(ret) || isReadableStream(ret)) {
              const toRead = ret.readable || ret;
              finishCount++;
              pumpToNode(toRead, stream, finish, {
                end
              });
            } else if (isIterable(ret)) {
              finishCount++;
              pumpToNode(ret, stream, finish, {
                end
              });
            } else {
              throw new ERR_INVALID_ARG_TYPE(
                "val",
                ["Readable", "Iterable", "AsyncIterable", "ReadableStream", "TransformStream"],
                ret
              );
            }
            ret = stream;
          } else if (isWebStream(stream)) {
            if (isReadableNodeStream(ret)) {
              finishCount++;
              pumpToWeb(makeAsyncIterable(ret), stream, finish, {
                end
              });
            } else if (isReadableStream(ret) || isIterable(ret)) {
              finishCount++;
              pumpToWeb(ret, stream, finish, {
                end
              });
            } else if (isTransformStream(ret)) {
              finishCount++;
              pumpToWeb(ret.readable, stream, finish, {
                end
              });
            } else {
              throw new ERR_INVALID_ARG_TYPE(
                "val",
                ["Readable", "Iterable", "AsyncIterable", "ReadableStream", "TransformStream"],
                ret
              );
            }
            ret = stream;
          } else {
            ret = Duplex.from(stream);
          }
        }
        if (signal !== null && signal !== void 0 && signal.aborted || outerSignal !== null && outerSignal !== void 0 && outerSignal.aborted) {
          process3.nextTick(abort3);
        }
        return ret;
      }
      function pipe(src, dst, finish, { end }) {
        let ended = false;
        dst.on("close", () => {
          if (!ended) {
            finish(new ERR_STREAM_PREMATURE_CLOSE());
          }
        });
        src.pipe(dst, {
          end: false
        });
        if (end) {
          let endFn2 = function() {
            ended = true;
            dst.end();
          };
          var endFn = endFn2;
          if (isReadableFinished(src)) {
            process3.nextTick(endFn2);
          } else {
            src.once("end", endFn2);
          }
        } else {
          finish();
        }
        eos(
          src,
          {
            readable: true,
            writable: false
          },
          (err) => {
            const rState = src._readableState;
            if (err && err.code === "ERR_STREAM_PREMATURE_CLOSE" && rState && rState.ended && !rState.errored && !rState.errorEmitted) {
              src.once("end", finish).once("error", finish);
            } else {
              finish(err);
            }
          }
        );
        return eos(
          dst,
          {
            readable: false,
            writable: true
          },
          finish
        );
      }
      module.exports = {
        pipelineImpl,
        pipeline
      };
    }
  });

  // node_modules/readable-stream/lib/internal/streams/compose.js
  var require_compose = __commonJS({
    "node_modules/readable-stream/lib/internal/streams/compose.js"(exports8, module) {
      "use strict";
      init_dirname();
      init_buffer2();
      init_process2();
      var { pipeline } = require_pipeline();
      var Duplex = require_duplex();
      var { destroyer } = require_destroy();
      var {
        isNodeStream,
        isReadable,
        isWritable,
        isWebStream,
        isTransformStream,
        isWritableStream,
        isReadableStream
      } = require_utils();
      var {
        AbortError,
        codes: { ERR_INVALID_ARG_VALUE, ERR_MISSING_ARGS }
      } = require_errors();
      var eos = require_end_of_stream();
      module.exports = function compose(...streams) {
        if (streams.length === 0) {
          throw new ERR_MISSING_ARGS("streams");
        }
        if (streams.length === 1) {
          return Duplex.from(streams[0]);
        }
        const orgStreams = [...streams];
        if (typeof streams[0] === "function") {
          streams[0] = Duplex.from(streams[0]);
        }
        if (typeof streams[streams.length - 1] === "function") {
          const idx = streams.length - 1;
          streams[idx] = Duplex.from(streams[idx]);
        }
        for (let n = 0; n < streams.length; ++n) {
          if (!isNodeStream(streams[n]) && !isWebStream(streams[n])) {
            continue;
          }
          if (n < streams.length - 1 && !(isReadable(streams[n]) || isReadableStream(streams[n]) || isTransformStream(streams[n]))) {
            throw new ERR_INVALID_ARG_VALUE(`streams[${n}]`, orgStreams[n], "must be readable");
          }
          if (n > 0 && !(isWritable(streams[n]) || isWritableStream(streams[n]) || isTransformStream(streams[n]))) {
            throw new ERR_INVALID_ARG_VALUE(`streams[${n}]`, orgStreams[n], "must be writable");
          }
        }
        let ondrain;
        let onfinish;
        let onreadable;
        let onclose;
        let d;
        function onfinished(err) {
          const cb = onclose;
          onclose = null;
          if (cb) {
            cb(err);
          } else if (err) {
            d.destroy(err);
          } else if (!readable && !writable) {
            d.destroy();
          }
        }
        const head = streams[0];
        const tail = pipeline(streams, onfinished);
        const writable = !!(isWritable(head) || isWritableStream(head) || isTransformStream(head));
        const readable = !!(isReadable(tail) || isReadableStream(tail) || isTransformStream(tail));
        d = new Duplex({
          // TODO (ronag): highWaterMark?
          writableObjectMode: !!(head !== null && head !== void 0 && head.writableObjectMode),
          readableObjectMode: !!(tail !== null && tail !== void 0 && tail.readableObjectMode),
          writable,
          readable
        });
        if (writable) {
          if (isNodeStream(head)) {
            d._write = function(chunk, encoding, callback) {
              if (head.write(chunk, encoding)) {
                callback();
              } else {
                ondrain = callback;
              }
            };
            d._final = function(callback) {
              head.end();
              onfinish = callback;
            };
            head.on("drain", function() {
              if (ondrain) {
                const cb = ondrain;
                ondrain = null;
                cb();
              }
            });
          } else if (isWebStream(head)) {
            const writable2 = isTransformStream(head) ? head.writable : head;
            const writer = writable2.getWriter();
            d._write = async function(chunk, encoding, callback) {
              try {
                await writer.ready;
                writer.write(chunk).catch(() => {
                });
                callback();
              } catch (err) {
                callback(err);
              }
            };
            d._final = async function(callback) {
              try {
                await writer.ready;
                writer.close().catch(() => {
                });
                onfinish = callback;
              } catch (err) {
                callback(err);
              }
            };
          }
          const toRead = isTransformStream(tail) ? tail.readable : tail;
          eos(toRead, () => {
            if (onfinish) {
              const cb = onfinish;
              onfinish = null;
              cb();
            }
          });
        }
        if (readable) {
          if (isNodeStream(tail)) {
            tail.on("readable", function() {
              if (onreadable) {
                const cb = onreadable;
                onreadable = null;
                cb();
              }
            });
            tail.on("end", function() {
              d.push(null);
            });
            d._read = function() {
              while (true) {
                const buf = tail.read();
                if (buf === null) {
                  onreadable = d._read;
                  return;
                }
                if (!d.push(buf)) {
                  return;
                }
              }
            };
          } else if (isWebStream(tail)) {
            const readable2 = isTransformStream(tail) ? tail.readable : tail;
            const reader = readable2.getReader();
            d._read = async function() {
              while (true) {
                try {
                  const { value, done } = await reader.read();
                  if (!d.push(value)) {
                    return;
                  }
                  if (done) {
                    d.push(null);
                    return;
                  }
                } catch {
                  return;
                }
              }
            };
          }
        }
        d._destroy = function(err, callback) {
          if (!err && onclose !== null) {
            err = new AbortError();
          }
          onreadable = null;
          ondrain = null;
          onfinish = null;
          if (onclose === null) {
            callback(err);
          } else {
            onclose = callback;
            if (isNodeStream(tail)) {
              destroyer(tail, err);
            }
          }
        };
        return d;
      };
    }
  });

  // node_modules/readable-stream/lib/internal/streams/operators.js
  var require_operators = __commonJS({
    "node_modules/readable-stream/lib/internal/streams/operators.js"(exports8, module) {
      "use strict";
      init_dirname();
      init_buffer2();
      init_process2();
      var AbortController = globalThis.AbortController || require_browser().AbortController;
      var {
        codes: { ERR_INVALID_ARG_VALUE, ERR_INVALID_ARG_TYPE, ERR_MISSING_ARGS, ERR_OUT_OF_RANGE },
        AbortError
      } = require_errors();
      var { validateAbortSignal, validateInteger, validateObject } = require_validators();
      var kWeakHandler = require_primordials().Symbol("kWeak");
      var kResistStopPropagation = require_primordials().Symbol("kResistStopPropagation");
      var { finished } = require_end_of_stream();
      var staticCompose = require_compose();
      var { addAbortSignalNoValidate } = require_add_abort_signal();
      var { isWritable, isNodeStream } = require_utils();
      var { deprecate } = require_util();
      var {
        ArrayPrototypePush,
        Boolean: Boolean2,
        MathFloor,
        Number: Number2,
        NumberIsNaN,
        Promise: Promise2,
        PromiseReject,
        PromiseResolve,
        PromisePrototypeThen,
        Symbol: Symbol2
      } = require_primordials();
      var kEmpty = Symbol2("kEmpty");
      var kEof = Symbol2("kEof");
      function compose(stream, options) {
        if (options != null) {
          validateObject(options, "options");
        }
        if ((options === null || options === void 0 ? void 0 : options.signal) != null) {
          validateAbortSignal(options.signal, "options.signal");
        }
        if (isNodeStream(stream) && !isWritable(stream)) {
          throw new ERR_INVALID_ARG_VALUE("stream", stream, "must be writable");
        }
        const composedStream = staticCompose(this, stream);
        if (options !== null && options !== void 0 && options.signal) {
          addAbortSignalNoValidate(options.signal, composedStream);
        }
        return composedStream;
      }
      function map(fn, options) {
        if (typeof fn !== "function") {
          throw new ERR_INVALID_ARG_TYPE("fn", ["Function", "AsyncFunction"], fn);
        }
        if (options != null) {
          validateObject(options, "options");
        }
        if ((options === null || options === void 0 ? void 0 : options.signal) != null) {
          validateAbortSignal(options.signal, "options.signal");
        }
        let concurrency = 1;
        if ((options === null || options === void 0 ? void 0 : options.concurrency) != null) {
          concurrency = MathFloor(options.concurrency);
        }
        let highWaterMark = concurrency - 1;
        if ((options === null || options === void 0 ? void 0 : options.highWaterMark) != null) {
          highWaterMark = MathFloor(options.highWaterMark);
        }
        validateInteger(concurrency, "options.concurrency", 1);
        validateInteger(highWaterMark, "options.highWaterMark", 0);
        highWaterMark += concurrency;
        return async function* map2() {
          const signal = require_util().AbortSignalAny(
            [options === null || options === void 0 ? void 0 : options.signal].filter(Boolean2)
          );
          const stream = this;
          const queue3 = [];
          const signalOpt = {
            signal
          };
          let next;
          let resume;
          let done = false;
          let cnt = 0;
          function onCatch() {
            done = true;
            afterItemProcessed();
          }
          function afterItemProcessed() {
            cnt -= 1;
            maybeResume();
          }
          function maybeResume() {
            if (resume && !done && cnt < concurrency && queue3.length < highWaterMark) {
              resume();
              resume = null;
            }
          }
          async function pump() {
            try {
              for await (let val of stream) {
                if (done) {
                  return;
                }
                if (signal.aborted) {
                  throw new AbortError();
                }
                try {
                  val = fn(val, signalOpt);
                  if (val === kEmpty) {
                    continue;
                  }
                  val = PromiseResolve(val);
                } catch (err) {
                  val = PromiseReject(err);
                }
                cnt += 1;
                PromisePrototypeThen(val, afterItemProcessed, onCatch);
                queue3.push(val);
                if (next) {
                  next();
                  next = null;
                }
                if (!done && (queue3.length >= highWaterMark || cnt >= concurrency)) {
                  await new Promise2((resolve2) => {
                    resume = resolve2;
                  });
                }
              }
              queue3.push(kEof);
            } catch (err) {
              const val = PromiseReject(err);
              PromisePrototypeThen(val, afterItemProcessed, onCatch);
              queue3.push(val);
            } finally {
              done = true;
              if (next) {
                next();
                next = null;
              }
            }
          }
          pump();
          try {
            while (true) {
              while (queue3.length > 0) {
                const val = await queue3[0];
                if (val === kEof) {
                  return;
                }
                if (signal.aborted) {
                  throw new AbortError();
                }
                if (val !== kEmpty) {
                  yield val;
                }
                queue3.shift();
                maybeResume();
              }
              await new Promise2((resolve2) => {
                next = resolve2;
              });
            }
          } finally {
            done = true;
            if (resume) {
              resume();
              resume = null;
            }
          }
        }.call(this);
      }
      function asIndexedPairs(options = void 0) {
        if (options != null) {
          validateObject(options, "options");
        }
        if ((options === null || options === void 0 ? void 0 : options.signal) != null) {
          validateAbortSignal(options.signal, "options.signal");
        }
        return async function* asIndexedPairs2() {
          let index = 0;
          for await (const val of this) {
            var _options$signal;
            if (options !== null && options !== void 0 && (_options$signal = options.signal) !== null && _options$signal !== void 0 && _options$signal.aborted) {
              throw new AbortError({
                cause: options.signal.reason
              });
            }
            yield [index++, val];
          }
        }.call(this);
      }
      async function some(fn, options = void 0) {
        for await (const unused of filter.call(this, fn, options)) {
          return true;
        }
        return false;
      }
      async function every(fn, options = void 0) {
        if (typeof fn !== "function") {
          throw new ERR_INVALID_ARG_TYPE("fn", ["Function", "AsyncFunction"], fn);
        }
        return !await some.call(
          this,
          async (...args) => {
            return !await fn(...args);
          },
          options
        );
      }
      async function find(fn, options) {
        for await (const result of filter.call(this, fn, options)) {
          return result;
        }
        return void 0;
      }
      async function forEach(fn, options) {
        if (typeof fn !== "function") {
          throw new ERR_INVALID_ARG_TYPE("fn", ["Function", "AsyncFunction"], fn);
        }
        async function forEachFn(value, options2) {
          await fn(value, options2);
          return kEmpty;
        }
        for await (const unused of map.call(this, forEachFn, options)) ;
      }
      function filter(fn, options) {
        if (typeof fn !== "function") {
          throw new ERR_INVALID_ARG_TYPE("fn", ["Function", "AsyncFunction"], fn);
        }
        async function filterFn(value, options2) {
          if (await fn(value, options2)) {
            return value;
          }
          return kEmpty;
        }
        return map.call(this, filterFn, options);
      }
      var ReduceAwareErrMissingArgs = class extends ERR_MISSING_ARGS {
        constructor() {
          super("reduce");
          this.message = "Reduce of an empty stream requires an initial value";
        }
      };
      async function reduce(reducer, initialValue, options) {
        var _options$signal2;
        if (typeof reducer !== "function") {
          throw new ERR_INVALID_ARG_TYPE("reducer", ["Function", "AsyncFunction"], reducer);
        }
        if (options != null) {
          validateObject(options, "options");
        }
        if ((options === null || options === void 0 ? void 0 : options.signal) != null) {
          validateAbortSignal(options.signal, "options.signal");
        }
        let hasInitialValue = arguments.length > 1;
        if (options !== null && options !== void 0 && (_options$signal2 = options.signal) !== null && _options$signal2 !== void 0 && _options$signal2.aborted) {
          const err = new AbortError(void 0, {
            cause: options.signal.reason
          });
          this.once("error", () => {
          });
          await finished(this.destroy(err));
          throw err;
        }
        const ac = new AbortController();
        const signal = ac.signal;
        if (options !== null && options !== void 0 && options.signal) {
          const opts = {
            once: true,
            [kWeakHandler]: this,
            [kResistStopPropagation]: true
          };
          options.signal.addEventListener("abort", () => ac.abort(), opts);
        }
        let gotAnyItemFromStream = false;
        try {
          for await (const value of this) {
            var _options$signal3;
            gotAnyItemFromStream = true;
            if (options !== null && options !== void 0 && (_options$signal3 = options.signal) !== null && _options$signal3 !== void 0 && _options$signal3.aborted) {
              throw new AbortError();
            }
            if (!hasInitialValue) {
              initialValue = value;
              hasInitialValue = true;
            } else {
              initialValue = await reducer(initialValue, value, {
                signal
              });
            }
          }
          if (!gotAnyItemFromStream && !hasInitialValue) {
            throw new ReduceAwareErrMissingArgs();
          }
        } finally {
          ac.abort();
        }
        return initialValue;
      }
      async function toArray(options) {
        if (options != null) {
          validateObject(options, "options");
        }
        if ((options === null || options === void 0 ? void 0 : options.signal) != null) {
          validateAbortSignal(options.signal, "options.signal");
        }
        const result = [];
        for await (const val of this) {
          var _options$signal4;
          if (options !== null && options !== void 0 && (_options$signal4 = options.signal) !== null && _options$signal4 !== void 0 && _options$signal4.aborted) {
            throw new AbortError(void 0, {
              cause: options.signal.reason
            });
          }
          ArrayPrototypePush(result, val);
        }
        return result;
      }
      function flatMap(fn, options) {
        const values = map.call(this, fn, options);
        return async function* flatMap2() {
          for await (const val of values) {
            yield* val;
          }
        }.call(this);
      }
      function toIntegerOrInfinity(number) {
        number = Number2(number);
        if (NumberIsNaN(number)) {
          return 0;
        }
        if (number < 0) {
          throw new ERR_OUT_OF_RANGE("number", ">= 0", number);
        }
        return number;
      }
      function drop(number, options = void 0) {
        if (options != null) {
          validateObject(options, "options");
        }
        if ((options === null || options === void 0 ? void 0 : options.signal) != null) {
          validateAbortSignal(options.signal, "options.signal");
        }
        number = toIntegerOrInfinity(number);
        return async function* drop2() {
          var _options$signal5;
          if (options !== null && options !== void 0 && (_options$signal5 = options.signal) !== null && _options$signal5 !== void 0 && _options$signal5.aborted) {
            throw new AbortError();
          }
          for await (const val of this) {
            var _options$signal6;
            if (options !== null && options !== void 0 && (_options$signal6 = options.signal) !== null && _options$signal6 !== void 0 && _options$signal6.aborted) {
              throw new AbortError();
            }
            if (number-- <= 0) {
              yield val;
            }
          }
        }.call(this);
      }
      function take(number, options = void 0) {
        if (options != null) {
          validateObject(options, "options");
        }
        if ((options === null || options === void 0 ? void 0 : options.signal) != null) {
          validateAbortSignal(options.signal, "options.signal");
        }
        number = toIntegerOrInfinity(number);
        return async function* take2() {
          var _options$signal7;
          if (options !== null && options !== void 0 && (_options$signal7 = options.signal) !== null && _options$signal7 !== void 0 && _options$signal7.aborted) {
            throw new AbortError();
          }
          for await (const val of this) {
            var _options$signal8;
            if (options !== null && options !== void 0 && (_options$signal8 = options.signal) !== null && _options$signal8 !== void 0 && _options$signal8.aborted) {
              throw new AbortError();
            }
            if (number-- > 0) {
              yield val;
            }
            if (number <= 0) {
              return;
            }
          }
        }.call(this);
      }
      module.exports.streamReturningOperators = {
        asIndexedPairs: deprecate(asIndexedPairs, "readable.asIndexedPairs will be removed in a future version."),
        drop,
        filter,
        flatMap,
        map,
        take,
        compose
      };
      module.exports.promiseReturningOperators = {
        every,
        forEach,
        reduce,
        toArray,
        some,
        find
      };
    }
  });

  // node_modules/readable-stream/lib/stream/promises.js
  var require_promises = __commonJS({
    "node_modules/readable-stream/lib/stream/promises.js"(exports8, module) {
      "use strict";
      init_dirname();
      init_buffer2();
      init_process2();
      var { ArrayPrototypePop, Promise: Promise2 } = require_primordials();
      var { isIterable, isNodeStream, isWebStream } = require_utils();
      var { pipelineImpl: pl } = require_pipeline();
      var { finished } = require_end_of_stream();
      require_stream();
      function pipeline(...streams) {
        return new Promise2((resolve2, reject) => {
          let signal;
          let end;
          const lastArg = streams[streams.length - 1];
          if (lastArg && typeof lastArg === "object" && !isNodeStream(lastArg) && !isIterable(lastArg) && !isWebStream(lastArg)) {
            const options = ArrayPrototypePop(streams);
            signal = options.signal;
            end = options.end;
          }
          pl(
            streams,
            (err, value) => {
              if (err) {
                reject(err);
              } else {
                resolve2(value);
              }
            },
            {
              signal,
              end
            }
          );
        });
      }
      module.exports = {
        finished,
        pipeline
      };
    }
  });

  // node_modules/readable-stream/lib/stream.js
  var require_stream = __commonJS({
    "node_modules/readable-stream/lib/stream.js"(exports8, module) {
      "use strict";
      init_dirname();
      init_buffer2();
      init_process2();
      var { Buffer: Buffer3 } = (init_buffer(), __toCommonJS(buffer_exports));
      var { ObjectDefineProperty, ObjectKeys, ReflectApply } = require_primordials();
      var {
        promisify: { custom: customPromisify }
      } = require_util();
      var { streamReturningOperators, promiseReturningOperators } = require_operators();
      var {
        codes: { ERR_ILLEGAL_CONSTRUCTOR }
      } = require_errors();
      var compose = require_compose();
      var { setDefaultHighWaterMark, getDefaultHighWaterMark } = require_state();
      var { pipeline } = require_pipeline();
      var { destroyer } = require_destroy();
      var eos = require_end_of_stream();
      var promises = require_promises();
      var utils = require_utils();
      var Stream = module.exports = require_legacy().Stream;
      Stream.isDestroyed = utils.isDestroyed;
      Stream.isDisturbed = utils.isDisturbed;
      Stream.isErrored = utils.isErrored;
      Stream.isReadable = utils.isReadable;
      Stream.isWritable = utils.isWritable;
      Stream.Readable = require_readable();
      for (const key of ObjectKeys(streamReturningOperators)) {
        let fn = function(...args) {
          if (new.target) {
            throw ERR_ILLEGAL_CONSTRUCTOR();
          }
          return Stream.Readable.from(ReflectApply(op, this, args));
        };
        const op = streamReturningOperators[key];
        ObjectDefineProperty(fn, "name", {
          __proto__: null,
          value: op.name
        });
        ObjectDefineProperty(fn, "length", {
          __proto__: null,
          value: op.length
        });
        ObjectDefineProperty(Stream.Readable.prototype, key, {
          __proto__: null,
          value: fn,
          enumerable: false,
          configurable: true,
          writable: true
        });
      }
      for (const key of ObjectKeys(promiseReturningOperators)) {
        let fn = function(...args) {
          if (new.target) {
            throw ERR_ILLEGAL_CONSTRUCTOR();
          }
          return ReflectApply(op, this, args);
        };
        const op = promiseReturningOperators[key];
        ObjectDefineProperty(fn, "name", {
          __proto__: null,
          value: op.name
        });
        ObjectDefineProperty(fn, "length", {
          __proto__: null,
          value: op.length
        });
        ObjectDefineProperty(Stream.Readable.prototype, key, {
          __proto__: null,
          value: fn,
          enumerable: false,
          configurable: true,
          writable: true
        });
      }
      Stream.Writable = require_writable();
      Stream.Duplex = require_duplex();
      Stream.Transform = require_transform();
      Stream.PassThrough = require_passthrough();
      Stream.pipeline = pipeline;
      var { addAbortSignal } = require_add_abort_signal();
      Stream.addAbortSignal = addAbortSignal;
      Stream.finished = eos;
      Stream.destroy = destroyer;
      Stream.compose = compose;
      Stream.setDefaultHighWaterMark = setDefaultHighWaterMark;
      Stream.getDefaultHighWaterMark = getDefaultHighWaterMark;
      ObjectDefineProperty(Stream, "promises", {
        __proto__: null,
        configurable: true,
        enumerable: true,
        get() {
          return promises;
        }
      });
      ObjectDefineProperty(pipeline, customPromisify, {
        __proto__: null,
        enumerable: true,
        get() {
          return promises.pipeline;
        }
      });
      ObjectDefineProperty(eos, customPromisify, {
        __proto__: null,
        enumerable: true,
        get() {
          return promises.finished;
        }
      });
      Stream.Stream = Stream;
      Stream._isUint8Array = function isUint8Array(value) {
        return value instanceof Uint8Array;
      };
      Stream._uint8ArrayToBuffer = function _uint8ArrayToBuffer(chunk) {
        return Buffer3.from(chunk.buffer, chunk.byteOffset, chunk.byteLength);
      };
    }
  });

  // node_modules/readable-stream/lib/ours/browser.js
  var require_browser3 = __commonJS({
    "node_modules/readable-stream/lib/ours/browser.js"(exports8, module) {
      "use strict";
      init_dirname();
      init_buffer2();
      init_process2();
      var CustomStream = require_stream();
      var promises = require_promises();
      var originalDestroy = CustomStream.Readable.destroy;
      module.exports = CustomStream.Readable;
      module.exports._uint8ArrayToBuffer = CustomStream._uint8ArrayToBuffer;
      module.exports._isUint8Array = CustomStream._isUint8Array;
      module.exports.isDisturbed = CustomStream.isDisturbed;
      module.exports.isErrored = CustomStream.isErrored;
      module.exports.isReadable = CustomStream.isReadable;
      module.exports.Readable = CustomStream.Readable;
      module.exports.Writable = CustomStream.Writable;
      module.exports.Duplex = CustomStream.Duplex;
      module.exports.Transform = CustomStream.Transform;
      module.exports.PassThrough = CustomStream.PassThrough;
      module.exports.addAbortSignal = CustomStream.addAbortSignal;
      module.exports.finished = CustomStream.finished;
      module.exports.destroy = CustomStream.destroy;
      module.exports.destroy = originalDestroy;
      module.exports.pipeline = CustomStream.pipeline;
      module.exports.compose = CustomStream.compose;
      Object.defineProperty(CustomStream, "promises", {
        configurable: true,
        enumerable: true,
        get() {
          return promises;
        }
      });
      module.exports.Stream = CustomStream.Stream;
      module.exports.default = module.exports;
    }
  });

  // node_modules/inherits/inherits_browser.js
  var require_inherits_browser = __commonJS({
    "node_modules/inherits/inherits_browser.js"(exports8, module) {
      init_dirname();
      init_buffer2();
      init_process2();
      if (typeof Object.create === "function") {
        module.exports = function inherits(ctor, superCtor) {
          if (superCtor) {
            ctor.super_ = superCtor;
            ctor.prototype = Object.create(superCtor.prototype, {
              constructor: {
                value: ctor,
                enumerable: false,
                writable: true,
                configurable: true
              }
            });
          }
        };
      } else {
        module.exports = function inherits(ctor, superCtor) {
          if (superCtor) {
            ctor.super_ = superCtor;
            var TempCtor = function() {
            };
            TempCtor.prototype = superCtor.prototype;
            ctor.prototype = new TempCtor();
            ctor.prototype.constructor = ctor;
          }
        };
      }
    }
  });

  // node_modules/bl/BufferList.js
  var require_BufferList = __commonJS({
    "node_modules/bl/BufferList.js"(exports8, module) {
      "use strict";
      init_dirname();
      init_buffer2();
      init_process2();
      var { Buffer: Buffer3 } = (init_buffer(), __toCommonJS(buffer_exports));
      var symbol = Symbol.for("BufferList");
      function BufferList(buf) {
        if (!(this instanceof BufferList)) {
          return new BufferList(buf);
        }
        BufferList._init.call(this, buf);
      }
      BufferList._init = function _init(buf) {
        Object.defineProperty(this, symbol, { value: true });
        this._bufs = [];
        this.length = 0;
        if (buf) {
          this.append(buf);
        }
      };
      BufferList.prototype._new = function _new(buf) {
        return new BufferList(buf);
      };
      BufferList.prototype._offset = function _offset(offset) {
        if (offset === 0) {
          return [0, 0];
        }
        let tot = 0;
        for (let i = 0; i < this._bufs.length; i++) {
          const _t = tot + this._bufs[i].length;
          if (offset < _t || i === this._bufs.length - 1) {
            return [i, offset - tot];
          }
          tot = _t;
        }
      };
      BufferList.prototype._reverseOffset = function(blOffset) {
        const bufferId = blOffset[0];
        let offset = blOffset[1];
        for (let i = 0; i < bufferId; i++) {
          offset += this._bufs[i].length;
        }
        return offset;
      };
      BufferList.prototype.getBuffers = function getBuffers() {
        return this._bufs;
      };
      BufferList.prototype.get = function get(index) {
        if (index > this.length || index < 0) {
          return void 0;
        }
        const offset = this._offset(index);
        return this._bufs[offset[0]][offset[1]];
      };
      BufferList.prototype.slice = function slice(start, end) {
        if (typeof start === "number" && start < 0) {
          start += this.length;
        }
        if (typeof end === "number" && end < 0) {
          end += this.length;
        }
        return this.copy(null, 0, start, end);
      };
      BufferList.prototype.copy = function copy(dst, dstStart, srcStart, srcEnd) {
        if (typeof srcStart !== "number" || srcStart < 0) {
          srcStart = 0;
        }
        if (typeof srcEnd !== "number" || srcEnd > this.length) {
          srcEnd = this.length;
        }
        if (srcStart >= this.length) {
          return dst || Buffer3.alloc(0);
        }
        if (srcEnd <= 0) {
          return dst || Buffer3.alloc(0);
        }
        const copy2 = !!dst;
        const off3 = this._offset(srcStart);
        const len = srcEnd - srcStart;
        let bytes = len;
        let bufoff = copy2 && dstStart || 0;
        let start = off3[1];
        if (srcStart === 0 && srcEnd === this.length) {
          if (!copy2) {
            return this._bufs.length === 1 ? this._bufs[0] : Buffer3.concat(this._bufs, this.length);
          }
          for (let i = 0; i < this._bufs.length; i++) {
            this._bufs[i].copy(dst, bufoff);
            bufoff += this._bufs[i].length;
          }
          return dst;
        }
        if (bytes <= this._bufs[off3[0]].length - start) {
          return copy2 ? this._bufs[off3[0]].copy(dst, dstStart, start, start + bytes) : this._bufs[off3[0]].slice(start, start + bytes);
        }
        if (!copy2) {
          dst = Buffer3.allocUnsafe(len);
        }
        for (let i = off3[0]; i < this._bufs.length; i++) {
          const l = this._bufs[i].length - start;
          if (bytes > l) {
            this._bufs[i].copy(dst, bufoff, start);
            bufoff += l;
          } else {
            this._bufs[i].copy(dst, bufoff, start, start + bytes);
            bufoff += l;
            break;
          }
          bytes -= l;
          if (start) {
            start = 0;
          }
        }
        if (dst.length > bufoff) return dst.slice(0, bufoff);
        return dst;
      };
      BufferList.prototype.shallowSlice = function shallowSlice(start, end) {
        start = start || 0;
        end = typeof end !== "number" ? this.length : end;
        if (start < 0) {
          start += this.length;
        }
        if (end < 0) {
          end += this.length;
        }
        if (start === end) {
          return this._new();
        }
        const startOffset = this._offset(start);
        const endOffset = this._offset(end);
        const buffers = this._bufs.slice(startOffset[0], endOffset[0] + 1);
        if (endOffset[1] === 0) {
          buffers.pop();
        } else {
          buffers[buffers.length - 1] = buffers[buffers.length - 1].slice(0, endOffset[1]);
        }
        if (startOffset[1] !== 0) {
          buffers[0] = buffers[0].slice(startOffset[1]);
        }
        return this._new(buffers);
      };
      BufferList.prototype.toString = function toString(encoding, start, end) {
        return this.slice(start, end).toString(encoding);
      };
      BufferList.prototype.consume = function consume(bytes) {
        bytes = Math.trunc(bytes);
        if (Number.isNaN(bytes) || bytes <= 0) return this;
        while (this._bufs.length) {
          if (bytes >= this._bufs[0].length) {
            bytes -= this._bufs[0].length;
            this.length -= this._bufs[0].length;
            this._bufs.shift();
          } else {
            this._bufs[0] = this._bufs[0].slice(bytes);
            this.length -= bytes;
            break;
          }
        }
        return this;
      };
      BufferList.prototype.duplicate = function duplicate() {
        const copy = this._new();
        for (let i = 0; i < this._bufs.length; i++) {
          copy.append(this._bufs[i]);
        }
        return copy;
      };
      BufferList.prototype.append = function append(buf) {
        return this._attach(buf, BufferList.prototype._appendBuffer);
      };
      BufferList.prototype.prepend = function prepend(buf) {
        return this._attach(buf, BufferList.prototype._prependBuffer, true);
      };
      BufferList.prototype._attach = function _attach(buf, attacher, prepend) {
        if (buf == null) {
          return this;
        }
        if (buf.buffer) {
          attacher.call(this, Buffer3.from(buf.buffer, buf.byteOffset, buf.byteLength));
        } else if (Array.isArray(buf)) {
          const [starting, modifier] = prepend ? [buf.length - 1, -1] : [0, 1];
          for (let i = starting; i >= 0 && i < buf.length; i += modifier) {
            this._attach(buf[i], attacher, prepend);
          }
        } else if (this._isBufferList(buf)) {
          const [starting, modifier] = prepend ? [buf._bufs.length - 1, -1] : [0, 1];
          for (let i = starting; i >= 0 && i < buf._bufs.length; i += modifier) {
            this._attach(buf._bufs[i], attacher, prepend);
          }
        } else {
          if (typeof buf === "number") {
            buf = buf.toString();
          }
          attacher.call(this, Buffer3.from(buf));
        }
        return this;
      };
      BufferList.prototype._appendBuffer = function appendBuffer(buf) {
        this._bufs.push(buf);
        this.length += buf.length;
      };
      BufferList.prototype._prependBuffer = function prependBuffer(buf) {
        this._bufs.unshift(buf);
        this.length += buf.length;
      };
      BufferList.prototype.indexOf = function(search, offset, encoding) {
        if (encoding === void 0 && typeof offset === "string") {
          encoding = offset;
          offset = void 0;
        }
        if (typeof search === "function" || Array.isArray(search)) {
          throw new TypeError('The "value" argument must be one of type string, Buffer, BufferList, or Uint8Array.');
        } else if (typeof search === "number") {
          search = Buffer3.from([search]);
        } else if (typeof search === "string") {
          search = Buffer3.from(search, encoding);
        } else if (this._isBufferList(search)) {
          search = search.slice();
        } else if (Array.isArray(search.buffer)) {
          search = Buffer3.from(search.buffer, search.byteOffset, search.byteLength);
        } else if (!Buffer3.isBuffer(search)) {
          search = Buffer3.from(search);
        }
        offset = Number(offset || 0);
        if (isNaN(offset)) {
          offset = 0;
        }
        if (offset < 0) {
          offset = this.length + offset;
        }
        if (offset < 0) {
          offset = 0;
        }
        if (search.length === 0) {
          return offset > this.length ? this.length : offset;
        }
        const blOffset = this._offset(offset);
        let blIndex = blOffset[0];
        let buffOffset = blOffset[1];
        for (; blIndex < this._bufs.length; blIndex++) {
          const buff = this._bufs[blIndex];
          while (buffOffset < buff.length) {
            const availableWindow = buff.length - buffOffset;
            if (availableWindow >= search.length) {
              const nativeSearchResult = buff.indexOf(search, buffOffset);
              if (nativeSearchResult !== -1) {
                return this._reverseOffset([blIndex, nativeSearchResult]);
              }
              buffOffset = buff.length - search.length + 1;
            } else {
              const revOffset = this._reverseOffset([blIndex, buffOffset]);
              if (this._match(revOffset, search)) {
                return revOffset;
              }
              buffOffset++;
            }
          }
          buffOffset = 0;
        }
        return -1;
      };
      BufferList.prototype._match = function(offset, search) {
        if (this.length - offset < search.length) {
          return false;
        }
        for (let searchOffset = 0; searchOffset < search.length; searchOffset++) {
          if (this.get(offset + searchOffset) !== search[searchOffset]) {
            return false;
          }
        }
        return true;
      };
      (function() {
        const methods = {
          readDoubleBE: 8,
          readDoubleLE: 8,
          readFloatBE: 4,
          readFloatLE: 4,
          readBigInt64BE: 8,
          readBigInt64LE: 8,
          readBigUInt64BE: 8,
          readBigUInt64LE: 8,
          readInt32BE: 4,
          readInt32LE: 4,
          readUInt32BE: 4,
          readUInt32LE: 4,
          readInt16BE: 2,
          readInt16LE: 2,
          readUInt16BE: 2,
          readUInt16LE: 2,
          readInt8: 1,
          readUInt8: 1,
          readIntBE: null,
          readIntLE: null,
          readUIntBE: null,
          readUIntLE: null
        };
        for (const m in methods) {
          (function(m2) {
            if (methods[m2] === null) {
              BufferList.prototype[m2] = function(offset, byteLength) {
                return this.slice(offset, offset + byteLength)[m2](0, byteLength);
              };
            } else {
              BufferList.prototype[m2] = function(offset = 0) {
                return this.slice(offset, offset + methods[m2])[m2](0);
              };
            }
          })(m);
        }
      })();
      BufferList.prototype._isBufferList = function _isBufferList(b) {
        return b instanceof BufferList || BufferList.isBufferList(b);
      };
      BufferList.isBufferList = function isBufferList(b) {
        return b != null && b[symbol];
      };
      module.exports = BufferList;
    }
  });

  // node_modules/bl/bl.js
  var require_bl = __commonJS({
    "node_modules/bl/bl.js"(exports8, module) {
      "use strict";
      init_dirname();
      init_buffer2();
      init_process2();
      var DuplexStream = require_browser3().Duplex;
      var inherits = require_inherits_browser();
      var BufferList = require_BufferList();
      function BufferListStream(callback) {
        if (!(this instanceof BufferListStream)) {
          return new BufferListStream(callback);
        }
        if (typeof callback === "function") {
          this._callback = callback;
          const piper = function piper2(err) {
            if (this._callback) {
              this._callback(err);
              this._callback = null;
            }
          }.bind(this);
          this.on("pipe", function onPipe(src) {
            src.on("error", piper);
          });
          this.on("unpipe", function onUnpipe(src) {
            src.removeListener("error", piper);
          });
          callback = null;
        }
        BufferList._init.call(this, callback);
        DuplexStream.call(this);
      }
      inherits(BufferListStream, DuplexStream);
      Object.assign(BufferListStream.prototype, BufferList.prototype);
      BufferListStream.prototype._new = function _new(callback) {
        return new BufferListStream(callback);
      };
      BufferListStream.prototype._write = function _write(buf, encoding, callback) {
        this._appendBuffer(buf);
        if (typeof callback === "function") {
          callback();
        }
      };
      BufferListStream.prototype._read = function _read(size) {
        if (!this.length) {
          return this.push(null);
        }
        size = Math.min(size, this.length);
        this.push(this.slice(0, size));
        this.consume(size);
      };
      BufferListStream.prototype.end = function end(chunk) {
        DuplexStream.prototype.end.call(this, chunk);
        if (this._callback) {
          this._callback(null, this.slice());
          this._callback = null;
        }
      };
      BufferListStream.prototype._destroy = function _destroy(err, cb) {
        this._bufs.length = 0;
        this.length = 0;
        cb(err);
      };
      BufferListStream.prototype._isBufferList = function _isBufferList(b) {
        return b instanceof BufferListStream || b instanceof BufferList || BufferListStream.isBufferList(b);
      };
      BufferListStream.isBufferList = BufferList.isBufferList;
      module.exports = BufferListStream;
      module.exports.BufferListStream = BufferListStream;
      module.exports.BufferList = BufferList;
    }
  });

  // node_modules/mqtt-packet/packet.js
  var require_packet = __commonJS({
    "node_modules/mqtt-packet/packet.js"(exports8, module) {
      init_dirname();
      init_buffer2();
      init_process2();
      var Packet = class {
        constructor() {
          this.cmd = null;
          this.retain = false;
          this.qos = 0;
          this.dup = false;
          this.length = -1;
          this.topic = null;
          this.payload = null;
        }
      };
      module.exports = Packet;
    }
  });

  // node_modules/mqtt-packet/constants.js
  var require_constants = __commonJS({
    "node_modules/mqtt-packet/constants.js"(exports8, module) {
      init_dirname();
      init_buffer2();
      init_process2();
      var protocol = module.exports;
      var { Buffer: Buffer3 } = (init_buffer(), __toCommonJS(buffer_exports));
      protocol.types = {
        0: "reserved",
        1: "connect",
        2: "connack",
        3: "publish",
        4: "puback",
        5: "pubrec",
        6: "pubrel",
        7: "pubcomp",
        8: "subscribe",
        9: "suback",
        10: "unsubscribe",
        11: "unsuback",
        12: "pingreq",
        13: "pingresp",
        14: "disconnect",
        15: "auth"
      };
      protocol.requiredHeaderFlags = {
        1: 0,
        // 'connect'
        2: 0,
        // 'connack'
        4: 0,
        // 'puback'
        5: 0,
        // 'pubrec'
        6: 2,
        // 'pubrel'
        7: 0,
        // 'pubcomp'
        8: 2,
        // 'subscribe'
        9: 0,
        // 'suback'
        10: 2,
        // 'unsubscribe'
        11: 0,
        // 'unsuback'
        12: 0,
        // 'pingreq'
        13: 0,
        // 'pingresp'
        14: 0,
        // 'disconnect'
        15: 0
        // 'auth'
      };
      protocol.requiredHeaderFlagsErrors = {};
      for (const k in protocol.requiredHeaderFlags) {
        const v = protocol.requiredHeaderFlags[k];
        protocol.requiredHeaderFlagsErrors[k] = "Invalid header flag bits, must be 0x" + v.toString(16) + " for " + protocol.types[k] + " packet";
      }
      protocol.codes = {};
      for (const k in protocol.types) {
        const v = protocol.types[k];
        protocol.codes[v] = k;
      }
      protocol.CMD_SHIFT = 4;
      protocol.CMD_MASK = 240;
      protocol.DUP_MASK = 8;
      protocol.QOS_MASK = 3;
      protocol.QOS_SHIFT = 1;
      protocol.RETAIN_MASK = 1;
      protocol.VARBYTEINT_MASK = 127;
      protocol.VARBYTEINT_FIN_MASK = 128;
      protocol.VARBYTEINT_MAX = 268435455;
      protocol.SESSIONPRESENT_MASK = 1;
      protocol.SESSIONPRESENT_HEADER = Buffer3.from([protocol.SESSIONPRESENT_MASK]);
      protocol.CONNACK_HEADER = Buffer3.from([protocol.codes.connack << protocol.CMD_SHIFT]);
      protocol.USERNAME_MASK = 128;
      protocol.PASSWORD_MASK = 64;
      protocol.WILL_RETAIN_MASK = 32;
      protocol.WILL_QOS_MASK = 24;
      protocol.WILL_QOS_SHIFT = 3;
      protocol.WILL_FLAG_MASK = 4;
      protocol.CLEAN_SESSION_MASK = 2;
      protocol.CONNECT_HEADER = Buffer3.from([protocol.codes.connect << protocol.CMD_SHIFT]);
      protocol.properties = {
        sessionExpiryInterval: 17,
        willDelayInterval: 24,
        receiveMaximum: 33,
        maximumPacketSize: 39,
        topicAliasMaximum: 34,
        requestResponseInformation: 25,
        requestProblemInformation: 23,
        userProperties: 38,
        authenticationMethod: 21,
        authenticationData: 22,
        payloadFormatIndicator: 1,
        messageExpiryInterval: 2,
        contentType: 3,
        responseTopic: 8,
        correlationData: 9,
        maximumQoS: 36,
        retainAvailable: 37,
        assignedClientIdentifier: 18,
        reasonString: 31,
        wildcardSubscriptionAvailable: 40,
        subscriptionIdentifiersAvailable: 41,
        sharedSubscriptionAvailable: 42,
        serverKeepAlive: 19,
        responseInformation: 26,
        serverReference: 28,
        topicAlias: 35,
        subscriptionIdentifier: 11
      };
      protocol.propertiesCodes = {};
      for (const prop in protocol.properties) {
        const id = protocol.properties[prop];
        protocol.propertiesCodes[id] = prop;
      }
      protocol.propertiesTypes = {
        sessionExpiryInterval: "int32",
        willDelayInterval: "int32",
        receiveMaximum: "int16",
        maximumPacketSize: "int32",
        topicAliasMaximum: "int16",
        requestResponseInformation: "byte",
        requestProblemInformation: "byte",
        userProperties: "pair",
        authenticationMethod: "string",
        authenticationData: "binary",
        payloadFormatIndicator: "byte",
        messageExpiryInterval: "int32",
        contentType: "string",
        responseTopic: "string",
        correlationData: "binary",
        maximumQoS: "int8",
        retainAvailable: "byte",
        assignedClientIdentifier: "string",
        reasonString: "string",
        wildcardSubscriptionAvailable: "byte",
        subscriptionIdentifiersAvailable: "byte",
        sharedSubscriptionAvailable: "byte",
        serverKeepAlive: "int16",
        responseInformation: "string",
        serverReference: "string",
        topicAlias: "int16",
        subscriptionIdentifier: "var"
      };
      function genHeader(type) {
        return [0, 1, 2].map((qos) => {
          return [0, 1].map((dup) => {
            return [0, 1].map((retain) => {
              const buf = Buffer3.alloc(1);
              buf.writeUInt8(
                protocol.codes[type] << protocol.CMD_SHIFT | (dup ? protocol.DUP_MASK : 0) | qos << protocol.QOS_SHIFT | retain,
                0,
                true
              );
              return buf;
            });
          });
        });
      }
      protocol.PUBLISH_HEADER = genHeader("publish");
      protocol.SUBSCRIBE_HEADER = genHeader("subscribe");
      protocol.SUBSCRIBE_OPTIONS_QOS_MASK = 3;
      protocol.SUBSCRIBE_OPTIONS_NL_MASK = 1;
      protocol.SUBSCRIBE_OPTIONS_NL_SHIFT = 2;
      protocol.SUBSCRIBE_OPTIONS_RAP_MASK = 1;
      protocol.SUBSCRIBE_OPTIONS_RAP_SHIFT = 3;
      protocol.SUBSCRIBE_OPTIONS_RH_MASK = 3;
      protocol.SUBSCRIBE_OPTIONS_RH_SHIFT = 4;
      protocol.SUBSCRIBE_OPTIONS_RH = [0, 16, 32];
      protocol.SUBSCRIBE_OPTIONS_NL = 4;
      protocol.SUBSCRIBE_OPTIONS_RAP = 8;
      protocol.SUBSCRIBE_OPTIONS_QOS = [0, 1, 2];
      protocol.UNSUBSCRIBE_HEADER = genHeader("unsubscribe");
      protocol.ACKS = {
        unsuback: genHeader("unsuback"),
        puback: genHeader("puback"),
        pubcomp: genHeader("pubcomp"),
        pubrel: genHeader("pubrel"),
        pubrec: genHeader("pubrec")
      };
      protocol.SUBACK_HEADER = Buffer3.from([protocol.codes.suback << protocol.CMD_SHIFT]);
      protocol.VERSION3 = Buffer3.from([3]);
      protocol.VERSION4 = Buffer3.from([4]);
      protocol.VERSION5 = Buffer3.from([5]);
      protocol.VERSION131 = Buffer3.from([131]);
      protocol.VERSION132 = Buffer3.from([132]);
      protocol.QOS = [0, 1, 2].map((qos) => {
        return Buffer3.from([qos]);
      });
      protocol.EMPTY = {
        pingreq: Buffer3.from([protocol.codes.pingreq << 4, 0]),
        pingresp: Buffer3.from([protocol.codes.pingresp << 4, 0]),
        disconnect: Buffer3.from([protocol.codes.disconnect << 4, 0])
      };
      protocol.MQTT5_PUBACK_PUBREC_CODES = {
        0: "Success",
        16: "No matching subscribers",
        128: "Unspecified error",
        131: "Implementation specific error",
        135: "Not authorized",
        144: "Topic Name invalid",
        145: "Packet identifier in use",
        151: "Quota exceeded",
        153: "Payload format invalid"
      };
      protocol.MQTT5_PUBREL_PUBCOMP_CODES = {
        0: "Success",
        146: "Packet Identifier not found"
      };
      protocol.MQTT5_SUBACK_CODES = {
        0: "Granted QoS 0",
        1: "Granted QoS 1",
        2: "Granted QoS 2",
        128: "Unspecified error",
        131: "Implementation specific error",
        135: "Not authorized",
        143: "Topic Filter invalid",
        145: "Packet Identifier in use",
        151: "Quota exceeded",
        158: "Shared Subscriptions not supported",
        161: "Subscription Identifiers not supported",
        162: "Wildcard Subscriptions not supported"
      };
      protocol.MQTT5_UNSUBACK_CODES = {
        0: "Success",
        17: "No subscription existed",
        128: "Unspecified error",
        131: "Implementation specific error",
        135: "Not authorized",
        143: "Topic Filter invalid",
        145: "Packet Identifier in use"
      };
      protocol.MQTT5_DISCONNECT_CODES = {
        0: "Normal disconnection",
        4: "Disconnect with Will Message",
        128: "Unspecified error",
        129: "Malformed Packet",
        130: "Protocol Error",
        131: "Implementation specific error",
        135: "Not authorized",
        137: "Server busy",
        139: "Server shutting down",
        141: "Keep Alive timeout",
        142: "Session taken over",
        143: "Topic Filter invalid",
        144: "Topic Name invalid",
        147: "Receive Maximum exceeded",
        148: "Topic Alias invalid",
        149: "Packet too large",
        150: "Message rate too high",
        151: "Quota exceeded",
        152: "Administrative action",
        153: "Payload format invalid",
        154: "Retain not supported",
        155: "QoS not supported",
        156: "Use another server",
        157: "Server moved",
        158: "Shared Subscriptions not supported",
        159: "Connection rate exceeded",
        160: "Maximum connect time",
        161: "Subscription Identifiers not supported",
        162: "Wildcard Subscriptions not supported"
      };
      protocol.MQTT5_AUTH_CODES = {
        0: "Success",
        24: "Continue authentication",
        25: "Re-authenticate"
      };
    }
  });

  // node_modules/ms/index.js
  var require_ms = __commonJS({
    "node_modules/ms/index.js"(exports8, module) {
      init_dirname();
      init_buffer2();
      init_process2();
      var s = 1e3;
      var m = s * 60;
      var h = m * 60;
      var d = h * 24;
      var w = d * 7;
      var y = d * 365.25;
      module.exports = function(val, options) {
        options = options || {};
        var type = typeof val;
        if (type === "string" && val.length > 0) {
          return parse2(val);
        } else if (type === "number" && isFinite(val)) {
          return options.long ? fmtLong(val) : fmtShort(val);
        }
        throw new Error(
          "val is not a non-empty string or a valid number. val=" + JSON.stringify(val)
        );
      };
      function parse2(str) {
        str = String(str);
        if (str.length > 100) {
          return;
        }
        var match = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(
          str
        );
        if (!match) {
          return;
        }
        var n = parseFloat(match[1]);
        var type = (match[2] || "ms").toLowerCase();
        switch (type) {
          case "years":
          case "year":
          case "yrs":
          case "yr":
          case "y":
            return n * y;
          case "weeks":
          case "week":
          case "w":
            return n * w;
          case "days":
          case "day":
          case "d":
            return n * d;
          case "hours":
          case "hour":
          case "hrs":
          case "hr":
          case "h":
            return n * h;
          case "minutes":
          case "minute":
          case "mins":
          case "min":
          case "m":
            return n * m;
          case "seconds":
          case "second":
          case "secs":
          case "sec":
          case "s":
            return n * s;
          case "milliseconds":
          case "millisecond":
          case "msecs":
          case "msec":
          case "ms":
            return n;
          default:
            return void 0;
        }
      }
      function fmtShort(ms) {
        var msAbs = Math.abs(ms);
        if (msAbs >= d) {
          return Math.round(ms / d) + "d";
        }
        if (msAbs >= h) {
          return Math.round(ms / h) + "h";
        }
        if (msAbs >= m) {
          return Math.round(ms / m) + "m";
        }
        if (msAbs >= s) {
          return Math.round(ms / s) + "s";
        }
        return ms + "ms";
      }
      function fmtLong(ms) {
        var msAbs = Math.abs(ms);
        if (msAbs >= d) {
          return plural(ms, msAbs, d, "day");
        }
        if (msAbs >= h) {
          return plural(ms, msAbs, h, "hour");
        }
        if (msAbs >= m) {
          return plural(ms, msAbs, m, "minute");
        }
        if (msAbs >= s) {
          return plural(ms, msAbs, s, "second");
        }
        return ms + " ms";
      }
      function plural(ms, msAbs, n, name2) {
        var isPlural = msAbs >= n * 1.5;
        return Math.round(ms / n) + " " + name2 + (isPlural ? "s" : "");
      }
    }
  });

  // node_modules/debug/src/common.js
  var require_common = __commonJS({
    "node_modules/debug/src/common.js"(exports8, module) {
      init_dirname();
      init_buffer2();
      init_process2();
      function setup(env3) {
        createDebug.debug = createDebug;
        createDebug.default = createDebug;
        createDebug.coerce = coerce;
        createDebug.disable = disable;
        createDebug.enable = enable;
        createDebug.enabled = enabled;
        createDebug.humanize = require_ms();
        createDebug.destroy = destroy;
        Object.keys(env3).forEach((key) => {
          createDebug[key] = env3[key];
        });
        createDebug.names = [];
        createDebug.skips = [];
        createDebug.formatters = {};
        function selectColor(namespace) {
          let hash = 0;
          for (let i = 0; i < namespace.length; i++) {
            hash = (hash << 5) - hash + namespace.charCodeAt(i);
            hash |= 0;
          }
          return createDebug.colors[Math.abs(hash) % createDebug.colors.length];
        }
        createDebug.selectColor = selectColor;
        function createDebug(namespace) {
          let prevTime;
          let enableOverride = null;
          let namespacesCache;
          let enabledCache;
          function debug(...args) {
            if (!debug.enabled) {
              return;
            }
            const self2 = debug;
            const curr = Number(/* @__PURE__ */ new Date());
            const ms = curr - (prevTime || curr);
            self2.diff = ms;
            self2.prev = prevTime;
            self2.curr = curr;
            prevTime = curr;
            args[0] = createDebug.coerce(args[0]);
            if (typeof args[0] !== "string") {
              args.unshift("%O");
            }
            let index = 0;
            args[0] = args[0].replace(/%([a-zA-Z%])/g, (match, format2) => {
              if (match === "%%") {
                return "%";
              }
              index++;
              const formatter = createDebug.formatters[format2];
              if (typeof formatter === "function") {
                const val = args[index];
                match = formatter.call(self2, val);
                args.splice(index, 1);
                index--;
              }
              return match;
            });
            createDebug.formatArgs.call(self2, args);
            const logFn = self2.log || createDebug.log;
            logFn.apply(self2, args);
          }
          debug.namespace = namespace;
          debug.useColors = createDebug.useColors();
          debug.color = createDebug.selectColor(namespace);
          debug.extend = extend;
          debug.destroy = createDebug.destroy;
          Object.defineProperty(debug, "enabled", {
            enumerable: true,
            configurable: false,
            get: () => {
              if (enableOverride !== null) {
                return enableOverride;
              }
              if (namespacesCache !== createDebug.namespaces) {
                namespacesCache = createDebug.namespaces;
                enabledCache = createDebug.enabled(namespace);
              }
              return enabledCache;
            },
            set: (v) => {
              enableOverride = v;
            }
          });
          if (typeof createDebug.init === "function") {
            createDebug.init(debug);
          }
          return debug;
        }
        function extend(namespace, delimiter) {
          const newDebug = createDebug(this.namespace + (typeof delimiter === "undefined" ? ":" : delimiter) + namespace);
          newDebug.log = this.log;
          return newDebug;
        }
        function enable(namespaces) {
          createDebug.save(namespaces);
          createDebug.namespaces = namespaces;
          createDebug.names = [];
          createDebug.skips = [];
          const split = (typeof namespaces === "string" ? namespaces : "").trim().replace(/\s+/g, ",").split(",").filter(Boolean);
          for (const ns of split) {
            if (ns[0] === "-") {
              createDebug.skips.push(ns.slice(1));
            } else {
              createDebug.names.push(ns);
            }
          }
        }
        function matchesTemplate(search, template) {
          let searchIndex = 0;
          let templateIndex = 0;
          let starIndex = -1;
          let matchIndex = 0;
          while (searchIndex < search.length) {
            if (templateIndex < template.length && (template[templateIndex] === search[searchIndex] || template[templateIndex] === "*")) {
              if (template[templateIndex] === "*") {
                starIndex = templateIndex;
                matchIndex = searchIndex;
                templateIndex++;
              } else {
                searchIndex++;
                templateIndex++;
              }
            } else if (starIndex !== -1) {
              templateIndex = starIndex + 1;
              matchIndex++;
              searchIndex = matchIndex;
            } else {
              return false;
            }
          }
          while (templateIndex < template.length && template[templateIndex] === "*") {
            templateIndex++;
          }
          return templateIndex === template.length;
        }
        function disable() {
          const namespaces = [
            ...createDebug.names,
            ...createDebug.skips.map((namespace) => "-" + namespace)
          ].join(",");
          createDebug.enable("");
          return namespaces;
        }
        function enabled(name2) {
          for (const skip of createDebug.skips) {
            if (matchesTemplate(name2, skip)) {
              return false;
            }
          }
          for (const ns of createDebug.names) {
            if (matchesTemplate(name2, ns)) {
              return true;
            }
          }
          return false;
        }
        function coerce(val) {
          if (val instanceof Error) {
            return val.stack || val.message;
          }
          return val;
        }
        function destroy() {
          console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.");
        }
        createDebug.enable(createDebug.load());
        return createDebug;
      }
      module.exports = setup;
    }
  });

  // node_modules/debug/src/browser.js
  var require_browser4 = __commonJS({
    "node_modules/debug/src/browser.js"(exports8, module) {
      init_dirname();
      init_buffer2();
      init_process2();
      exports8.formatArgs = formatArgs;
      exports8.save = save;
      exports8.load = load;
      exports8.useColors = useColors;
      exports8.storage = localstorage();
      exports8.destroy = /* @__PURE__ */ (() => {
        let warned = false;
        return () => {
          if (!warned) {
            warned = true;
            console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.");
          }
        };
      })();
      exports8.colors = [
        "#0000CC",
        "#0000FF",
        "#0033CC",
        "#0033FF",
        "#0066CC",
        "#0066FF",
        "#0099CC",
        "#0099FF",
        "#00CC00",
        "#00CC33",
        "#00CC66",
        "#00CC99",
        "#00CCCC",
        "#00CCFF",
        "#3300CC",
        "#3300FF",
        "#3333CC",
        "#3333FF",
        "#3366CC",
        "#3366FF",
        "#3399CC",
        "#3399FF",
        "#33CC00",
        "#33CC33",
        "#33CC66",
        "#33CC99",
        "#33CCCC",
        "#33CCFF",
        "#6600CC",
        "#6600FF",
        "#6633CC",
        "#6633FF",
        "#66CC00",
        "#66CC33",
        "#9900CC",
        "#9900FF",
        "#9933CC",
        "#9933FF",
        "#99CC00",
        "#99CC33",
        "#CC0000",
        "#CC0033",
        "#CC0066",
        "#CC0099",
        "#CC00CC",
        "#CC00FF",
        "#CC3300",
        "#CC3333",
        "#CC3366",
        "#CC3399",
        "#CC33CC",
        "#CC33FF",
        "#CC6600",
        "#CC6633",
        "#CC9900",
        "#CC9933",
        "#CCCC00",
        "#CCCC33",
        "#FF0000",
        "#FF0033",
        "#FF0066",
        "#FF0099",
        "#FF00CC",
        "#FF00FF",
        "#FF3300",
        "#FF3333",
        "#FF3366",
        "#FF3399",
        "#FF33CC",
        "#FF33FF",
        "#FF6600",
        "#FF6633",
        "#FF9900",
        "#FF9933",
        "#FFCC00",
        "#FFCC33"
      ];
      function useColors() {
        if (typeof window !== "undefined" && window.process && (window.process.type === "renderer" || window.process.__nwjs)) {
          return true;
        }
        if (typeof navigator !== "undefined" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)) {
          return false;
        }
        let m;
        return typeof document !== "undefined" && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance || // Is firebug? http://stackoverflow.com/a/398120/376773
        typeof window !== "undefined" && window.console && (window.console.firebug || window.console.exception && window.console.table) || // Is firefox >= v31?
        // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
        typeof navigator !== "undefined" && navigator.userAgent && (m = navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/)) && parseInt(m[1], 10) >= 31 || // Double check webkit in userAgent just in case we are in a worker
        typeof navigator !== "undefined" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/);
      }
      function formatArgs(args) {
        args[0] = (this.useColors ? "%c" : "") + this.namespace + (this.useColors ? " %c" : " ") + args[0] + (this.useColors ? "%c " : " ") + "+" + module.exports.humanize(this.diff);
        if (!this.useColors) {
          return;
        }
        const c = "color: " + this.color;
        args.splice(1, 0, c, "color: inherit");
        let index = 0;
        let lastC = 0;
        args[0].replace(/%[a-zA-Z%]/g, (match) => {
          if (match === "%%") {
            return;
          }
          index++;
          if (match === "%c") {
            lastC = index;
          }
        });
        args.splice(lastC, 0, c);
      }
      exports8.log = console.debug || console.log || (() => {
      });
      function save(namespaces) {
        try {
          if (namespaces) {
            exports8.storage.setItem("debug", namespaces);
          } else {
            exports8.storage.removeItem("debug");
          }
        } catch (error) {
        }
      }
      function load() {
        let r;
        try {
          r = exports8.storage.getItem("debug") || exports8.storage.getItem("DEBUG");
        } catch (error) {
        }
        if (!r && typeof process_exports !== "undefined" && "env" in process_exports) {
          r = process_exports.env.DEBUG;
        }
        return r;
      }
      function localstorage() {
        try {
          return localStorage;
        } catch (error) {
        }
      }
      module.exports = require_common()(exports8);
      var { formatters } = module.exports;
      formatters.j = function(v) {
        try {
          return JSON.stringify(v);
        } catch (error) {
          return "[UnexpectedJSONParseError]: " + error.message;
        }
      };
    }
  });

  // node_modules/mqtt-packet/parser.js
  var require_parser = __commonJS({
    "node_modules/mqtt-packet/parser.js"(exports8, module) {
      init_dirname();
      init_buffer2();
      init_process2();
      var bl = require_bl();
      var { EventEmitter: EventEmitter2 } = (init_events(), __toCommonJS(events_exports));
      var Packet = require_packet();
      var constants = require_constants();
      var debug = require_browser4()("mqtt-packet:parser");
      var Parser = class _Parser extends EventEmitter2 {
        constructor() {
          super();
          this.parser = this.constructor.parser;
        }
        static parser(opt) {
          if (!(this instanceof _Parser)) return new _Parser().parser(opt);
          this.settings = opt || {};
          this._states = [
            "_parseHeader",
            "_parseLength",
            "_parsePayload",
            "_newPacket"
          ];
          this._resetState();
          return this;
        }
        _resetState() {
          debug("_resetState: resetting packet, error, _list, and _stateCounter");
          this.packet = new Packet();
          this.error = null;
          this._list = bl();
          this._stateCounter = 0;
        }
        parse(buf) {
          if (this.error) this._resetState();
          this._list.append(buf);
          debug("parse: current state: %s", this._states[this._stateCounter]);
          while ((this.packet.length !== -1 || this._list.length > 0) && this[this._states[this._stateCounter]]() && !this.error) {
            this._stateCounter++;
            debug("parse: state complete. _stateCounter is now: %d", this._stateCounter);
            debug("parse: packet.length: %d, buffer list length: %d", this.packet.length, this._list.length);
            if (this._stateCounter >= this._states.length) this._stateCounter = 0;
          }
          debug("parse: exited while loop. packet: %d, buffer list length: %d", this.packet.length, this._list.length);
          return this._list.length;
        }
        _parseHeader() {
          const zero = this._list.readUInt8(0);
          const cmdIndex = zero >> constants.CMD_SHIFT;
          this.packet.cmd = constants.types[cmdIndex];
          const headerFlags = zero & 15;
          const requiredHeaderFlags = constants.requiredHeaderFlags[cmdIndex];
          if (requiredHeaderFlags != null && headerFlags !== requiredHeaderFlags) {
            return this._emitError(new Error(constants.requiredHeaderFlagsErrors[cmdIndex]));
          }
          this.packet.retain = (zero & constants.RETAIN_MASK) !== 0;
          this.packet.qos = zero >> constants.QOS_SHIFT & constants.QOS_MASK;
          if (this.packet.qos > 2) {
            return this._emitError(new Error("Packet must not have both QoS bits set to 1"));
          }
          this.packet.dup = (zero & constants.DUP_MASK) !== 0;
          debug("_parseHeader: packet: %o", this.packet);
          this._list.consume(1);
          return true;
        }
        _parseLength() {
          const result = this._parseVarByteNum(true);
          if (result) {
            this.packet.length = result.value;
            this._list.consume(result.bytes);
          }
          debug("_parseLength %d", result.value);
          return !!result;
        }
        _parsePayload() {
          debug("_parsePayload: payload %O", this._list);
          let result = false;
          if (this.packet.length === 0 || this._list.length >= this.packet.length) {
            this._pos = 0;
            switch (this.packet.cmd) {
              case "connect":
                this._parseConnect();
                break;
              case "connack":
                this._parseConnack();
                break;
              case "publish":
                this._parsePublish();
                break;
              case "puback":
              case "pubrec":
              case "pubrel":
              case "pubcomp":
                this._parseConfirmation();
                break;
              case "subscribe":
                this._parseSubscribe();
                break;
              case "suback":
                this._parseSuback();
                break;
              case "unsubscribe":
                this._parseUnsubscribe();
                break;
              case "unsuback":
                this._parseUnsuback();
                break;
              case "pingreq":
              case "pingresp":
                break;
              case "disconnect":
                this._parseDisconnect();
                break;
              case "auth":
                this._parseAuth();
                break;
              default:
                this._emitError(new Error("Not supported"));
            }
            result = true;
          }
          debug("_parsePayload complete result: %s", result);
          return result;
        }
        _parseConnect() {
          debug("_parseConnect");
          let topic;
          let payload;
          let password;
          let username;
          const flags = {};
          const packet = this.packet;
          const protocolId = this._parseString();
          if (protocolId === null) return this._emitError(new Error("Cannot parse protocolId"));
          if (protocolId !== "MQTT" && protocolId !== "MQIsdp") {
            return this._emitError(new Error("Invalid protocolId"));
          }
          packet.protocolId = protocolId;
          if (this._pos >= this._list.length) return this._emitError(new Error("Packet too short"));
          packet.protocolVersion = this._list.readUInt8(this._pos);
          if (packet.protocolVersion >= 128) {
            packet.bridgeMode = true;
            packet.protocolVersion = packet.protocolVersion - 128;
          }
          if (packet.protocolVersion !== 3 && packet.protocolVersion !== 4 && packet.protocolVersion !== 5) {
            return this._emitError(new Error("Invalid protocol version"));
          }
          this._pos++;
          if (this._pos >= this._list.length) {
            return this._emitError(new Error("Packet too short"));
          }
          if (this._list.readUInt8(this._pos) & 1) {
            return this._emitError(new Error("Connect flag bit 0 must be 0, but got 1"));
          }
          flags.username = this._list.readUInt8(this._pos) & constants.USERNAME_MASK;
          flags.password = this._list.readUInt8(this._pos) & constants.PASSWORD_MASK;
          flags.will = this._list.readUInt8(this._pos) & constants.WILL_FLAG_MASK;
          const willRetain = !!(this._list.readUInt8(this._pos) & constants.WILL_RETAIN_MASK);
          const willQos = (this._list.readUInt8(this._pos) & constants.WILL_QOS_MASK) >> constants.WILL_QOS_SHIFT;
          if (flags.will) {
            packet.will = {};
            packet.will.retain = willRetain;
            packet.will.qos = willQos;
          } else {
            if (willRetain) {
              return this._emitError(new Error("Will Retain Flag must be set to zero when Will Flag is set to 0"));
            }
            if (willQos) {
              return this._emitError(new Error("Will QoS must be set to zero when Will Flag is set to 0"));
            }
          }
          packet.clean = (this._list.readUInt8(this._pos) & constants.CLEAN_SESSION_MASK) !== 0;
          this._pos++;
          packet.keepalive = this._parseNum();
          if (packet.keepalive === -1) return this._emitError(new Error("Packet too short"));
          if (packet.protocolVersion === 5) {
            const properties = this._parseProperties();
            if (Object.getOwnPropertyNames(properties).length) {
              packet.properties = properties;
            }
          }
          const clientId = this._parseString();
          if (clientId === null) return this._emitError(new Error("Packet too short"));
          packet.clientId = clientId;
          debug("_parseConnect: packet.clientId: %s", packet.clientId);
          if (flags.will) {
            if (packet.protocolVersion === 5) {
              const willProperties = this._parseProperties();
              if (Object.getOwnPropertyNames(willProperties).length) {
                packet.will.properties = willProperties;
              }
            }
            topic = this._parseString();
            if (topic === null) return this._emitError(new Error("Cannot parse will topic"));
            packet.will.topic = topic;
            debug("_parseConnect: packet.will.topic: %s", packet.will.topic);
            payload = this._parseBuffer();
            if (payload === null) return this._emitError(new Error("Cannot parse will payload"));
            packet.will.payload = payload;
            debug("_parseConnect: packet.will.paylaod: %s", packet.will.payload);
          }
          if (flags.username) {
            username = this._parseString();
            if (username === null) return this._emitError(new Error("Cannot parse username"));
            packet.username = username;
            debug("_parseConnect: packet.username: %s", packet.username);
          }
          if (flags.password) {
            password = this._parseBuffer();
            if (password === null) return this._emitError(new Error("Cannot parse password"));
            packet.password = password;
          }
          this.settings = packet;
          debug("_parseConnect: complete");
          return packet;
        }
        _parseConnack() {
          debug("_parseConnack");
          const packet = this.packet;
          if (this._list.length < 1) return null;
          const flags = this._list.readUInt8(this._pos++);
          if (flags > 1) {
            return this._emitError(new Error("Invalid connack flags, bits 7-1 must be set to 0"));
          }
          packet.sessionPresent = !!(flags & constants.SESSIONPRESENT_MASK);
          if (this.settings.protocolVersion === 5) {
            if (this._list.length >= 2) {
              packet.reasonCode = this._list.readUInt8(this._pos++);
            } else {
              packet.reasonCode = 0;
            }
          } else {
            if (this._list.length < 2) return null;
            packet.returnCode = this._list.readUInt8(this._pos++);
          }
          if (packet.returnCode === -1 || packet.reasonCode === -1) return this._emitError(new Error("Cannot parse return code"));
          if (this.settings.protocolVersion === 5) {
            const properties = this._parseProperties();
            if (Object.getOwnPropertyNames(properties).length) {
              packet.properties = properties;
            }
          }
          debug("_parseConnack: complete");
        }
        _parsePublish() {
          debug("_parsePublish");
          const packet = this.packet;
          packet.topic = this._parseString();
          if (packet.topic === null) return this._emitError(new Error("Cannot parse topic"));
          if (packet.qos > 0) {
            if (!this._parseMessageId()) {
              return;
            }
          }
          if (this.settings.protocolVersion === 5) {
            const properties = this._parseProperties();
            if (Object.getOwnPropertyNames(properties).length) {
              packet.properties = properties;
            }
          }
          packet.payload = this._list.slice(this._pos, packet.length);
          debug("_parsePublish: payload from buffer list: %o", packet.payload);
        }
        _parseSubscribe() {
          debug("_parseSubscribe");
          const packet = this.packet;
          let topic;
          let options;
          let qos;
          let rh;
          let rap;
          let nl;
          let subscription;
          packet.subscriptions = [];
          if (!this._parseMessageId()) {
            return;
          }
          if (this.settings.protocolVersion === 5) {
            const properties = this._parseProperties();
            if (Object.getOwnPropertyNames(properties).length) {
              packet.properties = properties;
            }
          }
          if (packet.length <= 0) {
            return this._emitError(new Error("Malformed subscribe, no payload specified"));
          }
          while (this._pos < packet.length) {
            topic = this._parseString();
            if (topic === null) return this._emitError(new Error("Cannot parse topic"));
            if (this._pos >= packet.length) return this._emitError(new Error("Malformed Subscribe Payload"));
            options = this._parseByte();
            if (this.settings.protocolVersion === 5) {
              if (options & 192) {
                return this._emitError(new Error("Invalid subscribe topic flag bits, bits 7-6 must be 0"));
              }
            } else {
              if (options & 252) {
                return this._emitError(new Error("Invalid subscribe topic flag bits, bits 7-2 must be 0"));
              }
            }
            qos = options & constants.SUBSCRIBE_OPTIONS_QOS_MASK;
            if (qos > 2) {
              return this._emitError(new Error("Invalid subscribe QoS, must be <= 2"));
            }
            nl = (options >> constants.SUBSCRIBE_OPTIONS_NL_SHIFT & constants.SUBSCRIBE_OPTIONS_NL_MASK) !== 0;
            rap = (options >> constants.SUBSCRIBE_OPTIONS_RAP_SHIFT & constants.SUBSCRIBE_OPTIONS_RAP_MASK) !== 0;
            rh = options >> constants.SUBSCRIBE_OPTIONS_RH_SHIFT & constants.SUBSCRIBE_OPTIONS_RH_MASK;
            if (rh > 2) {
              return this._emitError(new Error("Invalid retain handling, must be <= 2"));
            }
            subscription = { topic, qos };
            if (this.settings.protocolVersion === 5) {
              subscription.nl = nl;
              subscription.rap = rap;
              subscription.rh = rh;
            } else if (this.settings.bridgeMode) {
              subscription.rh = 0;
              subscription.rap = true;
              subscription.nl = true;
            }
            debug("_parseSubscribe: push subscription `%s` to subscription", subscription);
            packet.subscriptions.push(subscription);
          }
        }
        _parseSuback() {
          debug("_parseSuback");
          const packet = this.packet;
          this.packet.granted = [];
          if (!this._parseMessageId()) {
            return;
          }
          if (this.settings.protocolVersion === 5) {
            const properties = this._parseProperties();
            if (Object.getOwnPropertyNames(properties).length) {
              packet.properties = properties;
            }
          }
          if (packet.length <= 0) {
            return this._emitError(new Error("Malformed suback, no payload specified"));
          }
          while (this._pos < this.packet.length) {
            const code = this._list.readUInt8(this._pos++);
            if (this.settings.protocolVersion === 5) {
              if (!constants.MQTT5_SUBACK_CODES[code]) {
                return this._emitError(new Error("Invalid suback code"));
              }
            } else {
              if (code > 2 && code !== 128) {
                return this._emitError(new Error("Invalid suback QoS, must be 0, 1, 2 or 128"));
              }
            }
            this.packet.granted.push(code);
          }
        }
        _parseUnsubscribe() {
          debug("_parseUnsubscribe");
          const packet = this.packet;
          packet.unsubscriptions = [];
          if (!this._parseMessageId()) {
            return;
          }
          if (this.settings.protocolVersion === 5) {
            const properties = this._parseProperties();
            if (Object.getOwnPropertyNames(properties).length) {
              packet.properties = properties;
            }
          }
          if (packet.length <= 0) {
            return this._emitError(new Error("Malformed unsubscribe, no payload specified"));
          }
          while (this._pos < packet.length) {
            const topic = this._parseString();
            if (topic === null) return this._emitError(new Error("Cannot parse topic"));
            debug("_parseUnsubscribe: push topic `%s` to unsubscriptions", topic);
            packet.unsubscriptions.push(topic);
          }
        }
        _parseUnsuback() {
          debug("_parseUnsuback");
          const packet = this.packet;
          if (!this._parseMessageId()) return this._emitError(new Error("Cannot parse messageId"));
          if ((this.settings.protocolVersion === 3 || this.settings.protocolVersion === 4) && packet.length !== 2) {
            return this._emitError(new Error("Malformed unsuback, payload length must be 2"));
          }
          if (packet.length <= 0) {
            return this._emitError(new Error("Malformed unsuback, no payload specified"));
          }
          if (this.settings.protocolVersion === 5) {
            const properties = this._parseProperties();
            if (Object.getOwnPropertyNames(properties).length) {
              packet.properties = properties;
            }
            packet.granted = [];
            while (this._pos < this.packet.length) {
              const code = this._list.readUInt8(this._pos++);
              if (!constants.MQTT5_UNSUBACK_CODES[code]) {
                return this._emitError(new Error("Invalid unsuback code"));
              }
              this.packet.granted.push(code);
            }
          }
        }
        // parse packets like puback, pubrec, pubrel, pubcomp
        _parseConfirmation() {
          debug("_parseConfirmation: packet.cmd: `%s`", this.packet.cmd);
          const packet = this.packet;
          this._parseMessageId();
          if (this.settings.protocolVersion === 5) {
            if (packet.length > 2) {
              packet.reasonCode = this._parseByte();
              switch (this.packet.cmd) {
                case "puback":
                case "pubrec":
                  if (!constants.MQTT5_PUBACK_PUBREC_CODES[packet.reasonCode]) {
                    return this._emitError(new Error("Invalid " + this.packet.cmd + " reason code"));
                  }
                  break;
                case "pubrel":
                case "pubcomp":
                  if (!constants.MQTT5_PUBREL_PUBCOMP_CODES[packet.reasonCode]) {
                    return this._emitError(new Error("Invalid " + this.packet.cmd + " reason code"));
                  }
                  break;
              }
              debug("_parseConfirmation: packet.reasonCode `%d`", packet.reasonCode);
            } else {
              packet.reasonCode = 0;
            }
            if (packet.length > 3) {
              const properties = this._parseProperties();
              if (Object.getOwnPropertyNames(properties).length) {
                packet.properties = properties;
              }
            }
          }
          return true;
        }
        // parse disconnect packet
        _parseDisconnect() {
          const packet = this.packet;
          debug("_parseDisconnect");
          if (this.settings.protocolVersion === 5) {
            if (this._list.length > 0) {
              packet.reasonCode = this._parseByte();
              if (!constants.MQTT5_DISCONNECT_CODES[packet.reasonCode]) {
                this._emitError(new Error("Invalid disconnect reason code"));
              }
            } else {
              packet.reasonCode = 0;
            }
            const properties = this._parseProperties();
            if (Object.getOwnPropertyNames(properties).length) {
              packet.properties = properties;
            }
          }
          debug("_parseDisconnect result: true");
          return true;
        }
        // parse auth packet
        _parseAuth() {
          debug("_parseAuth");
          const packet = this.packet;
          if (this.settings.protocolVersion !== 5) {
            return this._emitError(new Error("Not supported auth packet for this version MQTT"));
          }
          packet.reasonCode = this._parseByte();
          if (!constants.MQTT5_AUTH_CODES[packet.reasonCode]) {
            return this._emitError(new Error("Invalid auth reason code"));
          }
          const properties = this._parseProperties();
          if (Object.getOwnPropertyNames(properties).length) {
            packet.properties = properties;
          }
          debug("_parseAuth: result: true");
          return true;
        }
        _parseMessageId() {
          const packet = this.packet;
          packet.messageId = this._parseNum();
          if (packet.messageId === null) {
            this._emitError(new Error("Cannot parse messageId"));
            return false;
          }
          debug("_parseMessageId: packet.messageId %d", packet.messageId);
          return true;
        }
        _parseString(maybeBuffer) {
          const length = this._parseNum();
          const end = length + this._pos;
          if (length === -1 || end > this._list.length || end > this.packet.length) return null;
          const result = this._list.toString("utf8", this._pos, end);
          this._pos += length;
          debug("_parseString: result: %s", result);
          return result;
        }
        _parseStringPair() {
          debug("_parseStringPair");
          return {
            name: this._parseString(),
            value: this._parseString()
          };
        }
        _parseBuffer() {
          const length = this._parseNum();
          const end = length + this._pos;
          if (length === -1 || end > this._list.length || end > this.packet.length) return null;
          const result = this._list.slice(this._pos, end);
          this._pos += length;
          debug("_parseBuffer: result: %o", result);
          return result;
        }
        _parseNum() {
          if (this._list.length - this._pos < 2) return -1;
          const result = this._list.readUInt16BE(this._pos);
          this._pos += 2;
          debug("_parseNum: result: %s", result);
          return result;
        }
        _parse4ByteNum() {
          if (this._list.length - this._pos < 4) return -1;
          const result = this._list.readUInt32BE(this._pos);
          this._pos += 4;
          debug("_parse4ByteNum: result: %s", result);
          return result;
        }
        _parseVarByteNum(fullInfoFlag) {
          debug("_parseVarByteNum");
          const maxBytes = 4;
          let bytes = 0;
          let mul = 1;
          let value = 0;
          let result = false;
          let current;
          const padding = this._pos ? this._pos : 0;
          while (bytes < maxBytes && padding + bytes < this._list.length) {
            current = this._list.readUInt8(padding + bytes++);
            value += mul * (current & constants.VARBYTEINT_MASK);
            mul *= 128;
            if ((current & constants.VARBYTEINT_FIN_MASK) === 0) {
              result = true;
              break;
            }
            if (this._list.length <= bytes) {
              break;
            }
          }
          if (!result && bytes === maxBytes && this._list.length >= bytes) {
            this._emitError(new Error("Invalid variable byte integer"));
          }
          if (padding) {
            this._pos += bytes;
          }
          if (result) {
            if (fullInfoFlag) {
              result = { bytes, value };
            } else {
              result = value;
            }
          } else {
            result = false;
          }
          debug("_parseVarByteNum: result: %o", result);
          return result;
        }
        _parseByte() {
          let result;
          if (this._pos < this._list.length) {
            result = this._list.readUInt8(this._pos);
            this._pos++;
          }
          debug("_parseByte: result: %o", result);
          return result;
        }
        _parseByType(type) {
          debug("_parseByType: type: %s", type);
          switch (type) {
            case "byte": {
              return this._parseByte() !== 0;
            }
            case "int8": {
              return this._parseByte();
            }
            case "int16": {
              return this._parseNum();
            }
            case "int32": {
              return this._parse4ByteNum();
            }
            case "var": {
              return this._parseVarByteNum();
            }
            case "string": {
              return this._parseString();
            }
            case "pair": {
              return this._parseStringPair();
            }
            case "binary": {
              return this._parseBuffer();
            }
          }
        }
        _parseProperties() {
          debug("_parseProperties");
          const length = this._parseVarByteNum();
          const start = this._pos;
          const end = start + length;
          const result = {};
          while (this._pos < end) {
            const type = this._parseByte();
            if (!type) {
              this._emitError(new Error("Cannot parse property code type"));
              return false;
            }
            const name2 = constants.propertiesCodes[type];
            if (!name2) {
              this._emitError(new Error("Unknown property"));
              return false;
            }
            if (name2 === "userProperties") {
              if (!result[name2]) {
                result[name2] = /* @__PURE__ */ Object.create(null);
              }
              const currentUserProperty = this._parseByType(constants.propertiesTypes[name2]);
              if (result[name2][currentUserProperty.name]) {
                if (Array.isArray(result[name2][currentUserProperty.name])) {
                  result[name2][currentUserProperty.name].push(currentUserProperty.value);
                } else {
                  const currentValue = result[name2][currentUserProperty.name];
                  result[name2][currentUserProperty.name] = [currentValue];
                  result[name2][currentUserProperty.name].push(currentUserProperty.value);
                }
              } else {
                result[name2][currentUserProperty.name] = currentUserProperty.value;
              }
              continue;
            }
            if (result[name2]) {
              if (Array.isArray(result[name2])) {
                result[name2].push(this._parseByType(constants.propertiesTypes[name2]));
              } else {
                result[name2] = [result[name2]];
                result[name2].push(this._parseByType(constants.propertiesTypes[name2]));
              }
            } else {
              result[name2] = this._parseByType(constants.propertiesTypes[name2]);
            }
          }
          return result;
        }
        _newPacket() {
          debug("_newPacket");
          if (this.packet) {
            this._list.consume(this.packet.length);
            debug("_newPacket: parser emit packet: packet.cmd: %s, packet.payload: %s, packet.length: %d", this.packet.cmd, this.packet.payload, this.packet.length);
            this.emit("packet", this.packet);
          }
          debug("_newPacket: new packet");
          this.packet = new Packet();
          this._pos = 0;
          return true;
        }
        _emitError(err) {
          debug("_emitError", err);
          this.error = err;
          this.emit("error", err);
        }
      };
      module.exports = Parser;
    }
  });

  // node_modules/mqtt-packet/numbers.js
  var require_numbers = __commonJS({
    "node_modules/mqtt-packet/numbers.js"(exports8, module) {
      init_dirname();
      init_buffer2();
      init_process2();
      var { Buffer: Buffer3 } = (init_buffer(), __toCommonJS(buffer_exports));
      var max = 65536;
      var cache = {};
      var SubOk = Buffer3.isBuffer(Buffer3.from([1, 2]).subarray(0, 1));
      function generateBuffer(i) {
        const buffer = Buffer3.allocUnsafe(2);
        buffer.writeUInt8(i >> 8, 0);
        buffer.writeUInt8(i & 255, 0 + 1);
        return buffer;
      }
      function generateCache() {
        for (let i = 0; i < max; i++) {
          cache[i] = generateBuffer(i);
        }
      }
      function genBufVariableByteInt(num) {
        const maxLength = 4;
        let digit = 0;
        let pos = 0;
        const buffer = Buffer3.allocUnsafe(maxLength);
        do {
          digit = num % 128 | 0;
          num = num / 128 | 0;
          if (num > 0) digit = digit | 128;
          buffer.writeUInt8(digit, pos++);
        } while (num > 0 && pos < maxLength);
        if (num > 0) {
          pos = 0;
        }
        return SubOk ? buffer.subarray(0, pos) : buffer.slice(0, pos);
      }
      function generate4ByteBuffer(num) {
        const buffer = Buffer3.allocUnsafe(4);
        buffer.writeUInt32BE(num, 0);
        return buffer;
      }
      module.exports = {
        cache,
        generateCache,
        generateNumber: generateBuffer,
        genBufVariableByteInt,
        generate4ByteBuffer
      };
    }
  });

  // node_modules/process-nextick-args/index.js
  var require_process_nextick_args = __commonJS({
    "node_modules/process-nextick-args/index.js"(exports8, module) {
      "use strict";
      init_dirname();
      init_buffer2();
      init_process2();
      if (typeof process_exports === "undefined" || !process_exports.version || process_exports.version.indexOf("v0.") === 0 || process_exports.version.indexOf("v1.") === 0 && process_exports.version.indexOf("v1.8.") !== 0) {
        module.exports = { nextTick: nextTick3 };
      } else {
        module.exports = process_exports;
      }
      function nextTick3(fn, arg1, arg2, arg3) {
        if (typeof fn !== "function") {
          throw new TypeError('"callback" argument must be a function');
        }
        var len = arguments.length;
        var args, i;
        switch (len) {
          case 0:
          case 1:
            return process_exports.nextTick(fn);
          case 2:
            return process_exports.nextTick(function afterTickOne() {
              fn.call(null, arg1);
            });
          case 3:
            return process_exports.nextTick(function afterTickTwo() {
              fn.call(null, arg1, arg2);
            });
          case 4:
            return process_exports.nextTick(function afterTickThree() {
              fn.call(null, arg1, arg2, arg3);
            });
          default:
            args = new Array(len - 1);
            i = 0;
            while (i < args.length) {
              args[i++] = arguments[i];
            }
            return process_exports.nextTick(function afterTick() {
              fn.apply(null, args);
            });
        }
      }
    }
  });

  // node_modules/mqtt-packet/writeToStream.js
  var require_writeToStream = __commonJS({
    "node_modules/mqtt-packet/writeToStream.js"(exports8, module) {
      init_dirname();
      init_buffer2();
      init_process2();
      var protocol = require_constants();
      var { Buffer: Buffer3 } = (init_buffer(), __toCommonJS(buffer_exports));
      var empty2 = Buffer3.allocUnsafe(0);
      var zeroBuf = Buffer3.from([0]);
      var numbers = require_numbers();
      var nextTick3 = require_process_nextick_args().nextTick;
      var debug = require_browser4()("mqtt-packet:writeToStream");
      var numCache = numbers.cache;
      var generateNumber = numbers.generateNumber;
      var generateCache = numbers.generateCache;
      var genBufVariableByteInt = numbers.genBufVariableByteInt;
      var generate4ByteBuffer = numbers.generate4ByteBuffer;
      var writeNumber = writeNumberCached;
      var toGenerate = true;
      function generate(packet, stream, opts) {
        debug("generate called");
        if (stream.cork) {
          stream.cork();
          nextTick3(uncork, stream);
        }
        if (toGenerate) {
          toGenerate = false;
          generateCache();
        }
        debug("generate: packet.cmd: %s", packet.cmd);
        switch (packet.cmd) {
          case "connect":
            return connect(packet, stream, opts);
          case "connack":
            return connack(packet, stream, opts);
          case "publish":
            return publish(packet, stream, opts);
          case "puback":
          case "pubrec":
          case "pubrel":
          case "pubcomp":
            return confirmation(packet, stream, opts);
          case "subscribe":
            return subscribe(packet, stream, opts);
          case "suback":
            return suback(packet, stream, opts);
          case "unsubscribe":
            return unsubscribe(packet, stream, opts);
          case "unsuback":
            return unsuback(packet, stream, opts);
          case "pingreq":
          case "pingresp":
            return emptyPacket(packet, stream, opts);
          case "disconnect":
            return disconnect(packet, stream, opts);
          case "auth":
            return auth(packet, stream, opts);
          default:
            stream.destroy(new Error("Unknown command"));
            return false;
        }
      }
      Object.defineProperty(generate, "cacheNumbers", {
        get() {
          return writeNumber === writeNumberCached;
        },
        set(value) {
          if (value) {
            if (!numCache || Object.keys(numCache).length === 0) toGenerate = true;
            writeNumber = writeNumberCached;
          } else {
            toGenerate = false;
            writeNumber = writeNumberGenerated;
          }
        }
      });
      function uncork(stream) {
        stream.uncork();
      }
      function connect(packet, stream, opts) {
        const settings = packet || {};
        const protocolId = settings.protocolId || "MQTT";
        let protocolVersion = settings.protocolVersion || 4;
        const will = settings.will;
        let clean = settings.clean;
        const keepalive = settings.keepalive || 0;
        const clientId = settings.clientId || "";
        const username = settings.username;
        const password = settings.password;
        const properties = settings.properties;
        if (clean === void 0) clean = true;
        let length = 0;
        if (!protocolId || typeof protocolId !== "string" && !Buffer3.isBuffer(protocolId)) {
          stream.destroy(new Error("Invalid protocolId"));
          return false;
        } else length += protocolId.length + 2;
        if (protocolVersion !== 3 && protocolVersion !== 4 && protocolVersion !== 5) {
          stream.destroy(new Error("Invalid protocol version"));
          return false;
        } else length += 1;
        if ((typeof clientId === "string" || Buffer3.isBuffer(clientId)) && (clientId || protocolVersion >= 4) && (clientId || clean)) {
          length += Buffer3.byteLength(clientId) + 2;
        } else {
          if (protocolVersion < 4) {
            stream.destroy(new Error("clientId must be supplied before 3.1.1"));
            return false;
          }
          if (clean * 1 === 0) {
            stream.destroy(new Error("clientId must be given if cleanSession set to 0"));
            return false;
          }
        }
        if (typeof keepalive !== "number" || keepalive < 0 || keepalive > 65535 || keepalive % 1 !== 0) {
          stream.destroy(new Error("Invalid keepalive"));
          return false;
        } else length += 2;
        length += 1;
        let propertiesData;
        let willProperties;
        if (protocolVersion === 5) {
          propertiesData = getProperties(stream, properties);
          if (!propertiesData) {
            return false;
          }
          length += propertiesData.length;
        }
        if (will) {
          if (typeof will !== "object") {
            stream.destroy(new Error("Invalid will"));
            return false;
          }
          if (!will.topic || typeof will.topic !== "string") {
            stream.destroy(new Error("Invalid will topic"));
            return false;
          } else {
            length += Buffer3.byteLength(will.topic) + 2;
          }
          length += 2;
          if (will.payload) {
            if (will.payload.length >= 0) {
              if (typeof will.payload === "string") {
                length += Buffer3.byteLength(will.payload);
              } else {
                length += will.payload.length;
              }
            } else {
              stream.destroy(new Error("Invalid will payload"));
              return false;
            }
          }
          willProperties = {};
          if (protocolVersion === 5) {
            willProperties = getProperties(stream, will.properties);
            if (!willProperties) {
              return false;
            }
            length += willProperties.length;
          }
        }
        let providedUsername = false;
        if (username != null) {
          if (isStringOrBuffer(username)) {
            providedUsername = true;
            length += Buffer3.byteLength(username) + 2;
          } else {
            stream.destroy(new Error("Invalid username"));
            return false;
          }
        }
        if (password != null) {
          if (!providedUsername) {
            stream.destroy(new Error("Username is required to use password"));
            return false;
          }
          if (isStringOrBuffer(password)) {
            length += byteLength(password) + 2;
          } else {
            stream.destroy(new Error("Invalid password"));
            return false;
          }
        }
        stream.write(protocol.CONNECT_HEADER);
        writeVarByteInt(stream, length);
        writeStringOrBuffer(stream, protocolId);
        if (settings.bridgeMode) {
          protocolVersion += 128;
        }
        stream.write(
          protocolVersion === 131 ? protocol.VERSION131 : protocolVersion === 132 ? protocol.VERSION132 : protocolVersion === 4 ? protocol.VERSION4 : protocolVersion === 5 ? protocol.VERSION5 : protocol.VERSION3
        );
        let flags = 0;
        flags |= username != null ? protocol.USERNAME_MASK : 0;
        flags |= password != null ? protocol.PASSWORD_MASK : 0;
        flags |= will && will.retain ? protocol.WILL_RETAIN_MASK : 0;
        flags |= will && will.qos ? will.qos << protocol.WILL_QOS_SHIFT : 0;
        flags |= will ? protocol.WILL_FLAG_MASK : 0;
        flags |= clean ? protocol.CLEAN_SESSION_MASK : 0;
        stream.write(Buffer3.from([flags]));
        writeNumber(stream, keepalive);
        if (protocolVersion === 5) {
          propertiesData.write();
        }
        writeStringOrBuffer(stream, clientId);
        if (will) {
          if (protocolVersion === 5) {
            willProperties.write();
          }
          writeString(stream, will.topic);
          writeStringOrBuffer(stream, will.payload);
        }
        if (username != null) {
          writeStringOrBuffer(stream, username);
        }
        if (password != null) {
          writeStringOrBuffer(stream, password);
        }
        return true;
      }
      function connack(packet, stream, opts) {
        const version4 = opts ? opts.protocolVersion : 4;
        const settings = packet || {};
        const rc = version4 === 5 ? settings.reasonCode : settings.returnCode;
        const properties = settings.properties;
        let length = 2;
        if (typeof rc !== "number") {
          stream.destroy(new Error("Invalid return code"));
          return false;
        }
        let propertiesData = null;
        if (version4 === 5) {
          propertiesData = getProperties(stream, properties);
          if (!propertiesData) {
            return false;
          }
          length += propertiesData.length;
        }
        stream.write(protocol.CONNACK_HEADER);
        writeVarByteInt(stream, length);
        stream.write(settings.sessionPresent ? protocol.SESSIONPRESENT_HEADER : zeroBuf);
        stream.write(Buffer3.from([rc]));
        if (propertiesData != null) {
          propertiesData.write();
        }
        return true;
      }
      function publish(packet, stream, opts) {
        debug("publish: packet: %o", packet);
        const version4 = opts ? opts.protocolVersion : 4;
        const settings = packet || {};
        const qos = settings.qos || 0;
        const retain = settings.retain ? protocol.RETAIN_MASK : 0;
        const topic = settings.topic;
        const payload = settings.payload || empty2;
        const id = settings.messageId;
        const properties = settings.properties;
        let length = 0;
        if (typeof topic === "string") length += Buffer3.byteLength(topic) + 2;
        else if (Buffer3.isBuffer(topic)) length += topic.length + 2;
        else {
          stream.destroy(new Error("Invalid topic"));
          return false;
        }
        if (!Buffer3.isBuffer(payload)) length += Buffer3.byteLength(payload);
        else length += payload.length;
        if (qos && typeof id !== "number") {
          stream.destroy(new Error("Invalid messageId"));
          return false;
        } else if (qos) length += 2;
        let propertiesData = null;
        if (version4 === 5) {
          propertiesData = getProperties(stream, properties);
          if (!propertiesData) {
            return false;
          }
          length += propertiesData.length;
        }
        stream.write(protocol.PUBLISH_HEADER[qos][settings.dup ? 1 : 0][retain ? 1 : 0]);
        writeVarByteInt(stream, length);
        writeNumber(stream, byteLength(topic));
        stream.write(topic);
        if (qos > 0) writeNumber(stream, id);
        if (propertiesData != null) {
          propertiesData.write();
        }
        debug("publish: payload: %o", payload);
        return stream.write(payload);
      }
      function confirmation(packet, stream, opts) {
        const version4 = opts ? opts.protocolVersion : 4;
        const settings = packet || {};
        const type = settings.cmd || "puback";
        const id = settings.messageId;
        const dup = settings.dup && type === "pubrel" ? protocol.DUP_MASK : 0;
        let qos = 0;
        const reasonCode = settings.reasonCode;
        const properties = settings.properties;
        let length = version4 === 5 ? 3 : 2;
        if (type === "pubrel") qos = 1;
        if (typeof id !== "number") {
          stream.destroy(new Error("Invalid messageId"));
          return false;
        }
        let propertiesData = null;
        if (version4 === 5) {
          if (typeof properties === "object") {
            propertiesData = getPropertiesByMaximumPacketSize(stream, properties, opts, length);
            if (!propertiesData) {
              return false;
            }
            length += propertiesData.length;
          }
        }
        stream.write(protocol.ACKS[type][qos][dup][0]);
        if (length === 3) length += reasonCode !== 0 ? 1 : -1;
        writeVarByteInt(stream, length);
        writeNumber(stream, id);
        if (version4 === 5 && length !== 2) {
          stream.write(Buffer3.from([reasonCode]));
        }
        if (propertiesData !== null) {
          propertiesData.write();
        } else {
          if (length === 4) {
            stream.write(Buffer3.from([0]));
          }
        }
        return true;
      }
      function subscribe(packet, stream, opts) {
        debug("subscribe: packet: ");
        const version4 = opts ? opts.protocolVersion : 4;
        const settings = packet || {};
        const dup = settings.dup ? protocol.DUP_MASK : 0;
        const id = settings.messageId;
        const subs = settings.subscriptions;
        const properties = settings.properties;
        let length = 0;
        if (typeof id !== "number") {
          stream.destroy(new Error("Invalid messageId"));
          return false;
        } else length += 2;
        let propertiesData = null;
        if (version4 === 5) {
          propertiesData = getProperties(stream, properties);
          if (!propertiesData) {
            return false;
          }
          length += propertiesData.length;
        }
        if (typeof subs === "object" && subs.length) {
          for (let i = 0; i < subs.length; i += 1) {
            const itopic = subs[i].topic;
            const iqos = subs[i].qos;
            if (typeof itopic !== "string") {
              stream.destroy(new Error("Invalid subscriptions - invalid topic"));
              return false;
            }
            if (typeof iqos !== "number") {
              stream.destroy(new Error("Invalid subscriptions - invalid qos"));
              return false;
            }
            if (version4 === 5) {
              const nl = subs[i].nl || false;
              if (typeof nl !== "boolean") {
                stream.destroy(new Error("Invalid subscriptions - invalid No Local"));
                return false;
              }
              const rap = subs[i].rap || false;
              if (typeof rap !== "boolean") {
                stream.destroy(new Error("Invalid subscriptions - invalid Retain as Published"));
                return false;
              }
              const rh = subs[i].rh || 0;
              if (typeof rh !== "number" || rh > 2) {
                stream.destroy(new Error("Invalid subscriptions - invalid Retain Handling"));
                return false;
              }
            }
            length += Buffer3.byteLength(itopic) + 2 + 1;
          }
        } else {
          stream.destroy(new Error("Invalid subscriptions"));
          return false;
        }
        debug("subscribe: writing to stream: %o", protocol.SUBSCRIBE_HEADER);
        stream.write(protocol.SUBSCRIBE_HEADER[1][dup ? 1 : 0][0]);
        writeVarByteInt(stream, length);
        writeNumber(stream, id);
        if (propertiesData !== null) {
          propertiesData.write();
        }
        let result = true;
        for (const sub of subs) {
          const jtopic = sub.topic;
          const jqos = sub.qos;
          const jnl = +sub.nl;
          const jrap = +sub.rap;
          const jrh = sub.rh;
          let joptions;
          writeString(stream, jtopic);
          joptions = protocol.SUBSCRIBE_OPTIONS_QOS[jqos];
          if (version4 === 5) {
            joptions |= jnl ? protocol.SUBSCRIBE_OPTIONS_NL : 0;
            joptions |= jrap ? protocol.SUBSCRIBE_OPTIONS_RAP : 0;
            joptions |= jrh ? protocol.SUBSCRIBE_OPTIONS_RH[jrh] : 0;
          }
          result = stream.write(Buffer3.from([joptions]));
        }
        return result;
      }
      function suback(packet, stream, opts) {
        const version4 = opts ? opts.protocolVersion : 4;
        const settings = packet || {};
        const id = settings.messageId;
        const granted = settings.granted;
        const properties = settings.properties;
        let length = 0;
        if (typeof id !== "number") {
          stream.destroy(new Error("Invalid messageId"));
          return false;
        } else length += 2;
        if (typeof granted === "object" && granted.length) {
          for (let i = 0; i < granted.length; i += 1) {
            if (typeof granted[i] !== "number") {
              stream.destroy(new Error("Invalid qos vector"));
              return false;
            }
            length += 1;
          }
        } else {
          stream.destroy(new Error("Invalid qos vector"));
          return false;
        }
        let propertiesData = null;
        if (version4 === 5) {
          propertiesData = getPropertiesByMaximumPacketSize(stream, properties, opts, length);
          if (!propertiesData) {
            return false;
          }
          length += propertiesData.length;
        }
        stream.write(protocol.SUBACK_HEADER);
        writeVarByteInt(stream, length);
        writeNumber(stream, id);
        if (propertiesData !== null) {
          propertiesData.write();
        }
        return stream.write(Buffer3.from(granted));
      }
      function unsubscribe(packet, stream, opts) {
        const version4 = opts ? opts.protocolVersion : 4;
        const settings = packet || {};
        const id = settings.messageId;
        const dup = settings.dup ? protocol.DUP_MASK : 0;
        const unsubs = settings.unsubscriptions;
        const properties = settings.properties;
        let length = 0;
        if (typeof id !== "number") {
          stream.destroy(new Error("Invalid messageId"));
          return false;
        } else {
          length += 2;
        }
        if (typeof unsubs === "object" && unsubs.length) {
          for (let i = 0; i < unsubs.length; i += 1) {
            if (typeof unsubs[i] !== "string") {
              stream.destroy(new Error("Invalid unsubscriptions"));
              return false;
            }
            length += Buffer3.byteLength(unsubs[i]) + 2;
          }
        } else {
          stream.destroy(new Error("Invalid unsubscriptions"));
          return false;
        }
        let propertiesData = null;
        if (version4 === 5) {
          propertiesData = getProperties(stream, properties);
          if (!propertiesData) {
            return false;
          }
          length += propertiesData.length;
        }
        stream.write(protocol.UNSUBSCRIBE_HEADER[1][dup ? 1 : 0][0]);
        writeVarByteInt(stream, length);
        writeNumber(stream, id);
        if (propertiesData !== null) {
          propertiesData.write();
        }
        let result = true;
        for (let j = 0; j < unsubs.length; j++) {
          result = writeString(stream, unsubs[j]);
        }
        return result;
      }
      function unsuback(packet, stream, opts) {
        const version4 = opts ? opts.protocolVersion : 4;
        const settings = packet || {};
        const id = settings.messageId;
        const dup = settings.dup ? protocol.DUP_MASK : 0;
        const granted = settings.granted;
        const properties = settings.properties;
        const type = settings.cmd;
        const qos = 0;
        let length = 2;
        if (typeof id !== "number") {
          stream.destroy(new Error("Invalid messageId"));
          return false;
        }
        if (version4 === 5) {
          if (typeof granted === "object" && granted.length) {
            for (let i = 0; i < granted.length; i += 1) {
              if (typeof granted[i] !== "number") {
                stream.destroy(new Error("Invalid qos vector"));
                return false;
              }
              length += 1;
            }
          } else {
            stream.destroy(new Error("Invalid qos vector"));
            return false;
          }
        }
        let propertiesData = null;
        if (version4 === 5) {
          propertiesData = getPropertiesByMaximumPacketSize(stream, properties, opts, length);
          if (!propertiesData) {
            return false;
          }
          length += propertiesData.length;
        }
        stream.write(protocol.ACKS[type][qos][dup][0]);
        writeVarByteInt(stream, length);
        writeNumber(stream, id);
        if (propertiesData !== null) {
          propertiesData.write();
        }
        if (version4 === 5) {
          stream.write(Buffer3.from(granted));
        }
        return true;
      }
      function emptyPacket(packet, stream, opts) {
        return stream.write(protocol.EMPTY[packet.cmd]);
      }
      function disconnect(packet, stream, opts) {
        const version4 = opts ? opts.protocolVersion : 4;
        const settings = packet || {};
        const reasonCode = settings.reasonCode;
        const properties = settings.properties;
        let length = version4 === 5 ? 1 : 0;
        let propertiesData = null;
        if (version4 === 5) {
          propertiesData = getPropertiesByMaximumPacketSize(stream, properties, opts, length);
          if (!propertiesData) {
            return false;
          }
          length += propertiesData.length;
        }
        stream.write(Buffer3.from([protocol.codes.disconnect << 4]));
        writeVarByteInt(stream, length);
        if (version4 === 5) {
          stream.write(Buffer3.from([reasonCode]));
        }
        if (propertiesData !== null) {
          propertiesData.write();
        }
        return true;
      }
      function auth(packet, stream, opts) {
        const version4 = opts ? opts.protocolVersion : 4;
        const settings = packet || {};
        const reasonCode = settings.reasonCode;
        const properties = settings.properties;
        let length = version4 === 5 ? 1 : 0;
        if (version4 !== 5) stream.destroy(new Error("Invalid mqtt version for auth packet"));
        const propertiesData = getPropertiesByMaximumPacketSize(stream, properties, opts, length);
        if (!propertiesData) {
          return false;
        }
        length += propertiesData.length;
        stream.write(Buffer3.from([protocol.codes.auth << 4]));
        writeVarByteInt(stream, length);
        stream.write(Buffer3.from([reasonCode]));
        if (propertiesData !== null) {
          propertiesData.write();
        }
        return true;
      }
      var varByteIntCache = {};
      function writeVarByteInt(stream, num) {
        if (num > protocol.VARBYTEINT_MAX) {
          stream.destroy(new Error(`Invalid variable byte integer: ${num}`));
          return false;
        }
        let buffer = varByteIntCache[num];
        if (!buffer) {
          buffer = genBufVariableByteInt(num);
          if (num < 16384) varByteIntCache[num] = buffer;
        }
        debug("writeVarByteInt: writing to stream: %o", buffer);
        return stream.write(buffer);
      }
      function writeString(stream, string) {
        const strlen = Buffer3.byteLength(string);
        writeNumber(stream, strlen);
        debug("writeString: %s", string);
        return stream.write(string, "utf8");
      }
      function writeStringPair(stream, name2, value) {
        writeString(stream, name2);
        writeString(stream, value);
      }
      function writeNumberCached(stream, number) {
        debug("writeNumberCached: number: %d", number);
        debug("writeNumberCached: %o", numCache[number]);
        return stream.write(numCache[number]);
      }
      function writeNumberGenerated(stream, number) {
        const generatedNumber = generateNumber(number);
        debug("writeNumberGenerated: %o", generatedNumber);
        return stream.write(generatedNumber);
      }
      function write4ByteNumber(stream, number) {
        const generated4ByteBuffer = generate4ByteBuffer(number);
        debug("write4ByteNumber: %o", generated4ByteBuffer);
        return stream.write(generated4ByteBuffer);
      }
      function writeStringOrBuffer(stream, toWrite) {
        if (typeof toWrite === "string") {
          writeString(stream, toWrite);
        } else if (toWrite) {
          writeNumber(stream, toWrite.length);
          stream.write(toWrite);
        } else writeNumber(stream, 0);
      }
      function getProperties(stream, properties) {
        if (typeof properties !== "object" || properties.length != null) {
          return {
            length: 1,
            write() {
              writeProperties(stream, {}, 0);
            }
          };
        }
        let propertiesLength = 0;
        function getLengthProperty(name2, value) {
          const type = protocol.propertiesTypes[name2];
          let length = 0;
          switch (type) {
            case "byte": {
              if (typeof value !== "boolean") {
                stream.destroy(new Error(`Invalid ${name2}: ${value}`));
                return false;
              }
              length += 1 + 1;
              break;
            }
            case "int8": {
              if (typeof value !== "number" || value < 0 || value > 255) {
                stream.destroy(new Error(`Invalid ${name2}: ${value}`));
                return false;
              }
              length += 1 + 1;
              break;
            }
            case "binary": {
              if (value && value === null) {
                stream.destroy(new Error(`Invalid ${name2}: ${value}`));
                return false;
              }
              length += 1 + Buffer3.byteLength(value) + 2;
              break;
            }
            case "int16": {
              if (typeof value !== "number" || value < 0 || value > 65535) {
                stream.destroy(new Error(`Invalid ${name2}: ${value}`));
                return false;
              }
              length += 1 + 2;
              break;
            }
            case "int32": {
              if (typeof value !== "number" || value < 0 || value > 4294967295) {
                stream.destroy(new Error(`Invalid ${name2}: ${value}`));
                return false;
              }
              length += 1 + 4;
              break;
            }
            case "var": {
              if (typeof value !== "number" || value < 0 || value > 268435455) {
                stream.destroy(new Error(`Invalid ${name2}: ${value}`));
                return false;
              }
              length += 1 + Buffer3.byteLength(genBufVariableByteInt(value));
              break;
            }
            case "string": {
              if (typeof value !== "string") {
                stream.destroy(new Error(`Invalid ${name2}: ${value}`));
                return false;
              }
              length += 1 + 2 + Buffer3.byteLength(value.toString());
              break;
            }
            case "pair": {
              if (typeof value !== "object") {
                stream.destroy(new Error(`Invalid ${name2}: ${value}`));
                return false;
              }
              length += Object.getOwnPropertyNames(value).reduce((result, name3) => {
                const currentValue = value[name3];
                if (Array.isArray(currentValue)) {
                  result += currentValue.reduce((currentLength, value2) => {
                    currentLength += 1 + 2 + Buffer3.byteLength(name3.toString()) + 2 + Buffer3.byteLength(value2.toString());
                    return currentLength;
                  }, 0);
                } else {
                  result += 1 + 2 + Buffer3.byteLength(name3.toString()) + 2 + Buffer3.byteLength(value[name3].toString());
                }
                return result;
              }, 0);
              break;
            }
            default: {
              stream.destroy(new Error(`Invalid property ${name2}: ${value}`));
              return false;
            }
          }
          return length;
        }
        if (properties) {
          for (const propName in properties) {
            let propLength = 0;
            let propValueLength = 0;
            const propValue = properties[propName];
            if (propValue === void 0) {
              continue;
            } else if (Array.isArray(propValue)) {
              for (let valueIndex = 0; valueIndex < propValue.length; valueIndex++) {
                propValueLength = getLengthProperty(propName, propValue[valueIndex]);
                if (!propValueLength) {
                  return false;
                }
                propLength += propValueLength;
              }
            } else {
              propValueLength = getLengthProperty(propName, propValue);
              if (!propValueLength) {
                return false;
              }
              propLength = propValueLength;
            }
            if (!propLength) return false;
            propertiesLength += propLength;
          }
        }
        const propertiesLengthLength = Buffer3.byteLength(genBufVariableByteInt(propertiesLength));
        return {
          length: propertiesLengthLength + propertiesLength,
          write() {
            writeProperties(stream, properties, propertiesLength);
          }
        };
      }
      function getPropertiesByMaximumPacketSize(stream, properties, opts, length) {
        const mayEmptyProps = ["reasonString", "userProperties"];
        const maximumPacketSize = opts && opts.properties && opts.properties.maximumPacketSize ? opts.properties.maximumPacketSize : 0;
        let propertiesData = getProperties(stream, properties);
        if (maximumPacketSize) {
          while (length + propertiesData.length > maximumPacketSize) {
            const currentMayEmptyProp = mayEmptyProps.shift();
            if (currentMayEmptyProp && properties[currentMayEmptyProp]) {
              delete properties[currentMayEmptyProp];
              propertiesData = getProperties(stream, properties);
            } else {
              return false;
            }
          }
        }
        return propertiesData;
      }
      function writeProperty(stream, propName, value) {
        const type = protocol.propertiesTypes[propName];
        switch (type) {
          case "byte": {
            stream.write(Buffer3.from([protocol.properties[propName]]));
            stream.write(Buffer3.from([+value]));
            break;
          }
          case "int8": {
            stream.write(Buffer3.from([protocol.properties[propName]]));
            stream.write(Buffer3.from([value]));
            break;
          }
          case "binary": {
            stream.write(Buffer3.from([protocol.properties[propName]]));
            writeStringOrBuffer(stream, value);
            break;
          }
          case "int16": {
            stream.write(Buffer3.from([protocol.properties[propName]]));
            writeNumber(stream, value);
            break;
          }
          case "int32": {
            stream.write(Buffer3.from([protocol.properties[propName]]));
            write4ByteNumber(stream, value);
            break;
          }
          case "var": {
            stream.write(Buffer3.from([protocol.properties[propName]]));
            writeVarByteInt(stream, value);
            break;
          }
          case "string": {
            stream.write(Buffer3.from([protocol.properties[propName]]));
            writeString(stream, value);
            break;
          }
          case "pair": {
            Object.getOwnPropertyNames(value).forEach((name2) => {
              const currentValue = value[name2];
              if (Array.isArray(currentValue)) {
                currentValue.forEach((value2) => {
                  stream.write(Buffer3.from([protocol.properties[propName]]));
                  writeStringPair(stream, name2.toString(), value2.toString());
                });
              } else {
                stream.write(Buffer3.from([protocol.properties[propName]]));
                writeStringPair(stream, name2.toString(), currentValue.toString());
              }
            });
            break;
          }
          default: {
            stream.destroy(new Error(`Invalid property ${propName} value: ${value}`));
            return false;
          }
        }
      }
      function writeProperties(stream, properties, propertiesLength) {
        writeVarByteInt(stream, propertiesLength);
        for (const propName in properties) {
          if (Object.prototype.hasOwnProperty.call(properties, propName) && properties[propName] != null) {
            const value = properties[propName];
            if (Array.isArray(value)) {
              for (let valueIndex = 0; valueIndex < value.length; valueIndex++) {
                writeProperty(stream, propName, value[valueIndex]);
              }
            } else {
              writeProperty(stream, propName, value);
            }
          }
        }
      }
      function byteLength(bufOrString) {
        if (!bufOrString) return 0;
        else if (bufOrString instanceof Buffer3) return bufOrString.length;
        else return Buffer3.byteLength(bufOrString);
      }
      function isStringOrBuffer(field) {
        return typeof field === "string" || field instanceof Buffer3;
      }
      module.exports = generate;
    }
  });

  // node_modules/mqtt-packet/generate.js
  var require_generate = __commonJS({
    "node_modules/mqtt-packet/generate.js"(exports8, module) {
      init_dirname();
      init_buffer2();
      init_process2();
      var writeToStream = require_writeToStream();
      var { EventEmitter: EventEmitter2 } = (init_events(), __toCommonJS(events_exports));
      var { Buffer: Buffer3 } = (init_buffer(), __toCommonJS(buffer_exports));
      function generate(packet, opts) {
        const stream = new Accumulator();
        writeToStream(packet, stream, opts);
        return stream.concat();
      }
      var Accumulator = class extends EventEmitter2 {
        constructor() {
          super();
          this._array = new Array(20);
          this._i = 0;
        }
        write(chunk) {
          this._array[this._i++] = chunk;
          return true;
        }
        concat() {
          let length = 0;
          const lengths = new Array(this._array.length);
          const list = this._array;
          let pos = 0;
          let i;
          for (i = 0; i < list.length && list[i] !== void 0; i++) {
            if (typeof list[i] !== "string") lengths[i] = list[i].length;
            else lengths[i] = Buffer3.byteLength(list[i]);
            length += lengths[i];
          }
          const result = Buffer3.allocUnsafe(length);
          for (i = 0; i < list.length && list[i] !== void 0; i++) {
            if (typeof list[i] !== "string") {
              list[i].copy(result, pos);
              pos += lengths[i];
            } else {
              result.write(list[i], pos);
              pos += lengths[i];
            }
          }
          return result;
        }
        destroy(err) {
          if (err) this.emit("error", err);
        }
      };
      module.exports = generate;
    }
  });

  // node_modules/mqtt-packet/mqtt.js
  var require_mqtt = __commonJS({
    "node_modules/mqtt-packet/mqtt.js"(exports8) {
      init_dirname();
      init_buffer2();
      init_process2();
      exports8.parser = require_parser().parser;
      exports8.generate = require_generate();
      exports8.writeToStream = require_writeToStream();
    }
  });

  // node_modules/rfdc/index.js
  var require_rfdc = __commonJS({
    "node_modules/rfdc/index.js"(exports8, module) {
      "use strict";
      init_dirname();
      init_buffer2();
      init_process2();
      module.exports = rfdc;
      function copyBuffer(cur) {
        if (cur instanceof Buffer2) {
          return Buffer2.from(cur);
        }
        return new cur.constructor(cur.buffer.slice(), cur.byteOffset, cur.length);
      }
      function rfdc(opts) {
        opts = opts || {};
        if (opts.circles) return rfdcCircles(opts);
        const constructorHandlers = /* @__PURE__ */ new Map();
        constructorHandlers.set(Date, (o) => new Date(o));
        constructorHandlers.set(Map, (o, fn) => new Map(cloneArray(Array.from(o), fn)));
        constructorHandlers.set(Set, (o, fn) => new Set(cloneArray(Array.from(o), fn)));
        if (opts.constructorHandlers) {
          for (const handler2 of opts.constructorHandlers) {
            constructorHandlers.set(handler2[0], handler2[1]);
          }
        }
        let handler = null;
        return opts.proto ? cloneProto : clone;
        function cloneArray(a, fn) {
          const keys = Object.keys(a);
          const a2 = new Array(keys.length);
          for (let i = 0; i < keys.length; i++) {
            const k = keys[i];
            const cur = a[k];
            if (typeof cur !== "object" || cur === null) {
              a2[k] = cur;
            } else if (cur.constructor !== Object && (handler = constructorHandlers.get(cur.constructor))) {
              a2[k] = handler(cur, fn);
            } else if (ArrayBuffer.isView(cur)) {
              a2[k] = copyBuffer(cur);
            } else {
              a2[k] = fn(cur);
            }
          }
          return a2;
        }
        function clone(o) {
          if (typeof o !== "object" || o === null) return o;
          if (Array.isArray(o)) return cloneArray(o, clone);
          if (o.constructor !== Object && (handler = constructorHandlers.get(o.constructor))) {
            return handler(o, clone);
          }
          const o2 = {};
          for (const k in o) {
            if (Object.hasOwnProperty.call(o, k) === false) continue;
            const cur = o[k];
            if (typeof cur !== "object" || cur === null) {
              o2[k] = cur;
            } else if (cur.constructor !== Object && (handler = constructorHandlers.get(cur.constructor))) {
              o2[k] = handler(cur, clone);
            } else if (ArrayBuffer.isView(cur)) {
              o2[k] = copyBuffer(cur);
            } else {
              o2[k] = clone(cur);
            }
          }
          return o2;
        }
        function cloneProto(o) {
          if (typeof o !== "object" || o === null) return o;
          if (Array.isArray(o)) return cloneArray(o, cloneProto);
          if (o.constructor !== Object && (handler = constructorHandlers.get(o.constructor))) {
            return handler(o, cloneProto);
          }
          const o2 = {};
          for (const k in o) {
            const cur = o[k];
            if (typeof cur !== "object" || cur === null) {
              o2[k] = cur;
            } else if (cur.constructor !== Object && (handler = constructorHandlers.get(cur.constructor))) {
              o2[k] = handler(cur, cloneProto);
            } else if (ArrayBuffer.isView(cur)) {
              o2[k] = copyBuffer(cur);
            } else {
              o2[k] = cloneProto(cur);
            }
          }
          return o2;
        }
      }
      function rfdcCircles(opts) {
        const refs = [];
        const refsNew = [];
        const constructorHandlers = /* @__PURE__ */ new Map();
        constructorHandlers.set(Date, (o) => new Date(o));
        constructorHandlers.set(Map, (o, fn) => new Map(cloneArray(Array.from(o), fn)));
        constructorHandlers.set(Set, (o, fn) => new Set(cloneArray(Array.from(o), fn)));
        if (opts.constructorHandlers) {
          for (const handler2 of opts.constructorHandlers) {
            constructorHandlers.set(handler2[0], handler2[1]);
          }
        }
        let handler = null;
        return opts.proto ? cloneProto : clone;
        function cloneArray(a, fn) {
          const keys = Object.keys(a);
          const a2 = new Array(keys.length);
          for (let i = 0; i < keys.length; i++) {
            const k = keys[i];
            const cur = a[k];
            if (typeof cur !== "object" || cur === null) {
              a2[k] = cur;
            } else if (cur.constructor !== Object && (handler = constructorHandlers.get(cur.constructor))) {
              a2[k] = handler(cur, fn);
            } else if (ArrayBuffer.isView(cur)) {
              a2[k] = copyBuffer(cur);
            } else {
              const index = refs.indexOf(cur);
              if (index !== -1) {
                a2[k] = refsNew[index];
              } else {
                a2[k] = fn(cur);
              }
            }
          }
          return a2;
        }
        function clone(o) {
          if (typeof o !== "object" || o === null) return o;
          if (Array.isArray(o)) return cloneArray(o, clone);
          if (o.constructor !== Object && (handler = constructorHandlers.get(o.constructor))) {
            return handler(o, clone);
          }
          const o2 = {};
          refs.push(o);
          refsNew.push(o2);
          for (const k in o) {
            if (Object.hasOwnProperty.call(o, k) === false) continue;
            const cur = o[k];
            if (typeof cur !== "object" || cur === null) {
              o2[k] = cur;
            } else if (cur.constructor !== Object && (handler = constructorHandlers.get(cur.constructor))) {
              o2[k] = handler(cur, clone);
            } else if (ArrayBuffer.isView(cur)) {
              o2[k] = copyBuffer(cur);
            } else {
              const i = refs.indexOf(cur);
              if (i !== -1) {
                o2[k] = refsNew[i];
              } else {
                o2[k] = clone(cur);
              }
            }
          }
          refs.pop();
          refsNew.pop();
          return o2;
        }
        function cloneProto(o) {
          if (typeof o !== "object" || o === null) return o;
          if (Array.isArray(o)) return cloneArray(o, cloneProto);
          if (o.constructor !== Object && (handler = constructorHandlers.get(o.constructor))) {
            return handler(o, cloneProto);
          }
          const o2 = {};
          refs.push(o);
          refsNew.push(o2);
          for (const k in o) {
            const cur = o[k];
            if (typeof cur !== "object" || cur === null) {
              o2[k] = cur;
            } else if (cur.constructor !== Object && (handler = constructorHandlers.get(cur.constructor))) {
              o2[k] = handler(cur, cloneProto);
            } else if (ArrayBuffer.isView(cur)) {
              o2[k] = copyBuffer(cur);
            } else {
              const i = refs.indexOf(cur);
              if (i !== -1) {
                o2[k] = refsNew[i];
              } else {
                o2[k] = cloneProto(cur);
              }
            }
          }
          refs.pop();
          refsNew.pop();
          return o2;
        }
      }
    }
  });

  // node_modules/rfdc/default.js
  var require_default = __commonJS({
    "node_modules/rfdc/default.js"(exports8, module) {
      "use strict";
      init_dirname();
      init_buffer2();
      init_process2();
      module.exports = require_rfdc()();
    }
  });

  // build/lib/validations.js
  var require_validations = __commonJS({
    "build/lib/validations.js"(exports8) {
      "use strict";
      init_dirname();
      init_buffer2();
      init_process2();
      Object.defineProperty(exports8, "__esModule", { value: true });
      exports8.validateTopic = validateTopic;
      exports8.validateTopics = validateTopics;
      function validateTopic(topic) {
        const parts = topic.split("/");
        for (let i = 0; i < parts.length; i++) {
          if (parts[i] === "+") {
            continue;
          }
          if (parts[i] === "#") {
            return i === parts.length - 1;
          }
          if (parts[i].indexOf("+") !== -1 || parts[i].indexOf("#") !== -1) {
            return false;
          }
        }
        return true;
      }
      function validateTopics(topics) {
        if (topics.length === 0) {
          return "empty_topic_list";
        }
        for (let i = 0; i < topics.length; i++) {
          if (!validateTopic(topics[i])) {
            return topics[i];
          }
        }
        return null;
      }
    }
  });

  // build/lib/store.js
  var require_store = __commonJS({
    "build/lib/store.js"(exports8) {
      "use strict";
      init_dirname();
      init_buffer2();
      init_process2();
      Object.defineProperty(exports8, "__esModule", { value: true });
      var readable_stream_1 = require_browser3();
      var streamsOpts = { objectMode: true };
      var defaultStoreOptions = {
        clean: true
      };
      var Store = class {
        options;
        _inflights;
        constructor(options) {
          this.options = options || {};
          this.options = { ...defaultStoreOptions, ...options };
          this._inflights = /* @__PURE__ */ new Map();
        }
        put(packet, cb) {
          this._inflights.set(packet.messageId, packet);
          if (cb) {
            cb();
          }
          return this;
        }
        createStream() {
          const stream = new readable_stream_1.Readable(streamsOpts);
          const values = [];
          let destroyed = false;
          let i = 0;
          this._inflights.forEach((value, key) => {
            values.push(value);
          });
          stream._read = () => {
            if (!destroyed && i < values.length) {
              stream.push(values[i++]);
            } else {
              stream.push(null);
            }
          };
          stream.destroy = (err) => {
            if (destroyed) {
              return;
            }
            destroyed = true;
            setTimeout(() => {
              stream.emit("close");
            }, 0);
            return stream;
          };
          return stream;
        }
        del(packet, cb) {
          const toDelete = this._inflights.get(packet.messageId);
          if (toDelete) {
            this._inflights.delete(packet.messageId);
            cb(null, toDelete);
          } else if (cb) {
            cb(new Error("missing packet"));
          }
          return this;
        }
        get(packet, cb) {
          const storedPacket = this._inflights.get(packet.messageId);
          if (storedPacket) {
            cb(null, storedPacket);
          } else if (cb) {
            cb(new Error("missing packet"));
          }
          return this;
        }
        close(cb) {
          if (this.options.clean) {
            this._inflights = null;
          }
          if (cb) {
            cb();
          }
        }
      };
      exports8.default = Store;
    }
  });

  // build/lib/handlers/publish.js
  var require_publish = __commonJS({
    "build/lib/handlers/publish.js"(exports8) {
      "use strict";
      init_dirname();
      init_buffer2();
      init_process2();
      Object.defineProperty(exports8, "__esModule", { value: true });
      var validReasonCodes = [0, 16, 128, 131, 135, 144, 145, 151, 153];
      var handlePublish = (client, packet, done) => {
        client.log("handlePublish: packet %o", packet);
        done = typeof done !== "undefined" ? done : client.noop;
        let topic = packet.topic.toString();
        const message = packet.payload;
        const { qos } = packet;
        const { messageId } = packet;
        const { options } = client;
        if (client.options.protocolVersion === 5) {
          let alias;
          if (packet.properties) {
            alias = packet.properties.topicAlias;
          }
          if (typeof alias !== "undefined") {
            if (topic.length === 0) {
              if (alias > 0 && alias <= 65535) {
                const gotTopic = client["topicAliasRecv"].getTopicByAlias(alias);
                if (gotTopic) {
                  topic = gotTopic;
                  client.log("handlePublish :: topic complemented by alias. topic: %s - alias: %d", topic, alias);
                } else {
                  client.log("handlePublish :: unregistered topic alias. alias: %d", alias);
                  client.emit("error", new Error("Received unregistered Topic Alias"));
                  return;
                }
              } else {
                client.log("handlePublish :: topic alias out of range. alias: %d", alias);
                client.emit("error", new Error("Received Topic Alias is out of range"));
                return;
              }
            } else if (client["topicAliasRecv"].put(topic, alias)) {
              client.log("handlePublish :: registered topic: %s - alias: %d", topic, alias);
            } else {
              client.log("handlePublish :: topic alias out of range. alias: %d", alias);
              client.emit("error", new Error("Received Topic Alias is out of range"));
              return;
            }
          }
        }
        client.log("handlePublish: qos %d", qos);
        switch (qos) {
          case 2: {
            options.customHandleAcks(topic, message, packet, (error, code) => {
              if (typeof error === "number") {
                code = error;
                error = null;
              }
              if (error) {
                return client.emit("error", error);
              }
              if (validReasonCodes.indexOf(code) === -1) {
                return client.emit("error", new Error("Wrong reason code for pubrec"));
              }
              if (code) {
                client["_sendPacket"]({ cmd: "pubrec", messageId, reasonCode: code }, done);
              } else {
                client.incomingStore.put(packet, () => {
                  client["_sendPacket"]({ cmd: "pubrec", messageId }, done);
                });
              }
            });
            break;
          }
          case 1: {
            options.customHandleAcks(topic, message, packet, (error, code) => {
              if (typeof error === "number") {
                code = error;
                error = null;
              }
              if (error) {
                return client.emit("error", error);
              }
              if (validReasonCodes.indexOf(code) === -1) {
                return client.emit("error", new Error("Wrong reason code for puback"));
              }
              if (!code) {
                client.emit("message", topic, message, packet);
              }
              client.handleMessage(packet, (err) => {
                if (err) {
                  return done && done(err);
                }
                client["_sendPacket"]({ cmd: "puback", messageId, reasonCode: code }, done);
              });
            });
            break;
          }
          case 0:
            client.emit("message", topic, message, packet);
            client.handleMessage(packet, done);
            break;
          default:
            client.log("handlePublish: unknown QoS. Doing nothing.");
            break;
        }
      };
      exports8.default = handlePublish;
    }
  });

  // package-json:../../package.json
  var require_package = __commonJS({
    "package-json:../../package.json"(exports8, module) {
      module.exports = { version: "5.14.1" };
    }
  });

  // build/lib/shared.js
  var require_shared = __commonJS({
    "build/lib/shared.js"(exports8) {
      "use strict";
      init_dirname();
      init_buffer2();
      init_process2();
      Object.defineProperty(exports8, "__esModule", { value: true });
      exports8.MQTTJS_VERSION = exports8.nextTick = exports8.ErrorWithSubackPacket = exports8.ErrorWithReasonCode = void 0;
      exports8.applyMixin = applyMixin;
      var ErrorWithReasonCode = class _ErrorWithReasonCode extends Error {
        code;
        constructor(message, code) {
          super(message);
          this.code = code;
          Object.setPrototypeOf(this, _ErrorWithReasonCode.prototype);
          Object.getPrototypeOf(this).name = "ErrorWithReasonCode";
        }
      };
      exports8.ErrorWithReasonCode = ErrorWithReasonCode;
      var ErrorWithSubackPacket = class _ErrorWithSubackPacket extends Error {
        packet;
        constructor(message, packet) {
          super(message);
          this.packet = packet;
          Object.setPrototypeOf(this, _ErrorWithSubackPacket.prototype);
          Object.getPrototypeOf(this).name = "ErrorWithSubackPacket";
        }
      };
      exports8.ErrorWithSubackPacket = ErrorWithSubackPacket;
      function applyMixin(target, mixin, includeConstructor = false) {
        const inheritanceChain = [mixin];
        while (true) {
          const current = inheritanceChain[0];
          const base = Object.getPrototypeOf(current);
          if (base?.prototype) {
            inheritanceChain.unshift(base);
          } else {
            break;
          }
        }
        for (const ctor of inheritanceChain) {
          for (const prop of Object.getOwnPropertyNames(ctor.prototype)) {
            if (includeConstructor || prop !== "constructor") {
              Object.defineProperty(target.prototype, prop, Object.getOwnPropertyDescriptor(ctor.prototype, prop) ?? /* @__PURE__ */ Object.create(null));
            }
          }
        }
      }
      exports8.nextTick = typeof process_exports?.nextTick === "function" ? process_exports.nextTick : (callback) => {
        setTimeout(callback, 0);
      };
      exports8.MQTTJS_VERSION = require_package().version;
    }
  });

  // build/lib/handlers/ack.js
  var require_ack = __commonJS({
    "build/lib/handlers/ack.js"(exports8) {
      "use strict";
      init_dirname();
      init_buffer2();
      init_process2();
      Object.defineProperty(exports8, "__esModule", { value: true });
      exports8.ReasonCodes = void 0;
      var shared_1 = require_shared();
      exports8.ReasonCodes = {
        0: "",
        1: "Unacceptable protocol version",
        2: "Identifier rejected",
        3: "Server unavailable",
        4: "Bad username or password",
        5: "Not authorized",
        16: "No matching subscribers",
        17: "No subscription existed",
        128: "Unspecified error",
        129: "Malformed Packet",
        130: "Protocol Error",
        131: "Implementation specific error",
        132: "Unsupported Protocol Version",
        133: "Client Identifier not valid",
        134: "Bad User Name or Password",
        135: "Not authorized",
        136: "Server unavailable",
        137: "Server busy",
        138: "Banned",
        139: "Server shutting down",
        140: "Bad authentication method",
        141: "Keep Alive timeout",
        142: "Session taken over",
        143: "Topic Filter invalid",
        144: "Topic Name invalid",
        145: "Packet identifier in use",
        146: "Packet Identifier not found",
        147: "Receive Maximum exceeded",
        148: "Topic Alias invalid",
        149: "Packet too large",
        150: "Message rate too high",
        151: "Quota exceeded",
        152: "Administrative action",
        153: "Payload format invalid",
        154: "Retain not supported",
        155: "QoS not supported",
        156: "Use another server",
        157: "Server moved",
        158: "Shared Subscriptions not supported",
        159: "Connection rate exceeded",
        160: "Maximum connect time",
        161: "Subscription Identifiers not supported",
        162: "Wildcard Subscriptions not supported"
      };
      var handleAck = (client, packet) => {
        const { messageId } = packet;
        const type = packet.cmd;
        let response = null;
        const cb = client.outgoing[messageId] ? client.outgoing[messageId].cb : null;
        let err = null;
        if (!cb) {
          client.log("_handleAck :: Server sent an ack in error. Ignoring.");
          return;
        }
        client.log("_handleAck :: packet type", type);
        switch (type) {
          case "pubcomp":
          case "puback": {
            const pubackRC = packet.reasonCode;
            if (pubackRC && pubackRC > 0 && pubackRC !== 16) {
              err = new shared_1.ErrorWithReasonCode(`Publish error: ${exports8.ReasonCodes[pubackRC]}`, pubackRC);
              client["_removeOutgoingAndStoreMessage"](messageId, () => {
                cb(err, packet);
              });
            } else {
              client["_removeOutgoingAndStoreMessage"](messageId, cb);
            }
            break;
          }
          case "pubrec": {
            response = {
              cmd: "pubrel",
              qos: 2,
              messageId
            };
            const pubrecRC = packet.reasonCode;
            if (pubrecRC && pubrecRC > 0 && pubrecRC !== 16) {
              err = new shared_1.ErrorWithReasonCode(`Publish error: ${exports8.ReasonCodes[pubrecRC]}`, pubrecRC);
              client["_removeOutgoingAndStoreMessage"](messageId, () => {
                cb(err, packet);
              });
            } else {
              client["_sendPacket"](response);
            }
            break;
          }
          case "suback": {
            delete client.outgoing[messageId];
            client.messageIdProvider.deallocate(messageId);
            const granted = packet.granted;
            for (let grantedI = 0; grantedI < granted.length; grantedI++) {
              const subackRC = granted[grantedI];
              if ((subackRC & 128) !== 0) {
                err = new Error(`Subscribe error: ${exports8.ReasonCodes[subackRC]}`);
                err.code = subackRC;
                const topics = client.messageIdToTopic[messageId];
                if (topics) {
                  topics.forEach((topic) => {
                    delete client["_resubscribeTopics"][topic];
                  });
                }
              }
            }
            delete client.messageIdToTopic[messageId];
            client["_invokeStoreProcessingQueue"]();
            cb(err, packet);
            break;
          }
          case "unsuback": {
            delete client.outgoing[messageId];
            client.messageIdProvider.deallocate(messageId);
            client["_invokeStoreProcessingQueue"]();
            cb(null, packet);
            break;
          }
          default:
            client.emit("error", new Error("unrecognized packet type"));
        }
        if (client.disconnecting && Object.keys(client.outgoing).length === 0) {
          client.emit("outgoingEmpty");
        }
      };
      exports8.default = handleAck;
    }
  });

  // build/lib/handlers/auth.js
  var require_auth = __commonJS({
    "build/lib/handlers/auth.js"(exports8) {
      "use strict";
      init_dirname();
      init_buffer2();
      init_process2();
      Object.defineProperty(exports8, "__esModule", { value: true });
      var shared_1 = require_shared();
      var ack_1 = require_ack();
      var handleAuth = (client, packet) => {
        const { options } = client;
        const version4 = options.protocolVersion;
        const rc = version4 === 5 ? packet.reasonCode : packet.returnCode;
        if (version4 !== 5) {
          const err = new shared_1.ErrorWithReasonCode(`Protocol error: Auth packets are only supported in MQTT 5. Your version:${version4}`, rc);
          client.emit("error", err);
          return;
        }
        client.handleAuth(packet, (err, packet2) => {
          if (err) {
            client.emit("error", err);
            return;
          }
          if (rc === 24) {
            client.reconnecting = false;
            client["_sendPacket"](packet2);
          } else {
            const error = new shared_1.ErrorWithReasonCode(`Connection refused: ${ack_1.ReasonCodes[rc]}`, rc);
            client.emit("error", error);
          }
        });
      };
      exports8.default = handleAuth;
    }
  });

  // node_modules/lru-cache/dist/commonjs/index.js
  var require_commonjs = __commonJS({
    "node_modules/lru-cache/dist/commonjs/index.js"(exports8) {
      "use strict";
      init_dirname();
      init_buffer2();
      init_process2();
      Object.defineProperty(exports8, "__esModule", { value: true });
      exports8.LRUCache = void 0;
      var perf = typeof performance === "object" && performance && typeof performance.now === "function" ? performance : Date;
      var warned = /* @__PURE__ */ new Set();
      var PROCESS = typeof process_exports === "object" && !!process_exports ? process_exports : {};
      var emitWarning3 = (msg, type, code, fn) => {
        typeof PROCESS.emitWarning === "function" ? PROCESS.emitWarning(msg, type, code, fn) : console.error(`[${code}] ${type}: ${msg}`);
      };
      var AC = globalThis.AbortController;
      var AS = globalThis.AbortSignal;
      if (typeof AC === "undefined") {
        AS = class AbortSignal {
          onabort;
          _onabort = [];
          reason;
          aborted = false;
          addEventListener(_, fn) {
            this._onabort.push(fn);
          }
        };
        AC = class AbortController {
          constructor() {
            warnACPolyfill();
          }
          signal = new AS();
          abort(reason) {
            if (this.signal.aborted)
              return;
            this.signal.reason = reason;
            this.signal.aborted = true;
            for (const fn of this.signal._onabort) {
              fn(reason);
            }
            this.signal.onabort?.(reason);
          }
        };
        let printACPolyfillWarning = PROCESS.env?.LRU_CACHE_IGNORE_AC_WARNING !== "1";
        const warnACPolyfill = () => {
          if (!printACPolyfillWarning)
            return;
          printACPolyfillWarning = false;
          emitWarning3("AbortController is not defined. If using lru-cache in node 14, load an AbortController polyfill from the `node-abort-controller` package. A minimal polyfill is provided for use by LRUCache.fetch(), but it should not be relied upon in other contexts (eg, passing it to other APIs that use AbortController/AbortSignal might have undesirable effects). You may disable this with LRU_CACHE_IGNORE_AC_WARNING=1 in the env.", "NO_ABORT_CONTROLLER", "ENOTSUP", warnACPolyfill);
        };
      }
      var shouldWarn = (code) => !warned.has(code);
      var TYPE = Symbol("type");
      var isPosInt = (n) => n && n === Math.floor(n) && n > 0 && isFinite(n);
      var getUintArray = (max) => !isPosInt(max) ? null : max <= Math.pow(2, 8) ? Uint8Array : max <= Math.pow(2, 16) ? Uint16Array : max <= Math.pow(2, 32) ? Uint32Array : max <= Number.MAX_SAFE_INTEGER ? ZeroArray : null;
      var ZeroArray = class extends Array {
        constructor(size) {
          super(size);
          this.fill(0);
        }
      };
      var Stack = class _Stack {
        heap;
        length;
        // private constructor
        static #constructing = false;
        static create(max) {
          const HeapCls = getUintArray(max);
          if (!HeapCls)
            return [];
          _Stack.#constructing = true;
          const s = new _Stack(max, HeapCls);
          _Stack.#constructing = false;
          return s;
        }
        constructor(max, HeapCls) {
          if (!_Stack.#constructing) {
            throw new TypeError("instantiate Stack using Stack.create(n)");
          }
          this.heap = new HeapCls(max);
          this.length = 0;
        }
        push(n) {
          this.heap[this.length++] = n;
        }
        pop() {
          return this.heap[--this.length];
        }
      };
      var LRUCache = class _LRUCache {
        // options that cannot be changed without disaster
        #max;
        #maxSize;
        #dispose;
        #disposeAfter;
        #fetchMethod;
        #memoMethod;
        /**
         * {@link LRUCache.OptionsBase.ttl}
         */
        ttl;
        /**
         * {@link LRUCache.OptionsBase.ttlResolution}
         */
        ttlResolution;
        /**
         * {@link LRUCache.OptionsBase.ttlAutopurge}
         */
        ttlAutopurge;
        /**
         * {@link LRUCache.OptionsBase.updateAgeOnGet}
         */
        updateAgeOnGet;
        /**
         * {@link LRUCache.OptionsBase.updateAgeOnHas}
         */
        updateAgeOnHas;
        /**
         * {@link LRUCache.OptionsBase.allowStale}
         */
        allowStale;
        /**
         * {@link LRUCache.OptionsBase.noDisposeOnSet}
         */
        noDisposeOnSet;
        /**
         * {@link LRUCache.OptionsBase.noUpdateTTL}
         */
        noUpdateTTL;
        /**
         * {@link LRUCache.OptionsBase.maxEntrySize}
         */
        maxEntrySize;
        /**
         * {@link LRUCache.OptionsBase.sizeCalculation}
         */
        sizeCalculation;
        /**
         * {@link LRUCache.OptionsBase.noDeleteOnFetchRejection}
         */
        noDeleteOnFetchRejection;
        /**
         * {@link LRUCache.OptionsBase.noDeleteOnStaleGet}
         */
        noDeleteOnStaleGet;
        /**
         * {@link LRUCache.OptionsBase.allowStaleOnFetchAbort}
         */
        allowStaleOnFetchAbort;
        /**
         * {@link LRUCache.OptionsBase.allowStaleOnFetchRejection}
         */
        allowStaleOnFetchRejection;
        /**
         * {@link LRUCache.OptionsBase.ignoreFetchAbort}
         */
        ignoreFetchAbort;
        // computed properties
        #size;
        #calculatedSize;
        #keyMap;
        #keyList;
        #valList;
        #next;
        #prev;
        #head;
        #tail;
        #free;
        #disposed;
        #sizes;
        #starts;
        #ttls;
        #hasDispose;
        #hasFetchMethod;
        #hasDisposeAfter;
        /**
         * Do not call this method unless you need to inspect the
         * inner workings of the cache.  If anything returned by this
         * object is modified in any way, strange breakage may occur.
         *
         * These fields are private for a reason!
         *
         * @internal
         */
        static unsafeExposeInternals(c) {
          return {
            // properties
            starts: c.#starts,
            ttls: c.#ttls,
            sizes: c.#sizes,
            keyMap: c.#keyMap,
            keyList: c.#keyList,
            valList: c.#valList,
            next: c.#next,
            prev: c.#prev,
            get head() {
              return c.#head;
            },
            get tail() {
              return c.#tail;
            },
            free: c.#free,
            // methods
            isBackgroundFetch: (p) => c.#isBackgroundFetch(p),
            backgroundFetch: (k, index, options, context) => c.#backgroundFetch(k, index, options, context),
            moveToTail: (index) => c.#moveToTail(index),
            indexes: (options) => c.#indexes(options),
            rindexes: (options) => c.#rindexes(options),
            isStale: (index) => c.#isStale(index)
          };
        }
        // Protected read-only members
        /**
         * {@link LRUCache.OptionsBase.max} (read-only)
         */
        get max() {
          return this.#max;
        }
        /**
         * {@link LRUCache.OptionsBase.maxSize} (read-only)
         */
        get maxSize() {
          return this.#maxSize;
        }
        /**
         * The total computed size of items in the cache (read-only)
         */
        get calculatedSize() {
          return this.#calculatedSize;
        }
        /**
         * The number of items stored in the cache (read-only)
         */
        get size() {
          return this.#size;
        }
        /**
         * {@link LRUCache.OptionsBase.fetchMethod} (read-only)
         */
        get fetchMethod() {
          return this.#fetchMethod;
        }
        get memoMethod() {
          return this.#memoMethod;
        }
        /**
         * {@link LRUCache.OptionsBase.dispose} (read-only)
         */
        get dispose() {
          return this.#dispose;
        }
        /**
         * {@link LRUCache.OptionsBase.disposeAfter} (read-only)
         */
        get disposeAfter() {
          return this.#disposeAfter;
        }
        constructor(options) {
          const { max = 0, ttl, ttlResolution = 1, ttlAutopurge, updateAgeOnGet, updateAgeOnHas, allowStale, dispose, disposeAfter, noDisposeOnSet, noUpdateTTL, maxSize = 0, maxEntrySize = 0, sizeCalculation, fetchMethod, memoMethod, noDeleteOnFetchRejection, noDeleteOnStaleGet, allowStaleOnFetchRejection, allowStaleOnFetchAbort, ignoreFetchAbort } = options;
          if (max !== 0 && !isPosInt(max)) {
            throw new TypeError("max option must be a nonnegative integer");
          }
          const UintArray = max ? getUintArray(max) : Array;
          if (!UintArray) {
            throw new Error("invalid max value: " + max);
          }
          this.#max = max;
          this.#maxSize = maxSize;
          this.maxEntrySize = maxEntrySize || this.#maxSize;
          this.sizeCalculation = sizeCalculation;
          if (this.sizeCalculation) {
            if (!this.#maxSize && !this.maxEntrySize) {
              throw new TypeError("cannot set sizeCalculation without setting maxSize or maxEntrySize");
            }
            if (typeof this.sizeCalculation !== "function") {
              throw new TypeError("sizeCalculation set to non-function");
            }
          }
          if (memoMethod !== void 0 && typeof memoMethod !== "function") {
            throw new TypeError("memoMethod must be a function if defined");
          }
          this.#memoMethod = memoMethod;
          if (fetchMethod !== void 0 && typeof fetchMethod !== "function") {
            throw new TypeError("fetchMethod must be a function if specified");
          }
          this.#fetchMethod = fetchMethod;
          this.#hasFetchMethod = !!fetchMethod;
          this.#keyMap = /* @__PURE__ */ new Map();
          this.#keyList = new Array(max).fill(void 0);
          this.#valList = new Array(max).fill(void 0);
          this.#next = new UintArray(max);
          this.#prev = new UintArray(max);
          this.#head = 0;
          this.#tail = 0;
          this.#free = Stack.create(max);
          this.#size = 0;
          this.#calculatedSize = 0;
          if (typeof dispose === "function") {
            this.#dispose = dispose;
          }
          if (typeof disposeAfter === "function") {
            this.#disposeAfter = disposeAfter;
            this.#disposed = [];
          } else {
            this.#disposeAfter = void 0;
            this.#disposed = void 0;
          }
          this.#hasDispose = !!this.#dispose;
          this.#hasDisposeAfter = !!this.#disposeAfter;
          this.noDisposeOnSet = !!noDisposeOnSet;
          this.noUpdateTTL = !!noUpdateTTL;
          this.noDeleteOnFetchRejection = !!noDeleteOnFetchRejection;
          this.allowStaleOnFetchRejection = !!allowStaleOnFetchRejection;
          this.allowStaleOnFetchAbort = !!allowStaleOnFetchAbort;
          this.ignoreFetchAbort = !!ignoreFetchAbort;
          if (this.maxEntrySize !== 0) {
            if (this.#maxSize !== 0) {
              if (!isPosInt(this.#maxSize)) {
                throw new TypeError("maxSize must be a positive integer if specified");
              }
            }
            if (!isPosInt(this.maxEntrySize)) {
              throw new TypeError("maxEntrySize must be a positive integer if specified");
            }
            this.#initializeSizeTracking();
          }
          this.allowStale = !!allowStale;
          this.noDeleteOnStaleGet = !!noDeleteOnStaleGet;
          this.updateAgeOnGet = !!updateAgeOnGet;
          this.updateAgeOnHas = !!updateAgeOnHas;
          this.ttlResolution = isPosInt(ttlResolution) || ttlResolution === 0 ? ttlResolution : 1;
          this.ttlAutopurge = !!ttlAutopurge;
          this.ttl = ttl || 0;
          if (this.ttl) {
            if (!isPosInt(this.ttl)) {
              throw new TypeError("ttl must be a positive integer if specified");
            }
            this.#initializeTTLTracking();
          }
          if (this.#max === 0 && this.ttl === 0 && this.#maxSize === 0) {
            throw new TypeError("At least one of max, maxSize, or ttl is required");
          }
          if (!this.ttlAutopurge && !this.#max && !this.#maxSize) {
            const code = "LRU_CACHE_UNBOUNDED";
            if (shouldWarn(code)) {
              warned.add(code);
              const msg = "TTL caching without ttlAutopurge, max, or maxSize can result in unbounded memory consumption.";
              emitWarning3(msg, "UnboundedCacheWarning", code, _LRUCache);
            }
          }
        }
        /**
         * Return the number of ms left in the item's TTL. If item is not in cache,
         * returns `0`. Returns `Infinity` if item is in cache without a defined TTL.
         */
        getRemainingTTL(key) {
          return this.#keyMap.has(key) ? Infinity : 0;
        }
        #initializeTTLTracking() {
          const ttls = new ZeroArray(this.#max);
          const starts = new ZeroArray(this.#max);
          this.#ttls = ttls;
          this.#starts = starts;
          this.#setItemTTL = (index, ttl, start = perf.now()) => {
            starts[index] = ttl !== 0 ? start : 0;
            ttls[index] = ttl;
            if (ttl !== 0 && this.ttlAutopurge) {
              const t = setTimeout(() => {
                if (this.#isStale(index)) {
                  this.#delete(this.#keyList[index], "expire");
                }
              }, ttl + 1);
              if (t.unref) {
                t.unref();
              }
            }
          };
          this.#updateItemAge = (index) => {
            starts[index] = ttls[index] !== 0 ? perf.now() : 0;
          };
          this.#statusTTL = (status, index) => {
            if (ttls[index]) {
              const ttl = ttls[index];
              const start = starts[index];
              if (!ttl || !start)
                return;
              status.ttl = ttl;
              status.start = start;
              status.now = cachedNow || getNow();
              const age = status.now - start;
              status.remainingTTL = ttl - age;
            }
          };
          let cachedNow = 0;
          const getNow = () => {
            const n = perf.now();
            if (this.ttlResolution > 0) {
              cachedNow = n;
              const t = setTimeout(() => cachedNow = 0, this.ttlResolution);
              if (t.unref) {
                t.unref();
              }
            }
            return n;
          };
          this.getRemainingTTL = (key) => {
            const index = this.#keyMap.get(key);
            if (index === void 0) {
              return 0;
            }
            const ttl = ttls[index];
            const start = starts[index];
            if (!ttl || !start) {
              return Infinity;
            }
            const age = (cachedNow || getNow()) - start;
            return ttl - age;
          };
          this.#isStale = (index) => {
            const s = starts[index];
            const t = ttls[index];
            return !!t && !!s && (cachedNow || getNow()) - s > t;
          };
        }
        // conditionally set private methods related to TTL
        #updateItemAge = () => {
        };
        #statusTTL = () => {
        };
        #setItemTTL = () => {
        };
        /* c8 ignore stop */
        #isStale = () => false;
        #initializeSizeTracking() {
          const sizes = new ZeroArray(this.#max);
          this.#calculatedSize = 0;
          this.#sizes = sizes;
          this.#removeItemSize = (index) => {
            this.#calculatedSize -= sizes[index];
            sizes[index] = 0;
          };
          this.#requireSize = (k, v, size, sizeCalculation) => {
            if (this.#isBackgroundFetch(v)) {
              return 0;
            }
            if (!isPosInt(size)) {
              if (sizeCalculation) {
                if (typeof sizeCalculation !== "function") {
                  throw new TypeError("sizeCalculation must be a function");
                }
                size = sizeCalculation(v, k);
                if (!isPosInt(size)) {
                  throw new TypeError("sizeCalculation return invalid (expect positive integer)");
                }
              } else {
                throw new TypeError("invalid size value (must be positive integer). When maxSize or maxEntrySize is used, sizeCalculation or size must be set.");
              }
            }
            return size;
          };
          this.#addItemSize = (index, size, status) => {
            sizes[index] = size;
            if (this.#maxSize) {
              const maxSize = this.#maxSize - sizes[index];
              while (this.#calculatedSize > maxSize) {
                this.#evict(true);
              }
            }
            this.#calculatedSize += sizes[index];
            if (status) {
              status.entrySize = size;
              status.totalCalculatedSize = this.#calculatedSize;
            }
          };
        }
        #removeItemSize = (_i) => {
        };
        #addItemSize = (_i, _s, _st) => {
        };
        #requireSize = (_k, _v, size, sizeCalculation) => {
          if (size || sizeCalculation) {
            throw new TypeError("cannot set size without setting maxSize or maxEntrySize on cache");
          }
          return 0;
        };
        *#indexes({ allowStale = this.allowStale } = {}) {
          if (this.#size) {
            for (let i = this.#tail; true; ) {
              if (!this.#isValidIndex(i)) {
                break;
              }
              if (allowStale || !this.#isStale(i)) {
                yield i;
              }
              if (i === this.#head) {
                break;
              } else {
                i = this.#prev[i];
              }
            }
          }
        }
        *#rindexes({ allowStale = this.allowStale } = {}) {
          if (this.#size) {
            for (let i = this.#head; true; ) {
              if (!this.#isValidIndex(i)) {
                break;
              }
              if (allowStale || !this.#isStale(i)) {
                yield i;
              }
              if (i === this.#tail) {
                break;
              } else {
                i = this.#next[i];
              }
            }
          }
        }
        #isValidIndex(index) {
          return index !== void 0 && this.#keyMap.get(this.#keyList[index]) === index;
        }
        /**
         * Return a generator yielding `[key, value]` pairs,
         * in order from most recently used to least recently used.
         */
        *entries() {
          for (const i of this.#indexes()) {
            if (this.#valList[i] !== void 0 && this.#keyList[i] !== void 0 && !this.#isBackgroundFetch(this.#valList[i])) {
              yield [this.#keyList[i], this.#valList[i]];
            }
          }
        }
        /**
         * Inverse order version of {@link LRUCache.entries}
         *
         * Return a generator yielding `[key, value]` pairs,
         * in order from least recently used to most recently used.
         */
        *rentries() {
          for (const i of this.#rindexes()) {
            if (this.#valList[i] !== void 0 && this.#keyList[i] !== void 0 && !this.#isBackgroundFetch(this.#valList[i])) {
              yield [this.#keyList[i], this.#valList[i]];
            }
          }
        }
        /**
         * Return a generator yielding the keys in the cache,
         * in order from most recently used to least recently used.
         */
        *keys() {
          for (const i of this.#indexes()) {
            const k = this.#keyList[i];
            if (k !== void 0 && !this.#isBackgroundFetch(this.#valList[i])) {
              yield k;
            }
          }
        }
        /**
         * Inverse order version of {@link LRUCache.keys}
         *
         * Return a generator yielding the keys in the cache,
         * in order from least recently used to most recently used.
         */
        *rkeys() {
          for (const i of this.#rindexes()) {
            const k = this.#keyList[i];
            if (k !== void 0 && !this.#isBackgroundFetch(this.#valList[i])) {
              yield k;
            }
          }
        }
        /**
         * Return a generator yielding the values in the cache,
         * in order from most recently used to least recently used.
         */
        *values() {
          for (const i of this.#indexes()) {
            const v = this.#valList[i];
            if (v !== void 0 && !this.#isBackgroundFetch(this.#valList[i])) {
              yield this.#valList[i];
            }
          }
        }
        /**
         * Inverse order version of {@link LRUCache.values}
         *
         * Return a generator yielding the values in the cache,
         * in order from least recently used to most recently used.
         */
        *rvalues() {
          for (const i of this.#rindexes()) {
            const v = this.#valList[i];
            if (v !== void 0 && !this.#isBackgroundFetch(this.#valList[i])) {
              yield this.#valList[i];
            }
          }
        }
        /**
         * Iterating over the cache itself yields the same results as
         * {@link LRUCache.entries}
         */
        [Symbol.iterator]() {
          return this.entries();
        }
        /**
         * A String value that is used in the creation of the default string
         * description of an object. Called by the built-in method
         * `Object.prototype.toString`.
         */
        [Symbol.toStringTag] = "LRUCache";
        /**
         * Find a value for which the supplied fn method returns a truthy value,
         * similar to `Array.find()`. fn is called as `fn(value, key, cache)`.
         */
        find(fn, getOptions = {}) {
          for (const i of this.#indexes()) {
            const v = this.#valList[i];
            const value = this.#isBackgroundFetch(v) ? v.__staleWhileFetching : v;
            if (value === void 0)
              continue;
            if (fn(value, this.#keyList[i], this)) {
              return this.get(this.#keyList[i], getOptions);
            }
          }
        }
        /**
         * Call the supplied function on each item in the cache, in order from most
         * recently used to least recently used.
         *
         * `fn` is called as `fn(value, key, cache)`.
         *
         * If `thisp` is provided, function will be called in the `this`-context of
         * the provided object, or the cache if no `thisp` object is provided.
         *
         * Does not update age or recenty of use, or iterate over stale values.
         */
        forEach(fn, thisp = this) {
          for (const i of this.#indexes()) {
            const v = this.#valList[i];
            const value = this.#isBackgroundFetch(v) ? v.__staleWhileFetching : v;
            if (value === void 0)
              continue;
            fn.call(thisp, value, this.#keyList[i], this);
          }
        }
        /**
         * The same as {@link LRUCache.forEach} but items are iterated over in
         * reverse order.  (ie, less recently used items are iterated over first.)
         */
        rforEach(fn, thisp = this) {
          for (const i of this.#rindexes()) {
            const v = this.#valList[i];
            const value = this.#isBackgroundFetch(v) ? v.__staleWhileFetching : v;
            if (value === void 0)
              continue;
            fn.call(thisp, value, this.#keyList[i], this);
          }
        }
        /**
         * Delete any stale entries. Returns true if anything was removed,
         * false otherwise.
         */
        purgeStale() {
          let deleted = false;
          for (const i of this.#rindexes({ allowStale: true })) {
            if (this.#isStale(i)) {
              this.#delete(this.#keyList[i], "expire");
              deleted = true;
            }
          }
          return deleted;
        }
        /**
         * Get the extended info about a given entry, to get its value, size, and
         * TTL info simultaneously. Returns `undefined` if the key is not present.
         *
         * Unlike {@link LRUCache#dump}, which is designed to be portable and survive
         * serialization, the `start` value is always the current timestamp, and the
         * `ttl` is a calculated remaining time to live (negative if expired).
         *
         * Always returns stale values, if their info is found in the cache, so be
         * sure to check for expirations (ie, a negative {@link LRUCache.Entry#ttl})
         * if relevant.
         */
        info(key) {
          const i = this.#keyMap.get(key);
          if (i === void 0)
            return void 0;
          const v = this.#valList[i];
          const value = this.#isBackgroundFetch(v) ? v.__staleWhileFetching : v;
          if (value === void 0)
            return void 0;
          const entry = { value };
          if (this.#ttls && this.#starts) {
            const ttl = this.#ttls[i];
            const start = this.#starts[i];
            if (ttl && start) {
              const remain = ttl - (perf.now() - start);
              entry.ttl = remain;
              entry.start = Date.now();
            }
          }
          if (this.#sizes) {
            entry.size = this.#sizes[i];
          }
          return entry;
        }
        /**
         * Return an array of [key, {@link LRUCache.Entry}] tuples which can be
         * passed to {@link LRLUCache#load}.
         *
         * The `start` fields are calculated relative to a portable `Date.now()`
         * timestamp, even if `performance.now()` is available.
         *
         * Stale entries are always included in the `dump`, even if
         * {@link LRUCache.OptionsBase.allowStale} is false.
         *
         * Note: this returns an actual array, not a generator, so it can be more
         * easily passed around.
         */
        dump() {
          const arr = [];
          for (const i of this.#indexes({ allowStale: true })) {
            const key = this.#keyList[i];
            const v = this.#valList[i];
            const value = this.#isBackgroundFetch(v) ? v.__staleWhileFetching : v;
            if (value === void 0 || key === void 0)
              continue;
            const entry = { value };
            if (this.#ttls && this.#starts) {
              entry.ttl = this.#ttls[i];
              const age = perf.now() - this.#starts[i];
              entry.start = Math.floor(Date.now() - age);
            }
            if (this.#sizes) {
              entry.size = this.#sizes[i];
            }
            arr.unshift([key, entry]);
          }
          return arr;
        }
        /**
         * Reset the cache and load in the items in entries in the order listed.
         *
         * The shape of the resulting cache may be different if the same options are
         * not used in both caches.
         *
         * The `start` fields are assumed to be calculated relative to a portable
         * `Date.now()` timestamp, even if `performance.now()` is available.
         */
        load(arr) {
          this.clear();
          for (const [key, entry] of arr) {
            if (entry.start) {
              const age = Date.now() - entry.start;
              entry.start = perf.now() - age;
            }
            this.set(key, entry.value, entry);
          }
        }
        /**
         * Add a value to the cache.
         *
         * Note: if `undefined` is specified as a value, this is an alias for
         * {@link LRUCache#delete}
         *
         * Fields on the {@link LRUCache.SetOptions} options param will override
         * their corresponding values in the constructor options for the scope
         * of this single `set()` operation.
         *
         * If `start` is provided, then that will set the effective start
         * time for the TTL calculation. Note that this must be a previous
         * value of `performance.now()` if supported, or a previous value of
         * `Date.now()` if not.
         *
         * Options object may also include `size`, which will prevent
         * calling the `sizeCalculation` function and just use the specified
         * number if it is a positive integer, and `noDisposeOnSet` which
         * will prevent calling a `dispose` function in the case of
         * overwrites.
         *
         * If the `size` (or return value of `sizeCalculation`) for a given
         * entry is greater than `maxEntrySize`, then the item will not be
         * added to the cache.
         *
         * Will update the recency of the entry.
         *
         * If the value is `undefined`, then this is an alias for
         * `cache.delete(key)`. `undefined` is never stored in the cache.
         */
        set(k, v, setOptions = {}) {
          if (v === void 0) {
            this.delete(k);
            return this;
          }
          const { ttl = this.ttl, start, noDisposeOnSet = this.noDisposeOnSet, sizeCalculation = this.sizeCalculation, status } = setOptions;
          let { noUpdateTTL = this.noUpdateTTL } = setOptions;
          const size = this.#requireSize(k, v, setOptions.size || 0, sizeCalculation);
          if (this.maxEntrySize && size > this.maxEntrySize) {
            if (status) {
              status.set = "miss";
              status.maxEntrySizeExceeded = true;
            }
            this.#delete(k, "set");
            return this;
          }
          let index = this.#size === 0 ? void 0 : this.#keyMap.get(k);
          if (index === void 0) {
            index = this.#size === 0 ? this.#tail : this.#free.length !== 0 ? this.#free.pop() : this.#size === this.#max ? this.#evict(false) : this.#size;
            this.#keyList[index] = k;
            this.#valList[index] = v;
            this.#keyMap.set(k, index);
            this.#next[this.#tail] = index;
            this.#prev[index] = this.#tail;
            this.#tail = index;
            this.#size++;
            this.#addItemSize(index, size, status);
            if (status)
              status.set = "add";
            noUpdateTTL = false;
          } else {
            this.#moveToTail(index);
            const oldVal = this.#valList[index];
            if (v !== oldVal) {
              if (this.#hasFetchMethod && this.#isBackgroundFetch(oldVal)) {
                oldVal.__abortController.abort(new Error("replaced"));
                const { __staleWhileFetching: s } = oldVal;
                if (s !== void 0 && !noDisposeOnSet) {
                  if (this.#hasDispose) {
                    this.#dispose?.(s, k, "set");
                  }
                  if (this.#hasDisposeAfter) {
                    this.#disposed?.push([s, k, "set"]);
                  }
                }
              } else if (!noDisposeOnSet) {
                if (this.#hasDispose) {
                  this.#dispose?.(oldVal, k, "set");
                }
                if (this.#hasDisposeAfter) {
                  this.#disposed?.push([oldVal, k, "set"]);
                }
              }
              this.#removeItemSize(index);
              this.#addItemSize(index, size, status);
              this.#valList[index] = v;
              if (status) {
                status.set = "replace";
                const oldValue = oldVal && this.#isBackgroundFetch(oldVal) ? oldVal.__staleWhileFetching : oldVal;
                if (oldValue !== void 0)
                  status.oldValue = oldValue;
              }
            } else if (status) {
              status.set = "update";
            }
          }
          if (ttl !== 0 && !this.#ttls) {
            this.#initializeTTLTracking();
          }
          if (this.#ttls) {
            if (!noUpdateTTL) {
              this.#setItemTTL(index, ttl, start);
            }
            if (status)
              this.#statusTTL(status, index);
          }
          if (!noDisposeOnSet && this.#hasDisposeAfter && this.#disposed) {
            const dt = this.#disposed;
            let task;
            while (task = dt?.shift()) {
              this.#disposeAfter?.(...task);
            }
          }
          return this;
        }
        /**
         * Evict the least recently used item, returning its value or
         * `undefined` if cache is empty.
         */
        pop() {
          try {
            while (this.#size) {
              const val = this.#valList[this.#head];
              this.#evict(true);
              if (this.#isBackgroundFetch(val)) {
                if (val.__staleWhileFetching) {
                  return val.__staleWhileFetching;
                }
              } else if (val !== void 0) {
                return val;
              }
            }
          } finally {
            if (this.#hasDisposeAfter && this.#disposed) {
              const dt = this.#disposed;
              let task;
              while (task = dt?.shift()) {
                this.#disposeAfter?.(...task);
              }
            }
          }
        }
        #evict(free) {
          const head = this.#head;
          const k = this.#keyList[head];
          const v = this.#valList[head];
          if (this.#hasFetchMethod && this.#isBackgroundFetch(v)) {
            v.__abortController.abort(new Error("evicted"));
          } else if (this.#hasDispose || this.#hasDisposeAfter) {
            if (this.#hasDispose) {
              this.#dispose?.(v, k, "evict");
            }
            if (this.#hasDisposeAfter) {
              this.#disposed?.push([v, k, "evict"]);
            }
          }
          this.#removeItemSize(head);
          if (free) {
            this.#keyList[head] = void 0;
            this.#valList[head] = void 0;
            this.#free.push(head);
          }
          if (this.#size === 1) {
            this.#head = this.#tail = 0;
            this.#free.length = 0;
          } else {
            this.#head = this.#next[head];
          }
          this.#keyMap.delete(k);
          this.#size--;
          return head;
        }
        /**
         * Check if a key is in the cache, without updating the recency of use.
         * Will return false if the item is stale, even though it is technically
         * in the cache.
         *
         * Check if a key is in the cache, without updating the recency of
         * use. Age is updated if {@link LRUCache.OptionsBase.updateAgeOnHas} is set
         * to `true` in either the options or the constructor.
         *
         * Will return `false` if the item is stale, even though it is technically in
         * the cache. The difference can be determined (if it matters) by using a
         * `status` argument, and inspecting the `has` field.
         *
         * Will not update item age unless
         * {@link LRUCache.OptionsBase.updateAgeOnHas} is set.
         */
        has(k, hasOptions = {}) {
          const { updateAgeOnHas = this.updateAgeOnHas, status } = hasOptions;
          const index = this.#keyMap.get(k);
          if (index !== void 0) {
            const v = this.#valList[index];
            if (this.#isBackgroundFetch(v) && v.__staleWhileFetching === void 0) {
              return false;
            }
            if (!this.#isStale(index)) {
              if (updateAgeOnHas) {
                this.#updateItemAge(index);
              }
              if (status) {
                status.has = "hit";
                this.#statusTTL(status, index);
              }
              return true;
            } else if (status) {
              status.has = "stale";
              this.#statusTTL(status, index);
            }
          } else if (status) {
            status.has = "miss";
          }
          return false;
        }
        /**
         * Like {@link LRUCache#get} but doesn't update recency or delete stale
         * items.
         *
         * Returns `undefined` if the item is stale, unless
         * {@link LRUCache.OptionsBase.allowStale} is set.
         */
        peek(k, peekOptions = {}) {
          const { allowStale = this.allowStale } = peekOptions;
          const index = this.#keyMap.get(k);
          if (index === void 0 || !allowStale && this.#isStale(index)) {
            return;
          }
          const v = this.#valList[index];
          return this.#isBackgroundFetch(v) ? v.__staleWhileFetching : v;
        }
        #backgroundFetch(k, index, options, context) {
          const v = index === void 0 ? void 0 : this.#valList[index];
          if (this.#isBackgroundFetch(v)) {
            return v;
          }
          const ac = new AC();
          const { signal } = options;
          signal?.addEventListener("abort", () => ac.abort(signal.reason), {
            signal: ac.signal
          });
          const fetchOpts = {
            signal: ac.signal,
            options,
            context
          };
          const cb = (v2, updateCache = false) => {
            const { aborted } = ac.signal;
            const ignoreAbort = options.ignoreFetchAbort && v2 !== void 0;
            if (options.status) {
              if (aborted && !updateCache) {
                options.status.fetchAborted = true;
                options.status.fetchError = ac.signal.reason;
                if (ignoreAbort)
                  options.status.fetchAbortIgnored = true;
              } else {
                options.status.fetchResolved = true;
              }
            }
            if (aborted && !ignoreAbort && !updateCache) {
              return fetchFail(ac.signal.reason);
            }
            const bf2 = p;
            if (this.#valList[index] === p) {
              if (v2 === void 0) {
                if (bf2.__staleWhileFetching) {
                  this.#valList[index] = bf2.__staleWhileFetching;
                } else {
                  this.#delete(k, "fetch");
                }
              } else {
                if (options.status)
                  options.status.fetchUpdated = true;
                this.set(k, v2, fetchOpts.options);
              }
            }
            return v2;
          };
          const eb = (er) => {
            if (options.status) {
              options.status.fetchRejected = true;
              options.status.fetchError = er;
            }
            return fetchFail(er);
          };
          const fetchFail = (er) => {
            const { aborted } = ac.signal;
            const allowStaleAborted = aborted && options.allowStaleOnFetchAbort;
            const allowStale = allowStaleAborted || options.allowStaleOnFetchRejection;
            const noDelete = allowStale || options.noDeleteOnFetchRejection;
            const bf2 = p;
            if (this.#valList[index] === p) {
              const del = !noDelete || bf2.__staleWhileFetching === void 0;
              if (del) {
                this.#delete(k, "fetch");
              } else if (!allowStaleAborted) {
                this.#valList[index] = bf2.__staleWhileFetching;
              }
            }
            if (allowStale) {
              if (options.status && bf2.__staleWhileFetching !== void 0) {
                options.status.returnedStale = true;
              }
              return bf2.__staleWhileFetching;
            } else if (bf2.__returned === bf2) {
              throw er;
            }
          };
          const pcall = (res, rej) => {
            const fmp = this.#fetchMethod?.(k, v, fetchOpts);
            if (fmp && fmp instanceof Promise) {
              fmp.then((v2) => res(v2 === void 0 ? void 0 : v2), rej);
            }
            ac.signal.addEventListener("abort", () => {
              if (!options.ignoreFetchAbort || options.allowStaleOnFetchAbort) {
                res(void 0);
                if (options.allowStaleOnFetchAbort) {
                  res = (v2) => cb(v2, true);
                }
              }
            });
          };
          if (options.status)
            options.status.fetchDispatched = true;
          const p = new Promise(pcall).then(cb, eb);
          const bf = Object.assign(p, {
            __abortController: ac,
            __staleWhileFetching: v,
            __returned: void 0
          });
          if (index === void 0) {
            this.set(k, bf, { ...fetchOpts.options, status: void 0 });
            index = this.#keyMap.get(k);
          } else {
            this.#valList[index] = bf;
          }
          return bf;
        }
        #isBackgroundFetch(p) {
          if (!this.#hasFetchMethod)
            return false;
          const b = p;
          return !!b && b instanceof Promise && b.hasOwnProperty("__staleWhileFetching") && b.__abortController instanceof AC;
        }
        async fetch(k, fetchOptions = {}) {
          const {
            // get options
            allowStale = this.allowStale,
            updateAgeOnGet = this.updateAgeOnGet,
            noDeleteOnStaleGet = this.noDeleteOnStaleGet,
            // set options
            ttl = this.ttl,
            noDisposeOnSet = this.noDisposeOnSet,
            size = 0,
            sizeCalculation = this.sizeCalculation,
            noUpdateTTL = this.noUpdateTTL,
            // fetch exclusive options
            noDeleteOnFetchRejection = this.noDeleteOnFetchRejection,
            allowStaleOnFetchRejection = this.allowStaleOnFetchRejection,
            ignoreFetchAbort = this.ignoreFetchAbort,
            allowStaleOnFetchAbort = this.allowStaleOnFetchAbort,
            context,
            forceRefresh = false,
            status,
            signal
          } = fetchOptions;
          if (!this.#hasFetchMethod) {
            if (status)
              status.fetch = "get";
            return this.get(k, {
              allowStale,
              updateAgeOnGet,
              noDeleteOnStaleGet,
              status
            });
          }
          const options = {
            allowStale,
            updateAgeOnGet,
            noDeleteOnStaleGet,
            ttl,
            noDisposeOnSet,
            size,
            sizeCalculation,
            noUpdateTTL,
            noDeleteOnFetchRejection,
            allowStaleOnFetchRejection,
            allowStaleOnFetchAbort,
            ignoreFetchAbort,
            status,
            signal
          };
          let index = this.#keyMap.get(k);
          if (index === void 0) {
            if (status)
              status.fetch = "miss";
            const p = this.#backgroundFetch(k, index, options, context);
            return p.__returned = p;
          } else {
            const v = this.#valList[index];
            if (this.#isBackgroundFetch(v)) {
              const stale = allowStale && v.__staleWhileFetching !== void 0;
              if (status) {
                status.fetch = "inflight";
                if (stale)
                  status.returnedStale = true;
              }
              return stale ? v.__staleWhileFetching : v.__returned = v;
            }
            const isStale = this.#isStale(index);
            if (!forceRefresh && !isStale) {
              if (status)
                status.fetch = "hit";
              this.#moveToTail(index);
              if (updateAgeOnGet) {
                this.#updateItemAge(index);
              }
              if (status)
                this.#statusTTL(status, index);
              return v;
            }
            const p = this.#backgroundFetch(k, index, options, context);
            const hasStale = p.__staleWhileFetching !== void 0;
            const staleVal = hasStale && allowStale;
            if (status) {
              status.fetch = isStale ? "stale" : "refresh";
              if (staleVal && isStale)
                status.returnedStale = true;
            }
            return staleVal ? p.__staleWhileFetching : p.__returned = p;
          }
        }
        async forceFetch(k, fetchOptions = {}) {
          const v = await this.fetch(k, fetchOptions);
          if (v === void 0)
            throw new Error("fetch() returned undefined");
          return v;
        }
        memo(k, memoOptions = {}) {
          const memoMethod = this.#memoMethod;
          if (!memoMethod) {
            throw new Error("no memoMethod provided to constructor");
          }
          const { context, forceRefresh, ...options } = memoOptions;
          const v = this.get(k, options);
          if (!forceRefresh && v !== void 0)
            return v;
          const vv = memoMethod(k, v, {
            options,
            context
          });
          this.set(k, vv, options);
          return vv;
        }
        /**
         * Return a value from the cache. Will update the recency of the cache
         * entry found.
         *
         * If the key is not found, get() will return `undefined`.
         */
        get(k, getOptions = {}) {
          const { allowStale = this.allowStale, updateAgeOnGet = this.updateAgeOnGet, noDeleteOnStaleGet = this.noDeleteOnStaleGet, status } = getOptions;
          const index = this.#keyMap.get(k);
          if (index !== void 0) {
            const value = this.#valList[index];
            const fetching = this.#isBackgroundFetch(value);
            if (status)
              this.#statusTTL(status, index);
            if (this.#isStale(index)) {
              if (status)
                status.get = "stale";
              if (!fetching) {
                if (!noDeleteOnStaleGet) {
                  this.#delete(k, "expire");
                }
                if (status && allowStale)
                  status.returnedStale = true;
                return allowStale ? value : void 0;
              } else {
                if (status && allowStale && value.__staleWhileFetching !== void 0) {
                  status.returnedStale = true;
                }
                return allowStale ? value.__staleWhileFetching : void 0;
              }
            } else {
              if (status)
                status.get = "hit";
              if (fetching) {
                return value.__staleWhileFetching;
              }
              this.#moveToTail(index);
              if (updateAgeOnGet) {
                this.#updateItemAge(index);
              }
              return value;
            }
          } else if (status) {
            status.get = "miss";
          }
        }
        #connect(p, n) {
          this.#prev[n] = p;
          this.#next[p] = n;
        }
        #moveToTail(index) {
          if (index !== this.#tail) {
            if (index === this.#head) {
              this.#head = this.#next[index];
            } else {
              this.#connect(this.#prev[index], this.#next[index]);
            }
            this.#connect(this.#tail, index);
            this.#tail = index;
          }
        }
        /**
         * Deletes a key out of the cache.
         *
         * Returns true if the key was deleted, false otherwise.
         */
        delete(k) {
          return this.#delete(k, "delete");
        }
        #delete(k, reason) {
          let deleted = false;
          if (this.#size !== 0) {
            const index = this.#keyMap.get(k);
            if (index !== void 0) {
              deleted = true;
              if (this.#size === 1) {
                this.#clear(reason);
              } else {
                this.#removeItemSize(index);
                const v = this.#valList[index];
                if (this.#isBackgroundFetch(v)) {
                  v.__abortController.abort(new Error("deleted"));
                } else if (this.#hasDispose || this.#hasDisposeAfter) {
                  if (this.#hasDispose) {
                    this.#dispose?.(v, k, reason);
                  }
                  if (this.#hasDisposeAfter) {
                    this.#disposed?.push([v, k, reason]);
                  }
                }
                this.#keyMap.delete(k);
                this.#keyList[index] = void 0;
                this.#valList[index] = void 0;
                if (index === this.#tail) {
                  this.#tail = this.#prev[index];
                } else if (index === this.#head) {
                  this.#head = this.#next[index];
                } else {
                  const pi = this.#prev[index];
                  this.#next[pi] = this.#next[index];
                  const ni = this.#next[index];
                  this.#prev[ni] = this.#prev[index];
                }
                this.#size--;
                this.#free.push(index);
              }
            }
          }
          if (this.#hasDisposeAfter && this.#disposed?.length) {
            const dt = this.#disposed;
            let task;
            while (task = dt?.shift()) {
              this.#disposeAfter?.(...task);
            }
          }
          return deleted;
        }
        /**
         * Clear the cache entirely, throwing away all values.
         */
        clear() {
          return this.#clear("delete");
        }
        #clear(reason) {
          for (const index of this.#rindexes({ allowStale: true })) {
            const v = this.#valList[index];
            if (this.#isBackgroundFetch(v)) {
              v.__abortController.abort(new Error("deleted"));
            } else {
              const k = this.#keyList[index];
              if (this.#hasDispose) {
                this.#dispose?.(v, k, reason);
              }
              if (this.#hasDisposeAfter) {
                this.#disposed?.push([v, k, reason]);
              }
            }
          }
          this.#keyMap.clear();
          this.#valList.fill(void 0);
          this.#keyList.fill(void 0);
          if (this.#ttls && this.#starts) {
            this.#ttls.fill(0);
            this.#starts.fill(0);
          }
          if (this.#sizes) {
            this.#sizes.fill(0);
          }
          this.#head = 0;
          this.#tail = 0;
          this.#free.length = 0;
          this.#calculatedSize = 0;
          this.#size = 0;
          if (this.#hasDisposeAfter && this.#disposed) {
            const dt = this.#disposed;
            let task;
            while (task = dt?.shift()) {
              this.#disposeAfter?.(...task);
            }
          }
        }
      };
      exports8.LRUCache = LRUCache;
    }
  });

  // node_modules/js-sdsl/dist/cjs/container/ContainerBase/index.js
  var require_ContainerBase = __commonJS({
    "node_modules/js-sdsl/dist/cjs/container/ContainerBase/index.js"(exports8) {
      "use strict";
      init_dirname();
      init_buffer2();
      init_process2();
      Object.defineProperty(exports8, "t", {
        value: true
      });
      exports8.ContainerIterator = exports8.Container = exports8.Base = void 0;
      var ContainerIterator = class {
        constructor(t = 0) {
          this.iteratorType = t;
        }
        equals(t) {
          return this.o === t.o;
        }
      };
      exports8.ContainerIterator = ContainerIterator;
      var Base = class {
        constructor() {
          this.i = 0;
        }
        get length() {
          return this.i;
        }
        size() {
          return this.i;
        }
        empty() {
          return this.i === 0;
        }
      };
      exports8.Base = Base;
      var Container = class extends Base {
      };
      exports8.Container = Container;
    }
  });

  // node_modules/js-sdsl/dist/cjs/container/OtherContainer/Stack.js
  var require_Stack = __commonJS({
    "node_modules/js-sdsl/dist/cjs/container/OtherContainer/Stack.js"(exports8) {
      "use strict";
      init_dirname();
      init_buffer2();
      init_process2();
      Object.defineProperty(exports8, "t", {
        value: true
      });
      exports8.default = void 0;
      var _ContainerBase = require_ContainerBase();
      var Stack = class extends _ContainerBase.Base {
        constructor(t = []) {
          super();
          this.S = [];
          const s = this;
          t.forEach(function(t2) {
            s.push(t2);
          });
        }
        clear() {
          this.i = 0;
          this.S = [];
        }
        push(t) {
          this.S.push(t);
          this.i += 1;
          return this.i;
        }
        pop() {
          if (this.i === 0) return;
          this.i -= 1;
          return this.S.pop();
        }
        top() {
          return this.S[this.i - 1];
        }
      };
      var _default = Stack;
      exports8.default = _default;
    }
  });

  // node_modules/js-sdsl/dist/cjs/container/OtherContainer/Queue.js
  var require_Queue = __commonJS({
    "node_modules/js-sdsl/dist/cjs/container/OtherContainer/Queue.js"(exports8) {
      "use strict";
      init_dirname();
      init_buffer2();
      init_process2();
      Object.defineProperty(exports8, "t", {
        value: true
      });
      exports8.default = void 0;
      var _ContainerBase = require_ContainerBase();
      var Queue = class extends _ContainerBase.Base {
        constructor(t = []) {
          super();
          this.j = 0;
          this.q = [];
          const s = this;
          t.forEach(function(t2) {
            s.push(t2);
          });
        }
        clear() {
          this.q = [];
          this.i = this.j = 0;
        }
        push(t) {
          const s = this.q.length;
          if (this.j / s > 0.5 && this.j + this.i >= s && s > 4096) {
            const s2 = this.i;
            for (let t2 = 0; t2 < s2; ++t2) {
              this.q[t2] = this.q[this.j + t2];
            }
            this.j = 0;
            this.q[this.i] = t;
          } else this.q[this.j + this.i] = t;
          return ++this.i;
        }
        pop() {
          if (this.i === 0) return;
          const t = this.q[this.j++];
          this.i -= 1;
          return t;
        }
        front() {
          if (this.i === 0) return;
          return this.q[this.j];
        }
      };
      var _default = Queue;
      exports8.default = _default;
    }
  });

  // node_modules/js-sdsl/dist/cjs/container/OtherContainer/PriorityQueue.js
  var require_PriorityQueue = __commonJS({
    "node_modules/js-sdsl/dist/cjs/container/OtherContainer/PriorityQueue.js"(exports8) {
      "use strict";
      init_dirname();
      init_buffer2();
      init_process2();
      Object.defineProperty(exports8, "t", {
        value: true
      });
      exports8.default = void 0;
      var _ContainerBase = require_ContainerBase();
      var PriorityQueue = class extends _ContainerBase.Base {
        constructor(t = [], s = function(t2, s2) {
          if (t2 > s2) return -1;
          if (t2 < s2) return 1;
          return 0;
        }, i = true) {
          super();
          this.v = s;
          if (Array.isArray(t)) {
            this.C = i ? [...t] : t;
          } else {
            this.C = [];
            const s2 = this;
            t.forEach(function(t2) {
              s2.C.push(t2);
            });
          }
          this.i = this.C.length;
          const e = this.i >> 1;
          for (let t2 = this.i - 1 >> 1; t2 >= 0; --t2) {
            this.k(t2, e);
          }
        }
        m(t) {
          const s = this.C[t];
          while (t > 0) {
            const i = t - 1 >> 1;
            const e = this.C[i];
            if (this.v(e, s) <= 0) break;
            this.C[t] = e;
            t = i;
          }
          this.C[t] = s;
        }
        k(t, s) {
          const i = this.C[t];
          while (t < s) {
            let s2 = t << 1 | 1;
            const e = s2 + 1;
            let h = this.C[s2];
            if (e < this.i && this.v(h, this.C[e]) > 0) {
              s2 = e;
              h = this.C[e];
            }
            if (this.v(h, i) >= 0) break;
            this.C[t] = h;
            t = s2;
          }
          this.C[t] = i;
        }
        clear() {
          this.i = 0;
          this.C.length = 0;
        }
        push(t) {
          this.C.push(t);
          this.m(this.i);
          this.i += 1;
        }
        pop() {
          if (this.i === 0) return;
          const t = this.C[0];
          const s = this.C.pop();
          this.i -= 1;
          if (this.i) {
            this.C[0] = s;
            this.k(0, this.i >> 1);
          }
          return t;
        }
        top() {
          return this.C[0];
        }
        find(t) {
          return this.C.indexOf(t) >= 0;
        }
        remove(t) {
          const s = this.C.indexOf(t);
          if (s < 0) return false;
          if (s === 0) {
            this.pop();
          } else if (s === this.i - 1) {
            this.C.pop();
            this.i -= 1;
          } else {
            this.C.splice(s, 1, this.C.pop());
            this.i -= 1;
            this.m(s);
            this.k(s, this.i >> 1);
          }
          return true;
        }
        updateItem(t) {
          const s = this.C.indexOf(t);
          if (s < 0) return false;
          this.m(s);
          this.k(s, this.i >> 1);
          return true;
        }
        toArray() {
          return [...this.C];
        }
      };
      var _default = PriorityQueue;
      exports8.default = _default;
    }
  });

  // node_modules/js-sdsl/dist/cjs/container/SequentialContainer/Base/index.js
  var require_Base = __commonJS({
    "node_modules/js-sdsl/dist/cjs/container/SequentialContainer/Base/index.js"(exports8) {
      "use strict";
      init_dirname();
      init_buffer2();
      init_process2();
      Object.defineProperty(exports8, "t", {
        value: true
      });
      exports8.default = void 0;
      var _ContainerBase = require_ContainerBase();
      var SequentialContainer = class extends _ContainerBase.Container {
      };
      var _default = SequentialContainer;
      exports8.default = _default;
    }
  });

  // node_modules/js-sdsl/dist/cjs/utils/throwError.js
  var require_throwError = __commonJS({
    "node_modules/js-sdsl/dist/cjs/utils/throwError.js"(exports8) {
      "use strict";
      init_dirname();
      init_buffer2();
      init_process2();
      Object.defineProperty(exports8, "t", {
        value: true
      });
      exports8.throwIteratorAccessError = throwIteratorAccessError;
      function throwIteratorAccessError() {
        throw new RangeError("Iterator access denied!");
      }
    }
  });

  // node_modules/js-sdsl/dist/cjs/container/SequentialContainer/Base/RandomIterator.js
  var require_RandomIterator = __commonJS({
    "node_modules/js-sdsl/dist/cjs/container/SequentialContainer/Base/RandomIterator.js"(exports8) {
      "use strict";
      init_dirname();
      init_buffer2();
      init_process2();
      Object.defineProperty(exports8, "t", {
        value: true
      });
      exports8.RandomIterator = void 0;
      var _ContainerBase = require_ContainerBase();
      var _throwError = require_throwError();
      var RandomIterator = class extends _ContainerBase.ContainerIterator {
        constructor(t, r) {
          super(r);
          this.o = t;
          if (this.iteratorType === 0) {
            this.pre = function() {
              if (this.o === 0) {
                (0, _throwError.throwIteratorAccessError)();
              }
              this.o -= 1;
              return this;
            };
            this.next = function() {
              if (this.o === this.container.size()) {
                (0, _throwError.throwIteratorAccessError)();
              }
              this.o += 1;
              return this;
            };
          } else {
            this.pre = function() {
              if (this.o === this.container.size() - 1) {
                (0, _throwError.throwIteratorAccessError)();
              }
              this.o += 1;
              return this;
            };
            this.next = function() {
              if (this.o === -1) {
                (0, _throwError.throwIteratorAccessError)();
              }
              this.o -= 1;
              return this;
            };
          }
        }
        get pointer() {
          return this.container.getElementByPos(this.o);
        }
        set pointer(t) {
          this.container.setElementByPos(this.o, t);
        }
      };
      exports8.RandomIterator = RandomIterator;
    }
  });

  // node_modules/js-sdsl/dist/cjs/container/SequentialContainer/Vector.js
  var require_Vector = __commonJS({
    "node_modules/js-sdsl/dist/cjs/container/SequentialContainer/Vector.js"(exports8) {
      "use strict";
      init_dirname();
      init_buffer2();
      init_process2();
      Object.defineProperty(exports8, "t", {
        value: true
      });
      exports8.default = void 0;
      var _Base = _interopRequireDefault(require_Base());
      var _RandomIterator = require_RandomIterator();
      function _interopRequireDefault(t) {
        return t && t.t ? t : {
          default: t
        };
      }
      var VectorIterator = class _VectorIterator extends _RandomIterator.RandomIterator {
        constructor(t, r, e) {
          super(t, e);
          this.container = r;
        }
        copy() {
          return new _VectorIterator(this.o, this.container, this.iteratorType);
        }
      };
      var Vector = class extends _Base.default {
        constructor(t = [], r = true) {
          super();
          if (Array.isArray(t)) {
            this.J = r ? [...t] : t;
            this.i = t.length;
          } else {
            this.J = [];
            const r2 = this;
            t.forEach(function(t2) {
              r2.pushBack(t2);
            });
          }
        }
        clear() {
          this.i = 0;
          this.J.length = 0;
        }
        begin() {
          return new VectorIterator(0, this);
        }
        end() {
          return new VectorIterator(this.i, this);
        }
        rBegin() {
          return new VectorIterator(this.i - 1, this, 1);
        }
        rEnd() {
          return new VectorIterator(-1, this, 1);
        }
        front() {
          return this.J[0];
        }
        back() {
          return this.J[this.i - 1];
        }
        getElementByPos(t) {
          if (t < 0 || t > this.i - 1) {
            throw new RangeError();
          }
          return this.J[t];
        }
        eraseElementByPos(t) {
          if (t < 0 || t > this.i - 1) {
            throw new RangeError();
          }
          this.J.splice(t, 1);
          this.i -= 1;
          return this.i;
        }
        eraseElementByValue(t) {
          let r = 0;
          for (let e = 0; e < this.i; ++e) {
            if (this.J[e] !== t) {
              this.J[r++] = this.J[e];
            }
          }
          this.i = this.J.length = r;
          return this.i;
        }
        eraseElementByIterator(t) {
          const r = t.o;
          t = t.next();
          this.eraseElementByPos(r);
          return t;
        }
        pushBack(t) {
          this.J.push(t);
          this.i += 1;
          return this.i;
        }
        popBack() {
          if (this.i === 0) return;
          this.i -= 1;
          return this.J.pop();
        }
        setElementByPos(t, r) {
          if (t < 0 || t > this.i - 1) {
            throw new RangeError();
          }
          this.J[t] = r;
        }
        insert(t, r, e = 1) {
          if (t < 0 || t > this.i) {
            throw new RangeError();
          }
          this.J.splice(t, 0, ...new Array(e).fill(r));
          this.i += e;
          return this.i;
        }
        find(t) {
          for (let r = 0; r < this.i; ++r) {
            if (this.J[r] === t) {
              return new VectorIterator(r, this);
            }
          }
          return this.end();
        }
        reverse() {
          this.J.reverse();
        }
        unique() {
          let t = 1;
          for (let r = 1; r < this.i; ++r) {
            if (this.J[r] !== this.J[r - 1]) {
              this.J[t++] = this.J[r];
            }
          }
          this.i = this.J.length = t;
          return this.i;
        }
        sort(t) {
          this.J.sort(t);
        }
        forEach(t) {
          for (let r = 0; r < this.i; ++r) {
            t(this.J[r], r, this);
          }
        }
        [Symbol.iterator]() {
          return function* () {
            yield* this.J;
          }.bind(this)();
        }
      };
      var _default = Vector;
      exports8.default = _default;
    }
  });

  // node_modules/js-sdsl/dist/cjs/container/SequentialContainer/LinkList.js
  var require_LinkList = __commonJS({
    "node_modules/js-sdsl/dist/cjs/container/SequentialContainer/LinkList.js"(exports8) {
      "use strict";
      init_dirname();
      init_buffer2();
      init_process2();
      Object.defineProperty(exports8, "t", {
        value: true
      });
      exports8.default = void 0;
      var _Base = _interopRequireDefault(require_Base());
      var _ContainerBase = require_ContainerBase();
      var _throwError = require_throwError();
      function _interopRequireDefault(t) {
        return t && t.t ? t : {
          default: t
        };
      }
      var LinkListIterator = class _LinkListIterator extends _ContainerBase.ContainerIterator {
        constructor(t, i, s, r) {
          super(r);
          this.o = t;
          this.h = i;
          this.container = s;
          if (this.iteratorType === 0) {
            this.pre = function() {
              if (this.o.L === this.h) {
                (0, _throwError.throwIteratorAccessError)();
              }
              this.o = this.o.L;
              return this;
            };
            this.next = function() {
              if (this.o === this.h) {
                (0, _throwError.throwIteratorAccessError)();
              }
              this.o = this.o.B;
              return this;
            };
          } else {
            this.pre = function() {
              if (this.o.B === this.h) {
                (0, _throwError.throwIteratorAccessError)();
              }
              this.o = this.o.B;
              return this;
            };
            this.next = function() {
              if (this.o === this.h) {
                (0, _throwError.throwIteratorAccessError)();
              }
              this.o = this.o.L;
              return this;
            };
          }
        }
        get pointer() {
          if (this.o === this.h) {
            (0, _throwError.throwIteratorAccessError)();
          }
          return this.o.l;
        }
        set pointer(t) {
          if (this.o === this.h) {
            (0, _throwError.throwIteratorAccessError)();
          }
          this.o.l = t;
        }
        copy() {
          return new _LinkListIterator(this.o, this.h, this.container, this.iteratorType);
        }
      };
      var LinkList = class extends _Base.default {
        constructor(t = []) {
          super();
          this.h = {};
          this.p = this._ = this.h.L = this.h.B = this.h;
          const i = this;
          t.forEach(function(t2) {
            i.pushBack(t2);
          });
        }
        V(t) {
          const { L: i, B: s } = t;
          i.B = s;
          s.L = i;
          if (t === this.p) {
            this.p = s;
          }
          if (t === this._) {
            this._ = i;
          }
          this.i -= 1;
        }
        G(t, i) {
          const s = i.B;
          const r = {
            l: t,
            L: i,
            B: s
          };
          i.B = r;
          s.L = r;
          if (i === this.h) {
            this.p = r;
          }
          if (s === this.h) {
            this._ = r;
          }
          this.i += 1;
        }
        clear() {
          this.i = 0;
          this.p = this._ = this.h.L = this.h.B = this.h;
        }
        begin() {
          return new LinkListIterator(this.p, this.h, this);
        }
        end() {
          return new LinkListIterator(this.h, this.h, this);
        }
        rBegin() {
          return new LinkListIterator(this._, this.h, this, 1);
        }
        rEnd() {
          return new LinkListIterator(this.h, this.h, this, 1);
        }
        front() {
          return this.p.l;
        }
        back() {
          return this._.l;
        }
        getElementByPos(t) {
          if (t < 0 || t > this.i - 1) {
            throw new RangeError();
          }
          let i = this.p;
          while (t--) {
            i = i.B;
          }
          return i.l;
        }
        eraseElementByPos(t) {
          if (t < 0 || t > this.i - 1) {
            throw new RangeError();
          }
          let i = this.p;
          while (t--) {
            i = i.B;
          }
          this.V(i);
          return this.i;
        }
        eraseElementByValue(t) {
          let i = this.p;
          while (i !== this.h) {
            if (i.l === t) {
              this.V(i);
            }
            i = i.B;
          }
          return this.i;
        }
        eraseElementByIterator(t) {
          const i = t.o;
          if (i === this.h) {
            (0, _throwError.throwIteratorAccessError)();
          }
          t = t.next();
          this.V(i);
          return t;
        }
        pushBack(t) {
          this.G(t, this._);
          return this.i;
        }
        popBack() {
          if (this.i === 0) return;
          const t = this._.l;
          this.V(this._);
          return t;
        }
        pushFront(t) {
          this.G(t, this.h);
          return this.i;
        }
        popFront() {
          if (this.i === 0) return;
          const t = this.p.l;
          this.V(this.p);
          return t;
        }
        setElementByPos(t, i) {
          if (t < 0 || t > this.i - 1) {
            throw new RangeError();
          }
          let s = this.p;
          while (t--) {
            s = s.B;
          }
          s.l = i;
        }
        insert(t, i, s = 1) {
          if (t < 0 || t > this.i) {
            throw new RangeError();
          }
          if (s <= 0) return this.i;
          if (t === 0) {
            while (s--) this.pushFront(i);
          } else if (t === this.i) {
            while (s--) this.pushBack(i);
          } else {
            let r = this.p;
            for (let i2 = 1; i2 < t; ++i2) {
              r = r.B;
            }
            const e = r.B;
            this.i += s;
            while (s--) {
              r.B = {
                l: i,
                L: r
              };
              r.B.L = r;
              r = r.B;
            }
            r.B = e;
            e.L = r;
          }
          return this.i;
        }
        find(t) {
          let i = this.p;
          while (i !== this.h) {
            if (i.l === t) {
              return new LinkListIterator(i, this.h, this);
            }
            i = i.B;
          }
          return this.end();
        }
        reverse() {
          if (this.i <= 1) return;
          let t = this.p;
          let i = this._;
          let s = 0;
          while (s << 1 < this.i) {
            const r = t.l;
            t.l = i.l;
            i.l = r;
            t = t.B;
            i = i.L;
            s += 1;
          }
        }
        unique() {
          if (this.i <= 1) {
            return this.i;
          }
          let t = this.p;
          while (t !== this.h) {
            let i = t;
            while (i.B !== this.h && i.l === i.B.l) {
              i = i.B;
              this.i -= 1;
            }
            t.B = i.B;
            t.B.L = t;
            t = t.B;
          }
          return this.i;
        }
        sort(t) {
          if (this.i <= 1) return;
          const i = [];
          this.forEach(function(t2) {
            i.push(t2);
          });
          i.sort(t);
          let s = this.p;
          i.forEach(function(t2) {
            s.l = t2;
            s = s.B;
          });
        }
        merge(t) {
          const i = this;
          if (this.i === 0) {
            t.forEach(function(t2) {
              i.pushBack(t2);
            });
          } else {
            let s = this.p;
            t.forEach(function(t2) {
              while (s !== i.h && s.l <= t2) {
                s = s.B;
              }
              i.G(t2, s.L);
            });
          }
          return this.i;
        }
        forEach(t) {
          let i = this.p;
          let s = 0;
          while (i !== this.h) {
            t(i.l, s++, this);
            i = i.B;
          }
        }
        [Symbol.iterator]() {
          return function* () {
            if (this.i === 0) return;
            let t = this.p;
            while (t !== this.h) {
              yield t.l;
              t = t.B;
            }
          }.bind(this)();
        }
      };
      var _default = LinkList;
      exports8.default = _default;
    }
  });

  // node_modules/js-sdsl/dist/cjs/container/SequentialContainer/Deque.js
  var require_Deque = __commonJS({
    "node_modules/js-sdsl/dist/cjs/container/SequentialContainer/Deque.js"(exports8) {
      "use strict";
      init_dirname();
      init_buffer2();
      init_process2();
      Object.defineProperty(exports8, "t", {
        value: true
      });
      exports8.default = void 0;
      var _Base = _interopRequireDefault(require_Base());
      var _RandomIterator = require_RandomIterator();
      function _interopRequireDefault(t) {
        return t && t.t ? t : {
          default: t
        };
      }
      var DequeIterator = class _DequeIterator extends _RandomIterator.RandomIterator {
        constructor(t, i, s) {
          super(t, s);
          this.container = i;
        }
        copy() {
          return new _DequeIterator(this.o, this.container, this.iteratorType);
        }
      };
      var Deque = class extends _Base.default {
        constructor(t = [], i = 1 << 12) {
          super();
          this.j = 0;
          this.D = 0;
          this.R = 0;
          this.N = 0;
          this.P = 0;
          this.A = [];
          const s = (() => {
            if (typeof t.length === "number") return t.length;
            if (typeof t.size === "number") return t.size;
            if (typeof t.size === "function") return t.size();
            throw new TypeError("Cannot get the length or size of the container");
          })();
          this.F = i;
          this.P = Math.max(Math.ceil(s / this.F), 1);
          for (let t2 = 0; t2 < this.P; ++t2) {
            this.A.push(new Array(this.F));
          }
          const h = Math.ceil(s / this.F);
          this.j = this.R = (this.P >> 1) - (h >> 1);
          this.D = this.N = this.F - s % this.F >> 1;
          const e = this;
          t.forEach(function(t2) {
            e.pushBack(t2);
          });
        }
        T() {
          const t = [];
          const i = Math.max(this.P >> 1, 1);
          for (let s = 0; s < i; ++s) {
            t[s] = new Array(this.F);
          }
          for (let i2 = this.j; i2 < this.P; ++i2) {
            t[t.length] = this.A[i2];
          }
          for (let i2 = 0; i2 < this.R; ++i2) {
            t[t.length] = this.A[i2];
          }
          t[t.length] = [...this.A[this.R]];
          this.j = i;
          this.R = t.length - 1;
          for (let s = 0; s < i; ++s) {
            t[t.length] = new Array(this.F);
          }
          this.A = t;
          this.P = t.length;
        }
        O(t) {
          const i = this.D + t + 1;
          const s = i % this.F;
          let h = s - 1;
          let e = this.j + (i - s) / this.F;
          if (s === 0) e -= 1;
          e %= this.P;
          if (h < 0) h += this.F;
          return {
            curNodeBucketIndex: e,
            curNodePointerIndex: h
          };
        }
        clear() {
          this.A = [new Array(this.F)];
          this.P = 1;
          this.j = this.R = this.i = 0;
          this.D = this.N = this.F >> 1;
        }
        begin() {
          return new DequeIterator(0, this);
        }
        end() {
          return new DequeIterator(this.i, this);
        }
        rBegin() {
          return new DequeIterator(this.i - 1, this, 1);
        }
        rEnd() {
          return new DequeIterator(-1, this, 1);
        }
        front() {
          if (this.i === 0) return;
          return this.A[this.j][this.D];
        }
        back() {
          if (this.i === 0) return;
          return this.A[this.R][this.N];
        }
        pushBack(t) {
          if (this.i) {
            if (this.N < this.F - 1) {
              this.N += 1;
            } else if (this.R < this.P - 1) {
              this.R += 1;
              this.N = 0;
            } else {
              this.R = 0;
              this.N = 0;
            }
            if (this.R === this.j && this.N === this.D) this.T();
          }
          this.i += 1;
          this.A[this.R][this.N] = t;
          return this.i;
        }
        popBack() {
          if (this.i === 0) return;
          const t = this.A[this.R][this.N];
          if (this.i !== 1) {
            if (this.N > 0) {
              this.N -= 1;
            } else if (this.R > 0) {
              this.R -= 1;
              this.N = this.F - 1;
            } else {
              this.R = this.P - 1;
              this.N = this.F - 1;
            }
          }
          this.i -= 1;
          return t;
        }
        pushFront(t) {
          if (this.i) {
            if (this.D > 0) {
              this.D -= 1;
            } else if (this.j > 0) {
              this.j -= 1;
              this.D = this.F - 1;
            } else {
              this.j = this.P - 1;
              this.D = this.F - 1;
            }
            if (this.j === this.R && this.D === this.N) this.T();
          }
          this.i += 1;
          this.A[this.j][this.D] = t;
          return this.i;
        }
        popFront() {
          if (this.i === 0) return;
          const t = this.A[this.j][this.D];
          if (this.i !== 1) {
            if (this.D < this.F - 1) {
              this.D += 1;
            } else if (this.j < this.P - 1) {
              this.j += 1;
              this.D = 0;
            } else {
              this.j = 0;
              this.D = 0;
            }
          }
          this.i -= 1;
          return t;
        }
        getElementByPos(t) {
          if (t < 0 || t > this.i - 1) {
            throw new RangeError();
          }
          const { curNodeBucketIndex: i, curNodePointerIndex: s } = this.O(t);
          return this.A[i][s];
        }
        setElementByPos(t, i) {
          if (t < 0 || t > this.i - 1) {
            throw new RangeError();
          }
          const { curNodeBucketIndex: s, curNodePointerIndex: h } = this.O(t);
          this.A[s][h] = i;
        }
        insert(t, i, s = 1) {
          if (t < 0 || t > this.i) {
            throw new RangeError();
          }
          if (t === 0) {
            while (s--) this.pushFront(i);
          } else if (t === this.i) {
            while (s--) this.pushBack(i);
          } else {
            const h = [];
            for (let i2 = t; i2 < this.i; ++i2) {
              h.push(this.getElementByPos(i2));
            }
            this.cut(t - 1);
            for (let t2 = 0; t2 < s; ++t2) this.pushBack(i);
            for (let t2 = 0; t2 < h.length; ++t2) this.pushBack(h[t2]);
          }
          return this.i;
        }
        cut(t) {
          if (t < 0) {
            this.clear();
            return 0;
          }
          const { curNodeBucketIndex: i, curNodePointerIndex: s } = this.O(t);
          this.R = i;
          this.N = s;
          this.i = t + 1;
          return this.i;
        }
        eraseElementByPos(t) {
          if (t < 0 || t > this.i - 1) {
            throw new RangeError();
          }
          if (t === 0) this.popFront();
          else if (t === this.i - 1) this.popBack();
          else {
            const i = [];
            for (let s2 = t + 1; s2 < this.i; ++s2) {
              i.push(this.getElementByPos(s2));
            }
            this.cut(t);
            this.popBack();
            const s = this;
            i.forEach(function(t2) {
              s.pushBack(t2);
            });
          }
          return this.i;
        }
        eraseElementByValue(t) {
          if (this.i === 0) return 0;
          const i = [];
          for (let s2 = 0; s2 < this.i; ++s2) {
            const h = this.getElementByPos(s2);
            if (h !== t) i.push(h);
          }
          const s = i.length;
          for (let t2 = 0; t2 < s; ++t2) this.setElementByPos(t2, i[t2]);
          return this.cut(s - 1);
        }
        eraseElementByIterator(t) {
          const i = t.o;
          this.eraseElementByPos(i);
          t = t.next();
          return t;
        }
        find(t) {
          for (let i = 0; i < this.i; ++i) {
            if (this.getElementByPos(i) === t) {
              return new DequeIterator(i, this);
            }
          }
          return this.end();
        }
        reverse() {
          let t = 0;
          let i = this.i - 1;
          while (t < i) {
            const s = this.getElementByPos(t);
            this.setElementByPos(t, this.getElementByPos(i));
            this.setElementByPos(i, s);
            t += 1;
            i -= 1;
          }
        }
        unique() {
          if (this.i <= 1) {
            return this.i;
          }
          let t = 1;
          let i = this.getElementByPos(0);
          for (let s = 1; s < this.i; ++s) {
            const h = this.getElementByPos(s);
            if (h !== i) {
              i = h;
              this.setElementByPos(t++, h);
            }
          }
          while (this.i > t) this.popBack();
          return this.i;
        }
        sort(t) {
          const i = [];
          for (let t2 = 0; t2 < this.i; ++t2) {
            i.push(this.getElementByPos(t2));
          }
          i.sort(t);
          for (let t2 = 0; t2 < this.i; ++t2) this.setElementByPos(t2, i[t2]);
        }
        shrinkToFit() {
          if (this.i === 0) return;
          const t = [];
          this.forEach(function(i) {
            t.push(i);
          });
          this.P = Math.max(Math.ceil(this.i / this.F), 1);
          this.i = this.j = this.R = this.D = this.N = 0;
          this.A = [];
          for (let t2 = 0; t2 < this.P; ++t2) {
            this.A.push(new Array(this.F));
          }
          for (let i = 0; i < t.length; ++i) this.pushBack(t[i]);
        }
        forEach(t) {
          for (let i = 0; i < this.i; ++i) {
            t(this.getElementByPos(i), i, this);
          }
        }
        [Symbol.iterator]() {
          return function* () {
            for (let t = 0; t < this.i; ++t) {
              yield this.getElementByPos(t);
            }
          }.bind(this)();
        }
      };
      var _default = Deque;
      exports8.default = _default;
    }
  });

  // node_modules/js-sdsl/dist/cjs/container/TreeContainer/Base/TreeNode.js
  var require_TreeNode = __commonJS({
    "node_modules/js-sdsl/dist/cjs/container/TreeContainer/Base/TreeNode.js"(exports8) {
      "use strict";
      init_dirname();
      init_buffer2();
      init_process2();
      Object.defineProperty(exports8, "t", {
        value: true
      });
      exports8.TreeNodeEnableIndex = exports8.TreeNode = void 0;
      var TreeNode = class {
        constructor(e, t) {
          this.ee = 1;
          this.u = void 0;
          this.l = void 0;
          this.U = void 0;
          this.W = void 0;
          this.tt = void 0;
          this.u = e;
          this.l = t;
        }
        L() {
          let e = this;
          if (e.ee === 1 && e.tt.tt === e) {
            e = e.W;
          } else if (e.U) {
            e = e.U;
            while (e.W) {
              e = e.W;
            }
          } else {
            let t = e.tt;
            while (t.U === e) {
              e = t;
              t = e.tt;
            }
            e = t;
          }
          return e;
        }
        B() {
          let e = this;
          if (e.W) {
            e = e.W;
            while (e.U) {
              e = e.U;
            }
            return e;
          } else {
            let t = e.tt;
            while (t.W === e) {
              e = t;
              t = e.tt;
            }
            if (e.W !== t) {
              return t;
            } else return e;
          }
        }
        te() {
          const e = this.tt;
          const t = this.W;
          const s = t.U;
          if (e.tt === this) e.tt = t;
          else if (e.U === this) e.U = t;
          else e.W = t;
          t.tt = e;
          t.U = this;
          this.tt = t;
          this.W = s;
          if (s) s.tt = this;
          return t;
        }
        se() {
          const e = this.tt;
          const t = this.U;
          const s = t.W;
          if (e.tt === this) e.tt = t;
          else if (e.U === this) e.U = t;
          else e.W = t;
          t.tt = e;
          t.W = this;
          this.tt = t;
          this.U = s;
          if (s) s.tt = this;
          return t;
        }
      };
      exports8.TreeNode = TreeNode;
      var TreeNodeEnableIndex = class extends TreeNode {
        constructor() {
          super(...arguments);
          this.rt = 1;
        }
        te() {
          const e = super.te();
          this.ie();
          e.ie();
          return e;
        }
        se() {
          const e = super.se();
          this.ie();
          e.ie();
          return e;
        }
        ie() {
          this.rt = 1;
          if (this.U) {
            this.rt += this.U.rt;
          }
          if (this.W) {
            this.rt += this.W.rt;
          }
        }
      };
      exports8.TreeNodeEnableIndex = TreeNodeEnableIndex;
    }
  });

  // node_modules/js-sdsl/dist/cjs/container/TreeContainer/Base/index.js
  var require_Base2 = __commonJS({
    "node_modules/js-sdsl/dist/cjs/container/TreeContainer/Base/index.js"(exports8) {
      "use strict";
      init_dirname();
      init_buffer2();
      init_process2();
      Object.defineProperty(exports8, "t", {
        value: true
      });
      exports8.default = void 0;
      var _TreeNode = require_TreeNode();
      var _ContainerBase = require_ContainerBase();
      var _throwError = require_throwError();
      var TreeContainer = class extends _ContainerBase.Container {
        constructor(e = function(e2, t2) {
          if (e2 < t2) return -1;
          if (e2 > t2) return 1;
          return 0;
        }, t = false) {
          super();
          this.Y = void 0;
          this.v = e;
          if (t) {
            this.re = _TreeNode.TreeNodeEnableIndex;
            this.M = function(e2, t2, i) {
              const s = this.ne(e2, t2, i);
              if (s) {
                let e3 = s.tt;
                while (e3 !== this.h) {
                  e3.rt += 1;
                  e3 = e3.tt;
                }
                const t3 = this.he(s);
                if (t3) {
                  const { parentNode: e4, grandParent: i2, curNode: s2 } = t3;
                  e4.ie();
                  i2.ie();
                  s2.ie();
                }
              }
              return this.i;
            };
            this.V = function(e2) {
              let t2 = this.fe(e2);
              while (t2 !== this.h) {
                t2.rt -= 1;
                t2 = t2.tt;
              }
            };
          } else {
            this.re = _TreeNode.TreeNode;
            this.M = function(e2, t2, i) {
              const s = this.ne(e2, t2, i);
              if (s) this.he(s);
              return this.i;
            };
            this.V = this.fe;
          }
          this.h = new this.re();
        }
        X(e, t) {
          let i = this.h;
          while (e) {
            const s = this.v(e.u, t);
            if (s < 0) {
              e = e.W;
            } else if (s > 0) {
              i = e;
              e = e.U;
            } else return e;
          }
          return i;
        }
        Z(e, t) {
          let i = this.h;
          while (e) {
            const s = this.v(e.u, t);
            if (s <= 0) {
              e = e.W;
            } else {
              i = e;
              e = e.U;
            }
          }
          return i;
        }
        $(e, t) {
          let i = this.h;
          while (e) {
            const s = this.v(e.u, t);
            if (s < 0) {
              i = e;
              e = e.W;
            } else if (s > 0) {
              e = e.U;
            } else return e;
          }
          return i;
        }
        rr(e, t) {
          let i = this.h;
          while (e) {
            const s = this.v(e.u, t);
            if (s < 0) {
              i = e;
              e = e.W;
            } else {
              e = e.U;
            }
          }
          return i;
        }
        ue(e) {
          while (true) {
            const t = e.tt;
            if (t === this.h) return;
            if (e.ee === 1) {
              e.ee = 0;
              return;
            }
            if (e === t.U) {
              const i = t.W;
              if (i.ee === 1) {
                i.ee = 0;
                t.ee = 1;
                if (t === this.Y) {
                  this.Y = t.te();
                } else t.te();
              } else {
                if (i.W && i.W.ee === 1) {
                  i.ee = t.ee;
                  t.ee = 0;
                  i.W.ee = 0;
                  if (t === this.Y) {
                    this.Y = t.te();
                  } else t.te();
                  return;
                } else if (i.U && i.U.ee === 1) {
                  i.ee = 1;
                  i.U.ee = 0;
                  i.se();
                } else {
                  i.ee = 1;
                  e = t;
                }
              }
            } else {
              const i = t.U;
              if (i.ee === 1) {
                i.ee = 0;
                t.ee = 1;
                if (t === this.Y) {
                  this.Y = t.se();
                } else t.se();
              } else {
                if (i.U && i.U.ee === 1) {
                  i.ee = t.ee;
                  t.ee = 0;
                  i.U.ee = 0;
                  if (t === this.Y) {
                    this.Y = t.se();
                  } else t.se();
                  return;
                } else if (i.W && i.W.ee === 1) {
                  i.ee = 1;
                  i.W.ee = 0;
                  i.te();
                } else {
                  i.ee = 1;
                  e = t;
                }
              }
            }
          }
        }
        fe(e) {
          if (this.i === 1) {
            this.clear();
            return this.h;
          }
          let t = e;
          while (t.U || t.W) {
            if (t.W) {
              t = t.W;
              while (t.U) t = t.U;
            } else {
              t = t.U;
            }
            [e.u, t.u] = [t.u, e.u];
            [e.l, t.l] = [t.l, e.l];
            e = t;
          }
          if (this.h.U === t) {
            this.h.U = t.tt;
          } else if (this.h.W === t) {
            this.h.W = t.tt;
          }
          this.ue(t);
          const i = t.tt;
          if (t === i.U) {
            i.U = void 0;
          } else i.W = void 0;
          this.i -= 1;
          this.Y.ee = 0;
          return i;
        }
        oe(e, t) {
          if (e === void 0) return false;
          const i = this.oe(e.U, t);
          if (i) return true;
          if (t(e)) return true;
          return this.oe(e.W, t);
        }
        he(e) {
          while (true) {
            const t = e.tt;
            if (t.ee === 0) return;
            const i = t.tt;
            if (t === i.U) {
              const s = i.W;
              if (s && s.ee === 1) {
                s.ee = t.ee = 0;
                if (i === this.Y) return;
                i.ee = 1;
                e = i;
                continue;
              } else if (e === t.W) {
                e.ee = 0;
                if (e.U) e.U.tt = t;
                if (e.W) e.W.tt = i;
                t.W = e.U;
                i.U = e.W;
                e.U = t;
                e.W = i;
                if (i === this.Y) {
                  this.Y = e;
                  this.h.tt = e;
                } else {
                  const t2 = i.tt;
                  if (t2.U === i) {
                    t2.U = e;
                  } else t2.W = e;
                }
                e.tt = i.tt;
                t.tt = e;
                i.tt = e;
                i.ee = 1;
                return {
                  parentNode: t,
                  grandParent: i,
                  curNode: e
                };
              } else {
                t.ee = 0;
                if (i === this.Y) {
                  this.Y = i.se();
                } else i.se();
                i.ee = 1;
              }
            } else {
              const s = i.U;
              if (s && s.ee === 1) {
                s.ee = t.ee = 0;
                if (i === this.Y) return;
                i.ee = 1;
                e = i;
                continue;
              } else if (e === t.U) {
                e.ee = 0;
                if (e.U) e.U.tt = i;
                if (e.W) e.W.tt = t;
                i.W = e.U;
                t.U = e.W;
                e.U = i;
                e.W = t;
                if (i === this.Y) {
                  this.Y = e;
                  this.h.tt = e;
                } else {
                  const t2 = i.tt;
                  if (t2.U === i) {
                    t2.U = e;
                  } else t2.W = e;
                }
                e.tt = i.tt;
                t.tt = e;
                i.tt = e;
                i.ee = 1;
                return {
                  parentNode: t,
                  grandParent: i,
                  curNode: e
                };
              } else {
                t.ee = 0;
                if (i === this.Y) {
                  this.Y = i.te();
                } else i.te();
                i.ee = 1;
              }
            }
            return;
          }
        }
        ne(e, t, i) {
          if (this.Y === void 0) {
            this.i += 1;
            this.Y = new this.re(e, t);
            this.Y.ee = 0;
            this.Y.tt = this.h;
            this.h.tt = this.Y;
            this.h.U = this.Y;
            this.h.W = this.Y;
            return;
          }
          let s;
          const r = this.h.U;
          const n = this.v(r.u, e);
          if (n === 0) {
            r.l = t;
            return;
          } else if (n > 0) {
            r.U = new this.re(e, t);
            r.U.tt = r;
            s = r.U;
            this.h.U = s;
          } else {
            const r2 = this.h.W;
            const n2 = this.v(r2.u, e);
            if (n2 === 0) {
              r2.l = t;
              return;
            } else if (n2 < 0) {
              r2.W = new this.re(e, t);
              r2.W.tt = r2;
              s = r2.W;
              this.h.W = s;
            } else {
              if (i !== void 0) {
                const r3 = i.o;
                if (r3 !== this.h) {
                  const i2 = this.v(r3.u, e);
                  if (i2 === 0) {
                    r3.l = t;
                    return;
                  } else if (i2 > 0) {
                    const i3 = r3.L();
                    const n3 = this.v(i3.u, e);
                    if (n3 === 0) {
                      i3.l = t;
                      return;
                    } else if (n3 < 0) {
                      s = new this.re(e, t);
                      if (i3.W === void 0) {
                        i3.W = s;
                        s.tt = i3;
                      } else {
                        r3.U = s;
                        s.tt = r3;
                      }
                    }
                  }
                }
              }
              if (s === void 0) {
                s = this.Y;
                while (true) {
                  const i2 = this.v(s.u, e);
                  if (i2 > 0) {
                    if (s.U === void 0) {
                      s.U = new this.re(e, t);
                      s.U.tt = s;
                      s = s.U;
                      break;
                    }
                    s = s.U;
                  } else if (i2 < 0) {
                    if (s.W === void 0) {
                      s.W = new this.re(e, t);
                      s.W.tt = s;
                      s = s.W;
                      break;
                    }
                    s = s.W;
                  } else {
                    s.l = t;
                    return;
                  }
                }
              }
            }
          }
          this.i += 1;
          return s;
        }
        I(e, t) {
          while (e) {
            const i = this.v(e.u, t);
            if (i < 0) {
              e = e.W;
            } else if (i > 0) {
              e = e.U;
            } else return e;
          }
          return e || this.h;
        }
        clear() {
          this.i = 0;
          this.Y = void 0;
          this.h.tt = void 0;
          this.h.U = this.h.W = void 0;
        }
        updateKeyByIterator(e, t) {
          const i = e.o;
          if (i === this.h) {
            (0, _throwError.throwIteratorAccessError)();
          }
          if (this.i === 1) {
            i.u = t;
            return true;
          }
          if (i === this.h.U) {
            if (this.v(i.B().u, t) > 0) {
              i.u = t;
              return true;
            }
            return false;
          }
          if (i === this.h.W) {
            if (this.v(i.L().u, t) < 0) {
              i.u = t;
              return true;
            }
            return false;
          }
          const s = i.L().u;
          if (this.v(s, t) >= 0) return false;
          const r = i.B().u;
          if (this.v(r, t) <= 0) return false;
          i.u = t;
          return true;
        }
        eraseElementByPos(e) {
          if (e < 0 || e > this.i - 1) {
            throw new RangeError();
          }
          let t = 0;
          const i = this;
          this.oe(this.Y, function(s) {
            if (e === t) {
              i.V(s);
              return true;
            }
            t += 1;
            return false;
          });
          return this.i;
        }
        eraseElementByKey(e) {
          if (this.i === 0) return false;
          const t = this.I(this.Y, e);
          if (t === this.h) return false;
          this.V(t);
          return true;
        }
        eraseElementByIterator(e) {
          const t = e.o;
          if (t === this.h) {
            (0, _throwError.throwIteratorAccessError)();
          }
          const i = t.W === void 0;
          const s = e.iteratorType === 0;
          if (s) {
            if (i) e.next();
          } else {
            if (!i || t.U === void 0) e.next();
          }
          this.V(t);
          return e;
        }
        forEach(e) {
          let t = 0;
          for (const i of this) e(i, t++, this);
        }
        getElementByPos(e) {
          if (e < 0 || e > this.i - 1) {
            throw new RangeError();
          }
          let t;
          let i = 0;
          for (const s of this) {
            if (i === e) {
              t = s;
              break;
            }
            i += 1;
          }
          return t;
        }
        getHeight() {
          if (this.i === 0) return 0;
          const traversal = function(e) {
            if (!e) return 0;
            return Math.max(traversal(e.U), traversal(e.W)) + 1;
          };
          return traversal(this.Y);
        }
      };
      var _default = TreeContainer;
      exports8.default = _default;
    }
  });

  // node_modules/js-sdsl/dist/cjs/container/TreeContainer/Base/TreeIterator.js
  var require_TreeIterator = __commonJS({
    "node_modules/js-sdsl/dist/cjs/container/TreeContainer/Base/TreeIterator.js"(exports8) {
      "use strict";
      init_dirname();
      init_buffer2();
      init_process2();
      Object.defineProperty(exports8, "t", {
        value: true
      });
      exports8.default = void 0;
      var _ContainerBase = require_ContainerBase();
      var _throwError = require_throwError();
      var TreeIterator = class extends _ContainerBase.ContainerIterator {
        constructor(t, r, i) {
          super(i);
          this.o = t;
          this.h = r;
          if (this.iteratorType === 0) {
            this.pre = function() {
              if (this.o === this.h.U) {
                (0, _throwError.throwIteratorAccessError)();
              }
              this.o = this.o.L();
              return this;
            };
            this.next = function() {
              if (this.o === this.h) {
                (0, _throwError.throwIteratorAccessError)();
              }
              this.o = this.o.B();
              return this;
            };
          } else {
            this.pre = function() {
              if (this.o === this.h.W) {
                (0, _throwError.throwIteratorAccessError)();
              }
              this.o = this.o.B();
              return this;
            };
            this.next = function() {
              if (this.o === this.h) {
                (0, _throwError.throwIteratorAccessError)();
              }
              this.o = this.o.L();
              return this;
            };
          }
        }
        get index() {
          let t = this.o;
          const r = this.h.tt;
          if (t === this.h) {
            if (r) {
              return r.rt - 1;
            }
            return 0;
          }
          let i = 0;
          if (t.U) {
            i += t.U.rt;
          }
          while (t !== r) {
            const r2 = t.tt;
            if (t === r2.W) {
              i += 1;
              if (r2.U) {
                i += r2.U.rt;
              }
            }
            t = r2;
          }
          return i;
        }
      };
      var _default = TreeIterator;
      exports8.default = _default;
    }
  });

  // node_modules/js-sdsl/dist/cjs/container/TreeContainer/OrderedSet.js
  var require_OrderedSet = __commonJS({
    "node_modules/js-sdsl/dist/cjs/container/TreeContainer/OrderedSet.js"(exports8) {
      "use strict";
      init_dirname();
      init_buffer2();
      init_process2();
      Object.defineProperty(exports8, "t", {
        value: true
      });
      exports8.default = void 0;
      var _Base = _interopRequireDefault(require_Base2());
      var _TreeIterator = _interopRequireDefault(require_TreeIterator());
      var _throwError = require_throwError();
      function _interopRequireDefault(e) {
        return e && e.t ? e : {
          default: e
        };
      }
      var OrderedSetIterator = class _OrderedSetIterator extends _TreeIterator.default {
        constructor(e, t, r, i) {
          super(e, t, i);
          this.container = r;
        }
        get pointer() {
          if (this.o === this.h) {
            (0, _throwError.throwIteratorAccessError)();
          }
          return this.o.u;
        }
        copy() {
          return new _OrderedSetIterator(this.o, this.h, this.container, this.iteratorType);
        }
      };
      var OrderedSet = class extends _Base.default {
        constructor(e = [], t, r) {
          super(t, r);
          const i = this;
          e.forEach(function(e2) {
            i.insert(e2);
          });
        }
        *K(e) {
          if (e === void 0) return;
          yield* this.K(e.U);
          yield e.u;
          yield* this.K(e.W);
        }
        begin() {
          return new OrderedSetIterator(this.h.U || this.h, this.h, this);
        }
        end() {
          return new OrderedSetIterator(this.h, this.h, this);
        }
        rBegin() {
          return new OrderedSetIterator(this.h.W || this.h, this.h, this, 1);
        }
        rEnd() {
          return new OrderedSetIterator(this.h, this.h, this, 1);
        }
        front() {
          return this.h.U ? this.h.U.u : void 0;
        }
        back() {
          return this.h.W ? this.h.W.u : void 0;
        }
        insert(e, t) {
          return this.M(e, void 0, t);
        }
        find(e) {
          const t = this.I(this.Y, e);
          return new OrderedSetIterator(t, this.h, this);
        }
        lowerBound(e) {
          const t = this.X(this.Y, e);
          return new OrderedSetIterator(t, this.h, this);
        }
        upperBound(e) {
          const t = this.Z(this.Y, e);
          return new OrderedSetIterator(t, this.h, this);
        }
        reverseLowerBound(e) {
          const t = this.$(this.Y, e);
          return new OrderedSetIterator(t, this.h, this);
        }
        reverseUpperBound(e) {
          const t = this.rr(this.Y, e);
          return new OrderedSetIterator(t, this.h, this);
        }
        union(e) {
          const t = this;
          e.forEach(function(e2) {
            t.insert(e2);
          });
          return this.i;
        }
        [Symbol.iterator]() {
          return this.K(this.Y);
        }
      };
      var _default = OrderedSet;
      exports8.default = _default;
    }
  });

  // node_modules/js-sdsl/dist/cjs/container/TreeContainer/OrderedMap.js
  var require_OrderedMap = __commonJS({
    "node_modules/js-sdsl/dist/cjs/container/TreeContainer/OrderedMap.js"(exports8) {
      "use strict";
      init_dirname();
      init_buffer2();
      init_process2();
      Object.defineProperty(exports8, "t", {
        value: true
      });
      exports8.default = void 0;
      var _Base = _interopRequireDefault(require_Base2());
      var _TreeIterator = _interopRequireDefault(require_TreeIterator());
      var _throwError = require_throwError();
      function _interopRequireDefault(r) {
        return r && r.t ? r : {
          default: r
        };
      }
      var OrderedMapIterator = class _OrderedMapIterator extends _TreeIterator.default {
        constructor(r, t, e, s) {
          super(r, t, s);
          this.container = e;
        }
        get pointer() {
          if (this.o === this.h) {
            (0, _throwError.throwIteratorAccessError)();
          }
          const r = this;
          return new Proxy([], {
            get(t, e) {
              if (e === "0") return r.o.u;
              else if (e === "1") return r.o.l;
            },
            set(t, e, s) {
              if (e !== "1") {
                throw new TypeError("props must be 1");
              }
              r.o.l = s;
              return true;
            }
          });
        }
        copy() {
          return new _OrderedMapIterator(this.o, this.h, this.container, this.iteratorType);
        }
      };
      var OrderedMap = class extends _Base.default {
        constructor(r = [], t, e) {
          super(t, e);
          const s = this;
          r.forEach(function(r2) {
            s.setElement(r2[0], r2[1]);
          });
        }
        *K(r) {
          if (r === void 0) return;
          yield* this.K(r.U);
          yield [r.u, r.l];
          yield* this.K(r.W);
        }
        begin() {
          return new OrderedMapIterator(this.h.U || this.h, this.h, this);
        }
        end() {
          return new OrderedMapIterator(this.h, this.h, this);
        }
        rBegin() {
          return new OrderedMapIterator(this.h.W || this.h, this.h, this, 1);
        }
        rEnd() {
          return new OrderedMapIterator(this.h, this.h, this, 1);
        }
        front() {
          if (this.i === 0) return;
          const r = this.h.U;
          return [r.u, r.l];
        }
        back() {
          if (this.i === 0) return;
          const r = this.h.W;
          return [r.u, r.l];
        }
        lowerBound(r) {
          const t = this.X(this.Y, r);
          return new OrderedMapIterator(t, this.h, this);
        }
        upperBound(r) {
          const t = this.Z(this.Y, r);
          return new OrderedMapIterator(t, this.h, this);
        }
        reverseLowerBound(r) {
          const t = this.$(this.Y, r);
          return new OrderedMapIterator(t, this.h, this);
        }
        reverseUpperBound(r) {
          const t = this.rr(this.Y, r);
          return new OrderedMapIterator(t, this.h, this);
        }
        setElement(r, t, e) {
          return this.M(r, t, e);
        }
        find(r) {
          const t = this.I(this.Y, r);
          return new OrderedMapIterator(t, this.h, this);
        }
        getElementByKey(r) {
          const t = this.I(this.Y, r);
          return t.l;
        }
        union(r) {
          const t = this;
          r.forEach(function(r2) {
            t.setElement(r2[0], r2[1]);
          });
          return this.i;
        }
        [Symbol.iterator]() {
          return this.K(this.Y);
        }
      };
      var _default = OrderedMap;
      exports8.default = _default;
    }
  });

  // node_modules/js-sdsl/dist/cjs/utils/checkObject.js
  var require_checkObject = __commonJS({
    "node_modules/js-sdsl/dist/cjs/utils/checkObject.js"(exports8) {
      "use strict";
      init_dirname();
      init_buffer2();
      init_process2();
      Object.defineProperty(exports8, "t", {
        value: true
      });
      exports8.default = checkObject;
      function checkObject(e) {
        const t = typeof e;
        return t === "object" && e !== null || t === "function";
      }
    }
  });

  // node_modules/js-sdsl/dist/cjs/container/HashContainer/Base/index.js
  var require_Base3 = __commonJS({
    "node_modules/js-sdsl/dist/cjs/container/HashContainer/Base/index.js"(exports8) {
      "use strict";
      init_dirname();
      init_buffer2();
      init_process2();
      Object.defineProperty(exports8, "t", {
        value: true
      });
      exports8.HashContainerIterator = exports8.HashContainer = void 0;
      var _ContainerBase = require_ContainerBase();
      var _checkObject = _interopRequireDefault(require_checkObject());
      var _throwError = require_throwError();
      function _interopRequireDefault(t) {
        return t && t.t ? t : {
          default: t
        };
      }
      var HashContainerIterator = class extends _ContainerBase.ContainerIterator {
        constructor(t, e, i) {
          super(i);
          this.o = t;
          this.h = e;
          if (this.iteratorType === 0) {
            this.pre = function() {
              if (this.o.L === this.h) {
                (0, _throwError.throwIteratorAccessError)();
              }
              this.o = this.o.L;
              return this;
            };
            this.next = function() {
              if (this.o === this.h) {
                (0, _throwError.throwIteratorAccessError)();
              }
              this.o = this.o.B;
              return this;
            };
          } else {
            this.pre = function() {
              if (this.o.B === this.h) {
                (0, _throwError.throwIteratorAccessError)();
              }
              this.o = this.o.B;
              return this;
            };
            this.next = function() {
              if (this.o === this.h) {
                (0, _throwError.throwIteratorAccessError)();
              }
              this.o = this.o.L;
              return this;
            };
          }
        }
      };
      exports8.HashContainerIterator = HashContainerIterator;
      var HashContainer = class extends _ContainerBase.Container {
        constructor() {
          super();
          this.H = [];
          this.g = {};
          this.HASH_TAG = Symbol("@@HASH_TAG");
          Object.setPrototypeOf(this.g, null);
          this.h = {};
          this.h.L = this.h.B = this.p = this._ = this.h;
        }
        V(t) {
          const { L: e, B: i } = t;
          e.B = i;
          i.L = e;
          if (t === this.p) {
            this.p = i;
          }
          if (t === this._) {
            this._ = e;
          }
          this.i -= 1;
        }
        M(t, e, i) {
          if (i === void 0) i = (0, _checkObject.default)(t);
          let s;
          if (i) {
            const i2 = t[this.HASH_TAG];
            if (i2 !== void 0) {
              this.H[i2].l = e;
              return this.i;
            }
            Object.defineProperty(t, this.HASH_TAG, {
              value: this.H.length,
              configurable: true
            });
            s = {
              u: t,
              l: e,
              L: this._,
              B: this.h
            };
            this.H.push(s);
          } else {
            const i2 = this.g[t];
            if (i2) {
              i2.l = e;
              return this.i;
            }
            s = {
              u: t,
              l: e,
              L: this._,
              B: this.h
            };
            this.g[t] = s;
          }
          if (this.i === 0) {
            this.p = s;
            this.h.B = s;
          } else {
            this._.B = s;
          }
          this._ = s;
          this.h.L = s;
          return ++this.i;
        }
        I(t, e) {
          if (e === void 0) e = (0, _checkObject.default)(t);
          if (e) {
            const e2 = t[this.HASH_TAG];
            if (e2 === void 0) return this.h;
            return this.H[e2];
          } else {
            return this.g[t] || this.h;
          }
        }
        clear() {
          const t = this.HASH_TAG;
          this.H.forEach(function(e) {
            delete e.u[t];
          });
          this.H = [];
          this.g = {};
          Object.setPrototypeOf(this.g, null);
          this.i = 0;
          this.p = this._ = this.h.L = this.h.B = this.h;
        }
        eraseElementByKey(t, e) {
          let i;
          if (e === void 0) e = (0, _checkObject.default)(t);
          if (e) {
            const e2 = t[this.HASH_TAG];
            if (e2 === void 0) return false;
            delete t[this.HASH_TAG];
            i = this.H[e2];
            delete this.H[e2];
          } else {
            i = this.g[t];
            if (i === void 0) return false;
            delete this.g[t];
          }
          this.V(i);
          return true;
        }
        eraseElementByIterator(t) {
          const e = t.o;
          if (e === this.h) {
            (0, _throwError.throwIteratorAccessError)();
          }
          this.V(e);
          return t.next();
        }
        eraseElementByPos(t) {
          if (t < 0 || t > this.i - 1) {
            throw new RangeError();
          }
          let e = this.p;
          while (t--) {
            e = e.B;
          }
          this.V(e);
          return this.i;
        }
      };
      exports8.HashContainer = HashContainer;
    }
  });

  // node_modules/js-sdsl/dist/cjs/container/HashContainer/HashSet.js
  var require_HashSet = __commonJS({
    "node_modules/js-sdsl/dist/cjs/container/HashContainer/HashSet.js"(exports8) {
      "use strict";
      init_dirname();
      init_buffer2();
      init_process2();
      Object.defineProperty(exports8, "t", {
        value: true
      });
      exports8.default = void 0;
      var _Base = require_Base3();
      var _throwError = require_throwError();
      var HashSetIterator = class _HashSetIterator extends _Base.HashContainerIterator {
        constructor(t, e, r, s) {
          super(t, e, s);
          this.container = r;
        }
        get pointer() {
          if (this.o === this.h) {
            (0, _throwError.throwIteratorAccessError)();
          }
          return this.o.u;
        }
        copy() {
          return new _HashSetIterator(this.o, this.h, this.container, this.iteratorType);
        }
      };
      var HashSet = class extends _Base.HashContainer {
        constructor(t = []) {
          super();
          const e = this;
          t.forEach(function(t2) {
            e.insert(t2);
          });
        }
        begin() {
          return new HashSetIterator(this.p, this.h, this);
        }
        end() {
          return new HashSetIterator(this.h, this.h, this);
        }
        rBegin() {
          return new HashSetIterator(this._, this.h, this, 1);
        }
        rEnd() {
          return new HashSetIterator(this.h, this.h, this, 1);
        }
        front() {
          return this.p.u;
        }
        back() {
          return this._.u;
        }
        insert(t, e) {
          return this.M(t, void 0, e);
        }
        getElementByPos(t) {
          if (t < 0 || t > this.i - 1) {
            throw new RangeError();
          }
          let e = this.p;
          while (t--) {
            e = e.B;
          }
          return e.u;
        }
        find(t, e) {
          const r = this.I(t, e);
          return new HashSetIterator(r, this.h, this);
        }
        forEach(t) {
          let e = 0;
          let r = this.p;
          while (r !== this.h) {
            t(r.u, e++, this);
            r = r.B;
          }
        }
        [Symbol.iterator]() {
          return function* () {
            let t = this.p;
            while (t !== this.h) {
              yield t.u;
              t = t.B;
            }
          }.bind(this)();
        }
      };
      var _default = HashSet;
      exports8.default = _default;
    }
  });

  // node_modules/js-sdsl/dist/cjs/container/HashContainer/HashMap.js
  var require_HashMap = __commonJS({
    "node_modules/js-sdsl/dist/cjs/container/HashContainer/HashMap.js"(exports8) {
      "use strict";
      init_dirname();
      init_buffer2();
      init_process2();
      Object.defineProperty(exports8, "t", {
        value: true
      });
      exports8.default = void 0;
      var _Base = require_Base3();
      var _checkObject = _interopRequireDefault(require_checkObject());
      var _throwError = require_throwError();
      function _interopRequireDefault(t) {
        return t && t.t ? t : {
          default: t
        };
      }
      var HashMapIterator = class _HashMapIterator extends _Base.HashContainerIterator {
        constructor(t, e, r, s) {
          super(t, e, s);
          this.container = r;
        }
        get pointer() {
          if (this.o === this.h) {
            (0, _throwError.throwIteratorAccessError)();
          }
          const t = this;
          return new Proxy([], {
            get(e, r) {
              if (r === "0") return t.o.u;
              else if (r === "1") return t.o.l;
            },
            set(e, r, s) {
              if (r !== "1") {
                throw new TypeError("props must be 1");
              }
              t.o.l = s;
              return true;
            }
          });
        }
        copy() {
          return new _HashMapIterator(this.o, this.h, this.container, this.iteratorType);
        }
      };
      var HashMap = class extends _Base.HashContainer {
        constructor(t = []) {
          super();
          const e = this;
          t.forEach(function(t2) {
            e.setElement(t2[0], t2[1]);
          });
        }
        begin() {
          return new HashMapIterator(this.p, this.h, this);
        }
        end() {
          return new HashMapIterator(this.h, this.h, this);
        }
        rBegin() {
          return new HashMapIterator(this._, this.h, this, 1);
        }
        rEnd() {
          return new HashMapIterator(this.h, this.h, this, 1);
        }
        front() {
          if (this.i === 0) return;
          return [this.p.u, this.p.l];
        }
        back() {
          if (this.i === 0) return;
          return [this._.u, this._.l];
        }
        setElement(t, e, r) {
          return this.M(t, e, r);
        }
        getElementByKey(t, e) {
          if (e === void 0) e = (0, _checkObject.default)(t);
          if (e) {
            const e2 = t[this.HASH_TAG];
            return e2 !== void 0 ? this.H[e2].l : void 0;
          }
          const r = this.g[t];
          return r ? r.l : void 0;
        }
        getElementByPos(t) {
          if (t < 0 || t > this.i - 1) {
            throw new RangeError();
          }
          let e = this.p;
          while (t--) {
            e = e.B;
          }
          return [e.u, e.l];
        }
        find(t, e) {
          const r = this.I(t, e);
          return new HashMapIterator(r, this.h, this);
        }
        forEach(t) {
          let e = 0;
          let r = this.p;
          while (r !== this.h) {
            t([r.u, r.l], e++, this);
            r = r.B;
          }
        }
        [Symbol.iterator]() {
          return function* () {
            let t = this.p;
            while (t !== this.h) {
              yield [t.u, t.l];
              t = t.B;
            }
          }.bind(this)();
        }
      };
      var _default = HashMap;
      exports8.default = _default;
    }
  });

  // node_modules/js-sdsl/dist/cjs/index.js
  var require_cjs = __commonJS({
    "node_modules/js-sdsl/dist/cjs/index.js"(exports8) {
      "use strict";
      init_dirname();
      init_buffer2();
      init_process2();
      Object.defineProperty(exports8, "t", {
        value: true
      });
      Object.defineProperty(exports8, "Deque", {
        enumerable: true,
        get: function() {
          return _Deque.default;
        }
      });
      Object.defineProperty(exports8, "HashMap", {
        enumerable: true,
        get: function() {
          return _HashMap.default;
        }
      });
      Object.defineProperty(exports8, "HashSet", {
        enumerable: true,
        get: function() {
          return _HashSet.default;
        }
      });
      Object.defineProperty(exports8, "LinkList", {
        enumerable: true,
        get: function() {
          return _LinkList.default;
        }
      });
      Object.defineProperty(exports8, "OrderedMap", {
        enumerable: true,
        get: function() {
          return _OrderedMap.default;
        }
      });
      Object.defineProperty(exports8, "OrderedSet", {
        enumerable: true,
        get: function() {
          return _OrderedSet.default;
        }
      });
      Object.defineProperty(exports8, "PriorityQueue", {
        enumerable: true,
        get: function() {
          return _PriorityQueue.default;
        }
      });
      Object.defineProperty(exports8, "Queue", {
        enumerable: true,
        get: function() {
          return _Queue.default;
        }
      });
      Object.defineProperty(exports8, "Stack", {
        enumerable: true,
        get: function() {
          return _Stack.default;
        }
      });
      Object.defineProperty(exports8, "Vector", {
        enumerable: true,
        get: function() {
          return _Vector.default;
        }
      });
      var _Stack = _interopRequireDefault(require_Stack());
      var _Queue = _interopRequireDefault(require_Queue());
      var _PriorityQueue = _interopRequireDefault(require_PriorityQueue());
      var _Vector = _interopRequireDefault(require_Vector());
      var _LinkList = _interopRequireDefault(require_LinkList());
      var _Deque = _interopRequireDefault(require_Deque());
      var _OrderedSet = _interopRequireDefault(require_OrderedSet());
      var _OrderedMap = _interopRequireDefault(require_OrderedMap());
      var _HashSet = _interopRequireDefault(require_HashSet());
      var _HashMap = _interopRequireDefault(require_HashMap());
      function _interopRequireDefault(e) {
        return e && e.t ? e : {
          default: e
        };
      }
    }
  });

  // node_modules/number-allocator/lib/number-allocator.js
  var require_number_allocator = __commonJS({
    "node_modules/number-allocator/lib/number-allocator.js"(exports8, module) {
      "use strict";
      init_dirname();
      init_buffer2();
      init_process2();
      var SortedSet = require_cjs().OrderedSet;
      var debugTrace = require_browser4()("number-allocator:trace");
      var debugError = require_browser4()("number-allocator:error");
      function Interval(low, high) {
        this.low = low;
        this.high = high;
      }
      Interval.prototype.equals = function(other) {
        return this.low === other.low && this.high === other.high;
      };
      Interval.prototype.compare = function(other) {
        if (this.low < other.low && this.high < other.low) return -1;
        if (other.low < this.low && other.high < this.low) return 1;
        return 0;
      };
      function NumberAllocator(min, max) {
        if (!(this instanceof NumberAllocator)) {
          return new NumberAllocator(min, max);
        }
        this.min = min;
        this.max = max;
        this.ss = new SortedSet(
          [],
          (lhs, rhs) => {
            return lhs.compare(rhs);
          }
        );
        debugTrace("Create");
        this.clear();
      }
      NumberAllocator.prototype.firstVacant = function() {
        if (this.ss.size() === 0) return null;
        return this.ss.front().low;
      };
      NumberAllocator.prototype.alloc = function() {
        if (this.ss.size() === 0) {
          debugTrace("alloc():empty");
          return null;
        }
        const it = this.ss.begin();
        const low = it.pointer.low;
        const high = it.pointer.high;
        const num = low;
        if (num + 1 <= high) {
          this.ss.updateKeyByIterator(it, new Interval(low + 1, high));
        } else {
          this.ss.eraseElementByPos(0);
        }
        debugTrace("alloc():" + num);
        return num;
      };
      NumberAllocator.prototype.use = function(num) {
        const key = new Interval(num, num);
        const it = this.ss.lowerBound(key);
        if (!it.equals(this.ss.end())) {
          const low = it.pointer.low;
          const high = it.pointer.high;
          if (it.pointer.equals(key)) {
            this.ss.eraseElementByIterator(it);
            debugTrace("use():" + num);
            return true;
          }
          if (low > num) return false;
          if (low === num) {
            this.ss.updateKeyByIterator(it, new Interval(low + 1, high));
            debugTrace("use():" + num);
            return true;
          }
          if (high === num) {
            this.ss.updateKeyByIterator(it, new Interval(low, high - 1));
            debugTrace("use():" + num);
            return true;
          }
          this.ss.updateKeyByIterator(it, new Interval(num + 1, high));
          this.ss.insert(new Interval(low, num - 1));
          debugTrace("use():" + num);
          return true;
        }
        debugTrace("use():failed");
        return false;
      };
      NumberAllocator.prototype.free = function(num) {
        if (num < this.min || num > this.max) {
          debugError("free():" + num + " is out of range");
          return;
        }
        const key = new Interval(num, num);
        const it = this.ss.upperBound(key);
        if (it.equals(this.ss.end())) {
          if (it.equals(this.ss.begin())) {
            this.ss.insert(key);
            return;
          }
          it.pre();
          const low = it.pointer.high;
          const high = it.pointer.high;
          if (high + 1 === num) {
            this.ss.updateKeyByIterator(it, new Interval(low, num));
          } else {
            this.ss.insert(key);
          }
        } else {
          if (it.equals(this.ss.begin())) {
            if (num + 1 === it.pointer.low) {
              const high = it.pointer.high;
              this.ss.updateKeyByIterator(it, new Interval(num, high));
            } else {
              this.ss.insert(key);
            }
          } else {
            const rLow = it.pointer.low;
            const rHigh = it.pointer.high;
            it.pre();
            const lLow = it.pointer.low;
            const lHigh = it.pointer.high;
            if (lHigh + 1 === num) {
              if (num + 1 === rLow) {
                this.ss.eraseElementByIterator(it);
                this.ss.updateKeyByIterator(it, new Interval(lLow, rHigh));
              } else {
                this.ss.updateKeyByIterator(it, new Interval(lLow, num));
              }
            } else {
              if (num + 1 === rLow) {
                this.ss.eraseElementByIterator(it.next());
                this.ss.insert(new Interval(num, rHigh));
              } else {
                this.ss.insert(key);
              }
            }
          }
        }
        debugTrace("free():" + num);
      };
      NumberAllocator.prototype.clear = function() {
        debugTrace("clear()");
        this.ss.clear();
        this.ss.insert(new Interval(this.min, this.max));
      };
      NumberAllocator.prototype.intervalCount = function() {
        return this.ss.size();
      };
      NumberAllocator.prototype.dump = function() {
        console.log("length:" + this.ss.size());
        for (const element of this.ss) {
          console.log(element);
        }
      };
      module.exports = NumberAllocator;
    }
  });

  // node_modules/number-allocator/index.js
  var require_number_allocator2 = __commonJS({
    "node_modules/number-allocator/index.js"(exports8, module) {
      init_dirname();
      init_buffer2();
      init_process2();
      var NumberAllocator = require_number_allocator();
      module.exports.NumberAllocator = NumberAllocator;
    }
  });

  // build/lib/topic-alias-send.js
  var require_topic_alias_send = __commonJS({
    "build/lib/topic-alias-send.js"(exports8) {
      "use strict";
      init_dirname();
      init_buffer2();
      init_process2();
      Object.defineProperty(exports8, "__esModule", { value: true });
      var lru_cache_1 = require_commonjs();
      var number_allocator_1 = require_number_allocator2();
      var TopicAliasSend = class {
        aliasToTopic;
        topicToAlias;
        max;
        numberAllocator;
        length;
        constructor(max) {
          if (max > 0) {
            this.aliasToTopic = new lru_cache_1.LRUCache({ max });
            this.topicToAlias = {};
            this.numberAllocator = new number_allocator_1.NumberAllocator(1, max);
            this.max = max;
            this.length = 0;
          }
        }
        put(topic, alias) {
          if (alias === 0 || alias > this.max) {
            return false;
          }
          const entry = this.aliasToTopic.get(alias);
          if (entry) {
            delete this.topicToAlias[entry];
          }
          this.aliasToTopic.set(alias, topic);
          this.topicToAlias[topic] = alias;
          this.numberAllocator.use(alias);
          this.length = this.aliasToTopic.size;
          return true;
        }
        getTopicByAlias(alias) {
          return this.aliasToTopic.get(alias);
        }
        getAliasByTopic(topic) {
          const alias = this.topicToAlias[topic];
          if (typeof alias !== "undefined") {
            this.aliasToTopic.get(alias);
          }
          return alias;
        }
        clear() {
          this.aliasToTopic.clear();
          this.topicToAlias = {};
          this.numberAllocator.clear();
          this.length = 0;
        }
        getLruAlias() {
          const alias = this.numberAllocator.firstVacant();
          if (alias)
            return alias;
          return [...this.aliasToTopic.keys()][this.aliasToTopic.size - 1];
        }
      };
      exports8.default = TopicAliasSend;
    }
  });

  // build/lib/handlers/connack.js
  var require_connack = __commonJS({
    "build/lib/handlers/connack.js"(exports8) {
      "use strict";
      init_dirname();
      init_buffer2();
      init_process2();
      var __importDefault = exports8 && exports8.__importDefault || function(mod) {
        return mod && mod.__esModule ? mod : { "default": mod };
      };
      Object.defineProperty(exports8, "__esModule", { value: true });
      var ack_1 = require_ack();
      var topic_alias_send_1 = __importDefault(require_topic_alias_send());
      var shared_1 = require_shared();
      var handleConnack = (client, packet) => {
        client.log("_handleConnack");
        const { options } = client;
        const version4 = options.protocolVersion;
        const rc = version4 === 5 ? packet.reasonCode : packet.returnCode;
        clearTimeout(client["connackTimer"]);
        delete client["topicAliasSend"];
        if (packet.properties) {
          if (packet.properties.topicAliasMaximum) {
            if (packet.properties.topicAliasMaximum > 65535) {
              client.emit("error", new Error("topicAliasMaximum from broker is out of range"));
              return;
            }
            if (packet.properties.topicAliasMaximum > 0) {
              client["topicAliasSend"] = new topic_alias_send_1.default(packet.properties.topicAliasMaximum);
            }
          }
          if (packet.properties.serverKeepAlive && options.keepalive) {
            options.keepalive = packet.properties.serverKeepAlive;
          }
          if (packet.properties.maximumPacketSize) {
            if (!options.properties) {
              options.properties = {};
            }
            options.properties.maximumPacketSize = packet.properties.maximumPacketSize;
          }
        }
        if (rc === 0) {
          client.reconnecting = false;
          client["_onConnect"](packet);
        } else if (rc > 0) {
          const err = new shared_1.ErrorWithReasonCode(`Connection refused: ${ack_1.ReasonCodes[rc]}`, rc);
          client.emit("error", err);
          if (client.options.reconnectOnConnackError) {
            client["_cleanUp"](true);
          }
        }
      };
      exports8.default = handleConnack;
    }
  });

  // build/lib/handlers/pubrel.js
  var require_pubrel = __commonJS({
    "build/lib/handlers/pubrel.js"(exports8) {
      "use strict";
      init_dirname();
      init_buffer2();
      init_process2();
      Object.defineProperty(exports8, "__esModule", { value: true });
      var handlePubrel = (client, packet, done) => {
        client.log("handling pubrel packet");
        const callback = typeof done !== "undefined" ? done : client.noop;
        const { messageId } = packet;
        const comp = { cmd: "pubcomp", messageId };
        client.incomingStore.get(packet, (err, pub) => {
          if (!err) {
            client.emit("message", pub.topic, pub.payload, pub);
            client.handleMessage(pub, (err2) => {
              if (err2) {
                return callback(err2);
              }
              client.incomingStore.del(pub, client.noop);
              client["_sendPacket"](comp, callback);
            });
          } else {
            client["_sendPacket"](comp, callback);
          }
        });
      };
      exports8.default = handlePubrel;
    }
  });

  // build/lib/handlers/index.js
  var require_handlers = __commonJS({
    "build/lib/handlers/index.js"(exports8) {
      "use strict";
      init_dirname();
      init_buffer2();
      init_process2();
      var __importDefault = exports8 && exports8.__importDefault || function(mod) {
        return mod && mod.__esModule ? mod : { "default": mod };
      };
      Object.defineProperty(exports8, "__esModule", { value: true });
      var publish_1 = __importDefault(require_publish());
      var auth_1 = __importDefault(require_auth());
      var connack_1 = __importDefault(require_connack());
      var ack_1 = __importDefault(require_ack());
      var pubrel_1 = __importDefault(require_pubrel());
      var handle = (client, packet, done) => {
        const { options } = client;
        if (options.protocolVersion === 5 && options.properties && options.properties.maximumPacketSize && options.properties.maximumPacketSize < packet.length) {
          client.emit("error", new Error(`exceeding packets size ${packet.cmd}`));
          client.end({
            reasonCode: 149,
            properties: { reasonString: "Maximum packet size was exceeded" }
          });
          return client;
        }
        client.log("_handlePacket :: emitting packetreceive");
        client.emit("packetreceive", packet);
        switch (packet.cmd) {
          case "publish":
            (0, publish_1.default)(client, packet, done);
            break;
          case "puback":
          case "pubrec":
          case "pubcomp":
          case "suback":
          case "unsuback":
            client.reschedulePing();
            (0, ack_1.default)(client, packet);
            done();
            break;
          case "pubrel":
            client.reschedulePing();
            (0, pubrel_1.default)(client, packet, done);
            break;
          case "connack":
            (0, connack_1.default)(client, packet);
            done();
            break;
          case "auth":
            client.reschedulePing();
            (0, auth_1.default)(client, packet);
            done();
            break;
          case "pingresp":
            client.log("_handlePacket :: received pingresp");
            client.reschedulePing(true);
            done();
            break;
          case "disconnect":
            client.emit("disconnect", packet);
            done();
            break;
          default:
            client.log("_handlePacket :: unknown command");
            done();
            break;
        }
      };
      exports8.default = handle;
    }
  });

  // build/lib/default-message-id-provider.js
  var require_default_message_id_provider = __commonJS({
    "build/lib/default-message-id-provider.js"(exports8) {
      "use strict";
      init_dirname();
      init_buffer2();
      init_process2();
      Object.defineProperty(exports8, "__esModule", { value: true });
      var DefaultMessageIdProvider = class {
        nextId;
        constructor() {
          this.nextId = Math.max(1, Math.floor(Math.random() * 65535));
        }
        allocate() {
          const id = this.nextId++;
          if (this.nextId === 65536) {
            this.nextId = 1;
          }
          return id;
        }
        getLastAllocated() {
          return this.nextId === 1 ? 65535 : this.nextId - 1;
        }
        register(messageId) {
          return true;
        }
        deallocate(messageId) {
        }
        clear() {
        }
      };
      exports8.default = DefaultMessageIdProvider;
    }
  });

  // build/lib/topic-alias-recv.js
  var require_topic_alias_recv = __commonJS({
    "build/lib/topic-alias-recv.js"(exports8) {
      "use strict";
      init_dirname();
      init_buffer2();
      init_process2();
      Object.defineProperty(exports8, "__esModule", { value: true });
      var TopicAliasRecv = class {
        aliasToTopic;
        max;
        length;
        constructor(max) {
          this.aliasToTopic = {};
          this.max = max;
        }
        put(topic, alias) {
          if (alias === 0 || alias > this.max) {
            return false;
          }
          this.aliasToTopic[alias] = topic;
          this.length = Object.keys(this.aliasToTopic).length;
          return true;
        }
        getTopicByAlias(alias) {
          return this.aliasToTopic[alias];
        }
        clear() {
          this.aliasToTopic = {};
        }
      };
      exports8.default = TopicAliasRecv;
    }
  });

  // build/lib/TypedEmitter.js
  var require_TypedEmitter = __commonJS({
    "build/lib/TypedEmitter.js"(exports8) {
      "use strict";
      init_dirname();
      init_buffer2();
      init_process2();
      var __importDefault = exports8 && exports8.__importDefault || function(mod) {
        return mod && mod.__esModule ? mod : { "default": mod };
      };
      Object.defineProperty(exports8, "__esModule", { value: true });
      exports8.TypedEventEmitter = void 0;
      var events_1 = __importDefault((init_events(), __toCommonJS(events_exports)));
      var shared_1 = require_shared();
      var TypedEventEmitter = class {
      };
      exports8.TypedEventEmitter = TypedEventEmitter;
      (0, shared_1.applyMixin)(TypedEventEmitter, events_1.default);
    }
  });

  // node_modules/@babel/runtime/helpers/typeof.js
  var require_typeof = __commonJS({
    "node_modules/@babel/runtime/helpers/typeof.js"(exports8, module) {
      init_dirname();
      init_buffer2();
      init_process2();
      function _typeof(o) {
        "@babel/helpers - typeof";
        return module.exports = _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o2) {
          return typeof o2;
        } : function(o2) {
          return o2 && "function" == typeof Symbol && o2.constructor === Symbol && o2 !== Symbol.prototype ? "symbol" : typeof o2;
        }, module.exports.__esModule = true, module.exports["default"] = module.exports, _typeof(o);
      }
      module.exports = _typeof, module.exports.__esModule = true, module.exports["default"] = module.exports;
    }
  });

  // node_modules/@babel/runtime/helpers/toPrimitive.js
  var require_toPrimitive = __commonJS({
    "node_modules/@babel/runtime/helpers/toPrimitive.js"(exports8, module) {
      init_dirname();
      init_buffer2();
      init_process2();
      var _typeof = require_typeof()["default"];
      function toPrimitive(t, r) {
        if ("object" != _typeof(t) || !t) return t;
        var e = t[Symbol.toPrimitive];
        if (void 0 !== e) {
          var i = e.call(t, r || "default");
          if ("object" != _typeof(i)) return i;
          throw new TypeError("@@toPrimitive must return a primitive value.");
        }
        return ("string" === r ? String : Number)(t);
      }
      module.exports = toPrimitive, module.exports.__esModule = true, module.exports["default"] = module.exports;
    }
  });

  // node_modules/@babel/runtime/helpers/toPropertyKey.js
  var require_toPropertyKey = __commonJS({
    "node_modules/@babel/runtime/helpers/toPropertyKey.js"(exports8, module) {
      init_dirname();
      init_buffer2();
      init_process2();
      var _typeof = require_typeof()["default"];
      var toPrimitive = require_toPrimitive();
      function toPropertyKey(t) {
        var i = toPrimitive(t, "string");
        return "symbol" == _typeof(i) ? i : i + "";
      }
      module.exports = toPropertyKey, module.exports.__esModule = true, module.exports["default"] = module.exports;
    }
  });

  // node_modules/@babel/runtime/helpers/defineProperty.js
  var require_defineProperty = __commonJS({
    "node_modules/@babel/runtime/helpers/defineProperty.js"(exports8, module) {
      init_dirname();
      init_buffer2();
      init_process2();
      var toPropertyKey = require_toPropertyKey();
      function _defineProperty(e, r, t) {
        return (r = toPropertyKey(r)) in e ? Object.defineProperty(e, r, {
          value: t,
          enumerable: true,
          configurable: true,
          writable: true
        }) : e[r] = t, e;
      }
      module.exports = _defineProperty, module.exports.__esModule = true, module.exports["default"] = module.exports;
    }
  });

  // node_modules/@babel/runtime/helpers/arrayWithHoles.js
  var require_arrayWithHoles = __commonJS({
    "node_modules/@babel/runtime/helpers/arrayWithHoles.js"(exports8, module) {
      init_dirname();
      init_buffer2();
      init_process2();
      function _arrayWithHoles(r) {
        if (Array.isArray(r)) return r;
      }
      module.exports = _arrayWithHoles, module.exports.__esModule = true, module.exports["default"] = module.exports;
    }
  });

  // node_modules/@babel/runtime/helpers/iterableToArrayLimit.js
  var require_iterableToArrayLimit = __commonJS({
    "node_modules/@babel/runtime/helpers/iterableToArrayLimit.js"(exports8, module) {
      init_dirname();
      init_buffer2();
      init_process2();
      function _iterableToArrayLimit(r, l) {
        var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
        if (null != t) {
          var e, n, i, u, a = [], f = true, o = false;
          try {
            if (i = (t = t.call(r)).next, 0 === l) {
              if (Object(t) !== t) return;
              f = false;
            } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = true) ;
          } catch (r2) {
            o = true, n = r2;
          } finally {
            try {
              if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return;
            } finally {
              if (o) throw n;
            }
          }
          return a;
        }
      }
      module.exports = _iterableToArrayLimit, module.exports.__esModule = true, module.exports["default"] = module.exports;
    }
  });

  // node_modules/@babel/runtime/helpers/arrayLikeToArray.js
  var require_arrayLikeToArray = __commonJS({
    "node_modules/@babel/runtime/helpers/arrayLikeToArray.js"(exports8, module) {
      init_dirname();
      init_buffer2();
      init_process2();
      function _arrayLikeToArray(r, a) {
        (null == a || a > r.length) && (a = r.length);
        for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
        return n;
      }
      module.exports = _arrayLikeToArray, module.exports.__esModule = true, module.exports["default"] = module.exports;
    }
  });

  // node_modules/@babel/runtime/helpers/unsupportedIterableToArray.js
  var require_unsupportedIterableToArray = __commonJS({
    "node_modules/@babel/runtime/helpers/unsupportedIterableToArray.js"(exports8, module) {
      init_dirname();
      init_buffer2();
      init_process2();
      var arrayLikeToArray = require_arrayLikeToArray();
      function _unsupportedIterableToArray(r, a) {
        if (r) {
          if ("string" == typeof r) return arrayLikeToArray(r, a);
          var t = {}.toString.call(r).slice(8, -1);
          return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? arrayLikeToArray(r, a) : void 0;
        }
      }
      module.exports = _unsupportedIterableToArray, module.exports.__esModule = true, module.exports["default"] = module.exports;
    }
  });

  // node_modules/@babel/runtime/helpers/nonIterableRest.js
  var require_nonIterableRest = __commonJS({
    "node_modules/@babel/runtime/helpers/nonIterableRest.js"(exports8, module) {
      init_dirname();
      init_buffer2();
      init_process2();
      function _nonIterableRest() {
        throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
      }
      module.exports = _nonIterableRest, module.exports.__esModule = true, module.exports["default"] = module.exports;
    }
  });

  // node_modules/@babel/runtime/helpers/slicedToArray.js
  var require_slicedToArray = __commonJS({
    "node_modules/@babel/runtime/helpers/slicedToArray.js"(exports8, module) {
      init_dirname();
      init_buffer2();
      init_process2();
      var arrayWithHoles = require_arrayWithHoles();
      var iterableToArrayLimit = require_iterableToArrayLimit();
      var unsupportedIterableToArray = require_unsupportedIterableToArray();
      var nonIterableRest = require_nonIterableRest();
      function _slicedToArray(r, e) {
        return arrayWithHoles(r) || iterableToArrayLimit(r, e) || unsupportedIterableToArray(r, e) || nonIterableRest();
      }
      module.exports = _slicedToArray, module.exports.__esModule = true, module.exports["default"] = module.exports;
    }
  });

  // node_modules/fast-unique-numbers/build/es5/bundle.js
  var require_bundle = __commonJS({
    "node_modules/fast-unique-numbers/build/es5/bundle.js"(exports8, module) {
      init_dirname();
      init_buffer2();
      init_process2();
      (function(global2, factory) {
        typeof exports8 === "object" && typeof module !== "undefined" ? factory(exports8) : typeof define === "function" && define.amd ? define(["exports"], factory) : (global2 = typeof globalThis !== "undefined" ? globalThis : global2 || self, factory(global2.fastUniqueNumbers = {}));
      })(exports8, function(exports9) {
        "use strict";
        var createAddUniqueNumber = function createAddUniqueNumber2(generateUniqueNumber2) {
          return function(set) {
            var number = generateUniqueNumber2(set);
            set.add(number);
            return number;
          };
        };
        var createCache = function createCache2(lastNumberWeakMap) {
          return function(collection, nextNumber) {
            lastNumberWeakMap.set(collection, nextNumber);
            return nextNumber;
          };
        };
        var MAX_SAFE_INTEGER = Number.MAX_SAFE_INTEGER === void 0 ? 9007199254740991 : Number.MAX_SAFE_INTEGER;
        var TWO_TO_THE_POWER_OF_TWENTY_NINE = 536870912;
        var TWO_TO_THE_POWER_OF_THIRTY = TWO_TO_THE_POWER_OF_TWENTY_NINE * 2;
        var createGenerateUniqueNumber = function createGenerateUniqueNumber2(cache2, lastNumberWeakMap) {
          return function(collection) {
            var lastNumber = lastNumberWeakMap.get(collection);
            var nextNumber = lastNumber === void 0 ? collection.size : lastNumber < TWO_TO_THE_POWER_OF_THIRTY ? lastNumber + 1 : 0;
            if (!collection.has(nextNumber)) {
              return cache2(collection, nextNumber);
            }
            if (collection.size < TWO_TO_THE_POWER_OF_TWENTY_NINE) {
              while (collection.has(nextNumber)) {
                nextNumber = Math.floor(Math.random() * TWO_TO_THE_POWER_OF_THIRTY);
              }
              return cache2(collection, nextNumber);
            }
            if (collection.size > MAX_SAFE_INTEGER) {
              throw new Error("Congratulations, you created a collection of unique numbers which uses all available integers!");
            }
            while (collection.has(nextNumber)) {
              nextNumber = Math.floor(Math.random() * MAX_SAFE_INTEGER);
            }
            return cache2(collection, nextNumber);
          };
        };
        var LAST_NUMBER_WEAK_MAP = /* @__PURE__ */ new WeakMap();
        var cache = createCache(LAST_NUMBER_WEAK_MAP);
        var generateUniqueNumber = createGenerateUniqueNumber(cache, LAST_NUMBER_WEAK_MAP);
        var addUniqueNumber = createAddUniqueNumber(generateUniqueNumber);
        exports9.addUniqueNumber = addUniqueNumber;
        exports9.generateUniqueNumber = generateUniqueNumber;
      });
    }
  });

  // node_modules/@babel/runtime/helpers/asyncToGenerator.js
  var require_asyncToGenerator = __commonJS({
    "node_modules/@babel/runtime/helpers/asyncToGenerator.js"(exports8, module) {
      init_dirname();
      init_buffer2();
      init_process2();
      function asyncGeneratorStep(n, t, e, r, o, a, c) {
        try {
          var i = n[a](c), u = i.value;
        } catch (n2) {
          return void e(n2);
        }
        i.done ? t(u) : Promise.resolve(u).then(r, o);
      }
      function _asyncToGenerator(n) {
        return function() {
          var t = this, e = arguments;
          return new Promise(function(r, o) {
            var a = n.apply(t, e);
            function _next(n2) {
              asyncGeneratorStep(a, r, o, _next, _throw, "next", n2);
            }
            function _throw(n2) {
              asyncGeneratorStep(a, r, o, _next, _throw, "throw", n2);
            }
            _next(void 0);
          });
        };
      }
      module.exports = _asyncToGenerator, module.exports.__esModule = true, module.exports["default"] = module.exports;
    }
  });

  // node_modules/@babel/runtime/helpers/OverloadYield.js
  var require_OverloadYield = __commonJS({
    "node_modules/@babel/runtime/helpers/OverloadYield.js"(exports8, module) {
      init_dirname();
      init_buffer2();
      init_process2();
      function _OverloadYield(e, d) {
        this.v = e, this.k = d;
      }
      module.exports = _OverloadYield, module.exports.__esModule = true, module.exports["default"] = module.exports;
    }
  });

  // node_modules/@babel/runtime/helpers/regeneratorDefine.js
  var require_regeneratorDefine = __commonJS({
    "node_modules/@babel/runtime/helpers/regeneratorDefine.js"(exports8, module) {
      init_dirname();
      init_buffer2();
      init_process2();
      function _regeneratorDefine(e, r, n, t) {
        var i = Object.defineProperty;
        try {
          i({}, "", {});
        } catch (e2) {
          i = 0;
        }
        module.exports = _regeneratorDefine = function regeneratorDefine(e2, r2, n2, t2) {
          function o(r3, n3) {
            _regeneratorDefine(e2, r3, function(e3) {
              return this._invoke(r3, n3, e3);
            });
          }
          r2 ? i ? i(e2, r2, {
            value: n2,
            enumerable: !t2,
            configurable: !t2,
            writable: !t2
          }) : e2[r2] = n2 : (o("next", 0), o("throw", 1), o("return", 2));
        }, module.exports.__esModule = true, module.exports["default"] = module.exports, _regeneratorDefine(e, r, n, t);
      }
      module.exports = _regeneratorDefine, module.exports.__esModule = true, module.exports["default"] = module.exports;
    }
  });

  // node_modules/@babel/runtime/helpers/regenerator.js
  var require_regenerator = __commonJS({
    "node_modules/@babel/runtime/helpers/regenerator.js"(exports8, module) {
      init_dirname();
      init_buffer2();
      init_process2();
      var regeneratorDefine = require_regeneratorDefine();
      function _regenerator() {
        var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag";
        function i(r2, n2, o2, i2) {
          var c2 = n2 && n2.prototype instanceof Generator ? n2 : Generator, u2 = Object.create(c2.prototype);
          return regeneratorDefine(u2, "_invoke", function(r3, n3, o3) {
            var i3, c3, u3, f2 = 0, p = o3 || [], y = false, G = {
              p: 0,
              n: 0,
              v: e,
              a: d,
              f: d.bind(e, 4),
              d: function d2(t2, r4) {
                return i3 = t2, c3 = 0, u3 = e, G.n = r4, a;
              }
            };
            function d(r4, n4) {
              for (c3 = r4, u3 = n4, t = 0; !y && f2 && !o4 && t < p.length; t++) {
                var o4, i4 = p[t], d2 = G.p, l = i4[2];
                r4 > 3 ? (o4 = l === n4) && (u3 = i4[(c3 = i4[4]) ? 5 : (c3 = 3, 3)], i4[4] = i4[5] = e) : i4[0] <= d2 && ((o4 = r4 < 2 && d2 < i4[1]) ? (c3 = 0, G.v = n4, G.n = i4[1]) : d2 < l && (o4 = r4 < 3 || i4[0] > n4 || n4 > l) && (i4[4] = r4, i4[5] = n4, G.n = l, c3 = 0));
              }
              if (o4 || r4 > 1) return a;
              throw y = true, n4;
            }
            return function(o4, p2, l) {
              if (f2 > 1) throw TypeError("Generator is already running");
              for (y && 1 === p2 && d(p2, l), c3 = p2, u3 = l; (t = c3 < 2 ? e : u3) || !y; ) {
                i3 || (c3 ? c3 < 3 ? (c3 > 1 && (G.n = -1), d(c3, u3)) : G.n = u3 : G.v = u3);
                try {
                  if (f2 = 2, i3) {
                    if (c3 || (o4 = "next"), t = i3[o4]) {
                      if (!(t = t.call(i3, u3))) throw TypeError("iterator result is not an object");
                      if (!t.done) return t;
                      u3 = t.value, c3 < 2 && (c3 = 0);
                    } else 1 === c3 && (t = i3["return"]) && t.call(i3), c3 < 2 && (u3 = TypeError("The iterator does not provide a '" + o4 + "' method"), c3 = 1);
                    i3 = e;
                  } else if ((t = (y = G.n < 0) ? u3 : r3.call(n3, G)) !== a) break;
                } catch (t2) {
                  i3 = e, c3 = 1, u3 = t2;
                } finally {
                  f2 = 1;
                }
              }
              return {
                value: t,
                done: y
              };
            };
          }(r2, o2, i2), true), u2;
        }
        var a = {};
        function Generator() {
        }
        function GeneratorFunction() {
        }
        function GeneratorFunctionPrototype() {
        }
        t = Object.getPrototypeOf;
        var c = [][n] ? t(t([][n]())) : (regeneratorDefine(t = {}, n, function() {
          return this;
        }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c);
        function f(e2) {
          return Object.setPrototypeOf ? Object.setPrototypeOf(e2, GeneratorFunctionPrototype) : (e2.__proto__ = GeneratorFunctionPrototype, regeneratorDefine(e2, o, "GeneratorFunction")), e2.prototype = Object.create(u), e2;
        }
        return GeneratorFunction.prototype = GeneratorFunctionPrototype, regeneratorDefine(u, "constructor", GeneratorFunctionPrototype), regeneratorDefine(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", regeneratorDefine(GeneratorFunctionPrototype, o, "GeneratorFunction"), regeneratorDefine(u), regeneratorDefine(u, o, "Generator"), regeneratorDefine(u, n, function() {
          return this;
        }), regeneratorDefine(u, "toString", function() {
          return "[object Generator]";
        }), (module.exports = _regenerator = function _regenerator2() {
          return {
            w: i,
            m: f
          };
        }, module.exports.__esModule = true, module.exports["default"] = module.exports)();
      }
      module.exports = _regenerator, module.exports.__esModule = true, module.exports["default"] = module.exports;
    }
  });

  // node_modules/@babel/runtime/helpers/regeneratorAsyncIterator.js
  var require_regeneratorAsyncIterator = __commonJS({
    "node_modules/@babel/runtime/helpers/regeneratorAsyncIterator.js"(exports8, module) {
      init_dirname();
      init_buffer2();
      init_process2();
      var OverloadYield = require_OverloadYield();
      var regeneratorDefine = require_regeneratorDefine();
      function AsyncIterator(t, e) {
        function n(r2, o, i, f) {
          try {
            var c = t[r2](o), u = c.value;
            return u instanceof OverloadYield ? e.resolve(u.v).then(function(t2) {
              n("next", t2, i, f);
            }, function(t2) {
              n("throw", t2, i, f);
            }) : e.resolve(u).then(function(t2) {
              c.value = t2, i(c);
            }, function(t2) {
              return n("throw", t2, i, f);
            });
          } catch (t2) {
            f(t2);
          }
        }
        var r;
        this.next || (regeneratorDefine(AsyncIterator.prototype), regeneratorDefine(AsyncIterator.prototype, "function" == typeof Symbol && Symbol.asyncIterator || "@asyncIterator", function() {
          return this;
        })), regeneratorDefine(this, "_invoke", function(t2, o, i) {
          function f() {
            return new e(function(e2, r2) {
              n(t2, i, e2, r2);
            });
          }
          return r = r ? r.then(f, f) : f();
        }, true);
      }
      module.exports = AsyncIterator, module.exports.__esModule = true, module.exports["default"] = module.exports;
    }
  });

  // node_modules/@babel/runtime/helpers/regeneratorAsyncGen.js
  var require_regeneratorAsyncGen = __commonJS({
    "node_modules/@babel/runtime/helpers/regeneratorAsyncGen.js"(exports8, module) {
      init_dirname();
      init_buffer2();
      init_process2();
      var regenerator = require_regenerator();
      var regeneratorAsyncIterator = require_regeneratorAsyncIterator();
      function _regeneratorAsyncGen(r, e, t, o, n) {
        return new regeneratorAsyncIterator(regenerator().w(r, e, t, o), n || Promise);
      }
      module.exports = _regeneratorAsyncGen, module.exports.__esModule = true, module.exports["default"] = module.exports;
    }
  });

  // node_modules/@babel/runtime/helpers/regeneratorAsync.js
  var require_regeneratorAsync = __commonJS({
    "node_modules/@babel/runtime/helpers/regeneratorAsync.js"(exports8, module) {
      init_dirname();
      init_buffer2();
      init_process2();
      var regeneratorAsyncGen = require_regeneratorAsyncGen();
      function _regeneratorAsync(n, e, r, t, o) {
        var a = regeneratorAsyncGen(n, e, r, t, o);
        return a.next().then(function(n2) {
          return n2.done ? n2.value : a.next();
        });
      }
      module.exports = _regeneratorAsync, module.exports.__esModule = true, module.exports["default"] = module.exports;
    }
  });

  // node_modules/@babel/runtime/helpers/regeneratorKeys.js
  var require_regeneratorKeys = __commonJS({
    "node_modules/@babel/runtime/helpers/regeneratorKeys.js"(exports8, module) {
      init_dirname();
      init_buffer2();
      init_process2();
      function _regeneratorKeys(e) {
        var n = Object(e), r = [];
        for (var t in n) r.unshift(t);
        return function e2() {
          for (; r.length; ) if ((t = r.pop()) in n) return e2.value = t, e2.done = false, e2;
          return e2.done = true, e2;
        };
      }
      module.exports = _regeneratorKeys, module.exports.__esModule = true, module.exports["default"] = module.exports;
    }
  });

  // node_modules/@babel/runtime/helpers/regeneratorValues.js
  var require_regeneratorValues = __commonJS({
    "node_modules/@babel/runtime/helpers/regeneratorValues.js"(exports8, module) {
      init_dirname();
      init_buffer2();
      init_process2();
      var _typeof = require_typeof()["default"];
      function _regeneratorValues(e) {
        if (null != e) {
          var t = e["function" == typeof Symbol && Symbol.iterator || "@@iterator"], r = 0;
          if (t) return t.call(e);
          if ("function" == typeof e.next) return e;
          if (!isNaN(e.length)) return {
            next: function next() {
              return e && r >= e.length && (e = void 0), {
                value: e && e[r++],
                done: !e
              };
            }
          };
        }
        throw new TypeError(_typeof(e) + " is not iterable");
      }
      module.exports = _regeneratorValues, module.exports.__esModule = true, module.exports["default"] = module.exports;
    }
  });

  // node_modules/@babel/runtime/helpers/regeneratorRuntime.js
  var require_regeneratorRuntime = __commonJS({
    "node_modules/@babel/runtime/helpers/regeneratorRuntime.js"(exports8, module) {
      init_dirname();
      init_buffer2();
      init_process2();
      var OverloadYield = require_OverloadYield();
      var regenerator = require_regenerator();
      var regeneratorAsync = require_regeneratorAsync();
      var regeneratorAsyncGen = require_regeneratorAsyncGen();
      var regeneratorAsyncIterator = require_regeneratorAsyncIterator();
      var regeneratorKeys = require_regeneratorKeys();
      var regeneratorValues = require_regeneratorValues();
      function _regeneratorRuntime() {
        "use strict";
        var r = regenerator(), e = r.m(_regeneratorRuntime), t = (Object.getPrototypeOf ? Object.getPrototypeOf(e) : e.__proto__).constructor;
        function n(r2) {
          var e2 = "function" == typeof r2 && r2.constructor;
          return !!e2 && (e2 === t || "GeneratorFunction" === (e2.displayName || e2.name));
        }
        var o = {
          "throw": 1,
          "return": 2,
          "break": 3,
          "continue": 3
        };
        function a(r2) {
          var e2, t2;
          return function(n2) {
            e2 || (e2 = {
              stop: function stop() {
                return t2(n2.a, 2);
              },
              "catch": function _catch() {
                return n2.v;
              },
              abrupt: function abrupt(r3, e3) {
                return t2(n2.a, o[r3], e3);
              },
              delegateYield: function delegateYield(r3, o2, a2) {
                return e2.resultName = o2, t2(n2.d, regeneratorValues(r3), a2);
              },
              finish: function finish(r3) {
                return t2(n2.f, r3);
              }
            }, t2 = function t3(r3, _t, o2) {
              n2.p = e2.prev, n2.n = e2.next;
              try {
                return r3(_t, o2);
              } finally {
                e2.next = n2.n;
              }
            }), e2.resultName && (e2[e2.resultName] = n2.v, e2.resultName = void 0), e2.sent = n2.v, e2.next = n2.n;
            try {
              return r2.call(this, e2);
            } finally {
              n2.p = e2.prev, n2.n = e2.next;
            }
          };
        }
        return (module.exports = _regeneratorRuntime = function _regeneratorRuntime2() {
          return {
            wrap: function wrap(e2, t2, n2, o2) {
              return r.w(a(e2), t2, n2, o2 && o2.reverse());
            },
            isGeneratorFunction: n,
            mark: r.m,
            awrap: function awrap(r2, e2) {
              return new OverloadYield(r2, e2);
            },
            AsyncIterator: regeneratorAsyncIterator,
            async: function async(r2, e2, t2, o2, u) {
              return (n(e2) ? regeneratorAsyncGen : regeneratorAsync)(a(r2), e2, t2, o2, u);
            },
            keys: regeneratorKeys,
            values: regeneratorValues
          };
        }, module.exports.__esModule = true, module.exports["default"] = module.exports)();
      }
      module.exports = _regeneratorRuntime, module.exports.__esModule = true, module.exports["default"] = module.exports;
    }
  });

  // node_modules/@babel/runtime/regenerator/index.js
  var require_regenerator2 = __commonJS({
    "node_modules/@babel/runtime/regenerator/index.js"(exports8, module) {
      init_dirname();
      init_buffer2();
      init_process2();
      var runtime = require_regeneratorRuntime()();
      module.exports = runtime;
      try {
        regeneratorRuntime = runtime;
      } catch (accidentalStrictMode) {
        if (typeof globalThis === "object") {
          globalThis.regeneratorRuntime = runtime;
        } else {
          Function("r", "regeneratorRuntime = r")(runtime);
        }
      }
    }
  });

  // node_modules/broker-factory/build/es5/bundle.js
  var require_bundle2 = __commonJS({
    "node_modules/broker-factory/build/es5/bundle.js"(exports8, module) {
      init_dirname();
      init_buffer2();
      init_process2();
      (function(global2, factory) {
        typeof exports8 === "object" && typeof module !== "undefined" ? factory(exports8, require_defineProperty(), require_slicedToArray(), require_bundle(), require_asyncToGenerator(), require_regenerator2()) : typeof define === "function" && define.amd ? define(["exports", "@babel/runtime/helpers/defineProperty", "@babel/runtime/helpers/slicedToArray", "fast-unique-numbers", "@babel/runtime/helpers/asyncToGenerator", "@babel/runtime/regenerator"], factory) : (global2 = typeof globalThis !== "undefined" ? globalThis : global2 || self, factory(global2.brokerFactory = {}, global2._defineProperty, global2._slicedToArray, global2.fastUniqueNumbers, global2._asyncToGenerator, global2._regeneratorRuntime));
      })(exports8, function(exports9, _defineProperty, _slicedToArray, fastUniqueNumbers, _asyncToGenerator, _regeneratorRuntime) {
        "use strict";
        var isMessagePort = function isMessagePort2(sender) {
          return typeof sender.start === "function";
        };
        var PORT_MAP = /* @__PURE__ */ new WeakMap();
        function ownKeys$1(e, r) {
          var t = Object.keys(e);
          if (Object.getOwnPropertySymbols) {
            var o = Object.getOwnPropertySymbols(e);
            r && (o = o.filter(function(r2) {
              return Object.getOwnPropertyDescriptor(e, r2).enumerable;
            })), t.push.apply(t, o);
          }
          return t;
        }
        function _objectSpread$1(e) {
          for (var r = 1; r < arguments.length; r++) {
            var t = null != arguments[r] ? arguments[r] : {};
            r % 2 ? ownKeys$1(Object(t), true).forEach(function(r2) {
              _defineProperty(e, r2, t[r2]);
            }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$1(Object(t)).forEach(function(r2) {
              Object.defineProperty(e, r2, Object.getOwnPropertyDescriptor(t, r2));
            });
          }
          return e;
        }
        var extendBrokerImplementation = function extendBrokerImplementation2(partialBrokerImplementation) {
          return _objectSpread$1(_objectSpread$1({}, partialBrokerImplementation), {}, {
            connect: function connect(_ref) {
              var call = _ref.call;
              return /* @__PURE__ */ _asyncToGenerator(/* @__PURE__ */ _regeneratorRuntime.mark(function _callee() {
                var _MessageChannel, port1, port2, portId;
                return _regeneratorRuntime.wrap(function(_context) {
                  while (1) switch (_context.prev = _context.next) {
                    case 0:
                      _MessageChannel = new MessageChannel(), port1 = _MessageChannel.port1, port2 = _MessageChannel.port2;
                      _context.next = 1;
                      return call("connect", {
                        port: port1
                      }, [port1]);
                    case 1:
                      portId = _context.sent;
                      PORT_MAP.set(port2, portId);
                      return _context.abrupt("return", port2);
                    case 2:
                    case "end":
                      return _context.stop();
                  }
                }, _callee);
              }));
            },
            disconnect: function disconnect(_ref3) {
              var call = _ref3.call;
              return /* @__PURE__ */ function() {
                var _ref4 = _asyncToGenerator(/* @__PURE__ */ _regeneratorRuntime.mark(function _callee2(port) {
                  var portId;
                  return _regeneratorRuntime.wrap(function(_context2) {
                    while (1) switch (_context2.prev = _context2.next) {
                      case 0:
                        portId = PORT_MAP.get(port);
                        if (!(portId === void 0)) {
                          _context2.next = 1;
                          break;
                        }
                        throw new Error("The given port is not connected.");
                      case 1:
                        _context2.next = 2;
                        return call("disconnect", {
                          portId
                        });
                      case 2:
                      case "end":
                        return _context2.stop();
                    }
                  }, _callee2);
                }));
                return function(_x) {
                  return _ref4.apply(this, arguments);
                };
              }();
            },
            isSupported: function isSupported(_ref5) {
              var call = _ref5.call;
              return function() {
                return call("isSupported");
              };
            }
          });
        };
        function ownKeys(e, r) {
          var t = Object.keys(e);
          if (Object.getOwnPropertySymbols) {
            var o = Object.getOwnPropertySymbols(e);
            r && (o = o.filter(function(r2) {
              return Object.getOwnPropertyDescriptor(e, r2).enumerable;
            })), t.push.apply(t, o);
          }
          return t;
        }
        function _objectSpread(e) {
          for (var r = 1; r < arguments.length; r++) {
            var t = null != arguments[r] ? arguments[r] : {};
            r % 2 ? ownKeys(Object(t), true).forEach(function(r2) {
              _defineProperty(e, r2, t[r2]);
            }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function(r2) {
              Object.defineProperty(e, r2, Object.getOwnPropertyDescriptor(t, r2));
            });
          }
          return e;
        }
        var ONGOING_REQUESTS = /* @__PURE__ */ new WeakMap();
        var createOrGetOngoingRequests = function createOrGetOngoingRequests2(sender) {
          if (ONGOING_REQUESTS.has(sender)) {
            return ONGOING_REQUESTS.get(sender);
          }
          var ongoingRequests = /* @__PURE__ */ new Map();
          ONGOING_REQUESTS.set(sender, ongoingRequests);
          return ongoingRequests;
        };
        var createBroker = function createBroker2(brokerImplementation) {
          var fullBrokerImplementation = extendBrokerImplementation(brokerImplementation);
          return function(sender) {
            var ongoingRequests = createOrGetOngoingRequests(sender);
            sender.addEventListener("message", function(_ref) {
              var message = _ref.data;
              var id = message.id;
              if (id !== null && ongoingRequests.has(id)) {
                var _ongoingRequests$get = ongoingRequests.get(id), reject = _ongoingRequests$get.reject, resolve2 = _ongoingRequests$get.resolve;
                ongoingRequests["delete"](id);
                if (message.error === void 0) {
                  resolve2(message.result);
                } else {
                  reject(new Error(message.error.message));
                }
              }
            });
            if (isMessagePort(sender)) {
              sender.start();
            }
            var call = function call2(method) {
              var params = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : null;
              var transferables = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : [];
              return new Promise(function(resolve2, reject) {
                var id = fastUniqueNumbers.generateUniqueNumber(ongoingRequests);
                ongoingRequests.set(id, {
                  reject,
                  resolve: resolve2
                });
                if (params === null) {
                  sender.postMessage({
                    id,
                    method
                  }, transferables);
                } else {
                  sender.postMessage({
                    id,
                    method,
                    params
                  }, transferables);
                }
              });
            };
            var notify = function notify2(method, params) {
              var transferables = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : [];
              sender.postMessage({
                id: null,
                method,
                params
              }, transferables);
            };
            var functions = {};
            for (var _i = 0, _Object$entries = Object.entries(fullBrokerImplementation); _i < _Object$entries.length; _i++) {
              var _Object$entries$_i = _slicedToArray(_Object$entries[_i], 2), key = _Object$entries$_i[0], handler = _Object$entries$_i[1];
              functions = _objectSpread(_objectSpread({}, functions), {}, _defineProperty({}, key, handler({
                call,
                notify
              })));
            }
            return _objectSpread({}, functions);
          };
        };
        exports9.createBroker = createBroker;
      });
    }
  });

  // node_modules/worker-timers-broker/build/es5/bundle.js
  var require_bundle3 = __commonJS({
    "node_modules/worker-timers-broker/build/es5/bundle.js"(exports8, module) {
      init_dirname();
      init_buffer2();
      init_process2();
      (function(global2, factory) {
        typeof exports8 === "object" && typeof module !== "undefined" ? factory(exports8, require_typeof(), require_bundle2(), require_bundle()) : typeof define === "function" && define.amd ? define(["exports", "@babel/runtime/helpers/typeof", "broker-factory", "fast-unique-numbers"], factory) : (global2 = typeof globalThis !== "undefined" ? globalThis : global2 || self, factory(global2.workerTimersBroker = {}, global2._typeof, global2.brokerFactory, global2.fastUniqueNumbers));
      })(exports8, function(exports9, _typeof, brokerFactory, fastUniqueNumbers) {
        "use strict";
        var scheduledIntervalsState = /* @__PURE__ */ new Map([[0, null]]);
        var scheduledTimeoutsState = /* @__PURE__ */ new Map([[0, null]]);
        var wrap = brokerFactory.createBroker({
          clearInterval: function clearInterval2(_ref) {
            var call = _ref.call;
            return function(timerId) {
              if (_typeof(scheduledIntervalsState.get(timerId)) === "symbol") {
                scheduledIntervalsState.set(timerId, null);
                call("clear", {
                  timerId,
                  timerType: "interval"
                }).then(function() {
                  scheduledIntervalsState["delete"](timerId);
                });
              }
            };
          },
          clearTimeout: function clearTimeout2(_ref2) {
            var call = _ref2.call;
            return function(timerId) {
              if (_typeof(scheduledTimeoutsState.get(timerId)) === "symbol") {
                scheduledTimeoutsState.set(timerId, null);
                call("clear", {
                  timerId,
                  timerType: "timeout"
                }).then(function() {
                  scheduledTimeoutsState["delete"](timerId);
                });
              }
            };
          },
          setInterval: function setInterval2(_ref3) {
            var call = _ref3.call;
            return function(func) {
              var delay = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
              for (var _len = arguments.length, args = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
                args[_key - 2] = arguments[_key];
              }
              var symbol = Symbol();
              var timerId = fastUniqueNumbers.generateUniqueNumber(scheduledIntervalsState);
              scheduledIntervalsState.set(timerId, symbol);
              var _schedule = function schedule() {
                return call("set", {
                  delay,
                  now: performance.timeOrigin + performance.now(),
                  timerId,
                  timerType: "interval"
                }).then(function() {
                  var state = scheduledIntervalsState.get(timerId);
                  if (state === void 0) {
                    throw new Error("The timer is in an undefined state.");
                  }
                  if (state === symbol) {
                    func.apply(void 0, args);
                    if (scheduledIntervalsState.get(timerId) === symbol) {
                      _schedule();
                    }
                  }
                });
              };
              _schedule();
              return timerId;
            };
          },
          setTimeout: function setTimeout2(_ref4) {
            var call = _ref4.call;
            return function(func) {
              var delay = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
              for (var _len2 = arguments.length, args = new Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
                args[_key2 - 2] = arguments[_key2];
              }
              var symbol = Symbol();
              var timerId = fastUniqueNumbers.generateUniqueNumber(scheduledTimeoutsState);
              scheduledTimeoutsState.set(timerId, symbol);
              call("set", {
                delay,
                now: performance.timeOrigin + performance.now(),
                timerId,
                timerType: "timeout"
              }).then(function() {
                var state = scheduledTimeoutsState.get(timerId);
                if (state === void 0) {
                  throw new Error("The timer is in an undefined state.");
                }
                if (state === symbol) {
                  scheduledTimeoutsState["delete"](timerId);
                  func.apply(void 0, args);
                }
              });
              return timerId;
            };
          }
        });
        var load = function load2(url) {
          var worker = new Worker(url);
          return wrap(worker);
        };
        exports9.load = load;
        exports9.wrap = wrap;
      });
    }
  });

  // node_modules/worker-timers/build/es5/bundle.js
  var require_bundle4 = __commonJS({
    "node_modules/worker-timers/build/es5/bundle.js"(exports8, module) {
      init_dirname();
      init_buffer2();
      init_process2();
      (function(global2, factory) {
        typeof exports8 === "object" && typeof module !== "undefined" ? factory(exports8, require_bundle3()) : typeof define === "function" && define.amd ? define(["exports", "worker-timers-broker"], factory) : (global2 = typeof globalThis !== "undefined" ? globalThis : global2 || self, factory(global2.workerTimers = {}, global2.workerTimersBroker));
      })(exports8, function(exports9, workerTimersBroker) {
        "use strict";
        var createLoadOrReturnBroker = function createLoadOrReturnBroker2(loadBroker, worker2) {
          var broker = null;
          return function() {
            if (broker !== null) {
              return broker;
            }
            var blob = new Blob([worker2], {
              type: "application/javascript; charset=utf-8"
            });
            var url = URL.createObjectURL(blob);
            broker = loadBroker(url);
            setTimeout(function() {
              return URL.revokeObjectURL(url);
            });
            return broker;
          };
        };
        var worker = `(()=>{var e={45:(e,t,r)=>{var n=r(738).default;e.exports=function(e,t){if("object"!=n(e)||!e)return e;var r=e[Symbol.toPrimitive];if(void 0!==r){var o=r.call(e,t||"default");if("object"!=n(o))return o;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===t?String:Number)(e)},e.exports.__esModule=!0,e.exports.default=e.exports},79:e=>{e.exports=function(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=Array(t);r<t;r++)n[r]=e[r];return n},e.exports.__esModule=!0,e.exports.default=e.exports},122:(e,t,r)=>{var n=r(79);e.exports=function(e,t){if(e){if("string"==typeof e)return n(e,t);var r={}.toString.call(e).slice(8,-1);return"Object"===r&&e.constructor&&(r=e.constructor.name),"Map"===r||"Set"===r?Array.from(e):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?n(e,t):void 0}},e.exports.__esModule=!0,e.exports.default=e.exports},156:e=>{e.exports=function(e,t){var r=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=r){var n,o,u,a,i=[],s=!0,c=!1;try{if(u=(r=r.call(e)).next,0===t){if(Object(r)!==r)return;s=!1}else for(;!(s=(n=u.call(r)).done)&&(i.push(n.value),i.length!==t);s=!0);}catch(e){c=!0,o=e}finally{try{if(!s&&null!=r.return&&(a=r.return(),Object(a)!==a))return}finally{if(c)throw o}}return i}},e.exports.__esModule=!0,e.exports.default=e.exports},172:e=>{e.exports=function(e,t){this.v=e,this.k=t},e.exports.__esModule=!0,e.exports.default=e.exports},293:e=>{function t(e,t,r,n,o,u,a){try{var i=e[u](a),s=i.value}catch(e){return void r(e)}i.done?t(s):Promise.resolve(s).then(n,o)}e.exports=function(e){return function(){var r=this,n=arguments;return new Promise((function(o,u){var a=e.apply(r,n);function i(e){t(a,o,u,i,s,"next",e)}function s(e){t(a,o,u,i,s,"throw",e)}i(void 0)}))}},e.exports.__esModule=!0,e.exports.default=e.exports},373:e=>{e.exports=function(e){var t=Object(e),r=[];for(var n in t)r.unshift(n);return function e(){for(;r.length;)if((n=r.pop())in t)return e.value=n,e.done=!1,e;return e.done=!0,e}},e.exports.__esModule=!0,e.exports.default=e.exports},389:function(e,t){!function(e){"use strict";var t=function(e){return function(t){var r=e(t);return t.add(r),r}},r=function(e){return function(t,r){return e.set(t,r),r}},n=void 0===Number.MAX_SAFE_INTEGER?9007199254740991:Number.MAX_SAFE_INTEGER,o=536870912,u=2*o,a=function(e,t){return function(r){var a=t.get(r),i=void 0===a?r.size:a<u?a+1:0;if(!r.has(i))return e(r,i);if(r.size<o){for(;r.has(i);)i=Math.floor(Math.random()*u);return e(r,i)}if(r.size>n)throw new Error("Congratulations, you created a collection of unique numbers which uses all available integers!");for(;r.has(i);)i=Math.floor(Math.random()*n);return e(r,i)}},i=new WeakMap,s=r(i),c=a(s,i),f=t(c);e.addUniqueNumber=f,e.generateUniqueNumber=c}(t)},472:function(e,t,r){!function(e,t,r,n){"use strict";var o=function(e,t){return function(r){var o=t.get(r);if(void 0===o)return Promise.resolve(!1);var u=n(o,2),a=u[0],i=u[1];return e(a),t.delete(r),i(!1),Promise.resolve(!0)}},u=function(e,t){var r=function(n,o,u,a){var i=n-e.now();i>0?o.set(a,[t(r,i,n,o,u,a),u]):(o.delete(a),u(!0))};return r},a=function(e,t,r,n){return function(o,u,a){var i=o+u-t.timeOrigin,s=i-t.now();return new Promise((function(t){e.set(a,[r(n,s,i,e,t,a),t])}))}},i=new Map,s=o(globalThis.clearTimeout,i),c=new Map,f=o(globalThis.clearTimeout,c),l=u(performance,globalThis.setTimeout),p=a(i,performance,globalThis.setTimeout,l),d=a(c,performance,globalThis.setTimeout,l);r.createWorker(self,{clear:function(){var r=e(t.mark((function e(r){var n,o,u;return t.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=r.timerId,o=r.timerType,e.next=1,"interval"===o?s(n):f(n);case 1:return u=e.sent,e.abrupt("return",{result:u});case 2:case"end":return e.stop()}}),e)})));function n(e){return r.apply(this,arguments)}return n}(),set:function(){var r=e(t.mark((function e(r){var n,o,u,a,i;return t.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=r.delay,o=r.now,u=r.timerId,a=r.timerType,e.next=1,("interval"===a?p:d)(n,o,u);case 1:return i=e.sent,e.abrupt("return",{result:i});case 2:case"end":return e.stop()}}),e)})));function n(e){return r.apply(this,arguments)}return n}()})}(r(293),r(756),r(623),r(715))},546:e=>{function t(r,n,o,u){var a=Object.defineProperty;try{a({},"",{})}catch(r){a=0}e.exports=t=function(e,r,n,o){if(r)a?a(e,r,{value:n,enumerable:!o,configurable:!o,writable:!o}):e[r]=n;else{var u=function(r,n){t(e,r,(function(e){return this._invoke(r,n,e)}))};u("next",0),u("throw",1),u("return",2)}},e.exports.__esModule=!0,e.exports.default=e.exports,t(r,n,o,u)}e.exports=t,e.exports.__esModule=!0,e.exports.default=e.exports},579:(e,t,r)=>{var n=r(738).default;e.exports=function(e){if(null!=e){var t=e["function"==typeof Symbol&&Symbol.iterator||"@@iterator"],r=0;if(t)return t.call(e);if("function"==typeof e.next)return e;if(!isNaN(e.length))return{next:function(){return e&&r>=e.length&&(e=void 0),{value:e&&e[r++],done:!e}}}}throw new TypeError(n(e)+" is not iterable")},e.exports.__esModule=!0,e.exports.default=e.exports},623:function(e,t,r){!function(e,t,r,n,o){"use strict";var u={INTERNAL_ERROR:-32603,INVALID_PARAMS:-32602,METHOD_NOT_FOUND:-32601},a=function(e,t){return Object.assign(new Error(e),{status:t})},i=function(e){return a('The requested method called "'.concat(e,'" is not supported.'),u.METHOD_NOT_FOUND)},s=function(e){return a('The handler of the method called "'.concat(e,'" returned no required result.'),u.INTERNAL_ERROR)},c=function(e){return a('The handler of the method called "'.concat(e,'" returned an unexpected result.'),u.INTERNAL_ERROR)},f=function(e){return a('The specified parameter called "portId" with the given value "'.concat(e,'" does not identify a port connected to this worker.'),u.INVALID_PARAMS)},l=function(e,n){return function(){var o=t(r.mark((function t(o){var u,a,f,l,p,d,v,x,y,b,h,m,_,g,w;return r.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(u=o.data,a=u.id,f=u.method,l=u.params,p=n[f],t.prev=1,void 0!==p){t.next=2;break}throw i(f);case 2:if(void 0!==(d=void 0===l?p():p(l))){t.next=3;break}throw s(f);case 3:if(!(d instanceof Promise)){t.next=5;break}return t.next=4,d;case 4:g=t.sent,t.next=6;break;case 5:g=d;case 6:if(v=g,null!==a){t.next=8;break}if(void 0===v.result){t.next=7;break}throw c(f);case 7:t.next=10;break;case 8:if(void 0!==v.result){t.next=9;break}throw c(f);case 9:x=v.result,y=v.transferables,b=void 0===y?[]:y,e.postMessage({id:a,result:x},b);case 10:t.next=12;break;case 11:t.prev=11,w=t.catch(1),h=w.message,m=w.status,_=void 0===m?-32603:m,e.postMessage({error:{code:_,message:h},id:a});case 12:case"end":return t.stop()}}),t,null,[[1,11]])})));return function(e){return o.apply(this,arguments)}}()},p=function(){return new Promise((function(e){var t=new ArrayBuffer(0),r=new MessageChannel,n=r.port1,o=r.port2;n.onmessage=function(t){var r=t.data;return e(null!==r)},o.postMessage(t,[t])}))};function d(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function v(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?d(Object(r),!0).forEach((function(t){n(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):d(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}var x=new Map,y=function(e,n,u){return v(v({},n),{},{connect:function(t){var r=t.port;r.start();var u=e(r,n),a=o.generateUniqueNumber(x);return x.set(a,(function(){u(),r.close(),x.delete(a)})),{result:a}},disconnect:function(e){var t=e.portId,r=x.get(t);if(void 0===r)throw f(t);return r(),{result:null}},isSupported:function(){var e=t(r.mark((function e(){var t,n,o;return r.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=1,p();case 1:if(!e.sent){e.next=5;break}if(!((t=u())instanceof Promise)){e.next=3;break}return e.next=2,t;case 2:o=e.sent,e.next=4;break;case 3:o=t;case 4:return n=o,e.abrupt("return",{result:n});case 5:return e.abrupt("return",{result:!1});case 6:case"end":return e.stop()}}),e)})));function n(){return e.apply(this,arguments)}return n}()})},b=function(e,t){var r=y(b,t,arguments.length>2&&void 0!==arguments[2]?arguments[2]:function(){return!0}),n=l(e,r);return e.addEventListener("message",n),function(){return e.removeEventListener("message",n)}};e.createWorker=b,e.isSupported=p}(t,r(293),r(756),r(693),r(389))},633:(e,t,r)=>{var n=r(172),o=r(993),u=r(869),a=r(887),i=r(791),s=r(373),c=r(579);function f(){"use strict";var t=o(),r=t.m(f),l=(Object.getPrototypeOf?Object.getPrototypeOf(r):r.__proto__).constructor;function p(e){var t="function"==typeof e&&e.constructor;return!!t&&(t===l||"GeneratorFunction"===(t.displayName||t.name))}var d={throw:1,return:2,break:3,continue:3};function v(e){var t,r;return function(n){t||(t={stop:function(){return r(n.a,2)},catch:function(){return n.v},abrupt:function(e,t){return r(n.a,d[e],t)},delegateYield:function(e,o,u){return t.resultName=o,r(n.d,c(e),u)},finish:function(e){return r(n.f,e)}},r=function(e,r,o){n.p=t.prev,n.n=t.next;try{return e(r,o)}finally{t.next=n.n}}),t.resultName&&(t[t.resultName]=n.v,t.resultName=void 0),t.sent=n.v,t.next=n.n;try{return e.call(this,t)}finally{n.p=t.prev,n.n=t.next}}}return(e.exports=f=function(){return{wrap:function(e,r,n,o){return t.w(v(e),r,n,o&&o.reverse())},isGeneratorFunction:p,mark:t.m,awrap:function(e,t){return new n(e,t)},AsyncIterator:i,async:function(e,t,r,n,o){return(p(t)?a:u)(v(e),t,r,n,o)},keys:s,values:c}},e.exports.__esModule=!0,e.exports.default=e.exports)()}e.exports=f,e.exports.__esModule=!0,e.exports.default=e.exports},693:(e,t,r)=>{var n=r(736);e.exports=function(e,t,r){return(t=n(t))in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e},e.exports.__esModule=!0,e.exports.default=e.exports},715:(e,t,r)=>{var n=r(987),o=r(156),u=r(122),a=r(752);e.exports=function(e,t){return n(e)||o(e,t)||u(e,t)||a()},e.exports.__esModule=!0,e.exports.default=e.exports},736:(e,t,r)=>{var n=r(738).default,o=r(45);e.exports=function(e){var t=o(e,"string");return"symbol"==n(t)?t:t+""},e.exports.__esModule=!0,e.exports.default=e.exports},738:e=>{function t(r){return e.exports=t="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},e.exports.__esModule=!0,e.exports.default=e.exports,t(r)}e.exports=t,e.exports.__esModule=!0,e.exports.default=e.exports},752:e=>{e.exports=function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")},e.exports.__esModule=!0,e.exports.default=e.exports},756:(e,t,r)=>{var n=r(633)();e.exports=n;try{regeneratorRuntime=n}catch(e){"object"==typeof globalThis?globalThis.regeneratorRuntime=n:Function("r","regeneratorRuntime = r")(n)}},791:(e,t,r)=>{var n=r(172),o=r(546);e.exports=function e(t,r){function u(e,o,a,i){try{var s=t[e](o),c=s.value;return c instanceof n?r.resolve(c.v).then((function(e){u("next",e,a,i)}),(function(e){u("throw",e,a,i)})):r.resolve(c).then((function(e){s.value=e,a(s)}),(function(e){return u("throw",e,a,i)}))}catch(e){i(e)}}var a;this.next||(o(e.prototype),o(e.prototype,"function"==typeof Symbol&&Symbol.asyncIterator||"@asyncIterator",(function(){return this}))),o(this,"_invoke",(function(e,t,n){function o(){return new r((function(t,r){u(e,n,t,r)}))}return a=a?a.then(o,o):o()}),!0)},e.exports.__esModule=!0,e.exports.default=e.exports},869:(e,t,r)=>{var n=r(887);e.exports=function(e,t,r,o,u){var a=n(e,t,r,o,u);return a.next().then((function(e){return e.done?e.value:a.next()}))},e.exports.__esModule=!0,e.exports.default=e.exports},887:(e,t,r)=>{var n=r(993),o=r(791);e.exports=function(e,t,r,u,a){return new o(n().w(e,t,r,u),a||Promise)},e.exports.__esModule=!0,e.exports.default=e.exports},987:e=>{e.exports=function(e){if(Array.isArray(e))return e},e.exports.__esModule=!0,e.exports.default=e.exports},993:(e,t,r)=>{var n=r(546);function o(){var t,r,u="function"==typeof Symbol?Symbol:{},a=u.iterator||"@@iterator",i=u.toStringTag||"@@toStringTag";function s(e,o,u,a){var i=o&&o.prototype instanceof f?o:f,s=Object.create(i.prototype);return n(s,"_invoke",function(e,n,o){var u,a,i,s=0,f=o||[],l=!1,p={p:0,n:0,v:t,a:d,f:d.bind(t,4),d:function(e,r){return u=e,a=0,i=t,p.n=r,c}};function d(e,n){for(a=e,i=n,r=0;!l&&s&&!o&&r<f.length;r++){var o,u=f[r],d=p.p,v=u[2];e>3?(o=v===n)&&(i=u[(a=u[4])?5:(a=3,3)],u[4]=u[5]=t):u[0]<=d&&((o=e<2&&d<u[1])?(a=0,p.v=n,p.n=u[1]):d<v&&(o=e<3||u[0]>n||n>v)&&(u[4]=e,u[5]=n,p.n=v,a=0))}if(o||e>1)return c;throw l=!0,n}return function(o,f,v){if(s>1)throw TypeError("Generator is already running");for(l&&1===f&&d(f,v),a=f,i=v;(r=a<2?t:i)||!l;){u||(a?a<3?(a>1&&(p.n=-1),d(a,i)):p.n=i:p.v=i);try{if(s=2,u){if(a||(o="next"),r=u[o]){if(!(r=r.call(u,i)))throw TypeError("iterator result is not an object");if(!r.done)return r;i=r.value,a<2&&(a=0)}else 1===a&&(r=u.return)&&r.call(u),a<2&&(i=TypeError("The iterator does not provide a '"+o+"' method"),a=1);u=t}else if((r=(l=p.n<0)?i:e.call(n,p))!==c)break}catch(e){u=t,a=1,i=e}finally{s=1}}return{value:r,done:l}}}(e,u,a),!0),s}var c={};function f(){}function l(){}function p(){}r=Object.getPrototypeOf;var d=[][a]?r(r([][a]())):(n(r={},a,(function(){return this})),r),v=p.prototype=f.prototype=Object.create(d);function x(e){return Object.setPrototypeOf?Object.setPrototypeOf(e,p):(e.__proto__=p,n(e,i,"GeneratorFunction")),e.prototype=Object.create(v),e}return l.prototype=p,n(v,"constructor",p),n(p,"constructor",l),l.displayName="GeneratorFunction",n(p,i,"GeneratorFunction"),n(v),n(v,i,"Generator"),n(v,a,(function(){return this})),n(v,"toString",(function(){return"[object Generator]"})),(e.exports=o=function(){return{w:s,m:x}},e.exports.__esModule=!0,e.exports.default=e.exports)()}e.exports=o,e.exports.__esModule=!0,e.exports.default=e.exports}},t={};function r(n){var o=t[n];if(void 0!==o)return o.exports;var u=t[n]={exports:{}};return e[n].call(u.exports,u,u.exports,r),u.exports}r.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return r.d(t,{a:t}),t},r.d=(e,t)=>{for(var n in t)r.o(t,n)&&!r.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})},r.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),(()=>{"use strict";r(472)})()})();`;
        var loadOrReturnBroker = createLoadOrReturnBroker(workerTimersBroker.load, worker);
        var clearInterval2 = function clearInterval3(timerId) {
          return loadOrReturnBroker().clearInterval(timerId);
        };
        var clearTimeout2 = function clearTimeout3(timerId) {
          return loadOrReturnBroker().clearTimeout(timerId);
        };
        var setInterval2 = function setInterval3() {
          var _loadOrReturnBroker;
          return (_loadOrReturnBroker = loadOrReturnBroker()).setInterval.apply(_loadOrReturnBroker, arguments);
        };
        var setTimeout$1 = function setTimeout2() {
          var _loadOrReturnBroker2;
          return (_loadOrReturnBroker2 = loadOrReturnBroker()).setTimeout.apply(_loadOrReturnBroker2, arguments);
        };
        exports9.clearInterval = clearInterval2;
        exports9.clearTimeout = clearTimeout2;
        exports9.setInterval = setInterval2;
        exports9.setTimeout = setTimeout$1;
      });
    }
  });

  // build/lib/is-browser.js
  var require_is_browser = __commonJS({
    "build/lib/is-browser.js"(exports8) {
      "use strict";
      init_dirname();
      init_buffer2();
      init_process2();
      Object.defineProperty(exports8, "__esModule", { value: true });
      exports8.isReactNativeBrowser = exports8.isWebWorker = void 0;
      var isStandardBrowserEnv = () => {
        if (typeof window !== "undefined") {
          const electronRenderCheck = typeof navigator !== "undefined" && navigator.userAgent?.toLowerCase().indexOf(" electron/") > -1;
          if (electronRenderCheck && process_exports?.versions) {
            const electronMainCheck = Object.prototype.hasOwnProperty.call(process_exports.versions, "electron");
            return !electronMainCheck;
          }
          return typeof window.document !== "undefined";
        }
        return false;
      };
      var isWebWorkerEnv = () => Boolean(typeof self === "object" && self?.constructor?.name?.includes("WorkerGlobalScope") && typeof Deno === "undefined");
      var isReactNativeEnv = () => typeof navigator !== "undefined" && navigator.product === "ReactNative";
      var isBrowser = isStandardBrowserEnv() || isWebWorkerEnv() || isReactNativeEnv();
      exports8.isWebWorker = isWebWorkerEnv();
      exports8.isReactNativeBrowser = isReactNativeEnv();
      exports8.default = isBrowser;
    }
  });

  // build/lib/get-timer.js
  var require_get_timer = __commonJS({
    "build/lib/get-timer.js"(exports8) {
      "use strict";
      init_dirname();
      init_buffer2();
      init_process2();
      var __createBinding = exports8 && exports8.__createBinding || (Object.create ? function(o, m, k, k2) {
        if (k2 === void 0) k2 = k;
        var desc = Object.getOwnPropertyDescriptor(m, k);
        if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
          desc = { enumerable: true, get: function() {
            return m[k];
          } };
        }
        Object.defineProperty(o, k2, desc);
      } : function(o, m, k, k2) {
        if (k2 === void 0) k2 = k;
        o[k2] = m[k];
      });
      var __setModuleDefault = exports8 && exports8.__setModuleDefault || (Object.create ? function(o, v) {
        Object.defineProperty(o, "default", { enumerable: true, value: v });
      } : function(o, v) {
        o["default"] = v;
      });
      var __importStar = exports8 && exports8.__importStar || /* @__PURE__ */ function() {
        var ownKeys = function(o) {
          ownKeys = Object.getOwnPropertyNames || function(o2) {
            var ar = [];
            for (var k in o2) if (Object.prototype.hasOwnProperty.call(o2, k)) ar[ar.length] = k;
            return ar;
          };
          return ownKeys(o);
        };
        return function(mod) {
          if (mod && mod.__esModule) return mod;
          var result = {};
          if (mod != null) {
            for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
          }
          __setModuleDefault(result, mod);
          return result;
        };
      }();
      Object.defineProperty(exports8, "__esModule", { value: true });
      var worker_timers_1 = require_bundle4();
      var is_browser_1 = __importStar(require_is_browser());
      var workerTimer = {
        set: worker_timers_1.setInterval,
        clear: worker_timers_1.clearInterval
      };
      var nativeTimer = {
        set: (func, time) => setInterval(func, time),
        clear: (timerId) => clearInterval(timerId)
      };
      var getTimer = (variant) => {
        switch (variant) {
          case "native": {
            return nativeTimer;
          }
          case "worker": {
            return workerTimer;
          }
          case "auto":
          default: {
            return is_browser_1.default && !is_browser_1.isWebWorker && !is_browser_1.isReactNativeBrowser ? workerTimer : nativeTimer;
          }
        }
      };
      exports8.default = getTimer;
    }
  });

  // build/lib/KeepaliveManager.js
  var require_KeepaliveManager = __commonJS({
    "build/lib/KeepaliveManager.js"(exports8) {
      "use strict";
      init_dirname();
      init_buffer2();
      init_process2();
      var __importDefault = exports8 && exports8.__importDefault || function(mod) {
        return mod && mod.__esModule ? mod : { "default": mod };
      };
      Object.defineProperty(exports8, "__esModule", { value: true });
      var get_timer_1 = __importDefault(require_get_timer());
      var KeepaliveManager = class {
        _keepalive;
        timerId;
        timer;
        destroyed = false;
        counter;
        client;
        _keepaliveTimeoutTimestamp;
        _intervalEvery;
        get keepaliveTimeoutTimestamp() {
          return this._keepaliveTimeoutTimestamp;
        }
        get intervalEvery() {
          return this._intervalEvery;
        }
        get keepalive() {
          return this._keepalive;
        }
        constructor(client, variant) {
          this.client = client;
          this.timer = typeof variant === "object" && "set" in variant && "clear" in variant ? variant : (0, get_timer_1.default)(variant);
          this.setKeepalive(client.options.keepalive);
        }
        clear() {
          if (this.timerId) {
            this.timer.clear(this.timerId);
            this.timerId = null;
          }
        }
        setKeepalive(value) {
          value *= 1e3;
          if (isNaN(value) || value <= 0 || value > 2147483647) {
            throw new Error(`Keepalive value must be an integer between 0 and 2147483647. Provided value is ${value}`);
          }
          this._keepalive = value;
          this.reschedule();
          this.client["log"](`KeepaliveManager: set keepalive to ${value}ms`);
        }
        destroy() {
          this.clear();
          this.destroyed = true;
        }
        reschedule() {
          if (this.destroyed) {
            return;
          }
          this.clear();
          this.counter = 0;
          const keepAliveTimeout = Math.ceil(this._keepalive * 1.5);
          this._keepaliveTimeoutTimestamp = Date.now() + keepAliveTimeout;
          this._intervalEvery = Math.ceil(this._keepalive / 2);
          this.timerId = this.timer.set(() => {
            if (this.destroyed) {
              return;
            }
            this.counter += 1;
            if (this.counter === 2) {
              this.client.sendPing();
            } else if (this.counter > 2) {
              this.client.onKeepaliveTimeout();
            }
          }, this._intervalEvery);
        }
      };
      exports8.default = KeepaliveManager;
    }
  });

  // build/lib/client.js
  var require_client = __commonJS({
    "build/lib/client.js"(exports8) {
      "use strict";
      init_dirname();
      init_buffer2();
      init_process2();
      var __createBinding = exports8 && exports8.__createBinding || (Object.create ? function(o, m, k, k2) {
        if (k2 === void 0) k2 = k;
        var desc = Object.getOwnPropertyDescriptor(m, k);
        if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
          desc = { enumerable: true, get: function() {
            return m[k];
          } };
        }
        Object.defineProperty(o, k2, desc);
      } : function(o, m, k, k2) {
        if (k2 === void 0) k2 = k;
        o[k2] = m[k];
      });
      var __setModuleDefault = exports8 && exports8.__setModuleDefault || (Object.create ? function(o, v) {
        Object.defineProperty(o, "default", { enumerable: true, value: v });
      } : function(o, v) {
        o["default"] = v;
      });
      var __importStar = exports8 && exports8.__importStar || /* @__PURE__ */ function() {
        var ownKeys = function(o) {
          ownKeys = Object.getOwnPropertyNames || function(o2) {
            var ar = [];
            for (var k in o2) if (Object.prototype.hasOwnProperty.call(o2, k)) ar[ar.length] = k;
            return ar;
          };
          return ownKeys(o);
        };
        return function(mod) {
          if (mod && mod.__esModule) return mod;
          var result = {};
          if (mod != null) {
            for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
          }
          __setModuleDefault(result, mod);
          return result;
        };
      }();
      var __importDefault = exports8 && exports8.__importDefault || function(mod) {
        return mod && mod.__esModule ? mod : { "default": mod };
      };
      Object.defineProperty(exports8, "__esModule", { value: true });
      var mqtt_packet_1 = __importDefault(require_mqtt());
      var readable_stream_1 = require_browser3();
      var default_1 = __importDefault(require_default());
      var debug_1 = __importDefault(require_browser4());
      var validations = __importStar(require_validations());
      var store_1 = __importDefault(require_store());
      var handlers_1 = __importDefault(require_handlers());
      var default_message_id_provider_1 = __importDefault(require_default_message_id_provider());
      var topic_alias_recv_1 = __importDefault(require_topic_alias_recv());
      var shared_1 = require_shared();
      var TypedEmitter_1 = require_TypedEmitter();
      var KeepaliveManager_1 = __importDefault(require_KeepaliveManager());
      var is_browser_1 = __importStar(require_is_browser());
      var setImmediate2 = globalThis.setImmediate || ((...args) => {
        const callback = args.shift();
        (0, shared_1.nextTick)(() => {
          callback(...args);
        });
      });
      var defaultConnectOptions = {
        keepalive: 60,
        reschedulePings: true,
        protocolId: "MQTT",
        protocolVersion: 4,
        reconnectPeriod: 1e3,
        connectTimeout: 30 * 1e3,
        clean: true,
        resubscribe: true,
        subscribeBatchSize: null,
        writeCache: true,
        timerVariant: "auto"
      };
      var MqttClient = class _MqttClient extends TypedEmitter_1.TypedEventEmitter {
        static VERSION = shared_1.MQTTJS_VERSION;
        connected;
        disconnecting;
        disconnected;
        reconnecting;
        incomingStore;
        outgoingStore;
        options;
        queueQoSZero;
        _reconnectCount;
        log;
        messageIdProvider;
        outgoing;
        messageIdToTopic;
        noop;
        keepaliveManager;
        stream;
        queue;
        streamBuilder;
        _resubscribeTopics;
        connackTimer;
        reconnectTimer;
        _storeProcessing;
        _packetIdsDuringStoreProcessing;
        _storeProcessingQueue;
        _firstConnection;
        topicAliasRecv;
        topicAliasSend;
        _deferredReconnect;
        connackPacket;
        static defaultId() {
          return `mqttjs_${Math.random().toString(16).substr(2, 8)}`;
        }
        constructor(streamBuilder, options) {
          super();
          this.options = options || {};
          for (const k in defaultConnectOptions) {
            if (typeof this.options[k] === "undefined") {
              this.options[k] = defaultConnectOptions[k];
            } else {
              this.options[k] = options[k];
            }
          }
          this.log = this.options.log || (0, debug_1.default)("mqttjs:client");
          this.noop = this._noop.bind(this);
          this.log("MqttClient :: version:", _MqttClient.VERSION);
          if (is_browser_1.isWebWorker) {
            this.log("MqttClient :: environment", "webworker");
          } else {
            this.log("MqttClient :: environment", is_browser_1.default ? "browser" : "node");
          }
          this.log("MqttClient :: options.protocol", options.protocol);
          this.log("MqttClient :: options.protocolVersion", options.protocolVersion);
          this.log("MqttClient :: options.username", options.username);
          this.log("MqttClient :: options.keepalive", options.keepalive);
          this.log("MqttClient :: options.reconnectPeriod", options.reconnectPeriod);
          this.log("MqttClient :: options.rejectUnauthorized", options.rejectUnauthorized);
          this.log("MqttClient :: options.properties.topicAliasMaximum", options.properties ? options.properties.topicAliasMaximum : void 0);
          this.options.clientId = typeof options.clientId === "string" ? options.clientId : _MqttClient.defaultId();
          this.log("MqttClient :: clientId", this.options.clientId);
          this.options.customHandleAcks = options.protocolVersion === 5 && options.customHandleAcks ? options.customHandleAcks : (...args) => {
            args[3](null, 0);
          };
          if (!this.options.writeCache) {
            mqtt_packet_1.default.writeToStream.cacheNumbers = false;
          }
          this.streamBuilder = streamBuilder;
          this.messageIdProvider = typeof this.options.messageIdProvider === "undefined" ? new default_message_id_provider_1.default() : this.options.messageIdProvider;
          this.outgoingStore = options.outgoingStore || new store_1.default();
          this.incomingStore = options.incomingStore || new store_1.default();
          this.queueQoSZero = options.queueQoSZero === void 0 ? true : options.queueQoSZero;
          this._resubscribeTopics = {};
          this.messageIdToTopic = {};
          this.keepaliveManager = null;
          this.connected = false;
          this.disconnecting = false;
          this.reconnecting = false;
          this.queue = [];
          this.connackTimer = null;
          this.reconnectTimer = null;
          this._storeProcessing = false;
          this._packetIdsDuringStoreProcessing = {};
          this._storeProcessingQueue = [];
          this.outgoing = {};
          this._firstConnection = true;
          if (options.properties && options.properties.topicAliasMaximum > 0) {
            if (options.properties.topicAliasMaximum > 65535) {
              this.log("MqttClient :: options.properties.topicAliasMaximum is out of range");
            } else {
              this.topicAliasRecv = new topic_alias_recv_1.default(options.properties.topicAliasMaximum);
            }
          }
          this.on("connect", () => {
            const { queue: queue3 } = this;
            const deliver = () => {
              const entry = queue3.shift();
              this.log("deliver :: entry %o", entry);
              let packet = null;
              if (!entry) {
                this._resubscribe();
                return;
              }
              packet = entry.packet;
              this.log("deliver :: call _sendPacket for %o", packet);
              let send = true;
              if (packet.messageId && packet.messageId !== 0) {
                if (!this.messageIdProvider.register(packet.messageId)) {
                  send = false;
                }
              }
              if (send) {
                this._sendPacket(packet, (err) => {
                  if (entry.cb) {
                    entry.cb(err);
                  }
                  deliver();
                });
              } else {
                this.log("messageId: %d has already used. The message is skipped and removed.", packet.messageId);
                deliver();
              }
            };
            this.log("connect :: sending queued packets");
            deliver();
          });
          this.on("close", () => {
            this.log("close :: connected set to `false`");
            this.connected = false;
            this.log("close :: clearing connackTimer");
            clearTimeout(this.connackTimer);
            this._destroyKeepaliveManager();
            if (this.topicAliasRecv) {
              this.topicAliasRecv.clear();
            }
            this.log("close :: calling _setupReconnect");
            this._setupReconnect();
          });
          if (!this.options.manualConnect) {
            this.log("MqttClient :: setting up stream");
            this.connect();
          }
        }
        handleAuth(packet, callback) {
          callback();
        }
        handleMessage(packet, callback) {
          callback();
        }
        _nextId() {
          return this.messageIdProvider.allocate();
        }
        getLastMessageId() {
          return this.messageIdProvider.getLastAllocated();
        }
        connect() {
          const writable = new readable_stream_1.Writable();
          const parser = mqtt_packet_1.default.parser(this.options);
          let completeParse = null;
          const packets = [];
          this.log("connect :: calling method to clear reconnect");
          this._clearReconnect();
          if (this.disconnected && !this.reconnecting) {
            this.incomingStore = this.options.incomingStore || new store_1.default();
            this.outgoingStore = this.options.outgoingStore || new store_1.default();
            this.disconnecting = false;
            this.disconnected = false;
          }
          this.log("connect :: using streamBuilder provided to client to create stream");
          this.stream = this.streamBuilder(this);
          parser.on("packet", (packet) => {
            this.log("parser :: on packet push to packets array.");
            packets.push(packet);
          });
          const work = () => {
            this.log("work :: getting next packet in queue");
            const packet = packets.shift();
            if (packet) {
              this.log("work :: packet pulled from queue");
              (0, handlers_1.default)(this, packet, nextTickWork);
            } else {
              this.log("work :: no packets in queue");
              const done = completeParse;
              completeParse = null;
              this.log("work :: done flag is %s", !!done);
              if (done)
                done();
            }
          };
          const nextTickWork = () => {
            if (packets.length) {
              (0, shared_1.nextTick)(work);
            } else {
              const done = completeParse;
              completeParse = null;
              done();
            }
          };
          writable._write = (buf, enc, done) => {
            completeParse = done;
            this.log("writable stream :: parsing buffer");
            parser.parse(buf);
            work();
          };
          const streamErrorHandler = (error) => {
            this.log("streamErrorHandler :: error", error.message);
            if (error.code) {
              this.log("streamErrorHandler :: emitting error");
              this.emit("error", error);
            } else {
              this.noop(error);
            }
          };
          this.log("connect :: pipe stream to writable stream");
          this.stream.pipe(writable);
          this.stream.on("error", streamErrorHandler);
          this.stream.on("close", () => {
            this.log("(%s)stream :: on close", this.options.clientId);
            this._flushVolatile();
            this.log("stream: emit close to MqttClient");
            this.emit("close");
          });
          this.log("connect: sending packet `connect`");
          const connectPacket = {
            cmd: "connect",
            protocolId: this.options.protocolId,
            protocolVersion: this.options.protocolVersion,
            clean: this.options.clean,
            clientId: this.options.clientId,
            keepalive: this.options.keepalive,
            username: this.options.username,
            password: this.options.password,
            properties: this.options.properties
          };
          if (this.options.will) {
            connectPacket.will = {
              ...this.options.will,
              payload: this.options.will?.payload
            };
          }
          if (this.topicAliasRecv) {
            if (!connectPacket.properties) {
              connectPacket.properties = {};
            }
            if (this.topicAliasRecv) {
              connectPacket.properties.topicAliasMaximum = this.topicAliasRecv.max;
            }
          }
          this._writePacket(connectPacket);
          parser.on("error", this.emit.bind(this, "error"));
          if (this.options.properties) {
            if (!this.options.properties.authenticationMethod && this.options.properties.authenticationData) {
              this.end(() => this.emit("error", new Error("Packet has no Authentication Method")));
              return this;
            }
            if (this.options.properties.authenticationMethod && this.options.authPacket && typeof this.options.authPacket === "object") {
              const authPacket = {
                cmd: "auth",
                reasonCode: 0,
                ...this.options.authPacket
              };
              this._writePacket(authPacket);
            }
          }
          this.stream.setMaxListeners(1e3);
          clearTimeout(this.connackTimer);
          this.connackTimer = setTimeout(() => {
            this.log("!!connectTimeout hit!! Calling _cleanUp with force `true`");
            this.emit("error", new Error("connack timeout"));
            this._cleanUp(true);
          }, this.options.connectTimeout);
          return this;
        }
        publish(topic, message, opts, callback) {
          this.log("publish :: message `%s` to topic `%s`", message, topic);
          const { options } = this;
          if (typeof opts === "function") {
            callback = opts;
            opts = null;
          }
          opts = opts || {};
          const defaultOpts = {
            qos: 0,
            retain: false,
            dup: false
          };
          opts = { ...defaultOpts, ...opts };
          const { qos, retain, dup, properties, cbStorePut } = opts;
          if (this._checkDisconnecting(callback)) {
            return this;
          }
          const publishProc = () => {
            let messageId = 0;
            if (qos === 1 || qos === 2) {
              messageId = this._nextId();
              if (messageId === null) {
                this.log("No messageId left");
                return false;
              }
            }
            const packet = {
              cmd: "publish",
              topic,
              payload: message,
              qos,
              retain,
              messageId,
              dup
            };
            if (options.protocolVersion === 5) {
              packet.properties = properties;
            }
            this.log("publish :: qos", qos);
            switch (qos) {
              case 1:
              case 2:
                this.outgoing[packet.messageId] = {
                  volatile: false,
                  cb: callback || this.noop
                };
                this.log("MqttClient:publish: packet cmd: %s", packet.cmd);
                this._sendPacket(packet, void 0, cbStorePut);
                break;
              default:
                this.log("MqttClient:publish: packet cmd: %s", packet.cmd);
                this._sendPacket(packet, callback, cbStorePut);
                break;
            }
            return true;
          };
          if (this._storeProcessing || this._storeProcessingQueue.length > 0 || !publishProc()) {
            this._storeProcessingQueue.push({
              invoke: publishProc,
              cbStorePut: opts.cbStorePut,
              callback
            });
          }
          return this;
        }
        publishAsync(topic, message, opts) {
          return new Promise((resolve2, reject) => {
            this.publish(topic, message, opts, (err, packet) => {
              if (err) {
                reject(err);
              } else {
                resolve2(packet);
              }
            });
          });
        }
        subscribe(topicObject, opts, callback) {
          const version4 = this.options.protocolVersion;
          if (typeof opts === "function") {
            callback = opts;
          }
          callback = callback || this.noop;
          let resubscribe = false;
          let topicsList = [];
          if (typeof topicObject === "string") {
            topicObject = [topicObject];
            topicsList = topicObject;
          } else if (Array.isArray(topicObject)) {
            topicsList = topicObject;
          } else if (typeof topicObject === "object") {
            resubscribe = topicObject.resubscribe;
            delete topicObject.resubscribe;
            topicsList = Object.keys(topicObject);
          }
          const invalidTopic = validations.validateTopics(topicsList);
          if (invalidTopic !== null) {
            setImmediate2(callback, new Error(`Invalid topic ${invalidTopic}`));
            return this;
          }
          if (this._checkDisconnecting(callback)) {
            this.log("subscribe: discconecting true");
            return this;
          }
          const defaultOpts = {
            qos: 0
          };
          if (version4 === 5) {
            defaultOpts.nl = false;
            defaultOpts.rap = false;
            defaultOpts.rh = 0;
          }
          opts = { ...defaultOpts, ...opts };
          const { properties } = opts;
          const subs = [];
          const parseSub = (topic, subOptions) => {
            subOptions = subOptions || opts;
            if (!Object.prototype.hasOwnProperty.call(this._resubscribeTopics, topic) || this._resubscribeTopics[topic].qos < subOptions.qos || resubscribe) {
              const currentOpts = {
                topic,
                qos: subOptions.qos
              };
              if (version4 === 5) {
                currentOpts.nl = subOptions.nl;
                currentOpts.rap = subOptions.rap;
                currentOpts.rh = subOptions.rh;
                currentOpts.properties = properties;
              }
              this.log("subscribe: pushing topic `%s` and qos `%s` to subs list", currentOpts.topic, currentOpts.qos);
              subs.push(currentOpts);
            }
          };
          if (Array.isArray(topicObject)) {
            topicObject.forEach((topic) => {
              this.log("subscribe: array topic %s", topic);
              parseSub(topic);
            });
          } else {
            Object.keys(topicObject).forEach((topic) => {
              this.log("subscribe: object topic %s, %o", topic, topicObject[topic]);
              parseSub(topic, topicObject[topic]);
            });
          }
          if (!subs.length) {
            callback(null, []);
            return this;
          }
          const subscribeChunkedSubs = (chunkedSubs, messageId) => {
            const packet = {
              cmd: "subscribe",
              subscriptions: chunkedSubs,
              messageId
            };
            if (properties) {
              packet.properties = properties;
            }
            if (this.options.resubscribe) {
              this.log("subscribe :: resubscribe true");
              const topics = [];
              chunkedSubs.forEach((sub) => {
                if (this.options.reconnectPeriod > 0) {
                  const topic = { qos: sub.qos };
                  if (version4 === 5) {
                    topic.nl = sub.nl || false;
                    topic.rap = sub.rap || false;
                    topic.rh = sub.rh || 0;
                    topic.properties = sub.properties;
                  }
                  this._resubscribeTopics[sub.topic] = topic;
                  topics.push(sub.topic);
                }
              });
              this.messageIdToTopic[packet.messageId] = topics;
            }
            const promise = new Promise((resolve2, reject) => {
              this.outgoing[packet.messageId] = {
                volatile: true,
                cb(err, packet2) {
                  if (!err) {
                    const { granted } = packet2;
                    for (let grantedI = 0; grantedI < granted.length; grantedI += 1) {
                      chunkedSubs[grantedI].qos = granted[grantedI];
                    }
                  }
                  if (!err) {
                    resolve2(packet2);
                  } else {
                    reject(new shared_1.ErrorWithSubackPacket(err.message, packet2));
                  }
                }
              };
            });
            this.log("subscribe :: call _sendPacket");
            this._sendPacket(packet);
            return promise;
          };
          const subscribeProc = () => {
            const batchSize = this.options.subscribeBatchSize ?? subs.length;
            const subscribePromises = [];
            for (let i = 0; i < subs.length; i += batchSize) {
              const chunkedSubs = subs.slice(i, i + batchSize);
              const messageId = this._nextId();
              if (messageId === null) {
                this.log("No messageId left");
                return false;
              }
              subscribePromises.push(subscribeChunkedSubs(chunkedSubs, messageId));
            }
            Promise.all(subscribePromises).then((packets) => {
              callback(null, subs, packets.at(-1));
            }).catch((err) => {
              callback(err, subs, err.packet);
            });
            return true;
          };
          if (this._storeProcessing || this._storeProcessingQueue.length > 0 || !subscribeProc()) {
            this._storeProcessingQueue.push({
              invoke: subscribeProc,
              callback
            });
          }
          return this;
        }
        subscribeAsync(topicObject, opts) {
          return new Promise((resolve2, reject) => {
            this.subscribe(topicObject, opts, (err, granted) => {
              if (err) {
                reject(err);
              } else {
                resolve2(granted);
              }
            });
          });
        }
        unsubscribe(topic, opts, callback) {
          if (typeof topic === "string") {
            topic = [topic];
          }
          if (typeof opts === "function") {
            callback = opts;
          }
          callback = callback || this.noop;
          const invalidTopic = validations.validateTopics(topic);
          if (invalidTopic !== null) {
            setImmediate2(callback, new Error(`Invalid topic ${invalidTopic}`));
            return this;
          }
          if (this._checkDisconnecting(callback)) {
            return this;
          }
          const unsubscribeProc = () => {
            const messageId = this._nextId();
            if (messageId === null) {
              this.log("No messageId left");
              return false;
            }
            const packet = {
              cmd: "unsubscribe",
              messageId,
              unsubscriptions: []
            };
            if (typeof topic === "string") {
              packet.unsubscriptions = [topic];
            } else if (Array.isArray(topic)) {
              packet.unsubscriptions = topic;
            }
            if (this.options.resubscribe) {
              packet.unsubscriptions.forEach((topic2) => {
                delete this._resubscribeTopics[topic2];
              });
            }
            if (typeof opts === "object" && opts.properties) {
              packet.properties = opts.properties;
            }
            this.outgoing[packet.messageId] = {
              volatile: true,
              cb: callback
            };
            this.log("unsubscribe: call _sendPacket");
            this._sendPacket(packet);
            return true;
          };
          if (this._storeProcessing || this._storeProcessingQueue.length > 0 || !unsubscribeProc()) {
            this._storeProcessingQueue.push({
              invoke: unsubscribeProc,
              callback
            });
          }
          return this;
        }
        unsubscribeAsync(topic, opts) {
          return new Promise((resolve2, reject) => {
            this.unsubscribe(topic, opts, (err, packet) => {
              if (err) {
                reject(err);
              } else {
                resolve2(packet);
              }
            });
          });
        }
        end(force, opts, cb) {
          this.log("end :: (%s)", this.options.clientId);
          if (force == null || typeof force !== "boolean") {
            cb = cb || opts;
            opts = force;
            force = false;
          }
          if (typeof opts !== "object") {
            cb = cb || opts;
            opts = null;
          }
          this.log("end :: cb? %s", !!cb);
          if (!cb || typeof cb !== "function") {
            cb = this.noop;
          }
          const closeStores = () => {
            this.log("end :: closeStores: closing incoming and outgoing stores");
            this.disconnected = true;
            this.incomingStore.close((e1) => {
              this.outgoingStore.close((e2) => {
                this.log("end :: closeStores: emitting end");
                this.emit("end");
                if (cb) {
                  const err = e1 || e2;
                  this.log("end :: closeStores: invoking callback with args");
                  cb(err);
                }
              });
            });
            if (this._deferredReconnect) {
              this._deferredReconnect();
            } else if (this.options.reconnectPeriod === 0 || this.options.manualConnect) {
              this.disconnecting = false;
            }
          };
          const finish = () => {
            this.log("end :: (%s) :: finish :: calling _cleanUp with force %s", this.options.clientId, force);
            this._cleanUp(force, () => {
              this.log("end :: finish :: calling process.nextTick on closeStores");
              (0, shared_1.nextTick)(closeStores);
            }, opts);
          };
          if (this.disconnecting) {
            cb();
            return this;
          }
          this._clearReconnect();
          this.disconnecting = true;
          if (!force && Object.keys(this.outgoing).length > 0) {
            this.log("end :: (%s) :: calling finish in 10ms once outgoing is empty", this.options.clientId);
            this.once("outgoingEmpty", setTimeout.bind(null, finish, 10));
          } else {
            this.log("end :: (%s) :: immediately calling finish", this.options.clientId);
            finish();
          }
          return this;
        }
        endAsync(force, opts) {
          return new Promise((resolve2, reject) => {
            this.end(force, opts, (err) => {
              if (err) {
                reject(err);
              } else {
                resolve2();
              }
            });
          });
        }
        removeOutgoingMessage(messageId) {
          if (this.outgoing[messageId]) {
            const { cb } = this.outgoing[messageId];
            this._removeOutgoingAndStoreMessage(messageId, () => {
              cb(new Error("Message removed"));
            });
          }
          return this;
        }
        reconnect(opts) {
          this.log("client reconnect");
          const f = () => {
            if (opts) {
              this.options.incomingStore = opts.incomingStore;
              this.options.outgoingStore = opts.outgoingStore;
            } else {
              this.options.incomingStore = null;
              this.options.outgoingStore = null;
            }
            this.incomingStore = this.options.incomingStore || new store_1.default();
            this.outgoingStore = this.options.outgoingStore || new store_1.default();
            this.disconnecting = false;
            this.disconnected = false;
            this._deferredReconnect = null;
            this._reconnect();
          };
          if (this.disconnecting && !this.disconnected) {
            this._deferredReconnect = f;
          } else {
            f();
          }
          return this;
        }
        _flushVolatile() {
          if (this.outgoing) {
            this.log("_flushVolatile :: deleting volatile messages from the queue and setting their callbacks as error function");
            Object.keys(this.outgoing).forEach((messageId) => {
              if (this.outgoing[messageId].volatile && typeof this.outgoing[messageId].cb === "function") {
                this.outgoing[messageId].cb(new Error("Connection closed"));
                delete this.outgoing[messageId];
              }
            });
          }
        }
        _flush() {
          if (this.outgoing) {
            this.log("_flush: queue exists? %b", !!this.outgoing);
            Object.keys(this.outgoing).forEach((messageId) => {
              if (typeof this.outgoing[messageId].cb === "function") {
                this.outgoing[messageId].cb(new Error("Connection closed"));
                delete this.outgoing[messageId];
              }
            });
          }
        }
        _removeTopicAliasAndRecoverTopicName(packet) {
          let alias;
          if (packet.properties) {
            alias = packet.properties.topicAlias;
          }
          let topic = packet.topic.toString();
          this.log("_removeTopicAliasAndRecoverTopicName :: alias %d, topic %o", alias, topic);
          if (topic.length === 0) {
            if (typeof alias === "undefined") {
              return new Error("Unregistered Topic Alias");
            }
            topic = this.topicAliasSend.getTopicByAlias(alias);
            if (typeof topic === "undefined") {
              return new Error("Unregistered Topic Alias");
            }
            packet.topic = topic;
          }
          if (alias) {
            delete packet.properties.topicAlias;
          }
        }
        _checkDisconnecting(callback) {
          if (this.disconnecting) {
            if (callback && callback !== this.noop) {
              callback(new Error("client disconnecting"));
            } else {
              this.emit("error", new Error("client disconnecting"));
            }
          }
          return this.disconnecting;
        }
        _reconnect() {
          this.log("_reconnect: emitting reconnect to client");
          this.emit("reconnect");
          if (this.connected) {
            this.end(() => {
              this.connect();
            });
            this.log("client already connected. disconnecting first.");
          } else {
            this.log("_reconnect: calling connect");
            this.connect();
          }
        }
        _setupReconnect() {
          if (!this.disconnecting && !this.reconnectTimer && this.options.reconnectPeriod > 0) {
            if (!this.reconnecting) {
              this.log("_setupReconnect :: emit `offline` state");
              this.emit("offline");
              this.log("_setupReconnect :: set `reconnecting` to `true`");
              this.reconnecting = true;
            }
            this.log("_setupReconnect :: setting reconnectTimer for %d ms", this.options.reconnectPeriod);
            this.reconnectTimer = setInterval(() => {
              this.log("reconnectTimer :: reconnect triggered!");
              this._reconnect();
            }, this.options.reconnectPeriod);
          } else {
            this.log("_setupReconnect :: doing nothing...");
          }
        }
        _clearReconnect() {
          this.log("_clearReconnect : clearing reconnect timer");
          if (this.reconnectTimer) {
            clearInterval(this.reconnectTimer);
            this.reconnectTimer = null;
          }
        }
        _cleanUp(forced, done, opts = {}) {
          if (done) {
            this.log("_cleanUp :: done callback provided for on stream close");
            this.stream.on("close", done);
          }
          this.log("_cleanUp :: forced? %s", forced);
          if (forced) {
            if (this.options.reconnectPeriod === 0 && this.options.clean) {
              this._flush();
            }
            this.log("_cleanUp :: (%s) :: destroying stream", this.options.clientId);
            this.stream.destroy();
          } else {
            const packet = { cmd: "disconnect", ...opts };
            this.log("_cleanUp :: (%s) :: call _sendPacket with disconnect packet", this.options.clientId);
            this._sendPacket(packet, () => {
              this.log("_cleanUp :: (%s) :: destroying stream", this.options.clientId);
              setImmediate2(() => {
                this.stream.end(() => {
                  this.log("_cleanUp :: (%s) :: stream destroyed", this.options.clientId);
                });
              });
            });
          }
          if (!this.disconnecting && !this.reconnecting) {
            this.log("_cleanUp :: client not disconnecting/reconnecting. Clearing and resetting reconnect.");
            this._clearReconnect();
            this._setupReconnect();
          }
          this._destroyKeepaliveManager();
          if (done && !this.connected) {
            this.log("_cleanUp :: (%s) :: removing stream `done` callback `close` listener", this.options.clientId);
            this.stream.removeListener("close", done);
            done();
          }
        }
        _storeAndSend(packet, cb, cbStorePut) {
          this.log("storeAndSend :: store packet with cmd %s to outgoingStore", packet.cmd);
          let storePacket = packet;
          let err;
          if (storePacket.cmd === "publish") {
            storePacket = (0, default_1.default)(packet);
            err = this._removeTopicAliasAndRecoverTopicName(storePacket);
            if (err) {
              return cb && cb(err);
            }
          }
          this.outgoingStore.put(storePacket, (err2) => {
            if (err2) {
              return cb && cb(err2);
            }
            cbStorePut();
            this._writePacket(packet, cb);
          });
        }
        _applyTopicAlias(packet) {
          if (this.options.protocolVersion === 5) {
            if (packet.cmd === "publish") {
              let alias;
              if (packet.properties) {
                alias = packet.properties.topicAlias;
              }
              const topic = packet.topic.toString();
              if (this.topicAliasSend) {
                if (alias) {
                  if (topic.length !== 0) {
                    this.log("applyTopicAlias :: register topic: %s - alias: %d", topic, alias);
                    if (!this.topicAliasSend.put(topic, alias)) {
                      this.log("applyTopicAlias :: error out of range. topic: %s - alias: %d", topic, alias);
                      return new Error("Sending Topic Alias out of range");
                    }
                  }
                } else if (topic.length !== 0) {
                  if (this.options.autoAssignTopicAlias) {
                    alias = this.topicAliasSend.getAliasByTopic(topic);
                    if (alias) {
                      packet.topic = "";
                      packet.properties = {
                        ...packet.properties,
                        topicAlias: alias
                      };
                      this.log("applyTopicAlias :: auto assign(use) topic: %s - alias: %d", topic, alias);
                    } else {
                      alias = this.topicAliasSend.getLruAlias();
                      this.topicAliasSend.put(topic, alias);
                      packet.properties = {
                        ...packet.properties,
                        topicAlias: alias
                      };
                      this.log("applyTopicAlias :: auto assign topic: %s - alias: %d", topic, alias);
                    }
                  } else if (this.options.autoUseTopicAlias) {
                    alias = this.topicAliasSend.getAliasByTopic(topic);
                    if (alias) {
                      packet.topic = "";
                      packet.properties = {
                        ...packet.properties,
                        topicAlias: alias
                      };
                      this.log("applyTopicAlias :: auto use topic: %s - alias: %d", topic, alias);
                    }
                  }
                }
              } else if (alias) {
                this.log("applyTopicAlias :: error out of range. topic: %s - alias: %d", topic, alias);
                return new Error("Sending Topic Alias out of range");
              }
            }
          }
        }
        _noop(err) {
          this.log("noop ::", err);
        }
        _writePacket(packet, cb) {
          this.log("_writePacket :: packet: %O", packet);
          this.log("_writePacket :: emitting `packetsend`");
          this.emit("packetsend", packet);
          this.log("_writePacket :: writing to stream");
          const result = mqtt_packet_1.default.writeToStream(packet, this.stream, this.options);
          this.log("_writePacket :: writeToStream result %s", result);
          if (!result && cb && cb !== this.noop) {
            this.log("_writePacket :: handle events on `drain` once through callback.");
            this.stream.once("drain", cb);
          } else if (cb) {
            this.log("_writePacket :: invoking cb");
            cb();
          }
        }
        _sendPacket(packet, cb, cbStorePut, noStore) {
          this.log("_sendPacket :: (%s) ::  start", this.options.clientId);
          cbStorePut = cbStorePut || this.noop;
          cb = cb || this.noop;
          const err = this._applyTopicAlias(packet);
          if (err) {
            cb(err);
            return;
          }
          if (!this.connected) {
            if (packet.cmd === "auth") {
              this._writePacket(packet, cb);
              return;
            }
            this.log("_sendPacket :: client not connected. Storing packet offline.");
            this._storePacket(packet, cb, cbStorePut);
            return;
          }
          if (noStore) {
            this._writePacket(packet, cb);
            return;
          }
          switch (packet.cmd) {
            case "publish":
              break;
            case "pubrel":
              this._storeAndSend(packet, cb, cbStorePut);
              return;
            default:
              this._writePacket(packet, cb);
              return;
          }
          switch (packet.qos) {
            case 2:
            case 1:
              this._storeAndSend(packet, cb, cbStorePut);
              break;
            case 0:
            default:
              this._writePacket(packet, cb);
              break;
          }
          this.log("_sendPacket :: (%s) ::  end", this.options.clientId);
        }
        _storePacket(packet, cb, cbStorePut) {
          this.log("_storePacket :: packet: %o", packet);
          this.log("_storePacket :: cb? %s", !!cb);
          cbStorePut = cbStorePut || this.noop;
          let storePacket = packet;
          if (storePacket.cmd === "publish") {
            storePacket = (0, default_1.default)(packet);
            const err = this._removeTopicAliasAndRecoverTopicName(storePacket);
            if (err) {
              return cb && cb(err);
            }
          }
          const qos = storePacket.qos || 0;
          if (qos === 0 && this.queueQoSZero || storePacket.cmd !== "publish") {
            this.queue.push({ packet: storePacket, cb });
          } else if (qos > 0) {
            cb = this.outgoing[storePacket.messageId] ? this.outgoing[storePacket.messageId].cb : null;
            this.outgoingStore.put(storePacket, (err) => {
              if (err) {
                return cb && cb(err);
              }
              cbStorePut();
            });
          } else if (cb) {
            cb(new Error("No connection to broker"));
          }
        }
        _setupKeepaliveManager() {
          this.log("_setupKeepaliveManager :: keepalive %d (seconds)", this.options.keepalive);
          if (!this.keepaliveManager && this.options.keepalive) {
            this.keepaliveManager = new KeepaliveManager_1.default(this, this.options.timerVariant);
          }
        }
        _destroyKeepaliveManager() {
          if (this.keepaliveManager) {
            this.log("_destroyKeepaliveManager :: destroying keepalive manager");
            this.keepaliveManager.destroy();
            this.keepaliveManager = null;
          }
        }
        reschedulePing(force = false) {
          if (this.keepaliveManager && this.options.keepalive && (force || this.options.reschedulePings)) {
            this._reschedulePing();
          }
        }
        _reschedulePing() {
          this.log("_reschedulePing :: rescheduling ping");
          this.keepaliveManager.reschedule();
        }
        sendPing() {
          this.log("_sendPing :: sending pingreq");
          this._sendPacket({ cmd: "pingreq" });
        }
        onKeepaliveTimeout() {
          this.emit("error", new Error("Keepalive timeout"));
          this.log("onKeepaliveTimeout :: calling _cleanUp with force true");
          this._cleanUp(true);
        }
        _resubscribe() {
          this.log("_resubscribe");
          const _resubscribeTopicsKeys = Object.keys(this._resubscribeTopics);
          if (!this._firstConnection && (this.options.clean || this.options.protocolVersion >= 4 && !this.connackPacket.sessionPresent) && _resubscribeTopicsKeys.length > 0) {
            if (this.options.resubscribe) {
              if (this.options.protocolVersion === 5) {
                this.log("_resubscribe: protocolVersion 5");
                for (let topicI = 0; topicI < _resubscribeTopicsKeys.length; topicI++) {
                  const resubscribeTopic = {};
                  resubscribeTopic[_resubscribeTopicsKeys[topicI]] = this._resubscribeTopics[_resubscribeTopicsKeys[topicI]];
                  resubscribeTopic.resubscribe = true;
                  this.subscribe(resubscribeTopic, {
                    properties: resubscribeTopic[_resubscribeTopicsKeys[topicI]].properties
                  });
                }
              } else {
                this._resubscribeTopics.resubscribe = true;
                this.subscribe(this._resubscribeTopics);
              }
            } else {
              this._resubscribeTopics = {};
            }
          }
          this._firstConnection = false;
        }
        _onConnect(packet) {
          if (this.disconnected) {
            this.emit("connect", packet);
            return;
          }
          this.connackPacket = packet;
          this.messageIdProvider.clear();
          this._setupKeepaliveManager();
          this.connected = true;
          const startStreamProcess = () => {
            let outStore = this.outgoingStore.createStream();
            const remove = () => {
              outStore.destroy();
              outStore = null;
              this._flushStoreProcessingQueue();
              clearStoreProcessing();
            };
            const clearStoreProcessing = () => {
              this._storeProcessing = false;
              this._packetIdsDuringStoreProcessing = {};
            };
            this.once("close", remove);
            outStore.on("error", (err) => {
              clearStoreProcessing();
              this._flushStoreProcessingQueue();
              this.removeListener("close", remove);
              this.emit("error", err);
            });
            const storeDeliver = () => {
              if (!outStore) {
                return;
              }
              const packet2 = outStore.read(1);
              let cb;
              if (!packet2) {
                outStore.once("readable", storeDeliver);
                return;
              }
              this._storeProcessing = true;
              if (this._packetIdsDuringStoreProcessing[packet2.messageId]) {
                storeDeliver();
                return;
              }
              if (!this.disconnecting && !this.reconnectTimer) {
                cb = this.outgoing[packet2.messageId] ? this.outgoing[packet2.messageId].cb : null;
                this.outgoing[packet2.messageId] = {
                  volatile: false,
                  cb(err, status) {
                    if (cb) {
                      cb(err, status);
                    }
                    storeDeliver();
                  }
                };
                this._packetIdsDuringStoreProcessing[packet2.messageId] = true;
                if (this.messageIdProvider.register(packet2.messageId)) {
                  this._sendPacket(packet2, void 0, void 0, true);
                } else {
                  this.log("messageId: %d has already used.", packet2.messageId);
                }
              } else if (outStore.destroy) {
                outStore.destroy();
              }
            };
            outStore.on("end", () => {
              let allProcessed = true;
              for (const id in this._packetIdsDuringStoreProcessing) {
                if (!this._packetIdsDuringStoreProcessing[id]) {
                  allProcessed = false;
                  break;
                }
              }
              this.removeListener("close", remove);
              if (allProcessed) {
                clearStoreProcessing();
                this._invokeAllStoreProcessingQueue();
                this.emit("connect", packet);
              } else {
                startStreamProcess();
              }
            });
            storeDeliver();
          };
          startStreamProcess();
        }
        _invokeStoreProcessingQueue() {
          if (!this._storeProcessing && this._storeProcessingQueue.length > 0) {
            const f = this._storeProcessingQueue[0];
            if (f && f.invoke()) {
              this._storeProcessingQueue.shift();
              return true;
            }
          }
          return false;
        }
        _invokeAllStoreProcessingQueue() {
          while (this._invokeStoreProcessingQueue()) {
          }
        }
        _flushStoreProcessingQueue() {
          for (const f of this._storeProcessingQueue) {
            if (f.cbStorePut)
              f.cbStorePut(new Error("Connection closed"));
            if (f.callback)
              f.callback(new Error("Connection closed"));
          }
          this._storeProcessingQueue.splice(0);
        }
        _removeOutgoingAndStoreMessage(messageId, cb) {
          delete this.outgoing[messageId];
          this.outgoingStore.del({ messageId }, (err, packet) => {
            cb(err, packet);
            this.messageIdProvider.deallocate(messageId);
            this._invokeStoreProcessingQueue();
          });
        }
      };
      exports8.default = MqttClient;
    }
  });

  // build/lib/unique-message-id-provider.js
  var require_unique_message_id_provider = __commonJS({
    "build/lib/unique-message-id-provider.js"(exports8) {
      "use strict";
      init_dirname();
      init_buffer2();
      init_process2();
      Object.defineProperty(exports8, "__esModule", { value: true });
      var number_allocator_1 = require_number_allocator2();
      var UniqueMessageIdProvider = class {
        numberAllocator;
        lastId;
        constructor() {
          this.numberAllocator = new number_allocator_1.NumberAllocator(1, 65535);
        }
        allocate() {
          this.lastId = this.numberAllocator.alloc();
          return this.lastId;
        }
        getLastAllocated() {
          return this.lastId;
        }
        register(messageId) {
          return this.numberAllocator.use(messageId);
        }
        deallocate(messageId) {
          this.numberAllocator.free(messageId);
        }
        clear() {
          this.numberAllocator.clear();
        }
      };
      exports8.default = UniqueMessageIdProvider;
    }
  });

  // node_modules/@jspm/core/nodelibs/browser/punycode.js
  function dew3() {
    if (_dewExec3) return exports$13;
    _dewExec3 = true;
    const maxInt = 2147483647;
    const base = 36;
    const tMin = 1;
    const tMax = 26;
    const skew = 38;
    const damp = 700;
    const initialBias = 72;
    const initialN = 128;
    const delimiter = "-";
    const regexPunycode = /^xn--/;
    const regexNonASCII = /[^\0-\x7F]/;
    const regexSeparators = /[\x2E\u3002\uFF0E\uFF61]/g;
    const errors = {
      "overflow": "Overflow: input needs wider integers to process",
      "not-basic": "Illegal input >= 0x80 (not a basic code point)",
      "invalid-input": "Invalid input"
    };
    const baseMinusTMin = base - tMin;
    const floor = Math.floor;
    const stringFromCharCode = String.fromCharCode;
    function error(type) {
      throw new RangeError(errors[type]);
    }
    function map(array, callback) {
      const result = [];
      let length = array.length;
      while (length--) {
        result[length] = callback(array[length]);
      }
      return result;
    }
    function mapDomain(domain3, callback) {
      const parts = domain3.split("@");
      let result = "";
      if (parts.length > 1) {
        result = parts[0] + "@";
        domain3 = parts[1];
      }
      domain3 = domain3.replace(regexSeparators, ".");
      const labels = domain3.split(".");
      const encoded = map(labels, callback).join(".");
      return result + encoded;
    }
    function ucs2decode(string) {
      const output = [];
      let counter = 0;
      const length = string.length;
      while (counter < length) {
        const value = string.charCodeAt(counter++);
        if (value >= 55296 && value <= 56319 && counter < length) {
          const extra = string.charCodeAt(counter++);
          if ((extra & 64512) == 56320) {
            output.push(((value & 1023) << 10) + (extra & 1023) + 65536);
          } else {
            output.push(value);
            counter--;
          }
        } else {
          output.push(value);
        }
      }
      return output;
    }
    const ucs2encode = (codePoints) => String.fromCodePoint(...codePoints);
    const basicToDigit = function(codePoint) {
      if (codePoint >= 48 && codePoint < 58) {
        return 26 + (codePoint - 48);
      }
      if (codePoint >= 65 && codePoint < 91) {
        return codePoint - 65;
      }
      if (codePoint >= 97 && codePoint < 123) {
        return codePoint - 97;
      }
      return base;
    };
    const digitToBasic = function(digit, flag) {
      return digit + 22 + 75 * (digit < 26) - ((flag != 0) << 5);
    };
    const adapt = function(delta, numPoints, firstTime) {
      let k = 0;
      delta = firstTime ? floor(delta / damp) : delta >> 1;
      delta += floor(delta / numPoints);
      for (; delta > baseMinusTMin * tMax >> 1; k += base) {
        delta = floor(delta / baseMinusTMin);
      }
      return floor(k + (baseMinusTMin + 1) * delta / (delta + skew));
    };
    const decode2 = function(input) {
      const output = [];
      const inputLength = input.length;
      let i = 0;
      let n = initialN;
      let bias = initialBias;
      let basic = input.lastIndexOf(delimiter);
      if (basic < 0) {
        basic = 0;
      }
      for (let j = 0; j < basic; ++j) {
        if (input.charCodeAt(j) >= 128) {
          error("not-basic");
        }
        output.push(input.charCodeAt(j));
      }
      for (let index = basic > 0 ? basic + 1 : 0; index < inputLength; ) {
        const oldi = i;
        for (let w = 1, k = base; ; k += base) {
          if (index >= inputLength) {
            error("invalid-input");
          }
          const digit = basicToDigit(input.charCodeAt(index++));
          if (digit >= base) {
            error("invalid-input");
          }
          if (digit > floor((maxInt - i) / w)) {
            error("overflow");
          }
          i += digit * w;
          const t = k <= bias ? tMin : k >= bias + tMax ? tMax : k - bias;
          if (digit < t) {
            break;
          }
          const baseMinusT = base - t;
          if (w > floor(maxInt / baseMinusT)) {
            error("overflow");
          }
          w *= baseMinusT;
        }
        const out = output.length + 1;
        bias = adapt(i - oldi, out, oldi == 0);
        if (floor(i / out) > maxInt - n) {
          error("overflow");
        }
        n += floor(i / out);
        i %= out;
        output.splice(i++, 0, n);
      }
      return String.fromCodePoint(...output);
    };
    const encode2 = function(input) {
      const output = [];
      input = ucs2decode(input);
      const inputLength = input.length;
      let n = initialN;
      let delta = 0;
      let bias = initialBias;
      for (const currentValue of input) {
        if (currentValue < 128) {
          output.push(stringFromCharCode(currentValue));
        }
      }
      const basicLength = output.length;
      let handledCPCount = basicLength;
      if (basicLength) {
        output.push(delimiter);
      }
      while (handledCPCount < inputLength) {
        let m = maxInt;
        for (const currentValue of input) {
          if (currentValue >= n && currentValue < m) {
            m = currentValue;
          }
        }
        const handledCPCountPlusOne = handledCPCount + 1;
        if (m - n > floor((maxInt - delta) / handledCPCountPlusOne)) {
          error("overflow");
        }
        delta += (m - n) * handledCPCountPlusOne;
        n = m;
        for (const currentValue of input) {
          if (currentValue < n && ++delta > maxInt) {
            error("overflow");
          }
          if (currentValue === n) {
            let q = delta;
            for (let k = base; ; k += base) {
              const t = k <= bias ? tMin : k >= bias + tMax ? tMax : k - bias;
              if (q < t) {
                break;
              }
              const qMinusT = q - t;
              const baseMinusT = base - t;
              output.push(stringFromCharCode(digitToBasic(t + qMinusT % baseMinusT, 0)));
              q = floor(qMinusT / baseMinusT);
            }
            output.push(stringFromCharCode(digitToBasic(q, 0)));
            bias = adapt(delta, handledCPCountPlusOne, handledCPCount === basicLength);
            delta = 0;
            ++handledCPCount;
          }
        }
        ++delta;
        ++n;
      }
      return output.join("");
    };
    const toUnicode2 = function(input) {
      return mapDomain(input, function(string) {
        return regexPunycode.test(string) ? decode2(string.slice(4).toLowerCase()) : string;
      });
    };
    const toASCII2 = function(input) {
      return mapDomain(input, function(string) {
        return regexNonASCII.test(string) ? "xn--" + encode2(string) : string;
      });
    };
    const punycode = {
      /**
       * A string representing the current Punycode.js version number.
       * @memberOf punycode
       * @type String
       */
      "version": "2.3.1",
      /**
       * An object of methods to convert from JavaScript's internal character
       * representation (UCS-2) to Unicode code points, and back.
       * @see <https://mathiasbynens.be/notes/javascript-encoding>
       * @memberOf punycode
       * @type Object
       */
      "ucs2": {
        "decode": ucs2decode,
        "encode": ucs2encode
      },
      "decode": decode2,
      "encode": encode2,
      "toASCII": toASCII2,
      "toUnicode": toUnicode2
    };
    exports$13 = punycode;
    return exports$13;
  }
  var exports$13, _dewExec3, exports4, decode, encode, toASCII, toUnicode, ucs2, version2;
  var init_punycode = __esm({
    "node_modules/@jspm/core/nodelibs/browser/punycode.js"() {
      init_dirname();
      init_buffer2();
      init_process2();
      exports$13 = {};
      _dewExec3 = false;
      exports4 = dew3();
      decode = exports4.decode;
      encode = exports4.encode;
      toASCII = exports4.toASCII;
      toUnicode = exports4.toUnicode;
      ucs2 = exports4.ucs2;
      version2 = exports4.version;
    }
  });

  // node_modules/@jspm/core/nodelibs/browser/chunk-DtcTpLWz.js
  function dew$k() {
    if (_dewExec$k) return exports$k;
    _dewExec$k = true;
    exports$k = function hasSymbols() {
      if (typeof Symbol !== "function" || typeof Object.getOwnPropertySymbols !== "function") {
        return false;
      }
      if (typeof Symbol.iterator === "symbol") {
        return true;
      }
      var obj = {};
      var sym = Symbol("test");
      var symObj = Object(sym);
      if (typeof sym === "string") {
        return false;
      }
      if (Object.prototype.toString.call(sym) !== "[object Symbol]") {
        return false;
      }
      if (Object.prototype.toString.call(symObj) !== "[object Symbol]") {
        return false;
      }
      var symVal = 42;
      obj[sym] = symVal;
      for (sym in obj) {
        return false;
      }
      if (typeof Object.keys === "function" && Object.keys(obj).length !== 0) {
        return false;
      }
      if (typeof Object.getOwnPropertyNames === "function" && Object.getOwnPropertyNames(obj).length !== 0) {
        return false;
      }
      var syms = Object.getOwnPropertySymbols(obj);
      if (syms.length !== 1 || syms[0] !== sym) {
        return false;
      }
      if (!Object.prototype.propertyIsEnumerable.call(obj, sym)) {
        return false;
      }
      if (typeof Object.getOwnPropertyDescriptor === "function") {
        var descriptor = Object.getOwnPropertyDescriptor(obj, sym);
        if (descriptor.value !== symVal || descriptor.enumerable !== true) {
          return false;
        }
      }
      return true;
    };
    return exports$k;
  }
  function dew$j() {
    if (_dewExec$j) return exports$j;
    _dewExec$j = true;
    exports$j = Error;
    return exports$j;
  }
  function dew$i() {
    if (_dewExec$i) return exports$i;
    _dewExec$i = true;
    exports$i = EvalError;
    return exports$i;
  }
  function dew$h() {
    if (_dewExec$h) return exports$h;
    _dewExec$h = true;
    exports$h = RangeError;
    return exports$h;
  }
  function dew$g() {
    if (_dewExec$g) return exports$g;
    _dewExec$g = true;
    exports$g = ReferenceError;
    return exports$g;
  }
  function dew$f() {
    if (_dewExec$f) return exports$f;
    _dewExec$f = true;
    exports$f = SyntaxError;
    return exports$f;
  }
  function dew$e() {
    if (_dewExec$e) return exports$e;
    _dewExec$e = true;
    exports$e = TypeError;
    return exports$e;
  }
  function dew$d() {
    if (_dewExec$d) return exports$d;
    _dewExec$d = true;
    exports$d = URIError;
    return exports$d;
  }
  function dew$c() {
    if (_dewExec$c) return exports$c;
    _dewExec$c = true;
    var origSymbol = typeof Symbol !== "undefined" && Symbol;
    var hasSymbolSham = dew$k();
    exports$c = function hasNativeSymbols() {
      if (typeof origSymbol !== "function") {
        return false;
      }
      if (typeof Symbol !== "function") {
        return false;
      }
      if (typeof origSymbol("foo") !== "symbol") {
        return false;
      }
      if (typeof Symbol("bar") !== "symbol") {
        return false;
      }
      return hasSymbolSham();
    };
    return exports$c;
  }
  function dew$b() {
    if (_dewExec$b) return exports$b;
    _dewExec$b = true;
    var test = {
      __proto__: null,
      foo: {}
    };
    var $Object = Object;
    exports$b = function hasProto() {
      return {
        __proto__: test
      }.foo === test.foo && !(test instanceof $Object);
    };
    return exports$b;
  }
  function dew$a() {
    if (_dewExec$a) return exports$a;
    _dewExec$a = true;
    var ERROR_MESSAGE = "Function.prototype.bind called on incompatible ";
    var toStr = Object.prototype.toString;
    var max = Math.max;
    var funcType = "[object Function]";
    var concatty = function concatty2(a, b) {
      var arr = [];
      for (var i = 0; i < a.length; i += 1) {
        arr[i] = a[i];
      }
      for (var j = 0; j < b.length; j += 1) {
        arr[j + a.length] = b[j];
      }
      return arr;
    };
    var slicy = function slicy2(arrLike, offset) {
      var arr = [];
      for (var i = offset, j = 0; i < arrLike.length; i += 1, j += 1) {
        arr[j] = arrLike[i];
      }
      return arr;
    };
    var joiny = function(arr, joiner) {
      var str = "";
      for (var i = 0; i < arr.length; i += 1) {
        str += arr[i];
        if (i + 1 < arr.length) {
          str += joiner;
        }
      }
      return str;
    };
    exports$a = function bind(that) {
      var target = this;
      if (typeof target !== "function" || toStr.apply(target) !== funcType) {
        throw new TypeError(ERROR_MESSAGE + target);
      }
      var args = slicy(arguments, 1);
      var bound;
      var binder = function() {
        if (this instanceof bound) {
          var result = target.apply(this, concatty(args, arguments));
          if (Object(result) === result) {
            return result;
          }
          return this;
        }
        return target.apply(that, concatty(args, arguments));
      };
      var boundLength = max(0, target.length - args.length);
      var boundArgs = [];
      for (var i = 0; i < boundLength; i++) {
        boundArgs[i] = "$" + i;
      }
      bound = Function("binder", "return function (" + joiny(boundArgs, ",") + "){ return binder.apply(this,arguments); }")(binder);
      if (target.prototype) {
        var Empty = function Empty2() {
        };
        Empty.prototype = target.prototype;
        bound.prototype = new Empty();
        Empty.prototype = null;
      }
      return bound;
    };
    return exports$a;
  }
  function dew$9() {
    if (_dewExec$9) return exports$9;
    _dewExec$9 = true;
    var implementation = dew$a();
    exports$9 = Function.prototype.bind || implementation;
    return exports$9;
  }
  function dew$8() {
    if (_dewExec$8) return exports$8;
    _dewExec$8 = true;
    var call = Function.prototype.call;
    var $hasOwn = Object.prototype.hasOwnProperty;
    var bind = dew$9();
    exports$8 = bind.call(call, $hasOwn);
    return exports$8;
  }
  function dew$7() {
    if (_dewExec$7) return exports$7;
    _dewExec$7 = true;
    var undefined$1;
    var $Error = dew$j();
    var $EvalError = dew$i();
    var $RangeError = dew$h();
    var $ReferenceError = dew$g();
    var $SyntaxError = dew$f();
    var $TypeError = dew$e();
    var $URIError = dew$d();
    var $Function = Function;
    var getEvalledConstructor = function(expressionSyntax) {
      try {
        return $Function('"use strict"; return (' + expressionSyntax + ").constructor;")();
      } catch (e) {
      }
    };
    var $gOPD = Object.getOwnPropertyDescriptor;
    if ($gOPD) {
      try {
        $gOPD({}, "");
      } catch (e) {
        $gOPD = null;
      }
    }
    var throwTypeError = function() {
      throw new $TypeError();
    };
    var ThrowTypeError = $gOPD ? function() {
      try {
        arguments.callee;
        return throwTypeError;
      } catch (calleeThrows) {
        try {
          return $gOPD(arguments, "callee").get;
        } catch (gOPDthrows) {
          return throwTypeError;
        }
      }
    }() : throwTypeError;
    var hasSymbols = dew$c()();
    var hasProto = dew$b()();
    var getProto = Object.getPrototypeOf || (hasProto ? function(x) {
      return x.__proto__;
    } : null);
    var needsEval = {};
    var TypedArray = typeof Uint8Array === "undefined" || !getProto ? undefined$1 : getProto(Uint8Array);
    var INTRINSICS = {
      __proto__: null,
      "%AggregateError%": typeof AggregateError === "undefined" ? undefined$1 : AggregateError,
      "%Array%": Array,
      "%ArrayBuffer%": typeof ArrayBuffer === "undefined" ? undefined$1 : ArrayBuffer,
      "%ArrayIteratorPrototype%": hasSymbols && getProto ? getProto([][Symbol.iterator]()) : undefined$1,
      "%AsyncFromSyncIteratorPrototype%": undefined$1,
      "%AsyncFunction%": needsEval,
      "%AsyncGenerator%": needsEval,
      "%AsyncGeneratorFunction%": needsEval,
      "%AsyncIteratorPrototype%": needsEval,
      "%Atomics%": typeof Atomics === "undefined" ? undefined$1 : Atomics,
      "%BigInt%": typeof BigInt === "undefined" ? undefined$1 : BigInt,
      "%BigInt64Array%": typeof BigInt64Array === "undefined" ? undefined$1 : BigInt64Array,
      "%BigUint64Array%": typeof BigUint64Array === "undefined" ? undefined$1 : BigUint64Array,
      "%Boolean%": Boolean,
      "%DataView%": typeof DataView === "undefined" ? undefined$1 : DataView,
      "%Date%": Date,
      "%decodeURI%": decodeURI,
      "%decodeURIComponent%": decodeURIComponent,
      "%encodeURI%": encodeURI,
      "%encodeURIComponent%": encodeURIComponent,
      "%Error%": $Error,
      "%eval%": eval,
      // eslint-disable-line no-eval
      "%EvalError%": $EvalError,
      "%Float32Array%": typeof Float32Array === "undefined" ? undefined$1 : Float32Array,
      "%Float64Array%": typeof Float64Array === "undefined" ? undefined$1 : Float64Array,
      "%FinalizationRegistry%": typeof FinalizationRegistry === "undefined" ? undefined$1 : FinalizationRegistry,
      "%Function%": $Function,
      "%GeneratorFunction%": needsEval,
      "%Int8Array%": typeof Int8Array === "undefined" ? undefined$1 : Int8Array,
      "%Int16Array%": typeof Int16Array === "undefined" ? undefined$1 : Int16Array,
      "%Int32Array%": typeof Int32Array === "undefined" ? undefined$1 : Int32Array,
      "%isFinite%": isFinite,
      "%isNaN%": isNaN,
      "%IteratorPrototype%": hasSymbols && getProto ? getProto(getProto([][Symbol.iterator]())) : undefined$1,
      "%JSON%": typeof JSON === "object" ? JSON : undefined$1,
      "%Map%": typeof Map === "undefined" ? undefined$1 : Map,
      "%MapIteratorPrototype%": typeof Map === "undefined" || !hasSymbols || !getProto ? undefined$1 : getProto((/* @__PURE__ */ new Map())[Symbol.iterator]()),
      "%Math%": Math,
      "%Number%": Number,
      "%Object%": Object,
      "%parseFloat%": parseFloat,
      "%parseInt%": parseInt,
      "%Promise%": typeof Promise === "undefined" ? undefined$1 : Promise,
      "%Proxy%": typeof Proxy === "undefined" ? undefined$1 : Proxy,
      "%RangeError%": $RangeError,
      "%ReferenceError%": $ReferenceError,
      "%Reflect%": typeof Reflect === "undefined" ? undefined$1 : Reflect,
      "%RegExp%": RegExp,
      "%Set%": typeof Set === "undefined" ? undefined$1 : Set,
      "%SetIteratorPrototype%": typeof Set === "undefined" || !hasSymbols || !getProto ? undefined$1 : getProto((/* @__PURE__ */ new Set())[Symbol.iterator]()),
      "%SharedArrayBuffer%": typeof SharedArrayBuffer === "undefined" ? undefined$1 : SharedArrayBuffer,
      "%String%": String,
      "%StringIteratorPrototype%": hasSymbols && getProto ? getProto(""[Symbol.iterator]()) : undefined$1,
      "%Symbol%": hasSymbols ? Symbol : undefined$1,
      "%SyntaxError%": $SyntaxError,
      "%ThrowTypeError%": ThrowTypeError,
      "%TypedArray%": TypedArray,
      "%TypeError%": $TypeError,
      "%Uint8Array%": typeof Uint8Array === "undefined" ? undefined$1 : Uint8Array,
      "%Uint8ClampedArray%": typeof Uint8ClampedArray === "undefined" ? undefined$1 : Uint8ClampedArray,
      "%Uint16Array%": typeof Uint16Array === "undefined" ? undefined$1 : Uint16Array,
      "%Uint32Array%": typeof Uint32Array === "undefined" ? undefined$1 : Uint32Array,
      "%URIError%": $URIError,
      "%WeakMap%": typeof WeakMap === "undefined" ? undefined$1 : WeakMap,
      "%WeakRef%": typeof WeakRef === "undefined" ? undefined$1 : WeakRef,
      "%WeakSet%": typeof WeakSet === "undefined" ? undefined$1 : WeakSet
    };
    if (getProto) {
      try {
        null.error;
      } catch (e) {
        var errorProto = getProto(getProto(e));
        INTRINSICS["%Error.prototype%"] = errorProto;
      }
    }
    var doEval = function doEval2(name2) {
      var value;
      if (name2 === "%AsyncFunction%") {
        value = getEvalledConstructor("async function () {}");
      } else if (name2 === "%GeneratorFunction%") {
        value = getEvalledConstructor("function* () {}");
      } else if (name2 === "%AsyncGeneratorFunction%") {
        value = getEvalledConstructor("async function* () {}");
      } else if (name2 === "%AsyncGenerator%") {
        var fn = doEval2("%AsyncGeneratorFunction%");
        if (fn) {
          value = fn.prototype;
        }
      } else if (name2 === "%AsyncIteratorPrototype%") {
        var gen = doEval2("%AsyncGenerator%");
        if (gen && getProto) {
          value = getProto(gen.prototype);
        }
      }
      INTRINSICS[name2] = value;
      return value;
    };
    var LEGACY_ALIASES = {
      __proto__: null,
      "%ArrayBufferPrototype%": ["ArrayBuffer", "prototype"],
      "%ArrayPrototype%": ["Array", "prototype"],
      "%ArrayProto_entries%": ["Array", "prototype", "entries"],
      "%ArrayProto_forEach%": ["Array", "prototype", "forEach"],
      "%ArrayProto_keys%": ["Array", "prototype", "keys"],
      "%ArrayProto_values%": ["Array", "prototype", "values"],
      "%AsyncFunctionPrototype%": ["AsyncFunction", "prototype"],
      "%AsyncGenerator%": ["AsyncGeneratorFunction", "prototype"],
      "%AsyncGeneratorPrototype%": ["AsyncGeneratorFunction", "prototype", "prototype"],
      "%BooleanPrototype%": ["Boolean", "prototype"],
      "%DataViewPrototype%": ["DataView", "prototype"],
      "%DatePrototype%": ["Date", "prototype"],
      "%ErrorPrototype%": ["Error", "prototype"],
      "%EvalErrorPrototype%": ["EvalError", "prototype"],
      "%Float32ArrayPrototype%": ["Float32Array", "prototype"],
      "%Float64ArrayPrototype%": ["Float64Array", "prototype"],
      "%FunctionPrototype%": ["Function", "prototype"],
      "%Generator%": ["GeneratorFunction", "prototype"],
      "%GeneratorPrototype%": ["GeneratorFunction", "prototype", "prototype"],
      "%Int8ArrayPrototype%": ["Int8Array", "prototype"],
      "%Int16ArrayPrototype%": ["Int16Array", "prototype"],
      "%Int32ArrayPrototype%": ["Int32Array", "prototype"],
      "%JSONParse%": ["JSON", "parse"],
      "%JSONStringify%": ["JSON", "stringify"],
      "%MapPrototype%": ["Map", "prototype"],
      "%NumberPrototype%": ["Number", "prototype"],
      "%ObjectPrototype%": ["Object", "prototype"],
      "%ObjProto_toString%": ["Object", "prototype", "toString"],
      "%ObjProto_valueOf%": ["Object", "prototype", "valueOf"],
      "%PromisePrototype%": ["Promise", "prototype"],
      "%PromiseProto_then%": ["Promise", "prototype", "then"],
      "%Promise_all%": ["Promise", "all"],
      "%Promise_reject%": ["Promise", "reject"],
      "%Promise_resolve%": ["Promise", "resolve"],
      "%RangeErrorPrototype%": ["RangeError", "prototype"],
      "%ReferenceErrorPrototype%": ["ReferenceError", "prototype"],
      "%RegExpPrototype%": ["RegExp", "prototype"],
      "%SetPrototype%": ["Set", "prototype"],
      "%SharedArrayBufferPrototype%": ["SharedArrayBuffer", "prototype"],
      "%StringPrototype%": ["String", "prototype"],
      "%SymbolPrototype%": ["Symbol", "prototype"],
      "%SyntaxErrorPrototype%": ["SyntaxError", "prototype"],
      "%TypedArrayPrototype%": ["TypedArray", "prototype"],
      "%TypeErrorPrototype%": ["TypeError", "prototype"],
      "%Uint8ArrayPrototype%": ["Uint8Array", "prototype"],
      "%Uint8ClampedArrayPrototype%": ["Uint8ClampedArray", "prototype"],
      "%Uint16ArrayPrototype%": ["Uint16Array", "prototype"],
      "%Uint32ArrayPrototype%": ["Uint32Array", "prototype"],
      "%URIErrorPrototype%": ["URIError", "prototype"],
      "%WeakMapPrototype%": ["WeakMap", "prototype"],
      "%WeakSetPrototype%": ["WeakSet", "prototype"]
    };
    var bind = dew$9();
    var hasOwn = dew$8();
    var $concat = bind.call(Function.call, Array.prototype.concat);
    var $spliceApply = bind.call(Function.apply, Array.prototype.splice);
    var $replace = bind.call(Function.call, String.prototype.replace);
    var $strSlice = bind.call(Function.call, String.prototype.slice);
    var $exec = bind.call(Function.call, RegExp.prototype.exec);
    var rePropName = /[^%.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|%$))/g;
    var reEscapeChar = /\\(\\)?/g;
    var stringToPath = function stringToPath2(string) {
      var first = $strSlice(string, 0, 1);
      var last = $strSlice(string, -1);
      if (first === "%" && last !== "%") {
        throw new $SyntaxError("invalid intrinsic syntax, expected closing `%`");
      } else if (last === "%" && first !== "%") {
        throw new $SyntaxError("invalid intrinsic syntax, expected opening `%`");
      }
      var result = [];
      $replace(string, rePropName, function(match, number, quote, subString) {
        result[result.length] = quote ? $replace(subString, reEscapeChar, "$1") : number || match;
      });
      return result;
    };
    var getBaseIntrinsic = function getBaseIntrinsic2(name2, allowMissing) {
      var intrinsicName = name2;
      var alias;
      if (hasOwn(LEGACY_ALIASES, intrinsicName)) {
        alias = LEGACY_ALIASES[intrinsicName];
        intrinsicName = "%" + alias[0] + "%";
      }
      if (hasOwn(INTRINSICS, intrinsicName)) {
        var value = INTRINSICS[intrinsicName];
        if (value === needsEval) {
          value = doEval(intrinsicName);
        }
        if (typeof value === "undefined" && !allowMissing) {
          throw new $TypeError("intrinsic " + name2 + " exists, but is not available. Please file an issue!");
        }
        return {
          alias,
          name: intrinsicName,
          value
        };
      }
      throw new $SyntaxError("intrinsic " + name2 + " does not exist!");
    };
    exports$7 = function GetIntrinsic(name2, allowMissing) {
      if (typeof name2 !== "string" || name2.length === 0) {
        throw new $TypeError("intrinsic name must be a non-empty string");
      }
      if (arguments.length > 1 && typeof allowMissing !== "boolean") {
        throw new $TypeError('"allowMissing" argument must be a boolean');
      }
      if ($exec(/^%?[^%]*%?$/, name2) === null) {
        throw new $SyntaxError("`%` may not be present anywhere but at the beginning and end of the intrinsic name");
      }
      var parts = stringToPath(name2);
      var intrinsicBaseName = parts.length > 0 ? parts[0] : "";
      var intrinsic = getBaseIntrinsic("%" + intrinsicBaseName + "%", allowMissing);
      var intrinsicRealName = intrinsic.name;
      var value = intrinsic.value;
      var skipFurtherCaching = false;
      var alias = intrinsic.alias;
      if (alias) {
        intrinsicBaseName = alias[0];
        $spliceApply(parts, $concat([0, 1], alias));
      }
      for (var i = 1, isOwn = true; i < parts.length; i += 1) {
        var part = parts[i];
        var first = $strSlice(part, 0, 1);
        var last = $strSlice(part, -1);
        if ((first === '"' || first === "'" || first === "`" || last === '"' || last === "'" || last === "`") && first !== last) {
          throw new $SyntaxError("property names with quotes must have matching quotes");
        }
        if (part === "constructor" || !isOwn) {
          skipFurtherCaching = true;
        }
        intrinsicBaseName += "." + part;
        intrinsicRealName = "%" + intrinsicBaseName + "%";
        if (hasOwn(INTRINSICS, intrinsicRealName)) {
          value = INTRINSICS[intrinsicRealName];
        } else if (value != null) {
          if (!(part in value)) {
            if (!allowMissing) {
              throw new $TypeError("base intrinsic for " + name2 + " exists, but the property is not available.");
            }
            return void undefined$1;
          }
          if ($gOPD && i + 1 >= parts.length) {
            var desc = $gOPD(value, part);
            isOwn = !!desc;
            if (isOwn && "get" in desc && !("originalValue" in desc.get)) {
              value = desc.get;
            } else {
              value = value[part];
            }
          } else {
            isOwn = hasOwn(value, part);
            value = value[part];
          }
          if (isOwn && !skipFurtherCaching) {
            INTRINSICS[intrinsicRealName] = value;
          }
        }
      }
      return value;
    };
    return exports$7;
  }
  function dew$6() {
    if (_dewExec$6) return exports$6;
    _dewExec$6 = true;
    var GetIntrinsic = dew$7();
    var $defineProperty = GetIntrinsic("%Object.defineProperty%", true) || false;
    if ($defineProperty) {
      try {
        $defineProperty({}, "a", {
          value: 1
        });
      } catch (e) {
        $defineProperty = false;
      }
    }
    exports$6 = $defineProperty;
    return exports$6;
  }
  function dew$5() {
    if (_dewExec$5) return exports$5;
    _dewExec$5 = true;
    var GetIntrinsic = dew$7();
    var $gOPD = GetIntrinsic("%Object.getOwnPropertyDescriptor%", true);
    if ($gOPD) {
      try {
        $gOPD([], "length");
      } catch (e) {
        $gOPD = null;
      }
    }
    exports$5 = $gOPD;
    return exports$5;
  }
  function dew$4() {
    if (_dewExec$4) return exports$4;
    _dewExec$4 = true;
    var $defineProperty = dew$6();
    var $SyntaxError = dew$f();
    var $TypeError = dew$e();
    var gopd = dew$5();
    exports$4 = function defineDataProperty(obj, property, value) {
      if (!obj || typeof obj !== "object" && typeof obj !== "function") {
        throw new $TypeError("`obj` must be an object or a function`");
      }
      if (typeof property !== "string" && typeof property !== "symbol") {
        throw new $TypeError("`property` must be a string or a symbol`");
      }
      if (arguments.length > 3 && typeof arguments[3] !== "boolean" && arguments[3] !== null) {
        throw new $TypeError("`nonEnumerable`, if provided, must be a boolean or null");
      }
      if (arguments.length > 4 && typeof arguments[4] !== "boolean" && arguments[4] !== null) {
        throw new $TypeError("`nonWritable`, if provided, must be a boolean or null");
      }
      if (arguments.length > 5 && typeof arguments[5] !== "boolean" && arguments[5] !== null) {
        throw new $TypeError("`nonConfigurable`, if provided, must be a boolean or null");
      }
      if (arguments.length > 6 && typeof arguments[6] !== "boolean") {
        throw new $TypeError("`loose`, if provided, must be a boolean");
      }
      var nonEnumerable = arguments.length > 3 ? arguments[3] : null;
      var nonWritable = arguments.length > 4 ? arguments[4] : null;
      var nonConfigurable = arguments.length > 5 ? arguments[5] : null;
      var loose = arguments.length > 6 ? arguments[6] : false;
      var desc = !!gopd && gopd(obj, property);
      if ($defineProperty) {
        $defineProperty(obj, property, {
          configurable: nonConfigurable === null && desc ? desc.configurable : !nonConfigurable,
          enumerable: nonEnumerable === null && desc ? desc.enumerable : !nonEnumerable,
          value,
          writable: nonWritable === null && desc ? desc.writable : !nonWritable
        });
      } else if (loose || !nonEnumerable && !nonWritable && !nonConfigurable) {
        obj[property] = value;
      } else {
        throw new $SyntaxError("This environment does not support defining a property as non-configurable, non-writable, or non-enumerable.");
      }
    };
    return exports$4;
  }
  function dew$3() {
    if (_dewExec$3) return exports$3;
    _dewExec$3 = true;
    var $defineProperty = dew$6();
    var hasPropertyDescriptors = function hasPropertyDescriptors2() {
      return !!$defineProperty;
    };
    hasPropertyDescriptors.hasArrayLengthDefineBug = function hasArrayLengthDefineBug() {
      if (!$defineProperty) {
        return null;
      }
      try {
        return $defineProperty([], "length", {
          value: 1
        }).length !== 1;
      } catch (e) {
        return true;
      }
    };
    exports$3 = hasPropertyDescriptors;
    return exports$3;
  }
  function dew$22() {
    if (_dewExec$22) return exports$22;
    _dewExec$22 = true;
    var GetIntrinsic = dew$7();
    var define2 = dew$4();
    var hasDescriptors = dew$3()();
    var gOPD = dew$5();
    var $TypeError = dew$e();
    var $floor = GetIntrinsic("%Math.floor%");
    exports$22 = function setFunctionLength(fn, length) {
      if (typeof fn !== "function") {
        throw new $TypeError("`fn` is not a function");
      }
      if (typeof length !== "number" || length < 0 || length > 4294967295 || $floor(length) !== length) {
        throw new $TypeError("`length` must be a positive 32-bit integer");
      }
      var loose = arguments.length > 2 && !!arguments[2];
      var functionLengthIsConfigurable = true;
      var functionLengthIsWritable = true;
      if ("length" in fn && gOPD) {
        var desc = gOPD(fn, "length");
        if (desc && !desc.configurable) {
          functionLengthIsConfigurable = false;
        }
        if (desc && !desc.writable) {
          functionLengthIsWritable = false;
        }
      }
      if (functionLengthIsConfigurable || functionLengthIsWritable || !loose) {
        if (hasDescriptors) {
          define2(
            /** @type {Parameters<define>[0]} */
            fn,
            "length",
            length,
            true,
            true
          );
        } else {
          define2(
            /** @type {Parameters<define>[0]} */
            fn,
            "length",
            length
          );
        }
      }
      return fn;
    };
    return exports$22;
  }
  function dew$12() {
    if (_dewExec$12) return exports$14;
    _dewExec$12 = true;
    var bind = dew$9();
    var GetIntrinsic = dew$7();
    var setFunctionLength = dew$22();
    var $TypeError = dew$e();
    var $apply = GetIntrinsic("%Function.prototype.apply%");
    var $call = GetIntrinsic("%Function.prototype.call%");
    var $reflectApply = GetIntrinsic("%Reflect.apply%", true) || bind.call($call, $apply);
    var $defineProperty = dew$6();
    var $max = GetIntrinsic("%Math.max%");
    exports$14 = function callBind(originalFunction) {
      if (typeof originalFunction !== "function") {
        throw new $TypeError("a function is required");
      }
      var func = $reflectApply(bind, $call, arguments);
      return setFunctionLength(func, 1 + $max(0, originalFunction.length - (arguments.length - 1)), true);
    };
    var applyBind = function applyBind2() {
      return $reflectApply(bind, $apply, arguments);
    };
    if ($defineProperty) {
      $defineProperty(exports$14, "apply", {
        value: applyBind
      });
    } else {
      exports$14.apply = applyBind;
    }
    return exports$14;
  }
  function dew4() {
    if (_dewExec4) return exports5;
    _dewExec4 = true;
    var GetIntrinsic = dew$7();
    var callBind = dew$12();
    var $indexOf = callBind(GetIntrinsic("String.prototype.indexOf"));
    exports5 = function callBoundIntrinsic(name2, allowMissing) {
      var intrinsic = GetIntrinsic(name2, !!allowMissing);
      if (typeof intrinsic === "function" && $indexOf(name2, ".prototype.") > -1) {
        return callBind(intrinsic);
      }
      return intrinsic;
    };
    return exports5;
  }
  var exports$k, _dewExec$k, exports$j, _dewExec$j, exports$i, _dewExec$i, exports$h, _dewExec$h, exports$g, _dewExec$g, exports$f, _dewExec$f, exports$e, _dewExec$e, exports$d, _dewExec$d, exports$c, _dewExec$c, exports$b, _dewExec$b, exports$a, _dewExec$a, exports$9, _dewExec$9, exports$8, _dewExec$8, exports$7, _dewExec$7, exports$6, _dewExec$6, exports$5, _dewExec$5, exports$4, _dewExec$4, exports$3, _dewExec$3, exports$22, _dewExec$22, exports$14, _dewExec$12, exports5, _dewExec4;
  var init_chunk_DtcTpLWz = __esm({
    "node_modules/@jspm/core/nodelibs/browser/chunk-DtcTpLWz.js"() {
      init_dirname();
      init_buffer2();
      init_process2();
      exports$k = {};
      _dewExec$k = false;
      exports$j = {};
      _dewExec$j = false;
      exports$i = {};
      _dewExec$i = false;
      exports$h = {};
      _dewExec$h = false;
      exports$g = {};
      _dewExec$g = false;
      exports$f = {};
      _dewExec$f = false;
      exports$e = {};
      _dewExec$e = false;
      exports$d = {};
      _dewExec$d = false;
      exports$c = {};
      _dewExec$c = false;
      exports$b = {};
      _dewExec$b = false;
      exports$a = {};
      _dewExec$a = false;
      exports$9 = {};
      _dewExec$9 = false;
      exports$8 = {};
      _dewExec$8 = false;
      exports$7 = {};
      _dewExec$7 = false;
      exports$6 = {};
      _dewExec$6 = false;
      exports$5 = {};
      _dewExec$5 = false;
      exports$4 = {};
      _dewExec$4 = false;
      exports$3 = {};
      _dewExec$3 = false;
      exports$22 = {};
      _dewExec$22 = false;
      exports$14 = {};
      _dewExec$12 = false;
      exports5 = {};
      _dewExec4 = false;
    }
  });

  // node_modules/@jspm/core/nodelibs/browser/chunk-DEMDiNwt.js
  function unimplemented2(name2) {
    throw new Error("Node.js process " + name2 + " is not supported by JSPM core outside of Node.js");
  }
  function cleanUpNextTick2() {
    if (!draining2 || !currentQueue2)
      return;
    draining2 = false;
    if (currentQueue2.length) {
      queue2 = currentQueue2.concat(queue2);
    } else {
      queueIndex2 = -1;
    }
    if (queue2.length)
      drainQueue2();
  }
  function drainQueue2() {
    if (draining2)
      return;
    var timeout = setTimeout(cleanUpNextTick2, 0);
    draining2 = true;
    var len = queue2.length;
    while (len) {
      currentQueue2 = queue2;
      queue2 = [];
      while (++queueIndex2 < len) {
        if (currentQueue2)
          currentQueue2[queueIndex2].run();
      }
      queueIndex2 = -1;
      len = queue2.length;
    }
    currentQueue2 = null;
    draining2 = false;
    clearTimeout(timeout);
  }
  function nextTick2(fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
      for (var i = 1; i < arguments.length; i++)
        args[i - 1] = arguments[i];
    }
    queue2.push(new Item2(fun, args));
    if (queue2.length === 1 && !draining2)
      setTimeout(drainQueue2, 0);
  }
  function Item2(fun, array) {
    this.fun = fun;
    this.array = array;
  }
  function noop2() {
  }
  function _linkedBinding2(name2) {
    unimplemented2("_linkedBinding");
  }
  function dlopen2(name2) {
    unimplemented2("dlopen");
  }
  function _getActiveRequests2() {
    return [];
  }
  function _getActiveHandles2() {
    return [];
  }
  function assert2(condition, message) {
    if (!condition) throw new Error(message || "assertion error");
  }
  function hasUncaughtExceptionCaptureCallback2() {
    return false;
  }
  function uptime2() {
    return _performance2.now() / 1e3;
  }
  function hrtime2(previousTimestamp) {
    var baseNow = Math.floor((Date.now() - _performance2.now()) * 1e-3);
    var clocktime = _performance2.now() * 1e-3;
    var seconds = Math.floor(clocktime) + baseNow;
    var nanoseconds = Math.floor(clocktime % 1 * 1e9);
    if (previousTimestamp) {
      seconds = seconds - previousTimestamp[0];
      nanoseconds = nanoseconds - previousTimestamp[1];
      if (nanoseconds < 0) {
        seconds--;
        nanoseconds += nanoPerSec2;
      }
    }
    return [seconds, nanoseconds];
  }
  function on3() {
    return process2;
  }
  function listeners2(name2) {
    return [];
  }
  var queue2, draining2, currentQueue2, queueIndex2, title2, arch2, platform2, env2, argv2, execArgv2, version3, versions2, emitWarning2, binding2, umask2, cwd2, chdir2, release2, _rawDebug2, moduleLoadList2, domain2, _exiting2, config2, reallyExit2, _kill2, cpuUsage2, resourceUsage2, memoryUsage2, kill2, exit2, openStdin2, allowedNodeEnvironmentFlags2, features2, _fatalExceptions2, setUncaughtExceptionCaptureCallback2, _tickCallback2, _debugProcess2, _debugEnd2, _startProfilerIdleNotifier2, _stopProfilerIdleNotifier2, stdout2, stderr2, stdin2, abort2, pid2, ppid2, execPath2, debugPort2, argv02, _preload_modules2, setSourceMapsEnabled2, _performance2, nowOffset, nanoPerSec2, _maxListeners2, _events2, _eventsCount2, addListener2, once3, off2, removeListener2, removeAllListeners2, emit2, prependListener2, prependOnceListener2, process2;
  var init_chunk_DEMDiNwt = __esm({
    "node_modules/@jspm/core/nodelibs/browser/chunk-DEMDiNwt.js"() {
      init_dirname();
      init_buffer2();
      init_process2();
      queue2 = [];
      draining2 = false;
      queueIndex2 = -1;
      Item2.prototype.run = function() {
        this.fun.apply(null, this.array);
      };
      title2 = "browser";
      arch2 = "x64";
      platform2 = "browser";
      env2 = {
        PATH: "/usr/bin",
        LANG: navigator.language + ".UTF-8",
        PWD: "/",
        HOME: "/home",
        TMP: "/tmp"
      };
      argv2 = ["/usr/bin/node"];
      execArgv2 = [];
      version3 = "v16.8.0";
      versions2 = {};
      emitWarning2 = function(message, type) {
        console.warn((type ? type + ": " : "") + message);
      };
      binding2 = function(name2) {
        unimplemented2("binding");
      };
      umask2 = function(mask) {
        return 0;
      };
      cwd2 = function() {
        return "/";
      };
      chdir2 = function(dir) {
      };
      release2 = {
        name: "node",
        sourceUrl: "",
        headersUrl: "",
        libUrl: ""
      };
      _rawDebug2 = noop2;
      moduleLoadList2 = [];
      domain2 = {};
      _exiting2 = false;
      config2 = {};
      reallyExit2 = noop2;
      _kill2 = noop2;
      cpuUsage2 = function() {
        return {};
      };
      resourceUsage2 = cpuUsage2;
      memoryUsage2 = cpuUsage2;
      kill2 = noop2;
      exit2 = noop2;
      openStdin2 = noop2;
      allowedNodeEnvironmentFlags2 = {};
      features2 = {
        inspector: false,
        debug: false,
        uv: false,
        ipv6: false,
        tls_alpn: false,
        tls_sni: false,
        tls_ocsp: false,
        tls: false,
        cached_builtins: true
      };
      _fatalExceptions2 = noop2;
      setUncaughtExceptionCaptureCallback2 = noop2;
      _tickCallback2 = noop2;
      _debugProcess2 = noop2;
      _debugEnd2 = noop2;
      _startProfilerIdleNotifier2 = noop2;
      _stopProfilerIdleNotifier2 = noop2;
      stdout2 = void 0;
      stderr2 = void 0;
      stdin2 = void 0;
      abort2 = noop2;
      pid2 = 2;
      ppid2 = 1;
      execPath2 = "/bin/usr/node";
      debugPort2 = 9229;
      argv02 = "node";
      _preload_modules2 = [];
      setSourceMapsEnabled2 = noop2;
      _performance2 = {
        now: typeof performance !== "undefined" ? performance.now.bind(performance) : void 0,
        timing: typeof performance !== "undefined" ? performance.timing : void 0
      };
      if (_performance2.now === void 0) {
        nowOffset = Date.now();
        if (_performance2.timing && _performance2.timing.navigationStart) {
          nowOffset = _performance2.timing.navigationStart;
        }
        _performance2.now = () => Date.now() - nowOffset;
      }
      nanoPerSec2 = 1e9;
      hrtime2.bigint = function(time) {
        var diff = hrtime2(time);
        if (typeof BigInt === "undefined") {
          return diff[0] * nanoPerSec2 + diff[1];
        }
        return BigInt(diff[0] * nanoPerSec2) + BigInt(diff[1]);
      };
      _maxListeners2 = 10;
      _events2 = {};
      _eventsCount2 = 0;
      addListener2 = on3;
      once3 = on3;
      off2 = on3;
      removeListener2 = on3;
      removeAllListeners2 = on3;
      emit2 = noop2;
      prependListener2 = on3;
      prependOnceListener2 = on3;
      process2 = {
        version: version3,
        versions: versions2,
        arch: arch2,
        platform: platform2,
        release: release2,
        _rawDebug: _rawDebug2,
        moduleLoadList: moduleLoadList2,
        binding: binding2,
        _linkedBinding: _linkedBinding2,
        _events: _events2,
        _eventsCount: _eventsCount2,
        _maxListeners: _maxListeners2,
        on: on3,
        addListener: addListener2,
        once: once3,
        off: off2,
        removeListener: removeListener2,
        removeAllListeners: removeAllListeners2,
        emit: emit2,
        prependListener: prependListener2,
        prependOnceListener: prependOnceListener2,
        listeners: listeners2,
        domain: domain2,
        _exiting: _exiting2,
        config: config2,
        dlopen: dlopen2,
        uptime: uptime2,
        _getActiveRequests: _getActiveRequests2,
        _getActiveHandles: _getActiveHandles2,
        reallyExit: reallyExit2,
        _kill: _kill2,
        cpuUsage: cpuUsage2,
        resourceUsage: resourceUsage2,
        memoryUsage: memoryUsage2,
        kill: kill2,
        exit: exit2,
        openStdin: openStdin2,
        allowedNodeEnvironmentFlags: allowedNodeEnvironmentFlags2,
        assert: assert2,
        features: features2,
        _fatalExceptions: _fatalExceptions2,
        setUncaughtExceptionCaptureCallback: setUncaughtExceptionCaptureCallback2,
        hasUncaughtExceptionCaptureCallback: hasUncaughtExceptionCaptureCallback2,
        emitWarning: emitWarning2,
        nextTick: nextTick2,
        _tickCallback: _tickCallback2,
        _debugProcess: _debugProcess2,
        _debugEnd: _debugEnd2,
        _startProfilerIdleNotifier: _startProfilerIdleNotifier2,
        _stopProfilerIdleNotifier: _stopProfilerIdleNotifier2,
        stdout: stdout2,
        stdin: stdin2,
        stderr: stderr2,
        abort: abort2,
        umask: umask2,
        chdir: chdir2,
        cwd: cwd2,
        env: env2,
        title: title2,
        argv: argv2,
        execArgv: execArgv2,
        pid: pid2,
        ppid: ppid2,
        execPath: execPath2,
        debugPort: debugPort2,
        hrtime: hrtime2,
        argv0: argv02,
        _preload_modules: _preload_modules2,
        setSourceMapsEnabled: setSourceMapsEnabled2
      };
    }
  });

  // node_modules/@jspm/core/nodelibs/browser/chunk-BlJi4mNy.js
  function dew5() {
    if (_dewExec5) return exports$15;
    _dewExec5 = true;
    var process$1 = process2;
    function assertPath(path) {
      if (typeof path !== "string") {
        throw new TypeError("Path must be a string. Received " + JSON.stringify(path));
      }
    }
    function normalizeStringPosix(path, allowAboveRoot) {
      var res = "";
      var lastSegmentLength = 0;
      var lastSlash = -1;
      var dots = 0;
      var code;
      for (var i = 0; i <= path.length; ++i) {
        if (i < path.length) code = path.charCodeAt(i);
        else if (code === 47) break;
        else code = 47;
        if (code === 47) {
          if (lastSlash === i - 1 || dots === 1) ;
          else if (lastSlash !== i - 1 && dots === 2) {
            if (res.length < 2 || lastSegmentLength !== 2 || res.charCodeAt(res.length - 1) !== 46 || res.charCodeAt(res.length - 2) !== 46) {
              if (res.length > 2) {
                var lastSlashIndex = res.lastIndexOf("/");
                if (lastSlashIndex !== res.length - 1) {
                  if (lastSlashIndex === -1) {
                    res = "";
                    lastSegmentLength = 0;
                  } else {
                    res = res.slice(0, lastSlashIndex);
                    lastSegmentLength = res.length - 1 - res.lastIndexOf("/");
                  }
                  lastSlash = i;
                  dots = 0;
                  continue;
                }
              } else if (res.length === 2 || res.length === 1) {
                res = "";
                lastSegmentLength = 0;
                lastSlash = i;
                dots = 0;
                continue;
              }
            }
            if (allowAboveRoot) {
              if (res.length > 0) res += "/..";
              else res = "..";
              lastSegmentLength = 2;
            }
          } else {
            if (res.length > 0) res += "/" + path.slice(lastSlash + 1, i);
            else res = path.slice(lastSlash + 1, i);
            lastSegmentLength = i - lastSlash - 1;
          }
          lastSlash = i;
          dots = 0;
        } else if (code === 46 && dots !== -1) {
          ++dots;
        } else {
          dots = -1;
        }
      }
      return res;
    }
    function _format(sep, pathObject) {
      var dir = pathObject.dir || pathObject.root;
      var base = pathObject.base || (pathObject.name || "") + (pathObject.ext || "");
      if (!dir) {
        return base;
      }
      if (dir === pathObject.root) {
        return dir + base;
      }
      return dir + sep + base;
    }
    var posix = {
      // path.resolve([from ...], to)
      resolve: function resolve2() {
        var resolvedPath = "";
        var resolvedAbsolute = false;
        var cwd3;
        for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
          var path;
          if (i >= 0) path = arguments[i];
          else {
            if (cwd3 === void 0) cwd3 = process$1.cwd();
            path = cwd3;
          }
          assertPath(path);
          if (path.length === 0) {
            continue;
          }
          resolvedPath = path + "/" + resolvedPath;
          resolvedAbsolute = path.charCodeAt(0) === 47;
        }
        resolvedPath = normalizeStringPosix(resolvedPath, !resolvedAbsolute);
        if (resolvedAbsolute) {
          if (resolvedPath.length > 0) return "/" + resolvedPath;
          else return "/";
        } else if (resolvedPath.length > 0) {
          return resolvedPath;
        } else {
          return ".";
        }
      },
      normalize: function normalize(path) {
        assertPath(path);
        if (path.length === 0) return ".";
        var isAbsolute = path.charCodeAt(0) === 47;
        var trailingSeparator = path.charCodeAt(path.length - 1) === 47;
        path = normalizeStringPosix(path, !isAbsolute);
        if (path.length === 0 && !isAbsolute) path = ".";
        if (path.length > 0 && trailingSeparator) path += "/";
        if (isAbsolute) return "/" + path;
        return path;
      },
      isAbsolute: function isAbsolute(path) {
        assertPath(path);
        return path.length > 0 && path.charCodeAt(0) === 47;
      },
      join: function join() {
        if (arguments.length === 0) return ".";
        var joined;
        for (var i = 0; i < arguments.length; ++i) {
          var arg = arguments[i];
          assertPath(arg);
          if (arg.length > 0) {
            if (joined === void 0) joined = arg;
            else joined += "/" + arg;
          }
        }
        if (joined === void 0) return ".";
        return posix.normalize(joined);
      },
      relative: function relative(from, to) {
        assertPath(from);
        assertPath(to);
        if (from === to) return "";
        from = posix.resolve(from);
        to = posix.resolve(to);
        if (from === to) return "";
        var fromStart = 1;
        for (; fromStart < from.length; ++fromStart) {
          if (from.charCodeAt(fromStart) !== 47) break;
        }
        var fromEnd = from.length;
        var fromLen = fromEnd - fromStart;
        var toStart = 1;
        for (; toStart < to.length; ++toStart) {
          if (to.charCodeAt(toStart) !== 47) break;
        }
        var toEnd = to.length;
        var toLen = toEnd - toStart;
        var length = fromLen < toLen ? fromLen : toLen;
        var lastCommonSep = -1;
        var i = 0;
        for (; i <= length; ++i) {
          if (i === length) {
            if (toLen > length) {
              if (to.charCodeAt(toStart + i) === 47) {
                return to.slice(toStart + i + 1);
              } else if (i === 0) {
                return to.slice(toStart + i);
              }
            } else if (fromLen > length) {
              if (from.charCodeAt(fromStart + i) === 47) {
                lastCommonSep = i;
              } else if (i === 0) {
                lastCommonSep = 0;
              }
            }
            break;
          }
          var fromCode = from.charCodeAt(fromStart + i);
          var toCode = to.charCodeAt(toStart + i);
          if (fromCode !== toCode) break;
          else if (fromCode === 47) lastCommonSep = i;
        }
        var out = "";
        for (i = fromStart + lastCommonSep + 1; i <= fromEnd; ++i) {
          if (i === fromEnd || from.charCodeAt(i) === 47) {
            if (out.length === 0) out += "..";
            else out += "/..";
          }
        }
        if (out.length > 0) return out + to.slice(toStart + lastCommonSep);
        else {
          toStart += lastCommonSep;
          if (to.charCodeAt(toStart) === 47) ++toStart;
          return to.slice(toStart);
        }
      },
      _makeLong: function _makeLong(path) {
        return path;
      },
      dirname: function dirname(path) {
        assertPath(path);
        if (path.length === 0) return ".";
        var code = path.charCodeAt(0);
        var hasRoot = code === 47;
        var end = -1;
        var matchedSlash = true;
        for (var i = path.length - 1; i >= 1; --i) {
          code = path.charCodeAt(i);
          if (code === 47) {
            if (!matchedSlash) {
              end = i;
              break;
            }
          } else {
            matchedSlash = false;
          }
        }
        if (end === -1) return hasRoot ? "/" : ".";
        if (hasRoot && end === 1) return "//";
        return path.slice(0, end);
      },
      basename: function basename(path, ext) {
        if (ext !== void 0 && typeof ext !== "string") throw new TypeError('"ext" argument must be a string');
        assertPath(path);
        var start = 0;
        var end = -1;
        var matchedSlash = true;
        var i;
        if (ext !== void 0 && ext.length > 0 && ext.length <= path.length) {
          if (ext.length === path.length && ext === path) return "";
          var extIdx = ext.length - 1;
          var firstNonSlashEnd = -1;
          for (i = path.length - 1; i >= 0; --i) {
            var code = path.charCodeAt(i);
            if (code === 47) {
              if (!matchedSlash) {
                start = i + 1;
                break;
              }
            } else {
              if (firstNonSlashEnd === -1) {
                matchedSlash = false;
                firstNonSlashEnd = i + 1;
              }
              if (extIdx >= 0) {
                if (code === ext.charCodeAt(extIdx)) {
                  if (--extIdx === -1) {
                    end = i;
                  }
                } else {
                  extIdx = -1;
                  end = firstNonSlashEnd;
                }
              }
            }
          }
          if (start === end) end = firstNonSlashEnd;
          else if (end === -1) end = path.length;
          return path.slice(start, end);
        } else {
          for (i = path.length - 1; i >= 0; --i) {
            if (path.charCodeAt(i) === 47) {
              if (!matchedSlash) {
                start = i + 1;
                break;
              }
            } else if (end === -1) {
              matchedSlash = false;
              end = i + 1;
            }
          }
          if (end === -1) return "";
          return path.slice(start, end);
        }
      },
      extname: function extname(path) {
        assertPath(path);
        var startDot = -1;
        var startPart = 0;
        var end = -1;
        var matchedSlash = true;
        var preDotState = 0;
        for (var i = path.length - 1; i >= 0; --i) {
          var code = path.charCodeAt(i);
          if (code === 47) {
            if (!matchedSlash) {
              startPart = i + 1;
              break;
            }
            continue;
          }
          if (end === -1) {
            matchedSlash = false;
            end = i + 1;
          }
          if (code === 46) {
            if (startDot === -1) startDot = i;
            else if (preDotState !== 1) preDotState = 1;
          } else if (startDot !== -1) {
            preDotState = -1;
          }
        }
        if (startDot === -1 || end === -1 || // We saw a non-dot character immediately before the dot
        preDotState === 0 || // The (right-most) trimmed path component is exactly '..'
        preDotState === 1 && startDot === end - 1 && startDot === startPart + 1) {
          return "";
        }
        return path.slice(startDot, end);
      },
      format: function format2(pathObject) {
        if (pathObject === null || typeof pathObject !== "object") {
          throw new TypeError('The "pathObject" argument must be of type Object. Received type ' + typeof pathObject);
        }
        return _format("/", pathObject);
      },
      parse: function parse2(path) {
        assertPath(path);
        var ret = {
          root: "",
          dir: "",
          base: "",
          ext: "",
          name: ""
        };
        if (path.length === 0) return ret;
        var code = path.charCodeAt(0);
        var isAbsolute = code === 47;
        var start;
        if (isAbsolute) {
          ret.root = "/";
          start = 1;
        } else {
          start = 0;
        }
        var startDot = -1;
        var startPart = 0;
        var end = -1;
        var matchedSlash = true;
        var i = path.length - 1;
        var preDotState = 0;
        for (; i >= start; --i) {
          code = path.charCodeAt(i);
          if (code === 47) {
            if (!matchedSlash) {
              startPart = i + 1;
              break;
            }
            continue;
          }
          if (end === -1) {
            matchedSlash = false;
            end = i + 1;
          }
          if (code === 46) {
            if (startDot === -1) startDot = i;
            else if (preDotState !== 1) preDotState = 1;
          } else if (startDot !== -1) {
            preDotState = -1;
          }
        }
        if (startDot === -1 || end === -1 || // We saw a non-dot character immediately before the dot
        preDotState === 0 || // The (right-most) trimmed path component is exactly '..'
        preDotState === 1 && startDot === end - 1 && startDot === startPart + 1) {
          if (end !== -1) {
            if (startPart === 0 && isAbsolute) ret.base = ret.name = path.slice(1, end);
            else ret.base = ret.name = path.slice(startPart, end);
          }
        } else {
          if (startPart === 0 && isAbsolute) {
            ret.name = path.slice(1, startDot);
            ret.base = path.slice(1, end);
          } else {
            ret.name = path.slice(startPart, startDot);
            ret.base = path.slice(startPart, end);
          }
          ret.ext = path.slice(startDot, end);
        }
        if (startPart > 0) ret.dir = path.slice(0, startPart - 1);
        else if (isAbsolute) ret.dir = "/";
        return ret;
      },
      sep: "/",
      delimiter: ":",
      win32: null,
      posix: null
    };
    posix.posix = posix;
    exports$15 = posix;
    return exports$15;
  }
  var exports$15, _dewExec5, exports6;
  var init_chunk_BlJi4mNy = __esm({
    "node_modules/@jspm/core/nodelibs/browser/chunk-BlJi4mNy.js"() {
      init_dirname();
      init_buffer2();
      init_process2();
      init_chunk_DEMDiNwt();
      exports$15 = {};
      _dewExec5 = false;
      exports6 = dew5();
    }
  });

  // node_modules/@jspm/core/nodelibs/browser/url.js
  var url_exports = {};
  __export(url_exports, {
    URL: () => _URL,
    Url: () => Url,
    default: () => exports7,
    fileURLToPath: () => fileURLToPath,
    format: () => format,
    parse: () => parse,
    pathToFileURL: () => pathToFileURL,
    resolve: () => resolve,
    resolveObject: () => resolveObject
  });
  function dew$72() {
    if (_dewExec$72) return exports$82;
    _dewExec$72 = true;
    var hasMap = typeof Map === "function" && Map.prototype;
    var mapSizeDescriptor = Object.getOwnPropertyDescriptor && hasMap ? Object.getOwnPropertyDescriptor(Map.prototype, "size") : null;
    var mapSize = hasMap && mapSizeDescriptor && typeof mapSizeDescriptor.get === "function" ? mapSizeDescriptor.get : null;
    var mapForEach = hasMap && Map.prototype.forEach;
    var hasSet = typeof Set === "function" && Set.prototype;
    var setSizeDescriptor = Object.getOwnPropertyDescriptor && hasSet ? Object.getOwnPropertyDescriptor(Set.prototype, "size") : null;
    var setSize = hasSet && setSizeDescriptor && typeof setSizeDescriptor.get === "function" ? setSizeDescriptor.get : null;
    var setForEach = hasSet && Set.prototype.forEach;
    var hasWeakMap = typeof WeakMap === "function" && WeakMap.prototype;
    var weakMapHas = hasWeakMap ? WeakMap.prototype.has : null;
    var hasWeakSet = typeof WeakSet === "function" && WeakSet.prototype;
    var weakSetHas = hasWeakSet ? WeakSet.prototype.has : null;
    var hasWeakRef = typeof WeakRef === "function" && WeakRef.prototype;
    var weakRefDeref = hasWeakRef ? WeakRef.prototype.deref : null;
    var booleanValueOf = Boolean.prototype.valueOf;
    var objectToString = Object.prototype.toString;
    var functionToString = Function.prototype.toString;
    var $match = String.prototype.match;
    var $slice = String.prototype.slice;
    var $replace = String.prototype.replace;
    var $toUpperCase = String.prototype.toUpperCase;
    var $toLowerCase = String.prototype.toLowerCase;
    var $test = RegExp.prototype.test;
    var $concat = Array.prototype.concat;
    var $join = Array.prototype.join;
    var $arrSlice = Array.prototype.slice;
    var $floor = Math.floor;
    var bigIntValueOf = typeof BigInt === "function" ? BigInt.prototype.valueOf : null;
    var gOPS = Object.getOwnPropertySymbols;
    var symToString = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? Symbol.prototype.toString : null;
    var hasShammedSymbols = typeof Symbol === "function" && typeof Symbol.iterator === "object";
    var toStringTag = typeof Symbol === "function" && Symbol.toStringTag && (typeof Symbol.toStringTag === hasShammedSymbols ? "object" : "symbol") ? Symbol.toStringTag : null;
    var isEnumerable = Object.prototype.propertyIsEnumerable;
    var gPO = (typeof Reflect === "function" ? Reflect.getPrototypeOf : Object.getPrototypeOf) || ([].__proto__ === Array.prototype ? function(O) {
      return O.__proto__;
    } : null);
    function addNumericSeparator(num, str) {
      if (num === Infinity || num === -Infinity || num !== num || num && num > -1e3 && num < 1e3 || $test.call(/e/, str)) {
        return str;
      }
      var sepRegex = /[0-9](?=(?:[0-9]{3})+(?![0-9]))/g;
      if (typeof num === "number") {
        var int = num < 0 ? -$floor(-num) : $floor(num);
        if (int !== num) {
          var intStr = String(int);
          var dec = $slice.call(str, intStr.length + 1);
          return $replace.call(intStr, sepRegex, "$&_") + "." + $replace.call($replace.call(dec, /([0-9]{3})/g, "$&_"), /_$/, "");
        }
      }
      return $replace.call(str, sepRegex, "$&_");
    }
    var utilInspect = empty;
    var inspectCustom = utilInspect.custom;
    var inspectSymbol = isSymbol(inspectCustom) ? inspectCustom : null;
    exports$82 = function inspect_(obj, options, depth, seen) {
      var opts = options || {};
      if (has(opts, "quoteStyle") && opts.quoteStyle !== "single" && opts.quoteStyle !== "double") {
        throw new TypeError('option "quoteStyle" must be "single" or "double"');
      }
      if (has(opts, "maxStringLength") && (typeof opts.maxStringLength === "number" ? opts.maxStringLength < 0 && opts.maxStringLength !== Infinity : opts.maxStringLength !== null)) {
        throw new TypeError('option "maxStringLength", if provided, must be a positive integer, Infinity, or `null`');
      }
      var customInspect = has(opts, "customInspect") ? opts.customInspect : true;
      if (typeof customInspect !== "boolean" && customInspect !== "symbol") {
        throw new TypeError("option \"customInspect\", if provided, must be `true`, `false`, or `'symbol'`");
      }
      if (has(opts, "indent") && opts.indent !== null && opts.indent !== "	" && !(parseInt(opts.indent, 10) === opts.indent && opts.indent > 0)) {
        throw new TypeError('option "indent" must be "\\t", an integer > 0, or `null`');
      }
      if (has(opts, "numericSeparator") && typeof opts.numericSeparator !== "boolean") {
        throw new TypeError('option "numericSeparator", if provided, must be `true` or `false`');
      }
      var numericSeparator = opts.numericSeparator;
      if (typeof obj === "undefined") {
        return "undefined";
      }
      if (obj === null) {
        return "null";
      }
      if (typeof obj === "boolean") {
        return obj ? "true" : "false";
      }
      if (typeof obj === "string") {
        return inspectString(obj, opts);
      }
      if (typeof obj === "number") {
        if (obj === 0) {
          return Infinity / obj > 0 ? "0" : "-0";
        }
        var str = String(obj);
        return numericSeparator ? addNumericSeparator(obj, str) : str;
      }
      if (typeof obj === "bigint") {
        var bigIntStr = String(obj) + "n";
        return numericSeparator ? addNumericSeparator(obj, bigIntStr) : bigIntStr;
      }
      var maxDepth = typeof opts.depth === "undefined" ? 5 : opts.depth;
      if (typeof depth === "undefined") {
        depth = 0;
      }
      if (depth >= maxDepth && maxDepth > 0 && typeof obj === "object") {
        return isArray(obj) ? "[Array]" : "[Object]";
      }
      var indent = getIndent(opts, depth);
      if (typeof seen === "undefined") {
        seen = [];
      } else if (indexOf(seen, obj) >= 0) {
        return "[Circular]";
      }
      function inspect(value, from, noIndent) {
        if (from) {
          seen = $arrSlice.call(seen);
          seen.push(from);
        }
        if (noIndent) {
          var newOpts = {
            depth: opts.depth
          };
          if (has(opts, "quoteStyle")) {
            newOpts.quoteStyle = opts.quoteStyle;
          }
          return inspect_(value, newOpts, depth + 1, seen);
        }
        return inspect_(value, opts, depth + 1, seen);
      }
      if (typeof obj === "function" && !isRegExp(obj)) {
        var name2 = nameOf(obj);
        var keys = arrObjKeys(obj, inspect);
        return "[Function" + (name2 ? ": " + name2 : " (anonymous)") + "]" + (keys.length > 0 ? " { " + $join.call(keys, ", ") + " }" : "");
      }
      if (isSymbol(obj)) {
        var symString = hasShammedSymbols ? $replace.call(String(obj), /^(Symbol\(.*\))_[^)]*$/, "$1") : symToString.call(obj);
        return typeof obj === "object" && !hasShammedSymbols ? markBoxed(symString) : symString;
      }
      if (isElement(obj)) {
        var s = "<" + $toLowerCase.call(String(obj.nodeName));
        var attrs = obj.attributes || [];
        for (var i = 0; i < attrs.length; i++) {
          s += " " + attrs[i].name + "=" + wrapQuotes(quote(attrs[i].value), "double", opts);
        }
        s += ">";
        if (obj.childNodes && obj.childNodes.length) {
          s += "...";
        }
        s += "</" + $toLowerCase.call(String(obj.nodeName)) + ">";
        return s;
      }
      if (isArray(obj)) {
        if (obj.length === 0) {
          return "[]";
        }
        var xs = arrObjKeys(obj, inspect);
        if (indent && !singleLineValues(xs)) {
          return "[" + indentedJoin(xs, indent) + "]";
        }
        return "[ " + $join.call(xs, ", ") + " ]";
      }
      if (isError(obj)) {
        var parts = arrObjKeys(obj, inspect);
        if (!("cause" in Error.prototype) && "cause" in obj && !isEnumerable.call(obj, "cause")) {
          return "{ [" + String(obj) + "] " + $join.call($concat.call("[cause]: " + inspect(obj.cause), parts), ", ") + " }";
        }
        if (parts.length === 0) {
          return "[" + String(obj) + "]";
        }
        return "{ [" + String(obj) + "] " + $join.call(parts, ", ") + " }";
      }
      if (typeof obj === "object" && customInspect) {
        if (inspectSymbol && typeof obj[inspectSymbol] === "function" && utilInspect) {
          return utilInspect(obj, {
            depth: maxDepth - depth
          });
        } else if (customInspect !== "symbol" && typeof obj.inspect === "function") {
          return obj.inspect();
        }
      }
      if (isMap(obj)) {
        var mapParts = [];
        if (mapForEach) {
          mapForEach.call(obj, function(value, key) {
            mapParts.push(inspect(key, obj, true) + " => " + inspect(value, obj));
          });
        }
        return collectionOf("Map", mapSize.call(obj), mapParts, indent);
      }
      if (isSet(obj)) {
        var setParts = [];
        if (setForEach) {
          setForEach.call(obj, function(value) {
            setParts.push(inspect(value, obj));
          });
        }
        return collectionOf("Set", setSize.call(obj), setParts, indent);
      }
      if (isWeakMap(obj)) {
        return weakCollectionOf("WeakMap");
      }
      if (isWeakSet(obj)) {
        return weakCollectionOf("WeakSet");
      }
      if (isWeakRef(obj)) {
        return weakCollectionOf("WeakRef");
      }
      if (isNumber(obj)) {
        return markBoxed(inspect(Number(obj)));
      }
      if (isBigInt(obj)) {
        return markBoxed(inspect(bigIntValueOf.call(obj)));
      }
      if (isBoolean(obj)) {
        return markBoxed(booleanValueOf.call(obj));
      }
      if (isString(obj)) {
        return markBoxed(inspect(String(obj)));
      }
      if (typeof window !== "undefined" && obj === window) {
        return "{ [object Window] }";
      }
      if (typeof globalThis !== "undefined" && obj === globalThis || typeof _global !== "undefined" && obj === _global) {
        return "{ [object globalThis] }";
      }
      if (!isDate(obj) && !isRegExp(obj)) {
        var ys = arrObjKeys(obj, inspect);
        var isPlainObject = gPO ? gPO(obj) === Object.prototype : obj instanceof Object || obj.constructor === Object;
        var protoTag = obj instanceof Object ? "" : "null prototype";
        var stringTag = !isPlainObject && toStringTag && Object(obj) === obj && toStringTag in obj ? $slice.call(toStr(obj), 8, -1) : protoTag ? "Object" : "";
        var constructorTag = isPlainObject || typeof obj.constructor !== "function" ? "" : obj.constructor.name ? obj.constructor.name + " " : "";
        var tag = constructorTag + (stringTag || protoTag ? "[" + $join.call($concat.call([], stringTag || [], protoTag || []), ": ") + "] " : "");
        if (ys.length === 0) {
          return tag + "{}";
        }
        if (indent) {
          return tag + "{" + indentedJoin(ys, indent) + "}";
        }
        return tag + "{ " + $join.call(ys, ", ") + " }";
      }
      return String(obj);
    };
    function wrapQuotes(s, defaultStyle, opts) {
      var quoteChar = (opts.quoteStyle || defaultStyle) === "double" ? '"' : "'";
      return quoteChar + s + quoteChar;
    }
    function quote(s) {
      return $replace.call(String(s), /"/g, "&quot;");
    }
    function isArray(obj) {
      return toStr(obj) === "[object Array]" && (!toStringTag || !(typeof obj === "object" && toStringTag in obj));
    }
    function isDate(obj) {
      return toStr(obj) === "[object Date]" && (!toStringTag || !(typeof obj === "object" && toStringTag in obj));
    }
    function isRegExp(obj) {
      return toStr(obj) === "[object RegExp]" && (!toStringTag || !(typeof obj === "object" && toStringTag in obj));
    }
    function isError(obj) {
      return toStr(obj) === "[object Error]" && (!toStringTag || !(typeof obj === "object" && toStringTag in obj));
    }
    function isString(obj) {
      return toStr(obj) === "[object String]" && (!toStringTag || !(typeof obj === "object" && toStringTag in obj));
    }
    function isNumber(obj) {
      return toStr(obj) === "[object Number]" && (!toStringTag || !(typeof obj === "object" && toStringTag in obj));
    }
    function isBoolean(obj) {
      return toStr(obj) === "[object Boolean]" && (!toStringTag || !(typeof obj === "object" && toStringTag in obj));
    }
    function isSymbol(obj) {
      if (hasShammedSymbols) {
        return obj && typeof obj === "object" && obj instanceof Symbol;
      }
      if (typeof obj === "symbol") {
        return true;
      }
      if (!obj || typeof obj !== "object" || !symToString) {
        return false;
      }
      try {
        symToString.call(obj);
        return true;
      } catch (e) {
      }
      return false;
    }
    function isBigInt(obj) {
      if (!obj || typeof obj !== "object" || !bigIntValueOf) {
        return false;
      }
      try {
        bigIntValueOf.call(obj);
        return true;
      } catch (e) {
      }
      return false;
    }
    var hasOwn = Object.prototype.hasOwnProperty || function(key) {
      return key in (this || _global);
    };
    function has(obj, key) {
      return hasOwn.call(obj, key);
    }
    function toStr(obj) {
      return objectToString.call(obj);
    }
    function nameOf(f) {
      if (f.name) {
        return f.name;
      }
      var m = $match.call(functionToString.call(f), /^function\s*([\w$]+)/);
      if (m) {
        return m[1];
      }
      return null;
    }
    function indexOf(xs, x) {
      if (xs.indexOf) {
        return xs.indexOf(x);
      }
      for (var i = 0, l = xs.length; i < l; i++) {
        if (xs[i] === x) {
          return i;
        }
      }
      return -1;
    }
    function isMap(x) {
      if (!mapSize || !x || typeof x !== "object") {
        return false;
      }
      try {
        mapSize.call(x);
        try {
          setSize.call(x);
        } catch (s) {
          return true;
        }
        return x instanceof Map;
      } catch (e) {
      }
      return false;
    }
    function isWeakMap(x) {
      if (!weakMapHas || !x || typeof x !== "object") {
        return false;
      }
      try {
        weakMapHas.call(x, weakMapHas);
        try {
          weakSetHas.call(x, weakSetHas);
        } catch (s) {
          return true;
        }
        return x instanceof WeakMap;
      } catch (e) {
      }
      return false;
    }
    function isWeakRef(x) {
      if (!weakRefDeref || !x || typeof x !== "object") {
        return false;
      }
      try {
        weakRefDeref.call(x);
        return true;
      } catch (e) {
      }
      return false;
    }
    function isSet(x) {
      if (!setSize || !x || typeof x !== "object") {
        return false;
      }
      try {
        setSize.call(x);
        try {
          mapSize.call(x);
        } catch (m) {
          return true;
        }
        return x instanceof Set;
      } catch (e) {
      }
      return false;
    }
    function isWeakSet(x) {
      if (!weakSetHas || !x || typeof x !== "object") {
        return false;
      }
      try {
        weakSetHas.call(x, weakSetHas);
        try {
          weakMapHas.call(x, weakMapHas);
        } catch (s) {
          return true;
        }
        return x instanceof WeakSet;
      } catch (e) {
      }
      return false;
    }
    function isElement(x) {
      if (!x || typeof x !== "object") {
        return false;
      }
      if (typeof HTMLElement !== "undefined" && x instanceof HTMLElement) {
        return true;
      }
      return typeof x.nodeName === "string" && typeof x.getAttribute === "function";
    }
    function inspectString(str, opts) {
      if (str.length > opts.maxStringLength) {
        var remaining = str.length - opts.maxStringLength;
        var trailer = "... " + remaining + " more character" + (remaining > 1 ? "s" : "");
        return inspectString($slice.call(str, 0, opts.maxStringLength), opts) + trailer;
      }
      var s = $replace.call($replace.call(str, /(['\\])/g, "\\$1"), /[\x00-\x1f]/g, lowbyte);
      return wrapQuotes(s, "single", opts);
    }
    function lowbyte(c) {
      var n = c.charCodeAt(0);
      var x = {
        8: "b",
        9: "t",
        10: "n",
        12: "f",
        13: "r"
      }[n];
      if (x) {
        return "\\" + x;
      }
      return "\\x" + (n < 16 ? "0" : "") + $toUpperCase.call(n.toString(16));
    }
    function markBoxed(str) {
      return "Object(" + str + ")";
    }
    function weakCollectionOf(type) {
      return type + " { ? }";
    }
    function collectionOf(type, size, entries, indent) {
      var joinedEntries = indent ? indentedJoin(entries, indent) : $join.call(entries, ", ");
      return type + " (" + size + ") {" + joinedEntries + "}";
    }
    function singleLineValues(xs) {
      for (var i = 0; i < xs.length; i++) {
        if (indexOf(xs[i], "\n") >= 0) {
          return false;
        }
      }
      return true;
    }
    function getIndent(opts, depth) {
      var baseIndent;
      if (opts.indent === "	") {
        baseIndent = "	";
      } else if (typeof opts.indent === "number" && opts.indent > 0) {
        baseIndent = $join.call(Array(opts.indent + 1), " ");
      } else {
        return null;
      }
      return {
        base: baseIndent,
        prev: $join.call(Array(depth + 1), baseIndent)
      };
    }
    function indentedJoin(xs, indent) {
      if (xs.length === 0) {
        return "";
      }
      var lineJoiner = "\n" + indent.prev + indent.base;
      return lineJoiner + $join.call(xs, "," + lineJoiner) + "\n" + indent.prev;
    }
    function arrObjKeys(obj, inspect) {
      var isArr = isArray(obj);
      var xs = [];
      if (isArr) {
        xs.length = obj.length;
        for (var i = 0; i < obj.length; i++) {
          xs[i] = has(obj, i) ? inspect(obj[i], obj) : "";
        }
      }
      var syms = typeof gOPS === "function" ? gOPS(obj) : [];
      var symMap;
      if (hasShammedSymbols) {
        symMap = {};
        for (var k = 0; k < syms.length; k++) {
          symMap["$" + syms[k]] = syms[k];
        }
      }
      for (var key in obj) {
        if (!has(obj, key)) {
          continue;
        }
        if (isArr && String(Number(key)) === key && key < obj.length) {
          continue;
        }
        if (hasShammedSymbols && symMap["$" + key] instanceof Symbol) {
          continue;
        } else if ($test.call(/[^\w$]/, key)) {
          xs.push(inspect(key, obj) + ": " + inspect(obj[key], obj));
        } else {
          xs.push(key + ": " + inspect(obj[key], obj));
        }
      }
      if (typeof gOPS === "function") {
        for (var j = 0; j < syms.length; j++) {
          if (isEnumerable.call(obj, syms[j])) {
            xs.push("[" + inspect(syms[j]) + "]: " + inspect(obj[syms[j]], obj));
          }
        }
      }
      return xs;
    }
    return exports$82;
  }
  function dew$62() {
    if (_dewExec$62) return exports$72;
    _dewExec$62 = true;
    var GetIntrinsic = dew$7();
    var callBound = dew4();
    var inspect = dew$72();
    var $TypeError = dew$e();
    var $WeakMap = GetIntrinsic("%WeakMap%", true);
    var $Map = GetIntrinsic("%Map%", true);
    var $weakMapGet = callBound("WeakMap.prototype.get", true);
    var $weakMapSet = callBound("WeakMap.prototype.set", true);
    var $weakMapHas = callBound("WeakMap.prototype.has", true);
    var $mapGet = callBound("Map.prototype.get", true);
    var $mapSet = callBound("Map.prototype.set", true);
    var $mapHas = callBound("Map.prototype.has", true);
    var listGetNode = function(list, key) {
      var prev = list;
      var curr;
      for (; (curr = prev.next) !== null; prev = curr) {
        if (curr.key === key) {
          prev.next = curr.next;
          curr.next = /** @type {NonNullable<typeof list.next>} */
          list.next;
          list.next = curr;
          return curr;
        }
      }
    };
    var listGet = function(objects, key) {
      var node = listGetNode(objects, key);
      return node && node.value;
    };
    var listSet = function(objects, key, value) {
      var node = listGetNode(objects, key);
      if (node) {
        node.value = value;
      } else {
        objects.next = /** @type {import('.').ListNode<typeof value>} */
        {
          // eslint-disable-line no-param-reassign, no-extra-parens
          key,
          next: objects.next,
          value
        };
      }
    };
    var listHas = function(objects, key) {
      return !!listGetNode(objects, key);
    };
    exports$72 = function getSideChannel() {
      var $wm;
      var $m;
      var $o;
      var channel = {
        assert: function(key) {
          if (!channel.has(key)) {
            throw new $TypeError("Side channel does not contain " + inspect(key));
          }
        },
        get: function(key) {
          if ($WeakMap && key && (typeof key === "object" || typeof key === "function")) {
            if ($wm) {
              return $weakMapGet($wm, key);
            }
          } else if ($Map) {
            if ($m) {
              return $mapGet($m, key);
            }
          } else {
            if ($o) {
              return listGet($o, key);
            }
          }
        },
        has: function(key) {
          if ($WeakMap && key && (typeof key === "object" || typeof key === "function")) {
            if ($wm) {
              return $weakMapHas($wm, key);
            }
          } else if ($Map) {
            if ($m) {
              return $mapHas($m, key);
            }
          } else {
            if ($o) {
              return listHas($o, key);
            }
          }
          return false;
        },
        set: function(key, value) {
          if ($WeakMap && key && (typeof key === "object" || typeof key === "function")) {
            if (!$wm) {
              $wm = new $WeakMap();
            }
            $weakMapSet($wm, key, value);
          } else if ($Map) {
            if (!$m) {
              $m = new $Map();
            }
            $mapSet($m, key, value);
          } else {
            if (!$o) {
              $o = {
                key: {},
                next: null
              };
            }
            listSet($o, key, value);
          }
        }
      };
      return channel;
    };
    return exports$72;
  }
  function dew$52() {
    if (_dewExec$52) return exports$62;
    _dewExec$52 = true;
    var replace = String.prototype.replace;
    var percentTwenties = /%20/g;
    var Format = {
      RFC1738: "RFC1738",
      RFC3986: "RFC3986"
    };
    exports$62 = {
      "default": Format.RFC3986,
      formatters: {
        RFC1738: function(value) {
          return replace.call(value, percentTwenties, "+");
        },
        RFC3986: function(value) {
          return String(value);
        }
      },
      RFC1738: Format.RFC1738,
      RFC3986: Format.RFC3986
    };
    return exports$62;
  }
  function dew$42() {
    if (_dewExec$42) return exports$52;
    _dewExec$42 = true;
    var formats = dew$52();
    var has = Object.prototype.hasOwnProperty;
    var isArray = Array.isArray;
    var hexTable = function() {
      var array = [];
      for (var i = 0; i < 256; ++i) {
        array.push("%" + ((i < 16 ? "0" : "") + i.toString(16)).toUpperCase());
      }
      return array;
    }();
    var compactQueue = function compactQueue2(queue3) {
      while (queue3.length > 1) {
        var item = queue3.pop();
        var obj = item.obj[item.prop];
        if (isArray(obj)) {
          var compacted = [];
          for (var j = 0; j < obj.length; ++j) {
            if (typeof obj[j] !== "undefined") {
              compacted.push(obj[j]);
            }
          }
          item.obj[item.prop] = compacted;
        }
      }
    };
    var arrayToObject = function arrayToObject2(source, options) {
      var obj = options && options.plainObjects ? /* @__PURE__ */ Object.create(null) : {};
      for (var i = 0; i < source.length; ++i) {
        if (typeof source[i] !== "undefined") {
          obj[i] = source[i];
        }
      }
      return obj;
    };
    var merge = function merge2(target, source, options) {
      if (!source) {
        return target;
      }
      if (typeof source !== "object") {
        if (isArray(target)) {
          target.push(source);
        } else if (target && typeof target === "object") {
          if (options && (options.plainObjects || options.allowPrototypes) || !has.call(Object.prototype, source)) {
            target[source] = true;
          }
        } else {
          return [target, source];
        }
        return target;
      }
      if (!target || typeof target !== "object") {
        return [target].concat(source);
      }
      var mergeTarget = target;
      if (isArray(target) && !isArray(source)) {
        mergeTarget = arrayToObject(target, options);
      }
      if (isArray(target) && isArray(source)) {
        source.forEach(function(item, i) {
          if (has.call(target, i)) {
            var targetItem = target[i];
            if (targetItem && typeof targetItem === "object" && item && typeof item === "object") {
              target[i] = merge2(targetItem, item, options);
            } else {
              target.push(item);
            }
          } else {
            target[i] = item;
          }
        });
        return target;
      }
      return Object.keys(source).reduce(function(acc, key) {
        var value = source[key];
        if (has.call(acc, key)) {
          acc[key] = merge2(acc[key], value, options);
        } else {
          acc[key] = value;
        }
        return acc;
      }, mergeTarget);
    };
    var assign = function assignSingleSource(target, source) {
      return Object.keys(source).reduce(function(acc, key) {
        acc[key] = source[key];
        return acc;
      }, target);
    };
    var decode2 = function(str, decoder, charset) {
      var strWithoutPlus = str.replace(/\+/g, " ");
      if (charset === "iso-8859-1") {
        return strWithoutPlus.replace(/%[0-9a-f]{2}/gi, unescape);
      }
      try {
        return decodeURIComponent(strWithoutPlus);
      } catch (e) {
        return strWithoutPlus;
      }
    };
    var limit = 1024;
    var encode2 = function encode3(str, defaultEncoder, charset, kind, format2) {
      if (str.length === 0) {
        return str;
      }
      var string = str;
      if (typeof str === "symbol") {
        string = Symbol.prototype.toString.call(str);
      } else if (typeof str !== "string") {
        string = String(str);
      }
      if (charset === "iso-8859-1") {
        return escape(string).replace(/%u[0-9a-f]{4}/gi, function($0) {
          return "%26%23" + parseInt($0.slice(2), 16) + "%3B";
        });
      }
      var out = "";
      for (var j = 0; j < string.length; j += limit) {
        var segment = string.length >= limit ? string.slice(j, j + limit) : string;
        var arr = [];
        for (var i = 0; i < segment.length; ++i) {
          var c = segment.charCodeAt(i);
          if (c === 45 || c === 46 || c === 95 || c === 126 || c >= 48 && c <= 57 || c >= 65 && c <= 90 || c >= 97 && c <= 122 || format2 === formats.RFC1738 && (c === 40 || c === 41)) {
            arr[arr.length] = segment.charAt(i);
            continue;
          }
          if (c < 128) {
            arr[arr.length] = hexTable[c];
            continue;
          }
          if (c < 2048) {
            arr[arr.length] = hexTable[192 | c >> 6] + hexTable[128 | c & 63];
            continue;
          }
          if (c < 55296 || c >= 57344) {
            arr[arr.length] = hexTable[224 | c >> 12] + hexTable[128 | c >> 6 & 63] + hexTable[128 | c & 63];
            continue;
          }
          i += 1;
          c = 65536 + ((c & 1023) << 10 | segment.charCodeAt(i) & 1023);
          arr[arr.length] = hexTable[240 | c >> 18] + hexTable[128 | c >> 12 & 63] + hexTable[128 | c >> 6 & 63] + hexTable[128 | c & 63];
        }
        out += arr.join("");
      }
      return out;
    };
    var compact = function compact2(value) {
      var queue3 = [{
        obj: {
          o: value
        },
        prop: "o"
      }];
      var refs = [];
      for (var i = 0; i < queue3.length; ++i) {
        var item = queue3[i];
        var obj = item.obj[item.prop];
        var keys = Object.keys(obj);
        for (var j = 0; j < keys.length; ++j) {
          var key = keys[j];
          var val = obj[key];
          if (typeof val === "object" && val !== null && refs.indexOf(val) === -1) {
            queue3.push({
              obj,
              prop: key
            });
            refs.push(val);
          }
        }
      }
      compactQueue(queue3);
      return value;
    };
    var isRegExp = function isRegExp2(obj) {
      return Object.prototype.toString.call(obj) === "[object RegExp]";
    };
    var isBuffer = function isBuffer2(obj) {
      if (!obj || typeof obj !== "object") {
        return false;
      }
      return !!(obj.constructor && obj.constructor.isBuffer && obj.constructor.isBuffer(obj));
    };
    var combine = function combine2(a, b) {
      return [].concat(a, b);
    };
    var maybeMap = function maybeMap2(val, fn) {
      if (isArray(val)) {
        var mapped = [];
        for (var i = 0; i < val.length; i += 1) {
          mapped.push(fn(val[i]));
        }
        return mapped;
      }
      return fn(val);
    };
    exports$52 = {
      arrayToObject,
      assign,
      combine,
      compact,
      decode: decode2,
      encode: encode2,
      isBuffer,
      isRegExp,
      maybeMap,
      merge
    };
    return exports$52;
  }
  function dew$32() {
    if (_dewExec$32) return exports$42;
    _dewExec$32 = true;
    var getSideChannel = dew$62();
    var utils = dew$42();
    var formats = dew$52();
    var has = Object.prototype.hasOwnProperty;
    var arrayPrefixGenerators = {
      brackets: function brackets(prefix) {
        return prefix + "[]";
      },
      comma: "comma",
      indices: function indices(prefix, key) {
        return prefix + "[" + key + "]";
      },
      repeat: function repeat(prefix) {
        return prefix;
      }
    };
    var isArray = Array.isArray;
    var push = Array.prototype.push;
    var pushToArray = function(arr, valueOrArray) {
      push.apply(arr, isArray(valueOrArray) ? valueOrArray : [valueOrArray]);
    };
    var toISO = Date.prototype.toISOString;
    var defaultFormat = formats["default"];
    var defaults = {
      addQueryPrefix: false,
      allowDots: false,
      allowEmptyArrays: false,
      arrayFormat: "indices",
      charset: "utf-8",
      charsetSentinel: false,
      delimiter: "&",
      encode: true,
      encodeDotInKeys: false,
      encoder: utils.encode,
      encodeValuesOnly: false,
      format: defaultFormat,
      formatter: formats.formatters[defaultFormat],
      // deprecated
      indices: false,
      serializeDate: function serializeDate(date) {
        return toISO.call(date);
      },
      skipNulls: false,
      strictNullHandling: false
    };
    var isNonNullishPrimitive = function isNonNullishPrimitive2(v) {
      return typeof v === "string" || typeof v === "number" || typeof v === "boolean" || typeof v === "symbol" || typeof v === "bigint";
    };
    var sentinel = {};
    var stringify = function stringify2(object, prefix, generateArrayPrefix, commaRoundTrip, allowEmptyArrays, strictNullHandling, skipNulls, encodeDotInKeys, encoder, filter, sort, allowDots, serializeDate, format2, formatter, encodeValuesOnly, charset, sideChannel) {
      var obj = object;
      var tmpSc = sideChannel;
      var step = 0;
      var findFlag = false;
      while ((tmpSc = tmpSc.get(sentinel)) !== void 0 && !findFlag) {
        var pos = tmpSc.get(object);
        step += 1;
        if (typeof pos !== "undefined") {
          if (pos === step) {
            throw new RangeError("Cyclic object value");
          } else {
            findFlag = true;
          }
        }
        if (typeof tmpSc.get(sentinel) === "undefined") {
          step = 0;
        }
      }
      if (typeof filter === "function") {
        obj = filter(prefix, obj);
      } else if (obj instanceof Date) {
        obj = serializeDate(obj);
      } else if (generateArrayPrefix === "comma" && isArray(obj)) {
        obj = utils.maybeMap(obj, function(value2) {
          if (value2 instanceof Date) {
            return serializeDate(value2);
          }
          return value2;
        });
      }
      if (obj === null) {
        if (strictNullHandling) {
          return encoder && !encodeValuesOnly ? encoder(prefix, defaults.encoder, charset, "key", format2) : prefix;
        }
        obj = "";
      }
      if (isNonNullishPrimitive(obj) || utils.isBuffer(obj)) {
        if (encoder) {
          var keyValue = encodeValuesOnly ? prefix : encoder(prefix, defaults.encoder, charset, "key", format2);
          return [formatter(keyValue) + "=" + formatter(encoder(obj, defaults.encoder, charset, "value", format2))];
        }
        return [formatter(prefix) + "=" + formatter(String(obj))];
      }
      var values = [];
      if (typeof obj === "undefined") {
        return values;
      }
      var objKeys;
      if (generateArrayPrefix === "comma" && isArray(obj)) {
        if (encodeValuesOnly && encoder) {
          obj = utils.maybeMap(obj, encoder);
        }
        objKeys = [{
          value: obj.length > 0 ? obj.join(",") || null : void 0
        }];
      } else if (isArray(filter)) {
        objKeys = filter;
      } else {
        var keys = Object.keys(obj);
        objKeys = sort ? keys.sort(sort) : keys;
      }
      var encodedPrefix = encodeDotInKeys ? prefix.replace(/\./g, "%2E") : prefix;
      var adjustedPrefix = commaRoundTrip && isArray(obj) && obj.length === 1 ? encodedPrefix + "[]" : encodedPrefix;
      if (allowEmptyArrays && isArray(obj) && obj.length === 0) {
        return adjustedPrefix + "[]";
      }
      for (var j = 0; j < objKeys.length; ++j) {
        var key = objKeys[j];
        var value = typeof key === "object" && typeof key.value !== "undefined" ? key.value : obj[key];
        if (skipNulls && value === null) {
          continue;
        }
        var encodedKey = allowDots && encodeDotInKeys ? key.replace(/\./g, "%2E") : key;
        var keyPrefix = isArray(obj) ? typeof generateArrayPrefix === "function" ? generateArrayPrefix(adjustedPrefix, encodedKey) : adjustedPrefix : adjustedPrefix + (allowDots ? "." + encodedKey : "[" + encodedKey + "]");
        sideChannel.set(object, step);
        var valueSideChannel = getSideChannel();
        valueSideChannel.set(sentinel, sideChannel);
        pushToArray(values, stringify2(value, keyPrefix, generateArrayPrefix, commaRoundTrip, allowEmptyArrays, strictNullHandling, skipNulls, encodeDotInKeys, generateArrayPrefix === "comma" && encodeValuesOnly && isArray(obj) ? null : encoder, filter, sort, allowDots, serializeDate, format2, formatter, encodeValuesOnly, charset, valueSideChannel));
      }
      return values;
    };
    var normalizeStringifyOptions = function normalizeStringifyOptions2(opts) {
      if (!opts) {
        return defaults;
      }
      if (typeof opts.allowEmptyArrays !== "undefined" && typeof opts.allowEmptyArrays !== "boolean") {
        throw new TypeError("`allowEmptyArrays` option can only be `true` or `false`, when provided");
      }
      if (typeof opts.encodeDotInKeys !== "undefined" && typeof opts.encodeDotInKeys !== "boolean") {
        throw new TypeError("`encodeDotInKeys` option can only be `true` or `false`, when provided");
      }
      if (opts.encoder !== null && typeof opts.encoder !== "undefined" && typeof opts.encoder !== "function") {
        throw new TypeError("Encoder has to be a function.");
      }
      var charset = opts.charset || defaults.charset;
      if (typeof opts.charset !== "undefined" && opts.charset !== "utf-8" && opts.charset !== "iso-8859-1") {
        throw new TypeError("The charset option must be either utf-8, iso-8859-1, or undefined");
      }
      var format2 = formats["default"];
      if (typeof opts.format !== "undefined") {
        if (!has.call(formats.formatters, opts.format)) {
          throw new TypeError("Unknown format option provided.");
        }
        format2 = opts.format;
      }
      var formatter = formats.formatters[format2];
      var filter = defaults.filter;
      if (typeof opts.filter === "function" || isArray(opts.filter)) {
        filter = opts.filter;
      }
      var arrayFormat;
      if (opts.arrayFormat in arrayPrefixGenerators) {
        arrayFormat = opts.arrayFormat;
      } else if ("indices" in opts) {
        arrayFormat = opts.indices ? "indices" : "repeat";
      } else {
        arrayFormat = defaults.arrayFormat;
      }
      if ("commaRoundTrip" in opts && typeof opts.commaRoundTrip !== "boolean") {
        throw new TypeError("`commaRoundTrip` must be a boolean, or absent");
      }
      var allowDots = typeof opts.allowDots === "undefined" ? opts.encodeDotInKeys === true ? true : defaults.allowDots : !!opts.allowDots;
      return {
        addQueryPrefix: typeof opts.addQueryPrefix === "boolean" ? opts.addQueryPrefix : defaults.addQueryPrefix,
        allowDots,
        allowEmptyArrays: typeof opts.allowEmptyArrays === "boolean" ? !!opts.allowEmptyArrays : defaults.allowEmptyArrays,
        arrayFormat,
        charset,
        charsetSentinel: typeof opts.charsetSentinel === "boolean" ? opts.charsetSentinel : defaults.charsetSentinel,
        commaRoundTrip: opts.commaRoundTrip,
        delimiter: typeof opts.delimiter === "undefined" ? defaults.delimiter : opts.delimiter,
        encode: typeof opts.encode === "boolean" ? opts.encode : defaults.encode,
        encodeDotInKeys: typeof opts.encodeDotInKeys === "boolean" ? opts.encodeDotInKeys : defaults.encodeDotInKeys,
        encoder: typeof opts.encoder === "function" ? opts.encoder : defaults.encoder,
        encodeValuesOnly: typeof opts.encodeValuesOnly === "boolean" ? opts.encodeValuesOnly : defaults.encodeValuesOnly,
        filter,
        format: format2,
        formatter,
        serializeDate: typeof opts.serializeDate === "function" ? opts.serializeDate : defaults.serializeDate,
        skipNulls: typeof opts.skipNulls === "boolean" ? opts.skipNulls : defaults.skipNulls,
        sort: typeof opts.sort === "function" ? opts.sort : null,
        strictNullHandling: typeof opts.strictNullHandling === "boolean" ? opts.strictNullHandling : defaults.strictNullHandling
      };
    };
    exports$42 = function(object, opts) {
      var obj = object;
      var options = normalizeStringifyOptions(opts);
      var objKeys;
      var filter;
      if (typeof options.filter === "function") {
        filter = options.filter;
        obj = filter("", obj);
      } else if (isArray(options.filter)) {
        filter = options.filter;
        objKeys = filter;
      }
      var keys = [];
      if (typeof obj !== "object" || obj === null) {
        return "";
      }
      var generateArrayPrefix = arrayPrefixGenerators[options.arrayFormat];
      var commaRoundTrip = generateArrayPrefix === "comma" && options.commaRoundTrip;
      if (!objKeys) {
        objKeys = Object.keys(obj);
      }
      if (options.sort) {
        objKeys.sort(options.sort);
      }
      var sideChannel = getSideChannel();
      for (var i = 0; i < objKeys.length; ++i) {
        var key = objKeys[i];
        if (options.skipNulls && obj[key] === null) {
          continue;
        }
        pushToArray(keys, stringify(obj[key], key, generateArrayPrefix, commaRoundTrip, options.allowEmptyArrays, options.strictNullHandling, options.skipNulls, options.encodeDotInKeys, options.encode ? options.encoder : null, options.filter, options.sort, options.allowDots, options.serializeDate, options.format, options.formatter, options.encodeValuesOnly, options.charset, sideChannel));
      }
      var joined = keys.join(options.delimiter);
      var prefix = options.addQueryPrefix === true ? "?" : "";
      if (options.charsetSentinel) {
        if (options.charset === "iso-8859-1") {
          prefix += "utf8=%26%2310003%3B&";
        } else {
          prefix += "utf8=%E2%9C%93&";
        }
      }
      return joined.length > 0 ? prefix + joined : "";
    };
    return exports$42;
  }
  function dew$23() {
    if (_dewExec$23) return exports$32;
    _dewExec$23 = true;
    var utils = dew$42();
    var has = Object.prototype.hasOwnProperty;
    var isArray = Array.isArray;
    var defaults = {
      allowDots: false,
      allowEmptyArrays: false,
      allowPrototypes: false,
      allowSparse: false,
      arrayLimit: 20,
      charset: "utf-8",
      charsetSentinel: false,
      comma: false,
      decodeDotInKeys: false,
      decoder: utils.decode,
      delimiter: "&",
      depth: 5,
      duplicates: "combine",
      ignoreQueryPrefix: false,
      interpretNumericEntities: false,
      parameterLimit: 1e3,
      parseArrays: true,
      plainObjects: false,
      strictDepth: false,
      strictNullHandling: false
    };
    var interpretNumericEntities = function(str) {
      return str.replace(/&#(\d+);/g, function($0, numberStr) {
        return String.fromCharCode(parseInt(numberStr, 10));
      });
    };
    var parseArrayValue = function(val, options) {
      if (val && typeof val === "string" && options.comma && val.indexOf(",") > -1) {
        return val.split(",");
      }
      return val;
    };
    var isoSentinel = "utf8=%26%2310003%3B";
    var charsetSentinel = "utf8=%E2%9C%93";
    var parseValues = function parseQueryStringValues(str, options) {
      var obj = {
        __proto__: null
      };
      var cleanStr = options.ignoreQueryPrefix ? str.replace(/^\?/, "") : str;
      cleanStr = cleanStr.replace(/%5B/gi, "[").replace(/%5D/gi, "]");
      var limit = options.parameterLimit === Infinity ? void 0 : options.parameterLimit;
      var parts = cleanStr.split(options.delimiter, limit);
      var skipIndex = -1;
      var i;
      var charset = options.charset;
      if (options.charsetSentinel) {
        for (i = 0; i < parts.length; ++i) {
          if (parts[i].indexOf("utf8=") === 0) {
            if (parts[i] === charsetSentinel) {
              charset = "utf-8";
            } else if (parts[i] === isoSentinel) {
              charset = "iso-8859-1";
            }
            skipIndex = i;
            i = parts.length;
          }
        }
      }
      for (i = 0; i < parts.length; ++i) {
        if (i === skipIndex) {
          continue;
        }
        var part = parts[i];
        var bracketEqualsPos = part.indexOf("]=");
        var pos = bracketEqualsPos === -1 ? part.indexOf("=") : bracketEqualsPos + 1;
        var key, val;
        if (pos === -1) {
          key = options.decoder(part, defaults.decoder, charset, "key");
          val = options.strictNullHandling ? null : "";
        } else {
          key = options.decoder(part.slice(0, pos), defaults.decoder, charset, "key");
          val = utils.maybeMap(parseArrayValue(part.slice(pos + 1), options), function(encodedVal) {
            return options.decoder(encodedVal, defaults.decoder, charset, "value");
          });
        }
        if (val && options.interpretNumericEntities && charset === "iso-8859-1") {
          val = interpretNumericEntities(val);
        }
        if (part.indexOf("[]=") > -1) {
          val = isArray(val) ? [val] : val;
        }
        var existing = has.call(obj, key);
        if (existing && options.duplicates === "combine") {
          obj[key] = utils.combine(obj[key], val);
        } else if (!existing || options.duplicates === "last") {
          obj[key] = val;
        }
      }
      return obj;
    };
    var parseObject = function(chain, val, options, valuesParsed) {
      var leaf = valuesParsed ? val : parseArrayValue(val, options);
      for (var i = chain.length - 1; i >= 0; --i) {
        var obj;
        var root = chain[i];
        if (root === "[]" && options.parseArrays) {
          obj = options.allowEmptyArrays && (leaf === "" || options.strictNullHandling && leaf === null) ? [] : [].concat(leaf);
        } else {
          obj = options.plainObjects ? /* @__PURE__ */ Object.create(null) : {};
          var cleanRoot = root.charAt(0) === "[" && root.charAt(root.length - 1) === "]" ? root.slice(1, -1) : root;
          var decodedRoot = options.decodeDotInKeys ? cleanRoot.replace(/%2E/g, ".") : cleanRoot;
          var index = parseInt(decodedRoot, 10);
          if (!options.parseArrays && decodedRoot === "") {
            obj = {
              0: leaf
            };
          } else if (!isNaN(index) && root !== decodedRoot && String(index) === decodedRoot && index >= 0 && options.parseArrays && index <= options.arrayLimit) {
            obj = [];
            obj[index] = leaf;
          } else if (decodedRoot !== "__proto__") {
            obj[decodedRoot] = leaf;
          }
        }
        leaf = obj;
      }
      return leaf;
    };
    var parseKeys = function parseQueryStringKeys(givenKey, val, options, valuesParsed) {
      if (!givenKey) {
        return;
      }
      var key = options.allowDots ? givenKey.replace(/\.([^.[]+)/g, "[$1]") : givenKey;
      var brackets = /(\[[^[\]]*])/;
      var child = /(\[[^[\]]*])/g;
      var segment = options.depth > 0 && brackets.exec(key);
      var parent = segment ? key.slice(0, segment.index) : key;
      var keys = [];
      if (parent) {
        if (!options.plainObjects && has.call(Object.prototype, parent)) {
          if (!options.allowPrototypes) {
            return;
          }
        }
        keys.push(parent);
      }
      var i = 0;
      while (options.depth > 0 && (segment = child.exec(key)) !== null && i < options.depth) {
        i += 1;
        if (!options.plainObjects && has.call(Object.prototype, segment[1].slice(1, -1))) {
          if (!options.allowPrototypes) {
            return;
          }
        }
        keys.push(segment[1]);
      }
      if (segment) {
        if (options.strictDepth === true) {
          throw new RangeError("Input depth exceeded depth option of " + options.depth + " and strictDepth is true");
        }
        keys.push("[" + key.slice(segment.index) + "]");
      }
      return parseObject(keys, val, options, valuesParsed);
    };
    var normalizeParseOptions = function normalizeParseOptions2(opts) {
      if (!opts) {
        return defaults;
      }
      if (typeof opts.allowEmptyArrays !== "undefined" && typeof opts.allowEmptyArrays !== "boolean") {
        throw new TypeError("`allowEmptyArrays` option can only be `true` or `false`, when provided");
      }
      if (typeof opts.decodeDotInKeys !== "undefined" && typeof opts.decodeDotInKeys !== "boolean") {
        throw new TypeError("`decodeDotInKeys` option can only be `true` or `false`, when provided");
      }
      if (opts.decoder !== null && typeof opts.decoder !== "undefined" && typeof opts.decoder !== "function") {
        throw new TypeError("Decoder has to be a function.");
      }
      if (typeof opts.charset !== "undefined" && opts.charset !== "utf-8" && opts.charset !== "iso-8859-1") {
        throw new TypeError("The charset option must be either utf-8, iso-8859-1, or undefined");
      }
      var charset = typeof opts.charset === "undefined" ? defaults.charset : opts.charset;
      var duplicates = typeof opts.duplicates === "undefined" ? defaults.duplicates : opts.duplicates;
      if (duplicates !== "combine" && duplicates !== "first" && duplicates !== "last") {
        throw new TypeError("The duplicates option must be either combine, first, or last");
      }
      var allowDots = typeof opts.allowDots === "undefined" ? opts.decodeDotInKeys === true ? true : defaults.allowDots : !!opts.allowDots;
      return {
        allowDots,
        allowEmptyArrays: typeof opts.allowEmptyArrays === "boolean" ? !!opts.allowEmptyArrays : defaults.allowEmptyArrays,
        allowPrototypes: typeof opts.allowPrototypes === "boolean" ? opts.allowPrototypes : defaults.allowPrototypes,
        allowSparse: typeof opts.allowSparse === "boolean" ? opts.allowSparse : defaults.allowSparse,
        arrayLimit: typeof opts.arrayLimit === "number" ? opts.arrayLimit : defaults.arrayLimit,
        charset,
        charsetSentinel: typeof opts.charsetSentinel === "boolean" ? opts.charsetSentinel : defaults.charsetSentinel,
        comma: typeof opts.comma === "boolean" ? opts.comma : defaults.comma,
        decodeDotInKeys: typeof opts.decodeDotInKeys === "boolean" ? opts.decodeDotInKeys : defaults.decodeDotInKeys,
        decoder: typeof opts.decoder === "function" ? opts.decoder : defaults.decoder,
        delimiter: typeof opts.delimiter === "string" || utils.isRegExp(opts.delimiter) ? opts.delimiter : defaults.delimiter,
        // eslint-disable-next-line no-implicit-coercion, no-extra-parens
        depth: typeof opts.depth === "number" || opts.depth === false ? +opts.depth : defaults.depth,
        duplicates,
        ignoreQueryPrefix: opts.ignoreQueryPrefix === true,
        interpretNumericEntities: typeof opts.interpretNumericEntities === "boolean" ? opts.interpretNumericEntities : defaults.interpretNumericEntities,
        parameterLimit: typeof opts.parameterLimit === "number" ? opts.parameterLimit : defaults.parameterLimit,
        parseArrays: opts.parseArrays !== false,
        plainObjects: typeof opts.plainObjects === "boolean" ? opts.plainObjects : defaults.plainObjects,
        strictDepth: typeof opts.strictDepth === "boolean" ? !!opts.strictDepth : defaults.strictDepth,
        strictNullHandling: typeof opts.strictNullHandling === "boolean" ? opts.strictNullHandling : defaults.strictNullHandling
      };
    };
    exports$32 = function(str, opts) {
      var options = normalizeParseOptions(opts);
      if (str === "" || str === null || typeof str === "undefined") {
        return options.plainObjects ? /* @__PURE__ */ Object.create(null) : {};
      }
      var tempObj = typeof str === "string" ? parseValues(str, options) : str;
      var obj = options.plainObjects ? /* @__PURE__ */ Object.create(null) : {};
      var keys = Object.keys(tempObj);
      for (var i = 0; i < keys.length; ++i) {
        var key = keys[i];
        var newObj = parseKeys(key, tempObj[key], options, typeof str === "string");
        obj = utils.merge(obj, newObj, options);
      }
      if (options.allowSparse === true) {
        return obj;
      }
      return utils.compact(obj);
    };
    return exports$32;
  }
  function dew$13() {
    if (_dewExec$13) return exports$23;
    _dewExec$13 = true;
    var stringify = dew$32();
    var parse2 = dew$23();
    var formats = dew$52();
    exports$23 = {
      formats,
      parse: parse2,
      stringify
    };
    return exports$23;
  }
  function dew6() {
    if (_dewExec6) return exports$16;
    _dewExec6 = true;
    var punycode = exports4;
    function Url2() {
      this.protocol = null;
      this.slashes = null;
      this.auth = null;
      this.host = null;
      this.port = null;
      this.hostname = null;
      this.hash = null;
      this.search = null;
      this.query = null;
      this.pathname = null;
      this.path = null;
      this.href = null;
    }
    var protocolPattern = /^([a-z0-9.+-]+:)/i, portPattern = /:[0-9]*$/, simplePathPattern = /^(\/\/?(?!\/)[^?\s]*)(\?[^\s]*)?$/, delims = ["<", ">", '"', "`", " ", "\r", "\n", "	"], unwise = ["{", "}", "|", "\\", "^", "`"].concat(delims), autoEscape = ["'"].concat(unwise), nonHostChars = ["%", "/", "?", ";", "#"].concat(autoEscape), hostEndingChars = ["/", "?", "#"], hostnameMaxLen = 255, hostnamePartPattern = /^[+a-z0-9A-Z_-]{0,63}$/, hostnamePartStart = /^([+a-z0-9A-Z_-]{0,63})(.*)$/, unsafeProtocol = {
      javascript: true,
      "javascript:": true
    }, hostlessProtocol = {
      javascript: true,
      "javascript:": true
    }, slashedProtocol = {
      http: true,
      https: true,
      ftp: true,
      gopher: true,
      file: true,
      "http:": true,
      "https:": true,
      "ftp:": true,
      "gopher:": true,
      "file:": true
    }, querystring = dew$13();
    function urlParse(url, parseQueryString, slashesDenoteHost) {
      if (url && typeof url === "object" && url instanceof Url2) {
        return url;
      }
      var u = new Url2();
      u.parse(url, parseQueryString, slashesDenoteHost);
      return u;
    }
    Url2.prototype.parse = function(url, parseQueryString, slashesDenoteHost) {
      if (typeof url !== "string") {
        throw new TypeError("Parameter 'url' must be a string, not " + typeof url);
      }
      var queryIndex = url.indexOf("?"), splitter = queryIndex !== -1 && queryIndex < url.indexOf("#") ? "?" : "#", uSplit = url.split(splitter), slashRegex = /\\/g;
      uSplit[0] = uSplit[0].replace(slashRegex, "/");
      url = uSplit.join(splitter);
      var rest = url;
      rest = rest.trim();
      if (!slashesDenoteHost && url.split("#").length === 1) {
        var simplePath = simplePathPattern.exec(rest);
        if (simplePath) {
          this.path = rest;
          this.href = rest;
          this.pathname = simplePath[1];
          if (simplePath[2]) {
            this.search = simplePath[2];
            if (parseQueryString) {
              this.query = querystring.parse(this.search.substr(1));
            } else {
              this.query = this.search.substr(1);
            }
          } else if (parseQueryString) {
            this.search = "";
            this.query = {};
          }
          return this;
        }
      }
      var proto = protocolPattern.exec(rest);
      if (proto) {
        proto = proto[0];
        var lowerProto = proto.toLowerCase();
        this.protocol = lowerProto;
        rest = rest.substr(proto.length);
      }
      if (slashesDenoteHost || proto || rest.match(/^\/\/[^@/]+@[^@/]+/)) {
        var slashes = rest.substr(0, 2) === "//";
        if (slashes && !(proto && hostlessProtocol[proto])) {
          rest = rest.substr(2);
          this.slashes = true;
        }
      }
      if (!hostlessProtocol[proto] && (slashes || proto && !slashedProtocol[proto])) {
        var hostEnd = -1;
        for (var i = 0; i < hostEndingChars.length; i++) {
          var hec = rest.indexOf(hostEndingChars[i]);
          if (hec !== -1 && (hostEnd === -1 || hec < hostEnd)) {
            hostEnd = hec;
          }
        }
        var auth, atSign;
        if (hostEnd === -1) {
          atSign = rest.lastIndexOf("@");
        } else {
          atSign = rest.lastIndexOf("@", hostEnd);
        }
        if (atSign !== -1) {
          auth = rest.slice(0, atSign);
          rest = rest.slice(atSign + 1);
          this.auth = decodeURIComponent(auth);
        }
        hostEnd = -1;
        for (var i = 0; i < nonHostChars.length; i++) {
          var hec = rest.indexOf(nonHostChars[i]);
          if (hec !== -1 && (hostEnd === -1 || hec < hostEnd)) {
            hostEnd = hec;
          }
        }
        if (hostEnd === -1) {
          hostEnd = rest.length;
        }
        this.host = rest.slice(0, hostEnd);
        rest = rest.slice(hostEnd);
        this.parseHost();
        this.hostname = this.hostname || "";
        var ipv6Hostname = this.hostname[0] === "[" && this.hostname[this.hostname.length - 1] === "]";
        if (!ipv6Hostname) {
          var hostparts = this.hostname.split(/\./);
          for (var i = 0, l = hostparts.length; i < l; i++) {
            var part = hostparts[i];
            if (!part) {
              continue;
            }
            if (!part.match(hostnamePartPattern)) {
              var newpart = "";
              for (var j = 0, k = part.length; j < k; j++) {
                if (part.charCodeAt(j) > 127) {
                  newpart += "x";
                } else {
                  newpart += part[j];
                }
              }
              if (!newpart.match(hostnamePartPattern)) {
                var validParts = hostparts.slice(0, i);
                var notHost = hostparts.slice(i + 1);
                var bit = part.match(hostnamePartStart);
                if (bit) {
                  validParts.push(bit[1]);
                  notHost.unshift(bit[2]);
                }
                if (notHost.length) {
                  rest = "/" + notHost.join(".") + rest;
                }
                this.hostname = validParts.join(".");
                break;
              }
            }
          }
        }
        if (this.hostname.length > hostnameMaxLen) {
          this.hostname = "";
        } else {
          this.hostname = this.hostname.toLowerCase();
        }
        if (!ipv6Hostname) {
          this.hostname = punycode.toASCII(this.hostname);
        }
        var p = this.port ? ":" + this.port : "";
        var h = this.hostname || "";
        this.host = h + p;
        this.href += this.host;
        if (ipv6Hostname) {
          this.hostname = this.hostname.substr(1, this.hostname.length - 2);
          if (rest[0] !== "/") {
            rest = "/" + rest;
          }
        }
      }
      if (!unsafeProtocol[lowerProto]) {
        for (var i = 0, l = autoEscape.length; i < l; i++) {
          var ae = autoEscape[i];
          if (rest.indexOf(ae) === -1) {
            continue;
          }
          var esc = encodeURIComponent(ae);
          if (esc === ae) {
            esc = escape(ae);
          }
          rest = rest.split(ae).join(esc);
        }
      }
      var hash = rest.indexOf("#");
      if (hash !== -1) {
        this.hash = rest.substr(hash);
        rest = rest.slice(0, hash);
      }
      var qm = rest.indexOf("?");
      if (qm !== -1) {
        this.search = rest.substr(qm);
        this.query = rest.substr(qm + 1);
        if (parseQueryString) {
          this.query = querystring.parse(this.query);
        }
        rest = rest.slice(0, qm);
      } else if (parseQueryString) {
        this.search = "";
        this.query = {};
      }
      if (rest) {
        this.pathname = rest;
      }
      if (slashedProtocol[lowerProto] && this.hostname && !this.pathname) {
        this.pathname = "/";
      }
      if (this.pathname || this.search) {
        var p = this.pathname || "";
        var s = this.search || "";
        this.path = p + s;
      }
      this.href = this.format();
      return this;
    };
    function urlFormat(obj) {
      if (typeof obj === "string") {
        obj = urlParse(obj);
      }
      if (!(obj instanceof Url2)) {
        return Url2.prototype.format.call(obj);
      }
      return obj.format();
    }
    Url2.prototype.format = function() {
      var auth = this.auth || "";
      if (auth) {
        auth = encodeURIComponent(auth);
        auth = auth.replace(/%3A/i, ":");
        auth += "@";
      }
      var protocol = this.protocol || "", pathname = this.pathname || "", hash = this.hash || "", host = false, query = "";
      if (this.host) {
        host = auth + this.host;
      } else if (this.hostname) {
        host = auth + (this.hostname.indexOf(":") === -1 ? this.hostname : "[" + this.hostname + "]");
        if (this.port) {
          host += ":" + this.port;
        }
      }
      if (this.query && typeof this.query === "object" && Object.keys(this.query).length) {
        query = querystring.stringify(this.query, {
          arrayFormat: "repeat",
          addQueryPrefix: false
        });
      }
      var search = this.search || query && "?" + query || "";
      if (protocol && protocol.substr(-1) !== ":") {
        protocol += ":";
      }
      if (this.slashes || (!protocol || slashedProtocol[protocol]) && host !== false) {
        host = "//" + (host || "");
        if (pathname && pathname.charAt(0) !== "/") {
          pathname = "/" + pathname;
        }
      } else if (!host) {
        host = "";
      }
      if (hash && hash.charAt(0) !== "#") {
        hash = "#" + hash;
      }
      if (search && search.charAt(0) !== "?") {
        search = "?" + search;
      }
      pathname = pathname.replace(/[?#]/g, function(match) {
        return encodeURIComponent(match);
      });
      search = search.replace("#", "%23");
      return protocol + host + pathname + search + hash;
    };
    function urlResolve(source, relative) {
      return urlParse(source, false, true).resolve(relative);
    }
    Url2.prototype.resolve = function(relative) {
      return this.resolveObject(urlParse(relative, false, true)).format();
    };
    function urlResolveObject(source, relative) {
      if (!source) {
        return relative;
      }
      return urlParse(source, false, true).resolveObject(relative);
    }
    Url2.prototype.resolveObject = function(relative) {
      if (typeof relative === "string") {
        var rel = new Url2();
        rel.parse(relative, false, true);
        relative = rel;
      }
      var result = new Url2();
      var tkeys = Object.keys(this);
      for (var tk = 0; tk < tkeys.length; tk++) {
        var tkey = tkeys[tk];
        result[tkey] = this[tkey];
      }
      result.hash = relative.hash;
      if (relative.href === "") {
        result.href = result.format();
        return result;
      }
      if (relative.slashes && !relative.protocol) {
        var rkeys = Object.keys(relative);
        for (var rk = 0; rk < rkeys.length; rk++) {
          var rkey = rkeys[rk];
          if (rkey !== "protocol") {
            result[rkey] = relative[rkey];
          }
        }
        if (slashedProtocol[result.protocol] && result.hostname && !result.pathname) {
          result.pathname = "/";
          result.path = result.pathname;
        }
        result.href = result.format();
        return result;
      }
      if (relative.protocol && relative.protocol !== result.protocol) {
        if (!slashedProtocol[relative.protocol]) {
          var keys = Object.keys(relative);
          for (var v = 0; v < keys.length; v++) {
            var k = keys[v];
            result[k] = relative[k];
          }
          result.href = result.format();
          return result;
        }
        result.protocol = relative.protocol;
        if (!relative.host && !hostlessProtocol[relative.protocol]) {
          var relPath = (relative.pathname || "").split("/");
          while (relPath.length && !(relative.host = relPath.shift())) {
          }
          if (!relative.host) {
            relative.host = "";
          }
          if (!relative.hostname) {
            relative.hostname = "";
          }
          if (relPath[0] !== "") {
            relPath.unshift("");
          }
          if (relPath.length < 2) {
            relPath.unshift("");
          }
          result.pathname = relPath.join("/");
        } else {
          result.pathname = relative.pathname;
        }
        result.search = relative.search;
        result.query = relative.query;
        result.host = relative.host || "";
        result.auth = relative.auth;
        result.hostname = relative.hostname || relative.host;
        result.port = relative.port;
        if (result.pathname || result.search) {
          var p = result.pathname || "";
          var s = result.search || "";
          result.path = p + s;
        }
        result.slashes = result.slashes || relative.slashes;
        result.href = result.format();
        return result;
      }
      var isSourceAbs = result.pathname && result.pathname.charAt(0) === "/", isRelAbs = relative.host || relative.pathname && relative.pathname.charAt(0) === "/", mustEndAbs = isRelAbs || isSourceAbs || result.host && relative.pathname, removeAllDots = mustEndAbs, srcPath = result.pathname && result.pathname.split("/") || [], relPath = relative.pathname && relative.pathname.split("/") || [], psychotic = result.protocol && !slashedProtocol[result.protocol];
      if (psychotic) {
        result.hostname = "";
        result.port = null;
        if (result.host) {
          if (srcPath[0] === "") {
            srcPath[0] = result.host;
          } else {
            srcPath.unshift(result.host);
          }
        }
        result.host = "";
        if (relative.protocol) {
          relative.hostname = null;
          relative.port = null;
          if (relative.host) {
            if (relPath[0] === "") {
              relPath[0] = relative.host;
            } else {
              relPath.unshift(relative.host);
            }
          }
          relative.host = null;
        }
        mustEndAbs = mustEndAbs && (relPath[0] === "" || srcPath[0] === "");
      }
      if (isRelAbs) {
        result.host = relative.host || relative.host === "" ? relative.host : result.host;
        result.hostname = relative.hostname || relative.hostname === "" ? relative.hostname : result.hostname;
        result.search = relative.search;
        result.query = relative.query;
        srcPath = relPath;
      } else if (relPath.length) {
        if (!srcPath) {
          srcPath = [];
        }
        srcPath.pop();
        srcPath = srcPath.concat(relPath);
        result.search = relative.search;
        result.query = relative.query;
      } else if (relative.search != null) {
        if (psychotic) {
          result.host = srcPath.shift();
          result.hostname = result.host;
          var authInHost = result.host && result.host.indexOf("@") > 0 ? result.host.split("@") : false;
          if (authInHost) {
            result.auth = authInHost.shift();
            result.hostname = authInHost.shift();
            result.host = result.hostname;
          }
        }
        result.search = relative.search;
        result.query = relative.query;
        if (result.pathname !== null || result.search !== null) {
          result.path = (result.pathname ? result.pathname : "") + (result.search ? result.search : "");
        }
        result.href = result.format();
        return result;
      }
      if (!srcPath.length) {
        result.pathname = null;
        if (result.search) {
          result.path = "/" + result.search;
        } else {
          result.path = null;
        }
        result.href = result.format();
        return result;
      }
      var last = srcPath.slice(-1)[0];
      var hasTrailingSlash = (result.host || relative.host || srcPath.length > 1) && (last === "." || last === "..") || last === "";
      var up = 0;
      for (var i = srcPath.length; i >= 0; i--) {
        last = srcPath[i];
        if (last === ".") {
          srcPath.splice(i, 1);
        } else if (last === "..") {
          srcPath.splice(i, 1);
          up++;
        } else if (up) {
          srcPath.splice(i, 1);
          up--;
        }
      }
      if (!mustEndAbs && !removeAllDots) {
        for (; up--; up) {
          srcPath.unshift("..");
        }
      }
      if (mustEndAbs && srcPath[0] !== "" && (!srcPath[0] || srcPath[0].charAt(0) !== "/")) {
        srcPath.unshift("");
      }
      if (hasTrailingSlash && srcPath.join("/").substr(-1) !== "/") {
        srcPath.push("");
      }
      var isAbsolute = srcPath[0] === "" || srcPath[0] && srcPath[0].charAt(0) === "/";
      if (psychotic) {
        result.hostname = isAbsolute ? "" : srcPath.length ? srcPath.shift() : "";
        result.host = result.hostname;
        var authInHost = result.host && result.host.indexOf("@") > 0 ? result.host.split("@") : false;
        if (authInHost) {
          result.auth = authInHost.shift();
          result.hostname = authInHost.shift();
          result.host = result.hostname;
        }
      }
      mustEndAbs = mustEndAbs || result.host && srcPath.length;
      if (mustEndAbs && !isAbsolute) {
        srcPath.unshift("");
      }
      if (srcPath.length > 0) {
        result.pathname = srcPath.join("/");
      } else {
        result.pathname = null;
        result.path = null;
      }
      if (result.pathname !== null || result.search !== null) {
        result.path = (result.pathname ? result.pathname : "") + (result.search ? result.search : "");
      }
      result.auth = relative.auth || result.auth;
      result.slashes = result.slashes || relative.slashes;
      result.href = result.format();
      return result;
    };
    Url2.prototype.parseHost = function() {
      var host = this.host;
      var port = portPattern.exec(host);
      if (port) {
        port = port[0];
        if (port !== ":") {
          this.port = port.substr(1);
        }
        host = host.substr(0, host.length - port.length);
      }
      if (host) {
        this.hostname = host;
      }
    };
    exports$16.parse = urlParse;
    exports$16.resolve = urlResolve;
    exports$16.resolveObject = urlResolveObject;
    exports$16.format = urlFormat;
    exports$16.Url = Url2;
    return exports$16;
  }
  function fileURLToPath(path) {
    if (typeof path === "string") path = new URL(path);
    else if (!(path instanceof URL)) {
      throw new Deno.errors.InvalidData(
        "invalid argument path , must be a string or URL"
      );
    }
    if (path.protocol !== "file:") {
      throw new Deno.errors.InvalidData("invalid url scheme");
    }
    return isWindows ? getPathFromURLWin(path) : getPathFromURLPosix(path);
  }
  function getPathFromURLWin(url) {
    const hostname = url.hostname;
    let pathname = url.pathname;
    for (let n = 0; n < pathname.length; n++) {
      if (pathname[n] === "%") {
        const third = pathname.codePointAt(n + 2) || 32;
        if (pathname[n + 1] === "2" && third === 102 || // 2f 2F /
        pathname[n + 1] === "5" && third === 99) {
          throw new Deno.errors.InvalidData(
            "must not include encoded \\ or / characters"
          );
        }
      }
    }
    pathname = pathname.replace(forwardSlashRegEx, "\\");
    pathname = decodeURIComponent(pathname);
    if (hostname !== "") {
      return `\\\\${hostname}${pathname}`;
    } else {
      const letter = pathname.codePointAt(1) | 32;
      const sep = pathname[2];
      if (letter < CHAR_LOWERCASE_A || letter > CHAR_LOWERCASE_Z || // a..z A..Z
      sep !== ":") {
        throw new Deno.errors.InvalidData("file url path must be absolute");
      }
      return pathname.slice(1);
    }
  }
  function getPathFromURLPosix(url) {
    if (url.hostname !== "") {
      throw new Deno.errors.InvalidData("invalid file url hostname");
    }
    const pathname = url.pathname;
    for (let n = 0; n < pathname.length; n++) {
      if (pathname[n] === "%") {
        const third = pathname.codePointAt(n + 2) || 32;
        if (pathname[n + 1] === "2" && third === 102) {
          throw new Deno.errors.InvalidData(
            "must not include encoded / characters"
          );
        }
      }
    }
    return decodeURIComponent(pathname);
  }
  function pathToFileURL(filepath) {
    let resolved = exports6.resolve(filepath);
    const filePathLast = filepath.charCodeAt(filepath.length - 1);
    if ((filePathLast === CHAR_FORWARD_SLASH || isWindows && filePathLast === CHAR_BACKWARD_SLASH) && resolved[resolved.length - 1] !== exports6.sep) {
      resolved += "/";
    }
    const outURL = new URL("file://");
    if (resolved.includes("%")) resolved = resolved.replace(percentRegEx, "%25");
    if (!isWindows && resolved.includes("\\")) {
      resolved = resolved.replace(backslashRegEx, "%5C");
    }
    if (resolved.includes("\n")) resolved = resolved.replace(newlineRegEx, "%0A");
    if (resolved.includes("\r")) {
      resolved = resolved.replace(carriageReturnRegEx, "%0D");
    }
    if (resolved.includes("	")) resolved = resolved.replace(tabRegEx, "%09");
    outURL.pathname = resolved;
    return outURL;
  }
  var empty, exports$82, _dewExec$72, _global, exports$72, _dewExec$62, exports$62, _dewExec$52, exports$52, _dewExec$42, exports$42, _dewExec$32, exports$32, _dewExec$23, exports$23, _dewExec$13, exports$16, _dewExec6, exports7, processPlatform, Url, format, resolve, resolveObject, parse, _URL, CHAR_BACKWARD_SLASH, CHAR_FORWARD_SLASH, CHAR_LOWERCASE_A, CHAR_LOWERCASE_Z, isWindows, forwardSlashRegEx, percentRegEx, backslashRegEx, newlineRegEx, carriageReturnRegEx, tabRegEx;
  var init_url = __esm({
    "node_modules/@jspm/core/nodelibs/browser/url.js"() {
      init_dirname();
      init_buffer2();
      init_process2();
      init_punycode();
      init_chunk_DtcTpLWz();
      init_chunk_BlJi4mNy();
      init_chunk_DEMDiNwt();
      empty = Object.freeze(/* @__PURE__ */ Object.create(null));
      exports$82 = {};
      _dewExec$72 = false;
      _global = typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : global;
      exports$72 = {};
      _dewExec$62 = false;
      exports$62 = {};
      _dewExec$52 = false;
      exports$52 = {};
      _dewExec$42 = false;
      exports$42 = {};
      _dewExec$32 = false;
      exports$32 = {};
      _dewExec$23 = false;
      exports$23 = {};
      _dewExec$13 = false;
      exports$16 = {};
      _dewExec6 = false;
      exports7 = dew6();
      exports7["parse"];
      exports7["resolve"];
      exports7["resolveObject"];
      exports7["format"];
      exports7["Url"];
      processPlatform = typeof Deno !== "undefined" ? Deno.build.os === "windows" ? "win32" : Deno.build.os : void 0;
      exports7.URL = typeof URL !== "undefined" ? URL : null;
      exports7.pathToFileURL = pathToFileURL;
      exports7.fileURLToPath = fileURLToPath;
      Url = exports7.Url;
      format = exports7.format;
      resolve = exports7.resolve;
      resolveObject = exports7.resolveObject;
      parse = exports7.parse;
      _URL = exports7.URL;
      CHAR_BACKWARD_SLASH = 92;
      CHAR_FORWARD_SLASH = 47;
      CHAR_LOWERCASE_A = 97;
      CHAR_LOWERCASE_Z = 122;
      isWindows = processPlatform === "win32";
      forwardSlashRegEx = /\//g;
      percentRegEx = /%/g;
      backslashRegEx = /\\/g;
      newlineRegEx = /\n/g;
      carriageReturnRegEx = /\r/g;
      tabRegEx = /\t/g;
    }
  });

  // node_modules/ws/browser.js
  var require_browser5 = __commonJS({
    "node_modules/ws/browser.js"(exports8, module) {
      "use strict";
      init_dirname();
      init_buffer2();
      init_process2();
      module.exports = function() {
        throw new Error(
          "ws does not work in the browser. Browser clients must use the native WebSocket object"
        );
      };
    }
  });

  // build/lib/BufferedDuplex.js
  var require_BufferedDuplex = __commonJS({
    "build/lib/BufferedDuplex.js"(exports8) {
      "use strict";
      init_dirname();
      init_buffer2();
      init_process2();
      Object.defineProperty(exports8, "__esModule", { value: true });
      exports8.BufferedDuplex = void 0;
      exports8.writev = writev;
      var readable_stream_1 = require_browser3();
      var buffer_1 = (init_buffer(), __toCommonJS(buffer_exports));
      function writev(chunks, cb) {
        const buffers = new Array(chunks.length);
        for (let i = 0; i < chunks.length; i++) {
          if (typeof chunks[i].chunk === "string") {
            buffers[i] = buffer_1.Buffer.from(chunks[i].chunk, "utf8");
          } else {
            buffers[i] = chunks[i].chunk;
          }
        }
        this._write(buffer_1.Buffer.concat(buffers), "binary", cb);
      }
      var BufferedDuplex = class extends readable_stream_1.Duplex {
        socket;
        proxy;
        isSocketOpen;
        writeQueue;
        constructor(opts, proxy, socket) {
          super({
            objectMode: true
          });
          this.proxy = proxy;
          this.socket = socket;
          this.writeQueue = [];
          if (!opts.objectMode) {
            this._writev = writev.bind(this);
          }
          this.isSocketOpen = false;
          this.proxy.on("data", (chunk) => {
            if (!this.destroyed && this.readable) {
              this.push(chunk);
            }
          });
        }
        _read(size) {
          this.proxy.read(size);
        }
        _write(chunk, encoding, cb) {
          if (!this.isSocketOpen) {
            this.writeQueue.push({ chunk, encoding, cb });
          } else {
            this.writeToProxy(chunk, encoding, cb);
          }
        }
        _final(callback) {
          this.writeQueue = [];
          this.proxy.end(callback);
        }
        _destroy(err, callback) {
          this.writeQueue = [];
          this.proxy.destroy();
          callback(err);
        }
        socketReady() {
          this.emit("connect");
          this.isSocketOpen = true;
          this.processWriteQueue();
        }
        writeToProxy(chunk, encoding, cb) {
          if (this.proxy.write(chunk, encoding) === false) {
            this.proxy.once("drain", cb);
          } else {
            cb();
          }
        }
        processWriteQueue() {
          while (this.writeQueue.length > 0) {
            const { chunk, encoding, cb } = this.writeQueue.shift();
            this.writeToProxy(chunk, encoding, cb);
          }
        }
      };
      exports8.BufferedDuplex = BufferedDuplex;
    }
  });

  // build/lib/connect/ws.js
  var require_ws = __commonJS({
    "build/lib/connect/ws.js"(exports8) {
      "use strict";
      init_dirname();
      init_buffer2();
      init_process2();
      var __importDefault = exports8 && exports8.__importDefault || function(mod) {
        return mod && mod.__esModule ? mod : { "default": mod };
      };
      Object.defineProperty(exports8, "__esModule", { value: true });
      exports8.streamBuilder = exports8.browserStreamBuilder = void 0;
      var buffer_1 = (init_buffer(), __toCommonJS(buffer_exports));
      var ws_1 = __importDefault(require_browser5());
      var debug_1 = __importDefault(require_browser4());
      var readable_stream_1 = require_browser3();
      var is_browser_1 = __importDefault(require_is_browser());
      var BufferedDuplex_1 = require_BufferedDuplex();
      var debug = (0, debug_1.default)("mqttjs:ws");
      var WSS_OPTIONS = [
        "rejectUnauthorized",
        "ca",
        "cert",
        "key",
        "pfx",
        "passphrase"
      ];
      function buildUrl(opts, client) {
        let url = `${opts.protocol}://${opts.hostname}:${opts.port}${opts.path}`;
        if (typeof opts.transformWsUrl === "function") {
          url = opts.transformWsUrl(url, opts, client);
        }
        return url;
      }
      function setDefaultOpts(opts) {
        const options = opts;
        if (!opts.port) {
          if (opts.protocol === "wss") {
            options.port = 443;
          } else {
            options.port = 80;
          }
        }
        if (!opts.path) {
          options.path = "/";
        }
        if (!opts.wsOptions) {
          options.wsOptions = {};
        }
        if (!is_browser_1.default && !opts.forceNativeWebSocket && opts.protocol === "wss") {
          WSS_OPTIONS.forEach((prop) => {
            if (Object.prototype.hasOwnProperty.call(opts, prop) && !Object.prototype.hasOwnProperty.call(opts.wsOptions, prop)) {
              options.wsOptions[prop] = opts[prop];
            }
          });
        }
        return options;
      }
      function setDefaultBrowserOpts(opts) {
        const options = setDefaultOpts(opts);
        if (!options.hostname) {
          options.hostname = options.host;
        }
        if (!options.hostname) {
          if (typeof document === "undefined") {
            throw new Error("Could not determine host. Specify host manually.");
          }
          const parsed = new URL(document.URL);
          options.hostname = parsed.hostname;
          if (!options.port) {
            options.port = Number(parsed.port);
          }
        }
        if (options.objectMode === void 0) {
          options.objectMode = !(options.binary === true || options.binary === void 0);
        }
        return options;
      }
      function createWebSocket(client, url, opts) {
        debug("createWebSocket");
        debug(`protocol: ${opts.protocolId} ${opts.protocolVersion}`);
        const websocketSubProtocol = opts.protocolId === "MQIsdp" && opts.protocolVersion === 3 ? "mqttv3.1" : "mqtt";
        debug(`creating new Websocket for url: ${url} and protocol: ${websocketSubProtocol}`);
        let socket;
        if (opts.createWebsocket) {
          socket = opts.createWebsocket(url, [websocketSubProtocol], opts);
        } else {
          socket = new ws_1.default(url, [websocketSubProtocol], opts.wsOptions);
        }
        return socket;
      }
      function createBrowserWebSocket(client, opts) {
        const websocketSubProtocol = opts.protocolId === "MQIsdp" && opts.protocolVersion === 3 ? "mqttv3.1" : "mqtt";
        const url = buildUrl(opts, client);
        let socket;
        if (opts.createWebsocket) {
          socket = opts.createWebsocket(url, [websocketSubProtocol], opts);
        } else {
          socket = new WebSocket(url, [websocketSubProtocol]);
        }
        socket.binaryType = "arraybuffer";
        return socket;
      }
      var streamBuilder = (client, opts) => {
        debug("streamBuilder");
        const options = setDefaultOpts(opts);
        options.hostname = options.hostname || options.host || "localhost";
        const url = buildUrl(options, client);
        const socket = createWebSocket(client, url, options);
        const webSocketStream = ws_1.default.createWebSocketStream(socket, options.wsOptions);
        webSocketStream["url"] = url;
        socket.on("close", () => {
          webSocketStream.destroy();
        });
        return webSocketStream;
      };
      exports8.streamBuilder = streamBuilder;
      var browserStreamBuilder = (client, opts) => {
        debug("browserStreamBuilder");
        let stream;
        const options = setDefaultBrowserOpts(opts);
        const bufferSize = options.browserBufferSize || 1024 * 512;
        const bufferTimeout = opts.browserBufferTimeout || 1e3;
        const coerceToBuffer = !opts.objectMode;
        const socket = createBrowserWebSocket(client, opts);
        const proxy = buildProxy(opts, socketWriteBrowser, socketEndBrowser);
        if (!opts.objectMode) {
          proxy._writev = BufferedDuplex_1.writev.bind(proxy);
        }
        proxy.on("close", () => {
          socket.close();
        });
        const eventListenerSupport = typeof socket.addEventListener !== "undefined";
        if (socket.readyState === socket.OPEN) {
          stream = proxy;
          stream.socket = socket;
        } else {
          stream = new BufferedDuplex_1.BufferedDuplex(opts, proxy, socket);
          if (eventListenerSupport) {
            socket.addEventListener("open", onOpen);
          } else {
            socket.onopen = onOpen;
          }
        }
        if (eventListenerSupport) {
          socket.addEventListener("close", onClose);
          socket.addEventListener("error", onError);
          socket.addEventListener("message", onMessage);
        } else {
          socket.onclose = onClose;
          socket.onerror = onError;
          socket.onmessage = onMessage;
        }
        function buildProxy(pOptions, socketWrite, socketEnd) {
          const _proxy = new readable_stream_1.Transform({
            objectMode: pOptions.objectMode
          });
          _proxy._write = socketWrite;
          _proxy._flush = socketEnd;
          return _proxy;
        }
        function onOpen() {
          debug("WebSocket onOpen");
          if (stream instanceof BufferedDuplex_1.BufferedDuplex) {
            stream.socketReady();
          }
        }
        function onClose(event) {
          debug("WebSocket onClose", event);
          stream.end();
          stream.destroy();
        }
        function onError(err) {
          debug("WebSocket onError", err);
          const error = new Error("WebSocket error");
          error["event"] = err;
          stream.destroy(error);
        }
        async function onMessage(event) {
          if (!proxy || !proxy.readable || !proxy.writable) {
            return;
          }
          let { data } = event;
          if (data instanceof ArrayBuffer)
            data = buffer_1.Buffer.from(data);
          else if (data instanceof Blob)
            data = buffer_1.Buffer.from(await new Response(data).arrayBuffer());
          else
            data = buffer_1.Buffer.from(data, "utf8");
          proxy.push(data);
        }
        function socketWriteBrowser(chunk, enc, next) {
          if (socket.bufferedAmount > bufferSize) {
            setTimeout(socketWriteBrowser, bufferTimeout, chunk, enc, next);
            return;
          }
          if (coerceToBuffer && typeof chunk === "string") {
            chunk = buffer_1.Buffer.from(chunk, "utf8");
          }
          try {
            socket.send(chunk);
          } catch (err) {
            return next(err);
          }
          next();
        }
        function socketEndBrowser(done) {
          socket.close();
          done();
        }
        return stream;
      };
      exports8.browserStreamBuilder = browserStreamBuilder;
    }
  });

  // node_modules/@jspm/core/nodelibs/browser/net.js
  var net_exports = {};
  __export(net_exports, {
    Server: () => unimplemented3,
    Socket: () => unimplemented3,
    Stream: () => unimplemented3,
    _createServerHandle: () => unimplemented3,
    _normalizeArgs: () => unimplemented3,
    _setSimultaneousAccepts: () => unimplemented3,
    connect: () => unimplemented3,
    createConnection: () => unimplemented3,
    createServer: () => unimplemented3,
    default: () => net,
    isIP: () => unimplemented3,
    isIPv4: () => unimplemented3,
    isIPv6: () => unimplemented3
  });
  function unimplemented3() {
    throw new Error("Node.js net module is not supported by JSPM core outside of Node.js");
  }
  var net;
  var init_net = __esm({
    "node_modules/@jspm/core/nodelibs/browser/net.js"() {
      init_dirname();
      init_buffer2();
      init_process2();
      net = {
        _createServerHandle: unimplemented3,
        _normalizeArgs: unimplemented3,
        _setSimultaneousAccepts: unimplemented3,
        connect: unimplemented3,
        createConnection: unimplemented3,
        createServer: unimplemented3,
        isIP: unimplemented3,
        isIPv4: unimplemented3,
        isIPv6: unimplemented3,
        Server: unimplemented3,
        Socket: unimplemented3,
        Stream: unimplemented3
      };
    }
  });

  // socks-stub:./socks
  var require_socks = __commonJS({
    "socks-stub:./socks"(exports8, module) {
      init_dirname();
      init_buffer2();
      init_process2();
      module.exports = {};
    }
  });

  // build/lib/connect/tcp.js
  var require_tcp = __commonJS({
    "build/lib/connect/tcp.js"(exports8) {
      "use strict";
      init_dirname();
      init_buffer2();
      init_process2();
      var __importDefault = exports8 && exports8.__importDefault || function(mod) {
        return mod && mod.__esModule ? mod : { "default": mod };
      };
      Object.defineProperty(exports8, "__esModule", { value: true });
      var net_1 = __importDefault((init_net(), __toCommonJS(net_exports)));
      var debug_1 = __importDefault(require_browser4());
      var socks_1 = __importDefault(require_socks());
      var debug = (0, debug_1.default)("mqttjs:tcp");
      var buildStream = (client, opts) => {
        opts.port = opts.port || 1883;
        opts.hostname = opts.hostname || opts.host || "localhost";
        if (opts.socksProxy) {
          return (0, socks_1.default)(opts.hostname, opts.port, opts.socksProxy, {
            timeout: opts.socksTimeout
          });
        }
        const { port, path } = opts;
        const host = opts.hostname;
        debug("port %d and host %s", port, host);
        return net_1.default.createConnection({ port, host, path });
      };
      exports8.default = buildStream;
    }
  });

  // node_modules/esbuild-plugin-polyfill-node/polyfills/empty.js
  var empty_exports = {};
  __export(empty_exports, {
    default: () => empty_default
  });
  var empty_default;
  var init_empty = __esm({
    "node_modules/esbuild-plugin-polyfill-node/polyfills/empty.js"() {
      init_dirname();
      init_buffer2();
      init_process2();
      empty_default = {};
    }
  });

  // build/lib/connect/tls.js
  var require_tls = __commonJS({
    "build/lib/connect/tls.js"(exports8) {
      "use strict";
      init_dirname();
      init_buffer2();
      init_process2();
      var __importDefault = exports8 && exports8.__importDefault || function(mod) {
        return mod && mod.__esModule ? mod : { "default": mod };
      };
      Object.defineProperty(exports8, "__esModule", { value: true });
      var tls_1 = (init_empty(), __toCommonJS(empty_exports));
      var net_1 = __importDefault((init_net(), __toCommonJS(net_exports)));
      var debug_1 = __importDefault(require_browser4());
      var socks_1 = __importDefault(require_socks());
      var debug = (0, debug_1.default)("mqttjs:tls");
      function connect(opts) {
        const { host, port, socksProxy, ...rest } = opts;
        if (socksProxy !== void 0) {
          const socket = (0, socks_1.default)(host, port, socksProxy, {
            timeout: opts.socksTimeout
          });
          return (0, tls_1.connect)({
            ...rest,
            socket
          });
        }
        return (0, tls_1.connect)(opts);
      }
      var buildStream = (client, opts) => {
        opts.port = opts.port || 8883;
        opts.host = opts.hostname || opts.host || "localhost";
        if (net_1.default.isIP(opts.host) === 0) {
          opts.servername = opts.host;
        }
        opts.rejectUnauthorized = opts.rejectUnauthorized !== false;
        delete opts.path;
        debug("port %d host %s rejectUnauthorized %b", opts.port, opts.host, opts.rejectUnauthorized);
        const connection = connect(opts);
        connection.on("secureConnect", () => {
          if (opts.rejectUnauthorized && !connection.authorized) {
            connection.emit("error", new Error("TLS not authorized"));
          } else {
            connection.removeListener("error", handleTLSerrors);
          }
        });
        function handleTLSerrors(err) {
          if (opts.rejectUnauthorized) {
            client.emit("error", err);
          }
          connection.end();
        }
        connection.on("error", handleTLSerrors);
        return connection;
      };
      exports8.default = buildStream;
    }
  });

  // build/lib/connect/wx.js
  var require_wx = __commonJS({
    "build/lib/connect/wx.js"(exports8) {
      "use strict";
      init_dirname();
      init_buffer2();
      init_process2();
      Object.defineProperty(exports8, "__esModule", { value: true });
      var buffer_1 = (init_buffer(), __toCommonJS(buffer_exports));
      var readable_stream_1 = require_browser3();
      var BufferedDuplex_1 = require_BufferedDuplex();
      var socketTask;
      var proxy;
      var stream;
      function buildProxy() {
        const _proxy = new readable_stream_1.Transform();
        _proxy._write = (chunk, encoding, next) => {
          socketTask.send({
            data: chunk.buffer,
            success() {
              next();
            },
            fail(errMsg) {
              next(new Error(errMsg));
            }
          });
        };
        _proxy._flush = (done) => {
          socketTask.close({
            success() {
              done();
            }
          });
        };
        return _proxy;
      }
      function setDefaultOpts(opts) {
        if (!opts.hostname) {
          opts.hostname = "localhost";
        }
        if (!opts.path) {
          opts.path = "/";
        }
        if (!opts.wsOptions) {
          opts.wsOptions = {};
        }
      }
      function buildUrl(opts, client) {
        const protocol = opts.protocol === "wxs" ? "wss" : "ws";
        let url = `${protocol}://${opts.hostname}${opts.path}`;
        if (opts.port && opts.port !== 80 && opts.port !== 443) {
          url = `${protocol}://${opts.hostname}:${opts.port}${opts.path}`;
        }
        if (typeof opts.transformWsUrl === "function") {
          url = opts.transformWsUrl(url, opts, client);
        }
        return url;
      }
      function bindEventHandler() {
        socketTask.onOpen(() => {
          stream.socketReady();
        });
        socketTask.onMessage((res) => {
          let { data } = res;
          if (data instanceof ArrayBuffer)
            data = buffer_1.Buffer.from(data);
          else
            data = buffer_1.Buffer.from(data, "utf8");
          proxy.push(data);
        });
        socketTask.onClose(() => {
          stream.emit("close");
          stream.end();
          stream.destroy();
        });
        socketTask.onError((error) => {
          const err = new Error(error.errMsg);
          stream.destroy(err);
        });
      }
      var buildStream = (client, opts) => {
        opts.hostname = opts.hostname || opts.host;
        if (!opts.hostname) {
          throw new Error("Could not determine host. Specify host manually.");
        }
        const websocketSubProtocol = opts.protocolId === "MQIsdp" && opts.protocolVersion === 3 ? "mqttv3.1" : "mqtt";
        setDefaultOpts(opts);
        const url = buildUrl(opts, client);
        socketTask = wx.connectSocket({
          url,
          protocols: [websocketSubProtocol]
        });
        proxy = buildProxy();
        stream = new BufferedDuplex_1.BufferedDuplex(opts, proxy, socketTask);
        stream._destroy = (err, cb) => {
          socketTask.close({
            success() {
              if (cb)
                cb(err);
            }
          });
        };
        const destroyRef = stream.destroy;
        stream.destroy = (err, cb) => {
          stream.destroy = destroyRef;
          setTimeout(() => {
            socketTask.close({
              fail() {
                stream._destroy(err, cb);
              }
            });
          }, 0);
          return stream;
        };
        bindEventHandler();
        return stream;
      };
      exports8.default = buildStream;
    }
  });

  // build/lib/connect/ali.js
  var require_ali = __commonJS({
    "build/lib/connect/ali.js"(exports8) {
      "use strict";
      init_dirname();
      init_buffer2();
      init_process2();
      Object.defineProperty(exports8, "__esModule", { value: true });
      var buffer_1 = (init_buffer(), __toCommonJS(buffer_exports));
      var readable_stream_1 = require_browser3();
      var BufferedDuplex_1 = require_BufferedDuplex();
      var my;
      var proxy;
      var stream;
      var isInitialized = false;
      function buildProxy() {
        const _proxy = new readable_stream_1.Transform();
        _proxy._write = (chunk, encoding, next) => {
          my.sendSocketMessage({
            data: chunk.buffer,
            success() {
              next();
            },
            fail() {
              next(new Error());
            }
          });
        };
        _proxy._flush = (done) => {
          my.closeSocket({
            success() {
              done();
            }
          });
        };
        return _proxy;
      }
      function setDefaultOpts(opts) {
        if (!opts.hostname) {
          opts.hostname = "localhost";
        }
        if (!opts.path) {
          opts.path = "/";
        }
        if (!opts.wsOptions) {
          opts.wsOptions = {};
        }
      }
      function buildUrl(opts, client) {
        const protocol = opts.protocol === "alis" ? "wss" : "ws";
        let url = `${protocol}://${opts.hostname}${opts.path}`;
        if (opts.port && opts.port !== 80 && opts.port !== 443) {
          url = `${protocol}://${opts.hostname}:${opts.port}${opts.path}`;
        }
        if (typeof opts.transformWsUrl === "function") {
          url = opts.transformWsUrl(url, opts, client);
        }
        return url;
      }
      function bindEventHandler() {
        if (isInitialized)
          return;
        isInitialized = true;
        my.onSocketOpen(() => {
          stream.socketReady();
        });
        my.onSocketMessage((res) => {
          if (typeof res.data === "string") {
            const buffer = buffer_1.Buffer.from(res.data, "base64");
            proxy.push(buffer);
          } else {
            const reader = new FileReader();
            reader.addEventListener("load", () => {
              if (reader.result instanceof ArrayBuffer) {
                proxy.push(buffer_1.Buffer.from(reader.result));
                return;
              }
              proxy.push(buffer_1.Buffer.from(reader.result, "utf-8"));
            });
            reader.readAsArrayBuffer(res.data);
          }
        });
        my.onSocketClose(() => {
          stream.end();
          stream.destroy();
        });
        my.onSocketError((err) => {
          stream.destroy(err);
        });
      }
      var buildStream = (client, opts) => {
        opts.hostname = opts.hostname || opts.host;
        if (!opts.hostname) {
          throw new Error("Could not determine host. Specify host manually.");
        }
        const websocketSubProtocol = opts.protocolId === "MQIsdp" && opts.protocolVersion === 3 ? "mqttv3.1" : "mqtt";
        setDefaultOpts(opts);
        const url = buildUrl(opts, client);
        my = opts.my;
        my.connectSocket({
          url,
          protocols: websocketSubProtocol
        });
        proxy = buildProxy();
        stream = new BufferedDuplex_1.BufferedDuplex(opts, proxy, my);
        bindEventHandler();
        return stream;
      };
      exports8.default = buildStream;
    }
  });

  // build/lib/connect/index.js
  var require_connect = __commonJS({
    "build/lib/connect/index.js"(exports8) {
      "use strict";
      init_dirname();
      init_buffer2();
      init_process2();
      var __importDefault = exports8 && exports8.__importDefault || function(mod) {
        return mod && mod.__esModule ? mod : { "default": mod };
      };
      Object.defineProperty(exports8, "__esModule", { value: true });
      exports8.connectAsync = connectAsync;
      var debug_1 = __importDefault(require_browser4());
      var url_1 = __importDefault((init_url(), __toCommonJS(url_exports)));
      var client_1 = __importDefault(require_client());
      var is_browser_1 = __importDefault(require_is_browser());
      if (typeof process_exports?.nextTick !== "function") {
        process_exports.nextTick = setImmediate;
      }
      var debug = (0, debug_1.default)("mqttjs");
      var protocols = null;
      function parseAuthOptions(opts) {
        let matches;
        if (opts.auth) {
          matches = opts.auth.match(/^(.+):(.+)$/);
          if (matches) {
            const [, username, password] = matches;
            opts.username = username;
            opts.password = password;
          } else {
            opts.username = opts.auth;
          }
        }
      }
      function connect(brokerUrl, opts) {
        debug("connecting to an MQTT broker...");
        if (typeof brokerUrl === "object" && !opts) {
          opts = brokerUrl;
          brokerUrl = "";
        }
        opts = opts || {};
        if (brokerUrl && typeof brokerUrl === "string") {
          const parsedUrl = url_1.default.parse(brokerUrl, true);
          const parsedOptions = {};
          if (parsedUrl.port != null) {
            parsedOptions.port = Number(parsedUrl.port);
          }
          parsedOptions.host = parsedUrl.hostname;
          parsedOptions.query = parsedUrl.query;
          parsedOptions.auth = parsedUrl.auth;
          parsedOptions.protocol = parsedUrl.protocol;
          parsedOptions.path = parsedUrl.path;
          opts = { ...parsedOptions, ...opts };
          if (!opts.protocol) {
            throw new Error("Missing protocol");
          }
          opts.protocol = opts.protocol.replace(/:$/, "");
        }
        opts.unixSocket = opts.unixSocket || opts.protocol?.includes("+unix");
        if (opts.unixSocket) {
          opts.protocol = opts.protocol.replace("+unix", "");
        } else if (!opts.protocol?.startsWith("ws") && !opts.protocol?.startsWith("wx")) {
          delete opts.path;
        }
        parseAuthOptions(opts);
        if (opts.query && typeof opts.query.clientId === "string") {
          opts.clientId = opts.query.clientId;
        }
        if (is_browser_1.default || opts.unixSocket) {
          opts.socksProxy = void 0;
        } else if (opts.socksProxy === void 0 && typeof process_exports !== "undefined") {
          opts.socksProxy = process_exports.env["MQTTJS_SOCKS_PROXY"];
        }
        if (opts.cert && opts.key) {
          if (opts.protocol) {
            if (["mqtts", "wss", "wxs", "alis"].indexOf(opts.protocol) === -1) {
              switch (opts.protocol) {
                case "mqtt":
                  opts.protocol = "mqtts";
                  break;
                case "ws":
                  opts.protocol = "wss";
                  break;
                case "wx":
                  opts.protocol = "wxs";
                  break;
                case "ali":
                  opts.protocol = "alis";
                  break;
                default:
                  throw new Error(`Unknown protocol for secure connection: "${opts.protocol}"!`);
              }
            }
          } else {
            throw new Error("Missing secure protocol key");
          }
        }
        if (!protocols) {
          protocols = {};
          if (!is_browser_1.default && !opts.forceNativeWebSocket) {
            protocols.ws = require_ws().streamBuilder;
            protocols.wss = require_ws().streamBuilder;
            protocols.mqtt = require_tcp().default;
            protocols.tcp = require_tcp().default;
            protocols.ssl = require_tls().default;
            protocols.tls = protocols.ssl;
            protocols.mqtts = require_tls().default;
          } else {
            protocols.ws = require_ws().browserStreamBuilder;
            protocols.wss = require_ws().browserStreamBuilder;
            protocols.wx = require_wx().default;
            protocols.wxs = require_wx().default;
            protocols.ali = require_ali().default;
            protocols.alis = require_ali().default;
          }
        }
        if (!protocols[opts.protocol]) {
          const isSecure = ["mqtts", "wss"].indexOf(opts.protocol) !== -1;
          opts.protocol = [
            "mqtt",
            "mqtts",
            "ws",
            "wss",
            "wx",
            "wxs",
            "ali",
            "alis"
          ].filter((key, index) => {
            if (isSecure && index % 2 === 0) {
              return false;
            }
            return typeof protocols[key] === "function";
          })[0];
        }
        if (opts.clean === false && !opts.clientId) {
          throw new Error("Missing clientId for unclean clients");
        }
        if (opts.protocol) {
          opts.defaultProtocol = opts.protocol;
        }
        function wrapper(client2) {
          if (opts.servers) {
            if (!client2._reconnectCount || client2._reconnectCount === opts.servers.length) {
              client2._reconnectCount = 0;
            }
            opts.host = opts.servers[client2._reconnectCount].host;
            opts.port = opts.servers[client2._reconnectCount].port;
            opts.protocol = !opts.servers[client2._reconnectCount].protocol ? opts.defaultProtocol : opts.servers[client2._reconnectCount].protocol;
            opts.hostname = opts.host;
            client2._reconnectCount++;
          }
          debug("calling streambuilder for", opts.protocol);
          return protocols[opts.protocol](client2, opts);
        }
        const client = new client_1.default(wrapper, opts);
        client.on("error", () => {
        });
        return client;
      }
      function connectAsync(brokerUrl, opts, allowRetries = true) {
        return new Promise((resolve2, reject) => {
          const client = connect(brokerUrl, opts);
          const promiseResolutionListeners = {
            connect: (connack) => {
              removePromiseResolutionListeners();
              resolve2(client);
            },
            end: () => {
              removePromiseResolutionListeners();
              resolve2(client);
            },
            error: (err) => {
              removePromiseResolutionListeners();
              client.end();
              reject(err);
            }
          };
          if (allowRetries === false) {
            promiseResolutionListeners.close = () => {
              promiseResolutionListeners.error(new Error("Couldn't connect to server"));
            };
          }
          function removePromiseResolutionListeners() {
            Object.keys(promiseResolutionListeners).forEach((eventName) => {
              client.off(eventName, promiseResolutionListeners[eventName]);
            });
          }
          Object.keys(promiseResolutionListeners).forEach((eventName) => {
            client.on(eventName, promiseResolutionListeners[eventName]);
          });
        });
      }
      exports8.default = connect;
    }
  });

  // build/mqtt.js
  var require_mqtt2 = __commonJS({
    "build/mqtt.js"(exports8) {
      "use strict";
      init_dirname();
      init_buffer2();
      init_process2();
      var __createBinding = exports8 && exports8.__createBinding || (Object.create ? function(o, m, k, k2) {
        if (k2 === void 0) k2 = k;
        var desc = Object.getOwnPropertyDescriptor(m, k);
        if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
          desc = { enumerable: true, get: function() {
            return m[k];
          } };
        }
        Object.defineProperty(o, k2, desc);
      } : function(o, m, k, k2) {
        if (k2 === void 0) k2 = k;
        o[k2] = m[k];
      });
      var __setModuleDefault = exports8 && exports8.__setModuleDefault || (Object.create ? function(o, v) {
        Object.defineProperty(o, "default", { enumerable: true, value: v });
      } : function(o, v) {
        o["default"] = v;
      });
      var __importStar = exports8 && exports8.__importStar || /* @__PURE__ */ function() {
        var ownKeys = function(o) {
          ownKeys = Object.getOwnPropertyNames || function(o2) {
            var ar = [];
            for (var k in o2) if (Object.prototype.hasOwnProperty.call(o2, k)) ar[ar.length] = k;
            return ar;
          };
          return ownKeys(o);
        };
        return function(mod) {
          if (mod && mod.__esModule) return mod;
          var result = {};
          if (mod != null) {
            for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
          }
          __setModuleDefault(result, mod);
          return result;
        };
      }();
      var __exportStar = exports8 && exports8.__exportStar || function(m, exports9) {
        for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports9, p)) __createBinding(exports9, m, p);
      };
      var __importDefault = exports8 && exports8.__importDefault || function(mod) {
        return mod && mod.__esModule ? mod : { "default": mod };
      };
      Object.defineProperty(exports8, "__esModule", { value: true });
      exports8.ReasonCodes = exports8.KeepaliveManager = exports8.UniqueMessageIdProvider = exports8.DefaultMessageIdProvider = exports8.Store = exports8.MqttClient = exports8.connectAsync = exports8.connect = exports8.Client = void 0;
      var client_1 = __importDefault(require_client());
      exports8.MqttClient = client_1.default;
      var default_message_id_provider_1 = __importDefault(require_default_message_id_provider());
      exports8.DefaultMessageIdProvider = default_message_id_provider_1.default;
      var unique_message_id_provider_1 = __importDefault(require_unique_message_id_provider());
      exports8.UniqueMessageIdProvider = unique_message_id_provider_1.default;
      var store_1 = __importDefault(require_store());
      exports8.Store = store_1.default;
      var connect_1 = __importStar(require_connect());
      exports8.connect = connect_1.default;
      Object.defineProperty(exports8, "connectAsync", { enumerable: true, get: function() {
        return connect_1.connectAsync;
      } });
      var KeepaliveManager_1 = __importDefault(require_KeepaliveManager());
      exports8.KeepaliveManager = KeepaliveManager_1.default;
      exports8.Client = client_1.default;
      __exportStar(require_client(), exports8);
      __exportStar(require_shared(), exports8);
      var ack_1 = require_ack();
      Object.defineProperty(exports8, "ReasonCodes", { enumerable: true, get: function() {
        return ack_1.ReasonCodes;
      } });
    }
  });

  // build/index.js
  var require_index = __commonJS({
    "build/index.js"(exports8) {
      init_dirname();
      init_buffer2();
      init_process2();
      var __createBinding = exports8 && exports8.__createBinding || (Object.create ? function(o, m, k, k2) {
        if (k2 === void 0) k2 = k;
        var desc = Object.getOwnPropertyDescriptor(m, k);
        if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
          desc = { enumerable: true, get: function() {
            return m[k];
          } };
        }
        Object.defineProperty(o, k2, desc);
      } : function(o, m, k, k2) {
        if (k2 === void 0) k2 = k;
        o[k2] = m[k];
      });
      var __setModuleDefault = exports8 && exports8.__setModuleDefault || (Object.create ? function(o, v) {
        Object.defineProperty(o, "default", { enumerable: true, value: v });
      } : function(o, v) {
        o["default"] = v;
      });
      var __importStar = exports8 && exports8.__importStar || /* @__PURE__ */ function() {
        var ownKeys = function(o) {
          ownKeys = Object.getOwnPropertyNames || function(o2) {
            var ar = [];
            for (var k in o2) if (Object.prototype.hasOwnProperty.call(o2, k)) ar[ar.length] = k;
            return ar;
          };
          return ownKeys(o);
        };
        return function(mod) {
          if (mod && mod.__esModule) return mod;
          var result = {};
          if (mod != null) {
            for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
          }
          __setModuleDefault(result, mod);
          return result;
        };
      }();
      var __exportStar = exports8 && exports8.__exportStar || function(m, exports9) {
        for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports9, p)) __createBinding(exports9, m, p);
      };
      Object.defineProperty(exports8, "__esModule", { value: true });
      var mqtt = __importStar(require_mqtt2());
      exports8.default = mqtt;
      __exportStar(require_mqtt2(), exports8);
    }
  });
  return require_index();
})();
/*! Bundled license information:

@jspm/core/nodelibs/browser/chunk-DtuTasat.js:
  (*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> *)

safe-buffer/index.js:
  (*! safe-buffer. MIT License. Feross Aboukhadijeh <https://feross.org/opensource> *)

@babel/runtime/helpers/regenerator.js:
  (*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE *)
*/
