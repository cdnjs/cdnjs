/**
 * API Bound Models for AngularJS
 * @version v0.2.1 - 2013-10-08
 * @link https://github.com/angular-platanus/angular-restmod
 * @author Ignacio Baixas <iobaixas@gmai.com>
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */
'use strict';

/**
 * restmod
 *
 * Usage - Model Definition:
 *
 *  module('module'.factory('PagedModel', ['$restModel', function($restModel) {
 *    return $restmodFactory()
 *      .on('before_collection_fetch', function() {
 *      });
 *      .classDefine('nextPage', function() {
 *      });
 *  }]));
 *
 *  module('module').factory('Book', ['$restModel', 'Author', Chapter', function($restModel, Author, Chapter) {
 *    return $restModel('api/books', {
 *      name: { primary: true },
 *      seen: { def: false, ignore: true },
 *      createdAt: { parse: 'railsDate' },
 *      chapters: { hasMany: Chapter },
 *      author: { hasOne: Author }
 *    }, function(_builder) {
 *      _builder.parse(function(_rawData, _localData) {
 *
 *      });
 *      _builder.render(function(_localData, _toData) {
 *
 *      });
 *      _builder.before_create(function() {
 *        // Do something with book before persisting!
 *        });
 *    }, PagedModel);
 *  }]);
 *
 * Usage - Services/Controllers:
 *
 *  module('module').service('Library', ['Author', 'Book', function(Book) {
 *
 *    ...
 *
 *    // Get all books with more than 100 pages
 *    books = Book.$search({ minPages: 100 })
 *
 *    // Get all chapters that belong to the Book with name 'angular-for-dummies'
 *    chapters = Author.mock('angular-for-dummies').chapters().fetch();
 *
 *    // Add a chapter to the same book
 *    chapter = Book.mock('angular-for-dummies').chapters().create({ title: 'Angular And IE7', pages: 30 });
 *
 *    // Modify a book's author (without fetching data)
 *    Book.mock('angular-for-dummies').author().update({ name: 'A. Dummy' });
 *
 *    // Modify a loaded book
 *    book.rating = 3;
 *    book.$save();
 *
 *    ...
 *
 *  }]);
 *
 */

angular.module('plRestmod', ['ng']);


'use strict';

/**
 * Simple RESTful URL Builder implementation.
 */

angular.module('plRestmod').
  constant('RestUrlBuilderFactory', (function() {

    var RestUrlBuilderFactory = function(_primary, _baseUrl) {
      this.primary = _primary;
      this.baseUrl = _baseUrl;
    };

    RestUrlBuilderFactory.prototype = {
      get: function(_resUrl) {

        if(this.baseUrl) _resUrl = this.baseUrl + '/' + _resUrl;

        var defaults = {
          primary: this.primary
        };

        return {
          /**
           * called by builder when a primary: true attribute is found.
           */
          setPrimaryKey: function(_key) {
            defaults.primary = _key;
          },
          /**
           * called by collection whenever implicit key is used
           */
          inferKey: function(/* _context */) {
            return defaults.primary;
          },
          /**
           * Called by resource to resolve the resource's url
           */
          resourceUrl: function(_res) {
            var partial = _res.$partial, pk;

            if(!partial) {
              // if no partial is provided, attempt to use pk with base url
              pk = _res[defaults.primary];
              if(pk === null || pk === undefined) return null;
              if(_resUrl) return _resUrl + '/' + pk; // this preceeds context
            }

            if(_res.$context) {
              // if a context is provided attemp to use it with partial or pk
              var base = _col.$context.$url();
              if(!base) return null;
              return base + '/' + (partial || pk);
            }

            // finally return partial if given, if not return null.
            return (partial || null);
          },
          /**
           * Called by collections when an url is needed
           *
           * @param  {[type]} _col [description]
           * @return {[type]}      [description]
           */
          collectionUrl: function(_col) {
            if(_col.$context) {
              var base = _col.$context.$url();
              if(!base) return null;
              return _col.$partial ? base + '/' + _col.$partial : base;
            } else if(_col.$partial) {
              return _col.$partial;
            } else {
              return _resUrl;
            }
          },
          /**
           * called by an unbound resource whenever save is called
           */
          createUrl: function(_res) {
            if(_res.$context) return _res.$context.$url();
            return _resUrl;
          },
          /**
           * called by a bound resource whenever save is called
           */
          updateUrl: function(_res) {
            return this.resourceUrl(_res);
          },
          /**
           * called by a bound resource whenever destroy is called
           */
          destroyUrl: function(_res) {
            return this.resourceUrl(_res);
          }
        };
      }
    };

    return RestUrlBuilderFactory;
  })());

