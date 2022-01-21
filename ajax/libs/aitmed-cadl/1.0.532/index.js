(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@aitmed/ecos-lvl2-sdk'), require('@aitmed/protorepo/js/ecos/v1beta1/types_pb'), require('pako'), require('@jsmanifest/utils'), require('noodl-types'), require('immer'), require('dot-object'), require('moment'), require('humanize-duration'), require('axios'), require('crypto-js/sha256'), require('crypto-js/enc-base64'), require('jsbi'), require('yaml'), require('sql.js/dist/sql-asm.js')) :
  typeof define === 'function' && define.amd ? define(['exports', '@aitmed/ecos-lvl2-sdk', '@aitmed/protorepo/js/ecos/v1beta1/types_pb', 'pako', '@jsmanifest/utils', 'noodl-types', 'immer', 'dot-object', 'moment', 'humanize-duration', 'axios', 'crypto-js/sha256', 'crypto-js/enc-base64', 'jsbi', 'yaml', 'sql.js/dist/sql-asm.js'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.CADL = {}, global.lvl2, global.types_pb, global.pako, global.u, global.nt, global.immer, global.dot, global.moment, global.humanizeDuration, global.axios, global.sha256, global.Base64, global.jsbi, global.YAML, global.initSqlJs));
})(this, (function (exports, Level2Ecos, types_pb, pako, u, nt, produce, dot, moment, humanizeDuration, axios, sha256$1, Base64, JSBI, YAML, initSqlJs) { 'use strict';

  function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

  function _interopNamespace(e) {
    if (e && e.__esModule) return e;
    var n = Object.create(null);
    if (e) {
      Object.keys(e).forEach(function (k) {
        if (k !== 'default') {
          var d = Object.getOwnPropertyDescriptor(e, k);
          Object.defineProperty(n, k, d.get ? d : {
            enumerable: true,
            get: function () { return e[k]; }
          });
        }
      });
    }
    n["default"] = e;
    return Object.freeze(n);
  }

  var Level2Ecos__default = /*#__PURE__*/_interopDefaultLegacy(Level2Ecos);
  var pako__default = /*#__PURE__*/_interopDefaultLegacy(pako);
  var u__namespace = /*#__PURE__*/_interopNamespace(u);
  var nt__namespace = /*#__PURE__*/_interopNamespace(nt);
  var produce__default = /*#__PURE__*/_interopDefaultLegacy(produce);
  var dot__default = /*#__PURE__*/_interopDefaultLegacy(dot);
  var moment__default = /*#__PURE__*/_interopDefaultLegacy(moment);
  var humanizeDuration__default = /*#__PURE__*/_interopDefaultLegacy(humanizeDuration);
  var axios__default = /*#__PURE__*/_interopDefaultLegacy(axios);
  var sha256__default = /*#__PURE__*/_interopDefaultLegacy(sha256$1);
  var Base64__default = /*#__PURE__*/_interopDefaultLegacy(Base64);
  var JSBI__default = /*#__PURE__*/_interopDefaultLegacy(JSBI);
  var YAML__default = /*#__PURE__*/_interopDefaultLegacy(YAML);
  var initSqlJs__namespace = /*#__PURE__*/_interopNamespace(initSqlJs);

  var ErrorCodes = /* @__PURE__ */ ((ErrorCodes2) => {
    ErrorCodes2[ErrorCodes2["UNKNOW_ERROR"] = -1] = "UNKNOW_ERROR";
    ErrorCodes2[ErrorCodes2["PERMISSION_DENIED"] = 1] = "PERMISSION_DENIED";
    ErrorCodes2[ErrorCodes2["UNREGISTERED"] = 2] = "UNREGISTERED";
    ErrorCodes2[ErrorCodes2["REGISTERED"] = 3] = "REGISTERED";
    ErrorCodes2[ErrorCodes2["PHONE_NUMBER_INVALID"] = 1e3] = "PHONE_NUMBER_INVALID";
    ErrorCodes2[ErrorCodes2["PASSWORD_INVALID"] = 1001] = "PASSWORD_INVALID";
    ErrorCodes2[ErrorCodes2["VERIFICATION_CODE_INVALID"] = 1002] = "VERIFICATION_CODE_INVALID";
    ErrorCodes2[ErrorCodes2["REQUIRED_VERIFICATION_CODE"] = 1003] = "REQUIRED_VERIFICATION_CODE";
    ErrorCodes2[ErrorCodes2["REQUIRED_PASSWORD"] = 1004] = "REQUIRED_PASSWORD";
    ErrorCodes2[ErrorCodes2["USER_NOT_FOUND"] = 1005] = "USER_NOT_FOUND";
    ErrorCodes2[ErrorCodes2["PROFILE_NOT_FOUND"] = 1006] = "PROFILE_NOT_FOUND";
    ErrorCodes2[ErrorCodes2["UID_INVALID"] = 1007] = "UID_INVALID";
    ErrorCodes2[ErrorCodes2["PROFILE_PHOTO_INVALID"] = 1008] = "PROFILE_PHOTO_INVALID";
    ErrorCodes2[ErrorCodes2["LOGIN_REQUIRED"] = 1009] = "LOGIN_REQUIRED";
    ErrorCodes2[ErrorCodes2["EDGE_DOES_NOT_EXIST"] = 2e3] = "EDGE_DOES_NOT_EXIST";
    ErrorCodes2[ErrorCodes2["NOTEBOOK_PERMISSION_DENIED"] = 2001] = "NOTEBOOK_PERMISSION_DENIED";
    ErrorCodes2[ErrorCodes2["NOT_A_NOTEBOOk"] = 2002] = "NOT_A_NOTEBOOk";
    ErrorCodes2[ErrorCodes2["ROOT_NOTEBOOK_EXIST"] = 2003] = "ROOT_NOTEBOOK_EXIST";
    ErrorCodes2[ErrorCodes2["ROOT_NOTEBOOK_NOT_EXIST"] = 2004] = "ROOT_NOTEBOOK_NOT_EXIST";
    ErrorCodes2[ErrorCodes2["ROOT_NOTEBOOK_CANNOT_BE_REMOVED"] = 2005] = "ROOT_NOTEBOOK_CANNOT_BE_REMOVED";
    ErrorCodes2[ErrorCodes2["NOTEBOOK_TYPE_INVALID"] = 2006] = "NOTEBOOK_TYPE_INVALID";
    ErrorCodes2[ErrorCodes2["NOT_AN_INVITE"] = 2007] = "NOT_AN_INVITE";
    ErrorCodes2[ErrorCodes2["NOT_AN_ACCEPTED_INVITE"] = 2008] = "NOT_AN_ACCEPTED_INVITE";
    ErrorCodes2[ErrorCodes2["NOTE_NOT_EXIST"] = 3e3] = "NOTE_NOT_EXIST";
    ErrorCodes2[ErrorCodes2["NOTE_PERMISSION_DENIED"] = 3001] = "NOTE_PERMISSION_DENIED";
    ErrorCodes2[ErrorCodes2["NOTE_CONTENT_INVALID"] = 3002] = "NOTE_CONTENT_INVALID";
    ErrorCodes2[ErrorCodes2["NOT_A_NOTE"] = 3003] = "NOT_A_NOTE";
    ErrorCodes2[ErrorCodes2["NOTEBOOK_ID_NOT_MATCH"] = 3004] = "NOTEBOOK_ID_NOT_MATCH";
    ErrorCodes2[ErrorCodes2["CONTENT_TOO_LARGE"] = 3005] = "CONTENT_TOO_LARGE";
    ErrorCodes2[ErrorCodes2["DOWNLOAD_FROM_S3_FAIL"] = 3006] = "DOWNLOAD_FROM_S3_FAIL";
    ErrorCodes2[ErrorCodes2["DECRYPTING_NOTES_FAIL"] = 3007] = "DECRYPTING_NOTES_FAIL";
    ErrorCodes2[ErrorCodes2["YAML_PARSE_FAILED"] = 4e3] = "YAML_PARSE_FAILED";
    ErrorCodes2[ErrorCodes2["NO_DATA_MODELS_AVAILABLE"] = 4001] = "NO_DATA_MODELS_AVAILABLE";
    ErrorCodes2[ErrorCodes2["INVALID_DATAMODEL_KEY"] = 4002] = "INVALID_DATAMODEL_KEY";
    ErrorCodes2[ErrorCodes2["ERROR_RETRIEVING_UIDL_DATA"] = 4003] = "ERROR_RETRIEVING_UIDL_DATA";
    ErrorCodes2[ErrorCodes2["INVALID_ROOT_TYPE"] = 4004] = "INVALID_ROOT_TYPE";
    ErrorCodes2[ErrorCodes2["INVALID_LINK"] = 5e3] = "INVALID_LINK";
    ErrorCodes2[ErrorCodes2["LINK_DOES_NOT_EXIST"] = 5001] = "LINK_DOES_NOT_EXIST";
    ErrorCodes2[ErrorCodes2["NOT_AN_INBOX"] = 6e3] = "NOT_AN_INBOX";
    ErrorCodes2[ErrorCodes2["ROOT_INBOX_EXISTS"] = 6001] = "ROOT_INBOX_EXISTS";
    ErrorCodes2[ErrorCodes2["ROOT_INBOX_DOES_NOT_EXIST"] = 6002] = "ROOT_INBOX_DOES_NOT_EXIST";
    ErrorCodes2[ErrorCodes2["ERROR_CREATING_ESAK"] = 7e3] = "ERROR_CREATING_ESAK";
    ErrorCodes2[ErrorCodes2["ERROR_DECRYPTING_DATA"] = 7001] = "ERROR_DECRYPTING_DATA";
    return ErrorCodes2;
  })(ErrorCodes || {});
  const defaultErrorMessages = {
    UNKNOW_ERROR: "error occurred",
    PERMISSION_DENIED: "permission denied",
    UNREGISTERED: "account is not registered",
    REGISTERED: "account is already registered",
    PHONE_NUMBER_INVALID: "phone number is invalid",
    PASSWORD_INVALID: "password is invalid",
    VERIFICATION_CODE_INVALID: "verification code is invalid",
    REQUIRED_VERIFICATION_CODE: "verification code is required",
    REQUIRED_PASSWORD: "password is required",
    USER_NOT_FOUND: "user is not found",
    PROFILE_NOT_FOUND: "profile note found",
    UID_INVALID: "uid is invalid",
    PROFILE_PHOTO_INVALID: "profile photo is invalid",
    LOGIN_REQUIRED: "There is no secretKey present in localStorage. Please log In.",
    EDGE_DOES_NOT_EXIST: "The requested edge does not exist",
    NOTEBOOK_PERMISSION_DENIED: "notebook permission denied",
    NOT_A_NOTEBOOk: "not a notebook",
    ROOT_NOTEBOOK_EXIST: "the root notebook is already exist",
    ROOT_NOTEBOOK_NOT_EXIST: "the root notebook is not exist",
    ROOT_NOTEBOOK_CANNOT_BE_REMOVED: "the root notebook cannot be removed",
    NOTEBOOK_TYPE_INVALID: "notebook type is invalid",
    NOT_AN_INVITE: "this is not an invite",
    NOT_AN_ACCEPTED_INVITE: " this is not an accepted invite",
    NOTE_NOT_EXIST: "note is not exist",
    NOTE_PERMISSION_DENIED: "note permission denied",
    NOTE_CONTENT_INVALID: "note content is invalid",
    NOT_A_NOTE: "not a note",
    NOTEBOOK_ID_NOT_MATCH: "notebook id is not match",
    CONTENT_TOO_LARGE: "content is too large [maximum 32KB]",
    DOWNLOAD_FROM_S3_FAIL: "download document from s3 fail",
    DECRYPTING_NOTES_FAIL: "an error occurred while decrypting the shared notes",
    INVALID_LINK: "this is not a valid Link type",
    LINK_DOES_NOT_EXIST: "Link does not exist",
    NOT_AN_INBOX: "This is not a valid inbox/relation.",
    ROOT_INBOX_EXISTS: "Root inbox already exists.",
    ROOT_INBOX_DOES_NOT_EXIST: "There is no root inbox for the user.",
    YAML_PARSE_FAILED: "failed to parse yaml data",
    NO_DATA_MODELS_AVAILABLE: "There are no dataModels for this uidl",
    INVALID_DATAMODEL_KEY: "Please provide a valid dataModel key",
    ERROR_RETRIEVING_UIDL_DATA: "Could not retrieve data for UIDL dataModel.",
    INVALID_ROOT_TYPE: "The root type provided is invalid",
    ERROR_CREATING_ESAK: "Error happened while creating an esak",
    ERROR_DECRYPTING_DATA: "Error happened while decrypting data."
  };

  const names = Object.keys(ErrorCodes).filter((name) => typeof ErrorCodes[name] === "number");
  const codes = names.map((name) => parseInt(ErrorCodes[name]));
  class AiTmedError extends Error {
    constructor({ code, name, message }) {
      super();
      if (code === void 0 && name !== void 0) {
        this.name = name;
        this.code = getErrorCode(name);
      } else if (code !== void 0 && name === void 0) {
        this.name = getErrorName(code);
        this.code = getErrorCode(this.name);
      } else {
        this.code = -1;
        this.name = ErrorCodes[this.code];
      }
      this.message = message === void 0 ? defaultErrorMessages[this.name] : message;
      this.source = "lv-3";
    }
  }
  function getErrorCode(name) {
    if (names.includes(name)) {
      return parseInt(ErrorCodes[name]);
    } else {
      return -1;
    }
  }
  function getErrorName(code) {
    if (codes.includes(code)) {
      return ErrorCodes[code];
    } else {
      return ErrorCodes.UNKNOW_ERROR.toString();
    }
  }

  function compareUint8Arrays(u8a1, u8a2) {
    if (u8a1.length !== u8a2.length)
      return false;
    for (let i = 0; i < u8a1.length; i++) {
      if (u8a1[i] !== u8a2[i]) {
        return false;
      }
    }
    return true;
  }

  const defaultResponseCatcher = (response) => {
    return response;
  };
  const defaultErrorCatcher = (error) => {
    const code = getErrorCode(error.name);
    if (code === -1 && error.name !== "UNKNOW_ERROR") {
      throw error;
    } else {
      throw new AiTmedError({ code, message: error.message });
    }
  };
  class Store {
    constructor({ apiVersion, apiHost, env, configUrl }) {
      this.responseCatcher = defaultResponseCatcher;
      this.errorCatcher = defaultErrorCatcher;
      this._env = env;
      const sdkEnv = env === "test" ? "development" : "production";
      this.level2SDK = new Level2Ecos__default["default"]({
        apiVersion,
        apiHost,
        env: sdkEnv,
        configUrl
      });
      const idToBase64 = (id) => {
        if (typeof id === "string") {
          return id;
        } else {
          return this.level2SDK.utilServices.uint8ArrayToBase64(id);
        }
      };
      const idToUint8Array = (id) => {
        if (typeof id === "string") {
          return this.level2SDK.utilServices.base64ToUint8Array(id);
        } else {
          return id;
        }
      };
      this.utils = {
        idToBase64,
        idToUint8Array,
        compareUint8Arrays
      };
    }
    set apiVersion(value) {
      this.level2SDK.apiVersion = value;
    }
    get apiVersion() {
      return this.level2SDK.apiVersion;
    }
    set env(value) {
      this._env = value;
    }
    get env() {
      return this._env;
    }
    get apiHost() {
      return this.level2SDK.apiHost;
    }
    set apiHost(value) {
      this.level2SDK.apiHost = value;
    }
    get configUrl() {
      return this.level2SDK.configUrl;
    }
    set configUrl(value) {
      this.level2SDK.configUrl = value;
    }
    getConfig() {
      return this.level2SDK.getConfigData();
    }
  }

  var store = new Store({
    env: "test",
    configUrl: "https://public.aitmed.com/config"
  });

  class UnableToExecuteFn extends Error {
    constructor(message, error) {
      super(message);
      this.error = error;
      this.name = "UnableToExecuteFn";
      Object.setPrototypeOf(this, UnableToExecuteFn.prototype);
    }
  }

  class UnableToParseYAML extends Error {
    constructor(message, error) {
      super(message);
      this.error = error;
      this.name = "UnableToParseYAML";
      Object.setPrototypeOf(this, UnableToParseYAML.prototype);
    }
  }

  class UnableToRetrieveYAML extends Error {
    constructor(message, error) {
      super(message);
      this.error = error;
      this.name = "UnableToRetrieveYAML";
      Object.setPrototypeOf(this, UnableToRetrieveYAML.prototype);
    }
  }

  class UnableToLocateValue extends Error {
    constructor(message, error) {
      super(message);
      this.error = error;
      this.name = "UnableToLocateValue";
      Object.setPrototypeOf(this, UnableToLocateValue.prototype);
    }
  }

  class PopulateError extends Error {
    constructor(message, kind) {
      super(message);
      this.name = "PopulateError";
      this.kind = kind || "";
    }
  }

  class UnableToLoadConfig extends Error {
    constructor(message, error) {
      super(message);
      this.error = error;
      this.name = "UnableToLoadConfig";
      Object.setPrototypeOf(this, UnableToLoadConfig.prototype);
    }
  }

  class UnableToMakeAnotherRequest extends Error {
    constructor(message, error) {
      super(message);
      this.error = error;
      this.name = "UnableToMakeAnotherRequest";
      Object.setPrototypeOf(this, UnableToMakeAnotherRequest.prototype);
    }
  }

  function ecosObjType(id) {
    if (typeof id === "string") {
      id = store.utils.idToUint8Array(id);
    }
    const identifier = ((id == null ? void 0 : id[8]) & 192) >> 6;
    switch (identifier) {
      case 0:
        return "VERTEX";
      case 1:
        return "DOCUMENT";
      case 2:
        return "EDGE";
      case 3:
        return "FILE";
      default:
        return "UNKNOWN";
    }
  }
  const gzip = (data) => {
    return pako__default["default"].gzip(data);
  };
  const ungzip = (data) => {
    return pako__default["default"].ungzip(data);
  };
  function isObject$1(item) {
    if (item === null)
      return false;
    if (item === void 0)
      return false;
    return item && typeof item === "object" && !Array.isArray(item);
  }
  function mergeDeep$1(target, source) {
    let output = target;
    if (isObject$1(target) && isObject$1(source)) {
      Object.keys(source).forEach((key) => {
        if (isObject$1(source[key])) {
          if (!(key in target)) {
            output[key] = source[key];
          } else if (isObject$1(target[key])) {
            output[key] = mergeDeep$1(target[key], source[key]);
          } else {
            output[key] = source[key];
          }
        } else if (source[key] === null && target[key] !== null) {
          output[key] = target[key];
        } else {
          output[key] = source[key];
        }
      });
    }
    if (source === void 0 && isObject$1(target)) {
      output = source;
    }
    return output;
  }

  function getIdList(value) {
    if (!value)
      return [];
    if (u__namespace.isStr(value) || u__namespace.isArr(value)) {
      return u__namespace.reduce(u__namespace.array(value), (acc, val) => {
        if (u__namespace.isStr(val)) {
          if (nt.Identify.reference(val) || val.startsWith("$")) {
            console.log(`%c[Lvl3 - getIdList] A reference "${value}" was being passed to idList. It will not be included in the request`, `color:#ec0000;font-weight:bold;`);
            return acc;
          }
        }
        return val ? acc.concat(val) : acc;
      }, []);
    }
    if (u__namespace.isObj(value)) {
      if ("id" in value || "ids" in value) {
        return getIdList([value.ids || value.id].filter(Boolean));
      }
    }
    return u__namespace.array(value).filter(Boolean);
  }

  var __async$m = (__this, __arguments, generator) => {
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
  const retrieveVertex = (id) => __async$m(window, null, function* () {
    const response = yield store.level2SDK.vertexServices.retrieveVertex({
      idList: getIdList(id)
    }).then(store.responseCatcher).catch(store.errorCatcher);
    return response && Array.isArray(response.data) && response.data.length > 0 ? response.data[0] : null;
  });
  const retrieveEdge = (id) => __async$m(window, null, function* () {
    let response;
    response = yield store.level2SDK.edgeServices.retrieveEdge({
      idList: getIdList(id)
    }).then(store.responseCatcher).catch(store.errorCatcher);
    return response && response.data.edge && Array.isArray(response.data.edge) && response.data.edge.length > 0 ? response.data.edge[0] : null;
  });
  const retrieveAuthorizationEdge = (doc) => __async$m(window, null, function* () {
    console.log(`[retrieveAuthorizationEdge] doc`, doc);
    let authEdgeId;
    if (ecosObjType(doc == null ? void 0 : doc.eid) === "EDGE") {
      authEdgeId = doc.eid;
    } else {
      authEdgeId = doc == null ? void 0 : doc.esig;
    }
    let response;
    response = yield store.level2SDK.edgeServices.retrieveEdge({
      idList: getIdList(authEdgeId)
    }).then(store.responseCatcher).catch(store.errorCatcher);
    return response && response.data.edge && Array.isArray(response.data.edge) && response.data.edge.length > 0 ? response.data.edge[0] : null;
  });
  const retrieveDocument = (id) => __async$m(window, null, function* () {
    const response = yield store.level2SDK.documentServices.retrieveDocument({ idList: getIdList(id) }).then(store.responseCatcher).catch(store.errorCatcher);
    return response && Array.isArray(response.data.document) && response.data.document.length > 0 ? response.data.document[0] : null;
  });

  function decodeUID(uid) {
    const lastIOfPlus = uid.lastIndexOf("+");
    if (lastIOfPlus < 0) {
      throw new AiTmedError({ name: "UID_INVALID" });
    }
    return {
      userId: uid.slice(0, lastIOfPlus),
      phone_number: uid.slice(lastIOfPlus)
    };
  }

  var __defProp$d = Object.defineProperty;
  var __defProps$c = Object.defineProperties;
  var __getOwnPropDescs$c = Object.getOwnPropertyDescriptors;
  var __getOwnPropSymbols$e = Object.getOwnPropertySymbols;
  var __hasOwnProp$e = Object.prototype.hasOwnProperty;
  var __propIsEnum$e = Object.prototype.propertyIsEnumerable;
  var __defNormalProp$d = (obj, key, value) => key in obj ? __defProp$d(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __spreadValues$d = (a, b) => {
    for (var prop in b || (b = {}))
      if (__hasOwnProp$e.call(b, prop))
        __defNormalProp$d(a, prop, b[prop]);
    if (__getOwnPropSymbols$e)
      for (var prop of __getOwnPropSymbols$e(b)) {
        if (__propIsEnum$e.call(b, prop))
          __defNormalProp$d(a, prop, b[prop]);
      }
    return a;
  };
  var __spreadProps$c = (a, b) => __defProps$c(a, __getOwnPropDescs$c(b));
  var __objRest$7 = (source, exclude) => {
    var target = {};
    for (var prop in source)
      if (__hasOwnProp$e.call(source, prop) && exclude.indexOf(prop) < 0)
        target[prop] = source[prop];
    if (source != null && __getOwnPropSymbols$e)
      for (var prop of __getOwnPropSymbols$e(source)) {
        if (exclude.indexOf(prop) < 0 && __propIsEnum$e.call(source, prop))
          target[prop] = source[prop];
      }
    return target;
  };
  var __async$l = (__this, __arguments, generator) => {
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
  const requestVerificationCode = (phone_number) => __async$l(window, null, function* () {
    var _a;
    if (store.noodlInstance) {
      if (store.noodlInstance.verificationRequest.timer > 0 && store.noodlInstance.verificationRequest.phoneNumber === phone_number) {
        throw new UnableToMakeAnotherRequest("User must wait 60 sec to make another verification code request.");
      } else {
        store.noodlInstance.verificationRequest.timer = 60;
        store.noodlInstance.verificationRequest.phoneNumber = phone_number;
        const interval = setInterval(() => {
          if (store.noodlInstance.verificationRequest.timer === 0) {
            clearInterval(interval);
          } else {
            store.noodlInstance.verificationRequest.timer--;
          }
        }, 1e3);
      }
    }
    const response = yield store.level2SDK.Account.requestVerificationCode({
      phone_number
    }).then(store.responseCatcher).catch(store.errorCatcher);
    return response && response.data && ((_a = response.data) == null ? void 0 : _a.verification_code);
  });
  const create$4 = (phone_number, password, verification_code, userInfo, type = 1) => __async$l(window, null, function* () {
    const _a = yield getStatus(), { code: statusCode } = _a, rest = __objRest$7(_a, ["code"]);
    let userVertex;
    if (statusCode === 3) {
      const { data } = yield store.level2SDK.Account.createInvitedUser({
        id: rest == null ? void 0 : rest.data.user_id,
        phone_number,
        password,
        userInfo: __spreadProps$c(__spreadValues$d({}, userInfo), { phoneNumber: phone_number })
      }).then(store.responseCatcher).catch(store.errorCatcher);
      userVertex = data;
    } else {
      const { data } = yield store.level2SDK.Account.createUser({
        phone_number,
        password,
        verification_code,
        userInfo: __spreadProps$c(__spreadValues$d({}, userInfo), { phoneNumber: phone_number }),
        type: typeof type === "string" ? parseInt(type) : type
      }).then(store.responseCatcher).catch(store.errorCatcher);
      userVertex = data;
    }
    return userVertex;
  });
  const login = (phone_number, password, verification_code) => __async$l(window, null, function* () {
    const res = yield loginByVerificationCode(phone_number, verification_code);
    if (res instanceof Level2Ecos.Status) {
      yield store.level2SDK.Account.login();
      return res;
    }
    const user = yield loginByPassword(password);
    if (user.id) {
      const userVertex = yield retrieveVertex(user.id);
      if (userVertex && userVertex.name && userVertex.name.username) {
        userVertex.name.userName = userVertex.name.username;
        delete userVertex.name.username;
      }
      return userVertex;
    } else {
      return user;
    }
  });
  const loginByPassword = (password) => __async$l(window, null, function* () {
    yield store.level2SDK.Account.login({ password }).then(store.responseCatcher).catch(store.errorCatcher);
    const {
      data: { user_id }
    } = yield getStatus();
    let user;
    if (user_id) {
      const userVertex = yield retrieveVertex(user_id);
      if (userVertex && userVertex.name && userVertex.name.username) {
        userVertex.name.userName = userVertex.name.username;
        delete userVertex.name.username;
      }
      user = userVertex;
    }
    return user;
  });
  const loginByVerificationCode = (phone_number, verification_code) => __async$l(window, null, function* () {
    return yield store.level2SDK.Account.loginNewDevice({
      phone_number,
      verification_code
    }).then(store.responseCatcher).catch(store.errorCatcher);
  });
  const logout = (clean = false) => __async$l(window, null, function* () {
    if (clean) {
      store.level2SDK.Account.logoutClean();
      localStorage.removeItem("Global");
    } else {
      const status = yield getStatus();
      if (status.code === 1)
        return status;
      store.level2SDK.Account.logout();
      localStorage.removeItem("Global");
    }
    const latestStatus = yield getStatus();
    return latestStatus;
  });
  const getStatus = () => __async$l(window, null, function* () {
    if (!store.configUrl) {
      store.configUrl = `https://public.aitmed.com/config`;
    }
    const status = yield store.level2SDK.Account.getStatus();
    try {
      const uid = localStorage.getItem("uid");
      if (uid === null)
        throw new Error("uid is null");
      const utf8Uid = store.level2SDK.utilServices.base64ToUTF8(uid);
      const { userId, phone_number } = decodeUID(utf8Uid);
      return __spreadProps$c(__spreadValues$d({}, status), { userId, phone_number });
    } catch (error) {
      console.log(error);
      return __spreadProps$c(__spreadValues$d({}, status), { userId: "", phone_number: "" });
    }
  });

  var Account = /*#__PURE__*/Object.freeze({
    __proto__: null,
    requestVerificationCode: requestVerificationCode,
    create: create$4,
    login: login,
    loginByPassword: loginByPassword,
    loginByVerificationCode: loginByVerificationCode,
    logout: logout,
    getStatus: getStatus
  });

  const setBit = (target, value, bit) => {
    return value ? target | 1 << bit : target & ~(1 << bit);
  };
  const getBit = (target, bit) => {
    return !!(target & 1 << bit) ? 1 : 0;
  };

  const TOTAL_BITS = 32;
  const FLAG_BITS = 6;
  const IS_ON_SERVER = 0;
  const IS_GZIP = 1;
  const IS_BINARY = 2;
  const IS_ENCRYPTED = 3;
  const HAS_EXTRA_KEY = 4;
  const IS_EDITABLE = 5;
  const DATA_TYPE_START = 17;
  const DATA_TYPE_LIST = ["data", "profile", "vital"];
  const MEDIA_TYPE = 27;
  const MEDIA_TYPE_BITS = TOTAL_BITS - MEDIA_TYPE;
  const MEDIA_TYPE_LIST = [
    "others",
    "application",
    "audio",
    "font",
    "image",
    "message",
    "model",
    "multipart",
    "text",
    "video"
  ];

  class DType {
    constructor(value = 0) {
      this._flags = 0;
      this._dataType = 0;
      this._mediaType = 0;
      this.value = value;
    }
    set value(value) {
      this.flags = value << TOTAL_BITS - FLAG_BITS >>> TOTAL_BITS - FLAG_BITS;
      this.dataType = value << MEDIA_TYPE_BITS >>> DATA_TYPE_START + MEDIA_TYPE_BITS;
      this.mediaType = value >>> MEDIA_TYPE;
    }
    get value() {
      let tmpValue = this._mediaType << MEDIA_TYPE;
      tmpValue |= this._dataType << DATA_TYPE_START;
      tmpValue |= this.flags;
      return tmpValue;
    }
    getFlags() {
      return {
        isOnServer: this.isOnServer,
        isGzip: this.isGzip,
        isBinary: this.isBinary,
        isEncrypted: this.isEncrypted,
        hasExtraKey: this.hasExtraKey,
        isEditable: this.isEditable
      };
    }
    set flags(value) {
      this.isOnServer = !!getBit(value, IS_ON_SERVER);
      this.isGzip = !!getBit(value, IS_GZIP);
      this.isBinary = !!getBit(value, IS_BINARY);
      this.isEncrypted = !!getBit(value, IS_ENCRYPTED);
      this.hasExtraKey = !!getBit(value, HAS_EXTRA_KEY);
      this.isEditable = !!getBit(value, IS_EDITABLE);
    }
    get flags() {
      return this._flags;
    }
    set isOnServer(value) {
      this._flags = setBit(this._flags, value, IS_ON_SERVER);
    }
    get isOnServer() {
      return !!getBit(this._flags, IS_ON_SERVER);
    }
    set isGzip(value) {
      this._flags = setBit(this._flags, value, IS_GZIP);
    }
    get isGzip() {
      return !!getBit(this._flags, IS_GZIP);
    }
    set isBinary(value) {
      this._flags = setBit(this._flags, value, IS_BINARY);
    }
    get isBinary() {
      return !!getBit(this._flags, IS_BINARY);
    }
    set isEncrypted(value) {
      this._flags = setBit(this._flags, value, IS_ENCRYPTED);
    }
    get isEncrypted() {
      return !!getBit(this._flags, IS_ENCRYPTED);
    }
    set hasExtraKey(value) {
      this._flags = setBit(this._flags, value, HAS_EXTRA_KEY);
    }
    get hasExtraKey() {
      return !!getBit(this._flags, HAS_EXTRA_KEY);
    }
    set isEditable(value) {
      this._flags = setBit(this._flags, value, IS_EDITABLE);
    }
    get isEditable() {
      return !!getBit(this._flags, IS_EDITABLE);
    }
    set dataType(_type) {
      this._dataType = _type;
    }
    get dataType() {
      return this._dataType;
    }
    getDataType() {
      return DATA_TYPE_LIST[this._dataType];
    }
    set mediaType(_type) {
      const type = _type < 0 || _type >= MEDIA_TYPE_LIST.length ? 0 : _type;
      this._mediaType = type;
    }
    get mediaType() {
      return this._mediaType;
    }
    setMediaType(mediaType) {
      const type = MEDIA_TYPE_LIST.findIndex((header) => {
        let val = RegExp(`^${header}/`).test(mediaType);
        return val;
      });
      this._mediaType = type === -1 ? 0 : type;
    }
    getMediaType() {
      return MEDIA_TYPE_LIST[this.mediaType];
    }
  }

  var __defProp$c = Object.defineProperty;
  var __defProps$b = Object.defineProperties;
  var __getOwnPropDescs$b = Object.getOwnPropertyDescriptors;
  var __getOwnPropSymbols$d = Object.getOwnPropertySymbols;
  var __hasOwnProp$d = Object.prototype.hasOwnProperty;
  var __propIsEnum$d = Object.prototype.propertyIsEnumerable;
  var __defNormalProp$c = (obj, key, value) => key in obj ? __defProp$c(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __spreadValues$c = (a, b) => {
    for (var prop in b || (b = {}))
      if (__hasOwnProp$d.call(b, prop))
        __defNormalProp$c(a, prop, b[prop]);
    if (__getOwnPropSymbols$d)
      for (var prop of __getOwnPropSymbols$d(b)) {
        if (__propIsEnum$d.call(b, prop))
          __defNormalProp$c(a, prop, b[prop]);
      }
    return a;
  };
  var __spreadProps$b = (a, b) => __defProps$b(a, __getOwnPropDescs$b(b));
  var __async$k = (__this, __arguments, generator) => {
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
  const CONTENT_SIZE_LIMIT = 32768;
  const produceEncryptData = (_data, esak, publicKeyOfReceiver) => __async$k(window, null, function* () {
    let data = _data instanceof Blob ? yield store.level2SDK.utilServices.blobToUint8Array(_data) : _data, isEncrypt = false;
    if (typeof esak !== "undefined" && esak !== "" && publicKeyOfReceiver) {
      try {
        data = yield store.level2SDK.commonServices.encryptData(esak, publicKeyOfReceiver, data);
        isEncrypt = true;
      } catch (error) {
      }
    }
    return { data, isEncrypt };
  });
  const produceGzipData = (_data) => __async$k(window, null, function* () {
    let u8a = _data instanceof Blob ? yield store.level2SDK.utilServices.blobToUint8Array(_data) : _data;
    const data = gzip(u8a);
    const isGzip = data.length < u8a.length;
    return { data: isGzip ? data : u8a, isGzip };
  });
  const contentToBlob = (content, type) => {
    let blob;
    if (typeof content === "string") {
      blob = new Blob([content], { type });
    } else if (content instanceof Blob) {
      blob = content;
    } else {
      try {
        const jsonStr = JSON.stringify(content);
        blob = new Blob([jsonStr], { type: "application/json" });
      } catch (error) {
        throw new AiTmedError({
          name: "NOTE_CONTENT_INVALID",
          message: (error instanceof Error ? error : new Error(String(error))).message
        });
      }
    }
    return blob;
  };
  const documentToNote$1 = (_0) => __async$k(window, [_0], function* ({
    document,
    _edge,
    esakOfCurrentUser
  }) {
    var _a, _b;
    !document && (document = {});
    const name = document.name || {};
    const contentType = parseInt(name.type) === 0 ? "text/plain" : name.type;
    const deat = document.deat;
    const dType = new DType(document.subtype);
    let content = null;
    try {
      let data;
      if (dType.isOnServer) {
        if (name.data !== void 0) {
          data = yield store.level2SDK.utilServices.base64ToUint8Array(name.data);
        } else {
          throw new AiTmedError({
            name: "UNKNOW_ERROR",
            message: "name.data is undefined"
          });
        }
      } else {
        if (deat !== null && deat.url) {
          const response = yield store.level2SDK.documentServices.downloadDocumentFromS3({ url: deat.url }).then(store.responseCatcher).catch(store.errorCatcher);
          if (!response)
            throw "no response";
          data = dType.isBinary ? response.data : yield store.level2SDK.utilServices.base64ToUint8Array(response.data);
        } else {
          throw "deat.url is missing";
        }
      }
      if (dType.isEncrypted) {
        const edge = typeof _edge === "undefined" ? yield retrieveAuthorizationEdge(document) : _edge;
        if (edge === null)
          throw new AiTmedError({
            name: "UNKNOW_ERROR",
            message: "Document -> documentToNote -> retrieveEdge -> edge is null"
          });
        const vid = localStorage.getItem("user_vid");
        const edgeHasBesak = edge.besak && edge.besak !== "";
        const edgeHasEesak = edge.eesak && edge.eesak !== "";
        let inviteEdge;
        if (edge.type > 9999) {
          const vidUint8ArrayToBase64 = store.level2SDK.utilServices.uint8ArrayToBase64(edge.bvid);
          if (vidUint8ArrayToBase64 !== vid) {
            const { data: data2 } = yield store.level2SDK.edgeServices.retrieveEdge({
              idList: getIdList(edge.eid),
              options: {
                type: 1053,
                xfname: "refid"
              }
            });
            const { edge: invites } = data2;
            const inviteEdgeArray = invites.filter((invite) => {
              const evidUint8ArrayToBase64 = store.level2SDK.utilServices.uint8ArrayToBase64(invite.evid);
              return evidUint8ArrayToBase64 === vid;
            });
            inviteEdge = inviteEdgeArray.length > 0 ? inviteEdgeArray.shift() : "";
          }
        }
        if (dType.isEncrypted && (edgeHasBesak || edgeHasEesak || inviteEdge.eesak)) {
          let esak;
          const creatorOfEdge = edge.bvid instanceof Uint8Array ? store.level2SDK.utilServices.uint8ArrayToBase64(edge.evid) : edge.evid;
          const currentUserVid = localStorage.getItem("user_vid");
          const isCurrentUserCreatorOfEdge = creatorOfEdge === currentUserVid ? store.level2SDK.utilServices.uint8ArrayToBase64(edge.bvid) : edge.bvid;
          if (inviteEdge) {
            esak = inviteEdge.eesak;
          } else if (esakOfCurrentUser) {
            esak = esakOfCurrentUser;
          } else {
            esak = edgeHasBesak ? edge.besak : edge.eesak;
          }
          let publicKeyOfSender;
          if (inviteEdge) {
            const { data: inviterVertexResponse } = yield store.level2SDK.vertexServices.retrieveVertex({
              idList: getIdList(inviteEdge == null ? void 0 : inviteEdge.bvid)
            });
            const inviterVertex = (_a = inviterVertexResponse == null ? void 0 : inviterVertexResponse.vertex) == null ? void 0 : _a[0];
            publicKeyOfSender = store.level2SDK.utilServices.uint8ArrayToBase64(inviterVertex == null ? void 0 : inviterVertex.pk);
            try {
              data = yield store.level2SDK.commonServices.decryptData(esak, publicKeyOfSender, data);
            } catch (error2) {
              console.log(error2);
            }
          } else if (!isCurrentUserCreatorOfEdge) {
            const { data: creatorOfEdgeResponse } = yield store.level2SDK.vertexServices.retrieveVertex({
              idList: getIdList(edge == null ? void 0 : edge.bvid)
            });
            const creatorOfEdgeVertex = (_b = creatorOfEdgeResponse == null ? void 0 : creatorOfEdgeResponse.vertex) == null ? void 0 : _b[0];
            publicKeyOfSender = store.level2SDK.utilServices.uint8ArrayToBase64(creatorOfEdgeVertex == null ? void 0 : creatorOfEdgeVertex.pk);
            data = yield store.level2SDK.commonServices.decryptData(esak, publicKeyOfSender, data);
          } else if (edge.type === 10001) {
            const pkLocalStorage = localStorage.getItem("pk");
            publicKeyOfSender = pkLocalStorage ? pkLocalStorage : "";
            data = yield store.level2SDK.commonServices.decryptData(esak, publicKeyOfSender, data);
          } else if (edge.type === 1e4) {
            const pkLocalStorage = localStorage.getItem("pk");
            publicKeyOfSender = pkLocalStorage ? pkLocalStorage : "";
            data = yield store.level2SDK.commonServices.decryptData(esak, publicKeyOfSender, data);
          } else {
            publicKeyOfSender = localStorage.getItem("pk") || "";
            data = yield store.level2SDK.commonServices.decryptData(esak, publicKeyOfSender, data);
          }
        }
      }
      if (dType.isGzip)
        data = ungzip(data);
      const blob = yield store.level2SDK.utilServices.uint8ArrayToBlob(data, contentType);
      if (/^text\//.test(blob.type)) {
        content = yield new Response(blob).text();
      } else if (blob.type === "application/json") {
        const jsonStr = yield new Response(blob).text();
        try {
          content = JSON.parse(jsonStr);
        } catch (error2) {
          content = jsonStr;
        }
      } else {
        content = blob;
      }
    } catch (reason) {
      if (typeof reason === "string") {
        new AiTmedError({
          name: "DOWNLOAD_FROM_S3_FAIL",
          message: `Document -> documentToNote -> ${reason}`
        });
      }
      content = null;
    }
    if (content instanceof Blob) {
      content = yield store.level2SDK.utilServices.blobToBase64(content);
    }
    return __spreadProps$b(__spreadValues$c({}, document), {
      name: {
        title: name.title,
        nonce: name == null ? void 0 : name.nonce,
        targetRoomName: name == null ? void 0 : name.targetRoomName,
        user: name == null ? void 0 : name.user,
        sesk: name == null ? void 0 : name.sesk,
        aesk: name == null ? void 0 : name.aesk,
        type: contentType === "text/plain" ? "application/json" : contentType,
        data: content,
        tags: name.tags || []
      },
      created_at: document.ctime * 1e3,
      modified_at: document.mtime * 1e3,
      subtype: {
        isOnServer: dType.isOnServer,
        isZipped: dType.isGzip,
        isBinary: dType.isBinary,
        isEncrypted: dType.isEncrypted,
        isEditable: dType.isEditable,
        applicationDataType: dType.dataType,
        mediaType: dType.mediaType,
        size: document.size
      }
    });
  });

  /**
   * Removes all key-value entries from the list cache.
   *
   * @private
   * @name clear
   * @memberOf ListCache
   */
  function listCacheClear() {
    this.__data__ = [];
    this.size = 0;
  }

  var _listCacheClear = listCacheClear;

  /**
   * Performs a
   * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
   * comparison between two values to determine if they are equivalent.
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Lang
   * @param {*} value The value to compare.
   * @param {*} other The other value to compare.
   * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
   * @example
   *
   * var object = { 'a': 1 };
   * var other = { 'a': 1 };
   *
   * _.eq(object, object);
   * // => true
   *
   * _.eq(object, other);
   * // => false
   *
   * _.eq('a', 'a');
   * // => true
   *
   * _.eq('a', Object('a'));
   * // => false
   *
   * _.eq(NaN, NaN);
   * // => true
   */
  function eq(value, other) {
    return value === other || (value !== value && other !== other);
  }

  var eq_1 = eq;

  /**
   * Gets the index at which the `key` is found in `array` of key-value pairs.
   *
   * @private
   * @param {Array} array The array to inspect.
   * @param {*} key The key to search for.
   * @returns {number} Returns the index of the matched value, else `-1`.
   */
  function assocIndexOf(array, key) {
    var length = array.length;
    while (length--) {
      if (eq_1(array[length][0], key)) {
        return length;
      }
    }
    return -1;
  }

  var _assocIndexOf = assocIndexOf;

  /** Used for built-in method references. */
  var arrayProto = Array.prototype;

  /** Built-in value references. */
  var splice = arrayProto.splice;

  /**
   * Removes `key` and its value from the list cache.
   *
   * @private
   * @name delete
   * @memberOf ListCache
   * @param {string} key The key of the value to remove.
   * @returns {boolean} Returns `true` if the entry was removed, else `false`.
   */
  function listCacheDelete(key) {
    var data = this.__data__,
        index = _assocIndexOf(data, key);

    if (index < 0) {
      return false;
    }
    var lastIndex = data.length - 1;
    if (index == lastIndex) {
      data.pop();
    } else {
      splice.call(data, index, 1);
    }
    --this.size;
    return true;
  }

  var _listCacheDelete = listCacheDelete;

  /**
   * Gets the list cache value for `key`.
   *
   * @private
   * @name get
   * @memberOf ListCache
   * @param {string} key The key of the value to get.
   * @returns {*} Returns the entry value.
   */
  function listCacheGet(key) {
    var data = this.__data__,
        index = _assocIndexOf(data, key);

    return index < 0 ? undefined : data[index][1];
  }

  var _listCacheGet = listCacheGet;

  /**
   * Checks if a list cache value for `key` exists.
   *
   * @private
   * @name has
   * @memberOf ListCache
   * @param {string} key The key of the entry to check.
   * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
   */
  function listCacheHas(key) {
    return _assocIndexOf(this.__data__, key) > -1;
  }

  var _listCacheHas = listCacheHas;

  /**
   * Sets the list cache `key` to `value`.
   *
   * @private
   * @name set
   * @memberOf ListCache
   * @param {string} key The key of the value to set.
   * @param {*} value The value to set.
   * @returns {Object} Returns the list cache instance.
   */
  function listCacheSet(key, value) {
    var data = this.__data__,
        index = _assocIndexOf(data, key);

    if (index < 0) {
      ++this.size;
      data.push([key, value]);
    } else {
      data[index][1] = value;
    }
    return this;
  }

  var _listCacheSet = listCacheSet;

  /**
   * Creates an list cache object.
   *
   * @private
   * @constructor
   * @param {Array} [entries] The key-value pairs to cache.
   */
  function ListCache(entries) {
    var index = -1,
        length = entries == null ? 0 : entries.length;

    this.clear();
    while (++index < length) {
      var entry = entries[index];
      this.set(entry[0], entry[1]);
    }
  }

  // Add methods to `ListCache`.
  ListCache.prototype.clear = _listCacheClear;
  ListCache.prototype['delete'] = _listCacheDelete;
  ListCache.prototype.get = _listCacheGet;
  ListCache.prototype.has = _listCacheHas;
  ListCache.prototype.set = _listCacheSet;

  var _ListCache = ListCache;

  /**
   * Removes all key-value entries from the stack.
   *
   * @private
   * @name clear
   * @memberOf Stack
   */
  function stackClear() {
    this.__data__ = new _ListCache;
    this.size = 0;
  }

  var _stackClear = stackClear;

  /**
   * Removes `key` and its value from the stack.
   *
   * @private
   * @name delete
   * @memberOf Stack
   * @param {string} key The key of the value to remove.
   * @returns {boolean} Returns `true` if the entry was removed, else `false`.
   */
  function stackDelete(key) {
    var data = this.__data__,
        result = data['delete'](key);

    this.size = data.size;
    return result;
  }

  var _stackDelete = stackDelete;

  /**
   * Gets the stack value for `key`.
   *
   * @private
   * @name get
   * @memberOf Stack
   * @param {string} key The key of the value to get.
   * @returns {*} Returns the entry value.
   */
  function stackGet(key) {
    return this.__data__.get(key);
  }

  var _stackGet = stackGet;

  /**
   * Checks if a stack value for `key` exists.
   *
   * @private
   * @name has
   * @memberOf Stack
   * @param {string} key The key of the entry to check.
   * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
   */
  function stackHas(key) {
    return this.__data__.has(key);
  }

  var _stackHas = stackHas;

  var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

  function createCommonjsModule(fn, basedir, module) {
  	return module = {
  	  path: basedir,
  	  exports: {},
  	  require: function (path, base) {
        return commonjsRequire(path, (base === undefined || base === null) ? module.path : base);
      }
  	}, fn(module, module.exports), module.exports;
  }

  function commonjsRequire () {
  	throw new Error('Dynamic requires are not currently supported by @rollup/plugin-commonjs');
  }

  /** Detect free variable `global` from Node.js. */
  var freeGlobal = typeof commonjsGlobal == 'object' && commonjsGlobal && commonjsGlobal.Object === Object && commonjsGlobal;

  var _freeGlobal = freeGlobal;

  /** Detect free variable `self`. */
  var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

  /** Used as a reference to the global object. */
  var root = _freeGlobal || freeSelf || Function('return this')();

  var _root$1 = root;

  /** Built-in value references. */
  var Symbol$1 = _root$1.Symbol;

  var _Symbol = Symbol$1;

  /** Used for built-in method references. */
  var objectProto$f = Object.prototype;

  /** Used to check objects for own properties. */
  var hasOwnProperty$c = objectProto$f.hasOwnProperty;

  /**
   * Used to resolve the
   * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
   * of values.
   */
  var nativeObjectToString$1 = objectProto$f.toString;

  /** Built-in value references. */
  var symToStringTag$1 = _Symbol ? _Symbol.toStringTag : undefined;

  /**
   * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
   *
   * @private
   * @param {*} value The value to query.
   * @returns {string} Returns the raw `toStringTag`.
   */
  function getRawTag(value) {
    var isOwn = hasOwnProperty$c.call(value, symToStringTag$1),
        tag = value[symToStringTag$1];

    try {
      value[symToStringTag$1] = undefined;
      var unmasked = true;
    } catch (e) {}

    var result = nativeObjectToString$1.call(value);
    if (unmasked) {
      if (isOwn) {
        value[symToStringTag$1] = tag;
      } else {
        delete value[symToStringTag$1];
      }
    }
    return result;
  }

  var _getRawTag = getRawTag;

  /** Used for built-in method references. */
  var objectProto$e = Object.prototype;

  /**
   * Used to resolve the
   * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
   * of values.
   */
  var nativeObjectToString = objectProto$e.toString;

  /**
   * Converts `value` to a string using `Object.prototype.toString`.
   *
   * @private
   * @param {*} value The value to convert.
   * @returns {string} Returns the converted string.
   */
  function objectToString(value) {
    return nativeObjectToString.call(value);
  }

  var _objectToString = objectToString;

  /** `Object#toString` result references. */
  var nullTag = '[object Null]',
      undefinedTag = '[object Undefined]';

  /** Built-in value references. */
  var symToStringTag = _Symbol ? _Symbol.toStringTag : undefined;

  /**
   * The base implementation of `getTag` without fallbacks for buggy environments.
   *
   * @private
   * @param {*} value The value to query.
   * @returns {string} Returns the `toStringTag`.
   */
  function baseGetTag(value) {
    if (value == null) {
      return value === undefined ? undefinedTag : nullTag;
    }
    return (symToStringTag && symToStringTag in Object(value))
      ? _getRawTag(value)
      : _objectToString(value);
  }

  var _baseGetTag = baseGetTag;

  /**
   * Checks if `value` is the
   * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
   * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is an object, else `false`.
   * @example
   *
   * _.isObject({});
   * // => true
   *
   * _.isObject([1, 2, 3]);
   * // => true
   *
   * _.isObject(_.noop);
   * // => true
   *
   * _.isObject(null);
   * // => false
   */
  function isObject(value) {
    var type = typeof value;
    return value != null && (type == 'object' || type == 'function');
  }

  var isObject_1 = isObject;

  /** `Object#toString` result references. */
  var asyncTag = '[object AsyncFunction]',
      funcTag$2 = '[object Function]',
      genTag$1 = '[object GeneratorFunction]',
      proxyTag = '[object Proxy]';

  /**
   * Checks if `value` is classified as a `Function` object.
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a function, else `false`.
   * @example
   *
   * _.isFunction(_);
   * // => true
   *
   * _.isFunction(/abc/);
   * // => false
   */
  function isFunction(value) {
    if (!isObject_1(value)) {
      return false;
    }
    // The use of `Object#toString` avoids issues with the `typeof` operator
    // in Safari 9 which returns 'object' for typed arrays and other constructors.
    var tag = _baseGetTag(value);
    return tag == funcTag$2 || tag == genTag$1 || tag == asyncTag || tag == proxyTag;
  }

  var isFunction_1 = isFunction;

  /** Used to detect overreaching core-js shims. */
  var coreJsData = _root$1['__core-js_shared__'];

  var _coreJsData = coreJsData;

  /** Used to detect methods masquerading as native. */
  var maskSrcKey = (function() {
    var uid = /[^.]+$/.exec(_coreJsData && _coreJsData.keys && _coreJsData.keys.IE_PROTO || '');
    return uid ? ('Symbol(src)_1.' + uid) : '';
  }());

  /**
   * Checks if `func` has its source masked.
   *
   * @private
   * @param {Function} func The function to check.
   * @returns {boolean} Returns `true` if `func` is masked, else `false`.
   */
  function isMasked(func) {
    return !!maskSrcKey && (maskSrcKey in func);
  }

  var _isMasked = isMasked;

  /** Used for built-in method references. */
  var funcProto$2 = Function.prototype;

  /** Used to resolve the decompiled source of functions. */
  var funcToString$2 = funcProto$2.toString;

  /**
   * Converts `func` to its source code.
   *
   * @private
   * @param {Function} func The function to convert.
   * @returns {string} Returns the source code.
   */
  function toSource(func) {
    if (func != null) {
      try {
        return funcToString$2.call(func);
      } catch (e) {}
      try {
        return (func + '');
      } catch (e) {}
    }
    return '';
  }

  var _toSource = toSource;

  /**
   * Used to match `RegExp`
   * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
   */
  var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;

  /** Used to detect host constructors (Safari). */
  var reIsHostCtor = /^\[object .+?Constructor\]$/;

  /** Used for built-in method references. */
  var funcProto$1 = Function.prototype,
      objectProto$d = Object.prototype;

  /** Used to resolve the decompiled source of functions. */
  var funcToString$1 = funcProto$1.toString;

  /** Used to check objects for own properties. */
  var hasOwnProperty$b = objectProto$d.hasOwnProperty;

  /** Used to detect if a method is native. */
  var reIsNative = RegExp('^' +
    funcToString$1.call(hasOwnProperty$b).replace(reRegExpChar, '\\$&')
    .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
  );

  /**
   * The base implementation of `_.isNative` without bad shim checks.
   *
   * @private
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a native function,
   *  else `false`.
   */
  function baseIsNative(value) {
    if (!isObject_1(value) || _isMasked(value)) {
      return false;
    }
    var pattern = isFunction_1(value) ? reIsNative : reIsHostCtor;
    return pattern.test(_toSource(value));
  }

  var _baseIsNative = baseIsNative;

  /**
   * Gets the value at `key` of `object`.
   *
   * @private
   * @param {Object} [object] The object to query.
   * @param {string} key The key of the property to get.
   * @returns {*} Returns the property value.
   */
  function getValue(object, key) {
    return object == null ? undefined : object[key];
  }

  var _getValue = getValue;

  /**
   * Gets the native function at `key` of `object`.
   *
   * @private
   * @param {Object} object The object to query.
   * @param {string} key The key of the method to get.
   * @returns {*} Returns the function if it's native, else `undefined`.
   */
  function getNative(object, key) {
    var value = _getValue(object, key);
    return _baseIsNative(value) ? value : undefined;
  }

  var _getNative = getNative;

  /* Built-in method references that are verified to be native. */
  var Map$1 = _getNative(_root$1, 'Map');

  var _Map = Map$1;

  /* Built-in method references that are verified to be native. */
  var nativeCreate = _getNative(Object, 'create');

  var _nativeCreate = nativeCreate;

  /**
   * Removes all key-value entries from the hash.
   *
   * @private
   * @name clear
   * @memberOf Hash
   */
  function hashClear() {
    this.__data__ = _nativeCreate ? _nativeCreate(null) : {};
    this.size = 0;
  }

  var _hashClear = hashClear;

  /**
   * Removes `key` and its value from the hash.
   *
   * @private
   * @name delete
   * @memberOf Hash
   * @param {Object} hash The hash to modify.
   * @param {string} key The key of the value to remove.
   * @returns {boolean} Returns `true` if the entry was removed, else `false`.
   */
  function hashDelete(key) {
    var result = this.has(key) && delete this.__data__[key];
    this.size -= result ? 1 : 0;
    return result;
  }

  var _hashDelete = hashDelete;

  /** Used to stand-in for `undefined` hash values. */
  var HASH_UNDEFINED$2 = '__lodash_hash_undefined__';

  /** Used for built-in method references. */
  var objectProto$c = Object.prototype;

  /** Used to check objects for own properties. */
  var hasOwnProperty$a = objectProto$c.hasOwnProperty;

  /**
   * Gets the hash value for `key`.
   *
   * @private
   * @name get
   * @memberOf Hash
   * @param {string} key The key of the value to get.
   * @returns {*} Returns the entry value.
   */
  function hashGet(key) {
    var data = this.__data__;
    if (_nativeCreate) {
      var result = data[key];
      return result === HASH_UNDEFINED$2 ? undefined : result;
    }
    return hasOwnProperty$a.call(data, key) ? data[key] : undefined;
  }

  var _hashGet = hashGet;

  /** Used for built-in method references. */
  var objectProto$b = Object.prototype;

  /** Used to check objects for own properties. */
  var hasOwnProperty$9 = objectProto$b.hasOwnProperty;

  /**
   * Checks if a hash value for `key` exists.
   *
   * @private
   * @name has
   * @memberOf Hash
   * @param {string} key The key of the entry to check.
   * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
   */
  function hashHas(key) {
    var data = this.__data__;
    return _nativeCreate ? (data[key] !== undefined) : hasOwnProperty$9.call(data, key);
  }

  var _hashHas = hashHas;

  /** Used to stand-in for `undefined` hash values. */
  var HASH_UNDEFINED$1 = '__lodash_hash_undefined__';

  /**
   * Sets the hash `key` to `value`.
   *
   * @private
   * @name set
   * @memberOf Hash
   * @param {string} key The key of the value to set.
   * @param {*} value The value to set.
   * @returns {Object} Returns the hash instance.
   */
  function hashSet(key, value) {
    var data = this.__data__;
    this.size += this.has(key) ? 0 : 1;
    data[key] = (_nativeCreate && value === undefined) ? HASH_UNDEFINED$1 : value;
    return this;
  }

  var _hashSet = hashSet;

  /**
   * Creates a hash object.
   *
   * @private
   * @constructor
   * @param {Array} [entries] The key-value pairs to cache.
   */
  function Hash(entries) {
    var index = -1,
        length = entries == null ? 0 : entries.length;

    this.clear();
    while (++index < length) {
      var entry = entries[index];
      this.set(entry[0], entry[1]);
    }
  }

  // Add methods to `Hash`.
  Hash.prototype.clear = _hashClear;
  Hash.prototype['delete'] = _hashDelete;
  Hash.prototype.get = _hashGet;
  Hash.prototype.has = _hashHas;
  Hash.prototype.set = _hashSet;

  var _Hash = Hash;

  /**
   * Removes all key-value entries from the map.
   *
   * @private
   * @name clear
   * @memberOf MapCache
   */
  function mapCacheClear() {
    this.size = 0;
    this.__data__ = {
      'hash': new _Hash,
      'map': new (_Map || _ListCache),
      'string': new _Hash
    };
  }

  var _mapCacheClear = mapCacheClear;

  /**
   * Checks if `value` is suitable for use as unique object key.
   *
   * @private
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
   */
  function isKeyable(value) {
    var type = typeof value;
    return (type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean')
      ? (value !== '__proto__')
      : (value === null);
  }

  var _isKeyable = isKeyable;

  /**
   * Gets the data for `map`.
   *
   * @private
   * @param {Object} map The map to query.
   * @param {string} key The reference key.
   * @returns {*} Returns the map data.
   */
  function getMapData(map, key) {
    var data = map.__data__;
    return _isKeyable(key)
      ? data[typeof key == 'string' ? 'string' : 'hash']
      : data.map;
  }

  var _getMapData = getMapData;

  /**
   * Removes `key` and its value from the map.
   *
   * @private
   * @name delete
   * @memberOf MapCache
   * @param {string} key The key of the value to remove.
   * @returns {boolean} Returns `true` if the entry was removed, else `false`.
   */
  function mapCacheDelete(key) {
    var result = _getMapData(this, key)['delete'](key);
    this.size -= result ? 1 : 0;
    return result;
  }

  var _mapCacheDelete = mapCacheDelete;

  /**
   * Gets the map value for `key`.
   *
   * @private
   * @name get
   * @memberOf MapCache
   * @param {string} key The key of the value to get.
   * @returns {*} Returns the entry value.
   */
  function mapCacheGet(key) {
    return _getMapData(this, key).get(key);
  }

  var _mapCacheGet = mapCacheGet;

  /**
   * Checks if a map value for `key` exists.
   *
   * @private
   * @name has
   * @memberOf MapCache
   * @param {string} key The key of the entry to check.
   * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
   */
  function mapCacheHas(key) {
    return _getMapData(this, key).has(key);
  }

  var _mapCacheHas = mapCacheHas;

  /**
   * Sets the map `key` to `value`.
   *
   * @private
   * @name set
   * @memberOf MapCache
   * @param {string} key The key of the value to set.
   * @param {*} value The value to set.
   * @returns {Object} Returns the map cache instance.
   */
  function mapCacheSet(key, value) {
    var data = _getMapData(this, key),
        size = data.size;

    data.set(key, value);
    this.size += data.size == size ? 0 : 1;
    return this;
  }

  var _mapCacheSet = mapCacheSet;

  /**
   * Creates a map cache object to store key-value pairs.
   *
   * @private
   * @constructor
   * @param {Array} [entries] The key-value pairs to cache.
   */
  function MapCache(entries) {
    var index = -1,
        length = entries == null ? 0 : entries.length;

    this.clear();
    while (++index < length) {
      var entry = entries[index];
      this.set(entry[0], entry[1]);
    }
  }

  // Add methods to `MapCache`.
  MapCache.prototype.clear = _mapCacheClear;
  MapCache.prototype['delete'] = _mapCacheDelete;
  MapCache.prototype.get = _mapCacheGet;
  MapCache.prototype.has = _mapCacheHas;
  MapCache.prototype.set = _mapCacheSet;

  var _MapCache = MapCache;

  /** Used as the size to enable large array optimizations. */
  var LARGE_ARRAY_SIZE$2 = 200;

  /**
   * Sets the stack `key` to `value`.
   *
   * @private
   * @name set
   * @memberOf Stack
   * @param {string} key The key of the value to set.
   * @param {*} value The value to set.
   * @returns {Object} Returns the stack cache instance.
   */
  function stackSet(key, value) {
    var data = this.__data__;
    if (data instanceof _ListCache) {
      var pairs = data.__data__;
      if (!_Map || (pairs.length < LARGE_ARRAY_SIZE$2 - 1)) {
        pairs.push([key, value]);
        this.size = ++data.size;
        return this;
      }
      data = this.__data__ = new _MapCache(pairs);
    }
    data.set(key, value);
    this.size = data.size;
    return this;
  }

  var _stackSet = stackSet;

  /**
   * Creates a stack cache object to store key-value pairs.
   *
   * @private
   * @constructor
   * @param {Array} [entries] The key-value pairs to cache.
   */
  function Stack(entries) {
    var data = this.__data__ = new _ListCache(entries);
    this.size = data.size;
  }

  // Add methods to `Stack`.
  Stack.prototype.clear = _stackClear;
  Stack.prototype['delete'] = _stackDelete;
  Stack.prototype.get = _stackGet;
  Stack.prototype.has = _stackHas;
  Stack.prototype.set = _stackSet;

  var _Stack = Stack;

  /**
   * A specialized version of `_.forEach` for arrays without support for
   * iteratee shorthands.
   *
   * @private
   * @param {Array} [array] The array to iterate over.
   * @param {Function} iteratee The function invoked per iteration.
   * @returns {Array} Returns `array`.
   */
  function arrayEach(array, iteratee) {
    var index = -1,
        length = array == null ? 0 : array.length;

    while (++index < length) {
      if (iteratee(array[index], index, array) === false) {
        break;
      }
    }
    return array;
  }

  var _arrayEach = arrayEach;

  var defineProperty$1 = (function() {
    try {
      var func = _getNative(Object, 'defineProperty');
      func({}, '', {});
      return func;
    } catch (e) {}
  }());

  var _defineProperty = defineProperty$1;

  /**
   * The base implementation of `assignValue` and `assignMergeValue` without
   * value checks.
   *
   * @private
   * @param {Object} object The object to modify.
   * @param {string} key The key of the property to assign.
   * @param {*} value The value to assign.
   */
  function baseAssignValue(object, key, value) {
    if (key == '__proto__' && _defineProperty) {
      _defineProperty(object, key, {
        'configurable': true,
        'enumerable': true,
        'value': value,
        'writable': true
      });
    } else {
      object[key] = value;
    }
  }

  var _baseAssignValue = baseAssignValue;

  /** Used for built-in method references. */
  var objectProto$a = Object.prototype;

  /** Used to check objects for own properties. */
  var hasOwnProperty$8 = objectProto$a.hasOwnProperty;

  /**
   * Assigns `value` to `key` of `object` if the existing value is not equivalent
   * using [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
   * for equality comparisons.
   *
   * @private
   * @param {Object} object The object to modify.
   * @param {string} key The key of the property to assign.
   * @param {*} value The value to assign.
   */
  function assignValue(object, key, value) {
    var objValue = object[key];
    if (!(hasOwnProperty$8.call(object, key) && eq_1(objValue, value)) ||
        (value === undefined && !(key in object))) {
      _baseAssignValue(object, key, value);
    }
  }

  var _assignValue = assignValue;

  /**
   * Copies properties of `source` to `object`.
   *
   * @private
   * @param {Object} source The object to copy properties from.
   * @param {Array} props The property identifiers to copy.
   * @param {Object} [object={}] The object to copy properties to.
   * @param {Function} [customizer] The function to customize copied values.
   * @returns {Object} Returns `object`.
   */
  function copyObject(source, props, object, customizer) {
    var isNew = !object;
    object || (object = {});

    var index = -1,
        length = props.length;

    while (++index < length) {
      var key = props[index];

      var newValue = customizer
        ? customizer(object[key], source[key], key, object, source)
        : undefined;

      if (newValue === undefined) {
        newValue = source[key];
      }
      if (isNew) {
        _baseAssignValue(object, key, newValue);
      } else {
        _assignValue(object, key, newValue);
      }
    }
    return object;
  }

  var _copyObject = copyObject;

  /**
   * The base implementation of `_.times` without support for iteratee shorthands
   * or max array length checks.
   *
   * @private
   * @param {number} n The number of times to invoke `iteratee`.
   * @param {Function} iteratee The function invoked per iteration.
   * @returns {Array} Returns the array of results.
   */
  function baseTimes(n, iteratee) {
    var index = -1,
        result = Array(n);

    while (++index < n) {
      result[index] = iteratee(index);
    }
    return result;
  }

  var _baseTimes = baseTimes;

  /**
   * Checks if `value` is object-like. A value is object-like if it's not `null`
   * and has a `typeof` result of "object".
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
   * @example
   *
   * _.isObjectLike({});
   * // => true
   *
   * _.isObjectLike([1, 2, 3]);
   * // => true
   *
   * _.isObjectLike(_.noop);
   * // => false
   *
   * _.isObjectLike(null);
   * // => false
   */
  function isObjectLike(value) {
    return value != null && typeof value == 'object';
  }

  var isObjectLike_1 = isObjectLike;

  /** `Object#toString` result references. */
  var argsTag$3 = '[object Arguments]';

  /**
   * The base implementation of `_.isArguments`.
   *
   * @private
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is an `arguments` object,
   */
  function baseIsArguments(value) {
    return isObjectLike_1(value) && _baseGetTag(value) == argsTag$3;
  }

  var _baseIsArguments = baseIsArguments;

  /** Used for built-in method references. */
  var objectProto$9 = Object.prototype;

  /** Used to check objects for own properties. */
  var hasOwnProperty$7 = objectProto$9.hasOwnProperty;

  /** Built-in value references. */
  var propertyIsEnumerable$1 = objectProto$9.propertyIsEnumerable;

  /**
   * Checks if `value` is likely an `arguments` object.
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is an `arguments` object,
   *  else `false`.
   * @example
   *
   * _.isArguments(function() { return arguments; }());
   * // => true
   *
   * _.isArguments([1, 2, 3]);
   * // => false
   */
  var isArguments = _baseIsArguments(function() { return arguments; }()) ? _baseIsArguments : function(value) {
    return isObjectLike_1(value) && hasOwnProperty$7.call(value, 'callee') &&
      !propertyIsEnumerable$1.call(value, 'callee');
  };

  var isArguments_1 = isArguments;

  /**
   * Checks if `value` is classified as an `Array` object.
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is an array, else `false`.
   * @example
   *
   * _.isArray([1, 2, 3]);
   * // => true
   *
   * _.isArray(document.body.children);
   * // => false
   *
   * _.isArray('abc');
   * // => false
   *
   * _.isArray(_.noop);
   * // => false
   */
  var isArray = Array.isArray;

  var isArray_1 = isArray;

  /**
   * This method returns `false`.
   *
   * @static
   * @memberOf _
   * @since 4.13.0
   * @category Util
   * @returns {boolean} Returns `false`.
   * @example
   *
   * _.times(2, _.stubFalse);
   * // => [false, false]
   */
  function stubFalse() {
    return false;
  }

  var stubFalse_1 = stubFalse;

  var isBuffer_1 = createCommonjsModule(function (module, exports) {
  /** Detect free variable `exports`. */
  var freeExports = exports && !exports.nodeType && exports;

  /** Detect free variable `module`. */
  var freeModule = freeExports && 'object' == 'object' && module && !module.nodeType && module;

  /** Detect the popular CommonJS extension `module.exports`. */
  var moduleExports = freeModule && freeModule.exports === freeExports;

  /** Built-in value references. */
  var Buffer = moduleExports ? _root$1.Buffer : undefined;

  /* Built-in method references for those with the same name as other `lodash` methods. */
  var nativeIsBuffer = Buffer ? Buffer.isBuffer : undefined;

  /**
   * Checks if `value` is a buffer.
   *
   * @static
   * @memberOf _
   * @since 4.3.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a buffer, else `false`.
   * @example
   *
   * _.isBuffer(new Buffer(2));
   * // => true
   *
   * _.isBuffer(new Uint8Array(2));
   * // => false
   */
  var isBuffer = nativeIsBuffer || stubFalse_1;

  module.exports = isBuffer;
  });

  /** Used as references for various `Number` constants. */
  var MAX_SAFE_INTEGER$1 = 9007199254740991;

  /** Used to detect unsigned integer values. */
  var reIsUint = /^(?:0|[1-9]\d*)$/;

  /**
   * Checks if `value` is a valid array-like index.
   *
   * @private
   * @param {*} value The value to check.
   * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
   * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
   */
  function isIndex(value, length) {
    var type = typeof value;
    length = length == null ? MAX_SAFE_INTEGER$1 : length;

    return !!length &&
      (type == 'number' ||
        (type != 'symbol' && reIsUint.test(value))) &&
          (value > -1 && value % 1 == 0 && value < length);
  }

  var _isIndex = isIndex;

  /** Used as references for various `Number` constants. */
  var MAX_SAFE_INTEGER = 9007199254740991;

  /**
   * Checks if `value` is a valid array-like length.
   *
   * **Note:** This method is loosely based on
   * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
   * @example
   *
   * _.isLength(3);
   * // => true
   *
   * _.isLength(Number.MIN_VALUE);
   * // => false
   *
   * _.isLength(Infinity);
   * // => false
   *
   * _.isLength('3');
   * // => false
   */
  function isLength(value) {
    return typeof value == 'number' &&
      value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
  }

  var isLength_1 = isLength;

  /** `Object#toString` result references. */
  var argsTag$2 = '[object Arguments]',
      arrayTag$2 = '[object Array]',
      boolTag$3 = '[object Boolean]',
      dateTag$3 = '[object Date]',
      errorTag$2 = '[object Error]',
      funcTag$1 = '[object Function]',
      mapTag$5 = '[object Map]',
      numberTag$3 = '[object Number]',
      objectTag$4 = '[object Object]',
      regexpTag$4 = '[object RegExp]',
      setTag$5 = '[object Set]',
      stringTag$3 = '[object String]',
      weakMapTag$2 = '[object WeakMap]';

  var arrayBufferTag$3 = '[object ArrayBuffer]',
      dataViewTag$4 = '[object DataView]',
      float32Tag$2 = '[object Float32Array]',
      float64Tag$2 = '[object Float64Array]',
      int8Tag$2 = '[object Int8Array]',
      int16Tag$2 = '[object Int16Array]',
      int32Tag$2 = '[object Int32Array]',
      uint8Tag$2 = '[object Uint8Array]',
      uint8ClampedTag$2 = '[object Uint8ClampedArray]',
      uint16Tag$2 = '[object Uint16Array]',
      uint32Tag$2 = '[object Uint32Array]';

  /** Used to identify `toStringTag` values of typed arrays. */
  var typedArrayTags = {};
  typedArrayTags[float32Tag$2] = typedArrayTags[float64Tag$2] =
  typedArrayTags[int8Tag$2] = typedArrayTags[int16Tag$2] =
  typedArrayTags[int32Tag$2] = typedArrayTags[uint8Tag$2] =
  typedArrayTags[uint8ClampedTag$2] = typedArrayTags[uint16Tag$2] =
  typedArrayTags[uint32Tag$2] = true;
  typedArrayTags[argsTag$2] = typedArrayTags[arrayTag$2] =
  typedArrayTags[arrayBufferTag$3] = typedArrayTags[boolTag$3] =
  typedArrayTags[dataViewTag$4] = typedArrayTags[dateTag$3] =
  typedArrayTags[errorTag$2] = typedArrayTags[funcTag$1] =
  typedArrayTags[mapTag$5] = typedArrayTags[numberTag$3] =
  typedArrayTags[objectTag$4] = typedArrayTags[regexpTag$4] =
  typedArrayTags[setTag$5] = typedArrayTags[stringTag$3] =
  typedArrayTags[weakMapTag$2] = false;

  /**
   * The base implementation of `_.isTypedArray` without Node.js optimizations.
   *
   * @private
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
   */
  function baseIsTypedArray(value) {
    return isObjectLike_1(value) &&
      isLength_1(value.length) && !!typedArrayTags[_baseGetTag(value)];
  }

  var _baseIsTypedArray = baseIsTypedArray;

  /**
   * The base implementation of `_.unary` without support for storing metadata.
   *
   * @private
   * @param {Function} func The function to cap arguments for.
   * @returns {Function} Returns the new capped function.
   */
  function baseUnary(func) {
    return function(value) {
      return func(value);
    };
  }

  var _baseUnary = baseUnary;

  var _nodeUtil = createCommonjsModule(function (module, exports) {
  /** Detect free variable `exports`. */
  var freeExports = exports && !exports.nodeType && exports;

  /** Detect free variable `module`. */
  var freeModule = freeExports && 'object' == 'object' && module && !module.nodeType && module;

  /** Detect the popular CommonJS extension `module.exports`. */
  var moduleExports = freeModule && freeModule.exports === freeExports;

  /** Detect free variable `process` from Node.js. */
  var freeProcess = moduleExports && _freeGlobal.process;

  /** Used to access faster Node.js helpers. */
  var nodeUtil = (function() {
    try {
      // Use `util.types` for Node.js 10+.
      var types = freeModule && freeModule.require && freeModule.require('util').types;

      if (types) {
        return types;
      }

      // Legacy `process.binding('util')` for Node.js < 10.
      return freeProcess && freeProcess.binding && freeProcess.binding('util');
    } catch (e) {}
  }());

  module.exports = nodeUtil;
  });

  /* Node.js helper references. */
  var nodeIsTypedArray = _nodeUtil && _nodeUtil.isTypedArray;

  /**
   * Checks if `value` is classified as a typed array.
   *
   * @static
   * @memberOf _
   * @since 3.0.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
   * @example
   *
   * _.isTypedArray(new Uint8Array);
   * // => true
   *
   * _.isTypedArray([]);
   * // => false
   */
  var isTypedArray = nodeIsTypedArray ? _baseUnary(nodeIsTypedArray) : _baseIsTypedArray;

  var isTypedArray_1 = isTypedArray;

  /** Used for built-in method references. */
  var objectProto$8 = Object.prototype;

  /** Used to check objects for own properties. */
  var hasOwnProperty$6 = objectProto$8.hasOwnProperty;

  /**
   * Creates an array of the enumerable property names of the array-like `value`.
   *
   * @private
   * @param {*} value The value to query.
   * @param {boolean} inherited Specify returning inherited property names.
   * @returns {Array} Returns the array of property names.
   */
  function arrayLikeKeys(value, inherited) {
    var isArr = isArray_1(value),
        isArg = !isArr && isArguments_1(value),
        isBuff = !isArr && !isArg && isBuffer_1(value),
        isType = !isArr && !isArg && !isBuff && isTypedArray_1(value),
        skipIndexes = isArr || isArg || isBuff || isType,
        result = skipIndexes ? _baseTimes(value.length, String) : [],
        length = result.length;

    for (var key in value) {
      if ((inherited || hasOwnProperty$6.call(value, key)) &&
          !(skipIndexes && (
             // Safari 9 has enumerable `arguments.length` in strict mode.
             key == 'length' ||
             // Node.js 0.10 has enumerable non-index properties on buffers.
             (isBuff && (key == 'offset' || key == 'parent')) ||
             // PhantomJS 2 has enumerable non-index properties on typed arrays.
             (isType && (key == 'buffer' || key == 'byteLength' || key == 'byteOffset')) ||
             // Skip index properties.
             _isIndex(key, length)
          ))) {
        result.push(key);
      }
    }
    return result;
  }

  var _arrayLikeKeys = arrayLikeKeys;

  /** Used for built-in method references. */
  var objectProto$7 = Object.prototype;

  /**
   * Checks if `value` is likely a prototype object.
   *
   * @private
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
   */
  function isPrototype(value) {
    var Ctor = value && value.constructor,
        proto = (typeof Ctor == 'function' && Ctor.prototype) || objectProto$7;

    return value === proto;
  }

  var _isPrototype = isPrototype;

  /**
   * Creates a unary function that invokes `func` with its argument transformed.
   *
   * @private
   * @param {Function} func The function to wrap.
   * @param {Function} transform The argument transform.
   * @returns {Function} Returns the new function.
   */
  function overArg(func, transform) {
    return function(arg) {
      return func(transform(arg));
    };
  }

  var _overArg = overArg;

  /* Built-in method references for those with the same name as other `lodash` methods. */
  var nativeKeys = _overArg(Object.keys, Object);

  var _nativeKeys = nativeKeys;

  /** Used for built-in method references. */
  var objectProto$6 = Object.prototype;

  /** Used to check objects for own properties. */
  var hasOwnProperty$5 = objectProto$6.hasOwnProperty;

  /**
   * The base implementation of `_.keys` which doesn't treat sparse arrays as dense.
   *
   * @private
   * @param {Object} object The object to query.
   * @returns {Array} Returns the array of property names.
   */
  function baseKeys(object) {
    if (!_isPrototype(object)) {
      return _nativeKeys(object);
    }
    var result = [];
    for (var key in Object(object)) {
      if (hasOwnProperty$5.call(object, key) && key != 'constructor') {
        result.push(key);
      }
    }
    return result;
  }

  var _baseKeys = baseKeys;

  /**
   * Checks if `value` is array-like. A value is considered array-like if it's
   * not a function and has a `value.length` that's an integer greater than or
   * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
   * @example
   *
   * _.isArrayLike([1, 2, 3]);
   * // => true
   *
   * _.isArrayLike(document.body.children);
   * // => true
   *
   * _.isArrayLike('abc');
   * // => true
   *
   * _.isArrayLike(_.noop);
   * // => false
   */
  function isArrayLike(value) {
    return value != null && isLength_1(value.length) && !isFunction_1(value);
  }

  var isArrayLike_1 = isArrayLike;

  /**
   * Creates an array of the own enumerable property names of `object`.
   *
   * **Note:** Non-object values are coerced to objects. See the
   * [ES spec](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
   * for more details.
   *
   * @static
   * @since 0.1.0
   * @memberOf _
   * @category Object
   * @param {Object} object The object to query.
   * @returns {Array} Returns the array of property names.
   * @example
   *
   * function Foo() {
   *   this.a = 1;
   *   this.b = 2;
   * }
   *
   * Foo.prototype.c = 3;
   *
   * _.keys(new Foo);
   * // => ['a', 'b'] (iteration order is not guaranteed)
   *
   * _.keys('hi');
   * // => ['0', '1']
   */
  function keys(object) {
    return isArrayLike_1(object) ? _arrayLikeKeys(object) : _baseKeys(object);
  }

  var keys_1 = keys;

  /**
   * The base implementation of `_.assign` without support for multiple sources
   * or `customizer` functions.
   *
   * @private
   * @param {Object} object The destination object.
   * @param {Object} source The source object.
   * @returns {Object} Returns `object`.
   */
  function baseAssign(object, source) {
    return object && _copyObject(source, keys_1(source), object);
  }

  var _baseAssign = baseAssign;

  /**
   * This function is like
   * [`Object.keys`](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
   * except that it includes inherited enumerable properties.
   *
   * @private
   * @param {Object} object The object to query.
   * @returns {Array} Returns the array of property names.
   */
  function nativeKeysIn(object) {
    var result = [];
    if (object != null) {
      for (var key in Object(object)) {
        result.push(key);
      }
    }
    return result;
  }

  var _nativeKeysIn = nativeKeysIn;

  /** Used for built-in method references. */
  var objectProto$5 = Object.prototype;

  /** Used to check objects for own properties. */
  var hasOwnProperty$4 = objectProto$5.hasOwnProperty;

  /**
   * The base implementation of `_.keysIn` which doesn't treat sparse arrays as dense.
   *
   * @private
   * @param {Object} object The object to query.
   * @returns {Array} Returns the array of property names.
   */
  function baseKeysIn(object) {
    if (!isObject_1(object)) {
      return _nativeKeysIn(object);
    }
    var isProto = _isPrototype(object),
        result = [];

    for (var key in object) {
      if (!(key == 'constructor' && (isProto || !hasOwnProperty$4.call(object, key)))) {
        result.push(key);
      }
    }
    return result;
  }

  var _baseKeysIn = baseKeysIn;

  /**
   * Creates an array of the own and inherited enumerable property names of `object`.
   *
   * **Note:** Non-object values are coerced to objects.
   *
   * @static
   * @memberOf _
   * @since 3.0.0
   * @category Object
   * @param {Object} object The object to query.
   * @returns {Array} Returns the array of property names.
   * @example
   *
   * function Foo() {
   *   this.a = 1;
   *   this.b = 2;
   * }
   *
   * Foo.prototype.c = 3;
   *
   * _.keysIn(new Foo);
   * // => ['a', 'b', 'c'] (iteration order is not guaranteed)
   */
  function keysIn(object) {
    return isArrayLike_1(object) ? _arrayLikeKeys(object, true) : _baseKeysIn(object);
  }

  var keysIn_1 = keysIn;

  /**
   * The base implementation of `_.assignIn` without support for multiple sources
   * or `customizer` functions.
   *
   * @private
   * @param {Object} object The destination object.
   * @param {Object} source The source object.
   * @returns {Object} Returns `object`.
   */
  function baseAssignIn(object, source) {
    return object && _copyObject(source, keysIn_1(source), object);
  }

  var _baseAssignIn = baseAssignIn;

  var _cloneBuffer = createCommonjsModule(function (module, exports) {
  /** Detect free variable `exports`. */
  var freeExports = exports && !exports.nodeType && exports;

  /** Detect free variable `module`. */
  var freeModule = freeExports && 'object' == 'object' && module && !module.nodeType && module;

  /** Detect the popular CommonJS extension `module.exports`. */
  var moduleExports = freeModule && freeModule.exports === freeExports;

  /** Built-in value references. */
  var Buffer = moduleExports ? _root$1.Buffer : undefined,
      allocUnsafe = Buffer ? Buffer.allocUnsafe : undefined;

  /**
   * Creates a clone of  `buffer`.
   *
   * @private
   * @param {Buffer} buffer The buffer to clone.
   * @param {boolean} [isDeep] Specify a deep clone.
   * @returns {Buffer} Returns the cloned buffer.
   */
  function cloneBuffer(buffer, isDeep) {
    if (isDeep) {
      return buffer.slice();
    }
    var length = buffer.length,
        result = allocUnsafe ? allocUnsafe(length) : new buffer.constructor(length);

    buffer.copy(result);
    return result;
  }

  module.exports = cloneBuffer;
  });

  /**
   * Copies the values of `source` to `array`.
   *
   * @private
   * @param {Array} source The array to copy values from.
   * @param {Array} [array=[]] The array to copy values to.
   * @returns {Array} Returns `array`.
   */
  function copyArray(source, array) {
    var index = -1,
        length = source.length;

    array || (array = Array(length));
    while (++index < length) {
      array[index] = source[index];
    }
    return array;
  }

  var _copyArray = copyArray;

  /**
   * A specialized version of `_.filter` for arrays without support for
   * iteratee shorthands.
   *
   * @private
   * @param {Array} [array] The array to iterate over.
   * @param {Function} predicate The function invoked per iteration.
   * @returns {Array} Returns the new filtered array.
   */
  function arrayFilter(array, predicate) {
    var index = -1,
        length = array == null ? 0 : array.length,
        resIndex = 0,
        result = [];

    while (++index < length) {
      var value = array[index];
      if (predicate(value, index, array)) {
        result[resIndex++] = value;
      }
    }
    return result;
  }

  var _arrayFilter = arrayFilter;

  /**
   * This method returns a new empty array.
   *
   * @static
   * @memberOf _
   * @since 4.13.0
   * @category Util
   * @returns {Array} Returns the new empty array.
   * @example
   *
   * var arrays = _.times(2, _.stubArray);
   *
   * console.log(arrays);
   * // => [[], []]
   *
   * console.log(arrays[0] === arrays[1]);
   * // => false
   */
  function stubArray() {
    return [];
  }

  var stubArray_1 = stubArray;

  /** Used for built-in method references. */
  var objectProto$4 = Object.prototype;

  /** Built-in value references. */
  var propertyIsEnumerable = objectProto$4.propertyIsEnumerable;

  /* Built-in method references for those with the same name as other `lodash` methods. */
  var nativeGetSymbols$1 = Object.getOwnPropertySymbols;

  /**
   * Creates an array of the own enumerable symbols of `object`.
   *
   * @private
   * @param {Object} object The object to query.
   * @returns {Array} Returns the array of symbols.
   */
  var getSymbols = !nativeGetSymbols$1 ? stubArray_1 : function(object) {
    if (object == null) {
      return [];
    }
    object = Object(object);
    return _arrayFilter(nativeGetSymbols$1(object), function(symbol) {
      return propertyIsEnumerable.call(object, symbol);
    });
  };

  var _getSymbols = getSymbols;

  /**
   * Copies own symbols of `source` to `object`.
   *
   * @private
   * @param {Object} source The object to copy symbols from.
   * @param {Object} [object={}] The object to copy symbols to.
   * @returns {Object} Returns `object`.
   */
  function copySymbols(source, object) {
    return _copyObject(source, _getSymbols(source), object);
  }

  var _copySymbols = copySymbols;

  /**
   * Appends the elements of `values` to `array`.
   *
   * @private
   * @param {Array} array The array to modify.
   * @param {Array} values The values to append.
   * @returns {Array} Returns `array`.
   */
  function arrayPush(array, values) {
    var index = -1,
        length = values.length,
        offset = array.length;

    while (++index < length) {
      array[offset + index] = values[index];
    }
    return array;
  }

  var _arrayPush = arrayPush;

  /** Built-in value references. */
  var getPrototype = _overArg(Object.getPrototypeOf, Object);

  var _getPrototype = getPrototype;

  /* Built-in method references for those with the same name as other `lodash` methods. */
  var nativeGetSymbols = Object.getOwnPropertySymbols;

  /**
   * Creates an array of the own and inherited enumerable symbols of `object`.
   *
   * @private
   * @param {Object} object The object to query.
   * @returns {Array} Returns the array of symbols.
   */
  var getSymbolsIn = !nativeGetSymbols ? stubArray_1 : function(object) {
    var result = [];
    while (object) {
      _arrayPush(result, _getSymbols(object));
      object = _getPrototype(object);
    }
    return result;
  };

  var _getSymbolsIn = getSymbolsIn;

  /**
   * Copies own and inherited symbols of `source` to `object`.
   *
   * @private
   * @param {Object} source The object to copy symbols from.
   * @param {Object} [object={}] The object to copy symbols to.
   * @returns {Object} Returns `object`.
   */
  function copySymbolsIn(source, object) {
    return _copyObject(source, _getSymbolsIn(source), object);
  }

  var _copySymbolsIn = copySymbolsIn;

  /**
   * The base implementation of `getAllKeys` and `getAllKeysIn` which uses
   * `keysFunc` and `symbolsFunc` to get the enumerable property names and
   * symbols of `object`.
   *
   * @private
   * @param {Object} object The object to query.
   * @param {Function} keysFunc The function to get the keys of `object`.
   * @param {Function} symbolsFunc The function to get the symbols of `object`.
   * @returns {Array} Returns the array of property names and symbols.
   */
  function baseGetAllKeys(object, keysFunc, symbolsFunc) {
    var result = keysFunc(object);
    return isArray_1(object) ? result : _arrayPush(result, symbolsFunc(object));
  }

  var _baseGetAllKeys = baseGetAllKeys;

  /**
   * Creates an array of own enumerable property names and symbols of `object`.
   *
   * @private
   * @param {Object} object The object to query.
   * @returns {Array} Returns the array of property names and symbols.
   */
  function getAllKeys(object) {
    return _baseGetAllKeys(object, keys_1, _getSymbols);
  }

  var _getAllKeys = getAllKeys;

  /**
   * Creates an array of own and inherited enumerable property names and
   * symbols of `object`.
   *
   * @private
   * @param {Object} object The object to query.
   * @returns {Array} Returns the array of property names and symbols.
   */
  function getAllKeysIn(object) {
    return _baseGetAllKeys(object, keysIn_1, _getSymbolsIn);
  }

  var _getAllKeysIn = getAllKeysIn;

  /* Built-in method references that are verified to be native. */
  var DataView = _getNative(_root$1, 'DataView');

  var _DataView = DataView;

  /* Built-in method references that are verified to be native. */
  var Promise$1 = _getNative(_root$1, 'Promise');

  var _Promise = Promise$1;

  /* Built-in method references that are verified to be native. */
  var Set$1 = _getNative(_root$1, 'Set');

  var _Set = Set$1;

  /* Built-in method references that are verified to be native. */
  var WeakMap$1 = _getNative(_root$1, 'WeakMap');

  var _WeakMap = WeakMap$1;

  /** `Object#toString` result references. */
  var mapTag$4 = '[object Map]',
      objectTag$3 = '[object Object]',
      promiseTag = '[object Promise]',
      setTag$4 = '[object Set]',
      weakMapTag$1 = '[object WeakMap]';

  var dataViewTag$3 = '[object DataView]';

  /** Used to detect maps, sets, and weakmaps. */
  var dataViewCtorString = _toSource(_DataView),
      mapCtorString = _toSource(_Map),
      promiseCtorString = _toSource(_Promise),
      setCtorString = _toSource(_Set),
      weakMapCtorString = _toSource(_WeakMap);

  /**
   * Gets the `toStringTag` of `value`.
   *
   * @private
   * @param {*} value The value to query.
   * @returns {string} Returns the `toStringTag`.
   */
  var getTag = _baseGetTag;

  // Fallback for data views, maps, sets, and weak maps in IE 11 and promises in Node.js < 6.
  if ((_DataView && getTag(new _DataView(new ArrayBuffer(1))) != dataViewTag$3) ||
      (_Map && getTag(new _Map) != mapTag$4) ||
      (_Promise && getTag(_Promise.resolve()) != promiseTag) ||
      (_Set && getTag(new _Set) != setTag$4) ||
      (_WeakMap && getTag(new _WeakMap) != weakMapTag$1)) {
    getTag = function(value) {
      var result = _baseGetTag(value),
          Ctor = result == objectTag$3 ? value.constructor : undefined,
          ctorString = Ctor ? _toSource(Ctor) : '';

      if (ctorString) {
        switch (ctorString) {
          case dataViewCtorString: return dataViewTag$3;
          case mapCtorString: return mapTag$4;
          case promiseCtorString: return promiseTag;
          case setCtorString: return setTag$4;
          case weakMapCtorString: return weakMapTag$1;
        }
      }
      return result;
    };
  }

  var _getTag = getTag;

  /** Used for built-in method references. */
  var objectProto$3 = Object.prototype;

  /** Used to check objects for own properties. */
  var hasOwnProperty$3 = objectProto$3.hasOwnProperty;

  /**
   * Initializes an array clone.
   *
   * @private
   * @param {Array} array The array to clone.
   * @returns {Array} Returns the initialized clone.
   */
  function initCloneArray(array) {
    var length = array.length,
        result = new array.constructor(length);

    // Add properties assigned by `RegExp#exec`.
    if (length && typeof array[0] == 'string' && hasOwnProperty$3.call(array, 'index')) {
      result.index = array.index;
      result.input = array.input;
    }
    return result;
  }

  var _initCloneArray = initCloneArray;

  /** Built-in value references. */
  var Uint8Array$1 = _root$1.Uint8Array;

  var _Uint8Array = Uint8Array$1;

  /**
   * Creates a clone of `arrayBuffer`.
   *
   * @private
   * @param {ArrayBuffer} arrayBuffer The array buffer to clone.
   * @returns {ArrayBuffer} Returns the cloned array buffer.
   */
  function cloneArrayBuffer(arrayBuffer) {
    var result = new arrayBuffer.constructor(arrayBuffer.byteLength);
    new _Uint8Array(result).set(new _Uint8Array(arrayBuffer));
    return result;
  }

  var _cloneArrayBuffer = cloneArrayBuffer;

  /**
   * Creates a clone of `dataView`.
   *
   * @private
   * @param {Object} dataView The data view to clone.
   * @param {boolean} [isDeep] Specify a deep clone.
   * @returns {Object} Returns the cloned data view.
   */
  function cloneDataView(dataView, isDeep) {
    var buffer = isDeep ? _cloneArrayBuffer(dataView.buffer) : dataView.buffer;
    return new dataView.constructor(buffer, dataView.byteOffset, dataView.byteLength);
  }

  var _cloneDataView = cloneDataView;

  /** Used to match `RegExp` flags from their coerced string values. */
  var reFlags = /\w*$/;

  /**
   * Creates a clone of `regexp`.
   *
   * @private
   * @param {Object} regexp The regexp to clone.
   * @returns {Object} Returns the cloned regexp.
   */
  function cloneRegExp(regexp) {
    var result = new regexp.constructor(regexp.source, reFlags.exec(regexp));
    result.lastIndex = regexp.lastIndex;
    return result;
  }

  var _cloneRegExp = cloneRegExp;

  /** Used to convert symbols to primitives and strings. */
  var symbolProto$2 = _Symbol ? _Symbol.prototype : undefined,
      symbolValueOf$1 = symbolProto$2 ? symbolProto$2.valueOf : undefined;

  /**
   * Creates a clone of the `symbol` object.
   *
   * @private
   * @param {Object} symbol The symbol object to clone.
   * @returns {Object} Returns the cloned symbol object.
   */
  function cloneSymbol(symbol) {
    return symbolValueOf$1 ? Object(symbolValueOf$1.call(symbol)) : {};
  }

  var _cloneSymbol = cloneSymbol;

  /**
   * Creates a clone of `typedArray`.
   *
   * @private
   * @param {Object} typedArray The typed array to clone.
   * @param {boolean} [isDeep] Specify a deep clone.
   * @returns {Object} Returns the cloned typed array.
   */
  function cloneTypedArray(typedArray, isDeep) {
    var buffer = isDeep ? _cloneArrayBuffer(typedArray.buffer) : typedArray.buffer;
    return new typedArray.constructor(buffer, typedArray.byteOffset, typedArray.length);
  }

  var _cloneTypedArray = cloneTypedArray;

  /** `Object#toString` result references. */
  var boolTag$2 = '[object Boolean]',
      dateTag$2 = '[object Date]',
      mapTag$3 = '[object Map]',
      numberTag$2 = '[object Number]',
      regexpTag$3 = '[object RegExp]',
      setTag$3 = '[object Set]',
      stringTag$2 = '[object String]',
      symbolTag$3 = '[object Symbol]';

  var arrayBufferTag$2 = '[object ArrayBuffer]',
      dataViewTag$2 = '[object DataView]',
      float32Tag$1 = '[object Float32Array]',
      float64Tag$1 = '[object Float64Array]',
      int8Tag$1 = '[object Int8Array]',
      int16Tag$1 = '[object Int16Array]',
      int32Tag$1 = '[object Int32Array]',
      uint8Tag$1 = '[object Uint8Array]',
      uint8ClampedTag$1 = '[object Uint8ClampedArray]',
      uint16Tag$1 = '[object Uint16Array]',
      uint32Tag$1 = '[object Uint32Array]';

  /**
   * Initializes an object clone based on its `toStringTag`.
   *
   * **Note:** This function only supports cloning values with tags of
   * `Boolean`, `Date`, `Error`, `Map`, `Number`, `RegExp`, `Set`, or `String`.
   *
   * @private
   * @param {Object} object The object to clone.
   * @param {string} tag The `toStringTag` of the object to clone.
   * @param {boolean} [isDeep] Specify a deep clone.
   * @returns {Object} Returns the initialized clone.
   */
  function initCloneByTag(object, tag, isDeep) {
    var Ctor = object.constructor;
    switch (tag) {
      case arrayBufferTag$2:
        return _cloneArrayBuffer(object);

      case boolTag$2:
      case dateTag$2:
        return new Ctor(+object);

      case dataViewTag$2:
        return _cloneDataView(object, isDeep);

      case float32Tag$1: case float64Tag$1:
      case int8Tag$1: case int16Tag$1: case int32Tag$1:
      case uint8Tag$1: case uint8ClampedTag$1: case uint16Tag$1: case uint32Tag$1:
        return _cloneTypedArray(object, isDeep);

      case mapTag$3:
        return new Ctor;

      case numberTag$2:
      case stringTag$2:
        return new Ctor(object);

      case regexpTag$3:
        return _cloneRegExp(object);

      case setTag$3:
        return new Ctor;

      case symbolTag$3:
        return _cloneSymbol(object);
    }
  }

  var _initCloneByTag = initCloneByTag;

  /** Built-in value references. */
  var objectCreate = Object.create;

  /**
   * The base implementation of `_.create` without support for assigning
   * properties to the created object.
   *
   * @private
   * @param {Object} proto The object to inherit from.
   * @returns {Object} Returns the new object.
   */
  var baseCreate = (function() {
    function object() {}
    return function(proto) {
      if (!isObject_1(proto)) {
        return {};
      }
      if (objectCreate) {
        return objectCreate(proto);
      }
      object.prototype = proto;
      var result = new object;
      object.prototype = undefined;
      return result;
    };
  }());

  var _baseCreate = baseCreate;

  /**
   * Initializes an object clone.
   *
   * @private
   * @param {Object} object The object to clone.
   * @returns {Object} Returns the initialized clone.
   */
  function initCloneObject(object) {
    return (typeof object.constructor == 'function' && !_isPrototype(object))
      ? _baseCreate(_getPrototype(object))
      : {};
  }

  var _initCloneObject = initCloneObject;

  /** `Object#toString` result references. */
  var mapTag$2 = '[object Map]';

  /**
   * The base implementation of `_.isMap` without Node.js optimizations.
   *
   * @private
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a map, else `false`.
   */
  function baseIsMap(value) {
    return isObjectLike_1(value) && _getTag(value) == mapTag$2;
  }

  var _baseIsMap = baseIsMap;

  /* Node.js helper references. */
  var nodeIsMap = _nodeUtil && _nodeUtil.isMap;

  /**
   * Checks if `value` is classified as a `Map` object.
   *
   * @static
   * @memberOf _
   * @since 4.3.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a map, else `false`.
   * @example
   *
   * _.isMap(new Map);
   * // => true
   *
   * _.isMap(new WeakMap);
   * // => false
   */
  var isMap = nodeIsMap ? _baseUnary(nodeIsMap) : _baseIsMap;

  var isMap_1 = isMap;

  /** `Object#toString` result references. */
  var setTag$2 = '[object Set]';

  /**
   * The base implementation of `_.isSet` without Node.js optimizations.
   *
   * @private
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a set, else `false`.
   */
  function baseIsSet(value) {
    return isObjectLike_1(value) && _getTag(value) == setTag$2;
  }

  var _baseIsSet = baseIsSet;

  /* Node.js helper references. */
  var nodeIsSet = _nodeUtil && _nodeUtil.isSet;

  /**
   * Checks if `value` is classified as a `Set` object.
   *
   * @static
   * @memberOf _
   * @since 4.3.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a set, else `false`.
   * @example
   *
   * _.isSet(new Set);
   * // => true
   *
   * _.isSet(new WeakSet);
   * // => false
   */
  var isSet = nodeIsSet ? _baseUnary(nodeIsSet) : _baseIsSet;

  var isSet_1 = isSet;

  /** Used to compose bitmasks for cloning. */
  var CLONE_DEEP_FLAG$1 = 1,
      CLONE_FLAT_FLAG = 2,
      CLONE_SYMBOLS_FLAG$2 = 4;

  /** `Object#toString` result references. */
  var argsTag$1 = '[object Arguments]',
      arrayTag$1 = '[object Array]',
      boolTag$1 = '[object Boolean]',
      dateTag$1 = '[object Date]',
      errorTag$1 = '[object Error]',
      funcTag = '[object Function]',
      genTag = '[object GeneratorFunction]',
      mapTag$1 = '[object Map]',
      numberTag$1 = '[object Number]',
      objectTag$2 = '[object Object]',
      regexpTag$2 = '[object RegExp]',
      setTag$1 = '[object Set]',
      stringTag$1 = '[object String]',
      symbolTag$2 = '[object Symbol]',
      weakMapTag = '[object WeakMap]';

  var arrayBufferTag$1 = '[object ArrayBuffer]',
      dataViewTag$1 = '[object DataView]',
      float32Tag = '[object Float32Array]',
      float64Tag = '[object Float64Array]',
      int8Tag = '[object Int8Array]',
      int16Tag = '[object Int16Array]',
      int32Tag = '[object Int32Array]',
      uint8Tag = '[object Uint8Array]',
      uint8ClampedTag = '[object Uint8ClampedArray]',
      uint16Tag = '[object Uint16Array]',
      uint32Tag = '[object Uint32Array]';

  /** Used to identify `toStringTag` values supported by `_.clone`. */
  var cloneableTags = {};
  cloneableTags[argsTag$1] = cloneableTags[arrayTag$1] =
  cloneableTags[arrayBufferTag$1] = cloneableTags[dataViewTag$1] =
  cloneableTags[boolTag$1] = cloneableTags[dateTag$1] =
  cloneableTags[float32Tag] = cloneableTags[float64Tag] =
  cloneableTags[int8Tag] = cloneableTags[int16Tag] =
  cloneableTags[int32Tag] = cloneableTags[mapTag$1] =
  cloneableTags[numberTag$1] = cloneableTags[objectTag$2] =
  cloneableTags[regexpTag$2] = cloneableTags[setTag$1] =
  cloneableTags[stringTag$1] = cloneableTags[symbolTag$2] =
  cloneableTags[uint8Tag] = cloneableTags[uint8ClampedTag] =
  cloneableTags[uint16Tag] = cloneableTags[uint32Tag] = true;
  cloneableTags[errorTag$1] = cloneableTags[funcTag] =
  cloneableTags[weakMapTag] = false;

  /**
   * The base implementation of `_.clone` and `_.cloneDeep` which tracks
   * traversed objects.
   *
   * @private
   * @param {*} value The value to clone.
   * @param {boolean} bitmask The bitmask flags.
   *  1 - Deep clone
   *  2 - Flatten inherited properties
   *  4 - Clone symbols
   * @param {Function} [customizer] The function to customize cloning.
   * @param {string} [key] The key of `value`.
   * @param {Object} [object] The parent object of `value`.
   * @param {Object} [stack] Tracks traversed objects and their clone counterparts.
   * @returns {*} Returns the cloned value.
   */
  function baseClone(value, bitmask, customizer, key, object, stack) {
    var result,
        isDeep = bitmask & CLONE_DEEP_FLAG$1,
        isFlat = bitmask & CLONE_FLAT_FLAG,
        isFull = bitmask & CLONE_SYMBOLS_FLAG$2;

    if (customizer) {
      result = object ? customizer(value, key, object, stack) : customizer(value);
    }
    if (result !== undefined) {
      return result;
    }
    if (!isObject_1(value)) {
      return value;
    }
    var isArr = isArray_1(value);
    if (isArr) {
      result = _initCloneArray(value);
      if (!isDeep) {
        return _copyArray(value, result);
      }
    } else {
      var tag = _getTag(value),
          isFunc = tag == funcTag || tag == genTag;

      if (isBuffer_1(value)) {
        return _cloneBuffer(value, isDeep);
      }
      if (tag == objectTag$2 || tag == argsTag$1 || (isFunc && !object)) {
        result = (isFlat || isFunc) ? {} : _initCloneObject(value);
        if (!isDeep) {
          return isFlat
            ? _copySymbolsIn(value, _baseAssignIn(result, value))
            : _copySymbols(value, _baseAssign(result, value));
        }
      } else {
        if (!cloneableTags[tag]) {
          return object ? value : {};
        }
        result = _initCloneByTag(value, tag, isDeep);
      }
    }
    // Check for circular references and return its corresponding clone.
    stack || (stack = new _Stack);
    var stacked = stack.get(value);
    if (stacked) {
      return stacked;
    }
    stack.set(value, result);

    if (isSet_1(value)) {
      value.forEach(function(subValue) {
        result.add(baseClone(subValue, bitmask, customizer, subValue, value, stack));
      });
    } else if (isMap_1(value)) {
      value.forEach(function(subValue, key) {
        result.set(key, baseClone(subValue, bitmask, customizer, key, value, stack));
      });
    }

    var keysFunc = isFull
      ? (isFlat ? _getAllKeysIn : _getAllKeys)
      : (isFlat ? keysIn_1 : keys_1);

    var props = isArr ? undefined : keysFunc(value);
    _arrayEach(props || value, function(subValue, key) {
      if (props) {
        key = subValue;
        subValue = value[key];
      }
      // Recursively populate clone (susceptible to call stack limits).
      _assignValue(result, key, baseClone(subValue, bitmask, customizer, key, value, stack));
    });
    return result;
  }

  var _baseClone = baseClone;

  /** Used to compose bitmasks for cloning. */
  var CLONE_DEEP_FLAG = 1,
      CLONE_SYMBOLS_FLAG$1 = 4;

  /**
   * This method is like `_.clone` except that it recursively clones `value`.
   *
   * @static
   * @memberOf _
   * @since 1.0.0
   * @category Lang
   * @param {*} value The value to recursively clone.
   * @returns {*} Returns the deep cloned value.
   * @see _.clone
   * @example
   *
   * var objects = [{ 'a': 1 }, { 'b': 2 }];
   *
   * var deep = _.cloneDeep(objects);
   * console.log(deep[0] === objects[0]);
   * // => false
   */
  function cloneDeep(value) {
    return _baseClone(value, CLONE_DEEP_FLAG | CLONE_SYMBOLS_FLAG$1);
  }

  var cloneDeep_1 = cloneDeep;

  function isPopulated(item) {
    if (typeof item === "function")
      return true;
    let itemCopy = cloneDeep_1(item);
    let isPop = true;
    if (u__namespace.isObj(itemCopy)) {
      for (let key of Object.keys(itemCopy)) {
        if (!isPop)
          return isPop;
        if (u__namespace.isObj(itemCopy[key])) {
          isPop = isPopulated(itemCopy[key]);
        } else if (Array.isArray(itemCopy[key])) {
          for (let elem of itemCopy[key]) {
            if (u__namespace.isObj(elem)) {
              isPop = isPopulated(elem);
            } else if (typeof elem === "string") {
              if (elem.startsWith(".") || elem.startsWith("..")) {
                isPop = false;
              }
              isPop = true;
            } else {
              isPop = true;
            }
          }
        } else if (typeof itemCopy[key] === "string") {
          const currVal = itemCopy[key].toString();
          if (currVal.startsWith(".") || currVal.startsWith("..") || currVal.startsWith("=.") || currVal.startsWith("~")) {
            isPop = false;
          }
        }
      }
    } else if (typeof item === "string") {
      if (item.startsWith(".") || item.startsWith("..") || item.startsWith("=.") || item.startsWith("~")) {
        isPop = false;
      }
    }
    return isPop;
  }

  var minimalisticAssert = assert;

  function assert(val, msg) {
    if (!val)
      throw new Error(msg || 'Assertion failed');
  }

  assert.equal = function assertEqual(l, r, msg) {
    if (l != r)
      throw new Error(msg || ('Assertion failed: ' + l + ' != ' + r));
  };

  var inherits_browser = createCommonjsModule(function (module) {
  if (typeof Object.create === 'function') {
    // implementation from standard node.js 'util' module
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
    // old school shim for old browsers
    module.exports = function inherits(ctor, superCtor) {
      if (superCtor) {
        ctor.super_ = superCtor;
        var TempCtor = function () {};
        TempCtor.prototype = superCtor.prototype;
        ctor.prototype = new TempCtor();
        ctor.prototype.constructor = ctor;
      }
    };
  }
  });

  var inherits_1 = inherits_browser;

  function isSurrogatePair(msg, i) {
    if ((msg.charCodeAt(i) & 0xFC00) !== 0xD800) {
      return false;
    }
    if (i < 0 || i + 1 >= msg.length) {
      return false;
    }
    return (msg.charCodeAt(i + 1) & 0xFC00) === 0xDC00;
  }

  function toArray(msg, enc) {
    if (Array.isArray(msg))
      return msg.slice();
    if (!msg)
      return [];
    var res = [];
    if (typeof msg === 'string') {
      if (!enc) {
        // Inspired by stringToUtf8ByteArray() in closure-library by Google
        // https://github.com/google/closure-library/blob/8598d87242af59aac233270742c8984e2b2bdbe0/closure/goog/crypt/crypt.js#L117-L143
        // Apache License 2.0
        // https://github.com/google/closure-library/blob/master/LICENSE
        var p = 0;
        for (var i = 0; i < msg.length; i++) {
          var c = msg.charCodeAt(i);
          if (c < 128) {
            res[p++] = c;
          } else if (c < 2048) {
            res[p++] = (c >> 6) | 192;
            res[p++] = (c & 63) | 128;
          } else if (isSurrogatePair(msg, i)) {
            c = 0x10000 + ((c & 0x03FF) << 10) + (msg.charCodeAt(++i) & 0x03FF);
            res[p++] = (c >> 18) | 240;
            res[p++] = ((c >> 12) & 63) | 128;
            res[p++] = ((c >> 6) & 63) | 128;
            res[p++] = (c & 63) | 128;
          } else {
            res[p++] = (c >> 12) | 224;
            res[p++] = ((c >> 6) & 63) | 128;
            res[p++] = (c & 63) | 128;
          }
        }
      } else if (enc === 'hex') {
        msg = msg.replace(/[^a-z0-9]+/ig, '');
        if (msg.length % 2 !== 0)
          msg = '0' + msg;
        for (i = 0; i < msg.length; i += 2)
          res.push(parseInt(msg[i] + msg[i + 1], 16));
      }
    } else {
      for (i = 0; i < msg.length; i++)
        res[i] = msg[i] | 0;
    }
    return res;
  }
  var toArray_1 = toArray;

  function toHex(msg) {
    var res = '';
    for (var i = 0; i < msg.length; i++)
      res += zero2(msg[i].toString(16));
    return res;
  }
  var toHex_1 = toHex;

  function htonl(w) {
    var res = (w >>> 24) |
              ((w >>> 8) & 0xff00) |
              ((w << 8) & 0xff0000) |
              ((w & 0xff) << 24);
    return res >>> 0;
  }
  var htonl_1 = htonl;

  function toHex32(msg, endian) {
    var res = '';
    for (var i = 0; i < msg.length; i++) {
      var w = msg[i];
      if (endian === 'little')
        w = htonl(w);
      res += zero8(w.toString(16));
    }
    return res;
  }
  var toHex32_1 = toHex32;

  function zero2(word) {
    if (word.length === 1)
      return '0' + word;
    else
      return word;
  }
  var zero2_1 = zero2;

  function zero8(word) {
    if (word.length === 7)
      return '0' + word;
    else if (word.length === 6)
      return '00' + word;
    else if (word.length === 5)
      return '000' + word;
    else if (word.length === 4)
      return '0000' + word;
    else if (word.length === 3)
      return '00000' + word;
    else if (word.length === 2)
      return '000000' + word;
    else if (word.length === 1)
      return '0000000' + word;
    else
      return word;
  }
  var zero8_1 = zero8;

  function join32(msg, start, end, endian) {
    var len = end - start;
    minimalisticAssert(len % 4 === 0);
    var res = new Array(len / 4);
    for (var i = 0, k = start; i < res.length; i++, k += 4) {
      var w;
      if (endian === 'big')
        w = (msg[k] << 24) | (msg[k + 1] << 16) | (msg[k + 2] << 8) | msg[k + 3];
      else
        w = (msg[k + 3] << 24) | (msg[k + 2] << 16) | (msg[k + 1] << 8) | msg[k];
      res[i] = w >>> 0;
    }
    return res;
  }
  var join32_1 = join32;

  function split32(msg, endian) {
    var res = new Array(msg.length * 4);
    for (var i = 0, k = 0; i < msg.length; i++, k += 4) {
      var m = msg[i];
      if (endian === 'big') {
        res[k] = m >>> 24;
        res[k + 1] = (m >>> 16) & 0xff;
        res[k + 2] = (m >>> 8) & 0xff;
        res[k + 3] = m & 0xff;
      } else {
        res[k + 3] = m >>> 24;
        res[k + 2] = (m >>> 16) & 0xff;
        res[k + 1] = (m >>> 8) & 0xff;
        res[k] = m & 0xff;
      }
    }
    return res;
  }
  var split32_1 = split32;

  function rotr32$1(w, b) {
    return (w >>> b) | (w << (32 - b));
  }
  var rotr32_1 = rotr32$1;

  function rotl32$2(w, b) {
    return (w << b) | (w >>> (32 - b));
  }
  var rotl32_1 = rotl32$2;

  function sum32$3(a, b) {
    return (a + b) >>> 0;
  }
  var sum32_1 = sum32$3;

  function sum32_3$1(a, b, c) {
    return (a + b + c) >>> 0;
  }
  var sum32_3_1 = sum32_3$1;

  function sum32_4$2(a, b, c, d) {
    return (a + b + c + d) >>> 0;
  }
  var sum32_4_1 = sum32_4$2;

  function sum32_5$2(a, b, c, d, e) {
    return (a + b + c + d + e) >>> 0;
  }
  var sum32_5_1 = sum32_5$2;

  function sum64$1(buf, pos, ah, al) {
    var bh = buf[pos];
    var bl = buf[pos + 1];

    var lo = (al + bl) >>> 0;
    var hi = (lo < al ? 1 : 0) + ah + bh;
    buf[pos] = hi >>> 0;
    buf[pos + 1] = lo;
  }
  var sum64_1 = sum64$1;

  function sum64_hi$1(ah, al, bh, bl) {
    var lo = (al + bl) >>> 0;
    var hi = (lo < al ? 1 : 0) + ah + bh;
    return hi >>> 0;
  }
  var sum64_hi_1 = sum64_hi$1;

  function sum64_lo$1(ah, al, bh, bl) {
    var lo = al + bl;
    return lo >>> 0;
  }
  var sum64_lo_1 = sum64_lo$1;

  function sum64_4_hi$1(ah, al, bh, bl, ch, cl, dh, dl) {
    var carry = 0;
    var lo = al;
    lo = (lo + bl) >>> 0;
    carry += lo < al ? 1 : 0;
    lo = (lo + cl) >>> 0;
    carry += lo < cl ? 1 : 0;
    lo = (lo + dl) >>> 0;
    carry += lo < dl ? 1 : 0;

    var hi = ah + bh + ch + dh + carry;
    return hi >>> 0;
  }
  var sum64_4_hi_1 = sum64_4_hi$1;

  function sum64_4_lo$1(ah, al, bh, bl, ch, cl, dh, dl) {
    var lo = al + bl + cl + dl;
    return lo >>> 0;
  }
  var sum64_4_lo_1 = sum64_4_lo$1;

  function sum64_5_hi$1(ah, al, bh, bl, ch, cl, dh, dl, eh, el) {
    var carry = 0;
    var lo = al;
    lo = (lo + bl) >>> 0;
    carry += lo < al ? 1 : 0;
    lo = (lo + cl) >>> 0;
    carry += lo < cl ? 1 : 0;
    lo = (lo + dl) >>> 0;
    carry += lo < dl ? 1 : 0;
    lo = (lo + el) >>> 0;
    carry += lo < el ? 1 : 0;

    var hi = ah + bh + ch + dh + eh + carry;
    return hi >>> 0;
  }
  var sum64_5_hi_1 = sum64_5_hi$1;

  function sum64_5_lo$1(ah, al, bh, bl, ch, cl, dh, dl, eh, el) {
    var lo = al + bl + cl + dl + el;

    return lo >>> 0;
  }
  var sum64_5_lo_1 = sum64_5_lo$1;

  function rotr64_hi$1(ah, al, num) {
    var r = (al << (32 - num)) | (ah >>> num);
    return r >>> 0;
  }
  var rotr64_hi_1 = rotr64_hi$1;

  function rotr64_lo$1(ah, al, num) {
    var r = (ah << (32 - num)) | (al >>> num);
    return r >>> 0;
  }
  var rotr64_lo_1 = rotr64_lo$1;

  function shr64_hi$1(ah, al, num) {
    return ah >>> num;
  }
  var shr64_hi_1 = shr64_hi$1;

  function shr64_lo$1(ah, al, num) {
    var r = (ah << (32 - num)) | (al >>> num);
    return r >>> 0;
  }
  var shr64_lo_1 = shr64_lo$1;

  var utils$1 = {
  	inherits: inherits_1,
  	toArray: toArray_1,
  	toHex: toHex_1,
  	htonl: htonl_1,
  	toHex32: toHex32_1,
  	zero2: zero2_1,
  	zero8: zero8_1,
  	join32: join32_1,
  	split32: split32_1,
  	rotr32: rotr32_1,
  	rotl32: rotl32_1,
  	sum32: sum32_1,
  	sum32_3: sum32_3_1,
  	sum32_4: sum32_4_1,
  	sum32_5: sum32_5_1,
  	sum64: sum64_1,
  	sum64_hi: sum64_hi_1,
  	sum64_lo: sum64_lo_1,
  	sum64_4_hi: sum64_4_hi_1,
  	sum64_4_lo: sum64_4_lo_1,
  	sum64_5_hi: sum64_5_hi_1,
  	sum64_5_lo: sum64_5_lo_1,
  	rotr64_hi: rotr64_hi_1,
  	rotr64_lo: rotr64_lo_1,
  	shr64_hi: shr64_hi_1,
  	shr64_lo: shr64_lo_1
  };

  function BlockHash$4() {
    this.pending = null;
    this.pendingTotal = 0;
    this.blockSize = this.constructor.blockSize;
    this.outSize = this.constructor.outSize;
    this.hmacStrength = this.constructor.hmacStrength;
    this.padLength = this.constructor.padLength / 8;
    this.endian = 'big';

    this._delta8 = this.blockSize / 8;
    this._delta32 = this.blockSize / 32;
  }
  var BlockHash_1 = BlockHash$4;

  BlockHash$4.prototype.update = function update(msg, enc) {
    // Convert message to array, pad it, and join into 32bit blocks
    msg = utils$1.toArray(msg, enc);
    if (!this.pending)
      this.pending = msg;
    else
      this.pending = this.pending.concat(msg);
    this.pendingTotal += msg.length;

    // Enough data, try updating
    if (this.pending.length >= this._delta8) {
      msg = this.pending;

      // Process pending data in blocks
      var r = msg.length % this._delta8;
      this.pending = msg.slice(msg.length - r, msg.length);
      if (this.pending.length === 0)
        this.pending = null;

      msg = utils$1.join32(msg, 0, msg.length - r, this.endian);
      for (var i = 0; i < msg.length; i += this._delta32)
        this._update(msg, i, i + this._delta32);
    }

    return this;
  };

  BlockHash$4.prototype.digest = function digest(enc) {
    this.update(this._pad());
    minimalisticAssert(this.pending === null);

    return this._digest(enc);
  };

  BlockHash$4.prototype._pad = function pad() {
    var len = this.pendingTotal;
    var bytes = this._delta8;
    var k = bytes - ((len + this.padLength) % bytes);
    var res = new Array(k + this.padLength);
    res[0] = 0x80;
    for (var i = 1; i < k; i++)
      res[i] = 0;

    // Append length
    len <<= 3;
    if (this.endian === 'big') {
      for (var t = 8; t < this.padLength; t++)
        res[i++] = 0;

      res[i++] = 0;
      res[i++] = 0;
      res[i++] = 0;
      res[i++] = 0;
      res[i++] = (len >>> 24) & 0xff;
      res[i++] = (len >>> 16) & 0xff;
      res[i++] = (len >>> 8) & 0xff;
      res[i++] = len & 0xff;
    } else {
      res[i++] = len & 0xff;
      res[i++] = (len >>> 8) & 0xff;
      res[i++] = (len >>> 16) & 0xff;
      res[i++] = (len >>> 24) & 0xff;
      res[i++] = 0;
      res[i++] = 0;
      res[i++] = 0;
      res[i++] = 0;

      for (t = 8; t < this.padLength; t++)
        res[i++] = 0;
    }

    return res;
  };

  var common$1 = {
  	BlockHash: BlockHash_1
  };

  var rotr32 = utils$1.rotr32;

  function ft_1$1(s, x, y, z) {
    if (s === 0)
      return ch32$1(x, y, z);
    if (s === 1 || s === 3)
      return p32(x, y, z);
    if (s === 2)
      return maj32$1(x, y, z);
  }
  var ft_1_1 = ft_1$1;

  function ch32$1(x, y, z) {
    return (x & y) ^ ((~x) & z);
  }
  var ch32_1 = ch32$1;

  function maj32$1(x, y, z) {
    return (x & y) ^ (x & z) ^ (y & z);
  }
  var maj32_1 = maj32$1;

  function p32(x, y, z) {
    return x ^ y ^ z;
  }
  var p32_1 = p32;

  function s0_256$1(x) {
    return rotr32(x, 2) ^ rotr32(x, 13) ^ rotr32(x, 22);
  }
  var s0_256_1 = s0_256$1;

  function s1_256$1(x) {
    return rotr32(x, 6) ^ rotr32(x, 11) ^ rotr32(x, 25);
  }
  var s1_256_1 = s1_256$1;

  function g0_256$1(x) {
    return rotr32(x, 7) ^ rotr32(x, 18) ^ (x >>> 3);
  }
  var g0_256_1 = g0_256$1;

  function g1_256$1(x) {
    return rotr32(x, 17) ^ rotr32(x, 19) ^ (x >>> 10);
  }
  var g1_256_1 = g1_256$1;

  var common = {
  	ft_1: ft_1_1,
  	ch32: ch32_1,
  	maj32: maj32_1,
  	p32: p32_1,
  	s0_256: s0_256_1,
  	s1_256: s1_256_1,
  	g0_256: g0_256_1,
  	g1_256: g1_256_1
  };

  var rotl32$1 = utils$1.rotl32;
  var sum32$2 = utils$1.sum32;
  var sum32_5$1 = utils$1.sum32_5;
  var ft_1 = common.ft_1;
  var BlockHash$3 = common$1.BlockHash;

  var sha1_K = [
    0x5A827999, 0x6ED9EBA1,
    0x8F1BBCDC, 0xCA62C1D6
  ];

  function SHA1() {
    if (!(this instanceof SHA1))
      return new SHA1();

    BlockHash$3.call(this);
    this.h = [
      0x67452301, 0xefcdab89, 0x98badcfe,
      0x10325476, 0xc3d2e1f0 ];
    this.W = new Array(80);
  }

  utils$1.inherits(SHA1, BlockHash$3);
  var _1 = SHA1;

  SHA1.blockSize = 512;
  SHA1.outSize = 160;
  SHA1.hmacStrength = 80;
  SHA1.padLength = 64;

  SHA1.prototype._update = function _update(msg, start) {
    var W = this.W;

    for (var i = 0; i < 16; i++)
      W[i] = msg[start + i];

    for(; i < W.length; i++)
      W[i] = rotl32$1(W[i - 3] ^ W[i - 8] ^ W[i - 14] ^ W[i - 16], 1);

    var a = this.h[0];
    var b = this.h[1];
    var c = this.h[2];
    var d = this.h[3];
    var e = this.h[4];

    for (i = 0; i < W.length; i++) {
      var s = ~~(i / 20);
      var t = sum32_5$1(rotl32$1(a, 5), ft_1(s, b, c, d), e, W[i], sha1_K[s]);
      e = d;
      d = c;
      c = rotl32$1(b, 30);
      b = a;
      a = t;
    }

    this.h[0] = sum32$2(this.h[0], a);
    this.h[1] = sum32$2(this.h[1], b);
    this.h[2] = sum32$2(this.h[2], c);
    this.h[3] = sum32$2(this.h[3], d);
    this.h[4] = sum32$2(this.h[4], e);
  };

  SHA1.prototype._digest = function digest(enc) {
    if (enc === 'hex')
      return utils$1.toHex32(this.h, 'big');
    else
      return utils$1.split32(this.h, 'big');
  };

  var sum32$1 = utils$1.sum32;
  var sum32_4$1 = utils$1.sum32_4;
  var sum32_5 = utils$1.sum32_5;
  var ch32 = common.ch32;
  var maj32 = common.maj32;
  var s0_256 = common.s0_256;
  var s1_256 = common.s1_256;
  var g0_256 = common.g0_256;
  var g1_256 = common.g1_256;

  var BlockHash$2 = common$1.BlockHash;

  var sha256_K = [
    0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5,
    0x3956c25b, 0x59f111f1, 0x923f82a4, 0xab1c5ed5,
    0xd807aa98, 0x12835b01, 0x243185be, 0x550c7dc3,
    0x72be5d74, 0x80deb1fe, 0x9bdc06a7, 0xc19bf174,
    0xe49b69c1, 0xefbe4786, 0x0fc19dc6, 0x240ca1cc,
    0x2de92c6f, 0x4a7484aa, 0x5cb0a9dc, 0x76f988da,
    0x983e5152, 0xa831c66d, 0xb00327c8, 0xbf597fc7,
    0xc6e00bf3, 0xd5a79147, 0x06ca6351, 0x14292967,
    0x27b70a85, 0x2e1b2138, 0x4d2c6dfc, 0x53380d13,
    0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85,
    0xa2bfe8a1, 0xa81a664b, 0xc24b8b70, 0xc76c51a3,
    0xd192e819, 0xd6990624, 0xf40e3585, 0x106aa070,
    0x19a4c116, 0x1e376c08, 0x2748774c, 0x34b0bcb5,
    0x391c0cb3, 0x4ed8aa4a, 0x5b9cca4f, 0x682e6ff3,
    0x748f82ee, 0x78a5636f, 0x84c87814, 0x8cc70208,
    0x90befffa, 0xa4506ceb, 0xbef9a3f7, 0xc67178f2
  ];

  function SHA256() {
    if (!(this instanceof SHA256))
      return new SHA256();

    BlockHash$2.call(this);
    this.h = [
      0x6a09e667, 0xbb67ae85, 0x3c6ef372, 0xa54ff53a,
      0x510e527f, 0x9b05688c, 0x1f83d9ab, 0x5be0cd19
    ];
    this.k = sha256_K;
    this.W = new Array(64);
  }
  utils$1.inherits(SHA256, BlockHash$2);
  var _256 = SHA256;

  SHA256.blockSize = 512;
  SHA256.outSize = 256;
  SHA256.hmacStrength = 192;
  SHA256.padLength = 64;

  SHA256.prototype._update = function _update(msg, start) {
    var W = this.W;

    for (var i = 0; i < 16; i++)
      W[i] = msg[start + i];
    for (; i < W.length; i++)
      W[i] = sum32_4$1(g1_256(W[i - 2]), W[i - 7], g0_256(W[i - 15]), W[i - 16]);

    var a = this.h[0];
    var b = this.h[1];
    var c = this.h[2];
    var d = this.h[3];
    var e = this.h[4];
    var f = this.h[5];
    var g = this.h[6];
    var h = this.h[7];

    minimalisticAssert(this.k.length === W.length);
    for (i = 0; i < W.length; i++) {
      var T1 = sum32_5(h, s1_256(e), ch32(e, f, g), this.k[i], W[i]);
      var T2 = sum32$1(s0_256(a), maj32(a, b, c));
      h = g;
      g = f;
      f = e;
      e = sum32$1(d, T1);
      d = c;
      c = b;
      b = a;
      a = sum32$1(T1, T2);
    }

    this.h[0] = sum32$1(this.h[0], a);
    this.h[1] = sum32$1(this.h[1], b);
    this.h[2] = sum32$1(this.h[2], c);
    this.h[3] = sum32$1(this.h[3], d);
    this.h[4] = sum32$1(this.h[4], e);
    this.h[5] = sum32$1(this.h[5], f);
    this.h[6] = sum32$1(this.h[6], g);
    this.h[7] = sum32$1(this.h[7], h);
  };

  SHA256.prototype._digest = function digest(enc) {
    if (enc === 'hex')
      return utils$1.toHex32(this.h, 'big');
    else
      return utils$1.split32(this.h, 'big');
  };

  function SHA224() {
    if (!(this instanceof SHA224))
      return new SHA224();

    _256.call(this);
    this.h = [
      0xc1059ed8, 0x367cd507, 0x3070dd17, 0xf70e5939,
      0xffc00b31, 0x68581511, 0x64f98fa7, 0xbefa4fa4 ];
  }
  utils$1.inherits(SHA224, _256);
  var _224 = SHA224;

  SHA224.blockSize = 512;
  SHA224.outSize = 224;
  SHA224.hmacStrength = 192;
  SHA224.padLength = 64;

  SHA224.prototype._digest = function digest(enc) {
    // Just truncate output
    if (enc === 'hex')
      return utils$1.toHex32(this.h.slice(0, 7), 'big');
    else
      return utils$1.split32(this.h.slice(0, 7), 'big');
  };

  var rotr64_hi = utils$1.rotr64_hi;
  var rotr64_lo = utils$1.rotr64_lo;
  var shr64_hi = utils$1.shr64_hi;
  var shr64_lo = utils$1.shr64_lo;
  var sum64 = utils$1.sum64;
  var sum64_hi = utils$1.sum64_hi;
  var sum64_lo = utils$1.sum64_lo;
  var sum64_4_hi = utils$1.sum64_4_hi;
  var sum64_4_lo = utils$1.sum64_4_lo;
  var sum64_5_hi = utils$1.sum64_5_hi;
  var sum64_5_lo = utils$1.sum64_5_lo;

  var BlockHash$1 = common$1.BlockHash;

  var sha512_K = [
    0x428a2f98, 0xd728ae22, 0x71374491, 0x23ef65cd,
    0xb5c0fbcf, 0xec4d3b2f, 0xe9b5dba5, 0x8189dbbc,
    0x3956c25b, 0xf348b538, 0x59f111f1, 0xb605d019,
    0x923f82a4, 0xaf194f9b, 0xab1c5ed5, 0xda6d8118,
    0xd807aa98, 0xa3030242, 0x12835b01, 0x45706fbe,
    0x243185be, 0x4ee4b28c, 0x550c7dc3, 0xd5ffb4e2,
    0x72be5d74, 0xf27b896f, 0x80deb1fe, 0x3b1696b1,
    0x9bdc06a7, 0x25c71235, 0xc19bf174, 0xcf692694,
    0xe49b69c1, 0x9ef14ad2, 0xefbe4786, 0x384f25e3,
    0x0fc19dc6, 0x8b8cd5b5, 0x240ca1cc, 0x77ac9c65,
    0x2de92c6f, 0x592b0275, 0x4a7484aa, 0x6ea6e483,
    0x5cb0a9dc, 0xbd41fbd4, 0x76f988da, 0x831153b5,
    0x983e5152, 0xee66dfab, 0xa831c66d, 0x2db43210,
    0xb00327c8, 0x98fb213f, 0xbf597fc7, 0xbeef0ee4,
    0xc6e00bf3, 0x3da88fc2, 0xd5a79147, 0x930aa725,
    0x06ca6351, 0xe003826f, 0x14292967, 0x0a0e6e70,
    0x27b70a85, 0x46d22ffc, 0x2e1b2138, 0x5c26c926,
    0x4d2c6dfc, 0x5ac42aed, 0x53380d13, 0x9d95b3df,
    0x650a7354, 0x8baf63de, 0x766a0abb, 0x3c77b2a8,
    0x81c2c92e, 0x47edaee6, 0x92722c85, 0x1482353b,
    0xa2bfe8a1, 0x4cf10364, 0xa81a664b, 0xbc423001,
    0xc24b8b70, 0xd0f89791, 0xc76c51a3, 0x0654be30,
    0xd192e819, 0xd6ef5218, 0xd6990624, 0x5565a910,
    0xf40e3585, 0x5771202a, 0x106aa070, 0x32bbd1b8,
    0x19a4c116, 0xb8d2d0c8, 0x1e376c08, 0x5141ab53,
    0x2748774c, 0xdf8eeb99, 0x34b0bcb5, 0xe19b48a8,
    0x391c0cb3, 0xc5c95a63, 0x4ed8aa4a, 0xe3418acb,
    0x5b9cca4f, 0x7763e373, 0x682e6ff3, 0xd6b2b8a3,
    0x748f82ee, 0x5defb2fc, 0x78a5636f, 0x43172f60,
    0x84c87814, 0xa1f0ab72, 0x8cc70208, 0x1a6439ec,
    0x90befffa, 0x23631e28, 0xa4506ceb, 0xde82bde9,
    0xbef9a3f7, 0xb2c67915, 0xc67178f2, 0xe372532b,
    0xca273ece, 0xea26619c, 0xd186b8c7, 0x21c0c207,
    0xeada7dd6, 0xcde0eb1e, 0xf57d4f7f, 0xee6ed178,
    0x06f067aa, 0x72176fba, 0x0a637dc5, 0xa2c898a6,
    0x113f9804, 0xbef90dae, 0x1b710b35, 0x131c471b,
    0x28db77f5, 0x23047d84, 0x32caab7b, 0x40c72493,
    0x3c9ebe0a, 0x15c9bebc, 0x431d67c4, 0x9c100d4c,
    0x4cc5d4be, 0xcb3e42b6, 0x597f299c, 0xfc657e2a,
    0x5fcb6fab, 0x3ad6faec, 0x6c44198c, 0x4a475817
  ];

  function SHA512() {
    if (!(this instanceof SHA512))
      return new SHA512();

    BlockHash$1.call(this);
    this.h = [
      0x6a09e667, 0xf3bcc908,
      0xbb67ae85, 0x84caa73b,
      0x3c6ef372, 0xfe94f82b,
      0xa54ff53a, 0x5f1d36f1,
      0x510e527f, 0xade682d1,
      0x9b05688c, 0x2b3e6c1f,
      0x1f83d9ab, 0xfb41bd6b,
      0x5be0cd19, 0x137e2179 ];
    this.k = sha512_K;
    this.W = new Array(160);
  }
  utils$1.inherits(SHA512, BlockHash$1);
  var _512 = SHA512;

  SHA512.blockSize = 1024;
  SHA512.outSize = 512;
  SHA512.hmacStrength = 192;
  SHA512.padLength = 128;

  SHA512.prototype._prepareBlock = function _prepareBlock(msg, start) {
    var W = this.W;

    // 32 x 32bit words
    for (var i = 0; i < 32; i++)
      W[i] = msg[start + i];
    for (; i < W.length; i += 2) {
      var c0_hi = g1_512_hi(W[i - 4], W[i - 3]);  // i - 2
      var c0_lo = g1_512_lo(W[i - 4], W[i - 3]);
      var c1_hi = W[i - 14];  // i - 7
      var c1_lo = W[i - 13];
      var c2_hi = g0_512_hi(W[i - 30], W[i - 29]);  // i - 15
      var c2_lo = g0_512_lo(W[i - 30], W[i - 29]);
      var c3_hi = W[i - 32];  // i - 16
      var c3_lo = W[i - 31];

      W[i] = sum64_4_hi(
        c0_hi, c0_lo,
        c1_hi, c1_lo,
        c2_hi, c2_lo,
        c3_hi, c3_lo);
      W[i + 1] = sum64_4_lo(
        c0_hi, c0_lo,
        c1_hi, c1_lo,
        c2_hi, c2_lo,
        c3_hi, c3_lo);
    }
  };

  SHA512.prototype._update = function _update(msg, start) {
    this._prepareBlock(msg, start);

    var W = this.W;

    var ah = this.h[0];
    var al = this.h[1];
    var bh = this.h[2];
    var bl = this.h[3];
    var ch = this.h[4];
    var cl = this.h[5];
    var dh = this.h[6];
    var dl = this.h[7];
    var eh = this.h[8];
    var el = this.h[9];
    var fh = this.h[10];
    var fl = this.h[11];
    var gh = this.h[12];
    var gl = this.h[13];
    var hh = this.h[14];
    var hl = this.h[15];

    minimalisticAssert(this.k.length === W.length);
    for (var i = 0; i < W.length; i += 2) {
      var c0_hi = hh;
      var c0_lo = hl;
      var c1_hi = s1_512_hi(eh, el);
      var c1_lo = s1_512_lo(eh, el);
      var c2_hi = ch64_hi(eh, el, fh, fl, gh);
      var c2_lo = ch64_lo(eh, el, fh, fl, gh, gl);
      var c3_hi = this.k[i];
      var c3_lo = this.k[i + 1];
      var c4_hi = W[i];
      var c4_lo = W[i + 1];

      var T1_hi = sum64_5_hi(
        c0_hi, c0_lo,
        c1_hi, c1_lo,
        c2_hi, c2_lo,
        c3_hi, c3_lo,
        c4_hi, c4_lo);
      var T1_lo = sum64_5_lo(
        c0_hi, c0_lo,
        c1_hi, c1_lo,
        c2_hi, c2_lo,
        c3_hi, c3_lo,
        c4_hi, c4_lo);

      c0_hi = s0_512_hi(ah, al);
      c0_lo = s0_512_lo(ah, al);
      c1_hi = maj64_hi(ah, al, bh, bl, ch);
      c1_lo = maj64_lo(ah, al, bh, bl, ch, cl);

      var T2_hi = sum64_hi(c0_hi, c0_lo, c1_hi, c1_lo);
      var T2_lo = sum64_lo(c0_hi, c0_lo, c1_hi, c1_lo);

      hh = gh;
      hl = gl;

      gh = fh;
      gl = fl;

      fh = eh;
      fl = el;

      eh = sum64_hi(dh, dl, T1_hi, T1_lo);
      el = sum64_lo(dl, dl, T1_hi, T1_lo);

      dh = ch;
      dl = cl;

      ch = bh;
      cl = bl;

      bh = ah;
      bl = al;

      ah = sum64_hi(T1_hi, T1_lo, T2_hi, T2_lo);
      al = sum64_lo(T1_hi, T1_lo, T2_hi, T2_lo);
    }

    sum64(this.h, 0, ah, al);
    sum64(this.h, 2, bh, bl);
    sum64(this.h, 4, ch, cl);
    sum64(this.h, 6, dh, dl);
    sum64(this.h, 8, eh, el);
    sum64(this.h, 10, fh, fl);
    sum64(this.h, 12, gh, gl);
    sum64(this.h, 14, hh, hl);
  };

  SHA512.prototype._digest = function digest(enc) {
    if (enc === 'hex')
      return utils$1.toHex32(this.h, 'big');
    else
      return utils$1.split32(this.h, 'big');
  };

  function ch64_hi(xh, xl, yh, yl, zh) {
    var r = (xh & yh) ^ ((~xh) & zh);
    if (r < 0)
      r += 0x100000000;
    return r;
  }

  function ch64_lo(xh, xl, yh, yl, zh, zl) {
    var r = (xl & yl) ^ ((~xl) & zl);
    if (r < 0)
      r += 0x100000000;
    return r;
  }

  function maj64_hi(xh, xl, yh, yl, zh) {
    var r = (xh & yh) ^ (xh & zh) ^ (yh & zh);
    if (r < 0)
      r += 0x100000000;
    return r;
  }

  function maj64_lo(xh, xl, yh, yl, zh, zl) {
    var r = (xl & yl) ^ (xl & zl) ^ (yl & zl);
    if (r < 0)
      r += 0x100000000;
    return r;
  }

  function s0_512_hi(xh, xl) {
    var c0_hi = rotr64_hi(xh, xl, 28);
    var c1_hi = rotr64_hi(xl, xh, 2);  // 34
    var c2_hi = rotr64_hi(xl, xh, 7);  // 39

    var r = c0_hi ^ c1_hi ^ c2_hi;
    if (r < 0)
      r += 0x100000000;
    return r;
  }

  function s0_512_lo(xh, xl) {
    var c0_lo = rotr64_lo(xh, xl, 28);
    var c1_lo = rotr64_lo(xl, xh, 2);  // 34
    var c2_lo = rotr64_lo(xl, xh, 7);  // 39

    var r = c0_lo ^ c1_lo ^ c2_lo;
    if (r < 0)
      r += 0x100000000;
    return r;
  }

  function s1_512_hi(xh, xl) {
    var c0_hi = rotr64_hi(xh, xl, 14);
    var c1_hi = rotr64_hi(xh, xl, 18);
    var c2_hi = rotr64_hi(xl, xh, 9);  // 41

    var r = c0_hi ^ c1_hi ^ c2_hi;
    if (r < 0)
      r += 0x100000000;
    return r;
  }

  function s1_512_lo(xh, xl) {
    var c0_lo = rotr64_lo(xh, xl, 14);
    var c1_lo = rotr64_lo(xh, xl, 18);
    var c2_lo = rotr64_lo(xl, xh, 9);  // 41

    var r = c0_lo ^ c1_lo ^ c2_lo;
    if (r < 0)
      r += 0x100000000;
    return r;
  }

  function g0_512_hi(xh, xl) {
    var c0_hi = rotr64_hi(xh, xl, 1);
    var c1_hi = rotr64_hi(xh, xl, 8);
    var c2_hi = shr64_hi(xh, xl, 7);

    var r = c0_hi ^ c1_hi ^ c2_hi;
    if (r < 0)
      r += 0x100000000;
    return r;
  }

  function g0_512_lo(xh, xl) {
    var c0_lo = rotr64_lo(xh, xl, 1);
    var c1_lo = rotr64_lo(xh, xl, 8);
    var c2_lo = shr64_lo(xh, xl, 7);

    var r = c0_lo ^ c1_lo ^ c2_lo;
    if (r < 0)
      r += 0x100000000;
    return r;
  }

  function g1_512_hi(xh, xl) {
    var c0_hi = rotr64_hi(xh, xl, 19);
    var c1_hi = rotr64_hi(xl, xh, 29);  // 61
    var c2_hi = shr64_hi(xh, xl, 6);

    var r = c0_hi ^ c1_hi ^ c2_hi;
    if (r < 0)
      r += 0x100000000;
    return r;
  }

  function g1_512_lo(xh, xl) {
    var c0_lo = rotr64_lo(xh, xl, 19);
    var c1_lo = rotr64_lo(xl, xh, 29);  // 61
    var c2_lo = shr64_lo(xh, xl, 6);

    var r = c0_lo ^ c1_lo ^ c2_lo;
    if (r < 0)
      r += 0x100000000;
    return r;
  }

  function SHA384() {
    if (!(this instanceof SHA384))
      return new SHA384();

    _512.call(this);
    this.h = [
      0xcbbb9d5d, 0xc1059ed8,
      0x629a292a, 0x367cd507,
      0x9159015a, 0x3070dd17,
      0x152fecd8, 0xf70e5939,
      0x67332667, 0xffc00b31,
      0x8eb44a87, 0x68581511,
      0xdb0c2e0d, 0x64f98fa7,
      0x47b5481d, 0xbefa4fa4 ];
  }
  utils$1.inherits(SHA384, _512);
  var _384 = SHA384;

  SHA384.blockSize = 1024;
  SHA384.outSize = 384;
  SHA384.hmacStrength = 192;
  SHA384.padLength = 128;

  SHA384.prototype._digest = function digest(enc) {
    if (enc === 'hex')
      return utils$1.toHex32(this.h.slice(0, 12), 'big');
    else
      return utils$1.split32(this.h.slice(0, 12), 'big');
  };

  var sha1 = _1;
  var sha224 = _224;
  var sha256 = _256;
  var sha384 = _384;
  var sha512 = _512;

  var sha = {
  	sha1: sha1,
  	sha224: sha224,
  	sha256: sha256,
  	sha384: sha384,
  	sha512: sha512
  };

  var rotl32 = utils$1.rotl32;
  var sum32 = utils$1.sum32;
  var sum32_3 = utils$1.sum32_3;
  var sum32_4 = utils$1.sum32_4;
  var BlockHash = common$1.BlockHash;

  function RIPEMD160() {
    if (!(this instanceof RIPEMD160))
      return new RIPEMD160();

    BlockHash.call(this);

    this.h = [ 0x67452301, 0xefcdab89, 0x98badcfe, 0x10325476, 0xc3d2e1f0 ];
    this.endian = 'little';
  }
  utils$1.inherits(RIPEMD160, BlockHash);
  var ripemd160 = RIPEMD160;

  RIPEMD160.blockSize = 512;
  RIPEMD160.outSize = 160;
  RIPEMD160.hmacStrength = 192;
  RIPEMD160.padLength = 64;

  RIPEMD160.prototype._update = function update(msg, start) {
    var A = this.h[0];
    var B = this.h[1];
    var C = this.h[2];
    var D = this.h[3];
    var E = this.h[4];
    var Ah = A;
    var Bh = B;
    var Ch = C;
    var Dh = D;
    var Eh = E;
    for (var j = 0; j < 80; j++) {
      var T = sum32(
        rotl32(
          sum32_4(A, f(j, B, C, D), msg[r[j] + start], K(j)),
          s[j]),
        E);
      A = E;
      E = D;
      D = rotl32(C, 10);
      C = B;
      B = T;
      T = sum32(
        rotl32(
          sum32_4(Ah, f(79 - j, Bh, Ch, Dh), msg[rh[j] + start], Kh(j)),
          sh[j]),
        Eh);
      Ah = Eh;
      Eh = Dh;
      Dh = rotl32(Ch, 10);
      Ch = Bh;
      Bh = T;
    }
    T = sum32_3(this.h[1], C, Dh);
    this.h[1] = sum32_3(this.h[2], D, Eh);
    this.h[2] = sum32_3(this.h[3], E, Ah);
    this.h[3] = sum32_3(this.h[4], A, Bh);
    this.h[4] = sum32_3(this.h[0], B, Ch);
    this.h[0] = T;
  };

  RIPEMD160.prototype._digest = function digest(enc) {
    if (enc === 'hex')
      return utils$1.toHex32(this.h, 'little');
    else
      return utils$1.split32(this.h, 'little');
  };

  function f(j, x, y, z) {
    if (j <= 15)
      return x ^ y ^ z;
    else if (j <= 31)
      return (x & y) | ((~x) & z);
    else if (j <= 47)
      return (x | (~y)) ^ z;
    else if (j <= 63)
      return (x & z) | (y & (~z));
    else
      return x ^ (y | (~z));
  }

  function K(j) {
    if (j <= 15)
      return 0x00000000;
    else if (j <= 31)
      return 0x5a827999;
    else if (j <= 47)
      return 0x6ed9eba1;
    else if (j <= 63)
      return 0x8f1bbcdc;
    else
      return 0xa953fd4e;
  }

  function Kh(j) {
    if (j <= 15)
      return 0x50a28be6;
    else if (j <= 31)
      return 0x5c4dd124;
    else if (j <= 47)
      return 0x6d703ef3;
    else if (j <= 63)
      return 0x7a6d76e9;
    else
      return 0x00000000;
  }

  var r = [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15,
    7, 4, 13, 1, 10, 6, 15, 3, 12, 0, 9, 5, 2, 14, 11, 8,
    3, 10, 14, 4, 9, 15, 8, 1, 2, 7, 0, 6, 13, 11, 5, 12,
    1, 9, 11, 10, 0, 8, 12, 4, 13, 3, 7, 15, 14, 5, 6, 2,
    4, 0, 5, 9, 7, 12, 2, 10, 14, 1, 3, 8, 11, 6, 15, 13
  ];

  var rh = [
    5, 14, 7, 0, 9, 2, 11, 4, 13, 6, 15, 8, 1, 10, 3, 12,
    6, 11, 3, 7, 0, 13, 5, 10, 14, 15, 8, 12, 4, 9, 1, 2,
    15, 5, 1, 3, 7, 14, 6, 9, 11, 8, 12, 2, 10, 0, 4, 13,
    8, 6, 4, 1, 3, 11, 15, 0, 5, 12, 2, 13, 9, 7, 10, 14,
    12, 15, 10, 4, 1, 5, 8, 7, 6, 2, 13, 14, 0, 3, 9, 11
  ];

  var s = [
    11, 14, 15, 12, 5, 8, 7, 9, 11, 13, 14, 15, 6, 7, 9, 8,
    7, 6, 8, 13, 11, 9, 7, 15, 7, 12, 15, 9, 11, 7, 13, 12,
    11, 13, 6, 7, 14, 9, 13, 15, 14, 8, 13, 6, 5, 12, 7, 5,
    11, 12, 14, 15, 14, 15, 9, 8, 9, 14, 5, 6, 8, 6, 5, 12,
    9, 15, 5, 11, 6, 8, 13, 12, 5, 12, 13, 14, 11, 8, 5, 6
  ];

  var sh = [
    8, 9, 9, 11, 13, 15, 15, 5, 7, 7, 8, 11, 14, 14, 12, 6,
    9, 13, 15, 7, 12, 8, 9, 11, 7, 7, 12, 7, 6, 15, 13, 11,
    9, 7, 15, 11, 8, 6, 6, 14, 12, 13, 5, 14, 13, 13, 7, 5,
    15, 5, 8, 11, 14, 14, 6, 14, 6, 9, 12, 9, 12, 5, 15, 8,
    8, 5, 12, 9, 12, 5, 14, 6, 8, 13, 6, 5, 15, 13, 11, 11
  ];

  var ripemd = {
  	ripemd160: ripemd160
  };

  function Hmac(hash, key, enc) {
    if (!(this instanceof Hmac))
      return new Hmac(hash, key, enc);
    this.Hash = hash;
    this.blockSize = hash.blockSize / 8;
    this.outSize = hash.outSize / 8;
    this.inner = null;
    this.outer = null;

    this._init(utils$1.toArray(key, enc));
  }
  var hmac = Hmac;

  Hmac.prototype._init = function init(key) {
    // Shorten key, if needed
    if (key.length > this.blockSize)
      key = new this.Hash().update(key).digest();
    minimalisticAssert(key.length <= this.blockSize);

    // Add padding to key
    for (var i = key.length; i < this.blockSize; i++)
      key.push(0);

    for (i = 0; i < key.length; i++)
      key[i] ^= 0x36;
    this.inner = new this.Hash().update(key);

    // 0x36 ^ 0x5c = 0x6a
    for (i = 0; i < key.length; i++)
      key[i] ^= 0x6a;
    this.outer = new this.Hash().update(key);
  };

  Hmac.prototype.update = function update(msg, enc) {
    this.inner.update(msg, enc);
    return this;
  };

  Hmac.prototype.digest = function digest(enc) {
    this.outer.update(this.inner.digest());
    return this.outer.digest(enc);
  };

  var hash_1 = createCommonjsModule(function (module, exports) {
  var hash = exports;

  hash.utils = utils$1;
  hash.common = common$1;
  hash.sha = sha;
  hash.ripemd = ripemd;
  hash.hmac = hmac;

  // Proxy hash functions to the main object
  hash.sha1 = hash.sha.sha1;
  hash.sha256 = hash.sha.sha256;
  hash.sha224 = hash.sha.sha224;
  hash.sha384 = hash.sha.sha384;
  hash.sha512 = hash.sha.sha512;
  hash.ripemd160 = hash.ripemd.ripemd160;
  });

  var __async$j = (__this, __arguments, generator) => {
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
  var encryptionServices = {
    signature({ message, eskSign, sk }) {
      let sig = "";
      if (!eskSign || eskSign.length < 100) {
        return sig;
      }
      sig = store.level2SDK.utilServices.signature({ message, eskSign, sk });
      return sig;
    },
    verifySignature(signature, pkSign) {
      const isValid = store.level2SDK.utilServices.verifySignature(signature, pkSign);
      return isValid;
    },
    generate16Dkey() {
      const max = 1e16;
      const key = Math.floor(Math.random() * max);
      return String(key).toString();
    },
    decryptAES({ key, message }) {
      const secretKeyUInt8Array = store.level2SDK.utilServices.normalizeStringTo32BitArray(key);
      const encryptedDataUInt8Array = store.level2SDK.utilServices.base64ToUint8Array(message);
      const sk = store.level2SDK.utilServices.sKeyDecrypt(secretKeyUInt8Array, encryptedDataUInt8Array);
      let skBase64;
      if (sk instanceof Uint8Array) {
        skBase64 = store.level2SDK.utilServices.uint8ArrayToBase64(sk);
      }
      return skBase64;
    },
    encryptAES({ key, message }) {
      const secretKeyUInt8Array = store.level2SDK.utilServices.normalizeStringTo32BitArray(key);
      const encryptedDataUInt8Array = store.level2SDK.utilServices.base64ToUint8Array(message);
      const sk = store.level2SDK.utilServices.sKeyEncrypt(secretKeyUInt8Array, encryptedDataUInt8Array);
      let skBase64;
      if (sk instanceof Uint8Array) {
        skBase64 = store.level2SDK.utilServices.uint8ArrayToBase64(sk);
      }
      return skBase64;
    },
    decryptASK({ sendPk, recvSk, eData }) {
      const pkUInt8Array = store.level2SDK.utilServices.base64ToUint8Array(sendPk);
      const skUInt8Array = store.level2SDK.utilServices.base64ToUint8Array(recvSk);
      return store.level2SDK.utilServices.aKeyDecrypt_str(pkUInt8Array, skUInt8Array, eData);
    },
    encryptASK({ recvPk, sendSk, data }) {
      const pkUInt8Array = store.level2SDK.utilServices.base64ToUint8Array(recvPk);
      const skUInt8Array = store.level2SDK.utilServices.base64ToUint8Array(sendSk);
      return store.level2SDK.utilServices.aKeyEncrypt_str(pkUInt8Array, skUInt8Array, data);
    },
    skCheck({ pk, sk }) {
      let pkUInt8Array = pk;
      let skDataUInt8Array = sk;
      let isValid;
      if (typeof pk === "string") {
        try {
          pkUInt8Array = store.level2SDK.utilServices.base64ToUint8Array(pk);
        } catch (error) {
          isValid = false;
        }
      }
      if (typeof sk === "string") {
        try {
          skDataUInt8Array = store.level2SDK.utilServices.base64ToUint8Array(sk);
        } catch (error) {
          isValid = false;
        }
      }
      try {
        isValid = store.level2SDK.utilServices.aKeyCheck(pkUInt8Array, skDataUInt8Array);
      } catch (error) {
        isValid = false;
      }
      return isValid;
    },
    generateESAK({ pk }) {
      const secretKey = localStorage.getItem("sk");
      if (pk === null) {
        throw new AiTmedError({
          name: "ERROR_CREATING_ESAK"
        });
      }
      if (secretKey === null) {
        throw new AiTmedError({
          name: "LOGIN_REQUIRED",
          message: "There is no secretKey present in localStorage. Please log In."
        });
      }
      let pkToUint8Array;
      if (typeof pk === "string") {
        pkToUint8Array = store.level2SDK.utilServices.base64ToUint8Array(pk);
      } else {
        pkToUint8Array = pk;
      }
      const skToUint8Array = store.level2SDK.utilServices.base64ToUint8Array(secretKey);
      const symmetricKey = store.level2SDK.utilServices.generateSKey();
      const partialKey = symmetricKey.slice(0, 16);
      const esak = store.level2SDK.utilServices.aKeyEncrypt(pkToUint8Array, skToUint8Array, partialKey);
      const esakBase64 = store.level2SDK.utilServices.uint8ArrayToBase64(esak);
      return esakBase64;
    },
    decryptData({
      esak,
      publicKey,
      secretKey,
      data
    }) {
      if (publicKey === null) {
        throw new AiTmedError({
          name: "LOGIN_REQUIRED",
          message: "There is no publicKey present in localStorage. Please log In."
        });
      }
      if (secretKey === null) {
        throw new AiTmedError({
          name: "LOGIN_REQUIRED",
          message: "There is no secretKey present in localStorage. Please log In."
        });
      }
      let esakUint8Array;
      if (typeof esak === "string") {
        esakUint8Array = store.level2SDK.utilServices.base64ToUint8Array(esak);
      } else {
        esakUint8Array = esak;
      }
      const pkToUint8Array = store.level2SDK.utilServices.base64ToUint8Array(publicKey);
      const skToUint8Array = store.level2SDK.utilServices.base64ToUint8Array(secretKey);
      const partialKey = store.level2SDK.utilServices.aKeyDecrypt(pkToUint8Array, skToUint8Array, esakUint8Array);
      const sak = hash_1.sha256().update(partialKey).digest();
      const sakUint8Array = new Uint8Array(sak);
      const decryptedDataUint8Array = store.level2SDK.utilServices.sKeyDecrypt(sakUint8Array, data);
      if (decryptedDataUint8Array !== null) {
        return decryptedDataUint8Array;
      } else {
        throw new AiTmedError({ name: "ERROR_DECRYPTING_DATA" });
      }
    },
    decryptESAK({
      esak,
      publicKey,
      secretKey
    }) {
      if (publicKey === null) {
        throw new AiTmedError({
          name: "LOGIN_REQUIRED",
          message: "There is no publicKey present in localStorage. Please log In."
        });
      }
      if (secretKey === null) {
        throw new AiTmedError({
          name: "LOGIN_REQUIRED",
          message: "There is no secretKey present in localStorage. Please log In."
        });
      }
      let esakUint8Array;
      if (typeof esak === "string") {
        esakUint8Array = store.level2SDK.utilServices.base64ToUint8Array(esak);
      } else {
        esakUint8Array = esak;
      }
      const pkToUint8Array = store.level2SDK.utilServices.base64ToUint8Array(publicKey);
      const skToUint8Array = store.level2SDK.utilServices.base64ToUint8Array(secretKey);
      const partialKey = store.level2SDK.utilServices.aKeyDecrypt(pkToUint8Array, skToUint8Array, esakUint8Array);
      const sak = hash_1.sha256().update(partialKey).digest();
      const sakUint8Array = new Uint8Array(sak);
      const sakBase64 = store.level2SDK.utilServices.uint8ArrayToBase64(sakUint8Array);
      return sakBase64;
    },
    isEdgeEncrypted(_0) {
      return __async$j(this, arguments, function* ({ id }) {
        const edge = yield retrieveEdge(id);
        if (!edge)
          throw new AiTmedError({ name: "EDGE_DOES_NOT_EXIST" });
        if ((edge == null ? void 0 : edge.besak) || (edge == null ? void 0 : edge.eesak))
          return true;
        return false;
      });
    },
    getSAKFromEdge(_0) {
      return __async$j(this, arguments, function* ({ id }) {
        const edge = yield retrieveEdge(id);
        if (!edge)
          throw new AiTmedError({ name: "EDGE_DOES_NOT_EXIST" });
        return "";
      });
    }
  };

  const dispatchActionType = {
    ADD_FUNCTION: "ADD_FUNCTION",
    EVAL_OBJECT: "EVAL_OBJECT",
    GET_CACHE: "GET_CACHE",
    GET_DATA: "GET_DATA",
    INSERT_TO_INDEX_TABLE: "INSERT_TO_INDEX_TABLE",
    INSERT_TO_OBJECT_TABLE: "INSERT_TO_OBJECT_TABLE",
    POPULATE: "POPULATE",
    POPULATE_OBJECT: "POPULATE_OBJECT",
    IF_OBJECT: "IF_OBJECT",
    SEARCH_CACHE: "SEARCH_CACHE",
    SET_API_BUFFER: "SET_API_BUFFER",
    SET_CACHE: "SET_CACHE",
    UPDATE_DATA: "UPDATE_DATA",
    UPDATE_LOCAL_STORAGE: "UPDATE_LOCAL_STORAGE",
    FONTDB_OPREATE: "FONTDB_OPREATE"
  };
  const emitType = {
    ADD_BUILTIN_FNS: "ADD_BUILTIN_FNS",
    DELETE_PAGE: "DELETE_PAGE",
    EDIT_DRAFT: "EDIT_DRAFT",
    SET_CACHE: "SET_CACHE",
    SET_ROOT_PROPERTIES: "SET_ROOT_PROPERTIES",
    SET_LOCAL_PROPERTIES: "SET_LOCAL_PROPERTIES",
    SET_VALUE: "SET_VALUE"
  };
  const subscribe = {
    QUEUE_START: "QUEUE_START",
    QUEUE_END: "QUEUE_END"
  };

  var __defProp$b = Object.defineProperty;
  var __defProps$a = Object.defineProperties;
  var __getOwnPropDescs$a = Object.getOwnPropertyDescriptors;
  var __getOwnPropSymbols$c = Object.getOwnPropertySymbols;
  var __hasOwnProp$c = Object.prototype.hasOwnProperty;
  var __propIsEnum$c = Object.prototype.propertyIsEnumerable;
  var __defNormalProp$b = (obj, key, value) => key in obj ? __defProp$b(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __spreadValues$b = (a, b) => {
    for (var prop in b || (b = {}))
      if (__hasOwnProp$c.call(b, prop))
        __defNormalProp$b(a, prop, b[prop]);
    if (__getOwnPropSymbols$c)
      for (var prop of __getOwnPropSymbols$c(b)) {
        if (__propIsEnum$c.call(b, prop))
          __defNormalProp$b(a, prop, b[prop]);
      }
    return a;
  };
  var __spreadProps$a = (a, b) => __defProps$a(a, __getOwnPropDescs$a(b));
  var __async$i = (__this, __arguments, generator) => {
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
  const create$3 = (_0) => __async$i(window, [_0], function* ({
    edge_id,
    title,
    tags = [],
    content,
    tage,
    type,
    user,
    sesk,
    aesk,
    targetRoomName,
    fid,
    reid,
    mediaType,
    dataType = 0,
    dTypeProps,
    paymentNonce,
    jwt,
    dispatch
  }) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _i;
    if (!isPopulated(edge_id)) {
      throw new UnableToLocateValue(`Missing reference ${edge_id}`);
    }
    const edge = yield retrieveEdge(edge_id);
    if (!edge)
      throw new AiTmedError({ name: "EDGE_DOES_NOT_EXIST" });
    const dType = new DType();
    dType.dataType = (dTypeProps == null ? void 0 : dTypeProps.applicationDataType) || (dTypeProps == null ? void 0 : dTypeProps.dataType) || dataType;
    dType.isEditable = !!+(dTypeProps == null ? void 0 : dTypeProps.isEditable) || true;
    const blob = yield contentToBlob(content, mediaType);
    dType.setMediaType(mediaType || blob.type);
    const { data: gzipData, isGzip } = yield produceGzipData(blob);
    dType.isGzip = !!+(dTypeProps == null ? void 0 : dTypeProps.isGzip) || isGzip;
    dType.isOnServer = !!+(dTypeProps == null ? void 0 : dTypeProps.isOnServer) || gzipData.length < CONTENT_SIZE_LIMIT;
    dType.isEncrypted = !!+(dTypeProps == null ? void 0 : dTypeProps.isEncrypted);
    let esak = "";
    let publicKeyOfSender = "";
    const creatorOfEdge = edge.bvid instanceof Uint8Array ? store.level2SDK.utilServices.uint8ArrayToBase64(edge.bvid) : edge.bvid;
    const evidOfEdge = edge.evid instanceof Uint8Array ? store.level2SDK.utilServices.uint8ArrayToBase64(edge.evid) : edge.evid;
    const currentUserVid = localStorage.getItem("user_vid");
    const isCurrentUserCreatorOfEdge = creatorOfEdge === currentUserVid;
    const isCurrentUserOnEvidOfEdge = creatorOfEdge === evidOfEdge;
    const publicKeyOfCurrentUser = localStorage.getItem("pk") || "";
    const isInviteEdge = (edge == null ? void 0 : edge.type) === 4e4;
    if (isCurrentUserCreatorOfEdge) {
      if (edge.besak && (!!+(dTypeProps == null ? void 0 : dTypeProps.isEncrypted) || (dTypeProps == null ? void 0 : dTypeProps.isEncrypted) === "undefined")) {
        dType.isEncrypted = true;
        esak = edge.besak;
        publicKeyOfSender = publicKeyOfCurrentUser;
      } else if (!edge.besak && !!+(dTypeProps == null ? void 0 : dTypeProps.isEncrypted)) {
        dType.isEncrypted = true;
        let updatedEdge;
        publicKeyOfSender = publicKeyOfCurrentUser;
        esak = encryptionServices.generateESAK({ pk: publicKeyOfCurrentUser });
        try {
          updatedEdge = yield store.level2SDK.edgeServices.updateEdge({
            besak: esak,
            id: edge.eid,
            type: edge.type,
            name: edge.name
          });
        } catch (error) {
          console.log(error);
          esak = "";
        }
        if (!updatedEdge || !((_a = updatedEdge == null ? void 0 : updatedEdge.data) == null ? void 0 : _a.edge)) {
          esak = "";
        }
      }
    } else if (isInviteEdge && !isCurrentUserCreatorOfEdge) {
      const { data } = yield store.level2SDK.edgeServices.retrieveEdge({
        idList: getIdList(edge.eid),
        options: {
          type: 1053,
          xfname: "refid"
        }
      });
      const { edge: invites } = data;
      const inviteEdgeArray = invites.filter((invite) => {
        const evidUint8ArrayToBase64 = store.level2SDK.utilServices.uint8ArrayToBase64(invite.evid);
        return evidUint8ArrayToBase64 === currentUserVid;
      });
      const inviteEdge = inviteEdgeArray.length > 0 ? inviteEdgeArray.shift() : "";
      if (inviteEdge) {
        esak = inviteEdge.eesak;
      }
      if (!inviteEdge) {
        esak = "";
      }
      const { data: creatorOfEdgeResponse } = yield store.level2SDK.vertexServices.retrieveVertex({
        idList: getIdList(edge == null ? void 0 : edge.bvid)
      });
      const inviterVertex = (_b = creatorOfEdgeResponse == null ? void 0 : creatorOfEdgeResponse.vertex) == null ? void 0 : _b[0];
      publicKeyOfSender = (_c = inviterVertex == null ? void 0 : inviterVertex.deat) == null ? void 0 : _c.pk;
    } else if (isCurrentUserOnEvidOfEdge) {
      if (edge.eesak && (!!+(dTypeProps == null ? void 0 : dTypeProps.isEncrypted) || (dTypeProps == null ? void 0 : dTypeProps.isEncrypted) === "undefined")) {
        dType.isEncrypted = true;
        esak = edge.eesak;
        const { data: creatorOfEdgeResponse } = yield store.level2SDK.vertexServices.retrieveVertex({
          idList: getIdList(edge == null ? void 0 : edge.bvid)
        });
        const creatorOfEdgeVertex = (_d = creatorOfEdgeResponse == null ? void 0 : creatorOfEdgeResponse.vertex) == null ? void 0 : _d[0];
        publicKeyOfSender = (_e = creatorOfEdgeVertex == null ? void 0 : creatorOfEdgeVertex.deat) == null ? void 0 : _e.pk;
      }
    }
    let returnDataInUint8Array = gzipData;
    if (dType.isEncrypted) {
      const { data } = yield produceEncryptData(gzipData, esak, publicKeyOfSender);
      returnDataInUint8Array = data;
    }
    const bs64Data = yield store.level2SDK.utilServices.uint8ArrayToBase64(returnDataInUint8Array);
    dType.isBinary = false;
    const name = {
      title,
      tags,
      type: blob.type
    };
    if (user) {
      name.user = user;
    }
    if (targetRoomName) {
      name.targetRoomName = targetRoomName;
    }
    if (sesk) {
      name.sesk = sesk;
    }
    if (aesk) {
      name.aesk = aesk;
    }
    if (dType.isOnServer) {
      name.data = bs64Data;
    }
    if (paymentNonce) {
      name.nonce = paymentNonce;
    }
    const response = yield store.level2SDK.documentServices.createDocument({
      eid: edge.eid,
      eSig: reid,
      type,
      subtype: dType.value,
      name,
      tage,
      size: blob.size,
      fid,
      jwt
    }).then(store.responseCatcher).catch(store.errorCatcher);
    if (!response || !response.data) {
      throw new AiTmedError({
        name: "UNKNOW_ERROR",
        message: "Document -> create -> createDocument -> no response"
      });
    }
    const document = (_f = response.data) == null ? void 0 : _f.document;
    if (!document)
      return response;
    const { deat } = document;
    if (!dType.isOnServer && deat !== null && deat && deat.url && deat.sig) {
      yield store.level2SDK.documentServices.uploadDocumentToS3({ url: deat.url, sig: deat.sig, data: bs64Data }).then(store.responseCatcher).catch(store.errorCatcher);
    }
    if (dispatch) {
      yield dispatch({
        type: dispatchActionType.INSERT_TO_OBJECT_TABLE,
        payload: { doc: document }
      });
    }
    const note = yield documentToNote$1({ document });
    return {
      jwt: (_g = response == null ? void 0 : response.data) == null ? void 0 : _g.jwt,
      error: (_h = response == null ? void 0 : response.data) == null ? void 0 : _h.error,
      doc: note,
      code: (_i = response == null ? void 0 : response.data) == null ? void 0 : _i.code
    };
  });
  const nocheckcreate = (_0) => __async$i(window, [_0], function* ({
    edge_id,
    title,
    tags = [],
    content,
    tage,
    type,
    user,
    sesk,
    aesk,
    targetRoomName,
    fid,
    reid,
    mediaType,
    dataType = 0,
    dTypeProps,
    paymentNonce,
    jwt,
    dispatch
  }) {
    var _a, _b, _c, _d;
    const dType = new DType();
    dType.dataType = (dTypeProps == null ? void 0 : dTypeProps.applicationDataType) || (dTypeProps == null ? void 0 : dTypeProps.dataType) || dataType;
    dType.isEditable = !!+(dTypeProps == null ? void 0 : dTypeProps.isEditable) || true;
    const blob = yield contentToBlob(content, mediaType);
    dType.setMediaType(mediaType || blob.type);
    const { data: gzipData, isGzip } = yield produceGzipData(blob);
    dType.isGzip = !!+(dTypeProps == null ? void 0 : dTypeProps.isGzip) || isGzip;
    dType.isOnServer = !!+(dTypeProps == null ? void 0 : dTypeProps.isOnServer) || gzipData.length < CONTENT_SIZE_LIMIT;
    dType.isEncrypted = !!+(dTypeProps == null ? void 0 : dTypeProps.isEncrypted);
    let esak = "";
    let publicKeyOfSender = "";
    localStorage.getItem("user_vid");
    let returnDataInUint8Array = gzipData;
    if (dType.isEncrypted) {
      const { data } = yield produceEncryptData(gzipData, esak, publicKeyOfSender);
      returnDataInUint8Array = data;
    }
    const bs64Data = yield store.level2SDK.utilServices.uint8ArrayToBase64(returnDataInUint8Array);
    dType.isBinary = false;
    const name = {
      title,
      tags,
      type: blob.type
    };
    if (user) {
      name.user = user;
    }
    if (targetRoomName) {
      name.targetRoomName = targetRoomName;
    }
    if (sesk) {
      name.sesk = sesk;
    }
    if (aesk) {
      name.aesk = aesk;
    }
    if (dType.isOnServer) {
      name.data = bs64Data;
    }
    if (paymentNonce) {
      name.nonce = paymentNonce;
    }
    const response = yield store.level2SDK.documentServices.createDocument({
      eid: edge_id,
      eSig: reid,
      type,
      subtype: dType.value,
      name,
      tage,
      size: blob.size,
      fid,
      jwt
    }).then(store.responseCatcher).catch(store.errorCatcher);
    if (!response || !response.data) {
      throw new AiTmedError({
        name: "UNKNOW_ERROR",
        message: "Document -> create -> createDocument -> no response"
      });
    }
    const document = (_a = response.data) == null ? void 0 : _a.document;
    if (!document)
      return response;
    const { deat } = document;
    if (!dType.isOnServer && deat !== null && deat && deat.url && deat.sig) {
      yield store.level2SDK.documentServices.uploadDocumentToS3({ url: deat.url, sig: deat.sig, data: bs64Data }).then(store.responseCatcher).catch(store.errorCatcher);
    }
    if (dispatch) {
      yield dispatch({
        type: dispatchActionType.INSERT_TO_OBJECT_TABLE,
        payload: { doc: document }
      });
    }
    const note = yield documentToNote$1({ document });
    return {
      jwt: (_b = response == null ? void 0 : response.data) == null ? void 0 : _b.jwt,
      error: (_c = response == null ? void 0 : response.data) == null ? void 0 : _c.error,
      doc: note,
      code: (_d = response == null ? void 0 : response.data) == null ? void 0 : _d.code
    };
  });
  const retrieve = (id, _edge) => __async$i(window, null, function* () {
    const document = yield retrieveDocument(id);
    if (!document) {
      throw new AiTmedError({ name: "NOT_A_NOTE" });
    }
    const note = yield documentToNote$1({ document, _edge });
    return note;
  });
  const update = (_0, _1) => __async$i(window, [_0, _1], function* (id, {
    edge_id,
    title,
    content,
    mediaType,
    tags,
    type,
    dTypeProps,
    jwt,
    reid,
    fid
  }) {
    var _a, _b, _c, _d, _e;
    const document = yield retrieveDocument(id);
    if (!document) {
      throw new AiTmedError({ name: "NOT_A_NOTE" });
    }
    let edge;
    if (typeof edge_id !== "undefined") {
      edge = yield retrieveEdge(edge_id);
    } else {
      edge = yield retrieveEdge(document.eid);
    }
    if (!edge)
      throw new AiTmedError({ name: "EDGE_DOES_NOT_EXIST" });
    const params = {
      id: document.id,
      eid: edge.eid
    };
    const name = document.name;
    if (typeof title !== "undefined")
      name.title = title;
    if (typeof tags !== "undefined" && Array.isArray(name.tags) && Array.isArray(tags)) {
      const tagsSet = /* @__PURE__ */ new Set([...name.tags, ...tags]);
      name.tags = Array.from(tagsSet);
    }
    if (typeof tags !== "undefined" && (!Array.isArray(name.tags) || !Array.isArray(tags))) {
      name.tags = [];
    }
    const isOldDataStructure = typeof name.isOnS3 !== "undefined" || typeof name.isGzip !== "undefined" || typeof name.isBinary !== "undefined" || typeof name.isEncrypt !== "undefined" || typeof name.edit_mode !== "undefined";
    const dType = isOldDataStructure ? new DType() : new DType(document.type);
    let note;
    let response;
    if (typeof content === "undefined") {
      params.name = name;
      response = yield store.level2SDK.documentServices.updateDocument(__spreadProps$a(__spreadValues$b({}, params), { subtype: dType.value, jwt })).then(store.responseCatcher).catch(store.errorCatcher);
      if (!response || response.code !== 0) {
        throw new AiTmedError({
          name: "UNKNOW_ERROR",
          message: "Document -> update -> updateDocument -> no response"
        });
      }
      const doc = yield retrieveDocument(id);
      note = yield documentToNote$1({ document: doc });
    } else {
      const blob = yield contentToBlob(content, mediaType);
      const { data: gzipData, isGzip } = yield produceGzipData(blob);
      dType.isGzip = isGzip;
      dType.isOnServer = !!+(dTypeProps == null ? void 0 : dTypeProps.isOnServer) || gzipData.length < CONTENT_SIZE_LIMIT;
      let esak = "";
      let publicKeyOfSender = "";
      if (edge.besak && edge.sig) {
        esak = edge.besak;
        if (edge.sig instanceof Uint8Array) {
          publicKeyOfSender = yield store.level2SDK.utilServices.uint8ArrayToBase64(edge.sig);
        } else {
          publicKeyOfSender = edge.sig;
        }
      } else if (edge.eesak && edge.sig) {
        esak = edge.eesak;
        if (edge.sig instanceof Uint8Array) {
          publicKeyOfSender = yield store.level2SDK.utilServices.uint8ArrayToBase64(edge.sig);
        } else {
          publicKeyOfSender = edge.sig;
        }
      } else if (!!+(dTypeProps == null ? void 0 : dTypeProps.isEncrypted) && !edge.besak) {
        const pk = localStorage.getItem("pk");
        if (pk) {
          let updatedEdge;
          publicKeyOfSender = pk;
          esak = encryptionServices.generateESAK({ pk });
          try {
            updatedEdge = yield store.level2SDK.edgeServices.updateEdge({
              besak: esak,
              id: edge.eid,
              type: edge.type,
              name: edge.name,
              sig: pk
            });
          } catch (error) {
            console.log(error);
            esak = "";
          }
          if (!updatedEdge || !((_a = updatedEdge == null ? void 0 : updatedEdge.data) == null ? void 0 : _a.edge)) {
            esak = "";
          }
        }
      }
      const { data, isEncrypt } = yield produceEncryptData(gzipData, esak, publicKeyOfSender);
      dType.isEncrypted = isEncrypt;
      const bs64Data = yield store.level2SDK.utilServices.uint8ArrayToBase64(data);
      dType.isBinary = false;
      name.type = blob.type;
      params.size = blob.size;
      if (dType.isOnServer) {
        name.data = bs64Data;
        params.name = name;
      } else {
        if (typeof name.data !== "undefined")
          delete name.data;
      }
      response = yield store.level2SDK.documentServices.updateDocument({
        id: document.id,
        eid: edge_id,
        subtype: dType.value,
        name: params.name,
        size: blob.size,
        type,
        jwt,
        eSig: reid,
        fid
      });
      if (!response || response.code !== 0) {
        throw new AiTmedError({
          name: "UNKNOW_ERROR",
          message: "Document -> update -> updateDocument -> no response"
        });
      }
      const updatedDocument = (_b = response.data) == null ? void 0 : _b.document;
      const { deat } = updatedDocument;
      if (deat !== null && deat && deat.url && deat.sig && !dType.isOnServer) {
        yield store.level2SDK.documentServices.uploadDocumentToS3({ url: deat.url, sig: deat.sig, data: bs64Data }).then(store.responseCatcher).catch(store.errorCatcher);
      }
      const doc = yield retrieveDocument(updatedDocument.id);
      note = yield documentToNote$1({ document: doc });
    }
    return {
      jwt: (_c = response == null ? void 0 : response.data) == null ? void 0 : _c.jwt,
      error: (_d = response == null ? void 0 : response.data) == null ? void 0 : _d.error,
      doc: note,
      code: (_e = response == null ? void 0 : response.data) == null ? void 0 : _e.code
    };
  });

  var Document = /*#__PURE__*/Object.freeze({
    __proto__: null,
    create: create$3,
    nocheckcreate: nocheckcreate,
    retrieve: retrieve,
    update: update
  });

  const cache = {
    pages: {},
    refs: {}
  };

  /** Used to compose bitmasks for cloning. */
  var CLONE_SYMBOLS_FLAG = 4;

  /**
   * Creates a shallow clone of `value`.
   *
   * **Note:** This method is loosely based on the
   * [structured clone algorithm](https://mdn.io/Structured_clone_algorithm)
   * and supports cloning arrays, array buffers, booleans, date objects, maps,
   * numbers, `Object` objects, regexes, sets, strings, symbols, and typed
   * arrays. The own enumerable properties of `arguments` objects are cloned
   * as plain objects. An empty object is returned for uncloneable values such
   * as error objects, functions, DOM nodes, and WeakMaps.
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @category Lang
   * @param {*} value The value to clone.
   * @returns {*} Returns the cloned value.
   * @see _.cloneDeep
   * @example
   *
   * var objects = [{ 'a': 1 }, { 'b': 2 }];
   *
   * var shallow = _.clone(objects);
   * console.log(shallow[0] === objects[0]);
   * // => true
   */
  function clone(value) {
    return _baseClone(value, CLONE_SYMBOLS_FLAG);
  }

  var clone_1 = clone;

  /** `Object#toString` result references. */
  var symbolTag$1 = '[object Symbol]';

  /**
   * Checks if `value` is classified as a `Symbol` primitive or object.
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
   * @example
   *
   * _.isSymbol(Symbol.iterator);
   * // => true
   *
   * _.isSymbol('abc');
   * // => false
   */
  function isSymbol(value) {
    return typeof value == 'symbol' ||
      (isObjectLike_1(value) && _baseGetTag(value) == symbolTag$1);
  }

  var isSymbol_1 = isSymbol;

  /** Used to match property names within property paths. */
  var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,
      reIsPlainProp = /^\w*$/;

  /**
   * Checks if `value` is a property name and not a property path.
   *
   * @private
   * @param {*} value The value to check.
   * @param {Object} [object] The object to query keys on.
   * @returns {boolean} Returns `true` if `value` is a property name, else `false`.
   */
  function isKey(value, object) {
    if (isArray_1(value)) {
      return false;
    }
    var type = typeof value;
    if (type == 'number' || type == 'symbol' || type == 'boolean' ||
        value == null || isSymbol_1(value)) {
      return true;
    }
    return reIsPlainProp.test(value) || !reIsDeepProp.test(value) ||
      (object != null && value in Object(object));
  }

  var _isKey = isKey;

  /** Error message constants. */
  var FUNC_ERROR_TEXT = 'Expected a function';

  /**
   * Creates a function that memoizes the result of `func`. If `resolver` is
   * provided, it determines the cache key for storing the result based on the
   * arguments provided to the memoized function. By default, the first argument
   * provided to the memoized function is used as the map cache key. The `func`
   * is invoked with the `this` binding of the memoized function.
   *
   * **Note:** The cache is exposed as the `cache` property on the memoized
   * function. Its creation may be customized by replacing the `_.memoize.Cache`
   * constructor with one whose instances implement the
   * [`Map`](http://ecma-international.org/ecma-262/7.0/#sec-properties-of-the-map-prototype-object)
   * method interface of `clear`, `delete`, `get`, `has`, and `set`.
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @category Function
   * @param {Function} func The function to have its output memoized.
   * @param {Function} [resolver] The function to resolve the cache key.
   * @returns {Function} Returns the new memoized function.
   * @example
   *
   * var object = { 'a': 1, 'b': 2 };
   * var other = { 'c': 3, 'd': 4 };
   *
   * var values = _.memoize(_.values);
   * values(object);
   * // => [1, 2]
   *
   * values(other);
   * // => [3, 4]
   *
   * object.a = 2;
   * values(object);
   * // => [1, 2]
   *
   * // Modify the result cache.
   * values.cache.set(object, ['a', 'b']);
   * values(object);
   * // => ['a', 'b']
   *
   * // Replace `_.memoize.Cache`.
   * _.memoize.Cache = WeakMap;
   */
  function memoize(func, resolver) {
    if (typeof func != 'function' || (resolver != null && typeof resolver != 'function')) {
      throw new TypeError(FUNC_ERROR_TEXT);
    }
    var memoized = function() {
      var args = arguments,
          key = resolver ? resolver.apply(this, args) : args[0],
          cache = memoized.cache;

      if (cache.has(key)) {
        return cache.get(key);
      }
      var result = func.apply(this, args);
      memoized.cache = cache.set(key, result) || cache;
      return result;
    };
    memoized.cache = new (memoize.Cache || _MapCache);
    return memoized;
  }

  // Expose `MapCache`.
  memoize.Cache = _MapCache;

  var memoize_1 = memoize;

  /** Used as the maximum memoize cache size. */
  var MAX_MEMOIZE_SIZE = 500;

  /**
   * A specialized version of `_.memoize` which clears the memoized function's
   * cache when it exceeds `MAX_MEMOIZE_SIZE`.
   *
   * @private
   * @param {Function} func The function to have its output memoized.
   * @returns {Function} Returns the new memoized function.
   */
  function memoizeCapped(func) {
    var result = memoize_1(func, function(key) {
      if (cache.size === MAX_MEMOIZE_SIZE) {
        cache.clear();
      }
      return key;
    });

    var cache = result.cache;
    return result;
  }

  var _memoizeCapped = memoizeCapped;

  /** Used to match property names within property paths. */
  var rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;

  /** Used to match backslashes in property paths. */
  var reEscapeChar = /\\(\\)?/g;

  /**
   * Converts `string` to a property path array.
   *
   * @private
   * @param {string} string The string to convert.
   * @returns {Array} Returns the property path array.
   */
  var stringToPath = _memoizeCapped(function(string) {
    var result = [];
    if (string.charCodeAt(0) === 46 /* . */) {
      result.push('');
    }
    string.replace(rePropName, function(match, number, quote, subString) {
      result.push(quote ? subString.replace(reEscapeChar, '$1') : (number || match));
    });
    return result;
  });

  var _stringToPath = stringToPath;

  /**
   * A specialized version of `_.map` for arrays without support for iteratee
   * shorthands.
   *
   * @private
   * @param {Array} [array] The array to iterate over.
   * @param {Function} iteratee The function invoked per iteration.
   * @returns {Array} Returns the new mapped array.
   */
  function arrayMap(array, iteratee) {
    var index = -1,
        length = array == null ? 0 : array.length,
        result = Array(length);

    while (++index < length) {
      result[index] = iteratee(array[index], index, array);
    }
    return result;
  }

  var _arrayMap = arrayMap;

  /** Used as references for various `Number` constants. */
  var INFINITY$3 = 1 / 0;

  /** Used to convert symbols to primitives and strings. */
  var symbolProto$1 = _Symbol ? _Symbol.prototype : undefined,
      symbolToString = symbolProto$1 ? symbolProto$1.toString : undefined;

  /**
   * The base implementation of `_.toString` which doesn't convert nullish
   * values to empty strings.
   *
   * @private
   * @param {*} value The value to process.
   * @returns {string} Returns the string.
   */
  function baseToString(value) {
    // Exit early for strings to avoid a performance hit in some environments.
    if (typeof value == 'string') {
      return value;
    }
    if (isArray_1(value)) {
      // Recursively convert values (susceptible to call stack limits).
      return _arrayMap(value, baseToString) + '';
    }
    if (isSymbol_1(value)) {
      return symbolToString ? symbolToString.call(value) : '';
    }
    var result = (value + '');
    return (result == '0' && (1 / value) == -INFINITY$3) ? '-0' : result;
  }

  var _baseToString = baseToString;

  /**
   * Converts `value` to a string. An empty string is returned for `null`
   * and `undefined` values. The sign of `-0` is preserved.
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Lang
   * @param {*} value The value to convert.
   * @returns {string} Returns the converted string.
   * @example
   *
   * _.toString(null);
   * // => ''
   *
   * _.toString(-0);
   * // => '-0'
   *
   * _.toString([1, 2, 3]);
   * // => '1,2,3'
   */
  function toString(value) {
    return value == null ? '' : _baseToString(value);
  }

  var toString_1 = toString;

  /**
   * Casts `value` to a path array if it's not one.
   *
   * @private
   * @param {*} value The value to inspect.
   * @param {Object} [object] The object to query keys on.
   * @returns {Array} Returns the cast property path array.
   */
  function castPath(value, object) {
    if (isArray_1(value)) {
      return value;
    }
    return _isKey(value, object) ? [value] : _stringToPath(toString_1(value));
  }

  var _castPath = castPath;

  /** Used as references for various `Number` constants. */
  var INFINITY$2 = 1 / 0;

  /**
   * Converts `value` to a string key if it's not a string or symbol.
   *
   * @private
   * @param {*} value The value to inspect.
   * @returns {string|symbol} Returns the key.
   */
  function toKey(value) {
    if (typeof value == 'string' || isSymbol_1(value)) {
      return value;
    }
    var result = (value + '');
    return (result == '0' && (1 / value) == -INFINITY$2) ? '-0' : result;
  }

  var _toKey = toKey;

  /**
   * The base implementation of `_.get` without support for default values.
   *
   * @private
   * @param {Object} object The object to query.
   * @param {Array|string} path The path of the property to get.
   * @returns {*} Returns the resolved value.
   */
  function baseGet(object, path) {
    path = _castPath(path, object);

    var index = 0,
        length = path.length;

    while (object != null && index < length) {
      object = object[_toKey(path[index++])];
    }
    return (index && index == length) ? object : undefined;
  }

  var _baseGet = baseGet;

  /**
   * Gets the value at `path` of `object`. If the resolved value is
   * `undefined`, the `defaultValue` is returned in its place.
   *
   * @static
   * @memberOf _
   * @since 3.7.0
   * @category Object
   * @param {Object} object The object to query.
   * @param {Array|string} path The path of the property to get.
   * @param {*} [defaultValue] The value returned for `undefined` resolved values.
   * @returns {*} Returns the resolved value.
   * @example
   *
   * var object = { 'a': [{ 'b': { 'c': 3 } }] };
   *
   * _.get(object, 'a[0].b.c');
   * // => 3
   *
   * _.get(object, ['a', '0', 'b', 'c']);
   * // => 3
   *
   * _.get(object, 'a.b.c', 'default');
   * // => 'default'
   */
  function get$3(object, path, defaultValue) {
    var result = object == null ? undefined : _baseGet(object, path);
    return result === undefined ? defaultValue : result;
  }

  var get_1 = get$3;

  /**
   * The base implementation of `_.set`.
   *
   * @private
   * @param {Object} object The object to modify.
   * @param {Array|string} path The path of the property to set.
   * @param {*} value The value to set.
   * @param {Function} [customizer] The function to customize path creation.
   * @returns {Object} Returns `object`.
   */
  function baseSet(object, path, value, customizer) {
    if (!isObject_1(object)) {
      return object;
    }
    path = _castPath(path, object);

    var index = -1,
        length = path.length,
        lastIndex = length - 1,
        nested = object;

    while (nested != null && ++index < length) {
      var key = _toKey(path[index]),
          newValue = value;

      if (key === '__proto__' || key === 'constructor' || key === 'prototype') {
        return object;
      }

      if (index != lastIndex) {
        var objValue = nested[key];
        newValue = customizer ? customizer(objValue, key, nested) : undefined;
        if (newValue === undefined) {
          newValue = isObject_1(objValue)
            ? objValue
            : (_isIndex(path[index + 1]) ? [] : {});
        }
      }
      _assignValue(nested, key, newValue);
      nested = nested[key];
    }
    return object;
  }

  var _baseSet = baseSet;

  /**
   * Sets the value at `path` of `object`. If a portion of `path` doesn't exist,
   * it's created. Arrays are created for missing index properties while objects
   * are created for all other missing properties. Use `_.setWith` to customize
   * `path` creation.
   *
   * **Note:** This method mutates `object`.
   *
   * @static
   * @memberOf _
   * @since 3.7.0
   * @category Object
   * @param {Object} object The object to modify.
   * @param {Array|string} path The path of the property to set.
   * @param {*} value The value to set.
   * @returns {Object} Returns `object`.
   * @example
   *
   * var object = { 'a': [{ 'b': { 'c': 3 } }] };
   *
   * _.set(object, 'a[0].b.c', 4);
   * console.log(object.a[0].b.c);
   * // => 4
   *
   * _.set(object, ['x', '0', 'y', 'z'], 5);
   * console.log(object.x[0].y.z);
   * // => 5
   */
  function set(object, path, value) {
    return object == null ? object : _baseSet(object, path, value);
  }

  var set_1 = set;

  const _TEST_ = false;
  function defineProperty(obj, key = "", get, set) {
    let value = get();
    Object.defineProperty(obj, key, {
      configurable: true,
      enumerable: true,
      get() {
        return value;
      },
      set() {
        value = get();
      }
    });
  }
  function hasPropertyDescriptor(obj, key = "", method = "get") {
    var _a;
    return !!(u__namespace.isObj(obj) && ((_a = Object.getOwnPropertyDescriptor(obj, key)) == null ? void 0 : _a[method]));
  }
  function isBrowser() {
    return typeof window !== "undefined";
  }
  function isCapitalized(s = "") {
    return !!(s && u__namespace.isStr(s) && s[0] === s[0].toUpperCase());
  }
  function bridge(value, callback) {
    if (!u__namespace.isUnd(value))
      return value;
    return u__namespace.isFnc(callback) ? callback() : value;
  }

  function mergeDeep(target, source) {
    let output = target;
    if (u__namespace.isObj(target) && u__namespace.isObj(source)) {
      Object.keys(source).forEach((key) => {
        if (u__namespace.isObj(source[key])) {
          if (!(key in target)) {
            output[key] = source[key];
          } else if (u__namespace.isObj(target[key])) {
            output[key] = mergeDeep(target[key], source[key]);
          } else {
            output[key] = source[key];
          }
        } else if (source[key] === null && target[key] !== null) {
          output[key] = target[key];
        } else {
          output[key] = source[key];
        }
      });
    }
    return output;
  }

  var __defProp$a = Object.defineProperty;
  var __defProps$9 = Object.defineProperties;
  var __getOwnPropDescs$9 = Object.getOwnPropertyDescriptors;
  var __getOwnPropSymbols$b = Object.getOwnPropertySymbols;
  var __hasOwnProp$b = Object.prototype.hasOwnProperty;
  var __propIsEnum$b = Object.prototype.propertyIsEnumerable;
  var __defNormalProp$a = (obj, key, value) => key in obj ? __defProp$a(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __spreadValues$a = (a, b) => {
    for (var prop in b || (b = {}))
      if (__hasOwnProp$b.call(b, prop))
        __defNormalProp$a(a, prop, b[prop]);
    if (__getOwnPropSymbols$b)
      for (var prop of __getOwnPropSymbols$b(b)) {
        if (__propIsEnum$b.call(b, prop))
          __defNormalProp$a(a, prop, b[prop]);
      }
    return a;
  };
  var __spreadProps$9 = (a, b) => __defProps$9(a, __getOwnPropDescs$9(b));
  function replaceEidWithId(edge) {
    let output = Object.assign({}, edge);
    const { eid } = output;
    if (eid) {
      const b64Id = store.utils.idToBase64(eid);
      output = __spreadProps$9(__spreadValues$a({}, output), { id: b64Id });
      delete output.eid;
      return output;
    } else {
      return edge;
    }
  }

  var __defProp$9 = Object.defineProperty;
  var __defProps$8 = Object.defineProperties;
  var __getOwnPropDescs$8 = Object.getOwnPropertyDescriptors;
  var __getOwnPropSymbols$a = Object.getOwnPropertySymbols;
  var __hasOwnProp$a = Object.prototype.hasOwnProperty;
  var __propIsEnum$a = Object.prototype.propertyIsEnumerable;
  var __defNormalProp$9 = (obj, key, value) => key in obj ? __defProp$9(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __spreadValues$9 = (a, b) => {
    for (var prop in b || (b = {}))
      if (__hasOwnProp$a.call(b, prop))
        __defNormalProp$9(a, prop, b[prop]);
    if (__getOwnPropSymbols$a)
      for (var prop of __getOwnPropSymbols$a(b)) {
        if (__propIsEnum$a.call(b, prop))
          __defNormalProp$9(a, prop, b[prop]);
      }
    return a;
  };
  var __spreadProps$8 = (a, b) => __defProps$8(a, __getOwnPropDescs$8(b));
  var __objRest$6 = (source, exclude) => {
    var target = {};
    for (var prop in source)
      if (__hasOwnProp$a.call(source, prop) && exclude.indexOf(prop) < 0)
        target[prop] = source[prop];
    if (source != null && __getOwnPropSymbols$a)
      for (var prop of __getOwnPropSymbols$a(source)) {
        if (exclude.indexOf(prop) < 0 && __propIsEnum$a.call(source, prop))
          target[prop] = source[prop];
      }
    return target;
  };
  var __async$h = (__this, __arguments, generator) => {
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
  function get$2({
    apiObject,
    pageName,
    dispatch
  }) {
    return function sendRetrieveEdge() {
      return __async$h(this, null, function* () {
        var _d;
        let res = {};
        let _a = cloneDeep_1(apiObject || {}), { api, dataKey, dataIn, dataOut } = _a, options = __objRest$6(_a, ["api", "dataKey", "dataIn", "dataOut"]);
        let idList = [];
        let requestOptions = __spreadValues$9({}, options);
        let maxcount = options == null ? void 0 : options.maxcount;
        let type = options == null ? void 0 : options.type;
        let sCondition = options == null ? void 0 : options.sCondition;
        let nonce = null;
        let currentVal = yield dispatch({
          type: dispatchActionType.GET_DATA,
          payload: { pageName, dataKey: dataIn || dataKey }
        });
        if (dataIn) {
          const _b = yield dispatch({
            type: dispatchActionType.POPULATE_OBJECT,
            payload: { object: currentVal, pageName, copy: true }
          }), { deat: deat2, id: id2, _nonce: _nonce2 } = _b, populatedCurrentVal2 = __objRest$6(_b, ["deat", "id", "_nonce"]);
          if (!isPopulated(id2)) {
            return console.error(new UnableToLocateValue(`Missing reference ${id2} at page ${pageName}`));
          }
          idList = getIdList(id2);
          nonce = _nonce2;
          requestOptions = __spreadValues$9(__spreadValues$9({}, requestOptions), populatedCurrentVal2);
          maxcount = populatedCurrentVal2 == null ? void 0 : populatedCurrentVal2.maxcount;
          type = populatedCurrentVal2 == null ? void 0 : populatedCurrentVal2.type;
          sCondition = populatedCurrentVal2 == null ? void 0 : populatedCurrentVal2.sCondition;
        } else if (options.id) {
          idList = getIdList(options.id);
        }
        const _c = yield dispatch({
          type: dispatchActionType.POPULATE_OBJECT,
          payload: { object: requestOptions, pageName }
        }), populatedCurrentVal = __objRest$6(_c, ["deat", "id", "_nonce"]);
        maxcount && (requestOptions.maxcount = parseInt(maxcount));
        requestOptions = __spreadValues$9(__spreadValues$9({}, requestOptions), populatedCurrentVal);
        sCondition && (requestOptions.scondition = sCondition);
        type && (requestOptions.type = parseInt(type));
        const { pass: shouldPass, cacheIndex } = yield dispatch({
          type: dispatchActionType.SET_API_BUFFER,
          payload: {
            apiObject: {
              idList,
              options: requestOptions,
              nonce
            }
          }
        });
        try {
          if (store.env === "test" && !_TEST_) {
            console.log("%cGet Edge Request", "background: purple; color: white; display: block;", { idList, options: requestOptions });
          }
          if (!shouldPass) {
            res = yield dispatch({
              type: dispatchActionType.GET_CACHE,
              payload: { cacheIndex }
            });
            if (store.env === "test" && !_TEST_) {
              console.log(`%cUsing Cached Data for`, "background:#7268A6; color: white; display: block;", apiObject);
            }
          } else {
            const { data } = yield store.level2SDK.edgeServices.retrieveEdge({
              idList: getIdList(idList),
              options: requestOptions
            });
            yield dispatch({
              type: dispatchActionType.SET_CACHE,
              payload: { data, cacheIndex }
            });
            res = data;
          }
        } catch (error) {
          throw error;
        }
        if (!((_d = res == null ? void 0 : res.edge) == null ? void 0 : _d.length) && store.env === "test") {
          console.log("%cGet Edge Response", "background: purple; color: white; display: block;", res);
        } else {
          res.edge = u__namespace.reduce(u__namespace.array(res == null ? void 0 : res.edge), (acc, edge) => edge ? acc.concat(replaceEidWithId(edge)) : acc, []);
          if (store.env === "test" && !_TEST_) {
            console.log("%cGet Edge Response", "background: purple; color: white; display: block;", res);
          }
          if (res.jwt) {
            yield dispatch({
              type: dispatchActionType.UPDATE_DATA,
              payload: {
                dataKey: "Global.currentUser.JWT",
                data: res.jwt
              }
            });
          }
          yield dispatch({
            type: dispatchActionType.UPDATE_DATA,
            payload: {
              pageName,
              dataKey: dataOut || dataKey,
              data: res
            }
          });
        }
        return res;
      });
    };
  }
  function create$2({ pageName, apiObject, dispatch }) {
    return function sendCreateEdge(name) {
      return __async$h(this, null, function* () {
        var _b, _c, _d;
        const { dataKey, dataIn, dataOut } = cloneDeep_1(apiObject || {});
        const _a = yield dispatch({
          type: dispatchActionType.GET_DATA,
          payload: { pageName, dataKey: dataIn || dataKey }
        }), { deat, id } = _a, rest = __objRest$6(_a, ["deat", "id"]);
        let obj = yield dispatch({
          type: dispatchActionType.POPULATE_OBJECT,
          payload: { object: rest, pageName, copy: true }
        });
        let isFCMRegisterEdge = obj.type === 1090;
        isFCMRegisterEdge && (obj.subtype = 2);
        if (!isPopulated(id)) {
          throw new UnableToLocateValue(`Missing reference ${id} at page ${pageName}`);
        }
        let parsedType = parseInt(obj.type);
        let res;
        if (Number.isNaN(parsedType) || parsedType === 0)
          return;
        obj = __spreadProps$8(__spreadValues$9({}, obj), { type: parsedType });
        name && (obj = mergeDeep(obj, { name }));
        if (id && !id.startsWith(".")) {
          try {
            if (store.env === "test" && !_TEST_) {
              console.log("%cUpdate Edge Request", "background: purple; color: white; display: block;", __spreadProps$8(__spreadValues$9({}, obj), { id }));
            }
            res = (_b = yield store.level2SDK.edgeServices.updateEdge(__spreadProps$8(__spreadValues$9({}, obj), {
              id
            }))) == null ? void 0 : _b.data;
            if (store.env === "test" && !_TEST_) {
              console.log("%cUpdate Edge Response", "background: purple; color: white; display: block;", res);
            }
          } catch (error) {
            throw error;
          }
        } else {
          try {
            if (store.env === "test") {
              console.log("%cCreate Edge Request", "background: purple; color: white; display: block;", obj);
            }
            const { data } = yield store.level2SDK.edgeServices.createEdge(obj);
            const isInviteEdge = ((_c = data == null ? void 0 : data.edge) == null ? void 0 : _c.type) === 1053;
            if (isInviteEdge) {
              const pkOfInviter = localStorage.getItem("pk");
              const skOfInviter = localStorage.getItem("sk");
              const {
                data: { edge }
              } = yield store.level2SDK.edgeServices.retrieveEdge({
                idList: getIdList((_d = data == null ? void 0 : data.edge) == null ? void 0 : _d.refid)
              });
              let rootEdge = edge[0];
              let rootEdgeBesak = rootEdge == null ? void 0 : rootEdge.besak;
              if (!(rootEdge == null ? void 0 : rootEdge.besak)) {
                const besak = store.level2SDK.commonServices.generateEsak(pkOfInviter);
                const { data: updatedRootEdgeRes } = yield store.level2SDK.edgeServices.updateEdge({
                  id: rootEdge.eid,
                  type: 4e4,
                  besak,
                  name: rootEdge.name
                });
                if (updatedRootEdgeRes == null ? void 0 : updatedRootEdgeRes.edge)
                  rootEdgeBesak = besak;
              }
              let pkOfInviterToUint8Array;
              let skOfInviterToUint8Array;
              if (pkOfInviter && skOfInviter) {
                pkOfInviterToUint8Array = store.level2SDK.utilServices.base64ToUint8Array(pkOfInviter);
                skOfInviterToUint8Array = store.level2SDK.utilServices.base64ToUint8Array(skOfInviter);
              }
              const sak = store.level2SDK.utilServices.aKeyDecrypt(pkOfInviterToUint8Array, skOfInviterToUint8Array, rootEdgeBesak);
              const inviteEdge = data == null ? void 0 : data.edge;
              const pkOfInvitee = inviteEdge.deat.evPK ? inviteEdge.deat.evPK : inviteEdge.deat.eePK;
              const pkOfInviteeToUint8Array = store.level2SDK.utilServices.base64ToUint8Array(pkOfInvitee);
              if (sak) {
                const eesak = store.level2SDK.utilServices.aKeyEncrypt(pkOfInviteeToUint8Array, skOfInviterToUint8Array, sak);
                const { data: updatedInviteEdgeRes } = yield store.level2SDK.edgeServices.updateEdge({
                  id: inviteEdge.eid,
                  type: 1053,
                  eesak,
                  name: inviteEdge.name
                });
                res = updatedInviteEdgeRes;
              }
            } else {
              res = data;
            }
            if (store.env === "test" && !_TEST_) {
              console.log("%cCreate Edge Response", "background: purple; color: white; display: block;", res);
            }
          } catch (error) {
            throw error;
          }
        }
        if (res) {
          res.edge = replaceEidWithId(res.edge);
          if (res.jwt) {
            yield dispatch({
              type: dispatchActionType.UPDATE_DATA,
              payload: { dataKey: "Global.currentUser.JWT", data: res.jwt }
            });
          }
          yield dispatch({
            type: dispatchActionType.UPDATE_DATA,
            payload: {
              pageName,
              dataKey: dataOut || dataKey,
              data: res
            }
          });
          yield dispatch({
            type: dispatchActionType.POPULATE,
            payload: { pageName }
          });
        }
        return res;
      });
    };
  }

  var __defProp$8 = Object.defineProperty;
  var __defProps$7 = Object.defineProperties;
  var __getOwnPropDescs$7 = Object.getOwnPropertyDescriptors;
  var __getOwnPropSymbols$9 = Object.getOwnPropertySymbols;
  var __hasOwnProp$9 = Object.prototype.hasOwnProperty;
  var __propIsEnum$9 = Object.prototype.propertyIsEnumerable;
  var __defNormalProp$8 = (obj, key, value) => key in obj ? __defProp$8(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __spreadValues$8 = (a, b) => {
    for (var prop in b || (b = {}))
      if (__hasOwnProp$9.call(b, prop))
        __defNormalProp$8(a, prop, b[prop]);
    if (__getOwnPropSymbols$9)
      for (var prop of __getOwnPropSymbols$9(b)) {
        if (__propIsEnum$9.call(b, prop))
          __defNormalProp$8(a, prop, b[prop]);
      }
    return a;
  };
  var __spreadProps$7 = (a, b) => __defProps$7(a, __getOwnPropDescs$7(b));
  var __objRest$5 = (source, exclude) => {
    var target = {};
    for (var prop in source)
      if (__hasOwnProp$9.call(source, prop) && exclude.indexOf(prop) < 0)
        target[prop] = source[prop];
    if (source != null && __getOwnPropSymbols$9)
      for (var prop of __getOwnPropSymbols$9(source)) {
        if (exclude.indexOf(prop) < 0 && __propIsEnum$9.call(source, prop))
          target[prop] = source[prop];
      }
    return target;
  };
  var __async$g = (__this, __arguments, generator) => {
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
  function get$1({ pageName, apiObject, dispatch }) {
    return function sendRetrieveVertex() {
      return __async$g(this, null, function* () {
        const _a = cloneDeep_1(apiObject || {}), { api, dataKey, dataIn, dataOut } = _a, options = __objRest$5(_a, ["api", "dataKey", "dataIn", "dataOut"]);
        let res = {};
        let idList = [];
        let nonce;
        let requestOptions = options;
        let sCondition = options == null ? void 0 : options.sCondition;
        let currentVal = yield dispatch({
          type: dispatchActionType.GET_DATA,
          payload: { pageName, dataKey: dataIn || dataKey }
        });
        let _b = yield dispatch({
          type: dispatchActionType.POPULATE_OBJECT,
          payload: { object: currentVal, pageName, copy: true }
        }), { deat, id, _nonce } = _b, populatedCurrentVal = __objRest$5(_b, ["deat", "id", "_nonce"]);
        nonce = _nonce;
        if (!isPopulated(id)) {
          throw new UnableToLocateValue(`Missing reference ${id} at page ${pageName}`);
        }
        idList = getIdList(id);
        requestOptions = __spreadValues$8(__spreadValues$8({}, requestOptions), populatedCurrentVal);
        sCondition = populatedCurrentVal == null ? void 0 : populatedCurrentVal.sCondition;
        try {
          if (!_TEST_ && store.env === "test") {
            console.log("%cGet Vertex Request", "background: purple; color: white; display: block;", { idList, options: requestOptions });
          }
          if (sCondition) {
            requestOptions.scondition = sCondition;
          }
          const { pass: shouldPass, cacheIndex } = yield dispatch({
            type: dispatchActionType.SET_API_BUFFER,
            payload: {
              apiObject: {
                idList,
                options: requestOptions,
                nonce
              }
            }
          });
          if (!shouldPass) {
            res = yield dispatch({
              type: dispatchActionType.GET_CACHE,
              payload: { cacheIndex }
            });
            if (store.env === "test") {
              console.log(`%cUsing Cached Data for`, "background:#7268A6; color: white; display: block;", apiObject);
            }
          } else {
            if (requestOptions.sCondition) {
              requestOptions.scondition = requestOptions.sCondition;
              delete requestOptions.sCondition;
            }
            console.log(u__namespace.cyan("store.level2SDK"), store);
            const { data } = yield store.level2SDK.vertexServices.retrieveVertex({
              idList,
              options: requestOptions
            });
            yield dispatch({
              type: dispatchActionType.SET_CACHE,
              payload: { data, cacheIndex }
            });
            res = data;
            if (!_TEST_ && store.env === "test") {
              console.log("%cGet Vertex Response", "background: purple; color: white; display: block;", res);
            }
          }
        } catch (error) {
          throw error;
        }
        if (res) {
          if (store.env === "test") {
            console.log("%cGet Vertex Response", "background: purple; color: white; display: block;", res);
          }
          if (res.jwt) {
            yield dispatch({
              type: dispatchActionType.UPDATE_DATA,
              payload: {
                dataKey: "Global.currentUser.JWT",
                data: res.jwt
              }
            });
          }
          yield dispatch({
            type: dispatchActionType.UPDATE_DATA,
            payload: {
              pageName,
              dataKey: dataOut ? dataOut : dataKey,
              data: res
            }
          });
        }
        return res;
      });
    };
  }
  function create$1({ pageName, apiObject, dispatch }) {
    return function sendCreateVertex(name) {
      return __async$g(this, null, function* () {
        const { dataKey, dataIn, dataOut } = cloneDeep_1(apiObject || {});
        const _a = yield dispatch({
          type: dispatchActionType.GET_DATA,
          payload: {
            dataKey: dataIn ? dataIn : dataKey,
            pageName
          }
        }), currentVal = __objRest$5(_a, ["deat"]);
        let _b = yield dispatch({
          type: dispatchActionType.POPULATE_OBJECT,
          payload: { object: currentVal, pageName, copy: true }
        }), { id } = _b, populatedCurrentVal = __objRest$5(_b, ["id"]);
        if (!isPopulated(id)) {
          const err = new UnableToLocateValue(`Missing reference ${id} at page ${pageName}`);
          return console.error(err);
        }
        let mergedVal = populatedCurrentVal;
        if (name) {
          mergedVal = mergeDeep(mergedVal, { name });
        }
        const _c = mergedVal, options = __objRest$5(_c, ["api", "store", "get"]);
        let res;
        if (id) {
          try {
            if (!_TEST_ && store.env === "test") {
              console.log("%cUpdate Vertex Request", "background: purple; color: white; display: block;", __spreadProps$7(__spreadValues$8({}, options), { id }));
            }
            if (options["type"]) {
              options["type"] = parseInt(options == null ? void 0 : options.type);
            }
            if (options["tage"]) {
              options["tage"] = parseInt(options == null ? void 0 : options.tage);
            }
            const { data } = yield store.level2SDK.vertexServices.updateVertex(__spreadProps$7(__spreadValues$8({}, options), {
              id
            }));
            res = data;
            if (!_TEST_ && store.env === "test") {
              console.log("%cUpdate Vertex Response", "background: purple; color: white; display: block;", res);
            }
          } catch (error) {
            throw error;
          }
        } else {
          if (options["type"]) {
            options["type"] = parseInt(options == null ? void 0 : options.type);
          }
          if (options["tage"]) {
            options["tage"] = parseInt(options == null ? void 0 : options.tage);
          }
          try {
            if (!_TEST_ && store.env === "test") {
              console.log("%cCreate Vertex Request", "background: purple; color: white; display: block;", __spreadValues$8({}, options));
            }
            const response = yield store.level2SDK.vertexServices.createVertex(__spreadValues$8({}, options));
            res = response;
            if (!_TEST_ && store.env === "test") {
              console.log("%cCreate Vertex Response", "background: purple; color: white; display: block;", res);
            }
          } catch (error) {
            throw error;
          }
        }
        if (res) {
          if (res.jwt) {
            yield dispatch({
              type: dispatchActionType.UPDATE_DATA,
              payload: {
                dataKey: "Global.currentUser.JWT",
                data: res.jwt
              }
            });
          }
          yield dispatch({
            type: dispatchActionType.UPDATE_DATA,
            payload: {
              pageName,
              dataKey: dataOut ? dataOut : dataKey,
              data: res
            }
          });
        }
        return res;
      });
    };
  }

  var __defProp$7 = Object.defineProperty;
  var __defProps$6 = Object.defineProperties;
  var __getOwnPropDescs$6 = Object.getOwnPropertyDescriptors;
  var __getOwnPropSymbols$8 = Object.getOwnPropertySymbols;
  var __hasOwnProp$8 = Object.prototype.hasOwnProperty;
  var __propIsEnum$8 = Object.prototype.propertyIsEnumerable;
  var __defNormalProp$7 = (obj, key, value) => key in obj ? __defProp$7(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __spreadValues$7 = (a, b) => {
    for (var prop in b || (b = {}))
      if (__hasOwnProp$8.call(b, prop))
        __defNormalProp$7(a, prop, b[prop]);
    if (__getOwnPropSymbols$8)
      for (var prop of __getOwnPropSymbols$8(b)) {
        if (__propIsEnum$8.call(b, prop))
          __defNormalProp$7(a, prop, b[prop]);
      }
    return a;
  };
  var __spreadProps$6 = (a, b) => __defProps$6(a, __getOwnPropDescs$6(b));
  var __async$f = (__this, __arguments, generator) => {
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
  const documentToNote = (_0) => __async$f(window, [_0], function* ({
    document,
    _edge,
    esakOfCurrentUser
  }) {
    var _a, _b;
    !document && (document = {});
    const name = document.name || {};
    const contentType = parseInt(name.type) === 0 ? "text/plain" : name.type;
    const deat = document.deat;
    const dType = new DType(document.subtype);
    let content = null;
    try {
      let data;
      if (dType.isOnServer) {
        if (name.data !== void 0) {
          data = yield store.level2SDK.utilServices.base64ToUint8Array(name.data);
        } else {
          throw new AiTmedError({
            name: "UNKNOW_ERROR",
            message: "name.data is undefined"
          });
        }
      } else {
        if (deat !== null && deat.url) {
          const response = yield store.level2SDK.documentServices.downloadDocumentFromS3({ url: deat.url }).then(store.responseCatcher).catch(store.errorCatcher);
          if (!response)
            throw "no response";
          data = dType.isBinary ? response.data : yield store.level2SDK.utilServices.base64ToUint8Array(response.data);
        } else {
          throw "deat.url is missing";
        }
      }
      if (dType.isEncrypted) {
        const edge = typeof _edge === "undefined" ? yield retrieveAuthorizationEdge(document) : _edge;
        if (edge === null)
          throw new AiTmedError({
            name: "UNKNOW_ERROR",
            message: "Document -> documentToNote -> retrieveEdge -> edge is null"
          });
        const vid = localStorage.getItem("user_vid");
        const edgeHasBesak = edge.besak && edge.besak !== "";
        const edgeHasEesak = edge.eesak && edge.eesak !== "";
        let inviteEdge;
        if (edge.type > 9999) {
          const vidUint8ArrayToBase64 = store.level2SDK.utilServices.uint8ArrayToBase64(edge.bvid);
          if (vidUint8ArrayToBase64 !== vid) {
            const { data: data2 } = yield store.level2SDK.edgeServices.retrieveEdge({
              idList: getIdList(edge.eid),
              options: {
                type: 1053,
                xfname: "refid"
              }
            });
            const { edge: invites } = data2;
            const inviteEdgeArray = invites.filter((invite) => {
              const evidUint8ArrayToBase64 = store.level2SDK.utilServices.uint8ArrayToBase64(invite.evid);
              return evidUint8ArrayToBase64 === vid;
            });
            inviteEdge = inviteEdgeArray.length > 0 ? inviteEdgeArray.shift() : "";
          }
        }
        if (dType.isEncrypted && (edgeHasBesak || edgeHasEesak || inviteEdge.eesak)) {
          let esak;
          const creatorOfEdge = edge.bvid instanceof Uint8Array ? store.level2SDK.utilServices.uint8ArrayToBase64(edge.evid) : edge.evid;
          const currentUserVid = localStorage.getItem("user_vid");
          const isCurrentUserCreatorOfEdge = creatorOfEdge === currentUserVid ? store.level2SDK.utilServices.uint8ArrayToBase64(edge.bvid) : edge.bvid;
          if (inviteEdge) {
            esak = inviteEdge.eesak;
          } else if (esakOfCurrentUser) {
            esak = esakOfCurrentUser;
          } else {
            esak = edgeHasBesak ? edge.besak : edge.eesak;
          }
          let publicKeyOfSender;
          if (inviteEdge) {
            const { data: inviterVertexResponse } = yield store.level2SDK.vertexServices.retrieveVertex({
              idList: getIdList(inviteEdge == null ? void 0 : inviteEdge.bvid)
            });
            const inviterVertex = (_a = inviterVertexResponse == null ? void 0 : inviterVertexResponse.vertex) == null ? void 0 : _a[0];
            publicKeyOfSender = store.level2SDK.utilServices.uint8ArrayToBase64(inviterVertex == null ? void 0 : inviterVertex.pk);
            try {
              data = yield store.level2SDK.commonServices.decryptData(esak, publicKeyOfSender, data);
            } catch (error2) {
              console.log(error2);
            }
          } else if (!isCurrentUserCreatorOfEdge) {
            const { data: creatorOfEdgeResponse } = yield store.level2SDK.vertexServices.retrieveVertex({
              idList: getIdList(edge == null ? void 0 : edge.bvid)
            });
            const creatorOfEdgeVertex = (_b = creatorOfEdgeResponse == null ? void 0 : creatorOfEdgeResponse.vertex) == null ? void 0 : _b[0];
            publicKeyOfSender = store.level2SDK.utilServices.uint8ArrayToBase64(creatorOfEdgeVertex == null ? void 0 : creatorOfEdgeVertex.pk);
            data = yield store.level2SDK.commonServices.decryptData(esak, publicKeyOfSender, data);
          } else if (edge.type === 10001) {
            const pkLocalStorage = localStorage.getItem("pk");
            publicKeyOfSender = pkLocalStorage ? pkLocalStorage : "";
            data = yield store.level2SDK.commonServices.decryptData(esak, publicKeyOfSender, data);
          } else if (edge.type === 1e4) {
            const pkLocalStorage = localStorage.getItem("pk");
            publicKeyOfSender = pkLocalStorage ? pkLocalStorage : "";
            data = yield store.level2SDK.commonServices.decryptData(esak, publicKeyOfSender, data);
          } else {
            publicKeyOfSender = localStorage.getItem("pk") || "";
            data = yield store.level2SDK.commonServices.decryptData(esak, publicKeyOfSender, data);
          }
        }
      }
      if (dType.isGzip)
        data = ungzip(data);
      const blob = yield store.level2SDK.utilServices.uint8ArrayToBlob(data, contentType);
      if (/^text\//.test(blob.type)) {
        content = yield new Response(blob).text();
      } else if (blob.type === "application/json") {
        const jsonStr = yield new Response(blob).text();
        try {
          content = JSON.parse(jsonStr);
        } catch (error2) {
          content = jsonStr;
        }
      } else {
        content = blob;
      }
    } catch (reason) {
      if (typeof reason === "string") {
        new AiTmedError({
          name: "DOWNLOAD_FROM_S3_FAIL",
          message: `Document -> documentToNote -> ${reason}`
        });
      }
      content = null;
    }
    if (content instanceof Blob) {
      content = yield store.level2SDK.utilServices.blobToBase64(content);
    }
    return __spreadProps$6(__spreadValues$7({}, document), {
      name: {
        title: name.title,
        nonce: name == null ? void 0 : name.nonce,
        targetRoomName: name == null ? void 0 : name.targetRoomName,
        user: name == null ? void 0 : name.user,
        sesk: name == null ? void 0 : name.sesk,
        aesk: name == null ? void 0 : name.aesk,
        type: contentType === "text/plain" ? "application/json" : contentType,
        data: content,
        tags: name.tags || []
      },
      created_at: document.ctime * 1e3,
      modified_at: document.mtime * 1e3,
      subtype: {
        isOnServer: dType.isOnServer,
        isZipped: dType.isGzip,
        isBinary: dType.isBinary,
        isEncrypted: dType.isEncrypted,
        isEditable: dType.isEditable,
        applicationDataType: dType.dataType,
        mediaType: dType.mediaType,
        size: document.size
      }
    });
  });

  var __defProp$6 = Object.defineProperty;
  var __defProps$5 = Object.defineProperties;
  var __getOwnPropDescs$5 = Object.getOwnPropertyDescriptors;
  var __getOwnPropSymbols$7 = Object.getOwnPropertySymbols;
  var __hasOwnProp$7 = Object.prototype.hasOwnProperty;
  var __propIsEnum$7 = Object.prototype.propertyIsEnumerable;
  var __defNormalProp$6 = (obj, key, value) => key in obj ? __defProp$6(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __spreadValues$6 = (a, b) => {
    for (var prop in b || (b = {}))
      if (__hasOwnProp$7.call(b, prop))
        __defNormalProp$6(a, prop, b[prop]);
    if (__getOwnPropSymbols$7)
      for (var prop of __getOwnPropSymbols$7(b)) {
        if (__propIsEnum$7.call(b, prop))
          __defNormalProp$6(a, prop, b[prop]);
      }
    return a;
  };
  var __spreadProps$5 = (a, b) => __defProps$5(a, __getOwnPropDescs$5(b));
  var __objRest$4 = (source, exclude) => {
    var target = {};
    for (var prop in source)
      if (__hasOwnProp$7.call(source, prop) && exclude.indexOf(prop) < 0)
        target[prop] = source[prop];
    if (source != null && __getOwnPropSymbols$7)
      for (var prop of __getOwnPropSymbols$7(source)) {
        if (exclude.indexOf(prop) < 0 && __propIsEnum$7.call(source, prop))
          target[prop] = source[prop];
      }
    return target;
  };
  var __async$e = (__this, __arguments, generator) => {
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
  function get({ pageName, apiObject, dispatch }) {
    return function sendRetrieveDocument() {
      return __async$e(this, null, function* () {
        let res;
        const _a = cloneDeep_1(apiObject || {}), { api, dataKey, dataIn, dataOut, subtype } = _a, options = __objRest$4(_a, ["api", "dataKey", "dataIn", "dataOut", "subtype"]);
        let requestOptions = __spreadValues$6({}, options);
        let maxcount = options == null ? void 0 : options.maxcount;
        let type = options == null ? void 0 : options.type;
        let sCondition = options == null ? void 0 : options.sCondition;
        let nonce;
        let idList = [];
        let objtype;
        if (dataIn) {
          const currentVal = yield dispatch({
            type: dispatchActionType.GET_DATA,
            payload: { pageName, dataKey: dataIn ? dataIn : dataKey }
          });
          const _b = yield dispatch({
            type: dispatchActionType.POPULATE_OBJECT,
            payload: { object: currentVal, pageName, copy: true }
          }), { deat, id, ids, _nonce, ObjType, key } = _b, populatedCurrentVal = __objRest$4(_b, ["deat", "id", "ids", "_nonce", "ObjType", "key"]);
          if (ObjType && ObjType === 3 && key) {
            let res2 = [];
            const searchResponse = yield dispatch({
              type: dispatchActionType.SEARCH_CACHE,
              payload: { key, sCondition: populatedCurrentVal == null ? void 0 : populatedCurrentVal.sCondition }
            });
            if (searchResponse.length) {
              const decryptedDocs = searchResponse.map((doc) => __async$e(this, null, function* () {
                if (doc) {
                  const decryptedDoc = yield documentToNote({ document: doc });
                  return decryptedDoc;
                }
                return;
              }));
              yield Promise.all(decryptedDocs).then((decryptedDataResults) => {
                res2 = decryptedDataResults;
              }).catch((error) => {
                console.log(error);
              });
            }
            yield dispatch({
              type: dispatchActionType.UPDATE_DATA,
              payload: {
                pageName,
                dataKey: dataOut ? dataOut : dataKey,
                data: { doc: res2, searchResult: true }
              }
            });
            return;
          }
          objtype = ObjType;
          idList = getIdList(ids || id);
          nonce = _nonce;
          if (!isPopulated(id)) {
            const err = new UnableToLocateValue(`Missing reference ${id} at page ${pageName}`);
            return console.error(err);
          }
          requestOptions = populatedCurrentVal;
          maxcount = populatedCurrentVal == null ? void 0 : populatedCurrentVal.maxcount;
          type = populatedCurrentVal == null ? void 0 : populatedCurrentVal.type;
          sCondition = populatedCurrentVal == null ? void 0 : populatedCurrentVal.sCondition;
        } else {
          const _c = yield dispatch({
            type: dispatchActionType.POPULATE_OBJECT,
            payload: { object: requestOptions, pageName }
          }), { deat, _nonce, id, ids } = _c, populatedCurrentVal = __objRest$4(_c, ["deat", "_nonce", "id", "ids"]);
          idList = getIdList(ids || id);
          nonce = _nonce;
          requestOptions = populatedCurrentVal;
        }
        if (maxcount) {
          requestOptions.maxcount = parseInt(maxcount);
        }
        if (type) {
          requestOptions.type = parseInt(type);
        }
        if (sCondition) {
          requestOptions.scondition = sCondition;
        }
        if (objtype) {
          requestOptions.ObjType = objtype;
        }
        const { pass: shouldPass, cacheIndex } = yield dispatch({
          type: dispatchActionType.SET_API_BUFFER,
          payload: {
            apiObject: {
              idList,
              options: requestOptions,
              nonce
            }
          }
        });
        try {
          if (store.env === "test") {
            console.log("%cGet Document Request", "background: purple; color: white; display: block;", { idList, options: requestOptions });
          }
          if (!shouldPass) {
            res = yield dispatch({
              type: dispatchActionType.GET_CACHE,
              payload: { cacheIndex }
            });
            if (store.env === "test") {
              console.log(`%cUsing Cached Data for`, "background:#7268A6; color: white; display: block;", apiObject);
            }
          } else {
            let rawResponse;
            yield store.level2SDK.documentServices.retrieveDocument({
              idList,
              options: requestOptions
            }).then((res2) => __async$e(this, null, function* () {
              var _a2, _b2;
              rawResponse = res2.data;
              const documents = u__namespace.reduce(u__namespace.array((_a2 = res2 == null ? void 0 : res2.data) == null ? void 0 : _a2.document), (acc, obj) => !u__namespace.isNil(obj) ? acc.concat(obj) : acc, []);
              return Promise.allSettled((_b2 = documents.map) == null ? void 0 : _b2.call(documents, (document) => __async$e(this, null, function* () {
                var _a3;
                yield dispatch({
                  type: dispatchActionType.INSERT_TO_OBJECT_TABLE,
                  payload: { doc: document }
                });
                if ((_a3 = document == null ? void 0 : document.deat) == null ? void 0 : _a3.url) {
                  return document;
                } else {
                  let note;
                  try {
                    note = yield documentToNote({ document });
                  } catch (error) {
                    const err = error instanceof Error ? error : new Error(String(error));
                    console.error(err, { note, error: err, document });
                  }
                  return note;
                }
              })));
            })).then((res2) => {
              rawResponse.doc = res2.reduce((acc, result) => {
                const { status, value: doc } = result;
                return status === "fulfilled" && !u__namespace.isNil(doc) ? acc.concat(doc) : acc;
              }, []);
              delete rawResponse.document;
            }).catch((error) => {
              console.error(error instanceof Error ? error : new Error(String(error)));
            });
            yield dispatch({
              type: dispatchActionType.SET_CACHE,
              payload: { data: rawResponse, cacheIndex }
            });
            res = rawResponse;
          }
        } catch (error) {
          throw error;
        }
        if (res) {
          if (store.env === "test") {
            console.log("%cGet Document Response", "background: purple; color: white; display: block;", res);
          }
          if (res.jwt) {
            yield dispatch({
              type: dispatchActionType.UPDATE_DATA,
              payload: {
                dataKey: "Global.currentUser.JWT",
                data: res.jwt
              }
            });
          }
          yield dispatch({
            type: dispatchActionType.UPDATE_DATA,
            payload: {
              pageName,
              dataKey: dataOut ? dataOut : dataKey,
              data: res
            }
          });
          yield dispatch({
            type: dispatchActionType.INSERT_TO_INDEX_TABLE,
            payload: { doc: res }
          });
        }
        return res;
      });
    };
  }
  function create({ pageName, apiObject, dispatch }) {
    return function sendCreateDocument() {
      return __async$e(this, null, function* () {
        const { dataKey, dataIn, dataOut } = cloneDeep_1(apiObject || {});
        const currentVal = yield dispatch({
          type: dispatchActionType.GET_DATA,
          payload: {
            dataKey: dataIn ? dataIn : dataKey,
            pageName
          }
        });
        const _a = yield dispatch({
          type: dispatchActionType.POPULATE_OBJECT,
          payload: { object: currentVal, pageName }
        }), { deat, id, _nonce } = _a, populatedCurrentVal = __objRest$4(_a, ["deat", "id", "_nonce"]);
        if (!isPopulated(id)) {
          throw new UnableToLocateValue(`Missing reference ${id} at page ${pageName}`);
        }
        if (populatedCurrentVal.type == "2000" && typeof populatedCurrentVal.name.nonce === "function") {
          populatedCurrentVal.name = __spreadProps$5(__spreadValues$6({}, populatedCurrentVal.name), {
            nonce: populatedCurrentVal.name.nonce()
          });
        }
        let res;
        if (id) {
          try {
            const _b = populatedCurrentVal, {
              eid,
              name,
              subtype: dTypeProps
            } = _b, restOfDocOptions = __objRest$4(_b, [
              "eid",
              "name",
              "subtype"
            ]);
            if (store.env === "test") {
              console.log("%cUpdate Document Request", "background: purple; color: white; display: block;", id, {
                edge_id: eid,
                content: name == null ? void 0 : name.data,
                mediaType: name == null ? void 0 : name.type,
                title: name == null ? void 0 : name.title,
                targetRoomName: name == null ? void 0 : name.targetRoomName,
                tags: name == null ? void 0 : name.tags,
                user: name == null ? void 0 : name.user,
                sesk: name == null ? void 0 : name.sesk,
                aesk: name == null ? void 0 : name.aesk,
                tage: restOfDocOptions == null ? void 0 : restOfDocOptions.tage,
                type: restOfDocOptions == null ? void 0 : restOfDocOptions.type,
                fid: restOfDocOptions == null ? void 0 : restOfDocOptions.fid,
                reid: restOfDocOptions == null ? void 0 : restOfDocOptions.reid,
                jwt: restOfDocOptions == null ? void 0 : restOfDocOptions.jwt,
                dTypeProps
              });
            }
            const response = yield Document.update(id, {
              edge_id: eid,
              content: name == null ? void 0 : name.data,
              mediaType: name == null ? void 0 : name.type,
              title: name == null ? void 0 : name.title,
              targetRoomName: name == null ? void 0 : name.targetRoomName,
              tags: name == null ? void 0 : name.tags,
              user: name == null ? void 0 : name.user,
              sesk: name == null ? void 0 : name.sesk,
              sfname: name == null ? void 0 : name.sfname,
              aesk: name == null ? void 0 : name.aesk,
              tage: restOfDocOptions == null ? void 0 : restOfDocOptions.tage,
              type: restOfDocOptions == null ? void 0 : restOfDocOptions.type,
              fid: restOfDocOptions == null ? void 0 : restOfDocOptions.fid,
              reid: restOfDocOptions == null ? void 0 : restOfDocOptions.reid,
              jwt: restOfDocOptions == null ? void 0 : restOfDocOptions.jwt,
              dTypeProps
            });
            res = response;
            if (store.env === "test") {
              console.log("%cUpdate Document Response", "background: purple; color: white; display: block;", res);
            }
          } catch (error) {
            throw error;
          }
        } else {
          try {
            const _c = populatedCurrentVal, {
              subtype: dTypeProps,
              eid,
              name
            } = _c, restOfDocOptions = __objRest$4(_c, [
              "subtype",
              "eid",
              "name"
            ]);
            if (store.env === "test") {
              console.log("%cCreate Document Request", "background: purple; color: white; display: block;", {
                edge_id: eid,
                content: name == null ? void 0 : name.data,
                targetRoomName: name == null ? void 0 : name.targetRoomName,
                paymentNonce: name == null ? void 0 : name.nonce,
                mediaType: name == null ? void 0 : name.type,
                title: name == null ? void 0 : name.title,
                user: name == null ? void 0 : name.user,
                sesk: name == null ? void 0 : name.sesk,
                aesk: name == null ? void 0 : name.aesk,
                tage: restOfDocOptions == null ? void 0 : restOfDocOptions.tage,
                type: restOfDocOptions == null ? void 0 : restOfDocOptions.type,
                fid: restOfDocOptions == null ? void 0 : restOfDocOptions.fid,
                reid: restOfDocOptions == null ? void 0 : restOfDocOptions.reid,
                jwt: restOfDocOptions == null ? void 0 : restOfDocOptions.jwt,
                dTypeProps
              });
            }
            const response = yield Document.create({
              edge_id: eid,
              content: name == null ? void 0 : name.data,
              targetRoomName: name == null ? void 0 : name.targetRoomName,
              paymentNonce: name == null ? void 0 : name.nonce,
              mediaType: name == null ? void 0 : name.type,
              title: name == null ? void 0 : name.title,
              user: name == null ? void 0 : name.user,
              sesk: name == null ? void 0 : name.sesk,
              sfname: name == null ? void 0 : name.sfname,
              aesk: name == null ? void 0 : name.aesk,
              tage: restOfDocOptions == null ? void 0 : restOfDocOptions.tage,
              type: restOfDocOptions == null ? void 0 : restOfDocOptions.type,
              fid: restOfDocOptions == null ? void 0 : restOfDocOptions.fid,
              reid: restOfDocOptions == null ? void 0 : restOfDocOptions.reid,
              jwt: restOfDocOptions == null ? void 0 : restOfDocOptions.jwt,
              dTypeProps,
              dispatch
            });
            res = response;
            if (store.env === "test") {
              console.log("%cCreate Document Response", "background: purple; color: white; display: block;", res);
            }
          } catch (error) {
            throw error;
          }
        }
        if (res) {
          if (res.jwt) {
            yield dispatch({
              type: dispatchActionType.UPDATE_DATA,
              payload: {
                dataKey: "Global.currentUser.JWT",
                data: res.jwt
              }
            });
          }
          yield dispatch({
            type: dispatchActionType.UPDATE_DATA,
            payload: {
              pageName,
              dataKey: dataOut ? dataOut : dataKey,
              data: res
            }
          });
          yield dispatch({
            type: dispatchActionType.INSERT_TO_INDEX_TABLE,
            payload: { doc: [res.doc] }
          });
        }
        return res;
      });
    };
  }

  function Rad(d) {
    return d * Math.PI / 180;
  }
  function calculateDistanceByPosition(point1, point2 = [39.2946, -76.6252]) {
    if (point2 && point1) {
      let radLat1 = Rad(point1[0]);
      let radLat2 = Rad(point2[0]);
      let a = radLat1 - radLat2;
      let b = Rad(point1[1]) - Rad(point2[1]);
      let s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) + Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)));
      s = s * 6378.137;
      s = Math.round(s * 1e4) / 1e4;
      return s.toFixed(2) + " km";
    }
    return "0km";
  }
  var stringServices = {
    formatTimer(time) {
      return moment__default["default"](time).format("HH:mm:ss");
    },
    formatUnixtimeSecond(unixTime) {
      return moment__default["default"](unixTime * 1e3).format("L hh:mm:ss");
    },
    formatNowTime() {
      return moment__default["default"]().format("lll");
    },
    formatUnixtime_en(unixTime) {
      return Number.isFinite(unixTime) ? moment__default["default"](unixTime * 1e3).format("lll") : "--";
    },
    formatUnixtimeL_en(unixTime) {
      return moment__default["default"](unixTime * 1e3).format("l");
    },
    formatUnixtimeLT_en(unixTime) {
      return moment__default["default"](unixTime * 1e3).format("LT");
    },
    formatDurationInSecond(unixTime) {
      return humanizeDuration__default["default"](unixTime * 1e3);
    },
    formatDurationInMicroSecond(unixTime) {
      return moment__default["default"](unixTime).format("lll");
    },
    concat(stringArr) {
      if (Array.isArray(stringArr)) {
        return stringArr.join("");
      }
      return "";
    },
    split16DkeytoArray(key) {
      if (key.length !== 16)
        return [];
      let keyArray = [];
      return keyArray.concat(key.substring(0, 4), key.substring(4, 8), key.substring(8, 12), key.substring(12));
    },
    split16Dkey(Dkey) {
      if (Dkey.length !== 16)
        return Dkey + " length:" + Dkey.length;
      return "Please let your friend enter this code on their side: " + Dkey.substring(0, 4) + "-" + Dkey.substring(4, 8) + "-" + Dkey.substring(8, 12) + "-" + Dkey.substring(12);
    },
    equal({ string1, string2 }) {
      return string1 == string2;
    },
    getFirstChar({ value }) {
      if (value) {
        return value.charAt(0).toUpperCase();
      }
      return;
    },
    getLength(str) {
      return str.toString().length;
    },
    retainNumber({ value }) {
      return parseInt(value);
    },
    phoneVerification({ countryCode, phoneNumber }) {
      console.log("test phoneVerificatio", {
        countryCode,
        phoneNumber
      });
      const phonesRegex = {
        "zh-CN": /^(\+?0?86\-?)?1[345789]\d{9}$/,
        "zh-TW": /^(\+?886\-?|0)?9\d{8}$/,
        "ar-KW": /^(\+?965)[569]\d{7}$/,
        "en-US": /^(\+?1)?[2-9]\d{2}[2-9](?!11)\d{6}$/,
        "es-MX": /^(\+?52)?\d{6,12}$/
      };
      if (countryCode && phoneNumber) {
        phoneNumber = phoneNumber.toString(10);
        countryCode = countryCode.trim();
        phoneNumber = phoneNumber.trim();
        let re;
        if (countryCode == "+86") {
          phoneNumber = countryCode + "" + phoneNumber;
          re = phoneNumber.match(phonesRegex["zh-CN"]);
        } else if (countryCode == "+1") {
          phoneNumber = countryCode + "" + phoneNumber;
          re = phoneNumber.match(phonesRegex["en-US"]);
        } else if (countryCode == "+965") {
          phoneNumber = countryCode + "" + phoneNumber;
          re = phoneNumber.match(phonesRegex["ar-KW"]);
        } else if (countryCode == "+52") {
          phoneNumber = countryCode + "" + phoneNumber;
          re = phoneNumber.match(phonesRegex["es-MX"]);
        }
        if (re != null) {
          return true;
        }
      }
      return false;
    },
    phoneNumberSplit({ phoneNumber, sign }) {
      if (phoneNumber == null)
        return [];
      return String(phoneNumber).toString().split(sign);
    },
    judgeMultipleEqual(stringArr) {
      for (let i = 1; i < stringArr.length; i++)
        if (stringArr[i - 1] !== stringArr[i])
          return false;
      return true;
    },
    judgeSelectTime(stringArr) {
      for (let i = 0; i < stringArr.length; i++) {
        if (stringArr[i].startsWith("$")) {
          return false;
        }
      }
      return true;
    },
    judgeFillinAll(stringArr) {
      console.log(stringArr);
      for (let i = 0; i < stringArr.length; i++)
        if (stringArr[i] == "" || stringArr[i] == "-- --" || stringArr[i] == "Select")
          return true;
      return false;
    },
    judgeIsAllEmpty(stringArr) {
      console.log(stringArr);
      for (let i = 0; i < stringArr.length; i++)
        if (stringArr[i] != "")
          return false;
      return true;
    },
    judgeAllTrue({ str1, str2, str3 }) {
      return str1 && str2 && str3;
    },
    judgesFillinAll(object) {
      let isEmpty = false;
      Object.keys(object).forEach((x) => {
        if (object[x] !== null && object[x] !== "") {
          Object.keys(object[x]).forEach((y) => {
            if (object[x][y] == null || object[x][y] == "") {
              console.log(object[x][y]);
              isEmpty = true;
            }
          });
        }
      });
      if (isEmpty) {
        return false;
      }
      return true;
    },
    strLenx({ obj }) {
      let newStr = "";
      let len = 0;
      for (let val of Object.values(obj)) {
        if (val !== "") {
          len++;
          if (len === 2 || len === 4) {
            newStr += val + " ";
            continue;
          }
          newStr += val + ",";
        }
      }
      if (newStr === "") {
        return "";
      }
      return newStr.substr(0, newStr.length - 1);
    },
    distanceByPosition(point) {
      if (point != null || typeof point != "undefined") {
        let currentLatitude = store.currentLatitude;
        let currentLongitude = store.currentLongitude;
        if (currentLatitude == null || currentLongitude == null || typeof currentLongitude == "undefined" || typeof currentLatitude == "undefined") {
          return;
        }
        let radLat1 = Rad(currentLatitude);
        let radLat2 = Rad(point[0]);
        let a = radLat1 - radLat2;
        let b = Rad(currentLongitude) - Rad(point[1]);
        let s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) + Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)));
        s = s * 6378.137;
        s = Math.round(s * 1e4) / 1e4;
        return s.toFixed(2) + " km";
      }
      return;
    },
    getAddress({ object }) {
      var _a;
      let res = {
        address: "",
        city: "",
        state: "",
        zipCode: "",
        location: "",
        geoCode: [],
        country: "",
        county: "",
        firsLine: "",
        SecondLine: "",
        distance: ""
      };
      if (object) {
        let context = object["context"];
        context.forEach((element) => {
          let prefix = element.id.split(".")[0];
          console.log(prefix);
          switch (prefix) {
            case "postcode":
              res.zipCode = element.text;
              break;
            case "place":
              res.city = element.text;
              break;
            case "region":
              res.state = element.short_code.split("-")[1];
              break;
            case "country":
              res.country = element.text;
              break;
            case "district":
              res.county = element.text;
              break;
          }
        });
        res.distance = calculateDistanceByPosition(object == null ? void 0 : object.center);
        res.geoCode = object.center;
        res.location = object.place_name;
        if ((_a = object == null ? void 0 : object.properties) == null ? void 0 : _a.address) {
          res.address = object.text + ", " + object.properties.address;
        } else {
          res.address = object.text;
        }
        res.address = object.address ? object.address + " " + res.address : res.address;
        if (object.place_type[0] == "poi" || object.place_type[0] == "address") {
          res.firsLine = object.text;
          if (object.properties.address) {
            res.SecondLine = object.properties.address;
          } else {
            res.SecondLine = "";
          }
        } else {
          res.firsLine = "";
          res.SecondLine = "";
        }
        if (object.place_type[0] == "place") {
          res.city = object.text;
          res.address = "";
        }
        if (object.place_type[0] == "region") {
          res.state = object.text;
          res.address = "";
        }
        if (object.place_type[0] == "postcode") {
          res.zipCode = object.text;
          res.address = "";
        }
        if (object.place_type[0] == "district") {
          res.county = object.text;
          res.address = "";
        }
        return res;
      }
      return res;
    },
    generateID({ facilityID, locationID, roomID }) {
      if (roomID != "") {
        let rid = roomID.toString().toLowerCase().replace(/\s*/g, "").substring(0, 6);
        return locationID.substring(0, 25).concat("_").concat(rid);
      } else if (locationID != "") {
        let lid = locationID.toString().toLowerCase().replace(/\s*/g, "").substring(0, 8);
        return facilityID.substring(0, 16).concat("_").concat(lid);
      } else {
        let fid = facilityID.toString().toLocaleLowerCase().replace(/\s*/g, "").substring(0, 16);
        return fid;
      }
    },
    bitFormatting(bitNum) {
      if (bitNum === 0)
        return "0\xA0B";
      let k = 1024, sizes = ["B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"], i = Math.floor(Math.log(bitNum) / Math.log(k));
      let num = bitNum / Math.pow(k, i);
      return num.toFixed(2) + "\xA0" + sizes[i];
    },
    equalsLenString({ stringOne, stringTwo, len }) {
      for (let i = 0; i < len; i++) {
        if (stringOne[i] !== stringTwo[i]) {
          return false;
        }
      }
      return true;
    },
    dollarFormat(fund) {
      fund = String(fund);
      if (/^(\-?)\d+(\.\d+)?$/.test(fund)) {
        if (/[\.]/.test(fund)) {
          return fund.startsWith("-") ? "-$" + fund.substring(1) : "$" + fund;
        } else {
          return fund.startsWith("-") ? "-$" + fund.substring(1) / 100 : "$" + fund / 100;
        }
      } else
        return fund;
    }
  };

  /**
   * Gets the last element of `array`.
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @category Array
   * @param {Array} array The array to query.
   * @returns {*} Returns the last element of `array`.
   * @example
   *
   * _.last([1, 2, 3]);
   * // => 3
   */
  function last(array) {
    var length = array == null ? 0 : array.length;
    return length ? array[length - 1] : undefined;
  }

  var last_1 = last;

  /**
   * The base implementation of `_.slice` without an iteratee call guard.
   *
   * @private
   * @param {Array} array The array to slice.
   * @param {number} [start=0] The start position.
   * @param {number} [end=array.length] The end position.
   * @returns {Array} Returns the slice of `array`.
   */
  function baseSlice(array, start, end) {
    var index = -1,
        length = array.length;

    if (start < 0) {
      start = -start > length ? 0 : (length + start);
    }
    end = end > length ? length : end;
    if (end < 0) {
      end += length;
    }
    length = start > end ? 0 : ((end - start) >>> 0);
    start >>>= 0;

    var result = Array(length);
    while (++index < length) {
      result[index] = array[index + start];
    }
    return result;
  }

  var _baseSlice = baseSlice;

  /**
   * Gets the parent value at `path` of `object`.
   *
   * @private
   * @param {Object} object The object to query.
   * @param {Array} path The path to get the parent value of.
   * @returns {*} Returns the parent value.
   */
  function parent(object, path) {
    return path.length < 2 ? object : _baseGet(object, _baseSlice(path, 0, -1));
  }

  var _parent = parent;

  /**
   * The base implementation of `_.unset`.
   *
   * @private
   * @param {Object} object The object to modify.
   * @param {Array|string} path The property path to unset.
   * @returns {boolean} Returns `true` if the property is deleted, else `false`.
   */
  function baseUnset(object, path) {
    path = _castPath(path, object);
    object = _parent(object, path);
    return object == null || delete object[_toKey(last_1(path))];
  }

  var _baseUnset = baseUnset;

  /**
   * Removes the property at `path` of `object`.
   *
   * **Note:** This method mutates `object`.
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Object
   * @param {Object} object The object to modify.
   * @param {Array|string} path The path of the property to unset.
   * @returns {boolean} Returns `true` if the property is deleted, else `false`.
   * @example
   *
   * var object = { 'a': [{ 'b': { 'c': 7 } }] };
   * _.unset(object, 'a[0].b.c');
   * // => true
   *
   * console.log(object);
   * // => { 'a': [{ 'b': {} }] };
   *
   * _.unset(object, ['a', '0', 'b', 'c']);
   * // => true
   *
   * console.log(object);
   * // => { 'a': [{ 'b': {} }] };
   */
  function unset(object, path) {
    return object == null ? true : _baseUnset(object, path);
  }

  var unset_1 = unset;

  /**
   * This base implementation of `_.zipObject` which assigns values using `assignFunc`.
   *
   * @private
   * @param {Array} props The property identifiers.
   * @param {Array} values The property values.
   * @param {Function} assignFunc The function to assign values.
   * @returns {Object} Returns the new object.
   */
  function baseZipObject(props, values, assignFunc) {
    var index = -1,
        length = props.length,
        valsLength = values.length,
        result = {};

    while (++index < length) {
      var value = index < valsLength ? values[index] : undefined;
      assignFunc(result, props[index], value);
    }
    return result;
  }

  var _baseZipObject = baseZipObject;

  /**
   * This method is like `_.fromPairs` except that it accepts two arrays,
   * one of property identifiers and one of corresponding values.
   *
   * @static
   * @memberOf _
   * @since 0.4.0
   * @category Array
   * @param {Array} [props=[]] The property identifiers.
   * @param {Array} [values=[]] The property values.
   * @returns {Object} Returns the new object.
   * @example
   *
   * _.zipObject(['a', 'b'], [1, 2]);
   * // => { 'a': 1, 'b': 2 }
   */
  function zipObject(props, values) {
    return _baseZipObject(props || [], values || [], _assignValue);
  }

  var zipObject_1 = zipObject;

  var objectServices = {
    remove({ object, key }) {
      if (u__namespace.isObj(object)) {
        unset_1(object, key);
      }
      return;
    },
    clear({ object, key }) {
      if (u__namespace.isObj(object)) {
        object[key] = "";
      }
      return;
    },
    set({ object, key, value }) {
      if (u__namespace.isObj(object)) {
        set_1(object, key, value);
      }
      return;
    },
    setObjectKey({
      objectArr,
      key,
      value
    }) {
      Array.from(objectArr).forEach((object) => {
        if (u__namespace.isObj(object)) {
          set_1(object, key, value);
        }
      });
      return objectArr;
    },
    get({ object, key }) {
      if (u__namespace.isObj(object)) {
        if (object[key] == "")
          object[key] = " ";
        return object[key];
      }
      return;
    },
    has({ object, key }) {
      if (u__namespace.isObj(object)) {
        if (key in object && !!object[key]) {
          return true;
        }
        return false;
      }
      return;
    },
    objectHasValue({
      objArr,
      valPath
    }) {
      let objBool = false;
      Array.from(objArr).forEach((obj) => {
        if (obj[valPath] !== false) {
          objBool = true;
          return objBool;
        }
        return objBool;
      });
      return objBool;
    },
    clearAndSetKey({
      object,
      item,
      key,
      value
    }) {
      if (u__namespace.isArr(object)) {
        for (let i = 0; i < object.length; i++) {
          object[i][key] = "";
        }
        item[key] = value;
      }
      return;
    },
    extract({ array, field }) {
      let match = field.split(".");
      let result = [];
      if (u__namespace.isArr(array)) {
        if (match.length === 1) {
          array.forEach((array2) => {
            result.push(array2[match[0]]);
          });
        } else if (match.length === 2) {
          array.forEach((arr) => {
            result.push(arr[match[0]][match[1]]);
          });
        } else if (match.length === 3) {
          array.forEach((arr) => {
            result.push(arr[match[0]][match[1]][match[2]]);
          });
        }
        return result;
      }
      return;
    },
    extractArray({ obj, arr }) {
      if (u__namespace.isArr(obj)) {
        let res = new Array();
        obj.forEach((objItem) => {
          let resArray = {};
          arr.forEach((element) => {
            let _data = objItem;
            if (element.indexOf(".") === -1) {
              resArray[element] = _data.hasOwnProperty(element) ? _data[element] : "";
            } else {
              let subtitle = element.split(".");
              subtitle.forEach((item) => {
                _data = _data.hasOwnProperty(item) ? _data[item] : "";
              });
              if (_data) {
                resArray[subtitle[subtitle.length - 1]] = _data.toString();
              }
            }
          });
          res.push(resArray);
        });
        return res;
      }
      return "";
    },
    authToSubType({
      auth,
      authList
    }) {
      let result = [];
      Object.keys(auth).forEach((key) => {
        let authType = 0;
        Object.keys(authList).forEach((arr) => {
          if (key === arr) {
            authType = authList[arr] * 1e4;
          }
        });
        if (auth[key]["create"] === true)
          authType += 4;
        if (auth[key]["edit"] === true)
          authType += 2;
        if (auth[key]["review"] === true)
          authType += 1;
        result.push(parseInt(authType.toString(), 16));
      });
      return result;
    },
    findTrue({ object }) {
      let auth = {
        Settings: false,
        UserManagement: false,
        Schedule: false
      };
      Object.keys(object).forEach((key) => {
        Object.keys(object[key]).forEach((key1) => {
          if ((key === "MFI" || key === "TDT") && object[key][key1] === true) {
            auth.Settings = true;
            return;
          }
          if ((key === "staff" || key === "patient" || key === "provider") && object[key][key1] === true) {
            auth.UserManagement = true;
            return;
          }
          if ((key === "scheduleInfo" || key === "PAT") && object[key][key1] === true) {
            auth.Schedule = true;
            return;
          }
        });
      });
      return auth;
    },
    setAuthAllTrue({ object }) {
      Object.keys(object).forEach((key) => {
        Object.keys(object[key]).forEach((key1) => {
          object[key][key1] = true;
        });
      });
      return object;
    },
    isEmpty({ object }) {
      if (object === "")
        return true;
      return false;
    },
    setByKey({
      object,
      key,
      value
    }) {
      Object.keys(object).forEach((item) => {
        if (key === item)
          object[item] = value;
      });
      return;
    },
    getObjValueAndKey({
      objects,
      objStr
    }) {
      let arr = Object.keys(objects);
      let objNew = {};
      for (let index = 0; index < arr.length; index++) {
        if (objStr[index] in objects) {
          objNew[objStr[index]] = objects[objStr[index]];
        }
      }
      return objNew;
    },
    getObjKey({
      objects
    }) {
      if (objects) {
        return Object.keys(objects);
      }
      return [];
    },
    getObjWithKV({ object }) {
      var arr = [];
      let o;
      for (let i in object) {
        o = {
          key: i,
          value: object[i]
        };
        arr.push(o);
      }
      return arr;
    },
    setProperty({
      obj,
      label,
      text,
      arr,
      valueArr,
      errorArr
    }) {
      for (let index = 0; index < obj.length; index++) {
        for (let i in arr) {
          if (obj[index][label] === text) {
            obj[index][arr[i]] = valueArr[i];
          } else {
            obj[index][arr[i]] = errorArr[i];
          }
        }
      }
      return obj;
    },
    setTimeProperty({ obj }) {
      let objClone = JSON.parse(JSON.stringify(obj));
      objClone.forEach((item) => {
        let temp = item["subtype"];
        let checkTemp = ((temp & 983040) >> 16) % 2;
        if (checkTemp === 0 && item["name"].hasOwnProperty("visitReason")) {
          item["name"]["backgroundColor"] = "0xfff7e3";
          item["name"]["borderColor"] = "0xfff7e3";
          item["name"]["fontColor"] = "0xf8ae29";
        } else if (checkTemp === 1 && item["name"].hasOwnProperty("visitReason")) {
          item["name"]["backgroundColor"] = "0xe4f5e9";
          item["name"]["borderColor"] = "0xe4f5e9";
          item["name"]["fontColor"] = "0x17a05d";
        } else {
          item["name"]["visitReason"] = "Avaliable";
          item["name"]["visitType"] = "";
          item["name"]["backgroundColor"] = "0xffffff";
          item["name"]["borderColor"] = "0xeeeeee";
        }
      });
      return objClone;
    },
    clearAll({ object }) {
      Object.keys(object).forEach((item) => {
        if (u__namespace.isArr(object[item]))
          object[item] = [];
        else
          object[item] = " ";
      });
    },
    extractingFeatureStrings({
      objArrs,
      pathObj,
      bool
    }) {
      let objArr = [], objArrData = [], itemName = [], objNameArr = [], hj = {}, newArr = [];
      if (objArrs.length === 0) {
        return [];
      }
      objArrs.forEach((o) => {
        pathObj.forEach((item) => {
          itemName.push(item.split(".")[item.split(".").length - 1]);
          objArrData.push(get_1(o, item, "default"));
        });
        objArr.push(get_1(o, pathObj[0], "default"));
        objNameArr.push(zipObject_1(itemName, objArrData));
      });
      if (objArr.length === 0) {
        return "The array is empty";
      }
      if (bool) {
        objArr.map((value, index, arr) => {
          arr[index] = value[0].toLocaleUpperCase() + value.slice(1);
          objArr = arr;
        });
      }
      objArr.sort();
      for (let arr of objArr) {
        if (!(arr in newArr) && /[a-zA-Z]+/.test(arr.charAt(0))) {
          newArr.push(arr.charAt(0));
        }
      }
      let newArrLen = newArr.length;
      let objValues = [];
      for (let newArrIn = 0; newArrIn < newArrLen; newArrIn++) {
        hj[newArr[newArrIn]] = new Array();
        objNameArr.forEach((item) => {
          if (item[itemName[0]].charAt(0).toLocaleUpperCase() === newArr[newArrIn] && /[a-zA-Z]+/.test(item[itemName[0]].charAt(0))) {
            hj[newArr[newArrIn]].push(item);
          }
        });
      }
      objNameArr.forEach((item) => {
        if (!/[a-zA-Z]+/.test(item[itemName[0]].charAt(0))) {
          objValues.push(item);
        }
      });
      objArr = [];
      for (let [key, value] of Object.entries(hj)) {
        objArr.push(zipObject_1(["index", "data"], [key, value]));
      }
      if (objValues.length !== 0) {
        objArr.unshift(zipObject_1(["index", "data"], ["#", objValues]));
      }
      return objArr;
    },
    addKey({ object, key, value }) {
      object.forEach((index) => {
        index[key] = value;
      });
      return object;
    },
    deleteKey({ object, path }) {
      path.forEach((element) => {
        unset_1(object, element);
      });
      return object;
    },
    hasMultipleKeys({ object, keyArr }) {
      if (u__namespace.isObj(object)) {
        for (let i = 0; i < keyArr.length; i++) {
          if (object.hasOwnProperty(keyArr[i]) === false) {
            return false;
          }
        }
      }
      return true;
    },
    transformStatus(object, type = "type", state = "deat.state") {
      if (object) {
        if (get_1(object, type) === 2002) {
          if (get_1(object, state) === "COMPLETED") {
            return "Refunded";
          } else {
            return "Refunded fail";
          }
        } else if (get_1(object, type) === 2001) {
          if (get_1(object, state) === "COMPLETED") {
            return "Paid";
          } else {
            return "Unpaid";
          }
        } else if (get_1(object, type) === 2003) {
          return "Cash Out";
        }
      }
      return "Canceled";
    },
    judgeAllTrue({ object }) {
      let isAllTrue = true;
      Object.keys(object).forEach((key) => {
        Object.keys(object[key]).forEach((key1) => {
          if (object[key][key1] === false) {
            isAllTrue = false;
          }
        });
      });
      return isAllTrue;
    },
    setMultipleProperty({
      obj,
      label,
      checkValue,
      arr,
      valueArr,
      errorArr
    }) {
      let cloneObj = JSON.parse(JSON.stringify(obj));
      if (checkValue.hasOwnProperty(label)) {
        for (let index = 0; index < cloneObj.length; index++) {
          for (let key in arr) {
            if (cloneObj[index][label] === checkValue[label]) {
              if (cloneObj[index].hasOwnProperty(arr[key])) {
                if (cloneObj[index][arr[key]] === valueArr[key]) {
                  cloneObj[index][arr[key]] = errorArr[key];
                } else {
                  cloneObj[index][arr[key]] = valueArr[key];
                }
              } else {
                cloneObj[index][arr[key]] = valueArr[key];
              }
            }
          }
        }
      } else {
        for (let i = 0; i < cloneObj.length; i++) {
          for (let j in arr) {
            cloneObj[i][arr[j]] = errorArr[j];
          }
        }
      }
      return cloneObj;
    },
    eEncapsulatedObj({ originalObjArr, pathArr }) {
      let arrValuesObj = [];
      let arrValues = [];
      let pickArr = pathArr.map((item) => {
        if (item.includes(".")) {
          return item.split(".").at(-1);
        }
        return item;
      });
      originalObjArr.forEach((element) => {
        pathArr.forEach((item) => {
          arrValues.push(get_1(element, item));
          console.log(arrValues);
        });
        arrValuesObj.push(zipObject_1(pickArr, arrValues));
        arrValues = [];
      });
      return arrValuesObj;
    },
    toCsvFormat({ arrObj }) {
      if (u__namespace.isArr(arrObj)) {
        let strCvg = "";
        arrObj.forEach((element) => {
          let csvRow = Object.values(element).toString();
          strCvg = `${csvRow}\r
` + strCvg;
        });
        return strCvg;
      }
      return arrObj;
    }
  };

  /**
   * Checks if the given arguments are from an iteratee call.
   *
   * @private
   * @param {*} value The potential iteratee value argument.
   * @param {*} index The potential iteratee index or key argument.
   * @param {*} object The potential iteratee object argument.
   * @returns {boolean} Returns `true` if the arguments are from an iteratee call,
   *  else `false`.
   */
  function isIterateeCall(value, index, object) {
    if (!isObject_1(object)) {
      return false;
    }
    var type = typeof index;
    if (type == 'number'
          ? (isArrayLike_1(object) && _isIndex(index, object.length))
          : (type == 'string' && index in object)
        ) {
      return eq_1(object[index], value);
    }
    return false;
  }

  var _isIterateeCall = isIterateeCall;

  /** Used to match a single whitespace character. */
  var reWhitespace = /\s/;

  /**
   * Used by `_.trim` and `_.trimEnd` to get the index of the last non-whitespace
   * character of `string`.
   *
   * @private
   * @param {string} string The string to inspect.
   * @returns {number} Returns the index of the last non-whitespace character.
   */
  function trimmedEndIndex(string) {
    var index = string.length;

    while (index-- && reWhitespace.test(string.charAt(index))) {}
    return index;
  }

  var _trimmedEndIndex = trimmedEndIndex;

  /** Used to match leading whitespace. */
  var reTrimStart = /^\s+/;

  /**
   * The base implementation of `_.trim`.
   *
   * @private
   * @param {string} string The string to trim.
   * @returns {string} Returns the trimmed string.
   */
  function baseTrim(string) {
    return string
      ? string.slice(0, _trimmedEndIndex(string) + 1).replace(reTrimStart, '')
      : string;
  }

  var _baseTrim = baseTrim;

  /** Used as references for various `Number` constants. */
  var NAN = 0 / 0;

  /** Used to detect bad signed hexadecimal string values. */
  var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;

  /** Used to detect binary string values. */
  var reIsBinary = /^0b[01]+$/i;

  /** Used to detect octal string values. */
  var reIsOctal = /^0o[0-7]+$/i;

  /** Built-in method references without a dependency on `root`. */
  var freeParseInt = parseInt;

  /**
   * Converts `value` to a number.
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Lang
   * @param {*} value The value to process.
   * @returns {number} Returns the number.
   * @example
   *
   * _.toNumber(3.2);
   * // => 3.2
   *
   * _.toNumber(Number.MIN_VALUE);
   * // => 5e-324
   *
   * _.toNumber(Infinity);
   * // => Infinity
   *
   * _.toNumber('3.2');
   * // => 3.2
   */
  function toNumber(value) {
    if (typeof value == 'number') {
      return value;
    }
    if (isSymbol_1(value)) {
      return NAN;
    }
    if (isObject_1(value)) {
      var other = typeof value.valueOf == 'function' ? value.valueOf() : value;
      value = isObject_1(other) ? (other + '') : other;
    }
    if (typeof value != 'string') {
      return value === 0 ? value : +value;
    }
    value = _baseTrim(value);
    var isBinary = reIsBinary.test(value);
    return (isBinary || reIsOctal.test(value))
      ? freeParseInt(value.slice(2), isBinary ? 2 : 8)
      : (reIsBadHex.test(value) ? NAN : +value);
  }

  var toNumber_1 = toNumber;

  /** Used as references for various `Number` constants. */
  var INFINITY$1 = 1 / 0,
      MAX_INTEGER = 1.7976931348623157e+308;

  /**
   * Converts `value` to a finite number.
   *
   * @static
   * @memberOf _
   * @since 4.12.0
   * @category Lang
   * @param {*} value The value to convert.
   * @returns {number} Returns the converted number.
   * @example
   *
   * _.toFinite(3.2);
   * // => 3.2
   *
   * _.toFinite(Number.MIN_VALUE);
   * // => 5e-324
   *
   * _.toFinite(Infinity);
   * // => 1.7976931348623157e+308
   *
   * _.toFinite('3.2');
   * // => 3.2
   */
  function toFinite(value) {
    if (!value) {
      return value === 0 ? value : 0;
    }
    value = toNumber_1(value);
    if (value === INFINITY$1 || value === -INFINITY$1) {
      var sign = (value < 0 ? -1 : 1);
      return sign * MAX_INTEGER;
    }
    return value === value ? value : 0;
  }

  var toFinite_1 = toFinite;

  /**
   * Converts `value` to an integer.
   *
   * **Note:** This method is loosely based on
   * [`ToInteger`](http://www.ecma-international.org/ecma-262/7.0/#sec-tointeger).
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Lang
   * @param {*} value The value to convert.
   * @returns {number} Returns the converted integer.
   * @example
   *
   * _.toInteger(3.2);
   * // => 3
   *
   * _.toInteger(Number.MIN_VALUE);
   * // => 0
   *
   * _.toInteger(Infinity);
   * // => 1.7976931348623157e+308
   *
   * _.toInteger('3.2');
   * // => 3
   */
  function toInteger(value) {
    var result = toFinite_1(value),
        remainder = result % 1;

    return result === result ? (remainder ? result - remainder : result) : 0;
  }

  var toInteger_1 = toInteger;

  /* Built-in method references for those with the same name as other `lodash` methods. */
  var nativeCeil = Math.ceil,
      nativeMax$2 = Math.max;

  /**
   * Creates an array of elements split into groups the length of `size`.
   * If `array` can't be split evenly, the final chunk will be the remaining
   * elements.
   *
   * @static
   * @memberOf _
   * @since 3.0.0
   * @category Array
   * @param {Array} array The array to process.
   * @param {number} [size=1] The length of each chunk
   * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
   * @returns {Array} Returns the new array of chunks.
   * @example
   *
   * _.chunk(['a', 'b', 'c', 'd'], 2);
   * // => [['a', 'b'], ['c', 'd']]
   *
   * _.chunk(['a', 'b', 'c', 'd'], 3);
   * // => [['a', 'b', 'c'], ['d']]
   */
  function chunk(array, size, guard) {
    if ((guard ? _isIterateeCall(array, size, guard) : size === undefined)) {
      size = 1;
    } else {
      size = nativeMax$2(toInteger_1(size), 0);
    }
    var length = array == null ? 0 : array.length;
    if (!length || size < 1) {
      return [];
    }
    var index = 0,
        resIndex = 0,
        result = Array(nativeCeil(length / size));

    while (index < length) {
      result[resIndex++] = _baseSlice(array, index, (index += size));
    }
    return result;
  }

  var chunk_1 = chunk;

  /** Used to stand-in for `undefined` hash values. */
  var HASH_UNDEFINED = '__lodash_hash_undefined__';

  /**
   * Adds `value` to the array cache.
   *
   * @private
   * @name add
   * @memberOf SetCache
   * @alias push
   * @param {*} value The value to cache.
   * @returns {Object} Returns the cache instance.
   */
  function setCacheAdd(value) {
    this.__data__.set(value, HASH_UNDEFINED);
    return this;
  }

  var _setCacheAdd = setCacheAdd;

  /**
   * Checks if `value` is in the array cache.
   *
   * @private
   * @name has
   * @memberOf SetCache
   * @param {*} value The value to search for.
   * @returns {number} Returns `true` if `value` is found, else `false`.
   */
  function setCacheHas(value) {
    return this.__data__.has(value);
  }

  var _setCacheHas = setCacheHas;

  /**
   *
   * Creates an array cache object to store unique values.
   *
   * @private
   * @constructor
   * @param {Array} [values] The values to cache.
   */
  function SetCache(values) {
    var index = -1,
        length = values == null ? 0 : values.length;

    this.__data__ = new _MapCache;
    while (++index < length) {
      this.add(values[index]);
    }
  }

  // Add methods to `SetCache`.
  SetCache.prototype.add = SetCache.prototype.push = _setCacheAdd;
  SetCache.prototype.has = _setCacheHas;

  var _SetCache = SetCache;

  /**
   * A specialized version of `_.some` for arrays without support for iteratee
   * shorthands.
   *
   * @private
   * @param {Array} [array] The array to iterate over.
   * @param {Function} predicate The function invoked per iteration.
   * @returns {boolean} Returns `true` if any element passes the predicate check,
   *  else `false`.
   */
  function arraySome(array, predicate) {
    var index = -1,
        length = array == null ? 0 : array.length;

    while (++index < length) {
      if (predicate(array[index], index, array)) {
        return true;
      }
    }
    return false;
  }

  var _arraySome = arraySome;

  /**
   * Checks if a `cache` value for `key` exists.
   *
   * @private
   * @param {Object} cache The cache to query.
   * @param {string} key The key of the entry to check.
   * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
   */
  function cacheHas(cache, key) {
    return cache.has(key);
  }

  var _cacheHas = cacheHas;

  /** Used to compose bitmasks for value comparisons. */
  var COMPARE_PARTIAL_FLAG$5 = 1,
      COMPARE_UNORDERED_FLAG$3 = 2;

  /**
   * A specialized version of `baseIsEqualDeep` for arrays with support for
   * partial deep comparisons.
   *
   * @private
   * @param {Array} array The array to compare.
   * @param {Array} other The other array to compare.
   * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
   * @param {Function} customizer The function to customize comparisons.
   * @param {Function} equalFunc The function to determine equivalents of values.
   * @param {Object} stack Tracks traversed `array` and `other` objects.
   * @returns {boolean} Returns `true` if the arrays are equivalent, else `false`.
   */
  function equalArrays(array, other, bitmask, customizer, equalFunc, stack) {
    var isPartial = bitmask & COMPARE_PARTIAL_FLAG$5,
        arrLength = array.length,
        othLength = other.length;

    if (arrLength != othLength && !(isPartial && othLength > arrLength)) {
      return false;
    }
    // Check that cyclic values are equal.
    var arrStacked = stack.get(array);
    var othStacked = stack.get(other);
    if (arrStacked && othStacked) {
      return arrStacked == other && othStacked == array;
    }
    var index = -1,
        result = true,
        seen = (bitmask & COMPARE_UNORDERED_FLAG$3) ? new _SetCache : undefined;

    stack.set(array, other);
    stack.set(other, array);

    // Ignore non-index properties.
    while (++index < arrLength) {
      var arrValue = array[index],
          othValue = other[index];

      if (customizer) {
        var compared = isPartial
          ? customizer(othValue, arrValue, index, other, array, stack)
          : customizer(arrValue, othValue, index, array, other, stack);
      }
      if (compared !== undefined) {
        if (compared) {
          continue;
        }
        result = false;
        break;
      }
      // Recursively compare arrays (susceptible to call stack limits).
      if (seen) {
        if (!_arraySome(other, function(othValue, othIndex) {
              if (!_cacheHas(seen, othIndex) &&
                  (arrValue === othValue || equalFunc(arrValue, othValue, bitmask, customizer, stack))) {
                return seen.push(othIndex);
              }
            })) {
          result = false;
          break;
        }
      } else if (!(
            arrValue === othValue ||
              equalFunc(arrValue, othValue, bitmask, customizer, stack)
          )) {
        result = false;
        break;
      }
    }
    stack['delete'](array);
    stack['delete'](other);
    return result;
  }

  var _equalArrays = equalArrays;

  /**
   * Converts `map` to its key-value pairs.
   *
   * @private
   * @param {Object} map The map to convert.
   * @returns {Array} Returns the key-value pairs.
   */
  function mapToArray(map) {
    var index = -1,
        result = Array(map.size);

    map.forEach(function(value, key) {
      result[++index] = [key, value];
    });
    return result;
  }

  var _mapToArray = mapToArray;

  /**
   * Converts `set` to an array of its values.
   *
   * @private
   * @param {Object} set The set to convert.
   * @returns {Array} Returns the values.
   */
  function setToArray(set) {
    var index = -1,
        result = Array(set.size);

    set.forEach(function(value) {
      result[++index] = value;
    });
    return result;
  }

  var _setToArray = setToArray;

  /** Used to compose bitmasks for value comparisons. */
  var COMPARE_PARTIAL_FLAG$4 = 1,
      COMPARE_UNORDERED_FLAG$2 = 2;

  /** `Object#toString` result references. */
  var boolTag = '[object Boolean]',
      dateTag = '[object Date]',
      errorTag = '[object Error]',
      mapTag = '[object Map]',
      numberTag = '[object Number]',
      regexpTag$1 = '[object RegExp]',
      setTag = '[object Set]',
      stringTag = '[object String]',
      symbolTag = '[object Symbol]';

  var arrayBufferTag = '[object ArrayBuffer]',
      dataViewTag = '[object DataView]';

  /** Used to convert symbols to primitives and strings. */
  var symbolProto = _Symbol ? _Symbol.prototype : undefined,
      symbolValueOf = symbolProto ? symbolProto.valueOf : undefined;

  /**
   * A specialized version of `baseIsEqualDeep` for comparing objects of
   * the same `toStringTag`.
   *
   * **Note:** This function only supports comparing values with tags of
   * `Boolean`, `Date`, `Error`, `Number`, `RegExp`, or `String`.
   *
   * @private
   * @param {Object} object The object to compare.
   * @param {Object} other The other object to compare.
   * @param {string} tag The `toStringTag` of the objects to compare.
   * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
   * @param {Function} customizer The function to customize comparisons.
   * @param {Function} equalFunc The function to determine equivalents of values.
   * @param {Object} stack Tracks traversed `object` and `other` objects.
   * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
   */
  function equalByTag(object, other, tag, bitmask, customizer, equalFunc, stack) {
    switch (tag) {
      case dataViewTag:
        if ((object.byteLength != other.byteLength) ||
            (object.byteOffset != other.byteOffset)) {
          return false;
        }
        object = object.buffer;
        other = other.buffer;

      case arrayBufferTag:
        if ((object.byteLength != other.byteLength) ||
            !equalFunc(new _Uint8Array(object), new _Uint8Array(other))) {
          return false;
        }
        return true;

      case boolTag:
      case dateTag:
      case numberTag:
        // Coerce booleans to `1` or `0` and dates to milliseconds.
        // Invalid dates are coerced to `NaN`.
        return eq_1(+object, +other);

      case errorTag:
        return object.name == other.name && object.message == other.message;

      case regexpTag$1:
      case stringTag:
        // Coerce regexes to strings and treat strings, primitives and objects,
        // as equal. See http://www.ecma-international.org/ecma-262/7.0/#sec-regexp.prototype.tostring
        // for more details.
        return object == (other + '');

      case mapTag:
        var convert = _mapToArray;

      case setTag:
        var isPartial = bitmask & COMPARE_PARTIAL_FLAG$4;
        convert || (convert = _setToArray);

        if (object.size != other.size && !isPartial) {
          return false;
        }
        // Assume cyclic values are equal.
        var stacked = stack.get(object);
        if (stacked) {
          return stacked == other;
        }
        bitmask |= COMPARE_UNORDERED_FLAG$2;

        // Recursively compare objects (susceptible to call stack limits).
        stack.set(object, other);
        var result = _equalArrays(convert(object), convert(other), bitmask, customizer, equalFunc, stack);
        stack['delete'](object);
        return result;

      case symbolTag:
        if (symbolValueOf) {
          return symbolValueOf.call(object) == symbolValueOf.call(other);
        }
    }
    return false;
  }

  var _equalByTag = equalByTag;

  /** Used to compose bitmasks for value comparisons. */
  var COMPARE_PARTIAL_FLAG$3 = 1;

  /** Used for built-in method references. */
  var objectProto$2 = Object.prototype;

  /** Used to check objects for own properties. */
  var hasOwnProperty$2 = objectProto$2.hasOwnProperty;

  /**
   * A specialized version of `baseIsEqualDeep` for objects with support for
   * partial deep comparisons.
   *
   * @private
   * @param {Object} object The object to compare.
   * @param {Object} other The other object to compare.
   * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
   * @param {Function} customizer The function to customize comparisons.
   * @param {Function} equalFunc The function to determine equivalents of values.
   * @param {Object} stack Tracks traversed `object` and `other` objects.
   * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
   */
  function equalObjects(object, other, bitmask, customizer, equalFunc, stack) {
    var isPartial = bitmask & COMPARE_PARTIAL_FLAG$3,
        objProps = _getAllKeys(object),
        objLength = objProps.length,
        othProps = _getAllKeys(other),
        othLength = othProps.length;

    if (objLength != othLength && !isPartial) {
      return false;
    }
    var index = objLength;
    while (index--) {
      var key = objProps[index];
      if (!(isPartial ? key in other : hasOwnProperty$2.call(other, key))) {
        return false;
      }
    }
    // Check that cyclic values are equal.
    var objStacked = stack.get(object);
    var othStacked = stack.get(other);
    if (objStacked && othStacked) {
      return objStacked == other && othStacked == object;
    }
    var result = true;
    stack.set(object, other);
    stack.set(other, object);

    var skipCtor = isPartial;
    while (++index < objLength) {
      key = objProps[index];
      var objValue = object[key],
          othValue = other[key];

      if (customizer) {
        var compared = isPartial
          ? customizer(othValue, objValue, key, other, object, stack)
          : customizer(objValue, othValue, key, object, other, stack);
      }
      // Recursively compare objects (susceptible to call stack limits).
      if (!(compared === undefined
            ? (objValue === othValue || equalFunc(objValue, othValue, bitmask, customizer, stack))
            : compared
          )) {
        result = false;
        break;
      }
      skipCtor || (skipCtor = key == 'constructor');
    }
    if (result && !skipCtor) {
      var objCtor = object.constructor,
          othCtor = other.constructor;

      // Non `Object` object instances with different constructors are not equal.
      if (objCtor != othCtor &&
          ('constructor' in object && 'constructor' in other) &&
          !(typeof objCtor == 'function' && objCtor instanceof objCtor &&
            typeof othCtor == 'function' && othCtor instanceof othCtor)) {
        result = false;
      }
    }
    stack['delete'](object);
    stack['delete'](other);
    return result;
  }

  var _equalObjects = equalObjects;

  /** Used to compose bitmasks for value comparisons. */
  var COMPARE_PARTIAL_FLAG$2 = 1;

  /** `Object#toString` result references. */
  var argsTag = '[object Arguments]',
      arrayTag = '[object Array]',
      objectTag$1 = '[object Object]';

  /** Used for built-in method references. */
  var objectProto$1 = Object.prototype;

  /** Used to check objects for own properties. */
  var hasOwnProperty$1 = objectProto$1.hasOwnProperty;

  /**
   * A specialized version of `baseIsEqual` for arrays and objects which performs
   * deep comparisons and tracks traversed objects enabling objects with circular
   * references to be compared.
   *
   * @private
   * @param {Object} object The object to compare.
   * @param {Object} other The other object to compare.
   * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
   * @param {Function} customizer The function to customize comparisons.
   * @param {Function} equalFunc The function to determine equivalents of values.
   * @param {Object} [stack] Tracks traversed `object` and `other` objects.
   * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
   */
  function baseIsEqualDeep(object, other, bitmask, customizer, equalFunc, stack) {
    var objIsArr = isArray_1(object),
        othIsArr = isArray_1(other),
        objTag = objIsArr ? arrayTag : _getTag(object),
        othTag = othIsArr ? arrayTag : _getTag(other);

    objTag = objTag == argsTag ? objectTag$1 : objTag;
    othTag = othTag == argsTag ? objectTag$1 : othTag;

    var objIsObj = objTag == objectTag$1,
        othIsObj = othTag == objectTag$1,
        isSameTag = objTag == othTag;

    if (isSameTag && isBuffer_1(object)) {
      if (!isBuffer_1(other)) {
        return false;
      }
      objIsArr = true;
      objIsObj = false;
    }
    if (isSameTag && !objIsObj) {
      stack || (stack = new _Stack);
      return (objIsArr || isTypedArray_1(object))
        ? _equalArrays(object, other, bitmask, customizer, equalFunc, stack)
        : _equalByTag(object, other, objTag, bitmask, customizer, equalFunc, stack);
    }
    if (!(bitmask & COMPARE_PARTIAL_FLAG$2)) {
      var objIsWrapped = objIsObj && hasOwnProperty$1.call(object, '__wrapped__'),
          othIsWrapped = othIsObj && hasOwnProperty$1.call(other, '__wrapped__');

      if (objIsWrapped || othIsWrapped) {
        var objUnwrapped = objIsWrapped ? object.value() : object,
            othUnwrapped = othIsWrapped ? other.value() : other;

        stack || (stack = new _Stack);
        return equalFunc(objUnwrapped, othUnwrapped, bitmask, customizer, stack);
      }
    }
    if (!isSameTag) {
      return false;
    }
    stack || (stack = new _Stack);
    return _equalObjects(object, other, bitmask, customizer, equalFunc, stack);
  }

  var _baseIsEqualDeep = baseIsEqualDeep;

  /**
   * The base implementation of `_.isEqual` which supports partial comparisons
   * and tracks traversed objects.
   *
   * @private
   * @param {*} value The value to compare.
   * @param {*} other The other value to compare.
   * @param {boolean} bitmask The bitmask flags.
   *  1 - Unordered comparison
   *  2 - Partial comparison
   * @param {Function} [customizer] The function to customize comparisons.
   * @param {Object} [stack] Tracks traversed `value` and `other` objects.
   * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
   */
  function baseIsEqual(value, other, bitmask, customizer, stack) {
    if (value === other) {
      return true;
    }
    if (value == null || other == null || (!isObjectLike_1(value) && !isObjectLike_1(other))) {
      return value !== value && other !== other;
    }
    return _baseIsEqualDeep(value, other, bitmask, customizer, baseIsEqual, stack);
  }

  var _baseIsEqual = baseIsEqual;

  /** Used to compose bitmasks for value comparisons. */
  var COMPARE_PARTIAL_FLAG$1 = 1,
      COMPARE_UNORDERED_FLAG$1 = 2;

  /**
   * The base implementation of `_.isMatch` without support for iteratee shorthands.
   *
   * @private
   * @param {Object} object The object to inspect.
   * @param {Object} source The object of property values to match.
   * @param {Array} matchData The property names, values, and compare flags to match.
   * @param {Function} [customizer] The function to customize comparisons.
   * @returns {boolean} Returns `true` if `object` is a match, else `false`.
   */
  function baseIsMatch(object, source, matchData, customizer) {
    var index = matchData.length,
        length = index,
        noCustomizer = !customizer;

    if (object == null) {
      return !length;
    }
    object = Object(object);
    while (index--) {
      var data = matchData[index];
      if ((noCustomizer && data[2])
            ? data[1] !== object[data[0]]
            : !(data[0] in object)
          ) {
        return false;
      }
    }
    while (++index < length) {
      data = matchData[index];
      var key = data[0],
          objValue = object[key],
          srcValue = data[1];

      if (noCustomizer && data[2]) {
        if (objValue === undefined && !(key in object)) {
          return false;
        }
      } else {
        var stack = new _Stack;
        if (customizer) {
          var result = customizer(objValue, srcValue, key, object, source, stack);
        }
        if (!(result === undefined
              ? _baseIsEqual(srcValue, objValue, COMPARE_PARTIAL_FLAG$1 | COMPARE_UNORDERED_FLAG$1, customizer, stack)
              : result
            )) {
          return false;
        }
      }
    }
    return true;
  }

  var _baseIsMatch = baseIsMatch;

  /**
   * Checks if `value` is suitable for strict equality comparisons, i.e. `===`.
   *
   * @private
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` if suitable for strict
   *  equality comparisons, else `false`.
   */
  function isStrictComparable(value) {
    return value === value && !isObject_1(value);
  }

  var _isStrictComparable = isStrictComparable;

  /**
   * Gets the property names, values, and compare flags of `object`.
   *
   * @private
   * @param {Object} object The object to query.
   * @returns {Array} Returns the match data of `object`.
   */
  function getMatchData(object) {
    var result = keys_1(object),
        length = result.length;

    while (length--) {
      var key = result[length],
          value = object[key];

      result[length] = [key, value, _isStrictComparable(value)];
    }
    return result;
  }

  var _getMatchData = getMatchData;

  /**
   * A specialized version of `matchesProperty` for source values suitable
   * for strict equality comparisons, i.e. `===`.
   *
   * @private
   * @param {string} key The key of the property to get.
   * @param {*} srcValue The value to match.
   * @returns {Function} Returns the new spec function.
   */
  function matchesStrictComparable(key, srcValue) {
    return function(object) {
      if (object == null) {
        return false;
      }
      return object[key] === srcValue &&
        (srcValue !== undefined || (key in Object(object)));
    };
  }

  var _matchesStrictComparable = matchesStrictComparable;

  /**
   * The base implementation of `_.matches` which doesn't clone `source`.
   *
   * @private
   * @param {Object} source The object of property values to match.
   * @returns {Function} Returns the new spec function.
   */
  function baseMatches(source) {
    var matchData = _getMatchData(source);
    if (matchData.length == 1 && matchData[0][2]) {
      return _matchesStrictComparable(matchData[0][0], matchData[0][1]);
    }
    return function(object) {
      return object === source || _baseIsMatch(object, source, matchData);
    };
  }

  var _baseMatches = baseMatches;

  /**
   * The base implementation of `_.hasIn` without support for deep paths.
   *
   * @private
   * @param {Object} [object] The object to query.
   * @param {Array|string} key The key to check.
   * @returns {boolean} Returns `true` if `key` exists, else `false`.
   */
  function baseHasIn(object, key) {
    return object != null && key in Object(object);
  }

  var _baseHasIn = baseHasIn;

  /**
   * Checks if `path` exists on `object`.
   *
   * @private
   * @param {Object} object The object to query.
   * @param {Array|string} path The path to check.
   * @param {Function} hasFunc The function to check properties.
   * @returns {boolean} Returns `true` if `path` exists, else `false`.
   */
  function hasPath(object, path, hasFunc) {
    path = _castPath(path, object);

    var index = -1,
        length = path.length,
        result = false;

    while (++index < length) {
      var key = _toKey(path[index]);
      if (!(result = object != null && hasFunc(object, key))) {
        break;
      }
      object = object[key];
    }
    if (result || ++index != length) {
      return result;
    }
    length = object == null ? 0 : object.length;
    return !!length && isLength_1(length) && _isIndex(key, length) &&
      (isArray_1(object) || isArguments_1(object));
  }

  var _hasPath = hasPath;

  /**
   * Checks if `path` is a direct or inherited property of `object`.
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Object
   * @param {Object} object The object to query.
   * @param {Array|string} path The path to check.
   * @returns {boolean} Returns `true` if `path` exists, else `false`.
   * @example
   *
   * var object = _.create({ 'a': _.create({ 'b': 2 }) });
   *
   * _.hasIn(object, 'a');
   * // => true
   *
   * _.hasIn(object, 'a.b');
   * // => true
   *
   * _.hasIn(object, ['a', 'b']);
   * // => true
   *
   * _.hasIn(object, 'b');
   * // => false
   */
  function hasIn(object, path) {
    return object != null && _hasPath(object, path, _baseHasIn);
  }

  var hasIn_1 = hasIn;

  /** Used to compose bitmasks for value comparisons. */
  var COMPARE_PARTIAL_FLAG = 1,
      COMPARE_UNORDERED_FLAG = 2;

  /**
   * The base implementation of `_.matchesProperty` which doesn't clone `srcValue`.
   *
   * @private
   * @param {string} path The path of the property to get.
   * @param {*} srcValue The value to match.
   * @returns {Function} Returns the new spec function.
   */
  function baseMatchesProperty(path, srcValue) {
    if (_isKey(path) && _isStrictComparable(srcValue)) {
      return _matchesStrictComparable(_toKey(path), srcValue);
    }
    return function(object) {
      var objValue = get_1(object, path);
      return (objValue === undefined && objValue === srcValue)
        ? hasIn_1(object, path)
        : _baseIsEqual(srcValue, objValue, COMPARE_PARTIAL_FLAG | COMPARE_UNORDERED_FLAG);
    };
  }

  var _baseMatchesProperty = baseMatchesProperty;

  /**
   * This method returns the first argument it receives.
   *
   * @static
   * @since 0.1.0
   * @memberOf _
   * @category Util
   * @param {*} value Any value.
   * @returns {*} Returns `value`.
   * @example
   *
   * var object = { 'a': 1 };
   *
   * console.log(_.identity(object) === object);
   * // => true
   */
  function identity(value) {
    return value;
  }

  var identity_1 = identity;

  /**
   * The base implementation of `_.property` without support for deep paths.
   *
   * @private
   * @param {string} key The key of the property to get.
   * @returns {Function} Returns the new accessor function.
   */
  function baseProperty(key) {
    return function(object) {
      return object == null ? undefined : object[key];
    };
  }

  var _baseProperty = baseProperty;

  /**
   * A specialized version of `baseProperty` which supports deep paths.
   *
   * @private
   * @param {Array|string} path The path of the property to get.
   * @returns {Function} Returns the new accessor function.
   */
  function basePropertyDeep(path) {
    return function(object) {
      return _baseGet(object, path);
    };
  }

  var _basePropertyDeep = basePropertyDeep;

  /**
   * Creates a function that returns the value at `path` of a given object.
   *
   * @static
   * @memberOf _
   * @since 2.4.0
   * @category Util
   * @param {Array|string} path The path of the property to get.
   * @returns {Function} Returns the new accessor function.
   * @example
   *
   * var objects = [
   *   { 'a': { 'b': 2 } },
   *   { 'a': { 'b': 1 } }
   * ];
   *
   * _.map(objects, _.property('a.b'));
   * // => [2, 1]
   *
   * _.map(_.sortBy(objects, _.property(['a', 'b'])), 'a.b');
   * // => [1, 2]
   */
  function property(path) {
    return _isKey(path) ? _baseProperty(_toKey(path)) : _basePropertyDeep(path);
  }

  var property_1 = property;

  /**
   * The base implementation of `_.iteratee`.
   *
   * @private
   * @param {*} [value=_.identity] The value to convert to an iteratee.
   * @returns {Function} Returns the iteratee.
   */
  function baseIteratee(value) {
    // Don't store the `typeof` result in a variable to avoid a JIT bug in Safari 9.
    // See https://bugs.webkit.org/show_bug.cgi?id=156034 for more details.
    if (typeof value == 'function') {
      return value;
    }
    if (value == null) {
      return identity_1;
    }
    if (typeof value == 'object') {
      return isArray_1(value)
        ? _baseMatchesProperty(value[0], value[1])
        : _baseMatches(value);
    }
    return property_1(value);
  }

  var _baseIteratee = baseIteratee;

  /**
   * Creates a base function for methods like `_.forIn` and `_.forOwn`.
   *
   * @private
   * @param {boolean} [fromRight] Specify iterating from right to left.
   * @returns {Function} Returns the new base function.
   */
  function createBaseFor(fromRight) {
    return function(object, iteratee, keysFunc) {
      var index = -1,
          iterable = Object(object),
          props = keysFunc(object),
          length = props.length;

      while (length--) {
        var key = props[fromRight ? length : ++index];
        if (iteratee(iterable[key], key, iterable) === false) {
          break;
        }
      }
      return object;
    };
  }

  var _createBaseFor = createBaseFor;

  /**
   * The base implementation of `baseForOwn` which iterates over `object`
   * properties returned by `keysFunc` and invokes `iteratee` for each property.
   * Iteratee functions may exit iteration early by explicitly returning `false`.
   *
   * @private
   * @param {Object} object The object to iterate over.
   * @param {Function} iteratee The function invoked per iteration.
   * @param {Function} keysFunc The function to get the keys of `object`.
   * @returns {Object} Returns `object`.
   */
  var baseFor = _createBaseFor();

  var _baseFor = baseFor;

  /**
   * The base implementation of `_.forOwn` without support for iteratee shorthands.
   *
   * @private
   * @param {Object} object The object to iterate over.
   * @param {Function} iteratee The function invoked per iteration.
   * @returns {Object} Returns `object`.
   */
  function baseForOwn(object, iteratee) {
    return object && _baseFor(object, iteratee, keys_1);
  }

  var _baseForOwn = baseForOwn;

  /**
   * Creates a `baseEach` or `baseEachRight` function.
   *
   * @private
   * @param {Function} eachFunc The function to iterate over a collection.
   * @param {boolean} [fromRight] Specify iterating from right to left.
   * @returns {Function} Returns the new base function.
   */
  function createBaseEach(eachFunc, fromRight) {
    return function(collection, iteratee) {
      if (collection == null) {
        return collection;
      }
      if (!isArrayLike_1(collection)) {
        return eachFunc(collection, iteratee);
      }
      var length = collection.length,
          index = fromRight ? length : -1,
          iterable = Object(collection);

      while ((fromRight ? index-- : ++index < length)) {
        if (iteratee(iterable[index], index, iterable) === false) {
          break;
        }
      }
      return collection;
    };
  }

  var _createBaseEach = createBaseEach;

  /**
   * The base implementation of `_.forEach` without support for iteratee shorthands.
   *
   * @private
   * @param {Array|Object} collection The collection to iterate over.
   * @param {Function} iteratee The function invoked per iteration.
   * @returns {Array|Object} Returns `collection`.
   */
  var baseEach = _createBaseEach(_baseForOwn);

  var _baseEach = baseEach;

  /**
   * The base implementation of `_.map` without support for iteratee shorthands.
   *
   * @private
   * @param {Array|Object} collection The collection to iterate over.
   * @param {Function} iteratee The function invoked per iteration.
   * @returns {Array} Returns the new mapped array.
   */
  function baseMap(collection, iteratee) {
    var index = -1,
        result = isArrayLike_1(collection) ? Array(collection.length) : [];

    _baseEach(collection, function(value, key, collection) {
      result[++index] = iteratee(value, key, collection);
    });
    return result;
  }

  var _baseMap = baseMap;

  /**
   * The base implementation of `_.sortBy` which uses `comparer` to define the
   * sort order of `array` and replaces criteria objects with their corresponding
   * values.
   *
   * @private
   * @param {Array} array The array to sort.
   * @param {Function} comparer The function to define sort order.
   * @returns {Array} Returns `array`.
   */
  function baseSortBy(array, comparer) {
    var length = array.length;

    array.sort(comparer);
    while (length--) {
      array[length] = array[length].value;
    }
    return array;
  }

  var _baseSortBy = baseSortBy;

  /**
   * Compares values to sort them in ascending order.
   *
   * @private
   * @param {*} value The value to compare.
   * @param {*} other The other value to compare.
   * @returns {number} Returns the sort order indicator for `value`.
   */
  function compareAscending(value, other) {
    if (value !== other) {
      var valIsDefined = value !== undefined,
          valIsNull = value === null,
          valIsReflexive = value === value,
          valIsSymbol = isSymbol_1(value);

      var othIsDefined = other !== undefined,
          othIsNull = other === null,
          othIsReflexive = other === other,
          othIsSymbol = isSymbol_1(other);

      if ((!othIsNull && !othIsSymbol && !valIsSymbol && value > other) ||
          (valIsSymbol && othIsDefined && othIsReflexive && !othIsNull && !othIsSymbol) ||
          (valIsNull && othIsDefined && othIsReflexive) ||
          (!valIsDefined && othIsReflexive) ||
          !valIsReflexive) {
        return 1;
      }
      if ((!valIsNull && !valIsSymbol && !othIsSymbol && value < other) ||
          (othIsSymbol && valIsDefined && valIsReflexive && !valIsNull && !valIsSymbol) ||
          (othIsNull && valIsDefined && valIsReflexive) ||
          (!othIsDefined && valIsReflexive) ||
          !othIsReflexive) {
        return -1;
      }
    }
    return 0;
  }

  var _compareAscending = compareAscending;

  /**
   * Used by `_.orderBy` to compare multiple properties of a value to another
   * and stable sort them.
   *
   * If `orders` is unspecified, all values are sorted in ascending order. Otherwise,
   * specify an order of "desc" for descending or "asc" for ascending sort order
   * of corresponding values.
   *
   * @private
   * @param {Object} object The object to compare.
   * @param {Object} other The other object to compare.
   * @param {boolean[]|string[]} orders The order to sort by for each property.
   * @returns {number} Returns the sort order indicator for `object`.
   */
  function compareMultiple(object, other, orders) {
    var index = -1,
        objCriteria = object.criteria,
        othCriteria = other.criteria,
        length = objCriteria.length,
        ordersLength = orders.length;

    while (++index < length) {
      var result = _compareAscending(objCriteria[index], othCriteria[index]);
      if (result) {
        if (index >= ordersLength) {
          return result;
        }
        var order = orders[index];
        return result * (order == 'desc' ? -1 : 1);
      }
    }
    // Fixes an `Array#sort` bug in the JS engine embedded in Adobe applications
    // that causes it, under certain circumstances, to provide the same value for
    // `object` and `other`. See https://github.com/jashkenas/underscore/pull/1247
    // for more details.
    //
    // This also ensures a stable sort in V8 and other engines.
    // See https://bugs.chromium.org/p/v8/issues/detail?id=90 for more details.
    return object.index - other.index;
  }

  var _compareMultiple = compareMultiple;

  /**
   * The base implementation of `_.orderBy` without param guards.
   *
   * @private
   * @param {Array|Object} collection The collection to iterate over.
   * @param {Function[]|Object[]|string[]} iteratees The iteratees to sort by.
   * @param {string[]} orders The sort orders of `iteratees`.
   * @returns {Array} Returns the new sorted array.
   */
  function baseOrderBy(collection, iteratees, orders) {
    if (iteratees.length) {
      iteratees = _arrayMap(iteratees, function(iteratee) {
        if (isArray_1(iteratee)) {
          return function(value) {
            return _baseGet(value, iteratee.length === 1 ? iteratee[0] : iteratee);
          }
        }
        return iteratee;
      });
    } else {
      iteratees = [identity_1];
    }

    var index = -1;
    iteratees = _arrayMap(iteratees, _baseUnary(_baseIteratee));

    var result = _baseMap(collection, function(value, key, collection) {
      var criteria = _arrayMap(iteratees, function(iteratee) {
        return iteratee(value);
      });
      return { 'criteria': criteria, 'index': ++index, 'value': value };
    });

    return _baseSortBy(result, function(object, other) {
      return _compareMultiple(object, other, orders);
    });
  }

  var _baseOrderBy = baseOrderBy;

  /**
   * This method is like `_.sortBy` except that it allows specifying the sort
   * orders of the iteratees to sort by. If `orders` is unspecified, all values
   * are sorted in ascending order. Otherwise, specify an order of "desc" for
   * descending or "asc" for ascending sort order of corresponding values.
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Collection
   * @param {Array|Object} collection The collection to iterate over.
   * @param {Array[]|Function[]|Object[]|string[]} [iteratees=[_.identity]]
   *  The iteratees to sort by.
   * @param {string[]} [orders] The sort orders of `iteratees`.
   * @param- {Object} [guard] Enables use as an iteratee for methods like `_.reduce`.
   * @returns {Array} Returns the new sorted array.
   * @example
   *
   * var users = [
   *   { 'user': 'fred',   'age': 48 },
   *   { 'user': 'barney', 'age': 34 },
   *   { 'user': 'fred',   'age': 40 },
   *   { 'user': 'barney', 'age': 36 }
   * ];
   *
   * // Sort by `user` in ascending order and by `age` in descending order.
   * _.orderBy(users, ['user', 'age'], ['asc', 'desc']);
   * // => objects for [['barney', 36], ['barney', 34], ['fred', 48], ['fred', 40]]
   */
  function orderBy(collection, iteratees, orders, guard) {
    if (collection == null) {
      return [];
    }
    if (!isArray_1(iteratees)) {
      iteratees = iteratees == null ? [] : [iteratees];
    }
    orders = guard ? undefined : orders;
    if (!isArray_1(orders)) {
      orders = orders == null ? [] : [orders];
    }
    return _baseOrderBy(collection, iteratees, orders);
  }

  var orderBy_1 = orderBy;

  /** Built-in value references. */
  var spreadableSymbol = _Symbol ? _Symbol.isConcatSpreadable : undefined;

  /**
   * Checks if `value` is a flattenable `arguments` object or array.
   *
   * @private
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is flattenable, else `false`.
   */
  function isFlattenable(value) {
    return isArray_1(value) || isArguments_1(value) ||
      !!(spreadableSymbol && value && value[spreadableSymbol]);
  }

  var _isFlattenable = isFlattenable;

  /**
   * The base implementation of `_.flatten` with support for restricting flattening.
   *
   * @private
   * @param {Array} array The array to flatten.
   * @param {number} depth The maximum recursion depth.
   * @param {boolean} [predicate=isFlattenable] The function invoked per iteration.
   * @param {boolean} [isStrict] Restrict to values that pass `predicate` checks.
   * @param {Array} [result=[]] The initial result value.
   * @returns {Array} Returns the new flattened array.
   */
  function baseFlatten(array, depth, predicate, isStrict, result) {
    var index = -1,
        length = array.length;

    predicate || (predicate = _isFlattenable);
    result || (result = []);

    while (++index < length) {
      var value = array[index];
      if (depth > 0 && predicate(value)) {
        if (depth > 1) {
          // Recursively flatten arrays (susceptible to call stack limits).
          baseFlatten(value, depth - 1, predicate, isStrict, result);
        } else {
          _arrayPush(result, value);
        }
      } else if (!isStrict) {
        result[result.length] = value;
      }
    }
    return result;
  }

  var _baseFlatten = baseFlatten;

  /**
   * A faster alternative to `Function#apply`, this function invokes `func`
   * with the `this` binding of `thisArg` and the arguments of `args`.
   *
   * @private
   * @param {Function} func The function to invoke.
   * @param {*} thisArg The `this` binding of `func`.
   * @param {Array} args The arguments to invoke `func` with.
   * @returns {*} Returns the result of `func`.
   */
  function apply(func, thisArg, args) {
    switch (args.length) {
      case 0: return func.call(thisArg);
      case 1: return func.call(thisArg, args[0]);
      case 2: return func.call(thisArg, args[0], args[1]);
      case 3: return func.call(thisArg, args[0], args[1], args[2]);
    }
    return func.apply(thisArg, args);
  }

  var _apply = apply;

  /* Built-in method references for those with the same name as other `lodash` methods. */
  var nativeMax$1 = Math.max;

  /**
   * A specialized version of `baseRest` which transforms the rest array.
   *
   * @private
   * @param {Function} func The function to apply a rest parameter to.
   * @param {number} [start=func.length-1] The start position of the rest parameter.
   * @param {Function} transform The rest array transform.
   * @returns {Function} Returns the new function.
   */
  function overRest(func, start, transform) {
    start = nativeMax$1(start === undefined ? (func.length - 1) : start, 0);
    return function() {
      var args = arguments,
          index = -1,
          length = nativeMax$1(args.length - start, 0),
          array = Array(length);

      while (++index < length) {
        array[index] = args[start + index];
      }
      index = -1;
      var otherArgs = Array(start + 1);
      while (++index < start) {
        otherArgs[index] = args[index];
      }
      otherArgs[start] = transform(array);
      return _apply(func, this, otherArgs);
    };
  }

  var _overRest = overRest;

  /**
   * Creates a function that returns `value`.
   *
   * @static
   * @memberOf _
   * @since 2.4.0
   * @category Util
   * @param {*} value The value to return from the new function.
   * @returns {Function} Returns the new constant function.
   * @example
   *
   * var objects = _.times(2, _.constant({ 'a': 1 }));
   *
   * console.log(objects);
   * // => [{ 'a': 1 }, { 'a': 1 }]
   *
   * console.log(objects[0] === objects[1]);
   * // => true
   */
  function constant(value) {
    return function() {
      return value;
    };
  }

  var constant_1 = constant;

  /**
   * The base implementation of `setToString` without support for hot loop shorting.
   *
   * @private
   * @param {Function} func The function to modify.
   * @param {Function} string The `toString` result.
   * @returns {Function} Returns `func`.
   */
  var baseSetToString = !_defineProperty ? identity_1 : function(func, string) {
    return _defineProperty(func, 'toString', {
      'configurable': true,
      'enumerable': false,
      'value': constant_1(string),
      'writable': true
    });
  };

  var _baseSetToString = baseSetToString;

  /** Used to detect hot functions by number of calls within a span of milliseconds. */
  var HOT_COUNT = 800,
      HOT_SPAN = 16;

  /* Built-in method references for those with the same name as other `lodash` methods. */
  var nativeNow = Date.now;

  /**
   * Creates a function that'll short out and invoke `identity` instead
   * of `func` when it's called `HOT_COUNT` or more times in `HOT_SPAN`
   * milliseconds.
   *
   * @private
   * @param {Function} func The function to restrict.
   * @returns {Function} Returns the new shortable function.
   */
  function shortOut(func) {
    var count = 0,
        lastCalled = 0;

    return function() {
      var stamp = nativeNow(),
          remaining = HOT_SPAN - (stamp - lastCalled);

      lastCalled = stamp;
      if (remaining > 0) {
        if (++count >= HOT_COUNT) {
          return arguments[0];
        }
      } else {
        count = 0;
      }
      return func.apply(undefined, arguments);
    };
  }

  var _shortOut = shortOut;

  /**
   * Sets the `toString` method of `func` to return `string`.
   *
   * @private
   * @param {Function} func The function to modify.
   * @param {Function} string The `toString` result.
   * @returns {Function} Returns `func`.
   */
  var setToString = _shortOut(_baseSetToString);

  var _setToString = setToString;

  /**
   * The base implementation of `_.rest` which doesn't validate or coerce arguments.
   *
   * @private
   * @param {Function} func The function to apply a rest parameter to.
   * @param {number} [start=func.length-1] The start position of the rest parameter.
   * @returns {Function} Returns the new function.
   */
  function baseRest(func, start) {
    return _setToString(_overRest(func, start, identity_1), func + '');
  }

  var _baseRest = baseRest;

  /**
   * Creates an array of elements, sorted in ascending order by the results of
   * running each element in a collection thru each iteratee. This method
   * performs a stable sort, that is, it preserves the original sort order of
   * equal elements. The iteratees are invoked with one argument: (value).
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @category Collection
   * @param {Array|Object} collection The collection to iterate over.
   * @param {...(Function|Function[])} [iteratees=[_.identity]]
   *  The iteratees to sort by.
   * @returns {Array} Returns the new sorted array.
   * @example
   *
   * var users = [
   *   { 'user': 'fred',   'age': 48 },
   *   { 'user': 'barney', 'age': 36 },
   *   { 'user': 'fred',   'age': 30 },
   *   { 'user': 'barney', 'age': 34 }
   * ];
   *
   * _.sortBy(users, [function(o) { return o.user; }]);
   * // => objects for [['barney', 36], ['barney', 34], ['fred', 48], ['fred', 30]]
   *
   * _.sortBy(users, ['user', 'age']);
   * // => objects for [['barney', 34], ['barney', 36], ['fred', 30], ['fred', 48]]
   */
  var sortBy = _baseRest(function(collection, iteratees) {
    if (collection == null) {
      return [];
    }
    var length = iteratees.length;
    if (length > 1 && _isIterateeCall(collection, iteratees[0], iteratees[1])) {
      iteratees = [];
    } else if (length > 2 && _isIterateeCall(iteratees[0], iteratees[1], iteratees[2])) {
      iteratees = [iteratees[0]];
    }
    return _baseOrderBy(collection, _baseFlatten(iteratees, 1), []);
  });

  var sortBy_1 = sortBy;

  /**
   * The base implementation of `_.findIndex` and `_.findLastIndex` without
   * support for iteratee shorthands.
   *
   * @private
   * @param {Array} array The array to inspect.
   * @param {Function} predicate The function invoked per iteration.
   * @param {number} fromIndex The index to search from.
   * @param {boolean} [fromRight] Specify iterating from right to left.
   * @returns {number} Returns the index of the matched value, else `-1`.
   */
  function baseFindIndex(array, predicate, fromIndex, fromRight) {
    var length = array.length,
        index = fromIndex + (fromRight ? 1 : -1);

    while ((fromRight ? index-- : ++index < length)) {
      if (predicate(array[index], index, array)) {
        return index;
      }
    }
    return -1;
  }

  var _baseFindIndex = baseFindIndex;

  /**
   * The base implementation of `_.isNaN` without support for number objects.
   *
   * @private
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is `NaN`, else `false`.
   */
  function baseIsNaN(value) {
    return value !== value;
  }

  var _baseIsNaN = baseIsNaN;

  /**
   * A specialized version of `_.indexOf` which performs strict equality
   * comparisons of values, i.e. `===`.
   *
   * @private
   * @param {Array} array The array to inspect.
   * @param {*} value The value to search for.
   * @param {number} fromIndex The index to search from.
   * @returns {number} Returns the index of the matched value, else `-1`.
   */
  function strictIndexOf(array, value, fromIndex) {
    var index = fromIndex - 1,
        length = array.length;

    while (++index < length) {
      if (array[index] === value) {
        return index;
      }
    }
    return -1;
  }

  var _strictIndexOf = strictIndexOf;

  /**
   * The base implementation of `_.indexOf` without `fromIndex` bounds checks.
   *
   * @private
   * @param {Array} array The array to inspect.
   * @param {*} value The value to search for.
   * @param {number} fromIndex The index to search from.
   * @returns {number} Returns the index of the matched value, else `-1`.
   */
  function baseIndexOf(array, value, fromIndex) {
    return value === value
      ? _strictIndexOf(array, value, fromIndex)
      : _baseFindIndex(array, _baseIsNaN, fromIndex);
  }

  var _baseIndexOf = baseIndexOf;

  /**
   * A specialized version of `_.includes` for arrays without support for
   * specifying an index to search from.
   *
   * @private
   * @param {Array} [array] The array to inspect.
   * @param {*} target The value to search for.
   * @returns {boolean} Returns `true` if `target` is found, else `false`.
   */
  function arrayIncludes(array, value) {
    var length = array == null ? 0 : array.length;
    return !!length && _baseIndexOf(array, value, 0) > -1;
  }

  var _arrayIncludes = arrayIncludes;

  /**
   * This function is like `arrayIncludes` except that it accepts a comparator.
   *
   * @private
   * @param {Array} [array] The array to inspect.
   * @param {*} target The value to search for.
   * @param {Function} comparator The comparator invoked per element.
   * @returns {boolean} Returns `true` if `target` is found, else `false`.
   */
  function arrayIncludesWith(array, value, comparator) {
    var index = -1,
        length = array == null ? 0 : array.length;

    while (++index < length) {
      if (comparator(value, array[index])) {
        return true;
      }
    }
    return false;
  }

  var _arrayIncludesWith = arrayIncludesWith;

  /**
   * This method returns `undefined`.
   *
   * @static
   * @memberOf _
   * @since 2.3.0
   * @category Util
   * @example
   *
   * _.times(2, _.noop);
   * // => [undefined, undefined]
   */
  function noop() {
    // No operation performed.
  }

  var noop_1 = noop;

  /** Used as references for various `Number` constants. */
  var INFINITY = 1 / 0;

  /**
   * Creates a set object of `values`.
   *
   * @private
   * @param {Array} values The values to add to the set.
   * @returns {Object} Returns the new set.
   */
  var createSet = !(_Set && (1 / _setToArray(new _Set([,-0]))[1]) == INFINITY) ? noop_1 : function(values) {
    return new _Set(values);
  };

  var _createSet = createSet;

  /** Used as the size to enable large array optimizations. */
  var LARGE_ARRAY_SIZE$1 = 200;

  /**
   * The base implementation of `_.uniqBy` without support for iteratee shorthands.
   *
   * @private
   * @param {Array} array The array to inspect.
   * @param {Function} [iteratee] The iteratee invoked per element.
   * @param {Function} [comparator] The comparator invoked per element.
   * @returns {Array} Returns the new duplicate free array.
   */
  function baseUniq(array, iteratee, comparator) {
    var index = -1,
        includes = _arrayIncludes,
        length = array.length,
        isCommon = true,
        result = [],
        seen = result;

    if (comparator) {
      isCommon = false;
      includes = _arrayIncludesWith;
    }
    else if (length >= LARGE_ARRAY_SIZE$1) {
      var set = iteratee ? null : _createSet(array);
      if (set) {
        return _setToArray(set);
      }
      isCommon = false;
      includes = _cacheHas;
      seen = new _SetCache;
    }
    else {
      seen = iteratee ? [] : result;
    }
    outer:
    while (++index < length) {
      var value = array[index],
          computed = iteratee ? iteratee(value) : value;

      value = (comparator || value !== 0) ? value : 0;
      if (isCommon && computed === computed) {
        var seenIndex = seen.length;
        while (seenIndex--) {
          if (seen[seenIndex] === computed) {
            continue outer;
          }
        }
        if (iteratee) {
          seen.push(computed);
        }
        result.push(value);
      }
      else if (!includes(seen, computed, comparator)) {
        if (seen !== result) {
          seen.push(computed);
        }
        result.push(value);
      }
    }
    return result;
  }

  var _baseUniq = baseUniq;

  /**
   * This method is like `_.uniq` except that it accepts `iteratee` which is
   * invoked for each element in `array` to generate the criterion by which
   * uniqueness is computed. The order of result values is determined by the
   * order they occur in the array. The iteratee is invoked with one argument:
   * (value).
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Array
   * @param {Array} array The array to inspect.
   * @param {Function} [iteratee=_.identity] The iteratee invoked per element.
   * @returns {Array} Returns the new duplicate free array.
   * @example
   *
   * _.uniqBy([2.1, 1.2, 2.3], Math.floor);
   * // => [2.1, 1.2]
   *
   * // The `_.property` iteratee shorthand.
   * _.uniqBy([{ 'x': 1 }, { 'x': 2 }, { 'x': 1 }], 'x');
   * // => [{ 'x': 1 }, { 'x': 2 }]
   */
  function uniqBy(array, iteratee) {
    return (array && array.length) ? _baseUniq(array, _baseIteratee(iteratee)) : [];
  }

  var uniqBy_1 = uniqBy;

  /**
   * Casts `array` to a slice if it's needed.
   *
   * @private
   * @param {Array} array The array to inspect.
   * @param {number} start The start position.
   * @param {number} [end=array.length] The end position.
   * @returns {Array} Returns the cast slice.
   */
  function castSlice(array, start, end) {
    var length = array.length;
    end = end === undefined ? length : end;
    return (!start && end >= length) ? array : _baseSlice(array, start, end);
  }

  var _castSlice = castSlice;

  /**
   * Used by `_.trim` and `_.trimEnd` to get the index of the last string symbol
   * that is not found in the character symbols.
   *
   * @private
   * @param {Array} strSymbols The string symbols to inspect.
   * @param {Array} chrSymbols The character symbols to find.
   * @returns {number} Returns the index of the last unmatched string symbol.
   */
  function charsEndIndex(strSymbols, chrSymbols) {
    var index = strSymbols.length;

    while (index-- && _baseIndexOf(chrSymbols, strSymbols[index], 0) > -1) {}
    return index;
  }

  var _charsEndIndex = charsEndIndex;

  /**
   * Used by `_.trim` and `_.trimStart` to get the index of the first string symbol
   * that is not found in the character symbols.
   *
   * @private
   * @param {Array} strSymbols The string symbols to inspect.
   * @param {Array} chrSymbols The character symbols to find.
   * @returns {number} Returns the index of the first unmatched string symbol.
   */
  function charsStartIndex(strSymbols, chrSymbols) {
    var index = -1,
        length = strSymbols.length;

    while (++index < length && _baseIndexOf(chrSymbols, strSymbols[index], 0) > -1) {}
    return index;
  }

  var _charsStartIndex = charsStartIndex;

  /**
   * Converts an ASCII `string` to an array.
   *
   * @private
   * @param {string} string The string to convert.
   * @returns {Array} Returns the converted array.
   */
  function asciiToArray(string) {
    return string.split('');
  }

  var _asciiToArray = asciiToArray;

  /** Used to compose unicode character classes. */
  var rsAstralRange$1 = '\\ud800-\\udfff',
      rsComboMarksRange$1 = '\\u0300-\\u036f',
      reComboHalfMarksRange$1 = '\\ufe20-\\ufe2f',
      rsComboSymbolsRange$1 = '\\u20d0-\\u20ff',
      rsComboRange$1 = rsComboMarksRange$1 + reComboHalfMarksRange$1 + rsComboSymbolsRange$1,
      rsVarRange$1 = '\\ufe0e\\ufe0f';

  /** Used to compose unicode capture groups. */
  var rsZWJ$1 = '\\u200d';

  /** Used to detect strings with [zero-width joiners or code points from the astral planes](http://eev.ee/blog/2015/09/12/dark-corners-of-unicode/). */
  var reHasUnicode = RegExp('[' + rsZWJ$1 + rsAstralRange$1  + rsComboRange$1 + rsVarRange$1 + ']');

  /**
   * Checks if `string` contains Unicode symbols.
   *
   * @private
   * @param {string} string The string to inspect.
   * @returns {boolean} Returns `true` if a symbol is found, else `false`.
   */
  function hasUnicode(string) {
    return reHasUnicode.test(string);
  }

  var _hasUnicode = hasUnicode;

  /** Used to compose unicode character classes. */
  var rsAstralRange = '\\ud800-\\udfff',
      rsComboMarksRange = '\\u0300-\\u036f',
      reComboHalfMarksRange = '\\ufe20-\\ufe2f',
      rsComboSymbolsRange = '\\u20d0-\\u20ff',
      rsComboRange = rsComboMarksRange + reComboHalfMarksRange + rsComboSymbolsRange,
      rsVarRange = '\\ufe0e\\ufe0f';

  /** Used to compose unicode capture groups. */
  var rsAstral = '[' + rsAstralRange + ']',
      rsCombo = '[' + rsComboRange + ']',
      rsFitz = '\\ud83c[\\udffb-\\udfff]',
      rsModifier = '(?:' + rsCombo + '|' + rsFitz + ')',
      rsNonAstral = '[^' + rsAstralRange + ']',
      rsRegional = '(?:\\ud83c[\\udde6-\\uddff]){2}',
      rsSurrPair = '[\\ud800-\\udbff][\\udc00-\\udfff]',
      rsZWJ = '\\u200d';

  /** Used to compose unicode regexes. */
  var reOptMod = rsModifier + '?',
      rsOptVar = '[' + rsVarRange + ']?',
      rsOptJoin = '(?:' + rsZWJ + '(?:' + [rsNonAstral, rsRegional, rsSurrPair].join('|') + ')' + rsOptVar + reOptMod + ')*',
      rsSeq = rsOptVar + reOptMod + rsOptJoin,
      rsSymbol = '(?:' + [rsNonAstral + rsCombo + '?', rsCombo, rsRegional, rsSurrPair, rsAstral].join('|') + ')';

  /** Used to match [string symbols](https://mathiasbynens.be/notes/javascript-unicode). */
  var reUnicode = RegExp(rsFitz + '(?=' + rsFitz + ')|' + rsSymbol + rsSeq, 'g');

  /**
   * Converts a Unicode `string` to an array.
   *
   * @private
   * @param {string} string The string to convert.
   * @returns {Array} Returns the converted array.
   */
  function unicodeToArray(string) {
    return string.match(reUnicode) || [];
  }

  var _unicodeToArray = unicodeToArray;

  /**
   * Converts `string` to an array.
   *
   * @private
   * @param {string} string The string to convert.
   * @returns {Array} Returns the converted array.
   */
  function stringToArray(string) {
    return _hasUnicode(string)
      ? _unicodeToArray(string)
      : _asciiToArray(string);
  }

  var _stringToArray = stringToArray;

  /**
   * Removes leading and trailing whitespace or specified characters from `string`.
   *
   * @static
   * @memberOf _
   * @since 3.0.0
   * @category String
   * @param {string} [string=''] The string to trim.
   * @param {string} [chars=whitespace] The characters to trim.
   * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
   * @returns {string} Returns the trimmed string.
   * @example
   *
   * _.trim('  abc  ');
   * // => 'abc'
   *
   * _.trim('-_-abc-_-', '_-');
   * // => 'abc'
   *
   * _.map(['  foo  ', '  bar  '], _.trim);
   * // => ['foo', 'bar']
   */
  function trim(string, chars, guard) {
    string = toString_1(string);
    if (string && (guard || chars === undefined)) {
      return _baseTrim(string);
    }
    if (!string || !(chars = _baseToString(chars))) {
      return string;
    }
    var strSymbols = _stringToArray(string),
        chrSymbols = _stringToArray(chars),
        start = _charsStartIndex(strSymbols, chrSymbols),
        end = _charsEndIndex(strSymbols, chrSymbols) + 1;

    return _castSlice(strSymbols, start, end).join('');
  }

  var trim_1 = trim;

  var __defProp$5 = Object.defineProperty;
  var __getOwnPropSymbols$6 = Object.getOwnPropertySymbols;
  var __hasOwnProp$6 = Object.prototype.hasOwnProperty;
  var __propIsEnum$6 = Object.prototype.propertyIsEnumerable;
  var __defNormalProp$5 = (obj, key, value) => key in obj ? __defProp$5(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __spreadValues$5 = (a, b) => {
    for (var prop in b || (b = {}))
      if (__hasOwnProp$6.call(b, prop))
        __defNormalProp$5(a, prop, b[prop]);
    if (__getOwnPropSymbols$6)
      for (var prop of __getOwnPropSymbols$6(b)) {
        if (__propIsEnum$6.call(b, prop))
          __defNormalProp$5(a, prop, b[prop]);
      }
    return a;
  };
  var __async$d = (__this, __arguments, generator) => {
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
  var arrayServices = {
    add({ object, value }) {
      if (u__namespace.isArr(object)) {
        if (value) {
          var cloned = cloneDeep_1(value);
          object.push(cloned);
        }
        return;
      }
      return;
    },
    addByIndex({
      object,
      value,
      index
    }) {
      if (u__namespace.isArr(object)) {
        if (value) {
          var cloned = cloneDeep_1(value);
          if (object[parseInt(index)] == null || Object.keys(object[parseInt(index)]).length === 0 && object[parseInt(index)].constructor === Object) {
            let item_1 = new Array();
            item_1.push(cloned);
            object[parseInt(index)] = item_1;
          } else {
            let item_2 = object[parseInt(index)];
            item_2.push(cloned);
            object[parseInt(index)] = item_2;
          }
        }
        return;
      }
      return;
    },
    SortBy({
      object,
      iterate,
      orders
    }) {
      if (u__namespace.isArr(object)) {
        return orderBy_1(object, iterate, orders);
      }
      return "object is not array";
    },
    clear({ object }) {
      if (u__namespace.isArr(object)) {
        object.length = 0;
      }
      return;
    },
    removeByKey({ object, key }) {
      if (u__namespace.isArr(object)) {
        for (let i = 0; i < object.length; i++) {
          if (object[i].key === key) {
            object.splice(i, 1);
            return;
          } else {
            if (store.env === "test") {
              console.log("false", "color: red");
            }
          }
        }
      }
      return;
    },
    removeByName({
      object,
      key,
      name
    }) {
      if (u__namespace.isArr(object)) {
        for (let i = 0; i < object.length; i++) {
          if (object[i][key] == name || object[i][key] == "") {
            object.splice(i, 1);
            return;
          } else {
            if (store.env === "test") {
              console.log("false", "color: red");
            }
          }
        }
      }
      return;
    },
    removeByValue({
      object,
      value
    }) {
      if (u__namespace.isArr(object)) {
        for (let i = 0; i < object.length; i++) {
          if (object[i] == value) {
            object.splice(i, 1);
            return;
          }
        }
      }
      return;
    },
    removeObjectByValue({
      object,
      values,
      value
    }) {
      if (u__namespace.isArr(object)) {
        for (let i = 0; i < object.length; i++) {
          if (get_1(object[i], values) == value) {
            object.splice(i, 1);
            return;
          }
        }
      }
      return;
    },
    removeById({ object, id }) {
      if (u__namespace.isArr(object)) {
        for (let i = 0; i < object.length; i++) {
          if (object[i].id == id) {
            object.splice(i, 1);
            return;
          }
        }
      }
      return;
    },
    removeByIndex({ object, index }) {
      if (u__namespace.isArr(object)) {
        object.splice(index, 1);
        return;
      }
      return;
    },
    removeWeekByIndexs({
      object1,
      object2,
      index,
      duration
    }) {
      if (u__namespace.isArr(object1) && u__namespace.isArr(object2)) {
        for (let i = 0; i < object1.length; i++) {
          if (object1[i].index === index && object1[i].duration === duration) {
            object1.splice(i, 1);
          } else {
            if (store.env === "test") {
              console.log("false", "color: red");
            }
          }
        }
        for (let i = 0; i < object2[index].length; i++) {
          if (object2[index][i] === duration) {
            object2[index].splice(i, 1);
          } else {
            if (store.env === "test") {
              console.log("false", "color: red");
            }
          }
        }
        return;
      }
      return;
    },
    append({ newMessage, messages }) {
      if (u__namespace.isArr(messages)) {
        if (newMessage) {
          var cloned = cloneDeep_1(newMessage);
          messages.push(cloned);
        }
      }
      return;
    },
    appendUnique({
      newMessage,
      messages,
      uniqueKey,
      currentBackgroundColor,
      backgroundColor,
      fontColor,
      currentFontColor
    }) {
      if (newMessage && uniqueKey) {
        let flag = false;
        messages.forEach((message) => {
          if (message[uniqueKey] == newMessage[uniqueKey]) {
            flag = true;
          }
        });
        if (!flag) {
          var cloned = cloneDeep_1(newMessage);
          messages.push(cloned);
        }
        for (let j = 0; j < messages.length / 2; j++) {
          let tmp = messages[j];
          messages[j] = messages[messages.length - j - 1];
          messages[messages.length - j - 1] = tmp;
        }
        for (let i = 0; i < messages.length; i++) {
          if (i == 0) {
            messages[i]["backgroundColor"] = currentBackgroundColor;
            messages[i]["fontColor"] = currentFontColor;
          } else {
            messages[i]["backgroundColor"] = backgroundColor;
            messages[i]["fontColor"] = fontColor;
          }
        }
      }
    },
    addColor({
      messages,
      id,
      currentBackgroundColor,
      backgroundColor,
      fontColor,
      currentFontColor
    }) {
      if (u__namespace.isArr(messages)) {
        for (let i = 0; i < messages.length; i++) {
          if (messages[i]["id"] == id) {
            messages[i]["backgroundColor"] = currentBackgroundColor;
            messages[i]["fontColor"] = currentFontColor;
          } else {
            messages[i]["backgroundColor"] = backgroundColor;
            messages[i]["fontColor"] = fontColor;
          }
        }
      }
      return;
    },
    has({ object, value }) {
      if (u__namespace.isArr(object)) {
        for (let i = 0; i < object.length; i++) {
          if (object[i] === value) {
            return true;
          }
        }
      }
      return false;
    },
    judgeListLength({ array, len }) {
      if (u__namespace.isArr(array)) {
        if (array.length === len) {
          return true;
        } else {
          return false;
        }
      }
      return false;
    },
    hasKey({ object, key }) {
      if (u__namespace.isArr(object)) {
        for (let i = 0; i < object.length; i++) {
          if (object[i].key === key || object[i][key]) {
            return true;
          }
        }
      }
      return false;
    },
    AddWeek({
      object,
      duration,
      location,
      index,
      key
    }) {
      if (typeof index == void 0) {
        console.log("index is undefined");
        return;
      }
      if (typeof key == void 0) {
        console.log("key is undefined");
        return;
      }
      if (typeof duration == void 0) {
        console.log("duration is undefined");
        return;
      }
      var arr = { duration, location, index, key };
      object[object.length] = arr;
      return;
    },
    push({ newMessage, messages }) {
      if (u__namespace.isArr(messages)) {
        if (newMessage) {
          var cloned = cloneDeep_1(newMessage);
          messages.unshift(cloned);
          return messages;
        }
        return messages;
      }
      return;
    },
    pushAny({ newMessage, messages }) {
      if (u__namespace.isArr(messages)) {
        if (newMessage) {
          let cloned = cloneDeep_1(newMessage);
          let messagesClone = cloneDeep_1(messages);
          messagesClone.push(cloned);
          return messagesClone;
        }
        return messages;
      }
      return [];
    },
    covertToJsonArray({ array }) {
      let dataObject = [];
      if (u__namespace.isArr(array)) {
        for (let i = 0; i < array.length; i++) {
          dataObject.push({ key: array[i] });
        }
        console.dir(dataObject);
        return dataObject;
      }
      return `${array}is not an array`;
    },
    getListLength({ object }) {
      if (u__namespace.isArr(object)) {
        return object.length.toString();
      }
      return "0";
    },
    copyByKey({
      array1,
      array2,
      key
    }) {
      if (u__namespace.isArr(array1) && u__namespace.isArr(array2)) {
        for (let i = 0; i < array1.length; i++) {
          if (array1[i].key === key) {
            array2.push(array1[i]);
            return array2;
          }
        }
      }
      return array2;
    },
    changeColorByKey({
      array,
      key,
      value
    }) {
      if (u__namespace.isArr(array)) {
        if (key) {
          for (let i = 0; i < array.length; i++) {
            if (array[i].key === key) {
              array[i].color = value;
              return;
            }
          }
        }
        return;
      }
      return;
    },
    convertToList({
      array,
      key
    }) {
      let array1 = [];
      if (u__namespace.isArr(array)) {
        if (key) {
          for (let i = 0; i < array.length; i++) {
            array1.push(array[i][key]);
          }
          return array1;
        }
        return;
      }
      return;
    },
    getByKey({
      array,
      key1,
      value,
      key2
    }) {
      const _array = cloneDeep_1(array);
      if (u__namespace.isArr(_array)) {
        for (let i = 0; i < _array.length; i++) {
          if (_array[i][key1] === value) {
            return _array[i][key2];
          }
        }
        return;
      }
      return;
    },
    getIndex({ array, key }) {
      if (u__namespace.isArr(array)) {
        return array.indexOf(key);
      }
      return;
    },
    getListByKey({
      array,
      keyId
    }) {
      let resultArr = [];
      if (u__namespace.isArr(array)) {
        for (let i = 0; i < array.length; i++) {
          resultArr.push(array[i][keyId]);
        }
        return resultArr;
      }
      return;
    },
    getConnection({ array1, array2 }) {
      let arrayItem;
      let array = [];
      let favorite1;
      if (typeof array1 == "string" || typeof array2 == "string") {
        if (u__namespace.isArr(array1)) {
          array1.forEach((arr) => {
            if (arr["subtype"] == 5 || arr["subtype"] == 4)
              favorite1 = true;
            else
              favorite1 = false;
            arrayItem = {
              name: arr["name"]["inviterName"],
              category: arr["name"]["inviterCategory"],
              userId: arr["evid"],
              phone: arr["name"]["inviterPhoneNumber"],
              favorite: favorite1,
              connectId: arr["id"],
              status: arr["name"]["status"]
            };
            array.push(arrayItem);
          });
          return array;
        } else if (u__namespace.isArr(array2)) {
          array2.forEach((arr) => {
            if (arr["subtype"] == 5 || arr["subtype"] == 3)
              favorite1 = true;
            else
              favorite1 = false;
            arrayItem = {
              name: arr["name"]["inviteeName"],
              category: arr["name"]["inviteeCategory"],
              userId: arr["bvid"],
              phone: arr["name"]["inviteePhoneNumber"],
              favorite: favorite1,
              connectId: arr["id"],
              status: arr["name"]["status"]
            };
            array.push(arrayItem);
          });
          return array;
        } else {
          return [];
        }
      } else {
        array1.forEach((arr) => {
          if (arr["subtype"] == 5 || arr["subtype"] == 4)
            favorite1 = true;
          else
            favorite1 = false;
          arrayItem = {
            name: arr["name"]["inviterName"],
            category: arr["name"]["inviterCategory"],
            userId: arr["evid"],
            phone: arr["name"]["inviterPhoneNumber"],
            favorite: favorite1,
            connectId: arr["id"],
            status: arr["name"]["status"]
          };
          array.push(arrayItem);
        });
        array2.forEach((arr) => {
          if (arr["subtype"] == 5 || arr["subtype"] == 3)
            favorite1 = true;
          else
            favorite1 = false;
          arrayItem = {
            name: arr["name"]["inviteeName"],
            category: arr["name"]["inviteeCategory"],
            userId: arr["bvid"],
            phone: arr["name"]["inviteePhoneNumber"],
            favorite: favorite1,
            connectId: arr["id"],
            status: arr["name"]["status"]
          };
          array.push(arrayItem);
        });
        return array;
      }
    },
    getFavorites({ object }) {
      let result = [];
      if (u__namespace.isArr(object)) {
        object.forEach((arr) => {
          if (arr["favorite"] == true) {
            result.push(arr);
          }
        });
      }
      return result;
    },
    getFirstItem({ array }) {
      if (u__namespace.isArr(array)) {
        return array[0];
      }
    },
    concatArray({
      array1,
      array2,
      sortby,
      orders
    }) {
      if (u__namespace.isArr(array1) && u__namespace.isArr(array2)) {
        if (sortby) {
          let arr = array1.concat(array2);
          if (orders) {
            return orderBy_1(arr, sortby, orders);
          } else {
            return orderBy_1(arr, sortby, "desc");
          }
        }
        return array1.concat(array2);
      }
      if (u__namespace.isArr(array1) && !u__namespace.isArr(array2))
        return array1;
      if (u__namespace.isArr(array2) && !u__namespace.isArr(array1))
        return array2;
      return [];
    },
    isExist({
      array,
      phoneNumber
    }) {
      let flag = 0;
      if (u__namespace.isArr(array)) {
        array.forEach((arr) => {
          var _a, _b;
          if (phoneNumber === ((_b = (_a = arr["name"]) == null ? void 0 : _a["data"]) == null ? void 0 : _b["phone"])) {
            flag = 1;
            return;
          }
        });
        if (flag === 1)
          return true;
        else
          return false;
      }
      return false;
    },
    createBySubtype(_0) {
      return __async$d(this, arguments, function* ({
        subtypelist,
        createModel
      }) {
        console.log("test createBySubtype", {
          subtypelist,
          createModel
        });
        if (u__namespace.isArr(subtypelist)) {
          subtypelist.forEach((element) => __async$d(this, null, function* () {
            createModel["subtype"] = element;
            try {
              if (store.env === "test") {
                console.log("%cCreate Edge Request", "background: purple; color: white; display: block;", __spreadValues$5({}, createModel));
              }
              const { data } = yield store.level2SDK.edgeServices.createEdge(__spreadValues$5({}, createModel));
              if (store.env === "test") {
                console.log("%cCreate Edge Response", "background: purple; color: white; display: block;", data);
              }
            } catch (error) {
              throw error;
            }
          }));
        }
      });
    },
    WeekSchedule({ planObject }) {
      if (store._env == "test") {
        console.log("test WeekSchedule", planObject);
      }
      if (planObject == null || typeof planObject == void 0 || planObject.length == 0) {
        return;
      }
      if (u__namespace.isArr(planObject)) {
        let res = [];
        let len = 0;
        let weeks = [
          "Sunday",
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday"
        ];
        for (let i = 0; i < 7; i++) {
          if (Object.keys(planObject[i]).length == 0) {
            res.push({
              info: "not settings",
              weekDay: weeks[i]
            });
          } else {
            len = planObject[i].length;
            let info = "";
            for (let j = 0; j < len; j++) {
              info = info + " " + planObject[i][j];
            }
            res.push({
              info,
              weekDay: weeks[i]
            });
          }
        }
        return res;
      }
      return;
    },
    concat({ array1, array2 }) {
      if (u__namespace.isArr(array1) && u__namespace.isArr(array2)) {
        return array1.concat(array2);
      }
      return;
    },
    getIdByUserName({
      array,
      userName
    }) {
      let id = "";
      if (u__namespace.isArr(array)) {
        array.forEach((arr) => {
          var _a, _b;
          if (((_b = (_a = arr == null ? void 0 : arr["name"]) == null ? void 0 : _a["data"]) == null ? void 0 : _b["fullName"]) === userName) {
            id = arr["bsig"];
            return;
          }
        });
        return id;
      }
      return;
    },
    removeByArray({
      parentObject,
      subObject,
      key
    }) {
      if (u__namespace.isArr(parentObject) && u__namespace.isArr(subObject)) {
        for (let i = 0; i < parentObject.length; i++) {
          for (let j = 0; j < subObject.length; j++) {
            if (parentObject[i][key] == subObject[j][key]) {
              console.log("test", subObject[j][key]);
              parentObject.splice(i, 1);
            }
          }
        }
        return parentObject;
      }
      return;
    },
    toggleStatus({
      object,
      key,
      flag
    }) {
      if (u__namespace.isArr(object)) {
        object.forEach((obj) => {
          if (obj.hasOwnProperty(key)) {
            obj[key] = flag;
          }
        });
      }
    },
    getPage({
      array,
      pageCount,
      currentPage
    }) {
      let pageList = [];
      if (u__namespace.isArr(array) && array) {
        let pageSum = Math.ceil(array.length / pageCount);
        for (let i = 1; i <= pageSum; i++) {
          let currentPage2 = (i - 1) * pageCount;
          let pageListItem = [];
          for (let j = currentPage2; j < currentPage2 + pageCount; j++) {
            if (array[j] === void 0)
              break;
            pageListItem.push(array[j]);
          }
          pageList.push(pageListItem);
        }
      }
      return pageList[currentPage - 1];
    },
    getPageIndex({
      array,
      pageCount,
      currentPage,
      select
    }) {
      let indexList = Array.from(new Array(Math.ceil(array.length / pageCount) + 1).keys()).slice(1);
      let index = chunk_1(indexList, pageCount);
      let indexGroup = [];
      index[currentPage - 1].forEach((arr) => {
        let indexItem = {
          key: 0,
          fontColor: "0x000000",
          backgroundColor: "0xFFFFFF"
        };
        if (select === arr) {
          indexItem.fontColor = "0xFFFFFF";
          indexItem.backgroundColor = "#003d68";
        }
        indexItem.key = arr;
        indexGroup.push(indexItem);
      });
      return indexGroup;
    },
    elementUnique({ arr }) {
      return Array.from(new Set(arr));
    },
    addProvider({ object, provider }) {
      provider["name"]["basicInfo"] = { medicalFacilityName: "Me" };
      provider["isSelected"] = true;
      let cloned = cloneDeep_1(provider);
      object.push(cloned);
      return;
    },
    handleData({
      Object: Object2,
      timeLimit = 10,
      timeSpan = "day",
      increaseColor = "0x3DD598",
      decreaseColor = "0xF0142F"
    }) {
      if (u__namespace.isArr(Object2)) {
        let time = 24 * 60 * 60 * 1e3;
        if (timeSpan == "day") {
          time = 1 * time;
        } else if (timeSpan == "week") {
          time = 7 * time;
        } else if (timeSpan == "month") {
          time = 30 * time;
        }
        let data_x = [];
        let data_y = [];
        const months = [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sept",
          "Oct",
          "Nov",
          "Dec"
        ];
        let date = new Date();
        for (let i = 0; i < timeLimit; i++) {
          let ctime, etime, name;
          if (timeSpan == "day") {
            ctime = new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime();
            etime = ctime + 24 * 60 * 60 * 1e3;
            name = new Date(ctime).getFullYear() + "-" + new Date(ctime).getMonth() + "-" + new Date(ctime).getDate();
          } else if (timeSpan == "week") {
            let d = new Date(date.getTime() - date.getDay() * 24 * 60 * 60 * 1e3);
            ctime = new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime();
            etime = ctime + 7 * 24 * 60 * 60 * 1e3;
            name = new Date(ctime).getFullYear() + "-" + new Date(ctime).getMonth() + "-" + date.getDate();
          } else if (timeSpan == "month") {
            let d = new Date(date.getTime() - (date.getDate() - 1) * 24 * 60 * 60 * 1e3);
            ctime = new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime();
            let d2 = new Date(d.getFullYear(), d.getMonth(), 0);
            let currentdays = d2.getDate();
            etime = ctime + currentdays * 24 * 60 * 60 * 1e3;
            name = new Date(ctime).getFullYear() + "-" + months[new Date(ctime).getMonth()];
          }
          let count = 0;
          Object2.forEach((obj) => {
            if (obj.ctime * 1e3 > ctime && obj.ctime * 1e3 < etime) {
              count = count + 1;
            }
          });
          data_x.push(name);
          data_y.push(count);
          date = new Date(date.getTime() - time);
        }
        let currentNum = data_y[0];
        let currentRadio;
        if (data_y[1] != 0) {
          currentRadio = (data_y[0] / data_y[1] - 1) * 100;
        } else {
          currentRadio = 0;
        }
        let color, radioString;
        if (currentRadio >= 0) {
          radioString = currentRadio.toFixed(2) + "% \u2191";
          color = increaseColor;
        } else {
          radioString = (-currentRadio).toFixed(2) + "% \u2193";
          color = decreaseColor;
        }
        console.log({
          currentNum,
          currentRadio: currentRadio.toFixed(2),
          radioString,
          color
        });
        return {
          currentNum,
          currentRadio: currentRadio.toFixed(2),
          radioString,
          color,
          data_x,
          data_y
        };
      }
      return;
    },
    transformNull({ dayObject }) {
      if (u__namespace.isArr(dayObject)) {
        for (let i = 0; i < dayObject.length; i++) {
          if (Object.keys(dayObject[i]).length == 0) {
            dayObject[i] = null;
          }
        }
      }
    },
    isEmpty({ array }) {
      let it = 0;
      array.forEach((element) => {
        if (typeof element == void 0 || element == null || element.length == 0) {
          it++;
        }
      });
      if (it >= 7)
        return true;
      else
        return false;
    },
    selectOneToArr({ arr, key }) {
      let arr1 = new Array();
      for (let i = 0; i < arr.length; i++)
        arr1.push(arr[i][key]);
      return arr1;
    },
    matchInArray({
      arr,
      value,
      key,
      key1
    }) {
      for (let i = 0; i < arr.length; i++) {
        if (arr[i][key] == value)
          return arr[i][key1];
      }
    },
    vuetify({ arrfy }) {
      if (arrfy.indexOf("[") != -1 && arrfy.indexOf("]") != -1) {
        let arrfyLast = arrfy.substr(1, arrfy.length - 2).split(",").map(Number);
        return arrfyLast;
      }
      return false;
    },
    toString({ arr }) {
      return arr.toString();
    },
    getKeyByArray({ array, path }) {
      if (u__namespace.isArr(array) && path) {
        let items = path.split(".");
        let res = [];
        array.forEach((element) => {
          let key = element;
          items.forEach((item) => {
            key = key[item];
          });
          res.push(key);
        });
        return res;
      }
      return;
    },
    SelectKeyByArray({
      array,
      matchPath,
      selectpath,
      value
    }) {
      if (u__namespace.isArr(array) && matchPath && selectpath && value) {
        let matchItems = matchPath.split(".");
        let selectItems = selectpath.split(".");
        array.forEach((element) => {
          let matchKey = element;
          matchItems.forEach((item) => {
            matchKey = matchKey[item];
          });
          if (matchKey == value) {
            let selectKey = element;
            selectItems.forEach((item) => {
              selectKey = matchKey[item];
            });
            return selectKey;
          }
          return;
        });
      }
      return;
    },
    addSelect({ array }) {
      let _array = cloneDeep_1(array);
      _array.unshift("please select");
      return _array;
    },
    getObjectByArray({
      array,
      key,
      value
    }) {
      for (let i = 0; i < array.length; i++) {
        if (array[i][key] == value)
          return array[i];
      }
    },
    checkElememtExist({
      objArr,
      values
    }) {
      let bool = [];
      objArr.forEach((obj) => {
        let arrLast = [];
        (function deepObj(obj2) {
          for (let items in obj2) {
            typeof obj2[items] === "number" || typeof obj2[items] === "string" ? arrLast.push(obj2[items]) : deepObj(obj2[items]);
          }
        })(obj);
        bool.push(arrLast.includes(values) ? true : false);
      });
      return bool.includes(true) ? true : false;
    },
    splitTableList({
      arrObj,
      numX,
      numY
    }) {
      let len = chunk_1(arrObj, numX).length;
      if (len === 0) {
        return [[], len];
      } else {
        let arr = chunk_1(arrObj, numX)[numY - 1], arrT = [];
        arrT.push(arr, len);
        return arrT;
      }
    },
    isArrayEmpty({ array }) {
      if (array.length === 0) {
        return true;
      }
      return false;
    },
    transformPage({
      array,
      type,
      dataKey
    }) {
      let mapping = {
        "New Patient Forms": "NewPatForm",
        "COVID-19 Testing Consent - New Patient": "Cov19TestNewPat",
        "COVID-19 Testing Consent Form": "Cov19TestForm",
        "Pifzer-BioNTech Vaccine - First Dose": "PifzerVaccineFirDose",
        "Pifzer-BioNTech Vaccine - Second Dose": "PifzerVaccineSecDose",
        "Moderna Vaccine Form - First Dose": "ModernaVaccineFirDose",
        "Moderna Vaccine Form - Second Dose": "ModernaVaccineSecDose",
        "Flu Vaccination Consent form 2020-2021(English)": "FluVaccinationConsentFormEnglish",
        "Surgery Authorization": "SurgeryAuthorization"
      };
      let title;
      let space;
      if (u__namespace.isArr(array)) {
        array.forEach((obj) => {
          title = get_1(obj, dataKey);
          if (title) {
            title = title.trim();
            space = title.split(" ");
            if (space.length != 1) {
              obj.pageName = `${mapping[title] + "" + type + "Page1"}`;
            } else {
              obj.pageName = `${title + "" + type + "Page1"}`;
            }
          }
        });
        return array;
      }
      return [];
    },
    transformArray({ array }) {
      let res = [];
      if (u__namespace.isArr(array)) {
        array.forEach((arr) => {
          res.push({
            key: arr
          });
        });
        return res;
      }
      return [];
    },
    ComparisonSettingProperties({
      objArrOne,
      strOnePath,
      objArrTwo,
      strTwoPath,
      strValue,
      newValue,
      status = "status"
    }) {
      objArrOne.forEach((eleOne) => {
        objArrTwo.forEach((eleTwo) => {
          if (get_1(eleOne, strOnePath) === get_1(eleTwo, strTwoPath)) {
            set_1(eleTwo, strValue, newValue ? newValue : get_1(eleOne, status));
          }
        });
      });
      return objArrTwo;
    },
    uniqueByObjectKey({ objArr, path }) {
      return uniqBy_1(objArr, path);
    },
    allComplete(stringArr) {
      let array1 = ["", "Select", "-- --"];
      let result = true;
      if (u__namespace.isArr(stringArr)) {
        result = array1.some((val) => {
          return stringArr.includes(val);
        });
      }
      return !result;
    },
    formatStringFill({
      strArr,
      sfill
    }) {
      let strTest = new RegExp(/^[^\S\n\r\t]+$/);
      let str = [];
      strArr.forEach((item) => {
        if (item && !strTest.test(item)) {
          str.push(trim_1(item));
        }
      });
      return str.join(sfill);
    },
    findSelectAtl({
      arrObject,
      value,
      keyAtl
    }) {
      return arrObject.some((element) => {
        return element[keyAtl] === value;
      });
    },
    filterByTag({
      sourceDoc,
      tagCategory,
      tagName
    }) {
      let result = [];
      if (tagName === "All") {
        return sourceDoc;
      }
      sourceDoc.forEach((itemDoc) => {
        if (itemDoc["name"] == void 0) {
          console.warn("array.filterByTag itemDoc.name is underfined");
          return;
        } else if (itemDoc["name"]["data"] == void 0) {
          console.warn("array.filterByTag itemDoc.name.data is underfined");
          return;
        } else if (itemDoc["name"]["data"][tagCategory] == void 0) {
          console.warn("array.filterByTag itemDoc.name.data.tag is underfined");
          return;
        } else if (itemDoc["name"]["data"][tagCategory]["name"] === tagName)
          result.push(itemDoc);
      });
      return result;
    },
    initMeetingStyle({ sourceEdgeList }) {
      let _sourceEdgeList = cloneDeep_1(sourceEdgeList);
      if (u__namespace.isArr(_sourceEdgeList)) {
        _sourceEdgeList.forEach((sourceEdge) => {
          if ((sourceEdge == null ? void 0 : sourceEdge.tage) || (sourceEdge == null ? void 0 : sourceEdge.tage) == 0) {
            const tage = sourceEdge == null ? void 0 : sourceEdge.tage.toString(2);
            if (store.env === "test") {
              console.error(`tage: ${tage}`);
            }
            const tageLength = tage.length;
            let finishedTag = 0;
            if (tage >= 2) {
              finishedTag = tage[tageLength - 2];
            } else {
              finishedTag = 0;
            }
            if (finishedTag == 1) {
              sourceEdge["name"]["statusStyle"] = {
                borderColor: "#dededf",
                boxShadow: "1px 1px 4px 1px #dededf"
              };
            } else {
              sourceEdge["name"]["statusStyle"] = {
                borderColor: "0xfc3a3a",
                boxShadow: "1px 1px 4px 1px #fc3a3a"
              };
            }
          }
        });
      }
      return _sourceEdgeList;
    },
    filterArrayByPath({
      objArr,
      path,
      compareStr
    }) {
      let arrCom = [];
      objArr == null ? void 0 : objArr.forEach((objItem) => {
        if (compareStr.includes(get_1(objItem, path))) {
          arrCom.push(objItem);
        }
      });
      return arrCom;
    },
    getValueByKey({
      array,
      key1,
      value,
      key2
    }) {
      const _array = cloneDeep_1(array);
      if (u__namespace.isArr(_array)) {
        for (let i = 0; i < _array.length; i++) {
          if (get_1(_array[i], key1) == value) {
            return get_1(_array[i], key2);
          }
        }
        return;
      }
      return;
    },
    checkType({ objArr, path }) {
      objArr.forEach((element) => {
        if (get_1(element, path) % 2 === 0) {
          set_1(element, path, get_1(element, path) + 1);
        }
      });
      return objArr;
    },
    addWeekDuration({
      objArr,
      index,
      strPath,
      key,
      location
    }) {
      if (objArr.length === 0) {
        objArr.push({ duration: [strPath], key, index });
        return objArr;
      }
      for (let i = 0; i < objArr.length; i++) {
        if (objArr[i]["index"] === index) {
          objArr[i]["duration"].push(strPath);
          objArr[i]["key"] = key;
          objArr[i]["location"] = location;
          objArr[i]["index"] = index;
          return objArr;
        }
      }
      objArr.push({ duration: [strPath], key, index });
      return objArr;
    },
    removeValueInDoubleList({ objArr, value, key, objArr1 }) {
      let k;
      for (let i = 0; i < objArr.length; i++) {
        for (let j = 0; j < objArr[i][key].length; j++) {
          if (objArr[i][key][j] == value) {
            objArr[i][key].splice(j, 1);
            k = objArr[i]["index"];
          }
        }
        if (objArr[i][key].length == "0") {
          objArr.splice(i, 1);
        }
      }
      if (objArr1[k].length) {
        for (let j = 0; j < objArr1[k].length; j++) {
          objArr1[k].splice(j, 1);
          if (!objArr1[k].length) {
            objArr1[k] = null;
          }
          return;
        }
      }
    },
    formaDuration({
      arr,
      indexParam,
      keyParam,
      strParam
    }) {
      let objArr = [];
      let strWeek = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
      ];
      if (arr.length) {
        arr.forEach((items, index) => {
          if (u__namespace.isArr(items)) {
            objArr[index] = {};
            set_1(objArr[index], strParam, items);
            set_1(objArr[index], indexParam, index);
            set_1(objArr[index], keyParam, strWeek[index]);
          }
        });
      }
      objArr = objArr.filter((n) => n);
      return objArr;
    },
    formatProfile({ objArr }) {
      objArr.forEach((items) => {
        let testObject = items["name"]["data"];
        if (!testObject["version"]) {
          testObject["basicInfo"] = {};
          testObject["contactInfo"] = {};
          testObject["basicInfo"]["avatar"] = testObject["avatar"];
          testObject["basicInfo"]["firstName"] = testObject["firstName"];
          testObject["basicInfo"]["middleName"] = testObject["middleName"];
          testObject["basicInfo"]["lastName"] = testObject["lastName"];
          testObject["basicInfo"]["dateOfBirth"] = testObject["dateOfBirth"] || testObject["birth"];
          testObject["basicInfo"]["gender"] = testObject["gender"];
          testObject["basicInfo"]["fullName"] = testObject["fullName"];
          testObject["basicInfo"]["phone"] = testObject["phone"];
          testObject["basicInfo"]["userName"] = testObject["userName"];
          testObject["contactInfo"]["email"] = testObject["email"];
          testObject["contactInfo"]["address"] = {};
          testObject["contactInfo"]["address"]["secondLine"] = testObject["Address"]["line2"];
          testObject["contactInfo"]["address"]["city"] = testObject["Address"]["city"];
          testObject["contactInfo"]["address"]["state"] = testObject["Address"]["state"];
          testObject["contactInfo"]["address"]["zip"] = testObject["Address"]["zip"];
          testObject["contactInfo"]["address"]["St"] = testObject["Address"]["St"];
        }
        testObject["basicInfo"]["fullName"] = !testObject["basicInfo"]["middleName"] ? testObject["basicInfo"]["firstName"] + " " + testObject["basicInfo"]["lastName"] : testObject["basicInfo"]["firstName"] + " " + testObject["basicInfo"]["middleName"] + testObject["basicInfo"]["lastName"];
      });
      return objArr;
    },
    setPropertyInterlacedChange({
      arrIn,
      arr,
      valueArr,
      errorArr
    }) {
      for (let index = 0; index < arrIn.length; index++) {
        for (let key in arr) {
          if (index % 2 === 0) {
            arrIn[index][arr[key]] = valueArr[key];
          } else {
            arrIn[index][arr[key]] = errorArr[key];
          }
        }
      }
      return arrIn;
    },
    setFormJumpPage({
      objArry,
      docFormObj
    }) {
      let objClone = JSON.parse(JSON.stringify(objArry));
      let JumpformList = objClone.map((item) => {
        if (item["name"]["data"]["classTag"]["name"] == "Admin") {
          docFormObj["Admin"].map((temp) => {
            let itemType = item["type"].toString().substr(0, item["type"].toString().length - 1);
            let tempType = temp["type"].toString().substr(0, temp["type"].toString().length - 1);
            if (itemType == tempType) {
              if ((item["type"] & 1) === 1) {
                item.pageName = temp["releaseJump"];
              } else {
                item.pageName = temp["privateJump"];
              }
            }
          });
        } else if (item["name"]["data"]["classTag"]["name"] == "Provider") {
          docFormObj["Provider"].map((temp) => {
            let itemType = item["type"].toString().substr(0, item["type"].toString().length - 1);
            let tempType = temp["type"].toString().substr(0, temp["type"].toString().length - 1);
            if (itemType == tempType) {
              if ((item["type"] & 1) === 1) {
                item.pageName = temp["releaseJump"];
              } else {
                item.pageName = temp["privateJump"];
              }
            }
          });
        } else {
          docFormObj["Patient"].map((temp) => {
            let itemType = item["type"].toString().substr(0, item["type"].toString().length - 1);
            let tempType = temp["type"].toString().substr(0, temp["type"].toString().length - 1);
            if (itemType == tempType) {
              if ((item["type"] & 1) === 1) {
                item.pageName = temp["releaseJump"];
              } else {
                item.pageName = temp["privateJump"];
              }
            }
          });
        }
        return item;
      });
      return JumpformList;
    },
    sortArray({
      arr
    }) {
      if (isArray_1(arr)) {
        return sortBy_1(arr);
      }
      return "arr is not array";
    },
    splitArrString({ arr, split = "," }) {
      let newArr = [];
      arr.forEach((items) => {
        let concat = items;
        let youStr = items.split(",");
        let [dayConcat, HourConcat] = [youStr[0], youStr[1]];
        let you = { dayConcat, HourConcat, concat };
        newArr.push(you);
      });
      return newArr;
    },
    keepLatestDoc({ docList, path }) {
      return uniqBy_1(docList, path);
    },
    setMeetingStatus({
      object,
      type = "subtype",
      tage = "tage"
    }) {
      if (object) {
        object.forEach((obj) => {
          if ((get_1(obj, tage) & 3840) >> 8 === 1) {
            obj["status"] = "Completed";
            obj["fontColor"] = "#999999";
            obj["textDeco"] = "none";
          } else {
            if ((get_1(obj, type) & 255) === 6 || (get_1(obj, type) & 255) === 100) {
              obj["status"] = "Approved";
              obj["fontColor"] = "#30b354";
              obj["textDeco"] = "none";
            } else if ((get_1(obj, type) & 255) === 11) {
              obj["status"] = "Canceled";
              obj["fontColor"] = "#e24445";
              obj["textDeco"] = "underline";
            }
          }
        });
      }
      return object;
    },
    judgeArr({ array, len }) {
      if (u__namespace.isArr(array)) {
        if (array.length <= len) {
          return true;
        } else {
          return false;
        }
      }
      return false;
    },
    ChangeAnItemInArray({ array, path, obj }) {
      if (u__namespace.isArr(array)) {
        array.forEach((item) => {
          if (item[path] === obj[path]) {
            for (var key in item) {
              item[key] = obj[key];
            }
            return;
          }
        });
      }
      return;
    }
  };

  /* Built-in method references for those with the same name as other `lodash` methods. */
  var nativeMax = Math.max,
      nativeMin = Math.min;

  /**
   * The base implementation of `_.inRange` which doesn't coerce arguments.
   *
   * @private
   * @param {number} number The number to check.
   * @param {number} start The start of the range.
   * @param {number} end The end of the range.
   * @returns {boolean} Returns `true` if `number` is in the range, else `false`.
   */
  function baseInRange(number, start, end) {
    return number >= nativeMin(start, end) && number < nativeMax(start, end);
  }

  var _baseInRange = baseInRange;

  /**
   * Checks if `n` is between `start` and up to, but not including, `end`. If
   * `end` is not specified, it's set to `start` with `start` then set to `0`.
   * If `start` is greater than `end` the params are swapped to support
   * negative ranges.
   *
   * @static
   * @memberOf _
   * @since 3.3.0
   * @category Number
   * @param {number} number The number to check.
   * @param {number} [start=0] The start of the range.
   * @param {number} end The end of the range.
   * @returns {boolean} Returns `true` if `number` is in the range, else `false`.
   * @see _.range, _.rangeRight
   * @example
   *
   * _.inRange(3, 2, 4);
   * // => true
   *
   * _.inRange(4, 8);
   * // => true
   *
   * _.inRange(4, 2);
   * // => false
   *
   * _.inRange(2, 2);
   * // => false
   *
   * _.inRange(1.2, 2);
   * // => true
   *
   * _.inRange(5.2, 4);
   * // => false
   *
   * _.inRange(-3, -2, -6);
   * // => true
   */
  function inRange(number, start, end) {
    start = toFinite_1(start);
    if (end === undefined) {
      end = start;
      start = 0;
    } else {
      end = toFinite_1(end);
    }
    number = toNumber_1(number);
    return _baseInRange(number, start, end);
  }

  var inRange_1 = inRange;

  var numberService = {
    inRange({
      number,
      start,
      end
    }) {
      if (number == start || number == end) {
        return true;
      }
      return inRange_1(number, start, end);
    },
    multiply({ number, multiple }) {
      if (number && multiple) {
        return number * multiple;
      }
      return 0;
    },
    OctToBin({ number }) {
      if (number) {
        return number.toString(2).toString();
      }
      return 0;
    },
    getAuthority({
      authSubtype,
      authList
    }) {
      let authDoc = {};
      if (authSubtype) {
        authSubtype.forEach((item) => {
          let authHex = parseInt(item.toString(16));
          let authType = parseInt((authHex / 1e4).toString());
          let authLevel = authHex % 10;
          let authName = "";
          let authBinary = authLevel.toString(2).split("");
          let resArray = authBinary.map((item2) => {
            return item2 === "1" ? true : false;
          });
          Object.keys(authList).forEach((key) => {
            if (authList[key] == authType) {
              authName = key;
            }
          });
          authDoc[authName] = {
            invite: resArray[0],
            edit: resArray[1],
            review: resArray[2]
          };
        });
      }
      return authDoc;
    },
    addition({ num, step }) {
      console.log("test addition", {
        num,
        step
      });
      num = parseInt(num);
      step = parseInt(step);
      return num + step;
    },
    Subtraction({ num, step }) {
      num = parseInt(num);
      step = parseInt(step);
      return num - step;
    },
    less({ num1, num2 }) {
      if (num1 < num2)
        return true;
      else
        return false;
    },
    inhx({
      intHex,
      index,
      hex
    }) {
      if (typeof intHex === "string")
        intHex = parseInt(intHex);
      if ((intHex >> index - 1 & 1) !== hex) {
        if (hex === 1) {
          intHex += Math.pow(2, index - 1);
        } else {
          intHex -= Math.pow(2, index - 1);
        }
        return intHex;
      } else {
        return intHex;
      }
    },
    hexAnd({ intOne, hexTwo }) {
      return intOne & hexTwo;
    },
    hexOr({ intOne, hexTwo }) {
      return intOne | hexTwo;
    },
    hx({
      docGroup,
      localArr,
      binaryArr
    }) {
      if (localArr.length === binaryArr.length) {
        let equals;
        let pushArr = [];
        for (let index = 0; index < docGroup.length; index++) {
          equals = 0;
          for (let j = 0; j < localArr.length; j++) {
            if ((docGroup[index].type >> localArr[j] - 1 & 1) === binaryArr[j]) {
              equals++;
            } else {
              break;
            }
          }
          if (equals === localArr.length) {
            pushArr.push(docGroup[index]);
          }
        }
        return pushArr;
      }
      return false;
    },
    typeIsValid({
      docType,
      localArr,
      binaryArr
    }) {
      if (localArr.length === binaryArr.length) {
        let equals;
        equals = 0;
        for (let j = 0; j < localArr.length; j++) {
          if ((docType >> localArr[j] - 1 & 1) === binaryArr[j]) {
            equals++;
          } else {
            break;
          }
        }
        return equals === binaryArr.length ? true : false;
      }
      return false;
    },
    formValid({ docData }) {
      for (const key in docData) {
        if (docData.hasOwnProperty(key)) {
          if (docData[key] === null || docData[key] === "") {
            return false;
          }
        }
      }
      return true;
    },
    transformSubtype({ subtype, addition }) {
      if (subtype && addition) {
        subtype = parseInt(subtype);
        let _subtype = subtype & 255;
        let newSubtype = subtype - _subtype + addition;
        return newSubtype;
      }
      return 0;
    },
    judgeNumber({ num }) {
      return /^[0-9]+.?[0-9]*$/.test(num) && /^\d+$/.test(num);
    }
  };

  /** `Object#toString` result references. */
  var regexpTag = '[object RegExp]';

  /**
   * The base implementation of `_.isRegExp` without Node.js optimizations.
   *
   * @private
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a regexp, else `false`.
   */
  function baseIsRegExp(value) {
    return isObjectLike_1(value) && _baseGetTag(value) == regexpTag;
  }

  var _baseIsRegExp = baseIsRegExp;

  /* Node.js helper references. */
  var nodeIsRegExp = _nodeUtil && _nodeUtil.isRegExp;

  /**
   * Checks if `value` is classified as a `RegExp` object.
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a regexp, else `false`.
   * @example
   *
   * _.isRegExp(/abc/);
   * // => true
   *
   * _.isRegExp('/abc/');
   * // => false
   */
  var isRegExp = nodeIsRegExp ? _baseUnary(nodeIsRegExp) : _baseIsRegExp;

  var isRegExp_1 = isRegExp;

  /** Used as references for the maximum length and index of an array. */
  var MAX_ARRAY_LENGTH = 4294967295;

  /**
   * Splits `string` by `separator`.
   *
   * **Note:** This method is based on
   * [`String#split`](https://mdn.io/String/split).
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category String
   * @param {string} [string=''] The string to split.
   * @param {RegExp|string} separator The separator pattern to split by.
   * @param {number} [limit] The length to truncate results to.
   * @returns {Array} Returns the string segments.
   * @example
   *
   * _.split('a-b-c', '-', 2);
   * // => ['a', 'b']
   */
  function split(string, separator, limit) {
    if (limit && typeof limit != 'number' && _isIterateeCall(string, separator, limit)) {
      separator = limit = undefined;
    }
    limit = limit === undefined ? MAX_ARRAY_LENGTH : limit >>> 0;
    if (!limit) {
      return [];
    }
    string = toString_1(string);
    if (string && (
          typeof separator == 'string' ||
          (separator != null && !isRegExp_1(separator))
        )) {
      separator = _baseToString(separator);
      if (!separator && _hasUnicode(string)) {
        return _castSlice(_stringToArray(string), 0, limit);
      }
    }
    return string.split(separator, limit);
  }

  var split_1 = split;

  var dateService = {
    currentDateTime() {
      return Date.now();
    },
    getDate() {
      return new Date().getDate();
    },
    getMonth() {
      return new Date().getMonth() + 1;
    },
    getYear() {
      return new Date().getFullYear();
    },
    getTimezoneOffset() {
      return new Date().getTimezoneOffset().toString();
    },
    getNowLocalTime() {
      return new Date(new Date().toLocaleDateString()).getTime();
    },
    getNowLocalUnixTime() {
      return Math.ceil(new Date().getTime() / 1e3);
    },
    getTime() {
      let date = new Date().toString();
      let stamp = Date.parse(date) / 1e3;
      return stamp;
    },
    stampToDate(timeStamp) {
      return new Date(parseInt(timeStamp) * 1e3);
    },
    stampToTime(timeStamp) {
      if (timeStamp) {
        let time = new Date(parseInt(timeStamp) * 1e3).toString();
        let timeArray = time.split(" ")[4].split(":");
        return parseInt(timeArray[0]) < 12 ? `${timeArray[0]}:${timeArray[1]}AM` : `${parseInt(timeArray[0]) - 12}:${timeArray[1]}PM`;
      }
      return "timeStamp is null";
    },
    stampToDay({ timeStamp }) {
      if (!timeStamp)
        return;
      timeStamp = parseInt(timeStamp);
      let date = new Date(timeStamp * 1e3);
      return {
        year: date.getFullYear(),
        month: date.getMonth() + 1,
        day: date.getDate()
      };
    },
    getTimeStampOfDate({ date }) {
      let timeStamp = {
        start: 0,
        end: 0
      };
      let dateObject;
      if (date.indexOf("-") === -1) {
        let dateArray = date.split("/");
        dateArray[0] = parseInt(dateArray[0]) - 1;
        dateObject = new Date(dateArray[2], dateArray[0], dateArray[1]);
      } else {
        let dateArray = date.split("-");
        dateArray[1] = parseInt(dateArray[1]) - 1;
        dateObject = new Date(dateArray[0], dateArray[1], dateArray[2]);
      }
      timeStamp.start = Date.parse(dateObject.toString()) / 1e3;
      timeStamp.end = timeStamp.start + 86400;
      return timeStamp;
    },
    LoopToGenerate({ span }) {
      let fotmat = (n) => {
        if (n < 13 * 60) {
          let h = Math.floor(n / 60);
          let m = n % 60;
          if (h == 12) {
            return `${`${h}`.slice(-2)}:${`0${m}`.slice(-2)}PM`;
          }
          return `${`0${h}`.slice(-2)}:${`0${m}`.slice(-2)}AM`;
        } else {
          let h = Math.floor((n - 12 * 60) / 60);
          let m = (n - 12 * 60) % 60;
          if (h == 12) {
            return `${`0${h}`.slice(-2)}:${`0${m}`.slice(-2)}AM`;
          }
          return `${`${h}`.slice(-2)}:${`0${m}`.slice(-2)}PM`;
        }
      };
      let i = 0;
      let arr = [];
      while (i <= 24 * 60) {
        arr.push(fotmat(i));
        i += parseInt(span);
      }
      arr[arr.length - 1] = "11:59PM";
      return arr;
    },
    calendarArray({ year, month, today }) {
      if (year && month && today) {
        year = parseInt(year);
        month = parseInt(month);
        let dataObject = [];
        let isLeapYear = year % 4 == 0 && year % 100 != 0 || year % 400 == 0 ? true : false;
        let days = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        days[1] = isLeapYear ? 29 : 28;
        let dataArray = new Array(42).fill(0);
        let day = new Date(year, month - 1, 1).getDay();
        for (let i = day, j = 1; i < day + days[month - 1]; i++, j++) {
          dataArray[i] = j;
        }
        for (let i = day - 1, j = 0; i >= 0; i--, j++) {
          if (day == 0)
            break;
          else {
            dataArray[i] = "";
          }
        }
        for (let i = day + days[month - 1], j = 1; i < 42; i++, j++) {
          dataArray[i] = "";
        }
        for (let i = 0; i < dataArray.length; i++) {
          if (dataArray[i] == today) {
            dataObject.push({
              key: dataArray[i],
              color: "#003d68",
              backgroundColor: "#d7e2ea"
            });
          } else {
            dataObject.push({
              key: dataArray[i],
              color: "#517086",
              backgroundColor: "#ffffff"
            });
          }
        }
        return dataObject;
      }
    },
    splitByTimeSlot({ object2, timeSlot, year, month, day }) {
      let date = new Date(year, month - 1, day);
      let anotherDay = date.getTime() / 1e3 + 86400;
      let splitTimeItem;
      let array = {
        morning: [],
        afternoon: []
      };
      new Date().valueOf() / 1e3;
      if (u__namespace.isArr(object2)) {
        object2.forEach((obj) => {
          if (u__namespace.isObj(obj)) {
            if (obj["stime"] < date.getTime() / 1e3 && obj["etime"] > date.getTime() / 1e3)
              obj["stime"] = date.getTime() / 1e3;
            if (obj["stime"] < anotherDay && obj["etime"] > anotherDay)
              obj["etime"] = anotherDay;
            if (timeSlot) {
              let i = 0;
              do {
                splitTimeItem = {
                  stime: obj["stime"] + i * timeSlot * 60,
                  etime: obj["stime"] + (i + 1) * timeSlot * 60,
                  showTime: moment__default["default"]((obj["stime"] + i * timeSlot * 60) * 1e3).format("LT"),
                  refid: obj["id"],
                  bvid: obj["bvid"]
                };
                console.log(date.getTime());
                if (obj["etime"] - splitTimeItem["stime"] < timeSlot * 60) {
                  continue;
                } else {
                  if (splitTimeItem["showTime"].indexOf("AM") != -1) {
                    array.morning.push(splitTimeItem);
                  } else {
                    array.afternoon.push(splitTimeItem);
                  }
                  i += 1;
                }
              } while (splitTimeItem["etime"] <= obj["etime"] && splitTimeItem["etime"] <= anotherDay);
            }
          }
        });
        return array;
      }
      return array;
    },
    splitTime({ object2, timeSlot, year, month, day, isSplitCurrent = false }) {
      console.log("test splitTime", {
        object2,
        timeSlot,
        year,
        month,
        day,
        isSplitCurrent
      });
      let currentDate;
      let currentTime;
      if (isSplitCurrent) {
        currentDate = new Date();
        currentTime = currentDate.getTime() / 1e3;
      }
      let date = new Date(year, month - 1, day);
      let anotherDay = date.getTime() / 1e3 + 86400;
      let splitTimeItem;
      let array = [];
      if (u__namespace.isArr(object2)) {
        object2.forEach((obj) => {
          if (u__namespace.isObj(obj)) {
            if (obj["stime"] < date.getTime() / 1e3 && obj["etime"] > date.getTime() / 1e3)
              obj["stime"] = date.getTime() / 1e3;
            if (obj["stime"] < anotherDay && obj["etime"] > anotherDay)
              obj["etime"] = anotherDay;
            if (timeSlot) {
              let i = 0;
              do {
                splitTimeItem = {
                  stime: obj["stime"] + i * timeSlot * 60,
                  etime: obj["stime"] + (i + 1) * timeSlot * 60,
                  showTime: moment__default["default"]((obj["stime"] + i * timeSlot * 60) * 1e3).format("LT"),
                  refid: obj["id"],
                  bvid: obj["bvid"]
                };
                if (obj["etime"] - splitTimeItem["stime"] < timeSlot * 60) {
                  continue;
                } else {
                  if (splitTimeItem["showTime"].indexOf("AM") != -1) {
                    if (isSplitCurrent) {
                      if (splitTimeItem["stime"] > currentTime)
                        array.push(splitTimeItem);
                    } else {
                      array.push(splitTimeItem);
                    }
                  } else {
                    if (isSplitCurrent) {
                      if (splitTimeItem["stime"] > currentTime)
                        array.push(splitTimeItem);
                    } else {
                      array.push(splitTimeItem);
                    }
                  }
                  i += 1;
                }
              } while (splitTimeItem["etime"] <= obj["etime"] && splitTimeItem["etime"] <= anotherDay);
            }
          }
        });
        return array;
      }
      return array;
    },
    ShowTimeSpan(object) {
      if (u__namespace.isObj(object)) {
        if (object.hasOwnProperty("stime") && object.hasOwnProperty("etime")) {
          let start_date = moment__default["default"](object["stime"] * 1e3).format("LT");
          let end_date = moment__default["default"](object["etime"] * 1e3).format("LT");
          let duration_date = start_date + " - " + end_date;
          return duration_date;
        }
        return;
      }
      return;
    },
    ShowTimeDate(object) {
      if (u__namespace.isObj(object)) {
        if (object.hasOwnProperty("stime") && object.hasOwnProperty("etime")) {
          let date = new Date(object["stime"] * 1e3);
          let y = date.getFullYear();
          let m = date.getMonth() + 1 > 9 ? date.getMonth() + 1 : "0" + (date.getMonth() + 1);
          let d = date.getDate() < 10 ? `0${date.getDate()}` : `${date.getDate()}`;
          let duration_date = m + "-" + d + "-" + y;
          return duration_date;
        }
        return;
      }
      return;
    },
    ShowTimeDateUS(object) {
      if (u__namespace.isObj(object)) {
        if (object.hasOwnProperty("stime") && object.hasOwnProperty("etime")) {
          let date = new Date(object["stime"] * 1e3);
          let y = date.getFullYear();
          let m = date.getMonth() + 1 > 9 ? date.getMonth() + 1 : "0" + (date.getMonth() + 1);
          let d = date.getDate() < 10 ? `0${date.getDate()}` : `${date.getDate()}`;
          let duration_date = m + "-" + d + "-" + y;
          return duration_date;
        }
        return;
      }
      return;
    },
    ShowTimeSpanFormat_us(object) {
      if (u__namespace.isObj(object)) {
        if (object.hasOwnProperty("stime") && object.hasOwnProperty("etime")) {
          let date = new Date(object["stime"] * 1e3);
          let y = date.getFullYear();
          let m = date.getMonth() + 1 >= 10 ? date.getMonth() + 1 : "0" + (date.getMonth() + 1);
          let d = date.getDate() < 10 ? `0${date.getDate()}` : `${date.getDate()}`;
          let start_date = moment__default["default"](object["stime"] * 1e3).format("LT");
          let end_date = moment__default["default"](object["etime"] * 1e3).format("LT");
          let duration_date = m + "-" + d + "-" + y + " " + start_date + "-" + end_date;
          return duration_date;
        }
        return;
      }
      return;
    },
    minicalendarArray({
      year,
      month,
      today,
      middleDay,
      span,
      color,
      backgroundColor,
      todayColor,
      todayBackgroundColor
    }) {
      console.log("test minicalendarArray", {
        year,
        month,
        today,
        middleDay,
        span
      });
      middleDay = parseInt(middleDay);
      span = parseInt(span);
      year = parseInt(year);
      month = parseInt(month);
      month = month;
      let weeks = ["SU", "MO", "TU", "WE", "TH", "FR", "SA"];
      let dataObject = [];
      let isLeapYear = year % 4 == 0 && year % 100 != 0 || year % 400 == 0 ? true : false;
      let days = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
      days[1] = isLeapYear ? 29 : 28;
      let index = Math.ceil(-(span / 2));
      for (let i = 1; i <= span; i++) {
        let d = middleDay + index;
        if (today == d) {
          let date = new Date(year, month, d);
          let day = weeks[date.getDay()];
          dataObject.push({
            key: today,
            week: day,
            color: todayColor,
            backgroundColor: todayBackgroundColor
          });
        } else if (d < 1) {
          d = d + days[month - 1];
          let date = new Date(year, month, d);
          let day = weeks[date.getDay()];
          dataObject.push({
            key: d,
            week: day,
            color,
            backgroundColor
          });
        } else if (d > days[month - 1]) {
          d = d - days[month - 1];
          let date = new Date(year, month, d);
          let day = weeks[date.getDay()];
          dataObject.push({
            key: d,
            week: day,
            color,
            backgroundColor
          });
        } else {
          let date = new Date(year, month, d);
          let day = weeks[date.getDay()];
          dataObject.push({
            key: d,
            week: day,
            color,
            backgroundColor
          });
        }
        index = index + 1;
      }
      return dataObject;
    },
    loopMonth({ month, step }) {
      month = parseInt(month);
      step = parseInt(step);
      if (month && step) {
        let newmonth = month + step;
        if (newmonth > 12) {
          newmonth = newmonth - 12;
        } else if (newmonth < 1) {
          newmonth = newmonth + 12;
        }
        return newmonth;
      }
      return;
    },
    miniWeeklyCalendarArray({
      year,
      month,
      today,
      markDay,
      color,
      backgroundColor,
      todayColor,
      todayBackgroundColor,
      currentDateTime,
      pastTimeColor = null
    }) {
      if (typeof year == "string" || typeof month == "string" || typeof today == "string" || typeof markDay == "string") {
        return;
      }
      if (year && month && today && markDay) {
        today = parseInt(today);
        year = parseInt(year);
        month = parseInt(month);
        markDay = parseInt(markDay);
        let dataObject = [];
        let weeks = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
        const date = new Date(year, month - 1, markDay);
        let currenWeekDay = date.getDay();
        let d = new Date(date.getTime() - currenWeekDay * 24 * 60 * 60 * 1e3);
        let currentDay, currentYear, currentMonth;
        if (currentDateTime) {
          const splitTime = currentDateTime.split("-");
          currentYear = parseInt(splitTime[0]);
          currentMonth = parseInt(splitTime[1]);
          currentDay = parseInt(splitTime[2]);
        }
        let todayDate;
        pastTimeColor && (todayDate = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()));
        for (let i = 0; i < 7; i++) {
          let item = {
            year: d.getFullYear(),
            month: d.getMonth() + 1,
            day: d.getDate(),
            weekDay: weeks[d.getDay()],
            color,
            backgroundColor
          };
          pastTimeColor && todayDate && (todayDate == null ? void 0 : todayDate.getTime()) > (d == null ? void 0 : d.getTime()) && (item.color = pastTimeColor);
          !currentDateTime && (d == null ? void 0 : d.getDate()) == today && (item.color = todayColor) && (item.backgroundColor = todayBackgroundColor);
          currentDateTime && (d == null ? void 0 : d.getDate()) == currentDay && d.getMonth() + 1 == currentMonth && d.getFullYear() == currentYear && (item.color = todayColor) && (item.backgroundColor = todayBackgroundColor);
          dataObject.push(item);
          d = new Date(d.getTime() + 24 * 60 * 60 * 1e3);
        }
        return dataObject;
      }
      return;
    },
    NextWeek({ year, month, day }) {
      console.log("test NextWeek2", {
        year,
        month,
        day
      });
      let date = new Date(year, month - 1, day);
      date = new Date(date.getTime() + 24 * 60 * 60 * 1e3);
      let res = {
        year: date.getFullYear(),
        month: date.getMonth() + 1,
        day: date.getDate()
      };
      console.log("test NextWeek2", res);
      return res;
    },
    LastWeek({ year, month, day }) {
      console.log("test lastweek1", {
        year,
        month,
        day
      });
      let date = new Date(year, month - 1, day);
      date = new Date(date.getTime() - 24 * 60 * 60 * 1e3);
      let res = {
        year: date.getFullYear(),
        month: date.getMonth() + 1,
        day: date.getDate()
      };
      console.log("test lastweek2", res);
      return res;
    },
    AddHeightByTimeSpan({ object }) {
      if (u__namespace.isArr(object)) {
        console.log("test AddHeightByTimeSpan", object);
        object.forEach((obj) => {
          let span = (parseInt(obj.etime) - parseInt(obj.stime)) / 60;
          span = span * 1.5 < 20 ? 20 : span * 1.5;
          if (span >= 100) {
            span = 100;
          }
          obj.height = span + "px";
        });
        return object;
      }
      return;
    },
    ShowRightTime({ year, month, day, formatType = "" }) {
      if (typeof year == "string" || typeof month == "string" || typeof day == "string") {
        return;
      }
      if (year && month && day) {
        if (formatType == "" || typeof formatType == void 0) {
          year = parseInt(year);
          month = parseInt(month);
          day = parseInt(day);
          let strTime = year + "-" + month + "-" + day;
          let dayStart = new Date(strTime);
          let stime = dayStart.valueOf();
          let eday = year + "-" + month + "-" + (day + 1);
          let etime = new Date(eday).valueOf();
          let s = parseInt(stime.toString().substr(0, 10));
          let e = parseInt(etime.toString().substr(0, 10));
          return [s, e];
        } else if (typeof formatType == "string") {
          if (day < 10) {
            day = "0" + day;
          }
          if (month < 10) {
            month = "0" + month;
          }
          formatType.toUpperCase();
          let re = formatType.replace("Y", year);
          re = re.replace("M", month);
          re = re.replace("D", day);
          return re;
        }
      }
      return;
    },
    ShowLeftTime({ year, month, day, formatType = "" }) {
      if (typeof year == "string" || typeof month == "string" || typeof day == "string") {
        return;
      }
      if (year && month && day) {
        if (formatType == "" || typeof formatType == void 0) {
          year = parseInt(year);
          month = parseInt(month);
          day = parseInt(day);
          let strTime = year + "-" + month + "-" + day;
          let dayStart = new Date(strTime);
          let stime = dayStart.valueOf();
          let eday = year + "-" + month + "-" + (day + 1);
          let etime = new Date(eday).valueOf();
          let s = parseInt(stime.toString().substr(0, 10));
          let e = parseInt(etime.toString().substr(0, 10));
          return [s, e];
        } else if (typeof formatType == "string") {
          if (day < 10) {
            day = "0" + day;
          }
          if (month < 10) {
            month = "0" + month;
          }
          formatType.toUpperCase();
          let re = formatType.replace("Y", year);
          re = re.replace("M", month);
          re = re.replace("D", day);
          return re;
        }
      }
      return;
    },
    ShowDateByNumber({ year, month, day, formatType = "", abbreBool = false }) {
      if (store.env === "test") {
        console.log("test ShowDateByNumber", { year, month, day });
      }
      if (typeof year == "string" || typeof month == "string" || typeof day == "string") {
        return;
      }
      if (year && month && day) {
        if (formatType == "" || typeof formatType == void 0) {
          year = parseInt(year);
          month = parseInt(month);
          day = parseInt(day);
          let date = new Date(year, month - 1, day);
          let months = [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December"
          ];
          let weeks = [
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday"
          ];
          return weeks[date.getDay()] + " " + (!abbreBool ? months[month - 1] : months[month - 1].slice(0, 3)) + " " + day + "," + year;
        } else if (typeof formatType == "string") {
          if (day < 10) {
            day = "0" + day;
          }
          if (month < 10) {
            month = "0" + month;
          }
          formatType.toUpperCase();
          let re = formatType.replace("Y", year);
          re = re.replace("M", month);
          re = re.replace("D", day);
          return re;
        }
      }
      return;
    },
    TransformWeekDate({ object }) {
      if (u__namespace.isArr(object)) {
        console.log("test TransformWeekDate", object);
        let dataObject = [];
        object.forEach((obj) => {
          let date = new Date();
          let year = date.getFullYear();
          let month = date.getMonth();
          let day = date.getDay();
          let start_time, end_time;
          let workdays = obj.duration.split("-");
          workdays.forEach((d, index) => {
            if (d.indexOf("AM") != -1) {
              d = d.replace("AM", "");
              let split_date = d.split(":");
              let form_date;
              if (parseInt(split_date[0]) == 12) {
                form_date = parseInt(split_date[0]) + 12;
              } else {
                form_date = parseInt(split_date[0]);
              }
              d = form_date + ":" + split_date[1];
            } else if (d.indexOf("PM") != -1) {
              d = d.replace("PM", "");
              let split_date = d.split(":");
              let form_date;
              if (parseInt(split_date[0]) == 12) {
                form_date = parseInt(split_date[0]);
              } else {
                form_date = parseInt(split_date[0]) + 12;
              }
              d = form_date + ":" + split_date[1];
            }
            if (index == 0) {
              start_time = year + "/" + month + "/" + day + " " + d;
            } else {
              end_time = year + "/" + month + "/" + day + " " + d;
            }
          });
          let item = {
            itemStyle: { normal: { color: "#2988E65f" } },
            value: []
          };
          item.value[0] = 6 - obj.index;
          item.value[1] = start_time;
          item.value[2] = end_time;
          dataObject.push(item);
        });
        let option = {
          legend: {
            bottom: "1%",
            selectedMode: false,
            textStyle: {
              color: "#000"
            }
          },
          grid: {
            left: "3%",
            right: "3%",
            top: "1%",
            bottom: "10%",
            containLabel: true
          },
          xAxis: {
            type: "time",
            interval: 3600 * 1e3,
            axisLabel: {
              formatter: function(value) {
                var date = new Date(value);
                if (date.getHours() % 4 == 0) {
                  return date.getHours() + ":" + getzf(date.getMinutes());
                }
                return;
                function getzf(num) {
                  if (parseInt(num) < 10) {
                    num = "0" + num;
                  }
                  return num;
                }
              }
            }
          },
          yAxis: {
            data: ["SA", "FR", "TH", "WE", "TU", "MO", "SU"]
          },
          series: [
            {
              type: "custom",
              renderItem: function(params, api) {
                var categoryIndex = api.value(0);
                var start = api.coord([api.value(1), categoryIndex]);
                var end = api.coord([api.value(2), categoryIndex]);
                var height = 24;
                return {
                  type: "rect",
                  shape: echarts.graphic.clipRectByRect({
                    x: start[0],
                    y: start[1] - height / 2,
                    width: end[0] - start[0],
                    height
                  }, {
                    x: params.coordSys.x,
                    y: params.coordSys.y,
                    width: params.coordSys.width,
                    height: params.coordSys.height
                  }),
                  style: api.style()
                };
              },
              encode: {
                x: [1, 2],
                y: 0
              },
              data: dataObject
            }
          ]
        };
        return option;
      }
      return;
    },
    transformMonth({ month, flag = 1 }) {
      const months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec"
      ];
      const monthName = {
        Jan: 1,
        Feb: 2,
        Mar: 3,
        Apr: 4,
        May: 5,
        Jun: 6,
        Jul: 7,
        Aug: 8,
        Sep: 9,
        Oct: 10,
        Nov: 11,
        Dec: 12
      };
      if (flag == 2) {
        return monthName[month];
      } else {
        return months[month - 1];
      }
    },
    transformYear({ year }) {
      return parseInt(year);
    },
    getDurationByMinute({ stime, etime }) {
      return (etime - stime) / 60;
    },
    startMeeting({ stime }) {
      if ((stime - 900) * 1e3 <= new Date().getTime())
        return true;
      return false;
    },
    transformSelectWeek({ object }) {
      if (u__namespace.isArr(object)) {
        let selectWeek = [];
        let addWeek = [];
        let weeks = ["Su", "M", "T", "W", "Th", "F", "Sa"];
        for (let i = 0; i < 7; i++) {
          if (!(Object.keys(object[i]).length === 0 && object[i].constructor === Object || object[i].length === 0 && object[i].constructor === Array)) {
            selectWeek.push({
              index: i,
              key: weeks[i],
              availableTime: {
                timeStart: "",
                timeEnd: ""
              }
            });
            object[i].forEach((obj) => {
              addWeek.push({
                duration: obj,
                location: "",
                index: i,
                key: weeks[i]
              });
            });
          }
        }
        return {
          selectWeek,
          addWeek
        };
      }
      return;
    },
    isType({ parameter, type }) {
      console.log("test isType", {
        parameter,
        type
      });
      if (typeof parameter == type) {
        return true;
      }
      return false;
    },
    getQuarterStartMonth(now) {
      let quarterStartMonth = 0;
      if (new Date(now).getMonth() < 3 || new Date(now).getMonth() == 12) {
        quarterStartMonth = 0;
      }
      if (2 < new Date(now).getMonth() && new Date(now).getMonth() < 6) {
        quarterStartMonth = 3;
      }
      if (5 < new Date(now).getMonth() && new Date(now).getMonth() < 9) {
        quarterStartMonth = 6;
      }
      if (new Date(now).getMonth() > 8) {
        quarterStartMonth = 9;
      }
      return quarterStartMonth;
    },
    getWeekEndDate(getTime) {
      let now = new Date(getTime);
      let weekEndDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() + (7 - (now.getDay() === 0 ? 7 : now.getDay())));
      return weekEndDate.valueOf() / 1e3;
    },
    getMonthEndDate(getTime) {
      let now = new Date(getTime * 1e3);
      let monthEndDate = new Date(now.getFullYear(), now.getMonth(), new Date(now.getFullYear(), now.getMonth(), 0).getDate());
      return monthEndDate.valueOf() / 1e3;
    },
    getQuarterEndDate(getTime) {
      let quarterStartMonth = 0;
      let now = new Date(getTime * 1e3);
      let monthTime = new Date(now).getMonth() + 1;
      let yearTime = now.getFullYear();
      console.log(monthTime);
      if (monthTime < 3) {
        quarterStartMonth = 0;
      }
      if (2 < monthTime && monthTime < 6) {
        quarterStartMonth = 3;
      }
      if (5 < monthTime && monthTime < 9) {
        quarterStartMonth = 6;
      }
      if (monthTime > 8 && monthTime <= 11) {
        quarterStartMonth = 9;
      }
      if (monthTime === 12) {
        quarterStartMonth = 0;
        yearTime++;
      }
      let quarterEndMonth = quarterStartMonth + 2;
      console.log(quarterStartMonth);
      let quarterStartDate = new Date(yearTime, quarterEndMonth - 1, new Date(now.getFullYear(), quarterEndMonth, 0).getDate());
      return quarterStartDate.valueOf() / 1e3;
    },
    compareTime({ startTime, endTime }) {
      var date = new Date();
      let stTime = startTime.split(/[A-Z]{2}/)[0].split(":");
      let edTime = endTime.split(/[A-Z]{2}/)[0].split(":");
      return date.setHours(stTime[0], stTime[1]) < date.setHours(edTime[0], edTime[1]);
    },
    DateCompare({ startTime, endTime }) {
      let date = new Date();
      let sEndStr = startTime.substr(-2, 2), eEndStr = endTime.substr(-2, 2), sTimeArr = split_1(startTime.substring(0, startTime.length - 2), ":", 2), eTimeArr = split_1(endTime.substring(0, endTime.length - 2), ":", 2);
      console.log(eTimeArr, sTimeArr);
      if (sEndStr === eEndStr) {
        if (sEndStr === "AM") {
          return date.setHours(+sTimeArr[0], +sTimeArr[1]) < date.setHours(+eTimeArr[0], +eTimeArr[1]);
        } else if (sEndStr === "PM") {
          return date.setHours(+sTimeArr[0] + 12, +sTimeArr[1]) < date.setHours(+eTimeArr[0] + 12, +eTimeArr[1]);
        }
      } else if (sEndStr === "AM" && eEndStr === "PM") {
        return true;
      } else if (sEndStr === "PM" && eEndStr === "AM") {
        return false;
      }
      return;
    },
    generateYear({ last = 30, next = 10 }) {
      let currentYear = new Date().getFullYear();
      let data = [];
      let startYear = currentYear - last;
      for (let i = 0; i < last + next; i++) {
        data.push(startYear.toString());
        startYear++;
      }
      return data;
    },
    formatData(timeStamp) {
      timeStamp = timeStamp * 1e3;
      function formatAMPM(date) {
        let hours = date.getHours();
        let minutes = date.getMinutes();
        let ampm = hours >= 12 ? "pm" : "am";
        hours = hours % 12;
        hours = hours ? hours : 12;
        minutes = minutes < 10 ? "0" + minutes : minutes;
        let strTime = hours + ":" + minutes + "\xA0" + ampm;
        return strTime;
      }
      if (timeStamp >= new Date(new Date().toLocaleDateString()).getTime()) {
        return formatAMPM(new Date(timeStamp));
      } else {
        return new Date(timeStamp).toDateString().split(" ")[1] + " " + new Date(timeStamp).toDateString().split(" ")[2];
      }
    },
    getMonthString() {
      return [
        "December",
        "November",
        "October",
        "September",
        "August",
        "July",
        "June",
        "May",
        "April",
        "March",
        "February",
        "January"
      ].splice(11 - new Date().getMonth(), 12);
    },
    formatDataPro({
      date,
      separator,
      retentionOptions = true
    }) {
      if (date.toString().length === 10) {
        date = +date * 1e3;
      }
      let dateFormat = new Date(+date);
      let mdyTemp = `${dateFormat.toLocaleString("en-US", { month: "2-digit" })}${separator}${dateFormat.toLocaleString("en-US", { day: "2-digit" })}${separator}${dateFormat.getFullYear()}`;
      let hmm = `${dateFormat.toLocaleString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true
    })}`;
      return retentionOptions ? mdyTemp + " " + hmm : mdyTemp;
    },
    checkUnder18({ date }) {
      let currentDate = new Date().getTime();
      let pastDate = new Date(date).getTime();
      let years = (currentDate - pastDate) / (1e3 * 60 * 60 * 24 * 356);
      if (years < 18)
        return true;
      return false;
    },
    timeRange({
      queryType,
      stime,
      timeStart = -1,
      timeEnd = -1
    }) {
      const date = new Date().getTime() / 1e3;
      if (queryType && stime) {
        switch (queryType) {
          case 1:
            return stime - date > timeStart * 60 ? true : false;
          case 2:
            return stime - date < timeEnd * 60 ? true : false;
          case 3:
            return stime - date < timeEnd * 60 && stime - date > timeStart * 60 ? true : false;
        }
      }
      return;
    },
    compareDate({
      comTime,
      pareTime,
      timeStart = "availableTime.timeStart",
      timeEnd = "availableTime.timeEnd",
      duration = "duration",
      indexTime = "index",
      fomatTime = ["hh:mm A"]
    }) {
      if (!(pareTime && pareTime.length)) {
        return true;
      }
      let sTimeStr = get_1(comTime, timeStart), eTimeStr = get_1(comTime, timeEnd);
      return pareTime.every((item) => {
        if (get_1(comTime, indexTime) === get_1(item, indexTime)) {
          let getArrItemsTime = get_1(item, duration), sTimeArrStr = getArrItemsTime.split("-")[0], eTimeArrStr = getArrItemsTime.split("-")[1];
          return new Date(moment__default["default"](sTimeStr, fomatTime)) >= new Date(moment__default["default"](eTimeArrStr, fomatTime)) || new Date(moment__default["default"](eTimeStr, fomatTime)) <= new Date(moment__default["default"](sTimeArrStr, fomatTime));
        } else {
          return true;
        }
      });
    },
    JudgmentOrderTime() {
      return new Date(new Date().getFullYear(), 6, 1).getTimezoneOffset() === new Date(new Date().getFullYear(), 12, 1).getTimezoneOffset() ? false : true;
    }
  };

  /**
   * Creates a new array concatenating `array` with any additional arrays
   * and/or values.
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Array
   * @param {Array} array The array to concatenate.
   * @param {...*} [values] The values to concatenate.
   * @returns {Array} Returns the new concatenated array.
   * @example
   *
   * var array = [1];
   * var other = _.concat(array, 2, [3], [[4]]);
   *
   * console.log(other);
   * // => [1, 2, 3, [4]]
   *
   * console.log(array);
   * // => [1]
   */
  function concat() {
    var length = arguments.length;
    if (!length) {
      return [];
    }
    var args = Array(length - 1),
        array = arguments[0],
        index = length;

    while (index--) {
      args[index - 1] = arguments[index];
    }
    return _arrayPush(isArray_1(array) ? _copyArray(array) : [array], _baseFlatten(args, 1));
  }

  var concat_1 = concat;

  /**
   * Removes trailing whitespace or specified characters from `string`.
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category String
   * @param {string} [string=''] The string to trim.
   * @param {string} [chars=whitespace] The characters to trim.
   * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
   * @returns {string} Returns the trimmed string.
   * @example
   *
   * _.trimEnd('  abc  ');
   * // => '  abc'
   *
   * _.trimEnd('-_-abc-_-', '_-');
   * // => '-_-abc'
   */
  function trimEnd(string, chars, guard) {
    string = toString_1(string);
    if (string && (guard || chars === undefined)) {
      return string.slice(0, _trimmedEndIndex(string) + 1);
    }
    if (!string || !(chars = _baseToString(chars))) {
      return string;
    }
    var strSymbols = _stringToArray(string),
        end = _charsEndIndex(strSymbols, _stringToArray(chars)) + 1;

    return _castSlice(strSymbols, 0, end).join('');
  }

  var trimEnd_1 = trimEnd;

  /** Used as the size to enable large array optimizations. */
  var LARGE_ARRAY_SIZE = 200;

  /**
   * The base implementation of methods like `_.difference` without support
   * for excluding multiple arrays or iteratee shorthands.
   *
   * @private
   * @param {Array} array The array to inspect.
   * @param {Array} values The values to exclude.
   * @param {Function} [iteratee] The iteratee invoked per element.
   * @param {Function} [comparator] The comparator invoked per element.
   * @returns {Array} Returns the new array of filtered values.
   */
  function baseDifference(array, values, iteratee, comparator) {
    var index = -1,
        includes = _arrayIncludes,
        isCommon = true,
        length = array.length,
        result = [],
        valuesLength = values.length;

    if (!length) {
      return result;
    }
    if (iteratee) {
      values = _arrayMap(values, _baseUnary(iteratee));
    }
    if (comparator) {
      includes = _arrayIncludesWith;
      isCommon = false;
    }
    else if (values.length >= LARGE_ARRAY_SIZE) {
      includes = _cacheHas;
      isCommon = false;
      values = new _SetCache(values);
    }
    outer:
    while (++index < length) {
      var value = array[index],
          computed = iteratee == null ? value : iteratee(value);

      value = (comparator || value !== 0) ? value : 0;
      if (isCommon && computed === computed) {
        var valuesIndex = valuesLength;
        while (valuesIndex--) {
          if (values[valuesIndex] === computed) {
            continue outer;
          }
        }
        result.push(value);
      }
      else if (!includes(values, computed, comparator)) {
        result.push(value);
      }
    }
    return result;
  }

  var _baseDifference = baseDifference;

  /**
   * This method is like `_.isArrayLike` except that it also checks if `value`
   * is an object.
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is an array-like object,
   *  else `false`.
   * @example
   *
   * _.isArrayLikeObject([1, 2, 3]);
   * // => true
   *
   * _.isArrayLikeObject(document.body.children);
   * // => true
   *
   * _.isArrayLikeObject('abc');
   * // => false
   *
   * _.isArrayLikeObject(_.noop);
   * // => false
   */
  function isArrayLikeObject(value) {
    return isObjectLike_1(value) && isArrayLike_1(value);
  }

  var isArrayLikeObject_1 = isArrayLikeObject;

  /**
   * This method is like `_.difference` except that it accepts `iteratee` which
   * is invoked for each element of `array` and `values` to generate the criterion
   * by which they're compared. The order and references of result values are
   * determined by the first array. The iteratee is invoked with one argument:
   * (value).
   *
   * **Note:** Unlike `_.pullAllBy`, this method returns a new array.
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Array
   * @param {Array} array The array to inspect.
   * @param {...Array} [values] The values to exclude.
   * @param {Function} [iteratee=_.identity] The iteratee invoked per element.
   * @returns {Array} Returns the new array of filtered values.
   * @example
   *
   * _.differenceBy([2.1, 1.2], [2.3, 3.4], Math.floor);
   * // => [1.2]
   *
   * // The `_.property` iteratee shorthand.
   * _.differenceBy([{ 'x': 2 }, { 'x': 1 }], [{ 'x': 1 }], 'x');
   * // => [{ 'x': 2 }]
   */
  var differenceBy = _baseRest(function(array, values) {
    var iteratee = last_1(values);
    if (isArrayLikeObject_1(iteratee)) {
      iteratee = undefined;
    }
    return isArrayLikeObject_1(array)
      ? _baseDifference(array, _baseFlatten(values, 1, isArrayLikeObject_1, true), _baseIteratee(iteratee))
      : [];
  });

  var differenceBy_1 = differenceBy;

  var __async$c = (__this, __arguments, generator) => {
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
  const Index_doc = "doctors_dev";
  const Index_room = "room_dev";
  const Index_All = "doctors_dev,room_dev";
  const Index_users = "doctors_dev,externaldoctor_v0.1";
  const Index_Providers = "provider_dev";
  const mapboxToken = "pk.eyJ1IjoiamllamlleXV5IiwiYSI6ImNrbTFtem43NzF4amQyd3A4dmMyZHJhZzQifQ.qUDDq-asx1Q70aq90VDOJA";
  const mapboxHost = "https://api.mapbox.com/";
  const getItemOfConfig = (key, defaultValue) => {
    var _a;
    const config = localStorage == null ? void 0 : localStorage.getItem("config");
    const value = ((_a = JSON.parse(config)) == null ? void 0 : _a.hasOwnProperty(key)) ? JSON.parse(config)[key] : defaultValue;
    return value;
  };
  const updateEs = (id, type, bvid) => {
    const esSyncHost = getItemOfConfig("syncHost", "https://syncd.aitmed.io");
    let urlConvert = /* @__PURE__ */ new Map([
      ["40000", "/avail/"],
      ["35841", "/docProfile/"],
      ["79360", "/rsnForVst/"],
      ["655363", "/room/"]
    ]);
    let url = urlConvert.get(type);
    let data = type == "40000" ? { vid: id, bvid } : { vid: id };
    return new Promise((res, rej) => {
      axios__default["default"]({
        url,
        baseURL: esSyncHost,
        method: "put",
        data,
        headers: {
          "Content-Type": "application/json"
        }
      }).then((data2) => {
        if (store.env === "test") {
          console.log("%cGet mapbox address response", "background: purple; color: white; display: block;", { data: data2 });
        }
        if (data2.status == 200) {
          res(data2);
        }
      }).catch((error) => {
        rej(error);
      });
    });
  };
  const GetQuery = (query) => {
    const url = "/geocoding/v5/mapbox.places/" + query + ".json";
    return new Promise((res, rej) => {
      axios__default["default"]({
        url,
        baseURL: mapboxHost,
        method: "get",
        params: {
          country: "US",
          limit: 10,
          access_token: mapboxToken
        }
      }).then((data) => {
        if (store.env === "test") {
          console.log("%cGet mapbox address response", "background: purple; color: white; display: block;", { data });
        }
        if (data.status == 200) {
          res(data);
        }
      }).catch((error) => {
        rej(error);
      });
    });
  };
  let Description = (query) => {
    let promise = new Promise((res, rej) => {
      let path = "/api/icd10cm/v3/search?sf=code,name&df=code,name&maxList=20&terms=" + query;
      let options = {
        host: "clinicaltables.nlm.nih.gov",
        path
      };
      axios__default["default"].get(`https://${options.host}${path}`).then((resp) => res({ center: resp.data })).catch(rej);
    });
    return promise;
  };
  const getDistance = (pos1, pos2) => {
    const url = "/directions-matrix/v1/mapbox/driving/" + pos1 + ";" + pos2;
    return new Promise((res, rej) => {
      axios__default["default"]({
        url,
        baseURL: mapboxHost,
        method: "get",
        params: {
          approaches: "curb;curb",
          access_token: mapboxToken
        }
      }).then((data) => {
        if (store.env === "test") {
          console.log("%cGet mapbox address response", "background: purple; color: white; display: block;", { data });
        }
        if (data.status == 200) {
          res(data);
        }
      }).catch((error) => {
        rej(error);
      });
    });
  };
  function getSearchBuiltIns({
    SearchClient
  } = {}) {
    return {
      updateEsData(_0) {
        return __async$c(this, arguments, function* ({
          id,
          type,
          bvid = null
        }) {
          let response;
          if (id) {
            yield updateEs(id, type, bvid).then((data) => {
              response = data["data"];
            }, (err) => {
              console.log(err);
            });
            return response;
          }
          return;
        });
      },
      transformGeo(_0) {
        return __async$c(this, arguments, function* ({ query }) {
          let arr = [];
          query = query.replace("#", "");
          if (query) {
            yield GetQuery(query).then((data) => {
              data = data["data"]["features"][0];
              arr = data.center;
              if (store.env === "test") {
                console.log(data);
              }
            }, (err) => {
              if (store.env === "test") {
                console.log(err);
              }
            });
            return arr;
          }
          return;
        });
      },
      queryCode(_0) {
        return __async$c(this, arguments, function* ({ query }) {
          let arr = [];
          let arrNew = [];
          if (query) {
            yield Description(query).then((data) => {
              arr[0] = data.center[3];
              for (let j = 0; j < arr[0].length; j++) {
                arrNew.push([]);
              }
              for (let i = 0; i < arr[0].length; i++) {
                let arrStr = arr[0][i][0] + arr[0][i][1];
                let a = concat_1(arr[0][i], arrStr);
                arrNew[i].push(a);
              }
            }, (err) => {
              console.log("query error", err);
            });
            return arrNew;
          }
          return [];
        });
      },
      queryInsurance(_0) {
        return __async$c(this, arguments, function* ({ id }) {
          const elasticClient = getItemOfConfig("elasticClient", "https://elasticd.aitmed.io");
          const client = SearchClient ? new SearchClient({ hosts: elasticClient }) : {};
          let template = {
            query: {
              match: {
                _id: id
              }
            }
          };
          const body = yield client.search({
            index: "ins_all",
            body: template
          });
          return body["hits"]["hits"];
        });
      },
      queryIns(_0) {
        return __async$c(this, arguments, function* ({ ins }) {
          const elasticClient = getItemOfConfig("elasticClient", "https://elasticd.aitmed.io");
          const client = SearchClient ? new SearchClient({ hosts: elasticClient }) : {};
          let template = {
            _source: false,
            suggest: {
              ins: {
                prefix: ins,
                completion: {
                  field: "carries",
                  size: 10,
                  skip_duplicates: true
                }
              }
            }
          };
          const body = yield client.search({
            index: "ins_carriers",
            body: template
          });
          return body;
        });
      },
      queryAllCarriers(_0) {
        return __async$c(this, arguments, function* ({ object }) {
          object.forEach((index) => {
            index["text"] = index["carrier"];
          });
          return object;
        });
      },
      suggestAddress(_0) {
        return __async$c(this, arguments, function* ({ query }) {
          query = query.replace("#", "");
          let response = [];
          if (query) {
            yield GetQuery(query).then((data) => {
              response = data["data"]["features"];
            }, (err) => {
              console.log("query error", err);
            });
            if (response == null || typeof response == void 0) {
              return [];
            }
            return response;
          }
          return [];
        });
      },
      suggest(_0) {
        return __async$c(this, arguments, function* ({ prefix }) {
          const elasticClient = getItemOfConfig("elasticClient", "https://elasticd.aitmed.io");
          const client = new SearchClient({ hosts: elasticClient });
          console.log("test suggest", prefix);
          let TEXT_INDEX = "search_field_suggestion";
          let doc_sug = [];
          let spe_sug = [];
          let sym_sug = [];
          let body_1 = yield client.search({
            index: TEXT_INDEX,
            body: {
              suggest: {
                speciality_suggestion: {
                  text: prefix,
                  completion: {
                    field: "specialty",
                    skip_duplicates: true,
                    size: 5
                  }
                },
                symptom_suggestion: {
                  text: prefix,
                  completion: {
                    field: "symptom",
                    skip_duplicates: true,
                    size: 8
                  }
                }
              },
              sort: [
                {
                  weight: {
                    order: "desc"
                  }
                }
              ]
            }
          });
          function compare(property1, property2) {
            return function(a, b) {
              let value1 = a[property1][property2];
              let value2 = b[property1][property2];
              return value2 - value1;
            };
          }
          for (let s of body_1["suggest"]["speciality_suggestion"][0]["options"].sort(compare("_source", "weight"))) {
            spe_sug.push(s);
          }
          for (let s of body_1["suggest"]["symptom_suggestion"][0]["options"].sort(compare("_source", "weight"))) {
            sym_sug.push(s);
          }
          console.log("test suggest", {
            doctor_suggestion: doc_sug,
            speciality_suggestion: spe_sug,
            symptom_suggestion: Array.from(new Set(sym_sug))
          });
          return {
            doctor_suggestion: doc_sug,
            speciality_suggestion: spe_sug,
            symptom_suggestion: Array.from(new Set(sym_sug))
          };
        });
      },
      GetAllLonAndLat({ object }) {
        if (u__namespace.isArr(object)) {
          let re = [];
          object.forEach((obj) => {
            let st = obj["_source"]["availByLocation"][0]["location"]["geoCode"].split(",");
            let address = obj["_source"]["availByLocation"][0]["location"]["address"]["street"] + " " + obj["_source"]["availByLocation"][0]["location"]["address"]["city"] + " " + obj["_source"]["availByLocation"][0]["location"]["address"]["state"] + " " + obj["_source"]["availByLocation"][0]["location"]["address"]["zipCode"];
            let Lon = parseFloat(st[1]);
            let Lat = parseFloat(st[0]);
            re.push({
              data: [Lon, Lat],
              information: {
                address,
                name: obj["_source"]["fullName"] + " " + obj["_source"]["title"],
                phoneNumber: obj["_source"]["phone"],
                speciality: obj["_source"]["specialty"],
                title: obj["_source"]["title"]
              }
            });
          });
          console.log("test transform", re);
          return re;
        }
        return;
      },
      SortBySpeciality({ object }) {
        if (u__namespace.isArr(object)) {
          let re = [];
          let map = /* @__PURE__ */ new Map();
          let index = 0;
          object.forEach((obj) => {
            let specialities = obj["_source"]["specialty"] ? obj["_source"]["specialty"] : [obj["_source"]["service"]];
            for (let j = 0; j < specialities.length; j++) {
              if (map.get(specialities[j]) === void 0) {
                let item = {
                  Speciality: specialities[j],
                  num: 1,
                  data: [obj]
                };
                re.push(item);
                map.set(specialities[j], index++);
              } else {
                let i = parseInt(map.get(specialities[j]));
                console.log("test", { obj, i });
                re[i]["num"] = re[i]["num"] + 1;
                re[i]["data"].push(obj);
              }
            }
          });
          return re;
        }
        return;
      },
      processingSearchData({ object }) {
        let path = ["avatar1.png", "avatar2.png", "avatar3.png", "avatar4.png"];
        let re = [];
        if (u__namespace.isArr(object)) {
          object.forEach((obj2) => {
            let map = /* @__PURE__ */ new Map();
            for (let i = 0; i < obj2["_source"]["availByLocation"].length; i++) {
              let location = obj2["_source"]["availByLocation"][i]["location"];
              let key = obj2["_source"]["availByLocation"][i]["location"]["geoCode"];
              if (map.has(key)) {
                map.set(key, map.get(key));
              } else {
                map.set(key, 1);
                let item = obj2;
                let randomNumber = Math.ceil(Math.random() * 10);
                if (randomNumber >= 0 && randomNumber < 2.5) {
                  randomNumber = 0;
                } else if (randomNumber < 5 && randomNumber >= 2.5) {
                  randomNumber = 1;
                } else if (randomNumber >= 5 && randomNumber < 7.5) {
                  randomNumber = 2;
                } else {
                  randomNumber = 3;
                }
                item["path"] = path[randomNumber];
                item["fullName"] = item["_source"]["fullName"] + ", " + item["_source"]["title"];
                item["address"] = location["address"]["city"] + ", " + location["address"]["state"] + " " + location["address"]["zipCode"];
                item["street"] = location["address"]["street"];
                if (obj2["_source"]["specialty"] == null) {
                  obj2["_source"]["specialty"] = "unknown";
                }
                re.push(item);
              }
            }
          });
          let obj = {};
          re = re.reduce((item, next) => {
            if (!obj[next._id]) {
              item.push(next);
              obj[next._id] = true;
            }
            return item;
          }, []);
          return re;
        }
        return;
      },
      ComputeObjectFieldCount({ objArr, strOne, strTwo }) {
        let subTpOne = 0;
        let subTpTwo = 0;
        let arr = [];
        objArr.map((obj) => {
          if (obj["subtype"] === strOne) {
            subTpOne++;
          } else if (obj["subtype"] === strTwo)
            subTpTwo++;
        });
        arr.push(subTpOne);
        arr.push(subTpTwo);
        return arr;
      },
      ModifyObjectField({ objArr, str }) {
        return objArr.map((values) => set_1(values, "place_name", trimEnd_1(values["place_name"], str)));
      },
      CountObj({ objArr }) {
        let newArr = [];
        let newArrObj = [];
        objArr.forEach((valuesObj) => {
          var _a, _b;
          if (((_a = valuesObj["_source"]["availByLocation"]) == null ? void 0 : _a.length) >= 1) {
            let len = (_b = valuesObj["_source"]["availByLocation"]) == null ? void 0 : _b.length;
            newArr = valuesObj["_source"]["availByLocation"];
            unset_1(objArr, valuesObj["_source"]["availByLocation"]);
            for (let i = 0; i < len; i++) {
              let obj = cloneDeep_1(valuesObj);
              obj["_source"]["availByLocation"] = new Array(newArr[i]);
              newArrObj.push(obj);
            }
          }
        });
        return newArrObj;
      },
      pickByArr({ objArr }) {
        let arrOffice = [];
        let arrTel = [];
        objArr == null ? void 0 : objArr.forEach((objItem) => {
          if (objItem["_source"]["visitType"] === "Office Visits" || objItem["_source"]["service"] === "COVID-19 Testing" || objItem["_source"]["service"] === "COVID-19 Vaccine" || objItem["_source"]["service"] === "Flu Shot") {
            arrOffice.push(objItem);
          } else if (objItem["_source"]["visitType"] === "Telemedicine") {
            arrTel.push(objItem);
          }
        });
        let doubArr = [];
        doubArr.push(arrOffice);
        doubArr.push(arrTel);
        return doubArr;
      },
      queryProviders(_0) {
        return __async$c(this, arguments, function* ({ cond = null }) {
          const elasticClient = getItemOfConfig("elasticClient", "https://elasticd.aitmed.io");
          const client = new SearchClient({ hosts: elasticClient });
          let template = {
            query: {
              multi_match: {
                query: cond,
                type: "best_fields",
                fields: ["fullName^2", "facilityName^2", "specialty"],
                fuzziness: "AUTO",
                max_expansions: 200
              }
            },
            size: 100
          };
          const body = yield client.search({
            index: Index_Providers,
            body: template
          });
          return body["hits"]["hits"];
        });
      },
      GetAllLonAndLatNew({ object }) {
        const noName = "";
        if (u__namespace.isArr(object)) {
          let re = [];
          object.forEach((obj) => {
            let st = obj["_source"]["practiceLocation"]["geoCode"].split(",");
            let address = obj["_source"]["practiceLocation"]["fullAddress"];
            let Lon = parseFloat(st[1]);
            let Lat = parseFloat(st[0]);
            re.push({
              data: [Lon, Lat],
              information: {
                address,
                name: `${obj["_source"]["fullName"] ? obj["_source"]["titleName"] : obj["_source"]["roomName"] ? obj["_source"]["roomName"] : noName}`,
                phoneNumber: obj["_source"]["phoneNumber"],
                speciality: `${obj["_source"]["specialty"] ? obj["_source"]["specialty"] : obj["_source"]["service"] ? obj["_source"]["service"] : noName}`
              }
            });
          });
          return re;
        }
        return;
      },
      GetFacilityLat({ object }) {
        if (u__namespace.isArr(object)) {
          let re = [];
          object.forEach((obj) => {
            let st = obj["name"]["data"]["basicInfo"]["geoCode"];
            let address = obj["name"]["data"]["basicInfo"]["address"] + " " + obj["name"]["data"]["basicInfo"]["city"] + " " + obj["name"]["data"]["basicInfo"]["state"] + " " + obj["name"]["data"]["basicInfo"]["zipCode"];
            let Lon = parseFloat(st[0]);
            let Lat = parseFloat(st[1]);
            re.push({
              data: [Lon, Lat],
              information: {
                address
              }
            });
          });
          return re;
        }
        return;
      },
      ChooseCarrier({ object, cond }) {
        for (let i = 0; i < Array.from(object).length; i++) {
          if (object[i].carrier == cond) {
            return object[i].plan[1];
          } else {
            continue;
          }
        }
      },
      jugeSame({ object, cond, name }) {
        for (let i = 0; i < Array.from(object).length; i++) {
          if (object[i][name] == cond) {
            return true;
          } else {
            continue;
          }
        }
        return false;
      },
      DeleteCarrier({ object, carreir, plans, len }) {
        for (let i = 0; i < Array.from(object).length; i++) {
          if (object[i].carrier == carreir) {
            object[i].plans = plans;
            object[i].planLength = len;
            return object;
          } else {
            continue;
          }
        }
      },
      queryByAllDate(_0) {
        return __async$c(this, arguments, function* ({
          cond = null,
          distance = 30,
          pos = 92805,
          stime,
          etime,
          isSplitCurrent = false
        }) {
          const elasticClient = getItemOfConfig("elasticClient", "https://elasticd.aitmed.io");
          const client = new SearchClient({ hosts: elasticClient });
          let arr = [];
          if (pos) {
            yield GetQuery(pos).then((data) => {
              data = data["data"]["features"][0];
              arr[0] = data.center[0];
              arr[1] = data.center[1];
            }, (err) => {
              if (store.env === "test") {
                console.log("%cError", "background: purple; color: white; display: block;", err);
              }
            });
          }
          if (typeof stime == "string" || typeof etime == "string" || typeof stime == "number" || typeof etime == "number") {
            var d = new Date();
            var dateObject = new Date();
            dateObject.setMonth(d.getMonth() + 1);
            dateObject.setDate(d.getDate());
            dateObject.setFullYear(d.getFullYear());
            dateObject.setHours(0);
            dateObject.setMinutes(0);
            dateObject.setSeconds(0);
            if (isSplitCurrent) {
              let newStime = (new Date().getTime() / 1e3).toFixed();
              if (stime <= newStime) {
                stime = newStime;
              }
            } else {
              stime = Date.parse(dateObject.toString()) / 1e3;
              etime = stime + 86400;
            }
          }
          let template = {
            query: {
              bool: {
                must: {
                  function_score: {
                    query: {
                      multi_match: {
                        query: cond,
                        type: "best_fields",
                        fields: [
                          "specialty^2",
                          "fullName^1",
                          "service^2",
                          "facilityName^1"
                        ],
                        fuzziness: "AUTO",
                        max_expansions: 200,
                        prefix_length: 2
                      }
                    }
                  }
                },
                filter: [
                  {
                    range: {
                      avail: {
                        gte: stime,
                        lt: etime,
                        relation: "intersects"
                      }
                    }
                  },
                  {
                    geo_distance: {
                      distance: distance + "mi",
                      "practiceLocation.geoCode": arr[1] + " , " + arr[0]
                    }
                  }
                ]
              }
            },
            size: 100
          };
          const body = yield client.search({
            index: Index_All,
            body: template
          });
          return body["hits"]["hits"];
        });
      },
      queryAllUser(_0) {
        return __async$c(this, arguments, function* ({
          cond = null,
          distance = 30,
          pos = 92805,
          stime,
          etime,
          isSplitCurrent = false
        }) {
          const elasticClient = getItemOfConfig("elasticClient", "https://elasticd.aitmed.io");
          const client = new SearchClient({ hosts: elasticClient });
          let arr = [];
          if (pos) {
            yield GetQuery(pos).then((data) => {
              data = data["data"]["features"][0];
              arr[0] = data.center[0];
              arr[1] = data.center[1];
            }, (err) => {
              if (store.env === "test") {
                console.log("%cError", "background: purple; color: white; display: block;", err);
              }
            });
          }
          if (typeof stime == "string" || typeof etime == "string" || typeof stime == "number" || typeof etime == "number") {
            var d = new Date();
            var dateObject = new Date();
            dateObject.setMonth(d.getMonth() + 1);
            dateObject.setDate(d.getDate());
            dateObject.setFullYear(d.getFullYear());
            dateObject.setHours(0);
            dateObject.setMinutes(0);
            dateObject.setSeconds(0);
            if (isSplitCurrent) {
              let newStime = (new Date().getTime() / 1e3).toFixed();
              if (stime <= newStime) {
                stime = newStime;
              }
            } else {
              stime = Date.parse(dateObject.toString()) / 1e3;
              etime = stime + 86400;
            }
          }
          let template = {
            query: {
              bool: {
                must: [
                  {
                    function_score: {
                      query: {
                        multi_match: {
                          query: cond,
                          type: "best_fields",
                          fields: [
                            "specialty^2",
                            "fullName^1",
                            "service^2",
                            "facilityName^1"
                          ],
                          fuzziness: "AUTO",
                          max_expansions: 200,
                          prefix_length: 2
                        }
                      }
                    }
                  },
                  {
                    range: {
                      avail: {
                        gte: stime,
                        lt: etime,
                        relation: "intersects"
                      }
                    }
                  },
                  {
                    geo_distance: {
                      distance: distance + "mi",
                      "practiceLocation.geoCode": arr[1] + " , " + arr[0]
                    }
                  }
                ]
              }
            },
            size: 1e3
          };
          let template1 = {
            query: {
              bool: {
                must: {
                  function_score: {
                    query: {
                      multi_match: {
                        query: cond,
                        type: "best_fields",
                        fields: [
                          "specialty^2",
                          "fullName^1",
                          "service^2",
                          "facilityName^1"
                        ],
                        fuzziness: "AUTO",
                        max_expansions: 200,
                        prefix_length: 2
                      }
                    }
                  }
                }
              }
            },
            size: 1e3
          };
          const body = yield client.search({
            index: Index_All,
            body: template
          });
          const body1 = yield client.search({
            index: Index_All,
            body: template1
          });
          body["hits"]["hits"].push(...differenceBy_1(body1["hits"]["hits"], body["hits"]["hits"], "_id"));
          if (store.env === "test") {
            console.log("%cGet Search response", "background: purple; color: white; display: block;", { index: Index_All, response: body["hits"]["hits"] });
          }
          return body["hits"]["hits"];
        });
      },
      queryUsers(_0) {
        return __async$c(this, arguments, function* ({
          cond = null,
          distance = 30,
          pos = 92805,
          stime,
          etime,
          isSplitCurrent = false
        }) {
          const elasticClient = getItemOfConfig("elasticClient", "https://elasticd.aitmed.io");
          const client = new SearchClient({ hosts: elasticClient });
          let arr = [];
          if (pos) {
            yield GetQuery(pos).then((data) => {
              data = data["data"]["features"][0];
              arr[0] = data.center[0];
              arr[1] = data.center[1];
            }, (err) => {
              if (store.env === "test") {
                console.log("%cError", "background: purple; color: white; display: block;", err);
              }
            });
          }
          if (typeof stime == "string" || typeof etime == "string" || typeof stime == "number" || typeof etime == "number") {
            var d = new Date();
            var dateObject = new Date();
            dateObject.setMonth(d.getMonth() + 1);
            dateObject.setDate(d.getDate());
            dateObject.setFullYear(d.getFullYear());
            dateObject.setHours(0);
            dateObject.setMinutes(0);
            dateObject.setSeconds(0);
            if (isSplitCurrent) {
              let newStime = (new Date().getTime() / 1e3).toFixed();
              if (stime <= newStime) {
                stime = newStime;
              }
            } else {
              stime = Date.parse(dateObject.toString()) / 1e3;
              etime = stime + 86400;
            }
          }
          let template = {
            query: {
              bool: {
                must: [
                  {
                    function_score: {
                      query: {
                        multi_match: {
                          query: cond,
                          type: "best_fields",
                          fields: [
                            "specialty^2",
                            "fullName^1",
                            "service^2",
                            "facilityName^1"
                          ],
                          fuzziness: "AUTO",
                          max_expansions: 200,
                          prefix_length: 2
                        }
                      }
                    }
                  },
                  {
                    range: {
                      avail: {
                        gte: stime,
                        lt: etime,
                        relation: "intersects"
                      }
                    }
                  },
                  {
                    geo_distance: {
                      distance: distance + "mi",
                      "practiceLocation.geoCode": arr[1] + " , " + arr[0]
                    }
                  }
                ]
              }
            },
            size: 1e3
          };
          let template1 = {
            query: {
              bool: {
                must: {
                  function_score: {
                    query: {
                      multi_match: {
                        query: cond,
                        type: "best_fields",
                        fields: [
                          "specialty^2",
                          "fullName^1",
                          "service^2",
                          "facilityName^1"
                        ],
                        fuzziness: "AUTO",
                        max_expansions: 200,
                        prefix_length: 2
                      }
                    }
                  }
                }
              }
            },
            size: 1e3
          };
          const body = yield client.search({
            index: Index_All,
            body: template
          });
          const body1 = yield client.search({
            index: Index_users,
            body: template1
          });
          body["hits"]["hits"].push(...differenceBy_1(body1["hits"]["hits"], body["hits"]["hits"], "_id"));
          if (store.env === "test") {
            console.log("%cGet Search response", "background: purple; color: white; display: block;", { index: Index_All, response: body["hits"]["hits"] });
          }
          return body["hits"]["hits"];
        });
      },
      call(_0) {
        return __async$c(this, arguments, function* ({ telephone }) {
          window.location.href = "tel:" + telephone;
        });
      },
      queryAllPat(_0) {
        return __async$c(this, arguments, function* ({
          cond = null,
          distance = 30,
          pos = 92805,
          stime,
          etime,
          isSplitCurrent = false
        }) {
          const elasticClient = getItemOfConfig("elasticClient", "https://elasticd.aitmed.io");
          const client = new SearchClient({ hosts: elasticClient });
          let arr = [];
          if (pos) {
            yield GetQuery(pos).then((data) => {
              data = data["data"]["features"][0];
              arr[0] = data.center[0];
              arr[1] = data.center[1];
            }, (err) => {
              if (store.env === "test") {
                console.log("%cError", "background: purple; color: white; display: block;", err);
              }
            });
          }
          if (typeof stime == "string" || typeof etime == "string" || typeof stime == "number" || typeof etime == "number") {
            var d = new Date();
            var dateObject = new Date();
            dateObject.setMonth(d.getMonth() + 1);
            dateObject.setDate(d.getDate());
            dateObject.setFullYear(d.getFullYear());
            dateObject.setHours(0);
            dateObject.setMinutes(0);
            dateObject.setSeconds(0);
            if (isSplitCurrent) {
              let newStime = (new Date().getTime() / 1e3).toFixed();
              if (stime <= newStime) {
                stime = newStime;
              }
            } else {
              stime = Date.parse(dateObject.toString()) / 1e3;
              etime = stime + 86400;
            }
          }
          let templateDoc = {
            query: {
              bool: {
                must: {
                  function_score: {
                    query: {
                      multi_match: {
                        query: cond,
                        type: "best_fields",
                        fields: [
                          "specialty^2",
                          "fullName^1"
                        ],
                        fuzziness: "AUTO",
                        max_expansions: 200,
                        prefix_length: 2
                      }
                    }
                  }
                },
                filter: [
                  {
                    range: {
                      avail: {
                        gte: stime,
                        lt: etime,
                        relation: "intersects"
                      }
                    }
                  },
                  {
                    geo_distance: {
                      distance: distance + "mi",
                      "practiceLocation.geoCode": arr[1] + " , " + arr[0]
                    }
                  }
                ]
              }
            },
            aggs: {
              duplicateCount: {
                terms: {
                  size: 1e3,
                  script: "doc['vid'] +'-'+doc['subtype']"
                },
                aggs: {
                  duplicateDocuments: {
                    top_hits: {}
                  }
                }
              }
            },
            size: 0
          };
          let templateRoom = {
            query: {
              bool: {
                must: [
                  {
                    function_score: {
                      query: {
                        multi_match: {
                          query: cond,
                          type: "best_fields",
                          fields: [
                            "service^2",
                            "facilityName^1"
                          ],
                          fuzziness: "AUTO",
                          max_expansions: 200,
                          prefix_length: 2
                        }
                      }
                    }
                  },
                  {
                    range: {
                      avail: {
                        gte: stime,
                        lt: etime,
                        relation: "intersects"
                      }
                    }
                  },
                  {
                    geo_distance: {
                      distance: distance + "mi",
                      "practiceLocation.geoCode": arr[1] + " , " + arr[0]
                    }
                  }
                ]
              }
            },
            size: 1e3
          };
          const bodyDoc = yield client.search({
            index: Index_doc,
            body: templateDoc
          });
          const bodyRoom = yield client.search({
            index: Index_room,
            body: templateRoom
          });
          let DocList = bodyDoc["aggregations"]["duplicateCount"]["buckets"];
          DocList.forEach((index) => {
            bodyRoom["hits"]["hits"].push(index["duplicateDocuments"]["hits"]["hits"][0]);
          });
          for (let index = 0; index < bodyRoom["hits"]["hits"].length; index++) {
            let st = bodyRoom["hits"]["hits"][index]["_source"]["practiceLocation"]["geoCode"].split(",");
            let start = st[1] + "," + st[0];
            let end = arr[0] + "," + arr[1];
            yield getDistance(start, end).then((data) => {
              data = data["data"];
              bodyRoom["hits"]["hits"][index]["_source"]["practiceLocation"]["distance"] = Math.floor(data["durations"][0][1] * data["sources"][0]["distance"] / 1e3 * 0.62) + "Miles";
            }, (err) => {
              if (store.env === "test") {
                console.log(err);
              }
            });
          }
          return bodyRoom["hits"]["hits"];
        });
      },
      queryDataByType(_0) {
        return __async$c(this, arguments, function* ({
          cond,
          distance = "25",
          pos = 92805,
          stime,
          etime,
          type,
          isSplitCurrent = false
        }) {
          const elasticClient = getItemOfConfig("elasticClient", "https://elasticd.aitmed.io");
          const client = new SearchClient({ hosts: elasticClient });
          let arr = [];
          if (pos) {
            yield GetQuery(pos).then((data) => {
              data = data["data"]["features"][0];
              arr[0] = data.center[0];
              arr[1] = data.center[1];
            }, (err) => {
              if (store.env === "test") {
                console.log("%cError", "background: purple; color: white; display: block;", err);
              }
            });
          }
          if (typeof stime == "string" || typeof etime == "string" || typeof stime == "number" || typeof etime == "number") {
            var d = new Date();
            var dateObject = new Date();
            dateObject.setMonth(d.getMonth() + 1);
            dateObject.setDate(d.getDate());
            dateObject.setFullYear(d.getFullYear());
            dateObject.setHours(0);
            dateObject.setMinutes(0);
            dateObject.setSeconds(0);
            if (isSplitCurrent) {
              let newStime = (new Date().getTime() / 1e3).toFixed();
              if (stime <= newStime) {
                stime = newStime;
              }
            } else {
              stime = Date.parse(dateObject.toString()) / 1e3;
              etime = stime + 86400;
            }
          }
          let templateDoc = {
            query: {
              bool: {
                must: {
                  function_score: {
                    query: {
                      multi_match: {
                        query: cond,
                        type: "best_fields",
                        fields: [
                          "specialty^2",
                          "fullName^1"
                        ],
                        fuzziness: "AUTO",
                        max_expansions: 200,
                        prefix_length: 2
                      }
                    }
                  }
                },
                filter: [
                  {
                    range: {
                      avail: {
                        gte: stime,
                        lt: etime,
                        relation: "intersects"
                      }
                    }
                  },
                  {
                    geo_distance: {
                      distance: distance + "mi",
                      "practiceLocation.geoCode": arr[1] + " , " + arr[0]
                    }
                  },
                  {
                    term: {
                      subtype: type
                    }
                  }
                ]
              }
            },
            aggs: {
              duplicateCount: {
                terms: {
                  size: 1e3,
                  script: "doc['vid']"
                },
                aggs: {
                  duplicateDocuments: {
                    top_hits: {}
                  }
                }
              }
            },
            size: 0
          };
          let templateRoom = {
            query: {
              bool: {
                must: [
                  {
                    function_score: {
                      query: {
                        multi_match: {
                          query: cond,
                          type: "best_fields",
                          fields: [
                            "service^2",
                            "facilityName^1"
                          ],
                          fuzziness: "AUTO",
                          max_expansions: 200,
                          prefix_length: 2
                        }
                      }
                    }
                  },
                  {
                    range: {
                      avail: {
                        gte: stime,
                        lt: etime,
                        relation: "intersects"
                      }
                    }
                  },
                  {
                    geo_distance: {
                      distance: distance + "mi",
                      "practiceLocation.geoCode": arr[1] + " , " + arr[0]
                    }
                  }
                ]
              }
            },
            size: 1e3
          };
          const bodyDoc = yield client.search({
            index: Index_doc,
            body: templateDoc
          });
          const bodyRoom = yield client.search({
            index: Index_room,
            body: templateRoom
          });
          let DocList = bodyDoc["aggregations"]["duplicateCount"]["buckets"];
          DocList.forEach((index) => {
            bodyRoom["hits"]["hits"].push(index["duplicateDocuments"]["hits"]["hits"][0]);
          });
          for (let index = 0; index < bodyRoom["hits"]["hits"].length; index++) {
            let st = bodyRoom["hits"]["hits"][index]["_source"]["practiceLocation"]["geoCode"].split(",");
            let start = st[1] + "," + st[0];
            let end = arr[0] + "," + arr[1];
            yield getDistance(start, end).then((data) => {
              data = data["data"];
              bodyRoom["hits"]["hits"][index]["_source"]["practiceLocation"]["distance"] = Math.floor(data["durations"][0][1] * data["sources"][0]["distance"] / 1e3 * 0.62) + "Miles";
            }, (err) => {
              if (store.env === "test") {
                console.log(err);
              }
            });
          }
          return bodyRoom["hits"]["hits"];
        });
      }
    };
  }

  var __async$b = (__this, __arguments, generator) => {
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
  const aitmedApiHost = "https://api.aitmed.io/";
  const drugBankHost = "https://api-js.drugbank.com/v1/us";
  function generateDrugBankToken() {
    const url = "/drugbank-token/";
    let date = new Date();
    axios__default["default"]({
      url,
      baseURL: aitmedApiHost,
      method: "get",
      headers: {
        "Content-Type": "application/json"
      }
    }).then((response) => {
      if (response["status"] == 200) {
        store.drugbankToken = response["data"]["token"];
        localStorage.setItem("expiredTime", (date.getTime() + 2 * 60 * 60 * 1e3).toString());
        localStorage.setItem("drugbankToken", response["data"]["token"]);
        console.log("test", response["data"]);
      }
    }).catch((error) => {
      if (store.env === "test") {
        console.log(console.log(error));
      }
    });
  }
  function getDrugs(query, drugbank_pcid, type) {
    return __async$b(this, null, function* () {
      let currentDateTime = new Date().getTime();
      let expired = localStorage.getItem("expiredTime");
      let expiredTime = typeof expired == "string" ? parseInt(expired) : 0;
      if (currentDateTime >= expiredTime) {
        yield generateDrugBankToken();
      }
      const drugbankToken = localStorage.getItem("drugbankToken");
      console.log(drugbankToken);
      let url = "/product_concepts";
      if (type == "Route") {
        url = "/product_concepts/" + drugbank_pcid + "/routes";
      } else if (type == "Strength") {
        url = "/product_concepts/" + drugbank_pcid + "/strengths";
      }
      let params = {};
      if (query) {
        params = {
          q: query
        };
      }
      return new Promise((res, rej) => {
        axios__default["default"]({
          url,
          baseURL: drugBankHost,
          method: "get",
          params,
          headers: {
            Authorization: "Bearer " + drugbankToken
          }
        }).then((response) => {
          if (response["status"] == 200) {
            res(response["data"]);
          }
        }).catch((error) => {
          rej(error);
        });
      });
    });
  }
  function getDrugList(queryName) {
    return __async$b(this, null, function* () {
      let url = aitmedApiHost + "sdb/";
      let params = {};
      if (queryName) {
        params = {
          q: queryName
        };
      }
      return new Promise((res, rej) => {
        axios__default["default"]({
          url,
          method: "get",
          params
        }).then((response) => {
          if (store.env === "test") {
            console.log("%cGet Drug response Detail", "background: purple; color: white; display: block;", response["data"]);
          }
          res(response["data"]["DrugList"]);
        }).catch((error) => {
          rej(error);
        });
      });
    });
  }
  function getCPT(query) {
    return __async$b(this, null, function* () {
      const CPTUrl = "https://clinicaltables.nlm.nih.gov/api/hcpcs/v3/search";
      return new Promise((res, rej) => {
        axios__default["default"]({
          url: CPTUrl,
          method: "get",
          params: {
            authenticity_token: "",
            terms: query
          }
        }).then((response) => {
          if (store.env === "test") {
            console.log("%cGet CPT response", "background: purple; color: white; display: block;", response["data"]);
          }
          res(response["data"]);
        }).catch((error) => {
          rej(error);
        });
      });
    });
  }
  var apiRequestService = {
    drugBank(_0) {
      return __async$b(this, arguments, function* ({
        query,
        id,
        type
      }) {
        let response = [];
        yield getDrugs(query, id, type).then((data) => {
          if (store.env === "test") {
            console.log("%cGet Drug response", "background: purple; color: white; display: block;", { data });
          }
          response = data;
        }, (err) => {
          console.log(err);
        });
        return response;
      });
    },
    dataBank(_0) {
      return __async$b(this, arguments, function* ({ query }) {
        let response = [];
        yield getDrugList(query).then((data) => {
          if (store.env === "test") {
            console.log("%cGet Drug response all", "background: purple; color: white; display: block;", { data });
          }
          let preData = data;
          let result = [];
          let drugNameSet = /* @__PURE__ */ new Set();
          for (let item of preData) {
            let drugName = item["DrugName"];
            if (!drugNameSet.has(drugName)) {
              drugNameSet.add(drugName);
              result.push(item);
            }
          }
          if (store.env === "test") {
            console.log("%cGet Drug response", "background: purple; color: white; display: block;", { result });
          }
          response = result;
        }, (err) => {
          console.log(err);
        });
        return response;
      });
    },
    queryCPT(_0) {
      return __async$b(this, arguments, function* ({ query }) {
        let response = [];
        yield getCPT(query).then((data) => {
          if (store.env === "test") {
            console.log("%cGet Drug response", "background: purple; color: white; display: block;", { data });
          }
          response = data[3];
        }, (err) => {
          console.log(err);
        });
        return response;
      });
    }
  };

  var __async$a = (__this, __arguments, generator) => {
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
  function getBitValue(sourceNum, bit) {
    let value = parseInt(sourceNum).toString(2);
    let len = value.length;
    return value[len - bit];
  }
  function setBitValue(sourceNum, bit, targetValue) {
    let value = parseInt(sourceNum).toString(2);
    let len = value.length;
    let valueArray = value.split("");
    valueArray.splice(len - bit, 1, targetValue.toString());
    let newValue = valueArray.join("");
    return parseInt(newValue, 2);
  }
  var ecos = {
    shareDoc(_0) {
      return __async$a(this, arguments, function* ({ sourceDoc, targetEdgeID, targetRoomName, targetFileID }) {
        var _a, _b, _c, _d, _e, _f;
        const document = yield retrieveDocument(sourceDoc.id);
        const note = yield documentToNote$1({ document });
        let content = (_a = note == null ? void 0 : note.name) == null ? void 0 : _a.data;
        if (typeof content === "string") {
          content = yield store.level2SDK.utilServices.base64ToBlob((_b = note == null ? void 0 : note.name) == null ? void 0 : _b.data, (_c = note == null ? void 0 : note.name) == null ? void 0 : _c.type);
        }
        const sharedDoc = yield Document.create({
          content,
          targetRoomName,
          title: (_d = note == null ? void 0 : note.name) == null ? void 0 : _d.title,
          user: (_e = note == null ? void 0 : note.name) == null ? void 0 : _e.user,
          type: note == null ? void 0 : note.type,
          edge_id: targetEdgeID,
          mediaType: (_f = note == null ? void 0 : note.name) == null ? void 0 : _f.type,
          fid: targetFileID
        });
        return sharedDoc;
      });
    },
    shareDocByFid(_0) {
      return __async$a(this, arguments, function* ({ sourceDoc, targetEdgeID, targetRoomName }) {
        var _a, _b, _c, _d, _e, _f;
        const document = yield retrieveDocument(sourceDoc.id);
        const note = yield documentToNote$1({ document });
        let content = (_a = note == null ? void 0 : note.name) == null ? void 0 : _a.data;
        if (typeof content === "string") {
          content = yield store.level2SDK.utilServices.base64ToBlob((_b = note == null ? void 0 : note.name) == null ? void 0 : _b.data, (_c = note == null ? void 0 : note.name) == null ? void 0 : _c.type);
        }
        const sharedDoc = yield Document.create({
          content,
          targetRoomName,
          title: (_d = note == null ? void 0 : note.name) == null ? void 0 : _d.title,
          user: (_e = note == null ? void 0 : note.name) == null ? void 0 : _e.user,
          type: note == null ? void 0 : note.type,
          edge_id: note == null ? void 0 : note.eid,
          fid: targetEdgeID,
          mediaType: (_f = note == null ? void 0 : note.name) == null ? void 0 : _f.type
        });
        return sharedDoc;
      });
    },
    shareDocList(_0) {
      return __async$a(this, arguments, function* ({
        sourceDocList,
        targetEdgeID,
        targetRoomName,
        targetFileID,
        reid
      }) {
        if (!isPopulated(targetEdgeID)) {
          throw new UnableToLocateValue(`Missing reference ${targetEdgeID}`);
        }
        const edge = yield retrieveEdge(targetEdgeID);
        if (!edge)
          throw new AiTmedError({ name: "EDGE_DOES_NOT_EXIST" });
        return Promise.all(sourceDocList.map((sourceDoc) => __async$a(this, null, function* () {
          var _a, _b, _c, _d, _e, _f;
          let content = (_a = sourceDoc == null ? void 0 : sourceDoc.name) == null ? void 0 : _a.data;
          if (typeof content === "string") {
            content = yield store.level2SDK.utilServices.base64ToBlob((_b = sourceDoc == null ? void 0 : sourceDoc.name) == null ? void 0 : _b.data, (_c = sourceDoc == null ? void 0 : sourceDoc.name) == null ? void 0 : _c.type);
          }
          yield Document.nocheckcreate({
            content,
            targetRoomName,
            title: (_d = sourceDoc == null ? void 0 : sourceDoc.name) == null ? void 0 : _d.title,
            user: (_e = sourceDoc == null ? void 0 : sourceDoc.name) == null ? void 0 : _e.user,
            type: sourceDoc == null ? void 0 : sourceDoc.type,
            edge_id: targetEdgeID,
            mediaType: (_f = sourceDoc == null ? void 0 : sourceDoc.name) == null ? void 0 : _f.type,
            fid: targetFileID,
            reid
          });
        })));
      });
    },
    updateDocList({ sourceDocList }) {
      return Promise.all(sourceDocList.map((sourceDoc) => __async$a(this, null, function* () {
        var _a, _b, _c, _d, _e, _f;
        let content = (_a = sourceDoc == null ? void 0 : sourceDoc.name) == null ? void 0 : _a.data;
        if (typeof content === "string") {
          content = yield store.level2SDK.utilServices.base64ToBlob((_b = sourceDoc == null ? void 0 : sourceDoc.name) == null ? void 0 : _b.data, (_c = sourceDoc == null ? void 0 : sourceDoc.name) == null ? void 0 : _c.type);
        }
        if (sourceDoc.bsig != ((_d = localStorage.getItem("user_vid")) == null ? void 0 : _d.toString())) {
          yield store.level2SDK.edgeServices.createEdge({
            bvid: sourceDoc.bsig,
            type: 1030
          });
        }
        yield Document.update(sourceDoc == null ? void 0 : sourceDoc.id, {
          edge_id: sourceDoc.eid,
          content,
          type: sourceDoc == null ? void 0 : sourceDoc.type
        });
        if (sourceDoc.bsig != ((_e = localStorage.getItem("user_vid")) == null ? void 0 : _e.toString())) {
          yield store.level2SDK.edgeServices.createEdge({
            bvid: (_f = localStorage.getItem("user_vid")) == null ? void 0 : _f.toString(),
            type: 1030
          });
        }
      })));
    },
    updateDocListType({ sourceDocList, targetBit, targetValue }) {
      return Promise.all(sourceDocList.map((sourceDoc) => __async$a(this, null, function* () {
        var _a, _b, _c, _d, _e, _f;
        let content = (_a = sourceDoc == null ? void 0 : sourceDoc.name) == null ? void 0 : _a.data;
        if (typeof content === "string") {
          content = yield store.level2SDK.utilServices.base64ToBlob((_b = sourceDoc == null ? void 0 : sourceDoc.name) == null ? void 0 : _b.data, (_c = sourceDoc == null ? void 0 : sourceDoc.name) == null ? void 0 : _c.type);
        }
        if (sourceDoc.bsig != ((_d = localStorage.getItem("user_vid")) == null ? void 0 : _d.toString())) {
          yield store.level2SDK.edgeServices.createEdge({
            bvid: sourceDoc.bsig,
            type: 1030
          });
        }
        let newType = sourceDoc == null ? void 0 : sourceDoc.type;
        let bitValue = getBitValue(sourceDoc == null ? void 0 : sourceDoc.type, targetBit);
        if (bitValue != targetValue) {
          newType = setBitValue(sourceDoc == null ? void 0 : sourceDoc.type, targetBit, targetValue);
          yield Document.update(sourceDoc == null ? void 0 : sourceDoc.id, {
            edge_id: sourceDoc.eid,
            content,
            type: newType
          });
        }
        if (sourceDoc.bsig != ((_e = localStorage.getItem("user_vid")) == null ? void 0 : _e.toString())) {
          yield store.level2SDK.edgeServices.createEdge({
            bvid: (_f = localStorage.getItem("user_vid")) == null ? void 0 : _f.toString(),
            type: 1030
          });
        }
      })));
    },
    updateDocListReid({ sourceDocList, reid }) {
      return Promise.all(sourceDocList.map((sourceDoc) => __async$a(this, null, function* () {
        var _a, _b, _c, _d, _e, _f;
        let content = (_a = sourceDoc == null ? void 0 : sourceDoc.name) == null ? void 0 : _a.data;
        if (typeof content === "string") {
          content = yield store.level2SDK.utilServices.base64ToBlob((_b = sourceDoc == null ? void 0 : sourceDoc.name) == null ? void 0 : _b.data, (_c = sourceDoc == null ? void 0 : sourceDoc.name) == null ? void 0 : _c.type);
        }
        if (sourceDoc.bsig != ((_d = localStorage.getItem("user_vid")) == null ? void 0 : _d.toString())) {
          yield store.level2SDK.edgeServices.createEdge({
            bvid: sourceDoc.bsig,
            type: 1030
          });
        }
        console.log("test", {
          edge_id: sourceDoc.eid,
          content,
          reid
        });
        yield Document.update(sourceDoc == null ? void 0 : sourceDoc.id, {
          edge_id: sourceDoc.eid,
          content,
          type: sourceDoc == null ? void 0 : sourceDoc.type,
          reid
        });
        if (sourceDoc.bsig != ((_e = localStorage.getItem("user_vid")) == null ? void 0 : _e.toString())) {
          yield store.level2SDK.edgeServices.createEdge({
            bvid: (_f = localStorage.getItem("user_vid")) == null ? void 0 : _f.toString(),
            type: 1030
          });
        }
      })));
    },
    updateReidDocListType(_0) {
      return __async$a(this, arguments, function* ({
        sourceDocList,
        targetBit,
        targetValue,
        sCondition,
        eid
      }) {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        let idList;
        const currentUserId = (_a = localStorage.getItem("user_vid")) == null ? void 0 : _a.toString();
        for (let i = 0; i < sourceDocList.length; i++) {
          idList = getIdList([sourceDocList[i].id, currentUserId]);
          let requestOptions = {
            xfname: "reid,ovid",
            scondition: sCondition
          };
          let reidDocs = yield store.level2SDK.documentServices.retrieveDocument({
            idList,
            options: requestOptions
          });
          let reidDocList = reidDocs.data.document;
          if (reidDocList.length == 0) {
            let type = 3584;
            const content = "";
            const targetRoomName = "";
            let bitValue = getBitValue(type, targetBit);
            if (bitValue != targetValue) {
              type = setBitValue(type, targetBit, targetValue);
            }
            yield Document.create({
              content,
              targetRoomName,
              title: "",
              user: "",
              reid: sourceDocList[i].id,
              edge_id: eid,
              type
            });
          }
          for (let j = 0; j < reidDocList.length; j++) {
            const document = reidDocList[j];
            const note = yield documentToNote$1({ document });
            let content = (_b = note == null ? void 0 : note.name) == null ? void 0 : _b.data;
            if (typeof content == "string" && content != "undefined" && ((_c = document == null ? void 0 : document.name) == null ? void 0 : _c.data) != null) {
              content = yield store.level2SDK.utilServices.base64ToBlob((_d = note == null ? void 0 : note.name) == null ? void 0 : _d.data, (_e = note == null ? void 0 : note.name) == null ? void 0 : _e.type);
            }
            const id = yield store.level2SDK.utilServices.uint8ArrayToBase64(note == null ? void 0 : note.bsig);
            const edge_id = yield store.level2SDK.utilServices.uint8ArrayToBase64(note == null ? void 0 : note.eid);
            if (id != ((_f = localStorage.getItem("user_vid")) == null ? void 0 : _f.toString())) {
              yield store.level2SDK.edgeServices.createEdge({
                bvid: id,
                type: 1030
              });
            }
            let newType = note == null ? void 0 : note.type;
            let bitValue = getBitValue(note == null ? void 0 : note.type, targetBit);
            if (bitValue != targetValue) {
              newType = setBitValue(note == null ? void 0 : note.type, targetBit, targetValue);
              yield Document.update(note == null ? void 0 : note.id, {
                edge_id,
                content,
                type: newType
              });
            }
            if (id != ((_g = localStorage.getItem("user_vid")) == null ? void 0 : _g.toString())) {
              yield store.level2SDK.edgeServices.createEdge({
                bvid: (_h = localStorage.getItem("user_vid")) == null ? void 0 : _h.toString(),
                type: 1030
              });
            }
          }
        }
      });
    },
    createFolderTag({ sourceDocList, folder, eid }) {
      let idList;
      const type = 3840;
      const content = "";
      const targetRoomName = "";
      return Promise.all(sourceDocList.map((sourceDoc) => __async$a(this, null, function* () {
        idList = getIdList([sourceDoc.id, folder]);
        const requestOptions = {
          xfname: "reid,fid",
          type: 3840
        };
        const linkDocs = yield store.level2SDK.documentServices.retrieveDocument({
          idList,
          options: requestOptions
        });
        const folderTags = linkDocs.data.document;
        if (folderTags.length == 0) {
          yield Document.create({
            content,
            targetRoomName,
            title: "",
            user: "",
            reid: sourceDoc.id,
            edge_id: eid,
            fid: folder,
            type
          });
        }
      })));
    },
    deleteFolderTag({ sourceDocList, folder }) {
      let idList;
      return Promise.all(sourceDocList.map((sourceDoc) => __async$a(this, null, function* () {
        idList = getIdList([sourceDoc.id, folder]);
        const requestOptions = {
          xfname: "reid,fid",
          type: 3840
        };
        const linkDocs = yield store.level2SDK.documentServices.retrieveDocument({
          idList,
          options: requestOptions
        });
        const folderTags = linkDocs.data.document;
        for (let j = 0; j < folderTags.length; j++) {
          const document = folderTags[j];
          const note = yield documentToNote$1({ document });
          const res = yield store.level2SDK.commonServices.deleteRequest([
            note.id
          ]);
          if (store.env === "test") {
            console.log("%cDelete Object Response", "background: purple; color: white; display: block;", res);
          }
        }
      })));
    },
    copyDocToAttachment(_0) {
      return __async$a(this, arguments, function* ({ sourceDocList, newType }) {
        let res = [];
        yield Promise.all(sourceDocList.map((sourceDoc) => __async$a(this, null, function* () {
          var _a, _b, _c, _d, _e, _f, _g;
          let note = sourceDoc;
          if (Object.keys(sourceDoc).length == 1) {
            const document = yield retrieveDocument(sourceDoc.id);
            note = yield documentToNote$1({ document });
          }
          let content = (_a = note == null ? void 0 : note.name) == null ? void 0 : _a.data;
          if (typeof content === "string") {
            content = yield store.level2SDK.utilServices.base64ToBlob((_b = note == null ? void 0 : note.name) == null ? void 0 : _b.data, (_c = note == null ? void 0 : note.name) == null ? void 0 : _c.type);
          }
          let response = yield Document.create({
            content,
            title: (_d = note == null ? void 0 : note.name) == null ? void 0 : _d.title,
            user: (_e = note == null ? void 0 : note.name) == null ? void 0 : _e.user,
            type: newType,
            edge_id: note == null ? void 0 : note.eid,
            mediaType: (_f = note == null ? void 0 : note.name) == null ? void 0 : _f.type,
            fid: note == null ? void 0 : note.fid
          });
          response.doc.id = yield store.level2SDK.utilServices.uint8ArrayToBase64((_g = response == null ? void 0 : response.doc) == null ? void 0 : _g.id);
          res.push(response);
        })));
        return res;
      });
    },
    generatorSigForOldAccount(_0) {
      return __async$a(this, arguments, function* ({ id, name, sk, phoneNumber }) {
        if (id && name && sk) {
          const response = yield store.level2SDK.Account.generatorSigForOldAccount({
            id,
            userInfo: name,
            sk,
            phoneNumber
          });
          return response;
        }
        return {};
      });
    },
    transformVisitReason(_0) {
      return __async$a(this, arguments, function* ({ vertexId, rootNoteBookId }) {
        var _a, _b, _c, _d;
        if (vertexId && rootNoteBookId) {
          const reasonDocResponse = yield store.level2SDK.documentServices.retrieveDocument({
            idList: getIdList([rootNoteBookId]),
            options: {
              xfname: "eid",
              type: 79360,
              maxcount: 1,
              obfname: "mtime"
            }
          });
          const linkEdgesResponse = yield store.level2SDK.edgeServices.retrieveEdge({
            idList: getIdList([vertexId]),
            options: {
              xfname: "bvid|evid",
              type: 10002,
              scondition: "subtype=196608"
            }
          });
          const reasonDoc = reasonDocResponse.data.document[0];
          const linkEdges = linkEdgesResponse.data.edge;
          if (reasonDoc && (linkEdges == null ? void 0 : linkEdges.length)) {
            const note = yield documentToNote$1({ document: reasonDoc });
            let content = (_a = note == null ? void 0 : note.name) == null ? void 0 : _a.data;
            if (typeof content == "string" && content != "undefined" && ((_b = reasonDoc == null ? void 0 : reasonDoc.name) == null ? void 0 : _b.data) != null) {
              content = yield store.level2SDK.utilServices.base64ToBlob((_c = note == null ? void 0 : note.name) == null ? void 0 : _c.data, (_d = note == null ? void 0 : note.name) == null ? void 0 : _d.type);
            }
            content.reasonForVisit.forEach((element) => {
              element["fee"] = "0$";
              if (element.hasOwnProperty("selectDoc")) {
                element == null ? true : delete element.selectDoc;
              }
            });
            const newContent = {
              reasonForVisit: {
                Telemedicine: content.reasonForVisit,
                OfficeVisits: content.reasonForVisit
              },
              version: 2
            };
            return Promise.all(linkEdges.map((linkEdge) => __async$a(this, null, function* () {
              yield Document.nocheckcreate({
                content: newContent,
                title: "",
                user: "",
                edge_id: linkEdge.eid,
                type: 79360
              });
            })));
          }
          return;
        }
        return;
      });
    }
  };

  var __async$9 = (__this, __arguments, generator) => {
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
  var utils = {
    base64ToBlob({
      data,
      type = "application/pdf"
    }) {
      if (!data)
        return;
      if (typeof data !== "string")
        return;
      if (!isPopulated(data))
        return;
      const blob = store.level2SDK.utilServices.base64ToBlob(data, type);
      console.dir(blob);
      const blobUrl = URL.createObjectURL(blob);
      return blobUrl;
    },
    exists(args) {
      for (let val of Object.values(args)) {
        if (val === "" || val === void 0 || val === null) {
          return false;
        }
      }
      return true;
    },
    log({ value }) {
      console.log(value);
      return;
    },
    prepareDoc(_0) {
      return __async$9(this, arguments, function* ({ doc }) {
        let note;
        if (typeof doc == "string")
          return;
        if (u__namespace.isObj(doc.subtype)) {
          note = doc;
        } else {
          note = yield documentToNote({ document: doc });
        }
        const { name } = note;
        if (!(name == null ? void 0 : name.data))
          return doc;
        if (typeof (name == null ? void 0 : name.data) !== "string")
          return doc;
        if (!isPopulated(name == null ? void 0 : name.data))
          return doc;
        if (typeof (name == null ? void 0 : name.data) === "string" && !(name == null ? void 0 : name.data.match(/^([A-Za-z0-9+/]{4})*([A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{2}==)?$/g)))
          return note;
        const blob = store.level2SDK.utilServices.base64ToBlob(name == null ? void 0 : name.data, name == null ? void 0 : name.type);
        const blobUrl = URL.createObjectURL(blob);
        name.data = blobUrl;
        return note;
      });
    },
    prepareDocToPath(id) {
      return __async$9(this, null, function* () {
        let path;
        let type;
        if (id && typeof id == "string" && !id.includes(".")) {
          const doc = yield retrieveDocument(id);
          yield documentToNote({ document: doc }).then((note) => {
            var _a, _b, _c;
            let blob = store.level2SDK.utilServices.base64ToBlob((_a = note == null ? void 0 : note.name) == null ? void 0 : _a.data, (_b = note == null ? void 0 : note.name) == null ? void 0 : _b.type);
            type = (_c = note == null ? void 0 : note.name) == null ? void 0 : _c.type;
            path = URL.createObjectURL(blob);
          }, (error) => {
            if (store.env === "test") {
              console.log(error);
            }
          });
          if (type === "application/pdf") {
            return {
              type,
              url: path
            };
          }
          return {
            type,
            url: path
          };
        }
        return;
      });
    },
    toaster({ toastMessage }) {
      alert(toastMessage);
      return;
    },
    getCountryCode(num) {
      return num.split(" ")[0];
    },
    getPhoneNumber(num) {
      return num.split(" ")[1];
    },
    getTempParams() {
      let tempParams = localStorage.getItem("tempParams");
      tempParams = typeof tempParams == "string" ? JSON.parse(tempParams) : {};
      return tempParams;
    },
    setTempParams({ Object: Object2 }) {
      if (Object2) {
        let tempParams = localStorage.getItem("tempParams");
        tempParams = typeof tempParams == "string" ? JSON.parse(tempParams) : {};
        let keys = Object2.keys(Object2);
        for (let i = 0; i < keys.length; i++) {
          tempParams[keys[i]] = Object2[keys[i]];
        }
        localStorage.setItem("tempParams", JSON.stringify(tempParams));
      }
    },
    setTimer({ timeUnix }) {
      let start = new Date().getTime();
      while (new Date().getTime() - start < timeUnix) {
        continue;
      }
    },
    removeTempParams() {
      localStorage.removeItem("tempParams");
    },
    removeKeyTempParams({ key }) {
      let tempParams = localStorage.getItem("tempParams");
      tempParams = typeof tempParams == "string" ? JSON.parse(tempParams) : {};
      delete tempParams[key];
      localStorage.setItem("tempParams", JSON.stringify(tempParams));
    },
    getFileSize({
      object,
      units = "kb"
    }) {
      let objectSize = parseFloat(object["size"]);
      if (objectSize && units) {
        switch (units) {
          case "kb":
            return (objectSize / 1024).toFixed(1);
          case "mb":
            return (objectSize / (1024 * 1024)).toFixed(1);
        }
      }
      return 0;
    },
    getFileName({ object }) {
      return object["name"];
    },
    copyToClip({ object }) {
      console.log(`copy to clipboard!! ${object}`);
      let text = `${object}`;
      var dummy = document.createElement("textarea");
      document.body.appendChild(dummy);
      dummy.value = text;
      dummy.select();
      document.execCommand("copy");
      document.body.removeChild(dummy);
      return 1;
    }
  };

  var typeCheck = {
    phoneNumber({ phoneNumber, countryCode }) {
      let validPhoneNumber;
      if (phoneNumber.includes("-")) {
        validPhoneNumber = phoneNumber.replace(/-/g, "");
      } else {
        validPhoneNumber = phoneNumber;
      }
      const countryCodeAndPhoneNumber = countryCode + " " + validPhoneNumber;
      if (countryCodeAndPhoneNumber.match(/^[+][0-9]+\s\d{10}$/)) {
        return true;
      } else {
        return false;
      }
    },
    userName(userName) {
      let len = userName.length;
      if (len > 5 && len < 17) {
        return true;
      } else {
        return false;
      }
    }
  };

  var math = {
    random: function() {
      const rand = Math.random();
      return rand;
    },
    add: function({ num1, num2 }) {
      return num1 + num2;
    },
    greater: function({ num1, num2 }) {
      return num1 >= num2;
    },
    lessthanSize: function({ object, key }) {
      let objectSize = object["size"];
      if (parseFloat(objectSize).toString() !== "NaN") {
        let maxSize = Math.floor(key * Math.pow(1024, 2));
        return parseFloat(objectSize) > maxSize ? false : true;
      }
      return false;
    },
    cumulative: function({ numArr }) {
      let total = 0;
      for (let i = 0; i < numArr.length; i++) {
        total = total + parseInt(numArr[i]);
      }
      return total;
    },
    toFixedNum({ num }) {
      console.log((+num).toFixed(2));
      return (+num).toFixed(2);
    },
    FixedLimit({ num }) {
      return String(num).length - String(num).indexOf(".") - 1 === 2 ? true : false;
    },
    calculateAge({ dateTime, splite = "/" }) {
      let date = new Date();
      let birthday = dateTime.split(splite);
      let today = [date.getMonth() + 1, date.getDate(), date.getFullYear()];
      let age = today.map((value, index) => {
        return value - +birthday[index];
      });
      if (age[1] < 0) {
        let lastMonth = new Date(today[2], today[0], 0);
        age[0]--;
        age[1] += lastMonth.getDate();
      }
      if (age[0] < 0) {
        age[2]--;
        age[0] += 12;
      }
      return age[2];
    }
  };

  var FCM = {
    getFCMToken({ token }) {
      return token;
    },
    getAPPID({ appName }) {
      const appNameSHA256 = hash_1.sha256().update(appName).digest();
      const appNameUint8Array = new Uint8Array(appNameSHA256);
      const appNameSHA256Slice = appNameUint8Array.slice(0, 16);
      const appNameSHA256SliceB64 = store.level2SDK.utilServices.uint8ArrayToBase64(appNameSHA256Slice);
      return appNameSHA256SliceB64;
    },
    getFCMTokenSHA256Half({ token }) {
      const tokenSHA256 = hash_1.sha256().update(token).digest();
      const tokenSHA256Uint8Array = new Uint8Array(tokenSHA256);
      const tokenSHA256Slice = tokenSHA256Uint8Array.slice(0, 16);
      const tokenSHA256SliceB64 = store.level2SDK.utilServices.uint8ArrayToBase64(tokenSHA256Slice);
      return tokenSHA256SliceB64;
    }
  };

  var __async$8 = (__this, __arguments, generator) => {
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
  var payment = {
    createSqPaymentForm() {
      const sqNode___ = document.createElement("script");
      sqNode___.type = "text/javascript";
      sqNode___.src = "https://js.squareupsandbox.com/v2/paymentform";
      sqNode___.onload = () => {
        window.paymentForm = new SqPaymentForm({
          applicationId: "sandbox-sq0idb-NZW9Yiwvqiqf5zAaaoFQgA",
          inputClass: "sq-input",
          autoBuild: false,
          inputStyles: [
            {
              fontSize: "16px",
              lineHeight: "24px",
              padding: "16px",
              placeholderColor: "#a0a0a0",
              backgroundColor: "transparent"
            }
          ],
          cardNumber: {
            elementId: "sq-card-number",
            placeholder: "Card Number"
          },
          cvv: {
            elementId: "sq-cvv",
            placeholder: "CVV"
          },
          expirationDate: {
            elementId: "sq-expiration-date",
            placeholder: "MM/YY"
          },
          postalCode: {
            elementId: "sq-postal-code",
            placeholder: "Postal"
          },
          callbacks: {
            cardNonceResponseReceived: function(errors, nonce, cardData) {
              return __async$8(this, null, function* () {
                if (errors) {
                  console.error("Encountered Square errors:");
                  errors.forEach(function(error) {
                    console.error("  " + error.message);
                  });
                  alert("Unable to process your payment at this time. Please try again later.");
                  return;
                }
                const formContainer = document.getElementById("form-container");
                const nonceElement = document.createElement("div");
                nonceElement.setAttribute("type", "hidden");
                nonceElement.setAttribute("id", "card-nonce");
                formContainer == null ? void 0 : formContainer.appendChild(nonceElement);
                document.getElementById("card-nonce").value = nonce;
                alert("Please click continue to finish the payment.");
                delete window.onGetCardNonce;
                delete window.paymentForm;
              });
            }
          }
        });
        function onGetCardNonce(event) {
          console.log(event);
          event.preventDefault();
          paymentForm.requestCardNonce();
        }
        window.onGetCardNonce = onGetCardNonce;
        paymentForm.build();
      };
      document.body.appendChild(sqNode___);
    },
    getPaymentNonce() {
      var _a, _b;
      const iframes = Array.from(document.getElementsByClassName("page"));
      if (iframes.length) {
        const iframe = iframes[0];
        if (iframe) {
          const iframeDoc = (_a = iframe.contentWindow) == null ? void 0 : _a.document;
          (_b = iframe.contentWindow) == null ? void 0 : _b.postMessage({
            getMeTheToken: true
          }, iframe.contentWindow.origin);
          const nonceElem2 = iframeDoc == null ? void 0 : iframeDoc.getElementById("card-nonce");
          const token = nonceElem2 == null ? void 0 : nonceElem2.value;
          console.log({ iframeDoc });
          console.log({ nonceElem: nonceElem2 });
          console.log({ token });
          if (token)
            return token;
        } else {
          console.log(`%cCould not find the page component iframe`, `color:#ec0000;`);
        }
      }
      const nonceElem = document.getElementById("card-nonce");
      if (nonceElem) {
        return nonceElem.value;
      } else {
        console.log(`%cNonce element using selector "#card-nonce" not found`, `color:#ec0000;`);
      }
      return;
    }
  };

  var __defProp$4 = Object.defineProperty;
  var __defProps$4 = Object.defineProperties;
  var __getOwnPropDescs$4 = Object.getOwnPropertyDescriptors;
  var __getOwnPropSymbols$5 = Object.getOwnPropertySymbols;
  var __hasOwnProp$5 = Object.prototype.hasOwnProperty;
  var __propIsEnum$5 = Object.prototype.propertyIsEnumerable;
  var __defNormalProp$4 = (obj, key, value) => key in obj ? __defProp$4(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __spreadValues$4 = (a, b) => {
    for (var prop in b || (b = {}))
      if (__hasOwnProp$5.call(b, prop))
        __defNormalProp$4(a, prop, b[prop]);
    if (__getOwnPropSymbols$5)
      for (var prop of __getOwnPropSymbols$5(b)) {
        if (__propIsEnum$5.call(b, prop))
          __defNormalProp$4(a, prop, b[prop]);
      }
    return a;
  };
  var __spreadProps$4 = (a, b) => __defProps$4(a, __getOwnPropDescs$4(b));
  var __objRest$3 = (source, exclude) => {
    var target = {};
    for (var prop in source)
      if (__hasOwnProp$5.call(source, prop) && exclude.indexOf(prop) < 0)
        target[prop] = source[prop];
    if (source != null && __getOwnPropSymbols$5)
      for (var prop of __getOwnPropSymbols$5(source)) {
        if (exclude.indexOf(prop) < 0 && __propIsEnum$5.call(source, prop))
          target[prop] = source[prop];
      }
    return target;
  };
  var __async$7 = (__this, __arguments, generator) => {
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
  function builtIn({ pageName, apiObject, dispatch }) {
    const pathArr = apiObject.api.split(".").slice(1);
    const builtInFnsObj = builtInFns();
    const builtInFn = get_1(builtInFnsObj, pathArr);
    return (input) => __async$7(this, null, function* () {
      const { dataKey, dataIn, dataOut } = cloneDeep_1(apiObject || {});
      const currentVal = yield dispatch({
        type: dispatchActionType.GET_DATA,
        payload: {
          dataKey: dataIn ? dataIn : dataKey,
          pageName
        }
      });
      let res;
      try {
        if (store.env === "test") {
          console.log(`%cBuiltIn Fn:${pathArr} Request `, `background: purple; color: white; display: block;`, __spreadValues$4(__spreadValues$4({}, currentVal), input));
        }
        const data = yield builtInFn(__spreadValues$4(__spreadValues$4({}, currentVal), input));
        res = data;
        if (store.env === "test") {
          console.log(`%cBuiltIn Fn:${pathArr} Response`, `background: purple; color: white; display: block;`, res);
        }
      } catch (error) {
        throw error;
      }
      if (Array.isArray(res) && res.length > 0 || isObject$1(res)) {
        yield dispatch({
          type: dispatchActionType.UPDATE_DATA,
          payload: {
            pageName,
            dataKey: dataOut ? dataOut : dataKey,
            data: res
          }
        });
      }
      return res;
    });
  }
  function builtInFns(args = {}) {
    const { dispatch, processPopulate, getPage, emit, SearchClient } = args;
    return {
      string: stringServices,
      eccNaCl: encryptionServices,
      object: objectServices,
      array: arrayServices,
      number: numberService,
      date: dateService,
      search: getSearchBuiltIns({ SearchClient }),
      apiRequest: apiRequestService,
      typeCheck,
      ecos,
      utils,
      math,
      FCM,
      payment,
      getRootNotebook(args2) {
        return __async$7(this, null, function* () {
          var _b;
          let idList = [];
          const _a = args2, { id, maxcount, sCondition, type } = _a, populatedCurrentVal = __objRest$3(_a, ["id", "maxcount", "sCondition", "type"]);
          let requestOptions = __spreadValues$4({}, populatedCurrentVal);
          if (maxcount) {
            requestOptions.maxcount = parseInt(maxcount);
          }
          if (type) {
            requestOptions.type = parseInt(type);
          }
          if (sCondition) {
            requestOptions.scondition = sCondition;
          }
          idList = Array.isArray(id) ? [...id] : [id];
          function getRoot(idList2, requestOptions2) {
            return __async$7(this, null, function* () {
              var _a2;
              const { data: data2 } = yield store.level2SDK.edgeServices.retrieveEdge({
                idList: ((_a2 = idList2 == null ? void 0 : idList2.filter) == null ? void 0 : _a2.call(idList2, Boolean)) || [],
                options: requestOptions2
              });
              return data2;
            });
          }
          let data = yield getRoot(idList, requestOptions);
          while (((_b = data == null ? void 0 : data.edge) == null ? void 0 : _b.length) == 0) {
            data = yield getRoot(idList, requestOptions);
          }
          return data;
        });
      },
      createNewAccount(args2) {
        return __async$7(this, null, function* () {
          var _a;
          const { phoneNumber, password, userName, firstName, lastName, fullName } = args2.name;
          let validPhoneNumber;
          if (phoneNumber.includes("-")) {
            validPhoneNumber = phoneNumber.replace(/-/g, "");
          } else {
            validPhoneNumber = phoneNumber;
          }
          validPhoneNumber = args2.name.countryCode + " " + validPhoneNumber;
          const data = yield create$4(validPhoneNumber, password, (_a = args2.name) == null ? void 0 : _a.verificationCode, { userName, firstName, lastName, fullName }, args2.type);
          let sk = localStorage.getItem("sk");
          if (dispatch) {
            yield dispatch({
              type: dispatchActionType.UPDATE_DATA,
              payload: {
                pageName: "builtIn",
                dataKey: "builtIn.UserVertex",
                data: __spreadProps$4(__spreadValues$4({}, data), { sk })
              }
            });
          }
          return data;
        });
      },
      signIn(_0) {
        return __async$7(this, arguments, function* ({ phoneNumber, password, verificationCode }) {
          console.log(`[builtIn.signIn]`, arguments[0]);
          let validPhoneNumber;
          if (phoneNumber.includes("-")) {
            validPhoneNumber = phoneNumber.replace(/-/g, "");
          } else {
            validPhoneNumber = phoneNumber;
          }
          const data = yield login(validPhoneNumber, password, verificationCode);
          let sk = localStorage.getItem("sk");
          if (dispatch) {
            yield dispatch({
              type: dispatchActionType.UPDATE_DATA,
              payload: {
                pageName: "builtIn",
                dataKey: "builtIn.UserVertex",
                data: __spreadProps$4(__spreadValues$4({}, data), { sk })
              }
            });
          }
          return data;
        });
      },
      loginByPassword(_0) {
        return __async$7(this, arguments, function* (password) {
          const data = yield loginByPassword(password);
          let sk = localStorage.getItem("sk");
          if (dispatch) {
            console.log(`[builtIn.loginByPassword]`, {
              password: arguments[0],
              data,
              sk
            });
            yield dispatch({
              type: dispatchActionType.UPDATE_DATA,
              payload: {
                pageName: "builtIn",
                dataKey: "builtIn.UserVertex",
                data: __spreadProps$4(__spreadValues$4({}, data), { sk })
              }
            });
          }
        });
      },
      storeCredentials({ pk, sk, esk, userId }) {
        localStorage.setItem("sk", sk);
        localStorage.setItem("pk", pk);
        localStorage.setItem("esk", esk);
        localStorage.setItem("user_vid", userId);
        return;
      },
      currentDateTime: (() => Date.now())(),
      SignInOk() {
        return __async$7(this, null, function* () {
          const status = yield getStatus();
          if (status.code !== 0) {
            return false;
          }
          return true;
        });
      },
      uploadDocument(_0) {
        return __async$7(this, arguments, function* ({
          title,
          tags = [],
          content,
          type,
          dataType = 0
        }) {
          var _a, _b;
          const globalStr = localStorage.getItem("Global");
          const globalParse = globalStr !== null ? JSON.parse(globalStr) : null;
          if (!globalParse) {
            throw new Error("There was no rootNotebook found.Please sign in.");
          }
          const edge_id = globalParse.rootNotebook.edge.id;
          const res = yield Document.create({
            edge_id,
            title,
            tags,
            content,
            type,
            dataType
          });
          if (res) {
            return { docName: (_a = res == null ? void 0 : res.name) == null ? void 0 : _a.title, url: (_b = res == null ? void 0 : res.deat) == null ? void 0 : _b.url };
          }
          return res;
        });
      },
      isIOS() {
        if (typeof window !== "undefined") {
          const userAgent = window.navigator.userAgent || window.navigator.vendor;
          if (/iPad|iPhone|iPod/.test(userAgent) && !("MSStream" in window)) {
            return true;
          }
        }
        return false;
      },
      isAndroid() {
        if (typeof window !== "undefined") {
          const userAgent = window.navigator.userAgent || window.navigator.vendor;
          if (/android/i.test(userAgent)) {
            return true;
          }
        }
        return false;
      },
      isIOSBroswer() {
        if (typeof window !== "undefined") {
          const userAgent = window.navigator.userAgent || window.navigator.vendor;
          if (/iPad|iPhone|iPod/.test(userAgent) && !("MSStream" in window)) {
            return true;
          }
        }
        return false;
      },
      isAndroidBroswer() {
        if (typeof window !== "undefined") {
          const userAgent = window.navigator.userAgent || window.navigator.vendor;
          if (/android/i.test(userAgent)) {
            return true;
          }
        }
        return false;
      },
      isAndroidBrowser() {
        if (typeof window !== "undefined") {
          const userAgent = window.navigator.userAgent || window.navigator.vendor;
          if (/android/i.test(userAgent)) {
            return true;
          }
        }
        return false;
      },
      stringCompare(string1, string2) {
        return string1 === string2;
      },
      toCSV(value) {
        const getField = (obj) => {
          let fields = Object.keys(obj);
          let replacer = function(key, value2) {
            return value2 === null ? "" : value2;
          };
          let csv = [obj].map(function(row) {
            return fields.map(function(fieldName) {
              return JSON.stringify(row[fieldName], replacer);
            }).join(",");
          });
          csv.unshift(fields.join(","));
          return csv.join("\r\n");
        };
        if (u__namespace.isArr(value))
          return value.map(getField);
        if (u__namespace.isObj(value))
          return getField(value);
        return String(value);
      },
      downloadFromS3(url) {
        return __async$7(this, null, function* () {
          const response = yield store.level2SDK.documentServices.downloadDocumentFromS3({ url });
          return response == null ? void 0 : response.data;
        });
      },
      cleanLocalStorage() {
        return __async$7(this, null, function* () {
          var _a;
          store.level2SDK.Account.logoutClean();
          localStorage.removeItem("Global");
          if (dispatch) {
            const res = " ";
            yield dispatch({
              type: dispatchActionType.UPDATE_DATA,
              payload: {
                dataKey: "Global",
                data: res
              }
            });
          }
          if (processPopulate && getPage && emit) {
            const processed = processPopulate({
              source: (_a = yield getPage("BaseDataModel")) == null ? void 0 : _a[0],
              lookFor: [".", "..", "=", "~"]
            });
            emit({
              type: emitType.SET_ROOT_PROPERTIES,
              payload: { properties: processed }
            });
            localStorage.setItem("Global", JSON.stringify(processed == null ? void 0 : processed["Global"]));
          }
          return;
        });
      },
      searchCache(_0) {
        return __async$7(this, arguments, function* ({ key }) {
          if (dispatch && key) {
            const searchResponse = yield dispatch({
              type: dispatchActionType.SEARCH_CACHE,
              payload: { key }
            });
            return searchResponse;
          }
          return [];
        });
      }
    };
  }

  function setAPIBuffer(apiObject) {
    try {
      let limit;
      if (store.env === "test") {
        limit = 60;
      } else {
        limit = 3;
      }
      const apiDispatchBufferString = localStorage.getItem("api-dispatch-buffer");
      const hash = Base64__default["default"].stringify(sha256__default["default"](JSON.stringify(apiObject)));
      const hashSub = hash.substring(0, 8);
      const currentTimestamp = moment__default["default"](Date.now());
      let apiDispatchBufferObject;
      if (apiDispatchBufferString !== null) {
        apiDispatchBufferObject = JSON.parse(apiDispatchBufferString);
      } else {
        apiDispatchBufferObject = {};
      }
      let apiDispatchBufferStringUpdate;
      let pass;
      if (!(hashSub in apiDispatchBufferObject)) {
        apiDispatchBufferObject[hashSub] = currentTimestamp.toString();
        apiDispatchBufferStringUpdate = JSON.stringify(apiDispatchBufferObject);
        localStorage.setItem("api-dispatch-buffer", apiDispatchBufferStringUpdate);
        pass = true;
      } else {
        const oldTimestamp = moment__default["default"](apiDispatchBufferObject[hashSub]);
        const timeDiff = currentTimestamp.diff(oldTimestamp, "seconds");
        if (timeDiff > limit) {
          apiDispatchBufferObject[hashSub] = currentTimestamp.toString();
          pass = true;
        } else {
          apiDispatchBufferObject[`${hashSub}FAILED_REPEAT`] = currentTimestamp.toString();
          pass = false;
        }
      }
      for (let [key, val] of Object.entries(apiDispatchBufferObject)) {
        const timeDiff = currentTimestamp.diff(val, "seconds");
        if (timeDiff > limit) {
          delete apiDispatchBufferObject[key];
        }
      }
      apiDispatchBufferStringUpdate = JSON.stringify(apiDispatchBufferObject);
      localStorage.setItem("api-dispatch-buffer", apiDispatchBufferStringUpdate);
      return pass;
    } catch (error) {
      console.log(error);
    }
  }

  var __defProp$3 = Object.defineProperty;
  var __defProps$3 = Object.defineProperties;
  var __getOwnPropDescs$3 = Object.getOwnPropertyDescriptors;
  var __getOwnPropSymbols$4 = Object.getOwnPropertySymbols;
  var __hasOwnProp$4 = Object.prototype.hasOwnProperty;
  var __propIsEnum$4 = Object.prototype.propertyIsEnumerable;
  var __defNormalProp$3 = (obj, key, value) => key in obj ? __defProp$3(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __spreadValues$3 = (a, b) => {
    for (var prop in b || (b = {}))
      if (__hasOwnProp$4.call(b, prop))
        __defNormalProp$3(a, prop, b[prop]);
    if (__getOwnPropSymbols$4)
      for (var prop of __getOwnPropSymbols$4(b)) {
        if (__propIsEnum$4.call(b, prop))
          __defNormalProp$3(a, prop, b[prop]);
      }
    return a;
  };
  var __spreadProps$3 = (a, b) => __defProps$3(a, __getOwnPropDescs$3(b));
  var __objRest$2 = (source, exclude) => {
    var target = {};
    for (var prop in source)
      if (__hasOwnProp$4.call(source, prop) && exclude.indexOf(prop) < 0)
        target[prop] = source[prop];
    if (source != null && __getOwnPropSymbols$4)
      for (var prop of __getOwnPropSymbols$4(source)) {
        if (exclude.indexOf(prop) < 0 && __propIsEnum$4.call(source, prop))
          target[prop] = source[prop];
      }
    return target;
  };
  var __async$6 = (__this, __arguments, generator) => {
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
  function remove({ pageName, apiObject, dispatch }) {
    return () => __async$6(this, null, function* () {
      const { dataKey, dataIn } = cloneDeep_1(apiObject || {});
      const currentVal = yield dispatch({
        type: dispatchActionType.GET_DATA,
        payload: {
          dataKey: dataIn ? dataIn : dataKey,
          pageName
        }
      });
      let populatedCurrentVal = yield dispatch({
        type: dispatchActionType.POPULATE_OBJECT,
        payload: { object: currentVal, pageName }
      });
      const _a = populatedCurrentVal, { api, id } = _a, options = __objRest$2(_a, ["api", "id"]);
      let res;
      if (Array.isArray(id)) {
        id.forEach((element) => __async$6(this, null, function* () {
          try {
            if (store.env === "test") {
              console.log("%cDelete Object Request", "background: purple; color: white; display: block;", __spreadProps$3(__spreadValues$3({}, options), { id: element }));
            }
            const shouldPass = setAPIBuffer({
              api: "dx",
              element
            });
            if (!shouldPass)
              return;
            const { data } = yield store.level2SDK.commonServices.deleteRequest([
              element
            ]);
            res = data;
            if (store.env === "test") {
              console.log("%cDelete Object Response", "background: purple; color: white; display: block;", res);
            }
          } catch (error) {
            throw error;
          }
        }));
      }
      if (typeof id == "string") {
        try {
          if (store.env === "test") {
            console.log("%cDelete Object Request", "background: purple; color: white; display: block;", __spreadProps$3(__spreadValues$3({}, options), { id }));
          }
          const shouldPass = setAPIBuffer({
            api: "dx",
            id
          });
          if (!shouldPass)
            return;
          const { data } = yield store.level2SDK.commonServices.deleteRequest([
            id
          ]);
          res = data;
          if (store.env === "test") {
            console.log("%cDelete Object Response", "background: purple; color: white; display: block;", res);
          }
        } catch (error) {
          throw error;
        }
      }
    });
  }

  function services(key) {
    const fns = {
      ce: create$2,
      re: get$2,
      cv: create$1,
      rv: get$1,
      cd: create,
      rd: get,
      dx: remove,
      builtIn: builtIn
    };
    return fns[key];
  }

  var __defProp$2 = Object.defineProperty;
  var __defProps$2 = Object.defineProperties;
  var __getOwnPropDescs$2 = Object.getOwnPropertyDescriptors;
  var __getOwnPropSymbols$3 = Object.getOwnPropertySymbols;
  var __hasOwnProp$3 = Object.prototype.hasOwnProperty;
  var __propIsEnum$3 = Object.prototype.propertyIsEnumerable;
  var __defNormalProp$2 = (obj, key, value) => key in obj ? __defProp$2(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __spreadValues$2 = (a, b) => {
    for (var prop in b || (b = {}))
      if (__hasOwnProp$3.call(b, prop))
        __defNormalProp$2(a, prop, b[prop]);
    if (__getOwnPropSymbols$3)
      for (var prop of __getOwnPropSymbols$3(b)) {
        if (__propIsEnum$3.call(b, prop))
          __defNormalProp$2(a, prop, b[prop]);
      }
    return a;
  };
  var __spreadProps$2 = (a, b) => __defProps$2(a, __getOwnPropDescs$2(b));
  var __objRest$1 = (source, exclude) => {
    var target = {};
    for (var prop in source)
      if (__hasOwnProp$3.call(source, prop) && exclude.indexOf(prop) < 0)
        target[prop] = source[prop];
    if (source != null && __getOwnPropSymbols$3)
      for (var prop of __getOwnPropSymbols$3(source)) {
        if (exclude.indexOf(prop) < 0 && __propIsEnum$3.call(source, prop))
          target[prop] = source[prop];
      }
    return target;
  };
  var __async$5 = (__this, __arguments, generator) => {
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
  function populateKeys({
    source,
    lookFor,
    locations
  }) {
    let output = source;
    Object.keys(output).forEach((key) => {
      if (key.startsWith(lookFor)) {
        let parent = {};
        let currKey = key;
        if (lookFor === "..") {
          currKey = currKey.slice(1);
        }
        for (let location of locations) {
          try {
            let arr = currKey.split(".");
            let res;
            try {
              res = arr.slice(1).reduce((o, key2) => o[key2], location);
            } catch (error) {
              throw new UnableToLocateValue("Value not found", error instanceof Error ? error : new Error(String(error)));
            }
            if (res)
              parent = cloneDeep_1(res);
          } catch (error) {
            if (error instanceof UnableToLocateValue)
              continue;
            else
              throw error;
          }
        }
        if (u__namespace.keys(parent).length && output[key]) {
          const mergedObjects = mergeDeep(populateKeys({ source: parent, lookFor, locations: [...locations] }), populateKeys({
            source: output[key],
            lookFor,
            locations: [...locations]
          }));
          output = __spreadValues$2(__spreadValues$2({}, output), mergedObjects);
          delete output[key];
        } else if (u__namespace.keys(parent).length) {
          delete parent[key];
          const mergedObjects = populateKeys({
            source: parent,
            lookFor,
            locations
          });
          output = mergeDeep(mergedObjects, output);
          delete output[key];
        }
      } else if (u__namespace.isObj(output[key])) {
        output[key] = populateKeys({
          source: output[key],
          lookFor,
          locations: [...locations]
        });
      } else if (u__namespace.isArr(output[key])) {
        const copy = [...output[key]];
        output[key].length = 0;
        for (let item of copy) {
          if (u__namespace.isObj(item)) {
            item = populateKeys({
              source: item,
              lookFor,
              locations: [...locations]
            });
          }
          output[key].push(item);
        }
      }
    });
    return output;
  }
  function createFuncAttacher({
    cadlObject,
    dispatch,
    force = false
  }) {
    let keys = u__namespace.keys(cadlObject);
    let pageName = keys.length > 1 ? "Global" : keys[0];
    return attachFnsHelper({
      pageName,
      cadlObject,
      dispatch,
      force
    });
    function attachFnsHelper({
      pageName: pageName2,
      cadlObject: cadlObject2,
      dispatch: dispatch2,
      force: force2 = false
    }) {
      let output = cadlObject2;
      if (pageName2 === "Global" && !force2)
        return output;
      if (u__namespace.isObj(output)) {
        u__namespace.keys(output).forEach((key) => {
          if (u__namespace.isObj(output[key])) {
            output[key] = attachFnsHelper({
              pageName: pageName2,
              cadlObject: output[key],
              dispatch: dispatch2
            });
          } else if (u__namespace.isArr(output[key])) {
            const copy = [...output[key]];
            output[key].length = 0;
            for (let item of copy) {
              if (u__namespace.isObj(item)) {
                item = attachFnsHelper({ pageName: pageName2, cadlObject: item, dispatch: dispatch2 });
              }
              output[key].push(item);
            }
          } else if (u__namespace.isStr(output[key]) && key === "api") {
            const pathToNameField = `${output.dataOut || output.dataKey || ""}.name`;
            const _a = output, { api, _nonce } = _a, restOptions = __objRest$1(_a, ["api", "_nonce"]);
            const apiSplit = api.split(".");
            const apiType = apiSplit[0];
            const apiFunc = services(apiType)({
              pageName: pageName2,
              apiObject: output,
              dispatch: dispatch2
            });
            if (/(ce|cd|cv|builtIn)/.test(apiType)) {
              if (isPopulated(output))
                output = [pathToNameField, apiFunc];
            } else {
              if (isPopulated(restOptions)) {
                const args = { pageName: pageName2, apiObject: output, dispatch: dispatch2 };
                output = services(apiType)(args);
              }
            }
          }
        });
      }
      return output;
    }
  }
  function evalState({
    pageName,
    updateObject,
    dispatch
  }) {
    function onEvalState(a) {
      return __async$5(this, null, function* () {
        return dispatch({
          type: dispatchActionType.EVAL_OBJECT,
          payload: { pageName: a.pageName, updateObject: a.updateObject }
        });
      });
    }
    return onEvalState.bind(this, {
      pageName,
      updateObject,
      dispatch
    });
  }
  function replaceEvalObject(_0) {
    return __async$5(this, arguments, function* ({
      pageName,
      cadlObject,
      dispatch
    }) {
      const cadlCopy = cadlObject;
      if (u__namespace.isObj(cadlObject) && ("emit" in cadlObject || "actions" in cadlObject)) ;
      for (const key of u__namespace.keys(cadlCopy)) {
        if (key === "object" && nt__namespace.Identify.action.evalObject(cadlCopy)) {
          const updateObject = cloneDeep_1(cadlCopy[key]);
          cadlCopy[key] = evalState({ pageName, updateObject, dispatch });
          if (pageName === "SignIn" || pageName === "CreateNewAccount" || pageName === "SignUp") {
            yield dispatch({
              type: dispatchActionType.ADD_FUNCTION,
              payload: {
                pageName,
                fn: evalState({ pageName, updateObject, dispatch })
              }
            });
          }
        } else if (u__namespace.isObj(cadlCopy[key])) {
          cadlCopy[key] = yield replaceEvalObject({
            pageName,
            cadlObject: cadlCopy[key],
            dispatch
          });
        } else if (u__namespace.isArr(cadlCopy[key])) {
          const currentLength = cadlCopy[key].length;
          for (let index = 0; index < currentLength; index++) {
            cadlCopy[key][index] = yield replaceEvalObject({
              pageName,
              cadlObject: cadlCopy[key][index],
              dispatch
            });
          }
        }
      }
      return cadlCopy;
    });
  }
  function populateString({
    source,
    lookFor,
    skip,
    locations = [],
    path,
    dispatch,
    pageName
  }) {
    if (skip && skip.includes(source))
      return source;
    if (!source.startsWith(lookFor))
      return source;
    let currVal = source;
    let replacement;
    if (lookFor === "~") {
      currVal = ".myBaseUrl";
    } else if (lookFor === "_" && currVal.includes(".")) {
      let charArr = currVal.split("");
      let copyPath = clone_1(path) || [];
      let currChar = charArr.shift();
      while (currChar !== "." && charArr.length > 0) {
        if (currChar === "_")
          copyPath.pop();
        currChar = charArr.shift();
      }
      replacement = "." + copyPath.concat(charArr.join("")).join(".");
      return replacement;
    } else if (lookFor === "..") {
      currVal = currVal.slice(1);
    } else if (lookFor === "=") {
      if (source.startsWith("=.."))
        currVal = currVal.slice(2);
      else if (source.startsWith("=."))
        currVal = currVal.slice(1);
    }
    if (currVal.startsWith("."))
      currVal = currVal.slice(1);
    if (currVal.startsWith("$"))
      currVal = currVal.slice(1);
    for (let location of locations) {
      try {
        replacement = dot__default["default"].pick(currVal, location);
        if (currVal === ".myBaseUrl" && !replacement) {
          replacement = dot__default["default"].pick(".baseUrl", location);
        }
        if (replacement && lookFor == "~") {
          replacement = replacement + source.substring(2);
          break;
        } else if ((replacement || replacement === "" || replacement === 0) && replacement !== source) {
          if (u__namespace.isStr(replacement) && replacement.startsWith(lookFor)) {
            return populateString({
              source: replacement,
              lookFor,
              skip,
              locations: [...locations],
              path,
              pageName,
              dispatch
            });
          } else {
            break;
          }
        }
      } catch (error) {
        if (error instanceof UnableToLocateValue)
          continue;
        else
          throw error;
      }
    }
    if (!u__namespace.isUnd(replacement) && replacement !== source) {
      return replacement;
    }
    if (!!isPopulated(source)) {
      if (store.env === "test" && path) {
        console.log(`%cReference Not Found in ${pageName}`, "background: orange; color: black; display: block;", { [path.join(".")]: source });
      }
    }
    return source;
  }
  function populateArray({
    source,
    lookFor,
    skip,
    locations,
    path,
    dispatch,
    pageName,
    skipIf = true
  }) {
    let sourceCopy = source;
    if (path) {
      var previousKey = path[path.length - 1] || "";
    }
    const copy = [...sourceCopy];
    sourceCopy.length = 0;
    let replacement = copy.reduce((acc, elem, i) => {
      let index = "[" + i + "]";
      if (u__namespace.isArr(elem)) {
        elem = populateArray({
          source: elem,
          skip,
          lookFor,
          locations: [...locations],
          path: path == null ? void 0 : path.slice(0, -1).concat(previousKey + index),
          dispatch,
          pageName,
          skipIf
        });
      } else if (u__namespace.isObj(elem)) {
        if (!("actionType" in elem && elem.actionType === "evalObject" && elem.object && u__namespace.isObj(elem.object) || u__namespace.isArr(elem.object))) {
          elem = populateObject({
            source: elem,
            skip,
            lookFor,
            locations: [...locations],
            path: path == null ? void 0 : path.slice(0, -1).concat(previousKey + index),
            dispatch,
            pageName,
            skipIf
          });
        }
      } else if (typeof elem === "string") {
        elem = populateString({
          source: elem,
          skip,
          lookFor,
          locations: [...locations],
          path: path == null ? void 0 : path.slice(0, -1).concat(previousKey + index),
          dispatch,
          pageName
        });
      }
      acc.push(elem);
      return acc;
    }, []);
    sourceCopy.push(...replacement);
    copy.length = 0;
    return sourceCopy;
  }
  function populateObject({
    source = {},
    lookFor,
    locations,
    skip = [],
    path = [],
    dispatch,
    pageName,
    skipIf = true
  }) {
    var _a;
    let sourceCopy = source;
    for (const key of u__namespace.keys(sourceCopy)) {
      let index = key;
      let isBuiltIn = key.includes("builtIn");
      let shouldSkipIf = false;
      let shouldSkipBuiltIn = false;
      key === "if" && skipIf && (shouldSkipIf = true);
      isBuiltIn && skip.includes("builtIn") && (shouldSkipBuiltIn = true);
      if (key !== "dataKey" && !skip.includes(key) && !shouldSkipIf && !shouldSkipBuiltIn) {
        const options = {
          source: sourceCopy[key],
          skip,
          lookFor,
          path: path.concat(index),
          dispatch,
          pageName
        };
        if (u__namespace.isObj(sourceCopy[key])) {
          if (!(nt__namespace.Identify.action.evalObject(sourceCopy[key]) && u__namespace.isObj(sourceCopy[key].object)) || u__namespace.isArr((_a = sourceCopy[key]) == null ? void 0 : _a.object)) {
            sourceCopy[key] = populateObject(__spreadProps$2(__spreadValues$2({}, options), {
              locations: [...locations],
              skipIf
            }));
          }
        } else if (u__namespace.isArr(sourceCopy[key])) {
          sourceCopy[key] = populateArray(__spreadProps$2(__spreadValues$2({}, options), {
            locations: [...locations],
            skipIf
          }));
        } else if (u__namespace.isStr(sourceCopy[key])) {
          if (nt__namespace.Identify.reference(key) && !key.startsWith("=.builtIn")) {
            if (!hasPropertyDescriptor(sourceCopy, key)) {
              const obj = sourceCopy;
              const value = obj[key];
              const options2 = {
                dispatch,
                locations: [...locations],
                lookFor,
                pageName,
                path: path.concat(index),
                source: value,
                skip
              };
              const getter = () => {
                return populateString(options2);
              };
              defineProperty(obj, key, getter);
            }
          } else {
            sourceCopy[key] = populateString({
              dispatch,
              locations: [...locations],
              lookFor,
              pageName,
              path: path.concat(index),
              source: sourceCopy[key],
              skip
            });
          }
        }
      }
    }
    return sourceCopy;
  }
  function populateVals({
    source,
    lookFor,
    locations,
    skip,
    pageName,
    dispatch
  }) {
    let sourceCopy = source;
    for (let symbol of lookFor) {
      sourceCopy = (u__namespace.isStr(sourceCopy) ? populateString : populateObject)({
        source: sourceCopy,
        lookFor: symbol,
        skip,
        locations: [...locations],
        pageName,
        dispatch
      });
    }
    return sourceCopy;
  }
  function replaceUint8ArrayWithBase64(source) {
    let sourceCopy = cloneDeep_1(source || {});
    if (u__namespace.isObj(source)) {
      Object.keys(sourceCopy).forEach((key) => {
        if (sourceCopy[key] instanceof Uint8Array) {
          sourceCopy[key] = store.level2SDK.utilServices.uint8ArrayToBase64(sourceCopy[key]);
        } else if (u__namespace.isObj(sourceCopy[key])) {
          sourceCopy[key] = replaceUint8ArrayWithBase64(sourceCopy[key]);
        } else if (u__namespace.isArr(sourceCopy[key]) && !(sourceCopy[key] instanceof Uint8Array)) {
          sourceCopy[key] = sourceCopy[key].map((elem) => replaceUint8ArrayWithBase64(elem));
        }
      });
    } else if (u__namespace.isArr(source)) {
      sourceCopy = source.map((elem) => replaceUint8ArrayWithBase64(elem));
    }
    return sourceCopy;
  }
  function replaceVars({ vars, source }) {
    const withVals = populateObject({
      source,
      lookFor: "$",
      locations: [vars],
      skipIf: false
    });
    return withVals;
  }

  function hasAbortPopup(value) {
    if (value) {
      if (Array.isArray(value)) {
        return value.some((v) => nt__namespace.Identify.action.popUp(v) && v.wait);
      }
      if (typeof value === "object") {
        return nt__namespace.Identify.action.popUp(value) && value.wait;
      }
    }
    return false;
  }

  class CheckStopWord {
    constructor() {
      this.stopWords = "a about above after again against all am an and any are aren't as at be because been before being below between both but by can't cannot could couldn't did didn't do does doesn't doing don't down during each few for from further had hadn't has hasn't have haven't having he he'd he'll he's her here here's hers herself him himself his how how's i i'd i'll i'm i've if in into is isn't it it's its itself let's me more most mustn't my myself no nor not of off on once only or other ought our ours ourselves out over own same shan't she she'd she'll she's should shouldn't so some such than that that's the their theirs them themselves then there there's these they they'd they'll they're they've this those through to too under until up very was wasn't we we'd we'll we're we've were weren't what what's when when's where where's which while who who's whom why why's with won't would wouldn't you you'd you'll you're you've your yours yourself yourselves json application/json";
      this.stopWordMap = {};
      let stopWordList = this.stopWords.split(" ");
      stopWordList.forEach((word) => {
        this.stopWordMap[word] = true;
      });
    }
    isStopWord(aWord) {
      if (this.stopWordMap[aWord])
        return true;
      return false;
    }
    FilterStopWords(content) {
      const contentArr = content.split("\\s");
      const filteredArr = contentArr.filter((word) => {
        return !this.isStopWord(word);
      });
      return filteredArr.toString();
    }
  }

  const checkStopWord = new CheckStopWord();
  function getObjValues(obj) {
    let values = Object.values(obj);
    let contentMap = /* @__PURE__ */ new Map();
    for (const val of values) {
      if (isObject$1(val)) {
        let rslt2 = getObjValues(val);
        for (const v2 of rslt2) {
          contentMap.set(v2, "");
        }
      } else if (u__namespace.isStr(val)) {
        let lval = val.toLowerCase();
        let res = lval.split(/\W+/);
        for (const v2 of res) {
          if (v2.length && !checkStopWord.isStopWord(v2)) {
            contentMap.set(v2, "");
          }
        }
      }
    }
    let result = [];
    for (let key of contentMap.keys()) {
      result.push(key);
    }
    return result;
  }
  function extract(content) {
    let rslt = [];
    if (isObject$1(content)) {
      rslt = getObjValues(content);
    } else if (u__namespace.isStr(content)) {
      rslt.push(content);
    }
    return rslt;
  }

  class FuzzyIndexCreator {
    initialMapping(indexStr) {
      indexStr = indexStr.toLowerCase();
      indexStr = indexStr.replace(/[aeiouy]+/g, "a");
      indexStr = indexStr.replace("^gh", "g");
      indexStr = indexStr.replace("^g[eiy]", "j");
      indexStr = indexStr.replace("^geo", "jo");
      indexStr = indexStr.replace("^gen", "jn");
      indexStr = indexStr.replace(/chr/g, "kr");
      indexStr = indexStr.replace(/[aeiou]r/g, "a");
      indexStr = indexStr.replace(/c[ei]/g, "sa");
      indexStr = indexStr.replace(/cc/g, "c");
      indexStr = indexStr.replace(/dd/g, "d");
      indexStr = indexStr.replace(/gg/g, "g");
      indexStr = indexStr.replace(/ll/g, "l");
      indexStr = indexStr.replace(/mm/g, "m");
      indexStr = indexStr.replace(/nn/g, "n");
      indexStr = indexStr.replace(/pp/g, "p");
      indexStr = indexStr.replace(/rr/g, "r");
      indexStr = indexStr.replace(/ss/g, "s");
      indexStr = indexStr.replace(/tt/g, "t");
      indexStr = indexStr.replace(/zz/g, "z");
      indexStr = indexStr.replace(/gh/g, "");
      indexStr = indexStr.replace(/ph/g, "f");
      indexStr = indexStr.replace(/pt/g, "d");
      indexStr = indexStr.replace(/ti/g, "s");
      indexStr = indexStr.replace(/ci/g, "s");
      indexStr = indexStr.replace(/cl/g, "k");
      indexStr = indexStr.replace(/ng/g, "n");
      indexStr = indexStr.replace(/gn/g, "n");
      indexStr = indexStr.replace(/h/g, "");
      indexStr = indexStr.replace("^i", "j");
      indexStr = indexStr.replace("^u", "j");
      indexStr = indexStr.replace(/[+]/g, "");
      indexStr = indexStr.replace(/\W/g, "`");
      indexStr = indexStr.replace(/0/g, "`");
      indexStr = indexStr.replace(/[123]+/g, "{");
      indexStr = indexStr.replace(/[456]+/g, "|");
      indexStr = indexStr.replace(/[789]+/g, "}");
      indexStr = indexStr.replace("^y", "a");
      return indexStr;
    }
    toFuzzyInt64(initMapping) {
      let asciiChar = [
        " ",
        "a",
        "b",
        "c",
        "d",
        "e",
        "f",
        "g",
        "h",
        "i",
        "j",
        "k",
        "l",
        "m",
        "n",
        "o",
        "p",
        "q",
        "r",
        "s",
        "t",
        "u",
        "v",
        "w",
        "x",
        "y",
        "z",
        "{",
        "|",
        "}"
      ];
      let hexMapping = [
        0,
        1,
        2,
        11,
        3,
        1,
        4,
        5,
        0,
        1,
        6,
        7,
        8,
        9,
        9,
        1,
        2,
        10,
        8,
        11,
        3,
        1,
        12,
        12,
        11,
        1,
        11,
        13,
        14,
        15
      ];
      let returnvalue = JSBI__default["default"].BigInt(0);
      for (let i = 0; i < Math.min(initMapping.length, 16); i++) {
        let ch = initMapping.charAt(i);
        let idx = ch === "`" ? 0 : asciiChar.indexOf(ch);
        if (idx >= 0 && idx < hexMapping.length) {
          returnvalue = JSBI__default["default"].leftShift(returnvalue, JSBI__default["default"].BigInt(4));
          returnvalue = JSBI__default["default"].bitwiseOr(returnvalue, JSBI__default["default"].BigInt(hexMapping[idx]));
        }
      }
      return parseInt(returnvalue.toString());
    }
    toFuzzyHex(initMapping) {
      let asciiChar = [
        " ",
        "a",
        "b",
        "c",
        "d",
        "e",
        "f",
        "g",
        "h",
        "i",
        "j",
        "k",
        "l",
        "m",
        "n",
        "o",
        "p",
        "q",
        "r",
        "s",
        "t",
        "u",
        "v",
        "w",
        "x",
        "y",
        "z",
        "{",
        "|",
        "}"
      ];
      let hexMapping = [
        "0",
        "1",
        "2",
        "B",
        "3",
        "1",
        "6",
        "5",
        "!",
        "1",
        "6",
        "7",
        "8",
        "9",
        "9",
        "1",
        "2",
        "A",
        "8",
        "B",
        "3",
        "1",
        "C",
        "C",
        "B",
        "1",
        "B",
        "D",
        "E",
        "F"
      ];
      let str = "";
      for (let i = 0; i < Math.min(initMapping.length, 16); i++) {
        let ch = initMapping.charAt(i);
        let idx = ch === "`" ? 0 : asciiChar.indexOf(ch);
        if (idx >= 0 && idx < hexMapping.length) {
          const hexValue = hexMapping[idx];
          str += hexValue;
        }
      }
      return str;
    }
  }

  var __getOwnPropSymbols$2 = Object.getOwnPropertySymbols;
  var __hasOwnProp$2 = Object.prototype.hasOwnProperty;
  var __propIsEnum$2 = Object.prototype.propertyIsEnumerable;
  var __objRest = (source, exclude) => {
    var target = {};
    for (var prop in source)
      if (__hasOwnProp$2.call(source, prop) && exclude.indexOf(prop) < 0)
        target[prop] = source[prop];
    if (source != null && __getOwnPropSymbols$2)
      for (var prop of __getOwnPropSymbols$2(source)) {
        if (exclude.indexOf(prop) < 0 && __propIsEnum$2.call(source, prop))
          target[prop] = source[prop];
      }
    return target;
  };
  var __async$4 = (__this, __arguments, generator) => {
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
  function getDispatcher(cadl) {
    const handleDispatch = {
      [dispatchActionType.ADD_FUNCTION]: (_0) => __async$4(this, [_0], function* ({ payload }) {
        const { pageName, fn } = payload;
        if (cadl.root.actions[pageName]) {
          const payload2 = { dataKey: `actions.${pageName}.update`, value: fn };
          cadl.emit({ type: emitType.SET_VALUE, payload: payload2 });
        } else {
          cadl.emit({
            type: emitType.SET_VALUE,
            payload: { dataKey: `actions.${pageName}`, value: { update: fn } }
          });
        }
      }),
      [dispatchActionType.EVAL_OBJECT]: (_0) => __async$4(this, [_0], function* ({ payload }) {
        let { pageName, updateObject } = payload;
        let results;
        if (u__namespace.isStr(updateObject)) {
          updateObject = yield cadl.handleEvalString({
            stringArg: updateObject,
            pageName
          });
        }
        if (u__namespace.isObj(updateObject)) {
          results = yield cadl.handleEvalObject({
            object: updateObject,
            pageName
          });
        } else if (u__namespace.isArr(updateObject)) {
          results = yield cadl.handleEvalArray({
            array: updateObject,
            pageName
          });
        }
        yield cadl.dispatch({
          type: dispatchActionType.POPULATE,
          payload: { pageName: "Global" }
        });
        yield cadl.dispatch({ type: dispatchActionType.UPDATE_LOCAL_STORAGE });
        return results;
      }),
      [dispatchActionType.FONTDB_OPREATE]: (_0) => __async$4(this, [_0], function* ({ payload }) {
        const funcName = payload == null ? void 0 : payload.funcName;
        if (funcName) {
          switch (funcName) {
            case "getLastestDocsByType":
              return cadl.indexRepository.getLastestDocsByType(payload);
            case "getAllDocsByType":
              return cadl.indexRepository.getAllDocsByType(payload);
          }
        }
      }),
      [dispatchActionType.GET_CACHE]: ({ payload }) => {
        return cadl.getApiCache(payload.cacheIndex);
      },
      [dispatchActionType.GET_DATA](_0) {
        return __async$4(this, arguments, function* ({
          payload: { dataKey = "", pageName = "" } = {}
        }) {
          if (!dataKey)
            return;
          const pathArr = dataKey.split(".");
          return bridge(get_1(cadl.root[pageName], pathArr), () => get_1(cadl.root, pathArr));
        });
      },
      [dispatchActionType.IF_OBJECT]: (_0) => __async$4(this, [_0], function* ({ payload }) {
        return cadl.handleIfCommand({
          pageName: payload == null ? void 0 : payload.pageName,
          ifCommand: payload == null ? void 0 : payload.updateObject
        });
      }),
      [dispatchActionType.INSERT_TO_INDEX_TABLE]: (_0) => __async$4(this, [_0], function* ({ payload }) {
        let doc = [];
        if (u__namespace.isArr(payload.doc.doc)) {
          doc = payload.doc.doc;
        } else {
          doc = payload.doc;
        }
        for (let item of u__namespace.filter(Boolean, u__namespace.array(doc))) {
          let content = item == null ? void 0 : item.name;
          const contentAfterExtraction = extract(content);
          const fuzzyIndexCreator = new FuzzyIndexCreator();
          let docId = item == null ? void 0 : item.id;
          if (docId instanceof Uint8Array) {
            docId = store.level2SDK.utilServices.uint8ArrayToBase64(docId);
          }
          for (let key of contentAfterExtraction) {
            const initialMapping = fuzzyIndexCreator.initialMapping(key);
            const fKey = fuzzyIndexCreator.toFuzzyInt64(initialMapping);
            cadl.indexRepository.insertIndexData({
              kText: key,
              docId,
              docType: item.type,
              fKey,
              score: 0
            });
          }
        }
      }),
      [dispatchActionType.INSERT_TO_OBJECT_TABLE]: (_0) => __async$4(this, [_0], function* ({ payload }) {
        const doc = payload.doc;
        let docId = doc.id;
        if (docId instanceof Uint8Array) {
          docId = store.level2SDK.utilServices.uint8ArrayToBase64(docId);
        }
        const isInObjectCache = cadl.indexRepository.getDocById(docId);
        if (isInObjectCache == null ? void 0 : isInObjectCache.length)
          return;
        const cachedDoc = cadl.indexRepository.getDocById(docId);
        if (!(cachedDoc == null ? void 0 : cachedDoc.length)) {
          cadl.indexRepository.cacheDoc(doc);
        }
      }),
      [dispatchActionType.POPULATE](_0) {
        return __async$4(this, arguments, function* ({ payload }) {
          let pageName = (payload == null ? void 0 : payload.pageName) || "";
          let obj = cloneDeep_1(cadl.root[pageName]);
          for (const op of [".", "..", "~"]) {
            obj = populateObject({
              source: obj,
              lookFor: op,
              locations: op == "~" ? [cadl] : [cadl.root, cadl.root[pageName]]
            });
          }
          obj = createFuncAttacher({
            cadlObject: obj,
            dispatch: cadl.dispatch.bind(cadl)
          });
          cadl.emit({
            type: emitType.SET_ROOT_PROPERTIES,
            payload: { properties: { [pageName]: obj } }
          });
          yield cadl.dispatch({ type: dispatchActionType.UPDATE_LOCAL_STORAGE });
        });
      },
      [dispatchActionType.POPULATE_OBJECT](_0) {
        return __async$4(this, arguments, function* ({
          payload: { copy = false, object, pageName = "" } = {}
        }) {
          let populatedObject;
          let sourceObject = copy ? cloneDeep_1(object) : object;
          populatedObject = populateObject({
            source: sourceObject,
            lookFor: "=",
            locations: [cadl.root, cadl.root[pageName]]
          });
          return populatedObject;
        });
      },
      [dispatchActionType.SEARCH_CACHE](_0) {
        return __async$4(this, arguments, function* ({
          payload: { key = "", sCondition = "" } = {}
        }) {
          return cadl.indexRepository.search(key, sCondition);
        });
      },
      [dispatchActionType.SET_API_BUFFER](_0) {
        return __async$4(this, arguments, function* ({
          payload
        }) {
          var _a;
          const apiObject = payload == null ? void 0 : payload.apiObject;
          try {
            let limit = store.env === "test" ? 60 : 3;
            let hash2 = Base64__default["default"].stringify(sha256__default["default"](JSON.stringify(apiObject)));
            let currentTimestamp = moment__default["default"](Date.now());
            let apiDispatchBufferObject = cadl.root.apiCache;
            let pass = false;
            if (!(hash2 in apiDispatchBufferObject)) {
              pass = true;
            } else {
              const oldTimestamp = moment__default["default"]((_a = apiDispatchBufferObject[hash2]) == null ? void 0 : _a.timestamp);
              const timeDiff = currentTimestamp.diff(oldTimestamp, "seconds");
              if (timeDiff > limit) {
                apiDispatchBufferObject[hash2].timestamp = currentTimestamp.toString();
                pass = true;
              } else {
                apiDispatchBufferObject[`${hash2}FAILED_REPEAT`] = {
                  timestamp: currentTimestamp.toString(),
                  request: apiObject
                };
                pass = false;
              }
            }
            for (let [key, val] of u__namespace.entries(apiDispatchBufferObject)) {
              const timeDiff = currentTimestamp.diff(val == null ? void 0 : val.timestamp, "seconds");
              if (timeDiff > limit)
                delete apiDispatchBufferObject[key];
            }
            return { pass, cacheIndex: hash2 };
          } catch (error) {
            console.log(error);
            return { pass: false, cacheIndex: hash };
          }
        });
      },
      [dispatchActionType.SET_CACHE](_0) {
        return __async$4(this, arguments, function* ({ payload }) {
          cadl.emit({ type: emitType.SET_CACHE, payload });
        });
      },
      [dispatchActionType.UPDATE_DATA](_0) {
        return __async$4(this, arguments, function* ({ payload }) {
          let { pageName, dataKey, data: rawData } = payload || {};
          let data = replaceUint8ArrayWithBase64(rawData);
          let pathArr = dataKey ? dataKey.split(".") : "";
          if (pageName === "builtIn") {
            cadl.emit({
              type: emitType.SET_VALUE,
              payload: { dataKey: pathArr, value: data }
            });
          } else if (!dataKey) {
            return;
          } else {
            let isRoot = isCapitalized(dataKey);
            let currentVal = get_1(isRoot ? cadl.root : cadl.root[pageName], pathArr);
            let mergedVal;
            let shouldReplace = false;
            if (u__namespace.isArr(currentVal)) {
              mergedVal = u__namespace.array(data);
            } else if (isRoot) {
              mergedVal = u__namespace.isArr(data) ? data[0] : data;
            } else if (u__namespace.isObj(currentVal) && u__namespace.isArr(data)) {
              mergedVal = !data.length ? currentVal : data.length == 1 && data[0] || void 0;
            } else {
              mergedVal = data;
            }
            if (mergedVal == null ? void 0 : mergedVal.jwt) {
              for (const kind of ["doc", "edge", "vertex"]) {
                if (u__namespace.isArr(mergedVal[kind]) && !mergedVal[kind].length) {
                  shouldReplace = true;
                  break;
                }
              }
            }
            const payload2 = {
              dataKey: pathArr,
              value: mergedVal,
              replace: shouldReplace
            };
            if (!isRoot)
              payload2.pageName = pageName;
            cadl.emit({ type: emitType.SET_VALUE, payload: payload2 });
          }
          yield cadl.dispatch({ type: dispatchActionType.UPDATE_LOCAL_STORAGE });
        });
      },
      [dispatchActionType.UPDATE_LOCAL_STORAGE]: () => __async$4(this, null, function* () {
        var _a;
        if (u__namespace.isBrowser()) {
          const esk = localStorage.getItem("esk");
          if (esk) {
            const _b = (_a = cadl.root) == null ? void 0 : _a.Global, rest = __objRest(_b, ["globalRegister"]);
            localStorage.setItem("Global", JSON.stringify(rest));
          }
        }
      })
    };
    const dispatch = (action) => {
      var _a;
      return (_a = handleDispatch[action == null ? void 0 : action.type]) == null ? void 0 : _a.call(handleDispatch, action);
    };
    return dispatch;
  }

  /**
   * This function is like `assignValue` except that it doesn't assign
   * `undefined` values.
   *
   * @private
   * @param {Object} object The object to modify.
   * @param {string} key The key of the property to assign.
   * @param {*} value The value to assign.
   */
  function assignMergeValue(object, key, value) {
    if ((value !== undefined && !eq_1(object[key], value)) ||
        (value === undefined && !(key in object))) {
      _baseAssignValue(object, key, value);
    }
  }

  var _assignMergeValue = assignMergeValue;

  /** `Object#toString` result references. */
  var objectTag = '[object Object]';

  /** Used for built-in method references. */
  var funcProto = Function.prototype,
      objectProto = Object.prototype;

  /** Used to resolve the decompiled source of functions. */
  var funcToString = funcProto.toString;

  /** Used to check objects for own properties. */
  var hasOwnProperty = objectProto.hasOwnProperty;

  /** Used to infer the `Object` constructor. */
  var objectCtorString = funcToString.call(Object);

  /**
   * Checks if `value` is a plain object, that is, an object created by the
   * `Object` constructor or one with a `[[Prototype]]` of `null`.
   *
   * @static
   * @memberOf _
   * @since 0.8.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a plain object, else `false`.
   * @example
   *
   * function Foo() {
   *   this.a = 1;
   * }
   *
   * _.isPlainObject(new Foo);
   * // => false
   *
   * _.isPlainObject([1, 2, 3]);
   * // => false
   *
   * _.isPlainObject({ 'x': 0, 'y': 0 });
   * // => true
   *
   * _.isPlainObject(Object.create(null));
   * // => true
   */
  function isPlainObject(value) {
    if (!isObjectLike_1(value) || _baseGetTag(value) != objectTag) {
      return false;
    }
    var proto = _getPrototype(value);
    if (proto === null) {
      return true;
    }
    var Ctor = hasOwnProperty.call(proto, 'constructor') && proto.constructor;
    return typeof Ctor == 'function' && Ctor instanceof Ctor &&
      funcToString.call(Ctor) == objectCtorString;
  }

  var isPlainObject_1 = isPlainObject;

  /**
   * Gets the value at `key`, unless `key` is "__proto__" or "constructor".
   *
   * @private
   * @param {Object} object The object to query.
   * @param {string} key The key of the property to get.
   * @returns {*} Returns the property value.
   */
  function safeGet(object, key) {
    if (key === 'constructor' && typeof object[key] === 'function') {
      return;
    }

    if (key == '__proto__') {
      return;
    }

    return object[key];
  }

  var _safeGet = safeGet;

  /**
   * Converts `value` to a plain object flattening inherited enumerable string
   * keyed properties of `value` to own properties of the plain object.
   *
   * @static
   * @memberOf _
   * @since 3.0.0
   * @category Lang
   * @param {*} value The value to convert.
   * @returns {Object} Returns the converted plain object.
   * @example
   *
   * function Foo() {
   *   this.b = 2;
   * }
   *
   * Foo.prototype.c = 3;
   *
   * _.assign({ 'a': 1 }, new Foo);
   * // => { 'a': 1, 'b': 2 }
   *
   * _.assign({ 'a': 1 }, _.toPlainObject(new Foo));
   * // => { 'a': 1, 'b': 2, 'c': 3 }
   */
  function toPlainObject(value) {
    return _copyObject(value, keysIn_1(value));
  }

  var toPlainObject_1 = toPlainObject;

  /**
   * A specialized version of `baseMerge` for arrays and objects which performs
   * deep merges and tracks traversed objects enabling objects with circular
   * references to be merged.
   *
   * @private
   * @param {Object} object The destination object.
   * @param {Object} source The source object.
   * @param {string} key The key of the value to merge.
   * @param {number} srcIndex The index of `source`.
   * @param {Function} mergeFunc The function to merge values.
   * @param {Function} [customizer] The function to customize assigned values.
   * @param {Object} [stack] Tracks traversed source values and their merged
   *  counterparts.
   */
  function baseMergeDeep(object, source, key, srcIndex, mergeFunc, customizer, stack) {
    var objValue = _safeGet(object, key),
        srcValue = _safeGet(source, key),
        stacked = stack.get(srcValue);

    if (stacked) {
      _assignMergeValue(object, key, stacked);
      return;
    }
    var newValue = customizer
      ? customizer(objValue, srcValue, (key + ''), object, source, stack)
      : undefined;

    var isCommon = newValue === undefined;

    if (isCommon) {
      var isArr = isArray_1(srcValue),
          isBuff = !isArr && isBuffer_1(srcValue),
          isTyped = !isArr && !isBuff && isTypedArray_1(srcValue);

      newValue = srcValue;
      if (isArr || isBuff || isTyped) {
        if (isArray_1(objValue)) {
          newValue = objValue;
        }
        else if (isArrayLikeObject_1(objValue)) {
          newValue = _copyArray(objValue);
        }
        else if (isBuff) {
          isCommon = false;
          newValue = _cloneBuffer(srcValue, true);
        }
        else if (isTyped) {
          isCommon = false;
          newValue = _cloneTypedArray(srcValue, true);
        }
        else {
          newValue = [];
        }
      }
      else if (isPlainObject_1(srcValue) || isArguments_1(srcValue)) {
        newValue = objValue;
        if (isArguments_1(objValue)) {
          newValue = toPlainObject_1(objValue);
        }
        else if (!isObject_1(objValue) || isFunction_1(objValue)) {
          newValue = _initCloneObject(srcValue);
        }
      }
      else {
        isCommon = false;
      }
    }
    if (isCommon) {
      // Recursively merge objects and arrays (susceptible to call stack limits).
      stack.set(srcValue, newValue);
      mergeFunc(newValue, srcValue, srcIndex, customizer, stack);
      stack['delete'](srcValue);
    }
    _assignMergeValue(object, key, newValue);
  }

  var _baseMergeDeep = baseMergeDeep;

  /**
   * The base implementation of `_.merge` without support for multiple sources.
   *
   * @private
   * @param {Object} object The destination object.
   * @param {Object} source The source object.
   * @param {number} srcIndex The index of `source`.
   * @param {Function} [customizer] The function to customize merged values.
   * @param {Object} [stack] Tracks traversed source values and their merged
   *  counterparts.
   */
  function baseMerge(object, source, srcIndex, customizer, stack) {
    if (object === source) {
      return;
    }
    _baseFor(source, function(srcValue, key) {
      stack || (stack = new _Stack);
      if (isObject_1(srcValue)) {
        _baseMergeDeep(object, source, key, srcIndex, baseMerge, customizer, stack);
      }
      else {
        var newValue = customizer
          ? customizer(_safeGet(object, key), srcValue, (key + ''), object, source, stack)
          : undefined;

        if (newValue === undefined) {
          newValue = srcValue;
        }
        _assignMergeValue(object, key, newValue);
      }
    }, keysIn_1);
  }

  var _baseMerge = baseMerge;

  /**
   * Creates a function like `_.assign`.
   *
   * @private
   * @param {Function} assigner The function to assign values.
   * @returns {Function} Returns the new assigner function.
   */
  function createAssigner(assigner) {
    return _baseRest(function(object, sources) {
      var index = -1,
          length = sources.length,
          customizer = length > 1 ? sources[length - 1] : undefined,
          guard = length > 2 ? sources[2] : undefined;

      customizer = (assigner.length > 3 && typeof customizer == 'function')
        ? (length--, customizer)
        : undefined;

      if (guard && _isIterateeCall(sources[0], sources[1], guard)) {
        customizer = length < 3 ? undefined : customizer;
        length = 1;
      }
      object = Object(object);
      while (++index < length) {
        var source = sources[index];
        if (source) {
          assigner(object, source, index, customizer);
        }
      }
      return object;
    });
  }

  var _createAssigner = createAssigner;

  /**
   * This method is like `_.assign` except that it recursively merges own and
   * inherited enumerable string keyed properties of source objects into the
   * destination object. Source properties that resolve to `undefined` are
   * skipped if a destination value exists. Array and plain object properties
   * are merged recursively. Other objects and value types are overridden by
   * assignment. Source objects are applied from left to right. Subsequent
   * sources overwrite property assignments of previous sources.
   *
   * **Note:** This method mutates `object`.
   *
   * @static
   * @memberOf _
   * @since 0.5.0
   * @category Object
   * @param {Object} object The destination object.
   * @param {...Object} [sources] The source objects.
   * @returns {Object} Returns `object`.
   * @example
   *
   * var object = {
   *   'a': [{ 'b': 2 }, { 'd': 4 }]
   * };
   *
   * var other = {
   *   'a': [{ 'c': 3 }, { 'e': 5 }]
   * };
   *
   * _.merge(object, other);
   * // => { 'a': [{ 'b': 2, 'c': 3 }, { 'd': 4, 'e': 5 }] }
   */
  var merge = _createAssigner(function(object, source, srcIndex) {
    _baseMerge(object, source, srcIndex);
  });

  var merge_1 = merge;

  function getEmitter(fn) {
    const emit = function emit2({ type, payload }) {
      return fn((obj) => {
        return produce__default["default"](obj, (draft) => {
          var _a;
          switch (type) {
            case emitType.ADD_BUILTIN_FNS:
              return void u__namespace.forEach(([key, val]) => set_1(draft["builtIn"], key, val), u__namespace.entries(payload.builtInFns));
            case emitType.DELETE_PAGE:
              return void delete draft[payload.pageName];
            case emitType.EDIT_DRAFT:
              return void ((_a = payload == null ? void 0 : payload.callback) == null ? void 0 : _a.call(payload, draft, {
                getCurrent: produce.current,
                getOriginal: produce.original
              }));
            case emitType.SET_CACHE:
              const { cacheIndex, data } = payload;
              const currentTimestamp = moment__default["default"](Date.now()).toString();
              return void set_1(draft["apiCache"], cacheIndex, {
                data,
                timestamp: currentTimestamp
              });
            case emitType.SET_LOCAL_PROPERTIES:
            case emitType.SET_ROOT_PROPERTIES:
              return void u__namespace.entries(payload.properties).forEach(([k, v]) => set_1(type === emitType.SET_ROOT_PROPERTIES ? draft : draft[payload.pageName], k, v));
            case emitType.SET_VALUE:
              const { pageName, dataKey, value, replace } = payload;
              let currVal;
              let newVal = value;
              if (!replace) {
                if (u__namespace.isUnd(pageName)) {
                  currVal = get_1(obj, dataKey);
                } else {
                  currVal = get_1(obj[pageName], dataKey);
                }
              }
              if (u__namespace.isObj(currVal) && u__namespace.isObj(newVal)) {
                if ("doc" in newVal) {
                  if (!u__namespace.isArr(currVal.doc) && u__namespace.isArr(newVal.doc)) {
                    const currValDoc = currVal.doc;
                    currVal.doc = [];
                    if ((currValDoc == null ? void 0 : currValDoc.id) && u__namespace.isStr(currValDoc.id) && !newVal.doc.every((d) => (d == null ? void 0 : d.id) === currValDoc.id)) {
                      currVal.doc.push(currValDoc);
                    }
                    currVal.doc.push(...newVal.doc);
                  } else if (!u__namespace.isArr(currVal.doc) && u__namespace.isObj(newVal.doc)) {
                    currVal.doc = newVal.doc;
                  } else if ("id" in currVal) {
                    newVal = mergeDeep$1(currVal, newVal.doc);
                  } else {
                    currVal.doc.length = 0;
                    currVal.doc.push(...newVal.doc);
                  }
                } else {
                  newVal = merge_1(currVal, newVal);
                }
              } else if (u__namespace.isArr(currVal) && u__namespace.isArr(newVal)) {
                currVal.length = 0;
                currVal.push(...newVal);
              } else if (typeof pageName === "undefined") {
                set_1(draft, dataKey, newVal);
              } else {
                set_1(draft[pageName], dataKey, newVal);
              }
          }
        });
      });
    };
    return emit;
  }

  function parseYml(yml = "") {
    try {
      return YAML__default["default"].parse(yml, {
        prettyErrors: true,
        schema: "core",
        version: "1.2"
      });
    } catch (error) {
      console.error(error);
      return {};
    }
  }

  var __async$3 = (__this, __arguments, generator) => {
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
  function fetchNoodlObject(url = "") {
    return __async$3(this, null, function* () {
      let cadlYAML = "";
      let cadlObject;
      try {
        try {
          cadlYAML = (yield axios__default["default"].get(url)).data;
        } catch (error) {
          throw new UnableToRetrieveYAML(`Unable to retrieve yaml for ${url}`, error instanceof Error ? error : new Error(String(error)));
        }
        try {
          cadlObject = parseYml(cadlYAML);
        } catch (error) {
          throw new UnableToParseYAML(`Unable to parse yaml for ${url}`, error instanceof Error ? error : new Error(String(error)));
        }
      } catch (error) {
        if (error instanceof Error)
          throw error;
        throw new Error(String(error));
      }
      return [cadlObject, cadlYAML];
    });
  }

  function isNoodlFunction(object) {
    var _a, _b;
    return u__namespace.isObj(object) && ((_b = (_a = u__namespace.keys(object)[0]) == null ? void 0 : _a.startsWith) == null ? void 0 : _b.call(_a, "="));
  }

  var docTableDao = (db) => {
    return { getDocById, getDocByIds, insertDoc, deleteDocById, getDocsByPageId, getLastestDocsByType, getAllDocsByType };
    function getDocById(did, sCondition = void 0) {
      let sqlstr = `SELECT * FROM ecos_doc_table WHERE id = :did ${sCondition ? "AND " + sCondition : ""} LIMIT 1`;
      let params = { ":did": did };
      let res = db.exec(sqlstr, params);
      return res;
    }
    function getDocByIds(dids) {
      let sqlstr = "SELECT * FROM ecos_doc_table WHERE id IN(";
      let params = {};
      dids.forEach((did, index) => {
        const key = `:did${index}`;
        sqlstr += key + (index === dids.length - 1 ? ")" : ",");
        params[key] = did;
      });
      let res = db.exec(sqlstr, params);
      return res;
    }
    function insertDoc(doc) {
      let sqlstr = "INSERT INTO ecos_doc_table VALUES (:ctime, :mtime, :atime, :atimes, :id, :name, :deat, :size, :fid, :eid, :bsig, :esig, :subtype, :type, :tage);";
      let params = {};
      console.log("insertdoc!!", doc);
      for (let [key, val] of Object.entries(doc)) {
        if (val instanceof Uint8Array) {
          params[`:${key}`] = store.level2SDK.utilServices.uint8ArrayToBase64(val);
        } else if (isObject$1(val)) {
          params[`:${key}`] = JSON.stringify(val);
        } else {
          params[`:${key}`] = val;
        }
      }
      let res = db.exec(sqlstr, params);
      return res;
    }
    function deleteDocById(did) {
      let sqlstr = `DELETE FROM ecos_doc_table WHERE id = :did`;
      let params = {
        [":did"]: did
      };
      let res = db.exec(sqlstr, params);
      return res;
    }
    function getDocsByPageId(pageId) {
      let sqlstr = `SELECT * FROM ecos_doc_table WHERE pageId = ${pageId}`;
      let res = db.exec(sqlstr);
      return res;
    }
    function getLastestDocsByType(type) {
      let sqlstr = `SELECT id FROM ecos_doc_table WHERE type = ${type} LIMIT 1 `;
      let res = db.exec(sqlstr);
      return res;
    }
    function getAllDocsByType(type) {
      let sqlstr = `SELECT * FROM ecos_doc_table WHERE type = ${type}`;
      let res = db.exec(sqlstr);
      res = convertSqlToObject(res);
      return res;
    }
    function convertSqlToObject(doc) {
      let returnDocs = [];
      if (doc.length) {
        const { columns, values } = doc[0];
        for (const value of values) {
          const obj = {};
          for (let i = 0; i < value.length; i++) {
            obj[columns[i]] = value[i];
          }
          returnDocs.push(obj);
        }
        return returnDocs;
      }
      return;
    }
  };

  var indexTablesDao = (db) => {
    return {
      getCount,
      extendAndFuzzySearch,
      getPIByDocId,
      deleteIndexByDocId,
      getAllDocId,
      getAllkTextByDid,
      getAllScoreByDid,
      getTypeById,
      insertAll
    };
    function getCount() {
      let sqlstr = "SELECT COUNT(*) FROM index_tables";
      const res = db.exec(sqlstr);
      return res[0].values[0][0];
    }
    function insertAll(indexTableEntry) {
      let sqlstr = "INSERT INTO index_tables VALUES (:fKey , :kText , :docId , :docType , :score );";
      let params = {};
      for (let [key, val] of Object.entries(indexTableEntry)) {
        if (val instanceof Uint8Array) {
          params[`:${key}`] = store.level2SDK.utilServices.uint8ArrayToBase64(val);
        } else {
          params[`:${key}`] = val;
        }
      }
      let res = db.exec(sqlstr, params);
      return res;
    }
    function extendAndFuzzySearch({
      kInput,
      ins_hex,
      docType,
      docTypeLow,
      docTypeHigh
    }) {
      let sqlstr = "SELECT docId FROM index_tables WHERE printf('%X', fKey) LIKE '%'|| :ins_hex ||'%' OR kText LIKE :kInput || '%'";
      let params = { ":ins_hex": ins_hex, ":kInput": kInput };
      if (docType) {
        sqlstr = "SELECT * FROM index_tables WHERE docType = :docType AND (printf('%X', fKey) LIKE '%'|| :ins_hex ||'%' OR kText LIKE :kInput || '%'  )";
        params = {
          ":docType": docType,
          ":ins_hex": ins_hex,
          ":kInput": kInput
        };
      } else if (docTypeLow && docTypeHigh) {
        sqlstr = "SELECT * FROM index_tables WHERE docType BETWEEN :docTypeLow AND :docTypeHigh AND (printf('%X', fKey) LIKE '%'|| :ins_hex ||'%' OR kText LIKE :kInput || '%'  )";
        params = {
          ":docTypeLow": docTypeLow,
          ":docTypeHigh": docTypeHigh,
          ":ins_hex": ins_hex,
          ":kInput": kInput
        };
      }
      const res = db.exec(sqlstr, params);
      return res;
    }
    function getPIByDocId(did) {
      const sqlstr = "SELECT * FROM index_tables WHERE docId = :did";
      const params = {
        ":did": did
      };
      const res = db.exec(sqlstr, params);
      return res;
    }
    function deleteIndexByDocId(did) {
      const sqlstr = "DELETE FROM index_tables WHERE docId = :did";
      const params = {
        ":did": did
      };
      const res = db.exec(sqlstr, params);
      return res;
    }
    function getAllDocId() {
      const sqlstr = "SELECT DISTINCT docId FROM index_tables";
      const res = db.exec(sqlstr);
      return res;
    }
    function getAllkTextByDid(did) {
      const sqlstr = "SELECT kText FROM index_tables WHERE docId = :did ORDER BY score";
      const params = {
        ":did": did
      };
      const res = db.exec(sqlstr, params);
      return res;
    }
    function getAllScoreByDid(did) {
      const sqlstr = "SELECT score FROM index_tables WHERE docId = :did ORDER By score";
      const params = {
        ":did": did
      };
      const res = db.exec(sqlstr, params);
      return res;
    }
    function getTypeById(did) {
      const sqlstr = "SELECT docType FROM index_tables WHERE docId = :did";
      const params = {
        ":did": did
      };
      const res = db.exec(sqlstr, params);
      return res;
    }
  };

  var apiHashTableDao = (db) => {
    return {
      getApiResult,
      insertApiResult,
      deleteApiResult
    };
    function getApiResult(apiInputHash) {
      const sqlstr = "SELECT resultId FROM api_hash_table WHERE api_input_hash = :api_input_hash";
      const params = {
        ":api_input_hash": apiInputHash
      };
      let res = db.exec(sqlstr, params);
      if (res.length) {
        res = res[0].values[0];
      }
      return res;
    }
    function insertApiResult(apiInputHash, apiResult) {
      const sqlstr = "INSERT INTO api_hash_table VALUES (:api_input_hash, :api_result );";
      const params = {
        ":api_input_hash": apiInputHash,
        ":api_result": apiResult
      };
      const res = db.exec(sqlstr, params);
      return res;
    }
    function deleteApiResult(apiInputHash) {
      const sqlstr = "DELETE FROM api_hash_table WHERE api_input_hash = :api_input_hash";
      const params = {
        ":api_input_hash": apiInputHash
      };
      let res = db.exec(sqlstr, params);
      if (res.length) {
        res = res[0].values[0][0];
      }
      return res;
    }
  };

  var __accessCheck$2 = (obj, member, msg) => {
    if (!member.has(obj))
      throw TypeError("Cannot " + msg);
  };
  var __privateGet$2 = (obj, member, getter) => {
    __accessCheck$2(obj, member, "read from private field");
    return getter ? getter.call(obj) : member.get(obj);
  };
  var __privateAdd$2 = (obj, member, value) => {
    if (member.has(obj))
      throw TypeError("Cannot add the same private member more than once");
    member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
  };
  var __async$2 = (__this, __arguments, generator) => {
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
  var _state$2;
  class FrontEndDB {
    constructor() {
      this.databaseName = "AiTMeet.db";
      __privateAdd$2(this, _state$2, {
        initialized: false
      });
    }
    getDatabase(config) {
      return __async$2(this, null, function* () {
        const frontEndDB = this;
        if (!__privateGet$2(this, _state$2).initialized) {
          console.log("test", config);
          const SQL = yield initSqlJs__namespace.default(config);
          frontEndDB.INSTANCE = new SQL.Database();
          let createEcosDocTable = "CREATE TABLE ecos_doc_table (ctime int, mtime int, atime int, atimes int, id char not null primary key,           name char,deat char, size int, fid char, eid char, bsig char, esig char, subtype int, type int, tage int);";
          let createIndexTable = "CREATE TABLE index_tables (fkey int, kText char, docId char, docType int, score int);";
          let createApiHashTable = "CREATE TABLE api_hash_table (api_input_hash char, resultId char);";
          frontEndDB.INSTANCE.run(createEcosDocTable);
          frontEndDB.INSTANCE.run(createIndexTable);
          frontEndDB.INSTANCE.run(createApiHashTable);
          this.DocTableDao = docTableDao(frontEndDB.INSTANCE);
          this.IndexTablesDao = indexTablesDao(frontEndDB.INSTANCE);
          this.ApiHashTableDao = apiHashTableDao(frontEndDB.INSTANCE);
          __privateGet$2(this, _state$2).initialized = true;
        }
        return frontEndDB.INSTANCE;
      });
    }
    get initialized() {
      return __privateGet$2(this, _state$2).initialized;
    }
  }
  _state$2 = new WeakMap();

  var __async$1 = (__this, __arguments, generator) => {
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
  class IndexRepository {
    constructor() {
      this.userDB = new FrontEndDB();
    }
    search(input, sCondition) {
      var _a;
      if (!input)
        return;
      const fuzzyCreator = new FuzzyIndexCreator();
      const initMapping = fuzzyCreator.initialMapping(input);
      const fuzzyInd = fuzzyCreator.toFuzzyHex(initMapping);
      const res = (_a = this.indexTablesDao) == null ? void 0 : _a.extendAndFuzzySearch({
        kInput: input,
        ins_hex: fuzzyInd
      });
      console.log("fuzzysearch", input, res);
      let docs = [];
      if (!res.length)
        return docs;
      const { values } = res[0];
      const flattenValues = values.reduce((acc, id) => {
        if (!acc.includes(id[0])) {
          acc.push(id[0]);
        }
        return acc;
      }, []);
      docs = this.getDocsByIds(flattenValues, sCondition);
      let returnDocs = [];
      for (let doc of docs) {
        if (doc.length) {
          const obj = {};
          const { columns, values: values2 } = doc[0];
          for (let i = 0; i < columns.length; i++) {
            let prop = columns[i];
            let val = values2[0][i];
            if (["deat", "name"].includes(prop)) {
              obj[prop] = JSON.parse(val);
            } else {
              obj[prop] = val;
            }
          }
          returnDocs.push(obj);
        }
      }
      return returnDocs;
    }
    getDataBase(config) {
      return __async$1(this, null, function* () {
        if (config) {
          yield this.userDB.getDatabase(config);
          this.docTableDao = this.userDB.DocTableDao;
          this.indexTablesDao = this.userDB.IndexTablesDao;
        }
      });
    }
    indexTableIsEmpty() {
      var _a;
      return ((_a = this.indexTablesDao) == null ? void 0 : _a.getCount()) === 0;
    }
    insertIndexData(personalIndexTables) {
      var _a;
      (_a = this.indexTablesDao) == null ? void 0 : _a.insertAll(personalIndexTables);
    }
    getTypeById(did) {
      var _a;
      return (_a = this.indexTablesDao) == null ? void 0 : _a.getTypeById(did);
    }
    deleteIndexByDocId(did) {
      var _a;
      (_a = this.indexTablesDao) == null ? void 0 : _a.deleteIndexByDocId(did);
    }
    getPIByDocId(did) {
      var _a;
      return (_a = this.indexTablesDao) == null ? void 0 : _a.getPIByDocId(did);
    }
    getkTextByDid(docId) {
      var _a;
      return (_a = this.indexTablesDao) == null ? void 0 : _a.getAllkTextByDid(docId);
    }
    getAllDocId() {
      var _a;
      return (_a = this.indexTablesDao) == null ? void 0 : _a.getAllDocId();
    }
    getAllDocByFkey({ kInput, ins_hex }) {
      var _a;
      return (_a = this.indexTablesDao) == null ? void 0 : _a.extendAndFuzzySearch({ kInput, ins_hex });
    }
    getDocById(did) {
      var _a, _b;
      return (_b = (_a = this.docTableDao) == null ? void 0 : _a.getDocById) == null ? void 0 : _b.call(_a, did);
    }
    cacheDoc(doc) {
      var _a;
      (_a = this.docTableDao) == null ? void 0 : _a.insertDoc(doc);
    }
    deleteCachedDocById(did) {
      var _a;
      return (_a = this.docTableDao) == null ? void 0 : _a.deleteDocById(did);
    }
    getDocsByIds(relatedDocsIds, sCondition) {
      var _a, _b;
      let result = [];
      for (let did of relatedDocsIds) {
        result.push((_b = (_a = this.docTableDao) == null ? void 0 : _a.getDocById) == null ? void 0 : _b.call(_a, did, sCondition));
      }
      return result;
    }
    getDocsByPageId(pageId) {
      var _a;
      return (_a = this.docTableDao) == null ? void 0 : _a.getDocsByPageId(pageId);
    }
    getLastestDocsByType(payload) {
      var _a;
      return (_a = this.docTableDao) == null ? void 0 : _a.getLastestDocsByType(payload == null ? void 0 : payload.type);
    }
    getAllDocsByType(payload) {
      var _a;
      return (_a = this.docTableDao) == null ? void 0 : _a.getAllDocsByType(payload == null ? void 0 : payload.type);
    }
  }

  let id = 0;
  function createId() {
    return String(++id);
  }

  var __defProp$1 = Object.defineProperty;
  var __defProps$1 = Object.defineProperties;
  var __getOwnPropDescs$1 = Object.getOwnPropertyDescriptors;
  var __getOwnPropSymbols$1 = Object.getOwnPropertySymbols;
  var __hasOwnProp$1 = Object.prototype.hasOwnProperty;
  var __propIsEnum$1 = Object.prototype.propertyIsEnumerable;
  var __defNormalProp$1 = (obj, key, value) => key in obj ? __defProp$1(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __spreadValues$1 = (a, b) => {
    for (var prop in b || (b = {}))
      if (__hasOwnProp$1.call(b, prop))
        __defNormalProp$1(a, prop, b[prop]);
    if (__getOwnPropSymbols$1)
      for (var prop of __getOwnPropSymbols$1(b)) {
        if (__propIsEnum$1.call(b, prop))
          __defNormalProp$1(a, prop, b[prop]);
      }
    return a;
  };
  var __spreadProps$1 = (a, b) => __defProps$1(a, __getOwnPropDescs$1(b));
  var __accessCheck$1 = (obj, member, msg) => {
    if (!member.has(obj))
      throw TypeError("Cannot " + msg);
  };
  var __privateGet$1 = (obj, member, getter) => {
    __accessCheck$1(obj, member, "read from private field");
    return getter ? getter.call(obj) : member.get(obj);
  };
  var __privateAdd$1 = (obj, member, value) => {
    if (member.has(obj))
      throw TypeError("Cannot add the same private member more than once");
    member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
  };
  var _state$1, _subscribers$1;
  class ActiveQueue {
    constructor() {
      __privateAdd$1(this, _state$1, {
        ids: {},
        queue: [],
        history: []
      });
      __privateAdd$1(this, _subscribers$1, {
        queue: []
      });
    }
    getState() {
      return __privateGet$1(this, _state$1);
    }
    getHelpers() {
      return {
        getState: this.getState.bind(this),
        getSubscribers: this.getSubscribers.bind(this)
      };
    }
    getSubscribers() {
      return __privateGet$1(this, _subscribers$1);
    }
    create(opts) {
      const obj = __spreadValues$1({
        id: createId(),
        timestamp: new Date().toISOString()
      }, opts);
      const state = this.getState();
      state.queue.push(obj);
      state.ids[obj.id] = { type: obj.type };
      this.publish(subscribe.QUEUE_START, obj, this.getHelpers());
      return obj;
    }
    remove(obj, opts) {
      const { queue, history, ids } = this.getState();
      if (queue.includes(obj)) {
        while (history.length > 1e4)
          history.shift();
        const timestamp = new Date().toISOString();
        history.push(__spreadProps$1(__spreadValues$1(__spreadValues$1(__spreadValues$1({}, u__namespace.pick(obj, ["id", "kind", "operator"])), obj.error ? { error: obj.error } : void 0), opts), {
          timestamp,
          time: moment__default["default"](timestamp).diff(new Date(obj.timestamp).getTime(), "ms")
        }));
        queue.splice(queue.indexOf(obj), 1);
        delete ids[obj.id];
        this.publish(subscribe.QUEUE_END, obj, this.getHelpers());
      }
    }
    on(evt, callback) {
      switch (evt) {
        case subscribe.QUEUE_START:
        case subscribe.QUEUE_END:
          return void (!__privateGet$1(this, _subscribers$1).queue.includes(callback) && __privateGet$1(this, _subscribers$1).queue.push(callback));
      }
    }
    publish(evt, ...args) {
      switch (evt) {
        case subscribe.QUEUE_START:
        case subscribe.QUEUE_END:
          return void this.getSubscribers().queue.map((cb) => cb(...args));
      }
    }
  }
  _state$1 = new WeakMap();
  _subscribers$1 = new WeakMap();

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
  var __accessCheck = (obj, member, msg) => {
    if (!member.has(obj))
      throw TypeError("Cannot " + msg);
  };
  var __privateGet = (obj, member, getter) => {
    __accessCheck(obj, member, "read from private field");
    return getter ? getter.call(obj) : member.get(obj);
  };
  var __privateAdd = (obj, member, value) => {
    if (member.has(obj))
      throw TypeError("Cannot add the same private member more than once");
    member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
  };
  var __privateSet = (obj, member, value, setter) => {
    __accessCheck(obj, member, "write to private field");
    setter ? setter.call(obj, value) : member.set(obj, value);
    return value;
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
  var _aspectRatio, _designSuffix, _config, _cadlBaseUrl, _baseUrl, _assetsUrl, _dispatch, _emit, _root, _state, _subscribers, _dbConfig, _indexRepository, _queue;
  produce.setAutoFreeze(false);
  class CADL {
    constructor({
      configUrl,
      cadlVersion,
      aspectRatio,
      dbConfig,
      SearchClient
    }) {
      __privateAdd(this, _aspectRatio, 1);
      __privateAdd(this, _designSuffix, {});
      __privateAdd(this, _config, null);
      __privateAdd(this, _cadlBaseUrl, void 0);
      __privateAdd(this, _baseUrl, "");
      __privateAdd(this, _assetsUrl, "");
      __privateAdd(this, _dispatch, void 0);
      __privateAdd(this, _emit, void 0);
      __privateAdd(this, _root, void 0);
      __privateAdd(this, _state, {
        init: {
          initiating: false,
          done: false,
          error: null
        }
      });
      __privateAdd(this, _subscribers, {
        queue: []
      });
      __privateAdd(this, _dbConfig, void 0);
      __privateAdd(this, _indexRepository, void 0);
      __privateAdd(this, _queue, void 0);
      this.cadlEndpoint = null;
      this.initCallQueue = [];
      this.myBaseUrl = "";
      this.verificationRequest = {
        timer: 0,
        phoneNumber: ""
      };
      store.env = cadlVersion;
      store.configUrl = configUrl;
      store.noodlInstance = this;
      this.cadlVersion = cadlVersion;
      if (aspectRatio)
        this.aspectRatio = aspectRatio;
      __privateSet(this, _dbConfig, dbConfig);
      __privateSet(this, _indexRepository, new IndexRepository());
      __privateSet(this, _dispatch, getDispatcher(this));
      __privateSet(this, _emit, getEmitter((callback) => this.root = callback(this.root)));
      __privateSet(this, _root, produce__default["default"]({}, (draft) => {
        draft.actions = {};
        draft.builtIn = builtInFns({
          dispatch: this.dispatch.bind(this),
          processPopulate: this.processPopulate.bind(this),
          getPage: this.getPage.bind(this),
          emit: this.emit.bind(this),
          SearchClient
        });
        draft.apiCache = {};
      }));
      __privateSet(this, _queue, new ActiveQueue());
    }
    [Symbol.for("nodejs.util.inspect.custom")]() {
      return {
        assetsUrl: this.assetsUrl,
        cadlBaseUrl: this.cadlBaseUrl,
        cadlEndpoint: this.cadlEndpoint,
        cadlVersion: this.cadlVersion,
        myBaseUrl: this.myBaseUrl,
        state: this.getState()
      };
    }
    get dispatch() {
      return __privateGet(this, _dispatch);
    }
    get emit() {
      return __privateGet(this, _emit);
    }
    get indexRepository() {
      return __privateGet(this, _indexRepository);
    }
    init() {
      return __async(this, arguments, function* ({
        use
      } = {}) {
        var _a;
        let config;
        try {
          config = (use == null ? void 0 : use.config) || (yield store.level2SDK.loadConfigData());
        } catch (error) {
          throw new UnableToLoadConfig("An error occured while trying to load the config", error instanceof Error ? error : new Error(String(error)));
        }
        yield __privateGet(this, _indexRepository).getDataBase(__privateGet(this, _dbConfig));
        if (isBrowser() && (config == null ? void 0 : config.isGetPosition)) {
          const opt = {
            enableHighAccuracy: true,
            timeout: 3e3,
            maximumAge: 60 * 1e3
          };
          window.navigator.geolocation.getCurrentPosition((position) => {
            const longitude = position.coords.longitude;
            const latitude = position.coords.latitude;
            console.log("load position", { longitude, latitude });
            store.currentLatitude = latitude;
            store.currentLongitude = longitude;
            localStorage.setItem("longitude", JSON.stringify(longitude));
            localStorage.setItem("latitude", JSON.stringify(latitude));
          }, (error) => {
            let msg = "";
            switch (error.code) {
              case error.PERMISSION_DENIED:
                msg = "User rejects request to get geolocation.";
                break;
              case error.POSITION_UNAVAILABLE:
                msg = "Location information is not available.";
                break;
              case error.TIMEOUT:
                msg = "Requesting user geolocation timed out.";
                break;
              default:
                msg = "Unknown error";
            }
            console.error(msg);
          }, opt);
        }
        const {
          web = { cadlVersion: "" },
          cadlBaseUrl = "",
          cadlMain = "",
          designSuffix = "",
          myBaseUrl = ""
        } = config;
        this.cadlVersion = web.cadlVersion[this.cadlVersion];
        __privateSet(this, _designSuffix, designSuffix);
        this.cadlBaseUrl = cadlBaseUrl;
        this.myBaseUrl = myBaseUrl;
        let cadlEndpointUrl = `${this.cadlBaseUrl}${cadlMain}`;
        this.cadlEndpoint = (use == null ? void 0 : use.cadlEndpoint) || (yield fetchNoodlObject(cadlEndpointUrl))[0];
        const { baseUrl = "", assetsUrl = "", preload } = this.cadlEndpoint || {};
        this.baseUrl = baseUrl;
        this.assetsUrl = assetsUrl;
        __privateSet(this, _config, this.processPopulate({
          source: config,
          lookFor: [".", "..", "=", "~"]
        }));
        this.emit({
          type: emitType.SET_ROOT_PROPERTIES,
          payload: { properties: { Config: __privateGet(this, _config) } }
        });
        const commonPreloads = ["BaseDataModel", "BaseCSS", "BasePage"];
        const preloads = preload || [];
        for (const commonPreload of commonPreloads) {
          if (use == null ? void 0 : use[commonPreload]) {
            const processedBaseDataModel = this.processPopulate({
              source: use[commonPreload],
              lookFor: [".", "..", "=", "~"]
            });
            this.emit({
              type: emitType.SET_ROOT_PROPERTIES,
              payload: { properties: processedBaseDataModel }
            });
          }
        }
        for (const name of preloads) {
          const processed = this.processPopulate({
            source: (use == null ? void 0 : use[name]) || ((_a = yield this.getPage(name)) == null ? void 0 : _a[0]),
            lookFor: [".", "..", "=", "~"]
          });
          this.emit({
            type: emitType.SET_ROOT_PROPERTIES,
            payload: { properties: processed }
          });
        }
        let cachedGlobal = localStorage.getItem("Global");
        let cachedGlobalParsed = null;
        if (cachedGlobal) {
          try {
            cachedGlobalParsed = JSON.parse(cachedGlobal);
          } catch (error) {
            console.log(error);
          }
          if (cachedGlobalParsed) {
            this.emit({
              type: emitType.SET_ROOT_PROPERTIES,
              payload: {
                properties: {
                  Global: __spreadProps(__spreadValues({}, cachedGlobalParsed), {
                    globalRegister: this.root.Global.globalRegister
                  })
                }
              }
            });
            const currentUser = cachedGlobalParsed == null ? void 0 : cachedGlobalParsed.currentUser;
            const userVertex = currentUser == null ? void 0 : currentUser.vertex;
            if (isBrowser()) {
              const ls = window.localStorage;
              if (!ls.getItem("jwt") && currentUser.JWT) {
                ls.setItem("jwt", currentUser.JWT);
              }
              if (!ls.getItem("pk") && userVertex.pk) {
                ls.setItem("pk", userVertex.pk);
              }
              if (!ls.getItem("sk") && userVertex.sk) {
                ls.setItem("sk", userVertex.sk);
              }
              if (!ls.getItem("user_vid") && userVertex.id) {
                ls.setItem("user_vid", userVertex.id);
              }
            }
            yield this.dispatch({
              type: dispatchActionType.UPDATE_DATA,
              payload: {
                pageName: "builtIn",
                dataKey: "builtIn.UserVertex",
                data: userVertex
              }
            });
          }
        }
      });
    }
    initPage(_0) {
      return __async(this, arguments, function* (pageArg, skip = [], options = {}) {
        var _a, _b, _c, _d;
        if (!this.cadlEndpoint)
          yield this.init();
        const { builtIn, reload } = options;
        u__namespace.isNil(reload) && (options.reload = true);
        if (builtIn && u__namespace.isObj(builtIn)) {
          this.emit({
            type: emitType.ADD_BUILTIN_FNS,
            payload: { builtInFns: __spreadValues({}, builtIn) }
          });
        }
        let pageName = "";
        let pageCADL;
        if (u__namespace.isStr(pageArg)) {
          pageName = pageArg;
        } else if (pageArg == null ? void 0 : pageArg.pageName) {
          pageName = pageArg.pageName;
          pageCADL = pageArg.cadlObject;
        }
        if (reload === false && this.root[pageName]) {
          return;
        } else {
          if (!pageCADL) {
            if (cache.pages[pageName]) {
              pageCADL = cloneDeep_1({ [pageName]: cache.pages[pageName] });
            } else {
              pageCADL = (yield this.getPage(pageName))[0];
              cache.pages[pageName] = cloneDeep_1((pageCADL == null ? void 0 : pageCADL[pageName]) || pageCADL);
            }
          }
          (options == null ? void 0 : options.onReceive) && (yield (_a = options == null ? void 0 : options.onReceive) == null ? void 0 : _a.call(options, pageCADL));
        }
        if (this.root[pageName] && reload) {
          this.emit({ type: "DELETE_PAGE", payload: { pageName } });
        }
        let obj = pageCADL;
        obj = this.processPopulate({
          source: obj,
          lookFor: [".", "..", "~"],
          skip: ["update", "save", "check", "init", "components", ...skip],
          withFns: true,
          pageName
        });
        (options == null ? void 0 : options.onFirstProcess) && (yield (_b = options.onFirstProcess) == null ? void 0 : _b.call(options, obj));
        obj = this.processPopulate({
          source: obj,
          lookFor: [".", "..", "_", "~"],
          skip: ["update", "check", "init", "formData", "components", ...skip],
          withFns: true,
          pageName
        });
        (options == null ? void 0 : options.onSecondProcess) && (yield (_c = options.onSecondProcess) == null ? void 0 : _c.call(options, obj));
        this.emit({
          type: emitType.SET_ROOT_PROPERTIES,
          payload: { properties: obj }
        });
        let aborted = false;
        let init = u__namespace.values(obj)[0].init;
        const transformPage = (obj2, optsList, pageName2 = "") => __async(this, null, function* () {
          var _a2, _b2, _c2;
          try {
            let currIndex = 0;
            let skip2 = [
              "update",
              "check",
              "init",
              "formData",
              "dataIn",
              "style"
            ];
            if (init) {
            } else {
              skip2.push("style");
            }
            while (currIndex <= 1) {
              if (currIndex < 2) {
                skip2.push("backgroundColor");
              } else {
                if (skip2.includes("backgroundColor")) {
                  skip2.splice(skip2.indexOf("backgroundColor"), 1);
                }
              }
              if (currIndex >= 1) {
                for (const kind of ["edge", "document", "vertex"]) {
                  if (!skip2.includes(kind))
                    skip2.push(kind);
                }
              }
              if (currIndex > 1) {
                if (init == null ? void 0 : init.includes("style")) {
                  init.splice(init.indexOf("style"), 1);
                }
              }
              obj2 = this.processPopulate(__spreadProps(__spreadValues({
                source: obj2,
                lookFor: [".", "..", "_", "~"],
                withFns: true,
                pageName: pageName2
              }, optsList == null ? void 0 : optsList[currIndex]), {
                skip: [...skip2, ...((_a2 = optsList == null ? void 0 : optsList[currIndex]) == null ? void 0 : _a2.skip) || []]
              }));
              currIndex++;
            }
            if (!_TEST_ && !(pageName2 in obj2)) {
              if (cache[pageName2]) {
                obj2[pageName2] = cloneDeep_1(cache[pageName2]);
              } else {
                obj2[pageName2] = {};
                console.log(`%c"${pageName2}" does not exist in the root or cache. An empty object was created instead`, `color:#ec0000;`, obj2);
              }
            }
            const components = populateArray(__spreadProps(__spreadValues({
              source: ((_b2 = obj2[pageName2]) == null ? void 0 : _b2.components) || [],
              lookFor: "=",
              pageName: pageName2,
              locations: [obj2[pageName2], this.root]
            }, optsList == null ? void 0 : optsList[currIndex]), {
              skip: [
                "update",
                "check",
                "edge",
                "document",
                "vertex",
                "init",
                "formData",
                "dataIn",
                "style",
                ...((_c2 = optsList == null ? void 0 : optsList[currIndex]) == null ? void 0 : _c2.skip) || []
              ]
            })) || [];
            set_1(obj2, [pageName2, "components"], components);
            obj2 = yield replaceEvalObject(__spreadValues({
              pageName: pageName2,
              cadlObject: obj2,
              dispatch: this.dispatch.bind(this)
            }, optsList == null ? void 0 : optsList[++currIndex]));
          } catch (error) {
            console.error(error);
          }
          return obj2;
        });
        if (init) {
          const page = yield this.runInit({
            pageObject: obj,
            onBeforeInit: options == null ? void 0 : options.onBeforeInit,
            onInit: options == null ? void 0 : options.onInit,
            onAfterInit: options == null ? void 0 : options.onAfterInit
          });
          if ("abort" in page) {
            if (page.abort) {
              aborted = true;
              pageCADL && ((_d = options == null ? void 0 : options.onAbort) == null ? void 0 : _d.call(options, pageCADL));
            }
          }
          if (!aborted) {
            this.emit({
              type: emitType.SET_ROOT_PROPERTIES,
              payload: {
                properties: yield transformPage(page, [], pageName)
              }
            });
          }
        } else {
          this.emit({
            type: emitType.SET_ROOT_PROPERTIES,
            payload: {
              properties: yield transformPage(obj, [
                { skip: ["ecosObj", "style"] },
                { skip: ["ecosObj", "style"] },
                { skip: ["ecosObj", "style"] }
              ], pageName)
            }
          });
        }
        if (aborted)
          return { aborted };
      });
    }
    getPage(pageName) {
      return __async(this, null, function* () {
        let pageCADL;
        let pageYAML = "";
        let pageUrl = "";
        if (pageName.startsWith("~")) {
          pageUrl = !this.myBaseUrl ? this.baseUrl : this.myBaseUrl;
          pageName = pageName.substring(2);
        } else {
          pageUrl = this.baseUrl;
        }
        try {
          let url = `${pageUrl}${pageName}_en.yml`;
          const [cadlObject, cadlYAML] = yield fetchNoodlObject(url);
          pageCADL = cadlObject;
          pageYAML = cadlYAML;
        } catch (error) {
          throw error;
        }
        return [pageCADL, pageYAML];
      });
    }
    processPopulate({
      source,
      lookFor,
      skip,
      pageName,
      withFns = true
    }) {
      let sourceCopy = source;
      let localRoot = pageName ? sourceCopy[pageName] : sourceCopy;
      let rootDeepCopy = cloneDeep_1(this.root);
      let localDeepCopy = clone_1(localRoot);
      for (const [op, locations] of [
        [".", [rootDeepCopy]],
        ["..", [localDeepCopy]]
      ]) {
        let queueObject;
        try {
          queueObject = __privateGet(this, _queue).create({
            type: "populate",
            kind: "keys",
            location: locations[0] === rootDeepCopy ? "root" : "local",
            operator: op,
            pageName
          });
          sourceCopy = populateKeys({
            source: sourceCopy,
            lookFor: op,
            locations
          });
        } catch (error) {
          const err = error instanceof Error ? error : new Error(String(error));
          queueObject && (queueObject.error = err);
          throw new PopulateError(err.message, "keys");
        } finally {
          queueObject && __privateGet(this, _queue).remove(queueObject);
        }
      }
      localRoot = pageName ? sourceCopy[pageName] : sourceCopy;
      {
        let queueObject;
        try {
          queueObject = __privateGet(this, _queue).create({
            type: "populate",
            kind: "values",
            location: ["root", "local"],
            operator: lookFor,
            pageName
          });
          sourceCopy = populateVals({
            source: sourceCopy,
            lookFor,
            skip,
            locations: [this, rootDeepCopy, localDeepCopy],
            pageName,
            dispatch: this.dispatch.bind(this)
          });
        } catch (error) {
          const err = error instanceof Error ? error : new Error(String(error));
          (queueObject == null ? void 0 : queueObject.kind) === "values" && (queueObject.error = err);
          throw new PopulateError(err.message, "values");
        } finally {
          queueObject && __privateGet(this, _queue).remove(queueObject);
        }
      }
      localRoot = pageName ? sourceCopy[pageName] : sourceCopy;
      let result;
      {
        let queueObject;
        try {
          queueObject = __privateGet(this, _queue).create({
            type: "populate",
            kind: "functions",
            location: ["object"],
            operator: lookFor,
            pageName
          });
          result = withFns ? createFuncAttacher({
            cadlObject: sourceCopy,
            dispatch: this.dispatch.bind(this)
          }) : sourceCopy;
        } catch (error) {
          const err = error instanceof Error ? error : new Error(String(error));
          (queueObject == null ? void 0 : queueObject.kind) === "functions" && (queueObject.error = err);
          throw new PopulateError(err.message, "functions");
        } finally {
          queueObject && __privateGet(this, _queue).remove(queueObject);
        }
      }
      return result;
    }
    handleEvalString(_0) {
      return __async(this, arguments, function* ({ stringArg, pageName }) {
        for (const op of ["..", ".", "=", "~"]) {
          if (stringArg.startsWith(op)) {
            return populateString({
              source: stringArg,
              lookFor: op,
              locations: op == "~" ? [this] : [this.root, this.root[pageName]]
            });
          }
        }
      });
    }
    handleEvalObject(_0) {
      return __async(this, arguments, function* ({
        object,
        pageName
      }) {
        let results;
        if (u__namespace.isObj(object)) {
          for (const key of u__namespace.keys(object)) {
            const result = yield this.handleEvalCommands({
              commands: object,
              key,
              pageName
            });
            if (!u__namespace.isUnd(result)) {
              if (!results) {
                results = result;
                continue;
              }
              if (!u__namespace.isArr(results))
                results = [];
              results.push(result);
            }
          }
        }
        return results;
      });
    }
    handleEvalArray(_0) {
      return __async(this, arguments, function* ({
        array,
        pageName = ""
      }) {
        let results = [];
        for (const command of array) {
          let populatedCommand = yield this.dispatch({
            type: dispatchActionType.POPULATE_OBJECT,
            payload: { pageName, object: command, copy: true }
          });
          if (nt__namespace.Identify.action.any(populatedCommand)) {
            populatedCommand = { actionType: populatedCommand };
          }
          for (const key of u__namespace.keys(populatedCommand)) {
            const result = yield this.handleEvalCommands({
              commands: populatedCommand,
              key,
              pageName
            });
            if (hasAbortPopup(result))
              return [...results, result];
            results.push(result);
          }
        }
        return results;
      });
    }
    handleEvalCommands(_0) {
      return __async(this, arguments, function* ({ commands, key, pageName }) {
        var _a, _b, _c, _d;
        let results;
        if (key === "if") {
          const result = yield this.handleIfCommand({
            pageName,
            ifCommand: { [key]: commands[key] }
          });
          if (!u__namespace.isNil(result)) {
            if (u__namespace.isUnd(results))
              results = result;
            else if (u__namespace.isArr(results))
              results.push(result);
            else
              results = [results, result];
          }
        } else if (key === "goto") {
          const dataIn = (_a = commands[key]) == null ? void 0 : _a.dataIn;
          const shouldCopy = key.includes("builtIn") && u__namespace.isObj(dataIn) && !("object" in dataIn) && !("array" in dataIn);
          const populatedCommand = yield this.dispatch({
            type: dispatchActionType.POPULATE_OBJECT,
            payload: {
              pageName,
              object: { [key]: commands[key] },
              copy: shouldCopy
            }
          });
          let gotoCommand;
          if (u__namespace.isStr(populatedCommand[key])) {
            gotoCommand = {
              "=.builtIn.goto": {
                dataIn: { destination: populatedCommand[key] }
              }
            };
          } else if (u__namespace.isObj(populatedCommand[key])) {
            gotoCommand = {
              "=.builtIn.goto": populatedCommand[key]
            };
          }
          const result = yield this.handleEvalFunction({
            command: gotoCommand,
            pageName,
            key: "=.builtIn.goto"
          });
          if (!u__namespace.isNil(result)) {
            if (u__namespace.isUnd(results))
              results = result;
            else if (u__namespace.isArr(results))
              results.push(result);
            else
              results = [results, result];
          }
        } else if (key === "actionType") {
          let result;
          if (nt__namespace.Identify.action.evalObject(commands == null ? void 0 : commands.actionType)) {
            const obj = (_b = commands.actionType) == null ? void 0 : _b.object;
            if (u__namespace.isFnc(obj)) {
              result = yield obj();
            } else if (u__namespace.isObj(obj)) {
              const payload = { updateObject: obj, pageName };
              result = yield this.dispatch({
                type: dispatchActionType.EVAL_OBJECT,
                payload
              });
            }
          } else {
            result = commands[key];
          }
          if (!u__namespace.isNil(result)) {
            if (u__namespace.isUnd(results))
              results = result;
            else if (u__namespace.isArr(results))
              results.push(result);
            else
              results = [results, result];
          }
        } else if (!key.startsWith("=")) {
          const dataIn = (_c = commands[key]) == null ? void 0 : _c.dataIn;
          const shouldCopy = key.includes("builtIn") && u__namespace.isObj(dataIn) && !("object" in dataIn) && !("array" in dataIn);
          const payload = {
            pageName,
            object: { [key]: commands[key] },
            copy: shouldCopy
          };
          const populatedCommand = yield this.dispatch({
            type: dispatchActionType.POPULATE_OBJECT,
            payload
          });
          yield this.handleEvalAssignmentExpressions({
            pageName,
            command: populatedCommand,
            key
          });
        } else if (key.startsWith("=")) {
          const dataIn = (_d = commands[key]) == null ? void 0 : _d.dataIn;
          const shouldCopy = key.includes("builtIn") && (u__namespace.isObj(dataIn) || u__namespace.isArr(dataIn)) && !("object" in dataIn) && !("array" in dataIn);
          const payload = {
            pageName,
            object: { [key]: commands[key] },
            copy: shouldCopy
          };
          const populatedCommand = yield this.dispatch({
            type: dispatchActionType.POPULATE_OBJECT,
            payload
          });
          const result = yield this.handleEvalFunction({
            command: populatedCommand,
            pageName,
            key
          });
          if (!u__namespace.isNil(result)) {
            if (u__namespace.isUnd(results))
              results = result;
            else if (u__namespace.isArr(results))
              results.push(result);
            else
              results = [results, result];
          }
        }
        return results;
      });
    }
    handleEvalAssignmentExpressions(_0) {
      return __async(this, arguments, function* ({ pageName, command, key }) {
        let trimPath = "";
        let val;
        val = command[key];
        if (key.startsWith("..")) {
          trimPath = key.substring(2, key.length - 1);
          let pathArr = trimPath.split(".");
          let currValue = get_1(this.root, [pageName, ...pathArr]) || "";
          if (u__namespace.isObj(currValue))
            val = mergeDeep(currValue, val);
          if (isNoodlFunction(val)) {
            val = yield this.handleEvalFunction({
              pageName,
              key: u__namespace.keys(val)[0],
              command: val
            });
          }
          const payload = { pageName, dataKey: pathArr, value: val };
          this.emit({ type: emitType.SET_VALUE, payload });
        } else if (key.startsWith(".")) {
          trimPath = key.substring(1, key.length - 1);
          let pathArr = trimPath.split(".");
          let currValue = get_1(this.root, [...pathArr]) || "";
          if (u__namespace.isObj(currValue))
            val = mergeDeep(currValue, val);
          if (isNoodlFunction(val)) {
            val = yield this.handleEvalFunction({
              pageName,
              key: u__namespace.keys(val)[0],
              command: val
            });
          }
          this.emit({
            type: emitType.SET_VALUE,
            payload: { dataKey: pathArr, value: val }
          });
        }
      });
    }
    handleEvalFunction(_0) {
      return __async(this, arguments, function* ({
        key = "",
        pageName = "",
        command
      }) {
        var _a, _b, _c, _d, _e;
        key = key || "";
        pageName = pageName || "";
        let results;
        try {
          let trimPath = key.substring(key.startsWith("=..") ? 3 : 2, key.length);
          let pathArr = trimPath.split(".");
          let func = get_1(this.root, pathArr) || get_1(this.root[pageName], pathArr);
          if (u__namespace.isObj(func)) {
            if ("dataKey" in func) {
              func = __spreadProps(__spreadValues({}, func), { dataIn: func.dataKey, dataOut: func.dataKey });
              func == null ? true : delete func.dataKey;
            }
            let obj = func;
            for (const op of [".", "..", "=", "~"]) {
              obj = populateObject({
                source: u__namespace.isObj(obj) ? __spreadValues({}, obj) : obj,
                lookFor: op,
                locations: op == "~" ? [this] : [this.root, this.root[pageName]]
              });
            }
            func = createFuncAttacher({
              cadlObject: u__namespace.isObj(obj) ? __spreadValues({}, obj) : obj,
              dispatch: this.dispatch.bind(this),
              force: ((_b = (_a = obj == null ? void 0 : obj.dataIn) == null ? void 0 : _a.includes) == null ? void 0 : _b.call(_a, "Global")) || ((_d = (_c = obj == null ? void 0 : obj.dataIn) == null ? void 0 : _c.includes) == null ? void 0 : _d.call(_c, "Firebase")) ? true : false
            });
          }
          if (u__namespace.isFnc(func)) {
            if (u__namespace.isObj(command[key])) {
              const { dataIn, dataOut } = command[key];
              const result = yield func(dataIn);
              if (dataOut) {
                this.emit({
                  type: emitType.SET_VALUE,
                  payload: { dataKey: dataOut == null ? void 0 : dataOut.split("."), value: result }
                });
                result && (results = result);
              } else if (dataIn && u__namespace.isUnd(dataOut)) {
                results = result;
              }
            } else {
              results = yield func();
            }
          } else if (u__namespace.isArr(func)) {
            yield (_e = func == null ? void 0 : func[1]) == null ? void 0 : _e.call(func);
          }
          key.includes("goto") && (results = { abort: true });
        } catch (error) {
          console.error(error);
        }
        return results;
      });
    }
    handleIfCommand(_0) {
      return __async(this, arguments, function* ({
        pageName,
        ifCommand
      }) {
        var _a, _b, _c;
        let condResult;
        let [condExpr, valIfTruthy, valIfFalsy] = (ifCommand == null ? void 0 : ifCommand.if) || [];
        if (nt__namespace.Identify.isBoolean(condExpr)) {
          condResult = condExpr;
        } else if (u__namespace.isFnc(condExpr)) {
          condResult = yield condExpr();
        } else if (u__namespace.isStr(condExpr) && [".", "="].some((op) => condExpr.startsWith(op))) {
          let lookFor2 = ["..", ".", "="].find((op) => condExpr.startsWith(op));
          let res;
          if (nt__namespace.Identify.localReference(condExpr) || nt__namespace.Identify.evalLocalReference(condExpr)) {
            res = populateString({
              source: condExpr,
              locations: [this.root[pageName]],
              lookFor: lookFor2
            });
          } else if ([".", "=."].some((op) => condExpr.startsWith(op))) {
            res = populateString({
              source: condExpr,
              locations: [this.root],
              lookFor: lookFor2
            });
          }
          if (u__namespace.isFnc(res)) {
            condResult = yield res();
          } else if (res && res !== condExpr) {
            condResult = condResult === nt__namespace.Identify.isBooleanFalse(condResult) ? false : true;
          } else {
            condResult = false;
          }
        } else if (u__namespace.isObj(condExpr) && ((_b = (_a = u__namespace.keys(condExpr)[0]) == null ? void 0 : _a.startsWith) == null ? void 0 : _b.call(_a, "="))) {
          condResult = yield this.dispatch({
            type: dispatchActionType.EVAL_OBJECT,
            payload: { pageName, updateObject: condExpr }
          });
        }
        let isTruthy = !nt__namespace.Identify.isBooleanFalse(condResult) && !!condResult;
        let value = isTruthy ? valIfTruthy : valIfFalsy;
        let isObj = u__namespace.isObj(value);
        let firstKeyIfObj = isObj && u__namespace.keys(value)[0] || "";
        let lookFor = "";
        if (isObj && nt__namespace.Identify.folds.goto(value)) {
          if (u__namespace.isFnc((_c = this.root.builtIn) == null ? void 0 : _c.goto)) {
            const fn = this.root.builtIn.goto;
            value = populateVals({
              source: value,
              pageName,
              lookFor: ["..", ".", "="],
              locations: [this.root, this.root[pageName]]
            });
            let goto = value == null ? void 0 : value.goto;
            yield fn == null ? void 0 : fn({ pageName, goto: u__namespace.isObj(goto) ? goto.dataIn : goto });
            return { abort: "true" };
          }
        } else if (u__namespace.isFnc(value)) {
          yield value();
          return;
        } else if (isObj && (firstKeyIfObj.includes("@") || firstKeyIfObj.startsWith("="))) {
          return void (yield this.dispatch({
            type: dispatchActionType.EVAL_OBJECT,
            payload: { pageName, updateObject: value }
          }));
        } else if (nt__namespace.Identify.action.evalObject(value)) {
          const res = yield this.dispatch({
            type: dispatchActionType.EVAL_OBJECT,
            payload: { pageName, updateObject: value == null ? void 0 : value.object }
          });
          return res;
        } else if (nt__namespace.Identify.action.any(value) || u__namespace.isArr(value)) {
          return value;
        } else if (u__namespace.isStr(value)) {
          lookFor = ["..", ".", "="].find((op) => value.startsWith(op)) || "";
        }
        if (lookFor) {
          let res = populateString({
            source: value,
            locations: [this.root, this.root[pageName]],
            lookFor
          });
          if (u__namespace.isFnc(res)) {
            yield res();
          } else if (u__namespace.isObj(res)) {
            const withFns = createFuncAttacher({
              cadlObject: res,
              dispatch: this.dispatch.bind(this)
            });
            const { dataIn, dataOut } = u__namespace.values(value)[0];
            if (u__namespace.isFnc(withFns)) {
              const result = dataIn ? yield withFns(dataIn) : yield withFns();
              if (dataOut) {
                this.emit({
                  type: emitType.SET_VALUE,
                  payload: { dataKey: dataOut.split("."), value: result }
                });
              }
              return result;
            } else if (u__namespace.isArr(withFns) && u__namespace.isFnc(withFns[1])) {
              const result = dataIn ? yield withFns[1](dataIn) : yield withFns[1]();
              if (dataOut) {
                this.emit({
                  type: emitType.SET_VALUE,
                  payload: { dataKey: dataOut.split("."), value: result }
                });
              }
              return result;
            }
          } else if (u__namespace.isArr(res) && u__namespace.isFnc(res == null ? void 0 : res[1])) {
            const result = yield res[1]();
            return result;
          } else {
            return res;
          }
        } else {
          return value;
        }
      });
    }
    updateObject(_0) {
      return __async(this, arguments, function* ({
        dataKey,
        dataObject,
        dataObjectKey
      }) {
        this.emit({
          type: emitType.SET_VALUE,
          payload: {
            dataKey: (dataKey.startsWith(".") ? dataKey.substring(1, dataKey.length) : dataKey).split("."),
            value: dataObjectKey ? dataObject[dataObjectKey] : dataObject,
            replace: true
          }
        });
        yield this.dispatch({ type: dispatchActionType.UPDATE_LOCAL_STORAGE });
      });
    }
    runInit(_0) {
      return __async(this, arguments, function* ({
        pageObject = {},
        onBeforeInit,
        onInit,
        onAfterInit,
        wrapEvalObjects = true
      }) {
        return new Promise((resolve) => __async(this, null, function* () {
          let page = pageObject;
          let pageName = u__namespace.keys(page)[0];
          let init = u__namespace.values(page)[0].init;
          if (init) {
            onBeforeInit && (yield onBeforeInit == null ? void 0 : onBeforeInit(init));
            this.initCallQueue = init.map((_command, index) => index);
            while (this.initCallQueue.length > 0) {
              try {
                const currIndex = this.initCallQueue.shift();
                const command = init[currIndex];
                onInit && (yield onInit == null ? void 0 : onInit(command, currIndex, init));
                let populatedCommand;
                let firstCmdKey = u__namespace.isObj(command) && u__namespace.keys(command)[0] || "";
                if (u__namespace.isObj(command) && ["=", "@"].some((op) => firstCmdKey.includes(op))) {
                  yield this.dispatch({
                    type: dispatchActionType.EVAL_OBJECT,
                    payload: { updateObject: command, pageName }
                  });
                } else if (isPopulated(command)) {
                  populatedCommand = command;
                } else {
                  populatedCommand = populateVals({
                    source: command,
                    locations: [this.root, this.root[pageName]],
                    lookFor: [".", "..", "=", "~"]
                  });
                }
                if (u__namespace.isFnc(populatedCommand)) {
                  try {
                    yield populatedCommand();
                  } catch (error) {
                    const err = error instanceof Error ? error : new Error(String(error));
                    onAfterInit == null ? void 0 : onAfterInit(err, init);
                    throw new UnableToExecuteFn(`An error occured while executing ${pageName}.init. Check command at index ${currIndex} under init`, err);
                  }
                } else if (nt__namespace.Identify.action.any(populatedCommand)) {
                  const { actionType, dataKey, dataObject, object, funcName } = populatedCommand;
                  switch (actionType) {
                    case "updateObject": {
                      yield this.updateObject({ dataKey, dataObject });
                      break;
                    }
                    case "builtIn": {
                      if (funcName === "videoChat") {
                        const videoChatFn = this.root.builtIn[funcName];
                        u__namespace.isFnc(videoChatFn) && (yield videoChatFn == null ? void 0 : videoChatFn(populatedCommand));
                      }
                      break;
                    }
                    case "evalObject": {
                      if (wrapEvalObjects) {
                        const payload2 = { pageName, updateObject: object };
                        yield this.dispatch({
                          type: dispatchActionType.EVAL_OBJECT,
                          payload: payload2
                        });
                      }
                      break;
                    }
                    default: {
                      return;
                    }
                  }
                } else if (nt__namespace.Identify.if(populatedCommand)) {
                  const ifResult = yield this.handleIfCommand({
                    pageName,
                    ifCommand: populatedCommand
                  });
                  if (ifResult == null ? void 0 : ifResult.abort)
                    resolve({ abort: true });
                } else if (u__namespace.isArr(populatedCommand)) {
                  if (u__namespace.isFnc(populatedCommand[0][1])) {
                    try {
                      yield populatedCommand[0][1]();
                    } catch (error) {
                      throw new UnableToExecuteFn(`An error occured while executing ${pageName}.init`, error instanceof Error ? error : new Error(String(error)));
                    }
                  }
                }
                let updatedPage = this.root[pageName];
                for (const op of ["..", "."]) {
                  updatedPage = populateObject({
                    source: updatedPage,
                    lookFor: op,
                    skip: ["update", "check", "components"],
                    locations: [op == ".." ? this.root[pageName] : this.root]
                  });
                }
                updatedPage = createFuncAttacher({
                  cadlObject: { [pageName]: updatedPage },
                  dispatch: this.dispatch.bind(this)
                });
                page = updatedPage;
                init = u__namespace.values(updatedPage)[0].init;
                const payload = { pageName, properties: u__namespace.values(updatedPage)[0] };
                this.emit({ type: emitType.SET_LOCAL_PROPERTIES, payload });
              } catch (error) {
                console.error(error);
              }
            }
            yield onAfterInit == null ? void 0 : onAfterInit(null, init);
            resolve(page);
          }
        }));
      });
    }
    setFromLocalStorage(key) {
      let localStorageGlobal;
      try {
        const Global = localStorage.getItem("Global");
        if (Global)
          localStorageGlobal = JSON.parse(Global);
      } catch (error) {
        if (error instanceof Error)
          throw error;
        throw new Error(String(error));
      }
      if (localStorageGlobal) {
        switch (key) {
          case "user": {
            localStorageGlobal.currentUser.vertex;
            break;
          }
          case "meetroom": {
            let currMeetroom = localStorageGlobal.meetroom.edge;
            this.emit({
              type: emitType.SET_VALUE,
              payload: { dataKey: "Global.meetroom.edge", value: currMeetroom }
            });
            break;
          }
        }
      }
    }
    editDraft(callback) {
      this.emit({ type: "EDIT_DRAFT", payload: { callback } });
    }
    emitCall(_0) {
      return __async(this, arguments, function* ({
        dataKey,
        actions,
        pageName
      }) {
        var _a;
        const returnValues = {};
        const numActions = actions.length;
        const queueObject = __privateGet(this, _queue).create({
          type: "emit",
          kind: "emit",
          pageName,
          numActions: (actions == null ? void 0 : actions.length) || 0
        });
        try {
          for (let index = 0; index < numActions; index++) {
            let action = actions[index];
            if (u__namespace.isStr(action) && action.includes("=")) {
              action = { [action]: "" };
            }
            const clone2 = cloneDeep_1(action);
            const actionWithVals = replaceVars({
              vars: dataKey,
              source: clone2
            });
            if (nt__namespace.Identify.action.evalObject(action)) {
              try {
                yield (_a = action == null ? void 0 : action.object) == null ? void 0 : _a.call(action);
              } catch (error) {
                console.error(error);
              }
              const response = yield this.dispatch({
                type: dispatchActionType.EVAL_OBJECT,
                payload: { pageName, updateObject: action == null ? void 0 : action.object }
              });
              returnValues[index] = response || "";
            } else if (u__namespace.keys(action)[0].includes("@") || u__namespace.keys(action)[0].startsWith("=")) {
              const response = yield this.dispatch({
                type: dispatchActionType.EVAL_OBJECT,
                payload: { pageName, updateObject: actionWithVals }
              });
              returnValues[index] = response || "";
            } else if ("if" in action) {
              const response = yield this.handleIfCommand({
                pageName,
                ifCommand: actionWithVals
              });
              returnValues[index] = response || "";
            } else if (nt__namespace.Identify.folds.goto(action)) {
              yield this.handleEvalCommands({
                pageName,
                commands: actionWithVals,
                key: "goto"
              });
            }
          }
        } catch (error) {
          throw error instanceof Error ? error : new Error(String(error));
        } finally {
          __privateGet(this, _queue).remove(queueObject);
        }
        return u__namespace.values(returnValues);
      });
    }
    getApiCache(cacheIndex) {
      return this.root.apiCache[cacheIndex].data;
    }
    getState() {
      return __spreadValues(__spreadValues({}, __privateGet(this, _state)), __privateGet(this, _queue).getState());
    }
    getSubscribers() {
      return __privateGet(this, _subscribers);
    }
    on(evt, callback) {
      switch (evt) {
        case subscribe.QUEUE_START:
        case subscribe.QUEUE_END:
          return void __privateGet(this, _queue).on(evt, callback);
      }
    }
    get baseUrl() {
      return __privateGet(this, _baseUrl);
    }
    set baseUrl(baseUrl) {
      if (this.cadlBaseUrl) {
        __privateSet(this, _baseUrl, baseUrl.replace("${cadlBaseUrl}", this.cadlBaseUrl));
      }
    }
    get cadlBaseUrl() {
      if (!__privateGet(this, _cadlBaseUrl))
        return void 0;
      let withVersion = __privateGet(this, _cadlBaseUrl);
      if (withVersion.includes("cadlVersion")) {
        withVersion = withVersion.replace("${cadlVersion}", this.cadlVersion);
      }
      if (withVersion.includes("designSuffix")) {
        withVersion = withVersion.replace("${designSuffix}", this.designSuffix);
      }
      return withVersion;
    }
    set cadlBaseUrl(cadlBaseUrl) {
      __privateSet(this, _cadlBaseUrl, cadlBaseUrl);
    }
    get assetsUrl() {
      return __privateGet(this, _assetsUrl);
    }
    set assetsUrl(assetsUrl) {
      if (this.cadlBaseUrl) {
        __privateSet(this, _assetsUrl, assetsUrl.replace("${cadlBaseUrl}", this.cadlBaseUrl));
      }
    }
    get designSuffix() {
      const { greaterEqual, less, widthHeightRatioThreshold } = __privateGet(this, _designSuffix);
      return this.aspectRatio >= widthHeightRatioThreshold ? greaterEqual : less;
    }
    set designSuffix(designSuffix) {
      __privateSet(this, _designSuffix, designSuffix);
    }
    get aspectRatio() {
      return __privateGet(this, _aspectRatio);
    }
    set aspectRatio(aspectRatio) {
      __privateSet(this, _aspectRatio, aspectRatio);
      if (this.cadlBaseUrl)
        __privateSet(this, _baseUrl, this.cadlBaseUrl);
    }
    get root() {
      return __privateGet(this, _root);
    }
    set root(root) {
      __privateSet(this, _root, root || {});
    }
    set apiVersion(apiVersion) {
      store.apiVersion = apiVersion;
    }
    get apiVersion() {
      return store.apiVersion;
    }
    get config() {
      return __privateGet(this, _config);
    }
  }
  _aspectRatio = new WeakMap();
  _designSuffix = new WeakMap();
  _config = new WeakMap();
  _cadlBaseUrl = new WeakMap();
  _baseUrl = new WeakMap();
  _assetsUrl = new WeakMap();
  _dispatch = new WeakMap();
  _emit = new WeakMap();
  _root = new WeakMap();
  _state = new WeakMap();
  _subscribers = new WeakMap();
  _dbConfig = new WeakMap();
  _indexRepository = new WeakMap();
  _queue = new WeakMap();

  Object.defineProperty(exports, 'Level2Ecos', {
    enumerable: true,
    get: function () { return Level2Ecos__default["default"]; }
  });
  Object.defineProperty(exports, 'Level2Error', {
    enumerable: true,
    get: function () { return Level2Ecos.Level2Error; }
  });
  Object.defineProperty(exports, 'Level2Response', {
    enumerable: true,
    get: function () { return Level2Ecos.Level2Response; }
  });
  Object.defineProperty(exports, 'Doc', {
    enumerable: true,
    get: function () { return types_pb.Doc; }
  });
  Object.defineProperty(exports, 'Edge', {
    enumerable: true,
    get: function () { return types_pb.Edge; }
  });
  Object.defineProperty(exports, 'Vertex', {
    enumerable: true,
    get: function () { return types_pb.Vertex; }
  });
  exports.Account = Account;
  exports.CADL = CADL;
  exports.Document = Document;
  exports.cache = cache;
  exports.getBuiltInFns = builtInFns;
  exports.store = store;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
