var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
var __accessCheck = (obj, member, msg) => {
  if (!member.has(obj))
    throw TypeError("Cannot " + msg);
};
var __privateAdd = (obj, member, value) => {
  if (member.has(obj))
    throw TypeError("Cannot add the same private member more than once");
  member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
};
var __privateMethod = (obj, member, method) => {
  __accessCheck(obj, member, "access private method");
  return method;
};
var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};
var _parseMarkdown, parseMarkdown_fn, _onError, onError_fn;
const main = "";
function createElement(htmlStr = "") {
  const div = document.createElement("div");
  div.innerHTML = htmlStr.trim();
  return div.firstElementChild || div;
}
function getHeight(el) {
  return parseFloat(getComputedStyle(el, null).height.replace("px", ""));
}
function htmlEncode(str) {
  const temp = document.createElement("div");
  temp.innerText = str;
  const output = temp.innerHTML;
  return output;
}
function getQueryParam(name) {
  const match = RegExp(`[?&]${name}=([^&]*)`).exec(window.location.search);
  return match && decodeURIComponent(match[1].replace(/\+/g, " "));
}
function getOffset(el, relativeTo) {
  const getOffsetRecursive = (element) => {
    const rect = element.getBoundingClientRect();
    const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    return {
      top: rect.top + scrollTop,
      left: rect.left + scrollLeft
    };
  };
  const elOffset = getOffsetRecursive(el);
  if (!relativeTo)
    return elOffset;
  const relativeToOffset = getOffsetRecursive(relativeTo);
  return {
    top: elOffset.top - relativeToOffset.top,
    left: elOffset.left - relativeToOffset.left
  };
}
function padWithZeros(vNumber, width) {
  let numAsString = vNumber.toString();
  while (numAsString.length < width) {
    numAsString = `0${numAsString}`;
  }
  return numAsString;
}
function dateFormat(date) {
  const vDay = padWithZeros(date.getDate(), 2);
  const vMonth = padWithZeros(date.getMonth() + 1, 2);
  const vYear = padWithZeros(date.getFullYear(), 2);
  return `${vYear}-${vMonth}-${vDay}`;
}
function timeAgo(date, $t = (n) => n) {
  try {
    const oldTime = date.getTime();
    const currTime = (/* @__PURE__ */ new Date()).getTime();
    const diffValue = currTime - oldTime;
    const days = Math.floor(diffValue / (24 * 3600 * 1e3));
    if (days === 0) {
      const leave1 = diffValue % (24 * 3600 * 1e3);
      const hours = Math.floor(leave1 / (3600 * 1e3));
      if (hours === 0) {
        const leave2 = leave1 % (3600 * 1e3);
        const minutes = Math.floor(leave2 / (60 * 1e3));
        if (minutes === 0) {
          const leave3 = leave2 % (60 * 1e3);
          const seconds = Math.round(leave3 / 1e3);
          if (seconds < 10)
            return $t("now");
          return `${seconds} ${$t("seconds")}`;
        }
        return `${minutes} ${$t("minutes")}`;
      }
      return `${hours} ${$t("hours")}`;
    }
    if (days < 0)
      return $t("now");
    if (days < 8) {
      return `${days} ${$t("days")}`;
    }
    return dateFormat(date);
  } catch (error) {
    console.error(error);
    return " - ";
  }
}
function onImagesLoaded($container, event) {
  if (!$container)
    return;
  const images = $container.getElementsByTagName("img");
  if (!images.length)
    return;
  let loaded = images.length;
  for (let i = 0; i < images.length; i++) {
    if (images[i].complete) {
      loaded--;
    } else {
      images[i].addEventListener("load", () => {
        loaded--;
        if (loaded === 0)
          event();
      });
    }
    if (loaded === 0)
      event();
  }
}
function getGravatarURL(opts) {
  return `${opts.mirror.replace(/\/$/, "")}/${opts.emailMD5}?${opts.params.replace(/^\?/, "")}`;
}
function versionCompare(a, b) {
  const pa = a.split(".");
  const pb = b.split(".");
  for (let i = 0; i < 3; i++) {
    const na = Number(pa[i]);
    const nb = Number(pb[i]);
    if (na > nb)
      return 1;
    if (nb > na)
      return -1;
    if (!Number.isNaN(na) && Number.isNaN(nb))
      return 1;
    if (Number.isNaN(na) && !Number.isNaN(nb))
      return -1;
  }
  return 0;
}
function getCorrectUserAgent() {
  return __async(this, null, function* () {
    const uaRaw = navigator.userAgent;
    if (!navigator.userAgentData || !navigator.userAgentData.getHighEntropyValues) {
      return uaRaw;
    }
    const uaData = navigator.userAgentData;
    let uaGot = null;
    try {
      uaGot = yield uaData.getHighEntropyValues(["platformVersion"]);
    } catch (err) {
      console.error(err);
      return uaRaw;
    }
    const majorPlatformVersion = Number(uaGot.platformVersion.split(".")[0]);
    if (uaData.platform === "Windows") {
      if (majorPlatformVersion >= 13) {
        return uaRaw.replace(/Windows NT 10.0/, "Windows NT 11.0");
      }
    }
    if (uaData.platform === "macOS") {
      if (majorPlatformVersion >= 11) {
        return uaRaw.replace(/(Mac OS X \d+_\d+_\d+|Mac OS X)/, `Mac OS X ${uaGot.platformVersion.replace(/\./g, "_")}`);
      }
    }
    return uaRaw;
  });
}
function isValidURL(urlRaw) {
  let url;
  try {
    url = new URL(urlRaw);
  } catch (_) {
    return false;
  }
  return url.protocol === "http:" || url.protocol === "https:";
}
function getURLBasedOnApi(opts) {
  return getURLBasedOn(opts.base, opts.path);
}
function getURLBasedOn(baseURL, path) {
  return `${baseURL.replace(/\/$/, "")}/${path.replace(/^\//, "")}`;
}
function mergeDeep(target, source) {
  const isObject = (obj) => obj && typeof obj === "object";
  if (!isObject(target) || !isObject(source)) {
    return source;
  }
  Object.keys(source).forEach((key) => {
    const targetValue = target[key];
    const sourceValue = source[key];
    if (Array.isArray(targetValue) && Array.isArray(sourceValue)) {
      target[key] = targetValue.concat(sourceValue);
    } else if (isObject(targetValue) && isObject(sourceValue)) {
      target[key] = mergeDeep(__spreadValues({}, targetValue), sourceValue);
    } else {
      target[key] = sourceValue;
    }
  });
  return target;
}
var commonjsGlobal = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
function getDefaultExportFromCjs(x) {
  return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, "default") ? x["default"] : x;
}
(function(factory) {
  factory();
})(function() {
  function _classCallCheck(instance2, Constructor) {
    if (!(instance2 instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor)
        descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }
  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps)
      _defineProperties(Constructor.prototype, protoProps);
    if (staticProps)
      _defineProperties(Constructor, staticProps);
    Object.defineProperty(Constructor, "prototype", {
      writable: false
    });
    return Constructor;
  }
  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function");
    }
    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        writable: true,
        configurable: true
      }
    });
    Object.defineProperty(subClass, "prototype", {
      writable: false
    });
    if (superClass)
      _setPrototypeOf(subClass, superClass);
  }
  function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf2(o2) {
      return o2.__proto__ || Object.getPrototypeOf(o2);
    };
    return _getPrototypeOf(o);
  }
  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf2(o2, p2) {
      o2.__proto__ = p2;
      return o2;
    };
    return _setPrototypeOf(o, p);
  }
  function _isNativeReflectConstruct() {
    if (typeof Reflect === "undefined" || !Reflect.construct)
      return false;
    if (Reflect.construct.sham)
      return false;
    if (typeof Proxy === "function")
      return true;
    try {
      Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
      }));
      return true;
    } catch (e) {
      return false;
    }
  }
  function _assertThisInitialized(self2) {
    if (self2 === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }
    return self2;
  }
  function _possibleConstructorReturn(self2, call) {
    if (call && (typeof call === "object" || typeof call === "function")) {
      return call;
    } else if (call !== void 0) {
      throw new TypeError("Derived constructors may only return object or undefined");
    }
    return _assertThisInitialized(self2);
  }
  function _createSuper(Derived) {
    var hasNativeReflectConstruct = _isNativeReflectConstruct();
    return function _createSuperInternal() {
      var Super = _getPrototypeOf(Derived), result;
      if (hasNativeReflectConstruct) {
        var NewTarget = _getPrototypeOf(this).constructor;
        result = Reflect.construct(Super, arguments, NewTarget);
      } else {
        result = Super.apply(this, arguments);
      }
      return _possibleConstructorReturn(this, result);
    };
  }
  function _superPropBase(object, property) {
    while (!Object.prototype.hasOwnProperty.call(object, property)) {
      object = _getPrototypeOf(object);
      if (object === null)
        break;
    }
    return object;
  }
  function _get() {
    if (typeof Reflect !== "undefined" && Reflect.get) {
      _get = Reflect.get.bind();
    } else {
      _get = function _get2(target, property, receiver) {
        var base = _superPropBase(target, property);
        if (!base)
          return;
        var desc = Object.getOwnPropertyDescriptor(base, property);
        if (desc.get) {
          return desc.get.call(arguments.length < 3 ? target : receiver);
        }
        return desc.value;
      };
    }
    return _get.apply(this, arguments);
  }
  var Emitter = /* @__PURE__ */ function() {
    function Emitter2() {
      _classCallCheck(this, Emitter2);
      Object.defineProperty(this, "listeners", {
        value: {},
        writable: true,
        configurable: true
      });
    }
    _createClass(Emitter2, [{
      key: "addEventListener",
      value: function addEventListener(type, callback, options) {
        if (!(type in this.listeners)) {
          this.listeners[type] = [];
        }
        this.listeners[type].push({
          callback,
          options
        });
      }
    }, {
      key: "removeEventListener",
      value: function removeEventListener(type, callback) {
        if (!(type in this.listeners)) {
          return;
        }
        var stack = this.listeners[type];
        for (var i = 0, l = stack.length; i < l; i++) {
          if (stack[i].callback === callback) {
            stack.splice(i, 1);
            return;
          }
        }
      }
    }, {
      key: "dispatchEvent",
      value: function dispatchEvent(event) {
        if (!(event.type in this.listeners)) {
          return;
        }
        var stack = this.listeners[event.type];
        var stackToCall = stack.slice();
        for (var i = 0, l = stackToCall.length; i < l; i++) {
          var listener = stackToCall[i];
          try {
            listener.callback.call(this, event);
          } catch (e) {
            Promise.resolve().then(function() {
              throw e;
            });
          }
          if (listener.options && listener.options.once) {
            this.removeEventListener(event.type, listener.callback);
          }
        }
        return !event.defaultPrevented;
      }
    }]);
    return Emitter2;
  }();
  var AbortSignal = /* @__PURE__ */ function(_Emitter) {
    _inherits(AbortSignal2, _Emitter);
    var _super = _createSuper(AbortSignal2);
    function AbortSignal2() {
      var _this;
      _classCallCheck(this, AbortSignal2);
      _this = _super.call(this);
      if (!_this.listeners) {
        Emitter.call(_assertThisInitialized(_this));
      }
      Object.defineProperty(_assertThisInitialized(_this), "aborted", {
        value: false,
        writable: true,
        configurable: true
      });
      Object.defineProperty(_assertThisInitialized(_this), "onabort", {
        value: null,
        writable: true,
        configurable: true
      });
      Object.defineProperty(_assertThisInitialized(_this), "reason", {
        value: void 0,
        writable: true,
        configurable: true
      });
      return _this;
    }
    _createClass(AbortSignal2, [{
      key: "toString",
      value: function toString() {
        return "[object AbortSignal]";
      }
    }, {
      key: "dispatchEvent",
      value: function dispatchEvent(event) {
        if (event.type === "abort") {
          this.aborted = true;
          if (typeof this.onabort === "function") {
            this.onabort.call(this, event);
          }
        }
        _get(_getPrototypeOf(AbortSignal2.prototype), "dispatchEvent", this).call(this, event);
      }
    }]);
    return AbortSignal2;
  }(Emitter);
  var AbortController2 = /* @__PURE__ */ function() {
    function AbortController3() {
      _classCallCheck(this, AbortController3);
      Object.defineProperty(this, "signal", {
        value: new AbortSignal(),
        writable: true,
        configurable: true
      });
    }
    _createClass(AbortController3, [{
      key: "abort",
      value: function abort(reason) {
        var event;
        try {
          event = new Event("abort");
        } catch (e) {
          if (typeof document !== "undefined") {
            if (!document.createEvent) {
              event = document.createEventObject();
              event.type = "abort";
            } else {
              event = document.createEvent("Event");
              event.initEvent("abort", false, false);
            }
          } else {
            event = {
              type: "abort",
              bubbles: false,
              cancelable: false
            };
          }
        }
        var signalReason = reason;
        if (signalReason === void 0) {
          if (typeof document === "undefined") {
            signalReason = new Error("This operation was aborted");
            signalReason.name = "AbortError";
          } else {
            try {
              signalReason = new DOMException("signal is aborted without reason");
            } catch (err) {
              signalReason = new Error("This operation was aborted");
              signalReason.name = "AbortError";
            }
          }
        }
        this.signal.reason = signalReason;
        this.signal.dispatchEvent(event);
      }
    }, {
      key: "toString",
      value: function toString() {
        return "[object AbortController]";
      }
    }]);
    return AbortController3;
  }();
  if (typeof Symbol !== "undefined" && Symbol.toStringTag) {
    AbortController2.prototype[Symbol.toStringTag] = "AbortController";
    AbortSignal.prototype[Symbol.toStringTag] = "AbortSignal";
  }
  function polyfillNeeded(self2) {
    if (self2.__FORCE_INSTALL_ABORTCONTROLLER_POLYFILL) {
      console.log("__FORCE_INSTALL_ABORTCONTROLLER_POLYFILL=true is set, will force install polyfill");
      return true;
    }
    return typeof self2.Request === "function" && !self2.Request.prototype.hasOwnProperty("signal") || !self2.AbortController;
  }
  function abortableFetchDecorator(patchTargets) {
    if ("function" === typeof patchTargets) {
      patchTargets = {
        fetch: patchTargets
      };
    }
    var _patchTargets = patchTargets, fetch2 = _patchTargets.fetch, _patchTargets$Request = _patchTargets.Request, NativeRequest = _patchTargets$Request === void 0 ? fetch2.Request : _patchTargets$Request, NativeAbortController = _patchTargets.AbortController, _patchTargets$__FORCE = _patchTargets.__FORCE_INSTALL_ABORTCONTROLLER_POLYFILL, __FORCE_INSTALL_ABORTCONTROLLER_POLYFILL = _patchTargets$__FORCE === void 0 ? false : _patchTargets$__FORCE;
    if (!polyfillNeeded({
      fetch: fetch2,
      Request: NativeRequest,
      AbortController: NativeAbortController,
      __FORCE_INSTALL_ABORTCONTROLLER_POLYFILL
    })) {
      return {
        fetch: fetch2,
        Request
      };
    }
    var Request = NativeRequest;
    if (Request && !Request.prototype.hasOwnProperty("signal") || __FORCE_INSTALL_ABORTCONTROLLER_POLYFILL) {
      Request = function Request2(input, init2) {
        var signal;
        if (init2 && init2.signal) {
          signal = init2.signal;
          delete init2.signal;
        }
        var request = new NativeRequest(input, init2);
        if (signal) {
          Object.defineProperty(request, "signal", {
            writable: false,
            enumerable: false,
            configurable: true,
            value: signal
          });
        }
        return request;
      };
      Request.prototype = NativeRequest.prototype;
    }
    var realFetch = fetch2;
    var abortableFetch = function abortableFetch2(input, init2) {
      var signal = Request && Request.prototype.isPrototypeOf(input) ? input.signal : init2 ? init2.signal : void 0;
      if (signal) {
        var abortError;
        try {
          abortError = new DOMException("Aborted", "AbortError");
        } catch (err) {
          abortError = new Error("Aborted");
          abortError.name = "AbortError";
        }
        if (signal.aborted) {
          return Promise.reject(abortError);
        }
        var cancellation = new Promise(function(_, reject) {
          signal.addEventListener("abort", function() {
            return reject(abortError);
          }, {
            once: true
          });
        });
        if (init2 && init2.signal) {
          delete init2.signal;
        }
        return Promise.race([cancellation, realFetch(input, init2)]);
      }
      return realFetch(input, init2);
    };
    return {
      fetch: abortableFetch,
      Request
    };
  }
  (function(self2) {
    if (!polyfillNeeded(self2)) {
      return;
    }
    if (!self2.fetch) {
      console.warn("fetch() is not available, cannot install abortcontroller-polyfill");
      return;
    }
    var _abortableFetch = abortableFetchDecorator(self2), fetch2 = _abortableFetch.fetch, Request = _abortableFetch.Request;
    self2.fetch = fetch2;
    self2.Request = Request;
    Object.defineProperty(self2, "AbortController", {
      writable: true,
      enumerable: false,
      configurable: true,
      value: AbortController2
    });
    Object.defineProperty(self2, "AbortSignal", {
      writable: true,
      enumerable: false,
      configurable: true,
      value: AbortSignal
    });
  })(typeof self !== "undefined" ? self : commonjsGlobal);
});
const LOCAL_USER_KEY = "ArtalkUser";
class User {
  constructor() {
    __publicField(this, "data");
    __publicField(this, "onUserChanged", null);
    const localUser = JSON.parse(window.localStorage.getItem(LOCAL_USER_KEY) || "{}");
    this.data = {
      nick: localUser.nick || "",
      email: localUser.email || "",
      link: localUser.link || "",
      token: localUser.token || "",
      isAdmin: localUser.isAdmin || false
    };
  }
  /** 保存用户到 localStorage 中 */
  update(obj = {}) {
    Object.entries(obj).forEach(([key, value]) => {
      this.data[key] = value;
    });
    window.localStorage.setItem(LOCAL_USER_KEY, JSON.stringify(this.data));
    this.onUserChanged && this.onUserChanged(this.data);
  }
  setOnUserChanged(fn) {
    this.onUserChanged = fn;
  }
  /**
   * Logout
   *
   * @description Logout will clear login status, but not clear user data (nick, email, link)
   */
  logout() {
    this.update({
      token: "",
      isAdmin: false
    });
  }
  /** 是否已填写基本用户信息 */
  checkHasBasicUserInfo() {
    return !!this.data.nick && !!this.data.email;
  }
}
const UserInstance = new User();
const en = {
  /* Editor */
  placeholder: "Leave a comment",
  noComment: "No Comment",
  send: "Send",
  save: "Save",
  nick: "Nickname",
  email: "Email",
  link: "Website",
  emoticon: "Emoji",
  preview: "Preview",
  image: "Image",
  uploadFail: "Upload Failed",
  commentFail: "Failed to comment",
  restoredMsg: "Content has been restored",
  onlyAdminCanReply: "Only admin can reply",
  uploadLoginMsg: "Please fill in your name and email to upload",
  /* List */
  counter: "{count} Comments",
  sortLatest: "Latest",
  sortOldest: "Oldest",
  sortBest: "Best",
  sortAuthor: "Author",
  openComment: "Open Comment",
  closeComment: "Close Comment",
  listLoadFailMsg: "Failed to load comments",
  listRetry: "Click to retry",
  loadMore: "Load More",
  /* Comment */
  admin: "Admin",
  reply: "Reply",
  voteUp: "Up",
  voteDown: "Down",
  voteFail: "Vote Failed",
  readMore: "Read More",
  actionConfirm: "Confirm",
  collapse: "Collapse",
  collapsed: "Collapsed",
  collapsedMsg: "This comment has been collapsed",
  expand: "Expand",
  approved: "Approved",
  pending: "Pending",
  pendingMsg: "Pending, visible only to commenter.",
  edit: "Edit",
  editCancel: "Cancel Edit",
  delete: "Delete",
  deleteConfirm: "Confirm",
  pin: "Pin",
  unpin: "Unpin",
  /* Time */
  seconds: "seconds ago",
  minutes: "minutes ago",
  hours: "hours ago",
  days: "days ago",
  now: "just now",
  /* Checker */
  adminCheck: "Enter admin password:",
  captchaCheck: "Enter the CAPTCHA to continue:",
  confirm: "Confirm",
  cancel: "Cancel",
  /* Sidebar */
  msgCenter: "Messages",
  ctrlCenter: "Admin",
  /* General */
  frontend: "Frontend",
  backend: "Backend",
  loading: "Loading",
  loadFail: "Load Failed",
  editing: "Editing",
  editFail: "Edit Failed",
  deleting: "Deleting",
  deleteFail: "Delete Failed",
  reqGot: "Request got",
  reqAborted: "Request timed out or terminated unexpectedly",
  updateMsg: "Please update Artalk {name} to get the full experience",
  currentVersion: "Current Version",
  ignore: "Ignore"
};
const zhCN = {
  /* Editor */
  placeholder: "键入内容...",
  noComment: "「此时无声胜有声」",
  send: "发送评论",
  save: "保存评论",
  nick: "昵称",
  email: "邮箱",
  link: "网址",
  emoticon: "表情",
  preview: "预览",
  image: "图片",
  uploadFail: "上传失败",
  commentFail: "评论失败",
  restoredMsg: "内容已自动恢复",
  onlyAdminCanReply: "仅管理员可评论",
  uploadLoginMsg: "填入你的名字邮箱才能上传哦",
  /* List */
  counter: "{count} 条评论",
  sortLatest: "最新",
  sortOldest: "最早",
  sortBest: "最热",
  sortAuthor: "作者",
  openComment: "打开评论",
  closeComment: "关闭评论",
  listLoadFailMsg: "无法获取评论列表数据",
  listRetry: "点击重新获取",
  loadMore: "加载更多",
  /* Comment */
  admin: "管理员",
  reply: "回复",
  voteUp: "赞同",
  voteDown: "反对",
  voteFail: "投票失败",
  readMore: "阅读更多",
  actionConfirm: "确认操作",
  collapse: "折叠",
  collapsed: "已折叠",
  collapsedMsg: "该评论已被系统或管理员折叠",
  expand: "展开",
  approved: "已审",
  pending: "待审",
  pendingMsg: "审核中，仅本人可见。",
  edit: "编辑",
  editCancel: "取消编辑",
  delete: "删除",
  deleteConfirm: "确认删除",
  pin: "置顶",
  unpin: "取消置顶",
  /* Time */
  seconds: "秒前",
  minutes: "分钟前",
  hours: "小时前",
  days: "天前",
  now: "刚刚",
  /* Checker */
  adminCheck: "键入密码来验证管理员身份：",
  captchaCheck: "键入验证码继续：",
  confirm: "确认",
  cancel: "取消",
  /* Sidebar */
  msgCenter: "通知中心",
  ctrlCenter: "控制中心",
  /* General */
  frontend: "前端",
  backend: "后端",
  loading: "加载中",
  loadFail: "加载失败",
  editing: "修改中",
  editFail: "修改失败",
  deleting: "删除中",
  deleteFail: "删除失败",
  reqGot: "请求响应",
  reqAborted: "请求超时或意外终止",
  updateMsg: "请更新 Artalk {name} 以获得完整体验",
  currentVersion: "当前版本",
  ignore: "忽略"
};
const GLOBAL_LOCALES_KEY = "ArtalkI18n";
const internal = {
  "en": en,
  "en-US": en,
  "zh-CN": zhCN
};
function findLocaleSet(lang) {
  lang = lang.replace(
    /^([a-zA-Z]+)(-[a-zA-Z]+)?$/,
    (_, p1, p2) => p1.toLowerCase() + (p2 || "").toUpperCase()
  );
  if (internal[lang]) {
    return internal[lang];
  }
  if (window[GLOBAL_LOCALES_KEY] && window[GLOBAL_LOCALES_KEY][lang]) {
    return window[GLOBAL_LOCALES_KEY][lang];
  }
  return internal.en;
}
let LocaleConf = "en";
let LocaleDict = findLocaleSet(LocaleConf);
function setLocale(locale) {
  if (locale === LocaleConf)
    return;
  LocaleConf = locale;
  LocaleDict = typeof locale === "string" ? findLocaleSet(locale) : locale;
}
function t(key, args = {}) {
  let str = (LocaleDict == null ? void 0 : LocaleDict[key]) || key;
  str = str.replace(/\{\s*(\w+?)\s*\}/g, (_, token) => args[token] || "");
  return str;
}
function Fetch$1(opts, input, init2, timeout) {
  return __async(this, null, function* () {
    var _a, _b;
    if (UserInstance.data.token) {
      const headers = new Headers(init2.headers);
      headers.set("Authorization", `Bearer ${UserInstance.data.token}`);
      init2.headers = headers;
    }
    const resp = yield timeoutFetch(input, timeout || opts.timeout || 15e3, init2);
    const respHttpCode = resp.status;
    const noAccessCodes = [401, 400];
    const isNoAccess = noAccessCodes.includes(respHttpCode);
    if (!resp.ok && !isNoAccess)
      throw new Error(`${t("reqGot")} ${respHttpCode}`);
    let json = yield resp.json();
    const recall = (resolve, reject) => {
      Fetch$1(opts, input, init2).then((d) => {
        resolve(d);
      }).catch((e) => {
        reject(e);
      });
    };
    if ((_a = json.data) == null ? void 0 : _a.need_captcha) {
      json = yield new Promise((resolve, reject) => {
        opts.onNeedCheckCaptcha && opts.onNeedCheckCaptcha({
          data: { imgData: json.data.img_data, iframe: json.data.iframe },
          recall: () => {
            recall(resolve, reject);
          },
          reject: () => {
            reject(json);
          }
        });
      });
    } else if (((_b = json.data) == null ? void 0 : _b.need_login) || isNoAccess) {
      json = yield new Promise((resolve, reject) => {
        opts.onNeedCheckAdmin && opts.onNeedCheckAdmin({
          recall: () => {
            recall(resolve, reject);
          },
          reject: () => {
            reject(json);
          }
        });
      });
    }
    if (!json.success)
      throw json;
    return json;
  });
}
function POST(opts, url, data) {
  return __async(this, null, function* () {
    const init2 = {
      method: "POST"
    };
    data = __spreadValues({ site_name: opts.siteName || "" }, data || {});
    init2.body = ToFormData(data);
    const json = yield Fetch$1(opts, url, init2);
    return json.data || {};
  });
}
function ToFormData(object) {
  const formData = new FormData();
  Object.keys(object).forEach((key) => formData.append(key, String(object[key])));
  return formData;
}
function timeoutFetch(url, ms, opts) {
  var _a;
  const controller = new AbortController();
  (_a = opts.signal) == null ? void 0 : _a.addEventListener("abort", () => controller.abort());
  let promise = fetch(url, __spreadProps(__spreadValues({}, opts), { signal: controller.signal }));
  if (ms > 0) {
    const timer = setTimeout(() => controller.abort(), ms);
    promise.finally(() => {
      clearTimeout(timer);
    });
  }
  promise = promise.catch((err) => {
    throw (err || {}).name === "AbortError" ? new Error(t("reqAborted")) : err;
  });
  return promise;
}
class ApiBase {
  constructor(options) {
    this.options = options;
  }
  POST(path, data) {
    return __async(this, null, function* () {
      return POST(this.options, this.options.baseURL + path, data);
    });
  }
  Fetch(path, init2, timeout) {
    return __async(this, null, function* () {
      return Fetch$1(this.options, this.options.baseURL + path, init2, timeout);
    });
  }
}
class CommentApi extends ApiBase {
  /** 评论 · 获取 */
  get(offset, pageSize, flatMode, paramsEditor) {
    const params = {
      page_key: this.options.pageKey,
      site_name: this.options.siteName,
      limit: pageSize,
      offset
    };
    if (flatMode)
      params.flat_mode = flatMode;
    if (UserInstance.checkHasBasicUserInfo()) {
      params.name = UserInstance.data.nick;
      params.email = UserInstance.data.email;
    }
    if (paramsEditor)
      paramsEditor(params);
    return this.POST("/get", params);
  }
  /** 评论 · 创建 */
  add(comment) {
    return __async(this, null, function* () {
      const params = {
        name: comment.nick,
        email: comment.email,
        link: comment.link,
        content: comment.content,
        rid: comment.rid,
        page_key: comment.page_key,
        ua: yield getCorrectUserAgent()
        // 需要后端支持，获取修正后的 UA
      };
      if (comment.page_title)
        params.page_title = comment.page_title;
      if (comment.site_name)
        params.site_name = comment.site_name;
      const data = yield this.POST("/add", params);
      return data.comment;
    });
  }
  /** 评论 · 修改 */
  commentEdit(data) {
    return __async(this, null, function* () {
      const params = __spreadValues({}, data);
      const d = yield this.POST("/admin/comment-edit", params);
      return d.comment;
    });
  }
  /** 评论 · 删除 */
  commentDel(commentID, siteName) {
    const params = {
      id: String(commentID),
      site_name: siteName || ""
    };
    return this.POST("/admin/comment-del", params);
  }
  /** 投票 */
  vote(targetID, type) {
    return __async(this, null, function* () {
      const params = {
        target_id: targetID,
        type
      };
      if (UserInstance.checkHasBasicUserInfo()) {
        params.name = UserInstance.data.nick;
        params.email = UserInstance.data.email;
      }
      const data = yield this.POST("/vote", params);
      return data;
    });
  }
}
class PageApi extends ApiBase {
  /** 页面 · 获取 */
  pageGet(siteName, offset, limit) {
    return __async(this, null, function* () {
      const params = {
        site_name: siteName || "",
        offset: offset || 0,
        limit: limit || 15
      };
      const d = yield this.POST("/admin/page-get", params);
      return d;
    });
  }
  /** 页面 · 修改 */
  pageEdit(data) {
    return __async(this, null, function* () {
      const params = {
        id: data.id,
        key: data.key,
        title: data.title,
        admin_only: data.admin_only,
        site_name: data.site_name || this.options.siteName
      };
      const d = yield this.POST("/admin/page-edit", params);
      return d.page;
    });
  }
  /** 页面 · 删除 */
  pageDel(pageKey, siteName) {
    const params = {
      key: String(pageKey),
      site_name: siteName || ""
    };
    return this.POST("/admin/page-del", params);
  }
  /** 页面 · 数据更新 */
  pageFetch(id, siteName, getStatus) {
    return __async(this, null, function* () {
      const params = {};
      if (id)
        params.id = id;
      if (siteName)
        params.site_name = siteName;
      if (getStatus)
        params.get_status = getStatus;
      const d = yield this.POST("/admin/page-fetch", params);
      return d;
    });
  }
  /** PV */
  pv() {
    return __async(this, null, function* () {
      const params = {
        page_key: this.options.pageKey || "",
        page_title: this.options.pageTitle || ""
      };
      const p = yield this.POST("/pv", params);
      return p.pv;
    });
  }
  /** 统计 */
  stat(type, pageKeys, limit) {
    return __async(this, null, function* () {
      const params = {
        type
      };
      if (pageKeys)
        params.page_keys = Array.isArray(pageKeys) ? pageKeys.join(",") : pageKeys;
      if (limit)
        params.limit = limit;
      const data = yield this.POST(`/stat`, params);
      return data;
    });
  }
}
class SiteApi extends ApiBase {
  /** 站点 · 获取 */
  siteGet() {
    return __async(this, null, function* () {
      const params = {};
      const d = yield this.POST("/admin/site-get", params);
      return d.sites;
    });
  }
  /** 站点 · 创建 */
  siteAdd(name, urls) {
    return __async(this, null, function* () {
      const params = {
        name,
        urls,
        site_name: ""
        // 全局保留字段，当前站点名
      };
      const d = yield this.POST("/admin/site-add", params);
      return d.site;
    });
  }
  /** 站点 · 修改 */
  siteEdit(data) {
    return __async(this, null, function* () {
      const params = {
        id: data.id,
        name: data.name || "",
        urls: data.urls || ""
      };
      const d = yield this.POST("/admin/site-edit", params);
      return d.site;
    });
  }
  /** 站点 · 删除 */
  siteDel(id, delContent = false) {
    const params = { id, del_content: delContent };
    return this.POST("/admin/site-del", params);
  }
  /** 导出 */
  export() {
    return __async(this, null, function* () {
      var _a;
      const d = yield this.Fetch(`/admin/export`, { method: "POST" }, 0);
      return ((_a = d.data) == null ? void 0 : _a.data) || "";
    });
  }
}
class UserApi extends ApiBase {
  /** 用户 · 登录 */
  login(name, email, password) {
    return __async(this, null, function* () {
      const params = {
        name,
        email,
        password
      };
      const data = yield this.POST("/login", params);
      return data;
    });
  }
  /** 用户 · 获取  */
  userGet(name, email) {
    const ctrl = new AbortController();
    const params = {
      name,
      email
    };
    const req = this.Fetch(`/user-get`, {
      method: "POST",
      body: ToFormData(params),
      signal: ctrl.signal
    }).then((json) => ({
      user: json.data.user,
      is_login: json.data.is_login,
      unread: json.data.unread || [],
      unread_count: json.data.unread_count || 0
    }));
    return {
      req,
      abort: () => {
        ctrl.abort();
      }
    };
  }
  /** 用户 · 登录状态 */
  loginStatus() {
    return __async(this, null, function* () {
      const data = yield this.POST("/login-status", {
        name: UserInstance.data.nick,
        email: UserInstance.data.email
      });
      return data || { is_login: false, is_admin: false };
    });
  }
  /** 用户 · 注销 */
  logout() {
    return __async(this, null, function* () {
      return this.POST("/logout");
    });
  }
  /** 已读标记 */
  markRead(commentID, notifyKey, readAll = false) {
    const params = {
      comment_id: commentID,
      notify_key: notifyKey
    };
    if (readAll) {
      delete params.comment_id;
      delete params.notify_key;
      params.read_all = true;
      params.name = UserInstance.data.nick;
      params.email = UserInstance.data.email;
    }
    return this.POST(`/mark-read`, params);
  }
  /** 用户 · 列表 */
  userList(offset, limit, type) {
    return __async(this, null, function* () {
      const params = {
        offset: offset || 0,
        limit: limit || 15
      };
      if (type)
        params.type = type;
      const d = yield this.POST("/admin/user-get", params);
      return d;
    });
  }
  /** 用户 · 新增 */
  userAdd(user, password) {
    return __async(this, null, function* () {
      const params = {
        name: user.name || "",
        email: user.email || "",
        password: password || "",
        link: user.link || "",
        is_admin: user.is_admin || false,
        site_names: user.site_names_raw || "",
        receive_email: user.receive_email || true,
        badge_name: user.badge_name || "",
        badge_color: user.badge_color || ""
      };
      const d = yield this.POST("/admin/user-add", params);
      return d.user;
    });
  }
  /** 用户 · 修改 */
  userEdit(user, password) {
    return __async(this, null, function* () {
      const params = {
        id: user.id,
        name: user.name || "",
        email: user.email || "",
        password: password || "",
        link: user.link || "",
        is_admin: user.is_admin || false,
        site_names: user.site_names_raw || "",
        receive_email: user.receive_email || true,
        badge_name: user.badge_name || "",
        badge_color: user.badge_color || ""
      };
      const d = yield this.POST("/admin/user-edit", params);
      return d.user;
    });
  }
  /** 用户 · 删除 */
  userDel(userID) {
    return this.POST("/admin/user-del", {
      id: String(userID)
    });
  }
}
class SystemApi extends ApiBase {
  /** 获取配置 */
  conf() {
    return __async(this, null, function* () {
      const data = yield this.POST(`/conf`);
      return {
        frontend_conf: data.frontend_conf,
        version: data.version
      };
    });
  }
  /** 获取配置数据 */
  getSettings() {
    return __async(this, null, function* () {
      const data = yield this.POST("/admin/setting-get");
      return data;
    });
  }
  /** 保存配置数据 */
  saveSettings(yamlStr) {
    return __async(this, null, function* () {
      const data = yield this.POST("/admin/setting-save", {
        data: yamlStr
      });
      return data;
    });
  }
  /** 获取 API 版本信息 */
  version() {
    return __async(this, null, function* () {
      const resp = yield fetch(`${this.options.baseURL}/version`, { method: "POST" });
      const data = yield resp.json();
      return data;
    });
  }
}
class CaptchaApi extends ApiBase {
  /** 验证码 · 获取 */
  captchaGet() {
    return __async(this, null, function* () {
      const data = yield this.POST("/captcha/refresh");
      return data.img_data || "";
    });
  }
  /** 验证码 · 检验 */
  captchaCheck(value) {
    return __async(this, null, function* () {
      const data = yield this.POST("/captcha/check", { value });
      return data.img_data || "";
    });
  }
  /** 验证码 · 状态 */
  captchaStatus() {
    return __async(this, null, function* () {
      const data = yield this.POST("/captcha/status");
      return data || { is_pass: false };
    });
  }
}
class AdminApi extends ApiBase {
  /** 缓存清除 */
  cacheFlushAll() {
    const params = { flush_all: true };
    return this.POST("/admin/cache-flush", params);
  }
  /** 缓存预热 */
  cacheWarmUp() {
    const params = {};
    return this.POST("/admin/cache-warm", params);
  }
}
class UploadApi extends ApiBase {
  /** 图片上传 */
  imgUpload(file) {
    return __async(this, null, function* () {
      const params = {
        name: UserInstance.data.nick,
        email: UserInstance.data.email,
        page_key: this.options.pageKey
      };
      const form = ToFormData(params);
      form.set("file", file);
      const init2 = {
        method: "POST",
        body: form
      };
      const json = yield this.Fetch("/img-upload", init2);
      return json.data || {};
    });
  }
}
const ApiComponents = {
  comment: CommentApi,
  page: PageApi,
  site: SiteApi,
  user: UserApi,
  system: SystemApi,
  captcha: CaptchaApi,
  admin: AdminApi,
  upload: UploadApi
};
class Api {
  constructor(opts) {
    Object.entries(ApiComponents).forEach(([key, ApiComponent]) => {
      this[key] = new ApiComponent(opts);
    });
  }
}
function _getDefaults() {
  return {
    async: false,
    baseUrl: null,
    breaks: false,
    extensions: null,
    gfm: true,
    headerIds: false,
    headerPrefix: "",
    highlight: null,
    hooks: null,
    langPrefix: "language-",
    mangle: false,
    pedantic: false,
    renderer: null,
    sanitize: false,
    sanitizer: null,
    silent: false,
    smartypants: false,
    tokenizer: null,
    walkTokens: null,
    xhtml: false
  };
}
let _defaults = _getDefaults();
function changeDefaults(newDefaults) {
  _defaults = newDefaults;
}
const escapeTest = /[&<>"']/;
const escapeReplace = new RegExp(escapeTest.source, "g");
const escapeTestNoEncode = /[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/;
const escapeReplaceNoEncode = new RegExp(escapeTestNoEncode.source, "g");
const escapeReplacements = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;"
};
const getEscapeReplacement = (ch) => escapeReplacements[ch];
function escape(html, encode) {
  if (encode) {
    if (escapeTest.test(html)) {
      return html.replace(escapeReplace, getEscapeReplacement);
    }
  } else {
    if (escapeTestNoEncode.test(html)) {
      return html.replace(escapeReplaceNoEncode, getEscapeReplacement);
    }
  }
  return html;
}
const unescapeTest = /&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig;
function unescape(html) {
  return html.replace(unescapeTest, (_, n) => {
    n = n.toLowerCase();
    if (n === "colon")
      return ":";
    if (n.charAt(0) === "#") {
      return n.charAt(1) === "x" ? String.fromCharCode(parseInt(n.substring(2), 16)) : String.fromCharCode(+n.substring(1));
    }
    return "";
  });
}
const caret = /(^|[^\[])\^/g;
function edit(regex, opt) {
  regex = typeof regex === "string" ? regex : regex.source;
  opt = opt || "";
  const obj = {
    replace: (name, val) => {
      val = typeof val === "object" && "source" in val ? val.source : val;
      val = val.replace(caret, "$1");
      regex = regex.replace(name, val);
      return obj;
    },
    getRegex: () => {
      return new RegExp(regex, opt);
    }
  };
  return obj;
}
const nonWordAndColonTest = /[^\w:]/g;
const originIndependentUrl = /^$|^[a-z][a-z0-9+.-]*:|^[?#]/i;
function cleanUrl(sanitize2, base, href) {
  if (sanitize2) {
    let prot;
    try {
      prot = decodeURIComponent(unescape(href)).replace(nonWordAndColonTest, "").toLowerCase();
    } catch (e) {
      return null;
    }
    if (prot.indexOf("javascript:") === 0 || prot.indexOf("vbscript:") === 0 || prot.indexOf("data:") === 0) {
      return null;
    }
  }
  if (base && !originIndependentUrl.test(href)) {
    href = resolveUrl(base, href);
  }
  try {
    href = encodeURI(href).replace(/%25/g, "%");
  } catch (e) {
    return null;
  }
  return href;
}
const baseUrls = {};
const justDomain = /^[^:]+:\/*[^/]*$/;
const protocol = /^([^:]+:)[\s\S]*$/;
const domain = /^([^:]+:\/*[^/]*)[\s\S]*$/;
function resolveUrl(base, href) {
  if (!baseUrls[" " + base]) {
    if (justDomain.test(base)) {
      baseUrls[" " + base] = base + "/";
    } else {
      baseUrls[" " + base] = rtrim(base, "/", true);
    }
  }
  base = baseUrls[" " + base];
  const relativeBase = base.indexOf(":") === -1;
  if (href.substring(0, 2) === "//") {
    if (relativeBase) {
      return href;
    }
    return base.replace(protocol, "$1") + href;
  } else if (href.charAt(0) === "/") {
    if (relativeBase) {
      return href;
    }
    return base.replace(domain, "$1") + href;
  } else {
    return base + href;
  }
}
const noopTest = { exec: () => null };
function splitCells(tableRow, count) {
  const row = tableRow.replace(/\|/g, (match, offset, str) => {
    let escaped = false;
    let curr = offset;
    while (--curr >= 0 && str[curr] === "\\")
      escaped = !escaped;
    if (escaped) {
      return "|";
    } else {
      return " |";
    }
  }), cells = row.split(/ \|/);
  let i = 0;
  if (!cells[0].trim()) {
    cells.shift();
  }
  if (cells.length > 0 && !cells[cells.length - 1].trim()) {
    cells.pop();
  }
  if (count) {
    if (cells.length > count) {
      cells.splice(count);
    } else {
      while (cells.length < count)
        cells.push("");
    }
  }
  for (; i < cells.length; i++) {
    cells[i] = cells[i].trim().replace(/\\\|/g, "|");
  }
  return cells;
}
function rtrim(str, c, invert) {
  const l = str.length;
  if (l === 0) {
    return "";
  }
  let suffLen = 0;
  while (suffLen < l) {
    const currChar = str.charAt(l - suffLen - 1);
    if (currChar === c && !invert) {
      suffLen++;
    } else if (currChar !== c && invert) {
      suffLen++;
    } else {
      break;
    }
  }
  return str.slice(0, l - suffLen);
}
function findClosingBracket(str, b) {
  if (str.indexOf(b[1]) === -1) {
    return -1;
  }
  let level = 0;
  for (let i = 0; i < str.length; i++) {
    if (str[i] === "\\") {
      i++;
    } else if (str[i] === b[0]) {
      level++;
    } else if (str[i] === b[1]) {
      level--;
      if (level < 0) {
        return i;
      }
    }
  }
  return -1;
}
function checkDeprecations(opt, callback) {
  if (!opt || opt.silent) {
    return;
  }
  if (callback) {
    console.warn("marked(): callback is deprecated since version 5.0.0, should not be used and will be removed in the future. Read more here: https://marked.js.org/using_pro#async");
  }
  if (opt.sanitize || opt.sanitizer) {
    console.warn("marked(): sanitize and sanitizer parameters are deprecated since version 0.7.0, should not be used and will be removed in the future. Read more here: https://marked.js.org/#/USING_ADVANCED.md#options");
  }
  if (opt.highlight || opt.langPrefix !== "language-") {
    console.warn("marked(): highlight and langPrefix parameters are deprecated since version 5.0.0, should not be used and will be removed in the future. Instead use https://www.npmjs.com/package/marked-highlight.");
  }
  if (opt.mangle) {
    console.warn("marked(): mangle parameter is enabled by default, but is deprecated since version 5.0.0, and will be removed in the future. To clear this warning, install https://www.npmjs.com/package/marked-mangle, or disable by setting `{mangle: false}`.");
  }
  if (opt.baseUrl) {
    console.warn("marked(): baseUrl parameter is deprecated since version 5.0.0, should not be used and will be removed in the future. Instead use https://www.npmjs.com/package/marked-base-url.");
  }
  if (opt.smartypants) {
    console.warn("marked(): smartypants parameter is deprecated since version 5.0.0, should not be used and will be removed in the future. Instead use https://www.npmjs.com/package/marked-smartypants.");
  }
  if (opt.xhtml) {
    console.warn("marked(): xhtml parameter is deprecated since version 5.0.0, should not be used and will be removed in the future. Instead use https://www.npmjs.com/package/marked-xhtml.");
  }
  if (opt.headerIds || opt.headerPrefix) {
    console.warn("marked(): headerIds and headerPrefix parameters enabled by default, but are deprecated since version 5.0.0, and will be removed in the future. To clear this warning, install  https://www.npmjs.com/package/marked-gfm-heading-id, or disable by setting `{headerIds: false}`.");
  }
}
function outputLink(cap, link, raw, lexer) {
  const href = link.href;
  const title = link.title ? escape(link.title) : null;
  const text = cap[1].replace(/\\([\[\]])/g, "$1");
  if (cap[0].charAt(0) !== "!") {
    lexer.state.inLink = true;
    const token = {
      type: "link",
      raw,
      href,
      title,
      text,
      tokens: lexer.inlineTokens(text)
    };
    lexer.state.inLink = false;
    return token;
  }
  return {
    type: "image",
    raw,
    href,
    title,
    text: escape(text)
  };
}
function indentCodeCompensation(raw, text) {
  const matchIndentToCode = raw.match(/^(\s+)(?:```)/);
  if (matchIndentToCode === null) {
    return text;
  }
  const indentToCode = matchIndentToCode[1];
  return text.split("\n").map((node) => {
    const matchIndentInNode = node.match(/^\s+/);
    if (matchIndentInNode === null) {
      return node;
    }
    const [indentInNode] = matchIndentInNode;
    if (indentInNode.length >= indentToCode.length) {
      return node.slice(indentToCode.length);
    }
    return node;
  }).join("\n");
}
class _Tokenizer {
  constructor(options) {
    __publicField(this, "options");
    // TODO: Fix this rules type
    __publicField(this, "rules");
    __publicField(this, "lexer");
    this.options = options || _defaults;
  }
  space(src) {
    const cap = this.rules.block.newline.exec(src);
    if (cap && cap[0].length > 0) {
      return {
        type: "space",
        raw: cap[0]
      };
    }
  }
  code(src) {
    const cap = this.rules.block.code.exec(src);
    if (cap) {
      const text = cap[0].replace(/^ {1,4}/gm, "");
      return {
        type: "code",
        raw: cap[0],
        codeBlockStyle: "indented",
        text: !this.options.pedantic ? rtrim(text, "\n") : text
      };
    }
  }
  fences(src) {
    const cap = this.rules.block.fences.exec(src);
    if (cap) {
      const raw = cap[0];
      const text = indentCodeCompensation(raw, cap[3] || "");
      return {
        type: "code",
        raw,
        lang: cap[2] ? cap[2].trim().replace(this.rules.inline._escapes, "$1") : cap[2],
        text
      };
    }
  }
  heading(src) {
    const cap = this.rules.block.heading.exec(src);
    if (cap) {
      let text = cap[2].trim();
      if (/#$/.test(text)) {
        const trimmed = rtrim(text, "#");
        if (this.options.pedantic) {
          text = trimmed.trim();
        } else if (!trimmed || / $/.test(trimmed)) {
          text = trimmed.trim();
        }
      }
      return {
        type: "heading",
        raw: cap[0],
        depth: cap[1].length,
        text,
        tokens: this.lexer.inline(text)
      };
    }
  }
  hr(src) {
    const cap = this.rules.block.hr.exec(src);
    if (cap) {
      return {
        type: "hr",
        raw: cap[0]
      };
    }
  }
  blockquote(src) {
    const cap = this.rules.block.blockquote.exec(src);
    if (cap) {
      const text = cap[0].replace(/^ *>[ \t]?/gm, "");
      const top = this.lexer.state.top;
      this.lexer.state.top = true;
      const tokens = this.lexer.blockTokens(text);
      this.lexer.state.top = top;
      return {
        type: "blockquote",
        raw: cap[0],
        tokens,
        text
      };
    }
  }
  list(src) {
    let cap = this.rules.block.list.exec(src);
    if (cap) {
      let bull = cap[1].trim();
      const isordered = bull.length > 1;
      const list = {
        type: "list",
        raw: "",
        ordered: isordered,
        start: isordered ? +bull.slice(0, -1) : "",
        loose: false,
        items: []
      };
      bull = isordered ? `\\d{1,9}\\${bull.slice(-1)}` : `\\${bull}`;
      if (this.options.pedantic) {
        bull = isordered ? bull : "[*+-]";
      }
      const itemRegex = new RegExp(`^( {0,3}${bull})((?:[	 ][^\\n]*)?(?:\\n|$))`);
      let raw = "";
      let itemContents = "";
      let endsWithBlankLine = false;
      while (src) {
        let endEarly = false;
        if (!(cap = itemRegex.exec(src))) {
          break;
        }
        if (this.rules.block.hr.test(src)) {
          break;
        }
        raw = cap[0];
        src = src.substring(raw.length);
        let line = cap[2].split("\n", 1)[0].replace(/^\t+/, (t2) => " ".repeat(3 * t2.length));
        let nextLine = src.split("\n", 1)[0];
        let indent = 0;
        if (this.options.pedantic) {
          indent = 2;
          itemContents = line.trimLeft();
        } else {
          indent = cap[2].search(/[^ ]/);
          indent = indent > 4 ? 1 : indent;
          itemContents = line.slice(indent);
          indent += cap[1].length;
        }
        let blankLine = false;
        if (!line && /^ *$/.test(nextLine)) {
          raw += nextLine + "\n";
          src = src.substring(nextLine.length + 1);
          endEarly = true;
        }
        if (!endEarly) {
          const nextBulletRegex = new RegExp(`^ {0,${Math.min(3, indent - 1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`);
          const hrRegex = new RegExp(`^ {0,${Math.min(3, indent - 1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`);
          const fencesBeginRegex = new RegExp(`^ {0,${Math.min(3, indent - 1)}}(?:\`\`\`|~~~)`);
          const headingBeginRegex = new RegExp(`^ {0,${Math.min(3, indent - 1)}}#`);
          while (src) {
            const rawLine = src.split("\n", 1)[0];
            nextLine = rawLine;
            if (this.options.pedantic) {
              nextLine = nextLine.replace(/^ {1,4}(?=( {4})*[^ ])/g, "  ");
            }
            if (fencesBeginRegex.test(nextLine)) {
              break;
            }
            if (headingBeginRegex.test(nextLine)) {
              break;
            }
            if (nextBulletRegex.test(nextLine)) {
              break;
            }
            if (hrRegex.test(src)) {
              break;
            }
            if (nextLine.search(/[^ ]/) >= indent || !nextLine.trim()) {
              itemContents += "\n" + nextLine.slice(indent);
            } else {
              if (blankLine) {
                break;
              }
              if (line.search(/[^ ]/) >= 4) {
                break;
              }
              if (fencesBeginRegex.test(line)) {
                break;
              }
              if (headingBeginRegex.test(line)) {
                break;
              }
              if (hrRegex.test(line)) {
                break;
              }
              itemContents += "\n" + nextLine;
            }
            if (!blankLine && !nextLine.trim()) {
              blankLine = true;
            }
            raw += rawLine + "\n";
            src = src.substring(rawLine.length + 1);
            line = nextLine.slice(indent);
          }
        }
        if (!list.loose) {
          if (endsWithBlankLine) {
            list.loose = true;
          } else if (/\n *\n *$/.test(raw)) {
            endsWithBlankLine = true;
          }
        }
        let istask = null;
        let ischecked;
        if (this.options.gfm) {
          istask = /^\[[ xX]\] /.exec(itemContents);
          if (istask) {
            ischecked = istask[0] !== "[ ] ";
            itemContents = itemContents.replace(/^\[[ xX]\] +/, "");
          }
        }
        list.items.push({
          type: "list_item",
          raw,
          task: !!istask,
          checked: ischecked,
          loose: false,
          text: itemContents,
          tokens: []
        });
        list.raw += raw;
      }
      list.items[list.items.length - 1].raw = raw.trimRight();
      list.items[list.items.length - 1].text = itemContents.trimRight();
      list.raw = list.raw.trimRight();
      for (let i = 0; i < list.items.length; i++) {
        this.lexer.state.top = false;
        list.items[i].tokens = this.lexer.blockTokens(list.items[i].text, []);
        if (!list.loose) {
          const spacers = list.items[i].tokens.filter((t2) => t2.type === "space");
          const hasMultipleLineBreaks = spacers.length > 0 && spacers.some((t2) => /\n.*\n/.test(t2.raw));
          list.loose = hasMultipleLineBreaks;
        }
      }
      if (list.loose) {
        for (let i = 0; i < list.items.length; i++) {
          list.items[i].loose = true;
        }
      }
      return list;
    }
  }
  html(src) {
    const cap = this.rules.block.html.exec(src);
    if (cap) {
      const token = {
        type: "html",
        block: true,
        raw: cap[0],
        pre: !this.options.sanitizer && (cap[1] === "pre" || cap[1] === "script" || cap[1] === "style"),
        text: cap[0]
      };
      if (this.options.sanitize) {
        const text = this.options.sanitizer ? this.options.sanitizer(cap[0]) : escape(cap[0]);
        const paragraph = token;
        paragraph.type = "paragraph";
        paragraph.text = text;
        paragraph.tokens = this.lexer.inline(text);
      }
      return token;
    }
  }
  def(src) {
    const cap = this.rules.block.def.exec(src);
    if (cap) {
      const tag = cap[1].toLowerCase().replace(/\s+/g, " ");
      const href = cap[2] ? cap[2].replace(/^<(.*)>$/, "$1").replace(this.rules.inline._escapes, "$1") : "";
      const title = cap[3] ? cap[3].substring(1, cap[3].length - 1).replace(this.rules.inline._escapes, "$1") : cap[3];
      return {
        type: "def",
        tag,
        raw: cap[0],
        href,
        title
      };
    }
  }
  table(src) {
    const cap = this.rules.block.table.exec(src);
    if (cap) {
      const item = {
        type: "table",
        raw: cap[0],
        header: splitCells(cap[1]).map((c) => {
          return { text: c, tokens: [] };
        }),
        align: cap[2].replace(/^ *|\| *$/g, "").split(/ *\| */),
        rows: cap[3] && cap[3].trim() ? cap[3].replace(/\n[ \t]*$/, "").split("\n") : []
      };
      if (item.header.length === item.align.length) {
        let l = item.align.length;
        let i, j, k, row;
        for (i = 0; i < l; i++) {
          const align = item.align[i];
          if (align) {
            if (/^ *-+: *$/.test(align)) {
              item.align[i] = "right";
            } else if (/^ *:-+: *$/.test(align)) {
              item.align[i] = "center";
            } else if (/^ *:-+ *$/.test(align)) {
              item.align[i] = "left";
            } else {
              item.align[i] = null;
            }
          }
        }
        l = item.rows.length;
        for (i = 0; i < l; i++) {
          item.rows[i] = splitCells(item.rows[i], item.header.length).map((c) => {
            return { text: c, tokens: [] };
          });
        }
        l = item.header.length;
        for (j = 0; j < l; j++) {
          item.header[j].tokens = this.lexer.inline(item.header[j].text);
        }
        l = item.rows.length;
        for (j = 0; j < l; j++) {
          row = item.rows[j];
          for (k = 0; k < row.length; k++) {
            row[k].tokens = this.lexer.inline(row[k].text);
          }
        }
        return item;
      }
    }
  }
  lheading(src) {
    const cap = this.rules.block.lheading.exec(src);
    if (cap) {
      return {
        type: "heading",
        raw: cap[0],
        depth: cap[2].charAt(0) === "=" ? 1 : 2,
        text: cap[1],
        tokens: this.lexer.inline(cap[1])
      };
    }
  }
  paragraph(src) {
    const cap = this.rules.block.paragraph.exec(src);
    if (cap) {
      const text = cap[1].charAt(cap[1].length - 1) === "\n" ? cap[1].slice(0, -1) : cap[1];
      return {
        type: "paragraph",
        raw: cap[0],
        text,
        tokens: this.lexer.inline(text)
      };
    }
  }
  text(src) {
    const cap = this.rules.block.text.exec(src);
    if (cap) {
      return {
        type: "text",
        raw: cap[0],
        text: cap[0],
        tokens: this.lexer.inline(cap[0])
      };
    }
  }
  escape(src) {
    const cap = this.rules.inline.escape.exec(src);
    if (cap) {
      return {
        type: "escape",
        raw: cap[0],
        text: escape(cap[1])
      };
    }
  }
  tag(src) {
    const cap = this.rules.inline.tag.exec(src);
    if (cap) {
      if (!this.lexer.state.inLink && /^<a /i.test(cap[0])) {
        this.lexer.state.inLink = true;
      } else if (this.lexer.state.inLink && /^<\/a>/i.test(cap[0])) {
        this.lexer.state.inLink = false;
      }
      if (!this.lexer.state.inRawBlock && /^<(pre|code|kbd|script)(\s|>)/i.test(cap[0])) {
        this.lexer.state.inRawBlock = true;
      } else if (this.lexer.state.inRawBlock && /^<\/(pre|code|kbd|script)(\s|>)/i.test(cap[0])) {
        this.lexer.state.inRawBlock = false;
      }
      return {
        type: this.options.sanitize ? "text" : "html",
        raw: cap[0],
        inLink: this.lexer.state.inLink,
        inRawBlock: this.lexer.state.inRawBlock,
        block: false,
        text: this.options.sanitize ? this.options.sanitizer ? this.options.sanitizer(cap[0]) : escape(cap[0]) : cap[0]
      };
    }
  }
  link(src) {
    const cap = this.rules.inline.link.exec(src);
    if (cap) {
      const trimmedUrl = cap[2].trim();
      if (!this.options.pedantic && /^</.test(trimmedUrl)) {
        if (!/>$/.test(trimmedUrl)) {
          return;
        }
        const rtrimSlash = rtrim(trimmedUrl.slice(0, -1), "\\");
        if ((trimmedUrl.length - rtrimSlash.length) % 2 === 0) {
          return;
        }
      } else {
        const lastParenIndex = findClosingBracket(cap[2], "()");
        if (lastParenIndex > -1) {
          const start = cap[0].indexOf("!") === 0 ? 5 : 4;
          const linkLen = start + cap[1].length + lastParenIndex;
          cap[2] = cap[2].substring(0, lastParenIndex);
          cap[0] = cap[0].substring(0, linkLen).trim();
          cap[3] = "";
        }
      }
      let href = cap[2];
      let title = "";
      if (this.options.pedantic) {
        const link = /^([^'"]*[^\s])\s+(['"])(.*)\2/.exec(href);
        if (link) {
          href = link[1];
          title = link[3];
        }
      } else {
        title = cap[3] ? cap[3].slice(1, -1) : "";
      }
      href = href.trim();
      if (/^</.test(href)) {
        if (this.options.pedantic && !/>$/.test(trimmedUrl)) {
          href = href.slice(1);
        } else {
          href = href.slice(1, -1);
        }
      }
      return outputLink(cap, {
        href: href ? href.replace(this.rules.inline._escapes, "$1") : href,
        title: title ? title.replace(this.rules.inline._escapes, "$1") : title
      }, cap[0], this.lexer);
    }
  }
  reflink(src, links) {
    let cap;
    if ((cap = this.rules.inline.reflink.exec(src)) || (cap = this.rules.inline.nolink.exec(src))) {
      let link = (cap[2] || cap[1]).replace(/\s+/g, " ");
      link = links[link.toLowerCase()];
      if (!link) {
        const text = cap[0].charAt(0);
        return {
          type: "text",
          raw: text,
          text
        };
      }
      return outputLink(cap, link, cap[0], this.lexer);
    }
  }
  emStrong(src, maskedSrc, prevChar = "") {
    let match = this.rules.inline.emStrong.lDelim.exec(src);
    if (!match)
      return;
    if (match[3] && prevChar.match(/[\p{L}\p{N}]/u))
      return;
    const nextChar = match[1] || match[2] || "";
    if (!nextChar || !prevChar || this.rules.inline.punctuation.exec(prevChar)) {
      const lLength = [...match[0]].length - 1;
      let rDelim, rLength, delimTotal = lLength, midDelimTotal = 0;
      const endReg = match[0][0] === "*" ? this.rules.inline.emStrong.rDelimAst : this.rules.inline.emStrong.rDelimUnd;
      endReg.lastIndex = 0;
      maskedSrc = maskedSrc.slice(-1 * src.length + lLength);
      while ((match = endReg.exec(maskedSrc)) != null) {
        rDelim = match[1] || match[2] || match[3] || match[4] || match[5] || match[6];
        if (!rDelim)
          continue;
        rLength = [...rDelim].length;
        if (match[3] || match[4]) {
          delimTotal += rLength;
          continue;
        } else if (match[5] || match[6]) {
          if (lLength % 3 && !((lLength + rLength) % 3)) {
            midDelimTotal += rLength;
            continue;
          }
        }
        delimTotal -= rLength;
        if (delimTotal > 0)
          continue;
        rLength = Math.min(rLength, rLength + delimTotal + midDelimTotal);
        const raw = [...src].slice(0, lLength + match.index + rLength + 1).join("");
        if (Math.min(lLength, rLength) % 2) {
          const text2 = raw.slice(1, -1);
          return {
            type: "em",
            raw,
            text: text2,
            tokens: this.lexer.inlineTokens(text2)
          };
        }
        const text = raw.slice(2, -2);
        return {
          type: "strong",
          raw,
          text,
          tokens: this.lexer.inlineTokens(text)
        };
      }
    }
  }
  codespan(src) {
    const cap = this.rules.inline.code.exec(src);
    if (cap) {
      let text = cap[2].replace(/\n/g, " ");
      const hasNonSpaceChars = /[^ ]/.test(text);
      const hasSpaceCharsOnBothEnds = /^ /.test(text) && / $/.test(text);
      if (hasNonSpaceChars && hasSpaceCharsOnBothEnds) {
        text = text.substring(1, text.length - 1);
      }
      text = escape(text, true);
      return {
        type: "codespan",
        raw: cap[0],
        text
      };
    }
  }
  br(src) {
    const cap = this.rules.inline.br.exec(src);
    if (cap) {
      return {
        type: "br",
        raw: cap[0]
      };
    }
  }
  del(src) {
    const cap = this.rules.inline.del.exec(src);
    if (cap) {
      return {
        type: "del",
        raw: cap[0],
        text: cap[2],
        tokens: this.lexer.inlineTokens(cap[2])
      };
    }
  }
  autolink(src, mangle2) {
    const cap = this.rules.inline.autolink.exec(src);
    if (cap) {
      let text, href;
      if (cap[2] === "@") {
        text = escape(this.options.mangle ? mangle2(cap[1]) : cap[1]);
        href = "mailto:" + text;
      } else {
        text = escape(cap[1]);
        href = text;
      }
      return {
        type: "link",
        raw: cap[0],
        text,
        href,
        tokens: [
          {
            type: "text",
            raw: text,
            text
          }
        ]
      };
    }
  }
  url(src, mangle2) {
    let cap;
    if (cap = this.rules.inline.url.exec(src)) {
      let text, href;
      if (cap[2] === "@") {
        text = escape(this.options.mangle ? mangle2(cap[0]) : cap[0]);
        href = "mailto:" + text;
      } else {
        let prevCapZero;
        do {
          prevCapZero = cap[0];
          cap[0] = this.rules.inline._backpedal.exec(cap[0])[0];
        } while (prevCapZero !== cap[0]);
        text = escape(cap[0]);
        if (cap[1] === "www.") {
          href = "http://" + cap[0];
        } else {
          href = cap[0];
        }
      }
      return {
        type: "link",
        raw: cap[0],
        text,
        href,
        tokens: [
          {
            type: "text",
            raw: text,
            text
          }
        ]
      };
    }
  }
  inlineText(src, smartypants2) {
    const cap = this.rules.inline.text.exec(src);
    if (cap) {
      let text;
      if (this.lexer.state.inRawBlock) {
        text = this.options.sanitize ? this.options.sanitizer ? this.options.sanitizer(cap[0]) : escape(cap[0]) : cap[0];
      } else {
        text = escape(this.options.smartypants ? smartypants2(cap[0]) : cap[0]);
      }
      return {
        type: "text",
        raw: cap[0],
        text
      };
    }
  }
}
const block = {
  newline: /^(?: *(?:\n|$))+/,
  code: /^( {4}[^\n]+(?:\n(?: *(?:\n|$))*)?)+/,
  fences: /^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,
  hr: /^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,
  heading: /^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,
  blockquote: /^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/,
  list: /^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/,
  html: "^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n *)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n *)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n *)+\\n|$))",
  def: /^ {0,3}\[(label)\]: *(?:\n *)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n *)?| *\n *)(title))? *(?:\n+|$)/,
  table: noopTest,
  lheading: /^((?:(?!^bull ).|\n(?!\n|bull ))+?)\n {0,3}(=+|-+) *(?:\n+|$)/,
  // regex template, placeholders will be replaced according to different paragraph
  // interruption rules of commonmark and the original markdown spec:
  _paragraph: /^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,
  text: /^[^\n]+/
};
block._label = /(?!\s*\])(?:\\.|[^\[\]\\])+/;
block._title = /(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/;
block.def = edit(block.def).replace("label", block._label).replace("title", block._title).getRegex();
block.bullet = /(?:[*+-]|\d{1,9}[.)])/;
block.listItemStart = edit(/^( *)(bull) */).replace("bull", block.bullet).getRegex();
block.list = edit(block.list).replace(/bull/g, block.bullet).replace("hr", "\\n+(?=\\1?(?:(?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$))").replace("def", "\\n+(?=" + block.def.source + ")").getRegex();
block._tag = "address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|section|source|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul";
block._comment = /<!--(?!-?>)[\s\S]*?(?:-->|$)/;
block.html = edit(block.html, "i").replace("comment", block._comment).replace("tag", block._tag).replace("attribute", / +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex();
block.lheading = edit(block.lheading).replace(/bull/g, block.bullet).getRegex();
block.paragraph = edit(block._paragraph).replace("hr", block.hr).replace("heading", " {0,3}#{1,6} ").replace("|lheading", "").replace("|table", "").replace("blockquote", " {0,3}>").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", block._tag).getRegex();
block.blockquote = edit(block.blockquote).replace("paragraph", block.paragraph).getRegex();
block.normal = __spreadValues({}, block);
block.gfm = __spreadProps(__spreadValues({}, block.normal), {
  table: "^ *([^\\n ].*\\|.*)\\n {0,3}(?:\\| *)?(:?-+:? *(?:\\| *:?-+:? *)*)(?:\\| *)?(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)"
  // Cells
});
block.gfm.table = edit(block.gfm.table).replace("hr", block.hr).replace("heading", " {0,3}#{1,6} ").replace("blockquote", " {0,3}>").replace("code", " {4}[^\\n]").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", block._tag).getRegex();
block.gfm.paragraph = edit(block._paragraph).replace("hr", block.hr).replace("heading", " {0,3}#{1,6} ").replace("|lheading", "").replace("table", block.gfm.table).replace("blockquote", " {0,3}>").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", block._tag).getRegex();
block.pedantic = __spreadProps(__spreadValues({}, block.normal), {
  html: edit(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment", block._comment).replace(/tag/g, "(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),
  def: /^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,
  heading: /^(#{1,6})(.*)(?:\n+|$)/,
  fences: noopTest,
  lheading: /^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,
  paragraph: edit(block.normal._paragraph).replace("hr", block.hr).replace("heading", " *#{1,6} *[^\n]").replace("lheading", block.lheading).replace("blockquote", " {0,3}>").replace("|fences", "").replace("|list", "").replace("|html", "").getRegex()
});
const inline = {
  escape: /^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,
  autolink: /^<(scheme:[^\s\x00-\x1f<>]*|email)>/,
  url: noopTest,
  tag: "^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>",
  link: /^!?\[(label)\]\(\s*(href)(?:\s+(title))?\s*\)/,
  reflink: /^!?\[(label)\]\[(ref)\]/,
  nolink: /^!?\[(ref)\](?:\[\])?/,
  reflinkSearch: "reflink|nolink(?!\\()",
  emStrong: {
    lDelim: /^(?:\*+(?:((?!\*)[punct])|[^\s*]))|^_+(?:((?!_)[punct])|([^\s_]))/,
    //         (1) and (2) can only be a Right Delimiter. (3) and (4) can only be Left.  (5) and (6) can be either Left or Right.
    //         | Skip orphan inside strong      | Consume to delim | (1) #***              | (2) a***#, a***                    | (3) #***a, ***a                  | (4) ***#                 | (5) #***#                         | (6) a***a
    rDelimAst: /^[^_*]*?__[^_*]*?\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\*)[punct](\*+)(?=[\s]|$)|[^punct\s](\*+)(?!\*)(?=[punct\s]|$)|(?!\*)[punct\s](\*+)(?=[^punct\s])|[\s](\*+)(?!\*)(?=[punct])|(?!\*)[punct](\*+)(?!\*)(?=[punct])|[^punct\s](\*+)(?=[^punct\s])/,
    rDelimUnd: /^[^_*]*?\*\*[^_*]*?_[^_*]*?(?=\*\*)|[^_]+(?=[^_])|(?!_)[punct](_+)(?=[\s]|$)|[^punct\s](_+)(?!_)(?=[punct\s]|$)|(?!_)[punct\s](_+)(?=[^punct\s])|[\s](_+)(?!_)(?=[punct])|(?!_)[punct](_+)(?!_)(?=[punct])/
    // ^- Not allowed for _
  },
  code: /^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,
  br: /^( {2,}|\\)\n(?!\s*$)/,
  del: noopTest,
  text: /^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,
  punctuation: /^((?![*_])[\spunctuation])/
};
inline._punctuation = "\\p{P}$+<=>`^|~";
inline.punctuation = edit(inline.punctuation, "u").replace(/punctuation/g, inline._punctuation).getRegex();
inline.blockSkip = /\[[^[\]]*?\]\([^\(\)]*?\)|`[^`]*?`|<[^<>]*?>/g;
inline.anyPunctuation = /\\[punct]/g;
inline._escapes = /\\([punct])/g;
inline._comment = edit(block._comment).replace("(?:-->|$)", "-->").getRegex();
inline.emStrong.lDelim = edit(inline.emStrong.lDelim, "u").replace(/punct/g, inline._punctuation).getRegex();
inline.emStrong.rDelimAst = edit(inline.emStrong.rDelimAst, "gu").replace(/punct/g, inline._punctuation).getRegex();
inline.emStrong.rDelimUnd = edit(inline.emStrong.rDelimUnd, "gu").replace(/punct/g, inline._punctuation).getRegex();
inline.anyPunctuation = edit(inline.anyPunctuation, "gu").replace(/punct/g, inline._punctuation).getRegex();
inline._escapes = edit(inline._escapes, "gu").replace(/punct/g, inline._punctuation).getRegex();
inline._scheme = /[a-zA-Z][a-zA-Z0-9+.-]{1,31}/;
inline._email = /[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/;
inline.autolink = edit(inline.autolink).replace("scheme", inline._scheme).replace("email", inline._email).getRegex();
inline._attribute = /\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/;
inline.tag = edit(inline.tag).replace("comment", inline._comment).replace("attribute", inline._attribute).getRegex();
inline._label = /(?:\[(?:\\.|[^\[\]\\])*\]|\\.|`[^`]*`|[^\[\]\\`])*?/;
inline._href = /<(?:\\.|[^\n<>\\])+>|[^\s\x00-\x1f]*/;
inline._title = /"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/;
inline.link = edit(inline.link).replace("label", inline._label).replace("href", inline._href).replace("title", inline._title).getRegex();
inline.reflink = edit(inline.reflink).replace("label", inline._label).replace("ref", block._label).getRegex();
inline.nolink = edit(inline.nolink).replace("ref", block._label).getRegex();
inline.reflinkSearch = edit(inline.reflinkSearch, "g").replace("reflink", inline.reflink).replace("nolink", inline.nolink).getRegex();
inline.normal = __spreadValues({}, inline);
inline.pedantic = __spreadProps(__spreadValues({}, inline.normal), {
  strong: {
    start: /^__|\*\*/,
    middle: /^__(?=\S)([\s\S]*?\S)__(?!_)|^\*\*(?=\S)([\s\S]*?\S)\*\*(?!\*)/,
    endAst: /\*\*(?!\*)/g,
    endUnd: /__(?!_)/g
  },
  em: {
    start: /^_|\*/,
    middle: /^()\*(?=\S)([\s\S]*?\S)\*(?!\*)|^_(?=\S)([\s\S]*?\S)_(?!_)/,
    endAst: /\*(?!\*)/g,
    endUnd: /_(?!_)/g
  },
  link: edit(/^!?\[(label)\]\((.*?)\)/).replace("label", inline._label).getRegex(),
  reflink: edit(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label", inline._label).getRegex()
});
inline.gfm = __spreadProps(__spreadValues({}, inline.normal), {
  escape: edit(inline.escape).replace("])", "~|])").getRegex(),
  _extended_email: /[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/,
  url: /^((?:ftp|https?):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/,
  _backpedal: /(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,
  del: /^(~~?)(?=[^\s~])([\s\S]*?[^\s~])\1(?=[^~]|$)/,
  text: /^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|https?:\/\/|ftp:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/
});
inline.gfm.url = edit(inline.gfm.url, "i").replace("email", inline.gfm._extended_email).getRegex();
inline.breaks = __spreadProps(__spreadValues({}, inline.gfm), {
  br: edit(inline.br).replace("{2,}", "*").getRegex(),
  text: edit(inline.gfm.text).replace("\\b_", "\\b_| {2,}\\n").replace(/\{2,\}/g, "*").getRegex()
});
function smartypants(text) {
  return text.replace(/---/g, "—").replace(/--/g, "–").replace(/(^|[-\u2014/(\[{"\s])'/g, "$1‘").replace(/'/g, "’").replace(/(^|[-\u2014/(\[{\u2018\s])"/g, "$1“").replace(/"/g, "”").replace(/\.{3}/g, "…");
}
function mangle(text) {
  let out = "";
  for (let i = 0; i < text.length; i++) {
    const ch = Math.random() > 0.5 ? "x" + text.charCodeAt(i).toString(16) : text.charCodeAt(i).toString();
    out += "&#" + ch + ";";
  }
  return out;
}
class _Lexer {
  constructor(options) {
    __publicField(this, "tokens");
    __publicField(this, "options");
    __publicField(this, "state");
    __publicField(this, "tokenizer");
    __publicField(this, "inlineQueue");
    this.tokens = [];
    this.tokens.links = /* @__PURE__ */ Object.create(null);
    this.options = options || _defaults;
    this.options.tokenizer = this.options.tokenizer || new _Tokenizer();
    this.tokenizer = this.options.tokenizer;
    this.tokenizer.options = this.options;
    this.tokenizer.lexer = this;
    this.inlineQueue = [];
    this.state = {
      inLink: false,
      inRawBlock: false,
      top: true
    };
    const rules = {
      block: block.normal,
      inline: inline.normal
    };
    if (this.options.pedantic) {
      rules.block = block.pedantic;
      rules.inline = inline.pedantic;
    } else if (this.options.gfm) {
      rules.block = block.gfm;
      if (this.options.breaks) {
        rules.inline = inline.breaks;
      } else {
        rules.inline = inline.gfm;
      }
    }
    this.tokenizer.rules = rules;
  }
  /**
   * Expose Rules
   */
  static get rules() {
    return {
      block,
      inline
    };
  }
  /**
   * Static Lex Method
   */
  static lex(src, options) {
    const lexer = new _Lexer(options);
    return lexer.lex(src);
  }
  /**
   * Static Lex Inline Method
   */
  static lexInline(src, options) {
    const lexer = new _Lexer(options);
    return lexer.inlineTokens(src);
  }
  /**
   * Preprocessing
   */
  lex(src) {
    src = src.replace(/\r\n|\r/g, "\n");
    this.blockTokens(src, this.tokens);
    let next;
    while (next = this.inlineQueue.shift()) {
      this.inlineTokens(next.src, next.tokens);
    }
    return this.tokens;
  }
  blockTokens(src, tokens = []) {
    if (this.options.pedantic) {
      src = src.replace(/\t/g, "    ").replace(/^ +$/gm, "");
    } else {
      src = src.replace(/^( *)(\t+)/gm, (_, leading, tabs) => {
        return leading + "    ".repeat(tabs.length);
      });
    }
    let token;
    let lastToken;
    let cutSrc;
    let lastParagraphClipped;
    while (src) {
      if (this.options.extensions && this.options.extensions.block && this.options.extensions.block.some((extTokenizer) => {
        if (token = extTokenizer.call({ lexer: this }, src, tokens)) {
          src = src.substring(token.raw.length);
          tokens.push(token);
          return true;
        }
        return false;
      })) {
        continue;
      }
      if (token = this.tokenizer.space(src)) {
        src = src.substring(token.raw.length);
        if (token.raw.length === 1 && tokens.length > 0) {
          tokens[tokens.length - 1].raw += "\n";
        } else {
          tokens.push(token);
        }
        continue;
      }
      if (token = this.tokenizer.code(src)) {
        src = src.substring(token.raw.length);
        lastToken = tokens[tokens.length - 1];
        if (lastToken && (lastToken.type === "paragraph" || lastToken.type === "text")) {
          lastToken.raw += "\n" + token.raw;
          lastToken.text += "\n" + token.text;
          this.inlineQueue[this.inlineQueue.length - 1].src = lastToken.text;
        } else {
          tokens.push(token);
        }
        continue;
      }
      if (token = this.tokenizer.fences(src)) {
        src = src.substring(token.raw.length);
        tokens.push(token);
        continue;
      }
      if (token = this.tokenizer.heading(src)) {
        src = src.substring(token.raw.length);
        tokens.push(token);
        continue;
      }
      if (token = this.tokenizer.hr(src)) {
        src = src.substring(token.raw.length);
        tokens.push(token);
        continue;
      }
      if (token = this.tokenizer.blockquote(src)) {
        src = src.substring(token.raw.length);
        tokens.push(token);
        continue;
      }
      if (token = this.tokenizer.list(src)) {
        src = src.substring(token.raw.length);
        tokens.push(token);
        continue;
      }
      if (token = this.tokenizer.html(src)) {
        src = src.substring(token.raw.length);
        tokens.push(token);
        continue;
      }
      if (token = this.tokenizer.def(src)) {
        src = src.substring(token.raw.length);
        lastToken = tokens[tokens.length - 1];
        if (lastToken && (lastToken.type === "paragraph" || lastToken.type === "text")) {
          lastToken.raw += "\n" + token.raw;
          lastToken.text += "\n" + token.raw;
          this.inlineQueue[this.inlineQueue.length - 1].src = lastToken.text;
        } else if (!this.tokens.links[token.tag]) {
          this.tokens.links[token.tag] = {
            href: token.href,
            title: token.title
          };
        }
        continue;
      }
      if (token = this.tokenizer.table(src)) {
        src = src.substring(token.raw.length);
        tokens.push(token);
        continue;
      }
      if (token = this.tokenizer.lheading(src)) {
        src = src.substring(token.raw.length);
        tokens.push(token);
        continue;
      }
      cutSrc = src;
      if (this.options.extensions && this.options.extensions.startBlock) {
        let startIndex = Infinity;
        const tempSrc = src.slice(1);
        let tempStart;
        this.options.extensions.startBlock.forEach((getStartIndex) => {
          tempStart = getStartIndex.call({ lexer: this }, tempSrc);
          if (typeof tempStart === "number" && tempStart >= 0) {
            startIndex = Math.min(startIndex, tempStart);
          }
        });
        if (startIndex < Infinity && startIndex >= 0) {
          cutSrc = src.substring(0, startIndex + 1);
        }
      }
      if (this.state.top && (token = this.tokenizer.paragraph(cutSrc))) {
        lastToken = tokens[tokens.length - 1];
        if (lastParagraphClipped && lastToken.type === "paragraph") {
          lastToken.raw += "\n" + token.raw;
          lastToken.text += "\n" + token.text;
          this.inlineQueue.pop();
          this.inlineQueue[this.inlineQueue.length - 1].src = lastToken.text;
        } else {
          tokens.push(token);
        }
        lastParagraphClipped = cutSrc.length !== src.length;
        src = src.substring(token.raw.length);
        continue;
      }
      if (token = this.tokenizer.text(src)) {
        src = src.substring(token.raw.length);
        lastToken = tokens[tokens.length - 1];
        if (lastToken && lastToken.type === "text") {
          lastToken.raw += "\n" + token.raw;
          lastToken.text += "\n" + token.text;
          this.inlineQueue.pop();
          this.inlineQueue[this.inlineQueue.length - 1].src = lastToken.text;
        } else {
          tokens.push(token);
        }
        continue;
      }
      if (src) {
        const errMsg = "Infinite loop on byte: " + src.charCodeAt(0);
        if (this.options.silent) {
          console.error(errMsg);
          break;
        } else {
          throw new Error(errMsg);
        }
      }
    }
    this.state.top = true;
    return tokens;
  }
  inline(src, tokens = []) {
    this.inlineQueue.push({ src, tokens });
    return tokens;
  }
  /**
   * Lexing/Compiling
   */
  inlineTokens(src, tokens = []) {
    let token, lastToken, cutSrc;
    let maskedSrc = src;
    let match;
    let keepPrevChar, prevChar;
    if (this.tokens.links) {
      const links = Object.keys(this.tokens.links);
      if (links.length > 0) {
        while ((match = this.tokenizer.rules.inline.reflinkSearch.exec(maskedSrc)) != null) {
          if (links.includes(match[0].slice(match[0].lastIndexOf("[") + 1, -1))) {
            maskedSrc = maskedSrc.slice(0, match.index) + "[" + "a".repeat(match[0].length - 2) + "]" + maskedSrc.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex);
          }
        }
      }
    }
    while ((match = this.tokenizer.rules.inline.blockSkip.exec(maskedSrc)) != null) {
      maskedSrc = maskedSrc.slice(0, match.index) + "[" + "a".repeat(match[0].length - 2) + "]" + maskedSrc.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);
    }
    while ((match = this.tokenizer.rules.inline.anyPunctuation.exec(maskedSrc)) != null) {
      maskedSrc = maskedSrc.slice(0, match.index) + "++" + maskedSrc.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);
    }
    while (src) {
      if (!keepPrevChar) {
        prevChar = "";
      }
      keepPrevChar = false;
      if (this.options.extensions && this.options.extensions.inline && this.options.extensions.inline.some((extTokenizer) => {
        if (token = extTokenizer.call({ lexer: this }, src, tokens)) {
          src = src.substring(token.raw.length);
          tokens.push(token);
          return true;
        }
        return false;
      })) {
        continue;
      }
      if (token = this.tokenizer.escape(src)) {
        src = src.substring(token.raw.length);
        tokens.push(token);
        continue;
      }
      if (token = this.tokenizer.tag(src)) {
        src = src.substring(token.raw.length);
        lastToken = tokens[tokens.length - 1];
        if (lastToken && token.type === "text" && lastToken.type === "text") {
          lastToken.raw += token.raw;
          lastToken.text += token.text;
        } else {
          tokens.push(token);
        }
        continue;
      }
      if (token = this.tokenizer.link(src)) {
        src = src.substring(token.raw.length);
        tokens.push(token);
        continue;
      }
      if (token = this.tokenizer.reflink(src, this.tokens.links)) {
        src = src.substring(token.raw.length);
        lastToken = tokens[tokens.length - 1];
        if (lastToken && token.type === "text" && lastToken.type === "text") {
          lastToken.raw += token.raw;
          lastToken.text += token.text;
        } else {
          tokens.push(token);
        }
        continue;
      }
      if (token = this.tokenizer.emStrong(src, maskedSrc, prevChar)) {
        src = src.substring(token.raw.length);
        tokens.push(token);
        continue;
      }
      if (token = this.tokenizer.codespan(src)) {
        src = src.substring(token.raw.length);
        tokens.push(token);
        continue;
      }
      if (token = this.tokenizer.br(src)) {
        src = src.substring(token.raw.length);
        tokens.push(token);
        continue;
      }
      if (token = this.tokenizer.del(src)) {
        src = src.substring(token.raw.length);
        tokens.push(token);
        continue;
      }
      if (token = this.tokenizer.autolink(src, mangle)) {
        src = src.substring(token.raw.length);
        tokens.push(token);
        continue;
      }
      if (!this.state.inLink && (token = this.tokenizer.url(src, mangle))) {
        src = src.substring(token.raw.length);
        tokens.push(token);
        continue;
      }
      cutSrc = src;
      if (this.options.extensions && this.options.extensions.startInline) {
        let startIndex = Infinity;
        const tempSrc = src.slice(1);
        let tempStart;
        this.options.extensions.startInline.forEach((getStartIndex) => {
          tempStart = getStartIndex.call({ lexer: this }, tempSrc);
          if (typeof tempStart === "number" && tempStart >= 0) {
            startIndex = Math.min(startIndex, tempStart);
          }
        });
        if (startIndex < Infinity && startIndex >= 0) {
          cutSrc = src.substring(0, startIndex + 1);
        }
      }
      if (token = this.tokenizer.inlineText(cutSrc, smartypants)) {
        src = src.substring(token.raw.length);
        if (token.raw.slice(-1) !== "_") {
          prevChar = token.raw.slice(-1);
        }
        keepPrevChar = true;
        lastToken = tokens[tokens.length - 1];
        if (lastToken && lastToken.type === "text") {
          lastToken.raw += token.raw;
          lastToken.text += token.text;
        } else {
          tokens.push(token);
        }
        continue;
      }
      if (src) {
        const errMsg = "Infinite loop on byte: " + src.charCodeAt(0);
        if (this.options.silent) {
          console.error(errMsg);
          break;
        } else {
          throw new Error(errMsg);
        }
      }
    }
    return tokens;
  }
}
class _Renderer {
  constructor(options) {
    __publicField(this, "options");
    this.options = options || _defaults;
  }
  code(code, infostring, escaped) {
    var _a;
    const lang = (_a = (infostring || "").match(/^\S*/)) == null ? void 0 : _a[0];
    if (this.options.highlight) {
      const out = this.options.highlight(code, lang);
      if (out != null && out !== code) {
        escaped = true;
        code = out;
      }
    }
    code = code.replace(/\n$/, "") + "\n";
    if (!lang) {
      return "<pre><code>" + (escaped ? code : escape(code, true)) + "</code></pre>\n";
    }
    return '<pre><code class="' + this.options.langPrefix + escape(lang) + '">' + (escaped ? code : escape(code, true)) + "</code></pre>\n";
  }
  blockquote(quote) {
    return `<blockquote>
${quote}</blockquote>
`;
  }
  html(html, block2) {
    return html;
  }
  heading(text, level, raw, slugger) {
    if (this.options.headerIds) {
      const id = this.options.headerPrefix + slugger.slug(raw);
      return `<h${level} id="${id}">${text}</h${level}>
`;
    }
    return `<h${level}>${text}</h${level}>
`;
  }
  hr() {
    return this.options.xhtml ? "<hr/>\n" : "<hr>\n";
  }
  list(body, ordered, start) {
    const type = ordered ? "ol" : "ul";
    const startatt = ordered && start !== 1 ? ' start="' + start + '"' : "";
    return "<" + type + startatt + ">\n" + body + "</" + type + ">\n";
  }
  listitem(text, task, checked) {
    return `<li>${text}</li>
`;
  }
  checkbox(checked) {
    return "<input " + (checked ? 'checked="" ' : "") + 'disabled="" type="checkbox"' + (this.options.xhtml ? " /" : "") + "> ";
  }
  paragraph(text) {
    return `<p>${text}</p>
`;
  }
  table(header, body) {
    if (body)
      body = `<tbody>${body}</tbody>`;
    return "<table>\n<thead>\n" + header + "</thead>\n" + body + "</table>\n";
  }
  tablerow(content) {
    return `<tr>
${content}</tr>
`;
  }
  tablecell(content, flags) {
    const type = flags.header ? "th" : "td";
    const tag = flags.align ? `<${type} align="${flags.align}">` : `<${type}>`;
    return tag + content + `</${type}>
`;
  }
  /**
   * span level renderer
   */
  strong(text) {
    return `<strong>${text}</strong>`;
  }
  em(text) {
    return `<em>${text}</em>`;
  }
  codespan(text) {
    return `<code>${text}</code>`;
  }
  br() {
    return this.options.xhtml ? "<br/>" : "<br>";
  }
  del(text) {
    return `<del>${text}</del>`;
  }
  link(href, title, text) {
    const cleanHref = cleanUrl(this.options.sanitize, this.options.baseUrl, href);
    if (cleanHref === null) {
      return text;
    }
    href = cleanHref;
    let out = '<a href="' + href + '"';
    if (title) {
      out += ' title="' + title + '"';
    }
    out += ">" + text + "</a>";
    return out;
  }
  image(href, title, text) {
    const cleanHref = cleanUrl(this.options.sanitize, this.options.baseUrl, href);
    if (cleanHref === null) {
      return text;
    }
    href = cleanHref;
    let out = `<img src="${href}" alt="${text}"`;
    if (title) {
      out += ` title="${title}"`;
    }
    out += this.options.xhtml ? "/>" : ">";
    return out;
  }
  text(text) {
    return text;
  }
}
class _TextRenderer {
  // no need for block level renderers
  strong(text) {
    return text;
  }
  em(text) {
    return text;
  }
  codespan(text) {
    return text;
  }
  del(text) {
    return text;
  }
  html(text) {
    return text;
  }
  text(text) {
    return text;
  }
  link(href, title, text) {
    return "" + text;
  }
  image(href, title, text) {
    return "" + text;
  }
  br() {
    return "";
  }
}
class _Slugger {
  constructor() {
    __publicField(this, "seen");
    this.seen = {};
  }
  serialize(value) {
    return value.toLowerCase().trim().replace(/<[!\/a-z].*?>/ig, "").replace(/[\u2000-\u206F\u2E00-\u2E7F\\'!"#$%&()*+,./:;<=>?@[\]^`{|}~]/g, "").replace(/\s/g, "-");
  }
  /**
   * Finds the next safe (unique) slug to use
   */
  getNextSafeSlug(originalSlug, isDryRun) {
    let slug = originalSlug;
    let occurenceAccumulator = 0;
    if (this.seen.hasOwnProperty(slug)) {
      occurenceAccumulator = this.seen[originalSlug];
      do {
        occurenceAccumulator++;
        slug = originalSlug + "-" + occurenceAccumulator;
      } while (this.seen.hasOwnProperty(slug));
    }
    if (!isDryRun) {
      this.seen[originalSlug] = occurenceAccumulator;
      this.seen[slug] = 0;
    }
    return slug;
  }
  /**
   * Convert string to unique id
   */
  slug(value, options = {}) {
    const slug = this.serialize(value);
    return this.getNextSafeSlug(slug, options.dryrun);
  }
}
class _Parser {
  constructor(options) {
    __publicField(this, "options");
    __publicField(this, "renderer");
    __publicField(this, "textRenderer");
    __publicField(this, "slugger");
    this.options = options || _defaults;
    this.options.renderer = this.options.renderer || new _Renderer();
    this.renderer = this.options.renderer;
    this.renderer.options = this.options;
    this.textRenderer = new _TextRenderer();
    this.slugger = new _Slugger();
  }
  /**
   * Static Parse Method
   */
  static parse(tokens, options) {
    const parser2 = new _Parser(options);
    return parser2.parse(tokens);
  }
  /**
   * Static Parse Inline Method
   */
  static parseInline(tokens, options) {
    const parser2 = new _Parser(options);
    return parser2.parseInline(tokens);
  }
  /**
   * Parse Loop
   */
  parse(tokens, top = true) {
    let out = "";
    for (let i = 0; i < tokens.length; i++) {
      const token = tokens[i];
      if (this.options.extensions && this.options.extensions.renderers && this.options.extensions.renderers[token.type]) {
        const genericToken = token;
        const ret = this.options.extensions.renderers[genericToken.type].call({ parser: this }, genericToken);
        if (ret !== false || !["space", "hr", "heading", "code", "table", "blockquote", "list", "html", "paragraph", "text"].includes(genericToken.type)) {
          out += ret || "";
          continue;
        }
      }
      switch (token.type) {
        case "space": {
          continue;
        }
        case "hr": {
          out += this.renderer.hr();
          continue;
        }
        case "heading": {
          const headingToken = token;
          out += this.renderer.heading(this.parseInline(headingToken.tokens), headingToken.depth, unescape(this.parseInline(headingToken.tokens, this.textRenderer)), this.slugger);
          continue;
        }
        case "code": {
          const codeToken = token;
          out += this.renderer.code(codeToken.text, codeToken.lang, !!codeToken.escaped);
          continue;
        }
        case "table": {
          const tableToken = token;
          let header = "";
          let cell = "";
          for (let j = 0; j < tableToken.header.length; j++) {
            cell += this.renderer.tablecell(this.parseInline(tableToken.header[j].tokens), { header: true, align: tableToken.align[j] });
          }
          header += this.renderer.tablerow(cell);
          let body = "";
          for (let j = 0; j < tableToken.rows.length; j++) {
            const row = tableToken.rows[j];
            cell = "";
            for (let k = 0; k < row.length; k++) {
              cell += this.renderer.tablecell(this.parseInline(row[k].tokens), { header: false, align: tableToken.align[k] });
            }
            body += this.renderer.tablerow(cell);
          }
          out += this.renderer.table(header, body);
          continue;
        }
        case "blockquote": {
          const blockquoteToken = token;
          const body = this.parse(blockquoteToken.tokens);
          out += this.renderer.blockquote(body);
          continue;
        }
        case "list": {
          const listToken = token;
          const ordered = listToken.ordered;
          const start = listToken.start;
          const loose = listToken.loose;
          let body = "";
          for (let j = 0; j < listToken.items.length; j++) {
            const item = listToken.items[j];
            const checked = item.checked;
            const task = item.task;
            let itemBody = "";
            if (item.task) {
              const checkbox = this.renderer.checkbox(!!checked);
              if (loose) {
                if (item.tokens.length > 0 && item.tokens[0].type === "paragraph") {
                  item.tokens[0].text = checkbox + " " + item.tokens[0].text;
                  if (item.tokens[0].tokens && item.tokens[0].tokens.length > 0 && item.tokens[0].tokens[0].type === "text") {
                    item.tokens[0].tokens[0].text = checkbox + " " + item.tokens[0].tokens[0].text;
                  }
                } else {
                  item.tokens.unshift({
                    type: "text",
                    text: checkbox
                  });
                }
              } else {
                itemBody += checkbox;
              }
            }
            itemBody += this.parse(item.tokens, loose);
            body += this.renderer.listitem(itemBody, task, !!checked);
          }
          out += this.renderer.list(body, ordered, start);
          continue;
        }
        case "html": {
          const htmlToken = token;
          out += this.renderer.html(htmlToken.text, htmlToken.block);
          continue;
        }
        case "paragraph": {
          const paragraphToken = token;
          out += this.renderer.paragraph(this.parseInline(paragraphToken.tokens));
          continue;
        }
        case "text": {
          let textToken = token;
          let body = textToken.tokens ? this.parseInline(textToken.tokens) : textToken.text;
          while (i + 1 < tokens.length && tokens[i + 1].type === "text") {
            textToken = tokens[++i];
            body += "\n" + (textToken.tokens ? this.parseInline(textToken.tokens) : textToken.text);
          }
          out += top ? this.renderer.paragraph(body) : body;
          continue;
        }
        default: {
          const errMsg = 'Token with "' + token.type + '" type was not found.';
          if (this.options.silent) {
            console.error(errMsg);
            return "";
          } else {
            throw new Error(errMsg);
          }
        }
      }
    }
    return out;
  }
  /**
   * Parse Inline Tokens
   */
  parseInline(tokens, renderer) {
    renderer = renderer || this.renderer;
    let out = "";
    for (let i = 0; i < tokens.length; i++) {
      const token = tokens[i];
      if (this.options.extensions && this.options.extensions.renderers && this.options.extensions.renderers[token.type]) {
        const ret = this.options.extensions.renderers[token.type].call({ parser: this }, token);
        if (ret !== false || !["escape", "html", "link", "image", "strong", "em", "codespan", "br", "del", "text"].includes(token.type)) {
          out += ret || "";
          continue;
        }
      }
      switch (token.type) {
        case "escape": {
          const escapeToken = token;
          out += renderer.text(escapeToken.text);
          break;
        }
        case "html": {
          const tagToken = token;
          out += renderer.html(tagToken.text);
          break;
        }
        case "link": {
          const linkToken = token;
          out += renderer.link(linkToken.href, linkToken.title, this.parseInline(linkToken.tokens, renderer));
          break;
        }
        case "image": {
          const imageToken = token;
          out += renderer.image(imageToken.href, imageToken.title, imageToken.text);
          break;
        }
        case "strong": {
          const strongToken = token;
          out += renderer.strong(this.parseInline(strongToken.tokens, renderer));
          break;
        }
        case "em": {
          const emToken = token;
          out += renderer.em(this.parseInline(emToken.tokens, renderer));
          break;
        }
        case "codespan": {
          const codespanToken = token;
          out += renderer.codespan(codespanToken.text);
          break;
        }
        case "br": {
          out += renderer.br();
          break;
        }
        case "del": {
          const delToken = token;
          out += renderer.del(this.parseInline(delToken.tokens, renderer));
          break;
        }
        case "text": {
          const textToken = token;
          out += renderer.text(textToken.text);
          break;
        }
        default: {
          const errMsg = 'Token with "' + token.type + '" type was not found.';
          if (this.options.silent) {
            console.error(errMsg);
            return "";
          } else {
            throw new Error(errMsg);
          }
        }
      }
    }
    return out;
  }
}
class _Hooks {
  constructor(options) {
    __publicField(this, "options");
    this.options = options || _defaults;
  }
  /**
   * Process markdown before marked
   */
  preprocess(markdown) {
    return markdown;
  }
  /**
   * Process HTML after marked is finished
   */
  postprocess(html) {
    return html;
  }
}
__publicField(_Hooks, "passThroughHooks", /* @__PURE__ */ new Set([
  "preprocess",
  "postprocess"
]));
class Marked {
  constructor(...args) {
    __privateAdd(this, _parseMarkdown);
    __privateAdd(this, _onError);
    __publicField(this, "defaults", _getDefaults());
    __publicField(this, "options", this.setOptions);
    __publicField(this, "parse", __privateMethod(this, _parseMarkdown, parseMarkdown_fn).call(this, _Lexer.lex, _Parser.parse));
    __publicField(this, "parseInline", __privateMethod(this, _parseMarkdown, parseMarkdown_fn).call(this, _Lexer.lexInline, _Parser.parseInline));
    __publicField(this, "Parser", _Parser);
    __publicField(this, "parser", _Parser.parse);
    __publicField(this, "Renderer", _Renderer);
    __publicField(this, "TextRenderer", _TextRenderer);
    __publicField(this, "Lexer", _Lexer);
    __publicField(this, "lexer", _Lexer.lex);
    __publicField(this, "Tokenizer", _Tokenizer);
    __publicField(this, "Slugger", _Slugger);
    __publicField(this, "Hooks", _Hooks);
    this.use(...args);
  }
  /**
   * Run callback for every token
   */
  walkTokens(tokens, callback) {
    var _a, _b;
    let values = [];
    for (const token of tokens) {
      values = values.concat(callback.call(this, token));
      switch (token.type) {
        case "table": {
          const tableToken = token;
          for (const cell of tableToken.header) {
            values = values.concat(this.walkTokens(cell.tokens, callback));
          }
          for (const row of tableToken.rows) {
            for (const cell of row) {
              values = values.concat(this.walkTokens(cell.tokens, callback));
            }
          }
          break;
        }
        case "list": {
          const listToken = token;
          values = values.concat(this.walkTokens(listToken.items, callback));
          break;
        }
        default: {
          const genericToken = token;
          if ((_b = (_a = this.defaults.extensions) == null ? void 0 : _a.childTokens) == null ? void 0 : _b[genericToken.type]) {
            this.defaults.extensions.childTokens[genericToken.type].forEach((childTokens) => {
              values = values.concat(this.walkTokens(genericToken[childTokens], callback));
            });
          } else if (genericToken.tokens) {
            values = values.concat(this.walkTokens(genericToken.tokens, callback));
          }
        }
      }
    }
    return values;
  }
  use(...args) {
    const extensions = this.defaults.extensions || { renderers: {}, childTokens: {} };
    args.forEach((pack) => {
      const opts = __spreadValues({}, pack);
      opts.async = this.defaults.async || opts.async || false;
      if (pack.extensions) {
        pack.extensions.forEach((ext) => {
          if (!ext.name) {
            throw new Error("extension name required");
          }
          if ("renderer" in ext) {
            const prevRenderer = extensions.renderers[ext.name];
            if (prevRenderer) {
              extensions.renderers[ext.name] = function(...args2) {
                let ret = ext.renderer.apply(this, args2);
                if (ret === false) {
                  ret = prevRenderer.apply(this, args2);
                }
                return ret;
              };
            } else {
              extensions.renderers[ext.name] = ext.renderer;
            }
          }
          if ("tokenizer" in ext) {
            if (!ext.level || ext.level !== "block" && ext.level !== "inline") {
              throw new Error("extension level must be 'block' or 'inline'");
            }
            const extLevel = extensions[ext.level];
            if (extLevel) {
              extLevel.unshift(ext.tokenizer);
            } else {
              extensions[ext.level] = [ext.tokenizer];
            }
            if (ext.start) {
              if (ext.level === "block") {
                if (extensions.startBlock) {
                  extensions.startBlock.push(ext.start);
                } else {
                  extensions.startBlock = [ext.start];
                }
              } else if (ext.level === "inline") {
                if (extensions.startInline) {
                  extensions.startInline.push(ext.start);
                } else {
                  extensions.startInline = [ext.start];
                }
              }
            }
          }
          if ("childTokens" in ext && ext.childTokens) {
            extensions.childTokens[ext.name] = ext.childTokens;
          }
        });
        opts.extensions = extensions;
      }
      if (pack.renderer) {
        const renderer = this.defaults.renderer || new _Renderer(this.defaults);
        for (const prop in pack.renderer) {
          const rendererFunc = pack.renderer[prop];
          const rendererKey = prop;
          const prevRenderer = renderer[rendererKey];
          renderer[rendererKey] = (...args2) => {
            let ret = rendererFunc.apply(renderer, args2);
            if (ret === false) {
              ret = prevRenderer.apply(renderer, args2);
            }
            return ret || "";
          };
        }
        opts.renderer = renderer;
      }
      if (pack.tokenizer) {
        const tokenizer = this.defaults.tokenizer || new _Tokenizer(this.defaults);
        for (const prop in pack.tokenizer) {
          const tokenizerFunc = pack.tokenizer[prop];
          const tokenizerKey = prop;
          const prevTokenizer = tokenizer[tokenizerKey];
          tokenizer[tokenizerKey] = (...args2) => {
            let ret = tokenizerFunc.apply(tokenizer, args2);
            if (ret === false) {
              ret = prevTokenizer.apply(tokenizer, args2);
            }
            return ret;
          };
        }
        opts.tokenizer = tokenizer;
      }
      if (pack.hooks) {
        const hooks = this.defaults.hooks || new _Hooks();
        for (const prop in pack.hooks) {
          const hooksFunc = pack.hooks[prop];
          const hooksKey = prop;
          const prevHook = hooks[hooksKey];
          if (_Hooks.passThroughHooks.has(prop)) {
            hooks[hooksKey] = (arg) => {
              if (this.defaults.async) {
                return Promise.resolve(hooksFunc.call(hooks, arg)).then((ret2) => {
                  return prevHook.call(hooks, ret2);
                });
              }
              const ret = hooksFunc.call(hooks, arg);
              return prevHook.call(hooks, ret);
            };
          } else {
            hooks[hooksKey] = (...args2) => {
              let ret = hooksFunc.apply(hooks, args2);
              if (ret === false) {
                ret = prevHook.apply(hooks, args2);
              }
              return ret;
            };
          }
        }
        opts.hooks = hooks;
      }
      if (pack.walkTokens) {
        const walkTokens = this.defaults.walkTokens;
        const packWalktokens = pack.walkTokens;
        opts.walkTokens = function(token) {
          let values = [];
          values.push(packWalktokens.call(this, token));
          if (walkTokens) {
            values = values.concat(walkTokens.call(this, token));
          }
          return values;
        };
      }
      this.defaults = __spreadValues(__spreadValues({}, this.defaults), opts);
    });
    return this;
  }
  setOptions(opt) {
    this.defaults = __spreadValues(__spreadValues({}, this.defaults), opt);
    return this;
  }
}
_parseMarkdown = new WeakSet();
parseMarkdown_fn = function(lexer, parser2) {
  return (src, optOrCallback, callback) => {
    if (typeof optOrCallback === "function") {
      callback = optOrCallback;
      optOrCallback = null;
    }
    const origOpt = __spreadValues({}, optOrCallback);
    const opt = __spreadValues(__spreadValues({}, this.defaults), origOpt);
    if (this.defaults.async === true && origOpt.async === false) {
      if (!opt.silent) {
        console.warn("marked(): The async option was set to true by an extension. The async: false option sent to parse will be ignored.");
      }
      opt.async = true;
    }
    const throwError = __privateMethod(this, _onError, onError_fn).call(this, !!opt.silent, !!opt.async, callback);
    if (typeof src === "undefined" || src === null) {
      return throwError(new Error("marked(): input parameter is undefined or null"));
    }
    if (typeof src !== "string") {
      return throwError(new Error("marked(): input parameter is of type " + Object.prototype.toString.call(src) + ", string expected"));
    }
    checkDeprecations(opt, callback);
    if (opt.hooks) {
      opt.hooks.options = opt;
    }
    if (callback) {
      const resultCallback = callback;
      const highlight = opt.highlight;
      let tokens;
      try {
        if (opt.hooks) {
          src = opt.hooks.preprocess(src);
        }
        tokens = lexer(src, opt);
      } catch (e) {
        return throwError(e);
      }
      const done = (err) => {
        let out;
        if (!err) {
          try {
            if (opt.walkTokens) {
              this.walkTokens(tokens, opt.walkTokens);
            }
            out = parser2(tokens, opt);
            if (opt.hooks) {
              out = opt.hooks.postprocess(out);
            }
          } catch (e) {
            err = e;
          }
        }
        opt.highlight = highlight;
        return err ? throwError(err) : resultCallback(null, out);
      };
      if (!highlight || highlight.length < 3) {
        return done();
      }
      delete opt.highlight;
      if (!tokens.length)
        return done();
      let pending = 0;
      this.walkTokens(tokens, (token) => {
        if (token.type === "code") {
          pending++;
          setTimeout(() => {
            highlight(token.text, token.lang, (err, code) => {
              if (err) {
                return done(err);
              }
              if (code != null && code !== token.text) {
                token.text = code;
                token.escaped = true;
              }
              pending--;
              if (pending === 0) {
                done();
              }
            });
          }, 0);
        }
      });
      if (pending === 0) {
        done();
      }
      return;
    }
    if (opt.async) {
      return Promise.resolve(opt.hooks ? opt.hooks.preprocess(src) : src).then((src2) => lexer(src2, opt)).then((tokens) => opt.walkTokens ? Promise.all(this.walkTokens(tokens, opt.walkTokens)).then(() => tokens) : tokens).then((tokens) => parser2(tokens, opt)).then((html) => opt.hooks ? opt.hooks.postprocess(html) : html).catch(throwError);
    }
    try {
      if (opt.hooks) {
        src = opt.hooks.preprocess(src);
      }
      const tokens = lexer(src, opt);
      if (opt.walkTokens) {
        this.walkTokens(tokens, opt.walkTokens);
      }
      let html = parser2(tokens, opt);
      if (opt.hooks) {
        html = opt.hooks.postprocess(html);
      }
      return html;
    } catch (e) {
      return throwError(e);
    }
  };
};
_onError = new WeakSet();
onError_fn = function(silent, async, callback) {
  return (e) => {
    e.message += "\nPlease report this to https://github.com/markedjs/marked.";
    if (silent) {
      const msg = "<p>An error occurred:</p><pre>" + escape(e.message + "", true) + "</pre>";
      if (async) {
        return Promise.resolve(msg);
      }
      if (callback) {
        callback(null, msg);
        return;
      }
      return msg;
    }
    if (async) {
      return Promise.reject(e);
    }
    if (callback) {
      callback(e);
      return;
    }
    throw e;
  };
};
const markedInstance = new Marked();
function marked$1(src, opt, callback) {
  return markedInstance.parse(src, opt, callback);
}
marked$1.options = marked$1.setOptions = function(options) {
  markedInstance.setOptions(options);
  marked$1.defaults = markedInstance.defaults;
  changeDefaults(marked$1.defaults);
  return marked$1;
};
marked$1.getDefaults = _getDefaults;
marked$1.defaults = _defaults;
marked$1.use = function(...args) {
  markedInstance.use(...args);
  marked$1.defaults = markedInstance.defaults;
  changeDefaults(marked$1.defaults);
  return marked$1;
};
marked$1.walkTokens = function(tokens, callback) {
  return markedInstance.walkTokens(tokens, callback);
};
marked$1.parseInline = markedInstance.parseInline;
marked$1.Parser = _Parser;
marked$1.parser = _Parser.parse;
marked$1.Renderer = _Renderer;
marked$1.TextRenderer = _TextRenderer;
marked$1.Lexer = _Lexer;
marked$1.lexer = _Lexer.lex;
marked$1.Tokenizer = _Tokenizer;
marked$1.Slugger = _Slugger;
marked$1.Hooks = _Hooks;
marked$1.parse = marked$1;
marked$1.options;
marked$1.setOptions;
marked$1.use;
marked$1.walkTokens;
marked$1.parseInline;
_Parser.parse;
_Lexer.lex;
var escapes = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;"
};
var unescapes = {
  "&amp;": "&",
  "&lt;": "<",
  "&gt;": ">",
  "&quot;": '"',
  "&#39;": "'"
};
var rescaped = /(&amp;|&lt;|&gt;|&quot;|&#39;)/g;
var runescaped = /[&<>"']/g;
function escapeHtmlChar(match) {
  return escapes[match];
}
function unescapeHtmlChar(match) {
  return unescapes[match];
}
function escapeHtml(text) {
  return text == null ? "" : String(text).replace(runescaped, escapeHtmlChar);
}
function unescapeHtml(html) {
  return html == null ? "" : String(html).replace(rescaped, unescapeHtmlChar);
}
escapeHtml.options = unescapeHtml.options = {};
var she = {
  encode: escapeHtml,
  escape: escapeHtml,
  decode: unescapeHtml,
  unescape: unescapeHtml,
  version: "1.0.0-browser"
};
function assignment(result) {
  var stack = Array.prototype.slice.call(arguments, 1);
  var item;
  var key;
  while (stack.length) {
    item = stack.shift();
    for (key in item) {
      if (item.hasOwnProperty(key)) {
        if (Object.prototype.toString.call(result[key]) === "[object Object]") {
          result[key] = assignment(result[key], item[key]);
        } else {
          result[key] = item[key];
        }
      }
    }
  }
  return result;
}
var assignment_1 = assignment;
var lowercase$2 = function lowercase(string) {
  return typeof string === "string" ? string.toLowerCase() : string;
};
function toMap$2(list) {
  return list.reduce(asKey, {});
}
function asKey(accumulator, item) {
  accumulator[item] = true;
  return accumulator;
}
var toMap_1 = toMap$2;
var toMap$1 = toMap_1;
var uris = ["background", "base", "cite", "href", "longdesc", "src", "usemap"];
var attributes$1 = {
  uris: toMap$1(uris)
  // attributes that have an href and hence need to be sanitized
};
var toMap = toMap_1;
var voids = ["area", "br", "col", "hr", "img", "wbr", "input", "base", "basefont", "link", "meta"];
var elements$2 = {
  voids: toMap(voids)
};
var he$1 = she;
var lowercase$1 = lowercase$2;
var elements$1 = elements$2;
var rstart = /^<\s*([\w:-]+)((?:\s+[\w:-]+(?:\s*=\s*(?:(?:"[^"]*")|(?:'[^']*')|[^>\s]+))?)*)\s*(\/?)\s*>/;
var rend = /^<\s*\/\s*([\w:-]+)[^>]*>/;
var rattrs = /([\w:-]+)(?:\s*=\s*(?:(?:"((?:[^"])*)")|(?:'((?:[^'])*)')|([^>\s]+)))?/g;
var rtag = /^</;
var rtagend = /^<\s*\//;
function createStack() {
  var stack = [];
  stack.lastItem = function lastItem() {
    return stack[stack.length - 1];
  };
  return stack;
}
function parser$1(html, handler) {
  var stack = createStack();
  var last = html;
  var chars;
  while (html) {
    parsePart();
  }
  parseEndTag();
  function parsePart() {
    chars = true;
    parseTag();
    var same = html === last;
    last = html;
    if (same) {
      html = "";
    }
  }
  function parseTag() {
    if (html.substr(0, 4) === "<!--") {
      parseComment();
    } else if (rtagend.test(html)) {
      parseEdge(rend, parseEndTag);
    } else if (rtag.test(html)) {
      parseEdge(rstart, parseStartTag);
    }
    parseTagDecode();
  }
  function parseEdge(regex, parser2) {
    var match = html.match(regex);
    if (match) {
      html = html.substring(match[0].length);
      match[0].replace(regex, parser2);
      chars = false;
    }
  }
  function parseComment() {
    var index2 = html.indexOf("-->");
    if (index2 >= 0) {
      if (handler.comment) {
        handler.comment(html.substring(4, index2));
      }
      html = html.substring(index2 + 3);
      chars = false;
    }
  }
  function parseTagDecode() {
    if (!chars) {
      return;
    }
    var text;
    var index2 = html.indexOf("<");
    if (index2 >= 0) {
      text = html.substring(0, index2);
      html = html.substring(index2);
    } else {
      text = html;
      html = "";
    }
    if (handler.chars) {
      handler.chars(text);
    }
  }
  function parseStartTag(tag, tagName, rest, unary) {
    var attrs = {};
    var low = lowercase$1(tagName);
    var u = elements$1.voids[low] || !!unary;
    rest.replace(rattrs, attrReplacer);
    if (!u) {
      stack.push(low);
    }
    if (handler.start) {
      handler.start(low, attrs, u);
    }
    function attrReplacer(match, name, doubleQuotedValue, singleQuotedValue, unquotedValue) {
      if (doubleQuotedValue === void 0 && singleQuotedValue === void 0 && unquotedValue === void 0) {
        attrs[name] = void 0;
      } else {
        attrs[name] = he$1.decode(doubleQuotedValue || singleQuotedValue || unquotedValue || "");
      }
    }
  }
  function parseEndTag(tag, tagName) {
    var i;
    var pos = 0;
    var low = lowercase$1(tagName);
    if (low) {
      for (pos = stack.length - 1; pos >= 0; pos--) {
        if (stack[pos] === low) {
          break;
        }
      }
    }
    if (pos >= 0) {
      for (i = stack.length - 1; i >= pos; i--) {
        if (handler.end) {
          handler.end(stack[i]);
        }
      }
      stack.length = pos;
    }
  }
}
var parser_1 = parser$1;
var he = she;
var lowercase2 = lowercase$2;
var attributes = attributes$1;
var elements = elements$2;
function sanitizer$1(buffer, options) {
  var context;
  var o = options || {};
  reset();
  return {
    start,
    end,
    chars
  };
  function out(value) {
    buffer.push(value);
  }
  function start(tag, attrs, unary) {
    var low = lowercase2(tag);
    if (context.ignoring) {
      ignore(low);
      return;
    }
    if ((o.allowedTags || []).indexOf(low) === -1) {
      ignore(low);
      return;
    }
    if (o.filter && !o.filter({ tag: low, attrs })) {
      ignore(low);
      return;
    }
    out("<");
    out(low);
    Object.keys(attrs).forEach(parse);
    out(unary ? "/>" : ">");
    function parse(key) {
      var value = attrs[key];
      var classesOk = (o.allowedClasses || {})[low] || [];
      var attrsOk = (o.allowedAttributes || {})[low] || [];
      var valid;
      var lkey = lowercase2(key);
      if (lkey === "class" && attrsOk.indexOf(lkey) === -1) {
        value = value.split(" ").filter(isValidClass).join(" ").trim();
        valid = value.length;
      } else {
        valid = attrsOk.indexOf(lkey) !== -1 && (attributes.uris[lkey] !== true || testUrl(value));
      }
      if (valid) {
        out(" ");
        out(key);
        if (typeof value === "string") {
          out('="');
          out(he.encode(value));
          out('"');
        }
      }
      function isValidClass(className) {
        return classesOk && classesOk.indexOf(className) !== -1;
      }
    }
  }
  function end(tag) {
    var low = lowercase2(tag);
    var allowed = (o.allowedTags || []).indexOf(low) !== -1;
    if (allowed) {
      if (context.ignoring === false) {
        out("</");
        out(low);
        out(">");
      } else {
        unignore(low);
      }
    } else {
      unignore(low);
    }
  }
  function testUrl(text) {
    var start2 = text[0];
    if (start2 === "#" || start2 === "/") {
      return true;
    }
    var colon = text.indexOf(":");
    if (colon === -1) {
      return true;
    }
    var questionmark = text.indexOf("?");
    if (questionmark !== -1 && colon > questionmark) {
      return true;
    }
    var hash = text.indexOf("#");
    if (hash !== -1 && colon > hash) {
      return true;
    }
    return o.allowedSchemes.some(matches);
    function matches(scheme) {
      return text.indexOf(scheme + ":") === 0;
    }
  }
  function chars(text) {
    if (context.ignoring === false) {
      out(o.transformText ? o.transformText(text) : text);
    }
  }
  function ignore(tag) {
    if (elements.voids[tag]) {
      return;
    }
    if (context.ignoring === false) {
      context = { ignoring: tag, depth: 1 };
    } else if (context.ignoring === tag) {
      context.depth++;
    }
  }
  function unignore(tag) {
    if (context.ignoring === tag) {
      if (--context.depth <= 0) {
        reset();
      }
    }
  }
  function reset() {
    context = { ignoring: false, depth: 0 };
  }
}
var sanitizer_1 = sanitizer$1;
var defaults$2 = {
  allowedAttributes: {
    a: ["href", "name", "target", "title", "aria-label"],
    iframe: ["allowfullscreen", "frameborder", "src"],
    img: ["src", "alt", "title", "aria-label"]
  },
  allowedClasses: {},
  allowedSchemes: ["http", "https", "mailto"],
  allowedTags: [
    "a",
    "abbr",
    "article",
    "b",
    "blockquote",
    "br",
    "caption",
    "code",
    "del",
    "details",
    "div",
    "em",
    "h1",
    "h2",
    "h3",
    "h4",
    "h5",
    "h6",
    "hr",
    "i",
    "img",
    "ins",
    "kbd",
    "li",
    "main",
    "mark",
    "ol",
    "p",
    "pre",
    "section",
    "span",
    "strike",
    "strong",
    "sub",
    "summary",
    "sup",
    "table",
    "tbody",
    "td",
    "th",
    "thead",
    "tr",
    "u",
    "ul"
  ],
  filter: null
};
var defaults_1 = defaults$2;
var assign = assignment_1;
var parser = parser_1;
var sanitizer = sanitizer_1;
var defaults$1 = defaults_1;
function insane(html, options, strict) {
  var buffer = [];
  var configuration = strict === true ? options : assign({}, defaults$1, options);
  var handler = sanitizer(buffer, configuration);
  parser(html, handler);
  return buffer.join("");
}
insane.defaults = defaults$1;
var insane_1 = insane;
const insane$1 = /* @__PURE__ */ getDefaultExportFromCjs(insane_1);
const insaneOptions = {
  allowedClasses: {},
  // @refer CVE-2018-8495
  // @link https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2018-8495
  // @link https://leucosite.com/Microsoft-Edge-RCE/
  // @link https://medium.com/@knownsec404team/analysis-of-the-security-issues-of-url-scheme-in-pc-from-cve-2018-8495-934478a36756
  allowedSchemes: [
    "http",
    "https",
    "mailto",
    "data"
    // for support base64 encoded image (安全性有待考虑)
  ],
  allowedTags: [
    "a",
    "abbr",
    "article",
    "b",
    "blockquote",
    "br",
    "caption",
    "code",
    "del",
    "details",
    "div",
    "em",
    "h1",
    "h2",
    "h3",
    "h4",
    "h5",
    "h6",
    "hr",
    "i",
    "img",
    "ins",
    "kbd",
    "li",
    "main",
    "mark",
    "ol",
    "p",
    "pre",
    "section",
    "span",
    "strike",
    "strong",
    "sub",
    "summary",
    "sup",
    "table",
    "tbody",
    "td",
    "th",
    "thead",
    "tr",
    "u",
    "ul"
  ],
  allowedAttributes: {
    "*": ["title", "accesskey"],
    a: ["href", "name", "target", "aria-label", "rel"],
    img: ["src", "alt", "title", "atk-emoticon", "aria-label"],
    // for code highlight
    code: ["class"],
    span: ["class", "style"]
  },
  filter: (node) => {
    const allowed = [
      ["code", /^hljs\W+language-(.*)$/],
      ["span", /^(hljs-.*)$/]
    ];
    allowed.forEach(([tag, reg]) => {
      if (node.tag === tag && !!node.attrs.class && !reg.test(node.attrs.class)) {
        delete node.attrs.class;
      }
    });
    if (node.tag === "span" && !!node.attrs.style && !/^color:(\W+)?#[0-9a-f]{3,6};?$/i.test(node.attrs.style)) {
      delete node.attrs.style;
    }
    return true;
  }
};
function sanitize(content) {
  return insane$1(content, insaneOptions);
}
var hanabi$1 = { exports: {} };
(function(module, exports) {
  (function(global2, factory) {
    module.exports = factory();
  })(commonjsGlobal, function() {
    function createCommonjsModule(fn, module2) {
      return module2 = { exports: {} }, fn(module2, module2.exports), module2.exports;
    }
    var index$1 = createCommonjsModule(function(module2) {
      var comment = module2.exports = function() {
        return new RegExp("(?:" + comment.line().source + ")|(?:" + comment.block().source + ")", "gm");
      };
      comment.line = function() {
        return /(?:^|\s)\/\/(.+?)$/gm;
      };
      comment.block = function() {
        return /\/\*([\S\s]*?)\*\//gm;
      };
    });
    var defaultColors = ["23AC69", "91C132", "F19726", "E8552D", "1AAB8E", "E1147F", "2980C1", "1BA1E6", "9FA0A0", "F19726", "E30B20", "E30B20", "A3338B"];
    var index2 = function(input, ref) {
      if (ref === void 0)
        ref = {};
      var colors = ref.colors;
      if (colors === void 0)
        colors = defaultColors;
      var index3 = 0;
      var cache = {};
      var wordRe = /[\u4E00-\u9FFF\u3400-\u4dbf\uf900-\ufaff\u3040-\u309f\uac00-\ud7af\u0400-\u04FF]+|\w+/;
      var leftAngleRe = /</;
      var re = new RegExp("(" + wordRe.source + "|" + leftAngleRe.source + ")|(" + index$1().source + ")", "gmi");
      return input.replace(re, function(m, word, cm) {
        if (cm) {
          return toComment(cm);
        }
        if (word === "<") {
          return "&lt;";
        }
        var color;
        if (cache[word]) {
          color = cache[word];
        } else {
          color = colors[index3];
          cache[word] = color;
        }
        var out = '<span style="color: #' + color + '">' + word + "</span>";
        index3 = ++index3 % colors.length;
        return out;
      });
    };
    function toComment(cm) {
      return '<span style="color: slategray">' + cm + "</span>";
    }
    return index2;
  });
})(hanabi$1);
var hanabiExports = hanabi$1.exports;
const hanabi = /* @__PURE__ */ getDefaultExportFromCjs(hanabiExports);
function renderCode(code) {
  return hanabi(code);
}
function getRenderer() {
  const renderer = new marked$1.Renderer();
  renderer.link = markedLinkRenderer(renderer, renderer.link);
  renderer.code = markedCodeRenderer();
  return renderer;
}
const markedLinkRenderer = (renderer, orgLinkRenderer) => (href, title, text) => {
  const localLink = href == null ? void 0 : href.startsWith(`${window.location.protocol}//${window.location.hostname}`);
  const html = orgLinkRenderer.call(renderer, href, title, text);
  return html.replace(/^<a /, `<a target="_blank" ${!localLink ? `rel="noreferrer noopener nofollow"` : ""} `);
};
const markedCodeRenderer = () => (block2, lang) => {
  const realLang = !lang ? "plaintext" : lang;
  let colorized = block2;
  if (window.hljs) {
    if (realLang && window.hljs.getLanguage(realLang)) {
      colorized = window.hljs.highlight(realLang, block2).value;
    }
  } else {
    colorized = renderCode(block2);
  }
  return `<pre rel="${realLang}">
<code class="hljs language-${realLang}">${colorized.replace(/&amp;/g, "&")}</code>
</pre>`;
};
let instance;
let replacers = [];
const markedOptions = {
  pedantic: false,
  gfm: true,
  breaks: true,
  smartLists: true,
  smartypants: true,
  xhtml: false,
  sanitize: false,
  silent: true
};
function getInstance() {
  return instance;
}
function setReplacers(arr) {
  replacers = arr;
}
function initMarked() {
  try {
    if (!marked$1.name)
      return;
  } catch (e) {
    return;
  }
  marked$1.setOptions(__spreadValues({
    renderer: getRenderer()
  }, markedOptions));
  instance = marked$1;
}
function marked(src) {
  var _a;
  let markedContent = (_a = getInstance()) == null ? void 0 : _a.parse(src);
  if (!markedContent) {
    markedContent = simpleMarked(src);
  }
  let dest = sanitize(markedContent);
  replacers.forEach((replacer) => {
    if (typeof replacer === "function")
      dest = replacer(dest);
  });
  return dest;
}
function simpleMarked(src) {
  return src.replace(/```\s*([^]+?.*?[^]+?[^]+?)```/g, (_, code) => `<pre><code>${renderCode(code)}</code></pre>`).replace(/!\[(.*?)\]\((.*?)\)/g, (_, alt, imgSrc) => `<img src="${imgSrc}" alt="${alt}" />`).replace(/\[(.*?)\]\((.*?)\)/g, (_, text, link) => `<a href="${link}" target="_blank">${text}</a>`).replace(/\n/g, "<br>");
}
class DataManager {
  constructor(events) {
    __publicField(this, "loading", false);
    __publicField(this, "listLastFetch");
    __publicField(this, "comments", []);
    // Note: 无层级结构 + 无须排列
    __publicField(this, "unreads", []);
    __publicField(this, "page");
    this.events = events;
  }
  getLoading() {
    return this.loading;
  }
  setLoading(val) {
    this.loading = val;
  }
  getListLastFetch() {
    return this.listLastFetch;
  }
  setListLastFetch(val) {
    this.listLastFetch = val;
  }
  // -------------------------------------------------------------------
  //  Comments
  // -------------------------------------------------------------------
  getComments() {
    return this.comments;
  }
  fetchComments(params) {
    this.events.trigger("list-fetch", params);
  }
  findComment(id) {
    return this.comments.find((c) => c.id === id);
  }
  clearComments() {
    this.comments = [];
    this.events.trigger("list-loaded", this.comments);
  }
  loadComments(partialComments) {
    this.events.trigger("list-load", partialComments);
    this.comments.push(...partialComments);
    this.events.trigger("list-loaded", this.comments);
  }
  insertComment(comment) {
    this.comments.push(comment);
    this.events.trigger("comment-inserted", comment);
    this.events.trigger("list-loaded", this.comments);
  }
  updateComment(comment) {
    this.comments = this.comments.map((c) => {
      if (c.id === comment.id)
        return comment;
      return c;
    });
    this.events.trigger("comment-updated", comment);
    this.events.trigger("list-loaded", this.comments);
  }
  deleteComment(id) {
    const comment = this.comments.find((c) => c.id === id);
    if (!comment)
      throw new Error(`Comment ${id} not found`);
    this.comments = this.comments.filter((c) => c.id !== id);
    this.events.trigger("comment-deleted", comment);
    this.events.trigger("list-loaded", this.comments);
  }
  // -------------------------------------------------------------------
  //  Unreads
  // -------------------------------------------------------------------
  getUnreads() {
    return this.unreads;
  }
  updateUnreads(unread) {
    this.unreads = unread;
    this.events.trigger("unreads-updated", this.unreads);
  }
  // -------------------------------------------------------------------
  // Page
  // -------------------------------------------------------------------
  getPage() {
    return this.page;
  }
  updatePage(pageData) {
    this.page = pageData;
    this.events.trigger("page-loaded", pageData);
  }
}
class EventManager {
  constructor() {
    __publicField(this, "events", []);
  }
  /**
   * Add an event listener for a specific event name
   */
  on(name, handler, opts = {}) {
    this.events.push(__spreadValues({ name, handler }, opts));
  }
  /**
   * Remove an event listener for a specific event name and handler
   */
  off(name, handler) {
    if (!handler)
      return;
    this.events = this.events.filter((evt) => !(evt.name === name && evt.handler === handler));
  }
  /**
   * Trigger an event with an optional payload
   */
  trigger(name, payload) {
    this.events.slice(0).filter((evt) => evt.name === name && typeof evt.handler === "function").forEach((evt) => {
      if (evt.once)
        this.off(name, evt.handler);
      evt.handler(payload);
    });
  }
}
const defaults = {
  el: "",
  pageKey: "",
  pageTitle: "",
  server: "",
  site: "",
  placeholder: "",
  noComment: "",
  sendBtn: "",
  darkMode: false,
  editorTravel: true,
  flatMode: "auto",
  nestMax: 2,
  nestSort: "DATE_ASC",
  emoticons: "https://cdn.jsdelivr.net/gh/ArtalkJS/Emoticons/grps/default.json",
  vote: true,
  voteDown: false,
  uaBadge: true,
  listSort: true,
  preview: true,
  countEl: "#ArtalkCount",
  pvEl: "#ArtalkPV",
  gravatar: {
    mirror: "https://cravatar.cn/avatar/",
    params: "d=mp&s=240"
  },
  pagination: {
    pageSize: 20,
    readMore: true,
    autoLoad: true
  },
  heightLimit: {
    content: 300,
    children: 400,
    scrollable: false
  },
  imgUpload: true,
  reqTimeout: 15e3,
  versionCheck: true,
  useBackendConf: true,
  locale: "zh-CN"
};
function handelCustomConf(customConf) {
  const conf = mergeDeep(defaults, customConf);
  if (customConf.el)
    conf.el = customConf.el;
  if (typeof conf.el === "string" && !!conf.el) {
    try {
      const findEl = document.querySelector(conf.el);
      if (!findEl)
        throw Error(`Target element "${conf.el}" was not found.`);
      conf.el = findEl;
    } catch (e) {
      console.error(e);
      throw new Error("Please check your Artalk `el` config.");
    }
  }
  conf.server = conf.server.replace(/\/$/, "").replace(/\/api\/?$/, "");
  if (!conf.pageKey) {
    conf.pageKey = `${window.location.pathname}`;
  }
  if (!conf.pageTitle) {
    conf.pageTitle = `${document.title}`;
  }
  if (conf.locale === "auto") {
    conf.locale = navigator.language;
  }
  if (conf.flatMode === true || Number(conf.nestMax) <= 1)
    conf.flatMode = true;
  if (conf.flatMode === "auto")
    conf.flatMode = window.matchMedia("(max-width: 768px)").matches;
  return conf;
}
function handleConfFormServer(conf) {
  const DisabledKeys = [
    "el",
    "pageKey",
    "pageTitle",
    "server",
    "site",
    "darkMode"
  ];
  Object.keys(conf).forEach((k) => {
    if (DisabledKeys.includes(k))
      delete conf[k];
  });
  if (conf.emoticons && typeof conf.emoticons === "string") {
    conf.emoticons = conf.emoticons.trim();
    if (conf.emoticons.startsWith("[") || conf.emoticons.startsWith("{")) {
      conf.emoticons = JSON.parse(conf.emoticons);
    } else if (conf.emoticons === "false") {
      conf.emoticons = false;
    }
  }
  return conf;
}
function convertApiOptions(conf, ctx) {
  return {
    baseURL: `${conf.server}/api`,
    siteName: conf.site || "",
    pageKey: conf.pageKey || "",
    pageTitle: conf.pageTitle || "",
    timeout: conf.reqTimeout,
    onNeedCheckAdmin(payload) {
      ctx == null ? void 0 : ctx.checkAdmin({
        onSuccess: () => {
          payload.recall();
        },
        onCancel: () => {
          payload.reject();
        }
      });
    },
    onNeedCheckCaptcha(payload) {
      ctx == null ? void 0 : ctx.checkCaptcha({
        imgData: payload.data.imgData,
        iframe: payload.data.iframe,
        onSuccess: () => {
          payload.recall();
        },
        onCancel: () => {
          payload.reject();
        }
      });
    }
  };
}
class Context {
  constructor(conf, $root) {
    /* 运行参数 */
    __publicField(this, "conf");
    __publicField(this, "data");
    __publicField(this, "$root");
    /* Event Manager */
    __publicField(this, "events", new EventManager());
    this.conf = conf;
    this.$root = $root || document.createElement("div");
    this.$root.classList.add("artalk");
    this.$root.innerHTML = "";
    this.data = new DataManager(this.events);
  }
  inject(depName, obj) {
    this[depName] = obj;
  }
  get(depName) {
    return this[depName];
  }
  getApi() {
    return new Api(convertApiOptions(this.conf, this));
  }
  getData() {
    return this.data;
  }
  replyComment(commentData, $comment) {
    this.editor.setReply(commentData, $comment);
  }
  editComment(commentData, $comment) {
    this.editor.setEditComment(commentData, $comment);
  }
  fetch(params) {
    this.data.fetchComments(params);
  }
  reload() {
    this.data.fetchComments({ offset: 0 });
  }
  listGotoFirst() {
    this.trigger("list-goto-first");
  }
  /* 编辑器 */
  editorShowLoading() {
    this.editor.showLoading();
  }
  editorHideLoading() {
    this.editor.hideLoading();
  }
  editorShowNotify(msg, type) {
    this.editor.showNotify(msg, type);
  }
  editorResetState() {
    this.editor.resetState();
  }
  /* 侧边栏 */
  showSidebar(payload) {
    this.sidebarLayer.show(payload);
  }
  hideSidebar() {
    this.sidebarLayer.hide();
  }
  /* 权限检测 */
  checkAdmin(payload) {
    this.checkerLauncher.checkAdmin(payload);
  }
  checkCaptcha(payload) {
    this.checkerLauncher.checkCaptcha(payload);
  }
  /* Events */
  on(name, handler) {
    this.events.on(name, handler);
  }
  off(name, handler) {
    this.events.off(name, handler);
  }
  trigger(name, payload) {
    this.events.trigger(name, payload);
  }
  /* i18n */
  $t(key, args = {}) {
    return t(key, args);
  }
  setDarkMode(darkMode) {
    this.conf.darkMode = darkMode;
    this.trigger("dark-mode-changed", darkMode);
  }
  updateConf(nConf) {
    this.conf = mergeDeep(this.conf, handelCustomConf(nConf));
    this.trigger("conf-loaded", this.conf);
  }
  getMarked() {
    return getInstance();
  }
}
class Dialog {
  constructor(contentEl) {
    __publicField(this, "$el");
    __publicField(this, "$content");
    __publicField(this, "$actions");
    this.$el = createElement(
      `<div class="atk-layer-dialog-wrap">
        <div class="atk-layer-dialog">
          <div class="atk-layer-dialog-content"></div>
          <div class="atk-layer-dialog-actions"></div>
        </div>
      </div>`
    );
    this.$actions = this.$el.querySelector(".atk-layer-dialog-actions");
    this.$content = this.$el.querySelector(".atk-layer-dialog-content");
    this.$content.appendChild(contentEl);
  }
  /** 按钮 · 确定 */
  setYes(handler) {
    const btn = createElement(
      `<button data-action="confirm">${t("confirm")}</button>`
    );
    btn.onclick = this.onBtnClick(handler);
    this.$actions.appendChild(btn);
    return this;
  }
  /** 按钮 · 取消 */
  setNo(handler) {
    const btn = createElement(
      `<button data-action="cancel">${t("cancel")}</button>`
    );
    btn.onclick = this.onBtnClick(handler);
    this.$actions.appendChild(btn);
    return this;
  }
  onBtnClick(handler) {
    return (evt) => {
      const re = handler(evt.currentTarget, this);
      if (re === void 0 || re === true) {
        this.$el.remove();
      }
    };
  }
}
function showLoading(parentElem, conf) {
  let $loading = parentElem.querySelector(":scope > .atk-loading");
  if (!$loading) {
    $loading = createElement(
      `<div class="atk-loading atk-fade-in" style="display: none;">
      <div class="atk-loading-spinner">
        <svg viewBox="25 25 50 50"><circle cx="50" cy="50" r="20" fill="none" stroke-width="2" stroke-miterlimit="10"></circle></svg>
      </div>
    </div>`
    );
    if (conf == null ? void 0 : conf.transparentBg)
      $loading.style.background = "transparent";
    parentElem.appendChild($loading);
  }
  $loading.style.display = "";
  const $spinner = $loading.querySelector(".atk-loading-spinner");
  if ($spinner) {
    $spinner.style.display = "none";
    window.setTimeout(() => {
      $spinner.style.display = "";
    }, 500);
  }
}
function hideLoading(parentElem) {
  const $loading = parentElem.querySelector(":scope > .atk-loading");
  if ($loading)
    $loading.style.display = "none";
}
function setLoading(val, parentElem) {
  if (val)
    showLoading(parentElem);
  else
    hideLoading(parentElem);
}
function scrollIntoView(elem, enableAnim = true, relativeTo) {
  let top;
  if (relativeTo) {
    const containerRect = relativeTo.getBoundingClientRect();
    const elementRect = elem.getBoundingClientRect();
    top = elementRect.top - containerRect.top + relativeTo.scrollTop;
    top += getHeight(relativeTo) / 2 - getHeight(elem) / 2;
  } else {
    const rect = elem.getBoundingClientRect();
    const elemTop = rect.top + window.scrollY;
    top = elemTop - (window.innerHeight / 2 - rect.height / 2);
  }
  const scrollOptions = {
    top,
    left: 0,
    // behavior: enableAnim ? 'smooth' : 'instant',
    behavior: "instant"
  };
  if (relativeTo)
    relativeTo.scroll(scrollOptions);
  else
    window.scroll(scrollOptions);
}
function showNotify(wrapElem, msg, type) {
  const colors = { s: "#57d59f", e: "#ff6f6c", w: "#ffc721", i: "#2ebcfc" };
  const timeout = 3e3;
  const notifyElem = createElement(
    `<div class="atk-notify atk-fade-in" style="background-color: ${colors[type]}"><span class="atk-notify-content"></span></div>`
  );
  const notifyContentEl = notifyElem.querySelector(".atk-notify-content");
  notifyContentEl.innerHTML = htmlEncode(msg).replace("\n", "<br/>");
  wrapElem.appendChild(notifyElem);
  const notifyRemove = () => {
    notifyElem.classList.add("atk-fade-out");
    setTimeout(() => {
      notifyElem.remove();
    }, 200);
  };
  let timeoutFn;
  {
    timeoutFn = window.setTimeout(() => {
      notifyRemove();
    }, timeout);
  }
  notifyElem.addEventListener("click", () => {
    notifyRemove();
    window.clearTimeout(timeoutFn);
  });
}
function playFadeAnim(elem, after, type = "in") {
  elem.classList.add(`atk-fade-${type}`);
  const onAnimEnded = () => {
    elem.classList.remove(`atk-fade-${type}`);
    elem.removeEventListener("animationend", onAnimEnded);
    if (after)
      after();
  };
  elem.addEventListener("animationend", onAnimEnded);
}
function playFadeInAnim(elem, after) {
  playFadeAnim(elem, after, "in");
}
function setError(parentElem, html, title = '<span class="atk-error-title">Artalk Error</span>') {
  let elem = parentElem.querySelector(".atk-error-layer");
  if (html === null) {
    if (elem !== null)
      elem.remove();
    return;
  }
  if (!elem) {
    elem = createElement(
      `<div class="atk-error-layer">${title}<span class="atk-error-text"></span></div>`
    );
    parentElem.appendChild(elem);
  }
  const errorTextEl = elem.querySelector(".atk-error-text");
  errorTextEl.innerHTML = "";
  if (html === null)
    return;
  if (html instanceof HTMLElement) {
    errorTextEl.appendChild(html);
  } else {
    errorTextEl.innerText = html;
  }
}
function getScrollBarWidth() {
  const inner = document.createElement("p");
  inner.style.width = "100%";
  inner.style.height = "200px";
  const outer = document.createElement("div");
  outer.style.position = "absolute";
  outer.style.top = "0px";
  outer.style.left = "0px";
  outer.style.visibility = "hidden";
  outer.style.width = "200px";
  outer.style.height = "150px";
  outer.style.overflow = "hidden";
  outer.appendChild(inner);
  document.body.appendChild(outer);
  const w1 = inner.offsetWidth;
  outer.style.overflow = "scroll";
  let w2 = inner.offsetWidth;
  if (w1 === w2)
    w2 = outer.clientWidth;
  document.body.removeChild(outer);
  return w1 - w2;
}
function imgBody(checker) {
  const elem = createElement(
    `<span><img class="atk-captcha-img" src="${checker.get("img_data") || ""}">${t("captchaCheck")}</span>`
  );
  elem.querySelector(".atk-captcha-img").onclick = () => {
    const imgEl = elem.querySelector(".atk-captcha-img");
    checker.getApi().captcha.captchaGet().then((imgData) => {
      imgEl.setAttribute("src", imgData);
    }).catch((err) => {
      console.error("Failed to get captcha image ", err);
    });
  };
  return elem;
}
function iframeBody(checker) {
  const $iframeWrap = createElement(`<div class="atk-checker-iframe-wrap"></div>`);
  const $iframe = createElement(`<iframe class="atk-fade-in"></iframe>`);
  $iframe.style.display = "none";
  showLoading($iframeWrap, { transparentBg: true });
  $iframe.src = `${checker.getOpts().getIframeURLBase() || ""}/api/captcha/get?t=${+/* @__PURE__ */ new Date()}`;
  $iframe.onload = () => {
    $iframe.style.display = "";
    hideLoading($iframeWrap);
  };
  $iframeWrap.append($iframe);
  const $closeBtn = createElement(`<div class="atk-close-btn"><i class="atk-icon atk-icon-close"></i></div>`);
  $iframeWrap.append($closeBtn);
  checker.hideInteractInput();
  let stop = false;
  const sleep = (ms) => new Promise((resolve) => {
    window.setTimeout(() => {
      resolve(null);
    }, ms);
  });
  (function queryStatus() {
    return __async(this, null, function* () {
      yield sleep(1e3);
      if (stop)
        return;
      let isPass = false;
      try {
        const resp = yield checker.getApi().captcha.captchaStatus();
        isPass = resp.is_pass;
      } catch (e) {
        isPass = false;
      }
      if (isPass) {
        checker.triggerSuccess();
      } else {
        queryStatus();
      }
    });
  })();
  $closeBtn.onclick = () => {
    stop = true;
    checker.cancel();
  };
  return $iframeWrap;
}
const CaptchaChecker = {
  request(checker, inputVal) {
    return checker.getApi().captcha.captchaCheck(inputVal);
  },
  body(checker) {
    if (checker.get("iframe"))
      return iframeBody(checker);
    return imgBody(checker);
  },
  onSuccess(checker, data, inputVal, formEl) {
    checker.set("val", inputVal);
  },
  onError(checker, err, inputVal, formEl) {
    formEl.querySelector(".atk-captcha-img").click();
    formEl.querySelector('input[type="text"]').value = "";
  }
};
const AdminChecker = {
  inputType: "password",
  request(checker, inputVal) {
    const data = {
      name: UserInstance.data.nick,
      email: UserInstance.data.email,
      password: inputVal
    };
    return (() => __async(this, null, function* () {
      const resp = yield checker.getApi().user.login(data.name, data.email, data.password);
      return resp.token;
    }))();
  },
  body(checker) {
    return createElement(`<span>${t("adminCheck")}</span>`);
  },
  onSuccess(checker, userToken, inputVal, formEl) {
    UserInstance.update({
      isAdmin: true,
      token: userToken
    });
    checker.getOpts().onReload();
  },
  onError(checker, err, inputVal, formEl) {
  }
};
class CheckerLauncher {
  constructor(opts) {
    this.opts = opts;
  }
  checkCaptcha(payload) {
    this.fire(CaptchaChecker, payload, (ctx) => {
      ctx.set("img_data", payload.imgData);
      ctx.set("iframe", payload.iframe);
    });
  }
  checkAdmin(payload) {
    this.fire(AdminChecker, payload);
  }
  fire(checker, payload, postFire) {
    const layer = this.opts.getCtx().get("layerManager").create(`checker-${(/* @__PURE__ */ new Date()).getTime()}`);
    layer.show();
    const checkerStore = {};
    let hideInteractInput = false;
    const checkerCtx = {
      set: (key, val) => {
        checkerStore[key] = val;
      },
      get: (key) => checkerStore[key],
      getOpts: () => this.opts,
      getApi: () => this.opts.getApi(),
      hideInteractInput: () => {
        hideInteractInput = true;
      },
      triggerSuccess: () => {
        this.close(checker, layer);
        if (checker.onSuccess)
          checker.onSuccess(checkerCtx, "", "", formEl);
        if (payload.onSuccess)
          payload.onSuccess("", dialog.$el);
      },
      cancel: () => {
        this.close(checker, layer);
        if (payload.onCancel)
          payload.onCancel();
      }
    };
    if (postFire)
      postFire(checkerCtx);
    const formEl = createElement();
    formEl.appendChild(checker.body(checkerCtx));
    const $input = createElement(
      `<input id="check" type="${checker.inputType || "text"}" autocomplete="off" required placeholder="">`
    );
    formEl.appendChild($input);
    setTimeout(() => $input.focus(), 80);
    $input.onkeyup = (evt) => {
      if (evt.key === "Enter" || evt.keyCode === 13) {
        evt.preventDefault();
        layer.getEl().querySelector('button[data-action="confirm"]').click();
      }
    };
    let btnTextOrg;
    const dialog = new Dialog(formEl);
    dialog.setYes((btnEl) => {
      const inputVal = $input.value.trim();
      if (!btnTextOrg)
        btnTextOrg = btnEl.innerText;
      const btnTextSet = (btnText) => {
        btnEl.innerText = btnText;
        btnEl.classList.add("error");
      };
      const btnTextRestore = () => {
        btnEl.innerText = btnTextOrg || "";
        btnEl.classList.remove("error");
      };
      btnEl.innerText = `${t("loading")}...`;
      checker.request(checkerCtx, inputVal).then((data) => {
        this.close(checker, layer);
        if (checker.onSuccess)
          checker.onSuccess(checkerCtx, data, inputVal, formEl);
        if (payload.onSuccess)
          payload.onSuccess(inputVal, dialog.$el);
      }).catch((err) => {
        btnTextSet(String(err.msg || String(err)));
        if (checker.onError)
          checker.onError(checkerCtx, err, inputVal, formEl);
        const tf = setTimeout(() => btnTextRestore(), 3e3);
        $input.onfocus = () => {
          btnTextRestore();
          clearTimeout(tf);
        };
      });
      return false;
    });
    dialog.setNo(() => {
      this.close(checker, layer);
      if (payload.onCancel)
        payload.onCancel();
      return false;
    });
    if (hideInteractInput) {
      $input.style.display = "none";
      dialog.$el.querySelector(".atk-layer-dialog-actions").style.display = "none";
    }
    layer.getEl().append(dialog.$el);
    if (payload.onMount)
      payload.onMount(dialog.$el);
  }
  // 关闭 checker 对话框
  close(checker, layer) {
    layer.destroy();
  }
}
class Component {
  constructor(ctx) {
    __publicField(this, "$el");
    __publicField(this, "conf");
    this.ctx = ctx;
    this.conf = ctx.conf;
  }
}
const EditorHTML = '<div class="atk-main-editor">\n  <div class="atk-header">\n    <input name="nick" class="atk-nick" type="text" required="required">\n    <input name="email" class="atk-email" type="email" required="required">\n    <input name="link" class="atk-link" type="url">\n  </div>\n  <div class="atk-textarea-wrap">\n    <textarea class="atk-textarea"></textarea>\n  </div>\n  <div class="atk-plug-panel-wrap" style="display: none;"></div>\n  <div class="atk-bottom">\n    <div class="atk-item atk-plug-btn-wrap"></div>\n    <div class="atk-item">\n      <button type="button" class="atk-send-btn"></button>\n    </div>\n  </div>\n  <div class="atk-notify-wrap"></div>\n</div>\n';
const Sel = {
  $header: ".atk-header",
  $nick: '.atk-header [name="nick"]',
  $email: '.atk-header [name="email"]',
  $link: '.atk-header [name="link"]',
  $textareaWrap: ".atk-textarea-wrap",
  $textarea: ".atk-textarea",
  $bottom: ".atk-bottom",
  $submitBtn: ".atk-send-btn",
  $notifyWrap: ".atk-notify-wrap",
  $plugBtnWrap: ".atk-plug-btn-wrap",
  $plugPanelWrap: ".atk-plug-panel-wrap"
};
function render() {
  const $el = createElement(EditorHTML);
  const ui = { $el };
  Object.entries(Sel).forEach(([k, sel]) => {
    ui[k] = $el.querySelector(sel);
  });
  return ui;
}
class EditorPlug {
  constructor(kit) {
    this.kit = kit;
  }
  /** Use plug btn will add a btn on the bottom of editor */
  useBtn(html = "<div></div>") {
    this.$btn = createElement(`<span class="atk-plug-btn">${html}</span>`);
    return this.$btn;
  }
  /** Use plug panel will show the panel when btn is clicked */
  usePanel(html = "<div></div>") {
    this.$panel = createElement(html);
    return this.$panel;
  }
  /** Use the content transformer to handle the content of the last submit by the editor */
  useContentTransformer(func) {
    this.contentTransformer = func;
  }
  /** Listen the event of panel show */
  usePanelShow(func) {
    this.kit.useEvents().on("panel-show", (aPlug) => {
      if (aPlug === this)
        func();
    });
  }
  /** Listen the event of panel hide */
  usePanelHide(func) {
    this.kit.useEvents().on("panel-hide", (aPlug) => {
      if (aPlug === this)
        func();
    });
  }
  /** Use editor state modifier */
  useEditorStateEffect(stateName, effectFn) {
    this.editorStateEffectWhen = stateName;
    this.editorStateEffect = effectFn;
  }
}
class Mover extends EditorPlug {
  constructor() {
    super(...arguments);
    __publicField(this, "isMoved", false);
  }
  move(afterEl) {
    if (this.isMoved)
      return;
    this.isMoved = true;
    const editorEl = this.kit.useUI().$el;
    editorEl.after(createElement('<div class="atk-editor-travel-placeholder"></div>'));
    const $travelPlace = createElement("<div></div>");
    afterEl.after($travelPlace);
    $travelPlace.replaceWith(editorEl);
    editorEl.classList.add("atk-fade-in");
    editorEl.classList.add("editor-traveling");
  }
  back() {
    var _a;
    if (!this.isMoved)
      return;
    this.isMoved = false;
    (_a = this.kit.useGlobalCtx().$root.querySelector(".atk-editor-travel-placeholder")) == null ? void 0 : _a.replaceWith(this.kit.useUI().$el);
    this.kit.useUI().$el.classList.remove("editor-traveling");
  }
}
class EditorStateManager {
  constructor(editor) {
    __publicField(this, "stateCurt", "normal");
    __publicField(this, "stateUnmountFn", null);
    this.editor = editor;
  }
  /** Get current state */
  get() {
    return this.stateCurt;
  }
  /**
   * Switch editor state
   *
   * @param state The state to switch
   * @param payload The cause of state switch
   */
  switch(state, payload) {
    var _a, _b, _c, _d, _e;
    if (this.stateUnmountFn) {
      this.stateUnmountFn();
      this.stateUnmountFn = null;
      (_b = (_a = this.editor.getPlugs()) == null ? void 0 : _a.get(Mover)) == null ? void 0 : _b.back();
    }
    if (state !== "normal" && payload) {
      let moveAfterEl = payload.$comment;
      if (!this.editor.conf.flatMode)
        moveAfterEl = moveAfterEl.querySelector(".atk-footer");
      (_d = (_c = this.editor.getPlugs()) == null ? void 0 : _c.get(Mover)) == null ? void 0 : _d.move(moveAfterEl);
      const $relative = this.editor.ctx.conf.scrollRelativeTo && this.editor.ctx.conf.scrollRelativeTo();
      scrollIntoView(this.editor.getUI().$el, true, $relative);
      const plugin = (_e = this.editor.getPlugs()) == null ? void 0 : _e.getPlugs().find((p) => p.editorStateEffectWhen === state);
      if (plugin && plugin.editorStateEffect) {
        this.stateUnmountFn = plugin.editorStateEffect(payload.comment);
      }
    }
    this.stateCurt = state;
  }
}
class Editor extends Component {
  constructor(ctx) {
    super(ctx);
    __publicField(this, "ui");
    __publicField(this, "state");
    this.ui = render();
    this.$el = this.ui.$el;
    this.state = new EditorStateManager(this);
  }
  getUI() {
    return this.ui;
  }
  getPlugs() {
    return this.ctx.get("editorPlugs");
  }
  getState() {
    return this.state.get();
  }
  getHeaderInputEls() {
    return { nick: this.ui.$nick, email: this.ui.$email, link: this.ui.$link };
  }
  getContentFinal() {
    let content = this.getContentRaw();
    const plugs = this.getPlugs();
    if (plugs)
      content = plugs.getTransformedContent(content);
    return content;
  }
  getContentRaw() {
    return this.ui.$textarea.value || "";
  }
  getContentMarked() {
    return marked(this.getContentFinal());
  }
  setContent(val) {
    var _a;
    this.ui.$textarea.value = val;
    (_a = this.getPlugs()) == null ? void 0 : _a.getEvents().trigger("content-updated", val);
  }
  insertContent(val) {
    if (document.selection) {
      this.ui.$textarea.focus();
      document.selection.createRange().text = val;
      this.ui.$textarea.focus();
    } else if (this.ui.$textarea.selectionStart || this.ui.$textarea.selectionStart === 0) {
      const sStart = this.ui.$textarea.selectionStart;
      const sEnd = this.ui.$textarea.selectionEnd;
      const sT = this.ui.$textarea.scrollTop;
      this.setContent(this.ui.$textarea.value.substring(0, sStart) + val + this.ui.$textarea.value.substring(sEnd, this.ui.$textarea.value.length));
      this.ui.$textarea.focus();
      this.ui.$textarea.selectionStart = sStart + val.length;
      this.ui.$textarea.selectionEnd = sStart + val.length;
      this.ui.$textarea.scrollTop = sT;
    } else {
      this.ui.$textarea.focus();
      this.ui.$textarea.value += val;
    }
  }
  focus() {
    this.ui.$textarea.focus();
  }
  reset() {
    this.setContent("");
    this.resetState();
  }
  resetState() {
    this.state.switch("normal");
  }
  setReply(comment, $comment) {
    this.state.switch("reply", { comment, $comment });
  }
  setEditComment(comment, $comment) {
    this.state.switch("edit", { comment, $comment });
  }
  showNotify(msg, type) {
    showNotify(this.ui.$notifyWrap, msg, type);
  }
  showLoading() {
    showLoading(this.ui.$el);
  }
  hideLoading() {
    hideLoading(this.ui.$el);
  }
  submit() {
    this.ctx.trigger("editor-submit");
  }
}
const SidebarHTML = '<div class="atk-sidebar-layer">\n  <div class="atk-sidebar-inner">\n    <div class="atk-sidebar-header">\n      <div class="atk-sidebar-close"><i class="atk-icon atk-icon-close"></i></div>\n    </div>\n    <div class="atk-sidebar-iframe-wrap"></div>\n  </div>\n</div>\n';
class SidebarLayer extends Component {
  constructor(ctx) {
    super(ctx);
    __publicField(this, "layer");
    __publicField(this, "$header");
    __publicField(this, "$closeBtn");
    __publicField(this, "$iframeWrap");
    __publicField(this, "$iframe");
    __publicField(this, "firstShow", true);
    this.$el = createElement(SidebarHTML);
    this.$header = this.$el.querySelector(".atk-sidebar-header");
    this.$closeBtn = this.$header.querySelector(".atk-sidebar-close");
    this.$iframeWrap = this.$el.querySelector(".atk-sidebar-iframe-wrap");
    this.$closeBtn.onclick = () => {
      this.hide();
    };
    this.ctx.on("user-changed", () => {
      this.firstShow = true;
    });
  }
  /** 显示 */
  show() {
    return __async(this, arguments, function* (conf = {}) {
      this.$el.style.transform = "";
      this.initLayer();
      this.layer.show();
      this.authCheck({
        onSuccess: () => this.show(conf)
        // retry show after auth check
      });
      if (this.firstShow) {
        this.$iframeWrap.innerHTML = "";
        this.$iframe = this.createIframe(conf.view);
        this.$iframeWrap.append(this.$iframe);
        this.firstShow = false;
      } else {
        const $iframe = this.$iframe;
        const isIframeSrcDarkMode = $iframe.src.includes("darkMode=1");
        if (this.conf.darkMode && !isIframeSrcDarkMode)
          this.iframeLoad($iframe, `${this.$iframe.src}&darkMode=1`);
        if (!this.conf.darkMode && isIframeSrcDarkMode)
          this.iframeLoad($iframe, this.$iframe.src.replace("&darkMode=1", ""));
      }
      setTimeout(() => {
        this.$el.style.transform = "translate(0, 0)";
      }, 100);
      setTimeout(() => {
        this.ctx.getData().updateUnreads([]);
      }, 0);
      this.ctx.trigger("sidebar-show");
    });
  }
  /** 隐藏 */
  hide() {
    var _a;
    this.$el.style.transform = "";
    (_a = this.layer) == null ? void 0 : _a.hide();
    this.ctx.trigger("sidebar-hide");
  }
  // --------------------------------------------------
  authCheck(opts) {
    return __async(this, null, function* () {
      const resp = yield this.ctx.getApi().user.loginStatus();
      if (resp.is_admin && !resp.is_login) {
        this.firstShow = true;
        this.ctx.checkAdmin({
          onSuccess: () => {
            setTimeout(() => {
              opts.onSuccess();
            }, 500);
          },
          onCancel: () => {
            this.hide();
          }
        });
      }
    });
  }
  initLayer() {
    if (this.layer)
      return;
    this.layer = this.ctx.get("layerManager").create("sidebar", this.$el);
    this.layer.setOnAfterHide(() => {
      this.ctx.editorResetState();
    });
  }
  createIframe(view) {
    const $iframe = createElement("<iframe></iframe>");
    const baseURL = getURLBasedOnApi({
      base: this.ctx.conf.server,
      path: "/sidebar/"
    });
    const query = {
      pageKey: this.conf.pageKey,
      site: this.conf.site || "",
      user: JSON.stringify(UserInstance.data),
      time: +/* @__PURE__ */ new Date()
    };
    if (view)
      query.view = view;
    if (this.conf.darkMode)
      query.darkMode = "1";
    if (typeof this.conf.locale === "string")
      query.locale = this.conf.locale;
    const urlParams = new URLSearchParams(query);
    this.iframeLoad($iframe, `${baseURL}?${urlParams.toString()}`);
    return $iframe;
  }
  iframeLoad($iframe, src) {
    $iframe.src = src;
    showLoading(this.$iframeWrap);
    $iframe.onload = () => {
      hideLoading(this.$iframeWrap);
    };
  }
}
const ListHTML = '<div class="atk-list">\n  <div class="atk-list-header">\n    <div class="atk-comment-count">\n      <div class="atk-text"></div>\n    </div>\n    <div class="atk-right-action">\n      <span data-action="admin-close-comment" class="atk-hide" atk-only-admin-show></span>\n      <span data-action="open-sidebar" class="atk-hide atk-on">\n        <span class="atk-unread-badge" style="display: none;"></span>\n        <div class="atk-text"></div>\n      </span>\n    </div>\n  </div>\n  <div class="atk-list-body">\n    <div class="atk-list-comments-wrap"></div>\n  </div>\n  <div class="atk-list-footer">\n    <div class="atk-copyright"></div>\n  </div>\n</div>\n';
function makeNestCommentNodeList(srcData, sortBy = "DATE_DESC", nestMax = 2) {
  const nodeList = [];
  const roots = srcData.filter((o) => o.rid === 0);
  roots.forEach((root) => {
    const rootNode = {
      id: root.id,
      comment: root,
      children: [],
      level: 1
    };
    rootNode.parent = rootNode;
    nodeList.push(rootNode);
    (function loadChildren(parentNode) {
      const children = srcData.filter((o) => o.rid === parentNode.id);
      if (children.length === 0)
        return;
      if (parentNode.level >= nestMax)
        parentNode = parentNode.parent;
      children.forEach((child) => {
        const childNode = {
          id: child.id,
          comment: child,
          children: [],
          parent: parentNode,
          level: parentNode.level + 1
        };
        parentNode.children.push(childNode);
        loadChildren(childNode);
      });
    })(rootNode);
  });
  const sortFunc = (a, b) => {
    let v = a.id - b.id;
    if (sortBy === "DATE_ASC")
      v = +new Date(a.comment.date) - +new Date(b.comment.date);
    else if (sortBy === "DATE_DESC")
      v = +new Date(b.comment.date) - +new Date(a.comment.date);
    else if (sortBy === "SRC_INDEX")
      v = srcData.indexOf(a.comment) - srcData.indexOf(b.comment);
    else if (sortBy === "VOTE_UP_DESC")
      v = b.comment.vote_up - a.comment.vote_up;
    return v;
  };
  (function sortLevels(nodes) {
    nodes.forEach((node) => {
      node.children = node.children.sort(sortFunc);
      sortLevels(node.children);
    });
  })(nodeList);
  return nodeList;
}
class ListLayout {
  constructor(options) {
    this.options = options;
  }
  // TODO refactor `if syntax` to strategy pattern
  import(comments) {
    if (this.options.flatMode) {
      comments.forEach((commentData) => {
        this.putCommentFlatMode(commentData, comments, "append");
      });
    } else {
      this.importCommentsNestMode(comments);
    }
  }
  insert(comment) {
    if (!this.options.flatMode) {
      this.insertCommentNest(comment);
    } else {
      this.insertCommentFlatMode(comment);
    }
  }
  // 导入评论 · 嵌套模式
  importCommentsNestMode(srcData) {
    const rootNodes = makeNestCommentNodeList(srcData, this.options.nestSortBy, this.options.nestMax);
    rootNodes.forEach((rootNode) => {
      var _a;
      const rootC = this.options.createCommentNode(rootNode.comment, srcData);
      (_a = this.options.$commentsWrap) == null ? void 0 : _a.appendChild(rootC.getEl());
      rootC.getRender().playFadeAnim();
      const loadChildren = (parentC, parentNode) => {
        parentNode.children.forEach((node) => {
          const childD = node.comment;
          const childC = this.options.createCommentNode(childD, srcData);
          parentC.putChild(childC);
          loadChildren(childC, node);
        });
      };
      loadChildren(rootC, rootNode);
      rootC.getRender().checkHeightLimit();
    });
  }
  /** 导入评论 · 平铺模式 */
  putCommentFlatMode(cData, ctxData, insertMode) {
    var _a, _b;
    if (cData.is_collapsed)
      cData.is_allow_reply = false;
    const comment = this.options.createCommentNode(cData, ctxData);
    if (cData.visible) {
      if (insertMode === "append")
        (_a = this.options.$commentsWrap) == null ? void 0 : _a.append(comment.getEl());
      if (insertMode === "prepend")
        (_b = this.options.$commentsWrap) == null ? void 0 : _b.prepend(comment.getEl());
      comment.getRender().playFadeAnim();
    }
    comment.getRender().checkHeightLimit();
    return comment;
  }
  insertCommentNest(commentData) {
    var _a;
    const comment = this.options.createCommentNode(commentData, this.options.getCommentDataList());
    if (commentData.rid === 0) {
      (_a = this.options.$commentsWrap) == null ? void 0 : _a.prepend(comment.getEl());
    } else {
      const parent = this.options.findCommentNode(commentData.rid);
      if (parent) {
        parent.putChild(comment, this.options.nestSortBy === "DATE_ASC" ? "append" : "prepend");
        comment.getParents().forEach((p) => {
          p.getRender().heightLimitRemoveForChildren();
        });
      }
    }
    comment.getRender().checkHeightLimit();
    scrollIntoView(comment.getEl());
    comment.getRender().playFadeAnim();
  }
  insertCommentFlatMode(commentData) {
    const comment = this.putCommentFlatMode(commentData, this.options.getCommentDataList(), "prepend");
    scrollIntoView(comment.getEl());
  }
}
const win = window || {};
const nav = navigator || {};
function Detect(userAgent) {
  const u = String(userAgent || nav.userAgent);
  const dest = {
    os: "",
    osVersion: "",
    engine: "",
    browser: "",
    device: "",
    language: "",
    version: ""
  };
  const engineMatch = {
    Trident: u.includes("Trident") || u.includes("NET CLR"),
    Presto: u.includes("Presto"),
    WebKit: u.includes("AppleWebKit"),
    Gecko: u.includes("Gecko/")
  };
  const browserMatch = {
    Safari: u.includes("Safari"),
    Chrome: u.includes("Chrome") || u.includes("CriOS"),
    IE: u.includes("MSIE") || u.includes("Trident"),
    Edge: u.includes("Edge") || u.includes("Edg"),
    Firefox: u.includes("Firefox") || u.includes("FxiOS"),
    "Firefox Focus": u.includes("Focus"),
    Chromium: u.includes("Chromium"),
    Opera: u.includes("Opera") || u.includes("OPR"),
    Vivaldi: u.includes("Vivaldi"),
    Yandex: u.includes("YaBrowser"),
    Kindle: u.includes("Kindle") || u.includes("Silk/"),
    360: u.includes("360EE") || u.includes("360SE"),
    UC: u.includes("UC") || u.includes(" UBrowser"),
    QQBrowser: u.includes("QQBrowser"),
    QQ: u.includes("QQ/"),
    Baidu: u.includes("Baidu") || u.includes("BIDUBrowser"),
    Maxthon: u.includes("Maxthon"),
    Sogou: u.includes("MetaSr") || u.includes("Sogou"),
    LBBROWSER: u.includes("LBBROWSER"),
    "2345Explorer": u.includes("2345Explorer"),
    TheWorld: u.includes("TheWorld"),
    MIUI: u.includes("MiuiBrowser"),
    Quark: u.includes("Quark"),
    Qiyu: u.includes("Qiyu"),
    Wechat: u.includes("MicroMessenger"),
    Taobao: u.includes("AliApp(TB"),
    Alipay: u.includes("AliApp(AP"),
    Weibo: u.includes("Weibo"),
    Douban: u.includes("com.douban.frodo"),
    Suning: u.includes("SNEBUY-APP"),
    iQiYi: u.includes("IqiyiApp")
  };
  const osMatch = {
    Windows: u.includes("Windows"),
    Linux: u.includes("Linux") || u.includes("X11"),
    "macOS": u.includes("Macintosh"),
    Android: u.includes("Android") || u.includes("Adr"),
    Ubuntu: u.includes("Ubuntu"),
    FreeBSD: u.includes("FreeBSD"),
    Debian: u.includes("Debian"),
    "Windows Phone": u.includes("IEMobile") || u.includes("Windows Phone"),
    BlackBerry: u.includes("BlackBerry") || u.includes("RIM"),
    MeeGo: u.includes("MeeGo"),
    Symbian: u.includes("Symbian"),
    iOS: u.includes("like Mac OS X"),
    "Chrome OS": u.includes("CrOS"),
    WebOS: u.includes("hpwOS")
  };
  const deviceMatch = {
    Mobile: u.includes("Mobi") || u.includes("iPh") || u.includes("480"),
    Tablet: u.includes("Tablet") || u.includes("Pad") || u.includes("Nexus 7")
  };
  if (deviceMatch.Mobile) {
    deviceMatch.Mobile = !u.includes("iPad");
  } else if (browserMatch.Chrome && u.includes("Edg")) {
    browserMatch.Chrome = false;
    browserMatch.Edge = true;
  } else if (win.showModalDialog && win.chrome) {
    browserMatch.Chrome = false;
    browserMatch["360"] = true;
  }
  dest.device = "PC";
  dest.language = (() => {
    const g = nav.browserLanguage || nav.language;
    const arr = g.split("-");
    if (arr[1])
      arr[1] = arr[1].toUpperCase();
    return arr.join("_");
  })();
  const hash = {
    engine: engineMatch,
    browser: browserMatch,
    os: osMatch,
    device: deviceMatch
  };
  Object.entries(hash).forEach(([type, match]) => {
    Object.entries(match).forEach(([name, result]) => {
      if (result === true)
        dest[type] = name;
    });
  });
  const osVersion = {
    Windows: () => {
      const v = u.replace(/^.*Windows NT ([\d.]+);.*$/, "$1");
      const wvHash = {
        "6.4": "10",
        "6.3": "8.1",
        "6.2": "8",
        "6.1": "7",
        "6.0": "Vista",
        "5.2": "XP",
        "5.1": "XP",
        "5.0": "2000",
        "10.0": "10",
        "11.0": "11"
        // 自定的，不是微软官方的判断方法
      };
      return wvHash[v] || v;
    },
    Android: () => u.replace(/^.*Android ([\d.]+);.*$/, "$1"),
    iOS: () => u.replace(/^.*OS ([\d_]+) like.*$/, "$1").replace(/_/g, "."),
    Debian: () => u.replace(/^.*Debian\/([\d.]+).*$/, "$1"),
    "Windows Phone": () => u.replace(/^.*Windows Phone( OS)? ([\d.]+);.*$/, "$2"),
    "macOS": () => u.replace(/^.*Mac OS X ([\d_]+).*$/, "$1").replace(/_/g, "."),
    WebOS: () => u.replace(/^.*hpwOS\/([\d.]+);.*$/, "$1")
  };
  dest.osVersion = "";
  if (osVersion[dest.os]) {
    dest.osVersion = osVersion[dest.os]();
    if (dest.osVersion === u) {
      dest.osVersion = "";
    }
  }
  const version2 = {
    Safari: () => u.replace(/^.*Version\/([\d.]+).*$/, "$1"),
    Chrome: () => u.replace(/^.*Chrome\/([\d.]+).*$/, "$1").replace(/^.*CriOS\/([\d.]+).*$/, "$1"),
    IE: () => u.replace(/^.*MSIE ([\d.]+).*$/, "$1").replace(/^.*rv:([\d.]+).*$/, "$1"),
    Edge: () => u.replace(/^.*(Edge|Edg|Edg[A-Z]{1})\/([\d.]+).*$/, "$2"),
    Firefox: () => u.replace(/^.*Firefox\/([\d.]+).*$/, "$1").replace(/^.*FxiOS\/([\d.]+).*$/, "$1"),
    "Firefox Focus": () => u.replace(/^.*Focus\/([\d.]+).*$/, "$1"),
    Chromium: () => u.replace(/^.*Chromium\/([\d.]+).*$/, "$1"),
    Opera: () => u.replace(/^.*Opera\/([\d.]+).*$/, "$1").replace(/^.*OPR\/([\d.]+).*$/, "$1"),
    Vivaldi: () => u.replace(/^.*Vivaldi\/([\d.]+).*$/, "$1"),
    Yandex: () => u.replace(/^.*YaBrowser\/([\d.]+).*$/, "$1"),
    Kindle: () => u.replace(/^.*Version\/([\d.]+).*$/, "$1"),
    Maxthon: () => u.replace(/^.*Maxthon\/([\d.]+).*$/, "$1"),
    QQBrowser: () => u.replace(/^.*QQBrowser\/([\d.]+).*$/, "$1"),
    QQ: () => u.replace(/^.*QQ\/([\d.]+).*$/, "$1"),
    Baidu: () => u.replace(/^.*BIDUBrowser[\s/]([\d.]+).*$/, "$1"),
    UC: () => u.replace(/^.*UC?Browser\/([\d.]+).*$/, "$1"),
    Sogou: () => u.replace(/^.*SE ([\d.X]+).*$/, "$1").replace(/^.*SogouMobileBrowser\/([\d.]+).*$/, "$1"),
    "2345Explorer": () => u.replace(/^.*2345Explorer\/([\d.]+).*$/, "$1"),
    TheWorld: () => u.replace(/^.*TheWorld ([\d.]+).*$/, "$1"),
    MIUI: () => u.replace(/^.*MiuiBrowser\/([\d.]+).*$/, "$1"),
    Quark: () => u.replace(/^.*Quark\/([\d.]+).*$/, "$1"),
    Qiyu: () => u.replace(/^.*Qiyu\/([\d.]+).*$/, "$1"),
    Wechat: () => u.replace(/^.*MicroMessenger\/([\d.]+).*$/, "$1"),
    Taobao: () => u.replace(/^.*AliApp\(TB\/([\d.]+).*$/, "$1"),
    Alipay: () => u.replace(/^.*AliApp\(AP\/([\d.]+).*$/, "$1"),
    Weibo: () => u.replace(/^.*weibo__([\d.]+).*$/, "$1"),
    Douban: () => u.replace(/^.*com.douban.frodo\/([\d.]+).*$/, "$1"),
    Suning: () => u.replace(/^.*SNEBUY-APP([\d.]+).*$/, "$1"),
    iQiYi: () => u.replace(/^.*IqiyiVersion\/([\d.]+).*$/, "$1")
  };
  dest.version = "";
  if (version2[dest.browser]) {
    dest.version = version2[dest.browser]();
    if (dest.version === u) {
      dest.version = "";
    }
  }
  if (dest.version.indexOf(".")) {
    dest.version = dest.version.substring(0, dest.version.indexOf("."));
  }
  if (dest.os === "iOS" && u.includes("iPad")) {
    dest.os = "iPadOS";
  } else if (dest.browser === "Edge" && !u.includes("Edg")) {
    dest.engine = "EdgeHTML";
  } else if (dest.browser === "MIUI") {
    dest.os = "Android";
  } else if (dest.browser === "Chrome" && Number(dest.version) > 27) {
    dest.engine = "Blink";
  } else if (dest.browser === "Opera" && Number(dest.version) > 12) {
    dest.engine = "Blink";
  } else if (dest.browser === "Yandex") {
    dest.engine = "Blink";
  } else if (dest.browser === void 0) {
    dest.browser = "Unknow App";
  }
  return dest;
}
function check(conf, rules) {
  rules.forEach(({
    el,
    max: maxHeight,
    imgContains
  }) => {
    const _apply = () => {
      if (!el)
        return;
      if (!conf.scrollable)
        applyHeightLimit({ el, maxHeight, postBtnClick: conf.postExpandBtnClick });
      else
        applyScrollableHeightLimit({ el, maxHeight });
    };
    const _check = () => {
      if (el && getHeight(el) > maxHeight)
        _apply();
    };
    _check();
    if (imgContains && el)
      onImagesLoaded(el, () => _check());
  });
}
const HEIGHT_LIMIT_CSS = "atk-height-limit";
function applyHeightLimit(obj) {
  if (!obj.el)
    return;
  if (!obj.maxHeight)
    return;
  if (obj.el.classList.contains(HEIGHT_LIMIT_CSS))
    return;
  obj.el.classList.add(HEIGHT_LIMIT_CSS);
  obj.el.style.height = `${obj.maxHeight}px`;
  obj.el.style.overflow = "hidden";
  const $expandBtn = createElement(`<div class="atk-height-limit-btn">${t("readMore")}</span>`);
  $expandBtn.onclick = (e) => {
    e.stopPropagation();
    disposeHeightLimit(obj.el);
    if (obj.postBtnClick)
      obj.postBtnClick(e);
  };
  obj.el.append($expandBtn);
}
function disposeHeightLimit($el) {
  if (!$el)
    return;
  if (!$el.classList.contains(HEIGHT_LIMIT_CSS))
    return;
  $el.classList.remove(HEIGHT_LIMIT_CSS);
  Array.from($el.children).forEach((e) => {
    if (e.classList.contains("atk-height-limit-btn"))
      e.remove();
  });
  $el.style.height = "";
  $el.style.overflow = "";
}
const HEIGHT_LIMIT_SCROLL_CSS = "atk-height-limit-scroll";
function applyScrollableHeightLimit(obj) {
  if (!obj.el)
    return;
  if (obj.el.classList.contains(HEIGHT_LIMIT_SCROLL_CSS))
    return;
  obj.el.classList.add(HEIGHT_LIMIT_SCROLL_CSS);
  obj.el.style.height = `${obj.maxHeight}px`;
}
const CommentHTML = '<div class="atk-comment-wrap">\n  <div class="atk-comment">\n    <div class="atk-avatar"></div>\n    <div class="atk-main">\n      <div class="atk-header">\n        <span class="atk-item atk-nick"></span>\n        <span class="atk-badge-wrap"></span>\n        <span class="atk-item atk-date"></span>\n      </div>\n      <div class="atk-body">\n        <div class="atk-content"></div>\n      </div>\n      <div class="atk-footer">\n        <div class="atk-actions"></div>\n      </div>\n    </div>\n  </div>\n</div>\n';
function renderAvatar(r) {
  const $avatar = r.$el.querySelector(".atk-avatar");
  const $avatarImg = createElement("<img />");
  const avatarURLBuilder = r.conf.avatarURLBuilder;
  $avatarImg.src = avatarURLBuilder ? avatarURLBuilder(r.data) : r.comment.getGravatarURL();
  if (r.data.link) {
    const $avatarA = createElement('<a target="_blank" rel="noreferrer noopener nofollow"></a>');
    $avatarA.href = isValidURL(r.data.link) ? r.data.link : `https://${r.data.link}`;
    $avatarA.append($avatarImg);
    $avatar.append($avatarA);
  } else {
    $avatar.append($avatarImg);
  }
}
function renderHeader(r) {
  Object.entries({
    renderNick,
    renderVerifyBadge,
    renderDate,
    renderUABadge
  }).forEach(([name, render2]) => {
    render2(r);
  });
}
function renderNick(r) {
  r.$headerNick = r.$el.querySelector(".atk-nick");
  if (r.data.link) {
    const $nickA = createElement('<a target="_blank" rel="noreferrer noopener nofollow"></a>');
    $nickA.innerText = r.data.nick;
    $nickA.href = isValidURL(r.data.link) ? r.data.link : `https://${r.data.link}`;
    r.$headerNick.append($nickA);
  } else {
    r.$headerNick.innerText = r.data.nick;
  }
}
function renderVerifyBadge(ctx) {
  ctx.$headerBadgeWrap = ctx.$el.querySelector(".atk-badge-wrap");
  ctx.$headerBadgeWrap.innerHTML = "";
  const badgeText = ctx.data.badge_name;
  const badgeColor = ctx.data.badge_color;
  if (badgeText) {
    const $badge = createElement(`<span class="atk-badge"></span>`);
    $badge.innerText = badgeText.replace("管理员", ctx.ctx.$t("admin"));
    $badge.style.backgroundColor = badgeColor || "";
    ctx.$headerBadgeWrap.append($badge);
  }
  if (ctx.data.is_pinned) {
    const $pinnedBadge = createElement(`<span class="atk-pinned-badge">${ctx.ctx.$t("pin")}</span>`);
    ctx.$headerBadgeWrap.append($pinnedBadge);
  }
}
function renderDate(ctx) {
  const $date = ctx.$el.querySelector(".atk-date");
  $date.innerText = ctx.comment.getDateFormatted();
  $date.setAttribute("data-atk-comment-date", String(+new Date(ctx.data.date)));
}
function renderUABadge(ctx) {
  if (!ctx.ctx.conf.uaBadge && !ctx.data.ip_region)
    return;
  let $uaWrap = ctx.$header.querySelector("atk-ua-wrap");
  if (!$uaWrap) {
    $uaWrap = createElement(`<span class="atk-ua-wrap"></span>`);
    ctx.$header.append($uaWrap);
  }
  $uaWrap.innerHTML = "";
  if (ctx.data.ip_region) {
    const $regionBadge = createElement(`<span class="atk-region-badge"></span>`);
    $regionBadge.innerText = ctx.data.ip_region;
    $uaWrap.append($regionBadge);
  }
  if (ctx.ctx.conf.uaBadge) {
    const { browser, os } = ctx.comment.getUserUA();
    if (String(browser).trim()) {
      const $uaBrowser = createElement(`<span class="atk-ua ua-browser"></span>`);
      $uaBrowser.innerText = browser;
      $uaWrap.append($uaBrowser);
    }
    if (String(os).trim()) {
      const $usOS = createElement(`<span class="atk-ua ua-os"></span>`);
      $usOS.innerText = os;
      $uaWrap.append($usOS);
    }
  }
}
function renderContent(r) {
  if (!r.data.is_collapsed) {
    r.$content.innerHTML = r.comment.getContentMarked();
    r.$content.classList.remove("atk-hide", "atk-collapsed");
    return;
  }
  r.$content.classList.add("atk-hide", "atk-type-collapsed");
  const collapsedInfoEl = createElement(`
    <div class="atk-collapsed">
      <span class="atk-text">${r.ctx.$t("collapsedMsg")}</span>
      <span class="atk-show-btn">${r.ctx.$t("expand")}</span>
    </div>`);
  r.$body.insertAdjacentElement("beforeend", collapsedInfoEl);
  const contentShowBtn = collapsedInfoEl.querySelector(".atk-show-btn");
  contentShowBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    if (r.$content.classList.contains("atk-hide")) {
      r.$content.innerHTML = r.comment.getContentMarked();
      r.$content.classList.remove("atk-hide");
      playFadeInAnim(r.$content);
      contentShowBtn.innerText = r.ctx.$t("collapse");
    } else {
      r.$content.innerHTML = "";
      r.$content.classList.add("atk-hide");
      contentShowBtn.innerText = r.ctx.$t("expand");
    }
  });
}
function renderReplyAt(r) {
  if (r.cConf.isFlatMode || r.data.rid === 0)
    return;
  if (!r.cConf.replyTo)
    return;
  r.$replyAt = createElement(`<span class="atk-item atk-reply-at"><span class="atk-arrow"></span><span class="atk-nick"></span></span>`);
  r.$replyAt.querySelector(".atk-nick").innerText = `${r.cConf.replyTo.nick}`;
  r.$replyAt.onclick = () => {
    r.comment.getActions().goToReplyComment();
  };
  r.$headerBadgeWrap.insertAdjacentElement("afterend", r.$replyAt);
}
function renderReplyTo(r) {
  if (!r.cConf.isFlatMode)
    return;
  if (!r.cConf.replyTo)
    return;
  r.$replyTo = createElement(`
    <div class="atk-reply-to">
      <div class="atk-meta">${r.ctx.$t("reply")} <span class="atk-nick"></span>:</div>
      <div class="atk-content"></div>
    </div>`);
  const $nick = r.$replyTo.querySelector(".atk-nick");
  $nick.innerText = `@${r.cConf.replyTo.nick}`;
  $nick.onclick = () => {
    r.comment.getActions().goToReplyComment();
  };
  let replyContent = marked(r.cConf.replyTo.content);
  if (r.cConf.replyTo.is_collapsed)
    replyContent = `[${htmlEncode(r.ctx.$t("collapsed"))}]`;
  r.$replyTo.querySelector(".atk-content").innerHTML = replyContent;
  r.$body.prepend(r.$replyTo);
}
function renderPending(r) {
  if (!r.data.is_pending)
    return;
  const pendingEl = createElement(`<div class="atk-pending">${r.ctx.$t("pendingMsg")}</div>`);
  r.$body.prepend(pendingEl);
}
class ActionBtn {
  // 确认消息复原定时器
  /** 构造函数 */
  constructor(opts) {
    __publicField(this, "opts");
    __publicField(this, "$el");
    __publicField(this, "isLoading", false);
    // 正在加载
    __publicField(this, "msgRecTimer");
    // 消息显示复原定时器
    __publicField(this, "msgRecTimerFunc");
    // 消息正在显示
    __publicField(this, "isConfirming", false);
    // 正在确认
    __publicField(this, "confirmRecTimer");
    this.$el = createElement(`<span class="atk-common-action-btn"></span>`);
    this.opts = typeof opts !== "object" ? { text: opts } : opts;
    this.$el.innerText = this.getText();
    if (this.opts.adminOnly)
      this.$el.setAttribute("atk-only-admin-show", "");
  }
  // 消息显示复原操作
  get isMessaging() {
    return !!this.msgRecTimer;
  }
  /** 将按钮装载到指定元素 */
  appendTo(dom) {
    dom.append(this.$el);
    return this;
  }
  /** 获取按钮文字（动态/静态） */
  getText() {
    return typeof this.opts.text === "string" ? this.opts.text : this.opts.text();
  }
  /** 设置点击事件 */
  setClick(func) {
    this.$el.onclick = (e) => {
      e.stopPropagation();
      if (this.isLoading) {
        return;
      }
      if (this.opts.confirm && !this.isMessaging) {
        const confirmRestore = () => {
          this.isConfirming = false;
          this.$el.classList.remove("atk-btn-confirm");
          this.$el.innerText = this.getText();
        };
        if (!this.isConfirming) {
          this.isConfirming = true;
          this.$el.classList.add("atk-btn-confirm");
          this.$el.innerText = this.opts.confirmText || t("actionConfirm");
          this.confirmRecTimer = window.setTimeout(() => confirmRestore(), 5e3);
          return;
        }
        if (this.confirmRecTimer)
          window.clearTimeout(this.confirmRecTimer);
        confirmRestore();
      }
      if (this.msgRecTimer) {
        this.fireMsgRecTimer();
        this.clearMsgRecTimer();
        return;
      }
      func();
    };
  }
  /** 文字刷新（动态/静态） */
  updateText(text) {
    if (text)
      this.opts.text = text;
    this.setLoading(false);
    this.$el.innerText = this.getText();
  }
  /** 设置加载状态 */
  setLoading(value, loadingText) {
    if (this.isLoading === value)
      return;
    this.isLoading = value;
    if (value) {
      this.$el.classList.add("atk-btn-loading");
      this.$el.innerText = loadingText || `${t("loading")}...`;
    } else {
      this.$el.classList.remove("atk-btn-loading");
      this.$el.innerText = this.getText();
    }
  }
  /** 错误消息 */
  setError(text) {
    this.setMsg(text, "atk-btn-error");
  }
  /** 警告消息 */
  setWarn(text) {
    this.setMsg(text, "atk-btn-warn");
  }
  /** 成功消息 */
  setSuccess(text) {
    this.setMsg(text, "atk-btn-success");
  }
  /** 设置消息 */
  setMsg(text, className, duringTime, after) {
    this.setLoading(false);
    if (className)
      this.$el.classList.add(className);
    this.$el.innerText = text;
    this.setMsgRecTimer(() => {
      this.$el.innerText = this.getText();
      if (className)
        this.$el.classList.remove(className);
      if (after)
        after();
    }, duringTime || 2500);
  }
  /** 设置消息复原操作定时器 */
  setMsgRecTimer(func, duringTime) {
    this.fireMsgRecTimer();
    this.clearMsgRecTimer();
    this.msgRecTimerFunc = func;
    this.msgRecTimer = window.setTimeout(() => {
      func();
      this.clearMsgRecTimer();
    }, duringTime);
  }
  /** 立刻触发器复原定时器 */
  fireMsgRecTimer() {
    if (this.msgRecTimerFunc)
      this.msgRecTimerFunc();
  }
  /** 仅清除 timer */
  clearMsgRecTimer() {
    if (this.msgRecTimer)
      window.clearTimeout(this.msgRecTimer);
    this.msgRecTimer = void 0;
    this.msgRecTimerFunc = void 0;
  }
}
function renderActions(r) {
  Object.entries({
    renderVote,
    renderReply,
    // 管理员操作
    renderCollapse,
    renderModerator,
    renderPin,
    renderEdit,
    renderDel
  }).forEach(([name, render2]) => {
    render2(r);
  });
}
function renderVote(r) {
  if (!r.ctx.conf.vote)
    return;
  r.voteBtnUp = new ActionBtn(() => `${r.ctx.$t("voteUp")} (${r.data.vote_up || 0})`).appendTo(r.$actions);
  r.voteBtnUp.setClick(() => {
    r.comment.getActions().vote("up");
  });
  if (r.ctx.conf.voteDown) {
    r.voteBtnDown = new ActionBtn(() => `${r.ctx.$t("voteDown")} (${r.data.vote_down || 0})`).appendTo(r.$actions);
    r.voteBtnDown.setClick(() => {
      r.comment.getActions().vote("down");
    });
  }
}
function renderReply(r) {
  if (!r.data.is_allow_reply)
    return;
  const replyBtn = createElement(`<span>${r.ctx.$t("reply")}</span>`);
  r.$actions.append(replyBtn);
  replyBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    if (!r.cConf.onReplyBtnClick) {
      r.ctx.replyComment(r.data, r.$el);
    } else {
      r.cConf.onReplyBtnClick();
    }
  });
}
function renderCollapse(r) {
  const collapseBtn = new ActionBtn({
    text: () => r.data.is_collapsed ? r.ctx.$t("expand") : r.ctx.$t("collapse"),
    adminOnly: true
  });
  collapseBtn.appendTo(r.$actions);
  collapseBtn.setClick(() => {
    r.comment.getActions().adminEdit("collapsed", collapseBtn);
  });
}
function renderModerator(r) {
  const pendingBtn = new ActionBtn({
    text: () => r.data.is_pending ? r.ctx.$t("pending") : r.ctx.$t("approved"),
    adminOnly: true
  });
  pendingBtn.appendTo(r.$actions);
  pendingBtn.setClick(() => {
    r.comment.getActions().adminEdit("pending", pendingBtn);
  });
}
function renderPin(r) {
  const pinnedBtn = new ActionBtn({
    text: () => r.data.is_pinned ? r.ctx.$t("unpin") : r.ctx.$t("pin"),
    adminOnly: true
  });
  pinnedBtn.appendTo(r.$actions);
  pinnedBtn.setClick(() => {
    r.comment.getActions().adminEdit("pinned", pinnedBtn);
  });
}
function renderEdit(r) {
  const editBtn = new ActionBtn({
    text: r.ctx.$t("edit"),
    adminOnly: true
  });
  editBtn.appendTo(r.$actions);
  editBtn.setClick(() => {
    r.ctx.editComment(r.data, r.$el);
  });
}
function renderDel(r) {
  const delBtn = new ActionBtn({
    text: r.ctx.$t("delete"),
    confirm: true,
    confirmText: r.ctx.$t("deleteConfirm"),
    adminOnly: true
  });
  delBtn.appendTo(r.$actions);
  delBtn.setClick(() => {
    r.comment.getActions().adminDelete(delBtn);
  });
}
const Renders = {
  Avatar: renderAvatar,
  Header: renderHeader,
  Content: renderContent,
  ReplyAt: renderReplyAt,
  ReplyTo: renderReplyTo,
  Pending: renderPending,
  Actions: renderActions
};
function loadRenders(r) {
  Object.entries(Renders).forEach(([name, render2]) => {
    render2(r);
  });
}
class Render {
  // 回复 AT（层级嵌套下显示）
  constructor(comment) {
    __publicField(this, "comment");
    __publicField(this, "$el");
    __publicField(this, "$main");
    __publicField(this, "$header");
    __publicField(this, "$headerNick");
    __publicField(this, "$headerBadgeWrap");
    __publicField(this, "$body");
    __publicField(this, "$content");
    __publicField(this, "$childrenWrap");
    __publicField(this, "$actions");
    __publicField(this, "voteBtnUp");
    __publicField(this, "voteBtnDown");
    __publicField(this, "$replyTo");
    // 回复评论内容 (平铺下显示)
    __publicField(this, "$replyAt");
    this.comment = comment;
  }
  get ctx() {
    return this.comment.ctx;
  }
  get data() {
    return this.comment.getData();
  }
  get conf() {
    return this.comment.conf;
  }
  get cConf() {
    return this.comment.getConf();
  }
  render() {
    this.$el = createElement(CommentHTML);
    this.$main = this.$el.querySelector(".atk-main");
    this.$header = this.$el.querySelector(".atk-header");
    this.$body = this.$el.querySelector(".atk-body");
    this.$content = this.$body.querySelector(".atk-content");
    this.$actions = this.$el.querySelector(".atk-actions");
    this.$el.setAttribute("id", `atk-comment-${this.data.id}`);
    loadRenders(this);
    this.recoveryChildrenWrap();
    return this.$el;
  }
  /** 内容限高检测 */
  checkHeightLimit() {
    const conf = this.ctx.conf.heightLimit;
    if (!conf || !conf.content || !conf.children)
      return;
    const contentMaxH = conf.content;
    const childrenMaxH = conf.children;
    check({
      postExpandBtnClick: () => {
        const children = this.comment.getChildren();
        if (children.length === 1)
          disposeHeightLimit(children[0].getRender().$content);
      },
      scrollable: conf.scrollable
    }, [
      // 评论内容限高
      { el: this.$content, max: contentMaxH, imgContains: true },
      { el: this.$replyTo, max: contentMaxH, imgContains: true },
      // 子评论区域限高（仅嵌套模式）
      { el: this.$childrenWrap, max: childrenMaxH, imgContains: false }
    ]);
  }
  /** 子评论区域移除限高 */
  heightLimitRemoveForChildren() {
    if (!this.$childrenWrap)
      return;
    disposeHeightLimit(this.$childrenWrap);
  }
  /** 渐出动画 */
  playFadeAnim() {
    playFadeInAnim(this.comment.getRender().$el);
  }
  /** 渐出动画 · 评论内容区域 */
  playFadeAnimForBody() {
    playFadeInAnim(this.comment.getRender().$body);
  }
  /** 获取子评论 Wrap */
  getChildrenWrap() {
    return this.$childrenWrap;
  }
  /** 初始化子评论区域 Wrap */
  renderChildrenWrap() {
    if (!this.$childrenWrap) {
      this.$childrenWrap = createElement('<div class="atk-comment-children"></div>');
      this.$main.append(this.$childrenWrap);
    }
    return this.$childrenWrap;
  }
  /** 恢复原有的子评论区域 Wrap */
  recoveryChildrenWrap() {
    if (this.$childrenWrap) {
      this.$main.append(this.$childrenWrap);
    }
  }
  /** 设置已读 */
  setUnread(val) {
    if (val)
      this.$el.classList.add("atk-unread");
    else
      this.$el.classList.remove("atk-unread");
  }
  /** 设置为可点击的评论 */
  setOpenable(val) {
    if (val)
      this.$el.classList.add("atk-openable");
    else
      this.$el.classList.remove("atk-openable");
  }
  /** 设置点击评论打开置顶 URL */
  setOpenURL(url) {
    this.setOpenable(true);
    this.$el.onclick = (evt) => {
      evt.preventDefault();
      window.open(url);
      if (this.cConf.openEvt)
        this.cConf.openEvt();
    };
  }
  /** 设置点击评论时的操作 */
  setOpenAction(action) {
    this.setOpenable(true);
    this.$el.onclick = (evt) => {
      evt.preventDefault();
      action();
    };
  }
}
class CommentActions {
  constructor(comment) {
    __publicField(this, "comment");
    this.comment = comment;
  }
  get ctx() {
    return this.comment.ctx;
  }
  get data() {
    return this.comment.getData();
  }
  get cConf() {
    return this.comment.getConf();
  }
  /** 投票操作 */
  vote(type) {
    const actionBtn = type === "up" ? this.comment.getRender().voteBtnUp : this.comment.getRender().voteBtnDown;
    this.ctx.getApi().comment.vote(this.data.id, `comment_${type}`).then((v) => {
      var _a, _b;
      this.data.vote_up = v.up;
      this.data.vote_down = v.down;
      (_a = this.comment.getRender().voteBtnUp) == null ? void 0 : _a.updateText();
      (_b = this.comment.getRender().voteBtnDown) == null ? void 0 : _b.updateText();
    }).catch((err) => {
      actionBtn == null ? void 0 : actionBtn.setError(this.ctx.$t("voteFail"));
      console.log(err);
    });
  }
  /** 管理员 - 评论状态修改 */
  adminEdit(type, btnElem) {
    if (btnElem.isLoading)
      return;
    btnElem.setLoading(true, `${this.ctx.$t("editing")}...`);
    const modify = __spreadValues({}, this.data);
    if (type === "collapsed") {
      modify.is_collapsed = !modify.is_collapsed;
    } else if (type === "pending") {
      modify.is_pending = !modify.is_pending;
    } else if (type === "pinned") {
      modify.is_pinned = !modify.is_pinned;
    }
    this.ctx.getApi().comment.commentEdit(modify).then((data) => {
      btnElem.setLoading(false);
      this.comment.setData(data);
    }).catch((err) => {
      console.error(err);
      btnElem.setError(this.ctx.$t("editFail"));
    });
  }
  /** 管理员 - 评论删除 */
  adminDelete(btnElem) {
    if (btnElem.isLoading)
      return;
    btnElem.setLoading(true, `${this.ctx.$t("deleting")}...`);
    this.ctx.getApi().comment.commentDel(this.data.id, this.data.site_name).then(() => {
      btnElem.setLoading(false);
      if (this.cConf.onDelete)
        this.cConf.onDelete(this.comment);
    }).catch((e) => {
      console.error(e);
      btnElem.setError(this.ctx.$t("deleteFail"));
    });
  }
  /** 快速跳转到该评论 */
  goToReplyComment() {
    const origHash = window.location.hash;
    const modifyHash = `#atk-comment-${this.data.rid}`;
    window.location.hash = modifyHash;
    if (modifyHash === origHash)
      window.dispatchEvent(new Event("hashchange"));
  }
}
class Comment extends Component {
  // 最大嵌套层数
  constructor(ctx, data, conf) {
    super(ctx);
    __publicField(this, "renderInstance");
    __publicField(this, "actionInstance");
    __publicField(this, "data");
    __publicField(this, "cConf");
    __publicField(this, "parent");
    __publicField(this, "children", []);
    __publicField(this, "nestCurt");
    // 当前嵌套层数
    __publicField(this, "nestMax");
    this.nestMax = ctx.conf.nestMax || 3;
    this.cConf = conf;
    this.data = __spreadValues({}, data);
    this.data.date = this.data.date.replace(/-/g, "/");
    this.parent = null;
    this.nestCurt = 1;
    this.actionInstance = new CommentActions(this);
    this.renderInstance = new Render(this);
  }
  /** 渲染 UI */
  render() {
    const newEl = this.renderInstance.render();
    if (this.$el)
      this.$el.replaceWith(newEl);
    this.$el = newEl;
    if (this.cConf.afterRender)
      this.cConf.afterRender();
  }
  /** 获取评论操作实例对象 */
  getActions() {
    return this.actionInstance;
  }
  /** 获取评论渲染器实例对象 */
  getRender() {
    return this.renderInstance;
  }
  /** 获取评论数据 */
  getData() {
    return this.data;
  }
  /** 设置数据 */
  setData(data) {
    this.data = data;
    this.render();
    this.getRender().playFadeAnimForBody();
  }
  /** 获取父评论 */
  getParent() {
    return this.parent;
  }
  /** 获取所有子评论 */
  getChildren() {
    return this.children;
  }
  /** 获取当前嵌套层数 */
  getNestCurt() {
    return this.nestCurt;
  }
  /** 判断是否为根评论 */
  getIsRoot() {
    return this.data.rid === 0;
  }
  /** 获取评论 ID */
  getID() {
    return this.data.id;
  }
  /** 置入子评论 */
  putChild(childC, insertMode = "append") {
    childC.parent = this;
    childC.nestCurt = this.nestCurt + 1;
    this.children.push(childC);
    const $children = this.getChildrenEl();
    if (insertMode === "append")
      $children.append(childC.getEl());
    else if (insertMode === "prepend")
      $children.prepend(childC.getEl());
    childC.getRender().playFadeAnim();
    childC.getRender().checkHeightLimit();
  }
  /** 获取存放子评论的元素对象 */
  getChildrenEl() {
    let $children = this.getRender().getChildrenWrap();
    if (!$children) {
      if (this.nestCurt < this.nestMax) {
        $children = this.getRender().renderChildrenWrap();
      } else {
        $children = this.parent.getChildrenEl();
      }
    }
    return $children;
  }
  /** 获取所有父评论 */
  getParents() {
    const parents = [];
    const once = (c) => {
      if (c.parent) {
        parents.push(c.parent);
        once(c.parent);
      }
    };
    once(this);
    return parents;
  }
  /** 获取评论元素对象 */
  getEl() {
    return this.$el;
  }
  /** 获取 Gravatar 头像 URL */
  getGravatarURL() {
    return getGravatarURL({
      mirror: this.ctx.conf.gravatar.mirror,
      params: this.ctx.conf.gravatar.params,
      emailMD5: this.data.email_encrypted
    });
  }
  /** 获取评论 markdown 解析后的内容 */
  getContentMarked() {
    return marked(this.data.content);
  }
  /** 获取格式化后的日期 */
  getDateFormatted() {
    return timeAgo(new Date(this.data.date), this.ctx.$t);
  }
  /** 获取用户 UserAgent 信息 */
  getUserUA() {
    const info = Detect(this.data.ua);
    return {
      browser: `${info.browser} ${info.version}`,
      os: `${info.os} ${info.osVersion}`
    };
  }
  /** 获取配置 */
  getConf() {
    return this.cConf;
  }
}
function createComment(ctx, comment, ctxComments) {
  var _a;
  const instance2 = new Comment(ctx, comment, {
    isFlatMode: (_a = ctx.getData().getListLastFetch()) == null ? void 0 : _a.params.flatMode,
    afterRender: () => {
      ctx.trigger("comment-rendered", instance2);
    },
    onDelete: (c) => {
      ctx.getData().deleteComment(c.getID());
    },
    replyTo: comment.rid ? ctxComments.find((c) => c.id === comment.rid) : void 0
  });
  instance2.render();
  return instance2;
}
class ReadMoreBtn {
  constructor(opts) {
    __publicField(this, "opts");
    __publicField(this, "$el");
    __publicField(this, "$loading");
    __publicField(this, "$text");
    __publicField(this, "offset", 0);
    __publicField(this, "total", 0);
    __publicField(this, "origText", "Load More");
    this.opts = opts;
    this.origText = this.opts.text || this.origText;
    this.$el = createElement(
      `<div class="atk-list-read-more" style="display: none;">
      <div class="atk-list-read-more-inner">
        <div class="atk-loading-icon" style="display: none;"></div>
        <span class="atk-text">${this.origText}</span>
      </div>
    </div>`
    );
    this.$loading = this.$el.querySelector(".atk-loading-icon");
    this.$text = this.$el.querySelector(".atk-text");
    this.$el.onclick = () => {
      this.click();
    };
  }
  /** 是否有更多内容 */
  get hasMore() {
    return this.total > this.offset + this.opts.pageSize;
  }
  click() {
    if (this.hasMore)
      this.opts.onClick(this.offset + this.opts.pageSize);
    this.checkDisabled();
  }
  /** 显示 */
  show() {
    this.$el.style.display = "";
  }
  /** 隐藏 */
  hide() {
    this.$el.style.display = "none";
  }
  /** 加载 */
  setLoading(isLoading) {
    this.$loading.style.display = isLoading ? "" : "none";
    this.$text.style.display = isLoading ? "none" : "";
  }
  /** 错误提示 */
  showErr(errMsg) {
    this.setLoading(false);
    this.$text.innerText = errMsg;
    this.$el.classList.add("atk-err");
    window.setTimeout(() => {
      this.$text.innerText = this.origText;
      this.$el.classList.remove("atk-err");
    }, 2e3);
  }
  /** 更新数据 */
  update(offset, total) {
    this.offset = offset;
    this.total = total;
    this.checkDisabled();
  }
  checkDisabled() {
    if (this.hasMore)
      this.show();
    else
      this.hide();
  }
}
class ReadMorePaginator {
  constructor() {
    __publicField(this, "instance");
    __publicField(this, "onReachedBottom", null);
    __publicField(this, "opt");
  }
  create(opt) {
    this.opt = opt;
    this.instance = new ReadMoreBtn({
      pageSize: opt.pageSize,
      onClick: (o) => __async(this, null, function* () {
        opt.ctx.fetch({
          offset: o
        });
      }),
      text: t("loadMore")
    });
    if (opt.readMoreAutoLoad) {
      this.onReachedBottom = () => {
        if (!this.instance.hasMore || this.opt.ctx.getData().getLoading())
          return;
        this.instance.click();
      };
      this.opt.ctx.on("list-reach-bottom", this.onReachedBottom);
    }
    return this.instance.$el;
  }
  setLoading(val) {
    this.instance.setLoading(val);
  }
  update(offset, total) {
    this.instance.update(offset, total);
  }
  showErr(msg) {
    this.instance.showErr(msg);
  }
  next() {
    this.instance.click();
  }
  getHasMore() {
    return this.instance.hasMore;
  }
  getIsClearComments(params) {
    return params.offset === 0;
  }
  dispose() {
    this.onReachedBottom && this.opt.ctx.off("list-reach-bottom", this.onReachedBottom);
    this.instance.$el.remove();
  }
}
class Pagination {
  constructor(total, opts) {
    __publicField(this, "opts");
    __publicField(this, "total");
    __publicField(this, "$el");
    __publicField(this, "$input");
    __publicField(this, "inputTimer");
    __publicField(this, "$prevBtn");
    __publicField(this, "$nextBtn");
    __publicField(this, "page", 1);
    this.total = total;
    this.opts = opts;
    this.$el = createElement(
      `<div class="atk-pagination-wrap">
        <div class="atk-pagination">
          <div class="atk-btn atk-btn-prev">Prev</div>
          <input type="text" class="atk-input" aria-label="Enter the number of page" />
          <div class="atk-btn atk-btn-next">Next</div>
        </div>
      </div>`
    );
    this.$input = this.$el.querySelector(".atk-input");
    this.$input.value = `${this.page}`;
    this.$input.oninput = () => this.input();
    this.$input.onkeydown = (e) => this.keydown(e);
    this.$prevBtn = this.$el.querySelector(".atk-btn-prev");
    this.$nextBtn = this.$el.querySelector(".atk-btn-next");
    this.$prevBtn.onclick = () => this.prev();
    this.$nextBtn.onclick = () => this.next();
    this.checkDisabled();
  }
  get pageSize() {
    return this.opts.pageSize;
  }
  get offset() {
    return this.pageSize * (this.page - 1);
  }
  get maxPage() {
    return Math.ceil(this.total / this.pageSize);
  }
  update(offset, total) {
    this.page = Math.ceil(offset / this.pageSize) + 1;
    this.total = total;
    this.setInput(this.page);
    this.checkDisabled();
  }
  setInput(page) {
    this.$input.value = `${page}`;
  }
  input(now = false) {
    window.clearTimeout(this.inputTimer);
    const value = this.$input.value.trim();
    const modify = () => {
      if (value === "") {
        this.setInput(this.page);
        return;
      }
      let page = Number(value);
      if (Number.isNaN(page)) {
        this.setInput(this.page);
        return;
      }
      if (page < 1) {
        this.setInput(this.page);
        return;
      }
      if (page > this.maxPage) {
        this.setInput(this.maxPage);
        page = this.maxPage;
      }
      this.change(page);
    };
    if (!now)
      this.inputTimer = window.setTimeout(() => modify(), 800);
    else
      modify();
  }
  prev() {
    const page = this.page - 1;
    if (page < 1) {
      return;
    }
    this.change(page);
  }
  next() {
    const page = this.page + 1;
    if (page > this.maxPage) {
      return;
    }
    this.change(page);
  }
  getHasMore() {
    return this.page + 1 <= this.maxPage;
  }
  change(page) {
    this.page = page;
    this.opts.onChange(this.offset);
    this.setInput(page);
    this.checkDisabled();
  }
  checkDisabled() {
    if (this.page + 1 > this.maxPage) {
      this.$nextBtn.classList.add("atk-disabled");
    } else {
      this.$nextBtn.classList.remove("atk-disabled");
    }
    if (this.page - 1 < 1) {
      this.$prevBtn.classList.add("atk-disabled");
    } else {
      this.$prevBtn.classList.remove("atk-disabled");
    }
  }
  keydown(e) {
    const keyCode = e.keyCode || e.which;
    if (keyCode === 38) {
      const page = Number(this.$input.value) + 1;
      if (page > this.maxPage) {
        return;
      }
      this.setInput(page);
      this.input();
    } else if (keyCode === 40) {
      const page = Number(this.$input.value) - 1;
      if (page < 1) {
        return;
      }
      this.setInput(page);
      this.input();
    } else if (keyCode === 13) {
      this.input(true);
    }
  }
  /** 加载 */
  setLoading(isLoading) {
    if (isLoading)
      showLoading(this.$el);
    else
      hideLoading(this.$el);
  }
}
class UpDownPaginator {
  constructor() {
    __publicField(this, "instance");
  }
  create(opt) {
    this.instance = new Pagination(opt.total, {
      pageSize: opt.pageSize,
      onChange: (o) => __async(this, null, function* () {
        opt.ctx.editorResetState();
        opt.ctx.fetch({
          offset: o,
          onSuccess: () => {
            opt.ctx.listGotoFirst();
          }
        });
      })
    });
    return this.instance.$el;
  }
  setLoading(val) {
    this.instance.setLoading(val);
  }
  update(offset, total) {
    this.instance.update(offset, total);
  }
  next() {
    this.instance.next();
  }
  getHasMore() {
    return this.instance.getHasMore();
  }
  getIsClearComments() {
    return true;
  }
  dispose() {
    this.instance.$el.remove();
  }
}
function createPaginatorByConf(conf) {
  if (conf.pagination.readMore)
    return new ReadMorePaginator();
  return new UpDownPaginator();
}
function getPageDataByLastData(ctx) {
  const last = ctx.getData().getListLastFetch();
  const r = { offset: 0, total: 0 };
  if (!last)
    return r;
  r.offset = last.params.offset;
  if (last.data)
    r.total = last.params.flatMode ? last.data.total : last.data.total_roots;
  return r;
}
const initListPaginatorFunc = (ctx) => {
  let paginator = null;
  ctx.on("conf-loaded", (conf) => {
    const list = ctx.get("list");
    if (paginator)
      paginator.dispose();
    paginator = createPaginatorByConf(conf);
    const { offset, total } = getPageDataByLastData(ctx);
    const $paginator = paginator.create({
      ctx,
      pageSize: conf.pagination.pageSize,
      total,
      readMoreAutoLoad: conf.pagination.autoLoad
    });
    list.$commentsWrap.after($paginator);
    paginator == null ? void 0 : paginator.update(offset, total);
  });
  ctx.on("list-loaded", (comments) => {
    const { offset, total } = getPageDataByLastData(ctx);
    paginator == null ? void 0 : paginator.update(offset, total);
  });
  ctx.on("list-fetch", (params) => {
    if (ctx.getData().getComments().length > 0 && (paginator == null ? void 0 : paginator.getIsClearComments(params))) {
      ctx.getData().clearComments();
    }
  });
  ctx.on("list-error", () => {
    var _a;
    (_a = paginator == null ? void 0 : paginator.showErr) == null ? void 0 : _a.call(paginator, t("loadFail"));
  });
  const autoSwitchPageForFindComment = (commentID) => {
    const comment = ctx.getData().findComment(commentID);
    if (!!comment || !(paginator == null ? void 0 : paginator.getHasMore()))
      return;
    ctx.on("list-loaded", () => {
      autoSwitchPageForFindComment(commentID);
    }, { once: true });
    setTimeout(() => {
      paginator == null ? void 0 : paginator.next();
    }, 80);
  };
  ctx.on("list-goto", (commentID) => {
    autoSwitchPageForFindComment(commentID);
  });
  ctx.on("list-fetch", (params) => {
    paginator == null ? void 0 : paginator.setLoading(true);
  });
  ctx.on("list-fetched", ({ params }) => {
    paginator == null ? void 0 : paginator.setLoading(false);
  });
};
class List extends Component {
  constructor(ctx) {
    super(ctx);
    /** 列表评论集区域元素 */
    __publicField(this, "$commentsWrap");
    __publicField(this, "commentNodes", []);
    this.$el = createElement(ListHTML);
    this.$commentsWrap = this.$el.querySelector(".atk-list-comments-wrap");
    initListPaginatorFunc(ctx);
    this.initCrudEvents();
  }
  getCommentsWrapEl() {
    return this.$commentsWrap;
  }
  getCommentNodes() {
    return this.commentNodes;
  }
  getListLayout() {
    return new ListLayout({
      $commentsWrap: this.$commentsWrap,
      nestSortBy: this.ctx.conf.nestSort,
      nestMax: this.ctx.conf.nestMax,
      flatMode: this.ctx.conf.flatMode,
      // flatMode must be boolean because it had been handled when Artalk.init
      createCommentNode: (d, c) => {
        const node = createComment(this.ctx, d, c);
        this.commentNodes.push(node);
        return node;
      },
      findCommentNode: (id) => this.commentNodes.find((c) => c.getID() === id),
      getCommentDataList: () => this.ctx.getData().getComments()
    });
  }
  initCrudEvents() {
    this.ctx.on("list-load", (comments) => {
      this.getListLayout().import(comments);
    });
    this.ctx.on("list-loaded", (comments) => {
      if (comments.length === 0)
        this.$commentsWrap.innerHTML = "";
    });
    this.ctx.on("comment-inserted", (comment) => {
      this.getListLayout().insert(comment);
    });
    this.ctx.on("comment-deleted", (comment) => {
      const node = this.commentNodes.find((c) => c.getID() === comment.id);
      if (!node) {
        console.error(`comment node id=${comment.id} not found`);
        return;
      }
      node.getEl().remove();
      this.commentNodes = this.commentNodes.filter((c) => c.getID() !== comment.id);
    });
    this.ctx.on("comment-updated", (comment) => {
      const node = this.commentNodes.find((c) => c.getID() === comment.id);
      node && node.setData(comment);
    });
  }
}
let bodyOrgOverflow;
let bodyOrgPaddingRight;
function getScrollbarHelper() {
  return {
    init() {
      bodyOrgOverflow = document.body.style.overflow;
      bodyOrgPaddingRight = document.body.style.paddingRight;
    },
    unlock() {
      document.body.style.overflow = bodyOrgOverflow;
      document.body.style.paddingRight = bodyOrgPaddingRight;
    },
    lock() {
      document.body.style.overflow = "hidden";
      const barPaddingRight = parseInt(window.getComputedStyle(document.body, null).getPropertyValue("padding-right"), 10);
      document.body.style.paddingRight = `${getScrollBarWidth() + barPaddingRight || 0}px`;
    }
  };
}
class LayerWrap {
  constructor() {
    __publicField(this, "$wrap");
    __publicField(this, "$mask");
    __publicField(this, "allowMaskClose", true);
    __publicField(this, "items", []);
    this.$wrap = createElement(
      `<div class="atk-layer-wrap" style="display: none;"><div class="atk-layer-mask"></div></div>`
    );
    this.$mask = this.$wrap.querySelector(".atk-layer-mask");
  }
  createItem(name, el) {
    if (!el) {
      el = document.createElement("div");
      el.classList.add("atk-layer-item");
      el.setAttribute("data-layer-name", name);
      el.style.display = "none";
    }
    this.$wrap.appendChild(el);
    this.items.push(el);
    return el;
  }
  getWrap() {
    return this.$wrap;
  }
  getMask() {
    return this.$mask;
  }
  setMaskClose(enabled) {
    this.allowMaskClose = enabled;
  }
  show() {
    this.$wrap.style.display = "block";
    this.$mask.style.display = "block";
    this.$mask.classList.add("atk-fade-in");
    this.$mask.onclick = () => {
      if (this.allowMaskClose)
        this.hide();
    };
    getScrollbarHelper().lock();
  }
  hide(callback) {
    if (this.items.filter((e) => e.isConnected && e.style.display !== "none").length > 1) {
      callback && callback();
      return;
    }
    const onAfterHide = () => {
      this.$wrap.style.display = "none";
      this.$wrap.classList.remove("atk-fade-out");
      callback && callback();
      getScrollbarHelper().unlock();
      this.$wrap.onanimationend = null;
    };
    this.$wrap.classList.add("atk-fade-out");
    if (window.getComputedStyle(this.$wrap)["animation-name"] !== "none") {
      this.$wrap.onanimationend = () => onAfterHide();
    } else {
      onAfterHide();
    }
  }
}
class Layer {
  constructor(wrap, name, el) {
    __publicField(this, "$el");
    __publicField(this, "wrap");
    __publicField(this, "onAfterHide");
    this.wrap = wrap;
    this.$el = this.wrap.createItem(name, el);
  }
  setOnAfterHide(func) {
    this.onAfterHide = func;
  }
  getEl() {
    return this.$el;
  }
  show() {
    this.$el.style.display = "";
    this.wrap.show();
  }
  hide() {
    this.wrap.hide(() => {
      this.$el.style.display = "none";
      this.onAfterHide && this.onAfterHide();
    });
  }
  destroy() {
    this.wrap.hide(() => {
      this.$el.remove();
      this.onAfterHide && this.onAfterHide();
    });
  }
}
class LayerManager {
  constructor(ctx) {
    __publicField(this, "wrap");
    __publicField(this, "ctx");
    this.ctx = ctx;
    this.wrap = new LayerWrap();
    document.body.appendChild(this.wrap.getWrap());
    ctx.on("destroy", () => {
      this.wrap.getWrap().remove();
    });
    getScrollbarHelper().init();
  }
  getEl() {
    return this.wrap.getWrap();
  }
  create(name, el) {
    const layer = new Layer(this.wrap, name, el);
    return layer;
  }
}
const services = {
  // I18n
  i18n(ctx) {
    setLocale(ctx.conf.locale);
    ctx.on("conf-loaded", () => {
      setLocale(ctx.conf.locale);
    });
  },
  // User Store
  user(ctx) {
    UserInstance.setOnUserChanged((user) => {
      ctx == null ? void 0 : ctx.trigger("user-changed", user);
    });
    return UserInstance;
  },
  // 弹出层
  layerManager(ctx) {
    return new LayerManager(ctx);
  },
  // CheckerLauncher
  checkerLauncher(ctx) {
    const checkerLauncher = new CheckerLauncher({
      getCtx: () => ctx,
      getApi: () => ctx.getApi(),
      getIframeURLBase: () => ctx.conf.server,
      onReload: () => ctx.reload()
    });
    return checkerLauncher;
  },
  // 编辑器
  editor(ctx) {
    const editor = new Editor(ctx);
    ctx.$root.appendChild(editor.$el);
    return editor;
  },
  // 评论列表
  list(ctx) {
    const list = new List(ctx);
    ctx.$root.appendChild(list.$el);
    return list;
  },
  // 侧边栏 Layer
  sidebarLayer(ctx) {
    const sidebarLayer = new SidebarLayer(ctx);
    return sidebarLayer;
  },
  // Extra Service
  // -----------------------------------------
  // Only for type check
  // Not inject to ctx immediately,
  // but can be injected by other occasions
  editorPlugs() {
    return void 0;
  }
};
function showErrorDialog(opts) {
  const errEl = createElement(`<span>${opts.errMsg}，${t("listLoadFailMsg")}<br/></span>`);
  if (opts.retryFn) {
    const $retryBtn = createElement(`<span style="cursor:pointer;">${t("listRetry")}</span>`);
    $retryBtn.onclick = () => opts.retryFn && opts.retryFn();
    errEl.appendChild($retryBtn);
  }
  if (opts.onOpenSidebar) {
    const $openSidebar = createElement('<span atk-only-admin-show> | <span style="cursor:pointer;">打开控制台</span></span>');
    errEl.appendChild($openSidebar);
    if (!UserInstance.data.isAdmin) {
      $openSidebar.classList.add("atk-hide");
    }
    $openSidebar.onclick = () => opts.onOpenSidebar && opts.onOpenSidebar();
  }
  setError(opts.$err, errEl);
}
const ConfRemoter = (ctx) => {
  ctx.on("inited", () => {
    loadConf(ctx);
  });
};
function loadConf(ctx) {
  ctx.getApi().system.conf().then((data) => {
    let conf = {
      apiVersion: data.version.version
      // version info
    };
    if (ctx.conf.useBackendConf) {
      if (!data.frontend_conf)
        throw new Error("The remote backend does not respond to the frontend conf, but `useBackendConf` conf is enabled");
      conf = __spreadValues(__spreadValues({}, conf), handleConfFormServer(data.frontend_conf));
    }
    ctx.conf.remoteConfModifier && ctx.conf.remoteConfModifier(conf);
    ctx.updateConf(conf);
  }).catch((err) => {
    var _a;
    ctx.updateConf({});
    let sidebarOpenView = "";
    if ((_a = err.data) == null ? void 0 : _a.err_no_site) {
      const viewLoadParam = { create_name: ctx.conf.site, create_urls: `${window.location.protocol}//${window.location.host}` };
      sidebarOpenView = `sites|${JSON.stringify(viewLoadParam)}`;
    }
    showErrorDialog({
      $err: ctx.get("list").$el,
      errMsg: err.msg || String(err),
      errData: err.data,
      retryFn: () => loadConf(ctx),
      onOpenSidebar: () => ctx.showSidebar({
        view: sidebarOpenView
      })
    });
    throw err;
  }).then(() => {
    if (ctx.conf.remoteConfModifier)
      return;
    ctx.fetch({ offset: 0 });
  }).catch(() => {
  });
}
const Markdown = (ctx) => {
  initMarked();
  ctx.on("conf-loaded", (conf) => {
    if (conf.markedReplacers)
      setReplacers(conf.markedReplacers);
  });
};
const LocalStorageKey = "ArtalkContent";
class LocalStorage extends EditorPlug {
  constructor(kit) {
    super(kit);
    const onContentUpdated = () => {
      this.save();
    };
    this.kit.useMounted(() => {
      const localContent = window.localStorage.getItem(LocalStorageKey) || "";
      if (localContent.trim() !== "") {
        this.kit.useEditor().showNotify(t("restoredMsg"), "i");
        this.kit.useEditor().setContent(localContent);
      }
      this.kit.useEvents().on("content-updated", onContentUpdated);
    });
    this.kit.useUnmounted(() => {
      this.kit.useEvents().off("content-updated", onContentUpdated);
    });
  }
  // Save editor content to localStorage
  save() {
    window.localStorage.setItem(LocalStorageKey, this.kit.useEditor().getContentRaw().trim());
  }
}
class Textarea extends EditorPlug {
  constructor(kit) {
    super(kit);
    const onKeydown = (e) => this.onKeydown(e);
    const onInput = () => this.onInput();
    this.kit.useMounted(() => {
      this.kit.useUI().$textarea.placeholder = this.kit.useConf().placeholder || t("placeholder");
      this.kit.useUI().$textarea.addEventListener("keydown", onKeydown);
      this.kit.useUI().$textarea.addEventListener("input", onInput);
    });
    this.kit.useUnmounted(() => {
      this.kit.useUI().$textarea.removeEventListener("keydown", onKeydown);
      this.kit.useUI().$textarea.removeEventListener("input", onInput);
    });
    this.kit.useEvents().on("content-updated", () => {
      window.setTimeout(() => {
        this.adaptiveHeightByContent();
      }, 80);
    });
  }
  // 按下 Tab 输入内容，而不是失去焦距
  onKeydown(e) {
    const keyCode = e.keyCode || e.which;
    if (keyCode === 9) {
      e.preventDefault();
      this.kit.useEditor().insertContent("	");
    }
  }
  onInput() {
    this.kit.useEvents().trigger("content-updated", this.kit.useEditor().getContentRaw());
  }
  // Resize the textarea height by content
  adaptiveHeightByContent() {
    const diff = this.kit.useUI().$textarea.offsetHeight - this.kit.useUI().$textarea.clientHeight;
    this.kit.useUI().$textarea.style.height = "0px";
    this.kit.useUI().$textarea.style.height = `${this.kit.useUI().$textarea.scrollHeight + diff}px`;
  }
}
class SubmitBtn extends EditorPlug {
  constructor(kit) {
    super(kit);
    const onClick = () => {
      this.kit.useEditor().submit();
    };
    this.kit.useMounted(() => {
      this.kit.useUI().$submitBtn.innerText = this.kit.useConf().sendBtn || t("send");
      this.kit.useUI().$submitBtn.addEventListener("click", onClick);
    });
    this.kit.useUnmounted(() => {
      this.kit.useUI().$submitBtn.removeEventListener("click", onClick);
    });
  }
}
class SubmitAddPreset {
  constructor(kit) {
    this.kit = kit;
  }
  reqAdd() {
    return __async(this, null, function* () {
      const nComment = yield this.kit.useApi().comment.add(__spreadValues({}, this.getSubmitAddParams()));
      return nComment;
    });
  }
  getSubmitAddParams() {
    const { nick, email, link } = UserInstance.data;
    const conf = this.kit.useConf();
    return {
      content: this.kit.useEditor().getContentFinal(),
      nick,
      email,
      link,
      rid: 0,
      page_key: conf.pageKey,
      page_title: conf.pageTitle,
      site_name: conf.site
    };
  }
  postSubmitAdd(commentNew) {
    this.kit.useGlobalCtx().getData().insertComment(commentNew);
  }
}
class Submit extends EditorPlug {
  constructor(kit) {
    super(kit);
    __publicField(this, "customs", []);
    __publicField(this, "defaultPreset");
    this.defaultPreset = new SubmitAddPreset(this.kit);
    const onEditorSubmit = () => this.do();
    this.kit.useMounted(() => {
      this.kit.useGlobalCtx().on("editor-submit", onEditorSubmit);
    });
    this.kit.useUnmounted(() => {
      this.kit.useGlobalCtx().off("editor-submit", onEditorSubmit);
    });
  }
  registerCustom(c) {
    this.customs.push(c);
  }
  do() {
    return __async(this, null, function* () {
      if (this.kit.useEditor().getContentFinal().trim() === "") {
        this.kit.useEditor().focus();
        return;
      }
      const custom = this.customs.find((o) => o.activeCond());
      this.kit.useEditor().showLoading();
      try {
        if (custom == null ? void 0 : custom.pre)
          custom.pre();
        let nComment;
        if (custom == null ? void 0 : custom.req)
          nComment = yield custom.req();
        else
          nComment = yield this.defaultPreset.reqAdd();
        if (custom == null ? void 0 : custom.post)
          custom.post(nComment);
        else
          this.defaultPreset.postSubmitAdd(nComment);
      } catch (err) {
        console.error(err);
        this.kit.useEditor().showNotify(`${t("commentFail")}，${err.msg || String(err)}`, "e");
        return;
      } finally {
        this.kit.useEditor().hideLoading();
      }
      this.kit.useEditor().reset();
      this.kit.useGlobalCtx().trigger("editor-submitted");
    });
  }
}
class StateReply extends EditorPlug {
  constructor(kit) {
    super(kit);
    __publicField(this, "comment");
    this.useEditorStateEffect("reply", (commentData) => {
      this.setReply(commentData);
      return () => {
        this.cancelReply();
      };
    });
    this.kit.useEvents().on("mounted", () => {
      const submitPlug = this.kit.useDeps(Submit);
      if (!submitPlug)
        throw Error("SubmitPlug not initialized");
      const defaultPreset = new SubmitAddPreset(this.kit);
      submitPlug.registerCustom({
        activeCond: () => !!this.comment,
        // active this custom submit when reply mode
        req: () => __async(this, null, function* () {
          if (!this.comment)
            throw new Error("reply comment cannot be empty");
          const nComment = yield this.kit.useApi().comment.add(__spreadProps(__spreadValues({}, defaultPreset.getSubmitAddParams()), {
            rid: this.comment.id,
            page_key: this.comment.page_key,
            page_title: void 0,
            site_name: this.comment.site_name
          }));
          return nComment;
        }),
        post: (nComment) => {
          const conf = this.kit.useConf();
          if (nComment.page_key !== conf.pageKey) {
            window.open(`${nComment.page_url}#atk-comment-${nComment.id}`);
          }
          defaultPreset.postSubmitAdd(nComment);
        }
      });
    });
  }
  setReply(commentData) {
    const ui = this.kit.useUI();
    if (!ui.$sendReply) {
      ui.$sendReply = createElement(
        `<div class="atk-send-reply">${t("reply")} <span class="atk-text"></span><span class="atk-cancel">×</span></div>`
      );
      ui.$sendReply.querySelector(".atk-text").innerText = `@${commentData.nick}`;
      ui.$sendReply.addEventListener("click", () => {
        this.kit.useEditor().resetState();
      });
      ui.$textareaWrap.append(ui.$sendReply);
    }
    this.comment = commentData;
    ui.$textarea.focus();
  }
  cancelReply() {
    if (!this.comment)
      return;
    const ui = this.kit.useUI();
    if (ui.$sendReply) {
      ui.$sendReply.remove();
      ui.$sendReply = void 0;
    }
    this.comment = void 0;
  }
}
class StateEdit extends EditorPlug {
  constructor(kit) {
    super(kit);
    __publicField(this, "comment");
    // -------------------------------------------------------------------
    //  Submit Btn Text Modifier
    // -------------------------------------------------------------------
    __publicField(this, "originalSubmitBtnText", "Send");
    this.useEditorStateEffect("edit", (comment) => {
      this.edit(comment);
      return () => {
        this.cancelEdit();
      };
    });
    this.kit.useMounted(() => {
      const submitPlug = this.kit.useDeps(Submit);
      if (!submitPlug)
        throw Error("SubmitPlug not initialized");
      submitPlug.registerCustom({
        activeCond: () => !!this.comment,
        // active this custom submit when edit mode
        req: () => __async(this, null, function* () {
          const saveData = {
            content: this.kit.useEditor().getContentFinal(),
            nick: this.kit.useUI().$nick.value,
            email: this.kit.useUI().$email.value,
            link: this.kit.useUI().$link.value
          };
          const nComment = yield this.kit.useApi().comment.commentEdit(__spreadValues(__spreadValues({}, this.comment), saveData));
          return nComment;
        }),
        post: (nComment) => {
          this.kit.useGlobalCtx().getData().updateComment(nComment);
        }
      });
    });
  }
  edit(comment) {
    const ui = this.kit.useUI();
    if (!ui.$editCancelBtn) {
      const $btn = createElement(
        `<div class="atk-send-reply">${t("editCancel")} <span class="atk-cancel">×</span></div>`
      );
      $btn.onclick = () => {
        this.kit.useEditor().resetState();
      };
      ui.$textareaWrap.append($btn);
      ui.$editCancelBtn = $btn;
    }
    this.comment = comment;
    ui.$header.style.display = "none";
    ui.$nick.value = comment.nick || "";
    ui.$email.value = comment.email || "";
    ui.$link.value = comment.link || "";
    this.kit.useEditor().setContent(comment.content);
    ui.$textarea.focus();
    this.updateSubmitBtnText(t("save"));
  }
  cancelEdit() {
    if (!this.comment)
      return;
    const ui = this.kit.useUI();
    if (ui.$editCancelBtn) {
      ui.$editCancelBtn.remove();
      ui.$editCancelBtn = void 0;
    }
    this.comment = void 0;
    const { nick, email, link } = UserInstance.data;
    ui.$nick.value = nick;
    ui.$email.value = email;
    ui.$link.value = link;
    this.kit.useEditor().setContent("");
    this.restoreSubmitBtnText();
    ui.$header.style.display = "";
  }
  updateSubmitBtnText(text) {
    this.originalSubmitBtnText = this.kit.useUI().$submitBtn.innerText;
    this.kit.useUI().$submitBtn.innerText = text;
  }
  restoreSubmitBtnText() {
    this.kit.useUI().$submitBtn.innerText = this.originalSubmitBtnText;
  }
}
class Closable extends EditorPlug {
  constructor(kit) {
    super(kit);
    const onOpen = () => this.open();
    const onClose = () => this.close();
    this.kit.useMounted(() => {
      this.kit.useEvents().on("editor-open", onOpen);
      this.kit.useEvents().on("editor-close", onClose);
    });
    this.kit.useUnmounted(() => {
      this.kit.useEvents().off("editor-open", onOpen);
      this.kit.useEvents().off("editor-close", onClose);
    });
  }
  open() {
    var _a;
    (_a = this.kit.useUI().$textareaWrap.querySelector(".atk-comment-closed")) == null ? void 0 : _a.remove();
    this.kit.useUI().$textarea.style.display = "";
    this.kit.useUI().$bottom.style.display = "";
  }
  close() {
    if (!this.kit.useUI().$textareaWrap.querySelector(".atk-comment-closed"))
      this.kit.useUI().$textareaWrap.prepend(createElement(`<div class="atk-comment-closed">${t("onlyAdminCanReply")}</div>`));
    if (!UserInstance.data.isAdmin) {
      this.kit.useUI().$textarea.style.display = "none";
      this.kit.useEvents().trigger("panel-close");
      this.kit.useUI().$bottom.style.display = "none";
    } else {
      this.kit.useUI().$textarea.style.display = "";
      this.kit.useUI().$bottom.style.display = "";
    }
  }
}
class HeaderEvent extends EditorPlug {
  get $inputs() {
    return this.kit.useEditor().getHeaderInputEls();
  }
  constructor(kit) {
    super(kit);
    const inputEventFns = {};
    const changeEventFns = {};
    const trigger = (evt, $input, field) => () => {
      this.kit.useEvents().trigger(evt, { field, $input });
    };
    this.kit.useMounted(() => {
      Object.entries(this.$inputs).forEach(([key, $input]) => {
        $input.addEventListener("input", inputEventFns[key] = trigger("header-input", $input, key));
        $input.addEventListener("change", changeEventFns[key] = trigger("header-change", $input, key));
      });
    });
    this.kit.useUnmounted(() => {
      Object.entries(this.$inputs).forEach(([key, $input]) => {
        $input.removeEventListener("input", inputEventFns[key]);
        $input.removeEventListener("change", changeEventFns[key]);
      });
    });
  }
}
class HeaderUser extends EditorPlug {
  constructor(kit) {
    super(kit);
    __publicField(this, "query", {
      timer: null,
      abortFn: null
    });
    const onInput = ({ $input, field }) => {
      if (this.kit.useEditor().getState() === "edit")
        return;
      UserInstance.update({ [field]: $input.value.trim() });
      if (field === "nick" || field === "email")
        this.fetchUserInfo();
    };
    this.kit.useMounted(() => {
      Object.entries(this.kit.useEditor().getHeaderInputEls()).forEach(([key, $input]) => {
        $input.placeholder = `${t(key)}`;
        $input.value = UserInstance.data[key] || "";
      });
      this.kit.useEvents().on("header-input", onInput);
    });
    this.kit.useUnmounted(() => {
      this.kit.useEvents().off("header-input", onInput);
    });
  }
  /**
   * Fetch user info from server
   */
  fetchUserInfo() {
    UserInstance.logout();
    if (this.query.timer)
      window.clearTimeout(this.query.timer);
    if (this.query.abortFn)
      this.query.abortFn();
    this.query.timer = window.setTimeout(() => {
      this.query.timer = null;
      const { req, abort } = this.kit.useApi().user.userGet(
        UserInstance.data.nick,
        UserInstance.data.email
      );
      this.query.abortFn = abort;
      req.then((data) => this.onUserInfoFetched(data)).catch((err) => {
      }).finally(() => {
        this.query.abortFn = null;
      });
    }, 400);
  }
  /**
   * Function called when user info fetched
   *
   * @param data The response data from server
   */
  onUserInfoFetched(data) {
    var _a;
    if (!data.is_login)
      UserInstance.logout();
    this.kit.useGlobalCtx().getData().updateUnreads(data.unread);
    if (UserInstance.checkHasBasicUserInfo() && !data.is_login && ((_a = data.user) == null ? void 0 : _a.is_admin)) {
      this.kit.useGlobalCtx().checkAdmin({
        onSuccess: () => {
        }
      });
    }
    if (data.user && data.user.link) {
      this.kit.useUI().$link.value = data.user.link;
      UserInstance.update({ link: data.user.link });
    }
  }
}
class HeaderLink extends EditorPlug {
  constructor(kit) {
    super(kit);
    const onLinkChange = ({ field }) => {
      if (field === "link")
        this.onLinkInputChange();
    };
    this.kit.useMounted(() => {
      this.kit.useEvents().on("header-change", onLinkChange);
    });
    this.kit.useUnmounted(() => {
      this.kit.useEvents().off("header-change", onLinkChange);
    });
  }
  onLinkInputChange() {
    const link = this.kit.useUI().$link.value.trim();
    if (!!link && !/^(http|https):\/\//.test(link)) {
      this.kit.useUI().$link.value = `https://${link}`;
      UserInstance.update({ link: this.kit.useUI().$link.value });
    }
  }
}
const emoticons = "";
class Emoticons extends EditorPlug {
  constructor(kit) {
    super(kit);
    __publicField(this, "emoticons", []);
    __publicField(this, "loadingTask", null);
    __publicField(this, "$grpWrap");
    __publicField(this, "$grpSwitcher");
    __publicField(this, "isListLoaded", false);
    __publicField(this, "isImgLoaded", false);
    this.kit.useMounted(() => {
      this.usePanel(`<div class="atk-editor-plug-emoticons"></div>`);
      this.useBtn(t("emoticon"));
    });
    this.kit.useUnmounted(() => {
    });
    this.useContentTransformer((raw) => this.transEmoticonImageText(raw));
    this.usePanelShow(() => {
      (() => __async(this, null, function* () {
        yield this.loadEmoticonsData();
        if (!this.isImgLoaded) {
          this.initEmoticonsList();
          this.isImgLoaded = true;
        }
        setTimeout(() => {
          this.changeListHeight();
        }, 30);
      }))();
    });
    this.usePanelHide(() => {
      this.$panel.parentElement.style.height = "";
    });
    window.setTimeout(() => {
      this.loadEmoticonsData();
    }, 1e3);
  }
  loadEmoticonsData() {
    return __async(this, null, function* () {
      if (this.isListLoaded)
        return;
      if (this.loadingTask !== null) {
        yield this.loadingTask;
        return;
      }
      this.loadingTask = (() => __async(this, null, function* () {
        showLoading(this.$panel);
        this.emoticons = yield this.handleData(this.kit.useConf().emoticons);
        hideLoading(this.$panel);
        this.loadingTask = null;
        this.isListLoaded = true;
      }))();
      yield this.loadingTask;
    });
  }
  handleData(data) {
    return __async(this, null, function* () {
      if (!Array.isArray(data) && ["object", "string"].includes(typeof data)) {
        data = [data];
      }
      if (!Array.isArray(data)) {
        setError(this.$panel, "表情包数据必须为 Array/Object/String 类型");
        hideLoading(this.$panel);
        return [];
      }
      const pushGrp = (grp) => {
        if (typeof grp !== "object")
          return;
        if (grp.name && data.find((o) => o.name === grp.name))
          return;
        data.push(grp);
      };
      const remoteLoad = (d) => __async(this, null, function* () {
        yield Promise.all(d.map((grp, index2) => __async(this, null, function* () {
          if (typeof grp === "object" && !Array.isArray(grp)) {
            pushGrp(grp);
          } else if (Array.isArray(grp)) {
            yield remoteLoad(grp);
          } else if (typeof grp === "string") {
            const grpData = yield this.remoteLoad(grp);
            if (Array.isArray(grpData))
              yield remoteLoad(grpData);
            else if (typeof grpData === "object")
              pushGrp(grpData);
          }
        })));
      });
      yield remoteLoad(data);
      data.forEach((item) => {
        if (this.isOwOFormat(item)) {
          const c = this.convertOwO(item);
          c.forEach((grp) => {
            pushGrp(grp);
          });
        } else if (Array.isArray(item)) {
          item.forEach((grp) => {
            pushGrp(grp);
          });
        }
      });
      data = data.filter((item) => typeof item === "object" && !Array.isArray(item) && !!item && !!item.name);
      this.solveNullKey(data);
      this.solveSameKey(data);
      return data;
    });
  }
  /** 远程加载 */
  remoteLoad(url) {
    return __async(this, null, function* () {
      if (!url)
        return [];
      try {
        const resp = yield fetch(url);
        const json = yield resp.json();
        return json;
      } catch (err) {
        hideLoading(this.$panel);
        setError(this.$panel, `表情加载失败 ${String(err)}`);
        return [];
      }
    });
  }
  /** 避免表情 item.key 为 null 的情况 */
  solveNullKey(data) {
    data.forEach((grp) => {
      grp.items.forEach((item, index2) => {
        if (!item.key)
          item.key = `${grp.name} ${index2 + 1}`;
      });
    });
  }
  /** 避免相同 item.key */
  solveSameKey(data) {
    const tmp = {};
    data.forEach((grp) => {
      grp.items.forEach((item) => {
        if (!item.key || String(item.key).trim() === "")
          return;
        if (!tmp[item.key])
          tmp[item.key] = 1;
        else
          tmp[item.key]++;
        if (tmp[item.key] > 1)
          item.key = `${item.key} ${tmp[item.key]}`;
      });
    });
  }
  /** 判断是否为 OwO 格式 */
  isOwOFormat(data) {
    try {
      return typeof data === "object" && !!Object.values(data).length && Array.isArray(Object.keys(Object.values(data)[0].container)) && Object.keys(Object.values(data)[0].container[0]).includes("icon");
    } catch (e) {
      return false;
    }
  }
  /** 转换 OwO 格式数据 */
  convertOwO(owoData) {
    const dest = [];
    Object.entries(owoData).forEach(([grpName, grp]) => {
      const nGrp = { name: grpName, type: grp.type, items: [] };
      grp.container.forEach((item, index2) => {
        const iconStr = item.icon;
        if (/<(img|IMG)/.test(iconStr)) {
          const find = /src=["'](.*?)["']/.exec(iconStr);
          if (find && find.length > 1)
            item.icon = find[1];
        }
        nGrp.items.push({ key: item.text || `${grpName} ${index2 + 1}`, val: item.icon });
      });
      dest.push(nGrp);
    });
    return dest;
  }
  /** 初始化表情列表界面 */
  initEmoticonsList() {
    this.$grpWrap = createElement(`<div class="atk-grp-wrap"></div>`);
    this.$panel.append(this.$grpWrap);
    this.emoticons.forEach((grp, index2) => {
      const $grp = createElement(`<div class="atk-grp" style="display: none;"></div>`);
      this.$grpWrap.append($grp);
      $grp.setAttribute("data-index", String(index2));
      $grp.setAttribute("data-grp-name", grp.name);
      $grp.setAttribute("data-type", grp.type);
      grp.items.forEach((item) => {
        const $item = createElement(`<span class="atk-item"></span>`);
        $grp.append($item);
        if (!!item.key && !new RegExp(`^(${grp.name})?\\s?[0-9]+$`).test(item.key))
          $item.setAttribute("title", item.key);
        if (grp.type === "image") {
          const imgEl = document.createElement("img");
          imgEl.src = item.val;
          imgEl.alt = item.key;
          $item.append(imgEl);
        } else {
          $item.innerText = item.val;
        }
        $item.onclick = () => {
          if (grp.type === "image") {
            this.kit.useEditor().insertContent(`:[${item.key}]`);
          } else {
            this.kit.useEditor().insertContent(item.val || "");
          }
        };
      });
    });
    if (this.emoticons.length > 1) {
      this.$grpSwitcher = createElement(`<div class="atk-grp-switcher"></div>`);
      this.$panel.append(this.$grpSwitcher);
      this.emoticons.forEach((grp, index2) => {
        const $item = createElement("<span />");
        $item.innerText = grp.name;
        $item.setAttribute("data-index", String(index2));
        $item.onclick = () => this.openGrp(index2);
        this.$grpSwitcher.append($item);
      });
    }
    if (this.emoticons.length > 0)
      this.openGrp(0);
  }
  /** 打开一个表情组 */
  openGrp(index2) {
    var _a, _b, _c;
    Array.from(this.$grpWrap.children).forEach((item) => {
      const el = item;
      if (el.getAttribute("data-index") !== String(index2)) {
        el.style.display = "none";
      } else {
        el.style.display = "";
      }
    });
    (_a = this.$grpSwitcher) == null ? void 0 : _a.querySelectorAll("span.active").forEach((item) => item.classList.remove("active"));
    (_c = (_b = this.$grpSwitcher) == null ? void 0 : _b.querySelector(`span[data-index="${index2}"]`)) == null ? void 0 : _c.classList.add("active");
    this.changeListHeight();
  }
  changeListHeight() {
  }
  /** 处理评论 content 中的表情内容 */
  transEmoticonImageText(text) {
    if (!this.emoticons || !Array.isArray(this.emoticons))
      return text;
    this.emoticons.forEach((grp) => {
      if (grp.type !== "image")
        return;
      Object.entries(grp.items).forEach(([index2, item]) => {
        text = text.split(`:[${item.key}]`).join(`<img src="${item.val}" atk-emoticon="${item.key}">`);
      });
    });
    return text;
  }
}
const AllowImgExts = ["png", "jpg", "jpeg", "gif", "bmp", "svg", "webp"];
class Upload extends EditorPlug {
  constructor(kit) {
    super(kit);
    __publicField(this, "$imgUploadInput");
    this.kit.useMounted(() => this.init());
    this.initDragImg();
  }
  init() {
    this.$imgUploadInput = document.createElement("input");
    this.$imgUploadInput.type = "file";
    this.$imgUploadInput.style.display = "none";
    this.$imgUploadInput.accept = AllowImgExts.map((o) => `.${o}`).join(",");
    const $btn = this.useBtn(`${t("image")}`);
    $btn.after(this.$imgUploadInput);
    $btn.onclick = () => {
      const $input = this.$imgUploadInput;
      $input.onchange = () => {
        (() => __async(this, null, function* () {
          if (!$input.files || $input.files.length === 0)
            return;
          const file = $input.files[0];
          this.uploadImg(file);
        }))();
      };
      $input.click();
    };
    if (!this.kit.useConf().imgUpload) {
      this.$btn.setAttribute("atk-only-admin-show", "");
    }
  }
  initDragImg() {
    const uploadFromFileList = (files) => {
      if (!files)
        return;
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        this.uploadImg(file);
      }
    };
    const onDragover = (evt) => {
      evt.stopPropagation();
      evt.preventDefault();
    };
    const onDrop = (evt) => {
      var _a;
      const files = (_a = evt.dataTransfer) == null ? void 0 : _a.files;
      if (files == null ? void 0 : files.length) {
        evt.preventDefault();
        uploadFromFileList(files);
      }
    };
    const onPaste = (evt) => {
      var _a;
      const files = (_a = evt.clipboardData) == null ? void 0 : _a.files;
      if (files == null ? void 0 : files.length) {
        evt.preventDefault();
        uploadFromFileList(files);
      }
    };
    this.kit.useMounted(() => {
      this.kit.useUI().$textarea.addEventListener("dragover", onDragover);
      this.kit.useUI().$textarea.addEventListener("drop", onDrop);
      this.kit.useUI().$textarea.addEventListener("paste", onPaste);
    });
    this.kit.useUnmounted(() => {
      this.kit.useUI().$textarea.removeEventListener("dragover", onDragover);
      this.kit.useUI().$textarea.removeEventListener("drop", onDrop);
      this.kit.useUI().$textarea.removeEventListener("paste", onPaste);
    });
  }
  uploadImg(file) {
    return __async(this, null, function* () {
      const fileExt = /[^.]+$/.exec(file.name);
      if (!fileExt || !AllowImgExts.includes(fileExt[0]))
        return;
      if (!UserInstance.checkHasBasicUserInfo()) {
        this.kit.useEditor().showNotify(t("uploadLoginMsg"), "w");
        return;
      }
      let insertPrefix = "\n";
      if (this.kit.useUI().$textarea.value.trim() === "")
        insertPrefix = "";
      const uploadPlaceholderTxt = `${insertPrefix}![](Uploading ${file.name}...)`;
      this.kit.useEditor().insertContent(uploadPlaceholderTxt);
      let resp;
      try {
        const customUploaderFn = this.kit.useConf().imgUploader;
        if (!customUploaderFn) {
          resp = yield this.kit.useApi().upload.imgUpload(file);
        } else {
          resp = { img_url: yield customUploaderFn(file) };
        }
      } catch (err) {
        console.error(err);
        this.kit.useEditor().showNotify(`${t("uploadFail")}，${err.msg}`, "e");
      }
      if (!!resp && resp.img_url) {
        let imgURL = resp.img_url;
        if (!isValidURL(imgURL))
          imgURL = getURLBasedOnApi({
            base: this.kit.useConf().server,
            path: imgURL
          });
        this.kit.useEditor().setContent(this.kit.useUI().$textarea.value.replace(uploadPlaceholderTxt, `${insertPrefix}![](${imgURL})`));
      } else {
        this.kit.useEditor().setContent(this.kit.useUI().$textarea.value.replace(uploadPlaceholderTxt, ""));
      }
    });
  }
}
const preview = "";
class Preview extends EditorPlug {
  constructor(kit) {
    super(kit);
    __publicField(this, "isPlugPanelShow", false);
    this.kit.useMounted(() => {
      this.usePanel(`<div class="atk-editor-plug-preview"></div>`);
      let btnText = t("preview");
      if (getInstance())
        btnText += ` <i title="Markdown is supported"><svg class="markdown" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M14.85 3H1.15C.52 3 0 3.52 0 4.15v7.69C0 12.48.52 13 1.15 13h13.69c.64 0 1.15-.52 1.15-1.15v-7.7C16 3.52 15.48 3 14.85 3zM9 11H7V8L5.5 9.92 4 8v3H2V5h2l1.5 2L7 5h2v6zm2.99.5L9.5 8H11V5h2v3h1.5l-2.51 3.5z"></path></svg></i>`;
      this.useBtn(btnText);
    });
    this.kit.useUnmounted(() => {
    });
    this.kit.useEvents().on("content-updated", (content) => {
      this.isPlugPanelShow && this.updateContent();
    });
    this.usePanelShow(() => {
      this.isPlugPanelShow = true;
      this.updateContent();
    });
    this.usePanelHide(() => {
      this.isPlugPanelShow = false;
    });
  }
  updateContent() {
    this.$panel.innerHTML = this.kit.useEditor().getContentMarked();
  }
}
const ENABLED_PLUGS = [
  // Core
  LocalStorage,
  HeaderEvent,
  HeaderUser,
  HeaderLink,
  Textarea,
  Submit,
  SubmitBtn,
  Mover,
  StateReply,
  StateEdit,
  Closable,
  // Extensions
  Emoticons,
  Upload,
  Preview
];
function getDisabledPlugByConf(conf) {
  return [
    { k: Upload, v: conf.imgUpload },
    { k: Emoticons, v: conf.emoticons },
    { k: Preview, v: conf.preview },
    { k: Mover, v: conf.editorTravel }
  ].filter((n) => !n.v).flatMap((n) => n.k);
}
class PlugKit {
  constructor(plugs) {
    this.plugs = plugs;
  }
  /** Use the editor */
  useEditor() {
    return this.plugs.editor;
  }
  /** Use the context of global */
  useGlobalCtx() {
    return this.plugs.editor.ctx;
  }
  /** Use the config of Artalk */
  useConf() {
    return this.plugs.editor.ctx.conf;
  }
  /** Use the http api client */
  useApi() {
    return this.plugs.editor.ctx.getApi();
  }
  /** Use the ui of editor */
  useUI() {
    return this.plugs.editor.getUI();
  }
  /** Use the events in editor scope */
  useEvents() {
    return this.plugs.getEvents();
  }
  /** Listen the event when plug is mounted */
  useMounted(func) {
    this.useEvents().on("mounted", func);
  }
  /** Listen the event when plug is unmounted */
  useUnmounted(func) {
    this.useEvents().on("unmounted", func);
  }
  /** Use the deps of other plug */
  useDeps(plug) {
    return this.plugs.get(plug);
  }
}
const EditorKit = (ctx) => {
  const editor = ctx.get("editor");
  const editorPlugs = new PlugManager(editor);
  ctx.inject("editorPlugs", editorPlugs);
};
class PlugManager {
  constructor(editor) {
    __publicField(this, "plugs", []);
    __publicField(this, "openedPlug", null);
    __publicField(this, "events", new EventManager());
    this.editor = editor;
    let confLoaded = false;
    this.editor.ctx.on("conf-loaded", () => {
      confLoaded && this.getEvents().trigger("unmounted");
      this.clear();
      const DISABLED = getDisabledPlugByConf(this.editor.ctx.conf);
      ENABLED_PLUGS.filter((p) => !DISABLED.includes(p)).forEach((Plug) => {
        const kit = new PlugKit(this);
        this.plugs.push(new Plug(kit));
      });
      this.getEvents().trigger("mounted");
      confLoaded = true;
      this.loadPluginUI();
    });
    this.events.on("panel-close", () => this.closePlugPanel());
  }
  getPlugs() {
    return this.plugs;
  }
  getEvents() {
    return this.events;
  }
  clear() {
    this.plugs = [];
    this.events = new EventManager();
    if (this.openedPlug)
      this.closePlugPanel();
  }
  loadPluginUI() {
    this.editor.getUI().$plugPanelWrap.innerHTML = "";
    this.editor.getUI().$plugPanelWrap.style.display = "none";
    this.editor.getUI().$plugBtnWrap.innerHTML = "";
    this.plugs.forEach((plug) => this.loadPluginItem(plug));
  }
  /** Load the plug btn and plug panel on editor ui */
  loadPluginItem(plug) {
    const $btn = plug.$btn;
    if (!$btn)
      return;
    this.editor.getUI().$plugBtnWrap.appendChild($btn);
    !$btn.onclick && ($btn.onclick = () => {
      this.editor.getUI().$plugBtnWrap.querySelectorAll(".active").forEach((item) => item.classList.remove("active"));
      if (plug !== this.openedPlug) {
        this.openPlugPanel(plug);
        $btn.classList.add("active");
      } else {
        this.closePlugPanel();
      }
    });
    const $panel = plug.$panel;
    if ($panel) {
      $panel.style.display = "none";
      this.editor.getUI().$plugPanelWrap.appendChild($panel);
    }
  }
  get(plug) {
    return this.plugs.find((p) => p instanceof plug);
  }
  /** Open the editor plug panel */
  openPlugPanel(plug) {
    this.plugs.forEach((aPlug) => {
      const plugPanel = aPlug.$panel;
      if (!plugPanel)
        return;
      if (aPlug === plug) {
        plugPanel.style.display = "";
        this.events.trigger("panel-show", plug);
      } else {
        plugPanel.style.display = "none";
        this.events.trigger("panel-hide", plug);
      }
    });
    this.editor.getUI().$plugPanelWrap.style.display = "";
    this.openedPlug = plug;
  }
  /** Close the editor plug panel */
  closePlugPanel() {
    if (!this.openedPlug)
      return;
    this.editor.getUI().$plugPanelWrap.style.display = "none";
    this.events.trigger("panel-hide", this.openedPlug);
    this.openedPlug = null;
  }
  /** Get the content which is transformed by plugs */
  getTransformedContent(rawContent) {
    let result = rawContent;
    this.plugs.forEach((aPlug) => {
      if (!aPlug.contentTransformer)
        return;
      result = aPlug.contentTransformer(result);
    });
    return result;
  }
}
const WithEditor = (ctx) => {
  let $closeCommentBtn;
  ctx.on("inited", () => {
    const list = ctx.get("list");
    $closeCommentBtn = list.$el.querySelector('[data-action="admin-close-comment"]');
    $closeCommentBtn.addEventListener("click", () => {
      const page = ctx.getData().getPage();
      if (!page)
        throw new Error("Page data not found");
      page.admin_only = !page.admin_only;
      adminPageEditSave(ctx, page);
    });
  });
  ctx.on("page-loaded", (page) => {
    var _a, _b;
    const editor = ctx.get("editor");
    if ((page == null ? void 0 : page.admin_only) === true) {
      (_a = editor.getPlugs()) == null ? void 0 : _a.getEvents().trigger("editor-close");
      $closeCommentBtn && ($closeCommentBtn.innerText = t("openComment"));
    } else {
      (_b = editor.getPlugs()) == null ? void 0 : _b.getEvents().trigger("editor-open");
      $closeCommentBtn && ($closeCommentBtn.innerText = t("closeComment"));
    }
  });
  ctx.on("list-loaded", (comments) => {
    ctx.editorResetState();
  });
};
function adminPageEditSave(ctx, page) {
  ctx.editorShowLoading();
  ctx.getApi().page.pageEdit(page).then((respPage) => {
    ctx.getData().updatePage(respPage);
  }).catch((err) => {
    ctx.editorShowNotify(`${t("editFail")}: ${err.msg || String(err)}`, "e");
  }).finally(() => {
    ctx.editorHideLoading();
  });
}
const Unread = (ctx) => {
  ctx.on("comment-rendered", (comment) => {
    if (ctx.conf.listUnreadHighlight === true) {
      const unreads = ctx.getData().getUnreads();
      const notify = unreads.find((o) => o.comment_id === comment.getID());
      if (notify) {
        comment.getRender().setUnread(true);
        comment.getRender().setOpenAction(() => {
          window.open(notify.read_link);
          ctx.getData().updateUnreads(unreads.filter((o) => o.comment_id !== comment.getID()));
        });
      } else {
        comment.getRender().setUnread(false);
      }
    }
  });
  ctx.on("list-goto", (commentID) => {
    const notifyKey = getQueryParam("atk_notify_key");
    if (notifyKey) {
      ctx.getApi().user.markRead(commentID, notifyKey).then(() => {
        ctx.getData().updateUnreads(ctx.getData().getUnreads().filter((o) => o.comment_id !== commentID));
      });
    }
  });
};
const Count = (ctx) => {
  const refreshCountNumEl = () => {
    var _a, _b;
    const list = ctx.get("list");
    const $count = list.$el.querySelector(".atk-comment-count .atk-text");
    if (!$count)
      return;
    const text = htmlEncode(t("counter", { count: `${Number((_b = (_a = ctx.getData().getListLastFetch()) == null ? void 0 : _a.data) == null ? void 0 : _b.total) || 0}` }));
    $count.innerHTML = text.replace(/(\d+)/, '<span class="atk-comment-count-num">$1</span>');
  };
  ctx.on("list-loaded", () => {
    refreshCountNumEl();
  });
  ctx.on("comment-inserted", () => {
    const last = ctx.getData().getListLastFetch();
    if (last == null ? void 0 : last.data)
      last.data.total += 1;
  });
  ctx.on("comment-deleted", () => {
    const last = ctx.getData().getListLastFetch();
    if (last == null ? void 0 : last.data)
      last.data.total -= 1;
  });
};
const SidebarBtn = (ctx) => {
  let $openSidebarBtn = null;
  const syncByUser = () => {
    if (!$openSidebarBtn)
      return;
    const user = ctx.get("user").data;
    if (!!user.nick && !!user.email) {
      $openSidebarBtn.classList.remove("atk-hide");
      const $btnText = $openSidebarBtn.querySelector(".atk-text");
      if ($btnText)
        $btnText.innerText = !user.isAdmin ? t("msgCenter") : t("ctrlCenter");
    } else {
      $openSidebarBtn.classList.add("atk-hide");
    }
  };
  ctx.on("conf-loaded", () => {
    const list = ctx.get("list");
    $openSidebarBtn = list.$el.querySelector('[data-action="open-sidebar"]');
    if (!$openSidebarBtn)
      return;
    $openSidebarBtn.onclick = () => {
      ctx.showSidebar();
    };
    syncByUser();
  });
  ctx.on("user-changed", (user) => {
    syncByUser();
  });
};
const UnreadBadge = (ctx) => {
  let $unreadBadge = null;
  const showUnreadBadge = (count) => {
    if (!$unreadBadge)
      return;
    if (count > 0) {
      $unreadBadge.innerText = `${Number(count || 0)}`;
      $unreadBadge.style.display = "block";
    } else {
      $unreadBadge.style.display = "none";
    }
  };
  ctx.on("conf-loaded", () => {
    const list = ctx.get("list");
    $unreadBadge = list.$el.querySelector(".atk-unread-badge");
  });
  ctx.on("unreads-updated", (unreads) => {
    showUnreadBadge(unreads.length || 0);
  });
};
const Goto = (ctx) => {
  let delayGoto = true;
  const check2 = () => {
    const commentID = extractCommentID();
    if (!commentID)
      return;
    ctx.trigger("list-goto", commentID);
    delayGoto = true;
  };
  const hashChangeHandler = () => {
    delayGoto = false;
    check2();
  };
  ctx.on("inited", () => {
    window.addEventListener("hashchange", hashChangeHandler);
    ctx.on("list-loaded", check2);
  });
  ctx.on("destroy", () => {
    window.removeEventListener("hashchange", hashChangeHandler);
    ctx.off("list-loaded", check2);
  });
  let foundID = 0;
  ctx.on("list-goto", (commentID) => {
    if (foundID === commentID)
      return;
    const comment = ctx.get("list").getCommentNodes().find((c) => c.getID() === commentID);
    if (!comment)
      return;
    foundID = commentID;
    comment.getParents().forEach((p) => {
      p.getRender().heightLimitRemoveForChildren();
    });
    const goTo = () => {
      scrollIntoView(comment.getEl(), false);
      comment.getEl().classList.remove("atk-flash-once");
      window.setTimeout(() => {
        comment.getEl().classList.add("atk-flash-once");
      }, 150);
    };
    if (!delayGoto)
      goTo();
    else
      window.setTimeout(() => goTo(), 350);
  });
};
function extractCommentID() {
  let commentId = Number(getQueryParam("atk_comment"));
  if (!commentId) {
    const match = window.location.hash.match(/#atk-comment-([0-9]+)/);
    if (!match || !match[1] || Number.isNaN(Number(match[1])))
      return null;
    commentId = Number(match[1]);
  }
  return commentId || null;
}
const version = "2.7.1";
const Copyright = (ctx) => {
  ctx.on("conf-loaded", () => {
    const list = ctx.get("list");
    const $copyright = list.$el.querySelector(".atk-copyright");
    if (!$copyright)
      return;
    $copyright.innerHTML = `Powered By <a href="https://artalk.js.org" target="_blank" title="Artalk v${version}">Artalk</a>`;
  });
};
const NoComment = (ctx) => {
  ctx.on("list-loaded", (comments) => {
    const list = ctx.get("list");
    const isNoComment = comments.length <= 0;
    let $noComment = list.getCommentsWrapEl().querySelector(".atk-list-no-comment");
    if (isNoComment) {
      if (!$noComment) {
        $noComment = createElement('<div class="atk-list-no-comment"></div>');
        $noComment.innerHTML = sanitize(list.ctx.conf.noComment || list.ctx.$t("noComment"));
        list.getCommentsWrapEl().appendChild($noComment);
      }
    } else {
      $noComment == null ? void 0 : $noComment.remove();
    }
  });
};
const Dropdown = (ctx) => {
  const reloadUseParamsEditor = (func) => {
    ctx.conf.listFetchParamsModifier = func;
    ctx.reload();
  };
  const initDropdown = ($dropdownOn) => {
    renderDropdown({
      $dropdownWrap: $dropdownOn,
      dropdownList: [
        [t("sortLatest"), () => {
          reloadUseParamsEditor((p) => {
            p.sort_by = "date_desc";
          });
        }],
        [t("sortBest"), () => {
          reloadUseParamsEditor((p) => {
            p.sort_by = "vote";
          });
        }],
        [t("sortOldest"), () => {
          reloadUseParamsEditor((p) => {
            p.sort_by = "date_asc";
          });
        }],
        [t("sortAuthor"), () => {
          reloadUseParamsEditor((p) => {
            p.view_only_admin = true;
          });
        }]
      ]
    });
  };
  ctx.on("conf-loaded", () => {
    const list = ctx.get("list");
    const $count = list.$el.querySelector(".atk-comment-count");
    if (!$count)
      return;
    if (ctx.conf.listSort) {
      initDropdown($count);
    } else {
      removeDropdown({
        $dropdownWrap: $count
      });
    }
  });
};
function renderDropdown(conf) {
  const { $dropdownWrap, dropdownList } = conf;
  if ($dropdownWrap.querySelector(".atk-dropdown"))
    return;
  $dropdownWrap.classList.add("atk-dropdown-wrap");
  $dropdownWrap.append(createElement(`<span class="atk-arrow-down-icon"></span>`));
  let curtActive = 0;
  const onItemClick = (i, $item, name, action) => {
    action();
    curtActive = i;
    $dropdown.querySelectorAll(".active").forEach((e) => {
      e.classList.remove("active");
    });
    $item.classList.add("active");
    $dropdown.style.display = "none";
    setTimeout(() => {
      $dropdown.style.display = "";
    }, 80);
  };
  const $dropdown = createElement(`<ul class="atk-dropdown atk-fade-in"></ul>`);
  dropdownList.forEach((item, i) => {
    const name = item[0];
    const action = item[1];
    const $item = createElement(`<li class="atk-dropdown-item"><span></span></li>`);
    const $link = $item.querySelector("span");
    $link.innerText = name;
    $link.onclick = () => {
      onItemClick(i, $item, name, action);
    };
    $dropdown.append($item);
    if (i === curtActive)
      $item.classList.add("active");
  });
  $dropdownWrap.append($dropdown);
}
function removeDropdown(conf) {
  var _a, _b;
  const { $dropdownWrap } = conf;
  $dropdownWrap.classList.remove("atk-dropdown-wrap");
  (_a = $dropdownWrap.querySelector(".atk-arrow-down-icon")) == null ? void 0 : _a.remove();
  (_b = $dropdownWrap.querySelector(".atk-dropdown")) == null ? void 0 : _b.remove();
}
const TimeTicking = (ctx) => {
  let timer = null;
  ctx.on("inited", () => {
    timer = window.setInterval(() => {
      const list = ctx.get("list");
      list.$el.querySelectorAll("[data-atk-comment-date]").forEach((el) => {
        const date = el.getAttribute("data-atk-comment-date");
        el.innerText = timeAgo(new Date(Number(date)), ctx.$t);
      });
    }, 30 * 1e3);
  });
  ctx.on("destroy", () => {
    timer && window.clearInterval(timer);
  });
};
const ErrorDialog = (ctx) => {
  ctx.on("list-fetch", () => {
    const list = ctx.get("list");
    setError(list.$el, null);
  });
  ctx.on("list-error", (err) => {
    showErrorDialog({
      $err: ctx.get("list").$el,
      errMsg: err.msg,
      errData: err.data,
      retryFn: () => ctx.fetch({ offset: 0 })
    });
  });
};
const Loading = (ctx) => {
  ctx.on("list-fetch", (p) => {
    const list = ctx.get("list");
    if (p.offset === 0)
      setLoading(true, list.$el);
  });
  ctx.on("list-fetched", () => {
    const list = ctx.get("list");
    setLoading(false, list.$el);
  });
};
const Fetch = (ctx) => {
  ctx.on("list-fetch", (_params) => {
    if (ctx.getData().getLoading())
      return;
    ctx.getData().setLoading(true);
    const params = __spreadValues({
      // default params
      offset: 0,
      limit: ctx.conf.pagination.pageSize,
      flatMode: ctx.conf.flatMode,
      // always be boolean because had been handled in Artalk.init
      paramsModifier: ctx.conf.listFetchParamsModifier
    }, _params);
    ctx.getData().setListLastFetch({
      params
    });
    ctx.getApi().comment.get(params.offset, params.limit, params.flatMode, params.paramsModifier).then((data) => {
      ctx.getData().setListLastFetch({ params, data });
      ctx.getData().loadComments(data.comments);
      ctx.getData().updatePage(data.page);
      ctx.getData().updateUnreads(data.unread || []);
      params.onSuccess && params.onSuccess(data);
      ctx.trigger("list-fetched", { params, data });
    }).catch((e) => {
      const error = {
        msg: e.msg || String(e),
        data: e.data
      };
      params.onError && params.onError(error);
      ctx.trigger("list-error", error);
      ctx.trigger("list-fetched", { params, error });
      throw e;
    }).finally(() => {
      ctx.getData().setLoading(false);
    });
  });
};
const ReachBottom = (ctx) => {
  const scrollEvtAt = document;
  let observer = null;
  const setupObserver = ($target) => {
    observer = new IntersectionObserver(([entries]) => {
      if (entries.isIntersecting) {
        clearObserver();
        ctx.trigger("list-reach-bottom");
      }
    }, {
      root: scrollEvtAt
    });
    observer.observe($target);
  };
  const clearObserver = () => {
    observer == null ? void 0 : observer.disconnect();
    observer = null;
  };
  ctx.on("list-loaded", () => {
    clearObserver();
    const list = ctx.get("list");
    const $target = list.getCommentsWrapEl().querySelector(".atk-comment-wrap:nth-last-child(3)");
    if (!$target)
      return;
    if (!("IntersectionObserver" in window)) {
      console.warn("IntersectionObserver api not supported");
      return;
    }
    setupObserver($target);
  });
  ctx.on("destroy", () => {
    clearObserver();
  });
};
const GotoFirst = (ctx) => {
  const handler = () => {
    const list = ctx.get("list");
    const $relative = ctx.conf.scrollRelativeTo && ctx.conf.scrollRelativeTo();
    ($relative || window).scroll({
      top: getOffset(list.$el, $relative).top,
      left: 0
    });
  };
  ctx.on("inited", () => {
    ctx.on("list-goto-first", handler);
  });
  ctx.on("destroy", () => {
    ctx.off("list-goto-first", handler);
  });
};
const ListPlugins = [
  Fetch,
  Loading,
  Unread,
  WithEditor,
  Count,
  SidebarBtn,
  UnreadBadge,
  Dropdown,
  Goto,
  NoComment,
  Copyright,
  TimeTicking,
  ErrorDialog,
  ReachBottom,
  GotoFirst
];
const PvCountWidget = (ctx) => {
  ctx.on("conf-loaded", () => {
    initCountWidget({
      getApi: () => ctx.getApi(),
      pageKey: ctx.conf.pageKey,
      countEl: ctx.conf.countEl,
      pvEl: ctx.conf.pvEl,
      pvAdd: true
    });
  });
};
function initCountWidget(opt) {
  return __async(this, null, function* () {
    if (opt.countEl && document.querySelector(opt.countEl)) {
      refreshStatCount(opt, { query: "page_comment", numEl: opt.countEl });
    }
    const initialData = opt.pvAdd ? {
      [opt.pageKey]: yield opt.getApi().page.pv()
      // pv+1 and get pv count
    } : void 0;
    if (opt.pvEl && document.querySelector(opt.pvEl)) {
      refreshStatCount(opt, {
        query: "page_pv",
        numEl: opt.pvEl,
        data: initialData
      });
    }
  });
}
function refreshStatCount(opt, args) {
  return __async(this, null, function* () {
    let data = args.data || {};
    let queryPageKeys = Array.from(document.querySelectorAll(args.numEl)).map((e) => e.getAttribute("data-page-key") || opt.pageKey).filter((k) => typeof data[k] !== "number");
    queryPageKeys = [...new Set(queryPageKeys)];
    if (queryPageKeys.length > 0) {
      const res = yield opt.getApi().page.stat(args.query, queryPageKeys);
      data = __spreadValues(__spreadValues({}, data), res);
    }
    applyCountData(args.numEl, data, data[opt.pageKey]);
  });
}
function applyCountData(selector, data, defaultCount) {
  document.querySelectorAll(selector).forEach((el) => {
    const pageKey = el.getAttribute("data-page-key");
    const count = Number(pageKey ? data[pageKey] : defaultCount);
    el.innerHTML = `${count}`;
  });
}
let IgnoreVersionCheck = false;
const VersionCheck = (ctx) => {
  ctx.on("conf-loaded", () => {
    const list = ctx.get("list");
    if (ctx.conf.apiVersion && ctx.conf.versionCheck && !IgnoreVersionCheck)
      versionCheck(list, version, ctx.conf.apiVersion);
  });
};
function versionCheck(list, feVer, beVer) {
  const comp = versionCompare(feVer, beVer);
  const sameVer = comp === 0;
  if (sameVer)
    return;
  const errEl = createElement(
    `<div>${t("updateMsg", { name: comp < 0 ? t("frontend") : t("backend") })}<br/><br/><span style="color: var(--at-color-meta);">${t("currentVersion")}: ${t("frontend")} ${feVer} / ${t("backend")} ${beVer}</span><br/><br/></div>`
  );
  const ignoreBtn = createElement(`<span style="cursor:pointer">${t("ignore")}</span>`);
  ignoreBtn.onclick = () => {
    setError(list.$el.parentElement, null);
    IgnoreVersionCheck = true;
    list.ctx.fetch({ offset: 0 });
  };
  errEl.append(ignoreBtn);
  setError(list.$el.parentElement, errEl, '<span class="atk-warn-title">Artalk Warn</span>');
}
const AdminOnlyElem = (ctx) => {
  const scanApply = () => {
    applyAdminOnlyEls(ctx.get("user").data.isAdmin, getAdminOnlyEls({
      $root: ctx.$root
    }));
  };
  ctx.on("list-loaded", () => {
    scanApply();
  });
  ctx.on("user-changed", (user) => {
    scanApply();
  });
};
function getAdminOnlyEls(opts) {
  const els = [];
  opts.$root.querySelectorAll(`[atk-only-admin-show]`).forEach((item) => els.push(item));
  const $sidebarEl = document.querySelector(".atk-sidebar");
  if ($sidebarEl)
    $sidebarEl.querySelectorAll(`[atk-only-admin-show]`).forEach((item) => els.push(item));
  return els;
}
function applyAdminOnlyEls(isAdmin, els) {
  els.forEach(($item) => {
    if (isAdmin)
      $item.classList.remove("atk-hide");
    else
      $item.classList.add("atk-hide");
  });
}
const darkModeMedia = window.matchMedia("(prefers-color-scheme: dark)");
let darkModeAutoFunc;
function applyDarkMode($els, darkMode) {
  const apply = (d) => {
    $els.forEach(($el) => updateClassName($el, d));
  };
  if (darkMode === "auto") {
    if (!darkModeAutoFunc) {
      darkModeAutoFunc = (evt) => apply(evt.matches);
      darkModeMedia.addEventListener("change", darkModeAutoFunc);
    }
    apply(darkModeMedia.matches);
  } else {
    if (darkModeAutoFunc)
      darkModeMedia.removeEventListener("change", darkModeAutoFunc);
    apply(darkMode);
  }
}
const DarkModeClassName = "atk-dark-mode";
function updateClassName($el, darkMode) {
  if (darkMode)
    $el.classList.add(DarkModeClassName);
  else
    $el.classList.remove(DarkModeClassName);
}
const DarkMode = (ctx) => {
  const sync = () => {
    applyDarkMode([ctx.$root, ctx.get("layerManager").getEl()], ctx.conf.darkMode);
  };
  ctx.on("inited", () => sync());
  ctx.on("conf-loaded", () => sync());
  ctx.on("dark-mode-changed", () => sync());
};
const DefaultPlugins = [
  ConfRemoter,
  Markdown,
  EditorKit,
  AdminOnlyElem,
  ...ListPlugins,
  PvCountWidget,
  VersionCheck,
  DarkMode
];
const GlobalPlugins = [...DefaultPlugins];
class Artalk {
  constructor(conf) {
    __publicField(this, "conf");
    __publicField(this, "ctx");
    __publicField(this, "$root");
    /** Plugins */
    __publicField(this, "plugins", [...GlobalPlugins]);
    this.conf = handelCustomConf(conf);
    if (this.conf.el instanceof HTMLElement)
      this.$root = this.conf.el;
    this.ctx = new Context(this.conf, this.$root);
    Object.entries(services).forEach(([name, initService]) => {
      const obj = initService(this.ctx);
      if (obj)
        this.ctx.inject(name, obj);
    });
    this.plugins.forEach((plugin) => {
      if (typeof plugin === "function")
        plugin(this.ctx);
    });
    this.ctx.trigger("inited");
  }
  /** Update config of Artalk */
  update(conf) {
    this.ctx.updateConf(conf);
    return this;
  }
  /** Reload comment list of Artalk */
  reload() {
    this.ctx.reload();
  }
  /** Destroy instance of Artalk */
  destroy() {
    this.ctx.trigger("destroy");
    this.$root.remove();
  }
  /** Add an event listener */
  on(name, handler) {
    this.ctx.on(name, handler);
  }
  /** Remove an event listener */
  off(name, handler) {
    this.ctx.off(name, handler);
  }
  /** Trigger an event */
  trigger(name, payload) {
    this.ctx.trigger(name, payload);
  }
  /** Set dark mode */
  setDarkMode(darkMode) {
    this.ctx.setDarkMode(darkMode);
  }
  // ===========================
  //       Static Members
  // ===========================
  /** Init Artalk */
  static init(conf) {
    return new Artalk(conf);
  }
  /** Use plugin, the plugin will be used when Artalk.init */
  static use(plugin) {
    if (GlobalPlugins.includes(plugin))
      return;
    GlobalPlugins.push(plugin);
  }
  /** Load count widget */
  static loadCountWidget(c) {
    const conf = handelCustomConf(c);
    initCountWidget({
      getApi: () => new Api(convertApiOptions(conf)),
      pageKey: conf.pageKey,
      countEl: conf.countEl,
      pvEl: conf.pvEl,
      pvAdd: false
    });
  }
}
const index = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null
}, Symbol.toStringTag, { value: "Module" }));
const init = Artalk.init;
const use = Artalk.use;
const loadCountWidget = Artalk.loadCountWidget;
export {
  index as ArtalkType,
  Artalk as default,
  init,
  loadCountWidget,
  use
};
//# sourceMappingURL=Artalk.es.js.map
