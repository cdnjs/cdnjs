(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.angularHal = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/*!
 * content-type
 * Copyright(c) 2015 Douglas Christopher Wilson
 * MIT Licensed
 */

/**
 * RegExp to match *( ";" parameter ) in RFC 7231 sec 3.1.1.1
 *
 * parameter     = token "=" ( token / quoted-string )
 * token         = 1*tchar
 * tchar         = "!" / "#" / "$" / "%" / "&" / "'" / "*"
 *               / "+" / "-" / "." / "^" / "_" / "`" / "|" / "~"
 *               / DIGIT / ALPHA
 *               ; any VCHAR, except delimiters
 * quoted-string = DQUOTE *( qdtext / quoted-pair ) DQUOTE
 * qdtext        = HTAB / SP / %x21 / %x23-5B / %x5D-7E / obs-text
 * obs-text      = %x80-FF
 * quoted-pair   = "\" ( HTAB / SP / VCHAR / obs-text )
 */
var paramRegExp = /; *([!#$%&'\*\+\-\.\^_`\|~0-9A-Za-z]+) *= *("(?:[\u000b\u0020\u0021\u0023-\u005b\u005d-\u007e\u0080-\u00ff]|\\[\u000b\u0020-\u00ff])*"|[!#$%&'\*\+\-\.\^_`\|~0-9A-Za-z]+) */g
var textRegExp = /^[\u000b\u0020-\u007e\u0080-\u00ff]+$/
var tokenRegExp = /^[!#$%&'\*\+\-\.\^_`\|~0-9A-Za-z]+$/

/**
 * RegExp to match quoted-pair in RFC 7230 sec 3.2.6
 *
 * quoted-pair = "\" ( HTAB / SP / VCHAR / obs-text )
 * obs-text    = %x80-FF
 */
var qescRegExp = /\\([\u000b\u0020-\u00ff])/g

/**
 * RegExp to match chars that must be quoted-pair in RFC 7230 sec 3.2.6
 */
var quoteRegExp = /([\\"])/g

/**
 * RegExp to match type in RFC 6838
 *
 * media-type = type "/" subtype
 * type       = token
 * subtype    = token
 */
var typeRegExp = /^[!#$%&'\*\+\-\.\^_`\|~0-9A-Za-z]+\/[!#$%&'\*\+\-\.\^_`\|~0-9A-Za-z]+$/

/**
 * Module exports.
 * @public
 */

exports.format = format
exports.parse = parse

/**
 * Format object to media type.
 *
 * @param {object} obj
 * @return {string}
 * @public
 */

function format(obj) {
  if (!obj || typeof obj !== 'object') {
    throw new TypeError('argument obj is required')
  }

  var parameters = obj.parameters
  var type = obj.type

  if (!type || !typeRegExp.test(type)) {
    throw new TypeError('invalid type')
  }

  var string = type

  // append parameters
  if (parameters && typeof parameters === 'object') {
    var param
    var params = Object.keys(parameters).sort()

    for (var i = 0; i < params.length; i++) {
      param = params[i]

      if (!tokenRegExp.test(param)) {
        throw new TypeError('invalid parameter name')
      }

      string += '; ' + param + '=' + qstring(parameters[param])
    }
  }

  return string
}

/**
 * Parse media type to object.
 *
 * @param {string|object} string
 * @return {Object}
 * @public
 */

function parse(string) {
  if (!string) {
    throw new TypeError('argument string is required')
  }

  if (typeof string === 'object') {
    // support req/res-like objects as argument
    string = getcontenttype(string)

    if (typeof string !== 'string') {
      throw new TypeError('content-type header is missing from object');
    }
  }

  if (typeof string !== 'string') {
    throw new TypeError('argument string is required to be a string')
  }

  var index = string.indexOf(';')
  var type = index !== -1
    ? string.substr(0, index).trim()
    : string.trim()

  if (!typeRegExp.test(type)) {
    throw new TypeError('invalid media type')
  }

  var key
  var match
  var obj = new ContentType(type.toLowerCase())
  var value

  paramRegExp.lastIndex = index

  while (match = paramRegExp.exec(string)) {
    if (match.index !== index) {
      throw new TypeError('invalid parameter format')
    }

    index += match[0].length
    key = match[1].toLowerCase()
    value = match[2]

    if (value[0] === '"') {
      // remove quotes and escapes
      value = value
        .substr(1, value.length - 2)
        .replace(qescRegExp, '$1')
    }

    obj.parameters[key] = value
  }

  if (index !== -1 && index !== string.length) {
    throw new TypeError('invalid parameter format')
  }

  return obj
}

/**
 * Get content-type from req/res objects.
 *
 * @param {object}
 * @return {Object}
 * @private
 */

function getcontenttype(obj) {
  if (typeof obj.getHeader === 'function') {
    // res-like
    return obj.getHeader('content-type')
  }

  if (typeof obj.headers === 'object') {
    // req-like
    return obj.headers && obj.headers['content-type']
  }
}

/**
 * Quote a string if necessary.
 *
 * @param {string} val
 * @return {string}
 * @private
 */

function qstring(val) {
  var str = String(val)

  // no need to quote tokens
  if (tokenRegExp.test(str)) {
    return str
  }

  if (str.length > 0 && !textRegExp.test(str)) {
    throw new TypeError('invalid parameter value')
  }

  return '"' + str.replace(quoteRegExp, '\\$1') + '"'
}

/**
 * Class to represent a content type.
 * @private
 */
function ContentType(type) {
  this.parameters = Object.create(null)
  this.type = type
}

},{}],2:[function(require,module,exports){
/* jshint node:true */

var UriTemplate = require('./UriTemplate');

function Router() {
    var routes = [];

    this.add = function (template, handler) {

        routes.push({
            template: new UriTemplate(template),
            handler: handler
        }); //

    }; //add

    this.handle = function (url) {

        return routes.some(function (route) {
            var data = route.template.parse(url);
            return data && route.handler(data) !== false;
        });

    }; //exec

} //Router

module.exports = Router;
},{"./UriTemplate":3}],3:[function(require,module,exports){
/* jshint node:true */

module.exports = UriTemplate;


var operatorOptions = {
    "": {
        "prefix": "",
        "seperator": ",",
        "assignment": false,
        "assignEmpty": false,
        "encode": percentEncode
    },
    "+": {
        "prefix": "",
        "seperator": ",",
        "assignment": false,
        "assignEmpty": false,
        "encode": encodeURI
    },
    "#": {
        "prefix": "#",
        "seperator": ",",
        "assignment": false,
        "assignEmpty": false,
        "encode": encodeURI
    },
    ".": {
        "prefix": ".",
        "seperator": ".",
        "assignment": false,
        "assignEmpty": false,
        "encode": percentEncode
    },
    "/": {
        "prefix": "/",
        "seperator": "/",
        "assignment": false,
        "encode": encodeURIComponent
    },
    ";": {
        "prefix": ";",
        "seperator": ";",
        "assignment": true,
        "assignEmpty": false,
        "encode": encodeURIComponent
    },
    "?": {
        "prefix": "?",
        "seperator": "&",
        "assignment": true,
        "assignEmpty": true,
        "encode": encodeURIComponent
    },
    "&": {
        "prefix": "&",
        "seperator": "&",
        "assignment": true,
        "assignEmpty": true,
        "encode": encodeURIComponent
    }
}; //operatorOptions

function percentEncode(value) {
    /*
	http://tools.ietf.org/html/rfc3986#section-2.3
	*/
    var unreserved = "-._~";

    if (isUndefined(value)) return '';

    value = value.toString();

    return Array.prototype.map.call(value, function (ch) {
        var charCode = ch.charCodeAt(0);

        if (charCode >= 0x30 && charCode <= 0x39) return ch;
        if (charCode >= 0x41 && charCode <= 0x5a) return ch;
        if (charCode >= 0x61 && charCode <= 0x7a) return ch;

        if (~unreserved.indexOf(ch)) return ch;

        return '%' + charCode.toString(16).toUpperCase();
    }).join('');

} //percentEncode

function isDefined(value) {
    return !isUndefined(value);
} //isDefined
function isUndefined(value) {
    /*
	http://tools.ietf.org/html/rfc6570#section-2.3
	*/
    if (value === null) return true;
    if (value === undefined) return true;
    if (Array.isArray(value)) {
        if (value.length === 0) return true;
    }

    return false;
} //isUndefined


function UriTemplate(template) {
    /*
	http://tools.ietf.org/html/rfc6570#section-2.2

	expression    =  "{" [ operator ] variable-list "}"
	operator      =  op-level2 / op-level3 / op-reserve
	op-level2     =  "+" / "#"
	op-level3     =  "." / "/" / ";" / "?" / "&"
	op-reserve    =  "=" / "," / "!" / "@" / "|"
	*/
    var reTemplate = /\{([\+#\.\/;\?&=\,!@\|]?)([A-Za-z0-9_\,\.\:\*]+?)\}/g;
    var reVariable = /^([\$_a-z][\$_a-z0-9]*)((?:\:[1-9][0-9]?[0-9]?[0-9]?)?)(\*?)$/i;
    var match;
    var pieces = [];
    var glues = [];
    var offset = 0;
    var pieceCount = 0;

    while ( !! (match = reTemplate.exec(template))) {
        glues.push(template.substring(offset, match.index));
        /*
		The operator characters equals ("="), comma (","), exclamation ("!"),
		at sign ("@"), and pipe ("|") are reserved for future extensions.
		*/
        if (match[1] && ~'=,!@|'.indexOf(match[1])) {
            throw "operator '" + match[1] + "' is reserved for future extensions";
        }

        offset = match.index;
        pieces.push({
            operator: match[1],
            variables: match[2].split(',').map(variableMapper)
        });
        offset += match[0].length;
        pieceCount++;
    }

    function variableMapper(variable) {
        var match = reVariable.exec(variable);
        return {
            name: match[1],
            maxLength: match[2] && parseInt(match[2].substring(1), 10),
            composite: !! match[3]
        };
    }

    glues.push(template.substring(offset));

    this.parse = function (str) {
        var data = {};
        var offset = 0;
        var offsets = [];

        if (!glues.every(function (glue, glueIndex) {
            var index;
            if (glueIndex > 0 && glue === '') index = str.length;
            else index = str.indexOf(glue, offset);

            offset = index;
            offsets.push(offset);
            offset += glue.length;

            return~ index;
        })) return false;

        if (!pieces.every(function (piece, pieceIndex) {
            var options = operatorOptions[piece.operator];
            var value, values;
            var offsetBegin = offsets[pieceIndex] + glues[pieceIndex].length;
            var offsetEnd = offsets[pieceIndex + 1];

            value = str.substring(offsetBegin, offsetEnd);
            if (value.length === 0) return true;
            if (value.substring(0, options.prefix.length) !== options.prefix) return false;
            value = value.substring(options.prefix.length);
            values = value.split(options.seperator);

            if (!piece.variables.every(function (variable, variableIndex) {
                var value = values[variableIndex];
                var name;

                if (value === undefined) return true;

                name = variable.name;

                if (options.assignment) {
                    if (value.substring(0, name.length) !== name) return false;
                    value = value.substring(name.length);
                    if (value.length === 0 && options.assignEmpty) return false;
                    if (value.length > 0) {
                        if (value[0] !== '=') return false;
                        value = value.substring(1);
                    }
                }
                value = decodeURIComponent(value);
                data[name] = value;

                return true;
            })) return false;

            return true;

        })) return false;

        return data;
    }; //parse

    this.stringify = function (data) {
        var str = '';
        data = data || {};

        str += glues[0];
        if (!pieces.every(function (piece, pieceIndex) {

            var options = operatorOptions[piece.operator];
            var parts;

            parts = piece.variables.map(function (variable) {
                var value = data[variable.name];

                if (!Array.isArray(value)) value = [value];

                value = value.filter(isDefined);

                if (isUndefined(value)) return null;

                if (variable.composite) {
                    value = value.map(function (value) {

                        if (typeof value === 'object') {

                            value = Object.keys(value).map(function (key) {
                                var keyValue = value[key];
                                if (variable.maxLength) keyValue = keyValue.substring(0, variable.maxLength);

                                keyValue = options.encode(keyValue);

                                if (keyValue) keyValue = key + '=' + keyValue;
                                else {
                                    keyValue = key;
                                    if (options.assignEmpty) keyValue += '=';
                                }

                                return keyValue;
                            }).join(options.seperator);

                        } else {
                            if (variable.maxLength) value = value.substring(0, variable.maxLength);

                            value = options.encode(value);

                            if (options.assignment) {
                                if (value) value = variable.name + '=' + value;
                                else {
                                    value = variable.name;
                                    if (options.assignEmpty) value += '=';
                                }
                            }
                        }

                        return value;
                    });

                    value = value.join(options.seperator);
                } else {
                    value = value.map(function (value) {
                        if (typeof value === 'object') {
                            return Object.keys(value).map(function (key) {
                                var keyValue = value[key];
                                if (variable.maxLength) keyValue = keyValue.substring(0, variable.maxLength);
                                return key + ',' + options.encode(keyValue);
                            }).join(',');
                        } else {
                            if (variable.maxLength) value = value.substring(0, variable.maxLength);

                            return options.encode(value);
                        }

                    });
                    value = value.join(',');

                    if (options.assignment) {
                        if (value) value = variable.name + '=' + value;
                        else {
                            value = variable.name;
                            if (options.assignEmpty) value += '=';
                        }
                    }

                }

                return value;
            });

            parts = parts.filter(isDefined);
            if (isDefined(parts)) {
                str += options.prefix;
                str += parts.join(options.seperator);
            }

            str += glues[pieceIndex + 1];
            return true;
        })) return false;

        return str;
    }; //stringify

} //UriTemplate
},{}],4:[function(require,module,exports){
/* jshint node:true */

module.exports = {
    Router: require('./Router'),
    UriTemplate: require('./UriTemplate')
};
},{"./Router":2,"./UriTemplate":3}],5:[function(require,module,exports){
'use strict';

/**
 * @deprecated The halClient service is deprecated. Please use $http directly instead.
 */

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var HalClient = function () {
  /**
   * @param {Log}      $log
   * @param {Http}     $http
   * @param {Function} LinkHeader
   * @param {Object}   $halConfiguration
   */

  function HalClient($log, $http, LinkHeader, $halConfiguration) {
    _classCallCheck(this, HalClient);

    this._$log = $log;
    this._$http = $http;
    this._$halConfiguration = $halConfiguration;
    this.LinkHeader = LinkHeader;
  }

  _createClass(HalClient, [{
    key: '$get',
    value: function $get(href, options) {
      return this.$request('GET', href, options);
    }
  }, {
    key: '$post',
    value: function $post(href, options, data) {
      return this.$request('POST', href, options, data);
    }
  }, {
    key: '$put',
    value: function $put(href, options, data) {
      return this.$request('PUT', href, options, data);
    }
  }, {
    key: '$patch',
    value: function $patch(href, options, data) {
      return this.$request('PATCH', href, options, data);
    }
  }, {
    key: '$delete',
    value: function $delete(href, options) {
      return this.$request('DELETE', href, options);
    }
  }, {
    key: '$link',
    value: function $link(href, options, linkHeaders) {
      options = options || {};
      options.headers = options.headers || {};
      options.headers.Link = linkHeaders.map(function (link) {
        return link.toString();
      });
      return this.$request('LINK', href, options);
    }
  }, {
    key: '$unlink',
    value: function $unlink(href, options, linkHeaders) {
      options = options || {};
      options.headers = options.headers || {};
      options.headers.Link = linkHeaders.map(function (link) {
        return link.toString();
      });
      return this.$request('UNLINK', href, options);
    }
  }, {
    key: '$request',
    value: function $request(method, href, options, data) {
      options = options || {};
      this._$log.log('The halClient service is deprecated. Please use $http directly instead.');
      return this._$http(angular.extend({}, options, {
        method: method,
        url: this._$halConfiguration.urlTransformer(href),
        data: data
      }));
    }
  }]);

  return HalClient;
}();

// Inject Dependencies


exports.default = HalClient;
HalClient.$inject = ['$log', '$http', 'LinkHeader', '$halConfiguration'];

},{}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _halClient = require('./hal-client');

var _halClient2 = _interopRequireDefault(_halClient);

var _linkHeader = require('./link-header');

var _linkHeader2 = _interopRequireDefault(_linkHeader);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MODULE_NAME = 'angular-hal.client';

// Add module for client
angular.module(MODULE_NAME, []).service('halClient', _halClient2.default).service('$halClient', _halClient2.default).value('LinkHeader', _linkHeader2.default);

exports.default = MODULE_NAME;

},{"./hal-client":5,"./link-header":7}],7:[function(require,module,exports){
'use strict';

/**
 * Link Header
 */

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var LinkHeader = function () {
  /**
   * @param {String} uriReference The Link Value
   * @param {Object} linkParams   The Link Params
   */

  function LinkHeader(uriReference, linkParams) {
    _classCallCheck(this, LinkHeader);

    this.uriReference = uriReference;
    this.linkParams = angular.extend({
      rel: null,
      anchor: null,
      rev: null,
      hreflang: null,
      media: null,
      title: null,
      type: null
    }, linkParams);
  }
  /**
   * @return {String}
   */


  _createClass(LinkHeader, [{
    key: 'toString',
    value: function toString() {
      var result = '<' + this.uriReference + '>',
          params = [];

      for (var paramName in this.linkParams) {
        var paramValue = this.linkParams[paramName];
        if (paramValue) {
          params.push(paramName + '="' + paramValue + '"');
        }
      }

      if (params.length < 1) {
        return result;
      }

      result = result + ';' + params.join(';');

      return result;
    }
  }]);

  return LinkHeader;
}();

exports.default = LinkHeader;

},{}],8:[function(require,module,exports){
'use strict';

/**
 * @param {String}
 * @return {String}
 */

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.noopUrlTransformer = noopUrlTransformer;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function noopUrlTransformer(url) {
  return url;
}

var HalConfigurationProvider = function () {
  function HalConfigurationProvider() {
    _classCallCheck(this, HalConfigurationProvider);

    this._linksAttribute = '_links';
    this._embeddedAttribute = '_embedded';
    this._ignoreAttributePrefixes = ['_', '$'];
    this._selfLink = 'self';
    this._forceJSONResource = false;
    this._urlTransformer = noopUrlTransformer;

    this.$get.$inject = ['$log'];
  }

  /**
   * @param {String} linksAttribute
   */


  _createClass(HalConfigurationProvider, [{
    key: 'setLinksAttribute',
    value: function setLinksAttribute(linksAttribute) {
      this._linksAttribute = linksAttribute;
    }

    /**
     * @param {String} embeddedAttribute
     */

  }, {
    key: 'setEmbeddedAttribute',
    value: function setEmbeddedAttribute(embeddedAttribute) {
      this._embeddedAttribute = embeddedAttribute;
    }

    /**
     * @param {String[]} ignoreAttributePrefixes
     */

  }, {
    key: 'setIgnoreAttributePrefixes',
    value: function setIgnoreAttributePrefixes(ignoreAttributePrefixes) {
      this._ignoreAttributePrefixes = ignoreAttributePrefixes;
    }

    /**
     * @param {String} ignoreAttributePrefix
     */

  }, {
    key: 'addIgnoreAttributePrefix',
    value: function addIgnoreAttributePrefix(ignoreAttributePrefix) {
      this._ignoreAttributePrefixes.push(ignoreAttributePrefix);
    }

    /**
     * @param {String} selfLink
     */

  }, {
    key: 'setSelfLink',
    value: function setSelfLink(selfLink) {
      this._selfLink = selfLink;
    }

    /**
     * @param {Boolean} forceJSONResource
     */

  }, {
    key: 'setForceJSONResource',
    value: function setForceJSONResource(forceJSONResource) {
      this._forceJSONResource = forceJSONResource;
    }

    /**
     * @param {Function} urlTransformer
     * @deprecated $halConfigurationProvider.setUrlTransformer is deprecated. Please write a http interceptor instead.
     * @see https://docs.angularjs.org/api/ng/service/$http#interceptors
     */

  }, {
    key: 'setUrlTransformer',
    value: function setUrlTransformer(urlTransformer) {
      this._urlTransformer = urlTransformer;
    }

    /**
     * Get Configuration
     * @param  {Log} $log logger
     * @return {Object}
     */

  }, {
    key: '$get',
    value: function $get($log) {
      if (this._urlTransformer !== noopUrlTransformer) {
        $log.log('$halConfigurationProvider.setUrlTransformer is deprecated. Please write a http interceptor instead.');
      }

      return Object.freeze({
        linksAttribute: this._linksAttribute,
        embeddedAttribute: this._embeddedAttribute,
        ignoreAttributePrefixes: this._ignoreAttributePrefixes,
        selfLink: this._selfLink,
        forceJSONResource: this._forceJSONResource,
        urlTransformer: this._urlTransformer
      });
    }
  }]);

  return HalConfigurationProvider;
}();

exports.default = HalConfigurationProvider;

},{}],9:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _halConfiguration = require('./hal-configuration.provider');

var _halConfiguration2 = _interopRequireDefault(_halConfiguration);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MODULE_NAME = 'angular-hal.configuration';

// Add module for configuration
angular.module(MODULE_NAME, []).provider('$halConfiguration', _halConfiguration2.default);

exports.default = MODULE_NAME;

},{"./hal-configuration.provider":8}],10:[function(require,module,exports){
'use strict';

/**
 * @param {HttpProvider} $httpProvider
 */

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = HttpInterceptorConfiguration;
function HttpInterceptorConfiguration($httpProvider) {
  $httpProvider.interceptors.push('ResourceHttpInterceptor');
}

HttpInterceptorConfiguration.$inject = ['$httpProvider'];

},{}],11:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _resource = require('../resource');

var _resource2 = _interopRequireDefault(_resource);

var _configuration = require('../configuration');

var _configuration2 = _interopRequireDefault(_configuration);

var _resourceHttpInterceptor = require('./resource-http-interceptor.factory');

var _resourceHttpInterceptor2 = _interopRequireDefault(_resourceHttpInterceptor);

var _httpInterception = require('./http-interception.config');

var _httpInterception2 = _interopRequireDefault(_httpInterception);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MODULE_NAME = 'angular-hal.http-interception';

// Add module for http interception
angular.module(MODULE_NAME, [_resource2.default, _configuration2.default]).config(_httpInterception2.default).factory('ResourceHttpInterceptor', _resourceHttpInterceptor2.default);

exports.default = MODULE_NAME;

},{"../configuration":9,"../resource":16,"./http-interception.config":10,"./resource-http-interceptor.factory":12}],12:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = ResourceHttpInterceptorFactory;

var _contentType = require('content-type');

var CONTENT_TYPE = 'application/hal+json';

function ResourceHttpInterceptorFactory($halConfiguration, Resource) {
  return {
    request: transformRequest,
    response: transformResponse
  };

  /**
   * Add Hal Json As an accepted format
   * @param {Request} request
   * @return {Request}
   */
  function transformRequest(request) {
    if (typeof request.headers.Accept === 'undefined') {
      request.headers.Accept = CONTENT_TYPE;
    } else {
      request.headers.Accept = [CONTENT_TYPE, request.headers.Accept].join(', ');
    }

    return request;
  }

  /**
   * Transform Response
   *
   * @param {Response} response
   * @return {Response|Resource}
   */
  function transformResponse(response) {
    try {
      if ((0, _contentType.parse)(response.headers('Content-Type')).type === CONTENT_TYPE) {
        return transformResponseToResource(response);
      }
    } catch (e) {
      // The parse function could throw an error, we do not want that.
    }
    if (response.config.forceHal) {
      return transformResponseToResource(response);
    }
    if ((response.headers('Content-Type') === 'application/json' || response.headers('Content-Type') === null) && $halConfiguration.forceJSONResource) {
      return transformResponseToResource(response);
    }

    return response;
  }
  function transformResponseToResource(response) {
    return new Resource(response.data, response);
  }
}

ResourceHttpInterceptorFactory.$inject = ['$halConfiguration', 'Resource'];

},{"content-type":1}],13:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _httpInterception = require('./http-interception');

var _httpInterception2 = _interopRequireDefault(_httpInterception);

var _client = require('./client');

var _client2 = _interopRequireDefault(_client);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MODULE_NAME = 'angular-hal';

// Combine needed Modules
angular.module(MODULE_NAME, [_httpInterception2.default, _client2.default]);

exports.default = MODULE_NAME;

},{"./client":6,"./http-interception":11}],14:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = generateUrl;

