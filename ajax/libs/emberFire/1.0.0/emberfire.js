'use strict';

// Source: src/data.js
(function() {
/* Only enable if Ember Data is included */
  if (window.DS === undefined) {
    return;
  }

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
      var relationshipsByName = Ember.get(type, 'relationshipsByName');
      var relationshipNames = Ember.get(type, 'relationshipNames');
      // Check if the model contains any 'hasMany' relationships
      if (Ember.isArray(relationshipNames.hasMany)) {
        relationshipNames.hasMany.forEach(function(key) {
          var relationship = relationshipsByName.get(key);
          // Return the keys as an array
          if (typeof hash[key] === 'object' && !Ember.isArray(hash[key])) {
            hash[key] = Ember.keys(hash[key]);
          }
          else if (Ember.isArray(hash[key])) {
            throw new Error('%@ relationship %@(\'%@\') must be a key/value map in Firebase. Example: { "%@": { "%@_id": true } }'.fmt(type.toString(), relationship.kind, relationship.type.typeKey, relationship.key, relationship.type.typeKey));
          }
        });
      }
      return this._super.apply(this, arguments);
    },

    /**
      extractSingle
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
      return payload.map(function(item) {
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

    /**
      Endpoint paths can be customized by setting the Firebase property on the
      adapter:

      ```js
      DS.FirebaseAdapter.extend({
        firebase: new Firebase('https://<my-firebase>.firebaseio.com/')
      });
      ```

      Requests for `App.Post` would now target `https://<my-firebase>.firebaseio.com/posts`.

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
    },

    // Uses push() to generate chronologically ordered unique IDs.
    generateIdForRecord: function() {
      return this._ref.push().name();
    },

    /**
      Called by the store to retrieve the JSON for a given type and ID. The
      method will return a promise which will resolve when the value is
      successfully fetched from Firebase.

      Additionally, from this point on, the object's value in the store will
      also be automatically updated whenever the remote value changes.
    */
    find: function(store, type, id) {
      var resolved = false;
      var ref = this._getRef(type, id);
      var serializer = store.serializerFor(type);

      return new Ember.RSVP.Promise(function(resolve, reject) {
        ref.on('value', function(snapshot) {
          var obj = snapshot.val();
          if (obj !== null && typeof obj === 'object') {
            obj.id = snapshot.name();
          }
          if (!resolved) {
            // If this is the first event, resolve the promise.
            resolved = true;
            if (obj === null) {
              Ember.run(null, reject);
            }
            else {
              Ember.run(null, resolve, obj);
            }
          } else {
            // If the snapshot is null, delete the record from the store
            if (obj === null && store.hasRecordForId(type, snapshot.name())) {
              store.getById(type, snapshot.name()).destroyRecord();
            }
            // Otherwise push it into the store
            else {
              store.push(type, serializer.extractSingle(store, type, obj));
            }
          }
        }, function(err) {
          // Only called in cases of permission related errors.
          if (!resolved) {
            Ember.run(null, reject, err);
          }
        });
      }, 'DS: FirebaseAdapter#find ' + type + ' to ' + ref.toString());
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
      var self = this;
      var resolved = false;
      var ref = this._getRef(type);
      var serializer = store.serializerFor(type);

      function _gotChildValue(snapshot) {
        // Update store, only if the promise is already resolved.
        if (!resolved) {
          return;
        }
        var obj = snapshot.val();
        if (obj !== null && typeof obj === 'object') {
          obj.id = snapshot.name();
        }
        store.push(type, serializer.extractSingle(store, type, obj));
      }

      return new Ember.RSVP.Promise(function(resolve, reject) {
        var _handleError = function(err) {
          if (!resolved) {
            resolved = true;
            Ember.run(null, reject, err);
          }
        };

        // Only add listeners to a type once
        if (Ember.isNone(self._findAllMapForType[type])) {
          self._findAllMapForType[type] = true;
          ref.on('child_added', _gotChildValue, _handleError);
          ref.on('child_changed', _gotChildValue, _handleError);
          ref.on('child_removed', function(snapshot) {
            if (!resolved) {
              return;
            }
            if (store.hasRecordForId(type, snapshot.name())) {
              store.deleteRecord(store.getById(type, snapshot.name()));
            }
          }, _handleError);
        }

        ref.once('value', function(snapshot) {
          var results = [];
          snapshot.forEach(function(childSnapshot) {
            var obj = childSnapshot.val();
            if (obj !== null && typeof obj === 'object') {
              obj.id = childSnapshot.name();
            }
            results.push(obj);
          });
          resolved = true;
          Ember.run(null, resolve, results);
        });
      }, 'DS: FirebaseAdapter#findAll ' + type + ' to ' + ref.toString());
    },

    /**
      `createRecord` is the same as `updateRecord` because calling `ref.set()`
      would wipe out any relationships that may have been added
    */
    createRecord: function(store, type, record) {
      return this.updateRecord(store, type, record);
    },

    /**
      Called by the store when a record is created/updated via the `save`
      method on a model record instance.

      The `updateRecord` method serializes the record and performs an `update()`
      at the the Firebase location and a `.set()` at any relationship locations
      The method will return a promise which will be resolved when the data has
      been successfully saved to Firebase.
    */
    updateRecord: function(store, type, record) {
      var json = record.serialize({ includeId: false });
      var ref = this._getRef(type, record.id);

      return new Ember.RSVP.Promise(function(resolve, reject) {
        var promises = [];
        // Update relationships
        record.eachRelationship(function(key, relationship) {
          if (relationship.kind === 'hasMany') {
            var ids = json[key];
            if (Ember.isArray(ids)) {
              ids.forEach(function(id) {
                var relationshipRef = ref.child(key).child(id);
                var deferred = Ember.RSVP.defer();
                promises.push(deferred.promise);
                relationshipRef.set(true, function(error) {
                  if (error) {
                    if (typeof error === 'object') {
                      error.location = relationshipRef.toString();
                    }
                    deferred.reject(error);
                  } else {
                    deferred.resolve();
                  }
                });
              });
            }
            // Remove the relationship from the json payload
            delete json[key];
          }
        });
        // Update the main record
        var updateDeferred = Ember.RSVP.defer();
        promises.push(updateDeferred.promise);
        ref.update(json, function(error) {
          if (error) {
            updateDeferred.reject(error);
          } else {
            updateDeferred.resolve();
          }
        });
        // Wait for the record and any relationships to resolve
        Ember.RSVP.allSettled(promises).then(function(settledPromised) {
          var rejected = settledPromised.filterBy('state', 'rejected');
          // There were no errors
          if (rejected.get('length') === 0)  {
            Ember.run(null, resolve);
          }
          else {
            Ember.run(null, reject, { message: 'Some errors were encountered while saving', errors: rejected.mapBy('reason') });
          }
        });
      }, 'DS: FirebaseAdapter#updateRecord ' + type + ' to ' + ref.toString());
    },

    // Called by the store when a record is deleted.
    deleteRecord: function(store, type, record) {
      var ref = this._getRef(type, record.id);
      return new Ember.RSVP.Promise(function(resolve, reject) {
        ref.remove(function(err) {
          if (err) {
            Ember.run(null, reject, err);
          } else {
            Ember.run(null, resolve);
          }
        });
      }, 'DS: FirebaseAdapter#deleteRecord ' + type + ' to ' + ref.toString());
    },

    /**
      Determines a path fo a given type. To customize, override the method:

      ```js
      DS.FirebaseAdapter.reopen({
        pathForType: function(type) {
          var decamelized = Ember.String.decamelize(type);
          return Ember.String.pluralize(decamelized);
        }
      });
      ```
    */
    pathForType: function(type) {
      var camelized = Ember.String.camelize(type);
      return Ember.String.pluralize(camelized);
    },

    /**
      Returns a Firebase reference for a given type and optional ID.

      By default, it pluralizes the type's name ('post' becomes 'posts'). To
      override the pluralization, see [pathForType](#method_pathForType).

      @method _getRef
      @private
      @param {String} type
      @param {String} id
      @returns {Firebase} ref
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
      Keep track of what types `.findAll()` has been called for
      so duplicate listeners aren't added
    */
    _findAllMapForType: undefined

  });

})();