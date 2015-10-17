(function() {
  "use strict";

  /* Only enable if Ember Data is included */
  if (window.DS === undefined) {
    return;
  }

  var Promise = Ember.RSVP.Promise;

  var map = Ember.EnumerableUtils.map;
  var forEach = Ember.EnumerableUtils.forEach;
  var fmt = Ember.String.fmt;

  /**
    The Firebase serializer helps normalize relationships and can be extended on
    a per model basis.
  */
  DS.FirebaseSerializer = DS.JSONSerializer.extend(Ember.Evented, {

    /**
      Called after `extractSingle()`. This method checks the model
      for `hasMany` relationships and makes sure the value is an object.
      The object is then converted to an Array using `Ember.keys`
    */
    normalize: function(type, hash) {
      // Check if the model contains any 'hasMany' relationships
      type.eachRelationship(function(key, relationship) {
        if (relationship.kind === 'hasMany') {
          if (typeof hash[key] === 'object' && !Ember.isArray(hash[key]) && relationship.options.embedded !== true) {
            hash[key] = Ember.keys(hash[key]);
          }
          else if (Ember.isArray(hash[key])) {
            throw new Error(fmt('%@ relationship %@(\'%@\') must be a key/value map in Firebase. Example: { "%@": { "%@_id": true } }', [type.toString(), relationship.kind, relationship.type.typeKey, relationship.key, relationship.type.typeKey]));
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
      var adapter = store.adapterFor(type);
      var normalizedPayload = this.normalize(type, payload);
      // Check for embedded records
      type.eachRelationship(function(key, relationship) {
        if (!Ember.isNone(payload[key]) && relationship.options.embedded === true) {
          var embeddedKey;
          var embeddedRecordPayload = normalizedPayload[key];
          var records = [];
          var record;
          for (embeddedKey in embeddedRecordPayload) {
            record = embeddedRecordPayload[embeddedKey];
            if (record !== null && typeof record === 'object') {
              record.id = embeddedKey;
            }
            records.push(record);
          }
          normalizedPayload[key] = Ember.keys(normalizedPayload[key]);
          if (adapter._enqueue) {
            adapter._enqueue(function() {
              store.pushMany(relationship.type, records);
            });
          }
          else {
            store.pushMany(relationship.type, records);
          }
        }
      });
      return normalizedPayload;
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
      if (!this.firebase || typeof this.firebase !== 'object') {
        throw new Error('Please set the `firebase` property on the adapter.');
      }
      // If provided Firebase reference was a query (eg: limits), make it a ref.
      this._ref = this.firebase.ref();
      // Keep track of what types `.findAll()` has been called for
      this._findAllMapForType = {};
      // Used to batch records into the store
      this._queue = [];
    },

    /**
      Uses push() to generate chronologically ordered unique IDs.
    */
    generateIdForRecord: function() {
      return this._ref.push().name();
    },

    /**
      Use the Firebase snapshot.name() as the record id

      @param {Object} snapshot - A Firebase snapshot
      @param {Object} payload - The payload that will be pushed into the store
      @return {Object} payload
    */
    _assignIdToPayload: function(snapshot) {
      var payload = snapshot.val();
      if (payload !== null && typeof payload === 'object' && typeof payload.id === 'undefined') {
        payload.id = snapshot.name();
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
      var resolved = false;
      var ref = this._getRef(type, id);
      var serializer = store.serializerFor(type);

      return new Promise(function(resolve, reject) {
        ref.on('value', function(snapshot) {
          var payload = adapter._assignIdToPayload(snapshot);
          var record = store.getById(type, snapshot.name());

          if (!resolved) {
            resolved = true;
            // If this is the first event, resolve the promise.
            if (payload === null) {
              adapter._enqueue(reject, [{ message: fmt('no record was found at %@', [ref.toString()]), recordId: id }]);
            }
            else {
              adapter._enqueue(resolve, [payload]);
            }
          }
          else {
            // If the snapshot is null, delete the record from the store
            if (payload === null && record && !record.get('isDeleted')) {
              adapter._enqueue(function() {
                store.getById(type, snapshot.name()).deleteRecord();
              });
            }
            // Otherwise push it into the store
            else {
              adapter._enqueue(function() {
                store.push(type, serializer.extractSingle(store, type, payload));
              });
            }
          }
        },
        function(err) {
          // Only called in cases of permission related errors.
          if (!resolved) {
            adapter._enqueue(reject, [err]);
          }
        });
      }, fmt('DS: FirebaseAdapter#find %@ to %@', [type, ref.toString()]));
    },

    /**
     findMany
    */
    findMany: function(store, type, ids) {
      var promises = map(ids, function(id) {
        return this.find(store, type, id);
      }, this);
      return Ember.RSVP.allSettled(promises).then(function(promises) {
        // Remove any records that couldn't be fetched
        promises = Ember.A(promises);
        forEach(promises.filterBy('state', 'rejected'), function(promise) {
          var recordId = promise.reason.recordId;
          if(store.hasRecordForId(type, recordId)) {
            var record = store.getById(type, recordId);
            record.transitionTo('loaded.created.uncommitted');
            store.deleteRecord(record);
          }
        });
        return Ember.A(promises.filterBy('state', 'fulfilled')).mapBy('value');
      });
    },

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
        var valueEventTriggered;
        if (!adapter._findAllHasEventsForType(type)) {
          valueEventTriggered = adapter._findAllAddEventListeners(store, type, ref);
        }
        ref.once('value', function(snapshot) {
          if (valueEventTriggered) {
            Ember.run(null, valueEventTriggered.resolve);
          }
          if (snapshot.val() === null) {
            adapter._enqueue(reject);
          }
          else {
            var results = [];
            snapshot.forEach(function(childSnapshot) {
              var payload = adapter._assignIdToPayload(childSnapshot);
              results.push(payload);
            });
            adapter._enqueue(resolve, [results]);
          }
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

      var deferred = Ember.RSVP.defer();
      var adapter = this;
      var serializer = store.serializerFor(type);
      var valueEventTriggered = false;

      deferred.promise.then(function() {
        valueEventTriggered = true;
      });

      ref.on('child_added', function(snapshot) {
        if (!valueEventTriggered) { return; }
        adapter._handleChildValue(store, type, serializer, snapshot);
      });

      ref.on('child_changed', function(snapshot) {
        if (!valueEventTriggered) { return; }
        adapter._handleChildValue(store, type, serializer, snapshot);
      });

      ref.on('child_removed', function(snapshot) {
        if (!valueEventTriggered) { return; }
        var record = store.getById(type, snapshot.name());
        if (record && !record.get('isDeleted')) {
          adapter._enqueue(function() {
            store.deleteRecord(record);
          });
        }
      });

      return deferred;
    },

    /**
      Push a new child record into the store
    */
    _handleChildValue: function(store, type, serializer, snapshot) {
      var payload = this._assignIdToPayload(snapshot);
      this._enqueue(function() {
        store.push(type, serializer.extractSingle(store, type, payload));
      });
    },

    /**
      `createRecord` is an alias for `updateRecord` because calling \
      `ref.set()` would wipe out any existing relationships
    */
    createRecord: function(store, type, record) {
      return this.updateRecord(store, type, record);
    },

    /**
      Called by the store when a record is created/updated via the `save`
      method on a model record instance.

      The `updateRecord` method serializes the record and performs an `update()`
      at the the Firebase location and a `.set()` at any relationship locations
      The method will return a promise which will be resolved when the data and
      any relationships have been successfully saved to Firebase.
    */
    updateRecord: function(store, type, record) {
      var adapter = this;
      var serializedRecord = record.serialize({
        includeId: false
      });
      var recordRef = this._getRef(type, record.id);

      return new Promise(function(resolve, reject) {
        var savedRelationships = Ember.A();
        record.eachRelationship(function(key, relationship) {
          switch (relationship.kind) {
            case 'hasMany':
              if (Ember.isArray(serializedRecord[key])) {
                var save = adapter._saveHasManyRelationship(store, relationship, serializedRecord[key], recordRef);
                savedRelationships.push(save);
                // Remove the relationship from the serializedRecord
                delete serializedRecord[key];
              }
              break;
            default:
              break;
          }
        });
        // Save the record once all the relationships have saved
        Ember.RSVP.allSettled(savedRelationships).then(function(savedRelationships) {
          savedRelationships = Ember.A(savedRelationships);
          var rejected = Ember.A(savedRelationships.filterBy('state', 'rejected'));
          // Throw an error if any of the relationships failed to save
          if (rejected.get('length') !== 0) {
            var error = new Error(fmt('Some errors were encountered while saving %@ %@', [type, record.id]));
                error.errors = rejected.mapBy('reason');
            adapter._enqueue(reject, [error]);
          }
          recordRef.update(serializedRecord, function(error) {
            if (error) {
              adapter._enqueue(reject, [error]);
            } else {
              adapter._enqueue(resolve);
            }
          });
        });
      }, fmt('DS: FirebaseAdapter#updateRecord %@ to %@', [type, recordRef.toString()]));
    },

    /**
      Call _saveHasManyRelationshipRecord on each record in the relationship
      and then resolve once they have all settled
    */
    _saveHasManyRelationship: function(store, relationship, ids, parentRef) {
      if (!Ember.isArray(ids)) {
        throw new Error('hasMany relationships must must be an array');
      }
      // Save each record in the relationship
      var savedRecords = map(ids, function(id) {
        return this._saveHasManyRelationshipRecord(store, relationship, parentRef, id);
      }, this);
      // Wait for all the updates to finish
      return Ember.RSVP.allSettled(savedRecords).then(function(savedRecords) {
        var rejected = Ember.A(Ember.A(savedRecords).filterBy('state', 'rejected'));
        if (rejected.get('length') === 0) {
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
      named with the record id and set the value to false

      If the relationship is `embedded: true`, create a child ref
      named with the record id and update the value to the serialized
      version of the record
    */
    _saveHasManyRelationshipRecord: function(store, relationship, parentRef, id) {
      var adapter = this;
      // Create a reference to the related record
      var ref = this._getRelationshipRef(parentRef, relationship.key, id);
      // Get the local version of the related record
      var relatedRecord = store.hasRecordForId(relationship.type, id) ? store.getById(relationship.type, id) : false;
      var isEmbedded = relationship.options.embedded === true;
      var isDirty = relatedRecord ? relatedRecord.get('isDirty') : false;
      var valueToSave = isEmbedded ? relatedRecord.serialize({ includeId: false }) : true;
      return new Promise(function(resolve, reject) {
        // If the relationship is embedded and a record was found and the and there are changes
        // If the relationship is embedded and a related record was found and its dirty or there is no related record
        // TODO: use a state machine to manager these conditionals
        if ((isEmbedded && relatedRecord && isDirty) || (!isEmbedded && ((relatedRecord && isDirty) || !relatedRecord))) {
          var _saveHandler = function(error) {
            if (error) {
              if (typeof error === 'object') {
                error.location = ref.toString();
              }
              adapter._enqueue(reject, [error]);
            } else {
              adapter._enqueue(resolve);
            }
          };
          if (isEmbedded) {
            ref.update(valueToSave, _saveHandler);
          }
          else {
            ref.set(valueToSave, _saveHandler);
          }
        }
        else {
          // The related record didn't need to be save
          adapter._enqueue(resolve);
        }
      });
    },

    /**
      Called by the store when a record is deleted.
    */
    deleteRecord: function(store, type, record) {
      var adapter = this;
      var ref = this._getRef(type, record.id);

      return new Promise(function(resolve, reject) {
        ref.remove(function(err) {
          if (err) {
            adapter._enqueue(reject, [err]);
          } else {
            adapter._enqueue(resolve);
          }
        });
      }, fmt('DS: FirebaseAdapter#deleteRecord %@ to %@', [type, ref.toString()]));
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
      var length = this._queue.push([callback, args]);
      if (length === 1) {
        this._queueScheduleFlush();
      }
    }

  });

  /**
    Register the serializer and adapter
  */
  Ember.onLoad('Ember.Application', function(Application) {
    Application.initializer({
      name: 'firebase',
      after: 'store',
      initialize: function(container, application) {
        application.register('adapter:-firebase', DS.FirebaseAdapter);
        application.register('serializer:-firebase', DS.FirebaseSerializer);
      }
    });
  });

})();