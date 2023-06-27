(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g=(g.jsforce||(g.jsforce = {}));g=(g.modules||(g.modules = {}));g=(g.api||(g.api = {}));g.Soap = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
/**
 * @file Salesforce SOAP API
 * @author Shinichi Tomita <shinichi.tomita@gmail.com>
 */

'use strict';

var _ = window.jsforce.require('lodash/core');
var jsforce = window.jsforce.require('./core');
var SOAP = window.jsforce.require('./soap');

/**
 * API class for Partner SOAP call
 *
 * @class
 * @param {Connection} conn - Connection
 */
var SoapApi = module.exports = function(conn) {
  this._conn = conn;
};

/**
 * Call SOAP Api (Partner) endpoint
 * @private
 */
SoapApi.prototype._invoke = function(method, message, schema, callback) {
  var soapEndpoint = new SOAP(this._conn, {
    xmlns: "urn:partner.soap.sforce.com",
    endpointUrl: this._conn.instanceUrl + "/services/Soap/u/" + this._conn.version
  });
  return soapEndpoint.invoke(method, message, { result: schema }).then(function(res) {
    return res.result;
  }).thenCall(callback);
};


/* */
var Schemas = {};

/**
 * @typedef SoapApi~LeadConvert
 * @prop {String} convertedStatus - Status of converted lead
 * @prop {String} leadId - Lead record Id to convert
 * @prop {String} [accountId] - Account record Id to assign the converted record
 * @prop {String} [contactId] - Contact record Id to assign the converted record
 * @prop {Boolean} [doNotCreateOpportunity] - True if you don't want to create a new opportunity
 * @prop {String} [opportunityName] - Name of opportunity to create
 * @prop {Boolean} [overwriteLeadSource] - True if overwriting lead source
 * @prop {String} [ownerId] - Owner Id
 * @prop {Boolean} [sendNotificationEmail] - True if send notification email
 */
/**
 * @typedef SoapApi~LeadConvertResult
 * @prop {String} leadId - Lead record Id to convert
 * @prop {String} [accountId] - Account record Id of converted lead
 * @prop {String} [contactId] - Contact record Id of converted lead
 * @prop {String} [opportunityId] - Opportunity record Id created in conversion
 * @prop {Boolean} success - True if successfully converted
 * @prop {Array.<Object>} errors - Error
 */
/**
 * Converts a Lead into an Account, Contact, or (optionally) an Opportunity.
 *
 * @param {SoapApi~LeadConvert|Array.<SoapApi~LeadConvert>} leadConverts
 * @param {Callback.<SoapApi~LeadConvertResult|Array.<SoapApi~LeadConvertResult>>} [callback] - Callback function
 * @returns {Promise.<SoapApi~LeadConvertResult|Array.<SoapApi~LeadConvertResult>>}
 */
SoapApi.prototype.convertLead = function(leadConverts, callback) {
  var schema = _.isArray(leadConverts) ? [ Schemas.LeadConvertResult ] : Schemas.LeadConvertResult;
  return this._invoke("convertLead", { leadConverts: leadConverts }, schema, callback);
};
Schemas.LeadConvertResult = {
  success: 'boolean',
  errors: [],
  leadId: 'string',
  accountId: 'string',
  contactId: 'string',
  opportunityId: 'string'
};

/**
 * @typedef SoapApi~MergeRequest
 * @prop {Object} masterRecord - The merge destination record
 * @prop {Array.<String>} recordToMergeIds - Ids of records to merge
 */
/**
 * @typedef SoapApi~MergeResult
 * @prop {Boolean} success - True if successfully merged
 * @prop {Array.<Object>} errors - Error
 * @prop {String} id - ID of the master record
 * @prop {Array.<String>} mergedRecordIds - ID of the records that were merged into the master record
 * @prop {Array.<String>} updatedRelatedIds - ID of all related records that were moved (re-parented) as a result of the merge
 */

/**
 * Merge up to three records into one
 *
 * @param {SoapApi~MergeRequest|Array.<SoapApi~MergeRequest>} mergeRequests
 * @param {Callback.<SoapApi~MergeResult|Array.<SoapApi~MergeResult>>} [callback] - Callback function
 * @returns {Promise.<SoapApi~MergeResult|Array.<SoapApi~MergeResult>>}
 */
SoapApi.prototype.merge = function(mergeRequests, callback) {
  var schema = _.isArray(mergeRequests) ? [ Schemas.MergeResult ] : Schemas.MergeResult;
  return this._invoke("merge", { mergeRequests: mergeRequests }, schema, callback);
};
Schemas.MergeResult = {
  success: 'boolean',
  errors: [],
  id: 'string',
  mergedRecordIds: ['string'],
  updatedRelatedIds: ['string']
};


/**
 * @typedef SoapApi~EmptyRecycleBinResult
 * @prop {String} id - ID of an sObject that you attempted to delete from the Recycle Bin
 * @prop {Boolean} success - Whether the call succeeded (true) or not (false) for this record
 * @prop {Array.<Object>} errors - Errors
 */
/**
 * Delete records from the recycle bin immediately
 *
 * @param {Array.<String>} ids - Record ids to empty from recycle bin
 * @param {Callback.<Array.<SoapApi~EmptyRecycleBinResult>>} [callback] - Callback function
 * @returns {Promise.<Array.<SoapApi~EmptyRecycleBinResult>>}
 */
SoapApi.prototype.emptyRecycleBin = function(ids, callback) {
  return this._invoke("emptyRecycleBin", { ids: ids }, [ Schemas.EmptyRecycleBinResult ], callback);
};
Schemas.EmptyRecycleBinResult = {
  id: 'string',
  success: 'boolean',
  errors: []
};


/**
 * @typedef SoapApi~DescribeTabSetResult
 * @prop {String} label - The display label for this standard or custom app
 * @prop {String} logoUrl - A fully qualified URL to the logo image associated with the standard or custom app
 * @prop {String} namespace - Namespace of application package
 * @prop {Boolean} selected - If true, then this standard or custom app is the user’s currently selected app
 * @prop {Array.<SoapApi~DescribeTab>} tabs - An array of tabs that are displayed for the specified standard app or custom app
 */
/**
 * @typedef SoapApi~DescribeTab
 * @prop {Array.<Object>} colors - Array of color information used for a tab
 * @prop {Boolean} custom - true if this is a custom tab
 * @prop {String} iconUrl - The URL for the main 32 x 32 pixel icon for a tab
 * @prop {Array.<Object>} icons - Array of icon information used for a tab
 * @prop {String} label - The display label for this tab
 * @prop {String} miniIconUrl - The URL for the 16 x 16 pixel icon that represents a tab
 * @prop {String} name - The API name of the tab
 * @prop {String} sobjectName - The name of the sObject that is primarily displayed on this tab
 * @prop {String} url - A fully qualified URL for viewing this tab
 */
/**
 * Returns information about the standard and custom apps available to the logged-in user
 *
 * @param {Callback.<Array.<SoapApi~DescribeTabSetResult>>} [callback] - Callback function
 * @returns {Promise.<Array.<SoapApi~DescribeTabSetResult>>}
 */
SoapApi.prototype.describeTabs = function(callback) {
  return this._invoke("describeTabs", {}, [ Schemas.DescribeTabSetResult ], callback);
};
Schemas.DescribeTabSetResult = {
  label: 'string',
  logoUrl: 'string',
  namespace: 'string',
  selected: 'boolean',
  tabs: [{
    colors: [{
      theme: 'string',
      color: 'string',
      context: 'string'
    }],
    iconUrl: 'string',
    icons: [{
      theme: 'string',
      height: 'number',
      width: 'number',
      url: 'string',
      contentType: 'string'
    }],
    label: 'string',
    custom: 'boolean',
    miniIconUrl: 'string',
    name: 'string',
    sobjectName: 'string',
    url: 'string'
  }]
};

/**
 * Retrieves the current system timestamp (Coordinated Universal Time (UTC) time zone) from the API
 *
 * @typedef SoapApi~ServerTimestampResult
 * @prop {String} timestamp - Timestamp
 */
/**
 * @param {Callback.<SoapApi~ServerTimestampResult>} [callback] - Callback function
 * @returns {Promise.<SoapApi~ServerTimestampResult>}
 */
SoapApi.prototype.getServerTimestamp = function(callback) {
  return this._invoke("getServerTimestamp", {}, Schemas.GetServerTimestampResult, callback);
};
Schemas.GetServerTimestampResult = {
  timestamp: 'string'
};

/**
 * @typedef SoapApi~UserInfoResult
 * @prop {Boolean} accessibilityMode
 * @prop {String} currencySymbol
 * @prop {Number} orgAttachmentFileSizeLimit
 * @prop {String} orgDefaultCurrencyIsoCode
 * @prop {String} orgDisallowHtmlAttachments
 * @prop {Boolean} orgHasPersonAccounts
 * @prop {String} organizationId
 * @prop {Boolean} organizationMultiCurrency
 * @prop {String} organizationName
 * @prop {String} profileId
 * @prop {String} roleId
 * @prop {Number} sessionSecondsValid
 * @prop {String} userDefaultCurrencyIsoCode
 * @prop {String} userEmail
 * @prop {String} userFullName
 * @prop {String} userId
 * @prop {String} userLanguage
 * @prop {String} userLocale
 * @prop {String} userName
 * @prop {String} userTimeZone
 * @prop {String} userType
 * @prop {String} userUiSkin
 */
/**
 * Retrieves personal information for the user associated with the current session
 *
 * @param {Callback.<SoapApi~UserInfoResult>} [callback] - Callback function
 * @returns {Promise.<SoapApi~UserInfoResult>}
 */
SoapApi.prototype.getUserInfo = function(callback) {
  return this._invoke("getUserInfo", {}, Schemas.GetUserInfoResult, callback);
};
Schemas.GetUserInfoResult = {
  accessibilityMode: 'boolean',
  currencySymbol: 'string',
  orgAttachmentFileSizeLimit: 'number',
  orgDefaultCurrencyIsoCode: 'string',
  orgDisallowHtmlAttachments: 'boolean',
  orgHasPersonAccounts: 'boolean',
  organizationId: 'string',
  organizationMultiCurrency: 'boolean',
  organizationName: 'string',
  profileId: 'string',
  roleId: 'string',
  sessionSecondsValid: 'number',
  userDefaultCurrencyIsoCode: 'string',
  userEmail: 'string',
  userFullName: 'string',
  userId: 'string',
  userLanguage: 'string',
  userLocale: 'string',
  userName: 'string',
  userTimeZone: 'string',
  userType: 'string',
  userUiSkin: 'string'
};

/**
 * Sets the specified user’s password to the specified value
 *
 * @param {String} userId - User Id to set password
 * @param {String} password - New password
 * @param {Callback.<String>} [callback] - Callback function
 * @returns {Promise.<String>}
 */
SoapApi.prototype.setPassword = function(userId, password, callback) {
  return this._invoke("setPassword", { userId: userId, password: password }, callback);
};

/**
 * @typedef SoapApi~ResetPasswordResult
 * @prop {String} password
 */
/**
 * Resets the specified user’s password
 *
 * @param {String} userId - User Id to set password
 * @param {String} password - New password
 * @param {Callback.<SoapApi~ResetPasswordResult>} [callback] - Callback function
 * @returns {Promise.<SoapApi~ResetPasswordResult>}
 */
SoapApi.prototype.resetPassword = function(userId, callback) {
  return this._invoke("resetPassword", { userId: userId }, callback);
};

/**
 * Adds one or more new records to your organization’s data
 *
 * @param {Array.<Object>} sObjects - Records to insert
 * @param {Callback.<SoapApi~SaveResult>} [callback] - Callback function
 * @returns {Promise.<SoapApi~SaveResult>}
 */
SoapApi.prototype.create = function(sObjects, callback) {
  var schema = _.isArray(sObjects) ? [ Schemas.SaveResult ] : Schemas.SaveResult;
  var args = {
    '@xmlns' : 'urn:partner.soap.sforce.com',
    '@xmlns:ns1' : 'sobject.partner.soap.sforce.com',
    'ns1:sObjects' : sObjects
  };
  return this._invoke("create", args, schema, callback);
};

/**
 * Updates one or more existing records in your organization’s data.
 *
 * @param {Array.<Object>} sObjects - Records to update
 * @param {Callback.<SoapApi~SaveResult>} [callback] - Callback function
 * @returns {Promise.<SoapApi~SaveResult>}
 */
SoapApi.prototype.update = function(sObjects, callback) {
  var schema = _.isArray(sObjects) ? [ Schemas.SaveResult ] : Schemas.SaveResult;
  var args = {
    '@xmlns' : 'urn:partner.soap.sforce.com',
    '@xmlns:ns1' : 'sobject.partner.soap.sforce.com',
    'ns1:sObjects' : sObjects
  };
  return this._invoke("update", args, schema, callback);
};

Schemas.SaveResult = {
  success: 'boolean',
  errors: [],
  id: 'string'
};

/**
 * Creates new records and updates existing records in your organization’s data.
 *
 * @param {Array.<Object>} sObjects - Records to upsert
 * @param {Callback.<SoapApi~UpsertResult>} [callback] - Callback function
 * @returns {Promise.<SoapApi~UpsertResult>}
 */
SoapApi.prototype.upsert = function(externalIdFieldName, sObjects, callback) {
  var schema = _.isArray(sObjects) ? [ Schemas.UpsertResult ] : Schemas.UpsertResult;
  var args = {
    '@xmlns' : 'urn:partner.soap.sforce.com',
    '@xmlns:ns1' : 'sobject.partner.soap.sforce.com',
    'ns1:externalIDFieldName' : externalIdFieldName,
    'ns1:sObjects' : sObjects
  };
  return this._invoke("upsert", args, schema, callback);
};

Schemas.UpsertResult = {
  created: 'boolean',
  success: 'boolean',
  errors: [],
  id: 'string'
};

/**
 * Deletes one or more records from your organization’s data
 *
 * @param {Array.<Object>} ids - Id of records to delete
 * @param {Callback.<SoapApi~DeleteResult>} [callback] - Callback function
 * @returns {Promise.<SoapApi~DeleteResult>}
 */
SoapApi.prototype.delete = function(ids, callback) {
  var schema = _.isArray(ids) ? [ Schemas.DeleteResult ] : Schemas.DeleteResult;
  var args = {
    '@xmlns' : 'urn:partner.soap.sforce.com',
    '@xmlns:ns1' : 'sobject.partner.soap.sforce.com',
    'ns1:ids' : ids
  };
  return this._invoke("delete", args, schema, callback);
};

Schemas.DeleteResult = {
  success: 'boolean',
  errors: [],
  id: 'string'
};


/*--------------------------------------------*/
/*
 * Register hook in connection instantiation for dynamically adding this API module features
 */
jsforce.on('connection:new', function(conn) {
  conn.soap = new SoapApi(conn);
});


module.exports = SoapApi;

},{}]},{},[1])(1)
});

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJsaWIvYXBpL3NvYXAuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiLyoqXG4gKiBAZmlsZSBTYWxlc2ZvcmNlIFNPQVAgQVBJXG4gKiBAYXV0aG9yIFNoaW5pY2hpIFRvbWl0YSA8c2hpbmljaGkudG9taXRhQGdtYWlsLmNvbT5cbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBfID0gd2luZG93LmpzZm9yY2UucmVxdWlyZSgnbG9kYXNoL2NvcmUnKTtcbnZhciBqc2ZvcmNlID0gd2luZG93LmpzZm9yY2UucmVxdWlyZSgnLi9jb3JlJyk7XG52YXIgU09BUCA9IHdpbmRvdy5qc2ZvcmNlLnJlcXVpcmUoJy4vc29hcCcpO1xuXG4vKipcbiAqIEFQSSBjbGFzcyBmb3IgUGFydG5lciBTT0FQIGNhbGxcbiAqXG4gKiBAY2xhc3NcbiAqIEBwYXJhbSB7Q29ubmVjdGlvbn0gY29ubiAtIENvbm5lY3Rpb25cbiAqL1xudmFyIFNvYXBBcGkgPSBtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGNvbm4pIHtcbiAgdGhpcy5fY29ubiA9IGNvbm47XG59O1xuXG4vKipcbiAqIENhbGwgU09BUCBBcGkgKFBhcnRuZXIpIGVuZHBvaW50XG4gKiBAcHJpdmF0ZVxuICovXG5Tb2FwQXBpLnByb3RvdHlwZS5faW52b2tlID0gZnVuY3Rpb24obWV0aG9kLCBtZXNzYWdlLCBzY2hlbWEsIGNhbGxiYWNrKSB7XG4gIHZhciBzb2FwRW5kcG9pbnQgPSBuZXcgU09BUCh0aGlzLl9jb25uLCB7XG4gICAgeG1sbnM6IFwidXJuOnBhcnRuZXIuc29hcC5zZm9yY2UuY29tXCIsXG4gICAgZW5kcG9pbnRVcmw6IHRoaXMuX2Nvbm4uaW5zdGFuY2VVcmwgKyBcIi9zZXJ2aWNlcy9Tb2FwL3UvXCIgKyB0aGlzLl9jb25uLnZlcnNpb25cbiAgfSk7XG4gIHJldHVybiBzb2FwRW5kcG9pbnQuaW52b2tlKG1ldGhvZCwgbWVzc2FnZSwgeyByZXN1bHQ6IHNjaGVtYSB9KS50aGVuKGZ1bmN0aW9uKHJlcykge1xuICAgIHJldHVybiByZXMucmVzdWx0O1xuICB9KS50aGVuQ2FsbChjYWxsYmFjayk7XG59O1xuXG5cbi8qICovXG52YXIgU2NoZW1hcyA9IHt9O1xuXG4vKipcbiAqIEB0eXBlZGVmIFNvYXBBcGl+TGVhZENvbnZlcnRcbiAqIEBwcm9wIHtTdHJpbmd9IGNvbnZlcnRlZFN0YXR1cyAtIFN0YXR1cyBvZiBjb252ZXJ0ZWQgbGVhZFxuICogQHByb3Age1N0cmluZ30gbGVhZElkIC0gTGVhZCByZWNvcmQgSWQgdG8gY29udmVydFxuICogQHByb3Age1N0cmluZ30gW2FjY291bnRJZF0gLSBBY2NvdW50IHJlY29yZCBJZCB0byBhc3NpZ24gdGhlIGNvbnZlcnRlZCByZWNvcmRcbiAqIEBwcm9wIHtTdHJpbmd9IFtjb250YWN0SWRdIC0gQ29udGFjdCByZWNvcmQgSWQgdG8gYXNzaWduIHRoZSBjb252ZXJ0ZWQgcmVjb3JkXG4gKiBAcHJvcCB7Qm9vbGVhbn0gW2RvTm90Q3JlYXRlT3Bwb3J0dW5pdHldIC0gVHJ1ZSBpZiB5b3UgZG9uJ3Qgd2FudCB0byBjcmVhdGUgYSBuZXcgb3Bwb3J0dW5pdHlcbiAqIEBwcm9wIHtTdHJpbmd9IFtvcHBvcnR1bml0eU5hbWVdIC0gTmFtZSBvZiBvcHBvcnR1bml0eSB0byBjcmVhdGVcbiAqIEBwcm9wIHtCb29sZWFufSBbb3ZlcndyaXRlTGVhZFNvdXJjZV0gLSBUcnVlIGlmIG92ZXJ3cml0aW5nIGxlYWQgc291cmNlXG4gKiBAcHJvcCB7U3RyaW5nfSBbb3duZXJJZF0gLSBPd25lciBJZFxuICogQHByb3Age0Jvb2xlYW59IFtzZW5kTm90aWZpY2F0aW9uRW1haWxdIC0gVHJ1ZSBpZiBzZW5kIG5vdGlmaWNhdGlvbiBlbWFpbFxuICovXG4vKipcbiAqIEB0eXBlZGVmIFNvYXBBcGl+TGVhZENvbnZlcnRSZXN1bHRcbiAqIEBwcm9wIHtTdHJpbmd9IGxlYWRJZCAtIExlYWQgcmVjb3JkIElkIHRvIGNvbnZlcnRcbiAqIEBwcm9wIHtTdHJpbmd9IFthY2NvdW50SWRdIC0gQWNjb3VudCByZWNvcmQgSWQgb2YgY29udmVydGVkIGxlYWRcbiAqIEBwcm9wIHtTdHJpbmd9IFtjb250YWN0SWRdIC0gQ29udGFjdCByZWNvcmQgSWQgb2YgY29udmVydGVkIGxlYWRcbiAqIEBwcm9wIHtTdHJpbmd9IFtvcHBvcnR1bml0eUlkXSAtIE9wcG9ydHVuaXR5IHJlY29yZCBJZCBjcmVhdGVkIGluIGNvbnZlcnNpb25cbiAqIEBwcm9wIHtCb29sZWFufSBzdWNjZXNzIC0gVHJ1ZSBpZiBzdWNjZXNzZnVsbHkgY29udmVydGVkXG4gKiBAcHJvcCB7QXJyYXkuPE9iamVjdD59IGVycm9ycyAtIEVycm9yXG4gKi9cbi8qKlxuICogQ29udmVydHMgYSBMZWFkIGludG8gYW4gQWNjb3VudCwgQ29udGFjdCwgb3IgKG9wdGlvbmFsbHkpIGFuIE9wcG9ydHVuaXR5LlxuICpcbiAqIEBwYXJhbSB7U29hcEFwaX5MZWFkQ29udmVydHxBcnJheS48U29hcEFwaX5MZWFkQ29udmVydD59IGxlYWRDb252ZXJ0c1xuICogQHBhcmFtIHtDYWxsYmFjay48U29hcEFwaX5MZWFkQ29udmVydFJlc3VsdHxBcnJheS48U29hcEFwaX5MZWFkQ29udmVydFJlc3VsdD4+fSBbY2FsbGJhY2tdIC0gQ2FsbGJhY2sgZnVuY3Rpb25cbiAqIEByZXR1cm5zIHtQcm9taXNlLjxTb2FwQXBpfkxlYWRDb252ZXJ0UmVzdWx0fEFycmF5LjxTb2FwQXBpfkxlYWRDb252ZXJ0UmVzdWx0Pj59XG4gKi9cblNvYXBBcGkucHJvdG90eXBlLmNvbnZlcnRMZWFkID0gZnVuY3Rpb24obGVhZENvbnZlcnRzLCBjYWxsYmFjaykge1xuICB2YXIgc2NoZW1hID0gXy5pc0FycmF5KGxlYWRDb252ZXJ0cykgPyBbIFNjaGVtYXMuTGVhZENvbnZlcnRSZXN1bHQgXSA6IFNjaGVtYXMuTGVhZENvbnZlcnRSZXN1bHQ7XG4gIHJldHVybiB0aGlzLl9pbnZva2UoXCJjb252ZXJ0TGVhZFwiLCB7IGxlYWRDb252ZXJ0czogbGVhZENvbnZlcnRzIH0sIHNjaGVtYSwgY2FsbGJhY2spO1xufTtcblNjaGVtYXMuTGVhZENvbnZlcnRSZXN1bHQgPSB7XG4gIHN1Y2Nlc3M6ICdib29sZWFuJyxcbiAgZXJyb3JzOiBbXSxcbiAgbGVhZElkOiAnc3RyaW5nJyxcbiAgYWNjb3VudElkOiAnc3RyaW5nJyxcbiAgY29udGFjdElkOiAnc3RyaW5nJyxcbiAgb3Bwb3J0dW5pdHlJZDogJ3N0cmluZydcbn07XG5cbi8qKlxuICogQHR5cGVkZWYgU29hcEFwaX5NZXJnZVJlcXVlc3RcbiAqIEBwcm9wIHtPYmplY3R9IG1hc3RlclJlY29yZCAtIFRoZSBtZXJnZSBkZXN0aW5hdGlvbiByZWNvcmRcbiAqIEBwcm9wIHtBcnJheS48U3RyaW5nPn0gcmVjb3JkVG9NZXJnZUlkcyAtIElkcyBvZiByZWNvcmRzIHRvIG1lcmdlXG4gKi9cbi8qKlxuICogQHR5cGVkZWYgU29hcEFwaX5NZXJnZVJlc3VsdFxuICogQHByb3Age0Jvb2xlYW59IHN1Y2Nlc3MgLSBUcnVlIGlmIHN1Y2Nlc3NmdWxseSBtZXJnZWRcbiAqIEBwcm9wIHtBcnJheS48T2JqZWN0Pn0gZXJyb3JzIC0gRXJyb3JcbiAqIEBwcm9wIHtTdHJpbmd9IGlkIC0gSUQgb2YgdGhlIG1hc3RlciByZWNvcmRcbiAqIEBwcm9wIHtBcnJheS48U3RyaW5nPn0gbWVyZ2VkUmVjb3JkSWRzIC0gSUQgb2YgdGhlIHJlY29yZHMgdGhhdCB3ZXJlIG1lcmdlZCBpbnRvIHRoZSBtYXN0ZXIgcmVjb3JkXG4gKiBAcHJvcCB7QXJyYXkuPFN0cmluZz59IHVwZGF0ZWRSZWxhdGVkSWRzIC0gSUQgb2YgYWxsIHJlbGF0ZWQgcmVjb3JkcyB0aGF0IHdlcmUgbW92ZWQgKHJlLXBhcmVudGVkKSBhcyBhIHJlc3VsdCBvZiB0aGUgbWVyZ2VcbiAqL1xuXG4vKipcbiAqIE1lcmdlIHVwIHRvIHRocmVlIHJlY29yZHMgaW50byBvbmVcbiAqXG4gKiBAcGFyYW0ge1NvYXBBcGl+TWVyZ2VSZXF1ZXN0fEFycmF5LjxTb2FwQXBpfk1lcmdlUmVxdWVzdD59IG1lcmdlUmVxdWVzdHNcbiAqIEBwYXJhbSB7Q2FsbGJhY2suPFNvYXBBcGl+TWVyZ2VSZXN1bHR8QXJyYXkuPFNvYXBBcGl+TWVyZ2VSZXN1bHQ+Pn0gW2NhbGxiYWNrXSAtIENhbGxiYWNrIGZ1bmN0aW9uXG4gKiBAcmV0dXJucyB7UHJvbWlzZS48U29hcEFwaX5NZXJnZVJlc3VsdHxBcnJheS48U29hcEFwaX5NZXJnZVJlc3VsdD4+fVxuICovXG5Tb2FwQXBpLnByb3RvdHlwZS5tZXJnZSA9IGZ1bmN0aW9uKG1lcmdlUmVxdWVzdHMsIGNhbGxiYWNrKSB7XG4gIHZhciBzY2hlbWEgPSBfLmlzQXJyYXkobWVyZ2VSZXF1ZXN0cykgPyBbIFNjaGVtYXMuTWVyZ2VSZXN1bHQgXSA6IFNjaGVtYXMuTWVyZ2VSZXN1bHQ7XG4gIHJldHVybiB0aGlzLl9pbnZva2UoXCJtZXJnZVwiLCB7IG1lcmdlUmVxdWVzdHM6IG1lcmdlUmVxdWVzdHMgfSwgc2NoZW1hLCBjYWxsYmFjayk7XG59O1xuU2NoZW1hcy5NZXJnZVJlc3VsdCA9IHtcbiAgc3VjY2VzczogJ2Jvb2xlYW4nLFxuICBlcnJvcnM6IFtdLFxuICBpZDogJ3N0cmluZycsXG4gIG1lcmdlZFJlY29yZElkczogWydzdHJpbmcnXSxcbiAgdXBkYXRlZFJlbGF0ZWRJZHM6IFsnc3RyaW5nJ11cbn07XG5cblxuLyoqXG4gKiBAdHlwZWRlZiBTb2FwQXBpfkVtcHR5UmVjeWNsZUJpblJlc3VsdFxuICogQHByb3Age1N0cmluZ30gaWQgLSBJRCBvZiBhbiBzT2JqZWN0IHRoYXQgeW91IGF0dGVtcHRlZCB0byBkZWxldGUgZnJvbSB0aGUgUmVjeWNsZSBCaW5cbiAqIEBwcm9wIHtCb29sZWFufSBzdWNjZXNzIC0gV2hldGhlciB0aGUgY2FsbCBzdWNjZWVkZWQgKHRydWUpIG9yIG5vdCAoZmFsc2UpIGZvciB0aGlzIHJlY29yZFxuICogQHByb3Age0FycmF5LjxPYmplY3Q+fSBlcnJvcnMgLSBFcnJvcnNcbiAqL1xuLyoqXG4gKiBEZWxldGUgcmVjb3JkcyBmcm9tIHRoZSByZWN5Y2xlIGJpbiBpbW1lZGlhdGVseVxuICpcbiAqIEBwYXJhbSB7QXJyYXkuPFN0cmluZz59IGlkcyAtIFJlY29yZCBpZHMgdG8gZW1wdHkgZnJvbSByZWN5Y2xlIGJpblxuICogQHBhcmFtIHtDYWxsYmFjay48QXJyYXkuPFNvYXBBcGl+RW1wdHlSZWN5Y2xlQmluUmVzdWx0Pj59IFtjYWxsYmFja10gLSBDYWxsYmFjayBmdW5jdGlvblxuICogQHJldHVybnMge1Byb21pc2UuPEFycmF5LjxTb2FwQXBpfkVtcHR5UmVjeWNsZUJpblJlc3VsdD4+fVxuICovXG5Tb2FwQXBpLnByb3RvdHlwZS5lbXB0eVJlY3ljbGVCaW4gPSBmdW5jdGlvbihpZHMsIGNhbGxiYWNrKSB7XG4gIHJldHVybiB0aGlzLl9pbnZva2UoXCJlbXB0eVJlY3ljbGVCaW5cIiwgeyBpZHM6IGlkcyB9LCBbIFNjaGVtYXMuRW1wdHlSZWN5Y2xlQmluUmVzdWx0IF0sIGNhbGxiYWNrKTtcbn07XG5TY2hlbWFzLkVtcHR5UmVjeWNsZUJpblJlc3VsdCA9IHtcbiAgaWQ6ICdzdHJpbmcnLFxuICBzdWNjZXNzOiAnYm9vbGVhbicsXG4gIGVycm9yczogW11cbn07XG5cblxuLyoqXG4gKiBAdHlwZWRlZiBTb2FwQXBpfkRlc2NyaWJlVGFiU2V0UmVzdWx0XG4gKiBAcHJvcCB7U3RyaW5nfSBsYWJlbCAtIFRoZSBkaXNwbGF5IGxhYmVsIGZvciB0aGlzIHN0YW5kYXJkIG9yIGN1c3RvbSBhcHBcbiAqIEBwcm9wIHtTdHJpbmd9IGxvZ29VcmwgLSBBIGZ1bGx5IHF1YWxpZmllZCBVUkwgdG8gdGhlIGxvZ28gaW1hZ2UgYXNzb2NpYXRlZCB3aXRoIHRoZSBzdGFuZGFyZCBvciBjdXN0b20gYXBwXG4gKiBAcHJvcCB7U3RyaW5nfSBuYW1lc3BhY2UgLSBOYW1lc3BhY2Ugb2YgYXBwbGljYXRpb24gcGFja2FnZVxuICogQHByb3Age0Jvb2xlYW59IHNlbGVjdGVkIC0gSWYgdHJ1ZSwgdGhlbiB0aGlzIHN0YW5kYXJkIG9yIGN1c3RvbSBhcHAgaXMgdGhlIHVzZXLigJlzIGN1cnJlbnRseSBzZWxlY3RlZCBhcHBcbiAqIEBwcm9wIHtBcnJheS48U29hcEFwaX5EZXNjcmliZVRhYj59IHRhYnMgLSBBbiBhcnJheSBvZiB0YWJzIHRoYXQgYXJlIGRpc3BsYXllZCBmb3IgdGhlIHNwZWNpZmllZCBzdGFuZGFyZCBhcHAgb3IgY3VzdG9tIGFwcFxuICovXG4vKipcbiAqIEB0eXBlZGVmIFNvYXBBcGl+RGVzY3JpYmVUYWJcbiAqIEBwcm9wIHtBcnJheS48T2JqZWN0Pn0gY29sb3JzIC0gQXJyYXkgb2YgY29sb3IgaW5mb3JtYXRpb24gdXNlZCBmb3IgYSB0YWJcbiAqIEBwcm9wIHtCb29sZWFufSBjdXN0b20gLSB0cnVlIGlmIHRoaXMgaXMgYSBjdXN0b20gdGFiXG4gKiBAcHJvcCB7U3RyaW5nfSBpY29uVXJsIC0gVGhlIFVSTCBmb3IgdGhlIG1haW4gMzIgeCAzMiBwaXhlbCBpY29uIGZvciBhIHRhYlxuICogQHByb3Age0FycmF5LjxPYmplY3Q+fSBpY29ucyAtIEFycmF5IG9mIGljb24gaW5mb3JtYXRpb24gdXNlZCBmb3IgYSB0YWJcbiAqIEBwcm9wIHtTdHJpbmd9IGxhYmVsIC0gVGhlIGRpc3BsYXkgbGFiZWwgZm9yIHRoaXMgdGFiXG4gKiBAcHJvcCB7U3RyaW5nfSBtaW5pSWNvblVybCAtIFRoZSBVUkwgZm9yIHRoZSAxNiB4IDE2IHBpeGVsIGljb24gdGhhdCByZXByZXNlbnRzIGEgdGFiXG4gKiBAcHJvcCB7U3RyaW5nfSBuYW1lIC0gVGhlIEFQSSBuYW1lIG9mIHRoZSB0YWJcbiAqIEBwcm9wIHtTdHJpbmd9IHNvYmplY3ROYW1lIC0gVGhlIG5hbWUgb2YgdGhlIHNPYmplY3QgdGhhdCBpcyBwcmltYXJpbHkgZGlzcGxheWVkIG9uIHRoaXMgdGFiXG4gKiBAcHJvcCB7U3RyaW5nfSB1cmwgLSBBIGZ1bGx5IHF1YWxpZmllZCBVUkwgZm9yIHZpZXdpbmcgdGhpcyB0YWJcbiAqL1xuLyoqXG4gKiBSZXR1cm5zIGluZm9ybWF0aW9uIGFib3V0IHRoZSBzdGFuZGFyZCBhbmQgY3VzdG9tIGFwcHMgYXZhaWxhYmxlIHRvIHRoZSBsb2dnZWQtaW4gdXNlclxuICpcbiAqIEBwYXJhbSB7Q2FsbGJhY2suPEFycmF5LjxTb2FwQXBpfkRlc2NyaWJlVGFiU2V0UmVzdWx0Pj59IFtjYWxsYmFja10gLSBDYWxsYmFjayBmdW5jdGlvblxuICogQHJldHVybnMge1Byb21pc2UuPEFycmF5LjxTb2FwQXBpfkRlc2NyaWJlVGFiU2V0UmVzdWx0Pj59XG4gKi9cblNvYXBBcGkucHJvdG90eXBlLmRlc2NyaWJlVGFicyA9IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG4gIHJldHVybiB0aGlzLl9pbnZva2UoXCJkZXNjcmliZVRhYnNcIiwge30sIFsgU2NoZW1hcy5EZXNjcmliZVRhYlNldFJlc3VsdCBdLCBjYWxsYmFjayk7XG59O1xuU2NoZW1hcy5EZXNjcmliZVRhYlNldFJlc3VsdCA9IHtcbiAgbGFiZWw6ICdzdHJpbmcnLFxuICBsb2dvVXJsOiAnc3RyaW5nJyxcbiAgbmFtZXNwYWNlOiAnc3RyaW5nJyxcbiAgc2VsZWN0ZWQ6ICdib29sZWFuJyxcbiAgdGFiczogW3tcbiAgICBjb2xvcnM6IFt7XG4gICAgICB0aGVtZTogJ3N0cmluZycsXG4gICAgICBjb2xvcjogJ3N0cmluZycsXG4gICAgICBjb250ZXh0OiAnc3RyaW5nJ1xuICAgIH1dLFxuICAgIGljb25Vcmw6ICdzdHJpbmcnLFxuICAgIGljb25zOiBbe1xuICAgICAgdGhlbWU6ICdzdHJpbmcnLFxuICAgICAgaGVpZ2h0OiAnbnVtYmVyJyxcbiAgICAgIHdpZHRoOiAnbnVtYmVyJyxcbiAgICAgIHVybDogJ3N0cmluZycsXG4gICAgICBjb250ZW50VHlwZTogJ3N0cmluZydcbiAgICB9XSxcbiAgICBsYWJlbDogJ3N0cmluZycsXG4gICAgY3VzdG9tOiAnYm9vbGVhbicsXG4gICAgbWluaUljb25Vcmw6ICdzdHJpbmcnLFxuICAgIG5hbWU6ICdzdHJpbmcnLFxuICAgIHNvYmplY3ROYW1lOiAnc3RyaW5nJyxcbiAgICB1cmw6ICdzdHJpbmcnXG4gIH1dXG59O1xuXG4vKipcbiAqIFJldHJpZXZlcyB0aGUgY3VycmVudCBzeXN0ZW0gdGltZXN0YW1wIChDb29yZGluYXRlZCBVbml2ZXJzYWwgVGltZSAoVVRDKSB0aW1lIHpvbmUpIGZyb20gdGhlIEFQSVxuICpcbiAqIEB0eXBlZGVmIFNvYXBBcGl+U2VydmVyVGltZXN0YW1wUmVzdWx0XG4gKiBAcHJvcCB7U3RyaW5nfSB0aW1lc3RhbXAgLSBUaW1lc3RhbXBcbiAqL1xuLyoqXG4gKiBAcGFyYW0ge0NhbGxiYWNrLjxTb2FwQXBpflNlcnZlclRpbWVzdGFtcFJlc3VsdD59IFtjYWxsYmFja10gLSBDYWxsYmFjayBmdW5jdGlvblxuICogQHJldHVybnMge1Byb21pc2UuPFNvYXBBcGl+U2VydmVyVGltZXN0YW1wUmVzdWx0Pn1cbiAqL1xuU29hcEFwaS5wcm90b3R5cGUuZ2V0U2VydmVyVGltZXN0YW1wID0gZnVuY3Rpb24oY2FsbGJhY2spIHtcbiAgcmV0dXJuIHRoaXMuX2ludm9rZShcImdldFNlcnZlclRpbWVzdGFtcFwiLCB7fSwgU2NoZW1hcy5HZXRTZXJ2ZXJUaW1lc3RhbXBSZXN1bHQsIGNhbGxiYWNrKTtcbn07XG5TY2hlbWFzLkdldFNlcnZlclRpbWVzdGFtcFJlc3VsdCA9IHtcbiAgdGltZXN0YW1wOiAnc3RyaW5nJ1xufTtcblxuLyoqXG4gKiBAdHlwZWRlZiBTb2FwQXBpflVzZXJJbmZvUmVzdWx0XG4gKiBAcHJvcCB7Qm9vbGVhbn0gYWNjZXNzaWJpbGl0eU1vZGVcbiAqIEBwcm9wIHtTdHJpbmd9IGN1cnJlbmN5U3ltYm9sXG4gKiBAcHJvcCB7TnVtYmVyfSBvcmdBdHRhY2htZW50RmlsZVNpemVMaW1pdFxuICogQHByb3Age1N0cmluZ30gb3JnRGVmYXVsdEN1cnJlbmN5SXNvQ29kZVxuICogQHByb3Age1N0cmluZ30gb3JnRGlzYWxsb3dIdG1sQXR0YWNobWVudHNcbiAqIEBwcm9wIHtCb29sZWFufSBvcmdIYXNQZXJzb25BY2NvdW50c1xuICogQHByb3Age1N0cmluZ30gb3JnYW5pemF0aW9uSWRcbiAqIEBwcm9wIHtCb29sZWFufSBvcmdhbml6YXRpb25NdWx0aUN1cnJlbmN5XG4gKiBAcHJvcCB7U3RyaW5nfSBvcmdhbml6YXRpb25OYW1lXG4gKiBAcHJvcCB7U3RyaW5nfSBwcm9maWxlSWRcbiAqIEBwcm9wIHtTdHJpbmd9IHJvbGVJZFxuICogQHByb3Age051bWJlcn0gc2Vzc2lvblNlY29uZHNWYWxpZFxuICogQHByb3Age1N0cmluZ30gdXNlckRlZmF1bHRDdXJyZW5jeUlzb0NvZGVcbiAqIEBwcm9wIHtTdHJpbmd9IHVzZXJFbWFpbFxuICogQHByb3Age1N0cmluZ30gdXNlckZ1bGxOYW1lXG4gKiBAcHJvcCB7U3RyaW5nfSB1c2VySWRcbiAqIEBwcm9wIHtTdHJpbmd9IHVzZXJMYW5ndWFnZVxuICogQHByb3Age1N0cmluZ30gdXNlckxvY2FsZVxuICogQHByb3Age1N0cmluZ30gdXNlck5hbWVcbiAqIEBwcm9wIHtTdHJpbmd9IHVzZXJUaW1lWm9uZVxuICogQHByb3Age1N0cmluZ30gdXNlclR5cGVcbiAqIEBwcm9wIHtTdHJpbmd9IHVzZXJVaVNraW5cbiAqL1xuLyoqXG4gKiBSZXRyaWV2ZXMgcGVyc29uYWwgaW5mb3JtYXRpb24gZm9yIHRoZSB1c2VyIGFzc29jaWF0ZWQgd2l0aCB0aGUgY3VycmVudCBzZXNzaW9uXG4gKlxuICogQHBhcmFtIHtDYWxsYmFjay48U29hcEFwaX5Vc2VySW5mb1Jlc3VsdD59IFtjYWxsYmFja10gLSBDYWxsYmFjayBmdW5jdGlvblxuICogQHJldHVybnMge1Byb21pc2UuPFNvYXBBcGl+VXNlckluZm9SZXN1bHQ+fVxuICovXG5Tb2FwQXBpLnByb3RvdHlwZS5nZXRVc2VySW5mbyA9IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG4gIHJldHVybiB0aGlzLl9pbnZva2UoXCJnZXRVc2VySW5mb1wiLCB7fSwgU2NoZW1hcy5HZXRVc2VySW5mb1Jlc3VsdCwgY2FsbGJhY2spO1xufTtcblNjaGVtYXMuR2V0VXNlckluZm9SZXN1bHQgPSB7XG4gIGFjY2Vzc2liaWxpdHlNb2RlOiAnYm9vbGVhbicsXG4gIGN1cnJlbmN5U3ltYm9sOiAnc3RyaW5nJyxcbiAgb3JnQXR0YWNobWVudEZpbGVTaXplTGltaXQ6ICdudW1iZXInLFxuICBvcmdEZWZhdWx0Q3VycmVuY3lJc29Db2RlOiAnc3RyaW5nJyxcbiAgb3JnRGlzYWxsb3dIdG1sQXR0YWNobWVudHM6ICdib29sZWFuJyxcbiAgb3JnSGFzUGVyc29uQWNjb3VudHM6ICdib29sZWFuJyxcbiAgb3JnYW5pemF0aW9uSWQ6ICdzdHJpbmcnLFxuICBvcmdhbml6YXRpb25NdWx0aUN1cnJlbmN5OiAnYm9vbGVhbicsXG4gIG9yZ2FuaXphdGlvbk5hbWU6ICdzdHJpbmcnLFxuICBwcm9maWxlSWQ6ICdzdHJpbmcnLFxuICByb2xlSWQ6ICdzdHJpbmcnLFxuICBzZXNzaW9uU2Vjb25kc1ZhbGlkOiAnbnVtYmVyJyxcbiAgdXNlckRlZmF1bHRDdXJyZW5jeUlzb0NvZGU6ICdzdHJpbmcnLFxuICB1c2VyRW1haWw6ICdzdHJpbmcnLFxuICB1c2VyRnVsbE5hbWU6ICdzdHJpbmcnLFxuICB1c2VySWQ6ICdzdHJpbmcnLFxuICB1c2VyTGFuZ3VhZ2U6ICdzdHJpbmcnLFxuICB1c2VyTG9jYWxlOiAnc3RyaW5nJyxcbiAgdXNlck5hbWU6ICdzdHJpbmcnLFxuICB1c2VyVGltZVpvbmU6ICdzdHJpbmcnLFxuICB1c2VyVHlwZTogJ3N0cmluZycsXG4gIHVzZXJVaVNraW46ICdzdHJpbmcnXG59O1xuXG4vKipcbiAqIFNldHMgdGhlIHNwZWNpZmllZCB1c2Vy4oCZcyBwYXNzd29yZCB0byB0aGUgc3BlY2lmaWVkIHZhbHVlXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHVzZXJJZCAtIFVzZXIgSWQgdG8gc2V0IHBhc3N3b3JkXG4gKiBAcGFyYW0ge1N0cmluZ30gcGFzc3dvcmQgLSBOZXcgcGFzc3dvcmRcbiAqIEBwYXJhbSB7Q2FsbGJhY2suPFN0cmluZz59IFtjYWxsYmFja10gLSBDYWxsYmFjayBmdW5jdGlvblxuICogQHJldHVybnMge1Byb21pc2UuPFN0cmluZz59XG4gKi9cblNvYXBBcGkucHJvdG90eXBlLnNldFBhc3N3b3JkID0gZnVuY3Rpb24odXNlcklkLCBwYXNzd29yZCwgY2FsbGJhY2spIHtcbiAgcmV0dXJuIHRoaXMuX2ludm9rZShcInNldFBhc3N3b3JkXCIsIHsgdXNlcklkOiB1c2VySWQsIHBhc3N3b3JkOiBwYXNzd29yZCB9LCBjYWxsYmFjayk7XG59O1xuXG4vKipcbiAqIEB0eXBlZGVmIFNvYXBBcGl+UmVzZXRQYXNzd29yZFJlc3VsdFxuICogQHByb3Age1N0cmluZ30gcGFzc3dvcmRcbiAqL1xuLyoqXG4gKiBSZXNldHMgdGhlIHNwZWNpZmllZCB1c2Vy4oCZcyBwYXNzd29yZFxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSB1c2VySWQgLSBVc2VyIElkIHRvIHNldCBwYXNzd29yZFxuICogQHBhcmFtIHtTdHJpbmd9IHBhc3N3b3JkIC0gTmV3IHBhc3N3b3JkXG4gKiBAcGFyYW0ge0NhbGxiYWNrLjxTb2FwQXBpflJlc2V0UGFzc3dvcmRSZXN1bHQ+fSBbY2FsbGJhY2tdIC0gQ2FsbGJhY2sgZnVuY3Rpb25cbiAqIEByZXR1cm5zIHtQcm9taXNlLjxTb2FwQXBpflJlc2V0UGFzc3dvcmRSZXN1bHQ+fVxuICovXG5Tb2FwQXBpLnByb3RvdHlwZS5yZXNldFBhc3N3b3JkID0gZnVuY3Rpb24odXNlcklkLCBjYWxsYmFjaykge1xuICByZXR1cm4gdGhpcy5faW52b2tlKFwicmVzZXRQYXNzd29yZFwiLCB7IHVzZXJJZDogdXNlcklkIH0sIGNhbGxiYWNrKTtcbn07XG5cbi8qKlxuICogQWRkcyBvbmUgb3IgbW9yZSBuZXcgcmVjb3JkcyB0byB5b3VyIG9yZ2FuaXphdGlvbuKAmXMgZGF0YVxuICpcbiAqIEBwYXJhbSB7QXJyYXkuPE9iamVjdD59IHNPYmplY3RzIC0gUmVjb3JkcyB0byBpbnNlcnRcbiAqIEBwYXJhbSB7Q2FsbGJhY2suPFNvYXBBcGl+U2F2ZVJlc3VsdD59IFtjYWxsYmFja10gLSBDYWxsYmFjayBmdW5jdGlvblxuICogQHJldHVybnMge1Byb21pc2UuPFNvYXBBcGl+U2F2ZVJlc3VsdD59XG4gKi9cblNvYXBBcGkucHJvdG90eXBlLmNyZWF0ZSA9IGZ1bmN0aW9uKHNPYmplY3RzLCBjYWxsYmFjaykge1xuICB2YXIgc2NoZW1hID0gXy5pc0FycmF5KHNPYmplY3RzKSA/IFsgU2NoZW1hcy5TYXZlUmVzdWx0IF0gOiBTY2hlbWFzLlNhdmVSZXN1bHQ7XG4gIHZhciBhcmdzID0ge1xuICAgICdAeG1sbnMnIDogJ3VybjpwYXJ0bmVyLnNvYXAuc2ZvcmNlLmNvbScsXG4gICAgJ0B4bWxuczpuczEnIDogJ3NvYmplY3QucGFydG5lci5zb2FwLnNmb3JjZS5jb20nLFxuICAgICduczE6c09iamVjdHMnIDogc09iamVjdHNcbiAgfTtcbiAgcmV0dXJuIHRoaXMuX2ludm9rZShcImNyZWF0ZVwiLCBhcmdzLCBzY2hlbWEsIGNhbGxiYWNrKTtcbn07XG5cbi8qKlxuICogVXBkYXRlcyBvbmUgb3IgbW9yZSBleGlzdGluZyByZWNvcmRzIGluIHlvdXIgb3JnYW5pemF0aW9u4oCZcyBkYXRhLlxuICpcbiAqIEBwYXJhbSB7QXJyYXkuPE9iamVjdD59IHNPYmplY3RzIC0gUmVjb3JkcyB0byB1cGRhdGVcbiAqIEBwYXJhbSB7Q2FsbGJhY2suPFNvYXBBcGl+U2F2ZVJlc3VsdD59IFtjYWxsYmFja10gLSBDYWxsYmFjayBmdW5jdGlvblxuICogQHJldHVybnMge1Byb21pc2UuPFNvYXBBcGl+U2F2ZVJlc3VsdD59XG4gKi9cblNvYXBBcGkucHJvdG90eXBlLnVwZGF0ZSA9IGZ1bmN0aW9uKHNPYmplY3RzLCBjYWxsYmFjaykge1xuICB2YXIgc2NoZW1hID0gXy5pc0FycmF5KHNPYmplY3RzKSA/IFsgU2NoZW1hcy5TYXZlUmVzdWx0IF0gOiBTY2hlbWFzLlNhdmVSZXN1bHQ7XG4gIHZhciBhcmdzID0ge1xuICAgICdAeG1sbnMnIDogJ3VybjpwYXJ0bmVyLnNvYXAuc2ZvcmNlLmNvbScsXG4gICAgJ0B4bWxuczpuczEnIDogJ3NvYmplY3QucGFydG5lci5zb2FwLnNmb3JjZS5jb20nLFxuICAgICduczE6c09iamVjdHMnIDogc09iamVjdHNcbiAgfTtcbiAgcmV0dXJuIHRoaXMuX2ludm9rZShcInVwZGF0ZVwiLCBhcmdzLCBzY2hlbWEsIGNhbGxiYWNrKTtcbn07XG5cblNjaGVtYXMuU2F2ZVJlc3VsdCA9IHtcbiAgc3VjY2VzczogJ2Jvb2xlYW4nLFxuICBlcnJvcnM6IFtdLFxuICBpZDogJ3N0cmluZydcbn07XG5cbi8qKlxuICogQ3JlYXRlcyBuZXcgcmVjb3JkcyBhbmQgdXBkYXRlcyBleGlzdGluZyByZWNvcmRzIGluIHlvdXIgb3JnYW5pemF0aW9u4oCZcyBkYXRhLlxuICpcbiAqIEBwYXJhbSB7QXJyYXkuPE9iamVjdD59IHNPYmplY3RzIC0gUmVjb3JkcyB0byB1cHNlcnRcbiAqIEBwYXJhbSB7Q2FsbGJhY2suPFNvYXBBcGl+VXBzZXJ0UmVzdWx0Pn0gW2NhbGxiYWNrXSAtIENhbGxiYWNrIGZ1bmN0aW9uXG4gKiBAcmV0dXJucyB7UHJvbWlzZS48U29hcEFwaX5VcHNlcnRSZXN1bHQ+fVxuICovXG5Tb2FwQXBpLnByb3RvdHlwZS51cHNlcnQgPSBmdW5jdGlvbihleHRlcm5hbElkRmllbGROYW1lLCBzT2JqZWN0cywgY2FsbGJhY2spIHtcbiAgdmFyIHNjaGVtYSA9IF8uaXNBcnJheShzT2JqZWN0cykgPyBbIFNjaGVtYXMuVXBzZXJ0UmVzdWx0IF0gOiBTY2hlbWFzLlVwc2VydFJlc3VsdDtcbiAgdmFyIGFyZ3MgPSB7XG4gICAgJ0B4bWxucycgOiAndXJuOnBhcnRuZXIuc29hcC5zZm9yY2UuY29tJyxcbiAgICAnQHhtbG5zOm5zMScgOiAnc29iamVjdC5wYXJ0bmVyLnNvYXAuc2ZvcmNlLmNvbScsXG4gICAgJ25zMTpleHRlcm5hbElERmllbGROYW1lJyA6IGV4dGVybmFsSWRGaWVsZE5hbWUsXG4gICAgJ25zMTpzT2JqZWN0cycgOiBzT2JqZWN0c1xuICB9O1xuICByZXR1cm4gdGhpcy5faW52b2tlKFwidXBzZXJ0XCIsIGFyZ3MsIHNjaGVtYSwgY2FsbGJhY2spO1xufTtcblxuU2NoZW1hcy5VcHNlcnRSZXN1bHQgPSB7XG4gIGNyZWF0ZWQ6ICdib29sZWFuJyxcbiAgc3VjY2VzczogJ2Jvb2xlYW4nLFxuICBlcnJvcnM6IFtdLFxuICBpZDogJ3N0cmluZydcbn07XG5cbi8qKlxuICogRGVsZXRlcyBvbmUgb3IgbW9yZSByZWNvcmRzIGZyb20geW91ciBvcmdhbml6YXRpb27igJlzIGRhdGFcbiAqXG4gKiBAcGFyYW0ge0FycmF5LjxPYmplY3Q+fSBpZHMgLSBJZCBvZiByZWNvcmRzIHRvIGRlbGV0ZVxuICogQHBhcmFtIHtDYWxsYmFjay48U29hcEFwaX5EZWxldGVSZXN1bHQ+fSBbY2FsbGJhY2tdIC0gQ2FsbGJhY2sgZnVuY3Rpb25cbiAqIEByZXR1cm5zIHtQcm9taXNlLjxTb2FwQXBpfkRlbGV0ZVJlc3VsdD59XG4gKi9cblNvYXBBcGkucHJvdG90eXBlLmRlbGV0ZSA9IGZ1bmN0aW9uKGlkcywgY2FsbGJhY2spIHtcbiAgdmFyIHNjaGVtYSA9IF8uaXNBcnJheShpZHMpID8gWyBTY2hlbWFzLkRlbGV0ZVJlc3VsdCBdIDogU2NoZW1hcy5EZWxldGVSZXN1bHQ7XG4gIHZhciBhcmdzID0ge1xuICAgICdAeG1sbnMnIDogJ3VybjpwYXJ0bmVyLnNvYXAuc2ZvcmNlLmNvbScsXG4gICAgJ0B4bWxuczpuczEnIDogJ3NvYmplY3QucGFydG5lci5zb2FwLnNmb3JjZS5jb20nLFxuICAgICduczE6aWRzJyA6IGlkc1xuICB9O1xuICByZXR1cm4gdGhpcy5faW52b2tlKFwiZGVsZXRlXCIsIGFyZ3MsIHNjaGVtYSwgY2FsbGJhY2spO1xufTtcblxuU2NoZW1hcy5EZWxldGVSZXN1bHQgPSB7XG4gIHN1Y2Nlc3M6ICdib29sZWFuJyxcbiAgZXJyb3JzOiBbXSxcbiAgaWQ6ICdzdHJpbmcnXG59O1xuXG5cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuLypcbiAqIFJlZ2lzdGVyIGhvb2sgaW4gY29ubmVjdGlvbiBpbnN0YW50aWF0aW9uIGZvciBkeW5hbWljYWxseSBhZGRpbmcgdGhpcyBBUEkgbW9kdWxlIGZlYXR1cmVzXG4gKi9cbmpzZm9yY2Uub24oJ2Nvbm5lY3Rpb246bmV3JywgZnVuY3Rpb24oY29ubikge1xuICBjb25uLnNvYXAgPSBuZXcgU29hcEFwaShjb25uKTtcbn0pO1xuXG5cbm1vZHVsZS5leHBvcnRzID0gU29hcEFwaTtcbiJdfQ==
