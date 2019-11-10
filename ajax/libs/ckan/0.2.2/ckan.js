var CKAN = {};

var isNodeModule = (typeof module !== 'undefined' && module != null && typeof require !== 'undefined');

if (isNodeModule) {
  var _ = require('underscore')
    , request = require('request')
    ;
  module.exports = CKAN;
}

(function(my) {
  my.Client = function(endpoint, apiKey) { 
    this.endpoint = _getEndpoint(endpoint);
    this.apiKey = apiKey;
  };

  my.Client.prototype.action = function(name, data, cb) {
    if (name.indexOf('dataset_' === 0)) {
      name = name.replace('dataset_', 'package_');
    }
    var options = {
      url: this.endpoint + '/3/action/' + name,
      data: data,
      type: 'POST'
    };
    return this._ajax(options, cb);
  };

  // make an AJAX request
  my.Client.prototype._ajax = function(options, cb) {
    options.headers = options.headers || {};
    if (this.apiKey) {
      options.headers['X-CKAN-API-KEY'] = this.apiKey;
    }
    var meth = isNodeModule ? _nodeRequest : _browserRequest;
    return meth(options, cb);
  }

  // Like search but supports ReclineJS style query structure
  //
  // Primarily for use by Recline backend below
  my.Client.prototype.datastoreQuery = function(queryObj, cb) {
    var actualQuery = my._normalizeQuery(queryObj);
    this.action('datastore_search', actualQuery, function(err, results) {
      if (err) {
        cb(err);
        return;
      }

      // map ckan types to our usual types ...
      var fields = _.map(results.result.fields, function(field) {
        field.type = field.type in my.ckan2JsonTableSchemaTypes ? my.ckan2JsonTableSchemaTypes[field.type] : field.type;
        return field;
      });
      var out = {
        total: results.result.total,
        fields: fields,
        hits: results.result.records
      };
      cb(null, out);
    });
  };

  my.Client.prototype.datastoreSqlQuery = function(sql, cb) {
    this.action('datastore_search_sql', {sql: sql}, function(err, results) {
      if (err) {
        var parsed = JSON.parse(err.message);
        var errOut = {
          original: err,
          code: err.code,
          message: parsed.error.info.orig[0]
        };
        cb(errOut);
        return;
      }

      // map ckan types to our usual types ...
      var fields = _.map(results.result.fields, function(field) {
        field.type = field.type in my.ckan2JsonTableSchemaTypes ? my.ckan2JsonTableSchemaTypes[field.type] : field.type;
        return field;
      });
      var out = {
        total: results.result.length,
        fields: fields,
        hits: results.result.records
      };
      cb(null, out);
    });
  };

  my.ckan2JsonTableSchemaTypes = {
    'text': 'string',
    'int': 'integer',
    'int4': 'integer',
    'int8': 'integer',
    'float8': 'float',
    'timestamp': 'datetime',
    'bool': 'boolean',
  };

  // 
  my.jsonTableSchema2CkanTypes = {
    'string': 'text',
    'number': 'float',
    'integer': 'int',
    'datetime': 'timestamp',
    'boolean': 'bool',
    'binary': 'bytea',
    'object': 'json',
    'array': 'text[]',
    'any': 'text'
  };

  // list all the resources with an entry in the DataStore
  my.Client.prototype.datastoreResources = function(cb) {
    var data = {
      resource_id: '_table_metadata'
    };
    return this._client.action('datastore_search', data, cb);
  };

  // Utilities
  // =========

  var _getEndpoint = function(endpoint) {
    endpoint = endpoint || '/';
    // strip trailing /
    endpoint = endpoint.replace(/\/$/, '');
    if (!endpoint.match(/\/api$/)) {
      endpoint += '/api';
    }
    return endpoint;
  };

  var _nodeRequest = function(options, cb) {
    var conf = {
      url: options.url,
      headers: options.headers || {},
      method: options.type || 'GET',
      json: options.data
    };
    // we could just call request but that's a PITA to mock plus request.get = request (if you look at the source code)
    request.get(conf, function(err, res, body) {
      if (!err && res && !(res.statusCode === 200 || res.statusCode === 302)) {
        err = 'CKANJS API Error. HTTP code ' + res.statusCode + '. Message: ' + JSON.stringify(body, null, 2);
      }
      cb(err, body);
    });
  };

  var _browserRequest = function(options, cb) {
    var self = this;
    options.data = encodeURIComponent(JSON.stringify(options.data));
    options.success = function(data) {
      cb(null, data);
    }
    options.error = function(obj, obj2, obj3) {
      var err = {
        code: obj.status,
        message: obj.responseText
      }
      cb(err); 
    }
    if (options.headers) {
      options.beforeSend = function(req) {
        for (key in options.headers) {
          req.setRequestHeader(key, options.headers[key]);
        }
      };
    }
    return jQuery.ajax(options);
  };

  // only put in the module namespace so we can access for tests!
  my._normalizeQuery = function(queryObj) {
    var actualQuery = {
      resource_id: queryObj.resource_id,
      q: queryObj.q,
      filters: {},
      limit: queryObj.size || 10,
      offset: queryObj.from || 0
    };

    if (queryObj.sort && queryObj.sort.length > 0) {
      var _tmp = _.map(queryObj.sort, function(sortObj) {
        return sortObj.field + ' ' + (sortObj.order || '');
      });
      actualQuery.sort = _tmp.join(',');
    }

    if (queryObj.filters && queryObj.filters.length > 0) {
      _.each(queryObj.filters, function(filter) {
        if (filter.type === "term") {
          actualQuery.filters[filter.field] = filter.term;
        }
      });
    }
    return actualQuery;
  };

  // Parse a normal CKAN resource URL and return API endpoint etc
  //
  // Normal URL is something like http://demo.ckan.org/dataset/some-dataset/resource/eb23e809-ccbb-4ad1-820a-19586fc4bebd
  //
  // :return: { resource_id: ..., endpoint: ... }
  my.parseCkanResourceUrl = function(url) {
    parts = url.split('/');
    var len = parts.length;
    return {
      resource_id: parts[len-1],
      endpoint: parts.slice(0,[len-4]).join('/') + '/api'
    };
  };
}(CKAN));