var _main = require('rfc6570/src/main');

var _main2 = _interopRequireDefault(_main);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Generate url from template
 *
 * @param  {String} template
 * @param  {Object} parameters
 * @return {String}
 */
function generateUrl(template, parameters) {
  return new _main2.default.UriTemplate(template).stringify(parameters);
}

},{"rfc6570/src/main":4}],15:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = HalResourceClientFactory;

var _extendReadOnly = require('../utility/extend-read-only');

var _extendReadOnly2 = _interopRequireDefault(_extendReadOnly);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Factory for HalResourceClient
 * @param {Q}        $q
 * @param {Injector} $injector Prevent Circular Dependency by injecting $injector instead of $http
 * @param {Object}   $halConfiguration
 */
function HalResourceClientFactory($q, $injector, $halConfiguration) {
  return HalResourceClient;

  /**
   * @param {Resource} resource
   * @param {Object}   links
   * @param {Object}   embedded
   */
  function HalResourceClient(resource, embedded) {
    var self = this,
        $http = $injector.get('$http');

    /**
     * Initialize the client
     */
    (function init() {
      (0, _extendReadOnly2.default)(self, {
        $request: $request,
        $get: $get,
        $post: $post,
        $put: $put,
        $patch: $patch,
        $delete: $delete,
        $del: $delete,
        $link: $link,
        $unlink: $unlink
      });
    })();

    /**
     * Execute a HTTP request against a link
     *
     * @param {String}      method
     * @param {String}      rel
     * @param {Object|null} urlParams
     * @param {mixed|null}  body
     * @param {Object}      options
     * @return {Promise}
     */
    function $request(method, rel, urlParams, body, options) {
      var promises;

      method = method || 'GET';
      rel = rel || $halConfiguration.selfLink;
      urlParams = urlParams || {};
      body = body || null;
      options = options || {};

      if (method === 'GET' && rel === $halConfiguration.selfLink) {
        return $q.resolve(resource);
      }

      if (resource.$hasEmbedded(rel) && Array.isArray(embedded[rel])) {
        promises = [];
        for (var i = 0; i < embedded[rel].length; i++) {
          promises.push(embedded[rel][i].$request().$request(method, 'self', urlParams, body, options));
        }
        return $q.all(promises);
      }

      if (resource.$hasEmbedded(rel)) {
        return embedded[rel].$request().$request(method, 'self', urlParams, body, options);
      }

      if (resource.$hasLink(rel)) {
        var url = resource.$href(rel, urlParams);

        angular.extend(options, {
          method: method,
          data: body
        });

        if (Array.isArray(url)) {
          promises = [];
          for (var j = 0; j < url.length; j++) {
            promises.push($http(angular.extend({}, options, { url: url[j] })));
          }
          return $q.all(promises);
        }

        return $http(angular.extend({}, options, {
          url: resource.$href(rel, urlParams)
        }));
      }

      return $q.reject(new Error('link "' + rel + '" is undefined'));
    }

    /**
     * Execute a HTTP GET request against a link or
     * load an embedded resource
     *
     * @param {String}      rel
     * @param {Object|null} urlParams
     * @param {Object}      options
     * @return {Promise}
     */
    function $get(rel, urlParams, options) {
      return $request('GET', rel, urlParams, undefined, options);
    }

    /**
     * Execute a HTTP POST request against a link
     *
     * @param {String}      rel
     * @param {Object|null} urlParams
     * @param {mixed|null}  body
     * @param {Object}      options
     * @return {Promise}
     */
    function $post(rel, urlParams, body, options) {
      return $request('POST', rel, urlParams, body, options);
    }

    /**
     * Execute a HTTP PUT request against a link
     *
     * @param {String}      rel
     * @param {Object|null} urlParams
     * @param {mixed|null}  body
     * @param {Object}      options
     * @return {Promise}
     */
    function $put(rel, urlParams, body, options) {
      return $request('PUT', rel, urlParams, body, options);
    }

    /**
     * Execute a HTTP PATCH request against a link
     *
     * @param {String}      rel
     * @param {Object|null} urlParams
     * @param {mixed|null}  body
     * @param {Object}      options
     * @return {Promise}
     */
    function $patch(rel, urlParams, body, options) {
      return $request('PATCH', rel, urlParams, body, options);
    }

    /**
     * Execute a HTTP DELEET request against a link
     *
     * @param {String}      rel
     * @param {Object|null} urlParams
     * @param {Object}      options
     * @return {Promise}
     */
    function $delete(rel, urlParams, options) {
      return $request('DELETE', rel, urlParams, undefined, options);
    }

    /**
     * Execute a HTTP LINK request against a link
     *
     * @param {String}       rel
     * @param {Object|null}  urlParams
     * @param {LinkHeader[]} body
     * @param {Object}       options
     * @return {Promise}
     */
    function $link(rel, urlParams, links, options) {
      options = options || {};
      options.headers = options.headers || {};
      options.headers.Link = links.map(toStringItem);
      return $request('LINK', rel, urlParams, undefined, options);
    }

    /**
     * Execute a HTTP UNLINK request against a link
     *
     * @param {String}       rel
     * @param {Object|null}  urlParams
     * @param {LinkHeader[]} body
     * @param {Object}       options
     * @return {Promise}
     */
    function $unlink(rel, urlParams, links, options) {
      options = options || {};
      options.headers = options.headers || {};
      options.headers.Link = links.map(toStringItem);
      return $request('UNLINK', rel, urlParams, undefined, options);
    }

    /**
     * @param {mixed} item
     * @return {String}
     */
    function toStringItem(item) {
      return item.toString();
    }
  }
}

HalResourceClientFactory.$inject = ['$q', '$injector', '$halConfiguration'];

},{"../utility/extend-read-only":19}],16:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _configuration = require('../configuration');

var _configuration2 = _interopRequireDefault(_configuration);

var _resource = require('./resource.factory');

var _resource2 = _interopRequireDefault(_resource);

var _halResourceClient = require('./hal-resource-client.factory');

var _halResourceClient2 = _interopRequireDefault(_halResourceClient);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MODULE_NAME = 'angular-hal.resource';

// Add module for resource
angular.module(MODULE_NAME, [_configuration2.default]).factory('Resource', _resource2.default).factory('HalResourceClient', _halResourceClient2.default);

exports.default = MODULE_NAME;

},{"../configuration":9,"./hal-resource-client.factory":15,"./resource.factory":17}],17:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

exports.default = ResourceFactory;

var _extendReadOnly = require('../utility/extend-read-only');

var _extendReadOnly2 = _interopRequireDefault(_extendReadOnly);

var _defineReadOnly = require('../utility/define-read-only');

var _defineReadOnly2 = _interopRequireDefault(_defineReadOnly);

var _generateUrl = require('./generate-url');

var _generateUrl2 = _interopRequireDefault(_generateUrl);

var _normalizeLink = require('../utility/normalize-link');

var _normalizeLink2 = _interopRequireDefault(_normalizeLink);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Factory for Resource
 *
 * @param {Function} HalResourceClient
 * @param {Object}   $halConfiguration
 */
function ResourceFactory(HalResourceClient, $halConfiguration) {
  return Resource;

  /**
   * @param {Object} data
   * @param {Object} response
   */
  function Resource(data, response) {
    var self = this,
        links = {},
        embedded = {},
        client;

    /**
     * Initialize the Resource
     */
    (function init() {
      if ((typeof data === 'undefined' ? 'undefined' : _typeof(data)) !== 'object' || data === null) {
        data = {};
      }
      initializeData();
      initializeEmbedded();
      initializeLinks();
      inititalizeClient();

      (0, _extendReadOnly2.default)(self, {
        $hasLink: $hasLink,
        $hasEmbedded: $hasEmbedded,
        $has: $has,
        $href: $href,
        $meta: $meta,
        $link: $link,
        $request: $request,
        $response: $response
      });
    })();

    /**
     * Add all data from data to itself
     */
    function initializeData() {
      for (var propertyName in data) {
        if (!data.hasOwnProperty(propertyName)) {
          continue;
        }
        if (isMetaProperty(propertyName)) {
          continue;
        }
        (0, _defineReadOnly2.default)(self, propertyName, data[propertyName]);
      }
    }

    /**
     * Normalize all Links
     */
    function initializeLinks() {
      if (_typeof(data[$halConfiguration.linksAttribute]) !== 'object') {
        return;
      }

      Object.keys(data[$halConfiguration.linksAttribute]).forEach(function (rel) {
        var link = data[$halConfiguration.linksAttribute][rel];
        links[rel] = (0, _normalizeLink2.default)(response.config.url, link);
      });
    }

    /**
     * Normalize Embedded Contents
     */
    function initializeEmbedded() {
      if (_typeof(data[$halConfiguration.embeddedAttribute]) !== 'object') {
        return;
      }

      Object.keys(data[$halConfiguration.embeddedAttribute]).forEach(function (rel) {
        embedResource(rel, data[$halConfiguration.embeddedAttribute][rel]);
      });
    }

    /**
     * Initialize the HTTP CLIENT
     */
    function inititalizeClient() {
      client = new HalResourceClient(self, embedded);
    }

    /**
     * Embed a resource(s)
     *
     * @param {String}          rel
     * @param {Object|Object[]} resources
     */
    function embedResource(rel, resources) {
      if (Array.isArray(resources)) {
        embedded[rel] = [];
        resources.forEach(function (resource) {
          embedded[rel].push(new Resource(resource, response));
        });
        return;
      }
      embedded[rel] = new Resource(resources, response);
    }

    /**
     * Determine if a property name is a meta property
     * @param {String} propertyName
     * @return {Boolean}
     */
    function isMetaProperty(propertyName) {
      for (var i = 0; i < $halConfiguration.ignoreAttributePrefixes.length; i++) {
        if (propertyName.substr(0, 1) === $halConfiguration.ignoreAttributePrefixes[i]) {
          return true;
        }
        if (propertyName === $halConfiguration.linksAttribute || propertyName === $halConfiguration.embeddedAttribute) {
          return true;
        }
      }
      return false;
    }

    /**
     * @param {String} rel
     * @return {Boolean}
     */
    function $hasLink(rel) {
      return typeof links[rel] !== 'undefined';
    }

    /**
     * @param {String} rel
     * @return {Boolean}
     */
    function $hasEmbedded(rel) {
      return typeof embedded[rel] !== 'undefined';
    }

    /**
     * @param {String} rel
     * @return {Boolean}
     */
    function $has(rel) {
      return $hasLink(rel) || $hasEmbedded(rel);
    }

    /**
     * Get the href of a Link
     *
     * @param {String} rel
     * @param {Object} parameters
     * @return {String}
     */
    function $href(rel, parameters) {
      if (!$hasLink(rel)) {
        throw new Error('link "' + rel + '" is undefined');
      }

      var link = links[rel],
          href = link.href;

      if (Array.isArray(link)) {
        href = [];
        for (var i = 0; i < link.length; i++) {
          var subLink = link[i],
              subHref = subLink.href;
          if (typeof subLink.templated !== 'undefined' && subLink.templated) {
            subHref = (0, _generateUrl2.default)(subLink.href, parameters);
          }
          subHref = $halConfiguration.urlTransformer(subHref);
          href.push(subHref);
        }
      } else {
        if (typeof link.templated !== 'undefined' && link.templated) {
          href = (0, _generateUrl2.default)(link.href, parameters);
        }

        href = $halConfiguration.urlTransformer(href);
      }

      return href;
    }

    /**
     * Get a link
     *
     * !! To get a href, use $href instead !!
     *
     * @param {String} rel
     * @return {Object}
     */
    function $link(rel) {
      if (!$hasLink(rel)) {
        throw new Error('link "' + rel + '" is undefined');
      }
      var link = links[rel];
      return link;
    }

    /**
     * Get meta properties
     *
     * !! To get a href, use $href instead !!
     * !! To get a link, use $link instead !!
     * !! To get an embedded resource, use $request().$get(rel) instead !!
     *
     * @param {String} rel
     * @return {Object}
     */
    function $meta(name) {
      for (var i = 0; i < $halConfiguration.ignoreAttributePrefixes.length; i++) {
        var fullName = $halConfiguration.ignoreAttributePrefixes[i] + name;
        return data[fullName];
      }
    }

    /**
     * Get the Original Response
     *
     * @return {Object)}
     */
    function $response() {
      return response;
    }

    /**
     * Get the client to perform requests
     *
     * @return {HalResourceClient)}
     */
    function $request() {
      return client;
    }
  }
}
ResourceFactory.$inject = ['HalResourceClient', '$halConfiguration'];

},{"../utility/define-read-only":18,"../utility/extend-read-only":19,"../utility/normalize-link":20,"./generate-url":14}],18:[function(require,module,exports){
'use strict';

/**
 * Define read-only property in target
 * @param {Object} target
 * @param {String} key
 * @param {mixed}  value
 */

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = defineReadOnly;
function defineReadOnly(target, key, value) {
  Object.defineProperty(target, key, {
    configurable: false,
    enumerable: true,
    value: value,
    writable: true
  });
}

},{}],19:[function(require,module,exports){
'use strict';

/**
 * Extend properties from copy read-only to target
 * @param {Object} target
 * @param {Object} copy
 */

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = extendReadOnly;
function extendReadOnly(target, copy) {
  for (var key in copy) {
    Object.defineProperty(target, key, {
      configurable: false,
      enumerable: false,
      value: copy[key]
    });
  }
}

},{}],20:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = normalizeLink;

