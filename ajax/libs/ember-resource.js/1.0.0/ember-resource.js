/**
 * A doubly linked list-based Least Recently Used (LRU) cache. Will keep most
 * recently used items while discarding least recently used items when its limit
 * is reached.
 *
 * Licensed under MIT. Copyright (c) 2010 Rasmus Andersson <http://hunch.se/>
 * See README.md for details.
 *
 * Illustration of the design:
 *
 *       entry             entry             entry             entry
 *       ______            ______            ______            ______
 *      | head |.newer => |      |.newer => |      |.newer => | tail |
 *      |  A   |          |  B   |          |  C   |          |  D   |
 *      |______| <= older.|______| <= older.|______| <= older.|______|
 *
 *  removed  <--  <--  <--  <--  <--  <--  <--  <--  <--  <--  <--  added
 */
function LRUCache (limit) {
  // Current size of the cache. (Read-only).
  this.size = 0;
  // Maximum number of items this cache can hold.
  this.limit = limit;
  this._keymap = {};
}

/**
 * Put <value> into the cache associated with <key>. Returns the entry which was
 * removed to make room for the new entry. Otherwise undefined is returned
 * (i.e. if there was enough room already).
 */
LRUCache.prototype.put = function(key, value) {
  var entry = {key:key, value:value};
  // Note: No protection agains replacing, and thus orphan entries. By design.
  this._keymap[key] = entry;
  if (this.tail) {
    // link previous tail to the new tail (entry)
    this.tail.newer = entry;
    entry.older = this.tail;
  } else {
    // we're first in -- yay
    this.head = entry;
  }
  // add new entry to the end of the linked list -- it's now the freshest entry.
  this.tail = entry;
  if (this.size === this.limit) {
    // we hit the limit -- remove the head
    return this.shift();
  } else {
    // increase the size counter
    this.size++;
  }
}

/**
 * Purge the least recently used (oldest) entry from the cache. Returns the
 * removed entry or undefined if the cache was empty.
 *
 * If you need to perform any form of finalization of purged items, this is a
 * good place to do it. Simply override/replace this function:
 *
 *   var c = new LRUCache(123);
 *   c.shift = function() {
 *     var entry = LRUCache.prototype.shift.call(this);
 *     doSomethingWith(entry);
 *     return entry;
 *   }
 */
LRUCache.prototype.shift = function() {
  // todo: handle special case when limit == 1
  var entry = this.head;
  if (entry) {
    if (this.head.newer) {
      this.head = this.head.newer;
      this.head.older = undefined;
    } else {
      this.head = undefined;
    }
    // Remove last strong reference to <entry> and remove links from the purged
    // entry being returned:
    entry.newer = entry.older = undefined;
    // delete is slow, but we need to do this to avoid uncontrollable growth:
    delete this._keymap[entry.key];
  }
  return entry;
}

/**
 * Get and register recent use of <key>. Returns the value associated with <key>
 * or undefined if not in cache.
 */
LRUCache.prototype.get = function(key, returnEntry) {
  // First, find our cache entry
  var entry = this._keymap[key];
  if (entry === undefined) return; // Not cached. Sorry.
  // As <key> was found in the cache, register it as being requested recently
  if (entry === this.tail) {
    // Already the most recenlty used entry, so no need to update the list
    return entry.value;
  }
  // HEAD--------------TAIL
  //   <.older   .newer>
  //  <--- add direction --
  //   A  B  C  <D>  E
  if (entry.newer) {
    if (entry === this.head)
      this.head = entry.newer;
    entry.newer.older = entry.older; // C <-- E.
  }
  if (entry.older)
    entry.older.newer = entry.newer; // C. --> E
  entry.newer = undefined; // D --x
  entry.older = this.tail; // D. --> E
  if (this.tail)
    this.tail.newer = entry; // E. <-- D
  this.tail = entry;
  return returnEntry ? entry : entry.value;
}

// ----------------------------------------------------------------------------
// Following code is optional and can be removed without breaking the core
// functionality.

/**
 * Check if <key> is in the cache without registering recent use. Feasible if
 * you do not want to chage the state of the cache, but only "peek" at it.
 * Returns the entry associated with <key> if found, or undefined if not found.
 */
LRUCache.prototype.find = function(key) {
  return this._keymap[key];
}

/**
 * Update the value of entry with <key>. Returns the old value, or undefined if
 * entry was not in the cache.
 */
LRUCache.prototype.set = function(key, value) {
  var oldvalue, entry = this.get(key, true);
  if (entry) {
    oldvalue = entry.value;
    entry.value = value;
  } else {
    oldvalue = this.put(key, value);
    if (oldvalue) oldvalue = oldvalue.value;
  }
  return oldvalue;
}

/**
 * Remove entry <key> from cache and return its value. Returns undefined if not
 * found.
 */
LRUCache.prototype.remove = function(key) {
  var entry = this._keymap[key];
  if (!entry) return;
  delete this._keymap[entry.key]; // need to do delete unfortunately
  if (entry.newer && entry.older) {
    // relink the older entry with the newer entry
    entry.older.newer = entry.newer;
    entry.newer.older = entry.older;
  } else if (entry.newer) {
    // remove the link to us
    entry.newer.older = undefined;
    // link the newer entry to head
    this.head = entry.newer;
  } else if (entry.older) {
    // remove the link to us
    entry.older.newer = undefined;
    // link the newer entry to head
    this.tail = entry.older;
  } else {// if(entry.older === undefined && entry.newer === undefined) {
    this.head = this.tail = undefined;
  }

  this.size--;
  return entry.value;
}

/** Removes all entries */
LRUCache.prototype.removeAll = function() {
  // This should be safe, as we never expose strong refrences to the outside
  this.head = this.tail = undefined;
  this.size = 0;
  this._keymap = {};
}

