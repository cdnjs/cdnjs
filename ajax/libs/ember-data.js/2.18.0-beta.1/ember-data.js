(function(){ 
"use strict";

/*!
 * @overview  Ember Data
 * @copyright Copyright 2011-2017 Tilde Inc. and contributors.
 *            Portions Copyright 2011 LivingSocial Inc.
 * @license   Licensed under MIT license (see license.js)
 * @version   2.18.0-beta.1
 */

var loader, define, requireModule, require, requirejs;

(function (global) {
  'use strict';

  function dict() {
    var obj = Object.create(null);
    obj['__'] = undefined;
    delete obj['__'];
    return obj;
  }

  // Save off the original values of these globals, so we can restore them if someone asks us to
  var oldGlobals = {
    loader: loader,
    define: define,
    requireModule: requireModule,
    require: require,
    requirejs: requirejs
  };

  requirejs = require = requireModule = function (id) {
    var pending = [];
    var mod = findModule(id, '(require)', pending);

    for (var i = pending.length - 1; i >= 0; i--) {
      pending[i].exports();
    }

    return mod.module.exports;
  };

  loader = {
    noConflict: function (aliases) {
      var oldName, newName;

      for (oldName in aliases) {
        if (aliases.hasOwnProperty(oldName)) {
          if (oldGlobals.hasOwnProperty(oldName)) {
            newName = aliases[oldName];

            global[newName] = global[oldName];
            global[oldName] = oldGlobals[oldName];
          }
        }
      }
    },
    // Option to enable or disable the generation of default exports
    makeDefaultExport: true
  };

  var registry = dict();
  var seen = dict();

  var uuid = 0;

  function unsupportedModule(length) {
    throw new Error('an unsupported module was defined, expected `define(id, deps, module)` instead got: `' + length + '` arguments to define`');
  }

  var defaultDeps = ['require', 'exports', 'module'];

  function Module(id, deps, callback, alias) {
    this.uuid = uuid++;
    this.id = id;
    this.deps = !deps.length && callback.length ? defaultDeps : deps;
    this.module = { exports: {} };
    this.callback = callback;
    this.hasExportsAsDep = false;
    this.isAlias = alias;
    this.reified = new Array(deps.length);

    /*
       Each module normally passes through these states, in order:
         new       : initial state
         pending   : this module is scheduled to be executed
         reifying  : this module's dependencies are being executed
         reified   : this module's dependencies finished executing successfully
         errored   : this module's dependencies failed to execute
         finalized : this module executed successfully
     */
    this.state = 'new';
  }

  Module.prototype.makeDefaultExport = function () {
    var exports = this.module.exports;
    if (exports !== null && (typeof exports === 'object' || typeof exports === 'function') && exports['default'] === undefined && Object.isExtensible(exports)) {
      exports['default'] = exports;
    }
  };

  Module.prototype.exports = function () {
    // if finalized, there is no work to do. If reifying, there is a
    // circular dependency so we must return our (partial) exports.
    if (this.state === 'finalized' || this.state === 'reifying') {
      return this.module.exports;
    }


    if (loader.wrapModules) {
      this.callback = loader.wrapModules(this.id, this.callback);
    }

    this.reify();

    var result = this.callback.apply(this, this.reified);
    this.reified.length = 0;
    this.state = 'finalized';

    if (!(this.hasExportsAsDep && result === undefined)) {
      this.module.exports = result;
    }
    if (loader.makeDefaultExport) {
      this.makeDefaultExport();
    }
    return this.module.exports;
  };

  Module.prototype.unsee = function () {
    this.state = 'new';
    this.module = { exports: {} };
  };

  Module.prototype.reify = function () {
    if (this.state === 'reified') {
      return;
    }
    this.state = 'reifying';
    try {
      this.reified = this._reify();
      this.state = 'reified';
    } finally {
      if (this.state === 'reifying') {
        this.state = 'errored';
      }
    }
  };

  Module.prototype._reify = function () {
    var reified = this.reified.slice();
    for (var i = 0; i < reified.length; i++) {
      var mod = reified[i];
      reified[i] = mod.exports ? mod.exports : mod.module.exports();
    }
    return reified;
  };

  Module.prototype.findDeps = function (pending) {
    if (this.state !== 'new') {
      return;
    }

    this.state = 'pending';

    var deps = this.deps;

    for (var i = 0; i < deps.length; i++) {
      var dep = deps[i];
      var entry = this.reified[i] = { exports: undefined, module: undefined };
      if (dep === 'exports') {
        this.hasExportsAsDep = true;
        entry.exports = this.module.exports;
      } else if (dep === 'require') {
        entry.exports = this.makeRequire();
      } else if (dep === 'module') {
        entry.exports = this.module;
      } else {
        entry.module = findModule(resolve(dep, this.id), this.id, pending);
      }
    }
  };

  Module.prototype.makeRequire = function () {
    var id = this.id;
    var r = function (dep) {
      return require(resolve(dep, id));
    };
    r['default'] = r;
    r.moduleId = id;
    r.has = function (dep) {
      return has(resolve(dep, id));
    };
    return r;
  };

  define = function (id, deps, callback) {
    var module = registry[id];

    // If a module for this id has already been defined and is in any state
    // other than `new` (meaning it has been or is currently being required),
    // then we return early to avoid redefinition.
    if (module && module.state !== 'new') {
      return;
    }

    if (arguments.length < 2) {
      unsupportedModule(arguments.length);
    }

    if (!Array.isArray(deps)) {
      callback = deps;
      deps = [];
    }

    if (callback instanceof Alias) {
      registry[id] = new Module(callback.id, deps, callback, true);
    } else {
      registry[id] = new Module(id, deps, callback, false);
    }
  };

  define.exports = function (name, defaultExport) {
    var module = registry[name];

    // If a module for this name has already been defined and is in any state
    // other than `new` (meaning it has been or is currently being required),
    // then we return early to avoid redefinition.
    if (module && module.state !== 'new') {
      return;
    }

    module = new Module(name, [], noop, null);
    module.module.exports = defaultExport;
    module.state = 'finalized';
    registry[name] = module;

    return module;
  };

  function noop() {}
  // we don't support all of AMD
  // define.amd = {};

  function Alias(id) {
    this.id = id;
  }

  define.alias = function (id, target) {
    if (arguments.length === 2) {
      return define(target, new Alias(id));
    }

    return new Alias(id);
  };

  function missingModule(id, referrer) {
    throw new Error('Could not find module `' + id + '` imported from `' + referrer + '`');
  }

  function findModule(id, referrer, pending) {
    var mod = registry[id] || registry[id + '/index'];

    while (mod && mod.isAlias) {
      mod = registry[mod.id];
    }

    if (!mod) {
      missingModule(id, referrer);
    }

    if (pending && mod.state !== 'pending' && mod.state !== 'finalized') {
      mod.findDeps(pending);
      pending.push(mod);
    }
    return mod;
  }

  function resolve(child, id) {
    if (child.charAt(0) !== '.') {
      return child;
    }


    var parts = child.split('/');
    var nameParts = id.split('/');
    var parentBase = nameParts.slice(0, -1);

    for (var i = 0, l = parts.length; i < l; i++) {
      var part = parts[i];

      if (part === '..') {
        if (parentBase.length === 0) {
          throw new Error('Cannot access parent module of root');
        }
        parentBase.pop();
      } else if (part === '.') {
        continue;
      } else {
        parentBase.push(part);
      }
    }

    return parentBase.join('/');
  }

  function has(id) {
    return !!(registry[id] || registry[id + '/index']);
  }

  requirejs.entries = requirejs._eak_seen = registry;
  requirejs.has = has;
  requirejs.unsee = function (id) {
    findModule(id, '(unsee)', false).unsee();
  };

  requirejs.clear = function () {
    requirejs.entries = requirejs._eak_seen = registry = dict();
    seen = dict();
  };

  // This code primes the JS engine for good performance by warming the
  // JIT compiler for these functions.
  define('foo', function () {});
  define('foo/bar', [], function () {});
  define('foo/asdf', ['module', 'exports', 'require'], function (module, exports, require) {
    if (require.has('foo/bar')) {
      require('foo/bar');
    }
  });
  define('foo/baz', [], define.alias('foo'));
  define('foo/quz', define.alias('foo'));
  define.alias('foo', 'foo/qux');
  define('foo/bar', ['foo', './quz', './baz', './asdf', './bar', '../foo'], function () {});
  define('foo/main', ['foo/bar'], function () {});
  define.exports('foo/exports', {});

  require('foo/exports');
  require('foo/main');
  require.unsee('foo/bar');

  requirejs.clear();

  if (typeof exports === 'object' && typeof module === 'object' && module.exports) {
    module.exports = { require: require, define: define };
  }
})(this);
define('ember-data/-debug', ['exports'], function (exports) {
  'use strict';

  exports.__esModule = true;
  exports.instrument = instrument;
  function instrument(method) {
    return method();
  }

  /*
    Assert that `addedRecord` has a valid type so it can be added to the
    relationship of the `record`.
  
    The assert basically checks if the `addedRecord` can be added to the
    relationship (specified via `relationshipMeta`) of the `record`.
  
    This utility should only be used internally, as both record parameters must
    be an InternalModel and the `relationshipMeta` needs to be the meta
    information about the relationship, retrieved via
    `record.relationshipFor(key)`.
  
    @method assertPolymorphicType
    @param {InternalModel} internalModel
    @param {RelationshipMeta} relationshipMeta retrieved via
           `record.relationshipFor(key)`
    @param {InternalModel} addedRecord record which
           should be added/set for the relationship
  */
  var assertPolymorphicType = void 0;

  if (false) {
    var checkPolymorphic = function checkPolymorphic(modelClass, addedModelClass) {
      if (modelClass.__isMixin) {
        //TODO Need to do this in order to support mixins, should convert to public api
        //once it exists in Ember
        return modelClass.__mixin.detect(addedModelClass.PrototypeMixin);
      }
      if (Ember.MODEL_FACTORY_INJECTIONS) {
        modelClass = modelClass.superclass;
      }
      return modelClass.detect(addedModelClass);
    };

    exports.assertPolymorphicType = assertPolymorphicType = function assertPolymorphicType(parentInternalModel, relationshipMeta, addedInternalModel) {
      var addedModelName = addedInternalModel.modelName;
      var parentModelName = parentInternalModel.modelName;
      var key = relationshipMeta.key;
      var relationshipModelName = relationshipMeta.type;
      var relationshipClass = parentInternalModel.store.modelFor(relationshipModelName);
      var assertionMessage = 'You cannot add a record of modelClass \'' + addedModelName + '\' to the \'' + parentModelName + '.' + key + '\' relationship (only \'' + relationshipModelName + '\' allowed)';

      (false && Ember.assert(assertionMessage, checkPolymorphic(relationshipClass, addedInternalModel.modelClass)));
    };
  }

  exports.assertPolymorphicType = assertPolymorphicType;
});
define('ember-data/-private/adapters/build-url-mixin', ['exports', 'ember-inflector'], function (exports, _emberInflector) {
  'use strict';

  exports.__esModule = true;
  var camelize = Ember.String.camelize;
  var Mixin = Ember.Mixin;
  var get = Ember.get;
  exports.default = Mixin.create({
    /**
      Builds a URL for a given type and optional ID.
       By default, it pluralizes the type's name (for example, 'post'
      becomes 'posts' and 'person' becomes 'people'). To override the
      pluralization see [pathForType](#method_pathForType).
       If an ID is specified, it adds the ID to the path generated
      for the type, separated by a `/`.
       When called by RESTAdapter.findMany() the `id` and `snapshot` parameters
      will be arrays of ids and snapshots.
       @method buildURL
      @param {String} modelName
      @param {(String|Array|Object)} id single id or array of ids or query
      @param {(DS.Snapshot|Array)} snapshot single snapshot or array of snapshots
      @param {String} requestType
      @param {Object} query object of query parameters to send for query requests.
      @return {String} url
    */
    buildURL: function (modelName, id, snapshot, requestType, query) {
      switch (requestType) {
        case 'findRecord':
          return this.urlForFindRecord(id, modelName, snapshot);
        case 'findAll':
          return this.urlForFindAll(modelName, snapshot);
        case 'query':
          return this.urlForQuery(query, modelName);
        case 'queryRecord':
          return this.urlForQueryRecord(query, modelName);
        case 'findMany':
          return this.urlForFindMany(id, modelName, snapshot);
        case 'findHasMany':
          return this.urlForFindHasMany(id, modelName, snapshot);
        case 'findBelongsTo':
          return this.urlForFindBelongsTo(id, modelName, snapshot);
        case 'createRecord':
          return this.urlForCreateRecord(modelName, snapshot);
        case 'updateRecord':
          return this.urlForUpdateRecord(id, modelName, snapshot);
        case 'deleteRecord':
          return this.urlForDeleteRecord(id, modelName, snapshot);
        default:
          return this._buildURL(modelName, id);
      }
    },


    /**
      @method _buildURL
      @private
      @param {String} modelName
      @param {String} id
      @return {String} url
    */
    _buildURL: function (modelName, id) {
      var path = void 0;
      var url = [];
      var host = get(this, 'host');
      var prefix = this.urlPrefix();

      if (modelName) {
        path = this.pathForType(modelName);
        if (path) {
          url.push(path);
        }
      }

      if (id) {
        url.push(encodeURIComponent(id));
      }
      if (prefix) {
        url.unshift(prefix);
      }

      url = url.join('/');
      if (!host && url && url.charAt(0) !== '/') {
        url = '/' + url;
      }

      return url;
    },


    /**
     Builds a URL for a `store.findRecord(type, id)` call.
      Example:
      ```app/adapters/user.js
     import DS from 'ember-data';
      export default DS.JSONAPIAdapter.extend({
       urlForFindRecord(id, modelName, snapshot) {
         let baseUrl = this.buildURL(modelName, id, snapshot);
         return `${baseUrl}/users/${snapshot.adapterOptions.user_id}/playlists/${id}`;
       }
     });
     ```
      @method urlForFindRecord
     @param {String} id
     @param {String} modelName
     @param {DS.Snapshot} snapshot
     @return {String} url
      */
    urlForFindRecord: function (id, modelName, snapshot) {
      return this._buildURL(modelName, id);
    },


    /**
     Builds a URL for a `store.findAll(type)` call.
      Example:
      ```app/adapters/comment.js
     import DS from 'ember-data';
      export default DS.JSONAPIAdapter.extend({
       urlForFindAll(modelName, snapshot) {
         return 'data/comments.json';
       }
     });
     ```
      @method urlForFindAll
     @param {String} modelName
     @param {DS.SnapshotRecordArray} snapshot
     @return {String} url
     */
    urlForFindAll: function (modelName, snapshot) {
      return this._buildURL(modelName);
    },


    /**
     Builds a URL for a `store.query(type, query)` call.
      Example:
      ```app/adapters/application.js
     import DS from 'ember-data';
      export default DS.RESTAdapter.extend({
       host: 'https://api.github.com',
       urlForQuery (query, modelName) {
         switch(modelName) {
           case 'repo':
             return `https://api.github.com/orgs/${query.orgId}/repos`;
           default:
             return this._super(...arguments);
         }
       }
     });
     ```
      @method urlForQuery
     @param {Object} query
     @param {String} modelName
     @return {String} url
     */
    urlForQuery: function (query, modelName) {
      return this._buildURL(modelName);
    },


    /**
     Builds a URL for a `store.queryRecord(type, query)` call.
      Example:
      ```app/adapters/application.js
     import DS from 'ember-data';
      export default DS.RESTAdapter.extend({
       urlForQueryRecord({ slug }, modelName) {
         let baseUrl = this.buildURL();
         return `${baseUrl}/${encodeURIComponent(slug)}`;
       }
     });
     ```
      @method urlForQueryRecord
     @param {Object} query
     @param {String} modelName
     @return {String} url
     */
    urlForQueryRecord: function (query, modelName) {
      return this._buildURL(modelName);
    },


    /**
     Builds a URL for coalesceing multiple `store.findRecord(type, id)`
     records into 1 request when the adapter's `coalesceFindRequests`
     property is true.
      Example:
      ```app/adapters/application.js
     import DS from 'ember-data';
      export default DS.RESTAdapter.extend({
       urlForFindMany(ids, modelName) {
         let baseUrl = this.buildURL();
         return `${baseUrl}/coalesce`;
       }
     });
     ```
      @method urlForFindMany
     @param {Array} ids
     @param {String} modelName
     @param {Array} snapshots
     @return {String} url
     */
    urlForFindMany: function (ids, modelName, snapshots) {
      return this._buildURL(modelName);
    },


    /**
     Builds a URL for fetching a async hasMany relationship when a url
     is not provided by the server.
      Example:
      ```app/adapters/application.js
     import DS from 'ember-data';
      export default DS.JSONAPIAdapter.extend({
       urlForFindHasMany(id, modelName, snapshot) {
         let baseUrl = this.buildURL(id, modelName);
         return `${baseUrl}/relationships`;
       }
     });
     ```
      @method urlForFindHasMany
     @param {String} id
     @param {String} modelName
     @param {DS.Snapshot} snapshot
     @return {String} url
     */
    urlForFindHasMany: function (id, modelName, snapshot) {
      return this._buildURL(modelName, id);
    },


    /**
     Builds a URL for fetching a async belongsTo relationship when a url
     is not provided by the server.
      Example:
      ```app/adapters/application.js
     import DS from 'ember-data';
      export default DS.JSONAPIAdapter.extend({
       urlForFindBelongsTo(id, modelName, snapshot) {
         let baseUrl = this.buildURL(id, modelName);
         return `${baseUrl}/relationships`;
       }
     });
     ```
      @method urlForFindBelongsTo
     @param {String} id
     @param {String} modelName
     @param {DS.Snapshot} snapshot
     @return {String} url
     */
    urlForFindBelongsTo: function (id, modelName, snapshot) {
      return this._buildURL(modelName, id);
    },


    /**
     Builds a URL for a `record.save()` call when the record was created
     locally using `store.createRecord()`.
      Example:
      ```app/adapters/application.js
     import DS from 'ember-data';
      export default DS.RESTAdapter.extend({
       urlForCreateRecord(modelName, snapshot) {
         return this._super(...arguments) + '/new';
       }
     });
     ```
      @method urlForCreateRecord
     @param {String} modelName
     @param {DS.Snapshot} snapshot
     @return {String} url
     */
    urlForCreateRecord: function (modelName, snapshot) {
      return this._buildURL(modelName);
    },


    /**
     Builds a URL for a `record.save()` call when the record has been update locally.
      Example:
      ```app/adapters/application.js
     import DS from 'ember-data';
      export default DS.RESTAdapter.extend({
       urlForUpdateRecord(id, modelName, snapshot) {
         return `/${id}/feed?access_token=${snapshot.adapterOptions.token}`;
       }
     });
     ```
      @method urlForUpdateRecord
     @param {String} id
     @param {String} modelName
     @param {DS.Snapshot} snapshot
     @return {String} url
     */
    urlForUpdateRecord: function (id, modelName, snapshot) {
      return this._buildURL(modelName, id);
    },


    /**
     Builds a URL for a `record.save()` call when the record has been deleted locally.
      Example:
      ```app/adapters/application.js
     import DS from 'ember-data';
      export default DS.RESTAdapter.extend({
       urlForDeleteRecord(id, modelName, snapshot) {
         return this._super(...arguments) + '/destroy';
       }
     });
     ```
      @method urlForDeleteRecord
     @param {String} id
     @param {String} modelName
     @param {DS.Snapshot} snapshot
     @return {String} url
     */
    urlForDeleteRecord: function (id, modelName, snapshot) {
      return this._buildURL(modelName, id);
    },


    /**
      @method urlPrefix
      @private
      @param {String} path
      @param {String} parentURL
      @return {String} urlPrefix
    */
    urlPrefix: function (path, parentURL) {
      var host = get(this, 'host');
      var namespace = get(this, 'namespace');

      if (!host || host === '/') {
        host = '';
      }

      if (path) {
        // Protocol relative url
        if (/^\/\//.test(path) || /http(s)?:\/\//.test(path)) {
          // Do nothing, the full host is already included.
          return path;

          // Absolute path
        } else if (path.charAt(0) === '/') {
          return '' + host + path;
          // Relative path
        } else {
          return parentURL + '/' + path;
        }
      }

      // No path provided
      var url = [];
      if (host) {
        url.push(host);
      }
      if (namespace) {
        url.push(namespace);
      }
      return url.join('/');
    },


    /**
      Determines the pathname for a given type.
       By default, it pluralizes the type's name (for example,
      'post' becomes 'posts' and 'person' becomes 'people').
       ### Pathname customization
       For example if you have an object LineItem with an
      endpoint of "/line_items/".
       ```app/adapters/application.js
      import DS from 'ember-data';
      import { decamelize } from '@ember/string';
      import { pluralize } from 'ember-inflector';
       export default DS.RESTAdapter.extend({
        pathForType: function(modelName) {
          var decamelized = decamelize(modelName);
          return pluralize(decamelized);
        }
      });
      ```
       @method pathForType
      @param {String} modelName
      @return {String} path
    **/
    pathForType: function (modelName) {
      var camelized = camelize(modelName);
      return (0, _emberInflector.pluralize)(camelized);
    }
  });
});
define('ember-data/-private/adapters/errors', ['exports'], function (exports) {
  'use strict';

  exports.__esModule = true;
  exports.AdapterError = AdapterError;
  exports.errorsHashToArray = errorsHashToArray;
  exports.errorsArrayToHash = errorsArrayToHash;
  var makeArray = Ember.makeArray;
  var isPresent = Ember.isPresent;
  var EmberError = Ember.Error;


  var SOURCE_POINTER_REGEXP = /^\/?data\/(attributes|relationships)\/(.*)/;
  var SOURCE_POINTER_PRIMARY_REGEXP = /^\/?data/;
  var PRIMARY_ATTRIBUTE_KEY = 'base';

  /**
    A `DS.AdapterError` is used by an adapter to signal that an error occurred
    during a request to an external API. It indicates a generic error, and
    subclasses are used to indicate specific error states. The following
    subclasses are provided:
  
    - `DS.InvalidError`
    - `DS.TimeoutError`
    - `DS.AbortError`
    - `DS.UnauthorizedError`
    - `DS.ForbiddenError`
    - `DS.NotFoundError`
    - `DS.ConflictError`
    - `DS.ServerError`
  
    To create a custom error to signal a specific error state in communicating
    with an external API, extend the `DS.AdapterError`. For example if the
    external API exclusively used HTTP `503 Service Unavailable` to indicate
    it was closed for maintenance:
  
    ```app/adapters/maintenance-error.js
    import DS from 'ember-data';
  
    export default DS.AdapterError.extend({ message: "Down for maintenance." });
    ```
  
    This error would then be returned by an adapter's `handleResponse` method:
  
    ```app/adapters/application.js
    import DS from 'ember-data';
    import MaintenanceError from './maintenance-error';
  
    export default DS.JSONAPIAdapter.extend({
      handleResponse(status) {
        if (503 === status) {
          return new MaintenanceError();
        }
  
        return this._super(...arguments);
      }
    });
    ```
  
    And can then be detected in an application and used to send the user to an
    `under-maintenance` route:
  
    ```app/routes/application.js
    import Route from '@ember/routing/route';
    import MaintenanceError from '../adapters/maintenance-error';
  
    export default Route.extend({
      actions: {
        error(error, transition) {
          if (error instanceof MaintenanceError) {
            this.transitionTo('under-maintenance');
            return;
          }
  
          // ...other error handling logic
        }
      }
    });
    ```
  
    @class AdapterError
    @namespace DS
  */
  function AdapterError(errors) {
    var message = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'Adapter operation failed';

    this.isAdapterError = true;
    EmberError.call(this, message);

    this.errors = errors || [{
      title: 'Adapter Error',
      detail: message
    }];
  }

  function extendFn(ErrorClass) {
    return function () {
      var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          defaultMessage = _ref.message;

      return extend(ErrorClass, defaultMessage);
    };
  }

  function extend(ParentErrorClass, defaultMessage) {
    var ErrorClass = function (errors, message) {
      (false && Ember.assert('`AdapterError` expects json-api formatted errors array.', Array.isArray(errors || [])));

      ParentErrorClass.call(this, errors, message || defaultMessage);
    };
    ErrorClass.prototype = Object.create(ParentErrorClass.prototype);
    ErrorClass.extend = extendFn(ErrorClass);

    return ErrorClass;
  }

  AdapterError.prototype = Object.create(EmberError.prototype);

  AdapterError.extend = extendFn(AdapterError);

  /**
    A `DS.InvalidError` is used by an adapter to signal the external API
    was unable to process a request because the content was not
    semantically correct or meaningful per the API. Usually this means a
    record failed some form of server side validation. When a promise
    from an adapter is rejected with a `DS.InvalidError` the record will
    transition to the `invalid` state and the errors will be set to the
    `errors` property on the record.
  
    For Ember Data to correctly map errors to their corresponding
    properties on the model, Ember Data expects each error to be
    a valid json-api error object with a `source/pointer` that matches
    the property name. For example if you had a Post model that
    looked like this.
  
    ```app/models/post.js
    import DS from 'ember-data';
  
    export default DS.Model.extend({
      title: DS.attr('string'),
      content: DS.attr('string')
    });
    ```
  
    To show an error from the server related to the `title` and
    `content` properties your adapter could return a promise that
    rejects with a `DS.InvalidError` object that looks like this:
  
    ```app/adapters/post.js
    import RSVP from 'RSVP';
    import DS from 'ember-data';
  
    export default DS.RESTAdapter.extend({
      updateRecord() {
        // Fictional adapter that always rejects
        return RSVP.reject(new DS.InvalidError([
          {
            detail: 'Must be unique',
            source: { pointer: '/data/attributes/title' }
          },
          {
            detail: 'Must not be blank',
            source: { pointer: '/data/attributes/content'}
          }
        ]));
      }
    });
    ```
  
    Your backend may use different property names for your records the
    store will attempt extract and normalize the errors using the
    serializer's `extractErrors` method before the errors get added to
    the the model. As a result, it is safe for the `InvalidError` to
    wrap the error payload unaltered.
  
    @class InvalidError
    @namespace DS
  */
  var InvalidError = exports.InvalidError = extend(AdapterError, 'The adapter rejected the commit because it was invalid');

  /**
    A `DS.TimeoutError` is used by an adapter to signal that a request
    to the external API has timed out. I.e. no response was received from
    the external API within an allowed time period.
  
    An example use case would be to warn the user to check their internet
    connection if an adapter operation has timed out:
  
    ```app/routes/application.js
    import Route from '@ember/routing/route';
    import DS from 'ember-data';
  
    const { TimeoutError } = DS;
  
    export default Route.extend({
      actions: {
        error(error, transition) {
          if (error instanceof TimeoutError) {
            // alert the user
            alert('Are you still connected to the internet?');
            return;
          }
  
          // ...other error handling logic
        }
      }
    });
    ```
  
    @class TimeoutError
    @namespace DS
  */
  var TimeoutError = exports.TimeoutError = extend(AdapterError, 'The adapter operation timed out');

  /**
    A `DS.AbortError` is used by an adapter to signal that a request to
    the external API was aborted. For example, this can occur if the user
    navigates away from the current page after a request to the external API
    has been initiated but before a response has been received.
  
    @class AbortError
    @namespace DS
  */
  var AbortError = exports.AbortError = extend(AdapterError, 'The adapter operation was aborted');

  /**
    A `DS.UnauthorizedError` equates to a HTTP `401 Unauthorized` response
    status. It is used by an adapter to signal that a request to the external
    API was rejected because authorization is required and has failed or has not
    yet been provided.
  
    An example use case would be to redirect the user to a log in route if a
    request is unauthorized:
  
    ```app/routes/application.js
    import Route from '@ember/routing/route';
    import DS from 'ember-data';
  
    const { UnauthorizedError } = DS;
  
    export default Route.extend({
      actions: {
        error(error, transition) {
          if (error instanceof UnauthorizedError) {
            // go to the sign in route
            this.transitionTo('login');
            return;
          }
  
          // ...other error handling logic
        }
      }
    });
    ```
  
    @class UnauthorizedError
    @namespace DS
  */
  var UnauthorizedError = exports.UnauthorizedError = extend(AdapterError, 'The adapter operation is unauthorized');

  /**
    A `DS.ForbiddenError` equates to a HTTP `403 Forbidden` response status.
    It is used by an adapter to signal that a request to the external API was
    valid but the server is refusing to respond to it. If authorization was
    provided and is valid, then the authenticated user does not have the
    necessary permissions for the request.
  
    @class ForbiddenError
    @namespace DS
  */
  var ForbiddenError = exports.ForbiddenError = extend(AdapterError, 'The adapter operation is forbidden');

  /**
    A `DS.NotFoundError` equates to a HTTP `404 Not Found` response status.
    It is used by an adapter to signal that a request to the external API
    was rejected because the resource could not be found on the API.
  
    An example use case would be to detect if the user has entered a route
    for a specific model that does not exist. For example:
  
    ```app/routes/post.js
    import Route from '@ember/routing/route';
    import DS from 'ember-data';
  
    const { NotFoundError } = DS;
  
    export default Route.extend({
      model(params) {
        return this.get('store').findRecord('post', params.post_id);
      },
  
      actions: {
        error(error, transition) {
          if (error instanceof NotFoundError) {
            // redirect to a list of all posts instead
            this.transitionTo('posts');
          } else {
            // otherwise let the error bubble
            return true;
          }
        }
      }
    });
    ```
  
    @class NotFoundError
    @namespace DS
  */
  var NotFoundError = exports.NotFoundError = extend(AdapterError, 'The adapter could not find the resource');

  /**
    A `DS.ConflictError` equates to a HTTP `409 Conflict` response status.
    It is used by an adapter to indicate that the request could not be processed
    because of a conflict in the request. An example scenario would be when
    creating a record with a client generated id but that id is already known
    to the external API.
  
    @class ConflictError
    @namespace DS
  */
  var ConflictError = exports.ConflictError = extend(AdapterError, 'The adapter operation failed due to a conflict');

  /**
    A `DS.ServerError` equates to a HTTP `500 Internal Server Error` response
    status. It is used by the adapter to indicate that a request has failed
    because of an error in the external API.
  
    @class ServerError
    @namespace DS
  */
  var ServerError = exports.ServerError = extend(AdapterError, 'The adapter operation failed due to a server error');

  /**
    Convert an hash of errors into an array with errors in JSON-API format.
  
    ```javascript
    import DS from 'ember-data';
  
    const { errorsHashToArray } = DS;
  
    let errors = {
      base: 'Invalid attributes on saving this record',
      name: 'Must be present',
      age: ['Must be present', 'Must be a number']
    };
  
    let errorsArray = errorsHashToArray(errors);
    // [
    //   {
    //     title: "Invalid Document",
    //     detail: "Invalid attributes on saving this record",
    //     source: { pointer: "/data" }
    //   },
    //   {
    //     title: "Invalid Attribute",
    //     detail: "Must be present",
    //     source: { pointer: "/data/attributes/name" }
    //   },
    //   {
    //     title: "Invalid Attribute",
    //     detail: "Must be present",
    //     source: { pointer: "/data/attributes/age" }
    //   },
    //   {
    //     title: "Invalid Attribute",
    //     detail: "Must be a number",
    //     source: { pointer: "/data/attributes/age" }
    //   }
    // ]
    ```
  
    @method errorsHashToArray
    @public
    @namespace
    @for DS
    @param {Object} errors hash with errors as properties
    @return {Array} array of errors in JSON-API format
  */
  function errorsHashToArray(errors) {
    var out = [];

    if (isPresent(errors)) {
      Object.keys(errors).forEach(function (key) {
        var messages = makeArray(errors[key]);
        for (var i = 0; i < messages.length; i++) {
          var title = 'Invalid Attribute';
          var pointer = '/data/attributes/' + key;
          if (key === PRIMARY_ATTRIBUTE_KEY) {
            title = 'Invalid Document';
            pointer = '/data';
          }
          out.push({
            title: title,
            detail: messages[i],
            source: {
              pointer: pointer
            }
          });
        }
      });
    }

    return out;
  }

  /**
    Convert an array of errors in JSON-API format into an object.
  
    ```javascript
    import DS from 'ember-data';
  
    const { errorsArrayToHash } = DS;
  
    let errorsArray = [
      {
        title: 'Invalid Attribute',
        detail: 'Must be present',
        source: { pointer: '/data/attributes/name' }
      },
      {
        title: 'Invalid Attribute',
        detail: 'Must be present',
        source: { pointer: '/data/attributes/age' }
      },
      {
        title: 'Invalid Attribute',
        detail: 'Must be a number',
        source: { pointer: '/data/attributes/age' }
      }
    ];
  
    let errors = errorsArrayToHash(errorsArray);
    // {
    //   "name": ["Must be present"],
    //   "age":  ["Must be present", "must be a number"]
    // }
    ```
  
    @method errorsArrayToHash
    @public
    @namespace
    @for DS
    @param {Array} errors array of errors in JSON-API format
    @return {Object}
  */
  function errorsArrayToHash(errors) {
    var out = {};

    if (isPresent(errors)) {
      errors.forEach(function (error) {
        if (error.source && error.source.pointer) {
          var key = error.source.pointer.match(SOURCE_POINTER_REGEXP);

          if (key) {
            key = key[2];
          } else if (error.source.pointer.search(SOURCE_POINTER_PRIMARY_REGEXP) !== -1) {
            key = PRIMARY_ATTRIBUTE_KEY;
          }

          if (key) {
            out[key] = out[key] || [];
            out[key].push(error.detail || error.title);
          }
        }
      });
    }

    return out;
  }
});
define('ember-data/-private/core', ['exports', 'ember-data/version'], function (exports, _version) {
  'use strict';

  exports.__esModule = true;


  /**
    @module ember-data
  */

  /**
    All Ember Data classes, methods and functions are defined inside of this namespace.
  
    @class DS
    @static
  */

  /**
    @property VERSION
    @type String
    @static
  */
  var DS = Ember.Namespace.create({
    VERSION: _version.default,
    name: "DS"
  });

  if (Ember.libraries) {
    Ember.libraries.registerCoreLibrary('Ember Data', DS.VERSION);
  }

  exports.default = DS;
});
define('ember-data/-private/features', ['exports'], function (exports) {
  'use strict';

  exports.__esModule = true;
  exports.default = isEnabled;
  function isEnabled() {
    var _Ember$FEATURES;

    return (_Ember$FEATURES = Ember.FEATURES).isEnabled.apply(_Ember$FEATURES, arguments);
  }
});
define('ember-data/-private/global', ['exports'], function (exports) {
  'use strict';

  exports.__esModule = true;
  /* globals global, window, self */

  // originally from https://github.com/emberjs/ember.js/blob/c0bd26639f50efd6a03ee5b87035fd200e313b8e/packages/ember-environment/lib/global.js

  // from lodash to catch fake globals
  function checkGlobal(value) {
    return value && value.Object === Object ? value : undefined;
  }

  // element ids can ruin global miss checks
  function checkElementIdShadowing(value) {
    return value && value.nodeType === undefined ? value : undefined;
  }

  // export real global
  exports.default = checkGlobal(checkElementIdShadowing(typeof global === 'object' && global)) || checkGlobal(typeof self === 'object' && self) || checkGlobal(typeof window === 'object' && window) || new Function('return this')();
});
define('ember-data/-private', ['exports', 'ember-data/-private/system/model/model', 'ember-data/-private/system/model/errors', 'ember-data/-private/system/store', 'ember-data/-private/core', 'ember-data/-private/system/relationships/belongs-to', 'ember-data/-private/system/relationships/has-many', 'ember-data/-private/adapters/build-url-mixin', 'ember-data/-private/system/snapshot', 'ember-data/-private/adapters/errors', 'ember-data/-private/system/normalize-model-name', 'ember-data/-private/utils', 'ember-data/-private/system/coerce-id', 'ember-data/-private/utils/parse-response-headers', 'ember-data/-private/global', 'ember-data/-private/features', 'ember-data/-private/system/model/states', 'ember-data/-private/system/model/internal-model', 'ember-data/-private/system/store/container-instance-cache', 'ember-data/-private/system/promise-proxies', 'ember-data/-private/system/record-arrays', 'ember-data/-private/system/many-array', 'ember-data/-private/system/record-array-manager', 'ember-data/-private/system/relationships/state/relationship', 'ember-data/-private/system/debug/debug-adapter', 'ember-data/-private/system/diff-array', 'ember-data/-private/system/relationships/relationship-payloads-manager', 'ember-data/-private/system/relationships/relationship-payloads', 'ember-data/-private/system/snapshot-record-array'], function (exports, _model, _errors, _store, _core, _belongsTo, _hasMany, _buildUrlMixin, _snapshot, _errors2, _normalizeModelName, _utils, _coerceId, _parseResponseHeaders, _global, _features, _states, _internalModel, _containerInstanceCache, _promiseProxies, _recordArrays, _manyArray, _recordArrayManager, _relationship, _debugAdapter, _diffArray, _relationshipPayloadsManager, _relationshipPayloads, _snapshotRecordArray) {
  'use strict';

  exports.__esModule = true;
  Object.defineProperty(exports, 'Model', {
    enumerable: true,
    get: function () {
      return _model.default;
    }
  });
  Object.defineProperty(exports, 'Errors', {
    enumerable: true,
    get: function () {
      return _errors.default;
    }
  });
  Object.defineProperty(exports, 'Store', {
    enumerable: true,
    get: function () {
      return _store.default;
    }
  });
  Object.defineProperty(exports, 'DS', {
    enumerable: true,
    get: function () {
      return _core.default;
    }
  });
  Object.defineProperty(exports, 'belongsTo', {
    enumerable: true,
    get: function () {
      return _belongsTo.default;
    }
  });
  Object.defineProperty(exports, 'hasMany', {
    enumerable: true,
    get: function () {
      return _hasMany.default;
    }
  });
  Object.defineProperty(exports, 'BuildURLMixin', {
    enumerable: true,
    get: function () {
      return _buildUrlMixin.default;
    }
  });
  Object.defineProperty(exports, 'Snapshot', {
    enumerable: true,
    get: function () {
      return _snapshot.default;
    }
  });
  Object.defineProperty(exports, 'AdapterError', {
    enumerable: true,
    get: function () {
      return _errors2.AdapterError;
    }
  });
  Object.defineProperty(exports, 'InvalidError', {
    enumerable: true,
    get: function () {
      return _errors2.InvalidError;
    }
  });
  Object.defineProperty(exports, 'UnauthorizedError', {
    enumerable: true,
    get: function () {
      return _errors2.UnauthorizedError;
    }
  });
  Object.defineProperty(exports, 'ForbiddenError', {
    enumerable: true,
    get: function () {
      return _errors2.ForbiddenError;
    }
  });
  Object.defineProperty(exports, 'NotFoundError', {
    enumerable: true,
    get: function () {
      return _errors2.NotFoundError;
    }
  });
  Object.defineProperty(exports, 'ConflictError', {
    enumerable: true,
    get: function () {
      return _errors2.ConflictError;
    }
  });
  Object.defineProperty(exports, 'ServerError', {
    enumerable: true,
    get: function () {
      return _errors2.ServerError;
    }
  });
  Object.defineProperty(exports, 'TimeoutError', {
    enumerable: true,
    get: function () {
      return _errors2.TimeoutError;
    }
  });
  Object.defineProperty(exports, 'AbortError', {
    enumerable: true,
    get: function () {
      return _errors2.AbortError;
    }
  });
  Object.defineProperty(exports, 'errorsHashToArray', {
    enumerable: true,
    get: function () {
      return _errors2.errorsHashToArray;
    }
  });
  Object.defineProperty(exports, 'errorsArrayToHash', {
    enumerable: true,
    get: function () {
      return _errors2.errorsArrayToHash;
    }
  });
  Object.defineProperty(exports, 'normalizeModelName', {
    enumerable: true,
    get: function () {
      return _normalizeModelName.default;
    }
  });
  Object.defineProperty(exports, 'getOwner', {
    enumerable: true,
    get: function () {
      return _utils.getOwner;
    }
  });
  Object.defineProperty(exports, 'modelHasAttributeOrRelationshipNamedType', {
    enumerable: true,
    get: function () {
      return _utils.modelHasAttributeOrRelationshipNamedType;
    }
  });
  Object.defineProperty(exports, 'coerceId', {
    enumerable: true,
    get: function () {
      return _coerceId.default;
    }
  });
  Object.defineProperty(exports, 'parseResponseHeaders', {
    enumerable: true,
    get: function () {
      return _parseResponseHeaders.default;
    }
  });
  Object.defineProperty(exports, 'global', {
    enumerable: true,
    get: function () {
      return _global.default;
    }
  });
  Object.defineProperty(exports, 'isEnabled', {
    enumerable: true,
    get: function () {
      return _features.default;
    }
  });
  Object.defineProperty(exports, 'RootState', {
    enumerable: true,
    get: function () {
      return _states.default;
    }
  });
  Object.defineProperty(exports, 'InternalModel', {
    enumerable: true,
    get: function () {
      return _internalModel.default;
    }
  });
  Object.defineProperty(exports, 'ContainerInstanceCache', {
    enumerable: true,
    get: function () {
      return _containerInstanceCache.default;
    }
  });
  Object.defineProperty(exports, 'PromiseArray', {
    enumerable: true,
    get: function () {
      return _promiseProxies.PromiseArray;
    }
  });
  Object.defineProperty(exports, 'PromiseObject', {
    enumerable: true,
    get: function () {
      return _promiseProxies.PromiseObject;
    }
  });
  Object.defineProperty(exports, 'PromiseManyArray', {
    enumerable: true,
    get: function () {
      return _promiseProxies.PromiseManyArray;
    }
  });
  Object.defineProperty(exports, 'RecordArray', {
    enumerable: true,
    get: function () {
      return _recordArrays.RecordArray;
    }
  });
  Object.defineProperty(exports, 'FilteredRecordArray', {
    enumerable: true,
    get: function () {
      return _recordArrays.FilteredRecordArray;
    }
  });
  Object.defineProperty(exports, 'AdapterPopulatedRecordArray', {
    enumerable: true,
    get: function () {
      return _recordArrays.AdapterPopulatedRecordArray;
    }
  });
  Object.defineProperty(exports, 'ManyArray', {
    enumerable: true,
    get: function () {
      return _manyArray.default;
    }
  });
  Object.defineProperty(exports, 'RecordArrayManager', {
    enumerable: true,
    get: function () {
      return _recordArrayManager.default;
    }
  });
  Object.defineProperty(exports, 'Relationship', {
    enumerable: true,
    get: function () {
      return _relationship.default;
    }
  });
  Object.defineProperty(exports, 'DebugAdapter', {
    enumerable: true,
    get: function () {
      return _debugAdapter.default;
    }
  });
  Object.defineProperty(exports, 'diffArray', {
    enumerable: true,
    get: function () {
      return _diffArray.default;
    }
  });
  Object.defineProperty(exports, 'RelationshipPayloadsManager', {
    enumerable: true,
    get: function () {
      return _relationshipPayloadsManager.default;
    }
  });
  Object.defineProperty(exports, 'RelationshipPayloads', {
    enumerable: true,
    get: function () {
      return _relationshipPayloads.default;
    }
  });
  Object.defineProperty(exports, 'SnapshotRecordArray', {
    enumerable: true,
    get: function () {
      return _snapshotRecordArray.default;
    }
  });
});
define("ember-data/-private/system/clone-null", ["exports"], function (exports) {
  "use strict";

  exports.__esModule = true;
  exports.default = cloneNull;
  function cloneNull(source) {
    var clone = Object.create(null);
    for (var key in source) {
      clone[key] = source[key];
    }
    return clone;
  }
});
define('ember-data/-private/system/coerce-id', ['exports'], function (exports) {
  'use strict';

  exports.__esModule = true;
  exports.default = coerceId;
  // Used by the store to normalize IDs entering the store.  Despite the fact
  // that developers may provide IDs as numbers (e.g., `store.findRecord('person', 1)`),
  // it is important that internally we use strings, since IDs may be serialized
  // and lose type information.  For example, Ember's router may put a record's
  // ID into the URL, and if we later try to deserialize that URL and find the
  // corresponding record, we will not know if it is a string or a number.
  function coerceId(id) {
    if (id === null || id === undefined || id === '') {
      return null;
    }
    if (typeof id === 'string') {
      return id;
    }
    return '' + id;
  }
});
define('ember-data/-private/system/debug/debug-adapter', ['exports', 'ember-data/-private/system/model/model'], function (exports, _model) {
  'use strict';

  exports.__esModule = true;
  var addObserver = Ember.addObserver;
  var removeObserver = Ember.removeObserver;
  var A = Ember.A;
  var DataAdapter = Ember.DataAdapter;
  var capitalize = Ember.String.capitalize;
  var underscore = Ember.String.underscore;
  var get = Ember.get;
  exports.default = DataAdapter.extend({
    getFilters: function () {
      return [{ name: 'isNew', desc: 'New' }, { name: 'isModified', desc: 'Modified' }, { name: 'isClean', desc: 'Clean' }];
    },
    detect: function (typeClass) {
      return typeClass !== _model.default && _model.default.detect(typeClass);
    },
    columnsForType: function (typeClass) {
      var columns = [{
        name: 'id',
        desc: 'Id'
      }];
      var count = 0;
      var self = this;
      get(typeClass, 'attributes').forEach(function (meta, name) {
        if (count++ > self.attributeLimit) {
          return false;
        }
        var desc = capitalize(underscore(name).replace('_', ' '));
        columns.push({ name: name, desc: desc });
      });
      return columns;
    },
    getRecords: function (modelClass, modelName) {
      if (arguments.length < 2) {
        // Legacy Ember.js < 1.13 support
        var containerKey = modelClass._debugContainerKey;
        if (containerKey) {
          var match = containerKey.match(/model:(.*)/);
          if (match !== null) {
            modelName = match[1];
          }
        }
      }
      (false && Ember.assert("Cannot find model name. Please upgrade to Ember.js >= 1.13 for Ember Inspector support", !!modelName));

      return this.get('store').peekAll(modelName);
    },
    getRecordColumnValues: function (record) {
      var _this = this;

      var count = 0;
      var columnValues = { id: get(record, 'id') };

      record.eachAttribute(function (key) {
        if (count++ > _this.attributeLimit) {
          return false;
        }
        columnValues[key] = get(record, key);
      });
      return columnValues;
    },
    getRecordKeywords: function (record) {
      var keywords = [];
      var keys = A(['id']);
      record.eachAttribute(function (key) {
        return keys.push(key);
      });
      keys.forEach(function (key) {
        return keywords.push(get(record, key));
      });
      return keywords;
    },
    getRecordFilterValues: function (record) {
      return {
        isNew: record.get('isNew'),
        isModified: record.get('hasDirtyAttributes') && !record.get('isNew'),
        isClean: !record.get('hasDirtyAttributes')
      };
    },
    getRecordColor: function (record) {
      var color = 'black';
      if (record.get('isNew')) {
        color = 'green';
      } else if (record.get('hasDirtyAttributes')) {
        color = 'blue';
      }
      return color;
    },
    observeRecord: function (record, recordUpdated) {
      var releaseMethods = A();
      var keysToObserve = A(['id', 'isNew', 'hasDirtyAttributes']);

      record.eachAttribute(function (key) {
        return keysToObserve.push(key);
      });
      var adapter = this;

      keysToObserve.forEach(function (key) {
        var handler = function () {
          recordUpdated(adapter.wrapRecord(record));
        };
        addObserver(record, key, handler);
        releaseMethods.push(function () {
          removeObserver(record, key, handler);
        });
      });

      var release = function () {
        releaseMethods.forEach(function (fn) {
          return fn();
        });
      };

      return release;
    }
  });
});
define("ember-data/-private/system/diff-array", ["exports"], function (exports) {
  "use strict";

  exports.__esModule = true;
  exports.default = diffArray;
  /**
    @namespace
    @method diffArray
    @private
    @param {Array} oldArray the old array
    @param {Array} newArray the new array
    @return {hash} {
        firstChangeIndex: <integer>,  // null if no change
        addedCount: <integer>,        // 0 if no change
        removedCount: <integer>       // 0 if no change
      }
  */
  function diffArray(oldArray, newArray) {
    var oldLength = oldArray.length;
    var newLength = newArray.length;

    var shortestLength = Math.min(oldLength, newLength);
    var firstChangeIndex = null; // null signifies no changes

    // find the first change
    for (var i = 0; i < shortestLength; i++) {
      // compare each item in the array
      if (oldArray[i] !== newArray[i]) {
        firstChangeIndex = i;
        break;
      }
    }

    if (firstChangeIndex === null && newLength !== oldLength) {
      // no change found in the overlapping block
      // and array lengths differ,
      // so change starts at end of overlap
      firstChangeIndex = shortestLength;
    }

    var addedCount = 0;
    var removedCount = 0;
    if (firstChangeIndex !== null) {
      // we found a change, find the end of the change
      var unchangedEndBlockLength = shortestLength - firstChangeIndex;
      // walk back from the end of both arrays until we find a change
      for (var _i = 1; _i <= shortestLength; _i++) {
        // compare each item in the array
        if (oldArray[oldLength - _i] !== newArray[newLength - _i]) {
          unchangedEndBlockLength = _i - 1;
          break;
        }
      }
      addedCount = newLength - unchangedEndBlockLength - firstChangeIndex;
      removedCount = oldLength - unchangedEndBlockLength - firstChangeIndex;
    }

    return {
      firstChangeIndex: firstChangeIndex,
      addedCount: addedCount,
      removedCount: removedCount
    };
  }
});
define('ember-data/-private/system/identity-map', ['exports', 'ember-data/-private/system/internal-model-map'], function (exports, _internalModelMap) {
  'use strict';

  exports.__esModule = true;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var IdentityMap = function () {
    function IdentityMap() {
      _classCallCheck(this, IdentityMap);

      this._map = Object.create(null);
    }

    /**
     Retrieves the `InternalModelMap` for a given modelName,
     creating one if one did not already exist. This is
     similar to `getWithDefault` or `get` on a `MapWithDefault`
      @method retrieve
     @param modelName a previously normalized modelName
     @returns {InternalModelMap} the InternalModelMap for the given modelName
     */


    IdentityMap.prototype.retrieve = function retrieve(modelName) {
      var map = this._map[modelName];

      if (map === undefined) {
        map = this._map[modelName] = new _internalModelMap.default(modelName);
      }

      return map;
    };

    IdentityMap.prototype.clear = function clear() {
      var map = this._map;
      var keys = Object.keys(map);

      for (var i = 0; i < keys.length; i++) {
        var key = keys[i];
        map[key].clear();
      }
    };

    return IdentityMap;
  }();

  exports.default = IdentityMap;
});
define('ember-data/-private/system/internal-model-map', ['exports', 'ember-data/-private/system/model/internal-model'], function (exports, _internalModel) {
  'use strict';

  exports.__esModule = true;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  var InternalModelMap = function () {
    function InternalModelMap(modelName) {
      _classCallCheck(this, InternalModelMap);

      this.modelName = modelName;
      this._idToModel = Object.create(null);
      this._models = [];
      this._metadata = null;
    }

    /**
     *
     * @param id
     * @returns {InternalModel}
     */


    InternalModelMap.prototype.get = function get(id) {
      return this._idToModel[id];
    };

    InternalModelMap.prototype.has = function has(id) {
      return !!this._idToModel[id];
    };

    InternalModelMap.prototype.set = function set(id, internalModel) {
      (false && Ember.assert('You cannot index an internalModel by an empty id\'', id));
      (false && Ember.assert('You cannot set an index for an internalModel to something other than an internalModel', internalModel instanceof _internalModel.default));
      (false && Ember.assert('You cannot set an index for an internalModel that is not in the InternalModelMap', this.contains(internalModel)));
      (false && Ember.assert('You cannot update the id index of an InternalModel once set. Attempted to update ' + id + '.', !this.has(id) || this.get(id) === internalModel));


      this._idToModel[id] = internalModel;
    };

    InternalModelMap.prototype.add = function add(internalModel, id) {
      (false && Ember.assert('You cannot re-add an already present InternalModel to the InternalModelMap.', !this.contains(internalModel)));


      if (id) {
        this._idToModel[id] = internalModel;
      }

      this._models.push(internalModel);
    };

    InternalModelMap.prototype.remove = function remove(internalModel, id) {
      delete this._idToModel[id];

      var loc = this._models.indexOf(internalModel);

      if (loc !== -1) {
        this._models.splice(loc, 1);
      }
    };

    InternalModelMap.prototype.contains = function contains(internalModel) {
      return this._models.indexOf(internalModel) !== -1;
    };

    InternalModelMap.prototype.clear = function clear() {
      var models = this._models;
      this._models = [];

      for (var i = 0; i < models.length; i++) {
        var model = models[i];
        model.unloadRecord();
      }

      this._metadata = null;
    };

    _createClass(InternalModelMap, [{
      key: 'length',
      get: function () {
        return this._models.length;
      }
    }, {
      key: 'models',
      get: function () {
        return this._models;
      }
    }, {
      key: 'metadata',
      get: function () {
        return this._metadata || (this._metadata = Object.create(null));
      }
    }, {
      key: 'type',
      get: function () {
        throw new Error('InternalModelMap.type is no longer available');
      }
    }]);

    return InternalModelMap;
  }();

  exports.default = InternalModelMap;
});
define('ember-data/-private/system/is-array-like', ['exports'], function (exports) {
  'use strict';

  exports.__esModule = true;
  exports.default = isArrayLike;
  var typeOf = Ember.typeOf;
  var EmberArray = Ember.Array;


  /*
    We're using this to detect arrays and "array-like" objects.
  
    This is a copy of the `isArray` method found in `ember-runtime/utils` as we're
    currently unable to import non-exposed modules.
  
    This method was previously exposed as `Ember.isArray` but since
    https://github.com/emberjs/ember.js/pull/11463 `Ember.isArray` is an alias of
    `Array.isArray` hence removing the "array-like" part.
   */
  function isArrayLike(obj) {
    if (!obj || obj.setInterval) {
      return false;
    }
    if (Array.isArray(obj)) {
      return true;
    }
    if (EmberArray.detect(obj)) {
      return true;
    }

    var type = typeOf(obj);
    if ('array' === type) {
      return true;
    }
    if (obj.length !== undefined && 'object' === type) {
      return true;
    }
    return false;
  }
});
define('ember-data/-private/system/many-array', ['exports', 'ember-data/-private/system/promise-proxies', 'ember-data/-private/system/store/common', 'ember-data/-private/system/diff-array'], function (exports, _promiseProxies, _common, _diffArray) {
  'use strict';

  exports.__esModule = true;
  var all = Ember.RSVP.all;
  var Evented = Ember.Evented;
  var MutableArray = Ember.MutableArray;
  var EmberObject = Ember.Object;
  var get = Ember.get;
  exports.default = EmberObject.extend(MutableArray, Evented, {
    init: function () {
      this._super.apply(this, arguments);

      /**
      The loading state of this array
       @property {Boolean} isLoaded
      */
      this.isLoaded = false;
      this.length = 0;

      /**
      Used for async `hasMany` arrays
      to keep track of when they will resolve.
       @property {Ember.RSVP.Promise} promise
      @private
      */
      this.promise = null;

      /**
      Metadata associated with the request for async hasMany relationships.
       Example
       Given that the server returns the following JSON payload when fetching a
      hasMany relationship:
       ```js
      {
        "comments": [{
          "id": 1,
          "comment": "This is the first comment",
        }, {
      // ...
        }],
         "meta": {
          "page": 1,
          "total": 5
        }
      }
      ```
       You can then access the metadata via the `meta` property:
       ```js
      post.get('comments').then(function(comments) {
        var meta = comments.get('meta');
       // meta.page => 1
      // meta.total => 5
      });
      ```
       @property {Object} meta
      @public
      */
      this.meta = this.meta || null;

      /**
      `true` if the relationship is polymorphic, `false` otherwise.
       @property {Boolean} isPolymorphic
      @private
      */
      this.isPolymorphic = this.isPolymorphic || false;

      /**
      The relationship which manages this array.
       @property {ManyRelationship} relationship
      @private
      */
      this.relationship = this.relationship || null;

      this.currentState = [];
      this.flushCanonical(false);
    },
    objectAt: function (index) {
      var internalModel = this.currentState[index];
      if (internalModel === undefined) {
        return;
      }

      return internalModel.getRecord();
    },
    flushCanonical: function () {
      var isInitialized = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

      // It’s possible the parent side of the relationship may have been unloaded by this point
      if (!(0, _common._objectIsAlive)(this)) {
        return;
      }
      var toSet = this.canonicalState;

      //a hack for not removing new records
      //TODO remove once we have proper diffing
      var newInternalModels = this.currentState.filter(
      // only add new internalModels which are not yet in the canonical state of this
      // relationship (a new internalModel can be in the canonical state if it has
      // been 'acknowleged' to be in the relationship via a store.push)
      function (internalModel) {
        return internalModel.isNew() && toSet.indexOf(internalModel) === -1;
      });
      toSet = toSet.concat(newInternalModels);

      // diff to find changes
      var diff = (0, _diffArray.default)(this.currentState, toSet);

      if (diff.firstChangeIndex !== null) {
        // it's null if no change found
        // we found a change
        this.arrayContentWillChange(diff.firstChangeIndex, diff.removedCount, diff.addedCount);
        this.set('length', toSet.length);
        this.currentState = toSet;
        this.arrayContentDidChange(diff.firstChangeIndex, diff.removedCount, diff.addedCount);
        if (isInitialized && diff.addedCount > 0) {
          //notify only on additions
          //TODO only notify if unloaded
          this.relationship.notifyHasManyChanged();
        }
      }
    },
    internalReplace: function (idx, amt, objects) {
      if (!objects) {
        objects = [];
      }
      this.arrayContentWillChange(idx, amt, objects.length);
      this.currentState.splice.apply(this.currentState, [idx, amt].concat(objects));
      this.set('length', this.currentState.length);
      this.arrayContentDidChange(idx, amt, objects.length);
    },


    //TODO(Igor) optimize
    _removeInternalModels: function (internalModels) {
      for (var i = 0; i < internalModels.length; i++) {
        var index = this.currentState.indexOf(internalModels[i]);
        this.internalReplace(index, 1);
      }
    },


    //TODO(Igor) optimize
    _addInternalModels: function (internalModels, idx) {
      if (idx === undefined) {
        idx = this.currentState.length;
      }
      this.internalReplace(idx, 0, internalModels);
    },
    replace: function (idx, amt, objects) {
      var internalModels = void 0;
      if (amt > 0) {
        internalModels = this.currentState.slice(idx, idx + amt);
        this.get('relationship').removeInternalModels(internalModels);
      }
      if (objects) {
        this.get('relationship').addInternalModels(objects.map(function (obj) {
          return obj._internalModel;
        }), idx);
      }
    },


    /**
      Reloads all of the records in the manyArray. If the manyArray
      holds a relationship that was originally fetched using a links url
      Ember Data will revisit the original links url to repopulate the
      relationship.
       If the manyArray holds the result of a `store.query()` reload will
      re-run the original query.
       Example
       ```javascript
      var user = store.peekRecord('user', 1)
      user.login().then(function() {
        user.get('permissions').then(function(permissions) {
          return permissions.reload();
        });
      });
      ```
       @method reload
      @public
    */
    reload: function () {
      return this.relationship.reload();
    },


    /**
      Saves all of the records in the `ManyArray`.
       Example
       ```javascript
      store.findRecord('inbox', 1).then(function(inbox) {
        inbox.get('messages').then(function(messages) {
          messages.forEach(function(message) {
            message.set('isRead', true);
          });
          messages.save()
        });
      });
      ```
       @method save
      @return {DS.PromiseArray} promise
    */
    save: function () {
      var manyArray = this;
      var promiseLabel = 'DS: ManyArray#save ' + get(this, 'type');
      var promise = all(this.invoke("save"), promiseLabel).then(function () {
        return manyArray;
      }, null, 'DS: ManyArray#save return ManyArray');

      return _promiseProxies.PromiseArray.create({ promise: promise });
    },


    /**
      Create a child record within the owner
       @method createRecord
      @private
      @param {Object} hash
      @return {DS.Model} record
    */
    createRecord: function (hash) {
      var store = get(this, 'store');
      var type = get(this, 'type');

      (false && Ember.assert('You cannot add \'' + type.modelName + '\' records to this polymorphic relationship.', !get(this, 'isPolymorphic')));

      var record = store.createRecord(type.modelName, hash);
      this.pushObject(record);

      return record;
    }
  });
});
define('ember-data/-private/system/model/errors', ['exports'], function (exports) {
  'use strict';

  exports.__esModule = true;
  var mapBy = Ember.computed.mapBy;
  var not = Ember.computed.not;
  var Evented = Ember.Evented;
  var ArrayProxy = Ember.ArrayProxy;
  var set = Ember.set;
  var get = Ember.get;
  var computed = Ember.computed;
  var isEmpty = Ember.isEmpty;
  var makeArray = Ember.makeArray;
  var A = Ember.A;
  var MapWithDefault = Ember.MapWithDefault;
  exports.default = ArrayProxy.extend(Evented, {
    /**
      Register with target handler
       @method registerHandlers
      @param {Object} target
      @param {Function} becameInvalid
      @param {Function} becameValid
      @deprecated
    */
    registerHandlers: function (target, becameInvalid, becameValid) {
      (false && !(false) && Ember.deprecate('Record errors will no longer be evented.', false, {
        id: 'ds.errors.registerHandlers',
        until: '3.0.0'
      }));


      this._registerHandlers(target, becameInvalid, becameValid);
    },


    /**
      Register with target handler
       @method _registerHandlers
      @private
    */
    _registerHandlers: function (target, becameInvalid, becameValid) {
      this.on('becameInvalid', target, becameInvalid);
      this.on('becameValid', target, becameValid);
    },


    /**
      @property errorsByAttributeName
      @type {Ember.MapWithDefault}
      @private
    */
    errorsByAttributeName: computed(function () {
      return MapWithDefault.create({
        defaultValue: function () {
          return A();
        }
      });
    }),

    /**
      Returns errors for a given attribute
       ```javascript
      let user = store.createRecord('user', {
        username: 'tomster',
        email: 'invalidEmail'
      });
      user.save().catch(function(){
        user.get('errors').errorsFor('email'); // returns:
        // [{attribute: "email", message: "Doesn't look like a valid email."}]
      });
      ```
       @method errorsFor
      @param {String} attribute
      @return {Array}
    */
    errorsFor: function (attribute) {
      return get(this, 'errorsByAttributeName').get(attribute);
    },


    /**
      An array containing all of the error messages for this
      record. This is useful for displaying all errors to the user.
       ```handlebars
      {{#each model.errors.messages as |message|}}
        <div class="error">
          {{message}}
        </div>
      {{/each}}
      ```
       @property messages
      @type {Array}
    */
    messages: mapBy('content', 'message'),

    /**
      @property content
      @type {Array}
      @private
    */
    content: computed(function () {
      return A();
    }),

    /**
      @method unknownProperty
      @private
    */
    unknownProperty: function (attribute) {
      var errors = this.errorsFor(attribute);
      if (isEmpty(errors)) {
        return null;
      }
      return errors;
    },


    /**
      Total number of errors.
       @property length
      @type {Number}
      @readOnly
    */

    /**
      @property isEmpty
      @type {Boolean}
      @readOnly
    */
    isEmpty: not('length').readOnly(),

    /**
      Adds error messages to a given attribute and sends
      `becameInvalid` event to the record.
       Example:
       ```javascript
      if (!user.get('username') {
        user.get('errors').add('username', 'This field is required');
      }
      ```
       @method add
      @param {String} attribute
      @param {(Array|String)} messages
      @deprecated
    */
    add: function (attribute, messages) {
      (false && Ember.warn('Interacting with a record errors object will no longer change the record state.', false, {
        id: 'ds.errors.add'
      }));


      var wasEmpty = get(this, 'isEmpty');

      this._add(attribute, messages);

      if (wasEmpty && !get(this, 'isEmpty')) {
        this.trigger('becameInvalid');
      }
    },


    /**
      Adds error messages to a given attribute without sending event.
       @method _add
      @private
    */
    _add: function (attribute, messages) {
      messages = this._findOrCreateMessages(attribute, messages);
      this.addObjects(messages);
      get(this, 'errorsByAttributeName').get(attribute).addObjects(messages);

      this.notifyPropertyChange(attribute);
    },


    /**
      @method _findOrCreateMessages
      @private
    */
    _findOrCreateMessages: function (attribute, messages) {
      var errors = this.errorsFor(attribute);
      var messagesArray = makeArray(messages);
      var _messages = new Array(messagesArray.length);

      for (var i = 0; i < messagesArray.length; i++) {
        var message = messagesArray[i];
        var err = errors.findBy('message', message);
        if (err) {
          _messages[i] = err;
        } else {
          _messages[i] = {
            attribute: attribute,
            message: message
          };
        }
      }

      return _messages;
    },


    /**
      Removes all error messages from the given attribute and sends
      `becameValid` event to the record if there no more errors left.
       Example:
       ```app/models/user.js
      import DS from 'ember-data';
       export default DS.Model.extend({
        email: DS.attr('string'),
        twoFactorAuth: DS.attr('boolean'),
        phone: DS.attr('string')
      });
      ```
       ```app/routes/user/edit.js
      import Route from '@ember/routing/route';
       export default Route.extend({
        actions: {
          save: function(user) {
            if (!user.get('twoFactorAuth')) {
              user.get('errors').remove('phone');
            }
            user.save();
          }
        }
      });
      ```
       @method remove
      @param {String} attribute
      @deprecated
    */
    remove: function (attribute) {
      (false && Ember.warn('Interacting with a record errors object will no longer change the record state.', false, {
        id: 'ds.errors.remove'
      }));


      if (get(this, 'isEmpty')) {
        return;
      }

      this._remove(attribute);

      if (get(this, 'isEmpty')) {
        this.trigger('becameValid');
      }
    },


    /**
      Removes all error messages from the given attribute without sending event.
       @method _remove
      @private
    */
    _remove: function (attribute) {
      if (get(this, 'isEmpty')) {
        return;
      }

      var content = this.rejectBy('attribute', attribute);
      set(this, 'content', content);
      get(this, 'errorsByAttributeName').delete(attribute);

      this.notifyPropertyChange(attribute);
      this.notifyPropertyChange('length');
    },


    /**
      Removes all error messages and sends `becameValid` event
      to the record.
       Example:
       ```app/routes/user/edit.js
    import Route from '@ember/routing/route';
       export default Route.extend({
        actions: {
          retrySave: function(user) {
            user.get('errors').clear();
            user.save();
          }
        }
      });
      ```
       @method clear
      @deprecated
    */
    clear: function () {
      (false && Ember.warn('Interacting with a record errors object will no longer change the record state.', false, {
        id: 'ds.errors.clear'
      }));


      if (get(this, 'isEmpty')) {
        return;
      }

      this._clear();
      this.trigger('becameValid');
    },


    /**
      Removes all error messages.
      to the record.
       @method _clear
      @private
    */
    _clear: function () {
      if (get(this, 'isEmpty')) {
        return;
      }

      var errorsByAttributeName = get(this, 'errorsByAttributeName');
      var attributes = A();

      errorsByAttributeName.forEach(function (_, attribute) {
        attributes.push(attribute);
      });

      errorsByAttributeName.clear();
      attributes.forEach(function (attribute) {
        this.notifyPropertyChange(attribute);
      }, this);

      ArrayProxy.prototype.clear.call(this);
    },


    /**
      Checks if there is error messages for the given attribute.
       ```app/routes/user/edit.js
      import Route from '@ember/routing/route';
       export default Route.extend({
        actions: {
          save: function(user) {
            if (user.get('errors').has('email')) {
              return alert('Please update your email before attempting to save.');
            }
            user.save();
          }
        }
      });
      ```
       @method has
      @param {String} attribute
      @return {Boolean} true if there some errors on given attribute
    */
    has: function (attribute) {
      return !isEmpty(this.errorsFor(attribute));
    }
  });
});
define('ember-data/-private/system/model/internal-model', ['exports', 'ember-data/-private/system/model/states', 'ember-data/-private/system/relationships/state/create', 'ember-data/-private/system/snapshot', 'ember-data/-private/features', 'ember-data/-private/system/ordered-set', 'ember-data/-private/utils', 'ember-data/-private/system/references'], function (exports, _states, _create, _snapshot, _features, _orderedSet, _utils, _references) {
  'use strict';

  exports.__esModule = true;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  var assign = Ember.assign;
  var merge = Ember.merge;
  var set = Ember.set;
  var get = Ember.get;
  var copy = Ember.copy;
  var EmberError = Ember.Error;
  var isEqual = Ember.isEqual;
  var isEmpty = Ember.isEmpty;
  var setOwner = Ember.setOwner;
  var run = Ember.run;
  var RSVP = Ember.RSVP;
  var Promise = Ember.RSVP.Promise;
  var inspect = Ember.inspect;


  var emberAssign = assign || merge;

  /*
    The TransitionChainMap caches the `state.enters`, `state.setups`, and final state reached
    when transitioning from one state to another, so that future transitions can replay the
    transition without needing to walk the state tree, collect these hook calls and determine
     the state to transition into.
  
     A future optimization would be to build a single chained method out of the collected enters
     and setups. It may also be faster to do a two level cache (from: { to }) instead of caching based
     on a key that adds the two together.
   */
  var TransitionChainMap = Object.create(null);

  var _extractPivotNameCache = Object.create(null);
  var _splitOnDotCache = Object.create(null);

  function splitOnDot(name) {
    return _splitOnDotCache[name] || (_splitOnDotCache[name] = name.split('.'));
  }

  function extractPivotName(name) {
    return _extractPivotNameCache[name] || (_extractPivotNameCache[name] = splitOnDot(name)[0]);
  }

  function areAllModelsUnloaded(internalModels) {
    for (var i = 0; i < internalModels.length; ++i) {
      var record = internalModels[i]._record;
      if (record && !(record.get('isDestroyed') || record.get('isDestroying'))) {
        return false;
      }
    }
    return true;
  }

  function destroyRelationship(rel) {
    if (rel._inverseIsAsync()) {
      rel.removeInternalModelFromInverse(rel.inverseInternalModel);
      rel.removeInverseRelationships();
    } else {
      rel.removeCompletelyFromInverse();
    }
  }
  // this (and all heimdall instrumentation) will be stripped by a babel transform
  //  https://github.com/heimdalljs/babel5-plugin-strip-heimdall


  var InternalModelReferenceId = 1;
  var nextBfsId = 1;

  /*
    `InternalModel` is the Model class that we use internally inside Ember Data to represent models.
    Internal ED methods should only deal with `InternalModel` objects. It is a fast, plain Javascript class.
  
    We expose `DS.Model` to application code, by materializing a `DS.Model` from `InternalModel` lazily, as
    a performance optimization.
  
    `InternalModel` should never be exposed to application code. At the boundaries of the system, in places
    like `find`, `push`, etc. we convert between Models and InternalModels.
  
    We need to make sure that the properties from `InternalModel` are correctly exposed/proxied on `Model`
    if they are needed.
  
    @private
    @class InternalModel
  */

  var InternalModel = function () {
    function InternalModel(modelName, id, store, data) {
      _classCallCheck(this, InternalModel);

      this.id = id;

      // this ensure ordered set can quickly identify this as unique
      this[Ember.GUID_KEY] = InternalModelReferenceId++ + 'internal-model';

      this.store = store;
      this.modelName = modelName;
      this._loadingPromise = null;
      this._record = null;
      this._isDestroyed = false;
      this.isError = false;
      this._isUpdatingRecordArrays = false; // used by the recordArrayManager

      // During dematerialization we don't want to rematerialize the record.  The
      // reason this might happen is that dematerialization removes records from
      // record arrays,  and Ember arrays will always `objectAt(0)` and
      // `objectAt(len - 1)` to test whether or not `firstObject` or `lastObject`
      // have changed.
      this._isDematerializing = false;
      this._scheduledDestroy = null;

      this.resetRecord();

      if (data) {
        this.__data = data;
      }

      // caches for lazy getters
      this._modelClass = null;
      this.__deferredTriggers = null;
      this.__recordArrays = null;
      this._references = null;
      this._recordReference = null;
      this.__relationships = null;
      this.__implicitRelationships = null;

      // Used during the mark phase of unloading to avoid checking the same internal
      // model twice in the same scan
      this._bfsId = 0;
    }

    InternalModel.prototype.isHiddenFromRecordArrays = function isHiddenFromRecordArrays() {
      // During dematerialization we don't want to rematerialize the record.
      // recordWasDeleted can cause other records to rematerialize because it
      // removes the internal model from the array and Ember arrays will always
      // `objectAt(0)` and `objectAt(len -1)` to check whether `firstObject` or
      // `lastObject` have changed.  When this happens we don't want those
      // models to rematerialize their records.

      return this._isDematerializing || this.isDestroyed || this.currentState.stateName === 'root.deleted.saved' || this.isEmpty();
    };

    InternalModel.prototype.isEmpty = function isEmpty() {
      return this.currentState.isEmpty;
    };

    InternalModel.prototype.isLoading = function isLoading() {
      return this.currentState.isLoading;
    };

    InternalModel.prototype.isLoaded = function isLoaded() {
      return this.currentState.isLoaded;
    };

    InternalModel.prototype.hasDirtyAttributes = function hasDirtyAttributes() {
      return this.currentState.hasDirtyAttributes;
    };

    InternalModel.prototype.isSaving = function isSaving() {
      return this.currentState.isSaving;
    };

    InternalModel.prototype.isDeleted = function isDeleted() {
      return this.currentState.isDeleted;
    };

    InternalModel.prototype.isNew = function isNew() {
      return this.currentState.isNew;
    };

    InternalModel.prototype.isValid = function isValid() {
      return this.currentState.isValid;
    };

    InternalModel.prototype.dirtyType = function dirtyType() {
      return this.currentState.dirtyType;
    };

    InternalModel.prototype.getRecord = function getRecord(properties) {
      if (!this._record && !this._isDematerializing) {

        // lookupFactory should really return an object that creates
        // instances with the injections applied
        var createOptions = {
          store: this.store,
          _internalModel: this,
          id: this.id,
          currentState: this.currentState,
          isError: this.isError,
          adapterError: this.error
        };

        if (typeof properties === 'object' && properties !== null) {
          emberAssign(createOptions, properties);
        }

        if (setOwner) {
          // ensure that `getOwner(this)` works inside a model instance
          setOwner(createOptions, (0, _utils.getOwner)(this.store));
        } else {
          createOptions.container = this.store.container;
        }

        this._record = this.store.modelFactoryFor(this.modelName).create(createOptions);

        this._triggerDeferredTriggers();
      }

      return this._record;
    };

    InternalModel.prototype.resetRecord = function resetRecord() {
      this._record = null;
      this.isReloading = false;
      this.error = null;
      this.currentState = _states.default.empty;
      this.__attributes = null;
      this.__inFlightAttributes = null;
      this._data = null;
    };

    InternalModel.prototype.dematerializeRecord = function dematerializeRecord() {
      if (this._record) {
        this._isDematerializing = true;
        this._record.destroy();
        this.destroyRelationships();
        this.updateRecordArrays();
        this.resetRecord();
      }
    };

    InternalModel.prototype.deleteRecord = function deleteRecord() {
      this.send('deleteRecord');
    };

    InternalModel.prototype.save = function save(options) {
      var promiseLabel = "DS: Model#save " + this;
      var resolver = RSVP.defer(promiseLabel);

      this.store.scheduleSave(this, resolver, options);
      return resolver.promise;
    };

    InternalModel.prototype.startedReloading = function startedReloading() {
      this.isReloading = true;
      if (this.hasRecord) {
        set(this._record, 'isReloading', true);
      }
    };

    InternalModel.prototype.finishedReloading = function finishedReloading() {
      this.isReloading = false;
      if (this.hasRecord) {
        set(this._record, 'isReloading', false);
      }
    };

    InternalModel.prototype.reload = function reload() {
      this.startedReloading();
      var internalModel = this;
      var promiseLabel = "DS: Model#reload of " + this;

      return new Promise(function (resolve) {
        internalModel.send('reloadRecord', resolve);
      }, promiseLabel).then(function () {
        internalModel.didCleanError();
        return internalModel;
      }, function (error) {
        internalModel.didError(error);
        throw error;
      }, "DS: Model#reload complete, update flags").finally(function () {
        internalModel.finishedReloading();
        internalModel.updateRecordArrays();
      });
    };

    InternalModel.prototype._directlyRelatedInternalModels = function _directlyRelatedInternalModels() {
      var array = [];
      this._relationships.forEach(function (name, rel) {
        array = array.concat(rel.members.list, rel.canonicalMembers.list);
      });
      return array;
    };

    InternalModel.prototype._allRelatedInternalModels = function _allRelatedInternalModels() {
      var array = [];
      var queue = [];
      var bfsId = nextBfsId++;
      queue.push(this);
      this._bfsId = bfsId;
      while (queue.length > 0) {
        var node = queue.shift();
        array.push(node);
        var related = node._directlyRelatedInternalModels();
        for (var i = 0; i < related.length; ++i) {
          var internalModel = related[i];
          (false && Ember.assert('Internal Error: seen a future bfs iteration', internalModel._bfsId <= bfsId));

          if (internalModel._bfsId < bfsId) {
            queue.push(internalModel);
            internalModel._bfsId = bfsId;
          }
        }
      }
      return array;
    };

    InternalModel.prototype.unloadRecord = function unloadRecord() {
      if (this.isDestroyed) {
        return;
      }
      this.send('unloadRecord');
      this.dematerializeRecord();

      if (this._scheduledDestroy === null) {
        // TODO: use run.schedule once we drop 1.13
        if (!run.currentRunLoop) {
          (false && Ember.assert('You have turned on testing mode, which disabled the run-loop\'s autorun.\n                  You will need to wrap any code with asynchronous side-effects in a run', Ember.testing));
        }
        this._scheduledDestroy = run.backburner.schedule('destroy', this, '_checkForOrphanedInternalModels');
      }
    };

    InternalModel.prototype.hasScheduledDestroy = function hasScheduledDestroy() {
      return !!this._scheduledDestroy;
    };

    InternalModel.prototype.cancelDestroy = function cancelDestroy() {
      (false && Ember.assert('You cannot cancel the destruction of an InternalModel once it has already been destroyed', !this.isDestroyed));


      this._isDematerializing = false;
      run.cancel(this._scheduledDestroy);
      this._scheduledDestroy = null;
    };

    InternalModel.prototype.destroySync = function destroySync() {
      if (this._isDematerializing) {
        this.cancelDestroy();
      }
      this._checkForOrphanedInternalModels();
      if (this.isDestroyed || this.isDestroying) {
        return;
      }

      // just in-case we are not one of the orphaned, we should still
      // still destroy ourselves
      this.destroy();
    };

    InternalModel.prototype._checkForOrphanedInternalModels = function _checkForOrphanedInternalModels() {
      this._isDematerializing = false;
      this._scheduledDestroy = null;
      if (this.isDestroyed) {
        return;
      }

      this._cleanupOrphanedInternalModels();
    };

    InternalModel.prototype._cleanupOrphanedInternalModels = function _cleanupOrphanedInternalModels() {
      var relatedInternalModels = this._allRelatedInternalModels();
      if (areAllModelsUnloaded(relatedInternalModels)) {
        for (var i = 0; i < relatedInternalModels.length; ++i) {
          var internalModel = relatedInternalModels[i];
          if (!internalModel.isDestroyed) {
            internalModel.destroy();
          }
        }
      }
    };

    InternalModel.prototype.eachRelationship = function eachRelationship(callback, binding) {
      return this.modelClass.eachRelationship(callback, binding);
    };

    InternalModel.prototype.destroy = function destroy() {
      (false && Ember.assert("Cannot destroy an internalModel while its record is materialized", !this._record || this._record.get('isDestroyed') || this._record.get('isDestroying')));


      this.store._internalModelDestroyed(this);

      this._relationships.forEach(function (name, rel) {
        return rel.destroy();
      });

      this._isDestroyed = true;
    };

    InternalModel.prototype.eachAttribute = function eachAttribute(callback, binding) {
      return this.modelClass.eachAttribute(callback, binding);
    };

    InternalModel.prototype.inverseFor = function inverseFor(key) {
      return this.modelClass.inverseFor(key);
    };

    InternalModel.prototype.setupData = function setupData(data) {
      this.store._internalModelDidReceiveRelationshipData(this.modelName, this.id, data.relationships);

      var changedKeys = void 0;

      if (this.hasRecord) {
        changedKeys = this._changedKeys(data.attributes);
      }

      emberAssign(this._data, data.attributes);
      this.pushedData();

      if (this.hasRecord) {
        this._record._notifyProperties(changedKeys);
      }
    };

    InternalModel.prototype.createSnapshot = function createSnapshot(options) {
      return new _snapshot.default(this, options);
    };

    InternalModel.prototype.loadingData = function loadingData(promise) {
      this.send('loadingData', promise);
    };

    InternalModel.prototype.loadedData = function loadedData() {
      this.send('loadedData');
    };

    InternalModel.prototype.notFound = function notFound() {
      this.send('notFound');
    };

    InternalModel.prototype.pushedData = function pushedData() {
      this.send('pushedData');
    };

    InternalModel.prototype.flushChangedAttributes = function flushChangedAttributes() {
      this._inFlightAttributes = this._attributes;
      this._attributes = null;
    };

    InternalModel.prototype.hasChangedAttributes = function hasChangedAttributes() {
      return this.__attributes !== null && Object.keys(this.__attributes).length > 0;
    };

    InternalModel.prototype.updateChangedAttributes = function updateChangedAttributes() {
      var changedAttributes = this.changedAttributes();
      var changedAttributeNames = Object.keys(changedAttributes);
      var attrs = this._attributes;

      for (var i = 0, length = changedAttributeNames.length; i < length; i++) {
        var attribute = changedAttributeNames[i];
        var data = changedAttributes[attribute];
        var oldData = data[0];
        var newData = data[1];

        if (oldData === newData) {
          delete attrs[attribute];
        }
      }
    };

    InternalModel.prototype.changedAttributes = function changedAttributes() {
      var oldData = this._data;
      var currentData = this._attributes;
      var inFlightData = this._inFlightAttributes;
      var newData = emberAssign(copy(inFlightData), currentData);
      var diffData = Object.create(null);
      var newDataKeys = Object.keys(newData);

      for (var i = 0, length = newDataKeys.length; i < length; i++) {
        var key = newDataKeys[i];
        diffData[key] = [oldData[key], newData[key]];
      }

      return diffData;
    };

    InternalModel.prototype.adapterWillCommit = function adapterWillCommit() {
      this.send('willCommit');
    };

    InternalModel.prototype.adapterDidDirty = function adapterDidDirty() {
      this.send('becomeDirty');
      this.updateRecordArrays();
    };

    InternalModel.prototype.send = function send(name, context) {
      var currentState = this.currentState;

      if (!currentState[name]) {
        this._unhandledEvent(currentState, name, context);
      }

      return currentState[name](this, context);
    };

    InternalModel.prototype.notifyHasManyAdded = function notifyHasManyAdded(key, record, idx) {
      if (this.hasRecord) {
        this._record.notifyHasManyAdded(key, record, idx);
      }
    };

    InternalModel.prototype.notifyBelongsToChanged = function notifyBelongsToChanged(key, record) {
      if (this.hasRecord) {
        this._record.notifyBelongsToChanged(key, record);
      }
    };

    InternalModel.prototype.notifyPropertyChange = function notifyPropertyChange(key) {
      if (this.hasRecord) {
        this._record.notifyPropertyChange(key);
      }
    };

    InternalModel.prototype.rollbackAttributes = function rollbackAttributes() {
      var dirtyKeys = void 0;
      if (this.hasChangedAttributes()) {
        dirtyKeys = Object.keys(this._attributes);
        this._attributes = null;
      }

      if (get(this, 'isError')) {
        this._inFlightAttributes = null;
        this.didCleanError();
      }

      if (this.isNew()) {
        this.removeFromInverseRelationships(true);
      }

      if (this.isValid()) {
        this._inFlightAttributes = null;
      }

      this.send('rolledBack');

      if (dirtyKeys && dirtyKeys.length > 0) {
        this._record._notifyProperties(dirtyKeys);
      }
    };

    InternalModel.prototype.transitionTo = function transitionTo(name) {
      // POSSIBLE TODO: Remove this code and replace with
      // always having direct reference to state objects

      var pivotName = extractPivotName(name);
      var state = this.currentState;
      var transitionMapId = state.stateName + '->' + name;

      do {
        if (state.exit) {
          state.exit(this);
        }
        state = state.parentState;
      } while (!state[pivotName]);

      var setups = void 0;
      var enters = void 0;
      var i = void 0;
      var l = void 0;
      var map = TransitionChainMap[transitionMapId];

      if (map) {
        setups = map.setups;
        enters = map.enters;
        state = map.state;
      } else {
        setups = [];
        enters = [];

        var path = splitOnDot(name);

        for (i = 0, l = path.length; i < l; i++) {
          state = state[path[i]];

          if (state.enter) {
            enters.push(state);
          }
          if (state.setup) {
            setups.push(state);
          }
        }

        TransitionChainMap[transitionMapId] = { setups: setups, enters: enters, state: state };
      }

      for (i = 0, l = enters.length; i < l; i++) {
        enters[i].enter(this);
      }

      this.currentState = state;
      if (this.hasRecord) {
        set(this._record, 'currentState', state);
      }

      for (i = 0, l = setups.length; i < l; i++) {
        setups[i].setup(this);
      }

      this.updateRecordArrays();
    };

    InternalModel.prototype._unhandledEvent = function _unhandledEvent(state, name, context) {
      var errorMessage = "Attempted to handle event `" + name + "` ";
      errorMessage += "on " + String(this) + " while in state ";
      errorMessage += state.stateName + ". ";

      if (context !== undefined) {
        errorMessage += "Called with " + inspect(context) + ".";
      }

      throw new EmberError(errorMessage);
    };

    InternalModel.prototype.triggerLater = function triggerLater() {
      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      if (this._deferredTriggers.push(args) !== 1) {
        return;
      }

      this.store._updateInternalModel(this);
    };

    InternalModel.prototype._triggerDeferredTriggers = function _triggerDeferredTriggers() {
      //TODO: Before 1.0 we want to remove all the events that happen on the pre materialized record,
      //but for now, we queue up all the events triggered before the record was materialized, and flush
      //them once we have the record
      if (!this.hasRecord) {
        return;
      }
      var triggers = this._deferredTriggers;
      var record = this._record;
      var trigger = record.trigger;
      for (var i = 0, l = triggers.length; i < l; i++) {
        trigger.apply(record, triggers[i]);
      }

      triggers.length = 0;
    };

    InternalModel.prototype.removeFromInverseRelationships = function removeFromInverseRelationships() {
      var isNew = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

      this._relationships.forEach(function (name, rel) {
        rel.removeCompletelyFromInverse();
        if (isNew === true) {
          rel.clear();
        }
      });

      var implicitRelationships = this._implicitRelationships;
      this.__implicitRelationships = null;

      Object.keys(implicitRelationships).forEach(function (key) {
        var rel = implicitRelationships[key];

        rel.removeCompletelyFromInverse();
        if (isNew === true) {
          rel.clear();
        }
      });
    };

    InternalModel.prototype.destroyRelationships = function destroyRelationships() {
      var relationships = this._relationships;
      relationships.forEach(function (name, rel) {
        return destroyRelationship(rel);
      });

      var implicitRelationships = this._implicitRelationships;
      this.__implicitRelationships = null;
      Object.keys(implicitRelationships).forEach(function (key) {
        var rel = implicitRelationships[key];

        destroyRelationship(rel);

        rel.destroy();
      });
    };

    InternalModel.prototype.preloadData = function preloadData(preload) {
      var _this = this;

      //TODO(Igor) consider the polymorphic case
      Object.keys(preload).forEach(function (key) {
        var preloadValue = get(preload, key);
        var relationshipMeta = _this.modelClass.metaForProperty(key);
        if (relationshipMeta.isRelationship) {
          _this._preloadRelationship(key, preloadValue);
        } else {
          _this._data[key] = preloadValue;
        }
      });
    };

    InternalModel.prototype._preloadRelationship = function _preloadRelationship(key, preloadValue) {
      var relationshipMeta = this.modelClass.metaForProperty(key);
      var modelClass = relationshipMeta.type;
      if (relationshipMeta.kind === 'hasMany') {
        this._preloadHasMany(key, preloadValue, modelClass);
      } else {
        this._preloadBelongsTo(key, preloadValue, modelClass);
      }
    };

    InternalModel.prototype._preloadHasMany = function _preloadHasMany(key, preloadValue, modelClass) {
      (false && Ember.assert("You need to pass in an array to set a hasMany property on a record", Array.isArray(preloadValue)));

      var recordsToSet = new Array(preloadValue.length);

      for (var i = 0; i < preloadValue.length; i++) {
        var recordToPush = preloadValue[i];
        recordsToSet[i] = this._convertStringOrNumberIntoInternalModel(recordToPush, modelClass);
      }

      //We use the pathway of setting the hasMany as if it came from the adapter
      //because the user told us that they know this relationships exists already
      this._relationships.get(key).updateInternalModelsFromAdapter(recordsToSet);
    };

    InternalModel.prototype._preloadBelongsTo = function _preloadBelongsTo(key, preloadValue, modelClass) {
      var internalModelToSet = this._convertStringOrNumberIntoInternalModel(preloadValue, modelClass);

      //We use the pathway of setting the hasMany as if it came from the adapter
      //because the user told us that they know this relationships exists already
      this._relationships.get(key).setInternalModel(internalModelToSet);
    };

    InternalModel.prototype._convertStringOrNumberIntoInternalModel = function _convertStringOrNumberIntoInternalModel(value, modelClass) {
      if (typeof value === 'string' || typeof value === 'number') {
        return this.store._internalModelForId(modelClass, value);
      }
      if (value._internalModel) {
        return value._internalModel;
      }
      return value;
    };

    InternalModel.prototype.updateRecordArrays = function updateRecordArrays() {
      this.store.recordArrayManager.recordDidChange(this);
    };

    InternalModel.prototype.setId = function setId(id) {
      (false && Ember.assert('A record\'s id cannot be changed once it is in the loaded state', this.id === null || this.id === id || this.isNew()));

      this.id = id;
      if (this._record.get('id') !== id) {
        this._record.set('id', id);
      }
    };

    InternalModel.prototype.didError = function didError(error) {
      this.error = error;
      this.isError = true;

      if (this.hasRecord) {
        this._record.setProperties({
          isError: true,
          adapterError: error
        });
      }
    };

    InternalModel.prototype.didCleanError = function didCleanError() {
      this.error = null;
      this.isError = false;

      if (this.hasRecord) {
        this._record.setProperties({
          isError: false,
          adapterError: null
        });
      }
    };

    InternalModel.prototype.adapterDidCommit = function adapterDidCommit(data) {
      if (data) {
        this.store._internalModelDidReceiveRelationshipData(this.modelName, this.id, data.relationships);

        data = data.attributes;
      }

      this.didCleanError();
      var changedKeys = this._changedKeys(data);

      emberAssign(this._data, this._inFlightAttributes);
      if (data) {
        emberAssign(this._data, data);
      }

      this._inFlightAttributes = null;

      this.send('didCommit');
      this.updateRecordArrays();

      if (!data) {
        return;
      }

      this._record._notifyProperties(changedKeys);
    };

    InternalModel.prototype.addErrorMessageToAttribute = function addErrorMessageToAttribute(attribute, message) {
      get(this.getRecord(), 'errors')._add(attribute, message);
    };

    InternalModel.prototype.removeErrorMessageFromAttribute = function removeErrorMessageFromAttribute(attribute) {
      get(this.getRecord(), 'errors')._remove(attribute);
    };

    InternalModel.prototype.clearErrorMessages = function clearErrorMessages() {
      get(this.getRecord(), 'errors')._clear();
    };

    InternalModel.prototype.hasErrors = function hasErrors() {
      var errors = get(this.getRecord(), 'errors');

      return !isEmpty(errors);
    };

    InternalModel.prototype.adapterDidInvalidate = function adapterDidInvalidate(errors) {
      var attribute = void 0;

      for (attribute in errors) {
        if (errors.hasOwnProperty(attribute)) {
          this.addErrorMessageToAttribute(attribute, errors[attribute]);
        }
      }

      this.send('becameInvalid');

      this._saveWasRejected();
    };

    InternalModel.prototype.adapterDidError = function adapterDidError(error) {
      this.send('becameError');
      this.didError(error);
      this._saveWasRejected();
    };

    InternalModel.prototype._saveWasRejected = function _saveWasRejected() {
      var keys = Object.keys(this._inFlightAttributes);
      if (keys.length > 0) {
        var attrs = this._attributes;
        for (var i = 0; i < keys.length; i++) {
          if (attrs[keys[i]] === undefined) {
            attrs[keys[i]] = this._inFlightAttributes[keys[i]];
          }
        }
      }
      this._inFlightAttributes = null;
    };

    InternalModel.prototype._changedKeys = function _changedKeys(updates) {
      var changedKeys = [];

      if (updates) {
        var original = void 0,
            i = void 0,
            value = void 0,
            key = void 0;
        var keys = Object.keys(updates);
        var length = keys.length;
        var hasAttrs = this.hasChangedAttributes();
        var attrs = void 0;
        if (hasAttrs) {
          attrs = this._attributes;
        }

        original = emberAssign(Object.create(null), this._data);
        original = emberAssign(original, this._inFlightAttributes);

        for (i = 0; i < length; i++) {
          key = keys[i];
          value = updates[key];

          // A value in _attributes means the user has a local change to
          // this attributes. We never override this value when merging
          // updates from the backend so we should not sent a change
          // notification if the server value differs from the original.
          if (hasAttrs === true && attrs[key] !== undefined) {
            continue;
          }

          if (!isEqual(original[key], value)) {
            changedKeys.push(key);
          }
        }
      }

      return changedKeys;
    };

    InternalModel.prototype.toString = function toString() {
      return '<' + this.modelName + ':' + this.id + '>';
    };

    InternalModel.prototype.referenceFor = function referenceFor(kind, name) {
      var reference = this.references[name];

      if (!reference) {
        var relationship = this._relationships.get(name);

        if (false) {
          var modelName = this.modelName;
          (false && Ember.assert('There is no ' + kind + ' relationship named \'' + name + '\' on a model of modelClass \'' + modelName + '\'', relationship));


          var actualRelationshipKind = relationship.relationshipMeta.kind;
          (false && Ember.assert('You tried to get the \'' + name + '\' relationship on a \'' + modelName + '\' via record.' + kind + '(\'' + name + '\'), but the relationship is of kind \'' + actualRelationshipKind + '\'. Use record.' + actualRelationshipKind + '(\'' + name + '\') instead.', actualRelationshipKind === kind));
        }

        if (kind === "belongsTo") {
          reference = new _references.BelongsToReference(this.store, this, relationship);
        } else if (kind === "hasMany") {
          reference = new _references.HasManyReference(this.store, this, relationship);
        }

        this.references[name] = reference;
      }

      return reference;
    };

    _createClass(InternalModel, [{
      key: 'modelClass',
      get: function () {
        return this._modelClass || (this._modelClass = this.store._modelFor(this.modelName));
      }
    }, {
      key: 'type',
      get: function () {
        return this.modelClass;
      }
    }, {
      key: 'recordReference',
      get: function () {
        if (this._recordReference === null) {
          this._recordReference = new _references.RecordReference(this.store, this);
        }
        return this._recordReference;
      }
    }, {
      key: '_recordArrays',
      get: function () {
        if (this.__recordArrays === null) {
          this.__recordArrays = _orderedSet.default.create();
        }
        return this.__recordArrays;
      }
    }, {
      key: 'references',
      get: function () {
        if (this._references === null) {
          this._references = Object.create(null);
        }
        return this._references;
      }
    }, {
      key: '_deferredTriggers',
      get: function () {
        if (this.__deferredTriggers === null) {
          this.__deferredTriggers = [];
        }
        return this.__deferredTriggers;
      }
    }, {
      key: '_attributes',
      get: function () {
        if (this.__attributes === null) {
          this.__attributes = Object.create(null);
        }
        return this.__attributes;
      },
      set: function (v) {
        this.__attributes = v;
      }
    }, {
      key: '_relationships',
      get: function () {
        if (this.__relationships === null) {
          this.__relationships = new _create.default(this);
        }

        return this.__relationships;
      }
    }, {
      key: '_inFlightAttributes',
      get: function () {
        if (this.__inFlightAttributes === null) {
          this.__inFlightAttributes = Object.create(null);
        }
        return this.__inFlightAttributes;
      },
      set: function (v) {
        this.__inFlightAttributes = v;
      }
    }, {
      key: '_data',
      get: function () {
        if (this.__data === null) {
          this.__data = Object.create(null);
        }
        return this.__data;
      },
      set: function (v) {
        this.__data = v;
      }
    }, {
      key: '_implicitRelationships',
      get: function () {
        if (this.__implicitRelationships === null) {
          this.__implicitRelationships = Object.create(null);
        }
        return this.__implicitRelationships;
      }
    }, {
      key: 'isDestroyed',
      get: function () {
        return this._isDestroyed;
      }
    }, {
      key: 'hasRecord',
      get: function () {
        return !!this._record;
      }
    }]);

    return InternalModel;
  }();

  exports.default = InternalModel;


  if ((0, _features.default)('ds-rollback-attribute')) {
    /*
       Returns the latest truth for an attribute - the canonical value, or the
       in-flight value.
        @method lastAcknowledgedValue
       @private
    */
    InternalModel.prototype.lastAcknowledgedValue = function lastAcknowledgedValue(key) {
      if (key in this._inFlightAttributes) {
        return this._inFlightAttributes[key];
      } else {
        return this._data[key];
      }
    };
  }
});
define('ember-data/-private/system/model/model', ['exports', 'ember-data/-private/system/promise-proxies', 'ember-data/-private/system/model/errors', 'ember-data/-private/features', 'ember-data/-private/system/model/states', 'ember-data/-private/system/relationships/ext'], function (exports, _promiseProxies, _errors, _features, _states, _ext) {
  'use strict';

  exports.__esModule = true;
  var ComputedProperty = Ember.ComputedProperty;
  var setOwner = Ember.setOwner;
  var isNone = Ember.isNone;
  var EmberError = Ember.Error;
  var Evented = Ember.Evented;
  var EmberObject = Ember.Object;
  var computed = Ember.computed;
  var get = Ember.get;
  var observer = Ember.observer;
  var Map = Ember.Map;


  /**
    @module ember-data
  */

  function findPossibleInverses(type, inverseType, name, relationshipsSoFar) {
    var possibleRelationships = relationshipsSoFar || [];

    var relationshipMap = get(inverseType, 'relationships');
    if (!relationshipMap) {
      return possibleRelationships;
    }

    var relationships = relationshipMap.get(type.modelName).filter(function (relationship) {
      var optionsForRelationship = inverseType.metaForProperty(relationship.name).options;

      if (!optionsForRelationship.inverse) {
        return true;
      }

      return name === optionsForRelationship.inverse;
    });

    if (relationships) {
      possibleRelationships.push.apply(possibleRelationships, relationships);
    }

    //Recurse to support polymorphism
    if (type.superclass) {
      findPossibleInverses(type.superclass, inverseType, name, possibleRelationships);
    }

    return possibleRelationships;
  }

  function intersection(array1, array2) {
    var result = [];
    array1.forEach(function (element) {
      if (array2.indexOf(element) >= 0) {
        result.push(element);
      }
    });

    return result;
  }

  var RESERVED_MODEL_PROPS = ['currentState', 'data', 'store'];

  var retrieveFromCurrentState = computed('currentState', function (key) {
    return get(this._internalModel.currentState, key);
  }).readOnly();

  /**
  
    The model class that all Ember Data records descend from.
    This is the public API of Ember Data models. If you are using Ember Data
    in your application, this is the class you should use.
    If you are working on Ember Data internals, you most likely want to be dealing
    with `InternalModel`
  
    @class Model
    @namespace DS
    @extends Ember.Object
    @uses Ember.Evented
  */
  var Model = EmberObject.extend(Evented, {
    _internalModel: null,
    store: null,
    __defineNonEnumerable: function (property) {
      this[property.name] = property.descriptor.value;
    },


    /**
      If this property is `true` the record is in the `empty`
      state. Empty is the first state all records enter after they have
      been created. Most records created by the store will quickly
      transition to the `loading` state if data needs to be fetched from
      the server or the `created` state if the record is created on the
      client. A record can also enter the empty state if the adapter is
      unable to locate the record.
       @property isEmpty
      @type {Boolean}
      @readOnly
    */
    isEmpty: retrieveFromCurrentState,
    /**
      If this property is `true` the record is in the `loading` state. A
      record enters this state when the store asks the adapter for its
      data. It remains in this state until the adapter provides the
      requested data.
       @property isLoading
      @type {Boolean}
      @readOnly
    */
    isLoading: retrieveFromCurrentState,
    /**
      If this property is `true` the record is in the `loaded` state. A
      record enters this state when its data is populated. Most of a
      record's lifecycle is spent inside substates of the `loaded`
      state.
       Example
       ```javascript
      let record = store.createRecord('model');
      record.get('isLoaded'); // true
       store.findRecord('model', 1).then(function(model) {
        model.get('isLoaded'); // true
      });
      ```
       @property isLoaded
      @type {Boolean}
      @readOnly
    */
    isLoaded: retrieveFromCurrentState,
    /**
      If this property is `true` the record is in the `dirty` state. The
      record has local changes that have not yet been saved by the
      adapter. This includes records that have been created (but not yet
      saved) or deleted.
       Example
       ```javascript
      let record = store.createRecord('model');
      record.get('hasDirtyAttributes'); // true
       store.findRecord('model', 1).then(function(model) {
        model.get('hasDirtyAttributes'); // false
        model.set('foo', 'some value');
        model.get('hasDirtyAttributes'); // true
      });
      ```
       @since 1.13.0
      @property hasDirtyAttributes
      @type {Boolean}
      @readOnly
    */
    hasDirtyAttributes: computed('currentState.isDirty', function () {
      return this.get('currentState.isDirty');
    }),
    /**
      If this property is `true` the record is in the `saving` state. A
      record enters the saving state when `save` is called, but the
      adapter has not yet acknowledged that the changes have been
      persisted to the backend.
       Example
       ```javascript
      let record = store.createRecord('model');
      record.get('isSaving'); // false
      let promise = record.save();
      record.get('isSaving'); // true
      promise.then(function() {
        record.get('isSaving'); // false
      });
      ```
       @property isSaving
      @type {Boolean}
      @readOnly
    */
    isSaving: retrieveFromCurrentState,
    /**
      If this property is `true` the record is in the `deleted` state
      and has been marked for deletion. When `isDeleted` is true and
      `hasDirtyAttributes` is true, the record is deleted locally but the deletion
      was not yet persisted. When `isSaving` is true, the change is
      in-flight. When both `hasDirtyAttributes` and `isSaving` are false, the
      change has persisted.
       Example
       ```javascript
      let record = store.createRecord('model');
      record.get('isDeleted');    // false
      record.deleteRecord();
       // Locally deleted
      record.get('isDeleted');           // true
      record.get('hasDirtyAttributes');  // true
      record.get('isSaving');            // false
       // Persisting the deletion
      let promise = record.save();
      record.get('isDeleted');    // true
      record.get('isSaving');     // true
       // Deletion Persisted
      promise.then(function() {
        record.get('isDeleted');          // true
        record.get('isSaving');           // false
        record.get('hasDirtyAttributes'); // false
      });
      ```
       @property isDeleted
      @type {Boolean}
      @readOnly
    */
    isDeleted: retrieveFromCurrentState,
    /**
      If this property is `true` the record is in the `new` state. A
      record will be in the `new` state when it has been created on the
      client and the adapter has not yet report that it was successfully
      saved.
       Example
       ```javascript
      let record = store.createRecord('model');
      record.get('isNew'); // true
       record.save().then(function(model) {
        model.get('isNew'); // false
      });
      ```
       @property isNew
      @type {Boolean}
      @readOnly
    */
    isNew: retrieveFromCurrentState,
    /**
      If this property is `true` the record is in the `valid` state.
       A record will be in the `valid` state when the adapter did not report any
      server-side validation failures.
       @property isValid
      @type {Boolean}
      @readOnly
    */
    isValid: retrieveFromCurrentState,
    /**
      If the record is in the dirty state this property will report what
      kind of change has caused it to move into the dirty
      state. Possible values are:
       - `created` The record has been created by the client and not yet saved to the adapter.
      - `updated` The record has been updated by the client and not yet saved to the adapter.
      - `deleted` The record has been deleted by the client and not yet saved to the adapter.
       Example
       ```javascript
      let record = store.createRecord('model');
      record.get('dirtyType'); // 'created'
      ```
       @property dirtyType
      @type {String}
      @readOnly
    */
    dirtyType: retrieveFromCurrentState,

    /**
      If `true` the adapter reported that it was unable to save local
      changes to the backend for any reason other than a server-side
      validation error.
       Example
       ```javascript
      record.get('isError'); // false
      record.set('foo', 'valid value');
      record.save().then(null, function() {
        record.get('isError'); // true
      });
      ```
       @property isError
      @type {Boolean}
      @readOnly
    */
    isError: false,

    /**
      If `true` the store is attempting to reload the record from the adapter.
       Example
       ```javascript
      record.get('isReloading'); // false
      record.reload();
      record.get('isReloading'); // true
      ```
       @property isReloading
      @type {Boolean}
      @readOnly
    */
    isReloading: false,

    /**
      All ember models have an id property. This is an identifier
      managed by an external source. These are always coerced to be
      strings before being used internally. Note when declaring the
      attributes for a model it is an error to declare an id
      attribute.
       ```javascript
      let record = store.createRecord('model');
      record.get('id'); // null
       store.findRecord('model', 1).then(function(model) {
        model.get('id'); // '1'
      });
      ```
       @property id
      @type {String}
    */
    id: null,

    /**
      @property currentState
      @private
      @type {Object}
    */
    currentState: _states.default.empty,

    /**
      When the record is in the `invalid` state this object will contain
      any errors returned by the adapter. When present the errors hash
      contains keys corresponding to the invalid property names
      and values which are arrays of Javascript objects with two keys:
       - `message` A string containing the error message from the backend
      - `attribute` The name of the property associated with this error message
       ```javascript
      record.get('errors.length'); // 0
      record.set('foo', 'invalid value');
      record.save().catch(function() {
        record.get('errors').get('foo');
        // [{message: 'foo should be a number.', attribute: 'foo'}]
      });
      ```
       The `errors` property us useful for displaying error messages to
      the user.
       ```handlebars
      <label>Username: {{input value=username}} </label>
      {{#each model.errors.username as |error|}}
        <div class="error">
          {{error.message}}
        </div>
      {{/each}}
      <label>Email: {{input value=email}} </label>
      {{#each model.errors.email as |error|}}
        <div class="error">
          {{error.message}}
        </div>
      {{/each}}
      ```
        You can also access the special `messages` property on the error
      object to get an array of all the error strings.
       ```handlebars
      {{#each model.errors.messages as |message|}}
        <div class="error">
          {{message}}
        </div>
      {{/each}}
      ```
       @property errors
      @type {DS.Errors}
    */
    errors: computed(function () {
      var errors = _errors.default.create();

      errors._registerHandlers(this._internalModel, function () {
        this.send('becameInvalid');
      }, function () {
        this.send('becameValid');
      });
      return errors;
    }).readOnly(),

    /**
      This property holds the `DS.AdapterError` object with which
      last adapter operation was rejected.
       @property adapterError
      @type {DS.AdapterError}
    */
    adapterError: null,

    serialize: function (options) {
      return this._internalModel.createSnapshot().serialize(options);
    },
    toJSON: function (options) {
      // container is for lazy transform lookups
      var serializer = this.store.serializerFor('-default');
      var snapshot = this._internalModel.createSnapshot();

      return serializer.serialize(snapshot, options);
    },


    /**
      Fired when the record is ready to be interacted with,
      that is either loaded from the server or created locally.
       @event ready
    */
    ready: null,

    /**
      Fired when the record is loaded from the server.
       @event didLoad
    */
    didLoad: null,

    /**
      Fired when the record is updated.
       @event didUpdate
    */
    didUpdate: null,

    /**
      Fired when a new record is commited to the server.
       @event didCreate
    */
    didCreate: null,

    /**
      Fired when the record is deleted.
       @event didDelete
    */
    didDelete: null,

    /**
      Fired when the record becomes invalid.
       @event becameInvalid
    */
    becameInvalid: null,

    /**
      Fired when the record enters the error state.
       @event becameError
    */
    becameError: null,

    /**
      Fired when the record is rolled back.
       @event rolledBack
    */
    rolledBack: null,

    send: function (name, context) {
      return this._internalModel.send(name, context);
    },
    transitionTo: function (name) {
      return this._internalModel.transitionTo(name);
    },
    deleteRecord: function () {
      this._internalModel.deleteRecord();
    },
    destroyRecord: function (options) {
      this.deleteRecord();
      return this.save(options);
    },
    unloadRecord: function () {
      if (this.isDestroyed) {
        return;
      }
      this._internalModel.unloadRecord();
    },
    _notifyProperties: function (keys) {
      Ember.beginPropertyChanges();
      var key = void 0;
      for (var i = 0, length = keys.length; i < length; i++) {
        key = keys[i];
        this.notifyPropertyChange(key);
      }
      Ember.endPropertyChanges();
    },
    changedAttributes: function () {
      return this._internalModel.changedAttributes();
    },
    rollbackAttributes: function () {
      this._internalModel.rollbackAttributes();
    },
    _createSnapshot: function () {
      return this._internalModel.createSnapshot();
    },
    toStringExtension: function () {
      return get(this, 'id');
    },
    save: function (options) {
      var _this = this;

      return _promiseProxies.PromiseObject.create({
        promise: this._internalModel.save(options).then(function () {
          return _this;
        })
      });
    },
    reload: function () {
      var _this2 = this;

      return _promiseProxies.PromiseObject.create({
        promise: this._internalModel.reload().then(function () {
          return _this2;
        })
      });
    },
    trigger: function (name) {
      var fn = this[name];

      if (typeof fn === 'function') {
        var length = arguments.length;
        var args = new Array(length - 1);

        for (var i = 1; i < length; i++) {
          args[i - 1] = arguments[i];
        }
        fn.apply(this, args);
      }

      this._super.apply(this, arguments);
    },
    attr: function () {
      (false && Ember.assert("The `attr` method is not available on DS.Model, a DS.Snapshot was probably expected. Are you passing a DS.Model instead of a DS.Snapshot to your serializer?", false));
    },
    belongsTo: function (name) {
      return this._internalModel.referenceFor('belongsTo', name);
    },
    hasMany: function (name) {
      return this._internalModel.referenceFor('hasMany', name);
    },


    setId: observer('id', function () {
      this._internalModel.setId(this.get('id'));
    }),

    _debugInfo: function () {
      var attributes = ['id'];
      var relationships = {};
      var expensiveProperties = [];

      this.eachAttribute(function (name, meta) {
        return attributes.push(name);
      });

      var groups = [{
        name: 'Attributes',
        properties: attributes,
        expand: true
      }];

      this.eachRelationship(function (name, relationship) {
        var properties = relationships[relationship.kind];

        if (properties === undefined) {
          properties = relationships[relationship.kind] = [];
          groups.push({
            name: relationship.name,
            properties: properties,
            expand: true
          });
        }
        properties.push(name);
        expensiveProperties.push(name);
      });

      groups.push({
        name: 'Flags',
        properties: ['isLoaded', 'hasDirtyAttributes', 'isSaving', 'isDeleted', 'isError', 'isNew', 'isValid']
      });

      return {
        propertyInfo: {
          // include all other mixins / properties (not just the grouped ones)
          includeOtherProperties: true,
          groups: groups,
          // don't pre-calculate unless cached
          expensiveProperties: expensiveProperties
        }
      };
    },
    notifyBelongsToChanged: function (key) {
      this.notifyPropertyChange(key);
    },
    eachRelationship: function (callback, binding) {
      this.constructor.eachRelationship(callback, binding);
    },
    relationshipFor: function (name) {
      return get(this.constructor, 'relationshipsByName').get(name);
    },
    inverseFor: function (key) {
      return this.constructor.inverseFor(key, this.store);
    },
    notifyHasManyAdded: function (key) {
      //We need to notifyPropertyChange in the adding case because we need to make sure
      //we fetch the newly added record in case it is unloaded
      //TODO(Igor): Consider whether we could do this only if the record state is unloaded

      //Goes away once hasMany is double promisified
      this.notifyPropertyChange(key);
    },
    eachAttribute: function (callback, binding) {
      this.constructor.eachAttribute(callback, binding);
    }
  });

  /**
   @property data
   @private
   @type {Object}
   */
  Object.defineProperty(Model.prototype, 'data', {
    get: function () {
      return this._internalModel._data;
    }
  });

  if (false) {
    Model.reopen({
      init: function () {
        this._super.apply(this, arguments);

        if (!this._internalModel) {
          throw new EmberError('You should not call `create` on a model. Instead, call `store.createRecord` with the attributes you would like to set.');
        }
      }
    });
  }

  Model.reopenClass({
    isModel: true,

    /**
      Override the class' `create()` method to raise an error. This
      prevents end users from inadvertently calling `create()` instead
      of `createRecord()`. The store is still able to create instances
      by calling the `_create()` method. To create an instance of a
      `DS.Model` use [store.createRecord](DS.Store.html#method_createRecord).
       @method create
      @private
      @static
    */
    /**
     Represents the model's class name as a string. This can be used to look up the model's class name through
     `DS.Store`'s modelFor method.
      `modelName` is generated for you by Ember Data. It will be a lowercased, dasherized string.
     For example:
      ```javascript
     store.modelFor('post').modelName; // 'post'
     store.modelFor('blog-post').modelName; // 'blog-post'
     ```
      The most common place you'll want to access `modelName` is in your serializer's `payloadKeyFromModelName` method. For example, to change payload
     keys to underscore (instead of dasherized), you might use the following code:
      ```javascript
     import { underscore } from '@ember/string';
      export default const PostSerializer = DS.RESTSerializer.extend({
       payloadKeyFromModelName(modelName) {
         return underscore(modelName);
       }
     });
     ```
     @property modelName
     @type String
     @readonly
     @static
    */
    modelName: null,

    typeForRelationship: function (name, store) {
      var relationship = get(this, 'relationshipsByName').get(name);
      return relationship && store.modelFor(relationship.type);
    },


    inverseMap: computed(function () {
      return Object.create(null);
    }),

    inverseFor: function (name, store) {
      var inverseMap = get(this, 'inverseMap');
      if (inverseMap[name] !== undefined) {
        return inverseMap[name];
      } else {
        var relationship = get(this, 'relationshipsByName').get(name);
        if (!relationship) {
          inverseMap[name] = null;
          return null;
        }

        var options = relationship.options;
        if (options && options.inverse === null) {
          // populate the cache with a miss entry so we can skip getting and going
          // through `relationshipsByName`
          inverseMap[name] = null;
          return null;
        }

        return inverseMap[name] = this._findInverseFor(name, store);
      }
    },
    _findInverseFor: function (name, store) {

      var inverseType = this.typeForRelationship(name, store);
      if (!inverseType) {
        return null;
      }

      var propertyMeta = this.metaForProperty(name);
      //If inverse is manually specified to be null, like  `comments: DS.hasMany('message', { inverse: null })`
      var options = propertyMeta.options;
      if (options.inverse === null) {
        return null;
      }

      var inverseName = void 0,
          inverseKind = void 0,
          inverse = void 0;

      //If inverse is specified manually, return the inverse
      if (options.inverse) {
        inverseName = options.inverse;
        inverse = get(inverseType, 'relationshipsByName').get(inverseName);

        (false && Ember.assert("We found no inverse relationships by the name of '" + inverseName + "' on the '" + inverseType.modelName + "' model. This is most likely due to a missing attribute on your model definition.", !isNone(inverse)));


        inverseKind = inverse.kind;
      } else {
        //No inverse was specified manually, we need to use a heuristic to guess one
        if (propertyMeta.parentType && propertyMeta.type === propertyMeta.parentType.modelName) {
          (false && Ember.warn('Detected a reflexive relationship by the name of \'' + name + '\' without an inverse option. Look at https://guides.emberjs.com/current/models/relationships/#toc_reflexive-relations for how to explicitly specify inverses.', false, {
            id: 'ds.model.reflexive-relationship-without-inverse'
          }));
        }

        var possibleRelationships = findPossibleInverses(this, inverseType, name);

        if (possibleRelationships.length === 0) {
          return null;
        }

        var filteredRelationships = possibleRelationships.filter(function (possibleRelationship) {
          var optionsForRelationship = inverseType.metaForProperty(possibleRelationship.name).options;
          return name === optionsForRelationship.inverse;
        });

        (false && Ember.assert("You defined the '" + name + "' relationship on " + this + ", but you defined the inverse relationships of type " + inverseType.toString() + " multiple times. Look at https://guides.emberjs.com/current/models/relationships/#toc_explicit-inverses for how to explicitly specify inverses", filteredRelationships.length < 2));


        if (filteredRelationships.length === 1) {
          possibleRelationships = filteredRelationships;
        }

        (false && Ember.assert("You defined the '" + name + "' relationship on " + this + ", but multiple possible inverse relationships of type " + this + " were found on " + inverseType + ". Look at https://guides.emberjs.com/current/models/relationships/#toc_explicit-inverses for how to explicitly specify inverses", possibleRelationships.length === 1));


        inverseName = possibleRelationships[0].name;
        inverseKind = possibleRelationships[0].kind;
      }

      return {
        type: inverseType,
        name: inverseName,
        kind: inverseKind
      };
    },


    /**
     The model's relationships as a map, keyed on the type of the
     relationship. The value of each entry is an array containing a descriptor
     for each relationship with that type, describing the name of the relationship
     as well as the type.
      For example, given the following model definition:
      ```app/models/blog.js
     import DS from 'ember-data';
      export default DS.Model.extend({
        users: DS.hasMany('user'),
        owner: DS.belongsTo('user'),
        posts: DS.hasMany('post')
      });
     ```
      This computed property would return a map describing these
     relationships, like this:
      ```javascript
     import Ember from 'ember';
     import Blog from 'app/models/blog';
     import User from 'app/models/user';
     import Post from 'app/models/post';
      let relationships = Ember.get(Blog, 'relationships');
     relationships.get(User);
     //=> [ { name: 'users', kind: 'hasMany' },
     //     { name: 'owner', kind: 'belongsTo' } ]
     relationships.get(Post);
     //=> [ { name: 'posts', kind: 'hasMany' } ]
     ```
      @property relationships
     @static
     @type Ember.Map
     @readOnly
     */

    relationships: _ext.relationshipsDescriptor,

    /**
     A hash containing lists of the model's relationships, grouped
     by the relationship kind. For example, given a model with this
     definition:
      ```app/models/blog.js
     import DS from 'ember-data';
      export default DS.Model.extend({
        users: DS.hasMany('user'),
        owner: DS.belongsTo('user'),
         posts: DS.hasMany('post')
      });
     ```
      This property would contain the following:
      ```javascript
     import Ember from 'ember';
     import Blog from 'app/models/blog';
      let relationshipNames = Ember.get(Blog, 'relationshipNames');
     relationshipNames.hasMany;
     //=> ['users', 'posts']
     relationshipNames.belongsTo;
     //=> ['owner']
     ```
      @property relationshipNames
     @static
     @type Object
     @readOnly
     */
    relationshipNames: computed(function () {
      var names = {
        hasMany: [],
        belongsTo: []
      };

      this.eachComputedProperty(function (name, meta) {
        if (meta.isRelationship) {
          names[meta.kind].push(name);
        }
      });

      return names;
    }),

    /**
     An array of types directly related to a model. Each type will be
     included once, regardless of the number of relationships it has with
     the model.
      For example, given a model with this definition:
      ```app/models/blog.js
     import DS from 'ember-data';
      export default DS.Model.extend({
        users: DS.hasMany('user'),
        owner: DS.belongsTo('user'),
         posts: DS.hasMany('post')
      });
     ```
      This property would contain the following:
      ```javascript
     import Ember from 'ember';
     import Blog from 'app/models/blog';
      let relatedTypes = Ember.get(Blog, 'relatedTypes');
     //=> [ User, Post ]
     ```
      @property relatedTypes
     @static
     @type Ember.Array
     @readOnly
     */
    relatedTypes: _ext.relatedTypesDescriptor,

    /**
     A map whose keys are the relationships of a model and whose values are
     relationship descriptors.
      For example, given a model with this
     definition:
      ```app/models/blog.js
     import DS from 'ember-data';
      export default DS.Model.extend({
        users: DS.hasMany('user'),
        owner: DS.belongsTo('user'),
         posts: DS.hasMany('post')
      });
     ```
      This property would contain the following:
      ```javascript
     import Ember from 'ember';
     import Blog from 'app/models/blog';
      let relationshipsByName = Ember.get(Blog, 'relationshipsByName');
     relationshipsByName.get('users');
     //=> { key: 'users', kind: 'hasMany', type: 'user', options: Object, isRelationship: true }
     relationshipsByName.get('owner');
     //=> { key: 'owner', kind: 'belongsTo', type: 'user', options: Object, isRelationship: true }
     ```
      @property relationshipsByName
     @static
     @type Ember.Map
     @readOnly
     */
    relationshipsByName: _ext.relationshipsByNameDescriptor,

    /**
     A map whose keys are the fields of the model and whose values are strings
     describing the kind of the field. A model's fields are the union of all of its
     attributes and relationships.
      For example:
      ```app/models/blog.js
     import DS from 'ember-data';
      export default DS.Model.extend({
        users: DS.hasMany('user'),
        owner: DS.belongsTo('user'),
         posts: DS.hasMany('post'),
         title: DS.attr('string')
      });
     ```
      ```js
     import Ember from 'ember';
     import Blog from 'app/models/blog';
      let fields = Ember.get(Blog, 'fields');
     fields.forEach(function(kind, field) {
        console.log(field, kind);
      });
      // prints:
     // users, hasMany
     // owner, belongsTo
     // posts, hasMany
     // title, attribute
     ```
      @property fields
     @static
     @type Ember.Map
     @readOnly
     */
    fields: computed(function () {
      var map = Map.create();

      this.eachComputedProperty(function (name, meta) {
        if (meta.isRelationship) {
          map.set(name, meta.kind);
        } else if (meta.isAttribute) {
          map.set(name, 'attribute');
        }
      });

      return map;
    }).readOnly(),

    eachRelationship: function (callback, binding) {
      get(this, 'relationshipsByName').forEach(function (relationship, name) {
        callback.call(binding, name, relationship);
      });
    },
    eachRelatedType: function (callback, binding) {
      var relationshipTypes = get(this, 'relatedTypes');

      for (var i = 0; i < relationshipTypes.length; i++) {
        var type = relationshipTypes[i];
        callback.call(binding, type);
      }
    },
    determineRelationshipType: function (knownSide, store) {
      var knownKey = knownSide.key;
      var knownKind = knownSide.kind;
      var inverse = this.inverseFor(knownKey, store);
      // let key;
      var otherKind = void 0;

      if (!inverse) {
        return knownKind === 'belongsTo' ? 'oneToNone' : 'manyToNone';
      }

      // key = inverse.name;
      otherKind = inverse.kind;

      if (otherKind === 'belongsTo') {
        return knownKind === 'belongsTo' ? 'oneToOne' : 'manyToOne';
      } else {
        return knownKind === 'belongsTo' ? 'oneToMany' : 'manyToMany';
      }
    },


    /**
     A map whose keys are the attributes of the model (properties
     described by DS.attr) and whose values are the meta object for the
     property.
      Example
      ```app/models/person.js
     import DS from 'ember-data';
      export default DS.Model.extend({
        firstName: DS.attr('string'),
        lastName: DS.attr('string'),
        birthday: DS.attr('date')
      });
     ```
      ```javascript
     import Ember from 'ember';
     import Person from 'app/models/person';
      let attributes = Ember.get(Person, 'attributes')
      attributes.forEach(function(meta, name) {
        console.log(name, meta);
      });
      // prints:
     // firstName {type: "string", isAttribute: true, options: Object, parentType: function, name: "firstName"}
     // lastName {type: "string", isAttribute: true, options: Object, parentType: function, name: "lastName"}
     // birthday {type: "date", isAttribute: true, options: Object, parentType: function, name: "birthday"}
     ```
      @property attributes
     @static
     @type {Ember.Map}
     @readOnly
     */
    attributes: computed(function () {
      var _this3 = this;

      var map = Map.create();

      this.eachComputedProperty(function (name, meta) {
        if (meta.isAttribute) {
          (false && Ember.assert("You may not set `id` as an attribute on your model. Please remove any lines that look like: `id: DS.attr('<type>')` from " + _this3.toString(), name !== 'id'));


          meta.name = name;
          map.set(name, meta);
        }
      });

      return map;
    }).readOnly(),

    /**
     A map whose keys are the attributes of the model (properties
     described by DS.attr) and whose values are type of transformation
     applied to each attribute. This map does not include any
     attributes that do not have an transformation type.
      Example
      ```app/models/person.js
     import DS from 'ember-data';
      export default DS.Model.extend({
        firstName: DS.attr(),
        lastName: DS.attr('string'),
        birthday: DS.attr('date')
      });
     ```
      ```javascript
     import Ember from 'ember';
     import Person from 'app/models/person';
      let transformedAttributes = Ember.get(Person, 'transformedAttributes')
      transformedAttributes.forEach(function(field, type) {
        console.log(field, type);
      });
      // prints:
     // lastName string
     // birthday date
     ```
      @property transformedAttributes
     @static
     @type {Ember.Map}
     @readOnly
     */
    transformedAttributes: computed(function () {
      var map = Map.create();

      this.eachAttribute(function (key, meta) {
        if (meta.type) {
          map.set(key, meta.type);
        }
      });

      return map;
    }).readOnly(),

    eachAttribute: function (callback, binding) {
      get(this, 'attributes').forEach(function (meta, name) {
        callback.call(binding, name, meta);
      });
    },
    eachTransformedAttribute: function (callback, binding) {
      get(this, 'transformedAttributes').forEach(function (type, name) {
        callback.call(binding, name, type);
      });
    }
  });

  // if `Ember.setOwner` is defined, accessing `this.container` is
  // deprecated (but functional). In "standard" Ember usage, this
  // deprecation is actually created via an `.extend` of the factory
  // inside the container itself, but that only happens on models
  // with MODEL_FACTORY_INJECTIONS enabled :(
  if (setOwner) {
    Object.defineProperty(Model.prototype, 'container', {
      configurable: true,
      enumerable: false,
      get: function () {
        (false && !(false) && Ember.deprecate('Using the injected `container` is deprecated. Please use the `getOwner` helper instead to access the owner of this object.', false, { id: 'ember-application.injected-container', until: '3.0.0' }));


        return this.store.container;
      }
    });
  }

  if ((0, _features.default)('ds-rollback-attribute')) {
    Model.reopen({
      rollbackAttribute: function (attributeName) {
        if (attributeName in this._internalModel._attributes) {
          this.set(attributeName, this._internalModel.lastAcknowledgedValue(attributeName));
        }
      }
    });
  }

  if (false) {
    Model.reopen({
      willMergeMixin: function (props) {
        var constructor = this.constructor;
        (false && Ember.assert('`' + intersection(Object.keys(props), RESERVED_MODEL_PROPS)[0] + '` is a reserved property name on DS.Model objects. Please choose a different property name for ' + constructor.toString(), !intersection(Object.keys(props), RESERVED_MODEL_PROPS)[0]));
        (false && Ember.assert("You may not set `id` as an attribute on your model. Please remove any lines that look like: `id: DS.attr('<type>')` from " + constructor.toString(), Object.keys(props).indexOf('id') === -1));
      },
      didDefineProperty: function (proto, key, value) {
        // Check if the value being set is a computed property.
        if (value instanceof ComputedProperty) {

          // If it is, get the metadata for the relationship. This is
          // populated by the `DS.belongsTo` helper when it is creating
          // the computed property.
          var meta = value.meta();

          meta.parentType = proto.constructor;
        }
      }
    });
  }

  exports.default = Model;
});
define('ember-data/-private/system/model/states', ['exports'], function (exports) {
  'use strict';

  exports.__esModule = true;


  /*
    This file encapsulates the various states that a record can transition
    through during its lifecycle.
  */
  /**
    ### State
  
    Each record has a `currentState` property that explicitly tracks what
    state a record is in at any given time. For instance, if a record is
    newly created and has not yet been sent to the adapter to be saved,
    it would be in the `root.loaded.created.uncommitted` state.  If a
    record has had local modifications made to it that are in the
    process of being saved, the record would be in the
    `root.loaded.updated.inFlight` state. (This state paths will be
    explained in more detail below.)
  
    Events are sent by the record or its store to the record's
    `currentState` property. How the state reacts to these events is
    dependent on which state it is in. In some states, certain events
    will be invalid and will cause an exception to be raised.
  
    States are hierarchical and every state is a substate of the
    `RootState`. For example, a record can be in the
    `root.deleted.uncommitted` state, then transition into the
    `root.deleted.inFlight` state. If a child state does not implement
    an event handler, the state manager will attempt to invoke the event
    on all parent states until the root state is reached. The state
    hierarchy of a record is described in terms of a path string. You
    can determine a record's current state by getting the state's
    `stateName` property:
  
    ```javascript
    record.get('currentState.stateName');
    //=> "root.created.uncommitted"
     ```
  
    The hierarchy of valid states that ship with ember data looks like
    this:
  
    ```text
    * root
      * deleted
        * saved
        * uncommitted
        * inFlight
      * empty
      * loaded
        * created
          * uncommitted
          * inFlight
        * saved
        * updated
          * uncommitted
          * inFlight
      * loading
    ```
  
    The `DS.Model` states are themselves stateless. What that means is
    that, the hierarchical states that each of *those* points to is a
    shared data structure. For performance reasons, instead of each
    record getting its own copy of the hierarchy of states, each record
    points to this global, immutable shared instance. How does a state
    know which record it should be acting on? We pass the record
    instance into the state's event handlers as the first argument.
  
    The record passed as the first parameter is where you should stash
    state about the record if needed; you should never store data on the state
    object itself.
  
    ### Events and Flags
  
    A state may implement zero or more events and flags.
  
    #### Events
  
    Events are named functions that are invoked when sent to a record. The
    record will first look for a method with the given name on the
    current state. If no method is found, it will search the current
    state's parent, and then its grandparent, and so on until reaching
    the top of the hierarchy. If the root is reached without an event
    handler being found, an exception will be raised. This can be very
    helpful when debugging new features.
  
    Here's an example implementation of a state with a `myEvent` event handler:
  
    ```javascript
    aState: DS.State.create({
      myEvent: function(manager, param) {
        console.log("Received myEvent with", param);
      }
    })
    ```
  
    To trigger this event:
  
    ```javascript
    record.send('myEvent', 'foo');
    //=> "Received myEvent with foo"
    ```
  
    Note that an optional parameter can be sent to a record's `send()` method,
    which will be passed as the second parameter to the event handler.
  
    Events should transition to a different state if appropriate. This can be
    done by calling the record's `transitionTo()` method with a path to the
    desired state. The state manager will attempt to resolve the state path
    relative to the current state. If no state is found at that path, it will
    attempt to resolve it relative to the current state's parent, and then its
    parent, and so on until the root is reached. For example, imagine a hierarchy
    like this:
  
        * created
          * uncommitted <-- currentState
          * inFlight
        * updated
          * inFlight
  
    If we are currently in the `uncommitted` state, calling
    `transitionTo('inFlight')` would transition to the `created.inFlight` state,
    while calling `transitionTo('updated.inFlight')` would transition to
    the `updated.inFlight` state.
  
    Remember that *only events* should ever cause a state transition. You should
    never call `transitionTo()` from outside a state's event handler. If you are
    tempted to do so, create a new event and send that to the state manager.
  
    #### Flags
  
    Flags are Boolean values that can be used to introspect a record's current
    state in a more user-friendly way than examining its state path. For example,
    instead of doing this:
  
    ```javascript
    var statePath = record.get('stateManager.currentPath');
    if (statePath === 'created.inFlight') {
      doSomething();
    }
    ```
  
    You can say:
  
    ```javascript
    if (record.get('isNew') && record.get('isSaving')) {
      doSomething();
    }
    ```
  
    If your state does not set a value for a given flag, the value will
    be inherited from its parent (or the first place in the state hierarchy
    where it is defined).
  
    The current set of flags are defined below. If you want to add a new flag,
    in addition to the area below, you will also need to declare it in the
    `DS.Model` class.
  
  
     * [isEmpty](DS.Model.html#property_isEmpty)
     * [isLoading](DS.Model.html#property_isLoading)
     * [isLoaded](DS.Model.html#property_isLoaded)
     * [hasDirtyAttributes](DS.Model.html#property_hasDirtyAttributes)
     * [isSaving](DS.Model.html#property_isSaving)
     * [isDeleted](DS.Model.html#property_isDeleted)
     * [isNew](DS.Model.html#property_isNew)
     * [isValid](DS.Model.html#property_isValid)
  
    @namespace DS
    @class RootState
  */

  function didSetProperty(internalModel, context) {
    if (context.value === context.originalValue) {
      delete internalModel._attributes[context.name];
      internalModel.send('propertyWasReset', context.name);
    } else if (context.value !== context.oldValue) {
      internalModel.send('becomeDirty');
    }

    internalModel.updateRecordArrays();
  }

  // Implementation notes:
  //
  // Each state has a boolean value for all of the following flags:
  //
  // * isLoaded: The record has a populated `data` property. When a
  //   record is loaded via `store.find`, `isLoaded` is false
  //   until the adapter sets it. When a record is created locally,
  //   its `isLoaded` property is always true.
  // * isDirty: The record has local changes that have not yet been
  //   saved by the adapter. This includes records that have been
  //   created (but not yet saved) or deleted.
  // * isSaving: The record has been committed, but
  //   the adapter has not yet acknowledged that the changes have
  //   been persisted to the backend.
  // * isDeleted: The record was marked for deletion. When `isDeleted`
  //   is true and `isDirty` is true, the record is deleted locally
  //   but the deletion was not yet persisted. When `isSaving` is
  //   true, the change is in-flight. When both `isDirty` and
  //   `isSaving` are false, the change has persisted.
  // * isNew: The record was created on the client and the adapter
  //   did not yet report that it was successfully saved.
  // * isValid: The adapter did not report any server-side validation
  //   failures.

  // The dirty state is a abstract state whose functionality is
  // shared between the `created` and `updated` states.
  //
  // The deleted state shares the `isDirty` flag with the
  // subclasses of `DirtyState`, but with a very different
  // implementation.
  //
  // Dirty states have three child states:
  //
  // `uncommitted`: the store has not yet handed off the record
  //   to be saved.
  // `inFlight`: the store has handed off the record to be saved,
  //   but the adapter has not yet acknowledged success.
  // `invalid`: the record has invalid information and cannot be
  //   sent to the adapter yet.
  /**
    @module ember-data
  */
  var DirtyState = {
    initialState: 'uncommitted',

    // FLAGS
    isDirty: true,

    // SUBSTATES

    // When a record first becomes dirty, it is `uncommitted`.
    // This means that there are local pending changes, but they
    // have not yet begun to be saved, and are not invalid.
    uncommitted: {
      // EVENTS
      didSetProperty: didSetProperty,

      loadingData: function () {},
      propertyWasReset: function (internalModel, name) {
        if (!internalModel.hasChangedAttributes()) {
          internalModel.send('rolledBack');
        }
      },
      pushedData: function (internalModel) {
        internalModel.updateChangedAttributes();

        if (!internalModel.hasChangedAttributes()) {
          internalModel.transitionTo('loaded.saved');
        }
      },
      becomeDirty: function () {},
      willCommit: function (internalModel) {
        internalModel.transitionTo('inFlight');
      },
      reloadRecord: function (internalModel, resolve) {
        resolve(internalModel.store._reloadRecord(internalModel));
      },
      rolledBack: function (internalModel) {
        internalModel.transitionTo('loaded.saved');
      },
      becameInvalid: function (internalModel) {
        internalModel.transitionTo('invalid');
      },
      rollback: function (internalModel) {
        internalModel.rollbackAttributes();
        internalModel.triggerLater('ready');
      }
    },

    // Once a record has been handed off to the adapter to be
    // saved, it is in the 'in flight' state. Changes to the
    // record cannot be made during this window.
    inFlight: {
      // FLAGS
      isSaving: true,

      // EVENTS
      didSetProperty: didSetProperty,
      becomeDirty: function () {},
      pushedData: function () {},


      unloadRecord: assertAgainstUnloadRecord,

      willCommit: function () {},
      didCommit: function (internalModel) {
        internalModel.transitionTo('saved');
        internalModel.send('invokeLifecycleCallbacks', this.dirtyType);
      },
      becameInvalid: function (internalModel) {
        internalModel.transitionTo('invalid');
        internalModel.send('invokeLifecycleCallbacks');
      },
      becameError: function (internalModel) {
        internalModel.transitionTo('uncommitted');
        internalModel.triggerLater('becameError', internalModel);
      }
    },

    // A record is in the `invalid` if the adapter has indicated
    // the the record failed server-side invalidations.
    invalid: {
      // FLAGS
      isValid: false,

      deleteRecord: function (internalModel) {
        internalModel.transitionTo('deleted.uncommitted');
      },
      didSetProperty: function (internalModel, context) {
        internalModel.removeErrorMessageFromAttribute(context.name);

        didSetProperty(internalModel, context);

        if (!internalModel.hasErrors()) {
          this.becameValid(internalModel);
        }
      },
      becameInvalid: function () {},
      becomeDirty: function () {},
      pushedData: function () {},
      willCommit: function (internalModel) {
        internalModel.clearErrorMessages();
        internalModel.transitionTo('inFlight');
      },
      rolledBack: function (internalModel) {
        internalModel.clearErrorMessages();
        internalModel.transitionTo('loaded.saved');
        internalModel.triggerLater('ready');
      },
      becameValid: function (internalModel) {
        internalModel.transitionTo('uncommitted');
      },
      invokeLifecycleCallbacks: function (internalModel) {
        internalModel.triggerLater('becameInvalid', internalModel);
      }
    }
  };

  // The created and updated states are created outside the state
  // chart so we can reopen their substates and add mixins as
  // necessary.

  function deepClone(object) {
    var clone = {};
    var value = void 0;

    for (var prop in object) {
      value = object[prop];
      if (value && typeof value === 'object') {
        clone[prop] = deepClone(value);
      } else {
        clone[prop] = value;
      }
    }

    return clone;
  }

  function mixin(original, hash) {
    for (var prop in hash) {
      original[prop] = hash[prop];
    }

    return original;
  }

  function dirtyState(options) {
    var newState = deepClone(DirtyState);
    return mixin(newState, options);
  }

  var createdState = dirtyState({
    dirtyType: 'created',
    // FLAGS
    isNew: true
  });

  createdState.invalid.rolledBack = function (internalModel) {
    internalModel.transitionTo('deleted.saved');
  };

  createdState.uncommitted.rolledBack = function (internalModel) {
    internalModel.transitionTo('deleted.saved');
  };

  var updatedState = dirtyState({
    dirtyType: 'updated'
  });

  function createdStateDeleteRecord(internalModel) {
    internalModel.transitionTo('deleted.saved');
    internalModel.send('invokeLifecycleCallbacks');
  }

  createdState.uncommitted.deleteRecord = createdStateDeleteRecord;

  createdState.invalid.deleteRecord = createdStateDeleteRecord;

  createdState.uncommitted.rollback = function (internalModel) {
    DirtyState.uncommitted.rollback.apply(this, arguments);
    internalModel.transitionTo('deleted.saved');
  };

  createdState.uncommitted.pushedData = function (internalModel) {
    internalModel.transitionTo('loaded.updated.uncommitted');
    internalModel.triggerLater('didLoad');
  };

  createdState.uncommitted.propertyWasReset = function () {};

  function assertAgainstUnloadRecord(internalModel) {
    (false && Ember.assert("You can only unload a record which is not inFlight. `" + internalModel + "`", false));
  }

  updatedState.invalid.becameValid = function (internalModel) {
    // we're eagerly transition into the loaded.saved state, even though we could
    // be still dirty; but the setup hook of the loaded.saved state checks for
    // dirty attributes and transitions into the corresponding dirty state
    internalModel.transitionTo('loaded.saved');
  };

  updatedState.inFlight.unloadRecord = assertAgainstUnloadRecord;

  updatedState.uncommitted.deleteRecord = function (internalModel) {
    internalModel.transitionTo('deleted.uncommitted');
  };

  var RootState = {
    // FLAGS
    isEmpty: false,
    isLoading: false,
    isLoaded: false,
    isDirty: false,
    isSaving: false,
    isDeleted: false,
    isNew: false,
    isValid: true,

    rolledBack: function () {},
    unloadRecord: function (internalModel) {},
    propertyWasReset: function () {},


    // SUBSTATES

    // A record begins its lifecycle in the `empty` state.
    // If its data will come from the adapter, it will
    // transition into the `loading` state. Otherwise, if
    // the record is being created on the client, it will
    // transition into the `created` state.
    empty: {
      isEmpty: true,

      loadingData: function (internalModel, promise) {
        internalModel._loadingPromise = promise;
        internalModel.transitionTo('loading');
      },
      loadedData: function (internalModel) {
        internalModel.transitionTo('loaded.created.uncommitted');
        internalModel.triggerLater('ready');
      },
      pushedData: function (internalModel) {
        internalModel.transitionTo('loaded.saved');
        internalModel.triggerLater('didLoad');
        internalModel.triggerLater('ready');
      }
    },

    // A record enters this state when the store asks
    // the adapter for its data. It remains in this state
    // until the adapter provides the requested data.
    //
    // Usually, this process is asynchronous, using an
    // XHR to retrieve the data.
    loading: {
      // FLAGS
      isLoading: true,

      exit: function (internalModel) {
        internalModel._loadingPromise = null;
      },
      pushedData: function (internalModel) {
        internalModel.transitionTo('loaded.saved');
        internalModel.triggerLater('didLoad');
        internalModel.triggerLater('ready');
        //TODO this seems out of place here
        internalModel.didCleanError();
      },
      becameError: function (internalModel) {
        internalModel.triggerLater('becameError', internalModel);
      },
      notFound: function (internalModel) {
        internalModel.transitionTo('empty');
      }
    },

    // A record enters this state when its data is populated.
    // Most of a record's lifecycle is spent inside substates
    // of the `loaded` state.
    loaded: {
      initialState: 'saved',

      // FLAGS
      isLoaded: true,

      loadingData: function () {},


      // SUBSTATES

      // If there are no local changes to a record, it remains
      // in the `saved` state.
      saved: {
        setup: function (internalModel) {
          if (internalModel.hasChangedAttributes()) {
            internalModel.adapterDidDirty();
          }
        },


        // EVENTS
        didSetProperty: didSetProperty,

        pushedData: function () {},
        becomeDirty: function (internalModel) {
          internalModel.transitionTo('updated.uncommitted');
        },
        willCommit: function (internalModel) {
          internalModel.transitionTo('updated.inFlight');
        },
        reloadRecord: function (internalModel, resolve) {
          resolve(internalModel.store._reloadRecord(internalModel));
        },
        deleteRecord: function (internalModel) {
          internalModel.transitionTo('deleted.uncommitted');
        },
        unloadRecord: function (internalModel) {},
        didCommit: function () {},
        notFound: function () {}
      },

      // A record is in this state after it has been locally
      // created but before the adapter has indicated that
      // it has been saved.
      created: createdState,

      // A record is in this state if it has already been
      // saved to the server, but there are new local changes
      // that have not yet been saved.
      updated: updatedState
    },

    // A record is in this state if it was deleted from the store.
    deleted: {
      initialState: 'uncommitted',
      dirtyType: 'deleted',

      // FLAGS
      isDeleted: true,
      isLoaded: true,
      isDirty: true,

      setup: function (internalModel) {
        internalModel.updateRecordArrays();
      },


      // SUBSTATES

      // When a record is deleted, it enters the `start`
      // state. It will exit this state when the record
      // starts to commit.
      uncommitted: {
        willCommit: function (internalModel) {
          internalModel.transitionTo('inFlight');
        },
        rollback: function (internalModel) {
          internalModel.rollbackAttributes();
          internalModel.triggerLater('ready');
        },
        pushedData: function () {},
        becomeDirty: function () {},
        deleteRecord: function () {},
        rolledBack: function (internalModel) {
          internalModel.transitionTo('loaded.saved');
          internalModel.triggerLater('ready');
        }
      },

      // After a record starts committing, but
      // before the adapter indicates that the deletion
      // has saved to the server, a record is in the
      // `inFlight` substate of `deleted`.
      inFlight: {
        // FLAGS
        isSaving: true,

        // EVENTS

        unloadRecord: assertAgainstUnloadRecord,

        willCommit: function () {},
        didCommit: function (internalModel) {
          internalModel.transitionTo('saved');

          internalModel.send('invokeLifecycleCallbacks');
        },
        becameError: function (internalModel) {
          internalModel.transitionTo('uncommitted');
          internalModel.triggerLater('becameError', internalModel);
        },
        becameInvalid: function (internalModel) {
          internalModel.transitionTo('invalid');
          internalModel.triggerLater('becameInvalid', internalModel);
        }
      },

      // Once the adapter indicates that the deletion has
      // been saved, the record enters the `saved` substate
      // of `deleted`.
      saved: {
        // FLAGS
        isDirty: false,

        setup: function (internalModel) {
          internalModel.removeFromInverseRelationships();
        },
        invokeLifecycleCallbacks: function (internalModel) {
          internalModel.triggerLater('didDelete', internalModel);
          internalModel.triggerLater('didCommit', internalModel);
        },
        willCommit: function () {},
        didCommit: function () {}
      },

      invalid: {
        isValid: false,

        didSetProperty: function (internalModel, context) {
          internalModel.removeErrorMessageFromAttribute(context.name);

          didSetProperty(internalModel, context);

          if (!internalModel.hasErrors()) {
            this.becameValid(internalModel);
          }
        },
        becameInvalid: function () {},
        becomeDirty: function () {},
        deleteRecord: function () {},
        willCommit: function () {},
        rolledBack: function (internalModel) {
          internalModel.clearErrorMessages();
          internalModel.transitionTo('loaded.saved');
          internalModel.triggerLater('ready');
        },
        becameValid: function (internalModel) {
          internalModel.transitionTo('uncommitted');
        }
      }
    },

    invokeLifecycleCallbacks: function (internalModel, dirtyType) {
      if (dirtyType === 'created') {
        internalModel.triggerLater('didCreate', internalModel);
      } else {
        internalModel.triggerLater('didUpdate', internalModel);
      }

      internalModel.triggerLater('didCommit', internalModel);
    }
  };

  function wireState(object, parent, name) {
    // TODO: Use Object.create and copy instead
    object = mixin(parent ? Object.create(parent) : {}, object);
    object.parentState = parent;
    object.stateName = name;

    for (var prop in object) {
      if (!object.hasOwnProperty(prop) || prop === 'parentState' || prop === 'stateName') {
        continue;
      }
      if (typeof object[prop] === 'object') {
        object[prop] = wireState(object[prop], object, name + '.' + prop);
      }
    }

    return object;
  }

  exports.default = wireState(RootState, null, 'root');
});
define('ember-data/-private/system/normalize-link', ['exports'], function (exports) {
  'use strict';

  exports.__esModule = true;
  exports.default = _normalizeLink;
  /*
    This method normalizes a link to an "links object". If the passed link is
    already an object it's returned without any modifications.
  
    See http://jsonapi.org/format/#document-links for more information.
  
    @method _normalizeLink
    @private
    @param {String} link
    @return {Object|null}
    @for DS
  */
  function _normalizeLink(link) {
    switch (typeof link) {
      case 'object':
        return link;
      case 'string':
        return { href: link };
    }
    return null;
  }
});
define('ember-data/-private/system/normalize-model-name', ['exports'], function (exports) {
  'use strict';

  exports.__esModule = true;
  exports.default = normalizeModelName;
  var dasherize = Ember.String.dasherize;


  // All modelNames are dasherized internally. Changing this function may
  // require changes to other normalization hooks (such as typeForRoot).

  /**
   This method normalizes a modelName into the format Ember Data uses
   internally.
  
    @method normalizeModelName
    @public
    @param {String} modelName
    @return {String} normalizedModelName
    @for DS
  */
  function normalizeModelName(modelName) {
    return dasherize(modelName);
  }
});
define('ember-data/-private/system/ordered-set', ['exports'], function (exports) {
  'use strict';

  exports.__esModule = true;
  exports.default = OrderedSet;
  var guidFor = Ember.guidFor;


  var EmberOrderedSet = Ember.OrderedSet;

  function OrderedSet() {
    this._super$constructor();
  }

  OrderedSet.create = function () {
    var Constructor = this;
    return new Constructor();
  };

  OrderedSet.prototype = Object.create(EmberOrderedSet.prototype);
  OrderedSet.prototype.constructor = OrderedSet;
  OrderedSet.prototype._super$constructor = EmberOrderedSet;

  OrderedSet.prototype.addWithIndex = function (obj, idx) {
    var guid = guidFor(obj);
    var presenceSet = this.presenceSet;
    var list = this.list;

    if (presenceSet[guid] === true) {
      return;
    }

    presenceSet[guid] = true;

    if (idx === undefined || idx === null) {
      list.push(obj);
    } else {
      list.splice(idx, 0, obj);
    }

    this.size += 1;

    return this;
  };
});
define('ember-data/-private/system/promise-proxies', ['exports'], function (exports) {
  'use strict';

  exports.__esModule = true;
  exports.promiseObject = promiseObject;
  exports.promiseArray = promiseArray;
  exports.proxyToContent = proxyToContent;
  exports.promiseManyArray = promiseManyArray;
  var ObjectProxy = Ember.ObjectProxy;
  var PromiseProxyMixin = Ember.PromiseProxyMixin;
  var ArrayProxy = Ember.ArrayProxy;
  var get = Ember.get;
  var reads = Ember.computed.reads;
  var Promise = Ember.RSVP.Promise;


  /**
    A `PromiseArray` is an object that acts like both an `Ember.Array`
    and a promise. When the promise is resolved the resulting value
    will be set to the `PromiseArray`'s `content` property. This makes
    it easy to create data bindings with the `PromiseArray` that will be
    updated when the promise resolves.
  
    For more information see the [Ember.PromiseProxyMixin
    documentation](/api/classes/Ember.PromiseProxyMixin.html).
  
    Example
  
    ```javascript
    let promiseArray = DS.PromiseArray.create({
      promise: $.getJSON('/some/remote/data.json')
    });
  
    promiseArray.get('length'); // 0
  
    promiseArray.then(function() {
      promiseArray.get('length'); // 100
    });
    ```
  
    @class PromiseArray
    @namespace DS
    @extends Ember.ArrayProxy
    @uses Ember.PromiseProxyMixin
  */
  var PromiseArray = exports.PromiseArray = ArrayProxy.extend(PromiseProxyMixin, {
    meta: reads('content.meta')
  });

  /**
    A `PromiseObject` is an object that acts like both an `Ember.Object`
    and a promise. When the promise is resolved, then the resulting value
    will be set to the `PromiseObject`'s `content` property. This makes
    it easy to create data bindings with the `PromiseObject` that will
    be updated when the promise resolves.
  
    For more information see the [Ember.PromiseProxyMixin
    documentation](/api/classes/Ember.PromiseProxyMixin.html).
  
    Example
  
    ```javascript
    let promiseObject = DS.PromiseObject.create({
      promise: $.getJSON('/some/remote/data.json')
    });
  
    promiseObject.get('name'); // null
  
    promiseObject.then(function() {
      promiseObject.get('name'); // 'Tomster'
    });
    ```
  
    @class PromiseObject
    @namespace DS
    @extends Ember.ObjectProxy
    @uses Ember.PromiseProxyMixin
  */
  var PromiseObject = exports.PromiseObject = ObjectProxy.extend(PromiseProxyMixin);

  function promiseObject(promise, label) {
    return PromiseObject.create({
      promise: Promise.resolve(promise, label)
    });
  }

  function promiseArray(promise, label) {
    return PromiseArray.create({
      promise: Promise.resolve(promise, label)
    });
  }

  /**
    A PromiseManyArray is a PromiseArray that also proxies certain method calls
    to the underlying manyArray.
    Right now we proxy:
  
      * `reload()`
      * `createRecord()`
      * `on()`
      * `one()`
      * `trigger()`
      * `off()`
      * `has()`
  
    @class PromiseManyArray
    @namespace DS
    @extends Ember.ArrayProxy
  */

  function proxyToContent(method) {
    return function () {
      var _get;

      return (_get = get(this, 'content'))[method].apply(_get, arguments);
    };
  }

  var PromiseManyArray = exports.PromiseManyArray = PromiseArray.extend({
    reload: function () {
      (false && Ember.assert('You are trying to reload an async manyArray before it has been created', get(this, 'content')));

      this.set('promise', this.get('content').reload());
      return this;
    },


    createRecord: proxyToContent('createRecord'),

    on: proxyToContent('on'),

    one: proxyToContent('one'),

    trigger: proxyToContent('trigger'),

    off: proxyToContent('off'),

    has: proxyToContent('has')
  });

  function promiseManyArray(promise, label) {
    return PromiseManyArray.create({
      promise: Promise.resolve(promise, label)
    });
  }
});
define('ember-data/-private/system/record-array-manager', ['exports', 'ember-data/-private/system/record-arrays', 'ember-data/-private/system/clone-null'], function (exports, _recordArrays, _cloneNull) {
  'use strict';

  exports.__esModule = true;
  exports.associateWithRecordArray = associateWithRecordArray;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var A = Ember.A;
  var set = Ember.set;
  var get = Ember.get;
  var emberRun = Ember.run;

  var RecordArrayManager = function () {
    function RecordArrayManager(options) {
      _classCallCheck(this, RecordArrayManager);

      this.store = options.store;
      this.isDestroying = false;
      this.isDestroyed = false;
      this._filteredRecordArrays = Object.create(null);
      this._liveRecordArrays = Object.create(null);
      this._pending = Object.create(null);
      this._adapterPopulatedRecordArrays = [];
    }

    RecordArrayManager.prototype.recordDidChange = function recordDidChange(internalModel) {
      // TODO: change name
      // TODO: track that it was also a change
      this.internalModelDidChange(internalModel);
    };

    RecordArrayManager.prototype.recordWasLoaded = function recordWasLoaded(internalModel) {
      // TODO: change name
      // TODO: track that it was also that it was first loaded
      this.internalModelDidChange(internalModel);
    };

    RecordArrayManager.prototype.internalModelDidChange = function internalModelDidChange(internalModel) {

      var modelName = internalModel.modelName;

      if (internalModel._pendingRecordArrayManagerFlush) {
        return;
      }

      internalModel._pendingRecordArrayManagerFlush = true;

      var pending = this._pending;
      var models = pending[modelName] = pending[modelName] || [];
      if (models.push(internalModel) !== 1) {
        return;
      }

      emberRun.schedule('actions', this, this._flush);
    };

    RecordArrayManager.prototype._flush = function _flush() {

      var pending = this._pending;
      this._pending = Object.create(null);
      var modelsToRemove = [];

      for (var modelName in pending) {
        var internalModels = pending[modelName];
        for (var j = 0; j < internalModels.length; j++) {
          var internalModel = internalModels[j];
          // mark internalModels, so they can once again be processed by the
          // recordArrayManager
          internalModel._pendingRecordArrayManagerFlush = false;
          // build up a set of models to ensure we have purged correctly;
          if (internalModel.isHiddenFromRecordArrays()) {
            modelsToRemove.push(internalModel);
          }
        }

        // process filteredRecordArrays
        if (this._filteredRecordArrays[modelName]) {
          var recordArrays = this.filteredRecordArraysFor(modelName);
          for (var i = 0; i < recordArrays.length; i++) {
            this.updateFilterRecordArray(recordArrays[i], modelName, internalModels);
          }
        }

        var array = this._liveRecordArrays[modelName];
        if (array) {
          // TODO: skip if it only changed
          // process liveRecordArrays
          this.updateLiveRecordArray(array, internalModels);
        }

        // process adapterPopulatedRecordArrays
        if (modelsToRemove.length > 0) {
          removeFromAdapterPopulatedRecordArrays(modelsToRemove);
        }
      }
    };

    RecordArrayManager.prototype.updateLiveRecordArray = function updateLiveRecordArray(array, internalModels) {
      return _updateLiveRecordArray(array, internalModels);
    };

    RecordArrayManager.prototype.updateFilterRecordArray = function updateFilterRecordArray(array, modelName, internalModels) {

      var filter = get(array, 'filterFunction');

      var shouldBeInAdded = [];
      var shouldBeRemoved = [];

      for (var i = 0; i < internalModels.length; i++) {
        var internalModel = internalModels[i];
        if (internalModel.isHiddenFromRecordArrays() === false && filter(internalModel.getRecord())) {
          if (internalModel._recordArrays.has(array)) {
            continue;
          }
          shouldBeInAdded.push(internalModel);
          internalModel._recordArrays.add(array);
        } else {
          if (internalModel._recordArrays.delete(array)) {
            shouldBeRemoved.push(internalModel);
          }
        }
      }

      if (shouldBeInAdded.length > 0) {
        array._pushInternalModels(shouldBeInAdded);
      }
      if (shouldBeRemoved.length > 0) {
        array._removeInternalModels(shouldBeRemoved);
      }
    };

    RecordArrayManager.prototype._syncLiveRecordArray = function _syncLiveRecordArray(array, modelName) {
      (false && Ember.assert('recordArrayManger.syncLiveRecordArray expects modelName not modelClass as the second param', typeof modelName === 'string'));

      var hasNoPotentialDeletions = Object.keys(this._pending).length === 0;
      var map = this.store._internalModelsFor(modelName);
      var hasNoInsertionsOrRemovals = get(map, 'length') === get(array, 'length');

      /*
        Ideally the recordArrayManager has knowledge of the changes to be applied to
        liveRecordArrays, and is capable of strategically flushing those changes and applying
        small diffs if desired.  However, until we've refactored recordArrayManager, this dirty
        check prevents us from unnecessarily wiping out live record arrays returned by peekAll.
        */
      if (hasNoPotentialDeletions && hasNoInsertionsOrRemovals) {
        return;
      }

      var internalModels = this._visibleInternalModelsByType(modelName);
      var modelsToAdd = [];
      for (var i = 0; i < internalModels.length; i++) {
        var internalModel = internalModels[i];
        var recordArrays = internalModel._recordArrays;
        if (recordArrays.has(array) === false) {
          recordArrays.add(array);
          modelsToAdd.push(internalModel);
        }
      }

      array._pushInternalModels(modelsToAdd);
    };

    RecordArrayManager.prototype.updateFilter = function updateFilter(array, modelName, filter) {
      (false && Ember.assert('recordArrayManger.updateFilter expects modelName not modelClass as the second param, received ' + modelName, typeof modelName === 'string'));

      var modelMap = this.store._internalModelsFor(modelName);
      var internalModels = modelMap.models;

      this.updateFilterRecordArray(array, filter, internalModels);
    };

    RecordArrayManager.prototype._didUpdateAll = function _didUpdateAll(modelName) {
      var recordArray = this._liveRecordArrays[modelName];
      if (recordArray) {
        set(recordArray, 'isUpdating', false);
      }
    };

    RecordArrayManager.prototype.liveRecordArrayFor = function liveRecordArrayFor(modelName) {
      (false && Ember.assert('recordArrayManger.liveRecordArrayFor expects modelName not modelClass as the param', typeof modelName === 'string'));


      var array = this._liveRecordArrays[modelName];

      if (array) {
        // if the array already exists, synchronize
        this._syncLiveRecordArray(array, modelName);
      } else {
        // if the array is being newly created merely create it with its initial
        // content already set. This prevents unneeded change events.
        var internalModels = this._visibleInternalModelsByType(modelName);
        array = this.createRecordArray(modelName, internalModels);
        this._liveRecordArrays[modelName] = array;
      }

      return array;
    };

    RecordArrayManager.prototype._visibleInternalModelsByType = function _visibleInternalModelsByType(modelName) {
      var all = this.store._internalModelsFor(modelName)._models;
      var visible = [];
      for (var i = 0; i < all.length; i++) {
        var model = all[i];
        if (model.isHiddenFromRecordArrays() === false) {
          visible.push(model);
        }
      }
      return visible;
    };

    RecordArrayManager.prototype.filteredRecordArraysFor = function filteredRecordArraysFor(modelName) {
      (false && Ember.assert('recordArrayManger.filteredRecordArraysFor expects modelName not modelClass as the param', typeof modelName === 'string'));


      return this._filteredRecordArrays[modelName] || (this._filteredRecordArrays[modelName] = []);
    };

    RecordArrayManager.prototype.createRecordArray = function createRecordArray(modelName, content) {
      (false && Ember.assert('recordArrayManger.createRecordArray expects modelName not modelClass as the param', typeof modelName === 'string'));


      var array = _recordArrays.RecordArray.create({
        modelName: modelName,
        content: A(content || []),
        store: this.store,
        isLoaded: true,
        manager: this
      });

      if (Array.isArray(content)) {
        associateWithRecordArray(content, array);
      }

      return array;
    };

    RecordArrayManager.prototype.createFilteredRecordArray = function createFilteredRecordArray(modelName, filter, query) {
      (false && Ember.assert('recordArrayManger.createFilteredRecordArray expects modelName not modelClass as the first param, received ' + modelName, typeof modelName === 'string'));

      var array = _recordArrays.FilteredRecordArray.create({
        query: query,
        modelName: modelName,
        content: A(),
        store: this.store,
        manager: this,
        filterFunction: filter
      });

      this.registerFilteredRecordArray(array, modelName, filter);

      return array;
    };

    RecordArrayManager.prototype.createAdapterPopulatedRecordArray = function createAdapterPopulatedRecordArray(modelName, query, internalModels, payload) {
      (false && Ember.assert('recordArrayManger.createAdapterPopulatedRecordArray expects modelName not modelClass as the first param, received ' + modelName, typeof modelName === 'string'));


      var array = void 0;
      if (Array.isArray(internalModels)) {
        array = _recordArrays.AdapterPopulatedRecordArray.create({
          modelName: modelName,
          query: query,
          content: A(internalModels),
          store: this.store,
          manager: this,
          isLoaded: true,
          isUpdating: false,
          meta: (0, _cloneNull.default)(payload.meta),
          links: (0, _cloneNull.default)(payload.links)
        });

        associateWithRecordArray(internalModels, array);
      } else {
        array = _recordArrays.AdapterPopulatedRecordArray.create({
          modelName: modelName,
          query: query,
          content: A(),
          store: this.store,
          manager: this
        });
      }

      this._adapterPopulatedRecordArrays.push(array);

      return array;
    };

    RecordArrayManager.prototype.registerFilteredRecordArray = function registerFilteredRecordArray(array, modelName, filter) {
      (false && Ember.assert('recordArrayManger.registerFilteredRecordArray expects modelName not modelClass as the second param, received ' + modelName, typeof modelName === 'string'));


      this.filteredRecordArraysFor(modelName).push(array);
      this.updateFilter(array, modelName, filter);
    };

    RecordArrayManager.prototype.unregisterRecordArray = function unregisterRecordArray(array) {

      var modelName = array.modelName;

      // unregister filtered record array
      var recordArrays = this.filteredRecordArraysFor(modelName);
      var removedFromFiltered = remove(recordArrays, array);

      // remove from adapter populated record array
      var removedFromAdapterPopulated = remove(this._adapterPopulatedRecordArrays, array);

      if (!removedFromFiltered && !removedFromAdapterPopulated) {

        var liveRecordArrayForType = this._liveRecordArrays[modelName];
        // unregister live record array
        if (liveRecordArrayForType) {
          if (array === liveRecordArrayForType) {
            delete this._liveRecordArrays[modelName];
          }
        }
      }
    };

    RecordArrayManager.prototype.willDestroy = function willDestroy() {
      var _this = this;

      Object.keys(this._filteredRecordArrays).forEach(function (modelName) {
        return flatten(_this._filteredRecordArrays[modelName]).forEach(destroy);
      });
      Object.keys(this._liveRecordArrays).forEach(function (modelName) {
        return _this._liveRecordArrays[modelName].destroy();
      });
      this._adapterPopulatedRecordArrays.forEach(destroy);
      this.isDestroyed = true;
    };

    RecordArrayManager.prototype.destroy = function destroy() {
      this.isDestroying = true;
      emberRun.schedule('actions', this, this.willDestroy);
    };

    return RecordArrayManager;
  }();

  exports.default = RecordArrayManager;


  function destroy(entry) {
    entry.destroy();
  }

  function flatten(list) {
    var length = list.length;
    var result = [];

    for (var i = 0; i < length; i++) {
      result = result.concat(list[i]);
    }

    return result;
  }

  function remove(array, item) {
    var index = array.indexOf(item);

    if (index !== -1) {
      array.splice(index, 1);
      return true;
    }

    return false;
  }

  function _updateLiveRecordArray(array, internalModels) {
    var modelsToAdd = [];
    var modelsToRemove = [];

    for (var i = 0; i < internalModels.length; i++) {
      var internalModel = internalModels[i];
      var isDeleted = internalModel.isHiddenFromRecordArrays();
      var recordArrays = internalModel._recordArrays;

      if (!isDeleted && !internalModel.isEmpty()) {
        if (!recordArrays.has(array)) {
          modelsToAdd.push(internalModel);
          recordArrays.add(array);
        }
      }

      if (isDeleted) {
        modelsToRemove.push(internalModel);
        recordArrays.delete(array);
      }
    }

    if (modelsToAdd.length > 0) {
      array._pushInternalModels(modelsToAdd);
    }
    if (modelsToRemove.length > 0) {
      array._removeInternalModels(modelsToRemove);
    }
  }

  function removeFromAdapterPopulatedRecordArrays(internalModels) {
    for (var i = 0; i < internalModels.length; i++) {
      var internalModel = internalModels[i];
      var list = internalModel._recordArrays.list;

      for (var j = 0; j < list.length; j++) {
        // TODO: group by arrays, so we can batch remove
        list[j]._removeInternalModels([internalModel]);
      }

      internalModel._recordArrays.clear();
    }
  }

  function associateWithRecordArray(internalModels, array) {
    for (var i = 0, l = internalModels.length; i < l; i++) {
      var internalModel = internalModels[i];
      internalModel._recordArrays.add(array);
    }
  }
});
define("ember-data/-private/system/record-arrays", ["exports", "ember-data/-private/system/record-arrays/record-array", "ember-data/-private/system/record-arrays/filtered-record-array", "ember-data/-private/system/record-arrays/adapter-populated-record-array"], function (exports, _recordArray, _filteredRecordArray, _adapterPopulatedRecordArray) {
  "use strict";

  exports.__esModule = true;
  exports.AdapterPopulatedRecordArray = exports.FilteredRecordArray = exports.RecordArray = undefined;
  exports.RecordArray = _recordArray.default;
  exports.FilteredRecordArray = _filteredRecordArray.default;
  exports.AdapterPopulatedRecordArray = _adapterPopulatedRecordArray.default;
});
define('ember-data/-private/system/record-arrays/adapter-populated-record-array', ['exports', 'ember-data/-private/system/record-arrays/record-array', 'ember-data/-private/system/clone-null', 'ember-data/-private/system/record-array-manager'], function (exports, _recordArray, _cloneNull, _recordArrayManager) {
  'use strict';

  exports.__esModule = true;
  var once = Ember.run.once;
  var A = Ember.A;
  var get = Ember.get;
  exports.default = _recordArray.default.extend({
    init: function () {
      // yes we are touching `this` before super, but ArrayProxy has a bug that requires this.
      this.set('content', this.get('content') || A());

      this._super.apply(this, arguments);
      this.query = this.query || null;
      this.links = null;
    },
    replace: function () {
      throw new Error('The result of a server query (on ' + this.modelName + ') is immutable.');
    },
    _update: function () {
      var store = get(this, 'store');
      var query = get(this, 'query');

      return store._query(this.modelName, query, this);
    },


    /**
      @method _setInternalModels
      @param {Array} internalModels
      @param {Object} payload normalized payload
      @private
    */
    _setInternalModels: function (internalModels, payload) {

      // TODO: initial load should not cause change events at all, only
      // subsequent. This requires changing the public api of adapter.query, but
      // hopefully we can do that soon.
      this.get('content').setObjects(internalModels);

      this.setProperties({
        isLoaded: true,
        isUpdating: false,
        meta: (0, _cloneNull.default)(payload.meta),
        links: (0, _cloneNull.default)(payload.links)
      });

      (0, _recordArrayManager.associateWithRecordArray)(internalModels, this);

      // TODO: should triggering didLoad event be the last action of the runLoop?
      once(this, 'trigger', 'didLoad');
    }
  });
});
define('ember-data/-private/system/record-arrays/filtered-record-array', ['exports', 'ember-data/-private/system/record-arrays/record-array'], function (exports, _recordArray) {
  'use strict';

  exports.__esModule = true;
  var once = Ember.run.once;
  var get = Ember.get;
  var observer = Ember.observer;
  exports.default = _recordArray.default.extend({
    init: function () {
      this._super.apply(this, arguments);

      this.set('filterFunction', this.get('filterFunction') || null);
      this.isLoaded = true;
    },

    /**
      The filterFunction is a function used to test records from the store to
      determine if they should be part of the record array.
       Example
       ```javascript
      var allPeople = store.peekAll('person');
      allPeople.mapBy('name'); // ["Tom Dale", "Yehuda Katz", "Trek Glowacki"]
       var people = store.filter('person', function(person) {
        if (person.get('name').match(/Katz$/)) { return true; }
      });
      people.mapBy('name'); // ["Yehuda Katz"]
       var notKatzFilter = function(person) {
        return !person.get('name').match(/Katz$/);
      };
      people.set('filterFunction', notKatzFilter);
      people.mapBy('name'); // ["Tom Dale", "Trek Glowacki"]
      ```
       @method filterFunction
      @param {DS.Model} record
      @return {Boolean} `true` if the record should be in the array
    */

    replace: function () {
      throw new Error('The result of a client-side filter (on ' + this.modelName + ') is immutable.');
    },


    /**
      @method updateFilter
      @private
    */
    _updateFilter: function () {
      if (get(this, 'isDestroying') || get(this, 'isDestroyed')) {
        return;
      }
      get(this, 'manager').updateFilter(this, this.modelName, get(this, 'filterFunction'));
    },


    updateFilter: observer('filterFunction', function () {
      once(this, this._updateFilter);
    })
  });
});
define('ember-data/-private/system/record-arrays/record-array', ['exports', 'ember-data/-private/system/promise-proxies', 'ember-data/-private/system/snapshot-record-array'], function (exports, _promiseProxies, _snapshotRecordArray) {
  'use strict';

  exports.__esModule = true;
  var Evented = Ember.Evented;
  var ArrayProxy = Ember.ArrayProxy;
  var set = Ember.set;
  var get = Ember.get;
  var computed = Ember.computed;
  var Promise = Ember.RSVP.Promise;
  exports.default = ArrayProxy.extend(Evented, {
    init: function () {
      this._super.apply(this, arguments);

      /**
        The array of client ids backing the record array. When a
        record is requested from the record array, the record
        for the client id at the same index is materialized, if
        necessary, by the store.
         @property content
        @private
        @type Ember.Array
        */
      this.set('content', this.content || null);

      /**
      The flag to signal a `RecordArray` is finished loading data.
       Example
       ```javascript
      var people = store.peekAll('person');
      people.get('isLoaded'); // true
      ```
       @property isLoaded
      @type Boolean
      */
      this.isLoaded = this.isLoaded || false;
      /**
      The flag to signal a `RecordArray` is currently loading data.
      Example
      ```javascript
      var people = store.peekAll('person');
      people.get('isUpdating'); // false
      people.update();
      people.get('isUpdating'); // true
      ```
      @property isUpdating
      @type Boolean
      */
      this.isUpdating = false;

      /**
      The store that created this record array.
      @property store
      @private
      @type DS.Store
      */
      this.store = this.store || null;
      this._updatingPromise = null;
    },
    replace: function () {
      throw new Error('The result of a server query (for all ' + this.modelName + ' types) is immutable. To modify contents, use toArray()');
    },


    /**
     The modelClass represented by this record array.
      @property type
     @type DS.Model
     */
    type: computed('modelName', function () {
      if (!this.modelName) {
        return null;
      }
      return this.store._modelFor(this.modelName);
    }).readOnly(),

    /**
      Retrieves an object from the content by index.
       @method objectAtContent
      @private
      @param {Number} index
      @return {DS.Model} record
    */
    objectAtContent: function (index) {
      var internalModel = get(this, 'content').objectAt(index);
      return internalModel && internalModel.getRecord();
    },


    /**
      Used to get the latest version of all of the records in this array
      from the adapter.
       Example
       ```javascript
      var people = store.peekAll('person');
      people.get('isUpdating'); // false
       people.update().then(function() {
        people.get('isUpdating'); // false
      });
       people.get('isUpdating'); // true
      ```
       @method update
    */
    update: function () {
      var _this = this;

      if (get(this, 'isUpdating')) {
        return this._updatingPromise;
      }

      this.set('isUpdating', true);

      var updatingPromise = this._update().finally(function () {
        _this._updatingPromise = null;
        if (_this.get('isDestroying') || _this.get('isDestroyed')) {
          return;
        }
        _this.set('isUpdating', false);
      });

      this._updatingPromise = updatingPromise;

      return updatingPromise;
    },


    /*
      Update this RecordArray and return a promise which resolves once the update
      is finished.
     */
    _update: function () {
      return this.store.findAll(this.modelName, { reload: true });
    },


    /**
      Adds an internal model to the `RecordArray` without duplicates
       @method _pushInternalModels
      @private
      @param {InternalModel} internalModel
    */
    _pushInternalModels: function (internalModels) {
      // pushObjects because the internalModels._recordArrays set was already
      // consulted for inclusion, so addObject and its on .contains call is not
      // required.
      get(this, 'content').pushObjects(internalModels);
    },


    /**
      Removes an internalModel to the `RecordArray`.
       @method removeInternalModel
      @private
      @param {InternalModel} internalModel
    */
    _removeInternalModels: function (internalModels) {
      get(this, 'content').removeObjects(internalModels);
    },


    /**
      Saves all of the records in the `RecordArray`.
       Example
       ```javascript
      var messages = store.peekAll('message');
      messages.forEach(function(message) {
        message.set('hasBeenSeen', true);
      });
      messages.save();
      ```
       @method save
      @return {DS.PromiseArray} promise
    */
    save: function () {
      var _this2 = this;

      var promiseLabel = 'DS: RecordArray#save ' + this.modelName;
      var promise = Promise.all(this.invoke('save'), promiseLabel).then(function () {
        return _this2;
      }, null, 'DS: RecordArray#save return RecordArray');

      return _promiseProxies.PromiseArray.create({ promise: promise });
    },
    _dissociateFromOwnRecords: function () {
      var _this3 = this;

      this.get('content').forEach(function (internalModel) {
        var recordArrays = internalModel.__recordArrays;

        if (recordArrays) {
          recordArrays.delete(_this3);
        }
      });
    },


    /**
      @method _unregisterFromManager
      @private
    */
    _unregisterFromManager: function () {
      this.manager.unregisterRecordArray(this);
    },
    willDestroy: function () {
      this._unregisterFromManager();
      this._dissociateFromOwnRecords();
      // TODO: we should not do work during destroy:
      //   * when objects are destroyed, they should simply be left to do
      //   * if logic errors do to this, that logic needs to be more careful during
      //    teardown (ember provides isDestroying/isDestroyed) for this reason
      //   * the exception being: if an dominator has a reference to this object,
      //     and must be informed to release e.g. e.g. removing itself from th
      //     recordArrayMananger
      set(this, 'content', null);
      set(this, 'length', 0);
      this._super.apply(this, arguments);
    },


    /*
      @method _createSnapshot
      @private
    */
    _createSnapshot: function (options) {
      // this is private for users, but public for ember-data internals
      return new _snapshotRecordArray.default(this, this.get('meta'), options);
    },


    /*
      @method _takeSnapshot
      @private
    */
    _takeSnapshot: function () {
      return get(this, 'content').map(function (internalModel) {
        return internalModel.createSnapshot();
      });
    }
  });
});
define('ember-data/-private/system/references', ['exports', 'ember-data/-private/system/references/record', 'ember-data/-private/system/references/belongs-to', 'ember-data/-private/system/references/has-many'], function (exports, _record, _belongsTo, _hasMany) {
  'use strict';

  exports.__esModule = true;
  exports.HasManyReference = exports.BelongsToReference = exports.RecordReference = undefined;
  exports.RecordReference = _record.default;
  exports.BelongsToReference = _belongsTo.default;
  exports.HasManyReference = _hasMany.default;
});
define('ember-data/-private/system/references/belongs-to', ['exports', 'ember-data/-private/system/model/model', 'ember-data/-private/system/references/reference', 'ember-data/-private/features', 'ember-data/-debug'], function (exports, _model, _reference, _features, _debug) {
  'use strict';

  exports.__esModule = true;
  var resolve = Ember.RSVP.resolve;


  /**
     A BelongsToReference is a low level API that allows users and
     addon author to perform meta-operations on a belongs-to
     relationship.
  
     @class BelongsToReference
     @namespace DS
     @extends DS.Reference
  */
  var BelongsToReference = function (store, parentInternalModel, belongsToRelationship) {
    this._super$constructor(store, parentInternalModel);
    this.belongsToRelationship = belongsToRelationship;
    this.type = belongsToRelationship.relationshipMeta.type;
    this.parent = parentInternalModel.recordReference;

    // TODO inverse
  };

  BelongsToReference.prototype = Object.create(_reference.default.prototype);
  BelongsToReference.prototype.constructor = BelongsToReference;
  BelongsToReference.prototype._super$constructor = _reference.default;

  /**
     This returns a string that represents how the reference will be
     looked up when it is loaded. If the relationship has a link it will
     use the "link" otherwise it defaults to "id".
  
     Example
  
     ```javascript
      // models/blog.js
      export default DS.Model.extend({
        user: DS.belongsTo({ async: true })
      });
  
      let blog = store.push({
        type: 'blog',
        id: 1,
        relationships: {
          user: {
            data: { type: 'user', id: 1 }
          }
        }
      });
      let userRef = blog.belongsTo('user');
  
      // get the identifier of the reference
      if (userRef.remoteType() === "id") {
        let id = userRef.id();
      } else if (userRef.remoteType() === "link") {
        let link = userRef.link();
      }
      ```
  
     @method remoteType
     @return {String} The name of the remote type. This should either be "link" or "id"
  */
  BelongsToReference.prototype.remoteType = function () {
    if (this.belongsToRelationship.link) {
      return "link";
    }

    return "id";
  };

  /**
     The `id` of the record that this reference refers to. Together, the
     `type()` and `id()` methods form a composite key for the identity
     map. This can be used to access the id of an async relationship
     without triggering a fetch that would normally happen if you
     attempted to use `record.get('relationship.id')`.
  
     Example
  
     ```javascript
      // models/blog.js
      export default DS.Model.extend({
        user: DS.belongsTo({ async: true })
      });
  
      let blog = store.push({
        data: {
          type: 'blog',
          id: 1,
          relationships: {
            user: {
              data: { type: 'user', id: 1 }
            }
          }
        }
      });
      let userRef = blog.belongsTo('user');
  
      // get the identifier of the reference
      if (userRef.remoteType() === "id") {
        let id = userRef.id();
      }
      ```
  
     @method id
     @return {String} The id of the record in this belongsTo relationship.
  */
  BelongsToReference.prototype.id = function () {
    var inverseInternalModel = this.belongsToRelationship.inverseInternalModel;
    return inverseInternalModel && inverseInternalModel.id;
  };

  /**
     The link Ember Data will use to fetch or reload this belongs-to
     relationship.
  
     Example
  
     ```javascript
      // models/blog.js
      export default DS.Model.extend({
        user: DS.belongsTo({ async: true })
      });
  
      let blog = store.push({
        data: {
          type: 'blog',
          id: 1,
          relationships: {
            user: {
              links: {
                related: '/articles/1/author'
              }
            }
          }
        }
      });
      let userRef = blog.belongsTo('user');
  
      // get the identifier of the reference
      if (userRef.remoteType() === "link") {
        let link = userRef.link();
      }
      ```
  
     @method link
     @return {String} The link Ember Data will use to fetch or reload this belongs-to relationship.
  */
  BelongsToReference.prototype.link = function () {
    return this.belongsToRelationship.link;
  };

  /**
     The meta data for the belongs-to relationship.
  
     Example
  
     ```javascript
      // models/blog.js
      export default DS.Model.extend({
        user: DS.belongsTo({ async: true })
      });
  
      let blog = store.push({
        data: {
          type: 'blog',
          id: 1,
          relationships: {
            user: {
              links: {
                related: {
                  href: '/articles/1/author',
                  meta: {
                    lastUpdated: 1458014400000
                  }
                }
              }
            }
          }
        }
      });
  
      let userRef = blog.belongsTo('user');
  
      userRef.meta() // { lastUpdated: 1458014400000 }
      ```
  
     @method meta
     @return {Object} The meta information for the belongs-to relationship.
  */
  BelongsToReference.prototype.meta = function () {
    return this.belongsToRelationship.meta;
  };

  /**
     `push` can be used to update the data in the relationship and Ember
     Data will treat the new data as the conanical value of this
     relationship on the backend.
  
     Example
  
      ```javascript
      // models/blog.js
      export default DS.Model.extend({
        user: DS.belongsTo({ async: true })
      });
  
      let blog = store.push({
        data: {
          type: 'blog',
          id: 1,
          relationships: {
            user: {
              data: { type: 'user', id: 1 }
            }
          }
        }
      });
      let userRef = blog.belongsTo('user');
  
      // provide data for reference
      userRef.push({
        data: {
          type: 'user',
          id: 1,
          attributes: {
            username: "@user"
          }
        }
      }).then(function(user) {
        userRef.value() === user;
      });
      ```
  
     @method push
     @param {Object|Promise} objectOrPromise a promise that resolves to a JSONAPI document object describing the new value of this relationship.
     @return {Promise<record>} A promise that resolves with the new value in this belongs-to relationship.
  */
  BelongsToReference.prototype.push = function (objectOrPromise) {
    var _this = this;

    return resolve(objectOrPromise).then(function (data) {
      var record = void 0;

      if (data instanceof _model.default) {
        if ((0, _features.default)('ds-overhaul-references')) {
          (false && !(false) && Ember.deprecate("BelongsToReference#push(DS.Model) is deprecated. Update relationship via `model.set('relationshipName', value)` instead.", false, {
            id: 'ds.references.belongs-to.push-record',
            until: '3.0'
          }));
        }
        record = data;
      } else {
        record = _this.store.push(data);
      }

      (0, _debug.assertPolymorphicType)(_this.internalModel, _this.belongsToRelationship.relationshipMeta, record._internalModel);

      _this.belongsToRelationship.setCanonicalInternalModel(record._internalModel);

      return record;
    });
  };

  /**
     `value()` synchronously returns the current value of the belongs-to
     relationship. Unlike `record.get('relationshipName')`, calling
     `value()` on a reference does not trigger a fetch if the async
     relationship is not yet loaded. If the relationship is not loaded
     it will always return `null`.
  
     Example
  
      ```javascript
      // models/blog.js
      export default DS.Model.extend({
        user: DS.belongsTo({ async: true })
      });
  
      let blog = store.push({
        data: {
          type: 'blog',
          id: 1,
          relationships: {
            user: {
              data: { type: 'user', id: 1 }
            }
          }
        }
      });
      let userRef = blog.belongsTo('user');
  
      userRef.value(); // null
  
      // provide data for reference
      userRef.push({
        data: {
          type: 'user',
          id: 1,
          attributes: {
            username: "@user"
          }
        }
      }).then(function(user) {
        userRef.value(); // user
      });
      ```
  
     @method value
     @return {DS.Model} the record in this relationship
  */
  BelongsToReference.prototype.value = function () {
    var inverseInternalModel = this.belongsToRelationship.inverseInternalModel;

    if (inverseInternalModel && inverseInternalModel.isLoaded()) {
      return inverseInternalModel.getRecord();
    }

    return null;
  };

  /**
     Loads a record in a belongs to relationship if it is not already
     loaded. If the relationship is already loaded this method does not
     trigger a new load.
  
     Example
  
      ```javascript
      // models/blog.js
      export default DS.Model.extend({
        user: DS.belongsTo({ async: true })
      });
  
      let blog = store.push({
        data: {
          type: 'blog',
          id: 1,
          relationships: {
            user: {
              data: { type: 'user', id: 1 }
            }
          }
        }
      });
      let userRef = blog.belongsTo('user');
  
      userRef.value(); // null
  
      userRef.load().then(function(user) {
        userRef.value() === user
      });
      ```
  
     @method load
     @return {Promise} a promise that resolves with the record in this belongs-to relationship.
  */
  BelongsToReference.prototype.load = function () {
    var _this2 = this;

    if (this.remoteType() === "id") {
      return this.belongsToRelationship.getRecord();
    }

    if (this.remoteType() === "link") {
      return this.belongsToRelationship.findLink().then(function (internalModel) {
        return _this2.value();
      });
    }
  };

  /**
     Triggers a reload of the value in this relationship. If the
     remoteType is `"link"` Ember Data will use the relationship link to
     reload the relationship. Otherwise it will reload the record by its
     id.
  
     Example
  
      ```javascript
      // models/blog.js
      export default DS.Model.extend({
        user: DS.belongsTo({ async: true })
      });
  
      let blog = store.push({
        data: {
          type: 'blog',
          id: 1,
          relationships: {
            user: {
              data: { type: 'user', id: 1 }
            }
          }
        }
      });
      let userRef = blog.belongsTo('user');
  
      userRef.reload().then(function(user) {
        userRef.value() === user
      });
      ```
  
     @method reload
     @return {Promise} a promise that resolves with the record in this belongs-to relationship after the reload has completed.
  */
  BelongsToReference.prototype.reload = function () {
    var _this3 = this;

    return this.belongsToRelationship.reload().then(function (internalModel) {
      return _this3.value();
    });
  };

  exports.default = BelongsToReference;
});
define('ember-data/-private/system/references/has-many', ['exports', 'ember-data/-private/system/references/reference', 'ember-data/-debug', 'ember-data/-private/features'], function (exports, _reference, _debug, _features) {
  'use strict';

  exports.__esModule = true;
  var A = Ember.A;
  var resolve = Ember.RSVP.resolve;
  var get = Ember.get;


  /**
     A HasManyReference is a low level API that allows users and addon
     author to perform meta-operations on a has-many relationship.
  
     @class HasManyReference
     @namespace DS
  */
  var HasManyReference = function (store, parentInternalModel, hasManyRelationship) {
    this._super$constructor(store, parentInternalModel);
    this.hasManyRelationship = hasManyRelationship;
    this.type = hasManyRelationship.relationshipMeta.type;
    this.parent = parentInternalModel.recordReference;

    // TODO inverse
  };

  HasManyReference.prototype = Object.create(_reference.default.prototype);
  HasManyReference.prototype.constructor = HasManyReference;
  HasManyReference.prototype._super$constructor = _reference.default;

  /**
     This returns a string that represents how the reference will be
     looked up when it is loaded. If the relationship has a link it will
     use the "link" otherwise it defaults to "id".
  
     Example
  
     ```app/models/post.js
     export default DS.Model.extend({
       comments: DS.hasMany({ async: true })
     });
     ```
  
     ```javascript
     let post = store.push({
       data: {
         type: 'post',
         id: 1,
         relationships: {
           comments: {
             data: [{ type: 'comment', id: 1 }]
           }
         }
       }
     });
  
     let commentsRef = post.hasMany('comments');
  
     // get the identifier of the reference
     if (commentsRef.remoteType() === "ids") {
       let ids = commentsRef.ids();
     } else if (commentsRef.remoteType() === "link") {
       let link = commentsRef.link();
     }
     ```
  
     @method remoteType
     @return {String} The name of the remote type. This should either be "link" or "ids"
  */
  HasManyReference.prototype.remoteType = function () {
    if (this.hasManyRelationship.link) {
      return "link";
    }

    return "ids";
  };

  /**
     The link Ember Data will use to fetch or reload this has-many
     relationship.
  
     Example
  
     ```app/models/post.js
     export default DS.Model.extend({
       comments: DS.hasMany({ async: true })
     });
     ```
  
     ```javascript
     let post = store.push({
       data: {
         type: 'post',
         id: 1,
         relationships: {
           comments: {
             links: {
               related: '/posts/1/comments'
             }
           }
         }
       }
     });
  
     let commentsRef = post.hasMany('comments');
  
     commentsRef.link(); // '/posts/1/comments'
     ```
  
     @method link
     @return {String} The link Ember Data will use to fetch or reload this has-many relationship.
  */
  HasManyReference.prototype.link = function () {
    return this.hasManyRelationship.link;
  };

  /**
     `ids()` returns an array of the record ids in this relationship.
  
     Example
  
     ```app/models/post.js
     export default DS.Model.extend({
       comments: DS.hasMany({ async: true })
     });
     ```
  
     ```javascript
     let post = store.push({
       data: {
         type: 'post',
         id: 1,
         relationships: {
           comments: {
             data: [{ type: 'comment', id: 1 }]
           }
         }
       }
     });
  
     let commentsRef = post.hasMany('comments');
  
     commentsRef.ids(); // ['1']
     ```
  
     @method ids
     @return {Array} The ids in this has-many relationship
  */
  HasManyReference.prototype.ids = function () {
    var members = this.hasManyRelationship.members.toArray();

    return members.map(function (internalModel) {
      return internalModel.id;
    });
  };

  /**
     The meta data for the has-many relationship.
  
     Example
  
     ```app/models/post.js
     export default DS.Model.extend({
       comments: DS.hasMany({ async: true })
     });
     ```
  
     ```javascript
     let post = store.push({
       data: {
         type: 'post',
         id: 1,
         relationships: {
           comments: {
             links: {
               related: {
                 href: '/posts/1/comments',
                 meta: {
                   count: 10
                 }
               }
             }
           }
         }
       }
     });
  
     let commentsRef = post.hasMany('comments');
  
     commentsRef.meta(); // { count: 10 }
     ```
  
     @method meta
     @return {Object} The meta information for the has-many relationship.
  */
  HasManyReference.prototype.meta = function () {
    return this.hasManyRelationship.meta;
  };

  /**
     `push` can be used to update the data in the relationship and Ember
     Data will treat the new data as the canonical value of this
     relationship on the backend.
  
     Example
  
     ```app/models/post.js
     export default DS.Model.extend({
       comments: DS.hasMany({ async: true })
     });
     ```
  
     ```
     let post = store.push({
       data: {
         type: 'post',
         id: 1,
         relationships: {
           comments: {
             data: [{ type: 'comment', id: 1 }]
           }
         }
       }
     });
  
     let commentsRef = post.hasMany('comments');
  
     commentsRef.ids(); // ['1']
  
     commentsRef.push([
       [{ type: 'comment', id: 2 }],
       [{ type: 'comment', id: 3 }],
     ])
  
     commentsRef.ids(); // ['2', '3']
     ```
  
     @method push
     @param {Array|Promise} objectOrPromise a promise that resolves to a JSONAPI document object describing the new value of this relationship.
     @return {DS.ManyArray}
  */
  HasManyReference.prototype.push = function (objectOrPromise) {
    var _this = this;

    return resolve(objectOrPromise).then(function (payload) {
      var array = payload;

      if ((0, _features.default)("ds-overhaul-references")) {
        (false && !(!Array.isArray(payload)) && Ember.deprecate("HasManyReference#push(array) is deprecated. Push a JSON-API document instead.", !Array.isArray(payload), {
          id: 'ds.references.has-many.push-array',
          until: '3.0'
        }));
      }

      var useLegacyArrayPush = true;
      if (typeof payload === "object" && payload.data) {
        array = payload.data;
        useLegacyArrayPush = array.length && array[0].data;

        if ((0, _features.default)('ds-overhaul-references')) {
          (false && !(!useLegacyArrayPush) && Ember.deprecate("HasManyReference#push() expects a valid JSON-API document.", !useLegacyArrayPush, {
            id: 'ds.references.has-many.push-invalid-json-api',
            until: '3.0'
          }));
        }
      }

      if (!(0, _features.default)('ds-overhaul-references')) {
        useLegacyArrayPush = true;
      }

      var internalModels = void 0;
      if (useLegacyArrayPush) {
        internalModels = array.map(function (obj) {
          var record = _this.store.push(obj);

          if (false) {
            var relationshipMeta = _this.hasManyRelationship.relationshipMeta;
            (0, _debug.assertPolymorphicType)(_this.internalModel, relationshipMeta, record._internalModel);
          }

          return record._internalModel;
        });
      } else {
        var records = _this.store.push(payload);
        internalModels = A(records).mapBy('_internalModel');

        if (false) {
          internalModels.forEach(function (internalModel) {
            var relationshipMeta = _this.hasManyRelationship.relationshipMeta;
            (0, _debug.assertPolymorphicType)(_this.internalModel, relationshipMeta, internalModel);
          });
        }
      }

      _this.hasManyRelationship.computeChanges(internalModels);

      return _this.hasManyRelationship.manyArray;
    });
  };

  HasManyReference.prototype._isLoaded = function () {
    var hasData = get(this.hasManyRelationship, 'hasData');
    if (!hasData) {
      return false;
    }

    var members = this.hasManyRelationship.members.toArray();

    return members.every(function (internalModel) {
      return internalModel.isLoaded() === true;
    });
  };

  /**
     `value()` synchronously returns the current value of the has-many
      relationship. Unlike `record.get('relationshipName')`, calling
      `value()` on a reference does not trigger a fetch if the async
      relationship is not yet loaded. If the relationship is not loaded
      it will always return `null`.
  
     Example
  
     ```app/models/post.js
     export default DS.Model.extend({
       comments: DS.hasMany({ async: true })
     });
     ```
  
     ```javascript
     let post = store.push({
       data: {
         type: 'post',
         id: 1,
         relationships: {
           comments: {
             data: [{ type: 'comment', id: 1 }]
           }
         }
       }
     });
  
     let commentsRef = post.hasMany('comments');
  
     post.get('comments').then(function(comments) {
       commentsRef.value() === comments
     })
     ```
  
     @method value
     @return {DS.ManyArray}
  */
  HasManyReference.prototype.value = function () {
    if (this._isLoaded()) {
      return this.hasManyRelationship.manyArray;
    }

    return null;
  };

  /**
     Loads the relationship if it is not already loaded.  If the
     relationship is already loaded this method does not trigger a new
     load.
  
     Example
  
     ```app/models/post.js
     export default DS.Model.extend({
       comments: DS.hasMany({ async: true })
     });
     ```
  
     ```javascript
     let post = store.push({
       data: {
         type: 'post',
         id: 1,
         relationships: {
           comments: {
             data: [{ type: 'comment', id: 1 }]
           }
         }
       }
     });
  
     let commentsRef = post.hasMany('comments');
  
     commentsRef.load().then(function(comments) {
       //...
     });
     ```
  
     @method load
     @return {Promise} a promise that resolves with the ManyArray in
     this has-many relationship.
  */
  HasManyReference.prototype.load = function () {
    if (!this._isLoaded()) {
      return this.hasManyRelationship.getRecords();
    }

    return resolve(this.hasManyRelationship.manyArray);
  };

  /**
     Reloads this has-many relationship.
  
     Example
  
     ```app/models/post.js
     export default DS.Model.extend({
       comments: DS.hasMany({ async: true })
     });
     ```
  
     ```javascript
     let post = store.push({
       data: {
         type: 'post',
         id: 1,
         relationships: {
           comments: {
             data: [{ type: 'comment', id: 1 }]
           }
         }
       }
     });
  
     let commentsRef = post.hasMany('comments');
  
     commentsRef.reload().then(function(comments) {
       //...
     });
     ```
  
     @method reload
     @return {Promise} a promise that resolves with the ManyArray in this has-many relationship.
  */
  HasManyReference.prototype.reload = function () {
    return this.hasManyRelationship.reload();
  };

  exports.default = HasManyReference;
});
define('ember-data/-private/system/references/record', ['exports', 'ember-data/-private/system/references/reference'], function (exports, _reference) {
  'use strict';

  exports.__esModule = true;
  var resolve = Ember.RSVP.resolve;


  /**
     An RecordReference is a low level API that allows users and
     addon author to perform meta-operations on a record.
  
     @class RecordReference
     @namespace DS
  */
  var RecordReference = function (store, internalModel) {
    this._super$constructor(store, internalModel);
    this.type = internalModel.modelName;
    this._id = internalModel.id;
  };

  RecordReference.prototype = Object.create(_reference.default.prototype);
  RecordReference.prototype.constructor = RecordReference;
  RecordReference.prototype._super$constructor = _reference.default;

  /**
     The `id` of the record that this reference refers to.
  
     Together, the `type` and `id` properties form a composite key for
     the identity map.
  
     Example
  
     ```javascript
     let userRef = store.getReference('user', 1);
  
     userRef.id(); // '1'
     ```
  
     @method id
     @return {String} The id of the record.
  */
  RecordReference.prototype.id = function () {
    return this._id;
  };

  /**
     How the reference will be looked up when it is loaded: Currently
     this always return `identity` to signifying that a record will be
     loaded by the `type` and `id`.
  
     Example
  
     ```javascript
     const userRef = store.getReference('user', 1);
  
     userRef.remoteType(); // 'identity'
     ```
  
     @method remoteType
     @return {String} 'identity'
  */
  RecordReference.prototype.remoteType = function () {
    return 'identity';
  };

  /**
    This API allows you to provide a reference with new data. The
    simplest usage of this API is similar to `store.push`: you provide a
    normalized hash of data and the object represented by the reference
    will update.
  
    If you pass a promise to `push`, Ember Data will not ask the adapter
    for the data if another attempt to fetch it is made in the
    interim. When the promise resolves, the underlying object is updated
    with the new data, and the promise returned by *this function* is resolved
    with that object.
  
    For example, `recordReference.push(promise)` will be resolved with a
    record.
  
     Example
  
     ```javascript
     let userRef = store.getReference('user', 1);
  
     // provide data for reference
     userRef.push({ data: { id: 1, username: "@user" }}).then(function(user) {
       userRef.value() === user;
     });
     ```
  
    @method push
    @param {Promise|Object}
    @return Promise<record> a promise for the value (record or relationship)
  */
  RecordReference.prototype.push = function (objectOrPromise) {
    var _this = this;

    return resolve(objectOrPromise).then(function (data) {
      return _this.store.push(data);
    });
  };

  /**
    If the entity referred to by the reference is already loaded, it is
    present as `reference.value`. Otherwise the value returned by this function
    is `null`.
  
     Example
  
     ```javascript
     let userRef = store.getReference('user', 1);
  
     userRef.value(); // user
     ```
  
     @method value
     @return {DS.Model} the record for this RecordReference
  */
  RecordReference.prototype.value = function () {
    if (this.internalModel.hasRecord) {
      return this.internalModel.getRecord();
    }
    return null;
  };

  /**
     Triggers a fetch for the backing entity based on its `remoteType`
     (see `remoteType` definitions per reference type).
  
     Example
  
     ```javascript
     let userRef = store.getReference('user', 1);
  
     // load user (via store.find)
     userRef.load().then(...)
     ```
  
     @method load
     @return {Promise<record>} the record for this RecordReference
  */
  RecordReference.prototype.load = function () {
    return this.store.findRecord(this.type, this._id);
  };

  /**
     Reloads the record if it is already loaded. If the record is not
     loaded it will load the record via `store.findRecord`
  
     Example
  
     ```javascript
     let userRef = store.getReference('user', 1);
  
     // or trigger a reload
     userRef.reload().then(...)
     ```
  
     @method reload
     @return {Promise<record>} the record for this RecordReference
  */
  RecordReference.prototype.reload = function () {
    var record = this.value();
    if (record) {
      return record.reload();
    }

    return this.load();
  };

  exports.default = RecordReference;
});
define("ember-data/-private/system/references/reference", ["exports"], function (exports) {
  "use strict";

  exports.__esModule = true;
  var Reference = function (store, internalModel) {
    this.store = store;
    this.internalModel = internalModel;
  };

  Reference.prototype = {
    constructor: Reference
  };

  exports.default = Reference;
});
define('ember-data/-private/system/relationship-meta', ['exports', 'ember-inflector', 'ember-data/-private/system/normalize-model-name'], function (exports, _emberInflector, _normalizeModelName) {
  'use strict';

  exports.__esModule = true;
  exports.typeForRelationshipMeta = typeForRelationshipMeta;
  exports.relationshipFromMeta = relationshipFromMeta;
  function typeForRelationshipMeta(meta) {
    var modelName = void 0;

    modelName = meta.type || meta.key;
    if (meta.kind === 'hasMany') {
      modelName = (0, _emberInflector.singularize)((0, _normalizeModelName.default)(modelName));
    }
    return modelName;
  }

  function relationshipFromMeta(meta) {
    var result = {
      key: meta.key,
      kind: meta.kind,
      type: typeForRelationshipMeta(meta),
      options: meta.options,
      name: meta.name,
      parentType: meta.parentType,
      isRelationship: true
    };

    if (false) {
      result.parentType = meta.parentType;
    }

    return result;
  }
});
define('ember-data/-private/system/relationships/belongs-to', ['exports', 'ember-data/-private/system/normalize-model-name'], function (exports, _normalizeModelName) {
  'use strict';

  exports.__esModule = true;
  exports.default = belongsTo;
  var computed = Ember.computed;
  var inspect = Ember.inspect;


  /**
    `DS.belongsTo` is used to define One-To-One and One-To-Many
    relationships on a [DS.Model](/api/data/classes/DS.Model.html).
  
  
    `DS.belongsTo` takes an optional hash as a second parameter, currently
    supported options are:
  
    - `async`: A boolean value used to explicitly declare this to be an async relationship.
    - `inverse`: A string used to identify the inverse property on a
      related model in a One-To-Many relationship. See [Explicit Inverses](#toc_explicit-inverses)
  
    #### One-To-One
    To declare a one-to-one relationship between two models, use
    `DS.belongsTo`:
  
    ```app/models/user.js
    import DS from 'ember-data';
  
    export default DS.Model.extend({
      profile: DS.belongsTo('profile')
    });
    ```
  
    ```app/models/profile.js
    import DS from 'ember-data';
  
    export default DS.Model.extend({
      user: DS.belongsTo('user')
    });
    ```
  
    #### One-To-Many
    To declare a one-to-many relationship between two models, use
    `DS.belongsTo` in combination with `DS.hasMany`, like this:
  
    ```app/models/post.js
    import DS from 'ember-data';
  
    export default DS.Model.extend({
      comments: DS.hasMany('comment')
    });
    ```
  
    ```app/models/comment.js
    import DS from 'ember-data';
  
    export default DS.Model.extend({
      post: DS.belongsTo('post')
    });
    ```
  
    You can avoid passing a string as the first parameter. In that case Ember Data
    will infer the type from the key name.
  
    ```app/models/comment.js
    import DS from 'ember-data';
  
    export default DS.Model.extend({
      post: DS.belongsTo()
    });
    ```
  
    will lookup for a Post type.
  
    @namespace
    @method belongsTo
    @for DS
    @param {String} modelName (optional) type of the relationship
    @param {Object} options (optional) a hash of options
    @return {Ember.computed} relationship
  */
  function belongsTo(modelName, options) {
    var opts = void 0,
        userEnteredModelName = void 0;
    if (typeof modelName === 'object') {
      opts = modelName;
      userEnteredModelName = undefined;
    } else {
      opts = options;
      userEnteredModelName = modelName;
    }

    if (typeof userEnteredModelName === 'string') {
      userEnteredModelName = (0, _normalizeModelName.default)(userEnteredModelName);
    }

    (false && Ember.assert("The first argument to DS.belongsTo must be a string representing a model type key, not an instance of " + inspect(userEnteredModelName) + ". E.g., to define a relation to the Person model, use DS.belongsTo('person')", typeof userEnteredModelName === 'string' || typeof userEnteredModelName === 'undefined'));


    opts = opts || {};

    var meta = {
      type: userEnteredModelName,
      isRelationship: true,
      options: opts,
      kind: 'belongsTo',
      name: 'Belongs To',
      key: null
    };

    return computed({
      get: function (key) {
        if (opts.hasOwnProperty('serialize')) {
          (false && Ember.warn('You provided a serialize option on the "' + key + '" property in the "' + this._internalModel.modelName + '" class, this belongs in the serializer. See DS.Serializer and it\'s implementations https://emberjs.com/api/data/classes/DS.Serializer.html', false, {
            id: 'ds.model.serialize-option-in-belongs-to'
          }));
        }

        if (opts.hasOwnProperty('embedded')) {
          (false && Ember.warn('You provided an embedded option on the "' + key + '" property in the "' + this._internalModel.modelName + '" class, this belongs in the serializer. See DS.EmbeddedRecordsMixin https://emberjs.com/api/data/classes/DS.EmbeddedRecordsMixin.html', false, {
            id: 'ds.model.embedded-option-in-belongs-to'
          }));
        }

        return this._internalModel._relationships.get(key).getRecord();
      },
      set: function (key, value) {
        if (value === undefined) {
          value = null;
        }
        if (value && value.then) {
          this._internalModel._relationships.get(key).setRecordPromise(value);
        } else if (value) {
          this._internalModel._relationships.get(key).setInternalModel(value._internalModel);
        } else {
          this._internalModel._relationships.get(key).setInternalModel(value);
        }

        return this._internalModel._relationships.get(key).getRecord();
      }
    }).meta(meta);
  }
});
define('ember-data/-private/system/relationships/ext', ['exports', 'ember-data/-private/system/relationship-meta'], function (exports, _relationshipMeta) {
  'use strict';

  exports.__esModule = true;
  exports.relationshipsByNameDescriptor = exports.relatedTypesDescriptor = exports.relationshipsDescriptor = undefined;
  var A = Ember.A;
  var computed = Ember.computed;
  var MapWithDefault = Ember.MapWithDefault;
  var Map = Ember.Map;
  var relationshipsDescriptor = exports.relationshipsDescriptor = computed(function () {
    if (Ember.testing === true && relationshipsDescriptor._cacheable === true) {
      relationshipsDescriptor._cacheable = false;
    }

    var map = new MapWithDefault({
      defaultValue: function () {
        return [];
      }
    });

    // Loop through each computed property on the class
    this.eachComputedProperty(function (name, meta) {
      // If the computed property is a relationship, add
      // it to the map.
      if (meta.isRelationship) {
        meta.key = name;
        var relationshipsForType = map.get((0, _relationshipMeta.typeForRelationshipMeta)(meta));

        relationshipsForType.push({
          name: name,
          kind: meta.kind
        });
      }
    });

    return map;
  }).readOnly();

  var relatedTypesDescriptor = exports.relatedTypesDescriptor = computed(function () {
    var _this = this;

    if (Ember.testing === true && relatedTypesDescriptor._cacheable === true) {
      relatedTypesDescriptor._cacheable = false;
    }

    var modelName = void 0;
    var types = A();

    // Loop through each computed property on the class,
    // and create an array of the unique types involved
    // in relationships
    this.eachComputedProperty(function (name, meta) {
      if (meta.isRelationship) {
        meta.key = name;
        modelName = (0, _relationshipMeta.typeForRelationshipMeta)(meta);

        (false && Ember.assert('You specified a hasMany (' + meta.type + ') on ' + meta.parentType + ' but ' + meta.type + ' was not found.', modelName));


        if (!types.includes(modelName)) {
          (false && Ember.assert('Trying to sideload ' + name + ' on ' + _this.toString() + ' but the type doesn\'t exist.', !!modelName));

          types.push(modelName);
        }
      }
    });

    return types;
  }).readOnly();

  var relationshipsByNameDescriptor = exports.relationshipsByNameDescriptor = computed(function () {
    var map = Map.create();

    this.eachComputedProperty(function (name, meta) {
      if (meta.isRelationship) {
        meta.key = name;
        var relationship = (0, _relationshipMeta.relationshipFromMeta)(meta);
        relationship.type = (0, _relationshipMeta.typeForRelationshipMeta)(meta);
        map.set(name, relationship);
      }
    });

    return map;
  }).readOnly();
});
define('ember-data/-private/system/relationships/has-many', ['exports', 'ember-data/-private/system/normalize-model-name', 'ember-data/-private/system/is-array-like'], function (exports, _normalizeModelName, _isArrayLike) {
  'use strict';

  exports.__esModule = true;
  exports.default = hasMany;
  var A = Ember.A;
  var get = Ember.get;
  var computed = Ember.computed;
  var inspect = Ember.inspect;


  /**
    `DS.hasMany` is used to define One-To-Many and Many-To-Many
    relationships on a [DS.Model](/api/data/classes/DS.Model.html).
  
    `DS.hasMany` takes an optional hash as a second parameter, currently
    supported options are:
  
    - `async`: A boolean value used to explicitly declare this to be an async relationship.
    - `inverse`: A string used to identify the inverse property on a related model.
  
    #### One-To-Many
    To declare a one-to-many relationship between two models, use
    `DS.belongsTo` in combination with `DS.hasMany`, like this:
  
    ```app/models/post.js
    import DS from 'ember-data';
  
    export default DS.Model.extend({
      comments: DS.hasMany('comment')
    });
    ```
  
    ```app/models/comment.js
    import DS from 'ember-data';
  
    export default DS.Model.extend({
      post: DS.belongsTo('post')
    });
    ```
  
    #### Many-To-Many
    To declare a many-to-many relationship between two models, use
    `DS.hasMany`:
  
    ```app/models/post.js
    import DS from 'ember-data';
  
    export default DS.Model.extend({
      tags: DS.hasMany('tag')
    });
    ```
  
    ```app/models/tag.js
    import DS from 'ember-data';
  
    export default DS.Model.extend({
      posts: DS.hasMany('post')
    });
    ```
  
    You can avoid passing a string as the first parameter. In that case Ember Data
    will infer the type from the singularized key name.
  
    ```app/models/post.js
    import DS from 'ember-data';
  
    export default DS.Model.extend({
      tags: DS.hasMany()
    });
    ```
  
    will lookup for a Tag type.
  
    #### Explicit Inverses
  
    Ember Data will do its best to discover which relationships map to
    one another. In the one-to-many code above, for example, Ember Data
    can figure out that changing the `comments` relationship should update
    the `post` relationship on the inverse because post is the only
    relationship to that model.
  
    However, sometimes you may have multiple `belongsTo`/`hasMany` for the
    same type. You can specify which property on the related model is
    the inverse using `DS.hasMany`'s `inverse` option:
  
    ```app/models/comment.js
    import DS from 'ember-data';
  
    export default DS.Model.extend({
      onePost: DS.belongsTo('post'),
      twoPost: DS.belongsTo('post'),
      redPost: DS.belongsTo('post'),
      bluePost: DS.belongsTo('post')
    });
    ```
  
    ```app/models/post.js
    import DS from 'ember-data';
  
    export default DS.Model.extend({
      comments: DS.hasMany('comment', {
        inverse: 'redPost'
      })
    });
    ```
  
    You can also specify an inverse on a `belongsTo`, which works how
    you'd expect.
  
    @namespace
    @method hasMany
    @for DS
    @param {String} type (optional) type of the relationship
    @param {Object} options (optional) a hash of options
    @return {Ember.computed} relationship
  */
  function hasMany(type, options) {
    if (typeof type === 'object') {
      options = type;
      type = undefined;
    }

    (false && Ember.assert('The first argument to DS.hasMany must be a string representing a model type key, not an instance of ' + inspect(type) + '. E.g., to define a relation to the Comment model, use DS.hasMany(\'comment\')', typeof type === 'string' || typeof type === 'undefined'));


    options = options || {};

    if (typeof type === 'string') {
      type = (0, _normalizeModelName.default)(type);
    }

    // Metadata about relationships is stored on the meta of
    // the relationship. This is used for introspection and
    // serialization. Note that `key` is populated lazily
    // the first time the CP is called.
    var meta = {
      type: type,
      options: options,
      isRelationship: true,
      kind: 'hasMany',
      name: 'Has Many',
      key: null
    };

    return computed({
      get: function (key) {
        return this._internalModel._relationships.get(key).getRecords();
      },
      set: function (key, records) {
        (false && Ember.assert('You must pass an array of records to set a hasMany relationship', (0, _isArrayLike.default)(records)));
        (false && Ember.assert('All elements of a hasMany relationship must be instances of DS.Model, you passed ' + inspect(records), function () {
          return A(records).every(function (record) {
            return record.hasOwnProperty('_internalModel') === true;
          });
        }()));


        var relationship = this._internalModel._relationships.get(key);
        relationship.clear();
        relationship.addInternalModels(records.map(function (record) {
          return get(record, '_internalModel');
        }));
        return relationship.getRecords();
      }
    }).meta(meta);
  }
});
define('ember-data/-private/system/relationships/relationship-payloads-manager', ['exports', 'ember-data/-private/system/relationships/relationship-payloads'], function (exports, _relationshipPayloads) {
  'use strict';

  exports.__esModule = true;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _get = Ember.get;

  var RelationshipPayloadsManager = function () {
    function RelationshipPayloadsManager(store) {
      _classCallCheck(this, RelationshipPayloadsManager);

      this._store = store;
      // cache of `RelationshipPayload`s
      this._cache = Object.create(null);
    }

    /**
      Find the payload for the given relationship of the given model.
       Returns the payload for the given relationship, whether raw or computed from
      the payload of the inverse relationship.
       @example
         relationshipPayloadsManager.get('hobby', 2, 'user') === {
          {
            data: {
              id: 1,
              type: 'user'
            }
          }
        }
       @method
    */


    RelationshipPayloadsManager.prototype.get = function get(modelName, id, relationshipName) {
      var modelClass = this._store._modelFor(modelName);
      var relationshipsByName = _get(modelClass, 'relationshipsByName');
      var relationshipPayloads = this._getRelationshipPayloads(modelName, relationshipName, modelClass, relationshipsByName, false);
      return relationshipPayloads && relationshipPayloads.get(modelName, id, relationshipName);
    };

    RelationshipPayloadsManager.prototype.push = function push(modelName, id, relationshipsData) {
      var _this = this;

      if (!relationshipsData) {
        return;
      }

      var modelClass = this._store._modelFor(modelName);
      var relationshipsByName = _get(modelClass, 'relationshipsByName');
      Object.keys(relationshipsData).forEach(function (key) {
        var relationshipPayloads = _this._getRelationshipPayloads(modelName, key, modelClass, relationshipsByName, true);
        if (relationshipPayloads) {
          relationshipPayloads.push(modelName, id, key, relationshipsData[key]);
        }
      });
    };

    RelationshipPayloadsManager.prototype.unload = function unload(modelName, id) {
      var _this2 = this;

      var modelClass = this._store._modelFor(modelName);
      var relationshipsByName = _get(modelClass, 'relationshipsByName');
      relationshipsByName.forEach(function (_, relationshipName) {
        var relationshipPayloads = _this2._getRelationshipPayloads(modelName, relationshipName, modelClass, relationshipsByName, false);
        if (relationshipPayloads) {
          relationshipPayloads.unload(modelName, id, relationshipName);
        }
      });
    };

    RelationshipPayloadsManager.prototype._getRelationshipPayloads = function _getRelationshipPayloads(modelName, relationshipName, modelClass, relationshipsByName, init) {
      if (!relationshipsByName.has(relationshipName)) {
        return;
      }

      var key = modelName + ':' + relationshipName;
      if (!this._cache[key] && init) {
        return this._initializeRelationshipPayloads(modelName, relationshipName, modelClass, relationshipsByName);
      }

      return this._cache[key];
    };

    RelationshipPayloadsManager.prototype._initializeRelationshipPayloads = function _initializeRelationshipPayloads(modelName, relationshipName, modelClass, relationshipsByName) {
      var relationshipMeta = relationshipsByName.get(relationshipName);
      var inverseMeta = modelClass.inverseFor(relationshipName, this._store);

      var inverseModelName = void 0;
      var inverseRelationshipName = void 0;
      var inverseRelationshipMeta = void 0;

      // figure out the inverse relationship; we need two things
      //  a) the inverse model name
      //- b) the name of the inverse relationship
      if (inverseMeta) {
        inverseRelationshipName = inverseMeta.name;
        inverseModelName = relationshipMeta.type;
        inverseRelationshipMeta = _get(inverseMeta.type, 'relationshipsByName').get(inverseRelationshipName);
      } else {
        // relationship has no inverse
        inverseModelName = inverseRelationshipName = '';
        inverseRelationshipMeta = null;
      }

      var lhsKey = modelName + ':' + relationshipName;
      var rhsKey = inverseModelName + ':' + inverseRelationshipName;

      // populate the cache for both sides of the relationship, as they both use
      // the same `RelationshipPayloads`.
      //
      // This works out better than creating a single common key, because to
      // compute that key we would need to do work to look up the inverse
      //
      return this._cache[lhsKey] = this._cache[rhsKey] = new _relationshipPayloads.default(this._store, modelName, relationshipName, relationshipMeta, inverseModelName, inverseRelationshipName, inverseRelationshipMeta);
    };

    return RelationshipPayloadsManager;
  }();

  exports.default = RelationshipPayloadsManager;
});
define('ember-data/-private/system/relationships/relationship-payloads', ['exports'], function (exports) {
  'use strict';

  exports.__esModule = true;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  var RelationshipPayloads = function () {
    function RelationshipPayloads(store, modelName, relationshipName, relationshipMeta, inverseModelName, inverseRelationshipName, inverseRelationshipMeta) {
      _classCallCheck(this, RelationshipPayloads);

      this._store = store;

      this._lhsModelName = modelName;
      this._lhsRelationshipName = relationshipName;
      this._lhsRelationshipMeta = relationshipMeta;

      this._rhsModelName = inverseModelName;
      this._rhsRelationshipName = inverseRelationshipName;
      this._rhsRelationshipMeta = inverseRelationshipMeta;

      // a map of id -> payloads for the left hand side of the relationship.
      this._lhsPayloads = Object.create(null);
      if (modelName !== inverseModelName || relationshipName !== inverseRelationshipName) {
        // The common case of a non-reflexive relationship, or a reflexive
        // relationship whose inverse is not itself
        this._rhsPayloads = Object.create(null);
        this._isReflexive = false;
      } else {
        // Edge case when we have a reflexive relationship to itself
        //  eg user hasMany friends inverse friends
        //
        //  In this case there aren't really two sides to the relationship, but
        //  we set `_rhsPayloads = _lhsPayloads` to make things easier to reason
        //  about
        this._rhsPayloads = this._lhsPayloads;
        this._isReflexive = true;
      }

      // When we push relationship payloads, just stash them in a queue until
      // somebody actually asks for one of them.
      //
      // This is a queue of the relationship payloads that have been pushed for
      // either side of this relationship
      this._pendingPayloads = [];
    }

    /**
      Get the payload for the relationship of an individual record.
       This might return the raw payload as pushed into the store, or one computed
      from the payload of the inverse relationship.
       @method
    */


    RelationshipPayloads.prototype.get = function get(modelName, id, relationshipName) {
      this._flushPending();

      if (this._isLHS(modelName, relationshipName)) {
        return this._lhsPayloads[id];
      } else {
        (false && Ember.assert(modelName + ':' + relationshipName + ' is not either side of this relationship, ' + this._lhsModelName + ':' + this._lhsRelationshipName + '<->' + this._rhsModelName + ':' + this._rhsRelationshipName, this._isRHS(modelName, relationshipName)));

        return this._rhsPayloads[id];
      }
    };

    RelationshipPayloads.prototype.push = function push(modelName, id, relationshipName, relationshipData) {
      this._pendingPayloads.push([modelName, id, relationshipName, relationshipData]);
    };

    RelationshipPayloads.prototype.unload = function unload(modelName, id, relationshipName) {
      this._flushPending();

      if (this._isLHS(modelName, relationshipName)) {
        delete this._lhsPayloads[id];
      } else {
        (false && Ember.assert(modelName + ':' + relationshipName + ' is not either side of this relationship, ' + this._lhsModelName + ':' + this._lhsRelationshipName + '<->' + this._rhsModelName + ':' + this._rhsRelationshipName, this._isRHS(modelName, relationshipName)));

        delete this._rhsPayloads[id];
      }
    };

    RelationshipPayloads.prototype._isLHS = function _isLHS(modelName, relationshipName) {
      return modelName === this._lhsModelName && relationshipName === this._lhsRelationshipName;
    };

    RelationshipPayloads.prototype._isRHS = function _isRHS(modelName, relationshipName) {
      return modelName === this._rhsModelName && relationshipName === this._rhsRelationshipName;
    };

    RelationshipPayloads.prototype._flushPending = function _flushPending() {
      if (this._pendingPayloads.length === 0) {
        return;
      }

      var payloadsToBeProcessed = this._pendingPayloads.splice(0, this._pendingPayloads.length);
      for (var i = 0; i < payloadsToBeProcessed.length; ++i) {
        var modelName = payloadsToBeProcessed[i][0];
        var id = payloadsToBeProcessed[i][1];
        var relationshipName = payloadsToBeProcessed[i][2];
        var relationshipData = payloadsToBeProcessed[i][3];

        // TODO: maybe delay this allocation slightly?
        var inverseRelationshipData = {
          data: {
            id: id,
            type: modelName
          }

          // start flushing this individual payload.  The logic is the same whether
          // it's for the left hand side of the relationship or the right hand side,
          // except the role of primary and inverse idToPayloads is reversed
          //
        };var previousPayload = void 0;
        var idToPayloads = void 0;
        var inverseIdToPayloads = void 0;
        var inverseIsMany = void 0;
        if (this._isLHS(modelName, relationshipName)) {
          previousPayload = this._lhsPayloads[id];
          idToPayloads = this._lhsPayloads;
          inverseIdToPayloads = this._rhsPayloads;
          inverseIsMany = this._rhsRelationshipIsMany;
        } else {
          (false && Ember.assert(modelName + ':' + relationshipName + ' is not either side of this relationship, ' + this._lhsModelName + ':' + this._lhsRelationshipName + '<->' + this._rhsModelName + ':' + this._rhsRelationshipName, this._isRHS(modelName, relationshipName)));

          previousPayload = this._rhsPayloads[id];
          idToPayloads = this._rhsPayloads;
          inverseIdToPayloads = this._lhsPayloads;
          inverseIsMany = this._lhsRelationshipIsMany;
        }

        // actually flush this individual payload
        //
        // We remove the previous inverse before populating our current one
        // because we may have multiple payloads for the same relationship, in
        // which case the last one wins.
        //
        // eg if user hasMany helicopters, and helicopter belongsTo user and we see
        //
        //  [{
        //    data: {
        //      id: 1,
        //      type: 'helicopter',
        //      relationships: {
        //        user: {
        //          id: 2,
        //          type: 'user'
        //        }
        //      }
        //    }
        //  }, {
        //    data: {
        //      id: 1,
        //      type: 'helicopter',
        //      relationships: {
        //        user: {
        //          id: 4,
        //          type: 'user'
        //        }
        //      }
        //    }
        //  }]
        //
        // Then we will initially have set user:2 as having helicopter:1, which we
        // need to remove before adding helicopter:1 to user:4
        //
        // only remove relationship information before adding if there is relationshipData.data
        // * null is considered new information "empty", and it should win
        // * undefined is NOT considered new information, we should keep original state
        // * anything else is considered new information, and it should win
        if (relationshipData.data !== undefined) {
          this._removeInverse(id, previousPayload, inverseIdToPayloads);
        }
        idToPayloads[id] = relationshipData;
        this._populateInverse(relationshipData, inverseRelationshipData, inverseIdToPayloads, inverseIsMany);
      }
    };

    RelationshipPayloads.prototype._populateInverse = function _populateInverse(relationshipData, inversePayload, inverseIdToPayloads, inverseIsMany) {
      if (!relationshipData.data) {
        // This id doesn't have an inverse, eg a belongsTo with a payload
        // { data: null }, so there's nothing to populate
        return;
      }

      if (Array.isArray(relationshipData.data)) {
        for (var i = 0; i < relationshipData.data.length; ++i) {
          var inverseId = relationshipData.data[i].id;
          this._addToInverse(inversePayload, inverseId, inverseIdToPayloads, inverseIsMany);
        }
      } else {
        var _inverseId = relationshipData.data.id;
        this._addToInverse(inversePayload, _inverseId, inverseIdToPayloads, inverseIsMany);
      }
    };

    RelationshipPayloads.prototype._addToInverse = function _addToInverse(inversePayload, inverseId, inverseIdToPayloads, inverseIsMany) {
      if (this._isReflexive && inversePayload.data.id === inverseId) {
        // eg <user:1>.friends = [{ id: 1, type: 'user' }]
        return;
      }

      var existingPayload = inverseIdToPayloads[inverseId];
      var existingData = existingPayload && existingPayload.data;

      if (existingData) {
        // There already is an inverse, either add or overwrite depehnding on
        // whether the inverse is a many relationship or not
        //
        if (Array.isArray(existingData)) {
          existingData.push(inversePayload.data);
        } else {
          inverseIdToPayloads[inverseId] = inversePayload;
        }
      } else {
        // first time we're populating the inverse side
        //
        if (inverseIsMany) {
          inverseIdToPayloads[inverseId] = {
            data: [inversePayload.data]
          };
        } else {
          inverseIdToPayloads[inverseId] = inversePayload;
        }
      }
    };

    RelationshipPayloads.prototype._removeInverse = function _removeInverse(id, previousPayload, inverseIdToPayloads) {
      var data = previousPayload && previousPayload.data;
      if (!data) {
        // either this is the first time we've seen a payload for this id, or its
        // previous payload indicated that it had no inverse, eg a belongsTo
        // relationship with payload { data: null }
        //
        // In either case there's nothing that needs to be removed from the
        // inverse map of payloads
        return;
      }

      if (Array.isArray(data)) {
        // TODO: diff rather than removeall addall?
        for (var i = 0; i < data.length; ++i) {
          this._removeFromInverse(id, data[i].id, inverseIdToPayloads);
        }
      } else {
        this._removeFromInverse(id, data.id, inverseIdToPayloads);
      }
    };

    RelationshipPayloads.prototype._removeFromInverse = function _removeFromInverse(id, inverseId, inversePayloads) {
      var inversePayload = inversePayloads[inverseId];
      var data = inversePayload && inversePayload.data;

      if (!data) {
        return;
      }

      if (Array.isArray(data)) {
        inversePayload.data = data.filter(function (x) {
          return x.id !== id;
        });
      } else {
        inversePayloads[inverseId] = {
          data: null
        };
      }
    };

    _createClass(RelationshipPayloads, [{
      key: '_lhsRelationshipIsMany',
      get: function () {
        return this._lhsRelationshipMeta && this._lhsRelationshipMeta.kind === 'hasMany';
      }
    }, {
      key: '_rhsRelationshipIsMany',
      get: function () {
        return this._rhsRelationshipMeta && this._rhsRelationshipMeta.kind === 'hasMany';
      }
    }]);

    return RelationshipPayloads;
  }();

  exports.default = RelationshipPayloads;
});
define('ember-data/-private/system/relationships/state/belongs-to', ['exports', 'ember-data/-debug', 'ember-data/-private/system/promise-proxies', 'ember-data/-private/system/relationships/state/relationship'], function (exports, _debug, _promiseProxies, _relationship) {
  'use strict';

  exports.__esModule = true;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _possibleConstructorReturn(self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  }

  var EmberPromise = Ember.RSVP.Promise;
  var inspect = Ember.inspect;

  var BelongsToRelationship = function (_Relationship) {
    _inherits(BelongsToRelationship, _Relationship);

    function BelongsToRelationship(store, internalModel, inverseKey, relationshipMeta) {
      _classCallCheck(this, BelongsToRelationship);

      var _this = _possibleConstructorReturn(this, _Relationship.call(this, store, internalModel, inverseKey, relationshipMeta));

      _this.internalModel = internalModel;
      _this.key = relationshipMeta.key;
      _this.inverseInternalModel = null;
      _this.canonicalState = null;
      return _this;
    }

    BelongsToRelationship.prototype.setInternalModel = function setInternalModel(internalModel) {
      if (internalModel) {
        this.addInternalModel(internalModel);
      } else if (this.inverseInternalModel) {
        this.removeInternalModel(this.inverseInternalModel);
      }
      this.setHasData(true);
      this.setHasLoaded(true);
    };

    BelongsToRelationship.prototype.setCanonicalInternalModel = function setCanonicalInternalModel(internalModel) {
      if (internalModel) {
        this.addCanonicalInternalModel(internalModel);
      } else if (this.canonicalState) {
        this.removeCanonicalInternalModel(this.canonicalState);
      }
      this.flushCanonicalLater();
    };

    BelongsToRelationship.prototype.setInitialCanonicalInternalModel = function setInitialCanonicalInternalModel(internalModel) {
      if (!internalModel) {
        return;
      }

      // When we initialize a belongsTo relationship, we want to avoid work like
      // notifying our internalModel that we've "changed" and excessive thrash on
      // setting up inverse relationships
      this.canonicalMembers.add(internalModel);
      this.members.add(internalModel);
      this.inverseInternalModel = this.canonicalState = internalModel;
      this.setupInverseRelationship(internalModel);
    };

    BelongsToRelationship.prototype.addCanonicalInternalModel = function addCanonicalInternalModel(internalModel) {
      if (this.canonicalMembers.has(internalModel)) {
        return;
      }

      if (this.canonicalState) {
        this.removeCanonicalInternalModel(this.canonicalState);
      }

      this.canonicalState = internalModel;
      _Relationship.prototype.addCanonicalInternalModel.call(this, internalModel);
    };

    BelongsToRelationship.prototype.inverseDidDematerialize = function inverseDidDematerialize() {
      this.notifyBelongsToChanged();
    };

    BelongsToRelationship.prototype.removeCompletelyFromOwn = function removeCompletelyFromOwn(internalModel) {
      _Relationship.prototype.removeCompletelyFromOwn.call(this, internalModel);

      if (this.canonicalState === internalModel) {
        this.canonicalState = null;
      }

      if (this.inverseInternalModel === internalModel) {
        this.inverseInternalModel = null;
        this.notifyBelongsToChanged();
      }
    };

    BelongsToRelationship.prototype.flushCanonical = function flushCanonical() {
      //temporary fix to not remove newly created records if server returned null.
      //TODO remove once we have proper diffing
      if (this.inverseInternalModel && this.inverseInternalModel.isNew() && !this.canonicalState) {
        return;
      }
      if (this.inverseInternalModel !== this.canonicalState) {
        this.inverseInternalModel = this.canonicalState;
        this.notifyBelongsToChanged();
      }

      _Relationship.prototype.flushCanonical.call(this);
    };

    BelongsToRelationship.prototype.addInternalModel = function addInternalModel(internalModel) {
      if (this.members.has(internalModel)) {
        return;
      }

      (0, _debug.assertPolymorphicType)(this.internalModel, this.relationshipMeta, internalModel);

      if (this.inverseInternalModel) {
        this.removeInternalModel(this.inverseInternalModel);
      }

      this.inverseInternalModel = internalModel;
      _Relationship.prototype.addInternalModel.call(this, internalModel);
      this.notifyBelongsToChanged();
    };

    BelongsToRelationship.prototype.setRecordPromise = function setRecordPromise(newPromise) {
      var content = newPromise.get && newPromise.get('content');
      (false && Ember.assert("You passed in a promise that did not originate from an EmberData relationship. You can only pass promises that come from a belongsTo or hasMany relationship to the get call.", content !== undefined));

      this.setInternalModel(content ? content._internalModel : content);
    };

    BelongsToRelationship.prototype.removeInternalModelFromOwn = function removeInternalModelFromOwn(internalModel) {
      if (!this.members.has(internalModel)) {
        return;
      }
      this.inverseInternalModel = null;
      _Relationship.prototype.removeInternalModelFromOwn.call(this, internalModel);
      this.notifyBelongsToChanged();
    };

    BelongsToRelationship.prototype.notifyBelongsToChanged = function notifyBelongsToChanged() {
      this.internalModel.notifyBelongsToChanged(this.key);
    };

    BelongsToRelationship.prototype.removeCanonicalInternalModelFromOwn = function removeCanonicalInternalModelFromOwn(internalModel) {
      if (!this.canonicalMembers.has(internalModel)) {
        return;
      }
      this.canonicalState = null;
      _Relationship.prototype.removeCanonicalInternalModelFromOwn.call(this, internalModel);
    };

    BelongsToRelationship.prototype.findRecord = function findRecord() {
      if (this.inverseInternalModel) {
        return this.store._findByInternalModel(this.inverseInternalModel);
      } else {
        return EmberPromise.resolve(null);
      }
    };

    BelongsToRelationship.prototype.fetchLink = function fetchLink() {
      var _this2 = this;

      return this.store.findBelongsTo(this.internalModel, this.link, this.relationshipMeta).then(function (internalModel) {
        if (internalModel) {
          _this2.addInternalModel(internalModel);
        }
        return internalModel;
      });
    };

    BelongsToRelationship.prototype.getRecord = function getRecord() {
      var _this3 = this;

      //TODO(Igor) flushCanonical here once our syncing is not stupid
      if (this.isAsync) {
        var promise = void 0;
        if (this.link) {
          if (this.hasLoaded) {
            promise = this.findRecord();
          } else {
            promise = this.findLink().then(function () {
              return _this3.findRecord();
            });
          }
        } else {
          promise = this.findRecord();
        }

        return _promiseProxies.PromiseObject.create({
          promise: promise,
          content: this.inverseInternalModel ? this.inverseInternalModel.getRecord() : null
        });
      } else {
        if (this.inverseInternalModel === null) {
          return null;
        }
        var toReturn = this.inverseInternalModel.getRecord();
        (false && Ember.assert("You looked up the '" + this.key + "' relationship on a '" + this.internalModel.modelName + "' with id " + this.internalModel.id + " but some of the associated records were not loaded. Either make sure they are all loaded together with the parent record, or specify that the relationship is async (`DS.belongsTo({ async: true })`)", toReturn === null || !toReturn.get('isEmpty')));

        return toReturn;
      }
    };

    BelongsToRelationship.prototype.reload = function reload() {
      // TODO handle case when reload() is triggered multiple times

      if (this.link) {
        return this.fetchLink();
      }

      // reload record, if it is already loaded
      if (this.inverseInternalModel && this.inverseInternalModel.hasRecord) {
        return this.inverseInternalModel.getRecord().reload();
      }

      return this.findRecord();
    };

    BelongsToRelationship.prototype.updateData = function updateData(data, initial) {
      (false && Ember.assert('Ember Data expected the data for the ' + this.key + ' relationship on a ' + this.internalModel.toString() + ' to be in a JSON API format and include an `id` and `type` property but it found ' + inspect(data) + '. Please check your serializer and make sure it is serializing the relationship payload into a JSON API format.', data === null || data.id !== undefined && data.type !== undefined));

      var internalModel = this.store._pushResourceIdentifier(this, data);
      if (initial) {
        this.setInitialCanonicalInternalModel(internalModel);
      } else {
        this.setCanonicalInternalModel(internalModel);
      }
    };

    return BelongsToRelationship;
  }(_relationship.default);

  exports.default = BelongsToRelationship;
});
define("ember-data/-private/system/relationships/state/create", ["exports", "ember-data/-private/system/relationships/state/has-many", "ember-data/-private/system/relationships/state/belongs-to"], function (exports, _hasMany, _belongsTo) {
  "use strict";

  exports.__esModule = true;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  var _get = Ember.get;


  function shouldFindInverse(relationshipMeta) {
    var options = relationshipMeta.options;
    return !(options && options.inverse === null);
  }

  function createRelationshipFor(internalModel, relationshipMeta, store) {
    var inverseKey = void 0;
    var inverse = null;

    if (shouldFindInverse(relationshipMeta)) {
      inverse = internalModel.type.inverseFor(relationshipMeta.key, store);
    } else if (false) {
      internalModel.type.typeForRelationship(relationshipMeta.key, store);
    }

    if (inverse) {
      inverseKey = inverse.name;
    }

    if (relationshipMeta.kind === 'hasMany') {
      return new _hasMany.default(store, internalModel, inverseKey, relationshipMeta);
    } else {
      return new _belongsTo.default(store, internalModel, inverseKey, relationshipMeta);
    }
  }

  var Relationships = function () {
    function Relationships(internalModel) {
      _classCallCheck(this, Relationships);

      this.internalModel = internalModel;
      this.initializedRelationships = Object.create(null);
    }

    // TODO @runspired deprecate this as it was never truly a record instance


    Relationships.prototype.has = function has(key) {
      return !!this.initializedRelationships[key];
    };

    Relationships.prototype.forEach = function forEach(cb) {
      var rels = this.initializedRelationships;
      Object.keys(rels).forEach(function (name) {
        cb(name, rels[name]);
      });
    };

    Relationships.prototype.get = function get(key) {
      var relationships = this.initializedRelationships;
      var relationship = relationships[key];
      var internalModel = this.internalModel;

      if (!relationship) {
        var relationshipsByName = _get(internalModel.type, 'relationshipsByName');
        var rel = relationshipsByName.get(key);

        if (!rel) {
          return undefined;
        }

        var relationshipPayload = internalModel.store._relationshipsPayloads.get(internalModel.modelName, internalModel.id, key);

        relationship = relationships[key] = createRelationshipFor(internalModel, rel, internalModel.store);

        if (relationshipPayload) {
          relationship.push(relationshipPayload, true);
        }
      }

      return relationship;
    };

    _createClass(Relationships, [{
      key: "record",
      get: function () {
        return this.internalModel;
      }
    }]);

    return Relationships;
  }();

  exports.default = Relationships;
});
define('ember-data/-private/system/relationships/state/has-many', ['exports', 'ember-data/-debug', 'ember-data/-private/system/promise-proxies', 'ember-data/-private/system/relationships/state/relationship', 'ember-data/-private/system/ordered-set', 'ember-data/-private/system/many-array'], function (exports, _debug, _promiseProxies, _relationship, _orderedSet, _manyArray) {
  'use strict';

  exports.__esModule = true;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  function _possibleConstructorReturn(self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  }

  var ManyRelationship = function (_Relationship) {
    _inherits(ManyRelationship, _Relationship);

    function ManyRelationship(store, internalModel, inverseKey, relationshipMeta) {
      _classCallCheck(this, ManyRelationship);

      var _this = _possibleConstructorReturn(this, _Relationship.call(this, store, internalModel, inverseKey, relationshipMeta));

      _this.belongsToType = relationshipMeta.type;
      _this.canonicalState = [];
      _this.isPolymorphic = relationshipMeta.options.polymorphic;
      _this._manyArray = null;
      _this.__loadingPromise = null;
      return _this;
    }

    ManyRelationship.prototype._updateLoadingPromise = function _updateLoadingPromise(promise, content) {
      if (this.__loadingPromise) {
        if (content) {
          this.__loadingPromise.set('content', content);
        }
        this.__loadingPromise.set('promise', promise);
      } else {
        this.__loadingPromise = _promiseProxies.PromiseManyArray.create({
          promise: promise,
          content: content
        });
      }

      return this.__loadingPromise;
    };

    ManyRelationship.prototype.removeInverseRelationships = function removeInverseRelationships() {
      _Relationship.prototype.removeInverseRelationships.call(this);
      if (this._manyArray) {
        this._manyArray.destroy();
        this._manyArray = null;
      }

      if (this._loadingPromise) {
        this._loadingPromise.destroy();
      }
    };

    ManyRelationship.prototype.updateMeta = function updateMeta(meta) {
      _Relationship.prototype.updateMeta.call(this, meta);
      if (this._manyArray) {
        this._manyArray.set('meta', meta);
      }
    };

    ManyRelationship.prototype.addCanonicalInternalModel = function addCanonicalInternalModel(internalModel, idx) {
      if (this.canonicalMembers.has(internalModel)) {
        return;
      }
      if (idx !== undefined) {
        this.canonicalState.splice(idx, 0, internalModel);
      } else {
        this.canonicalState.push(internalModel);
      }
      _Relationship.prototype.addCanonicalInternalModel.call(this, internalModel, idx);
    };

    ManyRelationship.prototype.inverseDidDematerialize = function inverseDidDematerialize() {
      if (this._manyArray) {
        this._manyArray.destroy();
        this._manyArray = null;
      }
      this.notifyHasManyChanged();
    };

    ManyRelationship.prototype.addInternalModel = function addInternalModel(internalModel, idx) {
      if (this.members.has(internalModel)) {
        return;
      }

      (0, _debug.assertPolymorphicType)(this.internalModel, this.relationshipMeta, internalModel);
      _Relationship.prototype.addInternalModel.call(this, internalModel, idx);
      // make lazy later
      this.manyArray._addInternalModels([internalModel], idx);
    };

    ManyRelationship.prototype.removeCanonicalInternalModelFromOwn = function removeCanonicalInternalModelFromOwn(internalModel, idx) {
      var i = idx;
      if (!this.canonicalMembers.has(internalModel)) {
        return;
      }
      if (i === undefined) {
        i = this.canonicalState.indexOf(internalModel);
      }
      if (i > -1) {
        this.canonicalState.splice(i, 1);
      }
      _Relationship.prototype.removeCanonicalInternalModelFromOwn.call(this, internalModel, idx);
    };

    ManyRelationship.prototype.removeCompletelyFromOwn = function removeCompletelyFromOwn(internalModel) {
      _Relationship.prototype.removeCompletelyFromOwn.call(this, internalModel);

      var canonicalIndex = this.canonicalState.indexOf(internalModel);

      if (canonicalIndex !== -1) {
        this.canonicalState.splice(canonicalIndex, 1);
      }

      var manyArray = this._manyArray;

      if (manyArray) {
        var idx = manyArray.currentState.indexOf(internalModel);

        if (idx !== -1) {
          manyArray.internalReplace(idx, 1);
        }
      }
    };

    ManyRelationship.prototype.flushCanonical = function flushCanonical() {
      if (this._manyArray) {
        this._manyArray.flushCanonical();
      }
      _Relationship.prototype.flushCanonical.call(this);
    };

    ManyRelationship.prototype.removeInternalModelFromOwn = function removeInternalModelFromOwn(internalModel, idx) {
      if (!this.members.has(internalModel)) {
        return;
      }
      _Relationship.prototype.removeInternalModelFromOwn.call(this, internalModel, idx);
      var manyArray = this.manyArray;
      if (idx !== undefined) {
        //TODO(Igor) not used currently, fix
        manyArray.currentState.removeAt(idx);
      } else {
        manyArray._removeInternalModels([internalModel]);
      }
    };

    ManyRelationship.prototype.notifyRecordRelationshipAdded = function notifyRecordRelationshipAdded(internalModel, idx) {
      this.internalModel.notifyHasManyAdded(this.key, internalModel, idx);
    };

    ManyRelationship.prototype.reload = function reload() {
      var manyArray = this.manyArray;
      var manyArrayLoadedState = manyArray.get('isLoaded');

      if (this._loadingPromise) {
        if (this._loadingPromise.get('isPending')) {
          return this._loadingPromise;
        }
        if (this._loadingPromise.get('isRejected')) {
          manyArray.set('isLoaded', manyArrayLoadedState);
        }
      }

      var promise = void 0;
      if (this.link) {
        promise = this.fetchLink();
      } else {
        promise = this.store._scheduleFetchMany(manyArray.currentState).then(function () {
          return manyArray;
        });
      }

      this._updateLoadingPromise(promise);
      return this._loadingPromise;
    };

    ManyRelationship.prototype.computeChanges = function computeChanges() {
      var internalModels = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

      var members = this.canonicalMembers;
      var internalModelsToRemove = [];
      var internalModelSet = setForArray(internalModels);

      members.forEach(function (member) {
        if (internalModelSet.has(member)) {
          return;
        }

        internalModelsToRemove.push(member);
      });

      this.removeCanonicalInternalModels(internalModelsToRemove);

      for (var i = 0, l = internalModels.length; i < l; i++) {
        var internalModel = internalModels[i];
        this.removeCanonicalInternalModel(internalModel);
        this.addCanonicalInternalModel(internalModel, i);
      }
    };

    ManyRelationship.prototype.setInitialInternalModels = function setInitialInternalModels(internalModels) {
      if (Array.isArray(internalModels) === false || internalModels.length === 0) {
        return;
      }

      for (var i = 0; i < internalModels.length; i++) {
        var internalModel = internalModels[i];
        if (this.canonicalMembers.has(internalModel)) {
          continue;
        }

        this.canonicalMembers.add(internalModel);
        this.members.add(internalModel);
        this.setupInverseRelationship(internalModel);
      }

      this.canonicalState = this.canonicalMembers.toArray();
    };

    ManyRelationship.prototype.fetchLink = function fetchLink() {
      var _this2 = this;

      return this.store.findHasMany(this.internalModel, this.link, this.relationshipMeta).then(function (records) {
        if (records.hasOwnProperty('meta')) {
          _this2.updateMeta(records.meta);
        }
        _this2.store._backburner.join(function () {
          _this2.updateInternalModelsFromAdapter(records);
          _this2.manyArray.set('isLoaded', true);
          _this2.setHasData(true);
        });
        return _this2.manyArray;
      });
    };

    ManyRelationship.prototype.findRecords = function findRecords() {
      var manyArray = this.manyArray;
      var internalModels = manyArray.currentState;

      //TODO CLEANUP
      return this.store.findMany(internalModels).then(function () {
        if (!manyArray.get('isDestroyed')) {
          //Goes away after the manyArray refactor
          manyArray.set('isLoaded', true);
        }
        return manyArray;
      });
    };

    ManyRelationship.prototype.notifyHasManyChanged = function notifyHasManyChanged() {
      this.internalModel.notifyHasManyAdded(this.key);
    };

    ManyRelationship.prototype.getRecords = function getRecords() {
      var _this3 = this;

      //TODO(Igor) sync server here, once our syncing is not stupid
      var manyArray = this.manyArray;
      if (this.isAsync) {
        var promise = void 0;
        if (this.link) {
          if (this.hasLoaded) {
            promise = this.findRecords();
          } else {
            promise = this.findLink().then(function () {
              return _this3.findRecords();
            });
          }
        } else {
          promise = this.findRecords();
        }
        return this._updateLoadingPromise(promise, manyArray);
      } else {
        (false && Ember.assert('You looked up the \'' + this.key + '\' relationship on a \'' + this.internalModel.type.modelName + '\' with id ' + this.internalModel.id + ' but some of the associated records were not loaded. Either make sure they are all loaded together with the parent record, or specify that the relationship is async (\'DS.hasMany({ async: true })\')', manyArray.isEvery('isEmpty', false)));


        //TODO(Igor) WTF DO I DO HERE?
        // TODO @runspired equal WTFs to Igor
        if (!manyArray.get('isDestroyed')) {
          manyArray.set('isLoaded', true);
        }
        return manyArray;
      }
    };

    ManyRelationship.prototype.updateData = function updateData(data, initial) {
      var internalModels = this.store._pushResourceIdentifiers(this, data);
      if (initial) {
        this.setInitialInternalModels(internalModels);
      } else {
        this.updateInternalModelsFromAdapter(internalModels);
      }
    };

    ManyRelationship.prototype.destroy = function destroy() {
      _Relationship.prototype.destroy.call(this);
      var manyArray = this._manyArray;
      if (manyArray) {
        manyArray.destroy();
      }

      var proxy = this.__loadingPromise;

      if (proxy) {
        proxy.destroy();
      }
    };

    _createClass(ManyRelationship, [{
      key: '_loadingPromise',
      get: function () {
        return this.__loadingPromise;
      }
    }, {
      key: 'manyArray',
      get: function () {
        if (!this._manyArray) {
          this._manyArray = _manyArray.default.create({
            canonicalState: this.canonicalState,
            store: this.store,
            relationship: this,
            type: this.store.modelFor(this.belongsToType),
            record: this.internalModel,
            meta: this.meta,
            isPolymorphic: this.isPolymorphic
          });
        }
        return this._manyArray;
      }
    }]);

    return ManyRelationship;
  }(_relationship.default);

  exports.default = ManyRelationship;


  function setForArray(array) {
    var set = new _orderedSet.default();

    if (array) {
      for (var i = 0, l = array.length; i < l; i++) {
        set.add(array[i]);
      }
    }

    return set;
  }
});
define('ember-data/-private/system/relationships/state/relationship', ['exports', 'ember-data/-private/system/ordered-set', 'ember-data/-private/system/normalize-link'], function (exports, _orderedSet, _normalizeLink2) {
  'use strict';

  exports.__esModule = true;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  var guidFor = Ember.guidFor;

  var Relationship = function () {
    function Relationship(store, internalModel, inverseKey, relationshipMeta) {
      _classCallCheck(this, Relationship);

      var async = relationshipMeta.options.async;
      var polymorphic = relationshipMeta.options.polymorphic;
      this.members = new _orderedSet.default();
      this.canonicalMembers = new _orderedSet.default();
      this.store = store;
      this.key = relationshipMeta.key;
      this.inverseKey = inverseKey;
      this.internalModel = internalModel;
      this.isAsync = typeof async === 'undefined' ? true : async;
      this.isPolymorphic = typeof polymorphic === 'undefined' ? true : polymorphic;
      this.relationshipMeta = relationshipMeta;
      //This probably breaks for polymorphic relationship in complex scenarios, due to
      //multiple possible modelNames
      this.inverseKeyForImplicit = this.internalModel.modelName + this.key;
      this.linkPromise = null;
      this.meta = null;
      this.hasData = false;
      this.hasLoaded = false;
    }

    Relationship.prototype._inverseIsAsync = function _inverseIsAsync() {
      if (!this.inverseKey || !this.inverseInternalModel) {
        return false;
      }
      return this.inverseInternalModel._relationships.get(this.inverseKey).isAsync;
    };

    Relationship.prototype.removeInverseRelationships = function removeInverseRelationships() {
      if (!this.inverseKey) {
        return;
      }

      var allMembers =
      // we actually want a union of members and canonicalMembers
      // they should be disjoint but currently are not due to a bug
      this.members.list.concat(this.canonicalMembers.list);

      for (var i = 0; i < allMembers.length; i++) {
        var inverseInternalModel = allMembers[i];
        var relationship = inverseInternalModel._relationships.get(this.inverseKey);
        relationship.inverseDidDematerialize();
      }
    };

    Relationship.prototype.inverseDidDematerialize = function inverseDidDematerialize() {};

    Relationship.prototype.updateMeta = function updateMeta(meta) {
      this.meta = meta;
    };

    Relationship.prototype.clear = function clear() {

      var members = this.members.list;
      while (members.length > 0) {
        var member = members[0];
        this.removeInternalModel(member);
      }

      var canonicalMembers = this.canonicalMembers.list;
      while (canonicalMembers.length > 0) {
        var _member = canonicalMembers[0];
        this.removeCanonicalInternalModel(_member);
      }
    };

    Relationship.prototype.removeInternalModels = function removeInternalModels(internalModels) {
      var _this = this;

      internalModels.forEach(function (internalModel) {
        return _this.removeInternalModel(internalModel);
      });
    };

    Relationship.prototype.addInternalModels = function addInternalModels(internalModels, idx) {
      var _this2 = this;

      internalModels.forEach(function (internalModel) {
        _this2.addInternalModel(internalModel, idx);
        if (idx !== undefined) {
          idx++;
        }
      });
    };

    Relationship.prototype.addCanonicalInternalModels = function addCanonicalInternalModels(internalModels, idx) {
      for (var i = 0; i < internalModels.length; i++) {
        if (idx !== undefined) {
          this.addCanonicalInternalModel(internalModels[i], i + idx);
        } else {
          this.addCanonicalInternalModel(internalModels[i]);
        }
      }
    };

    Relationship.prototype.addCanonicalInternalModel = function addCanonicalInternalModel(internalModel, idx) {
      if (!this.canonicalMembers.has(internalModel)) {
        this.canonicalMembers.add(internalModel);
        this.setupInverseRelationship(internalModel);
      }
      this.flushCanonicalLater();
      this.setHasData(true);
    };

    Relationship.prototype.setupInverseRelationship = function setupInverseRelationship(internalModel) {
      if (this.inverseKey) {
        var relationships = internalModel._relationships;
        var relationshipExisted = relationships.has(this.inverseKey);
        var relationship = relationships.get(this.inverseKey);
        if (relationshipExisted || this.isPolymorphic) {
          // if we have only just initialized the inverse relationship, then it
          // already has this.internalModel in its canonicalMembers, so skip the
          // unnecessary work.  The exception to this is polymorphic
          // relationships whose members are determined by their inverse, as those
          // relationships cannot efficiently find their inverse payloads.
          relationship.addCanonicalInternalModel(this.internalModel);
        }
      } else {
        var _relationships = internalModel._implicitRelationships;
        var _relationship = _relationships[this.inverseKeyForImplicit];
        if (!_relationship) {
          _relationship = _relationships[this.inverseKeyForImplicit] = new Relationship(this.store, internalModel, this.key, { options: { async: this.isAsync } });
        }
        _relationship.addCanonicalInternalModel(this.internalModel);
      }
    };

    Relationship.prototype.removeCanonicalInternalModels = function removeCanonicalInternalModels(internalModels, idx) {
      for (var i = 0; i < internalModels.length; i++) {
        if (idx !== undefined) {
          this.removeCanonicalInternalModel(internalModels[i], i + idx);
        } else {
          this.removeCanonicalInternalModel(internalModels[i]);
        }
      }
    };

    Relationship.prototype.removeCanonicalInternalModel = function removeCanonicalInternalModel(internalModel, idx) {
      if (this.canonicalMembers.has(internalModel)) {
        this.removeCanonicalInternalModelFromOwn(internalModel);
        if (this.inverseKey) {
          this.removeCanonicalInternalModelFromInverse(internalModel);
        } else {
          if (internalModel._implicitRelationships[this.inverseKeyForImplicit]) {
            internalModel._implicitRelationships[this.inverseKeyForImplicit].removeCanonicalInternalModel(this.internalModel);
          }
        }
      }
      this.flushCanonicalLater();
    };

    Relationship.prototype.addInternalModel = function addInternalModel(internalModel, idx) {
      if (!this.members.has(internalModel)) {
        this.members.addWithIndex(internalModel, idx);
        this.notifyRecordRelationshipAdded(internalModel, idx);
        if (this.inverseKey) {
          internalModel._relationships.get(this.inverseKey).addInternalModel(this.internalModel);
        } else {
          if (!internalModel._implicitRelationships[this.inverseKeyForImplicit]) {
            internalModel._implicitRelationships[this.inverseKeyForImplicit] = new Relationship(this.store, internalModel, this.key, { options: { async: this.isAsync } });
          }
          internalModel._implicitRelationships[this.inverseKeyForImplicit].addInternalModel(this.internalModel);
        }
        this.internalModel.updateRecordArrays();
      }
      this.setHasData(true);
    };

    Relationship.prototype.removeInternalModel = function removeInternalModel(internalModel) {
      if (this.members.has(internalModel)) {
        this.removeInternalModelFromOwn(internalModel);
        if (this.inverseKey) {
          this.removeInternalModelFromInverse(internalModel);
        } else {
          if (internalModel._implicitRelationships[this.inverseKeyForImplicit]) {
            internalModel._implicitRelationships[this.inverseKeyForImplicit].removeInternalModel(this.internalModel);
          }
        }
      }
    };

    Relationship.prototype.removeInternalModelFromInverse = function removeInternalModelFromInverse(internalModel) {
      var inverseRelationship = internalModel._relationships.get(this.inverseKey);
      //Need to check for existence, as the record might unloading at the moment
      if (inverseRelationship) {
        inverseRelationship.removeInternalModelFromOwn(this.internalModel);
      }
    };

    Relationship.prototype.removeInternalModelFromOwn = function removeInternalModelFromOwn(internalModel) {
      this.members.delete(internalModel);
      this.internalModel.updateRecordArrays();
    };

    Relationship.prototype.removeCanonicalInternalModelFromInverse = function removeCanonicalInternalModelFromInverse(internalModel) {
      var inverseRelationship = internalModel._relationships.get(this.inverseKey);
      //Need to check for existence, as the record might unloading at the moment
      if (inverseRelationship) {
        inverseRelationship.removeCanonicalInternalModelFromOwn(this.internalModel);
      }
    };

    Relationship.prototype.removeCanonicalInternalModelFromOwn = function removeCanonicalInternalModelFromOwn(internalModel) {
      this.canonicalMembers.delete(internalModel);
      this.flushCanonicalLater();
    };

    Relationship.prototype.removeCompletelyFromInverse = function removeCompletelyFromInverse() {
      var _this3 = this;

      if (!this.inverseKey) {
        return;
      }

      // we actually want a union of members and canonicalMembers
      // they should be disjoint but currently are not due to a bug
      var seen = Object.create(null);
      var internalModel = this.internalModel;

      var unload = function (inverseInternalModel) {
        var id = guidFor(inverseInternalModel);

        if (seen[id] === undefined) {
          var relationship = inverseInternalModel._relationships.get(_this3.inverseKey);
          relationship.removeCompletelyFromOwn(internalModel);
          seen[id] = true;
        }
      };

      this.members.forEach(unload);
      this.canonicalMembers.forEach(unload);
    };

    Relationship.prototype.removeCompletelyFromOwn = function removeCompletelyFromOwn(internalModel) {
      this.canonicalMembers.delete(internalModel);
      this.members.delete(internalModel);
      this.internalModel.updateRecordArrays();
    };

    Relationship.prototype.flushCanonical = function flushCanonical() {
      var list = this.members.list;
      this.willSync = false;
      //a hack for not removing new internalModels
      //TODO remove once we have proper diffing
      var newInternalModels = [];
      for (var i = 0; i < list.length; i++) {
        if (list[i].isNew()) {
          newInternalModels.push(list[i]);
        }
      }

      //TODO(Igor) make this less abysmally slow
      this.members = this.canonicalMembers.copy();
      for (var _i = 0; _i < newInternalModels.length; _i++) {
        this.members.add(newInternalModels[_i]);
      }
    };

    Relationship.prototype.flushCanonicalLater = function flushCanonicalLater() {
      if (this.willSync) {
        return;
      }
      this.willSync = true;
      this.store._updateRelationshipState(this);
    };

    Relationship.prototype.updateLink = function updateLink(link, initial) {
      (false && Ember.warn('You pushed a record of type \'' + this.internalModel.modelName + '\' with a relationship \'' + this.key + '\' configured as \'async: false\'. You\'ve included a link but no primary data, this may be an error in your payload.', this.isAsync || this.hasData, {
        id: 'ds.store.push-link-for-sync-relationship'
      }));
      (false && Ember.assert('You have pushed a record of type \'' + this.internalModel.modelName + '\' with \'' + this.key + '\' as a link, but the value of that link is not a string.', typeof link === 'string' || link === null));


      this.link = link;
      this.linkPromise = null;

      if (!initial) {
        this.internalModel.notifyPropertyChange(this.key);
      }
    };

    Relationship.prototype.findLink = function findLink() {
      if (this.linkPromise) {
        return this.linkPromise;
      } else {
        var promise = this.fetchLink();
        this.linkPromise = promise;
        return promise.then(function (result) {
          return result;
        });
      }
    };

    Relationship.prototype.updateInternalModelsFromAdapter = function updateInternalModelsFromAdapter(internalModels) {
      this.setHasData(true);
      //TODO(Igor) move this to a proper place
      //TODO Once we have adapter support, we need to handle updated and canonical changes
      this.computeChanges(internalModels);
    };

    Relationship.prototype.notifyRecordRelationshipAdded = function notifyRecordRelationshipAdded() {};

    Relationship.prototype.setHasData = function setHasData(value) {
      this.hasData = value;
    };

    Relationship.prototype.setHasLoaded = function setHasLoaded(value) {
      this.hasLoaded = value;
    };

    Relationship.prototype.push = function push(payload, initial) {

      var hasData = false;
      var hasLink = false;

      if (payload.meta) {
        this.updateMeta(payload.meta);
      }

      if (payload.data !== undefined) {
        hasData = true;
        this.updateData(payload.data, initial);
      }

      if (payload.links && payload.links.related) {
        var relatedLink = (0, _normalizeLink2.default)(payload.links.related);
        if (relatedLink && relatedLink.href && relatedLink.href !== this.link) {
          hasLink = true;
          this.updateLink(relatedLink.href, initial);
        }
      }

      /*
       Data being pushed into the relationship might contain only data or links,
       or a combination of both.
        If we got data we want to set both hasData and hasLoaded to true since
       this would indicate that we should prefer the local state instead of
       trying to fetch the link or call findRecord().
        If we have no data but a link is present we want to set hasLoaded to false
       without modifying the hasData flag. This will ensure we fetch the updated
       link next time the relationship is accessed.
       */
      if (hasData) {
        this.setHasData(true);
        this.setHasLoaded(true);
      } else if (hasLink) {
        this.setHasLoaded(false);
      }
    };

    Relationship.prototype.updateData = function updateData() {};

    Relationship.prototype.destroy = function destroy() {};

    _createClass(Relationship, [{
      key: 'parentType',
      get: function () {
        return this.internalModel.modelName;
      }
    }]);

    return Relationship;
  }();

  exports.default = Relationship;
});
define('ember-data/-private/system/snapshot-record-array', ['exports'], function (exports) {
  'use strict';

  exports.__esModule = true;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  var SnapshotRecordArray = function () {
    function SnapshotRecordArray(recordArray, meta) {
      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

      _classCallCheck(this, SnapshotRecordArray);

      /**
        An array of snapshots
        @private
        @property _snapshots
        @type {Array}
      */
      this._snapshots = null;

      /**
        An array of records
        @private
        @property _recordArray
        @type {Array}
      */
      this._recordArray = recordArray;

      /**
        Number of records in the array
         Example
         ```app/adapters/post.js
        import DS from 'ember-data'
         export default DS.JSONAPIAdapter.extend({
          shouldReloadAll(store, snapshotRecordArray) {
            return !snapshotRecordArray.length;
          },
        });
        ```
         @property length
        @type {Number}
      */
      this.length = recordArray.get('length');

      this._type = null;

      /**
        Meta objects for the record array.
         Example
         ```app/adapters/post.js
        import DS from 'ember-data'
         export default DS.JSONAPIAdapter.extend({
          shouldReloadAll(store, snapshotRecordArray) {
            var lastRequestTime = snapshotRecordArray.meta.lastRequestTime;
            var twentyMinutes = 20 * 60 * 1000;
            return Date.now() > lastRequestTime + twentyMinutes;
          },
        });
        ```
         @property meta
        @type {Object}
      */
      this.meta = meta;

      /**
        A hash of adapter options passed into the store method for this request.
         Example
         ```app/adapters/post.js
        import MyCustomAdapter from './custom-adapter';
         export default MyCustomAdapter.extend({
          findAll(store, type, sinceToken, snapshotRecordArray) {
            if (snapshotRecordArray.adapterOptions.subscribe) {
              // ...
            }
            // ...
          }
        });
        ```
         @property adapterOptions
        @type {Object}
      */
      this.adapterOptions = options.adapterOptions;

      /**
        The relationships to include for this request.
         Example
         ```app/adapters/application.js
        import DS from 'ember-data';
         export default DS.Adapter.extend({
          findAll(store, type, snapshotRecordArray) {
            var url = `/${type.modelName}?include=${encodeURIComponent(snapshotRecordArray.include)}`;
             return fetch(url).then((response) => response.json())
          }
        });
         @property include
        @type {String|Array}
      */
      this.include = options.include;
    }

    /**
      The type of the underlying records for the snapshots in the array, as a DS.Model
      @property type
      @type {DS.Model}
    */


    SnapshotRecordArray.prototype.snapshots = function snapshots() {
      if (this._snapshots !== null) {
        return this._snapshots;
      }

      this._snapshots = this._recordArray._takeSnapshot();

      return this._snapshots;
    };

    _createClass(SnapshotRecordArray, [{
      key: 'type',
      get: function () {
        return this._type || (this._type = this._recordArray.get('type'));
      }
    }]);

    return SnapshotRecordArray;
  }();

  exports.default = SnapshotRecordArray;
});
define('ember-data/-private/system/snapshot', ['exports'], function (exports) {
  'use strict';

  exports.__esModule = true;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  var copy = Ember.copy;
  var inspect = Ember.inspect;
  var EmberError = Ember.Error;
  var get = Ember.get;

  var Snapshot = function () {
    function Snapshot(internalModel) {
      var _this = this;

      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      _classCallCheck(this, Snapshot);

      this._attributes = Object.create(null);
      this._belongsToRelationships = Object.create(null);
      this._belongsToIds = Object.create(null);
      this._hasManyRelationships = Object.create(null);
      this._hasManyIds = Object.create(null);
      this._internalModel = internalModel;

      var record = internalModel.getRecord();

      /**
       The underlying record for this snapshot. Can be used to access methods and
       properties defined on the record.
        Example
        ```javascript
       let json = snapshot.record.toJSON();
       ```
        @property record
       @type {DS.Model}
       */
      this.record = record;
      record.eachAttribute(function (keyName) {
        return _this._attributes[keyName] = get(record, keyName);
      });

      /**
       The id of the snapshot's underlying record
        Example
        ```javascript
       // store.push('post', { id: 1, author: 'Tomster', title: 'Ember.js rocks' });
       postSnapshot.id; // => '1'
       ```
        @property id
       @type {String}
       */
      this.id = internalModel.id;

      /**
       A hash of adapter options
       @property adapterOptions
       @type {Object}
       */
      this.adapterOptions = options.adapterOptions;
      this.include = options.include;

      /**
       The name of the type of the underlying record for this snapshot, as a string.
        @property modelName
       @type {String}
       */
      this.modelName = internalModel.modelName;

      this._changedAttributes = record.changedAttributes();
    }

    /**
     The type of the underlying record for this snapshot, as a DS.Model.
      @property type
     @type {DS.Model}
     */


    Snapshot.prototype.attr = function attr(keyName) {
      if (keyName in this._attributes) {
        return this._attributes[keyName];
      }
      throw new EmberError("Model '" + inspect(this.record) + "' has no attribute named '" + keyName + "' defined.");
    };

    Snapshot.prototype.attributes = function attributes() {
      return copy(this._attributes);
    };

    Snapshot.prototype.changedAttributes = function changedAttributes() {
      var changedAttributes = Object.create(null);
      var changedAttributeKeys = Object.keys(this._changedAttributes);

      for (var i = 0, length = changedAttributeKeys.length; i < length; i++) {
        var key = changedAttributeKeys[i];
        changedAttributes[key] = copy(this._changedAttributes[key]);
      }

      return changedAttributes;
    };

    Snapshot.prototype.belongsTo = function belongsTo(keyName, options) {
      var id = options && options.id;
      var relationship = void 0,
          inverseInternalModel = void 0,
          hasData = void 0;
      var result = void 0;

      if (id && keyName in this._belongsToIds) {
        return this._belongsToIds[keyName];
      }

      if (!id && keyName in this._belongsToRelationships) {
        return this._belongsToRelationships[keyName];
      }

      relationship = this._internalModel._relationships.get(keyName);
      if (!(relationship && relationship.relationshipMeta.kind === 'belongsTo')) {
        throw new EmberError("Model '" + inspect(this.record) + "' has no belongsTo relationship named '" + keyName + "' defined.");
      }

      hasData = get(relationship, 'hasData');
      inverseInternalModel = get(relationship, 'inverseInternalModel');

      if (hasData) {
        if (inverseInternalModel && !inverseInternalModel.isDeleted()) {
          if (id) {
            result = get(inverseInternalModel, 'id');
          } else {
            result = inverseInternalModel.createSnapshot();
          }
        } else {
          result = null;
        }
      }

      if (id) {
        this._belongsToIds[keyName] = result;
      } else {
        this._belongsToRelationships[keyName] = result;
      }

      return result;
    };

    Snapshot.prototype.hasMany = function hasMany(keyName, options) {
      var ids = options && options.ids;
      var relationship = void 0,
          members = void 0,
          hasData = void 0;
      var results = void 0;

      if (ids && keyName in this._hasManyIds) {
        return this._hasManyIds[keyName];
      }

      if (!ids && keyName in this._hasManyRelationships) {
        return this._hasManyRelationships[keyName];
      }

      relationship = this._internalModel._relationships.get(keyName);
      if (!(relationship && relationship.relationshipMeta.kind === 'hasMany')) {
        throw new EmberError("Model '" + inspect(this.record) + "' has no hasMany relationship named '" + keyName + "' defined.");
      }

      hasData = get(relationship, 'hasData');
      members = get(relationship, 'members');

      if (hasData) {
        results = [];
        members.forEach(function (member) {
          if (!member.isDeleted()) {
            if (ids) {
              results.push(member.id);
            } else {
              results.push(member.createSnapshot());
            }
          }
        });
      }

      if (ids) {
        this._hasManyIds[keyName] = results;
      } else {
        this._hasManyRelationships[keyName] = results;
      }

      return results;
    };

    Snapshot.prototype.eachAttribute = function eachAttribute(callback, binding) {
      this.record.eachAttribute(callback, binding);
    };

    Snapshot.prototype.eachRelationship = function eachRelationship(callback, binding) {
      this.record.eachRelationship(callback, binding);
    };

    Snapshot.prototype.serialize = function serialize(options) {
      return this.record.store.serializerFor(this.modelName).serialize(this, options);
    };

    _createClass(Snapshot, [{
      key: 'type',
      get: function () {
        // TODO @runspired we should deprecate this in favor of modelClass but only once
        // we've cleaned up the internals enough that a public change to follow suite is
        // uncontroversial.
        return this._internalModel.modelClass;
      }
    }]);

    return Snapshot;
  }();

  exports.default = Snapshot;
});
define('ember-data/-private/system/store', ['exports', 'ember-data/-private/adapters/errors', 'ember-data/-private/system/model/model', 'ember-data/-private/system/normalize-model-name', 'ember-data/-private/system/identity-map', 'ember-data/-private/system/promise-proxies', 'ember-data/-private/system/store/common', 'ember-data/-private/system/store/serializer-response', 'ember-data/-private/system/store/serializers', 'ember-data/-private/system/relationships/relationship-payloads-manager', 'ember-data/-private/system/store/finders', 'ember-data/-private/utils', 'ember-data/-private/system/coerce-id', 'ember-data/-private/system/record-array-manager', 'ember-data/-private/system/store/container-instance-cache', 'ember-data/-private/system/model/internal-model', 'ember-data/-private/features'], function (exports, _errors, _model, _normalizeModelName, _identityMap, _promiseProxies, _common, _serializerResponse, _serializers, _relationshipPayloadsManager, _finders, _utils, _coerceId, _recordArrayManager, _containerInstanceCache, _internalModel5, _features) {
  'use strict';

  exports.__esModule = true;
  exports.Store = undefined;
  var A = Ember.A;
  var copy = Ember.copy;
  var EmberError = Ember.Error;
  var MapWithDefault = Ember.MapWithDefault;
  var emberRun = Ember.run;
  var set = Ember.set;
  var get = Ember.get;
  var computed = Ember.computed;
  var RSVP = Ember.RSVP;
  var Service = Ember.Service;
  var typeOf = Ember.typeOf;
  var isPresent = Ember.isPresent;
  var isNone = Ember.isNone;
  var inspect = Ember.inspect;


  var badIdFormatAssertion = '`id` passed to `findRecord()` has to be non-empty string or number';

  var Backburner = Ember._Backburner,
      ENV = Ember.ENV;
  var Promise = RSVP.Promise;


  //Get the materialized model from the internalModel/promise that returns
  //an internal model and return it in a promiseObject. Useful for returning
  //from find methods
  function promiseRecord(internalModelPromise, label) {
    var toReturn = internalModelPromise.then(function (internalModel) {
      return internalModel.getRecord();
    });

    return (0, _promiseProxies.promiseObject)(toReturn, label);
  }

  var Store = void 0;

  // Implementors Note:
  //
  //   The variables in this file are consistently named according to the following
  //   scheme:
  //
  //   * +id+ means an identifier managed by an external source, provided inside
  //     the data provided by that source. These are always coerced to be strings
  //     before being used internally.
  //   * +clientId+ means a transient numerical identifier generated at runtime by
  //     the data store. It is important primarily because newly created objects may
  //     not yet have an externally generated id.
  //   * +internalModel+ means a record internalModel object, which holds metadata about a
  //     record, even if it has not yet been fully materialized.
  //   * +type+ means a DS.Model.

  /**
    The store contains all of the data for records loaded from the server.
    It is also responsible for creating instances of `DS.Model` that wrap
    the individual data for a record, so that they can be bound to in your
    Handlebars templates.
  
    Define your application's store like this:
  
    ```app/services/store.js
    import DS from 'ember-data';
  
    export default DS.Store.extend({
    });
    ```
  
    Most Ember.js applications will only have a single `DS.Store` that is
    automatically created by their `Ember.Application`.
  
    You can retrieve models from the store in several ways. To retrieve a record
    for a specific id, use `DS.Store`'s `findRecord()` method:
  
    ```javascript
    store.findRecord('person', 123).then(function (person) {
    });
    ```
  
    By default, the store will talk to your backend using a standard
    REST mechanism. You can customize how the store talks to your
    backend by specifying a custom adapter:
  
    ```app/adapters/application.js
    import DS from 'ember-data';
  
    export default DS.Adapter.extend({
    });
    ```
  
    You can learn more about writing a custom adapter by reading the `DS.Adapter`
    documentation.
  
    ### Store createRecord() vs. push() vs. pushPayload()
  
    The store provides multiple ways to create new record objects. They have
    some subtle differences in their use which are detailed below:
  
    [createRecord](#method_createRecord) is used for creating new
    records on the client side. This will return a new record in the
    `created.uncommitted` state. In order to persist this record to the
    backend you will need to call `record.save()`.
  
    [push](#method_push) is used to notify Ember Data's store of new or
    updated records that exist in the backend. This will return a record
    in the `loaded.saved` state. The primary use-case for `store#push` is
    to notify Ember Data about record updates (full or partial) that happen
    outside of the normal adapter methods (for example
    [SSE](http://dev.w3.org/html5/eventsource/) or [Web
    Sockets](http://www.w3.org/TR/2009/WD-websockets-20091222/)).
  
    [pushPayload](#method_pushPayload) is a convenience wrapper for
    `store#push` that will deserialize payloads if the
    Serializer implements a `pushPayload` method.
  
    Note: When creating a new record using any of the above methods
    Ember Data will update `DS.RecordArray`s such as those returned by
    `store#peekAll()` or `store#findAll()`. This means any
    data bindings or computed properties that depend on the RecordArray
    will automatically be synced to include the new or updated record
    values.
  
    @class Store
    @namespace DS
    @extends Ember.Service
  */
  exports.Store = Store = Service.extend({

    /**
      @method init
      @private
    */
    init: function () {
      this._super.apply(this, arguments);
      this._backburner = new Backburner(['normalizeRelationships', 'syncRelationships', 'finished']);
      // internal bookkeeping; not observable
      this.recordArrayManager = new _recordArrayManager.default({ store: this });
      this._identityMap = new _identityMap.default();
      this._pendingSave = [];
      this._instanceCache = new _containerInstanceCache.default((0, _utils.getOwner)(this), this);
      this._modelFactoryCache = Object.create(null);
      this._relationshipsPayloads = new _relationshipPayloadsManager.default(this);

      /*
        Ember Data uses several specialized micro-queues for organizing
        and coalescing similar async work.
         These queues are currently controlled by a flush scheduled into
        ember-data's custom backburner instance.
       */
      // used for coalescing record save requests
      this._pendingSave = [];
      // used for coalescing relationship updates
      this._updatedRelationships = [];
      // used for coalescing relationship setup needs
      this._pushedInternalModels = [];
      // used for coalescing internal model updates
      this._updatedInternalModels = [];

      // used to keep track of all the find requests that need to be coalesced
      this._pendingFetch = MapWithDefault.create({
        defaultValue: function () {
          return [];
        }
      });

      this._instanceCache = new _containerInstanceCache.default((0, _utils.getOwner)(this), this);
    },


    /**
      The default adapter to use to communicate to a backend server or
      other persistence layer. This will be overridden by an application
      adapter if present.
       If you want to specify `app/adapters/custom.js` as a string, do:
       ```js
      import DS from 'ember-data';
       export default DS.Store.extend({
        adapter: 'custom',
      });
      ```
       @property adapter
      @default '-json-api'
      @type {String}
    */
    adapter: '-json-api',

    /**
      Returns a JSON representation of the record using a custom
      type-specific serializer, if one exists.
       The available options are:
       * `includeId`: `true` if the record's ID should be included in
        the JSON representation
       @method serialize
      @private
      @deprecated
      @param {DS.Model} record the record to serialize
      @param {Object} options an options hash
    */
    serialize: function (record, options) {
      if (true) {
        (false && !(false) && Ember.deprecate('Use of store.serialize is deprecated, use record.serialize instead.', false, {
          id: 'ds.store.serialize',
          until: '3.0'
        }));
      }
      var snapshot = record._internalModel.createSnapshot();
      return snapshot.serialize(options);
    },


    /**
      This property returns the adapter, after resolving a possible
      string key.
       If the supplied `adapter` was a class, or a String property
      path resolved to a class, this property will instantiate the
      class.
       This property is cacheable, so the same instance of a specified
      adapter class should be used for the lifetime of the store.
       @property defaultAdapter
      @private
      @return DS.Adapter
    */
    defaultAdapter: computed('adapter', function () {
      var adapter = get(this, 'adapter');

      (false && Ember.assert('You tried to set `adapter` property to an instance of `DS.Adapter`, where it should be a name', typeof adapter === 'string'));


      return this.adapterFor(adapter);
    }),

    // .....................
    // . CREATE NEW RECORD .
    // .....................

    /**
      Create a new record in the current store. The properties passed
      to this method are set on the newly created record.
       To create a new instance of a `Post`:
       ```js
      store.createRecord('post', {
        title: 'Rails is omakase'
      });
      ```
       To create a new instance of a `Post` that has a relationship with a `User` record:
       ```js
      let user = this.store.peekRecord('user', 1);
      store.createRecord('post', {
        title: 'Rails is omakase',
        user: user
      });
      ```
       @method createRecord
      @param {String} modelName
      @param {Object} inputProperties a hash of properties to set on the
        newly created record.
      @return {DS.Model} record
    */
    createRecord: function (modelName, inputProperties) {
      (false && Ember.assert('You need to pass a model name to the store\'s createRecord method', isPresent(modelName)));
      (false && Ember.assert('Passing classes to store methods has been removed. Please pass a dasherized string instead of ' + modelName, typeof modelName === 'string'));

      var normalizedModelName = (0, _normalizeModelName.default)(modelName);
      var properties = copy(inputProperties) || Object.create(null);

      // If the passed properties do not include a primary key,
      // give the adapter an opportunity to generate one. Typically,
      // client-side ID generators will use something like uuid.js
      // to avoid conflicts.

      if (isNone(properties.id)) {
        properties.id = this._generateId(normalizedModelName, properties);
      }

      // Coerce ID to a string
      properties.id = (0, _coerceId.default)(properties.id);

      var internalModel = this._buildInternalModel(normalizedModelName, properties.id);
      internalModel.loadedData();
      var record = internalModel.getRecord(properties);

      // TODO @runspired this should also be coalesced into some form of internalModel.setState()
      internalModel.eachRelationship(function (key, descriptor) {
        if (properties[key] !== undefined) {
          internalModel._relationships.get(key).setHasData(true);
        }
      });

      return record;
    },


    /**
      If possible, this method asks the adapter to generate an ID for
      a newly created record.
       @method _generateId
      @private
      @param {String} modelName
      @param {Object} properties from the new record
      @return {String} if the adapter can generate one, an ID
    */
    _generateId: function (modelName, properties) {
      var adapter = this.adapterFor(modelName);

      if (adapter && adapter.generateIdForRecord) {
        return adapter.generateIdForRecord(this, modelName, properties);
      }

      return null;
    },


    // .................
    // . DELETE RECORD .
    // .................

    /**
      For symmetry, a record can be deleted via the store.
       Example
       ```javascript
      let post = store.createRecord('post', {
        title: 'Rails is omakase'
      });
       store.deleteRecord(post);
      ```
       @method deleteRecord
      @param {DS.Model} record
    */
    deleteRecord: function (record) {
      record.deleteRecord();
    },


    /**
      For symmetry, a record can be unloaded via the store.
      This will cause the record to be destroyed and freed up for garbage collection.
       Example
       ```javascript
      store.findRecord('post', 1).then(function(post) {
        store.unloadRecord(post);
      });
      ```
       @method unloadRecord
      @param {DS.Model} record
    */
    unloadRecord: function (record) {
      record.unloadRecord();
    },


    // ................
    // . FIND RECORDS .
    // ................

    /**
      @method find
      @param {String} modelName
      @param {String|Integer} id
      @param {Object} options
      @return {Promise} promise
      @private
    */
    find: function (modelName, id, options) {
      // The default `model` hook in Route calls `find(modelName, id)`,
      // that's why we have to keep this method around even though `findRecord` is
      // the public way to get a record by modelName and id.
      (false && Ember.assert('Using store.find(type) has been removed. Use store.findAll(modelName) to retrieve all records for a given type.', arguments.length !== 1));
      (false && Ember.assert('Calling store.find(modelName, id, { preload: preload }) is no longer supported. Use store.findRecord(modelName, id, { preload: preload }) instead.', !options));
      (false && Ember.assert('You need to pass the model name and id to the store\'s find method', arguments.length === 2));
      (false && Ember.assert('You cannot pass \'' + id + '\' as id to the store\'s find method', typeof id === 'string' || typeof id === 'number'));
      (false && Ember.assert('Calling store.find() with a query object is no longer supported. Use store.query() instead.', typeof id !== 'object'));
      (false && Ember.assert('Passing classes to store methods has been removed. Please pass a dasherized string instead of ' + modelName, typeof modelName === 'string'));


      var normalizedModelName = (0, _normalizeModelName.default)(modelName);

      return this.findRecord(normalizedModelName, id);
    },


    /**
      This method returns a record for a given type and id combination.
       The `findRecord` method will always resolve its promise with the same
      object for a given type and `id`.
       The `findRecord` method will always return a **promise** that will be
      resolved with the record.
       Example
       ```app/routes/post.js
      import Route from '@ember/routing/route';
       export default Route.extend({
        model(params) {
          return this.store.findRecord('post', params.post_id);
        }
      });
      ```
       If the record is not yet available, the store will ask the adapter's `find`
      method to find the necessary data. If the record is already present in the
      store, it depends on the reload behavior _when_ the returned promise
      resolves.
       ### Preloading
       You can optionally `preload` specific attributes and relationships that you know of
      by passing them via the passed `options`.
       For example, if your Ember route looks like `/posts/1/comments/2` and your API route
      for the comment also looks like `/posts/1/comments/2` if you want to fetch the comment
      without fetching the post you can pass in the post to the `findRecord` call:
       ```javascript
      store.findRecord('comment', 2, { preload: { post: 1 } });
      ```
       If you have access to the post model you can also pass the model itself:
       ```javascript
      store.findRecord('post', 1).then(function (myPostModel) {
        store.findRecord('comment', 2, { post: myPostModel });
      });
      ```
       ### Reloading
       The reload behavior is configured either via the passed `options` hash or
      the result of the adapter's `shouldReloadRecord`.
       If `{ reload: true }` is passed or `adapter.shouldReloadRecord` evaluates
      to `true`, then the returned promise resolves once the adapter returns
      data, regardless if the requested record is already in the store:
       ```js
      store.push({
        data: {
          id: 1,
          type: 'post',
          revision: 1
        }
      });
       // adapter#findRecord resolves with
      // [
      //   {
      //     id: 1,
      //     type: 'post',
      //     revision: 2
      //   }
      // ]
      store.findRecord('post', 1, { reload: true }).then(function(post) {
        post.get('revision'); // 2
      });
      ```
       If no reload is indicated via the abovementioned ways, then the promise
      immediately resolves with the cached version in the store.
       ### Background Reloading
       Optionally, if `adapter.shouldBackgroundReloadRecord` evaluates to `true`,
      then a background reload is started, which updates the records' data, once
      it is available:
       ```js
      // app/adapters/post.js
      import ApplicationAdapter from "./application";
       export default ApplicationAdapter.extend({
        shouldReloadRecord(store, snapshot) {
          return false;
        },
         shouldBackgroundReloadRecord(store, snapshot) {
          return true;
        }
      });
       // ...
       store.push({
        data: {
          id: 1,
          type: 'post',
          revision: 1
        }
      });
       let blogPost = store.findRecord('post', 1).then(function(post) {
        post.get('revision'); // 1
      });
       // later, once adapter#findRecord resolved with
      // [
      //   {
      //     id: 1,
      //     type: 'post',
      //     revision: 2
      //   }
      // ]
       blogPost.get('revision'); // 2
      ```
       If you would like to force or prevent background reloading, you can set a
      boolean value for `backgroundReload` in the options object for
      `findRecord`.
       ```app/routes/post/edit.js
      import Route from '@ember/routing/route';
       export default Route.extend({
        model(params) {
          return this.store.findRecord('post', params.post_id, { backgroundReload: false });
        }
      });
      ```
       If you pass an object on the `adapterOptions` property of the options
      argument it will be passed to you adapter via the snapshot
       ```app/routes/post/edit.js
      import Route from '@ember/routing/route';
       export default Route.extend({
        model(params) {
          return this.store.findRecord('post', params.post_id, {
            adapterOptions: { subscribe: false }
          });
        }
      });
      ```
       ```app/adapters/post.js
      import MyCustomAdapter from './custom-adapter';
       export default MyCustomAdapter.extend({
        findRecord(store, type, id, snapshot) {
          if (snapshot.adapterOptions.subscribe) {
            // ...
          }
          // ...
        }
      });
      ```
       See [peekRecord](#method_peekRecord) to get the cached version of a record.
       ### Retrieving Related Model Records
       If you use an adapter such as Ember's default
      [`JSONAPIAdapter`](https://emberjs.com/api/data/classes/DS.JSONAPIAdapter.html)
      that supports the [JSON API specification](http://jsonapi.org/) and if your server
      endpoint supports the use of an
      ['include' query parameter](http://jsonapi.org/format/#fetching-includes),
      you can use `findRecord()` to automatically retrieve additional records related to
      the one you request by supplying an `include` parameter in the `options` object.
       For example, given a `post` model that has a `hasMany` relationship with a `comment`
      model, when we retrieve a specific post we can have the server also return that post's
      comments in the same request:
       ```app/routes/post.js
      import Route from '@ember/routing/route';
       export default Route.extend({
        model(params) {
          return this.store.findRecord('post', params.post_id, { include: 'comments' });
        }
      });
       ```
      In this case, the post's comments would then be available in your template as
      `model.comments`.
       Multiple relationships can be requested using an `include` parameter consisting of a
      comma-separated list (without white-space) while nested relationships can be specified
      using a dot-separated sequence of relationship names. So to request both the post's
      comments and the authors of those comments the request would look like this:
       ```app/routes/post.js
      import Route from '@ember/routing/route';
       export default Route.extend({
        model(params) {
          return this.store.findRecord('post', params.post_id, { include: 'comments,comments.author' });
        }
      });
       ```
       @since 1.13.0
      @method findRecord
      @param {String} modelName
      @param {(String|Integer)} id
      @param {Object} options
      @return {Promise} promise
    */
    findRecord: function (modelName, id, options) {
      (false && Ember.assert('You need to pass a model name to the store\'s findRecord method', isPresent(modelName)));
      (false && Ember.assert('Passing classes to store methods has been removed. Please pass a dasherized string instead of ' + modelName, typeof modelName === 'string'));
      (false && Ember.assert(badIdFormatAssertion, typeof id === 'string' && id.length > 0 || typeof id === 'number' && !isNaN(id)));


      var normalizedModelName = (0, _normalizeModelName.default)(modelName);

      var internalModel = this._internalModelForId(normalizedModelName, id);
      options = options || {};

      if (!this.hasRecordForId(normalizedModelName, id)) {
        return this._findByInternalModel(internalModel, options);
      }

      var fetchedInternalModel = this._findRecord(internalModel, options);

      return promiseRecord(fetchedInternalModel, 'DS: Store#findRecord ' + normalizedModelName + ' with id: ' + id);
    },
    _findRecord: function (internalModel, options) {
      // Refetch if the reload option is passed
      if (options.reload) {
        return this._scheduleFetch(internalModel, options);
      }

      var snapshot = internalModel.createSnapshot(options);
      var adapter = this.adapterFor(internalModel.modelName);

      // Refetch the record if the adapter thinks the record is stale
      if (adapter.shouldReloadRecord(this, snapshot)) {
        return this._scheduleFetch(internalModel, options);
      }

      if (options.backgroundReload === false) {
        return Promise.resolve(internalModel);
      }

      // Trigger the background refetch if backgroundReload option is passed
      if (options.backgroundReload || adapter.shouldBackgroundReloadRecord(this, snapshot)) {
        this._scheduleFetch(internalModel, options);
      }

      // Return the cached record
      return Promise.resolve(internalModel);
    },
    _findByInternalModel: function (internalModel) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      if (options.preload) {
        internalModel.preloadData(options.preload);
      }

      var fetchedInternalModel = this._findEmptyInternalModel(internalModel, options);

      return promiseRecord(fetchedInternalModel, 'DS: Store#findRecord ' + internalModel.modelName + ' with id: ' + internalModel.id);
    },
    _findEmptyInternalModel: function (internalModel, options) {
      if (internalModel.isEmpty()) {
        return this._scheduleFetch(internalModel, options);
      }

      //TODO double check about reloading
      if (internalModel.isLoading()) {
        return internalModel._loadingPromise;
      }

      return Promise.resolve(internalModel);
    },


    /**
      This method makes a series of requests to the adapter's `find` method
      and returns a promise that resolves once they are all loaded.
       @private
      @method findByIds
      @param {String} modelName
      @param {Array} ids
      @return {Promise} promise
    */
    findByIds: function (modelName, ids) {
      (false && Ember.assert('You need to pass a model name to the store\'s findByIds method', isPresent(modelName)));
      (false && Ember.assert('Passing classes to store methods has been removed. Please pass a dasherized string instead of ' + modelName, typeof modelName === 'string'));


      var promises = new Array(ids.length);

      var normalizedModelName = (0, _normalizeModelName.default)(modelName);

      for (var i = 0; i < ids.length; i++) {
        promises[i] = this.findRecord(normalizedModelName, ids[i]);
      }

      return (0, _promiseProxies.promiseArray)(RSVP.all(promises).then(A, null, 'DS: Store#findByIds of ' + normalizedModelName + ' complete'));
    },


    /**
      This method is called by `findRecord` if it discovers that a particular
      type/id pair hasn't been loaded yet to kick off a request to the
      adapter.
       @method _fetchRecord
      @private
      @param {InternalModel} internalModel model
      @return {Promise} promise
     */
    _fetchRecord: function (internalModel, options) {
      var modelName = internalModel.modelName;
      var adapter = this.adapterFor(modelName);

      (false && Ember.assert('You tried to find a record but you have no adapter (for ' + modelName + ')', adapter));
      (false && Ember.assert('You tried to find a record but your adapter (for ' + modelName + ') does not implement \'findRecord\'', typeof adapter.findRecord === 'function'));


      return (0, _finders._find)(adapter, this, internalModel.type, internalModel.id, internalModel, options);
    },
    _scheduleFetchMany: function (internalModels) {
      var fetches = new Array(internalModels.length);

      for (var i = 0; i < internalModels.length; i++) {
        fetches[i] = this._scheduleFetch(internalModels[i]);
      }

      return Promise.all(fetches);
    },
    _scheduleFetch: function (internalModel, options) {
      if (internalModel._loadingPromise) {
        return internalModel._loadingPromise;
      }

      var id = internalModel.id,
          modelName = internalModel.modelName;

      var resolver = RSVP.defer('Fetching ' + modelName + '\' with id: ' + id);
      var pendingFetchItem = {
        internalModel: internalModel,
        resolver: resolver,
        options: options
      };

      var promise = resolver.promise;

      internalModel.loadingData(promise);
      if (this._pendingFetch.size === 0) {
        emberRun.schedule('afterRender', this, this.flushAllPendingFetches);
      }

      this._pendingFetch.get(modelName).push(pendingFetchItem);

      return promise;
    },
    flushAllPendingFetches: function () {
      if (this.isDestroyed || this.isDestroying) {
        return;
      }

      this._pendingFetch.forEach(this._flushPendingFetchForType, this);
      this._pendingFetch.clear();
    },
    _flushPendingFetchForType: function (pendingFetchItems, modelName) {
      var store = this;
      var adapter = store.adapterFor(modelName);
      var shouldCoalesce = !!adapter.findMany && adapter.coalesceFindRequests;
      var totalItems = pendingFetchItems.length;
      var internalModels = new Array(totalItems);
      var seeking = Object.create(null);

      for (var _i = 0; _i < totalItems; _i++) {
        var pendingItem = pendingFetchItems[_i];
        var _internalModel = pendingItem.internalModel;
        internalModels[_i] = _internalModel;
        seeking[_internalModel.id] = pendingItem;
      }

      function _fetchRecord(recordResolverPair) {
        var recordFetch = store._fetchRecord(recordResolverPair.internalModel, recordResolverPair.options); // TODO adapter options

        recordResolverPair.resolver.resolve(recordFetch);
      }

      function handleFoundRecords(foundInternalModels, expectedInternalModels) {
        // resolve found records
        var found = Object.create(null);
        for (var _i2 = 0, _l = foundInternalModels.length; _i2 < _l; _i2++) {
          var _internalModel2 = foundInternalModels[_i2];
          var _pair = seeking[_internalModel2.id];
          found[_internalModel2.id] = _internalModel2;

          if (_pair) {
            var resolver = _pair.resolver;
            resolver.resolve(_internalModel2);
          }
        }

        // reject missing records
        var missingInternalModels = [];

        for (var _i3 = 0, _l2 = expectedInternalModels.length; _i3 < _l2; _i3++) {
          var _internalModel3 = expectedInternalModels[_i3];

          if (!found[_internalModel3.id]) {
            missingInternalModels.push(_internalModel3);
          }
        }

        if (missingInternalModels.length) {
          (false && Ember.warn('Ember Data expected to find records with the following ids in the adapter response but they were missing: ' + inspect(missingInternalModels.map(function (r) {
            return r.id;
          })), false, {
            id: 'ds.store.missing-records-from-adapter'
          }));

          rejectInternalModels(missingInternalModels);
        }
      }

      function rejectInternalModels(internalModels, error) {
        for (var _i4 = 0, _l3 = internalModels.length; _i4 < _l3; _i4++) {
          var _internalModel4 = internalModels[_i4];
          var _pair2 = seeking[_internalModel4.id];

          if (_pair2) {
            _pair2.resolver.reject(error || new Error('Expected: \'' + _internalModel4 + '\' to be present in the adapter provided payload, but it was not found.'));
          }
        }
      }

      if (shouldCoalesce) {
        // TODO: Improve records => snapshots => records => snapshots
        //
        // We want to provide records to all store methods and snapshots to all
        // adapter methods. To make sure we're doing that we're providing an array
        // of snapshots to adapter.groupRecordsForFindMany(), which in turn will
        // return grouped snapshots instead of grouped records.
        //
        // But since the _findMany() finder is a store method we need to get the
        // records from the grouped snapshots even though the _findMany() finder
        // will once again convert the records to snapshots for adapter.findMany()
        var snapshots = new Array(totalItems);
        for (var _i5 = 0; _i5 < totalItems; _i5++) {
          snapshots[_i5] = internalModels[_i5].createSnapshot();
        }

        var groups = adapter.groupRecordsForFindMany(this, snapshots);

        for (var i = 0, l = groups.length; i < l; i++) {
          var group = groups[i];
          var totalInGroup = groups[i].length;
          var ids = new Array(totalInGroup);
          var groupedInternalModels = new Array(totalInGroup);

          for (var j = 0; j < totalInGroup; j++) {
            var internalModel = group[j]._internalModel;

            groupedInternalModels[j] = internalModel;
            ids[j] = internalModel.id;
          }

          if (totalInGroup > 1) {
            (function (groupedInternalModels) {
              (0, _finders._findMany)(adapter, store, modelName, ids, groupedInternalModels).then(function (foundInternalModels) {
                handleFoundRecords(foundInternalModels, groupedInternalModels);
              }).catch(function (error) {
                rejectInternalModels(groupedInternalModels, error);
              });
            })(groupedInternalModels);
          } else if (ids.length === 1) {
            var pair = seeking[groupedInternalModels[0].id];
            _fetchRecord(pair);
          } else {
            (false && Ember.assert("You cannot return an empty array from adapter's method groupRecordsForFindMany", false));
          }
        }
      } else {
        for (var _i6 = 0; _i6 < totalItems; _i6++) {
          _fetchRecord(pendingFetchItems[_i6]);
        }
      }
    },


    /**
      Get the reference for the specified record.
       Example
       ```javascript
      let userRef = store.getReference('user', 1);
       // check if the user is loaded
      let isLoaded = userRef.value() !== null;
       // get the record of the reference (null if not yet available)
      let user = userRef.value();
       // get the identifier of the reference
      if (userRef.remoteType() === 'id') {
      let id = userRef.id();
      }
       // load user (via store.find)
      userRef.load().then(...)
       // or trigger a reload
      userRef.reload().then(...)
       // provide data for reference
      userRef.push({ id: 1, username: '@user' }).then(function(user) {
        userRef.value() === user;
      });
      ```
       @method getReference
      @param {String} modelName
      @param {String|Integer} id
      @since 2.5.0
      @return {RecordReference}
    */
    getReference: function (modelName, id) {
      var normalizedModelName = (0, _normalizeModelName.default)(modelName);

      return this._internalModelForId(normalizedModelName, id).recordReference;
    },


    /**
      Get a record by a given type and ID without triggering a fetch.
       This method will synchronously return the record if it is available in the store,
      otherwise it will return `null`. A record is available if it has been fetched earlier, or
      pushed manually into the store.
       See [findRecord](#method_findRecord) if you would like to request this record from the backend.
       _Note: This is a synchronous method and does not return a promise._
       ```js
      let post = store.peekRecord('post', 1);
       post.get('id'); // 1
      ```
       @since 1.13.0
      @method peekRecord
      @param {String} modelName
      @param {String|Integer} id
      @return {DS.Model|null} record
    */
    peekRecord: function (modelName, id) {
      (false && Ember.assert('You need to pass a model name to the store\'s peekRecord method', isPresent(modelName)));
      (false && Ember.assert('You need to pass both a model name and id to the store\'s peekRecord method', isPresent(modelName) && isPresent(id)));
      (false && Ember.assert('Passing classes to store methods has been removed. Please pass a dasherized string instead of ' + modelName, typeof modelName === 'string'));

      var normalizedModelName = (0, _normalizeModelName.default)(modelName);

      if (this.hasRecordForId(normalizedModelName, id)) {
        return this._internalModelForId(normalizedModelName, id).getRecord();
      } else {
        return null;
      }
    },


    /**
      This method is called by the record's `reload` method.
       This method calls the adapter's `find` method, which returns a promise. When
      **that** promise resolves, `reloadRecord` will resolve the promise returned
      by the record's `reload`.
       @method reloadRecord
      @private
      @param {DS.Model} internalModel
      @return {Promise} promise
    */
    _reloadRecord: function (internalModel) {
      var id = internalModel.id,
          modelName = internalModel.modelName;

      var adapter = this.adapterFor(modelName);

      (false && Ember.assert('You cannot reload a record without an ID', id));
      (false && Ember.assert('You tried to reload a record but you have no adapter (for ' + modelName + ')', adapter));
      (false && Ember.assert('You tried to reload a record but your adapter does not implement \'findRecord\'', typeof adapter.findRecord === 'function' || typeof adapter.find === 'function'));


      return this._scheduleFetch(internalModel);
    },


    /**
     This method returns true if a record for a given modelName and id is already
     loaded in the store. Use this function to know beforehand if a findRecord()
     will result in a request or that it will be a cache hit.
      Example
      ```javascript
     store.hasRecordForId('post', 1); // false
     store.findRecord('post', 1).then(function() {
       store.hasRecordForId('post', 1); // true
     });
     ```
       @method hasRecordForId
      @param {String} modelName
      @param {(String|Integer)} id
      @return {Boolean}
    */
    hasRecordForId: function (modelName, id) {
      (false && Ember.assert('You need to pass a model name to the store\'s hasRecordForId method', isPresent(modelName)));
      (false && Ember.assert('Passing classes to store methods has been removed. Please pass a dasherized string instead of ' + modelName, typeof modelName === 'string'));


      var normalizedModelName = (0, _normalizeModelName.default)(modelName);

      var trueId = (0, _coerceId.default)(id);
      var internalModel = this._internalModelsFor(normalizedModelName).get(trueId);

      return !!internalModel && internalModel.isLoaded();
    },


    /**
      Returns id record for a given type and ID. If one isn't already loaded,
      it builds a new record and leaves it in the `empty` state.
       @method recordForId
      @private
      @param {String} modelName
      @param {(String|Integer)} id
      @return {DS.Model} record
    */
    recordForId: function (modelName, id) {
      (false && Ember.assert('You need to pass a model name to the store\'s recordForId method', isPresent(modelName)));
      (false && Ember.assert('Passing classes to store methods has been removed. Please pass a dasherized string instead of ' + modelName, typeof modelName === 'string'));


      return this._internalModelForId(modelName, id).getRecord();
    },
    _internalModelForId: function (modelName, id) {
      var trueId = (0, _coerceId.default)(id);
      var internalModel = this._internalModelsFor(modelName).get(trueId);

      if (internalModel) {
        if (internalModel.hasScheduledDestroy()) {
          internalModel.destroySync();
          return this._buildInternalModel(modelName, trueId);
        } else {
          return internalModel;
        }
      } else {
        return this._buildInternalModel(modelName, trueId);
      }
    },
    _internalModelDidReceiveRelationshipData: function (modelName, id, relationshipData) {
      this._relationshipsPayloads.push(modelName, id, relationshipData);
    },
    _internalModelDestroyed: function (internalModel) {
      this._removeFromIdMap(internalModel);
      this._relationshipsPayloads.unload(internalModel.modelName, internalModel.id);
    },


    /**
      @method findMany
      @private
      @param {Array} internalModels
      @return {Promise} promise
    */
    findMany: function (internalModels) {
      var finds = new Array(internalModels.length);

      for (var i = 0; i < internalModels.length; i++) {
        finds[i] = this._findEmptyInternalModel(internalModels[i]);
      }

      return Promise.all(finds);
    },


    /**
      If a relationship was originally populated by the adapter as a link
      (as opposed to a list of IDs), this method is called when the
      relationship is fetched.
       The link (which is usually a URL) is passed through unchanged, so the
      adapter can make whatever request it wants.
       The usual use-case is for the server to register a URL as a link, and
      then use that URL in the future to make a request for the relationship.
       @method findHasMany
      @private
      @param {InternalModel} internalModel
      @param {any} link
      @param {(Relationship)} relationship
      @return {Promise} promise
    */
    findHasMany: function (internalModel, link, relationship) {
      var adapter = this.adapterFor(internalModel.modelName);

      (false && Ember.assert('You tried to load a hasMany relationship but you have no adapter (for ' + internalModel.modelName + ')', adapter));
      (false && Ember.assert('You tried to load a hasMany relationship from a specified \'link\' in the original payload but your adapter does not implement \'findHasMany\'', typeof adapter.findHasMany === 'function'));


      return (0, _finders._findHasMany)(adapter, this, internalModel, link, relationship);
    },


    /**
      @method findBelongsTo
      @private
      @param {InternalModel} internalModel
      @param {any} link
      @param {Relationship} relationship
      @return {Promise} promise
    */
    findBelongsTo: function (internalModel, link, relationship) {
      var adapter = this.adapterFor(internalModel.modelName);

      (false && Ember.assert('You tried to load a belongsTo relationship but you have no adapter (for ' + internalModel.modelName + ')', adapter));
      (false && Ember.assert('You tried to load a belongsTo relationship from a specified \'link\' in the original payload but your adapter does not implement \'findBelongsTo\'', typeof adapter.findBelongsTo === 'function'));


      return (0, _finders._findBelongsTo)(adapter, this, internalModel, link, relationship);
    },


    /**
      This method delegates a query to the adapter. This is the one place where
      adapter-level semantics are exposed to the application.
       Each time this method is called a new request is made through the adapter.
       Exposing queries this way seems preferable to creating an abstract query
      language for all server-side queries, and then require all adapters to
      implement them.
       ---
       If you do something like this:
       ```javascript
      store.query('person', { page: 1 });
      ```
       The call made to the server, using a Rails backend, will look something like this:
       ```
      Started GET "/api/v1/person?page=1"
      Processing by Api::V1::PersonsController#index as HTML
      Parameters: { "page"=>"1" }
      ```
       ---
       If you do something like this:
       ```javascript
      store.query('person', { ids: [1, 2, 3] });
      ```
       The call to the server, using a Rails backend, will look something like this:
       ```
      Started GET "/api/v1/person?ids%5B%5D=1&ids%5B%5D=2&ids%5B%5D=3"
      Processing by Api::V1::PersonsController#index as HTML
      Parameters: { "ids" => ["1", "2", "3"] }
      ```
       This method returns a promise, which is resolved with an
      [`AdapterPopulatedRecordArray`](https://emberjs.com/api/data/classes/DS.AdapterPopulatedRecordArray.html)
      once the server returns.
       @since 1.13.0
      @method query
      @param {String} modelName
      @param {any} query an opaque query to be used by the adapter
      @return {Promise} promise
    */
    query: function (modelName, query) {
      (false && Ember.assert('You need to pass a model name to the store\'s query method', isPresent(modelName)));
      (false && Ember.assert('You need to pass a query hash to the store\'s query method', query));
      (false && Ember.assert('Passing classes to store methods has been removed. Please pass a dasherized string instead of ' + modelName, typeof modelName === 'string'));


      var normalizedModelName = (0, _normalizeModelName.default)(modelName);
      return this._query(normalizedModelName, query);
    },
    _query: function (modelName, query, array) {
      (false && Ember.assert('You need to pass a model name to the store\'s query method', isPresent(modelName)));
      (false && Ember.assert('You need to pass a query hash to the store\'s query method', query));
      (false && Ember.assert('Passing classes to store methods has been removed. Please pass a dasherized string instead of ' + modelName, typeof modelName === 'string'));

      var adapter = this.adapterFor(modelName);
      (false && Ember.assert('You tried to load a query but you have no adapter (for ' + modelName + ')', adapter));
      (false && Ember.assert('You tried to load a query but your adapter does not implement \'query\'', typeof adapter.query === 'function'));


      var pA = (0, _promiseProxies.promiseArray)((0, _finders._query)(adapter, this, modelName, query, array));

      return pA;
    },


    /**
      This method makes a request for one record, where the `id` is not known
      beforehand (if the `id` is known, use [`findRecord`](#method_findRecord)
      instead).
       This method can be used when it is certain that the server will return a
      single object for the primary data.
       Each time this method is called a new request is made through the adapter.
       Let's assume our API provides an endpoint for the currently logged in user
      via:
       ```
      // GET /api/current_user
      {
        user: {
          id: 1234,
          username: 'admin'
        }
      }
      ```
       Since the specific `id` of the `user` is not known beforehand, we can use
      `queryRecord` to get the user:
       ```javascript
      store.queryRecord('user', {}).then(function(user) {
        let username = user.get('username');
        console.log(`Currently logged in as ${username}`);
      });
      ```
       The request is made through the adapters' `queryRecord`:
       ```app/adapters/user.js
      import $ from 'jquery';
      import DS from 'ember-data';
       export default DS.Adapter.extend({
        queryRecord(modelName, query) {
          return $.getJSON('/api/current_user');
        }
      });
      ```
       Note: the primary use case for `store.queryRecord` is when a single record
      is queried and the `id` is not known beforehand. In all other cases
      `store.query` and using the first item of the array is likely the preferred
      way:
       ```
      // GET /users?username=unique
      {
        data: [{
          id: 1234,
          type: 'user',
          attributes: {
            username: "unique"
          }
        }]
      }
      ```
       ```javascript
      store.query('user', { username: 'unique' }).then(function(users) {
        return users.get('firstObject');
      }).then(function(user) {
        let id = user.get('id');
      });
      ```
       This method returns a promise, which resolves with the found record.
       If the adapter returns no data for the primary data of the payload, then
      `queryRecord` resolves with `null`:
       ```
      // GET /users?username=unique
      {
        data: null
      }
      ```
       ```javascript
      store.queryRecord('user', { username: 'unique' }).then(function(user) {
        console.log(user); // null
      });
      ```
       @since 1.13.0
      @method queryRecord
      @param {String} modelName
      @param {any} query an opaque query to be used by the adapter
      @return {Promise} promise which resolves with the found record or `null`
    */
    queryRecord: function (modelName, query) {
      (false && Ember.assert('You need to pass a model name to the store\'s queryRecord method', isPresent(modelName)));
      (false && Ember.assert('You need to pass a query hash to the store\'s queryRecord method', query));
      (false && Ember.assert('Passing classes to store methods has been removed. Please pass a dasherized string instead of ' + modelName, typeof modelName === 'string'));


      var normalizedModelName = (0, _normalizeModelName.default)(modelName);

      var adapter = this.adapterFor(normalizedModelName);

      (false && Ember.assert('You tried to make a query but you have no adapter (for ' + normalizedModelName + ')', adapter));
      (false && Ember.assert('You tried to make a query but your adapter does not implement \'queryRecord\'', typeof adapter.queryRecord === 'function'));


      return (0, _promiseProxies.promiseObject)((0, _finders._queryRecord)(adapter, this, modelName, query).then(function (internalModel) {
        // the promise returned by store.queryRecord is expected to resolve with
        // an instance of DS.Model
        if (internalModel) {
          return internalModel.getRecord();
        }

        return null;
      }));
    },


    /**
      `findAll` asks the adapter's `findAll` method to find the records for the
      given type, and returns a promise which will resolve with all records of
      this type present in the store, even if the adapter only returns a subset
      of them.
       ```app/routes/authors.js
      import Route from '@ember/routing/route';
       export default Route.extend({
        model(params) {
          return this.store.findAll('author');
        }
      });
      ```
       _When_ the returned promise resolves depends on the reload behavior,
      configured via the passed `options` hash and the result of the adapter's
      `shouldReloadAll` method.
       ### Reloading
       If `{ reload: true }` is passed or `adapter.shouldReloadAll` evaluates to
      `true`, then the returned promise resolves once the adapter returns data,
      regardless if there are already records in the store:
       ```js
      store.push({
        data: {
          id: 'first',
          type: 'author'
        }
      });
       // adapter#findAll resolves with
      // [
      //   {
      //     id: 'second',
      //     type: 'author'
      //   }
      // ]
      store.findAll('author', { reload: true }).then(function(authors) {
        authors.getEach('id'); // ['first', 'second']
      });
      ```
       If no reload is indicated via the abovementioned ways, then the promise
      immediately resolves with all the records currently loaded in the store.
       ### Background Reloading
       Optionally, if `adapter.shouldBackgroundReloadAll` evaluates to `true`,
      then a background reload is started. Once this resolves, the array with
      which the promise resolves, is updated automatically so it contains all the
      records in the store:
       ```app/adapters/application.js
      import DS from 'ember-data';
      export default DS.Adapter.extend({
        shouldReloadAll(store, snapshotsArray) {
          return false;
        },
         shouldBackgroundReloadAll(store, snapshotsArray) {
          return true;
        }
      });
       // ...
       store.push({
        data: {
          id: 'first',
          type: 'author'
        }
      });
       let allAuthors;
      store.findAll('author').then(function(authors) {
        authors.getEach('id'); // ['first']
         allAuthors = authors;
      });
       // later, once adapter#findAll resolved with
      // [
      //   {
      //     id: 'second',
      //     type: 'author'
      //   }
      // ]
       allAuthors.getEach('id'); // ['first', 'second']
      ```
       If you would like to force or prevent background reloading, you can set a
      boolean value for `backgroundReload` in the options object for
      `findAll`.
       ```app/routes/post/edit.js
      import Route from '@ember/routing/route';
       export default Route.extend({
        model() {
          return this.store.findAll('post', { backgroundReload: false });
        }
      });
      ```
       If you pass an object on the `adapterOptions` property of the options
      argument it will be passed to you adapter via the `snapshotRecordArray`
       ```app/routes/posts.js
      import Route from '@ember/routing/route';
       export default Route.extend({
        model(params) {
          return this.store.findAll('post', {
            adapterOptions: { subscribe: false }
          });
        }
      });
      ```
       ```app/adapters/post.js
      import MyCustomAdapter from './custom-adapter';
       export default MyCustomAdapter.extend({
        findAll(store, type, sinceToken, snapshotRecordArray) {
          if (snapshotRecordArray.adapterOptions.subscribe) {
            // ...
          }
          // ...
        }
      });
      ```
       See [peekAll](#method_peekAll) to get an array of current records in the
      store, without waiting until a reload is finished.
       ### Retrieving Related Model Records
       If you use an adapter such as Ember's default
      [`JSONAPIAdapter`](https://emberjs.com/api/data/classes/DS.JSONAPIAdapter.html)
      that supports the [JSON API specification](http://jsonapi.org/) and if your server
      endpoint supports the use of an
      ['include' query parameter](http://jsonapi.org/format/#fetching-includes),
      you can use `findAll()` to automatically retrieve additional records related to
      those requested by supplying an `include` parameter in the `options` object.
       For example, given a `post` model that has a `hasMany` relationship with a `comment`
      model, when we retrieve all of the post records we can have the server also return
      all of the posts' comments in the same request:
       ```app/routes/posts.js
      import Route from '@ember/routing/route';
       export default Route.extend({
        model() {
          return this.store.findAll('post', { include: 'comments' });
        }
      });
       ```
      Multiple relationships can be requested using an `include` parameter consisting of a
      comma-separated list (without white-space) while nested relationships can be specified
      using a dot-separated sequence of relationship names. So to request both the posts'
      comments and the authors of those comments the request would look like this:
       ```app/routes/posts.js
      import Route from '@ember/routing/route';
       export default Route.extend({
        model() {
          return this.store.findAll('post', { include: 'comments,comments.author' });
        }
      });
       ```
       See [query](#method_query) to only get a subset of records from the server.
       @since 1.13.0
      @method findAll
      @param {String} modelName
      @param {Object} options
      @return {Promise} promise
    */
    findAll: function (modelName, options) {
      (false && Ember.assert('You need to pass a model name to the store\'s findAll method', isPresent(modelName)));
      (false && Ember.assert('Passing classes to store methods has been removed. Please pass a dasherized string instead of ' + modelName, typeof modelName === 'string'));

      var normalizedModelName = (0, _normalizeModelName.default)(modelName);
      var fetch = this._fetchAll(normalizedModelName, this.peekAll(normalizedModelName), options);

      return fetch;
    },


    /**
      @method _fetchAll
      @private
      @param {DS.Model} modelName
      @param {DS.RecordArray} array
      @return {Promise} promise
    */
    _fetchAll: function (modelName, array) {
      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

      var adapter = this.adapterFor(modelName);
      var sinceToken = this._internalModelsFor(modelName).metadata.since;

      (false && Ember.assert('You tried to load all records but you have no adapter (for ' + modelName + ')', adapter));
      (false && Ember.assert('You tried to load all records but your adapter does not implement \'findAll\'', typeof adapter.findAll === 'function'));


      if (options.reload) {
        set(array, 'isUpdating', true);
        return (0, _promiseProxies.promiseArray)((0, _finders._findAll)(adapter, this, modelName, sinceToken, options));
      }

      var snapshotArray = array._createSnapshot(options);

      if (adapter.shouldReloadAll(this, snapshotArray)) {
        set(array, 'isUpdating', true);
        return (0, _promiseProxies.promiseArray)((0, _finders._findAll)(adapter, this, modelName, sinceToken, options));
      }

      if (options.backgroundReload === false) {
        return (0, _promiseProxies.promiseArray)(Promise.resolve(array));
      }

      if (options.backgroundReload || adapter.shouldBackgroundReloadAll(this, snapshotArray)) {
        set(array, 'isUpdating', true);
        (0, _finders._findAll)(adapter, this, modelName, sinceToken, options);
      }

      return (0, _promiseProxies.promiseArray)(Promise.resolve(array));
    },


    /**
      @method _didUpdateAll
      @param {String} modelName
      @private
    */
    _didUpdateAll: function (modelName) {
      this.recordArrayManager._didUpdateAll(modelName);
    },
    didUpdateAll: function (modelName) {
      (false && !(false) && Ember.deprecate('didUpdateAll was documented as private and will be removed in the next version of Ember Data.', false, { id: 'ember-data.didUpdateAll', until: '2.17.0' }));

      return this._didUpdateAll(modelName);
    },


    /**
      This method returns a filtered array that contains all of the
      known records for a given type in the store.
       Note that because it's just a filter, the result will contain any
      locally created records of the type, however, it will not make a
      request to the backend to retrieve additional records. If you
      would like to request all the records from the backend please use
      [store.findAll](#method_findAll).
       Also note that multiple calls to `peekAll` for a given type will always
      return the same `RecordArray`.
       Example
       ```javascript
      let localPosts = store.peekAll('post');
      ```
       @since 1.13.0
      @method peekAll
      @param {String} modelName
      @return {DS.RecordArray}
    */
    peekAll: function (modelName) {
      (false && Ember.assert('You need to pass a model name to the store\'s peekAll method', isPresent(modelName)));
      (false && Ember.assert('Passing classes to store methods has been removed. Please pass a dasherized string instead of ' + modelName, typeof modelName === 'string'));

      var normalizedModelName = (0, _normalizeModelName.default)(modelName);
      return this.recordArrayManager.liveRecordArrayFor(normalizedModelName);
    },


    /**
      This method unloads all records in the store.
      It schedules unloading to happen during the next run loop.
       Optionally you can pass a type which unload all records for a given type.
       ```javascript
      store.unloadAll();
      store.unloadAll('post');
      ```
       @method unloadAll
      @param {String} modelName
    */
    unloadAll: function (modelName) {
      (false && Ember.assert('Passing classes to store methods has been removed. Please pass a dasherized string instead of ' + modelName, !modelName || typeof modelName === 'string'));


      if (arguments.length === 0) {
        this._identityMap.clear();
      } else {
        var normalizedModelName = (0, _normalizeModelName.default)(modelName);
        this._internalModelsFor(normalizedModelName).clear();
      }
    },


    /**
      Takes a type and filter function, and returns a live RecordArray that
      remains up to date as new records are loaded into the store or created
      locally.
       The filter function takes a materialized record, and returns true
      if the record should be included in the filter and false if it should
      not.
       Example
       ```javascript
      store.filter('post', function(post) {
        return post.get('unread');
      });
      ```
       The filter function is called once on all records for the type when
      it is created, and then once on each newly loaded or created record.
       If any of a record's properties change, or if it changes state, the
      filter function will be invoked again to determine whether it should
      still be in the array.
       Optionally you can pass a query, which is the equivalent of calling
      [query](#method_query) with that same query, to fetch additional records
      from the server. The results returned by the server could then appear
      in the filter if they match the filter function.
       The query itself is not used to filter records, it's only sent to your
      server for you to be able to do server-side filtering. The filter
      function will be applied on the returned results regardless.
       Example
       ```javascript
      store.filter('post', { unread: true }, function(post) {
        return post.get('unread');
      }).then(function(unreadPosts) {
        unreadPosts.get('length'); // 5
        let unreadPost = unreadPosts.objectAt(0);
        unreadPost.set('unread', false);
        unreadPosts.get('length'); // 4
      });
      ```
       @method filter
      @private
      @param {String} modelName
      @param {Object} query optional query
      @param {Function} filter
      @return {DS.PromiseArray}
      @deprecated
    */
    filter: function (modelName, query, filter) {
      (false && Ember.assert('You need to pass a model name to the store\'s filter method', isPresent(modelName)));
      (false && Ember.assert('Passing classes to store methods has been removed. Please pass a dasherized string instead of ' + modelName, typeof modelName === 'string'));


      if (!ENV.ENABLE_DS_FILTER) {
        (false && Ember.assert('The filter API has been moved to a plugin. To enable store.filter using an environment flag, or to use an alternative, you can visit the ember-data-filter addon page. https://github.com/ember-data/ember-data-filter', false));
      }

      var promise = void 0;
      var length = arguments.length;
      var array = void 0;
      var hasQuery = length === 3;

      var normalizedModelName = (0, _normalizeModelName.default)(modelName);

      // allow an optional server query
      if (hasQuery) {
        promise = this.query(normalizedModelName, query);
      } else if (arguments.length === 2) {
        filter = query;
      }

      if (hasQuery) {
        array = this.recordArrayManager.createFilteredRecordArray(normalizedModelName, filter, query);
      } else {
        array = this.recordArrayManager.createFilteredRecordArray(normalizedModelName, filter);
      }

      promise = promise || Promise.resolve(array);

      return (0, _promiseProxies.promiseArray)(promise.then(function () {
        return array;
      }, null, 'DS: Store#filter of ' + normalizedModelName));
    },


    /**
      This method has been deprecated and is an alias for store.hasRecordForId, which should
      be used instead.
       @deprecated
      @method recordIsLoaded
      @param {String} modelName
      @param {string} id
      @return {boolean}
    */
    recordIsLoaded: function (modelName, id) {
      (false && !(false) && Ember.deprecate('Use of recordIsLoaded is deprecated, use hasRecordForId instead.', false, {
        id: 'ds.store.recordIsLoaded',
        until: '3.0'
      }));

      return this.hasRecordForId(modelName, id);
    },


    // ..............
    // . PERSISTING .
    // ..............

    /**
      This method is called by `record.save`, and gets passed a
      resolver for the promise that `record.save` returns.
       It schedules saving to happen at the end of the run loop.
       @method scheduleSave
      @private
      @param {InternalModel} internalModel
      @param {Resolver} resolver
      @param {Object} options
    */
    scheduleSave: function (internalModel, resolver, options) {
      var snapshot = internalModel.createSnapshot(options);
      internalModel.flushChangedAttributes();
      internalModel.adapterWillCommit();
      this._pendingSave.push({
        snapshot: snapshot,
        resolver: resolver
      });
      emberRun.once(this, this.flushPendingSave);
    },


    /**
      This method is called at the end of the run loop, and
      flushes any records passed into `scheduleSave`
       @method flushPendingSave
      @private
    */
    flushPendingSave: function () {
      var pending = this._pendingSave.slice();
      this._pendingSave = [];

      for (var i = 0, j = pending.length; i < j; i++) {
        var pendingItem = pending[i];
        var snapshot = pendingItem.snapshot;
        var resolver = pendingItem.resolver;
        var internalModel = snapshot._internalModel;
        var adapter = this.adapterFor(internalModel.modelName);
        var operation = void 0;

        if (internalModel.currentState.stateName === 'root.deleted.saved') {
          resolver.resolve();
          continue;
        } else if (internalModel.isNew()) {
          operation = 'createRecord';
        } else if (internalModel.isDeleted()) {
          operation = 'deleteRecord';
        } else {
          operation = 'updateRecord';
        }

        resolver.resolve(_commit(adapter, this, operation, snapshot));
      }
    },


    /**
      This method is called once the promise returned by an
      adapter's `createRecord`, `updateRecord` or `deleteRecord`
      is resolved.
       If the data provides a server-generated ID, it will
      update the record and the store's indexes.
       @method didSaveRecord
      @private
      @param {InternalModel} internalModel the in-flight internal model
      @param {Object} data optional data (see above)
    */
    didSaveRecord: function (internalModel, dataArg) {
      var data = void 0;
      if (dataArg) {
        data = dataArg.data;
      }
      if (data) {
        // normalize relationship IDs into records
        this.updateId(internalModel, data);
        this._setupRelationshipsForModel(internalModel, data);
      } else {
        (false && Ember.assert('Your ' + internalModel.modelName + ' record was saved to the server, but the response does not have an id and no id has been set client side. Records must have ids. Please update the server response to provide an id in the response or generate the id on the client side either before saving the record or while normalizing the response.', internalModel.id));
      }

      //We first make sure the primary data has been updated
      //TODO try to move notification to the user to the end of the runloop
      internalModel.adapterDidCommit(data);
    },


    /**
      This method is called once the promise returned by an
      adapter's `createRecord`, `updateRecord` or `deleteRecord`
      is rejected with a `DS.InvalidError`.
       @method recordWasInvalid
      @private
      @param {InternalModel} internalModel
      @param {Object} errors
    */
    recordWasInvalid: function (internalModel, errors) {
      internalModel.adapterDidInvalidate(errors);
    },


    /**
      This method is called once the promise returned by an
      adapter's `createRecord`, `updateRecord` or `deleteRecord`
      is rejected (with anything other than a `DS.InvalidError`).
       @method recordWasError
      @private
      @param {InternalModel} internalModel
      @param {Error} error
    */
    recordWasError: function (internalModel, error) {
      internalModel.adapterDidError(error);
    },


    /**
      When an adapter's `createRecord`, `updateRecord` or `deleteRecord`
      resolves with data, this method extracts the ID from the supplied
      data.
       @method updateId
      @private
      @param {InternalModel} internalModel
      @param {Object} data
    */
    updateId: function (internalModel, data) {
      var oldId = internalModel.id;
      var modelName = internalModel.modelName;
      var id = (0, _coerceId.default)(data.id);

      // ID absolutely can't be missing if the oldID is empty (missing Id in response for a new record)
      (false && Ember.assert('\'' + modelName + '\' was saved to the server, but the response does not have an id and your record does not either.', !(id === null && oldId === null)));

      // ID absolutely can't be different than oldID if oldID is not null

      (false && Ember.assert('\'' + modelName + ':' + oldId + '\' was saved to the server, but the response returned the new id \'' + id + '\'. The store cannot assign a new id to a record that already has an id.', !(oldId !== null && id !== oldId)));

      // ID can be null if oldID is not null (altered ID in response for a record)
      // however, this is more than likely a developer error.

      if (oldId !== null && id === null) {
        (false && Ember.warn('Your ' + modelName + ' record was saved to the server, but the response does not have an id.', !(oldId !== null && id === null)));

        return;
      }

      var existingInternalModel = this._existingInternalModelForId(modelName, id);

      (false && Ember.assert('\'' + modelName + '\' was saved to the server, but the response returned the new id \'' + id + '\', which has already been used with another record.\'', isNone(existingInternalModel) || existingInternalModel === internalModel));


      this._internalModelsFor(internalModel.modelName).set(id, internalModel);

      internalModel.setId(id);
    },


    /**
      Returns a map of IDs to client IDs for a given modelName.
       @method _internalModelsFor
      @private
      @param {String} modelName
      @return {Object} recordMap
    */
    _internalModelsFor: function (modelName) {
      return this._identityMap.retrieve(modelName);
    },


    // ................
    // . LOADING DATA .
    // ................

    /**
      This internal method is used by `push`.
       @method _load
      @private
      @param {Object} data
    */
    _load: function (data) {
      var modelName = (0, _normalizeModelName.default)(data.type);
      var internalModel = this._internalModelForId(modelName, data.id);

      var isUpdate = internalModel.currentState.isEmpty === false;

      internalModel.setupData(data);

      if (isUpdate) {
        this.recordArrayManager.recordDidChange(internalModel);
      } else {
        this.recordArrayManager.recordWasLoaded(internalModel);
      }

      return internalModel;
    },


    /*
      In case someone defined a relationship to a mixin, for example:
      ```
        let Comment = DS.Model.extend({
          owner: belongsTo('commentable'. { polymorphic: true })
        });
        let Commentable = Ember.Mixin.create({
          comments: hasMany('comment')
        });
      ```
      we want to look up a Commentable class which has all the necessary
      relationship metadata. Thus, we look up the mixin and create a mock
      DS.Model, so we can access the relationship CPs of the mixin (`comments`)
      in this case
       @private
    */
    _modelForMixin: function (normalizedModelName) {
      // container.registry = 2.1
      // container._registry = 1.11 - 2.0
      // container = < 1.11
      var owner = (0, _utils.getOwner)(this);
      var mixin = void 0;

      if (owner.factoryFor) {
        var MaybeMixin = owner.factoryFor('mixin:' + normalizedModelName);
        mixin = MaybeMixin && MaybeMixin.class;
      } else {
        mixin = owner._lookupFactory('mixin:' + normalizedModelName);
      }

      if (mixin) {
        var ModelForMixin = _model.default.extend(mixin);
        ModelForMixin.reopenClass({
          __isMixin: true,
          __mixin: mixin
        });

        //Cache the class as a model
        owner.register('model:' + normalizedModelName, ModelForMixin);
      }

      return this.modelFactoryFor(normalizedModelName);
    },


    /**
      Returns the model class for the particular `modelName`.
       The class of a model might be useful if you want to get a list of all the
      relationship names of the model, see
      [`relationshipNames`](https://emberjs.com/api/data/classes/DS.Model.html#property_relationshipNames)
      for example.
       @method modelFor
      @param {String} modelName
      @return {DS.Model}
    */
    modelFor: function (modelName) {
      (false && Ember.assert('You need to pass a model name to the store\'s modelFor method', isPresent(modelName)));
      (false && Ember.assert('Passing classes to store methods has been removed. Please pass a dasherized string instead of ' + modelName, typeof modelName === 'string'));


      var normalizedModelName = (0, _normalizeModelName.default)(modelName);

      return this._modelFor(normalizedModelName);
    },


    /*
      @private
     */
    _modelFor: function (modelName) {
      var maybeFactory = this._modelFactoryFor(modelName);
      // for factorFor factory/class split
      return maybeFactory.class ? maybeFactory.class : maybeFactory;
    },
    _modelFactoryFor: function (modelName) {
      var factory = this._modelFactoryCache[modelName];

      if (!factory) {
        factory = this.modelFactoryFor(modelName);

        if (!factory) {
          //Support looking up mixins as base types for polymorphic relationships
          factory = this._modelForMixin(modelName);
        }
        if (!factory) {
          throw new EmberError('No model was found for \'' + modelName + '\'');
        }

        // interopt with the future
        var klass = (0, _utils.getOwner)(this).factoryFor ? factory.class : factory;

        (false && Ember.assert('\'' + inspect(klass) + '\' does not appear to be an ember-data model', klass.isModel));

        // TODO: deprecate this

        klass.modelName = klass.modelName || modelName;

        this._modelFactoryCache[modelName] = factory;
      }

      return factory;
    },


    /*
     @private
     */
    modelFactoryFor: function (modelName) {
      (false && Ember.assert('You need to pass a model name to the store\'s modelFactoryFor method', isPresent(modelName)));
      (false && Ember.assert('Passing classes to store methods has been removed. Please pass a dasherized string instead of ' + modelName, typeof modelName === 'string'));


      var normalizedModelName = (0, _normalizeModelName.default)(modelName);
      var owner = (0, _utils.getOwner)(this);

      if (owner.factoryFor) {
        return owner.factoryFor('model:' + normalizedModelName);
      } else {
        return owner._lookupFactory('model:' + normalizedModelName);
      }
    },


    /**
      Push some data for a given type into the store.
       This method expects normalized [JSON API](http://jsonapi.org/) document. This means you have to follow [JSON API specification](http://jsonapi.org/format/) with few minor adjustments:
      - record's `type` should always be in singular, dasherized form
      - members (properties) should be camelCased
       [Your primary data should be wrapped inside `data` property](http://jsonapi.org/format/#document-top-level):
       ```js
      store.push({
        data: {
          // primary data for single record of type `Person`
          id: '1',
          type: 'person',
          attributes: {
            firstName: 'Daniel',
            lastName: 'Kmak'
          }
        }
      });
      ```
       [Demo.](http://ember-twiddle.com/fb99f18cd3b4d3e2a4c7)
       `data` property can also hold an array (of records):
       ```js
      store.push({
        data: [
          // an array of records
          {
            id: '1',
            type: 'person',
            attributes: {
              firstName: 'Daniel',
              lastName: 'Kmak'
            }
          },
          {
            id: '2',
            type: 'person',
            attributes: {
              firstName: 'Tom',
              lastName: 'Dale'
            }
          }
        ]
      });
      ```
       [Demo.](http://ember-twiddle.com/69cdbeaa3702159dc355)
       There are some typical properties for `JSONAPI` payload:
      * `id` - mandatory, unique record's key
      * `type` - mandatory string which matches `model`'s dasherized name in singular form
      * `attributes` - object which holds data for record attributes - `DS.attr`'s declared in model
      * `relationships` - object which must contain any of the following properties under each relationships' respective key (example path is `relationships.achievements.data`):
        - [`links`](http://jsonapi.org/format/#document-links)
        - [`data`](http://jsonapi.org/format/#document-resource-object-linkage) - place for primary data
        - [`meta`](http://jsonapi.org/format/#document-meta) - object which contains meta-information about relationship
       For this model:
       ```app/models/person.js
      import DS from 'ember-data';
       export default DS.Model.extend({
        firstName: DS.attr('string'),
        lastName: DS.attr('string'),
         children: DS.hasMany('person')
      });
      ```
       To represent the children as IDs:
       ```js
      {
        data: {
          id: '1',
          type: 'person',
          attributes: {
            firstName: 'Tom',
            lastName: 'Dale'
          },
          relationships: {
            children: {
              data: [
                {
                  id: '2',
                  type: 'person'
                },
                {
                  id: '3',
                  type: 'person'
                },
                {
                  id: '4',
                  type: 'person'
                }
              ]
            }
          }
        }
      }
      ```
       [Demo.](http://ember-twiddle.com/343e1735e034091f5bde)
       To represent the children relationship as a URL:
       ```js
      {
        data: {
          id: '1',
          type: 'person',
          attributes: {
            firstName: 'Tom',
            lastName: 'Dale'
          },
          relationships: {
            children: {
              links: {
                related: '/people/1/children'
              }
            }
          }
        }
      }
      ```
       If you're streaming data or implementing an adapter, make sure
      that you have converted the incoming data into this form. The
      store's [normalize](#method_normalize) method is a convenience
      helper for converting a json payload into the form Ember Data
      expects.
       ```js
      store.push(store.normalize('person', data));
      ```
       This method can be used both to push in brand new
      records, as well as to update existing records.
       @method push
      @param {Object} data
      @return {DS.Model|Array} the record(s) that was created or
        updated.
    */
    push: function (data) {
      var pushed = this._push(data);

      if (Array.isArray(pushed)) {
        var records = pushed.map(function (internalModel) {
          return internalModel.getRecord();
        });

        return records;
      }

      if (pushed === null) {
        return null;
      }

      var record = pushed.getRecord();

      return record;
    },


    /*
      Push some data in the form of a json-api document into the store,
      without creating materialized records.
       @method _push
      @private
      @param {Object} jsonApiDoc
      @return {DS.InternalModel|Array<DS.InternalModel>} pushed InternalModel(s)
    */
    _push: function (jsonApiDoc) {
      var _this = this;

      var internalModelOrModels = this._backburner.join(function () {
        var included = jsonApiDoc.included;
        var i = void 0,
            length = void 0;

        if (included) {
          for (i = 0, length = included.length; i < length; i++) {
            _this._pushInternalModel(included[i]);
          }
        }

        if (Array.isArray(jsonApiDoc.data)) {
          length = jsonApiDoc.data.length;
          var internalModels = new Array(length);

          for (i = 0; i < length; i++) {
            internalModels[i] = _this._pushInternalModel(jsonApiDoc.data[i]);
          }
          return internalModels;
        }

        if (jsonApiDoc.data === null) {
          return null;
        }

        (false && Ember.assert('Expected an object in the \'data\' property in a call to \'push\' for ' + jsonApiDoc.type + ', but was ' + typeOf(jsonApiDoc.data), typeOf(jsonApiDoc.data) === 'object'));


        return _this._pushInternalModel(jsonApiDoc.data);
      });

      return internalModelOrModels;
    },
    _hasModelFor: function (modelName) {
      var owner = (0, _utils.getOwner)(this);
      modelName = (0, _normalizeModelName.default)(modelName);

      if (owner.factoryFor) {
        return !!owner.factoryFor('model:' + modelName);
      } else {
        return !!owner._lookupFactory('model:' + modelName);
      }
    },
    _pushInternalModel: function (data) {
      var modelName = data.type;
      (false && Ember.assert('You must include an \'id\' for ' + modelName + ' in an object passed to \'push\'', data.id !== null && data.id !== undefined && data.id !== ''));
      (false && Ember.assert('You tried to push data with a type \'' + modelName + '\' but no model could be found with that name.', this._hasModelFor(modelName)));


      if (false) {
        // If ENV.DS_WARN_ON_UNKNOWN_KEYS is set to true and the payload
        // contains unknown attributes or relationships, log a warning.

        if (ENV.DS_WARN_ON_UNKNOWN_KEYS) {
          var modelClass = this._modelFor(modelName);

          // Check unknown attributes
          var unknownAttributes = Object.keys(data.attributes || {}).filter(function (key) {
            return !get(modelClass, 'fields').has(key);
          });
          var unknownAttributesMessage = 'The payload for \'' + modelName + '\' contains these unknown attributes: ' + unknownAttributes + '. Make sure they\'ve been defined in your model.';
          (false && Ember.warn(unknownAttributesMessage, unknownAttributes.length === 0, { id: 'ds.store.unknown-keys-in-payload' }));

          // Check unknown relationships

          var unknownRelationships = Object.keys(data.relationships || {}).filter(function (key) {
            return !get(modelClass, 'fields').has(key);
          });
          var unknownRelationshipsMessage = 'The payload for \'' + modelName + '\' contains these unknown relationships: ' + unknownRelationships + '. Make sure they\'ve been defined in your model.';
          (false && Ember.warn(unknownRelationshipsMessage, unknownRelationships.length === 0, { id: 'ds.store.unknown-keys-in-payload' }));
        }
      }

      // Actually load the record into the store.
      var internalModel = this._load(data);

      this._setupRelationshipsForModel(internalModel, data);

      return internalModel;
    },
    _setupRelationshipsForModel: function (internalModel, data) {
      if (data.relationships === undefined) {
        return;
      }

      if (this._pushedInternalModels.push(internalModel, data) !== 2) {
        return;
      }

      this._backburner.schedule('normalizeRelationships', this, this._setupRelationships);
    },
    _setupRelationships: function () {
      var pushed = this._pushedInternalModels;

      // Cache the inverse maps for each modelClass that we visit during this
      // payload push.  In the common case where we are pushing many more
      // instances than types we want to minimize the cost of looking up the
      // inverse map and the overhead of Ember.get adds up.
      var modelNameToInverseMap = void 0;

      for (var i = 0, l = pushed.length; i < l; i += 2) {
        modelNameToInverseMap = modelNameToInverseMap || Object.create(null);
        // This will convert relationships specified as IDs into DS.Model instances
        // (possibly unloaded) and also create the data structures used to track
        // relationships.
        var internalModel = pushed[i];
        var data = pushed[i + 1];
        setupRelationships(this, internalModel, data, modelNameToInverseMap);
      }

      pushed.length = 0;
    },


    /**
      Push some raw data into the store.
       This method can be used both to push in brand new
      records, as well as to update existing records. You
      can push in more than one type of object at once.
      All objects should be in the format expected by the
      serializer.
       ```app/serializers/application.js
      import DS from 'ember-data';
       export default DS.ActiveModelSerializer;
      ```
       ```js
      let pushData = {
        posts: [
          { id: 1, post_title: "Great post", comment_ids: [2] }
        ],
        comments: [
          { id: 2, comment_body: "Insightful comment" }
        ]
      }
       store.pushPayload(pushData);
      ```
       By default, the data will be deserialized using a default
      serializer (the application serializer if it exists).
       Alternatively, `pushPayload` will accept a model type which
      will determine which serializer will process the payload.
       ```app/serializers/application.js
      import DS from 'ember-data';
       export default DS.ActiveModelSerializer;
      ```
       ```app/serializers/post.js
      import DS from 'ember-data';
       export default DS.JSONSerializer;
      ```
       ```js
      store.pushPayload(pushData); // Will use the application serializer
      store.pushPayload('post', pushData); // Will use the post serializer
      ```
       @method pushPayload
      @param {String} modelName Optionally, a model type used to determine which serializer will be used
      @param {Object} inputPayload
    */
    pushPayload: function (modelName, inputPayload) {
      var serializer = void 0;
      var payload = void 0;
      if (!inputPayload) {
        payload = modelName;
        serializer = defaultSerializer(this);
        (false && Ember.assert('You cannot use \'store#pushPayload\' without a modelName unless your default serializer defines \'pushPayload\'', typeof serializer.pushPayload === 'function'));
      } else {
        payload = inputPayload;
        (false && Ember.assert('Passing classes to store methods has been removed. Please pass a dasherized string instead of ' + modelName, typeof modelName === 'string'));

        var normalizedModelName = (0, _normalizeModelName.default)(modelName);
        serializer = this.serializerFor(normalizedModelName);
      }
      if ((0, _features.default)('ds-pushpayload-return')) {
        return serializer.pushPayload(this, payload);
      } else {
        serializer.pushPayload(this, payload);
      }
    },


    /**
      `normalize` converts a json payload into the normalized form that
      [push](#method_push) expects.
       Example
       ```js
      socket.on('message', function(message) {
        let modelName = message.model;
        let data = message.data;
        store.push(store.normalize(modelName, data));
      });
      ```
       @method normalize
      @param {String} modelName The name of the model type for this payload
      @param {Object} payload
      @return {Object} The normalized payload
    */
    normalize: function (modelName, payload) {
      (false && Ember.assert('You need to pass a model name to the store\'s normalize method', isPresent(modelName)));
      (false && Ember.assert('Passing classes to store methods has been removed. Please pass a dasherized string instead of ' + inspect(modelName), typeof modelName === 'string'));

      var normalizedModelName = (0, _normalizeModelName.default)(modelName);
      var serializer = this.serializerFor(normalizedModelName);
      var model = this._modelFor(normalizedModelName);
      return serializer.normalize(model, payload);
    },


    /**
      Build a brand new record for a given type, ID, and
      initial data.
       @method _buildInternalModel
      @private
      @param {String} modelName
      @param {String} id
      @param {Object} data
      @return {InternalModel} internal model
    */
    _buildInternalModel: function (modelName, id, data) {
      (false && Ember.assert('You can no longer pass a modelClass as the first argument to store._buildInternalModel. Pass modelName instead.', typeof modelName === 'string'));


      var existingInternalModel = this._existingInternalModelForId(modelName, id);

      (false && Ember.assert('The id ' + id + ' has already been used with another record for modelClass \'' + modelName + '\'.', !existingInternalModel));

      // lookupFactory should really return an object that creates
      // instances with the injections applied

      var internalModel = new _internalModel5.default(modelName, id, this, data);

      this._internalModelsFor(modelName).add(internalModel, id);

      return internalModel;
    },
    _existingInternalModelForId: function (modelName, id) {
      var internalModel = this._internalModelsFor(modelName).get(id);

      if (internalModel && internalModel.hasScheduledDestroy()) {
        // unloadRecord is async, if one attempts to unload + then sync create,
        // we must ensure the unload is complete before starting the create
        internalModel.destroySync();
        internalModel = null;
      }
      return internalModel;
    },
    buildInternalModel: function (modelName, id, data) {
      (false && !(false) && Ember.deprecate('buildInternalModel was documented as private and will be removed in the next version of Ember Data.', false, { id: 'ember-data.buildInternalModel', until: '2.17.0' }));

      return this._buildInternalModel(modelName, id, data);
    },


    //Called by the state machine to notify the store that the record is ready to be interacted with
    recordWasLoaded: function (record) {
      this.recordArrayManager.recordWasLoaded(record);
    },


    // ...............
    // . DESTRUCTION .
    // ...............

    /**
      When a record is destroyed, this un-indexes it and
      removes it from any record arrays so it can be GCed.
       @method _removeFromIdMap
      @private
      @param {InternalModel} internalModel
    */
    _removeFromIdMap: function (internalModel) {
      var recordMap = this._internalModelsFor(internalModel.modelName);
      var id = internalModel.id;

      recordMap.remove(internalModel, id);
    },


    // ......................
    // . PER-TYPE ADAPTERS
    // ......................

    /**
      Returns an instance of the adapter for a given type. For
      example, `adapterFor('person')` will return an instance of
      `App.PersonAdapter`.
       If no `App.PersonAdapter` is found, this method will look
      for an `App.ApplicationAdapter` (the default adapter for
      your entire application).
       If no `App.ApplicationAdapter` is found, it will return
      the value of the `defaultAdapter`.
       @method adapterFor
      @public
      @param {String} modelName
      @return DS.Adapter
    */
    adapterFor: function (modelName) {
      (false && Ember.assert('You need to pass a model name to the store\'s adapterFor method', isPresent(modelName)));
      (false && Ember.assert('Passing classes to store.adapterFor has been removed. Please pass a dasherized string instead of ' + modelName, typeof modelName === 'string'));

      var normalizedModelName = (0, _normalizeModelName.default)(modelName);

      return this._instanceCache.get('adapter', normalizedModelName);
    },


    // ..............................
    // . RECORD CHANGE NOTIFICATION .
    // ..............................

    /**
      Returns an instance of the serializer for a given type. For
      example, `serializerFor('person')` will return an instance of
      `App.PersonSerializer`.
       If no `App.PersonSerializer` is found, this method will look
      for an `App.ApplicationSerializer` (the default serializer for
      your entire application).
       if no `App.ApplicationSerializer` is found, it will attempt
      to get the `defaultSerializer` from the `PersonAdapter`
      (`adapterFor('person')`).
       If a serializer cannot be found on the adapter, it will fall back
      to an instance of `DS.JSONSerializer`.
       @method serializerFor
      @public
      @param {String} modelName the record to serialize
      @return {DS.Serializer}
    */
    serializerFor: function (modelName) {
      (false && Ember.assert('You need to pass a model name to the store\'s serializerFor method', isPresent(modelName)));
      (false && Ember.assert('Passing classes to store.serializerFor has been removed. Please pass a dasherized string instead of ' + modelName, typeof modelName === 'string'));

      var normalizedModelName = (0, _normalizeModelName.default)(modelName);

      return this._instanceCache.get('serializer', normalizedModelName);
    },
    lookupAdapter: function (name) {
      (false && !(false) && Ember.deprecate('Use of lookupAdapter is deprecated, use adapterFor instead.', false, {
        id: 'ds.store.lookupAdapter',
        until: '3.0'
      }));

      return this.adapterFor(name);
    },
    lookupSerializer: function (name) {
      (false && !(false) && Ember.deprecate('Use of lookupSerializer is deprecated, use serializerFor instead.', false, {
        id: 'ds.store.lookupSerializer',
        until: '3.0'
      }));

      return this.serializerFor(name);
    },
    willDestroy: function () {
      this._super.apply(this, arguments);
      this._pushedInternalModels = null;
      this.recordArrayManager.destroy();
      this._instanceCache.destroy();

      this.unloadAll();
    },
    _updateRelationshipState: function (relationship) {
      var _this2 = this;

      if (this._updatedRelationships.push(relationship) !== 1) {
        return;
      }

      this._backburner.join(function () {
        _this2._backburner.schedule('syncRelationships', _this2, _this2._flushUpdatedRelationships);
      });
    },
    _flushUpdatedRelationships: function () {
      var updated = this._updatedRelationships;

      for (var i = 0, l = updated.length; i < l; i++) {
        updated[i].flushCanonical();
      }

      updated.length = 0;
    },
    _updateInternalModel: function (internalModel) {
      if (this._updatedInternalModels.push(internalModel) !== 1) {
        return;
      }

      emberRun.schedule('actions', this, this._flushUpdatedInternalModels);
    },
    _flushUpdatedInternalModels: function () {
      var updated = this._updatedInternalModels;

      for (var i = 0, l = updated.length; i < l; i++) {
        updated[i]._triggerDeferredTriggers();
      }

      updated.length = 0;
    },
    _pushResourceIdentifier: function (relationship, resourceIdentifier) {
      if (isNone(resourceIdentifier)) {
        return;
      }

      (false && Ember.assert('A ' + relationship.internalModel.modelName + ' record was pushed into the store with the value of ' + relationship.key + ' being ' + inspect(resourceIdentifier) + ', but ' + relationship.key + ' is a belongsTo relationship so the value must not be an array. You should probably check your data payload or serializer.', !Array.isArray(resourceIdentifier)));

      //TODO:Better asserts

      return this._internalModelForId(resourceIdentifier.type, resourceIdentifier.id);
    },
    _pushResourceIdentifiers: function (relationship, resourceIdentifiers) {
      if (isNone(resourceIdentifiers)) {
        return;
      }

      (false && Ember.assert('A ' + relationship.internalModel.modelName + ' record was pushed into the store with the value of ' + relationship.key + ' being \'' + inspect(resourceIdentifiers) + '\', but ' + relationship.key + ' is a hasMany relationship so the value must be an array. You should probably check your data payload or serializer.', Array.isArray(resourceIdentifiers)));


      var _internalModels = new Array(resourceIdentifiers.length);
      for (var i = 0; i < resourceIdentifiers.length; i++) {
        _internalModels[i] = this._pushResourceIdentifier(relationship, resourceIdentifiers[i]);
      }
      return _internalModels;
    }
  });

  // Delegation to the adapter and promise management


  function defaultSerializer(store) {
    return store.serializerFor('application');
  }

  function _commit(adapter, store, operation, snapshot) {
    var internalModel = snapshot._internalModel;
    var modelName = snapshot.modelName;
    var modelClass = store._modelFor(modelName);
    (false && Ember.assert('You tried to update a record but you have no adapter (for ' + modelName + ')', adapter));
    (false && Ember.assert('You tried to update a record but your adapter (for ' + modelName + ') does not implement \'' + operation + '\'', typeof adapter[operation] === 'function'));

    var promise = adapter[operation](store, modelClass, snapshot);
    var serializer = (0, _serializers.serializerForAdapter)(store, adapter, modelName);
    var label = 'DS: Extract and notify about ' + operation + ' completion of ' + internalModel;

    (false && Ember.assert('Your adapter\'s \'' + operation + '\' method must return a value, but it returned \'undefined\'', promise !== undefined));


    promise = Promise.resolve(promise, label);
    promise = (0, _common._guard)(promise, (0, _common._bind)(_common._objectIsAlive, store));
    promise = (0, _common._guard)(promise, (0, _common._bind)(_common._objectIsAlive, internalModel));

    return promise.then(function (adapterPayload) {
      /*
        Note to future spelunkers hoping to optimize.
        We rely on this `run` to create a run loop if needed
        that `store._push` and `store.didSaveRecord` will both share.
         We use `join` because it is often the case that we
        have an outer run loop available still from the first
        call to `store._push`;
       */
      store._backburner.join(function () {
        var payload = void 0,
            data = void 0;
        if (adapterPayload) {
          payload = (0, _serializerResponse.normalizeResponseHelper)(serializer, store, modelClass, adapterPayload, snapshot.id, operation);
          if (payload.included) {
            store._push({ data: null, included: payload.included });
          }
          data = payload.data;
        }
        store.didSaveRecord(internalModel, { data: data });
      });

      return internalModel;
    }, function (error) {
      if (error instanceof _errors.InvalidError) {
        var errors = serializer.extractErrors(store, modelClass, error, snapshot.id);

        store.recordWasInvalid(internalModel, errors);
      } else {
        store.recordWasError(internalModel, error);
      }

      throw error;
    }, label);
  }

  function isInverseRelationshipInitialized(store, internalModel, data, key, modelNameToInverseMap) {
    var relationshipData = data.relationships[key].data;

    if (!relationshipData) {
      // can't check inverse for eg { comments: { links: { related: URL }}}
      return false;
    }

    var inverseMap = modelNameToInverseMap[internalModel.modelName];
    if (!inverseMap) {
      inverseMap = modelNameToInverseMap[internalModel.modelName] = get(internalModel.type, 'inverseMap');
    }
    var inverseRelationshipMetadata = inverseMap[key];
    if (inverseRelationshipMetadata === undefined) {
      inverseRelationshipMetadata = internalModel.type.inverseFor(key, store);
    }

    if (!inverseRelationshipMetadata) {
      return false;
    }

    var _inverseRelationshipM = inverseRelationshipMetadata,
        inverseRelationshipName = _inverseRelationshipM.name;


    if (Array.isArray(relationshipData)) {
      for (var i = 0; i < relationshipData.length; ++i) {
        var inverseInternalModel = store._internalModelsFor(relationshipData[i].type).get(relationshipData[i].id);
        if (inverseInternalModel && inverseInternalModel._relationships.has(inverseRelationshipName)) {
          return true;
        }
      }

      return false;
    } else {
      var _inverseInternalModel = store._internalModelsFor(relationshipData.type).get(relationshipData.id);
      return _inverseInternalModel && _inverseInternalModel._relationships.has(inverseRelationshipName);
    }
  }

  function setupRelationships(store, internalModel, data, modelNameToInverseMap) {
    Object.keys(data.relationships).forEach(function (relationshipName) {
      var relationships = internalModel._relationships;
      var relationshipRequiresNotification = relationships.has(relationshipName) || isInverseRelationshipInitialized(store, internalModel, data, relationshipName, modelNameToInverseMap);

      if (relationshipRequiresNotification) {
        var relationshipData = data.relationships[relationshipName];
        relationships.get(relationshipName).push(relationshipData, false);
      }

      // in debug, assert payload validity eagerly
      if (false) {
        var relationshipMeta = get(internalModel.type, 'relationshipsByName').get(relationshipName);
        var _relationshipData = data.relationships[relationshipName];
        if (!_relationshipData || !relationshipMeta) {
          return;
        }

        if (_relationshipData.links) {
          var isAsync = relationshipMeta.options && relationshipMeta.options.async !== false;
          (false && Ember.warn('You pushed a record of type \'' + internalModel.type.modelName + '\' with a relationship \'' + relationshipName + '\' configured as \'async: false\'. You\'ve included a link but no primary data, this may be an error in your payload.', isAsync || _relationshipData.data, {
            id: 'ds.store.push-link-for-sync-relationship'
          }));
        } else if (_relationshipData.data) {
          if (relationshipMeta.kind === 'belongsTo') {
            (false && Ember.assert('A ' + internalModel.type.modelName + ' record was pushed into the store with the value of ' + relationshipName + ' being ' + inspect(_relationshipData.data) + ', but ' + relationshipName + ' is a belongsTo relationship so the value must not be an array. You should probably check your data payload or serializer.', !Array.isArray(_relationshipData.data)));
          } else if (relationshipMeta.kind === 'hasMany') {
            (false && Ember.assert('A ' + internalModel.type.modelName + ' record was pushed into the store with the value of ' + relationshipName + ' being \'' + inspect(_relationshipData.data) + '\', but ' + relationshipName + ' is a hasMany relationship so the value must be an array. You should probably check your data payload or serializer.', Array.isArray(_relationshipData.data)));
          }
        }
      }
    });
  }

  exports.Store = Store;
  exports.default = Store;
});
define('ember-data/-private/system/store/common', ['exports'], function (exports) {
  'use strict';

  exports.__esModule = true;
  exports._bind = _bind;
  exports._guard = _guard;
  exports._objectIsAlive = _objectIsAlive;
  var get = Ember.get;
  function _bind(fn) {
    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    return function () {
      return fn.apply(undefined, args);
    };
  }

  function _guard(promise, test) {
    var guarded = promise['finally'](function () {
      if (!test()) {
        guarded._subscribers.length = 0;
      }
    });

    return guarded;
  }

  function _objectIsAlive(object) {
    return !(get(object, "isDestroyed") || get(object, "isDestroying"));
  }
});
define('ember-data/-private/system/store/container-instance-cache', ['exports'], function (exports) {
  'use strict';

  exports.__esModule = true;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var set = Ember.set;

  var ContainerInstanceCache = function () {
    function ContainerInstanceCache(owner, store) {
      _classCallCheck(this, ContainerInstanceCache);

      this.isDestroying = false;
      this.isDestroyed = false;
      this._owner = owner;
      this._store = store;
      this._namespaces = {
        adapter: Object.create(null),
        serializer: Object.create(null)
      };
    }

    ContainerInstanceCache.prototype.get = function get(namespace, preferredKey) {
      var cache = this._namespaces[namespace];

      if (cache[preferredKey]) {
        return cache[preferredKey];
      }

      var preferredLookupKey = namespace + ':' + preferredKey;

      var instance = this._instanceFor(preferredLookupKey) || this._findInstance(namespace, this._fallbacksFor(namespace, preferredKey));
      if (instance) {
        cache[preferredKey] = instance;
        set(instance, 'store', this._store);
      }

      return cache[preferredKey];
    };

    ContainerInstanceCache.prototype._fallbacksFor = function _fallbacksFor(namespace, preferredKey) {
      if (namespace === 'adapter') {
        return ['application', this._store.get('adapter'), '-json-api'];
      }

      // serializer
      return ['application', this.get('adapter', preferredKey).get('defaultSerializer'), '-default'];
    };

    ContainerInstanceCache.prototype._findInstance = function _findInstance(namespace, fallbacks) {
      var cache = this._namespaces[namespace];

      for (var i = 0, length = fallbacks.length; i < length; i++) {
        var fallback = fallbacks[i];

        if (cache[fallback]) {
          return cache[fallback];
        }

        var lookupKey = namespace + ':' + fallback;
        var instance = this._instanceFor(lookupKey);

        if (instance) {
          cache[fallback] = instance;
          return instance;
        }
      }
    };

    ContainerInstanceCache.prototype._instanceFor = function _instanceFor(key) {
      return this._owner.lookup(key);
    };

    ContainerInstanceCache.prototype.destroyCache = function destroyCache(cache) {
      var cacheEntries = Object.keys(cache);

      for (var i = 0, length = cacheEntries.length; i < length; i++) {
        var cacheKey = cacheEntries[i];
        var cacheEntry = cache[cacheKey];
        if (cacheEntry) {
          cacheEntry.destroy();
        }
      }
    };

    ContainerInstanceCache.prototype.destroy = function destroy() {
      this.isDestroying = true;
      this.destroyCache(this._namespaces.adapter);
      this.destroyCache(this._namespaces.serializer);
      this.isDestroyed = true;
    };

    ContainerInstanceCache.prototype.toString = function toString() {
      return 'ContainerInstanceCache';
    };

    return ContainerInstanceCache;
  }();

  exports.default = ContainerInstanceCache;
});
define('ember-data/-private/system/store/finders', ['exports', 'ember-data/-private/system/store/common', 'ember-data/-private/system/store/serializer-response', 'ember-data/-private/system/store/serializers'], function (exports, _common, _serializerResponse, _serializers) {
  'use strict';

  exports.__esModule = true;
  exports._find = _find;
  exports._findMany = _findMany;
  exports._findHasMany = _findHasMany;
  exports._findBelongsTo = _findBelongsTo;
  exports._findAll = _findAll;
  exports._query = _query;
  exports._queryRecord = _queryRecord;
  var A = Ember.A;
  var Promise = Ember.RSVP.Promise;


  function payloadIsNotBlank(adapterPayload) {
    if (Array.isArray(adapterPayload)) {
      return true;
    } else {
      return Object.keys(adapterPayload || {}).length;
    }
  }

  function _find(adapter, store, modelClass, id, internalModel, options) {
    var snapshot = internalModel.createSnapshot(options);
    var modelName = internalModel.modelName;

    var promise = adapter.findRecord(store, modelClass, id, snapshot);
    var label = 'DS: Handle Adapter#findRecord of \'' + modelName + '\' with id: \'' + id + '\'';

    promise = Promise.resolve(promise, label);
    promise = (0, _common._guard)(promise, (0, _common._bind)(_common._objectIsAlive, store));

    return promise.then(function (adapterPayload) {
      (false && Ember.assert('You made a \'findRecord\' request for a \'' + modelName + '\' with id \'' + id + '\', but the adapter\'s response did not have any data', payloadIsNotBlank(adapterPayload)));

      var serializer = (0, _serializers.serializerForAdapter)(store, adapter, modelName);
      var payload = (0, _serializerResponse.normalizeResponseHelper)(serializer, store, modelClass, adapterPayload, id, 'findRecord');
      (false && Ember.assert('Ember Data expected the primary data returned from a \'findRecord\' response to be an object but instead it found an array.', !Array.isArray(payload.data)));
      (false && Ember.warn('You requested a record of type \'' + modelName + '\' with id \'' + id + '\' but the adapter returned a payload with primary data having an id of \'' + payload.data.id + '\'. Use \'store.findRecord()\' when the requested id is the same as the one returned by the adapter. In other cases use \'store.queryRecord()\' instead https://emberjs.com/api/data/classes/DS.Store.html#method_queryRecord', payload.data.id === id, {
        id: 'ds.store.findRecord.id-mismatch'
      }));


      return store._push(payload);
    }, function (error) {
      internalModel.notFound();
      if (internalModel.isEmpty()) {
        internalModel.unloadRecord();
      }

      throw error;
    }, 'DS: Extract payload of \'' + modelName + '\'');
  }

  function _findMany(adapter, store, modelName, ids, internalModels) {
    var snapshots = A(internalModels).invoke('createSnapshot');
    var modelClass = store.modelFor(modelName); // `adapter.findMany` gets the modelClass still
    var promise = adapter.findMany(store, modelClass, ids, snapshots);
    var label = 'DS: Handle Adapter#findMany of \'' + modelName + '\'';

    if (promise === undefined) {
      throw new Error('adapter.findMany returned undefined, this was very likely a mistake');
    }

    promise = Promise.resolve(promise, label);
    promise = (0, _common._guard)(promise, (0, _common._bind)(_common._objectIsAlive, store));

    return promise.then(function (adapterPayload) {
      (false && Ember.assert('You made a \'findMany\' request for \'' + modelName + '\' records with ids \'[' + ids + ']\', but the adapter\'s response did not have any data', payloadIsNotBlank(adapterPayload)));

      var serializer = (0, _serializers.serializerForAdapter)(store, adapter, modelName);
      var payload = (0, _serializerResponse.normalizeResponseHelper)(serializer, store, modelClass, adapterPayload, null, 'findMany');
      return store._push(payload);
    }, null, 'DS: Extract payload of ' + modelName);
  }

  function _findHasMany(adapter, store, internalModel, link, relationship) {
    var snapshot = internalModel.createSnapshot();
    var modelClass = store.modelFor(relationship.type);
    var promise = adapter.findHasMany(store, snapshot, link, relationship);
    var label = 'DS: Handle Adapter#findHasMany of \'' + internalModel.modelName + '\' : \'' + relationship.type + '\'';

    promise = Promise.resolve(promise, label);
    promise = (0, _common._guard)(promise, (0, _common._bind)(_common._objectIsAlive, store));
    promise = (0, _common._guard)(promise, (0, _common._bind)(_common._objectIsAlive, internalModel));

    return promise.then(function (adapterPayload) {
      (false && Ember.assert('You made a \'findHasMany\' request for a ' + internalModel.modelName + '\'s \'' + relationship.key + '\' relationship, using link \'' + link + '\' , but the adapter\'s response did not have any data', payloadIsNotBlank(adapterPayload)));

      var serializer = (0, _serializers.serializerForAdapter)(store, adapter, relationship.type);
      var payload = (0, _serializerResponse.normalizeResponseHelper)(serializer, store, modelClass, adapterPayload, null, 'findHasMany');
      var internalModelArray = store._push(payload);

      internalModelArray.meta = payload.meta;
      return internalModelArray;
    }, null, 'DS: Extract payload of \'' + internalModel.modelName + '\' : hasMany \'' + relationship.type + '\'');
  }

  function _findBelongsTo(adapter, store, internalModel, link, relationship) {
    var snapshot = internalModel.createSnapshot();
    var modelClass = store.modelFor(relationship.type);
    var promise = adapter.findBelongsTo(store, snapshot, link, relationship);
    var label = 'DS: Handle Adapter#findBelongsTo of ' + internalModel.modelName + ' : ' + relationship.type;

    promise = Promise.resolve(promise, label);
    promise = (0, _common._guard)(promise, (0, _common._bind)(_common._objectIsAlive, store));
    promise = (0, _common._guard)(promise, (0, _common._bind)(_common._objectIsAlive, internalModel));

    return promise.then(function (adapterPayload) {
      var serializer = (0, _serializers.serializerForAdapter)(store, adapter, relationship.type);
      var payload = (0, _serializerResponse.normalizeResponseHelper)(serializer, store, modelClass, adapterPayload, null, 'findBelongsTo');

      if (!payload.data) {
        return null;
      }

      return store._push(payload);
    }, null, 'DS: Extract payload of ' + internalModel.modelName + ' : ' + relationship.type);
  }

  function _findAll(adapter, store, modelName, sinceToken, options) {
    var modelClass = store.modelFor(modelName); // adapter.findAll depends on the class
    var recordArray = store.peekAll(modelName);
    var snapshotArray = recordArray._createSnapshot(options);
    var promise = adapter.findAll(store, modelClass, sinceToken, snapshotArray);
    var label = "DS: Handle Adapter#findAll of " + modelClass;

    promise = Promise.resolve(promise, label);
    promise = (0, _common._guard)(promise, (0, _common._bind)(_common._objectIsAlive, store));

    return promise.then(function (adapterPayload) {
      (false && Ember.assert('You made a \'findAll\' request for \'' + modelName + '\' records, but the adapter\'s response did not have any data', payloadIsNotBlank(adapterPayload)));

      var serializer = (0, _serializers.serializerForAdapter)(store, adapter, modelName);
      var payload = (0, _serializerResponse.normalizeResponseHelper)(serializer, store, modelClass, adapterPayload, null, 'findAll');

      store._push(payload);
      store._didUpdateAll(modelName);

      return recordArray;
    }, null, 'DS: Extract payload of findAll ${modelName}');
  }

  function _query(adapter, store, modelName, query, recordArray) {
    var modelClass = store.modelFor(modelName); // adapter.query needs the class

    var promise = void 0;
    if (adapter.query.length > 3) {
      recordArray = recordArray || store.recordArrayManager.createAdapterPopulatedRecordArray(modelName, query);
      promise = adapter.query(store, modelClass, query, recordArray);
    } else {
      promise = adapter.query(store, modelClass, query);
    }

    var label = 'DS: Handle Adapter#query of ' + modelClass;

    promise = Promise.resolve(promise, label);
    promise = (0, _common._guard)(promise, (0, _common._bind)(_common._objectIsAlive, store));

    return promise.then(function (adapterPayload) {
      var serializer = (0, _serializers.serializerForAdapter)(store, adapter, modelName);

      var payload = (0, _serializerResponse.normalizeResponseHelper)(serializer, store, modelClass, adapterPayload, null, 'query');

      var internalModels = store._push(payload);

      (false && Ember.assert('The response to store.query is expected to be an array but it was a single record. Please wrap your response in an array or use `store.queryRecord` to query for a single record.', Array.isArray(internalModels)));

      if (recordArray) {
        recordArray._setInternalModels(internalModels, payload);
      } else {
        recordArray = store.recordArrayManager.createAdapterPopulatedRecordArray(modelName, query, internalModels, payload);
      }

      return recordArray;
    }, null, 'DS: Extract payload of query ' + modelName);
  }

  function _queryRecord(adapter, store, modelName, query) {
    var modelClass = store.modelFor(modelName); // adapter.queryRecord needs the class
    var promise = adapter.queryRecord(store, modelClass, query);
    var label = 'DS: Handle Adapter#queryRecord of ' + modelName;

    promise = Promise.resolve(promise, label);
    promise = (0, _common._guard)(promise, (0, _common._bind)(_common._objectIsAlive, store));

    return promise.then(function (adapterPayload) {
      var serializer = (0, _serializers.serializerForAdapter)(store, adapter, modelName);
      var payload = (0, _serializerResponse.normalizeResponseHelper)(serializer, store, modelClass, adapterPayload, null, 'queryRecord');

      (false && Ember.assert('Expected the primary data returned by the serializer for a \'queryRecord\' response to be a single object or null but instead it was an array.', !Array.isArray(payload.data), {
        id: 'ds.store.queryRecord-array-response'
      }));


      return store._push(payload);
    }, null, 'DS: Extract payload of queryRecord ' + modelName);
  }
});
define('ember-data/-private/system/store/serializer-response', ['exports'], function (exports) {
  'use strict';

  exports.__esModule = true;
  exports.validateDocumentStructure = validateDocumentStructure;
  exports.normalizeResponseHelper = normalizeResponseHelper;
  var isEmpty = Ember.isEmpty;


  /*
    This is a helper method that validates a JSON API top-level document
  
    The format of a document is described here:
    http://jsonapi.org/format/#document-top-level
  
    @method validateDocumentStructure
    @param {Object} doc JSON API document
    @return {array} An array of errors found in the document structure
  */
  function validateDocumentStructure(doc) {
    var errors = [];
    if (!doc || typeof doc !== 'object') {
      errors.push('Top level of a JSON API document must be an object');
    } else {
      if (!('data' in doc) && !('errors' in doc) && !('meta' in doc)) {
        errors.push('One or more of the following keys must be present: "data", "errors", "meta".');
      } else {
        if ('data' in doc && 'errors' in doc) {
          errors.push('Top level keys "errors" and "data" cannot both be present in a JSON API document');
        }
      }
      if ('data' in doc) {
        if (!(doc.data === null || Array.isArray(doc.data) || typeof doc.data === 'object')) {
          errors.push('data must be null, an object, or an array');
        }
      }
      if ('meta' in doc) {
        if (typeof doc.meta !== 'object') {
          errors.push('meta must be an object');
        }
      }
      if ('errors' in doc) {
        if (!Array.isArray(doc.errors)) {
          errors.push('errors must be an array');
        }
      }
      if ('links' in doc) {
        if (typeof doc.links !== 'object') {
          errors.push('links must be an object');
        }
      }
      if ('jsonapi' in doc) {
        if (typeof doc.jsonapi !== 'object') {
          errors.push('jsonapi must be an object');
        }
      }
      if ('included' in doc) {
        if (typeof doc.included !== 'object') {
          errors.push('included must be an array');
        }
      }
    }

    return errors;
  }

  /*
    This is a helper method that always returns a JSON-API Document.
  
    @method normalizeResponseHelper
    @param {DS.Serializer} serializer
    @param {DS.Store} store
    @param {subclass of DS.Model} modelClass
    @param {Object} payload
    @param {String|Number} id
    @param {String} requestType
    @return {Object} JSON-API Document
  */
  function normalizeResponseHelper(serializer, store, modelClass, payload, id, requestType) {
    var normalizedResponse = serializer.normalizeResponse(store, modelClass, payload, id, requestType);
    var validationErrors = [];
    if (false) {
      validationErrors = validateDocumentStructure(normalizedResponse);
    }
    (false && Ember.assert('normalizeResponse must return a valid JSON API document:\n\t* ' + validationErrors.join('\n\t* '), isEmpty(validationErrors)));


    return normalizedResponse;
  }
});
define("ember-data/-private/system/store/serializers", ["exports"], function (exports) {
  "use strict";

  exports.__esModule = true;
  exports.serializerForAdapter = serializerForAdapter;
  function serializerForAdapter(store, adapter, modelName) {
    var serializer = adapter.serializer;

    if (serializer === undefined) {
      serializer = store.serializerFor(modelName);
    }

    if (serializer === null || serializer === undefined) {
      serializer = {
        extract: function (store, type, payload) {
          return payload;
        }
      };
    }

    return serializer;
  }
});
define('ember-data/-private/utils', ['exports'], function (exports) {
  'use strict';

  exports.__esModule = true;
  var emberGetOwner = Ember.getOwner;
  var get = Ember.get;


  /*
    Check if the passed model has a `type` attribute or a relationship named `type`.
  
    @method modelHasAttributeOrRelationshipNamedType
    @param modelClass
   */
  function modelHasAttributeOrRelationshipNamedType(modelClass) {
    return get(modelClass, 'attributes').has('type') || get(modelClass, 'relationshipsByName').has('type');
  }

  /*
    ember-container-inject-owner is a new feature in Ember 2.3 that finally provides a public
    API for looking items up.  This function serves as a super simple polyfill to avoid
    triggering deprecations.
   */
  function getOwner(context) {
    var owner = void 0;

    if (emberGetOwner) {
      owner = emberGetOwner(context);
    } else if (context.container) {
      owner = context.container;
    }

    if (owner && owner.lookupFactory && !owner._lookupFactory) {
      // `owner` is a container, we are just making this work
      owner._lookupFactory = function () {
        var _owner;

        return (_owner = owner).lookupFactory.apply(_owner, arguments);
      };

      owner.register = function () {
        var registry = owner.registry || owner._registry || owner;

        return registry.register.apply(registry, arguments);
      };
    }

    return owner;
  }

  exports.modelHasAttributeOrRelationshipNamedType = modelHasAttributeOrRelationshipNamedType;
  exports.getOwner = getOwner;
});
define('ember-data/-private/utils/parse-response-headers', ['exports'], function (exports) {
  'use strict';

  exports.__esModule = true;
  exports.default = parseResponseHeaders;
  var CLRF = '\u000d\u000a';

  function parseResponseHeaders(headersString) {
    var headers = Object.create(null);

    if (!headersString) {
      return headers;
    }

    var headerPairs = headersString.split(CLRF);
    for (var i = 0; i < headerPairs.length; i++) {
      var header = headerPairs[i];
      var j = 0;
      var foundSep = false;

      for (; j < header.length; j++) {
        if (header.charCodeAt(j) === 58 /* ':' */) {
            foundSep = true;
            break;
          }
      }

      if (foundSep === false) {
        continue;
      }

      var field = header.substring(0, j).trim();
      var value = header.substring(j + 1, header.length).trim();

      if (value) {
        headers[field] = value;
      }
    }

    return headers;
  }
});
define('ember-data/adapter', ['exports'], function (exports) {
  'use strict';

  exports.__esModule = true;
  var EmberObject = Ember.Object;
  exports.default = EmberObject.extend({

    /**
      If you would like your adapter to use a custom serializer you can
      set the `defaultSerializer` property to be the name of the custom
      serializer.
       Note the `defaultSerializer` serializer has a lower priority than
      a model specific serializer (i.e. `PostSerializer`) or the
      `application` serializer.
       ```app/adapters/django.js
      import DS from 'ember-data';
       export default DS.Adapter.extend({
        defaultSerializer: 'django'
      });
      ```
       @property defaultSerializer
      @type {String}
    */
    defaultSerializer: '-default',

    /**
      The `findRecord()` method is invoked when the store is asked for a record that
      has not previously been loaded. In response to `findRecord()` being called, you
      should query your persistence layer for a record with the given ID. The `findRecord`
      method should return a promise that will resolve to a JavaScript object that will be
      normalized by the serializer.
       Here is an example `findRecord` implementation:
       ```app/adapters/application.js
      import DS from 'ember-data';
      import RSVP from 'RSVP';
      import $ from 'jquery';
       export default DS.Adapter.extend({
        findRecord(store, type, id, snapshot) {
          return new RSVP.Promise(function(resolve, reject) {
            $.getJSON(`/${type.modelName}/${id}`).then(function(data) {
              resolve(data);
            }, function(jqXHR) {
              reject(jqXHR);
            });
          });
        }
      });
      ```
       @method findRecord
      @param {DS.Store} store
      @param {DS.Model} type
      @param {String} id
      @param {DS.Snapshot} snapshot
      @return {Promise} promise
    */
    findRecord: null,

    /**
      The `findAll()` method is used to retrieve all records for a given type.
       Example
       ```app/adapters/application.js
      import DS from 'ember-data';
      import RSVP from 'RSVP';
      import $ from 'jquery';
       export default DS.Adapter.extend({
        findAll(store, type, sinceToken) {
          let query = { since: sinceToken };
           return new RSVP.Promise(function(resolve, reject) {
            $.getJSON(`/${type.modelName}`, query).then(function(data) {
              resolve(data);
            }, function(jqXHR) {
              reject(jqXHR);
            });
          });
        }
      });
      ```
       @method findAll
      @param {DS.Store} store
      @param {DS.Model} type
      @param {String} sinceToken
      @param {DS.SnapshotRecordArray} snapshotRecordArray
      @return {Promise} promise
    */
    findAll: null,

    /**
      This method is called when you call `query` on the store.
       Example
       ```app/adapters/application.js
      import DS from 'ember-data';
      import RSVP from 'RSVP';
      import $ from 'jquery';
       export default DS.Adapter.extend({
        query(store, type, query) {
          return new RSVP.Promise(function(resolve, reject) {
            $.getJSON(`/${type.modelName}`, query).then(function(data) {
              resolve(data);
            }, function(jqXHR) {
              reject(jqXHR);
            });
          });
        }
      });
      ```
       @method query
      @param {DS.Store} store
      @param {DS.Model} type
      @param {Object} query
      @param {DS.AdapterPopulatedRecordArray} recordArray
      @return {Promise} promise
    */
    query: null,

    /**
      The `queryRecord()` method is invoked when the store is asked for a single
      record through a query object.
       In response to `queryRecord()` being called, you should always fetch fresh
      data. Once found, you can asynchronously call the store's `push()` method
      to push the record into the store.
       Here is an example `queryRecord` implementation:
       Example
       ```app/adapters/application.js
      import DS from 'ember-data';
      import RSVP from 'RSVP';
      import $ from 'jquery';
       export default DS.Adapter.extend(DS.BuildURLMixin, {
        queryRecord(store, type, query) {
          return new RSVP.Promise(function(resolve, reject) {
            $.getJSON(`/${type.modelName}`, query).then(function(data) {
              resolve(data);
            }, function(jqXHR) {
              reject(jqXHR);
            });
          });
        }
      });
      ```
       @method queryRecord
      @param {DS.Store} store
      @param {subclass of DS.Model} type
      @param {Object} query
      @return {Promise} promise
    */
    queryRecord: null,

    /**
      If the globally unique IDs for your records should be generated on the client,
      implement the `generateIdForRecord()` method. This method will be invoked
      each time you create a new record, and the value returned from it will be
      assigned to the record's `primaryKey`.
       Most traditional REST-like HTTP APIs will not use this method. Instead, the ID
      of the record will be set by the server, and your adapter will update the store
      with the new ID when it calls `didCreateRecord()`. Only implement this method if
      you intend to generate record IDs on the client-side.
       The `generateIdForRecord()` method will be invoked with the requesting store as
      the first parameter and the newly created record as the second parameter:
       ```javascript
      import DS from 'ember-data';
      import { v4 } from 'uuid';
       export default DS.Adapter.extend({
        generateIdForRecord(store, inputProperties) {
          return v4();
        }
      });
      ```
       @method generateIdForRecord
      @param {DS.Store} store
      @param {DS.Model} type   the DS.Model class of the record
      @param {Object} inputProperties a hash of properties to set on the
        newly created record.
      @return {(String|Number)} id
    */
    generateIdForRecord: null,

    /**
      Proxies to the serializer's `serialize` method.
       Example
       ```app/adapters/application.js
      import DS from 'ember-data';
       export default DS.Adapter.extend({
        createRecord(store, type, snapshot) {
          let data = this.serialize(snapshot, { includeId: true });
          let url = `/${type.modelName}`;
           // ...
        }
      });
      ```
       @method serialize
      @param {DS.Snapshot} snapshot
      @param {Object}   options
      @return {Object} serialized snapshot
    */
    serialize: function (snapshot, options) {
      return snapshot.serialize(options);
    },


    /**
      Implement this method in a subclass to handle the creation of
      new records.
       Serializes the record and sends it to the server.
       Example
       ```app/adapters/application.js
      import DS from 'ember-data';
      import { run } from '@ember/runloop';
      import RSVP from 'RSVP';
      import $ from 'jquery';
       export default DS.Adapter.extend({
        createRecord(store, type, snapshot) {
          let data = this.serialize(snapshot, { includeId: true });
           return new RSVP.Promise(function(resolve, reject) {
            $.ajax({
              type: 'POST',
              url: `/${type.modelName}`,
              dataType: 'json',
              data: data
            }).then(function(data) {
              run(null, resolve, data);
            }, function(jqXHR) {
              jqXHR.then = null; // tame jQuery's ill mannered promises
              run(null, reject, jqXHR);
            });
          });
        }
      });
      ```
       @method createRecord
      @param {DS.Store} store
      @param {DS.Model} type   the DS.Model class of the record
      @param {DS.Snapshot} snapshot
      @return {Promise} promise
    */
    createRecord: null,

    /**
      Implement this method in a subclass to handle the updating of
      a record.
       Serializes the record update and sends it to the server.
       The updateRecord method is expected to return a promise that will
      resolve with the serialized record. This allows the backend to
      inform the Ember Data store the current state of this record after
      the update. If it is not possible to return a serialized record
      the updateRecord promise can also resolve with `undefined` and the
      Ember Data store will assume all of the updates were successfully
      applied on the backend.
       Example
       ```app/adapters/application.js
      import DS from 'ember-data';
      import { run } from '@ember/runloop';
      import RSVP from 'RSVP';
      import $ from 'jquery';
       export default DS.Adapter.extend({
        updateRecord(store, type, snapshot) {
          let data = this.serialize(snapshot, { includeId: true });
          let id = snapshot.id;
           return new RSVP.Promise(function(resolve, reject) {
            $.ajax({
              type: 'PUT',
              url: `/${type.modelName}/${id}`,
              dataType: 'json',
              data: data
            }).then(function(data) {
              run(null, resolve, data);
            }, function(jqXHR) {
              jqXHR.then = null; // tame jQuery's ill mannered promises
              run(null, reject, jqXHR);
            });
          });
        }
      });
      ```
       @method updateRecord
      @param {DS.Store} store
      @param {DS.Model} type   the DS.Model class of the record
      @param {DS.Snapshot} snapshot
      @return {Promise} promise
    */
    updateRecord: null,

    /**
      Implement this method in a subclass to handle the deletion of
      a record.
       Sends a delete request for the record to the server.
       Example
       ```app/adapters/application.js
      import DS from 'ember-data';
      import { run } from '@ember/runloop';
      import RSVP from 'RSVP';
      import $ from 'jquery';
       export default DS.Adapter.extend({
        deleteRecord(store, type, snapshot) {
          let data = this.serialize(snapshot, { includeId: true });
          let id = snapshot.id;
           return new RSVP.Promise(function(resolve, reject) {
            $.ajax({
              type: 'DELETE',
              url: `/${type.modelName}/${id}`,
              dataType: 'json',
              data: data
            }).then(function(data) {
              run(null, resolve, data);
            }, function(jqXHR) {
              jqXHR.then = null; // tame jQuery's ill mannered promises
              run(null, reject, jqXHR);
            });
          });
        }
      });
      ```
       @method deleteRecord
      @param {DS.Store} store
      @param {DS.Model} type   the DS.Model class of the record
      @param {DS.Snapshot} snapshot
      @return {Promise} promise
    */
    deleteRecord: null,

    /**
      By default the store will try to coalesce all `fetchRecord` calls within the same runloop
      into as few requests as possible by calling groupRecordsForFindMany and passing it into a findMany call.
      You can opt out of this behaviour by either not implementing the findMany hook or by setting
      coalesceFindRequests to false.
       @property coalesceFindRequests
      @type {boolean}
    */
    coalesceFindRequests: true,

    /**
      The store will call `findMany` instead of multiple `findRecord`
      requests to find multiple records at once if coalesceFindRequests
      is true.
       ```app/adapters/application.js
      import DS from 'ember-data';
      import { run } from '@ember/runloop';
      import RSVP from 'RSVP';
      import $ from 'jquery';
       export default DS.Adapter.extend({
        findMany(store, type, ids, snapshots) {
          return new RSVP.Promise(function(resolve, reject) {
            $.ajax({
              type: 'GET',
              url: `/${type.modelName}/`,
              dataType: 'json',
              data: { filter: { id: ids.join(',') } }
            }).then(function(data) {
              run(null, resolve, data);
            }, function(jqXHR) {
              jqXHR.then = null; // tame jQuery's ill mannered promises
              run(null, reject, jqXHR);
            });
          });
        }
      });
      ```
       @method findMany
      @param {DS.Store} store
      @param {DS.Model} type   the DS.Model class of the records
      @param {Array}    ids
      @param {Array} snapshots
      @return {Promise} promise
    */
    findMany: null,

    /**
      Organize records into groups, each of which is to be passed to separate
      calls to `findMany`.
       For example, if your api has nested URLs that depend on the parent, you will
      want to group records by their parent.
       The default implementation returns the records as a single group.
       @method groupRecordsForFindMany
      @param {DS.Store} store
      @param {Array} snapshots
      @return {Array}  an array of arrays of records, each of which is to be
                        loaded separately by `findMany`.
    */
    groupRecordsForFindMany: function (store, snapshots) {
      return [snapshots];
    },


    /**
      This method is used by the store to determine if the store should
      reload a record from the adapter when a record is requested by
      `store.findRecord`.
       If this method returns `true`, the store will re-fetch a record from
      the adapter. If this method returns `false`, the store will resolve
      immediately using the cached record.
       For example, if you are building an events ticketing system, in which users
      can only reserve tickets for 20 minutes at a time, and want to ensure that
      in each route you have data that is no more than 20 minutes old you could
      write:
       ```javascript
      shouldReloadRecord(store, ticketSnapshot) {
        let lastAccessedAt = ticketSnapshot.attr('lastAccessedAt');
        let timeDiff = moment().diff(lastAccessedAt, 'minutes');
         if (timeDiff > 20) {
          return true;
        } else {
          return false;
        }
      }
      ```
       This method would ensure that whenever you do `store.findRecord('ticket',
      id)` you will always get a ticket that is no more than 20 minutes old. In
      case the cached version is more than 20 minutes old, `findRecord` will not
      resolve until you fetched the latest version.
       By default this hook returns `false`, as most UIs should not block user
      interactions while waiting on data update.
       Note that, with default settings, `shouldBackgroundReloadRecord` will always
      re-fetch the records in the background even if `shouldReloadRecord` returns
      `false`. You can override `shouldBackgroundReloadRecord` if this does not
      suit your use case.
       @since 1.13.0
      @method shouldReloadRecord
      @param {DS.Store} store
      @param {DS.Snapshot} snapshot
      @return {Boolean}
    */
    shouldReloadRecord: function (store, snapshot) {
      return false;
    },


    /**
      This method is used by the store to determine if the store should
      reload all records from the adapter when records are requested by
      `store.findAll`.
       If this method returns `true`, the store will re-fetch all records from
      the adapter. If this method returns `false`, the store will resolve
      immediately using the cached records.
       For example, if you are building an events ticketing system, in which users
      can only reserve tickets for 20 minutes at a time, and want to ensure that
      in each route you have data that is no more than 20 minutes old you could
      write:
       ```javascript
      shouldReloadAll(store, snapshotArray) {
        let snapshots = snapshotArray.snapshots();
         return snapshots.any((ticketSnapshot) => {
          let lastAccessedAt = ticketSnapshot.attr('lastAccessedAt');
          let timeDiff = moment().diff(lastAccessedAt, 'minutes');
           if (timeDiff > 20) {
            return true;
          } else {
            return false;
          }
        });
      }
      ```
       This method would ensure that whenever you do `store.findAll('ticket')` you
      will always get a list of tickets that are no more than 20 minutes old. In
      case a cached version is more than 20 minutes old, `findAll` will not
      resolve until you fetched the latest versions.
       By default this methods returns `true` if the passed `snapshotRecordArray`
      is empty (meaning that there are no records locally available yet),
      otherwise it returns `false`.
       Note that, with default settings, `shouldBackgroundReloadAll` will always
      re-fetch all the records in the background even if `shouldReloadAll` returns
      `false`. You can override `shouldBackgroundReloadAll` if this does not suit
      your use case.
       @since 1.13.0
      @method shouldReloadAll
      @param {DS.Store} store
      @param {DS.SnapshotRecordArray} snapshotRecordArray
      @return {Boolean}
    */
    shouldReloadAll: function (store, snapshotRecordArray) {
      return !snapshotRecordArray.length;
    },


    /**
      This method is used by the store to determine if the store should
      reload a record after the `store.findRecord` method resolves a
      cached record.
       This method is *only* checked by the store when the store is
      returning a cached record.
       If this method returns `true` the store will re-fetch a record from
      the adapter.
       For example, if you do not want to fetch complex data over a mobile
      connection, or if the network is down, you can implement
      `shouldBackgroundReloadRecord` as follows:
       ```javascript
      shouldBackgroundReloadRecord(store, snapshot) {
        let connection = window.navigator.connection;
         if (connection === 'cellular' || connection === 'none') {
          return false;
        } else {
          return true;
        }
      }
      ```
       By default this hook returns `true` so the data for the record is updated
      in the background.
       @since 1.13.0
      @method shouldBackgroundReloadRecord
      @param {DS.Store} store
      @param {DS.Snapshot} snapshot
      @return {Boolean}
    */
    shouldBackgroundReloadRecord: function (store, snapshot) {
      return true;
    },


    /**
      This method is used by the store to determine if the store should
      reload a record array after the `store.findAll` method resolves
      with a cached record array.
       This method is *only* checked by the store when the store is
      returning a cached record array.
       If this method returns `true` the store will re-fetch all records
      from the adapter.
       For example, if you do not want to fetch complex data over a mobile
      connection, or if the network is down, you can implement
      `shouldBackgroundReloadAll` as follows:
       ```javascript
      shouldBackgroundReloadAll(store, snapshotArray) {
        let connection = window.navigator.connection;
         if (connection === 'cellular' || connection === 'none') {
          return false;
        } else {
          return true;
        }
      }
      ```
       By default this method returns `true`, indicating that a background reload
      should always be triggered.
       @since 1.13.0
      @method shouldBackgroundReloadAll
      @param {DS.Store} store
      @param {DS.SnapshotRecordArray} snapshotRecordArray
      @return {Boolean}
    */
    shouldBackgroundReloadAll: function (store, snapshotRecordArray) {
      return true;
    }
  });
});
define('ember-data/adapters/errors', ['exports', 'ember-data/-private'], function (exports, _private) {
  'use strict';

  exports.__esModule = true;
  Object.defineProperty(exports, 'AdapterError', {
    enumerable: true,
    get: function () {
      return _private.AdapterError;
    }
  });
  Object.defineProperty(exports, 'InvalidError', {
    enumerable: true,
    get: function () {
      return _private.InvalidError;
    }
  });
  Object.defineProperty(exports, 'UnauthorizedError', {
    enumerable: true,
    get: function () {
      return _private.UnauthorizedError;
    }
  });
  Object.defineProperty(exports, 'ForbiddenError', {
    enumerable: true,
    get: function () {
      return _private.ForbiddenError;
    }
  });
  Object.defineProperty(exports, 'NotFoundError', {
    enumerable: true,
    get: function () {
      return _private.NotFoundError;
    }
  });
  Object.defineProperty(exports, 'ConflictError', {
    enumerable: true,
    get: function () {
      return _private.ConflictError;
    }
  });
  Object.defineProperty(exports, 'ServerError', {
    enumerable: true,
    get: function () {
      return _private.ServerError;
    }
  });
  Object.defineProperty(exports, 'TimeoutError', {
    enumerable: true,
    get: function () {
      return _private.TimeoutError;
    }
  });
  Object.defineProperty(exports, 'AbortError', {
    enumerable: true,
    get: function () {
      return _private.AbortError;
    }
  });
  Object.defineProperty(exports, 'errorsHashToArray', {
    enumerable: true,
    get: function () {
      return _private.errorsHashToArray;
    }
  });
  Object.defineProperty(exports, 'errorsArrayToHash', {
    enumerable: true,
    get: function () {
      return _private.errorsArrayToHash;
    }
  });
});
define('ember-data/adapters/json-api', ['exports', 'ember-data/adapters/rest', 'ember-data/-private', 'ember-inflector'], function (exports, _rest, _private, _emberInflector) {
  'use strict';

  exports.__esModule = true;
  var dasherize = Ember.String.dasherize;
  var $ = Ember.$;


  /**
    The `JSONAPIAdapter` is the default adapter used by Ember Data. It
    is responsible for transforming the store's requests into HTTP
    requests that follow the [JSON API](http://jsonapi.org/format/)
    format.
  
    ## JSON API Conventions
  
    The JSONAPIAdapter uses JSON API conventions for building the url
    for a record and selecting the HTTP verb to use with a request. The
    actions you can take on a record map onto the following URLs in the
    JSON API adapter:
  
  <table>
    <tr>
      <th>
        Action
      </th>
      <th>
        HTTP Verb
      </th>
      <th>
        URL
      </th>
    </tr>
    <tr>
      <th>
        `store.findRecord('post', 123)`
      </th>
      <td>
        GET
      </td>
      <td>
        /posts/123
      </td>
    </tr>
    <tr>
      <th>
        `store.findAll('post')`
      </th>
      <td>
        GET
      </td>
      <td>
        /posts
      </td>
    </tr>
    <tr>
      <th>
        Update `postRecord.save()`
      </th>
      <td>
        PATCH
      </td>
      <td>
        /posts/123
      </td>
    </tr>
    <tr>
      <th>
        Create `store.createRecord('post').save()`
      </th>
      <td>
        POST
      </td>
      <td>
        /posts
      </td>
    </tr>
    <tr>
      <th>
        Delete `postRecord.destroyRecord()`
      </th>
      <td>
        DELETE
      </td>
      <td>
        /posts/123
      </td>
    </tr>
  </table>
  
    ## Success and failure
  
    The JSONAPIAdapter will consider a success any response with a
    status code of the 2xx family ("Success"), as well as 304 ("Not
    Modified"). Any other status code will be considered a failure.
  
    On success, the request promise will be resolved with the full
    response payload.
  
    Failed responses with status code 422 ("Unprocessable Entity") will
    be considered "invalid". The response will be discarded, except for
    the `errors` key. The request promise will be rejected with a
    `DS.InvalidError`. This error object will encapsulate the saved
    `errors` value.
  
    Any other status codes will be treated as an adapter error. The
    request promise will be rejected, similarly to the invalid case,
    but with an instance of `DS.AdapterError` instead.
  
    ### Endpoint path customization
  
    Endpoint paths can be prefixed with a `namespace` by setting the
    namespace property on the adapter:
  
    ```app/adapters/application.js
    import DS from 'ember-data';
  
    export default DS.JSONAPIAdapter.extend({
      namespace: 'api/1'
    });
    ```
    Requests for the `person` model would now target `/api/1/people/1`.
  
    ### Host customization
  
    An adapter can target other hosts by setting the `host` property.
  
    ```app/adapters/application.js
    import DS from 'ember-data';
  
    export default DS.JSONAPIAdapter.extend({
      host: 'https://api.example.com'
    });
    ```
  
    Requests for the `person` model would now target
    `https://api.example.com/people/1`.
  
    @since 1.13.0
    @class JSONAPIAdapter
    @constructor
    @namespace DS
    @extends DS.RESTAdapter
  */
  var JSONAPIAdapter = _rest.default.extend({
    defaultSerializer: '-json-api',

    ajaxOptions: function (url, type, options) {
      var hash = this._super.apply(this, arguments);

      if (hash.contentType) {
        hash.contentType = 'application/vnd.api+json';
      }

      var beforeSend = hash.beforeSend;
      hash.beforeSend = function (xhr) {
        xhr.setRequestHeader('Accept', 'application/vnd.api+json');
        if (beforeSend) {
          beforeSend(xhr);
        }
      };

      return hash;
    },


    /**
      By default the JSONAPIAdapter will send each find request coming from a `store.find`
      or from accessing a relationship separately to the server. If your server supports passing
      ids as a query string, you can set coalesceFindRequests to true to coalesce all find requests
      within a single runloop.
       For example, if you have an initial payload of:
       ```javascript
      {
        data: {
          id: 1,
          type: 'post',
          relationship: {
            comments: {
              data: [
                { id: 1, type: 'comment' },
                { id: 2, type: 'comment' }
              ]
            }
          }
        }
      }
      ```
       By default calling `post.get('comments')` will trigger the following requests(assuming the
      comments haven't been loaded before):
       ```
      GET /comments/1
      GET /comments/2
      ```
       If you set coalesceFindRequests to `true` it will instead trigger the following request:
       ```
      GET /comments?filter[id]=1,2
      ```
       Setting coalesceFindRequests to `true` also works for `store.find` requests and `belongsTo`
      relationships accessed within the same runloop. If you set `coalesceFindRequests: true`
       ```javascript
      store.findRecord('comment', 1);
      store.findRecord('comment', 2);
      ```
       will also send a request to: `GET /comments?filter[id]=1,2`
       Note: Requests coalescing rely on URL building strategy. So if you override `buildURL` in your app
      `groupRecordsForFindMany` more likely should be overridden as well in order for coalescing to work.
       @property coalesceFindRequests
      @type {boolean}
    */
    coalesceFindRequests: false,

    findMany: function (store, type, ids, snapshots) {
      if ((0, _private.isEnabled)('ds-improved-ajax') && !this._hasCustomizedAjax()) {
        return this._super.apply(this, arguments);
      } else {
        var url = this.buildURL(type.modelName, ids, snapshots, 'findMany');
        return this.ajax(url, 'GET', { data: { filter: { id: ids.join(',') } } });
      }
    },
    pathForType: function (modelName) {
      var dasherized = dasherize(modelName);
      return (0, _emberInflector.pluralize)(dasherized);
    },
    updateRecord: function (store, type, snapshot) {
      if ((0, _private.isEnabled)('ds-improved-ajax') && !this._hasCustomizedAjax()) {
        return this._super.apply(this, arguments);
      } else {
        var data = {};
        var serializer = store.serializerFor(type.modelName);

        serializer.serializeIntoHash(data, type, snapshot, { includeId: true });

        var url = this.buildURL(type.modelName, snapshot.id, snapshot, 'updateRecord');

        return this.ajax(url, 'PATCH', { data: data });
      }
    },
    _hasCustomizedAjax: function () {
      if (this.ajax !== JSONAPIAdapter.prototype.ajax) {
        (false && !(false) && Ember.deprecate('JSONAPIAdapter#ajax has been deprecated please use. `methodForRequest`, `urlForRequest`, `headersForRequest` or `dataForRequest` instead.', false, {
          id: 'ds.json-api-adapter.ajax',
          until: '3.0.0'
        }));

        return true;
      }

      if (this.ajaxOptions !== JSONAPIAdapter.prototype.ajaxOptions) {
        (false && !(false) && Ember.deprecate('JSONAPIAdapterr#ajaxOptions has been deprecated please use. `methodForRequest`, `urlForRequest`, `headersForRequest` or `dataForRequest` instead.', false, {
          id: 'ds.json-api-adapter.ajax-options',
          until: '3.0.0'
        }));

        return true;
      }

      return false;
    }
  });

  if ((0, _private.isEnabled)('ds-improved-ajax')) {

    JSONAPIAdapter.reopen({
      methodForRequest: function (params) {
        if (params.requestType === 'updateRecord') {
          return 'PATCH';
        }

        return this._super.apply(this, arguments);
      },
      dataForRequest: function (params) {
        var requestType = params.requestType,
            ids = params.ids;


        if (requestType === 'findMany') {
          return {
            filter: { id: ids.join(',') }
          };
        }

        if (requestType === 'updateRecord') {
          var store = params.store,
              type = params.type,
              snapshot = params.snapshot;

          var data = {};
          var serializer = store.serializerFor(type.modelName);

          serializer.serializeIntoHash(data, type, snapshot, { includeId: true });

          return data;
        }

        return this._super.apply(this, arguments);
      },
      headersForRequest: function () {
        var headers = this._super.apply(this, arguments) || {};

        headers['Accept'] = 'application/vnd.api+json';

        return headers;
      },
      _requestToJQueryAjaxHash: function () {
        var hash = this._super.apply(this, arguments);

        if (hash.contentType) {
          hash.contentType = 'application/vnd.api+json';
        }

        return hash;
      }
    });
  }

  exports.default = JSONAPIAdapter;
});
define('ember-data/adapters/rest', ['exports', 'ember-data/adapter', 'ember-data/-private'], function (exports, _adapter, _private) {
  'use strict';

  exports.__esModule = true;
  var $ = Ember.$;
  var EmberPromise = Ember.RSVP.Promise;
  var MapWithDefault = Ember.MapWithDefault;
  var get = Ember.get;
  var run = Ember.run;


  var Promise = EmberPromise;

  /**
    The REST adapter allows your store to communicate with an HTTP server by
    transmitting JSON via XHR. Most Ember.js apps that consume a JSON API
    should use the REST adapter.
  
    This adapter is designed around the idea that the JSON exchanged with
    the server should be conventional.
  
    ## Success and failure
  
    The REST adapter will consider a success any response with a status code
    of the 2xx family ("Success"), as well as 304 ("Not Modified"). Any other
    status code will be considered a failure.
  
    On success, the request promise will be resolved with the full response
    payload.
  
    Failed responses with status code 422 ("Unprocessable Entity") will be
    considered "invalid". The response will be discarded, except for the
    `errors` key. The request promise will be rejected with a `DS.InvalidError`.
    This error object will encapsulate the saved `errors` value.
  
    Any other status codes will be treated as an "adapter error". The request
    promise will be rejected, similarly to the "invalid" case, but with
    an instance of `DS.AdapterError` instead.
  
    ## JSON Structure
  
    The REST adapter expects the JSON returned from your server to follow
    these conventions.
  
    ### Object Root
  
    The JSON payload should be an object that contains the record inside a
    root property. For example, in response to a `GET` request for
    `/posts/1`, the JSON should look like this:
  
    ```js
    {
      "posts": {
        "id": 1,
        "title": "I'm Running to Reform the W3C's Tag",
        "author": "Yehuda Katz"
      }
    }
    ```
  
    Similarly, in response to a `GET` request for `/posts`, the JSON should
    look like this:
  
    ```js
    {
      "posts": [
        {
          "id": 1,
          "title": "I'm Running to Reform the W3C's Tag",
          "author": "Yehuda Katz"
        },
        {
          "id": 2,
          "title": "Rails is omakase",
          "author": "D2H"
        }
      ]
    }
    ```
  
    Note that the object root can be pluralized for both a single-object response
    and an array response: the REST adapter is not strict on this. Further, if the
    HTTP server responds to a `GET` request to `/posts/1` (e.g. the response to a
    `findRecord` query) with more than one object in the array, Ember Data will
    only display the object with the matching ID.
  
    ### Conventional Names
  
    Attribute names in your JSON payload should be the camelCased versions of
    the attributes in your Ember.js models.
  
    For example, if you have a `Person` model:
  
    ```app/models/person.js
    import DS from 'ember-data';
  
    export default DS.Model.extend({
      firstName: DS.attr('string'),
      lastName: DS.attr('string'),
      occupation: DS.attr('string')
    });
    ```
  
    The JSON returned should look like this:
  
    ```js
    {
      "people": {
        "id": 5,
        "firstName": "Zaphod",
        "lastName": "Beeblebrox",
        "occupation": "President"
      }
    }
    ```
  
    #### Relationships
  
    Relationships are usually represented by ids to the record in the
    relationship. The related records can then be sideloaded in the
    response under a key for the type.
  
    ```js
    {
      "posts": {
        "id": 5,
        "title": "I'm Running to Reform the W3C's Tag",
        "author": "Yehuda Katz",
        "comments": [1, 2]
      },
      "comments": [{
        "id": 1,
        "author": "User 1",
        "message": "First!",
      }, {
        "id": 2,
        "author": "User 2",
        "message": "Good Luck!",
      }]
    }
    ```
  
    If the records in the relationship are not known when the response
    is serialized its also possible to represent the relationship as a
    url using the `links` key in the response. Ember Data will fetch
    this url to resolve the relationship when it is accessed for the
    first time.
  
    ```js
    {
      "posts": {
        "id": 5,
        "title": "I'm Running to Reform the W3C's Tag",
        "author": "Yehuda Katz",
        "links": {
          "comments": "/posts/5/comments"
        }
      }
    }
    ```
  
    ### Errors
  
    If a response is considered a failure, the JSON payload is expected to include
    a top-level key `errors`, detailing any specific issues. For example:
  
    ```js
    {
      "errors": {
        "msg": "Something went wrong"
      }
    }
    ```
  
    This adapter does not make any assumptions as to the format of the `errors`
    object. It will simply be passed along as is, wrapped in an instance
    of `DS.InvalidError` or `DS.AdapterError`. The serializer can interpret it
    afterwards.
  
    ## Customization
  
    ### Endpoint path customization
  
    Endpoint paths can be prefixed with a `namespace` by setting the namespace
    property on the adapter:
  
    ```app/adapters/application.js
    import DS from 'ember-data';
  
    export default DS.RESTAdapter.extend({
      namespace: 'api/1'
    });
    ```
    Requests for the `Person` model would now target `/api/1/people/1`.
  
    ### Host customization
  
    An adapter can target other hosts by setting the `host` property.
  
    ```app/adapters/application.js
    import DS from 'ember-data';
  
    export default DS.RESTAdapter.extend({
      host: 'https://api.example.com'
    });
    ```
  
    ### Headers customization
  
    Some APIs require HTTP headers, e.g. to provide an API key. Arbitrary
    headers can be set as key/value pairs on the `RESTAdapter`'s `headers`
    object and Ember Data will send them along with each ajax request.
  
  
    ```app/adapters/application.js
    import DS from 'ember-data';
  
    export default DS.RESTAdapter.extend({
      headers: {
        'API_KEY': 'secret key',
        'ANOTHER_HEADER': 'Some header value'
      }
    });
    ```
  
    `headers` can also be used as a computed property to support dynamic
    headers. In the example below, the `session` object has been
    injected into an adapter by Ember's container.
  
    ```app/adapters/application.js
    import DS from 'ember-data';
    import { computed } from '@ember/object';
  
    export default DS.RESTAdapter.extend({
      headers: computed('session.authToken', function() {
        return {
          'API_KEY': this.get('session.authToken'),
          'ANOTHER_HEADER': 'Some header value'
        };
      })
    });
    ```
  
    In some cases, your dynamic headers may require data from some
    object outside of Ember's observer system (for example
    `document.cookie`). You can use the
    [volatile](/api/classes/Ember.ComputedProperty.html#method_volatile)
    function to set the property into a non-cached mode causing the headers to
    be recomputed with every request.
  
    ```app/adapters/application.js
    import DS from 'ember-data';
    import { get } from '@ember/object';
    import { computed } from '@ember/object';
  
    export default DS.RESTAdapter.extend({
      headers: computed(function() {
        return {
          'API_KEY': get(document.cookie.match(/apiKey\=([^;]*)/), '1'),
          'ANOTHER_HEADER': 'Some header value'
        };
      }).volatile()
    });
    ```
  
    @class RESTAdapter
    @constructor
    @namespace DS
    @extends DS.Adapter
    @uses DS.BuildURLMixin
  */
  var RESTAdapter = _adapter.default.extend(_private.BuildURLMixin, {
    defaultSerializer: '-rest',

    sortQueryParams: function (obj) {
      var keys = Object.keys(obj);
      var len = keys.length;
      if (len < 2) {
        return obj;
      }
      var newQueryParams = {};
      var sortedKeys = keys.sort();

      for (var i = 0; i < len; i++) {
        newQueryParams[sortedKeys[i]] = obj[sortedKeys[i]];
      }
      return newQueryParams;
    },


    /**
      By default the RESTAdapter will send each find request coming from a `store.find`
      or from accessing a relationship separately to the server. If your server supports passing
      ids as a query string, you can set coalesceFindRequests to true to coalesce all find requests
      within a single runloop.
       For example, if you have an initial payload of:
       ```javascript
      {
        post: {
          id: 1,
          comments: [1, 2]
        }
      }
      ```
       By default calling `post.get('comments')` will trigger the following requests(assuming the
      comments haven't been loaded before):
       ```
      GET /comments/1
      GET /comments/2
      ```
       If you set coalesceFindRequests to `true` it will instead trigger the following request:
       ```
      GET /comments?ids[]=1&ids[]=2
      ```
       Setting coalesceFindRequests to `true` also works for `store.find` requests and `belongsTo`
      relationships accessed within the same runloop. If you set `coalesceFindRequests: true`
       ```javascript
      store.findRecord('comment', 1);
      store.findRecord('comment', 2);
      ```
       will also send a request to: `GET /comments?ids[]=1&ids[]=2`
       Note: Requests coalescing rely on URL building strategy. So if you override `buildURL` in your app
      `groupRecordsForFindMany` more likely should be overridden as well in order for coalescing to work.
       @property coalesceFindRequests
      @type {boolean}
    */
    coalesceFindRequests: false,

    findRecord: function (store, type, id, snapshot) {
      if ((0, _private.isEnabled)('ds-improved-ajax') && !this._hasCustomizedAjax()) {
        var request = this._requestFor({
          store: store, type: type, id: id, snapshot: snapshot,
          requestType: 'findRecord'
        });

        return this._makeRequest(request);
      } else {
        var url = this.buildURL(type.modelName, id, snapshot, 'findRecord');
        var query = this.buildQuery(snapshot);

        return this.ajax(url, 'GET', { data: query });
      }
    },
    findAll: function (store, type, sinceToken, snapshotRecordArray) {
      var query = this.buildQuery(snapshotRecordArray);

      if ((0, _private.isEnabled)('ds-improved-ajax') && !this._hasCustomizedAjax()) {
        var request = this._requestFor({
          store: store, type: type, sinceToken: sinceToken, query: query,
          snapshots: snapshotRecordArray,
          requestType: 'findAll'
        });

        return this._makeRequest(request);
      } else {
        var url = this.buildURL(type.modelName, null, snapshotRecordArray, 'findAll');

        if (sinceToken) {
          query.since = sinceToken;
        }

        return this.ajax(url, 'GET', { data: query });
      }
    },
    query: function (store, type, query) {
      if ((0, _private.isEnabled)('ds-improved-ajax') && !this._hasCustomizedAjax()) {
        var request = this._requestFor({
          store: store, type: type, query: query,
          requestType: 'query'
        });

        return this._makeRequest(request);
      } else {
        var url = this.buildURL(type.modelName, null, null, 'query', query);

        if (this.sortQueryParams) {
          query = this.sortQueryParams(query);
        }

        return this.ajax(url, 'GET', { data: query });
      }
    },
    queryRecord: function (store, type, query) {
      if ((0, _private.isEnabled)('ds-improved-ajax') && !this._hasCustomizedAjax()) {
        var request = this._requestFor({
          store: store, type: type, query: query,
          requestType: 'queryRecord'
        });

        return this._makeRequest(request);
      } else {
        var url = this.buildURL(type.modelName, null, null, 'queryRecord', query);

        if (this.sortQueryParams) {
          query = this.sortQueryParams(query);
        }

        return this.ajax(url, 'GET', { data: query });
      }
    },
    findMany: function (store, type, ids, snapshots) {
      if ((0, _private.isEnabled)('ds-improved-ajax') && !this._hasCustomizedAjax()) {
        var request = this._requestFor({
          store: store, type: type, ids: ids, snapshots: snapshots,
          requestType: 'findMany'
        });

        return this._makeRequest(request);
      } else {
        var url = this.buildURL(type.modelName, ids, snapshots, 'findMany');
        return this.ajax(url, 'GET', { data: { ids: ids } });
      }
    },
    findHasMany: function (store, snapshot, url, relationship) {
      if ((0, _private.isEnabled)('ds-improved-ajax') && !this._hasCustomizedAjax()) {
        var request = this._requestFor({
          store: store, snapshot: snapshot, url: url, relationship: relationship,
          requestType: 'findHasMany'
        });

        return this._makeRequest(request);
      } else {
        var id = snapshot.id;
        var type = snapshot.modelName;

        url = this.urlPrefix(url, this.buildURL(type, id, snapshot, 'findHasMany'));

        return this.ajax(url, 'GET');
      }
    },
    findBelongsTo: function (store, snapshot, url, relationship) {
      if ((0, _private.isEnabled)('ds-improved-ajax') && !this._hasCustomizedAjax()) {
        var request = this._requestFor({
          store: store, snapshot: snapshot, url: url, relationship: relationship,
          requestType: 'findBelongsTo'
        });

        return this._makeRequest(request);
      } else {
        var id = snapshot.id;
        var type = snapshot.modelName;

        url = this.urlPrefix(url, this.buildURL(type, id, snapshot, 'findBelongsTo'));
        return this.ajax(url, 'GET');
      }
    },
    createRecord: function (store, type, snapshot) {
      if ((0, _private.isEnabled)('ds-improved-ajax') && !this._hasCustomizedAjax()) {
        var request = this._requestFor({
          store: store, type: type, snapshot: snapshot,
          requestType: 'createRecord'
        });

        return this._makeRequest(request);
      } else {
        var data = {};
        var serializer = store.serializerFor(type.modelName);
        var url = this.buildURL(type.modelName, null, snapshot, 'createRecord');

        serializer.serializeIntoHash(data, type, snapshot, { includeId: true });

        return this.ajax(url, "POST", { data: data });
      }
    },
    updateRecord: function (store, type, snapshot) {
      if ((0, _private.isEnabled)('ds-improved-ajax') && !this._hasCustomizedAjax()) {
        var request = this._requestFor({
          store: store, type: type, snapshot: snapshot,
          requestType: 'updateRecord'
        });

        return this._makeRequest(request);
      } else {
        var data = {};
        var serializer = store.serializerFor(type.modelName);

        serializer.serializeIntoHash(data, type, snapshot);

        var id = snapshot.id;
        var url = this.buildURL(type.modelName, id, snapshot, 'updateRecord');

        return this.ajax(url, "PUT", { data: data });
      }
    },
    deleteRecord: function (store, type, snapshot) {
      if ((0, _private.isEnabled)('ds-improved-ajax') && !this._hasCustomizedAjax()) {
        var request = this._requestFor({
          store: store, type: type, snapshot: snapshot,
          requestType: 'deleteRecord'
        });

        return this._makeRequest(request);
      } else {
        var id = snapshot.id;

        return this.ajax(this.buildURL(type.modelName, id, snapshot, 'deleteRecord'), "DELETE");
      }
    },
    _stripIDFromURL: function (store, snapshot) {
      var url = this.buildURL(snapshot.modelName, snapshot.id, snapshot);

      var expandedURL = url.split('/');
      // Case when the url is of the format ...something/:id
      // We are decodeURIComponent-ing the lastSegment because if it represents
      // the id, it has been encodeURIComponent-ified within `buildURL`. If we
      // don't do this, then records with id having special characters are not
      // coalesced correctly (see GH #4190 for the reported bug)
      var lastSegment = expandedURL[expandedURL.length - 1];
      var id = snapshot.id;
      if (decodeURIComponent(lastSegment) === id) {
        expandedURL[expandedURL.length - 1] = "";
      } else if (endsWith(lastSegment, '?id=' + id)) {
        //Case when the url is of the format ...something?id=:id
        expandedURL[expandedURL.length - 1] = lastSegment.substring(0, lastSegment.length - id.length - 1);
      }

      return expandedURL.join('/');
    },


    // http://stackoverflow.com/questions/417142/what-is-the-maximum-length-of-a-url-in-different-browsers
    maxURLLength: 2048,

    groupRecordsForFindMany: function (store, snapshots) {
      var groups = MapWithDefault.create({
        defaultValue: function () {
          return [];
        }
      });
      var adapter = this;
      var maxURLLength = this.maxURLLength;

      snapshots.forEach(function (snapshot) {
        var baseUrl = adapter._stripIDFromURL(store, snapshot);
        groups.get(baseUrl).push(snapshot);
      });

      function splitGroupToFitInUrl(group, maxURLLength, paramNameLength) {
        var idsSize = 0;
        var baseUrl = adapter._stripIDFromURL(store, group[0]);
        var splitGroups = [[]];

        group.forEach(function (snapshot) {
          var additionalLength = encodeURIComponent(snapshot.id).length + paramNameLength;
          if (baseUrl.length + idsSize + additionalLength >= maxURLLength) {
            idsSize = 0;
            splitGroups.push([]);
          }

          idsSize += additionalLength;

          var lastGroupIndex = splitGroups.length - 1;
          splitGroups[lastGroupIndex].push(snapshot);
        });

        return splitGroups;
      }

      var groupsArray = [];
      groups.forEach(function (group, key) {
        var paramNameLength = '&ids%5B%5D='.length;
        var splitGroups = splitGroupToFitInUrl(group, maxURLLength, paramNameLength);

        splitGroups.forEach(function (splitGroup) {
          return groupsArray.push(splitGroup);
        });
      });

      return groupsArray;
    },
    handleResponse: function (status, headers, payload, requestData) {
      if (this.isSuccess(status, headers, payload)) {
        return payload;
      } else if (this.isInvalid(status, headers, payload)) {
        return new _private.InvalidError(payload.errors);
      }

      var errors = this.normalizeErrorResponse(status, headers, payload);
      var detailedMessage = this.generatedDetailedMessage(status, headers, payload, requestData);

      switch (status) {
        case 401:
          return new _private.UnauthorizedError(errors, detailedMessage);
        case 403:
          return new _private.ForbiddenError(errors, detailedMessage);
        case 404:
          return new _private.NotFoundError(errors, detailedMessage);
        case 409:
          return new _private.ConflictError(errors, detailedMessage);
        default:
          if (status >= 500) {
            return new _private.ServerError(errors, detailedMessage);
          }
      }

      return new _private.AdapterError(errors, detailedMessage);
    },
    isSuccess: function (status, headers, payload) {
      return status >= 200 && status < 300 || status === 304;
    },
    isInvalid: function (status, headers, payload) {
      return status === 422;
    },
    ajax: function (url, type, options) {
      var adapter = this;

      var requestData = {
        url: url,
        method: type
      };

      return new Promise(function (resolve, reject) {
        var hash = adapter.ajaxOptions(url, type, options);

        hash.success = function (payload, textStatus, jqXHR) {
          var response = ajaxSuccess(adapter, jqXHR, payload, requestData);
          run.join(null, resolve, response);
        };

        hash.error = function (jqXHR, textStatus, errorThrown) {
          var responseData = {
            textStatus: textStatus,
            errorThrown: errorThrown
          };
          var error = ajaxError(adapter, jqXHR, requestData, responseData);
          run.join(null, reject, error);
        };

        adapter._ajaxRequest(hash);
      }, 'DS: RESTAdapter#ajax ' + type + ' to ' + url);
    },
    _ajaxRequest: function (options) {
      $.ajax(options);
    },
    ajaxOptions: function (url, type, options) {
      var hash = options || {};
      hash.url = url;
      hash.type = type;
      hash.dataType = 'json';
      hash.context = this;

      if (hash.data && type !== 'GET') {
        hash.contentType = 'application/json; charset=utf-8';
        hash.data = JSON.stringify(hash.data);
      }

      var headers = get(this, 'headers');
      if (headers !== undefined) {
        hash.beforeSend = function (xhr) {
          Object.keys(headers).forEach(function (key) {
            return xhr.setRequestHeader(key, headers[key]);
          });
        };
      }

      return hash;
    },
    parseErrorResponse: function (responseText) {
      var json = responseText;

      try {
        json = $.parseJSON(responseText);
      } catch (e) {
        // ignored
      }

      return json;
    },
    normalizeErrorResponse: function (status, headers, payload) {
      if (payload && typeof payload === 'object' && payload.errors) {
        return payload.errors;
      } else {
        return [{
          status: '' + status,
          title: "The backend responded with an error",
          detail: '' + payload
        }];
      }
    },


    /**
      Generates a detailed ("friendly") error message, with plenty
      of information for debugging (good luck!)
       @method generatedDetailedMessage
      @private
      @param  {Number} status
      @param  {Object} headers
      @param  {Object} payload
      @param  {Object} requestData
      @return {String} detailed error message
    */
    generatedDetailedMessage: function (status, headers, payload, requestData) {
      var shortenedPayload = void 0;
      var payloadContentType = headers["Content-Type"] || "Empty Content-Type";

      if (payloadContentType === "text/html" && payload.length > 250) {
        shortenedPayload = "[Omitted Lengthy HTML]";
      } else {
        shortenedPayload = payload;
      }

      var requestDescription = requestData.method + ' ' + requestData.url;
      var payloadDescription = 'Payload (' + payloadContentType + ')';

      return ['Ember Data Request ' + requestDescription + ' returned a ' + status, payloadDescription, shortenedPayload].join('\n');
    },

    buildQuery: function (snapshot) {
      var query = {};

      if (snapshot) {
        var include = snapshot.include;


        if (include) {
          query.include = include;
        }
      }

      return query;
    },
    _hasCustomizedAjax: function () {
      if (this.ajax !== RESTAdapter.prototype.ajax) {
        (false && !(false) && Ember.deprecate('RESTAdapter#ajax has been deprecated please use. `methodForRequest`, `urlForRequest`, `headersForRequest` or `dataForRequest` instead.', false, {
          id: 'ds.rest-adapter.ajax',
          until: '3.0.0'
        }));

        return true;
      }

      if (this.ajaxOptions !== RESTAdapter.prototype.ajaxOptions) {
        (false && !(false) && Ember.deprecate('RESTAdapter#ajaxOptions has been deprecated please use. `methodForRequest`, `urlForRequest`, `headersForRequest` or `dataForRequest` instead.', false, {
          id: 'ds.rest-adapter.ajax-options',
          until: '3.0.0'
        }));

        return true;
      }

      return false;
    }
  });

  if ((0, _private.isEnabled)('ds-improved-ajax')) {

    RESTAdapter.reopen({
      dataForRequest: function (params) {
        var store = params.store,
            type = params.type,
            snapshot = params.snapshot,
            requestType = params.requestType,
            query = params.query;


        // type is not passed to findBelongsTo and findHasMany
        type = type || snapshot && snapshot.type;

        var serializer = store.serializerFor(type.modelName);
        var data = {};

        switch (requestType) {
          case 'createRecord':
            serializer.serializeIntoHash(data, type, snapshot, { includeId: true });
            break;

          case 'updateRecord':
            serializer.serializeIntoHash(data, type, snapshot);
            break;

          case 'findRecord':
            data = this.buildQuery(snapshot);
            break;

          case 'findAll':
            if (params.sinceToken) {
              query = query || {};
              query.since = params.sinceToken;
            }
            data = query;
            break;

          case 'query':
          case 'queryRecord':
            if (this.sortQueryParams) {
              query = this.sortQueryParams(query);
            }
            data = query;
            break;

          case 'findMany':
            data = { ids: params.ids };
            break;

          default:
            data = undefined;
            break;
        }

        return data;
      },
      methodForRequest: function (params) {
        var requestType = params.requestType;


        switch (requestType) {
          case 'createRecord':
            return 'POST';
          case 'updateRecord':
            return 'PUT';
          case 'deleteRecord':
            return 'DELETE';
        }

        return 'GET';
      },
      urlForRequest: function (params) {
        var type = params.type,
            id = params.id,
            ids = params.ids,
            snapshot = params.snapshot,
            snapshots = params.snapshots,
            requestType = params.requestType,
            query = params.query;


        // type and id are not passed from updateRecord and deleteRecord, hence they
        // are defined if not set
        type = type || snapshot && snapshot.type;
        id = id || snapshot && snapshot.id;

        switch (requestType) {
          case 'findAll':
            return this.buildURL(type.modelName, null, snapshots, requestType);

          case 'query':
          case 'queryRecord':
            return this.buildURL(type.modelName, null, null, requestType, query);

          case 'findMany':
            return this.buildURL(type.modelName, ids, snapshots, requestType);

          case 'findHasMany':
          case 'findBelongsTo':
            {
              var url = this.buildURL(type.modelName, id, snapshot, requestType);
              return this.urlPrefix(params.url, url);
            }
        }

        return this.buildURL(type.modelName, id, snapshot, requestType, query);
      },
      headersForRequest: function (params) {
        return this.get('headers');
      },
      _requestFor: function (params) {
        var method = this.methodForRequest(params);
        var url = this.urlForRequest(params);
        var headers = this.headersForRequest(params);
        var data = this.dataForRequest(params);

        return { method: method, url: url, headers: headers, data: data };
      },
      _requestToJQueryAjaxHash: function (request) {
        var hash = {};

        hash.type = request.method;
        hash.url = request.url;
        hash.dataType = 'json';
        hash.context = this;

        if (request.data) {
          if (request.method !== 'GET') {
            hash.contentType = 'application/json; charset=utf-8';
            hash.data = JSON.stringify(request.data);
          } else {
            hash.data = request.data;
          }
        }

        var headers = request.headers;
        if (headers !== undefined) {
          hash.beforeSend = function (xhr) {
            Object.keys(headers).forEach(function (key) {
              return xhr.setRequestHeader(key, headers[key]);
            });
          };
        }

        return hash;
      },
      _makeRequest: function (request) {
        var adapter = this;
        var hash = this._requestToJQueryAjaxHash(request);

        var method = request.method,
            url = request.url;

        var requestData = { method: method, url: url };

        return new Promise(function (resolve, reject) {

          hash.success = function (payload, textStatus, jqXHR) {
            var response = ajaxSuccess(adapter, jqXHR, payload, requestData);
            run.join(null, resolve, response);
          };

          hash.error = function (jqXHR, textStatus, errorThrown) {
            var responseData = {
              textStatus: textStatus,
              errorThrown: errorThrown
            };
            var error = ajaxError(adapter, jqXHR, requestData, responseData);
            run.join(null, reject, error);
          };

          adapter._ajaxRequest(hash);
        }, 'DS: RESTAdapter#makeRequest: ' + method + ' ' + url);
      }
    });
  }

  function ajaxSuccess(adapter, jqXHR, payload, requestData) {
    var response = void 0;
    try {
      response = adapter.handleResponse(jqXHR.status, (0, _private.parseResponseHeaders)(jqXHR.getAllResponseHeaders()), payload, requestData);
    } catch (error) {
      return Promise.reject(error);
    }

    if (response && response.isAdapterError) {
      return Promise.reject(response);
    } else {
      return response;
    }
  }

  function ajaxError(adapter, jqXHR, requestData, responseData) {
    if (false) {
      var message = 'The server returned an empty string for ' + requestData.method + ' ' + requestData.url + ', which cannot be parsed into a valid JSON. Return either null or {}.';
      var validJSONString = !(responseData.textStatus === "parsererror" && jqXHR.responseText === "");
      (false && Ember.warn(message, validJSONString, {
        id: 'ds.adapter.returned-empty-string-as-JSON'
      }));
    }

    var error = void 0;

    if (responseData.errorThrown instanceof Error) {
      error = responseData.errorThrown;
    } else if (responseData.textStatus === 'timeout') {
      error = new _private.TimeoutError();
    } else if (responseData.textStatus === 'abort' || jqXHR.status === 0) {
      error = new _private.AbortError();
    } else {
      try {
        error = adapter.handleResponse(jqXHR.status, (0, _private.parseResponseHeaders)(jqXHR.getAllResponseHeaders()), adapter.parseErrorResponse(jqXHR.responseText) || responseData.errorThrown, requestData);
      } catch (e) {
        error = e;
      }
    }

    return error;
  }

  //From http://stackoverflow.com/questions/280634/endswith-in-javascript
  function endsWith(string, suffix) {
    if (typeof String.prototype.endsWith !== 'function') {
      return string.indexOf(suffix, string.length - suffix.length) !== -1;
    } else {
      return string.endsWith(suffix);
    }
  }

  exports.default = RESTAdapter;
});
define('ember-data/attr', ['exports'], function (exports) {
  'use strict';

  exports.__esModule = true;
  exports.default = attr;
  var computed = Ember.computed;


  /**
    @module ember-data
  */

  function getDefaultValue(record, options, key) {
    if (typeof options.defaultValue === 'function') {
      return options.defaultValue.apply(null, arguments);
    } else {
      var defaultValue = options.defaultValue;
      (false && !(typeof defaultValue !== 'object' || defaultValue === null) && Ember.deprecate('Non primitive defaultValues are deprecated because they are shared between all instances. If you would like to use a complex object as a default value please provide a function that returns the complex object.', typeof defaultValue !== 'object' || defaultValue === null, {
        id: 'ds.defaultValue.complex-object',
        until: '3.0.0'
      }));

      return defaultValue;
    }
  }

  function hasValue(record, key) {
    return key in record._attributes || key in record._inFlightAttributes || key in record._data;
  }

  function getValue(record, key) {
    if (key in record._attributes) {
      return record._attributes[key];
    } else if (key in record._inFlightAttributes) {
      return record._inFlightAttributes[key];
    } else {
      return record._data[key];
    }
  }

  /**
    `DS.attr` defines an attribute on a [DS.Model](/api/data/classes/DS.Model.html).
    By default, attributes are passed through as-is, however you can specify an
    optional type to have the value automatically transformed.
    Ember Data ships with four basic transform types: `string`, `number`,
    `boolean` and `date`. You can define your own transforms by subclassing
    [DS.Transform](/api/data/classes/DS.Transform.html).
  
    Note that you cannot use `attr` to define an attribute of `id`.
  
    `DS.attr` takes an optional hash as a second parameter, currently
    supported options are:
  
    - `defaultValue`: Pass a string or a function to be called to set the attribute
                      to a default value if none is supplied.
  
    Example
  
    ```app/models/user.js
    import DS from 'ember-data';
  
    export default DS.Model.extend({
      username: DS.attr('string'),
      email: DS.attr('string'),
      verified: DS.attr('boolean', { defaultValue: false })
    });
    ```
  
    Default value can also be a function. This is useful it you want to return
    a new object for each attribute.
  
    ```app/models/user.js
    import DS from 'ember-data';
  
    export default DS.Model.extend({
      username: DS.attr('string'),
      email: DS.attr('string'),
      settings: DS.attr({
        defaultValue() {
          return {};
        }
      })
    });
    ```
  
    The `options` hash is passed as second argument to a transforms'
    `serialize` and `deserialize` method. This allows to configure a
    transformation and adapt the corresponding value, based on the config:
  
    ```app/models/post.js
    import DS from 'ember-data';
  
    export default DS.Model.extend({
      text: DS.attr('text', {
        uppercase: true
      })
    });
    ```
  
    ```app/transforms/text.js
    import DS from 'ember-data';
  
    export default DS.Transform.extend({
      serialize(value, options) {
        if (options.uppercase) {
          return value.toUpperCase();
        }
  
        return value;
      },
  
      deserialize(value) {
        return value;
      }
    })
    ```
  
    @namespace
    @method attr
    @for DS
    @param {String|Object} type the attribute type
    @param {Object} options a hash of options
    @return {Attribute}
  */

  function attr(type, options) {
    if (typeof type === 'object') {
      options = type;
      type = undefined;
    } else {
      options = options || {};
    }

    var meta = {
      type: type,
      isAttribute: true,
      options: options
    };

    return computed({
      get: function (key) {
        var internalModel = this._internalModel;
        if (hasValue(internalModel, key)) {
          return getValue(internalModel, key);
        } else {
          return getDefaultValue(this, options, key);
        }
      },
      set: function (key, value) {
        var internalModel = this._internalModel;
        var oldValue = getValue(internalModel, key);
        var originalValue = void 0;

        if (value !== oldValue) {
          // Add the new value to the changed attributes hash; it will get deleted by
          // the 'didSetProperty' handler if it is no different from the original value
          internalModel._attributes[key] = value;

          if (key in internalModel._inFlightAttributes) {
            originalValue = internalModel._inFlightAttributes[key];
          } else {
            originalValue = internalModel._data[key];
          }

          this._internalModel.send('didSetProperty', {
            name: key,
            oldValue: oldValue,
            originalValue: originalValue,
            value: value
          });
        }

        return value;
      }
    }).meta(meta);
  }
});
define('ember-data', ['exports', 'ember-data/-private', 'ember-data/setup-container', 'ember-data/initialize-store-service', 'ember-data/transforms/transform', 'ember-data/transforms/number', 'ember-data/transforms/date', 'ember-data/transforms/string', 'ember-data/transforms/boolean', 'ember-data/adapter', 'ember-data/adapters/json-api', 'ember-data/adapters/rest', 'ember-data/serializer', 'ember-data/serializers/json-api', 'ember-data/serializers/json', 'ember-data/serializers/rest', 'ember-data/serializers/embedded-records-mixin', 'ember-data/attr', 'ember-inflector'], function (exports, _private, _setupContainer, _initializeStoreService, _transform, _number, _date, _string, _boolean, _adapter, _jsonApi, _rest, _serializer, _jsonApi2, _json, _rest2, _embeddedRecordsMixin, _attr) {
  'use strict';

  exports.__esModule = true;
  var EmberError = Ember.Error;


  /**
    Ember Data
    @module ember-data
    @main ember-data
  */

  if (Ember.VERSION.match(/^1\.([0-9]|1[0-2])\./)) {
    throw new EmberError("Ember Data requires at least Ember 1.13.0, but you have " + Ember.VERSION + ". Please upgrade your version of Ember, then upgrade Ember Data.");
  }

  _private.DS.Store = _private.Store;
  _private.DS.PromiseArray = _private.PromiseArray;
  _private.DS.PromiseObject = _private.PromiseObject;

  _private.DS.PromiseManyArray = _private.PromiseManyArray;

  _private.DS.Model = _private.Model;
  _private.DS.RootState = _private.RootState;
  _private.DS.attr = _attr.default;
  _private.DS.Errors = _private.Errors;

  _private.DS.InternalModel = _private.InternalModel;
  _private.DS.Snapshot = _private.Snapshot;

  _private.DS.Adapter = _adapter.default;

  _private.DS.AdapterError = _private.AdapterError;
  _private.DS.InvalidError = _private.InvalidError;
  _private.DS.TimeoutError = _private.TimeoutError;
  _private.DS.AbortError = _private.AbortError;

  _private.DS.UnauthorizedError = _private.UnauthorizedError;
  _private.DS.ForbiddenError = _private.ForbiddenError;
  _private.DS.NotFoundError = _private.NotFoundError;
  _private.DS.ConflictError = _private.ConflictError;
  _private.DS.ServerError = _private.ServerError;

  _private.DS.errorsHashToArray = _private.errorsHashToArray;
  _private.DS.errorsArrayToHash = _private.errorsArrayToHash;

  _private.DS.Serializer = _serializer.default;

  _private.DS.DebugAdapter = _private.DebugAdapter;

  _private.DS.RecordArray = _private.RecordArray;
  _private.DS.FilteredRecordArray = _private.FilteredRecordArray;
  _private.DS.AdapterPopulatedRecordArray = _private.AdapterPopulatedRecordArray;
  _private.DS.ManyArray = _private.ManyArray;

  _private.DS.RecordArrayManager = _private.RecordArrayManager;

  _private.DS.RESTAdapter = _rest.default;
  _private.DS.BuildURLMixin = _private.BuildURLMixin;

  _private.DS.RESTSerializer = _rest2.default;
  _private.DS.JSONSerializer = _json.default;

  _private.DS.JSONAPIAdapter = _jsonApi.default;
  _private.DS.JSONAPISerializer = _jsonApi2.default;

  _private.DS.Transform = _transform.default;
  _private.DS.DateTransform = _date.default;
  _private.DS.StringTransform = _string.default;
  _private.DS.NumberTransform = _number.default;
  _private.DS.BooleanTransform = _boolean.default;

  _private.DS.EmbeddedRecordsMixin = _embeddedRecordsMixin.default;

  _private.DS.belongsTo = _private.belongsTo;
  _private.DS.hasMany = _private.hasMany;

  _private.DS.Relationship = _private.Relationship;

  _private.DS._setupContainer = _setupContainer.default;
  _private.DS._initializeStoreService = _initializeStoreService.default;

  Object.defineProperty(_private.DS, 'normalizeModelName', {
    enumerable: true,
    writable: false,
    configurable: false,
    value: _private.normalizeModelName
  });

  Object.defineProperty(_private.global, 'DS', {
    configurable: true,
    get: function () {
      (false && !(false) && Ember.deprecate('Using the global version of DS is deprecated. Please either import ' + 'the specific modules needed or `import DS from \'ember-data\';`.', false, { id: 'ember-data.global-ds', until: '3.0.0' }));


      return _private.DS;
    }
  });

  exports.default = _private.DS;
});
define('ember-data/initialize-store-service', ['exports'], function (exports) {
  'use strict';

  exports.__esModule = true;
  exports.default = initializeStoreService;


  var deprecateOldEmberDataInitializers = void 0;

  /*
    Configures a registry for use with an Ember-Data
    store.
  
    @method initializeStoreService
    @param {Ember.ApplicationInstance | Ember.EngineInstance} instance
  */
  function initializeStoreService(instance) {
    // instance.lookup supports Ember 2.1 and higher
    // instance.container supports Ember 1.11 - 2.0
    var container = instance.lookup ? instance : instance.container;

    // Eagerly generate the store so defaultStore is populated.
    container.lookup('service:store');

    if (false) {
      // In Ember 2.4+ instance.base is the `Ember.Application` or `Ember.Engine` instance
      // In Ember 1.11 - 2.3 we fallback to `instance.application`
      var base = instance.base || instance.application;
      deprecateOldEmberDataInitializers(base.constructor.initializers);
    }
  }

  if (false) {
    var DEPRECATED_INITIALIZER_NAMES = ['data-adapter', 'injectStore', 'transforms', 'store'];

    var matchesDeprecatedInititalizer = function matchesDeprecatedInititalizer(name) {
      return DEPRECATED_INITIALIZER_NAMES.indexOf(name) !== -1;
    };

    var warnForDeprecatedInitializers = function warnForDeprecatedInitializers(initializer) {
      var deprecatedBeforeInitializer = matchesDeprecatedInititalizer(initializer.before);
      var deprecatedAfterInitializer = matchesDeprecatedInititalizer(initializer.after);
      var deprecatedProp = deprecatedBeforeInitializer ? 'before' : 'after';

      (false && !(!(deprecatedBeforeInitializer || deprecatedAfterInitializer)) && Ember.deprecate('The initializer `' + initializer[deprecatedProp] + '` has been deprecated. Please update your `' + initializer.name + '` initializer to use use `' + deprecatedProp + ': \'ember-data\'` instead.', !(deprecatedBeforeInitializer || deprecatedAfterInitializer), {
        id: 'ds.deprecated-initializers',
        until: '3.0.0'
      }));
    };

    deprecateOldEmberDataInitializers = function deprecateOldEmberDataInitializers(initializers) {
      // collect all of the initializers
      var keys = Object.keys(initializers);

      for (var i = 0; i < keys.length; i++) {
        var name = keys[i];

        // filter out all of the Ember Data initializer. We have some
        // deprecated initializers that depend on other deprecated
        // initializers which may trigger the deprecation warning
        // unintentionally.
        if (!matchesDeprecatedInititalizer(name)) {
          warnForDeprecatedInitializers(initializers[name]);
        }
      }
    };
  }
});
define('ember-data/initializers/data-adapter', ['exports'], function (exports) {
  'use strict';

  exports.__esModule = true;
  exports.default = {
    name: 'data-adapter',
    before: 'store',
    initialize: function () {}
  };
});
define('ember-data/initializers/ember-data', ['exports', 'ember-data/setup-container', 'ember-data'], function (exports, _setupContainer) {
  'use strict';

  exports.__esModule = true;
  exports.default = {
    name: 'ember-data',
    initialize: _setupContainer.default
  };
});
define('ember-data/initializers/injectStore', ['exports'], function (exports) {
  'use strict';

  exports.__esModule = true;
  exports.default = {
    name: 'injectStore',
    before: 'store',
    initialize: function () {}
  };
});
define('ember-data/initializers/store', ['exports'], function (exports) {
  'use strict';

  exports.__esModule = true;
  exports.default = {
    name: 'store',
    after: 'ember-data',
    initialize: function () {}
  };
});
define('ember-data/initializers/transforms', ['exports'], function (exports) {
  'use strict';

  exports.__esModule = true;
  exports.default = {
    name: 'transforms',
    before: 'store',
    initialize: function () {}
  };
});
define("ember-data/instance-initializers/ember-data", ["exports", "ember-data/initialize-store-service"], function (exports, _initializeStoreService) {
  "use strict";

  exports.__esModule = true;
  exports.default = {
    name: "ember-data",
    initialize: _initializeStoreService.default
  };
});
define('ember-data/model', ['exports', 'ember-data/-private'], function (exports, _private) {
  'use strict';

  exports.__esModule = true;
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _private.Model;
    }
  });
});
define('ember-data/relationships', ['exports', 'ember-data/-private'], function (exports, _private) {
  'use strict';

  exports.__esModule = true;
  Object.defineProperty(exports, 'belongsTo', {
    enumerable: true,
    get: function () {
      return _private.belongsTo;
    }
  });
  Object.defineProperty(exports, 'hasMany', {
    enumerable: true,
    get: function () {
      return _private.hasMany;
    }
  });
});
define('ember-data/serializer', ['exports'], function (exports) {
  'use strict';

  exports.__esModule = true;
  var EmberObject = Ember.Object;
  exports.default = EmberObject.extend({

    /**
      The `store` property is the application's `store` that contains
      all records. It can be used to look up serializers for other model
      types that may be nested inside the payload response.
       Example:
       ```js
      Serializer.extend({
        extractRelationship(relationshipModelName, relationshipHash) {
          var modelClass = this.store.modelFor(relationshipModelName);
          var relationshipSerializer = this.store.serializerFor(relationshipModelName);
          return relationshipSerializer.normalize(modelClass, relationshipHash);
        }
      });
      ```
       @property store
      @type {DS.Store}
      @public
    */

    /**
      The `normalizeResponse` method is used to normalize a payload from the
      server to a JSON-API Document.
       http://jsonapi.org/format/#document-structure
       Example:
       ```js
      Serializer.extend({
        normalizeResponse(store, primaryModelClass, payload, id, requestType) {
          if (requestType === 'findRecord') {
            return this.normalize(primaryModelClass, payload);
          } else {
            return payload.reduce(function(documentHash, item) {
              let { data, included } = this.normalize(primaryModelClass, item);
              documentHash.included.push(...included);
              documentHash.data.push(data);
              return documentHash;
            }, { data: [], included: [] })
          }
        }
      });
      ```
       @since 1.13.0
      @method normalizeResponse
      @param {DS.Store} store
      @param {DS.Model} primaryModelClass
      @param {Object} payload
      @param {String|Number} id
      @param {String} requestType
      @return {Object} JSON-API Document
    */
    normalizeResponse: null,

    /**
      The `serialize` method is used when a record is saved in order to convert
      the record into the form that your external data source expects.
       `serialize` takes an optional `options` hash with a single option:
       - `includeId`: If this is `true`, `serialize` should include the ID
        in the serialized object it builds.
       Example:
       ```js
      Serializer.extend({
        serialize(snapshot, options) {
          var json = {
            id: snapshot.id
          };
           snapshot.eachAttribute((key, attribute) => {
            json[key] = snapshot.attr(key);
          });
           snapshot.eachRelationship((key, relationship) => {
            if (relationship.kind === 'belongsTo') {
              json[key] = snapshot.belongsTo(key, { id: true });
            } else if (relationship.kind === 'hasMany') {
              json[key] = snapshot.hasMany(key, { ids: true });
            }
          });
           return json;
        },
      });
      ```
       @method serialize
      @param {DS.Snapshot} snapshot
      @param {Object} [options]
      @return {Object}
    */
    serialize: null,

    /**
      The `normalize` method is used to convert a payload received from your
      external data source into the normalized form `store.push()` expects. You
      should override this method, munge the hash and return the normalized
      payload.
       Example:
       ```js
      Serializer.extend({
        normalize(modelClass, resourceHash) {
          var data = {
            id:            resourceHash.id,
            type:          modelClass.modelName,
            attributes:    resourceHash
          };
          return { data: data };
        }
      })
      ```
       @method normalize
      @param {DS.Model} typeClass
      @param {Object} hash
      @return {Object}
    */
    normalize: function (typeClass, hash) {
      return hash;
    }
  });
});
define('ember-data/serializers/embedded-records-mixin', ['exports'], function (exports) {
  'use strict';

  exports.__esModule = true;

  function _toConsumableArray(arr) {
    if (Array.isArray(arr)) {
      for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
        arr2[i] = arr[i];
      }

      return arr2;
    } else {
      return Array.from(arr);
    }
  }

  var typeOf = Ember.typeOf;
  var A = Ember.A;
  var Mixin = Ember.Mixin;
  var camelize = Ember.String.camelize;
  var set = Ember.set;
  var get = Ember.get;
  exports.default = Mixin.create({

    /**
      Normalize the record and recursively normalize/extract all the embedded records
      while pushing them into the store as they are encountered
       A payload with an attr configured for embedded records needs to be extracted:
       ```js
      {
        "post": {
          "id": "1"
          "title": "Rails is omakase",
          "comments": [{
            "id": "1",
            "body": "Rails is unagi"
          }, {
            "id": "2",
            "body": "Omakase O_o"
          }]
        }
      }
      ```
     @method normalize
     @param {DS.Model} typeClass
     @param {Object} hash to be normalized
     @param {String} prop the hash has been referenced by
     @return {Object} the normalized hash
    **/
    normalize: function (typeClass, hash, prop) {
      var normalizedHash = this._super(typeClass, hash, prop);
      return this._extractEmbeddedRecords(this, this.store, typeClass, normalizedHash);
    },
    keyForRelationship: function (key, typeClass, method) {
      if (method === 'serialize' && this.hasSerializeRecordsOption(key) || method === 'deserialize' && this.hasDeserializeRecordsOption(key)) {
        return this.keyForAttribute(key, method);
      } else {
        return this._super(key, typeClass, method) || key;
      }
    },


    /**
      Serialize `belongsTo` relationship when it is configured as an embedded object.
       This example of an author model belongs to a post model:
       ```js
      Post = DS.Model.extend({
        title:    DS.attr('string'),
        body:     DS.attr('string'),
        author:   DS.belongsTo('author')
      });
       Author = DS.Model.extend({
        name:     DS.attr('string'),
        post:     DS.belongsTo('post')
      });
      ```
       Use a custom (type) serializer for the post model to configure embedded author
       ```app/serializers/post.js
      import DS from 'ember-data';
       export default DS.RESTSerializer.extend(DS.EmbeddedRecordsMixin, {
        attrs: {
          author: { embedded: 'always' }
        }
      })
      ```
       A payload with an attribute configured for embedded records can serialize
      the records together under the root attribute's payload:
       ```js
      {
        "post": {
          "id": "1"
          "title": "Rails is omakase",
          "author": {
            "id": "2"
            "name": "dhh"
          }
        }
      }
      ```
       @method serializeBelongsTo
      @param {DS.Snapshot} snapshot
      @param {Object} json
      @param {Object} relationship
    */
    serializeBelongsTo: function (snapshot, json, relationship) {
      var attr = relationship.key;
      if (this.noSerializeOptionSpecified(attr)) {
        this._super(snapshot, json, relationship);
        return;
      }
      var includeIds = this.hasSerializeIdsOption(attr);
      var includeRecords = this.hasSerializeRecordsOption(attr);
      var embeddedSnapshot = snapshot.belongsTo(attr);
      if (includeIds) {
        var serializedKey = this._getMappedKey(relationship.key, snapshot.type);
        if (serializedKey === relationship.key && this.keyForRelationship) {
          serializedKey = this.keyForRelationship(relationship.key, relationship.kind, "serialize");
        }

        if (!embeddedSnapshot) {
          json[serializedKey] = null;
        } else {
          json[serializedKey] = embeddedSnapshot.id;

          if (relationship.options.polymorphic) {
            this.serializePolymorphicType(snapshot, json, relationship);
          }
        }
      } else if (includeRecords) {
        this._serializeEmbeddedBelongsTo(snapshot, json, relationship);
      }
    },
    _serializeEmbeddedBelongsTo: function (snapshot, json, relationship) {
      var embeddedSnapshot = snapshot.belongsTo(relationship.key);
      var serializedKey = this._getMappedKey(relationship.key, snapshot.type);
      if (serializedKey === relationship.key && this.keyForRelationship) {
        serializedKey = this.keyForRelationship(relationship.key, relationship.kind, "serialize");
      }

      if (!embeddedSnapshot) {
        json[serializedKey] = null;
      } else {
        json[serializedKey] = embeddedSnapshot.serialize({ includeId: true });
        this.removeEmbeddedForeignKey(snapshot, embeddedSnapshot, relationship, json[serializedKey]);

        if (relationship.options.polymorphic) {
          this.serializePolymorphicType(snapshot, json, relationship);
        }
      }
    },


    /**
      Serializes `hasMany` relationships when it is configured as embedded objects.
       This example of a post model has many comments:
       ```js
      Post = DS.Model.extend({
        title:    DS.attr('string'),
        body:     DS.attr('string'),
        comments: DS.hasMany('comment')
      });
       Comment = DS.Model.extend({
        body:     DS.attr('string'),
        post:     DS.belongsTo('post')
      });
      ```
       Use a custom (type) serializer for the post model to configure embedded comments
       ```app/serializers/post.js
      import DS from 'ember-data;
       export default DS.RESTSerializer.extend(DS.EmbeddedRecordsMixin, {
        attrs: {
          comments: { embedded: 'always' }
        }
      })
      ```
       A payload with an attribute configured for embedded records can serialize
      the records together under the root attribute's payload:
       ```js
      {
        "post": {
          "id": "1"
          "title": "Rails is omakase",
          "body": "I want this for my ORM, I want that for my template language..."
          "comments": [{
            "id": "1",
            "body": "Rails is unagi"
          }, {
            "id": "2",
            "body": "Omakase O_o"
          }]
        }
      }
      ```
       The attrs options object can use more specific instruction for extracting and
      serializing. When serializing, an option to embed `ids`, `ids-and-types` or `records` can be set.
      When extracting the only option is `records`.
       So `{ embedded: 'always' }` is shorthand for:
      `{ serialize: 'records', deserialize: 'records' }`
       To embed the `ids` for a related object (using a hasMany relationship):
       ```app/serializers/post.js
      import DS from 'ember-data;
       export default DS.RESTSerializer.extend(DS.EmbeddedRecordsMixin, {
        attrs: {
          comments: { serialize: 'ids', deserialize: 'records' }
        }
      })
      ```
       ```js
      {
        "post": {
          "id": "1"
          "title": "Rails is omakase",
          "body": "I want this for my ORM, I want that for my template language..."
          "comments": ["1", "2"]
        }
      }
      ```
       To embed the relationship as a collection of objects with `id` and `type` keys, set
      `ids-and-types` for the related object.
       This is particularly useful for polymorphic relationships where records don't share
      the same table and the `id` is not enough information.
       By example having a user that has many pets:
       ```js
      User = DS.Model.extend({
        name:    DS.attr('string'),
        pets: DS.hasMany('pet', { polymorphic: true })
      });
       Pet = DS.Model.extend({
        name: DS.attr('string'),
      });
       Cat = Pet.extend({
        // ...
      });
       Parrot = Pet.extend({
        // ...
      });
      ```
       ```app/serializers/user.js
      import DS from 'ember-data;
       export default DS.RESTSerializer.extend(DS.EmbeddedRecordsMixin, {
        attrs: {
          pets: { serialize: 'ids-and-types', deserialize: 'records' }
        }
      });
      ```
       ```js
      {
        "user": {
          "id": "1"
          "name": "Bertin Osborne",
          "pets": [
            { "id": "1", "type": "Cat" },
            { "id": "1", "type": "Parrot"}
          ]
        }
      }
      ```
       @method serializeHasMany
      @param {DS.Snapshot} snapshot
      @param {Object} json
      @param {Object} relationship
    */
    serializeHasMany: function (snapshot, json, relationship) {
      var attr = relationship.key;
      if (this.noSerializeOptionSpecified(attr)) {
        this._super(snapshot, json, relationship);
        return;
      }

      if (this.hasSerializeIdsOption(attr)) {
        var serializedKey = this._getMappedKey(relationship.key, snapshot.type);
        if (serializedKey === relationship.key && this.keyForRelationship) {
          serializedKey = this.keyForRelationship(relationship.key, relationship.kind, "serialize");
        }

        json[serializedKey] = snapshot.hasMany(attr, { ids: true });
      } else if (this.hasSerializeRecordsOption(attr)) {
        this._serializeEmbeddedHasMany(snapshot, json, relationship);
      } else {
        if (this.hasSerializeIdsAndTypesOption(attr)) {
          this._serializeHasManyAsIdsAndTypes(snapshot, json, relationship);
        }
      }
    },


    /*
      Serializes a hasMany relationship as an array of objects containing only `id` and `type`
      keys.
      This has its use case on polymorphic hasMany relationships where the server is not storing
      all records in the same table using STI, and therefore the `id` is not enough information
       TODO: Make the default in Ember-data 3.0??
    */
    _serializeHasManyAsIdsAndTypes: function (snapshot, json, relationship) {
      var serializedKey = this.keyForAttribute(relationship.key, 'serialize');
      var hasMany = snapshot.hasMany(relationship.key);

      json[serializedKey] = A(hasMany).map(function (recordSnapshot) {
        //
        // I'm sure I'm being utterly naive here. Propably id is a configurate property and
        // type too, and the modelName has to be normalized somehow.
        //
        return { id: recordSnapshot.id, type: recordSnapshot.modelName };
      });
    },
    _serializeEmbeddedHasMany: function (snapshot, json, relationship) {
      var serializedKey = this._getMappedKey(relationship.key, snapshot.type);
      if (serializedKey === relationship.key && this.keyForRelationship) {
        serializedKey = this.keyForRelationship(relationship.key, relationship.kind, "serialize");
      }

      (false && Ember.warn('The embedded relationship \'' + serializedKey + '\' is undefined for \'' + snapshot.modelName + '\' with id \'' + snapshot.id + '\'. Please include it in your original payload.', typeOf(snapshot.hasMany(relationship.key)) !== 'undefined', { id: 'ds.serializer.embedded-relationship-undefined' }));


      json[serializedKey] = this._generateSerializedHasMany(snapshot, relationship);
    },


    /*
      Returns an array of embedded records serialized to JSON
    */
    _generateSerializedHasMany: function (snapshot, relationship) {
      var hasMany = snapshot.hasMany(relationship.key);
      var manyArray = A(hasMany);
      var ret = new Array(manyArray.length);

      for (var i = 0; i < manyArray.length; i++) {
        var embeddedSnapshot = manyArray[i];
        var embeddedJson = embeddedSnapshot.serialize({ includeId: true });
        this.removeEmbeddedForeignKey(snapshot, embeddedSnapshot, relationship, embeddedJson);
        ret[i] = embeddedJson;
      }

      return ret;
    },


    /**
      When serializing an embedded record, modify the property (in the json payload)
      that refers to the parent record (foreign key for relationship).
       Serializing a `belongsTo` relationship removes the property that refers to the
      parent record
       Serializing a `hasMany` relationship does not remove the property that refers to
      the parent record.
       @method removeEmbeddedForeignKey
      @param {DS.Snapshot} snapshot
      @param {DS.Snapshot} embeddedSnapshot
      @param {Object} relationship
      @param {Object} json
    */
    removeEmbeddedForeignKey: function (snapshot, embeddedSnapshot, relationship, json) {
      if (relationship.kind === 'belongsTo') {
        var parentRecord = snapshot.type.inverseFor(relationship.key, this.store);
        if (parentRecord) {
          var name = parentRecord.name;
          var embeddedSerializer = this.store.serializerFor(embeddedSnapshot.modelName);
          var parentKey = embeddedSerializer.keyForRelationship(name, parentRecord.kind, 'deserialize');
          if (parentKey) {
            delete json[parentKey];
          }
        }
      } /*else if (relationship.kind === 'hasMany') {
        return;
        }*/
    },


    // checks config for attrs option to embedded (always) - serialize and deserialize
    hasEmbeddedAlwaysOption: function (attr) {
      var option = this.attrsOption(attr);
      return option && option.embedded === 'always';
    },


    // checks config for attrs option to serialize ids
    hasSerializeRecordsOption: function (attr) {
      var alwaysEmbed = this.hasEmbeddedAlwaysOption(attr);
      var option = this.attrsOption(attr);
      return alwaysEmbed || option && option.serialize === 'records';
    },


    // checks config for attrs option to serialize records
    hasSerializeIdsOption: function (attr) {
      var option = this.attrsOption(attr);
      return option && (option.serialize === 'ids' || option.serialize === 'id');
    },


    // checks config for attrs option to serialize records as objects containing id and types
    hasSerializeIdsAndTypesOption: function (attr) {
      var option = this.attrsOption(attr);
      return option && (option.serialize === 'ids-and-types' || option.serialize === 'id-and-type');
    },


    // checks config for attrs option to serialize records
    noSerializeOptionSpecified: function (attr) {
      var option = this.attrsOption(attr);
      return !(option && (option.serialize || option.embedded));
    },


    // checks config for attrs option to deserialize records
    // a defined option object for a resource is treated the same as
    // `deserialize: 'records'`
    hasDeserializeRecordsOption: function (attr) {
      var alwaysEmbed = this.hasEmbeddedAlwaysOption(attr);
      var option = this.attrsOption(attr);
      return alwaysEmbed || option && option.deserialize === 'records';
    },
    attrsOption: function (attr) {
      var attrs = this.get('attrs');
      return attrs && (attrs[camelize(attr)] || attrs[attr]);
    },


    /**
     @method _extractEmbeddedRecords
     @private
    */
    _extractEmbeddedRecords: function (serializer, store, typeClass, partial) {
      var _this = this;

      typeClass.eachRelationship(function (key, relationship) {
        if (serializer.hasDeserializeRecordsOption(key)) {
          if (relationship.kind === "hasMany") {
            _this._extractEmbeddedHasMany(store, key, partial, relationship);
          }
          if (relationship.kind === "belongsTo") {
            _this._extractEmbeddedBelongsTo(store, key, partial, relationship);
          }
        }
      });
      return partial;
    },


    /**
     @method _extractEmbeddedHasMany
     @private
    */
    _extractEmbeddedHasMany: function (store, key, hash, relationshipMeta) {
      var relationshipHash = get(hash, 'data.relationships.' + key + '.data');

      if (!relationshipHash) {
        return;
      }

      var hasMany = new Array(relationshipHash.length);

      for (var i = 0; i < relationshipHash.length; i++) {
        var item = relationshipHash[i];

        var _normalizeEmbeddedRel = this._normalizeEmbeddedRelationship(store, relationshipMeta, item),
            data = _normalizeEmbeddedRel.data,
            included = _normalizeEmbeddedRel.included;

        hash.included = hash.included || [];
        hash.included.push(data);
        if (included) {
          var _hash$included;

          (_hash$included = hash.included).push.apply(_hash$included, _toConsumableArray(included));
        }

        hasMany[i] = { id: data.id, type: data.type };
      }

      var relationship = { data: hasMany };
      set(hash, 'data.relationships.' + key, relationship);
    },


    /**
     @method _extractEmbeddedBelongsTo
     @private
    */
    _extractEmbeddedBelongsTo: function (store, key, hash, relationshipMeta) {
      var relationshipHash = get(hash, 'data.relationships.' + key + '.data');
      if (!relationshipHash) {
        return;
      }

      var _normalizeEmbeddedRel2 = this._normalizeEmbeddedRelationship(store, relationshipMeta, relationshipHash),
          data = _normalizeEmbeddedRel2.data,
          included = _normalizeEmbeddedRel2.included;

      hash.included = hash.included || [];
      hash.included.push(data);
      if (included) {
        var _hash$included2;

        (_hash$included2 = hash.included).push.apply(_hash$included2, _toConsumableArray(included));
      }

      var belongsTo = { id: data.id, type: data.type };
      var relationship = { data: belongsTo };

      set(hash, 'data.relationships.' + key, relationship);
    },


    /**
     @method _normalizeEmbeddedRelationship
     @private
    */
    _normalizeEmbeddedRelationship: function (store, relationshipMeta, relationshipHash) {
      var modelName = relationshipMeta.type;
      if (relationshipMeta.options.polymorphic) {
        modelName = relationshipHash.type;
      }
      var modelClass = store.modelFor(modelName);
      var serializer = store.serializerFor(modelName);

      return serializer.normalize(modelClass, relationshipHash, null);
    },

    isEmbeddedRecordsMixin: true
  });
});
define('ember-data/serializers/json-api', ['exports', 'ember-inflector', 'ember-data/serializers/json', 'ember-data/-private'], function (exports, _emberInflector, _json, _private) {
  'use strict';

  exports.__esModule = true;
  var typeOf = Ember.typeOf;
  var isNone = Ember.isNone;
  var dasherize = Ember.String.dasherize;


  /**
    Ember Data 2.0 Serializer:
  
    In Ember Data a Serializer is used to serialize and deserialize
    records when they are transferred in and out of an external source.
    This process involves normalizing property names, transforming
    attribute values and serializing relationships.
  
    `JSONAPISerializer` supports the http://jsonapi.org/ spec and is the
    serializer recommended by Ember Data.
  
    This serializer normalizes a JSON API payload that looks like:
  
    ```app/models/player.js
    import DS from 'ember-data';
  
    export default DS.Model.extend({
      name: DS.attr('string'),
      skill: DS.attr('string'),
      gamesPlayed: DS.attr('number'),
      club: DS.belongsTo('club')
    });
    ```
  
    ```app/models/club.js
    import DS from 'ember-data';
  
    export default DS.Model.extend({
      name: DS.attr('string'),
      location: DS.attr('string'),
      players: DS.hasMany('player')
    });
    ```
  
    ```js
      {
        "data": [
          {
            "attributes": {
              "name": "Benfica",
              "location": "Portugal"
            },
            "id": "1",
            "relationships": {
              "players": {
                "data": [
                  {
                    "id": "3",
                    "type": "players"
                  }
                ]
              }
            },
            "type": "clubs"
          }
        ],
        "included": [
          {
            "attributes": {
              "name": "Eusebio Silva Ferreira",
              "skill": "Rocket shot",
              "games-played": 431
            },
            "id": "3",
            "relationships": {
              "club": {
                "data": {
                  "id": "1",
                  "type": "clubs"
                }
              }
            },
            "type": "players"
          }
        ]
      }
    ```
  
    to the format that the Ember Data store expects.
  
    ### Customizing meta
  
    Since a JSON API Document can have meta defined in multiple locations you can
    use the specific serializer hooks if you need to customize the meta.
  
    One scenario would be to camelCase the meta keys of your payload. The example
    below shows how this could be done using `normalizeArrayResponse` and
    `extractRelationship`.
  
    ```app/serializers/application.js
    export default JSONAPISerializer.extend({
      normalizeArrayResponse(store, primaryModelClass, payload, id, requestType) {
        let normalizedDocument = this._super(...arguments);
  
        // Customize document meta
        normalizedDocument.meta = camelCaseKeys(normalizedDocument.meta);
  
        return normalizedDocument;
      },
  
      extractRelationship(relationshipHash) {
        let normalizedRelationship = this._super(...arguments);
  
        // Customize relationship meta
        normalizedRelationship.meta = camelCaseKeys(normalizedRelationship.meta);
  
        return normalizedRelationship;
      }
    });
    ```
  
    @since 1.13.0
    @class JSONAPISerializer
    @namespace DS
    @extends DS.JSONSerializer
  */
  var JSONAPISerializer = _json.default.extend({
    _normalizeDocumentHelper: function (documentHash) {

      if (typeOf(documentHash.data) === 'object') {
        documentHash.data = this._normalizeResourceHelper(documentHash.data);
      } else if (Array.isArray(documentHash.data)) {
        var ret = new Array(documentHash.data.length);

        for (var i = 0; i < documentHash.data.length; i++) {
          var data = documentHash.data[i];
          ret[i] = this._normalizeResourceHelper(data);
        }

        documentHash.data = ret;
      }

      if (Array.isArray(documentHash.included)) {
        var _ret = new Array();
        for (var _i = 0; _i < documentHash.included.length; _i++) {
          var included = documentHash.included[_i];
          var normalized = this._normalizeResourceHelper(included);
          if (normalized !== null) {
            // can be null when unknown type is encountered
            _ret.push(normalized);
          }
        }

        documentHash.included = _ret;
      }

      return documentHash;
    },
    _normalizeRelationshipDataHelper: function (relationshipDataHash) {
      if ((0, _private.isEnabled)("ds-payload-type-hooks")) {
        var modelName = this.modelNameFromPayloadType(relationshipDataHash.type);
        var deprecatedModelNameLookup = this.modelNameFromPayloadKey(relationshipDataHash.type);

        if (modelName !== deprecatedModelNameLookup && this._hasCustomModelNameFromPayloadKey()) {
          (false && !(false) && Ember.deprecate("You are using modelNameFromPayloadKey to normalize the type for a relationship. This has been deprecated in favor of modelNameFromPayloadType", false, {
            id: 'ds.json-api-serializer.deprecated-model-name-for-relationship',
            until: '3.0.0'
          }));


          modelName = deprecatedModelNameLookup;
        }

        relationshipDataHash.type = modelName;
      } else {
        relationshipDataHash.type = this.modelNameFromPayloadKey(relationshipDataHash.type);
      }

      return relationshipDataHash;
    },
    _normalizeResourceHelper: function (resourceHash) {
      (false && Ember.assert(this.warnMessageForUndefinedType(), !isNone(resourceHash.type), {
        id: 'ds.serializer.type-is-undefined'
      }));


      var modelName = void 0,
          usedLookup = void 0;

      if ((0, _private.isEnabled)("ds-payload-type-hooks")) {
        modelName = this.modelNameFromPayloadType(resourceHash.type);
        var deprecatedModelNameLookup = this.modelNameFromPayloadKey(resourceHash.type);

        usedLookup = 'modelNameFromPayloadType';

        if (modelName !== deprecatedModelNameLookup && this._hasCustomModelNameFromPayloadKey()) {
          (false && !(false) && Ember.deprecate("You are using modelNameFromPayloadKey to normalize the type for a resource. This has been deprecated in favor of modelNameFromPayloadType", false, {
            id: 'ds.json-api-serializer.deprecated-model-name-for-resource',
            until: '3.0.0'
          }));


          modelName = deprecatedModelNameLookup;
          usedLookup = 'modelNameFromPayloadKey';
        }
      } else {
        modelName = this.modelNameFromPayloadKey(resourceHash.type);
        usedLookup = 'modelNameFromPayloadKey';
      }

      if (!this.store._hasModelFor(modelName)) {
        (false && Ember.warn(this.warnMessageNoModelForType(modelName, resourceHash.type, usedLookup), false, {
          id: 'ds.serializer.model-for-type-missing'
        }));

        return null;
      }

      var modelClass = this.store._modelFor(modelName);
      var serializer = this.store.serializerFor(modelName);

      var _serializer$normalize = serializer.normalize(modelClass, resourceHash),
          data = _serializer$normalize.data;

      return data;
    },
    pushPayload: function (store, payload) {
      var normalizedPayload = this._normalizeDocumentHelper(payload);
      if ((0, _private.isEnabled)('ds-pushpayload-return')) {
        return store.push(normalizedPayload);
      } else {
        store.push(normalizedPayload);
      }
    },
    _normalizeResponse: function (store, primaryModelClass, payload, id, requestType, isSingle) {
      var normalizedPayload = this._normalizeDocumentHelper(payload);
      return normalizedPayload;
    },
    normalizeQueryRecordResponse: function () {
      var normalized = this._super.apply(this, arguments);

      (false && Ember.assert('Expected the primary data returned by the serializer for a `queryRecord` response to be a single object but instead it was an array.', !Array.isArray(normalized.data), {
        id: 'ds.serializer.json-api.queryRecord-array-response'
      }));


      return normalized;
    },
    extractAttributes: function (modelClass, resourceHash) {
      var _this = this;

      var attributes = {};

      if (resourceHash.attributes) {
        modelClass.eachAttribute(function (key) {
          var attributeKey = _this.keyForAttribute(key, 'deserialize');
          if (resourceHash.attributes[attributeKey] !== undefined) {
            attributes[key] = resourceHash.attributes[attributeKey];
          }
          if (false) {
            if (resourceHash.attributes[attributeKey] === undefined && resourceHash.attributes[key] !== undefined) {
              (false && Ember.assert('Your payload for \'' + modelClass.modelName + '\' contains \'' + key + '\', but your serializer is setup to look for \'' + attributeKey + '\'. This is most likely because Ember Data\'s JSON API serializer dasherizes attribute keys by default. You should subclass JSONAPISerializer and implement \'keyForAttribute(key) { return key; }\' to prevent Ember Data from customizing your attribute keys.', false));
            }
          }
        });
      }

      return attributes;
    },
    extractRelationship: function (relationshipHash) {

      if (typeOf(relationshipHash.data) === 'object') {
        relationshipHash.data = this._normalizeRelationshipDataHelper(relationshipHash.data);
      }

      if (Array.isArray(relationshipHash.data)) {
        var ret = new Array(relationshipHash.data.length);

        for (var i = 0; i < relationshipHash.data.length; i++) {
          var data = relationshipHash.data[i];
          ret[i] = this._normalizeRelationshipDataHelper(data);
        }

        relationshipHash.data = ret;
      }

      return relationshipHash;
    },
    extractRelationships: function (modelClass, resourceHash) {
      var _this2 = this;

      var relationships = {};

      if (resourceHash.relationships) {
        modelClass.eachRelationship(function (key, relationshipMeta) {
          var relationshipKey = _this2.keyForRelationship(key, relationshipMeta.kind, 'deserialize');
          if (resourceHash.relationships[relationshipKey] !== undefined) {

            var relationshipHash = resourceHash.relationships[relationshipKey];
            relationships[key] = _this2.extractRelationship(relationshipHash);
          }
          if (false) {
            if (resourceHash.relationships[relationshipKey] === undefined && resourceHash.relationships[key] !== undefined) {
              (false && Ember.assert('Your payload for \'' + modelClass.modelName + '\' contains \'' + key + '\', but your serializer is setup to look for \'' + relationshipKey + '\'. This is most likely because Ember Data\'s JSON API serializer dasherizes relationship keys by default. You should subclass JSONAPISerializer and implement \'keyForRelationship(key) { return key; }\' to prevent Ember Data from customizing your relationship keys.', false));
            }
          }
        });
      }

      return relationships;
    },
    _extractType: function (modelClass, resourceHash) {
      if ((0, _private.isEnabled)("ds-payload-type-hooks")) {
        var modelName = this.modelNameFromPayloadType(resourceHash.type);
        var deprecatedModelNameLookup = this.modelNameFromPayloadKey(resourceHash.type);

        if (modelName !== deprecatedModelNameLookup && this._hasCustomModelNameFromPayloadKey()) {
          (false && !(false) && Ember.deprecate("You are using modelNameFromPayloadKey to normalize the type for a polymorphic relationship. This has been deprecated in favor of modelNameFromPayloadType", false, {
            id: 'ds.json-api-serializer.deprecated-model-name-for-polymorphic-type',
            until: '3.0.0'
          }));


          modelName = deprecatedModelNameLookup;
        }

        return modelName;
      } else {
        return this.modelNameFromPayloadKey(resourceHash.type);
      }
    },
    modelNameFromPayloadKey: function (key) {
      return (0, _emberInflector.singularize)((0, _private.normalizeModelName)(key));
    },
    payloadKeyFromModelName: function (modelName) {
      return (0, _emberInflector.pluralize)(modelName);
    },
    normalize: function (modelClass, resourceHash) {
      if (resourceHash.attributes) {
        this.normalizeUsingDeclaredMapping(modelClass, resourceHash.attributes);
      }

      if (resourceHash.relationships) {
        this.normalizeUsingDeclaredMapping(modelClass, resourceHash.relationships);
      }

      var data = {
        id: this.extractId(modelClass, resourceHash),
        type: this._extractType(modelClass, resourceHash),
        attributes: this.extractAttributes(modelClass, resourceHash),
        relationships: this.extractRelationships(modelClass, resourceHash)
      };

      this.applyTransforms(modelClass, data.attributes);

      return { data: data };
    },
    keyForAttribute: function (key, method) {
      return dasherize(key);
    },
    keyForRelationship: function (key, typeClass, method) {
      return dasherize(key);
    },
    serialize: function (snapshot, options) {
      var data = this._super.apply(this, arguments);

      var payloadType = void 0;
      if ((0, _private.isEnabled)("ds-payload-type-hooks")) {
        payloadType = this.payloadTypeFromModelName(snapshot.modelName);
        var deprecatedPayloadTypeLookup = this.payloadKeyFromModelName(snapshot.modelName);

        if (payloadType !== deprecatedPayloadTypeLookup && this._hasCustomPayloadKeyFromModelName()) {
          (false && !(false) && Ember.deprecate("You used payloadKeyFromModelName to customize how a type is serialized. Use payloadTypeFromModelName instead.", false, {
            id: 'ds.json-api-serializer.deprecated-payload-type-for-model',
            until: '3.0.0'
          }));


          payloadType = deprecatedPayloadTypeLookup;
        }
      } else {
        payloadType = this.payloadKeyFromModelName(snapshot.modelName);
      }

      data.type = payloadType;
      return { data: data };
    },
    serializeAttribute: function (snapshot, json, key, attribute) {
      var type = attribute.type;

      if (this._canSerialize(key)) {
        json.attributes = json.attributes || {};

        var value = snapshot.attr(key);
        if (type) {
          var transform = this.transformFor(type);
          value = transform.serialize(value, attribute.options);
        }

        var payloadKey = this._getMappedKey(key, snapshot.type);

        if (payloadKey === key) {
          payloadKey = this.keyForAttribute(key, 'serialize');
        }

        json.attributes[payloadKey] = value;
      }
    },
    serializeBelongsTo: function (snapshot, json, relationship) {
      var key = relationship.key;

      if (this._canSerialize(key)) {
        var belongsTo = snapshot.belongsTo(key);
        if (belongsTo !== undefined) {

          json.relationships = json.relationships || {};

          var payloadKey = this._getMappedKey(key, snapshot.type);
          if (payloadKey === key) {
            payloadKey = this.keyForRelationship(key, 'belongsTo', 'serialize');
          }

          var data = null;
          if (belongsTo) {
            var payloadType = void 0;

            if ((0, _private.isEnabled)("ds-payload-type-hooks")) {
              payloadType = this.payloadTypeFromModelName(belongsTo.modelName);
              var deprecatedPayloadTypeLookup = this.payloadKeyFromModelName(belongsTo.modelName);

              if (payloadType !== deprecatedPayloadTypeLookup && this._hasCustomPayloadKeyFromModelName()) {
                (false && !(false) && Ember.deprecate("You used payloadKeyFromModelName to serialize type for belongs-to relationship. Use payloadTypeFromModelName instead.", false, {
                  id: 'ds.json-api-serializer.deprecated-payload-type-for-belongs-to',
                  until: '3.0.0'
                }));


                payloadType = deprecatedPayloadTypeLookup;
              }
            } else {
              payloadType = this.payloadKeyFromModelName(belongsTo.modelName);
            }

            data = {
              type: payloadType,
              id: belongsTo.id
            };
          }

          json.relationships[payloadKey] = { data: data };
        }
      }
    },
    serializeHasMany: function (snapshot, json, relationship) {
      var key = relationship.key;
      var shouldSerializeHasMany = '_shouldSerializeHasMany';
      if ((0, _private.isEnabled)("ds-check-should-serialize-relationships")) {
        shouldSerializeHasMany = 'shouldSerializeHasMany';
      }

      if (this[shouldSerializeHasMany](snapshot, key, relationship)) {
        var hasMany = snapshot.hasMany(key);
        if (hasMany !== undefined) {

          json.relationships = json.relationships || {};

          var payloadKey = this._getMappedKey(key, snapshot.type);
          if (payloadKey === key && this.keyForRelationship) {
            payloadKey = this.keyForRelationship(key, 'hasMany', 'serialize');
          }

          var data = new Array(hasMany.length);

          for (var i = 0; i < hasMany.length; i++) {
            var item = hasMany[i];

            var payloadType = void 0;

            if ((0, _private.isEnabled)("ds-payload-type-hooks")) {
              payloadType = this.payloadTypeFromModelName(item.modelName);
              var deprecatedPayloadTypeLookup = this.payloadKeyFromModelName(item.modelName);

              if (payloadType !== deprecatedPayloadTypeLookup && this._hasCustomPayloadKeyFromModelName()) {
                (false && !(false) && Ember.deprecate("You used payloadKeyFromModelName to serialize type for belongs-to relationship. Use payloadTypeFromModelName instead.", false, {
                  id: 'ds.json-api-serializer.deprecated-payload-type-for-has-many',
                  until: '3.0.0'
                }));


                payloadType = deprecatedPayloadTypeLookup;
              }
            } else {
              payloadType = this.payloadKeyFromModelName(item.modelName);
            }

            data[i] = {
              type: payloadType,
              id: item.id
            };
          }

          json.relationships[payloadKey] = { data: data };
        }
      }
    }
  });

  if ((0, _private.isEnabled)("ds-payload-type-hooks")) {

    JSONAPISerializer.reopen({
      modelNameFromPayloadType: function (type) {
        return (0, _emberInflector.singularize)((0, _private.normalizeModelName)(type));
      },
      payloadTypeFromModelName: function (modelName) {
        return (0, _emberInflector.pluralize)(modelName);
      },
      _hasCustomModelNameFromPayloadKey: function () {
        return this.modelNameFromPayloadKey !== JSONAPISerializer.prototype.modelNameFromPayloadKey;
      },
      _hasCustomPayloadKeyFromModelName: function () {
        return this.payloadKeyFromModelName !== JSONAPISerializer.prototype.payloadKeyFromModelName;
      }
    });
  }

  if (false) {
    JSONAPISerializer.reopen({
      willMergeMixin: function (props) {
        var constructor = this.constructor;
        (false && Ember.warn('You\'ve defined \'extractMeta\' in ' + constructor.toString() + ' which is not used for serializers extending JSONAPISerializer. Read more at https://emberjs.com/api/data/classes/DS.JSONAPISerializer.html#toc_customizing-meta on how to customize meta when using JSON API.', isNone(props.extractMeta) || props.extractMeta === _json.default.prototype.extractMeta, {
          id: 'ds.serializer.json-api.extractMeta'
        }));
        (false && Ember.warn('The JSONAPISerializer does not work with the EmbeddedRecordsMixin because the JSON API spec does not describe how to format embedded resources.', !props.isEmbeddedRecordsMixin, {
          id: 'ds.serializer.embedded-records-mixin-not-supported'
        }));
      },
      warnMessageForUndefinedType: function () {
        return 'Encountered a resource object with an undefined type (resolved resource using ' + this.constructor.toString() + ')';
      },
      warnMessageNoModelForType: function (modelName, originalType, usedLookup) {
        return 'Encountered a resource object with type "' + originalType + '", but no model was found for model name "' + modelName + '" (resolved model name using \'' + this.constructor.toString() + '.' + usedLookup + '("' + originalType + '")\').';
      }
    });
  }

  exports.default = JSONAPISerializer;
});
define('ember-data/serializers/json', ['exports', 'ember-data/serializer', 'ember-data/-private'], function (exports, _serializer, _private) {
  'use strict';

  exports.__esModule = true;

  function _toConsumableArray(arr) {
    if (Array.isArray(arr)) {
      for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
        arr2[i] = arr[i];
      }

      return arr2;
    } else {
      return Array.from(arr);
    }
  }

  var assign = Ember.assign;
  var merge = Ember.merge;
  var isNone = Ember.isNone;
  var typeOf = Ember.typeOf;
  var get = Ember.get;


  var emberAssign = assign || merge;

  /**
    Ember Data 2.0 Serializer:
  
    In Ember Data a Serializer is used to serialize and deserialize
    records when they are transferred in and out of an external source.
    This process involves normalizing property names, transforming
    attribute values and serializing relationships.
  
    By default, Ember Data uses and recommends the `JSONAPISerializer`.
  
    `JSONSerializer` is useful for simpler or legacy backends that may
    not support the http://jsonapi.org/ spec.
  
    For example, given the following `User` model and JSON payload:
  
    ```app/models/user.js
    import DS from 'ember-data';
  
    export default DS.Model.extend({
      friends: DS.hasMany('user'),
      house: DS.belongsTo('location'),
  
      name: DS.attr('string')
    });
    ```
  
    ```js
    {
      id: 1,
      name: 'Sebastian',
      friends: [3, 4],
      links: {
        house: '/houses/lefkada'
      }
    }
    ```
  
    `JSONSerializer` will normalize the JSON payload to the JSON API format that the
    Ember Data store expects.
  
    You can customize how JSONSerializer processes its payload by passing options in
    the `attrs` hash or by subclassing the `JSONSerializer` and overriding hooks:
  
      - To customize how a single record is normalized, use the `normalize` hook.
      - To customize how `JSONSerializer` normalizes the whole server response, use the
        `normalizeResponse` hook.
      - To customize how `JSONSerializer` normalizes a specific response from the server,
        use one of the many specific `normalizeResponse` hooks.
      - To customize how `JSONSerializer` normalizes your id, attributes or relationships,
        use the `extractId`, `extractAttributes` and `extractRelationships` hooks.
  
    The `JSONSerializer` normalization process follows these steps:
  
      - `normalizeResponse` - entry method to the serializer.
      - `normalizeCreateRecordResponse` - a `normalizeResponse` for a specific operation is called.
      - `normalizeSingleResponse`|`normalizeArrayResponse` - for methods like `createRecord` we expect
        a single record back, while for methods like `findAll` we expect multiple records back.
      - `normalize` - `normalizeArray` iterates and calls `normalize` for each of its records while `normalizeSingle`
        calls it once. This is the method you most likely want to subclass.
      - `extractId` | `extractAttributes` | `extractRelationships` - `normalize` delegates to these methods to
        turn the record payload into the JSON API format.
  
    @class JSONSerializer
    @namespace DS
    @extends DS.Serializer
  */
  var JSONSerializer = _serializer.default.extend({

    /**
      The `primaryKey` is used when serializing and deserializing
      data. Ember Data always uses the `id` property to store the id of
      the record. The external source may not always follow this
      convention. In these cases it is useful to override the
      `primaryKey` property to match the `primaryKey` of your external
      store.
       Example
       ```app/serializers/application.js
      import DS from 'ember-data';
       export default DS.JSONSerializer.extend({
        primaryKey: '_id'
      });
      ```
       @property primaryKey
      @type {String}
      @default 'id'
    */
    primaryKey: 'id',

    /**
      The `attrs` object can be used to declare a simple mapping between
      property names on `DS.Model` records and payload keys in the
      serialized JSON object representing the record. An object with the
      property `key` can also be used to designate the attribute's key on
      the response payload.
       Example
       ```app/models/person.js
      import DS from 'ember-data';
       export default DS.Model.extend({
        firstName: DS.attr('string'),
        lastName: DS.attr('string'),
        occupation: DS.attr('string'),
        admin: DS.attr('boolean')
      });
      ```
       ```app/serializers/person.js
      import DS from 'ember-data';
       export default DS.JSONSerializer.extend({
        attrs: {
          admin: 'is_admin',
          occupation: { key: 'career' }
        }
      });
      ```
       You can also remove attributes by setting the `serialize` key to
      `false` in your mapping object.
       Example
       ```app/serializers/person.js
      import DS from 'ember-data';
       export default DS.JSONSerializer.extend({
        attrs: {
          admin: { serialize: false },
          occupation: { key: 'career' }
        }
      });
      ```
       When serialized:
       ```javascript
      {
        "firstName": "Harry",
        "lastName": "Houdini",
        "career": "magician"
      }
      ```
       Note that the `admin` is now not included in the payload.
       @property attrs
      @type {Object}
    */
    mergedProperties: ['attrs'],

    applyTransforms: function (typeClass, data) {
      var _this = this;

      var attributes = get(typeClass, 'attributes');

      typeClass.eachTransformedAttribute(function (key, typeClass) {
        if (data[key] === undefined) {
          return;
        }

        var transform = _this.transformFor(typeClass);
        var transformMeta = attributes.get(key);
        data[key] = transform.deserialize(data[key], transformMeta.options);
      });

      return data;
    },
    normalizeResponse: function (store, primaryModelClass, payload, id, requestType) {
      switch (requestType) {
        case 'findRecord':
          return this.normalizeFindRecordResponse.apply(this, arguments);
        case 'queryRecord':
          return this.normalizeQueryRecordResponse.apply(this, arguments);
        case 'findAll':
          return this.normalizeFindAllResponse.apply(this, arguments);
        case 'findBelongsTo':
          return this.normalizeFindBelongsToResponse.apply(this, arguments);
        case 'findHasMany':
          return this.normalizeFindHasManyResponse.apply(this, arguments);
        case 'findMany':
          return this.normalizeFindManyResponse.apply(this, arguments);
        case 'query':
          return this.normalizeQueryResponse.apply(this, arguments);
        case 'createRecord':
          return this.normalizeCreateRecordResponse.apply(this, arguments);
        case 'deleteRecord':
          return this.normalizeDeleteRecordResponse.apply(this, arguments);
        case 'updateRecord':
          return this.normalizeUpdateRecordResponse.apply(this, arguments);
      }
    },
    normalizeFindRecordResponse: function (store, primaryModelClass, payload, id, requestType) {
      return this.normalizeSingleResponse.apply(this, arguments);
    },
    normalizeQueryRecordResponse: function (store, primaryModelClass, payload, id, requestType) {
      return this.normalizeSingleResponse.apply(this, arguments);
    },
    normalizeFindAllResponse: function (store, primaryModelClass, payload, id, requestType) {
      return this.normalizeArrayResponse.apply(this, arguments);
    },
    normalizeFindBelongsToResponse: function (store, primaryModelClass, payload, id, requestType) {
      return this.normalizeSingleResponse.apply(this, arguments);
    },
    normalizeFindHasManyResponse: function (store, primaryModelClass, payload, id, requestType) {
      return this.normalizeArrayResponse.apply(this, arguments);
    },
    normalizeFindManyResponse: function (store, primaryModelClass, payload, id, requestType) {
      return this.normalizeArrayResponse.apply(this, arguments);
    },
    normalizeQueryResponse: function (store, primaryModelClass, payload, id, requestType) {
      return this.normalizeArrayResponse.apply(this, arguments);
    },
    normalizeCreateRecordResponse: function (store, primaryModelClass, payload, id, requestType) {
      return this.normalizeSaveResponse.apply(this, arguments);
    },
    normalizeDeleteRecordResponse: function (store, primaryModelClass, payload, id, requestType) {
      return this.normalizeSaveResponse.apply(this, arguments);
    },
    normalizeUpdateRecordResponse: function (store, primaryModelClass, payload, id, requestType) {
      return this.normalizeSaveResponse.apply(this, arguments);
    },
    normalizeSaveResponse: function (store, primaryModelClass, payload, id, requestType) {
      return this.normalizeSingleResponse.apply(this, arguments);
    },
    normalizeSingleResponse: function (store, primaryModelClass, payload, id, requestType) {
      return this._normalizeResponse(store, primaryModelClass, payload, id, requestType, true);
    },
    normalizeArrayResponse: function (store, primaryModelClass, payload, id, requestType) {
      return this._normalizeResponse(store, primaryModelClass, payload, id, requestType, false);
    },
    _normalizeResponse: function (store, primaryModelClass, payload, id, requestType, isSingle) {
      var documentHash = {
        data: null,
        included: []
      };

      var meta = this.extractMeta(store, primaryModelClass, payload);
      if (meta) {
        (false && Ember.assert('The `meta` returned from `extractMeta` has to be an object, not "' + typeOf(meta) + '".', typeOf(meta) === 'object'));

        documentHash.meta = meta;
      }

      if (isSingle) {
        var _normalize = this.normalize(primaryModelClass, payload),
            data = _normalize.data,
            included = _normalize.included;

        documentHash.data = data;
        if (included) {
          documentHash.included = included;
        }
      } else {
        var ret = new Array(payload.length);
        for (var i = 0, l = payload.length; i < l; i++) {
          var item = payload[i];

          var _normalize2 = this.normalize(primaryModelClass, item),
              _data = _normalize2.data,
              _included = _normalize2.included;

          if (_included) {
            var _documentHash$include;

            (_documentHash$include = documentHash.included).push.apply(_documentHash$include, _toConsumableArray(_included));
          }
          ret[i] = _data;
        }

        documentHash.data = ret;
      }

      return documentHash;
    },
    normalize: function (modelClass, resourceHash) {
      var data = null;

      if (resourceHash) {
        this.normalizeUsingDeclaredMapping(modelClass, resourceHash);
        if (typeOf(resourceHash.links) === 'object') {
          this.normalizeUsingDeclaredMapping(modelClass, resourceHash.links);
        }

        data = {
          id: this.extractId(modelClass, resourceHash),
          type: modelClass.modelName,
          attributes: this.extractAttributes(modelClass, resourceHash),
          relationships: this.extractRelationships(modelClass, resourceHash)
        };

        this.applyTransforms(modelClass, data.attributes);
      }

      return { data: data };
    },
    extractId: function (modelClass, resourceHash) {
      var primaryKey = get(this, 'primaryKey');
      var id = resourceHash[primaryKey];
      return (0, _private.coerceId)(id);
    },
    extractAttributes: function (modelClass, resourceHash) {
      var _this2 = this;

      var attributeKey = void 0;
      var attributes = {};

      modelClass.eachAttribute(function (key) {
        attributeKey = _this2.keyForAttribute(key, 'deserialize');
        if (resourceHash[attributeKey] !== undefined) {
          attributes[key] = resourceHash[attributeKey];
        }
      });

      return attributes;
    },
    extractRelationship: function (relationshipModelName, relationshipHash) {
      if (isNone(relationshipHash)) {
        return null;
      }
      /*
        When `relationshipHash` is an object it usually means that the relationship
        is polymorphic. It could however also be embedded resources that the
        EmbeddedRecordsMixin has be able to process.
      */
      if (typeOf(relationshipHash) === 'object') {
        if (relationshipHash.id) {
          relationshipHash.id = (0, _private.coerceId)(relationshipHash.id);
        }

        var modelClass = this.store.modelFor(relationshipModelName);
        if (relationshipHash.type && !(0, _private.modelHasAttributeOrRelationshipNamedType)(modelClass)) {

          if ((0, _private.isEnabled)("ds-payload-type-hooks")) {
            var modelName = this.modelNameFromPayloadType(relationshipHash.type);
            var deprecatedModelNameLookup = this.modelNameFromPayloadKey(relationshipHash.type);

            if (modelName !== deprecatedModelNameLookup && this._hasCustomModelNameFromPayloadKey()) {
              (false && !(false) && Ember.deprecate("You used modelNameFromPayloadKey to customize how a type is normalized. Use modelNameFromPayloadType instead", false, {
                id: 'ds.json-serializer.deprecated-type-for-polymorphic-relationship',
                until: '3.0.0'
              }));


              modelName = deprecatedModelNameLookup;
            }

            relationshipHash.type = modelName;
          } else {
            relationshipHash.type = this.modelNameFromPayloadKey(relationshipHash.type);
          }
        }
        return relationshipHash;
      }
      return { id: (0, _private.coerceId)(relationshipHash), type: relationshipModelName };
    },
    extractPolymorphicRelationship: function (relationshipModelName, relationshipHash, relationshipOptions) {
      return this.extractRelationship(relationshipModelName, relationshipHash);
    },
    extractRelationships: function (modelClass, resourceHash) {
      var _this3 = this;

      var relationships = {};

      modelClass.eachRelationship(function (key, relationshipMeta) {
        var relationship = null;
        var relationshipKey = _this3.keyForRelationship(key, relationshipMeta.kind, 'deserialize');
        if (resourceHash[relationshipKey] !== undefined) {
          var data = null;
          var relationshipHash = resourceHash[relationshipKey];
          if (relationshipMeta.kind === 'belongsTo') {
            if (relationshipMeta.options.polymorphic) {
              // extracting a polymorphic belongsTo may need more information
              // than the type and the hash (which might only be an id) for the
              // relationship, hence we pass the key, resource and
              // relationshipMeta too
              data = _this3.extractPolymorphicRelationship(relationshipMeta.type, relationshipHash, { key: key, resourceHash: resourceHash, relationshipMeta: relationshipMeta });
            } else {
              data = _this3.extractRelationship(relationshipMeta.type, relationshipHash);
            }
          } else if (relationshipMeta.kind === 'hasMany') {
            if (!isNone(relationshipHash)) {
              data = new Array(relationshipHash.length);
              for (var i = 0, l = relationshipHash.length; i < l; i++) {
                var item = relationshipHash[i];
                data[i] = _this3.extractRelationship(relationshipMeta.type, item);
              }
            }
          }
          relationship = { data: data };
        }

        var linkKey = _this3.keyForLink(key, relationshipMeta.kind);
        if (resourceHash.links && resourceHash.links[linkKey] !== undefined) {
          var related = resourceHash.links[linkKey];
          relationship = relationship || {};
          relationship.links = { related: related };
        }

        if (relationship) {
          relationships[key] = relationship;
        }
      });

      return relationships;
    },
    modelNameFromPayloadKey: function (key) {
      return (0, _private.normalizeModelName)(key);
    },
    normalizeRelationships: function (typeClass, hash) {
      var _this4 = this;

      var payloadKey = void 0;

      if (this.keyForRelationship) {
        typeClass.eachRelationship(function (key, relationship) {
          payloadKey = _this4.keyForRelationship(key, relationship.kind, 'deserialize');
          if (key === payloadKey) {
            return;
          }
          if (hash[payloadKey] === undefined) {
            return;
          }

          hash[key] = hash[payloadKey];
          delete hash[payloadKey];
        });
      }
    },
    normalizeUsingDeclaredMapping: function (modelClass, hash) {
      var attrs = get(this, 'attrs');
      var normalizedKey = void 0;
      var payloadKey = void 0;

      if (attrs) {
        for (var key in attrs) {
          normalizedKey = payloadKey = this._getMappedKey(key, modelClass);

          if (hash[payloadKey] === undefined) {
            continue;
          }

          if (get(modelClass, 'attributes').has(key)) {
            normalizedKey = this.keyForAttribute(key);
          }

          if (get(modelClass, 'relationshipsByName').has(key)) {
            normalizedKey = this.keyForRelationship(key);
          }

          if (payloadKey !== normalizedKey) {
            hash[normalizedKey] = hash[payloadKey];
            delete hash[payloadKey];
          }
        }
      }
    },
    _getMappedKey: function (key, modelClass) {
      (false && Ember.warn('There is no attribute or relationship with the name `' + key + '` on `' + modelClass.modelName + '`. Check your serializers attrs hash.', get(modelClass, 'attributes').has(key) || get(modelClass, 'relationshipsByName').has(key), {
        id: 'ds.serializer.no-mapped-attrs-key'
      }));


      var attrs = get(this, 'attrs');
      var mappedKey = void 0;
      if (attrs && attrs[key]) {
        mappedKey = attrs[key];
        //We need to account for both the { title: 'post_title' } and
        //{ title: { key: 'post_title' }} forms
        if (mappedKey.key) {
          mappedKey = mappedKey.key;
        }
        if (typeof mappedKey === 'string') {
          key = mappedKey;
        }
      }

      return key;
    },
    _canSerialize: function (key) {
      var attrs = get(this, 'attrs');

      return !attrs || !attrs[key] || attrs[key].serialize !== false;
    },
    _mustSerialize: function (key) {
      var attrs = get(this, 'attrs');

      return attrs && attrs[key] && attrs[key].serialize === true;
    },
    shouldSerializeHasMany: function (snapshot, key, relationship) {
      if (this._shouldSerializeHasMany !== JSONSerializer.prototype._shouldSerializeHasMany) {
        (false && !(false) && Ember.deprecate('The private method _shouldSerializeHasMany has been promoted to the public API. Please remove the underscore to use the public shouldSerializeHasMany method.', false, {
          id: 'ds.serializer.private-should-serialize-has-many',
          until: '3.0.0'
        }));
      }

      return this._shouldSerializeHasMany(snapshot, key, relationship);
    },
    _shouldSerializeHasMany: function (snapshot, key, relationship) {
      var relationshipType = snapshot.type.determineRelationshipType(relationship, this.store);
      if (this._mustSerialize(key)) {
        return true;
      }
      return this._canSerialize(key) && (relationshipType === 'manyToNone' || relationshipType === 'manyToMany');
    },
    serialize: function (snapshot, options) {
      var _this5 = this;

      var json = {};

      if (options && options.includeId) {
        if ((0, _private.isEnabled)('ds-serialize-id')) {
          this.serializeId(snapshot, json, get(this, 'primaryKey'));
        } else {
          var id = snapshot.id;
          if (id) {
            json[get(this, 'primaryKey')] = id;
          }
        }
      }

      snapshot.eachAttribute(function (key, attribute) {
        _this5.serializeAttribute(snapshot, json, key, attribute);
      });

      snapshot.eachRelationship(function (key, relationship) {
        if (relationship.kind === 'belongsTo') {
          _this5.serializeBelongsTo(snapshot, json, relationship);
        } else if (relationship.kind === 'hasMany') {
          _this5.serializeHasMany(snapshot, json, relationship);
        }
      });

      return json;
    },
    serializeIntoHash: function (hash, typeClass, snapshot, options) {
      emberAssign(hash, this.serialize(snapshot, options));
    },
    serializeAttribute: function (snapshot, json, key, attribute) {

      if (this._canSerialize(key)) {
        var type = attribute.type;
        var value = snapshot.attr(key);
        if (type) {
          var transform = this.transformFor(type);
          value = transform.serialize(value, attribute.options);
        }

        // if provided, use the mapping provided by `attrs` in
        // the serializer
        var payloadKey = this._getMappedKey(key, snapshot.type);

        if (payloadKey === key && this.keyForAttribute) {
          payloadKey = this.keyForAttribute(key, 'serialize');
        }

        json[payloadKey] = value;
      }
    },
    serializeBelongsTo: function (snapshot, json, relationship) {
      var key = relationship.key;

      if (this._canSerialize(key)) {
        var belongsToId = snapshot.belongsTo(key, { id: true });

        // if provided, use the mapping provided by `attrs` in
        // the serializer
        var payloadKey = this._getMappedKey(key, snapshot.type);
        if (payloadKey === key && this.keyForRelationship) {
          payloadKey = this.keyForRelationship(key, "belongsTo", "serialize");
        }

        //Need to check whether the id is there for new&async records
        if (isNone(belongsToId)) {
          json[payloadKey] = null;
        } else {
          json[payloadKey] = belongsToId;
        }

        if (relationship.options.polymorphic) {
          this.serializePolymorphicType(snapshot, json, relationship);
        }
      }
    },
    serializeHasMany: function (snapshot, json, relationship) {
      var key = relationship.key;
      var shouldSerializeHasMany = '_shouldSerializeHasMany';
      if ((0, _private.isEnabled)("ds-check-should-serialize-relationships")) {
        shouldSerializeHasMany = 'shouldSerializeHasMany';
      }

      if (this[shouldSerializeHasMany](snapshot, key, relationship)) {
        var hasMany = snapshot.hasMany(key, { ids: true });
        if (hasMany !== undefined) {
          // if provided, use the mapping provided by `attrs` in
          // the serializer
          var payloadKey = this._getMappedKey(key, snapshot.type);
          if (payloadKey === key && this.keyForRelationship) {
            payloadKey = this.keyForRelationship(key, "hasMany", "serialize");
          }

          json[payloadKey] = hasMany;
          // TODO support for polymorphic manyToNone and manyToMany relationships
        }
      }
    },
    serializePolymorphicType: function () {},
    extractMeta: function (store, modelClass, payload) {
      if (payload && payload['meta'] !== undefined) {
        var meta = payload.meta;
        delete payload.meta;
        return meta;
      }
    },
    extractErrors: function (store, typeClass, payload, id) {
      var _this6 = this;

      if (payload && typeof payload === 'object' && payload.errors) {
        payload = (0, _private.errorsArrayToHash)(payload.errors);

        this.normalizeUsingDeclaredMapping(typeClass, payload);

        typeClass.eachAttribute(function (name) {
          var key = _this6.keyForAttribute(name, 'deserialize');
          if (key !== name && payload[key] !== undefined) {
            payload[name] = payload[key];
            delete payload[key];
          }
        });

        typeClass.eachRelationship(function (name) {
          var key = _this6.keyForRelationship(name, 'deserialize');
          if (key !== name && payload[key] !== undefined) {
            payload[name] = payload[key];
            delete payload[key];
          }
        });
      }

      return payload;
    },
    keyForAttribute: function (key, method) {
      return key;
    },
    keyForRelationship: function (key, typeClass, method) {
      return key;
    },
    keyForLink: function (key, kind) {
      return key;
    },
    transformFor: function (attributeType, skipAssertion) {
      var transform = (0, _private.getOwner)(this).lookup('transform:' + attributeType);

      (false && Ember.assert("Unable to find transform for '" + attributeType + "'", skipAssertion || !!transform));


      return transform;
    }
  });

  if ((0, _private.isEnabled)("ds-payload-type-hooks")) {

    JSONSerializer.reopen({
      modelNameFromPayloadType: function (type) {
        return (0, _private.normalizeModelName)(type);
      },
      _hasCustomModelNameFromPayloadKey: function () {
        return this.modelNameFromPayloadKey !== JSONSerializer.prototype.modelNameFromPayloadKey;
      }
    });
  }

  if ((0, _private.isEnabled)("ds-serialize-id")) {

    JSONSerializer.reopen({
      serializeId: function (snapshot, json, primaryKey) {
        var id = snapshot.id;

        if (id) {
          json[primaryKey] = id;
        }
      }
    });
  }

  exports.default = JSONSerializer;
});
define('ember-data/serializers/rest', ['exports', 'ember-inflector', 'ember-data/serializers/json', 'ember-data/-private'], function (exports, _emberInflector, _json, _private) {
  'use strict';

  exports.__esModule = true;

  function _toConsumableArray(arr) {
    if (Array.isArray(arr)) {
      for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
        arr2[i] = arr[i];
      }

      return arr2;
    } else {
      return Array.from(arr);
    }
  }

  var typeOf = Ember.typeOf;
  var isNone = Ember.isNone;
  var makeArray = Ember.makeArray;
  var camelize = Ember.String.camelize;


  /**
    Normally, applications will use the `RESTSerializer` by implementing
    the `normalize` method.
  
    This allows you to do whatever kind of munging you need, and is
    especially useful if your server is inconsistent and you need to
    do munging differently for many different kinds of responses.
  
    See the `normalize` documentation for more information.
  
    ## Across the Board Normalization
  
    There are also a number of hooks that you might find useful to define
    across-the-board rules for your payload. These rules will be useful
    if your server is consistent, or if you're building an adapter for
    an infrastructure service, like Firebase, and want to encode service
    conventions.
  
    For example, if all of your keys are underscored and all-caps, but
    otherwise consistent with the names you use in your models, you
    can implement across-the-board rules for how to convert an attribute
    name in your model to a key in your JSON.
  
    ```app/serializers/application.js
    import DS from 'ember-data';
    import { underscore } from '@ember/string';
  
    export default DS.RESTSerializer.extend({
      keyForAttribute(attr, method) {
        return underscore(attr).toUpperCase();
      }
    });
    ```
  
    You can also implement `keyForRelationship`, which takes the name
    of the relationship as the first parameter, the kind of
    relationship (`hasMany` or `belongsTo`) as the second parameter, and
    the method (`serialize` or `deserialize`) as the third parameter.
  
    @class RESTSerializer
    @namespace DS
    @extends DS.JSONSerializer
  */
  var RESTSerializer = _json.default.extend({
    keyForPolymorphicType: function (key, typeClass, method) {
      var relationshipKey = this.keyForRelationship(key);

      return relationshipKey + 'Type';
    },
    normalize: function (modelClass, resourceHash, prop) {
      if (this.normalizeHash && this.normalizeHash[prop]) {
        (false && !(false) && Ember.deprecate('`RESTSerializer.normalizeHash` has been deprecated. Please use `serializer.normalize` to modify the payload of single resources.', false, {
          id: 'ds.serializer.normalize-hash-deprecated',
          until: '3.0.0'
        }));

        this.normalizeHash[prop](resourceHash);
      }
      return this._super(modelClass, resourceHash);
    },
    _normalizeArray: function (store, modelName, arrayHash, prop) {
      var _this = this;

      var documentHash = {
        data: [],
        included: []
      };

      var modelClass = store.modelFor(modelName);
      var serializer = store.serializerFor(modelName);

      makeArray(arrayHash).forEach(function (hash) {
        var _normalizePolymorphic = _this._normalizePolymorphicRecord(store, hash, prop, modelClass, serializer),
            data = _normalizePolymorphic.data,
            included = _normalizePolymorphic.included;

        documentHash.data.push(data);
        if (included) {
          var _documentHash$include;

          (_documentHash$include = documentHash.included).push.apply(_documentHash$include, _toConsumableArray(included));
        }
      });

      return documentHash;
    },
    _normalizePolymorphicRecord: function (store, hash, prop, primaryModelClass, primarySerializer) {
      var serializer = primarySerializer;
      var modelClass = primaryModelClass;

      var primaryHasTypeAttribute = (0, _private.modelHasAttributeOrRelationshipNamedType)(primaryModelClass);

      if (!primaryHasTypeAttribute && hash.type) {
        // Support polymorphic records in async relationships
        var modelName = void 0;
        if ((0, _private.isEnabled)("ds-payload-type-hooks")) {
          modelName = this.modelNameFromPayloadType(hash.type);
          var deprecatedModelNameLookup = this.modelNameFromPayloadKey(hash.type);

          if (modelName !== deprecatedModelNameLookup && !this._hasCustomModelNameFromPayloadType() && this._hasCustomModelNameFromPayloadKey()) {
            (false && !(false) && Ember.deprecate("You are using modelNameFromPayloadKey to normalize the type for a polymorphic relationship. This is has been deprecated in favor of modelNameFromPayloadType", false, {
              id: 'ds.rest-serializer.deprecated-model-name-for-polymorphic-type',
              until: '3.0.0'
            }));


            modelName = deprecatedModelNameLookup;
          }
        } else {
          modelName = this.modelNameFromPayloadKey(hash.type);
        }

        if (store._hasModelFor(modelName)) {
          serializer = store.serializerFor(modelName);
          modelClass = store.modelFor(modelName);
        }
      }

      return serializer.normalize(modelClass, hash, prop);
    },
    _normalizeResponse: function (store, primaryModelClass, payload, id, requestType, isSingle) {
      var documentHash = {
        data: null,
        included: []
      };

      var meta = this.extractMeta(store, primaryModelClass, payload);
      if (meta) {
        (false && Ember.assert('The `meta` returned from `extractMeta` has to be an object, not "' + typeOf(meta) + '".', typeOf(meta) === 'object'));

        documentHash.meta = meta;
      }

      var keys = Object.keys(payload);

      for (var i = 0, length = keys.length; i < length; i++) {
        var prop = keys[i];
        var modelName = prop;
        var forcedSecondary = false;

        /*
          If you want to provide sideloaded records of the same type that the
          primary data you can do that by prefixing the key with `_`.
           Example
           ```
          {
            users: [
              { id: 1, title: 'Tom', manager: 3 },
              { id: 2, title: 'Yehuda', manager: 3 }
            ],
            _users: [
              { id: 3, title: 'Tomster' }
            ]
          }
          ```
           This forces `_users` to be added to `included` instead of `data`.
         */
        if (prop.charAt(0) === '_') {
          forcedSecondary = true;
          modelName = prop.substr(1);
        }

        var typeName = this.modelNameFromPayloadKey(modelName);
        if (!store.modelFactoryFor(typeName)) {
          (false && Ember.warn(this.warnMessageNoModelForKey(modelName, typeName), false, {
            id: 'ds.serializer.model-for-key-missing'
          }));

          continue;
        }

        var isPrimary = !forcedSecondary && this.isPrimaryType(store, typeName, primaryModelClass);
        var value = payload[prop];

        if (value === null) {
          continue;
        }

        if (false) {
          var isQueryRecordAnArray = requestType === 'queryRecord' && isPrimary && Array.isArray(value);
          var message = "The adapter returned an array for the primary data of a `queryRecord` response. This is deprecated as `queryRecord` should return a single record.";

          (false && !(!isQueryRecordAnArray) && Ember.deprecate(message, !isQueryRecordAnArray, {
            id: 'ds.serializer.rest.queryRecord-array-response',
            until: '3.0'
          }));
        }

        /*
          Support primary data as an object instead of an array.
           Example
           ```
          {
            user: { id: 1, title: 'Tom', manager: 3 }
          }
          ```
         */
        if (isPrimary && !Array.isArray(value)) {
          var _normalizePolymorphic2 = this._normalizePolymorphicRecord(store, value, prop, primaryModelClass, this),
              _data = _normalizePolymorphic2.data,
              _included = _normalizePolymorphic2.included;

          documentHash.data = _data;
          if (_included) {
            var _documentHash$include2;

            (_documentHash$include2 = documentHash.included).push.apply(_documentHash$include2, _toConsumableArray(_included));
          }
          continue;
        }

        var _normalizeArray = this._normalizeArray(store, typeName, value, prop),
            data = _normalizeArray.data,
            included = _normalizeArray.included;

        if (included) {
          var _documentHash$include3;

          (_documentHash$include3 = documentHash.included).push.apply(_documentHash$include3, _toConsumableArray(included));
        }

        if (isSingle) {
          data.forEach(function (resource) {

            /*
              Figures out if this is the primary record or not.
               It's either:
               1. The record with the same ID as the original request
              2. If it's a newly created record without an ID, the first record
                 in the array
             */
            var isUpdatedRecord = isPrimary && (0, _private.coerceId)(resource.id) === id;
            var isFirstCreatedRecord = isPrimary && !id && !documentHash.data;

            if (isFirstCreatedRecord || isUpdatedRecord) {
              documentHash.data = resource;
            } else {
              documentHash.included.push(resource);
            }
          });
        } else {
          if (isPrimary) {
            documentHash.data = data;
          } else {
            if (data) {
              var _documentHash$include4;

              (_documentHash$include4 = documentHash.included).push.apply(_documentHash$include4, _toConsumableArray(data));
            }
          }
        }
      }

      return documentHash;
    },
    isPrimaryType: function (store, typeName, primaryTypeClass) {
      return store.modelFor(typeName) === primaryTypeClass;
    },
    pushPayload: function (store, payload) {
      var documentHash = {
        data: [],
        included: []
      };

      for (var prop in payload) {
        var modelName = this.modelNameFromPayloadKey(prop);
        if (!store.modelFactoryFor(modelName)) {
          (false && Ember.warn(this.warnMessageNoModelForKey(prop, modelName), false, {
            id: 'ds.serializer.model-for-key-missing'
          }));

          continue;
        }
        var type = store.modelFor(modelName);
        var typeSerializer = store.serializerFor(type.modelName);

        makeArray(payload[prop]).forEach(function (hash) {
          var _typeSerializer$norma = typeSerializer.normalize(type, hash, prop),
              data = _typeSerializer$norma.data,
              included = _typeSerializer$norma.included;

          documentHash.data.push(data);
          if (included) {
            var _documentHash$include5;

            (_documentHash$include5 = documentHash.included).push.apply(_documentHash$include5, _toConsumableArray(included));
          }
        });
      }

      if ((0, _private.isEnabled)('ds-pushpayload-return')) {
        return store.push(documentHash);
      } else {
        store.push(documentHash);
      }
    },
    modelNameFromPayloadKey: function (key) {
      return (0, _emberInflector.singularize)((0, _private.normalizeModelName)(key));
    },
    serialize: function (snapshot, options) {
      return this._super.apply(this, arguments);
    },
    serializeIntoHash: function (hash, typeClass, snapshot, options) {
      var normalizedRootKey = this.payloadKeyFromModelName(typeClass.modelName);
      hash[normalizedRootKey] = this.serialize(snapshot, options);
    },
    payloadKeyFromModelName: function (modelName) {
      return camelize(modelName);
    },
    serializePolymorphicType: function (snapshot, json, relationship) {
      var key = relationship.key;
      var typeKey = this.keyForPolymorphicType(key, relationship.type, 'serialize');
      var belongsTo = snapshot.belongsTo(key);

      // old way of getting the key for the polymorphic type
      key = this.keyForAttribute ? this.keyForAttribute(key, "serialize") : key;
      key = key + 'Type';

      // The old way of serializing the type of a polymorphic record used
      // `keyForAttribute`, which is not correct. The next code checks if the old
      // way is used and if it differs from the new way of using
      // `keyForPolymorphicType`. If this is the case, a deprecation warning is
      // logged and the old way is restored (so nothing breaks).
      if (key !== typeKey && this.keyForPolymorphicType === RESTSerializer.prototype.keyForPolymorphicType) {
        (false && !(false) && Ember.deprecate("The key to serialize the type of a polymorphic record is created via keyForAttribute which has been deprecated. Use the keyForPolymorphicType hook instead.", false, {
          id: 'ds.rest-serializer.deprecated-key-for-polymorphic-type',
          until: '3.0.0'
        }));


        typeKey = key;
      }

      if (isNone(belongsTo)) {
        json[typeKey] = null;
      } else {
        if ((0, _private.isEnabled)("ds-payload-type-hooks")) {
          json[typeKey] = this.payloadTypeFromModelName(belongsTo.modelName);
        } else {
          json[typeKey] = camelize(belongsTo.modelName);
        }
      }
    },
    extractPolymorphicRelationship: function (relationshipType, relationshipHash, relationshipOptions) {
      var key = relationshipOptions.key,
          resourceHash = relationshipOptions.resourceHash,
          relationshipMeta = relationshipOptions.relationshipMeta;


      // A polymorphic belongsTo relationship can be present in the payload
      // either in the form where the `id` and the `type` are given:
      //
      //   {
      //     message: { id: 1, type: 'post' }
      //   }
      //
      // or by the `id` and a `<relationship>Type` attribute:
      //
      //   {
      //     message: 1,
      //     messageType: 'post'
      //   }
      //
      // The next code checks if the latter case is present and returns the
      // corresponding JSON-API representation. The former case is handled within
      // the base class JSONSerializer.
      var isPolymorphic = relationshipMeta.options.polymorphic;
      var typeProperty = this.keyForPolymorphicType(key, relationshipType, 'deserialize');

      if (isPolymorphic && resourceHash[typeProperty] !== undefined && typeof relationshipHash !== 'object') {

        if ((0, _private.isEnabled)("ds-payload-type-hooks")) {

          var payloadType = resourceHash[typeProperty];
          var type = this.modelNameFromPayloadType(payloadType);
          var deprecatedTypeLookup = this.modelNameFromPayloadKey(payloadType);

          if (payloadType !== deprecatedTypeLookup && !this._hasCustomModelNameFromPayloadType() && this._hasCustomModelNameFromPayloadKey()) {
            (false && !(false) && Ember.deprecate("You are using modelNameFromPayloadKey to normalize the type for a polymorphic relationship. This has been deprecated in favor of modelNameFromPayloadType", false, {
              id: 'ds.rest-serializer.deprecated-model-name-for-polymorphic-type',
              until: '3.0.0'
            }));


            type = deprecatedTypeLookup;
          }

          return {
            id: relationshipHash,
            type: type
          };
        } else {

          var _type = this.modelNameFromPayloadKey(resourceHash[typeProperty]);
          return {
            id: relationshipHash,
            type: _type
          };
        }
      }

      return this._super.apply(this, arguments);
    }
  });

  if ((0, _private.isEnabled)("ds-payload-type-hooks")) {

    RESTSerializer.reopen({
      modelNameFromPayloadType: function (payloadType) {
        return (0, _emberInflector.singularize)((0, _private.normalizeModelName)(payloadType));
      },
      payloadTypeFromModelName: function (modelName) {
        return camelize(modelName);
      },
      _hasCustomModelNameFromPayloadKey: function () {
        return this.modelNameFromPayloadKey !== RESTSerializer.prototype.modelNameFromPayloadKey;
      },
      _hasCustomModelNameFromPayloadType: function () {
        return this.modelNameFromPayloadType !== RESTSerializer.prototype.modelNameFromPayloadType;
      },
      _hasCustomPayloadTypeFromModelName: function () {
        return this.payloadTypeFromModelName !== RESTSerializer.prototype.payloadTypeFromModelName;
      },
      _hasCustomPayloadKeyFromModelName: function () {
        return this.payloadKeyFromModelName !== RESTSerializer.prototype.payloadKeyFromModelName;
      }
    });
  }

  if (false) {
    RESTSerializer.reopen({
      warnMessageNoModelForKey: function (prop, typeKey) {
        return 'Encountered "' + prop + '" in payload, but no model was found for model name "' + typeKey + '" (resolved model name using ' + this.constructor.toString() + '.modelNameFromPayloadKey("' + prop + '"))';
      }
    });
  }

  exports.default = RESTSerializer;
});
define('ember-data/setup-container', ['exports', 'ember-data/-private', 'ember-data/serializers/json-api', 'ember-data/serializers/json', 'ember-data/serializers/rest', 'ember-data/adapters/json-api', 'ember-data/adapters/rest', 'ember-data/transforms/number', 'ember-data/transforms/date', 'ember-data/transforms/string', 'ember-data/transforms/boolean'], function (exports, _private, _jsonApi, _json, _rest, _jsonApi2, _rest2, _number, _date, _string, _boolean) {
  'use strict';

  exports.__esModule = true;
  exports.default = setupContainer;


  function has(applicationOrRegistry, fullName) {
    if (applicationOrRegistry.has) {
      // < 2.1.0
      return applicationOrRegistry.has(fullName);
    } else {
      // 2.1.0+
      return applicationOrRegistry.hasRegistration(fullName);
    }
  }

  /*
   Configures a registry for use with an Ember-Data
   store. Accepts an optional namespace argument.
  
   @method initializeStore
   @param {Ember.Registry} registry
   */
  function initializeStore(registry) {
    // registry.optionsForType for Ember < 2.1.0
    // application.registerOptionsForType for Ember 2.1.0+
    var registerOptionsForType = registry.registerOptionsForType || registry.optionsForType;
    registerOptionsForType.call(registry, 'serializer', { singleton: false });
    registerOptionsForType.call(registry, 'adapter', { singleton: false });

    registry.register('serializer:-default', _json.default);
    registry.register('serializer:-rest', _rest.default);
    registry.register('adapter:-rest', _rest2.default);

    registry.register('adapter:-json-api', _jsonApi2.default);
    registry.register('serializer:-json-api', _jsonApi.default);

    if (!has(registry, 'service:store')) {
      registry.register('service:store', _private.Store);
    }
  }

  /*
   Configures a registry with injections on Ember applications
   for the Ember-Data store. Accepts an optional namespace argument.
  
   @method initializeDebugAdapter
   @param {Ember.Registry} registry
   */
  function initializeDataAdapter(registry) {
    registry.register('data-adapter:main', _private.DebugAdapter);
  }

  /*
   Configures a registry with injections on Ember applications
   for the Ember-Data store. Accepts an optional namespace argument.
  
   @method initializeStoreInjections
   @param {Ember.Registry} registry
   */
  function initializeStoreInjections(registry) {
    // registry.injection for Ember < 2.1.0
    // application.inject for Ember 2.1.0+
    var inject = registry.inject || registry.injection;
    inject.call(registry, 'controller', 'store', 'service:store');
    inject.call(registry, 'route', 'store', 'service:store');
    inject.call(registry, 'data-adapter', 'store', 'service:store');
  }

  /*
   Configures a registry for use with Ember-Data
   transforms.
  
   @method initializeTransforms
   @param {Ember.Registry} registry
   */
  function initializeTransforms(registry) {
    registry.register('transform:boolean', _boolean.default);
    registry.register('transform:date', _date.default);
    registry.register('transform:number', _number.default);
    registry.register('transform:string', _string.default);
  }

  function setupContainer(application) {
    initializeDataAdapter(application);
    initializeTransforms(application);
    initializeStoreInjections(application);
    initializeStore(application);
  }
});
define('ember-data/store', ['exports', 'ember-data/-private'], function (exports, _private) {
  'use strict';

  exports.__esModule = true;
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _private.Store;
    }
  });
});
define('ember-data/transform', ['exports', 'ember-data/transforms/transform'], function (exports, _transform) {
  'use strict';

  exports.__esModule = true;
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _transform.default;
    }
  });
});
define('ember-data/transforms/boolean', ['exports', 'ember-data/transforms/transform'], function (exports, _transform) {
  'use strict';

  exports.__esModule = true;
  var isNone = Ember.isNone;
  exports.default = _transform.default.extend({
    deserialize: function (serialized, options) {
      if (isNone(serialized) && options.allowNull === true) {
        return null;
      }

      var type = typeof serialized;
      if (type === "boolean") {
        return serialized;
      } else if (type === "string") {
        return (/^(true|t|1)$/i.test(serialized)
        );
      } else if (type === "number") {
        return serialized === 1;
      } else {
        return false;
      }
    },
    serialize: function (deserialized, options) {
      if (isNone(deserialized) && options.allowNull === true) {
        return null;
      }

      return Boolean(deserialized);
    }
  });
});
define('ember-data/transforms/date', ['exports', 'ember-data/transforms/transform'], function (exports, _transform) {
  'use strict';

  exports.__esModule = true;


  Ember.Date = Ember.Date || {};

  /**
   Date.parse with progressive enhancement for ISO 8601 <https://github.com/csnover/js-iso8601>
  
   © 2011 Colin Snover <http://zetafleet.com>
  
   Released under MIT license.
  
   @class Date
   @namespace Ember
   @static
   @deprecated
   */
  Ember.Date.parse = function (date) {
    (false && !(false) && Ember.deprecate('Ember.Date.parse is deprecated because Safari 5-, IE8-, and\n    Firefox 3.6- are no longer supported (see\n    https://github.com/csnover/js-iso8601 for the history of this issue).\n    Please use Date.parse instead', false, {
      id: 'ds.ember.date.parse-deprecate',
      until: '3.0.0'
    }));


    return Date.parse(date);
  };

  /**
   The `DS.DateTransform` class is used to serialize and deserialize
   date attributes on Ember Data record objects. This transform is used
   when `date` is passed as the type parameter to the
   [DS.attr](../../data#method_attr) function. It uses the [`ISO 8601`](https://en.wikipedia.org/wiki/ISO_8601)
   standard.
  
   ```app/models/score.js
   import DS from 'ember-data';
  
   export default DS.Model.extend({
      value: DS.attr('number'),
      player: DS.belongsTo('player'),
      date: DS.attr('date')
    });
   ```
  
   @class DateTransform
   @extends DS.Transform
   @namespace DS
   */

  exports.default = _transform.default.extend({
    deserialize: function (serialized) {
      var type = typeof serialized;

      if (type === "string") {
        var offset = serialized.indexOf('+');

        if (offset !== -1 && serialized.length - 3 === offset) {
          (false && !(false) && Ember.deprecate('The ECMA2015 Spec for ISO 8601 dates does not allow for shorthand timezone offsets such as +00.\n          Ember Data\'s normalization of date\'s allowing for this shorthand has been deprecated, please update your API to return\n          UTC dates formatted with \xB1hh:mm timezone offsets or implement a custom UTC transform.', false, {
            id: 'ds.attr.date.normalize-utc',
            until: '3.0.0'
          }));

          return new Date(serialized + ':00');

          // this is a phantom specific bug fix in which +0000 is not supported
        } else if (offset !== -1 && serialized.length - 5 === offset) {
          offset += 3;
          return new Date(serialized.slice(0, offset) + ':' + serialized.slice(offset));
        }
        return new Date(serialized);
      } else if (type === "number") {
        return new Date(serialized);
      } else if (serialized === null || serialized === undefined) {
        // if the value is null return null
        // if the value is not present in the data return undefined
        return serialized;
      } else {
        return null;
      }
    },
    serialize: function (date) {
      if (date instanceof Date && !isNaN(date)) {
        return date.toISOString();
      } else {
        return null;
      }
    }
  });
});
define('ember-data/transforms/number', ['exports', 'ember-data/transforms/transform'], function (exports, _transform) {
  'use strict';

  exports.__esModule = true;
  var empty = Ember.isEmpty;


  function isNumber(value) {
    return value === value && value !== Infinity && value !== -Infinity;
  }

  /**
    The `DS.NumberTransform` class is used to serialize and deserialize
    numeric attributes on Ember Data record objects. This transform is
    used when `number` is passed as the type parameter to the
    [DS.attr](../../data#method_attr) function.
  
    Usage
  
    ```app/models/score.js
    import DS from 'ember-data';
  
    export default DS.Model.extend({
      value: DS.attr('number'),
      player: DS.belongsTo('player'),
      date: DS.attr('date')
    });
    ```
  
    @class NumberTransform
    @extends DS.Transform
    @namespace DS
   */
  exports.default = _transform.default.extend({
    deserialize: function (serialized) {
      var transformed = void 0;

      if (empty(serialized)) {
        return null;
      } else {
        transformed = Number(serialized);

        return isNumber(transformed) ? transformed : null;
      }
    },
    serialize: function (deserialized) {
      var transformed = void 0;

      if (empty(deserialized)) {
        return null;
      } else {
        transformed = Number(deserialized);

        return isNumber(transformed) ? transformed : null;
      }
    }
  });
});
define('ember-data/transforms/string', ['exports', 'ember-data/transforms/transform'], function (exports, _transform) {
  'use strict';

  exports.__esModule = true;
  var none = Ember.isNone;
  exports.default = _transform.default.extend({
    deserialize: function (serialized) {
      return none(serialized) ? null : String(serialized);
    },
    serialize: function (deserialized) {
      return none(deserialized) ? null : String(deserialized);
    }
  });
});
define('ember-data/transforms/transform', ['exports'], function (exports) {
  'use strict';

  exports.__esModule = true;
  var EmberObject = Ember.Object;
  exports.default = EmberObject.extend({
    /**
      When given a deserialized value from a record attribute this
      method must return the serialized value.
       Example
       ```javascript
      import { isEmpty } from '@ember/utils';
       serialize(deserialized, options) {
        return isEmpty(deserialized) ? null : Number(deserialized);
      }
      ```
       @method serialize
      @param deserialized The deserialized value
      @param options hash of options passed to `DS.attr`
      @return The serialized value
    */
    serialize: null,

    /**
      When given a serialize value from a JSON object this method must
      return the deserialized value for the record attribute.
       Example
       ```javascript
      deserialize(serialized, options) {
        return empty(serialized) ? null : Number(serialized);
      }
      ```
       @method deserialize
      @param serialized The serialized value
      @param options hash of options passed to `DS.attr`
      @return The deserialized value
    */
    deserialize: null
  });
});
define("ember-data/version", ["exports"], function (exports) {
  "use strict";

  exports.__esModule = true;
  exports.default = "2.18.0-beta.1";
});
define("ember-inflector", ["module", "exports", "ember-inflector/lib/system", "ember-inflector/lib/ext/string"], function (module, exports, _system) {
  "use strict";

  exports.__esModule = true;
  exports.defaultRules = exports.singularize = exports.pluralize = undefined;


  _system.Inflector.defaultRules = _system.defaultRules;
  Ember.Inflector = _system.Inflector;

  Ember.String.pluralize = _system.pluralize;
  Ember.String.singularize = _system.singularize;

  exports.default = _system.Inflector;
  exports.pluralize = _system.pluralize;
  exports.singularize = _system.singularize;
  exports.defaultRules = _system.defaultRules;


  if (typeof define !== 'undefined' && define.amd) {
    define('ember-inflector', ['exports'], function (__exports__) {
      __exports__['default'] = _system.Inflector;
      __exports__.pluralize = _system.pluralize;
      __exports__.singularize = _system.singularize;

      return __exports__;
    });
  } else if (typeof module !== 'undefined' && module['exports']) {
    module['exports'] = _system.Inflector;
    _system.Inflector.singularize = _system.singularize;
    _system.Inflector.pluralize = _system.pluralize;
  }
});
define('ember-inflector/lib/ext/string', ['ember-inflector/lib/system/string'], function (_string) {
  'use strict';

  if (Ember.EXTEND_PROTOTYPES === true || Ember.EXTEND_PROTOTYPES.String) {
    /**
      See {{#crossLink "Ember.String/pluralize"}}{{/crossLink}}
       @method pluralize
      @for String
    */
    String.prototype.pluralize = function () {
      return (0, _string.pluralize)(this);
    };

    /**
      See {{#crossLink "Ember.String/singularize"}}{{/crossLink}}
       @method singularize
      @for String
    */
    String.prototype.singularize = function () {
      return (0, _string.singularize)(this);
    };
  }
});
define('ember-inflector/lib/helpers/pluralize', ['exports', 'ember-inflector', 'ember-inflector/lib/utils/make-helper'], function (exports, _emberInflector, _makeHelper) {
  'use strict';

  exports.__esModule = true;
  exports.default = (0, _makeHelper.default)(function (params, hash) {
    var count = void 0,
        word = void 0,
        withoutCount = false;

    if (params.length === 1) {
      word = params[0];
      return (0, _emberInflector.pluralize)(word);
    } else {
      count = params[0];
      word = params[1];

      if (hash["without-count"]) {
        withoutCount = hash["without-count"];
      }

      if (parseFloat(count) !== 1) {
        word = (0, _emberInflector.pluralize)(word);
      }

      return withoutCount ? word : count + " " + word;
    }
  });
});
define('ember-inflector/lib/helpers/singularize', ['exports', 'ember-inflector', 'ember-inflector/lib/utils/make-helper'], function (exports, _emberInflector, _makeHelper) {
  'use strict';

  exports.__esModule = true;
  exports.default = (0, _makeHelper.default)(function (params) {
    return (0, _emberInflector.singularize)(params[0]);
  });
});
define("ember-inflector/lib/system", ["exports", "ember-inflector/lib/system/inflector", "ember-inflector/lib/system/string", "ember-inflector/lib/system/inflections"], function (exports, _inflector, _string, _inflections) {
  "use strict";

  exports.__esModule = true;
  exports.defaultRules = exports.pluralize = exports.singularize = exports.Inflector = undefined;


  _inflector.default.inflector = new _inflector.default(_inflections.default);

  exports.Inflector = _inflector.default;
  exports.singularize = _string.singularize;
  exports.pluralize = _string.pluralize;
  exports.defaultRules = _inflections.default;
});
define('ember-inflector/lib/system/inflections', ['exports'], function (exports) {
  'use strict';

  exports.__esModule = true;
  exports.default = {
    plurals: [[/$/, 's'], [/s$/i, 's'], [/^(ax|test)is$/i, '$1es'], [/(octop|vir)us$/i, '$1i'], [/(octop|vir)i$/i, '$1i'], [/(alias|status|bonus)$/i, '$1es'], [/(bu)s$/i, '$1ses'], [/(buffal|tomat)o$/i, '$1oes'], [/([ti])um$/i, '$1a'], [/([ti])a$/i, '$1a'], [/sis$/i, 'ses'], [/(?:([^f])fe|([lr])f)$/i, '$1$2ves'], [/(hive)$/i, '$1s'], [/([^aeiouy]|qu)y$/i, '$1ies'], [/(x|ch|ss|sh)$/i, '$1es'], [/(matr|vert|ind)(?:ix|ex)$/i, '$1ices'], [/^(m|l)ouse$/i, '$1ice'], [/^(m|l)ice$/i, '$1ice'], [/^(ox)$/i, '$1en'], [/^(oxen)$/i, '$1'], [/(quiz)$/i, '$1zes']],

    singular: [[/s$/i, ''], [/(ss)$/i, '$1'], [/(n)ews$/i, '$1ews'], [/([ti])a$/i, '$1um'], [/((a)naly|(b)a|(d)iagno|(p)arenthe|(p)rogno|(s)ynop|(t)he)(sis|ses)$/i, '$1sis'], [/(^analy)(sis|ses)$/i, '$1sis'], [/([^f])ves$/i, '$1fe'], [/(hive)s$/i, '$1'], [/(tive)s$/i, '$1'], [/([lr])ves$/i, '$1f'], [/([^aeiouy]|qu)ies$/i, '$1y'], [/(s)eries$/i, '$1eries'], [/(m)ovies$/i, '$1ovie'], [/(x|ch|ss|sh)es$/i, '$1'], [/^(m|l)ice$/i, '$1ouse'], [/(bus)(es)?$/i, '$1'], [/(o)es$/i, '$1'], [/(shoe)s$/i, '$1'], [/(cris|test)(is|es)$/i, '$1is'], [/^(a)x[ie]s$/i, '$1xis'], [/(octop|vir)(us|i)$/i, '$1us'], [/(alias|status|bonus)(es)?$/i, '$1'], [/^(ox)en/i, '$1'], [/(vert|ind)ices$/i, '$1ex'], [/(matr)ices$/i, '$1ix'], [/(quiz)zes$/i, '$1'], [/(database)s$/i, '$1']],

    irregularPairs: [['person', 'people'], ['man', 'men'], ['child', 'children'], ['sex', 'sexes'], ['move', 'moves'], ['cow', 'kine'], ['zombie', 'zombies']],

    uncountable: ['equipment', 'information', 'rice', 'money', 'species', 'series', 'fish', 'sheep', 'jeans', 'police']
  };
});
define('ember-inflector/lib/system/inflector', ['exports'], function (exports) {
  'use strict';

  exports.__esModule = true;


  var capitalize = Ember.String.capitalize;

  var BLANK_REGEX = /^\s*$/;
  var LAST_WORD_DASHED_REGEX = /([\w/-]+[_/\s-])([a-z\d]+$)/;
  var LAST_WORD_CAMELIZED_REGEX = /([\w/\s-]+)([A-Z][a-z\d]*$)/;
  var CAMELIZED_REGEX = /[A-Z][a-z\d]*$/;

  function loadUncountable(rules, uncountable) {
    for (var i = 0, length = uncountable.length; i < length; i++) {
      rules.uncountable[uncountable[i].toLowerCase()] = true;
    }
  }

  function loadIrregular(rules, irregularPairs) {
    var pair;

    for (var i = 0, length = irregularPairs.length; i < length; i++) {
      pair = irregularPairs[i];

      //pluralizing
      rules.irregular[pair[0].toLowerCase()] = pair[1];
      rules.irregular[pair[1].toLowerCase()] = pair[1];

      //singularizing
      rules.irregularInverse[pair[1].toLowerCase()] = pair[0];
      rules.irregularInverse[pair[0].toLowerCase()] = pair[0];
    }
  }

  /**
    Inflector.Ember provides a mechanism for supplying inflection rules for your
    application. Ember includes a default set of inflection rules, and provides an
    API for providing additional rules.
  
    Examples:
  
    Creating an inflector with no rules.
  
    ```js
    var inflector = new Ember.Inflector();
    ```
  
    Creating an inflector with the default ember ruleset.
  
    ```js
    var inflector = new Ember.Inflector(Ember.Inflector.defaultRules);
  
    inflector.pluralize('cow'); //=> 'kine'
    inflector.singularize('kine'); //=> 'cow'
    ```
  
    Creating an inflector and adding rules later.
  
    ```javascript
    var inflector = Ember.Inflector.inflector;
  
    inflector.pluralize('advice'); // => 'advices'
    inflector.uncountable('advice');
    inflector.pluralize('advice'); // => 'advice'
  
    inflector.pluralize('formula'); // => 'formulas'
    inflector.irregular('formula', 'formulae');
    inflector.pluralize('formula'); // => 'formulae'
  
    // you would not need to add these as they are the default rules
    inflector.plural(/$/, 's');
    inflector.singular(/s$/i, '');
    ```
  
    Creating an inflector with a nondefault ruleset.
  
    ```javascript
    var rules = {
      plurals:  [
        [ /$/, 's' ]
      ],
      singular: [
        [ /\s$/, '' ]
      ],
      irregularPairs: [
        [ 'cow', 'kine' ]
      ],
      uncountable: [ 'fish' ]
    };
  
    var inflector = new Ember.Inflector(rules);
    ```
  
    @class Inflector
    @namespace Ember
  */
  function Inflector(ruleSet) {
    ruleSet = ruleSet || {};
    ruleSet.uncountable = ruleSet.uncountable || makeDictionary();
    ruleSet.irregularPairs = ruleSet.irregularPairs || makeDictionary();

    var rules = this.rules = {
      plurals: ruleSet.plurals || [],
      singular: ruleSet.singular || [],
      irregular: makeDictionary(),
      irregularInverse: makeDictionary(),
      uncountable: makeDictionary()
    };

    loadUncountable(rules, ruleSet.uncountable);
    loadIrregular(rules, ruleSet.irregularPairs);

    this.enableCache();
  }

  if (!Object.create && !Object.create(null).hasOwnProperty) {
    throw new Error("This browser does not support Object.create(null), please polyfil with es5-sham: http://git.io/yBU2rg");
  }

  function makeDictionary() {
    var cache = Object.create(null);
    cache['_dict'] = null;
    delete cache['_dict'];
    return cache;
  }

  Inflector.prototype = {
    /**
      @public
       As inflections can be costly, and commonly the same subset of words are repeatedly
      inflected an optional cache is provided.
       @method enableCache
    */
    enableCache: function () {
      this.purgeCache();

      this.singularize = function (word) {
        this._cacheUsed = true;
        return this._sCache[word] || (this._sCache[word] = this._singularize(word));
      };

      this.pluralize = function (word) {
        this._cacheUsed = true;
        return this._pCache[word] || (this._pCache[word] = this._pluralize(word));
      };
    },

    /**
      @public
       @method purgedCache
    */
    purgeCache: function () {
      this._cacheUsed = false;
      this._sCache = makeDictionary();
      this._pCache = makeDictionary();
    },

    /**
      @public
      disable caching
       @method disableCache;
    */
    disableCache: function () {
      this._sCache = null;
      this._pCache = null;
      this.singularize = function (word) {
        return this._singularize(word);
      };

      this.pluralize = function (word) {
        return this._pluralize(word);
      };
    },

    /**
      @method plural
      @param {RegExp} regex
      @param {String} string
    */
    plural: function (regex, string) {
      if (this._cacheUsed) {
        this.purgeCache();
      }
      this.rules.plurals.push([regex, string.toLowerCase()]);
    },

    /**
      @method singular
      @param {RegExp} regex
      @param {String} string
    */
    singular: function (regex, string) {
      if (this._cacheUsed) {
        this.purgeCache();
      }
      this.rules.singular.push([regex, string.toLowerCase()]);
    },

    /**
      @method uncountable
      @param {String} regex
    */
    uncountable: function (string) {
      if (this._cacheUsed) {
        this.purgeCache();
      }
      loadUncountable(this.rules, [string.toLowerCase()]);
    },

    /**
      @method irregular
      @param {String} singular
      @param {String} plural
    */
    irregular: function (singular, plural) {
      if (this._cacheUsed) {
        this.purgeCache();
      }
      loadIrregular(this.rules, [[singular, plural]]);
    },

    /**
      @method pluralize
      @param {String} word
    */
    pluralize: function (word) {
      return this._pluralize(word);
    },

    _pluralize: function (word) {
      return this.inflect(word, this.rules.plurals, this.rules.irregular);
    },
    /**
      @method singularize
      @param {String} word
    */
    singularize: function (word) {
      return this._singularize(word);
    },

    _singularize: function (word) {
      return this.inflect(word, this.rules.singular, this.rules.irregularInverse);
    },

    /**
      @protected
       @method inflect
      @param {String} word
      @param {Object} typeRules
      @param {Object} irregular
    */
    inflect: function (word, typeRules, irregular) {
      var inflection, substitution, result, lowercase, wordSplit, firstPhrase, lastWord, isBlank, isCamelized, rule, isUncountable;

      isBlank = !word || BLANK_REGEX.test(word);

      isCamelized = CAMELIZED_REGEX.test(word);
      firstPhrase = "";

      if (isBlank) {
        return word;
      }

      lowercase = word.toLowerCase();
      wordSplit = LAST_WORD_DASHED_REGEX.exec(word) || LAST_WORD_CAMELIZED_REGEX.exec(word);

      if (wordSplit) {
        firstPhrase = wordSplit[1];
        lastWord = wordSplit[2].toLowerCase();
      }

      isUncountable = this.rules.uncountable[lowercase] || this.rules.uncountable[lastWord];

      if (isUncountable) {
        return word;
      }

      for (rule in irregular) {
        if (lowercase.match(rule + "$")) {
          substitution = irregular[rule];

          if (isCamelized && irregular[lastWord]) {
            substitution = capitalize(substitution);
            rule = capitalize(rule);
          }

          return word.replace(new RegExp(rule, 'i'), substitution);
        }
      }

      for (var i = typeRules.length, min = 0; i > min; i--) {
        inflection = typeRules[i - 1];
        rule = inflection[0];

        if (rule.test(word)) {
          break;
        }
      }

      inflection = inflection || [];

      rule = inflection[0];
      substitution = inflection[1];

      result = word.replace(rule, substitution);

      return result;
    }
  };

  exports.default = Inflector;
});
define('ember-inflector/lib/system/string', ['exports', 'ember-inflector/lib/system/inflector'], function (exports, _inflector) {
  'use strict';

  exports.__esModule = true;
  exports.singularize = exports.pluralize = undefined;


  function pluralize(word) {
    return _inflector.default.inflector.pluralize(word);
  }

  function singularize(word) {
    return _inflector.default.inflector.singularize(word);
  }

  exports.pluralize = pluralize;
  exports.singularize = singularize;
});
define('ember-inflector/lib/utils/make-helper', ['exports'], function (exports) {
  'use strict';

  exports.__esModule = true;
  exports.default = makeHelper;
  function makeHelper(helperFunction) {
    if (Ember.Helper) {
      return Ember.Helper.helper(helperFunction);
    }
    if (Ember.HTMLBars) {
      return Ember.HTMLBars.makeBoundHelper(helperFunction);
    }
    return Ember.Handlebars.makeBoundHelper(helperFunction);
  }
});
define('ember-load-initializers', ['exports'], function (exports) {
  'use strict';

  exports.__esModule = true;

  exports.default = function (app, prefix) {
    var initializerPrefix = prefix + '/initializers/';
    var instanceInitializerPrefix = prefix + '/instance-initializers/';
    var initializers = [];
    var instanceInitializers = [];
    // this is 2 pass because generally the first pass is the problem
    // and is reduced, and resolveInitializer has potential to deopt
    var moduleNames = Object.keys(requirejs._eak_seen);
    for (var i = 0; i < moduleNames.length; i++) {
      var moduleName = moduleNames[i];
      if (moduleName.lastIndexOf(initializerPrefix, 0) === 0) {
        initializers.push(moduleName);
      } else if (moduleName.lastIndexOf(instanceInitializerPrefix, 0) === 0) {
        instanceInitializers.push(moduleName);
      }
    }
    registerInitializers(app, initializers);
    registerInstanceInitializers(app, instanceInitializers);
  };

  function resolveInitializer(moduleName) {
    var module = require(moduleName, null, null, true);
    if (!module) {
      throw new Error(moduleName + ' must export an initializer.');
    }
    var initializer = module['default'];
    if (!initializer.name) {
      initializer.name = moduleName.slice(moduleName.lastIndexOf('/') + 1);
    }
    return initializer;
  }

  function registerInitializers(app, moduleNames) {
    for (var i = 0; i < moduleNames.length; i++) {
      app.initializer(resolveInitializer(moduleNames[i]));
    }
  }

  function registerInstanceInitializers(app, moduleNames) {
    for (var i = 0; i < moduleNames.length; i++) {
      app.instanceInitializer(resolveInitializer(moduleNames[i]));
    }
  }
});
define('ember', [], function() {
  return {
    default: Ember
  };
});



require("ember-data");
require("ember-load-initializers")["default"](Ember.Application, "ember-data");
;(function() {
  var global = require('ember-data/-private/global').default;
  var DS = require('ember-data').default;
  Object.defineProperty(global, 'DS', {
    get: function() {
      return DS;
    }
  });
})();
}).call(this);
;(function() {
  function processEmberDataShims() {
    var shims = {
      'ember-data':                          { default: DS },
      'ember-data/model':                    { default: DS.Model },
      'ember-data/mixins/embedded-records':  { default: DS.EmbeddedRecordsMixin },
      'ember-data/serializers/rest':         { default: DS.RESTSerializer },
      'ember-data/serializers/active-model': { default: DS.ActiveModelSerializer },
      'ember-data/serializers/json':         { default: DS.JSONSerializer },
      'ember-data/serializers/json-api':     { default: DS.JSONAPISerializer },
      'ember-data/serializer':               { default: DS.Serializer },
      'ember-data/adapters/json-api':        { default: DS.JSONAPIAdapter },
      'ember-data/adapters/rest':            { default: DS.RESTAdapter },
      'ember-data/adapter':                  { default: DS.Adapter },
      'ember-data/adapters/active-model':    { default: DS.ActiveModelAdapter },
      'ember-data/store':                    { default: DS.Store },
      'ember-data/transform':                { default: DS.Transform },
      'ember-data/attr':                     { default: DS.attr },
      'ember-data/relationships':            { hasMany: DS.hasMany, belongsTo: DS.belongsTo }
    };

    for (var moduleName in shims) {
      generateModule(moduleName, shims[moduleName]);
    }
  }

  function generateModule(name, values) {
    define(name, [], function() {
      'use strict';

      return values;
    });
  }

  if (typeof define !== 'undefined' && define && define.petal) {
    processEmberDataShims();
  }
})();

//# sourceMappingURL=ember-data.map
