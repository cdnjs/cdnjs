// Version: 0.13
// Last commit: 18cd8a2 (2013-06-16 07:12:38 -0700)


(function() {
var define, requireModule;

(function() {
  var registry = {}, seen = {};

  define = function(name, deps, callback) {
    registry[name] = { deps: deps, callback: callback };
  };

  requireModule = function(name) {
    if (seen[name]) { return seen[name]; }
    seen[name] = {};

    var mod, deps, callback, reified , exports;

    mod = registry[name];

    if (!mod) {
      throw new Error("Module '" + name + "' not found.");
    }

    deps = mod.deps;
    callback = mod.callback;
    reified = [];
    exports;

    for (var i=0, l=deps.length; i<l; i++) {
      if (deps[i] === 'exports') {
        reified.push(exports = {});
      } else {
        reified.push(requireModule(deps[i]));
      }
    }

    var value = callback.apply(this, reified);
    return seen[name] = exports || value;
  };
})();
(function() {
var get = Ember.get;

DS.DjangoRESTSerializer = DS.RESTSerializer.extend({
    patchInJSONRoot: function(json, type, many) {
        var pJSON, root;
        root = this.rootForType(type);
        if (many === true) {
            root = this.pluralize(root);
        }
        pJSON = {};
        pJSON[root] = json;
        return pJSON;
    },

    keyForHasMany: function(type, name) {
        return this.keyForAttributeName(type, name);
    },

    keyForBelongsTo: function(type, name) {
        return this.keyForAttributeName(type, name);
    },

    extract: function(loader, json, type, records) {
        json = this.patchInJSONRoot(json, type, false);
        this._super(loader, json, type, records);
    },

    extractMany: function(loader, json, type, records) {
        json = this.patchInJSONRoot(json, type, true);
        this._super(loader, json, type, records);
    }
});

})();



(function() {
function rejectionHandler(reason) {
    Ember.Logger.error(reason, reason.message);
    throw reason;
}

var get = Ember.get, set = Ember.set;

DS.DjangoRESTAdapter = DS.RESTAdapter.extend({
    bulkCommit: false,
    serializer: DS.DjangoRESTSerializer,

    createRecord: function(store, type, record) {
        var root, adapter, data;

        root = this.rootForType(type);
        adapter = this;
        data = this.serialize(record);

        return this.ajax(this.buildURL(root), "POST", {
            data: data
        }).then(function(json){
            adapter.didCreateRecord(store, type, record, json);
        }, function(xhr) {
            adapter.didError(store, type, record, xhr);
            throw xhr;
        }).then(null, rejectionHandler);
    },

    updateRecord: function(store, type, record) {
        var id, root, adapter, data;

        id = get(record, 'id');
        root = this.rootForType(type);
        adapter = this;
        data = this.serialize(record);

        return this.ajax(this.buildURL(root, id), "PUT", {
            data: data
        }).then(function(json){
            adapter.didUpdateRecord(store, type, record, json);
        }, function(xhr) {
            adapter.didError(store, type, record, xhr);
            throw xhr;
        }).then(null, rejectionHandler);
    },

    findMany: function(store, type, ids, parent) {
        var adapter, root, url;
        adapter = this;

        if (parent) {
            url = this.buildFindManyUrlWithParent(type, parent);
        } else {
            root = this.rootForType(type);
            url = this.buildURL(root);
        }

        return this.ajax(url, "GET", {
        }).then(function(json) {
          adapter.didFindMany(store, type, json);
        }).then(null, rejectionHandler);
    },

    ajax: function(url, type, hash) {
      hash = hash || {};
      hash.cache = false;
      return this._super(url, type, hash);
    },

    buildURL: function(record, suffix) {
        var url = this._super(record, suffix);
        if (url.charAt(url.length -1) !== '/') {
            url += '/';
        }
        return url;
    },

    buildFindManyUrlWithParent: function(type, parent) {
        var root, url, endpoint, parentType, parentValue;

        endpoint = parent.get('findManyKey');
        parentType = parent.get('findManyType');
        if (typeof endpoint !== 'string') {
            parent.eachRelationship(function(name, relationship) {
                if (relationship.kind === 'hasMany' && relationship.type === type) {
                    endpoint = relationship.key;
                    parentType = relationship.parentType;
                }
            });
        }
        
        Ember.assert("could not find a relationship for the specified child type", typeof endpoint !== "undefined");

        endpoint = this.serializer.keyForAttributeName(parentType, endpoint);
        parentValue = parent.get('id');
        root = this.rootForType(parentType);
        url = this.buildURL(root, parentValue);

        return url + endpoint + '/';
    },

    /**
      RESTAdapter expects HTTP 422 for invalid records and a JSON response
      with errors inside JSON root `errors`, however DRF uses 400
      and errors without a JSON root.
    */
    didError: function(store, type, record, xhr) {
        if (xhr.status === 400) {
            var data = JSON.parse(xhr.responseText);
            var errors = {};

            // Convert error key names
            record.eachAttribute(function(name) {
                var attr = this.serializer.keyForAttributeName(type, name);
                if (attr in data) {
                    errors[name] = data[attr];
                }
            }, this);
            record.eachRelationship(function(name, relationship) {
                var attr = null;
                if (relationship.kind === 'belongsTo') {
                    attr = this.serializer.keyForBelongsTo(type, name);
                } else {
                    attr = this.serializer.keyForHasMany(type, name);
                }
                if (attr in data) {
                    errors[name] = data[attr];
                }
            }, this);

            store.recordWasInvalid(record, errors);
        } else {
            this._super.apply(this, arguments);
        }
    }
});

})();



(function() {
DS.DjangoRESTStore = DS.Store.extend({
    findMany: function(type, idsOrReferencesOrOpaque, record, relationship) {
        var ret;
        
        // check for hasMany relationship
        if (typeof relationship === 'object' && relationship.kind === 'hasMany') {
            record.set('findManyKey', relationship.key);
            record.set('findManyType', relationship.parentType);
        }
        
        ret = this._super(type, idsOrReferencesOrOpaque, record, relationship);
        
        // clear the variables we set to be clean
        record.set('findManyKey', null);
        record.set('findManyType', null);
        
        return ret;
    }
});
})();



(function() {

})();


})();
