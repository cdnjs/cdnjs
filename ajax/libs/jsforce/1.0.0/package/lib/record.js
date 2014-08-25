/**
 * @file Represents Salesforce record information
 * @author Shinichi Tomita <shinichi.tomita@gmail.com>
 */
var _ = require('underscore')._;

/**
 * A simple hash object including record field information
 *
 * @typedef {Object} Record
 */

/**
 * Remote reference to record information
 *
 * @protected
 * @class
 * @constructor
 * @param {Connection} conn - Connection object
 * @param {String} type - SObject type
 * @param {String} id - Record ID
 */
var RecordReference = module.exports = function(conn, type, id) {
  this._conn = conn;
  this.type = type;
  this.id = id;
};

/**
 * Retrieve record field information
 *
 * @param {Callback.<Record>} [callback] - Callback function
 * @returns {Promise.<Record>}
 */
RecordReference.prototype.retrieve = function(callback) {
  return this._conn.retrieve(this.type, this.id, callback);
};

/**
 * Update record field information
 *
 * @param {Record} record - A Record which includes fields to update
 * @param {Callback.<RecordResult>} [callback] - Callback function
 * @returns {Promise.<RecordResult>}
 */
RecordReference.prototype.update = function(record, callback) {
  record = _.clone(record);
  record.Id = this.id;
  return this._conn.update(this.type, record, callback);
};

/**
 * Synonym of Record#destroy()
 *
 * @method RecordReference#delete
 * @param {Callback.<RecordResult>} [callback] - Callback function
 * @returns {Promise.<RecordResult>}
 */
RecordReference.prototype["delete"] =
/**
 * Synonym of Record#destroy()
 *
 * @method RecordReference#del
 * @param {Callback.<RecordResult>} [callback] - Callback function
 * @returns {Promise.<RecordResult>}
 */
RecordReference.prototype.del =
/**
 * Delete record field
 *
 * @method RecordReference#destroy
 * @param {Callback.<RecordResult>} [callback] - Callback function
 * @returns {Promise.<RecordResult>}
 */
RecordReference.prototype.destroy = function(callback) {
  return this._conn.destroy(this.type, this.id, callback);
};

/**
 * Get blob field as stream
 *
 * @param {String} fieldName - Blob field name
 * @returns {stream.Stream}
 */
RecordReference.prototype.blob = function(fieldName) {
  var url = [ this._conn._baseUrl(), 'sobjects', this.type, this.id, fieldName ].join('/');
  return this._conn._request(url).stream();
};

