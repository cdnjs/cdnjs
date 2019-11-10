/*!
 * EmberFire is the officially supported adapter for using Firebase with
 * Ember Data. The DS.FirebaseAdapter provides all of the standard DS.Adapter
 * methods and will automatically synchronize the store with Firebase.
 *
 * EmberFire 0.0.0
 * https://github.com/firebase/emberfire/
 * License: MIT
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

var _emberInflector = require('ember-inflector');

var _emberInflector2 = _interopRequireDefault(_emberInflector);

var _mixinsWaitable = require('../mixins/waitable');

var _mixinsWaitable2 = _interopRequireDefault(_mixinsWaitable);

var _utilsToPromise = require('../utils/to-promise');

var _utilsToPromise2 = _interopRequireDefault(_utilsToPromise);

var assign = _ember2['default'].assign;
var RSVP = _ember2['default'].RSVP;
var Promise = RSVP.Promise;

var uniq = function uniq(arr) {
  var ret = _ember2['default'].A();

  arr.forEach(function (k) {
    if (ret.indexOf(k) < 0) {
      ret.push(k);
    }
  });

  return ret;
};

/**
 * The Firebase adapter allows your store to communicate with the Firebase
 * realtime service. To use the adapter in your app, extend DS.FirebaseAdapter
 * and customize the endpoint to point to the Firebase URL where you want this
 * data to be stored.
 *
 * The adapter will automatically communicate with Firebase to persist your
 * records as neccessary. Importantly, the adapter will also update the store
 * in realtime when changes are made to the Firebase by other clients or
 * otherwise.
 */
