(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g=(g.jsforce||(g.jsforce = {}));g=(g.modules||(g.modules = {}));g=(g.api||(g.api = {}));g.Soap = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJsaWIvYXBpL3NvYXAuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIvKipcbiAqIEBmaWxlIFNhbGVzZm9yY2UgU09BUCBBUElcbiAqIEBhdXRob3IgU2hpbmljaGkgVG9taXRhIDxzaGluaWNoaS50b21pdGFAZ21haWwuY29tPlxuICovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIF8gPSB3aW5kb3cuanNmb3JjZS5yZXF1aXJlKCdsb2Rhc2gvY29yZScpO1xudmFyIGpzZm9yY2UgPSB3aW5kb3cuanNmb3JjZS5yZXF1aXJlKCcuL2NvcmUnKTtcbnZhciBTT0FQID0gd2luZG93LmpzZm9yY2UucmVxdWlyZSgnLi9zb2FwJyk7XG5cbi8qKlxuICogQVBJIGNsYXNzIGZvciBQYXJ0bmVyIFNPQVAgY2FsbFxuICpcbiAqIEBjbGFzc1xuICogQHBhcmFtIHtDb25uZWN0aW9ufSBjb25uIC0gQ29ubmVjdGlvblxuICovXG52YXIgU29hcEFwaSA9IG1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oY29ubikge1xuICB0aGlzLl9jb25uID0gY29ubjtcbn07XG5cbi8qKlxuICogQ2FsbCBTT0FQIEFwaSAoUGFydG5lcikgZW5kcG9pbnRcbiAqIEBwcml2YXRlXG4gKi9cblNvYXBBcGkucHJvdG90eXBlLl9pbnZva2UgPSBmdW5jdGlvbihtZXRob2QsIG1lc3NhZ2UsIHNjaGVtYSwgY2FsbGJhY2spIHtcbiAgdmFyIHNvYXBFbmRwb2ludCA9IG5ldyBTT0FQKHRoaXMuX2Nvbm4sIHtcbiAgICB4bWxuczogXCJ1cm46cGFydG5lci5zb2FwLnNmb3JjZS5jb21cIixcbiAgICBlbmRwb2ludFVybDogdGhpcy5fY29ubi5pbnN0YW5jZVVybCArIFwiL3NlcnZpY2VzL1NvYXAvdS9cIiArIHRoaXMuX2Nvbm4udmVyc2lvblxuICB9KTtcbiAgcmV0dXJuIHNvYXBFbmRwb2ludC5pbnZva2UobWV0aG9kLCBtZXNzYWdlLCB7IHJlc3VsdDogc2NoZW1hIH0pLnRoZW4oZnVuY3Rpb24ocmVzKSB7XG4gICAgcmV0dXJuIHJlcy5yZXN1bHQ7XG4gIH0pLnRoZW5DYWxsKGNhbGxiYWNrKTtcbn07XG5cblxuLyogKi9cbnZhciBTY2hlbWFzID0ge307XG5cbi8qKlxuICogQHR5cGVkZWYgU29hcEFwaX5MZWFkQ29udmVydFxuICogQHByb3Age1N0cmluZ30gY29udmVydGVkU3RhdHVzIC0gU3RhdHVzIG9mIGNvbnZlcnRlZCBsZWFkXG4gKiBAcHJvcCB7U3RyaW5nfSBsZWFkSWQgLSBMZWFkIHJlY29yZCBJZCB0byBjb252ZXJ0XG4gKiBAcHJvcCB7U3RyaW5nfSBbYWNjb3VudElkXSAtIEFjY291bnQgcmVjb3JkIElkIHRvIGFzc2lnbiB0aGUgY29udmVydGVkIHJlY29yZFxuICogQHByb3Age1N0cmluZ30gW2NvbnRhY3RJZF0gLSBDb250YWN0IHJlY29yZCBJZCB0byBhc3NpZ24gdGhlIGNvbnZlcnRlZCByZWNvcmRcbiAqIEBwcm9wIHtCb29sZWFufSBbZG9Ob3RDcmVhdGVPcHBvcnR1bml0eV0gLSBUcnVlIGlmIHlvdSBkb24ndCB3YW50IHRvIGNyZWF0ZSBhIG5ldyBvcHBvcnR1bml0eVxuICogQHByb3Age1N0cmluZ30gW29wcG9ydHVuaXR5TmFtZV0gLSBOYW1lIG9mIG9wcG9ydHVuaXR5IHRvIGNyZWF0ZVxuICogQHByb3Age0Jvb2xlYW59IFtvdmVyd3JpdGVMZWFkU291cmNlXSAtIFRydWUgaWYgb3ZlcndyaXRpbmcgbGVhZCBzb3VyY2VcbiAqIEBwcm9wIHtTdHJpbmd9IFtvd25lcklkXSAtIE93bmVyIElkXG4gKiBAcHJvcCB7Qm9vbGVhbn0gW3NlbmROb3RpZmljYXRpb25FbWFpbF0gLSBUcnVlIGlmIHNlbmQgbm90aWZpY2F0aW9uIGVtYWlsXG4gKi9cbi8qKlxuICogQHR5cGVkZWYgU29hcEFwaX5MZWFkQ29udmVydFJlc3VsdFxuICogQHByb3Age1N0cmluZ30gbGVhZElkIC0gTGVhZCByZWNvcmQgSWQgdG8gY29udmVydFxuICogQHByb3Age1N0cmluZ30gW2FjY291bnRJZF0gLSBBY2NvdW50IHJlY29yZCBJZCBvZiBjb252ZXJ0ZWQgbGVhZFxuICogQHByb3Age1N0cmluZ30gW2NvbnRhY3RJZF0gLSBDb250YWN0IHJlY29yZCBJZCBvZiBjb252ZXJ0ZWQgbGVhZFxuICogQHByb3Age1N0cmluZ30gW29wcG9ydHVuaXR5SWRdIC0gT3Bwb3J0dW5pdHkgcmVjb3JkIElkIGNyZWF0ZWQgaW4gY29udmVyc2lvblxuICogQHByb3Age0Jvb2xlYW59IHN1Y2Nlc3MgLSBUcnVlIGlmIHN1Y2Nlc3NmdWxseSBjb252ZXJ0ZWRcbiAqIEBwcm9wIHtBcnJheS48T2JqZWN0Pn0gZXJyb3JzIC0gRXJyb3JcbiAqL1xuLyoqXG4gKiBDb252ZXJ0cyBhIExlYWQgaW50byBhbiBBY2NvdW50LCBDb250YWN0LCBvciAob3B0aW9uYWxseSkgYW4gT3Bwb3J0dW5pdHkuXG4gKlxuICogQHBhcmFtIHtTb2FwQXBpfkxlYWRDb252ZXJ0fEFycmF5LjxTb2FwQXBpfkxlYWRDb252ZXJ0Pn0gbGVhZENvbnZlcnRzXG4gKiBAcGFyYW0ge0NhbGxiYWNrLjxTb2FwQXBpfkxlYWRDb252ZXJ0UmVzdWx0fEFycmF5LjxTb2FwQXBpfkxlYWRDb252ZXJ0UmVzdWx0Pj59IFtjYWxsYmFja10gLSBDYWxsYmFjayBmdW5jdGlvblxuICogQHJldHVybnMge1Byb21pc2UuPFNvYXBBcGl+TGVhZENvbnZlcnRSZXN1bHR8QXJyYXkuPFNvYXBBcGl+TGVhZENvbnZlcnRSZXN1bHQ+Pn1cbiAqL1xuU29hcEFwaS5wcm90b3R5cGUuY29udmVydExlYWQgPSBmdW5jdGlvbihsZWFkQ29udmVydHMsIGNhbGxiYWNrKSB7XG4gIHZhciBzY2hlbWEgPSBfLmlzQXJyYXkobGVhZENvbnZlcnRzKSA/IFsgU2NoZW1hcy5MZWFkQ29udmVydFJlc3VsdCBdIDogU2NoZW1hcy5MZWFkQ29udmVydFJlc3VsdDtcbiAgcmV0dXJuIHRoaXMuX2ludm9rZShcImNvbnZlcnRMZWFkXCIsIHsgbGVhZENvbnZlcnRzOiBsZWFkQ29udmVydHMgfSwgc2NoZW1hLCBjYWxsYmFjayk7XG59O1xuU2NoZW1hcy5MZWFkQ29udmVydFJlc3VsdCA9IHtcbiAgc3VjY2VzczogJ2Jvb2xlYW4nLFxuICBlcnJvcnM6IFtdLFxuICBsZWFkSWQ6ICdzdHJpbmcnLFxuICBhY2NvdW50SWQ6ICdzdHJpbmcnLFxuICBjb250YWN0SWQ6ICdzdHJpbmcnLFxuICBvcHBvcnR1bml0eUlkOiAnc3RyaW5nJ1xufTtcblxuLyoqXG4gKiBAdHlwZWRlZiBTb2FwQXBpfk1lcmdlUmVxdWVzdFxuICogQHByb3Age09iamVjdH0gbWFzdGVyUmVjb3JkIC0gVGhlIG1lcmdlIGRlc3RpbmF0aW9uIHJlY29yZFxuICogQHByb3Age0FycmF5LjxTdHJpbmc+fSByZWNvcmRUb01lcmdlSWRzIC0gSWRzIG9mIHJlY29yZHMgdG8gbWVyZ2VcbiAqL1xuLyoqXG4gKiBAdHlwZWRlZiBTb2FwQXBpfk1lcmdlUmVzdWx0XG4gKiBAcHJvcCB7Qm9vbGVhbn0gc3VjY2VzcyAtIFRydWUgaWYgc3VjY2Vzc2Z1bGx5IG1lcmdlZFxuICogQHByb3Age0FycmF5LjxPYmplY3Q+fSBlcnJvcnMgLSBFcnJvclxuICogQHByb3Age1N0cmluZ30gaWQgLSBJRCBvZiB0aGUgbWFzdGVyIHJlY29yZFxuICogQHByb3Age0FycmF5LjxTdHJpbmc+fSBtZXJnZWRSZWNvcmRJZHMgLSBJRCBvZiB0aGUgcmVjb3JkcyB0aGF0IHdlcmUgbWVyZ2VkIGludG8gdGhlIG1hc3RlciByZWNvcmRcbiAqIEBwcm9wIHtBcnJheS48U3RyaW5nPn0gdXBkYXRlZFJlbGF0ZWRJZHMgLSBJRCBvZiBhbGwgcmVsYXRlZCByZWNvcmRzIHRoYXQgd2VyZSBtb3ZlZCAocmUtcGFyZW50ZWQpIGFzIGEgcmVzdWx0IG9mIHRoZSBtZXJnZVxuICovXG5cbi8qKlxuICogTWVyZ2UgdXAgdG8gdGhyZWUgcmVjb3JkcyBpbnRvIG9uZVxuICpcbiAqIEBwYXJhbSB7U29hcEFwaX5NZXJnZVJlcXVlc3R8QXJyYXkuPFNvYXBBcGl+TWVyZ2VSZXF1ZXN0Pn0gbWVyZ2VSZXF1ZXN0c1xuICogQHBhcmFtIHtDYWxsYmFjay48U29hcEFwaX5NZXJnZVJlc3VsdHxBcnJheS48U29hcEFwaX5NZXJnZVJlc3VsdD4+fSBbY2FsbGJhY2tdIC0gQ2FsbGJhY2sgZnVuY3Rpb25cbiAqIEByZXR1cm5zIHtQcm9taXNlLjxTb2FwQXBpfk1lcmdlUmVzdWx0fEFycmF5LjxTb2FwQXBpfk1lcmdlUmVzdWx0Pj59XG4gKi9cblNvYXBBcGkucHJvdG90eXBlLm1lcmdlID0gZnVuY3Rpb24obWVyZ2VSZXF1ZXN0cywgY2FsbGJhY2spIHtcbiAgdmFyIHNjaGVtYSA9IF8uaXNBcnJheShtZXJnZVJlcXVlc3RzKSA/IFsgU2NoZW1hcy5NZXJnZVJlc3VsdCBdIDogU2NoZW1hcy5NZXJnZVJlc3VsdDtcbiAgcmV0dXJuIHRoaXMuX2ludm9rZShcIm1lcmdlXCIsIHsgbWVyZ2VSZXF1ZXN0czogbWVyZ2VSZXF1ZXN0cyB9LCBzY2hlbWEsIGNhbGxiYWNrKTtcbn07XG5TY2hlbWFzLk1lcmdlUmVzdWx0ID0ge1xuICBzdWNjZXNzOiAnYm9vbGVhbicsXG4gIGVycm9yczogW10sXG4gIGlkOiAnc3RyaW5nJyxcbiAgbWVyZ2VkUmVjb3JkSWRzOiBbJ3N0cmluZyddLFxuICB1cGRhdGVkUmVsYXRlZElkczogWydzdHJpbmcnXVxufTtcblxuXG4vKipcbiAqIEB0eXBlZGVmIFNvYXBBcGl+RW1wdHlSZWN5Y2xlQmluUmVzdWx0XG4gKiBAcHJvcCB7U3RyaW5nfSBpZCAtIElEIG9mIGFuIHNPYmplY3QgdGhhdCB5b3UgYXR0ZW1wdGVkIHRvIGRlbGV0ZSBmcm9tIHRoZSBSZWN5Y2xlIEJpblxuICogQHByb3Age0Jvb2xlYW59IHN1Y2Nlc3MgLSBXaGV0aGVyIHRoZSBjYWxsIHN1Y2NlZWRlZCAodHJ1ZSkgb3Igbm90IChmYWxzZSkgZm9yIHRoaXMgcmVjb3JkXG4gKiBAcHJvcCB7QXJyYXkuPE9iamVjdD59IGVycm9ycyAtIEVycm9yc1xuICovXG4vKipcbiAqIERlbGV0ZSByZWNvcmRzIGZyb20gdGhlIHJlY3ljbGUgYmluIGltbWVkaWF0ZWx5XG4gKlxuICogQHBhcmFtIHtBcnJheS48U3RyaW5nPn0gaWRzIC0gUmVjb3JkIGlkcyB0byBlbXB0eSBmcm9tIHJlY3ljbGUgYmluXG4gKiBAcGFyYW0ge0NhbGxiYWNrLjxBcnJheS48U29hcEFwaX5FbXB0eVJlY3ljbGVCaW5SZXN1bHQ+Pn0gW2NhbGxiYWNrXSAtIENhbGxiYWNrIGZ1bmN0aW9uXG4gKiBAcmV0dXJucyB7UHJvbWlzZS48QXJyYXkuPFNvYXBBcGl+RW1wdHlSZWN5Y2xlQmluUmVzdWx0Pj59XG4gKi9cblNvYXBBcGkucHJvdG90eXBlLmVtcHR5UmVjeWNsZUJpbiA9IGZ1bmN0aW9uKGlkcywgY2FsbGJhY2spIHtcbiAgcmV0dXJuIHRoaXMuX2ludm9rZShcImVtcHR5UmVjeWNsZUJpblwiLCB7IGlkczogaWRzIH0sIFsgU2NoZW1hcy5FbXB0eVJlY3ljbGVCaW5SZXN1bHQgXSwgY2FsbGJhY2spO1xufTtcblNjaGVtYXMuRW1wdHlSZWN5Y2xlQmluUmVzdWx0ID0ge1xuICBpZDogJ3N0cmluZycsXG4gIHN1Y2Nlc3M6ICdib29sZWFuJyxcbiAgZXJyb3JzOiBbXVxufTtcblxuXG4vKipcbiAqIEB0eXBlZGVmIFNvYXBBcGl+RGVzY3JpYmVUYWJTZXRSZXN1bHRcbiAqIEBwcm9wIHtTdHJpbmd9IGxhYmVsIC0gVGhlIGRpc3BsYXkgbGFiZWwgZm9yIHRoaXMgc3RhbmRhcmQgb3IgY3VzdG9tIGFwcFxuICogQHByb3Age1N0cmluZ30gbG9nb1VybCAtIEEgZnVsbHkgcXVhbGlmaWVkIFVSTCB0byB0aGUgbG9nbyBpbWFnZSBhc3NvY2lhdGVkIHdpdGggdGhlIHN0YW5kYXJkIG9yIGN1c3RvbSBhcHBcbiAqIEBwcm9wIHtTdHJpbmd9IG5hbWVzcGFjZSAtIE5hbWVzcGFjZSBvZiBhcHBsaWNhdGlvbiBwYWNrYWdlXG4gKiBAcHJvcCB7Qm9vbGVhbn0gc2VsZWN0ZWQgLSBJZiB0cnVlLCB0aGVuIHRoaXMgc3RhbmRhcmQgb3IgY3VzdG9tIGFwcCBpcyB0aGUgdXNlcuKAmXMgY3VycmVudGx5IHNlbGVjdGVkIGFwcFxuICogQHByb3Age0FycmF5LjxTb2FwQXBpfkRlc2NyaWJlVGFiPn0gdGFicyAtIEFuIGFycmF5IG9mIHRhYnMgdGhhdCBhcmUgZGlzcGxheWVkIGZvciB0aGUgc3BlY2lmaWVkIHN0YW5kYXJkIGFwcCBvciBjdXN0b20gYXBwXG4gKi9cbi8qKlxuICogQHR5cGVkZWYgU29hcEFwaX5EZXNjcmliZVRhYlxuICogQHByb3Age0FycmF5LjxPYmplY3Q+fSBjb2xvcnMgLSBBcnJheSBvZiBjb2xvciBpbmZvcm1hdGlvbiB1c2VkIGZvciBhIHRhYlxuICogQHByb3Age0Jvb2xlYW59IGN1c3RvbSAtIHRydWUgaWYgdGhpcyBpcyBhIGN1c3RvbSB0YWJcbiAqIEBwcm9wIHtTdHJpbmd9IGljb25VcmwgLSBUaGUgVVJMIGZvciB0aGUgbWFpbiAzMiB4IDMyIHBpeGVsIGljb24gZm9yIGEgdGFiXG4gKiBAcHJvcCB7QXJyYXkuPE9iamVjdD59IGljb25zIC0gQXJyYXkgb2YgaWNvbiBpbmZvcm1hdGlvbiB1c2VkIGZvciBhIHRhYlxuICogQHByb3Age1N0cmluZ30gbGFiZWwgLSBUaGUgZGlzcGxheSBsYWJlbCBmb3IgdGhpcyB0YWJcbiAqIEBwcm9wIHtTdHJpbmd9IG1pbmlJY29uVXJsIC0gVGhlIFVSTCBmb3IgdGhlIDE2IHggMTYgcGl4ZWwgaWNvbiB0aGF0IHJlcHJlc2VudHMgYSB0YWJcbiAqIEBwcm9wIHtTdHJpbmd9IG5hbWUgLSBUaGUgQVBJIG5hbWUgb2YgdGhlIHRhYlxuICogQHByb3Age1N0cmluZ30gc29iamVjdE5hbWUgLSBUaGUgbmFtZSBvZiB0aGUgc09iamVjdCB0aGF0IGlzIHByaW1hcmlseSBkaXNwbGF5ZWQgb24gdGhpcyB0YWJcbiAqIEBwcm9wIHtTdHJpbmd9IHVybCAtIEEgZnVsbHkgcXVhbGlmaWVkIFVSTCBmb3Igdmlld2luZyB0aGlzIHRhYlxuICovXG4vKipcbiAqIFJldHVybnMgaW5mb3JtYXRpb24gYWJvdXQgdGhlIHN0YW5kYXJkIGFuZCBjdXN0b20gYXBwcyBhdmFpbGFibGUgdG8gdGhlIGxvZ2dlZC1pbiB1c2VyXG4gKlxuICogQHBhcmFtIHtDYWxsYmFjay48QXJyYXkuPFNvYXBBcGl+RGVzY3JpYmVUYWJTZXRSZXN1bHQ+Pn0gW2NhbGxiYWNrXSAtIENhbGxiYWNrIGZ1bmN0aW9uXG4gKiBAcmV0dXJucyB7UHJvbWlzZS48QXJyYXkuPFNvYXBBcGl+RGVzY3JpYmVUYWJTZXRSZXN1bHQ+Pn1cbiAqL1xuU29hcEFwaS5wcm90b3R5cGUuZGVzY3JpYmVUYWJzID0gZnVuY3Rpb24oY2FsbGJhY2spIHtcbiAgcmV0dXJuIHRoaXMuX2ludm9rZShcImRlc2NyaWJlVGFic1wiLCB7fSwgWyBTY2hlbWFzLkRlc2NyaWJlVGFiU2V0UmVzdWx0IF0sIGNhbGxiYWNrKTtcbn07XG5TY2hlbWFzLkRlc2NyaWJlVGFiU2V0UmVzdWx0ID0ge1xuICBsYWJlbDogJ3N0cmluZycsXG4gIGxvZ29Vcmw6ICdzdHJpbmcnLFxuICBuYW1lc3BhY2U6ICdzdHJpbmcnLFxuICBzZWxlY3RlZDogJ2Jvb2xlYW4nLFxuICB0YWJzOiBbe1xuICAgIGNvbG9yczogW3tcbiAgICAgIHRoZW1lOiAnc3RyaW5nJyxcbiAgICAgIGNvbG9yOiAnc3RyaW5nJyxcbiAgICAgIGNvbnRleHQ6ICdzdHJpbmcnXG4gICAgfV0sXG4gICAgaWNvblVybDogJ3N0cmluZycsXG4gICAgaWNvbnM6IFt7XG4gICAgICB0aGVtZTogJ3N0cmluZycsXG4gICAgICBoZWlnaHQ6ICdudW1iZXInLFxuICAgICAgd2lkdGg6ICdudW1iZXInLFxuICAgICAgdXJsOiAnc3RyaW5nJyxcbiAgICAgIGNvbnRlbnRUeXBlOiAnc3RyaW5nJ1xuICAgIH1dLFxuICAgIGxhYmVsOiAnc3RyaW5nJyxcbiAgICBjdXN0b206ICdib29sZWFuJyxcbiAgICBtaW5pSWNvblVybDogJ3N0cmluZycsXG4gICAgbmFtZTogJ3N0cmluZycsXG4gICAgc29iamVjdE5hbWU6ICdzdHJpbmcnLFxuICAgIHVybDogJ3N0cmluZydcbiAgfV1cbn07XG5cbi8qKlxuICogUmV0cmlldmVzIHRoZSBjdXJyZW50IHN5c3RlbSB0aW1lc3RhbXAgKENvb3JkaW5hdGVkIFVuaXZlcnNhbCBUaW1lIChVVEMpIHRpbWUgem9uZSkgZnJvbSB0aGUgQVBJXG4gKlxuICogQHR5cGVkZWYgU29hcEFwaX5TZXJ2ZXJUaW1lc3RhbXBSZXN1bHRcbiAqIEBwcm9wIHtTdHJpbmd9IHRpbWVzdGFtcCAtIFRpbWVzdGFtcFxuICovXG4vKipcbiAqIEBwYXJhbSB7Q2FsbGJhY2suPFNvYXBBcGl+U2VydmVyVGltZXN0YW1wUmVzdWx0Pn0gW2NhbGxiYWNrXSAtIENhbGxiYWNrIGZ1bmN0aW9uXG4gKiBAcmV0dXJucyB7UHJvbWlzZS48U29hcEFwaX5TZXJ2ZXJUaW1lc3RhbXBSZXN1bHQ+fVxuICovXG5Tb2FwQXBpLnByb3RvdHlwZS5nZXRTZXJ2ZXJUaW1lc3RhbXAgPSBmdW5jdGlvbihjYWxsYmFjaykge1xuICByZXR1cm4gdGhpcy5faW52b2tlKFwiZ2V0U2VydmVyVGltZXN0YW1wXCIsIHt9LCBTY2hlbWFzLkdldFNlcnZlclRpbWVzdGFtcFJlc3VsdCwgY2FsbGJhY2spO1xufTtcblNjaGVtYXMuR2V0U2VydmVyVGltZXN0YW1wUmVzdWx0ID0ge1xuICB0aW1lc3RhbXA6ICdzdHJpbmcnXG59O1xuXG4vKipcbiAqIEB0eXBlZGVmIFNvYXBBcGl+VXNlckluZm9SZXN1bHRcbiAqIEBwcm9wIHtCb29sZWFufSBhY2Nlc3NpYmlsaXR5TW9kZVxuICogQHByb3Age1N0cmluZ30gY3VycmVuY3lTeW1ib2xcbiAqIEBwcm9wIHtOdW1iZXJ9IG9yZ0F0dGFjaG1lbnRGaWxlU2l6ZUxpbWl0XG4gKiBAcHJvcCB7U3RyaW5nfSBvcmdEZWZhdWx0Q3VycmVuY3lJc29Db2RlXG4gKiBAcHJvcCB7U3RyaW5nfSBvcmdEaXNhbGxvd0h0bWxBdHRhY2htZW50c1xuICogQHByb3Age0Jvb2xlYW59IG9yZ0hhc1BlcnNvbkFjY291bnRzXG4gKiBAcHJvcCB7U3RyaW5nfSBvcmdhbml6YXRpb25JZFxuICogQHByb3Age0Jvb2xlYW59IG9yZ2FuaXphdGlvbk11bHRpQ3VycmVuY3lcbiAqIEBwcm9wIHtTdHJpbmd9IG9yZ2FuaXphdGlvbk5hbWVcbiAqIEBwcm9wIHtTdHJpbmd9IHByb2ZpbGVJZFxuICogQHByb3Age1N0cmluZ30gcm9sZUlkXG4gKiBAcHJvcCB7TnVtYmVyfSBzZXNzaW9uU2Vjb25kc1ZhbGlkXG4gKiBAcHJvcCB7U3RyaW5nfSB1c2VyRGVmYXVsdEN1cnJlbmN5SXNvQ29kZVxuICogQHByb3Age1N0cmluZ30gdXNlckVtYWlsXG4gKiBAcHJvcCB7U3RyaW5nfSB1c2VyRnVsbE5hbWVcbiAqIEBwcm9wIHtTdHJpbmd9IHVzZXJJZFxuICogQHByb3Age1N0cmluZ30gdXNlckxhbmd1YWdlXG4gKiBAcHJvcCB7U3RyaW5nfSB1c2VyTG9jYWxlXG4gKiBAcHJvcCB7U3RyaW5nfSB1c2VyTmFtZVxuICogQHByb3Age1N0cmluZ30gdXNlclRpbWVab25lXG4gKiBAcHJvcCB7U3RyaW5nfSB1c2VyVHlwZVxuICogQHByb3Age1N0cmluZ30gdXNlclVpU2tpblxuICovXG4vKipcbiAqIFJldHJpZXZlcyBwZXJzb25hbCBpbmZvcm1hdGlvbiBmb3IgdGhlIHVzZXIgYXNzb2NpYXRlZCB3aXRoIHRoZSBjdXJyZW50IHNlc3Npb25cbiAqXG4gKiBAcGFyYW0ge0NhbGxiYWNrLjxTb2FwQXBpflVzZXJJbmZvUmVzdWx0Pn0gW2NhbGxiYWNrXSAtIENhbGxiYWNrIGZ1bmN0aW9uXG4gKiBAcmV0dXJucyB7UHJvbWlzZS48U29hcEFwaX5Vc2VySW5mb1Jlc3VsdD59XG4gKi9cblNvYXBBcGkucHJvdG90eXBlLmdldFVzZXJJbmZvID0gZnVuY3Rpb24oY2FsbGJhY2spIHtcbiAgcmV0dXJuIHRoaXMuX2ludm9rZShcImdldFVzZXJJbmZvXCIsIHt9LCBTY2hlbWFzLkdldFVzZXJJbmZvUmVzdWx0LCBjYWxsYmFjayk7XG59O1xuU2NoZW1hcy5HZXRVc2VySW5mb1Jlc3VsdCA9IHtcbiAgYWNjZXNzaWJpbGl0eU1vZGU6ICdib29sZWFuJyxcbiAgY3VycmVuY3lTeW1ib2w6ICdzdHJpbmcnLFxuICBvcmdBdHRhY2htZW50RmlsZVNpemVMaW1pdDogJ251bWJlcicsXG4gIG9yZ0RlZmF1bHRDdXJyZW5jeUlzb0NvZGU6ICdzdHJpbmcnLFxuICBvcmdEaXNhbGxvd0h0bWxBdHRhY2htZW50czogJ2Jvb2xlYW4nLFxuICBvcmdIYXNQZXJzb25BY2NvdW50czogJ2Jvb2xlYW4nLFxuICBvcmdhbml6YXRpb25JZDogJ3N0cmluZycsXG4gIG9yZ2FuaXphdGlvbk11bHRpQ3VycmVuY3k6ICdib29sZWFuJyxcbiAgb3JnYW5pemF0aW9uTmFtZTogJ3N0cmluZycsXG4gIHByb2ZpbGVJZDogJ3N0cmluZycsXG4gIHJvbGVJZDogJ3N0cmluZycsXG4gIHNlc3Npb25TZWNvbmRzVmFsaWQ6ICdudW1iZXInLFxuICB1c2VyRGVmYXVsdEN1cnJlbmN5SXNvQ29kZTogJ3N0cmluZycsXG4gIHVzZXJFbWFpbDogJ3N0cmluZycsXG4gIHVzZXJGdWxsTmFtZTogJ3N0cmluZycsXG4gIHVzZXJJZDogJ3N0cmluZycsXG4gIHVzZXJMYW5ndWFnZTogJ3N0cmluZycsXG4gIHVzZXJMb2NhbGU6ICdzdHJpbmcnLFxuICB1c2VyTmFtZTogJ3N0cmluZycsXG4gIHVzZXJUaW1lWm9uZTogJ3N0cmluZycsXG4gIHVzZXJUeXBlOiAnc3RyaW5nJyxcbiAgdXNlclVpU2tpbjogJ3N0cmluZydcbn07XG5cbi8qKlxuICogU2V0cyB0aGUgc3BlY2lmaWVkIHVzZXLigJlzIHBhc3N3b3JkIHRvIHRoZSBzcGVjaWZpZWQgdmFsdWVcbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gdXNlcklkIC0gVXNlciBJZCB0byBzZXQgcGFzc3dvcmRcbiAqIEBwYXJhbSB7U3RyaW5nfSBwYXNzd29yZCAtIE5ldyBwYXNzd29yZFxuICogQHBhcmFtIHtDYWxsYmFjay48U3RyaW5nPn0gW2NhbGxiYWNrXSAtIENhbGxiYWNrIGZ1bmN0aW9uXG4gKiBAcmV0dXJucyB7UHJvbWlzZS48U3RyaW5nPn1cbiAqL1xuU29hcEFwaS5wcm90b3R5cGUuc2V0UGFzc3dvcmQgPSBmdW5jdGlvbih1c2VySWQsIHBhc3N3b3JkLCBjYWxsYmFjaykge1xuICByZXR1cm4gdGhpcy5faW52b2tlKFwic2V0UGFzc3dvcmRcIiwgeyB1c2VySWQ6IHVzZXJJZCwgcGFzc3dvcmQ6IHBhc3N3b3JkIH0sIGNhbGxiYWNrKTtcbn07XG5cbi8qKlxuICogQHR5cGVkZWYgU29hcEFwaX5SZXNldFBhc3N3b3JkUmVzdWx0XG4gKiBAcHJvcCB7U3RyaW5nfSBwYXNzd29yZFxuICovXG4vKipcbiAqIFJlc2V0cyB0aGUgc3BlY2lmaWVkIHVzZXLigJlzIHBhc3N3b3JkXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHVzZXJJZCAtIFVzZXIgSWQgdG8gc2V0IHBhc3N3b3JkXG4gKiBAcGFyYW0ge1N0cmluZ30gcGFzc3dvcmQgLSBOZXcgcGFzc3dvcmRcbiAqIEBwYXJhbSB7Q2FsbGJhY2suPFNvYXBBcGl+UmVzZXRQYXNzd29yZFJlc3VsdD59IFtjYWxsYmFja10gLSBDYWxsYmFjayBmdW5jdGlvblxuICogQHJldHVybnMge1Byb21pc2UuPFNvYXBBcGl+UmVzZXRQYXNzd29yZFJlc3VsdD59XG4gKi9cblNvYXBBcGkucHJvdG90eXBlLnJlc2V0UGFzc3dvcmQgPSBmdW5jdGlvbih1c2VySWQsIGNhbGxiYWNrKSB7XG4gIHJldHVybiB0aGlzLl9pbnZva2UoXCJyZXNldFBhc3N3b3JkXCIsIHsgdXNlcklkOiB1c2VySWQgfSwgY2FsbGJhY2spO1xufTtcblxuXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbi8qXG4gKiBSZWdpc3RlciBob29rIGluIGNvbm5lY3Rpb24gaW5zdGFudGlhdGlvbiBmb3IgZHluYW1pY2FsbHkgYWRkaW5nIHRoaXMgQVBJIG1vZHVsZSBmZWF0dXJlc1xuICovXG5qc2ZvcmNlLm9uKCdjb25uZWN0aW9uOm5ldycsIGZ1bmN0aW9uKGNvbm4pIHtcbiAgY29ubi5zb2FwID0gbmV3IFNvYXBBcGkoY29ubik7XG59KTtcblxuXG5tb2R1bGUuZXhwb3J0cyA9IFNvYXBBcGk7XG4iXX0=