/**
 * Return an array containing all keys of entries stored in the cache object, in
 * arbitrary order.
 */
if (typeof Object.keys === 'function') {
  LRUCache.prototype.keys = function() { return Object.keys(this._keymap); }
} else {
  LRUCache.prototype.keys = function() {
    var keys = [];
    for (var k in this._keymap) keys.push(k);
    return keys;
  }
}

/**
 * Call `fun` for each entry. Starting with the newest entry if `desc` is a true
 * value, otherwise starts with the oldest (head) enrty and moves towards the
 * tail.
 *
 * `fun` is called with 3 arguments in the context `context`:
 *   `fun.call(context, Object key, Object value, LRUCache self)`
 */
LRUCache.prototype.forEach = function(fun, context, desc) {
  if (context === true) { desc = true; context = undefined; }
  else if (typeof context !== 'object') context = this;
  if (desc) {
    var entry = this.tail;
    while (entry) {
      fun.call(context, entry.key, entry.value, this);
      entry = entry.older;
    }
  } else {
    var entry = this.head;
    while (entry) {
      fun.call(context, entry.key, entry.value, this);
      entry = entry.newer;
    }
  }
}

/** Returns a JSON (array) representation */
LRUCache.prototype.toJSON = function() {
  var s = [], entry = this.head;
  while (entry) {
    s.push({key:entry.key.toJSON(), value:entry.value.toJSON()});
    entry = entry.newer;
  }
  return s;
}

/** Returns a String representation */
LRUCache.prototype.toString = function() {
  var s = '', entry = this.head;
  while (entry) {
    s += String(entry.key)+':'+entry.value;
    if (entry = entry.newer)
      s += ' < ';
  }
  return s;
}

