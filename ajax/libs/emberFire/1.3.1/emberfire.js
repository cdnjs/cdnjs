/*!
 * EmberFire is the officially supported adapter for using Firebase with
 * Ember Data. The DS.FirebaseAdapter provides all of the standard DS.Adapter
 * methods and will automatically synchronize the store with Firebase.
 *
 * EmberFire 1.3.1
 * https://github.com/firebase/emberfire/
 * License: MIT
 */
(function() {
  "use strict";

  /* Only enable if Ember Data is included */
  if (window.DS === undefined) {
    return;
  }

  var EmberFire = Ember.Namespace.create({
    VERSION: '1.3.1'
  });

  if (Ember.libraries) {
    Ember.libraries.registerCoreLibrary('EmberFire', EmberFire.VERSION);
  }

  //Monkeypatch the store until ED gives us a good way to listen to push events
  DS.Store.reopen({
    push: function(typeName, data, _partial) {
      var record = this._super(typeName, data, _partial);
      var adapter = this.adapterFor(record.constructor);
      if (adapter.recordWasPushed) {
        adapter.recordWasPushed(this, typeName, record);
      }
      return record;
    },

    recordWillUnload: function(record) {
      var adapter = this.adapterFor(record.constructor);
      if (adapter.recordWillUnload) {
        adapter.recordWillUnload(this, record);
      }
    }
  });
  DS.Model.reopen({
    unloadRecord: function() {
      this.store.recordWillUnload(this);
      return this._super();
    }
  });
  // Shortcuts
  var Promise = Ember.RSVP.Promise;
  var map = Ember.EnumerableUtils.map;
  var forEach = Ember.EnumerableUtils.forEach;
  var fmt = Ember.String.fmt;


 var toPromise = function(fn, context, _args, errorMsg) {
  var args = _args || [];
  return new Promise(function(resolve, reject) {
    var callback = function(error) {
      if (error) {
        if (errorMsg && typeof error === 'object') {
          error.location = errorMsg;
        }
        reject(error);
      } else {
        resolve();
      }
    };
    args.push(callback);
    fn.apply(context, args);
  });
};

  /**
    The Firebase serializer helps normalize relationships and can be extended on
    a per model basis.
  */
  DS.FirebaseSerializer = DS.JSONSerializer.extend(Ember.Evented, {

    //We need to account for Firebase turning key/value pairs with ids '1' and '0' into arrays
    //See https://github.com/firebase/emberfire/issues/124
    _normalizeNumberIDs: function(hash, key) {
      var newHash = [];
      if (hash[key][0] === true) {
        newHash.push('0');
      }
      if (hash[key][1] === true) {
        newHash.push('1');
      }
      hash[key] = newHash;
    },

    normalizeHasMany: function(type, hash, relationship) {
      var key = relationship.key;
      if (typeof hash[key] === 'object' && !Ember.isArray(hash[key])) {
        hash[key] = Ember.keys(hash[key]);
      }
      //We need to account for Firebase turning key/value pairs with ids '1' and '0' into arrays
      //See https://github.com/firebase/emberfire/issues/124
      else if (Ember.isArray(hash[key]) && hash[key].length < 3 && (hash[key][0] === true || hash[key][1] === true)) {
        this._normalizeNumberIDs(hash, key);
      }
      else if (Ember.isArray(hash[key])) {
        throw new Error(fmt('%@ relationship %@(\'%@\') must be a key/value map in Firebase. Example: { "%@": { "%@_id": true } }', [type.toString(), relationship.kind, relationship.type.typeKey, key, relationship.type.typeKey]));
      }
    },

    normalizeEmbeddedHasMany: function(type, hash, relationship) {
      var key = relationship.key;
      var embeddedRecordPayload = hash[key];
      var embeddedKey;
      if (!hash[key]) {
        return;
      }
      for (embeddedKey in embeddedRecordPayload) {
        var record = embeddedRecordPayload[embeddedKey];
        if (record !== null && typeof record === 'object') {
          record.id = embeddedKey;
        }
        this.store.push(relationship.type, this.normalize(relationship.type, record));
      }
      hash[key] = Ember.keys(hash[key]);
    },

    normalizeEmbeddedBelongsTo: function(type, hash, relationship) {
      var key = relationship.key;
      if (!hash[key]) {
        return;
      }
      var embeddedRecordPayload = hash[key];
      if (typeof embeddedRecordPayload.id !== 'string') {
        throw new Error(fmt('Embedded relationship "%@" of "%@" must contain an "id" property in the payload', [relationship.type.typeKey, type]));
      }
      this.store.push(relationship.type, this.normalize(relationship.type, embeddedRecordPayload));
      hash[key] = embeddedRecordPayload.id;
    },

    normalizeBelongsTo: Ember.K,
    /**
      Called after `extractSingle()`. This method checks the model
      for `hasMany` relationships and makes sure the value is an object.
      The object is then converted to an Array using `Ember.keys`
    */
    normalize: function(type, hash) {
      var serializer = this;
      // Check if the model contains any 'hasMany' relationships
      type.eachRelationship(function(key, relationship) {
        if (relationship.kind === 'hasMany') {
          if (relationship.options.embedded) {
            serializer.normalizeEmbeddedHasMany(type, hash, relationship);
          } else {
            serializer.normalizeHasMany(type, hash, relationship);
          }
        } else {
          if (relationship.options.embedded) {
            serializer.normalizeEmbeddedBelongsTo(type, hash, relationship);
          } else {
            serializer.normalizeBelongsTo(type, hash, relationship);
          }
        }
      });
      return this._super.apply(this, arguments);
    },

    /**
      Called on a records returned from `find()` and all records
      returned from `findAll()`

      This method also checkes for `embedded: true`, extracts the
      embedded records, pushes them into the store, and then replaces
      the records with an array of ids
    */
    extractSingle: function(store, type, payload) {
      return this.normalize(type, payload);
    },

    /**
      Called after the adpter runs `findAll()` or `findMany()`. This method runs
      `extractSingle()` on each item in the payload and as a result each item
      will have `normalize()` called on it
    */
    extractArray: function(store, type, payload) {
      return map(payload, function(item) {
        return this.extractSingle(store, type, item);
      }, this);
    },

    /**
      Overrides ember-data's `serializeHasMany` to serialize oneToMany
      relationships.
    */
    serializeHasMany: function(record, json, relationship) {
      var key = relationship.key;
      var payloadKey = this.keyForRelationship ? this.keyForRelationship(key, "hasMany") : key;
      json[payloadKey] = Ember.A(record.get(key)).mapBy('id');
    },

    serializeBelongsTo: function(record, json, relationship) {
      this._super(record, json, relationship);
      var key = relationship.key;
      var payloadKey = this.keyForRelationship ? this.keyForRelationship(key, "belongsTo") : relationship.key;
      if (typeof json[key] === "undefined" || json[key] === '') {
        delete json[key];
      }
    }

  });

  /**
    The Firebase adapter allows your store to communicate with the Firebase
    realtime service. To use the adapter in your app, extend DS.FirebaseAdapter
    and customize the endpoint to point to the Firebase URL where you want this
    data to be stored.

    The adapter will automatically communicate with Firebase to persist your
    records as neccessary. Importantly, the adapter will also update the store
    in realtime when changes are made to the Firebase by other clients or
    otherwise.
  */
  DS.FirebaseAdapter = DS.Adapter.extend(Ember.Evented, {

    defaultSerializer: '-firebase',

    /**
      Endpoint paths can be customized by setting the Firebase property on the
      adapter:

      ```js
      DS.FirebaseAdapter.extend({
        firebase: new Firebase('https://<my-firebase>.firebaseio.com/')
      });
      ```

      Requests for `App.Post` now target `https://<my-firebase>.firebaseio.com/posts`.

      @property firebase
      @type {Firebase}
    */

    init: function() {
      var firebase = this.get('firebase');
      if (!firebase || typeof firebase !== 'object') {
        throw new Error('Please set the `firebase` property on the adapter.');
      }
      // If provided Firebase reference was a query (eg: limits), make it a ref.
      this._ref = firebase.ref();
      // Keep track of what types `.findAll()` has been called for
      this._findAllMapForType = {};
      // Keep a cache to check modified relationships against
      this._recordCacheForType = {};
      // Used to batch records into the store
      this._queue = [];
    },

    /**
      Uses push() to generate chronologically ordered unique IDs.
    */
    generateIdForRecord: function() {
      return this._getKey(this._ref.push());
    },

    /**
      Use the Firebase DataSnapshot's key as the record id

      @param {Object} snapshot - A Firebase snapshot
      @param {Object} payload - The payload that will be pushed into the store
      @return {Object} payload
    */
    _assignIdToPayload: function(snapshot) {
      var payload = snapshot.val();
      if (payload !== null && typeof payload === 'object' && typeof payload.id === 'undefined') {
        payload.id = this._getKey(snapshot);
      }
      return payload;
    },

    /**
      Called by the store to retrieve the JSON for a given type and ID. The
      method will return a promise which will resolve when the value is
      successfully fetched from Firebase.

      Additionally, from this point on, the object's value in the store will
      also be automatically updated whenever the remote value changes.
    */
    find: function(store, type, id) {
      var adapter = this;
      var ref = this._getRef(type, id);
      var serializer = store.serializerFor(type);

      return new Promise(function(resolve, reject) {
        ref.once('value', function(snapshot) {
          var payload = adapter._assignIdToPayload(snapshot);
          adapter._updateRecordCacheForType(type, payload);
          if (payload === null) {
            var error = new Error(fmt('no record was found at %@', [ref.toString()]));
                error.recordId = id;
            reject(error);
          }
          else {
            resolve(payload);
          }
        },
        function(err) {
          reject(err);
        });
      }, fmt('DS: FirebaseAdapter#find %@ to %@', [type, ref.toString()]));
    },

    recordWasPushed: function(store, type, record) {
      if (!record.__listening) {
        this.listenForChanges(store, type, record);
      }
    },

    recordWillUnload: function(store, record) {
      var ref = this._getRef(record.typeKey, record.get('id'));
      ref.off('value');
    },

    listenForChanges: function(store, type, record) {
      record.__listening = true;
      var serializer = store.serializerFor(type);
      var adapter = this;
      var ref = this._getRef(type, record.get('id'));
      var called = false;
      ref.on('value', function(snapshot) {
        if (called) {
          adapter._handleChildValue(store, type, serializer, snapshot);
        }
        called = true;
      });
    },

    /**
     findMany
    */
    findMany: undefined,

    /**
      Called by the store to retrieve the JSON for all of the records for a
      given type. The method will return a promise which will resolve when the
      value is successfully fetched from Firebase.

      Additionally, from this point on, any records of this type that are added,
      removed or modified from Firebase will automatically be reflected in the
      store.
    */
    findAll: function(store, type) {
      var adapter = this;
      var ref = this._getRef(type);

      return new Promise(function(resolve, reject) {
        // Listen for child events on the type
        ref.once('value', function(snapshot) {
          if (!adapter._findAllHasEventsForType(type)) {
            adapter._findAllAddEventListeners(store, type, ref);
          }
          var results = [];
          snapshot.forEach(function(childSnapshot) {
            var payload = adapter._assignIdToPayload(childSnapshot);
            adapter._updateRecordCacheForType(type, payload);
            results.push(payload);
          });
          resolve(results);
        }, function(error) {
          reject(error);
        });
      }, fmt('DS: FirebaseAdapter#findAll %@ to %@', [type, ref.toString()]));
    },

    /**
      Keep track of what types `.findAll()` has been called for
      so duplicate listeners aren't added
    */
    _findAllMapForType: undefined,

    /**
      Determine if the current type is already listening for children events
    */
    _findAllHasEventsForType: function(type) {
      return !Ember.isNone(this._findAllMapForType[type]);
    },

    /**
      After `.findAll()` is called on a type, continue to listen for
      `child_added`, `child_removed`, and `child_changed`
    */
    _findAllAddEventListeners: function(store, type, ref) {
      this._findAllMapForType[type] = true;

      var adapter = this;
      var serializer = store.serializerFor(type);

      ref.on('child_added', function(snapshot) {
        if (!store.hasRecordForId(type, adapter._getKey(snapshot))) {
          adapter._handleChildValue(store, type, serializer, snapshot);
        }
      });
    },

    /**
      Push a new child record into the store
    */
    _handleChildValue: function(store, type, serializer, snapshot) {
      //No idea why we need this, we are alredy turning off the callback by
      //calling ref.off in recordWillUnload. Something is fishy here
      if (store.isDestroying) {
        return;
      }
      var value = snapshot.val();
      if (value === null) {
        var id = this._getKey(snapshot);
        var record = store.getById(type, id);
        //TODO refactor using ED
        if (!record.get('isDeleted')) {
          record.deleteRecord();
        }
      } else {
        var payload = this._assignIdToPayload(snapshot);
        this._enqueue(function() {
          store.push(type, serializer.extractSingle(store, type, payload));
        });
      }
    },

    /**
      `createRecord` is an alias for `updateRecord` because calling \
      `ref.set()` would wipe out any existing relationships
    */
    createRecord: function(store, type, record) {
      var adapter = this;
      return this.updateRecord(store, type, record).then(function() {
        adapter.listenForChanges(store, type, record);
      });
    },

    /**
      Called by the store when a record is created/updated via the `save`
      method on a model record instance.

      The `updateRecord` method serializes the record and performs an `update()`
      at the the Firebase location and a `.set()` at any relationship locations
      The method will return a promise which will be resolved when the data and
      any relationships have been successfully saved to Firebase.

      We take an optional record reference, in order for this method to be usable
      for saving nested records as well.

    */
    updateRecord: function(store, type, record, _recordRef) {
      var adapter = this;
      var recordRef = _recordRef || this._getRef(type, record.id);
      var recordCache = Ember.get(adapter._recordCacheForType, fmt('%@.%@', [type.typeKey, record.get('id')])) || {};

      var serializedRecord = record.serialize({includeId:false});

      return new Promise(function(resolve, reject) {
        var savedRelationships = Ember.A();
        record.eachRelationship(function(key, relationship) {
          var save;
          if (relationship.kind === 'hasMany') {
              if (serializedRecord[key]) {
                save = adapter._saveHasManyRelationship(store, type, relationship, serializedRecord[key], recordRef, recordCache);
                savedRelationships.push(save);
                // Remove the relationship from the serializedRecord because otherwise we would clobber the entire hasMany
                delete serializedRecord[key];
              }
          } else {
              if (relationship.options.embedded === true && serializedRecord[key]) {
                save = adapter._saveBelongsToRecord(store, type, relationship, serializedRecord[key], recordRef);
                savedRelationships.push(save);
                delete serializedRecord[key];
              }
          }
        });

        var relationshipsPromise = Ember.RSVP.allSettled(savedRelationships);
        var recordPromise = adapter._updateRecord(recordRef, serializedRecord);

        Ember.RSVP.hashSettled({relationships: relationshipsPromise, record: recordPromise}).then(function(promises) {
          var rejected = Ember.A(promises.relationships.value).filterBy('state', 'rejected');
          if (promises.record.state === 'rejected') {
            rejected.push(promises.record);
          }
          // Throw an error if any of the relationships failed to save
          if (rejected.length !== 0) {
            var error = new Error(fmt('Some errors were encountered while saving %@ %@', [type, record.id]));
                error.errors = rejected.mapBy('reason');
            reject(error);
          } else {
            resolve();
          }
        });
      }, fmt('DS: FirebaseAdapter#updateRecord %@ to %@', [type, recordRef.toString()]));
    },

    //Just update the record itself without caring for the relationships
    _updateRecord: function(recordRef, serializedRecord) {
      return toPromise(recordRef.update, recordRef, [serializedRecord]);
    },

    /**
      Call _saveHasManyRelationshipRecord on each record in the relationship
      and then resolve once they have all settled
    */
    _saveHasManyRelationship: function(store, type, relationship, ids, recordRef, recordCache) {
      if (!Ember.isArray(ids)) {
        throw new Error('hasMany relationships must must be an array');
      }
      var adapter = this;
      var idsCache = Ember.A(recordCache[relationship.key]);
      ids = Ember.A(ids);
      var dirtyRecords = [];

      // Added
      var addedRecords = ids.filter(function(id) {
        return !idsCache.contains(id);
      });

      // Dirty
      dirtyRecords = ids.filter(function(id) {
        var type = relationship.type;
        return store.hasRecordForId(type, id) && store.getById(type, id).get('isDirty') === true;
      });
      dirtyRecords = Ember.A(dirtyRecords.concat(addedRecords)).uniq().map(function(id) {
        return adapter._saveHasManyRecord(store, relationship, recordRef, id);
      });
      // Removed
      var removedRecords = idsCache.filter(function(id) {
        return !ids.contains(id);
      });
      removedRecords = Ember.A(removedRecords).map(function(id) {
        return adapter._removeHasManyRecord(store, relationship, recordRef, id);
      });
      // Combine all the saved records
      var savedRecords = dirtyRecords.concat(removedRecords);
      // Wait for all the updates to finish
      return Ember.RSVP.allSettled(savedRecords).then(function(savedRecords) {
        var rejected = Ember.A(Ember.A(savedRecords).filterBy('state', 'rejected'));
        if (rejected.get('length') === 0) {
          // Update the cache
          recordCache[relationship.key] = ids;
          return savedRecords;
        }
        else {
          var error = new Error(fmt('Some errors were encountered while saving a hasMany relationship %@ -> %@', [relationship.parentType, relationship.type]));
              error.errors = Ember.A(rejected).mapBy('reason');
          throw error;
        }
      });
    },

    /**
      If the relationship is `async: true`, create a child ref
      named with the record id and set the value to true

      If the relationship is `embedded: true`, create a child ref
      named with the record id and update the value to the serialized
      version of the record
    */
    _saveHasManyRecord: function(store, relationship, parentRef, id) {
      var ref = this._getRelationshipRef(parentRef, relationship.key, id);
      var record = store.getById(relationship.type, id);
      var isEmbedded = relationship.options.embedded === true;
      if (isEmbedded) {
        return this.updateRecord(store, relationship.type, record, ref);
      }

      return toPromise(ref.set, ref,  [true]);
    },

    /**
      Remove a relationship
    */
    _removeHasManyRecord: function(store, relationship, parentRef, id) {
      var ref = this._getRelationshipRef(parentRef, relationship.key, id);
      return toPromise(ref.remove, ref, [], ref.toString());
    },

    /**
      Save an embedded record
    */
    _saveBelongsToRecord: function(store, type, relationship, id, parentRef) {
      var ref = parentRef.child(relationship.key);
      var record = store.getById(relationship.type, id);
      return this.updateRecord(store, relationship.type, record, ref);
    },

    /**
      Called by the store when a record is deleted.
    */
    deleteRecord: function(store, type, record) {
      var ref = this._getRef(type, record.get('id'));
      return toPromise(ref.remove, ref);
    },

    /**
      Determines a path fo a given type
    */
    pathForType: function(type) {
      var camelized = Ember.String.camelize(type);
      return Ember.String.pluralize(camelized);
    },

    /**
      Return a Firebase reference for a given type and optional ID.
    */
    _getRef: function(type, id) {
      var ref = this._ref;
      if (type) {
        ref = ref.child(this.pathForType(type.typeKey));
      }
      if (id) {
        ref = ref.child(id);
      }
      return ref;
    },

    /**
      Return a Firebase reference based on a relationship key and record id
    */
    _getRelationshipRef: function(ref, key, id) {
      return ref.child(key).child(id);
    },

    /**
      The amount of time (ms) before the _queue is flushed
    */
    _queueFlushDelay: (1000/60), // 60fps

    /**
      Called after the first item is pushed into the _queue
    */
    _queueScheduleFlush: function() {
      Ember.run.later(this, this._queueFlush, this._queueFlushDelay);
    },

    /**
      Call each function in the _queue and the reset the _queue
    */
    _queueFlush: function() {
      forEach(this._queue, function(queueItem) {
        var fn = queueItem[0];
        var args = queueItem[1];
        fn.apply(null, args);
      });
      this._queue.length = 0;
    },

    /**
      Push a new function into the _queue and then schedule a
      flush if the item is the first to be pushed
    */
    _enqueue: function(callback, args) {
      //Only do the queueing if we scheduled a delay
      if (this._queueFlushDelay) {
        var length = this._queue.push([callback, args]);
        if (length === 1) {
          this._queueScheduleFlush();
        }
      } else {
        callback.apply(null, args);
      }
    },

    /**
      A cache of hasMany relationships that can be used to
      diff against new relationships when a model is saved
    */
    _recordCacheForType: undefined,

    /**
      _updateHasManyCacheForType
    */
    _updateRecordCacheForType: function(type, payload) {
      if (!payload) { return; }
      var adapter = this;
      var id = payload.id;
      var cache = adapter._recordCacheForType;
      var typeKey = type.typeKey;
      // Only cache relationships for now
      type.eachRelationship(function(key, relationship) {
        if (relationship.kind === 'hasMany') {
          var ids = payload[key];
          cache[typeKey] = cache[typeKey] || {};
          cache[typeKey][id] = cache[typeKey][id] || {};
          cache[typeKey][id][key] = !Ember.isNone(ids) ? Ember.A(Ember.keys(ids)) : Ember.A();
        }
      });
    },

    /**
     * A utility for retrieving the key name of a Firebase ref or
     * DataSnapshot. This is backwards-compatible with `name()`
     * from Firebase 1.x.x and `key()` from Firebase 2.0.0+. Once
     * support for Firebase 1.x.x is dropped in EmberFire, this
     * helper can be removed.
     */
    _getKey: function(refOrSnapshot) {
      return (typeof refOrSnapshot.key === 'function') ? refOrSnapshot.key() : refOrSnapshot.name();
    }
  });

  /**
    Register the serializer and adapter
  */
  Ember.onLoad('Ember.Application', function(Application) {
    Application.initializer({
      name: 'firebase',
      initialize: function(container, application) {
        application.register('adapter:-firebase', DS.FirebaseAdapter);
        application.register('serializer:-firebase', DS.FirebaseSerializer);
      }
    });
  });

})();
