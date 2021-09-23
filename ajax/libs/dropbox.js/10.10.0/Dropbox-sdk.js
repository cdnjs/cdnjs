(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.Dropbox = {}));
}(this, (function (exports) { 'use strict';

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
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
    if (superClass) _setPrototypeOf(subClass, superClass);
  }

  function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
      return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf(o);
  }

  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };

    return _setPrototypeOf(o, p);
  }

  function _isNativeReflectConstruct() {
    if (typeof Reflect === "undefined" || !Reflect.construct) return false;
    if (Reflect.construct.sham) return false;
    if (typeof Proxy === "function") return true;

    try {
      Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));
      return true;
    } catch (e) {
      return false;
    }
  }

  function _construct(Parent, args, Class) {
    if (_isNativeReflectConstruct()) {
      _construct = Reflect.construct;
    } else {
      _construct = function _construct(Parent, args, Class) {
        var a = [null];
        a.push.apply(a, args);
        var Constructor = Function.bind.apply(Parent, a);
        var instance = new Constructor();
        if (Class) _setPrototypeOf(instance, Class.prototype);
        return instance;
      };
    }

    return _construct.apply(null, arguments);
  }

  function _isNativeFunction(fn) {
    return Function.toString.call(fn).indexOf("[native code]") !== -1;
  }

  function _wrapNativeSuper(Class) {
    var _cache = typeof Map === "function" ? new Map() : undefined;

    _wrapNativeSuper = function _wrapNativeSuper(Class) {
      if (Class === null || !_isNativeFunction(Class)) return Class;

      if (typeof Class !== "function") {
        throw new TypeError("Super expression must either be null or a function");
      }

      if (typeof _cache !== "undefined") {
        if (_cache.has(Class)) return _cache.get(Class);

        _cache.set(Class, Wrapper);
      }

      function Wrapper() {
        return _construct(Class, arguments, _getPrototypeOf(this).constructor);
      }

      Wrapper.prototype = Object.create(Class.prototype, {
        constructor: {
          value: Wrapper,
          enumerable: false,
          writable: true,
          configurable: true
        }
      });
      return _setPrototypeOf(Wrapper, Class);
    };

    return _wrapNativeSuper(Class);
  }

  function _assertThisInitialized(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return self;
  }

  function _possibleConstructorReturn(self, call) {
    if (call && (typeof call === "object" || typeof call === "function")) {
      return call;
    }

    return _assertThisInitialized(self);
  }

  function _createSuper(Derived) {
    var hasNativeReflectConstruct = _isNativeReflectConstruct();

    return function _createSuperInternal() {
      var Super = _getPrototypeOf(Derived),
          result;

      if (hasNativeReflectConstruct) {
        var NewTarget = _getPrototypeOf(this).constructor;

        result = Reflect.construct(Super, arguments, NewTarget);
      } else {
        result = Super.apply(this, arguments);
      }

      return _possibleConstructorReturn(this, result);
    };
  }

  var RPC = 'rpc';
  var UPLOAD = 'upload';
  var DOWNLOAD = 'download';
  var APP_AUTH = 'app';
  var USER_AUTH = 'user';
  var TEAM_AUTH = 'team';
  var NO_AUTH = 'noauth';
  var DEFAULT_API_DOMAIN = 'dropboxapi.com';
  var DEFAULT_DOMAIN = 'dropbox.com';
  var TEST_DOMAIN_MAPPINGS = {
    api: 'api',
    notify: 'bolt',
    content: 'api-content'
  };

  // Auto-generated by Stone, do not modify.
  var routes = {};
  /**
   * Sets a user's profile photo.
   * @function Dropbox#accountSetProfilePhoto
   * @arg {AccountSetProfilePhotoArg} arg - The request parameters.
   * @returns {Promise.<DropboxResponse<AccountSetProfilePhotoResult>, DropboxResponseError.<AccountSetProfilePhotoError>>}
   */

  routes.accountSetProfilePhoto = function (arg) {
    return this.request('account/set_profile_photo', arg, 'user', 'api', 'rpc');
  };
  /**
   * Creates an OAuth 2.0 access token from the supplied OAuth 1.0 access token.
   * @function Dropbox#authTokenFromOauth1
   * @arg {AuthTokenFromOAuth1Arg} arg - The request parameters.
   * @returns {Promise.<DropboxResponse<AuthTokenFromOAuth1Result>, DropboxResponseError.<AuthTokenFromOAuth1Error>>}
   */


  routes.authTokenFromOauth1 = function (arg) {
    return this.request('auth/token/from_oauth1', arg, 'app', 'api', 'rpc');
  };
  /**
   * Disables the access token used to authenticate the call. If there is a
   * corresponding refresh token for the access token, this disables that refresh
   * token, as well as any other access tokens for that refresh token.
   * @function Dropbox#authTokenRevoke
   * @returns {Promise.<DropboxResponse<void>, DropboxResponseError.<void>>}
   */


  routes.authTokenRevoke = function () {
    return this.request('auth/token/revoke', null, 'user', 'api', 'rpc');
  };
  /**
   * This endpoint performs App Authentication, validating the supplied app key
   * and secret, and returns the supplied string, to allow you to test your code
   * and connection to the Dropbox API. It has no other effect. If you receive an
   * HTTP 200 response with the supplied query, it indicates at least part of the
   * Dropbox API infrastructure is working and that the app key and secret valid.
   * @function Dropbox#checkApp
   * @arg {CheckEchoArg} arg - The request parameters.
   * @returns {Promise.<DropboxResponse<CheckEchoResult>, DropboxResponseError.<void>>}
   */


  routes.checkApp = function (arg) {
    return this.request('check/app', arg, 'app', 'api', 'rpc');
  };
  /**
   * This endpoint performs User Authentication, validating the supplied access
   * token, and returns the supplied string, to allow you to test your code and
   * connection to the Dropbox API. It has no other effect. If you receive an HTTP
   * 200 response with the supplied query, it indicates at least part of the
   * Dropbox API infrastructure is working and that the access token is valid.
   * @function Dropbox#checkUser
   * @arg {CheckEchoArg} arg - The request parameters.
   * @returns {Promise.<DropboxResponse<CheckEchoResult>, DropboxResponseError.<void>>}
   */


  routes.checkUser = function (arg) {
    return this.request('check/user', arg, 'user', 'api', 'rpc');
  };
  /**
   * Removes all manually added contacts. You'll still keep contacts who are on
   * your team or who you imported. New contacts will be added when you share.
   * @function Dropbox#contactsDeleteManualContacts
   * @returns {Promise.<DropboxResponse<void>, DropboxResponseError.<void>>}
   */


  routes.contactsDeleteManualContacts = function () {
    return this.request('contacts/delete_manual_contacts', null, 'user', 'api', 'rpc');
  };
  /**
   * Removes manually added contacts from the given list.
   * @function Dropbox#contactsDeleteManualContactsBatch
   * @arg {ContactsDeleteManualContactsArg} arg - The request parameters.
   * @returns {Promise.<DropboxResponse<void>, DropboxResponseError.<ContactsDeleteManualContactsError>>}
   */


  routes.contactsDeleteManualContactsBatch = function (arg) {
    return this.request('contacts/delete_manual_contacts_batch', arg, 'user', 'api', 'rpc');
  };
  /**
   * Add property groups to a Dropbox file. See templates/add_for_user or
   * templates/add_for_team to create new templates.
   * @function Dropbox#filePropertiesPropertiesAdd
   * @arg {FilePropertiesAddPropertiesArg} arg - The request parameters.
   * @returns {Promise.<DropboxResponse<void>, DropboxResponseError.<FilePropertiesAddPropertiesError>>}
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
   * @returns {Promise.<DropboxResponse<void>, DropboxResponseError.<FilePropertiesInvalidPropertyGroupError>>}
   */


  routes.filePropertiesPropertiesOverwrite = function (arg) {
    return this.request('file_properties/properties/overwrite', arg, 'user', 'api', 'rpc');
  };
  /**
   * Permanently removes the specified property group from the file. To remove
   * specific property field key value pairs, see properties/update. To update a
   * template, see templates/update_for_user or templates/update_for_team. To
   * remove a template, see templates/remove_for_user or
   * templates/remove_for_team.
   * @function Dropbox#filePropertiesPropertiesRemove
   * @arg {FilePropertiesRemovePropertiesArg} arg - The request parameters.
   * @returns {Promise.<DropboxResponse<void>, DropboxResponseError.<FilePropertiesRemovePropertiesError>>}
   */


  routes.filePropertiesPropertiesRemove = function (arg) {
    return this.request('file_properties/properties/remove', arg, 'user', 'api', 'rpc');
  };
  /**
   * Search across property templates for particular property field values.
   * @function Dropbox#filePropertiesPropertiesSearch
   * @arg {FilePropertiesPropertiesSearchArg} arg - The request parameters.
   * @returns {Promise.<DropboxResponse<FilePropertiesPropertiesSearchResult>, DropboxResponseError.<FilePropertiesPropertiesSearchError>>}
   */


  routes.filePropertiesPropertiesSearch = function (arg) {
    return this.request('file_properties/properties/search', arg, 'user', 'api', 'rpc');
  };
  /**
   * Once a cursor has been retrieved from properties/search, use this to paginate
   * through all search results.
   * @function Dropbox#filePropertiesPropertiesSearchContinue
   * @arg {FilePropertiesPropertiesSearchContinueArg} arg - The request parameters.
   * @returns {Promise.<DropboxResponse<FilePropertiesPropertiesSearchResult>, DropboxResponseError.<FilePropertiesPropertiesSearchContinueError>>}
   */


  routes.filePropertiesPropertiesSearchContinue = function (arg) {
    return this.request('file_properties/properties/search/continue', arg, 'user', 'api', 'rpc');
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
   * @returns {Promise.<DropboxResponse<void>, DropboxResponseError.<FilePropertiesUpdatePropertiesError>>}
   */


  routes.filePropertiesPropertiesUpdate = function (arg) {
    return this.request('file_properties/properties/update', arg, 'user', 'api', 'rpc');
  };
  /**
   * Add a template associated with a team. See properties/add to add properties
   * to a file or folder. Note: this endpoint will create team-owned templates.
   * @function Dropbox#filePropertiesTemplatesAddForTeam
   * @arg {FilePropertiesAddTemplateArg} arg - The request parameters.
   * @returns {Promise.<DropboxResponse<FilePropertiesAddTemplateResult>, DropboxResponseError.<FilePropertiesModifyTemplateError>>}
   */


  routes.filePropertiesTemplatesAddForTeam = function (arg) {
    return this.request('file_properties/templates/add_for_team', arg, 'team', 'api', 'rpc');
  };
  /**
   * Add a template associated with a user. See properties/add to add properties
   * to a file. This endpoint can't be called on a team member or admin's behalf.
   * @function Dropbox#filePropertiesTemplatesAddForUser
   * @arg {FilePropertiesAddTemplateArg} arg - The request parameters.
   * @returns {Promise.<DropboxResponse<FilePropertiesAddTemplateResult>, DropboxResponseError.<FilePropertiesModifyTemplateError>>}
   */


  routes.filePropertiesTemplatesAddForUser = function (arg) {
    return this.request('file_properties/templates/add_for_user', arg, 'user', 'api', 'rpc');
  };
  /**
   * Get the schema for a specified template.
   * @function Dropbox#filePropertiesTemplatesGetForTeam
   * @arg {FilePropertiesGetTemplateArg} arg - The request parameters.
   * @returns {Promise.<DropboxResponse<FilePropertiesGetTemplateResult>, DropboxResponseError.<FilePropertiesTemplateError>>}
   */


  routes.filePropertiesTemplatesGetForTeam = function (arg) {
    return this.request('file_properties/templates/get_for_team', arg, 'team', 'api', 'rpc');
  };
  /**
   * Get the schema for a specified template. This endpoint can't be called on a
   * team member or admin's behalf.
   * @function Dropbox#filePropertiesTemplatesGetForUser
   * @arg {FilePropertiesGetTemplateArg} arg - The request parameters.
   * @returns {Promise.<DropboxResponse<FilePropertiesGetTemplateResult>, DropboxResponseError.<FilePropertiesTemplateError>>}
   */


  routes.filePropertiesTemplatesGetForUser = function (arg) {
    return this.request('file_properties/templates/get_for_user', arg, 'user', 'api', 'rpc');
  };
  /**
   * Get the template identifiers for a team. To get the schema of each template
   * use templates/get_for_team.
   * @function Dropbox#filePropertiesTemplatesListForTeam
   * @returns {Promise.<DropboxResponse<FilePropertiesListTemplateResult>, DropboxResponseError.<FilePropertiesTemplateError>>}
   */


  routes.filePropertiesTemplatesListForTeam = function () {
    return this.request('file_properties/templates/list_for_team', null, 'team', 'api', 'rpc');
  };
  /**
   * Get the template identifiers for a team. To get the schema of each template
   * use templates/get_for_user. This endpoint can't be called on a team member or
   * admin's behalf.
   * @function Dropbox#filePropertiesTemplatesListForUser
   * @returns {Promise.<DropboxResponse<FilePropertiesListTemplateResult>, DropboxResponseError.<FilePropertiesTemplateError>>}
   */


  routes.filePropertiesTemplatesListForUser = function () {
    return this.request('file_properties/templates/list_for_user', null, 'user', 'api', 'rpc');
  };
  /**
   * Permanently removes the specified template created from
   * templates/add_for_user. All properties associated with the template will also
   * be removed. This action cannot be undone.
   * @function Dropbox#filePropertiesTemplatesRemoveForTeam
   * @arg {FilePropertiesRemoveTemplateArg} arg - The request parameters.
   * @returns {Promise.<DropboxResponse<void>, DropboxResponseError.<FilePropertiesTemplateError>>}
   */


  routes.filePropertiesTemplatesRemoveForTeam = function (arg) {
    return this.request('file_properties/templates/remove_for_team', arg, 'team', 'api', 'rpc');
  };
  /**
   * Permanently removes the specified template created from
   * templates/add_for_user. All properties associated with the template will also
   * be removed. This action cannot be undone.
   * @function Dropbox#filePropertiesTemplatesRemoveForUser
   * @arg {FilePropertiesRemoveTemplateArg} arg - The request parameters.
   * @returns {Promise.<DropboxResponse<void>, DropboxResponseError.<FilePropertiesTemplateError>>}
   */


  routes.filePropertiesTemplatesRemoveForUser = function (arg) {
    return this.request('file_properties/templates/remove_for_user', arg, 'user', 'api', 'rpc');
  };
  /**
   * Update a template associated with a team. This route can update the template
   * name, the template description and add optional properties to templates.
   * @function Dropbox#filePropertiesTemplatesUpdateForTeam
   * @arg {FilePropertiesUpdateTemplateArg} arg - The request parameters.
   * @returns {Promise.<DropboxResponse<FilePropertiesUpdateTemplateResult>, DropboxResponseError.<FilePropertiesModifyTemplateError>>}
   */


  routes.filePropertiesTemplatesUpdateForTeam = function (arg) {
    return this.request('file_properties/templates/update_for_team', arg, 'team', 'api', 'rpc');
  };
  /**
   * Update a template associated with a user. This route can update the template
   * name, the template description and add optional properties to templates. This
   * endpoint can't be called on a team member or admin's behalf.
   * @function Dropbox#filePropertiesTemplatesUpdateForUser
   * @arg {FilePropertiesUpdateTemplateArg} arg - The request parameters.
   * @returns {Promise.<DropboxResponse<FilePropertiesUpdateTemplateResult>, DropboxResponseError.<FilePropertiesModifyTemplateError>>}
   */


  routes.filePropertiesTemplatesUpdateForUser = function (arg) {
    return this.request('file_properties/templates/update_for_user', arg, 'user', 'api', 'rpc');
  };
  /**
   * Returns the total number of file requests owned by this user. Includes both
   * open and closed file requests.
   * @function Dropbox#fileRequestsCount
   * @returns {Promise.<DropboxResponse<FileRequestsCountFileRequestsResult>, DropboxResponseError.<FileRequestsCountFileRequestsError>>}
   */


  routes.fileRequestsCount = function () {
    return this.request('file_requests/count', null, 'user', 'api', 'rpc');
  };
  /**
   * Creates a file request for this user.
   * @function Dropbox#fileRequestsCreate
   * @arg {FileRequestsCreateFileRequestArgs} arg - The request parameters.
   * @returns {Promise.<DropboxResponse<FileRequestsFileRequest>, DropboxResponseError.<FileRequestsCreateFileRequestError>>}
   */


  routes.fileRequestsCreate = function (arg) {
    return this.request('file_requests/create', arg, 'user', 'api', 'rpc');
  };
  /**
   * Delete a batch of closed file requests.
   * @function Dropbox#fileRequestsDelete
   * @arg {FileRequestsDeleteFileRequestArgs} arg - The request parameters.
   * @returns {Promise.<DropboxResponse<FileRequestsDeleteFileRequestsResult>, DropboxResponseError.<FileRequestsDeleteFileRequestError>>}
   */


  routes.fileRequestsDelete = function (arg) {
    return this.request('file_requests/delete', arg, 'user', 'api', 'rpc');
  };
  /**
   * Delete all closed file requests owned by this user.
   * @function Dropbox#fileRequestsDeleteAllClosed
   * @returns {Promise.<DropboxResponse<FileRequestsDeleteAllClosedFileRequestsResult>, DropboxResponseError.<FileRequestsDeleteAllClosedFileRequestsError>>}
   */


  routes.fileRequestsDeleteAllClosed = function () {
    return this.request('file_requests/delete_all_closed', null, 'user', 'api', 'rpc');
  };
  /**
   * Returns the specified file request.
   * @function Dropbox#fileRequestsGet
   * @arg {FileRequestsGetFileRequestArgs} arg - The request parameters.
   * @returns {Promise.<DropboxResponse<FileRequestsFileRequest>, DropboxResponseError.<FileRequestsGetFileRequestError>>}
   */


  routes.fileRequestsGet = function (arg) {
    return this.request('file_requests/get', arg, 'user', 'api', 'rpc');
  };
  /**
   * Returns a list of file requests owned by this user. For apps with the app
   * folder permission, this will only return file requests with destinations in
   * the app folder.
   * @function Dropbox#fileRequestsListV2
   * @arg {FileRequestsListFileRequestsArg} arg - The request parameters.
   * @returns {Promise.<DropboxResponse<FileRequestsListFileRequestsV2Result>, DropboxResponseError.<FileRequestsListFileRequestsError>>}
   */


  routes.fileRequestsListV2 = function (arg) {
    return this.request('file_requests/list_v2', arg, 'user', 'api', 'rpc');
  };
  /**
   * Returns a list of file requests owned by this user. For apps with the app
   * folder permission, this will only return file requests with destinations in
   * the app folder.
   * @function Dropbox#fileRequestsList
   * @returns {Promise.<DropboxResponse<FileRequestsListFileRequestsResult>, DropboxResponseError.<FileRequestsListFileRequestsError>>}
   */


  routes.fileRequestsList = function () {
    return this.request('file_requests/list', null, 'user', 'api', 'rpc');
  };
  /**
   * Once a cursor has been retrieved from list_v2, use this to paginate through
   * all file requests. The cursor must come from a previous call to list_v2 or
   * list/continue.
   * @function Dropbox#fileRequestsListContinue
   * @arg {FileRequestsListFileRequestsContinueArg} arg - The request parameters.
   * @returns {Promise.<DropboxResponse<FileRequestsListFileRequestsV2Result>, DropboxResponseError.<FileRequestsListFileRequestsContinueError>>}
   */


  routes.fileRequestsListContinue = function (arg) {
    return this.request('file_requests/list/continue', arg, 'user', 'api', 'rpc');
  };
  /**
   * Update a file request.
   * @function Dropbox#fileRequestsUpdate
   * @arg {FileRequestsUpdateFileRequestArgs} arg - The request parameters.
   * @returns {Promise.<DropboxResponse<FileRequestsFileRequest>, DropboxResponseError.<FileRequestsUpdateFileRequestError>>}
   */


  routes.fileRequestsUpdate = function (arg) {
    return this.request('file_requests/update', arg, 'user', 'api', 'rpc');
  };
  /**
   * Returns the metadata for a file or folder. This is an alpha endpoint
   * compatible with the properties API. Note: Metadata for the root folder is
   * unsupported.
   * @function Dropbox#filesAlphaGetMetadata
   * @deprecated
   * @arg {FilesAlphaGetMetadataArg} arg - The request parameters.
   * @returns {Promise.<DropboxResponse<(FilesFileMetadata|FilesFolderMetadata|FilesDeletedMetadata)>, DropboxResponseError.<FilesAlphaGetMetadataError>>}
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
   * @deprecated
   * @arg {FilesCommitInfoWithProperties} arg - The request parameters.
   * @returns {Promise.<DropboxResponse<FilesFileMetadata>, DropboxResponseError.<FilesUploadErrorWithProperties>>}
   */


  routes.filesAlphaUpload = function (arg) {
    return this.request('files/alpha/upload', arg, 'user', 'content', 'upload');
  };
  /**
   * Copy a file or folder to a different location in the user's Dropbox. If the
   * source path is a folder all its contents will be copied.
   * @function Dropbox#filesCopyV2
   * @arg {FilesRelocationArg} arg - The request parameters.
   * @returns {Promise.<DropboxResponse<FilesRelocationResult>, DropboxResponseError.<FilesRelocationError>>}
   */


  routes.filesCopyV2 = function (arg) {
    return this.request('files/copy_v2', arg, 'user', 'api', 'rpc');
  };
  /**
   * Copy a file or folder to a different location in the user's Dropbox. If the
   * source path is a folder all its contents will be copied.
   * @function Dropbox#filesCopy
   * @deprecated
   * @arg {FilesRelocationArg} arg - The request parameters.
   * @returns {Promise.<DropboxResponse<(FilesFileMetadata|FilesFolderMetadata|FilesDeletedMetadata)>, DropboxResponseError.<FilesRelocationError>>}
   */


  routes.filesCopy = function (arg) {
    return this.request('files/copy', arg, 'user', 'api', 'rpc');
  };
  /**
   * Copy multiple files or folders to different locations at once in the user's
   * Dropbox. This route will replace copy_batch. The main difference is this
   * route will return status for each entry, while copy_batch raises failure if
   * any entry fails. This route will either finish synchronously, or return a job
   * ID and do the async copy job in background. Please use copy_batch/check_v2 to
   * check the job status.
   * @function Dropbox#filesCopyBatchV2
   * @arg {Object} arg - The request parameters.
   * @returns {Promise.<DropboxResponse<FilesRelocationBatchV2Launch>, DropboxResponseError.<void>>}
   */


  routes.filesCopyBatchV2 = function (arg) {
    return this.request('files/copy_batch_v2', arg, 'user', 'api', 'rpc');
  };
  /**
   * Copy multiple files or folders to different locations at once in the user's
   * Dropbox. This route will return job ID immediately and do the async copy job
   * in background. Please use copy_batch/check to check the job status.
   * @function Dropbox#filesCopyBatch
   * @deprecated
   * @arg {FilesRelocationBatchArg} arg - The request parameters.
   * @returns {Promise.<DropboxResponse<FilesRelocationBatchLaunch>, DropboxResponseError.<void>>}
   */


  routes.filesCopyBatch = function (arg) {
    return this.request('files/copy_batch', arg, 'user', 'api', 'rpc');
  };
  /**
   * Returns the status of an asynchronous job for copy_batch_v2. It returns list
   * of results for each entry.
   * @function Dropbox#filesCopyBatchCheckV2
   * @arg {AsyncPollArg} arg - The request parameters.
   * @returns {Promise.<DropboxResponse<FilesRelocationBatchV2JobStatus>, DropboxResponseError.<AsyncPollError>>}
   */


  routes.filesCopyBatchCheckV2 = function (arg) {
    return this.request('files/copy_batch/check_v2', arg, 'user', 'api', 'rpc');
  };
  /**
   * Returns the status of an asynchronous job for copy_batch. If success, it
   * returns list of results for each entry.
   * @function Dropbox#filesCopyBatchCheck
   * @deprecated
   * @arg {AsyncPollArg} arg - The request parameters.
   * @returns {Promise.<DropboxResponse<FilesRelocationBatchJobStatus>, DropboxResponseError.<AsyncPollError>>}
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
   * @returns {Promise.<DropboxResponse<FilesGetCopyReferenceResult>, DropboxResponseError.<FilesGetCopyReferenceError>>}
   */


  routes.filesCopyReferenceGet = function (arg) {
    return this.request('files/copy_reference/get', arg, 'user', 'api', 'rpc');
  };
  /**
   * Save a copy reference returned by copy_reference/get to the user's Dropbox.
   * @function Dropbox#filesCopyReferenceSave
   * @arg {FilesSaveCopyReferenceArg} arg - The request parameters.
   * @returns {Promise.<DropboxResponse<FilesSaveCopyReferenceResult>, DropboxResponseError.<FilesSaveCopyReferenceError>>}
   */


  routes.filesCopyReferenceSave = function (arg) {
    return this.request('files/copy_reference/save', arg, 'user', 'api', 'rpc');
  };
  /**
   * Create a folder at a given path.
   * @function Dropbox#filesCreateFolderV2
   * @arg {FilesCreateFolderArg} arg - The request parameters.
   * @returns {Promise.<DropboxResponse<FilesCreateFolderResult>, DropboxResponseError.<FilesCreateFolderError>>}
   */


  routes.filesCreateFolderV2 = function (arg) {
    return this.request('files/create_folder_v2', arg, 'user', 'api', 'rpc');
  };
  /**
   * Create a folder at a given path.
   * @function Dropbox#filesCreateFolder
   * @deprecated
   * @arg {FilesCreateFolderArg} arg - The request parameters.
   * @returns {Promise.<DropboxResponse<FilesFolderMetadata>, DropboxResponseError.<FilesCreateFolderError>>}
   */


  routes.filesCreateFolder = function (arg) {
    return this.request('files/create_folder', arg, 'user', 'api', 'rpc');
  };
  /**
   * Create multiple folders at once. This route is asynchronous for large
   * batches, which returns a job ID immediately and runs the create folder batch
   * asynchronously. Otherwise, creates the folders and returns the result
   * synchronously for smaller inputs. You can force asynchronous behaviour by
   * using the CreateFolderBatchArg.force_async flag.  Use
   * create_folder_batch/check to check the job status.
   * @function Dropbox#filesCreateFolderBatch
   * @arg {FilesCreateFolderBatchArg} arg - The request parameters.
   * @returns {Promise.<DropboxResponse<FilesCreateFolderBatchLaunch>, DropboxResponseError.<void>>}
   */


  routes.filesCreateFolderBatch = function (arg) {
    return this.request('files/create_folder_batch', arg, 'user', 'api', 'rpc');
  };
  /**
   * Returns the status of an asynchronous job for create_folder_batch. If
   * success, it returns list of result for each entry.
   * @function Dropbox#filesCreateFolderBatchCheck
   * @arg {AsyncPollArg} arg - The request parameters.
   * @returns {Promise.<DropboxResponse<FilesCreateFolderBatchJobStatus>, DropboxResponseError.<AsyncPollError>>}
   */


  routes.filesCreateFolderBatchCheck = function (arg) {
    return this.request('files/create_folder_batch/check', arg, 'user', 'api', 'rpc');
  };
  /**
   * Delete the file or folder at a given path. If the path is a folder, all its
   * contents will be deleted too. A successful response indicates that the file
   * or folder was deleted. The returned metadata will be the corresponding
   * FileMetadata or FolderMetadata for the item at time of deletion, and not a
   * DeletedMetadata object.
   * @function Dropbox#filesDeleteV2
   * @arg {FilesDeleteArg} arg - The request parameters.
   * @returns {Promise.<DropboxResponse<FilesDeleteResult>, DropboxResponseError.<FilesDeleteError>>}
   */


  routes.filesDeleteV2 = function (arg) {
    return this.request('files/delete_v2', arg, 'user', 'api', 'rpc');
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
   * @returns {Promise.<DropboxResponse<(FilesFileMetadata|FilesFolderMetadata|FilesDeletedMetadata)>, DropboxResponseError.<FilesDeleteError>>}
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
   * @returns {Promise.<DropboxResponse<FilesDeleteBatchLaunch>, DropboxResponseError.<void>>}
   */


  routes.filesDeleteBatch = function (arg) {
    return this.request('files/delete_batch', arg, 'user', 'api', 'rpc');
  };
  /**
   * Returns the status of an asynchronous job for delete_batch. If success, it
   * returns list of result for each entry.
   * @function Dropbox#filesDeleteBatchCheck
   * @arg {AsyncPollArg} arg - The request parameters.
   * @returns {Promise.<DropboxResponse<FilesDeleteBatchJobStatus>, DropboxResponseError.<AsyncPollError>>}
   */


  routes.filesDeleteBatchCheck = function (arg) {
    return this.request('files/delete_batch/check', arg, 'user', 'api', 'rpc');
  };
  /**
   * Download a file from a user's Dropbox.
   * @function Dropbox#filesDownload
   * @arg {FilesDownloadArg} arg - The request parameters.
   * @returns {Promise.<DropboxResponse<FilesFileMetadata>, DropboxResponseError.<FilesDownloadError>>}
   */


  routes.filesDownload = function (arg) {
    return this.request('files/download', arg, 'user', 'content', 'download');
  };
  /**
   * Download a folder from the user's Dropbox, as a zip file. The folder must be
   * less than 20 GB in size and any single file within must be less than 4 GB in
   * size. The resulting zip must have fewer than 10,000 total file and folder
   * entries, including the top level folder. The input cannot be a single file.
   * @function Dropbox#filesDownloadZip
   * @arg {FilesDownloadZipArg} arg - The request parameters.
   * @returns {Promise.<DropboxResponse<FilesDownloadZipResult>, DropboxResponseError.<FilesDownloadZipError>>}
   */


  routes.filesDownloadZip = function (arg) {
    return this.request('files/download_zip', arg, 'user', 'content', 'download');
  };
  /**
   * Export a file from a user's Dropbox. This route only supports exporting files
   * that cannot be downloaded directly  and whose ExportResult.file_metadata has
   * ExportInfo.export_as populated.
   * @function Dropbox#filesExport
   * @arg {FilesExportArg} arg - The request parameters.
   * @returns {Promise.<DropboxResponse<FilesExportResult>, DropboxResponseError.<FilesExportError>>}
   */


  routes.filesExport = function (arg) {
    return this.request('files/export', arg, 'user', 'content', 'download');
  };
  /**
   * Return the lock metadata for the given list of paths.
   * @function Dropbox#filesGetFileLockBatch
   * @arg {FilesLockFileBatchArg} arg - The request parameters.
   * @returns {Promise.<DropboxResponse<FilesLockFileBatchResult>, DropboxResponseError.<FilesLockFileError>>}
   */


  routes.filesGetFileLockBatch = function (arg) {
    return this.request('files/get_file_lock_batch', arg, 'user', 'api', 'rpc');
  };
  /**
   * Returns the metadata for a file or folder. Note: Metadata for the root folder
   * is unsupported.
   * @function Dropbox#filesGetMetadata
   * @arg {FilesGetMetadataArg} arg - The request parameters.
   * @returns {Promise.<DropboxResponse<(FilesFileMetadata|FilesFolderMetadata|FilesDeletedMetadata)>, DropboxResponseError.<FilesGetMetadataError>>}
   */


  routes.filesGetMetadata = function (arg) {
    return this.request('files/get_metadata', arg, 'user', 'api', 'rpc');
  };
  /**
   * Get a preview for a file. Currently, PDF previews are generated for files
   * with the following extensions: .ai, .doc, .docm, .docx, .eps, .gdoc,
   * .gslides, .odp, .odt, .pps, .ppsm, .ppsx, .ppt, .pptm, .pptx, .rtf. HTML
   * previews are generated for files with the following extensions: .csv, .ods,
   * .xls, .xlsm, .gsheet, .xlsx. Other formats will return an unsupported
   * extension error.
   * @function Dropbox#filesGetPreview
   * @arg {FilesPreviewArg} arg - The request parameters.
   * @returns {Promise.<DropboxResponse<FilesFileMetadata>, DropboxResponseError.<FilesPreviewError>>}
   */


  routes.filesGetPreview = function (arg) {
    return this.request('files/get_preview', arg, 'user', 'content', 'download');
  };
  /**
   * Get a temporary link to stream content of a file. This link will expire in
   * four hours and afterwards you will get 410 Gone. This URL should not be used
   * to display content directly in the browser. The Content-Type of the link is
   * determined automatically by the file's mime type.
   * @function Dropbox#filesGetTemporaryLink
   * @arg {FilesGetTemporaryLinkArg} arg - The request parameters.
   * @returns {Promise.<DropboxResponse<FilesGetTemporaryLinkResult>, DropboxResponseError.<FilesGetTemporaryLinkError>>}
   */


  routes.filesGetTemporaryLink = function (arg) {
    return this.request('files/get_temporary_link', arg, 'user', 'api', 'rpc');
  };
  /**
   * Get a one-time use temporary upload link to upload a file to a Dropbox
   * location.  This endpoint acts as a delayed upload. The returned temporary
   * upload link may be used to make a POST request with the data to be uploaded.
   * The upload will then be perfomed with the CommitInfo previously provided to
   * get_temporary_upload_link but evaluated only upon consumption. Hence, errors
   * stemming from invalid CommitInfo with respect to the state of the user's
   * Dropbox will only be communicated at consumption time. Additionally, these
   * errors are surfaced as generic HTTP 409 Conflict responses, potentially
   * hiding issue details. The maximum temporary upload link duration is 4 hours.
   * Upon consumption or expiration, a new link will have to be generated.
   * Multiple links may exist for a specific upload path at any given time.  The
   * POST request on the temporary upload link must have its Content-Type set to
   * "application/octet-stream".  Example temporary upload link consumption
   * request:  curl -X POST
   * https://content.dropboxapi.com/apitul/1/bNi2uIYF51cVBND --header
   * "Content-Type: application/octet-stream" --data-binary @local_file.txt  A
   * successful temporary upload link consumption request returns the content hash
   * of the uploaded data in JSON format.  Example successful temporary upload
   * link consumption response: {"content-hash":
   * "599d71033d700ac892a0e48fa61b125d2f5994"}  An unsuccessful temporary upload
   * link consumption request returns any of the following status codes:  HTTP 400
   * Bad Request: Content-Type is not one of application/octet-stream and
   * text/plain or request is invalid. HTTP 409 Conflict: The temporary upload
   * link does not exist or is currently unavailable, the upload failed, or
   * another error happened. HTTP 410 Gone: The temporary upload link is expired
   * or consumed.  Example unsuccessful temporary upload link consumption
   * response: Temporary upload link has been recently consumed.
   * @function Dropbox#filesGetTemporaryUploadLink
   * @arg {FilesGetTemporaryUploadLinkArg} arg - The request parameters.
   * @returns {Promise.<DropboxResponse<FilesGetTemporaryUploadLinkResult>, DropboxResponseError.<void>>}
   */


  routes.filesGetTemporaryUploadLink = function (arg) {
    return this.request('files/get_temporary_upload_link', arg, 'user', 'api', 'rpc');
  };
  /**
   * Get a thumbnail for an image. This method currently supports files with the
   * following file extensions: jpg, jpeg, png, tiff, tif, gif, webp, ppm and bmp.
   * Photos that are larger than 20MB in size won't be converted to a thumbnail.
   * @function Dropbox#filesGetThumbnail
   * @arg {FilesThumbnailArg} arg - The request parameters.
   * @returns {Promise.<DropboxResponse<FilesFileMetadata>, DropboxResponseError.<FilesThumbnailError>>}
   */


  routes.filesGetThumbnail = function (arg) {
    return this.request('files/get_thumbnail', arg, 'user', 'content', 'download');
  };
  /**
   * Get a thumbnail for an image. This method currently supports files with the
   * following file extensions: jpg, jpeg, png, tiff, tif, gif, webp, ppm and bmp.
   * Photos that are larger than 20MB in size won't be converted to a thumbnail.
   * @function Dropbox#filesGetThumbnailV2
   * @arg {FilesThumbnailV2Arg} arg - The request parameters.
   * @returns {Promise.<DropboxResponse<FilesPreviewResult>, DropboxResponseError.<FilesThumbnailV2Error>>}
   */


  routes.filesGetThumbnailV2 = function (arg) {
    return this.request('files/get_thumbnail_v2', arg, 'app, user', 'content', 'download');
  };
  /**
   * Get thumbnails for a list of images. We allow up to 25 thumbnails in a single
   * batch. This method currently supports files with the following file
   * extensions: jpg, jpeg, png, tiff, tif, gif, webp, ppm and bmp. Photos that
   * are larger than 20MB in size won't be converted to a thumbnail.
   * @function Dropbox#filesGetThumbnailBatch
   * @arg {FilesGetThumbnailBatchArg} arg - The request parameters.
   * @returns {Promise.<DropboxResponse<FilesGetThumbnailBatchResult>, DropboxResponseError.<FilesGetThumbnailBatchError>>}
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
   * @returns {Promise.<DropboxResponse<FilesListFolderResult>, DropboxResponseError.<FilesListFolderError>>}
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
   * @returns {Promise.<DropboxResponse<FilesListFolderResult>, DropboxResponseError.<FilesListFolderContinueError>>}
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
   * @returns {Promise.<DropboxResponse<FilesListFolderGetLatestCursorResult>, DropboxResponseError.<FilesListFolderError>>}
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
   * @returns {Promise.<DropboxResponse<FilesListFolderLongpollResult>, DropboxResponseError.<FilesListFolderLongpollError>>}
   */


  routes.filesListFolderLongpoll = function (arg) {
    return this.request('files/list_folder/longpoll', arg, 'noauth', 'notify', 'rpc');
  };
  /**
   * Returns revisions for files based on a file path or a file id. The file path
   * or file id is identified from the latest file entry at the given file path or
   * id. This end point allows your app to query either by file path or file id by
   * setting the mode parameter appropriately. In the ListRevisionsMode.path
   * (default) mode, all revisions at the same file path as the latest file entry
   * are returned. If revisions with the same file id are desired, then mode must
   * be set to ListRevisionsMode.id. The ListRevisionsMode.id mode is useful to
   * retrieve revisions for a given file across moves or renames.
   * @function Dropbox#filesListRevisions
   * @arg {FilesListRevisionsArg} arg - The request parameters.
   * @returns {Promise.<DropboxResponse<FilesListRevisionsResult>, DropboxResponseError.<FilesListRevisionsError>>}
   */


  routes.filesListRevisions = function (arg) {
    return this.request('files/list_revisions', arg, 'user', 'api', 'rpc');
  };
  /**
   * Lock the files at the given paths. A locked file will be writable only by the
   * lock holder. A successful response indicates that the file has been locked.
   * Returns a list of the locked file paths and their metadata after this
   * operation.
   * @function Dropbox#filesLockFileBatch
   * @arg {FilesLockFileBatchArg} arg - The request parameters.
   * @returns {Promise.<DropboxResponse<FilesLockFileBatchResult>, DropboxResponseError.<FilesLockFileError>>}
   */


  routes.filesLockFileBatch = function (arg) {
    return this.request('files/lock_file_batch', arg, 'user', 'api', 'rpc');
  };
  /**
   * Move a file or folder to a different location in the user's Dropbox. If the
   * source path is a folder all its contents will be moved. Note that we do not
   * currently support case-only renaming.
   * @function Dropbox#filesMoveV2
   * @arg {FilesRelocationArg} arg - The request parameters.
   * @returns {Promise.<DropboxResponse<FilesRelocationResult>, DropboxResponseError.<FilesRelocationError>>}
   */


  routes.filesMoveV2 = function (arg) {
    return this.request('files/move_v2', arg, 'user', 'api', 'rpc');
  };
  /**
   * Move a file or folder to a different location in the user's Dropbox. If the
   * source path is a folder all its contents will be moved.
   * @function Dropbox#filesMove
   * @deprecated
   * @arg {FilesRelocationArg} arg - The request parameters.
   * @returns {Promise.<DropboxResponse<(FilesFileMetadata|FilesFolderMetadata|FilesDeletedMetadata)>, DropboxResponseError.<FilesRelocationError>>}
   */


  routes.filesMove = function (arg) {
    return this.request('files/move', arg, 'user', 'api', 'rpc');
  };
  /**
   * Move multiple files or folders to different locations at once in the user's
   * Dropbox. Note that we do not currently support case-only renaming. This route
   * will replace move_batch. The main difference is this route will return status
   * for each entry, while move_batch raises failure if any entry fails. This
   * route will either finish synchronously, or return a job ID and do the async
   * move job in background. Please use move_batch/check_v2 to check the job
   * status.
   * @function Dropbox#filesMoveBatchV2
   * @arg {FilesMoveBatchArg} arg - The request parameters.
   * @returns {Promise.<DropboxResponse<FilesRelocationBatchV2Launch>, DropboxResponseError.<void>>}
   */


  routes.filesMoveBatchV2 = function (arg) {
    return this.request('files/move_batch_v2', arg, 'user', 'api', 'rpc');
  };
  /**
   * Move multiple files or folders to different locations at once in the user's
   * Dropbox. This route will return job ID immediately and do the async moving
   * job in background. Please use move_batch/check to check the job status.
   * @function Dropbox#filesMoveBatch
   * @deprecated
   * @arg {FilesRelocationBatchArg} arg - The request parameters.
   * @returns {Promise.<DropboxResponse<FilesRelocationBatchLaunch>, DropboxResponseError.<void>>}
   */


  routes.filesMoveBatch = function (arg) {
    return this.request('files/move_batch', arg, 'user', 'api', 'rpc');
  };
  /**
   * Returns the status of an asynchronous job for move_batch_v2. It returns list
   * of results for each entry.
   * @function Dropbox#filesMoveBatchCheckV2
   * @arg {AsyncPollArg} arg - The request parameters.
   * @returns {Promise.<DropboxResponse<FilesRelocationBatchV2JobStatus>, DropboxResponseError.<AsyncPollError>>}
   */


  routes.filesMoveBatchCheckV2 = function (arg) {
    return this.request('files/move_batch/check_v2', arg, 'user', 'api', 'rpc');
  };
  /**
   * Returns the status of an asynchronous job for move_batch. If success, it
   * returns list of results for each entry.
   * @function Dropbox#filesMoveBatchCheck
   * @deprecated
   * @arg {AsyncPollArg} arg - The request parameters.
   * @returns {Promise.<DropboxResponse<FilesRelocationBatchJobStatus>, DropboxResponseError.<AsyncPollError>>}
   */


  routes.filesMoveBatchCheck = function (arg) {
    return this.request('files/move_batch/check', arg, 'user', 'api', 'rpc');
  };
  /**
   * Creates a new Paper doc with the provided content.
   * @function Dropbox#filesPaperCreate
   * @arg {FilesPaperCreateArg} arg - The request parameters.
   * @returns {Promise.<DropboxResponse<FilesPaperCreateResult>, DropboxResponseError.<FilesPaperCreateError>>}
   */


  routes.filesPaperCreate = function (arg) {
    return this.request('files/paper/create', arg, 'user', 'api', 'upload');
  };
  /**
   * Updates an existing Paper doc with the provided content.
   * @function Dropbox#filesPaperUpdate
   * @arg {FilesPaperUpdateArg} arg - The request parameters.
   * @returns {Promise.<DropboxResponse<FilesPaperUpdateResult>, DropboxResponseError.<FilesPaperUpdateError>>}
   */


  routes.filesPaperUpdate = function (arg) {
    return this.request('files/paper/update', arg, 'user', 'api', 'upload');
  };
  /**
   * Permanently delete the file or folder at a given path (see
   * https://www.dropbox.com/en/help/40). If the given file or folder is not yet
   * deleted, this route will first delete it. It is possible for this route to
   * successfully delete, then fail to permanently delete. Note: This endpoint is
   * only available for Dropbox Business apps.
   * @function Dropbox#filesPermanentlyDelete
   * @arg {FilesDeleteArg} arg - The request parameters.
   * @returns {Promise.<DropboxResponse<void>, DropboxResponseError.<FilesDeleteError>>}
   */


  routes.filesPermanentlyDelete = function (arg) {
    return this.request('files/permanently_delete', arg, 'user', 'api', 'rpc');
  };
  /**
   * @function Dropbox#filesPropertiesAdd
   * @deprecated
   * @arg {FilePropertiesAddPropertiesArg} arg - The request parameters.
   * @returns {Promise.<DropboxResponse<void>, DropboxResponseError.<FilePropertiesAddPropertiesError>>}
   */


  routes.filesPropertiesAdd = function (arg) {
    return this.request('files/properties/add', arg, 'user', 'api', 'rpc');
  };
  /**
   * @function Dropbox#filesPropertiesOverwrite
   * @deprecated
   * @arg {FilePropertiesOverwritePropertyGroupArg} arg - The request parameters.
   * @returns {Promise.<DropboxResponse<void>, DropboxResponseError.<FilePropertiesInvalidPropertyGroupError>>}
   */


  routes.filesPropertiesOverwrite = function (arg) {
    return this.request('files/properties/overwrite', arg, 'user', 'api', 'rpc');
  };
  /**
   * @function Dropbox#filesPropertiesRemove
   * @deprecated
   * @arg {FilePropertiesRemovePropertiesArg} arg - The request parameters.
   * @returns {Promise.<DropboxResponse<void>, DropboxResponseError.<FilePropertiesRemovePropertiesError>>}
   */


  routes.filesPropertiesRemove = function (arg) {
    return this.request('files/properties/remove', arg, 'user', 'api', 'rpc');
  };
  /**
   * @function Dropbox#filesPropertiesTemplateGet
   * @deprecated
   * @arg {FilePropertiesGetTemplateArg} arg - The request parameters.
   * @returns {Promise.<DropboxResponse<FilePropertiesGetTemplateResult>, DropboxResponseError.<FilePropertiesTemplateError>>}
   */


  routes.filesPropertiesTemplateGet = function (arg) {
    return this.request('files/properties/template/get', arg, 'user', 'api', 'rpc');
  };
  /**
   * @function Dropbox#filesPropertiesTemplateList
   * @deprecated
   * @returns {Promise.<DropboxResponse<FilePropertiesListTemplateResult>, DropboxResponseError.<FilePropertiesTemplateError>>}
   */


  routes.filesPropertiesTemplateList = function () {
    return this.request('files/properties/template/list', null, 'user', 'api', 'rpc');
  };
  /**
   * @function Dropbox#filesPropertiesUpdate
   * @deprecated
   * @arg {FilePropertiesUpdatePropertiesArg} arg - The request parameters.
   * @returns {Promise.<DropboxResponse<void>, DropboxResponseError.<FilePropertiesUpdatePropertiesError>>}
   */


  routes.filesPropertiesUpdate = function (arg) {
    return this.request('files/properties/update', arg, 'user', 'api', 'rpc');
  };
  /**
   * Restore a specific revision of a file to the given path.
   * @function Dropbox#filesRestore
   * @arg {FilesRestoreArg} arg - The request parameters.
   * @returns {Promise.<DropboxResponse<FilesFileMetadata>, DropboxResponseError.<FilesRestoreError>>}
   */


  routes.filesRestore = function (arg) {
    return this.request('files/restore', arg, 'user', 'api', 'rpc');
  };
  /**
   * Save the data from a specified URL into a file in user's Dropbox. Note that
   * the transfer from the URL must complete within 5 minutes, or the operation
   * will time out and the job will fail. If the given path already exists, the
   * file will be renamed to avoid the conflict (e.g. myfile (1).txt).
   * @function Dropbox#filesSaveUrl
   * @arg {FilesSaveUrlArg} arg - The request parameters.
   * @returns {Promise.<DropboxResponse<FilesSaveUrlResult>, DropboxResponseError.<FilesSaveUrlError>>}
   */


  routes.filesSaveUrl = function (arg) {
    return this.request('files/save_url', arg, 'user', 'api', 'rpc');
  };
  /**
   * Check the status of a save_url job.
   * @function Dropbox#filesSaveUrlCheckJobStatus
   * @arg {AsyncPollArg} arg - The request parameters.
   * @returns {Promise.<DropboxResponse<FilesSaveUrlJobStatus>, DropboxResponseError.<AsyncPollError>>}
   */


  routes.filesSaveUrlCheckJobStatus = function (arg) {
    return this.request('files/save_url/check_job_status', arg, 'user', 'api', 'rpc');
  };
  /**
   * Searches for files and folders. Note: Recent changes will be reflected in
   * search results within a few seconds and older revisions of existing files may
   * still match your query for up to a few days.
   * @function Dropbox#filesSearch
   * @deprecated
   * @arg {FilesSearchArg} arg - The request parameters.
   * @returns {Promise.<DropboxResponse<FilesSearchResult>, DropboxResponseError.<FilesSearchError>>}
   */


  routes.filesSearch = function (arg) {
    return this.request('files/search', arg, 'user', 'api', 'rpc');
  };
  /**
   * Searches for files and folders. Note: search_v2 along with search/continue_v2
   * can only be used to retrieve a maximum of 10,000 matches. Recent changes may
   * not immediately be reflected in search results due to a short delay in
   * indexing. Duplicate results may be returned across pages. Some results may
   * not be returned.
   * @function Dropbox#filesSearchV2
   * @arg {FilesSearchV2Arg} arg - The request parameters.
   * @returns {Promise.<DropboxResponse<FilesSearchV2Result>, DropboxResponseError.<FilesSearchError>>}
   */


  routes.filesSearchV2 = function (arg) {
    return this.request('files/search_v2', arg, 'user', 'api', 'rpc');
  };
  /**
   * Fetches the next page of search results returned from search_v2. Note:
   * search_v2 along with search/continue_v2 can only be used to retrieve a
   * maximum of 10,000 matches. Recent changes may not immediately be reflected in
   * search results due to a short delay in indexing. Duplicate results may be
   * returned across pages. Some results may not be returned.
   * @function Dropbox#filesSearchContinueV2
   * @arg {FilesSearchV2ContinueArg} arg - The request parameters.
   * @returns {Promise.<DropboxResponse<FilesSearchV2Result>, DropboxResponseError.<FilesSearchError>>}
   */


  routes.filesSearchContinueV2 = function (arg) {
    return this.request('files/search/continue_v2', arg, 'user', 'api', 'rpc');
  };
  /**
   * Unlock the files at the given paths. A locked file can only be unlocked by
   * the lock holder or, if a business account, a team admin. A successful
   * response indicates that the file has been unlocked. Returns a list of the
   * unlocked file paths and their metadata after this operation.
   * @function Dropbox#filesUnlockFileBatch
   * @arg {FilesUnlockFileBatchArg} arg - The request parameters.
   * @returns {Promise.<DropboxResponse<FilesLockFileBatchResult>, DropboxResponseError.<FilesLockFileError>>}
   */


  routes.filesUnlockFileBatch = function (arg) {
    return this.request('files/unlock_file_batch', arg, 'user', 'api', 'rpc');
  };
  /**
   * Create a new file with the contents provided in the request. Do not use this
   * to upload a file larger than 150 MB. Instead, create an upload session with
   * upload_session/start. Calls to this endpoint will count as data transport
   * calls for any Dropbox Business teams with a limit on the number of data
   * transport calls allowed per month. For more information, see the Data
   * transport limit page
   * https://www.dropbox.com/developers/reference/data-transport-limit.
   * @function Dropbox#filesUpload
   * @arg {FilesCommitInfo} arg - The request parameters.
   * @returns {Promise.<DropboxResponse<FilesFileMetadata>, DropboxResponseError.<FilesUploadError>>}
   */


  routes.filesUpload = function (arg) {
    return this.request('files/upload', arg, 'user', 'content', 'upload');
  };
  /**
   * Append more data to an upload session. When the parameter close is set, this
   * call will close the session. A single request should not upload more than 150
   * MB. The maximum size of a file one can upload to an upload session is 350 GB.
   * Calls to this endpoint will count as data transport calls for any Dropbox
   * Business teams with a limit on the number of data transport calls allowed per
   * month. For more information, see the Data transport limit page
   * https://www.dropbox.com/developers/reference/data-transport-limit.
   * @function Dropbox#filesUploadSessionAppendV2
   * @arg {FilesUploadSessionAppendArg} arg - The request parameters.
   * @returns {Promise.<DropboxResponse<void>, DropboxResponseError.<FilesUploadSessionLookupError>>}
   */


  routes.filesUploadSessionAppendV2 = function (arg) {
    return this.request('files/upload_session/append_v2', arg, 'user', 'content', 'upload');
  };
  /**
   * Append more data to an upload session. A single request should not upload
   * more than 150 MB. The maximum size of a file one can upload to an upload
   * session is 350 GB. Calls to this endpoint will count as data transport calls
   * for any Dropbox Business teams with a limit on the number of data transport
   * calls allowed per month. For more information, see the Data transport limit
   * page https://www.dropbox.com/developers/reference/data-transport-limit.
   * @function Dropbox#filesUploadSessionAppend
   * @deprecated
   * @arg {FilesUploadSessionCursor} arg - The request parameters.
   * @returns {Promise.<DropboxResponse<void>, DropboxResponseError.<FilesUploadSessionLookupError>>}
   */


  routes.filesUploadSessionAppend = function (arg) {
    return this.request('files/upload_session/append', arg, 'user', 'content', 'upload');
  };
  /**
   * Finish an upload session and save the uploaded data to the given file path. A
   * single request should not upload more than 150 MB. The maximum size of a file
   * one can upload to an upload session is 350 GB. Calls to this endpoint will
   * count as data transport calls for any Dropbox Business teams with a limit on
   * the number of data transport calls allowed per month. For more information,
   * see the Data transport limit page
   * https://www.dropbox.com/developers/reference/data-transport-limit.
   * @function Dropbox#filesUploadSessionFinish
   * @arg {FilesUploadSessionFinishArg} arg - The request parameters.
   * @returns {Promise.<DropboxResponse<FilesFileMetadata>, DropboxResponseError.<FilesUploadSessionFinishError>>}
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
   * for the last upload_session/start or upload_session/append_v2 call. The
   * maximum size of a file one can upload to an upload session is 350 GB. This
   * route will return a job_id immediately and do the async commit job in
   * background. Use upload_session/finish_batch/check to check the job status.
   * For the same account, this route should be executed serially. That means you
   * should not start the next job before current job finishes. We allow up to
   * 1000 entries in a single request. Calls to this endpoint will count as data
   * transport calls for any Dropbox Business teams with a limit on the number of
   * data transport calls allowed per month. For more information, see the Data
   * transport limit page
   * https://www.dropbox.com/developers/reference/data-transport-limit.
   * @function Dropbox#filesUploadSessionFinishBatch
   * @arg {FilesUploadSessionFinishBatchArg} arg - The request parameters.
   * @returns {Promise.<DropboxResponse<FilesUploadSessionFinishBatchLaunch>, DropboxResponseError.<void>>}
   */


  routes.filesUploadSessionFinishBatch = function (arg) {
    return this.request('files/upload_session/finish_batch', arg, 'user', 'api', 'rpc');
  };
  /**
   * Returns the status of an asynchronous job for upload_session/finish_batch. If
   * success, it returns list of result for each entry.
   * @function Dropbox#filesUploadSessionFinishBatchCheck
   * @arg {AsyncPollArg} arg - The request parameters.
   * @returns {Promise.<DropboxResponse<FilesUploadSessionFinishBatchJobStatus>, DropboxResponseError.<AsyncPollError>>}
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
   * than 150 MB. The maximum size of a file one can upload to an upload session
   * is 350 GB. An upload session can be used for a maximum of 7 days. Attempting
   * to use an UploadSessionStartResult.session_id with upload_session/append_v2
   * or upload_session/finish more than 7 days after its creation will return a
   * UploadSessionLookupError.not_found. Calls to this endpoint will count as data
   * transport calls for any Dropbox Business teams with a limit on the number of
   * data transport calls allowed per month. For more information, see the Data
   * transport limit page
   * https://www.dropbox.com/developers/reference/data-transport-limit. By
   * default, upload sessions require you to send content of the file in
   * sequential order via consecutive upload_session/start,
   * upload_session/append_v2, upload_session/finish calls. For better
   * performance, you can instead optionally use a UploadSessionType.concurrent
   * upload session. To start a new concurrent session, set
   * UploadSessionStartArg.session_type to UploadSessionType.concurrent. After
   * that, you can send file data in concurrent upload_session/append_v2 requests.
   * Finally finish the session with upload_session/finish. There are couple of
   * constraints with concurrent sessions to make them work. You can not send data
   * with upload_session/start or upload_session/finish call, only with
   * upload_session/append_v2 call. Also data uploaded in upload_session/append_v2
   * call must be multiple of 4194304 bytes (except for last
   * upload_session/append_v2 with UploadSessionStartArg.close to true, that may
   * contain any remaining data).
   * @function Dropbox#filesUploadSessionStart
   * @arg {FilesUploadSessionStartArg} arg - The request parameters.
   * @returns {Promise.<DropboxResponse<FilesUploadSessionStartResult>, DropboxResponseError.<FilesUploadSessionStartError>>}
   */


  routes.filesUploadSessionStart = function (arg) {
    return this.request('files/upload_session/start', arg, 'user', 'content', 'upload');
  };
  /**
   * Marks the given Paper doc as archived. This action can be performed or undone
   * by anyone with edit permissions to the doc. Note that this endpoint will
   * continue to work for content created by users on the older version of Paper.
   * To check which version of Paper a user is on, use /users/features/get_values.
   * If the paper_as_files feature is enabled, then the user is running the new
   * version of Paper. This endpoint will be retired in September 2020. Refer to
   * the Paper Migration Guide
   * https://www.dropbox.com/lp/developers/reference/paper-migration-guide for
   * more information.
   * @function Dropbox#paperDocsArchive
   * @deprecated
   * @arg {PaperRefPaperDoc} arg - The request parameters.
   * @returns {Promise.<DropboxResponse<void>, DropboxResponseError.<PaperDocLookupError>>}
   */


  routes.paperDocsArchive = function (arg) {
    return this.request('paper/docs/archive', arg, 'user', 'api', 'rpc');
  };
  /**
   * Creates a new Paper doc with the provided content. Note that this endpoint
   * will continue to work for content created by users on the older version of
   * Paper. To check which version of Paper a user is on, use
   * /users/features/get_values. If the paper_as_files feature is enabled, then
   * the user is running the new version of Paper. This endpoint will be retired
   * in September 2020. Refer to the Paper Migration Guide
   * https://www.dropbox.com/lp/developers/reference/paper-migration-guide for
   * more information.
   * @function Dropbox#paperDocsCreate
   * @deprecated
   * @arg {PaperPaperDocCreateArgs} arg - The request parameters.
   * @returns {Promise.<DropboxResponse<PaperPaperDocCreateUpdateResult>, DropboxResponseError.<PaperPaperDocCreateError>>}
   */


  routes.paperDocsCreate = function (arg) {
    return this.request('paper/docs/create', arg, 'user', 'api', 'upload');
  };
  /**
   * Exports and downloads Paper doc either as HTML or markdown. Note that this
   * endpoint will continue to work for content created by users on the older
   * version of Paper. To check which version of Paper a user is on, use
   * /users/features/get_values. If the paper_as_files feature is enabled, then
   * the user is running the new version of Paper. Refer to the Paper Migration
   * Guide https://www.dropbox.com/lp/developers/reference/paper-migration-guide
   * for migration information.
   * @function Dropbox#paperDocsDownload
   * @deprecated
   * @arg {PaperPaperDocExport} arg - The request parameters.
   * @returns {Promise.<DropboxResponse<PaperPaperDocExportResult>, DropboxResponseError.<PaperDocLookupError>>}
   */


  routes.paperDocsDownload = function (arg) {
    return this.request('paper/docs/download', arg, 'user', 'api', 'download');
  };
  /**
   * Lists the users who are explicitly invited to the Paper folder in which the
   * Paper doc is contained. For private folders all users (including owner)
   * shared on the folder are listed and for team folders all non-team users
   * shared on the folder are returned. Note that this endpoint will continue to
   * work for content created by users on the older version of Paper. To check
   * which version of Paper a user is on, use /users/features/get_values. If the
   * paper_as_files feature is enabled, then the user is running the new version
   * of Paper. Refer to the Paper Migration Guide
   * https://www.dropbox.com/lp/developers/reference/paper-migration-guide for
   * migration information.
   * @function Dropbox#paperDocsFolderUsersList
   * @deprecated
   * @arg {PaperListUsersOnFolderArgs} arg - The request parameters.
   * @returns {Promise.<DropboxResponse<PaperListUsersOnFolderResponse>, DropboxResponseError.<PaperDocLookupError>>}
   */


  routes.paperDocsFolderUsersList = function (arg) {
    return this.request('paper/docs/folder_users/list', arg, 'user', 'api', 'rpc');
  };
  /**
   * Once a cursor has been retrieved from docs/folder_users/list, use this to
   * paginate through all users on the Paper folder. Note that this endpoint will
   * continue to work for content created by users on the older version of Paper.
   * To check which version of Paper a user is on, use /users/features/get_values.
   * If the paper_as_files feature is enabled, then the user is running the new
   * version of Paper. Refer to the Paper Migration Guide
   * https://www.dropbox.com/lp/developers/reference/paper-migration-guide for
   * migration information.
   * @function Dropbox#paperDocsFolderUsersListContinue
   * @deprecated
   * @arg {PaperListUsersOnFolderContinueArgs} arg - The request parameters.
   * @returns {Promise.<DropboxResponse<PaperListUsersOnFolderResponse>, DropboxResponseError.<PaperListUsersCursorError>>}
   */


  routes.paperDocsFolderUsersListContinue = function (arg) {
    return this.request('paper/docs/folder_users/list/continue', arg, 'user', 'api', 'rpc');
  };
  /**
   * Retrieves folder information for the given Paper doc. This includes:   -
   * folder sharing policy; permissions for subfolders are set by the top-level
   * folder.   - full 'filepath', i.e. the list of folders (both folderId and
   * folderName) from     the root folder to the folder directly containing the
   * Paper doc.  If the Paper doc is not in any folder (aka unfiled) the response
   * will be empty. Note that this endpoint will continue to work for content
   * created by users on the older version of Paper. To check which version of
   * Paper a user is on, use /users/features/get_values. If the paper_as_files
   * feature is enabled, then the user is running the new version of Paper. Refer
   * to the Paper Migration Guide
   * https://www.dropbox.com/lp/developers/reference/paper-migration-guide for
   * migration information.
   * @function Dropbox#paperDocsGetFolderInfo
   * @deprecated
   * @arg {PaperRefPaperDoc} arg - The request parameters.
   * @returns {Promise.<DropboxResponse<PaperFoldersContainingPaperDoc>, DropboxResponseError.<PaperDocLookupError>>}
   */


  routes.paperDocsGetFolderInfo = function (arg) {
    return this.request('paper/docs/get_folder_info', arg, 'user', 'api', 'rpc');
  };
  /**
   * Return the list of all Paper docs according to the argument specifications.
   * To iterate over through the full pagination, pass the cursor to
   * docs/list/continue. Note that this endpoint will continue to work for content
   * created by users on the older version of Paper. To check which version of
   * Paper a user is on, use /users/features/get_values. If the paper_as_files
   * feature is enabled, then the user is running the new version of Paper. Refer
   * to the Paper Migration Guide
   * https://www.dropbox.com/lp/developers/reference/paper-migration-guide for
   * migration information.
   * @function Dropbox#paperDocsList
   * @deprecated
   * @arg {PaperListPaperDocsArgs} arg - The request parameters.
   * @returns {Promise.<DropboxResponse<PaperListPaperDocsResponse>, DropboxResponseError.<void>>}
   */


  routes.paperDocsList = function (arg) {
    return this.request('paper/docs/list', arg, 'user', 'api', 'rpc');
  };
  /**
   * Once a cursor has been retrieved from docs/list, use this to paginate through
   * all Paper doc. Note that this endpoint will continue to work for content
   * created by users on the older version of Paper. To check which version of
   * Paper a user is on, use /users/features/get_values. If the paper_as_files
   * feature is enabled, then the user is running the new version of Paper. Refer
   * to the Paper Migration Guide
   * https://www.dropbox.com/lp/developers/reference/paper-migration-guide for
   * migration information.
   * @function Dropbox#paperDocsListContinue
   * @deprecated
   * @arg {PaperListPaperDocsContinueArgs} arg - The request parameters.
   * @returns {Promise.<DropboxResponse<PaperListPaperDocsResponse>, DropboxResponseError.<PaperListDocsCursorError>>}
   */


  routes.paperDocsListContinue = function (arg) {
    return this.request('paper/docs/list/continue', arg, 'user', 'api', 'rpc');
  };
  /**
   * Permanently deletes the given Paper doc. This operation is final as the doc
   * cannot be recovered. This action can be performed only by the doc owner. Note
   * that this endpoint will continue to work for content created by users on the
   * older version of Paper. To check which version of Paper a user is on, use
   * /users/features/get_values. If the paper_as_files feature is enabled, then
   * the user is running the new version of Paper. Refer to the Paper Migration
   * Guide https://www.dropbox.com/lp/developers/reference/paper-migration-guide
   * for migration information.
   * @function Dropbox#paperDocsPermanentlyDelete
   * @deprecated
   * @arg {PaperRefPaperDoc} arg - The request parameters.
   * @returns {Promise.<DropboxResponse<void>, DropboxResponseError.<PaperDocLookupError>>}
   */


  routes.paperDocsPermanentlyDelete = function (arg) {
    return this.request('paper/docs/permanently_delete', arg, 'user', 'api', 'rpc');
  };
  /**
   * Gets the default sharing policy for the given Paper doc. Note that this
   * endpoint will continue to work for content created by users on the older
   * version of Paper. To check which version of Paper a user is on, use
   * /users/features/get_values. If the paper_as_files feature is enabled, then
   * the user is running the new version of Paper. Refer to the Paper Migration
   * Guide https://www.dropbox.com/lp/developers/reference/paper-migration-guide
   * for migration information.
   * @function Dropbox#paperDocsSharingPolicyGet
   * @deprecated
   * @arg {PaperRefPaperDoc} arg - The request parameters.
   * @returns {Promise.<DropboxResponse<PaperSharingPolicy>, DropboxResponseError.<PaperDocLookupError>>}
   */


  routes.paperDocsSharingPolicyGet = function (arg) {
    return this.request('paper/docs/sharing_policy/get', arg, 'user', 'api', 'rpc');
  };
  /**
   * Sets the default sharing policy for the given Paper doc. The default
   * 'team_sharing_policy' can be changed only by teams, omit this field for
   * personal accounts. The 'public_sharing_policy' policy can't be set to the
   * value 'disabled' because this setting can be changed only via the team admin
   * console. Note that this endpoint will continue to work for content created by
   * users on the older version of Paper. To check which version of Paper a user
   * is on, use /users/features/get_values. If the paper_as_files feature is
   * enabled, then the user is running the new version of Paper. Refer to the
   * Paper Migration Guide
   * https://www.dropbox.com/lp/developers/reference/paper-migration-guide for
   * migration information.
   * @function Dropbox#paperDocsSharingPolicySet
   * @deprecated
   * @arg {PaperPaperDocSharingPolicy} arg - The request parameters.
   * @returns {Promise.<DropboxResponse<void>, DropboxResponseError.<PaperDocLookupError>>}
   */


  routes.paperDocsSharingPolicySet = function (arg) {
    return this.request('paper/docs/sharing_policy/set', arg, 'user', 'api', 'rpc');
  };
  /**
   * Updates an existing Paper doc with the provided content. Note that this
   * endpoint will continue to work for content created by users on the older
   * version of Paper. To check which version of Paper a user is on, use
   * /users/features/get_values. If the paper_as_files feature is enabled, then
   * the user is running the new version of Paper. This endpoint will be retired
   * in September 2020. Refer to the Paper Migration Guide
   * https://www.dropbox.com/lp/developers/reference/paper-migration-guide for
   * more information.
   * @function Dropbox#paperDocsUpdate
   * @deprecated
   * @arg {PaperPaperDocUpdateArgs} arg - The request parameters.
   * @returns {Promise.<DropboxResponse<PaperPaperDocCreateUpdateResult>, DropboxResponseError.<PaperPaperDocUpdateError>>}
   */


  routes.paperDocsUpdate = function (arg) {
    return this.request('paper/docs/update', arg, 'user', 'api', 'upload');
  };
  /**
   * Allows an owner or editor to add users to a Paper doc or change their
   * permissions using their email address or Dropbox account ID. The doc owner's
   * permissions cannot be changed. Note that this endpoint will continue to work
   * for content created by users on the older version of Paper. To check which
   * version of Paper a user is on, use /users/features/get_values. If the
   * paper_as_files feature is enabled, then the user is running the new version
   * of Paper. Refer to the Paper Migration Guide
   * https://www.dropbox.com/lp/developers/reference/paper-migration-guide for
   * migration information.
   * @function Dropbox#paperDocsUsersAdd
   * @deprecated
   * @arg {PaperAddPaperDocUser} arg - The request parameters.
   * @returns {Promise.<DropboxResponse<Array.<PaperAddPaperDocUserMemberResult>>, DropboxResponseError.<PaperDocLookupError>>}
   */


  routes.paperDocsUsersAdd = function (arg) {
    return this.request('paper/docs/users/add', arg, 'user', 'api', 'rpc');
  };
  /**
   * Lists all users who visited the Paper doc or users with explicit access. This
   * call excludes users who have been removed. The list is sorted by the date of
   * the visit or the share date. The list will include both users, the explicitly
   * shared ones as well as those who came in using the Paper url link. Note that
   * this endpoint will continue to work for content created by users on the older
   * version of Paper. To check which version of Paper a user is on, use
   * /users/features/get_values. If the paper_as_files feature is enabled, then
   * the user is running the new version of Paper. Refer to the Paper Migration
   * Guide https://www.dropbox.com/lp/developers/reference/paper-migration-guide
   * for migration information.
   * @function Dropbox#paperDocsUsersList
   * @deprecated
   * @arg {PaperListUsersOnPaperDocArgs} arg - The request parameters.
   * @returns {Promise.<DropboxResponse<PaperListUsersOnPaperDocResponse>, DropboxResponseError.<PaperDocLookupError>>}
   */


  routes.paperDocsUsersList = function (arg) {
    return this.request('paper/docs/users/list', arg, 'user', 'api', 'rpc');
  };
  /**
   * Once a cursor has been retrieved from docs/users/list, use this to paginate
   * through all users on the Paper doc. Note that this endpoint will continue to
   * work for content created by users on the older version of Paper. To check
   * which version of Paper a user is on, use /users/features/get_values. If the
   * paper_as_files feature is enabled, then the user is running the new version
   * of Paper. Refer to the Paper Migration Guide
   * https://www.dropbox.com/lp/developers/reference/paper-migration-guide for
   * migration information.
   * @function Dropbox#paperDocsUsersListContinue
   * @deprecated
   * @arg {PaperListUsersOnPaperDocContinueArgs} arg - The request parameters.
   * @returns {Promise.<DropboxResponse<PaperListUsersOnPaperDocResponse>, DropboxResponseError.<PaperListUsersCursorError>>}
   */


  routes.paperDocsUsersListContinue = function (arg) {
    return this.request('paper/docs/users/list/continue', arg, 'user', 'api', 'rpc');
  };
  /**
   * Allows an owner or editor to remove users from a Paper doc using their email
   * address or Dropbox account ID. The doc owner cannot be removed. Note that
   * this endpoint will continue to work for content created by users on the older
   * version of Paper. To check which version of Paper a user is on, use
   * /users/features/get_values. If the paper_as_files feature is enabled, then
   * the user is running the new version of Paper. Refer to the Paper Migration
   * Guide https://www.dropbox.com/lp/developers/reference/paper-migration-guide
   * for migration information.
   * @function Dropbox#paperDocsUsersRemove
   * @deprecated
   * @arg {PaperRemovePaperDocUser} arg - The request parameters.
   * @returns {Promise.<DropboxResponse<void>, DropboxResponseError.<PaperDocLookupError>>}
   */


  routes.paperDocsUsersRemove = function (arg) {
    return this.request('paper/docs/users/remove', arg, 'user', 'api', 'rpc');
  };
  /**
   * Create a new Paper folder with the provided info. Note that this endpoint
   * will continue to work for content created by users on the older version of
   * Paper. To check which version of Paper a user is on, use
   * /users/features/get_values. If the paper_as_files feature is enabled, then
   * the user is running the new version of Paper. Refer to the Paper Migration
   * Guide https://www.dropbox.com/lp/developers/reference/paper-migration-guide
   * for migration information.
   * @function Dropbox#paperFoldersCreate
   * @deprecated
   * @arg {PaperPaperFolderCreateArg} arg - The request parameters.
   * @returns {Promise.<DropboxResponse<PaperPaperFolderCreateResult>, DropboxResponseError.<PaperPaperFolderCreateError>>}
   */


  routes.paperFoldersCreate = function (arg) {
    return this.request('paper/folders/create', arg, 'user', 'api', 'rpc');
  };
  /**
   * Adds specified members to a file.
   * @function Dropbox#sharingAddFileMember
   * @arg {SharingAddFileMemberArgs} arg - The request parameters.
   * @returns {Promise.<DropboxResponse<Array.<SharingFileMemberActionResult>>, DropboxResponseError.<SharingAddFileMemberError>>}
   */


  routes.sharingAddFileMember = function (arg) {
    return this.request('sharing/add_file_member', arg, 'user', 'api', 'rpc');
  };
  /**
   * Allows an owner or editor (if the ACL update policy allows) of a shared
   * folder to add another member. For the new member to get access to all the
   * functionality for this folder, you will need to call mount_folder on their
   * behalf.
   * @function Dropbox#sharingAddFolderMember
   * @arg {SharingAddFolderMemberArg} arg - The request parameters.
   * @returns {Promise.<DropboxResponse<void>, DropboxResponseError.<SharingAddFolderMemberError>>}
   */


  routes.sharingAddFolderMember = function (arg) {
    return this.request('sharing/add_folder_member', arg, 'user', 'api', 'rpc');
  };
  /**
   * Returns the status of an asynchronous job.
   * @function Dropbox#sharingCheckJobStatus
   * @arg {AsyncPollArg} arg - The request parameters.
   * @returns {Promise.<DropboxResponse<SharingJobStatus>, DropboxResponseError.<AsyncPollError>>}
   */


  routes.sharingCheckJobStatus = function (arg) {
    return this.request('sharing/check_job_status', arg, 'user', 'api', 'rpc');
  };
  /**
   * Returns the status of an asynchronous job for sharing a folder.
   * @function Dropbox#sharingCheckRemoveMemberJobStatus
   * @arg {AsyncPollArg} arg - The request parameters.
   * @returns {Promise.<DropboxResponse<SharingRemoveMemberJobStatus>, DropboxResponseError.<AsyncPollError>>}
   */


  routes.sharingCheckRemoveMemberJobStatus = function (arg) {
    return this.request('sharing/check_remove_member_job_status', arg, 'user', 'api', 'rpc');
  };
  /**
   * Returns the status of an asynchronous job for sharing a folder.
   * @function Dropbox#sharingCheckShareJobStatus
   * @arg {AsyncPollArg} arg - The request parameters.
   * @returns {Promise.<DropboxResponse<SharingShareFolderJobStatus>, DropboxResponseError.<AsyncPollError>>}
   */


  routes.sharingCheckShareJobStatus = function (arg) {
    return this.request('sharing/check_share_job_status', arg, 'user', 'api', 'rpc');
  };
  /**
   * Create a shared link. If a shared link already exists for the given path,
   * that link is returned. Previously, it was technically possible to break a
   * shared link by moving or renaming the corresponding file or folder. In the
   * future, this will no longer be the case, so your app shouldn't rely on this
   * behavior. Instead, if your app needs to revoke a shared link, use
   * revoke_shared_link.
   * @function Dropbox#sharingCreateSharedLink
   * @deprecated
   * @arg {SharingCreateSharedLinkArg} arg - The request parameters.
   * @returns {Promise.<DropboxResponse<SharingPathLinkMetadata>, DropboxResponseError.<SharingCreateSharedLinkError>>}
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
   * @returns {Promise.<DropboxResponse<(SharingFileLinkMetadata|SharingFolderLinkMetadata|SharingSharedLinkMetadata)>, DropboxResponseError.<SharingCreateSharedLinkWithSettingsError>>}
   */


  routes.sharingCreateSharedLinkWithSettings = function (arg) {
    return this.request('sharing/create_shared_link_with_settings', arg, 'user', 'api', 'rpc');
  };
  /**
   * Returns shared file metadata.
   * @function Dropbox#sharingGetFileMetadata
   * @arg {SharingGetFileMetadataArg} arg - The request parameters.
   * @returns {Promise.<DropboxResponse<SharingSharedFileMetadata>, DropboxResponseError.<SharingGetFileMetadataError>>}
   */


  routes.sharingGetFileMetadata = function (arg) {
    return this.request('sharing/get_file_metadata', arg, 'user', 'api', 'rpc');
  };
  /**
   * Returns shared file metadata.
   * @function Dropbox#sharingGetFileMetadataBatch
   * @arg {SharingGetFileMetadataBatchArg} arg - The request parameters.
   * @returns {Promise.<DropboxResponse<Array.<SharingGetFileMetadataBatchResult>>, DropboxResponseError.<SharingSharingUserError>>}
   */


  routes.sharingGetFileMetadataBatch = function (arg) {
    return this.request('sharing/get_file_metadata/batch', arg, 'user', 'api', 'rpc');
  };
  /**
   * Returns shared folder metadata by its folder ID.
   * @function Dropbox#sharingGetFolderMetadata
   * @arg {SharingGetMetadataArgs} arg - The request parameters.
   * @returns {Promise.<DropboxResponse<SharingSharedFolderMetadata>, DropboxResponseError.<SharingSharedFolderAccessError>>}
   */


  routes.sharingGetFolderMetadata = function (arg) {
    return this.request('sharing/get_folder_metadata', arg, 'user', 'api', 'rpc');
  };
  /**
   * Download the shared link's file from a user's Dropbox.
   * @function Dropbox#sharingGetSharedLinkFile
   * @arg {Object} arg - The request parameters.
   * @returns {Promise.<DropboxResponse<(SharingFileLinkMetadata|SharingFolderLinkMetadata|SharingSharedLinkMetadata)>, DropboxResponseError.<SharingGetSharedLinkFileError>>}
   */


  routes.sharingGetSharedLinkFile = function (arg) {
    return this.request('sharing/get_shared_link_file', arg, 'user', 'content', 'download');
  };
  /**
   * Get the shared link's metadata.
   * @function Dropbox#sharingGetSharedLinkMetadata
   * @arg {SharingGetSharedLinkMetadataArg} arg - The request parameters.
   * @returns {Promise.<DropboxResponse<(SharingFileLinkMetadata|SharingFolderLinkMetadata|SharingSharedLinkMetadata)>, DropboxResponseError.<SharingSharedLinkError>>}
   */


  routes.sharingGetSharedLinkMetadata = function (arg) {
    return this.request('sharing/get_shared_link_metadata', arg, 'user', 'api', 'rpc');
  };
  /**
   * Returns a list of LinkMetadata objects for this user, including collection
   * links. If no path is given, returns a list of all shared links for the
   * current user, including collection links, up to a maximum of 1000 links. If a
   * non-empty path is given, returns a list of all shared links that allow access
   * to the given path.  Collection links are never returned in this case.
   * @function Dropbox#sharingGetSharedLinks
   * @deprecated
   * @arg {SharingGetSharedLinksArg} arg - The request parameters.
   * @returns {Promise.<DropboxResponse<SharingGetSharedLinksResult>, DropboxResponseError.<SharingGetSharedLinksError>>}
   */


  routes.sharingGetSharedLinks = function (arg) {
    return this.request('sharing/get_shared_links', arg, 'user', 'api', 'rpc');
  };
  /**
   * Use to obtain the members who have been invited to a file, both inherited and
   * uninherited members.
   * @function Dropbox#sharingListFileMembers
   * @arg {SharingListFileMembersArg} arg - The request parameters.
   * @returns {Promise.<DropboxResponse<SharingSharedFileMembers>, DropboxResponseError.<SharingListFileMembersError>>}
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
   * @returns {Promise.<DropboxResponse<Array.<SharingListFileMembersBatchResult>>, DropboxResponseError.<SharingSharingUserError>>}
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
   * @returns {Promise.<DropboxResponse<SharingSharedFileMembers>, DropboxResponseError.<SharingListFileMembersContinueError>>}
   */


  routes.sharingListFileMembersContinue = function (arg) {
    return this.request('sharing/list_file_members/continue', arg, 'user', 'api', 'rpc');
  };
  /**
   * Returns shared folder membership by its folder ID.
   * @function Dropbox#sharingListFolderMembers
   * @arg {SharingListFolderMembersArgs} arg - The request parameters.
   * @returns {Promise.<DropboxResponse<SharingSharedFolderMembers>, DropboxResponseError.<SharingSharedFolderAccessError>>}
   */


  routes.sharingListFolderMembers = function (arg) {
    return this.request('sharing/list_folder_members', arg, 'user', 'api', 'rpc');
  };
  /**
   * Once a cursor has been retrieved from list_folder_members, use this to
   * paginate through all shared folder members.
   * @function Dropbox#sharingListFolderMembersContinue
   * @arg {SharingListFolderMembersContinueArg} arg - The request parameters.
   * @returns {Promise.<DropboxResponse<SharingSharedFolderMembers>, DropboxResponseError.<SharingListFolderMembersContinueError>>}
   */


  routes.sharingListFolderMembersContinue = function (arg) {
    return this.request('sharing/list_folder_members/continue', arg, 'user', 'api', 'rpc');
  };
  /**
   * Return the list of all shared folders the current user has access to.
   * @function Dropbox#sharingListFolders
   * @arg {SharingListFoldersArgs} arg - The request parameters.
   * @returns {Promise.<DropboxResponse<SharingListFoldersResult>, DropboxResponseError.<void>>}
   */


  routes.sharingListFolders = function (arg) {
    return this.request('sharing/list_folders', arg, 'user', 'api', 'rpc');
  };
  /**
   * Once a cursor has been retrieved from list_folders, use this to paginate
   * through all shared folders. The cursor must come from a previous call to
   * list_folders or list_folders/continue.
   * @function Dropbox#sharingListFoldersContinue
   * @arg {SharingListFoldersContinueArg} arg - The request parameters.
   * @returns {Promise.<DropboxResponse<SharingListFoldersResult>, DropboxResponseError.<SharingListFoldersContinueError>>}
   */


  routes.sharingListFoldersContinue = function (arg) {
    return this.request('sharing/list_folders/continue', arg, 'user', 'api', 'rpc');
  };
  /**
   * Return the list of all shared folders the current user can mount or unmount.
   * @function Dropbox#sharingListMountableFolders
   * @arg {SharingListFoldersArgs} arg - The request parameters.
   * @returns {Promise.<DropboxResponse<SharingListFoldersResult>, DropboxResponseError.<void>>}
   */


  routes.sharingListMountableFolders = function (arg) {
    return this.request('sharing/list_mountable_folders', arg, 'user', 'api', 'rpc');
  };
  /**
   * Once a cursor has been retrieved from list_mountable_folders, use this to
   * paginate through all mountable shared folders. The cursor must come from a
   * previous call to list_mountable_folders or list_mountable_folders/continue.
   * @function Dropbox#sharingListMountableFoldersContinue
   * @arg {SharingListFoldersContinueArg} arg - The request parameters.
   * @returns {Promise.<DropboxResponse<SharingListFoldersResult>, DropboxResponseError.<SharingListFoldersContinueError>>}
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
   * @returns {Promise.<DropboxResponse<SharingListFilesResult>, DropboxResponseError.<SharingSharingUserError>>}
   */


  routes.sharingListReceivedFiles = function (arg) {
    return this.request('sharing/list_received_files', arg, 'user', 'api', 'rpc');
  };
  /**
   * Get more results with a cursor from list_received_files.
   * @function Dropbox#sharingListReceivedFilesContinue
   * @arg {SharingListFilesContinueArg} arg - The request parameters.
   * @returns {Promise.<DropboxResponse<SharingListFilesResult>, DropboxResponseError.<SharingListFilesContinueError>>}
   */


  routes.sharingListReceivedFilesContinue = function (arg) {
    return this.request('sharing/list_received_files/continue', arg, 'user', 'api', 'rpc');
  };
  /**
   * List shared links of this user. If no path is given, returns a list of all
   * shared links for the current user. For members of business teams using team
   * space and member folders, returns all shared links in the team member's home
   * folder unless the team space ID is specified in the request header. For more
   * information, refer to the Namespace Guide
   * https://www.dropbox.com/developers/reference/namespace-guide. If a non-empty
   * path is given, returns a list of all shared links that allow access to the
   * given path - direct links to the given path and links to parent folders of
   * the given path. Links to parent folders can be suppressed by setting
   * direct_only to true.
   * @function Dropbox#sharingListSharedLinks
   * @arg {SharingListSharedLinksArg} arg - The request parameters.
   * @returns {Promise.<DropboxResponse<SharingListSharedLinksResult>, DropboxResponseError.<SharingListSharedLinksError>>}
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
   * @returns {Promise.<DropboxResponse<(SharingFileLinkMetadata|SharingFolderLinkMetadata|SharingSharedLinkMetadata)>, DropboxResponseError.<SharingModifySharedLinkSettingsError>>}
   */


  routes.sharingModifySharedLinkSettings = function (arg) {
    return this.request('sharing/modify_shared_link_settings', arg, 'user', 'api', 'rpc');
  };
  /**
   * The current user mounts the designated folder. Mount a shared folder for a
   * user after they have been added as a member. Once mounted, the shared folder
   * will appear in their Dropbox.
   * @function Dropbox#sharingMountFolder
   * @arg {SharingMountFolderArg} arg - The request parameters.
   * @returns {Promise.<DropboxResponse<SharingSharedFolderMetadata>, DropboxResponseError.<SharingMountFolderError>>}
   */


  routes.sharingMountFolder = function (arg) {
    return this.request('sharing/mount_folder', arg, 'user', 'api', 'rpc');
  };
  /**
   * The current user relinquishes their membership in the designated file. Note
   * that the current user may still have inherited access to this file through
   * the parent folder.
   * @function Dropbox#sharingRelinquishFileMembership
   * @arg {SharingRelinquishFileMembershipArg} arg - The request parameters.
   * @returns {Promise.<DropboxResponse<void>, DropboxResponseError.<SharingRelinquishFileMembershipError>>}
   */


  routes.sharingRelinquishFileMembership = function (arg) {
    return this.request('sharing/relinquish_file_membership', arg, 'user', 'api', 'rpc');
  };
  /**
   * The current user relinquishes their membership in the designated shared
   * folder and will no longer have access to the folder.  A folder owner cannot
   * relinquish membership in their own folder. This will run synchronously if
   * leave_a_copy is false, and asynchronously if leave_a_copy is true.
   * @function Dropbox#sharingRelinquishFolderMembership
   * @arg {SharingRelinquishFolderMembershipArg} arg - The request parameters.
   * @returns {Promise.<DropboxResponse<AsyncLaunchEmptyResult>, DropboxResponseError.<SharingRelinquishFolderMembershipError>>}
   */


  routes.sharingRelinquishFolderMembership = function (arg) {
    return this.request('sharing/relinquish_folder_membership', arg, 'user', 'api', 'rpc');
  };
  /**
   * Identical to remove_file_member_2 but with less information returned.
   * @function Dropbox#sharingRemoveFileMember
   * @deprecated
   * @arg {SharingRemoveFileMemberArg} arg - The request parameters.
   * @returns {Promise.<DropboxResponse<SharingFileMemberActionIndividualResult>, DropboxResponseError.<SharingRemoveFileMemberError>>}
   */


  routes.sharingRemoveFileMember = function (arg) {
    return this.request('sharing/remove_file_member', arg, 'user', 'api', 'rpc');
  };
  /**
   * Removes a specified member from the file.
   * @function Dropbox#sharingRemoveFileMember2
   * @arg {SharingRemoveFileMemberArg} arg - The request parameters.
   * @returns {Promise.<DropboxResponse<SharingFileMemberRemoveActionResult>, DropboxResponseError.<SharingRemoveFileMemberError>>}
   */


  routes.sharingRemoveFileMember2 = function (arg) {
    return this.request('sharing/remove_file_member_2', arg, 'user', 'api', 'rpc');
  };
  /**
   * Allows an owner or editor (if the ACL update policy allows) of a shared
   * folder to remove another member.
   * @function Dropbox#sharingRemoveFolderMember
   * @arg {SharingRemoveFolderMemberArg} arg - The request parameters.
   * @returns {Promise.<DropboxResponse<AsyncLaunchResultBase>, DropboxResponseError.<SharingRemoveFolderMemberError>>}
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
   * @returns {Promise.<DropboxResponse<void>, DropboxResponseError.<SharingRevokeSharedLinkError>>}
   */


  routes.sharingRevokeSharedLink = function (arg) {
    return this.request('sharing/revoke_shared_link', arg, 'user', 'api', 'rpc');
  };
  /**
   * Change the inheritance policy of an existing Shared Folder. Only permitted
   * for shared folders in a shared team root. If a ShareFolderLaunch.async_job_id
   * is returned, you'll need to call check_share_job_status until the action
   * completes to get the metadata for the folder.
   * @function Dropbox#sharingSetAccessInheritance
   * @arg {SharingSetAccessInheritanceArg} arg - The request parameters.
   * @returns {Promise.<DropboxResponse<SharingShareFolderLaunch>, DropboxResponseError.<SharingSetAccessInheritanceError>>}
   */


  routes.sharingSetAccessInheritance = function (arg) {
    return this.request('sharing/set_access_inheritance', arg, 'user', 'api', 'rpc');
  };
  /**
   * Share a folder with collaborators. Most sharing will be completed
   * synchronously. Large folders will be completed asynchronously. To make
   * testing the async case repeatable, set `ShareFolderArg.force_async`. If a
   * ShareFolderLaunch.async_job_id is returned, you'll need to call
   * check_share_job_status until the action completes to get the metadata for the
   * folder.
   * @function Dropbox#sharingShareFolder
   * @arg {SharingShareFolderArg} arg - The request parameters.
   * @returns {Promise.<DropboxResponse<SharingShareFolderLaunch>, DropboxResponseError.<SharingShareFolderError>>}
   */


  routes.sharingShareFolder = function (arg) {
    return this.request('sharing/share_folder', arg, 'user', 'api', 'rpc');
  };
  /**
   * Transfer ownership of a shared folder to a member of the shared folder. User
   * must have AccessLevel.owner access to the shared folder to perform a
   * transfer.
   * @function Dropbox#sharingTransferFolder
   * @arg {SharingTransferFolderArg} arg - The request parameters.
   * @returns {Promise.<DropboxResponse<void>, DropboxResponseError.<SharingTransferFolderError>>}
   */


  routes.sharingTransferFolder = function (arg) {
    return this.request('sharing/transfer_folder', arg, 'user', 'api', 'rpc');
  };
  /**
   * The current user unmounts the designated folder. They can re-mount the folder
   * at a later time using mount_folder.
   * @function Dropbox#sharingUnmountFolder
   * @arg {SharingUnmountFolderArg} arg - The request parameters.
   * @returns {Promise.<DropboxResponse<void>, DropboxResponseError.<SharingUnmountFolderError>>}
   */


  routes.sharingUnmountFolder = function (arg) {
    return this.request('sharing/unmount_folder', arg, 'user', 'api', 'rpc');
  };
  /**
   * Remove all members from this file. Does not remove inherited members.
   * @function Dropbox#sharingUnshareFile
   * @arg {SharingUnshareFileArg} arg - The request parameters.
   * @returns {Promise.<DropboxResponse<void>, DropboxResponseError.<SharingUnshareFileError>>}
   */


  routes.sharingUnshareFile = function (arg) {
    return this.request('sharing/unshare_file', arg, 'user', 'api', 'rpc');
  };
  /**
   * Allows a shared folder owner to unshare the folder. You'll need to call
   * check_job_status to determine if the action has completed successfully.
   * @function Dropbox#sharingUnshareFolder
   * @arg {SharingUnshareFolderArg} arg - The request parameters.
   * @returns {Promise.<DropboxResponse<AsyncLaunchEmptyResult>, DropboxResponseError.<SharingUnshareFolderError>>}
   */


  routes.sharingUnshareFolder = function (arg) {
    return this.request('sharing/unshare_folder', arg, 'user', 'api', 'rpc');
  };
  /**
   * Changes a member's access on a shared file.
   * @function Dropbox#sharingUpdateFileMember
   * @arg {SharingUpdateFileMemberArgs} arg - The request parameters.
   * @returns {Promise.<DropboxResponse<SharingMemberAccessLevelResult>, DropboxResponseError.<SharingFileMemberActionError>>}
   */


  routes.sharingUpdateFileMember = function (arg) {
    return this.request('sharing/update_file_member', arg, 'user', 'api', 'rpc');
  };
  /**
   * Allows an owner or editor of a shared folder to update another member's
   * permissions.
   * @function Dropbox#sharingUpdateFolderMember
   * @arg {SharingUpdateFolderMemberArg} arg - The request parameters.
   * @returns {Promise.<DropboxResponse<SharingMemberAccessLevelResult>, DropboxResponseError.<SharingUpdateFolderMemberError>>}
   */


  routes.sharingUpdateFolderMember = function (arg) {
    return this.request('sharing/update_folder_member', arg, 'user', 'api', 'rpc');
  };
  /**
   * Update the sharing policies for a shared folder. User must have
   * AccessLevel.owner access to the shared folder to update its policies.
   * @function Dropbox#sharingUpdateFolderPolicy
   * @arg {SharingUpdateFolderPolicyArg} arg - The request parameters.
   * @returns {Promise.<DropboxResponse<SharingSharedFolderMetadata>, DropboxResponseError.<SharingUpdateFolderPolicyError>>}
   */


  routes.sharingUpdateFolderPolicy = function (arg) {
    return this.request('sharing/update_folder_policy', arg, 'user', 'api', 'rpc');
  };
  /**
   * List all device sessions of a team's member.
   * @function Dropbox#teamDevicesListMemberDevices
   * @arg {TeamListMemberDevicesArg} arg - The request parameters.
   * @returns {Promise.<DropboxResponse<TeamListMemberDevicesResult>, DropboxResponseError.<TeamListMemberDevicesError>>}
   */


  routes.teamDevicesListMemberDevices = function (arg) {
    return this.request('team/devices/list_member_devices', arg, 'team', 'api', 'rpc');
  };
  /**
   * List all device sessions of a team. Permission : Team member file access.
   * @function Dropbox#teamDevicesListMembersDevices
   * @arg {TeamListMembersDevicesArg} arg - The request parameters.
   * @returns {Promise.<DropboxResponse<TeamListMembersDevicesResult>, DropboxResponseError.<TeamListMembersDevicesError>>}
   */


  routes.teamDevicesListMembersDevices = function (arg) {
    return this.request('team/devices/list_members_devices', arg, 'team', 'api', 'rpc');
  };
  /**
   * List all device sessions of a team. Permission : Team member file access.
   * @function Dropbox#teamDevicesListTeamDevices
   * @deprecated
   * @arg {TeamListTeamDevicesArg} arg - The request parameters.
   * @returns {Promise.<DropboxResponse<TeamListTeamDevicesResult>, DropboxResponseError.<TeamListTeamDevicesError>>}
   */


  routes.teamDevicesListTeamDevices = function (arg) {
    return this.request('team/devices/list_team_devices', arg, 'team', 'api', 'rpc');
  };
  /**
   * Revoke a device session of a team's member.
   * @function Dropbox#teamDevicesRevokeDeviceSession
   * @arg {TeamRevokeDeviceSessionArg} arg - The request parameters.
   * @returns {Promise.<DropboxResponse<void>, DropboxResponseError.<TeamRevokeDeviceSessionError>>}
   */


  routes.teamDevicesRevokeDeviceSession = function (arg) {
    return this.request('team/devices/revoke_device_session', arg, 'team', 'api', 'rpc');
  };
  /**
   * Revoke a list of device sessions of team members.
   * @function Dropbox#teamDevicesRevokeDeviceSessionBatch
   * @arg {TeamRevokeDeviceSessionBatchArg} arg - The request parameters.
   * @returns {Promise.<DropboxResponse<TeamRevokeDeviceSessionBatchResult>, DropboxResponseError.<TeamRevokeDeviceSessionBatchError>>}
   */


  routes.teamDevicesRevokeDeviceSessionBatch = function (arg) {
    return this.request('team/devices/revoke_device_session_batch', arg, 'team', 'api', 'rpc');
  };
  /**
   * Get the values for one or more featues. This route allows you to check your
   * account's capability for what feature you can access or what value you have
   * for certain features. Permission : Team information.
   * @function Dropbox#teamFeaturesGetValues
   * @arg {TeamFeaturesGetValuesBatchArg} arg - The request parameters.
   * @returns {Promise.<DropboxResponse<TeamFeaturesGetValuesBatchResult>, DropboxResponseError.<TeamFeaturesGetValuesBatchError>>}
   */


  routes.teamFeaturesGetValues = function (arg) {
    return this.request('team/features/get_values', arg, 'team', 'api', 'rpc');
  };
  /**
   * Retrieves information about a team.
   * @function Dropbox#teamGetInfo
   * @returns {Promise.<DropboxResponse<TeamTeamGetInfoResult>, DropboxResponseError.<void>>}
   */


  routes.teamGetInfo = function () {
    return this.request('team/get_info', null, 'team', 'api', 'rpc');
  };
  /**
   * Creates a new, empty group, with a requested name. Permission : Team member
   * management.
   * @function Dropbox#teamGroupsCreate
   * @arg {TeamGroupCreateArg} arg - The request parameters.
   * @returns {Promise.<DropboxResponse<TeamGroupFullInfo>, DropboxResponseError.<TeamGroupCreateError>>}
   */


  routes.teamGroupsCreate = function (arg) {
    return this.request('team/groups/create', arg, 'team', 'api', 'rpc');
  };
  /**
   * Deletes a group. The group is deleted immediately. However the revoking of
   * group-owned resources may take additional time. Use the groups/job_status/get
   * to determine whether this process has completed. Permission : Team member
   * management.
   * @function Dropbox#teamGroupsDelete
   * @arg {TeamGroupSelector} arg - The request parameters.
   * @returns {Promise.<DropboxResponse<AsyncLaunchEmptyResult>, DropboxResponseError.<TeamGroupDeleteError>>}
   */


  routes.teamGroupsDelete = function (arg) {
    return this.request('team/groups/delete', arg, 'team', 'api', 'rpc');
  };
  /**
   * Retrieves information about one or more groups. Note that the optional field
   * GroupFullInfo.members is not returned for system-managed groups. Permission :
   * Team Information.
   * @function Dropbox#teamGroupsGetInfo
   * @arg {TeamGroupsSelector} arg - The request parameters.
   * @returns {Promise.<DropboxResponse<Object>, DropboxResponseError.<TeamGroupsGetInfoError>>}
   */


  routes.teamGroupsGetInfo = function (arg) {
    return this.request('team/groups/get_info', arg, 'team', 'api', 'rpc');
  };
  /**
   * Once an async_job_id is returned from groups/delete, groups/members/add , or
   * groups/members/remove use this method to poll the status of granting/revoking
   * group members' access to group-owned resources. Permission : Team member
   * management.
   * @function Dropbox#teamGroupsJobStatusGet
   * @arg {AsyncPollArg} arg - The request parameters.
   * @returns {Promise.<DropboxResponse<AsyncPollEmptyResult>, DropboxResponseError.<TeamGroupsPollError>>}
   */


  routes.teamGroupsJobStatusGet = function (arg) {
    return this.request('team/groups/job_status/get', arg, 'team', 'api', 'rpc');
  };
  /**
   * Lists groups on a team. Permission : Team Information.
   * @function Dropbox#teamGroupsList
   * @arg {TeamGroupsListArg} arg - The request parameters.
   * @returns {Promise.<DropboxResponse<TeamGroupsListResult>, DropboxResponseError.<void>>}
   */


  routes.teamGroupsList = function (arg) {
    return this.request('team/groups/list', arg, 'team', 'api', 'rpc');
  };
  /**
   * Once a cursor has been retrieved from groups/list, use this to paginate
   * through all groups. Permission : Team Information.
   * @function Dropbox#teamGroupsListContinue
   * @arg {TeamGroupsListContinueArg} arg - The request parameters.
   * @returns {Promise.<DropboxResponse<TeamGroupsListResult>, DropboxResponseError.<TeamGroupsListContinueError>>}
   */


  routes.teamGroupsListContinue = function (arg) {
    return this.request('team/groups/list/continue', arg, 'team', 'api', 'rpc');
  };
  /**
   * Adds members to a group. The members are added immediately. However the
   * granting of group-owned resources may take additional time. Use the
   * groups/job_status/get to determine whether this process has completed.
   * Permission : Team member management.
   * @function Dropbox#teamGroupsMembersAdd
   * @arg {TeamGroupMembersAddArg} arg - The request parameters.
   * @returns {Promise.<DropboxResponse<TeamGroupMembersChangeResult>, DropboxResponseError.<TeamGroupMembersAddError>>}
   */


  routes.teamGroupsMembersAdd = function (arg) {
    return this.request('team/groups/members/add', arg, 'team', 'api', 'rpc');
  };
  /**
   * Lists members of a group. Permission : Team Information.
   * @function Dropbox#teamGroupsMembersList
   * @arg {TeamGroupsMembersListArg} arg - The request parameters.
   * @returns {Promise.<DropboxResponse<TeamGroupsMembersListResult>, DropboxResponseError.<TeamGroupSelectorError>>}
   */


  routes.teamGroupsMembersList = function (arg) {
    return this.request('team/groups/members/list', arg, 'team', 'api', 'rpc');
  };
  /**
   * Once a cursor has been retrieved from groups/members/list, use this to
   * paginate through all members of the group. Permission : Team information.
   * @function Dropbox#teamGroupsMembersListContinue
   * @arg {TeamGroupsMembersListContinueArg} arg - The request parameters.
   * @returns {Promise.<DropboxResponse<TeamGroupsMembersListResult>, DropboxResponseError.<TeamGroupsMembersListContinueError>>}
   */


  routes.teamGroupsMembersListContinue = function (arg) {
    return this.request('team/groups/members/list/continue', arg, 'team', 'api', 'rpc');
  };
  /**
   * Removes members from a group. The members are removed immediately. However
   * the revoking of group-owned resources may take additional time. Use the
   * groups/job_status/get to determine whether this process has completed. This
   * method permits removing the only owner of a group, even in cases where this
   * is not possible via the web client. Permission : Team member management.
   * @function Dropbox#teamGroupsMembersRemove
   * @arg {TeamGroupMembersRemoveArg} arg - The request parameters.
   * @returns {Promise.<DropboxResponse<TeamGroupMembersChangeResult>, DropboxResponseError.<TeamGroupMembersRemoveError>>}
   */


  routes.teamGroupsMembersRemove = function (arg) {
    return this.request('team/groups/members/remove', arg, 'team', 'api', 'rpc');
  };
  /**
   * Sets a member's access type in a group. Permission : Team member management.
   * @function Dropbox#teamGroupsMembersSetAccessType
   * @arg {TeamGroupMembersSetAccessTypeArg} arg - The request parameters.
   * @returns {Promise.<DropboxResponse<Object>, DropboxResponseError.<TeamGroupMemberSetAccessTypeError>>}
   */


  routes.teamGroupsMembersSetAccessType = function (arg) {
    return this.request('team/groups/members/set_access_type', arg, 'team', 'api', 'rpc');
  };
  /**
   * Updates a group's name and/or external ID. Permission : Team member
   * management.
   * @function Dropbox#teamGroupsUpdate
   * @arg {TeamGroupUpdateArgs} arg - The request parameters.
   * @returns {Promise.<DropboxResponse<TeamGroupFullInfo>, DropboxResponseError.<TeamGroupUpdateError>>}
   */


  routes.teamGroupsUpdate = function (arg) {
    return this.request('team/groups/update', arg, 'team', 'api', 'rpc');
  };
  /**
   * Creates new legal hold policy. Note: Legal Holds is a paid add-on. Not all
   * teams have the feature. Permission : Team member file access.
   * @function Dropbox#teamLegalHoldsCreatePolicy
   * @arg {TeamLegalHoldsPolicyCreateArg} arg - The request parameters.
   * @returns {Promise.<DropboxResponse<Object>, DropboxResponseError.<TeamLegalHoldsPolicyCreateError>>}
   */


  routes.teamLegalHoldsCreatePolicy = function (arg) {
    return this.request('team/legal_holds/create_policy', arg, 'team', 'api', 'rpc');
  };
  /**
   * Gets a legal hold by Id. Note: Legal Holds is a paid add-on. Not all teams
   * have the feature. Permission : Team member file access.
   * @function Dropbox#teamLegalHoldsGetPolicy
   * @arg {TeamLegalHoldsGetPolicyArg} arg - The request parameters.
   * @returns {Promise.<DropboxResponse<Object>, DropboxResponseError.<TeamLegalHoldsGetPolicyError>>}
   */


  routes.teamLegalHoldsGetPolicy = function (arg) {
    return this.request('team/legal_holds/get_policy', arg, 'team', 'api', 'rpc');
  };
  /**
   * List the file metadata that's under the hold. Note: Legal Holds is a paid
   * add-on. Not all teams have the feature. Permission : Team member file access.
   * @function Dropbox#teamLegalHoldsListHeldRevisions
   * @arg {TeamLegalHoldsListHeldRevisionsArg} arg - The request parameters.
   * @returns {Promise.<DropboxResponse<TeamLegalHoldsListHeldRevisionResult>, DropboxResponseError.<TeamLegalHoldsListHeldRevisionsError>>}
   */


  routes.teamLegalHoldsListHeldRevisions = function (arg) {
    return this.request('team/legal_holds/list_held_revisions', arg, 'team', 'api', 'rpc');
  };
  /**
   * Continue listing the file metadata that's under the hold. Note: Legal Holds
   * is a paid add-on. Not all teams have the feature. Permission : Team member
   * file access.
   * @function Dropbox#teamLegalHoldsListHeldRevisionsContinue
   * @arg {TeamLegalHoldsListHeldRevisionsContinueArg} arg - The request parameters.
   * @returns {Promise.<DropboxResponse<TeamLegalHoldsListHeldRevisionResult>, DropboxResponseError.<TeamLegalHoldsListHeldRevisionsError>>}
   */


  routes.teamLegalHoldsListHeldRevisionsContinue = function (arg) {
    return this.request('team/legal_holds/list_held_revisions_continue', arg, 'team', 'api', 'rpc');
  };
  /**
   * Lists legal holds on a team. Note: Legal Holds is a paid add-on. Not all
   * teams have the feature. Permission : Team member file access.
   * @function Dropbox#teamLegalHoldsListPolicies
   * @arg {TeamLegalHoldsListPoliciesArg} arg - The request parameters.
   * @returns {Promise.<DropboxResponse<TeamLegalHoldsListPoliciesResult>, DropboxResponseError.<TeamLegalHoldsListPoliciesError>>}
   */


  routes.teamLegalHoldsListPolicies = function (arg) {
    return this.request('team/legal_holds/list_policies', arg, 'team', 'api', 'rpc');
  };
  /**
   * Releases a legal hold by Id. Note: Legal Holds is a paid add-on. Not all
   * teams have the feature. Permission : Team member file access.
   * @function Dropbox#teamLegalHoldsReleasePolicy
   * @arg {TeamLegalHoldsPolicyReleaseArg} arg - The request parameters.
   * @returns {Promise.<DropboxResponse<void>, DropboxResponseError.<TeamLegalHoldsPolicyReleaseError>>}
   */


  routes.teamLegalHoldsReleasePolicy = function (arg) {
    return this.request('team/legal_holds/release_policy', arg, 'team', 'api', 'rpc');
  };
  /**
   * Updates a legal hold. Note: Legal Holds is a paid add-on. Not all teams have
   * the feature. Permission : Team member file access.
   * @function Dropbox#teamLegalHoldsUpdatePolicy
   * @arg {TeamLegalHoldsPolicyUpdateArg} arg - The request parameters.
   * @returns {Promise.<DropboxResponse<Object>, DropboxResponseError.<TeamLegalHoldsPolicyUpdateError>>}
   */


  routes.teamLegalHoldsUpdatePolicy = function (arg) {
    return this.request('team/legal_holds/update_policy', arg, 'team', 'api', 'rpc');
  };
  /**
   * List all linked applications of the team member. Note, this endpoint does not
   * list any team-linked applications.
   * @function Dropbox#teamLinkedAppsListMemberLinkedApps
   * @arg {TeamListMemberAppsArg} arg - The request parameters.
   * @returns {Promise.<DropboxResponse<TeamListMemberAppsResult>, DropboxResponseError.<TeamListMemberAppsError>>}
   */


  routes.teamLinkedAppsListMemberLinkedApps = function (arg) {
    return this.request('team/linked_apps/list_member_linked_apps', arg, 'team', 'api', 'rpc');
  };
  /**
   * List all applications linked to the team members' accounts. Note, this
   * endpoint does not list any team-linked applications.
   * @function Dropbox#teamLinkedAppsListMembersLinkedApps
   * @arg {TeamListMembersAppsArg} arg - The request parameters.
   * @returns {Promise.<DropboxResponse<TeamListMembersAppsResult>, DropboxResponseError.<TeamListMembersAppsError>>}
   */


  routes.teamLinkedAppsListMembersLinkedApps = function (arg) {
    return this.request('team/linked_apps/list_members_linked_apps', arg, 'team', 'api', 'rpc');
  };
  /**
   * List all applications linked to the team members' accounts. Note, this
   * endpoint doesn't list any team-linked applications.
   * @function Dropbox#teamLinkedAppsListTeamLinkedApps
   * @deprecated
   * @arg {TeamListTeamAppsArg} arg - The request parameters.
   * @returns {Promise.<DropboxResponse<TeamListTeamAppsResult>, DropboxResponseError.<TeamListTeamAppsError>>}
   */


  routes.teamLinkedAppsListTeamLinkedApps = function (arg) {
    return this.request('team/linked_apps/list_team_linked_apps', arg, 'team', 'api', 'rpc');
  };
  /**
   * Revoke a linked application of the team member.
   * @function Dropbox#teamLinkedAppsRevokeLinkedApp
   * @arg {TeamRevokeLinkedApiAppArg} arg - The request parameters.
   * @returns {Promise.<DropboxResponse<void>, DropboxResponseError.<TeamRevokeLinkedAppError>>}
   */


  routes.teamLinkedAppsRevokeLinkedApp = function (arg) {
    return this.request('team/linked_apps/revoke_linked_app', arg, 'team', 'api', 'rpc');
  };
  /**
   * Revoke a list of linked applications of the team members.
   * @function Dropbox#teamLinkedAppsRevokeLinkedAppBatch
   * @arg {TeamRevokeLinkedApiAppBatchArg} arg - The request parameters.
   * @returns {Promise.<DropboxResponse<TeamRevokeLinkedAppBatchResult>, DropboxResponseError.<TeamRevokeLinkedAppBatchError>>}
   */


  routes.teamLinkedAppsRevokeLinkedAppBatch = function (arg) {
    return this.request('team/linked_apps/revoke_linked_app_batch', arg, 'team', 'api', 'rpc');
  };
  /**
   * Add users to member space limits excluded users list.
   * @function Dropbox#teamMemberSpaceLimitsExcludedUsersAdd
   * @arg {TeamExcludedUsersUpdateArg} arg - The request parameters.
   * @returns {Promise.<DropboxResponse<TeamExcludedUsersUpdateResult>, DropboxResponseError.<TeamExcludedUsersUpdateError>>}
   */


  routes.teamMemberSpaceLimitsExcludedUsersAdd = function (arg) {
    return this.request('team/member_space_limits/excluded_users/add', arg, 'team', 'api', 'rpc');
  };
  /**
   * List member space limits excluded users.
   * @function Dropbox#teamMemberSpaceLimitsExcludedUsersList
   * @arg {TeamExcludedUsersListArg} arg - The request parameters.
   * @returns {Promise.<DropboxResponse<TeamExcludedUsersListResult>, DropboxResponseError.<TeamExcludedUsersListError>>}
   */


  routes.teamMemberSpaceLimitsExcludedUsersList = function (arg) {
    return this.request('team/member_space_limits/excluded_users/list', arg, 'team', 'api', 'rpc');
  };
  /**
   * Continue listing member space limits excluded users.
   * @function Dropbox#teamMemberSpaceLimitsExcludedUsersListContinue
   * @arg {TeamExcludedUsersListContinueArg} arg - The request parameters.
   * @returns {Promise.<DropboxResponse<TeamExcludedUsersListResult>, DropboxResponseError.<TeamExcludedUsersListContinueError>>}
   */


  routes.teamMemberSpaceLimitsExcludedUsersListContinue = function (arg) {
    return this.request('team/member_space_limits/excluded_users/list/continue', arg, 'team', 'api', 'rpc');
  };
  /**
   * Remove users from member space limits excluded users list.
   * @function Dropbox#teamMemberSpaceLimitsExcludedUsersRemove
   * @arg {TeamExcludedUsersUpdateArg} arg - The request parameters.
   * @returns {Promise.<DropboxResponse<TeamExcludedUsersUpdateResult>, DropboxResponseError.<TeamExcludedUsersUpdateError>>}
   */


  routes.teamMemberSpaceLimitsExcludedUsersRemove = function (arg) {
    return this.request('team/member_space_limits/excluded_users/remove', arg, 'team', 'api', 'rpc');
  };
  /**
   * Get users custom quota. Returns none as the custom quota if none was set. A
   * maximum of 1000 members can be specified in a single call.
   * @function Dropbox#teamMemberSpaceLimitsGetCustomQuota
   * @arg {TeamCustomQuotaUsersArg} arg - The request parameters.
   * @returns {Promise.<DropboxResponse<Array.<TeamCustomQuotaResult>>, DropboxResponseError.<TeamCustomQuotaError>>}
   */


  routes.teamMemberSpaceLimitsGetCustomQuota = function (arg) {
    return this.request('team/member_space_limits/get_custom_quota', arg, 'team', 'api', 'rpc');
  };
  /**
   * Remove users custom quota. A maximum of 1000 members can be specified in a
   * single call.
   * @function Dropbox#teamMemberSpaceLimitsRemoveCustomQuota
   * @arg {TeamCustomQuotaUsersArg} arg - The request parameters.
   * @returns {Promise.<DropboxResponse<Array.<TeamRemoveCustomQuotaResult>>, DropboxResponseError.<TeamCustomQuotaError>>}
   */


  routes.teamMemberSpaceLimitsRemoveCustomQuota = function (arg) {
    return this.request('team/member_space_limits/remove_custom_quota', arg, 'team', 'api', 'rpc');
  };
  /**
   * Set users custom quota. Custom quota has to be at least 15GB. A maximum of
   * 1000 members can be specified in a single call.
   * @function Dropbox#teamMemberSpaceLimitsSetCustomQuota
   * @arg {TeamSetCustomQuotaArg} arg - The request parameters.
   * @returns {Promise.<DropboxResponse<Array.<TeamCustomQuotaResult>>, DropboxResponseError.<TeamSetCustomQuotaError>>}
   */


  routes.teamMemberSpaceLimitsSetCustomQuota = function (arg) {
    return this.request('team/member_space_limits/set_custom_quota', arg, 'team', 'api', 'rpc');
  };
  /**
   * Adds members to a team. Permission : Team member management A maximum of 20
   * members can be specified in a single call. If no Dropbox account exists with
   * the email address specified, a new Dropbox account will be created with the
   * given email address, and that account will be invited to the team. If a
   * personal Dropbox account exists with the email address specified in the call,
   * this call will create a placeholder Dropbox account for the user on the team
   * and send an email inviting the user to migrate their existing personal
   * account onto the team. Team member management apps are required to set an
   * initial given_name and surname for a user to use in the team invitation and
   * for 'Perform as team member' actions taken on the user before they become
   * 'active'.
   * @function Dropbox#teamMembersAddV2
   * @arg {TeamMembersAddV2Arg} arg - The request parameters.
   * @returns {Promise.<DropboxResponse<TeamMembersAddLaunchV2Result>, DropboxResponseError.<void>>}
   */


  routes.teamMembersAddV2 = function (arg) {
    return this.request('team/members/add_v2', arg, 'team', 'api', 'rpc');
  };
  /**
   * Adds members to a team. Permission : Team member management A maximum of 20
   * members can be specified in a single call. If no Dropbox account exists with
   * the email address specified, a new Dropbox account will be created with the
   * given email address, and that account will be invited to the team. If a
   * personal Dropbox account exists with the email address specified in the call,
   * this call will create a placeholder Dropbox account for the user on the team
   * and send an email inviting the user to migrate their existing personal
   * account onto the team. Team member management apps are required to set an
   * initial given_name and surname for a user to use in the team invitation and
   * for 'Perform as team member' actions taken on the user before they become
   * 'active'.
   * @function Dropbox#teamMembersAdd
   * @arg {TeamMembersAddArg} arg - The request parameters.
   * @returns {Promise.<DropboxResponse<TeamMembersAddLaunch>, DropboxResponseError.<void>>}
   */


  routes.teamMembersAdd = function (arg) {
    return this.request('team/members/add', arg, 'team', 'api', 'rpc');
  };
  /**
   * Once an async_job_id is returned from members/add_v2 , use this to poll the
   * status of the asynchronous request. Permission : Team member management.
   * @function Dropbox#teamMembersAddJobStatusGetV2
   * @arg {AsyncPollArg} arg - The request parameters.
   * @returns {Promise.<DropboxResponse<TeamMembersAddJobStatusV2Result>, DropboxResponseError.<AsyncPollError>>}
   */


  routes.teamMembersAddJobStatusGetV2 = function (arg) {
    return this.request('team/members/add/job_status/get_v2', arg, 'team', 'api', 'rpc');
  };
  /**
   * Once an async_job_id is returned from members/add , use this to poll the
   * status of the asynchronous request. Permission : Team member management.
   * @function Dropbox#teamMembersAddJobStatusGet
   * @arg {AsyncPollArg} arg - The request parameters.
   * @returns {Promise.<DropboxResponse<TeamMembersAddJobStatus>, DropboxResponseError.<AsyncPollError>>}
   */


  routes.teamMembersAddJobStatusGet = function (arg) {
    return this.request('team/members/add/job_status/get', arg, 'team', 'api', 'rpc');
  };
  /**
   * Deletes a team member's profile photo. Permission : Team member management.
   * @function Dropbox#teamMembersDeleteProfilePhotoV2
   * @arg {TeamMembersDeleteProfilePhotoArg} arg - The request parameters.
   * @returns {Promise.<DropboxResponse<TeamTeamMemberInfoV2Result>, DropboxResponseError.<TeamMembersDeleteProfilePhotoError>>}
   */


  routes.teamMembersDeleteProfilePhotoV2 = function (arg) {
    return this.request('team/members/delete_profile_photo_v2', arg, 'team', 'api', 'rpc');
  };
  /**
   * Deletes a team member's profile photo. Permission : Team member management.
   * @function Dropbox#teamMembersDeleteProfilePhoto
   * @arg {TeamMembersDeleteProfilePhotoArg} arg - The request parameters.
   * @returns {Promise.<DropboxResponse<TeamTeamMemberInfo>, DropboxResponseError.<TeamMembersDeleteProfilePhotoError>>}
   */


  routes.teamMembersDeleteProfilePhoto = function (arg) {
    return this.request('team/members/delete_profile_photo', arg, 'team', 'api', 'rpc');
  };
  /**
   * Get available TeamMemberRoles for the connected team. To be used with
   * members/set_admin_permissions_v2. Permission : Team member management.
   * @function Dropbox#teamMembersGetAvailableTeamMemberRoles
   * @returns {Promise.<DropboxResponse<TeamMembersGetAvailableTeamMemberRolesResult>, DropboxResponseError.<void>>}
   */


  routes.teamMembersGetAvailableTeamMemberRoles = function () {
    return this.request('team/members/get_available_team_member_roles', null, 'team', 'api', 'rpc');
  };
  /**
   * Returns information about multiple team members. Permission : Team
   * information This endpoint will return MembersGetInfoItem.id_not_found, for
   * IDs (or emails) that cannot be matched to a valid team member.
   * @function Dropbox#teamMembersGetInfoV2
   * @arg {TeamMembersGetInfoV2Arg} arg - The request parameters.
   * @returns {Promise.<DropboxResponse<TeamMembersGetInfoV2Result>, DropboxResponseError.<TeamMembersGetInfoError>>}
   */


  routes.teamMembersGetInfoV2 = function (arg) {
    return this.request('team/members/get_info_v2', arg, 'team', 'api', 'rpc');
  };
  /**
   * Returns information about multiple team members. Permission : Team
   * information This endpoint will return MembersGetInfoItem.id_not_found, for
   * IDs (or emails) that cannot be matched to a valid team member.
   * @function Dropbox#teamMembersGetInfo
   * @arg {TeamMembersGetInfoArgs} arg - The request parameters.
   * @returns {Promise.<DropboxResponse<Object>, DropboxResponseError.<TeamMembersGetInfoError>>}
   */


  routes.teamMembersGetInfo = function (arg) {
    return this.request('team/members/get_info', arg, 'team', 'api', 'rpc');
  };
  /**
   * Lists members of a team. Permission : Team information.
   * @function Dropbox#teamMembersListV2
   * @arg {TeamMembersListArg} arg - The request parameters.
   * @returns {Promise.<DropboxResponse<TeamMembersListV2Result>, DropboxResponseError.<TeamMembersListError>>}
   */


  routes.teamMembersListV2 = function (arg) {
    return this.request('team/members/list_v2', arg, 'team', 'api', 'rpc');
  };
  /**
   * Lists members of a team. Permission : Team information.
   * @function Dropbox#teamMembersList
   * @arg {TeamMembersListArg} arg - The request parameters.
   * @returns {Promise.<DropboxResponse<TeamMembersListResult>, DropboxResponseError.<TeamMembersListError>>}
   */


  routes.teamMembersList = function (arg) {
    return this.request('team/members/list', arg, 'team', 'api', 'rpc');
  };
  /**
   * Once a cursor has been retrieved from members/list_v2, use this to paginate
   * through all team members. Permission : Team information.
   * @function Dropbox#teamMembersListContinueV2
   * @arg {TeamMembersListContinueArg} arg - The request parameters.
   * @returns {Promise.<DropboxResponse<TeamMembersListV2Result>, DropboxResponseError.<TeamMembersListContinueError>>}
   */


  routes.teamMembersListContinueV2 = function (arg) {
    return this.request('team/members/list/continue_v2', arg, 'team', 'api', 'rpc');
  };
  /**
   * Once a cursor has been retrieved from members/list, use this to paginate
   * through all team members. Permission : Team information.
   * @function Dropbox#teamMembersListContinue
   * @arg {TeamMembersListContinueArg} arg - The request parameters.
   * @returns {Promise.<DropboxResponse<TeamMembersListResult>, DropboxResponseError.<TeamMembersListContinueError>>}
   */


  routes.teamMembersListContinue = function (arg) {
    return this.request('team/members/list/continue', arg, 'team', 'api', 'rpc');
  };
  /**
   * Moves removed member's files to a different member. This endpoint initiates
   * an asynchronous job. To obtain the final result of the job, the client should
   * periodically poll members/move_former_member_files/job_status/check.
   * Permission : Team member management.
   * @function Dropbox#teamMembersMoveFormerMemberFiles
   * @arg {TeamMembersDataTransferArg} arg - The request parameters.
   * @returns {Promise.<DropboxResponse<AsyncLaunchEmptyResult>, DropboxResponseError.<TeamMembersTransferFormerMembersFilesError>>}
   */


  routes.teamMembersMoveFormerMemberFiles = function (arg) {
    return this.request('team/members/move_former_member_files', arg, 'team', 'api', 'rpc');
  };
  /**
   * Once an async_job_id is returned from members/move_former_member_files , use
   * this to poll the status of the asynchronous request. Permission : Team member
   * management.
   * @function Dropbox#teamMembersMoveFormerMemberFilesJobStatusCheck
   * @arg {AsyncPollArg} arg - The request parameters.
   * @returns {Promise.<DropboxResponse<AsyncPollEmptyResult>, DropboxResponseError.<AsyncPollError>>}
   */


  routes.teamMembersMoveFormerMemberFilesJobStatusCheck = function (arg) {
    return this.request('team/members/move_former_member_files/job_status/check', arg, 'team', 'api', 'rpc');
  };
  /**
   * Recover a deleted member. Permission : Team member management Exactly one of
   * team_member_id, email, or external_id must be provided to identify the user
   * account.
   * @function Dropbox#teamMembersRecover
   * @arg {TeamMembersRecoverArg} arg - The request parameters.
   * @returns {Promise.<DropboxResponse<void>, DropboxResponseError.<TeamMembersRecoverError>>}
   */


  routes.teamMembersRecover = function (arg) {
    return this.request('team/members/recover', arg, 'team', 'api', 'rpc');
  };
  /**
   * Removes a member from a team. Permission : Team member management Exactly one
   * of team_member_id, email, or external_id must be provided to identify the
   * user account. Accounts can be recovered via members/recover for a 7 day
   * period or until the account has been permanently deleted or transferred to
   * another account (whichever comes first). Calling members/add while a user is
   * still recoverable on your team will return with
   * MemberAddResult.user_already_on_team. Accounts can have their files
   * transferred via the admin console for a limited time, based on the version
   * history length associated with the team (180 days for most teams). This
   * endpoint may initiate an asynchronous job. To obtain the final result of the
   * job, the client should periodically poll members/remove/job_status/get.
   * @function Dropbox#teamMembersRemove
   * @arg {TeamMembersRemoveArg} arg - The request parameters.
   * @returns {Promise.<DropboxResponse<AsyncLaunchEmptyResult>, DropboxResponseError.<TeamMembersRemoveError>>}
   */


  routes.teamMembersRemove = function (arg) {
    return this.request('team/members/remove', arg, 'team', 'api', 'rpc');
  };
  /**
   * Once an async_job_id is returned from members/remove , use this to poll the
   * status of the asynchronous request. Permission : Team member management.
   * @function Dropbox#teamMembersRemoveJobStatusGet
   * @arg {AsyncPollArg} arg - The request parameters.
   * @returns {Promise.<DropboxResponse<AsyncPollEmptyResult>, DropboxResponseError.<AsyncPollError>>}
   */


  routes.teamMembersRemoveJobStatusGet = function (arg) {
    return this.request('team/members/remove/job_status/get', arg, 'team', 'api', 'rpc');
  };
  /**
   * Add secondary emails to users. Permission : Team member management. Emails
   * that are on verified domains will be verified automatically. For each email
   * address not on a verified domain a verification email will be sent.
   * @function Dropbox#teamMembersSecondaryEmailsAdd
   * @arg {TeamAddSecondaryEmailsArg} arg - The request parameters.
   * @returns {Promise.<DropboxResponse<TeamAddSecondaryEmailsResult>, DropboxResponseError.<TeamAddSecondaryEmailsError>>}
   */


  routes.teamMembersSecondaryEmailsAdd = function (arg) {
    return this.request('team/members/secondary_emails/add', arg, 'team', 'api', 'rpc');
  };
  /**
   * Delete secondary emails from users Permission : Team member management. Users
   * will be notified of deletions of verified secondary emails at both the
   * secondary email and their primary email.
   * @function Dropbox#teamMembersSecondaryEmailsDelete
   * @arg {TeamDeleteSecondaryEmailsArg} arg - The request parameters.
   * @returns {Promise.<DropboxResponse<TeamDeleteSecondaryEmailsResult>, DropboxResponseError.<void>>}
   */


  routes.teamMembersSecondaryEmailsDelete = function (arg) {
    return this.request('team/members/secondary_emails/delete', arg, 'team', 'api', 'rpc');
  };
  /**
   * Resend secondary email verification emails. Permission : Team member
   * management.
   * @function Dropbox#teamMembersSecondaryEmailsResendVerificationEmails
   * @arg {TeamResendVerificationEmailArg} arg - The request parameters.
   * @returns {Promise.<DropboxResponse<TeamResendVerificationEmailResult>, DropboxResponseError.<void>>}
   */


  routes.teamMembersSecondaryEmailsResendVerificationEmails = function (arg) {
    return this.request('team/members/secondary_emails/resend_verification_emails', arg, 'team', 'api', 'rpc');
  };
  /**
   * Sends welcome email to pending team member. Permission : Team member
   * management Exactly one of team_member_id, email, or external_id must be
   * provided to identify the user account. No-op if team member is not pending.
   * @function Dropbox#teamMembersSendWelcomeEmail
   * @arg {TeamUserSelectorArg} arg - The request parameters.
   * @returns {Promise.<DropboxResponse<void>, DropboxResponseError.<TeamMembersSendWelcomeError>>}
   */


  routes.teamMembersSendWelcomeEmail = function (arg) {
    return this.request('team/members/send_welcome_email', arg, 'team', 'api', 'rpc');
  };
  /**
   * Updates a team member's permissions. Permission : Team member management.
   * @function Dropbox#teamMembersSetAdminPermissionsV2
   * @arg {TeamMembersSetPermissions2Arg} arg - The request parameters.
   * @returns {Promise.<DropboxResponse<TeamMembersSetPermissions2Result>, DropboxResponseError.<TeamMembersSetPermissions2Error>>}
   */


  routes.teamMembersSetAdminPermissionsV2 = function (arg) {
    return this.request('team/members/set_admin_permissions_v2', arg, 'team', 'api', 'rpc');
  };
  /**
   * Updates a team member's permissions. Permission : Team member management.
   * @function Dropbox#teamMembersSetAdminPermissions
   * @arg {TeamMembersSetPermissionsArg} arg - The request parameters.
   * @returns {Promise.<DropboxResponse<TeamMembersSetPermissionsResult>, DropboxResponseError.<TeamMembersSetPermissionsError>>}
   */


  routes.teamMembersSetAdminPermissions = function (arg) {
    return this.request('team/members/set_admin_permissions', arg, 'team', 'api', 'rpc');
  };
  /**
   * Updates a team member's profile. Permission : Team member management.
   * @function Dropbox#teamMembersSetProfileV2
   * @arg {TeamMembersSetProfileArg} arg - The request parameters.
   * @returns {Promise.<DropboxResponse<TeamTeamMemberInfoV2Result>, DropboxResponseError.<TeamMembersSetProfileError>>}
   */


  routes.teamMembersSetProfileV2 = function (arg) {
    return this.request('team/members/set_profile_v2', arg, 'team', 'api', 'rpc');
  };
  /**
   * Updates a team member's profile. Permission : Team member management.
   * @function Dropbox#teamMembersSetProfile
   * @arg {TeamMembersSetProfileArg} arg - The request parameters.
   * @returns {Promise.<DropboxResponse<TeamTeamMemberInfo>, DropboxResponseError.<TeamMembersSetProfileError>>}
   */


  routes.teamMembersSetProfile = function (arg) {
    return this.request('team/members/set_profile', arg, 'team', 'api', 'rpc');
  };
  /**
   * Updates a team member's profile photo. Permission : Team member management.
   * @function Dropbox#teamMembersSetProfilePhotoV2
   * @arg {TeamMembersSetProfilePhotoArg} arg - The request parameters.
   * @returns {Promise.<DropboxResponse<TeamTeamMemberInfoV2Result>, DropboxResponseError.<TeamMembersSetProfilePhotoError>>}
   */


  routes.teamMembersSetProfilePhotoV2 = function (arg) {
    return this.request('team/members/set_profile_photo_v2', arg, 'team', 'api', 'rpc');
  };
  /**
   * Updates a team member's profile photo. Permission : Team member management.
   * @function Dropbox#teamMembersSetProfilePhoto
   * @arg {TeamMembersSetProfilePhotoArg} arg - The request parameters.
   * @returns {Promise.<DropboxResponse<TeamTeamMemberInfo>, DropboxResponseError.<TeamMembersSetProfilePhotoError>>}
   */


  routes.teamMembersSetProfilePhoto = function (arg) {
    return this.request('team/members/set_profile_photo', arg, 'team', 'api', 'rpc');
  };
  /**
   * Suspend a member from a team. Permission : Team member management Exactly one
   * of team_member_id, email, or external_id must be provided to identify the
   * user account.
   * @function Dropbox#teamMembersSuspend
   * @arg {TeamMembersDeactivateArg} arg - The request parameters.
   * @returns {Promise.<DropboxResponse<void>, DropboxResponseError.<TeamMembersSuspendError>>}
   */


  routes.teamMembersSuspend = function (arg) {
    return this.request('team/members/suspend', arg, 'team', 'api', 'rpc');
  };
  /**
   * Unsuspend a member from a team. Permission : Team member management Exactly
   * one of team_member_id, email, or external_id must be provided to identify the
   * user account.
   * @function Dropbox#teamMembersUnsuspend
   * @arg {TeamMembersUnsuspendArg} arg - The request parameters.
   * @returns {Promise.<DropboxResponse<void>, DropboxResponseError.<TeamMembersUnsuspendError>>}
   */


  routes.teamMembersUnsuspend = function (arg) {
    return this.request('team/members/unsuspend', arg, 'team', 'api', 'rpc');
  };
  /**
   * Returns a list of all team-accessible namespaces. This list includes team
   * folders, shared folders containing team members, team members' home
   * namespaces, and team members' app folders. Home namespaces and app folders
   * are always owned by this team or members of the team, but shared folders may
   * be owned by other users or other teams. Duplicates may occur in the list.
   * @function Dropbox#teamNamespacesList
   * @arg {TeamTeamNamespacesListArg} arg - The request parameters.
   * @returns {Promise.<DropboxResponse<TeamTeamNamespacesListResult>, DropboxResponseError.<TeamTeamNamespacesListError>>}
   */


  routes.teamNamespacesList = function (arg) {
    return this.request('team/namespaces/list', arg, 'team', 'api', 'rpc');
  };
  /**
   * Once a cursor has been retrieved from namespaces/list, use this to paginate
   * through all team-accessible namespaces. Duplicates may occur in the list.
   * @function Dropbox#teamNamespacesListContinue
   * @arg {TeamTeamNamespacesListContinueArg} arg - The request parameters.
   * @returns {Promise.<DropboxResponse<TeamTeamNamespacesListResult>, DropboxResponseError.<TeamTeamNamespacesListContinueError>>}
   */


  routes.teamNamespacesListContinue = function (arg) {
    return this.request('team/namespaces/list/continue', arg, 'team', 'api', 'rpc');
  };
  /**
   * Permission : Team member file access.
   * @function Dropbox#teamPropertiesTemplateAdd
   * @deprecated
   * @arg {FilePropertiesAddTemplateArg} arg - The request parameters.
   * @returns {Promise.<DropboxResponse<FilePropertiesAddTemplateResult>, DropboxResponseError.<FilePropertiesModifyTemplateError>>}
   */


  routes.teamPropertiesTemplateAdd = function (arg) {
    return this.request('team/properties/template/add', arg, 'team', 'api', 'rpc');
  };
  /**
   * Permission : Team member file access. The scope for the route is
   * files.team_metadata.write.
   * @function Dropbox#teamPropertiesTemplateGet
   * @deprecated
   * @arg {FilePropertiesGetTemplateArg} arg - The request parameters.
   * @returns {Promise.<DropboxResponse<FilePropertiesGetTemplateResult>, DropboxResponseError.<FilePropertiesTemplateError>>}
   */


  routes.teamPropertiesTemplateGet = function (arg) {
    return this.request('team/properties/template/get', arg, 'team', 'api', 'rpc');
  };
  /**
   * Permission : Team member file access. The scope for the route is
   * files.team_metadata.write.
   * @function Dropbox#teamPropertiesTemplateList
   * @deprecated
   * @returns {Promise.<DropboxResponse<FilePropertiesListTemplateResult>, DropboxResponseError.<FilePropertiesTemplateError>>}
   */


  routes.teamPropertiesTemplateList = function () {
    return this.request('team/properties/template/list', null, 'team', 'api', 'rpc');
  };
  /**
   * Permission : Team member file access.
   * @function Dropbox#teamPropertiesTemplateUpdate
   * @deprecated
   * @arg {FilePropertiesUpdateTemplateArg} arg - The request parameters.
   * @returns {Promise.<DropboxResponse<FilePropertiesUpdateTemplateResult>, DropboxResponseError.<FilePropertiesModifyTemplateError>>}
   */


  routes.teamPropertiesTemplateUpdate = function (arg) {
    return this.request('team/properties/template/update', arg, 'team', 'api', 'rpc');
  };
  /**
   * Retrieves reporting data about a team's user activity. Deprecated: Will be
   * removed on July 1st 2021.
   * @function Dropbox#teamReportsGetActivity
   * @deprecated
   * @arg {TeamDateRange} arg - The request parameters.
   * @returns {Promise.<DropboxResponse<TeamGetActivityReport>, DropboxResponseError.<TeamDateRangeError>>}
   */


  routes.teamReportsGetActivity = function (arg) {
    return this.request('team/reports/get_activity', arg, 'team', 'api', 'rpc');
  };
  /**
   * Retrieves reporting data about a team's linked devices. Deprecated: Will be
   * removed on July 1st 2021.
   * @function Dropbox#teamReportsGetDevices
   * @deprecated
   * @arg {TeamDateRange} arg - The request parameters.
   * @returns {Promise.<DropboxResponse<TeamGetDevicesReport>, DropboxResponseError.<TeamDateRangeError>>}
   */


  routes.teamReportsGetDevices = function (arg) {
    return this.request('team/reports/get_devices', arg, 'team', 'api', 'rpc');
  };
  /**
   * Retrieves reporting data about a team's membership. Deprecated: Will be
   * removed on July 1st 2021.
   * @function Dropbox#teamReportsGetMembership
   * @deprecated
   * @arg {TeamDateRange} arg - The request parameters.
   * @returns {Promise.<DropboxResponse<TeamGetMembershipReport>, DropboxResponseError.<TeamDateRangeError>>}
   */


  routes.teamReportsGetMembership = function (arg) {
    return this.request('team/reports/get_membership', arg, 'team', 'api', 'rpc');
  };
  /**
   * Retrieves reporting data about a team's storage usage. Deprecated: Will be
   * removed on July 1st 2021.
   * @function Dropbox#teamReportsGetStorage
   * @deprecated
   * @arg {TeamDateRange} arg - The request parameters.
   * @returns {Promise.<DropboxResponse<TeamGetStorageReport>, DropboxResponseError.<TeamDateRangeError>>}
   */


  routes.teamReportsGetStorage = function (arg) {
    return this.request('team/reports/get_storage', arg, 'team', 'api', 'rpc');
  };
  /**
   * Sets an archived team folder's status to active. Permission : Team member
   * file access.
   * @function Dropbox#teamTeamFolderActivate
   * @arg {TeamTeamFolderIdArg} arg - The request parameters.
   * @returns {Promise.<DropboxResponse<TeamTeamFolderMetadata>, DropboxResponseError.<TeamTeamFolderActivateError>>}
   */


  routes.teamTeamFolderActivate = function (arg) {
    return this.request('team/team_folder/activate', arg, 'team', 'api', 'rpc');
  };
  /**
   * Sets an active team folder's status to archived and removes all folder and
   * file members. This endpoint cannot be used for teams that have a shared team
   * space. Permission : Team member file access.
   * @function Dropbox#teamTeamFolderArchive
   * @arg {TeamTeamFolderArchiveArg} arg - The request parameters.
   * @returns {Promise.<DropboxResponse<TeamTeamFolderArchiveLaunch>, DropboxResponseError.<TeamTeamFolderArchiveError>>}
   */


  routes.teamTeamFolderArchive = function (arg) {
    return this.request('team/team_folder/archive', arg, 'team', 'api', 'rpc');
  };
  /**
   * Returns the status of an asynchronous job for archiving a team folder.
   * Permission : Team member file access.
   * @function Dropbox#teamTeamFolderArchiveCheck
   * @arg {AsyncPollArg} arg - The request parameters.
   * @returns {Promise.<DropboxResponse<TeamTeamFolderArchiveJobStatus>, DropboxResponseError.<AsyncPollError>>}
   */


  routes.teamTeamFolderArchiveCheck = function (arg) {
    return this.request('team/team_folder/archive/check', arg, 'team', 'api', 'rpc');
  };
  /**
   * Creates a new, active, team folder with no members. This endpoint can only be
   * used for teams that do not already have a shared team space. Permission :
   * Team member file access.
   * @function Dropbox#teamTeamFolderCreate
   * @arg {TeamTeamFolderCreateArg} arg - The request parameters.
   * @returns {Promise.<DropboxResponse<TeamTeamFolderMetadata>, DropboxResponseError.<TeamTeamFolderCreateError>>}
   */


  routes.teamTeamFolderCreate = function (arg) {
    return this.request('team/team_folder/create', arg, 'team', 'api', 'rpc');
  };
  /**
   * Retrieves metadata for team folders. Permission : Team member file access.
   * @function Dropbox#teamTeamFolderGetInfo
   * @arg {TeamTeamFolderIdListArg} arg - The request parameters.
   * @returns {Promise.<DropboxResponse<Array.<TeamTeamFolderGetInfoItem>>, DropboxResponseError.<void>>}
   */


  routes.teamTeamFolderGetInfo = function (arg) {
    return this.request('team/team_folder/get_info', arg, 'team', 'api', 'rpc');
  };
  /**
   * Lists all team folders. Permission : Team member file access.
   * @function Dropbox#teamTeamFolderList
   * @arg {TeamTeamFolderListArg} arg - The request parameters.
   * @returns {Promise.<DropboxResponse<TeamTeamFolderListResult>, DropboxResponseError.<TeamTeamFolderListError>>}
   */


  routes.teamTeamFolderList = function (arg) {
    return this.request('team/team_folder/list', arg, 'team', 'api', 'rpc');
  };
  /**
   * Once a cursor has been retrieved from team_folder/list, use this to paginate
   * through all team folders. Permission : Team member file access.
   * @function Dropbox#teamTeamFolderListContinue
   * @arg {TeamTeamFolderListContinueArg} arg - The request parameters.
   * @returns {Promise.<DropboxResponse<TeamTeamFolderListResult>, DropboxResponseError.<TeamTeamFolderListContinueError>>}
   */


  routes.teamTeamFolderListContinue = function (arg) {
    return this.request('team/team_folder/list/continue', arg, 'team', 'api', 'rpc');
  };
  /**
   * Permanently deletes an archived team folder. This endpoint cannot be used for
   * teams that have a shared team space. Permission : Team member file access.
   * @function Dropbox#teamTeamFolderPermanentlyDelete
   * @arg {TeamTeamFolderIdArg} arg - The request parameters.
   * @returns {Promise.<DropboxResponse<void>, DropboxResponseError.<TeamTeamFolderPermanentlyDeleteError>>}
   */


  routes.teamTeamFolderPermanentlyDelete = function (arg) {
    return this.request('team/team_folder/permanently_delete', arg, 'team', 'api', 'rpc');
  };
  /**
   * Changes an active team folder's name. Permission : Team member file access.
   * @function Dropbox#teamTeamFolderRename
   * @arg {TeamTeamFolderRenameArg} arg - The request parameters.
   * @returns {Promise.<DropboxResponse<TeamTeamFolderMetadata>, DropboxResponseError.<TeamTeamFolderRenameError>>}
   */


  routes.teamTeamFolderRename = function (arg) {
    return this.request('team/team_folder/rename', arg, 'team', 'api', 'rpc');
  };
  /**
   * Updates the sync settings on a team folder or its contents.  Use of this
   * endpoint requires that the team has team selective sync enabled.
   * @function Dropbox#teamTeamFolderUpdateSyncSettings
   * @arg {TeamTeamFolderUpdateSyncSettingsArg} arg - The request parameters.
   * @returns {Promise.<DropboxResponse<TeamTeamFolderMetadata>, DropboxResponseError.<TeamTeamFolderUpdateSyncSettingsError>>}
   */


  routes.teamTeamFolderUpdateSyncSettings = function (arg) {
    return this.request('team/team_folder/update_sync_settings', arg, 'team', 'api', 'rpc');
  };
  /**
   * Returns the member profile of the admin who generated the team access token
   * used to make the call.
   * @function Dropbox#teamTokenGetAuthenticatedAdmin
   * @returns {Promise.<DropboxResponse<TeamTokenGetAuthenticatedAdminResult>, DropboxResponseError.<TeamTokenGetAuthenticatedAdminError>>}
   */


  routes.teamTokenGetAuthenticatedAdmin = function () {
    return this.request('team/token/get_authenticated_admin', null, 'team', 'api', 'rpc');
  };
  /**
   * Retrieves team events. If the result's GetTeamEventsResult.has_more field is
   * true, call get_events/continue with the returned cursor to retrieve more
   * entries. If end_time is not specified in your request, you may use the
   * returned cursor to poll get_events/continue for new events. Many attributes
   * note 'may be missing due to historical data gap'. Note that the
   * file_operations category and & analogous paper events are not available on
   * all Dropbox Business plans /business/plans-comparison. Use
   * features/get_values
   * /developers/documentation/http/teams#team-features-get_values to check for
   * this feature. Permission : Team Auditing.
   * @function Dropbox#teamLogGetEvents
   * @arg {TeamLogGetTeamEventsArg} arg - The request parameters.
   * @returns {Promise.<DropboxResponse<TeamLogGetTeamEventsResult>, DropboxResponseError.<TeamLogGetTeamEventsError>>}
   */


  routes.teamLogGetEvents = function (arg) {
    return this.request('team_log/get_events', arg, 'team', 'api', 'rpc');
  };
  /**
   * Once a cursor has been retrieved from get_events, use this to paginate
   * through all events. Permission : Team Auditing.
   * @function Dropbox#teamLogGetEventsContinue
   * @arg {TeamLogGetTeamEventsContinueArg} arg - The request parameters.
   * @returns {Promise.<DropboxResponse<TeamLogGetTeamEventsResult>, DropboxResponseError.<TeamLogGetTeamEventsContinueError>>}
   */


  routes.teamLogGetEventsContinue = function (arg) {
    return this.request('team_log/get_events/continue', arg, 'team', 'api', 'rpc');
  };
  /**
   * Get a list of feature values that may be configured for the current account.
   * @function Dropbox#usersFeaturesGetValues
   * @arg {UsersUserFeaturesGetValuesBatchArg} arg - The request parameters.
   * @returns {Promise.<DropboxResponse<UsersUserFeaturesGetValuesBatchResult>, DropboxResponseError.<UsersUserFeaturesGetValuesBatchError>>}
   */


  routes.usersFeaturesGetValues = function (arg) {
    return this.request('users/features/get_values', arg, 'user', 'api', 'rpc');
  };
  /**
   * Get information about a user's account.
   * @function Dropbox#usersGetAccount
   * @arg {UsersGetAccountArg} arg - The request parameters.
   * @returns {Promise.<DropboxResponse<UsersBasicAccount>, DropboxResponseError.<UsersGetAccountError>>}
   */


  routes.usersGetAccount = function (arg) {
    return this.request('users/get_account', arg, 'user', 'api', 'rpc');
  };
  /**
   * Get information about multiple user accounts.  At most 300 accounts may be
   * queried per request.
   * @function Dropbox#usersGetAccountBatch
   * @arg {UsersGetAccountBatchArg} arg - The request parameters.
   * @returns {Promise.<DropboxResponse<Object>, DropboxResponseError.<UsersGetAccountBatchError>>}
   */


  routes.usersGetAccountBatch = function (arg) {
    return this.request('users/get_account_batch', arg, 'user', 'api', 'rpc');
  };
  /**
   * Get information about the current user's account.
   * @function Dropbox#usersGetCurrentAccount
   * @returns {Promise.<DropboxResponse<UsersFullAccount>, DropboxResponseError.<void>>}
   */


  routes.usersGetCurrentAccount = function () {
    return this.request('users/get_current_account', null, 'user', 'api', 'rpc');
  };
  /**
   * Get the space usage information for the current user's account.
   * @function Dropbox#usersGetSpaceUsage
   * @returns {Promise.<DropboxResponse<UsersSpaceUsage>, DropboxResponseError.<void>>}
   */


  routes.usersGetSpaceUsage = function () {
    return this.request('users/get_space_usage', null, 'user', 'api', 'rpc');
  };

  function getSafeUnicode(c) {
    var unicode = "000".concat(c.charCodeAt(0).toString(16)).slice(-4);
    return "\\u".concat(unicode);
  }

  var baseApiUrl = function baseApiUrl(subdomain) {
    var domain = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : DEFAULT_API_DOMAIN;
    var domainDelimiter = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '.';

    if (domain !== DEFAULT_API_DOMAIN && TEST_DOMAIN_MAPPINGS[subdomain] !== undefined) {
      subdomain = TEST_DOMAIN_MAPPINGS[subdomain];
      domainDelimiter = '-';
    }

    return "https://".concat(subdomain).concat(domainDelimiter).concat(domain, "/2/");
  };
  var OAuth2AuthorizationUrl = function OAuth2AuthorizationUrl() {
    var domain = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : DEFAULT_DOMAIN;

    if (domain !== DEFAULT_DOMAIN) {
      domain = "meta-".concat(domain);
    }

    return "https://".concat(domain, "/oauth2/authorize");
  };
  var OAuth2TokenUrl = function OAuth2TokenUrl() {
    var domain = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : DEFAULT_API_DOMAIN;
    var domainDelimiter = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '.';
    var subdomain = 'api';

    if (domain !== DEFAULT_API_DOMAIN) {
      subdomain = TEST_DOMAIN_MAPPINGS[subdomain];
      domainDelimiter = '-';
    }

    return "https://".concat(subdomain).concat(domainDelimiter).concat(domain, "/oauth2/token");
  }; // source https://www.dropboxforum.com/t5/API-support/HTTP-header-quot-Dropbox-API-Arg-quot-could-not-decode-input-as/m-p/173823/highlight/true#M6786

  function httpHeaderSafeJson(args) {
    return JSON.stringify(args).replace(/[\u007f-\uffff]/g, getSafeUnicode);
  }
  function getTokenExpiresAtDate(expiresIn) {
    return new Date(Date.now() + expiresIn * 1000);
  }
  /* global WorkerGlobalScope */

  function isWindowOrWorker() {
    return typeof WorkerGlobalScope !== 'undefined' && self instanceof WorkerGlobalScope // eslint-disable-line no-restricted-globals
    || typeof module === 'undefined' || typeof window !== 'undefined';
  }
  function isBrowserEnv() {
    return typeof window !== 'undefined';
  }
  function createBrowserSafeString(toBeConverted) {
    var convertedString = toBeConverted.toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
    return convertedString;
  }

  /**
   * The response class of HTTP errors from API calls using the Dropbox SDK.
   * @class DropboxResponseError
   * @classdesc The response class of HTTP errors from API calls using the Dropbox SDK.
   * @arg {number} status - HTTP Status code of the call
   * @arg {Object} headers - Headers returned from the call
   * @arg {Object} error - Serialized Error of the call
   */
  var DropboxResponseError = /*#__PURE__*/function (_Error) {
    _inherits(DropboxResponseError, _Error);

    var _super = _createSuper(DropboxResponseError);

    function DropboxResponseError(status, headers, error) {
      var _this;

      _classCallCheck(this, DropboxResponseError);

      _this = _super.call(this, "Response failed with a ".concat(status, " code"));
      _this.name = 'DropboxResponseError';
      _this.status = status;
      _this.headers = headers;
      _this.error = error;
      return _this;
    }

    return DropboxResponseError;
  }( /*#__PURE__*/_wrapNativeSuper(Error));

  var DropboxResponse = function DropboxResponse(status, headers, result) {
    _classCallCheck(this, DropboxResponse);

    this.status = status;
    this.headers = headers;
    this.result = result;
  };

  function throwAsError(res) {
    return res.text().then(function (data) {
      var errorObject;

      try {
        errorObject = JSON.parse(data);
      } catch (error) {
        errorObject = data;
      }

      throw new DropboxResponseError(res.status, res.headers, errorObject);
    });
  }

  function parseResponse(res) {
    if (!res.ok) {
      return throwAsError(res);
    }

    return res.text().then(function (data) {
      var responseObject;

      try {
        responseObject = JSON.parse(data);
      } catch (error) {
        responseObject = data;
      }

      return new DropboxResponse(res.status, res.headers, responseObject);
    });
  }
  function parseDownloadResponse(res) {
    if (!res.ok) {
      return throwAsError(res);
    }

    return new Promise(function (resolve) {
      if (isWindowOrWorker()) {
        res.blob().then(function (data) {
          return resolve(data);
        });
      } else {
        res.buffer().then(function (data) {
          return resolve(data);
        });
      }
    }).then(function (data) {
      var result = JSON.parse(res.headers.get('dropbox-api-result'));

      if (isWindowOrWorker()) {
        result.fileBlob = data;
      } else {
        result.fileBinary = data;
      }

      return new DropboxResponse(res.status, res.headers, result);
    });
  }

  var fetch;

  if (isBrowserEnv()) {
    fetch = window.fetch.bind(window);
  } else {
    fetch = require('node-fetch'); // eslint-disable-line global-require
  }

  var crypto;

  if (isBrowserEnv()) {
    crypto = window.crypto || window.msCrypto; // for IE11
  } else {
    crypto = require('crypto'); // eslint-disable-line global-require
  }

  var Encoder;

  if (typeof TextEncoder === 'undefined') {
    Encoder = require('util').TextEncoder; // eslint-disable-line global-require
  } else {
    Encoder = TextEncoder;
  } // Expiration is 300 seconds but needs to be in milliseconds for Date object


  var TokenExpirationBuffer = 300 * 1000;
  var PKCELength = 128;
  var TokenAccessTypes = ['legacy', 'offline', 'online'];
  var GrantTypes = ['code', 'token'];
  var IncludeGrantedScopes = ['none', 'user', 'team'];
  /**
   * @class DropboxAuth
   * @classdesc The DropboxAuth class that provides methods to manage, acquire, and refresh tokens.
   * @arg {Object} options
   * @arg {Function} [options.fetch] - fetch library for making requests.
   * @arg {String} [options.accessToken] - An access token for making authenticated
   * requests.
   * @arg {Date} [options.AccessTokenExpiresAt] - Date of the current access token's
   * expiration (if available)
   * @arg {String} [options.refreshToken] - A refresh token for retrieving access tokens
   * @arg {String} [options.clientId] - The client id for your app. Used to create
   * authentication URL.
   * @arg {String} [options.clientSecret] - The client secret for your app. Used to create
   * authentication URL and refresh access tokens.
   * @arg {String} [options.domain] - A custom domain to use when making api requests. This
   * should only be used for testing as scaffolding to avoid making network requests.
   * @arg {String} [options.domainDelimiter] - A custom delimiter to use when separating domain from
   * subdomain. This should only be used for testing as scaffolding.
   */

  var DropboxAuth = /*#__PURE__*/function () {
    function DropboxAuth(options) {
      _classCallCheck(this, DropboxAuth);

      options = options || {};
      this.fetch = options.fetch || fetch;
      this.accessToken = options.accessToken;
      this.accessTokenExpiresAt = options.accessTokenExpiresAt;
      this.refreshToken = options.refreshToken;
      this.clientId = options.clientId;
      this.clientSecret = options.clientSecret;
      this.domain = options.domain;
      this.domainDelimiter = options.domainDelimiter;
    }
    /**
       * Set the access token used to authenticate requests to the API.
       * @arg {String} accessToken - An access token
       * @returns {undefined}
       */


    _createClass(DropboxAuth, [{
      key: "setAccessToken",
      value: function setAccessToken(accessToken) {
        this.accessToken = accessToken;
      }
      /**
         * Get the access token
         * @returns {String} Access token
         */

    }, {
      key: "getAccessToken",
      value: function getAccessToken() {
        return this.accessToken;
      }
      /**
         * Set the client id, which is used to help gain an access token.
         * @arg {String} clientId - Your apps client id
         * @returns {undefined}
         */

    }, {
      key: "setClientId",
      value: function setClientId(clientId) {
        this.clientId = clientId;
      }
      /**
         * Get the client id
         * @returns {String} Client id
         */

    }, {
      key: "getClientId",
      value: function getClientId() {
        return this.clientId;
      }
      /**
         * Set the client secret
         * @arg {String} clientSecret - Your app's client secret
         * @returns {undefined}
         */

    }, {
      key: "setClientSecret",
      value: function setClientSecret(clientSecret) {
        this.clientSecret = clientSecret;
      }
      /**
         * Get the client secret
         * @returns {String} Client secret
         */

    }, {
      key: "getClientSecret",
      value: function getClientSecret() {
        return this.clientSecret;
      }
      /**
         * Gets the refresh token
         * @returns {String} Refresh token
         */

    }, {
      key: "getRefreshToken",
      value: function getRefreshToken() {
        return this.refreshToken;
      }
      /**
         * Sets the refresh token
         * @param refreshToken - A refresh token
         */

    }, {
      key: "setRefreshToken",
      value: function setRefreshToken(refreshToken) {
        this.refreshToken = refreshToken;
      }
      /**
         * Gets the access token's expiration date
         * @returns {Date} date of token expiration
         */

    }, {
      key: "getAccessTokenExpiresAt",
      value: function getAccessTokenExpiresAt() {
        return this.accessTokenExpiresAt;
      }
      /**
         * Sets the access token's expiration date
         * @param accessTokenExpiresAt - new expiration date
         */

    }, {
      key: "setAccessTokenExpiresAt",
      value: function setAccessTokenExpiresAt(accessTokenExpiresAt) {
        this.accessTokenExpiresAt = accessTokenExpiresAt;
      }
      /**
         * Sets the code verifier for PKCE flow
         * @param {String} codeVerifier - new code verifier
         */

    }, {
      key: "setCodeVerifier",
      value: function setCodeVerifier(codeVerifier) {
        this.codeVerifier = codeVerifier;
      }
      /**
         * Gets the code verifier for PKCE flow
         * @returns {String} - code verifier for PKCE
         */

    }, {
      key: "getCodeVerifier",
      value: function getCodeVerifier() {
        return this.codeVerifier;
      }
    }, {
      key: "generateCodeChallenge",
      value: function generateCodeChallenge() {
        var _this = this;

        var encoder = new Encoder();
        var codeData = encoder.encode(this.codeVerifier);
        var codeChallenge;

        if (isBrowserEnv()) {
          return crypto.subtle.digest('SHA-256', codeData).then(function (digestedHash) {
            var base64String = btoa(String.fromCharCode.apply(null, new Uint8Array(digestedHash)));
            codeChallenge = createBrowserSafeString(base64String).substr(0, 128);
            _this.codeChallenge = codeChallenge;
          });
        }

        var digestedHash = crypto.createHash('sha256').update(codeData).digest();
        codeChallenge = createBrowserSafeString(digestedHash);
        this.codeChallenge = codeChallenge;
        return Promise.resolve();
      }
    }, {
      key: "generatePKCECodes",
      value: function generatePKCECodes() {
        var codeVerifier;

        if (isBrowserEnv()) {
          var array = new Uint8Array(PKCELength);
          var randomValueArray = crypto.getRandomValues(array);
          var base64String = btoa(randomValueArray);
          codeVerifier = createBrowserSafeString(base64String).substr(0, 128);
        } else {
          var randomBytes = crypto.randomBytes(PKCELength);
          codeVerifier = createBrowserSafeString(randomBytes).substr(0, 128);
        }

        this.codeVerifier = codeVerifier;
        return this.generateCodeChallenge();
      }
      /**
         * Get a URL that can be used to authenticate users for the Dropbox API.
         * @arg {String} redirectUri - A URL to redirect the user to after
         * authenticating. This must be added to your app through the admin interface.
         * @arg {String} [state] - State that will be returned in the redirect URL to help
         * prevent cross site scripting attacks.
         * @arg {String} [authType] - auth type, defaults to 'token', other option is 'code'
         * @arg {String} [tokenAccessType] - type of token to request.  From the following:
         * null - creates a token with the app default (either legacy or online)
         * legacy - creates one long-lived token with no expiration
         * online - create one short-lived token with an expiration
         * offline - create one short-lived token with an expiration with a refresh token
         * @arg {Array<String>} [scope] - scopes to request for the grant
         * @arg {String} [includeGrantedScopes] - whether or not to include previously granted scopes.
         * From the following:
         * user - include user scopes in the grant
         * team - include team scopes in the grant
         * Note: if this user has never linked the app, include_granted_scopes must be None
         * @arg {boolean} [usePKCE] - Whether or not to use Sha256 based PKCE. PKCE should be only use
         * on client apps which doesn't call your server. It is less secure than non-PKCE flow but
         * can be used if you are unable to safely retrieve your app secret
         * @returns {Promise<String>} - Url to send user to for Dropbox API authentication
         * returned in a promise
         */

    }, {
      key: "getAuthenticationUrl",
      value: function getAuthenticationUrl(redirectUri, state) {
        var _this2 = this;

        var authType = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'token';
        var tokenAccessType = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
        var scope = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : null;
        var includeGrantedScopes = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 'none';
        var usePKCE = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : false;
        var clientId = this.getClientId();
        var baseUrl = OAuth2AuthorizationUrl(this.domain);

        if (!clientId) {
          throw new Error('A client id is required. You can set the client id using .setClientId().');
        }

        if (authType !== 'code' && !redirectUri) {
          throw new Error('A redirect uri is required.');
        }

        if (!GrantTypes.includes(authType)) {
          throw new Error('Authorization type must be code or token');
        }

        if (tokenAccessType && !TokenAccessTypes.includes(tokenAccessType)) {
          throw new Error('Token Access Type must be legacy, offline, or online');
        }

        if (scope && !(scope instanceof Array)) {
          throw new Error('Scope must be an array of strings');
        }

        if (!IncludeGrantedScopes.includes(includeGrantedScopes)) {
          throw new Error('includeGrantedScopes must be none, user, or team');
        }

        var authUrl;

        if (authType === 'code') {
          authUrl = "".concat(baseUrl, "?response_type=code&client_id=").concat(clientId);
        } else {
          authUrl = "".concat(baseUrl, "?response_type=token&client_id=").concat(clientId);
        }

        if (redirectUri) {
          authUrl += "&redirect_uri=".concat(redirectUri);
        }

        if (state) {
          authUrl += "&state=".concat(state);
        }

        if (tokenAccessType) {
          authUrl += "&token_access_type=".concat(tokenAccessType);
        }

        if (scope) {
          authUrl += "&scope=".concat(scope.join(' '));
        }

        if (includeGrantedScopes !== 'none') {
          authUrl += "&include_granted_scopes=".concat(includeGrantedScopes);
        }

        if (usePKCE) {
          return this.generatePKCECodes().then(function () {
            authUrl += '&code_challenge_method=S256';
            authUrl += "&code_challenge=".concat(_this2.codeChallenge);
            return authUrl;
          });
        }

        return Promise.resolve(authUrl);
      }
      /**
         * Get an OAuth2 access token from an OAuth2 Code.
         * @arg {String} redirectUri - A URL to redirect the user to after
         * authenticating. This must be added to your app through the admin interface.
         * @arg {String} code - An OAuth2 code.
         * @returns {Object} An object containing the token and related info (if applicable)
         */

    }, {
      key: "getAccessTokenFromCode",
      value: function getAccessTokenFromCode(redirectUri, code) {
        var clientId = this.getClientId();
        var clientSecret = this.getClientSecret();

        if (!clientId) {
          throw new Error('A client id is required. You can set the client id using .setClientId().');
        }

        var path = OAuth2TokenUrl(this.domain, this.domainDelimiter);
        path += '?grant_type=authorization_code';
        path += "&code=".concat(code);
        path += "&client_id=".concat(clientId);

        if (clientSecret) {
          path += "&client_secret=".concat(clientSecret);
        } else {
          if (!this.codeVerifier) {
            throw new Error('You must use PKCE when generating the authorization URL to not include a client secret');
          }

          path += "&code_verifier=".concat(this.codeVerifier);
        }

        if (redirectUri) {
          path += "&redirect_uri=".concat(redirectUri);
        }

        var fetchOptions = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        };
        return this.fetch(path, fetchOptions).then(function (res) {
          return parseResponse(res);
        });
      }
      /**
         * Checks if a token is needed, can be refreshed and if the token is expired.
         * If so, attempts to refresh access token
         * @returns {Promise<*>}
         */

    }, {
      key: "checkAndRefreshAccessToken",
      value: function checkAndRefreshAccessToken() {
        var canRefresh = this.getRefreshToken() && this.getClientId();
        var needsRefresh = !this.getAccessTokenExpiresAt() || new Date(Date.now() + TokenExpirationBuffer) >= this.getAccessTokenExpiresAt();
        var needsToken = !this.getAccessToken();

        if ((needsRefresh || needsToken) && canRefresh) {
          return this.refreshAccessToken();
        }

        return Promise.resolve();
      }
      /**
         * Refreshes the access token using the refresh token, if available
         * @arg {Array<String>} scope - a subset of scopes from the original
         * refresh to acquire with an access token
         * @returns {Promise<*>}
         */

    }, {
      key: "refreshAccessToken",
      value: function refreshAccessToken() {
        var _this3 = this;

        var scope = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
        var refreshUrl = OAuth2TokenUrl(this.domain, this.domainDelimiter);
        var clientId = this.getClientId();
        var clientSecret = this.getClientSecret();

        if (!clientId) {
          throw new Error('A client id is required. You can set the client id using .setClientId().');
        }

        if (scope && !(scope instanceof Array)) {
          throw new Error('Scope must be an array of strings');
        }

        var headers = {};
        headers['Content-Type'] = 'application/json';
        refreshUrl += "?grant_type=refresh_token&refresh_token=".concat(this.getRefreshToken());
        refreshUrl += "&client_id=".concat(clientId);

        if (clientSecret) {
          refreshUrl += "&client_secret=".concat(clientSecret);
        }

        if (scope) {
          refreshUrl += "&scope=".concat(scope.join(' '));
        }

        var fetchOptions = {
          method: 'POST'
        };
        fetchOptions.headers = headers;
        return this.fetch(refreshUrl, fetchOptions).then(function (res) {
          return parseResponse(res);
        }).then(function (res) {
          _this3.setAccessToken(res.result.access_token);

          _this3.setAccessTokenExpiresAt(getTokenExpiresAtDate(res.result.expires_in));
        });
      }
    }]);

    return DropboxAuth;
  }();

  var fetch$1;

  if (typeof window !== 'undefined') {
    fetch$1 = window.fetch.bind(window);
  } else {
    fetch$1 = require('node-fetch'); // eslint-disable-line global-require
  }

  var b64 = typeof btoa === 'undefined' ? function (str) {
    return Buffer.from(str).toString('base64');
  } : btoa;
  /**
   * @class Dropbox
   * @classdesc The Dropbox SDK class that provides methods to read, write and
   * create files or folders in a user or team's Dropbox.
   * @arg {Object} options
   * @arg {Function} [options.fetch] - fetch library for making requests.
   * @arg {String} [options.selectUser] - Select user is only used for team functionality.
   * It specifies which user the team access token should be acting as.
   * @arg {String} [options.pathRoot] - root path to access other namespaces
   * Use to access team folders for example
   * @arg {String} [options.selectAdmin] - Select admin is only used by team functionality.
   * It specifies which team admin the team access token should be acting as.
   * @arg {DropboxAuth} [options.auth] - The DropboxAuth object used to authenticate requests.
   * If this is set, the remaining parameters will be ignored.
   * @arg {String} [options.accessToken] - An access token for making authenticated
   * requests.
   * @arg {Date} [options.accessTokenExpiresAt] - Date of the current access token's
   * expiration (if available)
   * @arg {String} [options.refreshToken] - A refresh token for retrieving access tokens
   * @arg {String} [options.clientId] - The client id for your app. Used to create
   * authentication URL.
   * @arg {String} [options.clientSecret] - The client secret for your app. Used to create
   * authentication URL and refresh access tokens.
   * @arg {String} [options.domain] - A custom domain to use when making api requests. This
   * should only be used for testing as scaffolding to avoid making network requests.
   * @arg {String} [options.domainDelimiter] - A custom delimiter to use when separating domain from
   * subdomain. This should only be used for testing as scaffolding.
   */

  var Dropbox = /*#__PURE__*/function () {
    function Dropbox(options) {
      _classCallCheck(this, Dropbox);

      options = options || {};

      if (options.auth) {
        this.auth = options.auth;
      } else {
        this.auth = new DropboxAuth(options);
      }

      this.fetch = options.fetch || fetch$1;
      this.selectUser = options.selectUser;
      this.selectAdmin = options.selectAdmin;
      this.pathRoot = options.pathRoot;
      this.domain = options.domain;
      this.domainDelimiter = options.domainDelimiter;
      Object.assign(this, routes);
    }

    _createClass(Dropbox, [{
      key: "request",
      value: function request(path, args, auth, host, style) {
        // checks for multiauth and assigns auth based on priority to create header in switch case
        if (auth.split(',').length > 1) {
          var authTypes = auth.replace(' ', '').split(',');

          if (authTypes.includes(USER_AUTH) && this.auth.getAccessToken()) {
            auth = USER_AUTH;
          } else if (authTypes.includes(TEAM_AUTH) && this.auth.getAccessToken()) {
            auth = TEAM_AUTH;
          } else if (authTypes.includes(APP_AUTH)) {
            auth = APP_AUTH;
          }
        }

        switch (style) {
          case RPC:
            return this.rpcRequest(path, args, auth, host);

          case DOWNLOAD:
            return this.downloadRequest(path, args, auth, host);

          case UPLOAD:
            return this.uploadRequest(path, args, auth, host);

          default:
            throw new Error("Invalid request style: ".concat(style));
        }
      }
    }, {
      key: "rpcRequest",
      value: function rpcRequest(path, body, auth, host) {
        var _this = this;

        return this.auth.checkAndRefreshAccessToken().then(function () {
          var fetchOptions = {
            method: 'POST',
            body: body ? JSON.stringify(body) : null,
            headers: {}
          };

          if (body) {
            fetchOptions.headers['Content-Type'] = 'application/json';
          }

          var authHeader;

          switch (auth) {
            case APP_AUTH:
              if (!_this.auth.clientId || !_this.auth.clientSecret) {
                throw new Error('A client id and secret is required for this function');
              }

              authHeader = b64("".concat(_this.auth.clientId, ":").concat(_this.auth.clientSecret));
              fetchOptions.headers.Authorization = "Basic ".concat(authHeader);
              break;

            case TEAM_AUTH:
            case USER_AUTH:
              fetchOptions.headers.Authorization = "Bearer ".concat(_this.auth.getAccessToken());
              break;

            case NO_AUTH:
              break;

            default:
              throw new Error("Unhandled auth type: ".concat(auth));
          }

          _this.setCommonHeaders(fetchOptions);

          return fetchOptions;
        }).then(function (fetchOptions) {
          return _this.fetch(baseApiUrl(host, _this.domain, _this.domainDelimiter) + path, fetchOptions);
        }).then(function (res) {
          return parseResponse(res);
        });
      }
    }, {
      key: "downloadRequest",
      value: function downloadRequest(path, args, auth, host) {
        var _this2 = this;

        return this.auth.checkAndRefreshAccessToken().then(function () {
          if (auth !== USER_AUTH) {
            throw new Error("Unexpected auth type: ".concat(auth));
          }

          var fetchOptions = {
            method: 'POST',
            headers: {
              Authorization: "Bearer ".concat(_this2.auth.getAccessToken()),
              'Dropbox-API-Arg': httpHeaderSafeJson(args)
            }
          };

          _this2.setCommonHeaders(fetchOptions);

          return fetchOptions;
        }).then(function (fetchOptions) {
          return _this2.fetch(baseApiUrl(host, _this2.domain, _this2.domainDelimiter) + path, fetchOptions);
        }).then(function (res) {
          return parseDownloadResponse(res);
        });
      }
    }, {
      key: "uploadRequest",
      value: function uploadRequest(path, args, auth, host) {
        var _this3 = this;

        return this.auth.checkAndRefreshAccessToken().then(function () {
          if (auth !== USER_AUTH) {
            throw new Error("Unexpected auth type: ".concat(auth));
          }

          var contents = args.contents;
          delete args.contents;
          var fetchOptions = {
            body: contents,
            method: 'POST',
            headers: {
              Authorization: "Bearer ".concat(_this3.auth.getAccessToken()),
              'Content-Type': 'application/octet-stream',
              'Dropbox-API-Arg': httpHeaderSafeJson(args)
            }
          };

          _this3.setCommonHeaders(fetchOptions);

          return fetchOptions;
        }).then(function (fetchOptions) {
          return _this3.fetch(baseApiUrl(host, _this3.domain, _this3.domainDelimiter) + path, fetchOptions);
        }).then(function (res) {
          return parseResponse(res);
        });
      }
    }, {
      key: "setCommonHeaders",
      value: function setCommonHeaders(options) {
        if (this.selectUser) {
          options.headers['Dropbox-API-Select-User'] = this.selectUser;
        }

        if (this.selectAdmin) {
          options.headers['Dropbox-API-Select-Admin'] = this.selectAdmin;
        }

        if (this.pathRoot) {
          options.headers['Dropbox-API-Path-Root'] = this.pathRoot;
        }
      }
    }]);

    return Dropbox;
  }();

  exports.Dropbox = Dropbox;
  exports.DropboxAuth = DropboxAuth;
  exports.DropboxResponse = DropboxResponse;
  exports.DropboxResponseError = DropboxResponseError;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=Dropbox-sdk.js.map
