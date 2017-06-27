/**
 * @file Node-salesforce API root object
 * @author Shinichi Tomita <shinichi.tomita@gmail.com>
 */
exports.Connection = require('./connection');
exports.OAuth2 = require('./oauth2');
exports.Date = exports.SfDate = require("./date");
exports.RecordStream = require('./record-stream');