exports['default'] = _emberData2['default'].Adapter.extend(_mixinsWaitable2['default'], {
  firebase: _ember2['default'].inject.service(),
  store: _ember2['default'].inject.service(),
  defaultSerializer: '-firebase',

  /**
   * Endpoint paths can be customized by setting the Firebase property on the
   * adapter:
   *
   * ```js
   * DS.FirebaseAdapter.extend({
   *   firebase: new Firebase('https://<my-firebase>.firebaseio.com/')
   * });
   * ```
   *
   * Requests for `App.Post` now target `https://<my-firebase>.firebaseio.com/posts`.
   *
   * @property firebase
   * @type {Firebase}
   * @constructor
   */
  init: function init() {
    this._super.apply(this, arguments);

    var ref = this.get('firebase');
    if (!ref) {
      throw new Error('Please set the `firebase` property in the environment config.');
    }
    // If provided Firebase reference was a query (eg: limits), make it a ref.
    this._ref = ref;
    // Keep track of what types `.findAll()` has been called for
    this._findAllMapForType = {};
    // Keep a cache to check modified relationships against
    this._recordCacheForType = {};
    // Used to batch records into the store
    this._queue = [];
    // Payloads to push later
    this._queuedPayloads = {};
  },

  /**
   * Uses push() to generate chronologically ordered unique IDs.
   *
   * @return {String}
   */
  generateIdForRecord: function generateIdForRecord() {
    return this._getKey(this._ref.push());
  },

  /**
   * Use the Firebase DataSnapshot's key as the record id
   *
   * @param {Object} snapshot - A Firebase snapshot
   * @param {Object} payload - The payload that will be pushed into the store
   * @return {Object} payload
   */
  _assignIdToPayload: function _assignIdToPayload(snapshot) {
    var payload = snapshot.val();
    if (payload !== null && typeof payload === 'object' && typeof payload.id === 'undefined') {
      payload.id = this._getKey(snapshot);
    }
    return payload;
  },

  /**
   * Called by the store to retrieve the JSON for a given type and ID. The
   * method will return a promise which will resolve when the value is
   * successfully fetched from Firebase.
   *
   * Additionally, from this point on, the object's value in the store will
   * also be automatically updated whenever the remote value changes.
   */
  findRecord: function findRecord(store, typeClass, id) {
    var _this = this;

    var ref = this._getCollectionRef(typeClass, id);

    var log = 'DS: FirebaseAdapter#findRecord ' + typeClass.modelName + ' to ' + ref.toString();

    return this._fetch(ref, log).then(function (snapshot) {
      var payload = _this._assignIdToPayload(snapshot);
      _this._updateRecordCacheForType(typeClass, payload, store);
      if (payload === null) {
        var error = new Error('no record was found at ' + ref.toString());
        error.recordId = id;
        throw error;
      }

      return payload;
    });
  },

  /**
   * Promise interface for once('value').
   *
   * @param  {Firebase} ref
   * @param  {String} log
   * @return {Promise<DataSnapshot>}
   * @private
   */
  _fetch: function _fetch(ref, log) {
    return RSVP.resolve(ref.once('value'), log);
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
    var _this2 = this;

    record.eachRelationship(function (key, relationship) {
      if (relationship.kind === 'belongsTo') {
        var parentRecord = record.get(relationship.key);
        var inverseKey = record.inverseFor(relationship.key);
        if (inverseKey && parentRecord.get('id')) {
          var parentRef = _this2._getCollectionRef(inverseKey.type, parentRecord.get('id'));
          _this2._removeHasManyRecord(store, parentRef, inverseKey.name, record.constructor, record.id);
        }
      }
    });
  },

  listenForChanges: function listenForChanges(store, typeClass, record) {
    var _this3 = this;

    // embedded records will get their changes from parent listeners
    if (!this.isRecordEmbedded(record)) {
      record.__listening = true;
      var ref = this._getCollectionRef(typeClass, record.id);
      var called = false;
      ref.on('value', function (snapshot) {
        if (called) {
          _ember2['default'].run(function () {
            _this3._handleChildValue(store, typeClass, snapshot);
          });
        }
        called = true;
      }, function (error) {
        _ember2['default'].Logger.error(error);
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
   * Called by the store to retrieve the JSON for all of the records for a
   * given type. The method will return a promise which will resolve when the
   * value is successfully fetched from Firebase.
   *
   * Additionally, from this point on, any records of this type that are added,
   * removed or modified from Firebase will automatically be reflected in the
   * store.
   */
  findAll: function findAll(store, typeClass) {
    var _this4 = this;

    var ref = this._getCollectionRef(typeClass);

    var log = 'DS: FirebaseAdapter#findAll ' + typeClass.modelName + ' to ' + ref.toString();

    return this._fetch(ref, log).then(function (snapshot) {
      if (!_this4._findAllHasEventsForType(typeClass)) {
        _this4._findAllAddEventListeners(store, typeClass, ref);
      }
      var results = [];
      snapshot.forEach(function (childSnapshot) {
        var payload = _this4._assignIdToPayload(childSnapshot);
        _this4._updateRecordCacheForType(typeClass, payload, store);
        results.push(payload);
      });

      return results;
    });
  },

  query: function query(store, typeClass, _query, recordArray) {
    var _this5 = this;

    var ref = this._getCollectionRef(typeClass);
    var modelName = typeClass.modelName;

    ref = this.applyQueryToRef(ref, _query);

    ref.on('child_added', _ember2['default'].run.bind(this, function (snapshot) {
      var record = store.peekRecord(modelName, this._getKey(snapshot));

      if (!record || !record.__listening) {
        var payload = this._assignIdToPayload(snapshot);
        var normalizedData = store.normalize(typeClass.modelName, payload);
        this._updateRecordCacheForType(typeClass, payload, store);
        record = store.push(normalizedData);
      }

      if (record) {
        recordArray.get('content').addObject(record._internalModel);
      }
    }));

    // `child_changed` is already handled by the record's
    // value listener after a store.push. `child_moved` is
    // a much less common case because it relates to priority

    ref.on('child_removed', _ember2['default'].run.bind(this, function (snapshot) {
      var record = store.peekRecord(modelName, this._getKey(snapshot));
      if (record) {
        recordArray.get('content').removeObject(record._internalModel);
      }
    }));

    // clean up event handlers when the array is being destroyed
    // so that future firebase events wont keep trying to use a
    // destroyed store/serializer
    recordArray.__firebaseCleanup = function () {
      ref.off('child_added');
      ref.off('child_removed');
    };

    var log = 'DS: FirebaseAdapter#query ' + modelName + ' with ' + _query;

    return this._fetch(ref, log).then(function (snapshot) {
      if (!_this5._findAllHasEventsForType(typeClass)) {
        _this5._findAllAddEventListeners(store, typeClass, ref);
      }
      var results = [];
      snapshot.forEach(function (childSnapshot) {
        var payload = _this5._assignIdToPayload(childSnapshot);
        _this5._updateRecordCacheForType(typeClass, payload, store);
        results.push(payload);
      });
      return results;
    });
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

    ref = this._applyRangesToRef(ref, query);
    ref = this._applyLimitsToRef(ref, query);

    return ref;
  },

  _applyRangesToRef: function _applyRangesToRef(ref, query) {
    var methods = ['equalTo', 'startAt', 'endAt'];
    methods.forEach(function (key) {
      if (query[key] !== undefined) {
        ref = ref[key](query[key]);
      }
    });

    return ref;
  },

  _applyLimitsToRef: function _applyLimitsToRef(ref, query) {
    var methods = ['limitToFirst', 'limitToLast'];
    methods.forEach(function (key) {
      if (Number.isInteger(query[key])) {
        ref = ref[key](query[key]);
      }
    });

    return ref;
  },

  /**
   * Keep track of what types `.findAll()` has been called for
   * so duplicate listeners aren't added
   */
  _findAllMapForType: undefined,

  /**
   * Determine if the current type is already listening for children events
   */
  _findAllHasEventsForType: function _findAllHasEventsForType(typeClass) {
    return !_ember2['default'].isNone(this._findAllMapForType[typeClass.modelName]);
  },

  /**
   * After `.findAll()` is called on a modelName, continue to listen for
   * `child_added`, `child_removed`, and `child_changed`
   */
  _findAllAddEventListeners: function _findAllAddEventListeners(store, typeClass, ref) {
    var modelName = typeClass.modelName;
    this._findAllMapForType[modelName] = true;

    ref.on('child_added', _ember2['default'].run.bind(this, function (snapshot) {
      if (!store.hasRecordForId(modelName, this._getKey(snapshot))) {
        this._handleChildValue(store, typeClass, snapshot);
      }
    }));
  },

  /**
   * Push a new child record into the store
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
      this._pushLater(typeClass.modelName, payload.id, payload);
    }
  },

  /**
   * `createRecord` is an alias for `updateRecord` because calling \
   * `ref.set()` would wipe out any existing relationships
   */
  createRecord: function createRecord(store, typeClass, snapshot) {
    var _this6 = this;

    return this.updateRecord(store, typeClass, snapshot).then(function () {
      _this6.listenForChanges(store, typeClass, snapshot.record);
    });
  },

  /**
   * Called by the store when a record is created/updated via the `save`
   * method on a model record instance.
   *
   * The `updateRecord` method serializes the record and performs an `update()`
   * at the the Firebase location and a `.set()` at any relationship locations
   * The method will return a promise which will be resolved when the data and
   * any relationships have been successfully saved to Firebase.
   *
   * We take an optional record reference, in order for this method to be usable
   * for saving nested records as well.
   */
  updateRecord: function updateRecord(store, typeClass, snapshot) {
    var _this7 = this;

    var recordRef = this._getAbsoluteRef(snapshot.record);
    var recordCache = this._getRecordCache(typeClass, snapshot.id);
    var pathPieces = recordRef.path.toString().split('/');
    var lastPiece = pathPieces[pathPieces.length - 1];
    var serializedRecord = snapshot.serialize({
      includeId: lastPiece !== snapshot.id // record has no firebase `key` in path
    });
    var serializer = store.serializerFor(typeClass.modelName);

    return new Promise(function (resolve, reject) {
      var relationshipsToSave = [];
      // first we remove all relationships data from the serialized record, we backup the
      // removed data so that we can save it at a later stage.
      snapshot.record.eachRelationship(function (key, relationship) {
        var relationshipKey = serializer.keyForRelationship(key);
        var data = serializedRecord[relationshipKey];
        var isEmbedded = _this7.isRelationshipEmbedded(store, typeClass.modelName, relationship);
        var hasMany = relationship.kind === 'hasMany';
        if (hasMany || isEmbedded) {
          if (!_ember2['default'].isNone(data)) {
            relationshipsToSave.push({
              data: data,
              relationship: relationship,
              isEmbedded: isEmbedded,
              hasMany: hasMany
            });
          }
          delete serializedRecord[relationshipKey];
        }
      });
      var reportError = function reportError(errors) {
        var error = new Error('Some errors were encountered while saving ' + typeClass + ' ' + snapshot.id);
        error.errors = errors;
        reject(error);
      };
      _this7._updateRecord(recordRef, serializedRecord).then(function () {
        // and now we construct the list of promise to save relationships.
        var savedRelationships = relationshipsToSave.map(function (relationshipToSave) {
          var data = relationshipToSave.data;
          var relationship = relationshipToSave.relationship;
          if (relationshipToSave.hasMany) {
            return _this7._saveHasManyRelationship(store, typeClass, relationship, data, recordRef, recordCache);
          } else {
            // embedded belongsTo, we need to fill in the informations.
            if (relationshipToSave.isEmbedded) {
              return _this7._saveEmbeddedBelongsToRecord(store, typeClass, relationship, data, recordRef);
            }
          }
        });
        return _ember2['default'].RSVP.allSettled(savedRelationships);
      })['catch'](function (e) {
        reportError([e]);
      }).then(function (results) {
        var rejected = _ember2['default'].A(results).filterBy('state', 'rejected');
        if (rejected.length !== 0) {
          reportError(rejected.mapBy('reason').toArray());
        } else {
          resolve();
        }
      });
    }, 'DS: FirebaseAdapter#updateRecord ' + typeClass + ' to ' + recordRef.toString());
  },

  /**
   * Update a single record without caring for the relationships
   * @param  {Firebase} recordRef
   * @param  {Object} serializedRecord
   * @return {Promise}
   */
  _updateRecord: function _updateRecord(recordRef, serializedRecord) {
    var _this8 = this;

    this._incrementWaiters();
    return (0, _utilsToPromise2['default'])(recordRef.update, recordRef, [serializedRecord]).then(function (result) {
      _this8._decrementWaiters();
      return result;
    })['catch'](function (e) {
      _this8._decrementWaiters();
      return _ember2['default'].RSVP.reject(e);
    });
  },

  /**
   * Call _saveHasManyRelationshipRecord on each record in the relationship
   * and then resolve once they have all settled
   */
  _saveHasManyRelationship: function _saveHasManyRelationship(store, typeClass, relationship, ids, recordRef, recordCache) {
    var _this9 = this;

    if (!_ember2['default'].isArray(ids)) {
      throw new Error('hasMany relationships must must be an array');
    }
    var idsCache = _ember2['default'].A(recordCache[relationship.key]);
    var dirtyRecords = [];

    // Added
    var addedRecords = ids.filter(function (id) {
      return !idsCache.includes(id);
    });

    // Dirty
    dirtyRecords = ids.filter(function (id) {
      var relatedModelName = relationship.type;
      return store.hasRecordForId(relatedModelName, id) && store.peekRecord(relatedModelName, id).get('hasDirtyAttributes') === true;
    });

    dirtyRecords = uniq(dirtyRecords.concat(addedRecords)).map(function (id) {
      return _this9._saveHasManyRecord(store, typeClass, relationship, recordRef, id);
    });

    // Removed
    var removedRecords = idsCache.filter(function (id) {
      return !ids.includes(id);
    });

    removedRecords = removedRecords.map(function (id) {
      return _this9._removeHasManyRecord(store, recordRef, relationship.key, typeClass, id);
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
   * If the relationship is `async: true`, create a child ref
   * named with the record id and set the value to true
    * If the relationship is `embedded: true`, create a child ref
   * named with the record id and update the value to the serialized
   * version of the record
   */
  _saveHasManyRecord: function _saveHasManyRecord(store, typeClass, relationship, parentRef, id) {
    var serializer = store.serializerFor(typeClass.modelName);
    var ref = this._getRelationshipRef(parentRef, serializer.keyForRelationship(relationship.key), id);
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
   * Remove a relationship
   */
  _removeHasManyRecord: function _removeHasManyRecord(store, parentRef, key, typeClass, id) {
    var relationshipKey = store.serializerFor(typeClass.modelName).keyForRelationship(key);
    var ref = this._getRelationshipRef(parentRef, relationshipKey, id);
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
   * Called by the store when a record is deleted.
   */
  deleteRecord: function deleteRecord(store, typeClass, snapshot) {
    var ref = this._getAbsoluteRef(snapshot.record);
    ref.off('value');
    return (0, _utilsToPromise2['default'])(ref.remove, ref);
  },

  /**
   * Determines a path fo a given type
   */
  pathForType: function pathForType(modelName) {
    var camelized = _ember2['default'].String.camelize(modelName);
    return _emberInflector2['default'].inflector.pluralize(camelized);
  },

  /**
   * Return a Firebase reference for a given modelName and optional ID.
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

      var embeddedKey = parent.store.serializerFor(parent.modelName).keyForRelationship(relationship.key);
      var recordRef = this._getAbsoluteRef(parent).child(embeddedKey);

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
    var relationships = assign({}, internalModel._implicitRelationships, internalModel._relationships.initializedRelationships);

    var embeddingParentRel = undefined;
    var relationshipKeys = Object.keys(relationships);

    for (var i = 0; i < relationshipKeys.length; i++) {
      var rel = relationships[relationshipKeys[i]];
      var members = rel.members.toArray();
      var _parent = members[0];

      if (!_parent || !rel.inverseKey) {
        continue;
      }

      var _parentRel = _parent._relationships.get(rel.inverseKey);
      if (this.isRelationshipEmbedded(this.store, _parent.type.modelName, _parentRel.relationshipMeta)) {
        embeddingParentRel = rel;
        break;
      }
    }

    if (embeddingParentRel) {
      var parent = embeddingParentRel.members.toArray()[0];
      var parentKey = embeddingParentRel.inverseKey;
      var parentRel = parent._relationships.get(parentKey).relationshipMeta;
      return { record: parent, relationship: parentRel };
    }
  },

  /**
   * Return a Firebase reference based on a relationship key and record id
   */
  _getRelationshipRef: function _getRelationshipRef(ref, key, id) {
    return ref.child(key).child(id);
  },

  /**
   * The amount of time (ms) before the _queue is flushed
   */
  _queueFlushDelay: 1000 / 60, // 60fps

  /**
   * Schedules a `_flushQueue` for later.
   *
   * @private
   */
  _flushLater: function _flushLater() {
    _ember2['default'].run.later(this, this._flushQueue, this._queueFlushDelay);
  },

  /**
   * Flush all delayed `store.push` payloads in `this._queuedPayloads`.
   *
   * @private
   */
  _flushQueue: function _flushQueue() {
    var _this10 = this;

    var store = this.get('store');
    if (store.isDestroying) {
      return;
    }

    this._queue.forEach(function (key) {
      var _queuedPayloads$key = _this10._queuedPayloads[key];
      var payload = _queuedPayloads$key.payload;
      var modelName = _queuedPayloads$key.modelName;

      var normalizedData = store.normalize(modelName, payload);
      store.push(normalizedData);
    });
    this._queuedPayloads = {};
    this._queue.length = 0;
  },

  /**
   * Schedule a payload push for later. This will only push at most one payload
   * per record. When trying to push to the same record multiple times, only the
   * last push will be kept.
   *
   * @param {string} modelName
   * @param {string} id
   * @param {!Object<string, *>} payload
   * @private
   */
  _pushLater: function _pushLater(modelName, id, payload) {
    var store = this.get('store');
    if (!this._queueFlushDelay) {
      var normalizedData = store.normalize(modelName, payload);
      store.push(normalizedData);
      return;
    }

    var key = modelName + '-' + id;
    if (this._queuedPayloads[key]) {
      // remove from original place in queue (will be added to end)
      var oldPosition = this._queue.indexOf(key);
      this._queue.splice(oldPosition, 1);
    }
    this._queuedPayloads[key] = { payload: payload, modelName: modelName };
    this._queue.push(key);

    // if this is the first item to be queued, schedule a flush
    if (this._queue.length === 1) {
      this._flushLater();
    }
  },

  /**
   * A cache of hasMany relationships that can be used to
   * diff against new relationships when a model is saved
   */
  _recordCacheForType: undefined,

  /**
   * _updateHasManyCacheForType
   */
  _updateRecordCacheForType: function _updateRecordCacheForType(typeClass, payload, store) {
    var _this11 = this;

    if (!payload) {
      return;
    }
    var id = payload.id;
    var cache = this._getRecordCache(typeClass, id);
    var serializer = store.serializerFor(typeClass.modelName);
    // Only cache relationships for now
    // and do the same for embedded records
    typeClass.eachRelationship(function (key, relationship) {
      if (relationship.kind === 'hasMany') {
        var relationshipPayload = payload[serializer.keyForRelationship(key)];
        if (!relationshipPayload) {
          cache[key] = _ember2['default'].A();
        } else {
          var isEmbedded = _this11.isRelationshipEmbedded(store, typeClass.modelName, relationship);
          if (isEmbedded) {
            var relationshipTypeClass = store.modelFor(relationship.type);
            for (var _id in relationshipPayload) {
              var obj = relationshipPayload[_id];
              obj.id = _id;
              _this11._updateRecordCacheForType(relationshipTypeClass, obj, store);
            }
          } else {
            var ids = Object.keys(relationshipPayload);
            cache[key] = _ember2['default'].A(ids);
          }
        }
      }
    });
  },

  /**
   * Get or create the cache for a record
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
    var key;
    if (typeof refOrSnapshot.key === 'function') {
      key = refOrSnapshot.key();
    } else if (typeof refOrSnapshot.key === 'string') {
      key = refOrSnapshot.key;
    } else {
      key = refOrSnapshot.name();
    }
    return key;
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

},{"../mixins/waitable":3,"../utils/to-promise":5,"ember-inflector":6}],2:[function(require,module,exports){
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

var _firebase = (typeof window !== "undefined" ? window['firebase'] : typeof global !== "undefined" ? global['firebase'] : null);

var _firebase2 = _interopRequireDefault(_firebase);

var _adaptersFirebase = require('../adapters/firebase');

var _adaptersFirebase2 = _interopRequireDefault(_adaptersFirebase);

var _serializersFirebase = require('../serializers/firebase');

var _serializersFirebase2 = _interopRequireDefault(_serializersFirebase);

var VERSION = '0.0.0';

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

    var providerSettings = { instantiate: false, singleton: false };
    application.register('firebase-auth-provider:twitter', _firebase2['default'].auth.TwitterAuthProvider, providerSettings);
    application.register('firebase-auth-provider:facebook', _firebase2['default'].auth.FacebookAuthProvider, providerSettings);
    application.register('firebase-auth-provider:github', _firebase2['default'].auth.GithubAuthProvider, providerSettings);
    application.register('firebase-auth-provider:google', _firebase2['default'].auth.GoogleAuthProvider, providerSettings);

    // Monkeypatch the store until ED gives us a good way to listen to push events
    if (!_emberData2['default'].Store.prototype._emberfirePatched) {
      _emberData2['default'].Store.reopen({
        _emberfirePatched: true,

        _emberfireHandleRecordPush: function _emberfireHandleRecordPush(records) {
          var _this = this;

          if (typeof records !== 'undefined') {
            records.forEach(function (record) {
              var modelName = record.constructor.modelName;
              var adapter = _this.adapterFor(modelName);
              if (adapter.recordWasPushed) {
                adapter.recordWasPushed(_this, modelName, record);
              }
            });
          }
        },

        push: function push() {
          var result = this._super.apply(this, arguments);
          var records = result;

          if (records === null) {
            return null;
          }

          if (!_ember2['default'].isArray(result)) {
            records = [result];
          }

          this._emberfireHandleRecordPush(records);
          return result;
        },

        _push: function _push() {
          var pushed = this._super.apply(this, arguments);
          var records;
          if (Array.isArray(pushed)) {
            records = pushed.map(function (internalModel) {
              return internalModel.getRecord();
            });
          } else if (pushed) {
            records = [pushed.getRecord()];
          }
          this._emberfireHandleRecordPush(records);
          return pushed;
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

},{"../adapters/firebase":1,"../serializers/firebase":4}],3:[function(require,module,exports){
(function (global){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _ember = (typeof window !== "undefined" ? window['Ember'] : typeof global !== "undefined" ? global['Ember'] : null);

var _ember2 = _interopRequireDefault(_ember);

exports['default'] = _ember2['default'].Mixin.create({

  init: function init() {
    this._super.apply(this, arguments);
    // unresolved requests, used in testing
    this._reasons = 0;

    if (_ember2['default'].testing) {
      this._registerWaiter();
    }
  },

  _incrementWaiters: function _incrementWaiters() {
    this._reasons++;
  },

  _decrementWaiters: function _decrementWaiters() {
    this._reasons--;
  },

  /**
   * The waiter calls this to determine if testing should wait. Override in
   * the implementing class if needed.
   *
   * @return {Boolean}
   * @private
   */
  _shouldWait: function _shouldWait() {
    return this._reasons === 0;
  },

  /**
   * Wire up a waiter for this instance.
   *
   * @private
   */
  _registerWaiter: function _registerWaiter() {
    var _this = this;

    this._waiter = function () {
      return _this._shouldWait();
    };
    _ember2['default'].Test.registerWaiter(this._waiter);
  }

});
module.exports = exports['default'];

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{}],4:[function(require,module,exports){
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

var _firebase = (typeof window !== "undefined" ? window['firebase'] : typeof global !== "undefined" ? global['firebase'] : null);

var _firebase2 = _interopRequireDefault(_firebase);

var assign = _ember2['default'].assign;

/**
 * The Firebase serializer helps normalize relationships and can be extended on
 * a per model basis.
 */
exports['default'] = _emberData2['default'].JSONSerializer.extend(_emberData2['default'].EmbeddedRecordsMixin, {
  isNewSerializerAPI: true,

  /**
   * Firebase have a special value for a date 'firebase.database.ServerValue.TIMESTAMP'
   * that tells it to insert server time. We need to make sure the value is not scrapped
   * by the data attribute transforms.
   *
   * @override
   */
  serializeAttribute: function serializeAttribute(snapshot, json, key, attribute) {
    var value = snapshot.attr(key);
    this._super(snapshot, json, key, attribute);
    if (this._canSerialize(key)) {
      if (value === _firebase2['default'].database.ServerValue.TIMESTAMP) {

        var payloadKey = this._getMappedKey(key, snapshot.type);

        if (payloadKey === key && this.keyForAttribute) {
          payloadKey = this.keyForAttribute(key, 'serialize');
        }
        // do not transform
        json[payloadKey] = value;
      }
    }
  },

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
      var relationshipKey = _this.keyForRelationship(key, meta.kind, 'deserialize');

      if (meta.kind === 'hasMany') {
        if (payload.hasOwnProperty(relationshipKey)) {
          (function () {
            var relationshipPayload = payload[relationshipKey];
            // embedded
            if (_this.hasDeserializeRecordsOption(key)) {
              if (typeof relationshipPayload === 'object' && !_ember2['default'].isArray(relationshipPayload)) {
                relationshipPayload = Object.keys(relationshipPayload).map(function (id) {
                  return assign({ id: id }, relationshipPayload[id]);
                });
              } else if (_ember2['default'].isArray(relationshipPayload)) {
                relationshipPayload = _this._addNumericIdsToEmbeddedArray(relationshipPayload);
              } else {
                throw new Error(modelClass.toString() + ' relationship ' + meta.kind + '(\'' + meta.type + '\') must contain embedded records with an `id`. Example: { "' + key + '": { "' + meta.type + '_1": { "id": "' + meta.type + '_1" } } } instead got: ' + JSON.stringify(payload[key]));
              }
            }

            // normalized
            else {
                if (typeof relationshipPayload === 'object' && !_ember2['default'].isArray(relationshipPayload)) {
                  relationshipPayload = Object.keys(relationshipPayload);
                } else if (_ember2['default'].isArray(relationshipPayload)) {
                  relationshipPayload = _this._convertBooleanArrayToIds(relationshipPayload);
                } else {
                  throw new Error(modelClass.toString() + ' relationship ' + meta.kind + '(\'' + meta.type + '\') must be a key/value map. Example: { "' + key + '": { "' + meta.type + '_1": true } } instead got: ' + JSON.stringify(payload[key]));
                }
              }

            payload[relationshipKey] = relationshipPayload;
          })();
        }

        // hasMany property is not present
        // server will not send a property which has no content
        // (i.e. it will never send `comments: null`) so we need to
        // force the empty relationship
        else {
            payload[relationshipKey] = [];
          }
      }

      if (meta.kind === 'belongsTo') {
        if (!payload.hasOwnProperty(relationshipKey)) {
          // server wont send property if it was made null elsewhere
          payload[relationshipKey] = null;
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
        result.push(assign({ id: '' + i }, arr[i]));
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
  shouldSerializeHasMany: function shouldSerializeHasMany(snapshot, key, relationship) {
    return this._canSerialize(key);
  },

  /**
   * @override
   * @deprecated
   */
  _shouldSerializeHasMany: function _shouldSerializeHasMany(snapshot, key, relationship) {
    return this._canSerialize(key);
  }
});
module.exports = exports['default'];

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{}],5:[function(require,module,exports){
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
        _ember2['default'].run(null, reject, error);
      } else {
        _ember2['default'].run(null, resolve);
      }
    };
    args.push(callback);
    fn.apply(context, args);
  });
};

module.exports = exports['default'];

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{}],6:[function(require,module,exports){
/* jshint node: true */
'use strict';

module.exports = {
  name: 'ember-inflector'
};

},{}],7:[function(require,module,exports){
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

},{"../../addon/adapters/firebase":1,"../../addon/initializers/emberfire":2,"../../addon/serializers/firebase":4}]},{},[7])


//# sourceMappingURL=emberfire.js.map
