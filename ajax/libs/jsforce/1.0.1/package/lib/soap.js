/**
 * @file Manages method call to SOAP endpoint
 * @author Shinichi Tomita <shinichi.tomita@gmail.com>
 */
var _ = require('underscore'),
    xml2js = require('xml2js'),
    Transport = require('./transport');

/**
 * Class for SOAP endpoint of Salesforce
 *
 * @protected
 * @class
 * @constructor
 * @param {Object} options - SOAP endpoint setting options
 * @param {String} options.serverUrl - SOAP endpoint URL
 * @param {String} options.sessionId - Salesforce session ID
 * @param {String} [options.xmlns] - XML namespace for method call (default is "urn:partner.soap.sforce.com")
 * @param {Transport} [transport] - HTTP request transport instance
 */
var SOAP = module.exports = function(options, transport) {
  this.serverUrl = options.serverUrl;
  this.sessionId = options.sessionId;
  this.xmlns = options.xmlns || 'urn:partner.soap.sforce.com';
  this._transport = transport;
  if (!this._transport) {
    this._transport = options.proxyUrl ? new Transport() : new Transport.ProxyTransport(options.proxyUrl);
  }
};

/**
 * Invoke SOAP call using method and arguments
 * 
 * @param {String} method - Method name
 * @param {Object} args - Arguments for the method call
 * @param {Callback.<Object>} [callback] - Callback function
 * @returns {Promise.<Object>}
 */
SOAP.prototype.invoke = function(method, args, callback) {
  var message = {};
  message[method] = args;
  var soapEnvelope = this._createEnvelope(message);
  return this._transport.httpRequest({
    method: 'POST',
    url: this.serverUrl,
    headers: {
      'Content-Type': 'text/xml',
      'SOAPAction': '""'
    },
    body: soapEnvelope
  }).then(function(res) {
    var ret = null;
    xml2js.parseString(res.body, { explicitArray: false }, function(err, value) { ret = value; });
    if (ret) {
      var error = lookupValue(ret, [ /:Envelope$/, /:Body$/, /:Fault$/, /faultstring$/ ]);
      if (error) {
        throw new Error(error);
      }
      return lookupValue(ret, [ /:Envelope$/, /:Body$/, /.+/ ]);
    }
    throw new Error("invalid response");
  }).thenCall(callback);
};

/**
 * @private
 */
function lookupValue(obj, propRegExps) {
  var regexp = propRegExps.shift();
  if (!regexp) {
    return obj; 
  }
  else {
    for (var prop in obj) {
      if (regexp.test(prop)) {
        return lookupValue(obj[prop], propRegExps);
      }
    }
    return null;
  }
}

/**
 * @private
 */
function toXML(name, value) {
  if (_.isObject(name)) {
    value = name;
    name = null;
  }
  if (_.isArray(value)) {
    return _.map(value, function(v) { return toXML(name, v); }).join('');
  } else {
    var attrs = [];
    var elems = [];
    if (_.isObject(value)) {
      for (var k in value) {
        var v = value[k];
        if (k[0] === '@') {
          k = k.substring(1);
          attrs.push(k + '="' + v + '"');
        } else {
          elems.push(toXML(k, v));
        }
      }
      value = elems.join('');
    } else {
      value = String(value);
    }
    var startTag = name ? '<' + name + (attrs.length > 0 ? ' ' + attrs.join(' ') : '') + '>' : '';
    var endTag = name ? '</' + name + '>' : '';
    return  startTag + value + endTag;
  }
}

/**
 * @private
 */
SOAP.prototype._createEnvelope = function(message) {
  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"',
    ' xmlns:xsd="http://www.w3.org/2001/XMLSchema"',
    ' xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">',
    '<soapenv:Header xmlns="' + this.xmlns + '">',
      '<SessionHeader>',
      '<sessionId>' + this.sessionId + '</sessionId>',
      '</SessionHeader>',
    '</soapenv:Header>',
    '<soapenv:Body xmlns="' + this.xmlns + '">',
    toXML(message),
    '</soapenv:Body>',
    '</soapenv:Envelope>'
  ].join('');
};
