/*!
 * EmberFire is the officially supported adapter for using Firebase with
 * Ember Data. The DS.FirebaseAdapter provides all of the standard DS.Adapter
 * methods and will automatically synchronize the store with Firebase.
 *
 * EmberFire 1.6.3
 * https://github.com/firebase/emberfire/
 * License: MIT
 */

 /**
 * @license
 * lodash 3.10.0 (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize modern exports="es" -o ./`
 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */
(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (global){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _ember = (typeof window !== "undefined" ? window['Ember'] : typeof global !== "undefined" ? global['Ember'] : null);

var _ember2 = _interopRequireDefault(_ember);

var _emberData = (typeof window !== "undefined" ? window['DS'] : typeof global !== "undefined" ? global['DS'] : null);

var _emberData2 = _interopRequireDefault(_emberData);

var _utilsToPromise = require('../utils/to-promise');

var _utilsToPromise2 = _interopRequireDefault(_utilsToPromise);

var _lodashCollectionForEach = require('lodash/collection/forEach');

var _lodashCollectionForEach2 = _interopRequireDefault(_lodashCollectionForEach);

var _lodashCollectionFilter = require('lodash/collection/filter');

var _lodashCollectionFilter2 = _interopRequireDefault(_lodashCollectionFilter);

var _lodashCollectionMap = require('lodash/collection/map');

var _lodashCollectionMap2 = _interopRequireDefault(_lodashCollectionMap);

var _lodashCollectionIncludes = require('lodash/collection/includes');

var _lodashCollectionIncludes2 = _interopRequireDefault(_lodashCollectionIncludes);

var _lodashArrayIndexOf = require('lodash/array/indexOf');

var _lodashArrayIndexOf2 = _interopRequireDefault(_lodashArrayIndexOf);

var _lodashCollectionFind = require('lodash/collection/find');

var _lodashCollectionFind2 = _interopRequireDefault(_lodashCollectionFind);

var Promise = _ember2['default'].RSVP.Promise;

var uniq = function uniq(arr) {
  var ret = _ember2['default'].A();

  arr.forEach(function (k) {
    if ((0, _lodashArrayIndexOf2['default'])(ret, k) < 0) {
      ret.push(k);
    }
  });

  return ret;
};

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
exports['default'] = _emberData2['default'].Adapter.extend(_ember2['default'].Evented, {

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

  init: function init() {
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
  generateIdForRecord: function generateIdForRecord() {
    return this._getKey(this._ref.push());
  },

  /**
    Use the Firebase DataSnapshot's key as the record id
     @param {Object} snapshot - A Firebase snapshot
    @param {Object} payload - The payload that will be pushed into the store
    @return {Object} payload
  */
  _assignIdToPayload: function _assignIdToPayload(snapshot) {
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
  findRecord: function findRecord(store, typeClass, id) {
    var adapter = this;
    var ref = this._getCollectionRef(typeClass, id);

    return new Promise(function (resolve, reject) {
      ref.once('value', function (snapshot) {
        var payload = adapter._assignIdToPayload(snapshot);
        adapter._updateRecordCacheForType(typeClass, payload);
        if (payload === null) {
          var error = new Error('no record was found at ' + ref.toString());
          error.recordId = id;
          reject(error);
        } else {
          resolve(payload);
        }
      }, function (err) {
        reject(err);
      });
    }, 'DS: FirebaseAdapter#findRecord ' + typeClass.modelName + ' to ' + ref.toString());
  },

  recordWasPushed: function recordWasPushed(store, modelName, record) {
    if (!record.__listening) {
      var typeClass = store.modelFor(modelName);
      this.listenForChanges(store, typeClass, record);
    }
  },

  recordWillUnload: function recordWillUnload(store, record) {
    if (record.__listening) {
      this.stopListening(store, record.constructor, record);
    }
  },

  recordWillDelete: function recordWillDelete(store, record) {
    var adapter = this;

    record.eachRelationship(function (key, relationship) {
      if (relationship.kind === 'belongsTo') {
        var parentRecord = record.get(relationship.key);
        var inverseKey = record.inverseFor(relationship.key);
        if (inverseKey && parentRecord.get('id')) {
          var parentRef = adapter._getCollectionRef(inverseKey.type, parentRecord.get('id'));
          adapter._removeHasManyRecord(store, parentRef, inverseKey.name, record.id);
        }
      }
    });
  },

  listenForChanges: function listenForChanges(store, typeClass, record) {
    // embedded records will get their changes from parent listeners
    if (!this.isRecordEmbedded(record)) {
      record.__listening = true;
      var adapter = this;
      var ref = this._getCollectionRef(typeClass, record.id);
      var called = false;
      ref.on('value', function FirebaseAdapter$changeListener(snapshot) {
        if (called) {
          adapter._handleChildValue(store, typeClass, snapshot);
        }
        called = true;
      });
    }
  },

  stopListening: function stopListening(store, typeClass, record) {
    if (record.__listening) {
      var ref = this._getCollectionRef(typeClass, record.id);
      ref.off('value');
      record.__listening = false;
    }
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
  findAll: function findAll(store, typeClass) {
    var adapter = this;
    var ref = this._getCollectionRef(typeClass);

    return new Promise(function (resolve, reject) {
      // Listen for child events on the type
      ref.once('value', function (snapshot) {
        if (!adapter._findAllHasEventsForType(typeClass)) {
          adapter._findAllAddEventListeners(store, typeClass, ref);
        }
        var results = [];
        snapshot.forEach(function (childSnapshot) {
          var payload = adapter._assignIdToPayload(childSnapshot);
          adapter._updateRecordCacheForType(typeClass, payload);
          results.push(payload);
        });
        resolve(results);
      }, function (error) {
        reject(error);
      });
    }, 'DS: FirebaseAdapter#findAll ' + typeClass.modelName + ' to ' + ref.toString());
  },

  query: function query(store, typeClass, _query, recordArray) {
    var adapter = this;
    var ref = this._getCollectionRef(typeClass);
    var modelName = typeClass.modelName;

    ref = this.applyQueryToRef(ref, _query);

    ref.on('child_added', function (snapshot) {
      var record = store.peekRecord(modelName, snapshot.key());

      if (!record || !record.__listening) {
        var payload = adapter._assignIdToPayload(snapshot);
        var normalizedData = store.normalize(typeClass.modelName, payload);
        adapter._updateRecordCacheForType(typeClass, payload);
        record = store.push(normalizedData);
      }

      if (record) {
        recordArray.get('content').addObject(record._internalModel);
      }
    });

    // `child_changed` is already handled by the record's
    // value listener after a store.push. `child_moved` is
    // a much less common case because it relates to priority

    ref.on('child_removed', function (snapshot) {
      var record = store.peekRecord(modelName, snapshot.key());
      if (record) {
        recordArray.get('content').removeObject(record._internalModel);
      }
    });

    // clean up event handlers when the array is being destroyed
    // so that future firebase events wont keep trying to use a
    // destroyed store/serializer
    recordArray.__firebaseCleanup = function () {
      ref.off('child_added');
      ref.off('child_removed');
    };

    return new Promise(function (resolve, reject) {
      // Listen for child events on the type
      ref.once('value', function (snapshot) {
        if (!adapter._findAllHasEventsForType(typeClass)) {
          adapter._findAllAddEventListeners(store, typeClass, ref);
        }
        var results = [];
        snapshot.forEach(function (childSnapshot) {
          var payload = adapter._assignIdToPayload(childSnapshot);
          adapter._updateRecordCacheForType(typeClass, payload);
          results.push(payload);
        });
        resolve(results);
      }, function (error) {
        reject(error);
      });
    }, 'DS: FirebaseAdapter#query ' + modelName + ' with ' + _query);
  },

  applyQueryToRef: function applyQueryToRef(ref, query) {

    if (!query.orderBy) {
      query.orderBy = '_key';
    }

    if (query.orderBy === '_key') {
      ref = ref.orderByKey();
    } else if (query.orderBy === '_value') {
      ref = ref.orderByValue();
    } else if (query.orderBy === '_priority') {
      ref = ref.orderByPriority();
    } else {
      ref = ref.orderByChild(query.orderBy);
    }

    ['limitToFirst', 'limitToLast', 'startAt', 'endAt', 'equalTo'].forEach(function (key) {
      if (query[key] || query[key] === '') {
        ref = ref[key](query[key]);
      }
    });

    return ref;
  },

  /**
    Keep track of what types `.findAll()` has been called for
    so duplicate listeners aren't added
  */
  _findAllMapForType: undefined,

  /**
    Determine if the current type is already listening for children events
  */
  _findAllHasEventsForType: function _findAllHasEventsForType(typeClass) {
    return !_ember2['default'].isNone(this._findAllMapForType[typeClass.modelName]);
  },

  /**
    After `.findAll()` is called on a modelName, continue to listen for
    `child_added`, `child_removed`, and `child_changed`
  */
  _findAllAddEventListeners: function _findAllAddEventListeners(store, typeClass, ref) {
    var modelName = typeClass.modelName;
    this._findAllMapForType[modelName] = true;

    var adapter = this;
    ref.on('child_added', function (snapshot) {
      if (!store.hasRecordForId(modelName, adapter._getKey(snapshot))) {
        adapter._handleChildValue(store, typeClass, snapshot);
      }
    });
  },

  /**
    Push a new child record into the store
  */
  _handleChildValue: function _handleChildValue(store, typeClass, snapshot) {
    // No idea why we need this, we are already turning off the callback by
    // calling ref.off in recordWillUnload. Something is fishy here
    if (store.isDestroying) {
      return;
    }
    var value = snapshot.val();
    if (value === null) {
      var id = this._getKey(snapshot);
      var record = store.peekRecord(typeClass.modelName, id);
      // TODO: refactor using ED
      if (!record.get('isDeleted')) {
        record.deleteRecord();
      }
    } else {
      var payload = this._assignIdToPayload(snapshot);

      this._enqueue(function FirebaseAdapter$enqueueStorePush() {
        if (!store.isDestroying) {
          var normalizedData = store.normalize(typeClass.modelName, payload);
          store.push(normalizedData);
        }
      });
    }
  },

  /**
    `createRecord` is an alias for `updateRecord` because calling \
    `ref.set()` would wipe out any existing relationships
  */
  createRecord: function createRecord(store, typeClass, snapshot) {
    var adapter = this;
    return this.updateRecord(store, typeClass, snapshot).then(function () {
      adapter.listenForChanges(store, typeClass, snapshot.record);
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
  updateRecord: function updateRecord(store, typeClass, snapshot) {
    var adapter = this;
    var recordRef = this._getAbsoluteRef(snapshot.record);
    var recordCache = adapter._getRecordCache(typeClass, snapshot.id);

    var pathPieces = recordRef.path.toString().split('/');
    var lastPiece = pathPieces[pathPieces.length - 1];
    var serializedRecord = snapshot.serialize({
      includeId: lastPiece !== snapshot.id // record has no firebase `key` in path
    });

    return new Promise(function (resolve, reject) {
      var savedRelationships = _ember2['default'].A();
      snapshot.record.eachRelationship(function (key, relationship) {
        var save;
        if (relationship.kind === 'hasMany') {
          if (serializedRecord[key]) {
            save = adapter._saveHasManyRelationship(store, typeClass, relationship, serializedRecord[key], recordRef, recordCache);
            savedRelationships.push(save);
            // Remove the relationship from the serializedRecord because otherwise we would clobber the entire hasMany
            delete serializedRecord[key];
          }
        } else {
          if (adapter.isRelationshipEmbedded(store, typeClass.modelName, relationship) && serializedRecord[key]) {
            save = adapter._saveEmbeddedBelongsToRecord(store, typeClass, relationship, serializedRecord[key], recordRef);
            savedRelationships.push(save);
            delete serializedRecord[key];
          }
        }
      });

      var relationshipsPromise = _ember2['default'].RSVP.allSettled(savedRelationships);
      var recordPromise = adapter._updateRecord(recordRef, serializedRecord);

      _ember2['default'].RSVP.hashSettled({ relationships: relationshipsPromise, record: recordPromise }).then(function (promises) {
        var rejected = _ember2['default'].A(promises.relationships.value).filterBy('state', 'rejected');
        if (promises.record.state === 'rejected') {
          rejected.push(promises.record);
        }
        // Throw an error if any of the relationships failed to save
        if (rejected.length !== 0) {
          var error = new Error('Some errors were encountered while saving ' + typeClass + ' ' + snapshot.id);
          error.errors = _ember2['default'].A(rejected).mapBy('reason');
          reject(error);
        } else {
          resolve();
        }
      });
    }, 'DS: FirebaseAdapter#updateRecord ' + typeClass + ' to ' + recordRef.toString());
  },

  //Just update the record itself without caring for the relationships
  _updateRecord: function _updateRecord(recordRef, serializedRecord) {
    return (0, _utilsToPromise2['default'])(recordRef.update, recordRef, [serializedRecord]);
  },

  /**
    Call _saveHasManyRelationshipRecord on each record in the relationship
    and then resolve once they have all settled
  */
  _saveHasManyRelationship: function _saveHasManyRelationship(store, typeClass, relationship, ids, recordRef, recordCache) {
    if (!_ember2['default'].isArray(ids)) {
      throw new Error('hasMany relationships must must be an array');
    }
    var adapter = this;
    var idsCache = _ember2['default'].A(recordCache[relationship.key]);
    var dirtyRecords = [];

    // Added
    var addedRecords = (0, _lodashCollectionFilter2['default'])(ids, function (id) {
      return !idsCache.contains(id);
    });

    // Dirty
    dirtyRecords = (0, _lodashCollectionFilter2['default'])(ids, function (id) {
      var relatedModelName = relationship.type;
      return store.hasRecordForId(relatedModelName, id) && store.peekRecord(relatedModelName, id).get('hasDirtyAttributes') === true;
    });

    dirtyRecords = (0, _lodashCollectionMap2['default'])(uniq(dirtyRecords.concat(addedRecords)), function (id) {
      return adapter._saveHasManyRecord(store, typeClass, relationship, recordRef, id);
    });

    // Removed
    var removedRecords = (0, _lodashCollectionFilter2['default'])(idsCache, function (id) {
      return !(0, _lodashCollectionIncludes2['default'])(ids, id);
    });

    removedRecords = (0, _lodashCollectionMap2['default'])(removedRecords, function (id) {
      return adapter._removeHasManyRecord(store, recordRef, relationship.key, id);
    });
    // Combine all the saved records
    var savedRecords = dirtyRecords.concat(removedRecords);
    // Wait for all the updates to finish
    return _ember2['default'].RSVP.allSettled(savedRecords).then(function (savedRecords) {
      var rejected = _ember2['default'].A(_ember2['default'].A(savedRecords).filterBy('state', 'rejected'));
      if (rejected.get('length') === 0) {
        // Update the cache
        recordCache[relationship.key] = ids;
        return savedRecords;
      } else {
        var error = new Error('Some errors were encountered while saving a hasMany relationship ' + relationship.parentType + ' -> ' + relationship.type);
        error.errors = _ember2['default'].A(rejected).mapBy('reason');
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
  _saveHasManyRecord: function _saveHasManyRecord(store, typeClass, relationship, parentRef, id) {
    var ref = this._getRelationshipRef(parentRef, relationship.key, id);
    var record = store.peekRecord(relationship.type, id);
    var isEmbedded = this.isRelationshipEmbedded(store, typeClass.modelName, relationship);
    if (isEmbedded) {
      return record.save();
    }

    return (0, _utilsToPromise2['default'])(ref.set, ref, [true]);
  },

  /**
   * Determine from the serializer if the relationship is embedded via the
   * serializer's `attrs` hash.
   *
   * @return {Boolean}              Is the relationship embedded?
   */
  isRelationshipEmbedded: function isRelationshipEmbedded(store, modelName, relationship) {
    var serializer = store.serializerFor(modelName);
    return serializer.hasDeserializeRecordsOption(relationship.key);
  },

  /**
   * Determine from if the record is embedded via implicit relationships.
   *
   * @return {Boolean}              Is the relationship embedded?
   */
  isRecordEmbedded: function isRecordEmbedded(record) {
    if (record._internalModel) {
      record = record._internalModel;
    }

    var found = this.getFirstEmbeddingParent(record);

    return !!found;
  },

  /**
    Remove a relationship
  */
  _removeHasManyRecord: function _removeHasManyRecord(store, parentRef, key, id) {
    var ref = this._getRelationshipRef(parentRef, key, id);
    return (0, _utilsToPromise2['default'])(ref.remove, ref, [], ref.toString());
  },

  /**
   * Save an embedded belongsTo record and set its internal firebase ref
   *
   * @return {Promise<DS.Model>}
   */
  _saveEmbeddedBelongsToRecord: function _saveEmbeddedBelongsToRecord(store, typeClass, relationship, id, parentRef) {
    var record = store.peekRecord(relationship.type, id);
    if (record) {
      return record.save();
    }
    return _ember2['default'].RSVP.Promise.reject(new Error('Unable to find record with id ' + id + ' from embedded relationship: ' + JSON.stringify(relationship)));
  },

  /**
    Called by the store when a record is deleted.
  */
  deleteRecord: function deleteRecord(store, typeClass, snapshot) {
    var ref = this._getAbsoluteRef(snapshot.record);
    return (0, _utilsToPromise2['default'])(ref.remove, ref);
  },

  /**
    Determines a path fo a given type
  */
  pathForType: function pathForType(modelName) {
    var camelized = _ember2['default'].String.camelize(modelName);
    return _ember2['default'].String.pluralize(camelized);
  },

  /**
    Return a Firebase reference for a given modelName and optional ID.
  */
  _getCollectionRef: function _getCollectionRef(typeClass, id) {
    var ref = this._ref;
    if (typeClass) {
      ref = ref.child(this.pathForType(typeClass.modelName));
    }
    if (id) {
      ref = ref.child(id);
    }
    return ref;
  },

  /**
   * Returns a Firebase reference for a record taking into account if the record is embedded
   *
   * @param  {DS.Model} record
   * @return {Firebase}
   */
  _getAbsoluteRef: function _getAbsoluteRef(record) {
    if (record._internalModel) {
      record = record._internalModel;
    }

    var embeddingParent = this.getFirstEmbeddingParent(record);

    if (embeddingParent) {
      var parent = embeddingParent.record;
      var relationship = embeddingParent.relationship;

      var recordRef = this._getAbsoluteRef(parent).child(relationship.key);

      if (relationship.kind === 'hasMany') {
        recordRef = recordRef.child(record.id);
      }
      return recordRef;
    }

    return this._getCollectionRef(record.type, record.id);
  },

  /**
   * Returns the parent record and relationship where any embedding is detected
   *
   * @param  {DS.InternalModel} internalModel
   * @return {Object}
   */
  getFirstEmbeddingParent: function getFirstEmbeddingParent(internalModel) {
    var _this = this;

    var embeddingParentRel = (0, _lodashCollectionFind2['default'])(internalModel._implicitRelationships, function (implicitRel) {
      var members = implicitRel.members.toArray();
      var parent = members[0];

      if (!parent) {
        return false;
      }

      var parentRel = parent._relationships.get(implicitRel.inverseKey);
      return _this.isRelationshipEmbedded(_this.store, parent.type.modelName, parentRel.relationshipMeta);
    });

    if (embeddingParentRel) {
      var parent = embeddingParentRel.members.toArray()[0];
      var parentKey = embeddingParentRel.inverseKey;
      var parentRel = parent._relationships.get(parentKey).relationshipMeta;
      return { record: parent, relationship: parentRel };
    }
  },

  /**
    Return a Firebase reference based on a relationship key and record id
  */
  _getRelationshipRef: function _getRelationshipRef(ref, key, id) {
    return ref.child(key).child(id);
  },

  /**
    The amount of time (ms) before the _queue is flushed
  */
  _queueFlushDelay: 1000 / 60, // 60fps

  /**
    Called after the first item is pushed into the _queue
  */
  _queueScheduleFlush: function _queueScheduleFlush() {
    _ember2['default'].run.later(this, this._queueFlush, this._queueFlushDelay);
  },

  /**
    Call each function in the _queue and the reset the _queue
  */
  _queueFlush: function _queueFlush() {
    (0, _lodashCollectionForEach2['default'])(this._queue, function FirebaseAdapter$flushQueueItem(queueItem) {
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
  _enqueue: function _enqueue(callback, args) {
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
  _updateRecordCacheForType: function _updateRecordCacheForType(typeClass, payload) {
    if (!payload) {
      return;
    }
    var id = payload.id;
    var cache = this._getRecordCache(typeClass, id);
    // Only cache relationships for now
    typeClass.eachRelationship(function (key, relationship) {
      if (relationship.kind === 'hasMany') {
        var ids = payload[key];
        cache[key] = !_ember2['default'].isNone(ids) ? _ember2['default'].A(Object.keys(ids)) : _ember2['default'].A();
      }
    });
  },

  /**
    Get or create the cache for a record
   */
  _getRecordCache: function _getRecordCache(typeClass, id) {
    var modelName = typeClass.modelName;
    var cache = this._recordCacheForType;
    cache[modelName] = cache[modelName] || {};
    cache[modelName][id] = cache[modelName][id] || {};
    return cache[modelName][id];
  },

  /**
   * A utility for retrieving the key name of a Firebase ref or
   * DataSnapshot. This is backwards-compatible with `name()`
   * from Firebase 1.x.x and `key()` from Firebase 2.0.0+. Once
   * support for Firebase 1.x.x is dropped in EmberFire, this
   * helper can be removed.
   */
  _getKey: function _getKey(refOrSnapshot) {
    return typeof refOrSnapshot.key === 'function' ? refOrSnapshot.key() : refOrSnapshot.name();
  },

  /**
   * We don't need background reloading, because firebase!
   */
  shouldBackgroundReloadRecord: function shouldBackgroundReloadRecord() {
    return false;
  }
});
module.exports = exports['default'];

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"../utils/to-promise":4,"lodash/array/indexOf":5,"lodash/collection/filter":7,"lodash/collection/find":8,"lodash/collection/forEach":9,"lodash/collection/includes":10,"lodash/collection/map":11}],2:[function(require,module,exports){
(function (global){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _ember = (typeof window !== "undefined" ? window['Ember'] : typeof global !== "undefined" ? global['Ember'] : null);

var _ember2 = _interopRequireDefault(_ember);

var _emberData = (typeof window !== "undefined" ? window['DS'] : typeof global !== "undefined" ? global['DS'] : null);

var _emberData2 = _interopRequireDefault(_emberData);

var _firebase = (typeof window !== "undefined" ? window['Firebase'] : typeof global !== "undefined" ? global['Firebase'] : null);

var _firebase2 = _interopRequireDefault(_firebase);

var _adaptersFirebase = require('../adapters/firebase');

var _adaptersFirebase2 = _interopRequireDefault(_adaptersFirebase);

var _serializersFirebase = require('../serializers/firebase');

var _serializersFirebase2 = _interopRequireDefault(_serializersFirebase);

var _lodashCollectionForEach = require('lodash/collection/forEach');

var _lodashCollectionForEach2 = _interopRequireDefault(_lodashCollectionForEach);

var VERSION = '1.6.3';

if (_ember2['default'].libraries) {
  if (_firebase2['default'].SDK_VERSION) {
    _ember2['default'].libraries.registerCoreLibrary('Firebase', _firebase2['default'].SDK_VERSION);
  }

  _ember2['default'].libraries.registerCoreLibrary('EmberFire', VERSION);
}

exports['default'] = {
  name: 'emberfire',
  before: 'ember-data',
  initialize: function initialize() {

    // To support Ember versions below 2.1.0 as well.
    // See http://emberjs.com/deprecations/v2.x/#toc_initializer-arity
    var application = arguments[1] || arguments[0];

    application.register('adapter:-firebase', _adaptersFirebase2['default']);
    application.register('serializer:-firebase', _serializersFirebase2['default']);

    // Monkeypatch the store until ED gives us a good way to listen to push events
    if (!_emberData2['default'].Store.prototype._emberfirePatched) {
      _emberData2['default'].Store.reopen({
        _emberfirePatched: true,
        push: function push() {
          var _this = this;

          var result = this._super.apply(this, arguments);
          var records = result;

          if (!_ember2['default'].isArray(result)) {
            records = [result];
          }

          (0, _lodashCollectionForEach2['default'])(records, function (record) {
            var modelName = record.constructor.modelName;
            var adapter = _this.adapterFor(modelName);
            if (adapter.recordWasPushed) {
              adapter.recordWasPushed(_this, modelName, record);
            }
          });

          return result;
        },

        recordWillUnload: function recordWillUnload(record) {
          var adapter = this.adapterFor(record.constructor.modelName);
          if (adapter.recordWillUnload) {
            adapter.recordWillUnload(this, record);
          }
        },

        recordWillDelete: function recordWillDelete(record) {
          var adapter = this.adapterFor(record.constructor.modelName);
          if (adapter.recordWillDelete) {
            adapter.recordWillDelete(this, record);
          }
        }
      });
    }

    if (!_emberData2['default'].Model.prototype._emberfirePatched) {
      _emberData2['default'].Model.reopen({
        _emberfirePatched: true,
        unloadRecord: function unloadRecord() {
          this.store.recordWillUnload(this);
          return this._super();
        },
        deleteRecord: function deleteRecord() {
          this.store.recordWillDelete(this);
          this._super();
        },

        ref: function ref() {
          var adapter = this.store.adapterFor(this.constructor.modelName);
          if (adapter._getAbsoluteRef) {
            return adapter._getAbsoluteRef(this);
          }
        }
      });
    }

    if (!_emberData2['default'].AdapterPopulatedRecordArray.prototype._emberfirePatched) {
      _emberData2['default'].AdapterPopulatedRecordArray.reopen({
        _emberfirePatched: true,
        willDestroy: function willDestroy() {
          if (this.__firebaseCleanup) {
            this.__firebaseCleanup();
          }
          return this._super();
        }
      });
    }

    _emberData2['default'].FirebaseAdapter = _adaptersFirebase2['default'];
    _emberData2['default'].FirebaseSerializer = _serializersFirebase2['default'];
  }
};
module.exports = exports['default'];

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"../adapters/firebase":1,"../serializers/firebase":3,"lodash/collection/forEach":9}],3:[function(require,module,exports){
(function (global){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _ember = (typeof window !== "undefined" ? window['Ember'] : typeof global !== "undefined" ? global['Ember'] : null);

var _ember2 = _interopRequireDefault(_ember);

var _emberData = (typeof window !== "undefined" ? window['DS'] : typeof global !== "undefined" ? global['DS'] : null);

var _emberData2 = _interopRequireDefault(_emberData);

var _lodashObjectAssign = require('lodash/object/assign');

var _lodashObjectAssign2 = _interopRequireDefault(_lodashObjectAssign);

/**
 * The Firebase serializer helps normalize relationships and can be extended on
 * a per model basis.
 */
exports['default'] = _emberData2['default'].JSONSerializer.extend(_emberData2['default'].EmbeddedRecordsMixin, {
  isNewSerializerAPI: true,

  /**
   * Firebase does not send null values, it omits the key altogether. This nullifies omitted
   * properties so that property deletions sync correctly.
   *
   * @override
   */
  extractAttributes: function extractAttributes(modelClass, resourceHash) {
    var attributes = this._super(modelClass, resourceHash);

    // nullify omitted attributes
    modelClass.eachAttribute(function (key) {
      if (!attributes.hasOwnProperty(key)) {
        attributes[key] = null;
      }
    });

    return attributes;
  },

  /**
   * @override
   */
  extractRelationships: function extractRelationships(modelClass, payload) {
    this.normalizeRelationships(modelClass, payload);

    return this._super(modelClass, payload);
  },

  /**
   * Normalizes `hasMany` relationship structure before passing
   * to `JSONSerializer.extractRelationships`
   *
   * before:
   *
   * ```js
   * {
   *   comments: {
   *     abc: true,
   *     def: true,
   *   }
   * }
   * ```
   *
   * after:
   *
   * ```js
   * {
   *   comments: [ 'abc', 'def' ]
   * }
   * ```
   *
   * Or for embedded objects:
   *
   * ```js
   * {
   *   comments: {
   *     'abc': { body: 'a' },
   *     'def': { body: 'd' )
   *   }
   * }
   * ```
   *
   * these should become:
   *
   * ```js
   * {
   *   comments: [
   *     {
   *       id: 'abc',
   *       body: 'a'
   *     },
   *     {
   *       id: 'def',
   *       body: 'd'
   *     }
   *   ]
   * }
   * ```
   */
  normalizeRelationships: function normalizeRelationships(modelClass, payload) {
    var _this = this;

    modelClass.eachRelationship(function (key, meta) {
      if (meta.kind === 'hasMany') {
        if (payload.hasOwnProperty(key)) {

          // embedded
          if (_this.hasDeserializeRecordsOption(key)) {
            if (typeof payload[key] === 'object' && !_ember2['default'].isArray(payload[key])) {
              payload[key] = Object.keys(payload[key]).map(function (id) {
                return (0, _lodashObjectAssign2['default'])({ id: id }, payload[key][id]);
              });
            } else if (_ember2['default'].isArray(payload[key])) {
              payload[key] = _this._addNumericIdsToEmbeddedArray(payload[key]);
            } else {
              throw new Error(modelClass.toString() + ' relationship ' + meta.kind + '(\'' + meta.type + '\') must contain embedded records with an `id`. Example: { "' + key + '": { "' + meta.type + '_1": { "id": "' + meta.type + '_1" } } } instead got: ' + JSON.stringify(payload[key]));
            }
          }

          // normalized
          else {
              if (typeof payload[key] === 'object' && !_ember2['default'].isArray(payload[key])) {
                payload[key] = Object.keys(payload[key]);
              } else if (_ember2['default'].isArray(payload[key])) {
                payload[key] = _this._convertBooleanArrayToIds(payload[key]);
              } else {
                throw new Error(modelClass.toString() + ' relationship ' + meta.kind + '(\'' + meta.type + '\') must be a key/value map. Example: { "' + key + '": { "' + meta.type + '_1": true } } instead got: ' + JSON.stringify(payload[key]));
              }
            }
        }

        // hasMany property is not present
        // server will not send a property which has no content
        // (i.e. it will never send `comments: null`) so we need to
        // force the empty relationship
        else {
            payload[key] = [];
          }
      }

      if (meta.kind === 'belongsTo') {
        if (!payload.hasOwnProperty(key)) {
          // server wont send property if it was made null elsewhere
          payload[key] = null;
        }
      }
    });
  },

  /**
   * Coerce arrays back into relationship arrays. When numeric ids are used
   * the firebase server will send back arrays instead of object hashes in
   * certain situations.
   *
   * See the conditions and reasoning here:
   * https://www.firebase.com/docs/web/guide/understanding-data.html#section-arrays-in-firebase
   *
   * Stored in Firebase:
   *
   * ```json
   * {
   *   "0": true,
   *   "1": true,
   *   "3": true
   * }
   * ```
   *
   * Given back by the JS client:
   *
   * ```js
   * [true, true, null, true]
   * ```
   *
   * What we need:
   *
   * ```js
   * [ "0", "1", "3" ]
   * ```
   *
   * @param {Array} arr   Input array
   * @return {Array}      Fixed array
   * @private
   */
  _convertBooleanArrayToIds: function _convertBooleanArrayToIds(arr) {
    var result = [];
    for (var i = 0; i < arr.length; i++) {
      if (arr[i] === true) {
        result.push('' + i);
      } else if (typeof arr[i] === 'string') {
        throw new Error('hasMany relationship contains invalid data, should be in the form: { comment_1: true, comment_2: true } but was ' + JSON.stringify(arr));
      }
    }
    return result;
  },

  /**
   * Fix embedded array ids.
   *
   * Objects are stored in Firebase with their id in the key only:
   *
   * ```json
   * {
   *   "0": { obj0 },
   *   "1": { obj1 },
   *   "3": { obj3 }
   * }
   * ```
   *
   * Given back by the JS client:
   *
   * ```js
   * [{ obj0 }, { obj1 }, null, { obj3 }]
   * ```
   *
   * What we need:
   *
   * ```js
   * [ { id: '0', ...obj0 }, { id: '1', ...obj1 }, { id: '3', ...obj3 } ]
   * ```
   *
   * https://www.firebase.com/docs/web/guide/understanding-data.html#section-arrays-in-firebase
   *
   * @param {Array} arr   Input array
   * @return {Array}      Fixed array
   * @private
   */
  _addNumericIdsToEmbeddedArray: function _addNumericIdsToEmbeddedArray(arr) {
    var result = [];
    for (var i = 0; i < arr.length; i++) {
      if (arr[i]) {
        if (typeof arr[i] !== 'object') {
          throw new Error('expecting embedded object hash but found ' + JSON.stringify(arr[i]));
        }
        result.push((0, _lodashObjectAssign2['default'])({ id: '' + i }, arr[i]));
      }
    }
    return result;
  },

  /**
   * Even when records are embedded, bypass EmbeddedRecordsMixin
   * and invoke JSONSerializer's method which serializes to ids only.
   *
   * The adapter handles saving the embedded records via `r.save()`
   * and ensures that dirty states and rollback work.
   *
   * Will not be neccesary when this issue is resolved:
   *
   * https://github.com/emberjs/data/issues/2487
   *
   * @override
   */
  serializeHasMany: function serializeHasMany(snapshot, json, relationship) {
    _emberData2['default'].JSONSerializer.prototype.serializeHasMany.call(this, snapshot, json, relationship);
  },

  /**
   * @see #serializeHasMany
   * @override
   */
  serializeBelongsTo: function serializeBelongsTo(snapshot, json, relationship) {
    _emberData2['default'].JSONSerializer.prototype.serializeBelongsTo.call(this, snapshot, json, relationship);
  },

  /**
   * @override
   */
  _shouldSerializeHasMany: function _shouldSerializeHasMany(snapshot, key, relationship) {
    return this._canSerialize(key);
  }
});
module.exports = exports['default'];

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"lodash/object/assign":72}],4:[function(require,module,exports){
(function (global){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _ember = (typeof window !== "undefined" ? window['Ember'] : typeof global !== "undefined" ? global['Ember'] : null);

var _ember2 = _interopRequireDefault(_ember);

exports['default'] = function (fn, context, _args, errorMsg) {
  var args = _args || [];
  return new _ember2['default'].RSVP.Promise(function (resolve, reject) {
    var callback = function callback(error) {
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

module.exports = exports['default'];

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{}],5:[function(require,module,exports){
var baseIndexOf = require('../internal/baseIndexOf'),
    binaryIndex = require('../internal/binaryIndex');

/* Native method references for those with the same name as other `lodash` methods. */
var nativeMax = Math.max;

/**
 * Gets the index at which the first occurrence of `value` is found in `array`
 * using [`SameValueZero`](http://ecma-international.org/ecma-262/6.0/#sec-samevaluezero)
 * for equality comparisons. If `fromIndex` is negative, it is used as the offset
 * from the end of `array`. If `array` is sorted providing `true` for `fromIndex`
 * performs a faster binary search.
 *
 * @static
 * @memberOf _
 * @category Array
 * @param {Array} array The array to search.
 * @param {*} value The value to search for.
 * @param {boolean|number} [fromIndex=0] The index to search from or `true`
 *  to perform a binary search on a sorted array.
 * @returns {number} Returns the index of the matched value, else `-1`.
 * @example
 *
 * _.indexOf([1, 2, 1, 2], 2);
 * // => 1
 *
 * // using `fromIndex`
 * _.indexOf([1, 2, 1, 2], 2, 2);
 * // => 3
 *
 * // performing a binary search
 * _.indexOf([1, 1, 2, 2], 2, true);
 * // => 2
 */
function indexOf(array, value, fromIndex) {
  var length = array ? array.length : 0;
  if (!length) {
    return -1;
  }
  if (typeof fromIndex == 'number') {
    fromIndex = fromIndex < 0 ? nativeMax(length + fromIndex, 0) : fromIndex;
  } else if (fromIndex) {
    var index = binaryIndex(array, value);
    if (index < length &&
        (value === value ? (value === array[index]) : (array[index] !== array[index]))) {
      return index;
    }
    return -1;
  }
  return baseIndexOf(array, value, fromIndex || 0);
}

module.exports = indexOf;

},{"../internal/baseIndexOf":28,"../internal/binaryIndex":40}],6:[function(require,module,exports){
/**
 * Gets the last element of `array`.
 *
 * @static
 * @memberOf _
 * @category Array
 * @param {Array} array The array to query.
 * @returns {*} Returns the last element of `array`.
 * @example
 *
 * _.last([1, 2, 3]);
 * // => 3
 */
function last(array) {
  var length = array ? array.length : 0;
  return length ? array[length - 1] : undefined;
}

module.exports = last;

},{}],7:[function(require,module,exports){
var arrayFilter = require('../internal/arrayFilter'),
    baseCallback = require('../internal/baseCallback'),
    baseFilter = require('../internal/baseFilter'),
    isArray = require('../lang/isArray');

/**
 * Iterates over elements of `collection`, returning an array of all elements
 * `predicate` returns truthy for. The predicate is bound to `thisArg` and
 * invoked with three arguments: (value, index|key, collection).
 *
 * If a property name is provided for `predicate` the created `_.property`
 * style callback returns the property value of the given element.
 *
 * If a value is also provided for `thisArg` the created `_.matchesProperty`
 * style callback returns `true` for elements that have a matching property
 * value, else `false`.
 *
 * If an object is provided for `predicate` the created `_.matches` style
 * callback returns `true` for elements that have the properties of the given
 * object, else `false`.
 *
 * @static
 * @memberOf _
 * @alias select
 * @category Collection
 * @param {Array|Object|string} collection The collection to iterate over.
 * @param {Function|Object|string} [predicate=_.identity] The function invoked
 *  per iteration.
 * @param {*} [thisArg] The `this` binding of `predicate`.
 * @returns {Array} Returns the new filtered array.
 * @example
 *
 * _.filter([4, 5, 6], function(n) {
 *   return n % 2 == 0;
 * });
 * // => [4, 6]
 *
 * var users = [
 *   { 'user': 'barney', 'age': 36, 'active': true },
 *   { 'user': 'fred',   'age': 40, 'active': false }
 * ];
 *
 * // using the `_.matches` callback shorthand
 * _.pluck(_.filter(users, { 'age': 36, 'active': true }), 'user');
 * // => ['barney']
 *
 * // using the `_.matchesProperty` callback shorthand
 * _.pluck(_.filter(users, 'active', false), 'user');
 * // => ['fred']
 *
 * // using the `_.property` callback shorthand
 * _.pluck(_.filter(users, 'active'), 'user');
 * // => ['barney']
 */
function filter(collection, predicate, thisArg) {
  var func = isArray(collection) ? arrayFilter : baseFilter;
  predicate = baseCallback(predicate, thisArg, 3);
  return func(collection, predicate);
}

module.exports = filter;

},{"../internal/arrayFilter":14,"../internal/baseCallback":19,"../internal/baseFilter":22,"../lang/isArray":66}],8:[function(require,module,exports){
var baseEach = require('../internal/baseEach'),
    createFind = require('../internal/createFind');

/**
 * Iterates over elements of `collection`, returning the first element
 * `predicate` returns truthy for. The predicate is bound to `thisArg` and
 * invoked with three arguments: (value, index|key, collection).
 *
 * If a property name is provided for `predicate` the created `_.property`
 * style callback returns the property value of the given element.
 *
 * If a value is also provided for `thisArg` the created `_.matchesProperty`
 * style callback returns `true` for elements that have a matching property
 * value, else `false`.
 *
 * If an object is provided for `predicate` the created `_.matches` style
 * callback returns `true` for elements that have the properties of the given
 * object, else `false`.
 *
 * @static
 * @memberOf _
 * @alias detect
 * @category Collection
 * @param {Array|Object|string} collection The collection to search.
 * @param {Function|Object|string} [predicate=_.identity] The function invoked
 *  per iteration.
 * @param {*} [thisArg] The `this` binding of `predicate`.
 * @returns {*} Returns the matched element, else `undefined`.
 * @example
 *
 * var users = [
 *   { 'user': 'barney',  'age': 36, 'active': true },
 *   { 'user': 'fred',    'age': 40, 'active': false },
 *   { 'user': 'pebbles', 'age': 1,  'active': true }
 * ];
 *
 * _.result(_.find(users, function(chr) {
 *   return chr.age < 40;
 * }), 'user');
 * // => 'barney'
 *
 * // using the `_.matches` callback shorthand
 * _.result(_.find(users, { 'age': 1, 'active': true }), 'user');
 * // => 'pebbles'
 *
 * // using the `_.matchesProperty` callback shorthand
 * _.result(_.find(users, 'active', false), 'user');
 * // => 'fred'
 *
 * // using the `_.property` callback shorthand
 * _.result(_.find(users, 'active'), 'user');
 * // => 'barney'
 */
var find = createFind(baseEach);

module.exports = find;

},{"../internal/baseEach":21,"../internal/createFind":46}],9:[function(require,module,exports){
var arrayEach = require('../internal/arrayEach'),
    baseEach = require('../internal/baseEach'),
    createForEach = require('../internal/createForEach');

/**
 * Iterates over elements of `collection` invoking `iteratee` for each element.
 * The `iteratee` is bound to `thisArg` and invoked with three arguments:
 * (value, index|key, collection). Iteratee functions may exit iteration early
 * by explicitly returning `false`.
 *
 * **Note:** As with other "Collections" methods, objects with a "length" property
 * are iterated like arrays. To avoid this behavior `_.forIn` or `_.forOwn`
 * may be used for object iteration.
 *
 * @static
 * @memberOf _
 * @alias each
 * @category Collection
 * @param {Array|Object|string} collection The collection to iterate over.
 * @param {Function} [iteratee=_.identity] The function invoked per iteration.
 * @param {*} [thisArg] The `this` binding of `iteratee`.
 * @returns {Array|Object|string} Returns `collection`.
 * @example
 *
 * _([1, 2]).forEach(function(n) {
 *   console.log(n);
 * }).value();
 * // => logs each value from left to right and returns the array
 *
 * _.forEach({ 'a': 1, 'b': 2 }, function(n, key) {
 *   console.log(n, key);
 * });
 * // => logs each value-key pair and returns the object (iteration order is not guaranteed)
 */
var forEach = createForEach(arrayEach, baseEach);

module.exports = forEach;

},{"../internal/arrayEach":13,"../internal/baseEach":21,"../internal/createForEach":47}],10:[function(require,module,exports){
var baseIndexOf = require('../internal/baseIndexOf'),
    getLength = require('../internal/getLength'),
    isArray = require('../lang/isArray'),
    isIterateeCall = require('../internal/isIterateeCall'),
    isLength = require('../internal/isLength'),
    isString = require('../lang/isString'),
    values = require('../object/values');

/* Native method references for those with the same name as other `lodash` methods. */
var nativeMax = Math.max;

/**
 * Checks if `value` is in `collection` using
 * [`SameValueZero`](http://ecma-international.org/ecma-262/6.0/#sec-samevaluezero)
 * for equality comparisons. If `fromIndex` is negative, it is used as the offset
 * from the end of `collection`.
 *
 * @static
 * @memberOf _
 * @alias contains, include
 * @category Collection
 * @param {Array|Object|string} collection The collection to search.
 * @param {*} target The value to search for.
 * @param {number} [fromIndex=0] The index to search from.
 * @param- {Object} [guard] Enables use as a callback for functions like `_.reduce`.
 * @returns {boolean} Returns `true` if a matching element is found, else `false`.
 * @example
 *
 * _.includes([1, 2, 3], 1);
 * // => true
 *
 * _.includes([1, 2, 3], 1, 2);
 * // => false
 *
 * _.includes({ 'user': 'fred', 'age': 40 }, 'fred');
 * // => true
 *
 * _.includes('pebbles', 'eb');
 * // => true
 */
function includes(collection, target, fromIndex, guard) {
  var length = collection ? getLength(collection) : 0;
  if (!isLength(length)) {
    collection = values(collection);
    length = collection.length;
  }
  if (typeof fromIndex != 'number' || (guard && isIterateeCall(target, fromIndex, guard))) {
    fromIndex = 0;
  } else {
    fromIndex = fromIndex < 0 ? nativeMax(length + fromIndex, 0) : (fromIndex || 0);
  }
  return (typeof collection == 'string' || !isArray(collection) && isString(collection))
    ? (fromIndex <= length && collection.indexOf(target, fromIndex) > -1)
    : (!!length && baseIndexOf(collection, target, fromIndex) > -1);
}

module.exports = includes;

},{"../internal/baseIndexOf":28,"../internal/getLength":51,"../internal/isIterateeCall":57,"../internal/isLength":59,"../lang/isArray":66,"../lang/isString":70,"../object/values":76}],11:[function(require,module,exports){
var arrayMap = require('../internal/arrayMap'),
    baseCallback = require('../internal/baseCallback'),
    baseMap = require('../internal/baseMap'),
    isArray = require('../lang/isArray');

/**
 * Creates an array of values by running each element in `collection` through
 * `iteratee`. The `iteratee` is bound to `thisArg` and invoked with three
 * arguments: (value, index|key, collection).
 *
 * If a property name is provided for `iteratee` the created `_.property`
 * style callback returns the property value of the given element.
 *
 * If a value is also provided for `thisArg` the created `_.matchesProperty`
 * style callback returns `true` for elements that have a matching property
 * value, else `false`.
 *
 * If an object is provided for `iteratee` the created `_.matches` style
 * callback returns `true` for elements that have the properties of the given
 * object, else `false`.
 *
 * Many lodash methods are guarded to work as iteratees for methods like
 * `_.every`, `_.filter`, `_.map`, `_.mapValues`, `_.reject`, and `_.some`.
 *
 * The guarded methods are:
 * `ary`, `callback`, `chunk`, `clone`, `create`, `curry`, `curryRight`,
 * `drop`, `dropRight`, `every`, `fill`, `flatten`, `invert`, `max`, `min`,
 * `parseInt`, `slice`, `sortBy`, `take`, `takeRight`, `template`, `trim`,
 * `trimLeft`, `trimRight`, `trunc`, `random`, `range`, `sample`, `some`,
 * `sum`, `uniq`, and `words`
 *
 * @static
 * @memberOf _
 * @alias collect
 * @category Collection
 * @param {Array|Object|string} collection The collection to iterate over.
 * @param {Function|Object|string} [iteratee=_.identity] The function invoked
 *  per iteration.
 * @param {*} [thisArg] The `this` binding of `iteratee`.
 * @returns {Array} Returns the new mapped array.
 * @example
 *
 * function timesThree(n) {
 *   return n * 3;
 * }
 *
 * _.map([1, 2], timesThree);
 * // => [3, 6]
 *
 * _.map({ 'a': 1, 'b': 2 }, timesThree);
 * // => [3, 6] (iteration order is not guaranteed)
 *
 * var users = [
 *   { 'user': 'barney' },
 *   { 'user': 'fred' }
 * ];
 *
 * // using the `_.property` callback shorthand
 * _.map(users, 'user');
 * // => ['barney', 'fred']
 */
function map(collection, iteratee, thisArg) {
  var func = isArray(collection) ? arrayMap : baseMap;
  iteratee = baseCallback(iteratee, thisArg, 3);
  return func(collection, iteratee);
}

module.exports = map;

},{"../internal/arrayMap":15,"../internal/baseCallback":19,"../internal/baseMap":32,"../lang/isArray":66}],12:[function(require,module,exports){
/** Used as the `TypeError` message for "Functions" methods. */
var FUNC_ERROR_TEXT = 'Expected a function';

/* Native method references for those with the same name as other `lodash` methods. */
var nativeMax = Math.max;

/**
 * Creates a function that invokes `func` with the `this` binding of the
 * created function and arguments from `start` and beyond provided as an array.
 *
 * **Note:** This method is based on the [rest parameter](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/rest_parameters).
 *
 * @static
 * @memberOf _
 * @category Function
 * @param {Function} func The function to apply a rest parameter to.
 * @param {number} [start=func.length-1] The start position of the rest parameter.
 * @returns {Function} Returns the new function.
 * @example
 *
 * var say = _.restParam(function(what, names) {
 *   return what + ' ' + _.initial(names).join(', ') +
 *     (_.size(names) > 1 ? ', & ' : '') + _.last(names);
 * });
 *
 * say('hello', 'fred', 'barney', 'pebbles');
 * // => 'hello fred, barney, & pebbles'
 */
function restParam(func, start) {
  if (typeof func != 'function') {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  start = nativeMax(start === undefined ? (func.length - 1) : (+start || 0), 0);
  return function() {
    var args = arguments,
        index = -1,
        length = nativeMax(args.length - start, 0),
        rest = Array(length);

    while (++index < length) {
      rest[index] = args[start + index];
    }
    switch (start) {
      case 0: return func.call(this, rest);
      case 1: return func.call(this, args[0], rest);
      case 2: return func.call(this, args[0], args[1], rest);
    }
    var otherArgs = Array(start + 1);
    index = -1;
    while (++index < start) {
      otherArgs[index] = args[index];
    }
    otherArgs[start] = rest;
    return func.apply(this, otherArgs);
  };
}

module.exports = restParam;

},{}],13:[function(require,module,exports){
/**
 * A specialized version of `_.forEach` for arrays without support for callback
 * shorthands and `this` binding.
 *
 * @private
 * @param {Array} array The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns `array`.
 */
function arrayEach(array, iteratee) {
  var index = -1,
      length = array.length;

  while (++index < length) {
    if (iteratee(array[index], index, array) === false) {
      break;
    }
  }
  return array;
}

module.exports = arrayEach;

},{}],14:[function(require,module,exports){
/**
 * A specialized version of `_.filter` for arrays without support for callback
 * shorthands and `this` binding.
 *
 * @private
 * @param {Array} array The array to iterate over.
 * @param {Function} predicate The function invoked per iteration.
 * @returns {Array} Returns the new filtered array.
 */
function arrayFilter(array, predicate) {
  var index = -1,
      length = array.length,
      resIndex = -1,
      result = [];

  while (++index < length) {
    var value = array[index];
    if (predicate(value, index, array)) {
      result[++resIndex] = value;
    }
  }
  return result;
}

module.exports = arrayFilter;

},{}],15:[function(require,module,exports){
/**
 * A specialized version of `_.map` for arrays without support for callback
 * shorthands and `this` binding.
 *
 * @private
 * @param {Array} array The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the new mapped array.
 */
function arrayMap(array, iteratee) {
  var index = -1,
      length = array.length,
      result = Array(length);

  while (++index < length) {
    result[index] = iteratee(array[index], index, array);
  }
  return result;
}

module.exports = arrayMap;

},{}],16:[function(require,module,exports){
/**
 * A specialized version of `_.some` for arrays without support for callback
 * shorthands and `this` binding.
 *
 * @private
 * @param {Array} array The array to iterate over.
 * @param {Function} predicate The function invoked per iteration.
 * @returns {boolean} Returns `true` if any element passes the predicate check,
 *  else `false`.
 */
function arraySome(array, predicate) {
  var index = -1,
      length = array.length;

  while (++index < length) {
    if (predicate(array[index], index, array)) {
      return true;
    }
  }
  return false;
}

module.exports = arraySome;

},{}],17:[function(require,module,exports){
var keys = require('../object/keys');

/**
 * A specialized version of `_.assign` for customizing assigned values without
 * support for argument juggling, multiple sources, and `this` binding `customizer`
 * functions.
 *
 * @private
 * @param {Object} object The destination object.
 * @param {Object} source The source object.
 * @param {Function} customizer The function to customize assigned values.
 * @returns {Object} Returns `object`.
 */
function assignWith(object, source, customizer) {
  var index = -1,
      props = keys(source),
      length = props.length;

  while (++index < length) {
    var key = props[index],
        value = object[key],
        result = customizer(value, source[key], key, object, source);

    if ((result === result ? (result !== value) : (value === value)) ||
        (value === undefined && !(key in object))) {
      object[key] = result;
    }
  }
  return object;
}

module.exports = assignWith;

},{"../object/keys":73}],18:[function(require,module,exports){
var baseCopy = require('./baseCopy'),
    keys = require('../object/keys');

/**
 * The base implementation of `_.assign` without support for argument juggling,
 * multiple sources, and `customizer` functions.
 *
 * @private
 * @param {Object} object The destination object.
 * @param {Object} source The source object.
 * @returns {Object} Returns `object`.
 */
function baseAssign(object, source) {
  return source == null
    ? object
    : baseCopy(source, keys(source), object);
}

module.exports = baseAssign;

},{"../object/keys":73,"./baseCopy":20}],19:[function(require,module,exports){
var baseMatches = require('./baseMatches'),
    baseMatchesProperty = require('./baseMatchesProperty'),
    bindCallback = require('./bindCallback'),
    identity = require('../utility/identity'),
    property = require('../utility/property');

/**
 * The base implementation of `_.callback` which supports specifying the
 * number of arguments to provide to `func`.
 *
 * @private
 * @param {*} [func=_.identity] The value to convert to a callback.
 * @param {*} [thisArg] The `this` binding of `func`.
 * @param {number} [argCount] The number of arguments to provide to `func`.
 * @returns {Function} Returns the callback.
 */
function baseCallback(func, thisArg, argCount) {
  var type = typeof func;
  if (type == 'function') {
    return thisArg === undefined
      ? func
      : bindCallback(func, thisArg, argCount);
  }
  if (func == null) {
    return identity;
  }
  if (type == 'object') {
    return baseMatches(func);
  }
  return thisArg === undefined
    ? property(func)
    : baseMatchesProperty(func, thisArg);
}

module.exports = baseCallback;

},{"../utility/identity":77,"../utility/property":78,"./baseMatches":33,"./baseMatchesProperty":34,"./bindCallback":42}],20:[function(require,module,exports){
/**
 * Copies properties of `source` to `object`.
 *
 * @private
 * @param {Object} source The object to copy properties from.
 * @param {Array} props The property names to copy.
 * @param {Object} [object={}] The object to copy properties to.
 * @returns {Object} Returns `object`.
 */
function baseCopy(source, props, object) {
  object || (object = {});

  var index = -1,
      length = props.length;

  while (++index < length) {
    var key = props[index];
    object[key] = source[key];
  }
  return object;
}

module.exports = baseCopy;

},{}],21:[function(require,module,exports){
var baseForOwn = require('./baseForOwn'),
    createBaseEach = require('./createBaseEach');

/**
 * The base implementation of `_.forEach` without support for callback
 * shorthands and `this` binding.
 *
 * @private
 * @param {Array|Object|string} collection The collection to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array|Object|string} Returns `collection`.
 */
var baseEach = createBaseEach(baseForOwn);

module.exports = baseEach;

},{"./baseForOwn":26,"./createBaseEach":44}],22:[function(require,module,exports){
var baseEach = require('./baseEach');

/**
 * The base implementation of `_.filter` without support for callback
 * shorthands and `this` binding.
 *
 * @private
 * @param {Array|Object|string} collection The collection to iterate over.
 * @param {Function} predicate The function invoked per iteration.
 * @returns {Array} Returns the new filtered array.
 */
function baseFilter(collection, predicate) {
  var result = [];
  baseEach(collection, function(value, index, collection) {
    if (predicate(value, index, collection)) {
      result.push(value);
    }
  });
  return result;
}

module.exports = baseFilter;

},{"./baseEach":21}],23:[function(require,module,exports){
/**
 * The base implementation of `_.find`, `_.findLast`, `_.findKey`, and `_.findLastKey`,
 * without support for callback shorthands and `this` binding, which iterates
 * over `collection` using the provided `eachFunc`.
 *
 * @private
 * @param {Array|Object|string} collection The collection to search.
 * @param {Function} predicate The function invoked per iteration.
 * @param {Function} eachFunc The function to iterate over `collection`.
 * @param {boolean} [retKey] Specify returning the key of the found element
 *  instead of the element itself.
 * @returns {*} Returns the found element or its key, else `undefined`.
 */
function baseFind(collection, predicate, eachFunc, retKey) {
  var result;
  eachFunc(collection, function(value, key, collection) {
    if (predicate(value, key, collection)) {
      result = retKey ? key : value;
      return false;
    }
  });
  return result;
}

module.exports = baseFind;

},{}],24:[function(require,module,exports){
/**
 * The base implementation of `_.findIndex` and `_.findLastIndex` without
 * support for callback shorthands and `this` binding.
 *
 * @private
 * @param {Array} array The array to search.
 * @param {Function} predicate The function invoked per iteration.
 * @param {boolean} [fromRight] Specify iterating from right to left.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function baseFindIndex(array, predicate, fromRight) {
  var length = array.length,
      index = fromRight ? length : -1;

  while ((fromRight ? index-- : ++index < length)) {
    if (predicate(array[index], index, array)) {
      return index;
    }
  }
  return -1;
}

module.exports = baseFindIndex;

},{}],25:[function(require,module,exports){
var createBaseFor = require('./createBaseFor');

/**
 * The base implementation of `baseForIn` and `baseForOwn` which iterates
 * over `object` properties returned by `keysFunc` invoking `iteratee` for
 * each property. Iteratee functions may exit iteration early by explicitly
 * returning `false`.
 *
 * @private
 * @param {Object} object The object to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @param {Function} keysFunc The function to get the keys of `object`.
 * @returns {Object} Returns `object`.
 */
var baseFor = createBaseFor();

module.exports = baseFor;

},{"./createBaseFor":45}],26:[function(require,module,exports){
var baseFor = require('./baseFor'),
    keys = require('../object/keys');

/**
 * The base implementation of `_.forOwn` without support for callback
 * shorthands and `this` binding.
 *
 * @private
 * @param {Object} object The object to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Object} Returns `object`.
 */
function baseForOwn(object, iteratee) {
  return baseFor(object, iteratee, keys);
}

module.exports = baseForOwn;

},{"../object/keys":73,"./baseFor":25}],27:[function(require,module,exports){
var toObject = require('./toObject');

/**
 * The base implementation of `get` without support for string paths
 * and default values.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Array} path The path of the property to get.
 * @param {string} [pathKey] The key representation of path.
 * @returns {*} Returns the resolved value.
 */
function baseGet(object, path, pathKey) {
  if (object == null) {
    return;
  }
  if (pathKey !== undefined && pathKey in toObject(object)) {
    path = [pathKey];
  }
  var index = 0,
      length = path.length;

  while (object != null && index < length) {
    object = object[path[index++]];
  }
  return (index && index == length) ? object : undefined;
}

module.exports = baseGet;

},{"./toObject":63}],28:[function(require,module,exports){
var indexOfNaN = require('./indexOfNaN');

/**
 * The base implementation of `_.indexOf` without support for binary searches.
 *
 * @private
 * @param {Array} array The array to search.
 * @param {*} value The value to search for.
 * @param {number} fromIndex The index to search from.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function baseIndexOf(array, value, fromIndex) {
  if (value !== value) {
    return indexOfNaN(array, fromIndex);
  }
  var index = fromIndex - 1,
      length = array.length;

  while (++index < length) {
    if (array[index] === value) {
      return index;
    }
  }
  return -1;
}

module.exports = baseIndexOf;

},{"./indexOfNaN":54}],29:[function(require,module,exports){
var baseIsEqualDeep = require('./baseIsEqualDeep'),
    isObject = require('../lang/isObject'),
    isObjectLike = require('./isObjectLike');

/**
 * The base implementation of `_.isEqual` without support for `this` binding
 * `customizer` functions.
 *
 * @private
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @param {Function} [customizer] The function to customize comparing values.
 * @param {boolean} [isLoose] Specify performing partial comparisons.
 * @param {Array} [stackA] Tracks traversed `value` objects.
 * @param {Array} [stackB] Tracks traversed `other` objects.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 */
function baseIsEqual(value, other, customizer, isLoose, stackA, stackB) {
  if (value === other) {
    return true;
  }
  if (value == null || other == null || (!isObject(value) && !isObjectLike(other))) {
    return value !== value && other !== other;
  }
  return baseIsEqualDeep(value, other, baseIsEqual, customizer, isLoose, stackA, stackB);
}

module.exports = baseIsEqual;

},{"../lang/isObject":69,"./baseIsEqualDeep":30,"./isObjectLike":60}],30:[function(require,module,exports){
var equalArrays = require('./equalArrays'),
    equalByTag = require('./equalByTag'),
    equalObjects = require('./equalObjects'),
    isArray = require('../lang/isArray'),
    isTypedArray = require('../lang/isTypedArray');

/** `Object#toString` result references. */
var argsTag = '[object Arguments]',
    arrayTag = '[object Array]',
    objectTag = '[object Object]';

/** Used for native method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
 * of values.
 */
var objToString = objectProto.toString;

/**
 * A specialized version of `baseIsEqual` for arrays and objects which performs
 * deep comparisons and tracks traversed objects enabling objects with circular
 * references to be compared.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Function} [customizer] The function to customize comparing objects.
 * @param {boolean} [isLoose] Specify performing partial comparisons.
 * @param {Array} [stackA=[]] Tracks traversed `value` objects.
 * @param {Array} [stackB=[]] Tracks traversed `other` objects.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */
function baseIsEqualDeep(object, other, equalFunc, customizer, isLoose, stackA, stackB) {
  var objIsArr = isArray(object),
      othIsArr = isArray(other),
      objTag = arrayTag,
      othTag = arrayTag;

  if (!objIsArr) {
    objTag = objToString.call(object);
    if (objTag == argsTag) {
      objTag = objectTag;
    } else if (objTag != objectTag) {
      objIsArr = isTypedArray(object);
    }
  }
  if (!othIsArr) {
    othTag = objToString.call(other);
    if (othTag == argsTag) {
      othTag = objectTag;
    } else if (othTag != objectTag) {
      othIsArr = isTypedArray(other);
    }
  }
  var objIsObj = objTag == objectTag,
      othIsObj = othTag == objectTag,
      isSameTag = objTag == othTag;

  if (isSameTag && !(objIsArr || objIsObj)) {
    return equalByTag(object, other, objTag);
  }
  if (!isLoose) {
    var objIsWrapped = objIsObj && hasOwnProperty.call(object, '__wrapped__'),
        othIsWrapped = othIsObj && hasOwnProperty.call(other, '__wrapped__');

    if (objIsWrapped || othIsWrapped) {
      return equalFunc(objIsWrapped ? object.value() : object, othIsWrapped ? other.value() : other, customizer, isLoose, stackA, stackB);
    }
  }
  if (!isSameTag) {
    return false;
  }
  // Assume cyclic values are equal.
  // For more information on detecting circular references see https://es5.github.io/#JO.
  stackA || (stackA = []);
  stackB || (stackB = []);

  var length = stackA.length;
  while (length--) {
    if (stackA[length] == object) {
      return stackB[length] == other;
    }
  }
  // Add `object` and `other` to the stack of traversed objects.
  stackA.push(object);
  stackB.push(other);

  var result = (objIsArr ? equalArrays : equalObjects)(object, other, equalFunc, customizer, isLoose, stackA, stackB);

  stackA.pop();
  stackB.pop();

  return result;
}

module.exports = baseIsEqualDeep;

},{"../lang/isArray":66,"../lang/isTypedArray":71,"./equalArrays":48,"./equalByTag":49,"./equalObjects":50}],31:[function(require,module,exports){
var baseIsEqual = require('./baseIsEqual'),
    toObject = require('./toObject');

/**
 * The base implementation of `_.isMatch` without support for callback
 * shorthands and `this` binding.
 *
 * @private
 * @param {Object} object The object to inspect.
 * @param {Array} matchData The propery names, values, and compare flags to match.
 * @param {Function} [customizer] The function to customize comparing objects.
 * @returns {boolean} Returns `true` if `object` is a match, else `false`.
 */
function baseIsMatch(object, matchData, customizer) {
  var index = matchData.length,
      length = index,
      noCustomizer = !customizer;

  if (object == null) {
    return !length;
  }
  object = toObject(object);
  while (index--) {
    var data = matchData[index];
    if ((noCustomizer && data[2])
          ? data[1] !== object[data[0]]
          : !(data[0] in object)
        ) {
      return false;
    }
  }
  while (++index < length) {
    data = matchData[index];
    var key = data[0],
        objValue = object[key],
        srcValue = data[1];

    if (noCustomizer && data[2]) {
      if (objValue === undefined && !(key in object)) {
        return false;
      }
    } else {
      var result = customizer ? customizer(objValue, srcValue, key) : undefined;
      if (!(result === undefined ? baseIsEqual(srcValue, objValue, customizer, true) : result)) {
        return false;
      }
    }
  }
  return true;
}

module.exports = baseIsMatch;

},{"./baseIsEqual":29,"./toObject":63}],32:[function(require,module,exports){
var baseEach = require('./baseEach'),
    isArrayLike = require('./isArrayLike');

/**
 * The base implementation of `_.map` without support for callback shorthands
 * and `this` binding.
 *
 * @private
 * @param {Array|Object|string} collection The collection to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the new mapped array.
 */
function baseMap(collection, iteratee) {
  var index = -1,
      result = isArrayLike(collection) ? Array(collection.length) : [];

  baseEach(collection, function(value, key, collection) {
    result[++index] = iteratee(value, key, collection);
  });
  return result;
}

module.exports = baseMap;

},{"./baseEach":21,"./isArrayLike":55}],33:[function(require,module,exports){
var baseIsMatch = require('./baseIsMatch'),
    getMatchData = require('./getMatchData'),
    toObject = require('./toObject');

/**
 * The base implementation of `_.matches` which does not clone `source`.
 *
 * @private
 * @param {Object} source The object of property values to match.
 * @returns {Function} Returns the new function.
 */
function baseMatches(source) {
  var matchData = getMatchData(source);
  if (matchData.length == 1 && matchData[0][2]) {
    var key = matchData[0][0],
        value = matchData[0][1];

    return function(object) {
      if (object == null) {
        return false;
      }
      return object[key] === value && (value !== undefined || (key in toObject(object)));
    };
  }
  return function(object) {
    return baseIsMatch(object, matchData);
  };
}

module.exports = baseMatches;

},{"./baseIsMatch":31,"./getMatchData":52,"./toObject":63}],34:[function(require,module,exports){
var baseGet = require('./baseGet'),
    baseIsEqual = require('./baseIsEqual'),
    baseSlice = require('./baseSlice'),
    isArray = require('../lang/isArray'),
    isKey = require('./isKey'),
    isStrictComparable = require('./isStrictComparable'),
    last = require('../array/last'),
    toObject = require('./toObject'),
    toPath = require('./toPath');

/**
 * The base implementation of `_.matchesProperty` which does not clone `srcValue`.
 *
 * @private
 * @param {string} path The path of the property to get.
 * @param {*} srcValue The value to compare.
 * @returns {Function} Returns the new function.
 */
function baseMatchesProperty(path, srcValue) {
  var isArr = isArray(path),
      isCommon = isKey(path) && isStrictComparable(srcValue),
      pathKey = (path + '');

  path = toPath(path);
  return function(object) {
    if (object == null) {
      return false;
    }
    var key = pathKey;
    object = toObject(object);
    if ((isArr || !isCommon) && !(key in object)) {
      object = path.length == 1 ? object : baseGet(object, baseSlice(path, 0, -1));
      if (object == null) {
        return false;
      }
      key = last(path);
      object = toObject(object);
    }
    return object[key] === srcValue
      ? (srcValue !== undefined || (key in object))
      : baseIsEqual(srcValue, object[key], undefined, true);
  };
}

module.exports = baseMatchesProperty;

},{"../array/last":6,"../lang/isArray":66,"./baseGet":27,"./baseIsEqual":29,"./baseSlice":37,"./isKey":58,"./isStrictComparable":61,"./toObject":63,"./toPath":64}],35:[function(require,module,exports){
/**
 * The base implementation of `_.property` without support for deep paths.
 *
 * @private
 * @param {string} key The key of the property to get.
 * @returns {Function} Returns the new function.
 */
function baseProperty(key) {
  return function(object) {
    return object == null ? undefined : object[key];
  };
}

module.exports = baseProperty;

},{}],36:[function(require,module,exports){
var baseGet = require('./baseGet'),
    toPath = require('./toPath');

/**
 * A specialized version of `baseProperty` which supports deep paths.
 *
 * @private
 * @param {Array|string} path The path of the property to get.
 * @returns {Function} Returns the new function.
 */
function basePropertyDeep(path) {
  var pathKey = (path + '');
  path = toPath(path);
  return function(object) {
    return baseGet(object, path, pathKey);
  };
}

module.exports = basePropertyDeep;

},{"./baseGet":27,"./toPath":64}],37:[function(require,module,exports){
/**
 * The base implementation of `_.slice` without an iteratee call guard.
 *
 * @private
 * @param {Array} array The array to slice.
 * @param {number} [start=0] The start position.
 * @param {number} [end=array.length] The end position.
 * @returns {Array} Returns the slice of `array`.
 */
function baseSlice(array, start, end) {
  var index = -1,
      length = array.length;

  start = start == null ? 0 : (+start || 0);
  if (start < 0) {
    start = -start > length ? 0 : (length + start);
  }
  end = (end === undefined || end > length) ? length : (+end || 0);
  if (end < 0) {
    end += length;
  }
  length = start > end ? 0 : ((end - start) >>> 0);
  start >>>= 0;

  var result = Array(length);
  while (++index < length) {
    result[index] = array[index + start];
  }
  return result;
}

module.exports = baseSlice;

},{}],38:[function(require,module,exports){
/**
 * Converts `value` to a string if it's not one. An empty string is returned
 * for `null` or `undefined` values.
 *
 * @private
 * @param {*} value The value to process.
 * @returns {string} Returns the string.
 */
function baseToString(value) {
  return value == null ? '' : (value + '');
}

module.exports = baseToString;

},{}],39:[function(require,module,exports){
/**
 * The base implementation of `_.values` and `_.valuesIn` which creates an
 * array of `object` property values corresponding to the property names
 * of `props`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Array} props The property names to get values for.
 * @returns {Object} Returns the array of property values.
 */
function baseValues(object, props) {
  var index = -1,
      length = props.length,
      result = Array(length);

  while (++index < length) {
    result[index] = object[props[index]];
  }
  return result;
}

module.exports = baseValues;

},{}],40:[function(require,module,exports){
var binaryIndexBy = require('./binaryIndexBy'),
    identity = require('../utility/identity');

/** Used as references for the maximum length and index of an array. */
var MAX_ARRAY_LENGTH = 4294967295,
    HALF_MAX_ARRAY_LENGTH = MAX_ARRAY_LENGTH >>> 1;

/**
 * Performs a binary search of `array` to determine the index at which `value`
 * should be inserted into `array` in order to maintain its sort order.
 *
 * @private
 * @param {Array} array The sorted array to inspect.
 * @param {*} value The value to evaluate.
 * @param {boolean} [retHighest] Specify returning the highest qualified index.
 * @returns {number} Returns the index at which `value` should be inserted
 *  into `array`.
 */
function binaryIndex(array, value, retHighest) {
  var low = 0,
      high = array ? array.length : low;

  if (typeof value == 'number' && value === value && high <= HALF_MAX_ARRAY_LENGTH) {
    while (low < high) {
      var mid = (low + high) >>> 1,
          computed = array[mid];

      if ((retHighest ? (computed <= value) : (computed < value)) && computed !== null) {
        low = mid + 1;
      } else {
        high = mid;
      }
    }
    return high;
  }
  return binaryIndexBy(array, value, identity, retHighest);
}

module.exports = binaryIndex;

},{"../utility/identity":77,"./binaryIndexBy":41}],41:[function(require,module,exports){
/* Native method references for those with the same name as other `lodash` methods. */
var nativeFloor = Math.floor,
    nativeMin = Math.min;

/** Used as references for the maximum length and index of an array. */
var MAX_ARRAY_LENGTH = 4294967295,
    MAX_ARRAY_INDEX = MAX_ARRAY_LENGTH - 1;

/**
 * This function is like `binaryIndex` except that it invokes `iteratee` for
 * `value` and each element of `array` to compute their sort ranking. The
 * iteratee is invoked with one argument; (value).
 *
 * @private
 * @param {Array} array The sorted array to inspect.
 * @param {*} value The value to evaluate.
 * @param {Function} iteratee The function invoked per iteration.
 * @param {boolean} [retHighest] Specify returning the highest qualified index.
 * @returns {number} Returns the index at which `value` should be inserted
 *  into `array`.
 */
function binaryIndexBy(array, value, iteratee, retHighest) {
  value = iteratee(value);

  var low = 0,
      high = array ? array.length : 0,
      valIsNaN = value !== value,
      valIsNull = value === null,
      valIsUndef = value === undefined;

  while (low < high) {
    var mid = nativeFloor((low + high) / 2),
        computed = iteratee(array[mid]),
        isDef = computed !== undefined,
        isReflexive = computed === computed;

    if (valIsNaN) {
      var setLow = isReflexive || retHighest;
    } else if (valIsNull) {
      setLow = isReflexive && isDef && (retHighest || computed != null);
    } else if (valIsUndef) {
      setLow = isReflexive && (retHighest || isDef);
    } else if (computed == null) {
      setLow = false;
    } else {
      setLow = retHighest ? (computed <= value) : (computed < value);
    }
    if (setLow) {
      low = mid + 1;
    } else {
      high = mid;
    }
  }
  return nativeMin(high, MAX_ARRAY_INDEX);
}

module.exports = binaryIndexBy;

},{}],42:[function(require,module,exports){
var identity = require('../utility/identity');

/**
 * A specialized version of `baseCallback` which only supports `this` binding
 * and specifying the number of arguments to provide to `func`.
 *
 * @private
 * @param {Function} func The function to bind.
 * @param {*} thisArg The `this` binding of `func`.
 * @param {number} [argCount] The number of arguments to provide to `func`.
 * @returns {Function} Returns the callback.
 */
function bindCallback(func, thisArg, argCount) {
  if (typeof func != 'function') {
    return identity;
  }
  if (thisArg === undefined) {
    return func;
  }
  switch (argCount) {
    case 1: return function(value) {
      return func.call(thisArg, value);
    };
    case 3: return function(value, index, collection) {
      return func.call(thisArg, value, index, collection);
    };
    case 4: return function(accumulator, value, index, collection) {
      return func.call(thisArg, accumulator, value, index, collection);
    };
    case 5: return function(value, other, key, object, source) {
      return func.call(thisArg, value, other, key, object, source);
    };
  }
  return function() {
    return func.apply(thisArg, arguments);
  };
}

module.exports = bindCallback;

},{"../utility/identity":77}],43:[function(require,module,exports){
var bindCallback = require('./bindCallback'),
    isIterateeCall = require('./isIterateeCall'),
    restParam = require('../function/restParam');

/**
 * Creates a `_.assign`, `_.defaults`, or `_.merge` function.
 *
 * @private
 * @param {Function} assigner The function to assign values.
 * @returns {Function} Returns the new assigner function.
 */
function createAssigner(assigner) {
  return restParam(function(object, sources) {
    var index = -1,
        length = object == null ? 0 : sources.length,
        customizer = length > 2 ? sources[length - 2] : undefined,
        guard = length > 2 ? sources[2] : undefined,
        thisArg = length > 1 ? sources[length - 1] : undefined;

    if (typeof customizer == 'function') {
      customizer = bindCallback(customizer, thisArg, 5);
      length -= 2;
    } else {
      customizer = typeof thisArg == 'function' ? thisArg : undefined;
      length -= (customizer ? 1 : 0);
    }
    if (guard && isIterateeCall(sources[0], sources[1], guard)) {
      customizer = length < 3 ? undefined : customizer;
      length = 1;
    }
    while (++index < length) {
      var source = sources[index];
      if (source) {
        assigner(object, source, customizer);
      }
    }
    return object;
  });
}

module.exports = createAssigner;

},{"../function/restParam":12,"./bindCallback":42,"./isIterateeCall":57}],44:[function(require,module,exports){
var getLength = require('./getLength'),
    isLength = require('./isLength'),
    toObject = require('./toObject');

/**
 * Creates a `baseEach` or `baseEachRight` function.
 *
 * @private
 * @param {Function} eachFunc The function to iterate over a collection.
 * @param {boolean} [fromRight] Specify iterating from right to left.
 * @returns {Function} Returns the new base function.
 */
function createBaseEach(eachFunc, fromRight) {
  return function(collection, iteratee) {
    var length = collection ? getLength(collection) : 0;
    if (!isLength(length)) {
      return eachFunc(collection, iteratee);
    }
    var index = fromRight ? length : -1,
        iterable = toObject(collection);

    while ((fromRight ? index-- : ++index < length)) {
      if (iteratee(iterable[index], index, iterable) === false) {
        break;
      }
    }
    return collection;
  };
}

module.exports = createBaseEach;

},{"./getLength":51,"./isLength":59,"./toObject":63}],45:[function(require,module,exports){
var toObject = require('./toObject');

/**
 * Creates a base function for `_.forIn` or `_.forInRight`.
 *
 * @private
 * @param {boolean} [fromRight] Specify iterating from right to left.
 * @returns {Function} Returns the new base function.
 */
function createBaseFor(fromRight) {
  return function(object, iteratee, keysFunc) {
    var iterable = toObject(object),
        props = keysFunc(object),
        length = props.length,
        index = fromRight ? length : -1;

    while ((fromRight ? index-- : ++index < length)) {
      var key = props[index];
      if (iteratee(iterable[key], key, iterable) === false) {
        break;
      }
    }
    return object;
  };
}

module.exports = createBaseFor;

},{"./toObject":63}],46:[function(require,module,exports){
var baseCallback = require('./baseCallback'),
    baseFind = require('./baseFind'),
    baseFindIndex = require('./baseFindIndex'),
    isArray = require('../lang/isArray');

/**
 * Creates a `_.find` or `_.findLast` function.
 *
 * @private
 * @param {Function} eachFunc The function to iterate over a collection.
 * @param {boolean} [fromRight] Specify iterating from right to left.
 * @returns {Function} Returns the new find function.
 */
function createFind(eachFunc, fromRight) {
  return function(collection, predicate, thisArg) {
    predicate = baseCallback(predicate, thisArg, 3);
    if (isArray(collection)) {
      var index = baseFindIndex(collection, predicate, fromRight);
      return index > -1 ? collection[index] : undefined;
    }
    return baseFind(collection, predicate, eachFunc);
  };
}

module.exports = createFind;

},{"../lang/isArray":66,"./baseCallback":19,"./baseFind":23,"./baseFindIndex":24}],47:[function(require,module,exports){
var bindCallback = require('./bindCallback'),
    isArray = require('../lang/isArray');

/**
 * Creates a function for `_.forEach` or `_.forEachRight`.
 *
 * @private
 * @param {Function} arrayFunc The function to iterate over an array.
 * @param {Function} eachFunc The function to iterate over a collection.
 * @returns {Function} Returns the new each function.
 */
function createForEach(arrayFunc, eachFunc) {
  return function(collection, iteratee, thisArg) {
    return (typeof iteratee == 'function' && thisArg === undefined && isArray(collection))
      ? arrayFunc(collection, iteratee)
      : eachFunc(collection, bindCallback(iteratee, thisArg, 3));
  };
}

module.exports = createForEach;

},{"../lang/isArray":66,"./bindCallback":42}],48:[function(require,module,exports){
var arraySome = require('./arraySome');

/**
 * A specialized version of `baseIsEqualDeep` for arrays with support for
 * partial deep comparisons.
 *
 * @private
 * @param {Array} array The array to compare.
 * @param {Array} other The other array to compare.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Function} [customizer] The function to customize comparing arrays.
 * @param {boolean} [isLoose] Specify performing partial comparisons.
 * @param {Array} [stackA] Tracks traversed `value` objects.
 * @param {Array} [stackB] Tracks traversed `other` objects.
 * @returns {boolean} Returns `true` if the arrays are equivalent, else `false`.
 */
function equalArrays(array, other, equalFunc, customizer, isLoose, stackA, stackB) {
  var index = -1,
      arrLength = array.length,
      othLength = other.length;

  if (arrLength != othLength && !(isLoose && othLength > arrLength)) {
    return false;
  }
  // Ignore non-index properties.
  while (++index < arrLength) {
    var arrValue = array[index],
        othValue = other[index],
        result = customizer ? customizer(isLoose ? othValue : arrValue, isLoose ? arrValue : othValue, index) : undefined;

    if (result !== undefined) {
      if (result) {
        continue;
      }
      return false;
    }
    // Recursively compare arrays (susceptible to call stack limits).
    if (isLoose) {
      if (!arraySome(other, function(othValue) {
            return arrValue === othValue || equalFunc(arrValue, othValue, customizer, isLoose, stackA, stackB);
          })) {
        return false;
      }
    } else if (!(arrValue === othValue || equalFunc(arrValue, othValue, customizer, isLoose, stackA, stackB))) {
      return false;
    }
  }
  return true;
}

module.exports = equalArrays;

},{"./arraySome":16}],49:[function(require,module,exports){
/** `Object#toString` result references. */
var boolTag = '[object Boolean]',
    dateTag = '[object Date]',
    errorTag = '[object Error]',
    numberTag = '[object Number]',
    regexpTag = '[object RegExp]',
    stringTag = '[object String]';

/**
 * A specialized version of `baseIsEqualDeep` for comparing objects of
 * the same `toStringTag`.
 *
 * **Note:** This function only supports comparing values with tags of
 * `Boolean`, `Date`, `Error`, `Number`, `RegExp`, or `String`.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {string} tag The `toStringTag` of the objects to compare.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */
function equalByTag(object, other, tag) {
  switch (tag) {
    case boolTag:
    case dateTag:
      // Coerce dates and booleans to numbers, dates to milliseconds and booleans
      // to `1` or `0` treating invalid dates coerced to `NaN` as not equal.
      return +object == +other;

    case errorTag:
      return object.name == other.name && object.message == other.message;

    case numberTag:
      // Treat `NaN` vs. `NaN` as equal.
      return (object != +object)
        ? other != +other
        : object == +other;

    case regexpTag:
    case stringTag:
      // Coerce regexes to strings and treat strings primitives and string
      // objects as equal. See https://es5.github.io/#x15.10.6.4 for more details.
      return object == (other + '');
  }
  return false;
}

module.exports = equalByTag;

},{}],50:[function(require,module,exports){
var keys = require('../object/keys');

/** Used for native method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * A specialized version of `baseIsEqualDeep` for objects with support for
 * partial deep comparisons.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Function} [customizer] The function to customize comparing values.
 * @param {boolean} [isLoose] Specify performing partial comparisons.
 * @param {Array} [stackA] Tracks traversed `value` objects.
 * @param {Array} [stackB] Tracks traversed `other` objects.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */
function equalObjects(object, other, equalFunc, customizer, isLoose, stackA, stackB) {
  var objProps = keys(object),
      objLength = objProps.length,
      othProps = keys(other),
      othLength = othProps.length;

  if (objLength != othLength && !isLoose) {
    return false;
  }
  var index = objLength;
  while (index--) {
    var key = objProps[index];
    if (!(isLoose ? key in other : hasOwnProperty.call(other, key))) {
      return false;
    }
  }
  var skipCtor = isLoose;
  while (++index < objLength) {
    key = objProps[index];
    var objValue = object[key],
        othValue = other[key],
        result = customizer ? customizer(isLoose ? othValue : objValue, isLoose? objValue : othValue, key) : undefined;

    // Recursively compare objects (susceptible to call stack limits).
    if (!(result === undefined ? equalFunc(objValue, othValue, customizer, isLoose, stackA, stackB) : result)) {
      return false;
    }
    skipCtor || (skipCtor = key == 'constructor');
  }
  if (!skipCtor) {
    var objCtor = object.constructor,
        othCtor = other.constructor;

    // Non `Object` object instances with different constructors are not equal.
    if (objCtor != othCtor &&
        ('constructor' in object && 'constructor' in other) &&
        !(typeof objCtor == 'function' && objCtor instanceof objCtor &&
          typeof othCtor == 'function' && othCtor instanceof othCtor)) {
      return false;
    }
  }
  return true;
}

module.exports = equalObjects;

},{"../object/keys":73}],51:[function(require,module,exports){
var baseProperty = require('./baseProperty');

/**
 * Gets the "length" property value of `object`.
 *
 * **Note:** This function is used to avoid a [JIT bug](https://bugs.webkit.org/show_bug.cgi?id=142792)
 * that affects Safari on at least iOS 8.1-8.3 ARM64.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {*} Returns the "length" value.
 */
var getLength = baseProperty('length');

module.exports = getLength;

},{"./baseProperty":35}],52:[function(require,module,exports){
var isStrictComparable = require('./isStrictComparable'),
    pairs = require('../object/pairs');

/**
 * Gets the propery names, values, and compare flags of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the match data of `object`.
 */
function getMatchData(object) {
  var result = pairs(object),
      length = result.length;

  while (length--) {
    result[length][2] = isStrictComparable(result[length][1]);
  }
  return result;
}

module.exports = getMatchData;

},{"../object/pairs":75,"./isStrictComparable":61}],53:[function(require,module,exports){
var isNative = require('../lang/isNative');

/**
 * Gets the native function at `key` of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {string} key The key of the method to get.
 * @returns {*} Returns the function if it's native, else `undefined`.
 */
function getNative(object, key) {
  var value = object == null ? undefined : object[key];
  return isNative(value) ? value : undefined;
}

module.exports = getNative;

},{"../lang/isNative":68}],54:[function(require,module,exports){
/**
 * Gets the index at which the first occurrence of `NaN` is found in `array`.
 *
 * @private
 * @param {Array} array The array to search.
 * @param {number} fromIndex The index to search from.
 * @param {boolean} [fromRight] Specify iterating from right to left.
 * @returns {number} Returns the index of the matched `NaN`, else `-1`.
 */
function indexOfNaN(array, fromIndex, fromRight) {
  var length = array.length,
      index = fromIndex + (fromRight ? 0 : -1);

  while ((fromRight ? index-- : ++index < length)) {
    var other = array[index];
    if (other !== other) {
      return index;
    }
  }
  return -1;
}

module.exports = indexOfNaN;

},{}],55:[function(require,module,exports){
var getLength = require('./getLength'),
    isLength = require('./isLength');

/**
 * Checks if `value` is array-like.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
 */
function isArrayLike(value) {
  return value != null && isLength(getLength(value));
}

module.exports = isArrayLike;

},{"./getLength":51,"./isLength":59}],56:[function(require,module,exports){
/** Used to detect unsigned integer values. */
var reIsUint = /^\d+$/;

/**
 * Used as the [maximum length](http://ecma-international.org/ecma-262/6.0/#sec-number.max_safe_integer)
 * of an array-like value.
 */
var MAX_SAFE_INTEGER = 9007199254740991;

/**
 * Checks if `value` is a valid array-like index.
 *
 * @private
 * @param {*} value The value to check.
 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
 */
function isIndex(value, length) {
  value = (typeof value == 'number' || reIsUint.test(value)) ? +value : -1;
  length = length == null ? MAX_SAFE_INTEGER : length;
  return value > -1 && value % 1 == 0 && value < length;
}

module.exports = isIndex;

},{}],57:[function(require,module,exports){
var isArrayLike = require('./isArrayLike'),
    isIndex = require('./isIndex'),
    isObject = require('../lang/isObject');

/**
 * Checks if the provided arguments are from an iteratee call.
 *
 * @private
 * @param {*} value The potential iteratee value argument.
 * @param {*} index The potential iteratee index or key argument.
 * @param {*} object The potential iteratee object argument.
 * @returns {boolean} Returns `true` if the arguments are from an iteratee call, else `false`.
 */
function isIterateeCall(value, index, object) {
  if (!isObject(object)) {
    return false;
  }
  var type = typeof index;
  if (type == 'number'
      ? (isArrayLike(object) && isIndex(index, object.length))
      : (type == 'string' && index in object)) {
    var other = object[index];
    return value === value ? (value === other) : (other !== other);
  }
  return false;
}

module.exports = isIterateeCall;

},{"../lang/isObject":69,"./isArrayLike":55,"./isIndex":56}],58:[function(require,module,exports){
var isArray = require('../lang/isArray'),
    toObject = require('./toObject');

/** Used to match property names within property paths. */
var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\n\\]|\\.)*?\1)\]/,
    reIsPlainProp = /^\w*$/;

/**
 * Checks if `value` is a property name and not a property path.
 *
 * @private
 * @param {*} value The value to check.
 * @param {Object} [object] The object to query keys on.
 * @returns {boolean} Returns `true` if `value` is a property name, else `false`.
 */
function isKey(value, object) {
  var type = typeof value;
  if ((type == 'string' && reIsPlainProp.test(value)) || type == 'number') {
    return true;
  }
  if (isArray(value)) {
    return false;
  }
  var result = !reIsDeepProp.test(value);
  return result || (object != null && value in toObject(object));
}

module.exports = isKey;

},{"../lang/isArray":66,"./toObject":63}],59:[function(require,module,exports){
/**
 * Used as the [maximum length](http://ecma-international.org/ecma-262/6.0/#sec-number.max_safe_integer)
 * of an array-like value.
 */
var MAX_SAFE_INTEGER = 9007199254740991;

/**
 * Checks if `value` is a valid array-like length.
 *
 * **Note:** This function is based on [`ToLength`](http://ecma-international.org/ecma-262/6.0/#sec-tolength).
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
 */
function isLength(value) {
  return typeof value == 'number' && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}

module.exports = isLength;

},{}],60:[function(require,module,exports){
/**
 * Checks if `value` is object-like.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 */
function isObjectLike(value) {
  return !!value && typeof value == 'object';
}

module.exports = isObjectLike;

},{}],61:[function(require,module,exports){
var isObject = require('../lang/isObject');

/**
 * Checks if `value` is suitable for strict equality comparisons, i.e. `===`.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` if suitable for strict
 *  equality comparisons, else `false`.
 */
function isStrictComparable(value) {
  return value === value && !isObject(value);
}

module.exports = isStrictComparable;

},{"../lang/isObject":69}],62:[function(require,module,exports){
var isArguments = require('../lang/isArguments'),
    isArray = require('../lang/isArray'),
    isIndex = require('./isIndex'),
    isLength = require('./isLength'),
    keysIn = require('../object/keysIn');

/** Used for native method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * A fallback implementation of `Object.keys` which creates an array of the
 * own enumerable property names of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */
function shimKeys(object) {
  var props = keysIn(object),
      propsLength = props.length,
      length = propsLength && object.length;

  var allowIndexes = !!length && isLength(length) &&
    (isArray(object) || isArguments(object));

  var index = -1,
      result = [];

  while (++index < propsLength) {
    var key = props[index];
    if ((allowIndexes && isIndex(key, length)) || hasOwnProperty.call(object, key)) {
      result.push(key);
    }
  }
  return result;
}

module.exports = shimKeys;

},{"../lang/isArguments":65,"../lang/isArray":66,"../object/keysIn":74,"./isIndex":56,"./isLength":59}],63:[function(require,module,exports){
var isObject = require('../lang/isObject');

/**
 * Converts `value` to an object if it's not one.
 *
 * @private
 * @param {*} value The value to process.
 * @returns {Object} Returns the object.
 */
function toObject(value) {
  return isObject(value) ? value : Object(value);
}

module.exports = toObject;

},{"../lang/isObject":69}],64:[function(require,module,exports){
var baseToString = require('./baseToString'),
    isArray = require('../lang/isArray');

/** Used to match property names within property paths. */
var rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\n\\]|\\.)*?)\2)\]/g;

/** Used to match backslashes in property paths. */
var reEscapeChar = /\\(\\)?/g;

/**
 * Converts `value` to property path array if it's not one.
 *
 * @private
 * @param {*} value The value to process.
 * @returns {Array} Returns the property path array.
 */
function toPath(value) {
  if (isArray(value)) {
    return value;
  }
  var result = [];
  baseToString(value).replace(rePropName, function(match, number, quote, string) {
    result.push(quote ? string.replace(reEscapeChar, '$1') : (number || match));
  });
  return result;
}

module.exports = toPath;

},{"../lang/isArray":66,"./baseToString":38}],65:[function(require,module,exports){
var isArrayLike = require('../internal/isArrayLike'),
    isObjectLike = require('../internal/isObjectLike');

/** Used for native method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/** Native method references. */
var propertyIsEnumerable = objectProto.propertyIsEnumerable;

/**
 * Checks if `value` is classified as an `arguments` object.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
 * @example
 *
 * _.isArguments(function() { return arguments; }());
 * // => true
 *
 * _.isArguments([1, 2, 3]);
 * // => false
 */
function isArguments(value) {
  return isObjectLike(value) && isArrayLike(value) &&
    hasOwnProperty.call(value, 'callee') && !propertyIsEnumerable.call(value, 'callee');
}

module.exports = isArguments;

},{"../internal/isArrayLike":55,"../internal/isObjectLike":60}],66:[function(require,module,exports){
var getNative = require('../internal/getNative'),
    isLength = require('../internal/isLength'),
    isObjectLike = require('../internal/isObjectLike');

/** `Object#toString` result references. */
var arrayTag = '[object Array]';

/** Used for native method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
 * of values.
 */
var objToString = objectProto.toString;

/* Native method references for those with the same name as other `lodash` methods. */
var nativeIsArray = getNative(Array, 'isArray');

/**
 * Checks if `value` is classified as an `Array` object.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
 * @example
 *
 * _.isArray([1, 2, 3]);
 * // => true
 *
 * _.isArray(function() { return arguments; }());
 * // => false
 */
var isArray = nativeIsArray || function(value) {
  return isObjectLike(value) && isLength(value.length) && objToString.call(value) == arrayTag;
};

module.exports = isArray;

},{"../internal/getNative":53,"../internal/isLength":59,"../internal/isObjectLike":60}],67:[function(require,module,exports){
var isObject = require('./isObject');

/** `Object#toString` result references. */
var funcTag = '[object Function]';

/** Used for native method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
 * of values.
 */
var objToString = objectProto.toString;

/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */
function isFunction(value) {
  // The use of `Object#toString` avoids issues with the `typeof` operator
  // in older versions of Chrome and Safari which return 'function' for regexes
  // and Safari 8 equivalents which return 'object' for typed array constructors.
  return isObject(value) && objToString.call(value) == funcTag;
}

module.exports = isFunction;

},{"./isObject":69}],68:[function(require,module,exports){
var isFunction = require('./isFunction'),
    isObjectLike = require('../internal/isObjectLike');

/** Used to detect host constructors (Safari > 5). */
var reIsHostCtor = /^\[object .+?Constructor\]$/;

/** Used for native method references. */
var objectProto = Object.prototype;

/** Used to resolve the decompiled source of functions. */
var fnToString = Function.prototype.toString;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/** Used to detect if a method is native. */
var reIsNative = RegExp('^' +
  fnToString.call(hasOwnProperty).replace(/[\\^$.*+?()[\]{}|]/g, '\\$&')
  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
);

/**
 * Checks if `value` is a native function.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a native function, else `false`.
 * @example
 *
 * _.isNative(Array.prototype.push);
 * // => true
 *
 * _.isNative(_);
 * // => false
 */
function isNative(value) {
  if (value == null) {
    return false;
  }
  if (isFunction(value)) {
    return reIsNative.test(fnToString.call(value));
  }
  return isObjectLike(value) && reIsHostCtor.test(value);
}

module.exports = isNative;

},{"../internal/isObjectLike":60,"./isFunction":67}],69:[function(require,module,exports){
/**
 * Checks if `value` is the [language type](https://es5.github.io/#x8) of `Object`.
 * (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(1);
 * // => false
 */
function isObject(value) {
  // Avoid a V8 JIT bug in Chrome 19-20.
  // See https://code.google.com/p/v8/issues/detail?id=2291 for more details.
  var type = typeof value;
  return !!value && (type == 'object' || type == 'function');
}

module.exports = isObject;

},{}],70:[function(require,module,exports){
var isObjectLike = require('../internal/isObjectLike');

/** `Object#toString` result references. */
var stringTag = '[object String]';

/** Used for native method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
 * of values.
 */
var objToString = objectProto.toString;

/**
 * Checks if `value` is classified as a `String` primitive or object.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
 * @example
 *
 * _.isString('abc');
 * // => true
 *
 * _.isString(1);
 * // => false
 */
function isString(value) {
  return typeof value == 'string' || (isObjectLike(value) && objToString.call(value) == stringTag);
}

module.exports = isString;

},{"../internal/isObjectLike":60}],71:[function(require,module,exports){
var isLength = require('../internal/isLength'),
    isObjectLike = require('../internal/isObjectLike');

/** `Object#toString` result references. */
var argsTag = '[object Arguments]',
    arrayTag = '[object Array]',
    boolTag = '[object Boolean]',
    dateTag = '[object Date]',
    errorTag = '[object Error]',
    funcTag = '[object Function]',
    mapTag = '[object Map]',
    numberTag = '[object Number]',
    objectTag = '[object Object]',
    regexpTag = '[object RegExp]',
    setTag = '[object Set]',
    stringTag = '[object String]',
    weakMapTag = '[object WeakMap]';

var arrayBufferTag = '[object ArrayBuffer]',
    float32Tag = '[object Float32Array]',
    float64Tag = '[object Float64Array]',
    int8Tag = '[object Int8Array]',
    int16Tag = '[object Int16Array]',
    int32Tag = '[object Int32Array]',
    uint8Tag = '[object Uint8Array]',
    uint8ClampedTag = '[object Uint8ClampedArray]',
    uint16Tag = '[object Uint16Array]',
    uint32Tag = '[object Uint32Array]';

/** Used to identify `toStringTag` values of typed arrays. */
var typedArrayTags = {};
typedArrayTags[float32Tag] = typedArrayTags[float64Tag] =
typedArrayTags[int8Tag] = typedArrayTags[int16Tag] =
typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] =
typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] =
typedArrayTags[uint32Tag] = true;
typedArrayTags[argsTag] = typedArrayTags[arrayTag] =
typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] =
typedArrayTags[dateTag] = typedArrayTags[errorTag] =
typedArrayTags[funcTag] = typedArrayTags[mapTag] =
typedArrayTags[numberTag] = typedArrayTags[objectTag] =
typedArrayTags[regexpTag] = typedArrayTags[setTag] =
typedArrayTags[stringTag] = typedArrayTags[weakMapTag] = false;

/** Used for native method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
 * of values.
 */
var objToString = objectProto.toString;

/**
 * Checks if `value` is classified as a typed array.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
 * @example
 *
 * _.isTypedArray(new Uint8Array);
 * // => true
 *
 * _.isTypedArray([]);
 * // => false
 */
function isTypedArray(value) {
  return isObjectLike(value) && isLength(value.length) && !!typedArrayTags[objToString.call(value)];
}

module.exports = isTypedArray;

},{"../internal/isLength":59,"../internal/isObjectLike":60}],72:[function(require,module,exports){
var assignWith = require('../internal/assignWith'),
    baseAssign = require('../internal/baseAssign'),
    createAssigner = require('../internal/createAssigner');

/**
 * Assigns own enumerable properties of source object(s) to the destination
 * object. Subsequent sources overwrite property assignments of previous sources.
 * If `customizer` is provided it is invoked to produce the assigned values.
 * The `customizer` is bound to `thisArg` and invoked with five arguments:
 * (objectValue, sourceValue, key, object, source).
 *
 * **Note:** This method mutates `object` and is based on
 * [`Object.assign`](http://ecma-international.org/ecma-262/6.0/#sec-object.assign).
 *
 * @static
 * @memberOf _
 * @alias extend
 * @category Object
 * @param {Object} object The destination object.
 * @param {...Object} [sources] The source objects.
 * @param {Function} [customizer] The function to customize assigned values.
 * @param {*} [thisArg] The `this` binding of `customizer`.
 * @returns {Object} Returns `object`.
 * @example
 *
 * _.assign({ 'user': 'barney' }, { 'age': 40 }, { 'user': 'fred' });
 * // => { 'user': 'fred', 'age': 40 }
 *
 * // using a customizer callback
 * var defaults = _.partialRight(_.assign, function(value, other) {
 *   return _.isUndefined(value) ? other : value;
 * });
 *
 * defaults({ 'user': 'barney' }, { 'age': 36 }, { 'user': 'fred' });
 * // => { 'user': 'barney', 'age': 36 }
 */
var assign = createAssigner(function(object, source, customizer) {
  return customizer
    ? assignWith(object, source, customizer)
    : baseAssign(object, source);
});

module.exports = assign;

},{"../internal/assignWith":17,"../internal/baseAssign":18,"../internal/createAssigner":43}],73:[function(require,module,exports){
var getNative = require('../internal/getNative'),
    isArrayLike = require('../internal/isArrayLike'),
    isObject = require('../lang/isObject'),
    shimKeys = require('../internal/shimKeys');

/* Native method references for those with the same name as other `lodash` methods. */
var nativeKeys = getNative(Object, 'keys');

/**
 * Creates an array of the own enumerable property names of `object`.
 *
 * **Note:** Non-object values are coerced to objects. See the
 * [ES spec](http://ecma-international.org/ecma-262/6.0/#sec-object.keys)
 * for more details.
 *
 * @static
 * @memberOf _
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.keys(new Foo);
 * // => ['a', 'b'] (iteration order is not guaranteed)
 *
 * _.keys('hi');
 * // => ['0', '1']
 */
var keys = !nativeKeys ? shimKeys : function(object) {
  var Ctor = object == null ? undefined : object.constructor;
  if ((typeof Ctor == 'function' && Ctor.prototype === object) ||
      (typeof object != 'function' && isArrayLike(object))) {
    return shimKeys(object);
  }
  return isObject(object) ? nativeKeys(object) : [];
};

module.exports = keys;

},{"../internal/getNative":53,"../internal/isArrayLike":55,"../internal/shimKeys":62,"../lang/isObject":69}],74:[function(require,module,exports){
var isArguments = require('../lang/isArguments'),
    isArray = require('../lang/isArray'),
    isIndex = require('../internal/isIndex'),
    isLength = require('../internal/isLength'),
    isObject = require('../lang/isObject');

/** Used for native method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Creates an array of the own and inherited enumerable property names of `object`.
 *
 * **Note:** Non-object values are coerced to objects.
 *
 * @static
 * @memberOf _
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.keysIn(new Foo);
 * // => ['a', 'b', 'c'] (iteration order is not guaranteed)
 */
function keysIn(object) {
  if (object == null) {
    return [];
  }
  if (!isObject(object)) {
    object = Object(object);
  }
  var length = object.length;
  length = (length && isLength(length) &&
    (isArray(object) || isArguments(object)) && length) || 0;

  var Ctor = object.constructor,
      index = -1,
      isProto = typeof Ctor == 'function' && Ctor.prototype === object,
      result = Array(length),
      skipIndexes = length > 0;

  while (++index < length) {
    result[index] = (index + '');
  }
  for (var key in object) {
    if (!(skipIndexes && isIndex(key, length)) &&
        !(key == 'constructor' && (isProto || !hasOwnProperty.call(object, key)))) {
      result.push(key);
    }
  }
  return result;
}

module.exports = keysIn;

},{"../internal/isIndex":56,"../internal/isLength":59,"../lang/isArguments":65,"../lang/isArray":66,"../lang/isObject":69}],75:[function(require,module,exports){
var keys = require('./keys'),
    toObject = require('../internal/toObject');

/**
 * Creates a two dimensional array of the key-value pairs for `object`,
 * e.g. `[[key1, value1], [key2, value2]]`.
 *
 * @static
 * @memberOf _
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the new array of key-value pairs.
 * @example
 *
 * _.pairs({ 'barney': 36, 'fred': 40 });
 * // => [['barney', 36], ['fred', 40]] (iteration order is not guaranteed)
 */
function pairs(object) {
  object = toObject(object);

  var index = -1,
      props = keys(object),
      length = props.length,
      result = Array(length);

  while (++index < length) {
    var key = props[index];
    result[index] = [key, object[key]];
  }
  return result;
}

module.exports = pairs;

},{"../internal/toObject":63,"./keys":73}],76:[function(require,module,exports){
var baseValues = require('../internal/baseValues'),
    keys = require('./keys');

/**
 * Creates an array of the own enumerable property values of `object`.
 *
 * **Note:** Non-object values are coerced to objects.
 *
 * @static
 * @memberOf _
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property values.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.values(new Foo);
 * // => [1, 2] (iteration order is not guaranteed)
 *
 * _.values('hi');
 * // => ['h', 'i']
 */
function values(object) {
  return baseValues(object, keys(object));
}

module.exports = values;

},{"../internal/baseValues":39,"./keys":73}],77:[function(require,module,exports){
/**
 * This method returns the first argument provided to it.
 *
 * @static
 * @memberOf _
 * @category Utility
 * @param {*} value Any value.
 * @returns {*} Returns `value`.
 * @example
 *
 * var object = { 'user': 'fred' };
 *
 * _.identity(object) === object;
 * // => true
 */
function identity(value) {
  return value;
}

module.exports = identity;

},{}],78:[function(require,module,exports){
var baseProperty = require('../internal/baseProperty'),
    basePropertyDeep = require('../internal/basePropertyDeep'),
    isKey = require('../internal/isKey');

/**
 * Creates a function that returns the property value at `path` on a
 * given object.
 *
 * @static
 * @memberOf _
 * @category Utility
 * @param {Array|string} path The path of the property to get.
 * @returns {Function} Returns the new function.
 * @example
 *
 * var objects = [
 *   { 'a': { 'b': { 'c': 2 } } },
 *   { 'a': { 'b': { 'c': 1 } } }
 * ];
 *
 * _.map(objects, _.property('a.b.c'));
 * // => [2, 1]
 *
 * _.pluck(_.sortBy(objects, _.property(['a', 'b', 'c'])), 'a.b.c');
 * // => [1, 2]
 */
function property(path) {
  return isKey(path) ? baseProperty(path) : basePropertyDeep(path);
}

module.exports = property;

},{"../internal/baseProperty":35,"../internal/basePropertyDeep":36,"../internal/isKey":58}],79:[function(require,module,exports){
(function (global){
'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _ember = (typeof window !== "undefined" ? window['Ember'] : typeof global !== "undefined" ? global['Ember'] : null);

var _ember2 = _interopRequireDefault(_ember);

var _emberData = (typeof window !== "undefined" ? window['DS'] : typeof global !== "undefined" ? global['DS'] : null);

var _emberData2 = _interopRequireDefault(_emberData);

var _addonAdaptersFirebase = require('../../addon/adapters/firebase');

var _addonAdaptersFirebase2 = _interopRequireDefault(_addonAdaptersFirebase);

var _addonSerializersFirebase = require('../../addon/serializers/firebase');

var _addonSerializersFirebase2 = _interopRequireDefault(_addonSerializersFirebase);

var _addonInitializersEmberfire = require('../../addon/initializers/emberfire');

var _addonInitializersEmberfire2 = _interopRequireDefault(_addonInitializersEmberfire);

_emberData2['default'].FirebaseAdapter = _addonAdaptersFirebase2['default'];
_emberData2['default'].FirebaseSerializer = _addonSerializersFirebase2['default'];

_ember2['default'].onLoad('Ember.Application', function (Application) {
  Application.initializer(_addonInitializersEmberfire2['default']);
});

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"../../addon/adapters/firebase":1,"../../addon/initializers/emberfire":2,"../../addon/serializers/firebase":3}]},{},[79])


//# sourceMappingURL=emberfire.js.map