var _resolveUrl = require('../utility/resolve-url');

var _resolveUrl2 = _interopRequireDefault(_resolveUrl);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @param {String} baseUrl
 * @param {mixed}  link
 * @return {Object}
 */
function normalizeLink(baseUrl, link) {
  if (Array.isArray(link)) {
    return link.map(function (item) {
      return normalizeLink(baseUrl, item);
    });
  }
  if (typeof link === 'string') {
    return {
      href: (0, _resolveUrl2.default)(baseUrl, link)
    };
  }
  if (typeof link.href === 'string') {
    link.href = (0, _resolveUrl2.default)(baseUrl, link.href);
    return link;
  }
  if (Array.isArray(link.href)) {
    return link.href.map(function (href) {
      var newLink = angular.extend({}, link, {
        href: href
      });
      return normalizeLink(baseUrl, newLink);
    });
  }
  return {
    href: baseUrl
  };
}

},{"../utility/resolve-url":21}],21:[function(require,module,exports){
'use strict';

/**
 * Resolve whole URL
 *
 * @param {String} baseUrl
 * @param {String} path
 * @return {String}
 */

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = resolveUrl;
function resolveUrl(baseUrl, path) {
  var resultHref = '',
      reFullUrl = /^((?:\w+\:)?)((?:\/\/)?)([^\/]*)((?:\/.*)?)$/,
      baseHrefMatch = reFullUrl.exec(baseUrl),
      hrefMatch = reFullUrl.exec(path);

  for (var partIndex = 1; partIndex < 5; partIndex++) {
    if (hrefMatch[partIndex]) {
      resultHref += hrefMatch[partIndex];
    } else {
      resultHref += baseHrefMatch[partIndex];
    }
  }

  return resultHref;
}

},{}]},{},[13])(13)
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXMvY29udGVudC10eXBlL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL3JmYzY1NzAvc3JjL1JvdXRlci5qcyIsIm5vZGVfbW9kdWxlcy9yZmM2NTcwL3NyYy9VcmlUZW1wbGF0ZS5qcyIsIm5vZGVfbW9kdWxlcy9yZmM2NTcwL3NyYy9tYWluLmpzIiwic3JjL2NsaWVudC9oYWwtY2xpZW50LmpzIiwic3JjL2NsaWVudC9pbmRleC5qcyIsInNyYy9jbGllbnQvbGluay1oZWFkZXIuanMiLCJzcmMvY29uZmlndXJhdGlvbi9oYWwtY29uZmlndXJhdGlvbi5wcm92aWRlci5qcyIsInNyYy9jb25maWd1cmF0aW9uL2luZGV4LmpzIiwic3JjL2h0dHAtaW50ZXJjZXB0aW9uL2h0dHAtaW50ZXJjZXB0aW9uLmNvbmZpZy5qcyIsInNyYy9odHRwLWludGVyY2VwdGlvbi9pbmRleC5qcyIsInNyYy9odHRwLWludGVyY2VwdGlvbi9yZXNvdXJjZS1odHRwLWludGVyY2VwdG9yLmZhY3RvcnkuanMiLCJzcmMvaW5kZXguanMiLCJzcmMvcmVzb3VyY2UvZ2VuZXJhdGUtdXJsLmpzIiwic3JjL3Jlc291cmNlL2hhbC1yZXNvdXJjZS1jbGllbnQuZmFjdG9yeS5qcyIsInNyYy9yZXNvdXJjZS9pbmRleC5qcyIsInNyYy9yZXNvdXJjZS9yZXNvdXJjZS5mYWN0b3J5LmpzIiwic3JjL3V0aWxpdHkvZGVmaW5lLXJlYWQtb25seS5qcyIsInNyYy91dGlsaXR5L2V4dGVuZC1yZWFkLW9ubHkuanMiLCJzcmMvdXRpbGl0eS9ub3JtYWxpemUtbGluay5qcyIsInNyYy91dGlsaXR5L3Jlc29sdmUtdXJsLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0TkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDM0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7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Ozs7Ozs7Ozs7a0JBU3dCO0FBQVQsU0FBUyxVQUFULENBQW9CLE9BQXBCLEVBQTZCLElBQTdCLEVBQW1DO0FBQ2hELE1BQUksYUFBYSxFQUFiO01BQ0EsWUFBWSw4Q0FBWjtNQUNBLGdCQUFnQixVQUFVLElBQVYsQ0FBZSxPQUFmLENBQWhCO01BQ0EsWUFBWSxVQUFVLElBQVYsQ0FBZSxJQUFmLENBQVosQ0FKNEM7O0FBTWhELE9BQUssSUFBSSxZQUFZLENBQVosRUFBZSxZQUFZLENBQVosRUFBZSxXQUF2QyxFQUFvRDtBQUNsRCxRQUFJLFVBQVUsU0FBVixDQUFKLEVBQTBCO0FBQ3hCLG9CQUFjLFVBQVUsU0FBVixDQUFkLENBRHdCO0tBQTFCLE1BRU87QUFDTCxvQkFBYyxjQUFjLFNBQWQsQ0FBZCxDQURLO0tBRlA7R0FERjs7QUFRQSxTQUFPLFVBQVAsQ0FkZ0Q7Q0FBbkMiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiLyohXG4gKiBjb250ZW50LXR5cGVcbiAqIENvcHlyaWdodChjKSAyMDE1IERvdWdsYXMgQ2hyaXN0b3BoZXIgV2lsc29uXG4gKiBNSVQgTGljZW5zZWRcbiAqL1xuXG4vKipcbiAqIFJlZ0V4cCB0byBtYXRjaCAqKCBcIjtcIiBwYXJhbWV0ZXIgKSBpbiBSRkMgNzIzMSBzZWMgMy4xLjEuMVxuICpcbiAqIHBhcmFtZXRlciAgICAgPSB0b2tlbiBcIj1cIiAoIHRva2VuIC8gcXVvdGVkLXN0cmluZyApXG4gKiB0b2tlbiAgICAgICAgID0gMSp0Y2hhclxuICogdGNoYXIgICAgICAgICA9IFwiIVwiIC8gXCIjXCIgLyBcIiRcIiAvIFwiJVwiIC8gXCImXCIgLyBcIidcIiAvIFwiKlwiXG4gKiAgICAgICAgICAgICAgIC8gXCIrXCIgLyBcIi1cIiAvIFwiLlwiIC8gXCJeXCIgLyBcIl9cIiAvIFwiYFwiIC8gXCJ8XCIgLyBcIn5cIlxuICogICAgICAgICAgICAgICAvIERJR0lUIC8gQUxQSEFcbiAqICAgICAgICAgICAgICAgOyBhbnkgVkNIQVIsIGV4Y2VwdCBkZWxpbWl0ZXJzXG4gKiBxdW90ZWQtc3RyaW5nID0gRFFVT1RFICooIHFkdGV4dCAvIHF1b3RlZC1wYWlyICkgRFFVT1RFXG4gKiBxZHRleHQgICAgICAgID0gSFRBQiAvIFNQIC8gJXgyMSAvICV4MjMtNUIgLyAleDVELTdFIC8gb2JzLXRleHRcbiAqIG9icy10ZXh0ICAgICAgPSAleDgwLUZGXG4gKiBxdW90ZWQtcGFpciAgID0gXCJcXFwiICggSFRBQiAvIFNQIC8gVkNIQVIgLyBvYnMtdGV4dCApXG4gKi9cbnZhciBwYXJhbVJlZ0V4cCA9IC87ICooWyEjJCUmJ1xcKlxcK1xcLVxcLlxcXl9gXFx8fjAtOUEtWmEtel0rKSAqPSAqKFwiKD86W1xcdTAwMGJcXHUwMDIwXFx1MDAyMVxcdTAwMjMtXFx1MDA1YlxcdTAwNWQtXFx1MDA3ZVxcdTAwODAtXFx1MDBmZl18XFxcXFtcXHUwMDBiXFx1MDAyMC1cXHUwMGZmXSkqXCJ8WyEjJCUmJ1xcKlxcK1xcLVxcLlxcXl9gXFx8fjAtOUEtWmEtel0rKSAqL2dcbnZhciB0ZXh0UmVnRXhwID0gL15bXFx1MDAwYlxcdTAwMjAtXFx1MDA3ZVxcdTAwODAtXFx1MDBmZl0rJC9cbnZhciB0b2tlblJlZ0V4cCA9IC9eWyEjJCUmJ1xcKlxcK1xcLVxcLlxcXl9gXFx8fjAtOUEtWmEtel0rJC9cblxuLyoqXG4gKiBSZWdFeHAgdG8gbWF0Y2ggcXVvdGVkLXBhaXIgaW4gUkZDIDcyMzAgc2VjIDMuMi42XG4gKlxuICogcXVvdGVkLXBhaXIgPSBcIlxcXCIgKCBIVEFCIC8gU1AgLyBWQ0hBUiAvIG9icy10ZXh0IClcbiAqIG9icy10ZXh0ICAgID0gJXg4MC1GRlxuICovXG52YXIgcWVzY1JlZ0V4cCA9IC9cXFxcKFtcXHUwMDBiXFx1MDAyMC1cXHUwMGZmXSkvZ1xuXG4vKipcbiAqIFJlZ0V4cCB0byBtYXRjaCBjaGFycyB0aGF0IG11c3QgYmUgcXVvdGVkLXBhaXIgaW4gUkZDIDcyMzAgc2VjIDMuMi42XG4gKi9cbnZhciBxdW90ZVJlZ0V4cCA9IC8oW1xcXFxcIl0pL2dcblxuLyoqXG4gKiBSZWdFeHAgdG8gbWF0Y2ggdHlwZSBpbiBSRkMgNjgzOFxuICpcbiAqIG1lZGlhLXR5cGUgPSB0eXBlIFwiL1wiIHN1YnR5cGVcbiAqIHR5cGUgICAgICAgPSB0b2tlblxuICogc3VidHlwZSAgICA9IHRva2VuXG4gKi9cbnZhciB0eXBlUmVnRXhwID0gL15bISMkJSYnXFwqXFwrXFwtXFwuXFxeX2BcXHx+MC05QS1aYS16XStcXC9bISMkJSYnXFwqXFwrXFwtXFwuXFxeX2BcXHx+MC05QS1aYS16XSskL1xuXG4vKipcbiAqIE1vZHVsZSBleHBvcnRzLlxuICogQHB1YmxpY1xuICovXG5cbmV4cG9ydHMuZm9ybWF0ID0gZm9ybWF0XG5leHBvcnRzLnBhcnNlID0gcGFyc2VcblxuLyoqXG4gKiBGb3JtYXQgb2JqZWN0IHRvIG1lZGlhIHR5cGUuXG4gKlxuICogQHBhcmFtIHtvYmplY3R9IG9ialxuICogQHJldHVybiB7c3RyaW5nfVxuICogQHB1YmxpY1xuICovXG5cbmZ1bmN0aW9uIGZvcm1hdChvYmopIHtcbiAgaWYgKCFvYmogfHwgdHlwZW9mIG9iaiAhPT0gJ29iamVjdCcpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdhcmd1bWVudCBvYmogaXMgcmVxdWlyZWQnKVxuICB9XG5cbiAgdmFyIHBhcmFtZXRlcnMgPSBvYmoucGFyYW1ldGVyc1xuICB2YXIgdHlwZSA9IG9iai50eXBlXG5cbiAgaWYgKCF0eXBlIHx8ICF0eXBlUmVnRXhwLnRlc3QodHlwZSkpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdpbnZhbGlkIHR5cGUnKVxuICB9XG5cbiAgdmFyIHN0cmluZyA9IHR5cGVcblxuICAvLyBhcHBlbmQgcGFyYW1ldGVyc1xuICBpZiAocGFyYW1ldGVycyAmJiB0eXBlb2YgcGFyYW1ldGVycyA9PT0gJ29iamVjdCcpIHtcbiAgICB2YXIgcGFyYW1cbiAgICB2YXIgcGFyYW1zID0gT2JqZWN0LmtleXMocGFyYW1ldGVycykuc29ydCgpXG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHBhcmFtcy5sZW5ndGg7IGkrKykge1xuICAgICAgcGFyYW0gPSBwYXJhbXNbaV1cblxuICAgICAgaWYgKCF0b2tlblJlZ0V4cC50ZXN0KHBhcmFtKSkge1xuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdpbnZhbGlkIHBhcmFtZXRlciBuYW1lJylcbiAgICAgIH1cblxuICAgICAgc3RyaW5nICs9ICc7ICcgKyBwYXJhbSArICc9JyArIHFzdHJpbmcocGFyYW1ldGVyc1twYXJhbV0pXG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHN0cmluZ1xufVxuXG4vKipcbiAqIFBhcnNlIG1lZGlhIHR5cGUgdG8gb2JqZWN0LlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfG9iamVjdH0gc3RyaW5nXG4gKiBAcmV0dXJuIHtPYmplY3R9XG4gKiBAcHVibGljXG4gKi9cblxuZnVuY3Rpb24gcGFyc2Uoc3RyaW5nKSB7XG4gIGlmICghc3RyaW5nKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignYXJndW1lbnQgc3RyaW5nIGlzIHJlcXVpcmVkJylcbiAgfVxuXG4gIGlmICh0eXBlb2Ygc3RyaW5nID09PSAnb2JqZWN0Jykge1xuICAgIC8vIHN1cHBvcnQgcmVxL3Jlcy1saWtlIG9iamVjdHMgYXMgYXJndW1lbnRcbiAgICBzdHJpbmcgPSBnZXRjb250ZW50dHlwZShzdHJpbmcpXG5cbiAgICBpZiAodHlwZW9mIHN0cmluZyAhPT0gJ3N0cmluZycpIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ2NvbnRlbnQtdHlwZSBoZWFkZXIgaXMgbWlzc2luZyBmcm9tIG9iamVjdCcpO1xuICAgIH1cbiAgfVxuXG4gIGlmICh0eXBlb2Ygc3RyaW5nICE9PSAnc3RyaW5nJykge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ2FyZ3VtZW50IHN0cmluZyBpcyByZXF1aXJlZCB0byBiZSBhIHN0cmluZycpXG4gIH1cblxuICB2YXIgaW5kZXggPSBzdHJpbmcuaW5kZXhPZignOycpXG4gIHZhciB0eXBlID0gaW5kZXggIT09IC0xXG4gICAgPyBzdHJpbmcuc3Vic3RyKDAsIGluZGV4KS50cmltKClcbiAgICA6IHN0cmluZy50cmltKClcblxuICBpZiAoIXR5cGVSZWdFeHAudGVzdCh0eXBlKSkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ2ludmFsaWQgbWVkaWEgdHlwZScpXG4gIH1cblxuICB2YXIga2V5XG4gIHZhciBtYXRjaFxuICB2YXIgb2JqID0gbmV3IENvbnRlbnRUeXBlKHR5cGUudG9Mb3dlckNhc2UoKSlcbiAgdmFyIHZhbHVlXG5cbiAgcGFyYW1SZWdFeHAubGFzdEluZGV4ID0gaW5kZXhcblxuICB3aGlsZSAobWF0Y2ggPSBwYXJhbVJlZ0V4cC5leGVjKHN0cmluZykpIHtcbiAgICBpZiAobWF0Y2guaW5kZXggIT09IGluZGV4KSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdpbnZhbGlkIHBhcmFtZXRlciBmb3JtYXQnKVxuICAgIH1cblxuICAgIGluZGV4ICs9IG1hdGNoWzBdLmxlbmd0aFxuICAgIGtleSA9IG1hdGNoWzFdLnRvTG93ZXJDYXNlKClcbiAgICB2YWx1ZSA9IG1hdGNoWzJdXG5cbiAgICBpZiAodmFsdWVbMF0gPT09ICdcIicpIHtcbiAgICAgIC8vIHJlbW92ZSBxdW90ZXMgYW5kIGVzY2FwZXNcbiAgICAgIHZhbHVlID0gdmFsdWVcbiAgICAgICAgLnN1YnN0cigxLCB2YWx1ZS5sZW5ndGggLSAyKVxuICAgICAgICAucmVwbGFjZShxZXNjUmVnRXhwLCAnJDEnKVxuICAgIH1cblxuICAgIG9iai5wYXJhbWV0ZXJzW2tleV0gPSB2YWx1ZVxuICB9XG5cbiAgaWYgKGluZGV4ICE9PSAtMSAmJiBpbmRleCAhPT0gc3RyaW5nLmxlbmd0aCkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ2ludmFsaWQgcGFyYW1ldGVyIGZvcm1hdCcpXG4gIH1cblxuICByZXR1cm4gb2JqXG59XG5cbi8qKlxuICogR2V0IGNvbnRlbnQtdHlwZSBmcm9tIHJlcS9yZXMgb2JqZWN0cy5cbiAqXG4gKiBAcGFyYW0ge29iamVjdH1cbiAqIEByZXR1cm4ge09iamVjdH1cbiAqIEBwcml2YXRlXG4gKi9cblxuZnVuY3Rpb24gZ2V0Y29udGVudHR5cGUob2JqKSB7XG4gIGlmICh0eXBlb2Ygb2JqLmdldEhlYWRlciA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIC8vIHJlcy1saWtlXG4gICAgcmV0dXJuIG9iai5nZXRIZWFkZXIoJ2NvbnRlbnQtdHlwZScpXG4gIH1cblxuICBpZiAodHlwZW9mIG9iai5oZWFkZXJzID09PSAnb2JqZWN0Jykge1xuICAgIC8vIHJlcS1saWtlXG4gICAgcmV0dXJuIG9iai5oZWFkZXJzICYmIG9iai5oZWFkZXJzWydjb250ZW50LXR5cGUnXVxuICB9XG59XG5cbi8qKlxuICogUXVvdGUgYSBzdHJpbmcgaWYgbmVjZXNzYXJ5LlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSB2YWxcbiAqIEByZXR1cm4ge3N0cmluZ31cbiAqIEBwcml2YXRlXG4gKi9cblxuZnVuY3Rpb24gcXN0cmluZyh2YWwpIHtcbiAgdmFyIHN0ciA9IFN0cmluZyh2YWwpXG5cbiAgLy8gbm8gbmVlZCB0byBxdW90ZSB0b2tlbnNcbiAgaWYgKHRva2VuUmVnRXhwLnRlc3Qoc3RyKSkge1xuICAgIHJldHVybiBzdHJcbiAgfVxuXG4gIGlmIChzdHIubGVuZ3RoID4gMCAmJiAhdGV4dFJlZ0V4cC50ZXN0KHN0cikpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdpbnZhbGlkIHBhcmFtZXRlciB2YWx1ZScpXG4gIH1cblxuICByZXR1cm4gJ1wiJyArIHN0ci5yZXBsYWNlKHF1b3RlUmVnRXhwLCAnXFxcXCQxJykgKyAnXCInXG59XG5cbi8qKlxuICogQ2xhc3MgdG8gcmVwcmVzZW50IGEgY29udGVudCB0eXBlLlxuICogQHByaXZhdGVcbiAqL1xuZnVuY3Rpb24gQ29udGVudFR5cGUodHlwZSkge1xuICB0aGlzLnBhcmFtZXRlcnMgPSBPYmplY3QuY3JlYXRlKG51bGwpXG4gIHRoaXMudHlwZSA9IHR5cGVcbn1cbiIsIi8qIGpzaGludCBub2RlOnRydWUgKi9cblxudmFyIFVyaVRlbXBsYXRlID0gcmVxdWlyZSgnLi9VcmlUZW1wbGF0ZScpO1xuXG5mdW5jdGlvbiBSb3V0ZXIoKSB7XG4gICAgdmFyIHJvdXRlcyA9IFtdO1xuXG4gICAgdGhpcy5hZGQgPSBmdW5jdGlvbiAodGVtcGxhdGUsIGhhbmRsZXIpIHtcblxuICAgICAgICByb3V0ZXMucHVzaCh7XG4gICAgICAgICAgICB0ZW1wbGF0ZTogbmV3IFVyaVRlbXBsYXRlKHRlbXBsYXRlKSxcbiAgICAgICAgICAgIGhhbmRsZXI6IGhhbmRsZXJcbiAgICAgICAgfSk7IC8vXG5cbiAgICB9OyAvL2FkZFxuXG4gICAgdGhpcy5oYW5kbGUgPSBmdW5jdGlvbiAodXJsKSB7XG5cbiAgICAgICAgcmV0dXJuIHJvdXRlcy5zb21lKGZ1bmN0aW9uIChyb3V0ZSkge1xuICAgICAgICAgICAgdmFyIGRhdGEgPSByb3V0ZS50ZW1wbGF0ZS5wYXJzZSh1cmwpO1xuICAgICAgICAgICAgcmV0dXJuIGRhdGEgJiYgcm91dGUuaGFuZGxlcihkYXRhKSAhPT0gZmFsc2U7XG4gICAgICAgIH0pO1xuXG4gICAgfTsgLy9leGVjXG5cbn0gLy9Sb3V0ZXJcblxubW9kdWxlLmV4cG9ydHMgPSBSb3V0ZXI7IiwiLyoganNoaW50IG5vZGU6dHJ1ZSAqL1xuXG5tb2R1bGUuZXhwb3J0cyA9IFVyaVRlbXBsYXRlO1xuXG5cbnZhciBvcGVyYXRvck9wdGlvbnMgPSB7XG4gICAgXCJcIjoge1xuICAgICAgICBcInByZWZpeFwiOiBcIlwiLFxuICAgICAgICBcInNlcGVyYXRvclwiOiBcIixcIixcbiAgICAgICAgXCJhc3NpZ25tZW50XCI6IGZhbHNlLFxuICAgICAgICBcImFzc2lnbkVtcHR5XCI6IGZhbHNlLFxuICAgICAgICBcImVuY29kZVwiOiBwZXJjZW50RW5jb2RlXG4gICAgfSxcbiAgICBcIitcIjoge1xuICAgICAgICBcInByZWZpeFwiOiBcIlwiLFxuICAgICAgICBcInNlcGVyYXRvclwiOiBcIixcIixcbiAgICAgICAgXCJhc3NpZ25tZW50XCI6IGZhbHNlLFxuICAgICAgICBcImFzc2lnbkVtcHR5XCI6IGZhbHNlLFxuICAgICAgICBcImVuY29kZVwiOiBlbmNvZGVVUklcbiAgICB9LFxuICAgIFwiI1wiOiB7XG4gICAgICAgIFwicHJlZml4XCI6IFwiI1wiLFxuICAgICAgICBcInNlcGVyYXRvclwiOiBcIixcIixcbiAgICAgICAgXCJhc3NpZ25tZW50XCI6IGZhbHNlLFxuICAgICAgICBcImFzc2lnbkVtcHR5XCI6IGZhbHNlLFxuICAgICAgICBcImVuY29kZVwiOiBlbmNvZGVVUklcbiAgICB9LFxuICAgIFwiLlwiOiB7XG4gICAgICAgIFwicHJlZml4XCI6IFwiLlwiLFxuICAgICAgICBcInNlcGVyYXRvclwiOiBcIi5cIixcbiAgICAgICAgXCJhc3NpZ25tZW50XCI6IGZhbHNlLFxuICAgICAgICBcImFzc2lnbkVtcHR5XCI6IGZhbHNlLFxuICAgICAgICBcImVuY29kZVwiOiBwZXJjZW50RW5jb2RlXG4gICAgfSxcbiAgICBcIi9cIjoge1xuICAgICAgICBcInByZWZpeFwiOiBcIi9cIixcbiAgICAgICAgXCJzZXBlcmF0b3JcIjogXCIvXCIsXG4gICAgICAgIFwiYXNzaWdubWVudFwiOiBmYWxzZSxcbiAgICAgICAgXCJlbmNvZGVcIjogZW5jb2RlVVJJQ29tcG9uZW50XG4gICAgfSxcbiAgICBcIjtcIjoge1xuICAgICAgICBcInByZWZpeFwiOiBcIjtcIixcbiAgICAgICAgXCJzZXBlcmF0b3JcIjogXCI7XCIsXG4gICAgICAgIFwiYXNzaWdubWVudFwiOiB0cnVlLFxuICAgICAgICBcImFzc2lnbkVtcHR5XCI6IGZhbHNlLFxuICAgICAgICBcImVuY29kZVwiOiBlbmNvZGVVUklDb21wb25lbnRcbiAgICB9LFxuICAgIFwiP1wiOiB7XG4gICAgICAgIFwicHJlZml4XCI6IFwiP1wiLFxuICAgICAgICBcInNlcGVyYXRvclwiOiBcIiZcIixcbiAgICAgICAgXCJhc3NpZ25tZW50XCI6IHRydWUsXG4gICAgICAgIFwiYXNzaWduRW1wdHlcIjogdHJ1ZSxcbiAgICAgICAgXCJlbmNvZGVcIjogZW5jb2RlVVJJQ29tcG9uZW50XG4gICAgfSxcbiAgICBcIiZcIjoge1xuICAgICAgICBcInByZWZpeFwiOiBcIiZcIixcbiAgICAgICAgXCJzZXBlcmF0b3JcIjogXCImXCIsXG4gICAgICAgIFwiYXNzaWdubWVudFwiOiB0cnVlLFxuICAgICAgICBcImFzc2lnbkVtcHR5XCI6IHRydWUsXG4gICAgICAgIFwiZW5jb2RlXCI6IGVuY29kZVVSSUNvbXBvbmVudFxuICAgIH1cbn07IC8vb3BlcmF0b3JPcHRpb25zXG5cbmZ1bmN0aW9uIHBlcmNlbnRFbmNvZGUodmFsdWUpIHtcbiAgICAvKlxuXHRodHRwOi8vdG9vbHMuaWV0Zi5vcmcvaHRtbC9yZmMzOTg2I3NlY3Rpb24tMi4zXG5cdCovXG4gICAgdmFyIHVucmVzZXJ2ZWQgPSBcIi0uX35cIjtcblxuICAgIGlmIChpc1VuZGVmaW5lZCh2YWx1ZSkpIHJldHVybiAnJztcblxuICAgIHZhbHVlID0gdmFsdWUudG9TdHJpbmcoKTtcblxuICAgIHJldHVybiBBcnJheS5wcm90b3R5cGUubWFwLmNhbGwodmFsdWUsIGZ1bmN0aW9uIChjaCkge1xuICAgICAgICB2YXIgY2hhckNvZGUgPSBjaC5jaGFyQ29kZUF0KDApO1xuXG4gICAgICAgIGlmIChjaGFyQ29kZSA+PSAweDMwICYmIGNoYXJDb2RlIDw9IDB4MzkpIHJldHVybiBjaDtcbiAgICAgICAgaWYgKGNoYXJDb2RlID49IDB4NDEgJiYgY2hhckNvZGUgPD0gMHg1YSkgcmV0dXJuIGNoO1xuICAgICAgICBpZiAoY2hhckNvZGUgPj0gMHg2MSAmJiBjaGFyQ29kZSA8PSAweDdhKSByZXR1cm4gY2g7XG5cbiAgICAgICAgaWYgKH51bnJlc2VydmVkLmluZGV4T2YoY2gpKSByZXR1cm4gY2g7XG5cbiAgICAgICAgcmV0dXJuICclJyArIGNoYXJDb2RlLnRvU3RyaW5nKDE2KS50b1VwcGVyQ2FzZSgpO1xuICAgIH0pLmpvaW4oJycpO1xuXG59IC8vcGVyY2VudEVuY29kZVxuXG5mdW5jdGlvbiBpc0RlZmluZWQodmFsdWUpIHtcbiAgICByZXR1cm4gIWlzVW5kZWZpbmVkKHZhbHVlKTtcbn0gLy9pc0RlZmluZWRcbmZ1bmN0aW9uIGlzVW5kZWZpbmVkKHZhbHVlKSB7XG4gICAgLypcblx0aHR0cDovL3Rvb2xzLmlldGYub3JnL2h0bWwvcmZjNjU3MCNzZWN0aW9uLTIuM1xuXHQqL1xuICAgIGlmICh2YWx1ZSA9PT0gbnVsbCkgcmV0dXJuIHRydWU7XG4gICAgaWYgKHZhbHVlID09PSB1bmRlZmluZWQpIHJldHVybiB0cnVlO1xuICAgIGlmIChBcnJheS5pc0FycmF5KHZhbHVlKSkge1xuICAgICAgICBpZiAodmFsdWUubGVuZ3RoID09PSAwKSByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICByZXR1cm4gZmFsc2U7XG59IC8vaXNVbmRlZmluZWRcblxuXG5mdW5jdGlvbiBVcmlUZW1wbGF0ZSh0ZW1wbGF0ZSkge1xuICAgIC8qXG5cdGh0dHA6Ly90b29scy5pZXRmLm9yZy9odG1sL3JmYzY1NzAjc2VjdGlvbi0yLjJcblxuXHRleHByZXNzaW9uICAgID0gIFwie1wiIFsgb3BlcmF0b3IgXSB2YXJpYWJsZS1saXN0IFwifVwiXG5cdG9wZXJhdG9yICAgICAgPSAgb3AtbGV2ZWwyIC8gb3AtbGV2ZWwzIC8gb3AtcmVzZXJ2ZVxuXHRvcC1sZXZlbDIgICAgID0gIFwiK1wiIC8gXCIjXCJcblx0b3AtbGV2ZWwzICAgICA9ICBcIi5cIiAvIFwiL1wiIC8gXCI7XCIgLyBcIj9cIiAvIFwiJlwiXG5cdG9wLXJlc2VydmUgICAgPSAgXCI9XCIgLyBcIixcIiAvIFwiIVwiIC8gXCJAXCIgLyBcInxcIlxuXHQqL1xuICAgIHZhciByZVRlbXBsYXRlID0gL1xceyhbXFwrI1xcLlxcLztcXD8mPVxcLCFAXFx8XT8pKFtBLVphLXowLTlfXFwsXFwuXFw6XFwqXSs/KVxcfS9nO1xuICAgIHZhciByZVZhcmlhYmxlID0gL14oW1xcJF9hLXpdW1xcJF9hLXowLTldKikoKD86XFw6WzEtOV1bMC05XT9bMC05XT9bMC05XT8pPykoXFwqPykkL2k7XG4gICAgdmFyIG1hdGNoO1xuICAgIHZhciBwaWVjZXMgPSBbXTtcbiAgICB2YXIgZ2x1ZXMgPSBbXTtcbiAgICB2YXIgb2Zmc2V0ID0gMDtcbiAgICB2YXIgcGllY2VDb3VudCA9IDA7XG5cbiAgICB3aGlsZSAoICEhIChtYXRjaCA9IHJlVGVtcGxhdGUuZXhlYyh0ZW1wbGF0ZSkpKSB7XG4gICAgICAgIGdsdWVzLnB1c2godGVtcGxhdGUuc3Vic3RyaW5nKG9mZnNldCwgbWF0Y2guaW5kZXgpKTtcbiAgICAgICAgLypcblx0XHRUaGUgb3BlcmF0b3IgY2hhcmFjdGVycyBlcXVhbHMgKFwiPVwiKSwgY29tbWEgKFwiLFwiKSwgZXhjbGFtYXRpb24gKFwiIVwiKSxcblx0XHRhdCBzaWduIChcIkBcIiksIGFuZCBwaXBlIChcInxcIikgYXJlIHJlc2VydmVkIGZvciBmdXR1cmUgZXh0ZW5zaW9ucy5cblx0XHQqL1xuICAgICAgICBpZiAobWF0Y2hbMV0gJiYgfic9LCFAfCcuaW5kZXhPZihtYXRjaFsxXSkpIHtcbiAgICAgICAgICAgIHRocm93IFwib3BlcmF0b3IgJ1wiICsgbWF0Y2hbMV0gKyBcIicgaXMgcmVzZXJ2ZWQgZm9yIGZ1dHVyZSBleHRlbnNpb25zXCI7XG4gICAgICAgIH1cblxuICAgICAgICBvZmZzZXQgPSBtYXRjaC5pbmRleDtcbiAgICAgICAgcGllY2VzLnB1c2goe1xuICAgICAgICAgICAgb3BlcmF0b3I6IG1hdGNoWzFdLFxuICAgICAgICAgICAgdmFyaWFibGVzOiBtYXRjaFsyXS5zcGxpdCgnLCcpLm1hcCh2YXJpYWJsZU1hcHBlcilcbiAgICAgICAgfSk7XG4gICAgICAgIG9mZnNldCArPSBtYXRjaFswXS5sZW5ndGg7XG4gICAgICAgIHBpZWNlQ291bnQrKztcbiAgICB9XG5cbiAgICBmdW5jdGlvbiB2YXJpYWJsZU1hcHBlcih2YXJpYWJsZSkge1xuICAgICAgICB2YXIgbWF0Y2ggPSByZVZhcmlhYmxlLmV4ZWModmFyaWFibGUpO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgbmFtZTogbWF0Y2hbMV0sXG4gICAgICAgICAgICBtYXhMZW5ndGg6IG1hdGNoWzJdICYmIHBhcnNlSW50KG1hdGNoWzJdLnN1YnN0cmluZygxKSwgMTApLFxuICAgICAgICAgICAgY29tcG9zaXRlOiAhISBtYXRjaFszXVxuICAgICAgICB9O1xuICAgIH1cblxuICAgIGdsdWVzLnB1c2godGVtcGxhdGUuc3Vic3RyaW5nKG9mZnNldCkpO1xuXG4gICAgdGhpcy5wYXJzZSA9IGZ1bmN0aW9uIChzdHIpIHtcbiAgICAgICAgdmFyIGRhdGEgPSB7fTtcbiAgICAgICAgdmFyIG9mZnNldCA9IDA7XG4gICAgICAgIHZhciBvZmZzZXRzID0gW107XG5cbiAgICAgICAgaWYgKCFnbHVlcy5ldmVyeShmdW5jdGlvbiAoZ2x1ZSwgZ2x1ZUluZGV4KSB7XG4gICAgICAgICAgICB2YXIgaW5kZXg7XG4gICAgICAgICAgICBpZiAoZ2x1ZUluZGV4ID4gMCAmJiBnbHVlID09PSAnJykgaW5kZXggPSBzdHIubGVuZ3RoO1xuICAgICAgICAgICAgZWxzZSBpbmRleCA9IHN0ci5pbmRleE9mKGdsdWUsIG9mZnNldCk7XG5cbiAgICAgICAgICAgIG9mZnNldCA9IGluZGV4O1xuICAgICAgICAgICAgb2Zmc2V0cy5wdXNoKG9mZnNldCk7XG4gICAgICAgICAgICBvZmZzZXQgKz0gZ2x1ZS5sZW5ndGg7XG5cbiAgICAgICAgICAgIHJldHVybn4gaW5kZXg7XG4gICAgICAgIH0pKSByZXR1cm4gZmFsc2U7XG5cbiAgICAgICAgaWYgKCFwaWVjZXMuZXZlcnkoZnVuY3Rpb24gKHBpZWNlLCBwaWVjZUluZGV4KSB7XG4gICAgICAgICAgICB2YXIgb3B0aW9ucyA9IG9wZXJhdG9yT3B0aW9uc1twaWVjZS5vcGVyYXRvcl07XG4gICAgICAgICAgICB2YXIgdmFsdWUsIHZhbHVlcztcbiAgICAgICAgICAgIHZhciBvZmZzZXRCZWdpbiA9IG9mZnNldHNbcGllY2VJbmRleF0gKyBnbHVlc1twaWVjZUluZGV4XS5sZW5ndGg7XG4gICAgICAgICAgICB2YXIgb2Zmc2V0RW5kID0gb2Zmc2V0c1twaWVjZUluZGV4ICsgMV07XG5cbiAgICAgICAgICAgIHZhbHVlID0gc3RyLnN1YnN0cmluZyhvZmZzZXRCZWdpbiwgb2Zmc2V0RW5kKTtcbiAgICAgICAgICAgIGlmICh2YWx1ZS5sZW5ndGggPT09IDApIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgaWYgKHZhbHVlLnN1YnN0cmluZygwLCBvcHRpb25zLnByZWZpeC5sZW5ndGgpICE9PSBvcHRpb25zLnByZWZpeCkgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgdmFsdWUgPSB2YWx1ZS5zdWJzdHJpbmcob3B0aW9ucy5wcmVmaXgubGVuZ3RoKTtcbiAgICAgICAgICAgIHZhbHVlcyA9IHZhbHVlLnNwbGl0KG9wdGlvbnMuc2VwZXJhdG9yKTtcblxuICAgICAgICAgICAgaWYgKCFwaWVjZS52YXJpYWJsZXMuZXZlcnkoZnVuY3Rpb24gKHZhcmlhYmxlLCB2YXJpYWJsZUluZGV4KSB7XG4gICAgICAgICAgICAgICAgdmFyIHZhbHVlID0gdmFsdWVzW3ZhcmlhYmxlSW5kZXhdO1xuICAgICAgICAgICAgICAgIHZhciBuYW1lO1xuXG4gICAgICAgICAgICAgICAgaWYgKHZhbHVlID09PSB1bmRlZmluZWQpIHJldHVybiB0cnVlO1xuXG4gICAgICAgICAgICAgICAgbmFtZSA9IHZhcmlhYmxlLm5hbWU7XG5cbiAgICAgICAgICAgICAgICBpZiAob3B0aW9ucy5hc3NpZ25tZW50KSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh2YWx1ZS5zdWJzdHJpbmcoMCwgbmFtZS5sZW5ndGgpICE9PSBuYW1lKSByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlID0gdmFsdWUuc3Vic3RyaW5nKG5hbWUubGVuZ3RoKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHZhbHVlLmxlbmd0aCA9PT0gMCAmJiBvcHRpb25zLmFzc2lnbkVtcHR5KSByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIGlmICh2YWx1ZS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodmFsdWVbMF0gIT09ICc9JykgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWUgPSB2YWx1ZS5zdWJzdHJpbmcoMSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdmFsdWUgPSBkZWNvZGVVUklDb21wb25lbnQodmFsdWUpO1xuICAgICAgICAgICAgICAgIGRhdGFbbmFtZV0gPSB2YWx1ZTtcblxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfSkpIHJldHVybiBmYWxzZTtcblxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG5cbiAgICAgICAgfSkpIHJldHVybiBmYWxzZTtcblxuICAgICAgICByZXR1cm4gZGF0YTtcbiAgICB9OyAvL3BhcnNlXG5cbiAgICB0aGlzLnN0cmluZ2lmeSA9IGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgIHZhciBzdHIgPSAnJztcbiAgICAgICAgZGF0YSA9IGRhdGEgfHwge307XG5cbiAgICAgICAgc3RyICs9IGdsdWVzWzBdO1xuICAgICAgICBpZiAoIXBpZWNlcy5ldmVyeShmdW5jdGlvbiAocGllY2UsIHBpZWNlSW5kZXgpIHtcblxuICAgICAgICAgICAgdmFyIG9wdGlvbnMgPSBvcGVyYXRvck9wdGlvbnNbcGllY2Uub3BlcmF0b3JdO1xuICAgICAgICAgICAgdmFyIHBhcnRzO1xuXG4gICAgICAgICAgICBwYXJ0cyA9IHBpZWNlLnZhcmlhYmxlcy5tYXAoZnVuY3Rpb24gKHZhcmlhYmxlKSB7XG4gICAgICAgICAgICAgICAgdmFyIHZhbHVlID0gZGF0YVt2YXJpYWJsZS5uYW1lXTtcblxuICAgICAgICAgICAgICAgIGlmICghQXJyYXkuaXNBcnJheSh2YWx1ZSkpIHZhbHVlID0gW3ZhbHVlXTtcblxuICAgICAgICAgICAgICAgIHZhbHVlID0gdmFsdWUuZmlsdGVyKGlzRGVmaW5lZCk7XG5cbiAgICAgICAgICAgICAgICBpZiAoaXNVbmRlZmluZWQodmFsdWUpKSByZXR1cm4gbnVsbDtcblxuICAgICAgICAgICAgICAgIGlmICh2YXJpYWJsZS5jb21wb3NpdGUpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFsdWUgPSB2YWx1ZS5tYXAoZnVuY3Rpb24gKHZhbHVlKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZSA9IE9iamVjdC5rZXlzKHZhbHVlKS5tYXAoZnVuY3Rpb24gKGtleSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIga2V5VmFsdWUgPSB2YWx1ZVtrZXldO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodmFyaWFibGUubWF4TGVuZ3RoKSBrZXlWYWx1ZSA9IGtleVZhbHVlLnN1YnN0cmluZygwLCB2YXJpYWJsZS5tYXhMZW5ndGgpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGtleVZhbHVlID0gb3B0aW9ucy5lbmNvZGUoa2V5VmFsdWUpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChrZXlWYWx1ZSkga2V5VmFsdWUgPSBrZXkgKyAnPScgKyBrZXlWYWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBrZXlWYWx1ZSA9IGtleTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChvcHRpb25zLmFzc2lnbkVtcHR5KSBrZXlWYWx1ZSArPSAnPSc7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4ga2V5VmFsdWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSkuam9pbihvcHRpb25zLnNlcGVyYXRvcik7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHZhcmlhYmxlLm1heExlbmd0aCkgdmFsdWUgPSB2YWx1ZS5zdWJzdHJpbmcoMCwgdmFyaWFibGUubWF4TGVuZ3RoKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlID0gb3B0aW9ucy5lbmNvZGUodmFsdWUpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG9wdGlvbnMuYXNzaWdubWVudCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodmFsdWUpIHZhbHVlID0gdmFyaWFibGUubmFtZSArICc9JyArIHZhbHVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlID0gdmFyaWFibGUubmFtZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChvcHRpb25zLmFzc2lnbkVtcHR5KSB2YWx1ZSArPSAnPSc7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgdmFsdWUgPSB2YWx1ZS5qb2luKG9wdGlvbnMuc2VwZXJhdG9yKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB2YWx1ZSA9IHZhbHVlLm1hcChmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIE9iamVjdC5rZXlzKHZhbHVlKS5tYXAoZnVuY3Rpb24gKGtleSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIga2V5VmFsdWUgPSB2YWx1ZVtrZXldO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodmFyaWFibGUubWF4TGVuZ3RoKSBrZXlWYWx1ZSA9IGtleVZhbHVlLnN1YnN0cmluZygwLCB2YXJpYWJsZS5tYXhMZW5ndGgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4ga2V5ICsgJywnICsgb3B0aW9ucy5lbmNvZGUoa2V5VmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pLmpvaW4oJywnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHZhcmlhYmxlLm1heExlbmd0aCkgdmFsdWUgPSB2YWx1ZS5zdWJzdHJpbmcoMCwgdmFyaWFibGUubWF4TGVuZ3RoKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBvcHRpb25zLmVuY29kZSh2YWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlID0gdmFsdWUuam9pbignLCcpO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmIChvcHRpb25zLmFzc2lnbm1lbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh2YWx1ZSkgdmFsdWUgPSB2YXJpYWJsZS5uYW1lICsgJz0nICsgdmFsdWU7XG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZSA9IHZhcmlhYmxlLm5hbWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG9wdGlvbnMuYXNzaWduRW1wdHkpIHZhbHVlICs9ICc9JztcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHBhcnRzID0gcGFydHMuZmlsdGVyKGlzRGVmaW5lZCk7XG4gICAgICAgICAgICBpZiAoaXNEZWZpbmVkKHBhcnRzKSkge1xuICAgICAgICAgICAgICAgIHN0ciArPSBvcHRpb25zLnByZWZpeDtcbiAgICAgICAgICAgICAgICBzdHIgKz0gcGFydHMuam9pbihvcHRpb25zLnNlcGVyYXRvcik7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHN0ciArPSBnbHVlc1twaWVjZUluZGV4ICsgMV07XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfSkpIHJldHVybiBmYWxzZTtcblxuICAgICAgICByZXR1cm4gc3RyO1xuICAgIH07IC8vc3RyaW5naWZ5XG5cbn0gLy9VcmlUZW1wbGF0ZSIsIi8qIGpzaGludCBub2RlOnRydWUgKi9cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgUm91dGVyOiByZXF1aXJlKCcuL1JvdXRlcicpLFxuICAgIFVyaVRlbXBsYXRlOiByZXF1aXJlKCcuL1VyaVRlbXBsYXRlJylcbn07IiwiJ3VzZSBzdHJpY3QnO1xuXG4vKipcbiAqIEBkZXByZWNhdGVkIFRoZSBoYWxDbGllbnQgc2VydmljZSBpcyBkZXByZWNhdGVkLiBQbGVhc2UgdXNlICRodHRwIGRpcmVjdGx5IGluc3RlYWQuXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEhhbENsaWVudCB7XG4gIC8qKlxuICAgKiBAcGFyYW0ge0xvZ30gICAgICAkbG9nXG4gICAqIEBwYXJhbSB7SHR0cH0gICAgICRodHRwXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IExpbmtIZWFkZXJcbiAgICogQHBhcmFtIHtPYmplY3R9ICAgJGhhbENvbmZpZ3VyYXRpb25cbiAgICovXG4gIGNvbnN0cnVjdG9yKCRsb2csICRodHRwLCBMaW5rSGVhZGVyLCAkaGFsQ29uZmlndXJhdGlvbikge1xuICAgIHRoaXMuXyRsb2cgPSAkbG9nO1xuICAgIHRoaXMuXyRodHRwID0gJGh0dHA7XG4gICAgdGhpcy5fJGhhbENvbmZpZ3VyYXRpb24gPSAkaGFsQ29uZmlndXJhdGlvbjtcbiAgICB0aGlzLkxpbmtIZWFkZXIgPSBMaW5rSGVhZGVyO1xuICB9XG4gICRnZXQoaHJlZiwgb3B0aW9ucykge1xuICAgIHJldHVybiB0aGlzLiRyZXF1ZXN0KCdHRVQnLCBocmVmLCBvcHRpb25zKTtcbiAgfVxuICAkcG9zdChocmVmLCBvcHRpb25zLCBkYXRhKSB7XG4gICAgcmV0dXJuIHRoaXMuJHJlcXVlc3QoJ1BPU1QnLCBocmVmLCBvcHRpb25zLCBkYXRhKTtcbiAgfVxuICAkcHV0KGhyZWYsIG9wdGlvbnMsIGRhdGEpIHtcbiAgICByZXR1cm4gdGhpcy4kcmVxdWVzdCgnUFVUJywgaHJlZiwgb3B0aW9ucywgZGF0YSk7XG4gIH1cbiAgJHBhdGNoKGhyZWYsIG9wdGlvbnMsIGRhdGEpIHtcbiAgICByZXR1cm4gdGhpcy4kcmVxdWVzdCgnUEFUQ0gnLCBocmVmLCBvcHRpb25zLCBkYXRhKTtcbiAgfVxuICAkZGVsZXRlKGhyZWYsIG9wdGlvbnMpIHtcbiAgICByZXR1cm4gdGhpcy4kcmVxdWVzdCgnREVMRVRFJywgaHJlZiwgb3B0aW9ucyk7XG4gIH1cbiAgJGxpbmsoaHJlZiwgb3B0aW9ucywgbGlua0hlYWRlcnMpIHtcbiAgICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgICBvcHRpb25zLmhlYWRlcnMgPSBvcHRpb25zLmhlYWRlcnMgfHwge307XG4gICAgb3B0aW9ucy5oZWFkZXJzLkxpbmsgPSBsaW5rSGVhZGVycy5tYXAoZnVuY3Rpb24obGluaykgeyByZXR1cm4gbGluay50b1N0cmluZygpOyB9KTtcbiAgICByZXR1cm4gdGhpcy4kcmVxdWVzdCgnTElOSycsIGhyZWYsIG9wdGlvbnMpO1xuICB9XG4gICR1bmxpbmsoaHJlZiwgb3B0aW9ucywgbGlua0hlYWRlcnMpIHtcbiAgICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgICBvcHRpb25zLmhlYWRlcnMgPSBvcHRpb25zLmhlYWRlcnMgfHwge307XG4gICAgb3B0aW9ucy5oZWFkZXJzLkxpbmsgPSBsaW5rSGVhZGVycy5tYXAoZnVuY3Rpb24obGluaykgeyByZXR1cm4gbGluay50b1N0cmluZygpOyB9KTtcbiAgICByZXR1cm4gdGhpcy4kcmVxdWVzdCgnVU5MSU5LJywgaHJlZiwgb3B0aW9ucyk7XG4gIH1cbiAgJHJlcXVlc3QobWV0aG9kLCBocmVmLCBvcHRpb25zLCBkYXRhKSB7XG4gICAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gICAgdGhpcy5fJGxvZy5sb2coJ1RoZSBoYWxDbGllbnQgc2VydmljZSBpcyBkZXByZWNhdGVkLiBQbGVhc2UgdXNlICRodHRwIGRpcmVjdGx5IGluc3RlYWQuJyk7XG4gICAgcmV0dXJuIHRoaXMuXyRodHRwKGFuZ3VsYXIuZXh0ZW5kKHt9LCBvcHRpb25zLCB7XG4gICAgICBtZXRob2Q6IG1ldGhvZCxcbiAgICAgIHVybDogdGhpcy5fJGhhbENvbmZpZ3VyYXRpb24udXJsVHJhbnNmb3JtZXIoaHJlZiksXG4gICAgICBkYXRhOiBkYXRhLFxuICAgIH0pKTtcbiAgfVxufVxuXG4vLyBJbmplY3QgRGVwZW5kZW5jaWVzXG5IYWxDbGllbnQuJGluamVjdCA9IFtcbiAgJyRsb2cnLFxuICAnJGh0dHAnLFxuICAnTGlua0hlYWRlcicsXG4gICckaGFsQ29uZmlndXJhdGlvbicsXG5dO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCBNT0RVTEVfTkFNRSA9ICdhbmd1bGFyLWhhbC5jbGllbnQnO1xuXG5pbXBvcnQgSGFsQ2xpZW50IGZyb20gJy4vaGFsLWNsaWVudCc7XG5pbXBvcnQgTGlua0hlYWRlciBmcm9tICcuL2xpbmstaGVhZGVyJztcblxuLy8gQWRkIG1vZHVsZSBmb3IgY2xpZW50XG5hbmd1bGFyXG4gIC5tb2R1bGUoTU9EVUxFX05BTUUsIFtdKVxuXG4gIC5zZXJ2aWNlKCdoYWxDbGllbnQnLCBIYWxDbGllbnQpXG4gIC5zZXJ2aWNlKCckaGFsQ2xpZW50JywgSGFsQ2xpZW50KVxuXG4gIC52YWx1ZSgnTGlua0hlYWRlcicsIExpbmtIZWFkZXIpXG47XG5cbmV4cG9ydCBkZWZhdWx0IE1PRFVMRV9OQU1FO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG4vKipcbiAqIExpbmsgSGVhZGVyXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIExpbmtIZWFkZXIge1xuICAvKipcbiAgICogQHBhcmFtIHtTdHJpbmd9IHVyaVJlZmVyZW5jZSBUaGUgTGluayBWYWx1ZVxuICAgKiBAcGFyYW0ge09iamVjdH0gbGlua1BhcmFtcyAgIFRoZSBMaW5rIFBhcmFtc1xuICAgKi9cbiAgY29uc3RydWN0b3IodXJpUmVmZXJlbmNlLCBsaW5rUGFyYW1zKSB7XG4gICAgdGhpcy51cmlSZWZlcmVuY2UgPSB1cmlSZWZlcmVuY2U7XG4gICAgdGhpcy5saW5rUGFyYW1zID0gYW5ndWxhci5leHRlbmQoXG4gICAgICB7XG4gICAgICAgIHJlbDogbnVsbCxcbiAgICAgICAgYW5jaG9yOiBudWxsLFxuICAgICAgICByZXY6IG51bGwsXG4gICAgICAgIGhyZWZsYW5nOiBudWxsLFxuICAgICAgICBtZWRpYTogbnVsbCxcbiAgICAgICAgdGl0bGU6IG51bGwsXG4gICAgICAgIHR5cGU6IG51bGwsXG4gICAgICB9LFxuICAgICAgbGlua1BhcmFtc1xuICAgICk7XG4gIH1cbiAgLyoqXG4gICAqIEByZXR1cm4ge1N0cmluZ31cbiAgICovXG4gIHRvU3RyaW5nKCkge1xuICAgIHZhciByZXN1bHQgPSAnPCcgKyB0aGlzLnVyaVJlZmVyZW5jZSArICc+J1xuICAgICAgLCBwYXJhbXMgPSBbXTtcblxuICAgIGZvcihsZXQgcGFyYW1OYW1lIGluIHRoaXMubGlua1BhcmFtcykge1xuICAgICAgbGV0IHBhcmFtVmFsdWUgPSB0aGlzLmxpbmtQYXJhbXNbcGFyYW1OYW1lXTtcbiAgICAgIGlmKHBhcmFtVmFsdWUpIHtcbiAgICAgICAgcGFyYW1zLnB1c2gocGFyYW1OYW1lICsgJz1cIicgKyBwYXJhbVZhbHVlICsgJ1wiJyk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYocGFyYW1zLmxlbmd0aCA8IDEpIHtcbiAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuXG4gICAgcmVzdWx0ID0gcmVzdWx0ICsgJzsnICsgcGFyYW1zLmpvaW4oJzsnKTtcblxuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cbn1cbiIsIid1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiBAcGFyYW0ge1N0cmluZ31cbiAqIEByZXR1cm4ge1N0cmluZ31cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIG5vb3BVcmxUcmFuc2Zvcm1lcih1cmwpIHtcbiAgcmV0dXJuIHVybDtcbn1cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSGFsQ29uZmlndXJhdGlvblByb3ZpZGVyIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5fbGlua3NBdHRyaWJ1dGUgPSAnX2xpbmtzJztcbiAgICB0aGlzLl9lbWJlZGRlZEF0dHJpYnV0ZSA9ICdfZW1iZWRkZWQnO1xuICAgIHRoaXMuX2lnbm9yZUF0dHJpYnV0ZVByZWZpeGVzID0gW1xuICAgICAgJ18nLFxuICAgICAgJyQnLFxuICAgIF07XG4gICAgdGhpcy5fc2VsZkxpbmsgPSAnc2VsZic7XG4gICAgdGhpcy5fZm9yY2VKU09OUmVzb3VyY2UgPSBmYWxzZTtcbiAgICB0aGlzLl91cmxUcmFuc2Zvcm1lciA9IG5vb3BVcmxUcmFuc2Zvcm1lcjtcblxuICAgIHRoaXMuJGdldC4kaW5qZWN0ID0gW1xuICAgICAgJyRsb2cnLFxuICAgIF07XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHtTdHJpbmd9IGxpbmtzQXR0cmlidXRlXG4gICAqL1xuICBzZXRMaW5rc0F0dHJpYnV0ZShsaW5rc0F0dHJpYnV0ZSkge1xuICAgIHRoaXMuX2xpbmtzQXR0cmlidXRlID0gbGlua3NBdHRyaWJ1dGU7XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHtTdHJpbmd9IGVtYmVkZGVkQXR0cmlidXRlXG4gICAqL1xuICBzZXRFbWJlZGRlZEF0dHJpYnV0ZShlbWJlZGRlZEF0dHJpYnV0ZSkge1xuICAgIHRoaXMuX2VtYmVkZGVkQXR0cmlidXRlID0gZW1iZWRkZWRBdHRyaWJ1dGU7XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHtTdHJpbmdbXX0gaWdub3JlQXR0cmlidXRlUHJlZml4ZXNcbiAgICovXG4gIHNldElnbm9yZUF0dHJpYnV0ZVByZWZpeGVzKGlnbm9yZUF0dHJpYnV0ZVByZWZpeGVzKSB7XG4gICAgdGhpcy5faWdub3JlQXR0cmlidXRlUHJlZml4ZXMgPSBpZ25vcmVBdHRyaWJ1dGVQcmVmaXhlcztcbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge1N0cmluZ30gaWdub3JlQXR0cmlidXRlUHJlZml4XG4gICAqL1xuICBhZGRJZ25vcmVBdHRyaWJ1dGVQcmVmaXgoaWdub3JlQXR0cmlidXRlUHJlZml4KSB7XG4gICAgdGhpcy5faWdub3JlQXR0cmlidXRlUHJlZml4ZXMucHVzaChpZ25vcmVBdHRyaWJ1dGVQcmVmaXgpO1xuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBzZWxmTGlua1xuICAgKi9cbiAgc2V0U2VsZkxpbmsoc2VsZkxpbmspIHtcbiAgICB0aGlzLl9zZWxmTGluayA9IHNlbGZMaW5rO1xuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7Qm9vbGVhbn0gZm9yY2VKU09OUmVzb3VyY2VcbiAgICovXG4gIHNldEZvcmNlSlNPTlJlc291cmNlKGZvcmNlSlNPTlJlc291cmNlKSB7XG4gICAgdGhpcy5fZm9yY2VKU09OUmVzb3VyY2UgPSBmb3JjZUpTT05SZXNvdXJjZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSB1cmxUcmFuc2Zvcm1lclxuICAgKiBAZGVwcmVjYXRlZCAkaGFsQ29uZmlndXJhdGlvblByb3ZpZGVyLnNldFVybFRyYW5zZm9ybWVyIGlzIGRlcHJlY2F0ZWQuIFBsZWFzZSB3cml0ZSBhIGh0dHAgaW50ZXJjZXB0b3IgaW5zdGVhZC5cbiAgICogQHNlZSBodHRwczovL2RvY3MuYW5ndWxhcmpzLm9yZy9hcGkvbmcvc2VydmljZS8kaHR0cCNpbnRlcmNlcHRvcnNcbiAgICovXG4gIHNldFVybFRyYW5zZm9ybWVyKHVybFRyYW5zZm9ybWVyKSB7XG4gICAgdGhpcy5fdXJsVHJhbnNmb3JtZXIgPSB1cmxUcmFuc2Zvcm1lcjtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgQ29uZmlndXJhdGlvblxuICAgKiBAcGFyYW0gIHtMb2d9ICRsb2cgbG9nZ2VyXG4gICAqIEByZXR1cm4ge09iamVjdH1cbiAgICovXG4gICRnZXQoJGxvZykge1xuICAgIGlmKHRoaXMuX3VybFRyYW5zZm9ybWVyICE9PSBub29wVXJsVHJhbnNmb3JtZXIpIHtcbiAgICAgICRsb2cubG9nKCckaGFsQ29uZmlndXJhdGlvblByb3ZpZGVyLnNldFVybFRyYW5zZm9ybWVyIGlzIGRlcHJlY2F0ZWQuIFBsZWFzZSB3cml0ZSBhIGh0dHAgaW50ZXJjZXB0b3IgaW5zdGVhZC4nKTtcbiAgICB9XG5cbiAgICByZXR1cm4gT2JqZWN0LmZyZWV6ZSh7XG4gICAgICBsaW5rc0F0dHJpYnV0ZTogdGhpcy5fbGlua3NBdHRyaWJ1dGUsXG4gICAgICBlbWJlZGRlZEF0dHJpYnV0ZTogdGhpcy5fZW1iZWRkZWRBdHRyaWJ1dGUsXG4gICAgICBpZ25vcmVBdHRyaWJ1dGVQcmVmaXhlczogdGhpcy5faWdub3JlQXR0cmlidXRlUHJlZml4ZXMsXG4gICAgICBzZWxmTGluazogdGhpcy5fc2VsZkxpbmssXG4gICAgICBmb3JjZUpTT05SZXNvdXJjZTogdGhpcy5fZm9yY2VKU09OUmVzb3VyY2UsXG4gICAgICB1cmxUcmFuc2Zvcm1lcjogdGhpcy5fdXJsVHJhbnNmb3JtZXIsXG4gICAgfSk7XG4gIH1cbn1cbiIsIid1c2Ugc3RyaWN0JztcblxuY29uc3QgTU9EVUxFX05BTUUgPSAnYW5ndWxhci1oYWwuY29uZmlndXJhdGlvbic7XG5cblxuXG5pbXBvcnQgSGFsQ29uZmlndXJhdGlvblByb3ZpZGVyIGZyb20gJy4vaGFsLWNvbmZpZ3VyYXRpb24ucHJvdmlkZXInO1xuXG4vLyBBZGQgbW9kdWxlIGZvciBjb25maWd1cmF0aW9uXG5hbmd1bGFyXG4gIC5tb2R1bGUoTU9EVUxFX05BTUUsIFtdKVxuXG4gIC5wcm92aWRlcignJGhhbENvbmZpZ3VyYXRpb24nLCBIYWxDb25maWd1cmF0aW9uUHJvdmlkZXIpXG47XG5cbmV4cG9ydCBkZWZhdWx0IE1PRFVMRV9OQU1FO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG4vKipcbiAqIEBwYXJhbSB7SHR0cFByb3ZpZGVyfSAkaHR0cFByb3ZpZGVyXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIEh0dHBJbnRlcmNlcHRvckNvbmZpZ3VyYXRpb24oJGh0dHBQcm92aWRlcikge1xuICAkaHR0cFByb3ZpZGVyLmludGVyY2VwdG9ycy5wdXNoKCdSZXNvdXJjZUh0dHBJbnRlcmNlcHRvcicpO1xufVxuXG5IdHRwSW50ZXJjZXB0b3JDb25maWd1cmF0aW9uLiRpbmplY3QgPSBbXG4gICckaHR0cFByb3ZpZGVyJyxcbl07XG4iLCIndXNlIHN0cmljdCc7XG5cbmNvbnN0IE1PRFVMRV9OQU1FID0gJ2FuZ3VsYXItaGFsLmh0dHAtaW50ZXJjZXB0aW9uJztcblxuXG5pbXBvcnQgcmVzb3VyY2UgZnJvbSAnLi4vcmVzb3VyY2UnO1xuaW1wb3J0IGNvbmZpZ3VyYXRpb24gZnJvbSAnLi4vY29uZmlndXJhdGlvbic7XG5cbmltcG9ydCBSZXNvdXJjZUh0dHBJbnRlcmNlcHRvciBmcm9tICcuL3Jlc291cmNlLWh0dHAtaW50ZXJjZXB0b3IuZmFjdG9yeSc7XG5pbXBvcnQgSHR0cEludGVyY2VwdG9yQ29uZmlndXJhdGlvbiBmcm9tICcuL2h0dHAtaW50ZXJjZXB0aW9uLmNvbmZpZyc7XG5cbi8vIEFkZCBtb2R1bGUgZm9yIGh0dHAgaW50ZXJjZXB0aW9uXG5hbmd1bGFyXG4gIC5tb2R1bGUoTU9EVUxFX05BTUUsIFtcbiAgICByZXNvdXJjZSxcbiAgICBjb25maWd1cmF0aW9uLFxuICBdKVxuXG4gIC5jb25maWcoSHR0cEludGVyY2VwdG9yQ29uZmlndXJhdGlvbilcblxuICAuZmFjdG9yeSgnUmVzb3VyY2VIdHRwSW50ZXJjZXB0b3InLCBSZXNvdXJjZUh0dHBJbnRlcmNlcHRvcilcbjtcblxuZXhwb3J0IGRlZmF1bHQgTU9EVUxFX05BTUU7XG4iLCIndXNlIHN0cmljdCc7XG5cbmNvbnN0IENPTlRFTlRfVFlQRSA9ICdhcHBsaWNhdGlvbi9oYWwranNvbic7XG5cbmltcG9ydCB7IHBhcnNlIH0gZnJvbSAnY29udGVudC10eXBlJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gUmVzb3VyY2VIdHRwSW50ZXJjZXB0b3JGYWN0b3J5KCRoYWxDb25maWd1cmF0aW9uLCBSZXNvdXJjZSkge1xuICByZXR1cm4ge1xuICAgIHJlcXVlc3Q6IHRyYW5zZm9ybVJlcXVlc3QsXG4gICAgcmVzcG9uc2U6IHRyYW5zZm9ybVJlc3BvbnNlLFxuICB9O1xuXG4gIC8qKlxuICAgKiBBZGQgSGFsIEpzb24gQXMgYW4gYWNjZXB0ZWQgZm9ybWF0XG4gICAqIEBwYXJhbSB7UmVxdWVzdH0gcmVxdWVzdFxuICAgKiBAcmV0dXJuIHtSZXF1ZXN0fVxuICAgKi9cbiAgZnVuY3Rpb24gdHJhbnNmb3JtUmVxdWVzdChyZXF1ZXN0KSB7XG4gICAgaWYodHlwZW9mIHJlcXVlc3QuaGVhZGVycy5BY2NlcHQgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICByZXF1ZXN0LmhlYWRlcnMuQWNjZXB0ID0gQ09OVEVOVF9UWVBFO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXF1ZXN0LmhlYWRlcnMuQWNjZXB0ID0gW1xuICAgICAgICBDT05URU5UX1RZUEUsXG4gICAgICAgIHJlcXVlc3QuaGVhZGVycy5BY2NlcHRcbiAgICAgIF0uam9pbignLCAnKTtcbiAgICB9XG5cbiAgICByZXR1cm4gcmVxdWVzdDtcbiAgfVxuXG4gIC8qKlxuICAgKiBUcmFuc2Zvcm0gUmVzcG9uc2VcbiAgICpcbiAgICogQHBhcmFtIHtSZXNwb25zZX0gcmVzcG9uc2VcbiAgICogQHJldHVybiB7UmVzcG9uc2V8UmVzb3VyY2V9XG4gICAqL1xuICBmdW5jdGlvbiB0cmFuc2Zvcm1SZXNwb25zZShyZXNwb25zZSkge1xuICAgIHRyeSB7XG4gICAgICBpZihwYXJzZShyZXNwb25zZS5oZWFkZXJzKCdDb250ZW50LVR5cGUnKSkudHlwZSA9PT0gQ09OVEVOVF9UWVBFKSB7XG4gICAgICAgIHJldHVybiB0cmFuc2Zvcm1SZXNwb25zZVRvUmVzb3VyY2UocmVzcG9uc2UpO1xuICAgICAgfVxuICAgIH0gY2F0Y2goZSkge1xuICAgICAgLy8gVGhlIHBhcnNlIGZ1bmN0aW9uIGNvdWxkIHRocm93IGFuIGVycm9yLCB3ZSBkbyBub3Qgd2FudCB0aGF0LlxuICAgIH1cbiAgICBpZihyZXNwb25zZS5jb25maWcuZm9yY2VIYWwpIHtcbiAgICAgIHJldHVybiB0cmFuc2Zvcm1SZXNwb25zZVRvUmVzb3VyY2UocmVzcG9uc2UpO1xuICAgIH1cbiAgICBpZigoXG4gICAgICAgIHJlc3BvbnNlLmhlYWRlcnMoJ0NvbnRlbnQtVHlwZScpID09PSAnYXBwbGljYXRpb24vanNvbicgfHxcbiAgICAgICAgcmVzcG9uc2UuaGVhZGVycygnQ29udGVudC1UeXBlJykgPT09IG51bGxcbiAgICAgICkgJiZcbiAgICAgICRoYWxDb25maWd1cmF0aW9uLmZvcmNlSlNPTlJlc291cmNlKSB7XG4gICAgICByZXR1cm4gdHJhbnNmb3JtUmVzcG9uc2VUb1Jlc291cmNlKHJlc3BvbnNlKTtcbiAgICB9XG5cbiAgICByZXR1cm4gcmVzcG9uc2U7XG4gIH1cbiAgZnVuY3Rpb24gdHJhbnNmb3JtUmVzcG9uc2VUb1Jlc291cmNlKHJlc3BvbnNlKSB7XG4gICAgcmV0dXJuIG5ldyBSZXNvdXJjZShyZXNwb25zZS5kYXRhLCByZXNwb25zZSk7XG4gIH1cbn1cblxuUmVzb3VyY2VIdHRwSW50ZXJjZXB0b3JGYWN0b3J5LiRpbmplY3QgPSBbXG4gICckaGFsQ29uZmlndXJhdGlvbicsXG4gICdSZXNvdXJjZScsXG5dO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCBNT0RVTEVfTkFNRSA9ICdhbmd1bGFyLWhhbCc7XG5cbmltcG9ydCBodHRwSW50ZXJjZXB0aW9uIGZyb20gJy4vaHR0cC1pbnRlcmNlcHRpb24nO1xuaW1wb3J0IGNsaWVudCBmcm9tICcuL2NsaWVudCc7XG5cbi8vIENvbWJpbmUgbmVlZGVkIE1vZHVsZXNcbmFuZ3VsYXJcbiAgLm1vZHVsZShNT0RVTEVfTkFNRSwgW1xuICAgIGh0dHBJbnRlcmNlcHRpb24sXG4gICAgY2xpZW50LFxuICBdKVxuO1xuXG5leHBvcnQgZGVmYXVsdCBNT0RVTEVfTkFNRTtcbiIsIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IHJmYzY1NzAgZnJvbSAncmZjNjU3MC9zcmMvbWFpbic7XG5cbi8qKlxuICogR2VuZXJhdGUgdXJsIGZyb20gdGVtcGxhdGVcbiAqXG4gKiBAcGFyYW0gIHtTdHJpbmd9IHRlbXBsYXRlXG4gKiBAcGFyYW0gIHtPYmplY3R9IHBhcmFtZXRlcnNcbiAqIEByZXR1cm4ge1N0cmluZ31cbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZ2VuZXJhdGVVcmwodGVtcGxhdGUsIHBhcmFtZXRlcnMpIHtcbiAgcmV0dXJuIG5ldyByZmM2NTcwLlVyaVRlbXBsYXRlKHRlbXBsYXRlKS5zdHJpbmdpZnkocGFyYW1ldGVycyk7XG59XG4iLCIndXNlIHN0cmljdCc7XG5cbmltcG9ydCBleHRlbmRSZWFkT25seSBmcm9tICcuLi91dGlsaXR5L2V4dGVuZC1yZWFkLW9ubHknO1xuXG4vKipcbiAqIEZhY3RvcnkgZm9yIEhhbFJlc291cmNlQ2xpZW50XG4gKiBAcGFyYW0ge1F9ICAgICAgICAkcVxuICogQHBhcmFtIHtJbmplY3Rvcn0gJGluamVjdG9yIFByZXZlbnQgQ2lyY3VsYXIgRGVwZW5kZW5jeSBieSBpbmplY3RpbmcgJGluamVjdG9yIGluc3RlYWQgb2YgJGh0dHBcbiAqIEBwYXJhbSB7T2JqZWN0fSAgICRoYWxDb25maWd1cmF0aW9uXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIEhhbFJlc291cmNlQ2xpZW50RmFjdG9yeSgkcSwgJGluamVjdG9yLCAkaGFsQ29uZmlndXJhdGlvbikge1xuICByZXR1cm4gSGFsUmVzb3VyY2VDbGllbnQ7XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7UmVzb3VyY2V9IHJlc291cmNlXG4gICAqIEBwYXJhbSB7T2JqZWN0fSAgIGxpbmtzXG4gICAqIEBwYXJhbSB7T2JqZWN0fSAgIGVtYmVkZGVkXG4gICAqL1xuICBmdW5jdGlvbiBIYWxSZXNvdXJjZUNsaWVudChyZXNvdXJjZSwgZW1iZWRkZWQpIHtcbiAgICB2YXIgc2VsZiA9IHRoaXNcbiAgICAgICwgJGh0dHAgPSAkaW5qZWN0b3IuZ2V0KCckaHR0cCcpO1xuXG4gICAgLyoqXG4gICAgICogSW5pdGlhbGl6ZSB0aGUgY2xpZW50XG4gICAgICovXG4gICAgKGZ1bmN0aW9uIGluaXQoKSB7XG4gICAgICBleHRlbmRSZWFkT25seShzZWxmLCB7XG4gICAgICAgICRyZXF1ZXN0OiAkcmVxdWVzdCxcbiAgICAgICAgJGdldDogJGdldCxcbiAgICAgICAgJHBvc3Q6ICRwb3N0LFxuICAgICAgICAkcHV0OiAkcHV0LFxuICAgICAgICAkcGF0Y2g6ICRwYXRjaCxcbiAgICAgICAgJGRlbGV0ZTogJGRlbGV0ZSxcbiAgICAgICAgJGRlbDogJGRlbGV0ZSxcbiAgICAgICAgJGxpbms6ICRsaW5rLFxuICAgICAgICAkdW5saW5rOiAkdW5saW5rLFxuICAgICAgfSk7XG4gICAgfSkoKTtcblxuICAgIC8qKlxuICAgICAqIEV4ZWN1dGUgYSBIVFRQIHJlcXVlc3QgYWdhaW5zdCBhIGxpbmtcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSAgICAgIG1ldGhvZFxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSAgICAgIHJlbFxuICAgICAqIEBwYXJhbSB7T2JqZWN0fG51bGx9IHVybFBhcmFtc1xuICAgICAqIEBwYXJhbSB7bWl4ZWR8bnVsbH0gIGJvZHlcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gICAgICBvcHRpb25zXG4gICAgICogQHJldHVybiB7UHJvbWlzZX1cbiAgICAgKi9cbiAgICBmdW5jdGlvbiAkcmVxdWVzdChtZXRob2QsIHJlbCwgdXJsUGFyYW1zLCBib2R5LCBvcHRpb25zKSB7XG4gICAgICB2YXIgcHJvbWlzZXM7XG5cbiAgICAgIG1ldGhvZCA9IG1ldGhvZCB8fCAnR0VUJztcbiAgICAgIHJlbCA9IHJlbCB8fCAkaGFsQ29uZmlndXJhdGlvbi5zZWxmTGluaztcbiAgICAgIHVybFBhcmFtcyA9IHVybFBhcmFtcyB8fCB7fTtcbiAgICAgIGJvZHkgPSBib2R5IHx8IG51bGw7XG4gICAgICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcblxuICAgICAgaWYobWV0aG9kID09PSAnR0VUJyAmJlxuICAgICAgICAgIHJlbCA9PT0gJGhhbENvbmZpZ3VyYXRpb24uc2VsZkxpbmspIHtcbiAgICAgICAgcmV0dXJuICRxLnJlc29sdmUocmVzb3VyY2UpO1xuICAgICAgfVxuXG4gICAgICBpZihyZXNvdXJjZS4kaGFzRW1iZWRkZWQocmVsKSAmJlxuICAgICAgICBBcnJheS5pc0FycmF5KGVtYmVkZGVkW3JlbF0pKSB7XG4gICAgICAgIHByb21pc2VzID0gW107XG4gICAgICAgIGZvcih2YXIgaSA9IDA7IGkgPCBlbWJlZGRlZFtyZWxdLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgcHJvbWlzZXMucHVzaChlbWJlZGRlZFtyZWxdW2ldLiRyZXF1ZXN0KCkuJHJlcXVlc3QobWV0aG9kLCAnc2VsZicsIHVybFBhcmFtcywgYm9keSwgb3B0aW9ucykpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiAkcS5hbGwocHJvbWlzZXMpO1xuICAgICAgfVxuXG4gICAgICBpZihyZXNvdXJjZS4kaGFzRW1iZWRkZWQocmVsKSkge1xuICAgICAgICByZXR1cm4gZW1iZWRkZWRbcmVsXS4kcmVxdWVzdCgpLiRyZXF1ZXN0KG1ldGhvZCwgJ3NlbGYnLCB1cmxQYXJhbXMsIGJvZHksIG9wdGlvbnMpO1xuICAgICAgfVxuXG4gICAgICBpZihyZXNvdXJjZS4kaGFzTGluayhyZWwpKSB7XG4gICAgICAgIHZhciB1cmwgPSByZXNvdXJjZS4kaHJlZihyZWwsIHVybFBhcmFtcyk7XG5cbiAgICAgICAgYW5ndWxhci5leHRlbmQob3B0aW9ucywge1xuICAgICAgICAgIG1ldGhvZDogbWV0aG9kLFxuICAgICAgICAgIGRhdGE6IGJvZHksXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmKEFycmF5LmlzQXJyYXkodXJsKSkge1xuICAgICAgICAgIHByb21pc2VzID0gW107XG4gICAgICAgICAgZm9yKHZhciBqID0gMDsgaiA8IHVybC5sZW5ndGg7IGorKykge1xuICAgICAgICAgICAgcHJvbWlzZXMucHVzaCgkaHR0cChhbmd1bGFyLmV4dGVuZCh7fSwgb3B0aW9ucywge3VybDogdXJsW2pdfSkpKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuICRxLmFsbChwcm9taXNlcyk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gJGh0dHAoYW5ndWxhci5leHRlbmQoe30sIG9wdGlvbnMsIHtcbiAgICAgICAgICB1cmw6IHJlc291cmNlLiRocmVmKHJlbCwgdXJsUGFyYW1zKSxcbiAgICAgICAgfSkpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gJHEucmVqZWN0KG5ldyBFcnJvcignbGluayBcIicgKyByZWwgKyAnXCIgaXMgdW5kZWZpbmVkJykpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEV4ZWN1dGUgYSBIVFRQIEdFVCByZXF1ZXN0IGFnYWluc3QgYSBsaW5rIG9yXG4gICAgICogbG9hZCBhbiBlbWJlZGRlZCByZXNvdXJjZVxuICAgICAqXG4gICAgICogQHBhcmFtIHtTdHJpbmd9ICAgICAgcmVsXG4gICAgICogQHBhcmFtIHtPYmplY3R8bnVsbH0gdXJsUGFyYW1zXG4gICAgICogQHBhcmFtIHtPYmplY3R9ICAgICAgb3B0aW9uc1xuICAgICAqIEByZXR1cm4ge1Byb21pc2V9XG4gICAgICovXG4gICAgZnVuY3Rpb24gJGdldChyZWwsIHVybFBhcmFtcywgb3B0aW9ucykge1xuICAgICAgcmV0dXJuICRyZXF1ZXN0KCdHRVQnLCByZWwsIHVybFBhcmFtcywgdW5kZWZpbmVkLCBvcHRpb25zKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBFeGVjdXRlIGEgSFRUUCBQT1NUIHJlcXVlc3QgYWdhaW5zdCBhIGxpbmtcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSAgICAgIHJlbFxuICAgICAqIEBwYXJhbSB7T2JqZWN0fG51bGx9IHVybFBhcmFtc1xuICAgICAqIEBwYXJhbSB7bWl4ZWR8bnVsbH0gIGJvZHlcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gICAgICBvcHRpb25zXG4gICAgICogQHJldHVybiB7UHJvbWlzZX1cbiAgICAgKi9cbiAgICBmdW5jdGlvbiAkcG9zdChyZWwsIHVybFBhcmFtcywgYm9keSwgb3B0aW9ucykge1xuICAgICAgcmV0dXJuICRyZXF1ZXN0KCdQT1NUJywgcmVsLCB1cmxQYXJhbXMsIGJvZHksIG9wdGlvbnMpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEV4ZWN1dGUgYSBIVFRQIFBVVCByZXF1ZXN0IGFnYWluc3QgYSBsaW5rXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gICAgICByZWxcbiAgICAgKiBAcGFyYW0ge09iamVjdHxudWxsfSB1cmxQYXJhbXNcbiAgICAgKiBAcGFyYW0ge21peGVkfG51bGx9ICBib2R5XG4gICAgICogQHBhcmFtIHtPYmplY3R9ICAgICAgb3B0aW9uc1xuICAgICAqIEByZXR1cm4ge1Byb21pc2V9XG4gICAgICovXG4gICAgZnVuY3Rpb24gJHB1dChyZWwsIHVybFBhcmFtcywgYm9keSwgb3B0aW9ucykge1xuICAgICAgcmV0dXJuICRyZXF1ZXN0KCdQVVQnLCByZWwsIHVybFBhcmFtcywgYm9keSwgb3B0aW9ucyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRXhlY3V0ZSBhIEhUVFAgUEFUQ0ggcmVxdWVzdCBhZ2FpbnN0IGEgbGlua1xuICAgICAqXG4gICAgICogQHBhcmFtIHtTdHJpbmd9ICAgICAgcmVsXG4gICAgICogQHBhcmFtIHtPYmplY3R8bnVsbH0gdXJsUGFyYW1zXG4gICAgICogQHBhcmFtIHttaXhlZHxudWxsfSAgYm9keVxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSAgICAgIG9wdGlvbnNcbiAgICAgKiBAcmV0dXJuIHtQcm9taXNlfVxuICAgICAqL1xuICAgIGZ1bmN0aW9uICRwYXRjaChyZWwsIHVybFBhcmFtcywgYm9keSwgb3B0aW9ucykge1xuICAgICAgcmV0dXJuICRyZXF1ZXN0KCdQQVRDSCcsIHJlbCwgdXJsUGFyYW1zLCBib2R5LCBvcHRpb25zKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBFeGVjdXRlIGEgSFRUUCBERUxFRVQgcmVxdWVzdCBhZ2FpbnN0IGEgbGlua1xuICAgICAqXG4gICAgICogQHBhcmFtIHtTdHJpbmd9ICAgICAgcmVsXG4gICAgICogQHBhcmFtIHtPYmplY3R8bnVsbH0gdXJsUGFyYW1zXG4gICAgICogQHBhcmFtIHtPYmplY3R9ICAgICAgb3B0aW9uc1xuICAgICAqIEByZXR1cm4ge1Byb21pc2V9XG4gICAgICovXG4gICAgZnVuY3Rpb24gJGRlbGV0ZShyZWwsIHVybFBhcmFtcywgb3B0aW9ucykge1xuICAgICAgcmV0dXJuICRyZXF1ZXN0KCdERUxFVEUnLCByZWwsIHVybFBhcmFtcywgdW5kZWZpbmVkLCBvcHRpb25zKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBFeGVjdXRlIGEgSFRUUCBMSU5LIHJlcXVlc3QgYWdhaW5zdCBhIGxpbmtcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSAgICAgICByZWxcbiAgICAgKiBAcGFyYW0ge09iamVjdHxudWxsfSAgdXJsUGFyYW1zXG4gICAgICogQHBhcmFtIHtMaW5rSGVhZGVyW119IGJvZHlcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gICAgICAgb3B0aW9uc1xuICAgICAqIEByZXR1cm4ge1Byb21pc2V9XG4gICAgICovXG4gICAgZnVuY3Rpb24gJGxpbmsocmVsLCB1cmxQYXJhbXMsIGxpbmtzLCBvcHRpb25zKSB7XG4gICAgICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgICAgIG9wdGlvbnMuaGVhZGVycyA9IG9wdGlvbnMuaGVhZGVycyB8fCB7fTtcbiAgICAgIG9wdGlvbnMuaGVhZGVycy5MaW5rID0gbGlua3MubWFwKHRvU3RyaW5nSXRlbSk7XG4gICAgICByZXR1cm4gJHJlcXVlc3QoJ0xJTksnLCByZWwsIHVybFBhcmFtcywgdW5kZWZpbmVkLCBvcHRpb25zKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBFeGVjdXRlIGEgSFRUUCBVTkxJTksgcmVxdWVzdCBhZ2FpbnN0IGEgbGlua1xuICAgICAqXG4gICAgICogQHBhcmFtIHtTdHJpbmd9ICAgICAgIHJlbFxuICAgICAqIEBwYXJhbSB7T2JqZWN0fG51bGx9ICB1cmxQYXJhbXNcbiAgICAgKiBAcGFyYW0ge0xpbmtIZWFkZXJbXX0gYm9keVxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSAgICAgICBvcHRpb25zXG4gICAgICogQHJldHVybiB7UHJvbWlzZX1cbiAgICAgKi9cbiAgICBmdW5jdGlvbiAkdW5saW5rKHJlbCwgdXJsUGFyYW1zLCBsaW5rcywgb3B0aW9ucykge1xuICAgICAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gICAgICBvcHRpb25zLmhlYWRlcnMgPSBvcHRpb25zLmhlYWRlcnMgfHwge307XG4gICAgICBvcHRpb25zLmhlYWRlcnMuTGluayA9IGxpbmtzLm1hcCh0b1N0cmluZ0l0ZW0pO1xuICAgICAgcmV0dXJuICRyZXF1ZXN0KCdVTkxJTksnLCByZWwsIHVybFBhcmFtcywgdW5kZWZpbmVkLCBvcHRpb25zKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge21peGVkfSBpdGVtXG4gICAgICogQHJldHVybiB7U3RyaW5nfVxuICAgICAqL1xuICAgIGZ1bmN0aW9uIHRvU3RyaW5nSXRlbShpdGVtKSB7XG4gICAgICByZXR1cm4gaXRlbS50b1N0cmluZygpO1xuICAgIH1cbiAgfVxufVxuXG5IYWxSZXNvdXJjZUNsaWVudEZhY3RvcnkuJGluamVjdCA9IFtcbiAgJyRxJyxcbiAgJyRpbmplY3RvcicsXG4gICckaGFsQ29uZmlndXJhdGlvbicsXG5dO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCBNT0RVTEVfTkFNRSA9ICdhbmd1bGFyLWhhbC5yZXNvdXJjZSc7XG5cblxuaW1wb3J0IGNvbmZpZ3VyYXRpb24gZnJvbSAnLi4vY29uZmlndXJhdGlvbic7XG5cbmltcG9ydCBSZXNvdXJjZUZhY3RvcnkgZnJvbSAnLi9yZXNvdXJjZS5mYWN0b3J5JztcbmltcG9ydCBIYWxSZXNvdXJjZUNsaWVudEZhY3RvcnkgZnJvbSAnLi9oYWwtcmVzb3VyY2UtY2xpZW50LmZhY3RvcnknO1xuXG4vLyBBZGQgbW9kdWxlIGZvciByZXNvdXJjZVxuYW5ndWxhclxuICAubW9kdWxlKE1PRFVMRV9OQU1FLCBbXG4gICAgY29uZmlndXJhdGlvbixcbiAgXSlcblxuICAuZmFjdG9yeSgnUmVzb3VyY2UnLCBSZXNvdXJjZUZhY3RvcnkpXG5cbiAgLmZhY3RvcnkoJ0hhbFJlc291cmNlQ2xpZW50JywgSGFsUmVzb3VyY2VDbGllbnRGYWN0b3J5KVxuO1xuXG5leHBvcnQgZGVmYXVsdCBNT0RVTEVfTkFNRTtcbiIsIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IGV4dGVuZFJlYWRPbmx5IGZyb20gJy4uL3V0aWxpdHkvZXh0ZW5kLXJlYWQtb25seSc7XG5pbXBvcnQgZGVmaW5lUmVhZE9ubHkgZnJvbSAnLi4vdXRpbGl0eS9kZWZpbmUtcmVhZC1vbmx5JztcbmltcG9ydCBnZW5lcmF0ZVVybCBmcm9tICcuL2dlbmVyYXRlLXVybCc7XG5pbXBvcnQgbm9ybWFsaXplTGluayBmcm9tICcuLi91dGlsaXR5L25vcm1hbGl6ZS1saW5rJztcblxuLyoqXG4gKiBGYWN0b3J5IGZvciBSZXNvdXJjZVxuICpcbiAqIEBwYXJhbSB7RnVuY3Rpb259IEhhbFJlc291cmNlQ2xpZW50XG4gKiBAcGFyYW0ge09iamVjdH0gICAkaGFsQ29uZmlndXJhdGlvblxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBSZXNvdXJjZUZhY3RvcnkoSGFsUmVzb3VyY2VDbGllbnQsICRoYWxDb25maWd1cmF0aW9uKSB7XG4gIHJldHVybiBSZXNvdXJjZTtcblxuICAvKipcbiAgICogQHBhcmFtIHtPYmplY3R9IGRhdGFcbiAgICogQHBhcmFtIHtPYmplY3R9IHJlc3BvbnNlXG4gICAqL1xuICBmdW5jdGlvbiBSZXNvdXJjZShkYXRhLCByZXNwb25zZSkge1xuICAgIHZhciBzZWxmID0gdGhpc1xuICAgICAgLCBsaW5rcyA9IHt9XG4gICAgICAsIGVtYmVkZGVkID0ge31cbiAgICAgICwgY2xpZW50O1xuXG4gICAgLyoqXG4gICAgICogSW5pdGlhbGl6ZSB0aGUgUmVzb3VyY2VcbiAgICAgKi9cbiAgICAoZnVuY3Rpb24gaW5pdCgpIHtcbiAgICAgIGlmKHR5cGVvZiBkYXRhICE9PSAnb2JqZWN0JyB8fFxuICAgICAgICBkYXRhID09PSBudWxsKSB7XG4gICAgICAgIGRhdGEgPSB7fTtcbiAgICAgIH1cbiAgICAgIGluaXRpYWxpemVEYXRhKCk7XG4gICAgICBpbml0aWFsaXplRW1iZWRkZWQoKTtcbiAgICAgIGluaXRpYWxpemVMaW5rcygpO1xuICAgICAgaW5pdGl0YWxpemVDbGllbnQoKTtcblxuICAgICAgZXh0ZW5kUmVhZE9ubHkoc2VsZiwge1xuICAgICAgICAkaGFzTGluazogJGhhc0xpbmssXG4gICAgICAgICRoYXNFbWJlZGRlZDogJGhhc0VtYmVkZGVkLFxuICAgICAgICAkaGFzOiAkaGFzLFxuICAgICAgICAkaHJlZjogJGhyZWYsXG4gICAgICAgICRtZXRhOiAkbWV0YSxcbiAgICAgICAgJGxpbms6ICRsaW5rLFxuICAgICAgICAkcmVxdWVzdDogJHJlcXVlc3QsXG4gICAgICAgICRyZXNwb25zZTogJHJlc3BvbnNlLFxuICAgICAgfSk7XG4gICAgfSkoKTtcblxuICAgIC8qKlxuICAgICAqIEFkZCBhbGwgZGF0YSBmcm9tIGRhdGEgdG8gaXRzZWxmXG4gICAgICovXG4gICAgZnVuY3Rpb24gaW5pdGlhbGl6ZURhdGEoKSB7XG4gICAgICBmb3IodmFyIHByb3BlcnR5TmFtZSBpbiBkYXRhKSB7XG4gICAgICAgIGlmKCFkYXRhLmhhc093blByb3BlcnR5KHByb3BlcnR5TmFtZSkpIHtcbiAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuICAgICAgICBpZihpc01ldGFQcm9wZXJ0eShwcm9wZXJ0eU5hbWUpKSB7XG4gICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cbiAgICAgICAgZGVmaW5lUmVhZE9ubHkoc2VsZiwgcHJvcGVydHlOYW1lLCBkYXRhW3Byb3BlcnR5TmFtZV0pO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIE5vcm1hbGl6ZSBhbGwgTGlua3NcbiAgICAgKi9cbiAgICBmdW5jdGlvbiBpbml0aWFsaXplTGlua3MoKSB7XG4gICAgICBpZih0eXBlb2YgZGF0YVskaGFsQ29uZmlndXJhdGlvbi5saW5rc0F0dHJpYnV0ZV0gIT09ICdvYmplY3QnKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgT2JqZWN0XG4gICAgICAgIC5rZXlzKGRhdGFbJGhhbENvbmZpZ3VyYXRpb24ubGlua3NBdHRyaWJ1dGVdKVxuICAgICAgICAuZm9yRWFjaChmdW5jdGlvbihyZWwpIHtcbiAgICAgICAgICB2YXIgbGluayA9IGRhdGFbJGhhbENvbmZpZ3VyYXRpb24ubGlua3NBdHRyaWJ1dGVdW3JlbF07XG4gICAgICAgICAgbGlua3NbcmVsXSA9IG5vcm1hbGl6ZUxpbmsocmVzcG9uc2UuY29uZmlnLnVybCwgbGluayk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIE5vcm1hbGl6ZSBFbWJlZGRlZCBDb250ZW50c1xuICAgICAqL1xuICAgIGZ1bmN0aW9uIGluaXRpYWxpemVFbWJlZGRlZCgpIHtcbiAgICAgIGlmKHR5cGVvZiBkYXRhWyRoYWxDb25maWd1cmF0aW9uLmVtYmVkZGVkQXR0cmlidXRlXSAhPT0gJ29iamVjdCcpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBPYmplY3RcbiAgICAgICAgLmtleXMoZGF0YVskaGFsQ29uZmlndXJhdGlvbi5lbWJlZGRlZEF0dHJpYnV0ZV0pXG4gICAgICAgIC5mb3JFYWNoKGZ1bmN0aW9uKHJlbCkge1xuICAgICAgICAgIGVtYmVkUmVzb3VyY2UocmVsLCBkYXRhWyRoYWxDb25maWd1cmF0aW9uLmVtYmVkZGVkQXR0cmlidXRlXVtyZWxdKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogSW5pdGlhbGl6ZSB0aGUgSFRUUCBDTElFTlRcbiAgICAgKi9cbiAgICBmdW5jdGlvbiBpbml0aXRhbGl6ZUNsaWVudCgpIHtcbiAgICAgIGNsaWVudCA9IG5ldyBIYWxSZXNvdXJjZUNsaWVudChzZWxmLCBlbWJlZGRlZCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRW1iZWQgYSByZXNvdXJjZShzKVxuICAgICAqXG4gICAgICogQHBhcmFtIHtTdHJpbmd9ICAgICAgICAgIHJlbFxuICAgICAqIEBwYXJhbSB7T2JqZWN0fE9iamVjdFtdfSByZXNvdXJjZXNcbiAgICAgKi9cbiAgICBmdW5jdGlvbiBlbWJlZFJlc291cmNlKHJlbCwgcmVzb3VyY2VzKSB7XG4gICAgICBpZiAoQXJyYXkuaXNBcnJheShyZXNvdXJjZXMpKSB7XG4gICAgICAgIGVtYmVkZGVkW3JlbF0gPSBbXTtcbiAgICAgICAgcmVzb3VyY2VzLmZvckVhY2goZnVuY3Rpb24gKHJlc291cmNlKSB7XG4gICAgICAgICAgZW1iZWRkZWRbcmVsXS5wdXNoKG5ldyBSZXNvdXJjZShyZXNvdXJjZSwgcmVzcG9uc2UpKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGVtYmVkZGVkW3JlbF0gPSBuZXcgUmVzb3VyY2UocmVzb3VyY2VzLCByZXNwb25zZSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRGV0ZXJtaW5lIGlmIGEgcHJvcGVydHkgbmFtZSBpcyBhIG1ldGEgcHJvcGVydHlcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gcHJvcGVydHlOYW1lXG4gICAgICogQHJldHVybiB7Qm9vbGVhbn1cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBpc01ldGFQcm9wZXJ0eShwcm9wZXJ0eU5hbWUpIHtcbiAgICAgIGZvcih2YXIgaSA9IDA7IGkgPCAkaGFsQ29uZmlndXJhdGlvbi5pZ25vcmVBdHRyaWJ1dGVQcmVmaXhlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICBpZihwcm9wZXJ0eU5hbWUuc3Vic3RyKDAsIDEpID09PSAkaGFsQ29uZmlndXJhdGlvbi5pZ25vcmVBdHRyaWJ1dGVQcmVmaXhlc1tpXSkge1xuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIGlmKHByb3BlcnR5TmFtZSA9PT0gJGhhbENvbmZpZ3VyYXRpb24ubGlua3NBdHRyaWJ1dGUgfHxcbiAgICAgICAgICBwcm9wZXJ0eU5hbWUgPT09ICRoYWxDb25maWd1cmF0aW9uLmVtYmVkZGVkQXR0cmlidXRlKSB7XG4gICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gcmVsXG4gICAgICogQHJldHVybiB7Qm9vbGVhbn1cbiAgICAgKi9cbiAgICBmdW5jdGlvbiAkaGFzTGluayhyZWwpIHtcbiAgICAgIHJldHVybiB0eXBlb2YgbGlua3NbcmVsXSAhPT0gJ3VuZGVmaW5lZCc7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IHJlbFxuICAgICAqIEByZXR1cm4ge0Jvb2xlYW59XG4gICAgICovXG4gICAgZnVuY3Rpb24gJGhhc0VtYmVkZGVkKHJlbCkge1xuICAgICAgcmV0dXJuIHR5cGVvZiBlbWJlZGRlZFtyZWxdICE9PSAndW5kZWZpbmVkJztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gcmVsXG4gICAgICogQHJldHVybiB7Qm9vbGVhbn1cbiAgICAgKi9cbiAgICBmdW5jdGlvbiAkaGFzKHJlbCkge1xuICAgICAgcmV0dXJuICRoYXNMaW5rKHJlbCkgfHwgJGhhc0VtYmVkZGVkKHJlbCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0IHRoZSBocmVmIG9mIGEgTGlua1xuICAgICAqXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IHJlbFxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBwYXJhbWV0ZXJzXG4gICAgICogQHJldHVybiB7U3RyaW5nfVxuICAgICAqL1xuICAgIGZ1bmN0aW9uICRocmVmKHJlbCwgcGFyYW1ldGVycykge1xuICAgICAgaWYoISRoYXNMaW5rKHJlbCkpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdsaW5rIFwiJyArIHJlbCArICdcIiBpcyB1bmRlZmluZWQnKTtcbiAgICAgIH1cblxuICAgICAgdmFyIGxpbmsgPSBsaW5rc1tyZWxdXG4gICAgICAgICwgaHJlZiA9IGxpbmsuaHJlZjtcblxuICAgICAgaWYoQXJyYXkuaXNBcnJheShsaW5rKSkge1xuICAgICAgICBocmVmID0gW107XG4gICAgICAgIGZvcih2YXIgaSA9IDA7IGkgPCBsaW5rLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgdmFyIHN1YkxpbmsgPSBsaW5rW2ldXG4gICAgICAgICAgICAsIHN1YkhyZWYgPSBzdWJMaW5rLmhyZWY7XG4gICAgICAgICAgaWYodHlwZW9mIHN1YkxpbmsudGVtcGxhdGVkICE9PSAndW5kZWZpbmVkJyAmJlxuICAgICAgICAgICAgc3ViTGluay50ZW1wbGF0ZWQpIHtcbiAgICAgICAgICAgIHN1YkhyZWYgPSBnZW5lcmF0ZVVybChzdWJMaW5rLmhyZWYsIHBhcmFtZXRlcnMpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBzdWJIcmVmID0gJGhhbENvbmZpZ3VyYXRpb24udXJsVHJhbnNmb3JtZXIoc3ViSHJlZik7XG4gICAgICAgICAgaHJlZi5wdXNoKHN1YkhyZWYpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZih0eXBlb2YgbGluay50ZW1wbGF0ZWQgIT09ICd1bmRlZmluZWQnICYmXG4gICAgICAgICAgbGluay50ZW1wbGF0ZWQpIHtcbiAgICAgICAgICBocmVmID0gZ2VuZXJhdGVVcmwobGluay5ocmVmLCBwYXJhbWV0ZXJzKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGhyZWYgPSAkaGFsQ29uZmlndXJhdGlvbi51cmxUcmFuc2Zvcm1lcihocmVmKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGhyZWY7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0IGEgbGlua1xuICAgICAqXG4gICAgICogISEgVG8gZ2V0IGEgaHJlZiwgdXNlICRocmVmIGluc3RlYWQgISFcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSByZWxcbiAgICAgKiBAcmV0dXJuIHtPYmplY3R9XG4gICAgICovXG4gICAgZnVuY3Rpb24gJGxpbmsocmVsKSB7XG4gICAgICBpZighJGhhc0xpbmsocmVsKSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2xpbmsgXCInICsgcmVsICsgJ1wiIGlzIHVuZGVmaW5lZCcpO1xuICAgICAgfVxuICAgICAgdmFyIGxpbmsgPSBsaW5rc1tyZWxdO1xuICAgICAgcmV0dXJuIGxpbms7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0IG1ldGEgcHJvcGVydGllc1xuICAgICAqXG4gICAgICogISEgVG8gZ2V0IGEgaHJlZiwgdXNlICRocmVmIGluc3RlYWQgISFcbiAgICAgKiAhISBUbyBnZXQgYSBsaW5rLCB1c2UgJGxpbmsgaW5zdGVhZCAhIVxuICAgICAqICEhIFRvIGdldCBhbiBlbWJlZGRlZCByZXNvdXJjZSwgdXNlICRyZXF1ZXN0KCkuJGdldChyZWwpIGluc3RlYWQgISFcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSByZWxcbiAgICAgKiBAcmV0dXJuIHtPYmplY3R9XG4gICAgICovXG4gICAgZnVuY3Rpb24gJG1ldGEobmFtZSkge1xuICAgICAgZm9yKHZhciBpID0gMDsgaSA8ICRoYWxDb25maWd1cmF0aW9uLmlnbm9yZUF0dHJpYnV0ZVByZWZpeGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHZhciBmdWxsTmFtZSA9ICRoYWxDb25maWd1cmF0aW9uLmlnbm9yZUF0dHJpYnV0ZVByZWZpeGVzW2ldICsgbmFtZTtcbiAgICAgICAgcmV0dXJuIGRhdGFbZnVsbE5hbWVdO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldCB0aGUgT3JpZ2luYWwgUmVzcG9uc2VcbiAgICAgKlxuICAgICAqIEByZXR1cm4ge09iamVjdCl9XG4gICAgICovXG4gICAgZnVuY3Rpb24gJHJlc3BvbnNlKCkge1xuICAgICAgcmV0dXJuIHJlc3BvbnNlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldCB0aGUgY2xpZW50IHRvIHBlcmZvcm0gcmVxdWVzdHNcbiAgICAgKlxuICAgICAqIEByZXR1cm4ge0hhbFJlc291cmNlQ2xpZW50KX1cbiAgICAgKi9cbiAgICBmdW5jdGlvbiAkcmVxdWVzdCgpIHtcbiAgICAgIHJldHVybiBjbGllbnQ7XG4gICAgfVxuICB9XG59XG5SZXNvdXJjZUZhY3RvcnkuJGluamVjdCA9IFtcbiAgJ0hhbFJlc291cmNlQ2xpZW50JyxcbiAgJyRoYWxDb25maWd1cmF0aW9uJyxcbl07XG4iLCIndXNlIHN0cmljdCc7XG5cbi8qKlxuICogRGVmaW5lIHJlYWQtb25seSBwcm9wZXJ0eSBpbiB0YXJnZXRcbiAqIEBwYXJhbSB7T2JqZWN0fSB0YXJnZXRcbiAqIEBwYXJhbSB7U3RyaW5nfSBrZXlcbiAqIEBwYXJhbSB7bWl4ZWR9ICB2YWx1ZVxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBkZWZpbmVSZWFkT25seSh0YXJnZXQsIGtleSwgdmFsdWUpIHtcbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwga2V5LCB7XG4gICAgY29uZmlndXJhYmxlOiBmYWxzZSxcbiAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgIHZhbHVlOiB2YWx1ZSxcbiAgICB3cml0YWJsZTogdHJ1ZSxcbiAgfSk7XG59XG4iLCIndXNlIHN0cmljdCc7XG5cbi8qKlxuICogRXh0ZW5kIHByb3BlcnRpZXMgZnJvbSBjb3B5IHJlYWQtb25seSB0byB0YXJnZXRcbiAqIEBwYXJhbSB7T2JqZWN0fSB0YXJnZXRcbiAqIEBwYXJhbSB7T2JqZWN0fSBjb3B5XG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGV4dGVuZFJlYWRPbmx5KHRhcmdldCwgY29weSkge1xuICBmb3IodmFyIGtleSBpbiBjb3B5KSB7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwga2V5LCB7XG4gICAgICBjb25maWd1cmFibGU6IGZhbHNlLFxuICAgICAgZW51bWVyYWJsZTogZmFsc2UsXG4gICAgICB2YWx1ZTogY29weVtrZXldLFxuICAgIH0pO1xuICB9XG59XG4iLCIndXNlIHN0cmljdCc7XG5cbmltcG9ydCByZXNvbHZlVXJsIGZyb20gJy4uL3V0aWxpdHkvcmVzb2x2ZS11cmwnO1xuXG4vKipcbiAqIEBwYXJhbSB7U3RyaW5nfSBiYXNlVXJsXG4gKiBAcGFyYW0ge21peGVkfSAgbGlua1xuICogQHJldHVybiB7T2JqZWN0fVxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBub3JtYWxpemVMaW5rKGJhc2VVcmwsIGxpbmspIHtcbiAgaWYgKEFycmF5LmlzQXJyYXkobGluaykpIHtcbiAgICByZXR1cm4gbGluay5tYXAoZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgIHJldHVybiBub3JtYWxpemVMaW5rKGJhc2VVcmwsIGl0ZW0pO1xuICAgIH0pO1xuICB9XG4gIGlmKHR5cGVvZiBsaW5rID09PSAnc3RyaW5nJykge1xuICAgIHJldHVybiB7XG4gICAgICBocmVmOiByZXNvbHZlVXJsKGJhc2VVcmwsIGxpbmspLFxuICAgIH07XG4gIH1cbiAgaWYodHlwZW9mIGxpbmsuaHJlZiA9PT0gJ3N0cmluZycpIHtcbiAgICBsaW5rLmhyZWYgPSByZXNvbHZlVXJsKGJhc2VVcmwsIGxpbmsuaHJlZik7XG4gICAgcmV0dXJuIGxpbms7XG4gIH1cbiAgaWYoQXJyYXkuaXNBcnJheShsaW5rLmhyZWYpKSB7XG4gICAgcmV0dXJuIGxpbmsuaHJlZi5tYXAoZnVuY3Rpb24gKGhyZWYpIHtcbiAgICAgIHZhciBuZXdMaW5rID0gYW5ndWxhci5leHRlbmQoe30sIGxpbmssIHtcbiAgICAgICAgaHJlZjogaHJlZixcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIG5vcm1hbGl6ZUxpbmsoYmFzZVVybCwgbmV3TGluayk7XG4gICAgfSk7XG4gIH1cbiAgcmV0dXJuIHtcbiAgICBocmVmOiBiYXNlVXJsLFxuICB9O1xufVxuIiwiJ3VzZSBzdHJpY3QnO1xuXG4vKipcbiAqIFJlc29sdmUgd2hvbGUgVVJMXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IGJhc2VVcmxcbiAqIEBwYXJhbSB7U3RyaW5nfSBwYXRoXG4gKiBAcmV0dXJuIHtTdHJpbmd9XG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHJlc29sdmVVcmwoYmFzZVVybCwgcGF0aCkge1xuICB2YXIgcmVzdWx0SHJlZiA9ICcnXG4gICAgLCByZUZ1bGxVcmwgPSAvXigoPzpcXHcrXFw6KT8pKCg/OlxcL1xcLyk/KShbXlxcL10qKSgoPzpcXC8uKik/KSQvXG4gICAgLCBiYXNlSHJlZk1hdGNoID0gcmVGdWxsVXJsLmV4ZWMoYmFzZVVybClcbiAgICAsIGhyZWZNYXRjaCA9IHJlRnVsbFVybC5leGVjKHBhdGgpO1xuXG4gIGZvciAodmFyIHBhcnRJbmRleCA9IDE7IHBhcnRJbmRleCA8IDU7IHBhcnRJbmRleCsrKSB7XG4gICAgaWYgKGhyZWZNYXRjaFtwYXJ0SW5kZXhdKSB7XG4gICAgICByZXN1bHRIcmVmICs9IGhyZWZNYXRjaFtwYXJ0SW5kZXhdO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXN1bHRIcmVmICs9IGJhc2VIcmVmTWF0Y2hbcGFydEluZGV4XTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gcmVzdWx0SHJlZjtcbn1cbiJdfQ==
