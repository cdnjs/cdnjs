/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var Dropbox = __webpack_require__(8);

	module.exports = Dropbox;


/***/ },
/* 1 */
/***/ function(module, exports) {

	function getBaseURL(host) {
	  return 'https://' + host + '.dropboxapi.com/2/';
	}

	module.exports = getBaseURL;


/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = es6-promise;

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = superagent;

/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = superagent-proxy;

/***/ },
/* 5 */
/***/ function(module, exports) {

	// source https://www.dropboxforum.com/t5/API-support/HTTP-header-quot-Dropbox-API-Arg-quot-could-not-decode-input-as/m-p/173823/highlight/true#M6786
	var charsToEncode = /[\u007f-\uffff]/g;

	function httpHeaderSafeJson(args) {
	  return JSON.stringify(args).replace(charsToEncode, function (c) {
	    return '\\u' + ('000' + c.charCodeAt(0).toString(16)).slice(-4);
	  });
	}

	module.exports = httpHeaderSafeJson;


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	var request = __webpack_require__(3);
	var Promise = __webpack_require__(2).Promise;
	var getBaseURL = __webpack_require__(1);
	var httpHeaderSafeJson = __webpack_require__(5);

	__webpack_require__(4)(request);

	var buildCustomError;
	var downloadRequest;
	var nodeBinaryParser;

	// Register a handler that will instruct superagent how to parse the response
	request.parse['application/octect-stream'] = function (obj) {
	  return obj;
	};

	// This doesn't match what was spec'd in paper doc yet
	buildCustomError = function (error, response) {
	  return {
	    status: error.status,
	    error: (response ? response.text : null) || error.toString(),
	    response: response
	  };
	};

	nodeBinaryParser = function (res, done) {
	  res.text = '';
	  res.setEncoding('binary');
	  res.on('data', function (chunk) { res.text += chunk; });
	  res.on('end', function () {
	    done();
	  });
	};

	downloadRequest = function (path, args, auth, host, accessToken, selectUser, proxy) {
	  if (auth !== 'user') {
	    throw new Error('Unexpected auth type: ' + auth);
	  }

	  var promiseFunction = function (resolve, reject) {
	    var apiRequest;

	    function success(data) {
	      if (resolve) {
	        resolve(data);
	      }
	    }

	    function failure(error) {
	      if (reject) {
	        reject(error);
	      }
	    }

	    function responseHandler(error, response) {
	      var data;
	      if (error) {
	        failure(buildCustomError(error, response));
	      } else {
	        // In the browser, the file is passed as a blob and in node the file is
	        // passed as a string of binary data.
	        data = JSON.parse(response.headers['dropbox-api-result']);
	        if (response.xhr) {
	          data.fileBlob = response.xhr.response;
	        } else {
	          data.fileBinary = response.res.text;
	        }
	        success(data);
	      }
	    }

	    apiRequest = request.post(getBaseURL(host) + path)
	      .set('Authorization', 'Bearer ' + accessToken)
	      .set('Dropbox-API-Arg', httpHeaderSafeJson(args))
	      .on('request', function () {
	        if (this.xhr) {
	          this.xhr.responseType = 'blob';
	        }
	      });

	    if (selectUser) {
	      apiRequest = apiRequest.set('Dropbox-API-Select-User', selectUser);
	    }

	    if (proxy) {
	      apiRequest.proxy(proxy);
	    }

	    // Apply the node binary parser to the response if executing in node
	    if (typeof window === 'undefined') {
	      apiRequest
	        .buffer(true)
	        .parse(nodeBinaryParser)
	        .end(responseHandler);
	    } else {
	      apiRequest.end(responseHandler);
	    }
	  };

	  return new Promise(promiseFunction);
	};

	module.exports = downloadRequest;


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	var REQUEST_CONSTANTS = __webpack_require__(10);
	var DropboxBase;

	// Polyfill Object.assign() for older browsers
	__webpack_require__(9);

	/**
	 * @private
	 * @class DropboxBase
	 * @classdesc The main Dropbox SDK class. This contains the methods that are
	 * shared between Dropbox and DropboxTeam classes. It is marked as private so
	 * that it doesn't show up in the docs because it is never used directly.
	 * @arg {Object} options
	 * @arg {String} [options.accessToken] - An access token for making authenticated
	 * requests.
	 * @arg {String} [options.clientId] - The client id fo ryour app. Used to create
	 * authentication URL.
	 * @arg {Number} [options.selectUser] - User is the team access token would like
	 * to act as.
	 * @arg {String} [options.proxy] - URL to proxy all requests to.
	 */
	DropboxBase = function (options) {
	  options = options || {};
	  this.accessToken = options.accessToken;
	  this.clientId = options.clientId;
	  this.selectUser = options.selectUser;
	  this.proxy = options.proxy;
	};

	/**
	 * Set the access token used to authenticate requests to the API.
	 * @arg {String} accessToken - An access token
	 * @returns {undefined}
	 */
	DropboxBase.prototype.setAccessToken = function (accessToken) {
	  this.accessToken = accessToken;
	};

	/**
	 * Get the access token
	 * @returns {String} Access token
	 */
	DropboxBase.prototype.getAccessToken = function () {
	  return this.accessToken;
	};

	/**
	 * Set the client id, which is used to help gain an access token.
	 * @arg {String} clientId - Your apps client id
	 * @returns {undefined}
	 */
	DropboxBase.prototype.setClientId = function (clientId) {
	  this.clientId = clientId;
	};

	/**
	 * Get the client id
	 * @returns {String} Client id
	 */
	DropboxBase.prototype.getClientId = function () {
	  return this.clientId;
	};

	/**
	 * Set the proxy
	 * @arg {String} proxy - The proxy URL
	 * @returns {undefined}
	 */
	DropboxBase.prototype.setProxy = function (proxy) {
	  this.proxy = proxy;
	};

	/**
	 * Get the proxy
	 * @returns {String} The proxy URL
	 */
	DropboxBase.prototype.getProxy = function () {
	  return this.proxy;
	};


	/**
	 * Get a URL that can be used to authenticate users for the Dropbox API.
	 * @arg {String} redirectUri - A URL to redirect the user to after
	 * authenticating. This must be added to your app through the admin interface.
	 * @arg {String} [state] - State that will be returned in the redirect URL to help
	 * prevent cross site scripting attacks.
	 * @returns {String} Url to send user to for Dropbox API authentication
	 */
	DropboxBase.prototype.getAuthenticationUrl = function (redirectUri, state) {
	  var AUTH_BASE_URL = 'https://www.dropbox.com/oauth2/authorize';
	  var clientId = this.getClientId();
	  var authUrl;
	  if (!clientId) {
	    throw new Error('A client id is required. You can set the client id using .setClientId().');
	  }
	  if (!redirectUri) {
	    throw new Error('A redirect uri is required.');
	  }

	  authUrl = AUTH_BASE_URL + '?response_type=token&client_id=' + clientId;
	  if (redirectUri) {
	    authUrl = authUrl + '&redirect_uri=' + redirectUri;
	  }
	  if (state) {
	    authUrl = authUrl + '&state=' + state;
	  }
	  return authUrl;
	};

	/**
	 * Called when the authentication succeed
	 * @callback successCallback
	 * @param {string} access_token The application's access token
	 */

	/**
	 * Called when the authentication failed.
	 * @callback errorCallback
	 */

	/**
	 * An authentication process that works with cordova applications.
	 * @param {successCallback} successCallback
	 * @param {errorCallback} errorCallback 
	 */
	DropboxBase.prototype.authenticateWithCordova = function (successCallback, errorCallback)
	{
	  var redirect_url = 'https://www.dropbox.com/1/oauth2/redirect_receiver';
	  var url = this.getAuthenticationUrl(redirect_url);
	  var browser = window.open(url, '_blank');
	  var removed = false;

	  var onLoadError = function(event) {
	    // Try to avoid a browser crash on browser.close().
	    window.setTimeout(function() { browser.close() }, 10);
	    errorCallback();
	  }

	  var onLoadStop = function(event) {
	    var error_label = '&error=';
	    var error_index = event.url.indexOf(error_label);

	    if (error_index > -1) {
	      // Try to avoid a browser crash on browser.close().
	      window.setTimeout(function() { browser.close() }, 10);
	      errorCallback();
	    } else { 
	      var access_token_label = '#access_token=';
	      var access_token_index = event.url.indexOf(access_token_label);
	      var token_type_index = event.url.indexOf('&token_type=');
	      if (access_token_index > -1) {
	        access_token_index += access_token_label.length;
	        // Try to avoid a browser crash on browser.close().
	        window.setTimeout(function() { browser.close() }, 10);

	        var access_token = event.url.substring(access_token_index, token_type_index);
	        successCallback(access_token);
	      }
	    }
	  };

	  var onExit = function(event) {
	    if(removed) {
	      return 
	    }
	    browser.removeEventListener('loaderror', onLoadError);
	    browser.removeEventListener('loadstop', onLoadStop);
	    browser.removeEventListener('exit', onExit);
	    removed = true
	  };
	  
	  browser.addEventListener('loaderror', onLoadError);
	  browser.addEventListener('loadstop', onLoadStop);
	  browser.addEventListener('exit', onExit)
	}

	DropboxBase.prototype.request = function (path, args, auth, host, style) {
	  var request = null;
	  switch (style) {
	    case REQUEST_CONSTANTS.RPC:
	      request = this.getRpcRequest();
	      break;
	    case REQUEST_CONSTANTS.DOWNLOAD:
	      request = this.getDownloadRequest();
	      break;
	    case REQUEST_CONSTANTS.UPLOAD:
	      request = this.getUploadRequest();
	      break;
	    default:
	      throw new Error('Invalid request style: ' + style);
	  }

	  return request(path, args, auth, host, this.getAccessToken(), this.selectUser, this.proxy);
	};

	DropboxBase.prototype.setRpcRequest = function (newRpcRequest) {
	  DropboxBase.prototype.rpcRequest = newRpcRequest;
	};

	DropboxBase.prototype.getRpcRequest = function () {
	  if (DropboxBase.prototype.rpcRequest === undefined) {
	    DropboxBase.prototype.rpcRequest = __webpack_require__(12);
	  }

	  return DropboxBase.prototype.rpcRequest;
	};

	DropboxBase.prototype.setDownloadRequest = function (newDownloadRequest) {
	  DropboxBase.prototype.downloadRequest = newDownloadRequest;
	};

	DropboxBase.prototype.getDownloadRequest = function () {
	  if (DropboxBase.prototype.downloadRequest === undefined) {
	    DropboxBase.prototype.downloadRequest = __webpack_require__(6);
	  }

	  return DropboxBase.prototype.downloadRequest;
	};

	DropboxBase.prototype.setUploadRequest = function (newUploadRequest) {
	  DropboxBase.prototype.uploadRequest = newUploadRequest;
	};

	DropboxBase.prototype.getUploadRequest = function () {
	  if (DropboxBase.prototype.uploadRequest === undefined) {
	    DropboxBase.prototype.uploadRequest = __webpack_require__(13);
	  }

	  return DropboxBase.prototype.uploadRequest;
	};

	module.exports = DropboxBase;


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	var DropboxBase = __webpack_require__(7);
	var routes = __webpack_require__(11);
	var Dropbox;

	/**
	 * @class Dropbox
	 * @extends DropboxBase
	 * @classdesc The Dropbox SDK class that provides methods to read, write and
	 * create files or folders in a user's Dropbox.
	 * @arg {Object} options
	 * @arg {String} [options.accessToken] - An access token for making authenticated
	 * requests.
	 * @arg {String} [options.clientId] - The client id for your app. Used to create
	 * authentication URL.
	 * @arg {String} [options.selectUser] - Select user is only used by DropboxTeam.
	 * It specifies which user the team access token should be acting as.
	 */
	Dropbox = function (options) {
	  DropboxBase.call(this, options);
	};

	Dropbox.prototype = Object.create(DropboxBase.prototype);

	Dropbox.prototype.constructor = Dropbox;

	// Add the user endpoint methods to the prototype
	Dropbox.prototype = Object.assign(Dropbox.prototype, routes);

	Dropbox.prototype.filesGetSharedLinkFile = function (arg) {
	  return this.request('sharing/get_shared_link_file', arg, 'api', 'download');
	};

	module.exports = Dropbox;


/***/ },
/* 9 */
/***/ function(module, exports) {

	// Polyfill object.assign for legacy browsers
	// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign
	if (typeof Object.assign !== 'function') {
	  (function () {
	    Object.assign = function (target) {
	      'use strict';
	      var output;
	      var index;
	      var source;
	      var nextKey;
	      if (target === undefined || target === null) {
	        throw new TypeError('Cannot convert undefined or null to object');
	      }

	      output = Object(target);
	      for (index = 1; index < arguments.length; index++) {
	        source = arguments[index];
	        if (source !== undefined && source !== null) {
	          for (nextKey in source) {
	            if (source.hasOwnProperty(nextKey)) {
	              output[nextKey] = source[nextKey];
	            }
	          }
	        }
	      }
	      return output;
	    };
	  }());
	}


/***/ },
/* 10 */
/***/ function(module, exports) {

	var REQUEST_CONSTANTS = {
	  RPC: 'rpc',
	  DOWNLOAD: 'download',
	  UPLOAD: 'upload'
	};

	module.exports = REQUEST_CONSTANTS;


/***/ },
/* 11 */
/***/ function(module, exports) {

	// Auto-generated by Stone, do not modify.
	var routes = {};

	/**
	 * Creates an OAuth 2.0 access token from the supplied OAuth 1.0 access token.
	 * @function Dropbox#authTokenFromOauth1
	 * @arg {AuthTokenFromOAuth1Arg} arg - The request parameters.
	 * @returns {Promise.<AuthTokenFromOAuth1Result, Error.<AuthTokenFromOAuth1Error>>}
	 */
	routes.authTokenFromOauth1 = function (arg) {
	  return this.request('auth/token/from_oauth1', arg, 'app', 'api', 'rpc');
	};

	/**
	 * Disables the access token used to authenticate the call.
	 * @function Dropbox#authTokenRevoke
	 * @arg {void} arg - The request parameters.
	 * @returns {Promise.<void, Error.<void>>}
	 */
	routes.authTokenRevoke = function (arg) {
	  return this.request('auth/token/revoke', arg, 'user', 'api', 'rpc');
	};

	/**
	 * Add property groups to a Dropbox file. See templates/add_for_user or
	 * templates/add_for_team to create new templates.
	 * @function Dropbox#filePropertiesPropertiesAdd
	 * @arg {FilePropertiesAddPropertiesArg} arg - The request parameters.
	 * @returns {Promise.<void, Error.<FilePropertiesAddPropertiesError>>}
	 */
	routes.filePropertiesPropertiesAdd = function (arg) {
	  return this.request('file_properties/properties/add', arg, 'user', 'api', 'rpc');
	};

	/**
	 * Overwrite property groups associated with a file. This endpoint should be
	 * used instead of properties/update when property groups are being updated via
	 * a "snapshot" instead of via a "delta". In other words, this endpoint will
	 * delete all omitted fields from a property group, whereas properties/update
	 * will only delete fields that are explicitly marked for deletion.
	 * @function Dropbox#filePropertiesPropertiesOverwrite
	 * @arg {FilePropertiesOverwritePropertyGroupArg} arg - The request parameters.
	 * @returns {Promise.<void, Error.<FilePropertiesInvalidPropertyGroupError>>}
	 */
	routes.filePropertiesPropertiesOverwrite = function (arg) {
	  return this.request('file_properties/properties/overwrite', arg, 'user', 'api', 'rpc');
	};

	/**
	 * Remove the specified property group from the file. To remove specific
	 * property field key value pairs, see route properties/update. To update a
	 * template, see templates/update_for_user or templates/update_for_team.
	 * Templates can't be removed once created.
	 * @function Dropbox#filePropertiesPropertiesRemove
	 * @arg {FilePropertiesRemovePropertiesArg} arg - The request parameters.
	 * @returns {Promise.<void, Error.<FilePropertiesRemovePropertiesError>>}
	 */
	routes.filePropertiesPropertiesRemove = function (arg) {
	  return this.request('file_properties/properties/remove', arg, 'user', 'api', 'rpc');
	};

	/**
	 * Search across property templates for particular property field values.
	 * @function Dropbox#filePropertiesPropertiesSearch
	 * @arg {FilePropertiesPropertiesSearchArg} arg - The request parameters.
	 * @returns {Promise.<FilePropertiesPropertiesSearchResult, Error.<FilePropertiesPropertiesSearchError>>}
	 */
	routes.filePropertiesPropertiesSearch = function (arg) {
	  return this.request('file_properties/properties/search', arg, 'user', 'api', 'rpc');
	};

	/**
	 * Add, update or remove properties associated with the supplied file and
	 * templates. This endpoint should be used instead of properties/overwrite when
	 * property groups are being updated via a "delta" instead of via a "snapshot" .
	 * In other words, this endpoint will not delete any omitted fields from a
	 * property group, whereas properties/overwrite will delete any fields that are
	 * omitted from a property group.
	 * @function Dropbox#filePropertiesPropertiesUpdate
	 * @arg {FilePropertiesUpdatePropertiesArg} arg - The request parameters.
	 * @returns {Promise.<void, Error.<FilePropertiesUpdatePropertiesError>>}
	 */
	routes.filePropertiesPropertiesUpdate = function (arg) {
	  return this.request('file_properties/properties/update', arg, 'user', 'api', 'rpc');
	};

	/**
	 * Add a template associated with a team. See route properties/add to add
	 * properties to a file or folder.
	 * @function Dropbox#filePropertiesTemplatesAddForTeam
	 * @arg {FilePropertiesAddTemplateArg} arg - The request parameters.
	 * @returns {Promise.<FilePropertiesAddTemplateResult, Error.<FilePropertiesModifyTemplateError>>}
	 */
	routes.filePropertiesTemplatesAddForTeam = function (arg) {
	  return this.request('file_properties/templates/add_for_team', arg, 'team', 'api', 'rpc');
	};

	/**
	 * Add a template associated with a user. See route properties/add to add
	 * properties to a file.
	 * @function Dropbox#filePropertiesTemplatesAddForUser
	 * @arg {FilePropertiesAddTemplateArg} arg - The request parameters.
	 * @returns {Promise.<FilePropertiesAddTemplateResult, Error.<FilePropertiesModifyTemplateError>>}
	 */
	routes.filePropertiesTemplatesAddForUser = function (arg) {
	  return this.request('file_properties/templates/add_for_user', arg, 'user', 'api', 'rpc');
	};

	/**
	 * Get the schema for a specified template.
	 * @function Dropbox#filePropertiesTemplatesGetForTeam
	 * @arg {FilePropertiesGetTemplateArg} arg - The request parameters.
	 * @returns {Promise.<FilePropertiesGetTemplateResult, Error.<FilePropertiesTemplateError>>}
	 */
	routes.filePropertiesTemplatesGetForTeam = function (arg) {
	  return this.request('file_properties/templates/get_for_team', arg, 'team', 'api', 'rpc');
	};

	/**
	 * Get the schema for a specified template.
	 * @function Dropbox#filePropertiesTemplatesGetForUser
	 * @arg {FilePropertiesGetTemplateArg} arg - The request parameters.
	 * @returns {Promise.<FilePropertiesGetTemplateResult, Error.<FilePropertiesTemplateError>>}
	 */
	routes.filePropertiesTemplatesGetForUser = function (arg) {
	  return this.request('file_properties/templates/get_for_user', arg, 'user', 'api', 'rpc');
	};

	/**
	 * Get the template identifiers for a team. To get the schema of each template
	 * use templates/get_for_team.
	 * @function Dropbox#filePropertiesTemplatesListForTeam
	 * @arg {void} arg - The request parameters.
	 * @returns {Promise.<FilePropertiesListTemplateResult, Error.<FilePropertiesTemplateError>>}
	 */
	routes.filePropertiesTemplatesListForTeam = function (arg) {
	  return this.request('file_properties/templates/list_for_team', arg, 'team', 'api', 'rpc');
	};

	/**
	 * Get the template identifiers for a team. To get the schema of each template
	 * use templates/get_for_user.
	 * @function Dropbox#filePropertiesTemplatesListForUser
	 * @arg {void} arg - The request parameters.
	 * @returns {Promise.<FilePropertiesListTemplateResult, Error.<FilePropertiesTemplateError>>}
	 */
	routes.filePropertiesTemplatesListForUser = function (arg) {
	  return this.request('file_properties/templates/list_for_user', arg, 'user', 'api', 'rpc');
	};

	/**
	 * Update a template associated with a team. This route can update the template
	 * name, the template description and add optional properties to templates.
	 * @function Dropbox#filePropertiesTemplatesUpdateForTeam
	 * @arg {FilePropertiesUpdateTemplateArg} arg - The request parameters.
	 * @returns {Promise.<FilePropertiesUpdateTemplateResult, Error.<FilePropertiesModifyTemplateError>>}
	 */
	routes.filePropertiesTemplatesUpdateForTeam = function (arg) {
	  return this.request('file_properties/templates/update_for_team', arg, 'team', 'api', 'rpc');
	};

	/**
	 * Update a template associated with a user. This route can update the template
	 * name, the template description and add optional properties to templates.
	 * @function Dropbox#filePropertiesTemplatesUpdateForUser
	 * @arg {FilePropertiesUpdateTemplateArg} arg - The request parameters.
	 * @returns {Promise.<FilePropertiesUpdateTemplateResult, Error.<FilePropertiesModifyTemplateError>>}
	 */
	routes.filePropertiesTemplatesUpdateForUser = function (arg) {
	  return this.request('file_properties/templates/update_for_user', arg, 'user', 'api', 'rpc');
	};

	/**
	 * Creates a file request for this user.
	 * @function Dropbox#fileRequestsCreate
	 * @arg {FileRequestsCreateFileRequestArgs} arg - The request parameters.
	 * @returns {Promise.<FileRequestsFileRequest, Error.<FileRequestsCreateFileRequestError>>}
	 */
	routes.fileRequestsCreate = function (arg) {
	  return this.request('file_requests/create', arg, 'user', 'api', 'rpc');
	};

	/**
	 * Returns the specified file request.
	 * @function Dropbox#fileRequestsGet
	 * @arg {FileRequestsGetFileRequestArgs} arg - The request parameters.
	 * @returns {Promise.<FileRequestsFileRequest, Error.<FileRequestsGetFileRequestError>>}
	 */
	routes.fileRequestsGet = function (arg) {
	  return this.request('file_requests/get', arg, 'user', 'api', 'rpc');
	};

	/**
	 * Returns a list of file requests owned by this user. For apps with the app
	 * folder permission, this will only return file requests with destinations in
	 * the app folder.
	 * @function Dropbox#fileRequestsList
	 * @arg {void} arg - The request parameters.
	 * @returns {Promise.<FileRequestsListFileRequestsResult, Error.<FileRequestsListFileRequestsError>>}
	 */
	routes.fileRequestsList = function (arg) {
	  return this.request('file_requests/list', arg, 'user', 'api', 'rpc');
	};

	/**
	 * Update a file request.
	 * @function Dropbox#fileRequestsUpdate
	 * @arg {FileRequestsUpdateFileRequestArgs} arg - The request parameters.
	 * @returns {Promise.<FileRequestsFileRequest, Error.<FileRequestsUpdateFileRequestError>>}
	 */
	routes.fileRequestsUpdate = function (arg) {
	  return this.request('file_requests/update', arg, 'user', 'api', 'rpc');
	};

	/**
	 * Returns the metadata for a file or folder. This is an alpha endpoint
	 * compatible with the properties API. Note: Metadata for the root folder is
	 * unsupported.
	 * @function Dropbox#filesAlphaGetMetadata
	 * @arg {FilesAlphaGetMetadataArg} arg - The request parameters.
	 * @returns {Promise.<(FilesFileMetadata|FilesFolderMetadata|FilesDeletedMetadata), Error.<FilesAlphaGetMetadataError>>}
	 */
	routes.filesAlphaGetMetadata = function (arg) {
	  return this.request('files/alpha/get_metadata', arg, 'user', 'api', 'rpc');
	};

	/**
	 * Create a new file with the contents provided in the request. Note that this
	 * endpoint is part of the properties API alpha and is slightly different from
	 * upload. Do not use this to upload a file larger than 150 MB. Instead, create
	 * an upload session with upload_session/start.
	 * @function Dropbox#filesAlphaUpload
	 * @arg {FilesCommitInfoWithProperties} arg - The request parameters.
	 * @returns {Promise.<FilesFileMetadata, Error.<FilesUploadErrorWithProperties>>}
	 */
	routes.filesAlphaUpload = function (arg) {
	  return this.request('files/alpha/upload', arg, 'user', 'content', 'upload');
	};

	/**
	 * Copy a file or folder to a different location in the user's Dropbox. If the
	 * source path is a folder all its contents will be copied.
	 * @function Dropbox#filesCopy
	 * @deprecated
	 * @arg {FilesRelocationArg} arg - The request parameters.
	 * @returns {Promise.<(FilesFileMetadata|FilesFolderMetadata|FilesDeletedMetadata), Error.<FilesRelocationError>>}
	 */
	routes.filesCopy = function (arg) {
	  return this.request('files/copy', arg, 'user', 'api', 'rpc');
	};

	/**
	 * Copy multiple files or folders to different locations at once in the user's
	 * Dropbox. If RelocationBatchArg.allow_shared_folder is false, this route is
	 * atomic. If on entry failes, the whole transaction will abort. If
	 * RelocationBatchArg.allow_shared_folder is true, not atomicity is guaranteed,
	 * but you will be able to copy the contents of shared folders to new locations.
	 * This route will return job ID immediately and do the async copy job in
	 * background. Please use copy_batch/check to check the job status.
	 * @function Dropbox#filesCopyBatch
	 * @arg {FilesRelocationBatchArg} arg - The request parameters.
	 * @returns {Promise.<FilesRelocationBatchLaunch, Error.<void>>}
	 */
	routes.filesCopyBatch = function (arg) {
	  return this.request('files/copy_batch', arg, 'user', 'api', 'rpc');
	};

	/**
	 * Returns the status of an asynchronous job for copy_batch. If success, it
	 * returns list of results for each entry.
	 * @function Dropbox#filesCopyBatchCheck
	 * @arg {AsyncPollArg} arg - The request parameters.
	 * @returns {Promise.<FilesRelocationBatchJobStatus, Error.<AsyncPollError>>}
	 */
	routes.filesCopyBatchCheck = function (arg) {
	  return this.request('files/copy_batch/check', arg, 'user', 'api', 'rpc');
	};

	/**
	 * Get a copy reference to a file or folder. This reference string can be used
	 * to save that file or folder to another user's Dropbox by passing it to
	 * copy_reference/save.
	 * @function Dropbox#filesCopyReferenceGet
	 * @arg {FilesGetCopyReferenceArg} arg - The request parameters.
	 * @returns {Promise.<FilesGetCopyReferenceResult, Error.<FilesGetCopyReferenceError>>}
	 */
	routes.filesCopyReferenceGet = function (arg) {
	  return this.request('files/copy_reference/get', arg, 'user', 'api', 'rpc');
	};

	/**
	 * Save a copy reference returned by copy_reference/get to the user's Dropbox.
	 * @function Dropbox#filesCopyReferenceSave
	 * @arg {FilesSaveCopyReferenceArg} arg - The request parameters.
	 * @returns {Promise.<FilesSaveCopyReferenceResult, Error.<FilesSaveCopyReferenceError>>}
	 */
	routes.filesCopyReferenceSave = function (arg) {
	  return this.request('files/copy_reference/save', arg, 'user', 'api', 'rpc');
	};

	/**
	 * Copy a file or folder to a different location in the user's Dropbox. If the
	 * source path is a folder all its contents will be copied.
	 * @function Dropbox#filesCopyV2
	 * @arg {FilesRelocationArg} arg - The request parameters.
	 * @returns {Promise.<FilesRelocationResult, Error.<FilesRelocationError>>}
	 */
	routes.filesCopyV2 = function (arg) {
	  return this.request('files/copy_v2', arg, 'user', 'api', 'rpc');
	};

	/**
	 * Create a folder at a given path.
	 * @function Dropbox#filesCreateFolder
	 * @deprecated
	 * @arg {FilesCreateFolderArg} arg - The request parameters.
	 * @returns {Promise.<FilesFolderMetadata, Error.<FilesCreateFolderError>>}
	 */
	routes.filesCreateFolder = function (arg) {
	  return this.request('files/create_folder', arg, 'user', 'api', 'rpc');
	};

	/**
	 * Create a folder at a given path.
	 * @function Dropbox#filesCreateFolderV2
	 * @arg {FilesCreateFolderArg} arg - The request parameters.
	 * @returns {Promise.<FilesCreateFolderResult, Error.<FilesCreateFolderError>>}
	 */
	routes.filesCreateFolderV2 = function (arg) {
	  return this.request('files/create_folder_v2', arg, 'user', 'api', 'rpc');
	};

	/**
	 * Delete the file or folder at a given path. If the path is a folder, all its
	 * contents will be deleted too. A successful response indicates that the file
	 * or folder was deleted. The returned metadata will be the corresponding
	 * FileMetadata or FolderMetadata for the item at time of deletion, and not a
	 * DeletedMetadata object.
	 * @function Dropbox#filesDelete
	 * @deprecated
	 * @arg {FilesDeleteArg} arg - The request parameters.
	 * @returns {Promise.<(FilesFileMetadata|FilesFolderMetadata|FilesDeletedMetadata), Error.<FilesDeleteError>>}
	 */
	routes.filesDelete = function (arg) {
	  return this.request('files/delete', arg, 'user', 'api', 'rpc');
	};

	/**
	 * Delete multiple files/folders at once. This route is asynchronous, which
	 * returns a job ID immediately and runs the delete batch asynchronously. Use
	 * delete_batch/check to check the job status.
	 * @function Dropbox#filesDeleteBatch
	 * @arg {FilesDeleteBatchArg} arg - The request parameters.
	 * @returns {Promise.<FilesDeleteBatchLaunch, Error.<void>>}
	 */
	routes.filesDeleteBatch = function (arg) {
	  return this.request('files/delete_batch', arg, 'user', 'api', 'rpc');
	};

	/**
	 * Returns the status of an asynchronous job for delete_batch. If success, it
	 * returns list of result for each entry.
	 * @function Dropbox#filesDeleteBatchCheck
	 * @arg {AsyncPollArg} arg - The request parameters.
	 * @returns {Promise.<FilesDeleteBatchJobStatus, Error.<AsyncPollError>>}
	 */
	routes.filesDeleteBatchCheck = function (arg) {
	  return this.request('files/delete_batch/check', arg, 'user', 'api', 'rpc');
	};

	/**
	 * Delete the file or folder at a given path. If the path is a folder, all its
	 * contents will be deleted too. A successful response indicates that the file
	 * or folder was deleted. The returned metadata will be the corresponding
	 * FileMetadata or FolderMetadata for the item at time of deletion, and not a
	 * DeletedMetadata object.
	 * @function Dropbox#filesDeleteV2
	 * @arg {FilesDeleteArg} arg - The request parameters.
	 * @returns {Promise.<FilesDeleteResult, Error.<FilesDeleteError>>}
	 */
	routes.filesDeleteV2 = function (arg) {
	  return this.request('files/delete_v2', arg, 'user', 'api', 'rpc');
	};

	/**
	 * Download a file from a user's Dropbox.
	 * @function Dropbox#filesDownload
	 * @arg {FilesDownloadArg} arg - The request parameters.
	 * @returns {Promise.<FilesFileMetadata, Error.<FilesDownloadError>>}
	 */
	routes.filesDownload = function (arg) {
	  return this.request('files/download', arg, 'user', 'content', 'download');
	};

	/**
	 * Returns the metadata for a file or folder. Note: Metadata for the root folder
	 * is unsupported.
	 * @function Dropbox#filesGetMetadata
	 * @arg {FilesGetMetadataArg} arg - The request parameters.
	 * @returns {Promise.<(FilesFileMetadata|FilesFolderMetadata|FilesDeletedMetadata), Error.<FilesGetMetadataError>>}
	 */
	routes.filesGetMetadata = function (arg) {
	  return this.request('files/get_metadata', arg, 'user', 'api', 'rpc');
	};

	/**
	 * Get a preview for a file. Currently, PDF previews are generated for files
	 * with the following extensions: .ai, .doc, .docm, .docx, .eps, .odp, .odt,
	 * .pps, .ppsm, .ppsx, .ppt, .pptm, .pptx, .rtf. HTML previews are generated for
	 * files with the following extensions: .csv, .ods, .xls, .xlsm, .xlsx. Other
	 * formats will return an unsupported extension error.
	 * @function Dropbox#filesGetPreview
	 * @arg {FilesPreviewArg} arg - The request parameters.
	 * @returns {Promise.<FilesFileMetadata, Error.<FilesPreviewError>>}
	 */
	routes.filesGetPreview = function (arg) {
	  return this.request('files/get_preview', arg, 'user', 'content', 'download');
	};

	/**
	 * Get a temporary link to stream content of a file. This link will expire in
	 * four hours and afterwards you will get 410 Gone. Content-Type of the link is
	 * determined automatically by the file's mime type.
	 * @function Dropbox#filesGetTemporaryLink
	 * @arg {FilesGetTemporaryLinkArg} arg - The request parameters.
	 * @returns {Promise.<FilesGetTemporaryLinkResult, Error.<FilesGetTemporaryLinkError>>}
	 */
	routes.filesGetTemporaryLink = function (arg) {
	  return this.request('files/get_temporary_link', arg, 'user', 'api', 'rpc');
	};

	/**
	 * Get a thumbnail for an image. This method currently supports files with the
	 * following file extensions: jpg, jpeg, png, tiff, tif, gif and bmp. Photos
	 * that are larger than 20MB in size won't be converted to a thumbnail.
	 * @function Dropbox#filesGetThumbnail
	 * @arg {FilesThumbnailArg} arg - The request parameters.
	 * @returns {Promise.<FilesFileMetadata, Error.<FilesThumbnailError>>}
	 */
	routes.filesGetThumbnail = function (arg) {
	  return this.request('files/get_thumbnail', arg, 'user', 'content', 'download');
	};

	/**
	 * Get thumbnails for a list of images. We allow up to 25 thumbnails in a single
	 * batch. This method currently supports files with the following file
	 * extensions: jpg, jpeg, png, tiff, tif, gif and bmp. Photos that are larger
	 * than 20MB in size won't be converted to a thumbnail.
	 * @function Dropbox#filesGetThumbnailBatch
	 * @arg {FilesGetThumbnailBatchArg} arg - The request parameters.
	 * @returns {Promise.<FilesGetThumbnailBatchResult, Error.<FilesGetThumbnailBatchError>>}
	 */
	routes.filesGetThumbnailBatch = function (arg) {
	  return this.request('files/get_thumbnail_batch', arg, 'user', 'content', 'rpc');
	};

	/**
	 * Starts returning the contents of a folder. If the result's
	 * ListFolderResult.has_more field is true, call list_folder/continue with the
	 * returned ListFolderResult.cursor to retrieve more entries. If you're using
	 * ListFolderArg.recursive set to true to keep a local cache of the contents of
	 * a Dropbox account, iterate through each entry in order and process them as
	 * follows to keep your local state in sync: For each FileMetadata, store the
	 * new entry at the given path in your local state. If the required parent
	 * folders don't exist yet, create them. If there's already something else at
	 * the given path, replace it and remove all its children. For each
	 * FolderMetadata, store the new entry at the given path in your local state. If
	 * the required parent folders don't exist yet, create them. If there's already
	 * something else at the given path, replace it but leave the children as they
	 * are. Check the new entry's FolderSharingInfo.read_only and set all its
	 * children's read-only statuses to match. For each DeletedMetadata, if your
	 * local state has something at the given path, remove it and all its children.
	 * If there's nothing at the given path, ignore this entry. Note:
	 * auth.RateLimitError may be returned if multiple list_folder or
	 * list_folder/continue calls with same parameters are made simultaneously by
	 * same API app for same user. If your app implements retry logic, please hold
	 * off the retry until the previous request finishes.
	 * @function Dropbox#filesListFolder
	 * @arg {FilesListFolderArg} arg - The request parameters.
	 * @returns {Promise.<FilesListFolderResult, Error.<FilesListFolderError>>}
	 */
	routes.filesListFolder = function (arg) {
	  return this.request('files/list_folder', arg, 'user', 'api', 'rpc');
	};

	/**
	 * Once a cursor has been retrieved from list_folder, use this to paginate
	 * through all files and retrieve updates to the folder, following the same
	 * rules as documented for list_folder.
	 * @function Dropbox#filesListFolderContinue
	 * @arg {FilesListFolderContinueArg} arg - The request parameters.
	 * @returns {Promise.<FilesListFolderResult, Error.<FilesListFolderContinueError>>}
	 */
	routes.filesListFolderContinue = function (arg) {
	  return this.request('files/list_folder/continue', arg, 'user', 'api', 'rpc');
	};

	/**
	 * A way to quickly get a cursor for the folder's state. Unlike list_folder,
	 * list_folder/get_latest_cursor doesn't return any entries. This endpoint is
	 * for app which only needs to know about new files and modifications and
	 * doesn't need to know about files that already exist in Dropbox.
	 * @function Dropbox#filesListFolderGetLatestCursor
	 * @arg {FilesListFolderArg} arg - The request parameters.
	 * @returns {Promise.<FilesListFolderGetLatestCursorResult, Error.<FilesListFolderError>>}
	 */
	routes.filesListFolderGetLatestCursor = function (arg) {
	  return this.request('files/list_folder/get_latest_cursor', arg, 'user', 'api', 'rpc');
	};

	/**
	 * A longpoll endpoint to wait for changes on an account. In conjunction with
	 * list_folder/continue, this call gives you a low-latency way to monitor an
	 * account for file changes. The connection will block until there are changes
	 * available or a timeout occurs. This endpoint is useful mostly for client-side
	 * apps. If you're looking for server-side notifications, check out our webhooks
	 * documentation https://www.dropbox.com/developers/reference/webhooks.
	 * @function Dropbox#filesListFolderLongpoll
	 * @arg {FilesListFolderLongpollArg} arg - The request parameters.
	 * @returns {Promise.<FilesListFolderLongpollResult, Error.<FilesListFolderLongpollError>>}
	 */
	routes.filesListFolderLongpoll = function (arg) {
	  return this.request('files/list_folder/longpoll', arg, 'noauth', 'notify', 'rpc');
	};

	/**
	 * Return revisions of a file.
	 * @function Dropbox#filesListRevisions
	 * @arg {FilesListRevisionsArg} arg - The request parameters.
	 * @returns {Promise.<FilesListRevisionsResult, Error.<FilesListRevisionsError>>}
	 */
	routes.filesListRevisions = function (arg) {
	  return this.request('files/list_revisions', arg, 'user', 'api', 'rpc');
	};

	/**
	 * Move a file or folder to a different location in the user's Dropbox. If the
	 * source path is a folder all its contents will be moved.
	 * @function Dropbox#filesMove
	 * @deprecated
	 * @arg {FilesRelocationArg} arg - The request parameters.
	 * @returns {Promise.<(FilesFileMetadata|FilesFolderMetadata|FilesDeletedMetadata), Error.<FilesRelocationError>>}
	 */
	routes.filesMove = function (arg) {
	  return this.request('files/move', arg, 'user', 'api', 'rpc');
	};

	/**
	 * Move multiple files or folders to different locations at once in the user's
	 * Dropbox. This route is 'all or nothing', which means if one entry fails, the
	 * whole transaction will abort. This route will return job ID immediately and
	 * do the async moving job in background. Please use move_batch/check to check
	 * the job status.
	 * @function Dropbox#filesMoveBatch
	 * @arg {FilesRelocationBatchArg} arg - The request parameters.
	 * @returns {Promise.<FilesRelocationBatchLaunch, Error.<void>>}
	 */
	routes.filesMoveBatch = function (arg) {
	  return this.request('files/move_batch', arg, 'user', 'api', 'rpc');
	};

	/**
	 * Returns the status of an asynchronous job for move_batch. If success, it
	 * returns list of results for each entry.
	 * @function Dropbox#filesMoveBatchCheck
	 * @arg {AsyncPollArg} arg - The request parameters.
	 * @returns {Promise.<FilesRelocationBatchJobStatus, Error.<AsyncPollError>>}
	 */
	routes.filesMoveBatchCheck = function (arg) {
	  return this.request('files/move_batch/check', arg, 'user', 'api', 'rpc');
	};

	/**
	 * Move a file or folder to a different location in the user's Dropbox. If the
	 * source path is a folder all its contents will be moved.
	 * @function Dropbox#filesMoveV2
	 * @arg {FilesRelocationArg} arg - The request parameters.
	 * @returns {Promise.<FilesRelocationResult, Error.<FilesRelocationError>>}
	 */
	routes.filesMoveV2 = function (arg) {
	  return this.request('files/move_v2', arg, 'user', 'api', 'rpc');
	};

	/**
	 * Permanently delete the file or folder at a given path (see
	 * https://www.dropbox.com/en/help/40). Note: This endpoint is only available
	 * for Dropbox Business apps.
	 * @function Dropbox#filesPermanentlyDelete
	 * @arg {FilesDeleteArg} arg - The request parameters.
	 * @returns {Promise.<void, Error.<FilesDeleteError>>}
	 */
	routes.filesPermanentlyDelete = function (arg) {
	  return this.request('files/permanently_delete', arg, 'user', 'api', 'rpc');
	};

	/**
	 * @function Dropbox#filesPropertiesAdd
	 * @deprecated
	 * @arg {FilePropertiesAddPropertiesArg} arg - The request parameters.
	 * @returns {Promise.<void, Error.<FilePropertiesAddPropertiesError>>}
	 */
	routes.filesPropertiesAdd = function (arg) {
	  return this.request('files/properties/add', arg, 'user', 'api', 'rpc');
	};

	/**
	 * @function Dropbox#filesPropertiesOverwrite
	 * @deprecated
	 * @arg {FilePropertiesOverwritePropertyGroupArg} arg - The request parameters.
	 * @returns {Promise.<void, Error.<FilePropertiesInvalidPropertyGroupError>>}
	 */
	routes.filesPropertiesOverwrite = function (arg) {
	  return this.request('files/properties/overwrite', arg, 'user', 'api', 'rpc');
	};

	/**
	 * @function Dropbox#filesPropertiesRemove
	 * @deprecated
	 * @arg {FilePropertiesRemovePropertiesArg} arg - The request parameters.
	 * @returns {Promise.<void, Error.<FilePropertiesRemovePropertiesError>>}
	 */
	routes.filesPropertiesRemove = function (arg) {
	  return this.request('files/properties/remove', arg, 'user', 'api', 'rpc');
	};

	/**
	 * @function Dropbox#filesPropertiesTemplateGet
	 * @deprecated
	 * @arg {FilePropertiesGetTemplateArg} arg - The request parameters.
	 * @returns {Promise.<FilePropertiesGetTemplateResult, Error.<FilePropertiesTemplateError>>}
	 */
	routes.filesPropertiesTemplateGet = function (arg) {
	  return this.request('files/properties/template/get', arg, 'user', 'api', 'rpc');
	};

	/**
	 * @function Dropbox#filesPropertiesTemplateList
	 * @deprecated
	 * @arg {void} arg - The request parameters.
	 * @returns {Promise.<FilePropertiesListTemplateResult, Error.<FilePropertiesTemplateError>>}
	 */
	routes.filesPropertiesTemplateList = function (arg) {
	  return this.request('files/properties/template/list', arg, 'user', 'api', 'rpc');
	};

	/**
	 * @function Dropbox#filesPropertiesUpdate
	 * @deprecated
	 * @arg {FilePropertiesUpdatePropertiesArg} arg - The request parameters.
	 * @returns {Promise.<void, Error.<FilePropertiesUpdatePropertiesError>>}
	 */
	routes.filesPropertiesUpdate = function (arg) {
	  return this.request('files/properties/update', arg, 'user', 'api', 'rpc');
	};

	/**
	 * Restore a file to a specific revision.
	 * @function Dropbox#filesRestore
	 * @arg {FilesRestoreArg} arg - The request parameters.
	 * @returns {Promise.<FilesFileMetadata, Error.<FilesRestoreError>>}
	 */
	routes.filesRestore = function (arg) {
	  return this.request('files/restore', arg, 'user', 'api', 'rpc');
	};

	/**
	 * Save a specified URL into a file in user's Dropbox. If the given path already
	 * exists, the file will be renamed to avoid the conflict (e.g. myfile (1).txt).
	 * @function Dropbox#filesSaveUrl
	 * @arg {FilesSaveUrlArg} arg - The request parameters.
	 * @returns {Promise.<FilesSaveUrlResult, Error.<FilesSaveUrlError>>}
	 */
	routes.filesSaveUrl = function (arg) {
	  return this.request('files/save_url', arg, 'user', 'api', 'rpc');
	};

	/**
	 * Check the status of a save_url job.
	 * @function Dropbox#filesSaveUrlCheckJobStatus
	 * @arg {AsyncPollArg} arg - The request parameters.
	 * @returns {Promise.<FilesSaveUrlJobStatus, Error.<AsyncPollError>>}
	 */
	routes.filesSaveUrlCheckJobStatus = function (arg) {
	  return this.request('files/save_url/check_job_status', arg, 'user', 'api', 'rpc');
	};

	/**
	 * Searches for files and folders. Note: Recent changes may not immediately be
	 * reflected in search results due to a short delay in indexing.
	 * @function Dropbox#filesSearch
	 * @arg {FilesSearchArg} arg - The request parameters.
	 * @returns {Promise.<FilesSearchResult, Error.<FilesSearchError>>}
	 */
	routes.filesSearch = function (arg) {
	  return this.request('files/search', arg, 'user', 'api', 'rpc');
	};

	/**
	 * Create a new file with the contents provided in the request. Do not use this
	 * to upload a file larger than 150 MB. Instead, create an upload session with
	 * upload_session/start.
	 * @function Dropbox#filesUpload
	 * @arg {FilesCommitInfo} arg - The request parameters.
	 * @returns {Promise.<FilesFileMetadata, Error.<FilesUploadError>>}
	 */
	routes.filesUpload = function (arg) {
	  return this.request('files/upload', arg, 'user', 'content', 'upload');
	};

	/**
	 * Append more data to an upload session. A single request should not upload
	 * more than 150 MB.
	 * @function Dropbox#filesUploadSessionAppend
	 * @deprecated
	 * @arg {FilesUploadSessionCursor} arg - The request parameters.
	 * @returns {Promise.<void, Error.<FilesUploadSessionLookupError>>}
	 */
	routes.filesUploadSessionAppend = function (arg) {
	  return this.request('files/upload_session/append', arg, 'user', 'content', 'upload');
	};

	/**
	 * Append more data to an upload session. When the parameter close is set, this
	 * call will close the session. A single request should not upload more than 150
	 * MB.
	 * @function Dropbox#filesUploadSessionAppendV2
	 * @arg {FilesUploadSessionAppendArg} arg - The request parameters.
	 * @returns {Promise.<void, Error.<FilesUploadSessionLookupError>>}
	 */
	routes.filesUploadSessionAppendV2 = function (arg) {
	  return this.request('files/upload_session/append_v2', arg, 'user', 'content', 'upload');
	};

	/**
	 * Finish an upload session and save the uploaded data to the given file path. A
	 * single request should not upload more than 150 MB.
	 * @function Dropbox#filesUploadSessionFinish
	 * @arg {FilesUploadSessionFinishArg} arg - The request parameters.
	 * @returns {Promise.<FilesFileMetadata, Error.<FilesUploadSessionFinishError>>}
	 */
	routes.filesUploadSessionFinish = function (arg) {
	  return this.request('files/upload_session/finish', arg, 'user', 'content', 'upload');
	};

	/**
	 * This route helps you commit many files at once into a user's Dropbox. Use
	 * upload_session/start and upload_session/append_v2 to upload file contents. We
	 * recommend uploading many files in parallel to increase throughput. Once the
	 * file contents have been uploaded, rather than calling upload_session/finish,
	 * use this route to finish all your upload sessions in a single request.
	 * UploadSessionStartArg.close or UploadSessionAppendArg.close needs to be true
	 * for the last upload_session/start or upload_session/append_v2 call. This
	 * route will return a job_id immediately and do the async commit job in
	 * background. Use upload_session/finish_batch/check to check the job status.
	 * For the same account, this route should be executed serially. That means you
	 * should not start the next job before current job finishes. We allow up to
	 * 1000 entries in a single request.
	 * @function Dropbox#filesUploadSessionFinishBatch
	 * @arg {FilesUploadSessionFinishBatchArg} arg - The request parameters.
	 * @returns {Promise.<FilesUploadSessionFinishBatchLaunch, Error.<void>>}
	 */
	routes.filesUploadSessionFinishBatch = function (arg) {
	  return this.request('files/upload_session/finish_batch', arg, 'user', 'api', 'rpc');
	};

	/**
	 * Returns the status of an asynchronous job for upload_session/finish_batch. If
	 * success, it returns list of result for each entry.
	 * @function Dropbox#filesUploadSessionFinishBatchCheck
	 * @arg {AsyncPollArg} arg - The request parameters.
	 * @returns {Promise.<FilesUploadSessionFinishBatchJobStatus, Error.<AsyncPollError>>}
	 */
	routes.filesUploadSessionFinishBatchCheck = function (arg) {
	  return this.request('files/upload_session/finish_batch/check', arg, 'user', 'api', 'rpc');
	};

	/**
	 * Upload sessions allow you to upload a single file in one or more requests,
	 * for example where the size of the file is greater than 150 MB.  This call
	 * starts a new upload session with the given data. You can then use
	 * upload_session/append_v2 to add more data and upload_session/finish to save
	 * all the data to a file in Dropbox. A single request should not upload more
	 * than 150 MB. An upload session can be used for a maximum of 48 hours.
	 * Attempting to use an UploadSessionStartResult.session_id with
	 * upload_session/append_v2 or upload_session/finish more than 48 hours after
	 * its creation will return a UploadSessionLookupError.not_found.
	 * @function Dropbox#filesUploadSessionStart
	 * @arg {FilesUploadSessionStartArg} arg - The request parameters.
	 * @returns {Promise.<FilesUploadSessionStartResult, Error.<void>>}
	 */
	routes.filesUploadSessionStart = function (arg) {
	  return this.request('files/upload_session/start', arg, 'user', 'content', 'upload');
	};

	/**
	 * Marks the given Paper doc as archived. Note: This action can be performed or
	 * undone by anyone with edit permissions to the doc.
	 * @function Dropbox#paperDocsArchive
	 * @arg {PaperRefPaperDoc} arg - The request parameters.
	 * @returns {Promise.<void, Error.<PaperDocLookupError>>}
	 */
	routes.paperDocsArchive = function (arg) {
	  return this.request('paper/docs/archive', arg, 'user', 'api', 'rpc');
	};

	/**
	 * Creates a new Paper doc with the provided content.
	 * @function Dropbox#paperDocsCreate
	 * @arg {PaperPaperDocCreateArgs} arg - The request parameters.
	 * @returns {Promise.<PaperPaperDocCreateUpdateResult, Error.<PaperPaperDocCreateError>>}
	 */
	routes.paperDocsCreate = function (arg) {
	  return this.request('paper/docs/create', arg, 'user', 'api', 'upload');
	};

	/**
	 * Exports and downloads Paper doc either as HTML or markdown.
	 * @function Dropbox#paperDocsDownload
	 * @arg {PaperPaperDocExport} arg - The request parameters.
	 * @returns {Promise.<PaperPaperDocExportResult, Error.<PaperDocLookupError>>}
	 */
	routes.paperDocsDownload = function (arg) {
	  return this.request('paper/docs/download', arg, 'user', 'api', 'download');
	};

	/**
	 * Lists the users who are explicitly invited to the Paper folder in which the
	 * Paper doc is contained. For private folders all users (including owner)
	 * shared on the folder are listed and for team folders all non-team users
	 * shared on the folder are returned.
	 * @function Dropbox#paperDocsFolderUsersList
	 * @arg {PaperListUsersOnFolderArgs} arg - The request parameters.
	 * @returns {Promise.<PaperListUsersOnFolderResponse, Error.<PaperDocLookupError>>}
	 */
	routes.paperDocsFolderUsersList = function (arg) {
	  return this.request('paper/docs/folder_users/list', arg, 'user', 'api', 'rpc');
	};

	/**
	 * Once a cursor has been retrieved from docs/folder_users/list, use this to
	 * paginate through all users on the Paper folder.
	 * @function Dropbox#paperDocsFolderUsersListContinue
	 * @arg {PaperListUsersOnFolderContinueArgs} arg - The request parameters.
	 * @returns {Promise.<PaperListUsersOnFolderResponse, Error.<PaperListUsersCursorError>>}
	 */
	routes.paperDocsFolderUsersListContinue = function (arg) {
	  return this.request('paper/docs/folder_users/list/continue', arg, 'user', 'api', 'rpc');
	};

	/**
	 * Retrieves folder information for the given Paper doc. This includes:   -
	 * folder sharing policy; permissions for subfolders are set by the top-level
	 * folder.   - full 'filepath', i.e. the list of folders (both folderId and
	 * folderName) from the root folder to the folder directly containing the Paper
	 * doc.  Note: If the Paper doc is not in any folder (aka unfiled) the response
	 * will be empty.
	 * @function Dropbox#paperDocsGetFolderInfo
	 * @arg {PaperRefPaperDoc} arg - The request parameters.
	 * @returns {Promise.<PaperFoldersContainingPaperDoc, Error.<PaperDocLookupError>>}
	 */
	routes.paperDocsGetFolderInfo = function (arg) {
	  return this.request('paper/docs/get_folder_info', arg, 'user', 'api', 'rpc');
	};

	/**
	 * Return the list of all Paper docs according to the argument specifications.
	 * To iterate over through the full pagination, pass the cursor to
	 * docs/list/continue.
	 * @function Dropbox#paperDocsList
	 * @arg {PaperListPaperDocsArgs} arg - The request parameters.
	 * @returns {Promise.<PaperListPaperDocsResponse, Error.<void>>}
	 */
	routes.paperDocsList = function (arg) {
	  return this.request('paper/docs/list', arg, 'user', 'api', 'rpc');
	};

	/**
	 * Once a cursor has been retrieved from docs/list, use this to paginate through
	 * all Paper doc.
	 * @function Dropbox#paperDocsListContinue
	 * @arg {PaperListPaperDocsContinueArgs} arg - The request parameters.
	 * @returns {Promise.<PaperListPaperDocsResponse, Error.<PaperListDocsCursorError>>}
	 */
	routes.paperDocsListContinue = function (arg) {
	  return this.request('paper/docs/list/continue', arg, 'user', 'api', 'rpc');
	};

	/**
	 * Permanently deletes the given Paper doc. This operation is final as the doc
	 * cannot be recovered.  Note: This action can be performed only by the doc
	 * owner.
	 * @function Dropbox#paperDocsPermanentlyDelete
	 * @arg {PaperRefPaperDoc} arg - The request parameters.
	 * @returns {Promise.<void, Error.<PaperDocLookupError>>}
	 */
	routes.paperDocsPermanentlyDelete = function (arg) {
	  return this.request('paper/docs/permanently_delete', arg, 'user', 'api', 'rpc');
	};

	/**
	 * Gets the default sharing policy for the given Paper doc.
	 * @function Dropbox#paperDocsSharingPolicyGet
	 * @arg {PaperRefPaperDoc} arg - The request parameters.
	 * @returns {Promise.<PaperSharingPolicy, Error.<PaperDocLookupError>>}
	 */
	routes.paperDocsSharingPolicyGet = function (arg) {
	  return this.request('paper/docs/sharing_policy/get', arg, 'user', 'api', 'rpc');
	};

	/**
	 * Sets the default sharing policy for the given Paper doc. The default
	 * 'team_sharing_policy' can be changed only by teams, omit this field for
	 * personal accounts.  Note: 'public_sharing_policy' cannot be set to the value
	 * 'disabled' because this setting can be changed only via the team admin
	 * console.
	 * @function Dropbox#paperDocsSharingPolicySet
	 * @arg {PaperPaperDocSharingPolicy} arg - The request parameters.
	 * @returns {Promise.<void, Error.<PaperDocLookupError>>}
	 */
	routes.paperDocsSharingPolicySet = function (arg) {
	  return this.request('paper/docs/sharing_policy/set', arg, 'user', 'api', 'rpc');
	};

	/**
	 * Updates an existing Paper doc with the provided content.
	 * @function Dropbox#paperDocsUpdate
	 * @arg {PaperPaperDocUpdateArgs} arg - The request parameters.
	 * @returns {Promise.<PaperPaperDocCreateUpdateResult, Error.<PaperPaperDocUpdateError>>}
	 */
	routes.paperDocsUpdate = function (arg) {
	  return this.request('paper/docs/update', arg, 'user', 'api', 'upload');
	};

	/**
	 * Allows an owner or editor to add users to a Paper doc or change their
	 * permissions using their email address or Dropbox account ID.  Note: The Doc
	 * owner's permissions cannot be changed.
	 * @function Dropbox#paperDocsUsersAdd
	 * @arg {PaperAddPaperDocUser} arg - The request parameters.
	 * @returns {Promise.<Array.<PaperAddPaperDocUserMemberResult>, Error.<PaperDocLookupError>>}
	 */
	routes.paperDocsUsersAdd = function (arg) {
	  return this.request('paper/docs/users/add', arg, 'user', 'api', 'rpc');
	};

	/**
	 * Lists all users who visited the Paper doc or users with explicit access. This
	 * call excludes users who have been removed. The list is sorted by the date of
	 * the visit or the share date. The list will include both users, the explicitly
	 * shared ones as well as those who came in using the Paper url link.
	 * @function Dropbox#paperDocsUsersList
	 * @arg {PaperListUsersOnPaperDocArgs} arg - The request parameters.
	 * @returns {Promise.<PaperListUsersOnPaperDocResponse, Error.<PaperDocLookupError>>}
	 */
	routes.paperDocsUsersList = function (arg) {
	  return this.request('paper/docs/users/list', arg, 'user', 'api', 'rpc');
	};

	/**
	 * Once a cursor has been retrieved from docs/users/list, use this to paginate
	 * through all users on the Paper doc.
	 * @function Dropbox#paperDocsUsersListContinue
	 * @arg {PaperListUsersOnPaperDocContinueArgs} arg - The request parameters.
	 * @returns {Promise.<PaperListUsersOnPaperDocResponse, Error.<PaperListUsersCursorError>>}
	 */
	routes.paperDocsUsersListContinue = function (arg) {
	  return this.request('paper/docs/users/list/continue', arg, 'user', 'api', 'rpc');
	};

	/**
	 * Allows an owner or editor to remove users from a Paper doc using their email
	 * address or Dropbox account ID.  Note: Doc owner cannot be removed.
	 * @function Dropbox#paperDocsUsersRemove
	 * @arg {PaperRemovePaperDocUser} arg - The request parameters.
	 * @returns {Promise.<void, Error.<PaperDocLookupError>>}
	 */
	routes.paperDocsUsersRemove = function (arg) {
	  return this.request('paper/docs/users/remove', arg, 'user', 'api', 'rpc');
	};

	/**
	 * Adds specified members to a file.
	 * @function Dropbox#sharingAddFileMember
	 * @arg {SharingAddFileMemberArgs} arg - The request parameters.
	 * @returns {Promise.<Array.<SharingFileMemberActionResult>, Error.<SharingAddFileMemberError>>}
	 */
	routes.sharingAddFileMember = function (arg) {
	  return this.request('sharing/add_file_member', arg, 'user', 'api', 'rpc');
	};

	/**
	 * Allows an owner or editor (if the ACL update policy allows) of a shared
	 * folder to add another member. For the new member to get access to all the
	 * functionality for this folder, you will need to call mount_folder on their
	 * behalf. Apps must have full Dropbox access to use this endpoint.
	 * @function Dropbox#sharingAddFolderMember
	 * @arg {SharingAddFolderMemberArg} arg - The request parameters.
	 * @returns {Promise.<void, Error.<SharingAddFolderMemberError>>}
	 */
	routes.sharingAddFolderMember = function (arg) {
	  return this.request('sharing/add_folder_member', arg, 'user', 'api', 'rpc');
	};

	/**
	 * Identical to update_file_member but with less information returned.
	 * @function Dropbox#sharingChangeFileMemberAccess
	 * @deprecated
	 * @arg {SharingChangeFileMemberAccessArgs} arg - The request parameters.
	 * @returns {Promise.<SharingFileMemberActionResult, Error.<SharingFileMemberActionError>>}
	 */
	routes.sharingChangeFileMemberAccess = function (arg) {
	  return this.request('sharing/change_file_member_access', arg, 'user', 'api', 'rpc');
	};

	/**
	 * Returns the status of an asynchronous job. Apps must have full Dropbox access
	 * to use this endpoint.
	 * @function Dropbox#sharingCheckJobStatus
	 * @arg {AsyncPollArg} arg - The request parameters.
	 * @returns {Promise.<SharingJobStatus, Error.<AsyncPollError>>}
	 */
	routes.sharingCheckJobStatus = function (arg) {
	  return this.request('sharing/check_job_status', arg, 'user', 'api', 'rpc');
	};

	/**
	 * Returns the status of an asynchronous job for sharing a folder. Apps must
	 * have full Dropbox access to use this endpoint.
	 * @function Dropbox#sharingCheckRemoveMemberJobStatus
	 * @arg {AsyncPollArg} arg - The request parameters.
	 * @returns {Promise.<SharingRemoveMemberJobStatus, Error.<AsyncPollError>>}
	 */
	routes.sharingCheckRemoveMemberJobStatus = function (arg) {
	  return this.request('sharing/check_remove_member_job_status', arg, 'user', 'api', 'rpc');
	};

	/**
	 * Returns the status of an asynchronous job for sharing a folder. Apps must
	 * have full Dropbox access to use this endpoint.
	 * @function Dropbox#sharingCheckShareJobStatus
	 * @arg {AsyncPollArg} arg - The request parameters.
	 * @returns {Promise.<SharingShareFolderJobStatus, Error.<AsyncPollError>>}
	 */
	routes.sharingCheckShareJobStatus = function (arg) {
	  return this.request('sharing/check_share_job_status', arg, 'user', 'api', 'rpc');
	};

	/**
	 * Create a shared link. If a shared link already exists for the given path,
	 * that link is returned. Note that in the returned PathLinkMetadata, the
	 * PathLinkMetadata.url field is the shortened URL if
	 * CreateSharedLinkArg.short_url argument is set to true. Previously, it was
	 * technically possible to break a shared link by moving or renaming the
	 * corresponding file or folder. In the future, this will no longer be the case,
	 * so your app shouldn't rely on this behavior. Instead, if your app needs to
	 * revoke a shared link, use revoke_shared_link.
	 * @function Dropbox#sharingCreateSharedLink
	 * @deprecated
	 * @arg {SharingCreateSharedLinkArg} arg - The request parameters.
	 * @returns {Promise.<SharingPathLinkMetadata, Error.<SharingCreateSharedLinkError>>}
	 */
	routes.sharingCreateSharedLink = function (arg) {
	  return this.request('sharing/create_shared_link', arg, 'user', 'api', 'rpc');
	};

	/**
	 * Create a shared link with custom settings. If no settings are given then the
	 * default visibility is RequestedVisibility.public (The resolved visibility,
	 * though, may depend on other aspects such as team and shared folder settings).
	 * @function Dropbox#sharingCreateSharedLinkWithSettings
	 * @arg {SharingCreateSharedLinkWithSettingsArg} arg - The request parameters.
	 * @returns {Promise.<(SharingFileLinkMetadata|SharingFolderLinkMetadata|SharingSharedLinkMetadata), Error.<SharingCreateSharedLinkWithSettingsError>>}
	 */
	routes.sharingCreateSharedLinkWithSettings = function (arg) {
	  return this.request('sharing/create_shared_link_with_settings', arg, 'user', 'api', 'rpc');
	};

	/**
	 * Returns shared file metadata.
	 * @function Dropbox#sharingGetFileMetadata
	 * @arg {SharingGetFileMetadataArg} arg - The request parameters.
	 * @returns {Promise.<SharingSharedFileMetadata, Error.<SharingGetFileMetadataError>>}
	 */
	routes.sharingGetFileMetadata = function (arg) {
	  return this.request('sharing/get_file_metadata', arg, 'user', 'api', 'rpc');
	};

	/**
	 * Returns shared file metadata.
	 * @function Dropbox#sharingGetFileMetadataBatch
	 * @arg {SharingGetFileMetadataBatchArg} arg - The request parameters.
	 * @returns {Promise.<Array.<SharingGetFileMetadataBatchResult>, Error.<SharingSharingUserError>>}
	 */
	routes.sharingGetFileMetadataBatch = function (arg) {
	  return this.request('sharing/get_file_metadata/batch', arg, 'user', 'api', 'rpc');
	};

	/**
	 * Returns shared folder metadata by its folder ID. Apps must have full Dropbox
	 * access to use this endpoint.
	 * @function Dropbox#sharingGetFolderMetadata
	 * @arg {SharingGetMetadataArgs} arg - The request parameters.
	 * @returns {Promise.<SharingSharedFolderMetadata, Error.<SharingSharedFolderAccessError>>}
	 */
	routes.sharingGetFolderMetadata = function (arg) {
	  return this.request('sharing/get_folder_metadata', arg, 'user', 'api', 'rpc');
	};

	/**
	 * Download the shared link's file from a user's Dropbox.
	 * @function Dropbox#sharingGetSharedLinkFile
	 * @arg {Object} arg - The request parameters.
	 * @returns {Promise.<(SharingFileLinkMetadata|SharingFolderLinkMetadata|SharingSharedLinkMetadata), Error.<SharingGetSharedLinkFileError>>}
	 */
	routes.sharingGetSharedLinkFile = function (arg) {
	  return this.request('sharing/get_shared_link_file', arg, 'user', 'content', 'download');
	};

	/**
	 * Get the shared link's metadata.
	 * @function Dropbox#sharingGetSharedLinkMetadata
	 * @arg {SharingGetSharedLinkMetadataArg} arg - The request parameters.
	 * @returns {Promise.<(SharingFileLinkMetadata|SharingFolderLinkMetadata|SharingSharedLinkMetadata), Error.<SharingSharedLinkError>>}
	 */
	routes.sharingGetSharedLinkMetadata = function (arg) {
	  return this.request('sharing/get_shared_link_metadata', arg, 'user', 'api', 'rpc');
	};

	/**
	 * Returns a list of LinkMetadata objects for this user, including collection
	 * links. If no path is given, returns a list of all shared links for the
	 * current user, including collection links, up to a maximum of 1000 links. If a
	 * non-empty path is given, returns a list of all shared links that allow access
	 * to the given path.  Collection links are never returned in this case. Note
	 * that the url field in the response is never the shortened URL.
	 * @function Dropbox#sharingGetSharedLinks
	 * @deprecated
	 * @arg {SharingGetSharedLinksArg} arg - The request parameters.
	 * @returns {Promise.<SharingGetSharedLinksResult, Error.<SharingGetSharedLinksError>>}
	 */
	routes.sharingGetSharedLinks = function (arg) {
	  return this.request('sharing/get_shared_links', arg, 'user', 'api', 'rpc');
	};

	/**
	 * Use to obtain the members who have been invited to a file, both inherited and
	 * uninherited members.
	 * @function Dropbox#sharingListFileMembers
	 * @arg {SharingListFileMembersArg} arg - The request parameters.
	 * @returns {Promise.<SharingSharedFileMembers, Error.<SharingListFileMembersError>>}
	 */
	routes.sharingListFileMembers = function (arg) {
	  return this.request('sharing/list_file_members', arg, 'user', 'api', 'rpc');
	};

	/**
	 * Get members of multiple files at once. The arguments to this route are more
	 * limited, and the limit on query result size per file is more strict. To
	 * customize the results more, use the individual file endpoint. Inherited users
	 * and groups are not included in the result, and permissions are not returned
	 * for this endpoint.
	 * @function Dropbox#sharingListFileMembersBatch
	 * @arg {SharingListFileMembersBatchArg} arg - The request parameters.
	 * @returns {Promise.<Array.<SharingListFileMembersBatchResult>, Error.<SharingSharingUserError>>}
	 */
	routes.sharingListFileMembersBatch = function (arg) {
	  return this.request('sharing/list_file_members/batch', arg, 'user', 'api', 'rpc');
	};

	/**
	 * Once a cursor has been retrieved from list_file_members or
	 * list_file_members/batch, use this to paginate through all shared file
	 * members.
	 * @function Dropbox#sharingListFileMembersContinue
	 * @arg {SharingListFileMembersContinueArg} arg - The request parameters.
	 * @returns {Promise.<SharingSharedFileMembers, Error.<SharingListFileMembersContinueError>>}
	 */
	routes.sharingListFileMembersContinue = function (arg) {
	  return this.request('sharing/list_file_members/continue', arg, 'user', 'api', 'rpc');
	};

	/**
	 * Returns shared folder membership by its folder ID. Apps must have full
	 * Dropbox access to use this endpoint.
	 * @function Dropbox#sharingListFolderMembers
	 * @arg {SharingListFolderMembersArgs} arg - The request parameters.
	 * @returns {Promise.<SharingSharedFolderMembers, Error.<SharingSharedFolderAccessError>>}
	 */
	routes.sharingListFolderMembers = function (arg) {
	  return this.request('sharing/list_folder_members', arg, 'user', 'api', 'rpc');
	};

	/**
	 * Once a cursor has been retrieved from list_folder_members, use this to
	 * paginate through all shared folder members. Apps must have full Dropbox
	 * access to use this endpoint.
	 * @function Dropbox#sharingListFolderMembersContinue
	 * @arg {SharingListFolderMembersContinueArg} arg - The request parameters.
	 * @returns {Promise.<SharingSharedFolderMembers, Error.<SharingListFolderMembersContinueError>>}
	 */
	routes.sharingListFolderMembersContinue = function (arg) {
	  return this.request('sharing/list_folder_members/continue', arg, 'user', 'api', 'rpc');
	};

	/**
	 * Return the list of all shared folders the current user has access to. Apps
	 * must have full Dropbox access to use this endpoint.
	 * @function Dropbox#sharingListFolders
	 * @arg {SharingListFoldersArgs} arg - The request parameters.
	 * @returns {Promise.<SharingListFoldersResult, Error.<void>>}
	 */
	routes.sharingListFolders = function (arg) {
	  return this.request('sharing/list_folders', arg, 'user', 'api', 'rpc');
	};

	/**
	 * Once a cursor has been retrieved from list_folders, use this to paginate
	 * through all shared folders. The cursor must come from a previous call to
	 * list_folders or list_folders/continue. Apps must have full Dropbox access to
	 * use this endpoint.
	 * @function Dropbox#sharingListFoldersContinue
	 * @arg {SharingListFoldersContinueArg} arg - The request parameters.
	 * @returns {Promise.<SharingListFoldersResult, Error.<SharingListFoldersContinueError>>}
	 */
	routes.sharingListFoldersContinue = function (arg) {
	  return this.request('sharing/list_folders/continue', arg, 'user', 'api', 'rpc');
	};

	/**
	 * Return the list of all shared folders the current user can mount or unmount.
	 * Apps must have full Dropbox access to use this endpoint.
	 * @function Dropbox#sharingListMountableFolders
	 * @arg {SharingListFoldersArgs} arg - The request parameters.
	 * @returns {Promise.<SharingListFoldersResult, Error.<void>>}
	 */
	routes.sharingListMountableFolders = function (arg) {
	  return this.request('sharing/list_mountable_folders', arg, 'user', 'api', 'rpc');
	};

	/**
	 * Once a cursor has been retrieved from list_mountable_folders, use this to
	 * paginate through all mountable shared folders. The cursor must come from a
	 * previous call to list_mountable_folders or list_mountable_folders/continue.
	 * Apps must have full Dropbox access to use this endpoint.
	 * @function Dropbox#sharingListMountableFoldersContinue
	 * @arg {SharingListFoldersContinueArg} arg - The request parameters.
	 * @returns {Promise.<SharingListFoldersResult, Error.<SharingListFoldersContinueError>>}
	 */
	routes.sharingListMountableFoldersContinue = function (arg) {
	  return this.request('sharing/list_mountable_folders/continue', arg, 'user', 'api', 'rpc');
	};

	/**
	 * Returns a list of all files shared with current user.  Does not include files
	 * the user has received via shared folders, and does  not include unclaimed
	 * invitations.
	 * @function Dropbox#sharingListReceivedFiles
	 * @arg {SharingListFilesArg} arg - The request parameters.
	 * @returns {Promise.<SharingListFilesResult, Error.<SharingSharingUserError>>}
	 */
	routes.sharingListReceivedFiles = function (arg) {
	  return this.request('sharing/list_received_files', arg, 'user', 'api', 'rpc');
	};

	/**
	 * Get more results with a cursor from list_received_files.
	 * @function Dropbox#sharingListReceivedFilesContinue
	 * @arg {SharingListFilesContinueArg} arg - The request parameters.
	 * @returns {Promise.<SharingListFilesResult, Error.<SharingListFilesContinueError>>}
	 */
	routes.sharingListReceivedFilesContinue = function (arg) {
	  return this.request('sharing/list_received_files/continue', arg, 'user', 'api', 'rpc');
	};

	/**
	 * List shared links of this user. If no path is given, returns a list of all
	 * shared links for the current user. If a non-empty path is given, returns a
	 * list of all shared links that allow access to the given path - direct links
	 * to the given path and links to parent folders of the given path. Links to
	 * parent folders can be suppressed by setting direct_only to true.
	 * @function Dropbox#sharingListSharedLinks
	 * @arg {SharingListSharedLinksArg} arg - The request parameters.
	 * @returns {Promise.<SharingListSharedLinksResult, Error.<SharingListSharedLinksError>>}
	 */
	routes.sharingListSharedLinks = function (arg) {
	  return this.request('sharing/list_shared_links', arg, 'user', 'api', 'rpc');
	};

	/**
	 * Modify the shared link's settings. If the requested visibility conflict with
	 * the shared links policy of the team or the shared folder (in case the linked
	 * file is part of a shared folder) then the LinkPermissions.resolved_visibility
	 * of the returned SharedLinkMetadata will reflect the actual visibility of the
	 * shared link and the LinkPermissions.requested_visibility will reflect the
	 * requested visibility.
	 * @function Dropbox#sharingModifySharedLinkSettings
	 * @arg {SharingModifySharedLinkSettingsArgs} arg - The request parameters.
	 * @returns {Promise.<(SharingFileLinkMetadata|SharingFolderLinkMetadata|SharingSharedLinkMetadata), Error.<SharingModifySharedLinkSettingsError>>}
	 */
	routes.sharingModifySharedLinkSettings = function (arg) {
	  return this.request('sharing/modify_shared_link_settings', arg, 'user', 'api', 'rpc');
	};

	/**
	 * The current user mounts the designated folder. Mount a shared folder for a
	 * user after they have been added as a member. Once mounted, the shared folder
	 * will appear in their Dropbox. Apps must have full Dropbox access to use this
	 * endpoint.
	 * @function Dropbox#sharingMountFolder
	 * @arg {SharingMountFolderArg} arg - The request parameters.
	 * @returns {Promise.<SharingSharedFolderMetadata, Error.<SharingMountFolderError>>}
	 */
	routes.sharingMountFolder = function (arg) {
	  return this.request('sharing/mount_folder', arg, 'user', 'api', 'rpc');
	};

	/**
	 * The current user relinquishes their membership in the designated file. Note
	 * that the current user may still have inherited access to this file through
	 * the parent folder. Apps must have full Dropbox access to use this endpoint.
	 * @function Dropbox#sharingRelinquishFileMembership
	 * @arg {SharingRelinquishFileMembershipArg} arg - The request parameters.
	 * @returns {Promise.<void, Error.<SharingRelinquishFileMembershipError>>}
	 */
	routes.sharingRelinquishFileMembership = function (arg) {
	  return this.request('sharing/relinquish_file_membership', arg, 'user', 'api', 'rpc');
	};

	/**
	 * The current user relinquishes their membership in the designated shared
	 * folder and will no longer have access to the folder.  A folder owner cannot
	 * relinquish membership in their own folder. This will run synchronously if
	 * leave_a_copy is false, and asynchronously if leave_a_copy is true. Apps must
	 * have full Dropbox access to use this endpoint.
	 * @function Dropbox#sharingRelinquishFolderMembership
	 * @arg {SharingRelinquishFolderMembershipArg} arg - The request parameters.
	 * @returns {Promise.<AsyncLaunchEmptyResult, Error.<SharingRelinquishFolderMembershipError>>}
	 */
	routes.sharingRelinquishFolderMembership = function (arg) {
	  return this.request('sharing/relinquish_folder_membership', arg, 'user', 'api', 'rpc');
	};

	/**
	 * Identical to remove_file_member_2 but with less information returned.
	 * @function Dropbox#sharingRemoveFileMember
	 * @deprecated
	 * @arg {SharingRemoveFileMemberArg} arg - The request parameters.
	 * @returns {Promise.<SharingFileMemberActionIndividualResult, Error.<SharingRemoveFileMemberError>>}
	 */
	routes.sharingRemoveFileMember = function (arg) {
	  return this.request('sharing/remove_file_member', arg, 'user', 'api', 'rpc');
	};

	/**
	 * Removes a specified member from the file.
	 * @function Dropbox#sharingRemoveFileMember2
	 * @arg {SharingRemoveFileMemberArg} arg - The request parameters.
	 * @returns {Promise.<SharingFileMemberRemoveActionResult, Error.<SharingRemoveFileMemberError>>}
	 */
	routes.sharingRemoveFileMember2 = function (arg) {
	  return this.request('sharing/remove_file_member_2', arg, 'user', 'api', 'rpc');
	};

	/**
	 * Allows an owner or editor (if the ACL update policy allows) of a shared
	 * folder to remove another member. Apps must have full Dropbox access to use
	 * this endpoint.
	 * @function Dropbox#sharingRemoveFolderMember
	 * @arg {SharingRemoveFolderMemberArg} arg - The request parameters.
	 * @returns {Promise.<AsyncLaunchResultBase, Error.<SharingRemoveFolderMemberError>>}
	 */
	routes.sharingRemoveFolderMember = function (arg) {
	  return this.request('sharing/remove_folder_member', arg, 'user', 'api', 'rpc');
	};

	/**
	 * Revoke a shared link. Note that even after revoking a shared link to a file,
	 * the file may be accessible if there are shared links leading to any of the
	 * file parent folders. To list all shared links that enable access to a
	 * specific file, you can use the list_shared_links with the file as the
	 * ListSharedLinksArg.path argument.
	 * @function Dropbox#sharingRevokeSharedLink
	 * @arg {SharingRevokeSharedLinkArg} arg - The request parameters.
	 * @returns {Promise.<void, Error.<SharingRevokeSharedLinkError>>}
	 */
	routes.sharingRevokeSharedLink = function (arg) {
	  return this.request('sharing/revoke_shared_link', arg, 'user', 'api', 'rpc');
	};

	/**
	 * Share a folder with collaborators. Most sharing will be completed
	 * synchronously. Large folders will be completed asynchronously. To make
	 * testing the async case repeatable, set `ShareFolderArg.force_async`. If a
	 * ShareFolderLaunch.async_job_id is returned, you'll need to call
	 * check_share_job_status until the action completes to get the metadata for the
	 * folder. Apps must have full Dropbox access to use this endpoint.
	 * @function Dropbox#sharingShareFolder
	 * @arg {SharingShareFolderArg} arg - The request parameters.
	 * @returns {Promise.<SharingShareFolderLaunch, Error.<SharingShareFolderError>>}
	 */
	routes.sharingShareFolder = function (arg) {
	  return this.request('sharing/share_folder', arg, 'user', 'api', 'rpc');
	};

	/**
	 * Transfer ownership of a shared folder to a member of the shared folder. User
	 * must have AccessLevel.owner access to the shared folder to perform a
	 * transfer. Apps must have full Dropbox access to use this endpoint.
	 * @function Dropbox#sharingTransferFolder
	 * @arg {SharingTransferFolderArg} arg - The request parameters.
	 * @returns {Promise.<void, Error.<SharingTransferFolderError>>}
	 */
	routes.sharingTransferFolder = function (arg) {
	  return this.request('sharing/transfer_folder', arg, 'user', 'api', 'rpc');
	};

	/**
	 * The current user unmounts the designated folder. They can re-mount the folder
	 * at a later time using mount_folder. Apps must have full Dropbox access to use
	 * this endpoint.
	 * @function Dropbox#sharingUnmountFolder
	 * @arg {SharingUnmountFolderArg} arg - The request parameters.
	 * @returns {Promise.<void, Error.<SharingUnmountFolderError>>}
	 */
	routes.sharingUnmountFolder = function (arg) {
	  return this.request('sharing/unmount_folder', arg, 'user', 'api', 'rpc');
	};

	/**
	 * Remove all members from this file. Does not remove inherited members.
	 * @function Dropbox#sharingUnshareFile
	 * @arg {SharingUnshareFileArg} arg - The request parameters.
	 * @returns {Promise.<void, Error.<SharingUnshareFileError>>}
	 */
	routes.sharingUnshareFile = function (arg) {
	  return this.request('sharing/unshare_file', arg, 'user', 'api', 'rpc');
	};

	/**
	 * Allows a shared folder owner to unshare the folder. You'll need to call
	 * check_job_status to determine if the action has completed successfully. Apps
	 * must have full Dropbox access to use this endpoint.
	 * @function Dropbox#sharingUnshareFolder
	 * @arg {SharingUnshareFolderArg} arg - The request parameters.
	 * @returns {Promise.<AsyncLaunchEmptyResult, Error.<SharingUnshareFolderError>>}
	 */
	routes.sharingUnshareFolder = function (arg) {
	  return this.request('sharing/unshare_folder', arg, 'user', 'api', 'rpc');
	};

	/**
	 * Changes a member's access on a shared file.
	 * @function Dropbox#sharingUpdateFileMember
	 * @arg {SharingUpdateFileMemberArgs} arg - The request parameters.
	 * @returns {Promise.<SharingMemberAccessLevelResult, Error.<SharingFileMemberActionError>>}
	 */
	routes.sharingUpdateFileMember = function (arg) {
	  return this.request('sharing/update_file_member', arg, 'user', 'api', 'rpc');
	};

	/**
	 * Allows an owner or editor of a shared folder to update another member's
	 * permissions. Apps must have full Dropbox access to use this endpoint.
	 * @function Dropbox#sharingUpdateFolderMember
	 * @arg {SharingUpdateFolderMemberArg} arg - The request parameters.
	 * @returns {Promise.<SharingMemberAccessLevelResult, Error.<SharingUpdateFolderMemberError>>}
	 */
	routes.sharingUpdateFolderMember = function (arg) {
	  return this.request('sharing/update_folder_member', arg, 'user', 'api', 'rpc');
	};

	/**
	 * Update the sharing policies for a shared folder. User must have
	 * AccessLevel.owner access to the shared folder to update its policies. Apps
	 * must have full Dropbox access to use this endpoint.
	 * @function Dropbox#sharingUpdateFolderPolicy
	 * @arg {SharingUpdateFolderPolicyArg} arg - The request parameters.
	 * @returns {Promise.<SharingSharedFolderMetadata, Error.<SharingUpdateFolderPolicyError>>}
	 */
	routes.sharingUpdateFolderPolicy = function (arg) {
	  return this.request('sharing/update_folder_policy', arg, 'user', 'api', 'rpc');
	};

	/**
	 * Retrieves team events. Permission : Team Auditing.
	 * @function Dropbox#teamLogGetEvents
	 * @arg {TeamLogGetTeamEventsArg} arg - The request parameters.
	 * @returns {Promise.<TeamLogGetTeamEventsResult, Error.<TeamLogGetTeamEventsError>>}
	 */
	routes.teamLogGetEvents = function (arg) {
	  return this.request('team_log/get_events', arg, 'team', 'api', 'rpc');
	};

	/**
	 * Once a cursor has been retrieved from get_events, use this to paginate
	 * through all events. Permission : Team Auditing.
	 * @function Dropbox#teamLogGetEventsContinue
	 * @arg {TeamLogGetTeamEventsContinueArg} arg - The request parameters.
	 * @returns {Promise.<TeamLogGetTeamEventsResult, Error.<TeamLogGetTeamEventsContinueError>>}
	 */
	routes.teamLogGetEventsContinue = function (arg) {
	  return this.request('team_log/get_events/continue', arg, 'team', 'api', 'rpc');
	};

	/**
	 * Get information about a user's account.
	 * @function Dropbox#usersGetAccount
	 * @arg {UsersGetAccountArg} arg - The request parameters.
	 * @returns {Promise.<UsersBasicAccount, Error.<UsersGetAccountError>>}
	 */
	routes.usersGetAccount = function (arg) {
	  return this.request('users/get_account', arg, 'user', 'api', 'rpc');
	};

	/**
	 * Get information about multiple user accounts.  At most 300 accounts may be
	 * queried per request.
	 * @function Dropbox#usersGetAccountBatch
	 * @arg {UsersGetAccountBatchArg} arg - The request parameters.
	 * @returns {Promise.<Object, Error.<UsersGetAccountBatchError>>}
	 */
	routes.usersGetAccountBatch = function (arg) {
	  return this.request('users/get_account_batch', arg, 'user', 'api', 'rpc');
	};

	/**
	 * Get information about the current user's account.
	 * @function Dropbox#usersGetCurrentAccount
	 * @arg {void} arg - The request parameters.
	 * @returns {Promise.<UsersFullAccount, Error.<void>>}
	 */
	routes.usersGetCurrentAccount = function (arg) {
	  return this.request('users/get_current_account', arg, 'user', 'api', 'rpc');
	};

	/**
	 * Get the space usage information for the current user's account.
	 * @function Dropbox#usersGetSpaceUsage
	 * @arg {void} arg - The request parameters.
	 * @returns {Promise.<UsersSpaceUsage, Error.<void>>}
	 */
	routes.usersGetSpaceUsage = function (arg) {
	  return this.request('users/get_space_usage', arg, 'user', 'api', 'rpc');
	};

	module.exports = routes;


/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	var request = __webpack_require__(3);
	var Promise = __webpack_require__(2).Promise;
	var getBaseURL = __webpack_require__(1);

	__webpack_require__(4)(request);

	// This doesn't match what was spec'd in paper doc yet
	var buildCustomError = function (error, response) {
	  var err;
	  if (response) {
	    try {
	      err = JSON.parse(response.text);
	    } catch (e) {
	      err = response.text;
	    }
	  }
	  return {
	    status: error.status,
	    error: err || error,
	    response: response
	  };
	};

	var rpcRequest = function (path, body, auth, host, accessToken, selectUser, proxy) {
	  var promiseFunction = function (resolve, reject) {
	    var apiRequest;

	    function success(data) {
	      if (resolve) {
	        resolve(data);
	      }
	    }

	    function failure(error) {
	      if (reject) {
	        reject(error);
	      }
	    }

	    function responseHandler(error, response) {
	      if (error) {
	        failure(buildCustomError(error, response));
	      } else {
	        success(response.body);
	      }
	    }

	    // The API expects null to be passed for endpoints that dont accept any
	    // parameters
	    if (!body) {
	      body = null;
	    }

	    apiRequest = request.post(getBaseURL(host) + path)
	      .type('application/json');

	    switch (auth) {
	      case 'team':
	      case 'user':
	        apiRequest.set('Authorization', 'Bearer ' + accessToken);
	        break;
	      case 'noauth':
	        break;
	      default:
	        throw new Error('Unhandled auth type: ' + auth);
	    }

	    if (selectUser) {
	      apiRequest = apiRequest.set('Dropbox-API-Select-User', selectUser);
	    }

	    if (proxy) {
	      apiRequest.proxy(proxy);
	    }

	    apiRequest.send(body)
	      .end(responseHandler);
	  };

	  return new Promise(promiseFunction);
	};

	module.exports = rpcRequest;


/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	var request = __webpack_require__(3);
	var Promise = __webpack_require__(2).Promise;
	var getBaseURL = __webpack_require__(1);
	var httpHeaderSafeJson = __webpack_require__(5);

	__webpack_require__(4)(request);

	// This doesn't match what was spec'd in paper doc yet
	var buildCustomError = function (error, response) {
	  return {
	    status: error.status,
	    error: (response ? response.text : null) || error.toString(),
	    response: response
	  };
	};

	var uploadRequest = function (path, args, auth, host, accessToken, selectUser, proxy) {
	  if (auth !== 'user') {
	    throw new Error('Unexpected auth type: ' + auth);
	  }

	  var promiseFunction = function (resolve, reject) {
	    var apiRequest;

	    // Since args.contents is sent as the body of the request and not added to
	    // the url, it needs to be remove it from args.
	    var contents = args.contents;
	    delete args.contents;

	    function success(data) {
	      if (resolve) {
	        resolve(data);
	      }
	    }

	    function failure(error) {
	      if (reject) {
	        reject(error);
	      }
	    }

	    function responseHandler(error, response) {
	      if (error) {
	        failure(buildCustomError(error, response));
	      } else {
	        success(response.body);
	      }
	    }

	    apiRequest = request.post(getBaseURL(host) + path)
	      .type('application/octet-stream')
	      .set('Authorization', 'Bearer ' + accessToken)
	      .set('Dropbox-API-Arg', httpHeaderSafeJson(args));

	    if (selectUser) {
	      apiRequest = apiRequest.set('Dropbox-API-Select-User', selectUser);
	    }

	    if (proxy) {
	      apiRequest.proxy(proxy);
	    }

	    apiRequest
	      .send(contents)
	      .end(responseHandler);
	  };

	  return new Promise(promiseFunction);
	};

	module.exports = uploadRequest;


/***/ }
/******/ ]);