'use strict';

var $restmodMinErr = angular.noop; //minErr('$restmod');

/**
 * The Model provider
 */

angular.module('plRestmod').
  provider('$restmod', [function() {

  // Cache som angular stuff
  var forEach = angular.forEach,
      extend = angular.extend,
      noop = angular.noop,
      isFunction = angular.isFunction,
      isObject = angular.isObject,
      isArray = angular.isArray,
      isString = angular.isString,
      arraySlice = Array.prototype.slice;

  // snake to camel -case function
  function toCamelCase(_key) {
    if (!isString(_key)) return _key;

    return _key.replace(/_[\w\d]/g, function (match, index, string) {
      return index === 0 ? match : string.charAt(index + 1).toUpperCase();
    });
  }

  // camel to snake -case function
  function toSnakeCase(_key) {
    if (!isString(_key)) return _key;

    // TODO match the latest logic from Active Support
    return _key.replace(/[A-Z]/g, function (match, index) {
      return index === 0 ? match : '_' + match.toLowerCase();
    });
  }

  /* Module Globals */
  var URL_BUILDER_FC = null, // The url builder factory.
      TR_CACHE = {
        'rails-date': function(_string) {
          if(!_string) return _string;
          var m = _string.match(/(\d{2,4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})/);
          if(m) return new Date(parseInt(m[1],10), parseInt(m[2],10)-1, parseInt(m[3],10),
            parseInt(m[4],10), parseInt(m[5],10), parseInt(m[6],10));
          m = _string.match(/(\d{2,4})-(\d{2})-(\d{2})/);
          if(m) return new Date(parseInt(m[1],10), parseInt(m[2],10)-1, parseInt(m[3],10));
          m = _string.match(/(\d{2,4})\/(\d{2})\/(\d{2})/);
          if(m) return new Date(parseInt(m[1],10), parseInt(m[2],10)-1, parseInt(m[3],10));
          return null;
        }
      };

  return {

    /**
     * Change the default url builder.
     *
     * The provided factory must implement a `get` method
     * that receives the resource baseUrl and returns an
     * url builder.
     *
     * TODO: describe url builder interface
     */
    setUrlBuilder: function(_urlBuilderFactory) {
      URL_BUILDER_FC = _urlBuilderFactory;
      return this;
    },
    /**
     * Register a new transformation function.
     * TODO: describe datatype interface
     */
    addTransformation: function(_name, _fun) {
      if(isObject(_name)) {
        extend(TR_CACHE, _name);
      } else {
        TR_CACHE[_name] = _fun;
      }
      return this;
    },
    /**
     * Registers a new datatype.
     * TODO: describe datatype interface
     */
    addDatatype: function(_name, _handler) {
      // TODO.
    },
    /**
     * The factory function, returns a new model builder factory.
     *
     * The model builder factory can be used to generate new model builder instances
     * given an url and a series of metadata objects, once generated, the model builder
     * can be used generate a new model.
     *
     * The `_url` parameter also accepts an url builder implementation.
     */
    $get: ['$http', '$q', '$injector', function($http, $q, $injector) {

      // If no url builder was provided at configuration, inject the default factory
      if(!URL_BUILDER_FC) URL_BUILDER_FC = new ($injector.get('RestUrlBuilderFactory'))('id');

      return function modelBuilderFactory(_url/* , _meta */) {

        var urlBuilder = isObject(_url) ? _url : URL_BUILDER_FC.get(_url),
          ignored = {
            $partial: true,
            $context: true,
            $promise: true,
            $pending: true,
            $error: true
          },
          defaults = {},
          parsers = {},
          renderers = {},
          callbacks = {};

        // runs all callbacks associated with a given hook.
        function callback(_hook, _ctx /*, args */) {
          var cbs = callbacks[_hook];
          if(cbs) {
            var i = 0, args = arraySlice.call(arguments, 2), cb;
            while((cb = cbs[i++])) {
              // execute callback
              cb.apply(_ctx, args);
            }
          }
        }

        // common http behavior, used both in collections and model instances.
        function send(_target, _config, _success, _error) {

          // IDEA: comm queuing, never allow two simultaneous requests.
          // if(this.$pending) {
          //  this.$promise.then(function() {
          //    this.$send(_config, _success, _error);
          //    });
          // }

          _target.$pending = true;
          _target.$error = false;
          _target.$promise = $http(_config).then(function(_response) {

            // IDEA: a response interceptor could add additional error states based on returned data,
            // this could allow for additional error state behaviours (for example, an interceptor
            // could watch for rails validation errors and store them in the model, then return false
            // to trigger a promise queue error).

            _target.$pending = false;

            (_success||noop).call(_target, _response);

            return _target;

          }, function(_response) {

            _target.$pending = false;
            _target.$error = true;

            (_error||noop).call(_target, _response);

            return $q.reject(_target);
          });
        }

        /**
         * The Model Type definition
         *
         * TODO: Describe model type
         */

        /**
         * Model constructor
         *
         * @param {object} _init Initial model data [optional]
         * @param {string} _url Model url override or partial url if context is given [optional]
         * @param {Model|Model.collection} _context Model context [internal]
         */
        var Model = function(_init, _url, _context) {

          this.$pending = false;
          this.$partial = _url;
          this.$context = _context;

          var key, value;

          // apply defaults
          for(key in defaults) {
            if(defaults.hasOwnProperty(key)) {
              value = defaults[key];
              this[key] = (typeof value === 'function') ? value.apply(this) : value;
            }
          }

          if(_init) {
            // copy initial values (if given)
            for(key in _init) {
              if (_init.hasOwnProperty(key)) {
                this[key] = _init[key];
              }
            }
          }
        };

        Model.prototype = extend({
          /**
           * Returns the url this object is bound to.
           * @return {string} bound url.
           */
          $url: function() {
            return urlBuilder.resourceUrl(this);
          },
          /**
           * Allows calling custom hooks, usefull when implementing custom actions.
           *
           * Passes through every additional arguments to registered hooks.
           * Hooks are registered using the ModelBuilder.on method.
           *
           * @param {string} _hook hook name
           * @return {Model} self
           */
          $callback: function(_hook /*, args */) {
            callback(this, _hook, arraySlice.call(arguments, 1));
            return this;
          },
          /**
           * Low level communication method, wraps the $http api.
           *
           * @param {object} _options $http options
           * @param {function} _success sucess callback (sync)
           * @param {function} _error error callback (sync)
           * @return {Model} self
           */
          $send: function(_options, _success, _error) {
            send(this, _options, _success, _error);
            return this;
          },
          /**
           * Promise chaining method, keeps the model instance as the chain context.
           *
           * Usage: col.$fetch().$then(function() { });
           *
           * @param {function} _success success callback
           * @param {function} _error error callback
           * @return {Model} self
           */
          $then: function(_success, _error) {
            this.$promise = this.$promise.then(_success, _error);
            return this;
          },
          /**
           * Feed raw data to this instance.
           *
           * @param {object} _raw Raw data to be fed
           * @return {Model} this
           */
          $feed: function(_raw) {
            // var original = {}; TODO: enable change queries
            var key, camelKey, parser, value;
            for(key in _raw) {
              if(_raw.hasOwnProperty(key)) {
                camelKey = toCamelCase(key);
                parser = parsers[camelKey];
                value = parser ? parser.call(this, _raw[key]) : _raw[key];

                // original[camelKey] = value;
                if(value !== undefined) this[camelKey] = value;
              }
            }

            callback('after_feed', this, _raw);

            // this.$original = original;
            return this;
          },
          /**
           * Generate data to be sent to the server when creating/updating the resource.
           *
           * @return {Model} this
           */
          $render: function() {
            var key, snakeKey, renderer, result = {};
            for(key in this) {
              if(this.hasOwnProperty(key) && !ignored[key]) {
                snakeKey = toSnakeCase(key);
                renderer = renderers[snakeKey];
                result[snakeKey] = renderer ? renderer.call(this, this[key]) : this[key];
              }
            }

            callback('before_render', this, result);

            return result;
          },
          /**
           * Begin a server request for updated resource data.
           *
           * The request's promise is provided as the $promise property.
           *
           * @return {Model} this
           */
          $fetch: function() {
            // verify that instance has a bound url
            if(!this.$url()) throw $restmodMinErr('notsup', 'Cannot fetch an unbound resource');
            return this.$send({ method: 'GET', url: this.$url(), feed: true }, function(_response) {
              var data = _response.data;
              if (!data || isArray(data)) {
                throw $restmodMinErr('badresp', 'Expected object while feeding resource');
              }
              this.$feed(data);
            });
          },
          /**
           * Begin a server request to create/update resource.
           *
           * The request's promise is provided as the $promise property.
           *
           * @return {Model} this
           */
          $save: function() {
            var url;

            if(this.$url()) {
              // If bound, update

              url = urlBuilder.updateUrl(this);
              if(!url) throw $restmodMinErr('notsup', 'Update is not supported by this resource');

              callback('before_update', this);
              callback('before_save', this);
              return this.$send({ method: 'PUT', url: url, data: this.$render() }, function(_response) {

                // IDEA: maybe this should be a method call (like $feedCreate), this would allow
                // a user to override the feed logic for each action... On the other hand, allowing
                // this breaks the extend-using-hooks convention.

                var data = _response.data;
                if (data && !isArray(data)) this.$feed(data);

                callback('after_update', this);
                callback('after_save', this);
              });
            } else {
              // If not bound create.

              url = urlBuilder.createUrl(this);
              if(!url) throw $restmodMinErr('notsup', 'Create is not supported by this resource');

              callback('before_save', this);
              callback('before_create', this);
              return this.$send({ method: 'POST', url: url, data: this.$render() }, function(_response) {

                var data = _response.data;
                if (data && !isArray(data)) this.$feed(data);

                callback('after_create', this);
                callback('after_save', this);
              });
            }
          },
          /**
           * Begin a server request to destroy the resource.
           *
           * The request's promise is provided as the $promise property.
           *
           * @return {Model} this
           */
          $destroy: function() {
            var url = urlBuilder.destroyUrl(this);
            if(!url) throw $restmodMinErr('notsup', 'Destroy is not supported by this resource');

            callback('before_destroy', this);
            return this.$send({ method: 'DELETE', url: url }, function() {
              callback('after_destroy', this);
            });
          }
        });

        /**
         * The Model Collection type definition
         *
         * TODO: Describe collection type.
         */

        /**
         * Collection constructor.
         *
         * @param {string} _url Bound url
         * @param {object} _params Fetch query parameteres
         */
        Model.$collection = function(_url, _params, _context) {

          var col = [];

          // Since Array cannot be extended, use method injection
          // TODO: try to find a o(1) alternative...
          for(var key in Model.$$collectionProto) {
            if(Model.$$collectionProto.hasOwnProperty(key)) col[key] = Model.$$collectionProto[key];
          }

          col.$partial = _url;
          col.$context = _context;
          col.$isCollection = true;
          col.$params = _params;
          col.$pending = false;
          col.$resolved = false;

          return col;
        };

        Model.$$collectionProto = {
          /**
           * Promise chaining method, keeps the collection instance as the chain context.
           *
           * Usage: col.$fetch().$then(function() { });
           *
           * @param {function} _success success callback
           * @param {function} _error error callback
           * @return {Model} self
           */
          $then: function(_success, _error) {
            this.$promise = this.$promise.then(_success, _error);
            return this;
          },
          /**
           * Resets the collection's contents, marks collection as not $resolved
           *
           * @return {Model} self
           */
          $reset: function() {
            this.$resolved = false;
            this.length = 0;
            return this;
          },
          /**
           * Feeds raw collection data into the collection, marks collection as $resolved
           *
           * @param {array} _raw Data to add
           * @return {Model} self
           */
          $feed: function(_raw) {
            forEach(_raw, this.$buildRaw, this);
            this.$resolved = true;
            return this;
          },
          /**
           * Begin a server request to populate collection.
           *
           * TODO: support POST data queries (complex queries scenarios)
           *
           * @param {object} _params Additional request parameters, this parameters are not stored in collection.
           * @return {[type]} [description]
           */
          $fetch: function(_params) {

            var params = _params ? extend({}, this.$params || {}, _params) : this.$params;

            // TODO: check that collection is bound.
            send(this, { method: 'GET', url: this.$url(), params: params }, function(_response) {

              var data = _response.data;
              if(!data || !isArray(data)) {
                throw $restmodMinErr('badcfg', 'Error in resource {0} configuration. Expected response to be array');
              }

              // reset and feed retrieved data.
              this.$reset().$feed(data);

              // execute callback
              callback('after_collection_fetch', this, _response);
            });

            return this;
          }

          // IDEA: same as fetch, does not reset array
          // $fetchMore: function(_params, _success, _error) {
          // }

          // IDEA: $push, $remove, etc
        };

        /*
         * The scope prototype, shared by the Model type and collection instances.
         */
        var scopeProto = {
          /**
           * Returns the url this collection is bound to.
           * @return {string} bound url.
           */
          $url: function() {
            return urlBuilder.collectionUrl(this);
          },
          $build: function(_attr) {
            var obj = new Model(_attr, null, this);
            if(this.$isCollection) this.push(obj); // on collection, push new object
            return obj;
          },
          $buildRaw: function(_raw) {
            return this.$build(null).$feed(_raw);
          },
          $buildQuery: function(_params) {
            _params = this.$params ? extend({}, this.$params, _params) : _params;
            return Model.$collection(this.$partial, _params, this.$context);
          },
          $create: function(_attr, _success, _error) {
            return this.$build(_attr).$save(_success, _error);
          },
          $find: function(_key, _success, _error) {
            var init, keyName;
            if(!isObject(_key)) {
              init = {};
              keyName = urlBuilder.inferKey(this);
              if(!keyName) throw $restmodMinErr('notsup', 'Cannot infer find key, use explicit mode');
              init[keyName] = _key;
            } else init = _key;

            // dont use $build, find does not push into current collection.
            return (new Model(init, null, this)).$fetch(_success, _error);
          },
          $search: function(_params, _success, _error) {
            return this.$buildQuery(_params).$fetch(_success, _error);
          }
        };

        /*
         * Model builder interface definition
         * TODO: put this in a separate file?
         */

        // TODO: types -> parser/renderer combos.
        var Builder = {
          loadMeta: function(_meta) {
            if(_meta.$meta) {
              this.loadMeta(_meta.$meta);
            } else if(isString(_meta)) {
              this.loadMeta($injector.get(_meta));
            } else if(isArray(_meta)) {
              var i=0, meta;
              while((meta = _meta[i++])) {
                this.loadMeta(meta);
              }
            } else if(isFunction(_meta)) {
              _meta.call(this, this);
            } else {
              forEach(_meta, function(_def, _attr) {
                if(!isFunction(_def))
                {
                  if(_def.hasMany) this.hasMany(_attr, _def.hasMany, _def);
                  else if(_def.hasOne) this.hasOne(_attr, _def.hasOne, _def);
                  else {
                    // This is a regular attribute
                    if(_def.primary && urlBuilder.primary) this.attrPrimary(_attr);
                    if(_def.ignore) this.attrIgnore(_attr, true);
                    if(_def.init) this.attrDefault(_attr, _def.init);
                    if(_def.parse) this.attrParser(_attr, _def.parse, _def);
                    if(_def.render) this.attrRenderer(_attr, _def.render, _def);
                  }
                }
                else this.define(_attr, _def);
              }, this);
            }
          },
          /* */
          attrPrimary: function(_attr) {
            urlBuilder.addPrimaryKey(_attr);
            return this;
          },
          /* */
          attrIgnore: function(_attr, _ignore) {
            ignored[_attr] = _ignore;
            return this;
          },
          /* */
          attrDefault: function(_attr, _value) {
            defaults[_attr] = _value;
            return this;
          },
          /* Registers a model attributes */
          attrParser: function(_attr, _using, _opt) {
            if(isFunction(_using)) {
              parsers[_attr] = _using;
            } else {
              parsers[_attr] = function(_value) {
                // TODO: can filter be preloaded?
                // TODO: return $filter(_using)(_value, _opt);
                // TODO: add other transformation sources?
                return TR_CACHE[_using](_value, _opt);
              };
            }
            return this;
          },
          attrRenderer: function(_attr, _using, _opt) {
            if(isFunction(_using)) {
              renderers[_attr] = _using;
            } else {
              renderers[_attr] = function(_value) {
                // add other transformation sources?
                return TR_CACHE[_using](_value, _opt);
              };
            }
            return this;
          },
          /* TODO: Registers an attribute type -> this adds both parser and serializer)
          attrType: function(_attr, _type, _opt) {

          },
          */
          /* Registers a model hasMany relation */
          hasMany: function(_name, _type, _opt) {

            defaults[_name] = function() {
              if(typeof _type == 'string') _type = $injector.get(_type); // inject type (only the first time...)
              return _type.$collection(_opt.alias || _name, null, this);
            };

            parsers[_name] = function(_raw) {
              this[_name].$feed(_raw);
            };

            return this;
          },
          /* Registers a model hasOne relation */
          hasOne: function(_name, _type, _opt) {

            defaults[_name] = function() {
              if(typeof _type == 'string') _type = $injector.get(_type); // inject type (only the first time...)
              return new _type(null, _opt.alias || _name, this); // return a prebound resource.
            };

            parsers[_name] = function(_raw) {
              this[_name].$feed(_raw);
            };

            return this;
          },
          /* Registers an instance method */
          define: function(_name, _fun) {
            if(isObject(_name)) {
              forEach(_name, function(_fun, _key) {
                Model.prototype[_key] = _fun;
              }, this);
            } else Model.prototype[_name] = _fun;
            return this;
          },
          /* Registers a class method */
          classDefine: function(_name, _fun) {
            if(isObject(_name)) {
              forEach(_name, function(_fun, _key) {
                this.classDefine(_key, _fun);
              }, this);
            } else scopeProto[_name] = _fun;
            return this;
          },
          /* Event listening and shorcuts */
          on: function(_hook, _do) {
            var cbs = callbacks[_hook];
            if(!cbs) cbs = callbacks[_hook] = [];
            cbs.push(_do);
            return this;
          },
          beforeSave: function(_do) { return this.on('before_save', _do); },
          beforeCreate: function(_do) { return this.on('before_create', _do); },
          afterCreate: function(_do) { return this.on('after_create', _do); },
          beforeUpdate: function(_do) { return this.on('before_update', _do); },
          afterUpdate: function(_do) { return this.on('after_update', _do); },
          afterSave: function(_do) { return this.on('after_save', _do); },
          beforeDestroy: function(_do) { return this.on('before_destroy', _do); },
          afterDestroy: function(_do) { return this.on('after_destroy', _do); },
          afterFeed: function(_do) { return this.on('after_feed', _do); },
          beforeRender: function(_do) { return this.on('before_render', _do); }
        };

        // Finish building model type.
        Model.$meta = arraySlice.call(arguments, 1);
        Builder.loadMeta(Model.$meta);

        extend(Model, scopeProto);
        extend(Model.$$collectionProto, scopeProto);
        return Model;
      };
    }]
  };
}]);

