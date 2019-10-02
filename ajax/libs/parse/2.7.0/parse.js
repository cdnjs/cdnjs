/**
 * Parse JavaScript SDK v2.7.0
 *
 * The source tree of this library can be found at
 *   https://github.com/ParsePlatform/Parse-SDK-JS
 */
(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.Parse = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(_dereq_,module,exports){
"use strict";

var _interopRequireDefault = _dereq_("@babel/runtime-corejs3/helpers/interopRequireDefault");

var _Object$defineProperty = _dereq_("@babel/runtime-corejs3/core-js-stable/object/define-property");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports.track = track;

var _CoreManager = _interopRequireDefault(_dereq_("./CoreManager"));
/**
 * Copyright (c) 2015-present, Parse, LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @flow
 */

/**
 * Parse.Analytics provides an interface to Parse's logging and analytics
 * backend.
 *
 * @class Parse.Analytics
 * @static
 * @hideconstructor
 */

/**
  * Tracks the occurrence of a custom event with additional dimensions.
  * Parse will store a data point at the time of invocation with the given
  * event name.
  *
  * Dimensions will allow segmentation of the occurrences of this custom
  * event. Keys and values should be {@code String}s, and will throw
  * otherwise.
  *
  * To track a user signup along with additional metadata, consider the
  * following:
  * <pre>
  * var dimensions = {
  *  gender: 'm',
  *  source: 'web',
  *  dayType: 'weekend'
  * };
  * Parse.Analytics.track('signup', dimensions);
  * </pre>
  *
  * There is a default limit of 8 dimensions per event tracked.
  *
  * @method track
  * @name Parse.Analytics.track
  * @param {String} name The name of the custom event to report to Parse as
  * having happened.
  * @param {Object} dimensions The dictionary of information by which to
  * segment this event.
  * @return {Promise} A promise that is resolved when the round-trip
  * to the server completes.
  */


function track(name
/*: string*/
, dimensions
/*: { [key: string]: string }*/
)
/*: Promise*/
{
  name = name || '';
  name = name.replace(/^\s*/, '');
  name = name.replace(/\s*$/, '');

  if (name.length === 0) {
    throw new TypeError('A name for the custom event must be provided');
  }

  for (var _key in dimensions) {
    if (typeof _key !== 'string' || typeof dimensions[_key] !== 'string') {
      throw new TypeError('track() dimensions expects keys and values of type "string".');
    }
  }

  return _CoreManager.default.getAnalyticsController().track(name, dimensions);
}

var DefaultController = {
  track: function (name, dimensions) {
    var RESTController = _CoreManager.default.getRESTController();

    return RESTController.request('POST', 'events/' + name, {
      dimensions: dimensions
    });
  }
};

_CoreManager.default.setAnalyticsController(DefaultController);
},{"./CoreManager":4,"@babel/runtime-corejs3/core-js-stable/object/define-property":71,"@babel/runtime-corejs3/helpers/interopRequireDefault":110}],2:[function(_dereq_,module,exports){
"use strict";

var _interopRequireDefault = _dereq_("@babel/runtime-corejs3/helpers/interopRequireDefault");

var _Object$defineProperty = _dereq_("@babel/runtime-corejs3/core-js-stable/object/define-property");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports.default = void 0;

var _ParseUser = _interopRequireDefault(_dereq_("./ParseUser"));
/**
 * Copyright (c) 2015-present, Parse, LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @flow-weak
 */


var uuidv4 = _dereq_('uuid/v4');
/*:: import type { RequestOptions } from './RESTController';*/


var registered = false;
/**
 * Provides utility functions for working with Anonymously logged-in users. <br />
 * Anonymous users have some unique characteristics:
 * <ul>
 *  <li>Anonymous users don't need a user name or password.</li>
 *  <ul>
 *    <li>Once logged out, an anonymous user cannot be recovered.</li>
 *  </ul>
 *  <li>signUp converts an anonymous user to a standard user with the given username and password.</li>
 *  <ul>
 *    <li>Data associated with the anonymous user is retained.</li>
 *  </ul>
 *  <li>logIn switches users without converting the anonymous user.</li>
 *  <ul>
 *    <li>Data associated with the anonymous user will be lost.</li>
 *  </ul>
 *  <li>Service logIn (e.g. Facebook, Twitter) will attempt to convert
 *  the anonymous user into a standard user by linking it to the service.</li>
 *  <ul>
 *    <li>If a user already exists that is linked to the service, it will instead switch to the existing user.</li>
 *  </ul>
 *  <li>Service linking (e.g. Facebook, Twitter) will convert the anonymous user
 *  into a standard user by linking it to the service.</li>
 * </ul>
 * @class Parse.AnonymousUtils
 * @static
 */

var AnonymousUtils = {
  /**
   * Gets whether the user has their account linked to anonymous user.
   *
   * @method isLinked
   * @name Parse.AnonymousUtils.isLinked
   * @param {Parse.User} user User to check for.
   *     The user must be logged in on this device.
   * @return {Boolean} <code>true</code> if the user has their account
   *     linked to an anonymous user.
   * @static
   */
  isLinked: function (user
  /*: ParseUser*/
  ) {
    var provider = this._getAuthProvider();

    return user._isLinked(provider.getAuthType());
  },

  /**
   * Logs in a user Anonymously.
   *
   * @method logIn
   * @name Parse.AnonymousUtils.logIn
   * @param {Object} options MasterKey / SessionToken.
   * @returns {Promise}
   * @static
   */
  logIn: function (options
  /*:: ?: RequestOptions*/
  ) {
    var provider = this._getAuthProvider();

    return _ParseUser.default._logInWith(provider.getAuthType(), provider.getAuthData(), options);
  },

  /**
   * Links Anonymous User to an existing PFUser.
   *
   * @method link
   * @name Parse.AnonymousUtils.link
   * @param {Parse.User} user User to link. This must be the current user.
   * @param {Object} options MasterKey / SessionToken.
   * @returns {Promise}
   * @static
   */
  link: function (user
  /*: ParseUser*/
  , options
  /*:: ?: RequestOptions*/
  ) {
    var provider = this._getAuthProvider();

    return user._linkWith(provider.getAuthType(), provider.getAuthData(), options);
  },
  _getAuthProvider: function () {
    var provider = {
      restoreAuthentication: function () {
        return true;
      },
      getAuthType: function () {
        return 'anonymous';
      },
      getAuthData: function () {
        return {
          authData: {
            id: uuidv4()
          }
        };
      }
    };

    if (!registered) {
      _ParseUser.default._registerAuthenticationProvider(provider);

      registered = true;
    }

    return provider;
  }
};
var _default = AnonymousUtils;
exports.default = _default;
},{"./ParseUser":31,"@babel/runtime-corejs3/core-js-stable/object/define-property":71,"@babel/runtime-corejs3/helpers/interopRequireDefault":110,"uuid/v4":423}],3:[function(_dereq_,module,exports){
"use strict";

var _interopRequireDefault = _dereq_("@babel/runtime-corejs3/helpers/interopRequireDefault");

var _Object$defineProperty = _dereq_("@babel/runtime-corejs3/core-js-stable/object/define-property");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports.run = run;
exports.getJobsData = getJobsData;
exports.startJob = startJob;
exports.getJobStatus = getJobStatus;

var _promise = _interopRequireDefault(_dereq_("@babel/runtime-corejs3/core-js-stable/promise"));

var _keys = _interopRequireDefault(_dereq_("@babel/runtime-corejs3/core-js-stable/object/keys"));

var _typeof2 = _interopRequireDefault(_dereq_("@babel/runtime-corejs3/helpers/typeof"));

var _CoreManager = _interopRequireDefault(_dereq_("./CoreManager"));

var _decode = _interopRequireDefault(_dereq_("./decode"));

var _encode = _interopRequireDefault(_dereq_("./encode"));

var _ParseError = _interopRequireDefault(_dereq_("./ParseError"));

var _ParseQuery = _interopRequireDefault(_dereq_("./ParseQuery"));

var _ParseObject = _interopRequireDefault(_dereq_("./ParseObject"));
/**
 * Copyright (c) 2015-present, Parse, LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @flow
 */

/**
 * Contains functions for calling and declaring
 * <a href="/docs/cloud_code_guide#functions">cloud functions</a>.
 * <p><strong><em>
 *   Some functions are only available from Cloud Code.
 * </em></strong></p>
 *
 * @class Parse.Cloud
 * @static
 * @hideconstructor
 */

/**
  * Makes a call to a cloud function.
  * @method run
  * @name Parse.Cloud.run
  * @param {String} name The function name.
  * @param {Object} data The parameters to send to the cloud function.
  * @param {Object} options
  * @return {Promise} A promise that will be resolved with the result
  * of the function.
  */


function run(name
/*: string*/
, data
/*: mixed*/
, options
/*: RequestOptions*/
)
/*: Promise<mixed>*/
{
  options = options || {};

  if (typeof name !== 'string' || name.length === 0) {
    throw new TypeError('Cloud function name must be a string.');
  }

  var requestOptions = {};

  if (options.useMasterKey) {
    requestOptions.useMasterKey = options.useMasterKey;
  }

  if (options.sessionToken) {
    requestOptions.sessionToken = options.sessionToken;
  }

  return _CoreManager.default.getCloudController().run(name, data, requestOptions);
}
/**
  * Gets data for the current set of cloud jobs.
  * @method getJobsData
  * @name Parse.Cloud.getJobsData
  * @return {Promise} A promise that will be resolved with the result
  * of the function.
  */


function getJobsData()
/*: Promise<Object>*/
{
  return _CoreManager.default.getCloudController().getJobsData({
    useMasterKey: true
  });
}
/**
  * Starts a given cloud job, which will process asynchronously.
  * @method startJob
  * @name Parse.Cloud.startJob
  * @param {String} name The function name.
  * @param {Object} data The parameters to send to the cloud function.
  * @return {Promise} A promise that will be resolved with the jobStatusId
  * of the job.
  */


function startJob(name
/*: string*/
, data
/*: mixed*/
)
/*: Promise<string>*/
{
  if (typeof name !== 'string' || name.length === 0) {
    throw new TypeError('Cloud job name must be a string.');
  }

  return _CoreManager.default.getCloudController().startJob(name, data, {
    useMasterKey: true
  });
}
/**
  * Gets job status by Id
  * @method getJobStatus
  * @name Parse.Cloud.getJobStatus
  * @param {String} jobStatusId The Id of Job Status.
  * @return {Parse.Object} Status of Job.
  */


function getJobStatus(jobStatusId
/*: string*/
)
/*: Promise<ParseObject>*/
{
  var query = new _ParseQuery.default('_JobStatus');
  return query.get(jobStatusId, {
    useMasterKey: true
  });
}

var DefaultController = {
  run: function (name, data, options
  /*: RequestOptions*/
  ) {
    var RESTController = _CoreManager.default.getRESTController();

    var payload = (0, _encode.default)(data, true);
    var request = RESTController.request('POST', 'functions/' + name, payload, options);
    return request.then(function (res) {
      if ((0, _typeof2.default)(res) === 'object' && (0, _keys.default)(res).length > 0 && !res.hasOwnProperty('result')) {
        throw new _ParseError.default(_ParseError.default.INVALID_JSON, 'The server returned an invalid response.');
      }

      var decoded = (0, _decode.default)(res);

      if (decoded && decoded.hasOwnProperty('result')) {
        return _promise.default.resolve(decoded.result);
      }

      return _promise.default.resolve(undefined);
    });
  },
  getJobsData: function (options
  /*: RequestOptions*/
  ) {
    var RESTController = _CoreManager.default.getRESTController();

    return RESTController.request('GET', 'cloud_code/jobs/data', null, options);
  },
  startJob: function (name, data, options
  /*: RequestOptions*/
  ) {
    var RESTController = _CoreManager.default.getRESTController();

    var payload = (0, _encode.default)(data, true);
    return RESTController.request('POST', 'jobs/' + name, payload, options);
  }
};

_CoreManager.default.setCloudController(DefaultController);
},{"./CoreManager":4,"./ParseError":18,"./ParseObject":23,"./ParseQuery":26,"./decode":41,"./encode":42,"@babel/runtime-corejs3/core-js-stable/object/define-property":71,"@babel/runtime-corejs3/core-js-stable/object/keys":76,"@babel/runtime-corejs3/core-js-stable/promise":78,"@babel/runtime-corejs3/helpers/interopRequireDefault":110,"@babel/runtime-corejs3/helpers/typeof":122}],4:[function(_dereq_,module,exports){
(function (process){
/*:: import type { AttributeMap, ObjectCache, OpsMap, State } from './ObjectStateMutations';*/

/*:: import type ParseFile from './ParseFile';*/

/*:: import type { FileSource } from './ParseFile';*/

/*:: import type { Op } from './ParseOp';*/

/*:: import type ParseObject from './ParseObject';*/

/*:: import type { QueryJSON } from './ParseQuery';*/

/*:: import type ParseUser from './ParseUser';*/

/*:: import type { AuthData } from './ParseUser';*/

/*:: import type { PushData } from './Push';*/

/*:: import type { RequestOptions, FullOptions } from './RESTController';*/

/*:: type AnalyticsController = {
  track: (name: string, dimensions: { [key: string]: string }) => Promise;
};*/

/*:: type CloudController = {
  run: (name: string, data: mixed, options: RequestOptions) => Promise;
  getJobsData: (options: RequestOptions) => Promise;
  startJob: (name: string, data: mixed, options: RequestOptions) => Promise;
};*/

/*:: type ConfigController = {
  current: () => Promise;
  get: () => Promise;
  save: (attrs: { [key: string]: any }) => Promise;
};*/

/*:: type FileController = {
  saveFile: (name: string, source: FileSource, options: FullOptions) => Promise;
  saveBase64: (name: string, source: FileSource, options: FullOptions) => Promise;
  download: (uri: string) => Promise;
};*/

/*:: type InstallationController = {
  currentInstallationId: () => Promise;
};*/

/*:: type ObjectController = {
  fetch: (object: ParseObject | Array<ParseObject>, forceFetch: boolean, options: RequestOptions) => Promise;
  save: (object: ParseObject | Array<ParseObject | ParseFile>, options: RequestOptions) => Promise;
  destroy: (object: ParseObject | Array<ParseObject>, options: RequestOptions) => Promise;
};*/

/*:: type ObjectStateController = {
  getState: (obj: any) => ?State;
  initializeState: (obj: any, initial?: State) => State;
  removeState: (obj: any) => ?State;
  getServerData: (obj: any) => AttributeMap;
  setServerData: (obj: any, attributes: AttributeMap) => void;
  getPendingOps: (obj: any) => Array<OpsMap>;
  setPendingOp: (obj: any, attr: string, op: ?Op) => void;
  pushPendingState: (obj: any) => void;
  popPendingState: (obj: any) => OpsMap;
  mergeFirstPendingState: (obj: any) => void;
  getObjectCache: (obj: any) => ObjectCache;
  estimateAttribute: (obj: any, attr: string) => mixed;
  estimateAttributes: (obj: any) => AttributeMap;
  commitServerChanges: (obj: any, changes: AttributeMap) => void;
  enqueueTask: (obj: any, task: () => Promise) => Promise;
  clearAllState: () => void;
  duplicateState: (source: any, dest: any) => void;
};*/

/*:: type PushController = {
  send: (data: PushData, options: RequestOptions) => Promise;
};*/

/*:: type QueryController = {
  find: (className: string, params: QueryJSON, options: RequestOptions) => Promise;
  aggregate: (className: string, params: any, options: RequestOptions) => Promise;
};*/

/*:: type RESTController = {
  request: (method: string, path: string, data: mixed, options: RequestOptions) => Promise;
  ajax: (method: string, url: string, data: any, headers?: any, options: FullOptions) => Promise;
};*/

/*:: type SchemaController = {
  purge: (className: string) => Promise;
  get: (className: string, options: RequestOptions) => Promise;
  delete: (className: string, options: RequestOptions) => Promise;
  create: (className: string, params: any, options: RequestOptions) => Promise;
  update: (className: string, params: any, options: RequestOptions) => Promise;
  send(className: string, method: string, params: any, options: RequestOptions): Promise;
};*/

/*:: type SessionController = {
  getSession: (token: RequestOptions) => Promise;
};*/

/*:: type StorageController = {
  async: 0;
  getItem: (path: string) => ?string;
  setItem: (path: string, value: string) => void;
  removeItem: (path: string) => void;
  getItemAsync?: (path: string) => Promise;
  setItemAsync?: (path: string, value: string) => Promise;
  removeItemAsync?: (path: string) => Promise;
  clear: () => void;
} | {
  async: 1;
  getItem?: (path: string) => ?string;
  setItem?: (path: string, value: string) => void;
  removeItem?: (path: string) => void;
  getItemAsync: (path: string) => Promise;
  setItemAsync: (path: string, value: string) => Promise;
  removeItemAsync: (path: string) => Promise;
  clear: () => void;
};*/

/*:: type LocalDatastoreController = {
  fromPinWithName: (name: string) => ?any;
  pinWithName: (name: string, objects: any) => void;
  unPinWithName: (name: string) => void;
  getAllContents: () => ?any;
  clear: () => void;
};*/

/*:: type UserController = {
  setCurrentUser: (user: ParseUser) => Promise;
  currentUser: () => ?ParseUser;
  currentUserAsync: () => Promise;
  signUp: (user: ParseUser, attrs: AttributeMap, options: RequestOptions) => Promise;
  logIn: (user: ParseUser, options: RequestOptions) => Promise;
  become: (options: RequestOptions) => Promise;
  hydrate: (userJSON: AttributeMap) => Promise;
  logOut: (options: RequestOptions) => Promise;
  me: (options: RequestOptions) => Promise;
  requestPasswordReset: (email: string, options: RequestOptions) => Promise;
  updateUserOnDisk: (user: ParseUser) => Promise;
  upgradeToRevocableSession: (user: ParseUser, options: RequestOptions) => Promise;
  linkWith: (user: ParseUser, authData: AuthData) => Promise;
  removeUserFromDisk: () => Promise;
};*/

/*:: type HooksController = {
  get: (type: string, functionName?: string, triggerName?: string) => Promise;
  create: (hook: mixed) => Promise;
  delete: (hook: mixed) => Promise;
  update: (hook: mixed) => Promise;
  send: (method: string, path: string, body?: mixed) => Promise;
};*/

/*:: type WebSocketController = {
  onopen: () => void;
  onmessage: (message: any) => void;
  onclose: () => void;
  onerror: (error: any) => void;
  send: (data: any) => void;
  close: () => void;
}*/

/*:: type Config = {
  AnalyticsController?: AnalyticsController,
  CloudController?: CloudController,
  ConfigController?: ConfigController,
  FileController?: FileController,
  InstallationController?: InstallationController,
  ObjectController?: ObjectController,
  ObjectStateController?: ObjectStateController,
  PushController?: PushController,
  QueryController?: QueryController,
  RESTController?: RESTController,
  SchemaController?: SchemaController,
  SessionController?: SessionController,
  StorageController?: StorageController,
  LocalDatastoreController?: LocalDatastoreController,
  UserController?: UserController,
  HooksController?: HooksController,
  WebSocketController?: WebSocketController,
};*/
"use strict";

var _interopRequireDefault = _dereq_("@babel/runtime-corejs3/helpers/interopRequireDefault");

var _concat = _interopRequireDefault(_dereq_("@babel/runtime-corejs3/core-js-stable/instance/concat"));

var _forEach = _interopRequireDefault(_dereq_("@babel/runtime-corejs3/core-js-stable/instance/for-each"));
/*
 * Copyright (c) 2015-present, Parse, LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @flow
 */


var config
/*: Config & { [key: string]: mixed }*/
= {
  // Defaults
  IS_NODE: typeof process !== 'undefined' && !!process.versions && !!process.versions.node && !process.versions.electron,
  REQUEST_ATTEMPT_LIMIT: 5,
  SERVER_URL: 'https://api.parse.com/1',
  SERVER_AUTH_TYPE: null,
  SERVER_AUTH_TOKEN: null,
  LIVEQUERY_SERVER_URL: null,
  VERSION: 'js' + "2.7.0",
  APPLICATION_ID: null,
  JAVASCRIPT_KEY: null,
  MASTER_KEY: null,
  USE_MASTER_KEY: false,
  PERFORM_USER_REWRITE: true,
  FORCE_REVOCABLE_SESSION: false
};

function requireMethods(name
/*: string*/
, methods
/*: Array<string>*/
, controller
/*: any*/
) {
  (0, _forEach.default)(methods).call(methods, function (func) {
    if (typeof controller[func] !== 'function') {
      var _context;

      throw new Error((0, _concat.default)(_context = "".concat(name, " must implement ")).call(_context, func, "()"));
    }
  });
}

module.exports = {
  get: function (key
  /*: string*/
  )
  /*: any*/
  {
    if (config.hasOwnProperty(key)) {
      return config[key];
    }

    throw new Error('Configuration key not found: ' + key);
  },
  set: function (key
  /*: string*/
  , value
  /*: any*/
  )
  /*: void*/
  {
    config[key] = value;
  },

  /* Specialized Controller Setters/Getters */
  setAnalyticsController: function (controller
  /*: AnalyticsController*/
  ) {
    requireMethods('AnalyticsController', ['track'], controller);
    config['AnalyticsController'] = controller;
  },
  getAnalyticsController: function ()
  /*: AnalyticsController*/
  {
    return config['AnalyticsController'];
  },
  setCloudController: function (controller
  /*: CloudController*/
  ) {
    requireMethods('CloudController', ['run', 'getJobsData', 'startJob'], controller);
    config['CloudController'] = controller;
  },
  getCloudController: function ()
  /*: CloudController*/
  {
    return config['CloudController'];
  },
  setConfigController: function (controller
  /*: ConfigController*/
  ) {
    requireMethods('ConfigController', ['current', 'get', 'save'], controller);
    config['ConfigController'] = controller;
  },
  getConfigController: function ()
  /*: ConfigController*/
  {
    return config['ConfigController'];
  },
  setFileController: function (controller
  /*: FileController*/
  ) {
    requireMethods('FileController', ['saveFile', 'saveBase64'], controller);
    config['FileController'] = controller;
  },
  getFileController: function ()
  /*: FileController*/
  {
    return config['FileController'];
  },
  setInstallationController: function (controller
  /*: InstallationController*/
  ) {
    requireMethods('InstallationController', ['currentInstallationId'], controller);
    config['InstallationController'] = controller;
  },
  getInstallationController: function ()
  /*: InstallationController*/
  {
    return config['InstallationController'];
  },
  setObjectController: function (controller
  /*: ObjectController*/
  ) {
    requireMethods('ObjectController', ['save', 'fetch', 'destroy'], controller);
    config['ObjectController'] = controller;
  },
  getObjectController: function ()
  /*: ObjectController*/
  {
    return config['ObjectController'];
  },
  setObjectStateController: function (controller
  /*: ObjectStateController*/
  ) {
    requireMethods('ObjectStateController', ['getState', 'initializeState', 'removeState', 'getServerData', 'setServerData', 'getPendingOps', 'setPendingOp', 'pushPendingState', 'popPendingState', 'mergeFirstPendingState', 'getObjectCache', 'estimateAttribute', 'estimateAttributes', 'commitServerChanges', 'enqueueTask', 'clearAllState'], controller);
    config['ObjectStateController'] = controller;
  },
  getObjectStateController: function ()
  /*: ObjectStateController*/
  {
    return config['ObjectStateController'];
  },
  setPushController: function (controller
  /*: PushController*/
  ) {
    requireMethods('PushController', ['send'], controller);
    config['PushController'] = controller;
  },
  getPushController: function ()
  /*: PushController*/
  {
    return config['PushController'];
  },
  setQueryController: function (controller
  /*: QueryController*/
  ) {
    requireMethods('QueryController', ['find', 'aggregate'], controller);
    config['QueryController'] = controller;
  },
  getQueryController: function ()
  /*: QueryController*/
  {
    return config['QueryController'];
  },
  setRESTController: function (controller
  /*: RESTController*/
  ) {
    requireMethods('RESTController', ['request', 'ajax'], controller);
    config['RESTController'] = controller;
  },
  getRESTController: function ()
  /*: RESTController*/
  {
    return config['RESTController'];
  },
  setSchemaController: function (controller
  /*: SchemaController*/
  ) {
    requireMethods('SchemaController', ['get', 'create', 'update', 'delete', 'send', 'purge'], controller);
    config['SchemaController'] = controller;
  },
  getSchemaController: function ()
  /*: SchemaController*/
  {
    return config['SchemaController'];
  },
  setSessionController: function (controller
  /*: SessionController*/
  ) {
    requireMethods('SessionController', ['getSession'], controller);
    config['SessionController'] = controller;
  },
  getSessionController: function ()
  /*: SessionController*/
  {
    return config['SessionController'];
  },
  setStorageController: function (controller
  /*: StorageController*/
  ) {
    if (controller.async) {
      requireMethods('An async StorageController', ['getItemAsync', 'setItemAsync', 'removeItemAsync'], controller);
    } else {
      requireMethods('A synchronous StorageController', ['getItem', 'setItem', 'removeItem'], controller);
    }

    config['StorageController'] = controller;
  },
  setLocalDatastoreController: function (controller
  /*: LocalDatastoreController*/
  ) {
    requireMethods('LocalDatastoreController', ['pinWithName', 'fromPinWithName', 'unPinWithName', 'getAllContents', 'clear'], controller);
    config['LocalDatastoreController'] = controller;
  },
  getLocalDatastoreController: function ()
  /*: LocalDatastoreController*/
  {
    return config['LocalDatastoreController'];
  },
  setLocalDatastore: function (store
  /*: any*/
  ) {
    config['LocalDatastore'] = store;
  },
  getLocalDatastore: function () {
    return config['LocalDatastore'];
  },
  getStorageController: function ()
  /*: StorageController*/
  {
    return config['StorageController'];
  },
  setAsyncStorage: function (storage
  /*: any*/
  ) {
    config['AsyncStorage'] = storage;
  },
  getAsyncStorage: function () {
    return config['AsyncStorage'];
  },
  setWebSocketController: function (controller
  /*: WebSocketController*/
  ) {
    config['WebSocketController'] = controller;
  },
  getWebSocketController: function ()
  /*: WebSocketController*/
  {
    return config['WebSocketController'];
  },
  setUserController: function (controller
  /*: UserController*/
  ) {
    requireMethods('UserController', ['setCurrentUser', 'currentUser', 'currentUserAsync', 'signUp', 'logIn', 'become', 'logOut', 'me', 'requestPasswordReset', 'upgradeToRevocableSession', 'linkWith'], controller);
    config['UserController'] = controller;
  },
  getUserController: function ()
  /*: UserController*/
  {
    return config['UserController'];
  },
  setLiveQueryController: function (controller
  /*: any*/
  ) {
    requireMethods('LiveQueryController', ['setDefaultLiveQueryClient', 'getDefaultLiveQueryClient', '_clearCachedDefaultClient'], controller);
    config['LiveQueryController'] = controller;
  },
  getLiveQueryController: function ()
  /*: any*/
  {
    return config['LiveQueryController'];
  },
  setHooksController: function (controller
  /*: HooksController*/
  ) {
    requireMethods('HooksController', ['create', 'get', 'update', 'remove'], controller);
    config['HooksController'] = controller;
  },
  getHooksController: function ()
  /*: HooksController*/
  {
    return config['HooksController'];
  }
};
}).call(this,_dereq_('_process'))
},{"@babel/runtime-corejs3/core-js-stable/instance/concat":53,"@babel/runtime-corejs3/core-js-stable/instance/for-each":56,"@babel/runtime-corejs3/helpers/interopRequireDefault":110,"_process":126}],5:[function(_dereq_,module,exports){
"use strict";
/**
 * Copyright (c) 2015-present, Parse, LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * This is a simple wrapper to unify EventEmitter implementations across platforms.
 */

module.exports = _dereq_('events').EventEmitter;
var EventEmitter;
},{"events":420}],6:[function(_dereq_,module,exports){
"use strict";

var _interopRequireDefault = _dereq_("@babel/runtime-corejs3/helpers/interopRequireDefault");

var _Object$defineProperty = _dereq_("@babel/runtime-corejs3/core-js-stable/object/define-property");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports.default = void 0;

var _ParseUser = _interopRequireDefault(_dereq_("./ParseUser"));
/**
 * Copyright (c) 2015-present, Parse, LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @flow-weak
 */

/* global FB */


var initialized = false;
var requestedPermissions;
var initOptions;
var provider = {
  authenticate: function (options) {
    var _this = this;

    if (typeof FB === 'undefined') {
      options.error(this, 'Facebook SDK not found.');
    }

    FB.login(function (response) {
      if (response.authResponse) {
        if (options.success) {
          options.success(_this, {
            id: response.authResponse.userID,
            access_token: response.authResponse.accessToken,
            expiration_date: new Date(response.authResponse.expiresIn * 1000 + new Date().getTime()).toJSON()
          });
        }
      } else {
        if (options.error) {
          options.error(_this, response);
        }
      }
    }, {
      scope: requestedPermissions
    });
  },
  restoreAuthentication: function (authData) {
    if (authData) {
      var newOptions = {};

      if (initOptions) {
        for (var key in initOptions) {
          newOptions[key] = initOptions[key];
        }
      } // Suppress checks for login status from the browser.


      newOptions.status = false; // If the user doesn't match the one known by the FB SDK, log out.
      // Most of the time, the users will match -- it's only in cases where
      // the FB SDK knows of a different user than the one being restored
      // from a Parse User that logged in with username/password.

      var existingResponse = FB.getAuthResponse();

      if (existingResponse && existingResponse.userID !== authData.id) {
        FB.logout();
      }

      FB.init(newOptions);
    }

    return true;
  },
  getAuthType: function () {
    return 'facebook';
  },
  deauthenticate: function () {
    this.restoreAuthentication(null);
  }
};
/**
 * Provides a set of utilities for using Parse with Facebook.
 * @class Parse.FacebookUtils
 * @static
 * @hideconstructor
 */

var FacebookUtils = {
  /**
   * Initializes Parse Facebook integration.  Call this function after you
   * have loaded the Facebook Javascript SDK with the same parameters
   * as you would pass to<code>
   * <a href=
   * "https://developers.facebook.com/docs/reference/javascript/FB.init/">
   * FB.init()</a></code>.  Parse.FacebookUtils will invoke FB.init() for you
   * with these arguments.
   *
   * @method init
   * @name Parse.FacebookUtils.init
   * @param {Object} options Facebook options argument as described here:
   *   <a href=
   *   "https://developers.facebook.com/docs/reference/javascript/FB.init/">
   *   FB.init()</a>. The status flag will be coerced to 'false' because it
   *   interferes with Parse Facebook integration. Call FB.getLoginStatus()
   *   explicitly if this behavior is required by your application.
   */
  init: function (options) {
    if (typeof FB === 'undefined') {
      throw new Error('The Facebook JavaScript SDK must be loaded before calling init.');
    }

    initOptions = {};

    if (options) {
      for (var key in options) {
        initOptions[key] = options[key];
      }
    }

    if (initOptions.status && typeof console !== 'undefined') {
      var warn = console.warn || console.log || function () {}; // eslint-disable-line no-console


      warn.call(console, 'The "status" flag passed into' + ' FB.init, when set to true, can interfere with Parse Facebook' + ' integration, so it has been suppressed. Please call' + ' FB.getLoginStatus() explicitly if you require this behavior.');
    }

    initOptions.status = false;
    FB.init(initOptions);

    _ParseUser.default._registerAuthenticationProvider(provider);

    initialized = true;
  },

  /**
   * Gets whether the user has their account linked to Facebook.
   *
   * @method isLinked
   * @name Parse.FacebookUtils.isLinked
   * @param {Parse.User} user User to check for a facebook link.
   *     The user must be logged in on this device.
   * @return {Boolean} <code>true</code> if the user has their account
   *     linked to Facebook.
   */
  isLinked: function (user) {
    return user._isLinked('facebook');
  },

  /**
   * Logs in a user using Facebook. This method delegates to the Facebook
   * SDK to authenticate the user, and then automatically logs in (or
   * creates, in the case where it is a new user) a Parse.User.
   *
   * Standard API:
   *
   * <code>logIn(permission: string, authData: Object);</code>
   *
   * Advanced API: Used for handling your own oAuth tokens
   * {@link https://docs.parseplatform.org/rest/guide/#linking-users}
   *
   * <code>logIn(authData: Object, options?: Object);</code>
   *
   * @method logIn
   * @name Parse.FacebookUtils.logIn
   * @param {(String|Object)} permissions The permissions required for Facebook
   *    log in.  This is a comma-separated string of permissions.
   *    Alternatively, supply a Facebook authData object as described in our
   *    REST API docs if you want to handle getting facebook auth tokens
   *    yourself.
   * @param {Object} options MasterKey / SessionToken. Alternatively can be used for authData if permissions is a string
   * @returns {Promise}
   */
  logIn: function (permissions, options) {
    if (!permissions || typeof permissions === 'string') {
      if (!initialized) {
        throw new Error('You must initialize FacebookUtils before calling logIn.');
      }

      requestedPermissions = permissions;
      return _ParseUser.default._logInWith('facebook', options);
    }

    return _ParseUser.default._logInWith('facebook', {
      authData: permissions
    }, options);
  },

  /**
   * Links Facebook to an existing PFUser. This method delegates to the
   * Facebook SDK to authenticate the user, and then automatically links
   * the account to the Parse.User.
   *
   * Standard API:
   *
   * <code>link(user: Parse.User, permission: string, authData?: Object);</code>
   *
   * Advanced API: Used for handling your own oAuth tokens
   * {@link https://docs.parseplatform.org/rest/guide/#linking-users}
   *
   * <code>link(user: Parse.User, authData: Object, options?: FullOptions);</code>
   *
   * @method link
   * @name Parse.FacebookUtils.link
   * @param {Parse.User} user User to link to Facebook. This must be the
   *     current user.
   * @param {(String|Object)} permissions The permissions required for Facebook
   *    log in.  This is a comma-separated string of permissions.
   *    Alternatively, supply a Facebook authData object as described in our
   *    REST API docs if you want to handle getting facebook auth tokens
   *    yourself.
   * @param {Object} options MasterKey / SessionToken. Alternatively can be used for authData if permissions is a string
   * @returns {Promise}
   */
  link: function (user, permissions, options) {
    if (!permissions || typeof permissions === 'string') {
      if (!initialized) {
        throw new Error('You must initialize FacebookUtils before calling link.');
      }

      requestedPermissions = permissions;
      return user._linkWith('facebook', options);
    }

    return user._linkWith('facebook', {
      authData: permissions
    }, options);
  },

  /**
   * Unlinks the Parse.User from a Facebook account.
   *
   * @method unlink
   * @name Parse.FacebookUtils.unlink
   * @param {Parse.User} user User to unlink from Facebook. This must be the
   *     current user.
   * @param {Object} options Standard options object with success and error
   *    callbacks.
   * @returns {Promise}
   */
  unlink: function (user, options) {
    if (!initialized) {
      throw new Error('You must initialize FacebookUtils before calling unlink.');
    }

    return user._unlinkFrom('facebook', options);
  },
  // Used for testing purposes
  _getAuthProvider: function () {
    return provider;
  }
};
var _default = FacebookUtils;
exports.default = _default;
},{"./ParseUser":31,"@babel/runtime-corejs3/core-js-stable/object/define-property":71,"@babel/runtime-corejs3/helpers/interopRequireDefault":110}],7:[function(_dereq_,module,exports){
"use strict";

var _interopRequireDefault = _dereq_("@babel/runtime-corejs3/helpers/interopRequireDefault");

var _promise = _interopRequireDefault(_dereq_("@babel/runtime-corejs3/core-js-stable/promise"));

var _Storage = _interopRequireDefault(_dereq_("./Storage"));
/**
 * Copyright (c) 2015-present, Parse, LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @flow
 */


var iidCache = null;

function hexOctet() {
  return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
}

function generateId() {
  return hexOctet() + hexOctet() + '-' + hexOctet() + '-' + hexOctet() + '-' + hexOctet() + '-' + hexOctet() + hexOctet() + hexOctet();
}

var InstallationController = {
  currentInstallationId: function ()
  /*: Promise<string>*/
  {
    if (typeof iidCache === 'string') {
      return _promise.default.resolve(iidCache);
    }

    var path = _Storage.default.generatePath('installationId');

    return _Storage.default.getItemAsync(path).then(function (iid) {
      if (!iid) {
        iid = generateId();
        return _Storage.default.setItemAsync(path, iid).then(function () {
          iidCache = iid;
          return iid;
        });
      }

      iidCache = iid;
      return iid;
    });
  },
  _clearCache: function () {
    iidCache = null;
  },
  _setInstallationIdCache: function (iid
  /*: string*/
  ) {
    iidCache = iid;
  }
};
module.exports = InstallationController;
},{"./Storage":35,"@babel/runtime-corejs3/core-js-stable/promise":78,"@babel/runtime-corejs3/helpers/interopRequireDefault":110}],8:[function(_dereq_,module,exports){
"use strict";

var _interopRequireDefault = _dereq_("@babel/runtime-corejs3/helpers/interopRequireDefault");

var _Object$defineProperty = _dereq_("@babel/runtime-corejs3/core-js-stable/object/define-property");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports.default = void 0;

var _typeof2 = _interopRequireDefault(_dereq_("@babel/runtime-corejs3/helpers/typeof"));

var _bind = _interopRequireDefault(_dereq_("@babel/runtime-corejs3/core-js-stable/instance/bind"));

var _setTimeout2 = _interopRequireDefault(_dereq_("@babel/runtime-corejs3/core-js-stable/set-timeout"));

var _values = _interopRequireDefault(_dereq_("@babel/runtime-corejs3/core-js-stable/instance/values"));

var _getIterator2 = _interopRequireDefault(_dereq_("@babel/runtime-corejs3/core-js/get-iterator"));

var _forEach = _interopRequireDefault(_dereq_("@babel/runtime-corejs3/core-js-stable/instance/for-each"));

var _stringify = _interopRequireDefault(_dereq_("@babel/runtime-corejs3/core-js-stable/json/stringify"));

var _keys = _interopRequireDefault(_dereq_("@babel/runtime-corejs3/core-js-stable/instance/keys"));

var _map = _interopRequireDefault(_dereq_("@babel/runtime-corejs3/core-js-stable/map"));

var _indexOf = _interopRequireDefault(_dereq_("@babel/runtime-corejs3/core-js-stable/instance/index-of"));

var _classCallCheck2 = _interopRequireDefault(_dereq_("@babel/runtime-corejs3/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(_dereq_("@babel/runtime-corejs3/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(_dereq_("@babel/runtime-corejs3/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(_dereq_("@babel/runtime-corejs3/helpers/getPrototypeOf"));

var _assertThisInitialized2 = _interopRequireDefault(_dereq_("@babel/runtime-corejs3/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(_dereq_("@babel/runtime-corejs3/helpers/inherits"));

var _defineProperty2 = _interopRequireDefault(_dereq_("@babel/runtime-corejs3/helpers/defineProperty"));

var _CoreManager = _interopRequireDefault(_dereq_("./CoreManager"));

var _EventEmitter2 = _interopRequireDefault(_dereq_("./EventEmitter"));

var _ParseObject = _interopRequireDefault(_dereq_("./ParseObject"));

var _LiveQuerySubscription = _interopRequireDefault(_dereq_("./LiveQuerySubscription"));

var _promiseUtils = _dereq_("./promiseUtils");
/**
 * Copyright (c) 2015-present, Parse, LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */

/* global WebSocket */
// The LiveQuery client inner state


var CLIENT_STATE = {
  INITIALIZED: 'initialized',
  CONNECTING: 'connecting',
  CONNECTED: 'connected',
  CLOSED: 'closed',
  RECONNECTING: 'reconnecting',
  DISCONNECTED: 'disconnected'
}; // The event type the LiveQuery client should sent to server

var OP_TYPES = {
  CONNECT: 'connect',
  SUBSCRIBE: 'subscribe',
  UNSUBSCRIBE: 'unsubscribe',
  ERROR: 'error'
}; // The event we get back from LiveQuery server

var OP_EVENTS = {
  CONNECTED: 'connected',
  SUBSCRIBED: 'subscribed',
  UNSUBSCRIBED: 'unsubscribed',
  ERROR: 'error',
  CREATE: 'create',
  UPDATE: 'update',
  ENTER: 'enter',
  LEAVE: 'leave',
  DELETE: 'delete'
}; // The event the LiveQuery client should emit

var CLIENT_EMMITER_TYPES = {
  CLOSE: 'close',
  ERROR: 'error',
  OPEN: 'open'
}; // The event the LiveQuery subscription should emit

var SUBSCRIPTION_EMMITER_TYPES = {
  OPEN: 'open',
  CLOSE: 'close',
  ERROR: 'error',
  CREATE: 'create',
  UPDATE: 'update',
  ENTER: 'enter',
  LEAVE: 'leave',
  DELETE: 'delete'
};

var generateInterval = function (k) {
  return Math.random() * Math.min(30, Math.pow(2, k) - 1) * 1000;
};
/**
 * Creates a new LiveQueryClient.
 * Extends events.EventEmitter
 * <a href="https://nodejs.org/api/events.html#events_class_eventemitter">cloud functions</a>.
 *
 * A wrapper of a standard WebSocket client. We add several useful methods to
 * help you connect/disconnect to LiveQueryServer, subscribe/unsubscribe a ParseQuery easily.
 *
 * javascriptKey and masterKey are used for verifying the LiveQueryClient when it tries
 * to connect to the LiveQuery server
 *
 * We expose three events to help you monitor the status of the LiveQueryClient.
 *
 * <pre>
 * let Parse = require('parse/node');
 * let LiveQueryClient = Parse.LiveQueryClient;
 * let client = new LiveQueryClient({
 *   applicationId: '',
 *   serverURL: '',
 *   javascriptKey: '',
 *   masterKey: ''
 *  });
 * </pre>
 *
 * Open - When we establish the WebSocket connection to the LiveQuery server, you'll get this event.
 * <pre>
 * client.on('open', () => {
 *
 * });</pre>
 *
 * Close - When we lose the WebSocket connection to the LiveQuery server, you'll get this event.
 * <pre>
 * client.on('close', () => {
 *
 * });</pre>
 *
 * Error - When some network error or LiveQuery server error happens, you'll get this event.
 * <pre>
 * client.on('error', (error) => {
 *
 * });</pre>
 * @alias Parse.LiveQueryClient
 */


var LiveQueryClient =
/*#__PURE__*/
function (_EventEmitter) {
  (0, _inherits2.default)(LiveQueryClient, _EventEmitter);
  /**
   * @param {Object} options
   * @param {string} options.applicationId - applicationId of your Parse app
   * @param {string} options.serverURL - <b>the URL of your LiveQuery server</b>
   * @param {string} options.javascriptKey (optional)
   * @param {string} options.masterKey (optional) Your Parse Master Key. (Node.js only!)
   * @param {string} options.sessionToken (optional)
   */

  function LiveQueryClient(_ref) {
    var _this;

    var applicationId = _ref.applicationId,
        serverURL = _ref.serverURL,
        javascriptKey = _ref.javascriptKey,
        masterKey = _ref.masterKey,
        sessionToken = _ref.sessionToken;
    (0, _classCallCheck2.default)(this, LiveQueryClient);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(LiveQueryClient).call(this));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "attempts", void 0);
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "id", void 0);
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "requestId", void 0);
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "applicationId", void 0);
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "serverURL", void 0);
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "javascriptKey", void 0);
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "masterKey", void 0);
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "sessionToken", void 0);
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "connectPromise", void 0);
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "subscriptions", void 0);
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "socket", void 0);
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "state", void 0);

    if (!serverURL || (0, _indexOf.default)(serverURL).call(serverURL, 'ws') !== 0) {
      throw new Error('You need to set a proper Parse LiveQuery server url before using LiveQueryClient');
    }

    _this.reconnectHandle = null;
    _this.attempts = 1;
    _this.id = 0;
    _this.requestId = 1;
    _this.serverURL = serverURL;
    _this.applicationId = applicationId;
    _this.javascriptKey = javascriptKey;
    _this.masterKey = masterKey;
    _this.sessionToken = sessionToken;
    _this.connectPromise = (0, _promiseUtils.resolvingPromise)();
    _this.subscriptions = new _map.default();
    _this.state = CLIENT_STATE.INITIALIZED;
    return _this;
  }

  (0, _createClass2.default)(LiveQueryClient, [{
    key: "shouldOpen",
    value: function ()
    /*: any*/
    {
      return this.state === CLIENT_STATE.INITIALIZED || this.state === CLIENT_STATE.DISCONNECTED;
    }
    /**
     * Subscribes to a ParseQuery
     *
     * If you provide the sessionToken, when the LiveQuery server gets ParseObject's
     * updates from parse server, it'll try to check whether the sessionToken fulfills
     * the ParseObject's ACL. The LiveQuery server will only send updates to clients whose
     * sessionToken is fit for the ParseObject's ACL. You can check the LiveQuery protocol
     * <a href="https://github.com/parse-community/parse-server/wiki/Parse-LiveQuery-Protocol-Specification">here</a> for more details. The subscription you get is the same subscription you get
     * from our Standard API.
     *
     * @param {Object} query - the ParseQuery you want to subscribe to
     * @param {string} sessionToken (optional)
     * @return {LiveQuerySubscription} subscription
     */

  }, {
    key: "subscribe",
    value: function (query
    /*: Object*/
    , sessionToken
    /*: ?string*/
    )
    /*: LiveQuerySubscription*/
    {
      var _this2 = this;

      if (!query) {
        return;
      }

      var className = query.className;
      var queryJSON = query.toJSON();
      var where = queryJSON.where;
      var fields = (0, _keys.default)(queryJSON) ? (0, _keys.default)(queryJSON).split(',') : undefined;
      var subscribeRequest = {
        op: OP_TYPES.SUBSCRIBE,
        requestId: this.requestId,
        query: {
          className: className,
          where: where,
          fields: fields
        }
      };

      if (sessionToken) {
        subscribeRequest.sessionToken = sessionToken;
      }

      var subscription = new _LiveQuerySubscription.default(this.requestId, query, sessionToken);
      this.subscriptions.set(this.requestId, subscription);
      this.requestId += 1;
      this.connectPromise.then(function () {
        _this2.socket.send((0, _stringify.default)(subscribeRequest));
      });
      return subscription;
    }
    /**
     * After calling unsubscribe you'll stop receiving events from the subscription object.
     *
     * @param {Object} subscription - subscription you would like to unsubscribe from.
     */

  }, {
    key: "unsubscribe",
    value: function (subscription
    /*: Object*/
    ) {
      var _this3 = this;

      if (!subscription) {
        return;
      }

      this.subscriptions.delete(subscription.id);
      var unsubscribeRequest = {
        op: OP_TYPES.UNSUBSCRIBE,
        requestId: subscription.id
      };
      this.connectPromise.then(function () {
        _this3.socket.send((0, _stringify.default)(unsubscribeRequest));
      });
    }
    /**
     * After open is called, the LiveQueryClient will try to send a connect request
     * to the LiveQuery server.
     *
     */

  }, {
    key: "open",
    value: function () {
      var _this4 = this;

      var WebSocketImplementation = _CoreManager.default.getWebSocketController();

      if (!WebSocketImplementation) {
        this.emit(CLIENT_EMMITER_TYPES.ERROR, 'Can not find WebSocket implementation');
        return;
      }

      if (this.state !== CLIENT_STATE.RECONNECTING) {
        this.state = CLIENT_STATE.CONNECTING;
      }

      this.socket = new WebSocketImplementation(this.serverURL); // Bind WebSocket callbacks

      this.socket.onopen = function () {
        _this4._handleWebSocketOpen();
      };

      this.socket.onmessage = function (event) {
        _this4._handleWebSocketMessage(event);
      };

      this.socket.onclose = function () {
        _this4._handleWebSocketClose();
      };

      this.socket.onerror = function (error) {
        _this4._handleWebSocketError(error);
      };
    }
  }, {
    key: "resubscribe",
    value: function () {
      var _context,
          _this5 = this;

      (0, _forEach.default)(_context = this.subscriptions).call(_context, function (subscription, requestId) {
        var query = subscription.query;
        var queryJSON = query.toJSON();
        var where = queryJSON.where;
        var fields = (0, _keys.default)(queryJSON) ? (0, _keys.default)(queryJSON).split(',') : undefined;
        var className = query.className;
        var sessionToken = subscription.sessionToken;
        var subscribeRequest = {
          op: OP_TYPES.SUBSCRIBE,
          requestId: requestId,
          query: {
            className: className,
            where: where,
            fields: fields
          }
        };

        if (sessionToken) {
          subscribeRequest.sessionToken = sessionToken;
        }

        _this5.connectPromise.then(function () {
          _this5.socket.send((0, _stringify.default)(subscribeRequest));
        });
      });
    }
    /**
     * This method will close the WebSocket connection to this LiveQueryClient,
     * cancel the auto reconnect and unsubscribe all subscriptions based on it.
     *
     */

  }, {
    key: "close",
    value: function () {
      if (this.state === CLIENT_STATE.INITIALIZED || this.state === CLIENT_STATE.DISCONNECTED) {
        return;
      }

      this.state = CLIENT_STATE.DISCONNECTED;
      this.socket.close(); // Notify each subscription about the close

      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = (0, _getIterator2.default)((0, _values.default)(_context2 = this.subscriptions).call(_context2)), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var _context2;

          var subscription = _step.value;
          subscription.subscribed = false;
          subscription.emit(SUBSCRIPTION_EMMITER_TYPES.CLOSE);
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return != null) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      this._handleReset();

      this.emit(CLIENT_EMMITER_TYPES.CLOSE);
    } // ensure we start with valid state if connect is called again after close

  }, {
    key: "_handleReset",
    value: function () {
      this.attempts = 1;
      this.id = 0;
      this.requestId = 1;
      this.connectPromise = (0, _promiseUtils.resolvingPromise)();
      this.subscriptions = new _map.default();
    }
  }, {
    key: "_handleWebSocketOpen",
    value: function () {
      this.attempts = 1;
      var connectRequest = {
        op: OP_TYPES.CONNECT,
        applicationId: this.applicationId,
        javascriptKey: this.javascriptKey,
        masterKey: this.masterKey,
        sessionToken: this.sessionToken
      };
      this.socket.send((0, _stringify.default)(connectRequest));
    }
  }, {
    key: "_handleWebSocketMessage",
    value: function (event
    /*: any*/
    ) {
      var data = event.data;

      if (typeof data === 'string') {
        data = JSON.parse(data);
      }

      var subscription = null;

      if (data.requestId) {
        subscription = this.subscriptions.get(data.requestId);
      }

      switch (data.op) {
        case OP_EVENTS.CONNECTED:
          if (this.state === CLIENT_STATE.RECONNECTING) {
            this.resubscribe();
          }

          this.emit(CLIENT_EMMITER_TYPES.OPEN);
          this.id = data.clientId;
          this.connectPromise.resolve();
          this.state = CLIENT_STATE.CONNECTED;
          break;

        case OP_EVENTS.SUBSCRIBED:
          if (subscription) {
            subscription.subscribed = true;
            subscription.subscribePromise.resolve();
            subscription.emit(SUBSCRIPTION_EMMITER_TYPES.OPEN);
          }

          break;

        case OP_EVENTS.ERROR:
          if (data.requestId) {
            if (subscription) {
              subscription.subscribePromise.resolve();
              subscription.emit(SUBSCRIPTION_EMMITER_TYPES.ERROR, data.error);
            }
          } else {
            this.emit(CLIENT_EMMITER_TYPES.ERROR, data.error);
          }

          break;

        case OP_EVENTS.UNSUBSCRIBED:
          // We have already deleted subscription in unsubscribe(), do nothing here
          break;

        default:
          {
            // create, update, enter, leave, delete cases
            if (!subscription) {
              break;
            }

            var override = false;

            if (data.original) {
              override = true;
              delete data.original.__type; // Check for removed fields

              for (var field in data.original) {
                if (!(field in data.object)) {
                  data.object[field] = undefined;
                }
              }

              data.original = _ParseObject.default.fromJSON(data.original, false);
            }

            delete data.object.__type;

            var parseObject = _ParseObject.default.fromJSON(data.object, override);

            subscription.emit(data.op, parseObject, data.original);

            var localDatastore = _CoreManager.default.getLocalDatastore();

            if (override && localDatastore.isEnabled) {
              localDatastore._updateObjectIfPinned(parseObject).then(function () {});
            }
          }
      }
    }
  }, {
    key: "_handleWebSocketClose",
    value: function () {
      if (this.state === CLIENT_STATE.DISCONNECTED) {
        return;
      }

      this.state = CLIENT_STATE.CLOSED;
      this.emit(CLIENT_EMMITER_TYPES.CLOSE); // Notify each subscription about the close

      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = (0, _getIterator2.default)((0, _values.default)(_context3 = this.subscriptions).call(_context3)), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var _context3;

          var subscription = _step2.value;
          subscription.emit(SUBSCRIPTION_EMMITER_TYPES.CLOSE);
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
            _iterator2.return();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }

      this._handleReconnect();
    }
  }, {
    key: "_handleWebSocketError",
    value: function (error
    /*: any*/
    ) {
      this.emit(CLIENT_EMMITER_TYPES.ERROR, error);
      var _iteratorNormalCompletion3 = true;
      var _didIteratorError3 = false;
      var _iteratorError3 = undefined;

      try {
        for (var _iterator3 = (0, _getIterator2.default)((0, _values.default)(_context4 = this.subscriptions).call(_context4)), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
          var _context4;

          var subscription = _step3.value;
          subscription.emit(SUBSCRIPTION_EMMITER_TYPES.ERROR);
        }
      } catch (err) {
        _didIteratorError3 = true;
        _iteratorError3 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion3 && _iterator3.return != null) {
            _iterator3.return();
          }
        } finally {
          if (_didIteratorError3) {
            throw _iteratorError3;
          }
        }
      }

      this._handleReconnect();
    }
  }, {
    key: "_handleReconnect",
    value: function () {
      var _context5,
          _this6 = this; // if closed or currently reconnecting we stop attempting to reconnect


      if (this.state === CLIENT_STATE.DISCONNECTED) {
        return;
      }

      this.state = CLIENT_STATE.RECONNECTING;
      var time = generateInterval(this.attempts); // handle case when both close/error occur at frequent rates we ensure we do not reconnect unnecessarily.
      // we're unable to distinguish different between close/error when we're unable to reconnect therefore
      // we try to reconnect in both cases
      // server side ws and browser WebSocket behave differently in when close/error get triggered

      if (this.reconnectHandle) {
        clearTimeout(this.reconnectHandle);
      }

      this.reconnectHandle = (0, _setTimeout2.default)((0, _bind.default)(_context5 = function () {
        _this6.attempts++;
        _this6.connectPromise = (0, _promiseUtils.resolvingPromise)();

        _this6.open();
      }).call(_context5, this), time);
    }
  }]);
  return LiveQueryClient;
}(_EventEmitter2.default);

_CoreManager.default.setWebSocketController(typeof WebSocket === 'function' || (typeof WebSocket === "undefined" ? "undefined" : (0, _typeof2.default)(WebSocket)) === 'object' ? WebSocket : null);

var _default = LiveQueryClient;
exports.default = _default;
},{"./CoreManager":4,"./EventEmitter":5,"./LiveQuerySubscription":9,"./ParseObject":23,"./promiseUtils":47,"@babel/runtime-corejs3/core-js-stable/instance/bind":52,"@babel/runtime-corejs3/core-js-stable/instance/for-each":56,"@babel/runtime-corejs3/core-js-stable/instance/index-of":58,"@babel/runtime-corejs3/core-js-stable/instance/keys":59,"@babel/runtime-corejs3/core-js-stable/instance/values":65,"@babel/runtime-corejs3/core-js-stable/json/stringify":66,"@babel/runtime-corejs3/core-js-stable/map":67,"@babel/runtime-corejs3/core-js-stable/object/define-property":71,"@babel/runtime-corejs3/core-js-stable/set-timeout":79,"@babel/runtime-corejs3/core-js/get-iterator":84,"@babel/runtime-corejs3/helpers/assertThisInitialized":101,"@babel/runtime-corejs3/helpers/classCallCheck":103,"@babel/runtime-corejs3/helpers/createClass":105,"@babel/runtime-corejs3/helpers/defineProperty":106,"@babel/runtime-corejs3/helpers/getPrototypeOf":108,"@babel/runtime-corejs3/helpers/inherits":109,"@babel/runtime-corejs3/helpers/interopRequireDefault":110,"@babel/runtime-corejs3/helpers/possibleConstructorReturn":117,"@babel/runtime-corejs3/helpers/typeof":122}],9:[function(_dereq_,module,exports){
"use strict";

var _interopRequireDefault = _dereq_("@babel/runtime-corejs3/helpers/interopRequireDefault");

var _Object$defineProperty = _dereq_("@babel/runtime-corejs3/core-js-stable/object/define-property");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(_dereq_("@babel/runtime-corejs3/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(_dereq_("@babel/runtime-corejs3/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(_dereq_("@babel/runtime-corejs3/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(_dereq_("@babel/runtime-corejs3/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(_dereq_("@babel/runtime-corejs3/helpers/inherits"));

var _EventEmitter2 = _interopRequireDefault(_dereq_("./EventEmitter"));

var _CoreManager = _interopRequireDefault(_dereq_("./CoreManager"));

var _promiseUtils = _dereq_("./promiseUtils");
/*
 * Copyright (c) 2015-present, Parse, LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */

/**
 * Creates a new LiveQuery Subscription.
 * Extends events.EventEmitter
 * <a href="https://nodejs.org/api/events.html#events_class_eventemitter">cloud functions</a>.
 *
 *
 * <p>Open Event - When you call query.subscribe(), we send a subscribe request to
 * the LiveQuery server, when we get the confirmation from the LiveQuery server,
 * this event will be emitted. When the client loses WebSocket connection to the
 * LiveQuery server, we will try to auto reconnect the LiveQuery server. If we
 * reconnect the LiveQuery server and successfully resubscribe the ParseQuery,
 * you'll also get this event.
 *
 * <pre>
 * subscription.on('open', () => {
 *
 * });</pre></p>
 *
 * <p>Create Event - When a new ParseObject is created and it fulfills the ParseQuery you subscribe,
 * you'll get this event. The object is the ParseObject which is created.
 *
 * <pre>
 * subscription.on('create', (object) => {
 *
 * });</pre></p>
 *
 * <p>Update Event - When an existing ParseObject (original) which fulfills the ParseQuery you subscribe
 * is updated (The ParseObject fulfills the ParseQuery before and after changes),
 * you'll get this event. The object is the ParseObject which is updated.
 * Its content is the latest value of the ParseObject.
 *
 * Parse-Server 3.1.3+ Required for original object parameter
 *
 * <pre>
 * subscription.on('update', (object, original) => {
 *
 * });</pre></p>
 *
 * <p>Enter Event - When an existing ParseObject's (original) old value doesn't fulfill the ParseQuery
 * but its new value fulfills the ParseQuery, you'll get this event. The object is the
 * ParseObject which enters the ParseQuery. Its content is the latest value of the ParseObject.
 *
 * Parse-Server 3.1.3+ Required for original object parameter
 *
 * <pre>
 * subscription.on('enter', (object, original) => {
 *
 * });</pre></p>
 *
 *
 * <p>Update Event - When an existing ParseObject's old value fulfills the ParseQuery but its new value
 * doesn't fulfill the ParseQuery, you'll get this event. The object is the ParseObject
 * which leaves the ParseQuery. Its content is the latest value of the ParseObject.
 *
 * <pre>
 * subscription.on('leave', (object) => {
 *
 * });</pre></p>
 *
 *
 * <p>Delete Event - When an existing ParseObject which fulfills the ParseQuery is deleted, you'll
 * get this event. The object is the ParseObject which is deleted.
 *
 * <pre>
 * subscription.on('delete', (object) => {
 *
 * });</pre></p>
 *
 *
 * <p>Close Event - When the client loses the WebSocket connection to the LiveQuery
 * server and we stop receiving events, you'll get this event.
 *
 * <pre>
 * subscription.on('close', () => {
 *
 * });</pre></p>
 *
 * @alias Parse.LiveQuerySubscription
 */


var Subscription =
/*#__PURE__*/
function (_EventEmitter) {
  (0, _inherits2.default)(Subscription, _EventEmitter);
  /*
   * @param {string} id - subscription id
   * @param {string} query - query to subscribe to
   * @param {string} sessionToken - optional session token
   */

  function Subscription(id, query, sessionToken) {
    var _this;

    (0, _classCallCheck2.default)(this, Subscription);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(Subscription).call(this));
    _this.id = id;
    _this.query = query;
    _this.sessionToken = sessionToken;
    _this.subscribePromise = (0, _promiseUtils.resolvingPromise)();
    _this.subscribed = false; // adding listener so process does not crash
    // best practice is for developer to register their own listener

    _this.on('error', function () {});

    return _this;
  }
  /**
   * Close the subscription
   */


  (0, _createClass2.default)(Subscription, [{
    key: "unsubscribe",
    value: function ()
    /*: Promise*/
    {
      var _this2 = this;

      return _CoreManager.default.getLiveQueryController().getDefaultLiveQueryClient().then(function (liveQueryClient) {
        liveQueryClient.unsubscribe(_this2);

        _this2.emit('close');
      });
    }
  }]);
  return Subscription;
}(_EventEmitter2.default);

var _default = Subscription;
exports.default = _default;
},{"./CoreManager":4,"./EventEmitter":5,"./promiseUtils":47,"@babel/runtime-corejs3/core-js-stable/object/define-property":71,"@babel/runtime-corejs3/helpers/classCallCheck":103,"@babel/runtime-corejs3/helpers/createClass":105,"@babel/runtime-corejs3/helpers/getPrototypeOf":108,"@babel/runtime-corejs3/helpers/inherits":109,"@babel/runtime-corejs3/helpers/interopRequireDefault":110,"@babel/runtime-corejs3/helpers/possibleConstructorReturn":117}],10:[function(_dereq_,module,exports){
"use strict";

var _interopRequireDefault = _dereq_("@babel/runtime-corejs3/helpers/interopRequireDefault");

var _find = _interopRequireDefault(_dereq_("@babel/runtime-corejs3/core-js-stable/instance/find"));

var _from = _interopRequireDefault(_dereq_("@babel/runtime-corejs3/core-js-stable/array/from"));

var _map = _interopRequireDefault(_dereq_("@babel/runtime-corejs3/core-js-stable/instance/map"));

var _isArray = _interopRequireDefault(_dereq_("@babel/runtime-corejs3/core-js-stable/array/is-array"));

var _keys2 = _interopRequireDefault(_dereq_("@babel/runtime-corejs3/core-js-stable/instance/keys"));

var _startsWith = _interopRequireDefault(_dereq_("@babel/runtime-corejs3/core-js-stable/instance/starts-with"));

var _keys3 = _interopRequireDefault(_dereq_("@babel/runtime-corejs3/core-js-stable/object/keys"));

var _includes = _interopRequireDefault(_dereq_("@babel/runtime-corejs3/core-js-stable/instance/includes"));

var _filter = _interopRequireDefault(_dereq_("@babel/runtime-corejs3/core-js-stable/instance/filter"));

var _regenerator = _interopRequireDefault(_dereq_("@babel/runtime-corejs3/regenerator"));

var _getIterator2 = _interopRequireDefault(_dereq_("@babel/runtime-corejs3/core-js/get-iterator"));

var _concat = _interopRequireDefault(_dereq_("@babel/runtime-corejs3/core-js-stable/instance/concat"));

var _set = _interopRequireDefault(_dereq_("@babel/runtime-corejs3/core-js-stable/set"));

var _toConsumableArray2 = _interopRequireDefault(_dereq_("@babel/runtime-corejs3/helpers/toConsumableArray"));

var _promise = _interopRequireDefault(_dereq_("@babel/runtime-corejs3/core-js-stable/promise"));

var _slicedToArray2 = _interopRequireDefault(_dereq_("@babel/runtime-corejs3/helpers/slicedToArray"));

var _asyncToGenerator2 = _interopRequireDefault(_dereq_("@babel/runtime-corejs3/helpers/asyncToGenerator"));

var _CoreManager = _interopRequireDefault(_dereq_("./CoreManager"));

var _ParseQuery = _interopRequireDefault(_dereq_("./ParseQuery"));

var _LocalDatastoreUtils = _dereq_("./LocalDatastoreUtils");
/**
 * Copyright (c) 2015-present, Parse, LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @flow
 */

/**
 * Provides a local datastore which can be used to store and retrieve <code>Parse.Object</code>. <br />
 * To enable this functionality, call <code>Parse.enableLocalDatastore()</code>.
 *
 * Pin object to add to local datastore
 *
 * <pre>await object.pin();</pre>
 * <pre>await object.pinWithName('pinName');</pre>
 *
 * Query pinned objects
 *
 * <pre>query.fromLocalDatastore();</pre>
 * <pre>query.fromPin();</pre>
 * <pre>query.fromPinWithName();</pre>
 *
 * <pre>const localObjects = await query.find();</pre>
 *
 * @class Parse.LocalDatastore
 * @static
 */


var LocalDatastore = {
  isEnabled: false,
  isSyncing: false,
  fromPinWithName: function (name
  /*: string*/
  )
  /*: Promise<Array<Object>>*/
  {
    var controller = _CoreManager.default.getLocalDatastoreController();

    return controller.fromPinWithName(name);
  },
  pinWithName: function (name
  /*: string*/
  , value
  /*: any*/
  )
  /*: Promise<void>*/
  {
    var controller = _CoreManager.default.getLocalDatastoreController();

    return controller.pinWithName(name, value);
  },
  unPinWithName: function (name
  /*: string*/
  )
  /*: Promise<void>*/
  {
    var controller = _CoreManager.default.getLocalDatastoreController();

    return controller.unPinWithName(name);
  },
  _getAllContents: function ()
  /*: Promise<Object>*/
  {
    var controller = _CoreManager.default.getLocalDatastoreController();

    return controller.getAllContents();
  },
  // Use for testing
  _getRawStorage: function ()
  /*: Promise<Object>*/
  {
    var controller = _CoreManager.default.getLocalDatastoreController();

    return controller.getRawStorage();
  },
  _clear: function ()
  /*: Promise<void>*/
  {
    var controller = _CoreManager.default.getLocalDatastoreController();

    return controller.clear();
  },
  // Pin the object and children recursively
  // Saves the object and children key to Pin Name
  _handlePinAllWithName: function () {
    var _handlePinAllWithName2 = (0, _asyncToGenerator2.default)(
    /*#__PURE__*/
    _regenerator.default.mark(function _callee(name
    /*: string*/
    , objects
    /*: Array<ParseObject>*/
    ) {
      var _context;

      var pinName, toPinPromises, objectKeys, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, parent, children, parentKey, json, objectKey, fromPinPromise, _ref, _ref2, pinned, toPin;

      return _regenerator.default.wrap(function (_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              pinName = this.getPinName(name);
              toPinPromises = [];
              objectKeys = [];
              _iteratorNormalCompletion = true;
              _didIteratorError = false;
              _iteratorError = undefined;
              _context2.prev = 6;

              for (_iterator = (0, _getIterator2.default)(objects); !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                parent = _step.value;
                children = this._getChildren(parent);
                parentKey = this.getKeyForObject(parent);
                json = parent._toFullJSON();

                if (parent._localId) {
                  json._localId = parent._localId;
                }

                children[parentKey] = json;

                for (objectKey in children) {
                  objectKeys.push(objectKey);
                  toPinPromises.push(this.pinWithName(objectKey, [children[objectKey]]));
                }
              }

              _context2.next = 14;
              break;

            case 10:
              _context2.prev = 10;
              _context2.t0 = _context2["catch"](6);
              _didIteratorError = true;
              _iteratorError = _context2.t0;

            case 14:
              _context2.prev = 14;
              _context2.prev = 15;

              if (!_iteratorNormalCompletion && _iterator.return != null) {
                _iterator.return();
              }

            case 17:
              _context2.prev = 17;

              if (!_didIteratorError) {
                _context2.next = 20;
                break;
              }

              throw _iteratorError;

            case 20:
              return _context2.finish(17);

            case 21:
              return _context2.finish(14);

            case 22:
              fromPinPromise = this.fromPinWithName(pinName);
              _context2.next = 25;
              return _promise.default.all([fromPinPromise, toPinPromises]);

            case 25:
              _ref = _context2.sent;
              _ref2 = (0, _slicedToArray2.default)(_ref, 1);
              pinned = _ref2[0];
              toPin = (0, _toConsumableArray2.default)(new _set.default((0, _concat.default)(_context = []).call(_context, (0, _toConsumableArray2.default)(pinned || []), objectKeys)));
              return _context2.abrupt("return", this.pinWithName(pinName, toPin));

            case 30:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee, this, [[6, 10, 14, 22], [15,, 17, 21]]);
    }));

    return function () {
      return _handlePinAllWithName2.apply(this, arguments);
    };
  }(),
  // Removes object and children keys from pin name
  // Keeps the object and children pinned
  _handleUnPinAllWithName: function () {
    var _handleUnPinAllWithName2 = (0, _asyncToGenerator2.default)(
    /*#__PURE__*/
    _regenerator.default.mark(function _callee2(name
    /*: string*/
    , objects
    /*: Array<ParseObject>*/
    ) {
      var localDatastore, pinName, promises, objectKeys, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, _objectKeys, _context3, parent, children, parentKey, pinned, _iteratorNormalCompletion3, _didIteratorError3, _iteratorError3, _iterator3, _step3, objectKey, hasReference, key, pinnedObjects;

      return _regenerator.default.wrap(function (_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.next = 2;
              return this._getAllContents();

            case 2:
              localDatastore = _context4.sent;
              pinName = this.getPinName(name);
              promises = [];
              objectKeys = [];
              _iteratorNormalCompletion2 = true;
              _didIteratorError2 = false;
              _iteratorError2 = undefined;
              _context4.prev = 9;

              for (_iterator2 = (0, _getIterator2.default)(objects); !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                parent = _step2.value;
                children = this._getChildren(parent);
                parentKey = this.getKeyForObject(parent);

                (_objectKeys = objectKeys).push.apply(_objectKeys, (0, _concat.default)(_context3 = [parentKey]).call(_context3, (0, _toConsumableArray2.default)((0, _keys3.default)(children))));
              }

              _context4.next = 17;
              break;

            case 13:
              _context4.prev = 13;
              _context4.t0 = _context4["catch"](9);
              _didIteratorError2 = true;
              _iteratorError2 = _context4.t0;

            case 17:
              _context4.prev = 17;
              _context4.prev = 18;

              if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
                _iterator2.return();
              }

            case 20:
              _context4.prev = 20;

              if (!_didIteratorError2) {
                _context4.next = 23;
                break;
              }

              throw _iteratorError2;

            case 23:
              return _context4.finish(20);

            case 24:
              return _context4.finish(17);

            case 25:
              objectKeys = (0, _toConsumableArray2.default)(new _set.default(objectKeys));
              pinned = localDatastore[pinName] || [];
              pinned = (0, _filter.default)(pinned).call(pinned, function (item) {
                return !(0, _includes.default)(objectKeys).call(objectKeys, item);
              });

              if (pinned.length == 0) {
                promises.push(this.unPinWithName(pinName));
                delete localDatastore[pinName];
              } else {
                promises.push(this.pinWithName(pinName, pinned));
                localDatastore[pinName] = pinned;
              }

              _iteratorNormalCompletion3 = true;
              _didIteratorError3 = false;
              _iteratorError3 = undefined;
              _context4.prev = 32;
              _iterator3 = (0, _getIterator2.default)(objectKeys);

            case 34:
              if (_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done) {
                _context4.next = 51;
                break;
              }

              objectKey = _step3.value;
              hasReference = false;
              _context4.t1 = (0, _keys2.default)(_regenerator.default).call(_regenerator.default, localDatastore);

            case 38:
              if ((_context4.t2 = _context4.t1()).done) {
                _context4.next = 47;
                break;
              }

              key = _context4.t2.value;

              if (!(key === _LocalDatastoreUtils.DEFAULT_PIN || (0, _startsWith.default)(key).call(key, _LocalDatastoreUtils.PIN_PREFIX))) {
                _context4.next = 45;
                break;
              }

              pinnedObjects = localDatastore[key] || [];

              if (!(0, _includes.default)(pinnedObjects).call(pinnedObjects, objectKey)) {
                _context4.next = 45;
                break;
              }

              hasReference = true;
              return _context4.abrupt("break", 47);

            case 45:
              _context4.next = 38;
              break;

            case 47:
              if (!hasReference) {
                promises.push(this.unPinWithName(objectKey));
              }

            case 48:
              _iteratorNormalCompletion3 = true;
              _context4.next = 34;
              break;

            case 51:
              _context4.next = 57;
              break;

            case 53:
              _context4.prev = 53;
              _context4.t3 = _context4["catch"](32);
              _didIteratorError3 = true;
              _iteratorError3 = _context4.t3;

            case 57:
              _context4.prev = 57;
              _context4.prev = 58;

              if (!_iteratorNormalCompletion3 && _iterator3.return != null) {
                _iterator3.return();
              }

            case 60:
              _context4.prev = 60;

              if (!_didIteratorError3) {
                _context4.next = 63;
                break;
              }

              throw _iteratorError3;

            case 63:
              return _context4.finish(60);

            case 64:
              return _context4.finish(57);

            case 65:
              return _context4.abrupt("return", _promise.default.all(promises));

            case 66:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee2, this, [[9, 13, 17, 25], [18,, 20, 24], [32, 53, 57, 65], [58,, 60, 64]]);
    }));

    return function () {
      return _handleUnPinAllWithName2.apply(this, arguments);
    };
  }(),
  // Retrieve all pointer fields from object recursively
  _getChildren: function (object
  /*: ParseObject*/
  ) {
    var encountered = {};

    var json = object._toFullJSON();

    for (var key in json) {
      if (json[key] && json[key].__type && json[key].__type === 'Object') {
        this._traverse(json[key], encountered);
      }
    }

    return encountered;
  },
  _traverse: function (object
  /*: any*/
  , encountered
  /*: any*/
  ) {
    if (!object.objectId) {
      return;
    } else {
      var objectKey = this.getKeyForObject(object);

      if (encountered[objectKey]) {
        return;
      }

      encountered[objectKey] = object;
    }

    for (var key in object) {
      var json = object[key];

      if (!object[key]) {
        json = object;
      }

      if (json.__type && json.__type === 'Object') {
        this._traverse(json, encountered);
      }
    }
  },
  // Transform keys in pin name to objects
  _serializeObjectsFromPinName: function () {
    var _serializeObjectsFromPinName2 = (0, _asyncToGenerator2.default)(
    /*#__PURE__*/
    _regenerator.default.mark(function _callee3(name
    /*: string*/
    ) {
      var _this = this,
          _context5,
          _concatInstanceProper,
          _context6;

      var localDatastore, allObjects, key, pinName, pinned, promises, objects;
      return _regenerator.default.wrap(function (_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              _context7.next = 2;
              return this._getAllContents();

            case 2:
              localDatastore = _context7.sent;
              allObjects = [];

              for (key in localDatastore) {
                if ((0, _startsWith.default)(key).call(key, _LocalDatastoreUtils.OBJECT_PREFIX)) {
                  allObjects.push(localDatastore[key][0]);
                }
              }

              if (name) {
                _context7.next = 7;
                break;
              }

              return _context7.abrupt("return", allObjects);

            case 7:
              pinName = this.getPinName(name);
              pinned = localDatastore[pinName];

              if ((0, _isArray.default)(pinned)) {
                _context7.next = 11;
                break;
              }

              return _context7.abrupt("return", []);

            case 11:
              promises = (0, _map.default)(pinned).call(pinned, function (objectKey) {
                return _this.fromPinWithName(objectKey);
              });
              _context7.next = 14;
              return _promise.default.all(promises);

            case 14:
              objects = _context7.sent;
              objects = (_concatInstanceProper = (0, _concat.default)(_context5 = [])).call.apply(_concatInstanceProper, (0, _concat.default)(_context6 = [_context5]).call(_context6, (0, _toConsumableArray2.default)(objects)));
              return _context7.abrupt("return", (0, _filter.default)(objects).call(objects, function (object) {
                return object != null;
              }));

            case 17:
            case "end":
              return _context7.stop();
          }
        }
      }, _callee3, this);
    }));

    return function () {
      return _serializeObjectsFromPinName2.apply(this, arguments);
    };
  }(),
  // Replaces object pointers with pinned pointers
  // The object pointers may contain old data
  // Uses Breadth First Search Algorithm
  _serializeObject: function () {
    var _serializeObject2 = (0, _asyncToGenerator2.default)(
    /*#__PURE__*/
    _regenerator.default.mark(function _callee4(objectKey
    /*: string*/
    , localDatastore
    /*: any*/
    ) {
      var LDS, root, queue, meta, uniqueId, nodeId, subTreeRoot, field, value, key, pointer;
      return _regenerator.default.wrap(function (_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              LDS = localDatastore;

              if (LDS) {
                _context8.next = 5;
                break;
              }

              _context8.next = 4;
              return this._getAllContents();

            case 4:
              LDS = _context8.sent;

            case 5:
              if (!(!LDS[objectKey] || LDS[objectKey].length === 0)) {
                _context8.next = 7;
                break;
              }

              return _context8.abrupt("return", null);

            case 7:
              root = LDS[objectKey][0];
              queue = [];
              meta = {};
              uniqueId = 0;
              meta[uniqueId] = root;
              queue.push(uniqueId);

              while (queue.length !== 0) {
                nodeId = queue.shift();
                subTreeRoot = meta[nodeId];

                for (field in subTreeRoot) {
                  value = subTreeRoot[field];

                  if (value.__type && value.__type === 'Object') {
                    key = this.getKeyForObject(value);

                    if (LDS[key] && LDS[key].length > 0) {
                      pointer = LDS[key][0];
                      uniqueId++;
                      meta[uniqueId] = pointer;
                      subTreeRoot[field] = pointer;
                      queue.push(uniqueId);
                    }
                  }
                }
              }

              return _context8.abrupt("return", root);

            case 15:
            case "end":
              return _context8.stop();
          }
        }
      }, _callee4, this);
    }));

    return function () {
      return _serializeObject2.apply(this, arguments);
    };
  }(),
  // Called when an object is save / fetched
  // Update object pin value
  _updateObjectIfPinned: function () {
    var _updateObjectIfPinned2 = (0, _asyncToGenerator2.default)(
    /*#__PURE__*/
    _regenerator.default.mark(function _callee5(object
    /*: ParseObject*/
    ) {
      var objectKey, pinned;
      return _regenerator.default.wrap(function (_context9) {
        while (1) {
          switch (_context9.prev = _context9.next) {
            case 0:
              if (this.isEnabled) {
                _context9.next = 2;
                break;
              }

              return _context9.abrupt("return");

            case 2:
              objectKey = this.getKeyForObject(object);
              _context9.next = 5;
              return this.fromPinWithName(objectKey);

            case 5:
              pinned = _context9.sent;

              if (!(!pinned || pinned.length === 0)) {
                _context9.next = 8;
                break;
              }

              return _context9.abrupt("return");

            case 8:
              return _context9.abrupt("return", this.pinWithName(objectKey, [object._toFullJSON()]));

            case 9:
            case "end":
              return _context9.stop();
          }
        }
      }, _callee5, this);
    }));

    return function () {
      return _updateObjectIfPinned2.apply(this, arguments);
    };
  }(),
  // Called when object is destroyed
  // Unpin object and remove all references from pin names
  // TODO: Destroy children?
  _destroyObjectIfPinned: function () {
    var _destroyObjectIfPinned2 = (0, _asyncToGenerator2.default)(
    /*#__PURE__*/
    _regenerator.default.mark(function _callee6(object
    /*: ParseObject*/
    ) {
      var localDatastore, objectKey, pin, promises, key, pinned;
      return _regenerator.default.wrap(function (_context10) {
        while (1) {
          switch (_context10.prev = _context10.next) {
            case 0:
              if (this.isEnabled) {
                _context10.next = 2;
                break;
              }

              return _context10.abrupt("return");

            case 2:
              _context10.next = 4;
              return this._getAllContents();

            case 4:
              localDatastore = _context10.sent;
              objectKey = this.getKeyForObject(object);
              pin = localDatastore[objectKey];

              if (pin) {
                _context10.next = 9;
                break;
              }

              return _context10.abrupt("return");

            case 9:
              promises = [this.unPinWithName(objectKey)];
              delete localDatastore[objectKey];

              for (key in localDatastore) {
                if (key === _LocalDatastoreUtils.DEFAULT_PIN || (0, _startsWith.default)(key).call(key, _LocalDatastoreUtils.PIN_PREFIX)) {
                  pinned = localDatastore[key] || [];

                  if ((0, _includes.default)(pinned).call(pinned, objectKey)) {
                    pinned = (0, _filter.default)(pinned).call(pinned, function (item) {
                      return item !== objectKey;
                    });

                    if (pinned.length == 0) {
                      promises.push(this.unPinWithName(key));
                      delete localDatastore[key];
                    } else {
                      promises.push(this.pinWithName(key, pinned));
                      localDatastore[key] = pinned;
                    }
                  }
                }
              }

              return _context10.abrupt("return", _promise.default.all(promises));

            case 13:
            case "end":
              return _context10.stop();
          }
        }
      }, _callee6, this);
    }));

    return function () {
      return _destroyObjectIfPinned2.apply(this, arguments);
    };
  }(),
  // Update pin and references of the unsaved object
  _updateLocalIdForObject: function () {
    var _updateLocalIdForObject2 = (0, _asyncToGenerator2.default)(
    /*#__PURE__*/
    _regenerator.default.mark(function _callee7(localId
    /*: string*/
    , object
    /*: ParseObject*/
    ) {
      var _context11, _context12;

      var localKey, objectKey, unsaved, promises, localDatastore, key, pinned;
      return _regenerator.default.wrap(function (_context13) {
        while (1) {
          switch (_context13.prev = _context13.next) {
            case 0:
              if (this.isEnabled) {
                _context13.next = 2;
                break;
              }

              return _context13.abrupt("return");

            case 2:
              localKey = (0, _concat.default)(_context11 = (0, _concat.default)(_context12 = "".concat(_LocalDatastoreUtils.OBJECT_PREFIX)).call(_context12, object.className, "_")).call(_context11, localId);
              objectKey = this.getKeyForObject(object);
              _context13.next = 6;
              return this.fromPinWithName(localKey);

            case 6:
              unsaved = _context13.sent;

              if (!(!unsaved || unsaved.length === 0)) {
                _context13.next = 9;
                break;
              }

              return _context13.abrupt("return");

            case 9:
              promises = [this.unPinWithName(localKey), this.pinWithName(objectKey, unsaved)];
              _context13.next = 12;
              return this._getAllContents();

            case 12:
              localDatastore = _context13.sent;

              for (key in localDatastore) {
                if (key === _LocalDatastoreUtils.DEFAULT_PIN || (0, _startsWith.default)(key).call(key, _LocalDatastoreUtils.PIN_PREFIX)) {
                  pinned = localDatastore[key] || [];

                  if ((0, _includes.default)(pinned).call(pinned, localKey)) {
                    pinned = (0, _filter.default)(pinned).call(pinned, function (item) {
                      return item !== localKey;
                    });
                    pinned.push(objectKey);
                    promises.push(this.pinWithName(key, pinned));
                    localDatastore[key] = pinned;
                  }
                }
              }

              return _context13.abrupt("return", _promise.default.all(promises));

            case 15:
            case "end":
              return _context13.stop();
          }
        }
      }, _callee7, this);
    }));

    return function () {
      return _updateLocalIdForObject2.apply(this, arguments);
    };
  }(),

  /**
   * Updates Local Datastore from Server
   *
   * <pre>
   * await Parse.LocalDatastore.updateFromServer();
   * </pre>
   * @method updateFromServer
   * @name Parse.LocalDatastore.updateFromServer
   * @static
   */
  updateFromServer: function () {
    var _updateFromServer = (0, _asyncToGenerator2.default)(
    /*#__PURE__*/
    _regenerator.default.mark(function _callee8() {
      var _context14,
          _this2 = this;

      var localDatastore, keys, key, pointersHash, _i, _keys, _key, _key$split, _key$split2, className, objectId, queryPromises, responses, objects, pinPromises;

      return _regenerator.default.wrap(function (_context15) {
        while (1) {
          switch (_context15.prev = _context15.next) {
            case 0:
              if (!(!this.checkIfEnabled() || this.isSyncing)) {
                _context15.next = 2;
                break;
              }

              return _context15.abrupt("return");

            case 2:
              _context15.next = 4;
              return this._getAllContents();

            case 4:
              localDatastore = _context15.sent;
              keys = [];

              for (key in localDatastore) {
                if ((0, _startsWith.default)(key).call(key, _LocalDatastoreUtils.OBJECT_PREFIX)) {
                  keys.push(key);
                }
              }

              if (!(keys.length === 0)) {
                _context15.next = 9;
                break;
              }

              return _context15.abrupt("return");

            case 9:
              this.isSyncing = true;
              pointersHash = {};
              _i = 0, _keys = keys;

            case 12:
              if (!(_i < _keys.length)) {
                _context15.next = 23;
                break;
              }

              _key = _keys[_i]; // Ignore the OBJECT_PREFIX

              _key$split = _key.split('_'), _key$split2 = (0, _slicedToArray2.default)(_key$split, 4), className = _key$split2[2], objectId = _key$split2[3]; // User key is split into [ 'Parse', 'LDS', '', 'User', 'objectId' ]

              if (_key.split('_').length === 5 && _key.split('_')[3] === 'User') {
                className = '_User';
                objectId = _key.split('_')[4];
              }

              if (!(0, _startsWith.default)(objectId).call(objectId, 'local')) {
                _context15.next = 18;
                break;
              }

              return _context15.abrupt("continue", 20);

            case 18:
              if (!(className in pointersHash)) {
                pointersHash[className] = new _set.default();
              }

              pointersHash[className].add(objectId);

            case 20:
              _i++;
              _context15.next = 12;
              break;

            case 23:
              queryPromises = (0, _map.default)(_context14 = (0, _keys3.default)(pointersHash)).call(_context14, function (className) {
                var objectIds = (0, _from.default)(pointersHash[className]);
                var query = new _ParseQuery.default(className);
                query.limit(objectIds.length);

                if (objectIds.length === 1) {
                  query.equalTo('objectId', objectIds[0]);
                } else {
                  query.containedIn('objectId', objectIds);
                }

                return (0, _find.default)(query).call(query);
              });
              _context15.prev = 24;
              _context15.next = 27;
              return _promise.default.all(queryPromises);

            case 27:
              responses = _context15.sent;
              objects = (0, _concat.default)([]).apply([], responses);
              pinPromises = (0, _map.default)(objects).call(objects, function (object) {
                var objectKey = _this2.getKeyForObject(object);

                return _this2.pinWithName(objectKey, object._toFullJSON());
              });
              _context15.next = 32;
              return _promise.default.all(pinPromises);

            case 32:
              this.isSyncing = false;
              _context15.next = 39;
              break;

            case 35:
              _context15.prev = 35;
              _context15.t0 = _context15["catch"](24);
              console.error('Error syncing LocalDatastore: ', _context15.t0);
              this.isSyncing = false;

            case 39:
            case "end":
              return _context15.stop();
          }
        }
      }, _callee8, this, [[24, 35]]);
    }));

    return function () {
      return _updateFromServer.apply(this, arguments);
    };
  }(),
  getKeyForObject: function (object
  /*: any*/
  ) {
    var _context16, _context17;

    var objectId = object.objectId || object._getId();

    return (0, _concat.default)(_context16 = (0, _concat.default)(_context17 = "".concat(_LocalDatastoreUtils.OBJECT_PREFIX)).call(_context17, object.className, "_")).call(_context16, objectId);
  },
  getPinName: function (pinName
  /*: ?string*/
  ) {
    if (!pinName || pinName === _LocalDatastoreUtils.DEFAULT_PIN) {
      return _LocalDatastoreUtils.DEFAULT_PIN;
    }

    return _LocalDatastoreUtils.PIN_PREFIX + pinName;
  },
  checkIfEnabled: function () {
    if (!this.isEnabled) {
      console.error('Parse.enableLocalDatastore() must be called first');
    }

    return this.isEnabled;
  }
};
module.exports = LocalDatastore;

_CoreManager.default.setLocalDatastoreController(_dereq_('./LocalDatastoreController.browser'));

_CoreManager.default.setLocalDatastore(LocalDatastore);
},{"./CoreManager":4,"./LocalDatastoreController.browser":11,"./LocalDatastoreUtils":12,"./ParseQuery":26,"@babel/runtime-corejs3/core-js-stable/array/from":50,"@babel/runtime-corejs3/core-js-stable/array/is-array":51,"@babel/runtime-corejs3/core-js-stable/instance/concat":53,"@babel/runtime-corejs3/core-js-stable/instance/filter":54,"@babel/runtime-corejs3/core-js-stable/instance/find":55,"@babel/runtime-corejs3/core-js-stable/instance/includes":57,"@babel/runtime-corejs3/core-js-stable/instance/keys":59,"@babel/runtime-corejs3/core-js-stable/instance/map":60,"@babel/runtime-corejs3/core-js-stable/instance/starts-with":64,"@babel/runtime-corejs3/core-js-stable/object/keys":76,"@babel/runtime-corejs3/core-js-stable/promise":78,"@babel/runtime-corejs3/core-js-stable/set":80,"@babel/runtime-corejs3/core-js/get-iterator":84,"@babel/runtime-corejs3/helpers/asyncToGenerator":102,"@babel/runtime-corejs3/helpers/interopRequireDefault":110,"@babel/runtime-corejs3/helpers/slicedToArray":119,"@babel/runtime-corejs3/helpers/toConsumableArray":121,"@babel/runtime-corejs3/regenerator":125}],11:[function(_dereq_,module,exports){
"use strict";

var _interopRequireDefault = _dereq_("@babel/runtime-corejs3/helpers/interopRequireDefault");

var _promise = _interopRequireDefault(_dereq_("@babel/runtime-corejs3/core-js-stable/promise"));

var _map = _interopRequireDefault(_dereq_("@babel/runtime-corejs3/core-js-stable/instance/map"));

var _stringify = _interopRequireDefault(_dereq_("@babel/runtime-corejs3/core-js-stable/json/stringify"));

var _LocalDatastoreUtils = _dereq_("./LocalDatastoreUtils");
/**
 * Copyright (c) 2015-present, Parse, LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @flow
 */

/* global localStorage */


var LocalDatastoreController = {
  fromPinWithName: function (name
  /*: string*/
  )
  /*: Array<Object>*/
  {
    var values = localStorage.getItem(name);

    if (!values) {
      return [];
    }

    var objects = JSON.parse(values);
    return objects;
  },
  pinWithName: function (name
  /*: string*/
  , value
  /*: any*/
  ) {
    try {
      var values = (0, _stringify.default)(value);
      localStorage.setItem(name, values);
    } catch (e) {
      // Quota exceeded, possibly due to Safari Private Browsing mode
      console.log(e.message);
    }
  },
  unPinWithName: function (name
  /*: string*/
  ) {
    localStorage.removeItem(name);
  },
  getAllContents: function ()
  /*: Object*/
  {
    var LDS = {};

    for (var i = 0; i < localStorage.length; i += 1) {
      var key = localStorage.key(i);

      if ((0, _LocalDatastoreUtils.isLocalDatastoreKey)(key)) {
        var value = localStorage.getItem(key);

        try {
          LDS[key] = JSON.parse(value);
        } catch (error) {
          console.error('Error getAllContents: ', error);
        }
      }
    }

    return LDS;
  },
  getRawStorage: function ()
  /*: Object*/
  {
    var storage = {};

    for (var i = 0; i < localStorage.length; i += 1) {
      var key = localStorage.key(i);
      var value = localStorage.getItem(key);
      storage[key] = value;
    }

    return storage;
  },
  clear: function ()
  /*: Promise*/
  {
    var toRemove = [];

    for (var i = 0; i < localStorage.length; i += 1) {
      var key = localStorage.key(i);

      if ((0, _LocalDatastoreUtils.isLocalDatastoreKey)(key)) {
        toRemove.push(key);
      }
    }

    var promises = (0, _map.default)(toRemove).call(toRemove, this.unPinWithName);
    return _promise.default.all(promises);
  }
};
module.exports = LocalDatastoreController;
},{"./LocalDatastoreUtils":12,"@babel/runtime-corejs3/core-js-stable/instance/map":60,"@babel/runtime-corejs3/core-js-stable/json/stringify":66,"@babel/runtime-corejs3/core-js-stable/promise":78,"@babel/runtime-corejs3/helpers/interopRequireDefault":110}],12:[function(_dereq_,module,exports){
"use strict";

var _interopRequireDefault = _dereq_("@babel/runtime-corejs3/helpers/interopRequireDefault");

var _Object$defineProperty = _dereq_("@babel/runtime-corejs3/core-js-stable/object/define-property");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports.isLocalDatastoreKey = isLocalDatastoreKey;
exports.OBJECT_PREFIX = exports.PIN_PREFIX = exports.DEFAULT_PIN = void 0;

var _startsWith = _interopRequireDefault(_dereq_("@babel/runtime-corejs3/core-js-stable/instance/starts-with"));
/**
 * Copyright (c) 2015-present, Parse, LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @flow
 */


var DEFAULT_PIN = '_default';
exports.DEFAULT_PIN = DEFAULT_PIN;
var PIN_PREFIX = 'parsePin_';
exports.PIN_PREFIX = PIN_PREFIX;
var OBJECT_PREFIX = 'Parse_LDS_';
exports.OBJECT_PREFIX = OBJECT_PREFIX;

function isLocalDatastoreKey(key
/*: string*/
)
/*: boolean*/
{
  return !!(key && (key === DEFAULT_PIN || (0, _startsWith.default)(key).call(key, PIN_PREFIX) || (0, _startsWith.default)(key).call(key, OBJECT_PREFIX)));
}
},{"@babel/runtime-corejs3/core-js-stable/instance/starts-with":64,"@babel/runtime-corejs3/core-js-stable/object/define-property":71,"@babel/runtime-corejs3/helpers/interopRequireDefault":110}],13:[function(_dereq_,module,exports){
"use strict";

var _interopRequireDefault = _dereq_("@babel/runtime-corejs3/helpers/interopRequireDefault");

var _Object$defineProperty = _dereq_("@babel/runtime-corejs3/core-js-stable/object/define-property");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports.defaultState = defaultState;
exports.setServerData = setServerData;
exports.setPendingOp = setPendingOp;
exports.pushPendingState = pushPendingState;
exports.popPendingState = popPendingState;
exports.mergeFirstPendingState = mergeFirstPendingState;
exports.estimateAttribute = estimateAttribute;
exports.estimateAttributes = estimateAttributes;
exports.commitServerChanges = commitServerChanges;

var _stringify = _interopRequireDefault(_dereq_("@babel/runtime-corejs3/core-js-stable/json/stringify"));

var _typeof2 = _interopRequireDefault(_dereq_("@babel/runtime-corejs3/helpers/typeof"));

var _assign = _interopRequireDefault(_dereq_("@babel/runtime-corejs3/core-js-stable/object/assign"));

var _includes = _interopRequireDefault(_dereq_("@babel/runtime-corejs3/core-js-stable/instance/includes"));

var _encode = _interopRequireDefault(_dereq_("./encode"));

var _ParseFile = _interopRequireDefault(_dereq_("./ParseFile"));

var _ParseObject = _interopRequireDefault(_dereq_("./ParseObject"));

var _ParseRelation = _interopRequireDefault(_dereq_("./ParseRelation"));

var _TaskQueue = _interopRequireDefault(_dereq_("./TaskQueue"));

var _ParseOp = _dereq_("./ParseOp");
/**
 * Copyright (c) 2015-present, Parse, LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @flow
 */


function defaultState()
/*: State*/
{
  return {
    serverData: {},
    pendingOps: [{}],
    objectCache: {},
    tasks: new _TaskQueue.default(),
    existed: false
  };
}

function setServerData(serverData
/*: AttributeMap*/
, attributes
/*: AttributeMap*/
) {
  for (var _attr in attributes) {
    if (typeof attributes[_attr] !== 'undefined') {
      serverData[_attr] = attributes[_attr];
    } else {
      delete serverData[_attr];
    }
  }
}

function setPendingOp(pendingOps
/*: Array<OpsMap>*/
, attr
/*: string*/
, op
/*: ?Op*/
) {
  var last = pendingOps.length - 1;

  if (op) {
    pendingOps[last][attr] = op;
  } else {
    delete pendingOps[last][attr];
  }
}

function pushPendingState(pendingOps
/*: Array<OpsMap>*/
) {
  pendingOps.push({});
}

function popPendingState(pendingOps
/*: Array<OpsMap>*/
)
/*: OpsMap*/
{
  var first = pendingOps.shift();

  if (!pendingOps.length) {
    pendingOps[0] = {};
  }

  return first;
}

function mergeFirstPendingState(pendingOps
/*: Array<OpsMap>*/
) {
  var first = popPendingState(pendingOps);
  var next = pendingOps[0];

  for (var _attr2 in first) {
    if (next[_attr2] && first[_attr2]) {
      var merged = next[_attr2].mergeWith(first[_attr2]);

      if (merged) {
        next[_attr2] = merged;
      }
    } else {
      next[_attr2] = first[_attr2];
    }
  }
}

function estimateAttribute(serverData
/*: AttributeMap*/
, pendingOps
/*: Array<OpsMap>*/
, className
/*: string*/
, id
/*: ?string*/
, attr
/*: string*/
)
/*: mixed*/
{
  var value = serverData[attr];

  for (var i = 0; i < pendingOps.length; i++) {
    if (pendingOps[i][attr]) {
      if (pendingOps[i][attr] instanceof _ParseOp.RelationOp) {
        if (id) {
          value = pendingOps[i][attr].applyTo(value, {
            className: className,
            id: id
          }, attr);
        }
      } else {
        value = pendingOps[i][attr].applyTo(value);
      }
    }
  }

  return value;
}

function estimateAttributes(serverData
/*: AttributeMap*/
, pendingOps
/*: Array<OpsMap>*/
, className
/*: string*/
, id
/*: ?string*/
)
/*: AttributeMap*/
{
  var data = {};

  for (var attr in serverData) {
    data[attr] = serverData[attr];
  }

  for (var i = 0; i < pendingOps.length; i++) {
    for (attr in pendingOps[i]) {
      if (pendingOps[i][attr] instanceof _ParseOp.RelationOp) {
        if (id) {
          data[attr] = pendingOps[i][attr].applyTo(data[attr], {
            className: className,
            id: id
          }, attr);
        }
      } else {
        if ((0, _includes.default)(attr).call(attr, '.')) {
          // convert a.b.c into { a: { b: { c: value } } }
          var fields = attr.split('.');
          var last = fields[fields.length - 1];
          var object = (0, _assign.default)({}, data);

          for (var _i = 0; _i < fields.length - 1; _i++) {
            object = object[fields[_i]];
          }

          object[last] = pendingOps[i][attr].applyTo(object[last]);
        } else {
          data[attr] = pendingOps[i][attr].applyTo(data[attr]);
        }
      }
    }
  }

  return data;
}

function commitServerChanges(serverData
/*: AttributeMap*/
, objectCache
/*: ObjectCache*/
, changes
/*: AttributeMap*/
) {
  for (var _attr3 in changes) {
    var val = changes[_attr3];
    serverData[_attr3] = val;

    if (val && (0, _typeof2.default)(val) === 'object' && !(val instanceof _ParseObject.default) && !(val instanceof _ParseFile.default) && !(val instanceof _ParseRelation.default)) {
      var json = (0, _encode.default)(val, false, true);
      objectCache[_attr3] = (0, _stringify.default)(json);
    }
  }
}
},{"./ParseFile":19,"./ParseObject":23,"./ParseOp":24,"./ParseRelation":27,"./TaskQueue":37,"./encode":42,"@babel/runtime-corejs3/core-js-stable/instance/includes":57,"@babel/runtime-corejs3/core-js-stable/json/stringify":66,"@babel/runtime-corejs3/core-js-stable/object/assign":68,"@babel/runtime-corejs3/core-js-stable/object/define-property":71,"@babel/runtime-corejs3/helpers/interopRequireDefault":110,"@babel/runtime-corejs3/helpers/typeof":122}],14:[function(_dereq_,module,exports){
"use strict";

var _interopRequireDefault = _dereq_("@babel/runtime-corejs3/helpers/interopRequireDefault");

var _keys = _interopRequireDefault(_dereq_("@babel/runtime-corejs3/core-js-stable/object/keys"));

var _forEach = _interopRequireDefault(_dereq_("@babel/runtime-corejs3/core-js-stable/instance/for-each"));

var _map = _interopRequireDefault(_dereq_("@babel/runtime-corejs3/core-js-stable/instance/map"));

var _getIterator2 = _interopRequireDefault(_dereq_("@babel/runtime-corejs3/core-js/get-iterator"));

var _filter = _interopRequireDefault(_dereq_("@babel/runtime-corejs3/core-js-stable/instance/filter"));

var _typeof2 = _interopRequireDefault(_dereq_("@babel/runtime-corejs3/helpers/typeof"));

var _slice = _interopRequireDefault(_dereq_("@babel/runtime-corejs3/core-js-stable/instance/slice"));

var _isArray = _interopRequireDefault(_dereq_("@babel/runtime-corejs3/core-js-stable/array/is-array"));

var _indexOf = _interopRequireDefault(_dereq_("@babel/runtime-corejs3/core-js-stable/instance/index-of"));

var equalObjects = _dereq_('./equals').default;

var decode = _dereq_('./decode').default;

var ParseError = _dereq_('./ParseError').default;

var ParsePolygon = _dereq_('./ParsePolygon').default;

var ParseGeoPoint = _dereq_('./ParseGeoPoint').default;
/**
 * contains -- Determines if an object is contained in a list with special handling for Parse pointers.
 */


function contains(haystack, needle) {
  if (needle && needle.__type && (needle.__type === 'Pointer' || needle.__type === 'Object')) {
    for (var i in haystack) {
      var ptr = haystack[i];

      if (typeof ptr === 'string' && ptr === needle.objectId) {
        return true;
      }

      if (ptr.className === needle.className && ptr.objectId === needle.objectId) {
        return true;
      }
    }

    return false;
  }

  return (0, _indexOf.default)(haystack).call(haystack, needle) > -1;
}

function transformObject(object) {
  if (object._toFullJSON) {
    return object._toFullJSON();
  }

  return object;
}
/**
 * matchesQuery -- Determines if an object would be returned by a Parse Query
 * It's a lightweight, where-clause only implementation of a full query engine.
 * Since we find queries that match objects, rather than objects that match
 * queries, we can avoid building a full-blown query tool.
 */


function matchesQuery(className, object, objects, query) {
  if (object.className !== className) {
    return false;
  }

  var obj = object;
  var q = query;

  if (object.toJSON) {
    obj = object.toJSON();
  }

  if (query.toJSON) {
    q = query.toJSON().where;
  }

  obj.className = className;

  for (var field in q) {
    if (!matchesKeyConstraints(className, obj, objects, field, q[field])) {
      return false;
    }
  }

  return true;
}

function equalObjectsGeneric(obj, compareTo, eqlFn) {
  if ((0, _isArray.default)(obj)) {
    for (var i = 0; i < obj.length; i++) {
      if (eqlFn(obj[i], compareTo)) {
        return true;
      }
    }

    return false;
  }

  return eqlFn(obj, compareTo);
}
/**
 * Determines whether an object matches a single key's constraints
 */


function matchesKeyConstraints(className, object, objects, key, constraints) {
  if (constraints === null) {
    return false;
  }

  if ((0, _indexOf.default)(key).call(key, '.') >= 0) {
    // Key references a subobject
    var keyComponents = key.split('.');
    var subObjectKey = keyComponents[0];
    var keyRemainder = (0, _slice.default)(keyComponents).call(keyComponents, 1).join('.');
    return matchesKeyConstraints(className, object[subObjectKey] || {}, objects, keyRemainder, constraints);
  }

  var i;

  if (key === '$or') {
    for (i = 0; i < constraints.length; i++) {
      if (matchesQuery(className, object, objects, constraints[i])) {
        return true;
      }
    }

    return false;
  }

  if (key === '$and') {
    for (i = 0; i < constraints.length; i++) {
      if (!matchesQuery(className, object, objects, constraints[i])) {
        return false;
      }
    }

    return true;
  }

  if (key === '$nor') {
    for (i = 0; i < constraints.length; i++) {
      if (matchesQuery(className, object, objects, constraints[i])) {
        return false;
      }
    }

    return true;
  }

  if (key === '$relatedTo') {
    // Bail! We can't handle relational queries locally
    return false;
  }

  if (!/^[A-Za-z][0-9A-Za-z_]*$/.test(key)) {
    throw new ParseError(ParseError.INVALID_KEY_NAME, "Invalid Key: ".concat(key));
  } // Equality (or Array contains) cases


  if ((0, _typeof2.default)(constraints) !== 'object') {
    if ((0, _isArray.default)(object[key])) {
      var _context;

      return (0, _indexOf.default)(_context = object[key]).call(_context, constraints) > -1;
    }

    return object[key] === constraints;
  }

  var compareTo;

  if (constraints.__type) {
    if (constraints.__type === 'Pointer') {
      return equalObjectsGeneric(object[key], constraints, function (obj, ptr) {
        return typeof obj !== 'undefined' && ptr.className === obj.className && ptr.objectId === obj.objectId;
      });
    }

    return equalObjectsGeneric(decode(object[key]), decode(constraints), equalObjects);
  } // More complex cases


  for (var condition in constraints) {
    compareTo = constraints[condition];

    if (compareTo.__type) {
      compareTo = decode(compareTo);
    } // Compare Date Object or Date String


    if (toString.call(compareTo) === '[object Date]' || typeof compareTo === 'string' && new Date(compareTo) !== 'Invalid Date' && !isNaN(new Date(compareTo))) {
      object[key] = new Date(object[key].iso ? object[key].iso : object[key]);
    }

    switch (condition) {
      case '$lt':
        if (object[key] >= compareTo) {
          return false;
        }

        break;

      case '$lte':
        if (object[key] > compareTo) {
          return false;
        }

        break;

      case '$gt':
        if (object[key] <= compareTo) {
          return false;
        }

        break;

      case '$gte':
        if (object[key] < compareTo) {
          return false;
        }

        break;

      case '$ne':
        if (equalObjects(object[key], compareTo)) {
          return false;
        }

        break;

      case '$in':
        if (!contains(compareTo, object[key])) {
          return false;
        }

        break;

      case '$nin':
        if (contains(compareTo, object[key])) {
          return false;
        }

        break;

      case '$all':
        for (i = 0; i < compareTo.length; i++) {
          var _context2;

          if ((0, _indexOf.default)(_context2 = object[key]).call(_context2, compareTo[i]) < 0) {
            return false;
          }
        }

        break;

      case '$exists':
        {
          var propertyExists = typeof object[key] !== 'undefined';
          var existenceIsRequired = constraints['$exists'];

          if (typeof constraints['$exists'] !== 'boolean') {
            // The SDK will never submit a non-boolean for $exists, but if someone
            // tries to submit a non-boolean for $exits outside the SDKs, just ignore it.
            break;
          }

          if (!propertyExists && existenceIsRequired || propertyExists && !existenceIsRequired) {
            return false;
          }

          break;
        }

      case '$regex':
        {
          if ((0, _typeof2.default)(compareTo) === 'object') {
            return compareTo.test(object[key]);
          } // JS doesn't support perl-style escaping


          var expString = '';
          var escapeEnd = -2;
          var escapeStart = (0, _indexOf.default)(compareTo).call(compareTo, '\\Q');

          while (escapeStart > -1) {
            // Add the unescaped portion
            expString += compareTo.substring(escapeEnd + 2, escapeStart);
            escapeEnd = (0, _indexOf.default)(compareTo).call(compareTo, '\\E', escapeStart);

            if (escapeEnd > -1) {
              expString += compareTo.substring(escapeStart + 2, escapeEnd).replace(/\\\\\\\\E/g, '\\E').replace(/\W/g, '\\$&');
            }

            escapeStart = (0, _indexOf.default)(compareTo).call(compareTo, '\\Q', escapeEnd);
          }

          expString += compareTo.substring(Math.max(escapeStart, escapeEnd + 2));
          var modifiers = constraints.$options || '';
          modifiers = modifiers.replace('x', '').replace('s', ''); // Parse Server / Mongo support x and s modifiers but JS RegExp doesn't

          var exp = new RegExp(expString, modifiers);

          if (!exp.test(object[key])) {
            return false;
          }

          break;
        }

      case '$nearSphere':
        {
          if (!compareTo || !object[key]) {
            return false;
          }

          var distance = compareTo.radiansTo(object[key]);
          var max = constraints.$maxDistance || Infinity;
          return distance <= max;
        }

      case '$within':
        {
          if (!compareTo || !object[key]) {
            return false;
          }

          var southWest = compareTo.$box[0];
          var northEast = compareTo.$box[1];

          if (southWest.latitude > northEast.latitude || southWest.longitude > northEast.longitude) {
            // Invalid box, crosses the date line
            return false;
          }

          return object[key].latitude > southWest.latitude && object[key].latitude < northEast.latitude && object[key].longitude > southWest.longitude && object[key].longitude < northEast.longitude;
        }

      case '$options':
        // Not a query type, but a way to add options to $regex. Ignore and
        // avoid the default
        break;

      case '$maxDistance':
        // Not a query type, but a way to add a cap to $nearSphere. Ignore and
        // avoid the default
        break;

      case '$select':
        {
          var subQueryObjects = (0, _filter.default)(objects).call(objects, function (obj, index, arr) {
            return matchesQuery(compareTo.query.className, obj, arr, compareTo.query.where);
          });

          for (var _i = 0; _i < subQueryObjects.length; _i += 1) {
            var subObject = transformObject(subQueryObjects[_i]);
            return equalObjects(object[key], subObject[compareTo.key]);
          }

          return false;
        }

      case '$dontSelect':
        {
          var _subQueryObjects = (0, _filter.default)(objects).call(objects, function (obj, index, arr) {
            return matchesQuery(compareTo.query.className, obj, arr, compareTo.query.where);
          });

          for (var _i2 = 0; _i2 < _subQueryObjects.length; _i2 += 1) {
            var _subObject = transformObject(_subQueryObjects[_i2]);

            return !equalObjects(object[key], _subObject[compareTo.key]);
          }

          return false;
        }

      case '$inQuery':
        {
          var _subQueryObjects2 = (0, _filter.default)(objects).call(objects, function (obj, index, arr) {
            return matchesQuery(compareTo.className, obj, arr, compareTo.where);
          });

          for (var _i3 = 0; _i3 < _subQueryObjects2.length; _i3 += 1) {
            var _subObject2 = transformObject(_subQueryObjects2[_i3]);

            if (object[key].className === _subObject2.className && object[key].objectId === _subObject2.objectId) {
              return true;
            }
          }

          return false;
        }

      case '$notInQuery':
        {
          var _subQueryObjects3 = (0, _filter.default)(objects).call(objects, function (obj, index, arr) {
            return matchesQuery(compareTo.className, obj, arr, compareTo.where);
          });

          for (var _i4 = 0; _i4 < _subQueryObjects3.length; _i4 += 1) {
            var _subObject3 = transformObject(_subQueryObjects3[_i4]);

            if (object[key].className === _subObject3.className && object[key].objectId === _subObject3.objectId) {
              return false;
            }
          }

          return true;
        }

      case '$containedBy':
        {
          var _iteratorNormalCompletion = true;
          var _didIteratorError = false;
          var _iteratorError = undefined;

          try {
            for (var _iterator = (0, _getIterator2.default)(object[key]), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
              var value = _step.value;

              if (!contains(compareTo, value)) {
                return false;
              }
            }
          } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion && _iterator.return != null) {
                _iterator.return();
              }
            } finally {
              if (_didIteratorError) {
                throw _iteratorError;
              }
            }
          }

          return true;
        }

      case '$geoWithin':
        {
          var _context3;

          var points = (0, _map.default)(_context3 = compareTo.$polygon).call(_context3, function (geoPoint) {
            return [geoPoint.latitude, geoPoint.longitude];
          });
          var polygon = new ParsePolygon(points);
          return polygon.containsPoint(object[key]);
        }

      case '$geoIntersects':
        {
          var _polygon = new ParsePolygon(object[key].coordinates);

          var point = new ParseGeoPoint(compareTo.$point);
          return _polygon.containsPoint(point);
        }

      default:
        return false;
    }
  }

  return true;
}

function validateQuery(query
/*: any*/
) {
  var _context4;

  var q = query;

  if (query.toJSON) {
    q = query.toJSON().where;
  }

  var specialQuerykeys = ['$and', '$or', '$nor', '_rperm', '_wperm', '_perishable_token', '_email_verify_token', '_email_verify_token_expires_at', '_account_lockout_expires_at', '_failed_login_count'];
  (0, _forEach.default)(_context4 = (0, _keys.default)(q)).call(_context4, function (key) {
    if (q && q[key] && q[key].$regex) {
      if (typeof q[key].$options === 'string') {
        if (!q[key].$options.match(/^[imxs]+$/)) {
          throw new ParseError(ParseError.INVALID_QUERY, "Bad $options value for query: ".concat(q[key].$options));
        }
      }
    }

    if ((0, _indexOf.default)(specialQuerykeys).call(specialQuerykeys, key) < 0 && !key.match(/^[a-zA-Z][a-zA-Z0-9_\.]*$/)) {
      throw new ParseError(ParseError.INVALID_KEY_NAME, "Invalid key name: ".concat(key));
    }
  });
}

var OfflineQuery = {
  matchesQuery: matchesQuery,
  validateQuery: validateQuery
};
module.exports = OfflineQuery;
},{"./ParseError":18,"./ParseGeoPoint":20,"./ParsePolygon":25,"./decode":41,"./equals":43,"@babel/runtime-corejs3/core-js-stable/array/is-array":51,"@babel/runtime-corejs3/core-js-stable/instance/filter":54,"@babel/runtime-corejs3/core-js-stable/instance/for-each":56,"@babel/runtime-corejs3/core-js-stable/instance/index-of":58,"@babel/runtime-corejs3/core-js-stable/instance/map":60,"@babel/runtime-corejs3/core-js-stable/instance/slice":61,"@babel/runtime-corejs3/core-js-stable/object/keys":76,"@babel/runtime-corejs3/core-js/get-iterator":84,"@babel/runtime-corejs3/helpers/interopRequireDefault":110,"@babel/runtime-corejs3/helpers/typeof":122}],15:[function(_dereq_,module,exports){
(function (process){
"use strict";

var _interopRequireWildcard = _dereq_("@babel/runtime-corejs3/helpers/interopRequireWildcard");

var _interopRequireDefault = _dereq_("@babel/runtime-corejs3/helpers/interopRequireDefault");

var _promise = _interopRequireDefault(_dereq_("@babel/runtime-corejs3/core-js-stable/promise"));

var _defineProperty = _interopRequireDefault(_dereq_("@babel/runtime-corejs3/core-js-stable/object/define-property"));

var _decode = _interopRequireDefault(_dereq_("./decode"));

var _encode = _interopRequireDefault(_dereq_("./encode"));

var _CoreManager = _interopRequireDefault(_dereq_("./CoreManager"));

var _InstallationController = _interopRequireDefault(_dereq_("./InstallationController"));

var ParseOp = _interopRequireWildcard(_dereq_("./ParseOp"));

var _RESTController = _interopRequireDefault(_dereq_("./RESTController"));
/**
 * Copyright (c) 2015-present, Parse, LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

/**
 * Contains all Parse API classes and functions.
 * @static
 * @global
 * @class
 * @hideconstructor
 */


var Parse = {
  /**
   * Call this method first to set up your authentication tokens for Parse.
   * You can get your keys from the Data Browser on parse.com.
   * @param {String} applicationId Your Parse Application ID.
   * @param {String} javaScriptKey (optional) Your Parse JavaScript Key (Not needed for parse-server)
   * @param {String} masterKey (optional) Your Parse Master Key. (Node.js only!)
   * @static
   */
  initialize: function (applicationId
  /*: string*/
  , javaScriptKey
  /*: string*/
  ) {
    if ("browser" === 'browser' && _CoreManager.default.get('IS_NODE') && !process.env.SERVER_RENDERING) {
      /* eslint-disable no-console */
      console.log('It looks like you\'re using the browser version of the SDK in a ' + 'node.js environment. You should require(\'parse/node\') instead.');
      /* eslint-enable no-console */
    }

    Parse._initialize(applicationId, javaScriptKey);
  },
  _initialize: function (applicationId
  /*: string*/
  , javaScriptKey
  /*: string*/
  , masterKey
  /*: string*/
  ) {
    _CoreManager.default.set('APPLICATION_ID', applicationId);

    _CoreManager.default.set('JAVASCRIPT_KEY', javaScriptKey);

    _CoreManager.default.set('MASTER_KEY', masterKey);

    _CoreManager.default.set('USE_MASTER_KEY', false);
  },

  /**
   * Call this method to set your AsyncStorage engine
   * Starting Parse@1.11, the ParseSDK do not provide a React AsyncStorage as the ReactNative module
   * is not provided at a stable path and changes over versions.
   * @param {AsyncStorage} storage a react native async storage.
   * @static
   */
  setAsyncStorage: function (storage
  /*: any*/
  ) {
    _CoreManager.default.setAsyncStorage(storage);
  },

  /**
   * Call this method to set your LocalDatastoreStorage engine
   * If using React-Native use {@link Parse.setAsyncStorage Parse.setAsyncStorage()}
   * @param {LocalDatastoreController} controller a data storage.
   * @static
   */
  setLocalDatastoreController: function (controller
  /*: any*/
  ) {
    _CoreManager.default.setLocalDatastoreController(controller);
  }
};
/** These legacy setters may eventually be deprecated **/

/**
 * @member Parse.applicationId
 * @type string
 * @static
 */

(0, _defineProperty.default)(Parse, 'applicationId', {
  get: function () {
    return _CoreManager.default.get('APPLICATION_ID');
  },
  set: function (value) {
    _CoreManager.default.set('APPLICATION_ID', value);
  }
});
/**
 * @member Parse.javaScriptKey
 * @type string
 * @static
 */

(0, _defineProperty.default)(Parse, 'javaScriptKey', {
  get: function () {
    return _CoreManager.default.get('JAVASCRIPT_KEY');
  },
  set: function (value) {
    _CoreManager.default.set('JAVASCRIPT_KEY', value);
  }
});
/**
 * @member Parse.masterKey
 * @type string
 * @static
 */

(0, _defineProperty.default)(Parse, 'masterKey', {
  get: function () {
    return _CoreManager.default.get('MASTER_KEY');
  },
  set: function (value) {
    _CoreManager.default.set('MASTER_KEY', value);
  }
});
/**
 * @member Parse.serverURL
 * @type string
 * @static
 */

(0, _defineProperty.default)(Parse, 'serverURL', {
  get: function () {
    return _CoreManager.default.get('SERVER_URL');
  },
  set: function (value) {
    _CoreManager.default.set('SERVER_URL', value);
  }
});
/**
 * @member Parse.serverAuthToken
 * @type string
 * @static
 */

(0, _defineProperty.default)(Parse, 'serverAuthToken', {
  get: function () {
    return _CoreManager.default.get('SERVER_AUTH_TOKEN');
  },
  set: function (value) {
    _CoreManager.default.set('SERVER_AUTH_TOKEN', value);
  }
});
/**
 * @member Parse.serverAuthType
 * @type string
 * @static
 */

(0, _defineProperty.default)(Parse, 'serverAuthType', {
  get: function () {
    return _CoreManager.default.get('SERVER_AUTH_TYPE');
  },
  set: function (value) {
    _CoreManager.default.set('SERVER_AUTH_TYPE', value);
  }
});
/**
 * @member Parse.liveQueryServerURL
 * @type string
 * @static
 */

(0, _defineProperty.default)(Parse, 'liveQueryServerURL', {
  get: function () {
    return _CoreManager.default.get('LIVEQUERY_SERVER_URL');
  },
  set: function (value) {
    _CoreManager.default.set('LIVEQUERY_SERVER_URL', value);
  }
});
/* End setters */

Parse.ACL = _dereq_('./ParseACL').default;
Parse.Analytics = _dereq_('./Analytics');
Parse.AnonymousUtils = _dereq_('./AnonymousUtils').default;
Parse.Cloud = _dereq_('./Cloud');
Parse.CoreManager = _dereq_('./CoreManager');
Parse.Config = _dereq_('./ParseConfig').default;
Parse.Error = _dereq_('./ParseError').default;
Parse.FacebookUtils = _dereq_('./FacebookUtils').default;
Parse.File = _dereq_('./ParseFile').default;
Parse.GeoPoint = _dereq_('./ParseGeoPoint').default;
Parse.Polygon = _dereq_('./ParsePolygon').default;
Parse.Installation = _dereq_('./ParseInstallation').default;
Parse.LocalDatastore = _dereq_('./LocalDatastore');
Parse.Object = _dereq_('./ParseObject').default;
Parse.Op = {
  Set: ParseOp.SetOp,
  Unset: ParseOp.UnsetOp,
  Increment: ParseOp.IncrementOp,
  Add: ParseOp.AddOp,
  Remove: ParseOp.RemoveOp,
  AddUnique: ParseOp.AddUniqueOp,
  Relation: ParseOp.RelationOp
};
Parse.Push = _dereq_('./Push');
Parse.Query = _dereq_('./ParseQuery').default;
Parse.Relation = _dereq_('./ParseRelation').default;
Parse.Role = _dereq_('./ParseRole').default;
Parse.Schema = _dereq_('./ParseSchema').default;
Parse.Session = _dereq_('./ParseSession').default;
Parse.Storage = _dereq_('./Storage');
Parse.User = _dereq_('./ParseUser').default;
Parse.LiveQuery = _dereq_('./ParseLiveQuery').default;
Parse.LiveQueryClient = _dereq_('./LiveQueryClient').default;

Parse._request = function () {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  return _CoreManager.default.getRESTController().request.apply(null, args);
};

Parse._ajax = function () {
  for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    args[_key2] = arguments[_key2];
  }

  return _CoreManager.default.getRESTController().ajax.apply(null, args);
}; // We attempt to match the signatures of the legacy versions of these methods


Parse._decode = function (_, value) {
  return (0, _decode.default)(value);
};

Parse._encode = function (value, _, disallowObjects) {
  return (0, _encode.default)(value, disallowObjects);
};

Parse._getInstallationId = function () {
  return _CoreManager.default.getInstallationController().currentInstallationId();
};
/**
 * Enable pinning in your application.
 * This must be called before your application can use pinning.
 *
 * @static
 */


Parse.enableLocalDatastore = function () {
  Parse.LocalDatastore.isEnabled = true;
};
/**
 * Flag that indicates whether Local Datastore is enabled.
 *
 * @static
 */


Parse.isLocalDatastoreEnabled = function () {
  return Parse.LocalDatastore.isEnabled;
};
/**
 * Gets all contents from Local Datastore
 *
 * <pre>
 * await Parse.dumpLocalDatastore();
 * </pre>
 *
 * @static
 */


Parse.dumpLocalDatastore = function () {
  if (!Parse.LocalDatastore.isEnabled) {
    console.log('Parse.enableLocalDatastore() must be called first'); // eslint-disable-line no-console

    return _promise.default.resolve({});
  } else {
    return Parse.LocalDatastore._getAllContents();
  }
};

_CoreManager.default.setInstallationController(_InstallationController.default);

_CoreManager.default.setRESTController(_RESTController.default);

// For legacy requires, of the form `var Parse = require('parse').Parse`
Parse.Parse = Parse;
module.exports = Parse;
}).call(this,_dereq_('_process'))
},{"./Analytics":1,"./AnonymousUtils":2,"./Cloud":3,"./CoreManager":4,"./FacebookUtils":6,"./InstallationController":7,"./LiveQueryClient":8,"./LocalDatastore":10,"./ParseACL":16,"./ParseConfig":17,"./ParseError":18,"./ParseFile":19,"./ParseGeoPoint":20,"./ParseInstallation":21,"./ParseLiveQuery":22,"./ParseObject":23,"./ParseOp":24,"./ParsePolygon":25,"./ParseQuery":26,"./ParseRelation":27,"./ParseRole":28,"./ParseSchema":29,"./ParseSession":30,"./ParseUser":31,"./Push":32,"./RESTController":33,"./Storage":35,"./decode":41,"./encode":42,"@babel/runtime-corejs3/core-js-stable/object/define-property":71,"@babel/runtime-corejs3/core-js-stable/promise":78,"@babel/runtime-corejs3/helpers/interopRequireDefault":110,"@babel/runtime-corejs3/helpers/interopRequireWildcard":111,"_process":126}],16:[function(_dereq_,module,exports){
"use strict";

var _interopRequireDefault = _dereq_("@babel/runtime-corejs3/helpers/interopRequireDefault");

var _Object$defineProperty = _dereq_("@babel/runtime-corejs3/core-js-stable/object/define-property");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports.default = void 0;

var _keys = _interopRequireDefault(_dereq_("@babel/runtime-corejs3/core-js-stable/object/keys"));

var _typeof2 = _interopRequireDefault(_dereq_("@babel/runtime-corejs3/helpers/typeof"));

var _classCallCheck2 = _interopRequireDefault(_dereq_("@babel/runtime-corejs3/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(_dereq_("@babel/runtime-corejs3/helpers/createClass"));

var _defineProperty2 = _interopRequireDefault(_dereq_("@babel/runtime-corejs3/helpers/defineProperty"));

var _ParseRole = _interopRequireDefault(_dereq_("./ParseRole"));

var _ParseUser = _interopRequireDefault(_dereq_("./ParseUser"));
/**
 * Copyright (c) 2015-present, Parse, LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @flow
 */


var PUBLIC_KEY = '*';
/**
 * Creates a new ACL.
 * If no argument is given, the ACL has no permissions for anyone.
 * If the argument is a Parse.User, the ACL will have read and write
 *   permission for only that user.
 * If the argument is any other JSON object, that object will be interpretted
 *   as a serialized ACL created with toJSON().
 *
 * <p>An ACL, or Access Control List can be added to any
 * <code>Parse.Object</code> to restrict access to only a subset of users
 * of your application.</p>
 * @alias Parse.ACL
 */

var ParseACL =
/*#__PURE__*/
function () {
  /**
   * @param {(Parse.User|Object)} user The user to initialize the ACL for
   */
  function ParseACL(arg1
  /*: ParseUser | ByIdMap*/
  ) {
    (0, _classCallCheck2.default)(this, ParseACL);
    (0, _defineProperty2.default)(this, "permissionsById", void 0);
    this.permissionsById = {};

    if (arg1 && (0, _typeof2.default)(arg1) === 'object') {
      if (arg1 instanceof _ParseUser.default) {
        this.setReadAccess(arg1, true);
        this.setWriteAccess(arg1, true);
      } else {
        for (var _userId in arg1) {
          var accessList = arg1[_userId];

          if (typeof _userId !== 'string') {
            throw new TypeError('Tried to create an ACL with an invalid user id.');
          }

          this.permissionsById[_userId] = {};

          for (var _permission in accessList) {
            var allowed = accessList[_permission];

            if (_permission !== 'read' && _permission !== 'write') {
              throw new TypeError('Tried to create an ACL with an invalid permission type.');
            }

            if (typeof allowed !== 'boolean') {
              throw new TypeError('Tried to create an ACL with an invalid permission value.');
            }

            this.permissionsById[_userId][_permission] = allowed;
          }
        }
      }
    } else if (typeof arg1 === 'function') {
      throw new TypeError('ParseACL constructed with a function. Did you forget ()?');
    }
  }
  /**
   * Returns a JSON-encoded version of the ACL.
   * @return {Object}
   */


  (0, _createClass2.default)(ParseACL, [{
    key: "toJSON",
    value: function ()
    /*: ByIdMap*/
    {
      var permissions = {};

      for (var p in this.permissionsById) {
        permissions[p] = this.permissionsById[p];
      }

      return permissions;
    }
    /**
     * Returns whether this ACL is equal to another object
     * @param other The other object to compare to
     * @return {Boolean}
     */

  }, {
    key: "equals",
    value: function (other
    /*: ParseACL*/
    )
    /*: boolean*/
    {
      if (!(other instanceof ParseACL)) {
        return false;
      }

      var users = (0, _keys.default)(this.permissionsById);
      var otherUsers = (0, _keys.default)(other.permissionsById);

      if (users.length !== otherUsers.length) {
        return false;
      }

      for (var u in this.permissionsById) {
        if (!other.permissionsById[u]) {
          return false;
        }

        if (this.permissionsById[u].read !== other.permissionsById[u].read) {
          return false;
        }

        if (this.permissionsById[u].write !== other.permissionsById[u].write) {
          return false;
        }
      }

      return true;
    }
  }, {
    key: "_setAccess",
    value: function (accessType
    /*: string*/
    , userId
    /*: ParseUser | ParseRole | string*/
    , allowed
    /*: boolean*/
    ) {
      if (userId instanceof _ParseUser.default) {
        userId = userId.id;
      } else if (userId instanceof _ParseRole.default) {
        var name = userId.getName();

        if (!name) {
          throw new TypeError('Role must have a name');
        }

        userId = 'role:' + name;
      }

      if (typeof userId !== 'string') {
        throw new TypeError('userId must be a string.');
      }

      if (typeof allowed !== 'boolean') {
        throw new TypeError('allowed must be either true or false.');
      }

      var permissions = this.permissionsById[userId];

      if (!permissions) {
        if (!allowed) {
          // The user already doesn't have this permission, so no action is needed
          return;
        } else {
          permissions = {};
          this.permissionsById[userId] = permissions;
        }
      }

      if (allowed) {
        this.permissionsById[userId][accessType] = true;
      } else {
        delete permissions[accessType];

        if ((0, _keys.default)(permissions).length === 0) {
          delete this.permissionsById[userId];
        }
      }
    }
  }, {
    key: "_getAccess",
    value: function (accessType
    /*: string*/
    , userId
    /*: ParseUser | ParseRole | string*/
    )
    /*: boolean*/
    {
      if (userId instanceof _ParseUser.default) {
        userId = userId.id;

        if (!userId) {
          throw new Error('Cannot get access for a ParseUser without an ID');
        }
      } else if (userId instanceof _ParseRole.default) {
        var name = userId.getName();

        if (!name) {
          throw new TypeError('Role must have a name');
        }

        userId = 'role:' + name;
      }

      var permissions = this.permissionsById[userId];

      if (!permissions) {
        return false;
      }

      return !!permissions[accessType];
    }
    /**
     * Sets whether the given user is allowed to read this object.
     * @param userId An instance of Parse.User or its objectId.
     * @param {Boolean} allowed Whether that user should have read access.
     */

  }, {
    key: "setReadAccess",
    value: function (userId
    /*: ParseUser | ParseRole | string*/
    , allowed
    /*: boolean*/
    ) {
      this._setAccess('read', userId, allowed);
    }
    /**
     * Get whether the given user id is *explicitly* allowed to read this object.
     * Even if this returns false, the user may still be able to access it if
     * getPublicReadAccess returns true or a role that the user belongs to has
     * write access.
     * @param userId An instance of Parse.User or its objectId, or a Parse.Role.
     * @return {Boolean}
     */

  }, {
    key: "getReadAccess",
    value: function (userId
    /*: ParseUser | ParseRole | string*/
    )
    /*: boolean*/
    {
      return this._getAccess('read', userId);
    }
    /**
     * Sets whether the given user id is allowed to write this object.
     * @param userId An instance of Parse.User or its objectId, or a Parse.Role..
     * @param {Boolean} allowed Whether that user should have write access.
     */

  }, {
    key: "setWriteAccess",
    value: function (userId
    /*: ParseUser | ParseRole | string*/
    , allowed
    /*: boolean*/
    ) {
      this._setAccess('write', userId, allowed);
    }
    /**
     * Gets whether the given user id is *explicitly* allowed to write this object.
     * Even if this returns false, the user may still be able to write it if
     * getPublicWriteAccess returns true or a role that the user belongs to has
     * write access.
     * @param userId An instance of Parse.User or its objectId, or a Parse.Role.
     * @return {Boolean}
     */

  }, {
    key: "getWriteAccess",
    value: function (userId
    /*: ParseUser | ParseRole | string*/
    )
    /*: boolean*/
    {
      return this._getAccess('write', userId);
    }
    /**
     * Sets whether the public is allowed to read this object.
     * @param {Boolean} allowed
     */

  }, {
    key: "setPublicReadAccess",
    value: function (allowed
    /*: boolean*/
    ) {
      this.setReadAccess(PUBLIC_KEY, allowed);
    }
    /**
     * Gets whether the public is allowed to read this object.
     * @return {Boolean}
     */

  }, {
    key: "getPublicReadAccess",
    value: function ()
    /*: boolean*/
    {
      return this.getReadAccess(PUBLIC_KEY);
    }
    /**
     * Sets whether the public is allowed to write this object.
     * @param {Boolean} allowed
     */

  }, {
    key: "setPublicWriteAccess",
    value: function (allowed
    /*: boolean*/
    ) {
      this.setWriteAccess(PUBLIC_KEY, allowed);
    }
    /**
     * Gets whether the public is allowed to write this object.
     * @return {Boolean}
     */

  }, {
    key: "getPublicWriteAccess",
    value: function ()
    /*: boolean*/
    {
      return this.getWriteAccess(PUBLIC_KEY);
    }
    /**
     * Gets whether users belonging to the given role are allowed
     * to read this object. Even if this returns false, the role may
     * still be able to write it if a parent role has read access.
     *
     * @param role The name of the role, or a Parse.Role object.
     * @return {Boolean} true if the role has read access. false otherwise.
     * @throws {TypeError} If role is neither a Parse.Role nor a String.
     */

  }, {
    key: "getRoleReadAccess",
    value: function (role
    /*: ParseRole | string*/
    )
    /*: boolean*/
    {
      if (role instanceof _ParseRole.default) {
        // Normalize to the String name
        role = role.getName();
      }

      if (typeof role !== 'string') {
        throw new TypeError('role must be a ParseRole or a String');
      }

      return this.getReadAccess('role:' + role);
    }
    /**
     * Gets whether users belonging to the given role are allowed
     * to write this object. Even if this returns false, the role may
     * still be able to write it if a parent role has write access.
     *
     * @param role The name of the role, or a Parse.Role object.
     * @return {Boolean} true if the role has write access. false otherwise.
     * @throws {TypeError} If role is neither a Parse.Role nor a String.
     */

  }, {
    key: "getRoleWriteAccess",
    value: function (role
    /*: ParseRole | string*/
    )
    /*: boolean*/
    {
      if (role instanceof _ParseRole.default) {
        // Normalize to the String name
        role = role.getName();
      }

      if (typeof role !== 'string') {
        throw new TypeError('role must be a ParseRole or a String');
      }

      return this.getWriteAccess('role:' + role);
    }
    /**
     * Sets whether users belonging to the given role are allowed
     * to read this object.
     *
     * @param role The name of the role, or a Parse.Role object.
     * @param {Boolean} allowed Whether the given role can read this object.
     * @throws {TypeError} If role is neither a Parse.Role nor a String.
     */

  }, {
    key: "setRoleReadAccess",
    value: function (role
    /*: ParseRole | string*/
    , allowed
    /*: boolean*/
    ) {
      if (role instanceof _ParseRole.default) {
        // Normalize to the String name
        role = role.getName();
      }

      if (typeof role !== 'string') {
        throw new TypeError('role must be a ParseRole or a String');
      }

      this.setReadAccess('role:' + role, allowed);
    }
    /**
     * Sets whether users belonging to the given role are allowed
     * to write this object.
     *
     * @param role The name of the role, or a Parse.Role object.
     * @param {Boolean} allowed Whether the given role can write this object.
     * @throws {TypeError} If role is neither a Parse.Role nor a String.
     */

  }, {
    key: "setRoleWriteAccess",
    value: function (role
    /*: ParseRole | string*/
    , allowed
    /*: boolean*/
    ) {
      if (role instanceof _ParseRole.default) {
        // Normalize to the String name
        role = role.getName();
      }

      if (typeof role !== 'string') {
        throw new TypeError('role must be a ParseRole or a String');
      }

      this.setWriteAccess('role:' + role, allowed);
    }
  }]);
  return ParseACL;
}();

var _default = ParseACL;
exports.default = _default;
},{"./ParseRole":28,"./ParseUser":31,"@babel/runtime-corejs3/core-js-stable/object/define-property":71,"@babel/runtime-corejs3/core-js-stable/object/keys":76,"@babel/runtime-corejs3/helpers/classCallCheck":103,"@babel/runtime-corejs3/helpers/createClass":105,"@babel/runtime-corejs3/helpers/defineProperty":106,"@babel/runtime-corejs3/helpers/interopRequireDefault":110,"@babel/runtime-corejs3/helpers/typeof":122}],17:[function(_dereq_,module,exports){
"use strict";

var _interopRequireDefault = _dereq_("@babel/runtime-corejs3/helpers/interopRequireDefault");

var _Object$defineProperty = _dereq_("@babel/runtime-corejs3/core-js-stable/object/define-property");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports.default = void 0;

var _stringify = _interopRequireDefault(_dereq_("@babel/runtime-corejs3/core-js-stable/json/stringify"));

var _typeof2 = _interopRequireDefault(_dereq_("@babel/runtime-corejs3/helpers/typeof"));

var _promise = _interopRequireDefault(_dereq_("@babel/runtime-corejs3/core-js-stable/promise"));

var _classCallCheck2 = _interopRequireDefault(_dereq_("@babel/runtime-corejs3/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(_dereq_("@babel/runtime-corejs3/helpers/createClass"));

var _defineProperty2 = _interopRequireDefault(_dereq_("@babel/runtime-corejs3/helpers/defineProperty"));

var _CoreManager = _interopRequireDefault(_dereq_("./CoreManager"));

var _decode = _interopRequireDefault(_dereq_("./decode"));

var _encode = _interopRequireDefault(_dereq_("./encode"));

var _escape2 = _interopRequireDefault(_dereq_("./escape"));

var _ParseError = _interopRequireDefault(_dereq_("./ParseError"));

var _Storage = _interopRequireDefault(_dereq_("./Storage"));
/**
 * Copyright (c) 2015-present, Parse, LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @flow
 */

/**
 * Parse.Config is a local representation of configuration data that
 * can be set from the Parse dashboard.
 *
 * @alias Parse.Config
 */


var ParseConfig =
/*#__PURE__*/
function () {
  function ParseConfig() {
    (0, _classCallCheck2.default)(this, ParseConfig);
    (0, _defineProperty2.default)(this, "attributes", void 0);
    (0, _defineProperty2.default)(this, "_escapedAttributes", void 0);
    this.attributes = {};
    this._escapedAttributes = {};
  }
  /**
   * Gets the value of an attribute.
   * @param {String} attr The name of an attribute.
   */


  (0, _createClass2.default)(ParseConfig, [{
    key: "get",
    value: function (attr
    /*: string*/
    )
    /*: any*/
    {
      return this.attributes[attr];
    }
    /**
     * Gets the HTML-escaped value of an attribute.
     * @param {String} attr The name of an attribute.
     */

  }, {
    key: "escape",
    value: function (attr
    /*: string*/
    )
    /*: string*/
    {
      var html = this._escapedAttributes[attr];

      if (html) {
        return html;
      }

      var val = this.attributes[attr];
      var escaped = '';

      if (val != null) {
        escaped = (0, _escape2.default)(val.toString());
      }

      this._escapedAttributes[attr] = escaped;
      return escaped;
    }
    /**
     * Retrieves the most recently-fetched configuration object, either from
     * memory or from local storage if necessary.
     *
     * @static
     * @return {Config} The most recently-fetched Parse.Config if it
     *     exists, else an empty Parse.Config.
     */

  }], [{
    key: "current",
    value: function () {
      var controller = _CoreManager.default.getConfigController();

      return controller.current();
    }
    /**
     * Gets a new configuration object from the server.
     * @static
     * @return {Promise} A promise that is resolved with a newly-created
     *     configuration object when the get completes.
     */

  }, {
    key: "get",
    value: function () {
      var controller = _CoreManager.default.getConfigController();

      return controller.get();
    }
    /**
     * Save value keys to the server.
     * @static
     * @return {Promise} A promise that is resolved with a newly-created
     *     configuration object or with the current with the update.
     */

  }, {
    key: "save",
    value: function (attrs
    /*: { [key: string]: any }*/
    ) {
      var controller = _CoreManager.default.getConfigController(); //To avoid a mismatch with the local and the cloud config we get a new version


      return controller.save(attrs).then(function () {
        return controller.get();
      }, function (error) {
        return _promise.default.reject(error);
      });
    }
  }]);
  return ParseConfig;
}();

var currentConfig = null;
var CURRENT_CONFIG_KEY = 'currentConfig';

function decodePayload(data) {
  try {
    var json = JSON.parse(data);

    if (json && (0, _typeof2.default)(json) === 'object') {
      return (0, _decode.default)(json);
    }
  } catch (e) {
    return null;
  }
}

var DefaultController = {
  current: function () {
    if (currentConfig) {
      return currentConfig;
    }

    var config = new ParseConfig();

    var storagePath = _Storage.default.generatePath(CURRENT_CONFIG_KEY);

    var configData;

    if (!_Storage.default.async()) {
      configData = _Storage.default.getItem(storagePath);

      if (configData) {
        var attributes = decodePayload(configData);

        if (attributes) {
          config.attributes = attributes;
          currentConfig = config;
        }
      }

      return config;
    } // Return a promise for async storage controllers


    return _Storage.default.getItemAsync(storagePath).then(function (configData) {
      if (configData) {
        var _attributes = decodePayload(configData);

        if (_attributes) {
          config.attributes = _attributes;
          currentConfig = config;
        }
      }

      return config;
    });
  },
  get: function () {
    var RESTController = _CoreManager.default.getRESTController();

    return RESTController.request('GET', 'config', {}, {}).then(function (response) {
      if (!response || !response.params) {
        var error = new _ParseError.default(_ParseError.default.INVALID_JSON, 'Config JSON response invalid.');
        return _promise.default.reject(error);
      }

      var config = new ParseConfig();
      config.attributes = {};

      for (var attr in response.params) {
        config.attributes[attr] = (0, _decode.default)(response.params[attr]);
      }

      currentConfig = config;
      return _Storage.default.setItemAsync(_Storage.default.generatePath(CURRENT_CONFIG_KEY), (0, _stringify.default)(response.params)).then(function () {
        return config;
      });
    });
  },
  save: function (attrs
  /*: { [key: string]: any }*/
  ) {
    var RESTController = _CoreManager.default.getRESTController();

    var encodedAttrs = {};

    for (var _key in attrs) {
      encodedAttrs[_key] = (0, _encode.default)(attrs[_key]);
    }

    return RESTController.request('PUT', 'config', {
      params: encodedAttrs
    }, {
      useMasterKey: true
    }).then(function (response) {
      if (response && response.result) {
        return _promise.default.resolve();
      } else {
        var error = new _ParseError.default(_ParseError.default.INTERNAL_SERVER_ERROR, 'Error occured updating Config.');
        return _promise.default.reject(error);
      }
    });
  }
};

_CoreManager.default.setConfigController(DefaultController);

var _default = ParseConfig;
exports.default = _default;
},{"./CoreManager":4,"./ParseError":18,"./Storage":35,"./decode":41,"./encode":42,"./escape":44,"@babel/runtime-corejs3/core-js-stable/json/stringify":66,"@babel/runtime-corejs3/core-js-stable/object/define-property":71,"@babel/runtime-corejs3/core-js-stable/promise":78,"@babel/runtime-corejs3/helpers/classCallCheck":103,"@babel/runtime-corejs3/helpers/createClass":105,"@babel/runtime-corejs3/helpers/defineProperty":106,"@babel/runtime-corejs3/helpers/interopRequireDefault":110,"@babel/runtime-corejs3/helpers/typeof":122}],18:[function(_dereq_,module,exports){
"use strict";

var _interopRequireDefault = _dereq_("@babel/runtime-corejs3/helpers/interopRequireDefault");

var _Object$defineProperty2 = _dereq_("@babel/runtime-corejs3/core-js-stable/object/define-property");

_Object$defineProperty2(exports, "__esModule", {
  value: true
});

exports.default = void 0;

var _defineProperty = _interopRequireDefault(_dereq_("@babel/runtime-corejs3/core-js-stable/object/define-property"));

var _classCallCheck2 = _interopRequireDefault(_dereq_("@babel/runtime-corejs3/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(_dereq_("@babel/runtime-corejs3/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(_dereq_("@babel/runtime-corejs3/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(_dereq_("@babel/runtime-corejs3/helpers/getPrototypeOf"));

var _assertThisInitialized2 = _interopRequireDefault(_dereq_("@babel/runtime-corejs3/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(_dereq_("@babel/runtime-corejs3/helpers/inherits"));

var _wrapNativeSuper2 = _interopRequireDefault(_dereq_("@babel/runtime-corejs3/helpers/wrapNativeSuper"));
/**
 * Copyright (c) 2015-present, Parse, LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

/**
  * Constructs a new Parse.Error object with the given code and message.
  * @alias Parse.Error
  */


var ParseError =
/*#__PURE__*/
function (_Error) {
  (0, _inherits2.default)(ParseError, _Error);
  /**
   * @param {Number} code An error code constant from <code>Parse.Error</code>.
   * @param {String} message A detailed description of the error.
   */

  function ParseError(code, message) {
    var _this;

    (0, _classCallCheck2.default)(this, ParseError);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(ParseError).call(this, message));
    _this.code = code;
    (0, _defineProperty.default)((0, _assertThisInitialized2.default)(_this), 'message', {
      enumerable: true,
      value: message
    });
    return _this;
  }

  (0, _createClass2.default)(ParseError, [{
    key: "toString",
    value: function () {
      return 'ParseError: ' + this.code + ' ' + this.message;
    }
  }]);
  return ParseError;
}((0, _wrapNativeSuper2.default)(Error));
/**
 * Error code indicating some error other than those enumerated here.
 * @property OTHER_CAUSE
 * @static
 * @final
 */


ParseError.OTHER_CAUSE = -1;
/**
 * Error code indicating that something has gone wrong with the server.
 * If you get this error code, it is Parse's fault. Contact us at
 * https://parse.com/help
 * @property INTERNAL_SERVER_ERROR
 * @static
 * @final
 */

ParseError.INTERNAL_SERVER_ERROR = 1;
/**
 * Error code indicating the connection to the Parse servers failed.
 * @property CONNECTION_FAILED
 * @static
 * @final
 */

ParseError.CONNECTION_FAILED = 100;
/**
 * Error code indicating the specified object doesn't exist.
 * @property OBJECT_NOT_FOUND
 * @static
 * @final
 */

ParseError.OBJECT_NOT_FOUND = 101;
/**
 * Error code indicating you tried to query with a datatype that doesn't
 * support it, like exact matching an array or object.
 * @property INVALID_QUERY
 * @static
 * @final
 */

ParseError.INVALID_QUERY = 102;
/**
 * Error code indicating a missing or invalid classname. Classnames are
 * case-sensitive. They must start with a letter, and a-zA-Z0-9_ are the
 * only valid characters.
 * @property INVALID_CLASS_NAME
 * @static
 * @final
 */

ParseError.INVALID_CLASS_NAME = 103;
/**
 * Error code indicating an unspecified object id.
 * @property MISSING_OBJECT_ID
 * @static
 * @final
 */

ParseError.MISSING_OBJECT_ID = 104;
/**
 * Error code indicating an invalid key name. Keys are case-sensitive. They
 * must start with a letter, and a-zA-Z0-9_ are the only valid characters.
 * @property INVALID_KEY_NAME
 * @static
 * @final
 */

ParseError.INVALID_KEY_NAME = 105;
/**
 * Error code indicating a malformed pointer. You should not see this unless
 * you have been mucking about changing internal Parse code.
 * @property INVALID_POINTER
 * @static
 * @final
 */

ParseError.INVALID_POINTER = 106;
/**
 * Error code indicating that badly formed JSON was received upstream. This
 * either indicates you have done something unusual with modifying how
 * things encode to JSON, or the network is failing badly.
 * @property INVALID_JSON
 * @static
 * @final
 */

ParseError.INVALID_JSON = 107;
/**
 * Error code indicating that the feature you tried to access is only
 * available internally for testing purposes.
 * @property COMMAND_UNAVAILABLE
 * @static
 * @final
 */

ParseError.COMMAND_UNAVAILABLE = 108;
/**
 * You must call Parse.initialize before using the Parse library.
 * @property NOT_INITIALIZED
 * @static
 * @final
 */

ParseError.NOT_INITIALIZED = 109;
/**
 * Error code indicating that a field was set to an inconsistent type.
 * @property INCORRECT_TYPE
 * @static
 * @final
 */

ParseError.INCORRECT_TYPE = 111;
/**
 * Error code indicating an invalid channel name. A channel name is either
 * an empty string (the broadcast channel) or contains only a-zA-Z0-9_
 * characters and starts with a letter.
 * @property INVALID_CHANNEL_NAME
 * @static
 * @final
 */

ParseError.INVALID_CHANNEL_NAME = 112;
/**
 * Error code indicating that push is misconfigured.
 * @property PUSH_MISCONFIGURED
 * @static
 * @final
 */

ParseError.PUSH_MISCONFIGURED = 115;
/**
 * Error code indicating that the object is too large.
 * @property OBJECT_TOO_LARGE
 * @static
 * @final
 */

ParseError.OBJECT_TOO_LARGE = 116;
/**
 * Error code indicating that the operation isn't allowed for clients.
 * @property OPERATION_FORBIDDEN
 * @static
 * @final
 */

ParseError.OPERATION_FORBIDDEN = 119;
/**
 * Error code indicating the result was not found in the cache.
 * @property CACHE_MISS
 * @static
 * @final
 */

ParseError.CACHE_MISS = 120;
/**
 * Error code indicating that an invalid key was used in a nested
 * JSONObject.
 * @property INVALID_NESTED_KEY
 * @static
 * @final
 */

ParseError.INVALID_NESTED_KEY = 121;
/**
 * Error code indicating that an invalid filename was used for ParseFile.
 * A valid file name contains only a-zA-Z0-9_. characters and is between 1
 * and 128 characters.
 * @property INVALID_FILE_NAME
 * @static
 * @final
 */

ParseError.INVALID_FILE_NAME = 122;
/**
 * Error code indicating an invalid ACL was provided.
 * @property INVALID_ACL
 * @static
 * @final
 */

ParseError.INVALID_ACL = 123;
/**
 * Error code indicating that the request timed out on the server. Typically
 * this indicates that the request is too expensive to run.
 * @property TIMEOUT
 * @static
 * @final
 */

ParseError.TIMEOUT = 124;
/**
 * Error code indicating that the email address was invalid.
 * @property INVALID_EMAIL_ADDRESS
 * @static
 * @final
 */

ParseError.INVALID_EMAIL_ADDRESS = 125;
/**
 * Error code indicating a missing content type.
 * @property MISSING_CONTENT_TYPE
 * @static
 * @final
 */

ParseError.MISSING_CONTENT_TYPE = 126;
/**
 * Error code indicating a missing content length.
 * @property MISSING_CONTENT_LENGTH
 * @static
 * @final
 */

ParseError.MISSING_CONTENT_LENGTH = 127;
/**
 * Error code indicating an invalid content length.
 * @property INVALID_CONTENT_LENGTH
 * @static
 * @final
 */

ParseError.INVALID_CONTENT_LENGTH = 128;
/**
 * Error code indicating a file that was too large.
 * @property FILE_TOO_LARGE
 * @static
 * @final
 */

ParseError.FILE_TOO_LARGE = 129;
/**
 * Error code indicating an error saving a file.
 * @property FILE_SAVE_ERROR
 * @static
 * @final
 */

ParseError.FILE_SAVE_ERROR = 130;
/**
 * Error code indicating that a unique field was given a value that is
 * already taken.
 * @property DUPLICATE_VALUE
 * @static
 * @final
 */

ParseError.DUPLICATE_VALUE = 137;
/**
 * Error code indicating that a role's name is invalid.
 * @property INVALID_ROLE_NAME
 * @static
 * @final
 */

ParseError.INVALID_ROLE_NAME = 139;
/**
 * Error code indicating that an application quota was exceeded.  Upgrade to
 * resolve.
 * @property EXCEEDED_QUOTA
 * @static
 * @final
 */

ParseError.EXCEEDED_QUOTA = 140;
/**
 * Error code indicating that a Cloud Code script failed.
 * @property SCRIPT_FAILED
 * @static
 * @final
 */

ParseError.SCRIPT_FAILED = 141;
/**
 * Error code indicating that a Cloud Code validation failed.
 * @property VALIDATION_ERROR
 * @static
 * @final
 */

ParseError.VALIDATION_ERROR = 142;
/**
 * Error code indicating that invalid image data was provided.
 * @property INVALID_IMAGE_DATA
 * @static
 * @final
 */

ParseError.INVALID_IMAGE_DATA = 143;
/**
 * Error code indicating an unsaved file.
 * @property UNSAVED_FILE_ERROR
 * @static
 * @final
 */

ParseError.UNSAVED_FILE_ERROR = 151;
/**
 * Error code indicating an invalid push time.
 * @property INVALID_PUSH_TIME_ERROR
 * @static
 * @final
 */

ParseError.INVALID_PUSH_TIME_ERROR = 152;
/**
 * Error code indicating an error deleting a file.
 * @property FILE_DELETE_ERROR
 * @static
 * @final
 */

ParseError.FILE_DELETE_ERROR = 153;
/**
 * Error code indicating that the application has exceeded its request
 * limit.
 * @property REQUEST_LIMIT_EXCEEDED
 * @static
 * @final
 */

ParseError.REQUEST_LIMIT_EXCEEDED = 155;
/**
 * Error code indicating an invalid event name.
 * @property INVALID_EVENT_NAME
 * @static
 * @final
 */

ParseError.INVALID_EVENT_NAME = 160;
/**
 * Error code indicating that the username is missing or empty.
 * @property USERNAME_MISSING
 * @static
 * @final
 */

ParseError.USERNAME_MISSING = 200;
/**
 * Error code indicating that the password is missing or empty.
 * @property PASSWORD_MISSING
 * @static
 * @final
 */

ParseError.PASSWORD_MISSING = 201;
/**
 * Error code indicating that the username has already been taken.
 * @property USERNAME_TAKEN
 * @static
 * @final
 */

ParseError.USERNAME_TAKEN = 202;
/**
 * Error code indicating that the email has already been taken.
 * @property EMAIL_TAKEN
 * @static
 * @final
 */

ParseError.EMAIL_TAKEN = 203;
/**
 * Error code indicating that the email is missing, but must be specified.
 * @property EMAIL_MISSING
 * @static
 * @final
 */

ParseError.EMAIL_MISSING = 204;
/**
 * Error code indicating that a user with the specified email was not found.
 * @property EMAIL_NOT_FOUND
 * @static
 * @final
 */

ParseError.EMAIL_NOT_FOUND = 205;
/**
 * Error code indicating that a user object without a valid session could
 * not be altered.
 * @property SESSION_MISSING
 * @static
 * @final
 */

ParseError.SESSION_MISSING = 206;
/**
 * Error code indicating that a user can only be created through signup.
 * @property MUST_CREATE_USER_THROUGH_SIGNUP
 * @static
 * @final
 */

ParseError.MUST_CREATE_USER_THROUGH_SIGNUP = 207;
/**
 * Error code indicating that an an account being linked is already linked
 * to another user.
 * @property ACCOUNT_ALREADY_LINKED
 * @static
 * @final
 */

ParseError.ACCOUNT_ALREADY_LINKED = 208;
/**
 * Error code indicating that the current session token is invalid.
 * @property INVALID_SESSION_TOKEN
 * @static
 * @final
 */

ParseError.INVALID_SESSION_TOKEN = 209;
/**
 * Error code indicating that a user cannot be linked to an account because
 * that account's id could not be found.
 * @property LINKED_ID_MISSING
 * @static
 * @final
 */

ParseError.LINKED_ID_MISSING = 250;
/**
 * Error code indicating that a user with a linked (e.g. Facebook) account
 * has an invalid session.
 * @property INVALID_LINKED_SESSION
 * @static
 * @final
 */

ParseError.INVALID_LINKED_SESSION = 251;
/**
 * Error code indicating that a service being linked (e.g. Facebook or
 * Twitter) is unsupported.
 * @property UNSUPPORTED_SERVICE
 * @static
 * @final
 */

ParseError.UNSUPPORTED_SERVICE = 252;
/**
 * Error code indicating an invalid operation occured on schema
 * @property INVALID_SCHEMA_OPERATION
 * @static
 * @final
 */

ParseError.INVALID_SCHEMA_OPERATION = 255;
/**
 * Error code indicating that there were multiple errors. Aggregate errors
 * have an "errors" property, which is an array of error objects with more
 * detail about each error that occurred.
 * @property AGGREGATE_ERROR
 * @static
 * @final
 */

ParseError.AGGREGATE_ERROR = 600;
/**
 * Error code indicating the client was unable to read an input file.
 * @property FILE_READ_ERROR
 * @static
 * @final
 */

ParseError.FILE_READ_ERROR = 601;
/**
 * Error code indicating a real error code is unavailable because
 * we had to use an XDomainRequest object to allow CORS requests in
 * Internet Explorer, which strips the body from HTTP responses that have
 * a non-2XX status code.
 * @property X_DOMAIN_REQUEST
 * @static
 * @final
 */

ParseError.X_DOMAIN_REQUEST = 602;
var _default = ParseError;
exports.default = _default;
},{"@babel/runtime-corejs3/core-js-stable/object/define-property":71,"@babel/runtime-corejs3/helpers/assertThisInitialized":101,"@babel/runtime-corejs3/helpers/classCallCheck":103,"@babel/runtime-corejs3/helpers/createClass":105,"@babel/runtime-corejs3/helpers/getPrototypeOf":108,"@babel/runtime-corejs3/helpers/inherits":109,"@babel/runtime-corejs3/helpers/interopRequireDefault":110,"@babel/runtime-corejs3/helpers/possibleConstructorReturn":117,"@babel/runtime-corejs3/helpers/wrapNativeSuper":123}],19:[function(_dereq_,module,exports){
"use strict";

var _interopRequireDefault = _dereq_("@babel/runtime-corejs3/helpers/interopRequireDefault");

var _Object$defineProperty = _dereq_("@babel/runtime-corejs3/core-js-stable/object/define-property");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports.default = void 0;

var _promise = _interopRequireDefault(_dereq_("@babel/runtime-corejs3/core-js-stable/promise"));

var _regenerator = _interopRequireDefault(_dereq_("@babel/runtime-corejs3/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(_dereq_("@babel/runtime-corejs3/helpers/asyncToGenerator"));

var _slice = _interopRequireDefault(_dereq_("@babel/runtime-corejs3/core-js-stable/instance/slice"));

var _indexOf = _interopRequireDefault(_dereq_("@babel/runtime-corejs3/core-js-stable/instance/index-of"));

var _isArray = _interopRequireDefault(_dereq_("@babel/runtime-corejs3/core-js-stable/array/is-array"));

var _classCallCheck2 = _interopRequireDefault(_dereq_("@babel/runtime-corejs3/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(_dereq_("@babel/runtime-corejs3/helpers/createClass"));

var _defineProperty2 = _interopRequireDefault(_dereq_("@babel/runtime-corejs3/helpers/defineProperty"));

var _CoreManager = _interopRequireDefault(_dereq_("./CoreManager"));
/**
 * Copyright (c) 2015-present, Parse, LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @flow
 */

/* global XMLHttpRequest, Blob */


var XHR = null;

if (typeof XMLHttpRequest !== 'undefined') {
  XHR = XMLHttpRequest;
}

/*:: type Base64 = { base64: string };*/

/*:: type Uri = { uri: string };*/

/*:: type FileData = Array<number> | Base64 | Blob | Uri;*/

/*:: export type FileSource = {
  format: 'file';
  file: Blob;
  type: string
} | {
  format: 'base64';
  base64: string;
  type: string
} | {
  format: 'uri';
  uri: string;
  type: string
};*/
var dataUriRegexp = /^data:([a-zA-Z]+\/[-a-zA-Z0-9+.]+)(;charset=[a-zA-Z0-9\-\/]*)?;base64,/;

function b64Digit(number
/*: number*/
)
/*: string*/
{
  if (number < 26) {
    return String.fromCharCode(65 + number);
  }

  if (number < 52) {
    return String.fromCharCode(97 + (number - 26));
  }

  if (number < 62) {
    return String.fromCharCode(48 + (number - 52));
  }

  if (number === 62) {
    return '+';
  }

  if (number === 63) {
    return '/';
  }

  throw new TypeError('Tried to encode large digit ' + number + ' in base64.');
}
/**
 * A Parse.File is a local representation of a file that is saved to the Parse
 * cloud.
 * @alias Parse.File
 */


var ParseFile =
/*#__PURE__*/
function () {
  /**
   * @param name {String} The file's name. This will be prefixed by a unique
   *     value once the file has finished saving. The file name must begin with
   *     an alphanumeric character, and consist of alphanumeric characters,
   *     periods, spaces, underscores, or dashes.
   * @param data {Array} The data for the file, as either:
   *     1. an Array of byte value Numbers, or
   *     2. an Object like { base64: "..." } with a base64-encoded String.
   *     3. an Object like { uri: "..." } with a uri String.
   *     4. a File object selected with a file upload control. (3) only works
   *        in Firefox 3.6+, Safari 6.0.2+, Chrome 7+, and IE 10+.
   *        For example:
   * <pre>
   * var fileUploadControl = $("#profilePhotoFileUpload")[0];
   * if (fileUploadControl.files.length > 0) {
   *   var file = fileUploadControl.files[0];
   *   var name = "photo.jpg";
   *   var parseFile = new Parse.File(name, file);
   *   parseFile.save().then(function() {
   *     // The file has been saved to Parse.
   *   }, function(error) {
   *     // The file either could not be read, or could not be saved to Parse.
   *   });
   * }</pre>
   * @param type {String} Optional Content-Type header to use for the file. If
   *     this is omitted, the content type will be inferred from the name's
   *     extension.
   */
  function ParseFile(name
  /*: string*/
  , data
  /*:: ?: FileData*/
  , type
  /*:: ?: string*/
  ) {
    (0, _classCallCheck2.default)(this, ParseFile);
    (0, _defineProperty2.default)(this, "_name", void 0);
    (0, _defineProperty2.default)(this, "_url", void 0);
    (0, _defineProperty2.default)(this, "_source", void 0);
    (0, _defineProperty2.default)(this, "_previousSave", void 0);
    (0, _defineProperty2.default)(this, "_data", void 0);
    var specifiedType = type || '';
    this._name = name;

    if (data !== undefined) {
      if ((0, _isArray.default)(data)) {
        this._data = ParseFile.encodeBase64(data);
        this._source = {
          format: 'base64',
          base64: this._data,
          type: specifiedType
        };
      } else if (typeof Blob !== 'undefined' && data instanceof Blob) {
        this._source = {
          format: 'file',
          file: data,
          type: specifiedType
        };
      } else if (data && typeof data.uri === 'string' && data.uri !== undefined) {
        this._source = {
          format: 'uri',
          uri: data.uri,
          type: specifiedType
        };
      } else if (data && typeof data.base64 === 'string') {
        var base64 = data.base64;
        var commaIndex = (0, _indexOf.default)(base64).call(base64, ',');

        if (commaIndex !== -1) {
          var matches = dataUriRegexp.exec((0, _slice.default)(base64).call(base64, 0, commaIndex + 1)); // if data URI with type and charset, there will be 4 matches.

          this._data = (0, _slice.default)(base64).call(base64, commaIndex + 1);
          this._source = {
            format: 'base64',
            base64: this._data,
            type: matches[1]
          };
        } else {
          this._data = base64;
          this._source = {
            format: 'base64',
            base64: base64,
            type: specifiedType
          };
        }
      } else {
        throw new TypeError('Cannot create a Parse.File with that data.');
      }
    }
  }
  /**
   * Return the data for the file, downloading it if not already present.
   * Data is present if initialized with Byte Array, Base64 or Saved with Uri.
   * Data is cleared if saved with File object selected with a file upload control
   *
   * @return {Promise} Promise that is resolve with base64 data
   */


  (0, _createClass2.default)(ParseFile, [{
    key: "getData",
    value: function () {
      var _getData = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee() {
        var controller, result;
        return _regenerator.default.wrap(function (_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!this._data) {
                  _context.next = 2;
                  break;
                }

                return _context.abrupt("return", this._data);

              case 2:
                if (this._url) {
                  _context.next = 4;
                  break;
                }

                throw new Error('Cannot retrieve data for unsaved ParseFile.');

              case 4:
                controller = _CoreManager.default.getFileController();
                _context.next = 7;
                return controller.download(this._url);

              case 7:
                result = _context.sent;
                this._data = result.base64;
                return _context.abrupt("return", this._data);

              case 10:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      return function () {
        return _getData.apply(this, arguments);
      };
    }()
    /**
     * Gets the name of the file. Before save is called, this is the filename
     * given by the user. After save is called, that name gets prefixed with a
     * unique identifier.
     * @return {String}
     */

  }, {
    key: "name",
    value: function ()
    /*: string*/
    {
      return this._name;
    }
    /**
     * Gets the url of the file. It is only available after you save the file or
     * after you get the file from a Parse.Object.
     * @param {Object} options An object to specify url options
     * @return {String}
     */

  }, {
    key: "url",
    value: function (options
    /*:: ?: { forceSecure?: boolean }*/
    )
    /*: ?string*/
    {
      options = options || {};

      if (!this._url) {
        return;
      }

      if (options.forceSecure) {
        return this._url.replace(/^http:\/\//i, 'https://');
      } else {
        return this._url;
      }
    }
    /**
     * Saves the file to the Parse cloud.
     * @param {Object} options
     *  * Valid options are:<ul>
     *   <li>useMasterKey: In Cloud Code and Node only, causes the Master Key to
     *     be used for this request.
     *   <li>progress: In Browser only, callback for upload progress
     * </ul>
     * @return {Promise} Promise that is resolved when the save finishes.
     */

  }, {
    key: "save",
    value: function (options
    /*:: ?: FullOptions*/
    ) {
      var _this = this;

      options = options || {};

      var controller = _CoreManager.default.getFileController();

      if (!this._previousSave) {
        if (this._source.format === 'file') {
          this._previousSave = controller.saveFile(this._name, this._source, options).then(function (res) {
            _this._name = res.name;
            _this._url = res.url;
            _this._data = null;
            return _this;
          });
        } else if (this._source.format === 'uri') {
          this._previousSave = controller.download(this._source.uri).then(function (result) {
            var newSource = {
              format: 'base64',
              base64: result.base64,
              type: result.contentType
            };
            _this._data = result.base64;
            return controller.saveBase64(_this._name, newSource, options);
          }).then(function (res) {
            _this._name = res.name;
            _this._url = res.url;
            return _this;
          });
        } else {
          this._previousSave = controller.saveBase64(this._name, this._source, options).then(function (res) {
            _this._name = res.name;
            _this._url = res.url;
            return _this;
          });
        }
      }

      if (this._previousSave) {
        return this._previousSave;
      }
    }
  }, {
    key: "toJSON",
    value: function ()
    /*: { name: ?string, url: ?string }*/
    {
      return {
        __type: 'File',
        name: this._name,
        url: this._url
      };
    }
  }, {
    key: "equals",
    value: function (other
    /*: mixed*/
    )
    /*: boolean*/
    {
      if (this === other) {
        return true;
      } // Unsaved Files are never equal, since they will be saved to different URLs


      return other instanceof ParseFile && this.name() === other.name() && this.url() === other.url() && typeof this.url() !== 'undefined';
    }
  }], [{
    key: "fromJSON",
    value: function (obj)
    /*: ParseFile*/
    {
      if (obj.__type !== 'File') {
        throw new TypeError('JSON object does not represent a ParseFile');
      }

      var file = new ParseFile(obj.name);
      file._url = obj.url;
      return file;
    }
  }, {
    key: "encodeBase64",
    value: function (bytes
    /*: Array<number>*/
    )
    /*: string*/
    {
      var chunks = [];
      chunks.length = Math.ceil(bytes.length / 3);

      for (var i = 0; i < chunks.length; i++) {
        var b1 = bytes[i * 3];
        var b2 = bytes[i * 3 + 1] || 0;
        var b3 = bytes[i * 3 + 2] || 0;
        var has2 = i * 3 + 1 < bytes.length;
        var has3 = i * 3 + 2 < bytes.length;
        chunks[i] = [b64Digit(b1 >> 2 & 0x3F), b64Digit(b1 << 4 & 0x30 | b2 >> 4 & 0x0F), has2 ? b64Digit(b2 << 2 & 0x3C | b3 >> 6 & 0x03) : '=', has3 ? b64Digit(b3 & 0x3F) : '='].join('');
      }

      return chunks.join('');
    }
  }]);
  return ParseFile;
}();

var DefaultController = {
  saveFile: function (name
  /*: string*/
  , source
  /*: FileSource*/
  , options
  /*:: ?: FullOptions*/
  ) {
    if (source.format !== 'file') {
      throw new Error('saveFile can only be used with File-type sources.');
    } // To directly upload a File, we use a REST-style AJAX request


    var headers = {
      'X-Parse-Application-ID': _CoreManager.default.get('APPLICATION_ID'),
      'Content-Type': source.type || (source.file ? source.file.type : null)
    };

    var jsKey = _CoreManager.default.get('JAVASCRIPT_KEY');

    if (jsKey) {
      headers['X-Parse-JavaScript-Key'] = jsKey;
    }

    var url = _CoreManager.default.get('SERVER_URL');

    if (url[url.length - 1] !== '/') {
      url += '/';
    }

    url += 'files/' + name;
    return _CoreManager.default.getRESTController().ajax('POST', url, source.file, headers, options).then(function (res) {
      return res.response;
    });
  },
  saveBase64: function (name
  /*: string*/
  , source
  /*: FileSource*/
  , options
  /*:: ?: FullOptions*/
  ) {
    if (source.format !== 'base64') {
      throw new Error('saveBase64 can only be used with Base64-type sources.');
    }

    var data
    /*: { base64: any; _ContentType?: any }*/
    = {
      base64: source.base64
    };

    if (source.type) {
      data._ContentType = source.type;
    }

    return _CoreManager.default.getRESTController().request('POST', 'files/' + name, data, options);
  },
  download: function (uri) {
    if (XHR) {
      return this.downloadAjax(uri);
    } else {
      return _promise.default.reject('Cannot make a request: No definition of XMLHttpRequest was found.');
    }
  },
  downloadAjax: function (uri) {
    return new _promise.default(function (resolve, reject) {
      var xhr = new XHR();
      xhr.open('GET', uri, true);
      xhr.responseType = 'arraybuffer';

      xhr.onerror = function (e) {
        reject(e);
      };

      xhr.onreadystatechange = function () {
        if (xhr.readyState !== 4) {
          return;
        }

        var bytes = new Uint8Array(this.response);
        resolve({
          base64: ParseFile.encodeBase64(bytes),
          contentType: xhr.getResponseHeader('content-type')
        });
      };

      xhr.send();
    });
  },
  _setXHR: function (xhr
  /*: any*/
  ) {
    XHR = xhr;
  }
};

_CoreManager.default.setFileController(DefaultController);

var _default = ParseFile;
exports.default = _default;
},{"./CoreManager":4,"@babel/runtime-corejs3/core-js-stable/array/is-array":51,"@babel/runtime-corejs3/core-js-stable/instance/index-of":58,"@babel/runtime-corejs3/core-js-stable/instance/slice":61,"@babel/runtime-corejs3/core-js-stable/object/define-property":71,"@babel/runtime-corejs3/core-js-stable/promise":78,"@babel/runtime-corejs3/helpers/asyncToGenerator":102,"@babel/runtime-corejs3/helpers/classCallCheck":103,"@babel/runtime-corejs3/helpers/createClass":105,"@babel/runtime-corejs3/helpers/defineProperty":106,"@babel/runtime-corejs3/helpers/interopRequireDefault":110,"@babel/runtime-corejs3/regenerator":125}],20:[function(_dereq_,module,exports){
"use strict";

var _interopRequireDefault = _dereq_("@babel/runtime-corejs3/helpers/interopRequireDefault");

var _Object$defineProperty = _dereq_("@babel/runtime-corejs3/core-js-stable/object/define-property");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports.default = void 0;

var _typeof2 = _interopRequireDefault(_dereq_("@babel/runtime-corejs3/helpers/typeof"));

var _isArray = _interopRequireDefault(_dereq_("@babel/runtime-corejs3/core-js-stable/array/is-array"));

var _classCallCheck2 = _interopRequireDefault(_dereq_("@babel/runtime-corejs3/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(_dereq_("@babel/runtime-corejs3/helpers/createClass"));

var _defineProperty2 = _interopRequireDefault(_dereq_("@babel/runtime-corejs3/helpers/defineProperty"));
/**
 * Copyright (c) 2015-present, Parse, LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @flow
 */

/**
 * Creates a new GeoPoint with any of the following forms:<br>
 *   <pre>
 *   new GeoPoint(otherGeoPoint)
 *   new GeoPoint(30, 30)
 *   new GeoPoint([30, 30])
 *   new GeoPoint({latitude: 30, longitude: 30})
 *   new GeoPoint()  // defaults to (0, 0)
 *   </pre>
 * <p>Represents a latitude / longitude point that may be associated
 * with a key in a ParseObject or used as a reference point for geo queries.
 * This allows proximity-based queries on the key.</p>
 *
 * <p>Only one key in a class may contain a GeoPoint.</p>
 *
 * <p>Example:<pre>
 *   var point = new Parse.GeoPoint(30.0, -20.0);
 *   var object = new Parse.Object("PlaceObject");
 *   object.set("location", point);
 *   object.save();</pre></p>
 * @alias Parse.GeoPoint
 */

/* global navigator */


var ParseGeoPoint =
/*#__PURE__*/
function () {
  /**
   * @param {(Number[]|Object|Number)} options Either a list of coordinate pairs, an object with `latitude`, `longitude`, or the latitude or the point.
   * @param {Number} longitude The longitude of the GeoPoint
   */
  function ParseGeoPoint(arg1
  /*: Array<number> |
      { latitude: number; longitude: number } |
      number*/
  , arg2
  /*:: ?: number*/
  ) {
    (0, _classCallCheck2.default)(this, ParseGeoPoint);
    (0, _defineProperty2.default)(this, "_latitude", void 0);
    (0, _defineProperty2.default)(this, "_longitude", void 0);

    if ((0, _isArray.default)(arg1)) {
      ParseGeoPoint._validate(arg1[0], arg1[1]);

      this._latitude = arg1[0];
      this._longitude = arg1[1];
    } else if ((0, _typeof2.default)(arg1) === 'object') {
      ParseGeoPoint._validate(arg1.latitude, arg1.longitude);

      this._latitude = arg1.latitude;
      this._longitude = arg1.longitude;
    } else if (arg1 !== undefined && arg2 !== undefined) {
      ParseGeoPoint._validate(arg1, arg2);

      this._latitude = arg1;
      this._longitude = arg2;
    } else {
      this._latitude = 0;
      this._longitude = 0;
    }
  }
  /**
   * North-south portion of the coordinate, in range [-90, 90].
   * Throws an exception if set out of range in a modern browser.
   * @property latitude
   * @type Number
   */


  (0, _createClass2.default)(ParseGeoPoint, [{
    key: "toJSON",

    /**
     * Returns a JSON representation of the GeoPoint, suitable for Parse.
      * @return {Object}
     */
    value: function ()
    /*: { __type: string; latitude: number; longitude: number }*/
    {
      ParseGeoPoint._validate(this._latitude, this._longitude);

      return {
        __type: 'GeoPoint',
        latitude: this._latitude,
        longitude: this._longitude
      };
    }
  }, {
    key: "equals",
    value: function (other
    /*: mixed*/
    )
    /*: boolean*/
    {
      return other instanceof ParseGeoPoint && this.latitude === other.latitude && this.longitude === other.longitude;
    }
    /**
     * Returns the distance from this GeoPoint to another in radians.
      * @param {Parse.GeoPoint} point the other Parse.GeoPoint.
     * @return {Number}
     */

  }, {
    key: "radiansTo",
    value: function (point
    /*: ParseGeoPoint*/
    )
    /*: number*/
    {
      var d2r = Math.PI / 180.0;
      var lat1rad = this.latitude * d2r;
      var long1rad = this.longitude * d2r;
      var lat2rad = point.latitude * d2r;
      var long2rad = point.longitude * d2r;
      var sinDeltaLatDiv2 = Math.sin((lat1rad - lat2rad) / 2);
      var sinDeltaLongDiv2 = Math.sin((long1rad - long2rad) / 2); // Square of half the straight line chord distance between both points.

      var a = sinDeltaLatDiv2 * sinDeltaLatDiv2 + Math.cos(lat1rad) * Math.cos(lat2rad) * sinDeltaLongDiv2 * sinDeltaLongDiv2;
      a = Math.min(1.0, a);
      return 2 * Math.asin(Math.sqrt(a));
    }
    /**
     * Returns the distance from this GeoPoint to another in kilometers.
      * @param {Parse.GeoPoint} point the other Parse.GeoPoint.
     * @return {Number}
     */

  }, {
    key: "kilometersTo",
    value: function (point
    /*: ParseGeoPoint*/
    )
    /*: number*/
    {
      return this.radiansTo(point) * 6371.0;
    }
    /**
     * Returns the distance from this GeoPoint to another in miles.
      * @param {Parse.GeoPoint} point the other Parse.GeoPoint.
     * @return {Number}
     */

  }, {
    key: "milesTo",
    value: function (point
    /*: ParseGeoPoint*/
    )
    /*: number*/
    {
      return this.radiansTo(point) * 3958.8;
    }
    /*
     * Throws an exception if the given lat-long is out of bounds.
     */

  }, {
    key: "latitude",
    get: function ()
    /*: number*/
    {
      return this._latitude;
    },
    set: function (val
    /*: number*/
    ) {
      ParseGeoPoint._validate(val, this.longitude);

      this._latitude = val;
    }
    /**
     * East-west portion of the coordinate, in range [-180, 180].
     * Throws if set out of range in a modern browser.
     * @property longitude
     * @type Number
     */

  }, {
    key: "longitude",
    get: function ()
    /*: number*/
    {
      return this._longitude;
    },
    set: function (val
    /*: number*/
    ) {
      ParseGeoPoint._validate(this.latitude, val);

      this._longitude = val;
    }
  }], [{
    key: "_validate",
    value: function (latitude
    /*: number*/
    , longitude
    /*: number*/
    ) {
      if (isNaN(latitude) || isNaN(longitude) || typeof latitude !== 'number' || typeof longitude !== 'number') {
        throw new TypeError('GeoPoint latitude and longitude must be valid numbers');
      }

      if (latitude < -90.0) {
        throw new TypeError('GeoPoint latitude out of bounds: ' + latitude + ' < -90.0.');
      }

      if (latitude > 90.0) {
        throw new TypeError('GeoPoint latitude out of bounds: ' + latitude + ' > 90.0.');
      }

      if (longitude < -180.0) {
        throw new TypeError('GeoPoint longitude out of bounds: ' + longitude + ' < -180.0.');
      }

      if (longitude > 180.0) {
        throw new TypeError('GeoPoint longitude out of bounds: ' + longitude + ' > 180.0.');
      }
    }
    /**
     * Creates a GeoPoint with the user's current location, if available.
     * Calls options.success with a new GeoPoint instance or calls options.error.
     * @static
     */

  }, {
    key: "current",
    value: function () {
      return navigator.geolocation.getCurrentPosition(function (location) {
        return new ParseGeoPoint(location.coords.latitude, location.coords.longitude);
      });
    }
  }]);
  return ParseGeoPoint;
}();

var _default = ParseGeoPoint;
exports.default = _default;
},{"@babel/runtime-corejs3/core-js-stable/array/is-array":51,"@babel/runtime-corejs3/core-js-stable/object/define-property":71,"@babel/runtime-corejs3/helpers/classCallCheck":103,"@babel/runtime-corejs3/helpers/createClass":105,"@babel/runtime-corejs3/helpers/defineProperty":106,"@babel/runtime-corejs3/helpers/interopRequireDefault":110,"@babel/runtime-corejs3/helpers/typeof":122}],21:[function(_dereq_,module,exports){
"use strict";

var _interopRequireDefault = _dereq_("@babel/runtime-corejs3/helpers/interopRequireDefault");

var _Object$defineProperty = _dereq_("@babel/runtime-corejs3/core-js-stable/object/define-property");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports.default = void 0;

var _typeof2 = _interopRequireDefault(_dereq_("@babel/runtime-corejs3/helpers/typeof"));

var _classCallCheck2 = _interopRequireDefault(_dereq_("@babel/runtime-corejs3/helpers/classCallCheck"));

var _possibleConstructorReturn2 = _interopRequireDefault(_dereq_("@babel/runtime-corejs3/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(_dereq_("@babel/runtime-corejs3/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(_dereq_("@babel/runtime-corejs3/helpers/inherits"));

var _ParseObject2 = _interopRequireDefault(_dereq_("./ParseObject"));
/**
 * Copyright (c) 2015-present, Parse, LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @flow
 */


var Installation =
/*#__PURE__*/
function (_ParseObject) {
  (0, _inherits2.default)(Installation, _ParseObject);

  function Installation(attributes
  /*: ?AttributeMap*/
  ) {
    var _this;

    (0, _classCallCheck2.default)(this, Installation);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(Installation).call(this, '_Installation'));

    if (attributes && (0, _typeof2.default)(attributes) === 'object') {
      if (!_this.set(attributes || {})) {
        throw new Error('Can\'t create an invalid Session');
      }
    }

    return _this;
  }

  return Installation;
}(_ParseObject2.default);

exports.default = Installation;

_ParseObject2.default.registerSubclass('_Installation', Installation);
},{"./ParseObject":23,"@babel/runtime-corejs3/core-js-stable/object/define-property":71,"@babel/runtime-corejs3/helpers/classCallCheck":103,"@babel/runtime-corejs3/helpers/getPrototypeOf":108,"@babel/runtime-corejs3/helpers/inherits":109,"@babel/runtime-corejs3/helpers/interopRequireDefault":110,"@babel/runtime-corejs3/helpers/possibleConstructorReturn":117,"@babel/runtime-corejs3/helpers/typeof":122}],22:[function(_dereq_,module,exports){
"use strict";

var _interopRequireDefault = _dereq_("@babel/runtime-corejs3/helpers/interopRequireDefault");

var _Object$defineProperty = _dereq_("@babel/runtime-corejs3/core-js-stable/object/define-property");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports.default = void 0;

var _indexOf = _interopRequireDefault(_dereq_("@babel/runtime-corejs3/core-js-stable/instance/index-of"));

var _regenerator = _interopRequireDefault(_dereq_("@babel/runtime-corejs3/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(_dereq_("@babel/runtime-corejs3/helpers/asyncToGenerator"));

var _EventEmitter = _interopRequireDefault(_dereq_("./EventEmitter"));

var _LiveQueryClient = _interopRequireDefault(_dereq_("./LiveQueryClient"));

var _CoreManager = _interopRequireDefault(_dereq_("./CoreManager"));
/**
 * Copyright (c) 2015-present, Parse, LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @flow
 */


function getLiveQueryClient()
/*: LiveQueryClient*/
{
  return _CoreManager.default.getLiveQueryController().getDefaultLiveQueryClient();
}
/**
 *
 * We expose three events to help you monitor the status of the WebSocket connection:
 *
 * <p>Open - When we establish the WebSocket connection to the LiveQuery server, you'll get this event.
 *
 * <pre>
 * Parse.LiveQuery.on('open', () => {
 *
 * });</pre></p>
 *
 * <p>Close - When we lose the WebSocket connection to the LiveQuery server, you'll get this event.
 *
 * <pre>
 * Parse.LiveQuery.on('close', () => {
 *
 * });</pre></p>
 *
 * <p>Error - When some network error or LiveQuery server error happens, you'll get this event.
 *
 * <pre>
 * Parse.LiveQuery.on('error', (error) => {
 *
 * });</pre></p>
 *
 * @class Parse.LiveQuery
 * @static
 *
 */


var LiveQuery = new _EventEmitter.default();
/**
 * After open is called, the LiveQuery will try to send a connect request
 * to the LiveQuery server.
 */

LiveQuery.open =
/*#__PURE__*/
(0, _asyncToGenerator2.default)(
/*#__PURE__*/
_regenerator.default.mark(function _callee() {
  var liveQueryClient;
  return _regenerator.default.wrap(function (_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return getLiveQueryClient();

        case 2:
          liveQueryClient = _context.sent;
          return _context.abrupt("return", liveQueryClient.open());

        case 4:
        case "end":
          return _context.stop();
      }
    }
  }, _callee);
}));
/**
 * When you're done using LiveQuery, you can call Parse.LiveQuery.close().
 * This function will close the WebSocket connection to the LiveQuery server,
 * cancel the auto reconnect, and unsubscribe all subscriptions based on it.
 * If you call query.subscribe() after this, we'll create a new WebSocket
 * connection to the LiveQuery server.
 */

LiveQuery.close =
/*#__PURE__*/
(0, _asyncToGenerator2.default)(
/*#__PURE__*/
_regenerator.default.mark(function _callee2() {
  var liveQueryClient;
  return _regenerator.default.wrap(function (_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return getLiveQueryClient();

        case 2:
          liveQueryClient = _context2.sent;
          return _context2.abrupt("return", liveQueryClient.close());

        case 4:
        case "end":
          return _context2.stop();
      }
    }
  }, _callee2);
})); // Register a default onError callback to make sure we do not crash on error

LiveQuery.on('error', function () {});
var _default = LiveQuery;
exports.default = _default;
var defaultLiveQueryClient;
var DefaultLiveQueryController = {
  setDefaultLiveQueryClient: function (liveQueryClient
  /*: LiveQueryClient*/
  ) {
    defaultLiveQueryClient = liveQueryClient;
  },
  getDefaultLiveQueryClient: function () {
    var _getDefaultLiveQueryClient = (0, _asyncToGenerator2.default)(
    /*#__PURE__*/
    _regenerator.default.mark(function _callee3() {
      var currentUser, sessionToken, liveQueryServerURL, serverURL, protocol, host, applicationId, javascriptKey, masterKey;
      return _regenerator.default.wrap(function (_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              if (!defaultLiveQueryClient) {
                _context3.next = 2;
                break;
              }

              return _context3.abrupt("return", defaultLiveQueryClient);

            case 2:
              _context3.next = 4;
              return _CoreManager.default.getUserController().currentUserAsync();

            case 4:
              currentUser = _context3.sent;
              sessionToken = currentUser ? currentUser.getSessionToken() : undefined;
              liveQueryServerURL = _CoreManager.default.get('LIVEQUERY_SERVER_URL');

              if (!(liveQueryServerURL && (0, _indexOf.default)(liveQueryServerURL).call(liveQueryServerURL, 'ws') !== 0)) {
                _context3.next = 9;
                break;
              }

              throw new Error('You need to set a proper Parse LiveQuery server url before using LiveQueryClient');

            case 9:
              // If we can not find Parse.liveQueryServerURL, we try to extract it from Parse.serverURL
              if (!liveQueryServerURL) {
                serverURL = _CoreManager.default.get('SERVER_URL');
                protocol = (0, _indexOf.default)(serverURL).call(serverURL, 'https') === 0 ? 'wss://' : 'ws://';
                host = serverURL.replace(/^https?:\/\//, '');
                liveQueryServerURL = protocol + host;

                _CoreManager.default.set('LIVEQUERY_SERVER_URL', liveQueryServerURL);
              }

              applicationId = _CoreManager.default.get('APPLICATION_ID');
              javascriptKey = _CoreManager.default.get('JAVASCRIPT_KEY');
              masterKey = _CoreManager.default.get('MASTER_KEY');
              defaultLiveQueryClient = new _LiveQueryClient.default({
                applicationId: applicationId,
                serverURL: liveQueryServerURL,
                javascriptKey: javascriptKey,
                masterKey: masterKey,
                sessionToken: sessionToken
              });
              defaultLiveQueryClient.on('error', function (error) {
                LiveQuery.emit('error', error);
              });
              defaultLiveQueryClient.on('open', function () {
                LiveQuery.emit('open');
              });
              defaultLiveQueryClient.on('close', function () {
                LiveQuery.emit('close');
              });
              return _context3.abrupt("return", defaultLiveQueryClient);

            case 18:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    }));

    return function () {
      return _getDefaultLiveQueryClient.apply(this, arguments);
    };
  }(),
  _clearCachedDefaultClient: function () {
    defaultLiveQueryClient = null;
  }
};

_CoreManager.default.setLiveQueryController(DefaultLiveQueryController);
},{"./CoreManager":4,"./EventEmitter":5,"./LiveQueryClient":8,"@babel/runtime-corejs3/core-js-stable/instance/index-of":58,"@babel/runtime-corejs3/core-js-stable/object/define-property":71,"@babel/runtime-corejs3/helpers/asyncToGenerator":102,"@babel/runtime-corejs3/helpers/interopRequireDefault":110,"@babel/runtime-corejs3/regenerator":125}],23:[function(_dereq_,module,exports){
"use strict";

var _interopRequireWildcard = _dereq_("@babel/runtime-corejs3/helpers/interopRequireWildcard");

var _interopRequireDefault = _dereq_("@babel/runtime-corejs3/helpers/interopRequireDefault");

var _Object$defineProperty2 = _dereq_("@babel/runtime-corejs3/core-js-stable/object/define-property");

_Object$defineProperty2(exports, "__esModule", {
  value: true
});

exports.default = void 0;

var _getIterator2 = _interopRequireDefault(_dereq_("@babel/runtime-corejs3/core-js/get-iterator"));

var _map = _interopRequireDefault(_dereq_("@babel/runtime-corejs3/core-js-stable/instance/map"));

var _find = _interopRequireDefault(_dereq_("@babel/runtime-corejs3/core-js-stable/instance/find"));

var _defineProperty2 = _interopRequireDefault(_dereq_("@babel/runtime-corejs3/core-js-stable/object/define-property"));

var _create = _interopRequireDefault(_dereq_("@babel/runtime-corejs3/core-js-stable/object/create"));

var _freeze = _interopRequireDefault(_dereq_("@babel/runtime-corejs3/core-js-stable/object/freeze"));

var _promise = _interopRequireDefault(_dereq_("@babel/runtime-corejs3/core-js-stable/promise"));

var _isArray = _interopRequireDefault(_dereq_("@babel/runtime-corejs3/core-js-stable/array/is-array"));

var _regenerator = _interopRequireDefault(_dereq_("@babel/runtime-corejs3/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(_dereq_("@babel/runtime-corejs3/helpers/asyncToGenerator"));

var _concat = _interopRequireDefault(_dereq_("@babel/runtime-corejs3/core-js-stable/instance/concat"));

var _includes = _interopRequireDefault(_dereq_("@babel/runtime-corejs3/core-js-stable/instance/includes"));

var _stringify = _interopRequireDefault(_dereq_("@babel/runtime-corejs3/core-js-stable/json/stringify"));

var _forEach = _interopRequireDefault(_dereq_("@babel/runtime-corejs3/core-js-stable/instance/for-each"));

var _keys2 = _interopRequireDefault(_dereq_("@babel/runtime-corejs3/core-js-stable/object/keys"));

var _typeof2 = _interopRequireDefault(_dereq_("@babel/runtime-corejs3/helpers/typeof"));

var _classCallCheck2 = _interopRequireDefault(_dereq_("@babel/runtime-corejs3/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(_dereq_("@babel/runtime-corejs3/helpers/createClass"));

var _defineProperty3 = _interopRequireDefault(_dereq_("@babel/runtime-corejs3/helpers/defineProperty"));

var _indexOf = _interopRequireDefault(_dereq_("@babel/runtime-corejs3/core-js-stable/instance/index-of"));

var _CoreManager = _interopRequireDefault(_dereq_("./CoreManager"));

var _canBeSerialized = _interopRequireDefault(_dereq_("./canBeSerialized"));

var _decode = _interopRequireDefault(_dereq_("./decode"));

var _encode = _interopRequireDefault(_dereq_("./encode"));

var _escape2 = _interopRequireDefault(_dereq_("./escape"));

var _ParseACL = _interopRequireDefault(_dereq_("./ParseACL"));

var _parseDate = _interopRequireDefault(_dereq_("./parseDate"));

var _ParseError = _interopRequireDefault(_dereq_("./ParseError"));

var _ParseFile = _interopRequireDefault(_dereq_("./ParseFile"));

var _promiseUtils = _dereq_("./promiseUtils");

var _LocalDatastoreUtils = _dereq_("./LocalDatastoreUtils");

var _ParseOp = _dereq_("./ParseOp");

var _ParseQuery = _interopRequireDefault(_dereq_("./ParseQuery"));

var _ParseRelation = _interopRequireDefault(_dereq_("./ParseRelation"));

var SingleInstanceStateController = _interopRequireWildcard(_dereq_("./SingleInstanceStateController"));

var _unique = _interopRequireDefault(_dereq_("./unique"));

var UniqueInstanceStateController = _interopRequireWildcard(_dereq_("./UniqueInstanceStateController"));

var _unsavedChildren = _interopRequireDefault(_dereq_("./unsavedChildren"));
/**
 * Copyright (c) 2015-present, Parse, LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @flow
 */


var DEFAULT_BATCH_SIZE = 20; // Mapping of class names to constructors, so we can populate objects from the
// server with appropriate subclasses of ParseObject

var classMap = {}; // Global counter for generating unique local Ids

var localCount = 0; // Global counter for generating unique Ids for non-single-instance objects

var objectCount = 0; // On web clients, objects are single-instance: any two objects with the same Id
// will have the same attributes. However, this may be dangerous default
// behavior in a server scenario

var singleInstance = !_CoreManager.default.get('IS_NODE');

if (singleInstance) {
  _CoreManager.default.setObjectStateController(SingleInstanceStateController);
} else {
  _CoreManager.default.setObjectStateController(UniqueInstanceStateController);
}

function getServerUrlPath() {
  var serverUrl = _CoreManager.default.get('SERVER_URL');

  if (serverUrl[serverUrl.length - 1] !== '/') {
    serverUrl += '/';
  }

  var url = serverUrl.replace(/https?:\/\//, '');
  return url.substr((0, _indexOf.default)(url).call(url, '/'));
}
/**
 * Creates a new model with defined attributes.
  *
  * <p>You won't normally call this method directly.  It is recommended that
  * you use a subclass of <code>Parse.Object</code> instead, created by calling
  * <code>extend</code>.</p>
  *
  * <p>However, if you don't want to use a subclass, or aren't sure which
  * subclass is appropriate, you can use this form:<pre>
  *     var object = new Parse.Object("ClassName");
  * </pre>
  * That is basically equivalent to:<pre>
  *     var MyClass = Parse.Object.extend("ClassName");
  *     var object = new MyClass();
  * </pre></p>
  *
 * @alias Parse.Object
 */


var ParseObject =
/*#__PURE__*/
function () {
  /**
   * @param {String} className The class name for the object
   * @param {Object} attributes The initial set of data to store in the object.
   * @param {Object} options The options for this object instance.
   */
  function ParseObject(className
  /*: ?string | { className: string, [attr: string]: mixed }*/
  , attributes
  /*:: ?: { [attr: string]: mixed }*/
  , options
  /*:: ?: { ignoreValidation: boolean }*/
  ) {
    (0, _classCallCheck2.default)(this, ParseObject);
    (0, _defineProperty3.default)(this, "id", void 0);
    (0, _defineProperty3.default)(this, "_localId", void 0);
    (0, _defineProperty3.default)(this, "_objCount", void 0);
    (0, _defineProperty3.default)(this, "className", void 0); // Enable legacy initializers

    if (typeof this.initialize === 'function') {
      this.initialize.apply(this, arguments);
    }

    var toSet = null;
    this._objCount = objectCount++;

    if (typeof className === 'string') {
      this.className = className;

      if (attributes && (0, _typeof2.default)(attributes) === 'object') {
        toSet = attributes;
      }
    } else if (className && (0, _typeof2.default)(className) === 'object') {
      this.className = className.className;
      toSet = {};

      for (var _attr in className) {
        if (_attr !== 'className') {
          toSet[_attr] = className[_attr];
        }
      }

      if (attributes && (0, _typeof2.default)(attributes) === 'object') {
        options = attributes;
      }
    }

    if (toSet && !this.set(toSet, options)) {
      throw new Error('Can\'t create an invalid Parse Object');
    }
  }
  /**
   * The ID of this object, unique within its class.
   * @property id
   * @type String
   */


  (0, _createClass2.default)(ParseObject, [{
    key: "_getId",

    /** Private methods **/

    /**
     * Returns a local or server Id used uniquely identify this object
     */
    value: function ()
    /*: string*/
    {
      if (typeof this.id === 'string') {
        return this.id;
      }

      if (typeof this._localId === 'string') {
        return this._localId;
      }

      var localId = 'local' + String(localCount++);
      this._localId = localId;
      return localId;
    }
    /**
     * Returns a unique identifier used to pull data from the State Controller.
     */

  }, {
    key: "_getStateIdentifier",
    value: function ()
    /*: ParseObject | {id: string, className: string}*/
    {
      if (singleInstance) {
        var id = this.id;

        if (!id) {
          id = this._getId();
        }

        return {
          id: id,
          className: this.className
        };
      } else {
        return this;
      }
    }
  }, {
    key: "_getServerData",
    value: function ()
    /*: AttributeMap*/
    {
      var stateController = _CoreManager.default.getObjectStateController();

      return stateController.getServerData(this._getStateIdentifier());
    }
  }, {
    key: "_clearServerData",
    value: function () {
      var serverData = this._getServerData();

      var unset = {};

      for (var _attr2 in serverData) {
        unset[_attr2] = undefined;
      }

      var stateController = _CoreManager.default.getObjectStateController();

      stateController.setServerData(this._getStateIdentifier(), unset);
    }
  }, {
    key: "_getPendingOps",
    value: function ()
    /*: Array<OpsMap>*/
    {
      var stateController = _CoreManager.default.getObjectStateController();

      return stateController.getPendingOps(this._getStateIdentifier());
    }
    /**
     * @param {Array<string>} [keysToClear] - if specified, only ops matching
     * these fields will be cleared
     */

  }, {
    key: "_clearPendingOps",
    value: function (keysToClear
    /*:: ?: Array<string>*/
    ) {
      var pending = this._getPendingOps();

      var latest = pending[pending.length - 1];
      var keys = keysToClear || (0, _keys2.default)(latest);
      (0, _forEach.default)(keys).call(keys, function (key) {
        delete latest[key];
      });
    }
  }, {
    key: "_getDirtyObjectAttributes",
    value: function ()
    /*: AttributeMap*/
    {
      var attributes = this.attributes;

      var stateController = _CoreManager.default.getObjectStateController();

      var objectCache = stateController.getObjectCache(this._getStateIdentifier());
      var dirty = {};

      for (var _attr3 in attributes) {
        var val = attributes[_attr3];

        if (val && (0, _typeof2.default)(val) === 'object' && !(val instanceof ParseObject) && !(val instanceof _ParseFile.default) && !(val instanceof _ParseRelation.default)) {
          // Due to the way browsers construct maps, the key order will not change
          // unless the object is changed
          try {
            var json = (0, _encode.default)(val, false, true);
            var stringified = (0, _stringify.default)(json);

            if (objectCache[_attr3] !== stringified) {
              dirty[_attr3] = val;
            }
          } catch (e) {
            // Error occurred, possibly by a nested unsaved pointer in a mutable container
            // No matter how it happened, it indicates a change in the attribute
            dirty[_attr3] = val;
          }
        }
      }

      return dirty;
    }
  }, {
    key: "_toFullJSON",
    value: function (seen
    /*:: ?: Array<any>*/
    )
    /*: AttributeMap*/
    {
      var json
      /*: { [key: string]: mixed }*/
      = this.toJSON(seen);
      json.__type = 'Object';
      json.className = this.className;
      return json;
    }
  }, {
    key: "_getSaveJSON",
    value: function ()
    /*: AttributeMap*/
    {
      var pending = this._getPendingOps();

      var dirtyObjects = this._getDirtyObjectAttributes();

      var json = {};

      for (var attr in dirtyObjects) {
        var isDotNotation = false;

        for (var i = 0; i < pending.length; i += 1) {
          for (var field in pending[i]) {
            // Dot notation operations are handled later
            if ((0, _includes.default)(field).call(field, '.')) {
              var fieldName = field.split('.')[0];

              if (fieldName === attr) {
                isDotNotation = true;
                break;
              }
            }
          }
        }

        if (!isDotNotation) {
          json[attr] = new _ParseOp.SetOp(dirtyObjects[attr]).toJSON();
        }
      }

      for (attr in pending[0]) {
        json[attr] = pending[0][attr].toJSON();
      }

      return json;
    }
  }, {
    key: "_getSaveParams",
    value: function ()
    /*: SaveParams*/
    {
      var method = this.id ? 'PUT' : 'POST';

      var body = this._getSaveJSON();

      var path = 'classes/' + this.className;

      if (this.id) {
        path += '/' + this.id;
      } else if (this.className === '_User') {
        path = 'users';
      }

      return {
        method: method,
        body: body,
        path: path
      };
    }
  }, {
    key: "_finishFetch",
    value: function (serverData
    /*: AttributeMap*/
    ) {
      if (!this.id && serverData.objectId) {
        this.id = serverData.objectId;
      }

      var stateController = _CoreManager.default.getObjectStateController();

      stateController.initializeState(this._getStateIdentifier());
      var decoded = {};

      for (var _attr4 in serverData) {
        if (_attr4 === 'ACL') {
          decoded[_attr4] = new _ParseACL.default(serverData[_attr4]);
        } else if (_attr4 !== 'objectId') {
          decoded[_attr4] = (0, _decode.default)(serverData[_attr4]);

          if (decoded[_attr4] instanceof _ParseRelation.default) {
            decoded[_attr4]._ensureParentAndKey(this, _attr4);
          }
        }
      }

      if (decoded.createdAt && typeof decoded.createdAt === 'string') {
        decoded.createdAt = (0, _parseDate.default)(decoded.createdAt);
      }

      if (decoded.updatedAt && typeof decoded.updatedAt === 'string') {
        decoded.updatedAt = (0, _parseDate.default)(decoded.updatedAt);
      }

      if (!decoded.updatedAt && decoded.createdAt) {
        decoded.updatedAt = decoded.createdAt;
      }

      stateController.commitServerChanges(this._getStateIdentifier(), decoded);
    }
  }, {
    key: "_setExisted",
    value: function (existed
    /*: boolean*/
    ) {
      var stateController = _CoreManager.default.getObjectStateController();

      var state = stateController.getState(this._getStateIdentifier());

      if (state) {
        state.existed = existed;
      }
    }
  }, {
    key: "_migrateId",
    value: function (serverId
    /*: string*/
    ) {
      if (this._localId && serverId) {
        if (singleInstance) {
          var stateController = _CoreManager.default.getObjectStateController();

          var oldState = stateController.removeState(this._getStateIdentifier());
          this.id = serverId;
          delete this._localId;

          if (oldState) {
            stateController.initializeState(this._getStateIdentifier(), oldState);
          }
        } else {
          this.id = serverId;
          delete this._localId;
        }
      }
    }
  }, {
    key: "_handleSaveResponse",
    value: function (response
    /*: AttributeMap*/
    , status
    /*: number*/
    ) {
      var changes = {};

      var stateController = _CoreManager.default.getObjectStateController();

      var pending = stateController.popPendingState(this._getStateIdentifier());

      for (var attr in pending) {
        if (pending[attr] instanceof _ParseOp.RelationOp) {
          changes[attr] = pending[attr].applyTo(undefined, this, attr);
        } else if (!(attr in response)) {
          // Only SetOps and UnsetOps should not come back with results
          changes[attr] = pending[attr].applyTo(undefined);
        }
      }

      for (attr in response) {
        if ((attr === 'createdAt' || attr === 'updatedAt') && typeof response[attr] === 'string') {
          changes[attr] = (0, _parseDate.default)(response[attr]);
        } else if (attr === 'ACL') {
          changes[attr] = new _ParseACL.default(response[attr]);
        } else if (attr !== 'objectId') {
          changes[attr] = (0, _decode.default)(response[attr]);

          if (changes[attr] instanceof _ParseOp.UnsetOp) {
            changes[attr] = undefined;
          }
        }
      }

      if (changes.createdAt && !changes.updatedAt) {
        changes.updatedAt = changes.createdAt;
      }

      this._migrateId(response.objectId);

      if (status !== 201) {
        this._setExisted(true);
      }

      stateController.commitServerChanges(this._getStateIdentifier(), changes);
    }
  }, {
    key: "_handleSaveError",
    value: function () {
      var stateController = _CoreManager.default.getObjectStateController();

      stateController.mergeFirstPendingState(this._getStateIdentifier());
    }
    /** Public methods **/

  }, {
    key: "initialize",
    value: function () {} // NOOP

    /**
     * Returns a JSON version of the object suitable for saving to Parse.
     * @return {Object}
     */

  }, {
    key: "toJSON",
    value: function (seen
    /*: Array<any> | void*/
    )
    /*: AttributeMap*/
    {
      var seenEntry = this.id ? this.className + ':' + this.id : this;
      seen = seen || [seenEntry];
      var json = {};
      var attrs = this.attributes;

      for (var _attr5 in attrs) {
        if ((_attr5 === 'createdAt' || _attr5 === 'updatedAt') && attrs[_attr5].toJSON) {
          json[_attr5] = attrs[_attr5].toJSON();
        } else {
          json[_attr5] = (0, _encode.default)(attrs[_attr5], false, false, seen);
        }
      }

      var pending = this._getPendingOps();

      for (var _attr6 in pending[0]) {
        json[_attr6] = pending[0][_attr6].toJSON();
      }

      if (this.id) {
        json.objectId = this.id;
      }

      return json;
    }
    /**
     * Determines whether this ParseObject is equal to another ParseObject
     * @param {Object} other - An other object ot compare
     * @return {Boolean}
     */

  }, {
    key: "equals",
    value: function (other
    /*: mixed*/
    )
    /*: boolean*/
    {
      if (this === other) {
        return true;
      }

      return other instanceof ParseObject && this.className === other.className && this.id === other.id && typeof this.id !== 'undefined';
    }
    /**
     * Returns true if this object has been modified since its last
     * save/refresh.  If an attribute is specified, it returns true only if that
     * particular attribute has been modified since the last save/refresh.
     * @param {String} attr An attribute name (optional).
     * @return {Boolean}
     */

  }, {
    key: "dirty",
    value: function (attr
    /*:: ?: string*/
    )
    /*: boolean*/
    {
      if (!this.id) {
        return true;
      }

      var pendingOps = this._getPendingOps();

      var dirtyObjects = this._getDirtyObjectAttributes();

      if (attr) {
        if (dirtyObjects.hasOwnProperty(attr)) {
          return true;
        }

        for (var i = 0; i < pendingOps.length; i++) {
          if (pendingOps[i].hasOwnProperty(attr)) {
            return true;
          }
        }

        return false;
      }

      if ((0, _keys2.default)(pendingOps[0]).length !== 0) {
        return true;
      }

      if ((0, _keys2.default)(dirtyObjects).length !== 0) {
        return true;
      }

      return false;
    }
    /**
     * Returns an array of keys that have been modified since last save/refresh
     * @return {String[]}
     */

  }, {
    key: "dirtyKeys",
    value: function ()
    /*: Array<string>*/
    {
      var pendingOps = this._getPendingOps();

      var keys = {};

      for (var i = 0; i < pendingOps.length; i++) {
        for (var _attr7 in pendingOps[i]) {
          keys[_attr7] = true;
        }
      }

      var dirtyObjects = this._getDirtyObjectAttributes();

      for (var _attr8 in dirtyObjects) {
        keys[_attr8] = true;
      }

      return (0, _keys2.default)(keys);
    }
    /**
     * Returns true if the object has been fetched.
     * @return {Boolean}
     */

  }, {
    key: "isDataAvailable",
    value: function ()
    /*: boolean*/
    {
      var serverData = this._getServerData();

      return !!(0, _keys2.default)(serverData).length;
    }
    /**
     * Gets a Pointer referencing this Object.
     * @return {Pointer}
     */

  }, {
    key: "toPointer",
    value: function ()
    /*: Pointer*/
    {
      if (!this.id) {
        throw new Error('Cannot create a pointer to an unsaved ParseObject');
      }

      return {
        __type: 'Pointer',
        className: this.className,
        objectId: this.id
      };
    }
    /**
     * Gets the value of an attribute.
     * @param {String} attr The string name of an attribute.
     */

  }, {
    key: "get",
    value: function (attr
    /*: string*/
    )
    /*: mixed*/
    {
      return this.attributes[attr];
    }
    /**
     * Gets a relation on the given class for the attribute.
     * @param String attr The attribute to get the relation for.
     * @return {Parse.Relation}
     */

  }, {
    key: "relation",
    value: function (attr
    /*: string*/
    )
    /*: ParseRelation*/
    {
      var value = this.get(attr);

      if (value) {
        if (!(value instanceof _ParseRelation.default)) {
          throw new Error('Called relation() on non-relation field ' + attr);
        }

        value._ensureParentAndKey(this, attr);

        return value;
      }

      return new _ParseRelation.default(this, attr);
    }
    /**
     * Gets the HTML-escaped value of an attribute.
     * @param {String} attr The string name of an attribute.
     */

  }, {
    key: "escape",
    value: function (attr
    /*: string*/
    )
    /*: string*/
    {
      var val = this.attributes[attr];

      if (val == null) {
        return '';
      }

      if (typeof val !== 'string') {
        if (typeof val.toString !== 'function') {
          return '';
        }

        val = val.toString();
      }

      return (0, _escape2.default)(val);
    }
    /**
     * Returns <code>true</code> if the attribute contains a value that is not
     * null or undefined.
     * @param {String} attr The string name of the attribute.
     * @return {Boolean}
     */

  }, {
    key: "has",
    value: function (attr
    /*: string*/
    )
    /*: boolean*/
    {
      var attributes = this.attributes;

      if (attributes.hasOwnProperty(attr)) {
        return attributes[attr] != null;
      }

      return false;
    }
    /**
     * Sets a hash of model attributes on the object.
     *
     * <p>You can call it with an object containing keys and values, with one
     * key and value, or dot notation.  For example:<pre>
     *   gameTurn.set({
     *     player: player1,
     *     diceRoll: 2
     *   }, {
     *     error: function(gameTurnAgain, error) {
     *       // The set failed validation.
     *     }
     *   });
     *
     *   game.set("currentPlayer", player2, {
     *     error: function(gameTurnAgain, error) {
     *       // The set failed validation.
     *     }
     *   });
     *
     *   game.set("finished", true);</pre></p>
     *
     *   game.set("player.score", 10);</pre></p>
     *
     * @param {String} key The key to set.
     * @param {} value The value to give it.
     * @param {Object} options A set of options for the set.
     *     The only supported option is <code>error</code>.
     * @return {(ParseObject|Boolean)} true if the set succeeded.
     */

  }, {
    key: "set",
    value: function (key
    /*: mixed*/
    , value
    /*: mixed*/
    , options
    /*:: ?: mixed*/
    )
    /*: ParseObject | boolean*/
    {
      var changes = {};
      var newOps = {};

      if (key && (0, _typeof2.default)(key) === 'object') {
        changes = key;
        options = value;
      } else if (typeof key === 'string') {
        changes[key] = value;
      } else {
        return this;
      }

      options = options || {};
      var readonly = [];

      if (typeof this.constructor.readOnlyAttributes === 'function') {
        readonly = (0, _concat.default)(readonly).call(readonly, this.constructor.readOnlyAttributes());
      }

      for (var k in changes) {
        if (k === 'createdAt' || k === 'updatedAt') {
          // This property is read-only, but for legacy reasons we silently
          // ignore it
          continue;
        }

        if ((0, _indexOf.default)(readonly).call(readonly, k) > -1) {
          throw new Error('Cannot modify readonly attribute: ' + k);
        }

        if (options.unset) {
          newOps[k] = new _ParseOp.UnsetOp();
        } else if (changes[k] instanceof _ParseOp.Op) {
          newOps[k] = changes[k];
        } else if (changes[k] && (0, _typeof2.default)(changes[k]) === 'object' && typeof changes[k].__op === 'string') {
          newOps[k] = (0, _ParseOp.opFromJSON)(changes[k]);
        } else if (k === 'objectId' || k === 'id') {
          if (typeof changes[k] === 'string') {
            this.id = changes[k];
          }
        } else if (k === 'ACL' && (0, _typeof2.default)(changes[k]) === 'object' && !(changes[k] instanceof _ParseACL.default)) {
          newOps[k] = new _ParseOp.SetOp(new _ParseACL.default(changes[k]));
        } else if (changes[k] instanceof _ParseRelation.default) {
          var relation = new _ParseRelation.default(this, k);
          relation.targetClassName = changes[k].targetClassName;
          newOps[k] = new _ParseOp.SetOp(relation);
        } else {
          newOps[k] = new _ParseOp.SetOp(changes[k]);
        }
      }

      var currentAttributes = this.attributes; // Only set nested fields if exists

      var serverData = this._getServerData();

      if (typeof key === 'string' && (0, _includes.default)(key).call(key, '.')) {
        var field = key.split('.')[0];

        if (!serverData[field]) {
          return this;
        }
      } // Calculate new values


      var newValues = {};

      for (var _attr9 in newOps) {
        if (newOps[_attr9] instanceof _ParseOp.RelationOp) {
          newValues[_attr9] = newOps[_attr9].applyTo(currentAttributes[_attr9], this, _attr9);
        } else if (!(newOps[_attr9] instanceof _ParseOp.UnsetOp)) {
          newValues[_attr9] = newOps[_attr9].applyTo(currentAttributes[_attr9]);
        }
      } // Validate changes


      if (!options.ignoreValidation) {
        var validation = this.validate(newValues);

        if (validation) {
          if (typeof options.error === 'function') {
            options.error(this, validation);
          }

          return false;
        }
      } // Consolidate Ops


      var pendingOps = this._getPendingOps();

      var last = pendingOps.length - 1;

      var stateController = _CoreManager.default.getObjectStateController();

      for (var _attr10 in newOps) {
        var nextOp = newOps[_attr10].mergeWith(pendingOps[last][_attr10]);

        stateController.setPendingOp(this._getStateIdentifier(), _attr10, nextOp);
      }

      return this;
    }
    /**
     * Remove an attribute from the model. This is a noop if the attribute doesn't
     * exist.
     * @param {String} attr The string name of an attribute.
     * @return {(ParseObject|Boolean)}
     */

  }, {
    key: "unset",
    value: function (attr
    /*: string*/
    , options
    /*:: ?: { [opt: string]: mixed }*/
    )
    /*: ParseObject | boolean*/
    {
      options = options || {};
      options.unset = true;
      return this.set(attr, null, options);
    }
    /**
     * Atomically increments the value of the given attribute the next time the
     * object is saved. If no amount is specified, 1 is used by default.
     *
     * @param attr {String} The key.
     * @param amount {Number} The amount to increment by (optional).
     * @return {(ParseObject|Boolean)}
     */

  }, {
    key: "increment",
    value: function (attr
    /*: string*/
    , amount
    /*:: ?: number*/
    )
    /*: ParseObject | boolean*/
    {
      if (typeof amount === 'undefined') {
        amount = 1;
      }

      if (typeof amount !== 'number') {
        throw new Error('Cannot increment by a non-numeric amount.');
      }

      return this.set(attr, new _ParseOp.IncrementOp(amount));
    }
    /**
     * Atomically add an object to the end of the array associated with a given
     * key.
     * @param attr {String} The key.
     * @param item {} The item to add.
     * @return {(ParseObject|Boolean)}
     */

  }, {
    key: "add",
    value: function (attr
    /*: string*/
    , item
    /*: mixed*/
    )
    /*: ParseObject | boolean*/
    {
      return this.set(attr, new _ParseOp.AddOp([item]));
    }
    /**
     * Atomically add the objects to the end of the array associated with a given
     * key.
     * @param attr {String} The key.
     * @param items {Object[]} The items to add.
     * @return {(ParseObject|Boolean)}
     */

  }, {
    key: "addAll",
    value: function (attr
    /*: string*/
    , items
    /*: Array<mixed>*/
    )
    /*: ParseObject | boolean*/
    {
      return this.set(attr, new _ParseOp.AddOp(items));
    }
    /**
     * Atomically add an object to the array associated with a given key, only
     * if it is not already present in the array. The position of the insert is
     * not guaranteed.
     *
     * @param attr {String} The key.
     * @param item {} The object to add.
     * @return {(ParseObject|Boolean)}
     */

  }, {
    key: "addUnique",
    value: function (attr
    /*: string*/
    , item
    /*: mixed*/
    )
    /*: ParseObject | boolean*/
    {
      return this.set(attr, new _ParseOp.AddUniqueOp([item]));
    }
    /**
     * Atomically add the objects to the array associated with a given key, only
     * if it is not already present in the array. The position of the insert is
     * not guaranteed.
     *
     * @param attr {String} The key.
     * @param items {Object[]} The objects to add.
     * @return {(ParseObject|Boolean)}
     */

  }, {
    key: "addAllUnique",
    value: function (attr
    /*: string*/
    , items
    /*: Array<mixed>*/
    )
    /*: ParseObject | boolean*/
    {
      return this.set(attr, new _ParseOp.AddUniqueOp(items));
    }
    /**
     * Atomically remove all instances of an object from the array associated
     * with a given key.
     *
     * @param attr {String} The key.
     * @param item {} The object to remove.
     * @return {(ParseObject|Boolean)}
     */

  }, {
    key: "remove",
    value: function (attr
    /*: string*/
    , item
    /*: mixed*/
    )
    /*: ParseObject | boolean*/
    {
      return this.set(attr, new _ParseOp.RemoveOp([item]));
    }
    /**
     * Atomically remove all instances of the objects from the array associated
     * with a given key.
     *
     * @param attr {String} The key.
     * @param items {Object[]} The object to remove.
     * @return {(ParseObject|Boolean)}
     */

  }, {
    key: "removeAll",
    value: function (attr
    /*: string*/
    , items
    /*: Array<mixed>*/
    )
    /*: ParseObject | boolean*/
    {
      return this.set(attr, new _ParseOp.RemoveOp(items));
    }
    /**
     * Returns an instance of a subclass of Parse.Op describing what kind of
     * modification has been performed on this field since the last time it was
     * saved. For example, after calling object.increment("x"), calling
     * object.op("x") would return an instance of Parse.Op.Increment.
     *
     * @param attr {String} The key.
     * @returns {Parse.Op} The operation, or undefined if none.
     */

  }, {
    key: "op",
    value: function (attr
    /*: string*/
    )
    /*: ?Op*/
    {
      var pending = this._getPendingOps();

      for (var i = pending.length; i--;) {
        if (pending[i][attr]) {
          return pending[i][attr];
        }
      }
    }
    /**
     * Creates a new model with identical attributes to this one.
     * @return {Parse.Object}
     */

  }, {
    key: "clone",
    value: function clone()
    /*: any*/
    {
      var clone = new this.constructor();

      if (!clone.className) {
        clone.className = this.className;
      }

      var attributes = this.attributes;

      if (typeof this.constructor.readOnlyAttributes === 'function') {
        var readonly = this.constructor.readOnlyAttributes() || []; // Attributes are frozen, so we have to rebuild an object,
        // rather than delete readonly keys

        var copy = {};

        for (var a in attributes) {
          if ((0, _indexOf.default)(readonly).call(readonly, a) < 0) {
            copy[a] = attributes[a];
          }
        }

        attributes = copy;
      }

      if (clone.set) {
        clone.set(attributes);
      }

      return clone;
    }
    /**
     * Creates a new instance of this object. Not to be confused with clone()
     * @return {Parse.Object}
     */

  }, {
    key: "newInstance",
    value: function ()
    /*: any*/
    {
      var clone = new this.constructor();

      if (!clone.className) {
        clone.className = this.className;
      }

      clone.id = this.id;

      if (singleInstance) {
        // Just return an object with the right id
        return clone;
      }

      var stateController = _CoreManager.default.getObjectStateController();

      if (stateController) {
        stateController.duplicateState(this._getStateIdentifier(), clone._getStateIdentifier());
      }

      return clone;
    }
    /**
     * Returns true if this object has never been saved to Parse.
     * @return {Boolean}
     */

  }, {
    key: "isNew",
    value: function ()
    /*: boolean*/
    {
      return !this.id;
    }
    /**
     * Returns true if this object was created by the Parse server when the
     * object might have already been there (e.g. in the case of a Facebook
     * login)
     * @return {Boolean}
     */

  }, {
    key: "existed",
    value: function ()
    /*: boolean*/
    {
      if (!this.id) {
        return false;
      }

      var stateController = _CoreManager.default.getObjectStateController();

      var state = stateController.getState(this._getStateIdentifier());

      if (state) {
        return state.existed;
      }

      return false;
    }
    /**
     * Returns true if this object exists on the Server
     *
     * @param {Object} options
     * Valid options are:<ul>
     *   <li>useMasterKey: In Cloud Code and Node only, causes the Master Key to
     *     be used for this request.
     *   <li>sessionToken: A valid session token, used for making a request on
     *       behalf of a specific user.
     * </ul>
     * @return {Promise<boolean>} A boolean promise that is fulfilled if object exists.
     */

  }, {
    key: "exists",
    value: function () {
      var _exists = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee(options
      /*:: ?: RequestOptions*/
      ) {
        var query;
        return _regenerator.default.wrap(function (_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (this.id) {
                  _context.next = 2;
                  break;
                }

                return _context.abrupt("return", false);

              case 2:
                _context.prev = 2;
                query = new _ParseQuery.default(this.className);
                _context.next = 6;
                return query.get(this.id, options);

              case 6:
                return _context.abrupt("return", true);

              case 9:
                _context.prev = 9;
                _context.t0 = _context["catch"](2);

                if (!(_context.t0.code === _ParseError.default.OBJECT_NOT_FOUND)) {
                  _context.next = 13;
                  break;
                }

                return _context.abrupt("return", false);

              case 13:
                throw _context.t0;

              case 14:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[2, 9]]);
      }));

      return function () {
        return _exists.apply(this, arguments);
      };
    }()
    /**
     * Checks if the model is currently in a valid state.
     * @return {Boolean}
     */

  }, {
    key: "isValid",
    value: function ()
    /*: boolean*/
    {
      return !this.validate(this.attributes);
    }
    /**
     * You should not call this function directly unless you subclass
     * <code>Parse.Object</code>, in which case you can override this method
     * to provide additional validation on <code>set</code> and
     * <code>save</code>.  Your implementation should return
     *
     * @param {Object} attrs The current data to validate.
     * @return {} False if the data is valid.  An error object otherwise.
     * @see Parse.Object#set
     */

  }, {
    key: "validate",
    value: function (attrs
    /*: AttributeMap*/
    )
    /*: ParseError | boolean*/
    {
      if (attrs.hasOwnProperty('ACL') && !(attrs.ACL instanceof _ParseACL.default)) {
        return new _ParseError.default(_ParseError.default.OTHER_CAUSE, 'ACL must be a Parse ACL.');
      }

      for (var _key in attrs) {
        if (!/^[A-Za-z][0-9A-Za-z_.]*$/.test(_key)) {
          return new _ParseError.default(_ParseError.default.INVALID_KEY_NAME);
        }
      }

      return false;
    }
    /**
     * Returns the ACL for this object.
     * @returns {Parse.ACL} An instance of Parse.ACL.
     * @see Parse.Object#get
     */

  }, {
    key: "getACL",
    value: function ()
    /*: ?ParseACL*/
    {
      var acl = this.get('ACL');

      if (acl instanceof _ParseACL.default) {
        return acl;
      }

      return null;
    }
    /**
     * Sets the ACL to be used for this object.
     * @param {Parse.ACL} acl An instance of Parse.ACL.
     * @param {Object} options
     * @return {(ParseObject|Boolean)} Whether the set passed validation.
     * @see Parse.Object#set
     */

  }, {
    key: "setACL",
    value: function (acl
    /*: ParseACL*/
    , options
    /*:: ?: mixed*/
    )
    /*: ParseObject | boolean*/
    {
      return this.set('ACL', acl, options);
    }
    /**
     * Clears any (or specific) changes to this object made since the last call to save()
     * @param {string} [keys] - specify which fields to revert
     */

  }, {
    key: "revert",
    value: function ()
    /*: void*/
    {
      var keysToRevert;

      for (var _len = arguments.length, keys = new Array(_len), _key2 = 0; _key2 < _len; _key2++) {
        keys[_key2] = arguments[_key2];
      }

      if (keys.length) {
        keysToRevert = [];

        for (var _i = 0, _keys = keys; _i < _keys.length; _i++) {
          var _key3 = _keys[_i];

          if (typeof _key3 === "string") {
            keysToRevert.push(_key3);
          } else {
            throw new Error("Parse.Object#revert expects either no, or a list of string, arguments.");
          }
        }
      }

      this._clearPendingOps(keysToRevert);
    }
    /**
     * Clears all attributes on a model
     * @return {(ParseObject | boolean)}
     */

  }, {
    key: "clear",
    value: function ()
    /*: ParseObject | boolean*/
    {
      var attributes = this.attributes;
      var erasable = {};
      var readonly = ['createdAt', 'updatedAt'];

      if (typeof this.constructor.readOnlyAttributes === 'function') {
        readonly = (0, _concat.default)(readonly).call(readonly, this.constructor.readOnlyAttributes());
      }

      for (var _attr11 in attributes) {
        if ((0, _indexOf.default)(readonly).call(readonly, _attr11) < 0) {
          erasable[_attr11] = true;
        }
      }

      return this.set(erasable, {
        unset: true
      });
    }
    /**
     * Fetch the model from the server. If the server's representation of the
     * model differs from its current attributes, they will be overriden.
     *
     * @param {Object} options
     * Valid options are:<ul>
     *   <li>useMasterKey: In Cloud Code and Node only, causes the Master Key to
     *     be used for this request.
     *   <li>sessionToken: A valid session token, used for making a request on
     *       behalf of a specific user.
     *   <li>include: The name(s) of the key(s) to include. Can be a string, an array of strings,
     *       or an array of array of strings.
     * </ul>
     * @return {Promise} A promise that is fulfilled when the fetch
     *     completes.
     */

  }, {
    key: "fetch",
    value: function (options
    /*: RequestOptions*/
    )
    /*: Promise*/
    {
      options = options || {};
      var fetchOptions = {};

      if (options.hasOwnProperty('useMasterKey')) {
        fetchOptions.useMasterKey = options.useMasterKey;
      }

      if (options.hasOwnProperty('sessionToken')) {
        fetchOptions.sessionToken = options.sessionToken;
      }

      if (options.hasOwnProperty('include')) {
        fetchOptions.include = [];

        if ((0, _isArray.default)(options.include)) {
          var _context2;

          (0, _forEach.default)(_context2 = options.include).call(_context2, function (key) {
            if ((0, _isArray.default)(key)) {
              var _context3;

              fetchOptions.include = (0, _concat.default)(_context3 = fetchOptions.include).call(_context3, key);
            } else {
              fetchOptions.include.push(key);
            }
          });
        } else {
          fetchOptions.include.push(options.include);
        }
      }

      var controller = _CoreManager.default.getObjectController();

      return controller.fetch(this, true, fetchOptions);
    }
    /**
     * Fetch the model from the server. If the server's representation of the
     * model differs from its current attributes, they will be overriden.
     *
     * Includes nested Parse.Objects for the provided key. You can use dot
     * notation to specify which fields in the included object are also fetched.
     *
     * @param {String|Array<string|Array<string>>} keys The name(s) of the key(s) to include.
     * @param {Object} options
     * Valid options are:<ul>
     *   <li>useMasterKey: In Cloud Code and Node only, causes the Master Key to
     *     be used for this request.
     *   <li>sessionToken: A valid session token, used for making a request on
     *       behalf of a specific user.
     * </ul>
     * @return {Promise} A promise that is fulfilled when the fetch
     *     completes.
     */

  }, {
    key: "fetchWithInclude",
    value: function (keys
    /*: String|Array<string|Array<string>>*/
    , options
    /*: RequestOptions*/
    )
    /*: Promise*/
    {
      options = options || {};
      options.include = keys;
      return this.fetch(options);
    }
    /**
     * Set a hash of model attributes, and save the model to the server.
     * updatedAt will be updated when the request returns.
     * You can either call it as:<pre>
     *   object.save();</pre>
     * or<pre>
     *   object.save(attrs);</pre>
     * or<pre>
     *   object.save(null, options);</pre>
     * or<pre>
     *   object.save(attrs, options);</pre>
     * or<pre>
     *   object.save(key, value, options);</pre>
     *
     * For example, <pre>
     *   gameTurn.save({
     *     player: "Jake Cutter",
     *     diceRoll: 2
     *   }).then(function(gameTurnAgain) {
     *     // The save was successful.
     *   }, function(error) {
     *     // The save failed.  Error is an instance of Parse.Error.
     *   });</pre>
     *
     * @param {String|Object|null} [attrs]
     * Valid options are:<ul>
     *   <li>`Object` - Key/value pairs to update on the object.</li>
     *   <li>`String` Key - Key of attribute to update (requires arg2 to also be string)</li>
     *   <li>`null` - Passing null for arg1 allows you to save the object with options passed in arg2.</li>
     * </ul>
     *
     * @param {String|Object} [options]
     * <ul>
     *   <li>`String` Value - If arg1 was passed as a key, arg2 is the value that should be set on that key.</li>
     *   <li>`Object` Options - Valid options are:
     *     <ul>
     *       <li>useMasterKey: In Cloud Code and Node only, causes the Master Key to
     *     be used for this request.
     *       <li>sessionToken: A valid session token, used for making a request on
     *       behalf of a specific user.
     *       <li>cascadeSave: If `false`, nested objects will not be saved (default is `true`).
     *     </ul>
     *   </li>
     * </ul>
     *
     * @param {Object} [options]
     * Used to pass option parameters to method if arg1 and arg2 were both passed as strings.
     * Valid options are:
     * <ul>
     *   <li>useMasterKey: In Cloud Code and Node only, causes the Master Key to
     *       be used for this request.
     *   <li>sessionToken: A valid session token, used for making a request on
     *       behalf of a specific user.
     *   <li>cascadeSave: If `false`, nested objects will not be saved (default is `true`).
     * </ul>
     *
     * @return {Promise} A promise that is fulfilled when the save
     *     completes.
     */

  }, {
    key: "save",
    value: function (arg1
    /*: ?string | { [attr: string]: mixed }*/
    , arg2
    /*: SaveOptions | mixed*/
    , arg3
    /*:: ?: SaveOptions*/
    )
    /*: Promise*/
    {
      var _this = this;

      var attrs;
      var options;

      if ((0, _typeof2.default)(arg1) === 'object' || typeof arg1 === 'undefined') {
        attrs = arg1;

        if ((0, _typeof2.default)(arg2) === 'object') {
          options = arg2;
        }
      } else {
        attrs = {};
        attrs[arg1] = arg2;
        options = arg3;
      } // TODO: safely remove me
      // Support save({ success: function() {}, error: function() {} })


      if (!options && attrs) {
        options = {};

        if (typeof attrs.success === 'function') {
          options.success = attrs.success;
          delete attrs.success;
        }

        if (typeof attrs.error === 'function') {
          options.error = attrs.error;
          delete attrs.error;
        }
      }

      if (attrs) {
        var validation = this.validate(attrs);

        if (validation) {
          if (options && typeof options.error === 'function') {
            options.error(this, validation);
          }

          return _promise.default.reject(validation);
        }

        this.set(attrs, options);
      }

      options = options || {};
      var saveOptions = {};

      if (options.hasOwnProperty('useMasterKey')) {
        saveOptions.useMasterKey = !!options.useMasterKey;
      }

      if (options.hasOwnProperty('sessionToken') && typeof options.sessionToken === 'string') {
        saveOptions.sessionToken = options.sessionToken;
      }

      var controller = _CoreManager.default.getObjectController();

      var unsaved = options.cascadeSave !== false ? (0, _unsavedChildren.default)(this) : null;
      return controller.save(unsaved, saveOptions).then(function () {
        return controller.save(_this, saveOptions);
      });
    }
    /**
     * Destroy this model on the server if it was already persisted.
     *
     * @param {Object} options
     * Valid options are:<ul>
     *   <li>useMasterKey: In Cloud Code and Node only, causes the Master Key to
     *     be used for this request.
     *   <li>sessionToken: A valid session token, used for making a request on
     *       behalf of a specific user.
     * </ul>
     * @return {Promise} A promise that is fulfilled when the destroy
     *     completes.
     */

  }, {
    key: "destroy",
    value: function (options
    /*: RequestOptions*/
    )
    /*: Promise*/
    {
      options = options || {};
      var destroyOptions = {};

      if (options.hasOwnProperty('useMasterKey')) {
        destroyOptions.useMasterKey = options.useMasterKey;
      }

      if (options.hasOwnProperty('sessionToken')) {
        destroyOptions.sessionToken = options.sessionToken;
      }

      if (!this.id) {
        return _promise.default.resolve();
      }

      return _CoreManager.default.getObjectController().destroy(this, destroyOptions);
    }
    /**
     * Asynchronously stores the object and every object it points to in the local datastore,
     * recursively, using a default pin name: _default.
     *
     * If those other objects have not been fetched from Parse, they will not be stored.
     * However, if they have changed data, all the changes will be retained.
     *
     * <pre>
     * await object.pin();
     * </pre>
     *
     * To retrieve object:
     * <code>query.fromLocalDatastore()</code> or <code>query.fromPin()</code>
     *
     * @return {Promise} A promise that is fulfilled when the pin completes.
     */

  }, {
    key: "pin",
    value: function ()
    /*: Promise<void>*/
    {
      return ParseObject.pinAllWithName(_LocalDatastoreUtils.DEFAULT_PIN, [this]);
    }
    /**
     * Asynchronously removes the object and every object it points to in the local datastore,
     * recursively, using a default pin name: _default.
     *
     * <pre>
     * await object.unPin();
     * </pre>
     *
     * @return {Promise} A promise that is fulfilled when the unPin completes.
     */

  }, {
    key: "unPin",
    value: function ()
    /*: Promise<void>*/
    {
      return ParseObject.unPinAllWithName(_LocalDatastoreUtils.DEFAULT_PIN, [this]);
    }
    /**
     * Asynchronously returns if the object is pinned
     *
     * <pre>
     * const isPinned = await object.isPinned();
     * </pre>
     *
     * @return {Promise<boolean>} A boolean promise that is fulfilled if object is pinned.
     */

  }, {
    key: "isPinned",
    value: function () {
      var _isPinned = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee2() {
        var localDatastore, objectKey, pin;
        return _regenerator.default.wrap(function (_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                localDatastore = _CoreManager.default.getLocalDatastore();

                if (localDatastore.isEnabled) {
                  _context4.next = 3;
                  break;
                }

                return _context4.abrupt("return", _promise.default.reject('Parse.enableLocalDatastore() must be called first'));

              case 3:
                objectKey = localDatastore.getKeyForObject(this);
                _context4.next = 6;
                return localDatastore.fromPinWithName(objectKey);

              case 6:
                pin = _context4.sent;
                return _context4.abrupt("return", pin.length > 0);

              case 8:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee2, this);
      }));

      return function () {
        return _isPinned.apply(this, arguments);
      };
    }()
    /**
     * Asynchronously stores the objects and every object they point to in the local datastore, recursively.
     *
     * If those other objects have not been fetched from Parse, they will not be stored.
     * However, if they have changed data, all the changes will be retained.
     *
     * <pre>
     * await object.pinWithName(name);
     * </pre>
     *
     * To retrieve object:
     * <code>query.fromLocalDatastore()</code> or <code>query.fromPinWithName(name)</code>
     *
     * @param {String} name Name of Pin.
     * @return {Promise} A promise that is fulfilled when the pin completes.
     */

  }, {
    key: "pinWithName",
    value: function (name
    /*: string*/
    )
    /*: Promise<void>*/
    {
      return ParseObject.pinAllWithName(name, [this]);
    }
    /**
     * Asynchronously removes the object and every object it points to in the local datastore, recursively.
     *
     * <pre>
     * await object.unPinWithName(name);
     * </pre>
     *
     * @param {String} name Name of Pin.
     * @return {Promise} A promise that is fulfilled when the unPin completes.
     */

  }, {
    key: "unPinWithName",
    value: function (name
    /*: string*/
    )
    /*: Promise<void>*/
    {
      return ParseObject.unPinAllWithName(name, [this]);
    }
    /**
     * Asynchronously loads data from the local datastore into this object.
     *
     * <pre>
     * await object.fetchFromLocalDatastore();
     * </pre>
     *
     * You can create an unfetched pointer with <code>Parse.Object.createWithoutData()</code>
     * and then call <code>fetchFromLocalDatastore()</code> on it.
     *
     * @return {Promise} A promise that is fulfilled when the fetch completes.
     */

  }, {
    key: "fetchFromLocalDatastore",
    value: function () {
      var _fetchFromLocalDatastore = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee3() {
        var localDatastore, objectKey, pinned, result;
        return _regenerator.default.wrap(function (_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                localDatastore = _CoreManager.default.getLocalDatastore();

                if (localDatastore.isEnabled) {
                  _context5.next = 3;
                  break;
                }

                throw new Error('Parse.enableLocalDatastore() must be called first');

              case 3:
                objectKey = localDatastore.getKeyForObject(this);
                _context5.next = 6;
                return localDatastore._serializeObject(objectKey);

              case 6:
                pinned = _context5.sent;

                if (pinned) {
                  _context5.next = 9;
                  break;
                }

                throw new Error('Cannot fetch an unsaved ParseObject');

              case 9:
                result = ParseObject.fromJSON(pinned);

                this._finishFetch(result.toJSON());

                return _context5.abrupt("return", this);

              case 12:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee3, this);
      }));

      return function () {
        return _fetchFromLocalDatastore.apply(this, arguments);
      };
    }()
    /** Static methods **/

  }, {
    key: "attributes",

    /** Prototype getters / setters **/
    get: function ()
    /*: AttributeMap*/
    {
      var stateController = _CoreManager.default.getObjectStateController();

      return (0, _freeze.default)(stateController.estimateAttributes(this._getStateIdentifier()));
    }
    /**
     * The first time this object was saved on the server.
     * @property createdAt
     * @type Date
     */

  }, {
    key: "createdAt",
    get: function ()
    /*: ?Date*/
    {
      return this._getServerData().createdAt;
    }
    /**
     * The last time this object was updated on the server.
     * @property updatedAt
     * @type Date
     */

  }, {
    key: "updatedAt",
    get: function ()
    /*: ?Date*/
    {
      return this._getServerData().updatedAt;
    }
  }], [{
    key: "_clearAllState",
    value: function () {
      var stateController = _CoreManager.default.getObjectStateController();

      stateController.clearAllState();
    }
    /**
     * Fetches the given list of Parse.Object.
     * If any error is encountered, stops and calls the error handler.
     *
     * <pre>
     *   Parse.Object.fetchAll([object1, object2, ...])
     *    .then((list) => {
     *      // All the objects were fetched.
     *    }, (error) => {
     *      // An error occurred while fetching one of the objects.
     *    });
     * </pre>
     *
     * @param {Array} list A list of <code>Parse.Object</code>.
     * @param {Object} options
     * Valid options are:<ul>
     *   <li>useMasterKey: In Cloud Code and Node only, causes the Master Key to
     *     be used for this request.
     *   <li>sessionToken: A valid session token, used for making a request on
     *       behalf of a specific user.
     *   <li>include: The name(s) of the key(s) to include. Can be a string, an array of strings,
     *       or an array of array of strings.
     * </ul>
     * @static
     */

  }, {
    key: "fetchAll",
    value: function (list
    /*: Array<ParseObject>*/
    ) {
      var options
      /*: RequestOptions*/
      = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var queryOptions = {};

      if (options.hasOwnProperty('useMasterKey')) {
        queryOptions.useMasterKey = options.useMasterKey;
      }

      if (options.hasOwnProperty('sessionToken')) {
        queryOptions.sessionToken = options.sessionToken;
      }

      if (options.hasOwnProperty('include')) {
        queryOptions.include = ParseObject.handleIncludeOptions(options);
      }

      return _CoreManager.default.getObjectController().fetch(list, true, queryOptions);
    }
    /**
     * Fetches the given list of Parse.Object.
     *
     * Includes nested Parse.Objects for the provided key. You can use dot
     * notation to specify which fields in the included object are also fetched.
     *
     * If any error is encountered, stops and calls the error handler.
     *
     * <pre>
     *   Parse.Object.fetchAllWithInclude([object1, object2, ...], [pointer1, pointer2, ...])
     *    .then((list) => {
     *      // All the objects were fetched.
     *    }, (error) => {
     *      // An error occurred while fetching one of the objects.
     *    });
     * </pre>
     *
     * @param {Array} list A list of <code>Parse.Object</code>.
     * @param {String|Array<string|Array<string>>} keys The name(s) of the key(s) to include.
     * @param {Object} options
     * Valid options are:<ul>
     *   <li>useMasterKey: In Cloud Code and Node only, causes the Master Key to
     *     be used for this request.
     *   <li>sessionToken: A valid session token, used for making a request on
     *       behalf of a specific user.
     * </ul>
     * @static
     */

  }, {
    key: "fetchAllWithInclude",
    value: function (list
    /*: Array<ParseObject>*/
    , keys
    /*: String|Array<string|Array<string>>*/
    , options
    /*: RequestOptions*/
    ) {
      options = options || {};
      options.include = keys;
      return ParseObject.fetchAll(list, options);
    }
    /**
     * Fetches the given list of Parse.Object if needed.
     * If any error is encountered, stops and calls the error handler.
     *
     * Includes nested Parse.Objects for the provided key. You can use dot
     * notation to specify which fields in the included object are also fetched.
     *
     * If any error is encountered, stops and calls the error handler.
     *
     * <pre>
     *   Parse.Object.fetchAllIfNeededWithInclude([object1, object2, ...], [pointer1, pointer2, ...])
     *    .then((list) => {
     *      // All the objects were fetched.
     *    }, (error) => {
     *      // An error occurred while fetching one of the objects.
     *    });
     * </pre>
     *
     * @param {Array} list A list of <code>Parse.Object</code>.
     * @param {String|Array<string|Array<string>>} keys The name(s) of the key(s) to include.
     * @param {Object} options
     * Valid options are:<ul>
     *   <li>useMasterKey: In Cloud Code and Node only, causes the Master Key to
     *     be used for this request.
     *   <li>sessionToken: A valid session token, used for making a request on
     *       behalf of a specific user.
     * </ul>
     * @static
     */

  }, {
    key: "fetchAllIfNeededWithInclude",
    value: function (list
    /*: Array<ParseObject>*/
    , keys
    /*: String|Array<string|Array<string>>*/
    , options
    /*: RequestOptions*/
    ) {
      options = options || {};
      options.include = keys;
      return ParseObject.fetchAllIfNeeded(list, options);
    }
    /**
     * Fetches the given list of Parse.Object if needed.
     * If any error is encountered, stops and calls the error handler.
     *
     * <pre>
     *   Parse.Object.fetchAllIfNeeded([object1, ...])
     *    .then((list) => {
     *      // Objects were fetched and updated.
     *    }, (error) => {
     *      // An error occurred while fetching one of the objects.
     *    });
     * </pre>
     *
     * @param {Array} list A list of <code>Parse.Object</code>.
     * @param {Object} options
     * @static
     */

  }, {
    key: "fetchAllIfNeeded",
    value: function (list
    /*: Array<ParseObject>*/
    , options) {
      options = options || {};
      var queryOptions = {};

      if (options.hasOwnProperty('useMasterKey')) {
        queryOptions.useMasterKey = options.useMasterKey;
      }

      if (options.hasOwnProperty('sessionToken')) {
        queryOptions.sessionToken = options.sessionToken;
      }

      if (options.hasOwnProperty('include')) {
        queryOptions.include = ParseObject.handleIncludeOptions(options);
      }

      return _CoreManager.default.getObjectController().fetch(list, false, queryOptions);
    }
  }, {
    key: "handleIncludeOptions",
    value: function (options) {
      var include = [];

      if ((0, _isArray.default)(options.include)) {
        var _context6;

        (0, _forEach.default)(_context6 = options.include).call(_context6, function (key) {
          if ((0, _isArray.default)(key)) {
            include = (0, _concat.default)(include).call(include, key);
          } else {
            include.push(key);
          }
        });
      } else {
        include.push(options.include);
      }

      return include;
    }
    /**
     * Destroy the given list of models on the server if it was already persisted.
     *
     * <p>Unlike saveAll, if an error occurs while deleting an individual model,
     * this method will continue trying to delete the rest of the models if
     * possible, except in the case of a fatal error like a connection error.
     *
     * <p>In particular, the Parse.Error object returned in the case of error may
     * be one of two types:
     *
     * <ul>
     *   <li>A Parse.Error.AGGREGATE_ERROR. This object's "errors" property is an
     *       array of other Parse.Error objects. Each error object in this array
     *       has an "object" property that references the object that could not be
     *       deleted (for instance, because that object could not be found).</li>
     *   <li>A non-aggregate Parse.Error. This indicates a serious error that
     *       caused the delete operation to be aborted partway through (for
     *       instance, a connection failure in the middle of the delete).</li>
     * </ul>
     *
     * <pre>
     *   Parse.Object.destroyAll([object1, object2, ...])
     *    .then((list) => {
     *      // All the objects were deleted.
     *    }, (error) => {
     *      // An error occurred while deleting one or more of the objects.
     *      // If this is an aggregate error, then we can inspect each error
     *      // object individually to determine the reason why a particular
     *      // object was not deleted.
     *      if (error.code === Parse.Error.AGGREGATE_ERROR) {
     *        for (var i = 0; i < error.errors.length; i++) {
     *          console.log("Couldn't delete " + error.errors[i].object.id +
     *            "due to " + error.errors[i].message);
     *        }
     *      } else {
     *        console.log("Delete aborted because of " + error.message);
     *      }
     *   });
     * </pre>
     *
     * @param {Array} list A list of <code>Parse.Object</code>.
     * @param {Object} options
     * @static
     * Valid options are:<ul>
     *   <li>useMasterKey: In Cloud Code and Node only, causes the Master Key to
     *     be used for this request.
     *   <li>sessionToken: A valid session token, used for making a request on
     *       behalf of a specific user.
     *   <li>batchSize: Number of objects to process per request
     * </ul>
     * @return {Promise} A promise that is fulfilled when the destroyAll
     *     completes.
     */

  }, {
    key: "destroyAll",
    value: function (list
    /*: Array<ParseObject>*/
    ) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var destroyOptions = {};

      if (options.hasOwnProperty('useMasterKey')) {
        destroyOptions.useMasterKey = options.useMasterKey;
      }

      if (options.hasOwnProperty('sessionToken')) {
        destroyOptions.sessionToken = options.sessionToken;
      }

      if (options.hasOwnProperty('batchSize') && typeof options.batchSize === 'number') {
        destroyOptions.batchSize = options.batchSize;
      }

      return _CoreManager.default.getObjectController().destroy(list, destroyOptions);
    }
    /**
     * Saves the given list of Parse.Object.
     * If any error is encountered, stops and calls the error handler.
     *
     * <pre>
     *   Parse.Object.saveAll([object1, object2, ...])
     *    .then((list) => {
     *       // All the objects were saved.
     *    }, (error) => {
     *       // An error occurred while saving one of the objects.
     *    });
     * </pre>
     *
     * @param {Array} list A list of <code>Parse.Object</code>.
     * @param {Object} options
     * @static
     * Valid options are:<ul>
     *   <li>useMasterKey: In Cloud Code and Node only, causes the Master Key to
     *     be used for this request.
     *   <li>sessionToken: A valid session token, used for making a request on
     *       behalf of a specific user.
     *   <li>batchSize: Number of objects to process per request
     * </ul>
     */

  }, {
    key: "saveAll",
    value: function (list
    /*: Array<ParseObject>*/
    ) {
      var options
      /*: RequestOptions*/
      = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var saveOptions = {};

      if (options.hasOwnProperty('useMasterKey')) {
        saveOptions.useMasterKey = options.useMasterKey;
      }

      if (options.hasOwnProperty('sessionToken')) {
        saveOptions.sessionToken = options.sessionToken;
      }

      if (options.hasOwnProperty('batchSize') && typeof options.batchSize === 'number') {
        saveOptions.batchSize = options.batchSize;
      }

      return _CoreManager.default.getObjectController().save(list, saveOptions);
    }
    /**
     * Creates a reference to a subclass of Parse.Object with the given id. This
     * does not exist on Parse.Object, only on subclasses.
     *
     * <p>A shortcut for: <pre>
     *  var Foo = Parse.Object.extend("Foo");
     *  var pointerToFoo = new Foo();
     *  pointerToFoo.id = "myObjectId";
     * </pre>
     *
     * @param {String} id The ID of the object to create a reference to.
     * @static
     * @return {Parse.Object} A Parse.Object reference.
     */

  }, {
    key: "createWithoutData",
    value: function (id
    /*: string*/
    ) {
      var obj = new this();
      obj.id = id;
      return obj;
    }
    /**
     * Creates a new instance of a Parse Object from a JSON representation.
     * @param {Object} json The JSON map of the Object's data
     * @param {boolean} override In single instance mode, all old server data
     *   is overwritten if this is set to true
     * @static
     * @return {Parse.Object} A Parse.Object reference
     */

  }, {
    key: "fromJSON",
    value: function (json
    /*: any*/
    , override
    /*:: ?: boolean*/
    ) {
      if (!json.className) {
        throw new Error('Cannot create an object without a className');
      }

      var constructor = classMap[json.className];
      var o = constructor ? new constructor() : new ParseObject(json.className);
      var otherAttributes = {};

      for (var _attr12 in json) {
        if (_attr12 !== 'className' && _attr12 !== '__type') {
          otherAttributes[_attr12] = json[_attr12];
        }
      }

      if (override) {
        // id needs to be set before clearServerData can work
        if (otherAttributes.objectId) {
          o.id = otherAttributes.objectId;
        }

        var preserved = null;

        if (typeof o._preserveFieldsOnFetch === 'function') {
          preserved = o._preserveFieldsOnFetch();
        }

        o._clearServerData();

        if (preserved) {
          o._finishFetch(preserved);
        }
      }

      o._finishFetch(otherAttributes);

      if (json.objectId) {
        o._setExisted(true);
      }

      return o;
    }
    /**
     * Registers a subclass of Parse.Object with a specific class name.
     * When objects of that class are retrieved from a query, they will be
     * instantiated with this subclass.
     * This is only necessary when using ES6 subclassing.
     * @param {String} className The class name of the subclass
     * @param {Class} constructor The subclass
     */

  }, {
    key: "registerSubclass",
    value: function (className
    /*: string*/
    , constructor
    /*: any*/
    ) {
      if (typeof className !== 'string') {
        throw new TypeError('The first argument must be a valid class name.');
      }

      if (typeof constructor === 'undefined') {
        throw new TypeError('You must supply a subclass constructor.');
      }

      if (typeof constructor !== 'function') {
        throw new TypeError('You must register the subclass constructor. ' + 'Did you attempt to register an instance of the subclass?');
      }

      classMap[className] = constructor;

      if (!constructor.className) {
        constructor.className = className;
      }
    }
    /**
     * Creates a new subclass of Parse.Object for the given Parse class name.
     *
     * <p>Every extension of a Parse class will inherit from the most recent
     * previous extension of that class. When a Parse.Object is automatically
     * created by parsing JSON, it will use the most recent extension of that
     * class.</p>
     *
     * <p>You should call either:<pre>
     *     var MyClass = Parse.Object.extend("MyClass", {
     *         <i>Instance methods</i>,
     *         initialize: function(attrs, options) {
     *             this.someInstanceProperty = [],
     *             <i>Other instance properties</i>
     *         }
     *     }, {
     *         <i>Class properties</i>
     *     });</pre>
     * or, for Backbone compatibility:<pre>
     *     var MyClass = Parse.Object.extend({
     *         className: "MyClass",
     *         <i>Instance methods</i>,
     *         initialize: function(attrs, options) {
     *             this.someInstanceProperty = [],
     *             <i>Other instance properties</i>
     *         }
     *     }, {
     *         <i>Class properties</i>
     *     });</pre></p>
     *
     * @param {String} className The name of the Parse class backing this model.
     * @param {Object} protoProps Instance properties to add to instances of the
     *     class returned from this method.
     * @param {Object} classProps Class properties to add the class returned from
     *     this method.
     * @return {Class} A new subclass of Parse.Object.
     */

  }, {
    key: "extend",
    value: function (className
    /*: any*/
    , protoProps
    /*: any*/
    , classProps
    /*: any*/
    ) {
      if (typeof className !== 'string') {
        if (className && typeof className.className === 'string') {
          return ParseObject.extend(className.className, className, protoProps);
        } else {
          throw new Error('Parse.Object.extend\'s first argument should be the className.');
        }
      }

      var adjustedClassName = className;

      if (adjustedClassName === 'User' && _CoreManager.default.get('PERFORM_USER_REWRITE')) {
        adjustedClassName = '_User';
      }

      var parentProto = ParseObject.prototype;

      if (this.hasOwnProperty('__super__') && this.__super__) {
        parentProto = this.prototype;
      } else if (classMap[adjustedClassName]) {
        parentProto = classMap[adjustedClassName].prototype;
      }

      var ParseObjectSubclass = function (attributes, options) {
        this.className = adjustedClassName;
        this._objCount = objectCount++; // Enable legacy initializers

        if (typeof this.initialize === 'function') {
          this.initialize.apply(this, arguments);
        }

        if (attributes && (0, _typeof2.default)(attributes) === 'object') {
          if (!this.set(attributes || {}, options)) {
            throw new Error('Can\'t create an invalid Parse Object');
          }
        }
      };

      ParseObjectSubclass.className = adjustedClassName;
      ParseObjectSubclass.__super__ = parentProto;
      ParseObjectSubclass.prototype = (0, _create.default)(parentProto, {
        constructor: {
          value: ParseObjectSubclass,
          enumerable: false,
          writable: true,
          configurable: true
        }
      });

      if (protoProps) {
        for (var prop in protoProps) {
          if (prop !== 'className') {
            (0, _defineProperty2.default)(ParseObjectSubclass.prototype, prop, {
              value: protoProps[prop],
              enumerable: false,
              writable: true,
              configurable: true
            });
          }
        }
      }

      if (classProps) {
        for (var _prop in classProps) {
          if (_prop !== 'className') {
            (0, _defineProperty2.default)(ParseObjectSubclass, _prop, {
              value: classProps[_prop],
              enumerable: false,
              writable: true,
              configurable: true
            });
          }
        }
      }

      ParseObjectSubclass.extend = function (name, protoProps, classProps) {
        if (typeof name === 'string') {
          return ParseObject.extend.call(ParseObjectSubclass, name, protoProps, classProps);
        }

        return ParseObject.extend.call(ParseObjectSubclass, adjustedClassName, name, protoProps);
      };

      ParseObjectSubclass.createWithoutData = ParseObject.createWithoutData;
      classMap[adjustedClassName] = ParseObjectSubclass;
      return ParseObjectSubclass;
    }
    /**
     * Enable single instance objects, where any local objects with the same Id
     * share the same attributes, and stay synchronized with each other.
     * This is disabled by default in server environments, since it can lead to
     * security issues.
     * @static
     */

  }, {
    key: "enableSingleInstance",
    value: function () {
      singleInstance = true;

      _CoreManager.default.setObjectStateController(SingleInstanceStateController);
    }
    /**
     * Disable single instance objects, where any local objects with the same Id
     * share the same attributes, and stay synchronized with each other.
     * When disabled, you can have two instances of the same object in memory
     * without them sharing attributes.
     * @static
     */

  }, {
    key: "disableSingleInstance",
    value: function () {
      singleInstance = false;

      _CoreManager.default.setObjectStateController(UniqueInstanceStateController);
    }
    /**
     * Asynchronously stores the objects and every object they point to in the local datastore,
     * recursively, using a default pin name: _default.
     *
     * If those other objects have not been fetched from Parse, they will not be stored.
     * However, if they have changed data, all the changes will be retained.
     *
     * <pre>
     * await Parse.Object.pinAll([...]);
     * </pre>
     *
     * To retrieve object:
     * <code>query.fromLocalDatastore()</code> or <code>query.fromPin()</code>
     *
     * @param {Array} objects A list of <code>Parse.Object</code>.
     * @return {Promise} A promise that is fulfilled when the pin completes.
     * @static
     */

  }, {
    key: "pinAll",
    value: function (objects
    /*: Array<ParseObject>*/
    )
    /*: Promise<void>*/
    {
      var localDatastore = _CoreManager.default.getLocalDatastore();

      if (!localDatastore.isEnabled) {
        return _promise.default.reject('Parse.enableLocalDatastore() must be called first');
      }

      return ParseObject.pinAllWithName(_LocalDatastoreUtils.DEFAULT_PIN, objects);
    }
    /**
     * Asynchronously stores the objects and every object they point to in the local datastore, recursively.
     *
     * If those other objects have not been fetched from Parse, they will not be stored.
     * However, if they have changed data, all the changes will be retained.
     *
     * <pre>
     * await Parse.Object.pinAllWithName(name, [obj1, obj2, ...]);
     * </pre>
     *
     * To retrieve object:
     * <code>query.fromLocalDatastore()</code> or <code>query.fromPinWithName(name)</code>
     *
     * @param {String} name Name of Pin.
     * @param {Array} objects A list of <code>Parse.Object</code>.
     * @return {Promise} A promise that is fulfilled when the pin completes.
     * @static
     */

  }, {
    key: "pinAllWithName",
    value: function (name
    /*: string*/
    , objects
    /*: Array<ParseObject>*/
    )
    /*: Promise<void>*/
    {
      var localDatastore = _CoreManager.default.getLocalDatastore();

      if (!localDatastore.isEnabled) {
        return _promise.default.reject('Parse.enableLocalDatastore() must be called first');
      }

      return localDatastore._handlePinAllWithName(name, objects);
    }
    /**
     * Asynchronously removes the objects and every object they point to in the local datastore,
     * recursively, using a default pin name: _default.
     *
     * <pre>
     * await Parse.Object.unPinAll([...]);
     * </pre>
     *
     * @param {Array} objects A list of <code>Parse.Object</code>.
     * @return {Promise} A promise that is fulfilled when the unPin completes.
     * @static
     */

  }, {
    key: "unPinAll",
    value: function (objects
    /*: Array<ParseObject>*/
    )
    /*: Promise<void>*/
    {
      var localDatastore = _CoreManager.default.getLocalDatastore();

      if (!localDatastore.isEnabled) {
        return _promise.default.reject('Parse.enableLocalDatastore() must be called first');
      }

      return ParseObject.unPinAllWithName(_LocalDatastoreUtils.DEFAULT_PIN, objects);
    }
    /**
     * Asynchronously removes the objects and every object they point to in the local datastore, recursively.
     *
     * <pre>
     * await Parse.Object.unPinAllWithName(name, [obj1, obj2, ...]);
     * </pre>
     *
     * @param {String} name Name of Pin.
     * @param {Array} objects A list of <code>Parse.Object</code>.
     * @return {Promise} A promise that is fulfilled when the unPin completes.
     * @static
     */

  }, {
    key: "unPinAllWithName",
    value: function (name
    /*: string*/
    , objects
    /*: Array<ParseObject>*/
    )
    /*: Promise<void>*/
    {
      var localDatastore = _CoreManager.default.getLocalDatastore();

      if (!localDatastore.isEnabled) {
        return _promise.default.reject('Parse.enableLocalDatastore() must be called first');
      }

      return localDatastore._handleUnPinAllWithName(name, objects);
    }
    /**
     * Asynchronously removes all objects in the local datastore using a default pin name: _default.
     *
     * <pre>
     * await Parse.Object.unPinAllObjects();
     * </pre>
     *
     * @return {Promise} A promise that is fulfilled when the unPin completes.
     * @static
     */

  }, {
    key: "unPinAllObjects",
    value: function ()
    /*: Promise<void>*/
    {
      var localDatastore = _CoreManager.default.getLocalDatastore();

      if (!localDatastore.isEnabled) {
        return _promise.default.reject('Parse.enableLocalDatastore() must be called first');
      }

      return localDatastore.unPinWithName(_LocalDatastoreUtils.DEFAULT_PIN);
    }
    /**
     * Asynchronously removes all objects with the specified pin name.
     * Deletes the pin name also.
     *
     * <pre>
     * await Parse.Object.unPinAllObjectsWithName(name);
     * </pre>
     *
     * @param {String} name Name of Pin.
     * @return {Promise} A promise that is fulfilled when the unPin completes.
     * @static
     */

  }, {
    key: "unPinAllObjectsWithName",
    value: function (name
    /*: string*/
    )
    /*: Promise<void>*/
    {
      var localDatastore = _CoreManager.default.getLocalDatastore();

      if (!localDatastore.isEnabled) {
        return _promise.default.reject('Parse.enableLocalDatastore() must be called first');
      }

      return localDatastore.unPinWithName(_LocalDatastoreUtils.PIN_PREFIX + name);
    }
  }]);
  return ParseObject;
}();

var DefaultController = {
  fetch: function (target
  /*: ParseObject | Array<ParseObject>*/
  , forceFetch
  /*: boolean*/
  , options
  /*: RequestOptions*/
  )
  /*: Promise<Array<void> | ParseObject>*/
  {
    var localDatastore = _CoreManager.default.getLocalDatastore();

    if ((0, _isArray.default)(target)) {
      if (target.length < 1) {
        return _promise.default.resolve([]);
      }

      var objs = [];
      var ids = [];
      var className = null;
      var results = [];
      var error = null;
      (0, _forEach.default)(target).call(target, function (el) {
        if (error) {
          return;
        }

        if (!className) {
          className = el.className;
        }

        if (className !== el.className) {
          error = new _ParseError.default(_ParseError.default.INVALID_CLASS_NAME, 'All objects should be of the same class');
        }

        if (!el.id) {
          error = new _ParseError.default(_ParseError.default.MISSING_OBJECT_ID, 'All objects must have an ID');
        }

        if (forceFetch || !el.isDataAvailable()) {
          ids.push(el.id);
          objs.push(el);
        }

        results.push(el);
      });

      if (error) {
        return _promise.default.reject(error);
      }

      var query = new _ParseQuery.default(className);
      query.containedIn('objectId', ids);

      if (options && options.include) {
        query.include(options.include);
      }

      query._limit = ids.length;
      return (0, _find.default)(query).call(query, options).then(
      /*#__PURE__*/
      function () {
        var _ref = (0, _asyncToGenerator2.default)(
        /*#__PURE__*/
        _regenerator.default.mark(function _callee4(objects) {
          var idMap, i, obj, _i2, _obj, id, _i3, _results, object;

          return _regenerator.default.wrap(function (_context7) {
            while (1) {
              switch (_context7.prev = _context7.next) {
                case 0:
                  idMap = {};
                  (0, _forEach.default)(objects).call(objects, function (o) {
                    idMap[o.id] = o;
                  });
                  i = 0;

                case 3:
                  if (!(i < objs.length)) {
                    _context7.next = 11;
                    break;
                  }

                  obj = objs[i];

                  if (!(!obj || !obj.id || !idMap[obj.id])) {
                    _context7.next = 8;
                    break;
                  }

                  if (!forceFetch) {
                    _context7.next = 8;
                    break;
                  }

                  return _context7.abrupt("return", _promise.default.reject(new _ParseError.default(_ParseError.default.OBJECT_NOT_FOUND, 'All objects must exist on the server.')));

                case 8:
                  i++;
                  _context7.next = 3;
                  break;

                case 11:
                  if (!singleInstance) {
                    // If single instance objects are disabled, we need to replace the
                    for (_i2 = 0; _i2 < results.length; _i2++) {
                      _obj = results[_i2];

                      if (_obj && _obj.id && idMap[_obj.id]) {
                        id = _obj.id;

                        _obj._finishFetch(idMap[id].toJSON());

                        results[_i2] = idMap[id];
                      }
                    }
                  }

                  _i3 = 0, _results = results;

                case 13:
                  if (!(_i3 < _results.length)) {
                    _context7.next = 20;
                    break;
                  }

                  object = _results[_i3];
                  _context7.next = 17;
                  return localDatastore._updateObjectIfPinned(object);

                case 17:
                  _i3++;
                  _context7.next = 13;
                  break;

                case 20:
                  return _context7.abrupt("return", _promise.default.resolve(results));

                case 21:
                case "end":
                  return _context7.stop();
              }
            }
          }, _callee4);
        }));

        return function () {
          return _ref.apply(this, arguments);
        };
      }());
    } else {
      var RESTController = _CoreManager.default.getRESTController();

      var params = {};

      if (options && options.include) {
        params.include = options.include.join();
      }

      return RESTController.request('GET', 'classes/' + target.className + '/' + target._getId(), params, options).then(
      /*#__PURE__*/
      function () {
        var _ref2 = (0, _asyncToGenerator2.default)(
        /*#__PURE__*/
        _regenerator.default.mark(function _callee5(response) {
          return _regenerator.default.wrap(function (_context8) {
            while (1) {
              switch (_context8.prev = _context8.next) {
                case 0:
                  if (target instanceof ParseObject) {
                    target._clearPendingOps();

                    target._clearServerData();

                    target._finishFetch(response);
                  }

                  _context8.next = 3;
                  return localDatastore._updateObjectIfPinned(target);

                case 3:
                  return _context8.abrupt("return", target);

                case 4:
                case "end":
                  return _context8.stop();
              }
            }
          }, _callee5);
        }));

        return function () {
          return _ref2.apply(this, arguments);
        };
      }());
    }
  },
  destroy: function () {
    var _destroy = (0, _asyncToGenerator2.default)(
    /*#__PURE__*/
    _regenerator.default.mark(function _callee8(target
    /*: ParseObject | Array<ParseObject>*/
    , options
    /*: RequestOptions*/
    ) {
      var batchSize, localDatastore, RESTController, batches, deleteCompleted, errors;
      return _regenerator.default.wrap(function (_context11) {
        while (1) {
          switch (_context11.prev = _context11.next) {
            case 0:
              batchSize = options && options.batchSize ? options.batchSize : DEFAULT_BATCH_SIZE;
              localDatastore = _CoreManager.default.getLocalDatastore();
              RESTController = _CoreManager.default.getRESTController();

              if (!(0, _isArray.default)(target)) {
                _context11.next = 15;
                break;
              }

              if (!(target.length < 1)) {
                _context11.next = 6;
                break;
              }

              return _context11.abrupt("return", _promise.default.resolve([]));

            case 6:
              batches = [[]];
              (0, _forEach.default)(target).call(target, function (obj) {
                if (!obj.id) {
                  return;
                }

                batches[batches.length - 1].push(obj);

                if (batches[batches.length - 1].length >= batchSize) {
                  batches.push([]);
                }
              });

              if (batches[batches.length - 1].length === 0) {
                // If the last batch is empty, remove it
                batches.pop();
              }

              deleteCompleted = _promise.default.resolve();
              errors = [];
              (0, _forEach.default)(batches).call(batches, function (batch) {
                deleteCompleted = deleteCompleted.then(function () {
                  return RESTController.request('POST', 'batch', {
                    requests: (0, _map.default)(batch).call(batch, function (obj) {
                      return {
                        method: 'DELETE',
                        path: getServerUrlPath() + 'classes/' + obj.className + '/' + obj._getId(),
                        body: {}
                      };
                    })
                  }, options).then(function (results) {
                    for (var i = 0; i < results.length; i++) {
                      if (results[i] && results[i].hasOwnProperty('error')) {
                        var err = new _ParseError.default(results[i].error.code, results[i].error.error);
                        err.object = batch[i];
                        errors.push(err);
                      }
                    }
                  });
                });
              });
              return _context11.abrupt("return", deleteCompleted.then(
              /*#__PURE__*/
              (0, _asyncToGenerator2.default)(
              /*#__PURE__*/
              _regenerator.default.mark(function _callee6() {
                var aggregate, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, object;

                return _regenerator.default.wrap(function (_context9) {
                  while (1) {
                    switch (_context9.prev = _context9.next) {
                      case 0:
                        if (!errors.length) {
                          _context9.next = 4;
                          break;
                        }

                        aggregate = new _ParseError.default(_ParseError.default.AGGREGATE_ERROR);
                        aggregate.errors = errors;
                        return _context9.abrupt("return", _promise.default.reject(aggregate));

                      case 4:
                        _iteratorNormalCompletion = true;
                        _didIteratorError = false;
                        _iteratorError = undefined;
                        _context9.prev = 7;
                        _iterator = (0, _getIterator2.default)(target);

                      case 9:
                        if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                          _context9.next = 16;
                          break;
                        }

                        object = _step.value;
                        _context9.next = 13;
                        return localDatastore._destroyObjectIfPinned(object);

                      case 13:
                        _iteratorNormalCompletion = true;
                        _context9.next = 9;
                        break;

                      case 16:
                        _context9.next = 22;
                        break;

                      case 18:
                        _context9.prev = 18;
                        _context9.t0 = _context9["catch"](7);
                        _didIteratorError = true;
                        _iteratorError = _context9.t0;

                      case 22:
                        _context9.prev = 22;
                        _context9.prev = 23;

                        if (!_iteratorNormalCompletion && _iterator.return != null) {
                          _iterator.return();
                        }

                      case 25:
                        _context9.prev = 25;

                        if (!_didIteratorError) {
                          _context9.next = 28;
                          break;
                        }

                        throw _iteratorError;

                      case 28:
                        return _context9.finish(25);

                      case 29:
                        return _context9.finish(22);

                      case 30:
                        return _context9.abrupt("return", _promise.default.resolve(target));

                      case 31:
                      case "end":
                        return _context9.stop();
                    }
                  }
                }, _callee6, null, [[7, 18, 22, 30], [23,, 25, 29]]);
              }))));

            case 15:
              if (!(target instanceof ParseObject)) {
                _context11.next = 17;
                break;
              }

              return _context11.abrupt("return", RESTController.request('DELETE', 'classes/' + target.className + '/' + target._getId(), {}, options).then(
              /*#__PURE__*/
              (0, _asyncToGenerator2.default)(
              /*#__PURE__*/
              _regenerator.default.mark(function _callee7() {
                return _regenerator.default.wrap(function (_context10) {
                  while (1) {
                    switch (_context10.prev = _context10.next) {
                      case 0:
                        _context10.next = 2;
                        return localDatastore._destroyObjectIfPinned(target);

                      case 2:
                        return _context10.abrupt("return", _promise.default.resolve(target));

                      case 3:
                      case "end":
                        return _context10.stop();
                    }
                  }
                }, _callee7);
              }))));

            case 17:
              _context11.next = 19;
              return localDatastore._destroyObjectIfPinned(target);

            case 19:
              return _context11.abrupt("return", _promise.default.resolve(target));

            case 20:
            case "end":
              return _context11.stop();
          }
        }
      }, _callee8);
    }));

    return function () {
      return _destroy.apply(this, arguments);
    };
  }(),
  save: function (target
  /*: ParseObject | Array<ParseObject | ParseFile>*/
  , options
  /*: RequestOptions*/
  ) {
    var batchSize = options && options.batchSize ? options.batchSize : DEFAULT_BATCH_SIZE;

    var localDatastore = _CoreManager.default.getLocalDatastore();

    var mapIdForPin = {};

    var RESTController = _CoreManager.default.getRESTController();

    var stateController = _CoreManager.default.getObjectStateController();

    options = options || {};
    options.returnStatus = options.returnStatus || true;

    if ((0, _isArray.default)(target)) {
      if (target.length < 1) {
        return _promise.default.resolve([]);
      }

      var unsaved = (0, _concat.default)(target).call(target);

      for (var i = 0; i < target.length; i++) {
        if (target[i] instanceof ParseObject) {
          unsaved = (0, _concat.default)(unsaved).call(unsaved, (0, _unsavedChildren.default)(target[i], true));
        }
      }

      unsaved = (0, _unique.default)(unsaved);

      var filesSaved = _promise.default.resolve();

      var pending
      /*: Array<ParseObject>*/
      = [];
      (0, _forEach.default)(unsaved).call(unsaved, function (el) {
        if (el instanceof _ParseFile.default) {
          filesSaved = filesSaved.then(function () {
            return el.save();
          });
        } else if (el instanceof ParseObject) {
          pending.push(el);
        }
      });
      return filesSaved.then(function () {
        var objectError = null;
        return (0, _promiseUtils.continueWhile)(function () {
          return pending.length > 0;
        }, function () {
          var batch = [];
          var nextPending = [];
          (0, _forEach.default)(pending).call(pending, function (el) {
            if (batch.length < batchSize && (0, _canBeSerialized.default)(el)) {
              batch.push(el);
            } else {
              nextPending.push(el);
            }
          });
          pending = nextPending;

          if (batch.length < 1) {
            return _promise.default.reject(new _ParseError.default(_ParseError.default.OTHER_CAUSE, 'Tried to save a batch with a cycle.'));
          } // Queue up tasks for each object in the batch.
          // When every task is ready, the API request will execute


          var res, rej;
          var batchReturned = new _promise.default(function (resolve, reject) {
            res = resolve;
            rej = reject;
          });
          batchReturned.resolve = res;
          batchReturned.reject = rej;
          var batchReady = [];
          var batchTasks = [];
          (0, _forEach.default)(batch).call(batch, function (obj, index) {
            var res, rej;
            var ready = new _promise.default(function (resolve, reject) {
              res = resolve;
              rej = reject;
            });
            ready.resolve = res;
            ready.reject = rej;
            batchReady.push(ready);
            stateController.pushPendingState(obj._getStateIdentifier());
            batchTasks.push(stateController.enqueueTask(obj._getStateIdentifier(), function () {
              ready.resolve();
              return batchReturned.then(function (responses) {
                if (responses[index].hasOwnProperty('success')) {
                  var objectId = responses[index].success.objectId;
                  var status = responses[index]._status;
                  delete responses[index]._status;
                  mapIdForPin[objectId] = obj._localId;

                  obj._handleSaveResponse(responses[index].success, status);
                } else {
                  if (!objectError && responses[index].hasOwnProperty('error')) {
                    var serverError = responses[index].error;
                    objectError = new _ParseError.default(serverError.code, serverError.error); // Cancel the rest of the save

                    pending = [];
                  }

                  obj._handleSaveError();
                }
              });
            }));
          });
          (0, _promiseUtils.when)(batchReady).then(function () {
            // Kick off the batch request
            return RESTController.request('POST', 'batch', {
              requests: (0, _map.default)(batch).call(batch, function (obj) {
                var params = obj._getSaveParams();

                params.path = getServerUrlPath() + params.path;
                return params;
              })
            }, options);
          }).then(batchReturned.resolve, function (error) {
            batchReturned.reject(new _ParseError.default(_ParseError.default.INCORRECT_TYPE, error.message));
          });
          return (0, _promiseUtils.when)(batchTasks);
        }).then(
        /*#__PURE__*/
        (0, _asyncToGenerator2.default)(
        /*#__PURE__*/
        _regenerator.default.mark(function _callee9() {
          var _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, object;

          return _regenerator.default.wrap(function (_context12) {
            while (1) {
              switch (_context12.prev = _context12.next) {
                case 0:
                  if (!objectError) {
                    _context12.next = 2;
                    break;
                  }

                  return _context12.abrupt("return", _promise.default.reject(objectError));

                case 2:
                  _iteratorNormalCompletion2 = true;
                  _didIteratorError2 = false;
                  _iteratorError2 = undefined;
                  _context12.prev = 5;
                  _iterator2 = (0, _getIterator2.default)(target);

                case 7:
                  if (_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done) {
                    _context12.next = 16;
                    break;
                  }

                  object = _step2.value;
                  _context12.next = 11;
                  return localDatastore._updateLocalIdForObject(mapIdForPin[object.id], object);

                case 11:
                  _context12.next = 13;
                  return localDatastore._updateObjectIfPinned(object);

                case 13:
                  _iteratorNormalCompletion2 = true;
                  _context12.next = 7;
                  break;

                case 16:
                  _context12.next = 22;
                  break;

                case 18:
                  _context12.prev = 18;
                  _context12.t0 = _context12["catch"](5);
                  _didIteratorError2 = true;
                  _iteratorError2 = _context12.t0;

                case 22:
                  _context12.prev = 22;
                  _context12.prev = 23;

                  if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
                    _iterator2.return();
                  }

                case 25:
                  _context12.prev = 25;

                  if (!_didIteratorError2) {
                    _context12.next = 28;
                    break;
                  }

                  throw _iteratorError2;

                case 28:
                  return _context12.finish(25);

                case 29:
                  return _context12.finish(22);

                case 30:
                  return _context12.abrupt("return", _promise.default.resolve(target));

                case 31:
                case "end":
                  return _context12.stop();
              }
            }
          }, _callee9, null, [[5, 18, 22, 30], [23,, 25, 29]]);
        })));
      });
    } else if (target instanceof ParseObject) {
      // copying target lets Flow guarantee the pointer isn't modified elsewhere
      var localId = target._localId;
      var targetCopy = target;

      var task = function () {
        var params = targetCopy._getSaveParams();

        return RESTController.request(params.method, params.path, params.body, options).then(function (response) {
          var status = response._status;
          delete response._status;

          targetCopy._handleSaveResponse(response, status);
        }, function (error) {
          targetCopy._handleSaveError();

          return _promise.default.reject(error);
        });
      };

      stateController.pushPendingState(target._getStateIdentifier());
      return stateController.enqueueTask(target._getStateIdentifier(), task).then(
      /*#__PURE__*/
      (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee10() {
        return _regenerator.default.wrap(function (_context13) {
          while (1) {
            switch (_context13.prev = _context13.next) {
              case 0:
                _context13.next = 2;
                return localDatastore._updateLocalIdForObject(localId, target);

              case 2:
                _context13.next = 4;
                return localDatastore._updateObjectIfPinned(target);

              case 4:
                return _context13.abrupt("return", target);

              case 5:
              case "end":
                return _context13.stop();
            }
          }
        }, _callee10);
      })), function (error) {
        return _promise.default.reject(error);
      });
    }

    return _promise.default.resolve();
  }
};

_CoreManager.default.setObjectController(DefaultController);

var _default = ParseObject;
exports.default = _default;
},{"./CoreManager":4,"./LocalDatastoreUtils":12,"./ParseACL":16,"./ParseError":18,"./ParseFile":19,"./ParseOp":24,"./ParseQuery":26,"./ParseRelation":27,"./SingleInstanceStateController":34,"./UniqueInstanceStateController":38,"./canBeSerialized":40,"./decode":41,"./encode":42,"./escape":44,"./parseDate":46,"./promiseUtils":47,"./unique":48,"./unsavedChildren":49,"@babel/runtime-corejs3/core-js-stable/array/is-array":51,"@babel/runtime-corejs3/core-js-stable/instance/concat":53,"@babel/runtime-corejs3/core-js-stable/instance/find":55,"@babel/runtime-corejs3/core-js-stable/instance/for-each":56,"@babel/runtime-corejs3/core-js-stable/instance/includes":57,"@babel/runtime-corejs3/core-js-stable/instance/index-of":58,"@babel/runtime-corejs3/core-js-stable/instance/map":60,"@babel/runtime-corejs3/core-js-stable/json/stringify":66,"@babel/runtime-corejs3/core-js-stable/object/create":69,"@babel/runtime-corejs3/core-js-stable/object/define-property":71,"@babel/runtime-corejs3/core-js-stable/object/freeze":72,"@babel/runtime-corejs3/core-js-stable/object/keys":76,"@babel/runtime-corejs3/core-js-stable/promise":78,"@babel/runtime-corejs3/core-js/get-iterator":84,"@babel/runtime-corejs3/helpers/asyncToGenerator":102,"@babel/runtime-corejs3/helpers/classCallCheck":103,"@babel/runtime-corejs3/helpers/createClass":105,"@babel/runtime-corejs3/helpers/defineProperty":106,"@babel/runtime-corejs3/helpers/interopRequireDefault":110,"@babel/runtime-corejs3/helpers/interopRequireWildcard":111,"@babel/runtime-corejs3/helpers/typeof":122,"@babel/runtime-corejs3/regenerator":125}],24:[function(_dereq_,module,exports){
"use strict";

var _interopRequireDefault = _dereq_("@babel/runtime-corejs3/helpers/interopRequireDefault");

var _Object$defineProperty = _dereq_("@babel/runtime-corejs3/core-js-stable/object/define-property");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports.opFromJSON = opFromJSON;
exports.RelationOp = exports.RemoveOp = exports.AddUniqueOp = exports.AddOp = exports.IncrementOp = exports.UnsetOp = exports.SetOp = exports.Op = void 0;

var _map = _interopRequireDefault(_dereq_("@babel/runtime-corejs3/core-js-stable/instance/map"));

var _splice = _interopRequireDefault(_dereq_("@babel/runtime-corejs3/core-js-stable/instance/splice"));

var _indexOf = _interopRequireDefault(_dereq_("@babel/runtime-corejs3/core-js-stable/instance/index-of"));

var _forEach = _interopRequireDefault(_dereq_("@babel/runtime-corejs3/core-js-stable/instance/for-each"));

var _possibleConstructorReturn2 = _interopRequireDefault(_dereq_("@babel/runtime-corejs3/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(_dereq_("@babel/runtime-corejs3/helpers/getPrototypeOf"));

var _assertThisInitialized2 = _interopRequireDefault(_dereq_("@babel/runtime-corejs3/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(_dereq_("@babel/runtime-corejs3/helpers/inherits"));

var _defineProperty2 = _interopRequireDefault(_dereq_("@babel/runtime-corejs3/helpers/defineProperty"));

var _classCallCheck2 = _interopRequireDefault(_dereq_("@babel/runtime-corejs3/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(_dereq_("@babel/runtime-corejs3/helpers/createClass"));

var _concat = _interopRequireDefault(_dereq_("@babel/runtime-corejs3/core-js-stable/instance/concat"));

var _isArray = _interopRequireDefault(_dereq_("@babel/runtime-corejs3/core-js-stable/array/is-array"));

var _arrayContainsObject = _interopRequireDefault(_dereq_("./arrayContainsObject"));

var _decode = _interopRequireDefault(_dereq_("./decode"));

var _encode = _interopRequireDefault(_dereq_("./encode"));

var _ParseObject = _interopRequireDefault(_dereq_("./ParseObject"));

var _ParseRelation = _interopRequireDefault(_dereq_("./ParseRelation"));

var _unique = _interopRequireDefault(_dereq_("./unique"));
/**
 * Copyright (c) 2015-present, Parse, LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @flow
 */


function opFromJSON(json
/*: { [key: string]: any }*/
)
/*: ?Op*/
{
  if (!json || !json.__op) {
    return null;
  }

  switch (json.__op) {
    case 'Delete':
      return new UnsetOp();

    case 'Increment':
      return new IncrementOp(json.amount);

    case 'Add':
      return new AddOp((0, _decode.default)(json.objects));

    case 'AddUnique':
      return new AddUniqueOp((0, _decode.default)(json.objects));

    case 'Remove':
      return new RemoveOp((0, _decode.default)(json.objects));

    case 'AddRelation':
      {
        var toAdd = (0, _decode.default)(json.objects);

        if (!(0, _isArray.default)(toAdd)) {
          return new RelationOp([], []);
        }

        return new RelationOp(toAdd, []);
      }

    case 'RemoveRelation':
      {
        var toRemove = (0, _decode.default)(json.objects);

        if (!(0, _isArray.default)(toRemove)) {
          return new RelationOp([], []);
        }

        return new RelationOp([], toRemove);
      }

    case 'Batch':
      {
        var _toAdd = [];
        var _toRemove = [];

        for (var i = 0; i < json.ops.length; i++) {
          if (json.ops[i].__op === 'AddRelation') {
            _toAdd = (0, _concat.default)(_toAdd).call(_toAdd, (0, _decode.default)(json.ops[i].objects));
          } else if (json.ops[i].__op === 'RemoveRelation') {
            _toRemove = (0, _concat.default)(_toRemove).call(_toRemove, (0, _decode.default)(json.ops[i].objects));
          }
        }

        return new RelationOp(_toAdd, _toRemove);
      }
  }

  return null;
}

var Op =
/*#__PURE__*/
function () {
  function Op() {
    (0, _classCallCheck2.default)(this, Op);
  }

  (0, _createClass2.default)(Op, [{
    key: "applyTo",
    // Empty parent class
    value: function ()
    /*: mixed*/

    /*: mixed*/
    {}
    /* eslint-disable-line no-unused-vars */

  }, {
    key: "mergeWith",
    value: function ()
    /*: Op*/

    /*: ?Op*/
    {}
    /* eslint-disable-line no-unused-vars */

  }, {
    key: "toJSON",
    value: function ()
    /*: mixed*/
    {}
  }]);
  return Op;
}();

exports.Op = Op;

var SetOp =
/*#__PURE__*/
function (_Op) {
  (0, _inherits2.default)(SetOp, _Op);

  function SetOp(value
  /*: mixed*/
  ) {
    var _this;

    (0, _classCallCheck2.default)(this, SetOp);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(SetOp).call(this));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "_value", void 0);
    _this._value = value;
    return _this;
  }

  (0, _createClass2.default)(SetOp, [{
    key: "applyTo",
    value: function ()
    /*: mixed*/
    {
      return this._value;
    }
  }, {
    key: "mergeWith",
    value: function ()
    /*: SetOp*/
    {
      return new SetOp(this._value);
    }
  }, {
    key: "toJSON",
    value: function () {
      return (0, _encode.default)(this._value, false, true);
    }
  }]);
  return SetOp;
}(Op);

exports.SetOp = SetOp;

var UnsetOp =
/*#__PURE__*/
function (_Op2) {
  (0, _inherits2.default)(UnsetOp, _Op2);

  function UnsetOp() {
    (0, _classCallCheck2.default)(this, UnsetOp);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(UnsetOp).apply(this, arguments));
  }

  (0, _createClass2.default)(UnsetOp, [{
    key: "applyTo",
    value: function () {
      return undefined;
    }
  }, {
    key: "mergeWith",
    value: function ()
    /*: UnsetOp*/
    {
      return new UnsetOp();
    }
  }, {
    key: "toJSON",
    value: function ()
    /*: { __op: string }*/
    {
      return {
        __op: 'Delete'
      };
    }
  }]);
  return UnsetOp;
}(Op);

exports.UnsetOp = UnsetOp;

var IncrementOp =
/*#__PURE__*/
function (_Op3) {
  (0, _inherits2.default)(IncrementOp, _Op3);

  function IncrementOp(amount
  /*: number*/
  ) {
    var _this2;

    (0, _classCallCheck2.default)(this, IncrementOp);
    _this2 = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(IncrementOp).call(this));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this2), "_amount", void 0);

    if (typeof amount !== 'number') {
      throw new TypeError('Increment Op must be initialized with a numeric amount.');
    }

    _this2._amount = amount;
    return _this2;
  }

  (0, _createClass2.default)(IncrementOp, [{
    key: "applyTo",
    value: function (value
    /*: ?mixed*/
    )
    /*: number*/
    {
      if (typeof value === 'undefined') {
        return this._amount;
      }

      if (typeof value !== 'number') {
        throw new TypeError('Cannot increment a non-numeric value.');
      }

      return this._amount + value;
    }
  }, {
    key: "mergeWith",
    value: function (previous
    /*: Op*/
    )
    /*: Op*/
    {
      if (!previous) {
        return this;
      }

      if (previous instanceof SetOp) {
        return new SetOp(this.applyTo(previous._value));
      }

      if (previous instanceof UnsetOp) {
        return new SetOp(this._amount);
      }

      if (previous instanceof IncrementOp) {
        return new IncrementOp(this.applyTo(previous._amount));
      }

      throw new Error('Cannot merge Increment Op with the previous Op');
    }
  }, {
    key: "toJSON",
    value: function ()
    /*: { __op: string; amount: number }*/
    {
      return {
        __op: 'Increment',
        amount: this._amount
      };
    }
  }]);
  return IncrementOp;
}(Op);

exports.IncrementOp = IncrementOp;

var AddOp =
/*#__PURE__*/
function (_Op4) {
  (0, _inherits2.default)(AddOp, _Op4);

  function AddOp(value
  /*: mixed | Array<mixed>*/
  ) {
    var _this3;

    (0, _classCallCheck2.default)(this, AddOp);
    _this3 = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(AddOp).call(this));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this3), "_value", void 0);
    _this3._value = (0, _isArray.default)(value) ? value : [value];
    return _this3;
  }

  (0, _createClass2.default)(AddOp, [{
    key: "applyTo",
    value: function (value
    /*: mixed*/
    )
    /*: Array<mixed>*/
    {
      if (value == null) {
        return this._value;
      }

      if ((0, _isArray.default)(value)) {
        return (0, _concat.default)(value).call(value, this._value);
      }

      throw new Error('Cannot add elements to a non-array value');
    }
  }, {
    key: "mergeWith",
    value: function (previous
    /*: Op*/
    )
    /*: Op*/
    {
      if (!previous) {
        return this;
      }

      if (previous instanceof SetOp) {
        return new SetOp(this.applyTo(previous._value));
      }

      if (previous instanceof UnsetOp) {
        return new SetOp(this._value);
      }

      if (previous instanceof AddOp) {
        return new AddOp(this.applyTo(previous._value));
      }

      throw new Error('Cannot merge Add Op with the previous Op');
    }
  }, {
    key: "toJSON",
    value: function ()
    /*: { __op: string; objects: mixed }*/
    {
      return {
        __op: 'Add',
        objects: (0, _encode.default)(this._value, false, true)
      };
    }
  }]);
  return AddOp;
}(Op);

exports.AddOp = AddOp;

var AddUniqueOp =
/*#__PURE__*/
function (_Op5) {
  (0, _inherits2.default)(AddUniqueOp, _Op5);

  function AddUniqueOp(value
  /*: mixed | Array<mixed>*/
  ) {
    var _this4;

    (0, _classCallCheck2.default)(this, AddUniqueOp);
    _this4 = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(AddUniqueOp).call(this));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this4), "_value", void 0);
    _this4._value = (0, _unique.default)((0, _isArray.default)(value) ? value : [value]);
    return _this4;
  }

  (0, _createClass2.default)(AddUniqueOp, [{
    key: "applyTo",
    value: function (value
    /*: mixed | Array<mixed>*/
    )
    /*: Array<mixed>*/
    {
      if (value == null) {
        return this._value || [];
      }

      if ((0, _isArray.default)(value)) {
        var _context; // copying value lets Flow guarantee the pointer isn't modified elsewhere


        var valueCopy = value;
        var toAdd = [];
        (0, _forEach.default)(_context = this._value).call(_context, function (v) {
          if (v instanceof _ParseObject.default) {
            if (!(0, _arrayContainsObject.default)(valueCopy, v)) {
              toAdd.push(v);
            }
          } else {
            if ((0, _indexOf.default)(valueCopy).call(valueCopy, v) < 0) {
              toAdd.push(v);
            }
          }
        });
        return (0, _concat.default)(value).call(value, toAdd);
      }

      throw new Error('Cannot add elements to a non-array value');
    }
  }, {
    key: "mergeWith",
    value: function (previous
    /*: Op*/
    )
    /*: Op*/
    {
      if (!previous) {
        return this;
      }

      if (previous instanceof SetOp) {
        return new SetOp(this.applyTo(previous._value));
      }

      if (previous instanceof UnsetOp) {
        return new SetOp(this._value);
      }

      if (previous instanceof AddUniqueOp) {
        return new AddUniqueOp(this.applyTo(previous._value));
      }

      throw new Error('Cannot merge AddUnique Op with the previous Op');
    }
  }, {
    key: "toJSON",
    value: function ()
    /*: { __op: string; objects: mixed }*/
    {
      return {
        __op: 'AddUnique',
        objects: (0, _encode.default)(this._value, false, true)
      };
    }
  }]);
  return AddUniqueOp;
}(Op);

exports.AddUniqueOp = AddUniqueOp;

var RemoveOp =
/*#__PURE__*/
function (_Op6) {
  (0, _inherits2.default)(RemoveOp, _Op6);

  function RemoveOp(value
  /*: mixed | Array<mixed>*/
  ) {
    var _this5;

    (0, _classCallCheck2.default)(this, RemoveOp);
    _this5 = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(RemoveOp).call(this));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this5), "_value", void 0);
    _this5._value = (0, _unique.default)((0, _isArray.default)(value) ? value : [value]);
    return _this5;
  }

  (0, _createClass2.default)(RemoveOp, [{
    key: "applyTo",
    value: function (value
    /*: mixed | Array<mixed>*/
    )
    /*: Array<mixed>*/
    {
      if (value == null) {
        return [];
      }

      if ((0, _isArray.default)(value)) {
        // var i = value.indexOf(this._value);
        var removed = (0, _concat.default)(value).call(value, []);

        for (var i = 0; i < this._value.length; i++) {
          var index = (0, _indexOf.default)(removed).call(removed, this._value[i]);

          while (index > -1) {
            (0, _splice.default)(removed).call(removed, index, 1);
            index = (0, _indexOf.default)(removed).call(removed, this._value[i]);
          }

          if (this._value[i] instanceof _ParseObject.default && this._value[i].id) {
            for (var j = 0; j < removed.length; j++) {
              if (removed[j] instanceof _ParseObject.default && this._value[i].id === removed[j].id) {
                (0, _splice.default)(removed).call(removed, j, 1);
                j--;
              }
            }
          }
        }

        return removed;
      }

      throw new Error('Cannot remove elements from a non-array value');
    }
  }, {
    key: "mergeWith",
    value: function (previous
    /*: Op*/
    )
    /*: Op*/
    {
      if (!previous) {
        return this;
      }

      if (previous instanceof SetOp) {
        return new SetOp(this.applyTo(previous._value));
      }

      if (previous instanceof UnsetOp) {
        return new UnsetOp();
      }

      if (previous instanceof RemoveOp) {
        var _context2;

        var uniques = (0, _concat.default)(_context2 = previous._value).call(_context2, []);

        for (var i = 0; i < this._value.length; i++) {
          if (this._value[i] instanceof _ParseObject.default) {
            if (!(0, _arrayContainsObject.default)(uniques, this._value[i])) {
              uniques.push(this._value[i]);
            }
          } else {
            if ((0, _indexOf.default)(uniques).call(uniques, this._value[i]) < 0) {
              uniques.push(this._value[i]);
            }
          }
        }

        return new RemoveOp(uniques);
      }

      throw new Error('Cannot merge Remove Op with the previous Op');
    }
  }, {
    key: "toJSON",
    value: function ()
    /*: { __op: string; objects: mixed }*/
    {
      return {
        __op: 'Remove',
        objects: (0, _encode.default)(this._value, false, true)
      };
    }
  }]);
  return RemoveOp;
}(Op);

exports.RemoveOp = RemoveOp;

var RelationOp =
/*#__PURE__*/
function (_Op7) {
  (0, _inherits2.default)(RelationOp, _Op7);

  function RelationOp(adds
  /*: Array<ParseObject | string>*/
  , removes
  /*: Array<ParseObject | string>*/
  ) {
    var _this6;

    (0, _classCallCheck2.default)(this, RelationOp);
    _this6 = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(RelationOp).call(this));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this6), "_targetClassName", void 0);
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this6), "relationsToAdd", void 0);
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this6), "relationsToRemove", void 0);
    _this6._targetClassName = null;

    if ((0, _isArray.default)(adds)) {
      _this6.relationsToAdd = (0, _unique.default)((0, _map.default)(adds).call(adds, _this6._extractId, (0, _assertThisInitialized2.default)(_this6)));
    }

    if ((0, _isArray.default)(removes)) {
      _this6.relationsToRemove = (0, _unique.default)((0, _map.default)(removes).call(removes, _this6._extractId, (0, _assertThisInitialized2.default)(_this6)));
    }

    return _this6;
  }

  (0, _createClass2.default)(RelationOp, [{
    key: "_extractId",
    value: function (obj
    /*: string | ParseObject*/
    )
    /*: string*/
    {
      if (typeof obj === 'string') {
        return obj;
      }

      if (!obj.id) {
        throw new Error('You cannot add or remove an unsaved Parse Object from a relation');
      }

      if (!this._targetClassName) {
        this._targetClassName = obj.className;
      }

      if (this._targetClassName !== obj.className) {
        throw new Error('Tried to create a Relation with 2 different object types: ' + this._targetClassName + ' and ' + obj.className + '.');
      }

      return obj.id;
    }
  }, {
    key: "applyTo",
    value: function (value
    /*: mixed*/
    , object
    /*:: ?: { className: string, id: ?string }*/
    , key
    /*:: ?: string*/
    )
    /*: ?ParseRelation*/
    {
      if (!value) {
        var _context3;

        if (!object || !key) {
          throw new Error('Cannot apply a RelationOp without either a previous value, or an object and a key');
        }

        var parent = new _ParseObject.default(object.className);

        if (object.id && (0, _indexOf.default)(_context3 = object.id).call(_context3, 'local') === 0) {
          parent._localId = object.id;
        } else if (object.id) {
          parent.id = object.id;
        }

        var relation = new _ParseRelation.default(parent, key);
        relation.targetClassName = this._targetClassName;
        return relation;
      }

      if (value instanceof _ParseRelation.default) {
        if (this._targetClassName) {
          if (value.targetClassName) {
            if (this._targetClassName !== value.targetClassName) {
              throw new Error('Related object must be a ' + value.targetClassName + ', but a ' + this._targetClassName + ' was passed in.');
            }
          } else {
            value.targetClassName = this._targetClassName;
          }
        }

        return value;
      } else {
        throw new Error('Relation cannot be applied to a non-relation field');
      }
    }
  }, {
    key: "mergeWith",
    value: function (previous
    /*: Op*/
    )
    /*: Op*/
    {
      if (!previous) {
        return this;
      } else if (previous instanceof UnsetOp) {
        throw new Error('You cannot modify a relation after deleting it.');
      } else if (previous instanceof SetOp && previous._value instanceof _ParseRelation.default) {
        return this;
      } else if (previous instanceof RelationOp) {
        var _context4, _context5, _context6, _context7, _context8, _context9;

        if (previous._targetClassName && previous._targetClassName !== this._targetClassName) {
          throw new Error('Related object must be of class ' + previous._targetClassName + ', but ' + (this._targetClassName || 'null') + ' was passed in.');
        }

        var newAdd = (0, _concat.default)(_context4 = previous.relationsToAdd).call(_context4, []);
        (0, _forEach.default)(_context5 = this.relationsToRemove).call(_context5, function (r) {
          var index = (0, _indexOf.default)(newAdd).call(newAdd, r);

          if (index > -1) {
            (0, _splice.default)(newAdd).call(newAdd, index, 1);
          }
        });
        (0, _forEach.default)(_context6 = this.relationsToAdd).call(_context6, function (r) {
          var index = (0, _indexOf.default)(newAdd).call(newAdd, r);

          if (index < 0) {
            newAdd.push(r);
          }
        });
        var newRemove = (0, _concat.default)(_context7 = previous.relationsToRemove).call(_context7, []);
        (0, _forEach.default)(_context8 = this.relationsToAdd).call(_context8, function (r) {
          var index = (0, _indexOf.default)(newRemove).call(newRemove, r);

          if (index > -1) {
            (0, _splice.default)(newRemove).call(newRemove, index, 1);
          }
        });
        (0, _forEach.default)(_context9 = this.relationsToRemove).call(_context9, function (r) {
          var index = (0, _indexOf.default)(newRemove).call(newRemove, r);

          if (index < 0) {
            newRemove.push(r);
          }
        });
        var newRelation = new RelationOp(newAdd, newRemove);
        newRelation._targetClassName = this._targetClassName;
        return newRelation;
      }

      throw new Error('Cannot merge Relation Op with the previous Op');
    }
  }, {
    key: "toJSON",
    value: function ()
    /*: { __op?: string; objects?: mixed; ops?: mixed }*/
    {
      var _this7 = this;

      var idToPointer = function (id) {
        return {
          __type: 'Pointer',
          className: _this7._targetClassName,
          objectId: id
        };
      };

      var adds = null;
      var removes = null;
      var pointers = null;

      if (this.relationsToAdd.length > 0) {
        var _context10;

        pointers = (0, _map.default)(_context10 = this.relationsToAdd).call(_context10, idToPointer);
        adds = {
          __op: 'AddRelation',
          objects: pointers
        };
      }

      if (this.relationsToRemove.length > 0) {
        var _context11;

        pointers = (0, _map.default)(_context11 = this.relationsToRemove).call(_context11, idToPointer);
        removes = {
          __op: 'RemoveRelation',
          objects: pointers
        };
      }

      if (adds && removes) {
        return {
          __op: 'Batch',
          ops: [adds, removes]
        };
      }

      return adds || removes || {};
    }
  }]);
  return RelationOp;
}(Op);

exports.RelationOp = RelationOp;
},{"./ParseObject":23,"./ParseRelation":27,"./arrayContainsObject":39,"./decode":41,"./encode":42,"./unique":48,"@babel/runtime-corejs3/core-js-stable/array/is-array":51,"@babel/runtime-corejs3/core-js-stable/instance/concat":53,"@babel/runtime-corejs3/core-js-stable/instance/for-each":56,"@babel/runtime-corejs3/core-js-stable/instance/index-of":58,"@babel/runtime-corejs3/core-js-stable/instance/map":60,"@babel/runtime-corejs3/core-js-stable/instance/splice":63,"@babel/runtime-corejs3/core-js-stable/object/define-property":71,"@babel/runtime-corejs3/helpers/assertThisInitialized":101,"@babel/runtime-corejs3/helpers/classCallCheck":103,"@babel/runtime-corejs3/helpers/createClass":105,"@babel/runtime-corejs3/helpers/defineProperty":106,"@babel/runtime-corejs3/helpers/getPrototypeOf":108,"@babel/runtime-corejs3/helpers/inherits":109,"@babel/runtime-corejs3/helpers/interopRequireDefault":110,"@babel/runtime-corejs3/helpers/possibleConstructorReturn":117}],25:[function(_dereq_,module,exports){
"use strict";

var _interopRequireDefault = _dereq_("@babel/runtime-corejs3/helpers/interopRequireDefault");

var _Object$defineProperty = _dereq_("@babel/runtime-corejs3/core-js-stable/object/define-property");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports.default = void 0;

var _isArray = _interopRequireDefault(_dereq_("@babel/runtime-corejs3/core-js-stable/array/is-array"));

var _classCallCheck2 = _interopRequireDefault(_dereq_("@babel/runtime-corejs3/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(_dereq_("@babel/runtime-corejs3/helpers/createClass"));

var _defineProperty2 = _interopRequireDefault(_dereq_("@babel/runtime-corejs3/helpers/defineProperty"));

var _ParseGeoPoint = _interopRequireDefault(_dereq_("./ParseGeoPoint"));
/**
 * Copyright (c) 2015-present, Parse, LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @flow
 */

/**
 * Creates a new Polygon with any of the following forms:<br>
 *   <pre>
 *   new Polygon([[0,0],[0,1],[1,1],[1,0]])
 *   new Polygon([GeoPoint, GeoPoint, GeoPoint])
 *   </pre>
 *
 * <p>Represents a coordinates that may be associated
 * with a key in a ParseObject or used as a reference point for geo queries.
 * This allows proximity-based queries on the key.</p>
 *
 * <p>Example:<pre>
 *   var polygon = new Parse.Polygon([[0,0],[0,1],[1,1],[1,0]]);
 *   var object = new Parse.Object("PlaceObject");
 *   object.set("area", polygon);
 *   object.save();</pre></p>
 * @alias Parse.Polygon
 */


var ParsePolygon =
/*#__PURE__*/
function () {
  /**
   * @param {(Number[][]|Parse.GeoPoint[])} coordinates An Array of coordinate pairs
   */
  function ParsePolygon(arg1
  /*: Array<Array<number>> | Array<ParseGeoPoint>*/
  ) {
    (0, _classCallCheck2.default)(this, ParsePolygon);
    (0, _defineProperty2.default)(this, "_coordinates", void 0);
    this._coordinates = ParsePolygon._validate(arg1);
  }
  /**
   * Coordinates value for this Polygon.
   * Throws an exception if not valid type.
   * @property coordinates
   * @type Array
   */


  (0, _createClass2.default)(ParsePolygon, [{
    key: "toJSON",

    /**
     * Returns a JSON representation of the Polygon, suitable for Parse.
     * @return {Object}
     */
    value: function ()
    /*: { __type: string; coordinates: Array<Array<number>>;}*/
    {
      ParsePolygon._validate(this._coordinates);

      return {
        __type: 'Polygon',
        coordinates: this._coordinates
      };
    }
    /**
     * Checks if two polygons are equal
     * @param {(Parse.Polygon|Object)} other
     * @returns {Boolean}
     */

  }, {
    key: "equals",
    value: function (other
    /*: mixed*/
    )
    /*: boolean*/
    {
      if (!(other instanceof ParsePolygon) || this.coordinates.length !== other.coordinates.length) {
        return false;
      }

      var isEqual = true;

      for (var i = 1; i < this._coordinates.length; i += 1) {
        if (this._coordinates[i][0] != other.coordinates[i][0] || this._coordinates[i][1] != other.coordinates[i][1]) {
          isEqual = false;
          break;
        }
      }

      return isEqual;
    }
    /**
     *
     * @param {Parse.GeoPoint} point
     * @returns {Boolean} Returns if the point is contained in the polygon
     */

  }, {
    key: "containsPoint",
    value: function (point
    /*: ParseGeoPoint*/
    )
    /*: boolean*/
    {
      var minX = this._coordinates[0][0];
      var maxX = this._coordinates[0][0];
      var minY = this._coordinates[0][1];
      var maxY = this._coordinates[0][1];

      for (var i = 1; i < this._coordinates.length; i += 1) {
        var p = this._coordinates[i];
        minX = Math.min(p[0], minX);
        maxX = Math.max(p[0], maxX);
        minY = Math.min(p[1], minY);
        maxY = Math.max(p[1], maxY);
      }

      var outside = point.latitude < minX || point.latitude > maxX || point.longitude < minY || point.longitude > maxY;

      if (outside) {
        return false;
      }

      var inside = false;

      for (var _i = 0, j = this._coordinates.length - 1; _i < this._coordinates.length; j = _i++) {
        var startX = this._coordinates[_i][0];
        var startY = this._coordinates[_i][1];
        var endX = this._coordinates[j][0];
        var endY = this._coordinates[j][1];
        var intersect = startY > point.longitude != endY > point.longitude && point.latitude < (endX - startX) * (point.longitude - startY) / (endY - startY) + startX;

        if (intersect) {
          inside = !inside;
        }
      }

      return inside;
    }
    /**
     * Validates that the list of coordinates can form a valid polygon
     * @param {Array} coords the list of coordinated to validate as a polygon
     * @throws {TypeError}
     */

  }, {
    key: "coordinates",
    get: function ()
    /*: Array<Array<number>>*/
    {
      return this._coordinates;
    },
    set: function (coords
    /*: Array<Array<number>> | Array<ParseGeoPoint>*/
    ) {
      this._coordinates = ParsePolygon._validate(coords);
    }
  }], [{
    key: "_validate",
    value: function (coords
    /*: Array<Array<number>> | Array<ParseGeoPoint>*/
    )
    /*: Array<Array<number>>*/
    {
      if (!(0, _isArray.default)(coords)) {
        throw new TypeError('Coordinates must be an Array');
      }

      if (coords.length < 3) {
        throw new TypeError('Polygon must have at least 3 GeoPoints or Points');
      }

      var points = [];

      for (var i = 0; i < coords.length; i += 1) {
        var coord = coords[i];
        var geoPoint = void 0;

        if (coord instanceof _ParseGeoPoint.default) {
          geoPoint = coord;
        } else if ((0, _isArray.default)(coord) && coord.length === 2) {
          geoPoint = new _ParseGeoPoint.default(coord[0], coord[1]);
        } else {
          throw new TypeError('Coordinates must be an Array of GeoPoints or Points');
        }

        points.push([geoPoint.latitude, geoPoint.longitude]);
      }

      return points;
    }
  }]);
  return ParsePolygon;
}();

var _default = ParsePolygon;
exports.default = _default;
},{"./ParseGeoPoint":20,"@babel/runtime-corejs3/core-js-stable/array/is-array":51,"@babel/runtime-corejs3/core-js-stable/object/define-property":71,"@babel/runtime-corejs3/helpers/classCallCheck":103,"@babel/runtime-corejs3/helpers/createClass":105,"@babel/runtime-corejs3/helpers/defineProperty":106,"@babel/runtime-corejs3/helpers/interopRequireDefault":110}],26:[function(_dereq_,module,exports){
"use strict";

var _interopRequireDefault = _dereq_("@babel/runtime-corejs3/helpers/interopRequireDefault");

var _Object$defineProperty = _dereq_("@babel/runtime-corejs3/core-js-stable/object/define-property");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports.default = void 0;

var _typeof2 = _interopRequireDefault(_dereq_("@babel/runtime-corejs3/helpers/typeof"));

var _isArray = _interopRequireDefault(_dereq_("@babel/runtime-corejs3/core-js-stable/array/is-array"));

var _find = _interopRequireDefault(_dereq_("@babel/runtime-corejs3/core-js-stable/instance/find"));

var _promise = _interopRequireDefault(_dereq_("@babel/runtime-corejs3/core-js-stable/promise"));

var _regenerator = _interopRequireDefault(_dereq_("@babel/runtime-corejs3/regenerator"));

var _splice = _interopRequireDefault(_dereq_("@babel/runtime-corejs3/core-js-stable/instance/splice"));

var _sort = _interopRequireDefault(_dereq_("@babel/runtime-corejs3/core-js-stable/instance/sort"));

var _includes = _interopRequireDefault(_dereq_("@babel/runtime-corejs3/core-js-stable/instance/includes"));

var _concat = _interopRequireDefault(_dereq_("@babel/runtime-corejs3/core-js-stable/instance/concat"));

var _keys = _interopRequireDefault(_dereq_("@babel/runtime-corejs3/core-js-stable/instance/keys"));

var _filter = _interopRequireDefault(_dereq_("@babel/runtime-corejs3/core-js-stable/instance/filter"));

var _asyncToGenerator2 = _interopRequireDefault(_dereq_("@babel/runtime-corejs3/helpers/asyncToGenerator"));

var _map = _interopRequireDefault(_dereq_("@babel/runtime-corejs3/core-js-stable/instance/map"));

var _classCallCheck2 = _interopRequireDefault(_dereq_("@babel/runtime-corejs3/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(_dereq_("@babel/runtime-corejs3/helpers/createClass"));

var _defineProperty2 = _interopRequireDefault(_dereq_("@babel/runtime-corejs3/helpers/defineProperty"));

var _slice = _interopRequireDefault(_dereq_("@babel/runtime-corejs3/core-js-stable/instance/slice"));

var _keys2 = _interopRequireDefault(_dereq_("@babel/runtime-corejs3/core-js-stable/object/keys"));

var _indexOf = _interopRequireDefault(_dereq_("@babel/runtime-corejs3/core-js-stable/instance/index-of"));

var _forEach = _interopRequireDefault(_dereq_("@babel/runtime-corejs3/core-js-stable/instance/for-each"));

var _CoreManager = _interopRequireDefault(_dereq_("./CoreManager"));

var _encode = _interopRequireDefault(_dereq_("./encode"));

var _promiseUtils = _dereq_("./promiseUtils");

var _ParseError = _interopRequireDefault(_dereq_("./ParseError"));

var _ParseGeoPoint = _interopRequireDefault(_dereq_("./ParseGeoPoint"));

var _ParseObject = _interopRequireDefault(_dereq_("./ParseObject"));

var _OfflineQuery = _interopRequireDefault(_dereq_("./OfflineQuery"));

var _LocalDatastoreUtils = _dereq_("./LocalDatastoreUtils");
/*
 * Copyright (c) 2015-present, Parse, LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @flow
 */

/**
 * Converts a string into a regex that matches it.
 * Surrounding with \Q .. \E does this, we just need to escape any \E's in
 * the text separately.
 * @private
 */


function quote(s
/*: string*/
) {
  return '\\Q' + s.replace('\\E', '\\E\\\\E\\Q') + '\\E';
}
/**
 * Extracts the class name from queries. If not all queries have the same
 * class name an error will be thrown.
 */


function _getClassNameFromQueries(queries
/*: Array<ParseQuery>*/
)
/*: ?string*/
{
  var className = null;
  (0, _forEach.default)(queries).call(queries, function (q) {
    if (!className) {
      className = q.className;
    }

    if (className !== q.className) {
      throw new Error('All queries must be for the same class.');
    }
  });
  return className;
}
/*
 * Handles pre-populating the result data of a query with select fields,
 * making sure that the data object contains keys for all objects that have
 * been requested with a select, so that our cached state updates correctly.
 */


function handleSelectResult(data
/*: any*/
, select
/*: Array<string>*/
) {
  var serverDataMask = {};
  (0, _forEach.default)(select).call(select, function (field) {
    var hasSubObjectSelect = (0, _indexOf.default)(field).call(field, ".") !== -1;

    if (!hasSubObjectSelect && !data.hasOwnProperty(field)) {
      // this field was selected, but is missing from the retrieved data
      data[field] = undefined;
    } else if (hasSubObjectSelect) {
      // this field references a sub-object,
      // so we need to walk down the path components
      var pathComponents = field.split(".");
      var _obj = data;
      var serverMask = serverDataMask;
      (0, _forEach.default)(pathComponents).call(pathComponents, function (component, index, arr) {
        // add keys if the expected data is missing
        if (_obj && !_obj.hasOwnProperty(component)) {
          _obj[component] = undefined;
        }

        if (_obj !== undefined) {
          _obj = _obj[component];
        } //add this path component to the server mask so we can fill it in later if needed


        if (index < arr.length - 1) {
          if (!serverMask[component]) {
            serverMask[component] = {};
          }

          serverMask = serverMask[component];
        }
      });
    }
  });

  if ((0, _keys2.default)(serverDataMask).length > 0) {
    // When selecting from sub-objects, we don't want to blow away the missing
    // information that we may have retrieved before. We've already added any
    // missing selected keys to sub-objects, but we still need to add in the
    // data for any previously retrieved sub-objects that were not selected.
    var serverData = _CoreManager.default.getObjectStateController().getServerData({
      id: data.objectId,
      className: data.className
    });

    copyMissingDataWithMask(serverData, data, serverDataMask, false);
  }
}

function copyMissingDataWithMask(src, dest, mask, copyThisLevel) {
  //copy missing elements at this level
  if (copyThisLevel) {
    for (var _key in src) {
      if (src.hasOwnProperty(_key) && !dest.hasOwnProperty(_key)) {
        dest[_key] = src[_key];
      }
    }
  }

  for (var _key2 in mask) {
    if (dest[_key2] !== undefined && dest[_key2] !== null && src !== undefined && src !== null) {
      //traverse into objects as needed
      copyMissingDataWithMask(src[_key2], dest[_key2], mask[_key2], true);
    }
  }
}

function handleOfflineSort(a, b, sorts) {
  var order = sorts[0];
  var operator = (0, _slice.default)(order).call(order, 0, 1);
  var isDescending = operator === '-';

  if (isDescending) {
    order = order.substring(1);
  }

  if (order === '_created_at') {
    order = 'createdAt';
  }

  if (order === '_updated_at') {
    order = 'updatedAt';
  }

  if (!/^[A-Za-z][0-9A-Za-z_]*$/.test(order) || order === 'password') {
    throw new _ParseError.default(_ParseError.default.INVALID_KEY_NAME, "Invalid Key: ".concat(order));
  }

  var field1 = a.get(order);
  var field2 = b.get(order);

  if (field1 < field2) {
    return isDescending ? 1 : -1;
  }

  if (field1 > field2) {
    return isDescending ? -1 : 1;
  }

  if (sorts.length > 1) {
    var remainingSorts = (0, _slice.default)(sorts).call(sorts, 1);
    return handleOfflineSort(a, b, remainingSorts);
  }

  return 0;
}
/**
 * Creates a new parse Parse.Query for the given Parse.Object subclass.
 *
 * <p>Parse.Query defines a query that is used to fetch Parse.Objects. The
 * most common use case is finding all objects that match a query through the
 * <code>find</code> method. for example, this sample code fetches all objects
 * of class <code>myclass</code>. it calls a different function depending on
 * whether the fetch succeeded or not.
 *
 * <pre>
 * var query = new Parse.Query(myclass);
 * query.find().then((results) => {
 *   // results is an array of parse.object.
 * }).catch((error) =>  {
 *  // error is an instance of parse.error.
 * });</pre></p>
 *
 * <p>a Parse.Query can also be used to retrieve a single object whose id is
 * known, through the get method. for example, this sample code fetches an
 * object of class <code>myclass</code> and id <code>myid</code>. it calls a
 * different function depending on whether the fetch succeeded or not.
 *
 * <pre>
 * var query = new Parse.Query(myclass);
 * query.get(myid).then((object) => {
 *     // object is an instance of parse.object.
 * }).catch((error) =>  {
 *  // error is an instance of parse.error.
 * });</pre></p>
 *
 * <p>a Parse.Query can also be used to count the number of objects that match
 * the query without retrieving all of those objects. for example, this
 * sample code counts the number of objects of the class <code>myclass</code>
 * <pre>
 * var query = new Parse.Query(myclass);
 * query.count().then((number) => {
 *     // there are number instances of myclass.
 * }).catch((error) => {
 *     // error is an instance of Parse.Error.
 * });</pre></p>
 * @alias Parse.Query
 */


var ParseQuery =
/*#__PURE__*/
function () {
  /**
   * @property className
   * @type String
   */

  /**
   * @param {(String|Parse.Object)} objectClass An instance of a subclass of Parse.Object, or a Parse className string.
   */
  function ParseQuery(objectClass
  /*: string | ParseObject*/
  ) {
    (0, _classCallCheck2.default)(this, ParseQuery);
    (0, _defineProperty2.default)(this, "className", void 0);
    (0, _defineProperty2.default)(this, "_where", void 0);
    (0, _defineProperty2.default)(this, "_include", void 0);
    (0, _defineProperty2.default)(this, "_exclude", void 0);
    (0, _defineProperty2.default)(this, "_select", void 0);
    (0, _defineProperty2.default)(this, "_limit", void 0);
    (0, _defineProperty2.default)(this, "_skip", void 0);
    (0, _defineProperty2.default)(this, "_count", void 0);
    (0, _defineProperty2.default)(this, "_order", void 0);
    (0, _defineProperty2.default)(this, "_readPreference", void 0);
    (0, _defineProperty2.default)(this, "_includeReadPreference", void 0);
    (0, _defineProperty2.default)(this, "_subqueryReadPreference", void 0);
    (0, _defineProperty2.default)(this, "_queriesLocalDatastore", void 0);
    (0, _defineProperty2.default)(this, "_localDatastorePinName", void 0);
    (0, _defineProperty2.default)(this, "_extraOptions", void 0);

    if (typeof objectClass === 'string') {
      if (objectClass === 'User' && _CoreManager.default.get('PERFORM_USER_REWRITE')) {
        this.className = '_User';
      } else {
        this.className = objectClass;
      }
    } else if (objectClass instanceof _ParseObject.default) {
      this.className = objectClass.className;
    } else if (typeof objectClass === 'function') {
      if (typeof objectClass.className === 'string') {
        this.className = objectClass.className;
      } else {
        var _obj2 = new objectClass();

        this.className = _obj2.className;
      }
    } else {
      throw new TypeError('A ParseQuery must be constructed with a ParseObject or class name.');
    }

    this._where = {};
    this._include = [];
    this._exclude = [];
    this._count = false;
    this._limit = -1; // negative limit is not sent in the server request

    this._skip = 0;
    this._readPreference = null;
    this._includeReadPreference = null;
    this._subqueryReadPreference = null;
    this._queriesLocalDatastore = false;
    this._localDatastorePinName = null;
    this._extraOptions = {};
  }
  /**
   * Adds constraint that at least one of the passed in queries matches.
   * @param {Array} queries
   * @return {Parse.Query} Returns the query, so you can chain this call.
   */


  (0, _createClass2.default)(ParseQuery, [{
    key: "_orQuery",
    value: function (queries
    /*: Array<ParseQuery>*/
    )
    /*: ParseQuery*/
    {
      var queryJSON = (0, _map.default)(queries).call(queries, function (q) {
        return q.toJSON().where;
      });
      this._where.$or = queryJSON;
      return this;
    }
    /**
     * Adds constraint that all of the passed in queries match.
     * @param {Array} queries
     * @return {Parse.Query} Returns the query, so you can chain this call.
     */

  }, {
    key: "_andQuery",
    value: function (queries
    /*: Array<ParseQuery>*/
    )
    /*: ParseQuery*/
    {
      var queryJSON = (0, _map.default)(queries).call(queries, function (q) {
        return q.toJSON().where;
      });
      this._where.$and = queryJSON;
      return this;
    }
    /**
     * Adds constraint that none of the passed in queries match.
     * @param {Array} queries
     * @return {Parse.Query} Returns the query, so you can chain this call.
     */

  }, {
    key: "_norQuery",
    value: function (queries
    /*: Array<ParseQuery>*/
    )
    /*: ParseQuery*/
    {
      var queryJSON = (0, _map.default)(queries).call(queries, function (q) {
        return q.toJSON().where;
      });
      this._where.$nor = queryJSON;
      return this;
    }
    /**
     * Helper for condition queries
     */

  }, {
    key: "_addCondition",
    value: function (key
    /*: string*/
    , condition
    /*: string*/
    , value
    /*: mixed*/
    )
    /*: ParseQuery*/
    {
      if (!this._where[key] || typeof this._where[key] === 'string') {
        this._where[key] = {};
      }

      this._where[key][condition] = (0, _encode.default)(value, false, true);
      return this;
    }
    /**
     * Converts string for regular expression at the beginning
     */

  }, {
    key: "_regexStartWith",
    value: function (string
    /*: string*/
    )
    /*: string*/
    {
      return '^' + quote(string);
    }
  }, {
    key: "_handleOfflineQuery",
    value: function () {
      var _handleOfflineQuery2 = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee(params
      /*: any*/
      ) {
        var _context,
            _this2 = this;

        var localDatastore, objects, results, keys, alwaysSelectedKeys, sorts, count, limit;
        return _regenerator.default.wrap(function (_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _OfflineQuery.default.validateQuery(this);

                localDatastore = _CoreManager.default.getLocalDatastore();
                _context3.next = 4;
                return localDatastore._serializeObjectsFromPinName(this._localDatastorePinName);

              case 4:
                objects = _context3.sent;
                results = (0, _filter.default)(_context = (0, _map.default)(objects).call(objects, function (json, index, arr) {
                  var object = _ParseObject.default.fromJSON(json, false);

                  if (json._localId && !json.objectId) {
                    object._localId = json._localId;
                  }

                  if (!_OfflineQuery.default.matchesQuery(_this2.className, object, arr, _this2)) {
                    return null;
                  }

                  return object;
                })).call(_context, function (object) {
                  return object !== null;
                });

                if ((0, _keys.default)(params)) {
                  keys = (0, _keys.default)(params).split(',');
                  alwaysSelectedKeys = ['className', 'objectId', 'createdAt', 'updatedAt', 'ACL'];
                  keys = (0, _concat.default)(keys).call(keys, alwaysSelectedKeys);
                  results = (0, _map.default)(results).call(results, function (object) {
                    var _context2;

                    var json = object._toFullJSON();

                    (0, _forEach.default)(_context2 = (0, _keys2.default)(json)).call(_context2, function (key) {
                      if (!(0, _includes.default)(keys).call(keys, key)) {
                        delete json[key];
                      }
                    });
                    return _ParseObject.default.fromJSON(json, false);
                  });
                }

                if (params.order) {
                  sorts = params.order.split(',');
                  (0, _sort.default)(results).call(results, function (a, b) {
                    return handleOfflineSort(a, b, sorts);
                  });
                } // count total before applying limit/skip


                if (params.count) {
                  count = results.length; // total count from response
                }

                if (params.skip) {
                  if (params.skip >= results.length) {
                    results = [];
                  } else {
                    results = (0, _splice.default)(results).call(results, params.skip, results.length);
                  }
                }

                limit = results.length;

                if (params.limit !== 0 && params.limit < results.length) {
                  limit = params.limit;
                }

                results = (0, _splice.default)(results).call(results, 0, limit);

                if (!(typeof count === 'number')) {
                  _context3.next = 15;
                  break;
                }

                return _context3.abrupt("return", {
                  results: results,
                  count: count
                });

              case 15:
                return _context3.abrupt("return", results);

              case 16:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee, this);
      }));

      return function () {
        return _handleOfflineQuery2.apply(this, arguments);
      };
    }()
    /**
     * Returns a JSON representation of this query.
     * @return {Object} The JSON representation of the query.
     */

  }, {
    key: "toJSON",
    value: function ()
    /*: QueryJSON*/
    {
      var params
      /*: QueryJSON*/
      = {
        where: this._where
      };

      if (this._include.length) {
        params.include = this._include.join(',');
      }

      if (this._exclude.length) {
        params.excludeKeys = this._exclude.join(',');
      }

      if (this._select) {
        params.keys = this._select.join(',');
      }

      if (this._count) {
        params.count = 1;
      }

      if (this._limit >= 0) {
        params.limit = this._limit;
      }

      if (this._skip > 0) {
        params.skip = this._skip;
      }

      if (this._order) {
        params.order = this._order.join(',');
      }

      if (this._readPreference) {
        params.readPreference = this._readPreference;
      }

      if (this._includeReadPreference) {
        params.includeReadPreference = this._includeReadPreference;
      }

      if (this._subqueryReadPreference) {
        params.subqueryReadPreference = this._subqueryReadPreference;
      }

      for (var _key3 in this._extraOptions) {
        params[_key3] = this._extraOptions[_key3];
      }

      return params;
    }
    /**
     * Return a query with conditions from json, can be useful to send query from server side to client
     * Not static, all query conditions was set before calling this method will be deleted.
     * For example on the server side we have
     * var query = new Parse.Query("className");
     * query.equalTo(key: value);
     * query.limit(100);
     * ... (others queries)
     * Create JSON representation of Query Object
     * var jsonFromServer = query.fromJSON();
     *
     * On client side getting query:
     * var query = new Parse.Query("className");
     * query.fromJSON(jsonFromServer);
     *
     * and continue to query...
     * query.skip(100).find().then(...);
     * @param {QueryJSON} json from Parse.Query.toJSON() method
     * @return {Parse.Query} Returns the query, so you can chain this call.
     */

  }, {
    key: "withJSON",
    value: function (json
    /*: QueryJSON*/
    )
    /*: ParseQuery*/
    {
      if (json.where) {
        this._where = json.where;
      }

      if (json.include) {
        this._include = json.include.split(",");
      }

      if ((0, _keys.default)(json)) {
        this._select = (0, _keys.default)(json).split(",");
      }

      if (json.excludeKeys) {
        this._exclude = json.excludeKeys.split(",");
      }

      if (json.count) {
        this._count = json.count === 1;
      }

      if (json.limit) {
        this._limit = json.limit;
      }

      if (json.skip) {
        this._skip = json.skip;
      }

      if (json.order) {
        this._order = json.order.split(",");
      }

      if (json.readPreference) {
        this._readPreference = json.readPreference;
      }

      if (json.includeReadPreference) {
        this._includeReadPreference = json.includeReadPreference;
      }

      if (json.subqueryReadPreference) {
        this._subqueryReadPreference = json.subqueryReadPreference;
      }

      for (var _key4 in json) {
        if (json.hasOwnProperty(_key4)) {
          var _context4;

          if ((0, _indexOf.default)(_context4 = ["where", "include", "keys", "count", "limit", "skip", "order", "readPreference", "includeReadPreference", "subqueryReadPreference"]).call(_context4, _key4) === -1) {
            this._extraOptions[_key4] = json[_key4];
          }
        }
      }

      return this;
    }
    /**
       * Static method to restore Parse.Query by json representation
       * Internally calling Parse.Query.withJSON
       * @param {String} className
       * @param {QueryJSON} json from Parse.Query.toJSON() method
       * @returns {Parse.Query} new created query
       */

  }, {
    key: "get",

    /**
     * Constructs a Parse.Object whose id is already known by fetching data from
     * the server.  Either options.success or options.error is called when the
     * find completes. Unlike the <code>first</code> method, it never returns undefined.
     *
     * @param {String} objectId The id of the object to be fetched.
     * @param {Object} options
     * Valid options are:<ul>
     *   <li>useMasterKey: In Cloud Code and Node only, causes the Master Key to
     *     be used for this request.
     *   <li>sessionToken: A valid session token, used for making a request on
     *       behalf of a specific user.
     * </ul>
     *
     * @return {Promise} A promise that is resolved with the result when
     * the query completes.
     */
    value: function (objectId
    /*: string*/
    , options
    /*:: ?: FullOptions*/
    )
    /*: Promise<ParseObject>*/
    {
      this.equalTo('objectId', objectId);
      var firstOptions = {};

      if (options && options.hasOwnProperty('useMasterKey')) {
        firstOptions.useMasterKey = options.useMasterKey;
      }

      if (options && options.hasOwnProperty('sessionToken')) {
        firstOptions.sessionToken = options.sessionToken;
      }

      return this.first(firstOptions).then(function (response) {
        if (response) {
          return response;
        }

        var errorObject = new _ParseError.default(_ParseError.default.OBJECT_NOT_FOUND, 'Object not found.');
        return _promise.default.reject(errorObject);
      });
    }
    /**
     * Retrieves a list of ParseObjects that satisfy this query.
     * Either options.success or options.error is called when the find
     * completes.
     *
     * @param {Object} options Valid options
     * are:<ul>
     *   <li>useMasterKey: In Cloud Code and Node only, causes the Master Key to
     *     be used for this request.
     *   <li>sessionToken: A valid session token, used for making a request on
     *       behalf of a specific user.
     * </ul>
     *
     * @return {Promise} A promise that is resolved with the results when
     * the query completes.
     */

  }, {
    key: "find",
    value: function (options
    /*:: ?: FullOptions*/
    )
    /*: Promise<Array<ParseObject>>*/
    {
      var _this3 = this;

      options = options || {};
      var findOptions = {};

      if (options.hasOwnProperty('useMasterKey')) {
        findOptions.useMasterKey = options.useMasterKey;
      }

      if (options.hasOwnProperty('sessionToken')) {
        findOptions.sessionToken = options.sessionToken;
      }

      var controller = _CoreManager.default.getQueryController();

      var select = this._select;

      if (this._queriesLocalDatastore) {
        return this._handleOfflineQuery(this.toJSON());
      }

      return (0, _find.default)(controller).call(controller, this.className, this.toJSON(), findOptions).then(function (response) {
        var _context5;

        var results = (0, _map.default)(_context5 = response.results).call(_context5, function (data) {
          // In cases of relations, the server may send back a className
          // on the top level of the payload
          var override = response.className || _this3.className;

          if (!data.className) {
            data.className = override;
          } // Make sure the data object contains keys for all objects that
          // have been requested with a select, so that our cached state
          // updates correctly.


          if (select) {
            handleSelectResult(data, select);
          }

          return _ParseObject.default.fromJSON(data, !select);
        });
        var count = response.count;

        if (typeof count === "number") {
          return {
            results: results,
            count: count
          };
        } else {
          return results;
        }
      });
    }
    /**
     * Counts the number of objects that match this query.
     * Either options.success or options.error is called when the count
     * completes.
     *
     * @param {Object} options
     * Valid options are:<ul>
     *   <li>useMasterKey: In Cloud Code and Node only, causes the Master Key to
     *     be used for this request.
     *   <li>sessionToken: A valid session token, used for making a request on
     *       behalf of a specific user.
     * </ul>
     *
     * @return {Promise} A promise that is resolved with the count when
     * the query completes.
     */

  }, {
    key: "count",
    value: function (options
    /*:: ?: FullOptions*/
    )
    /*: Promise<number>*/
    {
      options = options || {};
      var findOptions = {};

      if (options.hasOwnProperty('useMasterKey')) {
        findOptions.useMasterKey = options.useMasterKey;
      }

      if (options.hasOwnProperty('sessionToken')) {
        findOptions.sessionToken = options.sessionToken;
      }

      var controller = _CoreManager.default.getQueryController();

      var params = this.toJSON();
      params.limit = 0;
      params.count = 1;
      return (0, _find.default)(controller).call(controller, this.className, params, findOptions).then(function (result) {
        return result.count;
      });
    }
    /**
     * Executes a distinct query and returns unique values
     *
     * @param {String} key A field to find distinct values
     * @param {Object} options
     * Valid options are:<ul>
     *   <li>sessionToken: A valid session token, used for making a request on
     *       behalf of a specific user.
     * </ul>
     *
     * @return {Promise} A promise that is resolved with the query completes.
     */

  }, {
    key: "distinct",
    value: function (key
    /*: string*/
    , options
    /*:: ?: FullOptions*/
    )
    /*: Promise<Array<mixed>>*/
    {
      options = options || {};
      var distinctOptions = {};
      distinctOptions.useMasterKey = true;

      if (options.hasOwnProperty('sessionToken')) {
        distinctOptions.sessionToken = options.sessionToken;
      }

      var controller = _CoreManager.default.getQueryController();

      var params = {
        distinct: key,
        where: this._where
      };
      return controller.aggregate(this.className, params, distinctOptions).then(function (results) {
        return results.results;
      });
    }
    /**
     * Executes an aggregate query and returns aggregate results
     *
     * @param {Mixed} pipeline Array or Object of stages to process query
     * @param {Object} options Valid options are:<ul>
     *   <li>sessionToken: A valid session token, used for making a request on
     *       behalf of a specific user.
     * </ul>
     *
     * @return {Promise} A promise that is resolved with the query completes.
     */

  }, {
    key: "aggregate",
    value: function (pipeline
    /*: mixed*/
    , options
    /*:: ?: FullOptions*/
    )
    /*: Promise<Array<mixed>>*/
    {
      options = options || {};
      var aggregateOptions = {};
      aggregateOptions.useMasterKey = true;

      if (options.hasOwnProperty('sessionToken')) {
        aggregateOptions.sessionToken = options.sessionToken;
      }

      var controller = _CoreManager.default.getQueryController();

      if (!(0, _isArray.default)(pipeline) && (0, _typeof2.default)(pipeline) !== 'object') {
        throw new Error('Invalid pipeline must be Array or Object');
      }

      return controller.aggregate(this.className, {
        pipeline: pipeline
      }, aggregateOptions).then(function (results) {
        return results.results;
      });
    }
    /**
     * Retrieves at most one Parse.Object that satisfies this query.
     *
     * Either options.success or options.error is called when it completes.
     * success is passed the object if there is one. otherwise, undefined.
     *
     * @param {Object} options Valid options are:<ul>
     *   <li>useMasterKey: In Cloud Code and Node only, causes the Master Key to
     *     be used for this request.
     *   <li>sessionToken: A valid session token, used for making a request on
     *       behalf of a specific user.
     * </ul>
     *
     * @return {Promise} A promise that is resolved with the object when
     * the query completes.
     */

  }, {
    key: "first",
    value: function (options
    /*:: ?: FullOptions*/
    )
    /*: Promise<ParseObject | void>*/
    {
      var _this4 = this;

      options = options || {};
      var findOptions = {};

      if (options.hasOwnProperty('useMasterKey')) {
        findOptions.useMasterKey = options.useMasterKey;
      }

      if (options.hasOwnProperty('sessionToken')) {
        findOptions.sessionToken = options.sessionToken;
      }

      var controller = _CoreManager.default.getQueryController();

      var params = this.toJSON();
      params.limit = 1;
      var select = this._select;

      if (this._queriesLocalDatastore) {
        return this._handleOfflineQuery(params).then(function (objects) {
          if (!objects[0]) {
            return undefined;
          }

          return objects[0];
        });
      }

      return (0, _find.default)(controller).call(controller, this.className, params, findOptions).then(function (response) {
        var objects = response.results;

        if (!objects[0]) {
          return undefined;
        }

        if (!objects[0].className) {
          objects[0].className = _this4.className;
        } // Make sure the data object contains keys for all objects that
        // have been requested with a select, so that our cached state
        // updates correctly.


        if (select) {
          handleSelectResult(objects[0], select);
        }

        return _ParseObject.default.fromJSON(objects[0], !select);
      });
    }
    /**
     * Iterates over each result of a query, calling a callback for each one. If
     * the callback returns a promise, the iteration will not continue until
     * that promise has been fulfilled. If the callback returns a rejected
     * promise, then iteration will stop with that error. The items are
     * processed in an unspecified order. The query may not have any sort order,
     * and may not use limit or skip.
     * @param {Function} callback Callback that will be called with each result
     *     of the query.
     * @param {Object} options Valid options are:<ul>
     *   <li>useMasterKey: In Cloud Code and Node only, causes the Master Key to
     *     be used for this request.
     *   <li>sessionToken: A valid session token, used for making a request on
     *       behalf of a specific user.
     * </ul>
     * @return {Promise} A promise that will be fulfilled once the
     *     iteration has completed.
     */

  }, {
    key: "each",
    value: function (callback
    /*: (obj: ParseObject) => any*/
    , options
    /*:: ?: BatchOptions*/
    )
    /*: Promise<Array<ParseObject>>*/
    {
      var _context6;

      options = options || {};

      if (this._order || this._skip || this._limit >= 0) {
        return _promise.default.reject('Cannot iterate on a query with sort, skip, or limit.');
      }

      var query = new ParseQuery(this.className); // We can override the batch size from the options.
      // This is undocumented, but useful for testing.

      query._limit = options.batchSize || 100;
      query._include = (0, _map.default)(_context6 = this._include).call(_context6, function (i) {
        return i;
      });

      if (this._select) {
        var _context7;

        query._select = (0, _map.default)(_context7 = this._select).call(_context7, function (s) {
          return s;
        });
      }

      query._where = {};

      for (var _attr in this._where) {
        var val = this._where[_attr];

        if ((0, _isArray.default)(val)) {
          query._where[_attr] = (0, _map.default)(val).call(val, function (v) {
            return v;
          });
        } else if (val && (0, _typeof2.default)(val) === 'object') {
          var conditionMap = {};
          query._where[_attr] = conditionMap;

          for (var cond in val) {
            conditionMap[cond] = val[cond];
          }
        } else {
          query._where[_attr] = val;
        }
      }

      query.ascending('objectId');
      var findOptions = {};

      if (options.hasOwnProperty('useMasterKey')) {
        findOptions.useMasterKey = options.useMasterKey;
      }

      if (options.hasOwnProperty('sessionToken')) {
        findOptions.sessionToken = options.sessionToken;
      }

      var finished = false;
      return (0, _promiseUtils.continueWhile)(function () {
        return !finished;
      }, function () {
        return (0, _find.default)(query).call(query, findOptions).then(function (results) {
          var callbacksDone = _promise.default.resolve();

          (0, _forEach.default)(results).call(results, function (result) {
            callbacksDone = callbacksDone.then(function () {
              return callback(result);
            });
          });
          return callbacksDone.then(function () {
            if (results.length >= query._limit) {
              query.greaterThan('objectId', results[results.length - 1].id);
            } else {
              finished = true;
            }
          });
        });
      });
    }
    /** Query Conditions **/

    /**
     * Adds a constraint to the query that requires a particular key's value to
     * be equal to the provided value.
     * @param {String} key The key to check.
     * @param value The value that the Parse.Object must contain.
     * @return {Parse.Query} Returns the query, so you can chain this call.
     */

  }, {
    key: "equalTo",
    value: function (key
    /*: string*/
    , value
    /*: mixed*/
    )
    /*: ParseQuery*/
    {
      if (typeof value === 'undefined') {
        return this.doesNotExist(key);
      }

      this._where[key] = (0, _encode.default)(value, false, true);
      return this;
    }
    /**
     * Adds a constraint to the query that requires a particular key's value to
     * be not equal to the provided value.
     * @param {String} key The key to check.
     * @param value The value that must not be equalled.
     * @return {Parse.Query} Returns the query, so you can chain this call.
     */

  }, {
    key: "notEqualTo",
    value: function (key
    /*: string*/
    , value
    /*: mixed*/
    )
    /*: ParseQuery*/
    {
      return this._addCondition(key, '$ne', value);
    }
    /**
     * Adds a constraint to the query that requires a particular key's value to
     * be less than the provided value.
     * @param {String} key The key to check.
     * @param value The value that provides an upper bound.
     * @return {Parse.Query} Returns the query, so you can chain this call.
     */

  }, {
    key: "lessThan",
    value: function (key
    /*: string*/
    , value
    /*: mixed*/
    )
    /*: ParseQuery*/
    {
      return this._addCondition(key, '$lt', value);
    }
    /**
     * Adds a constraint to the query that requires a particular key's value to
     * be greater than the provided value.
     * @param {String} key The key to check.
     * @param value The value that provides an lower bound.
     * @return {Parse.Query} Returns the query, so you can chain this call.
     */

  }, {
    key: "greaterThan",
    value: function (key
    /*: string*/
    , value
    /*: mixed*/
    )
    /*: ParseQuery*/
    {
      return this._addCondition(key, '$gt', value);
    }
    /**
     * Adds a constraint to the query that requires a particular key's value to
     * be less than or equal to the provided value.
     * @param {String} key The key to check.
     * @param value The value that provides an upper bound.
     * @return {Parse.Query} Returns the query, so you can chain this call.
     */

  }, {
    key: "lessThanOrEqualTo",
    value: function (key
    /*: string*/
    , value
    /*: mixed*/
    )
    /*: ParseQuery*/
    {
      return this._addCondition(key, '$lte', value);
    }
    /**
     * Adds a constraint to the query that requires a particular key's value to
     * be greater than or equal to the provided value.
     * @param {String} key The key to check.
     * @param value The value that provides an lower bound.
     * @return {Parse.Query} Returns the query, so you can chain this call.
     */

  }, {
    key: "greaterThanOrEqualTo",
    value: function (key
    /*: string*/
    , value
    /*: mixed*/
    )
    /*: ParseQuery*/
    {
      return this._addCondition(key, '$gte', value);
    }
    /**
     * Adds a constraint to the query that requires a particular key's value to
     * be contained in the provided list of values.
     * @param {String} key The key to check.
     * @param {Array} values The values that will match.
     * @return {Parse.Query} Returns the query, so you can chain this call.
     */

  }, {
    key: "containedIn",
    value: function (key
    /*: string*/
    , value
    /*: mixed*/
    )
    /*: ParseQuery*/
    {
      return this._addCondition(key, '$in', value);
    }
    /**
     * Adds a constraint to the query that requires a particular key's value to
     * not be contained in the provided list of values.
     * @param {String} key The key to check.
     * @param {Array} values The values that will not match.
     * @return {Parse.Query} Returns the query, so you can chain this call.
     */

  }, {
    key: "notContainedIn",
    value: function (key
    /*: string*/
    , value
    /*: mixed*/
    )
    /*: ParseQuery*/
    {
      return this._addCondition(key, '$nin', value);
    }
    /**
     * Adds a constraint to the query that requires a particular key's value to
     * be contained by the provided list of values. Get objects where all array elements match.
     * @param {String} key The key to check.
     * @param {Array} values The values that will match.
     * @return {Parse.Query} Returns the query, so you can chain this call.
     */

  }, {
    key: "containedBy",
    value: function (key
    /*: string*/
    , value
    /*: Array<mixed>*/
    )
    /*: ParseQuery*/
    {
      return this._addCondition(key, '$containedBy', value);
    }
    /**
     * Adds a constraint to the query that requires a particular key's value to
     * contain each one of the provided list of values.
     * @param {String} key The key to check.  This key's value must be an array.
     * @param {Array} values The values that will match.
     * @return {Parse.Query} Returns the query, so you can chain this call.
     */

  }, {
    key: "containsAll",
    value: function (key
    /*: string*/
    , values
    /*: Array<mixed>*/
    )
    /*: ParseQuery*/
    {
      return this._addCondition(key, '$all', values);
    }
    /**
     * Adds a constraint to the query that requires a particular key's value to
     * contain each one of the provided list of values starting with given strings.
     * @param {String} key The key to check.  This key's value must be an array.
     * @param {Array<String>} values The string values that will match as starting string.
     * @return {Parse.Query} Returns the query, so you can chain this call.
     */

  }, {
    key: "containsAllStartingWith",
    value: function (key
    /*: string*/
    , values
    /*: Array<string>*/
    )
    /*: ParseQuery*/
    {
      var _this = this;

      if (!(0, _isArray.default)(values)) {
        values = [values];
      }

      var regexObject = (0, _map.default)(values).call(values, function (value) {
        return {
          '$regex': _this._regexStartWith(value)
        };
      });
      return this.containsAll(key, regexObject);
    }
    /**
     * Adds a constraint for finding objects that contain the given key.
     * @param {String} key The key that should exist.
     * @return {Parse.Query} Returns the query, so you can chain this call.
     */

  }, {
    key: "exists",
    value: function (key
    /*: string*/
    )
    /*: ParseQuery*/
    {
      return this._addCondition(key, '$exists', true);
    }
    /**
     * Adds a constraint for finding objects that do not contain a given key.
     * @param {String} key The key that should not exist
     * @return {Parse.Query} Returns the query, so you can chain this call.
     */

  }, {
    key: "doesNotExist",
    value: function (key
    /*: string*/
    )
    /*: ParseQuery*/
    {
      return this._addCondition(key, '$exists', false);
    }
    /**
     * Adds a regular expression constraint for finding string values that match
     * the provided regular expression.
     * This may be slow for large datasets.
     * @param {String} key The key that the string to match is stored in.
     * @param {RegExp} regex The regular expression pattern to match.
     * @return {Parse.Query} Returns the query, so you can chain this call.
     */

  }, {
    key: "matches",
    value: function (key
    /*: string*/
    , regex
    /*: RegExp*/
    , modifiers
    /*: string*/
    )
    /*: ParseQuery*/
    {
      this._addCondition(key, '$regex', regex);

      if (!modifiers) {
        modifiers = '';
      }

      if (regex.ignoreCase) {
        modifiers += 'i';
      }

      if (regex.multiline) {
        modifiers += 'm';
      }

      if (modifiers.length) {
        this._addCondition(key, '$options', modifiers);
      }

      return this;
    }
    /**
     * Adds a constraint that requires that a key's value matches a Parse.Query
     * constraint.
     * @param {String} key The key that the contains the object to match the
     *                     query.
     * @param {Parse.Query} query The query that should match.
     * @return {Parse.Query} Returns the query, so you can chain this call.
     */

  }, {
    key: "matchesQuery",
    value: function (key
    /*: string*/
    , query
    /*: ParseQuery*/
    )
    /*: ParseQuery*/
    {
      var queryJSON = query.toJSON();
      queryJSON.className = query.className;
      return this._addCondition(key, '$inQuery', queryJSON);
    }
    /**
     * Adds a constraint that requires that a key's value not matches a
     * Parse.Query constraint.
     * @param {String} key The key that the contains the object to match the
     *                     query.
     * @param {Parse.Query} query The query that should not match.
     * @return {Parse.Query} Returns the query, so you can chain this call.
     */

  }, {
    key: "doesNotMatchQuery",
    value: function (key
    /*: string*/
    , query
    /*: ParseQuery*/
    )
    /*: ParseQuery*/
    {
      var queryJSON = query.toJSON();
      queryJSON.className = query.className;
      return this._addCondition(key, '$notInQuery', queryJSON);
    }
    /**
     * Adds a constraint that requires that a key's value matches a value in
     * an object returned by a different Parse.Query.
     * @param {String} key The key that contains the value that is being
     *                     matched.
     * @param {String} queryKey The key in the objects returned by the query to
     *                          match against.
     * @param {Parse.Query} query The query to run.
     * @return {Parse.Query} Returns the query, so you can chain this call.
     */

  }, {
    key: "matchesKeyInQuery",
    value: function (key
    /*: string*/
    , queryKey
    /*: string*/
    , query
    /*: ParseQuery*/
    )
    /*: ParseQuery*/
    {
      var queryJSON = query.toJSON();
      queryJSON.className = query.className;
      return this._addCondition(key, '$select', {
        key: queryKey,
        query: queryJSON
      });
    }
    /**
     * Adds a constraint that requires that a key's value not match a value in
     * an object returned by a different Parse.Query.
     * @param {String} key The key that contains the value that is being
     *                     excluded.
     * @param {String} queryKey The key in the objects returned by the query to
     *                          match against.
     * @param {Parse.Query} query The query to run.
     * @return {Parse.Query} Returns the query, so you can chain this call.
     */

  }, {
    key: "doesNotMatchKeyInQuery",
    value: function (key
    /*: string*/
    , queryKey
    /*: string*/
    , query
    /*: ParseQuery*/
    )
    /*: ParseQuery*/
    {
      var queryJSON = query.toJSON();
      queryJSON.className = query.className;
      return this._addCondition(key, '$dontSelect', {
        key: queryKey,
        query: queryJSON
      });
    }
    /**
     * Adds a constraint for finding string values that contain a provided
     * string.  This may be slow for large datasets.
     * @param {String} key The key that the string to match is stored in.
     * @param {String} substring The substring that the value must contain.
     * @return {Parse.Query} Returns the query, so you can chain this call.
     */

  }, {
    key: "contains",
    value: function (key
    /*: string*/
    , value
    /*: string*/
    )
    /*: ParseQuery*/
    {
      if (typeof value !== 'string') {
        throw new Error('The value being searched for must be a string.');
      }

      return this._addCondition(key, '$regex', quote(value));
    }
    /**
    * Adds a constraint for finding string values that contain a provided
    * string. This may be slow for large datasets. Requires Parse-Server > 2.5.0
    *
    * In order to sort you must use select and ascending ($score is required)
    *  <pre>
    *   query.fullText('field', 'term');
    *   query.ascending('$score');
    *   query.select('$score');
    *  </pre>
    *
    * To retrieve the weight / rank
    *  <pre>
    *   object->get('score');
    *  </pre>
    *
    * You can define optionals by providing an object as a third parameter
    *  <pre>
    *   query.fullText('field', 'term', { language: 'es', diacriticSensitive: true });
    *  </pre>
    *
    * @param {String} key The key that the string to match is stored in.
    * @param {String} value The string to search
    * @param {Object} options (Optional)
    * @param {String} options.language The language that determines the list of stop words for the search and the rules for the stemmer and tokenizer.
    * @param {Boolean} options.caseSensitive A boolean flag to enable or disable case sensitive search.
    * @param {Boolean} options.diacriticSensitive A boolean flag to enable or disable diacritic sensitive search.
    * @return {Parse.Query} Returns the query, so you can chain this call.
    */

  }, {
    key: "fullText",
    value: function (key
    /*: string*/
    , value
    /*: string*/
    , options
    /*: ?Object*/
    )
    /*: ParseQuery*/
    {
      options = options || {};

      if (!key) {
        throw new Error('A key is required.');
      }

      if (!value) {
        throw new Error('A search term is required');
      }

      if (typeof value !== 'string') {
        throw new Error('The value being searched for must be a string.');
      }

      var fullOptions = {};
      fullOptions.$term = value;

      for (var option in options) {
        switch (option) {
          case 'language':
            fullOptions.$language = options[option];
            break;

          case 'caseSensitive':
            fullOptions.$caseSensitive = options[option];
            break;

          case 'diacriticSensitive':
            fullOptions.$diacriticSensitive = options[option];
            break;

          default:
            throw new Error("Unknown option: ".concat(option));
        }
      }

      return this._addCondition(key, '$text', {
        $search: fullOptions
      });
    }
    /**
     * Method to sort the full text search by text score
     *
     * @return {Parse.Query} Returns the query, so you can chain this call.
     */

  }, {
    key: "sortByTextScore",
    value: function () {
      this.ascending('$score');
      this.select(['$score']);
      return this;
    }
    /**
     * Adds a constraint for finding string values that start with a provided
     * string.  This query will use the backend index, so it will be fast even
     * for large datasets.
     * @param {String} key The key that the string to match is stored in.
     * @param {String} prefix The substring that the value must start with.
     * @return {Parse.Query} Returns the query, so you can chain this call.
     */

  }, {
    key: "startsWith",
    value: function (key
    /*: string*/
    , value
    /*: string*/
    )
    /*: ParseQuery*/
    {
      if (typeof value !== 'string') {
        throw new Error('The value being searched for must be a string.');
      }

      return this._addCondition(key, '$regex', this._regexStartWith(value));
    }
    /**
     * Adds a constraint for finding string values that end with a provided
     * string.  This will be slow for large datasets.
     * @param {String} key The key that the string to match is stored in.
     * @param {String} suffix The substring that the value must end with.
     * @return {Parse.Query} Returns the query, so you can chain this call.
     */

  }, {
    key: "endsWith",
    value: function (key
    /*: string*/
    , value
    /*: string*/
    )
    /*: ParseQuery*/
    {
      if (typeof value !== 'string') {
        throw new Error('The value being searched for must be a string.');
      }

      return this._addCondition(key, '$regex', quote(value) + '$');
    }
    /**
     * Adds a proximity based constraint for finding objects with key point
     * values near the point given.
     * @param {String} key The key that the Parse.GeoPoint is stored in.
     * @param {Parse.GeoPoint} point The reference Parse.GeoPoint that is used.
     * @return {Parse.Query} Returns the query, so you can chain this call.
     */

  }, {
    key: "near",
    value: function (key
    /*: string*/
    , point
    /*: ParseGeoPoint*/
    )
    /*: ParseQuery*/
    {
      if (!(point instanceof _ParseGeoPoint.default)) {
        // Try to cast it as a GeoPoint
        point = new _ParseGeoPoint.default(point);
      }

      return this._addCondition(key, '$nearSphere', point);
    }
    /**
     * Adds a proximity based constraint for finding objects with key point
     * values near the point given and within the maximum distance given.
     * @param {String} key The key that the Parse.GeoPoint is stored in.
     * @param {Parse.GeoPoint} point The reference Parse.GeoPoint that is used.
     * @param {Number} maxDistance Maximum distance (in radians) of results to
     *   return.
     * @param {Boolean} sorted A Bool value that is true if results should be
     *   sorted by distance ascending, false is no sorting is required,
     *   defaults to true.
     * @return {Parse.Query} Returns the query, so you can chain this call.
     */

  }, {
    key: "withinRadians",
    value: function (key
    /*: string*/
    , point
    /*: ParseGeoPoint*/
    , distance
    /*: number*/
    , sorted
    /*: boolean*/
    )
    /*: ParseQuery*/
    {
      if (sorted || sorted === undefined) {
        this.near(key, point);
        return this._addCondition(key, '$maxDistance', distance);
      } else {
        return this._addCondition(key, '$geoWithin', {
          '$centerSphere': [[point.longitude, point.latitude], distance]
        });
      }
    }
    /**
     * Adds a proximity based constraint for finding objects with key point
     * values near the point given and within the maximum distance given.
     * Radius of earth used is 3958.8 miles.
     * @param {String} key The key that the Parse.GeoPoint is stored in.
     * @param {Parse.GeoPoint} point The reference Parse.GeoPoint that is used.
     * @param {Number} maxDistance Maximum distance (in miles) of results to
     *   return.
     * @param {Boolean} sorted A Bool value that is true if results should be
     *   sorted by distance ascending, false is no sorting is required,
     *   defaults to true.
     * @return {Parse.Query} Returns the query, so you can chain this call.
     */

  }, {
    key: "withinMiles",
    value: function (key
    /*: string*/
    , point
    /*: ParseGeoPoint*/
    , distance
    /*: number*/
    , sorted
    /*: boolean*/
    )
    /*: ParseQuery*/
    {
      return this.withinRadians(key, point, distance / 3958.8, sorted);
    }
    /**
     * Adds a proximity based constraint for finding objects with key point
     * values near the point given and within the maximum distance given.
     * Radius of earth used is 6371.0 kilometers.
     * @param {String} key The key that the Parse.GeoPoint is stored in.
     * @param {Parse.GeoPoint} point The reference Parse.GeoPoint that is used.
     * @param {Number} maxDistance Maximum distance (in kilometers) of results
     *   to return.
     * @param {Boolean} sorted A Bool value that is true if results should be
     *   sorted by distance ascending, false is no sorting is required,
     *   defaults to true.
     * @return {Parse.Query} Returns the query, so you can chain this call.
     */

  }, {
    key: "withinKilometers",
    value: function (key
    /*: string*/
    , point
    /*: ParseGeoPoint*/
    , distance
    /*: number*/
    , sorted
    /*: boolean*/
    )
    /*: ParseQuery*/
    {
      return this.withinRadians(key, point, distance / 6371.0, sorted);
    }
    /**
     * Adds a constraint to the query that requires a particular key's
     * coordinates be contained within a given rectangular geographic bounding
     * box.
     * @param {String} key The key to be constrained.
     * @param {Parse.GeoPoint} southwest
     *     The lower-left inclusive corner of the box.
     * @param {Parse.GeoPoint} northeast
     *     The upper-right inclusive corner of the box.
     * @return {Parse.Query} Returns the query, so you can chain this call.
     */

  }, {
    key: "withinGeoBox",
    value: function (key
    /*: string*/
    , southwest
    /*: ParseGeoPoint*/
    , northeast
    /*: ParseGeoPoint*/
    )
    /*: ParseQuery*/
    {
      if (!(southwest instanceof _ParseGeoPoint.default)) {
        southwest = new _ParseGeoPoint.default(southwest);
      }

      if (!(northeast instanceof _ParseGeoPoint.default)) {
        northeast = new _ParseGeoPoint.default(northeast);
      }

      this._addCondition(key, '$within', {
        '$box': [southwest, northeast]
      });

      return this;
    }
    /**
     * Adds a constraint to the query that requires a particular key's
     * coordinates be contained within and on the bounds of a given polygon.
     * Supports closed and open (last point is connected to first) paths
     *
     * Polygon must have at least 3 points
     *
     * @param {String} key The key to be constrained.
     * @param {Array} array of geopoints
     * @return {Parse.Query} Returns the query, so you can chain this call.
     */

  }, {
    key: "withinPolygon",
    value: function (key
    /*: string*/
    , points
    /*: Array<Array<number>>*/
    )
    /*: ParseQuery*/
    {
      return this._addCondition(key, '$geoWithin', {
        '$polygon': points
      });
    }
    /**
     * Add a constraint to the query that requires a particular key's
     * coordinates that contains a ParseGeoPoint
     *
     * @param {String} key The key to be constrained.
     * @param {Parse.GeoPoint} GeoPoint
     * @return {Parse.Query} Returns the query, so you can chain this call.
     */

  }, {
    key: "polygonContains",
    value: function (key
    /*: string*/
    , point
    /*: ParseGeoPoint*/
    )
    /*: ParseQuery*/
    {
      return this._addCondition(key, '$geoIntersects', {
        '$point': point
      });
    }
    /** Query Orderings **/

    /**
     * Sorts the results in ascending order by the given key.
     *
     * @param {(String|String[]|...String)} key The key to order by, which is a
     * string of comma separated values, or an Array of keys, or multiple keys.
     * @return {Parse.Query} Returns the query, so you can chain this call.
     */

  }, {
    key: "ascending",
    value: function ()
    /*: ParseQuery*/
    {
      this._order = [];

      for (var _len = arguments.length, keys = new Array(_len), _key5 = 0; _key5 < _len; _key5++) {
        keys[_key5] = arguments[_key5];
      }

      return this.addAscending.apply(this, keys);
    }
    /**
     * Sorts the results in ascending order by the given key,
     * but can also add secondary sort descriptors without overwriting _order.
     *
     * @param {(String|String[]|...String)} key The key to order by, which is a
     * string of comma separated values, or an Array of keys, or multiple keys.
     * @return {Parse.Query} Returns the query, so you can chain this call.
     */

  }, {
    key: "addAscending",
    value: function ()
    /*: ParseQuery*/
    {
      var _this5 = this;

      if (!this._order) {
        this._order = [];
      }

      for (var _len2 = arguments.length, keys = new Array(_len2), _key6 = 0; _key6 < _len2; _key6++) {
        keys[_key6] = arguments[_key6];
      }

      (0, _forEach.default)(keys).call(keys, function (key) {
        var _context8;

        if ((0, _isArray.default)(key)) {
          key = key.join();
        }

        _this5._order = (0, _concat.default)(_context8 = _this5._order).call(_context8, key.replace(/\s/g, '').split(','));
      });
      return this;
    }
    /**
     * Sorts the results in descending order by the given key.
     *
     * @param {(String|String[]|...String)} key The key to order by, which is a
     * string of comma separated values, or an Array of keys, or multiple keys.
     * @return {Parse.Query} Returns the query, so you can chain this call.
     */

  }, {
    key: "descending",
    value: function ()
    /*: ParseQuery*/
    {
      this._order = [];

      for (var _len3 = arguments.length, keys = new Array(_len3), _key7 = 0; _key7 < _len3; _key7++) {
        keys[_key7] = arguments[_key7];
      }

      return this.addDescending.apply(this, keys);
    }
    /**
     * Sorts the results in descending order by the given key,
     * but can also add secondary sort descriptors without overwriting _order.
     *
     * @param {(String|String[]|...String)} key The key to order by, which is a
     * string of comma separated values, or an Array of keys, or multiple keys.
     * @return {Parse.Query} Returns the query, so you can chain this call.
     */

  }, {
    key: "addDescending",
    value: function ()
    /*: ParseQuery*/
    {
      var _this6 = this;

      if (!this._order) {
        this._order = [];
      }

      for (var _len4 = arguments.length, keys = new Array(_len4), _key8 = 0; _key8 < _len4; _key8++) {
        keys[_key8] = arguments[_key8];
      }

      (0, _forEach.default)(keys).call(keys, function (key) {
        var _context9, _context10;

        if ((0, _isArray.default)(key)) {
          key = key.join();
        }

        _this6._order = (0, _concat.default)(_context9 = _this6._order).call(_context9, (0, _map.default)(_context10 = key.replace(/\s/g, '').split(',')).call(_context10, function (k) {
          return '-' + k;
        }));
      });
      return this;
    }
    /** Query Options **/

    /**
     * Sets the number of results to skip before returning any results.
     * This is useful for pagination.
     * Default is to skip zero results.
     * @param {Number} n the number of results to skip.
     * @return {Parse.Query} Returns the query, so you can chain this call.
     */

  }, {
    key: "skip",
    value: function (n
    /*: number*/
    )
    /*: ParseQuery*/
    {
      if (typeof n !== 'number' || n < 0) {
        throw new Error('You can only skip by a positive number');
      }

      this._skip = n;
      return this;
    }
    /**
     * Sets the limit of the number of results to return. The default limit is
     * 100, with a maximum of 1000 results being returned at a time.
     * @param {Number} n the number of results to limit to.
     * @return {Parse.Query} Returns the query, so you can chain this call.
     */

  }, {
    key: "limit",
    value: function (n
    /*: number*/
    )
    /*: ParseQuery*/
    {
      if (typeof n !== 'number') {
        throw new Error('You can only set the limit to a numeric value');
      }

      this._limit = n;
      return this;
    }
    /**
     * Sets the flag to include with response the total number of objects satisfying this query,
     * despite limits/skip. Might be useful for pagination.
     * Note that result of this query will be wrapped as an object with
     *`results`: holding {ParseObject} array and `count`: integer holding total number
     * @param {boolean} b false - disable, true - enable.
     * @return {Parse.Query} Returns the query, so you can chain this call.
     */

  }, {
    key: "withCount",
    value: function ()
    /*: ParseQuery*/
    {
      var includeCount
      /*: boolean*/
      = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

      if (typeof includeCount !== 'boolean') {
        throw new Error('You can only set withCount to a boolean value');
      }

      this._count = includeCount;
      return this;
    }
    /**
     * Includes nested Parse.Objects for the provided key.  You can use dot
     * notation to specify which fields in the included object are also fetched.
     *
     * You can include all nested Parse.Objects by passing in '*'.
     * Requires Parse Server 3.0.0+
     * <pre>query.include('*');</pre>
     *
     * @param {...String|Array<String>} key The name(s) of the key(s) to include.
     * @return {Parse.Query} Returns the query, so you can chain this call.
     */

  }, {
    key: "include",
    value: function ()
    /*: ParseQuery*/
    {
      var _this7 = this;

      for (var _len5 = arguments.length, keys = new Array(_len5), _key9 = 0; _key9 < _len5; _key9++) {
        keys[_key9] = arguments[_key9];
      }

      (0, _forEach.default)(keys).call(keys, function (key) {
        if ((0, _isArray.default)(key)) {
          var _context11;

          _this7._include = (0, _concat.default)(_context11 = _this7._include).call(_context11, key);
        } else {
          _this7._include.push(key);
        }
      });
      return this;
    }
    /**
     * Includes all nested Parse.Objects.
     *
     * Requires Parse Server 3.0.0+
     *
     * @return {Parse.Query} Returns the query, so you can chain this call.
     */

  }, {
    key: "includeAll",
    value: function ()
    /*: ParseQuery*/
    {
      return this.include('*');
    }
    /**
     * Restricts the fields of the returned Parse.Objects to include only the
     * provided keys.  If this is called multiple times, then all of the keys
     * specified in each of the calls will be included.
     * @param {...String|Array<String>} keys The name(s) of the key(s) to include.
     * @return {Parse.Query} Returns the query, so you can chain this call.
     */

  }, {
    key: "select",
    value: function ()
    /*: ParseQuery*/
    {
      var _this8 = this;

      if (!this._select) {
        this._select = [];
      }

      for (var _len6 = arguments.length, keys = new Array(_len6), _key10 = 0; _key10 < _len6; _key10++) {
        keys[_key10] = arguments[_key10];
      }

      (0, _forEach.default)(keys).call(keys, function (key) {
        if ((0, _isArray.default)(key)) {
          var _context12;

          _this8._select = (0, _concat.default)(_context12 = _this8._select).call(_context12, key);
        } else {
          _this8._select.push(key);
        }
      });
      return this;
    }
    /**
     * Restricts the fields of the returned Parse.Objects to all keys except the
     * provided keys. Exclude takes precedence over select and include.
     *
     * Requires Parse Server 3.6.0+
     *
     * @param {...String|Array<String>} keys The name(s) of the key(s) to exclude.
     * @return {Parse.Query} Returns the query, so you can chain this call.
     */

  }, {
    key: "exclude",
    value: function ()
    /*: ParseQuery*/
    {
      var _this9 = this;

      for (var _len7 = arguments.length, keys = new Array(_len7), _key11 = 0; _key11 < _len7; _key11++) {
        keys[_key11] = arguments[_key11];
      }

      (0, _forEach.default)(keys).call(keys, function (key) {
        if ((0, _isArray.default)(key)) {
          var _context13;

          _this9._exclude = (0, _concat.default)(_context13 = _this9._exclude).call(_context13, key);
        } else {
          _this9._exclude.push(key);
        }
      });
      return this;
    }
    /**
     * Changes the read preference that the backend will use when performing the query to the database.
     * @param {String} readPreference The read preference for the main query.
     * @param {String} includeReadPreference The read preference for the queries to include pointers.
     * @param {String} subqueryReadPreference The read preference for the sub queries.
     * @return {Parse.Query} Returns the query, so you can chain this call.
     */

  }, {
    key: "readPreference",
    value: function (_readPreference
    /*: string*/
    , includeReadPreference
    /*:: ?: string*/
    , subqueryReadPreference
    /*:: ?: string*/
    )
    /*: ParseQuery*/
    {
      this._readPreference = _readPreference;
      this._includeReadPreference = includeReadPreference;
      this._subqueryReadPreference = subqueryReadPreference;
      return this;
    }
    /**
     * Subscribe this query to get liveQuery updates
     *
     * @param {String} sessionToken (optional) Defaults to the currentUser
     * @return {Promise<LiveQuerySubscription>} Returns the liveQuerySubscription, it's an event emitter
     * which can be used to get liveQuery updates.
     */

  }, {
    key: "subscribe",
    value: function () {
      var _subscribe = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee2(sessionToken
      /*:: ?: string*/
      ) {
        var currentUser, liveQueryClient, subscription;
        return _regenerator.default.wrap(function (_context14) {
          while (1) {
            switch (_context14.prev = _context14.next) {
              case 0:
                _context14.next = 2;
                return _CoreManager.default.getUserController().currentUserAsync();

              case 2:
                currentUser = _context14.sent;

                if (!sessionToken) {
                  sessionToken = currentUser ? currentUser.getSessionToken() : undefined;
                }

                _context14.next = 6;
                return _CoreManager.default.getLiveQueryController().getDefaultLiveQueryClient();

              case 6:
                liveQueryClient = _context14.sent;

                if (liveQueryClient.shouldOpen()) {
                  liveQueryClient.open();
                }

                subscription = liveQueryClient.subscribe(this, sessionToken);
                return _context14.abrupt("return", subscription.subscribePromise.then(function () {
                  return subscription;
                }));

              case 10:
              case "end":
                return _context14.stop();
            }
          }
        }, _callee2, this);
      }));

      return function () {
        return _subscribe.apply(this, arguments);
      };
    }()
    /**
     * Constructs a Parse.Query that is the OR of the passed in queries.  For
     * example:
     * <pre>var compoundQuery = Parse.Query.or(query1, query2, query3);</pre>
     *
     * will create a compoundQuery that is an or of the query1, query2, and
     * query3.
     * @param {...Parse.Query} var_args The list of queries to OR.
     * @static
     * @return {Parse.Query} The query that is the OR of the passed in queries.
     */

  }, {
    key: "fromLocalDatastore",

    /**
     * Changes the source of this query to all pinned objects.
     *
     * @return {Parse.Query} Returns the query, so you can chain this call.
     */
    value: function ()
    /*: ParseQuery*/
    {
      return this.fromPinWithName(null);
    }
    /**
     * Changes the source of this query to the default group of pinned objects.
     *
     * @return {Parse.Query} Returns the query, so you can chain this call.
     */

  }, {
    key: "fromPin",
    value: function ()
    /*: ParseQuery*/
    {
      return this.fromPinWithName(_LocalDatastoreUtils.DEFAULT_PIN);
    }
    /**
     * Changes the source of this query to a specific group of pinned objects.
     *
     * @param {String} name The name of query source.
     * @return {Parse.Query} Returns the query, so you can chain this call.
     */

  }, {
    key: "fromPinWithName",
    value: function (name
    /*:: ?: string*/
    )
    /*: ParseQuery*/
    {
      var localDatastore = _CoreManager.default.getLocalDatastore();

      if (localDatastore.checkIfEnabled()) {
        this._queriesLocalDatastore = true;
        this._localDatastorePinName = name;
      }

      return this;
    }
  }], [{
    key: "fromJSON",
    value: function (className
    /*: string*/
    , json
    /*: QueryJSON*/
    )
    /*: ParseQuery*/
    {
      var query = new ParseQuery(className);
      return query.withJSON(json);
    }
  }, {
    key: "or",
    value: function ()
    /*: ParseQuery*/
    {
      for (var _len8 = arguments.length, queries = new Array(_len8), _key12 = 0; _key12 < _len8; _key12++) {
        queries[_key12] = arguments[_key12];
      }

      var className = _getClassNameFromQueries(queries);

      var query = new ParseQuery(className);

      query._orQuery(queries);

      return query;
    }
    /**
     * Constructs a Parse.Query that is the AND of the passed in queries.  For
     * example:
     * <pre>var compoundQuery = Parse.Query.and(query1, query2, query3);</pre>
     *
     * will create a compoundQuery that is an and of the query1, query2, and
     * query3.
     * @param {...Parse.Query} var_args The list of queries to AND.
     * @static
     * @return {Parse.Query} The query that is the AND of the passed in queries.
     */

  }, {
    key: "and",
    value: function ()
    /*: ParseQuery*/
    {
      for (var _len9 = arguments.length, queries = new Array(_len9), _key13 = 0; _key13 < _len9; _key13++) {
        queries[_key13] = arguments[_key13];
      }

      var className = _getClassNameFromQueries(queries);

      var query = new ParseQuery(className);

      query._andQuery(queries);

      return query;
    }
    /**
     * Constructs a Parse.Query that is the NOR of the passed in queries.  For
     * example:
     * <pre>const compoundQuery = Parse.Query.nor(query1, query2, query3);</pre>
     *
     * will create a compoundQuery that is a nor of the query1, query2, and
     * query3.
     * @param {...Parse.Query} var_args The list of queries to NOR.
     * @static
     * @return {Parse.Query} The query that is the NOR of the passed in queries.
     */

  }, {
    key: "nor",
    value: function ()
    /*: ParseQuery*/
    {
      for (var _len10 = arguments.length, queries = new Array(_len10), _key14 = 0; _key14 < _len10; _key14++) {
        queries[_key14] = arguments[_key14];
      }

      var className = _getClassNameFromQueries(queries);

      var query = new ParseQuery(className);

      query._norQuery(queries);

      return query;
    }
  }]);
  return ParseQuery;
}();

var DefaultController = {
  find: function (className
  /*: string*/
  , params
  /*: QueryJSON*/
  , options
  /*: RequestOptions*/
  )
  /*: Promise<Array<ParseObject>>*/
  {
    var RESTController = _CoreManager.default.getRESTController();

    return RESTController.request('GET', 'classes/' + className, params, options);
  },
  aggregate: function (className
  /*: string*/
  , params
  /*: any*/
  , options
  /*: RequestOptions*/
  )
  /*: Promise<Array<mixed>>*/
  {
    var RESTController = _CoreManager.default.getRESTController();

    return RESTController.request('GET', 'aggregate/' + className, params, options);
  }
};

_CoreManager.default.setQueryController(DefaultController);

var _default = ParseQuery;
exports.default = _default;
},{"./CoreManager":4,"./LocalDatastoreUtils":12,"./OfflineQuery":14,"./ParseError":18,"./ParseGeoPoint":20,"./ParseObject":23,"./encode":42,"./promiseUtils":47,"@babel/runtime-corejs3/core-js-stable/array/is-array":51,"@babel/runtime-corejs3/core-js-stable/instance/concat":53,"@babel/runtime-corejs3/core-js-stable/instance/filter":54,"@babel/runtime-corejs3/core-js-stable/instance/find":55,"@babel/runtime-corejs3/core-js-stable/instance/for-each":56,"@babel/runtime-corejs3/core-js-stable/instance/includes":57,"@babel/runtime-corejs3/core-js-stable/instance/index-of":58,"@babel/runtime-corejs3/core-js-stable/instance/keys":59,"@babel/runtime-corejs3/core-js-stable/instance/map":60,"@babel/runtime-corejs3/core-js-stable/instance/slice":61,"@babel/runtime-corejs3/core-js-stable/instance/sort":62,"@babel/runtime-corejs3/core-js-stable/instance/splice":63,"@babel/runtime-corejs3/core-js-stable/object/define-property":71,"@babel/runtime-corejs3/core-js-stable/object/keys":76,"@babel/runtime-corejs3/core-js-stable/promise":78,"@babel/runtime-corejs3/helpers/asyncToGenerator":102,"@babel/runtime-corejs3/helpers/classCallCheck":103,"@babel/runtime-corejs3/helpers/createClass":105,"@babel/runtime-corejs3/helpers/defineProperty":106,"@babel/runtime-corejs3/helpers/interopRequireDefault":110,"@babel/runtime-corejs3/helpers/typeof":122,"@babel/runtime-corejs3/regenerator":125}],27:[function(_dereq_,module,exports){
"use strict";

var _interopRequireDefault = _dereq_("@babel/runtime-corejs3/helpers/interopRequireDefault");

var _Object$defineProperty = _dereq_("@babel/runtime-corejs3/core-js-stable/object/define-property");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports.default = void 0;

var _isArray = _interopRequireDefault(_dereq_("@babel/runtime-corejs3/core-js-stable/array/is-array"));

var _classCallCheck2 = _interopRequireDefault(_dereq_("@babel/runtime-corejs3/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(_dereq_("@babel/runtime-corejs3/helpers/createClass"));

var _defineProperty2 = _interopRequireDefault(_dereq_("@babel/runtime-corejs3/helpers/defineProperty"));

var _ParseOp = _dereq_("./ParseOp");

var _ParseObject = _interopRequireDefault(_dereq_("./ParseObject"));

var _ParseQuery = _interopRequireDefault(_dereq_("./ParseQuery"));
/**
 * Copyright (c) 2015-present, Parse, LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @flow
 */

/**
 * Creates a new Relation for the given parent object and key. This
 * constructor should rarely be used directly, but rather created by
 * Parse.Object.relation.
 *
 * <p>
 * A class that is used to access all of the children of a many-to-many
 * relationship.  Each instance of Parse.Relation is associated with a
 * particular parent object and key.
 * </p>
 * @alias Parse.Relation
 */


var ParseRelation =
/*#__PURE__*/
function () {
  /**
   * @param {Parse.Object} parent The parent of this relation.
   * @param {String} key The key for this relation on the parent.
   */
  function ParseRelation(parent
  /*: ?ParseObject*/
  , key
  /*: ?string*/
  ) {
    (0, _classCallCheck2.default)(this, ParseRelation);
    (0, _defineProperty2.default)(this, "parent", void 0);
    (0, _defineProperty2.default)(this, "key", void 0);
    (0, _defineProperty2.default)(this, "targetClassName", void 0);
    this.parent = parent;
    this.key = key;
    this.targetClassName = null;
  }
  /*
   * Makes sure that this relation has the right parent and key.
   */


  (0, _createClass2.default)(ParseRelation, [{
    key: "_ensureParentAndKey",
    value: function (parent
    /*: ParseObject*/
    , key
    /*: string*/
    ) {
      this.key = this.key || key;

      if (this.key !== key) {
        throw new Error('Internal Error. Relation retrieved from two different keys.');
      }

      if (this.parent) {
        if (this.parent.className !== parent.className) {
          throw new Error('Internal Error. Relation retrieved from two different Objects.');
        }

        if (this.parent.id) {
          if (this.parent.id !== parent.id) {
            throw new Error('Internal Error. Relation retrieved from two different Objects.');
          }
        } else if (parent.id) {
          this.parent = parent;
        }
      } else {
        this.parent = parent;
      }
    }
    /**
     * Adds a Parse.Object or an array of Parse.Objects to the relation.
      * @param {} objects The item or items to add.
     */

  }, {
    key: "add",
    value: function (objects
    /*: ParseObject | Array<ParseObject | string>*/
    )
    /*: ParseObject*/
    {
      if (!(0, _isArray.default)(objects)) {
        objects = [objects];
      }

      var change = new _ParseOp.RelationOp(objects, []);
      var parent = this.parent;

      if (!parent) {
        throw new Error('Cannot add to a Relation without a parent');
      }

      parent.set(this.key, change);
      this.targetClassName = change._targetClassName;
      return parent;
    }
    /**
     * Removes a Parse.Object or an array of Parse.Objects from this relation.
      * @param {} objects The item or items to remove.
     */

  }, {
    key: "remove",
    value: function (objects
    /*: ParseObject | Array<ParseObject | string>*/
    ) {
      if (!(0, _isArray.default)(objects)) {
        objects = [objects];
      }

      var change = new _ParseOp.RelationOp([], objects);

      if (!this.parent) {
        throw new Error('Cannot remove from a Relation without a parent');
      }

      this.parent.set(this.key, change);
      this.targetClassName = change._targetClassName;
    }
    /**
     * Returns a JSON version of the object suitable for saving to disk.
      * @return {Object}
     */

  }, {
    key: "toJSON",
    value: function ()
    /*: { __type: 'Relation', className: ?string }*/
    {
      return {
        __type: 'Relation',
        className: this.targetClassName
      };
    }
    /**
     * Returns a Parse.Query that is limited to objects in this
     * relation.
      * @return {Parse.Query}
     */

  }, {
    key: "query",
    value: function query()
    /*: ParseQuery*/
    {
      var query;
      var parent = this.parent;

      if (!parent) {
        throw new Error('Cannot construct a query for a Relation without a parent');
      }

      if (!this.targetClassName) {
        query = new _ParseQuery.default(parent.className);
        query._extraOptions.redirectClassNameForKey = this.key;
      } else {
        query = new _ParseQuery.default(this.targetClassName);
      }

      query._addCondition('$relatedTo', 'object', {
        __type: 'Pointer',
        className: parent.className,
        objectId: parent.id
      });

      query._addCondition('$relatedTo', 'key', this.key);

      return query;
    }
  }]);
  return ParseRelation;
}();

var _default = ParseRelation;
exports.default = _default;
},{"./ParseObject":23,"./ParseOp":24,"./ParseQuery":26,"@babel/runtime-corejs3/core-js-stable/array/is-array":51,"@babel/runtime-corejs3/core-js-stable/object/define-property":71,"@babel/runtime-corejs3/helpers/classCallCheck":103,"@babel/runtime-corejs3/helpers/createClass":105,"@babel/runtime-corejs3/helpers/defineProperty":106,"@babel/runtime-corejs3/helpers/interopRequireDefault":110}],28:[function(_dereq_,module,exports){
"use strict";

var _interopRequireDefault = _dereq_("@babel/runtime-corejs3/helpers/interopRequireDefault");

var _Object$defineProperty = _dereq_("@babel/runtime-corejs3/core-js-stable/object/define-property");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(_dereq_("@babel/runtime-corejs3/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(_dereq_("@babel/runtime-corejs3/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(_dereq_("@babel/runtime-corejs3/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(_dereq_("@babel/runtime-corejs3/helpers/getPrototypeOf"));

var _get2 = _interopRequireDefault(_dereq_("@babel/runtime-corejs3/helpers/get"));

var _inherits2 = _interopRequireDefault(_dereq_("@babel/runtime-corejs3/helpers/inherits"));

var _ParseACL = _interopRequireDefault(_dereq_("./ParseACL"));

var _ParseError = _interopRequireDefault(_dereq_("./ParseError"));

var _ParseObject2 = _interopRequireDefault(_dereq_("./ParseObject"));
/**
 * Copyright (c) 2015-present, Parse, LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @flow
 */

/**
 * Represents a Role on the Parse server. Roles represent groupings of
 * Users for the purposes of granting permissions (e.g. specifying an ACL
 * for an Object). Roles are specified by their sets of child users and
 * child roles, all of which are granted any permissions that the parent
 * role has.
 *
 * <p>Roles must have a name (which cannot be changed after creation of the
 * role), and must specify an ACL.</p>
 * @alias Parse.Role
 * @extends Parse.Object
 */


var ParseRole =
/*#__PURE__*/
function (_ParseObject) {
  (0, _inherits2.default)(ParseRole, _ParseObject);
  /**
   * @param {String} name The name of the Role to create.
   * @param {Parse.ACL} acl The ACL for this role. Roles must have an ACL.
   * A Parse.Role is a local representation of a role persisted to the Parse
   * cloud.
   */

  function ParseRole(name
  /*: string*/
  , acl
  /*: ParseACL*/
  ) {
    var _this;

    (0, _classCallCheck2.default)(this, ParseRole);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(ParseRole).call(this, '_Role'));

    if (typeof name === 'string' && acl instanceof _ParseACL.default) {
      _this.setName(name);

      _this.setACL(acl);
    }

    return _this;
  }
  /**
   * Gets the name of the role.  You can alternatively call role.get("name")
   *
    * @return {String} the name of the role.
   */


  (0, _createClass2.default)(ParseRole, [{
    key: "getName",
    value: function ()
    /*: ?string*/
    {
      var name = this.get('name');

      if (name == null || typeof name === 'string') {
        return name;
      }

      return '';
    }
    /**
     * Sets the name for a role. This value must be set before the role has
     * been saved to the server, and cannot be set once the role has been
     * saved.
     *
     * <p>
     *   A role's name can only contain alphanumeric characters, _, -, and
     *   spaces.
     * </p>
     *
     * <p>This is equivalent to calling role.set("name", name)</p>
     *
      * @param {String} name The name of the role.
     * @param {Object} options Standard options object with success and error
     *     callbacks.
     */

  }, {
    key: "setName",
    value: function (name
    /*: string*/
    , options
    /*:: ?: mixed*/
    )
    /*: ParseObject | boolean*/
    {
      return this.set('name', name, options);
    }
    /**
     * Gets the Parse.Relation for the Parse.Users that are direct
     * children of this role. These users are granted any privileges that this
     * role has been granted (e.g. read or write access through ACLs). You can
     * add or remove users from the role through this relation.
     *
     * <p>This is equivalent to calling role.relation("users")</p>
     *
      * @return {Parse.Relation} the relation for the users belonging to this
     *     role.
     */

  }, {
    key: "getUsers",
    value: function ()
    /*: ParseRelation*/
    {
      return this.relation('users');
    }
    /**
     * Gets the Parse.Relation for the Parse.Roles that are direct
     * children of this role. These roles' users are granted any privileges that
     * this role has been granted (e.g. read or write access through ACLs). You
     * can add or remove child roles from this role through this relation.
     *
     * <p>This is equivalent to calling role.relation("roles")</p>
     *
      * @return {Parse.Relation} the relation for the roles belonging to this
     *     role.
     */

  }, {
    key: "getRoles",
    value: function ()
    /*: ParseRelation*/
    {
      return this.relation('roles');
    }
  }, {
    key: "validate",
    value: function (attrs
    /*: AttributeMap*/
    , options
    /*:: ?: mixed*/
    )
    /*: ParseError | boolean*/
    {
      var isInvalid = (0, _get2.default)((0, _getPrototypeOf2.default)(ParseRole.prototype), "validate", this).call(this, attrs, options);

      if (isInvalid) {
        return isInvalid;
      }

      if ('name' in attrs && attrs.name !== this.getName()) {
        var newName = attrs.name;

        if (this.id && this.id !== attrs.objectId) {
          // Check to see if the objectId being set matches this.id
          // This happens during a fetch -- the id is set before calling fetch
          // Let the name be set in this case
          return new _ParseError.default(_ParseError.default.OTHER_CAUSE, 'A role\'s name can only be set before it has been saved.');
        }

        if (typeof newName !== 'string') {
          return new _ParseError.default(_ParseError.default.OTHER_CAUSE, 'A role\'s name must be a String.');
        }

        if (!/^[0-9a-zA-Z\-_ ]+$/.test(newName)) {
          return new _ParseError.default(_ParseError.default.OTHER_CAUSE, 'A role\'s name can be only contain alphanumeric characters, _, ' + '-, and spaces.');
        }
      }

      return false;
    }
  }]);
  return ParseRole;
}(_ParseObject2.default);

_ParseObject2.default.registerSubclass('_Role', ParseRole);

var _default = ParseRole;
exports.default = _default;
},{"./ParseACL":16,"./ParseError":18,"./ParseObject":23,"@babel/runtime-corejs3/core-js-stable/object/define-property":71,"@babel/runtime-corejs3/helpers/classCallCheck":103,"@babel/runtime-corejs3/helpers/createClass":105,"@babel/runtime-corejs3/helpers/get":107,"@babel/runtime-corejs3/helpers/getPrototypeOf":108,"@babel/runtime-corejs3/helpers/inherits":109,"@babel/runtime-corejs3/helpers/interopRequireDefault":110,"@babel/runtime-corejs3/helpers/possibleConstructorReturn":117}],29:[function(_dereq_,module,exports){
"use strict";

var _interopRequireDefault = _dereq_("@babel/runtime-corejs3/helpers/interopRequireDefault");

var _Object$defineProperty = _dereq_("@babel/runtime-corejs3/core-js-stable/object/define-property");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports.default = void 0;

var _indexOf = _interopRequireDefault(_dereq_("@babel/runtime-corejs3/core-js-stable/instance/index-of"));

var _classCallCheck2 = _interopRequireDefault(_dereq_("@babel/runtime-corejs3/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(_dereq_("@babel/runtime-corejs3/helpers/createClass"));

var _defineProperty2 = _interopRequireDefault(_dereq_("@babel/runtime-corejs3/helpers/defineProperty"));

var _CoreManager = _interopRequireDefault(_dereq_("./CoreManager"));
/**
 * Copyright (c) 2015-present, Parse, LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @flow
 */


var FIELD_TYPES = ['String', 'Number', 'Boolean', 'Date', 'File', 'GeoPoint', 'Polygon', 'Array', 'Object', 'Pointer', 'Relation'];
/**
 * A Parse.Schema object is for handling schema data from Parse.
 * <p>All the schemas methods require MasterKey.
 *
 * <pre>
 * const schema = new Parse.Schema('MyClass');
 * schema.addString('field');
 * schema.addIndex('index_name', {'field', 1});
 * schema.save();
 * </pre>
 * </p>
 * @alias Parse.Schema
 */

var ParseSchema =
/*#__PURE__*/
function () {
  /**
   * @param {String} className Parse Class string.
   */
  function ParseSchema(className
  /*: string*/
  ) {
    (0, _classCallCheck2.default)(this, ParseSchema);
    (0, _defineProperty2.default)(this, "className", void 0);
    (0, _defineProperty2.default)(this, "_fields", void 0);
    (0, _defineProperty2.default)(this, "_indexes", void 0);

    if (typeof className === 'string') {
      if (className === 'User' && _CoreManager.default.get('PERFORM_USER_REWRITE')) {
        this.className = '_User';
      } else {
        this.className = className;
      }
    }

    this._fields = {};
    this._indexes = {};
  }
  /**
   * Static method to get all schemas
   *
   * @param {Object} options
   * Valid options are:<ul>
   *   <li>useMasterKey: In Cloud Code and Node only, causes the Master Key to
   *     be used for this request.
   *   <li>sessionToken: A valid session token, used for making a request on
   *       behalf of a specific user.
   * </ul>
   *
   * @return {Promise} A promise that is resolved with the result when
   * the query completes.
   */


  (0, _createClass2.default)(ParseSchema, [{
    key: "get",

    /**
     * Get the Schema from Parse
     *
     * @param {Object} options
     * Valid options are:<ul>
     *   <li>useMasterKey: In Cloud Code and Node only, causes the Master Key to
     *     be used for this request.
     *   <li>sessionToken: A valid session token, used for making a request on
     *       behalf of a specific user.
     * </ul>
     *
     * @return {Promise} A promise that is resolved with the result when
     * the query completes.
     */
    value: function (options
    /*: FullOptions*/
    ) {
      this.assertClassName();
      options = options || {};

      var controller = _CoreManager.default.getSchemaController();

      return controller.get(this.className, options).then(function (response) {
        if (!response) {
          throw new Error('Schema not found.');
        }

        return response;
      });
    }
    /**
     * Create a new Schema on Parse
     *
     * @param {Object} options
     * Valid options are:<ul>
     *   <li>useMasterKey: In Cloud Code and Node only, causes the Master Key to
     *     be used for this request.
     *   <li>sessionToken: A valid session token, used for making a request on
     *       behalf of a specific user.
     * </ul>
     *
     * @return {Promise} A promise that is resolved with the result when
     * the query completes.
     */

  }, {
    key: "save",
    value: function (options
    /*: FullOptions*/
    ) {
      this.assertClassName();
      options = options || {};

      var controller = _CoreManager.default.getSchemaController();

      var params = {
        className: this.className,
        fields: this._fields,
        indexes: this._indexes
      };
      return controller.create(this.className, params, options).then(function (response) {
        return response;
      });
    }
    /**
     * Update a Schema on Parse
     *
     * @param {Object} options
     * Valid options are:<ul>
     *   <li>useMasterKey: In Cloud Code and Node only, causes the Master Key to
     *     be used for this request.
     *   <li>sessionToken: A valid session token, used for making a request on
     *       behalf of a specific user.
     * </ul>
     *
     * @return {Promise} A promise that is resolved with the result when
     * the query completes.
     */

  }, {
    key: "update",
    value: function (options
    /*: FullOptions*/
    ) {
      this.assertClassName();
      options = options || {};

      var controller = _CoreManager.default.getSchemaController();

      var params = {
        className: this.className,
        fields: this._fields,
        indexes: this._indexes
      };
      this._fields = {};
      this._indexes = {};
      return controller.update(this.className, params, options).then(function (response) {
        return response;
      });
    }
    /**
     * Removing a Schema from Parse
     * Can only be used on Schema without objects
     *
     * @param {Object} options
     * Valid options are:<ul>
     *   <li>useMasterKey: In Cloud Code and Node only, causes the Master Key to
     *     be used for this request.
     *   <li>sessionToken: A valid session token, used for making a request on
     *       behalf of a specific user.
     * </ul>
     *
     * @return {Promise} A promise that is resolved with the result when
     * the query completes.
     */

  }, {
    key: "delete",
    value: function (options
    /*: FullOptions*/
    ) {
      this.assertClassName();
      options = options || {};

      var controller = _CoreManager.default.getSchemaController();

      return controller.delete(this.className, options).then(function (response) {
        return response;
      });
    }
    /**
     * Removes all objects from a Schema (class) in Parse.
     * EXERCISE CAUTION, running this will delete all objects for this schema and cannot be reversed
     * @return {Promise} A promise that is resolved with the result when
     * the query completes.
     */

  }, {
    key: "purge",
    value: function () {
      this.assertClassName();

      var controller = _CoreManager.default.getSchemaController();

      return controller.purge(this.className).then(function (response) {
        return response;
      });
    }
    /**
     * Assert if ClassName has been filled
     * @private
     */

  }, {
    key: "assertClassName",
    value: function () {
      if (!this.className) {
        throw new Error('You must set a Class Name before making any request.');
      }
    }
    /**
     * Adding a Field to Create / Update a Schema
     *
     * @param {String} name Name of the field that will be created on Parse
     * @param {String} type TheCan be a (String|Number|Boolean|Date|Parse.File|Parse.GeoPoint|Array|Object|Pointer|Parse.Relation)
     * @return {Parse.Schema} Returns the schema, so you can chain this call.
     */

  }, {
    key: "addField",
    value: function (name
    /*: string*/
    , type
    /*: string*/
    ) {
      type = type || 'String';

      if (!name) {
        throw new Error('field name may not be null.');
      }

      if ((0, _indexOf.default)(FIELD_TYPES).call(FIELD_TYPES, type) === -1) {
        throw new Error("".concat(type, " is not a valid type."));
      }

      this._fields[name] = {
        type: type
      };
      return this;
    }
    /**
     * Adding an Index to Create / Update a Schema
     *
     * @param {String} name Name of the field that will be created on Parse
     * @param {String} type Can be a (String|Number|Boolean|Date|Parse.File|Parse.GeoPoint|Array|Object|Pointer|Parse.Relation)
     * @return {Parse.Schema} Returns the schema, so you can chain this call.
     */

  }, {
    key: "addIndex",
    value: function (name
    /*: string*/
    , index
    /*: any*/
    ) {
      if (!name) {
        throw new Error('index name may not be null.');
      }

      if (!index) {
        throw new Error('index may not be null.');
      }

      this._indexes[name] = index;
      return this;
    }
    /**
     * Adding String Field
     *
     * @param {String} name Name of the field that will be created on Parse
     * @return {Parse.Schema} Returns the schema, so you can chain this call.
     */

  }, {
    key: "addString",
    value: function (name
    /*: string*/
    ) {
      return this.addField(name, 'String');
    }
    /**
     * Adding Number Field
     *
     * @param {String} name Name of the field that will be created on Parse
     * @return {Parse.Schema} Returns the schema, so you can chain this call.
     */

  }, {
    key: "addNumber",
    value: function (name
    /*: string*/
    ) {
      return this.addField(name, 'Number');
    }
    /**
     * Adding Boolean Field
     *
     * @param {String} name Name of the field that will be created on Parse
     * @return {Parse.Schema} Returns the schema, so you can chain this call.
     */

  }, {
    key: "addBoolean",
    value: function (name
    /*: string*/
    ) {
      return this.addField(name, 'Boolean');
    }
    /**
     * Adding Date Field
     *
     * @param {String} name Name of the field that will be created on Parse
     * @return {Parse.Schema} Returns the schema, so you can chain this call.
     */

  }, {
    key: "addDate",
    value: function (name
    /*: string*/
    ) {
      return this.addField(name, 'Date');
    }
    /**
     * Adding File Field
     *
     * @param {String} name Name of the field that will be created on Parse
     * @return {Parse.Schema} Returns the schema, so you can chain this call.
     */

  }, {
    key: "addFile",
    value: function (name
    /*: string*/
    ) {
      return this.addField(name, 'File');
    }
    /**
     * Adding GeoPoint Field
     *
     * @param {String} name Name of the field that will be created on Parse
     * @return {Parse.Schema} Returns the schema, so you can chain this call.
     */

  }, {
    key: "addGeoPoint",
    value: function (name
    /*: string*/
    ) {
      return this.addField(name, 'GeoPoint');
    }
    /**
     * Adding Polygon Field
     *
     * @param {String} name Name of the field that will be created on Parse
     * @return {Parse.Schema} Returns the schema, so you can chain this call.
     */

  }, {
    key: "addPolygon",
    value: function (name
    /*: string*/
    ) {
      return this.addField(name, 'Polygon');
    }
    /**
     * Adding Array Field
     *
     * @param {String} name Name of the field that will be created on Parse
     * @return {Parse.Schema} Returns the schema, so you can chain this call.
     */

  }, {
    key: "addArray",
    value: function (name
    /*: string*/
    ) {
      return this.addField(name, 'Array');
    }
    /**
     * Adding Object Field
     *
     * @param {String} name Name of the field that will be created on Parse
     * @return {Parse.Schema} Returns the schema, so you can chain this call.
     */

  }, {
    key: "addObject",
    value: function (name
    /*: string*/
    ) {
      return this.addField(name, 'Object');
    }
    /**
     * Adding Pointer Field
     *
     * @param {String} name Name of the field that will be created on Parse
     * @param {String} targetClass Name of the target Pointer Class
     * @return {Parse.Schema} Returns the schema, so you can chain this call.
     */

  }, {
    key: "addPointer",
    value: function (name
    /*: string*/
    , targetClass
    /*: string*/
    ) {
      if (!name) {
        throw new Error('field name may not be null.');
      }

      if (!targetClass) {
        throw new Error('You need to set the targetClass of the Pointer.');
      }

      this._fields[name] = {
        type: 'Pointer',
        targetClass: targetClass
      };
      return this;
    }
    /**
     * Adding Relation Field
     *
     * @param {String} name Name of the field that will be created on Parse
     * @param {String} targetClass Name of the target Pointer Class
     * @return {Parse.Schema} Returns the schema, so you can chain this call.
     */

  }, {
    key: "addRelation",
    value: function (name
    /*: string*/
    , targetClass
    /*: string*/
    ) {
      if (!name) {
        throw new Error('field name may not be null.');
      }

      if (!targetClass) {
        throw new Error('You need to set the targetClass of the Relation.');
      }

      this._fields[name] = {
        type: 'Relation',
        targetClass: targetClass
      };
      return this;
    }
    /**
     * Deleting a Field to Update on a Schema
     *
     * @param {String} name Name of the field that will be created on Parse
     * @param {String} targetClass Name of the target Pointer Class
     * @return {Parse.Schema} Returns the schema, so you can chain this call.
     */

  }, {
    key: "deleteField",
    value: function (name
    /*: string*/
    ) {
      this._fields[name] = {
        __op: 'Delete'
      };
    }
    /**
     * Deleting an Index to Update on a Schema
     *
     * @param {String} name Name of the field that will be created on Parse
     * @param {String} targetClass Name of the target Pointer Class
     * @return {Parse.Schema} Returns the schema, so you can chain this call.
     */

  }, {
    key: "deleteIndex",
    value: function (name
    /*: string*/
    ) {
      this._indexes[name] = {
        __op: 'Delete'
      };
    }
  }], [{
    key: "all",
    value: function (options
    /*: FullOptions*/
    ) {
      options = options || {};

      var controller = _CoreManager.default.getSchemaController();

      return controller.get('', options).then(function (response) {
        if (response.results.length === 0) {
          throw new Error('Schema not found.');
        }

        return response.results;
      });
    }
  }]);
  return ParseSchema;
}();

var DefaultController = {
  send: function (className
  /*: string*/
  , method
  /*: string*/
  , params
  /*: any*/
  , options
  /*: RequestOptions*/
  )
  /*: Promise*/
  {
    var RESTController = _CoreManager.default.getRESTController();

    var requestOptions = {
      useMasterKey: true
    };

    if (options.hasOwnProperty('sessionToken')) {
      requestOptions.sessionToken = options.sessionToken;
    }

    return RESTController.request(method, "schemas/".concat(className), params, requestOptions);
  },
  get: function (className
  /*: string*/
  , options
  /*: RequestOptions*/
  )
  /*: Promise*/
  {
    return this.send(className, 'GET', {}, options);
  },
  create: function (className
  /*: string*/
  , params
  /*: any*/
  , options
  /*: RequestOptions*/
  )
  /*: Promise*/
  {
    return this.send(className, 'POST', params, options);
  },
  update: function (className
  /*: string*/
  , params
  /*: any*/
  , options
  /*: RequestOptions*/
  )
  /*: Promise*/
  {
    return this.send(className, 'PUT', params, options);
  },
  delete: function (className
  /*: string*/
  , options
  /*: RequestOptions*/
  )
  /*: Promise*/
  {
    return this.send(className, 'DELETE', {}, options);
  },
  purge: function (className
  /*: string*/
  )
  /*: Promise*/
  {
    var RESTController = _CoreManager.default.getRESTController();

    return RESTController.request('DELETE', "purge/".concat(className), {}, {
      useMasterKey: true
    });
  }
};

_CoreManager.default.setSchemaController(DefaultController);

var _default = ParseSchema;
exports.default = _default;
},{"./CoreManager":4,"@babel/runtime-corejs3/core-js-stable/instance/index-of":58,"@babel/runtime-corejs3/core-js-stable/object/define-property":71,"@babel/runtime-corejs3/helpers/classCallCheck":103,"@babel/runtime-corejs3/helpers/createClass":105,"@babel/runtime-corejs3/helpers/defineProperty":106,"@babel/runtime-corejs3/helpers/interopRequireDefault":110}],30:[function(_dereq_,module,exports){
"use strict";

var _interopRequireDefault = _dereq_("@babel/runtime-corejs3/helpers/interopRequireDefault");

var _Object$defineProperty = _dereq_("@babel/runtime-corejs3/core-js-stable/object/define-property");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports.default = void 0;

var _promise = _interopRequireDefault(_dereq_("@babel/runtime-corejs3/core-js-stable/promise"));

var _typeof2 = _interopRequireDefault(_dereq_("@babel/runtime-corejs3/helpers/typeof"));

var _classCallCheck2 = _interopRequireDefault(_dereq_("@babel/runtime-corejs3/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(_dereq_("@babel/runtime-corejs3/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(_dereq_("@babel/runtime-corejs3/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(_dereq_("@babel/runtime-corejs3/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(_dereq_("@babel/runtime-corejs3/helpers/inherits"));

var _CoreManager = _interopRequireDefault(_dereq_("./CoreManager"));

var _isRevocableSession = _interopRequireDefault(_dereq_("./isRevocableSession"));

var _ParseObject2 = _interopRequireDefault(_dereq_("./ParseObject"));

var _ParseUser = _interopRequireDefault(_dereq_("./ParseUser"));
/**
 * Copyright (c) 2015-present, Parse, LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @flow
 */

/**
 * <p>A Parse.Session object is a local representation of a revocable session.
 * This class is a subclass of a Parse.Object, and retains the same
 * functionality of a Parse.Object.</p>
 * @alias Parse.Session
 * @extends Parse.Object
 */


var ParseSession =
/*#__PURE__*/
function (_ParseObject) {
  (0, _inherits2.default)(ParseSession, _ParseObject);
  /**
   *
   * @param {Object} attributes The initial set of data to store in the user.
   */

  function ParseSession(attributes
  /*: ?AttributeMap*/
  ) {
    var _this;

    (0, _classCallCheck2.default)(this, ParseSession);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(ParseSession).call(this, '_Session'));

    if (attributes && (0, _typeof2.default)(attributes) === 'object') {
      if (!_this.set(attributes || {})) {
        throw new Error('Can\'t create an invalid Session');
      }
    }

    return _this;
  }
  /**
   * Returns the session token string.
    * @return {String}
   */


  (0, _createClass2.default)(ParseSession, [{
    key: "getSessionToken",
    value: function ()
    /*: string*/
    {
      var token = this.get('sessionToken');

      if (typeof token === 'string') {
        return token;
      }

      return '';
    }
  }], [{
    key: "readOnlyAttributes",
    value: function () {
      return ['createdWith', 'expiresAt', 'installationId', 'restricted', 'sessionToken', 'user'];
    }
    /**
     * Retrieves the Session object for the currently logged in session.
      * @static
     * @return {Promise} A promise that is resolved with the Parse.Session
     *   object after it has been fetched. If there is no current user, the
     *   promise will be rejected.
     */

  }, {
    key: "current",
    value: function (options
    /*: FullOptions*/
    ) {
      options = options || {};

      var controller = _CoreManager.default.getSessionController();

      var sessionOptions = {};

      if (options.hasOwnProperty('useMasterKey')) {
        sessionOptions.useMasterKey = options.useMasterKey;
      }

      return _ParseUser.default.currentAsync().then(function (user) {
        if (!user) {
          return _promise.default.reject('There is no current user.');
        }

        sessionOptions.sessionToken = user.getSessionToken();
        return controller.getSession(sessionOptions);
      });
    }
    /**
     * Determines whether the current session token is revocable.
     * This method is useful for migrating Express.js or Node.js web apps to
     * use revocable sessions. If you are migrating an app that uses the Parse
     * SDK in the browser only, please use Parse.User.enableRevocableSession()
     * instead, so that sessions can be automatically upgraded.
      * @static
     * @return {Boolean}
     */

  }, {
    key: "isCurrentSessionRevocable",
    value: function ()
    /*: boolean*/
    {
      var currentUser = _ParseUser.default.current();

      if (currentUser) {
        return (0, _isRevocableSession.default)(currentUser.getSessionToken() || '');
      }

      return false;
    }
  }]);
  return ParseSession;
}(_ParseObject2.default);

_ParseObject2.default.registerSubclass('_Session', ParseSession);

var DefaultController = {
  getSession: function (options
  /*: RequestOptions*/
  )
  /*: Promise<ParseSession>*/
  {
    var RESTController = _CoreManager.default.getRESTController();

    var session = new ParseSession();
    return RESTController.request('GET', 'sessions/me', {}, options).then(function (sessionData) {
      session._finishFetch(sessionData);

      session._setExisted(true);

      return session;
    });
  }
};

_CoreManager.default.setSessionController(DefaultController);

var _default = ParseSession;
exports.default = _default;
},{"./CoreManager":4,"./ParseObject":23,"./ParseUser":31,"./isRevocableSession":45,"@babel/runtime-corejs3/core-js-stable/object/define-property":71,"@babel/runtime-corejs3/core-js-stable/promise":78,"@babel/runtime-corejs3/helpers/classCallCheck":103,"@babel/runtime-corejs3/helpers/createClass":105,"@babel/runtime-corejs3/helpers/getPrototypeOf":108,"@babel/runtime-corejs3/helpers/inherits":109,"@babel/runtime-corejs3/helpers/interopRequireDefault":110,"@babel/runtime-corejs3/helpers/possibleConstructorReturn":117,"@babel/runtime-corejs3/helpers/typeof":122}],31:[function(_dereq_,module,exports){
"use strict";

var _interopRequireDefault = _dereq_("@babel/runtime-corejs3/helpers/interopRequireDefault");

var _Object$defineProperty2 = _dereq_("@babel/runtime-corejs3/core-js-stable/object/define-property");

_Object$defineProperty2(exports, "__esModule", {
  value: true
});

exports.default = void 0;

var _stringify = _interopRequireDefault(_dereq_("@babel/runtime-corejs3/core-js-stable/json/stringify"));

var _defineProperty = _interopRequireDefault(_dereq_("@babel/runtime-corejs3/core-js-stable/object/define-property"));

var _promise = _interopRequireDefault(_dereq_("@babel/runtime-corejs3/core-js-stable/promise"));

var _typeof2 = _interopRequireDefault(_dereq_("@babel/runtime-corejs3/helpers/typeof"));

var _classCallCheck2 = _interopRequireDefault(_dereq_("@babel/runtime-corejs3/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(_dereq_("@babel/runtime-corejs3/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(_dereq_("@babel/runtime-corejs3/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(_dereq_("@babel/runtime-corejs3/helpers/getPrototypeOf"));

var _get2 = _interopRequireDefault(_dereq_("@babel/runtime-corejs3/helpers/get"));

var _inherits2 = _interopRequireDefault(_dereq_("@babel/runtime-corejs3/helpers/inherits"));

var _AnonymousUtils = _interopRequireDefault(_dereq_("./AnonymousUtils"));

var _CoreManager = _interopRequireDefault(_dereq_("./CoreManager"));

var _isRevocableSession = _interopRequireDefault(_dereq_("./isRevocableSession"));

var _ParseError = _interopRequireDefault(_dereq_("./ParseError"));

var _ParseObject2 = _interopRequireDefault(_dereq_("./ParseObject"));

var _ParseSession = _interopRequireDefault(_dereq_("./ParseSession"));

var _Storage = _interopRequireDefault(_dereq_("./Storage"));
/**
 * Copyright (c) 2015-present, Parse, LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @flow
 */


var CURRENT_USER_KEY = 'currentUser';
var canUseCurrentUser = !_CoreManager.default.get('IS_NODE');
var currentUserCacheMatchesDisk = false;
var currentUserCache = null;
var authProviders = {};
/**
 * <p>A Parse.User object is a local representation of a user persisted to the
 * Parse cloud. This class is a subclass of a Parse.Object, and retains the
 * same functionality of a Parse.Object, but also extends it with various
 * user specific methods, like authentication, signing up, and validation of
 * uniqueness.</p>
 * @alias Parse.User
 * @extends Parse.Object
 */

var ParseUser =
/*#__PURE__*/
function (_ParseObject) {
  (0, _inherits2.default)(ParseUser, _ParseObject);
  /**
   * @param {Object} attributes The initial set of data to store in the user.
   */

  function ParseUser(attributes
  /*: ?AttributeMap*/
  ) {
    var _this;

    (0, _classCallCheck2.default)(this, ParseUser);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(ParseUser).call(this, '_User'));

    if (attributes && (0, _typeof2.default)(attributes) === 'object') {
      if (!_this.set(attributes || {})) {
        throw new Error('Can\'t create an invalid Parse User');
      }
    }

    return _this;
  }
  /**
   * Request a revocable session token to replace the older style of token.
    * @param {Object} options
   * @return {Promise} A promise that is resolved when the replacement
   *   token has been fetched.
   */


  (0, _createClass2.default)(ParseUser, [{
    key: "_upgradeToRevocableSession",
    value: function (options
    /*: RequestOptions*/
    )
    /*: Promise<void>*/
    {
      options = options || {};
      var upgradeOptions = {};

      if (options.hasOwnProperty('useMasterKey')) {
        upgradeOptions.useMasterKey = options.useMasterKey;
      }

      var controller = _CoreManager.default.getUserController();

      return controller.upgradeToRevocableSession(this, upgradeOptions);
    }
    /**
     * Unlike in the Android/iOS SDKs, logInWith is unnecessary, since you can
     * call linkWith on the user (even if it doesn't exist yet on the server).
     */

  }, {
    key: "_linkWith",
    value: function (provider
    /*: any*/
    , options
    /*: { authData?: AuthData }*/
    )
    /*: Promise<ParseUser>*/
    {
      var _this2 = this;

      var saveOpts
      /*:: ?: FullOptions*/
      = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      saveOpts.sessionToken = saveOpts.sessionToken || this.getSessionToken() || '';
      var authType;

      if (typeof provider === 'string') {
        authType = provider;

        if (authProviders[provider]) {
          provider = authProviders[provider];
        } else {
          var authProvider = {
            restoreAuthentication: function () {
              return true;
            },
            getAuthType: function () {
              return authType;
            }
          };
          authProviders[authType] = authProvider;
          provider = authProvider;
        }
      } else {
        authType = provider.getAuthType();
      }

      if (options && options.hasOwnProperty('authData')) {
        var authData = this.get('authData') || {};

        if ((0, _typeof2.default)(authData) !== 'object') {
          throw new Error('Invalid type: authData field should be an object');
        }

        authData[authType] = options.authData;

        var controller = _CoreManager.default.getUserController();

        return controller.linkWith(this, authData, saveOpts);
      } else {
        return new _promise.default(function (resolve, reject) {
          provider.authenticate({
            success: function (provider, result) {
              var opts = {};
              opts.authData = result;

              _this2._linkWith(provider, opts, saveOpts).then(function () {
                resolve(_this2);
              }, function (error) {
                reject(error);
              });
            },
            error: function (provider, _error) {
              reject(_error);
            }
          });
        });
      }
    }
    /**
     * Synchronizes auth data for a provider (e.g. puts the access token in the
     * right place to be used by the Facebook SDK).
     */

  }, {
    key: "_synchronizeAuthData",
    value: function (provider
    /*: string*/
    ) {
      if (!this.isCurrent() || !provider) {
        return;
      }

      var authType;

      if (typeof provider === 'string') {
        authType = provider;
        provider = authProviders[authType];
      } else {
        authType = provider.getAuthType();
      }

      var authData = this.get('authData');

      if (!provider || !authData || (0, _typeof2.default)(authData) !== 'object') {
        return;
      }

      var success = provider.restoreAuthentication(authData[authType]);

      if (!success) {
        this._unlinkFrom(provider);
      }
    }
    /**
     * Synchronizes authData for all providers.
      */

  }, {
    key: "_synchronizeAllAuthData",
    value: function () {
      var authData = this.get('authData');

      if ((0, _typeof2.default)(authData) !== 'object') {
        return;
      }

      for (var _key in authData) {
        this._synchronizeAuthData(_key);
      }
    }
    /**
     * Removes null values from authData (which exist temporarily for
     * unlinking)
      */

  }, {
    key: "_cleanupAuthData",
    value: function () {
      if (!this.isCurrent()) {
        return;
      }

      var authData = this.get('authData');

      if ((0, _typeof2.default)(authData) !== 'object') {
        return;
      }

      for (var _key2 in authData) {
        if (!authData[_key2]) {
          delete authData[_key2];
        }
      }
    }
    /**
     * Unlinks a user from a service.
     */

  }, {
    key: "_unlinkFrom",
    value: function (provider
    /*: any*/
    , options
    /*:: ?: FullOptions*/
    ) {
      var _this3 = this;

      if (typeof provider === 'string') {
        provider = authProviders[provider];
      }

      return this._linkWith(provider, {
        authData: null
      }, options).then(function () {
        _this3._synchronizeAuthData(provider);

        return _promise.default.resolve(_this3);
      });
    }
    /**
     * Checks whether a user is linked to a service.
      */

  }, {
    key: "_isLinked",
    value: function (provider
    /*: any*/
    )
    /*: boolean*/
    {
      var authType;

      if (typeof provider === 'string') {
        authType = provider;
      } else {
        authType = provider.getAuthType();
      }

      var authData = this.get('authData') || {};

      if ((0, _typeof2.default)(authData) !== 'object') {
        return false;
      }

      return !!authData[authType];
    }
    /**
     * Deauthenticates all providers.
      */

  }, {
    key: "_logOutWithAll",
    value: function () {
      var authData = this.get('authData');

      if ((0, _typeof2.default)(authData) !== 'object') {
        return;
      }

      for (var _key3 in authData) {
        this._logOutWith(_key3);
      }
    }
    /**
     * Deauthenticates a single provider (e.g. removing access tokens from the
     * Facebook SDK).
      */

  }, {
    key: "_logOutWith",
    value: function (provider
    /*: any*/
    ) {
      if (!this.isCurrent()) {
        return;
      }

      if (typeof provider === 'string') {
        provider = authProviders[provider];
      }

      if (provider && provider.deauthenticate) {
        provider.deauthenticate();
      }
    }
    /**
     * Class instance method used to maintain specific keys when a fetch occurs.
     * Used to ensure that the session token is not lost.
     */

  }, {
    key: "_preserveFieldsOnFetch",
    value: function ()
    /*: AttributeMap*/
    {
      return {
        sessionToken: this.get('sessionToken')
      };
    }
    /**
     * Returns true if <code>current</code> would return this user.
      * @return {Boolean}
     */

  }, {
    key: "isCurrent",
    value: function ()
    /*: boolean*/
    {
      var current = ParseUser.current();
      return !!current && current.id === this.id;
    }
    /**
     * Returns get("username").
      * @return {String}
     */

  }, {
    key: "getUsername",
    value: function ()
    /*: ?string*/
    {
      var username = this.get('username');

      if (username == null || typeof username === 'string') {
        return username;
      }

      return '';
    }
    /**
     * Calls set("username", username, options) and returns the result.
      * @param {String} username
     * @param {Object} options
     * @return {Boolean}
     */

  }, {
    key: "setUsername",
    value: function (username
    /*: string*/
    ) {
      // Strip anonymity, even we do not support anonymous user in js SDK, we may
      // encounter anonymous user created by android/iOS in cloud code.
      var authData = this.get('authData');

      if (authData && (0, _typeof2.default)(authData) === 'object' && authData.hasOwnProperty('anonymous')) {
        // We need to set anonymous to null instead of deleting it in order to remove it from Parse.
        authData.anonymous = null;
      }

      this.set('username', username);
    }
    /**
     * Calls set("password", password, options) and returns the result.
      * @param {String} password
     * @param {Object} options
     * @return {Boolean}
     */

  }, {
    key: "setPassword",
    value: function (password
    /*: string*/
    ) {
      this.set('password', password);
    }
    /**
     * Returns get("email").
      * @return {String}
     */

  }, {
    key: "getEmail",
    value: function ()
    /*: ?string*/
    {
      var email = this.get('email');

      if (email == null || typeof email === 'string') {
        return email;
      }

      return '';
    }
    /**
     * Calls set("email", email) and returns the result.
      * @param {String} email
     * @return {Boolean}
     */

  }, {
    key: "setEmail",
    value: function (email
    /*: string*/
    ) {
      return this.set('email', email);
    }
    /**
     * Returns the session token for this user, if the user has been logged in,
     * or if it is the result of a query with the master key. Otherwise, returns
     * undefined.
      * @return {String} the session token, or undefined
     */

  }, {
    key: "getSessionToken",
    value: function ()
    /*: ?string*/
    {
      var token = this.get('sessionToken');

      if (token == null || typeof token === 'string') {
        return token;
      }

      return '';
    }
    /**
     * Checks whether this user is the current user and has been authenticated.
      * @return (Boolean) whether this user is the current user and is logged in.
     */

  }, {
    key: "authenticated",
    value: function ()
    /*: boolean*/
    {
      var current = ParseUser.current();
      return !!this.get('sessionToken') && !!current && current.id === this.id;
    }
    /**
     * Signs up a new user. You should call this instead of save for
     * new Parse.Users. This will create a new Parse.User on the server, and
     * also persist the session on disk so that you can access the user using
     * <code>current</code>.
     *
     * <p>A username and password must be set before calling signUp.</p>
     *
     * <p>Calls options.success or options.error on completion.</p>
     *
      * @param {Object} attrs Extra fields to set on the new user, or null.
     * @param {Object} options
     * @return {Promise} A promise that is fulfilled when the signup
     *     finishes.
     */

  }, {
    key: "signUp",
    value: function (attrs
    /*: AttributeMap*/
    , options
    /*:: ?: FullOptions*/
    )
    /*: Promise<ParseUser>*/
    {
      options = options || {};
      var signupOptions = {};

      if (options.hasOwnProperty('useMasterKey')) {
        signupOptions.useMasterKey = options.useMasterKey;
      }

      if (options.hasOwnProperty('installationId')) {
        signupOptions.installationId = options.installationId;
      }

      var controller = _CoreManager.default.getUserController();

      return controller.signUp(this, attrs, signupOptions);
    }
    /**
     * Logs in a Parse.User. On success, this saves the session to disk,
     * so you can retrieve the currently logged in user using
     * <code>current</code>.
     *
     * <p>A username and password must be set before calling logIn.</p>
     *
     * <p>Calls options.success or options.error on completion.</p>
     *
      * @param {Object} options
     * @return {Promise} A promise that is fulfilled with the user when
     *     the login is complete.
     */

  }, {
    key: "logIn",
    value: function (options
    /*:: ?: FullOptions*/
    )
    /*: Promise<ParseUser>*/
    {
      options = options || {};
      var loginOptions = {};

      if (options.hasOwnProperty('useMasterKey')) {
        loginOptions.useMasterKey = options.useMasterKey;
      }

      if (options.hasOwnProperty('installationId')) {
        loginOptions.installationId = options.installationId;
      }

      var controller = _CoreManager.default.getUserController();

      return controller.logIn(this, loginOptions);
    }
    /**
     * Wrap the default save behavior with functionality to save to local
     * storage if this is current user.
     */

  }, {
    key: "save",
    value: function ()
    /*: Promise<ParseUser>*/
    {
      var _this4 = this;

      for (var _len = arguments.length, args = new Array(_len), _key4 = 0; _key4 < _len; _key4++) {
        args[_key4] = arguments[_key4];
      }

      return (0, _get2.default)((0, _getPrototypeOf2.default)(ParseUser.prototype), "save", this).apply(this, args).then(function () {
        if (_this4.isCurrent()) {
          return _CoreManager.default.getUserController().updateUserOnDisk(_this4);
        }

        return _this4;
      });
    }
    /**
     * Wrap the default destroy behavior with functionality that logs out
     * the current user when it is destroyed
     */

  }, {
    key: "destroy",
    value: function ()
    /*: Promise<ParseUser>*/
    {
      var _this5 = this;

      for (var _len2 = arguments.length, args = new Array(_len2), _key5 = 0; _key5 < _len2; _key5++) {
        args[_key5] = arguments[_key5];
      }

      return (0, _get2.default)((0, _getPrototypeOf2.default)(ParseUser.prototype), "destroy", this).apply(this, args).then(function () {
        if (_this5.isCurrent()) {
          return _CoreManager.default.getUserController().removeUserFromDisk();
        }

        return _this5;
      });
    }
    /**
     * Wrap the default fetch behavior with functionality to save to local
     * storage if this is current user.
     */

  }, {
    key: "fetch",
    value: function ()
    /*: Promise<ParseUser>*/
    {
      var _this6 = this;

      for (var _len3 = arguments.length, args = new Array(_len3), _key6 = 0; _key6 < _len3; _key6++) {
        args[_key6] = arguments[_key6];
      }

      return (0, _get2.default)((0, _getPrototypeOf2.default)(ParseUser.prototype), "fetch", this).apply(this, args).then(function () {
        if (_this6.isCurrent()) {
          return _CoreManager.default.getUserController().updateUserOnDisk(_this6);
        }

        return _this6;
      });
    }
    /**
     * Wrap the default fetchWithInclude behavior with functionality to save to local
     * storage if this is current user.
     */

  }, {
    key: "fetchWithInclude",
    value: function ()
    /*: Promise<ParseUser>*/
    {
      var _this7 = this;

      for (var _len4 = arguments.length, args = new Array(_len4), _key7 = 0; _key7 < _len4; _key7++) {
        args[_key7] = arguments[_key7];
      }

      return (0, _get2.default)((0, _getPrototypeOf2.default)(ParseUser.prototype), "fetchWithInclude", this).apply(this, args).then(function () {
        if (_this7.isCurrent()) {
          return _CoreManager.default.getUserController().updateUserOnDisk(_this7);
        }

        return _this7;
      });
    }
  }], [{
    key: "readOnlyAttributes",
    value: function () {
      return ['sessionToken'];
    }
    /**
     * Adds functionality to the existing Parse.User class
      * @param {Object} protoProps A set of properties to add to the prototype
     * @param {Object} classProps A set of static properties to add to the class
     * @static
     * @return {Class} The newly extended Parse.User class
     */

  }, {
    key: "extend",
    value: function (protoProps
    /*: {[prop: string]: any}*/
    , classProps
    /*: {[prop: string]: any}*/
    ) {
      if (protoProps) {
        for (var _prop in protoProps) {
          if (_prop !== 'className') {
            (0, _defineProperty.default)(ParseUser.prototype, _prop, {
              value: protoProps[_prop],
              enumerable: false,
              writable: true,
              configurable: true
            });
          }
        }
      }

      if (classProps) {
        for (var _prop2 in classProps) {
          if (_prop2 !== 'className') {
            (0, _defineProperty.default)(ParseUser, _prop2, {
              value: classProps[_prop2],
              enumerable: false,
              writable: true,
              configurable: true
            });
          }
        }
      }

      return ParseUser;
    }
    /**
     * Retrieves the currently logged in ParseUser with a valid session,
     * either from memory or localStorage, if necessary.
      * @static
     * @return {Parse.Object} The currently logged in Parse.User.
     */

  }, {
    key: "current",
    value: function ()
    /*: ?ParseUser*/
    {
      if (!canUseCurrentUser) {
        return null;
      }

      var controller = _CoreManager.default.getUserController();

      return controller.currentUser();
    }
    /**
     * Retrieves the currently logged in ParseUser from asynchronous Storage.
      * @static
     * @return {Promise} A Promise that is resolved with the currently
     *   logged in Parse User
     */

  }, {
    key: "currentAsync",
    value: function ()
    /*: Promise<?ParseUser>*/
    {
      if (!canUseCurrentUser) {
        return _promise.default.resolve(null);
      }

      var controller = _CoreManager.default.getUserController();

      return controller.currentUserAsync();
    }
    /**
     * Signs up a new user with a username (or email) and password.
     * This will create a new Parse.User on the server, and also persist the
     * session in localStorage so that you can access the user using
     * {@link #current}.
     *
     * <p>Calls options.success or options.error on completion.</p>
     *
      * @param {String} username The username (or email) to sign up with.
     * @param {String} password The password to sign up with.
     * @param {Object} attrs Extra fields to set on the new user.
     * @param {Object} options
     * @static
     * @return {Promise} A promise that is fulfilled with the user when
     *     the signup completes.
     */

  }, {
    key: "signUp",
    value: function (username
    /*: string*/
    , password
    /*: string*/
    , attrs
    /*: AttributeMap*/
    , options
    /*:: ?: FullOptions*/
    ) {
      attrs = attrs || {};
      attrs.username = username;
      attrs.password = password;
      var user = new this(attrs);
      return user.signUp({}, options);
    }
    /**
     * Logs in a user with a username (or email) and password. On success, this
     * saves the session to disk, so you can retrieve the currently logged in
     * user using <code>current</code>.
     *
     * <p>Calls options.success or options.error on completion.</p>
     *
      * @param {String} username The username (or email) to log in with.
     * @param {String} password The password to log in with.
     * @param {Object} options
     * @static
     * @return {Promise} A promise that is fulfilled with the user when
     *     the login completes.
     */

  }, {
    key: "logIn",
    value: function (username
    /*: string*/
    , password
    /*: string*/
    , options
    /*:: ?: FullOptions*/
    ) {
      if (typeof username !== 'string') {
        return _promise.default.reject(new _ParseError.default(_ParseError.default.OTHER_CAUSE, 'Username must be a string.'));
      } else if (typeof password !== 'string') {
        return _promise.default.reject(new _ParseError.default(_ParseError.default.OTHER_CAUSE, 'Password must be a string.'));
      }

      var user = new this();

      user._finishFetch({
        username: username,
        password: password
      });

      return user.logIn(options);
    }
    /**
     * Logs in a user with a session token. On success, this saves the session
     * to disk, so you can retrieve the currently logged in user using
     * <code>current</code>.
     *
     * <p>Calls options.success or options.error on completion.</p>
     *
      * @param {String} sessionToken The sessionToken to log in with.
     * @param {Object} options
     * @static
     * @return {Promise} A promise that is fulfilled with the user when
     *     the login completes.
     */

  }, {
    key: "become",
    value: function (sessionToken
    /*: string*/
    , options
    /*:: ?: RequestOptions*/
    ) {
      if (!canUseCurrentUser) {
        throw new Error('It is not memory-safe to become a user in a server environment');
      }

      options = options || {};
      var becomeOptions
      /*: RequestOptions*/
      = {
        sessionToken: sessionToken
      };

      if (options.hasOwnProperty('useMasterKey')) {
        becomeOptions.useMasterKey = options.useMasterKey;
      }

      var controller = _CoreManager.default.getUserController();

      var user = new this();
      return controller.become(user, becomeOptions);
    }
    /**
     * Retrieves a user with a session token.
     *
     * @param {String} sessionToken The sessionToken to get user with.
     * @param {Object} options
     * @static
     * @return {Promise} A promise that is fulfilled with the user is fetched.
     */

  }, {
    key: "me",
    value: function (sessionToken
    /*: string*/
    ) {
      var options
      /*:: ?: RequestOptions*/
      = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      var controller = _CoreManager.default.getUserController();

      var meOptions
      /*: RequestOptions*/
      = {
        sessionToken: sessionToken
      };

      if (options.useMasterKey) {
        meOptions.useMasterKey = options.useMasterKey;
      }

      return controller.me(meOptions);
    }
    /**
     * Logs in a user with a session token. On success, this saves the session
     * to disk, so you can retrieve the currently logged in user using
     * <code>current</code>. If there is no session token the user will not logged in.
     *
     * @param {Object} userJSON The JSON map of the User's data
     * @static
     * @return {Promise} A promise that is fulfilled with the user when
     *     the login completes.
     */

  }, {
    key: "hydrate",
    value: function (userJSON
    /*: AttributeMap*/
    ) {
      var controller = _CoreManager.default.getUserController();

      return controller.hydrate(userJSON);
    }
  }, {
    key: "logInWith",
    value: function (provider
    /*: any*/
    , options
    /*: { authData?: AuthData }*/
    , saveOpts
    /*:: ?: FullOptions*/
    ) {
      return ParseUser._logInWith(provider, options, saveOpts);
    }
    /**
     * Logs out the currently logged in user session. This will remove the
     * session from disk, log out of linked services, and future calls to
     * <code>current</code> will return <code>null</code>.
     *
     * @param {Object} options
     * @static
     * @return {Promise} A promise that is resolved when the session is
     *   destroyed on the server.
     */

  }, {
    key: "logOut",
    value: function () {
      var options
      /*: RequestOptions*/
      = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      var controller = _CoreManager.default.getUserController();

      return controller.logOut(options);
    }
    /**
     * Requests a password reset email to be sent to the specified email address
     * associated with the user account. This email allows the user to securely
     * reset their password on the Parse site.
     *
     * <p>Calls options.success or options.error on completion.</p>
     *
      * @param {String} email The email address associated with the user that
     *     forgot their password.
     * @param {Object} options
     * @static
     * @returns {Promise}
     */

  }, {
    key: "requestPasswordReset",
    value: function (email
    /*: string*/
    , options
    /*:: ?: RequestOptions*/
    ) {
      options = options || {};
      var requestOptions = {};

      if (options.hasOwnProperty('useMasterKey')) {
        requestOptions.useMasterKey = options.useMasterKey;
      }

      var controller = _CoreManager.default.getUserController();

      return controller.requestPasswordReset(email, requestOptions);
    }
    /**
     * Allow someone to define a custom User class without className
     * being rewritten to _User. The default behavior is to rewrite
     * User to _User for legacy reasons. This allows developers to
     * override that behavior.
     *
      * @param {Boolean} isAllowed Whether or not to allow custom User class
     * @static
     */

  }, {
    key: "allowCustomUserClass",
    value: function (isAllowed
    /*: boolean*/
    ) {
      _CoreManager.default.set('PERFORM_USER_REWRITE', !isAllowed);
    }
    /**
     * Allows a legacy application to start using revocable sessions. If the
     * current session token is not revocable, a request will be made for a new,
     * revocable session.
     * It is not necessary to call this method from cloud code unless you are
     * handling user signup or login from the server side. In a cloud code call,
     * this function will not attempt to upgrade the current token.
      * @param {Object} options
     * @static
     * @return {Promise} A promise that is resolved when the process has
     *   completed. If a replacement session token is requested, the promise
     *   will be resolved after a new token has been fetched.
     */

  }, {
    key: "enableRevocableSession",
    value: function (options
    /*:: ?: RequestOptions*/
    ) {
      options = options || {};

      _CoreManager.default.set('FORCE_REVOCABLE_SESSION', true);

      if (canUseCurrentUser) {
        var current = ParseUser.current();

        if (current) {
          return current._upgradeToRevocableSession(options);
        }
      }

      return _promise.default.resolve();
    }
    /**
     * Enables the use of become or the current user in a server
     * environment. These features are disabled by default, since they depend on
     * global objects that are not memory-safe for most servers.
      * @static
     */

  }, {
    key: "enableUnsafeCurrentUser",
    value: function () {
      canUseCurrentUser = true;
    }
    /**
     * Disables the use of become or the current user in any environment.
     * These features are disabled on servers by default, since they depend on
     * global objects that are not memory-safe for most servers.
      * @static
     */

  }, {
    key: "disableUnsafeCurrentUser",
    value: function () {
      canUseCurrentUser = false;
    }
  }, {
    key: "_registerAuthenticationProvider",
    value: function (provider
    /*: any*/
    ) {
      authProviders[provider.getAuthType()] = provider; // Synchronize the current user with the auth provider.

      ParseUser.currentAsync().then(function (current) {
        if (current) {
          current._synchronizeAuthData(provider.getAuthType());
        }
      });
    }
  }, {
    key: "_logInWith",
    value: function (provider
    /*: any*/
    , options
    /*: { authData?: AuthData }*/
    , saveOpts
    /*:: ?: FullOptions*/
    ) {
      var user = new ParseUser();
      return user._linkWith(provider, options, saveOpts);
    }
  }, {
    key: "_clearCache",
    value: function () {
      currentUserCache = null;
      currentUserCacheMatchesDisk = false;
    }
  }, {
    key: "_setCurrentUserCache",
    value: function (user
    /*: ParseUser*/
    ) {
      currentUserCache = user;
    }
  }]);
  return ParseUser;
}(_ParseObject2.default);

_ParseObject2.default.registerSubclass('_User', ParseUser);

var DefaultController = {
  updateUserOnDisk: function (user) {
    var path = _Storage.default.generatePath(CURRENT_USER_KEY);

    var json = user.toJSON();
    json.className = '_User';
    return _Storage.default.setItemAsync(path, (0, _stringify.default)(json)).then(function () {
      return user;
    });
  },
  removeUserFromDisk: function () {
    var path = _Storage.default.generatePath(CURRENT_USER_KEY);

    currentUserCacheMatchesDisk = true;
    currentUserCache = null;
    return _Storage.default.removeItemAsync(path);
  },
  setCurrentUser: function (user) {
    var currentUser = this.currentUser();

    var promise = _promise.default.resolve();

    if (currentUser && !user.equals(currentUser) && _AnonymousUtils.default.isLinked(currentUser)) {
      promise = currentUser.destroy({
        sessionToken: currentUser.getSessionToken()
      });
    }

    currentUserCache = user;

    user._cleanupAuthData();

    user._synchronizeAllAuthData();

    return promise.then(function () {
      return DefaultController.updateUserOnDisk(user);
    });
  },
  currentUser: function ()
  /*: ?ParseUser*/
  {
    if (currentUserCache) {
      return currentUserCache;
    }

    if (currentUserCacheMatchesDisk) {
      return null;
    }

    if (_Storage.default.async()) {
      throw new Error('Cannot call currentUser() when using a platform with an async ' + 'storage system. Call currentUserAsync() instead.');
    }

    var path = _Storage.default.generatePath(CURRENT_USER_KEY);

    var userData = _Storage.default.getItem(path);

    currentUserCacheMatchesDisk = true;

    if (!userData) {
      currentUserCache = null;
      return null;
    }

    userData = JSON.parse(userData);

    if (!userData.className) {
      userData.className = '_User';
    }

    if (userData._id) {
      if (userData.objectId !== userData._id) {
        userData.objectId = userData._id;
      }

      delete userData._id;
    }

    if (userData._sessionToken) {
      userData.sessionToken = userData._sessionToken;
      delete userData._sessionToken;
    }

    var current = _ParseObject2.default.fromJSON(userData);

    currentUserCache = current;

    current._synchronizeAllAuthData();

    return current;
  },
  currentUserAsync: function ()
  /*: Promise<?ParseUser>*/
  {
    if (currentUserCache) {
      return _promise.default.resolve(currentUserCache);
    }

    if (currentUserCacheMatchesDisk) {
      return _promise.default.resolve(null);
    }

    var path = _Storage.default.generatePath(CURRENT_USER_KEY);

    return _Storage.default.getItemAsync(path).then(function (userData) {
      currentUserCacheMatchesDisk = true;

      if (!userData) {
        currentUserCache = null;
        return _promise.default.resolve(null);
      }

      userData = JSON.parse(userData);

      if (!userData.className) {
        userData.className = '_User';
      }

      if (userData._id) {
        if (userData.objectId !== userData._id) {
          userData.objectId = userData._id;
        }

        delete userData._id;
      }

      if (userData._sessionToken) {
        userData.sessionToken = userData._sessionToken;
        delete userData._sessionToken;
      }

      var current = _ParseObject2.default.fromJSON(userData);

      currentUserCache = current;

      current._synchronizeAllAuthData();

      return _promise.default.resolve(current);
    });
  },
  signUp: function (user
  /*: ParseUser*/
  , attrs
  /*: AttributeMap*/
  , options
  /*: RequestOptions*/
  )
  /*: Promise<ParseUser>*/
  {
    var username = attrs && attrs.username || user.get('username');
    var password = attrs && attrs.password || user.get('password');

    if (!username || !username.length) {
      return _promise.default.reject(new _ParseError.default(_ParseError.default.OTHER_CAUSE, 'Cannot sign up user with an empty name.'));
    }

    if (!password || !password.length) {
      return _promise.default.reject(new _ParseError.default(_ParseError.default.OTHER_CAUSE, 'Cannot sign up user with an empty password.'));
    }

    return user.save(attrs, options).then(function () {
      // Clear the password field
      user._finishFetch({
        password: undefined
      });

      if (canUseCurrentUser) {
        return DefaultController.setCurrentUser(user);
      }

      return user;
    });
  },
  logIn: function (user
  /*: ParseUser*/
  , options
  /*: RequestOptions*/
  )
  /*: Promise<ParseUser>*/
  {
    var RESTController = _CoreManager.default.getRESTController();

    var stateController = _CoreManager.default.getObjectStateController();

    var auth = {
      username: user.get('username'),
      password: user.get('password')
    };
    return RESTController.request('GET', 'login', auth, options).then(function (response) {
      user._migrateId(response.objectId);

      user._setExisted(true);

      stateController.setPendingOp(user._getStateIdentifier(), 'username', undefined);
      stateController.setPendingOp(user._getStateIdentifier(), 'password', undefined);
      response.password = undefined;

      user._finishFetch(response);

      if (!canUseCurrentUser) {
        // We can't set the current user, so just return the one we logged in
        return _promise.default.resolve(user);
      }

      return DefaultController.setCurrentUser(user);
    });
  },
  become: function (user
  /*: ParseUser*/
  , options
  /*: RequestOptions*/
  )
  /*: Promise<ParseUser>*/
  {
    var RESTController = _CoreManager.default.getRESTController();

    return RESTController.request('GET', 'users/me', {}, options).then(function (response) {
      user._finishFetch(response);

      user._setExisted(true);

      return DefaultController.setCurrentUser(user);
    });
  },
  hydrate: function (userJSON
  /*: AttributeMap*/
  )
  /*: Promise<ParseUser>*/
  {
    var user = new ParseUser();

    user._finishFetch(userJSON);

    user._setExisted(true);

    if (userJSON.sessionToken && canUseCurrentUser) {
      return DefaultController.setCurrentUser(user);
    } else {
      return _promise.default.resolve(user);
    }
  },
  me: function (options
  /*: RequestOptions*/
  )
  /*: Promise<ParseUser>*/
  {
    var RESTController = _CoreManager.default.getRESTController();

    return RESTController.request('GET', 'users/me', {}, options).then(function (response) {
      var user = new ParseUser();

      user._finishFetch(response);

      user._setExisted(true);

      return user;
    });
  },
  logOut: function (options
  /*: RequestOptions*/
  )
  /*: Promise<ParseUser>*/
  {
    var RESTController = _CoreManager.default.getRESTController();

    if (options.sessionToken) {
      return RESTController.request('POST', 'logout', {}, options);
    }

    return DefaultController.currentUserAsync().then(function (currentUser) {
      var path = _Storage.default.generatePath(CURRENT_USER_KEY);

      var promise = _Storage.default.removeItemAsync(path);

      if (currentUser !== null) {
        var isAnonymous = _AnonymousUtils.default.isLinked(currentUser);

        var currentSession = currentUser.getSessionToken();

        if (currentSession && (0, _isRevocableSession.default)(currentSession)) {
          promise = promise.then(function () {
            if (isAnonymous) {
              return currentUser.destroy({
                sessionToken: currentSession
              });
            }
          }).then(function () {
            return RESTController.request('POST', 'logout', {}, {
              sessionToken: currentSession
            });
          });
        }

        currentUser._logOutWithAll();

        currentUser._finishFetch({
          sessionToken: undefined
        });
      }

      currentUserCacheMatchesDisk = true;
      currentUserCache = null;
      return promise;
    });
  },
  requestPasswordReset: function (email
  /*: string*/
  , options
  /*: RequestOptions*/
  ) {
    var RESTController = _CoreManager.default.getRESTController();

    return RESTController.request('POST', 'requestPasswordReset', {
      email: email
    }, options);
  },
  upgradeToRevocableSession: function (user
  /*: ParseUser*/
  , options
  /*: RequestOptions*/
  ) {
    var token = user.getSessionToken();

    if (!token) {
      return _promise.default.reject(new _ParseError.default(_ParseError.default.SESSION_MISSING, 'Cannot upgrade a user with no session token'));
    }

    options.sessionToken = token;

    var RESTController = _CoreManager.default.getRESTController();

    return RESTController.request('POST', 'upgradeToRevocableSession', {}, options).then(function (result) {
      var session = new _ParseSession.default();

      session._finishFetch(result);

      user._finishFetch({
        sessionToken: session.getSessionToken()
      });

      if (user.isCurrent()) {
        return DefaultController.setCurrentUser(user);
      }

      return _promise.default.resolve(user);
    });
  },
  linkWith: function (user
  /*: ParseUser*/
  , authData
  /*: AuthData*/
  , options
  /*: FullOptions*/
  ) {
    return user.save({
      authData: authData
    }, options).then(function () {
      if (canUseCurrentUser) {
        return DefaultController.setCurrentUser(user);
      }

      return user;
    });
  }
};

_CoreManager.default.setUserController(DefaultController);

var _default = ParseUser;
exports.default = _default;
},{"./AnonymousUtils":2,"./CoreManager":4,"./ParseError":18,"./ParseObject":23,"./ParseSession":30,"./Storage":35,"./isRevocableSession":45,"@babel/runtime-corejs3/core-js-stable/json/stringify":66,"@babel/runtime-corejs3/core-js-stable/object/define-property":71,"@babel/runtime-corejs3/core-js-stable/promise":78,"@babel/runtime-corejs3/helpers/classCallCheck":103,"@babel/runtime-corejs3/helpers/createClass":105,"@babel/runtime-corejs3/helpers/get":107,"@babel/runtime-corejs3/helpers/getPrototypeOf":108,"@babel/runtime-corejs3/helpers/inherits":109,"@babel/runtime-corejs3/helpers/interopRequireDefault":110,"@babel/runtime-corejs3/helpers/possibleConstructorReturn":117,"@babel/runtime-corejs3/helpers/typeof":122}],32:[function(_dereq_,module,exports){
"use strict";

var _interopRequireDefault = _dereq_("@babel/runtime-corejs3/helpers/interopRequireDefault");

var _Object$defineProperty = _dereq_("@babel/runtime-corejs3/core-js-stable/object/define-property");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports.send = send;

var _typeof2 = _interopRequireDefault(_dereq_("@babel/runtime-corejs3/helpers/typeof"));

var _CoreManager = _interopRequireDefault(_dereq_("./CoreManager"));

var _ParseQuery = _interopRequireDefault(_dereq_("./ParseQuery"));
/**
 * Copyright (c) 2015-present, Parse, LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @flow
 */

/**
 * Contains functions to deal with Push in Parse.
 * @class Parse.Push
 * @static
 * @hideconstructor
 */

/**
  * Sends a push notification.
  * @method send
  * @name Parse.Push.send
  * @param {Object} data -  The data of the push notification.  Valid fields
  * are:
  *   <ol>
  *     <li>channels - An Array of channels to push to.</li>
  *     <li>push_time - A Date object for when to send the push.</li>
  *     <li>expiration_time -  A Date object for when to expire
  *         the push.</li>
  *     <li>expiration_interval - The seconds from now to expire the push.</li>
  *     <li>where - A Parse.Query over Parse.Installation that is used to match
  *         a set of installations to push to.</li>
  *     <li>data - The data to send as part of the push</li>
  *   <ol>
  * @param {Object} options An object that has an optional success function,
  * that takes no arguments and will be called on a successful push, and
  * an error function that takes a Parse.Error and will be called if the push
  * failed.
  * @return {Promise} A promise that is fulfilled when the push request
  *     completes.
  */


function send(data
/*: PushData*/
, options
/*:: ?: { useMasterKey?: boolean, success?: any, error?: any }*/
)
/*: Promise*/
{
  options = options || {};

  if (data.where && data.where instanceof _ParseQuery.default) {
    data.where = data.where.toJSON().where;
  }

  if (data.push_time && (0, _typeof2.default)(data.push_time) === 'object') {
    data.push_time = data.push_time.toJSON();
  }

  if (data.expiration_time && (0, _typeof2.default)(data.expiration_time) === 'object') {
    data.expiration_time = data.expiration_time.toJSON();
  }

  if (data.expiration_time && data.expiration_interval) {
    throw new Error('expiration_time and expiration_interval cannot both be set.');
  }

  return _CoreManager.default.getPushController().send(data, {
    useMasterKey: options.useMasterKey
  });
}

var DefaultController = {
  send: function (data
  /*: PushData*/
  , options
  /*: RequestOptions*/
  ) {
    var RESTController = _CoreManager.default.getRESTController();

    var request = RESTController.request('POST', 'push', data, {
      useMasterKey: !!options.useMasterKey
    });
    return request;
  }
};

_CoreManager.default.setPushController(DefaultController);
},{"./CoreManager":4,"./ParseQuery":26,"@babel/runtime-corejs3/core-js-stable/object/define-property":71,"@babel/runtime-corejs3/helpers/interopRequireDefault":110,"@babel/runtime-corejs3/helpers/typeof":122}],33:[function(_dereq_,module,exports){
(function (process){
"use strict";

var _interopRequireDefault = _dereq_("@babel/runtime-corejs3/helpers/interopRequireDefault");

var _defineProperty2 = _interopRequireDefault(_dereq_("@babel/runtime-corejs3/core-js-stable/object/define-property"));

var _defineProperties = _interopRequireDefault(_dereq_("@babel/runtime-corejs3/core-js-stable/object/define-properties"));

var _getOwnPropertyDescriptors = _interopRequireDefault(_dereq_("@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptors"));

var _forEach = _interopRequireDefault(_dereq_("@babel/runtime-corejs3/core-js-stable/instance/for-each"));

var _getOwnPropertyDescriptor = _interopRequireDefault(_dereq_("@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptor"));

var _filter = _interopRequireDefault(_dereq_("@babel/runtime-corejs3/core-js-stable/instance/filter"));

var _getOwnPropertySymbols = _interopRequireDefault(_dereq_("@babel/runtime-corejs3/core-js-stable/object/get-own-property-symbols"));

var _keys = _interopRequireDefault(_dereq_("@babel/runtime-corejs3/core-js-stable/object/keys"));

var _defineProperty3 = _interopRequireDefault(_dereq_("@babel/runtime-corejs3/helpers/defineProperty"));

var _typeof2 = _interopRequireDefault(_dereq_("@babel/runtime-corejs3/helpers/typeof"));

var _setTimeout2 = _interopRequireDefault(_dereq_("@babel/runtime-corejs3/core-js-stable/set-timeout"));

var _includes = _interopRequireDefault(_dereq_("@babel/runtime-corejs3/core-js-stable/instance/includes"));

var _stringify = _interopRequireDefault(_dereq_("@babel/runtime-corejs3/core-js-stable/json/stringify"));

var _promise = _interopRequireDefault(_dereq_("@babel/runtime-corejs3/core-js-stable/promise"));

var _CoreManager = _interopRequireDefault(_dereq_("./CoreManager"));

var _ParseError = _interopRequireDefault(_dereq_("./ParseError"));

function ownKeys(object, enumerableOnly) {
  var keys = (0, _keys.default)(object);

  if (_getOwnPropertySymbols.default) {
    var symbols = (0, _getOwnPropertySymbols.default)(object);
    if (enumerableOnly) symbols = (0, _filter.default)(symbols).call(symbols, function (sym) {
      return (0, _getOwnPropertyDescriptor.default)(object, sym).enumerable;
    });
    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      var _context2;

      (0, _forEach.default)(_context2 = ownKeys(source, true)).call(_context2, function (key) {
        (0, _defineProperty3.default)(target, key, source[key]);
      });
    } else if (_getOwnPropertyDescriptors.default) {
      (0, _defineProperties.default)(target, (0, _getOwnPropertyDescriptors.default)(source));
    } else {
      var _context3;

      (0, _forEach.default)(_context3 = ownKeys(source)).call(_context3, function (key) {
        (0, _defineProperty2.default)(target, key, (0, _getOwnPropertyDescriptor.default)(source, key));
      });
    }
  }

  return target;
}

var XHR = null;

if (typeof XMLHttpRequest !== 'undefined') {
  XHR = XMLHttpRequest;
}

var useXDomainRequest = false;

if (typeof XDomainRequest !== 'undefined' && !('withCredentials' in new XMLHttpRequest())) {
  useXDomainRequest = true;
}

function ajaxIE9(method
/*: string*/
, url
/*: string*/
, data
/*: any*/
, options
/*:: ?: FullOptions*/
) {
  return new _promise.default(function (resolve, reject) {
    var xdr = new XDomainRequest();

    xdr.onload = function () {
      var response;

      try {
        response = JSON.parse(xdr.responseText);
      } catch (e) {
        reject(e);
      }

      if (response) {
        resolve({
          response: response
        });
      }
    };

    xdr.onerror = xdr.ontimeout = function () {
      // Let's fake a real error message.
      var fakeResponse = {
        responseText: (0, _stringify.default)({
          code: _ParseError.default.X_DOMAIN_REQUEST,
          error: 'IE\'s XDomainRequest does not supply error info.'
        })
      };
      reject(fakeResponse);
    };

    xdr.onprogress = function () {
      if (options && typeof options.progress === 'function') {
        options.progress(xdr.responseText);
      }
    };

    xdr.open(method, url);
    xdr.send(data);
  });
}

var RESTController = {
  ajax: function (method
  /*: string*/
  , url
  /*: string*/
  , data
  /*: any*/
  , headers
  /*:: ?: any*/
  , options
  /*:: ?: FullOptions*/
  ) {
    if (useXDomainRequest) {
      return ajaxIE9(method, url, data, headers, options);
    }

    var res, rej;
    var promise = new _promise.default(function (resolve, reject) {
      res = resolve;
      rej = reject;
    });
    promise.resolve = res;
    promise.reject = rej;
    var attempts = 0;

    var dispatch = function dispatch() {
      if (XHR == null) {
        throw new Error('Cannot make a request: No definition of XMLHttpRequest was found.');
      }

      var handled = false;
      var xhr = new XHR();

      xhr.onreadystatechange = function () {
        if (xhr.readyState !== 4 || handled) {
          return;
        }

        handled = true;

        if (xhr.status >= 200 && xhr.status < 300) {
          var response;

          try {
            response = JSON.parse(xhr.responseText);

            if (typeof xhr.getResponseHeader === 'function') {
              var _context;

              if ((0, _includes.default)(_context = xhr.getAllResponseHeaders() || '').call(_context, 'x-parse-job-status-id: ')) {
                response = xhr.getResponseHeader('x-parse-job-status-id');
              }
            }
          } catch (e) {
            promise.reject(e.toString());
          }

          if (response) {
            promise.resolve({
              response: response,
              status: xhr.status,
              xhr: xhr
            });
          }
        } else if (xhr.status >= 500 || xhr.status === 0) {
          // retry on 5XX or node-xmlhttprequest error
          if (++attempts < _CoreManager.default.get('REQUEST_ATTEMPT_LIMIT')) {
            // Exponentially-growing random delay
            var delay = Math.round(Math.random() * 125 * Math.pow(2, attempts));
            (0, _setTimeout2.default)(dispatch, delay);
          } else if (xhr.status === 0) {
            promise.reject('Unable to connect to the Parse API');
          } else {
            // After the retry limit is reached, fail
            promise.reject(xhr);
          }
        } else {
          promise.reject(xhr);
        }
      };

      headers = headers || {};

      if (typeof headers['Content-Type'] !== 'string') {
        headers['Content-Type'] = 'text/plain'; // Avoid pre-flight
      }

      if (_CoreManager.default.get('IS_NODE')) {
        headers['User-Agent'] = 'Parse/' + _CoreManager.default.get('VERSION') + ' (NodeJS ' + process.versions.node + ')';
      }

      if (_CoreManager.default.get('SERVER_AUTH_TYPE') && _CoreManager.default.get('SERVER_AUTH_TOKEN')) {
        headers['Authorization'] = _CoreManager.default.get('SERVER_AUTH_TYPE') + ' ' + _CoreManager.default.get('SERVER_AUTH_TOKEN');
      }

      if (options && typeof options.progress === 'function') {
        if (xhr.upload) {
          xhr.upload.addEventListener('progress', function (oEvent) {
            if (oEvent.lengthComputable) {
              options.progress(oEvent.loaded / oEvent.total);
            } else {
              options.progress(null);
            }
          });
        } else if (xhr.addEventListener) {
          xhr.addEventListener('progress', function (oEvent) {
            if (oEvent.lengthComputable) {
              options.progress(oEvent.loaded / oEvent.total);
            } else {
              options.progress(null);
            }
          });
        }
      }

      xhr.open(method, url, true);

      for (var h in headers) {
        xhr.setRequestHeader(h, headers[h]);
      }

      xhr.send(data);
    };

    dispatch();
    return promise;
  },
  request: function (method
  /*: string*/
  , path
  /*: string*/
  , data
  /*: mixed*/
  , options
  /*:: ?: RequestOptions*/
  ) {
    options = options || {};

    var url = _CoreManager.default.get('SERVER_URL');

    if (url[url.length - 1] !== '/') {
      url += '/';
    }

    url += path;
    var payload = {};

    if (data && (0, _typeof2.default)(data) === 'object') {
      for (var k in data) {
        payload[k] = data[k];
      }
    }

    if (method !== 'POST') {
      payload._method = method;
      method = 'POST';
    }

    payload._ApplicationId = _CoreManager.default.get('APPLICATION_ID');

    var jsKey = _CoreManager.default.get('JAVASCRIPT_KEY');

    if (jsKey) {
      payload._JavaScriptKey = jsKey;
    }

    payload._ClientVersion = _CoreManager.default.get('VERSION');
    var useMasterKey = options.useMasterKey;

    if (typeof useMasterKey === 'undefined') {
      useMasterKey = _CoreManager.default.get('USE_MASTER_KEY');
    }

    if (useMasterKey) {
      if (_CoreManager.default.get('MASTER_KEY')) {
        delete payload._JavaScriptKey;
        payload._MasterKey = _CoreManager.default.get('MASTER_KEY');
      } else {
        throw new Error('Cannot use the Master Key, it has not been provided.');
      }
    }

    if (_CoreManager.default.get('FORCE_REVOCABLE_SESSION')) {
      payload._RevocableSession = '1';
    }

    var installationId = options.installationId;
    var installationIdPromise;

    if (installationId && typeof installationId === 'string') {
      installationIdPromise = _promise.default.resolve(installationId);
    } else {
      var installationController = _CoreManager.default.getInstallationController();

      installationIdPromise = installationController.currentInstallationId();
    }

    return installationIdPromise.then(function (iid) {
      payload._InstallationId = iid;

      var userController = _CoreManager.default.getUserController();

      if (options && typeof options.sessionToken === 'string') {
        return _promise.default.resolve(options.sessionToken);
      } else if (userController) {
        return userController.currentUserAsync().then(function (user) {
          if (user) {
            return _promise.default.resolve(user.getSessionToken());
          }

          return _promise.default.resolve(null);
        });
      }

      return _promise.default.resolve(null);
    }).then(function (token) {
      if (token) {
        payload._SessionToken = token;
      }

      var payloadString = (0, _stringify.default)(payload);
      return RESTController.ajax(method, url, payloadString, {}, options).then(function (_ref) {
        var response = _ref.response,
            status = _ref.status;

        if (options.returnStatus) {
          return _objectSpread({}, response, {
            _status: status
          });
        } else {
          return response;
        }
      });
    }).catch(function (response
    /*: { responseText: string }*/
    ) {
      // Transform the error into an instance of ParseError by trying to parse
      // the error string as JSON
      var error;

      if (response && response.responseText) {
        try {
          var errorJSON = JSON.parse(response.responseText);
          error = new _ParseError.default(errorJSON.code, errorJSON.error);
        } catch (e) {
          // If we fail to parse the error text, that's okay.
          error = new _ParseError.default(_ParseError.default.INVALID_JSON, 'Received an error with invalid JSON from Parse: ' + response.responseText);
        }
      } else {
        error = new _ParseError.default(_ParseError.default.CONNECTION_FAILED, 'XMLHttpRequest failed: ' + (0, _stringify.default)(response));
      }

      return _promise.default.reject(error);
    });
  },
  _setXHR: function (xhr
  /*: any*/
  ) {
    XHR = xhr;
  }
};
module.exports = RESTController;
}).call(this,_dereq_('_process'))
},{"./CoreManager":4,"./ParseError":18,"@babel/runtime-corejs3/core-js-stable/instance/filter":54,"@babel/runtime-corejs3/core-js-stable/instance/for-each":56,"@babel/runtime-corejs3/core-js-stable/instance/includes":57,"@babel/runtime-corejs3/core-js-stable/json/stringify":66,"@babel/runtime-corejs3/core-js-stable/object/define-properties":70,"@babel/runtime-corejs3/core-js-stable/object/define-property":71,"@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptor":73,"@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptors":74,"@babel/runtime-corejs3/core-js-stable/object/get-own-property-symbols":75,"@babel/runtime-corejs3/core-js-stable/object/keys":76,"@babel/runtime-corejs3/core-js-stable/promise":78,"@babel/runtime-corejs3/core-js-stable/set-timeout":79,"@babel/runtime-corejs3/helpers/defineProperty":106,"@babel/runtime-corejs3/helpers/interopRequireDefault":110,"@babel/runtime-corejs3/helpers/typeof":122,"_process":126}],34:[function(_dereq_,module,exports){
"use strict";

var _interopRequireWildcard = _dereq_("@babel/runtime-corejs3/helpers/interopRequireWildcard");

var _Object$defineProperty = _dereq_("@babel/runtime-corejs3/core-js-stable/object/define-property");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports.getState = getState;
exports.initializeState = initializeState;
exports.removeState = removeState;
exports.getServerData = getServerData;
exports.setServerData = setServerData;
exports.getPendingOps = getPendingOps;
exports.setPendingOp = setPendingOp;
exports.pushPendingState = pushPendingState;
exports.popPendingState = popPendingState;
exports.mergeFirstPendingState = mergeFirstPendingState;
exports.getObjectCache = getObjectCache;
exports.estimateAttribute = estimateAttribute;
exports.estimateAttributes = estimateAttributes;
exports.commitServerChanges = commitServerChanges;
exports.enqueueTask = enqueueTask;
exports.clearAllState = clearAllState;
exports.duplicateState = duplicateState;

var ObjectStateMutations = _interopRequireWildcard(_dereq_("./ObjectStateMutations"));
/**
 * Copyright (c) 2015-present, Parse, LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @flow
 */


var objectState
/*: {
  [className: string]: {
    [id: string]: State
  }
}*/
= {};

function getState(obj
/*: ObjectIdentifier*/
)
/*: ?State*/
{
  var classData = objectState[obj.className];

  if (classData) {
    return classData[obj.id] || null;
  }

  return null;
}

function initializeState(obj
/*: ObjectIdentifier*/
, initial
/*:: ?: State*/
)
/*: State*/
{
  var state = getState(obj);

  if (state) {
    return state;
  }

  if (!objectState[obj.className]) {
    objectState[obj.className] = {};
  }

  if (!initial) {
    initial = ObjectStateMutations.defaultState();
  }

  state = objectState[obj.className][obj.id] = initial;
  return state;
}

function removeState(obj
/*: ObjectIdentifier*/
)
/*: ?State*/
{
  var state = getState(obj);

  if (state === null) {
    return null;
  }

  delete objectState[obj.className][obj.id];
  return state;
}

function getServerData(obj
/*: ObjectIdentifier*/
)
/*: AttributeMap*/
{
  var state = getState(obj);

  if (state) {
    return state.serverData;
  }

  return {};
}

function setServerData(obj
/*: ObjectIdentifier*/
, attributes
/*: AttributeMap*/
) {
  var serverData = initializeState(obj).serverData;
  ObjectStateMutations.setServerData(serverData, attributes);
}

function getPendingOps(obj
/*: ObjectIdentifier*/
)
/*: Array<OpsMap>*/
{
  var state = getState(obj);

  if (state) {
    return state.pendingOps;
  }

  return [{}];
}

function setPendingOp(obj
/*: ObjectIdentifier*/
, attr
/*: string*/
, op
/*: ?Op*/
) {
  var pendingOps = initializeState(obj).pendingOps;
  ObjectStateMutations.setPendingOp(pendingOps, attr, op);
}

function pushPendingState(obj
/*: ObjectIdentifier*/
) {
  var pendingOps = initializeState(obj).pendingOps;
  ObjectStateMutations.pushPendingState(pendingOps);
}

function popPendingState(obj
/*: ObjectIdentifier*/
)
/*: OpsMap*/
{
  var pendingOps = initializeState(obj).pendingOps;
  return ObjectStateMutations.popPendingState(pendingOps);
}

function mergeFirstPendingState(obj
/*: ObjectIdentifier*/
) {
  var pendingOps = getPendingOps(obj);
  ObjectStateMutations.mergeFirstPendingState(pendingOps);
}

function getObjectCache(obj
/*: ObjectIdentifier*/
)
/*: ObjectCache*/
{
  var state = getState(obj);

  if (state) {
    return state.objectCache;
  }

  return {};
}

function estimateAttribute(obj
/*: ObjectIdentifier*/
, attr
/*: string*/
)
/*: mixed*/
{
  var serverData = getServerData(obj);
  var pendingOps = getPendingOps(obj);
  return ObjectStateMutations.estimateAttribute(serverData, pendingOps, obj.className, obj.id, attr);
}

function estimateAttributes(obj
/*: ObjectIdentifier*/
)
/*: AttributeMap*/
{
  var serverData = getServerData(obj);
  var pendingOps = getPendingOps(obj);
  return ObjectStateMutations.estimateAttributes(serverData, pendingOps, obj.className, obj.id);
}

function commitServerChanges(obj
/*: ObjectIdentifier*/
, changes
/*: AttributeMap*/
) {
  var state = initializeState(obj);
  ObjectStateMutations.commitServerChanges(state.serverData, state.objectCache, changes);
}

function enqueueTask(obj
/*: ObjectIdentifier*/
, task
/*: () => Promise*/
)
/*: Promise*/
{
  var state = initializeState(obj);
  return state.tasks.enqueue(task);
}

function clearAllState() {
  objectState = {};
}

function duplicateState(source
/*: {id: string}*/
, dest
/*: {id: string}*/
) {
  dest.id = source.id;
}
},{"./ObjectStateMutations":13,"@babel/runtime-corejs3/core-js-stable/object/define-property":71,"@babel/runtime-corejs3/helpers/interopRequireWildcard":111}],35:[function(_dereq_,module,exports){
"use strict";

var _interopRequireDefault = _dereq_("@babel/runtime-corejs3/helpers/interopRequireDefault");

var _promise = _interopRequireDefault(_dereq_("@babel/runtime-corejs3/core-js-stable/promise"));

var _CoreManager = _interopRequireDefault(_dereq_("./CoreManager"));
/**
 * Copyright (c) 2015-present, Parse, LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @flow
 */


var Storage = {
  async: function ()
  /*: boolean*/
  {
    var controller = _CoreManager.default.getStorageController();

    return !!controller.async;
  },
  getItem: function (path
  /*: string*/
  )
  /*: ?string*/
  {
    var controller = _CoreManager.default.getStorageController();

    if (controller.async === 1) {
      throw new Error('Synchronous storage is not supported by the current storage controller');
    }

    return controller.getItem(path);
  },
  getItemAsync: function (path
  /*: string*/
  )
  /*: Promise<string>*/
  {
    var controller = _CoreManager.default.getStorageController();

    if (controller.async === 1) {
      return controller.getItemAsync(path);
    }

    return _promise.default.resolve(controller.getItem(path));
  },
  setItem: function (path
  /*: string*/
  , value
  /*: string*/
  )
  /*: void*/
  {
    var controller = _CoreManager.default.getStorageController();

    if (controller.async === 1) {
      throw new Error('Synchronous storage is not supported by the current storage controller');
    }

    return controller.setItem(path, value);
  },
  setItemAsync: function (path
  /*: string*/
  , value
  /*: string*/
  )
  /*: Promise<void>*/
  {
    var controller = _CoreManager.default.getStorageController();

    if (controller.async === 1) {
      return controller.setItemAsync(path, value);
    }

    return _promise.default.resolve(controller.setItem(path, value));
  },
  removeItem: function (path
  /*: string*/
  )
  /*: void*/
  {
    var controller = _CoreManager.default.getStorageController();

    if (controller.async === 1) {
      throw new Error('Synchronous storage is not supported by the current storage controller');
    }

    return controller.removeItem(path);
  },
  removeItemAsync: function (path
  /*: string*/
  )
  /*: Promise<void>*/
  {
    var controller = _CoreManager.default.getStorageController();

    if (controller.async === 1) {
      return controller.removeItemAsync(path);
    }

    return _promise.default.resolve(controller.removeItem(path));
  },
  generatePath: function (path
  /*: string*/
  )
  /*: string*/
  {
    if (!_CoreManager.default.get('APPLICATION_ID')) {
      throw new Error('You need to call Parse.initialize before using Parse.');
    }

    if (typeof path !== 'string') {
      throw new Error('Tried to get a Storage path that was not a String.');
    }

    if (path[0] === '/') {
      path = path.substr(1);
    }

    return 'Parse/' + _CoreManager.default.get('APPLICATION_ID') + '/' + path;
  },
  _clear: function () {
    var controller = _CoreManager.default.getStorageController();

    if (controller.hasOwnProperty('clear')) {
      controller.clear();
    }
  }
};
module.exports = Storage;

_CoreManager.default.setStorageController(_dereq_('./StorageController.browser'));
},{"./CoreManager":4,"./StorageController.browser":36,"@babel/runtime-corejs3/core-js-stable/promise":78,"@babel/runtime-corejs3/helpers/interopRequireDefault":110}],36:[function(_dereq_,module,exports){
"use strict";
/**
 * Copyright (c) 2015-present, Parse, LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @flow
 */

/* global localStorage */

var StorageController = {
  async: 0,
  getItem: function (path
  /*: string*/
  )
  /*: ?string*/
  {
    return localStorage.getItem(path);
  },
  setItem: function (path
  /*: string*/
  , value
  /*: string*/
  ) {
    try {
      localStorage.setItem(path, value);
    } catch (e) {// Quota exceeded, possibly due to Safari Private Browsing mode
    }
  },
  removeItem: function (path
  /*: string*/
  ) {
    localStorage.removeItem(path);
  },
  clear: function () {
    localStorage.clear();
  }
};
module.exports = StorageController;
},{}],37:[function(_dereq_,module,exports){
/*:: type Task = {
  task: () => Promise;
  _completion: Promise
};*/
"use strict";

var _interopRequireDefault = _dereq_("@babel/runtime-corejs3/helpers/interopRequireDefault");

var _promise = _interopRequireDefault(_dereq_("@babel/runtime-corejs3/core-js-stable/promise"));

var _classCallCheck2 = _interopRequireDefault(_dereq_("@babel/runtime-corejs3/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(_dereq_("@babel/runtime-corejs3/helpers/createClass"));

var _defineProperty2 = _interopRequireDefault(_dereq_("@babel/runtime-corejs3/helpers/defineProperty"));
/**
 * Copyright (c) 2015-present, Parse, LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @flow
 */


var TaskQueue =
/*#__PURE__*/
function () {
  function TaskQueue() {
    (0, _classCallCheck2.default)(this, TaskQueue);
    (0, _defineProperty2.default)(this, "queue", void 0);
    this.queue = [];
  }

  (0, _createClass2.default)(TaskQueue, [{
    key: "enqueue",
    value: function (task
    /*: () => Promise*/
    )
    /*: Promise*/
    {
      var _this = this;

      var res;
      var rej;
      var taskComplete = new _promise.default(function (resolve, reject) {
        res = resolve;
        rej = reject;
      });
      taskComplete.resolve = res;
      taskComplete.reject = rej;
      this.queue.push({
        task: task,
        _completion: taskComplete
      });

      if (this.queue.length === 1) {
        task().then(function () {
          _this._dequeue();

          taskComplete.resolve();
        }, function (error) {
          _this._dequeue();

          taskComplete.reject(error);
        });
      }

      return taskComplete;
    }
  }, {
    key: "_dequeue",
    value: function () {
      var _this2 = this;

      this.queue.shift();

      if (this.queue.length) {
        var next = this.queue[0];
        next.task().then(function () {
          _this2._dequeue();

          next._completion.resolve();
        }, function (error) {
          _this2._dequeue();

          next._completion.reject(error);
        });
      }
    }
  }]);
  return TaskQueue;
}();

module.exports = TaskQueue;
},{"@babel/runtime-corejs3/core-js-stable/promise":78,"@babel/runtime-corejs3/helpers/classCallCheck":103,"@babel/runtime-corejs3/helpers/createClass":105,"@babel/runtime-corejs3/helpers/defineProperty":106,"@babel/runtime-corejs3/helpers/interopRequireDefault":110}],38:[function(_dereq_,module,exports){
"use strict";

var _interopRequireWildcard = _dereq_("@babel/runtime-corejs3/helpers/interopRequireWildcard");

var _interopRequireDefault = _dereq_("@babel/runtime-corejs3/helpers/interopRequireDefault");

var _Object$defineProperty = _dereq_("@babel/runtime-corejs3/core-js-stable/object/define-property");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports.getState = getState;
exports.initializeState = initializeState;
exports.removeState = removeState;
exports.getServerData = getServerData;
exports.setServerData = setServerData;
exports.getPendingOps = getPendingOps;
exports.setPendingOp = setPendingOp;
exports.pushPendingState = pushPendingState;
exports.popPendingState = popPendingState;
exports.mergeFirstPendingState = mergeFirstPendingState;
exports.getObjectCache = getObjectCache;
exports.estimateAttribute = estimateAttribute;
exports.estimateAttributes = estimateAttributes;
exports.commitServerChanges = commitServerChanges;
exports.enqueueTask = enqueueTask;
exports.duplicateState = duplicateState;
exports.clearAllState = clearAllState;

var _weakMap = _interopRequireDefault(_dereq_("@babel/runtime-corejs3/core-js-stable/weak-map"));

var ObjectStateMutations = _interopRequireWildcard(_dereq_("./ObjectStateMutations"));

var _TaskQueue = _interopRequireDefault(_dereq_("./TaskQueue"));
/**
 * Copyright (c) 2015-present, Parse, LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @flow
 */


var objectState = new _weakMap.default();

function getState(obj
/*: ParseObject*/
)
/*: ?State*/
{
  var classData = objectState.get(obj);
  return classData || null;
}

function initializeState(obj
/*: ParseObject*/
, initial
/*:: ?: State*/
)
/*: State*/
{
  var state = getState(obj);

  if (state) {
    return state;
  }

  if (!initial) {
    initial = {
      serverData: {},
      pendingOps: [{}],
      objectCache: {},
      tasks: new _TaskQueue.default(),
      existed: false
    };
  }

  state = initial;
  objectState.set(obj, state);
  return state;
}

function removeState(obj
/*: ParseObject*/
)
/*: ?State*/
{
  var state = getState(obj);

  if (state === null) {
    return null;
  }

  objectState.delete(obj);
  return state;
}

function getServerData(obj
/*: ParseObject*/
)
/*: AttributeMap*/
{
  var state = getState(obj);

  if (state) {
    return state.serverData;
  }

  return {};
}

function setServerData(obj
/*: ParseObject*/
, attributes
/*: AttributeMap*/
) {
  var serverData = initializeState(obj).serverData;
  ObjectStateMutations.setServerData(serverData, attributes);
}

function getPendingOps(obj
/*: ParseObject*/
)
/*: Array<OpsMap>*/
{
  var state = getState(obj);

  if (state) {
    return state.pendingOps;
  }

  return [{}];
}

function setPendingOp(obj
/*: ParseObject*/
, attr
/*: string*/
, op
/*: ?Op*/
) {
  var pendingOps = initializeState(obj).pendingOps;
  ObjectStateMutations.setPendingOp(pendingOps, attr, op);
}

function pushPendingState(obj
/*: ParseObject*/
) {
  var pendingOps = initializeState(obj).pendingOps;
  ObjectStateMutations.pushPendingState(pendingOps);
}

function popPendingState(obj
/*: ParseObject*/
)
/*: OpsMap*/
{
  var pendingOps = initializeState(obj).pendingOps;
  return ObjectStateMutations.popPendingState(pendingOps);
}

function mergeFirstPendingState(obj
/*: ParseObject*/
) {
  var pendingOps = getPendingOps(obj);
  ObjectStateMutations.mergeFirstPendingState(pendingOps);
}

function getObjectCache(obj
/*: ParseObject*/
)
/*: ObjectCache*/
{
  var state = getState(obj);

  if (state) {
    return state.objectCache;
  }

  return {};
}

function estimateAttribute(obj
/*: ParseObject*/
, attr
/*: string*/
)
/*: mixed*/
{
  var serverData = getServerData(obj);
  var pendingOps = getPendingOps(obj);
  return ObjectStateMutations.estimateAttribute(serverData, pendingOps, obj.className, obj.id, attr);
}

function estimateAttributes(obj
/*: ParseObject*/
)
/*: AttributeMap*/
{
  var serverData = getServerData(obj);
  var pendingOps = getPendingOps(obj);
  return ObjectStateMutations.estimateAttributes(serverData, pendingOps, obj.className, obj.id);
}

function commitServerChanges(obj
/*: ParseObject*/
, changes
/*: AttributeMap*/
) {
  var state = initializeState(obj);
  ObjectStateMutations.commitServerChanges(state.serverData, state.objectCache, changes);
}

function enqueueTask(obj
/*: ParseObject*/
, task
/*: () => Promise*/
)
/*: Promise*/
{
  var state = initializeState(obj);
  return state.tasks.enqueue(task);
}

function duplicateState(source
/*: ParseObject*/
, dest
/*: ParseObject*/
)
/*: void*/
{
  var oldState = initializeState(source);
  var newState = initializeState(dest);

  for (var key in oldState.serverData) {
    newState.serverData[key] = oldState.serverData[key];
  }

  for (var index = 0; index < oldState.pendingOps.length; index++) {
    for (var _key in oldState.pendingOps[index]) {
      newState.pendingOps[index][_key] = oldState.pendingOps[index][_key];
    }
  }

  for (var _key2 in oldState.objectCache) {
    newState.objectCache[_key2] = oldState.objectCache[_key2];
  }

  newState.existed = oldState.existed;
}

function clearAllState() {
  objectState = new _weakMap.default();
}
},{"./ObjectStateMutations":13,"./TaskQueue":37,"@babel/runtime-corejs3/core-js-stable/object/define-property":71,"@babel/runtime-corejs3/core-js-stable/weak-map":81,"@babel/runtime-corejs3/helpers/interopRequireDefault":110,"@babel/runtime-corejs3/helpers/interopRequireWildcard":111}],39:[function(_dereq_,module,exports){
"use strict";

var _interopRequireDefault = _dereq_("@babel/runtime-corejs3/helpers/interopRequireDefault");

var _Object$defineProperty = _dereq_("@babel/runtime-corejs3/core-js-stable/object/define-property");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports.default = arrayContainsObject;

var _indexOf = _interopRequireDefault(_dereq_("@babel/runtime-corejs3/core-js-stable/instance/index-of"));

var _ParseObject = _interopRequireDefault(_dereq_("./ParseObject"));
/**
 * Copyright (c) 2015-present, Parse, LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @flow
 */


function arrayContainsObject(array
/*: Array<any>*/
, object
/*: ParseObject*/
)
/*: boolean*/
{
  if ((0, _indexOf.default)(array).call(array, object) > -1) {
    return true;
  }

  for (var i = 0; i < array.length; i++) {
    if (array[i] instanceof _ParseObject.default && array[i].className === object.className && array[i]._getId() === object._getId()) {
      return true;
    }
  }

  return false;
}
},{"./ParseObject":23,"@babel/runtime-corejs3/core-js-stable/instance/index-of":58,"@babel/runtime-corejs3/core-js-stable/object/define-property":71,"@babel/runtime-corejs3/helpers/interopRequireDefault":110}],40:[function(_dereq_,module,exports){
"use strict";

var _interopRequireDefault = _dereq_("@babel/runtime-corejs3/helpers/interopRequireDefault");

var _Object$defineProperty = _dereq_("@babel/runtime-corejs3/core-js-stable/object/define-property");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports.default = canBeSerialized;

var _isArray = _interopRequireDefault(_dereq_("@babel/runtime-corejs3/core-js-stable/array/is-array"));

var _typeof2 = _interopRequireDefault(_dereq_("@babel/runtime-corejs3/helpers/typeof"));

var _ParseFile = _interopRequireDefault(_dereq_("./ParseFile"));

var _ParseObject = _interopRequireDefault(_dereq_("./ParseObject"));

var _ParseRelation = _interopRequireDefault(_dereq_("./ParseRelation"));
/**
 * Copyright (c) 2015-present, Parse, LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @flow
 */


function canBeSerialized(obj
/*: ParseObject*/
)
/*: boolean*/
{
  if (!(obj instanceof _ParseObject.default)) {
    return true;
  }

  var attributes = obj.attributes;

  for (var attr in attributes) {
    var val = attributes[attr];

    if (!canBeSerializedHelper(val)) {
      return false;
    }
  }

  return true;
}

function canBeSerializedHelper(value
/*: any*/
)
/*: boolean*/
{
  if ((0, _typeof2.default)(value) !== 'object') {
    return true;
  }

  if (value instanceof _ParseRelation.default) {
    return true;
  }

  if (value instanceof _ParseObject.default) {
    return !!value.id;
  }

  if (value instanceof _ParseFile.default) {
    if (value.url()) {
      return true;
    }

    return false;
  }

  if ((0, _isArray.default)(value)) {
    for (var i = 0; i < value.length; i++) {
      if (!canBeSerializedHelper(value[i])) {
        return false;
      }
    }

    return true;
  }

  for (var k in value) {
    if (!canBeSerializedHelper(value[k])) {
      return false;
    }
  }

  return true;
}
},{"./ParseFile":19,"./ParseObject":23,"./ParseRelation":27,"@babel/runtime-corejs3/core-js-stable/array/is-array":51,"@babel/runtime-corejs3/core-js-stable/object/define-property":71,"@babel/runtime-corejs3/helpers/interopRequireDefault":110,"@babel/runtime-corejs3/helpers/typeof":122}],41:[function(_dereq_,module,exports){
"use strict";

var _interopRequireDefault = _dereq_("@babel/runtime-corejs3/helpers/interopRequireDefault");

var _Object$defineProperty = _dereq_("@babel/runtime-corejs3/core-js-stable/object/define-property");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports.default = decode;

var _forEach = _interopRequireDefault(_dereq_("@babel/runtime-corejs3/core-js-stable/instance/for-each"));

var _isArray = _interopRequireDefault(_dereq_("@babel/runtime-corejs3/core-js-stable/array/is-array"));

var _typeof2 = _interopRequireDefault(_dereq_("@babel/runtime-corejs3/helpers/typeof"));

var _ParseACL = _interopRequireDefault(_dereq_("./ParseACL"));

var _ParseFile = _interopRequireDefault(_dereq_("./ParseFile"));

var _ParseGeoPoint = _interopRequireDefault(_dereq_("./ParseGeoPoint"));

var _ParsePolygon = _interopRequireDefault(_dereq_("./ParsePolygon"));

var _ParseObject = _interopRequireDefault(_dereq_("./ParseObject"));

var _ParseOp = _dereq_("./ParseOp");

var _ParseRelation = _interopRequireDefault(_dereq_("./ParseRelation"));
/**
 * Copyright (c) 2015-present, Parse, LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @flow
 */
// eslint-disable-line no-unused-vars


function decode(value
/*: any*/
)
/*: any*/
{
  if (value === null || (0, _typeof2.default)(value) !== 'object') {
    return value;
  }

  if ((0, _isArray.default)(value)) {
    var dup = [];
    (0, _forEach.default)(value).call(value, function (v, i) {
      dup[i] = decode(v);
    });
    return dup;
  }

  if (typeof value.__op === 'string') {
    return (0, _ParseOp.opFromJSON)(value);
  }

  if (value.__type === 'Pointer' && value.className) {
    return _ParseObject.default.fromJSON(value);
  }

  if (value.__type === 'Object' && value.className) {
    return _ParseObject.default.fromJSON(value);
  }

  if (value.__type === 'Relation') {
    // The parent and key fields will be populated by the parent
    var relation = new _ParseRelation.default(null, null);
    relation.targetClassName = value.className;
    return relation;
  }

  if (value.__type === 'Date') {
    return new Date(value.iso);
  }

  if (value.__type === 'File') {
    return _ParseFile.default.fromJSON(value);
  }

  if (value.__type === 'GeoPoint') {
    return new _ParseGeoPoint.default({
      latitude: value.latitude,
      longitude: value.longitude
    });
  }

  if (value.__type === 'Polygon') {
    return new _ParsePolygon.default(value.coordinates);
  }

  var copy = {};

  for (var k in value) {
    copy[k] = decode(value[k]);
  }

  return copy;
}
},{"./ParseACL":16,"./ParseFile":19,"./ParseGeoPoint":20,"./ParseObject":23,"./ParseOp":24,"./ParsePolygon":25,"./ParseRelation":27,"@babel/runtime-corejs3/core-js-stable/array/is-array":51,"@babel/runtime-corejs3/core-js-stable/instance/for-each":56,"@babel/runtime-corejs3/core-js-stable/object/define-property":71,"@babel/runtime-corejs3/helpers/interopRequireDefault":110,"@babel/runtime-corejs3/helpers/typeof":122}],42:[function(_dereq_,module,exports){
"use strict";

var _interopRequireDefault = _dereq_("@babel/runtime-corejs3/helpers/interopRequireDefault");

var _Object$defineProperty = _dereq_("@babel/runtime-corejs3/core-js-stable/object/define-property");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports.default = _default;

var _typeof2 = _interopRequireDefault(_dereq_("@babel/runtime-corejs3/helpers/typeof"));

var _map = _interopRequireDefault(_dereq_("@babel/runtime-corejs3/core-js-stable/instance/map"));

var _isArray = _interopRequireDefault(_dereq_("@babel/runtime-corejs3/core-js-stable/array/is-array"));

var _concat = _interopRequireDefault(_dereq_("@babel/runtime-corejs3/core-js-stable/instance/concat"));

var _keys = _interopRequireDefault(_dereq_("@babel/runtime-corejs3/core-js-stable/object/keys"));

var _indexOf = _interopRequireDefault(_dereq_("@babel/runtime-corejs3/core-js-stable/instance/index-of"));

var _ParseACL = _interopRequireDefault(_dereq_("./ParseACL"));

var _ParseFile = _interopRequireDefault(_dereq_("./ParseFile"));

var _ParseGeoPoint = _interopRequireDefault(_dereq_("./ParseGeoPoint"));

var _ParsePolygon = _interopRequireDefault(_dereq_("./ParsePolygon"));

var _ParseObject = _interopRequireDefault(_dereq_("./ParseObject"));

var _ParseOp = _dereq_("./ParseOp");

var _ParseRelation = _interopRequireDefault(_dereq_("./ParseRelation"));
/**
 * Copyright (c) 2015-present, Parse, LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @flow
 */


var toString = Object.prototype.toString;

function encode(value
/*: mixed*/
, disallowObjects
/*: boolean*/
, forcePointers
/*: boolean*/
, seen
/*: Array<mixed>*/
)
/*: any*/
{
  if (value instanceof _ParseObject.default) {
    if (disallowObjects) {
      throw new Error('Parse Objects not allowed here');
    }

    var seenEntry = value.id ? value.className + ':' + value.id : value;

    if (forcePointers || !seen || (0, _indexOf.default)(seen).call(seen, seenEntry) > -1 || value.dirty() || (0, _keys.default)(value._getServerData()).length < 1) {
      return value.toPointer();
    }

    seen = (0, _concat.default)(seen).call(seen, seenEntry);
    return value._toFullJSON(seen);
  }

  if (value instanceof _ParseOp.Op || value instanceof _ParseACL.default || value instanceof _ParseGeoPoint.default || value instanceof _ParsePolygon.default || value instanceof _ParseRelation.default) {
    return value.toJSON();
  }

  if (value instanceof _ParseFile.default) {
    if (!value.url()) {
      throw new Error('Tried to encode an unsaved file.');
    }

    return value.toJSON();
  }

  if (toString.call(value) === '[object Date]') {
    if (isNaN(value)) {
      throw new Error('Tried to encode an invalid date.');
    }

    return {
      __type: 'Date',
      iso: value
      /*: any*/
      .toJSON()
    };
  }

  if (toString.call(value) === '[object RegExp]' && typeof value.source === 'string') {
    return value.source;
  }

  if ((0, _isArray.default)(value)) {
    return (0, _map.default)(value).call(value, function (v) {
      return encode(v, disallowObjects, forcePointers, seen);
    });
  }

  if (value && (0, _typeof2.default)(value) === 'object') {
    var output = {};

    for (var k in value) {
      output[k] = encode(value[k], disallowObjects, forcePointers, seen);
    }

    return output;
  }

  return value;
}

function _default(value
/*: mixed*/
, disallowObjects
/*:: ?: boolean*/
, forcePointers
/*:: ?: boolean*/
, seen
/*:: ?: Array<mixed>*/
)
/*: any*/
{
  return encode(value, !!disallowObjects, !!forcePointers, seen || []);
}
},{"./ParseACL":16,"./ParseFile":19,"./ParseGeoPoint":20,"./ParseObject":23,"./ParseOp":24,"./ParsePolygon":25,"./ParseRelation":27,"@babel/runtime-corejs3/core-js-stable/array/is-array":51,"@babel/runtime-corejs3/core-js-stable/instance/concat":53,"@babel/runtime-corejs3/core-js-stable/instance/index-of":58,"@babel/runtime-corejs3/core-js-stable/instance/map":60,"@babel/runtime-corejs3/core-js-stable/object/define-property":71,"@babel/runtime-corejs3/core-js-stable/object/keys":76,"@babel/runtime-corejs3/helpers/interopRequireDefault":110,"@babel/runtime-corejs3/helpers/typeof":122}],43:[function(_dereq_,module,exports){
"use strict";

var _interopRequireDefault = _dereq_("@babel/runtime-corejs3/helpers/interopRequireDefault");

var _Object$defineProperty = _dereq_("@babel/runtime-corejs3/core-js-stable/object/define-property");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports.default = equals;

var _keys = _interopRequireDefault(_dereq_("@babel/runtime-corejs3/core-js-stable/object/keys"));

var _isArray = _interopRequireDefault(_dereq_("@babel/runtime-corejs3/core-js-stable/array/is-array"));

var _typeof2 = _interopRequireDefault(_dereq_("@babel/runtime-corejs3/helpers/typeof"));

var _ParseACL = _interopRequireDefault(_dereq_("./ParseACL"));

var _ParseFile = _interopRequireDefault(_dereq_("./ParseFile"));

var _ParseGeoPoint = _interopRequireDefault(_dereq_("./ParseGeoPoint"));

var _ParseObject = _interopRequireDefault(_dereq_("./ParseObject"));
/**
 * Copyright (c) 2015-present, Parse, LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */


var toString = Object.prototype.toString;

function equals(a, b) {
  if (toString.call(a) === '[object Date]' || toString.call(b) === '[object Date]') {
    var dateA = new Date(a);
    var dateB = new Date(b);
    return +dateA === +dateB;
  }

  if ((0, _typeof2.default)(a) !== (0, _typeof2.default)(b)) {
    return false;
  }

  if (!a || (0, _typeof2.default)(a) !== 'object') {
    // a is a primitive
    return a === b;
  }

  if ((0, _isArray.default)(a) || (0, _isArray.default)(b)) {
    if (!(0, _isArray.default)(a) || !(0, _isArray.default)(b)) {
      return false;
    }

    if (a.length !== b.length) {
      return false;
    }

    for (var i = a.length; i--;) {
      if (!equals(a[i], b[i])) {
        return false;
      }
    }

    return true;
  }

  if (a instanceof _ParseACL.default || a instanceof _ParseFile.default || a instanceof _ParseGeoPoint.default || a instanceof _ParseObject.default) {
    return a.equals(b);
  }

  if (b instanceof _ParseObject.default) {
    if (a.__type === 'Object' || a.__type === 'Pointer') {
      return a.objectId === b.id && a.className === b.className;
    }
  }

  if ((0, _keys.default)(a).length !== (0, _keys.default)(b).length) {
    return false;
  }

  for (var k in a) {
    if (!equals(a[k], b[k])) {
      return false;
    }
  }

  return true;
}
},{"./ParseACL":16,"./ParseFile":19,"./ParseGeoPoint":20,"./ParseObject":23,"@babel/runtime-corejs3/core-js-stable/array/is-array":51,"@babel/runtime-corejs3/core-js-stable/object/define-property":71,"@babel/runtime-corejs3/core-js-stable/object/keys":76,"@babel/runtime-corejs3/helpers/interopRequireDefault":110,"@babel/runtime-corejs3/helpers/typeof":122}],44:[function(_dereq_,module,exports){
"use strict";

var _Object$defineProperty = _dereq_("@babel/runtime-corejs3/core-js-stable/object/define-property");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports.default = escape;
/*
 * Copyright (c) 2015-present, Parse, LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @flow
 */

var encoded = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '/': '&#x2F;',
  '\'': '&#x27;',
  '"': '&quot;'
};

function escape(str
/*: string*/
)
/*: string*/
{
  return str.replace(/[&<>\/'"]/g, function (char) {
    return encoded[char];
  });
}
},{"@babel/runtime-corejs3/core-js-stable/object/define-property":71}],45:[function(_dereq_,module,exports){
"use strict";

var _interopRequireDefault = _dereq_("@babel/runtime-corejs3/helpers/interopRequireDefault");

var _Object$defineProperty = _dereq_("@babel/runtime-corejs3/core-js-stable/object/define-property");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports.default = isRevocableSession;

var _indexOf = _interopRequireDefault(_dereq_("@babel/runtime-corejs3/core-js-stable/instance/index-of"));
/**
 * Copyright (c) 2015-present, Parse, LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @flow
 */


function isRevocableSession(token
/*: string*/
)
/*: boolean*/
{
  return (0, _indexOf.default)(token).call(token, 'r:') > -1;
}
},{"@babel/runtime-corejs3/core-js-stable/instance/index-of":58,"@babel/runtime-corejs3/core-js-stable/object/define-property":71,"@babel/runtime-corejs3/helpers/interopRequireDefault":110}],46:[function(_dereq_,module,exports){
"use strict";

var _interopRequireDefault = _dereq_("@babel/runtime-corejs3/helpers/interopRequireDefault");

var _Object$defineProperty = _dereq_("@babel/runtime-corejs3/core-js-stable/object/define-property");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports.default = parseDate;

var _parseInt2 = _interopRequireDefault(_dereq_("@babel/runtime-corejs3/core-js-stable/parse-int"));
/**
 * Copyright (c) 2015-present, Parse, LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @flow
 */


function parseDate(iso8601
/*: string*/
)
/*: ?Date*/
{
  var regexp = new RegExp('^([0-9]{1,4})-([0-9]{1,2})-([0-9]{1,2})' + 'T' + '([0-9]{1,2}):([0-9]{1,2}):([0-9]{1,2})' + '(.([0-9]+))?' + 'Z$');
  var match = regexp.exec(iso8601);

  if (!match) {
    return null;
  }

  var year = (0, _parseInt2.default)(match[1]) || 0;
  var month = ((0, _parseInt2.default)(match[2]) || 1) - 1;
  var day = (0, _parseInt2.default)(match[3]) || 0;
  var hour = (0, _parseInt2.default)(match[4]) || 0;
  var minute = (0, _parseInt2.default)(match[5]) || 0;
  var second = (0, _parseInt2.default)(match[6]) || 0;
  var milli = (0, _parseInt2.default)(match[8]) || 0;
  return new Date(Date.UTC(year, month, day, hour, minute, second, milli));
}
},{"@babel/runtime-corejs3/core-js-stable/object/define-property":71,"@babel/runtime-corejs3/core-js-stable/parse-int":77,"@babel/runtime-corejs3/helpers/interopRequireDefault":110}],47:[function(_dereq_,module,exports){
"use strict";

var _interopRequireDefault = _dereq_("@babel/runtime-corejs3/helpers/interopRequireDefault");

var _Object$defineProperty = _dereq_("@babel/runtime-corejs3/core-js-stable/object/define-property");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports.resolvingPromise = resolvingPromise;
exports.when = when;
exports.continueWhile = continueWhile;

var _isArray = _interopRequireDefault(_dereq_("@babel/runtime-corejs3/core-js-stable/array/is-array"));

var _promise = _interopRequireDefault(_dereq_("@babel/runtime-corejs3/core-js-stable/promise"));

function resolvingPromise() {
  var res;
  var rej;
  var promise = new _promise.default(function (resolve, reject) {
    res = resolve;
    rej = reject;
  });
  promise.resolve = res;
  promise.reject = rej;
  return promise;
}

function when(promises) {
  var objects;
  var arrayArgument = (0, _isArray.default)(promises);

  if (arrayArgument) {
    objects = promises;
  } else {
    objects = arguments;
  }

  var total = objects.length;
  var hadError = false;
  var results = [];
  var returnValue = arrayArgument ? [results] : results;
  var errors = [];
  results.length = objects.length;
  errors.length = objects.length;

  if (total === 0) {
    return _promise.default.resolve(returnValue);
  }

  var promise = new resolvingPromise();

  var resolveOne = function () {
    total--;

    if (total <= 0) {
      if (hadError) {
        promise.reject(errors);
      } else {
        promise.resolve(returnValue);
      }
    }
  };

  var chain = function (object, index) {
    if (object && typeof object.then === 'function') {
      object.then(function (result) {
        results[index] = result;
        resolveOne();
      }, function (error) {
        errors[index] = error;
        hadError = true;
        resolveOne();
      });
    } else {
      results[index] = object;
      resolveOne();
    }
  };

  for (var i = 0; i < objects.length; i++) {
    chain(objects[i], i);
  }

  return promise;
}

function continueWhile(test, emitter) {
  if (test()) {
    return emitter().then(function () {
      return continueWhile(test, emitter);
    });
  }

  return _promise.default.resolve();
}
},{"@babel/runtime-corejs3/core-js-stable/array/is-array":51,"@babel/runtime-corejs3/core-js-stable/object/define-property":71,"@babel/runtime-corejs3/core-js-stable/promise":78,"@babel/runtime-corejs3/helpers/interopRequireDefault":110}],48:[function(_dereq_,module,exports){
"use strict";

var _interopRequireDefault = _dereq_("@babel/runtime-corejs3/helpers/interopRequireDefault");

var _Object$defineProperty = _dereq_("@babel/runtime-corejs3/core-js-stable/object/define-property");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports.default = unique;

var _indexOf = _interopRequireDefault(_dereq_("@babel/runtime-corejs3/core-js-stable/instance/index-of"));

var _forEach = _interopRequireDefault(_dereq_("@babel/runtime-corejs3/core-js-stable/instance/for-each"));

var _arrayContainsObject = _interopRequireDefault(_dereq_("./arrayContainsObject"));

var _ParseObject = _interopRequireDefault(_dereq_("./ParseObject"));
/**
 * Copyright (c) 2015-present, Parse, LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @flow
 */


function unique
/*:: <T>*/
(arr
/*: Array<T>*/
)
/*: Array<T>*/
{
  var uniques = [];
  (0, _forEach.default)(arr).call(arr, function (value) {
    if (value instanceof _ParseObject.default) {
      if (!(0, _arrayContainsObject.default)(uniques, value)) {
        uniques.push(value);
      }
    } else {
      if ((0, _indexOf.default)(uniques).call(uniques, value) < 0) {
        uniques.push(value);
      }
    }
  });
  return uniques;
}
},{"./ParseObject":23,"./arrayContainsObject":39,"@babel/runtime-corejs3/core-js-stable/instance/for-each":56,"@babel/runtime-corejs3/core-js-stable/instance/index-of":58,"@babel/runtime-corejs3/core-js-stable/object/define-property":71,"@babel/runtime-corejs3/helpers/interopRequireDefault":110}],49:[function(_dereq_,module,exports){
"use strict";

var _interopRequireDefault = _dereq_("@babel/runtime-corejs3/helpers/interopRequireDefault");

var _Object$defineProperty = _dereq_("@babel/runtime-corejs3/core-js-stable/object/define-property");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports.default = unsavedChildren;

var _forEach = _interopRequireDefault(_dereq_("@babel/runtime-corejs3/core-js-stable/instance/for-each"));

var _isArray = _interopRequireDefault(_dereq_("@babel/runtime-corejs3/core-js-stable/array/is-array"));

var _indexOf = _interopRequireDefault(_dereq_("@babel/runtime-corejs3/core-js-stable/instance/index-of"));

var _concat = _interopRequireDefault(_dereq_("@babel/runtime-corejs3/core-js-stable/instance/concat"));

var _typeof2 = _interopRequireDefault(_dereq_("@babel/runtime-corejs3/helpers/typeof"));

var _ParseFile = _interopRequireDefault(_dereq_("./ParseFile"));

var _ParseObject = _interopRequireDefault(_dereq_("./ParseObject"));

var _ParseRelation = _interopRequireDefault(_dereq_("./ParseRelation"));
/**
 * Copyright (c) 2015-present, Parse, LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @flow
 */

/**
 * Return an array of unsaved children, which are either Parse Objects or Files.
 * If it encounters any dirty Objects without Ids, it will throw an exception.
 */


function unsavedChildren(obj
/*: ParseObject*/
, allowDeepUnsaved
/*:: ?: boolean*/
)
/*: Array<ParseFile | ParseObject>*/
{
  var encountered = {
    objects: {},
    files: []
  };

  var identifier = obj.className + ':' + obj._getId();

  encountered.objects[identifier] = obj.dirty() ? obj : true;
  var attributes = obj.attributes;

  for (var attr in attributes) {
    if ((0, _typeof2.default)(attributes[attr]) === 'object') {
      traverse(attributes[attr], encountered, false, !!allowDeepUnsaved);
    }
  }

  var unsaved = [];

  for (var id in encountered.objects) {
    if (id !== identifier && encountered.objects[id] !== true) {
      unsaved.push(encountered.objects[id]);
    }
  }

  return (0, _concat.default)(unsaved).call(unsaved, encountered.files);
}

function traverse(obj
/*: ParseObject*/
, encountered
/*: EncounterMap*/
, shouldThrow
/*: boolean*/
, allowDeepUnsaved
/*: boolean*/
) {
  if (obj instanceof _ParseObject.default) {
    if (!obj.id && shouldThrow) {
      throw new Error('Cannot create a pointer to an unsaved Object.');
    }

    var _identifier = obj.className + ':' + obj._getId();

    if (!encountered.objects[_identifier]) {
      encountered.objects[_identifier] = obj.dirty() ? obj : true;
      var attributes = obj.attributes;

      for (var attr in attributes) {
        if ((0, _typeof2.default)(attributes[attr]) === 'object') {
          traverse(attributes[attr], encountered, !allowDeepUnsaved, allowDeepUnsaved);
        }
      }
    }

    return;
  }

  if (obj instanceof _ParseFile.default) {
    var _context;

    if (!obj.url() && (0, _indexOf.default)(_context = encountered.files).call(_context, obj) < 0) {
      encountered.files.push(obj);
    }

    return;
  }

  if (obj instanceof _ParseRelation.default) {
    return;
  }

  if ((0, _isArray.default)(obj)) {
    (0, _forEach.default)(obj).call(obj, function (el) {
      if ((0, _typeof2.default)(el) === 'object') {
        traverse(el, encountered, shouldThrow, allowDeepUnsaved);
      }
    });
  }

  for (var k in obj) {
    if ((0, _typeof2.default)(obj[k]) === 'object') {
      traverse(obj[k], encountered, shouldThrow, allowDeepUnsaved);
    }
  }
}
},{"./ParseFile":19,"./ParseObject":23,"./ParseRelation":27,"@babel/runtime-corejs3/core-js-stable/array/is-array":51,"@babel/runtime-corejs3/core-js-stable/instance/concat":53,"@babel/runtime-corejs3/core-js-stable/instance/for-each":56,"@babel/runtime-corejs3/core-js-stable/instance/index-of":58,"@babel/runtime-corejs3/core-js-stable/object/define-property":71,"@babel/runtime-corejs3/helpers/interopRequireDefault":110,"@babel/runtime-corejs3/helpers/typeof":122}],50:[function(_dereq_,module,exports){
module.exports = _dereq_("core-js-pure/stable/array/from");
},{"core-js-pure/stable/array/from":385}],51:[function(_dereq_,module,exports){
module.exports = _dereq_("core-js-pure/stable/array/is-array");
},{"core-js-pure/stable/array/is-array":386}],52:[function(_dereq_,module,exports){
module.exports = _dereq_("core-js-pure/stable/instance/bind");
},{"core-js-pure/stable/instance/bind":390}],53:[function(_dereq_,module,exports){
module.exports = _dereq_("core-js-pure/stable/instance/concat");
},{"core-js-pure/stable/instance/concat":391}],54:[function(_dereq_,module,exports){
module.exports = _dereq_("core-js-pure/stable/instance/filter");
},{"core-js-pure/stable/instance/filter":392}],55:[function(_dereq_,module,exports){
module.exports = _dereq_("core-js-pure/stable/instance/find");
},{"core-js-pure/stable/instance/find":393}],56:[function(_dereq_,module,exports){
module.exports = _dereq_("core-js-pure/stable/instance/for-each");
},{"core-js-pure/stable/instance/for-each":394}],57:[function(_dereq_,module,exports){
module.exports = _dereq_("core-js-pure/stable/instance/includes");
},{"core-js-pure/stable/instance/includes":395}],58:[function(_dereq_,module,exports){
module.exports = _dereq_("core-js-pure/stable/instance/index-of");
},{"core-js-pure/stable/instance/index-of":396}],59:[function(_dereq_,module,exports){
module.exports = _dereq_("core-js-pure/stable/instance/keys");
},{"core-js-pure/stable/instance/keys":397}],60:[function(_dereq_,module,exports){
module.exports = _dereq_("core-js-pure/stable/instance/map");
},{"core-js-pure/stable/instance/map":398}],61:[function(_dereq_,module,exports){
module.exports = _dereq_("core-js-pure/stable/instance/slice");
},{"core-js-pure/stable/instance/slice":399}],62:[function(_dereq_,module,exports){
module.exports = _dereq_("core-js-pure/stable/instance/sort");
},{"core-js-pure/stable/instance/sort":400}],63:[function(_dereq_,module,exports){
module.exports = _dereq_("core-js-pure/stable/instance/splice");
},{"core-js-pure/stable/instance/splice":401}],64:[function(_dereq_,module,exports){
module.exports = _dereq_("core-js-pure/stable/instance/starts-with");
},{"core-js-pure/stable/instance/starts-with":402}],65:[function(_dereq_,module,exports){
module.exports = _dereq_("core-js-pure/stable/instance/values");
},{"core-js-pure/stable/instance/values":403}],66:[function(_dereq_,module,exports){
module.exports = _dereq_("core-js-pure/stable/json/stringify");
},{"core-js-pure/stable/json/stringify":404}],67:[function(_dereq_,module,exports){
module.exports = _dereq_("core-js-pure/stable/map");
},{"core-js-pure/stable/map":405}],68:[function(_dereq_,module,exports){
module.exports = _dereq_("core-js-pure/stable/object/assign");
},{"core-js-pure/stable/object/assign":406}],69:[function(_dereq_,module,exports){
module.exports = _dereq_("core-js-pure/stable/object/create");
},{"core-js-pure/stable/object/create":407}],70:[function(_dereq_,module,exports){
module.exports = _dereq_("core-js-pure/stable/object/define-properties");
},{"core-js-pure/stable/object/define-properties":408}],71:[function(_dereq_,module,exports){
module.exports = _dereq_("core-js-pure/stable/object/define-property");
},{"core-js-pure/stable/object/define-property":409}],72:[function(_dereq_,module,exports){
module.exports = _dereq_("core-js-pure/stable/object/freeze");
},{"core-js-pure/stable/object/freeze":410}],73:[function(_dereq_,module,exports){
module.exports = _dereq_("core-js-pure/stable/object/get-own-property-descriptor");
},{"core-js-pure/stable/object/get-own-property-descriptor":411}],74:[function(_dereq_,module,exports){
module.exports = _dereq_("core-js-pure/stable/object/get-own-property-descriptors");
},{"core-js-pure/stable/object/get-own-property-descriptors":412}],75:[function(_dereq_,module,exports){
module.exports = _dereq_("core-js-pure/stable/object/get-own-property-symbols");
},{"core-js-pure/stable/object/get-own-property-symbols":413}],76:[function(_dereq_,module,exports){
module.exports = _dereq_("core-js-pure/stable/object/keys");
},{"core-js-pure/stable/object/keys":414}],77:[function(_dereq_,module,exports){
module.exports = _dereq_("core-js-pure/stable/parse-int");
},{"core-js-pure/stable/parse-int":415}],78:[function(_dereq_,module,exports){
module.exports = _dereq_("core-js-pure/stable/promise");
},{"core-js-pure/stable/promise":416}],79:[function(_dereq_,module,exports){
module.exports = _dereq_("core-js-pure/stable/set-timeout");
},{"core-js-pure/stable/set-timeout":417}],80:[function(_dereq_,module,exports){
module.exports = _dereq_("core-js-pure/stable/set");
},{"core-js-pure/stable/set":418}],81:[function(_dereq_,module,exports){
module.exports = _dereq_("core-js-pure/stable/weak-map");
},{"core-js-pure/stable/weak-map":419}],82:[function(_dereq_,module,exports){
module.exports = _dereq_("core-js-pure/features/array/from");
},{"core-js-pure/features/array/from":176}],83:[function(_dereq_,module,exports){
module.exports = _dereq_("core-js-pure/features/array/is-array");
},{"core-js-pure/features/array/is-array":177}],84:[function(_dereq_,module,exports){
module.exports = _dereq_("core-js-pure/features/get-iterator");
},{"core-js-pure/features/get-iterator":178}],85:[function(_dereq_,module,exports){
module.exports = _dereq_("core-js-pure/features/instance/bind");
},{"core-js-pure/features/instance/bind":179}],86:[function(_dereq_,module,exports){
module.exports = _dereq_("core-js-pure/features/instance/index-of");
},{"core-js-pure/features/instance/index-of":180}],87:[function(_dereq_,module,exports){
module.exports = _dereq_("core-js-pure/features/is-iterable");
},{"core-js-pure/features/is-iterable":181}],88:[function(_dereq_,module,exports){
module.exports = _dereq_("core-js-pure/features/map");
},{"core-js-pure/features/map":182}],89:[function(_dereq_,module,exports){
module.exports = _dereq_("core-js-pure/features/object/create");
},{"core-js-pure/features/object/create":183}],90:[function(_dereq_,module,exports){
module.exports = _dereq_("core-js-pure/features/object/define-property");
},{"core-js-pure/features/object/define-property":184}],91:[function(_dereq_,module,exports){
module.exports = _dereq_("core-js-pure/features/object/get-own-property-descriptor");
},{"core-js-pure/features/object/get-own-property-descriptor":185}],92:[function(_dereq_,module,exports){
module.exports = _dereq_("core-js-pure/features/object/get-prototype-of");
},{"core-js-pure/features/object/get-prototype-of":186}],93:[function(_dereq_,module,exports){
module.exports = _dereq_("core-js-pure/features/object/set-prototype-of");
},{"core-js-pure/features/object/set-prototype-of":187}],94:[function(_dereq_,module,exports){
module.exports = _dereq_("core-js-pure/features/promise");
},{"core-js-pure/features/promise":188}],95:[function(_dereq_,module,exports){
module.exports = _dereq_("core-js-pure/features/reflect/construct");
},{"core-js-pure/features/reflect/construct":189}],96:[function(_dereq_,module,exports){
module.exports = _dereq_("core-js-pure/features/reflect/get");
},{"core-js-pure/features/reflect/get":190}],97:[function(_dereq_,module,exports){
module.exports = _dereq_("core-js-pure/features/symbol");
},{"core-js-pure/features/symbol":191}],98:[function(_dereq_,module,exports){
module.exports = _dereq_("core-js-pure/features/symbol/iterator");
},{"core-js-pure/features/symbol/iterator":192}],99:[function(_dereq_,module,exports){
var _Array$isArray = _dereq_("../core-js/array/is-array");

function _arrayWithHoles(arr) {
  if (_Array$isArray(arr)) return arr;
}

module.exports = _arrayWithHoles;
},{"../core-js/array/is-array":83}],100:[function(_dereq_,module,exports){
var _Array$isArray = _dereq_("../core-js/array/is-array");

function _arrayWithoutHoles(arr) {
  if (_Array$isArray(arr)) {
    for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) {
      arr2[i] = arr[i];
    }

    return arr2;
  }
}

module.exports = _arrayWithoutHoles;
},{"../core-js/array/is-array":83}],101:[function(_dereq_,module,exports){
function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

module.exports = _assertThisInitialized;
},{}],102:[function(_dereq_,module,exports){
var _Promise = _dereq_("../core-js/promise");

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
    _Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
        args = arguments;
    return new _Promise(function (resolve, reject) {
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

module.exports = _asyncToGenerator;
},{"../core-js/promise":94}],103:[function(_dereq_,module,exports){
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

module.exports = _classCallCheck;
},{}],104:[function(_dereq_,module,exports){
var _bindInstanceProperty = _dereq_("../core-js/instance/bind");

var _Reflect$construct = _dereq_("../core-js/reflect/construct");

var setPrototypeOf = _dereq_("./setPrototypeOf");

function isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !_Reflect$construct) return false;
  if (_Reflect$construct.sham) return false;
  if (typeof Proxy === "function") return true;

  try {
    Date.prototype.toString.call(_Reflect$construct(Date, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}

function _construct(Parent, args, Class) {
  if (isNativeReflectConstruct()) {
    module.exports = _construct = _Reflect$construct;
  } else {
    module.exports = _construct = function _construct(Parent, args, Class) {
      var a = [null];
      a.push.apply(a, args);

      var Constructor = _bindInstanceProperty(Function).apply(Parent, a);

      var instance = new Constructor();
      if (Class) setPrototypeOf(instance, Class.prototype);
      return instance;
    };
  }

  return _construct.apply(null, arguments);
}

module.exports = _construct;
},{"../core-js/instance/bind":85,"../core-js/reflect/construct":95,"./setPrototypeOf":118}],105:[function(_dereq_,module,exports){
var _Object$defineProperty = _dereq_("../core-js/object/define-property");

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;

    _Object$defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

module.exports = _createClass;
},{"../core-js/object/define-property":90}],106:[function(_dereq_,module,exports){
var _Object$defineProperty = _dereq_("../core-js/object/define-property");

function _defineProperty(obj, key, value) {
  if (key in obj) {
    _Object$defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

module.exports = _defineProperty;
},{"../core-js/object/define-property":90}],107:[function(_dereq_,module,exports){
var _Object$getOwnPropertyDescriptor = _dereq_("../core-js/object/get-own-property-descriptor");

var _Reflect$get = _dereq_("../core-js/reflect/get");

var superPropBase = _dereq_("./superPropBase");

function _get(target, property, receiver) {
  if (typeof Reflect !== "undefined" && _Reflect$get) {
    module.exports = _get = _Reflect$get;
  } else {
    module.exports = _get = function _get(target, property, receiver) {
      var base = superPropBase(target, property);
      if (!base) return;

      var desc = _Object$getOwnPropertyDescriptor(base, property);

      if (desc.get) {
        return desc.get.call(receiver);
      }

      return desc.value;
    };
  }

  return _get(target, property, receiver || target);
}

module.exports = _get;
},{"../core-js/object/get-own-property-descriptor":91,"../core-js/reflect/get":96,"./superPropBase":120}],108:[function(_dereq_,module,exports){
var _Object$getPrototypeOf = _dereq_("../core-js/object/get-prototype-of");

var _Object$setPrototypeOf = _dereq_("../core-js/object/set-prototype-of");

function _getPrototypeOf(o) {
  module.exports = _getPrototypeOf = _Object$setPrototypeOf ? _Object$getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || _Object$getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

module.exports = _getPrototypeOf;
},{"../core-js/object/get-prototype-of":92,"../core-js/object/set-prototype-of":93}],109:[function(_dereq_,module,exports){
var _Object$create = _dereq_("../core-js/object/create");

var setPrototypeOf = _dereq_("./setPrototypeOf");

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = _Object$create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) setPrototypeOf(subClass, superClass);
}

module.exports = _inherits;
},{"../core-js/object/create":89,"./setPrototypeOf":118}],110:[function(_dereq_,module,exports){
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    "default": obj
  };
}

module.exports = _interopRequireDefault;
},{}],111:[function(_dereq_,module,exports){
var _Object$getOwnPropertyDescriptor = _dereq_("../core-js/object/get-own-property-descriptor");

var _Object$defineProperty = _dereq_("../core-js/object/define-property");

function _interopRequireWildcard(obj) {
  if (obj && obj.__esModule) {
    return obj;
  } else {
    var newObj = {};

    if (obj != null) {
      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
          var desc = _Object$defineProperty && _Object$getOwnPropertyDescriptor ? _Object$getOwnPropertyDescriptor(obj, key) : {};

          if (desc.get || desc.set) {
            _Object$defineProperty(newObj, key, desc);
          } else {
            newObj[key] = obj[key];
          }
        }
      }
    }

    newObj["default"] = obj;
    return newObj;
  }
}

module.exports = _interopRequireWildcard;
},{"../core-js/object/define-property":90,"../core-js/object/get-own-property-descriptor":91}],112:[function(_dereq_,module,exports){
var _indexOfInstanceProperty = _dereq_("../core-js/instance/index-of");

function _isNativeFunction(fn) {
  var _context;

  return _indexOfInstanceProperty(_context = Function.toString.call(fn)).call(_context, "[native code]") !== -1;
}

module.exports = _isNativeFunction;
},{"../core-js/instance/index-of":86}],113:[function(_dereq_,module,exports){
var _Array$from = _dereq_("../core-js/array/from");

var _isIterable = _dereq_("../core-js/is-iterable");

function _iterableToArray(iter) {
  if (_isIterable(Object(iter)) || Object.prototype.toString.call(iter) === "[object Arguments]") return _Array$from(iter);
}

module.exports = _iterableToArray;
},{"../core-js/array/from":82,"../core-js/is-iterable":87}],114:[function(_dereq_,module,exports){
var _getIterator = _dereq_("../core-js/get-iterator");

function _iterableToArrayLimit(arr, i) {
  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (var _i = _getIterator(arr), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

module.exports = _iterableToArrayLimit;
},{"../core-js/get-iterator":84}],115:[function(_dereq_,module,exports){
function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance");
}

module.exports = _nonIterableRest;
},{}],116:[function(_dereq_,module,exports){
function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance");
}

module.exports = _nonIterableSpread;
},{}],117:[function(_dereq_,module,exports){
var _typeof = _dereq_("../helpers/typeof");

var assertThisInitialized = _dereq_("./assertThisInitialized");

function _possibleConstructorReturn(self, call) {
  if (call && (_typeof(call) === "object" || typeof call === "function")) {
    return call;
  }

  return assertThisInitialized(self);
}

module.exports = _possibleConstructorReturn;
},{"../helpers/typeof":122,"./assertThisInitialized":101}],118:[function(_dereq_,module,exports){
var _Object$setPrototypeOf = _dereq_("../core-js/object/set-prototype-of");

function _setPrototypeOf(o, p) {
  module.exports = _setPrototypeOf = _Object$setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

module.exports = _setPrototypeOf;
},{"../core-js/object/set-prototype-of":93}],119:[function(_dereq_,module,exports){
var arrayWithHoles = _dereq_("./arrayWithHoles");

var iterableToArrayLimit = _dereq_("./iterableToArrayLimit");

var nonIterableRest = _dereq_("./nonIterableRest");

function _slicedToArray(arr, i) {
  return arrayWithHoles(arr) || iterableToArrayLimit(arr, i) || nonIterableRest();
}

module.exports = _slicedToArray;
},{"./arrayWithHoles":99,"./iterableToArrayLimit":114,"./nonIterableRest":115}],120:[function(_dereq_,module,exports){
var getPrototypeOf = _dereq_("./getPrototypeOf");

function _superPropBase(object, property) {
  while (!Object.prototype.hasOwnProperty.call(object, property)) {
    object = getPrototypeOf(object);
    if (object === null) break;
  }

  return object;
}

module.exports = _superPropBase;
},{"./getPrototypeOf":108}],121:[function(_dereq_,module,exports){
var arrayWithoutHoles = _dereq_("./arrayWithoutHoles");

var iterableToArray = _dereq_("./iterableToArray");

var nonIterableSpread = _dereq_("./nonIterableSpread");

function _toConsumableArray(arr) {
  return arrayWithoutHoles(arr) || iterableToArray(arr) || nonIterableSpread();
}

module.exports = _toConsumableArray;
},{"./arrayWithoutHoles":100,"./iterableToArray":113,"./nonIterableSpread":116}],122:[function(_dereq_,module,exports){
var _Symbol$iterator = _dereq_("../core-js/symbol/iterator");

var _Symbol = _dereq_("../core-js/symbol");

function _typeof2(obj) { if (typeof _Symbol === "function" && typeof _Symbol$iterator === "symbol") { _typeof2 = function _typeof2(obj) { return typeof obj; }; } else { _typeof2 = function _typeof2(obj) { return obj && typeof _Symbol === "function" && obj.constructor === _Symbol && obj !== _Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof2(obj); }

function _typeof(obj) {
  if (typeof _Symbol === "function" && _typeof2(_Symbol$iterator) === "symbol") {
    module.exports = _typeof = function _typeof(obj) {
      return _typeof2(obj);
    };
  } else {
    module.exports = _typeof = function _typeof(obj) {
      return obj && typeof _Symbol === "function" && obj.constructor === _Symbol && obj !== _Symbol.prototype ? "symbol" : _typeof2(obj);
    };
  }

  return _typeof(obj);
}

module.exports = _typeof;
},{"../core-js/symbol":97,"../core-js/symbol/iterator":98}],123:[function(_dereq_,module,exports){
var _Object$create = _dereq_("../core-js/object/create");

var _Map = _dereq_("../core-js/map");

var getPrototypeOf = _dereq_("./getPrototypeOf");

var setPrototypeOf = _dereq_("./setPrototypeOf");

var isNativeFunction = _dereq_("./isNativeFunction");

var construct = _dereq_("./construct");

function _wrapNativeSuper(Class) {
  var _cache = typeof _Map === "function" ? new _Map() : undefined;

  module.exports = _wrapNativeSuper = function _wrapNativeSuper(Class) {
    if (Class === null || !isNativeFunction(Class)) return Class;

    if (typeof Class !== "function") {
      throw new TypeError("Super expression must either be null or a function");
    }

    if (typeof _cache !== "undefined") {
      if (_cache.has(Class)) return _cache.get(Class);

      _cache.set(Class, Wrapper);
    }

    function Wrapper() {
      return construct(Class, arguments, getPrototypeOf(this).constructor);
    }

    Wrapper.prototype = _Object$create(Class.prototype, {
      constructor: {
        value: Wrapper,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    return setPrototypeOf(Wrapper, Class);
  };

  return _wrapNativeSuper(Class);
}

module.exports = _wrapNativeSuper;
},{"../core-js/map":88,"../core-js/object/create":89,"./construct":104,"./getPrototypeOf":108,"./isNativeFunction":112,"./setPrototypeOf":118}],124:[function(_dereq_,module,exports){
/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var runtime = (function (exports) {
  "use strict";

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
  typeof module === "object" ? module.exports : {}
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

},{}],125:[function(_dereq_,module,exports){
module.exports = _dereq_("regenerator-runtime");

},{"regenerator-runtime":124}],126:[function(_dereq_,module,exports){

},{}],127:[function(_dereq_,module,exports){
_dereq_('../../modules/es.string.iterator');
_dereq_('../../modules/es.array.from');
var path = _dereq_('../../internals/path');

module.exports = path.Array.from;

},{"../../internals/path":277,"../../modules/es.array.from":309,"../../modules/es.string.iterator":340}],128:[function(_dereq_,module,exports){
_dereq_('../../modules/es.array.is-array');
var path = _dereq_('../../internals/path');

module.exports = path.Array.isArray;

},{"../../internals/path":277,"../../modules/es.array.is-array":312}],129:[function(_dereq_,module,exports){
_dereq_('../../../modules/es.array.concat');
var entryVirtual = _dereq_('../../../internals/entry-virtual');

module.exports = entryVirtual('Array').concat;

},{"../../../internals/entry-virtual":225,"../../../modules/es.array.concat":305}],130:[function(_dereq_,module,exports){
_dereq_('../../../modules/es.array.filter');
var entryVirtual = _dereq_('../../../internals/entry-virtual');

module.exports = entryVirtual('Array').filter;

},{"../../../internals/entry-virtual":225,"../../../modules/es.array.filter":306}],131:[function(_dereq_,module,exports){
_dereq_('../../../modules/es.array.find');
var entryVirtual = _dereq_('../../../internals/entry-virtual');

module.exports = entryVirtual('Array').find;

},{"../../../internals/entry-virtual":225,"../../../modules/es.array.find":307}],132:[function(_dereq_,module,exports){
_dereq_('../../../modules/es.array.for-each');
var entryVirtual = _dereq_('../../../internals/entry-virtual');

module.exports = entryVirtual('Array').forEach;

},{"../../../internals/entry-virtual":225,"../../../modules/es.array.for-each":308}],133:[function(_dereq_,module,exports){
_dereq_('../../../modules/es.array.includes');
var entryVirtual = _dereq_('../../../internals/entry-virtual');

module.exports = entryVirtual('Array').includes;

},{"../../../internals/entry-virtual":225,"../../../modules/es.array.includes":310}],134:[function(_dereq_,module,exports){
_dereq_('../../../modules/es.array.index-of');
var entryVirtual = _dereq_('../../../internals/entry-virtual');

module.exports = entryVirtual('Array').indexOf;

},{"../../../internals/entry-virtual":225,"../../../modules/es.array.index-of":311}],135:[function(_dereq_,module,exports){
_dereq_('../../../modules/es.array.iterator');
var entryVirtual = _dereq_('../../../internals/entry-virtual');

module.exports = entryVirtual('Array').keys;

},{"../../../internals/entry-virtual":225,"../../../modules/es.array.iterator":313}],136:[function(_dereq_,module,exports){
_dereq_('../../../modules/es.array.map');
var entryVirtual = _dereq_('../../../internals/entry-virtual');

module.exports = entryVirtual('Array').map;

},{"../../../internals/entry-virtual":225,"../../../modules/es.array.map":314}],137:[function(_dereq_,module,exports){
_dereq_('../../../modules/es.array.slice');
var entryVirtual = _dereq_('../../../internals/entry-virtual');

module.exports = entryVirtual('Array').slice;

},{"../../../internals/entry-virtual":225,"../../../modules/es.array.slice":315}],138:[function(_dereq_,module,exports){
_dereq_('../../../modules/es.array.sort');
var entryVirtual = _dereq_('../../../internals/entry-virtual');

module.exports = entryVirtual('Array').sort;

},{"../../../internals/entry-virtual":225,"../../../modules/es.array.sort":316}],139:[function(_dereq_,module,exports){
_dereq_('../../../modules/es.array.splice');
var entryVirtual = _dereq_('../../../internals/entry-virtual');

module.exports = entryVirtual('Array').splice;

},{"../../../internals/entry-virtual":225,"../../../modules/es.array.splice":317}],140:[function(_dereq_,module,exports){
_dereq_('../../../modules/es.array.iterator');
var entryVirtual = _dereq_('../../../internals/entry-virtual');

module.exports = entryVirtual('Array').values;

},{"../../../internals/entry-virtual":225,"../../../modules/es.array.iterator":313}],141:[function(_dereq_,module,exports){
_dereq_('../../../modules/es.function.bind');
var entryVirtual = _dereq_('../../../internals/entry-virtual');

module.exports = entryVirtual('Function').bind;

},{"../../../internals/entry-virtual":225,"../../../modules/es.function.bind":318}],142:[function(_dereq_,module,exports){
var bind = _dereq_('../function/virtual/bind');

var FunctionPrototype = Function.prototype;

module.exports = function (it) {
  var own = it.bind;
  return it === FunctionPrototype || (it instanceof Function && own === FunctionPrototype.bind) ? bind : own;
};

},{"../function/virtual/bind":141}],143:[function(_dereq_,module,exports){
var concat = _dereq_('../array/virtual/concat');

var ArrayPrototype = Array.prototype;

module.exports = function (it) {
  var own = it.concat;
  return it === ArrayPrototype || (it instanceof Array && own === ArrayPrototype.concat) ? concat : own;
};

},{"../array/virtual/concat":129}],144:[function(_dereq_,module,exports){
var filter = _dereq_('../array/virtual/filter');

var ArrayPrototype = Array.prototype;

module.exports = function (it) {
  var own = it.filter;
  return it === ArrayPrototype || (it instanceof Array && own === ArrayPrototype.filter) ? filter : own;
};

},{"../array/virtual/filter":130}],145:[function(_dereq_,module,exports){
var find = _dereq_('../array/virtual/find');

var ArrayPrototype = Array.prototype;

module.exports = function (it) {
  var own = it.find;
  return it === ArrayPrototype || (it instanceof Array && own === ArrayPrototype.find) ? find : own;
};

},{"../array/virtual/find":131}],146:[function(_dereq_,module,exports){
var arrayIncludes = _dereq_('../array/virtual/includes');
var stringIncludes = _dereq_('../string/virtual/includes');

var ArrayPrototype = Array.prototype;
var StringPrototype = String.prototype;

module.exports = function (it) {
  var own = it.includes;
  if (it === ArrayPrototype || (it instanceof Array && own === ArrayPrototype.includes)) return arrayIncludes;
  if (typeof it === 'string' || it === StringPrototype || (it instanceof String && own === StringPrototype.includes)) {
    return stringIncludes;
  } return own;
};

},{"../array/virtual/includes":133,"../string/virtual/includes":171}],147:[function(_dereq_,module,exports){
var indexOf = _dereq_('../array/virtual/index-of');

var ArrayPrototype = Array.prototype;

module.exports = function (it) {
  var own = it.indexOf;
  return it === ArrayPrototype || (it instanceof Array && own === ArrayPrototype.indexOf) ? indexOf : own;
};

},{"../array/virtual/index-of":134}],148:[function(_dereq_,module,exports){
var map = _dereq_('../array/virtual/map');

var ArrayPrototype = Array.prototype;

module.exports = function (it) {
  var own = it.map;
  return it === ArrayPrototype || (it instanceof Array && own === ArrayPrototype.map) ? map : own;
};

},{"../array/virtual/map":136}],149:[function(_dereq_,module,exports){
var slice = _dereq_('../array/virtual/slice');

var ArrayPrototype = Array.prototype;

module.exports = function (it) {
  var own = it.slice;
  return it === ArrayPrototype || (it instanceof Array && own === ArrayPrototype.slice) ? slice : own;
};

},{"../array/virtual/slice":137}],150:[function(_dereq_,module,exports){
var sort = _dereq_('../array/virtual/sort');

var ArrayPrototype = Array.prototype;

module.exports = function (it) {
  var own = it.sort;
  return it === ArrayPrototype || (it instanceof Array && own === ArrayPrototype.sort) ? sort : own;
};

},{"../array/virtual/sort":138}],151:[function(_dereq_,module,exports){
var splice = _dereq_('../array/virtual/splice');

var ArrayPrototype = Array.prototype;

module.exports = function (it) {
  var own = it.splice;
  return it === ArrayPrototype || (it instanceof Array && own === ArrayPrototype.splice) ? splice : own;
};

},{"../array/virtual/splice":139}],152:[function(_dereq_,module,exports){
var startsWith = _dereq_('../string/virtual/starts-with');

var StringPrototype = String.prototype;

module.exports = function (it) {
  var own = it.startsWith;
  return typeof it === 'string' || it === StringPrototype
    || (it instanceof String && own === StringPrototype.startsWith) ? startsWith : own;
};

},{"../string/virtual/starts-with":172}],153:[function(_dereq_,module,exports){
var core = _dereq_('../../internals/path');
var $JSON = core.JSON || (core.JSON = { stringify: JSON.stringify });

module.exports = function stringify(it) { // eslint-disable-line no-unused-vars
  return $JSON.stringify.apply($JSON, arguments);
};

},{"../../internals/path":277}],154:[function(_dereq_,module,exports){
_dereq_('../../modules/es.map');
_dereq_('../../modules/es.object.to-string');
_dereq_('../../modules/es.string.iterator');
_dereq_('../../modules/web.dom-collections.iterator');
var path = _dereq_('../../internals/path');

module.exports = path.Map;

},{"../../internals/path":277,"../../modules/es.map":320,"../../modules/es.object.to-string":332,"../../modules/es.string.iterator":340,"../../modules/web.dom-collections.iterator":383}],155:[function(_dereq_,module,exports){
_dereq_('../../modules/es.object.assign');
var path = _dereq_('../../internals/path');

module.exports = path.Object.assign;

},{"../../internals/path":277,"../../modules/es.object.assign":322}],156:[function(_dereq_,module,exports){
_dereq_('../../modules/es.object.create');
var path = _dereq_('../../internals/path');

var Object = path.Object;

module.exports = function create(P, D) {
  return Object.create(P, D);
};

},{"../../internals/path":277,"../../modules/es.object.create":323}],157:[function(_dereq_,module,exports){
_dereq_('../../modules/es.object.define-properties');
var path = _dereq_('../../internals/path');

var Object = path.Object;

var defineProperties = module.exports = function defineProperties(T, D) {
  return Object.defineProperties(T, D);
};

if (Object.defineProperties.sham) defineProperties.sham = true;

},{"../../internals/path":277,"../../modules/es.object.define-properties":324}],158:[function(_dereq_,module,exports){
_dereq_('../../modules/es.object.define-property');
var path = _dereq_('../../internals/path');

var Object = path.Object;

var defineProperty = module.exports = function defineProperty(it, key, desc) {
  return Object.defineProperty(it, key, desc);
};

if (Object.defineProperty.sham) defineProperty.sham = true;

},{"../../internals/path":277,"../../modules/es.object.define-property":325}],159:[function(_dereq_,module,exports){
_dereq_('../../modules/es.object.freeze');
var path = _dereq_('../../internals/path');

module.exports = path.Object.freeze;

},{"../../internals/path":277,"../../modules/es.object.freeze":326}],160:[function(_dereq_,module,exports){
_dereq_('../../modules/es.object.get-own-property-descriptor');
var path = _dereq_('../../internals/path');

var Object = path.Object;

var getOwnPropertyDescriptor = module.exports = function getOwnPropertyDescriptor(it, key) {
  return Object.getOwnPropertyDescriptor(it, key);
};

if (Object.getOwnPropertyDescriptor.sham) getOwnPropertyDescriptor.sham = true;

},{"../../internals/path":277,"../../modules/es.object.get-own-property-descriptor":327}],161:[function(_dereq_,module,exports){
_dereq_('../../modules/es.object.get-own-property-descriptors');
var path = _dereq_('../../internals/path');

module.exports = path.Object.getOwnPropertyDescriptors;

},{"../../internals/path":277,"../../modules/es.object.get-own-property-descriptors":328}],162:[function(_dereq_,module,exports){
_dereq_('../../modules/es.symbol');
var path = _dereq_('../../internals/path');

module.exports = path.Object.getOwnPropertySymbols;

},{"../../internals/path":277,"../../modules/es.symbol":347}],163:[function(_dereq_,module,exports){
_dereq_('../../modules/es.object.get-prototype-of');
var path = _dereq_('../../internals/path');

module.exports = path.Object.getPrototypeOf;

},{"../../internals/path":277,"../../modules/es.object.get-prototype-of":329}],164:[function(_dereq_,module,exports){
_dereq_('../../modules/es.object.keys');
var path = _dereq_('../../internals/path');

module.exports = path.Object.keys;

},{"../../internals/path":277,"../../modules/es.object.keys":330}],165:[function(_dereq_,module,exports){
_dereq_('../../modules/es.object.set-prototype-of');
var path = _dereq_('../../internals/path');

module.exports = path.Object.setPrototypeOf;

},{"../../internals/path":277,"../../modules/es.object.set-prototype-of":331}],166:[function(_dereq_,module,exports){
_dereq_('../modules/es.parse-int');
var path = _dereq_('../internals/path');

module.exports = path.parseInt;

},{"../internals/path":277,"../modules/es.parse-int":333}],167:[function(_dereq_,module,exports){
_dereq_('../../modules/es.object.to-string');
_dereq_('../../modules/es.string.iterator');
_dereq_('../../modules/web.dom-collections.iterator');
_dereq_('../../modules/es.promise');
_dereq_('../../modules/es.promise.finally');
var path = _dereq_('../../internals/path');

module.exports = path.Promise;

},{"../../internals/path":277,"../../modules/es.object.to-string":332,"../../modules/es.promise":335,"../../modules/es.promise.finally":334,"../../modules/es.string.iterator":340,"../../modules/web.dom-collections.iterator":383}],168:[function(_dereq_,module,exports){
_dereq_('../../modules/es.reflect.construct');
var path = _dereq_('../../internals/path');

module.exports = path.Reflect.construct;

},{"../../internals/path":277,"../../modules/es.reflect.construct":336}],169:[function(_dereq_,module,exports){
_dereq_('../../modules/es.reflect.get');
var path = _dereq_('../../internals/path');

module.exports = path.Reflect.get;

},{"../../internals/path":277,"../../modules/es.reflect.get":337}],170:[function(_dereq_,module,exports){
_dereq_('../../modules/es.set');
_dereq_('../../modules/es.object.to-string');
_dereq_('../../modules/es.string.iterator');
_dereq_('../../modules/web.dom-collections.iterator');
var path = _dereq_('../../internals/path');

module.exports = path.Set;

},{"../../internals/path":277,"../../modules/es.object.to-string":332,"../../modules/es.set":338,"../../modules/es.string.iterator":340,"../../modules/web.dom-collections.iterator":383}],171:[function(_dereq_,module,exports){
_dereq_('../../../modules/es.string.includes');
var entryVirtual = _dereq_('../../../internals/entry-virtual');

module.exports = entryVirtual('String').includes;

},{"../../../internals/entry-virtual":225,"../../../modules/es.string.includes":339}],172:[function(_dereq_,module,exports){
_dereq_('../../../modules/es.string.starts-with');
var entryVirtual = _dereq_('../../../internals/entry-virtual');

module.exports = entryVirtual('String').startsWith;

},{"../../../internals/entry-virtual":225,"../../../modules/es.string.starts-with":341}],173:[function(_dereq_,module,exports){
_dereq_('../../modules/es.array.concat');
_dereq_('../../modules/es.object.to-string');
_dereq_('../../modules/es.symbol');
_dereq_('../../modules/es.symbol.async-iterator');
_dereq_('../../modules/es.symbol.description');
_dereq_('../../modules/es.symbol.has-instance');
_dereq_('../../modules/es.symbol.is-concat-spreadable');
_dereq_('../../modules/es.symbol.iterator');
_dereq_('../../modules/es.symbol.match');
_dereq_('../../modules/es.symbol.match-all');
_dereq_('../../modules/es.symbol.replace');
_dereq_('../../modules/es.symbol.search');
_dereq_('../../modules/es.symbol.species');
_dereq_('../../modules/es.symbol.split');
_dereq_('../../modules/es.symbol.to-primitive');
_dereq_('../../modules/es.symbol.to-string-tag');
_dereq_('../../modules/es.symbol.unscopables');
_dereq_('../../modules/es.math.to-string-tag');
_dereq_('../../modules/es.json.to-string-tag');
var path = _dereq_('../../internals/path');

module.exports = path.Symbol;

},{"../../internals/path":277,"../../modules/es.array.concat":305,"../../modules/es.json.to-string-tag":319,"../../modules/es.math.to-string-tag":321,"../../modules/es.object.to-string":332,"../../modules/es.symbol":347,"../../modules/es.symbol.async-iterator":342,"../../modules/es.symbol.description":343,"../../modules/es.symbol.has-instance":344,"../../modules/es.symbol.is-concat-spreadable":345,"../../modules/es.symbol.iterator":346,"../../modules/es.symbol.match":349,"../../modules/es.symbol.match-all":348,"../../modules/es.symbol.replace":350,"../../modules/es.symbol.search":351,"../../modules/es.symbol.species":352,"../../modules/es.symbol.split":353,"../../modules/es.symbol.to-primitive":354,"../../modules/es.symbol.to-string-tag":355,"../../modules/es.symbol.unscopables":356}],174:[function(_dereq_,module,exports){
_dereq_('../../modules/es.symbol.iterator');
_dereq_('../../modules/es.string.iterator');
_dereq_('../../modules/web.dom-collections.iterator');
var WrappedWellKnownSymbolModule = _dereq_('../../internals/wrapped-well-known-symbol');

module.exports = WrappedWellKnownSymbolModule.f('iterator');

},{"../../internals/wrapped-well-known-symbol":304,"../../modules/es.string.iterator":340,"../../modules/es.symbol.iterator":346,"../../modules/web.dom-collections.iterator":383}],175:[function(_dereq_,module,exports){
_dereq_('../../modules/es.object.to-string');
_dereq_('../../modules/es.weak-map');
_dereq_('../../modules/web.dom-collections.iterator');
var path = _dereq_('../../internals/path');

module.exports = path.WeakMap;

},{"../../internals/path":277,"../../modules/es.object.to-string":332,"../../modules/es.weak-map":357,"../../modules/web.dom-collections.iterator":383}],176:[function(_dereq_,module,exports){
module.exports = _dereq_('../../es/array/from');

},{"../../es/array/from":127}],177:[function(_dereq_,module,exports){
module.exports = _dereq_('../../es/array/is-array');

},{"../../es/array/is-array":128}],178:[function(_dereq_,module,exports){
_dereq_('../modules/web.dom-collections.iterator');
_dereq_('../modules/es.string.iterator');

module.exports = _dereq_('../internals/get-iterator');

},{"../internals/get-iterator":234,"../modules/es.string.iterator":340,"../modules/web.dom-collections.iterator":383}],179:[function(_dereq_,module,exports){
module.exports = _dereq_('../../es/instance/bind');

},{"../../es/instance/bind":142}],180:[function(_dereq_,module,exports){
module.exports = _dereq_('../../es/instance/index-of');

},{"../../es/instance/index-of":147}],181:[function(_dereq_,module,exports){
_dereq_('../modules/web.dom-collections.iterator');
_dereq_('../modules/es.string.iterator');

module.exports = _dereq_('../internals/is-iterable');

},{"../internals/is-iterable":249,"../modules/es.string.iterator":340,"../modules/web.dom-collections.iterator":383}],182:[function(_dereq_,module,exports){
module.exports = _dereq_('../../es/map');

_dereq_('../../modules/esnext.map.from');
_dereq_('../../modules/esnext.map.of');
_dereq_('../../modules/esnext.map.delete-all');
_dereq_('../../modules/esnext.map.every');
_dereq_('../../modules/esnext.map.filter');
_dereq_('../../modules/esnext.map.find');
_dereq_('../../modules/esnext.map.find-key');
_dereq_('../../modules/esnext.map.group-by');
_dereq_('../../modules/esnext.map.includes');
_dereq_('../../modules/esnext.map.key-by');
_dereq_('../../modules/esnext.map.key-of');
_dereq_('../../modules/esnext.map.map-keys');
_dereq_('../../modules/esnext.map.map-values');
_dereq_('../../modules/esnext.map.merge');
_dereq_('../../modules/esnext.map.reduce');
_dereq_('../../modules/esnext.map.some');
_dereq_('../../modules/esnext.map.update');

},{"../../es/map":154,"../../modules/esnext.map.delete-all":359,"../../modules/esnext.map.every":360,"../../modules/esnext.map.filter":361,"../../modules/esnext.map.find":363,"../../modules/esnext.map.find-key":362,"../../modules/esnext.map.from":364,"../../modules/esnext.map.group-by":365,"../../modules/esnext.map.includes":366,"../../modules/esnext.map.key-by":367,"../../modules/esnext.map.key-of":368,"../../modules/esnext.map.map-keys":369,"../../modules/esnext.map.map-values":370,"../../modules/esnext.map.merge":371,"../../modules/esnext.map.of":372,"../../modules/esnext.map.reduce":373,"../../modules/esnext.map.some":374,"../../modules/esnext.map.update":375}],183:[function(_dereq_,module,exports){
module.exports = _dereq_('../../es/object/create');

},{"../../es/object/create":156}],184:[function(_dereq_,module,exports){
module.exports = _dereq_('../../es/object/define-property');

},{"../../es/object/define-property":158}],185:[function(_dereq_,module,exports){
module.exports = _dereq_('../../es/object/get-own-property-descriptor');

},{"../../es/object/get-own-property-descriptor":160}],186:[function(_dereq_,module,exports){
module.exports = _dereq_('../../es/object/get-prototype-of');

},{"../../es/object/get-prototype-of":163}],187:[function(_dereq_,module,exports){
module.exports = _dereq_('../../es/object/set-prototype-of');

},{"../../es/object/set-prototype-of":165}],188:[function(_dereq_,module,exports){
module.exports = _dereq_('../../es/promise');

_dereq_('../../modules/esnext.aggregate-error');
_dereq_('../../modules/esnext.promise.all-settled');
_dereq_('../../modules/esnext.promise.try');
_dereq_('../../modules/esnext.promise.any');

},{"../../es/promise":167,"../../modules/esnext.aggregate-error":358,"../../modules/esnext.promise.all-settled":376,"../../modules/esnext.promise.any":377,"../../modules/esnext.promise.try":378}],189:[function(_dereq_,module,exports){
module.exports = _dereq_('../../es/reflect/construct');

},{"../../es/reflect/construct":168}],190:[function(_dereq_,module,exports){
module.exports = _dereq_('../../es/reflect/get');

},{"../../es/reflect/get":169}],191:[function(_dereq_,module,exports){
module.exports = _dereq_('../../es/symbol');

_dereq_('../../modules/esnext.symbol.dispose');
_dereq_('../../modules/esnext.symbol.observable');
_dereq_('../../modules/esnext.symbol.pattern-match');
_dereq_('../../modules/esnext.symbol.replace-all');

},{"../../es/symbol":173,"../../modules/esnext.symbol.dispose":379,"../../modules/esnext.symbol.observable":380,"../../modules/esnext.symbol.pattern-match":381,"../../modules/esnext.symbol.replace-all":382}],192:[function(_dereq_,module,exports){
module.exports = _dereq_('../../es/symbol/iterator');

},{"../../es/symbol/iterator":174}],193:[function(_dereq_,module,exports){
module.exports = function (it) {
  if (typeof it != 'function') {
    throw TypeError(String(it) + ' is not a function');
  } return it;
};

},{}],194:[function(_dereq_,module,exports){
var isObject = _dereq_('../internals/is-object');

module.exports = function (it) {
  if (!isObject(it) && it !== null) {
    throw TypeError("Can't set " + String(it) + ' as a prototype');
  } return it;
};

},{"../internals/is-object":250}],195:[function(_dereq_,module,exports){
module.exports = function () { /* empty */ };

},{}],196:[function(_dereq_,module,exports){
module.exports = function (it, Constructor, name) {
  if (!(it instanceof Constructor)) {
    throw TypeError('Incorrect ' + (name ? name + ' ' : '') + 'invocation');
  } return it;
};

},{}],197:[function(_dereq_,module,exports){
var isObject = _dereq_('../internals/is-object');

module.exports = function (it) {
  if (!isObject(it)) {
    throw TypeError(String(it) + ' is not an object');
  } return it;
};

},{"../internals/is-object":250}],198:[function(_dereq_,module,exports){
'use strict';
var $forEach = _dereq_('../internals/array-iteration').forEach;
var sloppyArrayMethod = _dereq_('../internals/sloppy-array-method');

// `Array.prototype.forEach` method implementation
// https://tc39.github.io/ecma262/#sec-array.prototype.foreach
module.exports = sloppyArrayMethod('forEach') ? function forEach(callbackfn /* , thisArg */) {
  return $forEach(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
} : [].forEach;

},{"../internals/array-iteration":201,"../internals/sloppy-array-method":289}],199:[function(_dereq_,module,exports){
'use strict';
var bind = _dereq_('../internals/bind-context');
var toObject = _dereq_('../internals/to-object');
var callWithSafeIterationClosing = _dereq_('../internals/call-with-safe-iteration-closing');
var isArrayIteratorMethod = _dereq_('../internals/is-array-iterator-method');
var toLength = _dereq_('../internals/to-length');
var createProperty = _dereq_('../internals/create-property');
var getIteratorMethod = _dereq_('../internals/get-iterator-method');

// `Array.from` method implementation
// https://tc39.github.io/ecma262/#sec-array.from
module.exports = function from(arrayLike /* , mapfn = undefined, thisArg = undefined */) {
  var O = toObject(arrayLike);
  var C = typeof this == 'function' ? this : Array;
  var argumentsLength = arguments.length;
  var mapfn = argumentsLength > 1 ? arguments[1] : undefined;
  var mapping = mapfn !== undefined;
  var index = 0;
  var iteratorMethod = getIteratorMethod(O);
  var length, result, step, iterator;
  if (mapping) mapfn = bind(mapfn, argumentsLength > 2 ? arguments[2] : undefined, 2);
  // if the target is not iterable or it's an array with the default iterator - use a simple case
  if (iteratorMethod != undefined && !(C == Array && isArrayIteratorMethod(iteratorMethod))) {
    iterator = iteratorMethod.call(O);
    result = new C();
    for (;!(step = iterator.next()).done; index++) {
      createProperty(result, index, mapping
        ? callWithSafeIterationClosing(iterator, mapfn, [step.value, index], true)
        : step.value
      );
    }
  } else {
    length = toLength(O.length);
    result = new C(length);
    for (;length > index; index++) {
      createProperty(result, index, mapping ? mapfn(O[index], index) : O[index]);
    }
  }
  result.length = index;
  return result;
};

},{"../internals/bind-context":204,"../internals/call-with-safe-iteration-closing":205,"../internals/create-property":219,"../internals/get-iterator-method":233,"../internals/is-array-iterator-method":246,"../internals/to-length":297,"../internals/to-object":298}],200:[function(_dereq_,module,exports){
var toIndexedObject = _dereq_('../internals/to-indexed-object');
var toLength = _dereq_('../internals/to-length');
var toAbsoluteIndex = _dereq_('../internals/to-absolute-index');

// `Array.prototype.{ indexOf, includes }` methods implementation
var createMethod = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIndexedObject($this);
    var length = toLength(O.length);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) {
      if ((IS_INCLUDES || index in O) && O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};

module.exports = {
  // `Array.prototype.includes` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.includes
  includes: createMethod(true),
  // `Array.prototype.indexOf` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.indexof
  indexOf: createMethod(false)
};

},{"../internals/to-absolute-index":294,"../internals/to-indexed-object":295,"../internals/to-length":297}],201:[function(_dereq_,module,exports){
var bind = _dereq_('../internals/bind-context');
var IndexedObject = _dereq_('../internals/indexed-object');
var toObject = _dereq_('../internals/to-object');
var toLength = _dereq_('../internals/to-length');
var arraySpeciesCreate = _dereq_('../internals/array-species-create');

var push = [].push;

// `Array.prototype.{ forEach, map, filter, some, every, find, findIndex }` methods implementation
var createMethod = function (TYPE) {
  var IS_MAP = TYPE == 1;
  var IS_FILTER = TYPE == 2;
  var IS_SOME = TYPE == 3;
  var IS_EVERY = TYPE == 4;
  var IS_FIND_INDEX = TYPE == 6;
  var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
  return function ($this, callbackfn, that, specificCreate) {
    var O = toObject($this);
    var self = IndexedObject(O);
    var boundFunction = bind(callbackfn, that, 3);
    var length = toLength(self.length);
    var index = 0;
    var create = specificCreate || arraySpeciesCreate;
    var target = IS_MAP ? create($this, length) : IS_FILTER ? create($this, 0) : undefined;
    var value, result;
    for (;length > index; index++) if (NO_HOLES || index in self) {
      value = self[index];
      result = boundFunction(value, index, O);
      if (TYPE) {
        if (IS_MAP) target[index] = result; // map
        else if (result) switch (TYPE) {
          case 3: return true;              // some
          case 5: return value;             // find
          case 6: return index;             // findIndex
          case 2: push.call(target, value); // filter
        } else if (IS_EVERY) return false;  // every
      }
    }
    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : target;
  };
};

module.exports = {
  // `Array.prototype.forEach` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.foreach
  forEach: createMethod(0),
  // `Array.prototype.map` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.map
  map: createMethod(1),
  // `Array.prototype.filter` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.filter
  filter: createMethod(2),
  // `Array.prototype.some` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.some
  some: createMethod(3),
  // `Array.prototype.every` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.every
  every: createMethod(4),
  // `Array.prototype.find` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.find
  find: createMethod(5),
  // `Array.prototype.findIndex` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.findIndex
  findIndex: createMethod(6)
};

},{"../internals/array-species-create":203,"../internals/bind-context":204,"../internals/indexed-object":243,"../internals/to-length":297,"../internals/to-object":298}],202:[function(_dereq_,module,exports){
var fails = _dereq_('../internals/fails');
var wellKnownSymbol = _dereq_('../internals/well-known-symbol');

var SPECIES = wellKnownSymbol('species');

module.exports = function (METHOD_NAME) {
  return !fails(function () {
    var array = [];
    var constructor = array.constructor = {};
    constructor[SPECIES] = function () {
      return { foo: 1 };
    };
    return array[METHOD_NAME](Boolean).foo !== 1;
  });
};

},{"../internals/fails":228,"../internals/well-known-symbol":302}],203:[function(_dereq_,module,exports){
var isObject = _dereq_('../internals/is-object');
var isArray = _dereq_('../internals/is-array');
var wellKnownSymbol = _dereq_('../internals/well-known-symbol');

var SPECIES = wellKnownSymbol('species');

// `ArraySpeciesCreate` abstract operation
// https://tc39.github.io/ecma262/#sec-arrayspeciescreate
module.exports = function (originalArray, length) {
  var C;
  if (isArray(originalArray)) {
    C = originalArray.constructor;
    // cross-realm fallback
    if (typeof C == 'function' && (C === Array || isArray(C.prototype))) C = undefined;
    else if (isObject(C)) {
      C = C[SPECIES];
      if (C === null) C = undefined;
    }
  } return new (C === undefined ? Array : C)(length === 0 ? 0 : length);
};

},{"../internals/is-array":247,"../internals/is-object":250,"../internals/well-known-symbol":302}],204:[function(_dereq_,module,exports){
var aFunction = _dereq_('../internals/a-function');

// optional / simple context binding
module.exports = function (fn, that, length) {
  aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 0: return function () {
      return fn.call(that);
    };
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};

},{"../internals/a-function":193}],205:[function(_dereq_,module,exports){
var anObject = _dereq_('../internals/an-object');

// call something on iterator step with safe closing on error
module.exports = function (iterator, fn, value, ENTRIES) {
  try {
    return ENTRIES ? fn(anObject(value)[0], value[1]) : fn(value);
  // 7.4.6 IteratorClose(iterator, completion)
  } catch (error) {
    var returnMethod = iterator['return'];
    if (returnMethod !== undefined) anObject(returnMethod.call(iterator));
    throw error;
  }
};

},{"../internals/an-object":197}],206:[function(_dereq_,module,exports){
var wellKnownSymbol = _dereq_('../internals/well-known-symbol');

var ITERATOR = wellKnownSymbol('iterator');
var SAFE_CLOSING = false;

try {
  var called = 0;
  var iteratorWithReturn = {
    next: function () {
      return { done: !!called++ };
    },
    'return': function () {
      SAFE_CLOSING = true;
    }
  };
  iteratorWithReturn[ITERATOR] = function () {
    return this;
  };
  // eslint-disable-next-line no-throw-literal
  Array.from(iteratorWithReturn, function () { throw 2; });
} catch (error) { /* empty */ }

module.exports = function (exec, SKIP_CLOSING) {
  if (!SKIP_CLOSING && !SAFE_CLOSING) return false;
  var ITERATION_SUPPORT = false;
  try {
    var object = {};
    object[ITERATOR] = function () {
      return {
        next: function () {
          return { done: ITERATION_SUPPORT = true };
        }
      };
    };
    exec(object);
  } catch (error) { /* empty */ }
  return ITERATION_SUPPORT;
};

},{"../internals/well-known-symbol":302}],207:[function(_dereq_,module,exports){
var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};

},{}],208:[function(_dereq_,module,exports){
var classofRaw = _dereq_('../internals/classof-raw');
var wellKnownSymbol = _dereq_('../internals/well-known-symbol');

var TO_STRING_TAG = wellKnownSymbol('toStringTag');
// ES3 wrong here
var CORRECT_ARGUMENTS = classofRaw(function () { return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (error) { /* empty */ }
};

// getting tag from ES6+ `Object.prototype.toString`
module.exports = function (it) {
  var O, tag, result;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (tag = tryGet(O = Object(it), TO_STRING_TAG)) == 'string' ? tag
    // builtinTag case
    : CORRECT_ARGUMENTS ? classofRaw(O)
    // ES3 arguments fallback
    : (result = classofRaw(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : result;
};

},{"../internals/classof-raw":207,"../internals/well-known-symbol":302}],209:[function(_dereq_,module,exports){
'use strict';
var anObject = _dereq_('../internals/an-object');
var aFunction = _dereq_('../internals/a-function');

// https://github.com/tc39/collection-methods
module.exports = function (/* ...elements */) {
  var collection = anObject(this);
  var remover = aFunction(collection['delete']);
  var allDeleted = true;
  for (var k = 0, len = arguments.length; k < len; k++) {
    allDeleted = allDeleted && remover.call(collection, arguments[k]);
  }
  return !!allDeleted;
};

},{"../internals/a-function":193,"../internals/an-object":197}],210:[function(_dereq_,module,exports){
'use strict';
// https://tc39.github.io/proposal-setmap-offrom/
var aFunction = _dereq_('../internals/a-function');
var bind = _dereq_('../internals/bind-context');
var iterate = _dereq_('../internals/iterate');

module.exports = function from(source /* , mapFn, thisArg */) {
  var length = arguments.length;
  var mapFn = length > 1 ? arguments[1] : undefined;
  var mapping, A, n, boundFunction;
  aFunction(this);
  mapping = mapFn !== undefined;
  if (mapping) aFunction(mapFn);
  if (source == undefined) return new this();
  A = [];
  if (mapping) {
    n = 0;
    boundFunction = bind(mapFn, length > 2 ? arguments[2] : undefined, 2);
    iterate(source, function (nextItem) {
      A.push(boundFunction(nextItem, n++));
    });
  } else {
    iterate(source, A.push, A);
  }
  return new this(A);
};

},{"../internals/a-function":193,"../internals/bind-context":204,"../internals/iterate":253}],211:[function(_dereq_,module,exports){
'use strict';
// https://tc39.github.io/proposal-setmap-offrom/
module.exports = function of() {
  var length = arguments.length;
  var A = new Array(length);
  while (length--) A[length] = arguments[length];
  return new this(A);
};

},{}],212:[function(_dereq_,module,exports){
'use strict';
var defineProperty = _dereq_('../internals/object-define-property').f;
var create = _dereq_('../internals/object-create');
var redefineAll = _dereq_('../internals/redefine-all');
var bind = _dereq_('../internals/bind-context');
var anInstance = _dereq_('../internals/an-instance');
var iterate = _dereq_('../internals/iterate');
var defineIterator = _dereq_('../internals/define-iterator');
var setSpecies = _dereq_('../internals/set-species');
var DESCRIPTORS = _dereq_('../internals/descriptors');
var fastKey = _dereq_('../internals/internal-metadata').fastKey;
var InternalStateModule = _dereq_('../internals/internal-state');

var setInternalState = InternalStateModule.set;
var internalStateGetterFor = InternalStateModule.getterFor;

module.exports = {
  getConstructor: function (wrapper, CONSTRUCTOR_NAME, IS_MAP, ADDER) {
    var C = wrapper(function (that, iterable) {
      anInstance(that, C, CONSTRUCTOR_NAME);
      setInternalState(that, {
        type: CONSTRUCTOR_NAME,
        index: create(null),
        first: undefined,
        last: undefined,
        size: 0
      });
      if (!DESCRIPTORS) that.size = 0;
      if (iterable != undefined) iterate(iterable, that[ADDER], that, IS_MAP);
    });

    var getInternalState = internalStateGetterFor(CONSTRUCTOR_NAME);

    var define = function (that, key, value) {
      var state = getInternalState(that);
      var entry = getEntry(that, key);
      var previous, index;
      // change existing entry
      if (entry) {
        entry.value = value;
      // create new entry
      } else {
        state.last = entry = {
          index: index = fastKey(key, true),
          key: key,
          value: value,
          previous: previous = state.last,
          next: undefined,
          removed: false
        };
        if (!state.first) state.first = entry;
        if (previous) previous.next = entry;
        if (DESCRIPTORS) state.size++;
        else that.size++;
        // add to index
        if (index !== 'F') state.index[index] = entry;
      } return that;
    };

    var getEntry = function (that, key) {
      var state = getInternalState(that);
      // fast case
      var index = fastKey(key);
      var entry;
      if (index !== 'F') return state.index[index];
      // frozen object case
      for (entry = state.first; entry; entry = entry.next) {
        if (entry.key == key) return entry;
      }
    };

    redefineAll(C.prototype, {
      // 23.1.3.1 Map.prototype.clear()
      // 23.2.3.2 Set.prototype.clear()
      clear: function clear() {
        var that = this;
        var state = getInternalState(that);
        var data = state.index;
        var entry = state.first;
        while (entry) {
          entry.removed = true;
          if (entry.previous) entry.previous = entry.previous.next = undefined;
          delete data[entry.index];
          entry = entry.next;
        }
        state.first = state.last = undefined;
        if (DESCRIPTORS) state.size = 0;
        else that.size = 0;
      },
      // 23.1.3.3 Map.prototype.delete(key)
      // 23.2.3.4 Set.prototype.delete(value)
      'delete': function (key) {
        var that = this;
        var state = getInternalState(that);
        var entry = getEntry(that, key);
        if (entry) {
          var next = entry.next;
          var prev = entry.previous;
          delete state.index[entry.index];
          entry.removed = true;
          if (prev) prev.next = next;
          if (next) next.previous = prev;
          if (state.first == entry) state.first = next;
          if (state.last == entry) state.last = prev;
          if (DESCRIPTORS) state.size--;
          else that.size--;
        } return !!entry;
      },
      // 23.2.3.6 Set.prototype.forEach(callbackfn, thisArg = undefined)
      // 23.1.3.5 Map.prototype.forEach(callbackfn, thisArg = undefined)
      forEach: function forEach(callbackfn /* , that = undefined */) {
        var state = getInternalState(this);
        var boundFunction = bind(callbackfn, arguments.length > 1 ? arguments[1] : undefined, 3);
        var entry;
        while (entry = entry ? entry.next : state.first) {
          boundFunction(entry.value, entry.key, this);
          // revert to the last existing entry
          while (entry && entry.removed) entry = entry.previous;
        }
      },
      // 23.1.3.7 Map.prototype.has(key)
      // 23.2.3.7 Set.prototype.has(value)
      has: function has(key) {
        return !!getEntry(this, key);
      }
    });

    redefineAll(C.prototype, IS_MAP ? {
      // 23.1.3.6 Map.prototype.get(key)
      get: function get(key) {
        var entry = getEntry(this, key);
        return entry && entry.value;
      },
      // 23.1.3.9 Map.prototype.set(key, value)
      set: function set(key, value) {
        return define(this, key === 0 ? 0 : key, value);
      }
    } : {
      // 23.2.3.1 Set.prototype.add(value)
      add: function add(value) {
        return define(this, value = value === 0 ? 0 : value, value);
      }
    });
    if (DESCRIPTORS) defineProperty(C.prototype, 'size', {
      get: function () {
        return getInternalState(this).size;
      }
    });
    return C;
  },
  setStrong: function (C, CONSTRUCTOR_NAME, IS_MAP) {
    var ITERATOR_NAME = CONSTRUCTOR_NAME + ' Iterator';
    var getInternalCollectionState = internalStateGetterFor(CONSTRUCTOR_NAME);
    var getInternalIteratorState = internalStateGetterFor(ITERATOR_NAME);
    // add .keys, .values, .entries, [@@iterator]
    // 23.1.3.4, 23.1.3.8, 23.1.3.11, 23.1.3.12, 23.2.3.5, 23.2.3.8, 23.2.3.10, 23.2.3.11
    defineIterator(C, CONSTRUCTOR_NAME, function (iterated, kind) {
      setInternalState(this, {
        type: ITERATOR_NAME,
        target: iterated,
        state: getInternalCollectionState(iterated),
        kind: kind,
        last: undefined
      });
    }, function () {
      var state = getInternalIteratorState(this);
      var kind = state.kind;
      var entry = state.last;
      // revert to the last existing entry
      while (entry && entry.removed) entry = entry.previous;
      // get next entry
      if (!state.target || !(state.last = entry = entry ? entry.next : state.state.first)) {
        // or finish the iteration
        state.target = undefined;
        return { value: undefined, done: true };
      }
      // return step by kind
      if (kind == 'keys') return { value: entry.key, done: false };
      if (kind == 'values') return { value: entry.value, done: false };
      return { value: [entry.key, entry.value], done: false };
    }, IS_MAP ? 'entries' : 'values', !IS_MAP, true);

    // add [@@species], 23.1.2.2, 23.2.2.2
    setSpecies(CONSTRUCTOR_NAME);
  }
};

},{"../internals/an-instance":196,"../internals/bind-context":204,"../internals/define-iterator":220,"../internals/descriptors":222,"../internals/internal-metadata":244,"../internals/internal-state":245,"../internals/iterate":253,"../internals/object-create":262,"../internals/object-define-property":264,"../internals/redefine-all":280,"../internals/set-species":285}],213:[function(_dereq_,module,exports){
'use strict';
var redefineAll = _dereq_('../internals/redefine-all');
var getWeakData = _dereq_('../internals/internal-metadata').getWeakData;
var anObject = _dereq_('../internals/an-object');
var isObject = _dereq_('../internals/is-object');
var anInstance = _dereq_('../internals/an-instance');
var iterate = _dereq_('../internals/iterate');
var ArrayIterationModule = _dereq_('../internals/array-iteration');
var $has = _dereq_('../internals/has');
var InternalStateModule = _dereq_('../internals/internal-state');

var setInternalState = InternalStateModule.set;
var internalStateGetterFor = InternalStateModule.getterFor;
var find = ArrayIterationModule.find;
var findIndex = ArrayIterationModule.findIndex;
var id = 0;

// fallback for uncaught frozen keys
var uncaughtFrozenStore = function (store) {
  return store.frozen || (store.frozen = new UncaughtFrozenStore());
};

var UncaughtFrozenStore = function () {
  this.entries = [];
};

var findUncaughtFrozen = function (store, key) {
  return find(store.entries, function (it) {
    return it[0] === key;
  });
};

UncaughtFrozenStore.prototype = {
  get: function (key) {
    var entry = findUncaughtFrozen(this, key);
    if (entry) return entry[1];
  },
  has: function (key) {
    return !!findUncaughtFrozen(this, key);
  },
  set: function (key, value) {
    var entry = findUncaughtFrozen(this, key);
    if (entry) entry[1] = value;
    else this.entries.push([key, value]);
  },
  'delete': function (key) {
    var index = findIndex(this.entries, function (it) {
      return it[0] === key;
    });
    if (~index) this.entries.splice(index, 1);
    return !!~index;
  }
};

module.exports = {
  getConstructor: function (wrapper, CONSTRUCTOR_NAME, IS_MAP, ADDER) {
    var C = wrapper(function (that, iterable) {
      anInstance(that, C, CONSTRUCTOR_NAME);
      setInternalState(that, {
        type: CONSTRUCTOR_NAME,
        id: id++,
        frozen: undefined
      });
      if (iterable != undefined) iterate(iterable, that[ADDER], that, IS_MAP);
    });

    var getInternalState = internalStateGetterFor(CONSTRUCTOR_NAME);

    var define = function (that, key, value) {
      var state = getInternalState(that);
      var data = getWeakData(anObject(key), true);
      if (data === true) uncaughtFrozenStore(state).set(key, value);
      else data[state.id] = value;
      return that;
    };

    redefineAll(C.prototype, {
      // 23.3.3.2 WeakMap.prototype.delete(key)
      // 23.4.3.3 WeakSet.prototype.delete(value)
      'delete': function (key) {
        var state = getInternalState(this);
        if (!isObject(key)) return false;
        var data = getWeakData(key);
        if (data === true) return uncaughtFrozenStore(state)['delete'](key);
        return data && $has(data, state.id) && delete data[state.id];
      },
      // 23.3.3.4 WeakMap.prototype.has(key)
      // 23.4.3.4 WeakSet.prototype.has(value)
      has: function has(key) {
        var state = getInternalState(this);
        if (!isObject(key)) return false;
        var data = getWeakData(key);
        if (data === true) return uncaughtFrozenStore(state).has(key);
        return data && $has(data, state.id);
      }
    });

    redefineAll(C.prototype, IS_MAP ? {
      // 23.3.3.3 WeakMap.prototype.get(key)
      get: function get(key) {
        var state = getInternalState(this);
        if (isObject(key)) {
          var data = getWeakData(key);
          if (data === true) return uncaughtFrozenStore(state).get(key);
          return data ? data[state.id] : undefined;
        }
      },
      // 23.3.3.5 WeakMap.prototype.set(key, value)
      set: function set(key, value) {
        return define(this, key, value);
      }
    } : {
      // 23.4.3.1 WeakSet.prototype.add(value)
      add: function add(value) {
        return define(this, value, true);
      }
    });

    return C;
  }
};

},{"../internals/an-instance":196,"../internals/an-object":197,"../internals/array-iteration":201,"../internals/has":237,"../internals/internal-metadata":244,"../internals/internal-state":245,"../internals/is-object":250,"../internals/iterate":253,"../internals/redefine-all":280}],214:[function(_dereq_,module,exports){
'use strict';
var $ = _dereq_('./export');
var global = _dereq_('../internals/global');
var InternalMetadataModule = _dereq_('../internals/internal-metadata');
var fails = _dereq_('../internals/fails');
var hide = _dereq_('../internals/hide');
var iterate = _dereq_('../internals/iterate');
var anInstance = _dereq_('../internals/an-instance');
var isObject = _dereq_('../internals/is-object');
var setToStringTag = _dereq_('../internals/set-to-string-tag');
var defineProperty = _dereq_('../internals/object-define-property').f;
var forEach = _dereq_('../internals/array-iteration').forEach;
var DESCRIPTORS = _dereq_('../internals/descriptors');
var InternalStateModule = _dereq_('../internals/internal-state');

var setInternalState = InternalStateModule.set;
var internalStateGetterFor = InternalStateModule.getterFor;

module.exports = function (CONSTRUCTOR_NAME, wrapper, common, IS_MAP, IS_WEAK) {
  var NativeConstructor = global[CONSTRUCTOR_NAME];
  var NativePrototype = NativeConstructor && NativeConstructor.prototype;
  var ADDER = IS_MAP ? 'set' : 'add';
  var exported = {};
  var Constructor;

  if (!DESCRIPTORS || typeof NativeConstructor != 'function'
    || !(IS_WEAK || NativePrototype.forEach && !fails(function () { new NativeConstructor().entries().next(); }))
  ) {
    // create collection constructor
    Constructor = common.getConstructor(wrapper, CONSTRUCTOR_NAME, IS_MAP, ADDER);
    InternalMetadataModule.REQUIRED = true;
  } else {
    Constructor = wrapper(function (target, iterable) {
      setInternalState(anInstance(target, Constructor, CONSTRUCTOR_NAME), {
        type: CONSTRUCTOR_NAME,
        collection: new NativeConstructor()
      });
      if (iterable != undefined) iterate(iterable, target[ADDER], target, IS_MAP);
    });

    var getInternalState = internalStateGetterFor(CONSTRUCTOR_NAME);

    forEach(['add', 'clear', 'delete', 'forEach', 'get', 'has', 'set', 'keys', 'values', 'entries'], function (KEY) {
      var IS_ADDER = KEY == 'add' || KEY == 'set';
      if (KEY in NativePrototype && !(IS_WEAK && KEY == 'clear')) hide(Constructor.prototype, KEY, function (a, b) {
        var collection = getInternalState(this).collection;
        if (!IS_ADDER && IS_WEAK && !isObject(a)) return KEY == 'get' ? undefined : false;
        var result = collection[KEY](a === 0 ? 0 : a, b);
        return IS_ADDER ? this : result;
      });
    });

    IS_WEAK || defineProperty(Constructor.prototype, 'size', {
      get: function () {
        return getInternalState(this).collection.size;
      }
    });
  }

  setToStringTag(Constructor, CONSTRUCTOR_NAME, false, true);

  exported[CONSTRUCTOR_NAME] = Constructor;
  $({ global: true, forced: true }, exported);

  if (!IS_WEAK) common.setStrong(Constructor, CONSTRUCTOR_NAME, IS_MAP);

  return Constructor;
};

},{"../internals/an-instance":196,"../internals/array-iteration":201,"../internals/descriptors":222,"../internals/fails":228,"../internals/global":236,"../internals/hide":239,"../internals/internal-metadata":244,"../internals/internal-state":245,"../internals/is-object":250,"../internals/iterate":253,"../internals/object-define-property":264,"../internals/set-to-string-tag":286,"./export":227}],215:[function(_dereq_,module,exports){
var wellKnownSymbol = _dereq_('../internals/well-known-symbol');

var MATCH = wellKnownSymbol('match');

module.exports = function (METHOD_NAME) {
  var regexp = /./;
  try {
    '/./'[METHOD_NAME](regexp);
  } catch (e) {
    try {
      regexp[MATCH] = false;
      return '/./'[METHOD_NAME](regexp);
    } catch (f) { /* empty */ }
  } return false;
};

},{"../internals/well-known-symbol":302}],216:[function(_dereq_,module,exports){
var fails = _dereq_('../internals/fails');

module.exports = !fails(function () {
  function F() { /* empty */ }
  F.prototype.constructor = null;
  return Object.getPrototypeOf(new F()) !== F.prototype;
});

},{"../internals/fails":228}],217:[function(_dereq_,module,exports){
'use strict';
var IteratorPrototype = _dereq_('../internals/iterators-core').IteratorPrototype;
var create = _dereq_('../internals/object-create');
var createPropertyDescriptor = _dereq_('../internals/create-property-descriptor');
var setToStringTag = _dereq_('../internals/set-to-string-tag');
var Iterators = _dereq_('../internals/iterators');

var returnThis = function () { return this; };

module.exports = function (IteratorConstructor, NAME, next) {
  var TO_STRING_TAG = NAME + ' Iterator';
  IteratorConstructor.prototype = create(IteratorPrototype, { next: createPropertyDescriptor(1, next) });
  setToStringTag(IteratorConstructor, TO_STRING_TAG, false, true);
  Iterators[TO_STRING_TAG] = returnThis;
  return IteratorConstructor;
};

},{"../internals/create-property-descriptor":218,"../internals/iterators":255,"../internals/iterators-core":254,"../internals/object-create":262,"../internals/set-to-string-tag":286}],218:[function(_dereq_,module,exports){
module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};

},{}],219:[function(_dereq_,module,exports){
'use strict';
var toPrimitive = _dereq_('../internals/to-primitive');
var definePropertyModule = _dereq_('../internals/object-define-property');
var createPropertyDescriptor = _dereq_('../internals/create-property-descriptor');

module.exports = function (object, key, value) {
  var propertyKey = toPrimitive(key);
  if (propertyKey in object) definePropertyModule.f(object, propertyKey, createPropertyDescriptor(0, value));
  else object[propertyKey] = value;
};

},{"../internals/create-property-descriptor":218,"../internals/object-define-property":264,"../internals/to-primitive":299}],220:[function(_dereq_,module,exports){
'use strict';
var $ = _dereq_('../internals/export');
var createIteratorConstructor = _dereq_('../internals/create-iterator-constructor');
var getPrototypeOf = _dereq_('../internals/object-get-prototype-of');
var setPrototypeOf = _dereq_('../internals/object-set-prototype-of');
var setToStringTag = _dereq_('../internals/set-to-string-tag');
var hide = _dereq_('../internals/hide');
var redefine = _dereq_('../internals/redefine');
var wellKnownSymbol = _dereq_('../internals/well-known-symbol');
var IS_PURE = _dereq_('../internals/is-pure');
var Iterators = _dereq_('../internals/iterators');
var IteratorsCore = _dereq_('../internals/iterators-core');

var IteratorPrototype = IteratorsCore.IteratorPrototype;
var BUGGY_SAFARI_ITERATORS = IteratorsCore.BUGGY_SAFARI_ITERATORS;
var ITERATOR = wellKnownSymbol('iterator');
var KEYS = 'keys';
var VALUES = 'values';
var ENTRIES = 'entries';

var returnThis = function () { return this; };

module.exports = function (Iterable, NAME, IteratorConstructor, next, DEFAULT, IS_SET, FORCED) {
  createIteratorConstructor(IteratorConstructor, NAME, next);

  var getIterationMethod = function (KIND) {
    if (KIND === DEFAULT && defaultIterator) return defaultIterator;
    if (!BUGGY_SAFARI_ITERATORS && KIND in IterablePrototype) return IterablePrototype[KIND];
    switch (KIND) {
      case KEYS: return function keys() { return new IteratorConstructor(this, KIND); };
      case VALUES: return function values() { return new IteratorConstructor(this, KIND); };
      case ENTRIES: return function entries() { return new IteratorConstructor(this, KIND); };
    } return function () { return new IteratorConstructor(this); };
  };

  var TO_STRING_TAG = NAME + ' Iterator';
  var INCORRECT_VALUES_NAME = false;
  var IterablePrototype = Iterable.prototype;
  var nativeIterator = IterablePrototype[ITERATOR]
    || IterablePrototype['@@iterator']
    || DEFAULT && IterablePrototype[DEFAULT];
  var defaultIterator = !BUGGY_SAFARI_ITERATORS && nativeIterator || getIterationMethod(DEFAULT);
  var anyNativeIterator = NAME == 'Array' ? IterablePrototype.entries || nativeIterator : nativeIterator;
  var CurrentIteratorPrototype, methods, KEY;

  // fix native
  if (anyNativeIterator) {
    CurrentIteratorPrototype = getPrototypeOf(anyNativeIterator.call(new Iterable()));
    if (IteratorPrototype !== Object.prototype && CurrentIteratorPrototype.next) {
      if (!IS_PURE && getPrototypeOf(CurrentIteratorPrototype) !== IteratorPrototype) {
        if (setPrototypeOf) {
          setPrototypeOf(CurrentIteratorPrototype, IteratorPrototype);
        } else if (typeof CurrentIteratorPrototype[ITERATOR] != 'function') {
          hide(CurrentIteratorPrototype, ITERATOR, returnThis);
        }
      }
      // Set @@toStringTag to native iterators
      setToStringTag(CurrentIteratorPrototype, TO_STRING_TAG, true, true);
      if (IS_PURE) Iterators[TO_STRING_TAG] = returnThis;
    }
  }

  // fix Array#{values, @@iterator}.name in V8 / FF
  if (DEFAULT == VALUES && nativeIterator && nativeIterator.name !== VALUES) {
    INCORRECT_VALUES_NAME = true;
    defaultIterator = function values() { return nativeIterator.call(this); };
  }

  // define iterator
  if ((!IS_PURE || FORCED) && IterablePrototype[ITERATOR] !== defaultIterator) {
    hide(IterablePrototype, ITERATOR, defaultIterator);
  }
  Iterators[NAME] = defaultIterator;

  // export additional methods
  if (DEFAULT) {
    methods = {
      values: getIterationMethod(VALUES),
      keys: IS_SET ? defaultIterator : getIterationMethod(KEYS),
      entries: getIterationMethod(ENTRIES)
    };
    if (FORCED) for (KEY in methods) {
      if (BUGGY_SAFARI_ITERATORS || INCORRECT_VALUES_NAME || !(KEY in IterablePrototype)) {
        redefine(IterablePrototype, KEY, methods[KEY]);
      }
    } else $({ target: NAME, proto: true, forced: BUGGY_SAFARI_ITERATORS || INCORRECT_VALUES_NAME }, methods);
  }

  return methods;
};

},{"../internals/create-iterator-constructor":217,"../internals/export":227,"../internals/hide":239,"../internals/is-pure":251,"../internals/iterators":255,"../internals/iterators-core":254,"../internals/object-get-prototype-of":269,"../internals/object-set-prototype-of":273,"../internals/redefine":281,"../internals/set-to-string-tag":286,"../internals/well-known-symbol":302}],221:[function(_dereq_,module,exports){
var path = _dereq_('../internals/path');
var has = _dereq_('../internals/has');
var wrappedWellKnownSymbolModule = _dereq_('../internals/wrapped-well-known-symbol');
var defineProperty = _dereq_('../internals/object-define-property').f;

module.exports = function (NAME) {
  var Symbol = path.Symbol || (path.Symbol = {});
  if (!has(Symbol, NAME)) defineProperty(Symbol, NAME, {
    value: wrappedWellKnownSymbolModule.f(NAME)
  });
};

},{"../internals/has":237,"../internals/object-define-property":264,"../internals/path":277,"../internals/wrapped-well-known-symbol":304}],222:[function(_dereq_,module,exports){
var fails = _dereq_('../internals/fails');

// Thank's IE8 for his funny defineProperty
module.exports = !fails(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});

},{"../internals/fails":228}],223:[function(_dereq_,module,exports){
var global = _dereq_('../internals/global');
var isObject = _dereq_('../internals/is-object');

var document = global.document;
// typeof document.createElement is 'object' in old IE
var EXISTS = isObject(document) && isObject(document.createElement);

module.exports = function (it) {
  return EXISTS ? document.createElement(it) : {};
};

},{"../internals/global":236,"../internals/is-object":250}],224:[function(_dereq_,module,exports){
// iterable DOM collections
// flag - `iterable` interface - 'entries', 'keys', 'values', 'forEach' methods
module.exports = {
  CSSRuleList: 0,
  CSSStyleDeclaration: 0,
  CSSValueList: 0,
  ClientRectList: 0,
  DOMRectList: 0,
  DOMStringList: 0,
  DOMTokenList: 1,
  DataTransferItemList: 0,
  FileList: 0,
  HTMLAllCollection: 0,
  HTMLCollection: 0,
  HTMLFormElement: 0,
  HTMLSelectElement: 0,
  MediaList: 0,
  MimeTypeArray: 0,
  NamedNodeMap: 0,
  NodeList: 1,
  PaintRequestList: 0,
  Plugin: 0,
  PluginArray: 0,
  SVGLengthList: 0,
  SVGNumberList: 0,
  SVGPathSegList: 0,
  SVGPointList: 0,
  SVGStringList: 0,
  SVGTransformList: 0,
  SourceBufferList: 0,
  StyleSheetList: 0,
  TextTrackCueList: 0,
  TextTrackList: 0,
  TouchList: 0
};

},{}],225:[function(_dereq_,module,exports){
var path = _dereq_('../internals/path');

module.exports = function (CONSTRUCTOR) {
  return path[CONSTRUCTOR + 'Prototype'];
};

},{"../internals/path":277}],226:[function(_dereq_,module,exports){
// IE8- don't enum bug keys
module.exports = [
  'constructor',
  'hasOwnProperty',
  'isPrototypeOf',
  'propertyIsEnumerable',
  'toLocaleString',
  'toString',
  'valueOf'
];

},{}],227:[function(_dereq_,module,exports){
'use strict';
var global = _dereq_('../internals/global');
var getOwnPropertyDescriptor = _dereq_('../internals/object-get-own-property-descriptor').f;
var isForced = _dereq_('../internals/is-forced');
var path = _dereq_('../internals/path');
var bind = _dereq_('../internals/bind-context');
var hide = _dereq_('../internals/hide');
var has = _dereq_('../internals/has');

var wrapConstructor = function (NativeConstructor) {
  var Wrapper = function (a, b, c) {
    if (this instanceof NativeConstructor) {
      switch (arguments.length) {
        case 0: return new NativeConstructor();
        case 1: return new NativeConstructor(a);
        case 2: return new NativeConstructor(a, b);
      } return new NativeConstructor(a, b, c);
    } return NativeConstructor.apply(this, arguments);
  };
  Wrapper.prototype = NativeConstructor.prototype;
  return Wrapper;
};

/*
  options.target      - name of the target object
  options.global      - target is the global object
  options.stat        - export as static methods of target
  options.proto       - export as prototype methods of target
  options.real        - real prototype method for the `pure` version
  options.forced      - export even if the native feature is available
  options.bind        - bind methods to the target, required for the `pure` version
  options.wrap        - wrap constructors to preventing global pollution, required for the `pure` version
  options.unsafe      - use the simple assignment of property instead of delete + defineProperty
  options.sham        - add a flag to not completely full polyfills
  options.enumerable  - export as enumerable property
  options.noTargetGet - prevent calling a getter on target
*/
module.exports = function (options, source) {
  var TARGET = options.target;
  var GLOBAL = options.global;
  var STATIC = options.stat;
  var PROTO = options.proto;

  var nativeSource = GLOBAL ? global : STATIC ? global[TARGET] : (global[TARGET] || {}).prototype;

  var target = GLOBAL ? path : path[TARGET] || (path[TARGET] = {});
  var targetPrototype = target.prototype;

  var FORCED, USE_NATIVE, VIRTUAL_PROTOTYPE;
  var key, sourceProperty, targetProperty, nativeProperty, resultProperty, descriptor;

  for (key in source) {
    FORCED = isForced(GLOBAL ? key : TARGET + (STATIC ? '.' : '#') + key, options.forced);
    // contains in native
    USE_NATIVE = !FORCED && nativeSource && has(nativeSource, key);

    targetProperty = target[key];

    if (USE_NATIVE) if (options.noTargetGet) {
      descriptor = getOwnPropertyDescriptor(nativeSource, key);
      nativeProperty = descriptor && descriptor.value;
    } else nativeProperty = nativeSource[key];

    // export native or implementation
    sourceProperty = (USE_NATIVE && nativeProperty) ? nativeProperty : source[key];

    if (USE_NATIVE && typeof targetProperty === typeof sourceProperty) continue;

    // bind timers to global for call from export context
    if (options.bind && USE_NATIVE) resultProperty = bind(sourceProperty, global);
    // wrap global constructors for prevent changs in this version
    else if (options.wrap && USE_NATIVE) resultProperty = wrapConstructor(sourceProperty);
    // make static versions for prototype methods
    else if (PROTO && typeof sourceProperty == 'function') resultProperty = bind(Function.call, sourceProperty);
    // default case
    else resultProperty = sourceProperty;

    // add a flag to not completely full polyfills
    if (options.sham || (sourceProperty && sourceProperty.sham) || (targetProperty && targetProperty.sham)) {
      hide(resultProperty, 'sham', true);
    }

    target[key] = resultProperty;

    if (PROTO) {
      VIRTUAL_PROTOTYPE = TARGET + 'Prototype';
      if (!has(path, VIRTUAL_PROTOTYPE)) hide(path, VIRTUAL_PROTOTYPE, {});
      // export virtual prototype methods
      path[VIRTUAL_PROTOTYPE][key] = sourceProperty;
      // export real prototype methods
      if (options.real && targetPrototype && !targetPrototype[key]) hide(targetPrototype, key, sourceProperty);
    }
  }
};

},{"../internals/bind-context":204,"../internals/global":236,"../internals/has":237,"../internals/hide":239,"../internals/is-forced":248,"../internals/object-get-own-property-descriptor":265,"../internals/path":277}],228:[function(_dereq_,module,exports){
module.exports = function (exec) {
  try {
    return !!exec();
  } catch (error) {
    return true;
  }
};

},{}],229:[function(_dereq_,module,exports){
var fails = _dereq_('../internals/fails');

module.exports = !fails(function () {
  return Object.isExtensible(Object.preventExtensions({}));
});

},{"../internals/fails":228}],230:[function(_dereq_,module,exports){
'use strict';
var aFunction = _dereq_('../internals/a-function');
var isObject = _dereq_('../internals/is-object');

var slice = [].slice;
var factories = {};

var construct = function (C, argsLength, args) {
  if (!(argsLength in factories)) {
    for (var list = [], i = 0; i < argsLength; i++) list[i] = 'a[' + i + ']';
    // eslint-disable-next-line no-new-func
    factories[argsLength] = Function('C,a', 'return new C(' + list.join(',') + ')');
  } return factories[argsLength](C, args);
};

// `Function.prototype.bind` method implementation
// https://tc39.github.io/ecma262/#sec-function.prototype.bind
module.exports = Function.bind || function bind(that /* , ...args */) {
  var fn = aFunction(this);
  var partArgs = slice.call(arguments, 1);
  var boundFunction = function bound(/* args... */) {
    var args = partArgs.concat(slice.call(arguments));
    return this instanceof boundFunction ? construct(fn, args.length, args) : fn.apply(that, args);
  };
  if (isObject(fn.prototype)) boundFunction.prototype = fn.prototype;
  return boundFunction;
};

},{"../internals/a-function":193,"../internals/is-object":250}],231:[function(_dereq_,module,exports){
var shared = _dereq_('../internals/shared');

module.exports = shared('native-function-to-string', Function.toString);

},{"../internals/shared":288}],232:[function(_dereq_,module,exports){
var path = _dereq_('../internals/path');
var global = _dereq_('../internals/global');

var aFunction = function (variable) {
  return typeof variable == 'function' ? variable : undefined;
};

module.exports = function (namespace, method) {
  return arguments.length < 2 ? aFunction(path[namespace]) || aFunction(global[namespace])
    : path[namespace] && path[namespace][method] || global[namespace] && global[namespace][method];
};

},{"../internals/global":236,"../internals/path":277}],233:[function(_dereq_,module,exports){
var classof = _dereq_('../internals/classof');
var Iterators = _dereq_('../internals/iterators');
var wellKnownSymbol = _dereq_('../internals/well-known-symbol');

var ITERATOR = wellKnownSymbol('iterator');

module.exports = function (it) {
  if (it != undefined) return it[ITERATOR]
    || it['@@iterator']
    || Iterators[classof(it)];
};

},{"../internals/classof":208,"../internals/iterators":255,"../internals/well-known-symbol":302}],234:[function(_dereq_,module,exports){
var anObject = _dereq_('../internals/an-object');
var getIteratorMethod = _dereq_('../internals/get-iterator-method');

module.exports = function (it) {
  var iteratorMethod = getIteratorMethod(it);
  if (typeof iteratorMethod != 'function') {
    throw TypeError(String(it) + ' is not iterable');
  } return anObject(iteratorMethod.call(it));
};

},{"../internals/an-object":197,"../internals/get-iterator-method":233}],235:[function(_dereq_,module,exports){
var IS_PURE = _dereq_('../internals/is-pure');
var getIterator = _dereq_('../internals/get-iterator');

module.exports = IS_PURE ? getIterator : function (it) {
  // eslint-disable-next-line no-undef
  return Map.prototype.entries.call(it);
};

},{"../internals/get-iterator":234,"../internals/is-pure":251}],236:[function(_dereq_,module,exports){
(function (global){
var O = 'object';
var check = function (it) {
  return it && it.Math == Math && it;
};

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
module.exports =
  // eslint-disable-next-line no-undef
  check(typeof globalThis == O && globalThis) ||
  check(typeof window == O && window) ||
  check(typeof self == O && self) ||
  check(typeof global == O && global) ||
  // eslint-disable-next-line no-new-func
  Function('return this')();

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],237:[function(_dereq_,module,exports){
var hasOwnProperty = {}.hasOwnProperty;

module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};

},{}],238:[function(_dereq_,module,exports){
module.exports = {};

},{}],239:[function(_dereq_,module,exports){
var DESCRIPTORS = _dereq_('../internals/descriptors');
var definePropertyModule = _dereq_('../internals/object-define-property');
var createPropertyDescriptor = _dereq_('../internals/create-property-descriptor');

module.exports = DESCRIPTORS ? function (object, key, value) {
  return definePropertyModule.f(object, key, createPropertyDescriptor(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};

},{"../internals/create-property-descriptor":218,"../internals/descriptors":222,"../internals/object-define-property":264}],240:[function(_dereq_,module,exports){
var global = _dereq_('../internals/global');

module.exports = function (a, b) {
  var console = global.console;
  if (console && console.error) {
    arguments.length === 1 ? console.error(a) : console.error(a, b);
  }
};

},{"../internals/global":236}],241:[function(_dereq_,module,exports){
var getBuiltIn = _dereq_('../internals/get-built-in');

module.exports = getBuiltIn('document', 'documentElement');

},{"../internals/get-built-in":232}],242:[function(_dereq_,module,exports){
var DESCRIPTORS = _dereq_('../internals/descriptors');
var fails = _dereq_('../internals/fails');
var createElement = _dereq_('../internals/document-create-element');

// Thank's IE8 for his funny defineProperty
module.exports = !DESCRIPTORS && !fails(function () {
  return Object.defineProperty(createElement('div'), 'a', {
    get: function () { return 7; }
  }).a != 7;
});

},{"../internals/descriptors":222,"../internals/document-create-element":223,"../internals/fails":228}],243:[function(_dereq_,module,exports){
var fails = _dereq_('../internals/fails');
var classof = _dereq_('../internals/classof-raw');

var split = ''.split;

// fallback for non-array-like ES3 and non-enumerable old V8 strings
module.exports = fails(function () {
  // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
  // eslint-disable-next-line no-prototype-builtins
  return !Object('z').propertyIsEnumerable(0);
}) ? function (it) {
  return classof(it) == 'String' ? split.call(it, '') : Object(it);
} : Object;

},{"../internals/classof-raw":207,"../internals/fails":228}],244:[function(_dereq_,module,exports){
var hiddenKeys = _dereq_('../internals/hidden-keys');
var isObject = _dereq_('../internals/is-object');
var has = _dereq_('../internals/has');
var defineProperty = _dereq_('../internals/object-define-property').f;
var uid = _dereq_('../internals/uid');
var FREEZING = _dereq_('../internals/freezing');

var METADATA = uid('meta');
var id = 0;

var isExtensible = Object.isExtensible || function () {
  return true;
};

var setMetadata = function (it) {
  defineProperty(it, METADATA, { value: {
    objectID: 'O' + ++id, // object ID
    weakData: {}          // weak collections IDs
  } });
};

var fastKey = function (it, create) {
  // return a primitive with prefix
  if (!isObject(it)) return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
  if (!has(it, METADATA)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return 'F';
    // not necessary to add metadata
    if (!create) return 'E';
    // add missing metadata
    setMetadata(it);
  // return object ID
  } return it[METADATA].objectID;
};

var getWeakData = function (it, create) {
  if (!has(it, METADATA)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return true;
    // not necessary to add metadata
    if (!create) return false;
    // add missing metadata
    setMetadata(it);
  // return the store of weak collections IDs
  } return it[METADATA].weakData;
};

// add metadata on freeze-family methods calling
var onFreeze = function (it) {
  if (FREEZING && meta.REQUIRED && isExtensible(it) && !has(it, METADATA)) setMetadata(it);
  return it;
};

var meta = module.exports = {
  REQUIRED: false,
  fastKey: fastKey,
  getWeakData: getWeakData,
  onFreeze: onFreeze
};

hiddenKeys[METADATA] = true;

},{"../internals/freezing":229,"../internals/has":237,"../internals/hidden-keys":238,"../internals/is-object":250,"../internals/object-define-property":264,"../internals/uid":300}],245:[function(_dereq_,module,exports){
var NATIVE_WEAK_MAP = _dereq_('../internals/native-weak-map');
var global = _dereq_('../internals/global');
var isObject = _dereq_('../internals/is-object');
var hide = _dereq_('../internals/hide');
var objectHas = _dereq_('../internals/has');
var sharedKey = _dereq_('../internals/shared-key');
var hiddenKeys = _dereq_('../internals/hidden-keys');

var WeakMap = global.WeakMap;
var set, get, has;

var enforce = function (it) {
  return has(it) ? get(it) : set(it, {});
};

var getterFor = function (TYPE) {
  return function (it) {
    var state;
    if (!isObject(it) || (state = get(it)).type !== TYPE) {
      throw TypeError('Incompatible receiver, ' + TYPE + ' required');
    } return state;
  };
};

if (NATIVE_WEAK_MAP) {
  var store = new WeakMap();
  var wmget = store.get;
  var wmhas = store.has;
  var wmset = store.set;
  set = function (it, metadata) {
    wmset.call(store, it, metadata);
    return metadata;
  };
  get = function (it) {
    return wmget.call(store, it) || {};
  };
  has = function (it) {
    return wmhas.call(store, it);
  };
} else {
  var STATE = sharedKey('state');
  hiddenKeys[STATE] = true;
  set = function (it, metadata) {
    hide(it, STATE, metadata);
    return metadata;
  };
  get = function (it) {
    return objectHas(it, STATE) ? it[STATE] : {};
  };
  has = function (it) {
    return objectHas(it, STATE);
  };
}

module.exports = {
  set: set,
  get: get,
  has: has,
  enforce: enforce,
  getterFor: getterFor
};

},{"../internals/global":236,"../internals/has":237,"../internals/hidden-keys":238,"../internals/hide":239,"../internals/is-object":250,"../internals/native-weak-map":258,"../internals/shared-key":287}],246:[function(_dereq_,module,exports){
var wellKnownSymbol = _dereq_('../internals/well-known-symbol');
var Iterators = _dereq_('../internals/iterators');

var ITERATOR = wellKnownSymbol('iterator');
var ArrayPrototype = Array.prototype;

// check on default Array iterator
module.exports = function (it) {
  return it !== undefined && (Iterators.Array === it || ArrayPrototype[ITERATOR] === it);
};

},{"../internals/iterators":255,"../internals/well-known-symbol":302}],247:[function(_dereq_,module,exports){
var classof = _dereq_('../internals/classof-raw');

// `IsArray` abstract operation
// https://tc39.github.io/ecma262/#sec-isarray
module.exports = Array.isArray || function isArray(arg) {
  return classof(arg) == 'Array';
};

},{"../internals/classof-raw":207}],248:[function(_dereq_,module,exports){
var fails = _dereq_('../internals/fails');

var replacement = /#|\.prototype\./;

var isForced = function (feature, detection) {
  var value = data[normalize(feature)];
  return value == POLYFILL ? true
    : value == NATIVE ? false
    : typeof detection == 'function' ? fails(detection)
    : !!detection;
};

var normalize = isForced.normalize = function (string) {
  return String(string).replace(replacement, '.').toLowerCase();
};

var data = isForced.data = {};
var NATIVE = isForced.NATIVE = 'N';
var POLYFILL = isForced.POLYFILL = 'P';

module.exports = isForced;

},{"../internals/fails":228}],249:[function(_dereq_,module,exports){
var classof = _dereq_('../internals/classof');
var wellKnownSymbol = _dereq_('../internals/well-known-symbol');
var Iterators = _dereq_('../internals/iterators');

var ITERATOR = wellKnownSymbol('iterator');

module.exports = function (it) {
  var O = Object(it);
  return O[ITERATOR] !== undefined
    || '@@iterator' in O
    // eslint-disable-next-line no-prototype-builtins
    || Iterators.hasOwnProperty(classof(O));
};

},{"../internals/classof":208,"../internals/iterators":255,"../internals/well-known-symbol":302}],250:[function(_dereq_,module,exports){
module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};

},{}],251:[function(_dereq_,module,exports){
module.exports = true;

},{}],252:[function(_dereq_,module,exports){
var isObject = _dereq_('../internals/is-object');
var classof = _dereq_('../internals/classof-raw');
var wellKnownSymbol = _dereq_('../internals/well-known-symbol');

var MATCH = wellKnownSymbol('match');

// `IsRegExp` abstract operation
// https://tc39.github.io/ecma262/#sec-isregexp
module.exports = function (it) {
  var isRegExp;
  return isObject(it) && ((isRegExp = it[MATCH]) !== undefined ? !!isRegExp : classof(it) == 'RegExp');
};

},{"../internals/classof-raw":207,"../internals/is-object":250,"../internals/well-known-symbol":302}],253:[function(_dereq_,module,exports){
var anObject = _dereq_('../internals/an-object');
var isArrayIteratorMethod = _dereq_('../internals/is-array-iterator-method');
var toLength = _dereq_('../internals/to-length');
var bind = _dereq_('../internals/bind-context');
var getIteratorMethod = _dereq_('../internals/get-iterator-method');
var callWithSafeIterationClosing = _dereq_('../internals/call-with-safe-iteration-closing');

var Result = function (stopped, result) {
  this.stopped = stopped;
  this.result = result;
};

var iterate = module.exports = function (iterable, fn, that, AS_ENTRIES, IS_ITERATOR) {
  var boundFunction = bind(fn, that, AS_ENTRIES ? 2 : 1);
  var iterator, iterFn, index, length, result, step;

  if (IS_ITERATOR) {
    iterator = iterable;
  } else {
    iterFn = getIteratorMethod(iterable);
    if (typeof iterFn != 'function') throw TypeError('Target is not iterable');
    // optimisation for array iterators
    if (isArrayIteratorMethod(iterFn)) {
      for (index = 0, length = toLength(iterable.length); length > index; index++) {
        result = AS_ENTRIES
          ? boundFunction(anObject(step = iterable[index])[0], step[1])
          : boundFunction(iterable[index]);
        if (result && result instanceof Result) return result;
      } return new Result(false);
    }
    iterator = iterFn.call(iterable);
  }

  while (!(step = iterator.next()).done) {
    result = callWithSafeIterationClosing(iterator, boundFunction, step.value, AS_ENTRIES);
    if (result && result instanceof Result) return result;
  } return new Result(false);
};

iterate.stop = function (result) {
  return new Result(true, result);
};

},{"../internals/an-object":197,"../internals/bind-context":204,"../internals/call-with-safe-iteration-closing":205,"../internals/get-iterator-method":233,"../internals/is-array-iterator-method":246,"../internals/to-length":297}],254:[function(_dereq_,module,exports){
'use strict';
var getPrototypeOf = _dereq_('../internals/object-get-prototype-of');
var hide = _dereq_('../internals/hide');
var has = _dereq_('../internals/has');
var wellKnownSymbol = _dereq_('../internals/well-known-symbol');
var IS_PURE = _dereq_('../internals/is-pure');

var ITERATOR = wellKnownSymbol('iterator');
var BUGGY_SAFARI_ITERATORS = false;

var returnThis = function () { return this; };

// `%IteratorPrototype%` object
// https://tc39.github.io/ecma262/#sec-%iteratorprototype%-object
var IteratorPrototype, PrototypeOfArrayIteratorPrototype, arrayIterator;

if ([].keys) {
  arrayIterator = [].keys();
  // Safari 8 has buggy iterators w/o `next`
  if (!('next' in arrayIterator)) BUGGY_SAFARI_ITERATORS = true;
  else {
    PrototypeOfArrayIteratorPrototype = getPrototypeOf(getPrototypeOf(arrayIterator));
    if (PrototypeOfArrayIteratorPrototype !== Object.prototype) IteratorPrototype = PrototypeOfArrayIteratorPrototype;
  }
}

if (IteratorPrototype == undefined) IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
if (!IS_PURE && !has(IteratorPrototype, ITERATOR)) hide(IteratorPrototype, ITERATOR, returnThis);

module.exports = {
  IteratorPrototype: IteratorPrototype,
  BUGGY_SAFARI_ITERATORS: BUGGY_SAFARI_ITERATORS
};

},{"../internals/has":237,"../internals/hide":239,"../internals/is-pure":251,"../internals/object-get-prototype-of":269,"../internals/well-known-symbol":302}],255:[function(_dereq_,module,exports){
arguments[4][238][0].apply(exports,arguments)
},{"dup":238}],256:[function(_dereq_,module,exports){
var global = _dereq_('../internals/global');
var getOwnPropertyDescriptor = _dereq_('../internals/object-get-own-property-descriptor').f;
var classof = _dereq_('../internals/classof-raw');
var macrotask = _dereq_('../internals/task').set;
var userAgent = _dereq_('../internals/user-agent');

var MutationObserver = global.MutationObserver || global.WebKitMutationObserver;
var process = global.process;
var Promise = global.Promise;
var IS_NODE = classof(process) == 'process';
// Node.js 11 shows ExperimentalWarning on getting `queueMicrotask`
var queueMicrotaskDescriptor = getOwnPropertyDescriptor(global, 'queueMicrotask');
var queueMicrotask = queueMicrotaskDescriptor && queueMicrotaskDescriptor.value;

var flush, head, last, notify, toggle, node, promise;

// modern engines have queueMicrotask method
if (!queueMicrotask) {
  flush = function () {
    var parent, fn;
    if (IS_NODE && (parent = process.domain)) parent.exit();
    while (head) {
      fn = head.fn;
      head = head.next;
      try {
        fn();
      } catch (error) {
        if (head) notify();
        else last = undefined;
        throw error;
      }
    } last = undefined;
    if (parent) parent.enter();
  };

  // Node.js
  if (IS_NODE) {
    notify = function () {
      process.nextTick(flush);
    };
  // browsers with MutationObserver, except iOS - https://github.com/zloirock/core-js/issues/339
  } else if (MutationObserver && !/(iphone|ipod|ipad).*applewebkit/i.test(userAgent)) {
    toggle = true;
    node = document.createTextNode('');
    new MutationObserver(flush).observe(node, { characterData: true }); // eslint-disable-line no-new
    notify = function () {
      node.data = toggle = !toggle;
    };
  // environments with maybe non-completely correct, but existent Promise
  } else if (Promise && Promise.resolve) {
    // Promise.resolve without an argument throws an error in LG WebOS 2
    promise = Promise.resolve(undefined);
    notify = function () {
      promise.then(flush);
    };
  // for other environments - macrotask based on:
  // - setImmediate
  // - MessageChannel
  // - window.postMessag
  // - onreadystatechange
  // - setTimeout
  } else {
    notify = function () {
      // strange IE + webpack dev server bug - use .call(global)
      macrotask.call(global, flush);
    };
  }
}

module.exports = queueMicrotask || function (fn) {
  var task = { fn: fn, next: undefined };
  if (last) last.next = task;
  if (!head) {
    head = task;
    notify();
  } last = task;
};

},{"../internals/classof-raw":207,"../internals/global":236,"../internals/object-get-own-property-descriptor":265,"../internals/task":293,"../internals/user-agent":301}],257:[function(_dereq_,module,exports){
var fails = _dereq_('../internals/fails');

module.exports = !!Object.getOwnPropertySymbols && !fails(function () {
  // Chrome 38 Symbol has incorrect toString conversion
  // eslint-disable-next-line no-undef
  return !String(Symbol());
});

},{"../internals/fails":228}],258:[function(_dereq_,module,exports){
var global = _dereq_('../internals/global');
var nativeFunctionToString = _dereq_('../internals/function-to-string');

var WeakMap = global.WeakMap;

module.exports = typeof WeakMap === 'function' && /native code/.test(nativeFunctionToString.call(WeakMap));

},{"../internals/function-to-string":231,"../internals/global":236}],259:[function(_dereq_,module,exports){
'use strict';
var aFunction = _dereq_('../internals/a-function');

var PromiseCapability = function (C) {
  var resolve, reject;
  this.promise = new C(function ($$resolve, $$reject) {
    if (resolve !== undefined || reject !== undefined) throw TypeError('Bad Promise constructor');
    resolve = $$resolve;
    reject = $$reject;
  });
  this.resolve = aFunction(resolve);
  this.reject = aFunction(reject);
};

// 25.4.1.5 NewPromiseCapability(C)
module.exports.f = function (C) {
  return new PromiseCapability(C);
};

},{"../internals/a-function":193}],260:[function(_dereq_,module,exports){
var isRegExp = _dereq_('../internals/is-regexp');

module.exports = function (it) {
  if (isRegExp(it)) {
    throw TypeError("The method doesn't accept regular expressions");
  } return it;
};

},{"../internals/is-regexp":252}],261:[function(_dereq_,module,exports){
'use strict';
var DESCRIPTORS = _dereq_('../internals/descriptors');
var fails = _dereq_('../internals/fails');
var objectKeys = _dereq_('../internals/object-keys');
var getOwnPropertySymbolsModule = _dereq_('../internals/object-get-own-property-symbols');
var propertyIsEnumerableModule = _dereq_('../internals/object-property-is-enumerable');
var toObject = _dereq_('../internals/to-object');
var IndexedObject = _dereq_('../internals/indexed-object');

var nativeAssign = Object.assign;

// `Object.assign` method
// https://tc39.github.io/ecma262/#sec-object.assign
// should work with symbols and should have deterministic property order (V8 bug)
module.exports = !nativeAssign || fails(function () {
  var A = {};
  var B = {};
  // eslint-disable-next-line no-undef
  var symbol = Symbol();
  var alphabet = 'abcdefghijklmnopqrst';
  A[symbol] = 7;
  alphabet.split('').forEach(function (chr) { B[chr] = chr; });
  return nativeAssign({}, A)[symbol] != 7 || objectKeys(nativeAssign({}, B)).join('') != alphabet;
}) ? function assign(target, source) { // eslint-disable-line no-unused-vars
  var T = toObject(target);
  var argumentsLength = arguments.length;
  var index = 1;
  var getOwnPropertySymbols = getOwnPropertySymbolsModule.f;
  var propertyIsEnumerable = propertyIsEnumerableModule.f;
  while (argumentsLength > index) {
    var S = IndexedObject(arguments[index++]);
    var keys = getOwnPropertySymbols ? objectKeys(S).concat(getOwnPropertySymbols(S)) : objectKeys(S);
    var length = keys.length;
    var j = 0;
    var key;
    while (length > j) {
      key = keys[j++];
      if (!DESCRIPTORS || propertyIsEnumerable.call(S, key)) T[key] = S[key];
    }
  } return T;
} : nativeAssign;

},{"../internals/descriptors":222,"../internals/fails":228,"../internals/indexed-object":243,"../internals/object-get-own-property-symbols":268,"../internals/object-keys":271,"../internals/object-property-is-enumerable":272,"../internals/to-object":298}],262:[function(_dereq_,module,exports){
var anObject = _dereq_('../internals/an-object');
var defineProperties = _dereq_('../internals/object-define-properties');
var enumBugKeys = _dereq_('../internals/enum-bug-keys');
var hiddenKeys = _dereq_('../internals/hidden-keys');
var html = _dereq_('../internals/html');
var documentCreateElement = _dereq_('../internals/document-create-element');
var sharedKey = _dereq_('../internals/shared-key');
var IE_PROTO = sharedKey('IE_PROTO');

var PROTOTYPE = 'prototype';
var Empty = function () { /* empty */ };

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = documentCreateElement('iframe');
  var length = enumBugKeys.length;
  var lt = '<';
  var script = 'script';
  var gt = '>';
  var js = 'java' + script + ':';
  var iframeDocument;
  iframe.style.display = 'none';
  html.appendChild(iframe);
  iframe.src = String(js);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + script + gt + 'document.F=Object' + lt + '/' + script + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while (length--) delete createDict[PROTOTYPE][enumBugKeys[length]];
  return createDict();
};

// `Object.create` method
// https://tc39.github.io/ecma262/#sec-object.create
module.exports = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    Empty[PROTOTYPE] = anObject(O);
    result = new Empty();
    Empty[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = createDict();
  return Properties === undefined ? result : defineProperties(result, Properties);
};

hiddenKeys[IE_PROTO] = true;

},{"../internals/an-object":197,"../internals/document-create-element":223,"../internals/enum-bug-keys":226,"../internals/hidden-keys":238,"../internals/html":241,"../internals/object-define-properties":263,"../internals/shared-key":287}],263:[function(_dereq_,module,exports){
var DESCRIPTORS = _dereq_('../internals/descriptors');
var definePropertyModule = _dereq_('../internals/object-define-property');
var anObject = _dereq_('../internals/an-object');
var objectKeys = _dereq_('../internals/object-keys');

// `Object.defineProperties` method
// https://tc39.github.io/ecma262/#sec-object.defineproperties
module.exports = DESCRIPTORS ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var keys = objectKeys(Properties);
  var length = keys.length;
  var index = 0;
  var key;
  while (length > index) definePropertyModule.f(O, key = keys[index++], Properties[key]);
  return O;
};

},{"../internals/an-object":197,"../internals/descriptors":222,"../internals/object-define-property":264,"../internals/object-keys":271}],264:[function(_dereq_,module,exports){
var DESCRIPTORS = _dereq_('../internals/descriptors');
var IE8_DOM_DEFINE = _dereq_('../internals/ie8-dom-define');
var anObject = _dereq_('../internals/an-object');
var toPrimitive = _dereq_('../internals/to-primitive');

var nativeDefineProperty = Object.defineProperty;

// `Object.defineProperty` method
// https://tc39.github.io/ecma262/#sec-object.defineproperty
exports.f = DESCRIPTORS ? nativeDefineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return nativeDefineProperty(O, P, Attributes);
  } catch (error) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};

},{"../internals/an-object":197,"../internals/descriptors":222,"../internals/ie8-dom-define":242,"../internals/to-primitive":299}],265:[function(_dereq_,module,exports){
var DESCRIPTORS = _dereq_('../internals/descriptors');
var propertyIsEnumerableModule = _dereq_('../internals/object-property-is-enumerable');
var createPropertyDescriptor = _dereq_('../internals/create-property-descriptor');
var toIndexedObject = _dereq_('../internals/to-indexed-object');
var toPrimitive = _dereq_('../internals/to-primitive');
var has = _dereq_('../internals/has');
var IE8_DOM_DEFINE = _dereq_('../internals/ie8-dom-define');

var nativeGetOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

// `Object.getOwnPropertyDescriptor` method
// https://tc39.github.io/ecma262/#sec-object.getownpropertydescriptor
exports.f = DESCRIPTORS ? nativeGetOwnPropertyDescriptor : function getOwnPropertyDescriptor(O, P) {
  O = toIndexedObject(O);
  P = toPrimitive(P, true);
  if (IE8_DOM_DEFINE) try {
    return nativeGetOwnPropertyDescriptor(O, P);
  } catch (error) { /* empty */ }
  if (has(O, P)) return createPropertyDescriptor(!propertyIsEnumerableModule.f.call(O, P), O[P]);
};

},{"../internals/create-property-descriptor":218,"../internals/descriptors":222,"../internals/has":237,"../internals/ie8-dom-define":242,"../internals/object-property-is-enumerable":272,"../internals/to-indexed-object":295,"../internals/to-primitive":299}],266:[function(_dereq_,module,exports){
var toIndexedObject = _dereq_('../internals/to-indexed-object');
var nativeGetOwnPropertyNames = _dereq_('../internals/object-get-own-property-names').f;

var toString = {}.toString;

var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
  ? Object.getOwnPropertyNames(window) : [];

var getWindowNames = function (it) {
  try {
    return nativeGetOwnPropertyNames(it);
  } catch (error) {
    return windowNames.slice();
  }
};

// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
module.exports.f = function getOwnPropertyNames(it) {
  return windowNames && toString.call(it) == '[object Window]'
    ? getWindowNames(it)
    : nativeGetOwnPropertyNames(toIndexedObject(it));
};

},{"../internals/object-get-own-property-names":267,"../internals/to-indexed-object":295}],267:[function(_dereq_,module,exports){
var internalObjectKeys = _dereq_('../internals/object-keys-internal');
var enumBugKeys = _dereq_('../internals/enum-bug-keys');

var hiddenKeys = enumBugKeys.concat('length', 'prototype');

// `Object.getOwnPropertyNames` method
// https://tc39.github.io/ecma262/#sec-object.getownpropertynames
exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return internalObjectKeys(O, hiddenKeys);
};

},{"../internals/enum-bug-keys":226,"../internals/object-keys-internal":270}],268:[function(_dereq_,module,exports){
exports.f = Object.getOwnPropertySymbols;

},{}],269:[function(_dereq_,module,exports){
var has = _dereq_('../internals/has');
var toObject = _dereq_('../internals/to-object');
var sharedKey = _dereq_('../internals/shared-key');
var CORRECT_PROTOTYPE_GETTER = _dereq_('../internals/correct-prototype-getter');

var IE_PROTO = sharedKey('IE_PROTO');
var ObjectPrototype = Object.prototype;

// `Object.getPrototypeOf` method
// https://tc39.github.io/ecma262/#sec-object.getprototypeof
module.exports = CORRECT_PROTOTYPE_GETTER ? Object.getPrototypeOf : function (O) {
  O = toObject(O);
  if (has(O, IE_PROTO)) return O[IE_PROTO];
  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectPrototype : null;
};

},{"../internals/correct-prototype-getter":216,"../internals/has":237,"../internals/shared-key":287,"../internals/to-object":298}],270:[function(_dereq_,module,exports){
var has = _dereq_('../internals/has');
var toIndexedObject = _dereq_('../internals/to-indexed-object');
var indexOf = _dereq_('../internals/array-includes').indexOf;
var hiddenKeys = _dereq_('../internals/hidden-keys');

module.exports = function (object, names) {
  var O = toIndexedObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) !has(hiddenKeys, key) && has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (has(O, key = names[i++])) {
    ~indexOf(result, key) || result.push(key);
  }
  return result;
};

},{"../internals/array-includes":200,"../internals/has":237,"../internals/hidden-keys":238,"../internals/to-indexed-object":295}],271:[function(_dereq_,module,exports){
var internalObjectKeys = _dereq_('../internals/object-keys-internal');
var enumBugKeys = _dereq_('../internals/enum-bug-keys');

// `Object.keys` method
// https://tc39.github.io/ecma262/#sec-object.keys
module.exports = Object.keys || function keys(O) {
  return internalObjectKeys(O, enumBugKeys);
};

},{"../internals/enum-bug-keys":226,"../internals/object-keys-internal":270}],272:[function(_dereq_,module,exports){
'use strict';
var nativePropertyIsEnumerable = {}.propertyIsEnumerable;
var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

// Nashorn ~ JDK8 bug
var NASHORN_BUG = getOwnPropertyDescriptor && !nativePropertyIsEnumerable.call({ 1: 2 }, 1);

// `Object.prototype.propertyIsEnumerable` method implementation
// https://tc39.github.io/ecma262/#sec-object.prototype.propertyisenumerable
exports.f = NASHORN_BUG ? function propertyIsEnumerable(V) {
  var descriptor = getOwnPropertyDescriptor(this, V);
  return !!descriptor && descriptor.enumerable;
} : nativePropertyIsEnumerable;

},{}],273:[function(_dereq_,module,exports){
var anObject = _dereq_('../internals/an-object');
var aPossiblePrototype = _dereq_('../internals/a-possible-prototype');

// `Object.setPrototypeOf` method
// https://tc39.github.io/ecma262/#sec-object.setprototypeof
// Works with __proto__ only. Old v8 can't work with null proto objects.
/* eslint-disable no-proto */
module.exports = Object.setPrototypeOf || ('__proto__' in {} ? function () {
  var CORRECT_SETTER = false;
  var test = {};
  var setter;
  try {
    setter = Object.getOwnPropertyDescriptor(Object.prototype, '__proto__').set;
    setter.call(test, []);
    CORRECT_SETTER = test instanceof Array;
  } catch (error) { /* empty */ }
  return function setPrototypeOf(O, proto) {
    anObject(O);
    aPossiblePrototype(proto);
    if (CORRECT_SETTER) setter.call(O, proto);
    else O.__proto__ = proto;
    return O;
  };
}() : undefined);

},{"../internals/a-possible-prototype":194,"../internals/an-object":197}],274:[function(_dereq_,module,exports){
'use strict';
var classof = _dereq_('../internals/classof');
var wellKnownSymbol = _dereq_('../internals/well-known-symbol');

var TO_STRING_TAG = wellKnownSymbol('toStringTag');
var test = {};

test[TO_STRING_TAG] = 'z';

// `Object.prototype.toString` method implementation
// https://tc39.github.io/ecma262/#sec-object.prototype.tostring
module.exports = String(test) !== '[object z]' ? function toString() {
  return '[object ' + classof(this) + ']';
} : test.toString;

},{"../internals/classof":208,"../internals/well-known-symbol":302}],275:[function(_dereq_,module,exports){
var getBuiltIn = _dereq_('../internals/get-built-in');
var getOwnPropertyNamesModule = _dereq_('../internals/object-get-own-property-names');
var getOwnPropertySymbolsModule = _dereq_('../internals/object-get-own-property-symbols');
var anObject = _dereq_('../internals/an-object');

// all object keys, includes non-enumerable and symbols
module.exports = getBuiltIn('Reflect', 'ownKeys') || function ownKeys(it) {
  var keys = getOwnPropertyNamesModule.f(anObject(it));
  var getOwnPropertySymbols = getOwnPropertySymbolsModule.f;
  return getOwnPropertySymbols ? keys.concat(getOwnPropertySymbols(it)) : keys;
};

},{"../internals/an-object":197,"../internals/get-built-in":232,"../internals/object-get-own-property-names":267,"../internals/object-get-own-property-symbols":268}],276:[function(_dereq_,module,exports){
var global = _dereq_('../internals/global');
var trim = _dereq_('../internals/string-trim').trim;
var whitespaces = _dereq_('../internals/whitespaces');

var nativeParseInt = global.parseInt;
var hex = /^[+-]?0[Xx]/;
var FORCED = nativeParseInt(whitespaces + '08') !== 8 || nativeParseInt(whitespaces + '0x16') !== 22;

// `parseInt` method
// https://tc39.github.io/ecma262/#sec-parseint-string-radix
module.exports = FORCED ? function parseInt(string, radix) {
  var S = trim(String(string));
  return nativeParseInt(S, (radix >>> 0) || (hex.test(S) ? 16 : 10));
} : nativeParseInt;

},{"../internals/global":236,"../internals/string-trim":292,"../internals/whitespaces":303}],277:[function(_dereq_,module,exports){
arguments[4][238][0].apply(exports,arguments)
},{"dup":238}],278:[function(_dereq_,module,exports){
module.exports = function (exec) {
  try {
    return { error: false, value: exec() };
  } catch (error) {
    return { error: true, value: error };
  }
};

},{}],279:[function(_dereq_,module,exports){
var anObject = _dereq_('../internals/an-object');
var isObject = _dereq_('../internals/is-object');
var newPromiseCapability = _dereq_('../internals/new-promise-capability');

module.exports = function (C, x) {
  anObject(C);
  if (isObject(x) && x.constructor === C) return x;
  var promiseCapability = newPromiseCapability.f(C);
  var resolve = promiseCapability.resolve;
  resolve(x);
  return promiseCapability.promise;
};

},{"../internals/an-object":197,"../internals/is-object":250,"../internals/new-promise-capability":259}],280:[function(_dereq_,module,exports){
var redefine = _dereq_('../internals/redefine');

module.exports = function (target, src, options) {
  for (var key in src) {
    if (options && options.unsafe && target[key]) target[key] = src[key];
    else redefine(target, key, src[key], options);
  } return target;
};

},{"../internals/redefine":281}],281:[function(_dereq_,module,exports){
var hide = _dereq_('../internals/hide');

module.exports = function (target, key, value, options) {
  if (options && options.enumerable) target[key] = value;
  else hide(target, key, value);
};

},{"../internals/hide":239}],282:[function(_dereq_,module,exports){
// `RequireObjectCoercible` abstract operation
// https://tc39.github.io/ecma262/#sec-requireobjectcoercible
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on " + it);
  return it;
};

},{}],283:[function(_dereq_,module,exports){
// `SameValueZero` abstract operation
// https://tc39.github.io/ecma262/#sec-samevaluezero
module.exports = function (x, y) {
  // eslint-disable-next-line no-self-compare
  return x === y || x != x && y != y;
};

},{}],284:[function(_dereq_,module,exports){
var global = _dereq_('../internals/global');
var hide = _dereq_('../internals/hide');

module.exports = function (key, value) {
  try {
    hide(global, key, value);
  } catch (error) {
    global[key] = value;
  } return value;
};

},{"../internals/global":236,"../internals/hide":239}],285:[function(_dereq_,module,exports){
'use strict';
var getBuiltIn = _dereq_('../internals/get-built-in');
var definePropertyModule = _dereq_('../internals/object-define-property');
var wellKnownSymbol = _dereq_('../internals/well-known-symbol');
var DESCRIPTORS = _dereq_('../internals/descriptors');

var SPECIES = wellKnownSymbol('species');

module.exports = function (CONSTRUCTOR_NAME) {
  var Constructor = getBuiltIn(CONSTRUCTOR_NAME);
  var defineProperty = definePropertyModule.f;

  if (DESCRIPTORS && Constructor && !Constructor[SPECIES]) {
    defineProperty(Constructor, SPECIES, {
      configurable: true,
      get: function () { return this; }
    });
  }
};

},{"../internals/descriptors":222,"../internals/get-built-in":232,"../internals/object-define-property":264,"../internals/well-known-symbol":302}],286:[function(_dereq_,module,exports){
var defineProperty = _dereq_('../internals/object-define-property').f;
var hide = _dereq_('../internals/hide');
var has = _dereq_('../internals/has');
var toString = _dereq_('../internals/object-to-string');
var wellKnownSymbol = _dereq_('../internals/well-known-symbol');

var TO_STRING_TAG = wellKnownSymbol('toStringTag');
var METHOD_REQUIRED = toString !== ({}).toString;

module.exports = function (it, TAG, STATIC, SET_METHOD) {
  if (it) {
    var target = STATIC ? it : it.prototype;
    if (!has(target, TO_STRING_TAG)) {
      defineProperty(target, TO_STRING_TAG, { configurable: true, value: TAG });
    }
    if (SET_METHOD && METHOD_REQUIRED) hide(target, 'toString', toString);
  }
};

},{"../internals/has":237,"../internals/hide":239,"../internals/object-define-property":264,"../internals/object-to-string":274,"../internals/well-known-symbol":302}],287:[function(_dereq_,module,exports){
var shared = _dereq_('../internals/shared');
var uid = _dereq_('../internals/uid');

var keys = shared('keys');

module.exports = function (key) {
  return keys[key] || (keys[key] = uid(key));
};

},{"../internals/shared":288,"../internals/uid":300}],288:[function(_dereq_,module,exports){
var global = _dereq_('../internals/global');
var setGlobal = _dereq_('../internals/set-global');
var IS_PURE = _dereq_('../internals/is-pure');

var SHARED = '__core-js_shared__';
var store = global[SHARED] || setGlobal(SHARED, {});

(module.exports = function (key, value) {
  return store[key] || (store[key] = value !== undefined ? value : {});
})('versions', []).push({
  version: '3.1.3',
  mode: IS_PURE ? 'pure' : 'global',
  copyright: '© 2019 Denis Pushkarev (zloirock.ru)'
});

},{"../internals/global":236,"../internals/is-pure":251,"../internals/set-global":284}],289:[function(_dereq_,module,exports){
'use strict';
var fails = _dereq_('../internals/fails');

module.exports = function (METHOD_NAME, argument) {
  var method = [][METHOD_NAME];
  return !method || !fails(function () {
    // eslint-disable-next-line no-useless-call,no-throw-literal
    method.call(null, argument || function () { throw 1; }, 1);
  });
};

},{"../internals/fails":228}],290:[function(_dereq_,module,exports){
var anObject = _dereq_('../internals/an-object');
var aFunction = _dereq_('../internals/a-function');
var wellKnownSymbol = _dereq_('../internals/well-known-symbol');

var SPECIES = wellKnownSymbol('species');

// `SpeciesConstructor` abstract operation
// https://tc39.github.io/ecma262/#sec-speciesconstructor
module.exports = function (O, defaultConstructor) {
  var C = anObject(O).constructor;
  var S;
  return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? defaultConstructor : aFunction(S);
};

},{"../internals/a-function":193,"../internals/an-object":197,"../internals/well-known-symbol":302}],291:[function(_dereq_,module,exports){
var toInteger = _dereq_('../internals/to-integer');
var requireObjectCoercible = _dereq_('../internals/require-object-coercible');

// `String.prototype.{ codePointAt, at }` methods implementation
var createMethod = function (CONVERT_TO_STRING) {
  return function ($this, pos) {
    var S = String(requireObjectCoercible($this));
    var position = toInteger(pos);
    var size = S.length;
    var first, second;
    if (position < 0 || position >= size) return CONVERT_TO_STRING ? '' : undefined;
    first = S.charCodeAt(position);
    return first < 0xD800 || first > 0xDBFF || position + 1 === size
      || (second = S.charCodeAt(position + 1)) < 0xDC00 || second > 0xDFFF
        ? CONVERT_TO_STRING ? S.charAt(position) : first
        : CONVERT_TO_STRING ? S.slice(position, position + 2) : (first - 0xD800 << 10) + (second - 0xDC00) + 0x10000;
  };
};

module.exports = {
  // `String.prototype.codePointAt` method
  // https://tc39.github.io/ecma262/#sec-string.prototype.codepointat
  codeAt: createMethod(false),
  // `String.prototype.at` method
  // https://github.com/mathiasbynens/String.prototype.at
  charAt: createMethod(true)
};

},{"../internals/require-object-coercible":282,"../internals/to-integer":296}],292:[function(_dereq_,module,exports){
var requireObjectCoercible = _dereq_('../internals/require-object-coercible');
var whitespaces = _dereq_('../internals/whitespaces');

var whitespace = '[' + whitespaces + ']';
var ltrim = RegExp('^' + whitespace + whitespace + '*');
var rtrim = RegExp(whitespace + whitespace + '*$');

// `String.prototype.{ trim, trimStart, trimEnd, trimLeft, trimRight }` methods implementation
var createMethod = function (TYPE) {
  return function ($this) {
    var string = String(requireObjectCoercible($this));
    if (TYPE & 1) string = string.replace(ltrim, '');
    if (TYPE & 2) string = string.replace(rtrim, '');
    return string;
  };
};

module.exports = {
  // `String.prototype.{ trimLeft, trimStart }` methods
  // https://tc39.github.io/ecma262/#sec-string.prototype.trimstart
  start: createMethod(1),
  // `String.prototype.{ trimRight, trimEnd }` methods
  // https://tc39.github.io/ecma262/#sec-string.prototype.trimend
  end: createMethod(2),
  // `String.prototype.trim` method
  // https://tc39.github.io/ecma262/#sec-string.prototype.trim
  trim: createMethod(3)
};

},{"../internals/require-object-coercible":282,"../internals/whitespaces":303}],293:[function(_dereq_,module,exports){
var global = _dereq_('../internals/global');
var fails = _dereq_('../internals/fails');
var classof = _dereq_('../internals/classof-raw');
var bind = _dereq_('../internals/bind-context');
var html = _dereq_('../internals/html');
var createElement = _dereq_('../internals/document-create-element');

var location = global.location;
var set = global.setImmediate;
var clear = global.clearImmediate;
var process = global.process;
var MessageChannel = global.MessageChannel;
var Dispatch = global.Dispatch;
var counter = 0;
var queue = {};
var ONREADYSTATECHANGE = 'onreadystatechange';
var defer, channel, port;

var run = function (id) {
  // eslint-disable-next-line no-prototype-builtins
  if (queue.hasOwnProperty(id)) {
    var fn = queue[id];
    delete queue[id];
    fn();
  }
};

var runner = function (id) {
  return function () {
    run(id);
  };
};

var listener = function (event) {
  run(event.data);
};

var post = function (id) {
  // old engines have not location.origin
  global.postMessage(id + '', location.protocol + '//' + location.host);
};

// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
if (!set || !clear) {
  set = function setImmediate(fn) {
    var args = [];
    var i = 1;
    while (arguments.length > i) args.push(arguments[i++]);
    queue[++counter] = function () {
      // eslint-disable-next-line no-new-func
      (typeof fn == 'function' ? fn : Function(fn)).apply(undefined, args);
    };
    defer(counter);
    return counter;
  };
  clear = function clearImmediate(id) {
    delete queue[id];
  };
  // Node.js 0.8-
  if (classof(process) == 'process') {
    defer = function (id) {
      process.nextTick(runner(id));
    };
  // Sphere (JS game engine) Dispatch API
  } else if (Dispatch && Dispatch.now) {
    defer = function (id) {
      Dispatch.now(runner(id));
    };
  // Browsers with MessageChannel, includes WebWorkers
  } else if (MessageChannel) {
    channel = new MessageChannel();
    port = channel.port2;
    channel.port1.onmessage = listener;
    defer = bind(port.postMessage, port, 1);
  // Browsers with postMessage, skip WebWorkers
  // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
  } else if (global.addEventListener && typeof postMessage == 'function' && !global.importScripts && !fails(post)) {
    defer = post;
    global.addEventListener('message', listener, false);
  // IE8-
  } else if (ONREADYSTATECHANGE in createElement('script')) {
    defer = function (id) {
      html.appendChild(createElement('script'))[ONREADYSTATECHANGE] = function () {
        html.removeChild(this);
        run(id);
      };
    };
  // Rest old browsers
  } else {
    defer = function (id) {
      setTimeout(runner(id), 0);
    };
  }
}

module.exports = {
  set: set,
  clear: clear
};

},{"../internals/bind-context":204,"../internals/classof-raw":207,"../internals/document-create-element":223,"../internals/fails":228,"../internals/global":236,"../internals/html":241}],294:[function(_dereq_,module,exports){
var toInteger = _dereq_('../internals/to-integer');

var max = Math.max;
var min = Math.min;

// Helper for a popular repeating case of the spec:
// Let integer be ? ToInteger(index).
// If integer < 0, let result be max((length + integer), 0); else let result be min(length, length).
module.exports = function (index, length) {
  var integer = toInteger(index);
  return integer < 0 ? max(integer + length, 0) : min(integer, length);
};

},{"../internals/to-integer":296}],295:[function(_dereq_,module,exports){
// toObject with fallback for non-array-like ES3 strings
var IndexedObject = _dereq_('../internals/indexed-object');
var requireObjectCoercible = _dereq_('../internals/require-object-coercible');

module.exports = function (it) {
  return IndexedObject(requireObjectCoercible(it));
};

},{"../internals/indexed-object":243,"../internals/require-object-coercible":282}],296:[function(_dereq_,module,exports){
var ceil = Math.ceil;
var floor = Math.floor;

// `ToInteger` abstract operation
// https://tc39.github.io/ecma262/#sec-tointeger
module.exports = function (argument) {
  return isNaN(argument = +argument) ? 0 : (argument > 0 ? floor : ceil)(argument);
};

},{}],297:[function(_dereq_,module,exports){
var toInteger = _dereq_('../internals/to-integer');

var min = Math.min;

// `ToLength` abstract operation
// https://tc39.github.io/ecma262/#sec-tolength
module.exports = function (argument) {
  return argument > 0 ? min(toInteger(argument), 0x1FFFFFFFFFFFFF) : 0; // 2 ** 53 - 1 == 9007199254740991
};

},{"../internals/to-integer":296}],298:[function(_dereq_,module,exports){
var requireObjectCoercible = _dereq_('../internals/require-object-coercible');

// `ToObject` abstract operation
// https://tc39.github.io/ecma262/#sec-toobject
module.exports = function (argument) {
  return Object(requireObjectCoercible(argument));
};

},{"../internals/require-object-coercible":282}],299:[function(_dereq_,module,exports){
var isObject = _dereq_('../internals/is-object');

// `ToPrimitive` abstract operation
// https://tc39.github.io/ecma262/#sec-toprimitive
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function (input, PREFERRED_STRING) {
  if (!isObject(input)) return input;
  var fn, val;
  if (PREFERRED_STRING && typeof (fn = input.toString) == 'function' && !isObject(val = fn.call(input))) return val;
  if (typeof (fn = input.valueOf) == 'function' && !isObject(val = fn.call(input))) return val;
  if (!PREFERRED_STRING && typeof (fn = input.toString) == 'function' && !isObject(val = fn.call(input))) return val;
  throw TypeError("Can't convert object to primitive value");
};

},{"../internals/is-object":250}],300:[function(_dereq_,module,exports){
var id = 0;
var postfix = Math.random();

module.exports = function (key) {
  return 'Symbol(' + String(key === undefined ? '' : key) + ')_' + (++id + postfix).toString(36);
};

},{}],301:[function(_dereq_,module,exports){
var getBuiltIn = _dereq_('../internals/get-built-in');

module.exports = getBuiltIn('navigator', 'userAgent') || '';

},{"../internals/get-built-in":232}],302:[function(_dereq_,module,exports){
var global = _dereq_('../internals/global');
var shared = _dereq_('../internals/shared');
var uid = _dereq_('../internals/uid');
var NATIVE_SYMBOL = _dereq_('../internals/native-symbol');

var Symbol = global.Symbol;
var store = shared('wks');

module.exports = function (name) {
  return store[name] || (store[name] = NATIVE_SYMBOL && Symbol[name]
    || (NATIVE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

},{"../internals/global":236,"../internals/native-symbol":257,"../internals/shared":288,"../internals/uid":300}],303:[function(_dereq_,module,exports){
// a string of all valid unicode whitespaces
// eslint-disable-next-line max-len
module.exports = '\u0009\u000A\u000B\u000C\u000D\u0020\u00A0\u1680\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF';

},{}],304:[function(_dereq_,module,exports){
exports.f = _dereq_('../internals/well-known-symbol');

},{"../internals/well-known-symbol":302}],305:[function(_dereq_,module,exports){
'use strict';
var $ = _dereq_('../internals/export');
var fails = _dereq_('../internals/fails');
var isArray = _dereq_('../internals/is-array');
var isObject = _dereq_('../internals/is-object');
var toObject = _dereq_('../internals/to-object');
var toLength = _dereq_('../internals/to-length');
var createProperty = _dereq_('../internals/create-property');
var arraySpeciesCreate = _dereq_('../internals/array-species-create');
var arrayMethodHasSpeciesSupport = _dereq_('../internals/array-method-has-species-support');
var wellKnownSymbol = _dereq_('../internals/well-known-symbol');

var IS_CONCAT_SPREADABLE = wellKnownSymbol('isConcatSpreadable');
var MAX_SAFE_INTEGER = 0x1FFFFFFFFFFFFF;
var MAXIMUM_ALLOWED_INDEX_EXCEEDED = 'Maximum allowed index exceeded';

var IS_CONCAT_SPREADABLE_SUPPORT = !fails(function () {
  var array = [];
  array[IS_CONCAT_SPREADABLE] = false;
  return array.concat()[0] !== array;
});

var SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('concat');

var isConcatSpreadable = function (O) {
  if (!isObject(O)) return false;
  var spreadable = O[IS_CONCAT_SPREADABLE];
  return spreadable !== undefined ? !!spreadable : isArray(O);
};

var FORCED = !IS_CONCAT_SPREADABLE_SUPPORT || !SPECIES_SUPPORT;

// `Array.prototype.concat` method
// https://tc39.github.io/ecma262/#sec-array.prototype.concat
// with adding support of @@isConcatSpreadable and @@species
$({ target: 'Array', proto: true, forced: FORCED }, {
  concat: function concat(arg) { // eslint-disable-line no-unused-vars
    var O = toObject(this);
    var A = arraySpeciesCreate(O, 0);
    var n = 0;
    var i, k, length, len, E;
    for (i = -1, length = arguments.length; i < length; i++) {
      E = i === -1 ? O : arguments[i];
      if (isConcatSpreadable(E)) {
        len = toLength(E.length);
        if (n + len > MAX_SAFE_INTEGER) throw TypeError(MAXIMUM_ALLOWED_INDEX_EXCEEDED);
        for (k = 0; k < len; k++, n++) if (k in E) createProperty(A, n, E[k]);
      } else {
        if (n >= MAX_SAFE_INTEGER) throw TypeError(MAXIMUM_ALLOWED_INDEX_EXCEEDED);
        createProperty(A, n++, E);
      }
    }
    A.length = n;
    return A;
  }
});

},{"../internals/array-method-has-species-support":202,"../internals/array-species-create":203,"../internals/create-property":219,"../internals/export":227,"../internals/fails":228,"../internals/is-array":247,"../internals/is-object":250,"../internals/to-length":297,"../internals/to-object":298,"../internals/well-known-symbol":302}],306:[function(_dereq_,module,exports){
'use strict';
var $ = _dereq_('../internals/export');
var $filter = _dereq_('../internals/array-iteration').filter;
var arrayMethodHasSpeciesSupport = _dereq_('../internals/array-method-has-species-support');

// `Array.prototype.filter` method
// https://tc39.github.io/ecma262/#sec-array.prototype.filter
// with adding support of @@species
$({ target: 'Array', proto: true, forced: !arrayMethodHasSpeciesSupport('filter') }, {
  filter: function filter(callbackfn /* , thisArg */) {
    return $filter(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});

},{"../internals/array-iteration":201,"../internals/array-method-has-species-support":202,"../internals/export":227}],307:[function(_dereq_,module,exports){
'use strict';
var $ = _dereq_('../internals/export');
var $find = _dereq_('../internals/array-iteration').find;
var addToUnscopables = _dereq_('../internals/add-to-unscopables');

var FIND = 'find';
var SKIPS_HOLES = true;

// Shouldn't skip holes
if (FIND in []) Array(1)[FIND](function () { SKIPS_HOLES = false; });

// `Array.prototype.find` method
// https://tc39.github.io/ecma262/#sec-array.prototype.find
$({ target: 'Array', proto: true, forced: SKIPS_HOLES }, {
  find: function find(callbackfn /* , that = undefined */) {
    return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});

// https://tc39.github.io/ecma262/#sec-array.prototype-@@unscopables
addToUnscopables(FIND);

},{"../internals/add-to-unscopables":195,"../internals/array-iteration":201,"../internals/export":227}],308:[function(_dereq_,module,exports){
'use strict';
var $ = _dereq_('../internals/export');
var forEach = _dereq_('../internals/array-for-each');

// `Array.prototype.forEach` method
// https://tc39.github.io/ecma262/#sec-array.prototype.foreach
$({ target: 'Array', proto: true, forced: [].forEach != forEach }, {
  forEach: forEach
});

},{"../internals/array-for-each":198,"../internals/export":227}],309:[function(_dereq_,module,exports){
var $ = _dereq_('../internals/export');
var from = _dereq_('../internals/array-from');
var checkCorrectnessOfIteration = _dereq_('../internals/check-correctness-of-iteration');

var INCORRECT_ITERATION = !checkCorrectnessOfIteration(function (iterable) {
  Array.from(iterable);
});

// `Array.from` method
// https://tc39.github.io/ecma262/#sec-array.from
$({ target: 'Array', stat: true, forced: INCORRECT_ITERATION }, {
  from: from
});

},{"../internals/array-from":199,"../internals/check-correctness-of-iteration":206,"../internals/export":227}],310:[function(_dereq_,module,exports){
'use strict';
var $ = _dereq_('../internals/export');
var $includes = _dereq_('../internals/array-includes').includes;
var addToUnscopables = _dereq_('../internals/add-to-unscopables');

// `Array.prototype.includes` method
// https://tc39.github.io/ecma262/#sec-array.prototype.includes
$({ target: 'Array', proto: true }, {
  includes: function includes(el /* , fromIndex = 0 */) {
    return $includes(this, el, arguments.length > 1 ? arguments[1] : undefined);
  }
});

// https://tc39.github.io/ecma262/#sec-array.prototype-@@unscopables
addToUnscopables('includes');

},{"../internals/add-to-unscopables":195,"../internals/array-includes":200,"../internals/export":227}],311:[function(_dereq_,module,exports){
'use strict';
var $ = _dereq_('../internals/export');
var $indexOf = _dereq_('../internals/array-includes').indexOf;
var sloppyArrayMethod = _dereq_('../internals/sloppy-array-method');

var nativeIndexOf = [].indexOf;

var NEGATIVE_ZERO = !!nativeIndexOf && 1 / [1].indexOf(1, -0) < 0;
var SLOPPY_METHOD = sloppyArrayMethod('indexOf');

// `Array.prototype.indexOf` method
// https://tc39.github.io/ecma262/#sec-array.prototype.indexof
$({ target: 'Array', proto: true, forced: NEGATIVE_ZERO || SLOPPY_METHOD }, {
  indexOf: function indexOf(searchElement /* , fromIndex = 0 */) {
    return NEGATIVE_ZERO
      // convert -0 to +0
      ? nativeIndexOf.apply(this, arguments) || 0
      : $indexOf(this, searchElement, arguments.length > 1 ? arguments[1] : undefined);
  }
});

},{"../internals/array-includes":200,"../internals/export":227,"../internals/sloppy-array-method":289}],312:[function(_dereq_,module,exports){
var $ = _dereq_('../internals/export');
var isArray = _dereq_('../internals/is-array');

// `Array.isArray` method
// https://tc39.github.io/ecma262/#sec-array.isarray
$({ target: 'Array', stat: true }, {
  isArray: isArray
});

},{"../internals/export":227,"../internals/is-array":247}],313:[function(_dereq_,module,exports){
'use strict';
var toIndexedObject = _dereq_('../internals/to-indexed-object');
var addToUnscopables = _dereq_('../internals/add-to-unscopables');
var Iterators = _dereq_('../internals/iterators');
var InternalStateModule = _dereq_('../internals/internal-state');
var defineIterator = _dereq_('../internals/define-iterator');

var ARRAY_ITERATOR = 'Array Iterator';
var setInternalState = InternalStateModule.set;
var getInternalState = InternalStateModule.getterFor(ARRAY_ITERATOR);

// `Array.prototype.entries` method
// https://tc39.github.io/ecma262/#sec-array.prototype.entries
// `Array.prototype.keys` method
// https://tc39.github.io/ecma262/#sec-array.prototype.keys
// `Array.prototype.values` method
// https://tc39.github.io/ecma262/#sec-array.prototype.values
// `Array.prototype[@@iterator]` method
// https://tc39.github.io/ecma262/#sec-array.prototype-@@iterator
// `CreateArrayIterator` internal method
// https://tc39.github.io/ecma262/#sec-createarrayiterator
module.exports = defineIterator(Array, 'Array', function (iterated, kind) {
  setInternalState(this, {
    type: ARRAY_ITERATOR,
    target: toIndexedObject(iterated), // target
    index: 0,                          // next index
    kind: kind                         // kind
  });
// `%ArrayIteratorPrototype%.next` method
// https://tc39.github.io/ecma262/#sec-%arrayiteratorprototype%.next
}, function () {
  var state = getInternalState(this);
  var target = state.target;
  var kind = state.kind;
  var index = state.index++;
  if (!target || index >= target.length) {
    state.target = undefined;
    return { value: undefined, done: true };
  }
  if (kind == 'keys') return { value: index, done: false };
  if (kind == 'values') return { value: target[index], done: false };
  return { value: [index, target[index]], done: false };
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values%
// https://tc39.github.io/ecma262/#sec-createunmappedargumentsobject
// https://tc39.github.io/ecma262/#sec-createmappedargumentsobject
Iterators.Arguments = Iterators.Array;

// https://tc39.github.io/ecma262/#sec-array.prototype-@@unscopables
addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');

},{"../internals/add-to-unscopables":195,"../internals/define-iterator":220,"../internals/internal-state":245,"../internals/iterators":255,"../internals/to-indexed-object":295}],314:[function(_dereq_,module,exports){
'use strict';
var $ = _dereq_('../internals/export');
var $map = _dereq_('../internals/array-iteration').map;
var arrayMethodHasSpeciesSupport = _dereq_('../internals/array-method-has-species-support');

// `Array.prototype.map` method
// https://tc39.github.io/ecma262/#sec-array.prototype.map
// with adding support of @@species
$({ target: 'Array', proto: true, forced: !arrayMethodHasSpeciesSupport('map') }, {
  map: function map(callbackfn /* , thisArg */) {
    return $map(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});

},{"../internals/array-iteration":201,"../internals/array-method-has-species-support":202,"../internals/export":227}],315:[function(_dereq_,module,exports){
'use strict';
var $ = _dereq_('../internals/export');
var isObject = _dereq_('../internals/is-object');
var isArray = _dereq_('../internals/is-array');
var toAbsoluteIndex = _dereq_('../internals/to-absolute-index');
var toLength = _dereq_('../internals/to-length');
var toIndexedObject = _dereq_('../internals/to-indexed-object');
var createProperty = _dereq_('../internals/create-property');
var arrayMethodHasSpeciesSupport = _dereq_('../internals/array-method-has-species-support');
var wellKnownSymbol = _dereq_('../internals/well-known-symbol');

var SPECIES = wellKnownSymbol('species');
var nativeSlice = [].slice;
var max = Math.max;

// `Array.prototype.slice` method
// https://tc39.github.io/ecma262/#sec-array.prototype.slice
// fallback for not array-like ES3 strings and DOM objects
$({ target: 'Array', proto: true, forced: !arrayMethodHasSpeciesSupport('slice') }, {
  slice: function slice(start, end) {
    var O = toIndexedObject(this);
    var length = toLength(O.length);
    var k = toAbsoluteIndex(start, length);
    var fin = toAbsoluteIndex(end === undefined ? length : end, length);
    // inline `ArraySpeciesCreate` for usage native `Array#slice` where it's possible
    var Constructor, result, n;
    if (isArray(O)) {
      Constructor = O.constructor;
      // cross-realm fallback
      if (typeof Constructor == 'function' && (Constructor === Array || isArray(Constructor.prototype))) {
        Constructor = undefined;
      } else if (isObject(Constructor)) {
        Constructor = Constructor[SPECIES];
        if (Constructor === null) Constructor = undefined;
      }
      if (Constructor === Array || Constructor === undefined) {
        return nativeSlice.call(O, k, fin);
      }
    }
    result = new (Constructor === undefined ? Array : Constructor)(max(fin - k, 0));
    for (n = 0; k < fin; k++, n++) if (k in O) createProperty(result, n, O[k]);
    result.length = n;
    return result;
  }
});

},{"../internals/array-method-has-species-support":202,"../internals/create-property":219,"../internals/export":227,"../internals/is-array":247,"../internals/is-object":250,"../internals/to-absolute-index":294,"../internals/to-indexed-object":295,"../internals/to-length":297,"../internals/well-known-symbol":302}],316:[function(_dereq_,module,exports){
'use strict';
var $ = _dereq_('../internals/export');
var aFunction = _dereq_('../internals/a-function');
var toObject = _dereq_('../internals/to-object');
var fails = _dereq_('../internals/fails');
var sloppyArrayMethod = _dereq_('../internals/sloppy-array-method');

var nativeSort = [].sort;
var test = [1, 2, 3];

// IE8-
var FAILS_ON_UNDEFINED = fails(function () {
  test.sort(undefined);
});
// V8 bug
var FAILS_ON_NULL = fails(function () {
  test.sort(null);
});
// Old WebKit
var SLOPPY_METHOD = sloppyArrayMethod('sort');

var FORCED = FAILS_ON_UNDEFINED || !FAILS_ON_NULL || SLOPPY_METHOD;

// `Array.prototype.sort` method
// https://tc39.github.io/ecma262/#sec-array.prototype.sort
$({ target: 'Array', proto: true, forced: FORCED }, {
  sort: function sort(comparefn) {
    return comparefn === undefined
      ? nativeSort.call(toObject(this))
      : nativeSort.call(toObject(this), aFunction(comparefn));
  }
});

},{"../internals/a-function":193,"../internals/export":227,"../internals/fails":228,"../internals/sloppy-array-method":289,"../internals/to-object":298}],317:[function(_dereq_,module,exports){
'use strict';
var $ = _dereq_('../internals/export');
var toAbsoluteIndex = _dereq_('../internals/to-absolute-index');
var toInteger = _dereq_('../internals/to-integer');
var toLength = _dereq_('../internals/to-length');
var toObject = _dereq_('../internals/to-object');
var arraySpeciesCreate = _dereq_('../internals/array-species-create');
var createProperty = _dereq_('../internals/create-property');
var arrayMethodHasSpeciesSupport = _dereq_('../internals/array-method-has-species-support');

var max = Math.max;
var min = Math.min;
var MAX_SAFE_INTEGER = 0x1FFFFFFFFFFFFF;
var MAXIMUM_ALLOWED_LENGTH_EXCEEDED = 'Maximum allowed length exceeded';

// `Array.prototype.splice` method
// https://tc39.github.io/ecma262/#sec-array.prototype.splice
// with adding support of @@species
$({ target: 'Array', proto: true, forced: !arrayMethodHasSpeciesSupport('splice') }, {
  splice: function splice(start, deleteCount /* , ...items */) {
    var O = toObject(this);
    var len = toLength(O.length);
    var actualStart = toAbsoluteIndex(start, len);
    var argumentsLength = arguments.length;
    var insertCount, actualDeleteCount, A, k, from, to;
    if (argumentsLength === 0) {
      insertCount = actualDeleteCount = 0;
    } else if (argumentsLength === 1) {
      insertCount = 0;
      actualDeleteCount = len - actualStart;
    } else {
      insertCount = argumentsLength - 2;
      actualDeleteCount = min(max(toInteger(deleteCount), 0), len - actualStart);
    }
    if (len + insertCount - actualDeleteCount > MAX_SAFE_INTEGER) {
      throw TypeError(MAXIMUM_ALLOWED_LENGTH_EXCEEDED);
    }
    A = arraySpeciesCreate(O, actualDeleteCount);
    for (k = 0; k < actualDeleteCount; k++) {
      from = actualStart + k;
      if (from in O) createProperty(A, k, O[from]);
    }
    A.length = actualDeleteCount;
    if (insertCount < actualDeleteCount) {
      for (k = actualStart; k < len - actualDeleteCount; k++) {
        from = k + actualDeleteCount;
        to = k + insertCount;
        if (from in O) O[to] = O[from];
        else delete O[to];
      }
      for (k = len; k > len - actualDeleteCount + insertCount; k--) delete O[k - 1];
    } else if (insertCount > actualDeleteCount) {
      for (k = len - actualDeleteCount; k > actualStart; k--) {
        from = k + actualDeleteCount - 1;
        to = k + insertCount - 1;
        if (from in O) O[to] = O[from];
        else delete O[to];
      }
    }
    for (k = 0; k < insertCount; k++) {
      O[k + actualStart] = arguments[k + 2];
    }
    O.length = len - actualDeleteCount + insertCount;
    return A;
  }
});

},{"../internals/array-method-has-species-support":202,"../internals/array-species-create":203,"../internals/create-property":219,"../internals/export":227,"../internals/to-absolute-index":294,"../internals/to-integer":296,"../internals/to-length":297,"../internals/to-object":298}],318:[function(_dereq_,module,exports){
var $ = _dereq_('../internals/export');
var bind = _dereq_('../internals/function-bind');

// `Function.prototype.bind` method
// https://tc39.github.io/ecma262/#sec-function.prototype.bind
$({ target: 'Function', proto: true }, {
  bind: bind
});

},{"../internals/export":227,"../internals/function-bind":230}],319:[function(_dereq_,module,exports){
var global = _dereq_('../internals/global');
var setToStringTag = _dereq_('../internals/set-to-string-tag');

// JSON[@@toStringTag] property
// https://tc39.github.io/ecma262/#sec-json-@@tostringtag
setToStringTag(global.JSON, 'JSON', true);

},{"../internals/global":236,"../internals/set-to-string-tag":286}],320:[function(_dereq_,module,exports){
'use strict';
var collection = _dereq_('../internals/collection');
var collectionStrong = _dereq_('../internals/collection-strong');

// `Map` constructor
// https://tc39.github.io/ecma262/#sec-map-objects
module.exports = collection('Map', function (get) {
  return function Map() { return get(this, arguments.length ? arguments[0] : undefined); };
}, collectionStrong, true);

},{"../internals/collection":214,"../internals/collection-strong":212}],321:[function(_dereq_,module,exports){
var setToStringTag = _dereq_('../internals/set-to-string-tag');

// Math[@@toStringTag] property
// https://tc39.github.io/ecma262/#sec-math-@@tostringtag
setToStringTag(Math, 'Math', true);

},{"../internals/set-to-string-tag":286}],322:[function(_dereq_,module,exports){
var $ = _dereq_('../internals/export');
var assign = _dereq_('../internals/object-assign');

// `Object.assign` method
// https://tc39.github.io/ecma262/#sec-object.assign
$({ target: 'Object', stat: true, forced: Object.assign !== assign }, {
  assign: assign
});

},{"../internals/export":227,"../internals/object-assign":261}],323:[function(_dereq_,module,exports){
var $ = _dereq_('../internals/export');
var DESCRIPTORS = _dereq_('../internals/descriptors');
var create = _dereq_('../internals/object-create');

// `Object.create` method
// https://tc39.github.io/ecma262/#sec-object.create
$({ target: 'Object', stat: true, sham: !DESCRIPTORS }, {
  create: create
});

},{"../internals/descriptors":222,"../internals/export":227,"../internals/object-create":262}],324:[function(_dereq_,module,exports){
var $ = _dereq_('../internals/export');
var DESCRIPTORS = _dereq_('../internals/descriptors');
var defineProperties = _dereq_('../internals/object-define-properties');

// `Object.defineProperties` method
// https://tc39.github.io/ecma262/#sec-object.defineproperties
$({ target: 'Object', stat: true, forced: !DESCRIPTORS, sham: !DESCRIPTORS }, {
  defineProperties: defineProperties
});

},{"../internals/descriptors":222,"../internals/export":227,"../internals/object-define-properties":263}],325:[function(_dereq_,module,exports){
var $ = _dereq_('../internals/export');
var DESCRIPTORS = _dereq_('../internals/descriptors');
var objectDefinePropertyModile = _dereq_('../internals/object-define-property');

// `Object.defineProperty` method
// https://tc39.github.io/ecma262/#sec-object.defineproperty
$({ target: 'Object', stat: true, forced: !DESCRIPTORS, sham: !DESCRIPTORS }, {
  defineProperty: objectDefinePropertyModile.f
});

},{"../internals/descriptors":222,"../internals/export":227,"../internals/object-define-property":264}],326:[function(_dereq_,module,exports){
var $ = _dereq_('../internals/export');
var FREEZING = _dereq_('../internals/freezing');
var fails = _dereq_('../internals/fails');
var isObject = _dereq_('../internals/is-object');
var onFreeze = _dereq_('../internals/internal-metadata').onFreeze;

var nativeFreeze = Object.freeze;
var FAILS_ON_PRIMITIVES = fails(function () { nativeFreeze(1); });

// `Object.freeze` method
// https://tc39.github.io/ecma262/#sec-object.freeze
$({ target: 'Object', stat: true, forced: FAILS_ON_PRIMITIVES, sham: !FREEZING }, {
  freeze: function freeze(it) {
    return nativeFreeze && isObject(it) ? nativeFreeze(onFreeze(it)) : it;
  }
});

},{"../internals/export":227,"../internals/fails":228,"../internals/freezing":229,"../internals/internal-metadata":244,"../internals/is-object":250}],327:[function(_dereq_,module,exports){
var $ = _dereq_('../internals/export');
var fails = _dereq_('../internals/fails');
var toIndexedObject = _dereq_('../internals/to-indexed-object');
var nativeGetOwnPropertyDescriptor = _dereq_('../internals/object-get-own-property-descriptor').f;
var DESCRIPTORS = _dereq_('../internals/descriptors');

var FAILS_ON_PRIMITIVES = fails(function () { nativeGetOwnPropertyDescriptor(1); });
var FORCED = !DESCRIPTORS || FAILS_ON_PRIMITIVES;

// `Object.getOwnPropertyDescriptor` method
// https://tc39.github.io/ecma262/#sec-object.getownpropertydescriptor
$({ target: 'Object', stat: true, forced: FORCED, sham: !DESCRIPTORS }, {
  getOwnPropertyDescriptor: function getOwnPropertyDescriptor(it, key) {
    return nativeGetOwnPropertyDescriptor(toIndexedObject(it), key);
  }
});

},{"../internals/descriptors":222,"../internals/export":227,"../internals/fails":228,"../internals/object-get-own-property-descriptor":265,"../internals/to-indexed-object":295}],328:[function(_dereq_,module,exports){
var $ = _dereq_('../internals/export');
var DESCRIPTORS = _dereq_('../internals/descriptors');
var ownKeys = _dereq_('../internals/own-keys');
var toIndexedObject = _dereq_('../internals/to-indexed-object');
var getOwnPropertyDescriptorModule = _dereq_('../internals/object-get-own-property-descriptor');
var createProperty = _dereq_('../internals/create-property');

// `Object.getOwnPropertyDescriptors` method
// https://tc39.github.io/ecma262/#sec-object.getownpropertydescriptors
$({ target: 'Object', stat: true, sham: !DESCRIPTORS }, {
  getOwnPropertyDescriptors: function getOwnPropertyDescriptors(object) {
    var O = toIndexedObject(object);
    var getOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f;
    var keys = ownKeys(O);
    var result = {};
    var index = 0;
    var key, descriptor;
    while (keys.length > index) {
      descriptor = getOwnPropertyDescriptor(O, key = keys[index++]);
      if (descriptor !== undefined) createProperty(result, key, descriptor);
    }
    return result;
  }
});

},{"../internals/create-property":219,"../internals/descriptors":222,"../internals/export":227,"../internals/object-get-own-property-descriptor":265,"../internals/own-keys":275,"../internals/to-indexed-object":295}],329:[function(_dereq_,module,exports){
var $ = _dereq_('../internals/export');
var fails = _dereq_('../internals/fails');
var toObject = _dereq_('../internals/to-object');
var nativeGetPrototypeOf = _dereq_('../internals/object-get-prototype-of');
var CORRECT_PROTOTYPE_GETTER = _dereq_('../internals/correct-prototype-getter');

var FAILS_ON_PRIMITIVES = fails(function () { nativeGetPrototypeOf(1); });

// `Object.getPrototypeOf` method
// https://tc39.github.io/ecma262/#sec-object.getprototypeof
$({ target: 'Object', stat: true, forced: FAILS_ON_PRIMITIVES, sham: !CORRECT_PROTOTYPE_GETTER }, {
  getPrototypeOf: function getPrototypeOf(it) {
    return nativeGetPrototypeOf(toObject(it));
  }
});


},{"../internals/correct-prototype-getter":216,"../internals/export":227,"../internals/fails":228,"../internals/object-get-prototype-of":269,"../internals/to-object":298}],330:[function(_dereq_,module,exports){
var $ = _dereq_('../internals/export');
var toObject = _dereq_('../internals/to-object');
var nativeKeys = _dereq_('../internals/object-keys');
var fails = _dereq_('../internals/fails');

var FAILS_ON_PRIMITIVES = fails(function () { nativeKeys(1); });

// `Object.keys` method
// https://tc39.github.io/ecma262/#sec-object.keys
$({ target: 'Object', stat: true, forced: FAILS_ON_PRIMITIVES }, {
  keys: function keys(it) {
    return nativeKeys(toObject(it));
  }
});

},{"../internals/export":227,"../internals/fails":228,"../internals/object-keys":271,"../internals/to-object":298}],331:[function(_dereq_,module,exports){
var $ = _dereq_('../internals/export');
var setPrototypeOf = _dereq_('../internals/object-set-prototype-of');

// `Object.setPrototypeOf` method
// https://tc39.github.io/ecma262/#sec-object.setprototypeof
$({ target: 'Object', stat: true }, {
  setPrototypeOf: setPrototypeOf
});

},{"../internals/export":227,"../internals/object-set-prototype-of":273}],332:[function(_dereq_,module,exports){
// empty

},{}],333:[function(_dereq_,module,exports){
var $ = _dereq_('../internals/export');
var parseIntImplementation = _dereq_('../internals/parse-int');

// `parseInt` method
// https://tc39.github.io/ecma262/#sec-parseint-string-radix
$({ global: true, forced: parseInt != parseIntImplementation }, {
  parseInt: parseIntImplementation
});

},{"../internals/export":227,"../internals/parse-int":276}],334:[function(_dereq_,module,exports){
'use strict';
var $ = _dereq_('../internals/export');
var getBuiltIn = _dereq_('../internals/get-built-in');
var speciesConstructor = _dereq_('../internals/species-constructor');
var promiseResolve = _dereq_('../internals/promise-resolve');

// `Promise.prototype.finally` method
// https://tc39.github.io/ecma262/#sec-promise.prototype.finally
$({ target: 'Promise', proto: true, real: true }, {
  'finally': function (onFinally) {
    var C = speciesConstructor(this, getBuiltIn('Promise'));
    var isFunction = typeof onFinally == 'function';
    return this.then(
      isFunction ? function (x) {
        return promiseResolve(C, onFinally()).then(function () { return x; });
      } : onFinally,
      isFunction ? function (e) {
        return promiseResolve(C, onFinally()).then(function () { throw e; });
      } : onFinally
    );
  }
});

},{"../internals/export":227,"../internals/get-built-in":232,"../internals/promise-resolve":279,"../internals/species-constructor":290}],335:[function(_dereq_,module,exports){
'use strict';
var $ = _dereq_('../internals/export');
var IS_PURE = _dereq_('../internals/is-pure');
var global = _dereq_('../internals/global');
var path = _dereq_('../internals/path');
var redefineAll = _dereq_('../internals/redefine-all');
var setToStringTag = _dereq_('../internals/set-to-string-tag');
var setSpecies = _dereq_('../internals/set-species');
var isObject = _dereq_('../internals/is-object');
var aFunction = _dereq_('../internals/a-function');
var anInstance = _dereq_('../internals/an-instance');
var classof = _dereq_('../internals/classof-raw');
var iterate = _dereq_('../internals/iterate');
var checkCorrectnessOfIteration = _dereq_('../internals/check-correctness-of-iteration');
var speciesConstructor = _dereq_('../internals/species-constructor');
var task = _dereq_('../internals/task').set;
var microtask = _dereq_('../internals/microtask');
var promiseResolve = _dereq_('../internals/promise-resolve');
var hostReportErrors = _dereq_('../internals/host-report-errors');
var newPromiseCapabilityModule = _dereq_('../internals/new-promise-capability');
var perform = _dereq_('../internals/perform');
var userAgent = _dereq_('../internals/user-agent');
var InternalStateModule = _dereq_('../internals/internal-state');
var isForced = _dereq_('../internals/is-forced');
var wellKnownSymbol = _dereq_('../internals/well-known-symbol');

var SPECIES = wellKnownSymbol('species');
var PROMISE = 'Promise';
var getInternalState = InternalStateModule.get;
var setInternalState = InternalStateModule.set;
var getInternalPromiseState = InternalStateModule.getterFor(PROMISE);
var PromiseConstructor = global[PROMISE];
var TypeError = global.TypeError;
var document = global.document;
var process = global.process;
var $fetch = global.fetch;
var versions = process && process.versions;
var v8 = versions && versions.v8 || '';
var newPromiseCapability = newPromiseCapabilityModule.f;
var newGenericPromiseCapability = newPromiseCapability;
var IS_NODE = classof(process) == 'process';
var DISPATCH_EVENT = !!(document && document.createEvent && global.dispatchEvent);
var UNHANDLED_REJECTION = 'unhandledrejection';
var REJECTION_HANDLED = 'rejectionhandled';
var PENDING = 0;
var FULFILLED = 1;
var REJECTED = 2;
var HANDLED = 1;
var UNHANDLED = 2;
var Internal, OwnPromiseCapability, PromiseWrapper;

var FORCED = isForced(PROMISE, function () {
  // correct subclassing with @@species support
  var promise = PromiseConstructor.resolve(1);
  var empty = function () { /* empty */ };
  var FakePromise = (promise.constructor = {})[SPECIES] = function (exec) {
    exec(empty, empty);
  };
  // unhandled rejections tracking support, NodeJS Promise without it fails @@species test
  return !((IS_NODE || typeof PromiseRejectionEvent == 'function')
    && (!IS_PURE || promise['finally'])
    && promise.then(empty) instanceof FakePromise
    // v8 6.6 (Node 10 and Chrome 66) have a bug with resolving custom thenables
    // https://bugs.chromium.org/p/chromium/issues/detail?id=830565
    // we can't detect it synchronously, so just check versions
    && v8.indexOf('6.6') !== 0
    && userAgent.indexOf('Chrome/66') === -1);
});

var INCORRECT_ITERATION = FORCED || !checkCorrectnessOfIteration(function (iterable) {
  PromiseConstructor.all(iterable)['catch'](function () { /* empty */ });
});

// helpers
var isThenable = function (it) {
  var then;
  return isObject(it) && typeof (then = it.then) == 'function' ? then : false;
};

var notify = function (promise, state, isReject) {
  if (state.notified) return;
  state.notified = true;
  var chain = state.reactions;
  microtask(function () {
    var value = state.value;
    var ok = state.state == FULFILLED;
    var index = 0;
    // variable length - can't use forEach
    while (chain.length > index) {
      var reaction = chain[index++];
      var handler = ok ? reaction.ok : reaction.fail;
      var resolve = reaction.resolve;
      var reject = reaction.reject;
      var domain = reaction.domain;
      var result, then, exited;
      try {
        if (handler) {
          if (!ok) {
            if (state.rejection === UNHANDLED) onHandleUnhandled(promise, state);
            state.rejection = HANDLED;
          }
          if (handler === true) result = value;
          else {
            if (domain) domain.enter();
            result = handler(value); // can throw
            if (domain) {
              domain.exit();
              exited = true;
            }
          }
          if (result === reaction.promise) {
            reject(TypeError('Promise-chain cycle'));
          } else if (then = isThenable(result)) {
            then.call(result, resolve, reject);
          } else resolve(result);
        } else reject(value);
      } catch (error) {
        if (domain && !exited) domain.exit();
        reject(error);
      }
    }
    state.reactions = [];
    state.notified = false;
    if (isReject && !state.rejection) onUnhandled(promise, state);
  });
};

var dispatchEvent = function (name, promise, reason) {
  var event, handler;
  if (DISPATCH_EVENT) {
    event = document.createEvent('Event');
    event.promise = promise;
    event.reason = reason;
    event.initEvent(name, false, true);
    global.dispatchEvent(event);
  } else event = { promise: promise, reason: reason };
  if (handler = global['on' + name]) handler(event);
  else if (name === UNHANDLED_REJECTION) hostReportErrors('Unhandled promise rejection', reason);
};

var onUnhandled = function (promise, state) {
  task.call(global, function () {
    var value = state.value;
    var IS_UNHANDLED = isUnhandled(state);
    var result;
    if (IS_UNHANDLED) {
      result = perform(function () {
        if (IS_NODE) {
          process.emit('unhandledRejection', value, promise);
        } else dispatchEvent(UNHANDLED_REJECTION, promise, value);
      });
      // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
      state.rejection = IS_NODE || isUnhandled(state) ? UNHANDLED : HANDLED;
      if (result.error) throw result.value;
    }
  });
};

var isUnhandled = function (state) {
  return state.rejection !== HANDLED && !state.parent;
};

var onHandleUnhandled = function (promise, state) {
  task.call(global, function () {
    if (IS_NODE) {
      process.emit('rejectionHandled', promise);
    } else dispatchEvent(REJECTION_HANDLED, promise, state.value);
  });
};

var bind = function (fn, promise, state, unwrap) {
  return function (value) {
    fn(promise, state, value, unwrap);
  };
};

var internalReject = function (promise, state, value, unwrap) {
  if (state.done) return;
  state.done = true;
  if (unwrap) state = unwrap;
  state.value = value;
  state.state = REJECTED;
  notify(promise, state, true);
};

var internalResolve = function (promise, state, value, unwrap) {
  if (state.done) return;
  state.done = true;
  if (unwrap) state = unwrap;
  try {
    if (promise === value) throw TypeError("Promise can't be resolved itself");
    var then = isThenable(value);
    if (then) {
      microtask(function () {
        var wrapper = { done: false };
        try {
          then.call(value,
            bind(internalResolve, promise, wrapper, state),
            bind(internalReject, promise, wrapper, state)
          );
        } catch (error) {
          internalReject(promise, wrapper, error, state);
        }
      });
    } else {
      state.value = value;
      state.state = FULFILLED;
      notify(promise, state, false);
    }
  } catch (error) {
    internalReject(promise, { done: false }, error, state);
  }
};

// constructor polyfill
if (FORCED) {
  // 25.4.3.1 Promise(executor)
  PromiseConstructor = function Promise(executor) {
    anInstance(this, PromiseConstructor, PROMISE);
    aFunction(executor);
    Internal.call(this);
    var state = getInternalState(this);
    try {
      executor(bind(internalResolve, this, state), bind(internalReject, this, state));
    } catch (error) {
      internalReject(this, state, error);
    }
  };
  // eslint-disable-next-line no-unused-vars
  Internal = function Promise(executor) {
    setInternalState(this, {
      type: PROMISE,
      done: false,
      notified: false,
      parent: false,
      reactions: [],
      rejection: false,
      state: PENDING,
      value: undefined
    });
  };
  Internal.prototype = redefineAll(PromiseConstructor.prototype, {
    // `Promise.prototype.then` method
    // https://tc39.github.io/ecma262/#sec-promise.prototype.then
    then: function then(onFulfilled, onRejected) {
      var state = getInternalPromiseState(this);
      var reaction = newPromiseCapability(speciesConstructor(this, PromiseConstructor));
      reaction.ok = typeof onFulfilled == 'function' ? onFulfilled : true;
      reaction.fail = typeof onRejected == 'function' && onRejected;
      reaction.domain = IS_NODE ? process.domain : undefined;
      state.parent = true;
      state.reactions.push(reaction);
      if (state.state != PENDING) notify(this, state, false);
      return reaction.promise;
    },
    // `Promise.prototype.catch` method
    // https://tc39.github.io/ecma262/#sec-promise.prototype.catch
    'catch': function (onRejected) {
      return this.then(undefined, onRejected);
    }
  });
  OwnPromiseCapability = function () {
    var promise = new Internal();
    var state = getInternalState(promise);
    this.promise = promise;
    this.resolve = bind(internalResolve, promise, state);
    this.reject = bind(internalReject, promise, state);
  };
  newPromiseCapabilityModule.f = newPromiseCapability = function (C) {
    return C === PromiseConstructor || C === PromiseWrapper
      ? new OwnPromiseCapability(C)
      : newGenericPromiseCapability(C);
  };

  // wrap fetch result
  if (!IS_PURE && typeof $fetch == 'function') $({ global: true, enumerable: true, forced: true }, {
    // eslint-disable-next-line no-unused-vars
    fetch: function fetch(input) {
      return promiseResolve(PromiseConstructor, $fetch.apply(global, arguments));
    }
  });
}

$({ global: true, wrap: true, forced: FORCED }, {
  Promise: PromiseConstructor
});

setToStringTag(PromiseConstructor, PROMISE, false, true);
setSpecies(PROMISE);

PromiseWrapper = path[PROMISE];

// statics
$({ target: PROMISE, stat: true, forced: FORCED }, {
  // `Promise.reject` method
  // https://tc39.github.io/ecma262/#sec-promise.reject
  reject: function reject(r) {
    var capability = newPromiseCapability(this);
    capability.reject.call(undefined, r);
    return capability.promise;
  }
});

$({ target: PROMISE, stat: true, forced: IS_PURE || FORCED }, {
  // `Promise.resolve` method
  // https://tc39.github.io/ecma262/#sec-promise.resolve
  resolve: function resolve(x) {
    return promiseResolve(IS_PURE && this === PromiseWrapper ? PromiseConstructor : this, x);
  }
});

$({ target: PROMISE, stat: true, forced: INCORRECT_ITERATION }, {
  // `Promise.all` method
  // https://tc39.github.io/ecma262/#sec-promise.all
  all: function all(iterable) {
    var C = this;
    var capability = newPromiseCapability(C);
    var resolve = capability.resolve;
    var reject = capability.reject;
    var result = perform(function () {
      var $promiseResolve = aFunction(C.resolve);
      var values = [];
      var counter = 0;
      var remaining = 1;
      iterate(iterable, function (promise) {
        var index = counter++;
        var alreadyCalled = false;
        values.push(undefined);
        remaining++;
        $promiseResolve.call(C, promise).then(function (value) {
          if (alreadyCalled) return;
          alreadyCalled = true;
          values[index] = value;
          --remaining || resolve(values);
        }, reject);
      });
      --remaining || resolve(values);
    });
    if (result.error) reject(result.value);
    return capability.promise;
  },
  // `Promise.race` method
  // https://tc39.github.io/ecma262/#sec-promise.race
  race: function race(iterable) {
    var C = this;
    var capability = newPromiseCapability(C);
    var reject = capability.reject;
    var result = perform(function () {
      var $promiseResolve = aFunction(C.resolve);
      iterate(iterable, function (promise) {
        $promiseResolve.call(C, promise).then(capability.resolve, reject);
      });
    });
    if (result.error) reject(result.value);
    return capability.promise;
  }
});

},{"../internals/a-function":193,"../internals/an-instance":196,"../internals/check-correctness-of-iteration":206,"../internals/classof-raw":207,"../internals/export":227,"../internals/global":236,"../internals/host-report-errors":240,"../internals/internal-state":245,"../internals/is-forced":248,"../internals/is-object":250,"../internals/is-pure":251,"../internals/iterate":253,"../internals/microtask":256,"../internals/new-promise-capability":259,"../internals/path":277,"../internals/perform":278,"../internals/promise-resolve":279,"../internals/redefine-all":280,"../internals/set-species":285,"../internals/set-to-string-tag":286,"../internals/species-constructor":290,"../internals/task":293,"../internals/user-agent":301,"../internals/well-known-symbol":302}],336:[function(_dereq_,module,exports){
var $ = _dereq_('../internals/export');
var getBuiltIn = _dereq_('../internals/get-built-in');
var aFunction = _dereq_('../internals/a-function');
var anObject = _dereq_('../internals/an-object');
var isObject = _dereq_('../internals/is-object');
var create = _dereq_('../internals/object-create');
var bind = _dereq_('../internals/function-bind');
var fails = _dereq_('../internals/fails');

var nativeConstruct = getBuiltIn('Reflect', 'construct');

// `Reflect.construct` method
// https://tc39.github.io/ecma262/#sec-reflect.construct
// MS Edge supports only 2 arguments and argumentsList argument is optional
// FF Nightly sets third argument as `new.target`, but does not create `this` from it
var NEW_TARGET_BUG = fails(function () {
  function F() { /* empty */ }
  return !(nativeConstruct(function () { /* empty */ }, [], F) instanceof F);
});
var ARGS_BUG = !fails(function () {
  nativeConstruct(function () { /* empty */ });
});
var FORCED = NEW_TARGET_BUG || ARGS_BUG;

$({ target: 'Reflect', stat: true, forced: FORCED, sham: FORCED }, {
  construct: function construct(Target, args /* , newTarget */) {
    aFunction(Target);
    anObject(args);
    var newTarget = arguments.length < 3 ? Target : aFunction(arguments[2]);
    if (ARGS_BUG && !NEW_TARGET_BUG) return nativeConstruct(Target, args, newTarget);
    if (Target == newTarget) {
      // w/o altered newTarget, optimization for 0-4 arguments
      switch (args.length) {
        case 0: return new Target();
        case 1: return new Target(args[0]);
        case 2: return new Target(args[0], args[1]);
        case 3: return new Target(args[0], args[1], args[2]);
        case 4: return new Target(args[0], args[1], args[2], args[3]);
      }
      // w/o altered newTarget, lot of arguments case
      var $args = [null];
      $args.push.apply($args, args);
      return new (bind.apply(Target, $args))();
    }
    // with altered newTarget, not support built-in constructors
    var proto = newTarget.prototype;
    var instance = create(isObject(proto) ? proto : Object.prototype);
    var result = Function.apply.call(Target, instance, args);
    return isObject(result) ? result : instance;
  }
});

},{"../internals/a-function":193,"../internals/an-object":197,"../internals/export":227,"../internals/fails":228,"../internals/function-bind":230,"../internals/get-built-in":232,"../internals/is-object":250,"../internals/object-create":262}],337:[function(_dereq_,module,exports){
var $ = _dereq_('../internals/export');
var isObject = _dereq_('../internals/is-object');
var anObject = _dereq_('../internals/an-object');
var has = _dereq_('../internals/has');
var getOwnPropertyDescriptorModule = _dereq_('../internals/object-get-own-property-descriptor');
var getPrototypeOf = _dereq_('../internals/object-get-prototype-of');

// `Reflect.get` method
// https://tc39.github.io/ecma262/#sec-reflect.get
function get(target, propertyKey /* , receiver */) {
  var receiver = arguments.length < 3 ? target : arguments[2];
  var descriptor, prototype;
  if (anObject(target) === receiver) return target[propertyKey];
  if (descriptor = getOwnPropertyDescriptorModule.f(target, propertyKey)) return has(descriptor, 'value')
    ? descriptor.value
    : descriptor.get === undefined
      ? undefined
      : descriptor.get.call(receiver);
  if (isObject(prototype = getPrototypeOf(target))) return get(prototype, propertyKey, receiver);
}

$({ target: 'Reflect', stat: true }, {
  get: get
});

},{"../internals/an-object":197,"../internals/export":227,"../internals/has":237,"../internals/is-object":250,"../internals/object-get-own-property-descriptor":265,"../internals/object-get-prototype-of":269}],338:[function(_dereq_,module,exports){
'use strict';
var collection = _dereq_('../internals/collection');
var collectionStrong = _dereq_('../internals/collection-strong');

// `Set` constructor
// https://tc39.github.io/ecma262/#sec-set-objects
module.exports = collection('Set', function (get) {
  return function Set() { return get(this, arguments.length ? arguments[0] : undefined); };
}, collectionStrong);

},{"../internals/collection":214,"../internals/collection-strong":212}],339:[function(_dereq_,module,exports){
'use strict';
var $ = _dereq_('../internals/export');
var notARegExp = _dereq_('../internals/not-a-regexp');
var requireObjectCoercible = _dereq_('../internals/require-object-coercible');
var correctIsRegExpLogic = _dereq_('../internals/correct-is-regexp-logic');

// `String.prototype.includes` method
// https://tc39.github.io/ecma262/#sec-string.prototype.includes
$({ target: 'String', proto: true, forced: !correctIsRegExpLogic('includes') }, {
  includes: function includes(searchString /* , position = 0 */) {
    return !!~String(requireObjectCoercible(this))
      .indexOf(notARegExp(searchString), arguments.length > 1 ? arguments[1] : undefined);
  }
});

},{"../internals/correct-is-regexp-logic":215,"../internals/export":227,"../internals/not-a-regexp":260,"../internals/require-object-coercible":282}],340:[function(_dereq_,module,exports){
'use strict';
var charAt = _dereq_('../internals/string-multibyte').charAt;
var InternalStateModule = _dereq_('../internals/internal-state');
var defineIterator = _dereq_('../internals/define-iterator');

var STRING_ITERATOR = 'String Iterator';
var setInternalState = InternalStateModule.set;
var getInternalState = InternalStateModule.getterFor(STRING_ITERATOR);

// `String.prototype[@@iterator]` method
// https://tc39.github.io/ecma262/#sec-string.prototype-@@iterator
defineIterator(String, 'String', function (iterated) {
  setInternalState(this, {
    type: STRING_ITERATOR,
    string: String(iterated),
    index: 0
  });
// `%StringIteratorPrototype%.next` method
// https://tc39.github.io/ecma262/#sec-%stringiteratorprototype%.next
}, function next() {
  var state = getInternalState(this);
  var string = state.string;
  var index = state.index;
  var point;
  if (index >= string.length) return { value: undefined, done: true };
  point = charAt(string, index);
  state.index += point.length;
  return { value: point, done: false };
});

},{"../internals/define-iterator":220,"../internals/internal-state":245,"../internals/string-multibyte":291}],341:[function(_dereq_,module,exports){
'use strict';
var $ = _dereq_('../internals/export');
var toLength = _dereq_('../internals/to-length');
var notARegExp = _dereq_('../internals/not-a-regexp');
var requireObjectCoercible = _dereq_('../internals/require-object-coercible');
var correctIsRegExpLogic = _dereq_('../internals/correct-is-regexp-logic');

var nativeStartsWith = ''.startsWith;
var min = Math.min;

// `String.prototype.startsWith` method
// https://tc39.github.io/ecma262/#sec-string.prototype.startswith
$({ target: 'String', proto: true, forced: !correctIsRegExpLogic('startsWith') }, {
  startsWith: function startsWith(searchString /* , position = 0 */) {
    var that = String(requireObjectCoercible(this));
    notARegExp(searchString);
    var index = toLength(min(arguments.length > 1 ? arguments[1] : undefined, that.length));
    var search = String(searchString);
    return nativeStartsWith
      ? nativeStartsWith.call(that, search, index)
      : that.slice(index, index + search.length) === search;
  }
});

},{"../internals/correct-is-regexp-logic":215,"../internals/export":227,"../internals/not-a-regexp":260,"../internals/require-object-coercible":282,"../internals/to-length":297}],342:[function(_dereq_,module,exports){
var defineWellKnownSymbol = _dereq_('../internals/define-well-known-symbol');

// `Symbol.asyncIterator` well-known symbol
// https://tc39.github.io/ecma262/#sec-symbol.asynciterator
defineWellKnownSymbol('asyncIterator');

},{"../internals/define-well-known-symbol":221}],343:[function(_dereq_,module,exports){
arguments[4][332][0].apply(exports,arguments)
},{"dup":332}],344:[function(_dereq_,module,exports){
var defineWellKnownSymbol = _dereq_('../internals/define-well-known-symbol');

// `Symbol.hasInstance` well-known symbol
// https://tc39.github.io/ecma262/#sec-symbol.hasinstance
defineWellKnownSymbol('hasInstance');

},{"../internals/define-well-known-symbol":221}],345:[function(_dereq_,module,exports){
var defineWellKnownSymbol = _dereq_('../internals/define-well-known-symbol');

// `Symbol.isConcatSpreadable` well-known symbol
// https://tc39.github.io/ecma262/#sec-symbol.isconcatspreadable
defineWellKnownSymbol('isConcatSpreadable');

},{"../internals/define-well-known-symbol":221}],346:[function(_dereq_,module,exports){
var defineWellKnownSymbol = _dereq_('../internals/define-well-known-symbol');

// `Symbol.iterator` well-known symbol
// https://tc39.github.io/ecma262/#sec-symbol.iterator
defineWellKnownSymbol('iterator');

},{"../internals/define-well-known-symbol":221}],347:[function(_dereq_,module,exports){
'use strict';
var $ = _dereq_('../internals/export');
var global = _dereq_('../internals/global');
var IS_PURE = _dereq_('../internals/is-pure');
var DESCRIPTORS = _dereq_('../internals/descriptors');
var NATIVE_SYMBOL = _dereq_('../internals/native-symbol');
var fails = _dereq_('../internals/fails');
var has = _dereq_('../internals/has');
var isArray = _dereq_('../internals/is-array');
var isObject = _dereq_('../internals/is-object');
var anObject = _dereq_('../internals/an-object');
var toObject = _dereq_('../internals/to-object');
var toIndexedObject = _dereq_('../internals/to-indexed-object');
var toPrimitive = _dereq_('../internals/to-primitive');
var createPropertyDescriptor = _dereq_('../internals/create-property-descriptor');
var nativeObjectCreate = _dereq_('../internals/object-create');
var objectKeys = _dereq_('../internals/object-keys');
var getOwnPropertyNamesModule = _dereq_('../internals/object-get-own-property-names');
var getOwnPropertyNamesExternal = _dereq_('../internals/object-get-own-property-names-external');
var getOwnPropertySymbolsModule = _dereq_('../internals/object-get-own-property-symbols');
var getOwnPropertyDescriptorModule = _dereq_('../internals/object-get-own-property-descriptor');
var definePropertyModule = _dereq_('../internals/object-define-property');
var propertyIsEnumerableModule = _dereq_('../internals/object-property-is-enumerable');
var hide = _dereq_('../internals/hide');
var redefine = _dereq_('../internals/redefine');
var shared = _dereq_('../internals/shared');
var sharedKey = _dereq_('../internals/shared-key');
var hiddenKeys = _dereq_('../internals/hidden-keys');
var uid = _dereq_('../internals/uid');
var wellKnownSymbol = _dereq_('../internals/well-known-symbol');
var wrappedWellKnownSymbolModule = _dereq_('../internals/wrapped-well-known-symbol');
var defineWellKnownSymbol = _dereq_('../internals/define-well-known-symbol');
var setToStringTag = _dereq_('../internals/set-to-string-tag');
var InternalStateModule = _dereq_('../internals/internal-state');
var $forEach = _dereq_('../internals/array-iteration').forEach;

var HIDDEN = sharedKey('hidden');
var SYMBOL = 'Symbol';
var PROTOTYPE = 'prototype';
var TO_PRIMITIVE = wellKnownSymbol('toPrimitive');
var setInternalState = InternalStateModule.set;
var getInternalState = InternalStateModule.getterFor(SYMBOL);
var ObjectPrototype = Object[PROTOTYPE];
var $Symbol = global.Symbol;
var JSON = global.JSON;
var nativeJSONStringify = JSON && JSON.stringify;
var nativeGetOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f;
var nativeDefineProperty = definePropertyModule.f;
var nativeGetOwnPropertyNames = getOwnPropertyNamesExternal.f;
var nativePropertyIsEnumerable = propertyIsEnumerableModule.f;
var AllSymbols = shared('symbols');
var ObjectPrototypeSymbols = shared('op-symbols');
var StringToSymbolRegistry = shared('string-to-symbol-registry');
var SymbolToStringRegistry = shared('symbol-to-string-registry');
var WellKnownSymbolsStore = shared('wks');
var QObject = global.QObject;
// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
var USE_SETTER = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;

// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
var setSymbolDescriptor = DESCRIPTORS && fails(function () {
  return nativeObjectCreate(nativeDefineProperty({}, 'a', {
    get: function () { return nativeDefineProperty(this, 'a', { value: 7 }).a; }
  })).a != 7;
}) ? function (O, P, Attributes) {
  var ObjectPrototypeDescriptor = nativeGetOwnPropertyDescriptor(ObjectPrototype, P);
  if (ObjectPrototypeDescriptor) delete ObjectPrototype[P];
  nativeDefineProperty(O, P, Attributes);
  if (ObjectPrototypeDescriptor && O !== ObjectPrototype) {
    nativeDefineProperty(ObjectPrototype, P, ObjectPrototypeDescriptor);
  }
} : nativeDefineProperty;

var wrap = function (tag, description) {
  var symbol = AllSymbols[tag] = nativeObjectCreate($Symbol[PROTOTYPE]);
  setInternalState(symbol, {
    type: SYMBOL,
    tag: tag,
    description: description
  });
  if (!DESCRIPTORS) symbol.description = description;
  return symbol;
};

var isSymbol = NATIVE_SYMBOL && typeof $Symbol.iterator == 'symbol' ? function (it) {
  return typeof it == 'symbol';
} : function (it) {
  return Object(it) instanceof $Symbol;
};

var $defineProperty = function defineProperty(O, P, Attributes) {
  if (O === ObjectPrototype) $defineProperty(ObjectPrototypeSymbols, P, Attributes);
  anObject(O);
  var key = toPrimitive(P, true);
  anObject(Attributes);
  if (has(AllSymbols, key)) {
    if (!Attributes.enumerable) {
      if (!has(O, HIDDEN)) nativeDefineProperty(O, HIDDEN, createPropertyDescriptor(1, {}));
      O[HIDDEN][key] = true;
    } else {
      if (has(O, HIDDEN) && O[HIDDEN][key]) O[HIDDEN][key] = false;
      Attributes = nativeObjectCreate(Attributes, { enumerable: createPropertyDescriptor(0, false) });
    } return setSymbolDescriptor(O, key, Attributes);
  } return nativeDefineProperty(O, key, Attributes);
};

var $defineProperties = function defineProperties(O, Properties) {
  anObject(O);
  var properties = toIndexedObject(Properties);
  var keys = objectKeys(properties).concat($getOwnPropertySymbols(properties));
  $forEach(keys, function (key) {
    if (!DESCRIPTORS || $propertyIsEnumerable.call(properties, key)) $defineProperty(O, key, properties[key]);
  });
  return O;
};

var $create = function create(O, Properties) {
  return Properties === undefined ? nativeObjectCreate(O) : $defineProperties(nativeObjectCreate(O), Properties);
};

var $propertyIsEnumerable = function propertyIsEnumerable(V) {
  var P = toPrimitive(V, true);
  var enumerable = nativePropertyIsEnumerable.call(this, P);
  if (this === ObjectPrototype && has(AllSymbols, P) && !has(ObjectPrototypeSymbols, P)) return false;
  return enumerable || !has(this, P) || !has(AllSymbols, P) || has(this, HIDDEN) && this[HIDDEN][P] ? enumerable : true;
};

var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(O, P) {
  var it = toIndexedObject(O);
  var key = toPrimitive(P, true);
  if (it === ObjectPrototype && has(AllSymbols, key) && !has(ObjectPrototypeSymbols, key)) return;
  var descriptor = nativeGetOwnPropertyDescriptor(it, key);
  if (descriptor && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key])) {
    descriptor.enumerable = true;
  }
  return descriptor;
};

var $getOwnPropertyNames = function getOwnPropertyNames(O) {
  var names = nativeGetOwnPropertyNames(toIndexedObject(O));
  var result = [];
  $forEach(names, function (key) {
    if (!has(AllSymbols, key) && !has(hiddenKeys, key)) result.push(key);
  });
  return result;
};

var $getOwnPropertySymbols = function getOwnPropertySymbols(O) {
  var IS_OBJECT_PROTOTYPE = O === ObjectPrototype;
  var names = nativeGetOwnPropertyNames(IS_OBJECT_PROTOTYPE ? ObjectPrototypeSymbols : toIndexedObject(O));
  var result = [];
  $forEach(names, function (key) {
    if (has(AllSymbols, key) && (!IS_OBJECT_PROTOTYPE || has(ObjectPrototype, key))) {
      result.push(AllSymbols[key]);
    }
  });
  return result;
};

// `Symbol` constructor
// https://tc39.github.io/ecma262/#sec-symbol-constructor
if (!NATIVE_SYMBOL) {
  $Symbol = function Symbol() {
    if (this instanceof $Symbol) throw TypeError('Symbol is not a constructor');
    var description = !arguments.length || arguments[0] === undefined ? undefined : String(arguments[0]);
    var tag = uid(description);
    var setter = function (value) {
      if (this === ObjectPrototype) setter.call(ObjectPrototypeSymbols, value);
      if (has(this, HIDDEN) && has(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
      setSymbolDescriptor(this, tag, createPropertyDescriptor(1, value));
    };
    if (DESCRIPTORS && USE_SETTER) setSymbolDescriptor(ObjectPrototype, tag, { configurable: true, set: setter });
    return wrap(tag, description);
  };

  redefine($Symbol[PROTOTYPE], 'toString', function toString() {
    return getInternalState(this).tag;
  });

  propertyIsEnumerableModule.f = $propertyIsEnumerable;
  definePropertyModule.f = $defineProperty;
  getOwnPropertyDescriptorModule.f = $getOwnPropertyDescriptor;
  getOwnPropertyNamesModule.f = getOwnPropertyNamesExternal.f = $getOwnPropertyNames;
  getOwnPropertySymbolsModule.f = $getOwnPropertySymbols;

  if (DESCRIPTORS) {
    // https://github.com/tc39/proposal-Symbol-description
    nativeDefineProperty($Symbol[PROTOTYPE], 'description', {
      configurable: true,
      get: function description() {
        return getInternalState(this).description;
      }
    });
    if (!IS_PURE) {
      redefine(ObjectPrototype, 'propertyIsEnumerable', $propertyIsEnumerable, { unsafe: true });
    }
  }

  wrappedWellKnownSymbolModule.f = function (name) {
    return wrap(wellKnownSymbol(name), name);
  };
}

$({ global: true, wrap: true, forced: !NATIVE_SYMBOL, sham: !NATIVE_SYMBOL }, {
  Symbol: $Symbol
});

$forEach(objectKeys(WellKnownSymbolsStore), function (name) {
  defineWellKnownSymbol(name);
});

$({ target: SYMBOL, stat: true, forced: !NATIVE_SYMBOL }, {
  // `Symbol.for` method
  // https://tc39.github.io/ecma262/#sec-symbol.for
  'for': function (key) {
    var string = String(key);
    if (has(StringToSymbolRegistry, string)) return StringToSymbolRegistry[string];
    var symbol = $Symbol(string);
    StringToSymbolRegistry[string] = symbol;
    SymbolToStringRegistry[symbol] = string;
    return symbol;
  },
  // `Symbol.keyFor` method
  // https://tc39.github.io/ecma262/#sec-symbol.keyfor
  keyFor: function keyFor(sym) {
    if (!isSymbol(sym)) throw TypeError(sym + ' is not a symbol');
    if (has(SymbolToStringRegistry, sym)) return SymbolToStringRegistry[sym];
  },
  useSetter: function () { USE_SETTER = true; },
  useSimple: function () { USE_SETTER = false; }
});

$({ target: 'Object', stat: true, forced: !NATIVE_SYMBOL, sham: !DESCRIPTORS }, {
  // `Object.create` method
  // https://tc39.github.io/ecma262/#sec-object.create
  create: $create,
  // `Object.defineProperty` method
  // https://tc39.github.io/ecma262/#sec-object.defineproperty
  defineProperty: $defineProperty,
  // `Object.defineProperties` method
  // https://tc39.github.io/ecma262/#sec-object.defineproperties
  defineProperties: $defineProperties,
  // `Object.getOwnPropertyDescriptor` method
  // https://tc39.github.io/ecma262/#sec-object.getownpropertydescriptors
  getOwnPropertyDescriptor: $getOwnPropertyDescriptor
});

$({ target: 'Object', stat: true, forced: !NATIVE_SYMBOL }, {
  // `Object.getOwnPropertyNames` method
  // https://tc39.github.io/ecma262/#sec-object.getownpropertynames
  getOwnPropertyNames: $getOwnPropertyNames,
  // `Object.getOwnPropertySymbols` method
  // https://tc39.github.io/ecma262/#sec-object.getownpropertysymbols
  getOwnPropertySymbols: $getOwnPropertySymbols
});

// Chrome 38 and 39 `Object.getOwnPropertySymbols` fails on primitives
// https://bugs.chromium.org/p/v8/issues/detail?id=3443
$({ target: 'Object', stat: true, forced: fails(function () { getOwnPropertySymbolsModule.f(1); }) }, {
  getOwnPropertySymbols: function getOwnPropertySymbols(it) {
    return getOwnPropertySymbolsModule.f(toObject(it));
  }
});

// `JSON.stringify` method behavior with symbols
// https://tc39.github.io/ecma262/#sec-json.stringify
JSON && $({ target: 'JSON', stat: true, forced: !NATIVE_SYMBOL || fails(function () {
  var symbol = $Symbol();
  // MS Edge converts symbol values to JSON as {}
  return nativeJSONStringify([symbol]) != '[null]'
    // WebKit converts symbol values to JSON as null
    || nativeJSONStringify({ a: symbol }) != '{}'
    // V8 throws on boxed symbols
    || nativeJSONStringify(Object(symbol)) != '{}';
}) }, {
  stringify: function stringify(it) {
    var args = [it];
    var index = 1;
    var replacer, $replacer;
    while (arguments.length > index) args.push(arguments[index++]);
    $replacer = replacer = args[1];
    if (!isObject(replacer) && it === undefined || isSymbol(it)) return; // IE8 returns string on undefined
    if (!isArray(replacer)) replacer = function (key, value) {
      if (typeof $replacer == 'function') value = $replacer.call(this, key, value);
      if (!isSymbol(value)) return value;
    };
    args[1] = replacer;
    return nativeJSONStringify.apply(JSON, args);
  }
});

// `Symbol.prototype[@@toPrimitive]` method
// https://tc39.github.io/ecma262/#sec-symbol.prototype-@@toprimitive
if (!$Symbol[PROTOTYPE][TO_PRIMITIVE]) hide($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
// `Symbol.prototype[@@toStringTag]` property
// https://tc39.github.io/ecma262/#sec-symbol.prototype-@@tostringtag
setToStringTag($Symbol, SYMBOL);

hiddenKeys[HIDDEN] = true;

},{"../internals/an-object":197,"../internals/array-iteration":201,"../internals/create-property-descriptor":218,"../internals/define-well-known-symbol":221,"../internals/descriptors":222,"../internals/export":227,"../internals/fails":228,"../internals/global":236,"../internals/has":237,"../internals/hidden-keys":238,"../internals/hide":239,"../internals/internal-state":245,"../internals/is-array":247,"../internals/is-object":250,"../internals/is-pure":251,"../internals/native-symbol":257,"../internals/object-create":262,"../internals/object-define-property":264,"../internals/object-get-own-property-descriptor":265,"../internals/object-get-own-property-names":267,"../internals/object-get-own-property-names-external":266,"../internals/object-get-own-property-symbols":268,"../internals/object-keys":271,"../internals/object-property-is-enumerable":272,"../internals/redefine":281,"../internals/set-to-string-tag":286,"../internals/shared":288,"../internals/shared-key":287,"../internals/to-indexed-object":295,"../internals/to-object":298,"../internals/to-primitive":299,"../internals/uid":300,"../internals/well-known-symbol":302,"../internals/wrapped-well-known-symbol":304}],348:[function(_dereq_,module,exports){
var defineWellKnownSymbol = _dereq_('../internals/define-well-known-symbol');

// `Symbol.matchAll` well-known symbol
defineWellKnownSymbol('matchAll');

},{"../internals/define-well-known-symbol":221}],349:[function(_dereq_,module,exports){
var defineWellKnownSymbol = _dereq_('../internals/define-well-known-symbol');

// `Symbol.match` well-known symbol
// https://tc39.github.io/ecma262/#sec-symbol.match
defineWellKnownSymbol('match');

},{"../internals/define-well-known-symbol":221}],350:[function(_dereq_,module,exports){
var defineWellKnownSymbol = _dereq_('../internals/define-well-known-symbol');

// `Symbol.replace` well-known symbol
// https://tc39.github.io/ecma262/#sec-symbol.replace
defineWellKnownSymbol('replace');

},{"../internals/define-well-known-symbol":221}],351:[function(_dereq_,module,exports){
var defineWellKnownSymbol = _dereq_('../internals/define-well-known-symbol');

// `Symbol.search` well-known symbol
// https://tc39.github.io/ecma262/#sec-symbol.search
defineWellKnownSymbol('search');

},{"../internals/define-well-known-symbol":221}],352:[function(_dereq_,module,exports){
var defineWellKnownSymbol = _dereq_('../internals/define-well-known-symbol');

// `Symbol.species` well-known symbol
// https://tc39.github.io/ecma262/#sec-symbol.species
defineWellKnownSymbol('species');

},{"../internals/define-well-known-symbol":221}],353:[function(_dereq_,module,exports){
var defineWellKnownSymbol = _dereq_('../internals/define-well-known-symbol');

// `Symbol.split` well-known symbol
// https://tc39.github.io/ecma262/#sec-symbol.split
defineWellKnownSymbol('split');

},{"../internals/define-well-known-symbol":221}],354:[function(_dereq_,module,exports){
var defineWellKnownSymbol = _dereq_('../internals/define-well-known-symbol');

// `Symbol.toPrimitive` well-known symbol
// https://tc39.github.io/ecma262/#sec-symbol.toprimitive
defineWellKnownSymbol('toPrimitive');

},{"../internals/define-well-known-symbol":221}],355:[function(_dereq_,module,exports){
var defineWellKnownSymbol = _dereq_('../internals/define-well-known-symbol');

// `Symbol.toStringTag` well-known symbol
// https://tc39.github.io/ecma262/#sec-symbol.tostringtag
defineWellKnownSymbol('toStringTag');

},{"../internals/define-well-known-symbol":221}],356:[function(_dereq_,module,exports){
var defineWellKnownSymbol = _dereq_('../internals/define-well-known-symbol');

// `Symbol.unscopables` well-known symbol
// https://tc39.github.io/ecma262/#sec-symbol.unscopables
defineWellKnownSymbol('unscopables');

},{"../internals/define-well-known-symbol":221}],357:[function(_dereq_,module,exports){
'use strict';
var global = _dereq_('../internals/global');
var redefineAll = _dereq_('../internals/redefine-all');
var InternalMetadataModule = _dereq_('../internals/internal-metadata');
var collection = _dereq_('../internals/collection');
var collectionWeak = _dereq_('../internals/collection-weak');
var isObject = _dereq_('../internals/is-object');
var enforceIternalState = _dereq_('../internals/internal-state').enforce;
var NATIVE_WEAK_MAP = _dereq_('../internals/native-weak-map');

var IS_IE11 = !global.ActiveXObject && 'ActiveXObject' in global;
var isExtensible = Object.isExtensible;
var InternalWeakMap;

var wrapper = function (get) {
  return function WeakMap() {
    return get(this, arguments.length ? arguments[0] : undefined);
  };
};

// `WeakMap` constructor
// https://tc39.github.io/ecma262/#sec-weakmap-constructor
var $WeakMap = module.exports = collection('WeakMap', wrapper, collectionWeak, true, true);

// IE11 WeakMap frozen keys fix
// We can't use feature detection because it crash some old IE builds
// https://github.com/zloirock/core-js/issues/485
if (NATIVE_WEAK_MAP && IS_IE11) {
  InternalWeakMap = collectionWeak.getConstructor(wrapper, 'WeakMap', true);
  InternalMetadataModule.REQUIRED = true;
  var WeakMapPrototype = $WeakMap.prototype;
  var nativeDelete = WeakMapPrototype['delete'];
  var nativeHas = WeakMapPrototype.has;
  var nativeGet = WeakMapPrototype.get;
  var nativeSet = WeakMapPrototype.set;
  redefineAll(WeakMapPrototype, {
    'delete': function (key) {
      if (isObject(key) && !isExtensible(key)) {
        var state = enforceIternalState(this);
        if (!state.frozen) state.frozen = new InternalWeakMap();
        return nativeDelete.call(this, key) || state.frozen['delete'](key);
      } return nativeDelete.call(this, key);
    },
    has: function has(key) {
      if (isObject(key) && !isExtensible(key)) {
        var state = enforceIternalState(this);
        if (!state.frozen) state.frozen = new InternalWeakMap();
        return nativeHas.call(this, key) || state.frozen.has(key);
      } return nativeHas.call(this, key);
    },
    get: function get(key) {
      if (isObject(key) && !isExtensible(key)) {
        var state = enforceIternalState(this);
        if (!state.frozen) state.frozen = new InternalWeakMap();
        return nativeHas.call(this, key) ? nativeGet.call(this, key) : state.frozen.get(key);
      } return nativeGet.call(this, key);
    },
    set: function set(key, value) {
      if (isObject(key) && !isExtensible(key)) {
        var state = enforceIternalState(this);
        if (!state.frozen) state.frozen = new InternalWeakMap();
        nativeHas.call(this, key) ? nativeSet.call(this, key, value) : state.frozen.set(key, value);
      } else nativeSet.call(this, key, value);
      return this;
    }
  });
}

},{"../internals/collection":214,"../internals/collection-weak":213,"../internals/global":236,"../internals/internal-metadata":244,"../internals/internal-state":245,"../internals/is-object":250,"../internals/native-weak-map":258,"../internals/redefine-all":280}],358:[function(_dereq_,module,exports){
var $ = _dereq_('../internals/export');
var getPrototypeOf = _dereq_('../internals/object-get-prototype-of');
var setPrototypeOf = _dereq_('../internals/object-set-prototype-of');
var create = _dereq_('../internals/object-create');
var createPropertyDescriptor = _dereq_('../internals/create-property-descriptor');
var iterate = _dereq_('../internals/iterate');
var hide = _dereq_('../internals/hide');

var $AggregateError = function AggregateError(errors, message) {
  var that = this;
  if (!(that instanceof $AggregateError)) return new $AggregateError(errors, message);
  if (setPrototypeOf) {
    that = setPrototypeOf(new Error(message), getPrototypeOf(that));
  }
  var errorsArray = [];
  iterate(errors, errorsArray.push, errorsArray);
  that.errors = errorsArray;
  if (message !== undefined) hide(that, 'message', String(message));
  return that;
};

$AggregateError.prototype = create(Error.prototype, {
  constructor: createPropertyDescriptor(5, $AggregateError),
  name: createPropertyDescriptor(5, 'AggregateError')
});

$({ global: true }, {
  AggregateError: $AggregateError
});

},{"../internals/create-property-descriptor":218,"../internals/export":227,"../internals/hide":239,"../internals/iterate":253,"../internals/object-create":262,"../internals/object-get-prototype-of":269,"../internals/object-set-prototype-of":273}],359:[function(_dereq_,module,exports){
'use strict';
var $ = _dereq_('../internals/export');
var IS_PURE = _dereq_('../internals/is-pure');
var collectionDeleteAll = _dereq_('../internals/collection-delete-all');

// `Map.prototype.deleteAll` method
// https://github.com/tc39/proposal-collection-methods
$({ target: 'Map', proto: true, real: true, forced: IS_PURE }, {
  deleteAll: function deleteAll(/* ...elements */) {
    return collectionDeleteAll.apply(this, arguments);
  }
});

},{"../internals/collection-delete-all":209,"../internals/export":227,"../internals/is-pure":251}],360:[function(_dereq_,module,exports){
'use strict';
var $ = _dereq_('../internals/export');
var IS_PURE = _dereq_('../internals/is-pure');
var anObject = _dereq_('../internals/an-object');
var bind = _dereq_('../internals/bind-context');
var getMapIterator = _dereq_('../internals/get-map-iterator');
var iterate = _dereq_('../internals/iterate');

// `Map.prototype.every` method
// https://github.com/tc39/proposal-collection-methods
$({ target: 'Map', proto: true, real: true, forced: IS_PURE }, {
  every: function every(callbackfn /* , thisArg */) {
    var map = anObject(this);
    var iterator = getMapIterator(map);
    var boundFunction = bind(callbackfn, arguments.length > 1 ? arguments[1] : undefined, 3);
    return !iterate(iterator, function (key, value) {
      if (!boundFunction(value, key, map)) return iterate.stop();
    }, undefined, true, true).stopped;
  }
});

},{"../internals/an-object":197,"../internals/bind-context":204,"../internals/export":227,"../internals/get-map-iterator":235,"../internals/is-pure":251,"../internals/iterate":253}],361:[function(_dereq_,module,exports){
'use strict';
var $ = _dereq_('../internals/export');
var IS_PURE = _dereq_('../internals/is-pure');
var getBuiltIn = _dereq_('../internals/get-built-in');
var anObject = _dereq_('../internals/an-object');
var aFunction = _dereq_('../internals/a-function');
var bind = _dereq_('../internals/bind-context');
var speciesConstructor = _dereq_('../internals/species-constructor');
var getMapIterator = _dereq_('../internals/get-map-iterator');
var iterate = _dereq_('../internals/iterate');

// `Map.prototype.filter` method
// https://github.com/tc39/proposal-collection-methods
$({ target: 'Map', proto: true, real: true, forced: IS_PURE }, {
  filter: function filter(callbackfn /* , thisArg */) {
    var map = anObject(this);
    var iterator = getMapIterator(map);
    var boundFunction = bind(callbackfn, arguments.length > 1 ? arguments[1] : undefined, 3);
    var newMap = new (speciesConstructor(map, getBuiltIn('Map')))();
    var setter = aFunction(newMap.set);
    iterate(iterator, function (key, value) {
      if (boundFunction(value, key, map)) setter.call(newMap, key, value);
    }, undefined, true, true);
    return newMap;
  }
});

},{"../internals/a-function":193,"../internals/an-object":197,"../internals/bind-context":204,"../internals/export":227,"../internals/get-built-in":232,"../internals/get-map-iterator":235,"../internals/is-pure":251,"../internals/iterate":253,"../internals/species-constructor":290}],362:[function(_dereq_,module,exports){
'use strict';
var $ = _dereq_('../internals/export');
var IS_PURE = _dereq_('../internals/is-pure');
var anObject = _dereq_('../internals/an-object');
var bind = _dereq_('../internals/bind-context');
var getMapIterator = _dereq_('../internals/get-map-iterator');
var iterate = _dereq_('../internals/iterate');

// `Map.prototype.findKey` method
// https://github.com/tc39/proposal-collection-methods
$({ target: 'Map', proto: true, real: true, forced: IS_PURE }, {
  findKey: function findKey(callbackfn /* , thisArg */) {
    var map = anObject(this);
    var iterator = getMapIterator(map);
    var boundFunction = bind(callbackfn, arguments.length > 1 ? arguments[1] : undefined, 3);
    return iterate(iterator, function (key, value) {
      if (boundFunction(value, key, map)) return iterate.stop(key);
    }, undefined, true, true).result;
  }
});

},{"../internals/an-object":197,"../internals/bind-context":204,"../internals/export":227,"../internals/get-map-iterator":235,"../internals/is-pure":251,"../internals/iterate":253}],363:[function(_dereq_,module,exports){
'use strict';
var $ = _dereq_('../internals/export');
var IS_PURE = _dereq_('../internals/is-pure');
var anObject = _dereq_('../internals/an-object');
var bind = _dereq_('../internals/bind-context');
var getMapIterator = _dereq_('../internals/get-map-iterator');
var iterate = _dereq_('../internals/iterate');

// `Map.prototype.find` method
// https://github.com/tc39/proposal-collection-methods
$({ target: 'Map', proto: true, real: true, forced: IS_PURE }, {
  find: function find(callbackfn /* , thisArg */) {
    var map = anObject(this);
    var iterator = getMapIterator(map);
    var boundFunction = bind(callbackfn, arguments.length > 1 ? arguments[1] : undefined, 3);
    return iterate(iterator, function (key, value) {
      if (boundFunction(value, key, map)) return iterate.stop(value);
    }, undefined, true, true).result;
  }
});

},{"../internals/an-object":197,"../internals/bind-context":204,"../internals/export":227,"../internals/get-map-iterator":235,"../internals/is-pure":251,"../internals/iterate":253}],364:[function(_dereq_,module,exports){
var $ = _dereq_('../internals/export');
var from = _dereq_('../internals/collection-from');

// `Map.from` method
// https://tc39.github.io/proposal-setmap-offrom/#sec-map.from
$({ target: 'Map', stat: true }, {
  from: from
});

},{"../internals/collection-from":210,"../internals/export":227}],365:[function(_dereq_,module,exports){
'use strict';
var $ = _dereq_('../internals/export');
var iterate = _dereq_('../internals/iterate');
var aFunction = _dereq_('../internals/a-function');

// `Map.groupBy` method
// https://github.com/tc39/proposal-collection-methods
$({ target: 'Map', stat: true }, {
  groupBy: function groupBy(iterable, keyDerivative) {
    var newMap = new this();
    aFunction(keyDerivative);
    var has = aFunction(newMap.has);
    var get = aFunction(newMap.get);
    var set = aFunction(newMap.set);
    iterate(iterable, function (element) {
      var derivedKey = keyDerivative(element);
      if (!has.call(newMap, derivedKey)) set.call(newMap, derivedKey, [element]);
      else get.call(newMap, derivedKey).push(element);
    });
    return newMap;
  }
});

},{"../internals/a-function":193,"../internals/export":227,"../internals/iterate":253}],366:[function(_dereq_,module,exports){
'use strict';
var $ = _dereq_('../internals/export');
var IS_PURE = _dereq_('../internals/is-pure');
var anObject = _dereq_('../internals/an-object');
var getMapIterator = _dereq_('../internals/get-map-iterator');
var sameValueZero = _dereq_('../internals/same-value-zero');
var iterate = _dereq_('../internals/iterate');

// `Map.prototype.includes` method
// https://github.com/tc39/proposal-collection-methods
$({ target: 'Map', proto: true, real: true, forced: IS_PURE }, {
  includes: function includes(searchElement) {
    return iterate(getMapIterator(anObject(this)), function (key, value) {
      if (sameValueZero(value, searchElement)) return iterate.stop();
    }, undefined, true, true).stopped;
  }
});

},{"../internals/an-object":197,"../internals/export":227,"../internals/get-map-iterator":235,"../internals/is-pure":251,"../internals/iterate":253,"../internals/same-value-zero":283}],367:[function(_dereq_,module,exports){
'use strict';
var $ = _dereq_('../internals/export');
var iterate = _dereq_('../internals/iterate');
var aFunction = _dereq_('../internals/a-function');

// `Map.keyBy` method
// https://github.com/tc39/proposal-collection-methods
$({ target: 'Map', stat: true }, {
  keyBy: function keyBy(iterable, keyDerivative) {
    var newMap = new this();
    aFunction(keyDerivative);
    var setter = aFunction(newMap.set);
    iterate(iterable, function (element) {
      setter.call(newMap, keyDerivative(element), element);
    });
    return newMap;
  }
});

},{"../internals/a-function":193,"../internals/export":227,"../internals/iterate":253}],368:[function(_dereq_,module,exports){
'use strict';
var $ = _dereq_('../internals/export');
var IS_PURE = _dereq_('../internals/is-pure');
var anObject = _dereq_('../internals/an-object');
var getMapIterator = _dereq_('../internals/get-map-iterator');
var iterate = _dereq_('../internals/iterate');

// `Map.prototype.includes` method
// https://github.com/tc39/proposal-collection-methods
$({ target: 'Map', proto: true, real: true, forced: IS_PURE }, {
  keyOf: function keyOf(searchElement) {
    return iterate(getMapIterator(anObject(this)), function (key, value) {
      if (value === searchElement) return iterate.stop(key);
    }, undefined, true, true).result;
  }
});

},{"../internals/an-object":197,"../internals/export":227,"../internals/get-map-iterator":235,"../internals/is-pure":251,"../internals/iterate":253}],369:[function(_dereq_,module,exports){
'use strict';
var $ = _dereq_('../internals/export');
var IS_PURE = _dereq_('../internals/is-pure');
var getBuiltIn = _dereq_('../internals/get-built-in');
var anObject = _dereq_('../internals/an-object');
var aFunction = _dereq_('../internals/a-function');
var bind = _dereq_('../internals/bind-context');
var speciesConstructor = _dereq_('../internals/species-constructor');
var getMapIterator = _dereq_('../internals/get-map-iterator');
var iterate = _dereq_('../internals/iterate');

// `Map.prototype.mapKeys` method
// https://github.com/tc39/proposal-collection-methods
$({ target: 'Map', proto: true, real: true, forced: IS_PURE }, {
  mapKeys: function mapKeys(callbackfn /* , thisArg */) {
    var map = anObject(this);
    var iterator = getMapIterator(map);
    var boundFunction = bind(callbackfn, arguments.length > 1 ? arguments[1] : undefined, 3);
    var newMap = new (speciesConstructor(map, getBuiltIn('Map')))();
    var setter = aFunction(newMap.set);
    iterate(iterator, function (key, value) {
      setter.call(newMap, boundFunction(value, key, map), value);
    }, undefined, true, true);
    return newMap;
  }
});

},{"../internals/a-function":193,"../internals/an-object":197,"../internals/bind-context":204,"../internals/export":227,"../internals/get-built-in":232,"../internals/get-map-iterator":235,"../internals/is-pure":251,"../internals/iterate":253,"../internals/species-constructor":290}],370:[function(_dereq_,module,exports){
'use strict';
var $ = _dereq_('../internals/export');
var IS_PURE = _dereq_('../internals/is-pure');
var getBuiltIn = _dereq_('../internals/get-built-in');
var anObject = _dereq_('../internals/an-object');
var aFunction = _dereq_('../internals/a-function');
var bind = _dereq_('../internals/bind-context');
var speciesConstructor = _dereq_('../internals/species-constructor');
var getMapIterator = _dereq_('../internals/get-map-iterator');
var iterate = _dereq_('../internals/iterate');

// `Map.prototype.mapValues` method
// https://github.com/tc39/proposal-collection-methods
$({ target: 'Map', proto: true, real: true, forced: IS_PURE }, {
  mapValues: function mapValues(callbackfn /* , thisArg */) {
    var map = anObject(this);
    var iterator = getMapIterator(map);
    var boundFunction = bind(callbackfn, arguments.length > 1 ? arguments[1] : undefined, 3);
    var newMap = new (speciesConstructor(map, getBuiltIn('Map')))();
    var setter = aFunction(newMap.set);
    iterate(iterator, function (key, value) {
      setter.call(newMap, key, boundFunction(value, key, map));
    }, undefined, true, true);
    return newMap;
  }
});

},{"../internals/a-function":193,"../internals/an-object":197,"../internals/bind-context":204,"../internals/export":227,"../internals/get-built-in":232,"../internals/get-map-iterator":235,"../internals/is-pure":251,"../internals/iterate":253,"../internals/species-constructor":290}],371:[function(_dereq_,module,exports){
'use strict';
var $ = _dereq_('../internals/export');
var IS_PURE = _dereq_('../internals/is-pure');
var anObject = _dereq_('../internals/an-object');
var aFunction = _dereq_('../internals/a-function');
var iterate = _dereq_('../internals/iterate');

// `Map.prototype.merge` method
// https://github.com/tc39/proposal-collection-methods
$({ target: 'Map', proto: true, real: true, forced: IS_PURE }, {
  // eslint-disable-next-line no-unused-vars
  merge: function merge(iterable /* ...iterbles */) {
    var map = anObject(this);
    var setter = aFunction(map.set);
    var i = 0;
    while (i < arguments.length) {
      iterate(arguments[i++], setter, map, true);
    }
    return map;
  }
});

},{"../internals/a-function":193,"../internals/an-object":197,"../internals/export":227,"../internals/is-pure":251,"../internals/iterate":253}],372:[function(_dereq_,module,exports){
var $ = _dereq_('../internals/export');
var of = _dereq_('../internals/collection-of');

// `Map.of` method
// https://tc39.github.io/proposal-setmap-offrom/#sec-map.of
$({ target: 'Map', stat: true }, {
  of: of
});

},{"../internals/collection-of":211,"../internals/export":227}],373:[function(_dereq_,module,exports){
'use strict';
var $ = _dereq_('../internals/export');
var IS_PURE = _dereq_('../internals/is-pure');
var anObject = _dereq_('../internals/an-object');
var aFunction = _dereq_('../internals/a-function');
var getMapIterator = _dereq_('../internals/get-map-iterator');
var iterate = _dereq_('../internals/iterate');

// `Map.prototype.reduce` method
// https://github.com/tc39/proposal-collection-methods
$({ target: 'Map', proto: true, real: true, forced: IS_PURE }, {
  reduce: function reduce(callbackfn /* , initialValue */) {
    var map = anObject(this);
    var iterator = getMapIterator(map);
    var accumulator, step;
    aFunction(callbackfn);
    if (arguments.length > 1) accumulator = arguments[1];
    else {
      step = iterator.next();
      if (step.done) throw TypeError('Reduce of empty map with no initial value');
      accumulator = step.value[1];
    }
    iterate(iterator, function (key, value) {
      accumulator = callbackfn(accumulator, value, key, map);
    }, undefined, true, true);
    return accumulator;
  }
});

},{"../internals/a-function":193,"../internals/an-object":197,"../internals/export":227,"../internals/get-map-iterator":235,"../internals/is-pure":251,"../internals/iterate":253}],374:[function(_dereq_,module,exports){
'use strict';
var $ = _dereq_('../internals/export');
var IS_PURE = _dereq_('../internals/is-pure');
var anObject = _dereq_('../internals/an-object');
var bind = _dereq_('../internals/bind-context');
var getMapIterator = _dereq_('../internals/get-map-iterator');
var iterate = _dereq_('../internals/iterate');

// `Set.prototype.some` method
// https://github.com/tc39/proposal-collection-methods
$({ target: 'Map', proto: true, real: true, forced: IS_PURE }, {
  some: function some(callbackfn /* , thisArg */) {
    var map = anObject(this);
    var iterator = getMapIterator(map);
    var boundFunction = bind(callbackfn, arguments.length > 1 ? arguments[1] : undefined, 3);
    return iterate(iterator, function (key, value) {
      if (boundFunction(value, key, map)) return iterate.stop();
    }, undefined, true, true).stopped;
  }
});

},{"../internals/an-object":197,"../internals/bind-context":204,"../internals/export":227,"../internals/get-map-iterator":235,"../internals/is-pure":251,"../internals/iterate":253}],375:[function(_dereq_,module,exports){
'use strict';
var $ = _dereq_('../internals/export');
var IS_PURE = _dereq_('../internals/is-pure');
var anObject = _dereq_('../internals/an-object');
var aFunction = _dereq_('../internals/a-function');

// `Set.prototype.update` method
// https://github.com/tc39/proposal-collection-methods
$({ target: 'Map', proto: true, real: true, forced: IS_PURE }, {
  update: function update(key, callback /* , thunk */) {
    var map = anObject(this);
    var length = arguments.length;
    aFunction(callback);
    var isPresentInMap = map.has(key);
    if (!isPresentInMap && length < 3) {
      throw TypeError('Updating absent value');
    }
    var value = isPresentInMap ? map.get(key) : aFunction(length > 2 ? arguments[2] : undefined)(key, map);
    map.set(key, callback(value, key, map));
    return map;
  }
});

},{"../internals/a-function":193,"../internals/an-object":197,"../internals/export":227,"../internals/is-pure":251}],376:[function(_dereq_,module,exports){
'use strict';
var $ = _dereq_('../internals/export');
var aFunction = _dereq_('../internals/a-function');
var newPromiseCapabilityModule = _dereq_('../internals/new-promise-capability');
var perform = _dereq_('../internals/perform');
var iterate = _dereq_('../internals/iterate');

// `Promise.allSettled` method
// https://github.com/tc39/proposal-promise-allSettled
$({ target: 'Promise', stat: true }, {
  allSettled: function allSettled(iterable) {
    var C = this;
    var capability = newPromiseCapabilityModule.f(C);
    var resolve = capability.resolve;
    var reject = capability.reject;
    var result = perform(function () {
      var promiseResolve = aFunction(C.resolve);
      var values = [];
      var counter = 0;
      var remaining = 1;
      iterate(iterable, function (promise) {
        var index = counter++;
        var alreadyCalled = false;
        values.push(undefined);
        remaining++;
        promiseResolve.call(C, promise).then(function (value) {
          if (alreadyCalled) return;
          alreadyCalled = true;
          values[index] = { status: 'fulfilled', value: value };
          --remaining || resolve(values);
        }, function (e) {
          if (alreadyCalled) return;
          alreadyCalled = true;
          values[index] = { status: 'rejected', reason: e };
          --remaining || resolve(values);
        });
      });
      --remaining || resolve(values);
    });
    if (result.error) reject(result.value);
    return capability.promise;
  }
});

},{"../internals/a-function":193,"../internals/export":227,"../internals/iterate":253,"../internals/new-promise-capability":259,"../internals/perform":278}],377:[function(_dereq_,module,exports){
'use strict';
var $ = _dereq_('../internals/export');
var aFunction = _dereq_('../internals/a-function');
var getBuiltIn = _dereq_('../internals/get-built-in');
var newPromiseCapabilityModule = _dereq_('../internals/new-promise-capability');
var perform = _dereq_('../internals/perform');
var iterate = _dereq_('../internals/iterate');

var PROMISE_ANY_ERROR = 'No one promise resolved';

// `Promise.any` method
// https://github.com/tc39/proposal-promise-any
$({ target: 'Promise', stat: true }, {
  any: function any(iterable) {
    var C = this;
    var capability = newPromiseCapabilityModule.f(C);
    var resolve = capability.resolve;
    var reject = capability.reject;
    var result = perform(function () {
      var promiseResolve = aFunction(C.resolve);
      var errors = [];
      var counter = 0;
      var remaining = 1;
      var alreadyResolved = false;
      iterate(iterable, function (promise) {
        var index = counter++;
        var alreadyRejected = false;
        errors.push(undefined);
        remaining++;
        promiseResolve.call(C, promise).then(function (value) {
          if (alreadyRejected || alreadyResolved) return;
          alreadyResolved = true;
          resolve(value);
        }, function (e) {
          if (alreadyRejected || alreadyResolved) return;
          alreadyRejected = true;
          errors[index] = e;
          --remaining || reject(new (getBuiltIn('AggregateError'))(errors, PROMISE_ANY_ERROR));
        });
      });
      --remaining || reject(new (getBuiltIn('AggregateError'))(errors, PROMISE_ANY_ERROR));
    });
    if (result.error) reject(result.value);
    return capability.promise;
  }
});

},{"../internals/a-function":193,"../internals/export":227,"../internals/get-built-in":232,"../internals/iterate":253,"../internals/new-promise-capability":259,"../internals/perform":278}],378:[function(_dereq_,module,exports){
'use strict';
var $ = _dereq_('../internals/export');
var newPromiseCapabilityModule = _dereq_('../internals/new-promise-capability');
var perform = _dereq_('../internals/perform');

// `Promise.try` method
// https://github.com/tc39/proposal-promise-try
$({ target: 'Promise', stat: true }, {
  'try': function (callbackfn) {
    var promiseCapability = newPromiseCapabilityModule.f(this);
    var result = perform(callbackfn);
    (result.error ? promiseCapability.reject : promiseCapability.resolve)(result.value);
    return promiseCapability.promise;
  }
});

},{"../internals/export":227,"../internals/new-promise-capability":259,"../internals/perform":278}],379:[function(_dereq_,module,exports){
var defineWellKnownSymbol = _dereq_('../internals/define-well-known-symbol');

// `Symbol.patternMatch` well-known symbol
// https://github.com/tc39/proposal-using-statement
defineWellKnownSymbol('dispose');

},{"../internals/define-well-known-symbol":221}],380:[function(_dereq_,module,exports){
var defineWellKnownSymbol = _dereq_('../internals/define-well-known-symbol');

// `Symbol.observable` well-known symbol
// https://github.com/tc39/proposal-observable
defineWellKnownSymbol('observable');

},{"../internals/define-well-known-symbol":221}],381:[function(_dereq_,module,exports){
var defineWellKnownSymbol = _dereq_('../internals/define-well-known-symbol');

// `Symbol.patternMatch` well-known symbol
// https://github.com/tc39/proposal-pattern-matching
defineWellKnownSymbol('patternMatch');

},{"../internals/define-well-known-symbol":221}],382:[function(_dereq_,module,exports){
var defineWellKnownSymbol = _dereq_('../internals/define-well-known-symbol');

// `Symbol.replaceAll` well-known symbol
// https://tc39.github.io/proposal-string-replaceall/
defineWellKnownSymbol('replaceAll');

},{"../internals/define-well-known-symbol":221}],383:[function(_dereq_,module,exports){
_dereq_('./es.array.iterator');
var DOMIterables = _dereq_('../internals/dom-iterables');
var global = _dereq_('../internals/global');
var hide = _dereq_('../internals/hide');
var Iterators = _dereq_('../internals/iterators');
var wellKnownSymbol = _dereq_('../internals/well-known-symbol');

var TO_STRING_TAG = wellKnownSymbol('toStringTag');

for (var COLLECTION_NAME in DOMIterables) {
  var Collection = global[COLLECTION_NAME];
  var CollectionPrototype = Collection && Collection.prototype;
  if (CollectionPrototype && !CollectionPrototype[TO_STRING_TAG]) {
    hide(CollectionPrototype, TO_STRING_TAG, COLLECTION_NAME);
  }
  Iterators[COLLECTION_NAME] = Iterators.Array;
}

},{"../internals/dom-iterables":224,"../internals/global":236,"../internals/hide":239,"../internals/iterators":255,"../internals/well-known-symbol":302,"./es.array.iterator":313}],384:[function(_dereq_,module,exports){
var $ = _dereq_('../internals/export');
var global = _dereq_('../internals/global');
var userAgent = _dereq_('../internals/user-agent');

var slice = [].slice;
var MSIE = /MSIE .\./.test(userAgent); // <- dirty ie9- check

var wrap = function (scheduler) {
  return function (handler, timeout /* , ...arguments */) {
    var boundArgs = arguments.length > 2;
    var args = boundArgs ? slice.call(arguments, 2) : undefined;
    return scheduler(boundArgs ? function () {
      // eslint-disable-next-line no-new-func
      (typeof handler == 'function' ? handler : Function(handler)).apply(this, args);
    } : handler, timeout);
  };
};

// ie9- setTimeout & setInterval additional parameters fix
// https://html.spec.whatwg.org/multipage/timers-and-user-prompts.html#timers
$({ global: true, bind: true, forced: MSIE }, {
  // `setTimeout` method
  // https://html.spec.whatwg.org/multipage/timers-and-user-prompts.html#dom-settimeout
  setTimeout: wrap(global.setTimeout),
  // `setInterval` method
  // https://html.spec.whatwg.org/multipage/timers-and-user-prompts.html#dom-setinterval
  setInterval: wrap(global.setInterval)
});

},{"../internals/export":227,"../internals/global":236,"../internals/user-agent":301}],385:[function(_dereq_,module,exports){
arguments[4][176][0].apply(exports,arguments)
},{"../../es/array/from":127,"dup":176}],386:[function(_dereq_,module,exports){
arguments[4][177][0].apply(exports,arguments)
},{"../../es/array/is-array":128,"dup":177}],387:[function(_dereq_,module,exports){
module.exports = _dereq_('../../../es/array/virtual/for-each');

},{"../../../es/array/virtual/for-each":132}],388:[function(_dereq_,module,exports){
module.exports = _dereq_('../../../es/array/virtual/keys');

},{"../../../es/array/virtual/keys":135}],389:[function(_dereq_,module,exports){
module.exports = _dereq_('../../../es/array/virtual/values');

},{"../../../es/array/virtual/values":140}],390:[function(_dereq_,module,exports){
arguments[4][179][0].apply(exports,arguments)
},{"../../es/instance/bind":142,"dup":179}],391:[function(_dereq_,module,exports){
module.exports = _dereq_('../../es/instance/concat');

},{"../../es/instance/concat":143}],392:[function(_dereq_,module,exports){
module.exports = _dereq_('../../es/instance/filter');

},{"../../es/instance/filter":144}],393:[function(_dereq_,module,exports){
module.exports = _dereq_('../../es/instance/find');

},{"../../es/instance/find":145}],394:[function(_dereq_,module,exports){
_dereq_('../../modules/web.dom-collections.iterator');
var forEach = _dereq_('../array/virtual/for-each');
var classof = _dereq_('../../internals/classof');
var ArrayPrototype = Array.prototype;

var DOMIterables = {
  DOMTokenList: true,
  NodeList: true
};

module.exports = function (it) {
  var own = it.forEach;
  return it === ArrayPrototype || (it instanceof Array && own === ArrayPrototype.forEach)
    // eslint-disable-next-line no-prototype-builtins
    || DOMIterables.hasOwnProperty(classof(it)) ? forEach : own;
};

},{"../../internals/classof":208,"../../modules/web.dom-collections.iterator":383,"../array/virtual/for-each":387}],395:[function(_dereq_,module,exports){
module.exports = _dereq_('../../es/instance/includes');

},{"../../es/instance/includes":146}],396:[function(_dereq_,module,exports){
arguments[4][180][0].apply(exports,arguments)
},{"../../es/instance/index-of":147,"dup":180}],397:[function(_dereq_,module,exports){
_dereq_('../../modules/web.dom-collections.iterator');
var keys = _dereq_('../array/virtual/keys');
var classof = _dereq_('../../internals/classof');
var ArrayPrototype = Array.prototype;

var DOMIterables = {
  DOMTokenList: true,
  NodeList: true
};

module.exports = function (it) {
  var own = it.keys;
  return it === ArrayPrototype || (it instanceof Array && own === ArrayPrototype.keys)
    // eslint-disable-next-line no-prototype-builtins
    || DOMIterables.hasOwnProperty(classof(it)) ? keys : own;
};

},{"../../internals/classof":208,"../../modules/web.dom-collections.iterator":383,"../array/virtual/keys":388}],398:[function(_dereq_,module,exports){
module.exports = _dereq_('../../es/instance/map');

},{"../../es/instance/map":148}],399:[function(_dereq_,module,exports){
module.exports = _dereq_('../../es/instance/slice');

},{"../../es/instance/slice":149}],400:[function(_dereq_,module,exports){
module.exports = _dereq_('../../es/instance/sort');

},{"../../es/instance/sort":150}],401:[function(_dereq_,module,exports){
module.exports = _dereq_('../../es/instance/splice');

},{"../../es/instance/splice":151}],402:[function(_dereq_,module,exports){
module.exports = _dereq_('../../es/instance/starts-with');

},{"../../es/instance/starts-with":152}],403:[function(_dereq_,module,exports){
_dereq_('../../modules/web.dom-collections.iterator');
var values = _dereq_('../array/virtual/values');
var classof = _dereq_('../../internals/classof');
var ArrayPrototype = Array.prototype;

var DOMIterables = {
  DOMTokenList: true,
  NodeList: true
};

module.exports = function (it) {
  var own = it.values;
  return it === ArrayPrototype || (it instanceof Array && own === ArrayPrototype.values)
    // eslint-disable-next-line no-prototype-builtins
    || DOMIterables.hasOwnProperty(classof(it)) ? values : own;
};

},{"../../internals/classof":208,"../../modules/web.dom-collections.iterator":383,"../array/virtual/values":389}],404:[function(_dereq_,module,exports){
module.exports = _dereq_('../../es/json/stringify');

},{"../../es/json/stringify":153}],405:[function(_dereq_,module,exports){
module.exports = _dereq_('../../es/map');

},{"../../es/map":154}],406:[function(_dereq_,module,exports){
module.exports = _dereq_('../../es/object/assign');

},{"../../es/object/assign":155}],407:[function(_dereq_,module,exports){
arguments[4][183][0].apply(exports,arguments)
},{"../../es/object/create":156,"dup":183}],408:[function(_dereq_,module,exports){
module.exports = _dereq_('../../es/object/define-properties');

},{"../../es/object/define-properties":157}],409:[function(_dereq_,module,exports){
arguments[4][184][0].apply(exports,arguments)
},{"../../es/object/define-property":158,"dup":184}],410:[function(_dereq_,module,exports){
module.exports = _dereq_('../../es/object/freeze');

},{"../../es/object/freeze":159}],411:[function(_dereq_,module,exports){
arguments[4][185][0].apply(exports,arguments)
},{"../../es/object/get-own-property-descriptor":160,"dup":185}],412:[function(_dereq_,module,exports){
module.exports = _dereq_('../../es/object/get-own-property-descriptors');

},{"../../es/object/get-own-property-descriptors":161}],413:[function(_dereq_,module,exports){
module.exports = _dereq_('../../es/object/get-own-property-symbols');

},{"../../es/object/get-own-property-symbols":162}],414:[function(_dereq_,module,exports){
module.exports = _dereq_('../../es/object/keys');

},{"../../es/object/keys":164}],415:[function(_dereq_,module,exports){
module.exports = _dereq_('../es/parse-int');

},{"../es/parse-int":166}],416:[function(_dereq_,module,exports){
module.exports = _dereq_('../../es/promise');

},{"../../es/promise":167}],417:[function(_dereq_,module,exports){
_dereq_('../modules/web.timers');

module.exports = _dereq_('../internals/path').setTimeout;

},{"../internals/path":277,"../modules/web.timers":384}],418:[function(_dereq_,module,exports){
module.exports = _dereq_('../../es/set');

},{"../../es/set":170}],419:[function(_dereq_,module,exports){
module.exports = _dereq_('../../es/weak-map');

},{"../../es/weak-map":175}],420:[function(_dereq_,module,exports){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

var objectCreate = Object.create || objectCreatePolyfill
var objectKeys = Object.keys || objectKeysPolyfill
var bind = Function.prototype.bind || functionBindPolyfill

function EventEmitter() {
  if (!this._events || !Object.prototype.hasOwnProperty.call(this, '_events')) {
    this._events = objectCreate(null);
    this._eventsCount = 0;
  }

  this._maxListeners = this._maxListeners || undefined;
}
module.exports = EventEmitter;

// Backwards-compat with node 0.10.x
EventEmitter.EventEmitter = EventEmitter;

EventEmitter.prototype._events = undefined;
EventEmitter.prototype._maxListeners = undefined;

// By default EventEmitters will print a warning if more than 10 listeners are
// added to it. This is a useful default which helps finding memory leaks.
var defaultMaxListeners = 10;

var hasDefineProperty;
try {
  var o = {};
  if (Object.defineProperty) Object.defineProperty(o, 'x', { value: 0 });
  hasDefineProperty = o.x === 0;
} catch (err) { hasDefineProperty = false }
if (hasDefineProperty) {
  Object.defineProperty(EventEmitter, 'defaultMaxListeners', {
    enumerable: true,
    get: function() {
      return defaultMaxListeners;
    },
    set: function(arg) {
      // check whether the input is a positive number (whose value is zero or
      // greater and not a NaN).
      if (typeof arg !== 'number' || arg < 0 || arg !== arg)
        throw new TypeError('"defaultMaxListeners" must be a positive number');
      defaultMaxListeners = arg;
    }
  });
} else {
  EventEmitter.defaultMaxListeners = defaultMaxListeners;
}

// Obviously not all Emitters should be limited to 10. This function allows
// that to be increased. Set to zero for unlimited.
EventEmitter.prototype.setMaxListeners = function setMaxListeners(n) {
  if (typeof n !== 'number' || n < 0 || isNaN(n))
    throw new TypeError('"n" argument must be a positive number');
  this._maxListeners = n;
  return this;
};

function $getMaxListeners(that) {
  if (that._maxListeners === undefined)
    return EventEmitter.defaultMaxListeners;
  return that._maxListeners;
}

EventEmitter.prototype.getMaxListeners = function getMaxListeners() {
  return $getMaxListeners(this);
};

// These standalone emit* functions are used to optimize calling of event
// handlers for fast cases because emit() itself often has a variable number of
// arguments and can be deoptimized because of that. These functions always have
// the same number of arguments and thus do not get deoptimized, so the code
// inside them can execute faster.
function emitNone(handler, isFn, self) {
  if (isFn)
    handler.call(self);
  else {
    var len = handler.length;
    var listeners = arrayClone(handler, len);
    for (var i = 0; i < len; ++i)
      listeners[i].call(self);
  }
}
function emitOne(handler, isFn, self, arg1) {
  if (isFn)
    handler.call(self, arg1);
  else {
    var len = handler.length;
    var listeners = arrayClone(handler, len);
    for (var i = 0; i < len; ++i)
      listeners[i].call(self, arg1);
  }
}
function emitTwo(handler, isFn, self, arg1, arg2) {
  if (isFn)
    handler.call(self, arg1, arg2);
  else {
    var len = handler.length;
    var listeners = arrayClone(handler, len);
    for (var i = 0; i < len; ++i)
      listeners[i].call(self, arg1, arg2);
  }
}
function emitThree(handler, isFn, self, arg1, arg2, arg3) {
  if (isFn)
    handler.call(self, arg1, arg2, arg3);
  else {
    var len = handler.length;
    var listeners = arrayClone(handler, len);
    for (var i = 0; i < len; ++i)
      listeners[i].call(self, arg1, arg2, arg3);
  }
}

function emitMany(handler, isFn, self, args) {
  if (isFn)
    handler.apply(self, args);
  else {
    var len = handler.length;
    var listeners = arrayClone(handler, len);
    for (var i = 0; i < len; ++i)
      listeners[i].apply(self, args);
  }
}

EventEmitter.prototype.emit = function emit(type) {
  var er, handler, len, args, i, events;
  var doError = (type === 'error');

  events = this._events;
  if (events)
    doError = (doError && events.error == null);
  else if (!doError)
    return false;

  // If there is no 'error' event listener then throw.
  if (doError) {
    if (arguments.length > 1)
      er = arguments[1];
    if (er instanceof Error) {
      throw er; // Unhandled 'error' event
    } else {
      // At least give some kind of context to the user
      var err = new Error('Unhandled "error" event. (' + er + ')');
      err.context = er;
      throw err;
    }
    return false;
  }

  handler = events[type];

  if (!handler)
    return false;

  var isFn = typeof handler === 'function';
  len = arguments.length;
  switch (len) {
      // fast cases
    case 1:
      emitNone(handler, isFn, this);
      break;
    case 2:
      emitOne(handler, isFn, this, arguments[1]);
      break;
    case 3:
      emitTwo(handler, isFn, this, arguments[1], arguments[2]);
      break;
    case 4:
      emitThree(handler, isFn, this, arguments[1], arguments[2], arguments[3]);
      break;
      // slower
    default:
      args = new Array(len - 1);
      for (i = 1; i < len; i++)
        args[i - 1] = arguments[i];
      emitMany(handler, isFn, this, args);
  }

  return true;
};

function _addListener(target, type, listener, prepend) {
  var m;
  var events;
  var existing;

  if (typeof listener !== 'function')
    throw new TypeError('"listener" argument must be a function');

  events = target._events;
  if (!events) {
    events = target._events = objectCreate(null);
    target._eventsCount = 0;
  } else {
    // To avoid recursion in the case that type === "newListener"! Before
    // adding it to the listeners, first emit "newListener".
    if (events.newListener) {
      target.emit('newListener', type,
          listener.listener ? listener.listener : listener);

      // Re-assign `events` because a newListener handler could have caused the
      // this._events to be assigned to a new object
      events = target._events;
    }
    existing = events[type];
  }

  if (!existing) {
    // Optimize the case of one listener. Don't need the extra array object.
    existing = events[type] = listener;
    ++target._eventsCount;
  } else {
    if (typeof existing === 'function') {
      // Adding the second element, need to change to array.
      existing = events[type] =
          prepend ? [listener, existing] : [existing, listener];
    } else {
      // If we've already got an array, just append.
      if (prepend) {
        existing.unshift(listener);
      } else {
        existing.push(listener);
      }
    }

    // Check for listener leak
    if (!existing.warned) {
      m = $getMaxListeners(target);
      if (m && m > 0 && existing.length > m) {
        existing.warned = true;
        var w = new Error('Possible EventEmitter memory leak detected. ' +
            existing.length + ' "' + String(type) + '" listeners ' +
            'added. Use emitter.setMaxListeners() to ' +
            'increase limit.');
        w.name = 'MaxListenersExceededWarning';
        w.emitter = target;
        w.type = type;
        w.count = existing.length;
        if (typeof console === 'object' && console.warn) {
          console.warn('%s: %s', w.name, w.message);
        }
      }
    }
  }

  return target;
}

EventEmitter.prototype.addListener = function addListener(type, listener) {
  return _addListener(this, type, listener, false);
};

EventEmitter.prototype.on = EventEmitter.prototype.addListener;

EventEmitter.prototype.prependListener =
    function prependListener(type, listener) {
      return _addListener(this, type, listener, true);
    };

function onceWrapper() {
  if (!this.fired) {
    this.target.removeListener(this.type, this.wrapFn);
    this.fired = true;
    switch (arguments.length) {
      case 0:
        return this.listener.call(this.target);
      case 1:
        return this.listener.call(this.target, arguments[0]);
      case 2:
        return this.listener.call(this.target, arguments[0], arguments[1]);
      case 3:
        return this.listener.call(this.target, arguments[0], arguments[1],
            arguments[2]);
      default:
        var args = new Array(arguments.length);
        for (var i = 0; i < args.length; ++i)
          args[i] = arguments[i];
        this.listener.apply(this.target, args);
    }
  }
}

function _onceWrap(target, type, listener) {
  var state = { fired: false, wrapFn: undefined, target: target, type: type, listener: listener };
  var wrapped = bind.call(onceWrapper, state);
  wrapped.listener = listener;
  state.wrapFn = wrapped;
  return wrapped;
}

EventEmitter.prototype.once = function once(type, listener) {
  if (typeof listener !== 'function')
    throw new TypeError('"listener" argument must be a function');
  this.on(type, _onceWrap(this, type, listener));
  return this;
};

EventEmitter.prototype.prependOnceListener =
    function prependOnceListener(type, listener) {
      if (typeof listener !== 'function')
        throw new TypeError('"listener" argument must be a function');
      this.prependListener(type, _onceWrap(this, type, listener));
      return this;
    };

// Emits a 'removeListener' event if and only if the listener was removed.
EventEmitter.prototype.removeListener =
    function removeListener(type, listener) {
      var list, events, position, i, originalListener;

      if (typeof listener !== 'function')
        throw new TypeError('"listener" argument must be a function');

      events = this._events;
      if (!events)
        return this;

      list = events[type];
      if (!list)
        return this;

      if (list === listener || list.listener === listener) {
        if (--this._eventsCount === 0)
          this._events = objectCreate(null);
        else {
          delete events[type];
          if (events.removeListener)
            this.emit('removeListener', type, list.listener || listener);
        }
      } else if (typeof list !== 'function') {
        position = -1;

        for (i = list.length - 1; i >= 0; i--) {
          if (list[i] === listener || list[i].listener === listener) {
            originalListener = list[i].listener;
            position = i;
            break;
          }
        }

        if (position < 0)
          return this;

        if (position === 0)
          list.shift();
        else
          spliceOne(list, position);

        if (list.length === 1)
          events[type] = list[0];

        if (events.removeListener)
          this.emit('removeListener', type, originalListener || listener);
      }

      return this;
    };

EventEmitter.prototype.removeAllListeners =
    function removeAllListeners(type) {
      var listeners, events, i;

      events = this._events;
      if (!events)
        return this;

      // not listening for removeListener, no need to emit
      if (!events.removeListener) {
        if (arguments.length === 0) {
          this._events = objectCreate(null);
          this._eventsCount = 0;
        } else if (events[type]) {
          if (--this._eventsCount === 0)
            this._events = objectCreate(null);
          else
            delete events[type];
        }
        return this;
      }

      // emit removeListener for all listeners on all events
      if (arguments.length === 0) {
        var keys = objectKeys(events);
        var key;
        for (i = 0; i < keys.length; ++i) {
          key = keys[i];
          if (key === 'removeListener') continue;
          this.removeAllListeners(key);
        }
        this.removeAllListeners('removeListener');
        this._events = objectCreate(null);
        this._eventsCount = 0;
        return this;
      }

      listeners = events[type];

      if (typeof listeners === 'function') {
        this.removeListener(type, listeners);
      } else if (listeners) {
        // LIFO order
        for (i = listeners.length - 1; i >= 0; i--) {
          this.removeListener(type, listeners[i]);
        }
      }

      return this;
    };

function _listeners(target, type, unwrap) {
  var events = target._events;

  if (!events)
    return [];

  var evlistener = events[type];
  if (!evlistener)
    return [];

  if (typeof evlistener === 'function')
    return unwrap ? [evlistener.listener || evlistener] : [evlistener];

  return unwrap ? unwrapListeners(evlistener) : arrayClone(evlistener, evlistener.length);
}

EventEmitter.prototype.listeners = function listeners(type) {
  return _listeners(this, type, true);
};

EventEmitter.prototype.rawListeners = function rawListeners(type) {
  return _listeners(this, type, false);
};

EventEmitter.listenerCount = function(emitter, type) {
  if (typeof emitter.listenerCount === 'function') {
    return emitter.listenerCount(type);
  } else {
    return listenerCount.call(emitter, type);
  }
};

EventEmitter.prototype.listenerCount = listenerCount;
function listenerCount(type) {
  var events = this._events;

  if (events) {
    var evlistener = events[type];

    if (typeof evlistener === 'function') {
      return 1;
    } else if (evlistener) {
      return evlistener.length;
    }
  }

  return 0;
}

EventEmitter.prototype.eventNames = function eventNames() {
  return this._eventsCount > 0 ? Reflect.ownKeys(this._events) : [];
};

// About 1.5x faster than the two-arg version of Array#splice().
function spliceOne(list, index) {
  for (var i = index, k = i + 1, n = list.length; k < n; i += 1, k += 1)
    list[i] = list[k];
  list.pop();
}

function arrayClone(arr, n) {
  var copy = new Array(n);
  for (var i = 0; i < n; ++i)
    copy[i] = arr[i];
  return copy;
}

function unwrapListeners(arr) {
  var ret = new Array(arr.length);
  for (var i = 0; i < ret.length; ++i) {
    ret[i] = arr[i].listener || arr[i];
  }
  return ret;
}

function objectCreatePolyfill(proto) {
  var F = function() {};
  F.prototype = proto;
  return new F;
}
function objectKeysPolyfill(obj) {
  var keys = [];
  for (var k in obj) if (Object.prototype.hasOwnProperty.call(obj, k)) {
    keys.push(k);
  }
  return k;
}
function functionBindPolyfill(context) {
  var fn = this;
  return function () {
    return fn.apply(context, arguments);
  };
}

},{}],421:[function(_dereq_,module,exports){
/**
 * Convert array of 16 byte values to UUID string format of the form:
 * XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
 */
var byteToHex = [];
for (var i = 0; i < 256; ++i) {
  byteToHex[i] = (i + 0x100).toString(16).substr(1);
}

function bytesToUuid(buf, offset) {
  var i = offset || 0;
  var bth = byteToHex;
  // join used to fix memory issue caused by concatenation: https://bugs.chromium.org/p/v8/issues/detail?id=3175#c4
  return ([bth[buf[i++]], bth[buf[i++]], 
	bth[buf[i++]], bth[buf[i++]], '-',
	bth[buf[i++]], bth[buf[i++]], '-',
	bth[buf[i++]], bth[buf[i++]], '-',
	bth[buf[i++]], bth[buf[i++]], '-',
	bth[buf[i++]], bth[buf[i++]],
	bth[buf[i++]], bth[buf[i++]],
	bth[buf[i++]], bth[buf[i++]]]).join('');
}

module.exports = bytesToUuid;

},{}],422:[function(_dereq_,module,exports){
// Unique ID creation requires a high quality random # generator.  In the
// browser this is a little complicated due to unknown quality of Math.random()
// and inconsistent support for the `crypto` API.  We do the best we can via
// feature-detection

// getRandomValues needs to be invoked in a context where "this" is a Crypto
// implementation. Also, find the complete implementation of crypto on IE11.
var getRandomValues = (typeof(crypto) != 'undefined' && crypto.getRandomValues && crypto.getRandomValues.bind(crypto)) ||
                      (typeof(msCrypto) != 'undefined' && typeof window.msCrypto.getRandomValues == 'function' && msCrypto.getRandomValues.bind(msCrypto));

if (getRandomValues) {
  // WHATWG crypto RNG - http://wiki.whatwg.org/wiki/Crypto
  var rnds8 = new Uint8Array(16); // eslint-disable-line no-undef

  module.exports = function whatwgRNG() {
    getRandomValues(rnds8);
    return rnds8;
  };
} else {
  // Math.random()-based (RNG)
  //
  // If all else fails, use Math.random().  It's fast, but is of unspecified
  // quality.
  var rnds = new Array(16);

  module.exports = function mathRNG() {
    for (var i = 0, r; i < 16; i++) {
      if ((i & 0x03) === 0) r = Math.random() * 0x100000000;
      rnds[i] = r >>> ((i & 0x03) << 3) & 0xff;
    }

    return rnds;
  };
}

},{}],423:[function(_dereq_,module,exports){
var rng = _dereq_('./lib/rng');
var bytesToUuid = _dereq_('./lib/bytesToUuid');

function v4(options, buf, offset) {
  var i = buf && offset || 0;

  if (typeof(options) == 'string') {
    buf = options === 'binary' ? new Array(16) : null;
    options = null;
  }
  options = options || {};

  var rnds = options.random || (options.rng || rng)();

  // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`
  rnds[6] = (rnds[6] & 0x0f) | 0x40;
  rnds[8] = (rnds[8] & 0x3f) | 0x80;

  // Copy bytes to buffer, if provided
  if (buf) {
    for (var ii = 0; ii < 16; ++ii) {
      buf[i + ii] = rnds[ii];
    }
  }

  return buf || bytesToUuid(rnds);
}

module.exports = v4;

},{"./lib/bytesToUuid":421,"./lib/rng":422}]},{},[15])(15)
});
