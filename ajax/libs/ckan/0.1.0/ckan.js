var CKAN = {};

var isNodeModule = (typeof module !== 'undefined' && module != null && typeof require !== 'undefined');

if (isNodeModule) {
  var _ = require('underscore')
    , request = require('request')
    ;
  module.exports = CKAN;
}

(function(my) {
  // ====================================
  // ### DataStore
  //
  // Simple wrapper around the CKAN DataStore API
  //
  // @param endpoint: CKAN api endpoint (e.g. http://datahub.io/api)
  my.DataStore = function(endpoint, apiKey) { 
    this.endpoint = _getEndpoint(endpoint);
    this.apiKey = apiKey;
  };

  // Raw action search function
  //
  // search({resource_id: ..., limit: 0})
  my.DataStore.prototype.search = function(data, cb) {
    var searchUrl = this.endpoint + '/3/action/datastore_search';
    var options = {
      url: searchUrl,
      type: 'POST',
      data: JSON.stringify(data),
    };
    this._ajax(options, cb);
  };

  // Like search but supports ReclineJS style query structure
  my.DataStore.prototype.query = function(queryObj, cb) {
    var actualQuery = my._normalizeQuery(queryObj, dataset);
    this.search(actualQuery, function(err, results) {
      var out = {
        total: results.result.total,
        hits: results.result.records
      };
      cb(null, out);
    });
  };

  my.DataStore.prototype.upsert = function(upsertObj, cb) {
    var url = this.endpoint + '/api/3/datastore_upsert';
    return this._ajax({
        url: url,
        type: 'POST',
        data: JSON.stringify(upsertObj)
      },
      cb
    );
  };

  my.DataStore.prototype.listResources = function(cb) {
    var resourceListUrl = this.endpoint + '/3/action/datastore_search?resource_id=_table_metadata';
    return this._ajax({url: resourceListUrl}, cb);
  }


  my.Catalog = function(endpoint, apiKey) { 
    this.endpoint = _getEndpoint(endpoint);
    this.apiKey = apiKey;
  };

  my.Catalog.prototype.action = function(name, data, cb) {
    if (name === 'dataset_create') {
      name = 'package_create';
    }
    var options = {
      url: this.endpoint + '/3/action/' + name,
      data: data,
      type: 'POST'
    };
    return this._ajax(options, cb);
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

  // make an AJAX request
  my.Catalog.prototype._ajax = function(options, cb) {
    options.headers = options.headers || {};
    if (this.apiKey) {
      options.headers['X-CKAN-API-KEY'] = this.apiKey;
    }
    var meth = isNodeModule ? _nodeRequest : _browserRequest;
    return meth(options, cb);
  }

  my.DataStore.prototype._ajax = function(options, cb) {
    options.headers = options.headers || {};
    if (this.apiKey) {
      options.headers['X-CKAN-API-KEY'] = this.apiKey;
    }
    var meth = isNodeModule ? _nodeRequest : _browserRequest;
    return meth(options, cb);
  }

  var _nodeRequest = function(options, cb) {
    var conf = {
      url: options.url,
      headers: options.headers || {},
      method: options.type || 'GET',
      json: options.data
    };
    request(conf, function(err, res, body) {
      cb(err, body);
    });
  };

  var _browserRequest = function(options, cb) {
    var self = this;
    options.data = JSON.stringify(options.data);
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
  my._normalizeQuery = function(queryObj, dataset) {
    var actualQuery = {
      resource_id: dataset.id,
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
  my._parseCkanResourceUrl = function(url) {
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
    var wrapper;
    if (dataset.endpoint) {
      wrapper = new my.DataStore(dataset.endpoint);
    } else {
      var out = CKAN._parseCkanResourceUrl(dataset.url);
      dataset.id = out.resource_id;
      wrapper = new CKAN.DataStore(out.endpoint);
    }
    var dfd = new Deferred();
    return my.query({resource_id: dataset.id, limit: 0}, dataset);
  };

  my.query = function(queryObj, dataset) {
    var dfd = new Deferred()
      , wrapper
      ;
    if (dataset.endpoint) {
      wrapper = new CKAN.DataStore(dataset.endpoint);
    } else {
      var out = CKAN._parseCkanResourceUrl(dataset.url);
      dataset.id = out.resource_id;
      wrapper = new CKAN.DataStore(out.endpoint);
    }
    wrapper.search(queryObj, function(err, results) {
      // map ckan types to our usual types ...
      var fields = _.map(results.result.fields, function(field) {
        field.type = field.type in CKAN_TYPES_MAP ? CKAN_TYPES_MAP[field.type] : field.type;
        return field;
      });
      var out = {
        fields: fields,
        useMemoryStore: false
      };
      dfd.resolve(out);  
    });
    return dfd.promise();
  };

  var CKAN_TYPES_MAP = {
    'int4': 'integer',
    'int8': 'integer',
    'float8': 'float'
  };
}(recline.Backend.Ckan));