// Export ourselves
if (typeof this === 'object') this.LRUCache = LRUCache;
(function() {

  window.Ember = window.Ember || window.SC;

  window.Ember.Resource = window.Ember.Object.extend({
    resourcePropertyWillChange: window.Ember.K,
    resourcePropertyDidChange: window.Ember.K
  });

  window.Ember.Resource.SUPPORT_AUTOFETCH = true;
}());
(function(exports) {

  var Ember = exports.Ember, NullTransport = {
    subscribe: Ember.K,
    unsubscribe: Ember.K
  };

  Ember.Resource.PushTransport = NullTransport;

  var RemoteExpiry = Ember.Mixin.create({
    init: function() {
      var ret = this._super(),
          self = this,
          remoteExpiryScope = this.get('remoteExpiryKey');

      this.set('_subscribedForExpiry', false);

      if(!remoteExpiryScope) {
        return ret;
      }

      Ember.addListener(this, 'didFetch', this, function() {
        self.subscribeForExpiry();
      });

      return ret;
    },

    subscribeForExpiry: function() {
      var remoteExpiryScope = this.get('remoteExpiryKey'),
          self = this;

      if(!remoteExpiryScope) {
        return;
      }

      if(this.get('_subscribedForExpiry')) {
        return;
      }

      Ember.Resource.PushTransport.subscribe(remoteExpiryScope, function(message) {
        self.updateExpiry(message);
      });

      this.set('_subscribedForExpiry', true);
    },

    updateExpiry: function(message) {
      var updatedAt = message && message.updatedAt;
      if(!updatedAt) return;
      if(this.stale(updatedAt)) {
        this.set('expiryUpdatedAt', updatedAt);
        if(this.get('remoteExpiryAutoFetch')) {
          this.set('isExpired', true);
          this.fetch();
        } else {
          this.expire();
        }
      }
    },

    stale: function(updatedAt) {
      return !this.get('expiryUpdatedAt') || (+this.get('expiryUpdatedAt') < +updatedAt);
    }
  });

  Ember.Resource.RemoteExpiry = RemoteExpiry;

}(this));
(function() {
  Ember.Resource.IdentityMap = function(limit) {
    this.cache = new LRUCache(limit || Ember.Resource.IdentityMap.DEFAULT_IDENTITY_MAP_LIMIT);
  };

  Ember.Resource.IdentityMap.prototype = {
    get: function() {
      return LRUCache.prototype.get.apply(this.cache, arguments);
    },

    put: function() {
      return LRUCache.prototype.put.apply(this.cache, arguments);
    },

    remove: function() {
      return LRUCache.prototype.remove.apply(this.cache, arguments);
    },

    clear: function() {
      return LRUCache.prototype.removeAll.apply(this.cache, arguments);
    },

    size: function() {
      return this.cache.size;
    },

    limit: function() {
      return this.cache.limit;
    }

  };

  Ember.Resource.IdentityMap.DEFAULT_IDENTITY_MAP_LIMIT = 500;

}());
(function(exports) {

  var expandSchema, expandSchemaItem, createSchemaProperties,
      mergeSchemas;

  var Ember = exports.Ember;

  function isString(obj) {
    return !!(obj === '' || (obj && obj !== String && obj.charCodeAt && obj.substr));
  }

  function isObject(obj) {
    return obj === Object(obj);
  }

  Ember.Resource.deepSet = function(obj, path, value) {
    if (Ember.typeOf(path) === 'string') {
      Ember.Resource.deepSet(obj, path.split('.'), value);
      return;
    }

    var key = path.shift();

    if (path.length === 0) {
      Ember.set(obj, key, value);
    } else {
      var newObj = Ember.get(obj, key);

      if (newObj === null || newObj === undefined) {
        newObj = {};
        Ember.set(obj, key, newObj);
      }

      Ember.propertyWillChange(newObj, path);
      Ember.Resource.deepSet(newObj, path, value);
      Ember.propertyDidChange(newObj, path);
    }
  };

  Ember.Resource.deepMerge = function(objA, objB) {
    var oldValue, newValue;

    for (var key in objB) {
      if (objB.hasOwnProperty(key)) {
        oldValue = Ember.get(objA, key);
        newValue = Ember.get(objB, key);

        if (Ember.typeOf(newValue) === 'object' && Ember.typeOf(oldValue) === 'object') {
          Ember.propertyWillChange(objA, key);
          Ember.Resource.deepMerge(oldValue, newValue);
          Ember.propertyDidChange(objA, key);
        } else {
          Ember.set(objA, key, newValue);
        }
      }
    }
  };

  Ember.Resource.AbstractSchemaItem = Ember.Object.extend({
    name: Ember.required(String),
    fetchable: Ember.required(Boolean),
    getValue: Ember.required(Function),
    setValue: Ember.required(Function),

    dependencies: Ember.computed('path', function() {
      var deps = ['data.' + this.get('path')];

      if(Ember.Resource.SUPPORT_AUTOFETCH) {
        deps.push('isExpired');
      }

      return deps;
    }).cacheable(),

    data: function(instance) {
      return Ember.get(instance, 'data');
    },

    type: Ember.computed('theType', function() {
      var type = this.get('theType');
      if (isString(type)) {
        type = Ember.getPath(type);
        if (type) {
          this.set('theType', type);
        } else {
          type = this.get('theType');
        }
      }
      return type;
    }).cacheable(),

    propertyFunction: function(name, value) {
      var schemaItem = this.constructor.schema[name];
      if (arguments.length === 2) {
        this.resourcePropertyWillChange(name, value);
        schemaItem.setValue.call(schemaItem, this, value);
        value = schemaItem.getValue.call(schemaItem, this);
        this.resourcePropertyDidChange(name, value);
      } else {
        value = schemaItem.getValue.call(schemaItem, this);
        if ((value === undefined || Ember.get(this, 'isExpired')) && schemaItem.get('fetchable')) {
          this.scheduleFetch();
        }
      }
      return value;
    },

    property: function() {
      var cp = new Ember.ComputedProperty(this.propertyFunction);
      return cp.property.apply(cp, this.get('dependencies')).cacheable();
    },

    toJSON: function(instance) {
      return undefined;
    }
  });
  Ember.Resource.AbstractSchemaItem.reopenClass({
    create: function(name, schema) {
      var instance = this._super.apply(this);
      instance.set('name', name);
      return instance;
    }
  });


  Ember.Resource.SchemaItem = Ember.Resource.AbstractSchemaItem.extend({});

  Ember.Resource.SchemaItem.reopenClass({
    create: function(name, schema) {
      var definition = schema[name];

      if (definition instanceof Ember.Resource.AbstractSchemaItem) { return definition; }

      var type;
      if (definition === Number || definition === String || definition === Boolean || definition === Date || definition === Object) {
        definition = {type: definition};
        schema[name] = definition;
      }

      if(isObject(definition)) {
        type = definition.type;
      }

      if (type) {
        if (type.isEmberResource || Ember.typeOf(type) === 'string') { // a has-one association
          return Ember.Resource.HasOneSchemaItem.create(name, schema);
        } else if(type.isEmberResourceCollection) { // a has-many association
          return Ember.Resource.HasManySchemaItem.create(name, schema);
        } else { // a regular attribute
          return Ember.Resource.AttributeSchemaItem.create(name, schema);
        }
      }
    }
  });

  Ember.Resource.AttributeSchemaItem = Ember.Resource.AbstractSchemaItem.extend({
    fetchable: true,
    theType: Object,
    path: Ember.required(String),

    getValue: function(instance) {
      var value;
      var data = this.data(instance);
      if (data) {
        value = Ember.getPath(data, this.get('path'));
      }

      if (this.typeCast) {
        value = this.typeCast(value);
      }

      return value;
    },

    setValue: function(instance, value) {
      var data = this.data(instance);
      if (!data) return;

      if (this.typeCast) {
        value = this.typeCast(value);
      }
      if (value !== null && value !== undefined && Ember.typeOf(value.toJSON) == 'function') {
        value = value.toJSON();
      }
      Ember.Resource.deepSet(data, this.get('path'), value);
    },

    toJSON: function(instance) {
      return Ember.get(instance, this.name);
    }
  });

  Ember.Resource.AttributeSchemaItem.reopenClass({
    create: function(name, schema) {
      var definition = schema[name];
      var instance;

      if (this === Ember.Resource.AttributeSchemaItem) {
        switch (definition.type) {
          case Number:
            return Ember.Resource.NumberAttributeSchemaItem.create(name, schema);
          case String:
            return Ember.Resource.StringAttributeSchemaItem.create(name, schema);
          case Boolean:
            return Ember.Resource.BooleanAttributeSchemaItem.create(name, schema);
          case Date:
            return Ember.Resource.DateAttributeSchemaItem.create(name, schema);
          default:
            instance = this._super.apply(this, arguments);
            instance.set('fetchable', name !== 'id');
            instance.set('path', definition.path || name);
            return instance;
        }
      }
      else {
        instance = this._super.apply(this, arguments);
        instance.set('fetchable', name !== 'id');
        instance.set('path', definition.path || name);
        return instance;
      }
    }
  });

  Ember.Resource.NumberAttributeSchemaItem = Ember.Resource.AttributeSchemaItem.extend({
    theType: Number,
    typeCast: function(value) {
      if (isNaN(value)) {
        value = undefined;
      }

      if (value === undefined || value === null || Ember.typeOf(value) === 'number') {
        return value;
      } else {
        return Number(value);
      }
    }
  });

  Ember.Resource.StringAttributeSchemaItem = Ember.Resource.AttributeSchemaItem.extend({
    theType: String,
    typeCast: function(value) {
      if (value === undefined || value === null || Ember.typeOf(value) === 'string') {
        return value;
      } else {
        return '' + value;
      }
    }
  });

  Ember.Resource.BooleanAttributeSchemaItem = Ember.Resource.AttributeSchemaItem.extend({
    theType: Boolean,
    typeCast: function(value) {
      if (value === undefined || value === null || Ember.typeOf(value) === 'boolean') {
        return value;
      } else {
        return value === 'true';
      }
    }
  });

  Ember.Resource.DateAttributeSchemaItem = Ember.Resource.AttributeSchemaItem.extend({
    theType: Date,
    typeCast: function(value) {
      if (value === undefined || value === null || Ember.typeOf(value) === 'date') {
        return value;
      } else {
        return new Date(value);
      }
    },
    toJSON: function(instance) {
      var value = Ember.get(instance, this.name);
      return value ? value.toJSON() : value;
    }
  });

  Ember.Resource.HasOneSchemaItem = Ember.Resource.AbstractSchemaItem.extend({
    fetchable: true
  });
  Ember.Resource.HasOneSchemaItem.reopenClass({
    create: function(name, schema) {
      var definition = schema[name];
      if (this === Ember.Resource.HasOneSchemaItem) {
        if (definition.nested) {
          return Ember.Resource.HasOneNestedSchemaItem.create(name, schema);
        } else {
          return Ember.Resource.HasOneRemoteSchemaItem.create(name, schema);
        }
      }
      else {
        var instance = this._super.apply(this, arguments);
        instance.set('theType', definition.type);
        if (definition.parse) {
          instance.set('parse', definition.parse);
        }
        return instance;
      }
    }
  });

  Ember.Resource.HasOneNestedSchemaItem = Ember.Resource.HasOneSchemaItem.extend({
    getValue: function(instance) {
      var data = this.data(instance);
      if (!data) return;
      var type = this.get('type');
      var value = Ember.getPath(data, this.get('path'));
      if (value) {
        value = (this.get('parse') || type.parse).call(type, Ember.copy(value));
        return type.create({}, value);
      }
      return value;
    },

    setValue: function(instance, value) {
      var data = this.data(instance);
      if (!data) return;

      if (value instanceof this.get('type')) {
        value = Ember.get(value, 'data');
      }

      Ember.Resource.deepSet(data, this.get('path'), value);
    },

    toJSON: function(instance) {
      var value = Ember.get(instance, this.name);
      return value ? value.toJSON() : value;
    }
  });
  Ember.Resource.HasOneNestedSchemaItem.reopenClass({
    create: function(name, schema) {
      var definition = schema[name];
      var instance = this._super.apply(this, arguments);
      instance.set('path', definition.path || name);

      var id_name = name + '_id';
      if (!schema[id_name]) {
        schema[id_name] = {type: Number, association: instance };
        schema[id_name] = Ember.Resource.HasOneNestedIdSchemaItem.create(id_name, schema);
      }

      return instance;
    }
  });
  Ember.Resource.HasOneNestedIdSchemaItem = Ember.Resource.AbstractSchemaItem.extend({
    fetchable: true,
    theType: Number,
    getValue: function(instance) {
      return instance.getPath(this.get('path'));
    },
    setValue: function(instance, value) {
      Ember.set(instance, this.getPath('association.name'), {id: value});
    }
  });
  Ember.Resource.HasOneNestedIdSchemaItem.reopenClass({
    create: function(name, schema) {
      var definition = schema[name];
      var instance = this._super.apply(this, arguments);
      instance.set('association', definition.association);
      instance.set('path', definition.association.get('path') + '.id');
      return instance;
    }
  });


  Ember.Resource.HasOneRemoteSchemaItem = Ember.Resource.HasOneSchemaItem.extend({
    getValue: function(instance) {
      var data = this.data(instance);
      if (!data) return;
      var id = Ember.getPath(data, this.get('path'));
      if (id) {
        return this.get('type').create({}, {id: id});
      }
    },

    setValue: function(instance, value) {
      var data = this.data(instance);
      if (!data) return;
      var id = Ember.get(value || {}, 'id');
      Ember.Resource.deepSet(data, this.get('path'), id);
    }
  });
  Ember.Resource.HasOneRemoteSchemaItem.reopenClass({
    create: function(name, schema) {
      var definition = schema[name];
      var instance = this._super.apply(this, arguments);
      var path = definition.path || name + '_id';
      instance.set('path', path);

      if (!schema[path]) {
        schema[path] = Number;
        schema[path] = Ember.Resource.SchemaItem.create(path, schema);
      }

      return instance;
    }
  });


  Ember.Resource.HasManySchemaItem = Ember.Resource.AbstractSchemaItem.extend({
    itemType: Ember.computed('theItemType', function() {
      var type = this.get('theItemType');
      if (isString(type)) {
        type = Ember.getPath(type);
        if (type) {
          this.set('theItemType', type);
        } else {
          type = this.get('theItemType');
        }
      }
      return type;
    }).cacheable()
  });

  Ember.Resource.HasManySchemaItem.reopenClass({
    create: function(name, schema) {
      var definition = schema[name];
      if (this === Ember.Resource.HasManySchemaItem) {
        if (definition.url) {
          return Ember.Resource.HasManyRemoteSchemaItem.create(name, schema);
        } else if (definition.nested) {
          return Ember.Resource.HasManyNestedSchemaItem.create(name, schema);
        } else {
          return Ember.Resource.HasManyInArraySchemaItem.create(name, schema);
        }
      } else {
        var instance = this._super.apply(this, arguments);
        instance.set('theType', definition.type);
        instance.set('theItemType', definition.itemType);
        if (definition.parse) {
          instance.set('parse', definition.parse);
        }
        return instance;
      }
    }
  });

  Ember.Resource.HasManyRemoteSchemaItem = Ember.Resource.HasManySchemaItem.extend({
    fetchable: false,
    dependencies: ['id', 'isInitializing'],
    getValue: function(instance) {
      if (Ember.get(instance, 'isInitializing')) return;

      var options = {
        type: this.get('itemType')
      };

      if (this.get('parse')) options.parse = this.get('parse');

      var url = this.url(instance);
      if (url) {
        options.url = url;
      } else {
        options.content = [];
      }

      return this.get('type').create(options);
    },

    setValue: function(instance, value) {
      throw('you can not set a remote has many association');
    }
  });
  Ember.Resource.HasManyRemoteSchemaItem.reopenClass({
    create: function(name, schema) {
      var definition = schema[name];

      var instance = this._super.apply(this, arguments);

      if (Ember.typeOf(definition.url) === 'function') {
        instance.url = definition.url;
      } else {
        instance.url = function(obj) {
          var id = obj.get('id');
          if (id) {
            return definition.url.fmt(id);
          }
        };
      }

      return instance;
    }
  });

  Ember.Resource.HasManyNestedSchemaItem = Ember.Resource.HasManySchemaItem.extend({
    fetchable: true,
    getValue: function(instance) {
      var data = this.data(instance);
      if (!data) return;
      data = Ember.getPath(data, this.get('path'));
      if (data === undefined || data === null) return data;
      data = Ember.copy(data);

      var options = {
        type: this.get('itemType'),
        content: data
      };

      if (this.get('parse')) options.parse = this.get('parse');

      return this.get('type').create(options);
    },

    setValue: function(instance, value) {
    },

    toJSON: function(instance) {
      var value = Ember.get(instance, this.name);
      return value ? value.toJSON() : value;
    }
  });
  Ember.Resource.HasManyNestedSchemaItem.reopenClass({
    create: function(name, schema) {
      var definition = schema[name];

      var instance = this._super.apply(this, arguments);
      instance.set('path', definition.path || name);

      return instance;
    }
  });

  Ember.Resource.HasManyInArraySchemaItem = Ember.Resource.HasManySchemaItem.extend({
    fetchable: true,
    getValue: function(instance) {
      var data = this.data(instance);
      if (!data) return;
      data = Ember.getPath(data, this.get('path'));
      if (data === undefined || data === null) return data;


      return this.get('type').create({
        type: this.get('itemType'),
        content: data.map(function(id) { return {id: id}; })
      });
    },

    setValue: function(instance, value) {
    },

    toJSON: function(instance) {
      var value = Ember.get(instance, this.name);
      return value ? value.mapProperty('id') : value;
    }
  });
  Ember.Resource.HasManyInArraySchemaItem.reopenClass({
    create: function(name, schema) {
      var definition = schema[name];

      var instance = this._super.apply(this, arguments);
      instance.set('path', definition.path || name + '_ids');

      return instance;
    }
  });


  // Gives custom error handlers access to the resource object.
  // 1. `this` will refer to the Ember.Resource object.
  // 2. `resource` will be passed as the last argument
  //
  //     function errorHandler() {
  //       this; // the Ember.Resource
  //     }
  //
  //     function errorHandler(jqXHR, textStatus, errorThrown, resource) {
  //       resource; // another way to reference the resource object
  //     }
  //
  var errorHandlerWithContext = function(errorHandler, context) {
    return function() {
      var args = Array.prototype.slice.call(arguments, 0);
      args.push(context);
      errorHandler.apply(context, args);
    };
  };

  Ember.Resource.ajax = function(options) {
    options.dataType = options.dataType || 'json';
    options.type     = options.type     || 'GET';

    if(options.error) {
      options.error = errorHandlerWithContext(options.error, options);
    } else if(Ember.Resource.errorHandler) {
      options.error = errorHandlerWithContext(Ember.Resource.errorHandler, options);
    }

    return $.ajax(options);
  };

  Ember.Resource.Lifecycle = {
    INITIALIZING: 0,
    UNFETCHED:    10,
    EXPIRING:     20,
    EXPIRED:      30,
    FETCHING:     40,
    FETCHED:      50,
    SAVING:       60,
    DESTROYING:   70,
    DESTROYED:    80,

    clock: Ember.Object.create({
      now: new Date(),

      tick: function() {
        Ember.Resource.Lifecycle.clock.set('now', new Date());
      },

      start: function() {
        this.stop();
        Ember.Resource.Lifecycle.clock.set('timer', setInterval(Ember.Resource.Lifecycle.clock.tick, 10000));
      },

      stop: function() {
        var timer = Ember.Resource.Lifecycle.clock.get('timer');
        if (timer) {
          clearInterval(timer);
        }
      }
    }),

    classMixin: Ember.Mixin.create({
      create: function(options, data) {
        options = options || {};
        options.resourceState = Ember.Resource.Lifecycle.INITIALIZING;

        var instance = this._super.apply(this, arguments);

        if (Ember.get(instance, 'resourceState') === Ember.Resource.Lifecycle.INITIALIZING) {
          Ember.set(instance, 'resourceState', Ember.Resource.Lifecycle.UNFETCHED);
        }

        return instance;
      }
    }),

    prototypeMixin: Ember.Mixin.create({
      expireIn: 60 * 5,
      resourceState: 0,
      autoFetch: true,

      init: function() {
        this._super.apply(this, arguments);

        var self = this;

        if(!Ember.Resource.SUPPORT_AUTOFETCH) {
          this.set('autoFetch', false);
        }

        var updateExpiry = function() {
          var expireAt = new Date();
          expireAt.setSeconds(expireAt.getSeconds() + Ember.get(self, 'expireIn'));
          Ember.set(self, 'expireAt', expireAt);
        };

        Ember.addListener(this, 'willFetch', this, function() {
          Ember.set(self, 'resourceState', Ember.Resource.Lifecycle.FETCHING);
          updateExpiry();
        });

        Ember.addListener(this, 'didFetch', this, function() {
          Ember.set(self, 'resourceState', Ember.Resource.Lifecycle.FETCHED);
          updateExpiry();
        });

        Ember.addListener(this, 'didFail', this, function() {
          Ember.set(self, 'resourceState', Ember.Resource.Lifecycle.UNFETCHED);
          updateExpiry();
        });

        var resourceStateBeforeSave;
        Ember.addListener(this, 'willSave', this, function() {
          resourceStateBeforeSave = Ember.get(self, 'resourceState');
          Ember.set(self, 'resourceState', Ember.Resource.Lifecycle.SAVING);
        });

        Ember.addListener(this, 'didSave', this, function() {
          Ember.set(self, 'resourceState', resourceStateBeforeSave || Ember.Resource.Lifecycle.UNFETCHED);
        });
      },

      isFetchable: Ember.computed('resourceState', function() {
        var state = Ember.get(this, 'resourceState');
        return state == Ember.Resource.Lifecycle.UNFETCHED || state === Ember.Resource.Lifecycle.EXPIRED;
      }).cacheable(),

      isAutoFetchable: Ember.computed('isFetchable', 'autoFetch', function() {
        return this.get('isFetchable') && this.get('autoFetch');
      }).cacheable(),

      isInitializing: Ember.computed('resourceState', function() {
        return (Ember.get(this, 'resourceState') || Ember.Resource.Lifecycle.INITIALIZING) === Ember.Resource.Lifecycle.INITIALIZING;
      }).cacheable(),

      isFetching: Ember.computed('resourceState', function() {
        return (Ember.get(this, 'resourceState')) === Ember.Resource.Lifecycle.FETCHING;
      }).cacheable(),

      isFetched: Ember.computed('resourceState', function() {
        return (Ember.get(this, 'resourceState')) === Ember.Resource.Lifecycle.FETCHED;
      }).cacheable(),

      isSavable: Ember.computed('resourceState', function() {
        var state = Ember.get(this, 'resourceState');
        var unsavableState = [
          Ember.Resource.Lifecycle.INITIALIZING,
          Ember.Resource.Lifecycle.FETCHING,
          Ember.Resource.Lifecycle.SAVING,
          Ember.Resource.Lifecycle.DESTROYING
        ];

        return state && !unsavableState.contains(state);
      }).cacheable(),

      isSaving: Ember.computed('resourceState', function() {
        return (Ember.get(this, 'resourceState')) === Ember.Resource.Lifecycle.SAVING;
      }).cacheable(),

      scheduleFetch: function() {
        if (Ember.get(this, 'isAutoFetchable')) {
          Ember.run.next(this, this.fetch);
        }
      },

      expire: function() {
        Ember.run.next(this, function() {
          Ember.set(this, 'expireAt', new Date());
          Ember.Resource.Lifecycle.clock.tick();
        });
      },

      updateIsExpired: Ember.observer(function() {
        var isExpired = Ember.get(this, 'resourceState') === Ember.Resource.Lifecycle.EXPIRED;
        if (isExpired) return true;

        var expireAt = Ember.get(this, 'expireAt');
        if (expireAt) {
          var now = Ember.Resource.Lifecycle.clock.get('now');
          isExpired = expireAt.getTime() <= now.getTime();
        }

        var oldIsExpired = Ember.get(this, 'isExpired');

        if (( isExpired && !oldIsExpired ) ||
            ( (isExpired === false) && oldIsExpired)) {
          Ember.set(this, 'isExpired', isExpired);
        }
      }, 'Ember.Resource.Lifecycle.clock.now', 'expireAt', 'resourceState'),

      isExpired: Ember.computed(function(name, value) {
        if (value) {
          Ember.set(this, 'resourceState', Ember.Resource.Lifecycle.EXPIRED);
        }
        return value;
      }).cacheable()
    })
  };
  Ember.Resource.Lifecycle.clock.start();

  Ember.Resource.reopen({
    isEmberResource: true,

    updateWithApiData: function(json) {
      var data = Ember.get(this, 'data');
      Ember.beginPropertyChanges(data);
      Ember.Resource.deepMerge(data, this.constructor.parse(json));
      Ember.endPropertyChanges(data);
    },

    willFetch: function() {},
    didFetch: function() {},
    willSave: function() {},
    didSave: function() {},
    didFail: function() {},

    fetched: function() {
      if(!this._fetchDfd) {
        this._fetchDfd = $.Deferred();
      }
      return this._fetchDfd;
    },

    fetch: function(ajaxOptions) {
      var sideloads;
      if (!Ember.get(this, 'isFetchable')) return $.when();

      var url = this.resourceURL();

      if (!url) return;

      var self = this;

      if (this.deferedFetch && !Ember.get(this, 'isExpired')) return this.deferedFetch;

      self.willFetch.call(self);
      Ember.sendEvent(self, 'willFetch');

      ajaxOptions = $.extend({}, ajaxOptions, {
        url: url,
        resource: this,
        operation: 'read'
      });

      sideloads = this.constructor.sideloads;

      if(sideloads && sideloads.length !== 0) {
        ajaxOptions.data = {include: sideloads.join(",")};
      }

      this.deferedFetch = Ember.Resource.ajax(ajaxOptions).done(function(json) {
        self.updateWithApiData(json);
      });

      this.deferedFetch.fail(function() {
        self.didFail.call(self);
        Ember.sendEvent(self, 'didFail');
        self.fetched().reject();
      });

      this.deferedFetch.done(function() {
        self.didFetch.call(self);
        Ember.sendEvent(self, 'didFetch');
        self.fetched().resolve();
      });

      this.deferedFetch.always(function() {
        self.deferedFetch = null;
      });

      return this.deferedFetch;
    },

    resourceURL: function() {
      return this.constructor.resourceURL(this);
    },

    // Turn this resource into a JSON object to be saved via AJAX. Override
    // this method to produce different syncing behavior.
    toJSON: function() {
      var json = {};
      var schemaItem, path, value;
      for (var name in this.constructor.schema) {
        if (this.constructor.schema.hasOwnProperty(name)) {
          schemaItem = this.constructor.schema[name];
          if (schemaItem instanceof Ember.Resource.AbstractSchemaItem) {
            path = schemaItem.get('path');
            value = schemaItem.toJSON(this);
            if (value !== undefined) {
              Ember.Resource.deepSet(json, path, value);
            }
          }
        }
      }

      return json;
    },

    isNew: Ember.computed('id', function() {
      return !Ember.get(this, 'id');
    }).cacheable(),

    save: function(options) {
      options = options || {};
      if (!Ember.get(this, 'isSavable')) return false;

      var ajaxOptions = {
        contentType: 'application/json',
        data: JSON.stringify(this.toJSON()),
        resource: this
      };

      if (Ember.get(this, 'isNew')) {
        ajaxOptions.type = 'POST';
        ajaxOptions.url = this.constructor.resourceURL();
        ajaxOptions.operation = 'create';
      } else {
        ajaxOptions.type = 'PUT';
        ajaxOptions.url = this.resourceURL();
        ajaxOptions.operation = 'update';
      }

      var self = this;

      self.willSave.call(self);
      Ember.sendEvent(self, 'willSave');

      var deferedSave = Ember.Resource.ajax(ajaxOptions);

      deferedSave.done(function(data, status, response) {
        var location = response.getResponseHeader('Location');
        if (location) {
          var id = self.constructor.idFromURL(location);
          if (id) {
            Ember.set(self, 'id', id);
          }
        }

        if (options.update !== false && Ember.typeOf(data) === 'object') {
          self.updateWithApiData(data);
        }
      });

      deferedSave.always(function() {
        self.didSave.call(self);
        Ember.sendEvent(self, 'didSave');
      });

      return deferedSave;
    },

    destroy: function() {
      if(this.get('id')) {
        this.constructor.identityMap.remove(this.get('id'));
      }
      this._super();
    },

    destroyResource: function() {
      var previousState = Ember.get(this, 'resourceState'), self = this;
      Ember.set(this, 'resourceState', Ember.Resource.Lifecycle.DESTROYING);
      return Ember.Resource.ajax({
        type: 'DELETE',
        operation: 'destroy',
        url:  this.resourceURL(),
        resource: this
      }).done(function() {
        Ember.set(self, 'resourceState', Ember.Resource.Lifecycle.DESTROYED);
        self.destroy();
      }).fail(function() {
        Ember.set(self, 'resourceState', previousState);
      });
    }
  }, Ember.Resource.Lifecycle.prototypeMixin);

  expandSchema = function(schema) {
    for (var name in schema) {
      if (schema.hasOwnProperty(name)) {
        schema[name] = Ember.Resource.SchemaItem.create(name, schema);
      }
    }

    return schema;
  };

  mergeSchemas = function(childSchema, parentSchema) {
    var schema = Ember.copy(parentSchema || {});

    for (var name in childSchema) {
      if (childSchema.hasOwnProperty(name)) {
        if (schema.hasOwnProperty(name)) {
          throw("Schema item '" + name + "' is already defined");
        }

        schema[name] = childSchema[name];
      }
    }

    return schema;
  };

  createSchemaProperties = function(schema) {
    var properties = {}, schemaItem;

    for (var propertyName in schema) {
      if (schema.hasOwnProperty(propertyName)) {
        properties[propertyName] = schema[propertyName].property();
      }
    }

    return properties;
  };

  Ember.Resource.reopenClass({
    isEmberResource: true,
    schema: {},

    baseClass: function() {
      if (this === Ember.Resource) {
        return null;
      } else {
        return this.baseResourceClass || this;
      }
    },

    subclassFor: function(options, data) {
      return this;
    },

    // Create an instance of this resource. If `options` includes an
    // `id`, first check the identity map and return the existing resource
    // with that ID if found.
    create: function(options, data) {
      data    = data    || {};
      options = options || {};

      var klass = this.subclassFor(options, data), idToRestore = options.id;

      if (klass === this) {
        var instance;
        this.identityMap = this.identityMap || new Ember.Resource.IdentityMap(this.identityMapLimit);

        var id = data.id || options.id;
        if (id && !options.skipIdentityMap) {
          id = id.toString();
          instance = this.identityMap.get(id);

          if (!instance) {
            instance = this._super.call(this, { data: data });
            this.identityMap.put(id, instance);
          } else {
            instance.updateWithApiData(data);
            // ignore incoming resourceState and id arguments
            delete options.resourceState;
            delete options.id;
          }
        } else {
          instance = this._super.call(this, { data: data });
        }

        delete options.data;

        Ember.beginPropertyChanges(instance);
        var mixin = {};
        var hasMixin = false;
        for (var name in options) {
          if (options.hasOwnProperty(name)) {
            if (this.schema[name]) {
              instance.set(name, options[name]);
            } else {
              mixin[name] = options[name];
              hasMixin = true;
            }
          }
        }
        if (hasMixin) {
          instance.reopen(mixin);
        }
        Ember.endPropertyChanges(instance);

        options.id = idToRestore;
        return instance;
      } else {
        return klass.create(options, data);
      }
    },

    // Parse JSON -- likely returned from an AJAX call -- into the
    // properties for an instance of this resource. Override this method
    // to produce different parsing behavior.
    parse: function(json) {
      return json;
    },

    // Define a resource class.
    //
    // Parameters:
    //
    //  * `schema` -- the properties schema for the resource class
    //  * `url` -- either a function that returns the URL for syncing
    //    resources or a string. If the latter, a string of the form
    //    "/widgets" is turned into a function that returns "/widgets" if
    //    the Widget's ID is not present and "/widgets/{id}" if it is.
    //  * `parse` -- the function used to parse JSON returned from AJAX
    //    calls into the resource properties. By default, simply returns
    //    the JSON.
    define: function(options) {
      options = options || {};
      var schema = expandSchema(options.schema);
      schema = mergeSchemas(schema, this.schema);

      var klass = this.extend(createSchemaProperties(schema), Ember.Resource.RemoteExpiry);

      var classOptions = {
        schema: schema
      };

      if (this !== Ember.Resource) {
        classOptions.baseResourceClass = this.baseClass() || this;
      }

      if (options.url) {
        classOptions.url = options.url;
      }

      if (options.parse) {
        classOptions.parse = options.parse;
      }

      if (options.identityMapLimit) {
        classOptions.identityMapLimit = options.identityMapLimit;
      }

      if(options.sideloads) {
        classOptions.sideloads = options.sideloads;
      }

      klass.reopenClass(classOptions);

      return klass;
    },

    resourceURL: function(instance) {
      if (Ember.typeOf(this.url) == 'function') {
        return this.url(instance);
      } else if (this.url) {
        if (instance) {
          var id = Ember.get(instance, 'id');
          if(!id) {
            return this.url;
          }

          if (id && (Ember.typeOf(id) !== 'number' || id > 0)) {
            return this.url + '/' + id;
          }
        } else {
          return this.url;
        }
      }
    },

    idFromURL: function(url) {
      var regex;
      if (!this.schema.id) return;

      if (this.schema.id.get('type') === Number) {
        regex = /\/(\d+)(\.\w+)?$/;
      } else {
        regex = /\/([^\/\.]+)(\.\w+)?$/;
      }

      var match = (url || '').match(regex);
      if (match) {
        return match[1];
      }
    }
  }, Ember.Resource.Lifecycle.classMixin);

  Ember.ResourceCollection = Ember.ArrayProxy.extend(Ember.Resource.RemoteExpiry, {
    isEmberResourceCollection: true,
    type: Ember.required(),

    fetched: function() {
      if(!this._fetchDfd) {
        this._fetchDfd = $.Deferred();
      }
      return this._fetchDfd;
    },

    fetch: function(ajaxOptions) {
      if (!Ember.get(this, 'isFetchable') || Ember.get(this, 'prePopulated')) return $.when();

      var self = this;

      if (this.deferedFetch && !Ember.get(this, 'isExpired')) return this.deferedFetch;

      Ember.sendEvent(self, 'willFetch');

      this.deferedFetch = this._fetch(function(json) {
        Ember.set(self, 'content', self.parse(json));
      }, ajaxOptions);

      this.deferedFetch.always(function() {
        Ember.sendEvent(self, 'didFetch');
        self.fetched().resolve();
        self.deferredFetch = null;
      });
      return this.deferedFetch;
    },
    _resolveType: function() {
      if (isString(this.type)) {
        var type = Ember.getPath(this.type);
        if (type) this.type = type;
      }
    },
    _fetch: function(callback, ajaxOptions) {
      this._resolveType();
      ajaxOptions = $.extend({}, ajaxOptions, {
        url: this.resolveUrl(),
        resource: this,
        operation: 'read',
        success: callback
      });
      return Ember.Resource.ajax(ajaxOptions);
    },
    resolveUrl: function() {
      return this.get('url') || this.type.resourceURL();
    },
    instantiateItems: function(items) {
      this._resolveType();
      return items.map(function(item) {
        if (item instanceof this.type) {
          return item;
        } else {
          return this.type.create({}, item);
        }
      }, this);
    },
    parse: function(json) {
      this._resolveType();
      if (Ember.typeOf(this.type.parse) == 'function') {
        return json.map(this.type.parse);
      }
      else {
        return json;
      }
    },

    length: Ember.computed('content.length', 'resourceState', 'isExpired', function() {
      var content = Ember.get(this, 'content');
      var length = content ? Ember.get(content, 'length') : 0;
      if (length === 0 ||  Ember.get(this, 'isExpired'))  this.scheduleFetch();
      return length;
    }).cacheable(),

    content: Ember.computed(function(name, value) {
      if (arguments.length === 2) { // setter
        return this.instantiateItems(value);
      }
    }).cacheable(),

    autoFetchOnExpiry: Ember.observer(function() {
      if (Ember.get(this, 'isAutoFetchable') && Ember.get(this, 'isExpired') && Ember.get(this, 'hasArrayObservers')) {
        this.fetch();
      }
    }, 'isExpired', 'hasArrayObservers'),

    toJSON: function() {
      return this.map(function(item) {
        return item.toJSON();
      });
    }
  }, Ember.Resource.Lifecycle.prototypeMixin);

  Ember.ResourceCollection.reopenClass({
    isEmberResourceCollection: true,
    identityMapLimit: Ember.Resource.IdentityMap.DEFAULT_IDENTITY_MAP_LIMIT * 5,
    create: function(options) {
      options = options || {};
      var content = options.content;
      delete options.content;

      options.prePopulated = !! content;

      var instance;

      if (!options.prePopulated && options.url) {
        this.identityMap = this.identityMap || new Ember.Resource.IdentityMap(this.identityMapLimit);
        var identity = [options.type, options.url];
        instance = this.identityMap.get(identity) || this._super.call(this, options);
        this.identityMap.put(identity, instance);
      }

      if (!instance) {
        instance = this._super.call(this, options);

        if (content) {
          Ember.set(instance, 'content', instance.parse(content));
        }
      }

      return instance;
    }
  }, Ember.Resource.Lifecycle.classMixin);
}(this));