// Recline Wrapper
//
// Wrap the DataStore to create a Backend suitable for usage in ReclineJS
//
// This provides connection to the CKAN DataStore (v2)
//
// General notes
// 
// We need 2 things to make most requests:
//
// 1. CKAN API endpoint
// 2. ID of resource for which request is being made
//
// There are 2 ways to specify this information.
//
// EITHER (checked in order): 
//
// * Every dataset must have an id equal to its resource id on the CKAN instance
// * The dataset has an endpoint attribute pointing to the CKAN API endpoint
//
// OR:
// 
// Set the url attribute of the dataset to point to the Resource on the CKAN instance. The endpoint and id will then be automatically computed.
var recline = recline || {};
recline.Backend = recline.Backend || {};
recline.Backend.Ckan = recline.Backend.Ckan || {};
(function(my) {
  my.__type__ = 'ckan';

  // private - use either jQuery or Underscore Deferred depending on what is available
  var Deferred = _.isUndefined(this.jQuery) ? _.Deferred : jQuery.Deferred;

  // ### fetch
  my.fetch = function(dataset) {
    var dfd = new Deferred()
    my.query({}, dataset)
      .done(function(data) {
        dfd.resolve({
          fields: data.fields,
          records: data.hits
        });
      })
      .fail(function(err) {
        dfd.reject(err);
      })
      ;
    return dfd.promise();
  };

  my.query = function(queryObj, dataset) {
    var dfd = new Deferred()
      , wrapper
      ;
    if (dataset.endpoint) {
      wrapper = new CKAN.Client(dataset.endpoint);
    } else {
      var out = CKAN.parseCkanResourceUrl(dataset.url);
      dataset.id = out.resource_id;
      wrapper = new CKAN.Client(out.endpoint);
    }
    queryObj.resource_id = dataset.id;
    wrapper.datastoreQuery(queryObj, function(err, out) {
      if (err) {
        dfd.reject(err);
      } else {
        dfd.resolve(out);
      }
    });
    return dfd.promise();
  };
}(recline.Backend.Ckan));

